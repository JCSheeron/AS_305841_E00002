define(['brease/events/BreaseEvent',
    'brease/events/SocketEvent', 
    'brease/core/Utils',
    'brease/config'], 
function (BreaseEvent, SocketEvent, Utils, config) {

    'use strict';

    /**
    * @class brease.services.Language
    * @extends core.javascript.Object
    * Language service; available via brease.services.language  
    * Example of usage:
    * 
    *       <script>
    *           require(['brease', 'brease/events/BreaseEvent'], function (brease, BreaseEvent) {
    *               document.body.addEventListener(BreaseEvent.LANGUAGE_CHANGED, function() {
    *                   console.log('successfully changed!');
    *               });
    *               brease.services.language.switchLanguage('de');
    *           });
    *       </script>
    * 
    * @singleton
    */
    /**
    * @event language_changed
    * Fired when the language is changed.
    * @param {String} type {@link brease.events.BreaseEvent#static-property-LANGUAGE_CHANGED BreaseEvent.LANGUAGE_CHANGED}
    * @param {HTMLElement} target document.body
    * @param {Object} detail
    * @param {LanguageCode} detail.currentLanguage code of the current selected language
    */
    var Language = {

        /*
        /* PUBLIC
        */

        init: function (runtimeService) {
            _runtimeService = runtimeService;
            _runtimeService.addEventListener(SocketEvent.LANGUAGE_CHANGED, _langChangedByServerHandler);
            return this;
        },

        isReady: function () {
            _deferred = $.Deferred();
            _initialLoad();
            return _deferred.promise();
        },

        loadAllTexts: function () {
            _deferred = $.Deferred();
            _runtimeService.loadTexts(_current.code, _loadTextsResponseHandler, { def: _deferred });
            return _deferred.promise();
        },

        /**
        * @method
        * Method to get info about all available languages
        * @return {Object}
        * @return {LanguageCode} return.current_language code of the current selected language
        * @return {Array} return.languages array of all available languages
        */
        getLanguages: function () {

            return Utils.deepCopy(_languages);
        },

        isValidLanguage: function (code) {
            return _languages.languages[code] !== undefined;
        },

        /**
        * @method
        * Method to get code (ISO 639-1) of current selected language.  
        * E.g. 'de' for german.
        * @return {LanguageCode}
        */
        getCurrentLanguage: function () {
            return _current.code;
        },

        /**
        * @method
        * Get a text for a text ID in current selected language  
        * mapp view texts are in namespace "IAT"
        * @param {TextID} textID
        * @return {String}
        */
        getText: function (textID, omitWarning) {
            if (!textID.startsWith('IAT/') && !textID.startsWith('BR/IAT/')) {
                textID = 'IAT/' + textID;
            }
            var text = _texts[textID];
            if (brease.config.editMode) {

                if (text === undefined) {
                    text = (window.iatd && window.iatd.model && typeof window.iatd.model.getTextByKey === 'function') ? window.iatd.model.getTextByKey(textID) : textID;
                }
                if (text !== textID) {
                    return text;
                } else {
                    console.iatWarn('undefined text ID:' + textID);
                    return Language.TEXTKEYPREFIX + textID;
                }

            } else {
                if (text !== undefined) {
                    return text;
                } else {
                    if (omitWarning !== true) {
                        console.iatWarn('undefined text ID:' + textID);
                    }
                    return config.undefinedTextReturnValue;
                }
            }
        },

        /**
        * @method
        * @deprecated Use {@link brease.services.Language#method-getText} instead.
        * @param {TextID} textID
        * @return {String}
        */
        getTextByKey: function (textID, omitWarning) {
            return Language.getText(textID, omitWarning);
        },

        /**
        * @method
        * Get a text for a text ID in current selected language  
        * system texts are in namespace "BR/IAT"
        * @param {TextID} textID
        * @return {String}
        */
        getSystemText: function (textID) {
            var text = _texts[textID];

            if (text !== undefined) {
                return text;
            } else {
                console.iatWarn('undefined text ID:' + textID);
                return config.undefinedTextReturnValue;
            }
        },

        /**
        * @method
        * @deprecated Use {@link brease.services.Language#method-getSystemText} instead.
        * @param {TextID} textID
        * @return {String}
        */
        getSystemTextByKey: function (textID) {
            return Language.getSystemText(textID);
        },

        getFormattedTextByKey: function (textID, callback) {

            var text = _texts[textID];

            if (text !== undefined) {
                if (_containsSnippet(text)) {
                    brease.textFormatter.format(text, []).then(function successHandler(result) {
                        callback(result);
                    }, function errorHandler() {
                        console.iatWarn('error in textFormatter for textID "' + textID + '"');
                        callback(undefined);
                    });
                } else {
                    callback(text);
                }
            } else {
                console.iatWarn('undefined textID:' + textID);
                callback(config.undefinedTextReturnValue);
            }
        },

        /**
        * @method
        * Method to change current selected language
        * @param {LanguageCode} code code of an available language (e.g. 'de')
        * @return {core.jquery.Promise}
        */
        switchLanguage: function (code) {
            _deferred = $.Deferred();

            if (!Language.isValidLanguage(code)) {
                console.iatWarn('Language \u00BB' + code + '\u00AB is not defined!');
                _deferred.resolve({ success: false });

            } else if (_current.code === code) {
                //console.iatInfo('Language \u00BB' + code + '\u00AB is current!');
                _deferred.resolve({ success: true });

            } else {
                _current.version = 0;
                _runtimeService.switchLanguage(code, _switchLanguageResponseHandler, { code: code });
            }
            return _deferred.promise();
        },

        /**
        * @method
        * Method to reload texts in current language
        */
        reloadTexts: function () {
            _current.version += 1;
            _runtimeService.loadTexts(_current.code, _reloadTextsResponseHandler);
        },

        getCurrentVersion: function () {
            return _current.version;
        },

        setKeyText: function (textID, text) {
            _texts[textID] = text;
        },

        addTextKey: function (textID, text, overwrite) {

            if (_texts[textID] && overwrite === true) {

                _texts[textID] = text;
            } else if (_texts[textID] && overwrite !== true) {

                console.iatWarn('textID [' + textID + '] already exists!');
            } else {

                _texts[textID] = text;
            }
        },

        addTextKeys: function (data, overwrite) {

            for (var textID in data) {
                Language.addTextKey(textID, data[textID], overwrite);
            }
        },

        /**
        * @method
        * Method to decide if a string is a text-key 
        * @param {String} text
        * @return {Boolean}
        */
        isKey: function (text) {
            return (Utils.isString(text) && text.substring(0, 1) === Language.TEXTKEYPREFIX);
        },

        /**
        * @method
        * Method to get the text ID out of a text-key  
        * e.g. input '$abc' -> return 'abc'
        * @param {TextKey} text
        * @return {TextID}
        */
        parseKey: function (text) {
            try {
                return text.substring(1);
            } catch (e) {
                return undefined;
            }
        },

        parseProperty: function (prop) {
            if (Language.isKey(prop)) {
                return Language.getText(Language.parseKey(prop));
            } else {
                return prop;
            }
        },

        /**
        * @method
        * @async
        * (Asynchronous) method to pass the human readable unit symbol of a unit code to a callback function
        * @param {String} unitCode Common code of unit (UN/CEFACT)
        * @param {Function} callback
        * @param {String} callback.argument1 human readable unit symbol
        */
        pipeAsyncUnitSymbol: function (unitCode, callback) {
            if (unitCode !== undefined) {
                if (_unitSymbols[unitCode] !== undefined) {
                    if (callback !== undefined) {
                        callback(_unitSymbols[unitCode]);
                    }
                } else if (_pending[unitCode] !== undefined) {
                    _waitForSymbol(unitCode, callback);
                } else {
                    _loadSymbol(unitCode, callback);
                }
            } else if (callback !== undefined) {
                callback(undefined);
            }
        },
        /**
        * @method
        * removes the excape sequence from control characters (currently only "\n")
        * @param {String} text
        * @return {String}
        */
        unescapeText: function (text) {
            return Utils.isString(text) ? text.replace(/\\n/g, '\n') : '';
        }
    };

    /*
    /* PRIVATE
    */

    var _languages = {},
        _current = { version: 0 },
        _texts = {},
        _unitSymbols = { 'GRM': 'g', 'DJ': 'dag', 'KGM': 'kg', 'ONZ': 'oz', 'LBR': 'lb', 'MMT': 'mm', 'DMT': 'dm', 'CMT': 'cm', '4H': 'µm', 'MTR': 'm', 'INH': 'in', 'M7': 'µin', 'FOT': 'ft', 'YRD': 'yd', 'PAL': 'Pa', 'KPA': 'kPa', 'BAR': 'bar', 'HBA': 'hbar', 'MBR': 'mbar', 'KBA': 'kbar', 'CEL': '°C', 'FAH': '°F', 'KEL': 'K', 'MMQ': 'mm³', 'CMQ': 'cm³', 'DMQ': 'dm³', 'INQ': 'in³', 'FTQ': 'ft³', 'YDQ': 'yd³', 'AMP': 'A', 'B22': 'kA', 'H38': 'MA', '4K': 'mA', 'B84': 'µA', 'C39': 'nA', 'WTT': 'W', 'KWT': 'kW', 'MAW': 'MW', 'JOU': 'J', 'KJO': 'kJ', 'WHR': 'W·h', 'MWH': 'MW·h', 'KWH': 'kW·h' },
        _pending = {},
        _deferred,
        _runtimeService;

    function _waitForSymbol(unitCode, callback) {
        $.when(
            _pending[unitCode].promise()
        ).then(function (symbol) {
            if (callback !== undefined) {
                callback(symbol);
            }
        });
    }

    function _loadSymbol(unitCode, callback) {
        _pending[unitCode] = $.Deferred();
        _runtimeService.getUnitSymbols(_current.code, [unitCode + ''], function (response) {
            if (response.unitSymbols[unitCode] !== undefined) {
                _unitSymbols[unitCode] = response.unitSymbols[unitCode];
            }
            _pending[unitCode].resolve(_unitSymbols[unitCode]);
            _pending[unitCode] = undefined;
            callback(_unitSymbols[unitCode]);
        });
    }

    function _finish(success, message) {
        if (success === true) {
            _deferred.resolve(message);
        } else {
            _deferred.reject(message);
        }
    }

    function _initialLoad() {
        _runtimeService.loadLanguages(_loadLanguagesResponseHandler);
    }

    function _loadLanguagesResponseHandler(response) {
        if (response.success === true) {
            _languages = {
                languages: response.languages,
                current_language: response.current_language
            };
            $.when(
                _loadTexts('system', _languages.current_language), // initially only system texts are loaded, as they are needed early
                _loadUnitSymbols(_languages.current_language)
            ).then(function () {
                _current.code = _languages.current_language;
                _finish(true, 'languages and texts loaded successfully');
                document.body.dispatchEvent(new CustomEvent(BreaseEvent.LANGUAGE_LOADED, { detail: { currentLanguage: _current.code } }));
            }, function () {
                // text load fail
                console.log('fail:', arguments);
            });
        } else {
            _finish(false, 'languages load error');
        }
    }

    function _switchLanguageResponseHandler(response, callbackInfo) {
        if (response.success === true) {
            var newCode = callbackInfo.code;
            $.when(
                _loadTexts('all', newCode),
                _loadUnitSymbols(newCode)
            ).then(function () {
                _current.code = newCode;
                _languages.current_language = newCode;
                document.body.dispatchEvent(new CustomEvent(BreaseEvent.LANGUAGE_CHANGED, { detail: { currentLanguage: _current.code } }));
            }, function () {
                // text load fail
                console.log('fail:', arguments);
            });

            _deferred.resolve({ success: true });
        } else {
            console.iatWarn('service switchLanguage failed!');
            document.body.dispatchEvent(new CustomEvent(BreaseEvent.LANGUAGE_CHANGED, { detail: { currentLanguage: _current.code } }));
            _deferred.resolve({ success: false });
        }
    }

    function _loadUnitSymbols(code) {
        var def = $.Deferred();
        _runtimeService.getUnitSymbols(code, Object.keys(_unitSymbols), _getUnitSymbolsResponseHandler, { requestedLang: code, def: def });
        return def.promise();
    }

    function _loadTexts(type, code) {
        var def = $.Deferred();
        if (type === 'system') {
            _runtimeService.loadSystemTexts(code, _loadTextsResponseHandler, { def: def });
        } else {
            _runtimeService.loadTexts(code, _loadTextsResponseHandler, { def: def });
        }
        return def.promise();
    }

    function _isValidLanguageEvent(e) {
        return e && e.detail && e.detail.currentLanguage !== undefined;
    }
    
    function _langChangedByServerHandler(serverEvent) {
        if (!_isValidLanguageEvent(serverEvent)) {
            return;
        }
        if (brease.config.editMode === true) {
            _current.code = serverEvent.detail.currentLanguage;
            document.body.dispatchEvent(new CustomEvent(BreaseEvent.LANGUAGE_CHANGED, { detail: { currentLanguage: _current.code } })); 
        } else {
            _switchLanguageResponseHandler({ success: true }, { code: serverEvent.detail.currentLanguage });
        }
    }

    function _loadTextsResponseHandler(response, callbackInfo) {
        _texts = (brease.config.mocked) ? Utils.deepCopy(response) : response;

        if (callbackInfo.def) {
            callbackInfo.def.resolve();
        }
    }

    function _reloadTextsResponseHandler(response) {
        _texts = (brease.config.mocked) ? Utils.deepCopy(response) : response;

        document.body.dispatchEvent(new CustomEvent(BreaseEvent.LANGUAGE_CHANGED, { detail: { currentLanguage: _current.code } }));
    }

    function _getUnitSymbolsResponseHandler(response, callbackInfo) {
        if (response.unitSymbols) {
            _unitSymbols = response.unitSymbols;
            callbackInfo.def.resolve();
        } else {
            console.iatWarn('error on fetching unit symbols!');
            callbackInfo.def.reject();
        }
    }

    function _containsSnippet(text) {
        return (text !== undefined && text.indexOf('{') !== -1);
    }

    Object.defineProperty(Language, 'TEXTKEYPREFIX', {
        enumerable: true,
        configurable: true,
        writable: false,
        value: '$'
    });
    
    return Language;

});
