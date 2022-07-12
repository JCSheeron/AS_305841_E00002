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
     * Represents an XY signal and the YT signals it is made of.
     *
     * @class XYSignal
     * @extends {Signal}
     */
    var XYSignal = /** @class */ (function (_super) {
        __extends(XYSignal, _super);
        /**
         * Creates an instance of XYSignal.
         *
         * @param {string} name
         * @param {Array<Point>} items
         * @param {YTSignal} xSource YT signal on X axis
         * @param {YTSignal} ySource YT signal on Y axis
         * @memberof XYSignal
         */
        function XYSignal(name, items, xSource, ySource) {
            var _this = _super.call(this, name, items) || this;
            _this._xSource = xSource;
            _this._ySource = ySource;
            return _this;
        }
        Object.defineProperty(XYSignal.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(XYSignal.prototype, "items", {
            get: function () {
                return this._items;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(XYSignal.prototype, "xSource", {
            get: function () {
                return this._xSource;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(XYSignal.prototype, "ySource", {
            get: function () {
                return this._ySource;
            },
            enumerable: true,
            configurable: true
        });
        return XYSignal;
    }(signal_1.Signal));
    exports.XYSignal = XYSignal;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieHlTaWduYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi90cmFjZURhdGFDb252ZXJzaW9uL2NsYXNzZXMveHlTaWduYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUtBOzs7OztPQUtHO0lBQ0g7UUFBdUIsNEJBQU07UUFNekI7Ozs7Ozs7O1dBUUc7UUFDSCxrQkFBbUIsSUFBWSxFQUFFLEtBQW1CLEVBQUUsT0FBaUIsRUFBRSxPQUFpQjtZQUExRixZQUVJLGtCQUFNLElBQUksRUFBRSxLQUFLLENBQUMsU0FHckI7WUFGRyxLQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztZQUN4QixLQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQzs7UUFDNUIsQ0FBQztRQUVELHNCQUFXLDBCQUFJO2lCQUFmO2dCQUVJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN0QixDQUFDOzs7V0FBQTtRQUVELHNCQUFXLDJCQUFLO2lCQUFoQjtnQkFFSSxPQUFPLElBQUksQ0FBQyxNQUFzQixDQUFDO1lBQ3ZDLENBQUM7OztXQUFBO1FBRUQsc0JBQVcsNkJBQU87aUJBQWxCO2dCQUVJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUN6QixDQUFDOzs7V0FBQTtRQUVELHNCQUFXLDZCQUFPO2lCQUFsQjtnQkFFSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDekIsQ0FBQzs7O1dBQUE7UUFDTCxlQUFDO0lBQUQsQ0FBQyxBQXpDRCxDQUF1QixlQUFNLEdBeUM1QjtJQUVRLDRCQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgWVRTaWduYWwgfSBmcm9tIFwiLi95dFNpZ25hbFwiO1xyXG5pbXBvcnQgeyBTaWduYWwgfSBmcm9tIFwiLi9zaWduYWxcIjtcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS90eXBlcy9wb2ludFwiO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGFuIFhZIHNpZ25hbCBhbmQgdGhlIFlUIHNpZ25hbHMgaXQgaXMgbWFkZSBvZi5cclxuICpcclxuICogQGNsYXNzIFhZU2lnbmFsXHJcbiAqIEBleHRlbmRzIHtTaWduYWx9XHJcbiAqL1xyXG5jbGFzcyBYWVNpZ25hbCBleHRlbmRzIFNpZ25hbCB7XHJcblxyXG4gICAgcHJpdmF0ZSBfeFNvdXJjZTogWVRTaWduYWw7XHJcbiAgICBwcml2YXRlIF95U291cmNlOiBZVFNpZ25hbDtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFhZU2lnbmFsLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PFBvaW50Pn0gaXRlbXNcclxuICAgICAqIEBwYXJhbSB7WVRTaWduYWx9IHhTb3VyY2UgWVQgc2lnbmFsIG9uIFggYXhpc1xyXG4gICAgICogQHBhcmFtIHtZVFNpZ25hbH0geVNvdXJjZSBZVCBzaWduYWwgb24gWSBheGlzXHJcbiAgICAgKiBAbWVtYmVyb2YgWFlTaWduYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgaXRlbXM6IEFycmF5PFBvaW50PiwgeFNvdXJjZTogWVRTaWduYWwsIHlTb3VyY2U6IFlUU2lnbmFsKSB7XHJcblxyXG4gICAgICAgIHN1cGVyKG5hbWUsIGl0ZW1zKTtcclxuICAgICAgICB0aGlzLl94U291cmNlID0geFNvdXJjZTtcclxuICAgICAgICB0aGlzLl95U291cmNlID0geVNvdXJjZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpdGVtcygpOiBBcnJheTxQb2ludD4ge1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXMgYXMgQXJyYXk8UG9pbnQ+O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgeFNvdXJjZSgpOiBZVFNpZ25hbCB7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl94U291cmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgeVNvdXJjZSgpOiBZVFNpZ25hbCB7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl95U291cmNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBYWVNpZ25hbCB9OyJdfQ==