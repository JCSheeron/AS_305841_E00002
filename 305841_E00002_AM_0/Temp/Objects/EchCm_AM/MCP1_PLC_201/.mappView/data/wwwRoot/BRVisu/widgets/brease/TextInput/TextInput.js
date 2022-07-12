define([
    'brease/core/BaseWidget',
    'brease/decorators/LanguageDependency',
    'brease/controller/KeyboardManager',
    'brease/events/BreaseEvent',
    'brease/controller/libs/KeyActions',
    'brease/core/Utils',
    'brease/enum/Enum',
    'brease/core/Types',
    'widgets/brease/common/libs/wfUtils/UtilsEditableBinding',
    'brease/decorators/DragAndDropCapability',
    'widgets/brease/common/libs/BreaseTextMetrics',
    'widgets/brease/common/DragDropProperties/libs/DraggablePropertiesEvents',
    'widgets/brease/common/DragDropProperties/libs/DroppablePropertiesEvents'
], function (
    SuperClass, languageDependency, keyboardManager,
    BreaseEvent, KeyActions, Utils, Enum, Types, UtilsEditableBinding, dragAndDropCapability, BreaseTextMetrics
) {

    'use strict';

    /**
     * @class widgets.brease.TextInput
     * #Description
     * widget for text input; opens a virtual keyboard for editing  
     *
     * @mixins widgets.brease.common.DragDropProperties.libs.DraggablePropertiesEvents
     * @mixins widgets.brease.common.DragDropProperties.libs.DroppablePropertiesEvents 
     *
     * @breaseNote 
     * @extends brease.core.BaseWidget
     *
     * @iatMeta category:Category
     * Text
     * @iatMeta description:short
     * Texteingabe
     * @iatMeta description:de
     * Ermöglicht dem Benutzer einen Text einzugeben
     * @iatMeta description:en
     * Enables the user to enter a text
     */

    /**
     * @htmltag examples
     * ##Configuration Example
     *
     *       <div id="inputText" data-brease-widget="widgets/brease/TextInput" data-brease-options="{'maxLength':32}"></div>
     */

    /**
     * @cfg {String} value=''
     * @iatStudioExposed
     * @iatCategory Data
     * @bindable
     * @editableBinding
     * Value displayed by the widget
     */

    /**
     * @cfg {Integer} maxLength=-1
     * @iatStudioExposed
     * @iatCategory Behavior
     * The maxLength attribute specifies the maximum number of characters allowed in the TextInput
     * If maxLength is less than 0, there is no restriction.
     */
    /**
     * @cfg {RegEx} inputRestriction=''
     * @iatCategory Behavior
     * @iatStudioExposed
     * @localizable
     * Indicates the set of characters that a user can enter into the TextInput
     * If not defined (=default), there is no restriction.
     */
    /**
     * @cfg {String} placeholder=''
     * @iatStudioExposed
     * @localizable
     * @iatCategory Behavior
     * Specifies a short hint that describes the expected value of the input field
     */
    /**
     * @cfg {Boolean} submitOnChange=true
     * @iatStudioExposed
     * @iatCategory Behavior
     * Determines if changes, triggered by user input, should be sent immediately to the server.
     */
    /**
     * @cfg {Boolean} keyboard=true
     * @iatStudioExposed
     * @iatCategory Behavior
     * Determines if internal soft keyboard should open
     */

    /**
     * @cfg {Boolean} ellipsis=false
     * @iatStudioExposed
     * @iatCategory Behavior
     * If true, overflow of text is symbolized with an ellipsis.  
     */

    /**
     * @cfg {Integer} tabIndex=0
     * @iatStudioExposed
     * @iatCategory Behavior 
     * sets if a widget should have autofocus enabled (0), the order of the focus (>0),
     * or if autofocus should be disabled (-1)
     */

    /**
     * @cfg {Boolean} useFocusWithin=true
     * This option should be used to prevent focus events on the widget if the focus is
     * moved to a inner element of the widget. It also sets the focusWithin class so focus style
     * is still drawn on widget.
     */

    var defaultSettings = {
            submitOnChange: true,
            keyboard: true,
            tabIndex: 0,
            inputTabIndex: 1,
            ellipsis: false,
            value: '',
            maxLength: -1,
            placeholder: '',
            placeholderTextKey: '',
            inputRestriction: '',
            inputRestrictionRegEx: null,
            inputRestrictionTextKey: '',
            useFocusWithin: true
            // following default values are missing, maybe should be added when refactoring this widget
            // type
            // header
            // regexp
        },

        WidgetClass = SuperClass.extend(function TextInput() {
            SuperClass.apply(this, arguments);
        }, defaultSettings),

        p = WidgetClass.prototype;

    p.init = function (type) {
        if (this.settings.omitClass !== true) {
            this.addInitialClass('breaseTextInput');
        }
        if (this.settings.maxLength < 0) {
            this.settings.maxLength = undefined;
        }
        this.createKeyBoard();

        this.input = _createInputField.call(this, type);

        _ellipsisSettings(this);
        this.setPlaceholder(this.settings.placeholder);

        if (this.settings.value !== undefined) {
            this.setValue(this.settings.value);
        }
        this.setKeyboard(this.settings.keyboard);

        this.setInputRestriction(this.settings.inputRestriction);

        if (this.keyBoard.state === Enum.WidgetState.READY) {
            SuperClass.prototype.init.call(this);
            this._enableHandler(this.getEnable());
            _setInputWidth(this);
        } else {
            document.body.addEventListener(BreaseEvent.WIDGET_READY, this._bind('keyBoard_readyHandler'));
        }
        document.body.addEventListener(BreaseEvent.SYSTEM_KEYBOARD_CHANGED, this._bind('changeKeyBoard'));
        document.body.addEventListener(BreaseEvent.THEME_CHANGED, this._bind('_onThemeChanged'));
    };
    p._initEditor = function () {
        this.elem.addEventListener(BreaseEvent.WIDGET_STYLE_PROPERTIES_CHANGED, this._bind('_onStylePropertiesChanged'));
        this.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_EDITOR_IF_READY, { bubbles: true }));
    };
    // ausgelagert, damit abgeleitete widgets ueberschreiben koennen 
    p.createKeyBoard = function () {
        this.keyBoard = keyboardManager.getKeyboard();
    };

    p.keyBoard_readyHandler = function (e) {
        if (e.target.id === 'breaseKeyBoard') {
            document.body.removeEventListener(BreaseEvent.WIDGET_READY, this._bind('keyBoard_readyHandler'));
            SuperClass.prototype.init.call(this, true);
            this._enableHandler(this.getEnable());
            this._dispatchReady();
            _setInputWidth(this);
        }
    };

    p._setWidth = function (w) {
        SuperClass.prototype._setWidth.apply(this, arguments);
        if (w === 'auto') {
            _setInputWidth(this);
        } else {
            this.input.css({ 'width': '', 'max-width': '' });
        }
    };

    /**
     * @method setValue
     * @iatStudioExposed
     * sets the visible text
     * @param {String} value The new value
     */
    p.setValue = function (value) {
        //console.debug(this.constructor.name + '[' + this.elem.id + '].setValue:', value);
        this.settings.value = this.spsValue = value;
        this.showValue();
    };

    /**
     * @method setData
     * Sets the visible text via an object
     * @param {Object} data The data object with new value and maxLength
     * @param {String} [data.value] The new value for the widget
     * @param {Integer} [data.maxLength] The maximum length of the value
     */
    p.setData = function (data) {
        if (_.isObject(data)) {
            if (data.maxLength !== undefined) {
                this.settings.maxLength = data.maxLength;
            }
            if (data.value !== undefined) {
                this.settings.value = this.spsValue = data.value;
            }
        }
        this.showValue();
    };

    p.showValue = function () {
        this.input.val(this.settings.value);
        _setInputWidth(this);
    };

    /**
     * @method getValue
     * Gets the visible text
     * @iatStudioExposed
     * @return {String} The current value
     */
    p.getValue = function () {
        return this.settings.value;
    };

    /**
     * @method resetValue
     * Reset value (text) to the value given by the server.<br/>This will only make sense, if submitOnChange=false
     */
    p.resetValue = function () {
        //console.log('resetValue:', this.settings.value, this.spsValue);
        this.setValue(this.spsValue);
    };

    p.removeFocus = function () {
        //console.debug(this.constructor.name + '[' + this.elem.id + '].removeFocus');
        document.removeEventListener('keypress', this._bind('_onKeyPress'));
        this.el.removeClass('active');
    };

    /**
     * @method submitChange
     * @iatStudioExposed
     * Send value to the server, if binding for this widget exists.  
     * Usage of this method will only make sense, if submitOnChange=false, as otherwise changes are submitted automatically.
     */
    p.submitChange = function () {
        this.spsValue = this.input.val();
        this.sendValueChange({ value: this.spsValue });

        /**
         * @event ValueChanged
         * @iatStudioExposed
         * Fired when index changes.
         * @param {String} value
         */
        var ev = this.createEvent('ValueChanged', { value: this.getValue() });
        ev.dispatch();
    };

    /**
     * @method setMaxLength
     * Sets maxLength
     * @param {Integer} maxLength The maximum length of the value
     */
    p.setMaxLength = function (maxLength) {
        this.settings.maxLength = maxLength;
    };

    /**
     * @method getMaxLength 
     * Returns maxLength.
     * @return {Integer} The maximum length of the value
     */
    p.getMaxLength = function () {

        return this.settings.maxLength;

    };

    /**
     * @method setEllipsis
     * Sets ellispsis
     * @param {Boolean} ellipsis The ellipsis property value
     */
    p.setEllipsis = function (ellipsis) {
        this.settings.ellipsis = ellipsis;
        _ellipsisSettings(this);
    };

    /**
     * @method getEllipsis 
     * Returns ellipsis.
     * @return {Boolean} 'true' if ellipsis is enabled, otherwise 'false'
     */
    p.getEllipsis = function () {
        return this.settings.ellipsis;
    };

    /**
     * @method setPlaceholder
     * Sets a short hint that describes the expected value of the input field
     * @param {String} placeholder The placeholder property value
     */
    p.setPlaceholder = function (placeholder) {
        if (brease.language.isKey(placeholder) === false) {
            this.settings.placeholderTextKey = '';
            this.settings.placeholder = placeholder;
        } else {
            this.settings.placeholderTextKey = placeholder;
            this.settings.placeholder = brease.language.getTextByKey(brease.language.parseKey(placeholder));
        }
        _renderPlaceholder(this);
        _setInputWidth(this);
    };

    /**
     * @method getPlaceholder 
     * Gets a short hint that describes the expected value of the input field
     * @return {String} The placeholder property value
     */
    p.getPlaceholder = function () {
        return this.settings.placeholder;
    };

    /**
     * @method setSubmitOnChange
     * Sets submitOnChange
     * @param {Boolean} submitOnChange The submitOnChange property value
     */
    p.setSubmitOnChange = function (submitOnChange) {
        this.settings.submitOnChange = submitOnChange;
    };

    /**
     * @method getSubmitOnChange 
     * Returns submitOnChange.
     * @return {Boolean} The submitOnChange property value
     */
    p.getSubmitOnChange = function () {

        return this.settings.submitOnChange;

    };

    p.setInputRestriction = function (value) {
        if (brease.language.isKey(value) === false) {
            this.settings.inputRestrictionTextKey = '';
        } else {
            this.settings.inputRestrictionTextKey = value;
            value = brease.language.getTextByKey(brease.language.parseKey(value));
        }

        if (value !== undefined && value !== '') {
            this.settings.inputRestriction = value;
            this.settings.inputRestrictionRegEx = new RegExp(this.settings.inputRestriction);
        } else {
            this.settings.inputRestriction = '';
            this.settings.inputRestrictionRegEx = null;
        }
    };

    p.getInputRestriction = function () {
        return this.settings.inputRestriction;
    };

    /**
        * @method getKeyboard 
        * Returns keyboard.
        * @return {Boolean} The keyboard property value
        */
    p.getKeyboard = function () {
        return this.settings.keyboard;
    };

    /**
     * @method setKeyboard
     * Sets keyboard
     * @param {Boolean} keyboard The keyboard property value
     */
    p.setKeyboard = function (keyboard) {
        var changed = keyboard !== this.settings.keyboard;
        this.settings.keyboard = keyboard;
        this._initKeyboardEvents(false);
        
        var inputTabIndex = -1;
        if (this.settings.keyboard && !this._getUseKeyboardOperations()) {
            this.input.attr('readonly', 'readonly');
            this.input.removeClass('keyboard');
        } else {
            this._initKeyboardEvents(true);
            this.input.addClass('keyboard');
            this.input[0].removeAttribute('readonly');
            if (this.isEnabled() && !this._getUseKeyboardOperations()) {
                inputTabIndex = this.settings.inputTabIndex; 
            }
        }
        this.input[0].tabIndex = inputTabIndex;
        if (changed) {
            this._enableHandler(this.getEnable());
        }
    };

    p._initKeyboardEvents = function (on) {
        var fn = on ? 'on' : 'off';
        this.input[fn]('focusout', this._bind('_onFocusOut'))[fn]('focusin', this._bind('_onFocusIn'))[fn]('input', this._bind('_onInput'));
        this.el[fn](BreaseEvent.MOUSE_DOWN, this._bind('_mouseDownHandler')); 
    };

    p._setKeyboardOpen = function (keyboardOpen) {
        this.internalData.keyboardOpen = keyboardOpen;
    };

    p._getKeyboardOpen = function () {
        return this.internalData.keyboardOpen;
    };

    /**
     * @method _getUseKeyboardOperations 
     * Gets if the keyboard operations are in use or if onscreen keyboard should be used.
     * @return {Boolean}
     */
    p._getUseKeyboardOperations = function () {
        return brease.config.visu.keyboardOperation;
    };

    p.setEditable = function (editable, metaData) {
        UtilsEditableBinding.handleEditable(editable, metaData, this, ['value']);
    };

    p.suspend = function () {
        // remove document event listeners to support concent-caching
        document.body.removeEventListener(BreaseEvent.WIDGET_READY, this._bind('keyBoard_readyHandler'));
        document.body.removeEventListener(BreaseEvent.SYSTEM_KEYBOARD_CHANGED, this._bind('changeKeyBoard')); 
        document.body.removeEventListener(BreaseEvent.THEME_CHANGED, this._bind('_onThemeChanged'));
        SuperClass.prototype.suspend.apply(this, arguments);
    };

    p.wake = function () { 
        _setInputWidth(this);
        if (!keyboardManager.isCurrentKeyboard(this.keyBoard)) {
            this.changeKeyBoard();
        }
        document.body.addEventListener(BreaseEvent.SYSTEM_KEYBOARD_CHANGED, this._bind('changeKeyBoard')); 
        document.body.addEventListener(BreaseEvent.THEME_CHANGED, this._bind('_onThemeChanged'));
        SuperClass.prototype.wake.apply(this, arguments);
    };

    p.dispose = function () {
        _unbindKeyboard.call(this);
        document.body.removeEventListener(BreaseEvent.SYSTEM_KEYBOARD_CHANGED, this._bind('changeKeyBoard')); 
        this.elem.removeEventListener(BreaseEvent.BEFORE_FOCUS_MOVE, this._bind('_onBeforeFocusMove'));
        this.elem.removeEventListener(BreaseEvent.BEFORE_ENABLE_CHANGE, this._bind('_onBeforeStateChange'));
        this.elem.removeEventListener(BreaseEvent.BEFORE_VISIBLE_CHANGE, this._bind('_onBeforeStateChange'));
        document.body.removeEventListener(BreaseEvent.THEME_CHANGED, this._bind('_onThemeChanged'));
        if (this.keyBoard) {
            this.keyBoard = null;
        }
        this.input.off();
        SuperClass.prototype.dispose.apply(this, arguments);
    };

    p._initEventHandler = function () {
        if (this._getUseKeyboardOperations()) {
            this.elem.addEventListener(BreaseEvent.BEFORE_FOCUS_MOVE, this._bind('_onBeforeFocusMove'));
            this.elem.addEventListener(BreaseEvent.BEFORE_ENABLE_CHANGE, this._bind('_onBeforeStateChange'));
            this.elem.addEventListener(BreaseEvent.BEFORE_VISIBLE_CHANGE, this._bind('_onBeforeStateChange'));
        }
        this.el.on(BreaseEvent.CLICK, this._bind('_clickHandler'));
    };

    p._mouseDownHandler = function (e) {
        this.isMouseDown = true;
        this.lastMouseDownIsTouch = e.originalEvent.type === 'touchstart';
        $(window).on(BreaseEvent.MOUSE_UP, this._bind('_windowMouseUpHandler'));
    };

    p._windowMouseUpHandler = function (e) {
        if (this.el.has(e.target).length === 0 && e.target !== this.elem && !(Utils.getOriginalEvent(e) instanceof KeyboardEvent)) {
            this._onFocusIn();
        }
        $(window).off(BreaseEvent.MOUSE_UP, this._bind('_windowMouseUpHandler'));
        this.isMouseDown = false;
    };

    p._clickHandler = function (e) {
        this._handleFocus(e);
        SuperClass.prototype._clickHandler.call(this, e);
    };

    p._handleFocus = function (e) {
        if (!this.isDisabled && brease.config.editMode !== true) {
            var orgE = Utils.getOriginalEvent(e);
            if (KeyActions.getActionForKey(orgE.key) === Enum.KeyAction.Accept) {
                this._focusWithTab();
            } else {
                if (this.getKeyboard() && !(orgE instanceof KeyboardEvent)) {
                    _showKeyboard.call(this, this.settings.value);
                    this.el.addClass('active');
                } else {
                    this._onFocusIn();
                }
            }
        }
    };

    p._enableHandler = function (enableState) {
        this.el.off('click', this._bind('_preventClickHandler'));
        this.el.off('touchstart', this._bind('_preventClickHandler'));

        if (enableState === true) {
            if (this.getKeyboard()) {
                this.el.on('click', this._bind('_preventClickHandler'));
                this.el.on('touchstart', this._bind('_preventClickHandler'));
            } else if (!this._getUseKeyboardOperations()) {
                this.input.attr('tabindex', this.settings.inputTabIndex);
            }
        } else {
            if (!this.getKeyboard()) {
                this.input.attr('tabindex', -1);
            }
            _hideKeyboard(this);
        }
        SuperClass.prototype._enableHandler.apply(this, arguments);
    };

    p._visibleHandler = function () {
        if (!this.isVisible()) {
            _hideKeyboard(this);
        }
        SuperClass.prototype._visibleHandler.apply(this, arguments);
    };

    p._preventClickHandler = function (e) {
        this._handleEvent(e);
    };

    /**
     * @method _onBeforeFocusMove
     * This method will close the onscreen keyboard before focus moves to next widget
     * Note1: can not use focusout as this is also called if the user clicks the keyboard buttons
     * Note2: will not be called if the focus is changed manually with click on other widget or focus action
     */
    p._onBeforeFocusMove = function () {
        _hideKeyboard(this);
    };

    /**
     * @method _onBeforeStateChange
     * This method cancels the input if the widget gets disabled or invisible 
     */
    p._onBeforeStateChange = function (e) {
        if (!e.detail.value && this.elem.classList.contains('active')) {
            this._cancelNewValueOnEscape();
            this.input.blur();
        }
    };

    p._onThemeChanged = function () {
        _setInputWidth(this);
    };

    p._onStylePropertiesChanged = function () {
        _setInputWidth(this);
    };

    function _showKeyboard(value) {
        _bindKeyboard.call(this);
        this._setKeyboardOpen(true);
        // keyboard expects undefined for restrict, if no restriction should be set
        // var restrict = this.settings.inputRestriction !== '' ? this.settings.inputRestriction : undefined;
        this.keyBoard.show({
            text: value,
            restrict: this.settings.inputRestriction,
            maxLength: this.settings.maxLength,
            type: this.settings.type,
            header: this.settings.header,

            // additional attributes to identify binding in KeyBoard
            contentId: this.settings.parentContentId,
            widgetId: this.elem.id,
            bindingAttributes: ['value']
        }, this.elem);
    }

    function _hideKeyboard(widget) {
        if (widget._getKeyboardOpen()) {
            widget.keyBoard.hide();
        }
    }

    p.changeKeyBoard = function (e) {
        _unbindKeyboard.call(this);
        this.createKeyBoard();
        if (this.el.hasClass('active') && this.settings.keyboard === true) {
            _showKeyboard.call(this, e.detail.currentValue); 
        }
    };
    
    p._focusWithTab = function () {
        if (this.el.hasClass('active')) {
            this.elem.focus();        
        } else {
            this._onFocusIn();
        }
    };

    p._onFocusIn = function () {
        if (this.isDisabled === true) {
            this.input.blur();
        } else {
            if (!this.elem.classList.contains('active') && this._getUseKeyboardOperations()) {
                this.input[0].select();
            }
            this.focusInTime = Date.now();
            this.input[0].focus();
            this.input[0].addEventListener('keypress', this._bind('_onKeyPress'));
            this.el.addClass('active');
        }
        //console.log('[' + this.elem.id + ']' + e.type + ':', e.originalEvent);
    };

    p._onFocusOut = function () {
        // mouse: mouseDown -> focusOut -> mouseUp -> click -> focusIn => no focus out while mouse down
        // touch: mouseDown -> mouseUp -> click -> focusIn -> focusOut => check time focusOut<=>focusIn
        if (this.lastMouseDownIsTouch && (Date.now() - this.focusInTime) < 20) {
            this._onFocusIn();
        } else if (!this.isMouseDown) {        
            this._focusOut();
        }
    };

    p._focusOut = function () {
        if (brease.config.keyboardHandling.onEnd.action === 'accept' && !this.internalData.enterOut) { 
            this.showValue();
        } else {
            _internalSetValue.call(this, this.input.val());

            if (this.getSubmitOnChange() === true && this.elem.classList.contains('active')) {
                //We check for class active so that submitChange isnt called when escape is pressed
                //and focus is lost
                this.submitChange();
            }
        }
        this.removeFocus();
        this.internalData.enterOut = false;
    };

    p._onKeyPress = function (e) {
        if (KeyActions.getActionForKey(e.key) === Enum.KeyAction.Accept && !this._getUseKeyboardOperations()) {
            this.input.blur();
            return;
        }

        if (!this._validateInput(e.key)) {
            e.preventDefault();
        } else {
            //_setInputWidth(this);
        }
    };
    p._onInput = function () {
        _setInputWidth(this);
    };
    p._handleFocusKeyDown = function (e) {
        //This flag must be set because if someone clicks outside the widget
        //the focusout event will treat this as an "enter" action and submit
        //the value
        if (brease.config.keyboardHandling.onEnd.action === 'accept' && KeyActions.getActionForKey(e.key) === Enum.KeyAction.Accept && this.elem.classList.contains('active')) {
            this.internalData.enterOut = true;
        }

        SuperClass.prototype._handleFocusKeyDown.apply(this, arguments);
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
        this.showValue();
        this.removeFocus();
        this.elem.focus();
    };

    p._inputChangeHandler = function (e) {
        e.stopPropagation();
    };

    p._onKeyBoardClose = function () {
        _unbindKeyboard.call(this);
        this._setKeyboardOpen(false);
        this.el.removeClass('active');
        this.elem.focus();
    };

    p._onKeyBoardSubmit = function (e) {
        _internalSetValue.call(this, e.detail);
        if (this.settings.submitOnChange) {
            this.submitChange();
        }
    };

    p.langChangeHandler = function () {
        if (this.settings.placeholderTextKey !== undefined && this.settings.placeholderTextKey !== '') {
            this.setPlaceholder(this.settings.placeholderTextKey);
        }
        if (this.settings.inputRestrictionTextKey !== undefined && this.settings.inputRestrictionTextKey !== '') {
            this.setInputRestriction(this.settings.inputRestrictionTextKey);
        }
    };

    p._validateInput = function (value) {
        if (this.settings.inputRestrictionRegEx !== undefined && this.settings.inputRestrictionRegEx !== null &&
            this.settings.inputRestrictionRegEx.test(value) === false) {
            return false;
        }
        return true;
    };

    p.setStyle = function () {
        SuperClass.prototype.setStyle.apply(this, arguments);
        _setInputWidth(this);
    };

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

    function _internalSetValue(value) {
        //console.debug(this.constructor.name + '[' + this.elem.id + '].setValue:', value);
        this.settings.value = value;
        this.showValue();

        /**
         * @event change
         * Fired when value is changed by user    
         * See at {@link brease.events.BreaseEvent#static-property-CHANGE BreaseEvent.CHANGE} for event type  
         * @param {String} value
         * @eventComment
         */
        this.dispatchEvent(new CustomEvent(BreaseEvent.CHANGE, { detail: { value: this.settings.value } }));
    }

    function _createInputField(type) {
        this.settings.type = ((type !== undefined) ? type : Enum.InputType.text);
        var attr = { type: this.settings.type };
        if (_.isNumber(this.settings.maxLength)) {
            attr.maxlength = this.settings.maxLength;
        }
        // Unclear when this event should be fired??
        return $('<input>').attr(attr).on('change', this._bind('_inputChangeHandler')).appendTo(this.el);
    }

    function _setInputWidth(widget) {
        if (widget.settings.width === 'auto') {
            var inputText = widget.input.val(),
                displayedText = (inputText === '') ? widget.settings.placeholder : inputText;
            widget.input.css({ 'width': _measureText(displayedText, widget.input.css('font')) + 'px', 'max-width': '100%' });
        }
    }

    function _ellipsisSettings(widget) {
        if (widget.settings.ellipsis !== undefined) {
            widget.settings.ellipsis = Types.parseValue(widget.settings.ellipsis, 'Boolean');
        }
        if (widget.settings.ellipsis === true) {
            widget.el.addClass('ellipsis');
        } else {
            widget.el.removeClass('ellipsis');
        }
    }

    function _renderPlaceholder(widget) {
        var inputElem = widget.input.get(0);
        if (widget.settings.placeholder !== undefined && widget.settings.placeholder !== '') {
            inputElem.setAttribute('placeholder', widget.settings.placeholder);
        } else {
            inputElem.removeAttribute('placeholder');
        }
    }
    function _measureText(val, font) {
        return Math.ceil(BreaseTextMetrics.measureText(val, font).width);
    }
    return dragAndDropCapability.decorate(languageDependency.decorate(WidgetClass, true), false);

});
