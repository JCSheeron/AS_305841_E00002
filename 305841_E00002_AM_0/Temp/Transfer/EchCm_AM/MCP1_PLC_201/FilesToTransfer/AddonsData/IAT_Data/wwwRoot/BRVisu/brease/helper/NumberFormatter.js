define(['brease/core/Utils'], function (Utils) {

    'use strict';

    /**
    * @class brease.helper.NumberFormatter
    * @extends core.javascript.Function
    * 
    * @singleton
    */
    var Formatter = function () {
            var self = this;
            if (_instance === undefined) {
                _instance = self;
            }
            return _instance;
        },

        p = Formatter.prototype;
    p.defaults = {
        useDigitGrouping: false,
        decimalPlaces: 1,
        minimumIntegerDigits: 1,
        maximumIntegerDigits: 8,
        separators: {
            dsp: '.', // decimal separator = string that separates a number from the fractional portion, as in 1.99
            gsp: ',' // group separator = string that separates number groups, as in 1,000,000
        }
    };

    function validSeparators(separators) {
        if (!separators) {
            return p.defaults.separators;
        }
        if (!Utils.isString(separators.dsp)) {
            separators.dsp = (separators.gsp === '.') ? ',' : p.defaults.separators.dsp;
        }
        if (!Utils.isString(separators.gsp)) {
            separators.gsp = (separators.dsp === ',') ? '.' : p.defaults.separators.gsp;
        }
        return separators;
    }

    /*
    /* PUBLIC
    */

    /**
    * @method parseFloat
    * Method parses a string and returns a floating point number.  
    * Difference to native parseFloat is, that input can be formatted with different separators for different cultures.    
    * e.g. parseFloat('12.34', {dsp: '.'}) = 12.34  
    * e.g. parseFloat('12,34', {dsp: ','}) = 12.34  
    * @param {String} strValue
    * @param {Object} separators
    * @return {Number}
     */
    p.parseFloat = function (strValue, separators) {
        separators = validSeparators(separators);
        strValue = '' + strValue;
        strValue = strValue.replace(floatPattern(separators), '');
        strValue = strValue.replace(separators.dsp, '.');
        return parseFloat(strValue);
    };

    /**
    * @method formatNumber
    * Format a numeric value.  
    * Value is rounded to decimalPlaces of format.  
    * Negative input returns the same result as positive input but with leading '-' for every input.  
    * (see {@link brease.core.Utils#method-roundTo Utils.roundTo} for comparison)
    * @param {Number} value
    * @param {brease.config.NumberFormat} format
    * @param {Boolean} useDigitGrouping
    * @param {Object} separators
    * @param {String} separators.dsp decimal separator (The decimal separator (or decimal mark) is a symbol used to separate the integer part from the fractional part of a number written in decimal form.)
    * @param {String} separators.gsp grouping separator for digit grouping of the integer part of a number written in decimal form
    * @return {String}
    */
    p.formatNumber = function (value, format, useDigitGrouping, separators) {

        var absValue = Math.abs(value),
            sign;
        if (absValue === 0) {
            sign = 1;
        } else {
            sign = value / absValue;
        }
        if (absValue === Infinity) {
            return value.toString();
        }

        var strSign = (sign === -1) ? '-' : '';
        if (absValue.toString().indexOf('e+') !== -1) {
            return formatScience.call(this, absValue, strSign, separators, format);
        } else {
            return formatFloat.call(this, absValue, strSign, separators, format, useDigitGrouping);
        }
    };

    /**
    * @method roundToSignificant
    * Returns the value of a number rounded to significant digits.  
    * e.g. roundToSignificant(0.00002345012, 4) = 0.00002345  
    * Negative input returns the same result as positive input but with leading '-' for every input.  
    * (which is different from {@link brease.core.Utils#method-roundTo Utils.roundTo})  
    * @param {Number} value
    * @param {Integer} precision positive integer >= 1
    * @return {Number}
     */
    p.roundToSignificant = function (value, precision) {
        if (isNaN(value)) {
            throw new SyntaxError('value has to be a number');
        }
        if (isNaN(precision)) {
            throw new SyntaxError('precision has to be a positive integer >= 1');
        }
        if (value === 0) {
            return value;
        }
        precision = Math.max(1, parseInt(precision, 10));
        var abs = Math.abs(value),
            sign = value / abs,
            log = Math.floor(Math.log10(abs)) + 1,
            power = Math.max(0, precision - log);

        return sign * Utils.roundTo(abs, power);
    };
    /**
    * @method findPossibleFormattedValue
    * Returns the possible formatted value of a number rounded to decimalPlaces.    
    * @param {Number} extreme
    * @param {Integer} decimalPlaces
    * @param {String} type 'min' or 'max'
    * @return {Number}
     */
    p.findPossibleFormattedValue = function (extreme, decimalPlaces, type) {
        var abs = Math.abs(extreme),
            factor = Math.max(1, Math.pow(10, decimalPlaces)),
            result = p.roundToFormat(extreme, decimalPlaces);

        if (type === 'max' && result > extreme && abs > 1 / factor) {
            result -= 1 / factor;
        }
        if (type === 'min' && result < extreme && abs > 1 / factor) {
            result += 1 / factor;
        }
        //return p.roundToFormat(result, decimalPlaces);
        return result;
    };

    /**
    * @method roundToFormat
    * Returns the value of a number rounded to decimalPlaces.    
    * e.g. roundToFormat(2.15, 1) = 2.2  
    * e.g. roundToFormat(-2.15, 1) = -2.2  
    * Negative input returns the same result as positive input but with leading '-' for every input.  
    * (which is different from {@link brease.core.Utils#method-roundTo Utils.roundTo})  
    * @param {Number} value
    * @param {Integer} decimalPlaces positive integer >= 0
    * @return {Number}
     */
    p.roundToFormat = function (value, decimalPlaces) {
        if (isNaN(value)) {
            throw new SyntaxError('value has to be a number');
        }
        if (isNaN(decimalPlaces)) {
            throw new SyntaxError('decimalPlaces has to be a positive integer >= 0');
        }
        if (value === 0) {
            return value;
        }
        decimalPlaces = Math.max(0, parseInt(decimalPlaces, 10));
        var abs = Math.abs(value),
            sign = value / abs,
            factor = Math.max(1, Math.pow(10, decimalPlaces));

        if (abs > 0 && abs * factor < Number.MAX_VALUE) { //otherwise its not calculable
            return sign * Utils.roundTo(abs, decimalPlaces);
        } else {
            return value;
        }
    };

    /**
    * @method toFixed
    * Method formats a number using fixed-point notation.  
    * Difference to native toFixed: correct for all values  
    * e.g. toFixed(2.35, 1) = '2.4'  
    * e.g. toFixed(2.55, 1) = '2.6'  
    * see <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed" target="_blank" style="text-decoration:underline;">Number.toFixed</a>
    * @param {Number} value
    * @param {Integer} decimalPlaces positive integer >= 0
    * @return {String}
     */
    p.toFixed = function (value, decimalPlaces) {
        return Utils.roundTo(value, decimalPlaces).toFixed(decimalPlaces);
    };

    /*
    /* PRIVATE
    */

    function _setSeparator(type, separators) {
        var sep = this.defaults.separators[type];
        if (separators && separators[type]) {
            sep = separators[type];
        }
        return sep;
    }

    function _setFormat(type, format, min) {
        var ret = this.defaults[type];
        if (format && format[type] >= min) {
            ret = parseInt(format[type], 10);
        }
        return ret;
    }

    function _convertToScience(absValue, sign, decimalPlaces, dsp) {
        var pow10 = Math.floor(Math.log10(absValue)),
            normalized = absValue / (Math.pow(10, pow10)),
            rounded = Math.round(normalized * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);

        if (rounded === 10) { rounded = 1; pow10 += 1; }

        var parts = rounded.toFixed(decimalPlaces).split('.');
        if (parts.length > 1) {

            return sign + parts[0] + dsp + parts[1] + 'e+' + pow10;
        } else {

            return sign + parts[0] + 'e+' + pow10;
        }
    }

    function formatFloat(absValue, sign, separators, format, useDigitGrouping) {

        var dsp = _setSeparator.call(this, 'dsp', separators),
            gsp = _setSeparator.call(this, 'gsp', separators),
            decimalPlaces = _setFormat.call(this, 'decimalPlaces', format, 0),
            minimumIntegerDigits = _setFormat.call(this, 'minimumIntegerDigits', format, 1),
            maximumIntegerDigits = _setFormat.call(this, 'maximumIntegerDigits', format, 1),
            integerDigits,
            fractionDigits = '';

        if (minimumIntegerDigits > maximumIntegerDigits) {
            maximumIntegerDigits = minimumIntegerDigits;
        }

        var parts = p.toFixed(absValue, decimalPlaces).split('.');

        if (decimalPlaces > 0) {
            fractionDigits = parts[1];
        }
        if (parts[0].length > maximumIntegerDigits) {
            return _convertToScience(absValue, sign, decimalPlaces, dsp);
        } else {
            if (minimumIntegerDigits > 0 && minimumIntegerDigits > parts[0].length) {
                var temp = parseInt(parts[0], 10) / Math.pow(10, minimumIntegerDigits - 1);
                integerDigits = temp.toFixed(minimumIntegerDigits - 1).replace('.', '');
            } else {
                integerDigits = parts[0];
            }
            if (useDigitGrouping === true) {
                integerDigits = addGrouping(integerDigits, gsp);
            }

            return sign + integerDigits + ((integerDigits !== '' && fractionDigits !== '') ? dsp : '') + fractionDigits;
        }
    }

    function formatScience(absValue, sign, separators, format) {

        var dsp = this.defaults.separators.dsp;

        if (separators) {
            if (separators.dsp) {
                dsp = separators.dsp;
            }
        }

        var parts = absValue.toString().split('e+');
        parts[0] = parseFloat(parts[0]).toFixed(format.decimalPlaces);
        parts[0] = parts[0].replace('.', dsp);
        return sign + parts.join('e+');
    }

    function addGrouping(intd, gsp) {
        return intd.split(grRegEx).join(gsp);
    }

    function floatPattern(separators) {
        if (_separators.gsp !== separators.gsp) {
            _separators.gsp = separators.gsp;
            _floatPattern = new RegExp('\\' + separators.gsp, 'g');
        }
        return _floatPattern;
    }

    var grRegEx = /(?=(?:\d{3})+(?:\.|$))/g,
        _instance,
        _separators = {},
        _floatPattern;

    return Formatter;

});
