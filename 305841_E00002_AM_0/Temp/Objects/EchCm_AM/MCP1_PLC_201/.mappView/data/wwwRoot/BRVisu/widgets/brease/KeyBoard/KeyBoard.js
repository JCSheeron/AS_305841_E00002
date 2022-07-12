define([
    'system/widgets/KeyBoard/KeyBoard', 
    'brease/events/BreaseEvent', 
    'brease/core/Utils', 
    'brease/controller/PopUpManager', 
    'system/widgets/KeyBoard/libs/LayoutSelector',
    'widgets/brease/KeyBoard/libs/AboutDisplay'
], function (SuperClass, BreaseEvent, Utils, popupManager, LayoutSelector, AboutDisplay) {

    'use strict';

    /**
     * @class widgets.brease.KeyBoard
     * #Description
     * The Keyboard is an overlay, to provide a virtual alphanumeric keyboard.  
     * It opens in the context of a TextInput widget.      
     * @extends system.widgets.KeyBoard
     * @singleton
     *
     * @iatMeta studio:visible
     * false
     * @iatMeta category:Category
     * System
     * @iatMeta studio:createHelp
     * true
     * @iatMeta description:short
     * Keyboard zur Eingabe von Text
     * @iatMeta description:de
     * Keyboard zur Eingabe von Text
     * @iatMeta description:en
     * Keyboard for the input of text
     * @iatMeta description:ASHelp
     * The Keyboard widget can not be used in a content directly, but its possible to use styles for it.
     */

    /**
     * @method setEnable
     * @inheritdoc
     */

    /**
     * @method setVisible
     * @inheritdoc
     */

    /**
     * @method setStyle
     * @inheritdoc
     */

    /**
     * @event EnableChanged
     * @inheritdoc
     */

    /**
     * @event Click
     * @inheritdoc
     */
    
    /**
     * @event VisibleChanged
     * @inheritdoc
     */

    var defaultSettings = {
            layout: {
                default: 'widgets/brease/KeyBoard/assets/KeyBoardEn.html',
                en: 'widgets/brease/KeyBoard/assets/KeyBoardEn.html',
                de: 'widgets/brease/KeyBoard/assets/KeyBoardDe.html',
                es: 'widgets/brease/KeyBoard/assets/KeyBoardEs.html',
                fr: 'widgets/brease/KeyBoard/assets/KeyBoardFr.html',
                it: 'widgets/brease/KeyBoard/assets/KeyBoardIt.html',
                nl: 'widgets/brease/KeyBoard/assets/KeyBoardNl.html',
                ar: 'widgets/brease/KeyBoard/assets/KeyBoardAr.html',
                ar_en: 'widgets/brease/KeyBoard/assets/KeyBoardArEn.html',
                bg: 'widgets/brease/KeyBoard/assets/KeyBoardBg.html',
                bg_en: 'widgets/brease/KeyBoard/assets/KeyBoardBgEn.html',
                cs: 'widgets/brease/KeyBoard/assets/KeyBoardCs.html',
                da: 'widgets/brease/KeyBoard/assets/KeyBoardDa.html',
                fi: 'widgets/brease/KeyBoard/assets/KeyBoardFi.html',
                hu: 'widgets/brease/KeyBoard/assets/KeyBoardHu.html',
                ja: 'widgets/brease/KeyBoard/assets/KeyBoardJa.html',
                ja_en: 'widgets/brease/KeyBoard/assets/KeyBoardJaEn.html',
                ko: 'widgets/brease/KeyBoard/assets/KeyBoardKo.html',
                ko_en: 'widgets/brease/KeyBoard/assets/KeyBoardKoEn.html',
                no: 'widgets/brease/KeyBoard/assets/KeyBoardNo.html',
                pl: 'widgets/brease/KeyBoard/assets/KeyBoardPl.html',
                pt: 'widgets/brease/KeyBoard/assets/KeyBoardPt.html',
                ru: 'widgets/brease/KeyBoard/assets/KeyBoardRu.html',
                ru_en: 'widgets/brease/KeyBoard/assets/KeyBoardRuEn.html',
                sk: 'widgets/brease/KeyBoard/assets/KeyBoardSk.html',
                sl: 'widgets/brease/KeyBoard/assets/KeyBoardSl.html',
                sv: 'widgets/brease/KeyBoard/assets/KeyBoardSv.html',
                tr: 'widgets/brease/KeyBoard/assets/KeyBoardEn.html',
                zh: 'widgets/brease/KeyBoard/assets/KeyBoardZh.html',
                zh_en: 'widgets/brease/KeyBoard/assets/KeyBoardZhEn.html',
                ro: 'widgets/brease/KeyBoard/assets/KeyBoardRo.html',
                lv: 'widgets/brease/KeyBoard/assets/KeyBoardLv.html',
                sr: 'widgets/brease/KeyBoard/assets/KeyBoardSr.html',
                he: 'widgets/brease/KeyBoard/assets/KeyBoardHe.html',
                he_en: 'widgets/brease/KeyBoard/assets/KeyBoardHeEn.html',
                hr: 'widgets/brease/KeyBoard/assets/KeyBoardHr.html',
                ca: 'widgets/brease/KeyBoard/assets/KeyBoardCa.html',
                is: 'widgets/brease/KeyBoard/assets/KeyBoardIs.html',
                vi: 'widgets/brease/KeyBoard/assets/KeyBoardVi.html',
                'zh-CHS': 'widgets/brease/KeyBoard/assets/KeyBoardZhCHS.html',
                'zh-CHS_en': 'widgets/brease/KeyBoard/assets/KeyBoardZhCHS_en.html'
            },
            modal: true,
            showCloseButton: true,
            showShiftValues: true,
            forceInteraction: false,
            capsLock: false,
            alternativeLayouts: {
                ar: { ar: { index: 0, description: 'العربية' }, ar_en: { index: 1, description: 'English' } },
                ar_en: { ar: { index: 0, description: 'العربية' }, ar_en: { index: 1, description: 'English' } },
                bg: { bg: { index: 0, description: 'български' }, bg_en: { index: 1, description: 'English' } },
                bg_en: { bg: { index: 0, description: 'български' }, bg_en: { index: 1, description: 'English' } },
                he: { he: { index: 0, description: 'עברית' }, he_en: { index: 1, description: 'English' } },
                he_en: { he: { index: 0, description: 'עברית' }, he_en: { index: 1, description: 'English' } },
                ja: { ja: { index: 0, description: '日本語' }, ja_en: { index: 1, description: 'English' } },
                ja_en: { ja: { index: 0, description: '日本語' }, ja_en: { index: 1, description: 'English' } },
                ko: { ko: { index: 0, description: '한국어' }, ko_en: { index: 1, description: 'English' } },
                ko_en: { ko: { index: 0, description: '한국어' }, ko_en: { index: 1, description: 'English' } },
                ru: { ru: { index: 0, description: 'русский' }, ru_en: { index: 1, description: 'English' } },
                ru_en: { ru: { index: 0, description: 'русский' }, ru_en: { index: 1, description: 'English' } },
                zh: { zh: { index: 0, description: '中文' }, zh_en: { index: 1, description: 'English' } },
                zh_en: { zh: { index: 0, description: '中文' }, zh_en: { index: 1, description: 'English' } },
                'zh-CHS': { 'zh-CHS': { index: 0, description: '中文' }, 'zh-CHS_en': { index: 1, description: 'English' } },
                'zh-CHS_en': { 'zh-CHS': { index: 0, description: '中文' }, 'zh-CHS_en': { index: 1, description: 'English' } }
            },
            plugin: {
                zh: 'widgets/brease/KeyBoard/libs/external/PluginPinyin',
                ko: 'widgets/brease/KeyBoard/libs/external/PluginHangul',
                ja: 'widgets/brease/KeyBoard/libs/external/PluginWanaKana',
                'zh-CHS': 'widgets/brease/KeyBoard/libs/external/PluginZhCHS',
                es: 'widgets/brease/KeyBoard/libs/external/PluginEs',
                ca: 'widgets/brease/KeyBoard/libs/external/PluginEs',
                pt: 'widgets/brease/KeyBoard/libs/external/PluginEs'
            },
            stylePrefix: 'widgets_brease_KeyBoard',
            scale2fit: true // zoom widget, if it exceeds the display (=screen)
        },

        /*
     * Layer 1: small caps
     * Layer 2: caps
     * Layer 3: special
     */
        currentLayer = 1,
        instance,

        WidgetClass = SuperClass.extend(function KeyBoard(elem, options, deferredInit, inherited) {  
            var self = this;              
            if (inherited === true) {
                SuperClass.call(this, null, options || null, true, true);
                _loadHTML(this);
            } else {
                if (instance === undefined) {
                    SuperClass.call(this, null, options || null, true, true);
                    _loadHTML(this);
                    instance = self;
                } else {
                    if (this.output) {
                        instance.setValue('');
                    }
                    instance.settings = $.extend(true, {}, instance.settings, options); 
                    return instance;
                }
            }
        }, defaultSettings),

        p = WidgetClass.prototype;

    p.init = function () {

        if (this.settings.omitClass !== true) {
            this.addInitialClass('breaseKeyBoard');
        }
        this.settings.windowType = 'KeyBoard';
        SuperClass.prototype.init.call(this, true);
        this.value = '';
        this.getElements();
        this.aboutDisplay = new AboutDisplay();
        this.aboutDisplay.init(this.el);

        if (brease.config.detection.mobile === false) {
            this.output[0].removeAttribute('readonly');
        }
        this.loadPlugin();
    };

    p.getElements = function () {
        this.output = this.el.find('input');
        this.clear = this.el.find('.keyBoardBtnClear');
        this.valueButtons = this.el.find('button[data-value]');
        this.actionButtons = this.el.find('button[data-action]');
        this.shift = this.el.find('[data-action=shift]');
        this.special = this.el.find('[data-action=special]');
    };

    p.getCursor = function () {
        return _getCursor.call(this);
    };

    p.setCursor = function (index) {
        _setCursor.call(this, index);
    };

    p.setValue = function (value, avoidSetField, avoidFocus) {
        this.value = value || '';
        if (this.value !== '') {
            this.clear.show();
        } else {
            this.clear.hide();
        }

        if (avoidSetField !== true) {
            this.output.val(this.value);
        }
        if (avoidFocus !== true) {
            _setFocus.call(this);
        }
    };

    function _setFocus() {
        var pos = this.cursor;
        
        // correct order: first the focus, then the cursor (setSelectionRange)
        this.output.focus();
        this.output[0].setSelectionRange(pos, pos); 
    }
    
    function _setInitialFocus() { 
        var instance = this,
            pos = this.output[0].value.length;
        this.cursor = pos;
        // following delay of setSelectionRange is due to the behavior of iPad
        // order is as in setFocus: first the focus, then the cursor (setSelectionRange)
        this.output.one('focusin', function () {
            instance.output[0].setSelectionRange(pos, pos);
        });
        this.output.focus();
    }

    p.showPlugin = function (deleteFlag) {

        if (this.plugin !== undefined) {
            if (deleteFlag === true) {
                this.plugin.onDelete(this.value, _getCursor.call(this));
            } else {
                this.plugin.onInput(this.value, _getCursor.call(this));
            }
        }
    };

    p.getPluginItems = function () {
        if (this.plugin && typeof this.plugin.getItems === 'function') {
            return this.plugin.getItems();
        } else {
            return [];
        }
    };

    /**
     * @method getValue
     * returns the actual value  
     * @return {String} value
     */
    p.getValue = function () {
        return this.value;
    };

    /**
     * @method show
     * Method to show keyboard
     * @param {brease.objects.KeyboardOptions} options
     * @param {HTMLElement} refElement Either HTML element of opener widget or any HTML element for relative positioning.
     */
    p.show = function (options, refElement) {
        var self = this;
        if (this.eventsAttached !== true) {
            _addEventListeners.call(this);
        }
        this._setLayout();
        this.options = $.extend(true, {}, options);
        SuperClass.prototype.show.call(this, options, refElement);
        this.setAlternativeLayouts(this.settings.alternativeLayouts);
        this.closeOnLostContent(refElement);
        if (options.type !== undefined) {
            this.output.attr('type', options.type);
        }
        if (options.maxLength !== undefined) {
            this.output.attr('maxlength', parseInt(options.maxLength, 10));
        } else {
            this.output.removeAttr('maxlength');
        }
        this.setValue(this.settings.text, false, true);
        if (this.plugin !== undefined) {
            this.plugin.show();
        }
        if (this.settings.restrict !== undefined) {
            this.settings.regexp = new RegExp(this.settings.restrict);
        } else {
            this.settings.regexp = undefined;
        }
        
        this.output.one('focusout', function () {
            _setFocus.call(self);
        });
        _setInitialFocus.call(self);
    };

    /**
     * @method hide
     * hides Keyboard  
     */
    p.hide = function () {
        if (this.eventsAttached === true) {
            _removeEventListeners.call(this);
        }
        if (currentLayer !== 1) {
            _switchKeyLayer.call(this, 1);
        }
        SuperClass.prototype.hide.call(this);
        if (this.plugin !== undefined) {
            this.plugin.hide();
        }
        this.el.removeClass('keyBoardSm keyBoardMd keyBoardFull');

    };

    p.langChangeHandler = function () {
        // overwritten langChangeHandler of SuperClass, as we don't need behaviour of SuperClass
        var lang = brease.language.getCurrentLanguage();
        this.settings.language = lang;
        if (this.selector) {
            this.selector.setCurrentLayout(this.settings.language);
        }
        this.loadLayout();
    };

    /**
     * @method loadPlugin
     * loads a language Plugin depending on the actual language  
     */
    p.loadPlugin = function () {

        var path = this.settings.plugin[this.settings.language],
            self = this;

        if (path !== undefined) {
            if (this.plugin !== undefined) {
                this.plugin.dispose();
            }
            require([path], function (Plugin) {
                self.plugin = Plugin;
                self.pluginReady();
            });
        } else {
            this.plugin = undefined;
            this.pluginReady();
        }

    };

    /**
     * @method pluginReady
     * indicates that the keyboard plugin has finished loading
     */
    p.pluginReady = function () {
        if (this.plugin) {
            this.plugin.init(this);
            this.dispatchEvent(new CustomEvent(BreaseEvent.PLUGIN_LOADED, { bubbles: true }));
        }
    };

    /**
     * @method loadLayout
     * loads a keyboard layout depending on the actual language  
     */
    p.loadLayout = function () {

        var lang = this.settings.language,
            path = this.settings.layout[lang];

        if (path === undefined) {
            path = this.settings.layout.default;
        }
        if (path !== undefined && path !== this.settings.html) {
            this.settings.html = path;
            _loadHTMLLayout(this);
            this.hide();
        } else {
            var self = this;
            window.setTimeout(function () {
                self.loadPlugin();
                self._dispatchReady();
            }, 0);
        }

    };

    /**
     * @method setAlternativeLayouts
     * loads a keyboard layout depending on the actual language  
     */
    p.setAlternativeLayouts = function (alternativeLayouts) {
        this.settings.alternativeLayouts = alternativeLayouts;
        if (!this.selector) {
            this.selector = new LayoutSelector();
            this.selector.setCurrentLayout(this.settings.language);
            this.selector.init(this._bind(_selectLayout), this.settings.alternativeLayouts[this.settings.language]);
        }
        this.selector.setItems(this.settings.alternativeLayouts[this.settings.language]);
        //this.selector.setButtonText(this.settings.language);
        if (this.selector.getItems().length > 0) {
            if (this.el.find('.alt-lt-Wrapper').length > 0) {
                this.selector.el.appendTo(this.el.find('.alt-lt-Wrapper'));
            } else {
                this.el.append(this.selector.el);
            }
        }
    };

    p.dispose = function () {
        if (this.plugin) {
            this.plugin.dispose();
        }
        SuperClass.prototype.dispose.apply(this, arguments);
        instance = undefined;
    };

    /*
     * Private Methods
     */

    p._onValueButtonClick = function (e) {
        this._handleEvent(e, true); // don't remove: necessary for Samsung Tablet
            
        var target = $(e.currentTarget),
            value;

        //e.stopImmediatePropagation();
        switch (currentLayer) {

            case 1:
                value = target.attr('data-value');
                break;
            case 2:
                value = target.attr('data-shift-value');
                break;
            case 3:
                value = target.attr('data-special-value');
                break;
        }

        if (this.settings.maxLength !== undefined) {
            if (this.getValue().length >= this.settings.maxLength) {
                return;
            }
        }

        if (this.settings.regexp !== undefined) {
            var newVal = this.getValue() + value;
            for (var i = newVal.length - 1; i >= 0; i -= 1) {
                if (this.settings.regexp.test(newVal[i]) !== true) {
                    _setFocus.call(this);
                    return;
                }
            }
        }
        _addChar.call(this, value, _getCursor.call(this));
    };

    function _onButtonMouseDown(e) {
        //e.stopImmediatePropagation();
        if (this.activeButton) {
            Utils.removeClass(this.activeButton, 'active');
        }
        this.activeButton = e.currentTarget;
        Utils.addClass(this.activeButton, 'active');
        brease.docEl.on(BreaseEvent.MOUSE_UP, this._bind(_onButtonMouseUp));
    }

    function _onButtonMouseUp() {
        brease.docEl.off(BreaseEvent.MOUSE_UP, this._bind(_onButtonMouseUp));
        Utils.removeClass(this.activeButton, 'active');
        this.activeButton = undefined;
    }

    p._setLayout = function () {
        var dimensions = popupManager.getDimensions(),
            width = Math.min(dimensions.appWidth, dimensions.winWidth);

        if (width >= 1000) {
            this.el.addClass('keyBoardFull');
        } else if (width <= 640) {
            this.el.addClass('keyBoardSm');
        } else {
            this.el.addClass('keyBoardMd');
        }

    };

    p._onActionButtonClick = function (e) {
        this._handleEvent(e, true); // don't remove: necessary for Samsung Tablet
        var target = $(e.currentTarget),
            action = target.attr('data-action');

        switch (action) {

            case 'delete':
                _removeChar.call(this, _getCursor.call(this) - 1);
                break;
            case 'enter':
                _submitValue.call(this);
                break;
            case 'left':
                _cursorLeft.call(this);
                break;
            case 'right':
                _cursorRight.call(this);
                break;
            case 'shift':
                _onShift.call(this);
                break;
            case 'close':
                this.hide();
                break;
            case 'special':
                _onSpecial.call(this);
                break;
            default:
                console.iatWarn(WidgetClass.name + ' action not supported!');
                break;
        }
    };

    p._keyUpHandler = function (e) {
        if (e.which === 13) {
            _submitValue.call(this);
        } else {
            var newVal = this.output.val(),
                currentVal = this.getValue();
                
            if (newVal !== currentVal) {
                var filtered = '',
                    diff = newVal.length - currentVal.length;

                if (diff > 0) {
                    if (this.settings.regexp !== undefined) {
                        for (var i = 0, l = newVal.length; i < l; i += 1) {
                            if (this.settings.regexp.test(newVal[i]) === true) {
                                filtered += newVal[i];
                            }
                        }
                    } else {
                        filtered = newVal;
                    }
                    this.cursor = _getCursor.call(this) - (newVal.length - filtered.length);
                    this.setValue(filtered);
                } else {
                    this.setValue(newVal, true, true);
                }
                this.showPlugin(e.which === 8);
            }
        }
    };

    p._onClear = function (e) {
        this._handleEvent(e, true);
        this.setValue('');
        if (this.plugin && this.plugin.onClear) {
            this.plugin.onClear(this.value, _getCursor.call(this));
        }
    };

    p.postProcessHTML = function (html) {
        html = html.replace('<i class="icon-left"></i>', '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="12px" height="20px" viewBox="0 0 12 20" enable-background="new 0 0 12 20" xml:space="preserve"><path d="M0,8.569L12,0v3.931L3.336,10L12,16.069V20L0,11.431V8.569z"/></svg>');
        html = html.replace('<i class="icon-right"></i>', '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="12px" height="20px" viewBox="0 0 12 20" enable-background="new 0 0 12 20" xml:space="preserve"><path d="M12,11.431L0,20v-3.931L8.664,10L0,3.931V0l12,8.569V11.431z"/></svg>');
        html = html.replace('<i class="icon-down"></i>', '<svg version="1.1" class="icon-down" viewBox="0 0 38 31" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="m21.132 28.871-1.8234 2.3711-4.4449-6.2422h8.1362l1.0719-0.052352-1.1164 1.5524-1.8234 2.3711zm-2.1321-5.8711h-19v-23h38v23zm-0.5-2h12.5v-5h-25v5zm-6-7h2.5v-5h-5v5zm7 0h2.5v-5h-5v5zm7 0h2.5v-5h-5v5zm-18-7h2.5v-5h-5v5zm7 0h2.5v-5h-5v5zm7 0h2.5v-5h-5v5zm7 0h2.5v-5h-5v5z"/></svg>');
        html = html.replace('<i class="icon-delete">&times;</i>', '<svg class="icon-delete" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M44 6h-30c-1.38 0-2.47.7-3.19 1.76l-10.81 16.23 10.81 16.23c.72 1.06 1.81 1.78 3.19 1.78h30c2.21 0 4-1.79 4-4v-28c0-2.21-1.79-4-4-4zm-6 25.17l-2.83 2.83-7.17-7.17-7.17 7.17-2.83-2.83 7.17-7.17-7.17-7.17 2.83-2.83 7.17 7.17 7.17-7.17 2.83 2.83-7.17 7.17 7.17 7.17z"/></svg>');
        return html;
    };

    function _addEventListeners() {
        this.eventName = _getEventConfig(brease.config.virtualKeyboards);
        this.clear.on(this.eventName, this._bind('_onClear'));
        this.el.on(BreaseEvent.MOUSE_DOWN, 'button', this._bind(_onButtonMouseDown));
        this.el.on(this.eventName, 'button[data-value]', this._bind('_onValueButtonClick'));
        this.el.on(this.eventName, 'button[data-action]', this._bind('_onActionButtonClick'));
        this.output.on('keyup', this._bind('_keyUpHandler'));
        this.eventsAttached = true;
    }

    function _removeEventListeners() {
        if (this.selector) {
            this.selector.el.detach();
        }
        this.clear.off();
        this.el.off(BreaseEvent.MOUSE_DOWN, 'button', this._bind(_onButtonMouseDown));
        this.el.off(this.eventName, 'button[data-value]', this._bind('_onValueButtonClick'));
        this.el.off(this.eventName, 'button[data-action]', this._bind('_onActionButtonClick'));
        this.output.off();
        this.eventsAttached = false;
    }

    function _selectLayout(lang) {
        var path = this.settings.layout[lang],
            self = this;
        this.settings.language = lang;
        if (path === undefined) {
            path = this.settings.layout.default;
        } else if (self.selector) {
            self.selector.setCurrentLayout(lang);
        }

        if (path !== undefined && path !== this.settings.html) {
            this.settings.html = path;
            this.instanceSettings.html = path;
            self.options.value = self.value;
            self.options.text = self.value;
            this.instanceSettings.value = self.value;
            this.instanceSettings.text = self.value;
            _removeEventListeners.call(self);
            //widget.el.hide();
            if (this.plugin !== undefined) {
                this.plugin.dispose();
            }
            self.el.children(':not(.keyBoardHeader)').remove();
            require(['text!' + self.settings.html], function (html) {
                html = self.postProcessHTML(html);
                self.el.append($(html).children(':not(.keyBoardHeader)'));
                self.el.attr('data-lang', $(html).attr('data-lang'));
                self.getElements();
                self.aboutDisplay = new AboutDisplay();
                self.aboutDisplay.init(self.el);
                if (self.eventsAttached !== true) {
                    _addEventListeners.call(self);
                }
                if (brease.config.detection.mobile === false) {
                    self.output[0].removeAttribute('readonly');
                }
                //widget.el.show();
                self.setValue(self.value);
                self.loadPlugin();
                self.setAlternativeLayouts(self.settings.alternativeLayouts);
                _switchKeyLayer.call(self, 1);
            });
        }
    }
    // initial html-layout loading
    function _loadHTML(widget) {
        var currentLang = brease.language.getCurrentLanguage(),
            path = widget.settings.layout[currentLang];

        //widget.settings.showShiftValues = (currentLang === 'zh') ? true : false;
        widget.settings.language = currentLang;
        if (path === undefined) {
            path = widget.settings.layout.default;
        }
        widget.settings.html = path;

        require(['text!' + widget.settings.html], function (html) {
            html = widget.postProcessHTML(html);
            widget.deferredInit(document.body, html);
            _switchKeyLayer.call(widget, 1);
            widget.readyHandler(); // in SuperClass Window
        });
    }

    function _loadHTMLLayout(widget) {
        _removeEventListeners.call(widget);
        widget.aboutDisplay.dispose();
        widget.el.remove();

        require(['text!' + widget.settings.html], _loadHTMLLayout_responseHandler.bind(widget, widget.settings.html));
    }

    function _loadHTMLLayout_responseHandler(htmlPath, html) {
        if (instance && htmlPath === instance.settings.html) {
            html = instance.postProcessHTML(html);
            $('#breaseKeyBoard').remove();
            instance.el = $(html).prependTo(document.body);
            instance.elem = instance.el[0];
            window.setTimeout(function () {
                if (instance) {
                    instance._dispatchReady();
                }
            }, 0);
            instance.init();
            _switchKeyLayer.call(instance, 1);
        }
    }

    function _addChar(c, index) {
        this.value = this.value.slice(0, index) + c + this.value.slice(index);
        this.setValue(this.value);
        _setCursor.call(this, index + 1);
        this.showPlugin();
        if (currentLayer === 2 && !this.settings.capsLock) {
            _switchKeyLayer.call(this, 1);
        }
    }

    function _removeChar(index) {

        var value = this.value.substr(0, index) + this.value.substr(index + 1);
        this.setValue(value);
        _setCursor.call(this, index);
        if (this.plugin) {
            this.plugin.onDelete(this.value, _getCursor.call(this));
        }
    }

    function _parse(value) {
        return value.replace(/[\u00A0]/g, ' ');
    }

    function _submitValue() {
        /**
        * @event value_submit
        * Fired after user clicks 'enter' to submit value    
        * @param {Object} detail current value
        * @param {String} type {@link brease.events.BreaseEvent#static-property-SUBMIT BreaseEvent.SUBMIT}
        * @param {HTMLElement} target element of widget
        */
        this.dispatchEvent(new CustomEvent(BreaseEvent.SUBMIT, { detail: _parse(this.getValue()) }));
        this.output.trigger('blur');
        this.hide();
    }

    function _onShift() {

        if (currentLayer !== 2) {
            _switchKeyLayer.call(this, 2);
        } else if (currentLayer !== 1 && !this.settings.capsLock) {
            this.settings.capsLock = true;
            _switchKeyLayer.call(this, 2);
        } else if (this.settings.capsLock) {
            _switchKeyLayer.call(this, 1);
        }
    }

    function _onSpecial() {

        if (currentLayer !== 3) {
            _switchKeyLayer.call(this, 3);
        } else if (this.settings.capsLock) {
            _switchKeyLayer.call(this, 2);
        } else {
            _switchKeyLayer.call(this, 1);
        }
    }

    function _switchKeyLayer(layer) {

        var attr,
            value,
            shiftAttr,
            shiftValue,
            html,
            button;

        switch (layer) {

            case 1:
                attr = 'value';
                shiftAttr = 'shift-value';
                this.shift.removeClass('selected');
                this.special.removeClass('selected');
                this.settings.capsLock = false;
                break;
            case 2:
                attr = 'shift-value';
                shiftAttr = 'special-value';
                this.shift.addClass('selected');
                this.special.removeClass('selected');
                break;
            case 3:
                attr = 'special-value';
                shiftAttr = 'shift-value';
                this.special.addClass('selected');
                this.shift.removeClass('selected');
                break;
        }

        for (var i = 0; i < this.valueButtons.length; i += 1) {

            button = this.valueButtons.eq(i);
            value = button.data(attr);
            shiftValue = button.data(shiftAttr);
            html = ((value !== undefined) ? value : '') + ((this.settings.showShiftValues === true && attr === 'value') ? '<sub>' + ((shiftValue !== undefined) ? shiftValue : '') + '</sub>' : '');
            button.html(html);

        }

        currentLayer = layer;
    }

    function _cursorLeft() {
        _setCursor.call(this, _getCursor.call(this) - 1);
        this.output.focus();
    }

    function _cursorRight() {
        _setCursor.call(this, _getCursor.call(this) + 1);
        this.output.focus();
    }

    function _setCursor(cursor) {
        this.cursor = cursor;
        this.output.get(0).setSelectionRange(cursor, cursor);
    }

    function _getCursor() {
        return this.output.get(0).selectionStart;
    }

    function _getEventConfig(kbdConf) {
        if (!kbdConf) {
            return BreaseEvent.CLICK;
        }
        if (kbdConf.InputProcessing) {
            return kbdConf.InputProcessing.onKeyDown === true ? BreaseEvent.MOUSE_DOWN : BreaseEvent.CLICK;
        } else {
            return BreaseEvent.CLICK;
        }
    }

    return WidgetClass;

});
