define(['globalize'], function () {

    'use strict';

    /**
    * @class brease.helper.DateFormatter
    * @extends core.javascript.Object
    * 
    * @singleton
    */
    var Formatter = {

        /**
        * @method format
        * Format a date or time  
        * @param {Date} value
        * @param {brease.config.DateFormat} format
        * @param {Function} callback
        * @param {CultureCode} code (optional) if not specified, current selected culture is taken
        */
        format: function (value, format, callback, code) {
            var result = _findFormat(format, code);
            callback(Globalize.format(value, result.format, result.code));
        },

        /**
        * @method formatSync
        * Format a date or time  (synchronous version)
        * @param {Date} value
        * @param {brease.config.DateFormat} format
        * @param {CultureCode} code (optional) if not specified, current selected culture is taken
        * @return {String}
        */
        formatSync: function (value, format, code) {
            var result = _findFormat(format, code);
            return Globalize.format(value, result.format, result.code);
        },

        /**
        * @method getFormat4Pattern
        * Get the format string for a pattern  
        * For available formats and patterns see at **[Internationalization Guide](#!/guide/internationalization)**
        * @param {String} pattern
        * @return {String}
        */
        getFormat4Pattern: function (pattern) {
            var culture = brease.culture.getCurrentCulture().culture;
            return culture.calendar.patterns[pattern];

        },

        /**
        * @method clearFormat
        * Remove all single quoted sections of a format string
        * e.g. "'day:'dd" => "dd"
        * @param {String} fString
        * @return {String}
        */
        clearFormat: function (fString) {
            if (fString.indexOf("'") !== -1) {
                // eslint-disable-next-line no-unused-vars
                return fString.split("'").filter(function (word, index) {
                    return index % 2 === 0;
                }).join('');
            }
            return fString;
        },
        defaultPattern: 'S'
    };

    function _findFormat(format, cultureCode) {
        var culture;

        if (cultureCode !== undefined) {
            culture = Globalize.findClosestCulture(cultureCode);
            if (culture === null) {
                var systemCulture = brease.culture.getCurrentCulture();
                console.iatWarn('invalid culture "' + cultureCode + '" -> take default culture "' + systemCulture.key + '"');
                culture = systemCulture.culture;
                cultureCode = systemCulture.key;
            }
        } else {
            culture = brease.culture.getCurrentCulture().culture;
        }

        if (format.length === 1 && culture.calendar.patterns[format] === undefined) {
            console.iatWarn('invalid pattern "' + format + '" -> take default pattern "' + Formatter.defaultPattern + '"');
            format = Formatter.defaultPattern;
        }
        return { format: format, code: cultureCode };
    }

    return Formatter;

});
