define(['brease/events/BreaseEvent', 'brease/controller/libs/Utils', 'brease/enum/Enum', 'brease/controller/libs/LogCode'], function (BreaseEvent, Utils, Enum, LogCode) {

    'use strict';

    var FocusChain = function () {
        // chain contains all contents with widgets in the order according to tabindex/dom position
        // position: current focused element index: chain[position.content].widgets[position.widget]
        // example chain: [{ contentId: 'content', widgets: [widget1, widget2] }]
        // after sort, insert, addDialog we also add additional info for one content;
        // [{ contentId: 'content', widgets: [widget1, widget2], areaId: 'AreaMain', pageId: 'PageSettings', type:'Page', tabIndex: [1] }]
        // areaId: parent areaId of content
        // pageId: parent pageId or dialogId of content
        // type: Page or Dialog
        // tabIndex: tabIndex of parent areas. The last entry in the array is the tabIndex of the closest area parent.
        this.chain = [];
        this.position = { content: undefined, widget: undefined };
        this.orderedContents = [];
        this.chainCircle = {
            start: undefined,
            length: undefined
        };
        this.recoveryPoints = new Map();
        this.resetted = false;
        this.modalWidgets = [];
    };

    FocusChain.prototype.hasFocus = function () {
        return this.position.content !== undefined && this.chain[this.position.content] !== undefined;
    };

    FocusChain.prototype.resetFocus = function () {
        this.modalWidgets = [];
        if (this.hasFocus()) {
            this.getFocusedElem().focus({ preventScroll: true });
        } else {
            this.position.content = 0;
            this.position.widget = 0;
            this.focusNext(true, true);
        }
        this.resetted = true;
    };

    FocusChain.prototype.addDialog = function (dialogId) {
        // get dialog contents in correct order with all infos
        var orderedContents = getOrderedContents(dialogId);
        // replace the dialog contents in focus chain with sorted ones but keep them at the end of chain
        for (var i = 0; i < orderedContents.length; ++i) {
            var indexOfContent = this.chain.findIndex(function (link) {
                return orderedContents[i].contentId === link.contentId; 
            });
            if (indexOfContent >= 0) {
                orderedContents[i].widgets = this.chain[indexOfContent].widgets;
                _remove.call(this, orderedContents[i].contentId);
            } else {
                // if there is no content for a area (loadContentInArea) create a dummy in chain 
                // so if a content is loaded later in this area it can be inserted right after the dummy
                orderedContents[i].widgets = [];
                delete orderedContents[i].contentId;
            }
            this.chain.push(orderedContents[i]);
        }
        this.recoveryPoints.set(dialogId, this.getFocusedElem());
        // move focus to first content of dialog
        this.position.content = this.chain.length - orderedContents.length;
        this.position.widget = 0;
        if (Utils.hasModalWindow()) {
            this.chainCircle.start = this.position.content;
            this.chainCircle.length = orderedContents.length;
        }
        // todo: dialog with no focusable elements should be handled with focus trap
        this.focusNext(true, true);
        this.resetted = true;
    };

    FocusChain.prototype.removeDialog = function (dialogId, preventFocus) {
        var lastDialogId = _getLastDialogId.call(this);
        if (lastDialogId && Utils.hasModalWindow()) {
            this.chainCircle = _createChainCircleForDialog.call(this, lastDialogId);
        } else {
            this.chainCircle.start = undefined;
        }
        _removeDialogDummies.call(this, dialogId);
        var recoveryElem = this.recoveryPoints.get(dialogId);
        this.recoveryPoints.delete(dialogId);
        if (!this.hasFocus()) {
            this.focus(recoveryElem);
            if (!preventFocus) {
                this.focusNext(true, true);
            } 
        }
    };

    FocusChain.prototype.add = function (contentId, widgets) {
        if (!_hasContent.call(this, contentId)) {
            if (brease.pageController.isPageChangeInProgress()) {
                this.chain.push({ contentId: contentId, widgets: widgets });
            } else {
                if (this.position.content === undefined) {
                    this.chain.push({ contentId: contentId, widgets: widgets });
                    this.resetFocus();
                } else {
                    _insert.call(this, { contentId: contentId, widgets: widgets });
                }
            }
        }
    };

    FocusChain.prototype.remove = function (contentId) {
        if (brease.pageController.isPageChangeInProgress() && !brease.pageController.isContentToBeRemoved(contentId)) {
            return;
        }
        var removedContent = this.chain[_getFocusPositionOfContent.call(this, contentId)];
        var index = _remove.call(this, contentId);
        if (index < 0) {
            return;
        } if (index === this.position.content) {
            _handleRemoveAtCurrentPosition.call(this, removedContent);
        } else if (index < this.position.content) {
            --this.position.content;
        }
    };

    FocusChain.prototype.addWidget = function (contentId, widget) {
        if (widget.getTabIndex() < 0 || !widget.settings.focusable || this.hasElem(widget.elem)) {
            return;
        }
        var contentPos = _getFocusPositionOfContent.call(this, contentId);
        if (contentPos < 0) {
            return;
        }
        _insertWidget.call(this, contentPos, widget);
    };

    FocusChain.prototype.sort = function (pageId) {
        var orderedContents = getOrderedContents(pageId),
            newFocusPosition;
        for (var i = 0; i < orderedContents.length; ++i) {
            var indexOfContent = this.chain.findIndex(function (link) {
                return orderedContents[i].contentId === link.contentId; 
            });
            if (indexOfContent >= 0) {
                if (this.hasFocus() && this.position.content === indexOfContent) {
                    newFocusPosition = i;
                }
                orderedContents[i].widgets = this.chain[indexOfContent].widgets;
            } else {
                // if there is no content for a area (loadContentInArea) create a dummy in chain 
                // so if a content is loaded later in this area it can be inserted right after the dummy
                orderedContents[i].widgets = [];
                delete orderedContents[i].contentId;
            }
        }
        this.position.content = newFocusPosition;
        this.chain = orderedContents;
    };

    /**
     * Manually set to focus to a element/widget in the focus chain.
     * This function should always be called if any element gets the focus (document.focusin) to keep the FocusChain
     * synchronised. It keeps the position on a known element if the focus function is called with a element which is not in FocusChain focuschain.
     * This would be the case i.e for click on body or click on keyboard textinput.
     * 
     * If the element is in the FocusChain but disabled, then the focus is set to the body (blur)
     * This happens i.e if a user clicks on an input of a widget which is disabled. (inputs are always focusable by click since defaul tabIndex=-1)
     * 
     * If the element is outside the chainCircle, a message is written to the logger and focus is lost. 
     * This happens if focus action is called on a widget outside of modal window.
     * @param {Node} elem Focus target node. 
     */
    FocusChain.prototype.focus = function (elem) {
        if (elem === this.getFocusedElem()) return;

        for (var i = 0; i < this.chain.length; ++i) {
            var widgets = this.chain[i].widgets;
            for (var j = 0; j < widgets.length; ++j) {
                if (widgets[j].elem.isSameNode(elem)) {
                    if (!_isInChainCircle.call(this, i)) {
                        document.activeElement.blur();
                        var log = LogCode.getConfig('CLIENT_FOCUS_ACTION_FAIL');
                        brease.loggerService.log(log.code, Enum.EventLoggerCustomer.BUR, log.verboseLevel, log.severity, [elem.id]);
                    // prevent focus on disabled inputs (inputs are always focusable by mouse!)
                    } else if (widgets[j].isEnabled()) {
                        this.position = { content: i, widget: j };
                        this.resetted = false;
                    } else {
                        document.activeElement.blur();
                    }
                    return;
                }
            }
        }
    };

    /**
     * Set focus on next focusable widget in chain. 
     * @param {*} current Start at the current position
     * @param {Boolean} omitEvent omit BEFORE_FOCUS_MOVE move event i.e the element is not available anymore 
     */
    FocusChain.prototype.focusNext = function (current, omitEvent) {
        if (this.chain.length === 0) {
            this.position.widget = undefined;
            this.position.content = undefined;
            return;
        }
        var focusedElem = this.getFocusedElem();
        var chainCircle = _getChainCircle.call(this);
        // exit if we found no visible focusable element in the whole chain
        for (var i = 0; i < chainCircle.length + 1; ++i) {
            if (this.position.content > chainCircle.end) {
                this.position.content = chainCircle.start;
            }
            var widgets = this.chain[this.position.content].widgets;
            for (; this.position.widget < widgets.length; ++this.position.widget) {
                if (!current) {
                    current = true;
                    continue;
                }
                var widget = widgets[this.position.widget];
                if (widget.isFocusable() && _isModalWidget.call(this, widget.elem.id)) {
                    if (!omitEvent) {
                        focusedElem.dispatchEvent(new CustomEvent(BreaseEvent.BEFORE_FOCUS_MOVE, { bubbles: false, cancelable: false, detail: {} }));
                    }
                    widget.elem.focus({ preventScroll: true });
                    this.resetted = false;
                    return;
                }
            }
            this.position.widget = 0;          
            ++this.position.content;
        }
        this.position.widget = undefined;
        this.position.content = undefined;
    };

    FocusChain.prototype.focusPrevious = function () {
        var current = false;
        if (this.chain.length === 0) {
            this.position.widget = undefined;
            this.position.content = undefined;
            return;
        }
        var focusedElem = this.getFocusedElem();
        var chainCircle = _getChainCircle.call(this);
        // exit if we found no visible focusable element in the whole chain
        for (var i = 0; i < chainCircle.length + 1; ++i) {
            if (this.position.content < chainCircle.start) {
                this.position.content = chainCircle.end;
            }
            var widgets = this.chain[this.position.content].widgets;
            if (widgets.length > 0) {
                if (this.position.widget === undefined) {
                    this.position.widget = widgets.length - 1;
                }
                for (; this.position.widget >= 0; --this.position.widget) {
                    if (!current) {
                        current = true;
                        continue;
                    }
                    var widget = widgets[this.position.widget];
                    if (widget.isFocusable() && _isModalWidget.call(this, widget.elem.id)) {
                        if (!focusedElem.isSameNode(widget.elem)) {
                            focusedElem.dispatchEvent(new CustomEvent(BreaseEvent.BEFORE_FOCUS_MOVE, { bubbles: false, cancelable: false, detail: {} }));
                        }
                        widget.elem.focus({ preventScroll: true });
                        this.resetted = false;
                        return;
                    }
                }
            }
            this.position.widget = undefined;          
            --this.position.content;
        }
        this.position.widget = undefined;
        this.position.content = undefined;
    };

    FocusChain.prototype.getFocusedElem = function () {
        if (this.hasFocus() && this.chain[this.position.content].widgets.length > 0) {
            return this.chain[this.position.content].widgets[this.position.widget].elem;
        }
    };

    FocusChain.prototype.hasElem = function (elem) {
        return this.chain.some(function (content) {
            return content.widgets.some(function (widget) {
                return elem.isSameNode(widget.elem);
            });
        });
    };

    /**
     * Push widgets which are shown modal onto a stack. Widgets which are on top of the stack
     * are focusable - all other not. The first widget (according to tabOrder) is focused.
     * @param {String} id Should be used to remove pushed modal widgets. 
     * @param {Object} widgets Widgets with tabIndex>=0 
     */
    FocusChain.prototype.pushModalWidgets = function (id, widgets) {
        var index = this.modalWidgets.findIndex(function (context) {
            return context.id === id;
        });
        if (index >= 0) {
            return;
        }
        this.modalWidgets.push({
            id: id,
            widgetIds: widgets.map(function (w) {
                return w.elem.id;
            })
        });
        this.focusNext(true);
    };

    /**
     * Remove widgets which are shown modal from the stack. The focus remains on the current widget!
     * @param {String} id Identifier which was used with pushModalWidgets
     */
    FocusChain.prototype.removeModalWidgets = function (id) {
        var index = this.modalWidgets.findIndex(function (it) {
            return it.id === id;
        });
        if (index >= 0) {
            this.modalWidgets.splice(index, 1);
        }
    };

    function _hasContent(contentId) {
        return _getFocusPositionOfContent.call(this, contentId) !== -1;
    }

    function _getFocusPositionOfContent(contentId) {
        return this.chain.findIndex(function (content) {
            return content.contentId === contentId;
        });
    }

    function _hasPage(pageId) {
        return this.chain.some(function (content) {
            // exclude dummy contents
            return content.pageId === pageId && content.contentId !== undefined;
        });
    }

    function _getLastDialogId() {
        for (var i = this.chain.length - 1; i >= 0; --i) {
            if (this.chain[i].type === 'Dialog' && this.chain[i].contentId !== undefined) {
                return this.chain[i].pageId;
            }
        }
        return undefined;
    }

    function getOrderedContents(pageId) {
        var page = brease.pageController.getPageById(pageId) || brease.pageController.getDialogById(pageId),
            areas = brease.pageController.getLayoutById(page.layout).areas,
            ordered = [];
        for (var areaAssignment in page.assignments) {
            var assignment = page.assignments[areaAssignment],
                tabIndex = areas[assignment.areaId].tabIndex > 0 ? areas[assignment.areaId].tabIndex : undefined;
            if (assignment.type === 'Content') {
                ordered.push({ type: page.type, pageId: pageId, areaId: assignment.areaId, contentId: assignment.contentId, tabIndex: [tabIndex] });
            } else if (assignment.type === 'Page') {
                var contents = getOrderedContents(assignment.contentId);
                contents.forEach(function (content) {
                    content.tabIndex.unshift(tabIndex);
                });
                ordered = ordered.concat(contents);
            } // else { // type visu
            // the code below would only work if you have no navigation in emb visu.. otherwise we would need a new FocusChain for the emb visu
            // var visu = brease.pageController.getVisuById(assignment.contentId),
            //     visuPageId = brease.pageController.getCurrentPage(visu.containerId);
            // var c = getOrderedContents(visuPageId);
            // ordered = ordered.concat(c);
            // }
        }
        ordered.sort(function (a, b) {
            // sort back undefined tabIndexs
            if (a.tabIndex[0] === undefined) return 1;
            if (b.tabIndex[0] === undefined) return -1;
            return a.tabIndex[0] - b.tabIndex[0];
        });
        return ordered;
    }

    function _remove(contentId) {
        var index = _getFocusPositionOfContent.call(this, contentId);
        if (index >= 0) {
            this.chain.splice(index, 1);
        }
        return index;
    }

    function _removeDialogDummies(dialogId) {
        this.chain = this.chain.filter(function (content) {
            return content.pageId !== dialogId;
        });
    }

    function _handleRemoveAtCurrentPosition(removedContent) {
        // if its a dialog and all contents of dialog removed => blur => focus will recover on removeDialog
        if (removedContent.type === 'Dialog' && !_hasPage.call(this, removedContent.pageId)) {
            this.position.widget = undefined;
            this.position.content = undefined;
            document.body.focus({ preventScroll: true });
            return;
        }
        // if last removed from chain we have to correct the position to start of chain (circle)
        if (this.position.content >= this.chain.length) {
            this.position.content = _getChainCircle.call(this).start;
        }
        // content removed dynamically i.e loadContentInArea => recover to next focusable
        if (!brease.pageController.isPageChangeInProgress() && this.chain.length > 0) {
            this.position.widget = 0;
            this.focusNext(true, true);
        } else {
            // if content removed due to page change we recover the focus on next page load or content add
            this.position.content = undefined;
            this.position.widget = undefined;
        }
    }

    function _insertWidget(contentPos, widget) {
        var insertIndex;
        for (var i = 0; i < this.chain[contentPos].widgets.length; ++i) {
            var chainWidget = this.chain[contentPos].widgets[i];

            // for cowi childs we have to use tabIndex of parent
            var parentCoWiId = chainWidget.settings.parentCoWiId;
            if (parentCoWiId) {
                chainWidget = brease.callWidget(parentCoWiId, 'widget');
            }
            if (Utils.compareTabOrder(chainWidget, widget) > 0) {
                insertIndex = i;
                break;
            }
        }
        if (insertIndex === undefined) {
            this.chain[contentPos].widgets.push(widget);
        } else {
            this.chain[contentPos].widgets.splice(insertIndex, 0, widget);
            
            if (contentPos === this.position.content && insertIndex <= this.position.widget) {
                // reset the focus only if the user has not already moved the focus!
                if (this.resetted) {
                    this.resetFocus();
                } else {
                    ++this.position.widget;
                }
            }
        }
    }
    
    // insert a content with widgets into sorted chain according the area of the content 
    function _insert(content) {
        Object.assign(content, Utils.getContentPageAreaIds(content.contentId));

        var insertIndex = _findLastIndexOfPageArea.call(this, content.pageId, content.areaId);
        if (insertIndex === -1) {
            // if the area is empty (e.g. content removed) we take the initial order of the page areas
            insertIndex = _findInitialIndexOfPageArea.call(this, content.pageId, content.areaId);
            if (insertIndex === -1) {
                // content is not part of the current page
                return;
            } else {
                this.chain.splice(insertIndex, 0, content);
            }
        } else {
            // take type from dummy
            content.type = this.chain[insertIndex].type;
            //insert after dummy
            this.chain.splice(++insertIndex, 0, content);
        }
        if (insertIndex <= this.position.content) {
            ++this.position.content;
        }
        _updateChainCircle.call(this, insertIndex);
    }

    function _findInitialIndexOfPageArea(pageId, areaId) {
        var areasBefore = _findAreasWithLowerTabIndex(pageId, areaId);
        
        if (areasBefore) {
            var index = 0;
            // count all contents with areaIds from areas with lower tabIndex
            for (var i = 0; i < this.chain.length; i += 1) {
                var content = this.chain[i];
                if (content.pageId === pageId && areasBefore.includes(content.areaId)) {
                    index += 1;
                } else {
                    break;
                }
            }
            return index;
        } else {
            return -1;
        }
    }
    
    function _findAreasWithLowerTabIndex(pageId, areaId) {
        var arContent = getOrderedContents(pageId),
            areasBefore = [],
            areaFound = false;

        // iterate over all ordered contents til we find the areaId of the content to add
        for (var i = 0; i < arContent.length; i += 1) {
            var content = arContent[i];
            if (content.pageId === pageId && content.areaId === areaId) {
                areaFound = true;
                break;
            } else {
                if (areasBefore.indexOf(content.areaId) === -1) {
                    areasBefore.push(content.areaId);
                }
            }
        }
        if (areaFound) {
            return areasBefore;
        } else {
            return undefined;
        }
    }

    function _findLastIndexOfPageArea(pageId, areaId) {
        for (var i = this.chain.length - 1; i >= 0; i--) {
            if (this.chain[i].pageId === pageId && this.chain[i].areaId === areaId) {
                return i;
            }
        }
        return -1;
    }

    function _getChainCircle() {
        var chainCircle = {};
        if (this.chainCircle.start === undefined) {
            chainCircle.start = 0;
            chainCircle.length = this.chain.length;    
        } else {
            chainCircle = this.chainCircle;
        }
        chainCircle.end = chainCircle.start + chainCircle.length - 1;
        return chainCircle;
    }

    // this updates the chain circle if a new content is inserted into the focus chain dynamically
    function _updateChainCircle(insertIndex) {
        if (this.chainCircle.start !== undefined) {
            if (insertIndex < this.chainCircle.start) {
                // theoretical its possible that a content is loaded somewhere while the dialog is open
                // todo: test if this is possible in real and if its possible write a test for this case!
                ++this.chainCircle.start;
            } else {
                this.chainCircle.length++;
            }
        }
    }

    function _isInChainCircle(index) {
        var chainCircle = _getChainCircle.call(this);
        return index >= chainCircle.start && index <= chainCircle.end;
    }

    function _createChainCircleForDialog(dialogId) {
        var chainCircle = {};
        for (var i = this.chain.length - 1; i >= 0; --i) {
            if (this.chain[i].pageId === dialogId && chainCircle.end === undefined) {
                chainCircle.end = i;
            }
            if (chainCircle.end !== undefined && dialogId !== this.chain[i].pageId) {
                chainCircle.start = i + 1;
                break;
            }
        }
        chainCircle.length = chainCircle.end - chainCircle.start + 1;
        return chainCircle;
    }

    function _isModalWidget(id) {
        var top = this.modalWidgets[this.modalWidgets.length - 1];
        if (top === undefined) {
            return true;
        }
        return top.widgetIds.indexOf(id) !== -1;
    }

    return FocusChain;
});
