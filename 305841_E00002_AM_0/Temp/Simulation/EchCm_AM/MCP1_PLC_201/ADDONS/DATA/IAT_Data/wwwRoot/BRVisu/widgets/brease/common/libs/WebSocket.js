define([
    'brease/core/Class',
    'brease/core/Utils'
], function (SuperClass, Utils) {

    'use strict';

    var BUFFER_SIZE = 1024 * 1024 * 4,

        EnumErrors = {
        //Warnings
            WARNING: 0,
            CONNECTION_ATTEMPT_CONNECTED: 1,
            DISCONNECTION_ATTEMPT_DISCONNECTED: 2,
            SEND_MSG_DISCONNECTED: 3,
            //Socket errors
            SOCKET_ERRORS: 999,
            HOST_NOT_REACHEABLE: 1000,
            CONNECTION_CLOSED_CLIENT: 1005,
            CONNECTION_CLOSED_SERVER: 1006,
            //Connection errors
            CONNECTION_ERRORS: 1999,
            WRONG_HOST: 2000,
            WRONG_PORT: 2001,
            UNEXPECTED_ERROR_CONNECTION: 2002,
            UNEXPECTED_ERROR_SOCKET: 2003,
            WRONG_PROTOCOL_IN_CONNECTION: 2004,
            //Critical errors
            CRITICAL_ERRORS: 3000,
            BUFFER_FULL: 3001,
            BUFFER_NOT_ENOUGH_DATA: 3002
        },

        WidgetSocket = SuperClass.extend(function WidgetSocket() {
            SuperClass.apply(this, arguments);
            // eslint-disable-next-line no-unused-expressions
            this._resolver;
            // eslint-disable-next-line no-unused-expressions
            this._rejecter;
            this.textDecoder = new TextDecoder();
            this.buffer = new ArrayBuffer(BUFFER_SIZE);
            this.bufferView = new Uint8Array(this.buffer);
            this.bytesQueued = 0;
            this.endIndex = 0;
            this.beginIndex = 0;
        }, null),

        p = WidgetSocket.prototype;

    //getters for data

    p.getString = function (bytes) {
        var that = this;
        return this.getBytesFromBuffer(bytes).then(function (bufferData) {
            return that.textDecoder.decode(bufferData);
        }).catch(function () {
            return Promise.reject(new Error('Connection closed'));
        });
    };

    p.getDataView = function (bytes) {
        return this.getBytesFromBuffer(bytes).then(function (bufferData) {
            return new DataView(bufferData);
        }).catch(function () {
            return Promise.reject(new Error('Connection closed'));
        });
    };

    //get data from buffer

    p.getBytesFromBuffer = function (bytes) {
        var that = this;
        if (this.bytesQueued >= bytes) {
            this.queueingBytes = false;
            return Promise.resolve(_getBufferData(bytes, that));
        } else {
            this.queueingBytes = true;
            this.byteToQueue = bytes;
            return new Promise(function (resolve, reject) { 
                that._resolver = resolve;
                that._rejecter = reject;
            });
        }
    };

    //commands

    p.connect = function (server, port) {
        this.onError = false;
        var uri = _buildUri(server, port);
        if (uri === 0) {
            this.errorHandling(EnumErrors.WRONG_HOST);
        } else if (uri === 1) {
            this.errorHandling(EnumErrors.WRONG_PORT);
        } else if (uri === 2) {
            this.errorHandling(EnumErrors.WRONG_PROTOCOL_IN_CONNECTION);
        } else {
            if (this.WSocket === undefined || this.WSocket.readyState === WebSocket.CLOSED || this.WSocket.readyState === WebSocket.CLOSING) {
                try {
                    this.WSocket = new WebSocket(uri);
                    this.WSocket.onmessage = this.socketReceivedMessage.bind(this);
                    this.WSocket.onopen = this.socketOpened.bind(this);
                    this.WSocket.onclose = this.socketClosed.bind(this);
                    this.WSocket.onerror = this.socketError.bind(this);
                } catch (e) {
                    this.errorHandling(EnumErrors.UNEXPECTED_ERROR_CONNECTION);
                }
            } else {
                this.errorHandling(EnumErrors.CONNECTION_ATTEMPT_CONNECTED);
            }
        }
    };

    p.disconnect = function () {
        if (this.WSocket !== undefined) {
            if (this.WSocket.readyState === WebSocket.OPEN || this.WSocket.readyState === WebSocket.CONNECTING) {
                this.WSocket.close();
                this.WSocket.onmessage = function () { };
                this.WSocket = undefined;
            } else {
                this.errorHandling(EnumErrors.UNEXPECTED_ERROR_CONNECTION);
            }
        } else {
            this.errorHandling(EnumErrors.DISCONNECTION_ATTEMPT_DISCONNECTED);
        }
    };

    p.sendMessage = function (message) {
        if (this.WSocket !== undefined) {
            if (this.WSocket.readyState === WebSocket.OPEN) {
                this.WSocket.send(message);
            }
        }
    };

    p.dispose = function () {
        if (this.WSocket !== undefined) {
            this.WSocket.onmessage = function () { };
            this.WSocket.onopen = function () { };
            this.WSocket.onclose = function () { };
            this.WSocket.onerror = function () { };
            this.disconnect();
        }     
        this.bytesQueued = 0;
        this.endIndex = 0;
        this.beginIndex = 0;
        SuperClass.prototype.dispose.apply(this, arguments);
    };

    //events private

    p.socketReceivedMessage = function (message) {
        var that = this;
        var reader = new FileReader();
        reader.onload = function () {
            if (that.WSocket !== undefined) {
                _setBufferData(reader.result, that);
                that.onMessageRecived();
                if (that.queueingBytes) {
                    if (that.bytesQueued >= that.byteToQueue) {
                        that._resolver(_getBufferData(that.byteToQueue, that));
                        that.queueingBytes = false;
                    }
                }
            }
        };
        reader.readAsArrayBuffer(message.data);
    };

    p.socketOpened = function (e) {
        this.bytesQueued = 0;
        this.endIndex = 0;
        this.beginIndex = 0;
        this.onConnect(e);
    };

    p.socketClosed = function (e) {
        this.bytesQueued = 0;
        this.endIndex = 0;
        this.beginIndex = 0;
        if (this.queueingBytes) {
            this._rejecter();
        }
        if (e.code !== EnumErrors.CONNECTION_CLOSED_CLIENT) {
            this.errorHandling(e.code);
        } else if (!this.onError) {
            this.onDisconnect();
        }
    };

    p.socketError = function () {
        this.bytesQueued = 0;
        this.endIndex = 0;
        this.beginIndex = 0;
        if (this.queueingBytes) {
            this._rejecter();
        }
        this.errorHandling(EnumErrors.UNEXPECTED_ERROR_SOCKET);
    };

    //error handling
    p.errorHandling = function (errorNumber) {
        if (errorNumber <= EnumErrors.SOCKET_ERRORS) {
            this.onWarning(errorNumber);
        } else {
            if (!this.onError) {
                this.onError = true;
                if (errorNumber >= EnumErrors.CRITICAL_ERRORS) {
                    this.disconnect();
                }
                this.onConnectionFailed(errorNumber);
            }
        }
    };

    //events to be overwritten

    p.onMessageRecived = function () {
        //ToBe overwritten
    };

    p.onConnect = function () {
        //ToBe overwritten
    };

    p.onDisconnect = function () {
        //ToBe overwritten
    };

    p.onConnectionFailed = function () {
        //ToBe overwritten
    };

    p.onWarning = function () {
        //ToBe overwritten
    };

    //Private functions

    function _buildUri(server, port) {
        var socketProtocol = '';
        if (!Utils.isString(server)) {
            return 0;
        }
        var validIpAddress = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(server),
            validHostname = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$/.test(server);
        if (!(validIpAddress || validHostname)) {
            return 0;
        }
        if (!Utils.isNumeric(port)) {
            return 1;
        }
        if (port < 0 || port > 65535) {
            return 1;
        }
        if (window.location.protocol === 'http:') {
            socketProtocol = 'ws://';
        } else if (window.location.protocol === 'https:') {
            socketProtocol = 'wss://';
        } else {
            return 2;
        }
        return socketProtocol + window.location.host + '/ws2tcp?host=' + server + '&port=' + port;
    }

    //Buffer manipulation

    function _setBufferData(data, rfb) {
        if (rfb.bytesQueued + data.byteLength > BUFFER_SIZE) {
            rfb.errorHandling(EnumErrors.BUFFER_FULL);
        } else {
            if (rfb.endIndex + data.byteLength < BUFFER_SIZE + 1) {
                rfb.bufferView.set(new Uint8Array(data), rfb.endIndex);
                rfb.endIndex = rfb.endIndex + data.byteLength;
                if (rfb.endIndex === BUFFER_SIZE) {
                    rfb.endIndex = 0;
                }
            } else {
                var subArray1 = data.slice(0, BUFFER_SIZE - rfb.endIndex),
                    subArray2 = data.slice(BUFFER_SIZE - rfb.endIndex);
                rfb.bufferView.set(new Uint8Array(subArray1), rfb.endIndex);
                rfb.bufferView.set(new Uint8Array(subArray2), 0);
                rfb.endIndex = rfb.endIndex + data.byteLength - BUFFER_SIZE;
            }
            rfb.bytesQueued = rfb.bytesQueued + data.byteLength;
        }
    }

    function _getBufferData(bytes, rfb) {
        if (bytes > rfb.bytesQueued) {
            rfb.errorHandling(EnumErrors.BUFFER_NOT_ENOUGH_DATA);
        } else {
            var arrayToReturn;
            if (rfb.beginIndex + bytes < BUFFER_SIZE + 1) {
                arrayToReturn = rfb.buffer.slice(rfb.beginIndex, bytes + rfb.beginIndex);
                rfb.beginIndex = rfb.beginIndex + bytes;
            } else {
                var sizeSubArray1 = BUFFER_SIZE - rfb.beginIndex,
                    sizeSubArray2 = bytes - sizeSubArray1,
                    subArray1 = rfb.buffer.slice(rfb.beginIndex),
                    subArray2 = rfb.buffer.slice(0, sizeSubArray2),
                    arrayToReturnView;
                arrayToReturn = new ArrayBuffer(bytes);
                arrayToReturnView = new Uint8Array(arrayToReturn);
                arrayToReturnView.set(new Uint8Array(subArray1));
                arrayToReturnView.set(new Uint8Array(subArray2), sizeSubArray1);
                rfb.beginIndex = sizeSubArray2;
            }
            rfb.bytesQueued = rfb.bytesQueued - bytes;
            return arrayToReturn;
        }
    }

    return WidgetSocket;

});
