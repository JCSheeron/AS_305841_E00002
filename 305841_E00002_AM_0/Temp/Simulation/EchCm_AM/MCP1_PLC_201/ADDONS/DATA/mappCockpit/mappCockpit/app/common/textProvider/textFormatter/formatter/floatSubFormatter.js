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
define(["require", "exports", "./baseFormatter", "../formatSpecification/formatSpecificationType"], function (require, exports, baseFormatter_1, formatSpecificationType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Subformatter for processing float input arguments
     *
     * @export
     * @class FloatSubFormatter
     * @extends {BaseFormatter}
     */
    var FloatSubFormatter = /** @class */ (function (_super) {
        __extends(FloatSubFormatter, _super);
        function FloatSubFormatter() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // due to c++ Foramtter the default digits after the decimal point is 6
            _this._defaultPrecision = 6;
            return _this;
        }
        /**
         * Adapt the argument to the type with the passed precision
         *
         * @override
         * @param {(number | string)} inputArgument
         * @param {number} precision
         * @param {FormatSpecificationTypes} type
         * @return {*}  {string}
         * @memberof FloatSubFormatter
         */
        FloatSubFormatter.prototype.useFormatSpecificationPrecisionAndType = function (inputArgument, precision, type) {
            var argument = inputArgument;
            if (isNaN(precision)) {
                precision = this._defaultPrecision;
            }
            var precisedArgument = argument.toFixed(precision);
            if (type === formatSpecificationType_1.FormatSpecificationTypes.scientificERepresentationLowerCase || type === formatSpecificationType_1.FormatSpecificationTypes.scientificERepresentationUpperCase) {
                precisedArgument = this.getExponentialOutput(argument, precision, type);
            }
            if (type === formatSpecificationType_1.FormatSpecificationTypes.lengthOptimizedOutput) {
                precisedArgument = this.getLengthOptimizedOutput(argument, precision);
            }
            return precisedArgument;
        };
        /**
         * Converts the argument to a scientific E-representation
         *
         * @private
         * @param {number} argument
         * @param {number} precision
         * @param {FormatSpecificationTypes} type
         * @return {*}  {string}
         * @memberof FloatSubFormatter
         */
        FloatSubFormatter.prototype.getExponentialOutput = function (argument, precision, type) {
            var precisedArgument = "";
            if (type === formatSpecificationType_1.FormatSpecificationTypes.scientificERepresentationLowerCase) {
                precisedArgument = argument.toExponential(precision);
                precisedArgument = precisedArgument.toLowerCase();
            }
            if (type === formatSpecificationType_1.FormatSpecificationTypes.scientificERepresentationUpperCase) {
                precisedArgument = argument.toExponential(precision);
                precisedArgument = precisedArgument.toUpperCase();
            }
            return precisedArgument;
        };
        /**
         * The length optimized output removes unnecessary digits after the decimal point
         * or adapt the number of digits to the passed precision
         *
         * @private
         * @param {number} argument
         * @param {number} precision
         * @return {*}  {string}
         * @memberof FloatSubFormatter
         */
        FloatSubFormatter.prototype.getLengthOptimizedOutput = function (argument, precision) {
            var precisedArgument;
            // get the digits before and after comma
            var decimalContainer = argument.toString().split(".", 1);
            // when the precision is smaller than the digits before the comma, exponential output is needed
            if (precision < decimalContainer[0].length) {
                precisedArgument = argument.toExponential(precision - 1);
            }
            //Ohterwise decimal output gets returned
            else {
                precisedArgument = argument.toPrecision(precision);
                argument = parseFloat(precisedArgument);
                precisedArgument = argument.toString();
            }
            return precisedArgument;
        };
        return FloatSubFormatter;
    }(baseFormatter_1.BaseFormatter));
    exports.FloatSubFormatter = FloatSubFormatter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXRTdWJGb3JtYXR0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi90ZXh0UHJvdmlkZXIvdGV4dEZvcm1hdHRlci9mb3JtYXR0ZXIvZmxvYXRTdWJGb3JtYXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUdBOzs7Ozs7T0FNRztJQUNIO1FBQXVDLHFDQUFhO1FBQXBEO1lBQUEscUVBNEZDO1lBMUZHLHVFQUF1RTtZQUMvRCx1QkFBaUIsR0FBVyxDQUFDLENBQUM7O1FBeUYxQyxDQUFDO1FBdkZHOzs7Ozs7Ozs7V0FTRztRQUNJLGtFQUFzQyxHQUE3QyxVQUE4QyxhQUE4QixFQUFFLFNBQWlCLEVBQUUsSUFBOEI7WUFFM0gsSUFBSSxRQUFRLEdBQVcsYUFBdUIsQ0FBQztZQUUvQyxJQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDakIsU0FBUyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQzthQUN0QztZQUVELElBQUksZ0JBQWdCLEdBQVcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUUzRCxJQUFHLElBQUksS0FBSyxrREFBd0IsQ0FBQyxrQ0FBa0MsSUFBSSxJQUFJLEtBQUssa0RBQXdCLENBQUMsa0NBQWtDLEVBQUU7Z0JBQzdJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzNFO1lBQ0QsSUFBRyxJQUFJLEtBQUssa0RBQXdCLENBQUMscUJBQXFCLEVBQUU7Z0JBQ3hELGdCQUFnQixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDekU7WUFFRCxPQUFPLGdCQUFnQixDQUFDO1FBQzVCLENBQUM7UUFFRDs7Ozs7Ozs7O1dBU0c7UUFDSyxnREFBb0IsR0FBNUIsVUFBNkIsUUFBZ0IsRUFBRSxTQUFpQixFQUFFLElBQThCO1lBRTVGLElBQUksZ0JBQWdCLEdBQVcsRUFBRSxDQUFDO1lBRWxDLElBQUcsSUFBSSxLQUFLLGtEQUF3QixDQUFDLGtDQUFrQyxFQUFDO2dCQUNwRSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNyRCxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUNyRDtZQUVELElBQUcsSUFBSSxLQUFLLGtEQUF3QixDQUFDLGtDQUFrQyxFQUFDO2dCQUNwRSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNyRCxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUNyRDtZQUVELE9BQU8sZ0JBQWdCLENBQUM7UUFDNUIsQ0FBQztRQUVEOzs7Ozs7Ozs7V0FTRztRQUNLLG9EQUF3QixHQUFoQyxVQUFpQyxRQUFnQixFQUFFLFNBQWlCO1lBRWhFLElBQUksZ0JBQXdCLENBQUM7WUFFN0Isd0NBQXdDO1lBQ3hDLElBQUksZ0JBQWdCLEdBQWtCLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRXhFLCtGQUErRjtZQUMvRixJQUFHLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3ZDLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzFEO1lBQ0Qsd0NBQXdDO2lCQUNuQztnQkFDRCxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNuRCxRQUFRLEdBQUcsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQ3hDLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUMxQztZQUVELE9BQU8sZ0JBQWdCLENBQUM7UUFDNUIsQ0FBQztRQUNMLHdCQUFDO0lBQUQsQ0FBQyxBQTVGRCxDQUF1Qyw2QkFBYSxHQTRGbkQ7SUE1RlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZUZvcm1hdHRlciB9IGZyb20gXCIuL2Jhc2VGb3JtYXR0ZXJcIjtcclxuaW1wb3J0IHsgRm9ybWF0U3BlY2lmaWNhdGlvblR5cGVzIH0gZnJvbSBcIi4uL2Zvcm1hdFNwZWNpZmljYXRpb24vZm9ybWF0U3BlY2lmaWNhdGlvblR5cGVcIjtcclxuXHJcbi8qKlxyXG4gKiBTdWJmb3JtYXR0ZXIgZm9yIHByb2Nlc3NpbmcgZmxvYXQgaW5wdXQgYXJndW1lbnRzXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIEZsb2F0U3ViRm9ybWF0dGVyXHJcbiAqIEBleHRlbmRzIHtCYXNlRm9ybWF0dGVyfVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEZsb2F0U3ViRm9ybWF0dGVyIGV4dGVuZHMgQmFzZUZvcm1hdHRlcntcclxuICAgXHJcbiAgICAvLyBkdWUgdG8gYysrIEZvcmFtdHRlciB0aGUgZGVmYXVsdCBkaWdpdHMgYWZ0ZXIgdGhlIGRlY2ltYWwgcG9pbnQgaXMgNlxyXG4gICAgcHJpdmF0ZSBfZGVmYXVsdFByZWNpc2lvbjogbnVtYmVyID0gNjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkYXB0IHRoZSBhcmd1bWVudCB0byB0aGUgdHlwZSB3aXRoIHRoZSBwYXNzZWQgcHJlY2lzaW9uXHJcbiAgICAgKiBcclxuICAgICAqIEBvdmVycmlkZVxyXG4gICAgICogQHBhcmFtIHsobnVtYmVyIHwgc3RyaW5nKX0gaW5wdXRBcmd1bWVudFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHByZWNpc2lvblxyXG4gICAgICogQHBhcmFtIHtGb3JtYXRTcGVjaWZpY2F0aW9uVHlwZXN9IHR5cGVcclxuICAgICAqIEByZXR1cm4geyp9ICB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIEZsb2F0U3ViRm9ybWF0dGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1c2VGb3JtYXRTcGVjaWZpY2F0aW9uUHJlY2lzaW9uQW5kVHlwZShpbnB1dEFyZ3VtZW50OiBudW1iZXIgfCBzdHJpbmcsIHByZWNpc2lvbjogbnVtYmVyLCB0eXBlOiBGb3JtYXRTcGVjaWZpY2F0aW9uVHlwZXMpIDogc3RyaW5nIHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgYXJndW1lbnQ6IG51bWJlciA9IGlucHV0QXJndW1lbnQgYXMgbnVtYmVyO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGlzTmFOKHByZWNpc2lvbikpIHtcclxuICAgICAgICAgICAgcHJlY2lzaW9uID0gdGhpcy5fZGVmYXVsdFByZWNpc2lvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwcmVjaXNlZEFyZ3VtZW50OiBzdHJpbmcgPSBhcmd1bWVudC50b0ZpeGVkKHByZWNpc2lvbik7XHJcblxyXG4gICAgICAgIGlmKHR5cGUgPT09IEZvcm1hdFNwZWNpZmljYXRpb25UeXBlcy5zY2llbnRpZmljRVJlcHJlc2VudGF0aW9uTG93ZXJDYXNlIHx8IHR5cGUgPT09IEZvcm1hdFNwZWNpZmljYXRpb25UeXBlcy5zY2llbnRpZmljRVJlcHJlc2VudGF0aW9uVXBwZXJDYXNlKSB7XHJcbiAgICAgICAgICAgIHByZWNpc2VkQXJndW1lbnQgPSB0aGlzLmdldEV4cG9uZW50aWFsT3V0cHV0KGFyZ3VtZW50LCBwcmVjaXNpb24sIHR5cGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0eXBlID09PSBGb3JtYXRTcGVjaWZpY2F0aW9uVHlwZXMubGVuZ3RoT3B0aW1pemVkT3V0cHV0KSB7XHJcbiAgICAgICAgICAgIHByZWNpc2VkQXJndW1lbnQgPSB0aGlzLmdldExlbmd0aE9wdGltaXplZE91dHB1dChhcmd1bWVudCwgcHJlY2lzaW9uKTsgXHJcbiAgICAgICAgfSAgICAgICBcclxuICAgXHJcbiAgICAgICAgcmV0dXJuIHByZWNpc2VkQXJndW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0cyB0aGUgYXJndW1lbnQgdG8gYSBzY2llbnRpZmljIEUtcmVwcmVzZW50YXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGFyZ3VtZW50XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcHJlY2lzaW9uXHJcbiAgICAgKiBAcGFyYW0ge0Zvcm1hdFNwZWNpZmljYXRpb25UeXBlc30gdHlwZVxyXG4gICAgICogQHJldHVybiB7Kn0gIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgRmxvYXRTdWJGb3JtYXR0ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRFeHBvbmVudGlhbE91dHB1dChhcmd1bWVudDogbnVtYmVyLCBwcmVjaXNpb246IG51bWJlciwgdHlwZTogRm9ybWF0U3BlY2lmaWNhdGlvblR5cGVzKSA6IHN0cmluZyB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHByZWNpc2VkQXJndW1lbnQ6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgICAgIGlmKHR5cGUgPT09IEZvcm1hdFNwZWNpZmljYXRpb25UeXBlcy5zY2llbnRpZmljRVJlcHJlc2VudGF0aW9uTG93ZXJDYXNlKXtcclxuICAgICAgICAgICAgcHJlY2lzZWRBcmd1bWVudCA9IGFyZ3VtZW50LnRvRXhwb25lbnRpYWwocHJlY2lzaW9uKTtcclxuICAgICAgICAgICAgcHJlY2lzZWRBcmd1bWVudCA9IHByZWNpc2VkQXJndW1lbnQudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHR5cGUgPT09IEZvcm1hdFNwZWNpZmljYXRpb25UeXBlcy5zY2llbnRpZmljRVJlcHJlc2VudGF0aW9uVXBwZXJDYXNlKXtcclxuICAgICAgICAgICAgcHJlY2lzZWRBcmd1bWVudCA9IGFyZ3VtZW50LnRvRXhwb25lbnRpYWwocHJlY2lzaW9uKTtcclxuICAgICAgICAgICAgcHJlY2lzZWRBcmd1bWVudCA9IHByZWNpc2VkQXJndW1lbnQudG9VcHBlckNhc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBwcmVjaXNlZEFyZ3VtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGxlbmd0aCBvcHRpbWl6ZWQgb3V0cHV0IHJlbW92ZXMgdW5uZWNlc3NhcnkgZGlnaXRzIGFmdGVyIHRoZSBkZWNpbWFsIHBvaW50XHJcbiAgICAgKiBvciBhZGFwdCB0aGUgbnVtYmVyIG9mIGRpZ2l0cyB0byB0aGUgcGFzc2VkIHByZWNpc2lvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYXJndW1lbnRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBwcmVjaXNpb25cclxuICAgICAqIEByZXR1cm4geyp9ICB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIEZsb2F0U3ViRm9ybWF0dGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0TGVuZ3RoT3B0aW1pemVkT3V0cHV0KGFyZ3VtZW50OiBudW1iZXIsIHByZWNpc2lvbjogbnVtYmVyKSA6IHN0cmluZyB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHByZWNpc2VkQXJndW1lbnQ6IHN0cmluZztcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBkaWdpdHMgYmVmb3JlIGFuZCBhZnRlciBjb21tYVxyXG4gICAgICAgIGxldCBkZWNpbWFsQ29udGFpbmVyOiBBcnJheTxzdHJpbmc+ID0gYXJndW1lbnQudG9TdHJpbmcoKS5zcGxpdChcIi5cIiwgMSk7IFxyXG5cclxuICAgICAgICAvLyB3aGVuIHRoZSBwcmVjaXNpb24gaXMgc21hbGxlciB0aGFuIHRoZSBkaWdpdHMgYmVmb3JlIHRoZSBjb21tYSwgZXhwb25lbnRpYWwgb3V0cHV0IGlzIG5lZWRlZFxyXG4gICAgICAgIGlmKHByZWNpc2lvbiA8IGRlY2ltYWxDb250YWluZXJbMF0ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHByZWNpc2VkQXJndW1lbnQgPSBhcmd1bWVudC50b0V4cG9uZW50aWFsKHByZWNpc2lvbi0xKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9PaHRlcndpc2UgZGVjaW1hbCBvdXRwdXQgZ2V0cyByZXR1cm5lZFxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBwcmVjaXNlZEFyZ3VtZW50ID0gYXJndW1lbnQudG9QcmVjaXNpb24ocHJlY2lzaW9uKTtcclxuICAgICAgICAgICAgYXJndW1lbnQgPSBwYXJzZUZsb2F0KHByZWNpc2VkQXJndW1lbnQpO1xyXG4gICAgICAgICAgICBwcmVjaXNlZEFyZ3VtZW50ID0gYXJndW1lbnQudG9TdHJpbmcoKTsgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHByZWNpc2VkQXJndW1lbnQ7XHJcbiAgICB9XHJcbn0iXX0=