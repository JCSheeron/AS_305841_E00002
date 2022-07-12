define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Point = /** @class */ (function () {
        /**
         * Creates an instance of Point.
         * @param {number} x
         * @param {number} y
         * @memberof Point
         */
        function Point(x, y) {
            this._x = x;
            this._y = y;
        }
        Point.Empty = function () {
            var val;
            return new Point(val, val);
        };
        Point.distanceToPoint = function (firstPoint, secondPoint) {
            return Math.sqrt(Math.pow(secondPoint.x - firstPoint.x, 2) + Math.pow(secondPoint.y - firstPoint.y, 2));
        };
        Object.defineProperty(Point.prototype, "x", {
            get: function () {
                return this._x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Point.prototype, "y", {
            get: function () {
                return this._y;
            },
            enumerable: true,
            configurable: true
        });
        return Point;
    }());
    exports.Point = Point;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9pbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jb21tb24vcG9pbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBRUE7UUFhSTs7Ozs7V0FLRztRQUNILGVBQVksQ0FBUyxFQUFFLENBQVM7WUFDNUIsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDWixJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNoQixDQUFDO1FBbEJhLFdBQUssR0FBbkI7WUFDSSxJQUFJLEdBQUcsQ0FBQztZQUNSLE9BQU8sSUFBSSxLQUFLLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLENBQUM7UUFFYSxxQkFBZSxHQUE3QixVQUE4QixVQUFrQixFQUFFLFdBQW1CO1lBQ2pFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdHLENBQUM7UUFhQSxzQkFBVyxvQkFBQztpQkFBWjtnQkFDSSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDbkIsQ0FBQzs7O1dBQUE7UUFFRCxzQkFBVyxvQkFBQztpQkFBWjtnQkFDSSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDbkIsQ0FBQzs7O1dBQUE7UUFFTCxZQUFDO0lBQUQsQ0FBQyxBQWhDRCxJQWdDQztJQWhDWSxzQkFBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBQb2ludCBpbXBsZW1lbnRzIElQb2ludHtcclxuICAgIHByaXZhdGUgX3g6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX3k6IG51bWJlcjtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEVtcHR5KCk6UG9pbnR7XHJcbiAgICAgICAgbGV0IHZhbDtcclxuICAgICAgICByZXR1cm4gbmV3IFBvaW50KHZhbCx2YWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZGlzdGFuY2VUb1BvaW50KGZpcnN0UG9pbnQ6IElQb2ludCwgc2Vjb25kUG9pbnQ6IElQb2ludCk6IG51bWJlcntcclxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHNlY29uZFBvaW50LnggLSBmaXJzdFBvaW50LngsIDIpICsgTWF0aC5wb3coc2Vjb25kUG9pbnQueSAtIGZpcnN0UG9pbnQueSwgMikpO1xyXG4gICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFBvaW50LlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5XHJcbiAgICAgKiBAbWVtYmVyb2YgUG9pbnRcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuX3ggPSB4O1xyXG4gICAgICAgIHRoaXMuX3kgPSB5O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgeCgpOiBudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3g7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB5KCk6IG51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5feTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19