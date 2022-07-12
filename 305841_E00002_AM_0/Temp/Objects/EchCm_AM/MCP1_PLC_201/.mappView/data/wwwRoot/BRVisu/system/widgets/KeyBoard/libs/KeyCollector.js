define(['brease/events/BreaseEvent', 'brease/core/Utils'],
    function (BreaseEvent, Utils) {
        /**
        * @class system.widgets.KeyBoard.libs.KeyCollector
        * #Description
        * Handles InputEvents triggered by the user inside of the Keyboard
        */
        'use strict';
        function KeyCollector() {
            var self = this;
            self.value = '';
            self.layer = 1;
            self.capslock = false;
            self.shift = false;
            self.special = false;
            self.init = function (eventDispatcher, widget) {
                self.widget = widget;
                self.eventDispatcher = eventDispatcher;
                self.clickEventName = _getEventConfig(brease.config.virtualKeyboards);
                self.widget.el.on('keyup', '.ValueOutput', self.onKeyUp);
                self.widget.el.on('keydown', '.ValueOutput', self.onKeyDown);
                self.widget.el.on(BreaseEvent.MOUSE_DOWN, '.ValueButton, .ActionButton, .ActionImage', self.onButtonMouseDown);
                self.widget.el.on(self.clickEventName, '.ValueButton', self.onValueButtonClick);
                self.widget.el.on(self.clickEventName, '.ActionButton', self.onActionButtonClick);
                self.widget.el.on(self.clickEventName, '.ActionImage', self.onActionButtonClick);
                self.widget.el.on(BreaseEvent.MOUSE_DOWN, '.breaeIMECandidate', self.onIMECandidateMouseDown);
                self.eventDispatcher.addEventListener('Keyboard.Hide', _reset);
                self.valueButtons = self.widget.el.find('.ValueButton');
            };
            /**
            * @method onButtonMouseDown
            * Called if a mousedown event was fired on a button element
            * in order to set the active state
            */
            self.onButtonMouseDown = function () {
                if (self.activeButton) {
                    Utils.removeClass(self.activeButton, 'active');
                }
                self.activeButton = this;
                Utils.addClass(self.activeButton, 'active');
                brease.docEl.on(BreaseEvent.MOUSE_UP, self.onButtonMouseUp);
            };
            /**
            * @method onButtonMouseUp
            * Called if a mouseup event was fired on a button element
            * in order to remove the active state. 
            */
            self.onButtonMouseUp = function () {
                brease.docEl.off(BreaseEvent.MOUSE_UP, self.onButtonMouseUp);
                Utils.removeClass(self.activeButton, 'active');
                self.activeButton = undefined;
                /**
                * @event Input.Focus
                * Fired in order to set focus on the Input element   
                * @eventComment
                */
                self.eventDispatcher.dispatchEvent({
                    type: 'Input.Focus'
                });
            };

            /**
            * @method onValueButtonClick
            * Called if a click event was fired on a value button element
            * in order to publish the value depending on the current layer. 
            */
            self.onValueButtonClick = function (e) {
                var value = _getValueByLayer(this, self.layer);
                /**
                * @event Collector.Input
                * Fired if the user clicks on a value button   
                * @eventComment
                */
                self.eventDispatcher.dispatchEvent({
                    type: 'Collector.Input',
                    detail: {
                        'value': value
                    }
                });
                if (self.shift && !self.capslock) {
                    self.widget.el.find('[data-action="shift"]').removeClass('selected');
                    self.shift = false;
                    self.layer = 1;
                    _switchLayer();
                }
            };
            /**
            * @method onActionButtonClick
            * Called if a click event was fired on a action button element
            * in order to publish the action. 
            */
            self.onActionButtonClick = function (e) {
                var action = this.getAttribute('data-action');
                switch (action) {

                    case 'delete':
                        /**
                        * @event Collector.Delete
                        * Fired if the user clicks on a action button with action delete 
                        * @eventComment
                        */
                        self.eventDispatcher.dispatchEvent({ type: 'Collector.Delete', detail: {} });
                        break;
                    case 'enter':
                        /**
                        * @event Collector.Delete
                        * Fired if the user clicks on a action button with action submit to 
                        * send the current value to the InputWidget
                        * @eventComment
                        */
                        self.eventDispatcher.dispatchEvent({ type: 'Collector.Submit' });
                        break;
                    case 'left':
                        /**
                        * @event Collector.CursorLeft
                        * Fired if the user clicks on a action button with action left to 
                        * move the cursor the the left
                        * @eventComment
                        */
                        self.eventDispatcher.dispatchEvent({ type: 'Collector.CursorLeft', detail: {} });
                        break;
                    case 'right':
                        /**
                        * @event Collector.CursorRight
                        * Fired if the user clicks on a action button with action right to 
                        * move the cursor the the right
                        * @eventComment
                        */
                        self.eventDispatcher.dispatchEvent({ type: 'Collector.CursorRight', detail: {} });
                        break;
                    case 'shift':
                        _onShift();
                        _switchLayer();
                        break;
                    case 'close':
                        /**
                        * @event Collector.Close
                        * Fired if the user clicks on a action button with action close to 
                        * hide the keyboard
                        * @eventComment
                        */
                        self.eventDispatcher.dispatchEvent({ type: 'Collector.Close' });
                        break;
                    case 'special':
                        _onSpecial();
                        _switchLayer();
                        break;
                    case 'clear':
                        /**
                        * @event Collector.Clear
                        * Fired if the user clicks on a action button with action clear to 
                        * remove the character on the current cursor position
                        * @eventComment
                        */
                        self.eventDispatcher.dispatchEvent({ type: 'Collector.Clear', detail: {} });
                        break;
                    case 'ime-next-candidates':
                        /**
                        * @event Collector.IMENextCandidates
                        * Fired if the user clicks on a action button with action ime-next-candidates to
                        * get the next set of suggested candidates
                        * @eventComment
                        */
                        self.eventDispatcher.dispatchEvent({ type: 'Collector.IMENextCandidates' });
                        break;
                    case 'ime-prev-candidates':
                        /**
                        * @event Collector.IMEPrevCandidates
                        * Fired if the user clicks on a action button with action ime-prev-candidates to
                        * get the previous set of suggested candidates
                        * @eventComment
                        */
                        self.eventDispatcher.dispatchEvent({ type: 'Collector.IMEPrevCandidates' });
                        break;
                    default:
                        console.iatWarn('keyboard action "' + action + '" not supported!');
                        break;
                }
            };

            /**
            * @method onKeyUp
            * Called if a keyup event was fired by pressing a key on the hardware keyboard
            */
            self.onKeyUp = function (e) {
                if (e.which === 13) {
                    self.eventDispatcher.dispatchEvent({ type: 'Collector.Submit' });
                } else {
                    /**
                    * @event Collector.Change
                    * Fired if the value of the InputField has been changed
                    * by using the Hardware Keyboard
                    * @eventComment
                    */
                    var data = {
                        type: 'Collector.Change',
                        detail: {
                            'value': this.value
                        }
                    };
                    if (e.key !== undefined) {
                        data.key = e.key;
                    }
                    if (e.which !== undefined) {
                        data.which = e.which;
                    }
                    self.eventDispatcher.dispatchEvent(data);
                }
            };

            /**
            * @method onKeyDown
            * Called if a keydown event was fired by pressing a key on the hardware keyboard
            */
            self.onKeyDown = function (e) {
                if (self.widget.validate(e.key, self.widget.regexp) === '') {
                    e.originalEvent.preventDefault();
                } else {
                    /**
                    * @event Collector.KeyDown
                    * Fired if a key on the hardware keyboard sent a keydown event while the 
                    * virtual keyboard has focus
                    * @param {Object} detail
                    * @param {Object} detail.originalEvent
                    * @eventComment
                    */
                    self.eventDispatcher.dispatchEvent({
                        type: 'Collector.KeyDown',
                        originalEvent: e.originalEvent
                    });
                }
            };

            self.onIMECandidateMouseDown = function () {
                if (self.activeCandidate) {
                    Utils.removeClass(self.activeCandidate, 'active');
                }
                self.wasScrolling = false;
                self.activeCandidate = this;
                self.widget.el.on(BreaseEvent.SCROLL_START, self.onIMEScroll);
                brease.docEl.on(BreaseEvent.MOUSE_UP, self.onIMECandidateMouseUp);
                Utils.addClass(self.activeCandidate, 'active');
            };

            self.onIMEScroll = function () {
                self.wasScrolling = true;
            };

            self.onIMECandidateMouseUp = function (e) {
                Utils.removeClass(self.activeCandidate, 'active');
                self.widget.el.off(BreaseEvent.SCROLL_START, self.onIMEScroll);
                brease.docEl.off(BreaseEvent.MOUSE_UP, self.onIMECandidateMouseUp);
                if (!self.wasScrolling && e.target.isSameNode(self.activeCandidate)) {
                    self.onIMECandidateClick.call(self.activeCandidate);
                }
                self.activeCandidate = null;
                self.wasScrolling = false;
            };

            self.onIMECandidateClick = function () {
                var value = '';
                value = this && typeof this.innerText === 'string' ? this.innerText : '';
                /**
                * @event Collector.CandidateInput
                * Fired if the user clicks on a Candidate   
                * @eventComment
                */
                self.eventDispatcher.dispatchEvent({
                    type: 'Collector.CandidateInput',
                    detail: {
                        'value': value
                    }
                });
            };

            self.dispose = function () {
                _reset();
                brease.docEl.off(BreaseEvent.MOUSE_UP, self.onIMECandidateMouseUp);
                if (self.widget) {
                    self.widget.el.off('keyup', '.ValueOutput', self.onKeyUp);
                    self.widget.el.off('keydown', '.ValueOutput', self.onKeyDown);
                    self.widget.el.off(BreaseEvent.MOUSE_DOWN, '.ValueButton, .ActionButton, .ActionImage', self.onButtonMouseDown);
                    self.widget.el.off(self.clickEventName, '.ValueButton', self.onValueButtonClick);
                    self.widget.el.off(self.clickEventName, '.ActionButton', self.onActionButtonClick);
                    self.widget.el.off(self.clickEventName, '.ActionImage', self.onActionButtonClick);
                    self.widget.el.off(BreaseEvent.SCROLL_START, self.onIMEScroll);
                    self.widget.el.off(BreaseEvent.MOUSE_DOWN, '.breaeIMECandidate', self.onIMECandidateMouseDown);
                    self.widget = null;
                    self.valueButtons = null;
                }
                self.eventDispatcher.removeEventListener('Keyboard.Hide', _reset);
                self.activeCandidate = null;
                self.wasScrolling = false;
            };

            // called if a button with action shift was pressed in order to handle
            // the locked state of buttons with that type.
            function _onShift() {
                if (self.shift === true && self.capslock === true) {
                    _reset();
                } else if (self.shift === true && self.capslock === false) {
                    self.special = false;
                    self.capslock = true;
                    self.layer = 2;
                } else {
                    self.widget.el.find('[data-action="special"]').removeClass('selected');
                    self.widget.el.find('[data-action="shift"]').addClass('selected');
                    self.special = false;
                    self.shift = true;
                    self.layer = 2;
                }
                self.eventDispatcher.dispatchEvent({
                    type: 'Input.Focus'
                });
            }

            // called if a button with action special was pressed in order to handle
            // the locked state of buttons with that type.
            function _onSpecial() {
                if (self.special === true) {
                    _reset();
                } else {
                    self.widget.el.find('[data-action="special"]').addClass('selected');
                    self.widget.el.find('[data-action="shift"]').removeClass('selected');
                    self.shift = false;
                    self.capslock = false;
                    self.special = true;
                    self.layer = 3;
                }
                self.eventDispatcher.dispatchEvent({
                    type: 'Input.Focus'
                });
            }

            // switch the key layers for shift and special characters
            function _switchLayer() {
                var attr,
                    shiftAttr,
                    specAttr;

                switch (self.layer) {
                    case 1:
                        attr = 'display';
                        shiftAttr = 'shift-display';
                        specAttr = 'special-display';
                        break;
                    case 2:
                        attr = 'shift-display';
                        shiftAttr = '';
                        specAttr = '';
                        break;
                    case 3:
                        attr = 'special-display';
                        shiftAttr = '';
                        specAttr = '';
                        break;
                }
                self.valueButtons.each(function (index, button) {
                    var html = '';
                    if (specAttr) {
                        html += '<sub>' + button.getAttribute('data-' + specAttr) + '</sub>';
                    }
                    html += '<span>' + button.getAttribute('data-' + attr) + '</span>';
                    if (shiftAttr) {
                        html += '<sup>' + button.getAttribute('data-' + shiftAttr) + '</sup>';
                    }
                    button.innerHTML = html;
                });
            }

            // reset locked buttons
            function _reset() {
                self.shift = false;
                self.capslock = false;
                self.special = false;
                self.layer = 1;
                if (self.widget) {
                    self.widget.el.find('[data-action="special"]').removeClass('selected');
                    self.widget.el.find('[data-action="shift"]').removeClass('selected');
                    _switchLayer();
                }
            }
        }

        // get the value of a button depending on the current layer
        function _getValueByLayer(btnEl, layer) {
            var value = '';
            switch (layer) {
                case 1:
                    value = btnEl.getAttribute('data-value');
                    break;
                case 2:
                    value = btnEl.getAttribute('data-shift-value');
                    break;
                case 3:
                    value = btnEl.getAttribute('data-special-value');
                    break;
            }
            return value;
        }

        // get the configuration for input processing in order to 
        // dispatch values on either mousedown or click on a value button
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

        return KeyCollector;
    });
