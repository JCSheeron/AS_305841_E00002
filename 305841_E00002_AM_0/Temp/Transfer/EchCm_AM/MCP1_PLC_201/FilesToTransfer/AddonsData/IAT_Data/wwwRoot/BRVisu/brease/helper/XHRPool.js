define(['brease/helper/XHR'], function (XHR) {

    'use strict';

    var XHRPool = {

            getXHR: function (callbackInfo) {
                var xhr = _getAvailable();
                if (xhr === undefined) {
                    xhr = new XHR();
                    _pool.push(xhr);
                }
                xhr.active = true;
                xhr.callbackInfo = callbackInfo;
                return xhr;
            }

        }, _pool = [];

    /*
    /* PRIVATE
    */

    function _getAvailable() {
        var xhr;

        for (var i = 0; i < _pool.length; i += 1) {

            if (_pool[i].active !== true) {
                xhr = _pool[i];
                break;
            }
        }
        return xhr;
    }

    return XHRPool;

});
