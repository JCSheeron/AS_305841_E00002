define([
    'brease/core/BaseWidget',
    'brease/decorators/LanguageDependency',
    'brease/decorators/MeasurementSystemDependency',
    'brease/enum/Enum',
    'brease/core/Types',
    'brease/datatype/Node',
    'brease/controller/libs/KeyActions',
    'brease/controller/KeyboardManager',
    'brease/events/BreaseEvent',
    'brease/config/NumberFormat',
    'widgets/brease/NumericInput/libs/Config',
    'brease/core/Utils',
    'widgets/brease/common/libs/BoxLayout',
    'widgets/brease/common/libs/wfUtils/UtilsObject',
    'brease/decorators/DragAndDropCapability',
    'widgets/brease/common/DragDropProperties/libs/DroppablePropertiesEvents',
    'widgets/brease/common/DragDropProperties/libs/DraggablePropertiesEvents'
], function (SuperClass, languageDependency, measurementSystemDependency, Enum, Types, Node, KeyActions, keyboardManager, BreaseEvent, NumberFormat, Config, Utils, BoxLayout, UtilsObject, dragAndDropCapability) {

    'use strict';

    /**
     * @class widgets.brease.NumericInput
     * #Description
     * Input field for numeric values  
     * To edit values, an window for numeric input (=NumPad) will be shown  
     *
     * @extends brease.core.BaseWidget
     *
     *
     * @mixins widgets.brease.common.DragDropProperties.libs.DraggablePropertiesEvents
     * @mixins widgets.brease.common.DragDropProperties.libs.DroppablePropertiesEvents
     *
     * @aside example numinout
     *
     * @iatMeta category:Category
     * Numeric
     * @iatMeta description:short
     * Eingabe eines Wertes
     * @iatMeta description:de
     * Ermöglicht dem Benutzer einen numerischen Wert einzugeben
     * @iatMeta description:en
     * Enables the user to enter a numeric value
     */

    /**
     * @htmltag examples
     * ##Configuration examples:
     *
     * Enabled:
     *
     *     <div id="numInput01" data-brease-widget="widgets/brease/NumericInput" data-brease-options="{'numpadPosition':'right'}"></div>
     *
     * Disabled:
     *
     *     <div id="numInput02" data-brease-widget="widgets/brease/NumericInput" data-brease-options="{'enable':false}"></div>
     *
     */

    var DEFAULT_UNIT_EDIT_MODE = 'unit';

    var defaultSettings = Config;

    var WidgetClass = SuperClass.extend(function NumericInput() {
        SuperClass.apply(this, arguments);
    }, defaultSettings);

    var p = WidgetClass.prototype;

    p.init = function () {
        if (this.settings.omitClass !== true) {
            this.addInitialClass('breaseNumericInput');
        }
        this.boxLayout = BoxLayout;
        var separators = brease.user.getSeparators();

        // Add deferred objects
        this.measurementSystemChangePromise = null;
        this.unitChangePromise = null;
        this.nodeChangeResolve = null;
        this.numPadReadyResolve = null;
        
        this.isMouseDown = false;

        // extend settings
        // this.settings.tabIndex = (this.getKeyboard()) ? 1 : -1;
        this.settings.inputTabIndex = (!this._getUseKeyboardOperations()) ? 1 : -1;
        // Actual RegExp used below: ^[-.]?\d*(?:[.]\d*?)?$
        this.settings.regexp = new RegExp('^[-' + separators.dsp + ']?\\d*(?:[' + separators.dsp + ']\\d*?)?$');
        this.settings.unitSymbol = '';
        this.settings.nodeObject = _createNodeObject(this.settings.node);
        this.settings.unitObject = UtilsObject.parseObject(this.settings.unit, _failMessage.call(this, this.settings.unit, 'unit'));
        this.settings.formatObject = UtilsObject.createFormatObject(this.defaultSettings.format, this.settings.format, _failMessage.call(this, this.settings.format, 'format'));
        this.settings.readonly = Types.parseValue(this.settings.readonly, 'Boolean', { default: false });
        _updateRange.call(this);

        // initialize Internal Data
        this._setNumpadSubmitAction(false);

        _initDom(this);
        _initEventHandler(this);

        // apply settings
        _renderUnitAlign(this);
        _updateUnitAndValue(this);
        _updateLangDependency(this);

        SuperClass.prototype.init.call(this);
    };

    //#region getter / setter

    /**
     * @method setNode
     * Sets value with unit for node binding.
     * @param {brease.datatype.Node} node The node to be set
     */
    p.setNode = function (node) {
        if (Utils.isObject(node)) {
            // Update nodeObject
            if (!this.settings.nodeObject) {
                this.settings.nodeObject = _createNodeObject(node);
            } else {
                this.settings.nodeObject.setValue(node.value);
                this.settings.nodeObject.setMinValue(node.minValue);
                this.settings.nodeObject.setMaxValue(node.maxValue);
                this.settings.nodeObject.setUnit(node.unit);
            }
            _updateRange.call(this);

            // If unit of node is not configured unit, request new value for node,
            //  otherwise resolve node change
            var currentUnit = _getUnitCommonCode(this);
            if (this.settings.nodeObject.unit && currentUnit && this.settings.nodeObject.unit !== currentUnit) {
                this.sendNodeChange({
                    attribute: 'node',
                    nodeAttribute: 'unit',
                    value: currentUnit
                });
            } else if (this.nodeChangeResolve) {
                this.nodeChangeResolve();
            }
        } else {
            this.settings.nodeObject = null;
        }
        _renderValue(this);
    };

    /**
     * @method getNode 
     * Returns value with unit of node binding.
     * @return {brease.datatype.Node} The current node of the widget
     */
    p.getNode = function () {
        if (!this.settings.nodeObject) {
            // A&P 574960:  OneWayToSource-Binding with node doesn't work
            // Always send a node back to the server, even if server does not set the node in the widget.
            return new Node(this.getValue(),
                _getUnitCommonCode(this), this.getMinValue(), this.getMaxValue());
            // END A&P 574960
        }
        return this.settings.nodeObject;
    };

    /**
     * @method setValue
     * @iatStudioExposed
     * Sets value which is displayed in the widget.
     * @param {Number} value The value to be set
     */
    p.setValue = function (value) {
        // A&P 512985:  NumericOutput does not update BOOL value binding, value always 0
        if (typeof value === 'boolean') {
            value = Number(value);
        }
        // END_A&P 512985: NumericOutput does not update BOOL value binding, value always 0

        // set value
        var nodeObj = this.settings.nodeObject;
        if (nodeObj) {
            nodeObj.setValue(value);
        } else {
            this.settings.value = value;
        }

        // render value
        _renderValue(this);
    };

    /**
     * @method getValue
     * Gets value which is displayed in the widget.
     * @iatStudioExposed
     * @return {Number} value
     */
    p.getValue = function () {
        if (this.settings.nodeObject) {
            if (this.settings.nodeObject.getValue() !== null) {
                return this.settings.nodeObject.getValue();
            }
            return brease.settings.noValueString;
        }
        return this.settings.value;
    };

    /** 
     * @method setMinValue
     * Sets the minimum permissible value for value binding.
     * @param {Number} minValue The minValue to be set
     */
    p.setMinValue = function (minValue) {
        var nodeObj = this.settings.nodeObject;
        if (nodeObj) {
            nodeObj.setMinValue(minValue);
        } else {
            this.settings.minValue = minValue;
        }
        _updateRange.call(this);
    };

    /**
     * @method getMinValue 
     * Gets the minimum permissible value for value binding.
     * @return {Number} minValue
     */
    p.getMinValue = function () {
        if (this.settings.nodeObject) {
            return this.settings.nodeObject.getMinValue();
        }

        return this.settings.minValue;
    };

    /**
     * @method setMaxValue
     * Sets the maximum permissible value for value binding. 
     * @param {Number} maxValue
     */
    p.setMaxValue = function (maxValue) {
        var nodeObj = this.settings.nodeObject;
        if (nodeObj) {
            nodeObj.setMaxValue(maxValue);
        } else {
            this.settings.maxValue = maxValue;
        }
        _updateRange.call(this);
    };

    /**
     * @method getMaxValue 
     * Gets the maximum permissible value for value binding.
     * @return {Number}
     */
    p.getMaxValue = function () {
        if (this.settings.nodeObject) {
            return this.settings.nodeObject.getMaxValue();
        }

        return this.settings.maxValue;
    };

    /**
     * @method setEllipsis
     * Sets if a text that is too long should be symbolized using ellipsis points.
     * @param {Boolean} ellipsis
     */
    p.setEllipsis = function (ellipsis) {
        this.settings.ellipsis = Types.parseValue(ellipsis, 'Boolean', { default: false });
        _renderEllipsis(this);
    };

    /**
     * @method getEllipsis 
     * Gets if a text that is too long should be symbolized using ellipsis points.
     * @return {Boolean}
     */
    p.getEllipsis = function () {
        return this.settings.ellipsis;
    };

    /**
     * @method setFormat
     * Sets the number format for the widget.
     * @param {brease.config.MeasurementSystemFormat} format
     */
    p.setFormat = function (format) {

        if (format) {
            this.settings.format = format;
            this.settings.formatObject = UtilsObject.createFormatObject(this.defaultSettings.format, format, _failMessage.call(this, format, 'format'));
            _renderValue(this);
        }
        _updateLangDependency(this);
    };

    /**
     * @method getFormat 
     * Gets the number format for the widget.
     * @return {brease.config.MeasurementSystemFormat}
     */
    p.getFormat = function () {
        return this.settings.format;
    };

    /**
     * @method setKeyboard
     * Sets if the standard keyboard is used for entries.
     * @param {Boolean} keyboard
     */
    p.setKeyboard = function (keyboard) {
        this.settings.keyboard = keyboard;
        if (keyboard) {
            if (this._getUseKeyboardOperations()) {
                // init hardware keyboard
                _initKeyboardEventHandler(this);
            } else {
                // dispose hardware keyboard events
                _removeKeyboardEventHandler(this);
            }
            // init numpad
            var self = this;
            _createNumPadAsync(this).then(function () {
                self.numPadReadyResolve = null;
            });
        } else {
            // dispose numpad
            _disposeNumPad(this);
            // init hardware keyboard
            _initKeyboardEventHandler(this);
        }
    };

    /**
     * @method getKeyboard 
     * Gets if the standard keyboard is used for entries.
     * @return {Boolean}
     */
    p.getKeyboard = function () {
        return this.settings.keyboard;
    };

    p._getKeyboardOpen = function () {
        return this.internalData.keyboardOpen;
    };

    p._setKeyboardOpen = function (keyboardOpen) {
        this.internalData.keyboardOpen = keyboardOpen;
    };

    p._getNumpadSubmitAction = function () {
        // internalData.numpadSubmitAction --> a Submit action has been sent via the Numpad
        // this can be used to prevent an additional click event from being triggered
        return this.internalData.numpadSubmitAction;
    };

    p._setNumpadSubmitAction = function (value) {
        this.internalData.numpadSubmitAction = value;
    };

    /**
     * @method _getUseKeyboardOperations 
     * Gets if the keyboard operations are in use or if onscreen keyboard should be used.
     * @return {Boolean}
     */
    p._getUseKeyboardOperations = function () {
        return brease.config.visu.keyboardOperation;
    };

    /**
     * @method setLimitViolationPolicy
     * Sets the behavior in case of a value range violation
     * @param {brease.enum.LimitViolationPolicy} limitViolationPolicy
     */
    p.setLimitViolationPolicy = function (limitViolationPolicy) {
        this.settings.limitViolationPolicy = limitViolationPolicy;
    };

    /**
     * @method getLimitViolationPolicy 
     * Returns the behavior in case of a value range violation.
     * @return {brease.enum.LimitViolationPolicy}
     */
    p.getLimitViolationPolicy = function () {
        return this.settings.limitViolationPolicy;
    };

    /**
     * @method setNumPadStyle
     * Sets reference to a customizable numeric pad style.
     * @param {String} numPadStyle
     */
    p.setNumPadStyle = function (numPadStyle) {
        this.settings.numPadStyle = numPadStyle;
    };

    /**
     * @method getNumPadStyle 
     * Gets reference to a customizable numeric pad style..
     * @return {String}
     */
    p.getNumPadStyle = function () {
        return this.settings.numPadStyle;
    };

    /**
     * @method setNumpadPosition
     * Sets the position of the number pad, relative to the widget.
     * @param {brease.enum.Position} numpadPosition
     */
    p.setNumpadPosition = function (numpadPosition) {
        this.settings.numpadPosition = numpadPosition;

    };

    /**
     * @method getNumpadPosition 
     * Returns the position of the number pad, relative to the widget.
     * @return {brease.enum.Position}
     */
    p.getNumpadPosition = function () {
        return this.settings.numpadPosition;
    };

    /**
     * @method setShowUnit
     * Sets whether the unit should be displayed.
     * @param {Boolean} showUnit
     */
    p.setShowUnit = function (showUnit) {
        this.settings.showUnit = showUnit;
        _renderShowUnit(this);
    };

    /**
     * @method getShowUnit 
     * Gets whether the unit should be displayed.
     * @return {Boolean}
     */
    p.getShowUnit = function () {
        return this.settings.showUnit;
    };

    /**
     * @method setSubmitOnChange
     * Sets if changes, such as entry of a different value, should be submitted to the server immediately.
     * @param {Boolean} submitOnChange The submitOnChange value to be set
     */
    p.setSubmitOnChange = function (submitOnChange) {
        this.settings.submitOnChange = submitOnChange;
    };

    /**
     * @method getSubmitOnChange 
     * Gets if changes, such as entry of a different value, should be submitted to the server immediately.
     * @return {Boolean} Current submitOnChange value
     */
    p.getSubmitOnChange = function () {
        return this.settings.submitOnChange;
    };

    /**
     * @method setUnit
     * Sets the unit format for the widget.
     * @param {brease.config.MeasurementSystemUnit} unit The unit value to be set
     * @returns {Promise}
     */
    p.setUnit = function (unit) {
        this.settings.unit = unit;
        this.settings.unitObject = UtilsObject.parseObject(unit, _failMessage.call(this, this.settings.unit, 'unit'));
        _updateLangDependency(this);

        var self = this;
        self.unitChangePromise = _processUnitChangeAsync(this);
        self.unitChangePromise.then(function () {
            self.unitChangePromise = null;
        });
        return self.unitChangePromise;
    };

    /**
     * @method getUnit 
     * Returns the unit format for the widget.
     * @return {brease.config.MeasurementSystemUnit} Current unit value
     */
    p.getUnit = function () {
        return this.settings.unit;
    };

    /**
     * @method setUnitAlign
     * Sets the position of the unit.
     * @param {brease.enum.ImageAlign} unitAlign The unitAlign value to be set
     */
    p.setUnitAlign = function (unitAlign) {
        this.settings.unitAlign = unitAlign;
        _renderUnitAlign(this);
        _renderUnitWidth(this);
    };

    /**
     * @method getUnitAlign 
     * Gets the position of the unit.
     * @return {brease.enum.ImageAlign} Current unitAlign value
     */
    p.getUnitAlign = function () {
        return this.settings.unitAlign;
    };

    /**
     * @method setUnitWidth 
     * Sets the minimum width of the unit's area.
     * @param {Size} value The unitWidth value to be set
     */
    p.setUnitWidth = function (value) {
        this.settings.unitWidth = value;
        _renderUnitWidth(this);
    };

    /**
     * @method getUnitWidth 
     * Gets the minimum width of the unit's area.
     * @return {Size} Current unitWidth value
     */
    p.getUnitWidth = function () {
        return this.settings.unitWidth;
    };

    /**
     * @method setUseDigitGrouping
     * Sets whether number grouping should take place.
     * @param {Boolean} useDigitGrouping The useDigitGrouping value to be set
     */
    p.setUseDigitGrouping = function (useDigitGrouping) {
        this.settings.useDigitGrouping = useDigitGrouping;
        _renderValue(this);
    };

    /**
     * @method getUseDigitGrouping 
     * Gets whether number grouping should take place.
     * @return {Boolean} Current useDigitGrouping value
     */
    p.getUseDigitGrouping = function () {
        return this.settings.useDigitGrouping;
    };

    /**
     * @method setReadonly
     * Sets whether the widget is readonly or not.
     * @param {Boolean} value The readonly value to be set
     */
    p.setReadonly = function (value) {
        this.settings.readonly = value;
        if (value) {
            // dispose hardware keyboard listener and NumPad
            _removeKeyboardEventHandler(this);
            _disposeNumPad(this);
        } else {
            this.setKeyboard(this.getKeyboard());
        }
    };

    /**
     * @method getReadonly 
     * Gets whether the widget is readonly or not.
     * @return {Boolean} Current readonly value
     */
    p.getReadonly = function () {
        return this.settings.readonly;
    };

    /**
     * @method setUnitTextAlign
     * Sets unitTextAlign
     * @param {brease.enum.TextAlign} unitTextAlign
     */
    p.setUnitTextAlign = function (unitTextAlign) {
        this.settings.unitTextAlign = unitTextAlign;
        this.renderUnitSymbolAlign(unitTextAlign, this.boxLayout, this.unitBox);
    };

    /**
     * @method getUnitTextAlign 
     * Returns unitTextAlign.
     * @return {brease.enum.TextAlign}
     */
    p.getUnitTextAlign = function () {
        return this.settings.unitTextAlign;
    };

    //#endregion getter / setter

    //#region Actions

    /**
     * @method submitChange
     * @iatStudioExposed
     * Send value to the server, if binding for this widget exists.  
     * Usage of this method will only make sense, if submitOnChange=false, as otherwise changes are submitted automatically.
     */
    p.submitChange = function () {
        // A&P 574960:  OneWayToSource-Binding with node doesn't work
        // Always send a node back to the server, even if server does not set the node in the widget.
        var nodeObject = this.settings.nodeObject ? this.settings.nodeObject : new Node(this.getValue(),
            _getUnitCommonCode(this), this.getMinValue(), this.getMaxValue());
            // END A&P 574960
        this.sendValueChange({
            value: this.getValue(),
            node: nodeObject
        });
        /**
         * @event ValueChanged
         * @iatStudioExposed
         * Fired when index changes.
         * @param {Number} value
         */
        var ev = this.createEvent('ValueChanged', { value: this.getValue() });
        ev.dispatch();
    };

    //#endregion Actions

    //#region Events
    function _dispatchChangeEvent(widget) {
        /**
         * @event change
         * Fired when value is changed by user    
         * See at {@link brease.events.BreaseEvent#static-property-CHANGE BreaseEvent.CHANGE} for event type  
         * @param {Number} value
         * @eventComment
         */
        widget.dispatchEvent(new CustomEvent(BreaseEvent.CHANGE, { detail: { value: widget.getValue() } }));
    }
    //#endregion Events

    //#region overriden methods

    p.setEditable = function (editable, metaData) {
        if (metaData !== undefined && metaData.refAttribute !== undefined) {
            var refAttribute = metaData.refAttribute;
            if (refAttribute === 'value' || refAttribute === 'node') {
                this.settings.editable = editable;
                this._internalEnable();
            }
        }
    };

    p._setWidth = function (w) {
        SuperClass.prototype._setWidth.apply(this, arguments);
        if (w === 'auto') {
            _setInputWidth(this);
        } else {
            this.inputEl.css('width', '');
        }
    };

    p._enableHandler = function (enableState) {
      
        if (enableState === true) {
            
            if (this.getKeyboard() === false && this.getReadonly() === false) {
                this.inputEl.attr('tabindex', this.settings.inputTabIndex);
            }

        } else {
            
            if (this.getKeyboard() === false || this.getReadonly()) {
                this.inputEl.attr('tabindex', -1);
            }
            this._hideNumPad();
        }
        SuperClass.prototype._enableHandler.apply(this, arguments); 
    };

    p._visibleHandler = function (visibleState) {
        if (!this.isVisible()) {
            this._hideNumPad();
        }
        SuperClass.prototype._visibleHandler.apply(this, arguments);
    };

    p._clickHandler = function (e) {
        this._handleFocus(e);
        SuperClass.prototype._clickHandler.call(this, e);
    };

    p._handleFocus = function (e) {
        if (!this.isDisabled && !this.getReadonly() && brease.config.editMode !== true) {
            var orgE = Utils.getOriginalEvent(e);
            if (KeyActions.getActionForKey(orgE.key) === Enum.KeyAction.Accept) {
                if (!this._getNumpadSubmitAction()) {
                    this._focusWithTab();
                } else {
                    this._setNumpadSubmitAction(false);
                }
            } else {
                if (this.getKeyboard() && !(orgE instanceof KeyboardEvent)) {
                    this._cancelNewValueOnEscape();
                    this._showNumPad(this);
                } else {
                    this._onFocusIn();
                }
            }
        }
    };

    p.dispose = function () {
        _disposeNumPad(this);
        _removeKeyboardEventHandler(this);
        this.inputEl.off();
        this.inputEl.off('change', this._bind('_inputChangeHandler'));
        this.elem.removeEventListener(BreaseEvent.BEFORE_FOCUS_MOVE, this._bind('_onBeforeFocusMove'));
        this.elem.removeEventListener(BreaseEvent.BEFORE_ENABLE_CHANGE, this._bind('_onBeforeStateChange'));
        this.elem.removeEventListener(BreaseEvent.BEFORE_VISIBLE_CHANGE, this._bind('_onBeforeStateChange'));
        SuperClass.prototype.dispose.apply(this, arguments);
    };

    //#endregion overrides methods

    //#region decorator functions

    p.langChangeHandler = function (e) {
        _updateUnitAndValue(this);
    };

    p.measurementSystemChangeHandler = function () {
        var self = this;
        self.measurementSystemChangePromise = _processUnitChangeAsync(this);
        self.measurementSystemChangePromise.then(function () {
            self.measurementSystemChangePromise = null;
        });
    };

    //#endregion decorator functions

    //#region promise helper functions

    p.isMeasurementSystemChangeDone = function () {
        if (!this.measurementSystemChangePromise) {
            return true;
        }
        return false;
    };

    p.isUnitChangeDone = function () {
        if (!this.unitChangePromise) {
            return true;
        }
        return false;
    };

    //#endregion promise helper functions

    //#region legacy public functions

    p.writeUnit = function (symbol) {
        this.settings.unitSymbol = symbol;
        _renderUnitSymbol(this);
    };

    p.showValue = function () {
        _renderValue(this);
    };

    p.showUnit = function () {
        _updateUnitAndValue(this);
    };

    p.processMeasurementSystemUpdate = function () {
        this.measurementSystemChangeHandler();
    };

    /**
     * @method resetValue
     * Reset value to the value given by the server.<br/>This will only make sense, if submitOnChange=false
     */
    p.resetValue = function () {
        this.setValue(this.settings.nodeObject.getValue());
    };

    //#endregion legacy public functions

    //#region hardware keyboard functions

    p._focusWithTab = function () {
        if (this.el.hasClass('active')) {
            this.elem.focus();        
        } else {
            this._onFocusIn();
        }
    };

    p._onFocusIn = function (e) {
        if (this.isDisabled === true) {
            this.inputEl.blur();
        } else {
            //We need to check for active class so that when the input is focused for the first
            //time we delete the input, but at a later stage we do not reset it.
            if (!this.elem.classList.contains('active') && this._getUseKeyboardOperations()) {
                this.inputEl.val('');
            }
            this.focusInTime = Date.now();
            this.inputEl[0].focus();
            this.inputEl[0].addEventListener('keypress', this._bind('_onKeyPress'));
            this.inputEl[0].addEventListener('keyup', this._bind('_onKeyUp'));
            if (this.settings.width === 'auto') {
                this.inputEl[0].addEventListener('keydown', this._bind('_onKeyDown'));
            }
            this.el.addClass('active');

        }
    };

    /**
     * @method _onFocusOut
     * This method will handle the focus out event of the input element
     */
    p._onFocusOut = function (e) {
        // A&P 684494 if clicked on div prevent focus out:
        // mouse: mouseDown -> focusOut -> mouseUp -> click -> focusIn => no focus out while mouse down
        // touch: mouseDown -> mouseUp -> click -> focusIn -> focusOut => check time focusOut<=>focusIn
        if (this.lastMouseDownIsTouch && (Date.now() - this.focusInTime) < 20) {
            this._onFocusIn();
        } else if (!this.isMouseDown) {        
            this._focusOut();   
        }
    };

    /**
     * @method _focusOut
     * This method will handle the focus out of the input element
     */
    p._focusOut = function () {
        var newValue = brease.formatter.parseFloat(this.inputEl.val(), brease.user.getSeparators());

        if (brease.config.keyboardHandling.onEnd.action === 'accept' && !this.internalData.enterOut) { 
            _renderValue(this);
        } else {
            newValue = _validateValue(this, newValue, this.getValue());
            newValue = _roundValue(this, newValue);
            // no rounding in setValue any more, therefore we need an explicit call here
            this.setValue(newValue);
            _dispatchChangeEvent(this);
            if (this.getSubmitOnChange() === true && this.elem.classList.contains('active')) {
                //We check for class active so that submitChange isnt called when escape is pressed
                //and focus is lost
                this.submitChange();
            }
           
        }
        this.removeFocus();
        this.internalData.enterOut = false;
    };

    /**
     * @method _onBeforeFocusMove
     * This method will close the numpad before focus moves to next widget
     * Note1: can not use focusout as this is also called if the user clicks the numpad buttons
     * Note2: will not be called if the focus is changed manually with click on other widget or focus action
     */
    p._onBeforeFocusMove = function () {
        if (this._getKeyboardOpen()) {
            this.numPad.hide();
        }
    };

    /**
     * @method _onBeforeStateChange
     * This method cancels the input if the widget gets disabled or invisible 
     */
    p._onBeforeStateChange = function (e) {
        if (!e.detail.value && this.elem.classList.contains('active')) {
            this._cancelNewValueOnEscape();
            this.inputEl.blur();
        }
    };

    p._onMouseDown = function (e) {
        this.isMouseDown = true;
        this.lastMouseDownIsTouch = e.originalEvent.type === 'touchstart';
        $(window).on(BreaseEvent.MOUSE_UP, this._bind('_onMouseUp'));
    };

    p._onMouseUp = function (e) {
        if (this.el.has(e.target).length === 0 && e.target !== this.elem && !(Utils.getOriginalEvent(e) instanceof KeyboardEvent)) {
            // html standard behaviour on inputs do not loose focus on mouseup outside
            this._onFocusIn();
        }
        $(window).off(BreaseEvent.MOUSE_UP, this._bind('_onMouseUp'));
        this.isMouseDown = false;
    };
    
    p._onKeyUp = function (e) {
        var pattern = new RegExp('\\' + brease.user.getSeparators().gsp, 'g');
        var newValue = this.inputEl.val().replace(pattern, '');

        if (!this._validateKeyInputValue(newValue)) {
            this.inputEl.val(this.oldValue);
        }
    };

    p._onKeyDown = function (e) {
        if (e.key === 'Backspace' || e.key === 'Delete') {
            _setInputWidth(this, -1);
        } else if (this._isPrintable(e.key)) {
            _setInputWidth(this, 1);
        }
    };

    p._validateKeyInputValue = function (value) {
        if (value !== '' && value !== '-' && value !== '+' && this.settings.regexp !== undefined && this.settings.regexp.test(value) === false) {
            return false;
        }
        return true;
    };

    p._onKeyPress = function (e) {
        var inputElem = this.inputEl.get(0);
        if (KeyActions.getActionForKey(e.key) === Enum.KeyAction.Accept && !this._getUseKeyboardOperations()) { // 13 Enter keycode
            // A&P 697705:  attribut "forceSend" always forced an immediate transmission to the server.
            //              Also with submitOnChange=false.
            this.inputEl.blur();
            return;
        }
        if (e.key === ',' || e.key === '.') {
            e.preventDefault();
            inputElem.setRangeText(brease.user.getSeparators().dsp, inputElem.selectionStart, inputElem.selectionEnd, 'end');
        }

        var val = this.inputEl.val();
        if (typeof val === 'number') this.oldValue = val;
    };

    p.removeFocus = function () {
        this.inputEl[0].removeEventListener('keypress', this._bind('_onKeyPress'));
        this.inputEl[0].removeEventListener('keyup', this._bind('_onKeyUp'));
        this.inputEl[0].removeEventListener('keydown', this._bind('_onKeyDown'));
        this.el.removeClass('active');
    };
    
    p._handleFocusKeyDown = function (e) {
        //This flag must be set because if someone clicks outside the widget
        //the focusout event will treat this as an "enter" action and submit
        //the value
        if (brease.config.keyboardHandling.onEnd.action === 'accept' && KeyActions.getActionForKey(e.key) === Enum.KeyAction.Accept && this.elem.classList.contains('active')) {
            this.internalData.enterOut = true;
        }

        SuperClass.prototype._handleFocusKeyDown.apply(this, arguments);
        //Look for escape and quit
        if (KeyActions.getActionForKey(e.key) === Enum.KeyAction.Cancel) {
            if (this.elem.classList.contains('active')) {
                // would otherwise also close dialog if widget is in dialog
                e.stopPropagation();
            } 
            this._cancelNewValueOnEscape();
        //Look for Enter, Tab, Shift, Ctrl and Alt - do not enter click
        } else if (brease.config.keyboardHandling.onStart.action === 'any' && this._isPrintable(e.key) && !this._getKeyboardOpen()) {
            // this._onFocusIn(e);
            this._handleFocus(e);
        }
    };

    p._isPrintable = function (key) {
        return key.length === 1;
    };

    p._cancelNewValueOnEscape = function () {
        _renderValue(this);
        this.removeFocus();
        this.elem.focus();
    };

    //#endregion hardware keyboard functions

    //#region NumPad functions

    p._showNumPad = function () {
        if (_isNumPadReady(this)) {
            this._generateNumPadSettings();
            _initNumPadEvents(this);
            this.numPad.show(this.numPadSettings, this.elem);
            this._setKeyboardOpen(true);
            this.el.addClass('active');
        }
    };

    p._hideNumPad = function () {
        if (_isNumPadReady(this) && this.getKeyboard() && this.el.hasClass('active')) {
            this.numPad.hide();
        }
    };

    p._generateNumPadSettings = function () {
        this.numPadSettings = {
            minValue: this.range.min,
            maxValue: this.range.max,
            
            value: this.getValue(), 
            useDigitGrouping: this.getUseDigitGrouping(),
            limitViolationPolicy: this.getLimitViolationPolicy(),
            position: {
                horizontal: this.getNumpadPosition(),
                vertical: this.getNumpadPosition()
            },
            pointOfOrigin: 'element',
            arrow: {
                position: (this.getNumpadPosition() === 'left') ? 'right' : 'left'
            },
            header: this.settings.header,
            format: this.settings.formatObject,
            unit: this.settings.unitObject,

            // additional attributes to identify binding in NumPad
            contentId: this.settings.parentContentId,
            widgetId: this.elem.id,
            bindingAttributes: ['value', 'node']
        };

        if (this.settings.numPadStyle) {
            this.numPadSettings.style = this.settings.numPadStyle;
        }
    };

    p.numPadReadyHandler = function (e) {
        if (e.target.id === 'breaseNumPad') {
            document.body.removeEventListener(BreaseEvent.WIDGET_READY, this._bind('numPadReadyHandler'));
            if (this.numPadReadyResolve) {
                this.numPadReadyResolve();
            }
        }
    };

    p._onNumPadClose = function () {
        _removeNumPadEvents(this);
        this._setKeyboardOpen(false);
        this.el.removeClass('active');
        this._cancelNewValueOnEscape();
    };

    p._onNumPadSubmit = function (event) {
        var value = _roundValue(this, event.detail.value);
        // no rounding in setValue any more, therefore we need an explicit call here
        this.setValue(value);
        this._setNumpadSubmitAction(true); 
        _dispatchChangeEvent(this);
        if (this.getSubmitOnChange()) {
            this.submitChange();
        }     
    };

    //#endregion NumPad functions

    //#region Event handler

    p._inputChangeHandler = function (e) {
        e.stopPropagation();
    };

    //#endregion Event handler

    //#region protected methods
    p._createInputEl = function () {
        var inputOptions = {
            value: '',
            type: 'text',
            autocomplete: 'off',
            tabindex: (this.getKeyboard() === false && this.getReadonly() === false) ? this.settings.inputTabIndex : -1
        };
        if ((this.getKeyboard() && !this._getUseKeyboardOperations()) || this.getReadonly()) {
            inputOptions.readonly = 'readonly';
        }

        var inputEl = $('<input/>').attr(inputOptions);

        if (this.getKeyboard() !== true) {
            inputEl.addClass('keyboard');
        }

        return inputEl;
    };

    p._createUnitEl = function () {
        return $('<span></span>')
            .addClass('breaseNumericInput_unit');
    };
    //#endregion protected methods

    //#region private methods

    function _initDom(widget) {

        widget.inputEl = widget._createInputEl();

        widget.unitEl = widget._createUnitEl();

        // Create boxes
        widget.inputBox = BoxLayout.createBox();
        widget.inputBox.classList.add('box-input');

        widget.unitBox = BoxLayout.createBox();
        widget.unitBox.classList.add('box-unit');

        // Add items to boxes
        widget.inputBox.appendChild(widget.inputEl.get(0));
        widget.unitBox.appendChild(widget.unitEl.get(0));

        widget.boxContainer = BoxLayout.createBoxContainer();
        widget.boxContainer.appendChild(widget.inputBox);
        widget.boxContainer.appendChild(widget.unitBox);

        widget.setShowUnit(widget.getShowUnit());
        widget.setEllipsis(widget.getEllipsis());
        widget.setKeyboard(widget.getKeyboard());

        // Add items to widget
        widget.elem.appendChild(widget.boxContainer);
    }

    function _initEventHandler(widget) {
        widget.inputEl.on('change', widget._bind('_inputChangeHandler'));
        if (widget._getUseKeyboardOperations()) {
            widget.elem.addEventListener(BreaseEvent.BEFORE_FOCUS_MOVE, widget._bind('_onBeforeFocusMove'));
            widget.elem.addEventListener(BreaseEvent.BEFORE_ENABLE_CHANGE, widget._bind('_onBeforeStateChange'));
            widget.elem.addEventListener(BreaseEvent.BEFORE_VISIBLE_CHANGE, widget._bind('_onBeforeStateChange'));
        }
    }

    function _initKeyboardEventHandler(widget) {
        widget.inputEl.on('focusin', widget._bind('_onFocusIn'));
        widget.inputEl.on('focusout', widget._bind('_onFocusOut'));
        widget.el.on(BreaseEvent.MOUSE_DOWN, widget._bind('_onMouseDown'));
    }

    function _removeKeyboardEventHandler(widget) {
        widget.inputEl.off('focusin', widget._bind('_onFocusIn'));
        widget.inputEl.off('focusout', widget._bind('_onFocusOut'));
        widget.el.off(BreaseEvent.MOUSE_DOWN, widget._bind('_onMouseDown'));
    }

    function _createNodeObject(nodeJson) {
        if (nodeJson) {
            return new Node(nodeJson.value, nodeJson.unit, nodeJson.minValue, nodeJson.maxValue, nodeJson.id);
        }
        return null;
    }

    // updates the internal range with rounded values (see A&P 721975, 728950)
    function _updateRange() {
        this.range = {
            min: this.getMinValue(),
            max: this.getMaxValue()
        };
        if (!Utils.isNumeric(this.range.min)) {
            this.range.min = this.settings.minValue;
        }
        if (!Utils.isNumeric(this.range.max)) {
            this.range.max = this.settings.maxValue;
        }
        if (this.settings.formatObject.default && this.settings.formatObject.default.decimalPlaces >= 0) {
            this.range.min = _formatValue(this.range.min, _getNumberFormat(this).decimalPlaces, 'min');
            this.range.max = _formatValue(this.range.max, _getNumberFormat(this).decimalPlaces, 'max');
        }
    }

    //#region render functions

    function _renderValue(widget) {
        var value = widget.getValue();
        var numberFormat = _getNumberFormat(widget);
        if (numberFormat.decimalPlaces !== undefined && Utils.isNumeric(value)) {
            widget.inputEl.val(brease.formatter.formatNumber(value, numberFormat,
                widget.getUseDigitGrouping(), brease.user.getSeparators()));
        } else {
            widget.inputEl.val(brease.settings.noValueString);
        }
        if (widget.settings.width === 'auto') {
            _setInputWidth(widget);
        }
    }

    function _setInputWidth(widget, add) {
        add = add || 0;
        widget.inputEl.css('width', widget.inputEl.val().length + add + 'ch');
    }

    function _renderUnitSymbol(widget) {
        if (brease.config.editMode && !$.isEmptyObject(widget.settings.unitObject)) {
            widget.unitEl.text(DEFAULT_UNIT_EDIT_MODE);
        } else {
            widget.unitEl.text(widget.settings.unitSymbol || '');
        }
        _renderUnitWidth(widget);
    }

    function _renderShowUnit(widget) {
        if (widget.settings.showUnit === false) {
            widget.unitBox.style.display = 'none';
        } else {
            widget.unitBox.style.display = 'flex';
        }
        _renderUnitWidth(widget);
    }

    function _renderEllipsis(widget) {
        if (widget.settings.ellipsis) {
            widget.el.addClass('ellipsis');
        } else {
            widget.el.removeClass('ellipsis');
        }
    }

    function _renderUnitAlign(widget) {
        widget.el.removeClass('unitAlign-left');
        widget.el.removeClass('unitAlign-right');
        widget.el.removeClass('unitAlign-top');
        widget.el.removeClass('unitAlign-bottom');
        switch (widget.settings.unitAlign) {
            case Enum.ImageAlign.right:
                BoxLayout.setOrientation(widget.boxContainer, Enum.Orientation.LTR);
                widget.el.addClass('unitAlign-right');
                break;
            case Enum.ImageAlign.top:
                BoxLayout.setOrientation(widget.boxContainer, Enum.Orientation.BTT);
                widget.el.addClass('unitAlign-top');
                break;
            case Enum.ImageAlign.bottom:
                BoxLayout.setOrientation(widget.boxContainer, Enum.Orientation.TTB);
                widget.el.addClass('unitAlign-bottom');
                break;
            default:
                BoxLayout.setOrientation(widget.boxContainer, Enum.Orientation.RTL);
                widget.el.addClass('unitAlign-left');
                break;
        }
        widget.renderUnitSymbolAlign(widget.settings.unitTextAlign, widget.boxLayout, widget.unitBox);
    }

    p.renderUnitSymbolAlign = function (unitTextAlign, boxLayout, htmlElement) {
        switch (unitTextAlign) {
            case Enum.TextAlign.left:
                boxLayout.setBoxAlign(htmlElement, 'Left');
                break;
            case Enum.TextAlign.center:
                boxLayout.setBoxAlign(htmlElement, 'Center');
                break;
            case Enum.TextAlign.right:
                boxLayout.setBoxAlign(htmlElement, 'Right');
                break;
        }
    };

    function _renderUnitWidth(widget) {
        var unitWidth = widget.getUnitWidth();
        if (!_setUnitWidthAllowed(widget, unitWidth)) {
            widget.inputBox.style.width = '';
            widget.unitBox.style.flex = '';
            return;
        }

        var inputValue = '';
        var unitFlexValue = '';
        var unitWidthValue = unitWidth;

        if (unitWidth !== undefined && unitWidth !== '') {
            if (!isNaN(unitWidth)) {
                unitWidthValue = unitWidth + 'px';
            } else if (unitWidth.endsWith('%')) {
                // Set input width according to 100% - [unit width]
                var percentValue = unitWidth.substring(0, unitWidth.length - 1);
                if (!isNaN(percentValue)) {
                    inputValue = 100 - parseFloat(percentValue);
                    if (inputValue < 0) {
                        inputValue = 0;
                    }
                    inputValue = inputValue + '%';
                }
            }
            unitFlexValue = '0 0 ' + unitWidthValue;
        }

        widget.inputBox.style.width = inputValue;
        widget.unitBox.style.flex = unitFlexValue;
    }

    //#endregion render functions

    function _validateValue(self, newValue, oldValue) {

        if (isNaN(newValue)) {
            newValue = oldValue;
        }

        if (newValue > self.range.max || newValue < self.range.min) {
            switch (self.getLimitViolationPolicy()) {
                case Enum.LimitViolationPolicy.SET_TO_LIMIT:
                case Enum.LimitViolationPolicy.SET_TO_LIMIT_AND_SUBMIT: {
                    if (newValue > self.range.max) {
                        newValue = self.range.max;
                    }
                    if (newValue < self.range.min) {
                        newValue = self.range.min;
                    }
                    break;
                }
                case Enum.LimitViolationPolicy.SUBMIT_ALL:
                    break;
                default: {
                    newValue = oldValue;
                    break;
                }
            }
        }
        return newValue;
    }

    function _setUnitWidthAllowed(widget, unitWidth) {
        if (widget.getShowUnit() === false ||
                !widget.unitEl.text() ||
                widget.getUnitAlign() === Enum.ImageAlign.top ||
                widget.getUnitAlign() === Enum.ImageAlign.bottom ||
                unitWidth <= 0) {
            return false;
        }
        return true;
    }

    function _getNumberFormat(widget) {
        var numberFormat = null;
        var mms = brease.measurementSystem.getCurrentMeasurementSystem();
        if (widget.settings.formatObject) {
            numberFormat = NumberFormat.getFormat(widget.settings.formatObject, mms);
        } else {
            numberFormat = NumberFormat.getFormat({}, mms);
        }

        return numberFormat;
    }

    function _roundValue(widget, value) {
        var numberFormat = _getNumberFormat(widget),
            roundValue = value;
        if (Utils.isNumeric(value)) {
            roundValue = Utils.roundTo(value, numberFormat.decimalPlaces);
        }
        return roundValue;
    }

    function _formatValue(minValue, decimalPlaces, type) {
        var value = brease.formatter.findPossibleFormattedValue(minValue, decimalPlaces, type);
        return brease.formatter.roundToFormat(value, decimalPlaces);
    }
    function _getUnitCommonCode(widget) {
        var unitObj = widget.settings.unitObject;
        if (unitObj) {
            return unitObj[brease.measurementSystem.getCurrentMeasurementSystem()];
        }
        return null;
    }

    function _updateLangDependency(widget) {
        if (brease.language.isKey(widget.getUnit()) || brease.language.isKey(widget.getFormat()) || widget.getInfoCustomizedUnit(widget.getUnit()) || Utils.isObject(widget.settings.unit)) {
            widget.setLangDependency(true);
        } else {
            widget.setLangDependency(false);
        }
    }

    function _updateUnitAndValue(widget) {
        _getUnitSymbolAsync(widget).then(function () {
            _renderUnitSymbol(widget);
            _renderValue(widget);
        });
    }

    function _createNumPadAsync(widget) {
        if (!widget.numPad) {
            widget.numPad = keyboardManager.getNumPad();
        }

        var numPadReadyPromise = new Promise(function (resolve, reject) {
            widget.numPadReadyResolve = resolve;
            if (_isNumPadReady(widget)) {
                widget.numPadReadyResolve();
            } else {
                document.body.addEventListener(BreaseEvent.WIDGET_READY, widget._bind('numPadReadyHandler'));
            }
        });

        return numPadReadyPromise;
    }

    function _isNumPadReady(widget) {
        if (widget.numPad && widget.numPad.state === Enum.WidgetState.READY) {
            return true;
        }
        return false;
    }

    function _initNumPadEvents(widget) {
        widget.numPad.addEventListener(BreaseEvent.CLOSED, widget._bind('_onNumPadClose'));
        widget.numPad.addEventListener(BreaseEvent.SUBMIT, widget._bind('_onNumPadSubmit'));
    }

    function _removeNumPadEvents(widget) {
        widget.numPad.removeEventListener(BreaseEvent.CLOSED, widget._bind('_onNumPadClose'));
        widget.numPad.removeEventListener(BreaseEvent.SUBMIT, widget._bind('_onNumPadSubmit'));
    }

    function _disposeNumPad(widget) {
        if (widget.numPad && widget.numPad.elem) {
            _removeNumPadEvents(widget);
            widget.numPad = null;
        }
    }

    function _failMessage(str, type) {
        return this.elem.id + ': ' + type + ' string "' + str + '" is invalid!';
    }

    //#region async methods
    function _processUnitChangeAsync(widget) {
        var getUnitSymbolPromise = _getUnitSymbolAsync(widget);
        var nodeChangePromise = _sendNodeChangeAsync(widget);

        var promiseArray = [
            getUnitSymbolPromise,
            nodeChangePromise
        ];

        return Promise.all(promiseArray)
            .then(function (values) {
                widget.nodeChangeResolve = null;
                getUnitSymbolPromise = null;

                _renderUnitSymbol(widget);
                _renderValue(widget);
            });
    }

    function _sendNodeChangeAsync(widget) {
        return new Promise(function (resolve, reject) {
            widget.nodeChangeResolve = resolve;
            // Update node value for new unit
            var nodeObj = widget.settings.nodeObject;
            var unitCommonCode = _getUnitCommonCode(widget);
            if (nodeObj && nodeObj.getUnit() && unitCommonCode && nodeObj.getUnit() !== unitCommonCode) {
                // setting node.unit is neccassary, because changing measurement system when widget is suspended and "wake"
                //  is called  again, the binding controller is calling "getNode" method to determine current unit of
                //  new measurement system
                widget.settings.nodeObject.unit = unitCommonCode;
                widget.sendNodeChange({
                    attribute: 'node',
                    nodeAttribute: 'unit',
                    value: unitCommonCode
                });
            } else {
                resolve();
            }
        });

    }

    function _getUnitSymbolAsync(widget) {
        return new Promise(function (resolve, reject) {
            var unitCommonCode = _getUnitCommonCode(widget);
            if (unitCommonCode) {
                brease.language.pipeAsyncUnitSymbol(unitCommonCode, function (symbol) {
                    widget.settings.unitSymbol = symbol;
                    resolve(symbol);
                });
            } else {
                widget.settings.unitSymbol = '';
                resolve('');
            }
        });
    }
    //#endregion async methods

    //#endregion private methods

    p.getInfoCustomizedUnit = function (unit) {
        if (unit === undefined || unit === {}) {
            return false;
        }

        for (var code in unit) {
            if (typeof unit[code].includes === 'function' && unit[code].includes('http://www.br-automation.com/units')) {
                return true;
            } else {
                return false;
            }
        }
    };

    return dragAndDropCapability.decorate(measurementSystemDependency.decorate(languageDependency.decorate(WidgetClass, false), true), false);

});
