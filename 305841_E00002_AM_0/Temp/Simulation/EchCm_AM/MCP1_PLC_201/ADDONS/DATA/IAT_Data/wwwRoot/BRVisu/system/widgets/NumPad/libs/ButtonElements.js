define(['brease/events/EventDispatcher', 'brease/events/BreaseEvent', 'brease/core/Utils'],
    function (EventDispatcher, BreaseEvent, Utils) {

        'use strict';

        var ButtonElements = function (widget) {
            this.buttons = {};
            this.widget = widget;
            this.el = widget.el;
            this.buttonClickHandler = this.buttonClickHandler.bind(this);
            this.buttonDownHandler = this.buttonDownHandler.bind(this);
            this.buttonUpHandler = this.buttonUpHandler.bind(this);
        };

        ButtonElements.prototype = new EventDispatcher();

        ButtonElements.prototype.init = function () {
            this.buttons = {
                'sign': this.el.find('[data-action="sign"]'),
                'comma': this.el.find('[data-action="comma"]'),
                'delete': this.el.find('[data-action="delete"]'),
                'enter': this.el.find('[data-action="enter"]'),
                'close': this.el.find('[data-action="close"]'),
                'clear': this.el.find('[data-action="clear"]')
            };
            this.clickEventName = _getEventConfig(brease.config.virtualKeyboards);
        };

        ButtonElements.prototype.get = function (buttonId) {
            return this.buttons[buttonId];
        };

        ButtonElements.prototype.signChangeListener = function (e) {
            if (this.buttons.sign) {
                if (e.detail.sign === -1) {
                    this.buttons.sign.addClass('active');
                } else {
                    this.buttons.sign.removeClass('active');
                }
            }
        };

        ButtonElements.prototype.addListeners = function () {
            this.clickEventName = _getEventConfig(brease.config.virtualKeyboards);
            this.el.find('[data-action]').on(BreaseEvent.MOUSE_DOWN, this.buttonDownHandler).on(this.clickEventName, this.buttonClickHandler);
        };

        ButtonElements.prototype.removeListeners = function () {
            this.el.find('[data-action]').off();
            brease.docEl.off(BreaseEvent.MOUSE_UP, this.buttonUpHandler);
        };

        ButtonElements.prototype.reset = function () {
            if (this.activeButton) {
                Utils.removeClass(this.activeButton, 'active');
            }
            this.activeButton = undefined;
        };

        ButtonElements.prototype.buttonDownHandler = function (e) {
            if (this.activeButton) {
                Utils.removeClass(this.activeButton, 'active');
            }
            this.activeButton = this.startButton = e.currentTarget;
            Utils.addClass(this.activeButton, 'active');
            brease.docEl.on(BreaseEvent.MOUSE_UP, this.buttonUpHandler);
        };

        ButtonElements.prototype.buttonUpHandler = function () {
            brease.docEl.off(BreaseEvent.MOUSE_UP, this.buttonUpHandler);
            Utils.removeClass(this.activeButton, 'active');
            this.activeButton = undefined;
        };

        ButtonElements.prototype.buttonClickHandler = function (e) {
            this.widget._handleEvent(e, true);

            var button = $(e.currentTarget),
                action = '' + button.attr('data-action'),
                value = button.attr('data-value');

            // trigger the action only if down-event and click-event occur on the same button (or if buttonClickHandler is triggered directly)
            if (this.startButton === undefined || this.startButton === e.currentTarget) {
                this.triggerAction(action, value);
            }
            this.startButton = undefined;
        };

        ButtonElements.prototype.triggerAction = function (action, value) {
            /**
            * @event ButtonAction
            * @param {String} action
            * @param {String} value
            */
            this.dispatchEvent({
                type: 'ButtonAction',
                detail: {
                    'action': action,
                    'value': value
                }
            });
        };

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

        return ButtonElements;
    });
