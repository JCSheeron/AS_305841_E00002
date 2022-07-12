define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Represents a pair of values.
     *
     * @class ValuePair
     * @implements {IValuePair<T1, T2>}
     * @template T1 Type of value1
     * @template T2 Type of value2
     */
    var ValuePair = /** @class */ (function () {
        /**
         * Creates an instance of ValuePair.
         *
         * @param {T1} value1
         * @param {T2} value2
         * @memberof ValuePair
         */
        function ValuePair(value1, value2) {
            this._value1 = value1;
            this._value2 = value2;
        }
        Object.defineProperty(ValuePair.prototype, "value1", {
            get: function () {
                return this._value1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ValuePair.prototype, "value2", {
            get: function () {
                return this._value2;
            },
            enumerable: true,
            configurable: true
        });
        return ValuePair;
    }());
    exports.ValuePair = ValuePair;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsdWVQYWlyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb3JlL3R5cGVzL3ZhbHVlUGFpci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFHQTs7Ozs7OztPQU9HO0lBQ0g7UUFLSTs7Ozs7O1dBTUc7UUFDSCxtQkFBbUIsTUFBVSxFQUFFLE1BQVU7WUFFckMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7WUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDMUIsQ0FBQztRQUVELHNCQUFXLDZCQUFNO2lCQUFqQjtnQkFFSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDeEIsQ0FBQzs7O1dBQUE7UUFFRCxzQkFBVyw2QkFBTTtpQkFBakI7Z0JBRUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ3hCLENBQUM7OztXQUFBO1FBQ0wsZ0JBQUM7SUFBRCxDQUFDLEFBM0JELElBMkJDO0lBRVEsOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJVmFsdWVQYWlyIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvdmFsdWVQYWlySW50ZXJmYWNlXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgYSBwYWlyIG9mIHZhbHVlcy5cclxuICpcclxuICogQGNsYXNzIFZhbHVlUGFpclxyXG4gKiBAaW1wbGVtZW50cyB7SVZhbHVlUGFpcjxUMSwgVDI+fVxyXG4gKiBAdGVtcGxhdGUgVDEgVHlwZSBvZiB2YWx1ZTFcclxuICogQHRlbXBsYXRlIFQyIFR5cGUgb2YgdmFsdWUyXHJcbiAqL1xyXG5jbGFzcyBWYWx1ZVBhaXI8VDEsIFQyPiBpbXBsZW1lbnRzIElWYWx1ZVBhaXI8VDEsIFQyPntcclxuXHJcbiAgICBwcm90ZWN0ZWQgX3ZhbHVlMTogVDE7XHJcbiAgICBwcm90ZWN0ZWQgX3ZhbHVlMjogVDI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFZhbHVlUGFpci5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtUMX0gdmFsdWUxXHJcbiAgICAgKiBAcGFyYW0ge1QyfSB2YWx1ZTJcclxuICAgICAqIEBtZW1iZXJvZiBWYWx1ZVBhaXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHZhbHVlMTogVDEsIHZhbHVlMjogVDIpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fdmFsdWUxID0gdmFsdWUxO1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlMiA9IHZhbHVlMjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHZhbHVlMSgpOiBUMSB7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB2YWx1ZTIoKTogVDIge1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWUyO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBWYWx1ZVBhaXIgfTsiXX0=