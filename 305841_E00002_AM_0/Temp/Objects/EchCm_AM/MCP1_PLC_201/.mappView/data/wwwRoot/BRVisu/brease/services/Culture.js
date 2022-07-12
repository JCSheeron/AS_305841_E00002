/*global requirejs */
define(['brease/events/BreaseEvent', 'globalize'], 
    function (BreaseEvent) {

        'use strict';

        /**
    * @class brease.services.Culture
    * @extends core.javascript.Object
    * Culture service; available via brease.services.culture 
    * @singleton
    */
   
        /**
    * @event culture_changed
    * Fired when the culture is changed.
    * @param {String} type {@link brease.events.BreaseEvent#static-property-CULTURE_CHANGED BreaseEvent.CULTURE_CHANGED}
    * @param {HTMLElement} target document.body
    * @param {Object} detail
    * @param {CultureCode} detail.currentCulture code of the current selected culture
    */
        var Culture = {

            init: function (runtimeService) {
                this.runtimeService = runtimeService;
                document.body.addEventListener(BreaseEvent.LANGUAGE_CHANGED, _langChangeHandler);
                return this;
            },

            isReady: function () {
                var deferred = $.Deferred();

                _switchTo(brease.language.getCurrentLanguage(), false, deferred);

                return deferred.promise();
            },

            /**
        * @method getCurrentCulture
        * Method to get current selected culture
        * @return {Object} 
        * @return {CultureCode} return.key
        * @return {Object} return.culture
        */
            getCurrentCulture: function () {
                return _currentCulture;
            },

            /**
        * @method switchCulture
        * Method to change current selected culture
        * @param {CultureCode} code code of an available culture (e.g. 'de')
        */
            switchCulture: function (code) {
                _switchTo(code, true);
            },

            findClosestCulture: function (key) {
                if (key.length > 2) {
                    key = key.substring(0, 2);
                }
                var deferred = $.Deferred();
                var culture = Globalize.findClosestCulture(key);

                if (culture !== null) {
                    deferred.resolve(culture);
                } else {
                    var src = 'libs/cultures/globalize.culture.' + key;
                    this.runtimeService.checkFileExists(requirejs.toUrl(src + '.js')).then(function () {
                        require([src], function () {
                            deferred.resolve(Globalize.findClosestCulture(key));
                        });
                    }, function () {
                        deferred.resolve(Globalize.cultures.default);
                    });
                }
                return deferred.promise();
            },

            defaultCulture: {
                key: Globalize.cultures.default.name,
                culture: Globalize.cultures.default
            }
        };

        var _currentCulture = {};

        function _setCurrentCulture(culture) {
            Globalize.culture(culture.name);
            _currentCulture = {
                key: culture.name,
                culture: culture
            };
        }

        function _switchTo(key, dispatchEvent, deferred) {

            $.when(
                Culture.findClosestCulture(key)
            ).then(function (culture) {
                _setCurrentCulture(culture);
                if (dispatchEvent === true) {
                    document.body.dispatchEvent(new CustomEvent(BreaseEvent.CULTURE_CHANGED, { detail: { currentCulture: _currentCulture.key } }));
                }
                if (deferred) {
                    deferred.resolve();
                }
            });

        }

        function _langChangeHandler() {

            _switchTo(brease.language.getCurrentLanguage(), true);
        }

        return Culture;

    });
