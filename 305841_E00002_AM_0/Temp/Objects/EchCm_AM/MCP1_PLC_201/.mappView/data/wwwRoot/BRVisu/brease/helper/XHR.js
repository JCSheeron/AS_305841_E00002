define(['brease/objects/Response', 'brease/core/Utils'], function (Response, Utils) {

    'use strict';

    var XHR = function () {

        try {
            this.xhr = new XMLHttpRequest();
            this.ontimeout = _ontimeout.bind(this);
            this.onreadystatechange = _onreadystatechange.bind(this);
        } catch (e) {
            console.log('XMLHttpRequest not supported!');
            return null;
        }
    };

    XHR.prototype.open = function open(method, url) {
        if (method === 'GET') {
            //A&P 615290: disable any caching for GET requests due to iPad connection error for desktop web apps
            url = Utils.addTimestamp(url); 
        }
        this.xhr.open(method, url, true);
        this.xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        this.xhr.setRequestHeader('Cache-Control', 'no-cache');
        this.xhr.setRequestHeader('Accept', '*/*');
        this.xhr.ontimeout = this.ontimeout;
        this.xhr.onreadystatechange = this.onreadystatechange;
    };

    XHR.prototype.send = function send(data, callback) {
        this.callback = callback;
        this.xhr.send(data);
    };

    // XMLHttpRequest.UNSENT: 0
    // XMLHttpRequest.OPENED: 1
    // XMLHttpRequest.HEADERS_RECEIVED: 2
    // XMLHttpRequest.LOADING: 3
    // XMLHttpRequest.DONE: 4
    function _onreadystatechange() {
        
        if (this.xhr.readyState !== XMLHttpRequest.DONE) {
            return;
        }
        if (this.xhr.status === 0) { // http status
            console.log('%chttp status 0 for server connection!', 'color:#fa00f1;');
            window._connectionErrorHandler();
        } else {
            if (typeof this.callback === 'function') {
                this.callback(Response.fromXHR(this.xhr.responseText), this.callbackInfo);
            }
        }
        _freeUp.call(this);
    }

    function _ontimeout() {
        window._connectionErrorHandler();
        _freeUp.call(this);
    }

    function _freeUp() {
        this.xhr.ontimeout = undefined;
        this.xhr.onreadystatechange = undefined;
        this.callback = undefined;
        this.callbackInfo = undefined;
        this.active = false;
    }

    return XHR;

});
