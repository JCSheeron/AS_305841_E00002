define(['brease/core/Utils'], function (Utils) {

    'use strict';

    /**
    * @class brease.core.StringUtils
    * @extends core.javascript.Object
    */
    var StringUtils = {};

    /**
    * @method
    * Test if a string contains alphanumeric and numeric characters.  
    * Alphanumeric characters are all standard ASCII characters: a-z and A-Z  
    * Numeric characters are 0-9  
    * @param {String} str
    * @return {Boolean}
    */
    StringUtils.containsNumericAndAlphanumeric = function (str) {
        if (!Utils.isString(str)) {
            return false;
        }

        var alpha = false,
            numeric = false;

        for (var i = 0; i < str.length; i += 1) {
            var s = str[i];
            if (_isAlphanumeric(s)) {
                alpha = true; 
            }
            if (_isNumeric(s)) {
                numeric = true;
            } 
            if (alpha && numeric) {
                return true;
            }
        }
        return false;
    };

    /**
    * @method
    * Test if a string contains special characters.  
    * Special characters are all characters, which are not alphanumeric (a-zA-Z) or numeric (0-9).  
    * @param {String} str
    * @return {Boolean}
    */
    StringUtils.containsSpecial = function (str) {
        if (!Utils.isString(str)) {
            return false;
        }
        for (var i = 0; i < str.length; i += 1) {
            var s = str[i];
            if (_isSpecial(s)) {
                return true;
            }
        }
        return false;
    };

    /**
    * @method
    * Test if a string contains uppercase and lowercase characters.  
    * Only alphanumeric characters (a-z and A-Z) are taken into account.  
    * @param {String} str
    * @return {Boolean}
    */
    StringUtils.containsMixedCase = function (str) {
        if (!Utils.isString(str)) {
            return false;
        }
        var upper = false,
            lower = false;

        for (var i = 0; i < str.length; i += 1) {
            var s = str[i];
            if (_isAlphanumeric(s)) {
                if (_isUppercase(s)) {
                    upper = true;
                } 
                if (_isLowercase(s)) {
                    lower = true;
                } 
            }
            if (upper && lower) {
                return true;
            }
        }
        return false;
    };

    /**
    * @method
    * Test if a string has a minimum length.  
    * Length is measured with standard JavaScript string length.  
    * That means that multi-byte characters have the length of their byte count.  
    * E.g. "abc".length = 3  
    * and  "𐍈𐍈𐍈".length = 6  
    * @param {String} str
    * @param {Integer} minLength
    * @return {Boolean}
    */
    StringUtils.testMinLength = function (str, minLength) {
        if (!Utils.isString(str)) {
            return false;
        }
        if (!_.isInteger(minLength)) {
            return false;
        }
        return str.length >= minLength;
    };

    /**
    * @method
    * test if two values are equal (===)
    * @param {ANY} value1
    * @param {ANY} value2
    * @return {Boolean}
    */
    StringUtils.testEquality = function (value1, value2) {
        return value1 === value2;
    };

    function _isUppercase(s) {
        s = '' + s;
        return s.toUpperCase() === s;
    }

    function _isLowercase(s) {
        s = '' + s;
        return s.toLowerCase() === s;
    }

    var arNumber = '0123456789';
    function _isNumeric(s) {
        s = '' + s;
        return arNumber.indexOf(s) !== -1;
    }

    var arAlpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    function _isAlphanumeric(s) {
        s = '' + s;
        return arAlpha.indexOf(s) !== -1;
    }
    
    function _isSpecial(s) {
        s = '' + s;
        return !_isNumeric(s) && !_isAlphanumeric(s);
    }

    return StringUtils;

});
