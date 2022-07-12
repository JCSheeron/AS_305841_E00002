define(['brease/core/Utils'], function (Utils) {

    'use strict';

    /** 
    * @enum {String} system.widgets.common.KeyboardType  
    */
    /** 
    * @property {String} ALPHANUMERIC='AlphanumericKeyboard'
    */
    /** 
    * @property {String} NUMERIC='NumericKeyboard'
    */
    var Types = {};

    Utils.defineProperty(Types, 'ALPHANUMERIC', 'AlphanumericKeyboard');
    Utils.defineProperty(Types, 'NUMERIC', 'NumericKeyboard');

    return Types;
});
