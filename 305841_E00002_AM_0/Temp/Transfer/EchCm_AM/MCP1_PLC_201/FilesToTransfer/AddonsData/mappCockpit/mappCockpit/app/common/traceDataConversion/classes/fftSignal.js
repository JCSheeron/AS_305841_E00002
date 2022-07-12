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
define(["require", "exports", "./signal"], function (require, exports, signal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Represents a FFT signal and the YT signal it is calculated from.
     *
     * @class FFTSignal
     * @extends {Signal}
     */
    var FFTSignal = /** @class */ (function (_super) {
        __extends(FFTSignal, _super);
        /**
         * Creates an instance of FFTSignal.
         *
         * @param {string} name
         * @param {Array<FrequencyAmplitude>} items
         * @param {YTSignal} source original YT signal
         * @memberof FFTSignal
         */
        function FFTSignal(name, items, source) {
            var _this = _super.call(this, name, items) || this;
            _this._source = source;
            return _this;
        }
        Object.defineProperty(FFTSignal.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FFTSignal.prototype, "items", {
            get: function () {
                return this._items;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FFTSignal.prototype, "source", {
            get: function () {
                return this._source;
            },
            enumerable: true,
            configurable: true
        });
        return FFTSignal;
    }(signal_1.Signal));
    exports.FFTSignal = FFTSignal;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmZ0U2lnbmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vdHJhY2VEYXRhQ29udmVyc2lvbi9jbGFzc2VzL2ZmdFNpZ25hbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBS0E7Ozs7O09BS0c7SUFDSDtRQUF3Qiw2QkFBTTtRQUsxQjs7Ozs7OztXQU9HO1FBQ0gsbUJBQW1CLElBQVksRUFBRSxLQUFnQyxFQUFFLE1BQWdCO1lBQW5GLFlBRUksa0JBQU0sSUFBSSxFQUFFLEtBQUssQ0FBQyxTQUVyQjtZQURHLEtBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDOztRQUMxQixDQUFDO1FBRUQsc0JBQVcsMkJBQUk7aUJBQWY7Z0JBRUksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3RCLENBQUM7OztXQUFBO1FBRUQsc0JBQVcsNEJBQUs7aUJBQWhCO2dCQUVJLE9BQU8sSUFBSSxDQUFDLE1BQW1DLENBQUM7WUFDcEQsQ0FBQzs7O1dBQUE7UUFFRCxzQkFBVyw2QkFBTTtpQkFBakI7Z0JBRUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ3hCLENBQUM7OztXQUFBO1FBRUwsZ0JBQUM7SUFBRCxDQUFDLEFBbENELENBQXdCLGVBQU0sR0FrQzdCO0lBRVEsOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBZVFNpZ25hbCB9IGZyb20gXCIuL3l0U2lnbmFsXCI7XHJcbmltcG9ydCB7IFNpZ25hbCB9IGZyb20gXCIuL3NpZ25hbFwiO1xyXG5pbXBvcnQgeyBGcmVxdWVuY3lBbXBsaXR1ZGUgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS90eXBlcy9mcmVxdWVuY3lBbXBsaXR1ZGVcIjtcclxuXHJcblxyXG4vKipcclxuICogUmVwcmVzZW50cyBhIEZGVCBzaWduYWwgYW5kIHRoZSBZVCBzaWduYWwgaXQgaXMgY2FsY3VsYXRlZCBmcm9tLlxyXG4gKlxyXG4gKiBAY2xhc3MgRkZUU2lnbmFsXHJcbiAqIEBleHRlbmRzIHtTaWduYWx9XHJcbiAqL1xyXG5jbGFzcyBGRlRTaWduYWwgZXh0ZW5kcyBTaWduYWwge1xyXG5cclxuICAgIHByaXZhdGUgX3NvdXJjZTogWVRTaWduYWw7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBGRlRTaWduYWwuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8RnJlcXVlbmN5QW1wbGl0dWRlPn0gaXRlbXNcclxuICAgICAqIEBwYXJhbSB7WVRTaWduYWx9IHNvdXJjZSBvcmlnaW5hbCBZVCBzaWduYWxcclxuICAgICAqIEBtZW1iZXJvZiBGRlRTaWduYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgaXRlbXM6IEFycmF5PEZyZXF1ZW5jeUFtcGxpdHVkZT4sIHNvdXJjZTogWVRTaWduYWwpIHtcclxuXHJcbiAgICAgICAgc3VwZXIobmFtZSwgaXRlbXMpO1xyXG4gICAgICAgIHRoaXMuX3NvdXJjZSA9IHNvdXJjZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpdGVtcygpOiBBcnJheTxGcmVxdWVuY3lBbXBsaXR1ZGU+IHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zIGFzIEFycmF5PEZyZXF1ZW5jeUFtcGxpdHVkZT47XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzb3VyY2UoKTogWVRTaWduYWwge1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fc291cmNlO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IHsgRkZUU2lnbmFsIH07Il19