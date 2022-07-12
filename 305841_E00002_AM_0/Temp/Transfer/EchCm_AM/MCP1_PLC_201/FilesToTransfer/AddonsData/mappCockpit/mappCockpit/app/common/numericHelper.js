define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NumericHelper = /** @class */ (function () {
        function NumericHelper() {
        }
        /**
         * Converts a numeric string to a better formated numeric string for the given datatype (e.g. float and double to Presision(7))
         *
         * @static
         * @param {string} numericString
         * @param {string} dataTypeName
         * @returns {string}
         * @memberof NumericHelper
         */
        NumericHelper.convertNumericString = function (numericString, dataTypeName) {
            if (dataTypeName == "Float" || dataTypeName == "Double") {
                var floatValue = parseFloat(numericString);
                return floatValue.toPrecision(7);
            }
            return numericString;
        };
        return NumericHelper;
    }());
    exports.NumericHelper = NumericHelper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtZXJpY0hlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL251bWVyaWNIZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBQ0E7UUFBQTtRQWtCQSxDQUFDO1FBaEJHOzs7Ozs7OztXQVFHO1FBQ0ksa0NBQW9CLEdBQTNCLFVBQTRCLGFBQXFCLEVBQUUsWUFBb0I7WUFDbkUsSUFBRyxZQUFZLElBQUksT0FBTyxJQUFJLFlBQVksSUFBSSxRQUFRLEVBQUM7Z0JBQ25ELElBQUksVUFBVSxHQUFJLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDNUMsT0FBTyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3BDO1lBQ0QsT0FBTyxhQUFhLENBQUM7UUFDekIsQ0FBQztRQUNMLG9CQUFDO0lBQUQsQ0FBQyxBQWxCRCxJQWtCQztJQWxCWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5leHBvcnQgY2xhc3MgTnVtZXJpY0hlbHBlciB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0cyBhIG51bWVyaWMgc3RyaW5nIHRvIGEgYmV0dGVyIGZvcm1hdGVkIG51bWVyaWMgc3RyaW5nIGZvciB0aGUgZ2l2ZW4gZGF0YXR5cGUgKGUuZy4gZmxvYXQgYW5kIGRvdWJsZSB0byBQcmVzaXNpb24oNykpXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG51bWVyaWNTdHJpbmdcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhVHlwZU5hbWVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgTnVtZXJpY0hlbHBlclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY29udmVydE51bWVyaWNTdHJpbmcobnVtZXJpY1N0cmluZzogc3RyaW5nLCBkYXRhVHlwZU5hbWU6IHN0cmluZyk6IHN0cmluZ3tcclxuICAgICAgICBpZihkYXRhVHlwZU5hbWUgPT0gXCJGbG9hdFwiIHx8IGRhdGFUeXBlTmFtZSA9PSBcIkRvdWJsZVwiKXtcclxuICAgICAgICAgICAgbGV0IGZsb2F0VmFsdWUgPSAgcGFyc2VGbG9hdChudW1lcmljU3RyaW5nKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZsb2F0VmFsdWUudG9QcmVjaXNpb24oNyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudW1lcmljU3RyaW5nO1xyXG4gICAgfVxyXG59Il19