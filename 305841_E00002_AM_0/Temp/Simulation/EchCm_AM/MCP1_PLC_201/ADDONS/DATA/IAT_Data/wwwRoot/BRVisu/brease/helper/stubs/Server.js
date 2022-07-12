define(['brease/events/EventDispatcher',
    'brease/events/SocketEvent',
    'brease/core/Utils'],
function (EventDispatcher, SocketEvent, Utils) {

    'use strict';

    var _model,
        _modelTemplate = {
            client: {
                id: 'ClientIdFromServerStub'
            },
            subscriptions: {
            },
            eventSubscriptions: {
            },
            sessionEventSubscriptions: [
            ],
            measurementSystems: {
                measurementSystemList: {
                    'metric': {
                        description: 'Metrisch'
                    },
                    'imperial': {
                        description: 'Imperial'
                    },
                    'imperial-us': {
                        description: 'Imperial U.S.'
                    }
                },
                current_measurementSystem: 'metric'
            },
            language: {
                data: {
                    languages: {
                        de: {
                            description: 'Deutsch',
                            index: 2
                        },
                        'de-AT': {
                            description: 'Deutsch (Ö)',
                            index: 2
                        },
                        en: {
                            description: 'English',
                            index: 1
                        },
                        'en-GB': {
                            description: 'English (GB)',
                            index: 1
                        },
                        fr: {
                            description: 'Français',
                            index: 5
                        },
                        zh: {
                            description: 'Chinese',
                            index: 4
                        },
                        ko: {
                            description: 'Korean',
                            index: 3
                        },
                        ja: {
                            description: 'Japanese',
                            index: 6
                        }
                    },
                    current_language: 'de'
                },

                designerLanguages: {
                    de: {
                        description: 'Deutsch',
                        index: 0
                    },
                    en: {
                        description: 'English',
                        index: 1
                    },
                    fr: {
                        description: 'Français',
                        index: 2
                    },
                    zh: {
                        description: 'Chinese',
                        index: 3
                    },
                    ko: {
                        description: 'Korean',
                        index: 4
                    },
                    ja: {
                        description: 'Japanese',
                        index: 5
                    }
                },

                texts: {
                    de: {
                        'BR/IAT/brease.common.attention': 'Achtung',
                        'BR/IAT/brease.common.connectionError.text': 'Die Verbindung zum Server wurde unterbrochen!',
                        'BR/IAT/brease.common.transferStart': 'Transfer gestartet - bitte warten Sie bis der Server bereit ist!',
                        'BR/IAT/brease.common.ok': 'ok',
                        'BR/IAT/brease.common.yes': 'ja',
                        'BR/IAT/brease.common.no': 'nein',
                        'BR/IAT/brease.common.cancel': 'abbrechen',
                        'BR/IAT/brease.common.abort': 'abort',
                        'BR/IAT/brease.common.retry': 'retry',
                        'BR/IAT/brease.common.ignore': 'ignore',
                        'BR/IAT/brease.common.enter': 'enter',
                        'BR/IAT/brease.common.reset': 'reset',
                        'BR/IAT/brease.common.pageloading': 'Seite wird geladen...',
                        'BR/IAT/brease.error.STARTPAGE_NOT_FOUND': 'Startseite nicht gefunden!',
                        'BR/IAT/brease.error.DIALOG_NOT_FOUND': 'Dialog nicht gefunden!',
                        'BR/IAT/brease.error.DIALOG_NOT_LOADED': 'Dialog konnte nicht geladen werden!',
                        'BR/IAT/brease.error.NO_PAGES_FOUND': 'Achtung: keine Pages in Visualisierung angegeben!',
                        'BR/IAT/brease.error.NO_LAYOUTS_FOUND': 'Achtung: keine Layouts in Visualisierung angegeben!',
                        'BR/IAT/brease.error.INCORRECT_VISU': 'Visualisierung (id="{1}") kann nicht dargestellt werden!',
                        'BR/IAT/brease.error.VISU_NOT_FOUND': 'Visualisierung (id="{1}") nicht gefunden!',
                        'BR/IAT/brease.error.LAYOUT_NOT_FOUND': 'Layout nicht gefunden!',
                        'BR/IAT/brease.error.CONTENT_NOT_FOUND': 'Content nicht gefunden!',
                        'BR/IAT/brease.error.ACTIVATE_VISU_FAILED': 'Zugriff verweigert! Lizenz für die Visualisierung "{1}" nicht vorhanden!',
                        'IAT/brease.unittest.text1': 'text1_de',
                        'IAT/brease.unittest.text2': 'text2_de',
                        'IAT/unit.temp.gc': '°C',
                        'IAT/unit.time.sec': 's',
                        'IAT/unit.pieces': 'Stk',
                        'IAT/brease.common.today': 'heute',
                        'IAT/brease.common.languages': 'Sprachen',
                        'IAT/brease.demo.home': 'Startseite',
                        'IAT/brease.demo.table.status1': 'status 1',
                        'IAT/brease.demo.table.status2': 'status 2',
                        'IAT/brease.demo.table.status3': 'status 3',
                        'IAT/brease.demo.table.status4': 'status 4',
                        'IAT/brease.demo.buttonbar.btn01': 'Startseite',
                        'IAT/brease.demo.buttonbar.btn02': 'Trends',
                        'IAT/brease.demo.buttonbar.btn03': 'Kontakt',
                        'IAT/brease.demo.buttonbar.btn04': 'Hilfe',
                        'IAT/brease.demo.buttons.example': 'Beispiel Button',
                        'IAT/brease.demo.differentText': 'anderer text',
                        'IAT/brease.demo.dropdown.prompt': 'bitte wählen',
                        'IAT/brease.demo.dropdown.testoption1': 'Auswahl 1',
                        'IAT/brease.demo.dropdown.testoption2': 'Auswahl 2',
                        'IAT/brease.demo.dropdown.testoption3': 'Auswahl 3',
                        'IAT/brease.demo.dropdown.testoption4': 'Auswahl 4',
                        'IAT/brease.demo.dropdown.testoption5': 'Auswahl 5',
                        'IAT/brease.format.y': 'Y',
                        'IAT/snippetSample': 'enthaelt ein snippet: {$IAT/unit.temp.gc}',
                        'IAT/snippetError': 'snippetError: {$IAT/unit.temp.gc}',
                        'IAT/Widgets/OnlineChartHDA/MESSAGE_ERROR_UTC_TIME_MISMATCH': 'de:MESSAGE_ERROR_UTC_TIME_MISMATCH',
                        'IAT/System/Dialog/USERNAME': 'Benutzer',
                        'IAT/System/Dialog/OLD_PASSWORD': 'altes Passwort',
                        'IAT/System/Dialog/NEW_PASSWORD': 'neues Passwort',
                        'IAT/System/Dialog/CONFIRM_PASSWORD': 'Passwort wiederholen',
                        'IAT/System/Dialog/BTN_CHANGE_PASSWORD': 'Passwort ändern',
                        'IAT/System/Dialog/BTN_CANCEL': 'Abbruch',
                        'IAT/System/Dialog/BTN_CONFIRM': 'ok',
                        'IAT/System/Dialog/CHANGEPASSWORD_WRONG_PASSWORD': 'CHANGEPASSWORD_WRONG_PASSWORD',
                        'IAT/System/Dialog/CHANGEPASSWORD_FAIL': 'CHANGEPASSWORD_FAIL',
                        'IAT/System/Dialog/CHANGEPASSWORD_INVALID_CREDENTIALS': 'CHANGEPASSWORD_INVALID_CREDENTIALS',
                        'IAT/System/Dialog/CHANGEPASSWORD_SUCCESS': 'CHANGEPASSWORD_SUCCESS',
                        'IAT/System/Dialog/CHANGEPASSWORD_PASSWORDS_DIFFERENT': 'CHANGEPASSWORD_PASSWORDS_DIFFERENT',
                        'IAT/System/Dialog/CHANGEPASSWORD_NEWPASSWORD_EMPTY': 'CHANGEPASSWORD_NEWPASSWORD_EMPTY',
                        'IAT/System/Dialog/CHANGEPASSWORD_OLDPASSWORD_EMPTY': 'CHANGEPASSWORD_OLDPASSWORD_EMPTY',
                        'IAT/System/Dialog/CHANGEPASSWORD_USERNAME_EMPTY': 'CHANGEPASSWORD_USERNAME_EMPTY',
                        'IAT/System/Dialog/POLICY_DESC_ALPHANUMERIC': 'POLICY_DESC_ALPHANUMERIC',
                        'IAT/System/Dialog/POLICY_DESC_MIXEDCASE': 'POLICY_DESC_MIXEDCASE',
                        'IAT/System/Dialog/POLICY_DESC_MINLENGTH': 'POLICY_DESC_MINLENGTH',
                        'IAT/System/Dialog/POLICY_DESC_SPECIALCHAR': 'POLICY_DESC_SPECIALCHAR',
                        'IAT/System/Dialog/POLICY_HEADER': 'POLICY_HEADER'
                    },
                    en: {
                        'BR/IAT/brease.common.attention': 'Attention',
                        'BR/IAT/brease.common.connectionError.text': 'Connection to server is lost!',
                        'BR/IAT/brease.common.transferStart': 'Server transfer started - please wait for reconnection!',
                        'BR/IAT/brease.common.ok': 'ok',
                        'BR/IAT/brease.common.yes': 'yes',
                        'BR/IAT/brease.common.no': 'no',
                        'BR/IAT/brease.common.cancel': 'cancel',
                        'BR/IAT/brease.common.abort': 'abort',
                        'BR/IAT/brease.common.retry': 'retry',
                        'BR/IAT/brease.common.ignore': 'ignore',
                        'BR/IAT/brease.common.enter': 'enter',
                        'BR/IAT/brease.common.reset': 'reset',
                        'BR/IAT/brease.common.pageloading': 'page is loading...',
                        'BR/IAT/brease.error.STARTPAGE_NOT_FOUND': 'Startpage not found!',
                        'BR/IAT/brease.error.DIALOG_NOT_FOUND': 'Dialog not found!',
                        'BR/IAT/brease.error.DIALOG_NOT_LOADED': 'Dialog could not be loaded!',
                        'BR/IAT/brease.error.NO_PAGES_FOUND': 'Attention: no pages declared!',
                        'BR/IAT/brease.error.NO_LAYOUTS_FOUND': 'Attention: no layouts declared',
                        'BR/IAT/brease.error.INCORRECT_VISU': 'Visualization (id="{1}") could not be displayed!',
                        'BR/IAT/brease.error.VISU_NOT_FOUND': 'Visualization (id="{1}") not found!',
                        'BR/IAT/brease.error.LAYOUT_NOT_FOUND': 'Layout not found!',
                        'BR/IAT/brease.error.CONTENT_NOT_FOUND': 'Content not found!',
                        'BR/IAT/brease.error.ACTIVATE_VISU_FAILED': 'Not allowed! License not available for visualization "{1}"!',
                        'IAT/brease.unittest.text1': 'text1_en',
                        'IAT/brease.unittest.text2': 'text2_en',
                        'IAT/unit.temp.gc': '°C',
                        'IAT/unit.time.sec': 's',
                        'IAT/unit.pieces': 'pcs',
                        'IAT/brease.common.today': 'today',
                        'IAT/brease.common.languages': 'Languages',
                        'IAT/brease.demo.home': 'Home',
                        'IAT/brease.demo.table.status1': 'status 1',
                        'IAT/brease.demo.table.status2': 'status 2',
                        'IAT/brease.demo.table.status3': 'status 3',
                        'IAT/brease.demo.table.status4': 'status 4',
                        'IAT/brease.demo.buttonbar.btn01': 'Startpage',
                        'IAT/brease.demo.buttonbar.btn02': 'Trends',
                        'IAT/brease.demo.buttonbar.btn03': 'Contact',
                        'IAT/brease.demo.buttonbar.btn04': 'Help',
                        'IAT/brease.demo.buttons.example': 'Example Button',
                        'IAT/brease.demo.differentText': 'different text',
                        'IAT/brease.demo.dropdown.prompt': 'please select',
                        'IAT/brease.demo.dropdown.testoption1': 'option 1',
                        'IAT/brease.demo.dropdown.testoption2': 'option 2',
                        'IAT/brease.demo.dropdown.testoption3': 'option 3',
                        'IAT/brease.demo.dropdown.testoption4': 'option 4',
                        'IAT/brease.demo.dropdown.testoption5': 'option 5',
                        'IAT/brease.format.y': 't',
                        'IAT/snippetSample': 'enthaelt ein snippet: {$IAT/unit.temp.gc}',
                        'IAT/snippetError': 'snippetError: {$IAT/unit.temp.gc}',
                        'IAT/Widgets/OnlineChartHDA/MESSAGE_ERROR_UTC_TIME_MISMATCH': 'en:MESSAGE_ERROR_UTC_TIME_MISMATCH',
                        'IAT/System/Dialog/USERNAME': 'user',
                        'IAT/System/Dialog/OLD_PASSWORD': 'old password',
                        'IAT/System/Dialog/NEW_PASSWORD': 'new password',
                        'IAT/System/Dialog/CONFIRM_PASSWORD': 'confirm password',
                        'IAT/System/Dialog/BTN_CHANGE_PASSWORD': 'change password',
                        'IAT/System/Dialog/BTN_CANCEL': 'cancel',
                        'IAT/System/Dialog/BTN_CONFIRM': 'ok',
                        'IAT/System/Dialog/CHANGEPASSWORD_WRONG_PASSWORD': 'CHANGEPASSWORD_WRONG_PASSWORD',
                        'IAT/System/Dialog/CHANGEPASSWORD_FAIL': 'CHANGEPASSWORD_FAIL',
                        'IAT/System/Dialog/CHANGEPASSWORD_INVALID_CREDENTIALS': 'CHANGEPASSWORD_INVALID_CREDENTIALS',
                        'IAT/System/Dialog/CHANGEPASSWORD_SUCCESS': 'CHANGEPASSWORD_SUCCESS',
                        'IAT/System/Dialog/CHANGEPASSWORD_PASSWORDS_DIFFERENT': 'CHANGEPASSWORD_PASSWORDS_DIFFERENT',
                        'IAT/System/Dialog/CHANGEPASSWORD_NEWPASSWORD_EMPTY': 'CHANGEPASSWORD_NEWPASSWORD_EMPTY',
                        'IAT/System/Dialog/CHANGEPASSWORD_OLDPASSWORD_EMPTY': 'CHANGEPASSWORD_OLDPASSWORD_EMPTY',
                        'IAT/System/Dialog/CHANGEPASSWORD_USERNAME_EMPTY': 'CHANGEPASSWORD_USERNAME_EMPTY'
                    },
                    fr: {
                        'IAT/unit.temp.gc': '°C',
                        'IAT/unit.time.sec': 's',
                        'IAT/brease.unittest.text1': 'text1_fr',
                        'IAT/brease.unittest.text2': 'text2_fr'
                    },
                    zh: {
                        'IAT/unit.temp.gc': '°C',
                        'IAT/unit.time.sec': 's',
                        'IAT/brease.unittest.text1': 'text1_zh',
                        'IAT/brease.unittest.text2': 'text2_zh'
                    },
                    ko: {
                        'BR/IAT/brease.common.attention': 'Attention',
                        'BR/IAT/brease.common.transferStart': 'transferStart',
                        'BR/IAT/brease.common.yes': '예',
                        'BR/IAT/brease.common.no': '아니',
                        'BR/IAT/brease.common.ok': '확인',
                        'BR/IAT/brease.common.retry': 'retry',
                        'BR/IAT/brease.common.abort': 'abort',
                        'BR/IAT/brease.common.ignore': 'ignore',
                        'BR/IAT/brease.common.cancel': '취소',
                        'IAT/brease.unittest.text1': 'text1_kr',
                        'IAT/brease.unittest.text2': 'text2_kr',
                        'IAT/unit.temp.gc': '섭씨',
                        'IAT/unit.time.sec': 's',
                        'IAT/unit.pieces': '조각',
                        'IAT/brease.common.today': 'today',
                        'IAT/brease.common.languages': '언어 선택',
                        'IAT/brease.demo.home': '홈',
                        'IAT/brease.demo.table.status1': 'status 1',
                        'IAT/brease.demo.table.status2': 'status 2',
                        'IAT/brease.demo.table.status3': 'status 3',
                        'IAT/brease.demo.table.status4': 'status 4',
                        'IAT/brease.demo.buttonbar.btn01': 'Startpage',
                        'IAT/brease.demo.buttonbar.btn02': 'Trends',
                        'IAT/brease.demo.buttonbar.btn03': 'Contact',
                        'IAT/brease.demo.buttonbar.btn04': 'Help',
                        'IAT/brease.demo.buttons.example': 'Example Button',
                        'IAT/brease.demo.differentText': 'different text',
                        'IAT/brease.demo.dropdown.prompt': 'please select',
                        'IAT/brease.demo.dropdown.testoption1': 'option 1',
                        'IAT/brease.demo.dropdown.testoption2': 'option 2',
                        'IAT/brease.demo.dropdown.testoption3': 'option 3',
                        'IAT/brease.demo.dropdown.testoption4': 'option 4',
                        'IAT/brease.demo.dropdown.testoption5': 'option 5'
                    }
                },
                units: {
                    'INH': 'in',
                    'MTR': 'm',
                    'GRM': 'g'
                }
            },
            culture: {

                data: {
                    cultures: {
                        de: {
                            description: 'German'
                        },
                        en: {
                            description: 'English'
                        },
                        fr: {
                            description: 'French'
                        },
                        zh: {
                            description: 'Chinese'
                        }
                    },
                    current_culture: 'de'
                }
            },
            visus: {}
        };

    _model = Utils.deepCopy(_modelTemplate);

    function _setDeepValue(obj, path, data) {
        var parts = path.split('.'),
            len = parts.length;
        if (len === 1) {
            obj[path] = data;
        } else {
            for (var i = 0; i < len - 1; i += 1) {
                obj = obj[parts[i]];
            }
            obj[parts[len - 1]] = data;
        }
    }

    var server = new EventDispatcher();
    server.getModelData = function (widgetId, attribute) {
        //console.log('Server.getModelData.widgetId=' + widgetId + ',attribute=' + attribute);
        return (_model[widgetId]) ? _model[widgetId][attribute] : undefined;
    };
    server.setModelData = function (path, data) {

        _setDeepValue(_model, path, data);
    };
    server.reset = function () {
        _model = Utils.deepCopy(_modelTemplate);
    };

    server.setData = function (data) {

        for (var i = 0; i < data.length; i += 1) {
            if (data[i].event === SocketEvent.PROPERTY_VALUE_CHANGED) {

                for (var j = 0; j < data[i].eventArgs.length; j += 1) {
                    var item = data[i].eventArgs[j];
                    for (var k = 0; k < item.data.length; k += 1) {
                        var itemData = item.data[k];
                        _model[item.refId] = _model[item.refId] || {};
                        _model[item.refId][itemData.attribute] = itemData.value;
                    }
                }
            } else if (data[i].event === 'PropertyUnitChanged') {
                data[i].eventArgs.forEach(function (actArg) {
                    if (actArg.data) {
                        actArg.data.forEach(function (actData) {
                            _model[actArg.refId] = _model[actArg.refId] || {};
                            _model[actArg.refId][actData.attribute].unit = actData.unit;
                        });
                    }
                });
            }
        }
    };
    server.addSubscriptions = function (data) {
        var contentId = data.contentId;
        _model.subscriptions[contentId] = _model.subscriptions[contentId] || { subscriptions: [] };

        for (var i = 0; i < data.subscriptions.length; i += 1) {
            _model.subscriptions[contentId].subscriptions.push(data.subscriptions[i]);
        }
    };
    server.removeSubscriptions = function (data) {
        var contentId = data.contentId,
            arrDelSubscriptions = data.subscriptions,
            arrNewSubscriptions = [];
        if (_model.subscriptions[contentId]) {
            arrNewSubscriptions = _model.subscriptions[contentId].subscriptions.filter(function (actServSubscription) {
                var passed = true;
                for (var i = 0; i < arrDelSubscriptions.length; i += 1) {
                    if ((actServSubscription.refId === arrDelSubscriptions[i].refId) &&
                            (actServSubscription.attribute === arrDelSubscriptions[i].attribute)) {
                        passed = false;
                    }
                }
                return passed;
            });
            _model.subscriptions[contentId].subscriptions = arrNewSubscriptions;
        }
    };
    server.addEventSubscriptions = function (data) {
        var contentId = data.contentId, i;
        if (contentId === '_client') {
            _model.sessionEventSubscriptions = _model.sessionEventSubscriptions || [];
            for (i = 0; i < data.eventSubscriptions.length; i += 1) {
                _model.sessionEventSubscriptions.push({ event: data.eventSubscriptions[i].event });
            }
        } else {
            _model.eventSubscriptions[contentId] = _model.eventSubscriptions[contentId] || { eventSubscriptions: [] };
            for (i = 0; i < data.eventSubscriptions.length; i += 1) {
                _model.eventSubscriptions[contentId].eventSubscriptions.push(data.eventSubscriptions[i]);
            }
        }

    };
    server.getSubscriptions = function (contentId) {
        if (_model.subscriptions[contentId] !== undefined) {
            return _model.subscriptions[contentId].subscriptions;
        } else {
            return [];
        }
    };
    server.getVisuData = function (visuId) {
        return _model.visus[visuId];
    };
    server.setCurrentLanguage = function (langKey) {
        _model.language.data.current_language = langKey;
    };
    server.getCurrentText = function () {
        var texts = $.extend({}, _model.language.texts['de'], _model.language.texts[_model.language.data.current_language]);

        return texts;
    };
    server.getLanguages = function () {
        if (brease.config.editMode === true) {
            _model.language.data.languages = _model.language.designerLanguages;
        }
        return _model.language.data;
    };
    server.getAllUnitSymbols = function () {
        return _model.language.units;
    };
    server.getUnitSymbol = function (commonCode) {
        return _model.language.units[commonCode];
    };
    server.getCultures = function () {
        return _model.culture.data;
    };
    server.setCurrentCulture = function (cultureKey) {
        _model.culture.data.current_culture = cultureKey;
    };
    server.getMMSystems = function () {
        return _model.measurementSystems;
    };
    server.setCurrentMMS = function (key) {
        _model.measurementSystems.current_measurementSystem = key;
    };
    server.getEventSubscriptions = function (contentId) {
        if (_model.eventSubscriptions[contentId] !== undefined) {
            return _model.eventSubscriptions[contentId].eventSubscriptions;
        } else {
            return [];
        }
    };
    server.getSessionEventSubscriptions = function () {
        if (_model.sessionEventSubscriptions !== undefined) {
            return _model.sessionEventSubscriptions;
        } else {
            return [];
        }
    };

    return server;

});
