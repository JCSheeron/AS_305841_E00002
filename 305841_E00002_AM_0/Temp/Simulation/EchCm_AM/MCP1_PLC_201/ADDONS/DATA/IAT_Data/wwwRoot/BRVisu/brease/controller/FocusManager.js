define([
    'brease/controller/libs/FocusChain',
    'brease/controller/libs/MsgBoxFocusChainStack',
    'brease/events/BreaseEvent', 
    'brease/core/Utils', 
    'brease/events/ClientSystemEvent', 
    'brease/controller/libs/Utils'], 
function (FocusChain, MsgBoxFocusChainStack, BreaseEvent, Utils, ClientSystemEvent, ControllerUtils) {

    'use strict';

    var _focusChain = new FocusChain();
    var _isStarted = false;
    var _tabOrderStyleElem;
    var _animFrame;
    var _msgBoxFocusChainStack = new MsgBoxFocusChainStack();
    var _windowStack = [];
    const windowType = {
        DIALOG: 0,
        MSGBOX: 1
    };

    /**
    * @class brease.controller.FocusManager
    * This module is only used in case config.vis.keyboardOperation=true
    * 
    * This class is responsible for setting the focus if user hits (shift+)tab key or the page/content is changed.   
    *   
    * How it basically works:  
    * On event CONTENT_LOADED => query all focusable widgets from a content and sort them according to tabindex/dom position and push it to the _focusChain  
    * On event PAGE_LOADED => sort all contents in _focusChain and set the focus to the first widget of first content if its not already set.  
    * On event CONTENT_REMOVED => remove the content from the _focusChain and try to recover the focus  
    *   
    * On tab keydown => Set focus on next focusable (visible, enabled) widget in chain  
    * On shift+tab keydown => Set focus on previous focusable widget in chain  
    * On focusin => check if the user has changed the focus => just update _focusPosition  
    *   
    * On before_enable_change => check if the current focused widget gets disabled => focus next.  
    * On before_visible_change => check if the current focused widget gets invisible => focus next.  
    * 
    * @singleton
    */
    var FocusManager = {
        start: function () {
            _isStarted = true;
            document.body.addEventListener(BreaseEvent.PAGE_LOADED, _pageLoadedHandler);
            brease.appElem.addEventListener(ClientSystemEvent.CONTENT_LOADED, _contentLoadedHandler);
            brease.appElem.addEventListener(ClientSystemEvent.DIALOG_OPENED, _dialogOpenedHandler);
            brease.appElem.addEventListener(ClientSystemEvent.DIALOG_CLOSED, _dialogClosedHandler);
            document.body.addEventListener(BreaseEvent.WIDGET_READY, _widgetReadyHandler);
            document.body.addEventListener(BreaseEvent.CONTENT_REMOVED, _contentRemovedHandler);
            document.body.addEventListener(BreaseEvent.MESSAGE_BOX_OPENED, _messageBoxOpenedHandler);
            document.body.addEventListener(BreaseEvent.MESSAGE_BOX_CLOSED, _messageBoxClosedHandler);
            document.body.addEventListener('focusin', _focusInHandler);
            document.body.addEventListener(BreaseEvent.BEFORE_ENABLE_CHANGE, _beforeEnableChangeHandler);
            document.body.addEventListener(BreaseEvent.BEFORE_VISIBLE_CHANGE, _beforeVisibleChangeHandler);
            document.body.addEventListener(BreaseEvent.SHOW_MODAL, _showModalHandler);
            document.body.addEventListener(BreaseEvent.HIDE_MODAL, _hideModalHandler);
            window.addEventListener('keydown', _onKeyDown);
        },

        stop: function () {
            _isStarted = false;
            document.body.removeEventListener(BreaseEvent.PAGE_LOADED, _pageLoadedHandler);
            brease.appElem.removeEventListener(ClientSystemEvent.CONTENT_LOADED, _contentLoadedHandler);
            brease.appElem.removeEventListener(ClientSystemEvent.DIALOG_OPENED, _dialogOpenedHandler);
            brease.appElem.removeEventListener(ClientSystemEvent.DIALOG_CLOSED, _dialogClosedHandler);
            document.body.removeEventListener(BreaseEvent.MESSAGE_BOX_OPENED, _messageBoxOpenedHandler);
            document.body.removeEventListener(BreaseEvent.MESSAGE_BOX_CLOSED, _messageBoxClosedHandler);
            document.body.removeEventListener(BreaseEvent.WIDGET_READY, _widgetReadyHandler);
            document.body.removeEventListener(BreaseEvent.CONTENT_REMOVED, _contentRemovedHandler);
            document.body.removeEventListener('focusin', _focusInHandler);
            document.body.removeEventListener(BreaseEvent.BEFORE_ENABLE_CHANGE, _beforeEnableChangeHandler);
            document.body.removeEventListener(BreaseEvent.BEFORE_VISIBLE_CHANGE, _beforeVisibleChangeHandler);
            document.body.removeEventListener(BreaseEvent.SHOW_MODAL, _showModalHandler);
            document.body.removeEventListener(BreaseEvent.HIDE_MODAL, _hideModalHandler);
            window.removeEventListener('keydown', _onKeyDown);
        },

        /**
         * focus next focusable widget according to tabindex
         */
        focusNext: function () {
            if (!_isStarted) {
                return;
            }
            if (!_isMsgBoxOnTop()) {
                _focusChain.focusNext();
            } else {
                _msgBoxFocusChainStack.focusNext();
            }
        },

        /**
         * focus previous focusable widget according to tabindex
         */
        focusPrevious: function () {
            if (!_isStarted) {
                return;
            }
            if (!_isMsgBoxOnTop()) {
                _focusChain.focusPrevious();
            } else {
                _msgBoxFocusChainStack.focusPrevious();
            }
        },

        /**
         * Display a overlay for each focusable widget which shows the focus order and returns order via callback
         * Subsequential calls for update are possible but callback will be called only once if a animation frame is exectued.
         * The attributes "focuspos" and "tabindex" will be added to the widget html element.
         * @param {Function} callback (optional) called with array of widgetIds with order = tab order 
         */
        showTabOrder: function (callback) {
            window.cancelAnimationFrame(_animFrame);
            _animFrame = window.requestAnimationFrame(_showTabOrder.bind(null, callback || function () {}));
        },

        /**
         * Hide all tab order overlays. 
         * The attributes "focuspos" and "tabindex" gets removed from the widget html element.
         * Callbacks for showTabOrder will not be called anymore!
         */
        hideTabOrder: function () {
            window.cancelAnimationFrame(_animFrame);
            _removeDataAttributes();
            if (document.head.contains(_tabOrderStyleElem)) {
                document.head.removeChild(_tabOrderStyleElem);
            }
        }
    };

    function _pageLoadedHandler(e) {
        if (e.detail.pageId === brease.pageController.getCurrentPage(brease.appElem.id)) {
            _focusChain.sort(e.detail.pageId);
            if (e.detail.containerId === brease.appElem.id) {
                _focusChain.resetFocus();
            }
        }
    }

    function _contentLoadedHandler(e) {
        var contentId = e.detail.contentId,
            widgets = _getFocusableWidgetsOfContent(contentId);
        _focusChain.add(contentId, widgets);
    }

    function _widgetReadyHandler(e) {
        var widget = brease.callWidget(e.target.id, 'widget');
        var contentId = widget.getParentContentId();

        if (widget.settings._dynamicallyCreated && contentId !== brease.settings.globalContent) {
            _focusChain.addWidget(contentId, widget);
        }
    }

    function _dialogOpenedHandler(e) {
        _windowStack.push({ type: windowType.DIALOG, id: e.detail.dialogId });
        _focusChain.addDialog(e.detail.dialogId);
    }

    function _dialogClosedHandler(e) {
        _removeFromWindowStack(e.detail.dialogId);
        var preventFocus = _isMsgBoxOnTop();
        _focusChain.removeDialog(e.detail.dialogId, preventFocus);
        if (preventFocus) {
            _msgBoxFocusChainStack.resetFocus();
        }
    }

    function _removeFromWindowStack(id) {
        _windowStack = _windowStack.filter(function (theWindow) {
            return theWindow.id !== id;
        });
    }

    function _isMsgBoxOnTop() {
        var top = _windowStack[_windowStack.length - 1];
        return top && top.type === windowType.MSGBOX;
    }

    function _messageBoxOpenedHandler(e) {
        _windowStack.push({ type: windowType.MSGBOX, id: e.detail.id });
        var chain = Array.from(e.target.querySelectorAll('[tabindex]')).filter(function (buttonElem) {
            return buttonElem.style.display !== 'none';
        });
        _msgBoxFocusChainStack.push(chain);
    }

    function _messageBoxClosedHandler(e) {
        _removeFromWindowStack(e.detail.id);
        _msgBoxFocusChainStack.pop();
        if (!_isMsgBoxOnTop()) {
            _focusChain.focusNext(true, true);
        }
    }

    function _contentRemovedHandler(e) {
        _focusChain.remove(e.detail.contentId);
    }

    function _onKeyDown(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            if (e.shiftKey) {
                FocusManager.focusPrevious();
            } else {
                FocusManager.focusNext();
            }
        }
    }

    function _focusInHandler(e) {
        if (!_isMsgBoxOnTop()) {
            var targetWidgetElem = Utils.closestWidgetElem(e.target);
            _focusChain.focus(targetWidgetElem);
        } else {
            _msgBoxFocusChainStack.focus(e.target);
        }
    }

    function _beforeEnableChangeHandler(e) {
        _beforeStateChangeHandler(e);
    }

    function _beforeVisibleChangeHandler(e) {
        _beforeStateChangeHandler(e);
    }

    function _beforeStateChangeHandler(e) {
        if (e.detail.value === false) {
            var focusedElement = _focusChain.getFocusedElem();
            if (focusedElement && focusedElement.isSameNode(e.target)) {
                _focusChain.focusNext();
            }
        }
    }

    function _extractCowiInnerWidgets(widgets) {
        var cowiWidgets = {};
        for (var i = widgets.length - 1; i >= 0; i -= 1) {
            var widget = widgets[i],
                parentCoWiId = widget.settings.parentCoWiId;
            if (parentCoWiId) {
                if (!cowiWidgets[parentCoWiId]) {
                    cowiWidgets[parentCoWiId] = [];
                }
                var cowiTabIndex = brease.uiController.callWidget(parentCoWiId, 'getTabIndex');
                if (cowiTabIndex >= 0) {
                    cowiWidgets[parentCoWiId].push(widget);
                } else if (widget.getTabIndex() >= 0) {
                    // widgets in a not focusable widget should not be focusable -> inherit tabindex -1
                    widget.setTabIndex(cowiTabIndex);
                }
                delete widgets[i]; // be aware that delete does not affect widgets.length
            }
        }
        
        // sort inner widgets
        for (var cowiId in cowiWidgets) {
            // sort widgets in place
            cowiWidgets[cowiId].sort(ControllerUtils.compareTabOrder);
        }
        return cowiWidgets;
    }

    function _sortinCowiInnerWidgets(widgets, cowiWidgets) {
        var newList = [];
        // use forEach to not include deleted widgets
        widgets.forEach(function (widget) {
            var widgetId = widget.elem.id;
            if (cowiWidgets[widgetId]) {
                // include cowi, its needed in editMode
                newList.push(widget);
                // include child widgets
                newList.push.apply(newList, cowiWidgets[widgetId]);
            } else {
                newList.push(widget);
            }
        }); 
        return newList;
    }

    // returns a tabindex/dom sorted array of all widgets which have tabindex >= 0
    // runtime: returns widgets which have setting focusable=false (editor does not know child widgets)
    // editor: returns no widgets which have settings focusable=false (display tabOrder of child widgets and not of non focusable widget)
    function _getFocusableWidgetsOfContent(contentId) {
        var widgets = brease.uiController.widgetsController.getWidgetsOfContent(contentId).map(function (widgetId) {
            return brease.callWidget(widgetId, 'widget');
        });

        // extract inner widgets of compound widgets (this method deletes them from array »widgets«)
        var cowiWidgets = _extractCowiInnerWidgets(widgets);

        // sort remaining widgets (includes compound widgets)
        widgets.sort(ControllerUtils.compareTabOrder);
        
        // sort in inner widgets of compound widgets after the corresponding compound widgets
        widgets = _sortinCowiInnerWidgets(widgets, cowiWidgets);
        
        widgets = widgets.filter(function (widget) {
            return widget.getTabIndex() >= 0 && (widget.settings.focusable || brease.config.editMode);
        });
        return widgets;
    }

    function _showModalHandler(e) {
        var widgets = Array.from(e.target.getElementsByClassName('breaseWidget')).map(function (elem) {
            return brease.callWidget(elem.id, 'widget');
        }).filter(function (widget) {
            return widget.getTabIndex() >= 0 && widget.settings.focusable;
        });
        _focusChain.pushModalWidgets(e.detail.id, widgets);
    }

    function _hideModalHandler(e) {
        _focusChain.removeModalWidgets(e.detail.id);
    }

    function _showTabOrder(callback) {
        var widgets = [];
        if (brease.config.editMode) {
            widgets = _getFocusableWidgetsOfContent(brease.settings.globalContent).filter(function (widget) {
                // filter widgets which are not defined by the user (i.e inner widgets of login)
                return widget.settings.hasOwnProperty('parentRefId');
            });
        } else {
            _focusChain.chain.forEach(function (content) {
                widgets = widgets.concat(content.widgets);
            });
        }
        createTabOrderStyleElem();
        _removeDataAttributes();
        for (var i = 0; i < widgets.length; ++i) {
            var focuspos = i + 1;
            var tabindex = widgets[i].getTabIndex();

            if (widgets[i].elem.nodeName === 'svg') {
                widgets[i].elem.appendChild(createForeignObject(focuspos, tabindex));
            } else {
                widgets[i].elem.dataset.focuspos = focuspos;
                widgets[i].elem.dataset.tabindex = tabindex;
            }
        }
        callback(widgets.map(function (widget) {
            return widget.elem.id;
        }));
    }

    function createForeignObject(focuspos, tabindex) {
        var foreignElem = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
        foreignElem.classList.add('svgTabOrderIndicator');
        foreignElem.setAttribute('width', '100%');
        foreignElem.setAttribute('height', '100%');
        foreignElem.dataset.focuspos = focuspos;
        foreignElem.dataset.tabindex = tabindex;
        return foreignElem;
        
    }

    function _removeDataAttributes() {
        var widgetElems = document.body.querySelectorAll('[data-focuspos]');
        Array.prototype.slice.call(widgetElems).forEach(function (elem) {
            if (elem.nodeName === 'foreignObject') {
                elem.remove();
            } else {
                elem.removeAttribute('data-focuspos');
                elem.removeAttribute('data-tabindex');
            }
        });
    }

    function createTabOrderStyleElem() {
        if (!_tabOrderStyleElem) {
            _tabOrderStyleElem = ControllerUtils.injectCSS('[data-focuspos]::after {' +
                'position: absolute;' +
                'top: 50%;' +
                'left: 50%;' +
                'background: #d5f0cd; ' +
                'font: normal large Arial;' +
                'border: 3px solid black;' +
                'border-radius: 3px;' +
                'text-align: center;' +
                'transform: translateX(-50%) translateY(-50%);' +
                'min-width: 2em;' +
                'z-index: 20000;' +
                'content: attr(data-focuspos);' +
                '}' + 
                '[data-tabindex="0"]::after {' +
                'background: #FFFD9C;}' + 
                '.svgTabOrderIndicator {' +
                'pointer-events: none;' +
                'position: absolute;' +
                'left: 0px;' +
                'top: 0px;}');
        }
        document.head.appendChild(_tabOrderStyleElem);
    }

    return FocusManager;
});
