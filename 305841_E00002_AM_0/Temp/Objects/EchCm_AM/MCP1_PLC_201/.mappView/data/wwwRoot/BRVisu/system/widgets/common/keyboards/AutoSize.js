define(['system/widgets/common/keyboards/KeyboardOptions'], function (KeyboardOptions) {

    'use strict';

    var AutoSize = {

            /**
             * @method getOptions
             * get the options for a keyboardType, generated out of brease.config.virtualKeyboards
             * @param {system.widgets.common.KeyboardType} type
             * @return {system.widgets.common.KeyboardOptions}
             */
            getOptions: function (type) {
                if (!settings[type]) {

                    var options = new KeyboardOptions(), 
                        config;

                    if (brease.config && brease.config.virtualKeyboards) {
                        config = brease.config.virtualKeyboards[type];
                    }
                    for (var key in AutoSize.defaults) {
                        options[key] = _parseConfig(key, config, AutoSize.defaults);
                    }
                    options.minWidth = Math.max(0, options.minWidth);
                    options.minHeight = Math.max(0, options.minHeight);

                    if (options.minWidth > options.maxWidth) {
                        options.minWidth = options.maxWidth;
                    }
                    if (options.minHeight > options.maxHeight) {
                        options.minHeight = options.maxHeight;
                    }
                    settings[type] = options;
                }

                return settings[type];
            },

            /**
             * @method getLimits
             * get the limits of the scale factor for a keyboard
             * @param {Object} dimensions
             * @param {Number} dimensions.width
             * @param {Number} dimensions.height
             * @param {system.widgets.common.KeyboardOptions} options
             * @return {Object} 
             * @return {Number} return.min
             * @return {Number} return.max
             */
            getLimits: function (dimensions, options) {
                if (!KeyboardOptions.isValid(options)) {
                    console.warn('argument "options" (' + JSON.stringify(options) + ') of getLimits is not a valid KeyboardOption');
                    return { min: 1, max: 1 };
                }
                if (!dimensions || !dimensions.width || dimensions.width <= 0 || !dimensions.height || dimensions.height <= 0) {
                    console.warn('argument "dimensions" (' + JSON.stringify(dimensions) + ') of getLimits is not a valid Dimension');
                    return { min: 1, max: 1 };
                }

                var factorX = {
                        min: (options.minWidth > 0) ? options.minWidth / dimensions.width : 0,
                        max: (options.maxWidth > 0) ? options.maxWidth / dimensions.width : Number.MAX_SAFE_INTEGER
                    },
                    factorY = {
                        min: (options.minHeight > 0) ? options.minHeight / dimensions.height : 0,
                        max: (options.maxHeight > 0) ? options.maxHeight / dimensions.height : Number.MAX_SAFE_INTEGER
                    };

                var maxFactor = Math.min(factorX.max, factorY.max),
                    minFactor = Math.max(factorX.min, factorY.min);

                if (maxFactor < minFactor) {
                    maxFactor = minFactor;
                }
                var limits = {
                    min: minFactor,
                    max: maxFactor
                };
                    
                return limits;
            },

            reset: function () {
                settings = {};
            },

            range: function (value, min, max) {

                if (value < min) {
                    value = min;
                }
                if (value > max) {
                    value = max;
                }
                return value;
            },

            defaults: new KeyboardOptions()
        },
        settings = {};

    AutoSize.defaults.autoSize = false;
    AutoSize.defaults.minWidth = 0;
    AutoSize.defaults.maxWidth = Number.MAX_SAFE_INTEGER;
    AutoSize.defaults.minHeight = 0;
    AutoSize.defaults.maxHeight = Number.MAX_SAFE_INTEGER;

    function _parseConfig(key, config, defaults) {
        var value = defaults[key];
        if (config) {
            var configValue = config[key];
            if (configValue !== undefined) {
                return configValue;
            }
        }
        return value;
    }

    return AutoSize;
});
