define([
    'brease/core/BaseWidget',
    'brease/helper/Timer',
    'brease/decorators/CultureDependency',
    'brease/enum/Enum',
    'brease/core/Utils',
    'brease/events/BreaseEvent',
    'brease/helper/DateFormatter',
    'brease/decorators/DragAndDropCapability',
    'widgets/brease/common/DragDropProperties/libs/DraggablePropertiesEvents',
    'widgets/brease/common/DragDropProperties/libs/DroppablePropertiesEvents'
], function (SuperClass, Timer, cultureDependency, Enum, Utils, BreaseEvent, dateFormatter, dragAndDropCapability) {

    'use strict';

    /**
     * @class widgets.brease.DateTimeOutput
     *
     * @mixins widgets.brease.common.DragDropProperties.libs.DroppablePropertiesEvents
     * @mixins widgets.brease.common.DragDropProperties.libs.DraggablePropertiesEvents
     *
     * #Description
     * Widget to display actual time or date.
     * @extends brease.core.BaseWidget
     * @aside example datetimeoutput
     *
     * @iatMeta category:Category
     * DateTime
     * @iatMeta description:short
     * Ausgabe Datum und/oder Uhrzeit
     * @iatMeta description:de
     * Zeigt Datum und Uhrzeit in einem definierten Format an
     * @iatMeta description:en
     * Displays date and time in a specified format
     */

    /**
     * @htmltag examples
     * Config examples:  
     *   
     * Example for time only:
     *
     *      <div id="DateTimeOutput1" data-brease-widget="widgets/brease/DateTimeOutput" data-brease-options="{'format':'HH:mm:ss'}"></div>
     *      
     * Example for date only:
     *
     *      <div id="DateTimeOutput2" data-brease-widget="widgets/brease/DateTimeOutput" data-brease-options="{'format':'dddd, dd. MMMM yyyy'}"></div>
     *
     * Example for an included linebreak:
     *
     *      <div id="DateTimeOutput3" data-brease-widget="widgets/brease/DateTimeOutput" data-brease-options="{'format':'HH:mm:ss\'\n\'dd. MMMM yyyy'}"></div>
     *      
     * Example for a pattern:
     *
     *      <div id="DateTimeOutput4" data-brease-widget="widgets/brease/DateTimeOutput" data-brease-options="{'pattern':'D'}"></div>
     *
     *
     * For available patterns and formats see at **[Internationalization Guide](#!/guide/internationalization)**
     */

    /**
     * @cfg {String} format='F'
     * @localizable
     * @iatStudioExposed
     * @iatCategory Appearance
     * @bindable
     * Specifies the format of the time shown in the input field. This is either a format string (ee.g. "HH:mm") or a pattern ("F").
     */

    /**
   * @cfg {DateTime} value=''
   * @iatStudioExposed
   * @not_projectable
   * @bindable
   * @iatCategory Data
   * Set Date and Time via DATE_AND_TIME
   */

    /**
     * @cfg {brease.enum.TextAlign} textAlign='right' Text alignment
     */
    var _timer,
        defaultSettings = {
            format: 'F',
            textAlign: Enum.TextAlign.center,
            useClientTime: true
        },

        WidgetClass = SuperClass.extend(function DateTimeOutput() {
            SuperClass.apply(this, arguments);
        }, defaultSettings),

        p = WidgetClass.prototype;

    p.init = function () {
        if (this.settings.omitClass !== true) {
            this.addInitialClass('breaseDateTimeOutput');
        }

        SuperClass.prototype.init.call(this);
        this._invalidate();
        this.active = true;
        this.data = {
            value: Utils.getActDate(),
            timeZoneCorrectedValue: Utils.getActDate(),
            timeZoneOffset: 0
        };

        this.textEl = $('<span></span>');
        this.el.append(this.textEl);

        if (_timer === undefined) {
            _timer = new Timer(1000);
        }
        _timer.addEventListener(BreaseEvent.TICK, this._bind('timerHandler'));
        this.initText();
        _updateValue(this, this.data.value);
        _showValue(this);
    };

    /**
     * @method setValue
     * sets the date and time
     * @iatStudioExposed
     * @param {DateTime} value
     */
    p.setValue = function (value) {

        if (value !== undefined && typeof value === 'string') {
            _updateValue(this, value);
            _showValue(this);

            if (this.settings.useClientTime) {
                this.settings.useClientTime = false;
                _timer.removeEventListener(BreaseEvent.TICK, this._bind('timerHandler'));
            }
        }
    };

    /**
     * @method getValue
     * Get the value of output field as date and time
     * @iatStudioExposed
     * @return {DateTime}
     */
    p.getValue = function () {
        if (!isNaN(new Date(this.data.value).getTime())) {
            return this.data.value.toISOString();
        }
        return undefined;
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
        if (this.settings.textkey !== undefined) {
            this.setFormatKey(this.settings.textkey); 
        }
        _showValue(this);
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

    p.timerHandler = function (e) {

        this.data.value = new Date(e.detail.timestamp);
        this.data.timeZoneCorrectedValue = new Date(e.detail.timestamp);

        this.data.timeZoneOffset = this.data.value.getTimezoneOffset();
        this.data.value.setMinutes(this.data.value.getMinutes() - this.data.timeZoneOffset);

        _showValue(this);
    };

    p.dispose = function () {
        this.timeDisplay = null;
        this.dateDisplay = null;
        if (_timer !== undefined) {
            _timer.removeEventListener(BreaseEvent.TICK, this._bind('timerHandler'));
        }
        SuperClass.prototype.dispose.apply(this, arguments);
    };

    // Private
    function _updateValue(widget, value) {

        widget.data.value = new Date(value);
        widget.data.timeZoneCorrectedValue = new Date(value);
        widget.data.timeZoneOffset = widget.data.value.getTimezoneOffset();

        widget.data.timeZoneCorrectedValue.setMinutes(widget.data.timeZoneCorrectedValue.getMinutes() + widget.data.timeZoneOffset);
    }

    function _showValue(widget) {
        dateFormatter.format(widget.data.timeZoneCorrectedValue, widget.settings.format, function (result) {
            widget.textEl.text(result);
        });
    }

    return dragAndDropCapability.decorate(cultureDependency.decorate(WidgetClass, true), false);
});
