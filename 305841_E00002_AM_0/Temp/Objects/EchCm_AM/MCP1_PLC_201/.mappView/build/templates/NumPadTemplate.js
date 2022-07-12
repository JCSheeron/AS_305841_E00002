define(['system/widgets/NumPad/NumPad',
    'brease/decorators/LanguageDependency',
    'brease/events/BreaseEvent',
    'system/widgets/common/keyboards/AutoSize',
    'system/widgets/common/keyboards/KeyboardType',
    'brease/controller/ZoomManager'],
function (SuperClass,
    languageDependency,
    BreaseEvent,
    AutoSize,
    KeyboardType,
    zoomManager) {

    'use strict';

    /**
        * @class widgets.__WIDGET_LIBRARY__.__WIDGET_NAME__
        * #Description
        *   
        * @breaseNote
        * @extends system.widgets.NumPad
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
            showCloseButton: false,
            scale2fit: true
        },
        WidgetClass = SuperClass.extend(function __WIDGET_NAME__(elem, options, deferredInit, inherited) {
            if (inherited === true) {
                SuperClass.call(this, null, null, true, true);
                this.loadHTML();
            } else {
                if (instance === undefined) {
                    SuperClass.call(this, null, null, true, true);
                    this.loadHTML();
                    instance = this;
                } else {
                    return instance;
                }
            }
        }, defaultSettings),
        instance,

        p = WidgetClass.prototype;

    p.init = function () {
        document.body.addEventListener(BreaseEvent.THEME_CHANGED, this._bind('themeChangeHandler'));
        SuperClass.prototype.init.apply(this, arguments);
    };

    p.dispose = function () {
        document.body.removeEventListener(BreaseEvent.THEME_CHANGED, this._bind('themeChangeHandler'));
        SuperClass.prototype.dispose.apply(this, arguments);
        instance = undefined;
    };

    p.readyHandler = function () {
        this.setTexts();
        SuperClass.prototype.readyHandler.apply(this, arguments);
    };

    p.langChangeHandler = function () {
        this.setTexts();
    };

    p.themeChangeHandler = function () {
        this.elemExtension = {};
    };

    p.setTexts = function () {
        var widget = this;
        if (!this.arText) {
            this.arText = [];
            this.el.find('[data-display]').each(function () {
                var $el = $(this),
                    display = $el.data('display'),
                    $textEl = ($el.hasClass('display')) ? $el : $el.find('.display');
                if (brease.language.isKey(display) === true) {
                    var item = {
                        key: brease.language.parseKey(display),
                        textEl: $textEl
                    };
                    widget.arText.push(item);
                }
            });
        }
        this.arText.forEach(function (item) {
            item.textEl.text(brease.language.getTextByKey(item.key));
        });
    };

    p.getElemExtension = function (boundingRect, style) {
        if (!this.elemExtension) {
            this.elemExtension = {};
        }

        if (!this.elemExtension[style]) {
            var ext = { left: 0, right: 0, top: 0, bottom: 0 };

            this.el.find('div,button').each(function (index, elem) {
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

    p._applyScale = function (factor) {
        var options = AutoSize.getOptions(KeyboardType.NUMERIC);
        if (options.autoSize === true) {
            var limits = AutoSize.getLimits(this.dimensions, options),
                appZoom = zoomManager.getAppZoom();

            factor = AutoSize.range(appZoom, limits.min, limits.max);

        }
        SuperClass.prototype._applyScale.call(this, factor);
    };

    return languageDependency.decorate(WidgetClass, true);

});
