define([
    'brease/core/BaseWidget',
    'widgets/brease/DateTimeInput/libs/FocusHandler',
    'brease/decorators/CultureDependency',
    'brease/enum/Enum',
    'widgets/brease/DateTimePicker/DateTimePicker',
    'brease/events/BreaseEvent',
    'brease/helper/DateFormatter',
    'widgets/brease/common/libs/wfUtils/UtilsEditableBinding',
    'brease/decorators/DragAndDropCapability',
    'widgets/brease/common/DragDropProperties/libs/DraggablePropertiesEvents',
    'widgets/brease/common/DragDropProperties/libs/DroppablePropertiesEvents'
], function (SuperClass, FocusHandler, cultureDependency, Enum, DateTimePicker, BreaseEvent, dateFormatter, UtilsEditableBinding, dragAndDropCapability) {

    'use strict';

    /**
     * @class widgets.brease.DateTimeInput
     *
     * @mixins widgets.brease.common.DragDropProperties.libs.DroppablePropertiesEvents
     * @mixins widgets.brease.common.DragDropProperties.libs.DraggablePropertiesEvents
     *
     * #Description
     * A control for entering a date & time value with no time zone.  
     * To edit values, a virtual Timepicker (=DateTimePicker) will be shown  
     * @extends brease.core.BaseWidget
     * @requires widgets.brease.DateTimePicker
     *
     * @iatMeta category:Category
     * DateTime
     * @iatMeta description:short
     * Zeitingabe
     * @iatMeta description:de
     * Ermöglicht dem Benutzer einen Zeitwert einzugeben
     * @iatMeta description:en
     * Enables the user to enter a time
     */

    /**
     * @cfg {DateTime} value='1970-01-01T00:00:00.000Z'
     * @bindable
     * @iatStudioExposed
     * @iatCategory Data
     * @editableBinding
     * Set Date and Time via DATE_AND_TIME
     */

    /**
     * @cfg {brease.enum.Position} pickerPosition='right'
     * @iatStudioExposed
     * @iatCategory Appearance
     * Determines the position of the DateTimePicker relative to the opener.
     */

    /**
     * @cfg {Boolean} submitOnChange=true
     * @iatStudioExposed
     * @iatCategory Behavior
     * Determines if changes, triggered by user input, should be sent immediately to the server.
     */

    /**
     * @cfg {String} format='F'
     * @localizable
     * @iatStudioExposed
     * @iatCategory Appearance
     * @bindable 
     * Specifies the format of the time shown in the input field. This is either a format string (e.g. "HH:mm") or a pattern ("F").
     */

    /**
     * @cfg {Integer} tabIndex=0
     * @iatStudioExposed
     * @iatCategory Behavior 
     * sets if a widget should have autofocus enabled (0), the order of the focus (>0),
     * or if autofocus should be disabled (-1)
     */

    var defaultSettings = {
            pickerPosition: Enum.Position.right,
            submitOnChange: true,
            format: 'F',
            value: '1970-01-01T00:00:00.000Z',
            tabIndex: 0
        },

        WidgetClass = SuperClass.extend(function DateTimeInput() {
            SuperClass.apply(this, arguments);
        }, defaultSettings),

        p = WidgetClass.prototype;

    p.init = function () {
        if (this.settings.omitClass !== true) {
            this.addInitialClass('breaseDateTimeInput');
        }
        this.settings.overlayPosition = this.settings.pickerPosition;
        this.timePicker = new DateTimePicker();

        this.data = {
            value: new Date(0),
            timeZoneCorrectedValue: new Date(),
            timeZoneOffset: 0
        };

        this.input = $('<span>');
        this.el.append(this.input);

        if (this.timePicker.state === Enum.WidgetState.READY) {
            SuperClass.prototype.init.call(this);
        } else {
            document.body.addEventListener(BreaseEvent.WIDGET_READY, this._bind('timePicker_readyHandler'));
        }
        this.initText();
        _updateValue(this, this.settings.value);
        _showValue(this);
        this.focusHandler = new FocusHandler(this);
    };

    p._handleFocusKeyDown = function (e) {
        SuperClass.prototype._handleFocusKeyDown.apply(this, arguments);
        var oldEditMode = this.focusHandler.editMode;
        this.focusHandler.handleKeyDown(e);
        if (!this.focusHandler.editMode && oldEditMode) {
            this.internalData.isKeyDown = false; // prevent click if picker is already opened
        }
    };

    p.timePicker_readyHandler = function (e) {
        if (e.target.id === 'breaseDateTimePicker') {
            document.body.removeEventListener(BreaseEvent.WIDGET_READY, this._bind('timePicker_readyHandler'));
            SuperClass.prototype.init.call(this, true);
            this._dispatchReady();
        }
    };

    /**
     * @method setValue
     * Set the value of input field as a date time string
     * @iatStudioExposed
     * @param {DateTime} value
     */
    p.setValue = function (value) {
        //console.log('DateTimeInput[' + this.elem.id + '].setValue:', value, this.settings.timeFormat);
        if (value === undefined) {
            return;
        }

        _updateValue(this, value);
        _showValue(this);
    };

    /**
     * @method getValue
     * Get the value of input field as date and time
     * @iatStudioExposed
     * @return {DateTime}
     */
    p.getValue = function () {
        if (!isNaN(new Date(this.data.value).getTime())) {
            return this.data.value.toISOString();
        }
        return undefined;
    };

    /**
     * @method setPickerPosition
     * Sets pickerPosition
     * @param {brease.enum.Position} pickerPosition
     */
    p.setPickerPosition = function (pickerPosition) {

        this.settings.pickerPosition = pickerPosition;
    };

    /**
     * @method getPickerPosition 
     * Returns pickerPosition.
     * @return {brease.enum.Position}
     */
    p.getPickerPosition = function () {

        return this.settings.pickerPosition;
    };

    /**
     * @method setSubmitOnChange
     * Sets submitOnChange
     * @param {Boolean} submitOnChange
     */
    p.setSubmitOnChange = function (submitOnChange) {

        this.settings.submitOnChange = submitOnChange;
    };

    /**
     * @method getSubmitOnChange 
     * Returns submitOnChange
     * @return {Boolean}
     */
    p.getSubmitOnChange = function () {

        return this.settings.submitOnChange;
    };

    p.setEditable = function (editable, metaData) {
        UtilsEditableBinding.handleEditable(editable, metaData, this, ['value']);
    };

    p.initText = function () {
        if (this.settings.format !== undefined) {
            if (brease.language.isKey(this.settings.format) === false) {
                this.setFormat(this.settings.format);
            } else {
                this.setFormatKey(brease.language.parseKey(this.settings.format));
            }
        }
    };

    p.setFormatKey = function (key) {
        //console.debug(WidgetClass.name + '[id=' + this.elem.id + '].setTextKey:', key);
        if (key !== undefined) {
            this.settings.textkey = key;
            this.setCultureDependency(true);
            var formatFromTextKey = brease.language.getTextByKey(this.settings.textkey);
            if (formatFromTextKey !== 'undefined key') {
                this.settings.format = formatFromTextKey;
            } else {
                console.iatWarn(this.elem.id + ': Format textKey not found: ' + key);
            }
        } else {
            this.settings.textkey = undefined;
            console.iatInfo(this.elem.id + ': The text key is not valid : ' + key);
        }
    };

    p.cultureChangeHandler = function (e) {

        if (e === undefined || e.detail === undefined || e.detail.textkey === undefined || e.detail.textkey === this.settings.textkey) {
            this.setFormatKey(this.settings.textkey);
            _showValue(this);
        }

    };

    /**
     * @method setFormat
     * Sets format
     * @param {String} format
     */
    p.setFormat = function (format) {

        if (format !== undefined) {
            if (brease.language.isKey(format) === false) {
                this.settings.format = format;
                this.settings.textkey = undefined;
            } else {
                this.setFormatKey(brease.language.parseKey(format));
            }
        }

        _showValue(this);
    };

    /**
     * @method getFormat 
     * Returns format.
     * @return {String}
     */
    p.getFormat = function () {

        return this.settings.format;
    };

    /**
     * @method submitChange
     * Send value to the server, if binding for this widget exists.  
     * Usage of this method will only make sense, if submitOnChange=false, as otherwise changes are submitted automatically.
     */
    p.submitChange = function () {

        this.sendValueChange({ value: this.getValue() });
        _triggerValueChangedEvent(this);
    };

    p.showTimePicker = function () {
        _unbindDateTimePicker.call(this);
        _bindDateTimePicker.call(this);
        this._generatePickerSettings();
        this.timePicker.show(this.settings.pickerSettings, this.elem);
    };

    p._clickHandler = function (e) {
        this._handleEvent(e);
        if (!this.isDisabled) {
            this.el.addClass('active');
            if (this.focusHandler.showTimePicker === true) {
                this.internalData.timePickerOpen = true;
                this.showTimePicker();
            }
            if (!this.focusHandler.editMode) {
                this.focusHandler.removeFocusSelectedColumn();
            }
            if (this.focusHandler.closeTimePicker) {
                this.el.removeClass('active');
            }
            this.elem.focus();
        }

        this.focusHandler.closeTimePicker = false;
        this.focusHandler.showTimePicker = true;
        SuperClass.prototype._clickHandler.call(this, e);
    };

    p._mouseDownHandler = function (e) {
        e.originalEvent.preventDefault();
        this.focusHandler.removeFocusSelectedColumn();
    };

    p._timePickerCloseHandler = function () {
        _unbindDateTimePicker.call(this);
        this.internalData.timePickerOpen = false;
        this.focusHandler.editMode = false;
        this.el.removeClass('active');
    };

    p._timePickerSubmitHandler = function (e) {
        //Utils.setDate(this.date, 0, 0, e.detail.value, 0);

        this.data.value = new Date(e.detail.value);
        this.data.timeZoneCorrectedValue = new Date(e.detail.value);

        this.data.timeZoneOffset = this.data.value.getTimezoneOffset();
        this.data.value.setMinutes(this.data.value.getMinutes() - this.data.timeZoneOffset);

        _showValue(this);

        /**
         * @event change
         * Fired when value is changed by user    
         * @param {String} value
         * See at {@link brease.events.BreaseEvent#static-property-CHANGE BreaseEvent.CHANGE} for event type  
         * @eventComment
         */
        this.dispatchEvent(new CustomEvent(BreaseEvent.CHANGE, { detail: { value: this.data.value } }));

        if (this.settings.submitOnChange) {
            this.submitChange();
        }
    };

    p._generatePickerSettings = function () {

        this.settings.pickerSettings = {
            time: this.data.timeZoneCorrectedValue,
            dateTimeFormat: this.settings.format,
            pointOfOrigin: 'element',
            position: this.settings.pickerPosition === ('top') || this.settings.pickerPosition === ('bottom') ? { vertical: this.settings.pickerPosition } : { horizontal: this.settings.pickerPosition },
            arrow: {
                show: true,
                width: 12,
                position: this.settings.pickerPosition === 'right' || this.settings.pickerPosition === 'left' ? this.settings.pickerPosition === 'right' ? 'left' : 'right' : this.settings.pickerPosition === 'top' ? 'bottom' : 'top'
            }

        };
    };

    p.dispose = function () {
        _unbindDateTimePicker.call(this);
        if (this.timePicker) {
            this.timePicker = null;
        }
        SuperClass.prototype.dispose.apply(this, arguments);
    };

    p._enableHandler = function () {
        if (this.internalData.timePickerOpen) {
            this.timePicker.hide();
        }
        SuperClass.prototype._enableHandler.apply(this, arguments);
    };

    p._visibleHandler = function () {
        if (this.internalData.timePickerOpen) {
            this.timePicker.hide();
        }
        SuperClass.prototype._visibleHandler.apply(this, arguments);
    };

    // Private
    function _unbindDateTimePicker() {
        if (this.timePicker && this.timePicker.elem) {
            this.timePicker.removeEventListener(BreaseEvent.CLOSED, this._bind('_timePickerCloseHandler'));
            this.timePicker.removeEventListener(BreaseEvent.SUBMIT, this._bind('_timePickerSubmitHandler'));
            this.timePicker.el.off(BreaseEvent.MOUSE_DOWN, this._bind('_mouseDownHandler'));
        }
    }
    function _bindDateTimePicker() {
        if (this.timePicker && this.timePicker.elem) {
            this.timePicker.addEventListener(BreaseEvent.CLOSED, this._bind('_timePickerCloseHandler'));
            this.timePicker.addEventListener(BreaseEvent.SUBMIT, this._bind('_timePickerSubmitHandler'));
            this.timePicker.el.on(BreaseEvent.MOUSE_DOWN, this._bind('_mouseDownHandler'));
        }
    }
    function _updateValue(widget, value) {

        widget.data.value = new Date(value);
        widget.data.timeZoneCorrectedValue = new Date(value);
        widget.data.timeZoneOffset = widget.data.value.getTimezoneOffset();

        widget.data.timeZoneCorrectedValue.setMinutes(widget.data.timeZoneCorrectedValue.getMinutes() + widget.data.timeZoneOffset);
    }

    function _showValue(widget) {
        dateFormatter.format(widget.data.timeZoneCorrectedValue, widget.settings.format, function (result) {
            widget.input.text(result);
        });
    }

    function _triggerValueChangedEvent(widget) {

        /**
         * @event ValueChanged
         * @iatStudioExposed
         * Fired when the value changes.
         * @param {DateTime} value
         */
        var ev = widget.createEvent('ValueChanged', { value: widget.getValue() });
        ev.dispatch();
    }

    return dragAndDropCapability.decorate(cultureDependency.decorate(WidgetClass, true), false);
});
