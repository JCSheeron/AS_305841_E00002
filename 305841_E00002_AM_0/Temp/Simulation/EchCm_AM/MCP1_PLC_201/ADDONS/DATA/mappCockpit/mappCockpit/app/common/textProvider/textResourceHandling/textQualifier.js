define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * A textqualifier holds the string information of the namespace, that refers to a text recourse
     * In the given namespaces are keys with text Ids, that are maped to the text data
     *
     * @export
     * @class TextQualifier
     */
    var TextQualifier = /** @class */ (function () {
        /**
         * Creates an instance of TextQualifier.
         *
         * @param {string} namespace
         * @param {string} textId
         * @memberof TextQualifier
         */
        function TextQualifier(namespace, textId) {
            this._namespace = "";
            this._textId = "";
            this._namespace = namespace;
            this._textId = textId;
        }
        Object.defineProperty(TextQualifier.prototype, "namespace", {
            get: function () {
                return this._namespace;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextQualifier.prototype, "textId", {
            get: function () {
                return this._textId;
            },
            enumerable: true,
            configurable: true
        });
        return TextQualifier;
    }());
    exports.TextQualifier = TextQualifier;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dFF1YWxpZmllci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3RleHRQcm92aWRlci90ZXh0UmVzb3VyY2VIYW5kbGluZy90ZXh0UXVhbGlmaWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBOzs7Ozs7T0FNRztJQUNIO1FBS0k7Ozs7OztXQU1HO1FBQ0gsdUJBQW1CLFNBQWlCLEVBQUUsTUFBYztZQVY1QyxlQUFVLEdBQVcsRUFBRSxDQUFDO1lBQ3hCLFlBQU8sR0FBVyxFQUFFLENBQUM7WUFVekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7WUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDMUIsQ0FBQztRQUVELHNCQUFXLG9DQUFTO2lCQUFwQjtnQkFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDM0IsQ0FBQzs7O1dBQUE7UUFFRCxzQkFBVyxpQ0FBTTtpQkFBakI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ3hCLENBQUM7OztXQUFBO1FBRUwsb0JBQUM7SUFBRCxDQUFDLEFBekJELElBeUJDO0lBekJZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEEgdGV4dHF1YWxpZmllciBob2xkcyB0aGUgc3RyaW5nIGluZm9ybWF0aW9uIG9mIHRoZSBuYW1lc3BhY2UsIHRoYXQgcmVmZXJzIHRvIGEgdGV4dCByZWNvdXJzZVxyXG4gKiBJbiB0aGUgZ2l2ZW4gbmFtZXNwYWNlcyBhcmUga2V5cyB3aXRoIHRleHQgSWRzLCB0aGF0IGFyZSBtYXBlZCB0byB0aGUgdGV4dCBkYXRhXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIFRleHRRdWFsaWZpZXJcclxuICovXHJcbmV4cG9ydCBjbGFzcyBUZXh0UXVhbGlmaWVye1xyXG5cclxuICAgIHByaXZhdGUgX25hbWVzcGFjZTogc3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgX3RleHRJZDogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgVGV4dFF1YWxpZmllci5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVzcGFjZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRJZFxyXG4gICAgICogQG1lbWJlcm9mIFRleHRRdWFsaWZpZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKG5hbWVzcGFjZTogc3RyaW5nLCB0ZXh0SWQ6IHN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5fbmFtZXNwYWNlID0gbmFtZXNwYWNlO1xyXG4gICAgICAgIHRoaXMuX3RleHRJZCA9IHRleHRJZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IG5hbWVzcGFjZSgpOnN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZXNwYWNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgdGV4dElkKCk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90ZXh0SWQ7XHJcbiAgICB9XHJcblxyXG59Il19