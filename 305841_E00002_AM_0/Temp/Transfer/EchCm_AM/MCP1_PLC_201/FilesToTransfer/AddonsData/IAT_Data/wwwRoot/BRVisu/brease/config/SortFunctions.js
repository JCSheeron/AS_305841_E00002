define(function () {

    'use strict';

    /**
    * @class brease.config.SortFunctions
    */

    var SortFunctions = {
        /** 
        * @property {String} int='int'
        * @iatStudioExposed
        * Sort function for integers
        */
        'int': function (a, b) {
            return parseInt(a, 10) - parseInt(b, 10);
        },
        /** 
        * @property {String} number='number'
        * @iatStudioExposed
        * Sort function for numbers
        */
        'number': function (a, b) {
            return parseFloat(a) - parseFloat(b);
        },
        /** 
        * @property {String} date='date'
        * @iatStudioExposed
        * Sort function for dates
        */
        'date': function (a, b) {
            return Date.parse(a) - Date.parse(b);
        },
        /** 
        * @property {String} string='string'
        * @iatStudioExposed
        * Sort function for strings
        */
        'string': function (a, b) {
            if (a < b) {
                return -1;
            }
            if (a > b) {
                return +1;
            }
            return 0;
        },
        /** 
        * @property {String} string-ins='string-ins'
        * @iatStudioExposed
        * Sort function for strings; case insensitive
        */
        'string-ins': function (a, b) {
            a = a.toLowerCase();
            b = b.toLowerCase();
            if (a < b) {
                return -1;
            }
            if (a > b) {
                return +1;
            }
            return 0;
        }
    };

    return SortFunctions;

});
