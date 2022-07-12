define(function () {

    'use strict';

    /**
    * @class system.widgets.common.KeyboardOptions
    * @alternateClassName KeyboardOptions
    * @extends Object
    */
    /**
    * @method constructor
    * Creates a new KeyboardOptions instance.
    */
    /**
    * @property {Integer} minWidth
    */
    /**
    * @property {Integer} maxWidth
    */
    /**
    * @property {Integer} minHeight
    */
    /**
    * @property {Integer} maxHeight
    */
    /**
    * @property {Boolean} autoSize
    */
    /**
    * @property {brease.enum.Docking} docking
    */
    var KeyboardOptions = function () {
    };

    KeyboardOptions.isValid = function (options) {
        return options && (options.minWidth !== undefined || options.minHeight !== undefined) && (options.maxWidth !== undefined || options.maxHeight !== undefined);
    };

    return KeyboardOptions;

});
