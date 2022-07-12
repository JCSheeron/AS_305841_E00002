define([
    'widgets/brease/TableItemWidget/TableItemWidget',
    'brease/decorators/LanguageDependency',
    'brease/decorators/MeasurementSystemDependency',
    'brease/config/NumberFormat',
    'brease/datatype/ArrayNode',
    'brease/core/Utils',
    'brease/core/Types',
    'brease/enum/Enum',
    'widgets/brease/common/libs/wfUtils/UtilsEditableBinding'
], function (
    SuperClass, languageDependency, 
    measurementSystemDependency, NumberFormat, 
    ArrayNode, Utils, Types, Enum, UtilsEditableBinding
) {
        
    'use strict';
    
    /**
     * @class widgets.brease.TableItem
     * @extends widgets.brease.TableItemWidget
    
     * @iatMeta category:Category
     * Data,Container
     * @iatMeta description:short
     * Datensatz für eine Zeile bzw. Spalte
     * @iatMeta description:de
     * Datensatz für eine Zeile bzw. Spalte
     * @iatMeta description:en
     * Dataset for one row respectively column
     */

    /**
     * @property {WidgetList} parents=["widgets.brease.Table"]
     * @inheritdoc  
     */

    /**
     * @cfg {brease.config.MeasurementSystemFormat} format={'metric':{ 'decimalPlaces' : 1, 'minimumIntegerDigits' : 1 }, 'imperial' :{ 'decimalPlaces' : 1, 'minimumIntegerDigits' : 1 }, 'imperial-us' :{ 'decimalPlaces' : 1, 'minimumIntegerDigits' : 1 }}
     * @iatStudioExposed
     * @iatCategory Appearance
     * @bindable
     * NumberFormat for every measurement system.
     */

    /**
     * @cfg {brease.config.MeasurementSystemUnit} unit=''
     * @iatStudioExposed
     * @iatCategory Appearance
     * @bindable
     * Unit code for every measurement system.
     */

    /**
     * @cfg {Boolean} showUnit=false
     * @iatStudioExposed
     * @iatCategory Behavior
     * If true, unit symbol will be shown in the header next to the text.
     */

    /**
     * @cfg {NumberArray1D} value
     * @iatStudioExposed
     * @nodeRefId node
     * @iatCategory Data
     * @bindable
     * @not_projectable
     * @editableBinding
     * Binding for NUMERIC Arrays.
     * NOTE: Only one array binding is allowed.
     */

    /**
     * @cfg {StringArray1D} stringValue
     * @iatStudioExposed
     * @iatCategory Data
     * @bindable
     * @not_projectable
     * @editableBinding
     * Binding for STRING Arrays.
     * NOTE: Only one array binding is allowed.
     */

    /**
     * @cfg {brease.datatype.ArrayNode} node
     * @iatStudioExposed
     * @iatCategory Data
     * @bindable
     * @not_projectable
     * @editableBinding
     * Binding for NUMERIC Arrays with Unit.
     * NOTE: Only one array binding is allowed.
     */

    /**
     * @cfg {Boolean} input=false
     * @iatStudioExposed
     * @iatCategory Behavior 
     * If true, data inputs are allowed
     */

    /**
     * @cfg {Number} maxValue=100
     * @iatStudioExposed
     * @iatCategory Behavior
     * Maximum value for input.
     */

    /**
     * @cfg {Number} minValue=0
     * @iatStudioExposed
     * @iatCategory Behavior
     * Maximum value for input.
     */

    /**
     * @cfg {Boolean} useDigitGrouping=true  
     * @iatStudioExposed
     * @iatCategory Behavior
     * Determines if digit grouping should be used
     */

    /**
     * @cfg {String} inputStyle='default'
     * @iatStudioExposed
     * @iatCategory Appearance
     * Style of the related numeric and alphanumeric keyboard.
     */

    /**
     * @cfg {brease.enum.LimitViolationPolicy} limitViolationPolicy='noSubmit'
     * @iatStudioExposed
     * @iatCategory Behavior
     * Controls behavior in case of a limit violation.   
     */

    /**
     * @cfg {Integer} maxLength=100
     * @iatStudioExposed
     * @iatCategory Behavior
     * The maxLength attribute specifies the maximum number of characters allowed in the TextInput
     * If not defined (=default), there is no restriction.
     */
    /**
     * @cfg {String} restrict=100
     * @iatCategory Data
     * Indicates the set of characters that a user can enter into the TextInput  
     * If not defined (=default), there is no restriction.  
     */

    var defaultSettings = {
            format: { default: { decimalPlaces: 1, minimumIntegerDigits: 1 } },
            unit: undefined,
            showUnit: false,
            value: [],
            stringValue: [],
            node: undefined,
            data: undefined,
            validDataLength: 0,
            dataType: undefined,
            input: false,
            inputStyle: undefined,
            useDigitGrouping: false,
            maxValue: 100,
            minValue: 0,
            limitViolationPolicy: Enum.LimitViolationPolicy.NO_SUBMIT,
            restrict: undefined,
            maxLength: undefined
        },

        WidgetClass = SuperClass.extend(function TableItem() {
            SuperClass.apply(this, arguments);
        }, defaultSettings),

        p = WidgetClass.prototype;

    p.init = function () {
        if (this.settings.omitClass !== true) {
            this.addInitialClass('breaseTableItem');
        }

        SuperClass.prototype.init.call(this);

        this.displayUnit = '';

        this.data = {
            node: new ArrayNode(this.settings.value, null, this.settings.minValue, this.settings.maxValue)
        };

        _evaluateFormat(this);
        _evaluateUnit(this);

        if (brease.config.editMode) {
            this.settings.mockData = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
            this.settings.mockString = ['Mock 1', 'Mock 2', 'Mock 3', 'Mock 4', 'Mock 5', 'Mock 6', 'Mock 7', 'Mock 8', 'Mock 9', 'Mock 10'];
            this.settings.data = this.settings.mockData;
            this.el.zIndex(this.el.zIndex() + 1);
        }
    };
    
    /**
     * @method setStyle
     */

    /**
     * @method setFormat
     * Sets format
     * @param {brease.config.MeasurementSystemFormat} format
     */
    p.setFormat = function (format) {

        if (Utils.isObject(format)) {
            this.settings.format = format;
            _evaluateFormat(this);
            this.formatData();
            if (this.isTableReady()) {
                // this.table._formatUpdateAvailable(this.elem.id);
                brease.callWidget(this.tableId, '_formatUpdateAvailable', this.elem.id);
            }
        } else if (typeof (format) === 'string') {
            try {
                this.settings.format = JSON.parse(format.replace(/'/g, '"'));
                _evaluateFormat(this);
                this.formatData();
            } catch (error) {
                console.iatWarn(this.elem.id + ': Format String "' + format + '" is invalid!');
            }
            if (this.isTableReady()) {
                // this.table._formatUpdateAvailable(this.elem.id);
                brease.callWidget(this.tableId, '_formatUpdateAvailable', this.elem.id);
            }
        }
    };

    /**
     * @method getFormat 
     * Returns format.
     * @return {brease.config.MeasurementSystemFormat}
     */
    p.getFormat = function () {
        return this.settings.format;
    };

    /**
     * @method setUnit
     * Sets unit
     * @param {brease.config.MeasurementSystemUnit} unit
     */
    p.setUnit = function (unit) {

        if (Utils.isObject(unit)) {
            this.settings.unit = unit;
            this.processMeasurementSystemUpdate();
        } else if (typeof (unit) === 'string') {
            try {
                this.settings.unit = JSON.parse(unit.replace(/'/g, '"'));
                this.processMeasurementSystemUpdate();
            } catch (error) {
                console.iatWarn(this.elem.id + ': Unit String "' + unit + '" is invalid!');
            }
        }
    };

    /**
     * @method getUnit 
     * Returns unit.
     * @return {brease.config.MeasurementSystemUnit}
     */
    p.getUnit = function () {
        return this.settings.unit;
    };

    /**
     * @method setShowUnit
     * Sets showUnit
     * @param {Boolean} showUnit
     */
    p.setShowUnit = function (showUnit) {
        this.settings.showUnit = showUnit;
    };

    /**
     * @method getShowUnit 
     * Returns showUnit.
     * @return {Boolean}
     */
    p.getShowUnit = function () {
        return this.settings.showUnit;
    };

    p.getHeaderText = function () {
        if (this.settings.showUnit && this.displayUnit !== undefined) {
            return this.settings.text + ' [' + this.displayUnit + ']';
        } else {
            return this.settings.text;
        }
    };

    /**
     * @method setValue
     * Sets value
     * @param {NumberArray1D} value
     */
    p.setValue = function (value) {

        if (value !== null && value !== undefined && value.length > 0) {
            this.data.node.value = value;
            this.settings.validDataLength = value.length;
            this.settings.dataType = 'number';
            this.formatData(this.data.node.value);

            if (this.valueInitState.state() !== 'resolved') {
                this.valueInitState.resolve();
            }
        }
    };

    /**
     * @method getValue 
     * Returns value.
     * @return {NumberArray1D}
     */
    p.getValue = function () {
        return this.data.node.value;
    };

    /**
     * @method setNode
     * Sets node
     * @param {brease.datatype.ArrayNode} node
     */
    p.setNode = function (node) {

        if (node.value !== undefined && node.value !== null && node.value.length > 0) {
            this.data.node.setId(node.id);
            this.data.node.setUnit(node.unit);
            this.setMinValue(node.minValue);
            this.setMaxValue(node.maxValue);
            this.data.node.setValue(node.value);
            this.settings.validDataLength = node.value.length;
            if (!this.settings.dataType) this.updateTableConfig();
            this.settings.dataType = 'nodeNumber';
            this.formatData(this.data.node.value);

            if (this.valueInitState.state() !== 'resolved') {
                this.valueInitState.resolve();
            }
        }
    };

    /**
     * @method setMinValue
     * Sets minValue
     * @param {Number} value
     */
    p.setMinValue = function (value) {
        if (Utils.isNumeric(value)) {
            this.data.node.setMinValue(value);
        }
    };

    /**
     * @method setMaxValue
     * Sets maxValue
     * @param {Number} value
     */
    p.setMaxValue = function (value) {
        if (Utils.isNumeric(value)) {
            this.data.node.setMaxValue(value);
        }
    };

    /**
     * @method getMinValue
     * get the minValue
     * @return {Number} minValue
     */
    p.getMinValue = function () {
        return this.data.node.minValue;
    };

    /**
     * @method getMaxValue
     * get the maxValue
     * @return {Number} maxValue
     */
    p.getMaxValue = function () {
        return this.data.node.maxValue;
    };

    /**
     * @method getNode 
     * Returns node.
     * @return {brease.datatype.ArrayNode}
     */
    p.getNode = function () {
        return this.data.node;
    };

    /**
     * @method setStringValue
     * Sets stringValue
     * @param {StringArray1D} stringValue
     */
    p.setStringValue = function (stringValue) {

        if (stringValue !== null && stringValue !== undefined && stringValue.length > 0) {
            this.settings.stringValue = stringValue;
            this.settings.validDataLength = stringValue.length;
            this.settings.data = (brease.config.editMode) ? this.settings.mockString : _evaluateTextKeys(this, stringValue);
            if (!this.settings.dataType) this.updateTableConfig();
            this.settings.dataType = 'string';
            this.updateTableValues();

            if (this.valueInitState.state() !== 'resolved') {
                this.valueInitState.resolve();
            }   
        }
    };

    /**
     * @method getStringValue 
     * Returns stringValue.
     * @return {StringArray1D}
     */
    p.getStringValue = function () {
        return this.settings.stringValue;
    };

    p.setEditable = function (editable, metaData) {
        if (this.settings.input) {
            UtilsEditableBinding.handleEditable(editable, metaData, this, ['node', 'stringValue', 'value']);
        }
    };

    /**
     * @method formatData
     * Update data
     */
    p.formatData = function (data) {

        if (data === undefined) {
            switch (this.settings.dataType) {
                case 'number':
                    data = (brease.config.editMode) ? this.settings.mockData : this.data.node.value;
                    break;
                case 'nodeNumber':
                    data = (brease.config.editMode) ? this.settings.mockData : this.data.node.value;
                    break;
                default:
                    return;
            }
        }
        
        var formattedArray = [];

        for (var i = 0; i < data.length; i += 1) {
            formattedArray[i] = brease.formatter.formatNumber(data[i], this.settings.numberFormat, this.settings.useDigitGrouping, this.settings.separators);
        }

        this.settings.data = formattedArray;
        this.updateTableValues();
    };

    /**
     * @method updateTableValues
     * Invoke drawing function for cell values in the table
     */
    p.updateTableValues = function () {
        this.valueUpdateAvailable = true;
        if (this.settings.dataInitialized && this.isTableReady() && this.isVisible()) {
            // this.table._valueUpdateAvailable(this.elem.id);
            brease.callWidget(this.tableId, '_valueUpdateAvailable', this.elem.id);
        }
    };

    p.getItemConfig = function () {
        var configObj = {};

        configObj.type = this.settings.dataType;
        configObj.input = this.settings.input;
        configObj.inputConfig = {};
        configObj.inputConfig.inputStyle = this.settings.inputStyle;
        configObj.inputConfig.validDataLength = this.settings.validDataLength;

        if (this.settings.dataType === 'string') {
            configObj.inputConfig.restrict = this.settings.restrict;
            configObj.inputConfig.maxLength = this.settings.maxLength;
        } else if ((this.settings.dataType === 'number') || (this.settings.dataType === 'nodeNumber')) {
            configObj.inputConfig.useDigitGrouping = this.settings.useDigitGrouping;
            configObj.inputConfig.limitViolationPolicy = this.settings.limitViolationPolicy;
            configObj.inputConfig.format = this.settings.format;
            configObj.inputConfig.maxValue = this.settings.maxValue;
            configObj.inputConfig.minValue = this.settings.minValue;
            configObj.inputConfig.unit = this.settings.unit;
        }

        return configObj;

    };

    p.measurementSystemChangeHandler = function () {
        this.processMeasurementSystemUpdate();
    };

    p.processMeasurementSystemUpdate = function () {
        var self = this;

        this.settings.mms = brease.measurementSystem.getCurrentMeasurementSystem();
        this.settings.numberFormat = NumberFormat.getFormat(this.settings.format, this.settings.mms);

        var previousUnit = this.data.node.unit;
        if (this.settings.unit !== undefined) {
            this.data.node.unit = this.settings.unit[this.settings.mms];
        }
        if (this.data.node.unit !== previousUnit) {
            brease.language.pipeAsyncUnitSymbol(this.data.node.unit, function (symbol) {
                self.displayUnit = (symbol === undefined) ? ((self.displayUnit === undefined) ? '' : self.displayUnit) : symbol;
                self.updateTableHeader(self.settings.text);
            });

        }

        var subscriptions = brease.uiController.getSubscriptionsForElement(this.elem.id);
        if (subscriptions !== undefined && subscriptions.node !== undefined) {
            if (this.data.node.unit !== previousUnit) {
                this.sendNodeChange({ attribute: 'node', nodeAttribute: 'unit', value: this.data.node.unit });
                if (this.settings.textkey !== undefined) {
                    this.setTextKey(this.settings.textkey);
                } else {
                    this.setText(this.settings.text);
                }
            }
        }
    };  

    p.mockData = function (len) {
        this.setValue(Array.apply(null, new Array(len)).map(Number.prototype.valueOf, 0));
    };

    p.getNumberFormat = function () {
        return this.settings.numberFormat;
    };

    p.langChangeHandler = function () {
        SuperClass.prototype.langChangeHandler.apply(this);

        if (this.settings.stringValue.length > 0) {
            this.setStringValue(this.settings.stringValue);
        }
    };

    /**
     * @method submitChange
     * This method will update the backend when the inputHandler has manipulated a value 
     * of the Table. The same item that is updating a value will not be called by the
     * backend, thus we must keep track of these ourselves.
     */
    p.submitChange = function (data) {
        switch (this.settings.dataType) {
            case 'number':
                this.data.node.value = _parseType(this, data, 'Number');
                this.formatData(this.data.node.value);
                this.sendValueChange({ value: this.getValue() });
                break;
            case 'nodeNumber':
                this.data.node.value = _parseType(this, data, 'Number');
                this.formatData(this.data.node.value);
                this.sendValueChange({ node: this.getNode() });
                break;
            case 'string':
                this.settings.stringValue = _parseType(this, data, 'String');
                this.settings.data = this.settings.stringValue;
                this.sendValueChange({ stringValue: this.getStringValue() });
                break;
        }

        /**
        * @event ValueChanged
        * @iatStudioExposed
        * Triggered when any value in the array is changed
        */
        var ev = this.createEvent('ValueChanged', {});
        ev.dispatch();

    };

    /**
     * @method getItemType
     * This method will return the type of the widget. Necessary for the table 
     * to keep track of the newly added widgets in the editor
     * @returns {String} the type of the widget on the form widgets/brease/*
     */
    p.getItemType = function () {
        return 'widgets/brease/TableItem';
    };

    p.dispose = function () {
        SuperClass.prototype.dispose.apply(this, arguments);
    };

    function _parseType(widget, array, type) {
        array = array.slice(0, widget.settings.validDataLength);
        array.forEach(function (value, index) {
            array[index] = Types.parseValue(value, type);
        });
        return array;
    }

    function _evaluateFormat(widget) {

        widget.settings.separators = brease.user.getSeparators();
        widget.settings.mms = brease.measurementSystem.getCurrentMeasurementSystem();

        var formatObject = (Utils.isObject(widget.settings.format)) ? widget.settings.format : {};
        if (widget.defaultSettings.format && widget.defaultSettings.format.default) {
            formatObject.default = Utils.deepCopy(widget.defaultSettings.format.default);
        }
        widget.settings.numberFormat = NumberFormat.getFormat(formatObject, widget.settings.mms);
    }

    function _evaluateUnit(widget) {

        if (Utils.isObject(widget.settings.unit) || Utils.isString(widget.data.node.unit)) {
            if (widget.settings.unit !== undefined) {
                widget.data.node.unit = widget.settings.unit[widget.settings.mms];
            }
            brease.language.pipeAsyncUnitSymbol(widget.data.node.unit, function (symbol) {
                widget.displayUnit = symbol;
                widget.setTextKey(widget.settings.textkey);
            });
        } else {
            widget.displayUnit = undefined;
        }
    }

    function _evaluateTextKeys(widget, stringArray) {

        var textArray = [];

        stringArray.forEach(function (entry) {
            if (brease.language.isKey(entry)) {
                textArray.push(brease.language.getTextByKey(brease.language.parseKey(entry)));
                widget.setLangDependency(true);
            } else {
                textArray.push(entry);
            }
        });

        return textArray;
    }

    /* Editor Size change */
    // p.itemUpdate = function (newSize) {
    //     //this.setColumnWidth(newWidth);
    //     var event = new CustomEvent('ItemSizeChanged', { detail: { id: this.elem.id, newSize: newSize }, bubbles: true, cancelable: true });
    //     // console.log('New header width: ', newWidth);

    //     this.dispatchEvent(event);
    // };

    // p.updateEditor = function (tempSize) {
    //     if (!this.isTableReady()) return;
    //     var event = new CustomEvent('ItemSizeChanging', { detail: { id: this.elem.id, newSize: tempSize }, bubbles: true, cancelable: true });
    //     // console.log('New header width: ', newWidth);

    //     this.dispatchEvent(event);
    // };

    return measurementSystemDependency.decorate(languageDependency.decorate(WidgetClass, false), true);
});
