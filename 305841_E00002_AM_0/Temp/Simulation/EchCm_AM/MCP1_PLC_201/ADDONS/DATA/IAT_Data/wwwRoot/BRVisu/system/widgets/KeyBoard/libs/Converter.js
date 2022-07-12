define(['brease/enum/Enum', 'brease/core/Types', 'system/widgets/KeyBoard/libs/external/dictionaries'],
    function (Enum, Types, Dictionaries) {

        /**
        * @class system.widgets.KeyBoard.libs.Converter
        * #Description
        * Looksup composed values in a dictionary in order to 
        * provide a set of candidates when using an IME
        */

        'use strict';

        function Converter() {
            var self = this;
            this.mode = Enum.IMEMode.DISABLED;
            this.index = 0;
            this.count = 8;
            this.timeout = 0;

            /**
            * @method getSuggests
            * @param {Array} query
            * get matching candidates by providing an arry of strings for lookup
            */
            self.getSuggests = function (query) {
                var candidates = [],
                    _query = Array.isArray(query) ? query : [];
                if (Dictionaries.has(self.getMode())) {
                    // requirement candidate list should only contain elements matching the pinyin value exactly
                    var patterns = _query.map(function (pattern) { return new RegExp('^' + pattern + '$', 'i'); }),
                        len = patterns.length,
                        i;
                    if (len > 0) {
                        Dictionaries.get(self.getMode()).forEach(function (val) {
                            for (i = 0; i < len; i += 1) {
                                if (patterns[i].test(val.com) === true) {
                                    // requirement candidate list should not contain duplicate entries
                                    if (candidates.indexOf(val.can) === -1) {
                                        candidates.push(val.can);
                                    }
                                    break;
                                }
                            }
                        });
                        // possible solution for keeping previously provided candidates
                        if (candidates.length === 0) {
                            candidates = self.getCandidates();
                        }
                    }
                }
                /**
                * @event Converter.CandidatesChange
                * Fired after new candidates are available in order to 
                * inform the validator to validate those candidates
                * @eventComment
                */
                self.eventDispatcher.dispatchEvent({
                    type: 'Converter.CandidatesChange',
                    detail: {
                        'candidates': candidates,
                        'query': query
                    }
                });
            };

            self.updateCandidates = function () {
                /**
                * @event Converter.UpdateCandidates
                * Inform the keyboard to update the candidate window
                * @eventComment
                */
                self.eventDispatcher.dispatchEvent({
                    type: 'Converter.UpdateCandidates',
                    detail: {
                        'candidates': self.candidates.slice(self.index, self.index + self.count),
                        'query': self.getQuery(),
                        'first': self.index === 0,
                        'last': self.index + self.count >= self.candidates.length
                    }
                });
            };

            self.onCompositionUpdate = function (e) {
                var values = e.detail.values;
                window.clearTimeout(self.timeout);
                self.timeout = window.setTimeout(self.getSuggests, 300, values);
                self.index = 0;
            };

            self.onCandidatesChange = function (e) {
                var candidates = Array.isArray(e.detail.candidates) ? e.detail.candidates : [],
                    query = Array.isArray(e.detail.query) ? e.detail.query : [];
                self.setQuery(query);
                self.setCandidates(candidates);
            };
            self.onPrevCandidates = function () {
                if (self.index > 0) {
                    self.index = self.index - self.count > 0 ? self.index - self.count : 0;
                    self.updateCandidates();
                }
            };
            self.onNextCandidates = function () {
                if (self.index + self.count < self.candidates.length) {
                    self.index += self.count;
                    self.updateCandidates();
                }
            };
            self.onCandidateInput = function () {
                self.index = 0;
                self.setQuery([]);
                self.setCandidates([]);
            };
        }
        var p = Converter.prototype;
        p.init = function (eventDispatcher) {
            this.eventDispatcher = eventDispatcher;
            this.eventDispatcher.addEventListener('Validator.CompositionUpdate', this.onCompositionUpdate);
            this.eventDispatcher.addEventListener('Validator.CandidatesChange', this.onCandidatesChange);
            this.eventDispatcher.addEventListener('Collector.IMEPrevCandidates', this.onPrevCandidates);
            this.eventDispatcher.addEventListener('Collector.IMENextCandidates', this.onNextCandidates);
            this.eventDispatcher.addEventListener('Validator.CandidateInput', this.onCandidateInput);
            this.candidates = [];
            this.query = [];
            this.index = 0;
        };

        /**
        * @method setMode
        * Used to define the IME mode
        * @param {brease.enum.IMEMode} mode='disabled'
        */
        p.setMode = function (mode) {
            this.mode = Types.parseValue(mode, 'Enum', { Enum: Enum.IMEMode, default: 'disabled' });
            this.setQuery([]);
            this.setCandidates([]);
            Dictionaries.load(this.mode);
        };

        /**
        * @method getMode
        * @return {brease.enum.IMEMode} mode
        */
        p.getMode = function () {
            return this.mode;
        };

        /**
        * @method setCandidates
        * @param {Array} candidates
        */
        p.setCandidates = function (candidates) {
            //console.log('setCandidates', candidates);
            this.candidates = Array.isArray(candidates) ? candidates : [];
            this.updateCandidates();
        };

        p.getCandidates = function () {
            return this.candidates;
        };

        /**
        * @method setQuery
        * @param {Array} query
        */
        p.setQuery = function (query) {
            //console.log('setCandidates', candidates);
            this.query = Array.isArray(query) ? query : [];
        };

        p.getQuery = function () {
            return this.query;
        };

        p.setCount = function (count) {
            this.count = Types.parseValue(count, 'Integer', { min: 1, max: 12 });
        };

        p.getCount = function () {
            return this.count;
        };

        p.dispose = function () {
            this.eventDispatcher.removeEventListener('Validator.CompositionUpdate', this.onCompositionUpdate);
            this.eventDispatcher.removeEventListener('Validator.CandidatesChange', this.onCandidatesChange);
            this.eventDispatcher.removeEventListener('Collector.IMEPrevCandidates', this.onPrevCandidates);
            this.eventDispatcher.removeEventListener('Collector.IMENextCandidates', this.onNextCandidates);
            this.eventDispatcher.removeEventListener('Validator.CandidateInput', this.onCandidateInput);
            this.mode = Enum.IMEMode.DISABLED;
        };
        return Converter;
    });
