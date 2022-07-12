define(['brease/core/BaseWidget',
    'brease/decorators/LanguageDependency',
    'brease/enum/Enum',
    'brease/core/Types',
    'brease/core/Utils',
    'widgets/brease/common/libs/wfUtils/UtilsImage',
    'brease/events/BreaseEvent',
    'brease/decorators/DragAndDropCapability',
    'widgets/brease/common/DragDropProperties/libs/DraggablePropertiesEvents',
    'widgets/brease/common/DragDropProperties/libs/DroppablePropertiesEvents'
], function (SuperClass, languageDependency, Enum, Types, Utils, UtilsImage, BreaseEvent, dragAndDropCapability) {
    
    'use strict';

    /**
     * @class widgets.brease.Button
     * #Description
     * Button with text and/or image.  
     * Text can be language dependent.  
     * @breaseNote 
     * @extends brease.core.BaseWidget
     * @aside example buttons
     *
     * @mixins widgets.brease.common.DragDropProperties.libs.DraggablePropertiesEvents
     * @mixins widgets.brease.common.DragDropProperties.libs.DroppablePropertiesEvents
     *
     * @iatMeta studio:license
     * unlicensed
     * @iatMeta category:Category
     * Buttons
     * @iatMeta description:short
     * Button mit projektierten Aktionen (onClick)
     * @iatMeta description:de
     * Löst ein Ereignis mit einer zugeordneten Aktion aus, wenn der Benutzer darauf klickt
     * @iatMeta description:en
     * Raises an event with an associated action when the user clicks it
     */

    /**
     * @cfg {ImagePath} image=''
     * @iatStudioExposed
     * @iatCategory Appearance
     * @bindable
     * Path to an optional image. 
     */

    /**
     * @cfg {ImagePath} mouseDownImage=''
     * @iatStudioExposed
     * @iatCategory Appearance
     * @bindable
     * Path to an optional image for mouseDown.
     */

    /**
     * @cfg {brease.enum.ImageAlign} imageAlign='left'
     * @iatStudioExposed
     * @iatCategory Appearance
     * Position of image relative to text. 
     */

    /**
     * @cfg {String} text=''
     * @localizable
     * @iatStudioExposed
     * @iatCategory Appearance
     * @bindable
     * Text which is displayed in the widget  
     */

    /**
     * @cfg {String} mouseDownText=''
     * @localizable
     * @iatCategory Appearance
     * @iatStudioExposed
     * @bindable
     * Text which is displayed in the widget when pressed
     */

    /**
     * @cfg {Boolean} ellipsis=false
     * @iatStudioExposed
     * @iatCategory Behavior
     * If true, overflow of text is symbolized with an ellipsis. This option has no effect, if wordWrap = true.
     */

    /**
     * @cfg {Boolean} wordWrap=false
     * @iatStudioExposed
     * @iatCategory Behavior
     * If true, text will wrap when necessary.
     * This property has no effect, if multiLine=false
     */

    /**
    * @cfg {Boolean} breakWord=false
    * @iatStudioExposed
    * @iatCategory Behavior
     * Allows lines to be broken within words if an otherwise unbreakable string is too long to fit.
    */

    /**
     * @cfg {Boolean} multiLine=false
     * @iatStudioExposed
    * @iatCategory Behavior
     * If true, more than one line is possible.
     * Text will wrap when necessary (if property wordWrap is set to true) or at explicit line breaks (\n).
     * If false, text will never wrap to the next line. The text continues on the same line.
     */

    /**
    * @cfg {Boolean} useSVGStyling=true
    * @iatStudioExposed
    * @iatCategory Appearance
    * Define if the image stylings (i.e imageColor) are applied - only valid when SVG Images are used.
    */

    /**
     * @cfg {Integer} tabIndex=0
     * @iatStudioExposed
     * @iatCategory Behavior 
     * sets if a widget should have autofocus enabled (0), the order of the focus (>0),
     * or if autofocus should be disabled (-1)
     */

    var defaultSettings = {
            imageAlign: Enum.ImageAlign.left,
            ellipsis: false,
            wordWrap: false,
            multiLine: false,
            breakWord: false,
            useSVGStyling: true,
            tabIndex: 0
        },

        WidgetClass = SuperClass.extend(function Button() {
            SuperClass.apply(this, arguments);
        }, defaultSettings),

        p = WidgetClass.prototype;

    WidgetClass.static.multitouch = true;

    p.init = function () {
        if (this.settings.omitClass !== true) {
            this.addInitialClass('breaseButton');
        }
        _imgHandling.call(this);
        _overflowInit(this);
        _textInit.call(this);
        SuperClass.prototype.init.call(this);
    };

    p.langChangeHandler = function (e) {
        if (this.settings.textkey) {
            this.setText(brease.language.getTextByKey(this.settings.textkey), true);
        }
        if (this.settings.mouseDownTextkey) {
            this.setMouseDownText(brease.language.getTextByKey(this.settings.mouseDownTextkey), true);
        }
    };

    /**
    * @method setText
    * @iatStudioExposed
    * Sets the visible text. This method can remove an optional textkey.
    * @param {String} text
    * @param {Boolean} [keepKey=false] Set true, if textkey should not be removed
    * @paramMeta text:localizable=true
    */
    p.setText = function (text, keepKey) {
        this.settings.text = text;
        if (keepKey !== true) {
            this.removeTextKey();
        }

        if (brease.config.editMode !== true) {
            if (brease.language.isKey(this.settings.text) === true) {
                this.setTextKey(brease.language.parseKey(this.settings.text), false);
                this.langChangeHandler();
                return;
            }
        }

        if (this.textEl === undefined) {
            _appendTextEl(this);
        }

        if (this.textEl) {
            this.textEl.text(brease.language.unescapeText(text));
        }
        
        this.setClasses();
    };

    /**
     * @method getText
     * Returns the visible text.
     * @return {String}
     */
    p.getText = function () {
        return this.settings.text;
    };

    /**
    * @method setMouseDownText
    * @iatStudioExposed
    * Sets the visible text for pressed state. This method can remove an optional textkey.
    * @param {String} text
    * @param {Boolean} [keepKey=false] Set true, if textkey should not be removed
    * @paramMeta text:localizable=true
    */
    p.setMouseDownText = function (text, keepKey) {
        this.settings.mouseDownText = text;

        if (this.settings.mouseDownText !== undefined && this.settings.mouseDownText !== '') {
            if (keepKey !== true) {
                this.removeMouseDownTextKey();
            }

            if (brease.config.editMode !== true) {
                if (brease.language.isKey(this.settings.mouseDownText) === true) {
                    this.setMouseDownTextKey(brease.language.parseKey(this.settings.mouseDownText), false);
                    this.langChangeHandler();
                    return;
                }
            }

            if (this.downtextEl === undefined) {
                _appendDownTextEl(this);
            }

            if (this.downtextEl) {
                if (this.settings.mouseDownText === '') {
                    this.downtextEl.text(brease.language.unescapeText(this.settings.text));
                }
                this.downtextEl.text(brease.language.unescapeText(text));
            }
            this.setClasses();
        } else if (this.downtextEl !== undefined) {
            _removeDownTextEl(this);
        }
    };

    /**
     * @method getMouseDownText
     * Returns the visible text for pressed state.
     * @return {String}
     */
    p.getMouseDownText = function () {
        return this.settings.mouseDownText;
    };

    /**
    * @method setMouseDownImage
    * @iatStudioExposed
    * Sets the image when mouse down
    * @param {ImagePath} mouseDownImage
    */
    p.setMouseDownImage = function (mouseDownImage) {
        if (mouseDownImage === '') {
            this.settings.mouseDownImage = undefined;
            if (this.el.hasClass('active') || this.el.hasClass('checked')) {
                this.setImage(this.settings.image, true);
            }
        } else {
            this.settings.mouseDownImage = mouseDownImage;
            if (this.el.hasClass('active') || this.el.hasClass('checked')) {
                this.setImage(this.settings.mouseDownImage, true);
            }
        }
    };

    /**
     * @method getMouseDownImage 
     * Returns the image when mouse down 
     * @return {ImagePath} mouseDownImage
     */
    p.getMouseDownImage = function () {
        return this.settings.mouseDownImage;
    };

    /**
    * @method setEllipsis
    * Sets the value if ellipsis should be used.
    * @param {Boolean} ellipsis
    */
    p.setEllipsis = function (ellipsis) {
        this.settings.ellipsis = ellipsis;
        _overflowInit(this);
    };

    /**
     * @method getEllipsis 
     * Returns the value if ellipsis  should be used.
     * @return {Boolean} ellipsis
     */
    p.getEllipsis = function () {
        return this.settings.ellipsis;
    };

    /**
    * @method setImageAlign
    * Sets the value for image align.
    * @param {brease.enum.ImageAlign} imageAlign
    */
    p.setImageAlign = function (imageAlign) {
        this.settings.imageAlign = imageAlign;
        this.setClasses();
        if (this.textEl && (this.settings.imageAlign === Enum.ImageAlign.left || this.settings.imageAlign === Enum.ImageAlign.top)) {
            this.el.prepend(this.imgEl);
            this.el.prepend(this.svgEl);
        } else {
            this.el.append(this.imgEl);
            this.el.append(this.svgEl);
        }
    };

    /**
     * @method getImageAlign 
     * Returns the value for image align.
     * @return {brease.enum.ImageAlign} imageAlign
     */
    p.getImageAlign = function () {
        return this.settings.imageAlign;
    };

    /**
     * @method setMultiLine
     * Sets the value for multiLine.
     * @param {Boolean} multiLine
     */
    p.setMultiLine = function (multiLine) {
        this.settings.multiLine = multiLine;
        _overflowInit(this);
    };

    /**
     * @method getMultiLine 
     * Returns the value of multiLine.
     * @return {Boolean} multiLine
     */
    p.getMultiLine = function () {
        return this.settings.multiLine;
    };

    /**
     * @method setWordWrap
     * Sets the value for word wrap.
     * @param {Boolean} wordWrap
     */
    p.setWordWrap = function (wordWrap) {
        this.settings.wordWrap = wordWrap;
        _overflowInit(this);
    };

    /**
     * @method getWordWrap 
     * Returns the value for word wrap.
     * @return {Boolean} wordWrap
     */
    p.getWordWrap = function () {
        return this.settings.wordWrap;
    };

    /**
     * @method setBreakWord
     * Sets the value for break word.
     * @param {Boolean} breakWord
     */
    p.setBreakWord = function (breakWord) {
        this.settings.breakWord = breakWord;
        _overflowInit(this);
    };

    /**
     * @method getBreakWord 
     * Returns the value for break word.
     * @return {Boolean} breakWord
     */
    p.getBreakWord = function () {
        return this.settings.breakWord;
    };

    /**
     * @method setTextKey
     * set the textkey
     * @param {String} key The new textkey
     */
    p.setTextKey = function (key, invoke) {
        //console.debug(WidgetClass.name + '[id=' + this.elem.id + '].setTextKey:', key);
        if (key !== undefined) {
            this.settings.textkey = key;
            this.setLangDependency(true);
            if (invoke !== false) {
                this.langChangeHandler();
            }
        }
    };

    /**
     * @method getTextKey
     * get the textkey
     */
    p.getTextKey = function () {
        return this.settings.textkey;
    };

    /**
     * @method removeTextKey
     * remove the textkey
     */
    p.removeTextKey = function () {

        this.settings.textkey = null;
        if (!this.settings.mouseDownTextkey) {
            this.setLangDependency(false);
        }
    };

    /**
     * @method setMouseDownTextKey
     * set the textkey for mouseDownText
     * @param {String} key The new textkey
     */
    p.setMouseDownTextKey = function (key, invoke) {
        //console.debug(WidgetClass.name + '[id=' + this.elem.id + '].setMouseDownTextKey:', key);
        if (key !== undefined) {
            this.settings.mouseDownTextkey = key;
            this.setLangDependency(true);
            if (invoke !== false) {
                this.langChangeHandler();
            }
        }
    };

    /**
     * @method getMouseDownTextKey
     * get the mouseDownTextkey
     */
    p.getMouseDownTextKey = function () {
        return this.settings.mouseDownTextkey;
    };

    /**
     * @method removeMouseDownTextKey
     * remove the mouseDownTextkey
     */
    p.removeMouseDownTextKey = function () {

        this.settings.mouseDownTextkey = null;
        if (!this.settings.textkey) {
            this.setLangDependency(false);
        }
    };

    /**
     * @method setImage
     * @iatStudioExposed
     * Sets an image.
     * @param {ImagePath} image
     */
    p.setImage = function (image, omitSettings) {
        //console.debug(WidgetClass.name + '[id=' + this.elem.id + '].setImage:', image, this.settings.imageAlign, Enum.ImageAlign.left);
        var widget = this;

        if (image !== undefined && image !== '') {

            if (omitSettings !== true) {
                this.settings.image = image;
            }

            if (this.imageDeferred !== undefined) {
                if (this.imageDeferred.state() === 'pending') {
                    this.imageDeferred.reject();
                }
            }

            if (UtilsImage.isStylable(image) && this.settings.useSVGStyling) {
                this.imageDeferred = UtilsImage.getInlineSvg(image);
                this.imageDeferred.done(function (svgElement) {
                    widget.svgEl.replaceWith(svgElement);
                    widget.svgEl = svgElement;
                });
                this.imgEl.hide();
                this.svgEl.show();
            } else {
                this.imgEl.attr('src', image);
                this.svgEl.hide();
                this.imgEl.show();
            }
            this.setClasses();
        } else {
            this.settings.image = undefined;
            this.svgEl.hide();
            this.imgEl.hide();
        }
    };

    /**
     * @method getImage
     * Returns the path of the image.
     * @return {ImagePath} text
     */
    p.getImage = function () {
        return this.settings.image;
    };

    /**
     * @method removeImage
     * @iatStudioExposed
     * Remove an image.
     */
    p.removeImage = function () {
        if (this.imgEl) {
            this.imgEl.hide();
            this.svgEl.hide();
            this.settings.image = undefined;
        }
        this.setClasses();
    };

    /**
     * @method removeText
     * @iatStudioExposed
     * Remove text.
     */
    p.removeText = function () {
        this.setText('');
        this.setClasses();
    };

    /**
     * @method removeMouseDownText
     * @iatStudioExposed
     * Remove mouseDownText.
     */
    p.removeMouseDownText = function () {
        this.setMouseDownText('');
        this.setClasses();
    };

    /**
    * @method setUseSVGStyling
    * Sets useSVGStyling
    * @param {Boolean} useSVGStyling
    */
    p.setUseSVGStyling = function (useSVGStyling) {
        this.settings.useSVGStyling = Types.parseValue(useSVGStyling, 'Boolean', { default: true });
        this.setImage(this.settings.image, false);
    };

    /**
    * @method getUseSVGStyling
    * Returns useSVGStyling
    * @return {Boolean}
    */
    p.getUseSVGStyling = function () {
        return this.settings.useSVGStyling;
    };

    p._initEventHandler = function () {
        SuperClass.prototype._initEventHandler.apply(this, arguments);
        if (this.el) {
            this.el.on(BreaseEvent.DBL_CLICK, this._bind('_dblclickHandler'));
            this.el.on(BreaseEvent.MOUSE_DOWN, this._bind('_downHandler'));
        }

    };

    p._clickHandler = function (e) {
        SuperClass.prototype._clickHandler.apply(this, arguments);
        if (this.isDisabled || brease.config.editMode) { return; }
        //Dispatch a Click event to the DOM in order to allow other widgets
        //use this event when aggregating the Button (BaseWidget dispatch(false))
        //only trigers the event to the Event/Action system
        this.elem.dispatchEvent(new CustomEvent('Click', { bubbles: true }));
        this._onButtonClick();
    };

    p._onButtonClick = function (e) {
        //ToBe extended by child widgets
    };

    p._dblclickHandler = function (e) {
        if (this.isDisabled || brease.config.editMode) { return; }

        /**
        * @event DoubleClick
        * @iatStudioExposed
        * Fired when element has double click.
        * @param {String} horizontalPos horizontal position of click in pixel i.e '10px'
        * @param {String} verticalPos vertical position of click in pixel i.e '10px'
        */
        var ev = this.createMouseEvent('DoubleClick', {}, e);
        ev.dispatch();
    };

    p._downHandler = function (e) {
        if (this.isDisabled || brease.config.editMode || this.isActive) { return; }
        this.isActive = true;
        this.pointerId = Utils.getPointerId(e);

        if (this.settings.mouseDownImage !== '' && this.settings.mouseDownImage !== undefined) {
            this.setImage(this.settings.mouseDownImage, true);
        }

        this.el.addClass('active');
        $(document).on(BreaseEvent.MOUSE_UP, this._bind('_upHandler'));
        $(window).on('blur', this._bind('_blurOnMoveHandler'));
        /**
        * @event MouseDown
        * @iatStudioExposed
        * Fired when widget enters mouseDown state
        * @param {String} horizontalPos horizontal position of mouse in pixel i.e '10px'
        * @param {String} verticalPos vertical position of mouse in pixel i.e '10px'
        */
        var ev = this.createMouseEvent('MouseDown', {}, e);
        ev.dispatch();
    };
    /**
    * @method _blurOnMoveHandler
    * Called if focus on button is lost after mousedown occured. Used to reset the buttons active state
    */
    p._blurOnMoveHandler = function () {
        this._resetActiveState();
        $(document).off(BreaseEvent.MOUSE_UP, this._bind('_upHandler'));
        $(window).off('blur', this._bind('_blurOnMoveHandler'));
        var ev = this.createEvent('MouseUp');
        ev.dispatch();
    };
    /**
    * @method _resetActiveState
    * Removes class active from the element. 
    * Resets the mouseDownImage if defined. 
    * Resets this.isActive
    */
    p._resetActiveState = function () {
        this.isActive = false;

        if (this.settings.mouseDownImage !== '' && this.settings.mouseDownImage !== undefined && this.settings.image !== undefined) {
            this.setImage(this.settings.image, true);
        }

        if (this.settings.mouseDownImage !== undefined && this.settings.image === undefined) {
            this.setImage('', false);
        }
        this.elem.classList.remove('active');
    };

    p._upHandler = function (e) {
        $(window).off('blur', this._bind('_blurOnMoveHandler'));
        if (this.isDisabled || brease.config.editMode || Utils.getPointerId(e) !== this.pointerId) { return; }
        this._resetActiveState();
        $(document).off(BreaseEvent.MOUSE_UP, this._bind('_upHandler'));

        /**
        * @event MouseUp
        * @iatStudioExposed
        * Fired when widget enters mouseUp state
        * @param {String} horizontalPos horizontal position of mouse in pixel i.e '10px'
        * @param {String} verticalPos vertical position of mouse in pixel i.e '10px'
        */
        var ev = this.createMouseEvent('MouseUp', {}, e);
        ev.dispatch();

    };

    p.disable = function () {
        if (this.isActive) {
            this.el.trigger(BreaseEvent.MOUSE_UP);
        }
        SuperClass.prototype.disable.apply(this, arguments);
    };

    p._preventClickHandler = function (e) {
        this._handleEvent(e);
    };

    p.wake = function () {
        SuperClass.prototype.wake.apply(this, arguments);
    };

    p.suspend = function () {
        $(window).off('blur', this._bind('_blurOnMoveHandler'));
        $(document).off(BreaseEvent.MOUSE_UP, this._bind('_upHandler'));
        this._resetActiveState();
        SuperClass.prototype.suspend.apply(this, arguments);
    };

    p.dispose = function () {
        $(window).off('blur', this._bind('_blurOnMoveHandler'));
        $(document).off(BreaseEvent.MOUSE_UP, this._bind('_upHandler'));
        this._resetActiveState();
        SuperClass.prototype.dispose.apply(this, arguments);
    };

    p.setClasses = function () {
        var imgClass;
        if (this.imgEl !== undefined && this.textEl !== undefined && this.settings.text !== '') {

            switch (this.settings.imageAlign) {
                case Enum.ImageAlign.left:
                    imgClass = 'image-left';
                    break;

                case Enum.ImageAlign.right:
                    imgClass = 'image-right';
                    break;

                case Enum.ImageAlign.top:
                    imgClass = 'image-top';
                    break;

                case Enum.ImageAlign.bottom:
                    imgClass = 'image-bottom';
                    break;

            }
            this.el.removeClass('image-left image-right image-top image-bottom');
            this.el.addClass(imgClass);
        } else {
            this.el.removeClass('image-left image-right image-top image-bottom');
        }
    };

    // private 

    function _imgHandling() {
        this.settings.imageAlign = Types.parseValue(this.settings.imageAlign, 'Enum', { Enum: Enum.ImageAlign, default: Enum.ImageAlign.left });
        if (this.imgEl === undefined && this.svgEl === undefined) {
            this.imgEl = $('<img/>').hide();
            this.svgEl = $('<svg/>').hide();
        }
        this.setImageAlign(this.settings.imageAlign);
        if (this.settings.image !== undefined) {
            this.setImage(this.settings.image);
        }
    }

    function _overflowInit(widget) {
        widget.settings.ellipsis = Types.parseValue(widget.settings.ellipsis, 'Boolean');
        widget.settings.multiLine = Types.parseValue(widget.settings.multiLine, 'Boolean');
        widget.settings.wordWrap = Types.parseValue(widget.settings.wordWrap, 'Boolean');

        if (widget.settings.ellipsis === true) {
            widget.el.addClass('ellipsis');
        } else {
            widget.el.removeClass('ellipsis');
        }

        if (widget.settings.multiLine === true) {

            widget.el.addClass('multiLine');

            if (widget.settings.wordWrap === true) {
                widget.el.addClass('wordWrap');
                widget.el.removeClass('multiLine');
            } else {
                widget.el.removeClass('wordWrap');
            }

            if (widget.settings.breakWord === true) {
                widget.el.addClass('breakWord');
                widget.el.removeClass('multiLine');
            } else {
                widget.el.removeClass('breakWord');
            }

        } else {
            widget.el.removeClass('breakWord');
            widget.el.removeClass('wordWrap');
            widget.el.removeClass('multiLine');
        }
    }

    function _textInit() {
        //console.log('[' + this.elem.id + ']._textInit');
        if (this.settings.text !== undefined && this.settings.text !== '') {
            if (brease.language.isKey(this.settings.text) === false) {
                this.setText(this.settings.text);
            } else {
                this.setTextKey(brease.language.parseKey(this.settings.text), false);
            }
        }

        if (this.settings.mouseDownText !== undefined && this.settings.mouseDownText !== '') {
            if (brease.language.isKey(this.settings.mouseDownText) === false) {
                this.setMouseDownText(this.settings.mouseDownText);
            } else {
                this.setMouseDownTextKey(brease.language.parseKey(this.settings.mouseDownText), false);
            }
        }
        this.langChangeHandler();
    }

    function _appendDownTextEl(widget) {
        if (widget.downtextEl === undefined) {
            widget.downtextEl = $('<span class="down"></span>');
        }
        if (widget.imgEl && (widget.settings.imageAlign === Enum.ImageAlign.right || widget.settings.imageAlign === Enum.ImageAlign.bottom)) {
            widget.el.prepend(widget.downtextEl);
        } else {
            widget.el.append(widget.downtextEl);
        }
    }

    function _removeDownTextEl(widget) {
        if (widget.downtextEl !== undefined) {
            widget.downtextEl.remove();
            widget.downtextEl = undefined;
        }
    }

    function _appendTextEl(widget) {
        if (widget.textEl === undefined) {
            widget.textEl = $('<span class="up"></span>');
        }
        if (widget.imgEl && (widget.settings.imageAlign === Enum.ImageAlign.right || widget.settings.imageAlign === Enum.ImageAlign.bottom)) {
            widget.el.prepend(widget.textEl);
        } else {
            widget.el.append(widget.textEl);
        }
    }

    return dragAndDropCapability.decorate(languageDependency.decorate(WidgetClass, false), false);

});
