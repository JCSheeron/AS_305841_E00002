/* eslint-disable no-unused-vars */
define(['brease/helper/stubs/Server', 
    'brease/helper/stubs/WebSocket', 
    'brease/controller/objects/VisuStatus', 
    'brease/services/libs/ServerCode',
    'brease/events/SocketEvent'],
function (ServerStub, WebSocketStub, VisuStatus, ServerCode, SocketEvent) {
    
    'use strict';

    var timeoutForTextLoad = 0;

    // MOCK EXTENSIONS
    var testServices = {

            addSubscriptions: function () {
                ServerStub.addSubscriptions.apply(ServerStub, arguments);
            },

            addEventSubscriptions: function () {
                ServerStub.addEventSubscriptions.apply(ServerStub, arguments);
            },

            getModelData: function () {
                return ServerStub.getModelData.apply(ServerStub, arguments);
            },

            setModelData: function () {
                ServerStub.setModelData.apply(ServerStub, arguments);
            },

            reset: function () {
                ServerStub.reset();
                WebSocketStub.reset();
                timeoutIds.reset();
            },

            setData: function (key, value, type) {
                if (type === 'timeout') {
                    timeout[key] = value;
                    WebSocketStub.setData(key, value, type);
                } else {
                    data[key] = value;
                }
            },
            getData: function (key) {
                return data[key];
            }
        },
        data = {
            registerClientResponseCode: 0,
            activateVisuSuccessResponseCode: 0,
            activateVisuFailResponseCode: ServerCode.NO_LICENSE,
            visusWithoutLicense: ['visuwithoutlicense']
        },
        //"code": 2148270092 //no license
        //"code": 2148073484 //no further sessions
        //"code": 2148139020 //max clients
        //"code": 2148204556 //not enough licenses
        timeout = {
            activateContent: 10,
            deactivateContent: 10,
            activateVisu: 50,
            registerClient: 25
        },
        timeoutIds = {
            ids: [],
            reset: function () {
                timeoutIds.ids.forEach(function (id) {
                    window.clearTimeout(id);
                }); 
                timeoutIds.ids = [];
            },
            add: function (id) {
                timeoutIds.ids.push(id);
            }
        };

    function respondWithTimeout(methodName, callback, response, callbackInfo) {
        //console.log('respondWithTimeout:', methodName, timeout[methodName], (callbackInfo)? callbackInfo.contentId:'');
        if (timeout[methodName] > 0) {
            timeoutIds.add(window.setTimeout(function () {
                callback(response, callbackInfo);
            }, timeout[methodName]));
        } else {
            callback(response, callbackInfo);
        }
    }

    var user = {
        authenticate: function (username, password) {
            var secret = new Date().valueOf();
            for (var i in users) {
                //console.log(users[i], username, password);
                if (compare(users[i].username, username)) {
                    if (compare(users[i].password, password)) {
                        users[i].signature = secret;
                        return {
                            userID: username,
                            isAuthenticated: true,
                            signature: secret
                        };
                    }
                }
            }

            return {
                userID: username,
                isAuthenticated: false,
                signature: secret
            };
        },

        setCurrentUser: function () {

        },

        triggerUserChange: function (userobj) {
            user.currentUser = userobj;
            var type = SocketEvent.USER_CHANGED;
            ServerStub.dispatchEvent({
                'event': type,
                'detail': {
                    user: userobj
                }
            }, type);
        }
    };

    user.currentUser = user.authenticate('anonymous', '');

    var users = [
            { username: 'anonymous', password: '' },
            { username: 'martin', password: 'iat' }
        ],
        _roles = {
            'anonymous': ['Everyone'],
            'TestUser99': ['Everyone', 'Administrators']
        };

    function compare(s1, s2) {
        //console.log("compare", s1, s2);
        if (s1.indexOf(s2) === 0 && s1.length === s2.length) {
            return true;
        } else {
            return false;
        }
    }

    function _respondWith(response, data, callback, callbackInfo) {
        callback(response, callbackInfo);
    }

    function _respondWithData(data, callback, callbackInfo) {
        callback(data, callbackInfo);
    }

    function _respondWithDataAndParameter(data, parameter, callback, callbackInfo) {
        var returnValue = { 'Data': data };
        if (parameter) {
            returnValue['Parameter'] = parameter;
        }
        callback(returnValue, callbackInfo);
    }

    return {

        respondWith: function (method, response) {
            if (response === 'data') {
                this[method] = _respondWithData;
            } else if (response === 'dataAndParameter') {
                this[method] = _respondWithDataAndParameter;
            } else {
                this[method] = _respondWith.bind(null, response);
            }
        },

        checkFileExists: function (url) {
            return new Promise(function (resolve, reject) {
                if (url.indexOf('libs/cultures/globalize.culture.un.js') === -1) {
                    resolve();
                } else {
                    reject(new Error(404));
                }
                
            });
        },

        /************************
        *** BINDING related ****
        ************************/
        createBindings: function (contentId, visuId, bindings, callback, callbackInfo) {
            var response = { status: { code: 0 }, bindingsStatus: [] },
                subscriptions = [];
            bindings.forEach(function (actBinding) {
                if (actBinding.target.type === 'brease') {
                    subscriptions.push({ refId: actBinding.target.refId, attribute: actBinding.target.attribute });
                    response.bindingsStatus.push({ code: 0 });
                } else {
                    response.bindingsStatus.push({ code: 255 });
                }

            });
            if (subscriptions.length > 0) {
                ServerStub.addSubscriptions({ contentId: contentId, subscriptions: subscriptions });
            }
            callback(response, callbackInfo);    
        },
        deleteBindings: function (contentId, visuId, targets, callback, callbackInfo) {
            var response = { status: { code: 0 }, bindingsStatus: [] },
                subscriptions = [];
            targets.forEach(function (actTarget) {
                subscriptions.push({ refId: actTarget.refId, attribute: actTarget.attribute });
                response.bindingsStatus.push({ code: 0 });
            });
            if (subscriptions.length > 0) {
                ServerStub.removeSubscriptions({ contentId: contentId, subscriptions: subscriptions });
            }
            callback(response, callbackInfo);
        },
        deactivateContent: function (contentId, visuId, callback, callbackInfo) {
            var response = { success: true, contentId: contentId },
                type = SocketEvent.CONTENT_DEACTIVATED,
                event = {
                    event: type,
                    detail: {
                        contentId: contentId,
                        success: true
                    }
                };
            callback(response, callbackInfo);
            
            if (timeout['deactivateContent'] > 0) {
                timeoutIds.add(window.setTimeout(function () {
                    ServerStub.dispatchEvent(event, type);
                }, timeout['deactivateContent']));
            } else {
                ServerStub.dispatchEvent(event, type);
            }
        },

        getSubscription: function (contentId, visuId, callback, callbackInfo) {
            var response = {
                'contentId': contentId,
                'success': true
            };
            response.subscriptions = ServerStub.getSubscriptions(contentId);
            callback(response, callbackInfo);
        },

        activateContent: function (contentId, visuId, callback, callbackInfo) {
            var response = {
                'success': true
            };
            respondWithTimeout('activateContent', callback, response, callbackInfo);

            var type = SocketEvent.CONTENT_ACTIVATED,
                event = {
                    event: type,
                    detail: {
                        contentId: contentId,
                        success: true
                    }
                };
            if (timeout['activateContent'] > 0) {
                timeoutIds.add(window.setTimeout(function () {
                    ServerStub.dispatchEvent(event, type);
                }, (timeout['activateContent'] > 0) ? timeout['activateContent'] + 10 : 0));
            } else {
                ServerStub.dispatchEvent(event, type);
            }
        },

        activateVisu: function (visuId, callback, callbackInfo) {
            var code = data.activateVisuSuccessResponseCode;
            if (data.visusWithoutLicense.indexOf(visuId.toLowerCase()) !== -1) {
                code = data.activateVisuFailResponseCode;
            }
            var response = {
                success: true,
                status: {
                    code: code
                }
            };
            respondWithTimeout('activateVisu', callback, response, callbackInfo);

            var type = SocketEvent.VISU_ACTIVATED,
                event = {
                    event: type,
                    detail: {
                        visuId: visuId.toLowerCase()
                    }
                };
            timeoutIds.add(window.setTimeout(function () {
                ServerStub.dispatchEvent(event, type);
            }, timeout['activateVisu'] + 10));

        },

        registerClient: function (visuId, callback) {
            var response = {
                'status': {
                    'code': data.registerClientResponseCode
                }
            };
            if (data.registerClientResponseCode !== 0) {
                response.Error = {
                    'Code': 9,
                    'Text': 'Visualization already open on this client, no further sessions allowed'
                };
            } else {
                response.success = true;
                response.ClientId = testServices.getModelData('client', 'id');
            }
            respondWithTimeout('registerClient', callback, response);
        },

        deactivateVisu: function (visuId, callback, callbackInfo) {
            var response = {
                success: true
            };
            if (typeof callback === 'function') {
                callback(response, callbackInfo);
            }
        },

        loadConfiguration: function (callback, callbackInfo) {
            callback({
                success: true,
                configuration: {
                    ContentCaching: {
                        cachingSlots: '0',
                        preserveOldValues: 'TRUE' 
                    },
                    Widget: {
                        renderingPolicy: '1'
                    }
                }
            }, callbackInfo);
        },

        getAutoLogOut: function (callback, callbackInfo) {
            callback({
                enabled: false
            }, callbackInfo);
        },

        loadVisuData: function (visuId, callback, callbackInfo) {

            if (brease.config.mockType === 'project') {

                $.getJSON('/' + visuId + '.json', function (data) {
                    callback({
                        success: true,
                        visuData: data
                    }, callbackInfo);
                }).fail(function (jqxhr, textStatus, error) {
                    console.log('error:' + JSON.stringify({
                        status: textStatus, errorMessage: error.toString()
                    }));
                    callback({
                        success: false, status: textStatus
                    }, callbackInfo);
                });
            } else {

                if (visuId.toLowerCase() === 'malformedvisu') {
                    callback({
                        success: false, status: 'parsererror'
                    }, callbackInfo);
                } else {
                    var visuData = ServerStub.getVisuData(visuId);

                    if (visuData) {
                        callback({
                            success: true,
                            visuData: visuData
                        }, callbackInfo);
                    } else {
                        //console.log("error", { status: '', errorMessage: 'visu not found' });
                        callback({
                            success: false, status: VisuStatus.NOT_FOUND
                        }, callbackInfo);
                    }
                }
            }
        },

        logEvents: function (data, callback) {

            var response = {
                success: true,
                verboseLvl: 255
            };
            callback(response);
        },

        /********************
        *** TEXT related ****
        *********************/
        loadLanguages: function (callback) {
            var response = ServerStub.getLanguages();
            response.success = true;
            callback(response);
        },

        switchLanguage: function (langKey, callback, callbackInfo) {
            ServerStub.setCurrentLanguage(langKey);
            callback({
                langKey: langKey, success: true
            }, callbackInfo);
        },

        loadTexts: function (langKey, callback, callbackInfo) {
            var response = ServerStub.getCurrentText();
            response.success = true;
            if (timeoutForTextLoad > 0) {
                timeoutIds.add(window.setTimeout(function () {
                    callback(response, callbackInfo);
                }, timeoutForTextLoad));
            } else {
                callback(response, callbackInfo);
            }
        },

        loadSystemTexts: function (langKey, callback, callbackInfo) {
            var response = ServerStub.getCurrentText();
            response.success = true;
            callback(response, callbackInfo);
        },

        getAllUnitSymbols: function (langKey, callback, callbackInfo) {
            if (langKey !== undefined) {
                var response = {
                    unitSymbols: ServerStub.getAllUnitSymbols(),
                    success: true
                };
                callback(response, callbackInfo);
            }
        },

        getUnitSymbols: function (langKey, commonCodes, callback, callbackInfo) {
            if (langKey !== undefined) {
                var symbols = {
                };
                for (var i = 0; i < commonCodes.length; i += 1) {
                    symbols[commonCodes[i]] = ServerStub.getUnitSymbol(commonCodes[i]);
                }
                var response = {
                    unitSymbols: symbols,
                    success: true
                };
                callback(response, callbackInfo);
            }
        },

        /***********************
        *** CULTURE related ***
        ***********************/
        loadCultures: function (callback) {
            var response = ServerStub.getCultures();
            response.success = true;
            callback(response);
        },

        switchCulture: function (cultureKey, callback) {
            ServerStub.setCurrentCulture(cultureKey);
            callback({
                cultureKey: cultureKey, success: true
            });
        },

        /***********************
        *** MeasurementSystem related ***
        ***********************/
        loadMeasurementSystemList: function (callback, callbackInfo) {
            var response = ServerStub.getMMSystems();
            response.success = true;
            callback(response, callbackInfo);
        },

        switchMeasurementSystem: function (key, callback, callbackInfo) {
            if (key !== undefined) {
                ServerStub.setCurrentMMS(key);
                callback({
                    success: true
                }, callbackInfo);
            }
        },

        /***********************
        *** USER related ***
        ***********************/
        authenticateUser: function (username, password, callback) {
            var auth = user.authenticate(username, password);

            if (auth !== undefined) {
                callback({
                    success: true, user: auth
                });
            } else {
                callback({
                    success: false
                });
            }

        },

        setCurrentUser: function (userobj, callback) {
            user.currentUser = userobj;
            if (typeof callback === 'function') {
                callback({
                    success: true
                });
            }
            user.triggerUserChange(userobj);

        },

        loadCurrentUser: function (callback) {
            callback({
                success: true, user: user.currentUser
            });

        },

        setDefaultUser: function (callback) {
            var userobj = user.authenticate('anonymous', '');

            user.currentUser = userobj;
            callback({
                success: true, user: user.currentUser
            });
            user.triggerUserChange(userobj);

        },

        userHasRoles: function (roles, callback) {
            var response = {
            };
            for (var i = 0; i < roles.length; i += 1) {
                response[roles[i]] = roles[i] !== 'NotInRole';
            }
            callback({
                success: true, roles: response
            });
        },

        loadUserRoles: function (callback, callbackInfo) {
            callback({
                success: true, roles: _roles[user.currentUser.userID] || ['Everyone']
            }, callbackInfo);
        },

        loadPasswordPolicies: function (callback, callbackInfo) {
            callback({ success: false }, callbackInfo);
        },

        loadUserList: function (details, callback, callbackInfo) {
            callback({ success: false }, callbackInfo);
        },
        loadUserData: function (userName, callback, callbackInfo) {
            callback({ success: false }, callbackInfo);
        },

        formatText: function (text, args, callback) {
            if (text.indexOf('snippetError') !== -1) {
                callback({
                    success: false, string: text
                });
            } else {
                for (var i = 0; i < args.length; i += 1) {
                    text = text.replace(new RegExp('\\{' + (i + 1) + '\\}', ['g']), args[i]);
                }
                callback({
                    success: true, string: text
                });
            }
        },

        setClientInformation: function () {

        },

        /*#######################
        ### Action Event related ###
        #######################*/

        getEventSubscription: function (contentId, visuId, callback, callbackInfo) {
            var response = {
                'contentId': contentId,
                'success': true
            };
            response.eventSubscriptions = ServerStub.getEventSubscriptions(contentId);
            callback(response, callbackInfo);
        },
        getSessionEventSubscription: function (callback, callbackInfo) {
            var response = {
                'contentId': '_session',
                'success': true
            };
            response.eventSubscriptions = ServerStub.getSessionEventSubscriptions();
            callback(response, callbackInfo);
        },
        testServices: testServices,
        mocked: true,
        
        /*#######################
        ### OPC UA ###
        #######################*/

        opcuaReadNodeHistory: function (data, parameter, callback, callbackInfo) {
            callback({ success: true }, callbackInfo);
        },

        opcuaReadHistoryCount: function (data, parameter, callback, callbackInfo) {
            callback({ success: true }, callbackInfo);
        },

        opcuaReadHistoryStart: function (data, parameter, callback, callbackInfo) {
            callback({ success: true }, callbackInfo);
        },

        opcuaReadHistoryEnd: function (data, parameter, callback, callbackInfo) {
            callback({ success: true }, callbackInfo);
        },

        opcuaBrowse: function (data, parameter, callback, callbackInfo) {
            callback({ success: true }, callbackInfo);
        },

        opcuaCallMethod: function (data, parameter, callback, callbackInfo) {
            callback({ success: true }, callbackInfo);
        },

        opcuaRead: function (data, parameter, callback, callbackInfo) {
            callback({ success: true }, callbackInfo);
        }

    };
});
