define(function () {
    
    'use strict';

    /**
    * @class brease.config.NumberFormat
    * @alternateClassName NumberFormat
    * @extends Object
    * NumberFormat object in string notation:
    * e.g. 
    *
    *       { 'decimalPlaces': 2, 'minimumIntegerDigits':2 }
    */

    /**
    * @property {Integer} maximumIntegerDigits
    * The maximum number of integer digits to use. For higher numbers display mode switches to normalized scientific notation.  
    * maximumIntegerDigits >= 1.
    */

    /**
    * @property {Integer} minimumIntegerDigits
    * The minimum number of integer digits to use.  
    * minimumIntegerDigits >= 1.
    */

    /**
    * @property {Integer} decimalPlaces
    * The number of fraction digits to use.  
    * 0 <= decimalPlaces <= 20
    */

    var NumberFormat = function (decimalPlaces, minimumIntegerDigits, maximumIntegerDigits) {
            decimalPlaces = (isNaN(decimalPlaces)) ? 1 : decimalPlaces;
            minimumIntegerDigits = (isNaN(minimumIntegerDigits)) ? 1 : minimumIntegerDigits;
            this.decimalPlaces = Math.min(_max.decimalPlaces, Math.max(_min.decimalPlaces, decimalPlaces));
            this.minimumIntegerDigits = Math.max(_min.minimumIntegerDigits, minimumIntegerDigits);
            if (maximumIntegerDigits >= _min.maximumIntegerDigits) {
                this.maximumIntegerDigits = parseInt(maximumIntegerDigits, 10);
            }
        }, _min = {
            decimalPlaces: 0,
            minimumIntegerDigits: 1,
            maximumIntegerDigits: 1
        }, _max = {
            decimalPlaces: 20
        };

    NumberFormat.getFormat = function (formats, mms) {
        var defaultFormat = formats.default || NumberFormat.defaults,
            format = formats[mms] || defaultFormat,
            decimalPlaces, minimumIntegerDigits;

        if (format.decimalPlaces !== undefined) {
            if (format.decimalPlaces < _min.decimalPlaces) {
                console.iatWarn('decimalPlaces has to be >= ' + _min.decimalPlaces);
            }
            if (format.decimalPlaces > _max.decimalPlaces) {
                console.iatWarn('decimalPlaces has to be <= ' + _max.decimalPlaces);
            }
            decimalPlaces = Math.min(_max.decimalPlaces, Math.max(_min.decimalPlaces, format.decimalPlaces));
        } else {
            decimalPlaces = defaultFormat.decimalPlaces;
        }
        if (format.minimumIntegerDigits !== undefined) {
            if (format.minimumIntegerDigits < _min.minimumIntegerDigits) {
                console.iatWarn('minimumIntegerDigits has to be >= ' + _min.minimumIntegerDigits);
            }
            minimumIntegerDigits = Math.max(_min.minimumIntegerDigits, format.minimumIntegerDigits);
        } else {
            minimumIntegerDigits = defaultFormat.minimumIntegerDigits;
        }
        var numberFormat = { decimalPlaces: decimalPlaces, minimumIntegerDigits: minimumIntegerDigits };
        if (format.maximumIntegerDigits >= _min.maximumIntegerDigits) {
            numberFormat.maximumIntegerDigits = parseInt(format.maximumIntegerDigits, 10);
        }
        return numberFormat;
    };

    NumberFormat.defaults = {
        decimalPlaces: 1,
        minimumIntegerDigits: 1
    };

    NumberFormat.minima = {
        decimalPlaces: _min.decimalPlaces,
        minimumIntegerDigits: _min.minimumIntegerDigits,
        maximumIntegerDigits: _min.maximumIntegerDigits
    };

    NumberFormat.maxima = {
        decimalPlaces: _max.decimalPlaces
    };

    return NumberFormat;

});
