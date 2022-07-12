define(['brease/enum/Enum', 'brease/core/Types', 'brease/core/Utils'],
    function (Enum, Types, Utils) {

        /**
        * @class system.widgets.KeyBoard.libs.Composer
        * #Description
        * Composes valid user input to phonetic pronounciation in order 
        * to let the converter provide a set of candidates when using an IME.
        */

        'use strict';
        // list of hardware keys which are allowed to reach the input element while
        // the composer is not composing any values (Backspace, ArrowKeys,...)
        var passThroughKeyCodes = [37, 39, 32, 8],
            composingInputElem = document.createElement('input'); 
        composingInputElem.setAttribute('type', 'text');

        function Composer() {
            var self = this;
            this.mode = Enum.IMEMode.DISABLED;
            composingInputElem.value = '';

            /**
            * @method onChange
            * Called if the value of the input field has been changed
            * due to KeyEvents of the hardware keyboard 
            */
            self.onChange = function (e) {
                if (self.isActive()) {
                    if (_isBackspace(e)) {
                        self.onDelete(e);
                    } else if (!_isSpace(e) || (self.isComposing() && _isSpace(e))) {
                        var value = _isSingleChar(e.key) ? e.key : '';
                        _insertChar(value);

                        /**
                        * @event Composer.Change
                        * Fired when the composed value was changed
                        * @eventComment
                        */
                        self.eventDispatcher.dispatchEvent({
                            type: 'Composer.Change',
                            detail: {
                                'value': self.getValue()
                            }
                        });

                        e.isComposing = self.isComposing();
                    }
                }
            };

            /**
            * @method onInput
            * Called if the value of the input field has been changed
            * due to Events fired by the Softkeys on the virtual keyboard
            */
            self.onInput = function (e) {
                if (self.isActive()) {
                    var value = Utils.isString(e.detail.value) ? e.detail.value : '',
                        spaceValue = String.fromCharCode(160); // no-break space
                    // space only allowed if there is already a value in composition
                    // in order to have the same behavior when pressing space on the 
                    // hardware keyboard
                    if (value !== spaceValue || (self.isComposing() && value === spaceValue)) {
                        composingInputElem.setRangeText(value, composingInputElem.selectionStart, composingInputElem.selectionEnd, 'end');
                        self.eventDispatcher.dispatchEvent({
                            type: 'Composer.Change',
                            detail: {
                                'value': self.getValue()
                            }
                        });
                        e.isComposing = self.isComposing();
                    }

                }
            };

            /**
            * @method onDelete
            * Called if the user clicks on a action button with action delete
            */
            self.onDelete = function (e) {
                if (self.isActive()) {
                    e.isComposing = self.isComposing();
                    if (composingInputElem.selectionEnd > 0) {
                        if (composingInputElem.selectionStart !== composingInputElem.selectionEnd) {
                            composingInputElem.setRangeText('', composingInputElem.selectionStart, composingInputElem.selectionEnd, 'start');
                        } else {
                            composingInputElem.setRangeText('', composingInputElem.selectionEnd - 1, composingInputElem.selectionEnd, 'start');
                        }
                    }
                    self.eventDispatcher.dispatchEvent({
                        type: 'Composer.Change',
                        detail: {
                            'value': self.getValue()
                        }
                    });
                }
            };

            self.onCursorLeft = function (e) {
                if (self.isActive()) {
                    // handle value
                    e.isComposing = self.isComposing();
                }
            };

            self.onCursorRight = function (e) {
                if (self.isActive()) {
                    // handle value
                    e.isComposing = self.isComposing();
                }
            };

            self.onClear = function (e) {
                if (self.isActive()) {
                    e.isComposing = self.isComposing();
                    self.setValue('');
                }
            };

            self.onSubmit = function (e) {
                self.setValue('');
            };

            /**
            * @method onKeyDown
            * Called when the KeyCollector detects a KeyEvent from the hardware keyboard.
            * Used to prevent adding values to the input element of the virtual keyboard while
            * the composer is active
            */
            self.onKeyDown = function (e) {
                var isPassThroughKey = _isPassThroughKey(e.originalEvent);
                if ((self.isActive() && !isPassThroughKey) || (self.isComposing() && isPassThroughKey)) {
                    e.isComposing = self.isComposing();
                    e.originalEvent.preventDefault();
                }
            };

            /**
            * @method compose
            * called after the composition value has been changed in order to convert it to 
            * phonetical characters
            */
            self.compose = function (e) {
                if (self.isActive()) {
                    self.eventDispatcher.dispatchEvent({
                        type: 'Composer.CompositionUpdate',
                        detail: {
                            'values': _getComposedValues(self.getValue())
                        }
                    });
                }
            };

            /**
            * @method onCandidateInput
            * called after a candidate has been selected by the user
            */
            self.onCandidateInput = function () {
                self.setValue('');
            };

            /**
            * @method onCandidateInput
            * called when the keyboard is closed
            */
            self.onHide = function () {
                self.setValue('');
            };
        }

        var p = Composer.prototype;
        p.init = function (eventDispatcher) {
            this.eventDispatcher = eventDispatcher;
            this.eventDispatcher.addEventListener('Validator.Change', this.onChange);
            this.eventDispatcher.addEventListener('Validator.Input', this.onInput);
            this.eventDispatcher.addEventListener('Collector.Delete', this.onDelete);
            this.eventDispatcher.addEventListener('Collector.CursorLeft', this.onCursorLeft);
            this.eventDispatcher.addEventListener('Collector.CursorRight', this.onCursorRight);
            this.eventDispatcher.addEventListener('Collector.Clear', this.onClear);
            this.eventDispatcher.addEventListener('Validator.Submit', this.onSubmit);
            this.eventDispatcher.addEventListener('Collector.KeyDown', this.onKeyDown);
            this.eventDispatcher.addEventListener('Composer.Change', this.compose);
            this.eventDispatcher.addEventListener('Validator.CandidateInput', this.onCandidateInput);
            this.eventDispatcher.addEventListener('Keyboard.Hide', this.onHide);
        };

        /**
        * @method setMode
        * Used to define the IME mode
        * @param {brease.enum.IMEMode} mode='disabled'
        */
        p.setMode = function (mode) {
            this.mode = Types.parseValue(mode, 'Enum', { Enum: Enum.IMEMode, default: 'disabled' });
            this.setValue('');
        };

        /**
        * @method getMode
        * @return {brease.enum.IMEMode} mode
        */
        p.getMode = function () {
            return this.mode;
        };

        /**
        * @method isActive
        * returns wether the composer is active depending on the mode property.
        * @return {Boolean} isActive
        */
        p.isActive = function () {
            return this.getMode() !== Enum.IMEMode.DISABLED;
        };

        /**
        * @method isComposing
        * returns wether the composer is currently composing values. 
        * @return {Boolean} isComposing
        */
        p.isComposing = function () {
            return this.isActive() && this.getValue().length > 0;
        };

        p.setValue = function (value) {
            if (value !== this.getValue()) {
                composingInputElem.value = Types.parseValue(value, 'String');
                this.eventDispatcher.dispatchEvent({
                    type: 'Composer.Change',
                    detail: {
                        'value': this.getValue()
                    }
                });
            }
            
        };

        p.getValue = function () {
            return composingInputElem.value;
        };

        p.dispose = function () {
            composingInputElem.value = '';
            this.mode = Enum.IMEMode.DISABLED;
            this.eventDispatcher.removeEventListener('Validator.Change', this.onChange);
            this.eventDispatcher.removeEventListener('Validator.Input', this.onInput);
            this.eventDispatcher.removeEventListener('Collector.Delete', this.onDelete);
            this.eventDispatcher.removeEventListener('Collector.CursorLeft', this.onCursorLeft);
            this.eventDispatcher.removeEventListener('Collector.CursorRight', this.onCursorRight);
            this.eventDispatcher.removeEventListener('Collector.Clear', this.onClear);
            this.eventDispatcher.removeEventListener('Validator.Submit', this.onSubmit);
            this.eventDispatcher.removeEventListener('Collector.KeyDown', this.onKeyDown);
            this.eventDispatcher.removeEventListener('Composer.Change', this.compose);
            this.eventDispatcher.removeEventListener('Validator.CandidateInput', this.onCandidateInput);
            this.eventDispatcher.removeEventListener('Keyboard.Hide', this.onHide);
        };

        // used to prevent the composition of special characters like shift and so on
        function _isSingleChar(value) {
            return typeof value === 'string' && value.length < 2;
        }

        // used to identify if the hardware key is allowed to be processed by the input element
        function _isPassThroughKey(e) {
            return passThroughKeyCodes.indexOf(e.which) !== -1;
        }

        function _isBackspace(e) {
            return e.which === 8;
        }

        function _isSpace(e) {
            return e.which === 32;
        }

        // used insert a character at the current cursor position of the composingInputElem
        function _insertChar(value) {
            composingInputElem.setRangeText(value, composingInputElem.selectionStart, composingInputElem.selectionEnd, 'end');
        }

        function _getComposedValues(value) {
            return [value];
        }
        return Composer;
    });
