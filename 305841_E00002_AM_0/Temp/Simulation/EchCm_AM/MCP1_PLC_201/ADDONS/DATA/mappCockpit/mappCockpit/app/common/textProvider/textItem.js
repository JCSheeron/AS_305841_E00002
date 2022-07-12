define(["require", "exports", "./textFormatter/editStringHelper", "./textResourceHandling/textQualifier"], function (require, exports, editStringHelper_1, textQualifier_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Used as return value for the usage of the textsystem
     *
     * @export
     * @class TextItem
     */
    var TextItem = /** @class */ (function () {
        // set default values
        function TextItem(value, errors) {
            if (value === void 0) { value = ""; }
            if (errors === void 0) { errors = new Array(); }
            this._value = value;
            this._errors = errors;
        }
        Object.defineProperty(TextItem.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (value) {
                this._value = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextItem.prototype, "errors", {
            get: function () {
                return this._errors;
            },
            set: function (errors) {
                this._errors = errors;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Returns true wenn no error occured, false otherwise
         *
         * @return {*}  {boolean}
         * @memberof TextItem
         */
        TextItem.prototype.isValid = function () {
            if (this.errors.length === 0) {
                return true;
            }
            return false;
        };
        /**
         * In case of errors that occured due to invalid access of the textsystem,
         * all those paths are returned as array of strings.
         *
         * @return {*}  {Array<string>}
         * @memberof TextItem
         */
        TextItem.prototype.getUnresolvedFullyQualifiedTextIds = function () {
            var paths = new Array();
            this._errors.forEach(function (errorItem) {
                if (errorItem.fullyQualifiedTextId !== undefined) {
                    paths.push(errorItem.fullyQualifiedTextId);
                }
            });
            return paths;
        };
        /**
         * In case of errors that occured due to invalid access of the textsystem,
         * all those paths are returned as array of TextQualifier (namespace & textId seperated).
         *
         * @return {*}  {Array<TextQualifier>}
         * @memberof TextItem
         */
        TextItem.prototype.getUnresolvedTextQualifiers = function () {
            var textQualifier = new Array();
            this._errors.forEach(function (errorItem) {
                if (errorItem.namespace !== undefined && errorItem.textId !== undefined) {
                    textQualifier.push(new textQualifier_1.TextQualifier(errorItem.namespace, errorItem.textId));
                }
            });
            return textQualifier;
        };
        /**
         * Returns an array of TextSystemErrorTypes (= number enum with correct error number)
         * Includes all errors occured during processing a function.
         *
         * @return {*}  {Array<TextSystemErrorTypes>}
         * @memberof TextItem
         */
        TextItem.prototype.getErrorNumbers = function () {
            var errorNumbers = new Array();
            this._errors.forEach(function (errorItem) { return errorNumbers.push(errorItem.statusNumber); });
            return errorNumbers;
        };
        /**
         * Returns true when all accesses to the textsystem are valid, false otherwise
         *
         * @return {*}  {boolean}
         * @memberof TextItem
         */
        TextItem.prototype.allTextResourcesFound = function () {
            var index = this._errors.findIndex(function (entry) { return entry.namespace !== undefined; });
            return !editStringHelper_1.EditStringHelper.indexIsValid(index);
        };
        return TextItem;
    }());
    exports.TextItem = TextItem;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dEl0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi90ZXh0UHJvdmlkZXIvdGV4dEl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBS0E7Ozs7O09BS0c7SUFDSDtRQW9CSSxxQkFBcUI7UUFDckIsa0JBQW9CLEtBQWtCLEVBQUUsTUFBcUU7WUFBekYsc0JBQUEsRUFBQSxVQUFrQjtZQUFFLHVCQUFBLEVBQUEsYUFBeUMsS0FBSyxFQUF1QjtZQUN6RyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUMxQixDQUFDO1FBRUQsc0JBQVcsMkJBQUs7aUJBSWhCO2dCQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUN2QixDQUFDO2lCQU5ELFVBQWtCLEtBQWE7Z0JBQzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLENBQUM7OztXQUFBO1FBTUQsc0JBQVcsNEJBQU07aUJBSWpCO2dCQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUN4QixDQUFDO2lCQU5ELFVBQW1CLE1BQWtDO2dCQUNqRCxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztZQUMxQixDQUFDOzs7V0FBQTtRQU1EOzs7OztXQUtHO1FBQ0ksMEJBQU8sR0FBZDtZQUNJLElBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUN6QixPQUFPLElBQUksQ0FBQzthQUNmO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLHFEQUFrQyxHQUF6QztZQUNJLElBQUksS0FBSyxHQUFrQixJQUFJLEtBQUssRUFBVSxDQUFDO1lBRS9DLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUEsU0FBUztnQkFDMUIsSUFBRyxTQUFTLENBQUMsb0JBQW9CLEtBQUssU0FBUyxFQUFFO29CQUM3QyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2lCQUM5QztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLDhDQUEyQixHQUFsQztZQUNJLElBQUksYUFBYSxHQUF5QixJQUFJLEtBQUssRUFBaUIsQ0FBQztZQUVyRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFBLFNBQVM7Z0JBQzFCLElBQUcsU0FBUyxDQUFDLFNBQVMsS0FBSyxTQUFTLElBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7b0JBQ3BFLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSw2QkFBYSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7aUJBQ2hGO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxPQUFPLGFBQWEsQ0FBQztRQUN6QixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ksa0NBQWUsR0FBdEI7WUFDSSxJQUFJLFlBQVksR0FBZ0MsSUFBSSxLQUFLLEVBQXdCLENBQUM7WUFFbEYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQSxTQUFTLElBQUksT0FBQSxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBekMsQ0FBeUMsQ0FBQyxDQUFDO1lBRTdFLE9BQU8sWUFBWSxDQUFDO1FBQ3hCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNJLHdDQUFxQixHQUE1QjtZQUNJLElBQUksS0FBSyxHQUFXLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQTdCLENBQTZCLENBQUMsQ0FBQztZQUNuRixPQUFPLENBQUMsbUNBQWdCLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFDTCxlQUFDO0lBQUQsQ0FBQyxBQXRIRCxJQXNIQztJQXRIWSw0QkFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRleHRTeXN0ZW1FcnJvckl0ZW0gfSBmcm9tIFwiLi9lcnJvckhhbmRsaW5nL3RleHRTeXN0ZW1FcnJvckl0ZW1cIjtcclxuaW1wb3J0IHsgVGV4dFN5c3RlbUVycm9yVHlwZXMgfSBmcm9tIFwiLi9lcnJvckhhbmRsaW5nL3RleHRTeXN0ZW1FcnJvclR5cGVzXCI7XHJcbmltcG9ydCB7IEVkaXRTdHJpbmdIZWxwZXIgfSBmcm9tIFwiLi90ZXh0Rm9ybWF0dGVyL2VkaXRTdHJpbmdIZWxwZXJcIjtcclxuaW1wb3J0IHsgVGV4dFF1YWxpZmllciB9IGZyb20gXCIuL3RleHRSZXNvdXJjZUhhbmRsaW5nL3RleHRRdWFsaWZpZXJcIjtcclxuXHJcbi8qKlxyXG4gKiBVc2VkIGFzIHJldHVybiB2YWx1ZSBmb3IgdGhlIHVzYWdlIG9mIHRoZSB0ZXh0c3lzdGVtIFxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBUZXh0SXRlbVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFRleHRJdGVtIHtcclxuICAgXHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIHRoZSByZXN1bHRpbmcgc3RyaW5nIG9mIHRleHRzeXN0ZW0gZnVuY3Rpb25zXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgVGV4dEl0ZW1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfdmFsdWU6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIGFsbCBlcnJvcnMgb2NjdXJlZCBkdXJpbmcgYSBmdW5jdGlvbiBleGVjdXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUge0FycmF5PFRleHRTeXN0ZW1FcnJvckl0ZW0+fVxyXG4gICAgICogQG1lbWJlcm9mIFRleHRJdGVtXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2Vycm9yczogQXJyYXk8VGV4dFN5c3RlbUVycm9ySXRlbT47XHJcblxyXG4gICAgLy8gc2V0IGRlZmF1bHQgdmFsdWVzXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IgKHZhbHVlOiBzdHJpbmcgPSBcIlwiLCBlcnJvcnM6IEFycmF5PFRleHRTeXN0ZW1FcnJvckl0ZW0+ID0gbmV3IEFycmF5PFRleHRTeXN0ZW1FcnJvckl0ZW0+KCkpIHtcclxuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuX2Vycm9ycyA9IGVycm9ycztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHZhbHVlICh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHZhbHVlICgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGVycm9ycyAoZXJyb3JzOiBBcnJheTxUZXh0U3lzdGVtRXJyb3JJdGVtPikge1xyXG4gICAgICAgIHRoaXMuX2Vycm9ycyA9IGVycm9ycztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGVycm9ycyAoKTogQXJyYXk8VGV4dFN5c3RlbUVycm9ySXRlbT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lcnJvcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgd2VubiBubyBlcnJvciBvY2N1cmVkLCBmYWxzZSBvdGhlcndpc2VcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHsqfSAge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgVGV4dEl0ZW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGlzVmFsaWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYodGhpcy5lcnJvcnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbiBjYXNlIG9mIGVycm9ycyB0aGF0IG9jY3VyZWQgZHVlIHRvIGludmFsaWQgYWNjZXNzIG9mIHRoZSB0ZXh0c3lzdGVtLFxyXG4gICAgICogYWxsIHRob3NlIHBhdGhzIGFyZSByZXR1cm5lZCBhcyBhcnJheSBvZiBzdHJpbmdzLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4geyp9ICB7QXJyYXk8c3RyaW5nPn1cclxuICAgICAqIEBtZW1iZXJvZiBUZXh0SXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0VW5yZXNvbHZlZEZ1bGx5UXVhbGlmaWVkVGV4dElkcygpOiBBcnJheTxzdHJpbmc+IHtcclxuICAgICAgICBsZXQgcGF0aHM6IEFycmF5PHN0cmluZz4gPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX2Vycm9ycy5mb3JFYWNoKGVycm9ySXRlbSA9PiB7XHJcbiAgICAgICAgICAgIGlmKGVycm9ySXRlbS5mdWxseVF1YWxpZmllZFRleHRJZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBwYXRocy5wdXNoKGVycm9ySXRlbS5mdWxseVF1YWxpZmllZFRleHRJZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHBhdGhzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW4gY2FzZSBvZiBlcnJvcnMgdGhhdCBvY2N1cmVkIGR1ZSB0byBpbnZhbGlkIGFjY2VzcyBvZiB0aGUgdGV4dHN5c3RlbSxcclxuICAgICAqIGFsbCB0aG9zZSBwYXRocyBhcmUgcmV0dXJuZWQgYXMgYXJyYXkgb2YgVGV4dFF1YWxpZmllciAobmFtZXNwYWNlICYgdGV4dElkIHNlcGVyYXRlZCkuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7Kn0gIHtBcnJheTxUZXh0UXVhbGlmaWVyPn1cclxuICAgICAqIEBtZW1iZXJvZiBUZXh0SXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0VW5yZXNvbHZlZFRleHRRdWFsaWZpZXJzKCk6IEFycmF5PFRleHRRdWFsaWZpZXI+IHtcclxuICAgICAgICBsZXQgdGV4dFF1YWxpZmllcjogQXJyYXk8VGV4dFF1YWxpZmllcj4gPSBuZXcgQXJyYXk8VGV4dFF1YWxpZmllcj4oKTtcclxuXHJcbiAgICAgICAgdGhpcy5fZXJyb3JzLmZvckVhY2goZXJyb3JJdGVtID0+IHtcclxuICAgICAgICAgICAgaWYoZXJyb3JJdGVtLm5hbWVzcGFjZSAhPT0gdW5kZWZpbmVkICYmIGVycm9ySXRlbS50ZXh0SWQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGV4dFF1YWxpZmllci5wdXNoKG5ldyBUZXh0UXVhbGlmaWVyKGVycm9ySXRlbS5uYW1lc3BhY2UsIGVycm9ySXRlbS50ZXh0SWQpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gdGV4dFF1YWxpZmllcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYW4gYXJyYXkgb2YgVGV4dFN5c3RlbUVycm9yVHlwZXMgKD0gbnVtYmVyIGVudW0gd2l0aCBjb3JyZWN0IGVycm9yIG51bWJlcilcclxuICAgICAqIEluY2x1ZGVzIGFsbCBlcnJvcnMgb2NjdXJlZCBkdXJpbmcgcHJvY2Vzc2luZyBhIGZ1bmN0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4geyp9ICB7QXJyYXk8VGV4dFN5c3RlbUVycm9yVHlwZXM+fVxyXG4gICAgICogQG1lbWJlcm9mIFRleHRJdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRFcnJvck51bWJlcnMoKTogQXJyYXk8VGV4dFN5c3RlbUVycm9yVHlwZXM+IHtcclxuICAgICAgICBsZXQgZXJyb3JOdW1iZXJzOiBBcnJheTxUZXh0U3lzdGVtRXJyb3JUeXBlcz4gPSBuZXcgQXJyYXk8VGV4dFN5c3RlbUVycm9yVHlwZXM+KCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2Vycm9ycy5mb3JFYWNoKGVycm9ySXRlbSA9PiBlcnJvck51bWJlcnMucHVzaChlcnJvckl0ZW0uc3RhdHVzTnVtYmVyKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBlcnJvck51bWJlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgd2hlbiBhbGwgYWNjZXNzZXMgdG8gdGhlIHRleHRzeXN0ZW0gYXJlIHZhbGlkLCBmYWxzZSBvdGhlcndpc2VcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHsqfSAge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgVGV4dEl0ZW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGFsbFRleHRSZXNvdXJjZXNGb3VuZCgpIDogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGluZGV4OiBudW1iZXIgPSB0aGlzLl9lcnJvcnMuZmluZEluZGV4KGVudHJ5ID0+IGVudHJ5Lm5hbWVzcGFjZSAhPT0gdW5kZWZpbmVkKTtcclxuICAgICAgICByZXR1cm4gIUVkaXRTdHJpbmdIZWxwZXIuaW5kZXhJc1ZhbGlkKGluZGV4KTtcclxuICAgIH0gXHJcbn0iXX0=