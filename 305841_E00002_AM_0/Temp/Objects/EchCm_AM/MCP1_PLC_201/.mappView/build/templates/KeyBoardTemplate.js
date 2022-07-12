define(['system/widgets/KeyBoard/KeyBoard',
    'brease/events/BreaseEvent',
    'brease/controller/KeyboardManager',
    'system/widgets/KeyBoard/libs/KeyCollector',
    'system/widgets/KeyBoard/libs/InputProcessor',
    'system/widgets/KeyBoard/libs/InputValidator',
    'system/widgets/KeyBoard/libs/FocusManager',
    'system/widgets/KeyBoard/libs/Composer',
    'system/widgets/KeyBoard/libs/Converter',
    'brease/events/EventDispatcher',
    'system/widgets/common/keyboards/AutoSize',
    'system/widgets/common/keyboards/KeyboardType',
    'brease/controller/ZoomManager',
    'brease/enum/Enum',
    'brease/helper/Scroller'
], function (SuperClass,
    BreaseEvent,
    keyboardManager,
    KeyCollector,
    InputProcessor,
    InputValidator,
    FocusManager,
    Composer,
    Converter,
    EventDispatcher,
    AutoSize,
    KeyboardType,
    zoomManager,
    Enum,
    Scroller) {

    'use strict';

    /**
    * @class widgets.__WIDGET_LIBRARY__.__WIDGET_NAME__
    * #Description
    *     
    * @breaseNote
    * @extends system.widgets.KeyBoard
    *
    * @iatMeta category:Category
    * Keyboards
    * @iatMeta description:short
    * Custom keyboard
    * @iatMeta description:de
    * Custom keyboard
    * @iatMeta description:en
    * Custom keyboard
    */

    var defaultSettings = {
            html: 'widgets/__WIDGET_LIBRARY__/__WIDGET_NAME__/__WIDGET_NAME__.html',
            stylePrefix: 'widgets___WIDGET_LIBRARY_____WIDGET_NAME__',
            width: __WIDTH__,
            height: __HEIGHT__,
            scale2fit: true
        },
        elemSelector = '.breaseKeyboardHeader:not(.remove),section:not(.remove),.ValueOutput:not(.remove),.ValueButton:not(.remove),.ActionButton:not(.remove),.ActionImage:not(.remove),label:not(.remove),.nodeInfo:not(.remove),.breaseLayoutSelector:not(.remove),.breaseIME:not(.remove)',
        WidgetClass = SuperClass.extend(function __WIDGET_NAME__(elem, options, deferredInit, inherited) {
            if (inherited === true) {
                SuperClass.call(this, null, null, true, true);
                _loadHTML(this);
            } else {
                if (instance === undefined) {
                    SuperClass.call(this, null, null, true, true);
                    _loadHTML(this);
                    instance = this;
                } else {
                    return instance;
                }
            }
        }, defaultSettings),
        instance,
        p = WidgetClass.prototype;

    p.init = function () {
        this.focusManager = new FocusManager();
        this.inputProcessor = new InputProcessor();
        this.keyCollector = new KeyCollector();
        this.inputValidator = new InputValidator();
        this.composer = new Composer();
        this.converter = new Converter();
        document.body.addEventListener(BreaseEvent.APP_RESIZE, this._bind(_onAppResize));
        SuperClass.prototype.init.apply(this, arguments);
    };
    p.getValue = function () {
        return this.inputValidator.getValue();
    };

    p.validate = function (value) {
        return this.inputValidator.validate(value);
    };

    p.show = function (options, refElement) {
        SuperClass.prototype.show.call(this, options, refElement);
        this.closeOnLostContent(refElement);
        this.inputProcessor.setOptions(options);
        this.eventDispatcher.dispatchEvent({
            type: 'Collector.Set',
            detail: {
                'value': this.settings.text
            }
        });
        this.inputValidator.setRestriction(this.settings.restrict);
        this.inputValidator.setMaxLength(this.settings.maxLength);
        this.eventDispatcher.dispatchEvent({
            type: 'Keyboard.Show'
        });
    };

    p.hide = function () {
        SuperClass.prototype.hide.apply(this, arguments);
        keyboardManager.getLayoutSelector().close();
        this.eventDispatcher.dispatchEvent({
            type: 'Keyboard.Hide'
        });
    };
    p.dispose = function () {
        document.body.removeEventListener(BreaseEvent.APP_RESIZE, this._bind(_onAppResize));
        if (this.eventDispatcher) {
            this.eventDispatcher.removeEventListener('Processor.Submit', this._bind(_onSubmit));
            this.eventDispatcher.removeEventListener('Collector.Close', this._bind(_onClose));
            this.eventDispatcher.removeEventListener('Converter.UpdateCandidates', this._bind(_onCandidatesUpdate));
        }
        this.focusManager.dispose();
        this.inputProcessor.dispose();
        this.keyCollector.dispose();
        this.inputValidator.dispose();
        this.composer.dispose();
        this.converter.dispose();
        if (this.scroller) {
            this.scroller.destroy();
        }
        SuperClass.prototype.dispose.apply(this, arguments);
        instance = undefined;
    };

    p._applyScale = function (factor) {
        var options = AutoSize.getOptions(KeyboardType.ALPHANUMERIC);
        if (options.autoSize === true) {
            var limits = AutoSize.getLimits(this.dimensions, options),
                appZoom = zoomManager.getAppZoom();

            factor = AutoSize.range(appZoom, limits.min, limits.max);
        }
        SuperClass.prototype._applyScale.call(this, factor);
    };

    p.getElemExtension = function (boundingRect, style) {
        if (!this.elemExtension) {
            this.elemExtension = {};
        }

        if (!this.elemExtension[style]) {
            var ext = { left: 0, right: 0, top: 0, bottom: 0 };

            this.el.find(elemSelector).each(function (index, elem) {
                var rect = elem.getBoundingClientRect(),
                    diffBottom = rect.bottom - boundingRect.bottom,
                    diffTop = boundingRect.top - rect.top,
                    diffLeft = boundingRect.left - rect.left,
                    diffRight = rect.right - boundingRect.right;

                if (diffBottom > ext.bottom) {
                    ext.bottom = diffBottom;
                }
                if (diffTop > ext.top) {
                    ext.top = diffTop;
                }
                if (diffLeft > ext.left) {
                    ext.left = diffLeft;
                }
                if (diffRight > ext.right) {
                    ext.right = diffRight;
                }
            });
            this.elemExtension[style] = ext;
        }
        return this.elemExtension[style];
    };
    function _loadHTML(widget) {
        require(['text!' + widget.settings.html], function (html) {
            widget.deferredInit(document.body, html, true);
            _appendLayoutSelector(widget);
            widget.inputEl = widget.el.find('.ValueOutput');
            widget.inputElem = widget.inputEl.get(0);
            if (brease.config.detection.mobile === false) {
                widget.inputElem.removeAttribute('readonly');
            }
            widget.eventDispatcher = new EventDispatcher();
            widget.eventDispatcher.addEventListener('Processor.Submit', widget._bind(_onSubmit));
            widget.eventDispatcher.addEventListener('Collector.Close', widget._bind(_onClose));
            widget.eventDispatcher.addEventListener('Converter.UpdateCandidates', widget._bind(_onCandidatesUpdate));
            _initKeyChain.call(widget);
            widget.readyHandler();
        });
    }
    function _appendLayoutSelector(widget) {
        var layoutSelector = keyboardManager.getLayoutSelector().el,
            targetContainer = widget.el.find('.breaseLayoutSelector');
        if (targetContainer.length > 0) {
            layoutSelector.appendTo(targetContainer);
        }
    }
    function _onSubmit(e) {
        /**
        * @event value_submit
        * Fired after user clicks 'enter' to submit value    
        * @param {Object} detail current value
        * @param {String} type {@link brease.events.BreaseEvent#static-property-SUBMIT BreaseEvent.SUBMIT}
        * @param {HTMLElement} target element of widget
        */
        this.dispatchEvent(new CustomEvent(BreaseEvent.SUBMIT, { detail: e.detail.value }));
        this.hide();
    }

    function _onClose() {
        this.hide();
    }

    function _onAppResize() {
        if (this.settings.pointOfOrigin === Enum.PointOfOrigin.WINDOW) {
            this.elemExtension = {};
        }
    }
    var candidateElem = document.createElement('LI');
    candidateElem.classList.add('breaeIMECandidate');
    function _onCandidatesUpdate(e) {
        var candidates = e.detail && Array.isArray(e.detail.candidates) ? e.detail.candidates : [],
            query = e.detail && Array.isArray(e.detail.query) ? e.detail.query : [],
            imeEl = this.el.find('.breaseIME'),
            olEl = imeEl.children('ol').detach(),
            olElem = olEl.get(0),
            clone;
        olEl.children('.breaeIMECandidate').remove();
        query.forEach(function (item) {
            clone = candidateElem.cloneNode(true);
            clone.innerText = item;
            clone.style = 'display: inline; padding: 0 1em;';
            olElem.appendChild(clone);
        });
        candidates.forEach(function (candidate) {
            clone = candidateElem.cloneNode(true);
            clone.innerText = candidate;
            olElem.appendChild(clone);
        });

        if (e.detail.first) {
            this.el.find('[data-action="ime-prev-candidates"]').addClass('remove');
        } else {
            this.el.find('[data-action="ime-prev-candidates"]').removeClass('remove');
        }

        imeEl.append(olElem);
        if (candidates.length === 0 && query.length === 0) {
            imeEl.addClass('remove');
        } else {
            imeEl.removeClass('remove');
        }

        if (e.detail.last) {
            this.el.find('[data-action="ime-next-candidates"]').addClass('remove');
        } else {
            this.el.find('[data-action="ime-next-candidates"]').removeClass('remove');
        }
        if (typeof this.refresh === 'function') {
            this.refresh();
        }

    }

    function _initKeyChain() {
        var imeMode = _getImeMode.call(this);
        this.keyCollector.init(this.eventDispatcher, this);
        var cursor = {};
        this.focusManager.init(this.eventDispatcher, this, cursor);
        this.inputValidator.init(this.eventDispatcher, this);
        this.composer.init(this.eventDispatcher);
        this.composer.setMode(imeMode);
        this.converter.init(this.eventDispatcher);
        this.converter.setMode(imeMode);
        this.inputProcessor.init(this.eventDispatcher, this, cursor);
        if (_hasIME.call(this)) {
            _initIME.call(this);
        }
    }

    function _getImeMode() {
        var mode = this.el.find('.breaseIME').attr('data-brease-lang');
        mode = typeof mode === 'string' ? mode.toLowerCase() : Enum.IMEMode.DISABLED;
        return mode;
    }

    function _hasIME() {
        return this.el.find('.breaseIME').length > 0;
    }

    function _refresh() {
        if (this.scroller) {
            this.scroller.refresh();
        }
    }

    function _initIME() {
        var imeEl = this.el.find('.breaseIME'),
            listElem = document.createElement('OL');
        listElem.style = 'display: inline-flex; width: auto; height: 100%; align-items: center; padding: 0; margin: 0;';
        imeEl.css({ 'padding': 0, 'overflow': 'hidden' }).append(listElem);
        this.scroller = Scroller.addScrollbars(imeEl.get(0), {
            scrollY: false,
            scrollX: true,
            resizeScrollbars: true,
            scrollbars: true,
            fadeScrollbars: false
        });
        this.refresh = _.debounce(_refresh.bind(this), 100);
    }
    return WidgetClass;

});
