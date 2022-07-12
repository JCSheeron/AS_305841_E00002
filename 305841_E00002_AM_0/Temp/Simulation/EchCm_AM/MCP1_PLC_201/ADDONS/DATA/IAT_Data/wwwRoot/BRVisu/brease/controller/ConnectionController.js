define(['brease/events/SocketEvent'], function (SocketEvent) {

    'use strict';

    /**
    * @class brease.controller.ConnectionController
    * @extends Object
    * controls server connections
    * @singleton
    */
    var ConnectionController = {
            init: function (runtimeService, systemMessage, transferFinishedHandler) {
                _transferFinishedHandler = transferFinishedHandler || window.location.reload.bind(window.location);
                runtimeService.addEventListener(SocketEvent.CONNECTION_STATE_CHANGED, _connectionStateChangedHandler.bind(this));
                runtimeService.addEventListener(SocketEvent.TRANSFER_START, _transferStartHandler.bind(this, systemMessage));
                runtimeService.addEventListener(SocketEvent.TRANSFER_FINISH, _transferFinishHandler.bind(this, systemMessage));
            }
        },
        _transferInProcess = false, _transferFinishedHandler;

    function _connectionStateChangedHandler(e) {
        if (_transferInProcess !== true) {
            document.body.dispatchEvent(new CustomEvent(SocketEvent.CONNECTION_STATE_CHANGED, { detail: { state: e.detail.state } }));
            window._connectionErrorHandler(true, brease.language.getSystemTextByKey('BR/IAT/brease.common.connectionError.text'));
        } else {
            window._tryReconnect();
        }
    }

    function _transferStartHandler(systemMessage) {
        _transferInProcess = true;
        window._connectionErrorHandler = function () {};
        systemMessage.showMessage(brease.language.getSystemTextByKey('BR/IAT/brease.common.transferStart'));
    }

    function _transferFinishHandler(systemMessage) {
        _transferInProcess = false;
        systemMessage.clear();
        _transferFinishedHandler();
    }

    return ConnectionController;

});
