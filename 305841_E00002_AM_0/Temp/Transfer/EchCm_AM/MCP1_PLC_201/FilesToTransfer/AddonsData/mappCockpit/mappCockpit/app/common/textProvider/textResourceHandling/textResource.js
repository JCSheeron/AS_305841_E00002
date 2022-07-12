define(["require", "exports", "../../persistence/settings", "../textItem", "../settingIds", "../errorHandling/textSystemErrorTypes", "../errorHandling/textSystemErrorItem"], function (require, exports, settings_1, textItem_1, settingIds_1, textSystemErrorTypes_1, textSystemErrorItem_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * A text resource includes all textData in a unique namespace + languageCode
     * Each text resource can have its own language cude
     *
     * @export
     * @class TextResource
     */
    var TextResource = /** @class */ (function () {
        /**
         * Creates an instance of TextResource.
         * @param {string} namespace
         * @param {Map<string,string>} texts
         * @param {string} languageCode
         * @param {boolean} [fullyLoaded=false]
         * @memberof TextResource
         */
        function TextResource(namespace, texts, languageCode, fullyLoaded) {
            if (fullyLoaded === void 0) { fullyLoaded = false; }
            /**
             * The keyvalue is the textID that is mapped to the string data
             *
             * @private
             * @memberof TextResource
             */
            this._textData = new Map();
            this._namespace = namespace;
            this._languageCode = languageCode;
            this._textData = texts;
            this._fullyLoaded = fullyLoaded;
        }
        Object.defineProperty(TextResource.prototype, "languageCode", {
            get: function () {
                return this._languageCode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextResource.prototype, "namespace", {
            get: function () {
                return this._namespace;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextResource.prototype, "textData", {
            get: function () {
                return this._textData;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Get the information if the textResource is allready fully loaded from the ArTextSystem
         *
         * @return {*}  {boolean}
         * @memberof TextResource
         */
        TextResource.prototype.isFullyLoaded = function () {
            return this._fullyLoaded;
        };
        /**
         * Get the data from the passed textID
         * If there is no entry found an error gets pushed in the TextItem
         *
         * @param {string} textId
         * @return {*}  {TextItem}
         * @memberof TextResource
         */
        TextResource.prototype.getText = function (textId) {
            var text = this._textData.get(textId);
            var foundText = new textItem_1.TextItem();
            if (text !== undefined) {
                foundText.value = text;
            }
            else {
                foundText.errors.push(new textSystemErrorItem_1.TextSystemErrorItem(textSystemErrorTypes_1.TextSystemErrorTypes.RequestedTextNotFound, this._namespace, textId));
            }
            return foundText;
        };
        /**
         * Prepare the TextResource to a suitable format for persiting
         *
         * @return {*}  {ISettings}
         * @memberof TextResource
         */
        TextResource.prototype.getSettings = function () {
            var settings = new settings_1.Settings(settingIds_1.SettingIds.TextResource);
            settings.setValue(settingIds_1.SettingIds.Namespace, this._namespace);
            settings.setValue(settingIds_1.SettingIds.LanguageCode, this._languageCode);
            settings.setValue(settingIds_1.SettingIds.TextData, this._textData);
            settings.setValue(settingIds_1.SettingIds.FullyLoaded, this._fullyLoaded);
            return settings;
        };
        /**
         * creates a textResource from persisting data
         *
         * @static
         * @param {ISettings} settings
         * @return {*}  {TextResource}
         * @memberof TextResource
         */
        TextResource.create = function (settings) {
            var settingsObj = settings_1.Settings.create(settings);
            var namespace = settingsObj.getValue(settingIds_1.SettingIds.Namespace);
            var languageCode = settingsObj.getValue(settingIds_1.SettingIds.LanguageCode);
            var textData = settingsObj.getValue(settingIds_1.SettingIds.TextData);
            var fullyLoaded = settingsObj.getValue(settingIds_1.SettingIds.FullyLoaded);
            return new TextResource(namespace, textData, languageCode, fullyLoaded);
        };
        return TextResource;
    }());
    exports.TextResource = TextResource;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dFJlc291cmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vdGV4dFByb3ZpZGVyL3RleHRSZXNvdXJjZUhhbmRsaW5nL3RleHRSZXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFPQTs7Ozs7O09BTUc7SUFDSDtRQXFDSTs7Ozs7OztXQU9HO1FBQ0gsc0JBQW1CLFNBQWlCLEVBQUUsS0FBd0IsRUFBRSxZQUFvQixFQUFFLFdBQTRCO1lBQTVCLDRCQUFBLEVBQUEsbUJBQTRCO1lBekJsSDs7Ozs7ZUFLRztZQUNLLGNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBaUIsQ0FBQztZQW9CekMsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7WUFDNUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUM7WUFDbEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7UUFDcEMsQ0FBQztRQUVELHNCQUFXLHNDQUFZO2lCQUF2QjtnQkFDSSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7WUFDOUIsQ0FBQzs7O1dBQUE7UUFFRCxzQkFBVyxtQ0FBUztpQkFBcEI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQzNCLENBQUM7OztXQUFBO1FBRUQsc0JBQVcsa0NBQVE7aUJBQW5CO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUMxQixDQUFDOzs7V0FBQTtRQUVEOzs7OztXQUtHO1FBQ0ksb0NBQWEsR0FBcEI7WUFDSSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDN0IsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSSw4QkFBTyxHQUFkLFVBQWUsTUFBZTtZQUUxQixJQUFJLElBQUksR0FBdUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUQsSUFBSSxTQUFTLEdBQWEsSUFBSSxtQkFBUSxFQUFFLENBQUM7WUFFekMsSUFBRyxJQUFJLEtBQUssU0FBUyxFQUFFO2dCQUNuQixTQUFTLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQzthQUMxQjtpQkFDSTtnQkFDRCxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLHlDQUFtQixDQUFDLDJDQUFvQixDQUFDLHFCQUFxQixFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQzthQUN2SDtZQUVELE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNJLGtDQUFXLEdBQWxCO1lBRUksSUFBSSxRQUFRLEdBQUcsSUFBSSxtQkFBUSxDQUFDLHVCQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFckQsUUFBUSxDQUFDLFFBQVEsQ0FBQyx1QkFBVSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDekQsUUFBUSxDQUFDLFFBQVEsQ0FBQyx1QkFBVSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDL0QsUUFBUSxDQUFDLFFBQVEsQ0FBQyx1QkFBVSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdkQsUUFBUSxDQUFDLFFBQVEsQ0FBQyx1QkFBVSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFN0QsT0FBTyxRQUFRLENBQUM7UUFDcEIsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDVyxtQkFBTSxHQUFwQixVQUFxQixRQUFvQjtZQUVyQyxJQUFJLFdBQVcsR0FBRyxtQkFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUU1QyxJQUFJLFNBQVMsR0FBWSxXQUFXLENBQUMsUUFBUSxDQUFDLHVCQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDcEUsSUFBSSxZQUFZLEdBQVksV0FBVyxDQUFDLFFBQVEsQ0FBQyx1QkFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzFFLElBQUksUUFBUSxHQUF3QixXQUFXLENBQUMsUUFBUSxDQUFDLHVCQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDOUUsSUFBSSxXQUFXLEdBQVksV0FBVyxDQUFDLFFBQVEsQ0FBQyx1QkFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRXhFLE9BQU8sSUFBSSxZQUFZLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDNUUsQ0FBQztRQUVMLG1CQUFDO0lBQUQsQ0FBQyxBQXZJRCxJQXVJQztJQXZJWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9wZXJzaXN0ZW5jZS9pbnRlcmZhY2VzL3NldHRpbmdzSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL3BlcnNpc3RlbmNlL3NldHRpbmdzXCI7XHJcbmltcG9ydCB7IFRleHRJdGVtIH0gZnJvbSBcIi4uL3RleHRJdGVtXCI7XHJcbmltcG9ydCB7IFNldHRpbmdJZHMgfSBmcm9tIFwiLi4vc2V0dGluZ0lkc1wiO1xyXG5pbXBvcnQgeyBUZXh0U3lzdGVtRXJyb3JUeXBlcyB9IGZyb20gXCIuLi9lcnJvckhhbmRsaW5nL3RleHRTeXN0ZW1FcnJvclR5cGVzXCI7XHJcbmltcG9ydCB7IFRleHRTeXN0ZW1FcnJvckl0ZW0gfSBmcm9tIFwiLi4vZXJyb3JIYW5kbGluZy90ZXh0U3lzdGVtRXJyb3JJdGVtXCI7XHJcblxyXG4vKipcclxuICogQSB0ZXh0IHJlc291cmNlIGluY2x1ZGVzIGFsbCB0ZXh0RGF0YSBpbiBhIHVuaXF1ZSBuYW1lc3BhY2UgKyBsYW5ndWFnZUNvZGVcclxuICogRWFjaCB0ZXh0IHJlc291cmNlIGNhbiBoYXZlIGl0cyBvd24gbGFuZ3VhZ2UgY3VkZVxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBUZXh0UmVzb3VyY2VcclxuICovXHJcbmV4cG9ydCBjbGFzcyBUZXh0UmVzb3VyY2Uge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVW5pcXVlIG5hbWVzcGFjZSBvZiB0aGUgdGV4dHJlc291cmNlIGluIGEgc3BlY2lmaWMgbGFuZ3VhZ2VcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBUZXh0UmVzb3VyY2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfbmFtZXNwYWNlIDogc3RyaW5nO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFNob3dzIHRoZSBsYW5nYXVnZSBvZiB0aGUgVGV4dFJlc291cmNlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgVGV4dFJlc291cmNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2xhbmd1YWdlQ29kZSA6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBrZXl2YWx1ZSBpcyB0aGUgdGV4dElEIHRoYXQgaXMgbWFwcGVkIHRvIHRoZSBzdHJpbmcgZGF0YVxyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRleHRSZXNvdXJjZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF90ZXh0RGF0YSA9IG5ldyBNYXA8c3RyaW5nLHN0cmluZz4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIElmIGEgbmFtZXNwYWNlIGlzIGZ1bGx5IGxvYWRlZCBmcm9tIEFyVGV4dFN5c3RlbSB0aGUgdmFsdWUgaXMgdHJ1ZSwgb3RoZXJ3aXNlIGZhbHNlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIFRleHRSZXNvdXJjZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9mdWxseUxvYWRlZDogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgVGV4dFJlc291cmNlLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVzcGFjZVxyXG4gICAgICogQHBhcmFtIHtNYXA8c3RyaW5nLHN0cmluZz59IHRleHRzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2VDb2RlXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtmdWxseUxvYWRlZD1mYWxzZV1cclxuICAgICAqIEBtZW1iZXJvZiBUZXh0UmVzb3VyY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKG5hbWVzcGFjZTogc3RyaW5nLCB0ZXh0czpNYXA8c3RyaW5nLHN0cmluZz4sIGxhbmd1YWdlQ29kZTogc3RyaW5nLCBmdWxseUxvYWRlZDogYm9vbGVhbiA9IGZhbHNlKXtcclxuICAgICAgICB0aGlzLl9uYW1lc3BhY2UgPSBuYW1lc3BhY2U7XHJcbiAgICAgICAgdGhpcy5fbGFuZ3VhZ2VDb2RlID0gbGFuZ3VhZ2VDb2RlO1xyXG4gICAgICAgIHRoaXMuX3RleHREYXRhID0gdGV4dHM7XHJcbiAgICAgICAgdGhpcy5fZnVsbHlMb2FkZWQgPSBmdWxseUxvYWRlZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGxhbmd1YWdlQ29kZSgpIDogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGFuZ3VhZ2VDb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgbmFtZXNwYWNlKCkgOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lc3BhY2U7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXQgdGV4dERhdGEoKSA6IE1hcDxzdHJpbmcsc3RyaW5nPntcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGV4dERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIGluZm9ybWF0aW9uIGlmIHRoZSB0ZXh0UmVzb3VyY2UgaXMgYWxscmVhZHkgZnVsbHkgbG9hZGVkIGZyb20gdGhlIEFyVGV4dFN5c3RlbVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4geyp9ICB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBUZXh0UmVzb3VyY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGlzRnVsbHlMb2FkZWQoKSA6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9mdWxseUxvYWRlZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgZGF0YSBmcm9tIHRoZSBwYXNzZWQgdGV4dElEXHJcbiAgICAgKiBJZiB0aGVyZSBpcyBubyBlbnRyeSBmb3VuZCBhbiBlcnJvciBnZXRzIHB1c2hlZCBpbiB0aGUgVGV4dEl0ZW1cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dElkXHJcbiAgICAgKiBAcmV0dXJuIHsqfSAge1RleHRJdGVtfVxyXG4gICAgICogQG1lbWJlcm9mIFRleHRSZXNvdXJjZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0VGV4dCh0ZXh0SWQgOiBzdHJpbmcpIDogVGV4dEl0ZW0ge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCB0ZXh0OiBzdHJpbmcgfCB1bmRlZmluZWQgPSB0aGlzLl90ZXh0RGF0YS5nZXQodGV4dElkKTtcclxuICAgICAgICBsZXQgZm91bmRUZXh0OiBUZXh0SXRlbSA9IG5ldyBUZXh0SXRlbSgpO1xyXG4gICAgICAgXHJcbiAgICAgICAgaWYodGV4dCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGZvdW5kVGV4dC52YWx1ZSA9IHRleHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBmb3VuZFRleHQuZXJyb3JzLnB1c2gobmV3IFRleHRTeXN0ZW1FcnJvckl0ZW0oVGV4dFN5c3RlbUVycm9yVHlwZXMuUmVxdWVzdGVkVGV4dE5vdEZvdW5kLCB0aGlzLl9uYW1lc3BhY2UsIHRleHRJZCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZvdW5kVGV4dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFByZXBhcmUgdGhlIFRleHRSZXNvdXJjZSB0byBhIHN1aXRhYmxlIGZvcm1hdCBmb3IgcGVyc2l0aW5nXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7Kn0gIHtJU2V0dGluZ3N9XHJcbiAgICAgKiBAbWVtYmVyb2YgVGV4dFJlc291cmNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRTZXR0aW5ncygpOiBJU2V0dGluZ3N7XHJcbiAgICAgICBcclxuICAgICAgICBsZXQgc2V0dGluZ3MgPSBuZXcgU2V0dGluZ3MoU2V0dGluZ0lkcy5UZXh0UmVzb3VyY2UpOyAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIHNldHRpbmdzLnNldFZhbHVlKFNldHRpbmdJZHMuTmFtZXNwYWNlLCB0aGlzLl9uYW1lc3BhY2UpO1xyXG4gICAgICAgIHNldHRpbmdzLnNldFZhbHVlKFNldHRpbmdJZHMuTGFuZ3VhZ2VDb2RlLCB0aGlzLl9sYW5ndWFnZUNvZGUpO1xyXG4gICAgICAgIHNldHRpbmdzLnNldFZhbHVlKFNldHRpbmdJZHMuVGV4dERhdGEsIHRoaXMuX3RleHREYXRhKTtcclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLkZ1bGx5TG9hZGVkLCB0aGlzLl9mdWxseUxvYWRlZCk7XHJcblxyXG4gICAgICAgIHJldHVybiBzZXR0aW5ncztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZXMgYSB0ZXh0UmVzb3VyY2UgZnJvbSBwZXJzaXN0aW5nIGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0lTZXR0aW5nc30gc2V0dGluZ3NcclxuICAgICAqIEByZXR1cm4geyp9ICB7VGV4dFJlc291cmNlfVxyXG4gICAgICogQG1lbWJlcm9mIFRleHRSZXNvdXJjZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShzZXR0aW5ncyA6IElTZXR0aW5ncykgOiBUZXh0UmVzb3VyY2V7XHJcblxyXG4gICAgICAgIGxldCBzZXR0aW5nc09iaiA9IFNldHRpbmdzLmNyZWF0ZShzZXR0aW5ncyk7XHJcblxyXG4gICAgICAgIGxldCBuYW1lc3BhY2UgOiBzdHJpbmcgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShTZXR0aW5nSWRzLk5hbWVzcGFjZSk7XHJcbiAgICAgICAgbGV0IGxhbmd1YWdlQ29kZSA6IHN0cmluZyA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuTGFuZ3VhZ2VDb2RlKTtcclxuICAgICAgICBsZXQgdGV4dERhdGEgOiBNYXA8c3RyaW5nLHN0cmluZz4gPSBzZXR0aW5nc09iai5nZXRWYWx1ZShTZXR0aW5nSWRzLlRleHREYXRhKTtcclxuICAgICAgICBsZXQgZnVsbHlMb2FkZWQ6IGJvb2xlYW4gPSBzZXR0aW5nc09iai5nZXRWYWx1ZShTZXR0aW5nSWRzLkZ1bGx5TG9hZGVkKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBUZXh0UmVzb3VyY2UobmFtZXNwYWNlLCB0ZXh0RGF0YSwgbGFuZ3VhZ2VDb2RlLCBmdWxseUxvYWRlZCk7XHJcbiAgICB9XHJcblxyXG59Il19