var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./valuePair"], function (require, exports, valuePair_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Data class implementing interface ISample
     *
     * @class Sample
     * @extends {ValuePair<number, number>}
     * @implements {ISample}
     */
    var Sample = /** @class */ (function (_super) {
        __extends(Sample, _super);
        /**
         * Creates an instance of Sample.
         *
         * @param {number} t
         * @param {number} y
         * @memberof Sample
         */
        function Sample(t, y) {
            return _super.call(this, t, y) || this;
        }
        Object.defineProperty(Sample.prototype, "t", {
            /**
             * Get method for the time.
             *
             * @readonly
             * @type {number}
             * @memberof Sample
             */
            get: function () {
                return this._value1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sample.prototype, "y", {
            /**
             * Get method for the value.
             *
             * @readonly
             * @type {number}
             * @memberof Sample
             */
            get: function () {
                return this._value2;
            },
            enumerable: true,
            configurable: true
        });
        return Sample;
    }(valuePair_1.ValuePair));
    exports.Sample = Sample;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FtcGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb3JlL3R5cGVzL3NhbXBsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBR0E7Ozs7OztPQU1HO0lBQ0g7UUFBcUIsMEJBQXlCO1FBRzFDOzs7Ozs7V0FNRztRQUNILGdCQUFhLENBQVMsRUFBRSxDQUFTO21CQUU3QixrQkFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2YsQ0FBQztRQVVELHNCQUFXLHFCQUFDO1lBUFo7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUN4QixDQUFDOzs7V0FBQTtRQVVELHNCQUFXLHFCQUFDO1lBUFo7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUN4QixDQUFDOzs7V0FBQTtRQUVMLGFBQUM7SUFBRCxDQUFDLEFBdkNELENBQXFCLHFCQUFTLEdBdUM3QjtJQUNRLHdCQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVNhbXBsZSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3NhbXBsZUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBWYWx1ZVBhaXIgfSBmcm9tIFwiLi92YWx1ZVBhaXJcIjtcclxuXHJcbi8qKlxyXG4gKiBEYXRhIGNsYXNzIGltcGxlbWVudGluZyBpbnRlcmZhY2UgSVNhbXBsZVxyXG4gKlxyXG4gKiBAY2xhc3MgU2FtcGxlXHJcbiAqIEBleHRlbmRzIHtWYWx1ZVBhaXI8bnVtYmVyLCBudW1iZXI+fVxyXG4gKiBAaW1wbGVtZW50cyB7SVNhbXBsZX1cclxuICovXHJcbmNsYXNzIFNhbXBsZSBleHRlbmRzIFZhbHVlUGFpcjxudW1iZXIsIG51bWJlcj4gaW1wbGVtZW50cyBJU2FtcGxle1xyXG4gICAgXHJcbiAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFNhbXBsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHlcclxuICAgICAqIEBtZW1iZXJvZiBTYW1wbGVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IgKHQ6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc3VwZXIodCwgeSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IG1ldGhvZCBmb3IgdGhlIHRpbWUuXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIFNhbXBsZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWUxO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBtZXRob2QgZm9yIHRoZSB2YWx1ZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2FtcGxlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgeSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTI7XHJcbiAgICB9XHJcblxyXG59XHJcbmV4cG9ydCB7IFNhbXBsZSB9OyJdfQ==