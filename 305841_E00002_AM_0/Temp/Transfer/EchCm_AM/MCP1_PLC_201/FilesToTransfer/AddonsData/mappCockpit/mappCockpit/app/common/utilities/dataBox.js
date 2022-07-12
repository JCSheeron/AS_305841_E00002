define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Implements a container for data to be passed by refernce
     *
     * @export
     * @class DataBox
     */
    var DataBox = /** @class */ (function () {
        /**
         * Creates an instance of RefBox.
         * @param {*} value
         * @memberof DataBox
         */
        function DataBox(value) {
            this._value = value;
        }
        /**
         * Creates a RefBox instance and encapsulates the specified value;
         *
         * @static
         * @param {*} value
         * @memberof RefBox
         */
        DataBox.create = function (value) {
            return new DataBox(value);
        };
        /**
         * Boxes a value within a DataBox instance
         *
         * @static
         * @param {*} value
         * @returns {DataBox}
         * @memberof DataBox
         */
        DataBox.Box = function (value) {
            return DataBox.create(value);
        };
        /**
         * Unboxes the value from the DataBox
         *
         * @static
         * @param {DataBox} boxedValue
         * @returns {*}
         * @memberof DataBox
         */
        DataBox.Unbox = function (boxedValue) {
            return boxedValue._value;
        };
        /**
         * Boxes a value within a DataBox instance
         *
         * @static
         * @param {*} value
         * @returns {DataBox}
         * @memberof DataBox
         */
        DataBox.prototype.Box = function (value) {
            return DataBox.Box(value);
        };
        /**
         * Unboxes the value from the DataBox
         *
         * @static
         * @param {DataBox} boxedValue
         * @returns {*}
         * @memberof DataBox
         */
        DataBox.prototype.Unbox = function () {
            return DataBox.Unbox(this);
        };
        return DataBox;
    }());
    exports.DataBox = DataBox;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YUJveC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3V0aWxpdGllcy9kYXRhQm94LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBOzs7OztPQUtHO0lBQ0g7UUFZSTs7OztXQUlHO1FBQ0gsaUJBQW9CLEtBQVM7WUFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLGNBQU0sR0FBYixVQUFjLEtBQVM7WUFDbkIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNJLFdBQUcsR0FBVixVQUFXLEtBQVM7WUFDaEIsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ksYUFBSyxHQUFaLFVBQWEsVUFBa0I7WUFDM0IsT0FBTyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQzdCLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0gscUJBQUcsR0FBSCxVQUFJLEtBQVM7WUFDVCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUIsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSCx1QkFBSyxHQUFMO1lBQ0ksT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLENBQUM7UUFFTCxjQUFDO0lBQUQsQ0FBQyxBQWhGRCxJQWdGQztJQWhGWSwwQkFBTyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBJbXBsZW1lbnRzIGEgY29udGFpbmVyIGZvciBkYXRhIHRvIGJlIHBhc3NlZCBieSByZWZlcm5jZVxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBEYXRhQm94XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRGF0YUJveHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIGhvbGRzIHRoZSB2YWx1ZSB0byBiZSB0cmFuc3BvcnRlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBSZWZCb3hcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfdmFsdWU6YW55O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgUmVmQm94LlxyXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZVxyXG4gICAgICogQG1lbWJlcm9mIERhdGFCb3hcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3Rvcih2YWx1ZTphbnkpe1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgUmVmQm94IGluc3RhbmNlIGFuZCBlbmNhcHN1bGF0ZXMgdGhlIHNwZWNpZmllZCB2YWx1ZTtcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXHJcbiAgICAgKiBAbWVtYmVyb2YgUmVmQm94XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjcmVhdGUodmFsdWU6YW55KTpEYXRhQm94e1xyXG4gICAgICAgIHJldHVybiBuZXcgRGF0YUJveCh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCb3hlcyBhIHZhbHVlIHdpdGhpbiBhIERhdGFCb3ggaW5zdGFuY2VcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXHJcbiAgICAgKiBAcmV0dXJucyB7RGF0YUJveH1cclxuICAgICAqIEBtZW1iZXJvZiBEYXRhQm94XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBCb3godmFsdWU6YW55KTpEYXRhQm94e1xyXG4gICAgICAgIHJldHVybiBEYXRhQm94LmNyZWF0ZSh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVbmJveGVzIHRoZSB2YWx1ZSBmcm9tIHRoZSBEYXRhQm94XHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtEYXRhQm94fSBib3hlZFZhbHVlXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBEYXRhQm94XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBVbmJveChib3hlZFZhbHVlOkRhdGFCb3gpOmFueXtcclxuICAgICAgICByZXR1cm4gYm94ZWRWYWx1ZS5fdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCb3hlcyBhIHZhbHVlIHdpdGhpbiBhIERhdGFCb3ggaW5zdGFuY2VcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXHJcbiAgICAgKiBAcmV0dXJucyB7RGF0YUJveH1cclxuICAgICAqIEBtZW1iZXJvZiBEYXRhQm94XHJcbiAgICAgKi9cclxuICAgIEJveCh2YWx1ZTphbnkpOkRhdGFCb3h7XHJcbiAgICAgICAgcmV0dXJuIERhdGFCb3guQm94KHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVuYm94ZXMgdGhlIHZhbHVlIGZyb20gdGhlIERhdGFCb3hcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0RhdGFCb3h9IGJveGVkVmFsdWVcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIERhdGFCb3hcclxuICAgICAqL1xyXG4gICAgVW5ib3goKTphbnl7XHJcbiAgICAgICAgcmV0dXJuIERhdGFCb3guVW5ib3godGhpcyk7XHJcbiAgICB9XHJcbiAgIFxyXG59XHJcblxyXG4iXX0=