define(["require", "exports", "../interface/formatterInputArgumentInterface", "../errorHandling/textSystemErrorTypes", "./formatItemIdentifier", "./formatSpecification/formatSpecification", "./formatSpecification/formatSpecificationFlag", "./formatSpecification/formatSpecificationPrecision", "./formatSpecification/formatSpecificationType", "./formatSpecification/formatSpecificationWidth", "./formatter/baseFormatterHelper", "./formatterInputArguments/formatterInputArgumentString"], function (require, exports, formatterInputArgumentInterface_1, textSystemErrorTypes_1, formatItemIdentifier_1, formatSpecification_1, formatSpecificationFlag_1, formatSpecificationPrecision_1, formatSpecificationType_1, formatSpecificationWidth_1, baseFormatterHelper_1, formatterInputArgumentString_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * This class provides static string editation functions needed for the formatter
     *
     * @static
     * @class EditStringHelper
     */
    var EditStringHelper = /** @class */ (function () {
        /**
         * Constructor set to private string edit class should only provide static functions.
         * Creates an instance of EditStringHelper.
         * @memberof EditStringHelper
         */
        function EditStringHelper() {
        }
        ;
        /**
         * Get a formatspecification type from text
         *
         * @param {string} textFormatSpecification
         * @param  {FormatterInputArgumentList | undefined} argumentList
         * @return {IFormatSpecification}
         * @memberof IFormatSpecification
         */
        EditStringHelper.getFormatSpecificationFromText = function (textFormatSpecification, argumentList) {
            var formatSpecification = new formatSpecification_1.FormatSpecification();
            // adapt the string in case of a width reference ("*")
            textFormatSpecification = this.includeWidthReference(textFormatSpecification, argumentList);
            // get type -> type is always on last position of the formatSpecification
            formatSpecification = formatSpecificationType_1.FormatSpecificationType.getFormatSpecificationType(formatSpecification, textFormatSpecification[textFormatSpecification.length - 1]);
            // get flags -> flags are always in the front of the formatSpecification
            formatSpecification = formatSpecificationFlag_1.FormatSpecificationFlag.getFormatSpecificationFlag(formatSpecification, textFormatSpecification);
            // get precision -> precision is always after "."
            formatSpecification = formatSpecificationPrecision_1.FormatSpecificationPrecision.getFormatSpecificationPrecision(formatSpecification, textFormatSpecification, argumentList);
            // get width -> if there is a "." then the width is till then, else till the end of the string without the possible type
            formatSpecification = formatSpecificationWidth_1.FormatSpecificationWidth.getFormatSpecificationWidth(formatSpecification, textFormatSpecification);
            return formatSpecification;
        };
        /**
         * Format item {1|*2} specifies that the first argument (source) should
         * be output with at least the number of characters specified in the second argument.
         * Entering a negative value, e.g. -30, results in left-aligned output with at least 30 characters.
         * Conseqently this function should adapt the foramtspecificationtext before flag and width get interpreted.
         *
         * @private
         * @static
         * @param {string} textFormatSpecification
         * @param {number} endIndex
         * @param {FormatterInputArgumentList | undefined} argumentList
         * @return {*}  {string}
         * @memberof EditStringHelper
         */
        EditStringHelper.includeWidthReference = function (textFormatSpecification, argumentList) {
            // get position of width reference "*"
            var indexOfFormatSpecificationWidthReference = textFormatSpecification.indexOf(formatItemIdentifier_1.FormatItemIdentifier.formatSpecificationReference);
            // if there is no width reference "*", or the index shows a precision reference ".*", then return the same formatSpecification
            if (!this.indexIsValid(indexOfFormatSpecificationWidthReference) || textFormatSpecification[indexOfFormatSpecificationWidthReference - 1] === formatItemIdentifier_1.FormatItemIdentifier.formatSpecificationPrecision) {
                return textFormatSpecification;
            }
            // get the string with the included width reference information
            var endIndex = formatSpecificationWidth_1.FormatSpecificationWidth.getWidthSeperator(textFormatSpecification);
            var widthReferenceItem = textFormatSpecification.substring(indexOfFormatSpecificationWidthReference + 1, endIndex);
            // get the referenced item, when sth wents wrong the widthReferenceItem is replaced
            var referencedWidthArg = this.getReferencedIntArgumentValueFromText(widthReferenceItem, argumentList);
            widthReferenceItem = referencedWidthArg.argument.toString();
            // replace the referenced item by the input argument in the formatSpecification string 
            return textFormatSpecification.substring(0, indexOfFormatSpecificationWidthReference) + widthReferenceItem + textFormatSpecification.substring(endIndex, textFormatSpecification.length);
        };
        /**
         * Get the referenced integer input argument of the argument list for formatSpecification precision or width
         * If sth went wrong an empty string argument is returned
         *
         * @static
         * @param {string} dataSource
         * @param {FormatterInputArgumentList | undefined} argumentList
         * @return {*}  {IFormatterInputArgument}
         * @memberof EditStringHelper
         */
        EditStringHelper.getReferencedIntArgumentValueFromText = function (dataSource, argumentList) {
            var referencedInputArg;
            var checkedInputArgument = EditStringHelper.getInputArgumentFromText(dataSource, argumentList);
            // check if the referenced argument is from type integer
            if (checkedInputArgument.error === 0 && checkedInputArgument.inputArgument.inputType === formatterInputArgumentInterface_1.FormatterArgumentTypes.Integer) {
                referencedInputArg = checkedInputArgument.inputArgument;
            }
            else {
                referencedInputArg = new formatterInputArgumentString_1.FormatterInputArgumentString("");
            }
            return referencedInputArg;
        };
        /**
         * The function receives a string and convert it to an index for the passed argument list.
         * If the index is accessed succesfully the input argument is returned
         * If sth went wrong, an error is set and the input argument is an empty string argument
         *
         * @private
         * @static
         * @param {string} dataSource
         * @param {FormatterInputArgumentList | undefined} argumentList
         * @return {*}  {CheckedInputArgument}
         * @memberof EditStringHelper
         */
        EditStringHelper.getInputArgumentFromText = function (dataSource, argumentList) {
            // declaring default values
            var checkedInputArgument = {
                inputArgument: new formatterInputArgumentString_1.FormatterInputArgumentString(""),
                error: 0
            };
            // check if there is a argumentlist
            if (argumentList === undefined) {
                checkedInputArgument.error = textSystemErrorTypes_1.TextSystemErrorTypes.NoPassedArgumentlist;
            }
            else {
                var index = baseFormatterHelper_1.BaseFormatterHelper.parseStringToInt(dataSource);
                var inputArgument = argumentList.get(index);
                // check if an input argument is found
                if (inputArgument !== undefined) {
                    checkedInputArgument.inputArgument = inputArgument;
                }
                else {
                    checkedInputArgument.error = textSystemErrorTypes_1.TextSystemErrorTypes.InvalidIndexForArgumentList;
                }
            }
            return checkedInputArgument;
        };
        /**
         * The String.indexOf(symbol) function returns -1 in case that no symbol is found
         * Because of that this function checks if the index is valid or not
         *
         * @static
         * @param {number} index
         * @return {*}  {boolean}
         * @memberof EditStringHelper
         */
        EditStringHelper.indexIsValid = function (index) {
            if (index === -1) {
                return false;
            }
            return true;
        };
        return EditStringHelper;
    }());
    exports.EditStringHelper = EditStringHelper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdFN0cmluZ0hlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3RleHRQcm92aWRlci90ZXh0Rm9ybWF0dGVyL2VkaXRTdHJpbmdIZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBd0JBOzs7OztPQUtHO0lBQ0Y7UUFFRzs7OztXQUlHO1FBQ0g7UUFBdUIsQ0FBQztRQUFBLENBQUM7UUFFekI7Ozs7Ozs7V0FPRztRQUNXLCtDQUE4QixHQUE1QyxVQUE2Qyx1QkFBK0IsRUFBRyxZQUF5QztZQUVwSCxJQUFJLG1CQUFtQixHQUF5QixJQUFJLHlDQUFtQixFQUFFLENBQUM7WUFFMUUsc0RBQXNEO1lBQ3RELHVCQUF1QixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyx1QkFBdUIsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUU1Rix5RUFBeUU7WUFDekUsbUJBQW1CLEdBQUcsaURBQXVCLENBQUMsMEJBQTBCLENBQUMsbUJBQW1CLEVBQUUsdUJBQXVCLENBQUMsdUJBQXVCLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFekosd0VBQXdFO1lBQ3hFLG1CQUFtQixHQUFHLGlEQUF1QixDQUFDLDBCQUEwQixDQUFDLG1CQUFtQixFQUFFLHVCQUF1QixDQUFDLENBQUM7WUFFdkgsaURBQWlEO1lBQ2pELG1CQUFtQixHQUFHLDJEQUE0QixDQUFDLCtCQUErQixDQUFDLG1CQUFtQixFQUFFLHVCQUF1QixFQUFFLFlBQVksQ0FBQyxDQUFDO1lBRS9JLHdIQUF3SDtZQUN4SCxtQkFBbUIsR0FBRyxtREFBd0IsQ0FBQywyQkFBMkIsQ0FBQyxtQkFBbUIsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO1lBRXpILE9BQU8sbUJBQW1CLENBQUM7UUFDL0IsQ0FBQztRQUVEOzs7Ozs7Ozs7Ozs7O1dBYUc7UUFDWSxzQ0FBcUIsR0FBcEMsVUFBcUMsdUJBQStCLEVBQUUsWUFB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Q0FBQzthQUNoQjtZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDTCx1QkFBQztJQUFELENBQUMsQUE1SkEsSUE0SkE7SUE1SmEsNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUZvcm1hdFNwZWNpZmljYXRpb24gfSBmcm9tIFwiLi4vaW50ZXJmYWNlL2Zvcm1hdFNwZWNpZmljYXRpb25JbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgRm9ybWF0dGVyQXJndW1lbnRUeXBlcywgSUZvcm1hdHRlcklucHV0QXJndW1lbnQgfSBmcm9tIFwiLi4vaW50ZXJmYWNlL2Zvcm1hdHRlcklucHV0QXJndW1lbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVGV4dFN5c3RlbUVycm9yVHlwZXMgfSBmcm9tIFwiLi4vZXJyb3JIYW5kbGluZy90ZXh0U3lzdGVtRXJyb3JUeXBlc1wiO1xyXG5pbXBvcnQgeyBGb3JtYXRJdGVtSWRlbnRpZmllciB9IGZyb20gXCIuL2Zvcm1hdEl0ZW1JZGVudGlmaWVyXCI7XHJcbmltcG9ydCB7IEZvcm1hdFNwZWNpZmljYXRpb24gfSBmcm9tIFwiLi9mb3JtYXRTcGVjaWZpY2F0aW9uL2Zvcm1hdFNwZWNpZmljYXRpb25cIjtcclxuaW1wb3J0IHsgRm9ybWF0U3BlY2lmaWNhdGlvbkZsYWcgfSBmcm9tIFwiLi9mb3JtYXRTcGVjaWZpY2F0aW9uL2Zvcm1hdFNwZWNpZmljYXRpb25GbGFnXCI7XHJcbmltcG9ydCB7IEZvcm1hdFNwZWNpZmljYXRpb25QcmVjaXNpb24gfSBmcm9tIFwiLi9mb3JtYXRTcGVjaWZpY2F0aW9uL2Zvcm1hdFNwZWNpZmljYXRpb25QcmVjaXNpb25cIjtcclxuaW1wb3J0IHsgRm9ybWF0U3BlY2lmaWNhdGlvblR5cGUgfSBmcm9tIFwiLi9mb3JtYXRTcGVjaWZpY2F0aW9uL2Zvcm1hdFNwZWNpZmljYXRpb25UeXBlXCI7XHJcbmltcG9ydCB7IEZvcm1hdFNwZWNpZmljYXRpb25XaWR0aCB9IGZyb20gXCIuL2Zvcm1hdFNwZWNpZmljYXRpb24vZm9ybWF0U3BlY2lmaWNhdGlvbldpZHRoXCI7XHJcbmltcG9ydCB7IEJhc2VGb3JtYXR0ZXJIZWxwZXIgfSBmcm9tIFwiLi9mb3JtYXR0ZXIvYmFzZUZvcm1hdHRlckhlbHBlclwiO1xyXG5pbXBvcnQgeyBGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50TGlzdCB9IGZyb20gXCIuL2Zvcm1hdHRlcklucHV0QXJndW1lbnRzL2Zvcm1hdHRlcklucHV0QXJndW1lbnRMaXN0XCI7XHJcbmltcG9ydCB7IEZvcm1hdHRlcklucHV0QXJndW1lbnRTdHJpbmcgfSBmcm9tIFwiLi9mb3JtYXR0ZXJJbnB1dEFyZ3VtZW50cy9mb3JtYXR0ZXJJbnB1dEFyZ3VtZW50U3RyaW5nXCI7XHJcblxyXG4vKipcclxuICogUmV0dXJuIHR5cGUgZm9yIG9jY3VyZWQgZXJyb3JzIGluIGZ1bmN0aW9uc1xyXG4gKiBcclxuICogQHBhcmFtIHtUZXh0U3lzdGVtRXJyb3JUeXBlc30gaW5wdXRBcmd1bWVudCBcclxuICogQHBhcmFtIHtUZXh0U3lzdGVtRXJyb3JUeXBlc30gZXJyb3IgLy8gTm8gZXJyb3IgPSAwIFxyXG4gKi9cclxuZXhwb3J0IHR5cGUgQ2hlY2tlZElucHV0QXJndW1lbnQgPSB7XHJcbiAgICBpbnB1dEFyZ3VtZW50OiBJRm9ybWF0dGVySW5wdXRBcmd1bWVudCwgXHJcbiAgICBlcnJvcjogVGV4dFN5c3RlbUVycm9yVHlwZXMgXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIHByb3ZpZGVzIHN0YXRpYyBzdHJpbmcgZWRpdGF0aW9uIGZ1bmN0aW9ucyBuZWVkZWQgZm9yIHRoZSBmb3JtYXR0ZXJcclxuICogXHJcbiAqIEBzdGF0aWNcclxuICogQGNsYXNzIEVkaXRTdHJpbmdIZWxwZXJcclxuICovXHJcbiBleHBvcnQgY2xhc3MgRWRpdFN0cmluZ0hlbHBlcntcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25zdHJ1Y3RvciBzZXQgdG8gcHJpdmF0ZSBzdHJpbmcgZWRpdCBjbGFzcyBzaG91bGQgb25seSBwcm92aWRlIHN0YXRpYyBmdW5jdGlvbnMuXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEVkaXRTdHJpbmdIZWxwZXIuXHJcbiAgICAgKiBAbWVtYmVyb2YgRWRpdFN0cmluZ0hlbHBlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge307XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgYSBmb3JtYXRzcGVjaWZpY2F0aW9uIHR5cGUgZnJvbSB0ZXh0IFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0Rm9ybWF0U3BlY2lmaWNhdGlvblxyXG4gICAgICogQHBhcmFtICB7Rm9ybWF0dGVySW5wdXRBcmd1bWVudExpc3QgfCB1bmRlZmluZWR9IGFyZ3VtZW50TGlzdFxyXG4gICAgICogQHJldHVybiB7SUZvcm1hdFNwZWNpZmljYXRpb259XHJcbiAgICAgKiBAbWVtYmVyb2YgSUZvcm1hdFNwZWNpZmljYXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRGb3JtYXRTcGVjaWZpY2F0aW9uRnJvbVRleHQodGV4dEZvcm1hdFNwZWNpZmljYXRpb246IHN0cmluZywgIGFyZ3VtZW50TGlzdD86IEZvcm1hdHRlcklucHV0QXJndW1lbnRMaXN0KSA6IElGb3JtYXRTcGVjaWZpY2F0aW9uIHtcclxuICAgICAgICAgXHJcbiAgICAgICAgbGV0IGZvcm1hdFNwZWNpZmljYXRpb246IElGb3JtYXRTcGVjaWZpY2F0aW9uID0gbmV3IEZvcm1hdFNwZWNpZmljYXRpb24oKTtcclxuXHJcbiAgICAgICAgLy8gYWRhcHQgdGhlIHN0cmluZyBpbiBjYXNlIG9mIGEgd2lkdGggcmVmZXJlbmNlIChcIipcIilcclxuICAgICAgICB0ZXh0Rm9ybWF0U3BlY2lmaWNhdGlvbiA9IHRoaXMuaW5jbHVkZVdpZHRoUmVmZXJlbmNlKHRleHRGb3JtYXRTcGVjaWZpY2F0aW9uLCBhcmd1bWVudExpc3QpO1xyXG5cclxuICAgICAgICAvLyBnZXQgdHlwZSAtPiB0eXBlIGlzIGFsd2F5cyBvbiBsYXN0IHBvc2l0aW9uIG9mIHRoZSBmb3JtYXRTcGVjaWZpY2F0aW9uXHJcbiAgICAgICAgZm9ybWF0U3BlY2lmaWNhdGlvbiA9IEZvcm1hdFNwZWNpZmljYXRpb25UeXBlLmdldEZvcm1hdFNwZWNpZmljYXRpb25UeXBlKGZvcm1hdFNwZWNpZmljYXRpb24sIHRleHRGb3JtYXRTcGVjaWZpY2F0aW9uW3RleHRGb3JtYXRTcGVjaWZpY2F0aW9uLmxlbmd0aC0xXSk7XHJcblxyXG4gICAgICAgIC8vIGdldCBmbGFncyAtPiBmbGFncyBhcmUgYWx3YXlzIGluIHRoZSBmcm9udCBvZiB0aGUgZm9ybWF0U3BlY2lmaWNhdGlvblxyXG4gICAgICAgIGZvcm1hdFNwZWNpZmljYXRpb24gPSBGb3JtYXRTcGVjaWZpY2F0aW9uRmxhZy5nZXRGb3JtYXRTcGVjaWZpY2F0aW9uRmxhZyhmb3JtYXRTcGVjaWZpY2F0aW9uLCB0ZXh0Rm9ybWF0U3BlY2lmaWNhdGlvbik7XHJcblxyXG4gICAgICAgIC8vIGdldCBwcmVjaXNpb24gLT4gcHJlY2lzaW9uIGlzIGFsd2F5cyBhZnRlciBcIi5cIlxyXG4gICAgICAgIGZvcm1hdFNwZWNpZmljYXRpb24gPSBGb3JtYXRTcGVjaWZpY2F0aW9uUHJlY2lzaW9uLmdldEZvcm1hdFNwZWNpZmljYXRpb25QcmVjaXNpb24oZm9ybWF0U3BlY2lmaWNhdGlvbiwgdGV4dEZvcm1hdFNwZWNpZmljYXRpb24sIGFyZ3VtZW50TGlzdCk7XHJcbiBcclxuICAgICAgICAvLyBnZXQgd2lkdGggLT4gaWYgdGhlcmUgaXMgYSBcIi5cIiB0aGVuIHRoZSB3aWR0aCBpcyB0aWxsIHRoZW4sIGVsc2UgdGlsbCB0aGUgZW5kIG9mIHRoZSBzdHJpbmcgd2l0aG91dCB0aGUgcG9zc2libGUgdHlwZVxyXG4gICAgICAgIGZvcm1hdFNwZWNpZmljYXRpb24gPSBGb3JtYXRTcGVjaWZpY2F0aW9uV2lkdGguZ2V0Rm9ybWF0U3BlY2lmaWNhdGlvbldpZHRoKGZvcm1hdFNwZWNpZmljYXRpb24sIHRleHRGb3JtYXRTcGVjaWZpY2F0aW9uKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZvcm1hdFNwZWNpZmljYXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGb3JtYXQgaXRlbSB7MXwqMn0gc3BlY2lmaWVzIHRoYXQgdGhlIGZpcnN0IGFyZ3VtZW50IChzb3VyY2UpIHNob3VsZCBcclxuICAgICAqIGJlIG91dHB1dCB3aXRoIGF0IGxlYXN0IHRoZSBudW1iZXIgb2YgY2hhcmFjdGVycyBzcGVjaWZpZWQgaW4gdGhlIHNlY29uZCBhcmd1bWVudC4gXHJcbiAgICAgKiBFbnRlcmluZyBhIG5lZ2F0aXZlIHZhbHVlLCBlLmcuIC0zMCwgcmVzdWx0cyBpbiBsZWZ0LWFsaWduZWQgb3V0cHV0IHdpdGggYXQgbGVhc3QgMzAgY2hhcmFjdGVycy5cclxuICAgICAqIENvbnNlcWVudGx5IHRoaXMgZnVuY3Rpb24gc2hvdWxkIGFkYXB0IHRoZSBmb3JhbXRzcGVjaWZpY2F0aW9udGV4dCBiZWZvcmUgZmxhZyBhbmQgd2lkdGggZ2V0IGludGVycHJldGVkLlxyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRGb3JtYXRTcGVjaWZpY2F0aW9uXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZW5kSW5kZXhcclxuICAgICAqIEBwYXJhbSB7Rm9ybWF0dGVySW5wdXRBcmd1bWVudExpc3QgfCB1bmRlZmluZWR9IGFyZ3VtZW50TGlzdFxyXG4gICAgICogQHJldHVybiB7Kn0gIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgRWRpdFN0cmluZ0hlbHBlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpbmNsdWRlV2lkdGhSZWZlcmVuY2UodGV4dEZvcm1hdFNwZWNpZmljYXRpb246IHN0cmluZywgYXJndW1lbnRMaXN0PzogRm9ybWF0dGVySW5wdXRBcmd1bWVudExpc3QpOiBzdHJpbmcge1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgLy8gZ2V0IHBvc2l0aW9uIG9mIHdpZHRoIHJlZmVyZW5jZSBcIipcIlxyXG4gICAgICAgIGxldCBpbmRleE9mRm9ybWF0U3BlY2lmaWNhdGlvbldpZHRoUmVmZXJlbmNlOiBudW1iZXIgPSB0ZXh0Rm9ybWF0U3BlY2lmaWNhdGlvbi5pbmRleE9mKEZvcm1hdEl0ZW1JZGVudGlmaWVyLmZvcm1hdFNwZWNpZmljYXRpb25SZWZlcmVuY2UpO1xyXG4gICAgICAgIC8vIGlmIHRoZXJlIGlzIG5vIHdpZHRoIHJlZmVyZW5jZSBcIipcIiwgb3IgdGhlIGluZGV4IHNob3dzIGEgcHJlY2lzaW9uIHJlZmVyZW5jZSBcIi4qXCIsIHRoZW4gcmV0dXJuIHRoZSBzYW1lIGZvcm1hdFNwZWNpZmljYXRpb25cclxuICAgICAgICBpZighdGhpcy5pbmRleElzVmFsaWQoaW5kZXhPZkZvcm1hdFNwZWNpZmljYXRpb25XaWR0aFJlZmVyZW5jZSkgfHwgdGV4dEZvcm1hdFNwZWNpZmljYXRpb25baW5kZXhPZkZvcm1hdFNwZWNpZmljYXRpb25XaWR0aFJlZmVyZW5jZS0xXSA9PT0gRm9ybWF0SXRlbUlkZW50aWZpZXIuZm9ybWF0U3BlY2lmaWNhdGlvblByZWNpc2lvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGV4dEZvcm1hdFNwZWNpZmljYXRpb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBnZXQgdGhlIHN0cmluZyB3aXRoIHRoZSBpbmNsdWRlZCB3aWR0aCByZWZlcmVuY2UgaW5mb3JtYXRpb25cclxuICAgICAgICBsZXQgZW5kSW5kZXg6IG51bWJlciA9IEZvcm1hdFNwZWNpZmljYXRpb25XaWR0aC5nZXRXaWR0aFNlcGVyYXRvcih0ZXh0Rm9ybWF0U3BlY2lmaWNhdGlvbik7IFxyXG4gICAgICAgIGxldCB3aWR0aFJlZmVyZW5jZUl0ZW06IHN0cmluZyA9IHRleHRGb3JtYXRTcGVjaWZpY2F0aW9uLnN1YnN0cmluZyhpbmRleE9mRm9ybWF0U3BlY2lmaWNhdGlvbldpZHRoUmVmZXJlbmNlKzEsIGVuZEluZGV4KTtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSByZWZlcmVuY2VkIGl0ZW0sIHdoZW4gc3RoIHdlbnRzIHdyb25nIHRoZSB3aWR0aFJlZmVyZW5jZUl0ZW0gaXMgcmVwbGFjZWRcclxuICAgICAgICBsZXQgcmVmZXJlbmNlZFdpZHRoQXJnOiBJRm9ybWF0dGVySW5wdXRBcmd1bWVudCA9IHRoaXMuZ2V0UmVmZXJlbmNlZEludEFyZ3VtZW50VmFsdWVGcm9tVGV4dCh3aWR0aFJlZmVyZW5jZUl0ZW0sIGFyZ3VtZW50TGlzdCk7ICAgICAgIFxyXG4gICAgICAgIHdpZHRoUmVmZXJlbmNlSXRlbSA9IHJlZmVyZW5jZWRXaWR0aEFyZy5hcmd1bWVudC50b1N0cmluZygpO1xyXG5cclxuICAgICAgICAvLyByZXBsYWNlIHRoZSByZWZlcmVuY2VkIGl0ZW0gYnkgdGhlIGlucHV0IGFyZ3VtZW50IGluIHRoZSBmb3JtYXRTcGVjaWZpY2F0aW9uIHN0cmluZyBcclxuICAgICAgICByZXR1cm4gdGV4dEZvcm1hdFNwZWNpZmljYXRpb24uc3Vic3RyaW5nKDAsIGluZGV4T2ZGb3JtYXRTcGVjaWZpY2F0aW9uV2lkdGhSZWZlcmVuY2UpICsgd2lkdGhSZWZlcmVuY2VJdGVtICsgdGV4dEZvcm1hdFNwZWNpZmljYXRpb24uc3Vic3RyaW5nKGVuZEluZGV4LCB0ZXh0Rm9ybWF0U3BlY2lmaWNhdGlvbi5sZW5ndGgpO1xyXG4gICAgfSAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIHJlZmVyZW5jZWQgaW50ZWdlciBpbnB1dCBhcmd1bWVudCBvZiB0aGUgYXJndW1lbnQgbGlzdCBmb3IgZm9ybWF0U3BlY2lmaWNhdGlvbiBwcmVjaXNpb24gb3Igd2lkdGhcclxuICAgICAqIElmIHN0aCB3ZW50IHdyb25nIGFuIGVtcHR5IHN0cmluZyBhcmd1bWVudCBpcyByZXR1cm5lZFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhU291cmNlXHJcbiAgICAgKiBAcGFyYW0ge0Zvcm1hdHRlcklucHV0QXJndW1lbnRMaXN0IHwgdW5kZWZpbmVkfSBhcmd1bWVudExpc3RcclxuICAgICAqIEByZXR1cm4geyp9ICB7SUZvcm1hdHRlcklucHV0QXJndW1lbnR9XHJcbiAgICAgKiBAbWVtYmVyb2YgRWRpdFN0cmluZ0hlbHBlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFJlZmVyZW5jZWRJbnRBcmd1bWVudFZhbHVlRnJvbVRleHQoZGF0YVNvdXJjZTogc3RyaW5nLCBhcmd1bWVudExpc3Q/OiBGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50TGlzdCk6IElGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50IHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgcmVmZXJlbmNlZElucHV0QXJnOiBJRm9ybWF0dGVySW5wdXRBcmd1bWVudDtcclxuXHJcbiAgICAgICAgbGV0IGNoZWNrZWRJbnB1dEFyZ3VtZW50OiBDaGVja2VkSW5wdXRBcmd1bWVudCA9ICBFZGl0U3RyaW5nSGVscGVyLmdldElucHV0QXJndW1lbnRGcm9tVGV4dChkYXRhU291cmNlLCBhcmd1bWVudExpc3QpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZSByZWZlcmVuY2VkIGFyZ3VtZW50IGlzIGZyb20gdHlwZSBpbnRlZ2VyXHJcbiAgICAgICAgaWYoY2hlY2tlZElucHV0QXJndW1lbnQuZXJyb3IgPT09IDAgJiYgY2hlY2tlZElucHV0QXJndW1lbnQuaW5wdXRBcmd1bWVudC5pbnB1dFR5cGUgPT09IEZvcm1hdHRlckFyZ3VtZW50VHlwZXMuSW50ZWdlcikge1xyXG4gICAgICAgICAgICByZWZlcmVuY2VkSW5wdXRBcmcgPSBjaGVja2VkSW5wdXRBcmd1bWVudC5pbnB1dEFyZ3VtZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmVmZXJlbmNlZElucHV0QXJnID0gbmV3IEZvcm1hdHRlcklucHV0QXJndW1lbnRTdHJpbmcoXCJcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVmZXJlbmNlZElucHV0QXJnO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZnVuY3Rpb24gcmVjZWl2ZXMgYSBzdHJpbmcgYW5kIGNvbnZlcnQgaXQgdG8gYW4gaW5kZXggZm9yIHRoZSBwYXNzZWQgYXJndW1lbnQgbGlzdC5cclxuICAgICAqIElmIHRoZSBpbmRleCBpcyBhY2Nlc3NlZCBzdWNjZXNmdWxseSB0aGUgaW5wdXQgYXJndW1lbnQgaXMgcmV0dXJuZWRcclxuICAgICAqIElmIHN0aCB3ZW50IHdyb25nLCBhbiBlcnJvciBpcyBzZXQgYW5kIHRoZSBpbnB1dCBhcmd1bWVudCBpcyBhbiBlbXB0eSBzdHJpbmcgYXJndW1lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRhdGFTb3VyY2VcclxuICAgICAqIEBwYXJhbSB7Rm9ybWF0dGVySW5wdXRBcmd1bWVudExpc3QgfCB1bmRlZmluZWR9IGFyZ3VtZW50TGlzdFxyXG4gICAgICogQHJldHVybiB7Kn0gIHtDaGVja2VkSW5wdXRBcmd1bWVudH1cclxuICAgICAqIEBtZW1iZXJvZiBFZGl0U3RyaW5nSGVscGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5wdXRBcmd1bWVudEZyb21UZXh0KGRhdGFTb3VyY2U6IHN0cmluZywgYXJndW1lbnRMaXN0PzogRm9ybWF0dGVySW5wdXRBcmd1bWVudExpc3QpIDogQ2hlY2tlZElucHV0QXJndW1lbnQge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGRlY2xhcmluZyBkZWZhdWx0IHZhbHVlc1xyXG4gICAgICAgIGxldCBjaGVja2VkSW5wdXRBcmd1bWVudCA6IENoZWNrZWRJbnB1dEFyZ3VtZW50ID0ge1xyXG4gICAgICAgICAgICBpbnB1dEFyZ3VtZW50OiBuZXcgRm9ybWF0dGVySW5wdXRBcmd1bWVudFN0cmluZyhcIlwiKSxcclxuICAgICAgICAgICAgZXJyb3I6IDBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlcmUgaXMgYSBhcmd1bWVudGxpc3RcclxuICAgICAgICBpZihhcmd1bWVudExpc3QgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjaGVja2VkSW5wdXRBcmd1bWVudC5lcnJvciA9IFRleHRTeXN0ZW1FcnJvclR5cGVzLk5vUGFzc2VkQXJndW1lbnRsaXN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGluZGV4OiBudW1iZXIgPSBCYXNlRm9ybWF0dGVySGVscGVyLnBhcnNlU3RyaW5nVG9JbnQoZGF0YVNvdXJjZSk7XHJcbiAgICAgICAgICAgIGxldCBpbnB1dEFyZ3VtZW50OiBJRm9ybWF0dGVySW5wdXRBcmd1bWVudCB8IHVuZGVmaW5lZCA9IGFyZ3VtZW50TGlzdC5nZXQoaW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgYW4gaW5wdXQgYXJndW1lbnQgaXMgZm91bmRcclxuICAgICAgICAgICAgaWYoaW5wdXRBcmd1bWVudCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBjaGVja2VkSW5wdXRBcmd1bWVudC5pbnB1dEFyZ3VtZW50ID0gaW5wdXRBcmd1bWVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNoZWNrZWRJbnB1dEFyZ3VtZW50LmVycm9yID0gVGV4dFN5c3RlbUVycm9yVHlwZXMuSW52YWxpZEluZGV4Rm9yQXJndW1lbnRMaXN0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY2hlY2tlZElucHV0QXJndW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgU3RyaW5nLmluZGV4T2Yoc3ltYm9sKSBmdW5jdGlvbiByZXR1cm5zIC0xIGluIGNhc2UgdGhhdCBubyBzeW1ib2wgaXMgZm91bmRcclxuICAgICAqIEJlY2F1c2Ugb2YgdGhhdCB0aGlzIGZ1bmN0aW9uIGNoZWNrcyBpZiB0aGUgaW5kZXggaXMgdmFsaWQgb3Igbm90XHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XHJcbiAgICAgKiBAcmV0dXJuIHsqfSAge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgRWRpdFN0cmluZ0hlbHBlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGluZGV4SXNWYWxpZChpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYoaW5kZXggPT09IC0xKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn0iXX0=