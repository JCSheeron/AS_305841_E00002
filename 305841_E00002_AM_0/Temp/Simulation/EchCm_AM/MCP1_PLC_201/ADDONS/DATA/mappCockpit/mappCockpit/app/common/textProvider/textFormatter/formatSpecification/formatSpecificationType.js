define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FormatSpecificationTypes;
    (function (FormatSpecificationTypes) {
        FormatSpecificationTypes["noType"] = "no type";
        FormatSpecificationTypes["signedInteger"] = "d o. i";
        FormatSpecificationTypes["unsignedInteger"] = "u";
        FormatSpecificationTypes["binaryNumber"] = "b";
        FormatSpecificationTypes["octalNumber"] = "o";
        FormatSpecificationTypes["hexadecimalLowercase"] = "x";
        FormatSpecificationTypes["hexadecimalUppercase"] = "X";
        FormatSpecificationTypes["decimalOutput"] = "f";
        FormatSpecificationTypes["scientificERepresentationLowerCase"] = "e";
        FormatSpecificationTypes["scientificERepresentationUpperCase"] = "E";
        FormatSpecificationTypes["lengthOptimizedOutput"] = "g o. G";
    })(FormatSpecificationTypes = exports.FormatSpecificationTypes || (exports.FormatSpecificationTypes = {}));
    /**
     * This class provides static formatSpecificationType functions
     *
     * @static
     * @class FormatSpecificationType
     */
    var FormatSpecificationType = /** @class */ (function () {
        /**
         * Constructor set to private FormatSpecificationType class should only provide static functions.
         * Creates an instance of FormatSpecificationType.
         * @memberof FormatSpecificationType
         */
        function FormatSpecificationType() {
        }
        ;
        /**
         * Check if the type string match to an IFormatSpecificationType and returns that
         * If there is no the IFormatSpecifaction.type is set to undefined
         *
         * @static
         * @param {IFormatSpecification} formatSpecification
         * @param {string} type
         * @return {IFormatSpecification}
         * @memberof FormatSpecificationType
         */
        FormatSpecificationType.getFormatSpecificationType = function (formatSpecification, type) {
            // get the type or undefined
            var formatSpecificationType = this._typeMap.get(type);
            if (formatSpecificationType === undefined) {
                formatSpecificationType = FormatSpecificationTypes.noType;
            }
            formatSpecification.type = formatSpecificationType;
            return formatSpecification;
        };
        /**
         * Returns either the position from the textFormatSpecification before the type information
         * or the last position of the string when there is no type
         *
         * @static
         * @param {string} textFormatSpecification
         * @return {*}  {number}
         * @memberof FormatSpecificationType
         */
        FormatSpecificationType.getTypeSeperator = function (textFormatSpecification) {
            var typeSeperator = textFormatSpecification.length - 1;
            if (this._typeMap.get(textFormatSpecification[typeSeperator]) === undefined) {
                ++typeSeperator;
            }
            return typeSeperator;
        };
        FormatSpecificationType._typeMap = new Map([
            ["d", FormatSpecificationTypes.signedInteger],
            ["i", FormatSpecificationTypes.signedInteger],
            ["u", FormatSpecificationTypes.unsignedInteger],
            ["o", FormatSpecificationTypes.octalNumber],
            ["b", FormatSpecificationTypes.binaryNumber],
            ["x", FormatSpecificationTypes.hexadecimalLowercase],
            ["X", FormatSpecificationTypes.hexadecimalUppercase],
            ["f", FormatSpecificationTypes.decimalOutput],
            ["e", FormatSpecificationTypes.scientificERepresentationLowerCase],
            ["E", FormatSpecificationTypes.scientificERepresentationUpperCase],
            ["g", FormatSpecificationTypes.lengthOptimizedOutput],
            ["G", FormatSpecificationTypes.lengthOptimizedOutput]
        ]);
        return FormatSpecificationType;
    }());
    exports.FormatSpecificationType = FormatSpecificationType;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0U3BlY2lmaWNhdGlvblR5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi90ZXh0UHJvdmlkZXIvdGV4dEZvcm1hdHRlci9mb3JtYXRTcGVjaWZpY2F0aW9uL2Zvcm1hdFNwZWNpZmljYXRpb25UeXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUVBLElBQVksd0JBWVg7SUFaRCxXQUFZLHdCQUF3QjtRQUNoQyw4Q0FBa0IsQ0FBQTtRQUNsQixvREFBdUIsQ0FBQTtRQUN2QixpREFBcUIsQ0FBQTtRQUNyQiw4Q0FBaUIsQ0FBQTtRQUNqQiw2Q0FBaUIsQ0FBQTtRQUNqQixzREFBMEIsQ0FBQTtRQUMxQixzREFBMEIsQ0FBQTtRQUMxQiwrQ0FBbUIsQ0FBQTtRQUNuQixvRUFBd0MsQ0FBQTtRQUN4QyxvRUFBd0MsQ0FBQTtRQUN4Qyw0REFBZ0MsQ0FBQTtJQUNwQyxDQUFDLEVBWlcsd0JBQXdCLEdBQXhCLGdDQUF3QixLQUF4QixnQ0FBd0IsUUFZbkM7SUFFRDs7Ozs7T0FLRztJQUNIO1FBaUJJOzs7O1dBSUc7UUFDSDtRQUF1QixDQUFDO1FBQUEsQ0FBQztRQUV6Qjs7Ozs7Ozs7O1dBU0c7UUFDVyxrREFBMEIsR0FBeEMsVUFBeUMsbUJBQXlDLEVBQUUsSUFBWTtZQUU1Riw0QkFBNEI7WUFDNUIsSUFBSSx1QkFBdUIsR0FBeUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFNUYsSUFBRyx1QkFBdUIsS0FBSyxTQUFTLEVBQUU7Z0JBQ3RDLHVCQUF1QixHQUFHLHdCQUF3QixDQUFDLE1BQU0sQ0FBQzthQUM3RDtZQUVELG1CQUFtQixDQUFDLElBQUksR0FBRyx1QkFBdUIsQ0FBQztZQUVuRCxPQUFPLG1CQUFtQixDQUFDO1FBQy9CLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNXLHdDQUFnQixHQUE5QixVQUErQix1QkFBK0I7WUFFMUQsSUFBSSxhQUFhLEdBQVcsdUJBQXVCLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQztZQUU3RCxJQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUFFO2dCQUN4RSxFQUFFLGFBQWEsQ0FBQzthQUNuQjtZQUVELE9BQU8sYUFBYSxDQUFDO1FBQ3pCLENBQUM7UUFoRXVCLGdDQUFRLEdBQTJDLElBQUksR0FBRyxDQUFvQztZQUNsSCxDQUFDLEdBQUcsRUFBRSx3QkFBd0IsQ0FBQyxhQUFhLENBQUM7WUFDN0MsQ0FBQyxHQUFHLEVBQUUsd0JBQXdCLENBQUMsYUFBYSxDQUFDO1lBQzdDLENBQUMsR0FBRyxFQUFFLHdCQUF3QixDQUFDLGVBQWUsQ0FBQztZQUMvQyxDQUFDLEdBQUcsRUFBRSx3QkFBd0IsQ0FBQyxXQUFXLENBQUM7WUFDM0MsQ0FBQyxHQUFHLEVBQUUsd0JBQXdCLENBQUMsWUFBWSxDQUFDO1lBQzVDLENBQUMsR0FBRyxFQUFFLHdCQUF3QixDQUFDLG9CQUFvQixDQUFDO1lBQ3BELENBQUMsR0FBRyxFQUFFLHdCQUF3QixDQUFDLG9CQUFvQixDQUFDO1lBQ3BELENBQUMsR0FBRyxFQUFFLHdCQUF3QixDQUFDLGFBQWEsQ0FBQztZQUM3QyxDQUFDLEdBQUcsRUFBRSx3QkFBd0IsQ0FBQyxrQ0FBa0MsQ0FBQztZQUNsRSxDQUFDLEdBQUcsRUFBRSx3QkFBd0IsQ0FBQyxrQ0FBa0MsQ0FBQztZQUNsRSxDQUFDLEdBQUcsRUFBRSx3QkFBd0IsQ0FBQyxxQkFBcUIsQ0FBQztZQUNyRCxDQUFDLEdBQUcsRUFBRSx3QkFBd0IsQ0FBQyxxQkFBcUIsQ0FBQztTQUN4RCxDQUFDLENBQUM7UUFvRFAsOEJBQUM7S0FBQSxBQW5FRCxJQW1FQztJQW5FWSwwREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJRm9ybWF0U3BlY2lmaWNhdGlvbiB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2UvZm9ybWF0U3BlY2lmaWNhdGlvbkludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGVudW0gRm9ybWF0U3BlY2lmaWNhdGlvblR5cGVze1xyXG4gICAgbm9UeXBlID0gXCJubyB0eXBlXCIsICAgICAgICAgICAgICAgICAgICAgLy8gZGVmYXVsdCB3aGVuIG5vIHR5cGUgaXMgcGFzc2VkXHJcbiAgICBzaWduZWRJbnRlZ2VyID1cImQgby4gaVwiLFxyXG4gICAgdW5zaWduZWRJbnRlZ2VyID0gXCJ1XCIsXHJcbiAgICBiaW5hcnlOdW1iZXI9IFwiYlwiLFxyXG4gICAgb2N0YWxOdW1iZXIgPSBcIm9cIixcclxuICAgIGhleGFkZWNpbWFsTG93ZXJjYXNlID0gXCJ4XCIsXHJcbiAgICBoZXhhZGVjaW1hbFVwcGVyY2FzZSA9IFwiWFwiLFxyXG4gICAgZGVjaW1hbE91dHB1dCA9IFwiZlwiLFxyXG4gICAgc2NpZW50aWZpY0VSZXByZXNlbnRhdGlvbkxvd2VyQ2FzZSA9IFwiZVwiLFxyXG4gICAgc2NpZW50aWZpY0VSZXByZXNlbnRhdGlvblVwcGVyQ2FzZSA9IFwiRVwiLFxyXG4gICAgbGVuZ3RoT3B0aW1pemVkT3V0cHV0ID0gXCJnIG8uIEdcIlxyXG59XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBwcm92aWRlcyBzdGF0aWMgZm9ybWF0U3BlY2lmaWNhdGlvblR5cGUgZnVuY3Rpb25zXHJcbiAqIFxyXG4gKiBAc3RhdGljXHJcbiAqIEBjbGFzcyBGb3JtYXRTcGVjaWZpY2F0aW9uVHlwZVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEZvcm1hdFNwZWNpZmljYXRpb25UeXBle1xyXG4gICAgXHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBfdHlwZU1hcCA6IE1hcDxzdHJpbmcsIEZvcm1hdFNwZWNpZmljYXRpb25UeXBlcz4gPSBuZXcgTWFwIDxzdHJpbmcsIEZvcm1hdFNwZWNpZmljYXRpb25UeXBlcz4oW1xyXG4gICAgICAgIFtcImRcIiwgRm9ybWF0U3BlY2lmaWNhdGlvblR5cGVzLnNpZ25lZEludGVnZXJdLFxyXG4gICAgICAgIFtcImlcIiwgRm9ybWF0U3BlY2lmaWNhdGlvblR5cGVzLnNpZ25lZEludGVnZXJdLFxyXG4gICAgICAgIFtcInVcIiwgRm9ybWF0U3BlY2lmaWNhdGlvblR5cGVzLnVuc2lnbmVkSW50ZWdlcl0sIFxyXG4gICAgICAgIFtcIm9cIiwgRm9ybWF0U3BlY2lmaWNhdGlvblR5cGVzLm9jdGFsTnVtYmVyXSxcclxuICAgICAgICBbXCJiXCIsIEZvcm1hdFNwZWNpZmljYXRpb25UeXBlcy5iaW5hcnlOdW1iZXJdLCBcclxuICAgICAgICBbXCJ4XCIsIEZvcm1hdFNwZWNpZmljYXRpb25UeXBlcy5oZXhhZGVjaW1hbExvd2VyY2FzZV0sXHJcbiAgICAgICAgW1wiWFwiLCBGb3JtYXRTcGVjaWZpY2F0aW9uVHlwZXMuaGV4YWRlY2ltYWxVcHBlcmNhc2VdLCBcclxuICAgICAgICBbXCJmXCIsIEZvcm1hdFNwZWNpZmljYXRpb25UeXBlcy5kZWNpbWFsT3V0cHV0XSxcclxuICAgICAgICBbXCJlXCIsIEZvcm1hdFNwZWNpZmljYXRpb25UeXBlcy5zY2llbnRpZmljRVJlcHJlc2VudGF0aW9uTG93ZXJDYXNlXSxcclxuICAgICAgICBbXCJFXCIsIEZvcm1hdFNwZWNpZmljYXRpb25UeXBlcy5zY2llbnRpZmljRVJlcHJlc2VudGF0aW9uVXBwZXJDYXNlXSxcclxuICAgICAgICBbXCJnXCIsIEZvcm1hdFNwZWNpZmljYXRpb25UeXBlcy5sZW5ndGhPcHRpbWl6ZWRPdXRwdXRdLCAgICAgICAgXHJcbiAgICAgICAgW1wiR1wiLCBGb3JtYXRTcGVjaWZpY2F0aW9uVHlwZXMubGVuZ3RoT3B0aW1pemVkT3V0cHV0XVxyXG4gICAgXSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25zdHJ1Y3RvciBzZXQgdG8gcHJpdmF0ZSBGb3JtYXRTcGVjaWZpY2F0aW9uVHlwZSBjbGFzcyBzaG91bGQgb25seSBwcm92aWRlIHN0YXRpYyBmdW5jdGlvbnMuXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEZvcm1hdFNwZWNpZmljYXRpb25UeXBlLlxyXG4gICAgICogQG1lbWJlcm9mIEZvcm1hdFNwZWNpZmljYXRpb25UeXBlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGlmIHRoZSB0eXBlIHN0cmluZyBtYXRjaCB0byBhbiBJRm9ybWF0U3BlY2lmaWNhdGlvblR5cGUgYW5kIHJldHVybnMgdGhhdFxyXG4gICAgICogSWYgdGhlcmUgaXMgbm8gdGhlIElGb3JtYXRTcGVjaWZhY3Rpb24udHlwZSBpcyBzZXQgdG8gdW5kZWZpbmVkIFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7SUZvcm1hdFNwZWNpZmljYXRpb259IGZvcm1hdFNwZWNpZmljYXRpb25cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXHJcbiAgICAgKiBAcmV0dXJuIHtJRm9ybWF0U3BlY2lmaWNhdGlvbn1cclxuICAgICAqIEBtZW1iZXJvZiBGb3JtYXRTcGVjaWZpY2F0aW9uVHlwZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEZvcm1hdFNwZWNpZmljYXRpb25UeXBlKGZvcm1hdFNwZWNpZmljYXRpb246IElGb3JtYXRTcGVjaWZpY2F0aW9uLCB0eXBlOiBzdHJpbmcpIDogSUZvcm1hdFNwZWNpZmljYXRpb24geyAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICAvLyBnZXQgdGhlIHR5cGUgb3IgdW5kZWZpbmVkXHJcbiAgICAgICAgbGV0IGZvcm1hdFNwZWNpZmljYXRpb25UeXBlOiBGb3JtYXRTcGVjaWZpY2F0aW9uVHlwZXMgfCB1bmRlZmluZWQgPSB0aGlzLl90eXBlTWFwLmdldCh0eXBlKTtcclxuXHJcbiAgICAgICAgaWYoZm9ybWF0U3BlY2lmaWNhdGlvblR5cGUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBmb3JtYXRTcGVjaWZpY2F0aW9uVHlwZSA9IEZvcm1hdFNwZWNpZmljYXRpb25UeXBlcy5ub1R5cGU7XHJcbiAgICAgICAgfSBcclxuXHJcbiAgICAgICAgZm9ybWF0U3BlY2lmaWNhdGlvbi50eXBlID0gZm9ybWF0U3BlY2lmaWNhdGlvblR5cGU7XHJcblxyXG4gICAgICAgIHJldHVybiBmb3JtYXRTcGVjaWZpY2F0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBlaXRoZXIgdGhlIHBvc2l0aW9uIGZyb20gdGhlIHRleHRGb3JtYXRTcGVjaWZpY2F0aW9uIGJlZm9yZSB0aGUgdHlwZSBpbmZvcm1hdGlvblxyXG4gICAgICogb3IgdGhlIGxhc3QgcG9zaXRpb24gb2YgdGhlIHN0cmluZyB3aGVuIHRoZXJlIGlzIG5vIHR5cGVcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dEZvcm1hdFNwZWNpZmljYXRpb25cclxuICAgICAqIEByZXR1cm4geyp9ICB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIEZvcm1hdFNwZWNpZmljYXRpb25UeXBlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0VHlwZVNlcGVyYXRvcih0ZXh0Rm9ybWF0U3BlY2lmaWNhdGlvbjogc3RyaW5nKSA6IG51bWJlciB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHR5cGVTZXBlcmF0b3I6IG51bWJlciA9IHRleHRGb3JtYXRTcGVjaWZpY2F0aW9uLmxlbmd0aC0xO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuX3R5cGVNYXAuZ2V0KHRleHRGb3JtYXRTcGVjaWZpY2F0aW9uW3R5cGVTZXBlcmF0b3JdKSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICsrdHlwZVNlcGVyYXRvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0eXBlU2VwZXJhdG9yO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==