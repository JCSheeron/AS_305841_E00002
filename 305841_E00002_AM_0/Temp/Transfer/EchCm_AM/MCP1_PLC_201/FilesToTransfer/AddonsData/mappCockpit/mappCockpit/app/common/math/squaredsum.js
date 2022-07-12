define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SquaredSum = /** @class */ (function () {
        function SquaredSum() {
            this._data = [];
        }
        Object.defineProperty(SquaredSum.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (data) {
                if (data instanceof Array) {
                    this._data = data;
                }
                else {
                    this._data.push(data);
                }
            },
            enumerable: true,
            configurable: true
        });
        SquaredSum.prototype.calculate = function () {
            var sum = 0;
            for (var i = 0; i < this._data.length; i++) {
                sum += Math.pow(this._data[i], 2);
            }
            return sum;
        };
        return SquaredSum;
    }());
    exports.SquaredSum = SquaredSum;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3F1YXJlZHN1bS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL21hdGgvc3F1YXJlZHN1bS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFFQTtRQUFBO1lBRVksVUFBSyxHQUFrQixFQUFFLENBQUM7UUF1QnRDLENBQUM7UUFyQkcsc0JBQUksNEJBQUk7aUJBUVI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3RCLENBQUM7aUJBVkQsVUFBVSxJQUEwQjtnQkFDaEMsSUFBSSxJQUFJLFlBQVksS0FBSyxFQUFFO29CQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztpQkFDckI7cUJBQU07b0JBQ0gsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3pCO1lBQ0wsQ0FBQzs7O1dBQUE7UUFPRCw4QkFBUyxHQUFUO1lBQ0ksSUFBSSxHQUFHLEdBQVksQ0FBQyxDQUFDO1lBQ3JCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDeEMsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNyQztZQUNELE9BQU8sR0FBRyxDQUFDO1FBQ2YsQ0FBQztRQUVMLGlCQUFDO0lBQUQsQ0FBQyxBQXpCRCxJQXlCQztJQXpCWSxnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElNYXRoSW50ZXJmYWNlIH0gZnJvbSAnLi9pbnRlcmZhY2UvbWF0aE9wZXJhdG9ySW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTcXVhcmVkU3VtIGltcGxlbWVudHMgSU1hdGhJbnRlcmZhY2Uge1xyXG5cclxuICAgIHByaXZhdGUgX2RhdGE6IEFycmF5PG51bWJlcj4gPSBbXTtcclxuXHJcbiAgICBzZXQgZGF0YSAoZGF0YTogbnVtYmVyfEFycmF5PG51bWJlcj4pIHtcclxuICAgICAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGEucHVzaChkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRhdGEgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBjYWxjdWxhdGUgKCkge1xyXG4gICAgICAgIGxldCBzdW0gOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fZGF0YS5sZW5ndGg7IGkrKyApe1xyXG4gICAgICAgICAgICBzdW0gKz0gTWF0aC5wb3codGhpcy5fZGF0YVtpXSwgMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdW07XHJcbiAgICB9XHJcblxyXG59Il19