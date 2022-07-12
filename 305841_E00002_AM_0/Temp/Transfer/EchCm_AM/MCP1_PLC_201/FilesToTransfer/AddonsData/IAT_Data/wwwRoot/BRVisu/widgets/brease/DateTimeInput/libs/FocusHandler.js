define(['brease/events/BreaseEvent',
    'brease/helper/DateFormatter',
    'brease/enum/Enum',
    'brease/controller/libs/KeyActions',
    'brease/core/Utils'],
function (BreaseEvent, dateFormatter, Enum, KeyActions, Utils) {

    'use strict';

    var SCROLL_ACTIONS = [Enum.KeyAction.ScrollDown, Enum.KeyAction.ScrollUp, Enum.KeyAction.ScrollRight, Enum.KeyAction.ScrollLeft, Enum.KeyAction.ScrollDownFast, Enum.KeyAction.ScrollUpFast];

    var FocusHandler = function (widget) {
            this.widget = widget;
            this.editMode = false;
            this.showTimePicker = true;
            this.closeTimePicker = false;
            if (brease.config.isKeyboardOperationEnabled()) {
                this.widget.el.on(BreaseEvent.FOCUS_OUT, this.onFocusOut.bind(this));
                this.widget.el.on(BreaseEvent.BEFORE_ENABLE_CHANGE, this.onBeforeStateChange.bind(this));
                this.widget.el.on(BreaseEvent.BEFORE_VISIBLE_CHANGE, this.onBeforeStateChange.bind(this));
            }
        },
        p = FocusHandler.prototype,
        itemFocusClass = 'elementFocus';
    p.handleKeyDown = function (e) {
        var action = KeyActions.getActionForKey(e.key);
        this.showTimePicker = true;
        this.closeTimePicker = false;

        if (!this.editMode) {
            if (brease.config.keyboardHandling.onStart.action === 'any') {
                if (action === Enum.KeyAction.Accept) {
                    startEditMode.call(this);
                } else if (SCROLL_ACTIONS.includes(action)) {
                    this.widget.showTimePicker();
                    startEditMode.call(this);
                    this.editModeKeyDownHandler(action, e);
                } else if (action === Enum.KeyAction.Cancel) {
                    cancel.call(this);
                }

            } else {
                if (action === Enum.KeyAction.Accept) {
                    startEditMode.call(this);
                } else if (action === Enum.KeyAction.Cancel) {
                    cancel.call(this);
                }
            }
        } else {
            this.editModeKeyDownHandler(action, e);
        }
        if (this.widget.internalData.timePickerOpen) {
            this.editMode = true;
        }
    };
    p.editModeKeyDownHandler = function (action, e) {
        if (action === Enum.KeyAction.ScrollDown) {
            moveFocusBy.call(this, 1);
        } else if (action === Enum.KeyAction.ScrollUp) {
            moveFocusBy.call(this, (-1));
        } else if (action === Enum.KeyAction.ScrollRight) {
            moveFocusByColumn.call(this, 1);
        } else if (action === Enum.KeyAction.ScrollLeft) {
            moveFocusByColumn.call(this, (-1));
        } else if (action === Enum.KeyAction.ScrollDownFast) {
            moveFocusBy.call(this, 5);
        } else if (action === Enum.KeyAction.ScrollUpFast) {
            moveFocusBy.call(this, (-5));
        } else if (action === Enum.KeyAction.Accept) {
            if (focusedResetBtn.call(this)) {
                this.widget.setValue(this.widget.oldValue);
            } else {
                this.widget.timePicker._submitValue(e);
                endEditMode.call(this);
                this.closeTimePicker = true;
                this.showTimePicker = false;
            }
        } else if (action === Enum.KeyAction.Cancel) {
            cancel.call(this);
        }
    };
    p.onFocusOut = function (e) {
        if (this.editMode) {
            if (brease.config.keyboardHandling.onEnd.action === 'focus') {
                this.widget.timePicker._submitValue(e);
                endEditMode.call(this);
            } else if (brease.config.keyboardHandling.onEnd.action === 'accept') {
                cancel.call(this);
            }
        }
    };

    // called before enable or visible state changes
    p.onBeforeStateChange = function (e) {
        if (!e.detail.value) {
            cancel.call(this);
        }
    };

    p.dispose = function () {
        this.widget.el.off(BreaseEvent.FOCUS_OUT).off(BreaseEvent.BEFORE_ENABLE_CHANGE).off(BreaseEvent.BEFORE_VISIBLE_CHANGE);
        this.widget = undefined;
    };

    p.focusLeftColumn = function () {
        var leftColumn = getLeftColFromFormat.call(this, this.widget),
            dateTimePickerObjArray = this.widget.timePicker.DateTimePickerObjArray;
        dateTimePickerObjArray.forEach(function (item) {
            if (item.$el) {
                item.$el[0].style.padding = '';
                Utils.removeClass(item.$el[0], itemFocusClass);
            } else {
                item[0].style.padding = '';
                Utils.removeClass(item[0], itemFocusClass);
            }
        });
        if (leftColumn !== undefined) {
            Utils.addClass(leftColumn.$el[0], itemFocusClass);
            var highestZIndex = Utils.getHighestZindex(document.querySelectorAll('.dtfragment, .dateTimePickerReset, .dateTimePickerEnter'));
            _setHighestZIndexCol(leftColumn, highestZIndex);
            _setNegativeOffsetStyle();
        }
    };

    p.removeFocusSelectedColumn = function () {
        this.widget.timePicker.el.find('.' + itemFocusClass).removeClass(itemFocusClass);
    };

    function _setHighestZIndexCol(selectedColumn, highestZIndex) {
        selectedColumn.$el.css('z-index', highestZIndex + 1);
    }

    function _setHighestZIndexButt(selectedButton, highestIndex) {
        selectedButton.css('z-index', highestIndex + 1);
    }

    function _setNegativeOffsetStyle() {
        var outlineOffset = $('.' + itemFocusClass).css('outline-offset'),
            marginRight = 5,
            dtfragmentEl;
        outlineOffset = parseInt(outlineOffset, 10);
        if (Math.sign(outlineOffset) === -1) {
            var dtfragmentElem = document.querySelectorAll('.dtfragment'),
                l = dtfragmentElem.length,
                marginDiff = marginRight + outlineOffset;
            for (var i = 0; i < l; i += 1) {
                dtfragmentEl = $(dtfragmentElem[i]);
                dtfragmentEl.css('padding', '');
                if (i === (l - 1)) {
                    dtfragmentEl.css('margin-right', outlineOffset + 'px');
                } else if (i === 0) {
                    dtfragmentEl.css('margin-left', outlineOffset + 'px');
                    dtfragmentEl.css('margin-right', marginDiff + 'px');
                } else {
                    dtfragmentEl.css('margin-right', marginDiff + 'px');
                }
                dtfragmentEl.css('padding', '0 ' + outlineOffset * (-1) + 'px');

            }
        }
    }
    function getLeftColFromFormat(widget) {
        var format = dateFormatter.getFormat4Pattern(widget.settings.format);
        if (!format) {
            format = widget.settings.format;
        }
        return leftColFromFormat.call(this, format);
    }
    function leftColFromFormat(format) {
        if ((format.indexOf('y') !== -1) || (format.indexOf('Y') !== -1)) {
            return this.widget.timePicker.DateTimePickerYear;
        } else if (format.indexOf('M') !== -1) {
            return this.widget.timePicker.DateTimePickerMonth;
        } else if ((format.indexOf('d') !== -1) || format.indexOf('D') !== -1) {
            return this.widget.timePicker.DateTimePickerDay;
        } else if ((format.indexOf('h') !== -1) || (format.indexOf('H') !== -1)) {
            return this.widget.timePicker.DateTimePickerHour;
        } else if (format.indexOf('m') !== -1) {
            return this.widget.timePicker.DateTimePickerMinute;
        } else if ((format.indexOf('s') !== -1) || (format.indexOf('S') !== -1)) {
            return this.widget.timePicker.DateTimePickerSecond;
        }
        return undefined;
    }

    /*
    * @method getFocusedColumn
    * Returns the focused column
    * @param {jQuery} dtfragment
    * @return {Boolean}
        */
    function getFocusedColumn(dtfragment) {
        if (dtfragment.hasClass('year')) {
            return this.widget.timePicker.DateTimePickerYear;
        } else if (dtfragment.hasClass('month')) {
            return this.widget.timePicker.DateTimePickerMonth;
        } else if (dtfragment.hasClass('day')) {
            return this.widget.timePicker.DateTimePickerDay;
        } else if (dtfragment.hasClass('hour')) {
            return this.widget.timePicker.DateTimePickerHour;
        } else if (dtfragment.hasClass('minute')) {
            return this.widget.timePicker.DateTimePickerMinute;
        } else if (dtfragment.hasClass('second')) {
            return this.widget.timePicker.DateTimePickerSecond;
        } else if (dtfragment.hasClass('dateTimePickerReset')) {
            return this.widget.timePicker.btnReset;
        } else if (dtfragment.hasClass('dateTimePickerEnter')) {
            return this.widget.timePicker.btnEnter;
        }
        return undefined;
    }

    /*
    * @method focusedResetBtn
    * Returns whether button reset is focused
    * @return {Boolean}
        */
    function focusedResetBtn() {
        return $('.dateTimePickerReset').hasClass(itemFocusClass);
    }

    function findHighestColumnIndex(timePicker, focusedColumn) {
        var highestIndex = 0;
        Object.keys(timePicker).forEach(function (item) {
            if (timePicker[item] && timePicker[item].columnIndex) {
                highestIndex = timePicker[item].columnIndex;
                if (focusedColumn && focusedColumn.columnIndex && timePicker[item].columnIndex === focusedColumn.columnIndex + 1) {
                    highestIndex = timePicker[item].columnIndex;
                }
            }
        });
        return highestIndex;
    }

    function moveFocusBy(step) {
        var dtfragment = this.widget.timePicker.el.find('.' + itemFocusClass),
            index, focusedColumn;
        focusedColumn = getFocusedColumn.call(this, dtfragment);
        if (focusedColumn !== undefined) {
            index = focusedColumn.index;
            var nextIndex = parseInt(index, 10) + step;
            if (nextIndex <= -1) {
                setIndex.call(this, 0, focusedColumn);
            } else if (nextIndex >= focusedColumn.data.length) {
                setIndex.call(this, focusedColumn.data.length - 1, focusedColumn);
            } else {
                setIndex.call(this, nextIndex, focusedColumn);
            }
        }
    }

    function moveFocusByColumn(step) {
        var dtfragment = this.widget.timePicker.el.find('.' + itemFocusClass),
            focusedColumn = getFocusedColumn.call(this, dtfragment),
            dateTimePickerObjArray = this.widget.timePicker.DateTimePickerObjArray,
            highestIndex,
            btnReset = dateTimePickerObjArray[7],
            btnEnter = dateTimePickerObjArray[6];
        highestIndex = findHighestColumnIndex(dateTimePickerObjArray, focusedColumn);
        if (focusedColumn === undefined) {
            this.focusLeftColumn();
        }

        Utils.removeClass(dtfragment[0], itemFocusClass);
        var highestZIndex = Utils.getHighestZindex(document.querySelectorAll('.dtfragment, .dateTimePickerReset, .dateTimePickerEnter'));
        Utils.removeClass(dtfragment[0], itemFocusClass);
        dateTimePickerObjArray.forEach(function (item) {
            if (item && focusedColumn) {
                if (item.columnIndex) {
                    if (item.columnIndex === focusedColumn.columnIndex + step) {
                        Utils.addClass(item.$el[0], itemFocusClass);
                        _setHighestZIndexCol(item, highestZIndex);
                    }
                    stepLeftRightOnEdge(step, focusedColumn, btnEnter, btnReset, item, highestZIndex, highestIndex);
                }
            }
        });
    }

    /*
    * @method stepLeftRightOnEdge
    * cursor steps on edge including Enter/Reset button
    * @param {Numeric} step
    * @param {Object} focusedColumn
    * @param {Object} timePicker
    * @param {String} item
    * @param {Numeric} highestZIndex
    * @param {Numeric} highestIndex
    * Returns 
    * @return {Boolean}
        */
    function stepLeftRightOnEdge(step, focusedColumn, btnEnter, btnReset, item, highestZIndex, highestIndex) {
        if (step === 1) {
            if (focusedColumn.selector === '.dateTimePickerReset') {
                Utils.addClass(btnEnter[0], itemFocusClass);
                _setHighestZIndexButt(btnEnter, highestZIndex);
            } else if (focusedColumn.selector === '.dateTimePickerEnter') {
                if (item.columnIndex === 1) {
                    Utils.addClass(item.$el[0], itemFocusClass);
                    _setHighestZIndexCol(item, highestZIndex);
                }
            } else if (focusedColumn.columnIndex === highestIndex) {
                Utils.addClass(btnReset[0], itemFocusClass);
                _setHighestZIndexButt(btnReset, highestZIndex);
            }
        } else if (step === -1) {
            if (focusedColumn.selector === '.dateTimePickerReset') {
                if (item.columnIndex === highestIndex) {
                    Utils.addClass(item.$el[0], itemFocusClass);
                    _setHighestZIndexCol(item, highestZIndex);
                }
            } else if (focusedColumn.selector === '.dateTimePickerEnter') {
                Utils.addClass(btnReset[0], itemFocusClass);
                _setHighestZIndexButt(btnReset, highestZIndex);
            } else if (focusedColumn.columnIndex === 1) {
                Utils.addClass(btnEnter[0], itemFocusClass);
                _setHighestZIndexButt(btnEnter, highestZIndex);
            }
        }
    }

    function setIndex(nextIndex, focusedColumn) {
        if (typeof focusedColumn._setIndex === 'function') {
            focusedColumn._setIndex(nextIndex);
        }

    }

    function startEditMode() {
        this.editMode = true;
        this.focusLeftColumn();
    }

    function cancel() {
        endEditMode.call(this);
        this.widget.timePicker.hide();
    }
    function endEditMode() {
        if (this.editMode) {
            this.editMode = false;
        }

    }
    return FocusHandler;
});
