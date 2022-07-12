define([
    'brease/core/Class', 
    'brease/enum/Enum', 
    'brease/helper/Scroller'
], function (
    SuperClass, Enum, Scroller
) {
    
    'use strict';

    var ScrollHandler = SuperClass.extend(function ScrollHandler(widget, renderer, options) {
            SuperClass.call(this);
            this.widget = widget;
            this.settings = widget.settings;
            this.renderer = renderer;
            this.options = options;
        }, null),

        p = ScrollHandler.prototype;

    p.initializeScroller = function (init, redraw) {
        if (init === true && !redraw) {
            _addHeaderScroller(this);
        } else if (init === false && !redraw) {
            this._addBodyScroller(); 
        } else {
            _addHeaderScroller(this);
            this._addBodyScroller();
            if (brease.config.editMode) {
                _addEditorHeaderScroller(this);
            }
        }
    };

    p.removeScroller = function () {
        this._removeScroller();
    };

    p.isScrollActive = function () {
        return this.scrollActive;
    };

    function isAllowedPosition(indexColumn, indexRow) {
        var tableDataInfo = this.widget.model.getTableDataBoundaries();
        return (indexColumn <= tableDataInfo.columns - 1) && (indexRow <= tableDataInfo.rows - 1);
    }

    function cellIsHidden(cellNode) {
        var $cellNode = $(cellNode);
        return $cellNode.hasClass('hidden') || $cellNode.parent().hasClass('hidden');
    }

    function getCellNode(indexColumn, indexRow) {
        return this.renderer.table.cell(indexRow === -1 ? 0 : indexRow, indexColumn === -1 ? 0 : indexColumn).node();
    }

    p.scrollToIndex = function (indexRow, indexColumn) {
        if (!this.scrollActive) {
            this.scrollActive = true;
        } else {
            return;
        }
        _getViewPortPosition(this);

        var scrollX = 0,
            scrollY = 0,
            tableBodyHeight = this.renderer.tableBodyEl.height(),
            tableBodyWidth = this.renderer.tableBodyEl.width(),
            viewPortHeight = this.renderer.tableBodyEl.parent().height(),
            viewPortWidth = this.renderer.tableBodyEl.parent().width();

        if (isAllowedPosition.call(this, indexColumn, indexRow)) {
            var cellNode = getCellNode.call(this, indexColumn, indexRow);
            if (cellIsHidden(cellNode)) {
                this.scrollActive = false;
                return;
            }
            if ((indexRow > -1) && (indexColumn > -1)) {
                scrollX = -cellNode.offsetLeft;
                scrollY = -cellNode.offsetTop;
            } else if ((indexRow > -1) && (indexColumn === -1)) {
                scrollX = this.scrollerBody.x;
                scrollY = -cellNode.offsetTop;
            } else if ((indexRow === -1) && (indexColumn > -1)) {
                scrollX = -cellNode.offsetLeft;
                scrollY = this.scrollerBody.y;
            }
            if (tableBodyWidth < viewPortWidth) {
                scrollX = 0;
            } else if (Math.abs(scrollX) > Math.abs(tableBodyWidth - viewPortWidth)) {
                scrollX = -(tableBodyWidth - viewPortWidth);
            }
            if (tableBodyHeight < viewPortHeight) {
                scrollY = 0;
            } else if (Math.abs(scrollY) > Math.abs(tableBodyHeight - viewPortHeight)) {
                scrollY = -(tableBodyHeight - viewPortHeight);
            }
            this.scrollerBody.scrollTo(scrollX, scrollY, this.options.scroller.scrollDuration);
        } else {
            this.scrollActive = false;
        }
    };
    p.scrollItemLeft = function () {
        if (!this.scrollActive) {
            this.scrollActive = true;
        } else {
            return;
        }
        _getViewPortPosition(this);
        var tableLeftDistance = parseInt(this.renderer.tableBodyEl.css('right')),
            mostLeftEl = this._getFirstItemInView(tableLeftDistance);

        if (mostLeftEl !== undefined && mostLeftEl[0] !== undefined) {
            var elementPosition = mostLeftEl[0].getBoundingClientRect();

            if (this.renderer.tableBodyEl[0].contains(mostLeftEl[0])) {

                if ((elementPosition.left + this.options.scroller.pagingItemTolerance * elementPosition.width) < this.viewPortProperties.left) {
                    this.scrollerBody.scrollBy(
                        this.viewPortProperties.left - elementPosition.left,
                        0,
                        this.options.scroller.scrollDuration);
                } else if (elementPosition.left === this.viewPortProperties.left) {
                    this.scrollerBody.scrollBy(
                        mostLeftEl.prev('td:not(.hidden)').outerWidth(),
                        0,
                        this.options.scroller.scrollDuration);
                } else {
                    this.scrollerBody.scrollBy(
                        mostLeftEl.prev('td:not(.hidden)').outerWidth() + (this.viewPortProperties.left - elementPosition.left),
                        0,
                        this.options.scroller.scrollDuration);
                }
            }
        } else {
            this.scrollActive = false;
        }

    };

    p.scrollItemRight = function () {
        if (!this.scrollActive) {
            this.scrollActive = true;
        } else {
            return;
        }
        _getViewPortPosition(this);
        var tableViewWidth = this.renderer.tableBodyEl.parent().width(),
            tableRightDistance = parseInt(this.renderer.tableBodyEl.css('right')),
            distance = (tableViewWidth + tableRightDistance),
            mostRightEl = this._getFirstItemInView(distance);

        if (mostRightEl !== undefined && mostRightEl[0] !== undefined) {
            var elementPosition = mostRightEl[0].getBoundingClientRect();

            if (this.renderer.tableBodyEl[0].contains(mostRightEl[0])) {
                if ((elementPosition.right - this.options.scroller.pagingItemTolerance * elementPosition.width) > this.viewPortProperties.right) {
                    this.scrollerBody.scrollBy(
                        -(elementPosition.right - this.viewPortProperties.right),
                        0,
                        this.options.scroller.scrollDuration);
                } else if (elementPosition.right === this.viewPortProperties.right) {
                    this.scrollerBody.scrollBy(
                        -mostRightEl.next('td:not(.hidden)').outerWidth(),
                        0,
                        this.options.scroller.scrollDuration);
                } else {
                    this.scrollerBody.scrollBy(
                        -(mostRightEl.next('td:not(.hidden)').outerWidth() + (elementPosition.right - this.viewPortProperties.right)),
                        0,
                        this.options.scroller.scrollDuration);
                }
            }
        } else {
            this.scrollActive = false;
        }

    };

    p.scrollItemUp = function () {
        if (!this.scrollActive) {
            this.scrollActive = true;
        } else {
            return;
        }
        _getViewPortPosition(this);
        var tableTopDistance = parseInt(this.renderer.tableBodyEl.css('bottom')), 
            mostUpperEl = this._getFirstItemInView(tableTopDistance);

        if (mostUpperEl !== undefined && mostUpperEl[0] !== undefined) {
            var elementPosition = mostUpperEl[0].getBoundingClientRect();

            if (this.renderer.tableBodyEl[0].contains(mostUpperEl[0])) {
                //element is cut off for a certain pertage (pagingItemTolerance) of its height, then scroll to this element
                if ((elementPosition.top + this.options.scroller.pagingItemTolerance * elementPosition.height) < this.viewPortProperties.top) {
                    this.scrollerBody.scrollBy(
                        0,
                        this.viewPortProperties.top - elementPosition.top,
                        this.options.scroller.scrollDuration);
                    //element is completely visible scroll to next element
                } else if (elementPosition.top === this.viewPortProperties.top) {
                    this.scrollerBody.scrollBy(
                        0,
                        mostUpperEl.prev('tr:not(.hidden)').outerHeight(),
                        this.options.scroller.scrollDuration);
                    //element is visible for a certain pertage (1 - pagingItemTolerance) of its height, then scroll to the next element
                } else {
                    this.scrollerBody.scrollBy(
                        0,
                        mostUpperEl.prev('tr:not(.hidden)').outerHeight() + (this.viewPortProperties.top - elementPosition.top),
                        this.options.scroller.scrollDuration);
                }
            }
        } else {
            this.scrollActive = false;
        }

    };

    p.scrollItemDown = function () {
        if (!this.scrollActive) {
            this.scrollActive = true;
        } else {
            return;
        }
        _getViewPortPosition(this);
        var tableViewWidth = this.renderer.tableBodyEl.parent().height(),
            tableBottomDistance = parseInt(this.renderer.tableBodyEl.css('bottom')),
            distance = (tableViewWidth + tableBottomDistance),
            mostLowerEl = this._getFirstItemInView(distance);

        if (mostLowerEl !== undefined && mostLowerEl[0] !== undefined) {
            var elementPosition = mostLowerEl[0].getBoundingClientRect();
            if (this.renderer.tableBodyEl[0].contains(mostLowerEl[0])) {
                if ((elementPosition.bottom - this.options.scroller.pagingItemTolerance * elementPosition.height) > this.viewPortProperties.bottom) {
                    this.scrollerBody.scrollBy(
                        0,
                        -(elementPosition.bottom - this.viewPortProperties.bottom),
                        this.options.scroller.scrollDuration);
                } else if (elementPosition.bottom === this.viewPortProperties.bottom) {
                    this.scrollerBody.scrollBy(
                        0,
                        -(mostLowerEl.next('tr:not(.hidden)').outerHeight()),
                        this.options.scroller.scrollDuration);
                } else {
                    this.scrollerBody.scrollBy(
                        0,
                        -(mostLowerEl.next('tr:not(.hidden)').outerHeight() + (elementPosition.bottom - this.viewPortProperties.bottom)),
                        this.options.scroller.scrollDuration);
                }
            }
        } else {
            this.scrollActive = false;
        }

    };

    p.scrollPageRight = function () {
        if (!this.scrollActive) {
            this.scrollActive = true;
        } else {
            return;
        }
        _getViewPortPosition(this);
        var tableViewWidth = this.renderer.tableBodyEl.parent().width(),
            tableRightDistance = parseInt(this.renderer.tableBodyEl.css('right')),
            distance = (tableViewWidth + tableRightDistance),
            mostRightEl = this._getFirstItemInView(distance),
            scrollDistance;

        if (mostRightEl !== undefined && mostRightEl[0] !== undefined) {
            var elementPosition = mostRightEl[0].getBoundingClientRect();
            if (this.renderer.tableBodyEl[0].contains(mostRightEl[0])) {
                if ((elementPosition.right - this.options.scroller.pagingItemTolerance * elementPosition.width) > this.viewPortProperties.right) {
                    scrollDistance = -(mostRightEl[0].offsetLeft - (this.scrollerBody.x * -1));
                } else {
                    if (mostRightEl.next('td:not(.hidden)')[0] === undefined) {
                        this.scrollActive = false;
                        return;
                    }
                    scrollDistance = -(mostRightEl.next('td:not(.hidden)')[0].offsetLeft - (this.scrollerBody.x * -1));
                }
                //if scrollDistance is exceeding wrapper size, then scroll remaining space
                if ((this.renderer.tableBodyEl.width() - this.renderer.tableBodyEl.parent().width()) < -(this.scrollerBody.x + scrollDistance)) {
                    scrollDistance = -(this.renderer.tableBodyEl.width() - (-this.scrollerBody.x + this.renderer.tableBodyEl.parent().width()));
                }
                this.scrollerBody.scrollBy(scrollDistance, 0, this.options.scroller.scrollDuration);
            }
        } else {
            this.scrollActive = false;
        }
    };

    p.scrollPageLeft = function () {
        if (!this.scrollActive) {
            this.scrollActive = true;
        } else {
            return;
        }
        _getViewPortPosition(this);

        var tableLeftDistance = parseInt(this.renderer.tableBodyEl.css('right')),
            mostLeftEl = this._getFirstItemInView(tableLeftDistance), scrollDistance;

        if (mostLeftEl !== undefined && mostLeftEl[0] !== undefined) {
            var elementPosition = mostLeftEl[0].getBoundingClientRect();

            if (this.renderer.tableBodyEl[0].contains(mostLeftEl[0])) {
                if ((elementPosition.left + this.options.scroller.pagingItemTolerance * elementPosition.width) < this.viewPortProperties.left) {
                    scrollDistance = (this.scrollerBody.x * -1) - mostLeftEl[0].offsetLeft + this.renderer.tableBodyEl.parent().width() - mostLeftEl.outerWidth();
                } else {
                    if (mostLeftEl.prev('td:not(.hidden)')[0] === undefined) {
                        this.scrollActive = false;
                        return;
                    }
                    scrollDistance = (this.scrollerBody.x * -1) - mostLeftEl.prev('td:not(.hidden)')[0].offsetLeft + this.renderer.tableBodyEl.parent().width() - mostLeftEl.prev('td').outerWidth();
                }
                //check that scrollDistance is not exceeding wrapper size, it it does scroll remaining space
                if ((this.scrollerBody.x * -1) - scrollDistance < 0) {
                    scrollDistance = -this.scrollerBody.x;
                }
                this.scrollerBody.scrollBy(scrollDistance, 0, this.options.scroller.scrollDuration);
            }
        } else {
            this.scrollActive = false;
        }
        
    };

    p.scrollPageUp = function () {
        if (!this.scrollActive) {
            this.scrollActive = true;
        } else {
            return;
        }
        _getViewPortPosition(this);
        var tableTopDistance = parseInt(this.renderer.tableBodyEl.css('bottom')), 
            mostUpperEl = this._getFirstItemInView(tableTopDistance), scrollDistance;

        if (mostUpperEl !== undefined && mostUpperEl[0] !== undefined) {
            var elementPosition = mostUpperEl[0].getBoundingClientRect();

            if (this.renderer.tableBodyEl[0].contains(mostUpperEl[0])) {
                if ((elementPosition.top + this.options.scroller.pagingItemTolerance * elementPosition.height) < this.viewPortProperties.top) {
                    scrollDistance = (this.scrollerBody.y * -1) - mostUpperEl[0].offsetTop + this.renderer.tableBodyEl.parent().height() - mostUpperEl.outerHeight();
                } else {
                    if (mostUpperEl.prev('tr:not(.hidden)')[0] === undefined) {
                        this.scrollActive = false;
                        return;
                    }
                    scrollDistance = (this.scrollerBody.y * -1) - mostUpperEl.prev('tr:not(.hidden)')[0].offsetTop + this.renderer.tableBodyEl.parent().height() - mostUpperEl.prev('tr').outerHeight();
                }
                //check that scrollDistance is not exceeding wrapper size, it it does scroll remaining space
                if ((this.scrollerBody.y * -1) - scrollDistance < 0) {
                    scrollDistance = -this.scrollerBody.y;
                }
                this.scrollerBody.scrollBy(0, scrollDistance, this.options.scroller.scrollDuration);
            }

        } else {
            this.scrollActive = false;
        }
    };

    p.scrollPageDown = function () {
        if (!this.scrollActive) {
            this.scrollActive = true;
        } else {
            return;
        }
        _getViewPortPosition(this);

        var tableViewWidth = this.renderer.tableBodyEl.parent().height(),
            tableBottomDistance = parseInt(this.renderer.tableBodyEl.css('bottom')),
            distance = (tableViewWidth + tableBottomDistance),
            mostLowerEl = this._getFirstItemInView(distance),
            scrollDistance;

        if (mostLowerEl !== undefined && mostLowerEl[0] !== undefined) {
            var elementPosition = mostLowerEl[0].getBoundingClientRect();

            if (this.renderer.tableBodyEl[0].contains(mostLowerEl[0])) {

                if ((elementPosition.bottom - this.options.scroller.pagingItemTolerance * elementPosition.height) > this.viewPortProperties.bottom) {
                    scrollDistance = -(mostLowerEl[0].offsetTop - (this.scrollerBody.y * -1));
                } else {
                    if (mostLowerEl.next('tr:not(.hidden)')[0] === undefined) {
                        this.scrollActive = false;
                        return;
                    }
                    scrollDistance = -(mostLowerEl.next('tr:not(.hidden)')[0].offsetTop - (this.scrollerBody.y * -1));
                }
                //check that scrollDistance is not exceeding wrapper size, it it does scroll remaining space
                if ((this.renderer.tableBodyEl.height() - this.renderer.tableBodyEl.parent().height()) < -(this.scrollerBody.y + scrollDistance)) {
                    scrollDistance = -(this.renderer.tableBodyEl.height() - (-this.scrollerBody.y + this.renderer.tableBodyEl.parent().height()));
                }
                this.scrollerBody.scrollBy(0, scrollDistance, this.options.scroller.scrollDuration);
            }
        } else {
            this.scrollActive = false;
        }
    };

    p.calcScrollItemOffset = function () {
        if (this.scrollActive) {
            return;
        }
        _getViewPortPosition(this);
        var upperLeftEl = $(document.elementFromPoint(this.viewPortProperties.left + 1, this.viewPortProperties.top + 1)).closest('td');

        if (upperLeftEl[0] !== undefined) {
            var elementPosition = upperLeftEl[0].getBoundingClientRect(),
                columnOffset,
                rowOffset;

            if (this.renderer.tableBodyEl[0].contains(upperLeftEl[0])) {
                if ((elementPosition.left + this.options.scroller.pagingItemTolerance * elementPosition.width) < this.viewPortProperties.left) {
                    columnOffset = this.renderer.table.column(upperLeftEl.next('td').length > 0 ? upperLeftEl.next('td') : upperLeftEl).index();
                } else {
                    columnOffset = this.renderer.table.column(upperLeftEl).index();
                }
                if ((elementPosition.top + this.options.scroller.pagingItemTolerance * elementPosition.height) < this.viewPortProperties.top) {
                    rowOffset = this.renderer.table.row(upperLeftEl.parents('tr').next('tr').length > 0 ? upperLeftEl.parents('tr').next('tr') : upperLeftEl).index();
                } else {
                    rowOffset = this.renderer.table.row(upperLeftEl).index();
                }
            }
            this.renderer.widget[this.options.scrollCallbackFn]({ row: rowOffset, column: columnOffset });
            return;
        }
        this.renderer.widget[this.options.scrollCallbackFn]({ row: 0, column: 0 });
    };

    p.scrollTo = function (position, direction, header) {
        switch (direction) {
            case 'X':
                if (header) {
                    this.scrollerBody.scrollTo(position.x, this.scrollerBody.y, 0);
                    this.scrollerHead.scrollTo(position.x, this.scrollerHead.y, 0);
                } else {
                    this.scrollerBody.scrollTo(position.x, this.scrollerBody.y, 0);
                }

                if (brease.config.editMode) {
                    this.scrollerEditHead.scrollTo(position.x, this.scrollerEditHead.y, 0);
                }

                break;
            case 'Y':
                if (header) {
                    this.scrollerBody.scrollTo(this.scrollerBody.x, position.y, 0);
                    this.scrollerHead.scrollTo(this.scrollerHead.x, position.y, 0);
                } else {
                    this.scrollerBody.scrollTo(this.scrollerBody.x, position.y, 0);
                }

                if (brease.config.editMode) {
                    this.scrollerEditHead.scrollTo(this.scrollerEditHead.y, position.y, 0);
                }

                break;
            default:
                break;
        }
    };

    p._refreshScroller = function () {
        var renderer = this;

        if (this.scrollerBody) {
            this.refreshTimeOutBody = window.setTimeout(function () {
                if (renderer.scrollerBody !== null) {
                    renderer.scrollerBody.refresh();
                    renderer.calcScrollItemOffset();
                }
            }, 100);
        }
        if (this.scrollerHead) {
            this.refreshTimeOutHead = window.setTimeout(function () {
                if (renderer.scrollerHead !== null) {
                    renderer.scrollerHead.refresh();

                    if (brease.config.editMode) {
                        renderer._refreshEditorScroller();
                    }
                }
            }, 100);
        }

        if (this.scrollerEditHead) {
            this.refreshTimeOutHeadEdit = window.setTimeout(function () {
                if (renderer.scrollerEditHead !== null) {
                    // renderer.scrollerEditHead.refresh();
                }
            }, 100);
        }
    };

    p._refreshEditorScroller = function () {
        // this.handlesUpdate = handlesUpdate;
        // if (this.handlesUpdate) {
        if (this.renderer.tableReady && !!this.scrollerBody && !!this.scrollerHead) {
            if ((this.settings.dataOrientation === Enum.Direction.vertical)) {
                this.scrollerHead.scrollTo(this.scrollerBody.x, 0, 0);
                this.widget.el.find('.headerContainer').css('left', this.scrollerBody.x);
            } else {
                this.scrollerHead.scrollTo(0, this.scrollerBody.y, 0);
                if (brease.config.editMode) {
                    this.widget.el.find('.headerContainer').css('top', this.scrollerBody.y);
                }
            }
        }
        // }
    };

    p._getFirstItemInView = function (distance) {
        var i = 0, accDistance = 0, item;

        while (accDistance < distance) {
            if (this.settings.dataOrientation === Enum.Direction.vertical) {
                item = this.renderer.tableBodyEl.find('tr:eq(' + i + ')');
                accDistance += item.height();
                if (i > this.widget.model.getData().length) {
                    break; //safety check
                }
            } else {
                item = this.renderer.tableBodyEl.find('td:eq(' + i + ')');
                accDistance += item.width();
                if (i > this.widget.model.getData().length) {
                    break; //safety check
                }
            }
            i += 1;

        }
        return item;
    };

    p._addBodyScroller = function () {
        var scroller = this,
            parentHeight = (scroller.widget.settings.maxHeight > scroller.widget.settings.height) ? Math.max(
                Math.min(
                    scroller.widget.container.find('.dataTable').outerHeight() + scroller.widget.settings.headerBarSize, 
                    scroller.widget.settings.maxHeight
                ), 
                scroller.widget.settings.height
            ) : scroller.widget.settings.height;
        parentHeight -= (scroller.settings.dataOrientation === Enum.Direction.vertical && scroller.settings.showHeader) ? scroller.renderer.settings.headerBarSize : 0;
        if (scroller.settings.borderWidth) parentHeight -= 2 * parseInt(scroller.settings.borderWidth);
        scroller.renderer.tableBodyEl.parent().height(parentHeight);
        scroller.scrollerBody = Scroller.addScrollbars(scroller.renderer.tableBodyEl.parent()[0],
            {
                probeType: 3,
                mouseWheel: true,
                tap: true,
                click: false,
                useTransition: false,
                useTransform: false, //using false increase performance but makes scrolling looking less smooth
                scrollY: _copyItem(scroller.options.scroller.scrollY),
                scrollX: _copyItem(scroller.options.scroller.scrollX),
                bounce: _copyItem(scroller.options.scroller.bounce),
                momentum: _copyItem(scroller.options.scroller.momentum),
                scrollbars: _copyItem(scroller.options.scroller.scrollbars)
            });

        if (scroller.settings.dataOrientation === Enum.Direction.vertical) {
            scroller.scrollerBody.on('scroll', _.bind(_scrollLinkVertical, scroller));

        } else if (scroller.settings.dataOrientation === Enum.Direction.horizontal) {
            scroller.scrollerBody.on('scroll', _.bind(_scrollLinkHorizontal, scroller));
        }
        scroller.scrollerBody.on('scrollStart', _.bind(_scrollStart, scroller));
        scroller.scrollerBody.on('scrollEnd', _.bind(_scrollEnd, scroller));

        if (!scroller.settings.enable) {
            scroller.scrollerBody.disable();
        }
    };

    p._removeScroller = function () {
        var scroller = this;

        if (scroller.scrollerBody) {
            scroller.scrollerBody.off('scroll', _.bind(_scrollLinkVertical, scroller));
            scroller.scrollerBody.off('scroll', _.bind(_scrollLinkHorizontal, scroller));
            scroller.scrollerBody.off('scrollStart', _.bind(_scrollStart, scroller));
            scroller.scrollerBody.off('scrollEnd', _.bind(_scrollEnd, scroller));
            window.clearTimeout(scroller.scrollOffsetTimeOut);
            scroller.scrollerBody.destroy();
            scroller.scrollerBody = null;
            window.clearTimeout(scroller.refreshTimeOutBody);
            scroller.refreshTimeOutBody = null;
        }
        if (scroller.scrollerHead) {
            scroller.scrollerHead.destroy();
            scroller.scrollerHead = null;
            window.clearTimeout(scroller.refreshTimeOutHead);
            scroller.refreshTimeOutHead = null;
        }

        if (brease.config.editMode && scroller.scrollerEditHead) {
            scroller.scrollerEditHead.destroy();
            scroller.scrollerEditHead = null;
            window.clearTimeout(scroller.refreshTimeOutHeadEdit);
            scroller.refreshTimeOutHeadEdit = null;
        }
        // scroller.renderer.tableBodyEl.off('selectItem', _.bind(scroller.renderer._itemSelectHandler, scroller.renderer));
        // scroller.renderer.tableBodyEl.off(BreaseEvent.MOUSE_DOWN, _.bind(scroller.renderer._mouseDownHandler, scroller.renderer));
    };

    p.dispose = function () {
        this._removeScroller();
        SuperClass.prototype.dispose.apply(this, arguments);
    };

    function _getViewPortPosition(scroller) {
        scroller.viewPortProperties = scroller.renderer.tableBodyEl.parent()[0].getBoundingClientRect();
    }

    function _addHeaderScroller(scroller) {
        scroller.scrollerHead = Scroller.addScrollbars(scroller.renderer.tableHeaderEl.parent()[0],
            {
                probeType: 3,
                disableMouse: false,
                disableTouch: false,
                disablePointer: true,
                scrollbars: false,
                mouseWheel: true,
                tap: false,
                click: false,
                useTransition: false,
                useTransform: false, //using false increase performance but makes scrolling looking less smooth
                scrollY: _copyItem(scroller.options.scroller.scrollY),
                scrollX: _copyItem(scroller.options.scroller.scrollX),
                bounce: _copyItem(scroller.options.scroller.bounce),
                momentum: _copyItem(scroller.options.scroller.momentum)
            });
        
        scroller.scrollerHead.on('scrollStart', _.bind(_scrollStart, scroller));
        scroller.scrollerHead.on('scrollEnd', _.bind(_scrollEndHead, scroller));

        if (scroller.settings.dataOrientation === Enum.Direction.vertical) {
            scroller.scrollerHead.on('scroll', _.bind(_scrollLinkVerticalHeader, scroller));

        } else if (scroller.settings.dataOrientation === Enum.Direction.horizontal) {
            scroller.scrollerHead.on('scroll', _.bind(_scrollLinkHorizontalHeader, scroller));
        }
    }

    function _addEditorHeaderScroller(scroller) {
        var editorScrollers = scroller.widget.el.find('.headerContainer')[0];
        if (editorScrollers && editorScrollers.childElementCount > 0) {
            scroller.scrollerEditHead = Scroller.addScrollbars(editorScrollers,
                {
                    disableMouse: false,
                    disableTouch: false,
                    disablePointer: true,
                    scrollbars: false,
                    mouseWheel: true,
                    tap: false,
                    click: false,
                    useTransition: false,
                    useTransform: false, //using false increase performance but makes scrolling looking less smooth
                    scrollY: _copyItem(scroller.options.scroller.scrollY),
                    scrollX: _copyItem(scroller.options.scroller.scrollX),
                    bounce: _copyItem(scroller.options.scroller.bounce),
                    momentum: _copyItem(scroller.options.scroller.momentum)
                });
        }
    }

    function _copyItem(item) {
        return JSON.parse(JSON.stringify(item));
    }

    function _scrollStart() {
        this.scrollActive = true;
    }

    function _scrollEnd() {
        this.scrollActive = false;
        var renderer = this;
        if (this.renderer.tableReady && !!this.scrollerBody && !!this.scrollerHead) {
            if ((this.settings.dataOrientation === Enum.Direction.vertical)) {
                this.scrollerHead.scrollTo(this.scrollerBody.x, 0, 0);
                if (brease.config.editMode) {
                    this.widget.el.find('.headerContainer').css('left', this.scrollerBody.x);
                }
            } else {
                this.scrollerHead.scrollTo(0, this.scrollerBody.y, 0);
                if (brease.config.editMode) {
                    this.widget.el.find('.headerContainer').css('top', this.scrollerBody.y);
                }
            }
            window.clearTimeout(this.scrollOffsetTimeOut);
            this.scrollOffsetTimeOut = window.setTimeout(function () {
                renderer.calcScrollItemOffset();
            }, 100);
        }

    }

    function _scrollEndHead() {
        this.scrollActive = false;
        var renderer = this;
        if (this.renderer.tableReady && !!this.scrollerBody && !!this.scrollerHead) {
            if ((this.settings.dataOrientation === Enum.Direction.vertical)) {
                this.scrollerBody.scrollTo(this.scrollerHead.x, 0, 0);
            } else {
                this.scrollerBody.scrollTo(0, this.scrollerHead.y, 0);
            }
            window.clearTimeout(this.scrollOffsetTimeOut);
            this.scrollOffsetTimeOut = window.setTimeout(function () {
                renderer.calcScrollItemOffset();
            }, 100);
        }

    }

    function _scrollLinkVertical() {
        if (this.renderer.tableReady && !!this.scrollerBody && !!this.scrollerHead) {
            var event = new CustomEvent('ScrollXY', { 'detail': { 'x': this.scrollerBody.x, 'y': this.scrollerBody.y } });
            this.widget.elem.dispatchEvent(event);
            this.scrollerHead.scrollTo(this.scrollerBody.x, 0, 0);
        }
    }
    
    function _scrollLinkHorizontal() {
        if (this.renderer.tableReady && !!this.scrollerBody && !!this.scrollerHead) {
            var event = new CustomEvent('ScrollXY', { 'detail': { 'x': this.scrollerBody.x, 'y': this.scrollerBody.y } });
            this.widget.elem.dispatchEvent(event);
            this.scrollerHead.scrollTo(0, this.scrollerBody.y, 0);
        }
    }

    function _scrollLinkVerticalHeader() {
        if (this.renderer.tableReady && !!this.scrollerBody && !!this.scrollerHead) {
            this.scrollerBody.scrollTo(this.scrollerHead.x, 0, 0);
        }
    }

    function _scrollLinkHorizontalHeader() {
        if (this.renderer.tableReady && !!this.scrollerBody && !!this.scrollerHead) {
            this.scrollerBody.scrollTo(0, this.scrollerHead.y, 0);
        }
    }

    return ScrollHandler;

});
