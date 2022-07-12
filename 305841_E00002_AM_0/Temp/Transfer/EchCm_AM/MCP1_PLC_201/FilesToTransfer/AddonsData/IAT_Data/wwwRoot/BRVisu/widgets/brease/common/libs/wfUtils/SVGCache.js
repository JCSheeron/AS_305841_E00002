define(function () {

    'use strict';

    /**
     * @class widgets.brease.common.libs.wfUtils.SVGCache
     * #Description
     * Util used for caching svg xml string
    */

    var SVGCache = {

            contains: function (src) {
                return _cache[src] !== undefined;
            },
            add: function (src) {
                _cache[src] = {
                    deferred: $.Deferred(),
                    resolve: function (strXml) {
                        this.deferred.resolve(strXml);
                    }
                };
            },
            resolve: function (src, strXml) {
                _cache[src].resolve(strXml);
            },
            done: function (src, fn) {
                return _cache[src].deferred.done(fn);
            }
        },
        _cache = {};

    return SVGCache;

});
