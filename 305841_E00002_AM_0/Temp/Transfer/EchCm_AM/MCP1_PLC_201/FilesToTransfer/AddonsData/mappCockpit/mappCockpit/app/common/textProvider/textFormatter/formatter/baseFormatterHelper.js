define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * This class provides static formatter helper functions
     * that can be used in all formatters.
     *
     * @static
     * @class BaseFormatterHelper
     */
    var BaseFormatterHelper = /** @class */ (function () {
        /**
         * Creates an instance of BaseFormatterHelper.
         * @memberof BaseFormatterHelper
         */
        function BaseFormatterHelper() {
        }
        ;
        /**
         * Adapt the argument.length to the lenght given, as long the length > argument.length
         *
         * @static
         * @param {string} argument
         * @param {number} length
         * @param {boolean} appendOnFront // true: fillchar is append on front; false: fillchar is append on back
         * @param {string} [fillChar]
         * @return {*}  {string}
         * @memberof BaseFormatterHelper
         */
        BaseFormatterHelper.extendArgumentToLength = function (argument, length, appendOnFront, fillChar) {
            if (appendOnFront) {
                argument = argument.padStart(length, fillChar);
            }
            else {
                argument = argument.padEnd(length, fillChar);
            }
            return argument;
        };
        /**
         * Return always sign to numerical outputs
         *
         * @static
         * @param {string} argument
         * @return {*}  {string}
         * @memberof BaseFormatterHelper
         */
        BaseFormatterHelper.getSignAlwaysOutput = function (signHolder) {
            return signHolder.getSign();
        };
        /**
         * Only for negative numbers a sign get returned
         * otherwise space is returned
         *
         * @static
         * @param {string} argument
         * @return {*}  {string}
         * @memberof BaseFormatterHelper
         */
        BaseFormatterHelper.getSignOnlyNegativeOutput = function (signHolder) {
            var sign = signHolder.getSign();
            if (sign === "+") {
                sign = " ";
            }
            return sign;
        };
        /**
         * Parse a String to Integer.
         * The string need to contain a save Integer to be parsed successfully.
         * If the string does not contain a save Integer NaN gets returned.
         *
         * @static
         * @param {string} valueStr
         * @return {number}
         * @memberof EditStringHelper
         */
        BaseFormatterHelper.parseStringToInt = function (valueStr) {
            var value = parseFloat(valueStr);
            if (!Number.isSafeInteger(value)) {
                value = NaN;
            }
            return value;
        };
        return BaseFormatterHelper;
    }());
    exports.BaseFormatterHelper = BaseFormatterHelper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZUZvcm1hdHRlckhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3RleHRQcm92aWRlci90ZXh0Rm9ybWF0dGVyL2Zvcm1hdHRlci9iYXNlRm9ybWF0dGVySGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUVBOzs7Ozs7T0FNRztJQUNIO1FBRUk7OztXQUdHO1FBQ0g7UUFBdUIsQ0FBQztRQUFBLENBQUM7UUFFekI7Ozs7Ozs7Ozs7V0FVRztRQUNXLDBDQUFzQixHQUFwQyxVQUFxQyxRQUFnQixFQUFFLE1BQWMsRUFBRSxhQUFzQixFQUFFLFFBQWlCO1lBRTVHLElBQUcsYUFBYSxFQUFDO2dCQUNiLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQzthQUNsRDtpQkFDSTtnQkFDRCxRQUFRLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDaEQ7WUFFRCxPQUFPLFFBQVEsQ0FBQztRQUNwQixDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNXLHVDQUFtQixHQUFqQyxVQUFrQyxVQUFzQjtZQUVwRCxPQUFPLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNoQyxDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDVyw2Q0FBeUIsR0FBdkMsVUFBd0MsVUFBc0I7WUFFMUQsSUFBSSxJQUFJLEdBQVcsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRXhDLElBQUcsSUFBSSxLQUFLLEdBQUcsRUFBRTtnQkFDYixJQUFJLEdBQUcsR0FBRyxDQUFDO2FBQ2Q7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRUQ7Ozs7Ozs7OztXQVNHO1FBQ1csb0NBQWdCLEdBQTlCLFVBQStCLFFBQWdCO1lBRTNDLElBQUksS0FBSyxHQUFXLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUV6QyxJQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDN0IsS0FBSyxHQUFHLEdBQUcsQ0FBQzthQUNmO1lBRUQsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUNMLDBCQUFDO0lBQUQsQ0FBQyxBQXBGRCxJQW9GQztJQXBGWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTaWduSG9sZGVyIH0gZnJvbSBcIi4vc2lnbkhvbGRlclwiO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgcHJvdmlkZXMgc3RhdGljIGZvcm1hdHRlciBoZWxwZXIgZnVuY3Rpb25zXHJcbiAqIHRoYXQgY2FuIGJlIHVzZWQgaW4gYWxsIGZvcm1hdHRlcnMuXHJcbiAqIFxyXG4gKiBAc3RhdGljXHJcbiAqIEBjbGFzcyBCYXNlRm9ybWF0dGVySGVscGVyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQmFzZUZvcm1hdHRlckhlbHBlcntcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEJhc2VGb3JtYXR0ZXJIZWxwZXIuXHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzZUZvcm1hdHRlckhlbHBlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge307XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGFwdCB0aGUgYXJndW1lbnQubGVuZ3RoIHRvIHRoZSBsZW5naHQgZ2l2ZW4sIGFzIGxvbmcgdGhlIGxlbmd0aCA+IGFyZ3VtZW50Lmxlbmd0aFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhcmd1bWVudFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBhcHBlbmRPbkZyb250IC8vIHRydWU6IGZpbGxjaGFyIGlzIGFwcGVuZCBvbiBmcm9udDsgZmFsc2U6IGZpbGxjaGFyIGlzIGFwcGVuZCBvbiBiYWNrXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2ZpbGxDaGFyXVxyXG4gICAgICogQHJldHVybiB7Kn0gIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzZUZvcm1hdHRlckhlbHBlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGV4dGVuZEFyZ3VtZW50VG9MZW5ndGgoYXJndW1lbnQ6IHN0cmluZywgbGVuZ3RoOiBudW1iZXIsIGFwcGVuZE9uRnJvbnQ6IGJvb2xlYW4sIGZpbGxDaGFyPzogc3RyaW5nKSA6IHN0cmluZyB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoYXBwZW5kT25Gcm9udCl7XHJcbiAgICAgICAgICAgIGFyZ3VtZW50ID0gYXJndW1lbnQucGFkU3RhcnQobGVuZ3RoLCBmaWxsQ2hhcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBhcmd1bWVudCA9IGFyZ3VtZW50LnBhZEVuZChsZW5ndGgsIGZpbGxDaGFyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhcmd1bWVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiBhbHdheXMgc2lnbiB0byBudW1lcmljYWwgb3V0cHV0c1xyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhcmd1bWVudFxyXG4gICAgICogQHJldHVybiB7Kn0gIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzZUZvcm1hdHRlckhlbHBlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFNpZ25BbHdheXNPdXRwdXQoc2lnbkhvbGRlcjogU2lnbkhvbGRlcik6IHN0cmluZyB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHNpZ25Ib2xkZXIuZ2V0U2lnbigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT25seSBmb3IgbmVnYXRpdmUgbnVtYmVycyBhIHNpZ24gZ2V0IHJldHVybmVkXHJcbiAgICAgKiBvdGhlcndpc2Ugc3BhY2UgaXMgcmV0dXJuZWRcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYXJndW1lbnRcclxuICAgICAqIEByZXR1cm4geyp9ICB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIEJhc2VGb3JtYXR0ZXJIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRTaWduT25seU5lZ2F0aXZlT3V0cHV0KHNpZ25Ib2xkZXI6IFNpZ25Ib2xkZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBzaWduOiBzdHJpbmcgPSBzaWduSG9sZGVyLmdldFNpZ24oKTtcclxuXHJcbiAgICAgICAgaWYoc2lnbiA9PT0gXCIrXCIpIHtcclxuICAgICAgICAgICAgc2lnbiA9IFwiIFwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNpZ247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQYXJzZSBhIFN0cmluZyB0byBJbnRlZ2VyLlxyXG4gICAgICogVGhlIHN0cmluZyBuZWVkIHRvIGNvbnRhaW4gYSBzYXZlIEludGVnZXIgdG8gYmUgcGFyc2VkIHN1Y2Nlc3NmdWxseS5cclxuICAgICAqIElmIHRoZSBzdHJpbmcgZG9lcyBub3QgY29udGFpbiBhIHNhdmUgSW50ZWdlciBOYU4gZ2V0cyByZXR1cm5lZC4gXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlU3RyXHJcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgRWRpdFN0cmluZ0hlbHBlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHBhcnNlU3RyaW5nVG9JbnQodmFsdWVTdHI6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHZhbHVlOiBudW1iZXIgPSBwYXJzZUZsb2F0KHZhbHVlU3RyKTtcclxuICAgICAgICBcclxuICAgICAgICBpZighTnVtYmVyLmlzU2FmZUludGVnZXIodmFsdWUpKSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gTmFOO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG59Il19