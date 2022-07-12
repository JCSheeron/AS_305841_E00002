define(['brease/core/Decorator',
    'brease/core/Utils',
    'brease/events/BreaseEvent',
    'brease/enum/Enum',
    'brease/controller/PopUpManager',
    'brease/controller/ZoomManager'],
function (Decorator, Utils, BreaseEvent, Enum, PopUpManager, ZoomManager) {

    'use strict';

    var TooltipDependency = function TooltipDependency() {
            this.initType = Decorator.TYPE_PRE;
        },
        dependency = 'tooltip',
        event = 'language',
        changeHandler = 'tooltipChangeHandler',
        globalActivated = false;

    /**
    * @class brease.decorators.TooltipDependency
    * @extends brease.core.Decorator
    * #Description
    * A decorator class to add functionality of tooltip dependency to widgets.
    * ##Example:
    *
    *     define(['brease/core/BaseWidget', 'brease/decorators/TooltipDependency'], 
    *           function (SuperClass, TooltipDependency) {
    *            [...]
    *
    *        return TooltipDependency.decorate(WidgetClass);
    *     });
    *
    *
    * @iatMeta studio:visible
    * false
    */

    /**
    * @method decorate
    * decorate a widget class with functionality of tooltip dependency
    * @param {brease.core.WidgetClass} widgetClass
    * @param {Boolean} initialDependency Initial dependency of widget instances
    * @return {brease.core.WidgetClass} returns decorated WidgetClass
    */
    TooltipDependency.prototype = new Decorator();
    TooltipDependency.prototype.constructor = TooltipDependency;

    var instance = new TooltipDependency();
    instance.isActivated = function () { return globalActivated; };

    /**
    * @property {Object} methodsToAdd
    * @property {Function} methodsToAdd.setTooltipDependency
    * @property {Boolean} methodsToAdd.setTooltipDependency.flag
    * Enable or disable tooltip dependency; dependent widgets listen to tooltip changes and execute method *tooltipChangeHandler* on changes
    */
    instance.methodsToAdd = {

        init: function (initialDependency) {
            this.dependencies[dependency] = {
                state: Enum.Dependency.INACTIVE,
                stored: {
                    tooltipModeActive: false
                },
                suspend: suspend.bind(this),
                wake: wake.bind(this),
                event: event
            };
            this.tooltip = {
                indicatorAttached: false,
                contentAttached: false
            };
            if (initialDependency === true) {
                this.setTooltipDependency(initialDependency);
            }

            if (this.dependencies[dependency].stored.tooltipModeActive) {
                this.activateTooltipMode();
            }
        },
        tooltipChangeHandler: function () {
            if (_hasTooltip.call(this) && this.tooltip.contentAttached) {
                _setTooltipContent.call(this, _parseTooltip(this.settings.tooltip));
                _positionTooltipContent.call(this);
            }
        },
        setTooltip: function (tooltip) {
            this.settings.tooltip = tooltip;
        },
        getTooltip: function () {
            return this.settings.tooltip;
        },
        showTooltip: function () {
            this.activateTooltipMode();
        },
        activateTooltipMode: function (local) {
            if (_hasTooltip.call(this) && this.isHidden === false) {
                _appendTooltipToDOM.call(this);
                _positionTooltipIndicator.call(this);

                if (this.dependencies[dependency]) {
                    if (!this.dependencies[dependency].stored.tooltipModeActive) {
                        this.dependencies[dependency].stored.tooltipModeActive = true;
                        if (globalActivated === false && local !== true) {
                            globalActivated = true;
                            document.body.dispatchEvent(new CustomEvent(BreaseEvent.TOOLTIPMODE_ACTIVE));
                        }
                    }
                }
            }
        },
        // called when exiting from tooltip mode
        deactivateTooltipMode: function (local) {
            _detachTooltipIndicator.call(this);
            _detachTooltipContent.call(this);
            if (this.dependencies[dependency]) {
                if (this.dependencies[dependency].stored.tooltipModeActive) {
                    this.dependencies[dependency].stored.tooltipModeActive = false;
                    if (globalActivated === true && local !== true) {
                        globalActivated = false;
                        document.body.dispatchEvent(new CustomEvent(BreaseEvent.TOOLTIPMODE_INACTIVE));
                    }
                }
            }
        },

        setTooltipDependency: function (flag) {
            if (flag === true) {
                setState.call(this, Enum.Dependency.ACTIVE);
            } else {
                setState.call(this, Enum.Dependency.INACTIVE);
            }
        },

        _visibleHandler: function () {
            if (this.isHidden && this.dependencies[dependency].stored.tooltipModeActive) {
                this.deactivateTooltipMode(true);
            }
            if (!this.isHidden && !this.dependencies[dependency].stored.tooltipModeActive && globalActivated) {
                this.activateTooltipMode(true);
            }
        },

        dispose: function () {
            this.dependencies[dependency] = null;
            removeListener.call(this);
            brease.bodyEl.off(BreaseEvent.MOUSE_DOWN, this._bind(_onHMIOperation));
            this.deactivateTooltipMode();
            this.tooltip = {};
        }

    };

    function suspend() {
        if (this.dependencies[dependency].state === Enum.Dependency.ACTIVE) {

            this.dependencies[dependency].stored.code = brease.language.getCurrentLanguage();
            this.dependencies[dependency].stored.version = brease.language.getCurrentVersion();

            setState.call(this, Enum.Dependency.SUSPENDED);
        }
    }

    function wake(e) {
        if (this.dependencies[dependency].state === Enum.Dependency.SUSPENDED) {
            setState.call(this, Enum.Dependency.ACTIVE);
            if (this.dependencies[dependency].stored.code !== brease.language.getCurrentLanguage() ||
                this.dependencies[dependency].stored.version !== brease.language.getCurrentVersion()) {
                this[changeHandler](e);
            }
        }
    }
    
    function setState(state) {
        if (this.dependencies[dependency]) {
            this.dependencies[dependency].state = state;
            if (state === Enum.Dependency.ACTIVE) {
                addListener.call(this);
            } else {
                removeListener.call(this);
                this.deactivateTooltipMode();
            }
        }
    }

    // add listeners to framework events which have an impact on the tooltip (e.g.: language change)
    function addListener() {
        document.body.addEventListener(BreaseEvent.LANGUAGE_CHANGED, this._bind(changeHandler));
    }

    function removeListener() {
        document.body.removeEventListener(BreaseEvent.LANGUAGE_CHANGED, this._bind(changeHandler));
    }

    // returns wether the widget has a valid tooltip configured and is allowed to display the tooltip
    function _hasTooltip() {
        return (this.settings.tooltip && this.settings.tooltip.length > 0) &&
            (this.settings.parentContentId &&
                this.settings.parentContentId !== brease.settings.globalContent);
    }

    // creates the element for the tooltip indicator
    function _createTooltipIndicator() {
        this.tooltip.indicator = $('<div class="breaseTooltipIndicator system_brease_Tooltip_style_default" data-source="' + this.elem.id + '" style="box-sizing:border-box;width:auto; height:auto; position:absolute !important; z-index:1;"></div>');
        this.tooltip.indicatorInner = $('<div class="breaseTooltipIndicatorInner"></div>');
        this.tooltip.indicator.append(this.tooltip.indicatorInner);
    }

    // creates the container element for the tooltip content
    function _createTooltipContent() {
        this.tooltip.contentWrapper = $('<div class="breaseTooltipWrapper system_brease_Tooltip_style_default" data-source="' + this.elem.id + '" style="max-width:' + brease.appView.get(0).offsetWidth / ZoomManager.getAppZoom() + 'px;"></div>');
        this.tooltip.content = $('<div class="breaseTooltip"></div>');
        this.tooltip.contentText = $('<div class="breaseTooltipText"></div>');
        this.tooltip.contentArrow = $('<div class="tooltip-arrow"><div class="tooltip-arrow-border"></div><div class="tooltip-arrow-background"></div></div>');

        this.tooltip.contentWrapper.append(this.tooltip.content);
        this.tooltip.contentWrapper.append(this.tooltip.contentArrow);
        this.tooltip.content.append(this.tooltip.contentText);
    }

    //******************************//
    //*** TOOLTIP EVENT HANDLING ***//
    //******************************//

    // add listeners to the tooltip indicator
    function _addTooltipListeners() {
        var self = this;
        brease.bodyEl.on(BreaseEvent.MOUSE_DOWN, this._bind(_onHMIOperation));
        this.tooltip.indicator.on(BreaseEvent.CLICK, this._bind(_appendTooltipContent));
        this.tooltip.indicator.on(BreaseEvent.MOUSE_DOWN, function (e) {
            self._handleEvent(e, true);
        });

        $(window).resize(function () {
            self.deactivateTooltipMode();
        });
        $(window).on('mousewheel', function () {
            self.deactivateTooltipMode();
        });
    }

    function _targetIsInTooltip(targetEl) {
        return targetEl.closest('.breaseTooltipWrapper').length > 0;
    }

    // TODO: remove this wrong implementation
    function _targetIsTooltipIndicator(targetEl) {
        return targetEl.hasClass('tooltipindicator');
    }

    // executed when the HMI is operated while tooltip mode is active
    function _onHMIOperation(e) {
        var targetEl = $(e.target);
        if (!_targetIsTooltipIndicator(targetEl) && !_targetIsInTooltip(targetEl)) {
            brease.bodyEl.off(BreaseEvent.MOUSE_DOWN, this._bind(_onHMIOperation));
            this.deactivateTooltipMode();
        }
    }

    // remove listeners from the tooltip indicator
    function _removeTooltipListeners() {
        brease.bodyEl.off(BreaseEvent.MOUSE_DOWN, this._bind(_onHMIOperation));
        this.tooltip.indicator.off();
    }

    //*************************//
    //*** TOOLTIP INDICATOR ***//
    //*************************//

    // append tooltip indicator and tooltipContent to the DOM
    function _appendTooltipToDOM() {
        if (!this.tooltip.indicatorAttached) {
            _createTooltipIndicator.call(this);
            _addTooltipListeners.call(this);
            this.tooltip.indicatorAttached = true;
        }

        if (!this.tooltip.contentAttached) {
            _createTooltipContent.call(this);
            _setTooltipContent.apply(this, [_parseTooltip(this.settings.tooltip)]);
        }
    }

    // tooltip indicator is positioned to the top right corner of the target element (widget)
    // the indicator is appended to the parent element of the widget in order to be hidden
    // when the widget is inside of a scrollable container
    function _positionTooltipIndicator() {
        var tooltipIndicatorClientRect, tooltipIndicatorInnerClientRect,
            elemMatrix = Utils.getMatrix(this.elem),
            elemZoom = _getElemZoom(this.el, this.elem, elemMatrix),
            parentPositionedContainer = Utils.getPositionedParent(this.elem),
            widgetElemClientRect = this.elem.getBoundingClientRect(),
            parentContainer = parentPositionedContainer.getBoundingClientRect(),
            widgetRectLeft = widgetElemClientRect.left - parentContainer.left,
            widgetRectTop = widgetElemClientRect.top - parentContainer.top,
            widgetRect = {
                w: this.el.outerWidth() || widgetElemClientRect.width / elemZoom,
                left: widgetRectLeft / elemZoom,
                top: widgetRectTop / elemZoom
            };

        this.el.parent().append(this.tooltip.indicator);
        tooltipIndicatorClientRect = this.tooltip.indicator.get(0).getBoundingClientRect();
        tooltipIndicatorInnerClientRect = this.tooltip.indicatorInner.get(0).getBoundingClientRect();
        var tooltipTouchAreaRight = (tooltipIndicatorClientRect.width - tooltipIndicatorInnerClientRect.width) / 2 / elemZoom,
            tooltipTouchAreaTop = (tooltipIndicatorClientRect.height - tooltipIndicatorInnerClientRect.height) / 2 / elemZoom;

        this.tooltip.indicator.css({
            transform: 'matrix(' + elemMatrix.join(',') + ')',
            'z-index': parseInt(this.el.css('z-index'), 10) + 1,
            top: 0,
            left: 0
        });
        tooltipIndicatorClientRect = this.tooltip.indicator.get(0).getBoundingClientRect();
        tooltipIndicatorInnerClientRect = this.tooltip.indicatorInner.get(0).getBoundingClientRect();

        var offset = {};
        if (isRotated(elemMatrix)) {
            if (!this.tooltip.indicatorClone) {
                this.tooltip.indicatorClone = $('<div class="breaseTooltipIndicator system_brease_Tooltip_style_default" style="box-sizing:border-box;width:auto; height:auto;position:absolute; visibility:hidden;" ></div>');
                this.tooltip.indicatorClone.css({
                    right: '-' + tooltipTouchAreaRight + 'px',
                    top: '-' + tooltipTouchAreaTop + 'px'
                });
                this.el.append(this.tooltip.indicatorClone);
            }
            var indicatorCloneDomRect = this.tooltip.indicatorClone.get(0).getBoundingClientRect();

            offset.left = (indicatorCloneDomRect.left - tooltipIndicatorClientRect.left) / elemZoom;
            offset.top = (indicatorCloneDomRect.top - tooltipIndicatorClientRect.top) / elemZoom;
        } else {
            offset.top = widgetRect.top - this.tooltip.indicatorInner.get(0).offsetTop;
            offset.left = widgetRect.left + widgetRect.w - this.tooltip.indicator.outerWidth() + this.tooltip.indicatorInner.get(0).offsetLeft;
        }
        this.tooltip.indicator.css(offset);
    }

    function isRotated(matrix) {
        return matrix.length > 0 && Number(matrix[0]) !== 1;
    }

    // remove tooltip indicator from the DOM
    function _detachTooltipIndicator() {
        if (this.tooltip.indicatorAttached) {
            _removeTooltipListeners.call(this);
            this.tooltip.indicator.remove();
            if (this.tooltip.indicatorClone) {
                this.tooltip.indicatorClone.remove();
                this.tooltip.indicatorClone = undefined;
            }
            this.tooltip.indicatorAttached = false;
        }
    }

    //***********************//
    //*** TOOLTIP CONTENT ***//
    //***********************//

    // append tooltip content to the DOM
    // if the content is already appended it toggles between visible/hidden
    function _appendTooltipContent(e) {
        if (!_hasTooltip.call(this) || this.isHidden) {
            return;
        }
        if (e) {
            this._handleEvent(e, true);
        }
        if (!this.tooltip.contentAttached) {
            this.tooltip.contentAttached = true;
        } else {
            this.tooltip.contentWrapper.css('visibility') === 'hidden' ? this.tooltip.contentWrapper.css('visibility', 'visible') : this.tooltip.contentWrapper.css('visibility', 'hidden');
        }
        if (this.tooltip.contentWrapper.css('visibility') !== 'hidden') {
            _positionTooltipContent.call(this);
        }
    }

    // returns the data for the tooltip. resolves the textkey in case of a localizable text
    function _parseTooltip(tooltip) {
        if (brease.language.isKey(tooltip)) {
            return brease.language.getTextByKey(brease.language.parseKey(tooltip));
        } else {
            return tooltip;
        }
    }

    // set the content for the tooltip
    function _setTooltipContent(content) {
        if (content.match(/(\r\n|\n|\r)/gm) !== null) {
            this.tooltip.contentText.css('white-space', 'pre');
        }

        this.tooltip.contentText.text(content);
    }

    // boundaries of the appContainer are taken into account because the content is appended to
    // the document body
    function _positionTooltipContent() {
        var zoom = ZoomManager.getAppZoom();
        this.tooltip.contentWrapper.css({ 'transform': 'scale(' + zoom + ',' + zoom + ')', 'transform-origin': '0 0' });
        brease.bodyEl.append(this.tooltip.contentWrapper);
        var offsetFlag = false,
            wrapperOffset = this.tooltip.contentWrapper.offset();
        if (wrapperOffset.left === 0 && wrapperOffset.top === 0) {
            offsetFlag = true;
        }
        var tooltipIndicatorInnerOffset = this.tooltip.indicatorInner.offset(),
            tooltipIndicatorInnerRect = this.tooltip.indicatorInner.get(0).getBoundingClientRect(),
            tooltipContentArrowRect = this.tooltip.contentArrow.get(0).getBoundingClientRect(),
            tooltipContentRect = this.tooltip.content.get(0).getBoundingClientRect(),
            middleIndicatorPosition = tooltipIndicatorInnerOffset.left + (tooltipIndicatorInnerRect.width / 2),
            contentPlusArrowHeight = tooltipContentRect.height + tooltipContentArrowRect.height,
            scrollOffsetY = window.scrollY,
            offset = { top: 0, left: 0 },

            // limit border radius and
            // consider corner radius and move arrow away from the rounded edges -> if the tooltip overlaps left boundaries
            borderRadius = parseFloat(this.tooltip.content.css('border-radius'));
        borderRadius = Math.min(borderRadius, 20);

        var cornerRadiusBalancing = borderRadius / 2,
            newStyle = {
                'borderRadius': borderRadius + 'px'
            };
        this.tooltip.content.css(newStyle);
        offset.left = middleIndicatorPosition - tooltipContentRect.width / 2;
        if (middleIndicatorPosition - (tooltipContentRect.width / 2) <= 0) {
            offset.left = 0 - cornerRadiusBalancing / 2;
        } else {
            // overlap right boundaries
            if (middleIndicatorPosition + (tooltipContentRect.width / 2) >= brease.appView.get(0).getBoundingClientRect().width) {
                offset.left = brease.appView.get(0).getBoundingClientRect().width - tooltipContentRect.width;
            }
        }
        // overlap top boundaries
        offset.top = tooltipIndicatorInnerRect.top - contentPlusArrowHeight + scrollOffsetY;

        if (tooltipIndicatorInnerRect.top - contentPlusArrowHeight <= 0) {
            this.tooltip.contentArrow.addClass('ontop');
            offset.top = tooltipIndicatorInnerRect.top + tooltipIndicatorInnerRect.height + tooltipContentArrowRect.height + scrollOffsetY;
        }

        var css = {
            'min-width': (tooltipContentRect.width) / zoom + 'px',
            'max-width': brease.appView.get(0).offsetWidth / zoom + 'px',
            'z-index': PopUpManager.getHighestZindex() + 1,
            'top': offset.top + 'px',
            'left': offset.left + 'px'
        };

        this.tooltip.contentWrapper.css(css);
        var arrowOffset = {
            'left': 0
        };
        contentPlusArrowHeight = this.tooltip.content.get(0).getBoundingClientRect().height + tooltipContentArrowRect.height;
        if (offsetFlag) {
            if (tooltipIndicatorInnerRect.top - contentPlusArrowHeight <= 0) {
                this.tooltip.contentArrow.addClass('ontop');
            }
            arrowOffset.left = this.tooltip.contentArrow.offset().left + (middleIndicatorPosition - this.tooltip.contentWrapper.offset().left) / zoom;

            this.tooltip.contentArrow.offset(arrowOffset);
        }
    }

    // detach tooltip content from the dom
    function _detachTooltipContent() {
        if (this.tooltip.contentAttached) {
            this.tooltip.contentWrapper.remove();

            this.tooltip.contentWrapper = undefined;
            this.tooltip.content = undefined;
            this.tooltip.contentText = undefined;
            this.tooltip.contentArrow = undefined;

            this.tooltip.contentAttached = false;
        }
    }

    function _getElemZoom($el, elem, elemMatrix) {
        var factor = 1,
            width = $el.outerWidth();
        if (width > 0) {
            var boundingRect = elem.getBoundingClientRect();
            if (elemMatrix.length > 0) {
                var cosAlpha = Math.abs(Number(elemMatrix[0])),
                    sinAlpha = Math.abs(Number(elemMatrix[2]));

                if (sinAlpha === 0) {
                    factor = boundingRect.width / width;
                } else if (sinAlpha === 1) {
                    factor = boundingRect.height / width;
                } else {
                    factor = boundingRect.width / (width * cosAlpha + $el.outerHeight() * sinAlpha);
                }
            } else {
                factor = boundingRect.width / width;
            }
        }
        return Math.abs(factor);
    }

    return instance;
});
