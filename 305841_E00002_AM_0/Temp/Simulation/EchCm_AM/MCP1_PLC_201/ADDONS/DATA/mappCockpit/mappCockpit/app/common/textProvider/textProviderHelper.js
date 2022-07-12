define(["require", "exports", "./textItem", "./textResourceHandling/textQualifier", "./errorHandling/textSystemErrorTypes", "./errorHandling/textSystemErrorItem"], function (require, exports, textItem_1, textQualifier_1, textSystemErrorTypes_1, textSystemErrorItem_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Static class that provides helper functions for the textProvider
     *
     * @export
     * @class TextFormatterHelper
     */
    var TextProviderHelper = /** @class */ (function () {
        function TextProviderHelper() {
        }
        /**
         * Searches for text data in the text recourses.
         * If nothing is found than a specific error is pushed to the output item.
         *
         * @public
         * @static
         * @param {TextResourcesContainer} recourses
         * @param {string} namespace
         * @param {string} textId
         * @param {string} languageCode
         * @return {*}  {TextItem}
         * @memberof TextProvider
         */
        TextProviderHelper.getTextNoFallback = function (recourses, namespace, textId, languageCode) {
            var text = new textItem_1.TextItem();
            var textResource = recourses.getTextResource(namespace, languageCode);
            if (textResource !== undefined) {
                text = textResource.getText(textId);
            }
            else {
                text.errors.push(new textSystemErrorItem_1.TextSystemErrorItem(textSystemErrorTypes_1.TextSystemErrorTypes.ReadAccessToTextDatabaseFailed, namespace, textId));
            }
            return text;
        };
        /**
         * Seperate a string "namespacePart1/.../namepacePartn/TextId1" into:
         * namespace = "namespacePart1/.../namepacePartn" and
         * textId = "TextId1"
         *
         * @public
         * @static
         * @param {string} fullyQualifiedTextId
         * @return {*}  {TextQualifier}
         * @memberof TextProvider
         */
        TextProviderHelper.decodeFullyQualifiedTextId = function (fullyQualifiedTextId) {
            // seperate elements by "/"
            var elements = fullyQualifiedTextId.split(this.namespaceSeperator);
            // the last element is the textId
            var textId = elements[elements.length - 1];
            // remove the last element
            elements.pop();
            // concatenate all elmenets insrting the "/" again
            var namespace = elements.join(this.namespaceSeperator);
            return new textQualifier_1.TextQualifier(namespace, textId);
        };
        /**
         * Combines namespace and TextId to a fully qualified textId
         *
         * @static
         * @param {string} namespace
         * @param {string} textId
         * @return {*}  {string}
         * @memberof TextProviderHelper
         */
        TextProviderHelper.createFullyQualifiedTextId = function (namespace, textId) {
            return namespace + this.namespaceSeperator + textId;
        };
        TextProviderHelper.namespaceSeperator = "/";
        return TextProviderHelper;
    }());
    exports.TextProviderHelper = TextProviderHelper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dFByb3ZpZGVySGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vdGV4dFByb3ZpZGVyL3RleHRQcm92aWRlckhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFPQTs7Ozs7T0FLRztJQUNIO1FBSUk7UUFBd0IsQ0FBQztRQUV6Qjs7Ozs7Ozs7Ozs7O1dBWUc7UUFDVyxvQ0FBaUIsR0FBL0IsVUFBZ0MsU0FBaUMsRUFBRSxTQUFpQixFQUFFLE1BQWMsRUFBRSxZQUFZO1lBRTlHLElBQUksSUFBSSxHQUFhLElBQUksbUJBQVEsRUFBRSxDQUFDO1lBRXBDLElBQUksWUFBWSxHQUE2QixTQUFTLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUVoRyxJQUFHLFlBQVksS0FBSyxTQUFTLEVBQUU7Z0JBQzNCLElBQUksR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3ZDO2lCQUNJO2dCQUNELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUkseUNBQW1CLENBQUMsMkNBQW9CLENBQUMsOEJBQThCLEVBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7YUFDcEg7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNXLDZDQUEwQixHQUF4QyxVQUF5QyxvQkFBNkI7WUFFbEUsMkJBQTJCO1lBQzNCLElBQUksUUFBUSxHQUFHLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUVuRSxpQ0FBaUM7WUFDakMsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUM7WUFFekMsMEJBQTBCO1lBQzFCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUVmLGtEQUFrRDtZQUNsRCxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBRXZELE9BQU8sSUFBSSw2QkFBYSxDQUFDLFNBQVMsRUFBQyxNQUFNLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDVyw2Q0FBMEIsR0FBeEMsVUFBeUMsU0FBaUIsRUFBRSxNQUFjO1lBQ3RFLE9BQU8sU0FBUyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxNQUFNLENBQUM7UUFDeEQsQ0FBQztRQXhFdUIscUNBQWtCLEdBQVcsR0FBRyxDQUFDO1FBeUU3RCx5QkFBQztLQUFBLEFBM0VELElBMkVDO0lBM0VZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRleHRJdGVtIH0gZnJvbSBcIi4vdGV4dEl0ZW1cIjtcclxuaW1wb3J0IHsgVGV4dFF1YWxpZmllciB9IGZyb20gXCIuL3RleHRSZXNvdXJjZUhhbmRsaW5nL3RleHRRdWFsaWZpZXJcIjtcclxuaW1wb3J0IHsgVGV4dFJlc291cmNlIH0gZnJvbSBcIi4vdGV4dFJlc291cmNlSGFuZGxpbmcvdGV4dFJlc291cmNlXCI7XHJcbmltcG9ydCB7IFRleHRSZXNvdXJjZXNDb250YWluZXIgfSBmcm9tIFwiLi90ZXh0UmVzb3VyY2VIYW5kbGluZy90ZXh0UmVzb3VyY2VzQ29udGFpbmVyXCI7XHJcbmltcG9ydCB7IFRleHRTeXN0ZW1FcnJvclR5cGVzIH0gZnJvbSBcIi4vZXJyb3JIYW5kbGluZy90ZXh0U3lzdGVtRXJyb3JUeXBlc1wiO1xyXG5pbXBvcnQgeyBUZXh0U3lzdGVtRXJyb3JJdGVtIH0gZnJvbSBcIi4vZXJyb3JIYW5kbGluZy90ZXh0U3lzdGVtRXJyb3JJdGVtXCI7XHJcblxyXG4vKipcclxuICogU3RhdGljIGNsYXNzIHRoYXQgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyBmb3IgdGhlIHRleHRQcm92aWRlclxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBUZXh0Rm9ybWF0dGVySGVscGVyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVGV4dFByb3ZpZGVySGVscGVyIHtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgbmFtZXNwYWNlU2VwZXJhdG9yOiBzdHJpbmcgPSBcIi9cIjtcclxuXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yICgpIHt9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWFyY2hlcyBmb3IgdGV4dCBkYXRhIGluIHRoZSB0ZXh0IHJlY291cnNlcy4gXHJcbiAgICAgKiBJZiBub3RoaW5nIGlzIGZvdW5kIHRoYW4gYSBzcGVjaWZpYyBlcnJvciBpcyBwdXNoZWQgdG8gdGhlIG91dHB1dCBpdGVtLlxyXG4gICAgICpcclxuICAgICAqIEBwdWJsaWNcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7VGV4dFJlc291cmNlc0NvbnRhaW5lcn0gcmVjb3Vyc2VzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZXNwYWNlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dElkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2VDb2RlXHJcbiAgICAgKiBAcmV0dXJuIHsqfSAge1RleHRJdGVtfVxyXG4gICAgICogQG1lbWJlcm9mIFRleHRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFRleHROb0ZhbGxiYWNrKHJlY291cnNlczogVGV4dFJlc291cmNlc0NvbnRhaW5lciwgbmFtZXNwYWNlOiBzdHJpbmcsIHRleHRJZDogc3RyaW5nLCBsYW5ndWFnZUNvZGUpOiBUZXh0SXRlbSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHRleHQ6IFRleHRJdGVtID0gbmV3IFRleHRJdGVtKCk7XHJcblxyXG4gICAgICAgIGxldCB0ZXh0UmVzb3VyY2U6IFRleHRSZXNvdXJjZSB8IHVuZGVmaW5lZCA9IHJlY291cnNlcy5nZXRUZXh0UmVzb3VyY2UobmFtZXNwYWNlLCBsYW5ndWFnZUNvZGUpOyAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICBpZih0ZXh0UmVzb3VyY2UgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0ZXh0ID0gdGV4dFJlc291cmNlLmdldFRleHQodGV4dElkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRleHQuZXJyb3JzLnB1c2gobmV3IFRleHRTeXN0ZW1FcnJvckl0ZW0oVGV4dFN5c3RlbUVycm9yVHlwZXMuUmVhZEFjY2Vzc1RvVGV4dERhdGFiYXNlRmFpbGVkLG5hbWVzcGFjZSwgdGV4dElkKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0ZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VwZXJhdGUgYSBzdHJpbmcgXCJuYW1lc3BhY2VQYXJ0MS8uLi4vbmFtZXBhY2VQYXJ0bi9UZXh0SWQxXCIgaW50bzogIFxyXG4gICAgICogbmFtZXNwYWNlID0gXCJuYW1lc3BhY2VQYXJ0MS8uLi4vbmFtZXBhY2VQYXJ0blwiIGFuZCBcclxuICAgICAqIHRleHRJZCA9IFwiVGV4dElkMVwiXHJcbiAgICAgKiBcclxuICAgICAqIEBwdWJsaWMgXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZnVsbHlRdWFsaWZpZWRUZXh0SWRcclxuICAgICAqIEByZXR1cm4geyp9ICB7VGV4dFF1YWxpZmllcn1cclxuICAgICAqIEBtZW1iZXJvZiBUZXh0UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBkZWNvZGVGdWxseVF1YWxpZmllZFRleHRJZChmdWxseVF1YWxpZmllZFRleHRJZCA6IHN0cmluZykgOiBUZXh0UXVhbGlmaWVyIHtcclxuXHJcbiAgICAgICAgLy8gc2VwZXJhdGUgZWxlbWVudHMgYnkgXCIvXCJcclxuICAgICAgICBsZXQgZWxlbWVudHMgPSBmdWxseVF1YWxpZmllZFRleHRJZC5zcGxpdCh0aGlzLm5hbWVzcGFjZVNlcGVyYXRvcik7IFxyXG5cclxuICAgICAgICAvLyB0aGUgbGFzdCBlbGVtZW50IGlzIHRoZSB0ZXh0SWRcclxuICAgICAgICBsZXQgdGV4dElkID0gZWxlbWVudHNbZWxlbWVudHMubGVuZ3RoLTFdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHJlbW92ZSB0aGUgbGFzdCBlbGVtZW50XHJcbiAgICAgICAgZWxlbWVudHMucG9wKCk7IFxyXG5cclxuICAgICAgICAvLyBjb25jYXRlbmF0ZSBhbGwgZWxtZW5ldHMgaW5zcnRpbmcgdGhlIFwiL1wiIGFnYWluXHJcbiAgICAgICAgbGV0IG5hbWVzcGFjZSA9IGVsZW1lbnRzLmpvaW4odGhpcy5uYW1lc3BhY2VTZXBlcmF0b3IpO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFRleHRRdWFsaWZpZXIobmFtZXNwYWNlLHRleHRJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb21iaW5lcyBuYW1lc3BhY2UgYW5kIFRleHRJZCB0byBhIGZ1bGx5IHF1YWxpZmllZCB0ZXh0SWRcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZXNwYWNlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dElkXHJcbiAgICAgKiBAcmV0dXJuIHsqfSAge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBUZXh0UHJvdmlkZXJIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVGdWxseVF1YWxpZmllZFRleHRJZChuYW1lc3BhY2U6IHN0cmluZywgdGV4dElkOiBzdHJpbmcpIDogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gbmFtZXNwYWNlICsgdGhpcy5uYW1lc3BhY2VTZXBlcmF0b3IgKyB0ZXh0SWQ7XHJcbiAgICB9XHJcbn0iXX0=