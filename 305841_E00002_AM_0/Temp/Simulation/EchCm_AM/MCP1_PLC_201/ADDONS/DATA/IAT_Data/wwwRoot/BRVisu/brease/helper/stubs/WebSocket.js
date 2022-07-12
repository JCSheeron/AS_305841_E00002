define(['brease/helper/stubs/Server', 
    'brease/events/SocketEvent',
    'brease/services/libs/ServerCommand',
    'brease/core/Utils'
], function (Server, SocketEvent, ServerCommand, Utils) {

    'use strict';

    var configTemplate = {
            timeout: { 
                sessionActivated: 0,
                activateContentResponse: 0,
                activateContent: 10,
                deactivateContentResponse: 0,
                deactivateContent: 10
            },
            status: {
                activateContent: 0
            }
        },
        config = Utils.deepCopy(configTemplate),
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

    function _editorListener(e) {
        if (e.detail.event === 'LanguageChangedByEditor') {
            var eventType = SocketEvent.LANGUAGE_CHANGED,
                event = {
                    'event': eventType,
                    'detail': { currentLanguage: e.detail.currentLanguage }
                };
            Server.dispatchEvent(event, eventType);
        }
    }

    function _activateResponse(data, eventType) {
        var event = {
            'event': eventType,
            'detail': {
                contentId: data.Parameter.contentId,
                status: { code: config.status.activateContent }
            }
        };
        Server.dispatchEvent(event, eventType);
    }
    function _activateEvent(data, eventType) {
        var event = {
            'event': eventType,
            'detail': {
                contentId: data.Parameter.contentId,
                success: true
            }
        };
        Server.dispatchEvent(event, eventType);
    }

    function deferWithTimeout(fn, timeout, dataObj, command) {
        if (timeout > 0) {
            timeoutIds.add(window.setTimeout(fn.bind(this, dataObj, command), timeout)); 
        } else {
            fn(dataObj, command);
        }
    }

    return {
        send: function (dataObj) {
            if (dataObj && dataObj.Command === 'update') {
                Server.setData(dataObj.Data);
            }
            if (dataObj && dataObj.Command === ServerCommand.ACTIVATE_CONTENT) {
                deferWithTimeout.call(this, _activateResponse, config.timeout.activateContentResponse, dataObj, ServerCommand.ACTIVATE_CONTENT);
                deferWithTimeout.call(this, _activateEvent, config.timeout.activateContent, dataObj, SocketEvent.CONTENT_ACTIVATED);
            }
            if (dataObj && dataObj.Command === ServerCommand.DEACTIVATE_CONTENT) {
                deferWithTimeout.call(this, _activateResponse, config.timeout.deactivateContentResponse, dataObj, ServerCommand.DEACTIVATE_CONTENT);
                deferWithTimeout.call(this, _activateEvent, config.timeout.deactivateContent, dataObj, SocketEvent.CONTENT_DEACTIVATED);
            }
        },

        getModelData: function (widgetId, attribute) {
            return Server.getModelData(widgetId, attribute);
        },

        setData: function (key, value, type) {
            if (type === 'timeout') {
                config.timeout[key] = value;
            } 
            if (type === 'status') {
                config.status[key] = value;
            }
        },

        resetData: function () {
            config = Utils.deepCopy(configTemplate);
        },

        reset: function () {
            this.resetData();
            timeoutIds.reset();
        },

        start: function (callback) {
            callback(true);
            document.body.addEventListener('EditorEvent', _editorListener);
            timeoutIds.add(window.setTimeout(function () {
                var type = SocketEvent.SESSION_ACTIVATED;
                Server.dispatchEvent({ event: type }, type);
            }, config.timeout.sessionActivated));

        },
        startHeartbeat: function () {

        },
        addEventListener: function (eventType, fn) {
            Server.addEventListener(eventType, fn);
        },
        removeEventListener: function (eventType, fn) {
            Server.removeEventListener(eventType, fn);
        },
        triggerServerAction: function (action, target, actionId, args) {
            var type = 'action';
            Server.dispatchEvent({
                'event': type,
                'detail': {
                    'action': action,
                    'target': target,
                    'actionArgs': args || {},
                    'actionId': actionId
                }
            }, type);
        },

        triggerServerChange: function (widgetId, attribute, value) {
            var type = SocketEvent.PROPERTY_VALUE_CHANGED;
            Server.dispatchEvent({
                'event': type,
                'detail': [
                    {
                        'data': [
                            {
                                'attribute': attribute,
                                'value': value
                            }
                        ],
                        'refId': widgetId
                    }
                ]
            }, type);
        },

        triggerConnectionStateChange: function (state) {
            var type = SocketEvent.CONNECTION_STATE_CHANGED;
            Server.dispatchEvent({
                event: type,
                detail: { state: state }
            }, type);
        },

        triggerContentActivated: function (contentId) {
            var type = SocketEvent.CONTENT_ACTIVATED;
            Server.dispatchEvent({
                event: type,
                detail: { contentId: contentId }
            }, type);
        },

        triggerContentDeactivated: function (contentId) {
            var type = SocketEvent.CONTENT_DEACTIVATED;
            Server.dispatchEvent({
                event: type,
                detail: { contentId: contentId }
            }, type);
        },
        COMMAND: ServerCommand
    };
});
