define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * A 1-based list for storing all formatter input arguments,
     * which needs to be passed for using the argument data source
     *
     * @export
     * @class FormatterInputArgumentList
     */
    var FormatterInputArgumentList = /** @class */ (function () {
        function FormatterInputArgumentList() {
            this._argumentList = new Array();
        }
        /**
         * Get the IFormatterInputArgument from the FormatterInputArgumentList with the one based index passed
         * If the index is invalid undefined gets returned
         *
         * @param {number} index
         * @return {*}  {(IFormatterInputArgument | undefined)}
         * @memberof FormatterInputArgumentList
         */
        FormatterInputArgumentList.prototype.get = function (index) {
            if (index > 0 || index <= this._argumentList.length) {
                return this._argumentList[index - 1];
            }
        };
        /**
         * Pushes an IFormatterInputArgument to the 1-based argument list
         *
         * @param {IFormatterInputArgument} item
         * @return {*}  {number}
         * @memberof FormatterInputArgumentList
         */
        FormatterInputArgumentList.prototype.push = function (item) {
            return this._argumentList.push(item);
        };
        return FormatterInputArgumentList;
    }());
    exports.FormatterInputArgumentList = FormatterInputArgumentList;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0dGVySW5wdXRBcmd1bWVudExpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi90ZXh0UHJvdmlkZXIvdGV4dEZvcm1hdHRlci9mb3JtYXR0ZXJJbnB1dEFyZ3VtZW50cy9mb3JtYXR0ZXJJbnB1dEFyZ3VtZW50TGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFFQTs7Ozs7O09BTUc7SUFDSDtRQUlJO1lBQ0ksSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLEtBQUssRUFBMkIsQ0FBQztRQUM5RCxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNJLHdDQUFHLEdBQVYsVUFBVyxLQUFhO1lBQ3BCLElBQUcsS0FBSyxHQUFHLENBQUMsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUU7Z0JBQ2hELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdEM7UUFDTCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0kseUNBQUksR0FBWCxVQUFZLElBQTZCO1lBQ3JDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsQ0FBQztRQUNMLGlDQUFDO0lBQUQsQ0FBQyxBQWhDRCxJQWdDQztJQWhDWSxnRUFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJRm9ybWF0dGVySW5wdXRBcmd1bWVudCB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2UvZm9ybWF0dGVySW5wdXRBcmd1bWVudEludGVyZmFjZVwiO1xyXG5cclxuLyoqXHJcbiAqIEEgMS1iYXNlZCBsaXN0IGZvciBzdG9yaW5nIGFsbCBmb3JtYXR0ZXIgaW5wdXQgYXJndW1lbnRzLFxyXG4gKiB3aGljaCBuZWVkcyB0byBiZSBwYXNzZWQgZm9yIHVzaW5nIHRoZSBhcmd1bWVudCBkYXRhIHNvdXJjZVxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50TGlzdFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEZvcm1hdHRlcklucHV0QXJndW1lbnRMaXN0e1xyXG4gICAgXHJcbiAgICBwcml2YXRlIF9hcmd1bWVudExpc3Q6IEFycmF5PElGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50PjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLl9hcmd1bWVudExpc3QgPSBuZXcgQXJyYXk8SUZvcm1hdHRlcklucHV0QXJndW1lbnQ+KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIElGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50IGZyb20gdGhlIEZvcm1hdHRlcklucHV0QXJndW1lbnRMaXN0IHdpdGggdGhlIG9uZSBiYXNlZCBpbmRleCBwYXNzZWRcclxuICAgICAqIElmIHRoZSBpbmRleCBpcyBpbnZhbGlkIHVuZGVmaW5lZCBnZXRzIHJldHVybmVkXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxyXG4gICAgICogQHJldHVybiB7Kn0gIHsoSUZvcm1hdHRlcklucHV0QXJndW1lbnQgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIEZvcm1hdHRlcklucHV0QXJndW1lbnRMaXN0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQoaW5kZXg6IG51bWJlcik6IElGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50IHwgdW5kZWZpbmVkICB7XHJcbiAgICAgICAgaWYoaW5kZXggPiAwIHx8IGluZGV4IDw9IHRoaXMuX2FyZ3VtZW50TGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FyZ3VtZW50TGlzdFtpbmRleC0xXTtcclxuICAgICAgICB9XHJcbiAgICB9IFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHVzaGVzIGFuIElGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50IHRvIHRoZSAxLWJhc2VkIGFyZ3VtZW50IGxpc3RcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50fSBpdGVtXHJcbiAgICAgKiBAcmV0dXJuIHsqfSAge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50TGlzdFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcHVzaChpdGVtOiBJRm9ybWF0dGVySW5wdXRBcmd1bWVudCkgOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hcmd1bWVudExpc3QucHVzaChpdGVtKTtcclxuICAgIH1cclxufSJdfQ==