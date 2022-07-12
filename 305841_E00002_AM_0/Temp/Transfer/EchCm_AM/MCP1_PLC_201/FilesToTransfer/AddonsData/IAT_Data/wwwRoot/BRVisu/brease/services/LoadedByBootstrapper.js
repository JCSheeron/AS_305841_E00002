define(['libs/polyfill'], function () {

    'use strict';

    /**
    * @class brease.services.LoadedByBootstrapper
    * @extends Object
    * @singleton
    * This class loads all the values, which have already been loaded in the boot phase by bootstrapper.
    */

    var loadedValues = {
            get: function (key) {
                var value = data.get(key);
                if (value !== undefined) {
                    data.delete(key);
                }
                return value;
            }
        },
        data = new Map();

    (function init() {
        if (window.brease && window.brease.preloaded) {
            for (var key in window.brease.preloaded) {
                data.set(key, window.brease.preloaded[key]);
            }
        }
    })();

    return loadedValues;

});
