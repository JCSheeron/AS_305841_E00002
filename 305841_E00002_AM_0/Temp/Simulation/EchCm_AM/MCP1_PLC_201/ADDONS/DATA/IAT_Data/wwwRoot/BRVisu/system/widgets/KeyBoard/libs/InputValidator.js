define(['brease/core/Utils'],
    function (Utils) {
        /**
        * @class system.widgets.KeyBoard.libs.InputValidator
        * #Description
        * Validates user input depending on pressed buttons on the 
        * virtual keyboard or on input received by pressing keys on 
        * the hardware keybaord
        */
        'use strict';
        function InputValidator() {
            var self = this;
            self.value = '';

            /**
            * @method setValue
            * Called when a valid value has been received by the InputProcessor
            * in order to update the internal value
            */
            self.setValue = function (e) {
                self.value = e.detail.value;
            };

            /**
            * @method getValue
            * returns the internal value
            */
            self.getValue = function () {
                return self.value;
            };

            /**
            * @method setRestriction
            * set the input restriction. Keys which do not pass
            * a test against that restriction will be ignored
            * @param {RegEx} restriction
            */
            self.setRestriction = function (restriction) {
                if (restriction) {
                    self.regexp = new RegExp(restriction);
                } else {
                    self.regexp = undefined;
                }
            };

            /**
            * @method setMaxLength
            * set the maxLength
            * @param {Integer} maxLength
            */
            self.setMaxLength = function (maxLength) {
                self.maxLength = maxLength;
            };

            /**
            * @method inputIsAllowed
            * validate if input of a character is allowed  
            * @param {String} value
            * @return {Boolean}
            */
            self.inputIsAllowed = function (value) {
                var actValue = self.getValue(),
                    actLength = (Utils.isString(actValue)) ? actValue.length : 0,
                    allowed = true;

                if (!Utils.isString(value) || (self.maxLength !== undefined && actLength + value.length > self.maxLength)) {
                    allowed = false;
                }
                return allowed;
            };

            /**
            * @method onSet
            * called in order to validate the complete value on the input field. 
            * The Collector.Set event is fired by the keyboard widget after being opened
            * @param {Object} e
            * @param {Object} e.detail
            * @param {String} e.detail.value
            */
            self.onSet = function (e) {
                var value = self.validate(e.detail.value);
                /**
                * @event Validator.Set
                * Fired after the initial value provided by the keyboard widget has been validated
                * @eventComment
                */
                self.eventDispatcher.dispatchEvent({
                    type: 'Validator.Set',
                    detail: {
                        'value': value
                    }
                });
            };

            /**
            * @method onChange
            * called when a Collector.Change event was dispatched due 
            * to the InputElement being edited by the hardware keyboard. 
            * The value will contain the complete value of the Input Element
            * @param {Object} e
            * @param {Object} e.detail
            * @param {String} e.detail.value
            */
            self.onChange = function (e) {
                var inputValue = e.detail.value,
                    validatedValue = self.validate(inputValue);

                /**
                * @event Validator.Change
                * Fired after the changed value of the input field has been validated
                * @eventComment
                */
                var data = {
                    type: 'Validator.Change',
                    detail: {
                        'value': validatedValue,
                        'originalValue': inputValue
                    }
                };
                if (e.key !== undefined) {
                    data.key = e.key;
                }
                if (e.which !== undefined) {
                    data.which = e.which;
                }
                self.eventDispatcher.dispatchEvent(data);
            };

            /**
            * @method onInput
            * called when a Collector.Input event was dispatched due 
            * to the User pressing a button on the virtual keyboard. 
            * The value will contain a single character.
            * @param {Object} e
            * @param {Object} e.detail
            * @param {String} e.detail.value
            */
            self.onInput = function (e) {
                var value = '';
                if (self.inputIsAllowed(e.detail.value)) {
                    value = self.validate(e.detail.value);
                }

                /**
                * @event Validator.Input
                * Fired after the value of a single button has been validated
                * @eventComment
                */
                self.eventDispatcher.dispatchEvent({
                    type: 'Validator.Input',
                    detail: {
                        'value': value
                    }
                });
            };

            /**
            * @method onSubmit
            * called when the submit button or the enter key on the hardware keyboard
            * has been pressed in order to validate the current value before sending
            * the change to the Input Widget
            */
            self.onSubmit = function () {
                var submitValue = self.validate(self.value);

                /**
                * @event Validator.Submit
                * Fired after the value of the input field has been validated and is
                * ready to be submitted to the InputWidget
                * @eventComment
                */
                self.eventDispatcher.dispatchEvent({
                    type: 'Validator.Submit',
                    detail: {
                        'value': submitValue
                    }
                });
            };

            self.onClear = function () {
                self.setValue({ detail: { value: '' } });
            };

            /**
            * @method validate
            * validates each character of a value against the input restriction.
            * @param {String} value
            */
            self.validate = function (value) {
                return self.regexp === undefined ? value : value.split('').filter(function (actChar) {
                    return self.regexp.test(actChar);
                }).join('');
            };

            /**
            * @method onCompositionUpdate
            * validates each character of a value against the input restriction.
            * @param {Object} e
            * @param {Object} e.detail
            * @param {Array} e.detail.values
            */
            self.onCompositionUpdate = function (e) {
                var values = Array.isArray(e.detail.values) ? e.detail.values : [];
                values = values.map(self.validate).filter(_removeEmpty);

                /**
                * @event Validator.CompositionUpdate
                * Fired after the composed values have been validated in order to inform the 
                * Converter
                * @eventComment
                */
                self.eventDispatcher.dispatchEvent({
                    type: 'Validator.CompositionUpdate',
                    detail: {
                        'values': values
                    }
                });

            };

            /**
            * @method onCandidatesChange
            * validates each candidate against the input restriction.
            * @param {Object} e
            * @param {Object} e.detail
            * @param {Array} e.detail.candidates
            */
            self.onCandidatesChange = function (e) {
                var candidates = Array.isArray(e.detail.candidates) ? e.detail.candidates : [],
                    query = Array.isArray(e.detail.query) ? e.detail.query : [];
                candidates = candidates.map(self.validate).filter(_removeEmpty);
                query = query.map(self.validate).filter(_removeEmpty);
                /**
                * @event Validator.CandidatesChange
                * Fired after the candidates have been validated in order to inform the 
                * Converter
                * @eventComment
                */
                self.eventDispatcher.dispatchEvent({
                    type: 'Validator.CandidatesChange',
                    detail: {
                        'candidates': candidates,
                        'query': query
                    }
                });

            };

            /**
            * @method onCandidateInput
            * Called when a Collector.CandidateInput event was dispatched due 
            * to the User pressing on a Candidate inside of the IME Window of the virtual keyboard. 
            * @param {Object} e
            * @param {Object} e.detail
            * @param {String} e.detail.value
            */
            self.onCandidateInput = function (e) {
                var value = '';
                if (self.inputIsAllowed(e.detail.value)) {
                    value = self.validate(e.detail.value);
                }

                /**
                * @event Validator.CandidateInput
                * Fired after the value of a single button has been validated
                * @eventComment
                */
                self.eventDispatcher.dispatchEvent({
                    type: 'Validator.CandidateInput',
                    detail: {
                        'value': value
                    }
                });
            };

        }

        var p = InputValidator.prototype;

        p.init = function (eventDispatcher, widget) {
            this.widget = widget;
            this.eventDispatcher = eventDispatcher;
            this.eventDispatcher.addEventListener('Collector.Set', this.onSet);
            this.eventDispatcher.addEventListener('Collector.Change', this.onChange);
            this.eventDispatcher.addEventListener('Collector.Input', this.onInput);
            this.eventDispatcher.addEventListener('Collector.Submit', this.onSubmit);
            this.eventDispatcher.addEventListener('Collector.Clear', this.onClear);
            this.eventDispatcher.addEventListener('Processor.Change', this.setValue);
            this.eventDispatcher.addEventListener('Composer.CompositionUpdate', this.onCompositionUpdate);
            this.eventDispatcher.addEventListener('Converter.CandidatesChange', this.onCandidatesChange);
            this.eventDispatcher.addEventListener('Collector.CandidateInput', this.onCandidateInput);
        };

        p.dispose = function () {
            this.eventDispatcher.removeEventListener('Collector.Set', this.onSet);
            this.eventDispatcher.removeEventListener('Collector.Change', this.onChange);
            this.eventDispatcher.removeEventListener('Collector.Input', this.onInput);
            this.eventDispatcher.removeEventListener('Collector.Submit', this.onSubmit);
            this.eventDispatcher.removeEventListener('Collector.Clear', this.onClear);
            this.eventDispatcher.removeEventListener('Processor.Change', this.setValue);
            this.eventDispatcher.removeEventListener('Composer.CompositionUpdate', this.onCompositionUpdate);
            this.eventDispatcher.removeEventListener('Converter.CandidatesChange', this.onCandidatesChange);
            this.eventDispatcher.removeEventListener('Collector.CandidateInput', this.onCandidateInput);
            this.value = '';
            this.restriction = undefined;
        };

        function _removeEmpty(value) {
            return value.length !== 0;
        }
        return InputValidator;
    });
