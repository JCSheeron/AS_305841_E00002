define(["require", "exports", "../formatSpecification/formatSpecificationFlag", "./alternativeFormatting", "./baseFormatterHelper", "./signHolder"], function (require, exports, formatSpecificationFlag_1, alternativeFormatting_1, baseFormatterHelper_1, signHolder_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The BaseFormatter defines the control flow of the format function,
     * which has some parts that are need to be overriden by the subFormatters
     *
     * @export
     * @class BaseFormatter
     * @implements {ISubFormatter}
     */
    var BaseFormatter = /** @class */ (function () {
        function BaseFormatter() {
        }
        /**
         * Defines the process of the subformatters
         *
         * @param {(string | number)} argument
         * @param {IFormatSpecification} formatSpecification
         * @param {string} engineeringUnit
         * @return {*}  {string}
         * @memberof BaseFormatter
         */
        BaseFormatter.prototype.format = function (argument, formatSpecification, engineeringUnit) {
            var formattedArgument;
            var signHolder = new signHolder_1.SignHolder();
            if (typeof argument === 'number') {
                argument = signHolder.getUnsigendArgument(argument);
            }
            formattedArgument = this.useFormatSpecificationPrecisionAndType(argument, formatSpecification.precision, formatSpecification.type);
            formattedArgument = this.useFormatSpecificationFlags(formattedArgument, formatSpecification.flags, formatSpecification.width, formatSpecification.type, signHolder);
            formattedArgument = this.useFormatSpecificationWidth(formattedArgument, formatSpecification.width);
            formattedArgument += engineeringUnit;
            return formattedArgument;
        };
        /**
         * Need to be overriden by the subformatters
         * The respective subformatter adapt the precision and type information to the argument
         *
         * @protected
         * @param {(number | string)} argument
         * @param {number} precision
         * @param {FormatSpecificationTypes} type
         * @return {*}  {string}
         * @memberof BaseFormatter
         */
        BaseFormatter.prototype.useFormatSpecificationPrecisionAndType = function (argument, precision, type) {
            return argument.toString();
        };
        /**
         * Choose the right action for the set flags of the format Item
         *
         * @private
         * @param {string} argument
         * @param {Array<FormatSpecificationFlags>} flags
         * @param {number} width
         * @param {FormatSpecificationTypes} type
         * @return {string}
         * @memberof BaseFormatter
         */
        BaseFormatter.prototype.useFormatSpecificationFlags = function (argument, flags, width, type, signHolder) {
            var formattedArgument = argument;
            var frontPart = "";
            // Only for float and int input arguments 
            // Only one Flag of these three is used even when others are set -> the order shows the priorities of the flags!
            if (flags.includes(formatSpecificationFlag_1.FormatSpecificationFlags.alternativeFormtting)) {
                frontPart = alternativeFormatting_1.AlternativeFormatting.get(type);
            }
            else if (flags.includes(formatSpecificationFlag_1.FormatSpecificationFlags.signAlwaysOutput)) {
                frontPart = baseFormatterHelper_1.BaseFormatterHelper.getSignAlwaysOutput(signHolder);
            }
            else if (flags.includes(formatSpecificationFlag_1.FormatSpecificationFlags.signOnlyNegativeOutput)) {
                frontPart = baseFormatterHelper_1.BaseFormatterHelper.getSignOnlyNegativeOutput(signHolder);
            }
            else {
                if (signHolder.getSign() === "-") {
                    frontPart = signHolder.getSign();
                }
            }
            width -= frontPart.length;
            // Used for formatting the output
            // Again only one Flag of these two flags is used even when the other one is set -> the order shows the priorities of the flags!
            if (flags.includes(formatSpecificationFlag_1.FormatSpecificationFlags.leftAlignedOutput)) {
                formattedArgument = baseFormatterHelper_1.BaseFormatterHelper.extendArgumentToLength(argument, width, false);
            }
            else if (flags.includes(formatSpecificationFlag_1.FormatSpecificationFlags.fillOutputWithNull)) {
                formattedArgument = this.fillItemWithNull(argument, width);
            }
            return frontPart + formattedArgument;
        };
        /**
         * The width of the argument needs to be at least the defined width.
         * If the width is undfined the argument stays the same.
         * if the argument width is shorter than spaces are add.
         *
         * @private
         * @param {string} argument
         * @param {number} width
         * @return {string}
         * @memberof BaseFormatter
         */
        BaseFormatter.prototype.useFormatSpecificationWidth = function (argument, width) {
            return baseFormatterHelper_1.BaseFormatterHelper.extendArgumentToLength(argument, width, true);
        };
        /**
         * Fills the difference between width and the argument length with nulls
         *
         * @private
         * @param {string} argument
         * @param {number} width
         * @return {string}
         * @memberof BaseFormatter
         */
        BaseFormatter.prototype.fillItemWithNull = function (argument, width) {
            return baseFormatterHelper_1.BaseFormatterHelper.extendArgumentToLength(argument, width, true, "0");
        };
        return BaseFormatter;
    }());
    exports.BaseFormatter = BaseFormatter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZUZvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3RleHRQcm92aWRlci90ZXh0Rm9ybWF0dGVyL2Zvcm1hdHRlci9iYXNlRm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQVFBOzs7Ozs7O09BT0c7SUFDSDtRQUFBO1FBNkhBLENBQUM7UUEzSEc7Ozs7Ozs7O1dBUUc7UUFDSSw4QkFBTSxHQUFiLFVBQWMsUUFBeUIsRUFBRSxtQkFBeUMsRUFBRSxlQUF1QjtZQUV2RyxJQUFJLGlCQUF5QixDQUFDO1lBRTlCLElBQUksVUFBVSxHQUFlLElBQUksdUJBQVUsRUFBRSxDQUFDO1lBRTlDLElBQUcsT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFO2dCQUM3QixRQUFRLEdBQUcsVUFBVSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3ZEO1lBRUQsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLHNDQUFzQyxDQUFDLFFBQVEsRUFBRSxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFbkksaUJBQWlCLEdBQUcsSUFBSSxDQUFDLDJCQUEyQixDQUFDLGlCQUFpQixFQUFFLG1CQUFtQixDQUFDLEtBQUssRUFBRSxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsbUJBQW1CLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBRXBLLGlCQUFpQixHQUFHLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxpQkFBaUIsRUFBRSxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVuRyxpQkFBaUIsSUFBSSxlQUFlLENBQUM7WUFFckMsT0FBTyxpQkFBaUIsQ0FBQztRQUM3QixDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNPLDhEQUFzQyxHQUFoRCxVQUFpRCxRQUF5QixFQUFFLFNBQWlCLEVBQUUsSUFBOEI7WUFFekgsT0FBTyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDL0IsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSyxtREFBMkIsR0FBbkMsVUFBb0MsUUFBZ0IsRUFBRSxLQUFzQyxFQUFFLEtBQWEsRUFBRSxJQUE4QixFQUFFLFVBQXNCO1lBRS9KLElBQUksaUJBQWlCLEdBQVcsUUFBUSxDQUFDO1lBRXpDLElBQUksU0FBUyxHQUFXLEVBQUUsQ0FBQztZQUUzQiwwQ0FBMEM7WUFDMUMsZ0hBQWdIO1lBQ2hILElBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxrREFBd0IsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFO2dCQUM5RCxTQUFTLEdBQUcsNkNBQXFCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQy9DO2lCQUNJLElBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxrREFBd0IsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO2dCQUMvRCxTQUFTLEdBQUcseUNBQW1CLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDbkU7aUJBQ0ksSUFBRyxLQUFLLENBQUMsUUFBUSxDQUFDLGtEQUF3QixDQUFDLHNCQUFzQixDQUFDLEVBQUU7Z0JBQ3JFLFNBQVMsR0FBRyx5Q0FBbUIsQ0FBQyx5QkFBeUIsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUN6RTtpQkFDSTtnQkFDRCxJQUFHLFVBQVUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxHQUFHLEVBQUU7b0JBQzdCLFNBQVMsR0FBRyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7aUJBQ3BDO2FBQ0o7WUFFRCxLQUFLLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQztZQUUxQixpQ0FBaUM7WUFDakMsZ0lBQWdJO1lBQ2hJLElBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxrREFBd0IsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO2dCQUMzRCxpQkFBaUIsR0FBRyx5Q0FBbUIsQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQzFGO2lCQUNJLElBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxrREFBd0IsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO2dCQUNqRSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQzlEO1lBRUQsT0FBTyxTQUFTLEdBQUcsaUJBQWlCLENBQUM7UUFDekMsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSyxtREFBMkIsR0FBbkMsVUFBb0MsUUFBZ0IsRUFBRSxLQUFhO1lBRS9ELE9BQU8seUNBQW1CLENBQUMsc0JBQXNCLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM3RSxDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSyx3Q0FBZ0IsR0FBeEIsVUFBeUIsUUFBZ0IsRUFBRSxLQUFhO1lBRXBELE9BQU8seUNBQW1CLENBQUMsc0JBQXNCLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbEYsQ0FBQztRQUNMLG9CQUFDO0lBQUQsQ0FBQyxBQTdIRCxJQTZIQztJQTdIWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElGb3JtYXRTcGVjaWZpY2F0aW9uIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZS9mb3JtYXRTcGVjaWZpY2F0aW9uSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTdWJGb3JtYXR0ZXIgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlL3N1YkZvcm1hdHRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBGb3JtYXRTcGVjaWZpY2F0aW9uRmxhZ3MgfSBmcm9tIFwiLi4vZm9ybWF0U3BlY2lmaWNhdGlvbi9mb3JtYXRTcGVjaWZpY2F0aW9uRmxhZ1wiO1xyXG5pbXBvcnQgeyBGb3JtYXRTcGVjaWZpY2F0aW9uVHlwZXMgfSBmcm9tIFwiLi4vZm9ybWF0U3BlY2lmaWNhdGlvbi9mb3JtYXRTcGVjaWZpY2F0aW9uVHlwZVwiO1xyXG5pbXBvcnQgeyBBbHRlcm5hdGl2ZUZvcm1hdHRpbmcgfSBmcm9tIFwiLi9hbHRlcm5hdGl2ZUZvcm1hdHRpbmdcIjtcclxuaW1wb3J0IHsgQmFzZUZvcm1hdHRlckhlbHBlciB9IGZyb20gXCIuL2Jhc2VGb3JtYXR0ZXJIZWxwZXJcIjtcclxuaW1wb3J0IHsgU2lnbkhvbGRlciB9IGZyb20gXCIuL3NpZ25Ib2xkZXJcIjtcclxuXHJcbi8qKlxyXG4gKiBUaGUgQmFzZUZvcm1hdHRlciBkZWZpbmVzIHRoZSBjb250cm9sIGZsb3cgb2YgdGhlIGZvcm1hdCBmdW5jdGlvbiwgXHJcbiAqIHdoaWNoIGhhcyBzb21lIHBhcnRzIHRoYXQgYXJlIG5lZWQgdG8gYmUgb3ZlcnJpZGVuIGJ5IHRoZSBzdWJGb3JtYXR0ZXJzXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIEJhc2VGb3JtYXR0ZXJcclxuICogQGltcGxlbWVudHMge0lTdWJGb3JtYXR0ZXJ9XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQmFzZUZvcm1hdHRlciBpbXBsZW1lbnRzIElTdWJGb3JtYXR0ZXJ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIHRoZSBwcm9jZXNzIG9mIHRoZSBzdWJmb3JtYXR0ZXJzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsoc3RyaW5nIHwgbnVtYmVyKX0gYXJndW1lbnRcclxuICAgICAqIEBwYXJhbSB7SUZvcm1hdFNwZWNpZmljYXRpb259IGZvcm1hdFNwZWNpZmljYXRpb25cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBlbmdpbmVlcmluZ1VuaXRcclxuICAgICAqIEByZXR1cm4geyp9ICB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIEJhc2VGb3JtYXR0ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGZvcm1hdChhcmd1bWVudDogc3RyaW5nIHwgbnVtYmVyLCBmb3JtYXRTcGVjaWZpY2F0aW9uOiBJRm9ybWF0U3BlY2lmaWNhdGlvbiwgZW5naW5lZXJpbmdVbml0OiBzdHJpbmcpOiBzdHJpbmcge1xyXG5cclxuICAgICAgICBsZXQgZm9ybWF0dGVkQXJndW1lbnQ6IHN0cmluZztcclxuXHJcbiAgICAgICAgbGV0IHNpZ25Ib2xkZXI6IFNpZ25Ib2xkZXIgPSBuZXcgU2lnbkhvbGRlcigpO1xyXG5cclxuICAgICAgICBpZih0eXBlb2YgYXJndW1lbnQgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIGFyZ3VtZW50ID0gc2lnbkhvbGRlci5nZXRVbnNpZ2VuZEFyZ3VtZW50KGFyZ3VtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvcm1hdHRlZEFyZ3VtZW50ID0gdGhpcy51c2VGb3JtYXRTcGVjaWZpY2F0aW9uUHJlY2lzaW9uQW5kVHlwZShhcmd1bWVudCwgZm9ybWF0U3BlY2lmaWNhdGlvbi5wcmVjaXNpb24sIGZvcm1hdFNwZWNpZmljYXRpb24udHlwZSk7XHJcblxyXG4gICAgICAgIGZvcm1hdHRlZEFyZ3VtZW50ID0gdGhpcy51c2VGb3JtYXRTcGVjaWZpY2F0aW9uRmxhZ3MoZm9ybWF0dGVkQXJndW1lbnQsIGZvcm1hdFNwZWNpZmljYXRpb24uZmxhZ3MsIGZvcm1hdFNwZWNpZmljYXRpb24ud2lkdGgsIGZvcm1hdFNwZWNpZmljYXRpb24udHlwZSwgc2lnbkhvbGRlcik7XHJcblxyXG4gICAgICAgIGZvcm1hdHRlZEFyZ3VtZW50ID0gdGhpcy51c2VGb3JtYXRTcGVjaWZpY2F0aW9uV2lkdGgoZm9ybWF0dGVkQXJndW1lbnQsIGZvcm1hdFNwZWNpZmljYXRpb24ud2lkdGgpO1xyXG5cclxuICAgICAgICBmb3JtYXR0ZWRBcmd1bWVudCArPSBlbmdpbmVlcmluZ1VuaXQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGZvcm1hdHRlZEFyZ3VtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTmVlZCB0byBiZSBvdmVycmlkZW4gYnkgdGhlIHN1YmZvcm1hdHRlcnNcclxuICAgICAqIFRoZSByZXNwZWN0aXZlIHN1YmZvcm1hdHRlciBhZGFwdCB0aGUgcHJlY2lzaW9uIGFuZCB0eXBlIGluZm9ybWF0aW9uIHRvIHRoZSBhcmd1bWVudFxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7KG51bWJlciB8IHN0cmluZyl9IGFyZ3VtZW50XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcHJlY2lzaW9uXHJcbiAgICAgKiBAcGFyYW0ge0Zvcm1hdFNwZWNpZmljYXRpb25UeXBlc30gdHlwZVxyXG4gICAgICogQHJldHVybiB7Kn0gIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzZUZvcm1hdHRlclxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgdXNlRm9ybWF0U3BlY2lmaWNhdGlvblByZWNpc2lvbkFuZFR5cGUoYXJndW1lbnQ6IG51bWJlciB8IHN0cmluZywgcHJlY2lzaW9uOiBudW1iZXIsIHR5cGU6IEZvcm1hdFNwZWNpZmljYXRpb25UeXBlcyk6IHN0cmluZyB7XHJcbiAgICAgICBcclxuICAgICAgICByZXR1cm4gYXJndW1lbnQudG9TdHJpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENob29zZSB0aGUgcmlnaHQgYWN0aW9uIGZvciB0aGUgc2V0IGZsYWdzIG9mIHRoZSBmb3JtYXQgSXRlbVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYXJndW1lbnRcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8Rm9ybWF0U3BlY2lmaWNhdGlvbkZsYWdzPn0gZmxhZ3NcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHtGb3JtYXRTcGVjaWZpY2F0aW9uVHlwZXN9IHR5cGVcclxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBCYXNlRm9ybWF0dGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXNlRm9ybWF0U3BlY2lmaWNhdGlvbkZsYWdzKGFyZ3VtZW50OiBzdHJpbmcsIGZsYWdzOiBBcnJheTxGb3JtYXRTcGVjaWZpY2F0aW9uRmxhZ3M+LCB3aWR0aDogbnVtYmVyLCB0eXBlOiBGb3JtYXRTcGVjaWZpY2F0aW9uVHlwZXMsIHNpZ25Ib2xkZXI6IFNpZ25Ib2xkZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBmb3JtYXR0ZWRBcmd1bWVudDogc3RyaW5nID0gYXJndW1lbnQ7XHJcblxyXG4gICAgICAgIGxldCBmcm9udFBhcnQ6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgICAgIC8vIE9ubHkgZm9yIGZsb2F0IGFuZCBpbnQgaW5wdXQgYXJndW1lbnRzIFxyXG4gICAgICAgIC8vIE9ubHkgb25lIEZsYWcgb2YgdGhlc2UgdGhyZWUgaXMgdXNlZCBldmVuIHdoZW4gb3RoZXJzIGFyZSBzZXQgLT4gdGhlIG9yZGVyIHNob3dzIHRoZSBwcmlvcml0aWVzIG9mIHRoZSBmbGFncyFcclxuICAgICAgICBpZihmbGFncy5pbmNsdWRlcyhGb3JtYXRTcGVjaWZpY2F0aW9uRmxhZ3MuYWx0ZXJuYXRpdmVGb3JtdHRpbmcpKSB7XHJcbiAgICAgICAgICAgIGZyb250UGFydCA9IEFsdGVybmF0aXZlRm9ybWF0dGluZy5nZXQodHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoZmxhZ3MuaW5jbHVkZXMoRm9ybWF0U3BlY2lmaWNhdGlvbkZsYWdzLnNpZ25BbHdheXNPdXRwdXQpKSB7XHJcbiAgICAgICAgICAgIGZyb250UGFydCA9IEJhc2VGb3JtYXR0ZXJIZWxwZXIuZ2V0U2lnbkFsd2F5c091dHB1dChzaWduSG9sZGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihmbGFncy5pbmNsdWRlcyhGb3JtYXRTcGVjaWZpY2F0aW9uRmxhZ3Muc2lnbk9ubHlOZWdhdGl2ZU91dHB1dCkpIHtcclxuICAgICAgICAgICAgZnJvbnRQYXJ0ID0gQmFzZUZvcm1hdHRlckhlbHBlci5nZXRTaWduT25seU5lZ2F0aXZlT3V0cHV0KHNpZ25Ib2xkZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYoc2lnbkhvbGRlci5nZXRTaWduKCkgPT09IFwiLVwiKSB7XHJcbiAgICAgICAgICAgICAgICBmcm9udFBhcnQgPSBzaWduSG9sZGVyLmdldFNpZ24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd2lkdGggLT0gZnJvbnRQYXJ0Lmxlbmd0aDtcclxuXHJcbiAgICAgICAgLy8gVXNlZCBmb3IgZm9ybWF0dGluZyB0aGUgb3V0cHV0XHJcbiAgICAgICAgLy8gQWdhaW4gb25seSBvbmUgRmxhZyBvZiB0aGVzZSB0d28gZmxhZ3MgaXMgdXNlZCBldmVuIHdoZW4gdGhlIG90aGVyIG9uZSBpcyBzZXQgLT4gdGhlIG9yZGVyIHNob3dzIHRoZSBwcmlvcml0aWVzIG9mIHRoZSBmbGFncyFcclxuICAgICAgICBpZihmbGFncy5pbmNsdWRlcyhGb3JtYXRTcGVjaWZpY2F0aW9uRmxhZ3MubGVmdEFsaWduZWRPdXRwdXQpKSB7XHJcbiAgICAgICAgICAgIGZvcm1hdHRlZEFyZ3VtZW50ID0gQmFzZUZvcm1hdHRlckhlbHBlci5leHRlbmRBcmd1bWVudFRvTGVuZ3RoKGFyZ3VtZW50LCB3aWR0aCwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGZsYWdzLmluY2x1ZGVzKEZvcm1hdFNwZWNpZmljYXRpb25GbGFncy5maWxsT3V0cHV0V2l0aE51bGwpKSB7XHJcbiAgICAgICAgICAgIGZvcm1hdHRlZEFyZ3VtZW50ID0gdGhpcy5maWxsSXRlbVdpdGhOdWxsKGFyZ3VtZW50LCB3aWR0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBmcm9udFBhcnQgKyBmb3JtYXR0ZWRBcmd1bWVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSB3aWR0aCBvZiB0aGUgYXJndW1lbnQgbmVlZHMgdG8gYmUgYXQgbGVhc3QgdGhlIGRlZmluZWQgd2lkdGguIFxyXG4gICAgICogSWYgdGhlIHdpZHRoIGlzIHVuZGZpbmVkIHRoZSBhcmd1bWVudCBzdGF5cyB0aGUgc2FtZS5cclxuICAgICAqIGlmIHRoZSBhcmd1bWVudCB3aWR0aCBpcyBzaG9ydGVyIHRoYW4gc3BhY2VzIGFyZSBhZGQuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhcmd1bWVudFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoXHJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzZUZvcm1hdHRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVzZUZvcm1hdFNwZWNpZmljYXRpb25XaWR0aChhcmd1bWVudDogc3RyaW5nLCB3aWR0aDogbnVtYmVyKSA6IHN0cmluZyB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIEJhc2VGb3JtYXR0ZXJIZWxwZXIuZXh0ZW5kQXJndW1lbnRUb0xlbmd0aChhcmd1bWVudCwgd2lkdGgsIHRydWUpOyAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaWxscyB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHdpZHRoIGFuZCB0aGUgYXJndW1lbnQgbGVuZ3RoIHdpdGggbnVsbHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGFyZ3VtZW50XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBCYXNlRm9ybWF0dGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZmlsbEl0ZW1XaXRoTnVsbChhcmd1bWVudDogc3RyaW5nLCB3aWR0aDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gQmFzZUZvcm1hdHRlckhlbHBlci5leHRlbmRBcmd1bWVudFRvTGVuZ3RoKGFyZ3VtZW50LCB3aWR0aCwgdHJ1ZSwgXCIwXCIpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==