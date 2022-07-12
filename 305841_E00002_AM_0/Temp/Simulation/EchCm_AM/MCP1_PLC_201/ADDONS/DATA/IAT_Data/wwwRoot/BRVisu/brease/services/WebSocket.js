define(['brease/events/EventDispatcher', 
    'brease/services/libs/ServerCommand',
    'brease/services/libs/Watchdog',
    'brease/events/SocketEvent'], 
function (EventDispatcher, ServerCommand, Watchdog, SocketEvent) {

    'use strict';

    var _enabled = false,
        _config,
        _callback,
        _socket,
        _watchdog;

    function _startSocket(SocketClass, initialTimeout) {
        if ('WebSocket' in window) {
            var socketType = 'ws://';

            if (window.location.protocol.indexOf('https') === 0) {
                socketType = 'wss://';
            }
            try {
                var cmto = window.setTimeout(function () {
                    _socketError('timedOutInitially');
                }, (initialTimeout !== undefined) ? initialTimeout : 15000);

                if (!SocketClass) {
                    SocketClass = window.WebSocket;
                }
                _socket = new SocketClass(socketType + _config.host + ':' + _config.port + '?watchdog=' + _watchdog.getTimeout());

                _socket.onmessage = _onSocketMessage;

                _socket.onopen = function () {
                    console.log(socketModule.MESSAGES['success']);
                    window.clearTimeout(cmto);
                    _config.sockets.available = true;
                    _callback(true);
                };

                _socket.onclose = function () {
                    console.log(socketModule.MESSAGES['socketClosed']);
                    window.clearTimeout(_closingTimer);
                    if (_config.sockets.available !== true) {
                        window.clearTimeout(cmto);
                        _socketError('socketClosedBeforeSuccess');
                    } else {
                        _watchdog.stop();
                        _processSocketMessage({
                            type: SocketEvent.CONNECTION_STATE_CHANGED,
                            detail: {
                                state: false
                            }
                        });
                    }
                };

                _socket.onerror = function (e) {
                    _socketError('SOCKET ERROR[' + e.type + ']:' + e.message);
                };

            } catch (e) {
                _socketError('openSocketError', '\n' + e.message);
            }
        } else {
            _socketError('noSockets');
        }
    }

    function _onSocketMessage(event) {
        if (event.data === 'pong') {
            _processSocketMessage({
                type: SocketEvent.PONG
            });
            return;
        }
        var info;
        try {
            info = JSON.parse(event.data);
        } catch (e) {
            console.warn(socketModule.MESSAGES['parsererror'] + '\n' + e.message);
        }
        if (info) {
            if (info.Command === socketModule.COMMAND.GET_UPDATE || info.Command === socketModule.COMMAND.SYSTEM) {
                _processSocketMessage({
                    type: info.Data.event,
                    detail: info.Data.eventArgs
                });
            } else if (info.Command === socketModule.COMMAND.EVENT) {
                if (info.Data !== undefined) {
                    _processSocketMessage({
                        type: info.Data.event,
                        detail: info.Data.eventArgs
                    });
                }

            } else if (info.Command === socketModule.COMMAND.ACTION) {
                _processSocketMessage({
                    type: info.Command,
                    detail: info.Data
                });
            } else if (info.Command === socketModule.COMMAND.ACTIVATE_CONTENT || info.Command === socketModule.COMMAND.DEACTIVATE_CONTENT) {
                // Example command from Server:
                // { Command: "activatecontent", Data: {contentId: "con1", visuId: "vis1"},
                //   Resource: "services/client", status: {code: 0, message: ""} }
                var detail = info.Data;
                detail.status = info.status;
                _processSocketMessage({
                    type: info.Command,
                    detail: detail
                });
            } else if (info.Command === socketModule.COMMAND.SUBSCRIBE || info.Command === socketModule.COMMAND.UNSUBSCRIBE) {
                _processSocketMessage({
                    type: info.Command,
                    detail: info.Data
                });
            }
        }
    }

    var _closingTimer;

    function _onWatchdogTimeout() {
        if (_socket.readyState === WebSocket.OPEN) {
            _socket.close();
            _closingTimer = window.setTimeout(function name() {
                if (_socket.readyState === _socket.CLOSING) {
                    console.log(socketModule.MESSAGES['socketNotClosing']);
                    _socket.onclose();
                    _socket.onclose = null;
                }

            }, 1500);
        }
    }

    function _processSocketMessage(event) {
        socketModule.dispatchEvent(event);
    }

    function _socketError(errorId, additional) {
        var message = socketModule.MESSAGES[errorId] + (additional || '');
        if (message) {
            console.log(message);
        }
        _callback(false);
        _processSocketMessage({
            type: SocketEvent.CONNECTION_STATE_CHANGED,
            detail: {
                state: false
            }
        });
    }

    var socketModule = new EventDispatcher();

    /**
    * @method send
    * send command via WebSocket  
    * @param {Object} data
    * @param {brease.services.libs.ServerCommand} data.Command  
    * @param {Object} data.Parameter for e.g. activateContent {"contentId":"someContent", "visuId":"someVisu"}
    * @param {Object} data.Data for e.g. event {"event":"LoginFailed","source":{"type":"clientSystem.Event"},"eventArgs":{"userName":"u1"}}
    */
    socketModule.send = function (data) {
        data.Resource = socketModule.RESOURCE;
        _socket.send(JSON.stringify(data));
    };

    socketModule.start = function (callback, SocketClass, initialTimeout) {

        _callback = callback;
        _config = {
            sockets: {},
            port: window.location.port,
            host: window.location.hostname
        };
        _watchdog = new Watchdog(this);

        if (_enabled !== true) {
            _enabled = true;
            _startSocket(SocketClass, initialTimeout);
        }
    };
    socketModule.startHeartbeat = function () {
        _watchdog.start(_socket);
        this.addEventListener(SocketEvent.WATCHDOG_TIMEOUT, _onWatchdogTimeout);
    };
    socketModule.MESSAGES = {
        timedOutInitially: 'socket connection timed out!',
        success: 'socket connection established!',
        parsererror: 'could not parse server message',
        noSockets: 'WebSockets not available',
        openSocketError: 'could not open WebSocket',
        socketClosed: 'socket connection closed!',
        socketClosedBeforeSuccess: 'socket connection closed before opened --> failure!',
        socketNotClosing: 'socket not closing -> force close'
    };

    socketModule.COMMAND = ServerCommand;

    socketModule.RESOURCE = 'services/client';

    return socketModule;
});
