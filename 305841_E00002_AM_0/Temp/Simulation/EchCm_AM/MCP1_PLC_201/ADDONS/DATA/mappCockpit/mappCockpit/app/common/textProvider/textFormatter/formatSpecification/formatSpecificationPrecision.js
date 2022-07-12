define(["require", "exports", "../../interface/formatterInputArgumentInterface", "../editStringHelper", "../formatItemIdentifier", "../formatter/baseFormatterHelper", "./formatSpecificationType"], function (require, exports, formatterInputArgumentInterface_1, editStringHelper_1, formatItemIdentifier_1, baseFormatterHelper_1, formatSpecificationType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * This class provides static FormatSpecificationPrecision functions
     *
     * @static
     * @class FormatSpecificationPrecision
     */
    var FormatSpecificationPrecision = /** @class */ (function () {
        /**
         * Constructor set to private FormatSpecificationPrecision class should only provide static functions.
         * Creates an instance of FormatSpecificationPrecision.
         * @memberof FormatSpecificationPrecision
         */
        function FormatSpecificationPrecision() {
        }
        ;
        /**
         * Gets the precision from the input string as number and set it in the IFormatSpecification.precision
         * If there is no match NaN gets set to IFormatSpecification.precision
         *
         * @static
         * @param {IFormatSpecification} formatSpecification
         * @param {string} textFormatSpecification
         * @param  {FormatterInputArgumentList | undefined} argumentList
         * @return {IFormatSpecification}
         * @memberof FormatSpecificationPrecision
         */
        FormatSpecificationPrecision.getFormatSpecificationPrecision = function (formatSpecification, textFormatSpecification, argumenlist) {
            var precision = NaN;
            var precisionSeperator = this.getPrecisionSeperator(textFormatSpecification);
            // check if there is a precision
            if (editStringHelper_1.EditStringHelper.indexIsValid(precisionSeperator)) {
                var precisionStr = textFormatSpecification.substring(precisionSeperator + 1, formatSpecificationType_1.FormatSpecificationType.getTypeSeperator(textFormatSpecification));
                // check if there is a referenced precision "*"
                if (precisionStr[0] === formatItemIdentifier_1.FormatItemIdentifier.formatSpecificationReference) {
                    // get the referenced precision value from argument list
                    precisionStr = precisionStr.substring(1, precisionStr.length);
                    var referencedPrecisionArg = editStringHelper_1.EditStringHelper.getReferencedIntArgumentValueFromText(precisionStr, argumenlist);
                    // if an integer argument is found it is assigned to the precision
                    if (referencedPrecisionArg.inputType === formatterInputArgumentInterface_1.FormatterArgumentTypes.Integer) {
                        precision = referencedPrecisionArg.argument;
                    }
                }
                else {
                    // get the precision from string
                    precision = baseFormatterHelper_1.BaseFormatterHelper.parseStringToInt(precisionStr);
                }
            }
            formatSpecification.precision = Math.abs(precision);
            return formatSpecification;
        };
        /**
         * Returns either the position from the textFormatSpecification before the precision (".")
         * or -1 to signalize that there is no precision
         *
         * @static
    
         * @param {string} textFormatSpecification
         * @return {*}  {number}
         * @memberof FormatSpecificationType
         */
        FormatSpecificationPrecision.getPrecisionSeperator = function (textFormatSpecification) {
            // search the index of "." from the formatspecification string
            return textFormatSpecification.indexOf(formatItemIdentifier_1.FormatItemIdentifier.formatSpecificationPrecision);
        };
        return FormatSpecificationPrecision;
    }());
    exports.FormatSpecificationPrecision = FormatSpecificationPrecision;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0U3BlY2lmaWNhdGlvblByZWNpc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3RleHRQcm92aWRlci90ZXh0Rm9ybWF0dGVyL2Zvcm1hdFNwZWNpZmljYXRpb24vZm9ybWF0U3BlY2lmaWNhdGlvblByZWNpc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFRQTs7Ozs7T0FLRztJQUNIO1FBRUk7Ozs7V0FJRztRQUNIO1FBQXVCLENBQUM7UUFBQSxDQUFDO1FBRXpCOzs7Ozs7Ozs7O1dBVUc7UUFDVyw0REFBK0IsR0FBN0MsVUFBOEMsbUJBQXlDLEVBQUUsdUJBQStCLEVBQUUsV0FBd0M7WUFFOUosSUFBSSxTQUFTLEdBQVcsR0FBRyxDQUFDO1lBRTVCLElBQUksa0JBQWtCLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDN0UsZ0NBQWdDO1lBQ2hDLElBQUcsbUNBQWdCLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7Z0JBQ2xELElBQUksWUFBWSxHQUFXLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsR0FBQyxDQUFDLEVBQUUsaURBQXVCLENBQUMsZ0JBQWdCLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDO2dCQUN0SiwrQ0FBK0M7Z0JBQy9DLElBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLDJDQUFvQixDQUFDLDRCQUE0QixFQUFFO29CQUN0RSx3REFBd0Q7b0JBQ3hELFlBQVksR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQzlELElBQUksc0JBQXNCLEdBQTRCLG1DQUFnQixDQUFDLHFDQUFxQyxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUMsQ0FBQztvQkFDeEksa0VBQWtFO29CQUNsRSxJQUFHLHNCQUFzQixDQUFDLFNBQVMsS0FBSyx3REFBc0IsQ0FBQyxPQUFPLEVBQUU7d0JBQ3BFLFNBQVMsR0FBRyxzQkFBc0IsQ0FBQyxRQUFrQixDQUFDO3FCQUN6RDtpQkFDSjtxQkFDRztvQkFDQSxnQ0FBZ0M7b0JBQ2hDLFNBQVMsR0FBRyx5Q0FBbUIsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztpQkFDbEU7YUFDSjtZQUVELG1CQUFtQixDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRXBELE9BQU8sbUJBQW1CLENBQUM7UUFDL0IsQ0FBQztRQUVEOzs7Ozs7Ozs7V0FTRztRQUNXLGtEQUFxQixHQUFuQyxVQUFvQyx1QkFBK0I7WUFFL0QsOERBQThEO1lBQzlELE9BQU8sdUJBQXVCLENBQUMsT0FBTyxDQUFDLDJDQUFvQixDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFDOUYsQ0FBQztRQUNMLG1DQUFDO0lBQUQsQ0FBQyxBQWhFRCxJQWdFQztJQWhFWSxvRUFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJRm9ybWF0U3BlY2lmaWNhdGlvbiB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2UvZm9ybWF0U3BlY2lmaWNhdGlvbkludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBGb3JtYXR0ZXJBcmd1bWVudFR5cGVzLCBJRm9ybWF0dGVySW5wdXRBcmd1bWVudCB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2UvZm9ybWF0dGVySW5wdXRBcmd1bWVudEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBFZGl0U3RyaW5nSGVscGVyIH0gZnJvbSBcIi4uL2VkaXRTdHJpbmdIZWxwZXJcIjtcclxuaW1wb3J0IHsgRm9ybWF0SXRlbUlkZW50aWZpZXIgfSBmcm9tIFwiLi4vZm9ybWF0SXRlbUlkZW50aWZpZXJcIjtcclxuaW1wb3J0IHsgQmFzZUZvcm1hdHRlckhlbHBlciB9IGZyb20gXCIuLi9mb3JtYXR0ZXIvYmFzZUZvcm1hdHRlckhlbHBlclwiO1xyXG5pbXBvcnQgeyBGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50TGlzdCB9IGZyb20gXCIuLi9mb3JtYXR0ZXJJbnB1dEFyZ3VtZW50cy9mb3JtYXR0ZXJJbnB1dEFyZ3VtZW50TGlzdFwiO1xyXG5pbXBvcnQgeyBGb3JtYXRTcGVjaWZpY2F0aW9uVHlwZSB9IGZyb20gXCIuL2Zvcm1hdFNwZWNpZmljYXRpb25UeXBlXCI7XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBwcm92aWRlcyBzdGF0aWMgRm9ybWF0U3BlY2lmaWNhdGlvblByZWNpc2lvbiBmdW5jdGlvbnNcclxuICogXHJcbiAqIEBzdGF0aWNcclxuICogQGNsYXNzIEZvcm1hdFNwZWNpZmljYXRpb25QcmVjaXNpb25cclxuICovXHJcbmV4cG9ydCBjbGFzcyBGb3JtYXRTcGVjaWZpY2F0aW9uUHJlY2lzaW9ue1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uc3RydWN0b3Igc2V0IHRvIHByaXZhdGUgRm9ybWF0U3BlY2lmaWNhdGlvblByZWNpc2lvbiBjbGFzcyBzaG91bGQgb25seSBwcm92aWRlIHN0YXRpYyBmdW5jdGlvbnMuXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEZvcm1hdFNwZWNpZmljYXRpb25QcmVjaXNpb24uXHJcbiAgICAgKiBAbWVtYmVyb2YgRm9ybWF0U3BlY2lmaWNhdGlvblByZWNpc2lvblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge307XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBwcmVjaXNpb24gZnJvbSB0aGUgaW5wdXQgc3RyaW5nIGFzIG51bWJlciBhbmQgc2V0IGl0IGluIHRoZSBJRm9ybWF0U3BlY2lmaWNhdGlvbi5wcmVjaXNpb25cclxuICAgICAqIElmIHRoZXJlIGlzIG5vIG1hdGNoIE5hTiBnZXRzIHNldCB0byBJRm9ybWF0U3BlY2lmaWNhdGlvbi5wcmVjaXNpb25cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0lGb3JtYXRTcGVjaWZpY2F0aW9ufSBmb3JtYXRTcGVjaWZpY2F0aW9uXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dEZvcm1hdFNwZWNpZmljYXRpb25cclxuICAgICAqIEBwYXJhbSAge0Zvcm1hdHRlcklucHV0QXJndW1lbnRMaXN0IHwgdW5kZWZpbmVkfSBhcmd1bWVudExpc3RcclxuICAgICAqIEByZXR1cm4ge0lGb3JtYXRTcGVjaWZpY2F0aW9ufVxyXG4gICAgICogQG1lbWJlcm9mIEZvcm1hdFNwZWNpZmljYXRpb25QcmVjaXNpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRGb3JtYXRTcGVjaWZpY2F0aW9uUHJlY2lzaW9uKGZvcm1hdFNwZWNpZmljYXRpb246IElGb3JtYXRTcGVjaWZpY2F0aW9uLCB0ZXh0Rm9ybWF0U3BlY2lmaWNhdGlvbjogc3RyaW5nLCBhcmd1bWVubGlzdD86IEZvcm1hdHRlcklucHV0QXJndW1lbnRMaXN0KSA6IElGb3JtYXRTcGVjaWZpY2F0aW9uIHsgICAgICAgXHJcblxyXG4gICAgICAgIGxldCBwcmVjaXNpb246IG51bWJlciA9IE5hTjtcclxuXHJcbiAgICAgICAgbGV0IHByZWNpc2lvblNlcGVyYXRvciA9IHRoaXMuZ2V0UHJlY2lzaW9uU2VwZXJhdG9yKHRleHRGb3JtYXRTcGVjaWZpY2F0aW9uKTtcclxuICAgICAgICAvLyBjaGVjayBpZiB0aGVyZSBpcyBhIHByZWNpc2lvblxyXG4gICAgICAgIGlmKEVkaXRTdHJpbmdIZWxwZXIuaW5kZXhJc1ZhbGlkKHByZWNpc2lvblNlcGVyYXRvcikpIHsgICAgICBcclxuICAgICAgICAgICAgbGV0IHByZWNpc2lvblN0cjogc3RyaW5nID0gdGV4dEZvcm1hdFNwZWNpZmljYXRpb24uc3Vic3RyaW5nKHByZWNpc2lvblNlcGVyYXRvcisxLCBGb3JtYXRTcGVjaWZpY2F0aW9uVHlwZS5nZXRUeXBlU2VwZXJhdG9yKHRleHRGb3JtYXRTcGVjaWZpY2F0aW9uKSk7XHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZXJlIGlzIGEgcmVmZXJlbmNlZCBwcmVjaXNpb24gXCIqXCJcclxuICAgICAgICAgICAgaWYocHJlY2lzaW9uU3RyWzBdID09PSBGb3JtYXRJdGVtSWRlbnRpZmllci5mb3JtYXRTcGVjaWZpY2F0aW9uUmVmZXJlbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIHJlZmVyZW5jZWQgcHJlY2lzaW9uIHZhbHVlIGZyb20gYXJndW1lbnQgbGlzdFxyXG4gICAgICAgICAgICAgICAgcHJlY2lzaW9uU3RyID0gcHJlY2lzaW9uU3RyLnN1YnN0cmluZygxLCBwcmVjaXNpb25TdHIubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIGxldCByZWZlcmVuY2VkUHJlY2lzaW9uQXJnOiBJRm9ybWF0dGVySW5wdXRBcmd1bWVudCA9IEVkaXRTdHJpbmdIZWxwZXIuZ2V0UmVmZXJlbmNlZEludEFyZ3VtZW50VmFsdWVGcm9tVGV4dChwcmVjaXNpb25TdHIsIGFyZ3VtZW5saXN0KTtcclxuICAgICAgICAgICAgICAgIC8vIGlmIGFuIGludGVnZXIgYXJndW1lbnQgaXMgZm91bmQgaXQgaXMgYXNzaWduZWQgdG8gdGhlIHByZWNpc2lvblxyXG4gICAgICAgICAgICAgICAgaWYocmVmZXJlbmNlZFByZWNpc2lvbkFyZy5pbnB1dFR5cGUgPT09IEZvcm1hdHRlckFyZ3VtZW50VHlwZXMuSW50ZWdlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHByZWNpc2lvbiA9IHJlZmVyZW5jZWRQcmVjaXNpb25BcmcuYXJndW1lbnQgYXMgbnVtYmVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIHByZWNpc2lvbiBmcm9tIHN0cmluZ1xyXG4gICAgICAgICAgICAgICAgcHJlY2lzaW9uID0gQmFzZUZvcm1hdHRlckhlbHBlci5wYXJzZVN0cmluZ1RvSW50KHByZWNpc2lvblN0cik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvcm1hdFNwZWNpZmljYXRpb24ucHJlY2lzaW9uID0gTWF0aC5hYnMocHJlY2lzaW9uKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZvcm1hdFNwZWNpZmljYXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGVpdGhlciB0aGUgcG9zaXRpb24gZnJvbSB0aGUgdGV4dEZvcm1hdFNwZWNpZmljYXRpb24gYmVmb3JlIHRoZSBwcmVjaXNpb24gKFwiLlwiKVxyXG4gICAgICogb3IgLTEgdG8gc2lnbmFsaXplIHRoYXQgdGhlcmUgaXMgbm8gcHJlY2lzaW9uXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0Rm9ybWF0U3BlY2lmaWNhdGlvblxyXG4gICAgICogQHJldHVybiB7Kn0gIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgRm9ybWF0U3BlY2lmaWNhdGlvblR5cGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRQcmVjaXNpb25TZXBlcmF0b3IodGV4dEZvcm1hdFNwZWNpZmljYXRpb246IHN0cmluZykgOiBudW1iZXIge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHNlYXJjaCB0aGUgaW5kZXggb2YgXCIuXCIgZnJvbSB0aGUgZm9ybWF0c3BlY2lmaWNhdGlvbiBzdHJpbmdcclxuICAgICAgICByZXR1cm4gdGV4dEZvcm1hdFNwZWNpZmljYXRpb24uaW5kZXhPZihGb3JtYXRJdGVtSWRlbnRpZmllci5mb3JtYXRTcGVjaWZpY2F0aW9uUHJlY2lzaW9uKTtcclxuICAgIH1cclxufVxyXG4iXX0=