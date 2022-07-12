define(['system/widgets/common/keyboards/KeyboardOptions', 'brease/enum/Enum'], function (KeyboardOptions, Enum) {

    'use strict';

    var Docking = {

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
                    for (var key in Docking.defaults) {
                        options[key] = _parseConfig(key, config, Docking.defaults);
                    }

                    settings[type] = options;
                }

                return settings[type];
            },
            /**
            * @method applyConfig
            * extends the position object and the value for pointOfOrigin inside of the windowConfig if a value for
            * docking has been defined in the brease.config
            * @param {system.widgets.common.KeyboardType} type
            * @param {brease.objects.WindowConfig} windowConfig
            */
            applyConfig: function (type, windowConfig) {
                var settings = this.getOptions(type),
                    pointOfOrigin = windowConfig && windowConfig.pointOfOrigin ? windowConfig.pointOfOrigin : undefined,
                    position = windowConfig && windowConfig.position ? windowConfig.position : {};
                switch (settings.docking) {
                    case Enum.Docking.BOTTOM:
                        position.horizontal = Enum.Position.center;
                        position.vertical = Enum.Position.bottom;
                        pointOfOrigin = Enum.PointOfOrigin.WINDOW;
                        break;
                }
                if (windowConfig) {
                    windowConfig.position = position;
                    windowConfig.pointOfOrigin = pointOfOrigin;
                } else {
                    windowConfig = { position: position, pointOfOrigin: pointOfOrigin };
                }
                return windowConfig;
            },
            reset: function () {
                settings = {};
            },

            defaults: new KeyboardOptions()
        },
        settings = {};

    Docking.defaults.docking = Enum.Docking.NONE;

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

    return Docking;
});
