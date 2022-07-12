define(['brease/core/BaseWidget',
    'brease/decorators/LanguageDependency',
    'brease/decorators/VisibilityDependency',
    'brease/enum/Enum',
    'brease/core/Types',
    'brease/helper/Scroller',
    'brease/events/BreaseEvent',
    'brease/decorators/DragAndDropCapability',
    'widgets/brease/common/DragDropProperties/libs/DraggablePropertiesEvents',
    'widgets/brease/common/DragDropProperties/libs/DroppablePropertiesEvents'
], function (SuperClass, languageDependency, visibilityDependency, Enum, Types, Scroller, BreaseEvent, dragAndDropCapability) {

    'use strict';

    /**
     * @class widgets.brease.Label
     * #Description
     * Widget for text output.  
     * Intended for use of language dependent labels.  
     * @breaseNote 
     * @extends brease.core.BaseWidget
     *
     * @mixins widgets.brease.common.DragDropProperties.libs.DraggablePropertiesEvents
     * @mixins widgets.brease.common.DragDropProperties.libs.DroppablePropertiesEvents
     *
     * @iatMeta category:Category
     * Text
     * @iatMeta description:short
     * Label
     * @iatMeta description:de
     * Widget zur Anzeige eines Textes
     * @iatMeta description:en
     * Widget to display a text
     */

    /**
     * @htmltag examples
     * ##Configuration examples: 
     *
     *     <label data-brease-widget="Label" id="Label1" data-brease-options="{'width':150, 'height':30}">static text</label>
     *
     */

    /**
     * @cfg {String} text (required)
     * @localizable
     * @iatStudioExposed
     * @iatCategory Appearance
     * Text displayed by the label
     */

    /**
     * @cfg {Boolean} ellipsis=false
     * @iatStudioExposed
     * @iatCategory Behavior 
     * If true, horizontal overflow of text is symbolized with an ellipsis.
     */

    /**
     * @cfg {Boolean} wordWrap=false
     * @iatStudioExposed
     * @iatCategory Behavior 
     * If true, text will wrap when necessary.
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
     * If true, more than one line is possible. Text will wrap when necessary (wordWrap=true) or at line breaks (\n).
     * If false, text will never wrap to the next line. The text continues on the same line.
     */

    /**
     * @cfg {Boolean} autoScroll=false
     * @iatStudioExposed
     * @iatCategory Behavior 
     * If true, scrolling is enabled
     */

    var defaultSettings = {
            ellipsis: false,
            wordWrap: false,
            multiLine: false,
            breakWord: false,
            text: '',
            autoScroll: false
        },

        WidgetClass = SuperClass.extend(function Label() {
            SuperClass.apply(this, arguments);
        }, defaultSettings),

        p = WidgetClass.prototype;

    p.init = function () {

        if (this.settings.omitClass !== true) {
            this.addInitialClass('breaseLabel');
        }
        if (this.settings.arrow === Enum.Position.left) {
            this.addInitialClass('arrow-left');
        }

        _appendTextEl(this);

        this.scroller = null;

        this.settings.ellipsis = Types.parseValue(this.settings.ellipsis, 'Boolean');
        this.settings.multiLine = Types.parseValue(this.settings.multiLine, 'Boolean');
        this.settings.wordWrap = Types.parseValue(this.settings.wordWrap, 'Boolean');

        _setClasses(this);
        this.setText(this.settings.text);
        SuperClass.prototype.init.apply(this, arguments);

        document.body.addEventListener(BreaseEvent.THEME_CHANGED, this._bind('themeChangeHandler'));
    };
    
    p._onStylePropertiesChanged = function () {
        this.refreshScroller();
    };

    // override method called in BaseWidget.init
    p._initEditor = function () {
        var widget = this;
        this.elem.addEventListener(BreaseEvent.WIDGET_STYLE_PROPERTIES_CHANGED, this._bind('_onStylePropertiesChanged'));
        require(['widgets/brease/Label/libs/EditorHandles'], function (EditorHandles) {
            var editorHandles = new EditorHandles(widget);

            widget.getHandles = function () {
                return editorHandles.getHandles();
            };

            widget.isRotatable = function () {
                return editorHandles.isRotatable();
            };

            widget.designer.getSelectionDecoratables = function () {
                return editorHandles.getSelectionDecoratables();
            };
            widget.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_EDITOR_IF_READY, { bubbles: true }));
        });
    };

    p.wake = function () {
        SuperClass.prototype.wake.apply(this, arguments);
        document.body.addEventListener(BreaseEvent.THEME_CHANGED, this._bind('themeChangeHandler'));
    };

    p.suspend = function () {
        document.body.removeEventListener(BreaseEvent.THEME_CHANGED, this._bind('themeChangeHandler'));
        SuperClass.prototype.suspend.apply(this, arguments);
    };

    p._dispatchReady = function () {
        SuperClass.prototype._dispatchReady.call(this);
        this.addScroller();
    };

    p.themeChangeHandler = function () {
        this.refreshScroller();
    };

    p.langChangeHandler = function (e) {
        if (e === undefined || e.detail === undefined || e.detail.textkey === undefined || e.detail.textkey === this.settings.textkey) {
            if (this.settings.textkey !== null) {
                this.updateText(brease.language.getTextByKey(this.settings.textkey));
            }
        }
    };

    p.addScroller = function () {
        if (!this.scroller && this.settings.ellipsis === false && this.settings.autoScroll) {
            this.scroller = _createScroller(this);

            if (brease.config.editMode) {
                this.scroller.subsequentlyDisableTouch();
                this.scroller.subsequentlyDisableMouse();
            }

            this.setVisibilityDependency(true);

        }
        this.refreshScroller();
    };

    p.destroyScroller = function () {
        _setVerticalAlignClass(this);
        if (this.scroller) {
            this.scroller.destroy();
            this.scroller = null;
        }
    };

    p.refreshScroller = function () {
        if (this.scroller) {
            this.scroller.refresh();
        }
        _setVerticalAlignClass(this);
    };

    /**
    * @method setText
    * @iatStudioExposed
    * sets the visible text
    * @param {String} text The new text
    * @paramMeta text:localizable=true
    */
    p.setText = function (text) {
        if (text !== undefined) {
            if (brease.language.isKey(text) === false) {
                this.updateText(text);
                this.removeTextKey();
            } else {
                this.setTextKey(brease.language.parseKey(text));
            }
        }
    };

    /**
     * @method getText
     * gets the visible text
     * @return {String} text
     */
    p.getText = function () {
        return this.settings.text;
    };

    /**
     * @method updateText
     * Updates the settings object and DOM element
     */
    p.updateText = function (text) {
        if (text !== null) {
            this.settings.text = Types.parseValue(text, 'String');
            if (this.settings.multiLine) {
                // used for backwards compatibility browser will replace \n with <br/>
                // see https://html.spec.whatwg.org/multipage/dom.html#the-innertext-idl-attribute
                this.textEl.get(0).innerText = brease.language.unescapeText(this.settings.text);
            } else {
                // jQuery.text() uses textContent attribute internally
                this.textEl.text(brease.language.unescapeText(this.settings.text));
            }
        }
        this.refreshScroller();
    };

    /**
     * @method setTextKey
     * set the textkey
     * @param {String} key The new textkey
     */
    p.setTextKey = function (key) {
        //console.debug(WidgetClass.name + '[id=' + this.elem.id + '].setTextKey:', key);
        if (key !== undefined) {
            this.settings.textkey = key;
            this.updateText(brease.language.getTextByKey(this.settings.textkey));
            this.setLangDependency(true);
            return this.getText(); 
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
     * @method getTextKey
     * get the textkey
     */
    p.getTextKey = function () {
        return this.settings.textkey;
    };

    /**
     * @method setEllipsis
     * Sets ellipsis
     * @param {Boolean} ellipsis
     */
    p.setEllipsis = function (ellipsis) {
        this.settings.ellipsis = Types.parseValue(ellipsis, 'Boolean');
        _setClasses(this);

        if (this.settings.ellipsis) {
            this.destroyScroller();
        } else {
            this.addScroller();
        }
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
        // For review: The next line makes no sense, because the value gets overriden by the line next to it, right? Should we remove this line?)
        this.settings.wordWrap = Types.parseValue(this.settings.wordWrap, 'Boolean');
        this.settings.wordWrap = wordWrap;
        _setClasses(this);
        this.refreshScroller();
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
     * @method setBreakWord
     * Sets breakWord
     * @param {Boolean} breakWord
     */
    p.setBreakWord = function (breakWord) {
        this.settings.breakWord = breakWord;
        _setClasses(this);
        this.refreshScroller();
    };

    /**
     * @method getBreakWord 
     * Returns breakWord.
     * @return {Boolean}
     */
    p.getBreakWord = function () {
        return this.settings.breakWord;
    };

    /**
     * @method setMultiLine
     * Sets multiLine
     * @param {Boolean} multiLine
     */
    p.setMultiLine = function (multiLine) {
        // For review: The next line makes no sense, because the value gets overriden by the line next to it, right? Should we remove this line?)
        this.settings.multiLine = Types.parseValue(this.settings.multiLine, 'Boolean');
        this.settings.multiLine = multiLine;
        _setClasses(this);
        this.updateText(this.settings.text);
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
     * @method setAutoScroll
     * Enable / disable scrolling
     * @param {Boolean} value
     */
    p.setAutoScroll = function (value) {
        this.settings.autoScroll = value;
        if (value) {
            this.addScroller();
        } else {
            this.destroyScroller();
        }
    };

    /**
     * @method getAutoScroll
     * Returns, if scrolling is enabled
     * @return {Boolean}
     */
    p.getAutoScroll = function () {
        return this.settings.autoScroll;
    };

    p._visibleHandler = function () {
        if (this.isVisible()) {
            this.refreshScroller();
        }
    };

    p.dispose = function () {
        document.body.removeEventListener(BreaseEvent.THEME_CHANGED, this._bind('themeChangeHandler'));

        this.destroyScroller();

        SuperClass.prototype.dispose.apply(this, arguments);
    };

    function _createScroller(widget) {
        var options = {
            mouseWheel: true,
            scrollX: true,
            scrollY: true
        };

        return Scroller.addScrollbars(widget.elem, options);
    }

    function _appendTextEl(widget) {
        widget.textEl = $('<span></span>');
        if (widget.elem.textContent) {
            widget.settings.text = widget.elem.textContent;
            widget.el.contents().wrap(widget.textEl);
        } else {
            widget.el.html(widget.textEl);
        }
    }

    function _setClasses(widget) {

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

    function _setVerticalAlignClass(widget) {
        if (widget.settings.ellipsis === false && widget.settings.autoScroll &&
                widget.scroller && widget.scroller.hasVerticalScroll) {
            widget.el.addClass('scrollable');
        } else {
            widget.el.removeClass('scrollable');
        }
    }

    return dragAndDropCapability.decorate(visibilityDependency.decorate(languageDependency.decorate(WidgetClass, false), false), false);

});
