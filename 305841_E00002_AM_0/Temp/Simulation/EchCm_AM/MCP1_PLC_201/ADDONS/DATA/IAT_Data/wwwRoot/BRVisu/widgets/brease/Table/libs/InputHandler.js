define([
    'brease/core/Class',
    'brease/core/Utils',
    'brease/enum/Enum',
    'brease/events/BreaseEvent',
    'brease/core/Types',
    'brease/controller/KeyboardManager'
], function (
    SuperClass, Utils, Enum, BreaseEvent,
    Types, keyboardManager
) {

    'use strict';

    var InputHandler = SuperClass.extend(function InputHandler(widget, renderer) {
            this.widget = widget;
            this.settings = widget.settings;
            this.renderer = renderer;
            this.initialize();
        }, null),

        p = InputHandler.prototype;

    p.initialize = function () {
        SuperClass.call(this);

        if (!this.keyBoard) {
            this.keyBoard = keyboardManager.getKeyboard();
        }

        if (!this.numPad) {
            this.numPad = keyboardManager.getNumPad();
        }

        this.internalData = this.internalData || {}; 

        this.numberSeparators = brease.user.getSeparators();

        this.inputsReady = false;

        this.initializeInputs();

    };

    p.initializeInputs = function () {
        this.keyBoardInitState = new $.Deferred();
        this.numPadInitState = new $.Deferred();
        var widget = this;

        $.when(this.keyBoardInitState.promise(), this.numPadInitState.promise()).then(function () {
            document.body.removeEventListener(BreaseEvent.WIDGET_READY, _.bind(widget._inputReadyHandler, widget));
            widget.renderer.tableBodyEl[0].dispatchEvent(new CustomEvent('inputHandlerReady'));
            widget.inputsReady = true;
            document.body.addEventListener(BreaseEvent.SYSTEM_KEYBOARD_CHANGED, widget._bind('changeKeyBoard'));
        });

        if (this.keyBoard.state === Enum.WidgetState.READY) {
            this.keyBoardInitState.resolve();
        }
        if (this.numPad.state === Enum.WidgetState.READY) {
            this.numPadInitState.resolve();
        }

        if ((this.numPadInitState.state() !== 'resolved') || (this.keyBoardInitState.state() !== 'resolved')) {
            document.body.addEventListener(BreaseEvent.WIDGET_READY, _.bind(widget._inputReadyHandler, this));
        }
    };

    p._inputReadyHandler = function (e) {
        if (e.target.id === 'breaseNumPad' && this.numPadInitState !== null) {
            this.numPadInitState.resolve();
        }
        if (e.target.id === 'breaseKeyBoard' && this.keyBoardInitState !== null) {
            this.keyBoardInitState.resolve();
        }
    };

    p.requestCellInput = function (td) {
        if (this.widget.isDisabled) return;
        
        var activeCellIndex = this.renderer.table.cell(td).index(),
            omitRequest = false;

        if (this.renderer.settings.dataOrientation === Enum.Direction.vertical) {
            this.itemIndex = this.widget.model.getActualItem(activeCellIndex.column);
            this.activeIndex = this.widget.renderer.getPerpendicularItem(activeCellIndex.row);
            if (brease.callWidget(this.widget.settings.tableItemIds[this.itemIndex], 'isEnabled') === false) {
                omitRequest = true;
            }
        } else if (this.renderer.settings.dataOrientation === Enum.Direction.horizontal) {
            this.itemIndex = this.widget.model.getActualItem(activeCellIndex.row);
            this.activeIndex = this.widget.renderer.getPerpendicularItem(activeCellIndex.column);
            if (brease.callWidget(this.widget.settings.tableItemIds[this.itemIndex], 'isEnabled') === false) {
                omitRequest = true;
            }
        }
        if (omitRequest) {
            return false;
        }
        
        this.internalData.itemOpened = this.widget.settings.tableItemIds[this.itemIndex];

        this.activeCellEl = $(td);
        this.activeCellEl.addClass('activeInput');

        if (td.getAttribute('type') === 'number') {
            this.numPad.addEventListener(BreaseEvent.CLOSED, this._bind('_onNumPadClose'));
            this.numPad.addEventListener(BreaseEvent.SUBMIT, this._bind('_onNumPadSubmit'));
            this._generateNumPadSettings(td.innerHTML);
            this.numPad.show(this.numPadSettings, td);

        } else if (td.getAttribute('type') === 'string') {
            _bindKeyboard.call(this);
            this._generateKeyBoardSettings(td.innerHTML);
            this.keyBoard.show(this.keyBoardSettings, td);
        }
    };

    p._generateNumPadSettings = function (cellValue) {
        this.numPadSettings = {
            minValue: brease.callWidget(this.settings.tableItemIds[this.itemIndex], 'getMinValue'),
            maxValue: brease.callWidget(this.settings.tableItemIds[this.itemIndex], 'getMaxValue'),
            value: cellValue,
            format: this.settings.itemConfigs[this.itemIndex].inputConfig.format,
            unit: this.settings.itemConfigs[this.itemIndex].inputConfig.unit,
            useDigitGrouping: this.settings.itemConfigs[this.itemIndex].inputConfig.useDigitGrouping,
            limitViolationPolicy: this.settings.itemConfigs[this.itemIndex].inputConfig.limitViolationPolicy,
            pointOfOrigin: 'application',
            arrow: {
                show: false
            },

            // additional attributes to identify binding in NumPad
            contentId: this.widget.settings.parentContentId,
            widgetId: this.settings.tableItemIds[this.itemIndex],
            bindingAttributes: ['value']
        };

        if (this.settings.itemConfigs[this.itemIndex].inputConfig.inputStyle) {
            this.numPadSettings.style = this.settings.itemConfigs[this.itemIndex].inputConfig.inputStyle;
        }
    };

    p._generateKeyBoardSettings = function (cellValue) {
        this.keyBoardSettings = {
            text: cellValue,
            //Table does not support "restrict" feature (see TextInput), therefore passing a null string
            //restrict: this.settings.itemConfigs[this.itemIndex].inputConfig.restrict,
            restrict: '',
            maxLength: this.settings.itemConfigs[this.itemIndex].inputConfig.maxLength,
            type: Enum.InputType.text,
            pointOfOrigin: 'application',
            arrow: {
                show: false
            },

            // additional attributes to identify binding in KeyBoard
            contentId: this.widget.settings.parentContentId,
            widgetId: this.settings.tableItemIds[this.itemIndex],
            bindingAttributes: ['stringValue']
        };

        if (this.settings.itemConfigs[this.itemIndex].inputConfig.inputStyle) {
            this.keyBoardSettings.style = this.settings.itemConfigs[this.itemIndex].inputConfig.inputStyle;
        }
    };

    p._onNumPadClose = function () {
        _unbindNumPad.call(this);
        this.internalData.itemOpened = undefined;
        if (this.activeCellEl) {
            this.activeCellEl.removeClass('activeInput');
            this.activeCellEl = null;
        }
    };

    p._onNumPadSubmit = function (event) {
        var numberFormat = brease.callWidget(this.settings.tableItemIds[this.itemIndex], 'getNumberFormat'),
            submitValue = Utils.roundTo(event.detail.value, numberFormat.decimalPlaces);

        var formattedValue = brease.formatter.formatNumber(submitValue, numberFormat, this.numPadSettings.useDigitGrouping, this.numberSeparators);
        this.activeCellEl.removeClass('activeInput');
        this._submitData(formattedValue);
        _unbindNumPad.call(this);
    };

    p._onKeyBoardClose = function () {
        _unbindKeyboard.call(this);
        this.internalData.itemOpened = undefined;
        if (this.activeCellEl) {
            this.activeCellEl.removeClass('activeInput');
            this.activeCellEl = null;
        }
    };

    p._onKeyBoardSubmit = function (event) {
        this._submitData(event.detail);
    };

    p._submitData = function (value) {
        this.renderer.updateCell(null, null, value, this.activeCellEl[0]);
        this.widget.model.setValue(this.itemIndex, this.activeIndex, value);
        var data = this.widget.model.getOriginalItemData(this.itemIndex);
        this.widget.submitUserInput(this.itemIndex, data);
    };

    p.closeInputWidgets = function (tableItemId) {
        //If the item that opened an input widget gets disabled we must close the input widget
        //If the table gets disabled, regardless of which item opened the input widget, we must close it
        //If an item that didn't open the input widget gets disabled we should not close the input widget.
        //If another widget opened the input widget and the table gets disabled, we shouldnt not close the input widget
        if ((tableItemId !== undefined && this.internalData.itemOpened === tableItemId) || (tableItemId === undefined && this.internalData.itemOpened !== undefined)) {
            this.keyBoard.hide();
            this.numPad.hide();
        }
    };

    p.changeKeyBoard = function (e) {
        _unbindKeyboard.call(this, false);
        this.keyBoard = keyboardManager.getKeyboard();
        if (this.activeCellEl) {
            _bindKeyboard.call(this, false);
            this.keyBoardSettings.text = e.detail.currentValue;
            this.keyBoard.show(this.keyBoardSettings, this.activeCellEl[0]);
        }
    };

    p.dispose = function () {
        this.itemIndex = null;
        this.activeIndex = null;
        this.numberSeparators = null;
        this.numPadSettings = null;
        this.keyBoardSettings = null;
        _unbindNumPad.call(this);
        _unbindKeyboard.call(this);
        this.activeCellEl = null;

        document.body.removeEventListener(BreaseEvent.SYSTEM_KEYBOARD_CHANGED, this._bind('changeKeyBoard'));
        document.body.removeEventListener(BreaseEvent.WIDGET_READY, _.bind(this._inputReadyHandler, this));
        this.keyBoardInitState = null;
        this.numPadInitState = null;

        if (this.keyBoard) {
            this.keyBoard = null;
        }
        if (this.numPad) {
            this.numPad = null;
        }

        SuperClass.prototype.dispose.apply(this, arguments);
    };

    p.suspend = function () {
        document.body.removeEventListener(BreaseEvent.SYSTEM_KEYBOARD_CHANGED, this._bind('changeKeyBoard'));
    };

    p.wake = function () {
        document.body.addEventListener(BreaseEvent.SYSTEM_KEYBOARD_CHANGED, this._bind('changeKeyBoard'));
        if (!keyboardManager.isCurrentKeyboard(this.keyBoard)) {
            this.changeKeyBoard();
        }
    };

    function _unbindNumPad() {
        if (this.numPad && this.numPad.elem) {
            this.numPad.removeEventListener(BreaseEvent.CLOSED, this._bind('_onNumPadClose'));
            this.numPad.removeEventListener(BreaseEvent.SUBMIT, this._bind('_onNumPadSubmit'));
        }
    }

    function _unbindKeyboard() {
        if (this.keyBoard) {
            this.keyBoard.removeEventListener(BreaseEvent.CLOSED, this._bind('_onKeyBoardClose'));
            this.keyBoard.removeEventListener(BreaseEvent.SUBMIT, this._bind('_onKeyBoardSubmit'));
        }
    }

    function _bindKeyboard() {
        if (this.keyBoard) {
            this.keyBoard.addEventListener(BreaseEvent.CLOSED, this._bind('_onKeyBoardClose'));
            this.keyBoard.addEventListener(BreaseEvent.SUBMIT, this._bind('_onKeyBoardSubmit'));
        }
    }

    return InputHandler;

});
