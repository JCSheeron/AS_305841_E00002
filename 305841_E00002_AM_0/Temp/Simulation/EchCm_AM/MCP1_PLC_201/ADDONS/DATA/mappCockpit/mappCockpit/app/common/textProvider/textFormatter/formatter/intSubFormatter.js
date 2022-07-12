var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "../formatSpecification/formatSpecificationType", "./baseFormatter", "./baseFormatterHelper"], function (require, exports, formatSpecificationType_1, baseFormatter_1, baseFormatterHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Subformatter for processing integer input arguments
     *
     * @export
     * @class IntSubFormatter
     * @extends {BaseFormatter}
     */
    var IntSubFormatter = /** @class */ (function (_super) {
        __extends(IntSubFormatter, _super);
        function IntSubFormatter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Adapt the argument to the type with the passed precision
         *
         * @override
         * @param {(number | string)} inputArgument
         * @param {number} precision
         * @param {(FormatSpecificationTypes} type
         * @return {*}  {string}
         * @memberof IntSubFormatter
         */
        IntSubFormatter.prototype.useFormatSpecificationPrecisionAndType = function (inputArgument, precision, type) {
            var argument = inputArgument;
            var formattedArgument = this.adaptType(argument, type);
            formattedArgument = this.preciseArgument(formattedArgument, precision);
            return formattedArgument;
        };
        /**
         * Adapt the argument to the type if there is a suitable type
         * else convert the argument from number to string
         *
         * @private
         * @param {number} argument
         * @param {FormatSpecificationTypes} [formatSpecificationType]
         * @return {*}  {string}
         * @memberof IntSubFormatter
         */
        IntSubFormatter.prototype.adaptType = function (argument, formatSpecificationType) {
            var addaptedArgument = argument.toString();
            if (formatSpecificationType === formatSpecificationType_1.FormatSpecificationTypes.binaryNumber) {
                addaptedArgument = argument.toString(2);
            }
            if (formatSpecificationType === formatSpecificationType_1.FormatSpecificationTypes.octalNumber) {
                addaptedArgument = argument.toString(8);
            }
            if (formatSpecificationType === formatSpecificationType_1.FormatSpecificationTypes.hexadecimalLowercase) {
                addaptedArgument = argument.toString(16);
                addaptedArgument = addaptedArgument.toLowerCase();
            }
            if (formatSpecificationType === formatSpecificationType_1.FormatSpecificationTypes.hexadecimalUppercase) {
                addaptedArgument = argument.toString(16);
                addaptedArgument = addaptedArgument.toUpperCase();
            }
            return addaptedArgument;
        };
        /**
         * As long the precision > argument.length, "0" are appended on front of the argument
         *
         * @private
         * @param {string} argument
         * @param {number} precision
         * @return {*}  {string}
         * @memberof IntSubFormatter
         */
        IntSubFormatter.prototype.preciseArgument = function (argument, precision) {
            return baseFormatterHelper_1.BaseFormatterHelper.extendArgumentToLength(argument, precision, true, "0");
        };
        return IntSubFormatter;
    }(baseFormatter_1.BaseFormatter));
    exports.IntSubFormatter = IntSubFormatter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50U3ViRm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vdGV4dFByb3ZpZGVyL3RleHRGb3JtYXR0ZXIvZm9ybWF0dGVyL2ludFN1YkZvcm1hdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBSUE7Ozs7OztPQU1HO0lBQ0g7UUFBcUMsbUNBQWE7UUFBbEQ7O1FBcUVBLENBQUM7UUFuRUc7Ozs7Ozs7OztXQVNHO1FBQ0ksZ0VBQXNDLEdBQTdDLFVBQThDLGFBQThCLEVBQUUsU0FBaUIsRUFBRSxJQUE4QjtZQUMzSCxJQUFJLFFBQVEsR0FBVyxhQUF1QixDQUFDO1lBRS9DLElBQUksaUJBQWlCLEdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFL0QsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUV2RSxPQUFPLGlCQUFpQixDQUFDO1FBRTdCLENBQUM7UUFFRDs7Ozs7Ozs7O1dBU0c7UUFDSyxtQ0FBUyxHQUFqQixVQUFrQixRQUFnQixFQUFFLHVCQUFrRDtZQUVsRixJQUFJLGdCQUFnQixHQUFXLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUVuRCxJQUFHLHVCQUF1QixLQUFLLGtEQUF3QixDQUFDLFlBQVksRUFBRTtnQkFDbEUsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMzQztZQUNELElBQUcsdUJBQXVCLEtBQUssa0RBQXdCLENBQUMsV0FBVyxFQUFFO2dCQUNqRSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzNDO1lBQ0QsSUFBRyx1QkFBdUIsS0FBSyxrREFBd0IsQ0FBQyxvQkFBb0IsRUFBRTtnQkFDMUUsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDekMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7YUFFckQ7WUFDRCxJQUFHLHVCQUF1QixLQUFLLGtEQUF3QixDQUFDLG9CQUFvQixFQUFFO2dCQUMxRSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN6QyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUNyRDtZQUVELE9BQU8sZ0JBQWdCLENBQUM7UUFDNUIsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0sseUNBQWUsR0FBdkIsVUFBd0IsUUFBZ0IsRUFBRSxTQUFpQjtZQUV2RCxPQUFPLHlDQUFtQixDQUFDLHNCQUFzQixDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3RGLENBQUM7UUFDTCxzQkFBQztJQUFELENBQUMsQUFyRUQsQ0FBcUMsNkJBQWEsR0FxRWpEO0lBckVZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9ybWF0U3BlY2lmaWNhdGlvblR5cGVzIH0gZnJvbSBcIi4uL2Zvcm1hdFNwZWNpZmljYXRpb24vZm9ybWF0U3BlY2lmaWNhdGlvblR5cGVcIjtcclxuaW1wb3J0IHsgQmFzZUZvcm1hdHRlciB9IGZyb20gXCIuL2Jhc2VGb3JtYXR0ZXJcIjtcclxuaW1wb3J0IHsgQmFzZUZvcm1hdHRlckhlbHBlciB9IGZyb20gXCIuL2Jhc2VGb3JtYXR0ZXJIZWxwZXJcIjtcclxuXHJcbi8qKlxyXG4gKiBTdWJmb3JtYXR0ZXIgZm9yIHByb2Nlc3NpbmcgaW50ZWdlciBpbnB1dCBhcmd1bWVudHNcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgSW50U3ViRm9ybWF0dGVyXHJcbiAqIEBleHRlbmRzIHtCYXNlRm9ybWF0dGVyfVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEludFN1YkZvcm1hdHRlciBleHRlbmRzIEJhc2VGb3JtYXR0ZXJ7ICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGFwdCB0aGUgYXJndW1lbnQgdG8gdGhlIHR5cGUgd2l0aCB0aGUgcGFzc2VkIHByZWNpc2lvblxyXG4gICAgICogXHJcbiAgICAgKiBAb3ZlcnJpZGVcclxuICAgICAqIEBwYXJhbSB7KG51bWJlciB8IHN0cmluZyl9IGlucHV0QXJndW1lbnRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBwcmVjaXNpb25cclxuICAgICAqIEBwYXJhbSB7KEZvcm1hdFNwZWNpZmljYXRpb25UeXBlc30gdHlwZVxyXG4gICAgICogQHJldHVybiB7Kn0gIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgSW50U3ViRm9ybWF0dGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1c2VGb3JtYXRTcGVjaWZpY2F0aW9uUHJlY2lzaW9uQW5kVHlwZShpbnB1dEFyZ3VtZW50OiBudW1iZXIgfCBzdHJpbmcsIHByZWNpc2lvbjogbnVtYmVyLCB0eXBlOiBGb3JtYXRTcGVjaWZpY2F0aW9uVHlwZXMpIDogc3RyaW5nIHtcclxuICAgICAgICBsZXQgYXJndW1lbnQ6IG51bWJlciA9IGlucHV0QXJndW1lbnQgYXMgbnVtYmVyO1xyXG5cclxuICAgICAgICBsZXQgZm9ybWF0dGVkQXJndW1lbnQ6IHN0cmluZyA9IHRoaXMuYWRhcHRUeXBlKGFyZ3VtZW50LCB0eXBlKTtcclxuICAgICAgICBcclxuICAgICAgICBmb3JtYXR0ZWRBcmd1bWVudCA9IHRoaXMucHJlY2lzZUFyZ3VtZW50KGZvcm1hdHRlZEFyZ3VtZW50LCBwcmVjaXNpb24pO1xyXG5cclxuICAgICAgICByZXR1cm4gZm9ybWF0dGVkQXJndW1lbnQ7XHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEFkYXB0IHRoZSBhcmd1bWVudCB0byB0aGUgdHlwZSBpZiB0aGVyZSBpcyBhIHN1aXRhYmxlIHR5cGVcclxuICAgICAqIGVsc2UgY29udmVydCB0aGUgYXJndW1lbnQgZnJvbSBudW1iZXIgdG8gc3RyaW5nXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhcmd1bWVudFxyXG4gICAgICogQHBhcmFtIHtGb3JtYXRTcGVjaWZpY2F0aW9uVHlwZXN9IFtmb3JtYXRTcGVjaWZpY2F0aW9uVHlwZV1cclxuICAgICAqIEByZXR1cm4geyp9ICB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIEludFN1YkZvcm1hdHRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkYXB0VHlwZShhcmd1bWVudDogbnVtYmVyLCBmb3JtYXRTcGVjaWZpY2F0aW9uVHlwZT86IEZvcm1hdFNwZWNpZmljYXRpb25UeXBlcykgOiBzdHJpbmcge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBhZGRhcHRlZEFyZ3VtZW50OiBzdHJpbmcgPSBhcmd1bWVudC50b1N0cmluZygpO1xyXG5cclxuICAgICAgICBpZihmb3JtYXRTcGVjaWZpY2F0aW9uVHlwZSA9PT0gRm9ybWF0U3BlY2lmaWNhdGlvblR5cGVzLmJpbmFyeU51bWJlcikge1xyXG4gICAgICAgICAgICBhZGRhcHRlZEFyZ3VtZW50ID0gYXJndW1lbnQudG9TdHJpbmcoMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGZvcm1hdFNwZWNpZmljYXRpb25UeXBlID09PSBGb3JtYXRTcGVjaWZpY2F0aW9uVHlwZXMub2N0YWxOdW1iZXIpIHtcclxuICAgICAgICAgICAgYWRkYXB0ZWRBcmd1bWVudCA9IGFyZ3VtZW50LnRvU3RyaW5nKDgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihmb3JtYXRTcGVjaWZpY2F0aW9uVHlwZSA9PT0gRm9ybWF0U3BlY2lmaWNhdGlvblR5cGVzLmhleGFkZWNpbWFsTG93ZXJjYXNlKSB7XHJcbiAgICAgICAgICAgIGFkZGFwdGVkQXJndW1lbnQgPSBhcmd1bWVudC50b1N0cmluZygxNik7XHJcbiAgICAgICAgICAgIGFkZGFwdGVkQXJndW1lbnQgPSBhZGRhcHRlZEFyZ3VtZW50LnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihmb3JtYXRTcGVjaWZpY2F0aW9uVHlwZSA9PT0gRm9ybWF0U3BlY2lmaWNhdGlvblR5cGVzLmhleGFkZWNpbWFsVXBwZXJjYXNlKSB7XHJcbiAgICAgICAgICAgIGFkZGFwdGVkQXJndW1lbnQgPSBhcmd1bWVudC50b1N0cmluZygxNik7XHJcbiAgICAgICAgICAgIGFkZGFwdGVkQXJndW1lbnQgPSBhZGRhcHRlZEFyZ3VtZW50LnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYWRkYXB0ZWRBcmd1bWVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFzIGxvbmcgdGhlIHByZWNpc2lvbiA+IGFyZ3VtZW50Lmxlbmd0aCwgXCIwXCIgYXJlIGFwcGVuZGVkIG9uIGZyb250IG9mIHRoZSBhcmd1bWVudFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYXJndW1lbnRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBwcmVjaXNpb25cclxuICAgICAqIEByZXR1cm4geyp9ICB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIEludFN1YkZvcm1hdHRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHByZWNpc2VBcmd1bWVudChhcmd1bWVudDogc3RyaW5nLCBwcmVjaXNpb246IG51bWJlcikgOiBzdHJpbmcge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBCYXNlRm9ybWF0dGVySGVscGVyLmV4dGVuZEFyZ3VtZW50VG9MZW5ndGgoYXJndW1lbnQsIHByZWNpc2lvbiwgdHJ1ZSwgXCIwXCIpO1xyXG4gICAgfVxyXG59Il19