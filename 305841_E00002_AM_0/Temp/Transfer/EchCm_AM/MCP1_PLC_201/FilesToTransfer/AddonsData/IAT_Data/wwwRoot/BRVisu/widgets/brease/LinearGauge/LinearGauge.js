define([
    'brease/core/BaseWidget',
    'widgets/brease/LinearGauge/libs/Config',
    'brease/datatype/Node',
    'brease/core/Utils',
    'brease/decorators/LanguageDependency',
    'brease/decorators/MeasurementSystemDependency',
    'widgets/brease/LinearGauge/libs/Renderer',
    'brease/decorators/DragAndDropCapability',
    'widgets/brease/common/DragDropProperties/libs/DroppablePropertiesEvents'
], function (SuperClass, Config, Node, Utils, languageDependency, measurementSystemDependency, Renderer, dragAndDropCapability) {

    'use strict';

    /**
     * @class widgets.brease.LinearGauge
     * @extends brease.core.BaseWidget
     *
     * @mixins widgets.brease.common.DragDropProperties.libs.DroppablePropertiesEvents
     *
     * @iatMeta studio:license
     * licensed
     * @iatMeta category:Category
     * Chart,Numeric
     * @iatMeta description:short
     * Zeigerinstrument
     * @iatMeta description:de
     * Zeigt einen numerischen Wert in einem Zeigerinstrument mit optionaler Skala an
     * @iatMeta description:en
     * Displays a numeric value in a linear gauge with an optional scale
     */

    var defaultSettings = Config,

        WidgetClass = SuperClass.extend(function LinearGauge() {
            SuperClass.apply(this, arguments);
        }, defaultSettings),

        p = WidgetClass.prototype;

    /**
     * @method init
     */
    p.init = function () {
        if (this.settings.omitClass !== true) {
            this.addInitialClass('breaseLinearGauge');
        }
        this.data = {
            node: new Node(this.settings.value, null, this.settings.minValue, this.settings.maxValue),
            scaleArea0: new Node(this.settings.scaleArea0),
            scaleArea1: new Node(this.settings.scaleArea1),
            scaleArea2: new Node(this.settings.scaleArea2),
            scaleArea3: new Node(this.settings.scaleArea3),
            scaleArea4: new Node(this.settings.scaleArea4),
            scaleArea5: new Node(this.settings.scaleArea5)
        };
        SuperClass.prototype.init.call(this);
        this._initValuesOriginalScale();
        this._adaptScalesToLimits();
        this.renderer = new Renderer(this);
        if (brease.config.editMode === true) {
            if (this.settings.showUnit === true) {
                this.settings.unitSymbol = 'unit';
                this.renderer.updateUnitLabel();
            }
            var widget = this;
            require(['widgets/brease/LinearGauge/libs/EditorHandles'], function (EditorHandles) {
                var editorHandles = new EditorHandles(widget);
                widget.getHandles = function () {
                    return editorHandles.getHandles();
                };
                // workaround
                widget.designer.getSelectionDecoratables = function () {
                    return editorHandles.getSelectionDecoratables();
                };
            });
        } else {
            this._unitConfiguration();
        }
    };

    p.langChangeHandler = function (e) {
        if (this.formatTextKey !== undefined) {
            this.settings.format = this._parseObject(this.formatTextKey);//JSON.parse(brease.language.getTextByKey(this.formatTextKey).replace(/\'/g, '"'));
            this.renderer.redrawAxis();
        }
    };

    p.measurementSystemChangeHandler = function () {
        this._unitConfiguration();
        this.sendNodeChange({ attribute: 'node', nodeAttribute: 'unit', value: this.data.node.unit });
        this.sendNodeChange({ attribute: 'scaleArea0Node', nodeAttribute: 'unit', value: this.data.scaleArea0.unit });
        this.sendNodeChange({ attribute: 'scaleArea1Node', nodeAttribute: 'unit', value: this.data.scaleArea1.unit });
        this.sendNodeChange({ attribute: 'scaleArea2Node', nodeAttribute: 'unit', value: this.data.scaleArea2.unit });
        this.sendNodeChange({ attribute: 'scaleArea3Node', nodeAttribute: 'unit', value: this.data.scaleArea3.unit });
        this.sendNodeChange({ attribute: 'scaleArea4Node', nodeAttribute: 'unit', value: this.data.scaleArea4.unit });
        this.sendNodeChange({ attribute: 'scaleArea5Node', nodeAttribute: 'unit', value: this.data.scaleArea5.unit });
        this.renderer.removeAxis();
        this.renderer.drawAxis();
    };

    /**
     * @method setFormat
     * Sets format
     * @param {String} format
     */
    p.setFormat = function (format) {
        if (Utils.isObject(format)) {
            this.settings.format = format;
            this.formatTextKey = undefined;
        } else if (typeof (format) === 'string') {
            if (brease.language.isKey(format)) {
                try {
                    this.setLangDependency(true);
                    this.formatTextKey = brease.language.parseKey(format);
                    this.settings.format = JSON.parse(brease.language.getTextByKey(this.formatTextKey).replace(/'/g, '"'));
                } catch (error) {
                    console.iatWarn(this.elem.id + ': Format String "' + format + '" is invalid!');
                    this.settings.format = { 'decimalPlaces': 1, 'minimumIntegerDigits': 1 };
                }
            } else {
                try {
                    this.formatTextKey = undefined;
                    this.settings.format = JSON.parse(format.replace(/'/g, '"'));
                } catch (error) {
                    console.iatWarn(this.elem.id + ': Format String "' + format + '" is invalid!');
                    this.settings.format = { 'decimalPlaces': 1, 'minimumIntegerDigits': 1 };
                }
            }
        }
        this.renderer.removeAxis();
        this.renderer.drawAxis();
    };

    /**
     * @method getFormat 
     * Returns format
     * @return {String}
     */
    p.getFormat = function () {
        return this.settings.format;
    };

    /**
     * @method setMinValue
     * Sets minValue
     * @param {Number} minValue
     */
    p.setMinValue = function (minValue) {
        if (Utils.isNumeric(minValue)) {
            this.settings.minValue = minValue;
            this.data.node.setMinValue(minValue);
            this._adaptScalesToLimits();
            this.renderer.removeAxis();
            this.renderer.drawAxis();
            this.renderer.removeAreas();
            this.renderer.drawAreas();
            this.renderer.removePointer();
            this.renderer.drawPointer();
        }
    };

    /**
     * @method getMinValue 
     * Returns minValue.
     * @return {Number}
     */
    p.getMinValue = function () {
        return this.data.node.minValue;
    };

    /**
     * @method setMaxValue
     * Sets maxValue
     * @param {Number} maxValue
     */
    p.setMaxValue = function (maxValue) {
        if (Utils.isNumeric(maxValue)) {
            this.settings.maxValue = maxValue;
            this.data.node.setMaxValue(maxValue);
            this._adaptScalesToLimits();
            this.renderer.removeAxis();
            this.renderer.drawAxis();
            this.renderer.removeAreas();
            this.renderer.drawAreas();
            this.renderer.removePointer();
            this.renderer.drawPointer();
        }
    };

    /**
     * @method getMaxValue 
     * Returns maxValue.
     * @return {Number}
     */
    p.getMaxValue = function () {
        return this.data.node.maxValue;
    };

    /**
     * @method setMajorTicks
     * Sets majorTicks
     * @param {UInteger} majorTicks
     */
    p.setMajorTicks = function (majorTicks) {
        if (Utils.isNumeric(majorTicks)) {
            this.settings.majorTicks = majorTicks;
            this.renderer.removeAxis();
            this.renderer.drawAxis();
        }
    };

    /**
     * @method getMajorTicks 
     * Returns majorTicks.
     * @return {UInteger}
     */
    p.getMajorTicks = function () {
        return this.settings.majorTicks;
    };

    /**
     * @method setMinorTicks
     * Sets minorTicks
     * @param {UInteger} minorTicks
     */
    p.setMinorTicks = function (minorTicks) {
        if (Utils.isNumeric(minorTicks)) {
            this.settings.minorTicks = minorTicks;
            this.renderer.removeAxis();
            this.renderer.drawAxis();
        }
    };

    /**
     * @method getMinorTicks 
     * Returns minorTicks.
     * @return {UInteger}
     */
    p.getMinorTicks = function () {
        return this.settings.minorTicks;
    };

    /**
     * @method setOrientation
     * Sets the orientation
     * @param {brease.enum.Orientation} orientation
     */
    p.setOrientation = function (orientation) {
        this.settings.orientation = orientation;
        this.renderer.redraw();
    };

    /**
     * @method getOrientation
     * Returns the orientation
     * @return {brease.enum.Orientation} orientation
     */
    p.getOrientation = function () {
        return this.settings.orientation;
    };

    /**
     * @method setNode
     * Sets node
     * @param {brease.datatype.Node} node
     */
    p.setNode = function (node) {
        var oldNode = this.settings.node === undefined ? {} : this.settings.node;
        this.settings.node = node;
        this.originalValue = this.settings.node.value;
        if (this.settings.node.minValue !== undefined && this.settings.node.minValue !== oldNode.minValue) {
            this.data.node.setMinValue(this.settings.node.minValue);
        }
        if (this.settings.node.maxValue !== undefined && this.settings.node.maxValue !== oldNode.maxValue) {
            this.data.node.setMaxValue(this.settings.node.maxValue);
        }
        if (this.settings.node.unit !== undefined && this.settings.node.unit !== oldNode.unit) {
            this.data.node.setUnit(this.settings.node.unit);
        }
        this._adaptScalesToLimits();
        if (this.settings.node.minValue !== oldNode.minValue || this.settings.node.maxValue !== oldNode.maxValue) {
            this.renderer.removeAxis();
            this.renderer.drawAxis();
            this.renderer.removeAreas();
            this.renderer.drawAreas();
            this.renderer.removePointer();
            this.renderer.drawPointer();
        } else {
            this.renderer.updatePointer();
        }
    };

    /**
     * @method getNode 
     * Returns node.
     * @return {brease.datatype.Node}
     */
    p.getNode = function () {
        return this.data.node;
    };

    p.getSaturatedNode = function () {
        return this.data.node;
    };

    /**
     * @method setValue
     * @iatStudioExposed
     * Sets value
     * @param {Number} value
     */
    p.setValue = function (value) {
        if (Utils.isNumeric(value)) {
            this.settings.value = value;
            this.originalValue = this.settings.value;
            this._adaptScalesToLimits();
            this.renderer.updatePointer();
        }
    };

    /**
     * @method getValue 
     * Returns value.
     * @return {Number}
     */
    p.getValue = function () {
        return this.settings.value;
    };

    p.getSaturatedValue = function () {
        return this.data.node.value;
    };

    /**
     * @method setScaleArea0
     * Sets scaleArea0
     * @param {Number} scaleArea0
     */
    p.setScaleArea0 = function (scaleArea0) {
        if (Utils.isNumeric(scaleArea0)) {
            this.originalScale0 = scaleArea0;
            this._adaptScalesToLimits();
            this.renderer.removeAreas();
            this.renderer.drawAreas();
            this.renderer.removePointer();
            this.renderer.drawPointer();
        }
    };

    /**
     * @method getScaleArea0
     * Returns scaleArea0.
     * @return {Number}
     */
    p.getScaleArea0 = function () {
        return this.data.scaleArea0.value;
    };

    /**
     * @method setScaleArea0Node
     * Sets scaleArea0Node
     * @param {brease.datatype.Node} scaleArea0Node
     */
    p.setScaleArea0Node = function (scaleArea0Node) {
        if (Utils.isNumeric(scaleArea0Node.value)) {
            this.originalScale0 = scaleArea0Node.value;
            this._adaptScalesToLimits();
            this.renderer.removeAreas();
            this.renderer.drawAreas();
            this.renderer.removePointer();
            this.renderer.drawPointer();
        }
    };

    /**
     * @method getScaleArea0Node
     * Returns scaleArea0Node.
     * @return {brease.datatype.Node}
     */
    p.getScaleArea0Node = function () {
        return this.data.scaleArea0;
    };

    /**
     * @method setScaleArea1
     * Sets scaleArea1
     * @param {Number} scaleArea1
     */
    p.setScaleArea1 = function (scaleArea1) {
        if (Utils.isNumeric(scaleArea1)) {
            this.originalScale1 = scaleArea1;
            this._adaptScalesToLimits();
            this.renderer.removeAreas();
            this.renderer.drawAreas();
            this.renderer.removePointer();
            this.renderer.drawPointer();
        }
    };

    /**
     * @method getScaleArea1 
     * Returns scaleArea1.
     * @return {Number}
     */
    p.getScaleArea1 = function () {
        return this.data.scaleArea1.value;
    };

    /**
     * @method setScaleArea1Node
     * Sets scaleArea1Node
     * @param {brease.datatype.Node} scaleArea1Node
     */
    p.setScaleArea1Node = function (scaleArea1Node) {
        if (Utils.isNumeric(scaleArea1Node.value)) {
            this.originalScale1 = scaleArea1Node.value;
            this._adaptScalesToLimits();
            this.renderer.removeAreas();
            this.renderer.drawAreas();
            this.renderer.removePointer();
            this.renderer.drawPointer();
        }
    };

    /**
     * @method getScaleArea1Node
     * Returns scaleArea1Node.
     * @return {brease.datatype.Node}
     */
    p.getScaleArea1Node = function () {
        return this.data.scaleArea1;
    };

    /**
     * @method setScaleArea2
     * Sets scaleArea2
     * @param {Number} scaleArea2
     */
    p.setScaleArea2 = function (scaleArea2) {
        if (Utils.isNumeric(scaleArea2)) {
            this.originalScale2 = scaleArea2;
            this._adaptScalesToLimits();
            this.renderer.removeAreas();
            this.renderer.drawAreas();
            this.renderer.removePointer();
            this.renderer.drawPointer();
        }
    };

    /**
     * @method getScaleArea2
     * Returns scaleArea2.
     * @return {Number}
     */
    p.getScaleArea2 = function () {
        return this.data.scaleArea2.value;
    };

    /**
     * @method setScaleArea2Node
     * Sets scaleArea2Node
     * @param {brease.datatype.Node} scaleArea2Node
     */
    p.setScaleArea2Node = function (scaleArea2Node) {
        if (Utils.isNumeric(scaleArea2Node.value)) {
            this.originalScale2 = scaleArea2Node.value;
            this._adaptScalesToLimits();
            this.renderer.removeAreas();
            this.renderer.drawAreas();
            this.renderer.removePointer();
            this.renderer.drawPointer();
        }
    };

    /**
     * @method getScaleArea2Node
     * Returns scaleArea2Node.
     * @return {brease.datatype.Node}
     */
    p.getScaleArea2Node = function () {
        return this.data.scaleArea2;
    };

    /**
     * @method setScaleArea3
     * Sets scaleArea3
     * @param {Number} scaleArea3
     */
    p.setScaleArea3 = function (scaleArea3) {
        if (Utils.isNumeric(scaleArea3)) {
            this.originalScale3 = scaleArea3;
            this._adaptScalesToLimits();
            this.renderer.removeAreas();
            this.renderer.drawAreas();
            this.renderer.removePointer();
            this.renderer.drawPointer();
        }
    };

    /**
     * @method getScaleArea3
     * Returns scaleArea3.
     * @return {Number}
     */
    p.getScaleArea3 = function () {
        return this.data.scaleArea3.value;
    };

    /**
     * @method setScaleArea3Node
     * Sets scaleArea3Node
     * @param {brease.datatype.Node} scaleArea3Node
     */
    p.setScaleArea3Node = function (scaleArea3Node) {
        if (Utils.isNumeric(scaleArea3Node.value)) {
            this.originalScale3 = scaleArea3Node.value;
            this._adaptScalesToLimits();
            this.renderer.removeAreas();
            this.renderer.drawAreas();
            this.renderer.removePointer();
            this.renderer.drawPointer();
        }
    };

    /**
     * @method getScaleArea3Node
     * Returns scaleArea3Node.
     * @return {brease.datatype.Node}
     */
    p.getScaleArea3Node = function () {
        return this.data.scaleArea3;
    };

    /**
     * @method setScaleArea4
     * Sets scaleArea4
     * @param {Number} scaleArea4
     */
    p.setScaleArea4 = function (scaleArea4) {
        if (Utils.isNumeric(scaleArea4)) {
            this.originalScale4 = scaleArea4;
            this._adaptScalesToLimits();
            this.renderer.removeAreas();
            this.renderer.drawAreas();
            this.renderer.removePointer();
            this.renderer.drawPointer();
        }
    };

    /**
     * @method getScaleArea4
     * Returns scaleArea4.
     * @return {Number}
     */
    p.getScaleArea4 = function () {
        return this.data.scaleArea4.value;
    };

    /**
     * @method setScaleArea4Node
     * Sets scaleArea4Node
     * @param {brease.datatype.Node} scaleArea4Node
     */
    p.setScaleArea4Node = function (scaleArea4Node) {
        if (Utils.isNumeric(scaleArea4Node.value)) {
            this.originalScale4 = scaleArea4Node.value;
            this._adaptScalesToLimits();
            this.renderer.removeAreas();
            this.renderer.drawAreas();
            this.renderer.removePointer();
            this.renderer.drawPointer();
        }
    };

    /**
     * @method getScaleArea4Node
     * Returns scaleArea4Node.
     * @return {brease.datatype.Node}
     */
    p.getScaleArea4Node = function () {
        return this.data.scaleArea4;
    };

    /**
     * @method setScaleArea5
     * Sets scaleArea5
     * @param {Number} scaleArea5
     */
    p.setScaleArea5 = function (scaleArea5) {
        if (Utils.isNumeric(scaleArea5)) {
            this.originalScale5 = scaleArea5;
            this._adaptScalesToLimits();
            this.renderer.removeAreas();
            this.renderer.drawAreas();
            this.renderer.removePointer();
            this.renderer.drawPointer();
        }
    };

    /**
     * @method getScaleArea5
     * Returns scaleArea5.
     * @return {Number}
     */
    p.getScaleArea5 = function () {
        return this.data.scaleArea5.value;
    };

    /**
     * @method setScaleArea5Node
     * Sets scaleArea5Node
     * @param {brease.datatype.Node} scaleArea5Node
     */
    p.setScaleArea5Node = function (scaleArea5Node) {
        if (Utils.isNumeric(scaleArea5Node.value)) {
            this.originalScale5 = scaleArea5Node.value;
            this._adaptScalesToLimits();
            this.renderer.removeAreas();
            this.renderer.drawAreas();
            this.renderer.removePointer();
            this.renderer.drawPointer();
        }
    };

    /**
     * @method getScaleArea5Node
     * Returns scaleArea5Node.
     * @return {brease.datatype.Node}
     */
    p.getScaleArea5Node = function () {
        return this.data.scaleArea5;
    };

    /**
     * @method setAreasSize
     * Sets areasSize
     * @param {UInteger} areasSize
     */
    p.setAreasSize = function (areasSize) {
        if (Utils.isNumeric(areasSize)) {
            this.settings.areasSize = areasSize;
            this.renderer.removeAreas();
            this.renderer.drawAreas();
            this.renderer.removePointer();
            this.renderer.drawPointer();
        }
    };

    /**
     * @method getAreasSize
     * Returns the size of the areas
     * @return {UInteger}
     */
    p.getAreasSize = function () {
        return parseInt(this.settings.areasSize, 10);
    };

    /**
     * @method setAreasPadding
     * Sets areasPadding
     * @param {UInteger} areasPadding
     */
    p.setAreasPadding = function (areasPadding) {
        if (Utils.isNumeric(areasPadding)) {
            this.settings.areasPadding = areasPadding;
            this.renderer.removeAreas();
            this.renderer.drawAreas();
            this.renderer.removePointer();
            this.renderer.drawPointer();
        }
    };

    /**
     * @method getAreasPadding
     * Returns the padding between scale and areas
     * @return {UInteger}
     */
    p.getAreasPadding = function () {
        return parseInt(this.settings.areasPadding, 10);
    };

    /**
     * @method setPointerSize
     * Sets pointerSize
     * @param {UInteger} pointerSize
     */
    p.setPointerSize = function (pointerSize) {
        if (Utils.isNumeric(pointerSize)) {
            this.settings.pointerSize = pointerSize;
            this.renderer.removePointer();
            this.renderer.drawPointer();
        }
    };

    /**
     * @method getPointerSize
     * Returns the size of the pointer
     * @return {UInteger}
     */
    p.getPointerSize = function () {
        return parseInt(this.settings.pointerSize, 10);
    };

    /**
     * @method setPointerPadding
     * Sets pointerPadding
     * @param {UInteger} pointerPadding
     */
    p.setPointerPadding = function (pointerPadding) {
        if (Utils.isNumeric(pointerPadding)) {
            this.settings.pointerPadding = pointerPadding;
            this.renderer.removePointer();
            this.renderer.drawPointer();
        }
    };

    /**
     * @method getPointerPadding
     * Returns the padding between scale and pointer
     * @return {UInteger}
     */
    p.getPointerPadding = function () {
        return parseInt(this.settings.pointerPadding, 10);
    };

    /**
     * @method setScalePadding
     * Sets scalePadding
     * @param {UInteger} scalePadding
     */
    p.setScalePadding = function (scalePadding) {
        if (Utils.isNumeric(scalePadding)) {
            this.settings.scalePadding = scalePadding;
            this.renderer.redraw();
        }
    };

    /**
     * @method getScalePadding
     * Returns the padding between scale and the outter border of the widget
     * @return {UInteger}
     */
    p.getScalePadding = function () {
        return parseInt(this.settings.scalePadding, 10);
    };

    /**
     * @method setAxisPadding
     * Sets axisPadding
     * @param {UInteger} axisPadding
     */
    p.setAxisPadding = function (axisPadding) {
        if (Utils.isNumeric(axisPadding)) {
            this.settings.axisPadding = axisPadding;
            this.renderer.redraw();
        }
    };

    /**
     * @method getAxisPadding
     * Returns the padding between scale and the left border of the widget
     * @return {UInteger}
     */
    p.getAxisPadding = function () {
        return parseInt(this.settings.axisPadding, 10);
    };

    /**
     * @method setShowUnit
     * Sets showUnit
     * @param {Boolean} showUnit
     */
    p.setShowUnit = function (showUnit) {
        if (typeof showUnit === 'boolean') {
            this.settings.showUnit = showUnit;
            if (this.settings.showUnit) {
                this.renderer.removeUnitLabel();
                this.renderer.drawUnitLabel();
                this.showUnit();
            } else {
                this.renderer.removeUnitLabel();
            }
        }
    };

    /**
     * @method getShowUnit 
     * Returns showUnit.
     * @return {Boolean}
     */
    p.getShowUnit = function () {
        return this.settings.showUnit;
    };

    /**
     * @method setShowPointer
     * Sets showPointer
     * @param {Boolean} showPointer
     */
    p.setShowPointer = function (showPointer) {
        if (typeof showPointer === 'boolean') {
            this.settings.showPointer = showPointer;
            if (this.settings.showPointer) {
                this.renderer.removePointer();
                this.renderer.drawPointer();
            } else {
                this.renderer.removePointer();
            }
        }
    };

    /**
     * @method getShowPointer 
     * Returns showPointer.
     * @return {Boolean}
     */
    p.getShowPointer = function () {
        return this.settings.showPointer;
    };

    /**
     * @method setUnit
     * Sets unit
     * @param {String} unit
     */
    p.setUnit = function (unit) {
        var widget = this;
        try {
            if (Utils.isObject(unit)) {
                widget.settings.unit = unit;
            } else {
                widget.settings.unit = this._parseObject(unit);
            }
            widget.measurementSystemChangeHandler();
        } catch (error) {
            console.iatWarn(widget.elem.id + ': Unit String "' + unit + '" is invalid!');
        }
    };

    /**
     * @method getUnit 
     * Returns unit
     * @return {String}
     */
    p.getUnit = function () {
        return this.settings.unit;
    };

    /**
     * @method _setHeight
     * sets the height of the widget
     * @private
     * @param {UInteger} h height of the widget given in pixels or percentage
     */
    p._setHeight = function (h) {
        SuperClass.prototype._setHeight.call(this, h);
        this.el.css('height', parseInt(this.settings.height, 10));
        this.renderer.redraw();
    };

    /**
     * @method _setWidth
     * sets the width of the widget
     * @private
     * @param {UInteger} w width of the widget given in pixels or percentage
     */
    p._setWidth = function (w) {
        SuperClass.prototype._setWidth.call(this, w);
        this.el.css('width', parseInt(this.settings.width, 10));
        this.renderer.redraw();
    };

    /**
     * @method showUnit
     * method will either display or remove the units of the widget
     */
    p.showUnit = function () {
        if (brease.config.editMode === true) {
            this.settings.unitSymbol = 'unit';
            this.renderer.updateUnitLabel();
        } else {
            brease.language.pipeAsyncUnitSymbol(this.data.node.unit, this._bind('writeUnit'));
        }
    };

    /**
     * @method writeUnit
     * method will write the unit label or remove it from the DOM
     * @param {String} unit the actual unit that is to be displayed
     */
    p.writeUnit = function (symbol) {
        this.settings.unitSymbol = symbol;
        if (this.settings.showUnit === true || this.settings.showUnit === 'true') {
            this.renderer.updateUnitLabel();
        } else {
            this.renderer.removeUnitLabel();
        }
    };

    /**
     * @method getScalesAreas
     * gets the list of all possible scale areas
     * @returns {Object[]}
     */
    p.getScalesAreas = function () {
        return [this.getScaleArea0(), this.getScaleArea1(), this.getScaleArea2(),
            this.getScaleArea3(), this.getScaleArea4(), this.getScaleArea5()];
    };

    /**
     * @method getCurrentFormat
     * returns the current format as defined by the measurement system
     * @returns {Object}
     */
    p.getCurrentFormat = function () {
        if (this.settings.format.decimalPlaces !== undefined || this.settings.format.minimumIntegerDigits !== undefined) {
            return this.settings.format;
        } else if (this.settings.format[brease.measurementSystem.getCurrentMeasurementSystem()] !== undefined) {
            return this.settings.format[brease.measurementSystem.getCurrentMeasurementSystem()];
        } else {
            return { 'decimalPlaces': 1, 'minimumIntegerDigits': 1 };
        }

    };

    //Private functions

    /**
     * @method _parseObject
     * Will take a variable and parse it into a JSON object. If its a text key it will first be translated
     * @param {String} variable
     * @returns {Object}
     */
    p._parseObject = function (variable) {
        if (Utils.isObject(variable) || variable === null) {
            return variable;
        } else if (brease.language.isKey(variable)) {
            try {
                var unitTextKey = brease.language.parseKey(variable);
                return JSON.parse(brease.language.getTextByKey(unitTextKey).replace(/'/g, '"'));
            } catch (error) {
                console.iatWarn(this.elem.id + ': String "' + variable + '" is invalid!');
            }
        } else if (Utils.isString(variable)) {
            try {
                return JSON.parse(variable.replace(/'/g, '"'));
            } catch (error) {
                console.iatWarn(this.elem.id + ': String "' + variable + '" is invalid!');
            }
        }
        return null;
    };

    /**
     * @method _adaptScalesToLimits
     * @private
     * 
     */
    p._adaptScalesToLimits = function () {
        var minValue = this.getMinValue(), maxValue = this.getMaxValue();
        this.data.scaleArea0.setValue(Math.min(Math.max(this.originalScale0, minValue), maxValue));
        this.data.scaleArea1.setValue(Math.min(Math.max(this.originalScale1, this.data.scaleArea0.value), maxValue));
        this.data.scaleArea2.setValue(Math.min(Math.max(this.originalScale2, this.data.scaleArea1.value), maxValue));
        this.data.scaleArea3.setValue(Math.min(Math.max(this.originalScale3, this.data.scaleArea2.value), maxValue));
        this.data.scaleArea4.setValue(Math.min(Math.max(this.originalScale4, this.data.scaleArea3.value), maxValue));
        this.data.scaleArea5.setValue(Math.min(Math.max(this.originalScale5, this.data.scaleArea4.value), maxValue));
        this.data.node.setValue(Math.min(Math.max(this.originalValue, minValue), maxValue));
    };

    p._initValuesOriginalScale = function () {
        this.originalScale0 = this.data.scaleArea0.value;
        this.originalScale1 = this.data.scaleArea1.value;
        this.originalScale2 = this.data.scaleArea2.value;
        this.originalScale3 = this.data.scaleArea3.value;
        this.originalScale4 = this.data.scaleArea4.value;
        this.originalScale5 = this.data.scaleArea5.value;
        this.originalValue = this.data.node.value;
    };

    p._unitConfiguration = function () {
        if (this.settings.unit !== undefined) {
            this.settings.mms = brease.measurementSystem.getCurrentMeasurementSystem();
            this.data.node.setUnit(this.settings.unit[this.settings.mms]);
            this.data.scaleArea0.setUnit(this.settings.unit[this.settings.mms]);
            this.data.scaleArea1.setUnit(this.settings.unit[this.settings.mms]);
            this.data.scaleArea2.setUnit(this.settings.unit[this.settings.mms]);
            this.data.scaleArea3.setUnit(this.settings.unit[this.settings.mms]);
            this.data.scaleArea4.setUnit(this.settings.unit[this.settings.mms]);
            this.data.scaleArea5.setUnit(this.settings.unit[this.settings.mms]);
            this.showUnit();
        }
    };

    return dragAndDropCapability.decorate(measurementSystemDependency.decorate(languageDependency.decorate(WidgetClass, false), true), false);

});
