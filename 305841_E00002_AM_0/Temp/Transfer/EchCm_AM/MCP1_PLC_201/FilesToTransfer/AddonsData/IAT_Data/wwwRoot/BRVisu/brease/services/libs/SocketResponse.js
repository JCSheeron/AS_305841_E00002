
define(['brease/services/libs/ServerCode'], function (ServerCode) {

    'use strict';

    var SocketResponse = function (socket, eventType) { 
            this.queue = new Map();
            this.eventType = eventType;
            this.boundListener = this.socketListener.bind(this);
            this.socket = socket;
            this.socket.addEventListener(eventType, this.boundListener);
        },
        p = SocketResponse.prototype;
        
    p.init = function (socket) {
        if (this.socket) {
            this.socket.removeEventListener(this.eventType, this.boundListener); 
        }
        this.socket = socket;
        this.socket.addEventListener(this.eventType, this.boundListener);
    };

    /**
    * @method add 
    * @param {String} contentId 
    * @param {Object} request 
    * @param {Function} request.callback callback function
    * @param {Object} request.callbackInfo a loop through object which is delivered to the callback function as last parameter
    */
    p.add = function (contentId, request) {
        this.queue.set(contentId, request);
    };

    p.socketListener = function (e) { 
        var contentId = (e.detail) ? e.detail.contentId : undefined,
            request = this.queue.get(contentId);
        if (request) {
            var success = e.detail && e.detail.status && e.detail.status.code === ServerCode.SUCCESS;
            if (request.callbackInfo) {
                request.callback({ success: success }, request.callbackInfo); 
            } else {
                request.callback({ success: success });
            }
            this.queue.delete(contentId);
        }
    };

    return SocketResponse;
});
