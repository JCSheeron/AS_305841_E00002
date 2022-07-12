define(function () {

    'use strict';
    
    var config = {

        font: 'Arial, Helvetica, sans-serif',
        undefinedTextReturnValue: 'undefined key',
        visu: {
            activityCount: false,
            moveThreshold: 20,
            keyboardOperation: false
        },
        ContentCaching: {
            preserveOldValues: true
        },
        WidgetData: {
            renderingPolicy: 'default'
        },
        themeFolder: 'release/'
    };

    Object.defineProperty(config, 'isKeyboardOperationEnabled', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function () {
            return config.visu !== undefined && config.visu.keyboardOperation === true;
        }
    });
    
    return config;

});
