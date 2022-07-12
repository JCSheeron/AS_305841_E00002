define(['system/widgets/NumPad/NumPad', 'brease/enum/Enum', 'brease/core/Utils'],
    function (SuperClass, Enum, Utils) {
        
        'use strict';

        /**
        * @class widgets.brease.NumPad
        * #Description
        * The NumPad is an overlay, to provide a virtual numeric keyboard.  
        * It opens in the context of a NumericInput widget.  
        * @extends system.widgets.NumPad
        * @singleton
        *
        * @iatMeta studio:visible
        * false
        * @iatMeta category:Category
        * System
        * @iatMeta studio:createHelp
        * true
        * @iatMeta description:short
        * NumPad zur Eingabe numerischer Werte
        * @iatMeta description:de
        * NumPad zur Eingabe numerischer Werte
        * @iatMeta description:en
        * NumPad for the input of numeric values
        * @iatMeta description:ASHelp
        * The NumPad widget can not be used in a content directly, but its possible to use styles for it.
        */

        /**
        * @cfg {brease.enum.LimitViolationPolicy} limitViolationPolicy='noSubmit'
        * Controls behaviour of NumPad in case of a limit violation.   
        */
        var defaultSettings = {
                html: 'widgets/brease/NumPad/NumPad.html',
                stylePrefix: 'widgets_brease_NumPad',
                limitViolationPolicy: Enum.LimitViolationPolicy.NO_SUBMIT,
                format: { default: { decimalPlaces: 1, minimumIntegerDigits: 1 } },
                width: 354,
                arrow: {
                    show: true,
                    position: 'left',
                    width: 12
                },
                positionOffset: 5,
                modal: true,
                showCloseButton: true,
                scale2fit: true, // zoom widget, if it exceeds the display (=screen)
                precision: 6,
                maxBtnMargin: 20
            }, instance,

            /**
        * @method setEnable
        * @inheritdoc
        */
            /**
        * @method setVisible
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
            WidgetClass = SuperClass.extend(function NumPad(elem, options, deferredInit, inherited) {
                var self = this;
                if (inherited === true) {
                    SuperClass.call(this, null, null, true, true);
                    this.loadHTML(this);
                } else {
                    if (instance === undefined) {
                        SuperClass.call(this, null, null, true, true);
                        this.loadHTML(this);
                        instance = self;
                    } else {
                        return instance;
                    }
                }
            }, defaultSettings),

            p = WidgetClass.prototype;

        p.init = function () {
            this.btnsInARow = 4;
            SuperClass.prototype.init.apply(this, arguments);
        };

        p.dispose = function () {
            SuperClass.prototype.dispose.apply(this, arguments);
            instance = undefined;
        };

        p._afterCalculationHook = function () {
            _setStylingsAccordingToStyleableProperties(this);
        };

        p.hide = function () {
            _resetStyles.call(this);
            SuperClass.prototype.hide.apply(this, arguments);
        };

        p.show = function () {
            SuperClass.prototype.show.apply(this, arguments);
            _setComma.call(this, this.settings.separators);
        };

        function _setComma(separators) {
            var commaBtn = this.buttons.get('comma');
            if (commaBtn && separators && Utils.isString(separators.dsp)) {
                commaBtn.html(separators.dsp);
            }
        }

        function _resetStyles() {
            var numpadHeader = this.el.find('.numpadHeader')[0];
            numpadHeader.style['borderTopLeftRadius'] = '';
            numpadHeader.style['borderTopRightRadius'] = '';

            var numpadWrapper = this.el.find('.numpadWrapper')[0];
            numpadWrapper.style['borderBottomLeftRadius'] = '';
            numpadWrapper.style['borderBottomRightRadius'] = '';
        }

        /*
        * Adapts the styling of the widget according to the settings made via stylable properties  
        * @param {widget} widget
        */
        function _setStylingsAccordingToStyleableProperties(widget) {
            var signButton = widget.buttons.get('sign');
            var btnMarginLeft = parseInt(signButton.css('margin-left'), 10);
            var btnMarginRight = parseInt(signButton.css('margin-right'), 10);
            var btnMarginTop = parseInt(signButton.css('margin-top'), 10);
            var btnMarginBottom = parseInt(signButton.css('margin-bottom'), 10);

            var btns = $('button', '.numpad .breaseNumPadButtons');
            var btnOuterWidth = btns.outerWidth();
            var btn0 = $('button[data-value="0"]', '.numpad .breaseNumPadButtons');
            var btnEnter = $('.breaseNumPadEnter', '.numpad .breaseNumPadButtons');

            if (btnMarginLeft !== 0 || btnMarginRight !== 0) {

                // limit possible margin to 30px
                if (btnMarginLeft >= widget.maxBtnMargin) {
                    btns.css('margin-left', widget.maxBtnMargin + 'px');
                    btnMarginLeft = widget.maxBtnMargin;
                }

                if (btnMarginRight >= widget.maxBtnMargin) {
                    btns.css('margin-right', widget.maxBtnMargin + 'px');
                    btnMarginRight = widget.maxBtnMargin;
                }

                // adjust hardcoded width of widget
                var broadenLeft = (btnMarginLeft !== 0) ? (btnMarginLeft * widget.btnsInARow) : 0;
                var broadenRight = (btnMarginRight !== 0) ? (btnMarginRight * widget.btnsInARow) : 0;

                // set new width of widget
                widget.el.width(widget.el.width() + broadenLeft + broadenRight);

                // format (set width) Button 0 of numpad
                btn0.outerWidth(btnOuterWidth * 2 + btnMarginLeft + btnMarginRight);

                // format (set height) Button Enter of numpad
                btnEnter.outerHeight(btn0.outerHeight() * 2 + btnMarginTop + btnMarginBottom);

                // adjust border of buttons to "border: 1px solid"
                $('.numpad', widget.el).addClass('solidBtnBorder');
            } else {
                // reset style properties
                $('.numpad', widget.el).removeClass('solidBtnBorder');
                btn0.outerWidth(btnOuterWidth * 2);
                btnEnter.outerHeight(btn0.outerHeight() * 2);
            }

            // toggle visibility of slider
            var sliderShouldBeInvisible = $('.breaseNumpadNumericValueOutterWrapper', '.numpad').eq(0).is(':visible');
            widget.el.toggleClass(widget.settings.stylePrefix + '_style_' + 'slider_invisible', sliderShouldBeInvisible);

            // adjust border radius flaw, if border-radius of widget is set too much (>12px)
            var widgetBorderRadiusInt = parseInt(widget.el.css('border-radius'), 10);
            if (widgetBorderRadiusInt > 12) {
                $('.numpadHeader').css('border-top-left-radius', widgetBorderRadiusInt + 'px');
                $('.numpadHeader').css('border-top-right-radius', widgetBorderRadiusInt + 'px');
                $('.numpadWrapper').css('border-bottom-left-radius', (widgetBorderRadiusInt * 0.7) + 'px');
                $('.numpadWrapper').css('border-bottom-right-radius', (widgetBorderRadiusInt * 0.7) + 'px');
                if (widgetBorderRadiusInt > 24) {
                    widget.closeButton.css('right', '-4px');
                }
            }

            // recalculate position, so that widget is never shown outside of the page
            var w = widget.elem.getBoundingClientRect().width / widget.dimensions.scale,
                rw = Math.round(w);
            widget.settings.width = rw;
            if (rw < w) { // A&P 689815: if w is rounded down, we increase by one to have enough space for the buttons
                widget.settings.width += 1;
            }
            widget._setDimensions();
            widget._setPosition();

            // recalculate position of arrow if corner radius is set and arrow is positioned at the very bottom
            // use modulo to eleminate rounding quirks
            if (((widget.el.outerHeight() - 2 * widget.settings.arrow.width) % parseInt(widget.arrow.css('top'), 10) <= 1) && widgetBorderRadiusInt > 0) {
                widget.arrow.css('top', parseInt(widget.arrow.css('top'), 10) - widgetBorderRadiusInt + 'px');
            }
        }

        return WidgetClass;

    });
