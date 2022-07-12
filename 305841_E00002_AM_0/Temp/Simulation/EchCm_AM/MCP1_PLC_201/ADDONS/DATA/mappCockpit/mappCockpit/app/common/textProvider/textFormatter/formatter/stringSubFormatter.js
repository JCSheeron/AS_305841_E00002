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
define(["require", "exports", "./baseFormatter"], function (require, exports, baseFormatter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Subformatter for processing string input arguments
     *
     * @export
     * @class StringSubFormatter
     * @extends {BaseFormatter}
     */
    var StringSubFormatter = /** @class */ (function (_super) {
        __extends(StringSubFormatter, _super);
        function StringSubFormatter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * If there is a precision passed, the argument string gets cutted to the precision.
         * Else the string stays the same
         *
         * @override
         * @param {(number | string)} inputArgument
         * @param {(number)} precision
         * @param {FormatSpecificationTypes} type
         * @return {*}  {string}
         * @memberof StringSubFormatter
         */
        StringSubFormatter.prototype.useFormatSpecificationPrecisionAndType = function (inputArgument, precision, type) {
            var precisedArgument = inputArgument;
            if (!isNaN(precision)) {
                precisedArgument = precisedArgument.substring(0, precision);
            }
            return precisedArgument;
        };
        return StringSubFormatter;
    }(baseFormatter_1.BaseFormatter));
    exports.StringSubFormatter = StringSubFormatter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nU3ViRm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vdGV4dFByb3ZpZGVyL3RleHRGb3JtYXR0ZXIvZm9ybWF0dGVyL3N0cmluZ1N1YkZvcm1hdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBR0E7Ozs7OztPQU1HO0lBQ0g7UUFBd0Msc0NBQWE7UUFBckQ7O1FBdUJBLENBQUM7UUFyQkc7Ozs7Ozs7Ozs7V0FVRztRQUNJLG1FQUFzQyxHQUE3QyxVQUE4QyxhQUE4QixFQUFFLFNBQWlCLEVBQUUsSUFBOEI7WUFFM0gsSUFBSSxnQkFBZ0IsR0FBVyxhQUF1QixDQUFDO1lBRXZELElBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQ2xCLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDL0Q7WUFFRCxPQUFPLGdCQUFnQixDQUFDO1FBQzVCLENBQUM7UUFDTCx5QkFBQztJQUFELENBQUMsQUF2QkQsQ0FBd0MsNkJBQWEsR0F1QnBEO0lBdkJZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvcm1hdFNwZWNpZmljYXRpb25UeXBlcyB9IGZyb20gXCIuLi9mb3JtYXRTcGVjaWZpY2F0aW9uL2Zvcm1hdFNwZWNpZmljYXRpb25UeXBlXCI7XHJcbmltcG9ydCB7IEJhc2VGb3JtYXR0ZXIgfSBmcm9tIFwiLi9iYXNlRm9ybWF0dGVyXCI7XHJcblxyXG4vKipcclxuICogU3ViZm9ybWF0dGVyIGZvciBwcm9jZXNzaW5nIHN0cmluZyBpbnB1dCBhcmd1bWVudHNcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgU3RyaW5nU3ViRm9ybWF0dGVyXHJcbiAqIEBleHRlbmRzIHtCYXNlRm9ybWF0dGVyfVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFN0cmluZ1N1YkZvcm1hdHRlciBleHRlbmRzIEJhc2VGb3JtYXR0ZXJ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJZiB0aGVyZSBpcyBhIHByZWNpc2lvbiBwYXNzZWQsIHRoZSBhcmd1bWVudCBzdHJpbmcgZ2V0cyBjdXR0ZWQgdG8gdGhlIHByZWNpc2lvbi5cclxuICAgICAqIEVsc2UgdGhlIHN0cmluZyBzdGF5cyB0aGUgc2FtZVxyXG4gICAgICogXHJcbiAgICAgKiBAb3ZlcnJpZGVcclxuICAgICAqIEBwYXJhbSB7KG51bWJlciB8IHN0cmluZyl9IGlucHV0QXJndW1lbnRcclxuICAgICAqIEBwYXJhbSB7KG51bWJlcil9IHByZWNpc2lvblxyXG4gICAgICogQHBhcmFtIHtGb3JtYXRTcGVjaWZpY2F0aW9uVHlwZXN9IHR5cGVcclxuICAgICAqIEByZXR1cm4geyp9ICB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFN0cmluZ1N1YkZvcm1hdHRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXNlRm9ybWF0U3BlY2lmaWNhdGlvblByZWNpc2lvbkFuZFR5cGUoaW5wdXRBcmd1bWVudDogbnVtYmVyIHwgc3RyaW5nLCBwcmVjaXNpb246IG51bWJlciwgdHlwZTogRm9ybWF0U3BlY2lmaWNhdGlvblR5cGVzKSA6IHN0cmluZyB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHByZWNpc2VkQXJndW1lbnQ6IHN0cmluZyA9IGlucHV0QXJndW1lbnQgYXMgc3RyaW5nO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKCFpc05hTihwcmVjaXNpb24pKSB7XHJcbiAgICAgICAgICAgIHByZWNpc2VkQXJndW1lbnQgPSBwcmVjaXNlZEFyZ3VtZW50LnN1YnN0cmluZygwLCBwcmVjaXNpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gcHJlY2lzZWRBcmd1bWVudDtcclxuICAgIH1cclxufSJdfQ==