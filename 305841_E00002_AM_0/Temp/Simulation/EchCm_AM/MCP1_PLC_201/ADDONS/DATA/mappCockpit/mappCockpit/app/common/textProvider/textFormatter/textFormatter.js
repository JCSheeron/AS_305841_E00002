define(["require", "exports", "./subFormatterSelector", "./editStringHelper", "./formatItemIdentifier", "./rawTextItem", "./formatItem", "./formatterInputArguments/formatterInputArgumentString", "../errorHandling/textSystemErrorTypes", "../errorHandling/textSystemErrorHandler", "../errorHandling/textSystemErrorItem", "./formatterTextItem"], function (require, exports, subFormatterSelector_1, editStringHelper_1, formatItemIdentifier_1, rawTextItem_1, formatItem_1, formatterInputArgumentString_1, textSystemErrorTypes_1, textSystemErrorHandler_1, textSystemErrorItem_1, formatterTextItem_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Format strings are text templates consisting of UTF-8 text areas and optional format items. When the text is displayed,
     * the respective format items are replaced by text fragments that are generated based on the specified contained in the
     * format item, for example to display measured values from variables, to apply measured values in user-defined event messages
     * or put together strings for displaying in HMI applications. Basic syntax of a format item:
     *
     * {<DataSource>|[<FormatSpecification>]}
     *
     * In other words, format items are delimited by { and } and always contain a data source,
     * which can then be followed by a | (pipe) character and format specification (optional).
     *
     * @static
     * @class TextFormatter
     */
    var TextFormatter = /** @class */ (function () {
        /**
        * Private constructor for initializing a static
        * Creates an instance of TextFormatter.
        * @memberof TextFormatter
        */
        function TextFormatter() {
        }
        /**
        * Call method for using TextFormatter that is connected to the textsystem
        *
        * @param {string} text
        * @param {ITextProvider} textSystemInterface
        * @param {FormatterInputArgumentList | undefined} argumentList
        * @param {*} [languageCode=this._selectedLanguage]
        * @returns {TextItem}
        * @memberof TextFormatter
        */
        TextFormatter.formatText = function (rawText, textSystemInterface, argumentList, languageCode) {
            // Prepare data before starting
            var inputData = new formatterTextItem_1.FormatterTextItem(rawText);
            var formattedText = this.replaceFormatItems(inputData, textSystemInterface, argumentList, languageCode);
            formattedText.value = this.removeDoubleOpeningCurls(formattedText.value);
            return formattedText;
        };
        /**
         * Formatter light for handling formatting without being connected to the textsystem.
         * Resolves format items reffering to the argument list returning the result as string.
         * CANNOT handle dynamically build texts
         * CANNOT handle external data sources
         * DOES NOT include error informations
         *
         * @static
         * @param {string} rawArg
         * @param {FormatterInputArgumentList} argumentList
         * @return {*}  {string}
         * @memberof TextFormatter
         */
        TextFormatter.formatArgument = function (rawArg, argumentList) {
            var formattedArgument = "";
            var rawArgument = new rawTextItem_1.RawTextItem();
            rawArgument.data = rawArg;
            while (rawArgument.containsFurtherFormatItem()) {
                formattedArgument += rawArgument.getTextBeforeFormatItem();
                rawArgument.removeTextBeforeFormatItem();
                // get the the result of the formatting and add it to the allredy formatted data
                formattedArgument += this.processSingleArgument(rawArgument.getFormatItemWithoutCurls(), argumentList);
                rawArgument.removeFormattedText();
            }
            formattedArgument += rawArgument.data;
            formattedArgument = this.removeDoubleOpeningCurls(formattedArgument);
            return formattedArgument;
        };
        /**
         * Change "{{" to "{"
         *
         * @private
         * @static
         * @param {string} text
         * @return {string}
         * @memberof TextFormatter
         */
        TextFormatter.removeDoubleOpeningCurls = function (text) {
            var regex = RegExp(formatItemIdentifier_1.FormatItemIdentifier.next + formatItemIdentifier_1.FormatItemIdentifier.next, 'g');
            return text.replace(regex, formatItemIdentifier_1.FormatItemIdentifier.next);
        };
        /**
         * Resolve the format items of the formatter light
         *
         * @private
         * @static
         * @param {string} rawData
         * @param {FormatterInputArgumentList} argumentList
         * @return {*}  {string}
         * @memberof TextFormatter
         */
        TextFormatter.processSingleArgument = function (rawData, argumentList) {
            var formattedItem = "";
            try {
                // get the format item information {<DataSource>|[<FormatSpecification>]} from raw string
                var formatItem = new formatItem_1.FormatItem(rawData, argumentList);
                // get input Argument from Argument List
                var inputArgument = this.receiveInputArgumentFromArgumentDataSource(formatItem, argumentList);
                // apply format Specification
                formattedItem = subFormatterSelector_1.SubFormatterSelector.formatArgumentItem(inputArgument, formatItem.formatSpecification);
            }
            catch (textSystemError) {
                formattedItem = textSystemError.message;
            }
            return formattedItem;
        };
        /**
         * Search for format items and change the items with the value from data source
         *
         * @private
         * @static
         * @param {FormatterTextItem} data
         * @param {ITextProvider} [textSystemInterface]
         * @param {FormatterInputArgumentList} [argumentList]
         * @param {string} [languageCode]
         * @return {*}  {FormatterTextItem}
         * @memberof TextFormatter
         */
        TextFormatter.replaceFormatItems = function (data, textSystemInterface, argumentList, languageCode) {
            var rawTextItem = new rawTextItem_1.RawTextItem();
            rawTextItem.data = data.value;
            data.value = "";
            // ends if no further format item is found
            while (rawTextItem.containsFurtherFormatItem()) {
                data.value += rawTextItem.getTextBeforeFormatItem();
                rawTextItem.removeTextBeforeFormatItem();
                // if there is a "=", its is an dynamically built format item and "{=" gets removed
                if (rawTextItem.containsRecursiveFormatItem()) {
                    // Recursion: process the inner format items. The before removed "{" need to be added in front again that it gets processed again.
                    var recursiveItem = this.replaceFormatItems(new formatterTextItem_1.FormatterTextItem(rawTextItem.data, data.errors, data.recurisionCnt), textSystemInterface, argumentList, languageCode);
                    // Append the bevor removed "{" on front that the formatted part gets interpreted as format item again
                    rawTextItem.data = formatItemIdentifier_1.FormatItemIdentifier.next + recursiveItem.value;
                    data.errors = recursiveItem.errors;
                    data.recurisionCnt = recursiveItem.recurisionCnt;
                }
                // get the the result of the formatting and add it to the allredy formatted data
                var processedItem = this.processFormatItem(new formatterTextItem_1.FormatterTextItem(rawTextItem.getFormatItemWithoutCurls(), data.errors, data.recurisionCnt), textSystemInterface, argumentList, languageCode);
                data.value += processedItem.value;
                data.errors = processedItem.errors;
                data.recurisionCnt = processedItem.recurisionCnt;
                rawTextItem.removeFormattedText();
            }
            data.value += rawTextItem.data;
            return data;
        };
        /**
         * Get the formatted string of the format item
         *
         * @private
         * @static
         * @param {FormatterTextItem} item
         * @param {ITextProvider} [textSystemInterface]
         * @param {FormatterInputArgumentList} [argumentList]
         * @param {string} [languageCode]
         * @return {*}  {FormatterTextItem}
         * @memberof TextFormatter
         */
        TextFormatter.processFormatItem = function (item, textSystemInterface, argumentList, languageCode) {
            try {
                // get the format item information {<DataSource>|[<FormatSpecification>]} from raw string
                var formatItem = new formatItem_1.FormatItem(item.value, argumentList);
                // receive the input argument for the respective datasource
                var inputArgument = this.receiveInputArgumentFromDataSource(formatItem, textSystemInterface, argumentList, languageCode);
                // apply format Specification
                item.value = subFormatterSelector_1.SubFormatterSelector.formatArgumentItem(inputArgument, formatItem.formatSpecification);
                // In recursive format items the result is checked for inner format items
                item = this.processRecursiveFormatItem(item, formatItem, textSystemInterface, argumentList, languageCode);
            }
            catch (textSystemError) {
                // reset the recursion counter
                item.resetRecurisionCnt();
                // Errors ar only pushed at this place
                item.errors.push(textSystemError.item);
                // The before created errormessage gets shown in the formatted string instead of the format item
                item.value = textSystemError.message;
            }
            return item;
        };
        /**
         * Selects the right datasource and receives the raw input argument
         *
         * @private
         * @static
         * @param {FormatItem} formatItem
         * @param {ITextProvider} [textSystemInterface]
         * @param {FormatterInputArgumentList} [argumentList]
         * @param {string} [languageCode]
         * @return {*}  {IFormatterInputArgument}
         * @memberof TextFormatter
         */
        TextFormatter.receiveInputArgumentFromDataSource = function (formatItem, textSystemInterface, argumentList, languageCode) {
            var inputArgument;
            if (formatItem.dataSourceType === formatItem_1.DataSourceTypes.external) {
                // Remove the external data source identifier ("$") from rawItem and pass it for getting the text from the textsystem
                inputArgument = this.receiveInputArgumentFromExternalDataSource(formatItem, textSystemInterface, languageCode);
            }
            // Else its an argument data source
            else {
                inputArgument = this.receiveInputArgumentFromArgumentDataSource(formatItem, argumentList);
            }
            return inputArgument;
        };
        /**
         * Process the externl data source.
         * Searches recoursive for further format items in the processed string.
         * Can throw Error strings
         *
         * @private
         * @static
         * @param {FormatItem} formatItem
         * @param {ITextProvider} [textSystemInterface]
         * @param {string} [languageCode]
         * @return {*}  {IFormatterInputArgument}
         * @memberof TextFormatter
         */
        TextFormatter.receiveInputArgumentFromExternalDataSource = function (formatItem, textSystemInterface, languageCode) {
            // check if there is a textsystem instance
            if (textSystemInterface === undefined) {
                var errorMessage = textSystemErrorHandler_1.TextSystemErrorHandler.getErrorMessageBySource(textSystemErrorTypes_1.TextSystemErrorTypes.CouldNotOpenTextDatabase, formatItem.dataSource);
                textSystemErrorHandler_1.TextSystemErrorHandler.throwFormatterErrors(errorMessage, new textSystemErrorItem_1.TextSystemErrorItem(textSystemErrorTypes_1.TextSystemErrorTypes.CouldNotOpenTextDatabase));
            }
            // Get TextItem from textsystem
            var textItem = textSystemInterface.getRawTextByFullyQualifiedTextId(formatItem.dataSource, languageCode);
            var formattedItem = textItem.value;
            // Wenn Fehler aufgetreten sind werden diese in den errorContainer gepusht und eine exeption wird geworfen
            if (!textItem.isValid()) {
                textSystemErrorHandler_1.TextSystemErrorHandler.throwFormatterErrors(formattedItem, textItem.errors[0]);
            }
            // convert the received string in database to FormatterInputArgumentString
            var inputArgument = new formatterInputArgumentString_1.FormatterInputArgumentString(formattedItem);
            return inputArgument;
        };
        /**
         * Process the argument data source
         * Can throw Error strings
         *
         * @private
         * @static
         * @param {FormatItem} formatItem
         * @param {FormatterInputArgumentList} [argumentList]
         * @return {*}  {IFormatterInputArgument}
         * @memberof TextFormatter
         */
        TextFormatter.receiveInputArgumentFromArgumentDataSource = function (formatItem, argumentList) {
            var checkedInputArgument = editStringHelper_1.EditStringHelper.getInputArgumentFromText(formatItem.dataSource, argumentList);
            if (checkedInputArgument.error !== 0) {
                textSystemErrorHandler_1.TextSystemErrorHandler.throwFormatterErrors(textSystemErrorHandler_1.TextSystemErrorHandler.defaultErrorMessage, new textSystemErrorItem_1.TextSystemErrorItem(checkedInputArgument.error));
            }
            return checkedInputArgument.inputArgument;
        };
        /**
         * Checks if the processed format item need to be processed again for inner format items
         * The recursion is limited by 10
         *
         * @private
         * @static
         * @param {FormatterTextItem} item
         * @param {FormatItem} formatItem
         * @param {ITextProvider} [textSystemInterface]
         * @param {FormatterInputArgumentList} [argumentList]
         * @param {string} [languageCode]
         * @return {*}  {FormatterTextItem}
         * @memberof TextFormatter
         */
        TextFormatter.processRecursiveFormatItem = function (item, formatItem, textSystemInterface, argumentList, languageCode) {
            if (formatItem.isRecursive()) {
                item.incrementRecurisionCnt();
                // disables endless recursion of external data source items
                if (item.recursionLimitExeeded) {
                    textSystemErrorHandler_1.TextSystemErrorHandler.throwFormatterErrors(textSystemErrorHandler_1.TextSystemErrorHandler.defaultErrorMessage, new textSystemErrorItem_1.TextSystemErrorItem(textSystemErrorTypes_1.TextSystemErrorTypes.EndlessRecursion));
                }
                // Recursion: Search for a format item in the formatted item
                item = this.replaceFormatItems(item, textSystemInterface, argumentList, languageCode);
            }
            else {
                // reset the recursion counter
                item.resetRecurisionCnt();
            }
            return item;
        };
        return TextFormatter;
    }());
    exports.TextFormatter = TextFormatter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dEZvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3RleHRQcm92aWRlci90ZXh0Rm9ybWF0dGVyL3RleHRGb3JtYXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBZUE7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUVGO1FBRUk7Ozs7VUFJRTtRQUNIO1FBQXVCLENBQUM7UUFFdkI7Ozs7Ozs7OztVQVNFO1FBQ1csd0JBQVUsR0FBeEIsVUFBeUIsT0FBZSxFQUFFLG1CQUFvQyxFQUFFLFlBQTBDLEVBQUUsWUFBb0I7WUFFNUksK0JBQStCO1lBQy9CLElBQUksU0FBUyxHQUFzQixJQUFJLHFDQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRWxFLElBQUksYUFBYSxHQUFhLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLEVBQUUsbUJBQW1CLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBRWxILGFBQWEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUV6RSxPQUFPLGFBQWEsQ0FBQztRQUN6QixDQUFDO1FBRUQ7Ozs7Ozs7Ozs7OztXQVlHO1FBQ1csNEJBQWMsR0FBNUIsVUFBNkIsTUFBYyxFQUFFLFlBQXdDO1lBRWpGLElBQUksaUJBQWlCLEdBQVcsRUFBRSxDQUFDO1lBRW5DLElBQUksV0FBVyxHQUFnQixJQUFJLHlCQUFXLEVBQUUsQ0FBQztZQUVqRCxXQUFXLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztZQUUxQixPQUFNLFdBQVcsQ0FBQyx5QkFBeUIsRUFBRSxFQUFFO2dCQUMzQyxpQkFBaUIsSUFBSSxXQUFXLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztnQkFDM0QsV0FBVyxDQUFDLDBCQUEwQixFQUFFLENBQUM7Z0JBRXpDLGdGQUFnRjtnQkFDaEYsaUJBQWlCLElBQUksSUFBSSxD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bUJBQW1CLEVBQUUsSUFBSSx5Q0FBbUIsQ0FBQywyQ0FBb0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7aUJBQzNKO2dCQUVELDREQUE0RDtnQkFDNUQsSUFBSSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO2FBQ3pGO2lCQUNJO2dCQUNELDhCQUE4QjtnQkFDOUIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7YUFDN0I7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0wsb0JBQUM7SUFBRCxDQUFDLEFBcFVBLElBb1VBO0lBcFVhLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3ViRm9ybWF0dGVyU2VsZWN0b3IgfSBmcm9tIFwiLi9zdWJGb3JtYXR0ZXJTZWxlY3RvclwiO1xyXG5pbXBvcnQgeyBDaGVja2VkSW5wdXRBcmd1bWVudCwgRWRpdFN0cmluZ0hlbHBlciB9IGZyb20gXCIuL2VkaXRTdHJpbmdIZWxwZXJcIlxyXG5pbXBvcnQgeyBJRm9ybWF0dGVySW5wdXRBcmd1bWVudH0gZnJvbSBcIi4uL2ludGVyZmFjZS9mb3JtYXR0ZXJJbnB1dEFyZ3VtZW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElUZXh0UHJvdmlkZXIgfSBmcm9tIFwiLi4vaW50ZXJmYWNlL3RleHRQcm92aWRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50TGlzdCB9IGZyb20gXCIuL2Zvcm1hdHRlcklucHV0QXJndW1lbnRzL2Zvcm1hdHRlcklucHV0QXJndW1lbnRMaXN0XCI7XHJcbmltcG9ydCB7IEZvcm1hdEl0ZW1JZGVudGlmaWVyIH0gZnJvbSBcIi4vZm9ybWF0SXRlbUlkZW50aWZpZXJcIjtcclxuaW1wb3J0IHsgUmF3VGV4dEl0ZW0gfSBmcm9tIFwiLi9yYXdUZXh0SXRlbVwiO1xyXG5pbXBvcnQgeyBEYXRhU291cmNlVHlwZXMsIEZvcm1hdEl0ZW0gfSBmcm9tIFwiLi9mb3JtYXRJdGVtXCI7XHJcbmltcG9ydCB7IEZvcm1hdHRlcklucHV0QXJndW1lbnRTdHJpbmcgfSBmcm9tIFwiLi9mb3JtYXR0ZXJJbnB1dEFyZ3VtZW50cy9mb3JtYXR0ZXJJbnB1dEFyZ3VtZW50U3RyaW5nXCI7XHJcbmltcG9ydCB7IFRleHRJdGVtIGFzIFRleHRJdGVtIH0gZnJvbSBcIi4uL3RleHRJdGVtXCI7XHJcbmltcG9ydCB7IFRleHRTeXN0ZW1FcnJvclR5cGVzIH0gZnJvbSBcIi4uL2Vycm9ySGFuZGxpbmcvdGV4dFN5c3RlbUVycm9yVHlwZXNcIjtcclxuaW1wb3J0IHsgVGV4dFN5c3RlbUVycm9ySGFuZGxlciB9IGZyb20gXCIuLi9lcnJvckhhbmRsaW5nL3RleHRTeXN0ZW1FcnJvckhhbmRsZXJcIjtcclxuaW1wb3J0IHsgVGV4dFN5c3RlbUVycm9ySXRlbSB9IGZyb20gXCIuLi9lcnJvckhhbmRsaW5nL3RleHRTeXN0ZW1FcnJvckl0ZW1cIjtcclxuaW1wb3J0IHsgRm9ybWF0dGVyVGV4dEl0ZW0gfSBmcm9tIFwiLi9mb3JtYXR0ZXJUZXh0SXRlbVwiO1xyXG5cclxuLyoqXHJcbiAqIEZvcm1hdCBzdHJpbmdzIGFyZSB0ZXh0IHRlbXBsYXRlcyBjb25zaXN0aW5nIG9mIFVURi04IHRleHQgYXJlYXMgYW5kIG9wdGlvbmFsIGZvcm1hdCBpdGVtcy4gV2hlbiB0aGUgdGV4dCBpcyBkaXNwbGF5ZWQsIFxyXG4gKiB0aGUgcmVzcGVjdGl2ZSBmb3JtYXQgaXRlbXMgYXJlIHJlcGxhY2VkIGJ5IHRleHQgZnJhZ21lbnRzIHRoYXQgYXJlIGdlbmVyYXRlZCBiYXNlZCBvbiB0aGUgc3BlY2lmaWVkIGNvbnRhaW5lZCBpbiB0aGUgXHJcbiAqIGZvcm1hdCBpdGVtLCBmb3IgZXhhbXBsZSB0byBkaXNwbGF5IG1lYXN1cmVkIHZhbHVlcyBmcm9tIHZhcmlhYmxlcywgdG8gYXBwbHkgbWVhc3VyZWQgdmFsdWVzIGluIHVzZXItZGVmaW5lZCBldmVudCBtZXNzYWdlc1xyXG4gKiBvciBwdXQgdG9nZXRoZXIgc3RyaW5ncyBmb3IgZGlzcGxheWluZyBpbiBITUkgYXBwbGljYXRpb25zLiBCYXNpYyBzeW50YXggb2YgYSBmb3JtYXQgaXRlbTpcclxuICogXHJcbiAqIHs8RGF0YVNvdXJjZT58WzxGb3JtYXRTcGVjaWZpY2F0aW9uPl19XHJcbiAqIFxyXG4gKiBJbiBvdGhlciB3b3JkcywgZm9ybWF0IGl0ZW1zIGFyZSBkZWxpbWl0ZWQgYnkgeyBhbmQgfSBhbmQgYWx3YXlzIGNvbnRhaW4gYSBkYXRhIHNvdXJjZSwgXHJcbiAqIHdoaWNoIGNhbiB0aGVuIGJlIGZvbGxvd2VkIGJ5IGEgfCAocGlwZSkgY2hhcmFjdGVyIGFuZCBmb3JtYXQgc3BlY2lmaWNhdGlvbiAob3B0aW9uYWwpLiBcclxuICogXHJcbiAqIEBzdGF0aWNcclxuICogQGNsYXNzIFRleHRGb3JtYXR0ZXJcclxuICovXHJcblxyXG4gZXhwb3J0IGNsYXNzIFRleHRGb3JtYXR0ZXIge1xyXG4gICAgXHJcbiAgICAgLyoqXHJcbiAgICAgKiBQcml2YXRlIGNvbnN0cnVjdG9yIGZvciBpbml0aWFsaXppbmcgYSBzdGF0aWNcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgVGV4dEZvcm1hdHRlci5cclxuICAgICAqIEBtZW1iZXJvZiBUZXh0Rm9ybWF0dGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICAgICAvKipcclxuICAgICAqIENhbGwgbWV0aG9kIGZvciB1c2luZyBUZXh0Rm9ybWF0dGVyIHRoYXQgaXMgY29ubmVjdGVkIHRvIHRoZSB0ZXh0c3lzdGVtXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuICAgICAqIEBwYXJhbSB7SVRleHRQcm92aWRlcn0gdGV4dFN5c3RlbUludGVyZmFjZVxyXG4gICAgICogQHBhcmFtIHtGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50TGlzdCB8IHVuZGVmaW5lZH0gYXJndW1lbnRMaXN0XHJcbiAgICAgKiBAcGFyYW0geyp9IFtsYW5ndWFnZUNvZGU9dGhpcy5fc2VsZWN0ZWRMYW5ndWFnZV1cclxuICAgICAqIEByZXR1cm5zIHtUZXh0SXRlbX1cclxuICAgICAqIEBtZW1iZXJvZiBUZXh0Rm9ybWF0dGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZm9ybWF0VGV4dChyYXdUZXh0OiBzdHJpbmcsIHRleHRTeXN0ZW1JbnRlcmZhY2UgPzogSVRleHRQcm92aWRlciwgYXJndW1lbnRMaXN0ID86IEZvcm1hdHRlcklucHV0QXJndW1lbnRMaXN0LCBsYW5ndWFnZUNvZGU/OnN0cmluZyk6IFRleHRJdGVtIHtcclxuXHJcbiAgICAgICAgLy8gUHJlcGFyZSBkYXRhIGJlZm9yZSBzdGFydGluZ1xyXG4gICAgICAgIGxldCBpbnB1dERhdGE6IEZvcm1hdHRlclRleHRJdGVtID0gbmV3IEZvcm1hdHRlclRleHRJdGVtKHJhd1RleHQpO1xyXG5cclxuICAgICAgICBsZXQgZm9ybWF0dGVkVGV4dDogVGV4dEl0ZW0gPSB0aGlzLnJlcGxhY2VGb3JtYXRJdGVtcyhpbnB1dERhdGEsIHRleHRTeXN0ZW1JbnRlcmZhY2UsIGFyZ3VtZW50TGlzdCwgbGFuZ3VhZ2VDb2RlKTtcclxuICAgICAgICBcclxuICAgICAgICBmb3JtYXR0ZWRUZXh0LnZhbHVlID0gdGhpcy5yZW1vdmVEb3VibGVPcGVuaW5nQ3VybHMoZm9ybWF0dGVkVGV4dC52YWx1ZSk7XHJcblxyXG4gICAgICAgIHJldHVybiBmb3JtYXR0ZWRUZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRm9ybWF0dGVyIGxpZ2h0IGZvciBoYW5kbGluZyBmb3JtYXR0aW5nIHdpdGhvdXQgYmVpbmcgY29ubmVjdGVkIHRvIHRoZSB0ZXh0c3lzdGVtLlxyXG4gICAgICogUmVzb2x2ZXMgZm9ybWF0IGl0ZW1zIHJlZmZlcmluZyB0byB0aGUgYXJndW1lbnQgbGlzdCByZXR1cm5pbmcgdGhlIHJlc3VsdCBhcyBzdHJpbmcuXHJcbiAgICAgKiBDQU5OT1QgaGFuZGxlIGR5bmFtaWNhbGx5IGJ1aWxkIHRleHRzXHJcbiAgICAgKiBDQU5OT1QgaGFuZGxlIGV4dGVybmFsIGRhdGEgc291cmNlc1xyXG4gICAgICogRE9FUyBOT1QgaW5jbHVkZSBlcnJvciBpbmZvcm1hdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmF3QXJnXHJcbiAgICAgKiBAcGFyYW0ge0Zvcm1hdHRlcklucHV0QXJndW1lbnRMaXN0fSBhcmd1bWVudExpc3RcclxuICAgICAqIEByZXR1cm4geyp9ICB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFRleHRGb3JtYXR0ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBmb3JtYXRBcmd1bWVudChyYXdBcmc6IHN0cmluZywgYXJndW1lbnRMaXN0OiBGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50TGlzdCk6IHN0cmluZyB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGZvcm1hdHRlZEFyZ3VtZW50OiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCByYXdBcmd1bWVudDogUmF3VGV4dEl0ZW0gPSBuZXcgUmF3VGV4dEl0ZW0oKTtcclxuXHJcbiAgICAgICAgcmF3QXJndW1lbnQuZGF0YSA9IHJhd0FyZztcclxuXHJcbiAgICAgICAgd2hpbGUocmF3QXJndW1lbnQuY29udGFpbnNGdXJ0aGVyRm9ybWF0SXRlbSgpKSB7XHJcbiAgICAgICAgICAgIGZvcm1hdHRlZEFyZ3VtZW50ICs9IHJhd0FyZ3VtZW50LmdldFRleHRCZWZvcmVGb3JtYXRJdGVtKCk7XHJcbiAgICAgICAgICAgIHJhd0FyZ3VtZW50LnJlbW92ZVRleHRCZWZvcmVGb3JtYXRJdGVtKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBnZXQgdGhlIHRoZSByZXN1bHQgb2YgdGhlIGZvcm1hdHRpbmcgYW5kIGFkZCBpdCB0byB0aGUgYWxscmVkeSBmb3JtYXR0ZWQgZGF0YVxyXG4gICAgICAgICAgICBmb3JtYXR0ZWRBcmd1bWVudCArPSB0aGlzLnByb2Nlc3NTaW5nbGVBcmd1bWVudChyYXdBcmd1bWVudC5nZXRGb3JtYXRJdGVtV2l0aG91dEN1cmxzKCksIGFyZ3VtZW50TGlzdCk7XHJcbiAgICAgICAgICAgIHJhd0FyZ3VtZW50LnJlbW92ZUZvcm1hdHRlZFRleHQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvcm1hdHRlZEFyZ3VtZW50ICs9IHJhd0FyZ3VtZW50LmRhdGE7XHJcblxyXG4gICAgICAgIGZvcm1hdHRlZEFyZ3VtZW50ID0gdGhpcy5yZW1vdmVEb3VibGVPcGVuaW5nQ3VybHMoZm9ybWF0dGVkQXJndW1lbnQpO1xyXG5cclxuICAgICAgICByZXR1cm4gZm9ybWF0dGVkQXJndW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGFuZ2UgXCJ7e1wiIHRvIFwie1wiXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XHJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFxyXG4gICAgICogQG1lbWJlcm9mIFRleHRGb3JtYXR0ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVtb3ZlRG91YmxlT3BlbmluZ0N1cmxzKHRleHQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgIGxldCByZWdleDogUmVnRXhwID0gUmVnRXhwKEZvcm1hdEl0ZW1JZGVudGlmaWVyLm5leHQgKyBGb3JtYXRJdGVtSWRlbnRpZmllci5uZXh0LCdnJyk7XHJcbiAgICAgICAgIHJldHVybiB0ZXh0LnJlcGxhY2UocmVnZXgsIEZvcm1hdEl0ZW1JZGVudGlmaWVyLm5leHQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzb2x2ZSB0aGUgZm9ybWF0IGl0ZW1zIG9mIHRoZSBmb3JtYXR0ZXIgbGlnaHRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJhd0RhdGFcclxuICAgICAqIEBwYXJhbSB7Rm9ybWF0dGVySW5wdXRBcmd1bWVudExpc3R9IGFyZ3VtZW50TGlzdFxyXG4gICAgICogQHJldHVybiB7Kn0gIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgVGV4dEZvcm1hdHRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBwcm9jZXNzU2luZ2xlQXJndW1lbnQocmF3RGF0YTogc3RyaW5nLCBhcmd1bWVudExpc3Q6IEZvcm1hdHRlcklucHV0QXJndW1lbnRMaXN0KTogc3RyaW5nIHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgZm9ybWF0dGVkSXRlbTogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBmb3JtYXQgaXRlbSBpbmZvcm1hdGlvbiB7PERhdGFTb3VyY2U+fFs8Rm9ybWF0U3BlY2lmaWNhdGlvbj5dfSBmcm9tIHJhdyBzdHJpbmdcclxuICAgICAgICAgICAgbGV0IGZvcm1hdEl0ZW06IEZvcm1hdEl0ZW0gPSBuZXcgRm9ybWF0SXRlbShyYXdEYXRhLCBhcmd1bWVudExpc3QpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gZ2V0IGlucHV0IEFyZ3VtZW50IGZyb20gQXJndW1lbnQgTGlzdFxyXG4gICAgICAgICAgICBsZXQgaW5wdXRBcmd1bWVudDogSUZvcm1hdHRlcklucHV0QXJndW1lbnQgPSB0aGlzLnJlY2VpdmVJbnB1dEFyZ3VtZW50RnJvbUFyZ3VtZW50RGF0YVNvdXJjZShmb3JtYXRJdGVtLCBhcmd1bWVudExpc3QpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAvLyBhcHBseSBmb3JtYXQgU3BlY2lmaWNhdGlvblxyXG4gICAgICAgICAgICBmb3JtYXR0ZWRJdGVtID0gU3ViRm9ybWF0dGVyU2VsZWN0b3IuZm9ybWF0QXJndW1lbnRJdGVtKGlucHV0QXJndW1lbnQsIGZvcm1hdEl0ZW0uZm9ybWF0U3BlY2lmaWNhdGlvbik7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBjYXRjaCh0ZXh0U3lzdGVtRXJyb3IpIHtcclxuICAgICAgICAgICAgZm9ybWF0dGVkSXRlbSA9IHRleHRTeXN0ZW1FcnJvci5tZXNzYWdlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZvcm1hdHRlZEl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWFyY2ggZm9yIGZvcm1hdCBpdGVtcyBhbmQgY2hhbmdlIHRoZSBpdGVtcyB3aXRoIHRoZSB2YWx1ZSBmcm9tIGRhdGEgc291cmNlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7Rm9ybWF0dGVyVGV4dEl0ZW19IGRhdGFcclxuICAgICAqIEBwYXJhbSB7SVRleHRQcm92aWRlcn0gW3RleHRTeXN0ZW1JbnRlcmZhY2VdXHJcbiAgICAgKiBAcGFyYW0ge0Zvcm1hdHRlcklucHV0QXJndW1lbnRMaXN0fSBbYXJndW1lbnRMaXN0XVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtsYW5ndWFnZUNvZGVdXHJcbiAgICAgKiBAcmV0dXJuIHsqfSAge0Zvcm1hdHRlclRleHRJdGVtfVxyXG4gICAgICogQG1lbWJlcm9mIFRleHRGb3JtYXR0ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVwbGFjZUZvcm1hdEl0ZW1zKGRhdGE6IEZvcm1hdHRlclRleHRJdGVtLCB0ZXh0U3lzdGVtSW50ZXJmYWNlID86IElUZXh0UHJvdmlkZXIsIGFyZ3VtZW50TGlzdCA/OiBGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50TGlzdCwgbGFuZ3VhZ2VDb2RlPzpzdHJpbmcpOiBGb3JtYXR0ZXJUZXh0SXRlbSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHJhd1RleHRJdGVtOiBSYXdUZXh0SXRlbSA9IG5ldyBSYXdUZXh0SXRlbSgpO1xyXG5cclxuICAgICAgICByYXdUZXh0SXRlbS5kYXRhID0gZGF0YS52YWx1ZTtcclxuXHJcbiAgICAgICAgZGF0YS52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICBcclxuICAgICAgICAvLyBlbmRzIGlmIG5vIGZ1cnRoZXIgZm9ybWF0IGl0ZW0gaXMgZm91bmRcclxuICAgICAgICB3aGlsZShyYXdUZXh0SXRlbS5jb250YWluc0Z1cnRoZXJGb3JtYXRJdGVtKCkpIHtcclxuXHJcbiAgICAgICAgICAgIGRhdGEudmFsdWUgKz0gcmF3VGV4dEl0ZW0uZ2V0VGV4dEJlZm9yZUZvcm1hdEl0ZW0oKTtcclxuICAgICAgICAgICAgcmF3VGV4dEl0ZW0ucmVtb3ZlVGV4dEJlZm9yZUZvcm1hdEl0ZW0oKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIGEgXCI9XCIsIGl0cyBpcyBhbiBkeW5hbWljYWxseSBidWlsdCBmb3JtYXQgaXRlbSBhbmQgXCJ7PVwiIGdldHMgcmVtb3ZlZFxyXG4gICAgICAgICAgICBpZihyYXdUZXh0SXRlbS5jb250YWluc1JlY3Vyc2l2ZUZvcm1hdEl0ZW0oKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gUmVjdXJzaW9uOiBwcm9jZXNzIHRoZSBpbm5lciBmb3JtYXQgaXRlbXMuIFRoZSBiZWZvcmUgcmVtb3ZlZCBcIntcIiBuZWVkIHRvIGJlIGFkZGVkIGluIGZyb250IGFnYWluIHRoYXQgaXQgZ2V0cyBwcm9jZXNzZWQgYWdhaW4uXHJcbiAgICAgICAgICAgICAgICBsZXQgcmVjdXJzaXZlSXRlbTogRm9ybWF0dGVyVGV4dEl0ZW0gPSB0aGlzLnJlcGxhY2VGb3JtYXRJdGVtcyhuZXcgRm9ybWF0dGVyVGV4dEl0ZW0ocmF3VGV4dEl0ZW0uZGF0YSwgZGF0YS5lcnJvcnMsIGRhdGEucmVjdXJpc2lvbkNudCksIHRleHRTeXN0ZW1JbnRlcmZhY2UsIGFyZ3VtZW50TGlzdCwgbGFuZ3VhZ2VDb2RlKTtcclxuICAgICAgICAgICAgICAgIC8vIEFwcGVuZCB0aGUgYmV2b3IgcmVtb3ZlZCBcIntcIiBvbiBmcm9udCB0aGF0IHRoZSBmb3JtYXR0ZWQgcGFydCBnZXRzIGludGVycHJldGVkIGFzIGZvcm1hdCBpdGVtIGFnYWluXHJcbiAgICAgICAgICAgICAgICByYXdUZXh0SXRlbS5kYXRhID0gRm9ybWF0SXRlbUlkZW50aWZpZXIubmV4dCArIHJlY3Vyc2l2ZUl0ZW0udmFsdWU7XHJcbiAgICAgICAgICAgICAgICBkYXRhLmVycm9ycyA9IHJlY3Vyc2l2ZUl0ZW0uZXJyb3JzO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5yZWN1cmlzaW9uQ250ID0gcmVjdXJzaXZlSXRlbS5yZWN1cmlzaW9uQ250OyBcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSB0aGUgcmVzdWx0IG9mIHRoZSBmb3JtYXR0aW5nIGFuZCBhZGQgaXQgdG8gdGhlIGFsbHJlZHkgZm9ybWF0dGVkIGRhdGFcclxuICAgICAgICAgICAgbGV0IHByb2Nlc3NlZEl0ZW06IEZvcm1hdHRlclRleHRJdGVtID0gdGhpcy5wcm9jZXNzRm9ybWF0SXRlbShuZXcgRm9ybWF0dGVyVGV4dEl0ZW0ocmF3VGV4dEl0ZW0uZ2V0Rm9ybWF0SXRlbVdpdGhvdXRDdXJscygpLCBkYXRhLmVycm9ycywgZGF0YS5yZWN1cmlzaW9uQ250KSwgdGV4dFN5c3RlbUludGVyZmFjZSwgYXJndW1lbnRMaXN0LCBsYW5ndWFnZUNvZGUpOyAgIFxyXG4gICAgICAgICAgICBkYXRhLnZhbHVlICs9IHByb2Nlc3NlZEl0ZW0udmFsdWU7XHJcbiAgICAgICAgICAgIGRhdGEuZXJyb3JzID0gcHJvY2Vzc2VkSXRlbS5lcnJvcnM7XHJcbiAgICAgICAgICAgIGRhdGEucmVjdXJpc2lvbkNudCA9IHByb2Nlc3NlZEl0ZW0ucmVjdXJpc2lvbkNudDsgXHJcbiAgICAgICAgICAgIHJhd1RleHRJdGVtLnJlbW92ZUZvcm1hdHRlZFRleHQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRhdGEudmFsdWUgKz0gcmF3VGV4dEl0ZW0uZGF0YTtcclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH0gXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIGZvcm1hdHRlZCBzdHJpbmcgb2YgdGhlIGZvcm1hdCBpdGVtXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7Rm9ybWF0dGVyVGV4dEl0ZW19IGl0ZW1cclxuICAgICAqIEBwYXJhbSB7SVRleHRQcm92aWRlcn0gW3RleHRTeXN0ZW1JbnRlcmZhY2VdXHJcbiAgICAgKiBAcGFyYW0ge0Zvcm1hdHRlcklucHV0QXJndW1lbnRMaXN0fSBbYXJndW1lbnRMaXN0XVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtsYW5ndWFnZUNvZGVdXHJcbiAgICAgKiBAcmV0dXJuIHsqfSAge0Zvcm1hdHRlclRleHRJdGVtfVxyXG4gICAgICogQG1lbWJlcm9mIFRleHRGb3JtYXR0ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcHJvY2Vzc0Zvcm1hdEl0ZW0oaXRlbTogRm9ybWF0dGVyVGV4dEl0ZW0sIHRleHRTeXN0ZW1JbnRlcmZhY2UgPzogSVRleHRQcm92aWRlciwgYXJndW1lbnRMaXN0ID86IEZvcm1hdHRlcklucHV0QXJndW1lbnRMaXN0LCBsYW5ndWFnZUNvZGUgPzogc3RyaW5nKTogRm9ybWF0dGVyVGV4dEl0ZW0ge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIGdldCB0aGUgZm9ybWF0IGl0ZW0gaW5mb3JtYXRpb24gezxEYXRhU291cmNlPnxbPEZvcm1hdFNwZWNpZmljYXRpb24+XX0gZnJvbSByYXcgc3RyaW5nXHJcbiAgICAgICAgICAgIGxldCBmb3JtYXRJdGVtOiBGb3JtYXRJdGVtID0gbmV3IEZvcm1hdEl0ZW0oaXRlbS52YWx1ZSwgYXJndW1lbnRMaXN0KTtcclxuXHJcbiAgICAgICAgICAgIC8vIHJlY2VpdmUgdGhlIGlucHV0IGFyZ3VtZW50IGZvciB0aGUgcmVzcGVjdGl2ZSBkYXRhc291cmNlXHJcbiAgICAgICAgICAgIGxldCBpbnB1dEFyZ3VtZW50OiBJRm9ybWF0dGVySW5wdXRBcmd1bWVudCA9IHRoaXMucmVjZWl2ZUlucHV0QXJndW1lbnRGcm9tRGF0YVNvdXJjZShmb3JtYXRJdGVtLCB0ZXh0U3lzdGVtSW50ZXJmYWNlLCBhcmd1bWVudExpc3QsIGxhbmd1YWdlQ29kZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBhcHBseSBmb3JtYXQgU3BlY2lmaWNhdGlvblxyXG4gICAgICAgICAgICBpdGVtLnZhbHVlID0gU3ViRm9ybWF0dGVyU2VsZWN0b3IuZm9ybWF0QXJndW1lbnRJdGVtKGlucHV0QXJndW1lbnQsIGZvcm1hdEl0ZW0uZm9ybWF0U3BlY2lmaWNhdGlvbik7XHJcblxyXG4gICAgICAgICAgICAvLyBJbiByZWN1cnNpdmUgZm9ybWF0IGl0ZW1zIHRoZSByZXN1bHQgaXMgY2hlY2tlZCBmb3IgaW5uZXIgZm9ybWF0IGl0ZW1zXHJcbiAgICAgICAgICAgIGl0ZW0gPSB0aGlzLnByb2Nlc3NSZWN1cnNpdmVGb3JtYXRJdGVtKGl0ZW0sIGZvcm1hdEl0ZW0sIHRleHRTeXN0ZW1JbnRlcmZhY2UsIGFyZ3VtZW50TGlzdCwgbGFuZ3VhZ2VDb2RlKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoKHRleHRTeXN0ZW1FcnJvcikge1xyXG4gICAgICAgICAgICAvLyByZXNldCB0aGUgcmVjdXJzaW9uIGNvdW50ZXJcclxuICAgICAgICAgICAgaXRlbS5yZXNldFJlY3VyaXNpb25DbnQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEVycm9ycyBhciBvbmx5IHB1c2hlZCBhdCB0aGlzIHBsYWNlXHJcbiAgICAgICAgICAgIGl0ZW0uZXJyb3JzLnB1c2godGV4dFN5c3RlbUVycm9yLml0ZW0pO1xyXG4gICAgICAgICAgICAvLyBUaGUgYmVmb3JlIGNyZWF0ZWQgZXJyb3JtZXNzYWdlIGdldHMgc2hvd24gaW4gdGhlIGZvcm1hdHRlZCBzdHJpbmcgaW5zdGVhZCBvZiB0aGUgZm9ybWF0IGl0ZW1cclxuICAgICAgICAgICAgaXRlbS52YWx1ZSA9IHRleHRTeXN0ZW1FcnJvci5tZXNzYWdlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogU2VsZWN0cyB0aGUgcmlnaHQgZGF0YXNvdXJjZSBhbmQgcmVjZWl2ZXMgdGhlIHJhdyBpbnB1dCBhcmd1bWVudFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0Zvcm1hdEl0ZW19IGZvcm1hdEl0ZW1cclxuICAgICAqIEBwYXJhbSB7SVRleHRQcm92aWRlcn0gW3RleHRTeXN0ZW1JbnRlcmZhY2VdXHJcbiAgICAgKiBAcGFyYW0ge0Zvcm1hdHRlcklucHV0QXJndW1lbnRMaXN0fSBbYXJndW1lbnRMaXN0XVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtsYW5ndWFnZUNvZGVdXHJcbiAgICAgKiBAcmV0dXJuIHsqfSAge0lGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50fVxyXG4gICAgICogQG1lbWJlcm9mIFRleHRGb3JtYXR0ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVjZWl2ZUlucHV0QXJndW1lbnRGcm9tRGF0YVNvdXJjZShmb3JtYXRJdGVtOiBGb3JtYXRJdGVtLCB0ZXh0U3lzdGVtSW50ZXJmYWNlID86IElUZXh0UHJvdmlkZXIsIGFyZ3VtZW50TGlzdCA/OiBGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50TGlzdCwgbGFuZ3VhZ2VDb2RlID86IHN0cmluZyk6IElGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50IHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgaW5wdXRBcmd1bWVudDogSUZvcm1hdHRlcklucHV0QXJndW1lbnQ7XHJcblxyXG4gICAgICAgIGlmKGZvcm1hdEl0ZW0uZGF0YVNvdXJjZVR5cGUgPT09IERhdGFTb3VyY2VUeXBlcy5leHRlcm5hbCkge1xyXG4gICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGV4dGVybmFsIGRhdGEgc291cmNlIGlkZW50aWZpZXIgKFwiJFwiKSBmcm9tIHJhd0l0ZW0gYW5kIHBhc3MgaXQgZm9yIGdldHRpbmcgdGhlIHRleHQgZnJvbSB0aGUgdGV4dHN5c3RlbVxyXG4gICAgICAgICAgICBpbnB1dEFyZ3VtZW50ID0gdGhpcy5yZWNlaXZlSW5wdXRBcmd1bWVudEZyb21FeHRlcm5hbERhdGFTb3VyY2UoZm9ybWF0SXRlbSwgdGV4dFN5c3RlbUludGVyZmFjZSwgbGFuZ3VhZ2VDb2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gRWxzZSBpdHMgYW4gYXJndW1lbnQgZGF0YSBzb3VyY2VcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaW5wdXRBcmd1bWVudCA9IHRoaXMucmVjZWl2ZUlucHV0QXJndW1lbnRGcm9tQXJndW1lbnREYXRhU291cmNlKGZvcm1hdEl0ZW0sIGFyZ3VtZW50TGlzdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaW5wdXRBcmd1bWVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb2Nlc3MgdGhlIGV4dGVybmwgZGF0YSBzb3VyY2UuIFxyXG4gICAgICogU2VhcmNoZXMgcmVjb3Vyc2l2ZSBmb3IgZnVydGhlciBmb3JtYXQgaXRlbXMgaW4gdGhlIHByb2Nlc3NlZCBzdHJpbmcuXHJcbiAgICAgKiBDYW4gdGhyb3cgRXJyb3Igc3RyaW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0Zvcm1hdEl0ZW19IGZvcm1hdEl0ZW1cclxuICAgICAqIEBwYXJhbSB7SVRleHRQcm92aWRlcn0gW3RleHRTeXN0ZW1JbnRlcmZhY2VdXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2xhbmd1YWdlQ29kZV1cclxuICAgICAqIEByZXR1cm4geyp9ICB7SUZvcm1hdHRlcklucHV0QXJndW1lbnR9XHJcbiAgICAgKiBAbWVtYmVyb2YgVGV4dEZvcm1hdHRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWNlaXZlSW5wdXRBcmd1bWVudEZyb21FeHRlcm5hbERhdGFTb3VyY2UoZm9ybWF0SXRlbTogRm9ybWF0SXRlbSwgdGV4dFN5c3RlbUludGVyZmFjZSA/OiBJVGV4dFByb3ZpZGVyLCBsYW5ndWFnZUNvZGUgPzogc3RyaW5nKTogSUZvcm1hdHRlcklucHV0QXJndW1lbnQge1xyXG5cclxuICAgICAgICAvLyBjaGVjayBpZiB0aGVyZSBpcyBhIHRleHRzeXN0ZW0gaW5zdGFuY2VcclxuICAgICAgICBpZih0ZXh0U3lzdGVtSW50ZXJmYWNlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgbGV0IGVycm9yTWVzc2FnZTogc3RyaW5nID0gVGV4dFN5c3RlbUVycm9ySGFuZGxlci5nZXRFcnJvck1lc3NhZ2VCeVNvdXJjZShUZXh0U3lzdGVtRXJyb3JUeXBlcy5Db3VsZE5vdE9wZW5UZXh0RGF0YWJhc2UsIGZvcm1hdEl0ZW0uZGF0YVNvdXJjZSk7XHJcbiAgICAgICAgICAgIFRleHRTeXN0ZW1FcnJvckhhbmRsZXIudGhyb3dGb3JtYXR0ZXJFcnJvcnMoZXJyb3JNZXNzYWdlLCBuZXcgVGV4dFN5c3RlbUVycm9ySXRlbShUZXh0U3lzdGVtRXJyb3JUeXBlcy5Db3VsZE5vdE9wZW5UZXh0RGF0YWJhc2UpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEdldCBUZXh0SXRlbSBmcm9tIHRleHRzeXN0ZW1cclxuICAgICAgICBsZXQgdGV4dEl0ZW06IFRleHRJdGVtID0gdGV4dFN5c3RlbUludGVyZmFjZS5nZXRSYXdUZXh0QnlGdWxseVF1YWxpZmllZFRleHRJZChmb3JtYXRJdGVtLmRhdGFTb3VyY2UsIGxhbmd1YWdlQ29kZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGZvcm1hdHRlZEl0ZW06IHN0cmluZyA9IHRleHRJdGVtLnZhbHVlO1xyXG5cclxuICAgICAgICAvLyBXZW5uIEZlaGxlciBhdWZnZXRyZXRlbiBzaW5kIHdlcmRlbiBkaWVzZSBpbiBkZW4gZXJyb3JDb250YWluZXIgZ2VwdXNodCB1bmQgZWluZSBleGVwdGlvbiB3aXJkIGdld29yZmVuXHJcbiAgICAgICAgaWYoIXRleHRJdGVtLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICBUZXh0U3lzdGVtRXJyb3JIYW5kbGVyLnRocm93Rm9ybWF0dGVyRXJyb3JzKGZvcm1hdHRlZEl0ZW0sIHRleHRJdGVtLmVycm9yc1swXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjb252ZXJ0IHRoZSByZWNlaXZlZCBzdHJpbmcgaW4gZGF0YWJhc2UgdG8gRm9ybWF0dGVySW5wdXRBcmd1bWVudFN0cmluZ1xyXG4gICAgICAgIGxldCBpbnB1dEFyZ3VtZW50OiBGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50U3RyaW5nID0gbmV3IEZvcm1hdHRlcklucHV0QXJndW1lbnRTdHJpbmcoZm9ybWF0dGVkSXRlbSk7XHJcblxyXG4gICAgICAgIHJldHVybiBpbnB1dEFyZ3VtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvY2VzcyB0aGUgYXJndW1lbnQgZGF0YSBzb3VyY2UgXHJcbiAgICAgKiBDYW4gdGhyb3cgRXJyb3Igc3RyaW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0Zvcm1hdEl0ZW19IGZvcm1hdEl0ZW1cclxuICAgICAqIEBwYXJhbSB7Rm9ybWF0dGVySW5wdXRBcmd1bWVudExpc3R9IFthcmd1bWVudExpc3RdXHJcbiAgICAgKiBAcmV0dXJuIHsqfSAge0lGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50fVxyXG4gICAgICogQG1lbWJlcm9mIFRleHRGb3JtYXR0ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVjZWl2ZUlucHV0QXJndW1lbnRGcm9tQXJndW1lbnREYXRhU291cmNlKGZvcm1hdEl0ZW06IEZvcm1hdEl0ZW0sIGFyZ3VtZW50TGlzdCA/OiBGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50TGlzdCk6IElGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50IHtcclxuXHJcbiAgICAgICAgbGV0IGNoZWNrZWRJbnB1dEFyZ3VtZW50OiBDaGVja2VkSW5wdXRBcmd1bWVudCA9IEVkaXRTdHJpbmdIZWxwZXIuZ2V0SW5wdXRBcmd1bWVudEZyb21UZXh0KGZvcm1hdEl0ZW0uZGF0YVNvdXJjZSwgYXJndW1lbnRMaXN0KTtcclxuXHJcbiAgICAgICAgaWYoY2hlY2tlZElucHV0QXJndW1lbnQuZXJyb3IgIT09IDApIHtcclxuICAgICAgICAgICAgVGV4dFN5c3RlbUVycm9ySGFuZGxlci50aHJvd0Zvcm1hdHRlckVycm9ycyhUZXh0U3lzdGVtRXJyb3JIYW5kbGVyLmRlZmF1bHRFcnJvck1lc3NhZ2UsIG5ldyBUZXh0U3lzdGVtRXJyb3JJdGVtKGNoZWNrZWRJbnB1dEFyZ3VtZW50LmVycm9yKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY2hlY2tlZElucHV0QXJndW1lbnQuaW5wdXRBcmd1bWVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB0aGUgcHJvY2Vzc2VkIGZvcm1hdCBpdGVtIG5lZWQgdG8gYmUgcHJvY2Vzc2VkIGFnYWluIGZvciBpbm5lciBmb3JtYXQgaXRlbXNcclxuICAgICAqIFRoZSByZWN1cnNpb24gaXMgbGltaXRlZCBieSAxMFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0Zvcm1hdHRlclRleHRJdGVtfSBpdGVtXHJcbiAgICAgKiBAcGFyYW0ge0Zvcm1hdEl0ZW19IGZvcm1hdEl0ZW1cclxuICAgICAqIEBwYXJhbSB7SVRleHRQcm92aWRlcn0gW3RleHRTeXN0ZW1JbnRlcmZhY2VdXHJcbiAgICAgKiBAcGFyYW0ge0Zvcm1hdHRlcklucHV0QXJndW1lbnRMaXN0fSBbYXJndW1lbnRMaXN0XVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtsYW5ndWFnZUNvZGVdXHJcbiAgICAgKiBAcmV0dXJuIHsqfSAge0Zvcm1hdHRlclRleHRJdGVtfVxyXG4gICAgICogQG1lbWJlcm9mIFRleHRGb3JtYXR0ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcHJvY2Vzc1JlY3Vyc2l2ZUZvcm1hdEl0ZW0oaXRlbTogRm9ybWF0dGVyVGV4dEl0ZW0sIGZvcm1hdEl0ZW06IEZvcm1hdEl0ZW0sIHRleHRTeXN0ZW1JbnRlcmZhY2UgPzogSVRleHRQcm92aWRlciwgYXJndW1lbnRMaXN0ID86IEZvcm1hdHRlcklucHV0QXJndW1lbnRMaXN0LCBsYW5ndWFnZUNvZGU/OnN0cmluZykgOiBGb3JtYXR0ZXJUZXh0SXRlbSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoZm9ybWF0SXRlbS5pc1JlY3Vyc2l2ZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgaXRlbS5pbmNyZW1lbnRSZWN1cmlzaW9uQ250KCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBkaXNhYmxlcyBlbmRsZXNzIHJlY3Vyc2lvbiBvZiBleHRlcm5hbCBkYXRhIHNvdXJjZSBpdGVtc1xyXG4gICAgICAgICAgICBpZihpdGVtLnJlY3Vyc2lvbkxpbWl0RXhlZWRlZCkge1xyXG4gICAgICAgICAgICAgICAgVGV4dFN5c3RlbUVycm9ySGFuZGxlci50aHJvd0Zvcm1hdHRlckVycm9ycyhUZXh0U3lzdGVtRXJyb3JIYW5kbGVyLmRlZmF1bHRFcnJvck1lc3NhZ2UsIG5ldyBUZXh0U3lzdGVtRXJyb3JJdGVtKFRleHRTeXN0ZW1FcnJvclR5cGVzLkVuZGxlc3NSZWN1cnNpb24pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gUmVjdXJzaW9uOiBTZWFyY2ggZm9yIGEgZm9ybWF0IGl0ZW0gaW4gdGhlIGZvcm1hdHRlZCBpdGVtXHJcbiAgICAgICAgICAgIGl0ZW0gPSB0aGlzLnJlcGxhY2VGb3JtYXRJdGVtcyhpdGVtLCB0ZXh0U3lzdGVtSW50ZXJmYWNlLCBhcmd1bWVudExpc3QsIGxhbmd1YWdlQ29kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyByZXNldCB0aGUgcmVjdXJzaW9uIGNvdW50ZXJcclxuICAgICAgICAgICAgaXRlbS5yZXNldFJlY3VyaXNpb25DbnQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfVxyXG59Il19