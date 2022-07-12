define(['brease/events/SocketEvent'], 
    function (SocketEvent) {

        'use strict';
        /**
        * @class brease.services.lib.Watchdog
        * @extends core.javascript.Object
        * Class for monitoring connection via websocket heartbeat.
        */
        var Watchdog = function (eventDispatcher) {
                this.eventDispatcher = eventDispatcher;
                this.timeout = 10000;
                if (brease.config.watchdog !== undefined && (brease.config.watchdog === 0 || brease.config.watchdog >= 10000)) {
                    this.timeout = brease.config.watchdog;
                }
            },
            p = Watchdog.prototype;

        /**
         * Sends a ping (heartbeat) immedialty to the server and starts the connection timeout timer with time=brease.config.watchdog 
         * If the server replies with no pong we try to send a ping again after watchdog/2 time.
         * When the server sends a pong we reply with a ping after watchdog/2 time.
         * If we get any message from the server we restart the connection timer.
         * If we get no message for the duration of watchdog time SocketEvent.WATCHDOG_TIMEOUT will be fired.
         * @param {Object} socket 
         */
        p.start = function (socket) {
            if (this.timeout < 10000) {
                return;
            }
            this.socket = socket;
            _sendHeartbeat.call(this);
            _sendHeartbeat.call(this, true);
            _startTimer.call(this);
            
            var keepAliveEvents = [SocketEvent.PONG, SocketEvent.PROPERTY_VALUE_CHANGED, SocketEvent.ACTION, SocketEvent.CONTENT_ACTIVATED, SocketEvent.CONTENT_DEACTIVATED];
            keepAliveEvents.forEach(function (event) {
                this.eventDispatcher.addEventListener(event, _onSocketEvent.bind(this));
            }, this);
        };

        /**
         * Stop any running timeouts.
         */
        p.stop = function () {
            window.clearTimeout(this.heartbeat);
            window.clearTimeout(this.timer);
        };

        /**
         * @returns Timeout in ms after which SocketEvent.WATCHDOG_TIMEOUT will be fired.
         */
        p.getTimeout = function () {
            return this.timeout;
        };

        function _onSocketEvent(event) {
            if (event.type === SocketEvent.PONG) {
                _sendHeartbeat.call(this, true);
            }
            _startTimer.call(this);
        }

        function _startTimer() {
            window.clearTimeout(this.timer);
            this.timer = window.setTimeout(_onTimeout.bind(this), this.timeout);
        }
        
        function _onTimeout() {
            this.eventDispatcher.dispatchEvent({ type: SocketEvent.WATCHDOG_TIMEOUT });
        }

        function _sendHeartbeat(useTimeout) {
            window.clearTimeout(this.heartbeat);
            
            if (this.socket.readyState === WebSocket.OPEN) {
                if (useTimeout === true) {
                    this.heartbeat = window.setTimeout(_sendHeartbeat.bind(this), this.timeout / 2);
                } else {
                    this.socket.send('ping');
                }
            }
        }

        return Watchdog;
    });
