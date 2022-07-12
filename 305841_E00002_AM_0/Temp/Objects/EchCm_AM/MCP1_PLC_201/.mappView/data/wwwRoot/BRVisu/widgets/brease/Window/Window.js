define([
    'brease/core/BaseWidget',
    'widgets/brease/Window/libs/Config',
    'widgets/brease/Window/libs/DragHandler',
    'brease/events/BreaseEvent',
    'brease/enum/Enum',
    'brease/core/Utils',
    'brease/decorators/LanguageDependency',
    'brease/controller/PopUpManager'
], function (
    SuperClass, WindowConfig, DragHandler,
    BreaseEvent, Enum, Utils, languageDependency, popupManager
) {

    'use strict';

    /**
    * @class widgets.brease.Window
    * @extends brease.core.BaseWidget
    * @mixin brease.objects.WindowConfig
    * #Description
    * widget to display an overlay with optional header, content and close button.
    *
    * @iatMeta studio:visible
    * false
    * @iatMeta category:Category
    * System
    */
    var defaultSettings = WindowConfig,

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
        WidgetClass = SuperClass.extend(function Window(elem, options, deferredInit, inherited) {
            SuperClass.call(this, elem, options, (deferredInit !== undefined) ? deferredInit : true, true);
            if (inherited !== true) {
                _loadHTML(this);
            }
            this.readyDeferred = $.Deferred();
        }, defaultSettings),

        p = WidgetClass.prototype;

    p.init = function () {

        if (this.settings.omitClass !== true) {
            this.addInitialClass('breaseWindow');
        }
        this.settings.stylePrefix = this.settings.stylePrefix || this.el.attr('data-brease-widget');
        this.settings.className = this.settings.className || this.el.attr('data-brease-widget');
        SuperClass.prototype.init.apply(this, arguments);

        this.arrow = this.el.find('.breaseWindowArrow');
        this.closeButton = this.el.find('.breaseWindowClose');
        this.header = this.el.find('> header');
        this.dimensions = {
            scale: 1
        };
        this.settings.parentContentId = brease.settings.globalContent;
        this.instanceSettings = Utils.deepCopy(this.settings);

        this.debouncedHide = _.debounce(this._bind('onBeforeHide'), 10);
        this.dragHandler = new DragHandler(this);
    };

    p.langChangeHandler = function () {
        this._setContent();
    };

    /**
    * @method show
    * Method to show the Window. 
    * @param {brease.objects.WindowOptions} options
    * @param {HTMLElement} refElement Either HTML element of opener widget or any HTML element for relative positioning.
    */
    p.show = function (options, refElement) {
        //console.log(((this.elem) ? this.elem.id : 'undefined') + '.show:refElement:' + ((refElement) ? refElement.id : '') + '/options:' + JSON.stringify(options));
        var self = this;
        this.closeDeferred = $.Deferred();
        popupManager.addWindow(self.elem.id, self.settings.windowType);
        this.refElement = (refElement) ? ((refElement.jquery) ? refElement : $(refElement)) : undefined;
        // A&P 704805:widgets should have only one css style class: therefore the old class is removed here, 
        // as this.setStyle does not remove it, if new style is already set in this.settings:
        this.el.removeClass(this.settings.stylePrefix + '_style_' + this.settings.style); 
        this.settings = $.extend(true, {}, this.instanceSettings, options);
        
        if (this.settings.header !== undefined && brease.language.isKey(this.settings.header.text)) {
            this.settings.header.textkey = brease.language.parseKey(this.settings.header.text);
        }
        if (this.settings.content !== undefined && brease.language.isKey(this.settings.content.text)) {
            this.settings.content.textkey = brease.language.parseKey(this.settings.content.text);
        }
        var maxIndex = popupManager.getHighestZindex();
        this.el.css({
            'display': 'block',
            'z-index': maxIndex + 2
        });
        this._setModal(maxIndex);

        if (this.settings.cssClass !== undefined) {
            this.el.addClass(this.settings.cssClass);
        }

        this.setStyle(this.settings.style);
        this._setCloseButton();
        this._setDimensions();
        this._setContent();
        this._setPosition();
        this._afterCalculationHook();
        _updateModalOverlays();
        brease.bodyEl.on(BreaseEvent.CLICK + ' ' + BreaseEvent.DISABLED_CLICK, self._bind('_documentClickHandler'));
        this.dispatchEvent(new CustomEvent(BreaseEvent.WINDOW_SHOW, { detail: { id: this.elem.id }, bubbles: true }));
        this.header.on(BreaseEvent.MOUSE_DOWN, this._bind('_headerDownHandler'));
        // A&P 680800 allow the possibility to prevent a DialogWindow from moving above the MotionKeyPad
        // if the MotionPad is used on a Dialog content
        if (this.settings.autoRaise === Enum.AutoRaise.ENABLED) {
            this.el.on(BreaseEvent.MOUSE_DOWN, this._bind('_windowInFrontHandler'));
        }

    };

    p._afterCalculationHook = function () {

    };

    p.closeOnLostContentListener = function () {
        this.onBeforeHide();
    };

    p.closeOnLostContent = function (refElement) {
        this.opener = brease.pageController.getLoaderForElement(refElement);
        if (this.opener) {
            this.opener.addEventListener(BreaseEvent.FRAGMENT_HIDE, this._bind('closeOnLostContentListener'));
        }
    };

    p.removeCloseOnLostContent = function () {
        if (this.opener) {
            this.opener.removeEventListener(BreaseEvent.FRAGMENT_HIDE, this._bind('closeOnLostContentListener'));
            this.opener = undefined;
        }
    };

    p.setModal = function (value) {
        this.settings.modal = value;
        if (value === false) {
            this._removeModal(); 
        } else if (!this.dimmer) {
            var maxIndex = popupManager.getHighestZindex();
            this._setModal(maxIndex); 
        }
    };

    p.setForceInteraction = function (value) {
        this.settings.forceInteraction = value;
    };

    /**
    * @method onBeforeHide
    * hook before the window gets hidden  
    */
    p.onBeforeHide = function () {
        this.hide();
    };

    /**
    * @method hide
    * Method to hide the Window.  
    */
    p.hide = function () {
        var self = this;
        this.el.css({
            'display': 'none'
        });
        if (this.settings.cssClass !== undefined) {
            this.el.removeClass(this.settings.cssClass);
        }
        this.resetStyles();
        brease.bodyEl.off(BreaseEvent.CLICK + ' ' + BreaseEvent.DISABLED_CLICK, self._bind('_documentClickHandler'));
        this.removeCloseOnLostContent();
        this._removeModal();
        popupManager.removeWindow(self.elem.id);

        this.refElement = null;

        /**
        * @event window_closed
        * Fired after window gets hidden    
        * @param {Object} detail  
        * @param {String} detail.id  widget id
        * @param {String} type {@link brease.events.BreaseEvent#static-property-CLOSED BreaseEvent.CLOSED}
        * @param {HTMLElement} target element of widget
        */
        this.dispatchEvent(new CustomEvent(BreaseEvent.CLOSED, { detail: { id: this.elem.id }, bubbles: true }));
        if (this.closeDeferred) {
            this.closeDeferred.resolve();
        }
        this.header.off(BreaseEvent.MOUSE_DOWN, this._bind('_headerDownHandler'));
        this.el.off(BreaseEvent.MOUSE_DOWN, this._bind('_windowInFrontHandler'));
        this.closeButton.off(BreaseEvent.CLICK, this._bind('_closeButtonClickhandler'));
        _enableScroll.call(this);
        _start = undefined;
    };

    p._removeModal = function () {
        if (this.dimmer) {
            this.dimmer.removeClass('active');
            this.dimmer.hide();
            _updateModalOverlays();
            _removeModalListeners(this);
        }
    };

    function _removeModalListeners(widget) {
        var boundStopPropagation = widget._bind(_stopPropagation);
        widget.dimmer[0].removeEventListener('pointerdown', boundStopPropagation, true);
        widget.dimmer[0].removeEventListener('pointerup', boundStopPropagation, true);
        widget.dimmer[0].removeEventListener('touchstart', boundStopPropagation, BreaseEvent.support.options ? { capture: true, passive: true } : true);
        widget.dimmer[0].removeEventListener('touchend', boundStopPropagation, true);
        widget.dimmer[0].removeEventListener('mousedown', boundStopPropagation, true);
        widget.dimmer[0].removeEventListener('mouseup', boundStopPropagation, true);
        widget.dimmer.off(BreaseEvent.CLICK, widget._bind('_dimmerClickHandler'));
    }

    function _addModalListeners(widget) {
        var boundStopPropagation = widget._bind(_stopPropagation);
        widget.dimmer[0].addEventListener('pointerdown', boundStopPropagation, true);
        widget.dimmer[0].addEventListener('pointerup', boundStopPropagation, true);
        widget.dimmer[0].addEventListener('touchstart', boundStopPropagation, BreaseEvent.support.options ? { capture: true, passive: true } : true);
        widget.dimmer[0].addEventListener('touchend', boundStopPropagation, true);
        widget.dimmer[0].addEventListener('mousedown', boundStopPropagation, true);
        widget.dimmer[0].addEventListener('mouseup', boundStopPropagation, true);
        widget.dimmer.on(BreaseEvent.CLICK, widget._bind('_dimmerClickHandler'));
    }

    var _start;
    function _stopPropagation(e) {
        var stop = true;
        if (e.type === 'mouseup') {
            if (_start && $.containsOrEquals(this.elem, _start)) {
                stop = false;
                _start = undefined;
            }
        }
        if (stop === true) {
            e.stopPropagation();
            e.stopImmediatePropagation();
        }
    }

    p._setArrow = function (hasArrow, refOffset, refWidth, refHeight, elLeft, elTop, elWidth, elHeight) {

        var arrowSize = 12,
            arrowPos = 0;

        if (this.arrow.length > 0) {
            this.arrow.show();
        } else {
            this._addArrow();
        }

        this.el.removeClass('arrowRight arrowLeft arrowTop arrowBottom');

        switch (this.settings.arrow.position) {
            case Enum.Position.right:
                this.el.addClass('arrowRight');
                arrowPos = arrowSize + parseInt(this.el.css('border-right'), 10);
                break;
            case Enum.Position.left:
                this.el.addClass('arrowLeft');
                arrowPos = arrowSize + parseInt(this.el.css('border-left'), 10);
                break;
            case Enum.Position.top:
                this.el.addClass('arrowTop');
                arrowPos = arrowSize + parseInt(this.el.css('border-top'), 10);
                break;
            case Enum.Position.bottom:
                this.el.addClass('arrowBottom');
                arrowPos = arrowSize + parseInt(this.el.css('border-bottom'), 10);
                break;
        }

        if (this.arrow !== undefined && hasArrow === true) {
            setArrowStyle.call(this, arrowPos, elTop, elLeft, elWidth, elHeight, refOffset, refWidth, refHeight);
        }
    };

    function setArrowStyle(arrowPos, elTop, elLeft, elWidth, elHeight, refOffset, refWidth, refHeight) {
        var css = {},
            rootZoom = brease.pageController.getRootZoom();

        if (this.settings.position.vertical === 'middle') {
            var top = Math.abs(elTop - refOffset.top) - parseInt(this.el.css('border-top-width'), 10) - this.settings.arrow.width + (refHeight / 2) * rootZoom;
            if (top < 0) {
                top = 0;
            }
            if (top + 2 * this.settings.arrow.width > elHeight) {
                top = elHeight - 2 * this.settings.arrow.width;
            }
            css.top = (top / this.dimensions.scale) + 'px';

            if (this.settings.arrow.position === Enum.Position.left) {
                css.left = -arrowPos + 'px';
                css.right = '';
            } else {
                css.right = -arrowPos + 'px';
                css.left = '';
            }

        } else {
            var left = Math.abs(elLeft - refOffset.left) - this.settings.arrow.width + refWidth / 2;
            if (left < 0) {
                left = 0;
            }
            if (left + 2 * this.settings.arrow.width > elWidth) {
                left = elWidth - 2 * this.settings.arrow.width;
            }
            css.left = left + 'px';

            if (this.settings.arrow.position === Enum.Position.top) {
                css.top = -arrowPos + 'px';
                css.bottom = '';
            } else {
                css.bottom = -arrowPos + 'px';
                css.top = '';
            }
        }
        this.arrow.css(css);
    }

    p._setDimensions = function () {

        if (this.settings.width !== undefined) {
            this.el.css('width', this.settings.width + 'px');
            this.dimensions.width = this.settings.width;
        } else {
            this.el.css('width', 'auto');
            this.dimensions.width = this.el.outerWidth();
        }
        if (this.settings.height !== undefined) {
            this.el.css('height', this.settings.height + 'px');
            var borderBottom = parseInt(this.el.css('border-bottom'), 10);
            this.el.find('.contentBox').css('height', this.settings.height - this.el.find('header').height() - ((isNaN(borderBottom)) ? 0 : borderBottom));
            this.dimensions.height = this.settings.height;
        } else {
            this.el.css('height', 'auto');
            this.dimensions.height = this.el.outerHeight();
        }
        if (this.settings.scale2fit) {
            // A&P 513385: system touchpads (NumPad, Keyboard, DateTimePicker) are zoomed, if they exceed the display (=screen)
            this._scale2fit();
        }
    };

    p._scale2fit = function () {
        var globalDim = popupManager.getDimensions(),
            scaleFactor = 1;

        if (this.dimensions.width > globalDim.winWidth || this.dimensions.height > globalDim.winHeight) {
            scaleFactor = Math.min(globalDim.winWidth / this.dimensions.width, globalDim.winHeight / this.dimensions.height);
        }

        this._applyScale(scaleFactor);
    };

    p._applyScale = function (factor) {

        this.dimensions.scale = factor;
        if (factor !== 1) {
            this.el.css({
                'transform': 'scale(' + factor + ',' + factor + ')', 'transform-origin': '0 0'
            });
        } else {
            this.el.css({
                'transform': 'none'
            });
        }
    };

    p._setCloseButton = function () {
        if (this.settings.showCloseButton === true) {
            if (this.closeButton.length > 0) {
                this.closeButton.show();
                _addCloseListener.call(this);
            } else {
                this._addCloseButton();
            }
        } else {
            this.closeButton.hide();
        }

    };

    p._setContent = function () {
        var headerText = (this.settings.header) ? ((this.settings.header.textkey) ? brease.language.getTextByKey(this.settings.header.textkey) : this.settings.header.text) : '';
        if (this.headerEl === undefined) {
            this.headerEl = this.el.find('header > div');
        }
        this.headerEl.text(headerText);

        var contentText = (this.settings.content) ? ((this.settings.content.textkey) ? brease.language.getTextByKey(this.settings.content.textkey) : this.settings.content.text) : '';
        this.el.find('.content').text(contentText);
    };

    p.getElemExtension = function () {
        return { left: 0, right: 0, top: 0, bottom: 0 };
    };

    p._setPosition = function () {
        var offset = 0;

        //console.log('_setPosition:', { pointOfOrigin: this.settings.pointOfOrigin, horizontal: this.settings.position.horizontal, vertical: this.settings.position.vertical, offset: this.settings.position.offset });

        var position,
            boundingRect = this.elem.getBoundingClientRect(),
            elemExtension = this.getElemExtension(boundingRect, this.settings.style),
            elWidth = boundingRect.width,
            elHeight = boundingRect.height,
            globalDim = popupManager.getDimensions(),
            windowOrigin = this.settings.pointOfOrigin === Enum.PointOfOrigin.WINDOW,
            refWidth = _getRefWidth(this.settings.pointOfOrigin, this.refElement, windowOrigin === true ? globalDim.winWidth : globalDim.appWidth),
            refHeight = _getRefHeight(this.settings.pointOfOrigin, this.refElement, windowOrigin === true ? globalDim.winHeight : globalDim.appHeight),
            hasArrow = (this.settings.pointOfOrigin === Enum.PointOfOrigin.ELEMENT && this.refElement !== undefined),
            left, top, refOffset;
        if (!this.settings.position.hasOwnProperty('horizontalDialog')) {
            // A&P 617780: all widgets that use window.js.
            // (with the exception of DialogWindow called by the client system action: openDialogAtTarget).
            refOffset = _getRefOffsetRelativeToViewPort(this.settings.pointOfOrigin, this.refElement);
            position = _calcPosition(this.settings, elWidth, elHeight, refOffset, refWidth, refHeight, hasArrow);
        } else {
            refOffset = _getRefOffsetRelativeToDocument(this.settings.pointOfOrigin, this.refElement);
            position = _calcPositionAtTarget(this.settings, elWidth, elHeight, refOffset, refWidth, refHeight);
        }

        position = _respectBoundaries(position, elWidth, elHeight, elemExtension, this.settings.pointOfOrigin);
        offset = this._getOffset();
        left = position.x + offset;
        top = position.y + offset;
        if (!this.settings.position.hasOwnProperty('horizontalDialog')) {
            left = Math.round(left);
            top = Math.round(top);
            this.el.css({
                display: 'block',
                position: 'fixed',
                left: left + 'px',
                top: top + 'px',
                margin: 0,
                'margin-left': '0',
                'margin-top': '0'
            });
        } else {
            var rootZoom = brease.pageController.getRootZoom();
            this.el.css({
                display: 'block',
                position: 'fixed',
                left: left + 'px',
                top: top + 'px',
                transform: 'scale(' + rootZoom + ', ' + rootZoom + ')',
                margin: 0,
                'margin-left': '0',
                'margin-top': '0'
            });
        }

        if (this.settings.arrow.show === false) {
            this.arrow.hide();
        } else {
            this._setArrow(hasArrow, refOffset, refWidth, refHeight, position.x + offset, position.y + offset, elWidth, elHeight);
        }
    };

    p._getOffset = function () { // returns something !=0 for MessageBox
        return 0;
    };

    p._addArrow = function () {
        this.arrow = $('<i/>').addClass('breaseWindowArrow');
        this.el.append(this.arrow);
    };

    p._addCloseButton = function () {
        this.closeButton = $('<a/>').addClass('breaseWindowClose');
        this.el.find('header').append(this.closeButton);
        _addCloseListener.call(this);
    };

    function _addCloseListener() {
        var self = this;
        self._addCloseListenerTimeout = window.setTimeout(function () {
            if (!self.isDisposed()) {
                self.closeButton.on(BreaseEvent.CLICK, self._bind('_closeButtonClickhandler'));
            }
        }, 0);
    }

    p._closeButtonClickhandler = function (e) {
        this._handleEvent(e, true);
        this.debouncedHide();
    };

    p._setModal = function (maxIndex) {
        if (this.settings.modal === true) {
            if (this.dimmer === undefined) {
                this.dimmer = $('<div/>').attr('id', Utils.uniqueID('dimmer')).addClass('breaseModalDimmer').appendTo(document.body);
            }

            this.dimmer.css({
                'z-index': maxIndex + 1, display: 'block'
            });
            _addModalListeners(this);
            _disableScroll.call(this);
        }
    };

    p._documentClickHandler = function (e) {

        // if autoClose (=!forceInteraction) is false -> don't close
        if (this.settings.forceInteraction === true) {
            return;
        }

        var actualElementOnClickCoordinates = (Utils.isNumeric(e.clientX) && Utils.isNumeric(e.clientY)) ? document.elementFromPoint(e.clientX, e.clientY) : e.target;

        // if click was in an other overlay -> don't close
        if (_clickInOverlay.call(this, actualElementOnClickCoordinates)) {
            return;
        }

        // click on something overlapping -> don't close
        if (_clickOnHigherZindex(this.el, $(e.target))) {
            return;
        }

        // if event.target is in refElement -> don't close
        if (_targetInRefElement.call(this, e.target)) {
            return;
        }

        if (!$.containsOrEquals(this.elem, actualElementOnClickCoordinates)) {
            this.debouncedHide();
        }
    };

    function _targetInRefElement(target) {
        if (this.refElement) {
            return $.containsOrEquals(this.refElement[0], target);
        }
        return false;
    }

    function _clickOnHigherZindex(thisEl, targetEl) {
        var thisZindex = parseFloat(thisEl.css('z-index')),
            targetZindex = parseFloat(targetEl.css('z-index'));

        targetZindex = (isNaN(targetZindex)) ? 0 : targetZindex;

        return (targetZindex > thisZindex);
    }

    function _clickInOverlay(actualElementOnClickCoordinates) {

        var overlays = popupManager.overlays(this.elem.id);

        for (var i = 0, l = overlays.length; i < l; i += 1) {
            if ($.containsOrEquals(document.getElementById(overlays[i]), actualElementOnClickCoordinates) !== false) {
                return true;
            }
        }
        return false;
    }

    p._clickHandler = function (e) {
        // as windows are not bindable -> no need of propagation of click event to mapp view server -> no SuperClass call
        e.stopPropagation();
    };

    p._dimmerClickHandler = function (e) {

        if (this.settings.forceInteraction !== true && this.el.css('display') !== 'none') {
            this.debouncedHide();
        }
        // click-event is stopped at dimmer element to not bother underlying widgets
        e.stopPropagation();
    };

    p._windowInFrontHandler = function (e) {
        if (e.type.indexOf('mousedown') !== -1) {
            _start = e.target;
        }
        var maxIndex = popupManager.getHighestZindex(),
            curIndex = parseInt(this.el.css('z-index'), 10);
        if (maxIndex > curIndex + 1) {

            if (this.dimmer) {
                this.dimmer.css({
                    'z-index': maxIndex + 1
                });
                this.el.css({
                    'display': 'block',
                    'z-index': maxIndex + 2
                });
                popupManager.updateIndex(this.elem.id, maxIndex + 2);
            } else {
                this.el.css({
                    'display': 'block',
                    'z-index': maxIndex + 1
                });
                popupManager.updateIndex(this.elem.id, maxIndex + 1);
            }
        }
    };

    p._headerDownHandler = function (e) {

        if (e.target !== this.closeButton[0]) {
            this.dragHandler.start(e);
        }
    };

    p.dispose = function () {
        if (this.header) {
            this.header.off();
        }
        if (this.closeButton) {
            this.closeButton.off();
        }
        brease.bodyEl.off(BreaseEvent.CLICK + ' ' + BreaseEvent.DISABLED_CLICK, this._bind('_documentClickHandler'));
        if (this.dimmer) {
            this.dimmer.remove();
        }
        this.removeCloseOnLostContent();
        this.closeDeferred = null;
        window.clearTimeout(this._addCloseListenerTimeout);
        SuperClass.prototype.dispose.apply(this, arguments);
    };

    p.isReady = function () {
        return this.readyDeferred.promise();
    };

    p.onClose = function () {
        return this.closeDeferred.promise();
    };

    p.readyHandler = function () {
        brease.uiController.addWidget(this);
        this.readyDeferred.resolve(this);
        this._dispatchReady();
    };

    /// PRIVATE
    function _calcPosition(settings, elWidth, elHeight, refOffset, refWidth, refHeight, hasArrow) {
        var position = {
                x: 0,
                y: 0
            },
            rootZoom = brease.pageController.getRootZoom();

        if (hasArrow === true) {

            switch (settings.position.horizontal) {
                case Enum.Position.left:
                    position.x = refOffset.left - elWidth;
                    break;

                case Enum.Position.right:
                    position.x = refOffset.left + refWidth;
                    break;

                default: //center
                    position.x = refOffset.left + refWidth / 2 - elWidth / 2;
                    break;
            }

            switch (settings.position.vertical) {
                case Enum.Position.top:
                    position.y = refOffset.top - elHeight;
                    break;

                case Enum.Position.bottom:
                    position.y = refOffset.top + refHeight;
                    break;

                default: //middle:
                    position.y = refOffset.top + refHeight / 2 - 40;
                    break;
            }
            position = _addArrowOffset(position, settings);

        } else {
            if (!_.isNumber(settings.position.horizontal)) {
                switch (settings.position.horizontal) {
                    case Enum.Position.left:
                        position.x = refOffset.left;
                        break;
                    case Enum.Position.right:
                        position.x = refOffset.left + refWidth - elWidth;
                        break;
                    default: //center
                        position.x = refOffset.left + (refWidth - elWidth) / 2;
                        break;
                }
            } else {
                position.x = refOffset.left + rootZoom * settings.position.horizontal;
            }

            if (!_.isNumber(settings.position.vertical)) {
                switch (settings.position.vertical) {
                    case Enum.Position.top:
                        position.y = refOffset.top;
                        break;

                    case Enum.Position.bottom:
                        position.y = refOffset.top + refHeight - elHeight;
                        break;

                    default: //middle:
                        position.y = refOffset.top + (refHeight - elHeight) / 2;
                        break;
                }
            } else {
                position.y = refOffset.top + rootZoom * settings.position.vertical;
            }

        }
        return position;
    }

    function _calcPositionAtTarget(settings, elWidth, elHeight, refOffset, refWidth, refHeight) {
        var position = {
            x: 0,
            y: 0
        };
        if (settings.position.horizontal === Enum.Position.left) {
            switch (settings.position.horizontalDialog) {
                case Enum.Position.left:
                    position.x = refOffset.left;
                    break;
                case Enum.Position.right:
                    position.x = refOffset.left - elWidth;
                    break;
                default: // center
                    position.x = refOffset.left - (elWidth / 2);
                    break;
            }
        } else if (settings.position.horizontal === Enum.Position.right) {
            switch (settings.position.horizontalDialog) {
                case Enum.Position.left:
                    position.x = refOffset.left + refWidth;
                    break;
                case Enum.Position.right:
                    position.x = refOffset.left + refWidth - elWidth;
                    break;
                default: // center
                    position.x = refOffset.left + refWidth - (elWidth / 2);
                    break;
            }
        } else { // center
            switch (settings.position.horizontalDialog) {
                case Enum.Position.left:
                    position.x = refOffset.left + (refWidth / 2);
                    break;
                case Enum.Position.right:
                    position.x = refOffset.left + (refWidth / 2) - elWidth;
                    break;
                default: // center
                    position.x = refOffset.left + (refWidth / 2) - (elWidth / 2);
                    break;
            }
        }

        if (settings.position.vertical === Enum.Position.top) {
            switch (settings.position.verticalDialog) {
                case Enum.Position.top:
                    position.y = refOffset.top;
                    break;
                case Enum.Position.bottom:
                    position.y = refOffset.top - elHeight;
                    break;
                default: // middle
                    position.y = refOffset.top - (elHeight / 2);
                    break;
            }
        } else if (settings.position.vertical === Enum.Position.bottom) {
            switch (settings.position.verticalDialog) {
                case Enum.Position.top:
                    position.y = refOffset.top + refHeight;
                    break;
                case Enum.Position.bottom:
                    position.y = refOffset.top + (refHeight) - elHeight;
                    break;
                default: // middle
                    position.y = refOffset.top + (refHeight) - (elHeight / 2);
                    break;
            }
        } else { // middle
            switch (settings.position.verticalDialog) {
                case Enum.Position.top:
                    position.y = refOffset.top + (refHeight / 2);
                    break;
                case Enum.Position.bottom:
                    position.y = refOffset.top + (refHeight / 2) - elHeight;
                    break;
                default: // middle
                    position.y = refOffset.top + (refHeight / 2) - (elHeight / 2);
                    break;
            }
        }
        return position;
    }

    function _addArrowOffset(position, settings) {
        switch (settings.arrow.position) {
            case Enum.Position.top:
                position.y += settings.arrow.width;
                position.y += ((settings.position.offset !== undefined) ? settings.position.offset : 0);
                break;
            case Enum.Position.bottom:
                position.y -= settings.arrow.width;
                position.y -= ((settings.position.offset !== undefined) ? settings.position.offset : 0);
                break;
            case Enum.Position.right:
                position.x -= settings.arrow.width;
                position.x -= ((settings.position.offset !== undefined) ? settings.position.offset : 0);
                break;
            default: //left
                position.x += settings.arrow.width;
                position.x += ((settings.position.offset !== undefined) ? settings.position.offset : 0);
                break;
        }
        return position;
    }

    function _respectBoundaries(position, elWidth, elHeight, elemExtension, pointOfOrigin) {
        var globalDim = popupManager.getDimensions(),
            appDim = brease.appElem.getBoundingClientRect(),
            maxWidth = pointOfOrigin !== Enum.PointOfOrigin.WINDOW ? Math.min(_getRefWidth(Enum.PointOfOrigin.APP, undefined, appDim.width), globalDim.winWidth) : globalDim.winWidth,
            maxHeight = pointOfOrigin !== Enum.PointOfOrigin.WINDOW ? Math.min(_getRefHeight(Enum.PointOfOrigin.APP, undefined, appDim.height), globalDim.winHeight) : globalDim.winHeight;

        if (position.x + elWidth + elemExtension.right > maxWidth) {
            position.x = maxWidth - (elWidth + elemExtension.right);
        }
        if (position.x - elemExtension.left < 0) {
            position.x = elemExtension.left;
        }
        if (position.y + elHeight + elemExtension.bottom > maxHeight) {
            position.y = maxHeight - (elHeight + elemExtension.bottom);
        }
        if (position.y - elemExtension.top < 0) {
            position.y = elemExtension.top;
        }
        return position;
    }

    // A&P 617780: getoffset() : gets the current coordinates of the first element in the set of matched elements, RELATIVE TO THE DOCUMENT, so we  have to call getBoundingClientRect().
    // element.getBoundingClientRect(): returns the size of an element and its position relative to the viewport
    function _getRefOffsetRelativeToViewPort(pointOfOrigin, refElement) {
        if (refElement !== undefined && pointOfOrigin !== Enum.PointOfOrigin.APP && pointOfOrigin !== Enum.PointOfOrigin.WINDOW) {
            var boundingClientRect = refElement[0].getBoundingClientRect();
            return {
                top: boundingClientRect.top,
                left: boundingClientRect.left
            };
        } else {
            return {
                top: 0, left: 0
            };
        }
    }

    function _getRefOffsetRelativeToDocument(pointOfOrigin, refElement) {
        if (refElement !== undefined && pointOfOrigin !== Enum.PointOfOrigin.APP && pointOfOrigin !== Enum.PointOfOrigin.WINDOW) {
            return refElement.offset();
        } else {
            return {
                top: 0, left: 0
            };
        }
    }
    function _getRefWidth(pointOfOrigin, refElement, appWidth) {
        if (refElement !== undefined && pointOfOrigin !== Enum.PointOfOrigin.APP && pointOfOrigin !== Enum.PointOfOrigin.WINDOW) {
            return refElement[0].getBoundingClientRect().width;
        } else {
            // e.g. for MessageBox before any page is loaded
            return (appWidth > 100) ? appWidth : window.innerWidth;
        }
    }
    function _getRefHeight(pointOfOrigin, refElement, appHeight) {
        if (refElement !== undefined && pointOfOrigin !== Enum.PointOfOrigin.APP && pointOfOrigin !== Enum.PointOfOrigin.WINDOW) {
            return refElement[0].getBoundingClientRect().height;
        } else {
            // e.g. for MessageBox before any page is loaded
            return (appHeight > 100) ? appHeight : window.innerHeight;
        }
    }

    function _loadHTML(widget) {
        require(['text!' + widget.settings.html], function (html) {
            var elemId = widget.settings.id || Utils.uniqueID('window');
            html = html.replace('WIDGETID', elemId);
            widget.deferredInit(document.body, html);
            widget.headerEl = widget.el.find('header > div');
            widget.readyHandler();
            brease.uiController.parse(widget.elem);
        });
    }

    function _updateModalOverlays() {
        var index,
            maxIndex = 0,
            currentObject,
            activObject,
            overlays = $('.breaseModalDimmer:visible');

        for (var i = 0; i < overlays.length; i += 1) {
            currentObject = $(overlays[i]);
            currentObject.removeClass('active');
            index = currentObject.css('z-index');
            if (index > maxIndex) {
                maxIndex = index;
                activObject = currentObject;
            }
        }

        if (activObject) {
            activObject.addClass('active');
        }
    }

    var _safe;

    function _disableScroll() {
        this.dimmer.on('mousewheel DOMMouseScroll', _preventDefault);
        if (!_safe) {
            _safe = {
                x: brease.bodyEl.css('overflow-x'),
                y: brease.bodyEl.css('overflow-y')
            };
        }
        document.body.style.overflow = 'hidden';
    }

    function _enableScroll() {
        if ($('.breaseModalDimmer:visible').length === 0 && this.dimmer) {
            this.dimmer.off('mousewheel DOMMouseScroll', _preventDefault);
            brease.bodyEl.css('overflow-x', _safe.x);
            brease.bodyEl.css('overflow-y', _safe.y);
        }
    }

    function _preventDefault(e) {
        e.preventDefault();
    }

    return languageDependency.decorate(WidgetClass, true);

});
