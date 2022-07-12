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
     * Represents a value at a certain value.
     *
     * @class Point
     * @extends {ValuePair<number, number>}
     * @implements {IPoint}
     */
    var Point = /** @class */ (function (_super) {
        __extends(Point, _super);
        /**
         * Creates an instance of Point.
         *
         * @param {number} x
         * @param {number} y
         * @memberof Point
         */
        function Point(x, y) {
            return _super.call(this, x, y) || this;
        }
        Object.defineProperty(Point.prototype, "x", {
            get: function () {
                return this._value1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Point.prototype, "y", {
            get: function () {
                return this._value2;
            },
            enumerable: true,
            configurable: true
        });
        return Point;
    }(valuePair_1.ValuePair));
    exports.Point = Point;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9pbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvcmUvdHlwZXMvcG9pbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUdBOzs7Ozs7T0FNRztJQUNIO1FBQW9CLHlCQUF5QjtRQUV6Qzs7Ozs7O1dBTUc7UUFDSCxlQUFZLENBQVMsRUFBRSxDQUFTO21CQUU1QixrQkFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2YsQ0FBQztRQUVELHNCQUFXLG9CQUFDO2lCQUFaO2dCQUVJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBRTtZQUN6QixDQUFDOzs7V0FBQTtRQUVELHNCQUFXLG9CQUFDO2lCQUFaO2dCQUVJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUN4QixDQUFDOzs7V0FBQTtRQUVMLFlBQUM7SUFBRCxDQUFDLEFBeEJELENBQW9CLHFCQUFTLEdBd0I1QjtJQUVRLHNCQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmFsdWVQYWlyIH0gZnJvbSBcIi4vdmFsdWVQYWlyXCI7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCI7XHJcblxyXG4vKipcclxuICogUmVwcmVzZW50cyBhIHZhbHVlIGF0IGEgY2VydGFpbiB2YWx1ZS5cclxuICpcclxuICogQGNsYXNzIFBvaW50XHJcbiAqIEBleHRlbmRzIHtWYWx1ZVBhaXI8bnVtYmVyLCBudW1iZXI+fVxyXG4gKiBAaW1wbGVtZW50cyB7SVBvaW50fVxyXG4gKi9cclxuY2xhc3MgUG9pbnQgZXh0ZW5kcyBWYWx1ZVBhaXI8bnVtYmVyLCBudW1iZXI+IGltcGxlbWVudHMgSVBvaW50IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgUG9pbnQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5XHJcbiAgICAgKiBAbWVtYmVyb2YgUG9pbnRcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICAgICAgICBcclxuICAgICAgICBzdXBlcih4LCB5KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHgoKTogbnVtYmVyIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlMSA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB5KCk6IG51bWJlciB7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTI7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgeyBQb2ludCB9OyJdfQ==