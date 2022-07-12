define(["require", "exports", "../textFormatter/editStringHelper", "./textResource"], function (require, exports, editStringHelper_1, textResource_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Holds all available TextResources
     *
     * @export
     * @class TextResourcesContainer
     */
    var TextResourcesContainer = /** @class */ (function () {
        function TextResourcesContainer() {
            this._textData = new Array();
        }
        /**
         * Finds a TextResource by the passed namespace and language Code
         * If no TextResource is found undefined is returned
         *
         * @param {string} namespace
         * @param {string} languageCode
         * @return {*}  {(TextResource | undefined)}
         * @memberof TextResourceContainer
         */
        TextResourcesContainer.prototype.getTextResource = function (namespace, languageCode) {
            return this._textData.find(function (textResource) { return textResource.namespace === namespace && textResource.languageCode === languageCode; });
        };
        /**
         * This method allows to add a new namespace with texts.
         * If the namespace exists in the given languages, the existing one is completely replaced.
         *
         * @param {TextResource} textResource
         * @memberof TextResourcesContainer
         */
        TextResourcesContainer.prototype.addReplaceTextResource = function (textResource) {
            // Search for the position of allready existing textResources with similar namespace and languagecode
            var index = this._textData.findIndex(function (entry) { return (entry.namespace === textResource.namespace && entry.languageCode === textResource.languageCode); });
            // If the index is valid, the textResource is replaced in the position of the index, otherwise the textResource is added
            if (editStringHelper_1.EditStringHelper.indexIsValid(index)) {
                this._textData.splice(index, 1, textResource);
            }
            else {
                this._textData.push(textResource);
            }
        };
        /**
         * If the textdata has a textresource of the passed namespace, the single text entry is added combined with its textId.
         * In case there is allready an entry to that textId, the old entry is overwridden.
         * IF no namespace is found, a new textresource including the passed single text is created.
         *
         * @param {string} namespace
         * @param {string} textId
         * @param {string} text
         * @param {string} languageCode
         * @memberof TextResourcesContainer
         */
        TextResourcesContainer.prototype.addReplaceFullyQualifiedTextId = function (namespace, textId, text, languageCode) {
            var namespaceExist = false;
            // Add or replace an entry to an allready existing Namespace
            this._textData.forEach(function (entry) {
                if (entry.namespace === namespace && entry.languageCode === languageCode) {
                    // Map.set either sets the text or replace the allready existing one
                    entry.textData.set(textId, text);
                    namespaceExist = true;
                }
            });
            // Create a new textresource in case the namespace is not found
            if (!namespaceExist) {
                var textMap = new Map();
                textMap.set(textId, text);
                this._textData.push(new textResource_1.TextResource(namespace, textMap, languageCode));
            }
        };
        /**
         * Checks if a namespace is allready fully loaded on the textsystem
         *
         * @param {*} namespace
         * @param {*} languageCode
         * @return {*}  {boolean}
         * @memberof TextResourcesContainer
         */
        TextResourcesContainer.prototype.isFullyLoadedNamespace = function (namespace, languageCode) {
            var isFullyLoadedNamespace = false;
            var textResource = this.getTextResource(namespace, languageCode);
            if (textResource !== undefined) {
                isFullyLoadedNamespace = textResource.isFullyLoaded();
            }
            return isFullyLoadedNamespace;
        };
        /**
         * Get all textResources in a suitable format for persisting
         *
         * @memberof TextResourcesContainer
         */
        TextResourcesContainer.prototype.getRecoursesSettings = function () {
            var textResourcesAsSettings = new Array();
            this._textData.forEach(function (resource) {
                textResourcesAsSettings.push(resource.getSettings());
            });
            return textResourcesAsSettings;
        };
        /**
         * All elements are deleted (also if this array is accessed by other references)
         *
         * @memberof TextResourcesContainer
         */
        TextResourcesContainer.prototype.clearAllTexts = function () {
            this._textData.splice(0, this._textData.length);
        };
        return TextResourcesContainer;
    }());
    exports.TextResourcesContainer = TextResourcesContainer;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dFJlc291cmNlc0NvbnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3RleHRQcm92aWRlci90ZXh0UmVzb3VyY2VIYW5kbGluZy90ZXh0UmVzb3VyY2VzQ29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUlBOzs7OztPQUtHO0lBQ0g7UUFXSTtZQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxLQUFLLEVBQWdCLENBQUM7UUFDL0MsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0ksZ0RBQWUsR0FBdEIsVUFBdUIsU0FBaUIsRUFBRSxZQUFvQjtZQUMxRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFFLFVBQUEsWUFBWSxJQUFJLE9BQUEsWUFBWSxDQUFDLFNBQVMsS0FBSyxTQUFTLElBQUksWUFBWSxDQUFDLFlBQVksS0FBSyxZQUFZLEVBQWxGLENBQWtGLENBQUMsQ0FBQztRQUNwSSxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ksdURBQXNCLEdBQTdCLFVBQThCLFlBQTBCO1lBRXBELHFHQUFxRztZQUNyRyxJQUFJLEtBQUssR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLENBQUMsS0FBSyxDQUFDLFNBQVMsS0FBSyxZQUFZLENBQUMsU0FBUyxJQUFJLEtBQUssQ0FBQyxZQUFZLEtBQUssWUFBWSxDQUFDLFlBQVksQ0FBQyxFQUFoRyxDQUFnRyxDQUFDLENBQUM7WUFFeEosd0hBQXdIO1lBQ3hILElBQUcsbUNBQWdCLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNyQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO2FBQ2pEO2lCQUNJO2dCQUNELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ3JDO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSSwrREFBOEIsR0FBckMsVUFBc0MsU0FBaUIsRUFBRSxNQUFjLEVBQUUsSUFBWSxFQUFFLFlBQW9CO1lBRXZHLElBQUksY0FBYyxHQUFZLEtBQUssQ0FBQztZQUVwQyw0REFBNEQ7WUFDNUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO2dCQUN4QixJQUFHLEtBQUssQ0FBQyxTQUFTLEtBQUssU0FBUyxJQUFJLEtBQUssQ0FBQyxZQUFZLEtBQUssWUFBWSxFQUFFO29CQUNyRSxvRUFBb0U7b0JBQ3BFLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDakMsY0FBYyxHQUFHLElBQUksQ0FBQztpQkFDekI7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILCtEQUErRDtZQUMvRCxJQUFHLENBQUMsY0FBYyxFQUFFO2dCQUNoQixJQUFJLE9BQU8sR0FBeUIsSUFBSSxHQUFHLEVBQWtCLENBQUM7Z0JBQzlELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLDJCQUFZLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO2FBQzNFO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSSx1REFBc0IsR0FBN0IsVUFBOEIsU0FBaUIsRUFBRSxZQUFvQjtZQUNqRSxJQUFJLHNCQUFzQixHQUFZLEtBQUssQ0FBQztZQUM1QyxJQUFJLFlBQVksR0FBNkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDM0YsSUFBRyxZQUFZLEtBQUssU0FBUyxFQUFFO2dCQUMzQixzQkFBc0IsR0FBRyxZQUFZLENBQUMsYUFBYSxFQUFFLENBQUM7YUFDekQ7WUFDRCxPQUFPLHNCQUFzQixDQUFDO1FBQ2xDLENBQUM7UUFFRDs7OztXQUlHO1FBQ0kscURBQW9CLEdBQTNCO1lBRUksSUFBSSx1QkFBdUIsR0FBcUIsSUFBSSxLQUFLLEVBQWEsQ0FBQztZQUV2RSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFFBQVE7Z0JBQzVCLHVCQUF1QixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztZQUN6RCxDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sdUJBQXVCLENBQUM7UUFDbkMsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSSw4Q0FBYSxHQUFwQjtZQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25ELENBQUM7UUFDTCw2QkFBQztJQUFELENBQUMsQUExSEQsSUEwSEM7SUExSFksd0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL3BlcnNpc3RlbmNlL2ludGVyZmFjZXMvc2V0dGluZ3NJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgRWRpdFN0cmluZ0hlbHBlciB9IGZyb20gXCIuLi90ZXh0Rm9ybWF0dGVyL2VkaXRTdHJpbmdIZWxwZXJcIjtcclxuaW1wb3J0IHsgVGV4dFJlc291cmNlIH0gZnJvbSBcIi4vdGV4dFJlc291cmNlXCI7XHJcblxyXG4vKipcclxuICogSG9sZHMgYWxsIGF2YWlsYWJsZSBUZXh0UmVzb3VyY2VzXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIFRleHRSZXNvdXJjZXNDb250YWluZXJcclxuICovXHJcbmV4cG9ydCBjbGFzcyBUZXh0UmVzb3VyY2VzQ29udGFpbmVyIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnRhaW5lciBob2xkaW5nIGFsbCBkZWNsYXJlZCB0ZXh0UmVzb3VyY2VzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIHtBcnJheTxUZXh0UmVzb3VyY2U+fVxyXG4gICAgICogQG1lbWJlcm9mIFRleHRSZXNvdXJjZUNvbnRhaW5lclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF90ZXh0RGF0YTogQXJyYXk8VGV4dFJlc291cmNlPjtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fdGV4dERhdGEgPSBuZXcgQXJyYXk8VGV4dFJlc291cmNlPigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmluZHMgYSBUZXh0UmVzb3VyY2UgYnkgdGhlIHBhc3NlZCBuYW1lc3BhY2UgYW5kIGxhbmd1YWdlIENvZGVcclxuICAgICAqIElmIG5vIFRleHRSZXNvdXJjZSBpcyBmb3VuZCB1bmRlZmluZWQgaXMgcmV0dXJuZWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZXNwYWNlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2VDb2RlXHJcbiAgICAgKiBAcmV0dXJuIHsqfSAgeyhUZXh0UmVzb3VyY2UgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFRleHRSZXNvdXJjZUNvbnRhaW5lclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0VGV4dFJlc291cmNlKG5hbWVzcGFjZTogc3RyaW5nLCBsYW5ndWFnZUNvZGU6IHN0cmluZykgOiBUZXh0UmVzb3VyY2UgfCB1bmRlZmluZWQgeyAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzLl90ZXh0RGF0YS5maW5kKCB0ZXh0UmVzb3VyY2UgPT4gdGV4dFJlc291cmNlLm5hbWVzcGFjZSA9PT0gbmFtZXNwYWNlICYmIHRleHRSZXNvdXJjZS5sYW5ndWFnZUNvZGUgPT09IGxhbmd1YWdlQ29kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBhbGxvd3MgdG8gYWRkIGEgbmV3IG5hbWVzcGFjZSB3aXRoIHRleHRzLiBcclxuICAgICAqIElmIHRoZSBuYW1lc3BhY2UgZXhpc3RzIGluIHRoZSBnaXZlbiBsYW5ndWFnZXMsIHRoZSBleGlzdGluZyBvbmUgaXMgY29tcGxldGVseSByZXBsYWNlZC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1RleHRSZXNvdXJjZX0gdGV4dFJlc291cmNlXHJcbiAgICAgKiBAbWVtYmVyb2YgVGV4dFJlc291cmNlc0NvbnRhaW5lclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkUmVwbGFjZVRleHRSZXNvdXJjZSh0ZXh0UmVzb3VyY2U6IFRleHRSZXNvdXJjZSl7XHJcblxyXG4gICAgICAgIC8vIFNlYXJjaCBmb3IgdGhlIHBvc2l0aW9uIG9mIGFsbHJlYWR5IGV4aXN0aW5nIHRleHRSZXNvdXJjZXMgd2l0aCBzaW1pbGFyIG5hbWVzcGFjZSBhbmQgbGFuZ3VhZ2Vjb2RlXHJcbiAgICAgICAgbGV0IGluZGV4OiBudW1iZXIgPSB0aGlzLl90ZXh0RGF0YS5maW5kSW5kZXgoZW50cnkgPT4gKGVudHJ5Lm5hbWVzcGFjZSA9PT0gdGV4dFJlc291cmNlLm5hbWVzcGFjZSAmJiBlbnRyeS5sYW5ndWFnZUNvZGUgPT09IHRleHRSZXNvdXJjZS5sYW5ndWFnZUNvZGUpKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBJZiB0aGUgaW5kZXggaXMgdmFsaWQsIHRoZSB0ZXh0UmVzb3VyY2UgaXMgcmVwbGFjZWQgaW4gdGhlIHBvc2l0aW9uIG9mIHRoZSBpbmRleCwgb3RoZXJ3aXNlIHRoZSB0ZXh0UmVzb3VyY2UgaXMgYWRkZWRcclxuICAgICAgICBpZihFZGl0U3RyaW5nSGVscGVyLmluZGV4SXNWYWxpZChpbmRleCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGV4dERhdGEuc3BsaWNlKGluZGV4LCAxLCB0ZXh0UmVzb3VyY2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fdGV4dERhdGEucHVzaCh0ZXh0UmVzb3VyY2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIElmIHRoZSB0ZXh0ZGF0YSBoYXMgYSB0ZXh0cmVzb3VyY2Ugb2YgdGhlIHBhc3NlZCBuYW1lc3BhY2UsIHRoZSBzaW5nbGUgdGV4dCBlbnRyeSBpcyBhZGRlZCBjb21iaW5lZCB3aXRoIGl0cyB0ZXh0SWQuXHJcbiAgICAgKiBJbiBjYXNlIHRoZXJlIGlzIGFsbHJlYWR5IGFuIGVudHJ5IHRvIHRoYXQgdGV4dElkLCB0aGUgb2xkIGVudHJ5IGlzIG92ZXJ3cmlkZGVuLlxyXG4gICAgICogSUYgbm8gbmFtZXNwYWNlIGlzIGZvdW5kLCBhIG5ldyB0ZXh0cmVzb3VyY2UgaW5jbHVkaW5nIHRoZSBwYXNzZWQgc2luZ2xlIHRleHQgaXMgY3JlYXRlZC4gXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVzcGFjZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRJZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZUNvZGVcclxuICAgICAqIEBtZW1iZXJvZiBUZXh0UmVzb3VyY2VzQ29udGFpbmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRSZXBsYWNlRnVsbHlRdWFsaWZpZWRUZXh0SWQobmFtZXNwYWNlOiBzdHJpbmcsIHRleHRJZDogc3RyaW5nLCB0ZXh0OiBzdHJpbmcsIGxhbmd1YWdlQ29kZTogc3RyaW5nKXtcclxuXHJcbiAgICAgICAgbGV0IG5hbWVzcGFjZUV4aXN0OiBib29sZWFuID0gZmFsc2U7IFxyXG5cclxuICAgICAgICAvLyBBZGQgb3IgcmVwbGFjZSBhbiBlbnRyeSB0byBhbiBhbGxyZWFkeSBleGlzdGluZyBOYW1lc3BhY2VcclxuICAgICAgICB0aGlzLl90ZXh0RGF0YS5mb3JFYWNoKGVudHJ5ID0+IHtcclxuICAgICAgICAgICAgaWYoZW50cnkubmFtZXNwYWNlID09PSBuYW1lc3BhY2UgJiYgZW50cnkubGFuZ3VhZ2VDb2RlID09PSBsYW5ndWFnZUNvZGUpIHtcclxuICAgICAgICAgICAgICAgIC8vIE1hcC5zZXQgZWl0aGVyIHNldHMgdGhlIHRleHQgb3IgcmVwbGFjZSB0aGUgYWxscmVhZHkgZXhpc3Rpbmcgb25lXHJcbiAgICAgICAgICAgICAgICBlbnRyeS50ZXh0RGF0YS5zZXQodGV4dElkLCB0ZXh0KTtcclxuICAgICAgICAgICAgICAgIG5hbWVzcGFjZUV4aXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgYSBuZXcgdGV4dHJlc291cmNlIGluIGNhc2UgdGhlIG5hbWVzcGFjZSBpcyBub3QgZm91bmRcclxuICAgICAgICBpZighbmFtZXNwYWNlRXhpc3QpIHtcclxuICAgICAgICAgICAgbGV0IHRleHRNYXA6IE1hcCA8c3RyaW5nLCBzdHJpbmc+ID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcclxuICAgICAgICAgICAgdGV4dE1hcC5zZXQodGV4dElkLCB0ZXh0KTtcclxuICAgICAgICAgICAgdGhpcy5fdGV4dERhdGEucHVzaChuZXcgVGV4dFJlc291cmNlKG5hbWVzcGFjZSwgdGV4dE1hcCwgbGFuZ3VhZ2VDb2RlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIGEgbmFtZXNwYWNlIGlzIGFsbHJlYWR5IGZ1bGx5IGxvYWRlZCBvbiB0aGUgdGV4dHN5c3RlbVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gbmFtZXNwYWNlXHJcbiAgICAgKiBAcGFyYW0geyp9IGxhbmd1YWdlQ29kZVxyXG4gICAgICogQHJldHVybiB7Kn0gIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIFRleHRSZXNvdXJjZXNDb250YWluZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGlzRnVsbHlMb2FkZWROYW1lc3BhY2UobmFtZXNwYWNlOiBzdHJpbmcsIGxhbmd1YWdlQ29kZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGlzRnVsbHlMb2FkZWROYW1lc3BhY2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBsZXQgdGV4dFJlc291cmNlOiBUZXh0UmVzb3VyY2UgfCB1bmRlZmluZWQgPSB0aGlzLmdldFRleHRSZXNvdXJjZShuYW1lc3BhY2UsIGxhbmd1YWdlQ29kZSk7XHJcbiAgICAgICAgaWYodGV4dFJlc291cmNlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaXNGdWxseUxvYWRlZE5hbWVzcGFjZSA9IHRleHRSZXNvdXJjZS5pc0Z1bGx5TG9hZGVkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpc0Z1bGx5TG9hZGVkTmFtZXNwYWNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGFsbCB0ZXh0UmVzb3VyY2VzIGluIGEgc3VpdGFibGUgZm9ybWF0IGZvciBwZXJzaXN0aW5nXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRleHRSZXNvdXJjZXNDb250YWluZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFJlY291cnNlc1NldHRpbmdzKCk6IEFycmF5PElTZXR0aW5ncz4ge1xyXG5cclxuICAgICAgICBsZXQgdGV4dFJlc291cmNlc0FzU2V0dGluZ3M6IEFycmF5PElTZXR0aW5ncz4gPSBuZXcgQXJyYXk8SVNldHRpbmdzPigpO1xyXG5cclxuICAgICAgICB0aGlzLl90ZXh0RGF0YS5mb3JFYWNoKChyZXNvdXJjZSkgPT4ge1xyXG4gICAgICAgICAgICB0ZXh0UmVzb3VyY2VzQXNTZXR0aW5ncy5wdXNoKHJlc291cmNlLmdldFNldHRpbmdzKCkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gdGV4dFJlc291cmNlc0FzU2V0dGluZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBbGwgZWxlbWVudHMgYXJlIGRlbGV0ZWQgKGFsc28gaWYgdGhpcyBhcnJheSBpcyBhY2Nlc3NlZCBieSBvdGhlciByZWZlcmVuY2VzKVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUZXh0UmVzb3VyY2VzQ29udGFpbmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbGVhckFsbFRleHRzKCkge1xyXG4gICAgICAgIHRoaXMuX3RleHREYXRhLnNwbGljZSgwLHRoaXMuX3RleHREYXRhLmxlbmd0aCk7XHJcbiAgICB9XHJcbn0iXX0=