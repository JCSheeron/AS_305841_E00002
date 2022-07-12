define(['brease/core/Utils'],
    function (Utils) {

        /**
        * @class system.widgets.KeyBoard.libs.InputProcessor
        * #Description
        * Processes valid user input to the InputElement of the 
        * virtual keyboard or to the Widget depending on the 
        * pressed buttons
        */

        'use strict';
        function InputProcessor() {
            var self = this,
                cursor;

            self.init = function (eventDispatcher, widget, sharedCursor) {
                cursor = sharedCursor || {};
                self.widget = widget;
                self.eventDispatcher = eventDispatcher;
                self.eventDispatcher.addEventListener('Validator.Set', self.onSet);
                self.eventDispatcher.addEventListener('Validator.Change', self.onChange);
                self.eventDispatcher.addEventListener('Validator.Input', self.onInput);
                self.eventDispatcher.addEventListener('Collector.Delete', self.onDelete);
                self.eventDispatcher.addEventListener('Collector.CursorLeft', self.onCursorLeft);
                self.eventDispatcher.addEventListener('Collector.CursorRight', self.onCursorRight);
                self.eventDispatcher.addEventListener('Collector.Clear', self.onClear);
                self.eventDispatcher.addEventListener('Validator.Submit', self.onSubmit);
                self.eventDispatcher.addEventListener('Validator.CandidateInput', self.onCandidateInput);
                self.inputElem = widget.inputElem;
            };

            /**
            * @method setOptions
            * Used to set attributes on the input element e.g.: type="password",...
            * @param {Object} options
            * @param {Integer} options.maxLength
            * @param {String} options.type
            */
            self.setOptions = function (options) {
                if (options.type !== undefined) {
                    this.inputElem.setAttribute('type', options.type);
                }
                if (options.maxLength !== undefined) {
                    this.inputElem.setAttribute('maxlength', parseInt(options.maxLength, 10));
                } else {
                    this.inputElem.removeAttribute('maxlength');
                }
            };

            /**
            * @method onSet
            * Called after the initial value has been validated
            * @param {Object} e
            * @param {Object} e.detail
            * @param {String} e.detail.value
            */
            self.onSet = function (e) {
                var value = e.detail.value;
                self.inputElem.value = value;
                cursor.pos = value.length;
                _sendChange();
            };

            function _sendChange() {

                /**
                * @event Processor.Change
                * Fired after value of the Input element has been changed
                * @eventComment
                */
                self.eventDispatcher.dispatchEvent({
                    type: 'Processor.Change',
                    detail: {
                        'value': self.inputElem.value
                    }
                });
                self.eventDispatcher.dispatchEvent({
                    type: 'Input.Focus'
                });
            }

            /**
            * @method onChange
            * Called after value has been validated due to a 
            * change by using the hardware keyboard. Value contains
            * the complete value of the inputField
            * @param {Object} e
            * @param {Object} e.detail
            * @param {String} e.detail.value
            */
            self.onChange = function (e) {
                if (!e.isComposing) {
                    var value = e.detail.value;
                    cursor.pos = self.inputElem.selectionStart;

                    if (e.detail.originalValue !== undefined && e.detail.value.length !== e.detail.originalValue.length) {
                        cursor.pos -= Math.abs(e.detail.value.length - e.detail.originalValue.length);
                    }
                    self.inputElem.value = value;

                    _sendChange();
                }
            };

            /**
            * @method onChange
            * Called after value has been validated due to a 
            * change by using the onscreen keyboard. detail.value contains
            * a single character
            * @param {Object} e
            * @param {Object} e.detail
            * @param {String} e.detail.value
            */
            self.onInput = function (e) {
                if (!e.isComposing) {
                    var value = '';
                    if (Utils.isString(e.detail.value)) {
                        value = e.detail.value;
                    }
                    cursor.pos = self.inputElem.selectionStart + value.length;
                    self.inputElem.setRangeText(value, self.inputElem.selectionStart, self.inputElem.selectionEnd, 'end');
                    self.eventDispatcher.dispatchEvent({
                        type: 'Processor.Change',
                        detail: {
                            'value': self.inputElem.value
                        }
                    });
                    self.eventDispatcher.dispatchEvent({
                        type: 'Input.Focus'
                    });
                }
            };

            /**
            * @method onDelete
            * Called if the user clicks on a action button with action delete
            */
            self.onDelete = function (e) {
                if (!e.isComposing) {
                    if (self.inputElem.selectionEnd > 0) {

                        if (self.inputElem.selectionStart !== self.inputElem.selectionEnd) {
                            cursor.pos = self.inputElem.selectionStart;
                            self.inputElem.setRangeText('', self.inputElem.selectionStart, self.inputElem.selectionEnd, 'start');
                        } else {
                            cursor.pos = self.inputElem.selectionEnd - 1;
                            self.inputElem.setRangeText('', self.inputElem.selectionEnd - 1, self.inputElem.selectionEnd, 'start');
                        }
                    }
                    self.eventDispatcher.dispatchEvent({
                        type: 'Processor.Change',
                        detail: {
                            'value': self.inputElem.value
                        }
                    });
                    self.eventDispatcher.dispatchEvent({
                        type: 'Input.Focus'
                    });
                }
               
            };

            self.onCursorLeft = function (e) {
                if (!e.isComposing) {
                    var cursorPosition = self.inputElem.selectionStart - 1;
                    if (cursorPosition >= 0) {
                        self.inputElem.setSelectionRange(cursorPosition, cursorPosition);
                    }
                    cursor.pos = self.inputElem.selectionStart;
                    self.eventDispatcher.dispatchEvent({
                        type: 'Input.Focus'
                    });
                }
            };

            self.onCursorRight = function (e) {
                if (!e.isComposing) {
                    var cursorPosition = self.inputElem.selectionStart + 1;
                    self.inputElem.setSelectionRange(cursorPosition, cursorPosition);
                    cursor.pos = self.inputElem.selectionStart;
                    self.eventDispatcher.dispatchEvent({
                        type: 'Input.Focus'
                    });
                }
            };

            self.setSelectionRange = function (pos1, pos2) {
                self.inputElem.setSelectionRange(pos1, pos2);
                cursor.pos = self.inputElem.selectionEnd;
            };

            self.onClear = function (e) {
                if (!e.isComposing) {
                    self.inputElem.value = '';
                    cursor.pos = 0;
                    self.eventDispatcher.dispatchEvent({
                        type: 'Input.Focus'
                    });
                }
            };

            self.onSubmit = function (e) {
                /**
                * @event Processor.Submit
                * Fired in order to send the new value to the InputWidget
                * @eventComment
                */
                self.eventDispatcher.dispatchEvent({ type: 'Processor.Submit', detail: { 'value': e.detail.value } });
            };

            /**
            * @method onCandidateInput
            * Called after value has been validated due to the user
            * pressing on a candidate on the onscreen keyboard.
            * @param {Object} e
            * @param {Object} e.detail
            * @param {String} e.detail.value
            */
            self.onCandidateInput = function (e) {
                if (!e.isComposing) {
                    var value = '';
                    if (Utils.isString(e.detail.value)) {
                        value = e.detail.value;
                    }
                    cursor.pos = self.inputElem.selectionStart + value.length;
                    self.inputElem.setRangeText(value, self.inputElem.selectionStart, self.inputElem.selectionEnd, 'end');
                    self.eventDispatcher.dispatchEvent({
                        type: 'Processor.Change',
                        detail: {
                            'value': self.inputElem.value
                        }
                    });
                    self.eventDispatcher.dispatchEvent({
                        type: 'Input.Focus'
                    });
                }
            };
        }
        var p = InputProcessor.prototype;

        p.dispose = function () {
            this.eventDispatcher.removeEventListener('Validator.Set', this.onSet);
            this.eventDispatcher.removeEventListener('Validator.Change', this.onChange);
            this.eventDispatcher.removeEventListener('Validator.Input', this.onInput);
            this.eventDispatcher.removeEventListener('Collector.Delete', this.onDelete);
            this.eventDispatcher.removeEventListener('Collector.CursorLeft', this.onCursorLeft);
            this.eventDispatcher.removeEventListener('Collector.CursorRight', this.onCursorRight);
            this.eventDispatcher.removeEventListener('Collector.Clear', this.onClear);
            this.eventDispatcher.removeEventListener('Validator.Submit', this.onSubmit);
            this.eventDispatcher.removeEventListener('Validator.CandidateInput', this.onCandidateInput);
            this.inputElem = null;
        };

        return InputProcessor;
    });
