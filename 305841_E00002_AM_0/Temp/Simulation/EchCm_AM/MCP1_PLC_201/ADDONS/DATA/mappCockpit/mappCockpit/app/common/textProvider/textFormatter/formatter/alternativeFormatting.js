define(["require", "exports", "../formatSpecification/formatSpecificationType"], function (require, exports, formatSpecificationType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * A class for using alternative formats
     *
     * @export
     * @static
     * @class AlternativeFormatting
     */
    var AlternativeFormatting = /** @class */ (function () {
        /**
         * Creates an instance of AlternativeFormatting.
         * @memberof AlternativeFormatting
         */
        function AlternativeFormatting() {
        }
        ;
        /**
         * Gives the opportunity to add specific string inforamtions for a formatspecification type in front of the argument.
         * The spcific string information need to be set in the "alternativeFormattingMap" with the type key first.
         *
         * @private
         * @static
         * @param {FormatSpecificationTypes} type
         * @return {*}  {string}
         * @memberof BaseFormatter
         */
        AlternativeFormatting.get = function (type) {
            // get the specific string for the alterantive formatting 
            var alternativeFormatting = this._alternativeFormattingMap.get(type);
            if (alternativeFormatting === undefined) {
                alternativeFormatting = "";
            }
            return alternativeFormatting;
        };
        /**
         * Mapping formatspecificationtype to strings for an alternative format
         *
         * @private
         * @type {(Map<FormatSpecificationTypes>, string>)}
         * @memberof BaseFormatter
         */
        AlternativeFormatting._alternativeFormattingMap = new Map([
            [formatSpecificationType_1.FormatSpecificationTypes.octalNumber, "0"],
            [formatSpecificationType_1.FormatSpecificationTypes.hexadecimalLowercase, "0x"],
            [formatSpecificationType_1.FormatSpecificationTypes.hexadecimalUppercase, "0X"]
        ]);
        return AlternativeFormatting;
    }());
    exports.AlternativeFormatting = AlternativeFormatting;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWx0ZXJuYXRpdmVGb3JtYXR0aW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vdGV4dFByb3ZpZGVyL3RleHRGb3JtYXR0ZXIvZm9ybWF0dGVyL2FsdGVybmF0aXZlRm9ybWF0dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFFQTs7Ozs7O09BTUc7SUFDSDtRQWVJOzs7V0FHRztRQUNIO1FBQXVCLENBQUM7UUFBQSxDQUFDO1FBRXpCOzs7Ozs7Ozs7V0FTRztRQUNXLHlCQUFHLEdBQWpCLFVBQWtCLElBQThCO1lBRTVDLDBEQUEwRDtZQUMxRCxJQUFJLHFCQUFxQixHQUF1QixJQUFJLENBQUMseUJBQXlCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXpGLElBQUcscUJBQXFCLEtBQUssU0FBUyxFQUFFO2dCQUNwQyxxQkFBcUIsR0FBRyxFQUFFLENBQUM7YUFDOUI7WUFFRCxPQUFPLHFCQUFxQixDQUFDO1FBQ2pDLENBQUM7UUF2Q0Q7Ozs7OztXQU1HO1FBQ3FCLCtDQUF5QixHQUEwQyxJQUFJLEdBQUcsQ0FBbUM7WUFDakksQ0FBQyxrREFBd0IsQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDO1lBQzNDLENBQUMsa0RBQXdCLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDO1lBQ3JELENBQUMsa0RBQXdCLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDO1NBQ3hELENBQUMsQ0FBQztRQTZCUCw0QkFBQztLQUFBLEFBMUNELElBMENDO0lBMUNZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvcm1hdFNwZWNpZmljYXRpb25UeXBlcyB9IGZyb20gXCIuLi9mb3JtYXRTcGVjaWZpY2F0aW9uL2Zvcm1hdFNwZWNpZmljYXRpb25UeXBlXCI7XHJcblxyXG4vKipcclxuICogQSBjbGFzcyBmb3IgdXNpbmcgYWx0ZXJuYXRpdmUgZm9ybWF0c1xyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBzdGF0aWNcclxuICogQGNsYXNzIEFsdGVybmF0aXZlRm9ybWF0dGluZ1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEFsdGVybmF0aXZlRm9ybWF0dGluZyB7XHJcbiAgICAgXHJcbiAgICAvKipcclxuICAgICAqIE1hcHBpbmcgZm9ybWF0c3BlY2lmaWNhdGlvbnR5cGUgdG8gc3RyaW5ncyBmb3IgYW4gYWx0ZXJuYXRpdmUgZm9ybWF0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIHsoTWFwPEZvcm1hdFNwZWNpZmljYXRpb25UeXBlcz4sIHN0cmluZz4pfVxyXG4gICAgICogQG1lbWJlcm9mIEJhc2VGb3JtYXR0ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX2FsdGVybmF0aXZlRm9ybWF0dGluZ01hcDogTWFwPEZvcm1hdFNwZWNpZmljYXRpb25UeXBlcywgc3RyaW5nPiA9IG5ldyBNYXA8Rm9ybWF0U3BlY2lmaWNhdGlvblR5cGVzLCBzdHJpbmc+KFtcclxuICAgICAgICBbRm9ybWF0U3BlY2lmaWNhdGlvblR5cGVzLm9jdGFsTnVtYmVyLCBcIjBcIl0sXHJcbiAgICAgICAgW0Zvcm1hdFNwZWNpZmljYXRpb25UeXBlcy5oZXhhZGVjaW1hbExvd2VyY2FzZSwgXCIweFwiXSxcclxuICAgICAgICBbRm9ybWF0U3BlY2lmaWNhdGlvblR5cGVzLmhleGFkZWNpbWFsVXBwZXJjYXNlLCBcIjBYXCJdXHJcbiAgICBdKTtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEFsdGVybmF0aXZlRm9ybWF0dGluZy5cclxuICAgICAqIEBtZW1iZXJvZiBBbHRlcm5hdGl2ZUZvcm1hdHRpbmdcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHt9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2l2ZXMgdGhlIG9wcG9ydHVuaXR5IHRvIGFkZCBzcGVjaWZpYyBzdHJpbmcgaW5mb3JhbXRpb25zIGZvciBhIGZvcm1hdHNwZWNpZmljYXRpb24gdHlwZSBpbiBmcm9udCBvZiB0aGUgYXJndW1lbnQuXHJcbiAgICAgKiBUaGUgc3BjaWZpYyBzdHJpbmcgaW5mb3JtYXRpb24gbmVlZCB0byBiZSBzZXQgaW4gdGhlIFwiYWx0ZXJuYXRpdmVGb3JtYXR0aW5nTWFwXCIgd2l0aCB0aGUgdHlwZSBrZXkgZmlyc3QuXHJcbiAgICAgKiAgXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtGb3JtYXRTcGVjaWZpY2F0aW9uVHlwZXN9IHR5cGVcclxuICAgICAqIEByZXR1cm4geyp9ICB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIEJhc2VGb3JtYXR0ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQodHlwZTogRm9ybWF0U3BlY2lmaWNhdGlvblR5cGVzKTogc3RyaW5nIHtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBzcGVjaWZpYyBzdHJpbmcgZm9yIHRoZSBhbHRlcmFudGl2ZSBmb3JtYXR0aW5nIFxyXG4gICAgICAgIGxldCBhbHRlcm5hdGl2ZUZvcm1hdHRpbmc6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHRoaXMuX2FsdGVybmF0aXZlRm9ybWF0dGluZ01hcC5nZXQodHlwZSk7XHJcblxyXG4gICAgICAgIGlmKGFsdGVybmF0aXZlRm9ybWF0dGluZyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGFsdGVybmF0aXZlRm9ybWF0dGluZyA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYWx0ZXJuYXRpdmVGb3JtYXR0aW5nO1xyXG4gICAgfVxyXG59Il19