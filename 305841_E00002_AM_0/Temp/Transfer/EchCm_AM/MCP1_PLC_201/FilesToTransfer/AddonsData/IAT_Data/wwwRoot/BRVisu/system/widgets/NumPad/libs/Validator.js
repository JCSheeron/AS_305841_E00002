define(['brease/events/EventDispatcher'], function (EventDispatcher) {

    'use strict';

    var Validator = function () {
        this.valid = true;
        this.settings = {};
    };

    Validator.prototype = new EventDispatcher();

    Validator.prototype.setConfig = function (config) {
        for (var key in config) {
            this.settings[key] = config[key];
        }
    };

    Validator.prototype.changeListener = function (e) {
        this.check(e.detail.value);
    };

    Validator.prototype.check = function (value) {
        if (value < this.settings.minValue) {
            this.valid = false;
        } else if (value > this.settings.maxValue) {
            this.valid = false;
        } else {
            this.valid = true;
        }

        /**
        * @event Validation
        * @param {Boolean} valid  
        */
        this.dispatchEvent({
            type: 'Validation',
            detail: {
                'valid': this.valid
            }
        });
    };

    return Validator;
});
