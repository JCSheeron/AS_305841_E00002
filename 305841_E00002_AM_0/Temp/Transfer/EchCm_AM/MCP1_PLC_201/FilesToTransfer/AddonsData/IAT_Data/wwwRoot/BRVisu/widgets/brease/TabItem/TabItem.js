define([
    'brease/core/ContainerWidget',
    'brease/decorators/LanguageDependency',
    'brease/enum/Enum',
    'brease/core/Types',
    'brease/events/BreaseEvent',
    'widgets/brease/common/libs/wfUtils/UtilsImage',
    'brease/decorators/DragAndDropCapability',
    'widgets/brease/common/DragDropProperties/libs/DroppablePropertiesEvents'
], function (
    SuperClass, languageDependency, Enum, Types, 
    BreaseEvent, UtilsImage, dragAndDropCapability
) {
    
    'use strict';

    /**
     * @class widgets.brease.TabItem
     * #Description
     * widget which represents a tab in the TabControl Widget
     * @breaseNote 
     * @extends brease.core.ContainerWidget
     *
     * @mixins widgets.brease.common.DragDropProperties.libs.DroppablePropertiesEvents
     *
     * @iatMeta category:Category
     * Container
     * @iatMeta description:short
     * Tab plus content in a TabController
     * @iatMeta description:de
     * Konfiguriert einen Tab im TabController
     * @iatMeta description:en
     * Configures one tab in a TabController
     * @iatMeta studio:isContainer
     * true
     */

    /**
     * @property {WidgetList} parents=["widgets.brease.TabControl"]
     * @inheritdoc  
     */

    /**
     * @cfg {ImagePath} image=''
     * @iatStudioExposed
     * @bindable
     * @iatCategory Appearance
     * Path to an optional image.
     * When svg - graphics are used, be sure that in your *.svg-file height and width attributes are specified on the svg-element.
     * For more detailed information see https://www.w3.org/TR/SVG/struct.html (chapter 5.1.2)
     */

    /**
     * @cfg {ImagePath} mouseDownImage=''
     * @iatStudioExposed
     * @iatCategory Appearance
     * Path to an optional image for mouseDown.
     * When svg - graphics are used, be sure that in your *.svg-file height and width attributes are specified on the svg-element.
     * For more detailed information see https://www.w3.org/TR/SVG/struct.html (chapter 5.1.2)
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
     * @bindable
     * @iatCategory Appearance
     * Text which is displayed in the button
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
     */

    /**
     * @cfg {Boolean} multiLine=false
     * @iatStudioExposed
     * @iatCategory Behavior
     * If true, more than one line is possible. Text will wrap when necessary (wordWrap=true) or at line breaks (\n).
     * If false, text will never wrap to the next line. The text continues on the same line.
     */

    /**
    * @cfg {Boolean} useSVGStyling=true
    * @iatStudioExposed
    * @iatCategory Appearance
    * Define if the image stylings (i.e imageColor) are applied - only valid when SVG Images are used.
    */
    var defaultSettings = {
            imageAlign: Enum.ImageAlign.left,
            textAlign: Enum.TextAlign.center,
            ellipsis: false,
            wordWrap: false,
            multiLine: false,
            height: 30,
            width: 100,
            useSVGStyling: true
        },

        WidgetClass = SuperClass.extend(function TabItem() {
            SuperClass.apply(this, arguments);
        }, defaultSettings),

        p = WidgetClass.prototype;

    p.init = function () {

        if (this.settings.omitClass !== true) {
            this.el.addClass('breaseTabItemContainer');
        }
        this._createTab();
        this._eventHandling();

        if (this.settings.visible === false && brease.config.editMode !== true) {
            this._setVisible();
        }

        SuperClass.prototype.init.call(this);

        this.setStyle(this.settings.style);
    };

    p.setStyle = function (style) {
        this.tab[0].classList.remove(this.settings.stylePrefix + '_style_' + this.settings.style);
        this.settings.style = style;
        this.tab[0].classList.add(this.settings.stylePrefix + '_style_' + this.settings.style);
    };

    p._setWidth = function (w) {
        this.settings.width = w;
        this.tab[0].style.width = this.settings.width + 'px';
    };

    p._setHeight = function (h) {
        this.settings.height = h;
        this.tab[0].style.height = this.settings.height + 'px';
    };

    p.getTabElement = function () {
        return this.tab;

    };

    /**
     * @method setLeft
     * Sets left
     * @param {Integer} left
     */
    p.setLeft = function (left) {
        this.settings.left = left;
        this.tab[0].style.left = this.settings.left + 'px';
    };

    p.show = function () {
        this.tab[0].classList.add('active');
        this._setVisible();
        this.containerVisibility = true;
        this.updateChildrenVisibility();
        this._imageHandling();
        this.elem.dispatchEvent(new CustomEvent(BreaseEvent.VISIBILITY_CHANGED, { bubbles: false, detail: { visible: !this.isHidden } }));
    };

    p.hide = function () {
        this.tab[0].classList.remove('active');
        this._setVisible();
        this.containerVisibility = false;
        this.updateChildrenVisibility();
        this._imageHandling();
    };

    p._eventHandling = function () {
        this.tab.on(BreaseEvent.CLICK, this._bind('_clickHandler'));
        this.tab.on(BreaseEvent.MOUSE_DOWN, this._bind('_downHandler'));
        this.tab.on(BreaseEvent.MOUSE_UP, this._bind('_upHandler'));

    };

    p._downHandler = function (e) {

    };

    p._upHandler = function (e) {

    };

    p._createTab = function () {
        var tabId = this.elem.id + '_breaseTabItemTab';
        this.tab = $("<div id='" + tabId + "'class='tabItem breaseTabItem' data-brease-container=" + this.elem.id + ' />').width(this.settings.width).height(this.settings.height);
        
        this._appendImgEl();
        this._multiLineWordWrapEllipsis();

        if (this.settings.text !== undefined) {
            if (brease.language.isKey(this.settings.text) === false) {
                this.setText(this.settings.text);
            } else {
                this.setTextKey(brease.language.parseKey(this.settings.text));
            }
        }
        if (this.settings.image !== undefined) {
            this.setImage(this.settings.image);
        }

        if (this.settings.left !== undefined) {
            this.tab[0].style.left = this.settings.left + 'px';
        }

    };

    p.suspend = function () {
        this.tab.off(BreaseEvent.CLICK, this._bind('_clickHandler'));
        SuperClass.prototype.suspend.apply(this, arguments);
    };

    p.wake = function () {
        this.tab.on(BreaseEvent.CLICK, this._bind('_clickHandler'));
        SuperClass.prototype.wake.apply(this, arguments);
    };

    p.setParentId = function (parentId) {
        this.settings.parentId = parentId;
    };

    p._clickHandler = function (e) {
        if (this.settings.parentId !== undefined && e.currentTarget.id === this.tab[0].id) {
            brease.callWidget(this.settings.parentId, '_tabClickHandler', this.elem.id);
        }
        SuperClass.prototype._clickHandler.call(this, e, { origin: this.elem.id });
    };

    p.updateVisibility = function (initial) {
        SuperClass.prototype.updateVisibility.apply(this, arguments);
        if (!initial) {
            this._setVisible();
        }
    };

    p.langChangeHandler = function (e) {
        if (this.settings.textkey && (e === undefined || e.detail === undefined || e.detail.textkey === undefined || e.detail.textkey === this.settings.textkey)) {
            
            var text = brease.language.getTextByKey(this.settings.textkey);
            if (text === brease.language.TEXTKEYPREFIX + this.settings.textkey) {
                this.settings.text = text;
                updateText.call(this, text);
            } else {
                this.setText(text, true); 
            }
        }
    };

    /**
    * @method setText
    * @iatStudioExposed
    * Sets the visible text. This method can remove an optional textkey.
    * @param {String} text
    * @param {Boolean} keepKey Set true, if textkey should not be removed.
    * @paramMeta text:localizable=true
    */
    p.setText = function (text, keepKey) {
        this.settings.text = text;

        if (brease.language.isKey(this.settings.text) === false) {
            if (keepKey !== true) {
                this.removeTextKey();
            }
            updateText.call(this, text);
        } else {
            this.setTextKey(brease.language.parseKey(this.settings.text));
        }

    };

    /**
     * @method getText
     * Returns the visible text.
     * @return {String} text
     */
    p.getText = function () {
        return this.settings.text;
    };

    /**
     * @method setTextKey
     * set the textkey
     * @param {String} key The new textkey
     */
    p.setTextKey = function (key) {
        if (key !== undefined) {
            this.settings.textkey = key;
            this.setLangDependency(true);
            this.langChangeHandler();
        }
    };

    /**
   * @method removeTextKey
   * remove the textkey
   */
    p.removeTextKey = function () {
        this.settings.textkey = null;
        this.setLangDependency(false);
    };

    /**
   * @method removeText
   * @iatStudioExposed
   * Remove text.
   */
    p.removeText = function () {
        this.setText('');
        this._setClasses();
    };

    /**
     * @method getTextKey
     * get the textkey
     */
    p.getTextKey = function () {
        return this.settings.textkey;
    };

    /**
     * @method setImage
     * @iatStudioExposed
     * Sets an image.
     * @param {ImagePath} image
     */
    p.setImage = function (image, omitSettings) {
        this.settings.image = image;
        this._imageHandling();
        this._setClasses();
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
        this._hideImages();
        this.settings.image = undefined;
        this._setClasses();
    };

    /**
     * @method setMouseDownImage
     * Sets mouseDownImage
     * @param {ImagePath} mouseDownImage
     */
    p.setMouseDownImage = function (mouseDownImage) {
        this.settings.mouseDownImage = mouseDownImage;
        this._imageHandling();
        this._setClasses();
    };

    /**
    * @method getMouseDownImage 
    * Returns mouseDownImage.
    * @return {ImagePath}
    */
    p.getMouseDownImage = function () {
        return this.settings.mouseDownImage;
    };

    /**
     * @method setImageAlign
     * Sets imageAlign
     * @param {brease.enum.ImageAlign} imageAlign
     */
    p.setImageAlign = function (imageAlign) {
        this.settings.imageAlign = imageAlign;

        if (imageAlign === Enum.ImageAlign.left || imageAlign === Enum.ImageAlign.top) {
            this.tab.append(this.textEl);
        } else if (imageAlign === Enum.ImageAlign.right || imageAlign === Enum.ImageAlign.bottom) {
            this.tab.prepend(this.textEl);
        }

        this._setClasses();
    };

    /**
     * @method getImageAlign 
     * Returns imageAlign.
     * @return {brease.enum.ImageAlign}
     */
    p.getImageAlign = function () {
        return this.settings.imageAlign;
    };

    /**
     * @method setEllipsis
     * Sets ellipsis
     * @param {Boolean} ellipsis
     */
    p.setEllipsis = function (ellipsis) {
        this.settings.ellipsis = ellipsis;
        this._multiLineWordWrapEllipsis();
    };

    /**
     * @method getEllipsis 
     * Returns ellipsis.
     * @return {Boolean}
     */
    p.getEllipsis = function () {
        return this.settings.ellipsis;
    };

    /**
     * @method setWordWrap
     * Sets wordWrap
     * @param {Boolean} wordWrap
     */
    p.setWordWrap = function (wordWrap) {
        this.settings.wordWrap = wordWrap;
        this._multiLineWordWrapEllipsis();
    };

    /**
     * @method getWordWrap 
     * Returns wordWrap.
     * @return {Boolean}
     */
    p.getWordWrap = function () {
        return this.settings.wordWrap;
    };

    /**
     * @method setMultiLine
     * Sets multiLine
     * @param {Boolean} multiLine
     */
    p.setMultiLine = function (multiLine) {
        this.settings.multiLine = multiLine;
        this._multiLineWordWrapEllipsis();
    };

    /**
     * @method getMultiLine 
     * Returns multiLine.
     * @return {Boolean}
     */
    p.getMultiLine = function () {
        return this.settings.multiLine;
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

    p.dispose = function () {
        this.tab.off();
        $(document).off(BreaseEvent.MOUSE_UP, this._bind('_upHandler'));
        SuperClass.prototype.dispose.call(this);
    };

    p._appendTextEl = function () {
        this.textEl = $('<span></span>');
        if (this.imgEl && (this.settings.imageAlign === Enum.ImageAlign.right || this.settings.ImageAlign === Enum.ImageAlign.bottom)) {
            this.tab[0].insertBefore(this.textEl[0], this.tab[0].firstChild);
        } else {
            this.tab[0].appendChild(this.textEl[0]);
        }
    };

    p._appendImgEl = function () {
        this.imgEl = $('<img/>');
        this.svgEl = $('<svg/>');
        if (this.textEl && (this.settings.imageAlign === Enum.ImageAlign.left || this.settings.imageAlign === Enum.ImageAlign.top)) {
            this.tab[0].insertBefore(this.imgEl[0], this.tab[0].firstChild);
            this.tab[0].insertBefore(this.svgEl[0], this.tab[0].firstChild);
        } else {
            this.tab[0].appendChild(this.imgEl[0]);
            this.tab[0].appendChild(this.svgEl[0]);
        }

        this.imgEl[0].style.display = 'none';
        this.svgEl[0].style.display = 'none';

    };

    p._setVisible = function () {
        if (this.isHidden === false) {
            this.tab[0].classList.remove('remove');
            if (this.tab[0].classList.contains('active')) {
                this.elem.classList.remove('remove');
            } else {
                this.elem.classList.add('remove');
            }
        } else {
            this.tab[0].classList.add('remove');
            this.elem.classList.add('remove');
        }

    };

    p._multiLineWordWrapEllipsis = function () {

        this.settings.multiLine = Types.parseValue(this.settings.multiLine, 'Boolean');
        this.settings.wordWrap = Types.parseValue(this.settings.wordWrap, 'Boolean');
        this.settings.ellipsis = Types.parseValue(this.settings.ellipsis, 'Boolean');

        if (this.settings.multiLine === true) {
            if (this.settings.wordWrap === true) {
                this.tab[0].classList.add('wordWrap');
                this.tab[0].classList.remove('multiLine');
            } else {
                this.tab[0].classList.add('multiLine');
                this.tab[0].classList.remove('wordWrap');
            }
        } else {
            this.tab[0].classList.remove('multiLine');
            this.tab[0].classList.remove('wordWrap');
        }

        if (this.settings.ellipsis === true) {
            this.tab[0].classList.add('ellipsis');
        } else {
            this.tab[0].classList.remove('ellipsis');
        }
    };

    p._setClasses = function () {
        var imgClass;
        if (this.imgEl !== undefined && this.textEl !== undefined && this.settings.text !== '') {

            this.tab[0].classList.remove('image-left', 'image-right', 'image-top', 'image-bottom');

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

            this.tab[0].classList.add(imgClass);
        } else {
            this.tab[0].classList.remove('image-left', 'image-right', 'image-top', 'image-bottom');
        }
    };

    p._imageHandling = function () {

        if (this.tab[0].classList.contains('active')) {
            if (this.settings.mouseDownImage !== undefined && this.settings.mouseDownImage !== '') {
                this._imageSet(this.settings.mouseDownImage);
            } else if ((this.settings.mouseDownImage === undefined || this.settings.mouseDownImage === '') && this.settings.image !== undefined && this.settings.image !== '') {
                this._imageSet(this.settings.image);
            } else {
                this._hideImages();
            }
        } else {
            if (this.settings.image !== undefined && this.settings.image !== '') {
                this._imageSet(this.settings.image);
            } else {
                this._hideImages();
            }
        }
    };

    p._imageSet = function (image) {
        var widget = this;

        if (UtilsImage.isStylable(image) && this.settings.useSVGStyling) {
            this.imgEl[0].style.display = 'none';
            UtilsImage.getInlineSvg(image).then(function (svgElement) {
                widget.svgEl.replaceWith(svgElement);
                widget.svgEl = svgElement;
                widget.svgEl[0].style.display = 'block';
            });
        } else {
            this.imgEl[0].style.display = 'block';
            this.svgEl[0].style.display = 'none';
            this.imgEl.attr('src', image);
        }
    };

    p._hideImages = function () {
        this.svgEl[0].style.display = 'none';
        this.imgEl[0].style.display = 'none';
    };

    // override method called in BaseWidget.init
    p._initEditor = function () {
        var widget = this;

        widget.isRotatable = function () { return false; };
        widget.isResizable = function () { return false; };

        require(['widgets/brease/TabItem/libs/EditorHandles'], function (EditorHandles) {
            var editorHandles = new EditorHandles(widget);
            widget.getHandles = function () {
                return editorHandles.getHandles();
            };
            widget.designer.getSelectionDecoratables = function () {
                return widget.el;
            };
        });
    };

    function updateText(text) {
        if (this.textEl === undefined) {
            this._appendTextEl();
        }
        this.textEl.text(text);
        this._setClasses();
    }

    return dragAndDropCapability.decorate(languageDependency.decorate(WidgetClass, false), false);

});
