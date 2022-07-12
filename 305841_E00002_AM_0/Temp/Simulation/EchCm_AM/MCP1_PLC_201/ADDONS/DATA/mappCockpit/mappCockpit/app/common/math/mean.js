define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Mean = /** @class */ (function () {
        function Mean() {
            this._n = 0;
        }
        Object.defineProperty(Mean.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (data) {
                if (data instanceof Array || this._data === undefined) {
                    this._data = data;
                }
                else {
                    this._data += data;
                }
                this._n++;
            },
            enumerable: true,
            configurable: true
        });
        Mean.prototype.calculate = function () {
            var mean = 0;
            if (this._data instanceof Array) {
                for (var i = 0; i < this._data.length; i++) {
                    mean += this._data[i];
                }
                this._n = this._data.length;
            }
            else {
                mean = this._data;
            }
            return (mean / this._n);
        };
        return Mean;
    }());
    exports.Mean = Mean;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVhbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL21hdGgvbWVhbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFFQTtRQUFBO1lBR1ksT0FBRSxHQUFHLENBQUMsQ0FBQztRQTZCbkIsQ0FBQztRQTNCRyxzQkFBSSxzQkFBSTtpQkFTUjtnQkFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDdEIsQ0FBQztpQkFYRCxVQUFVLElBQTBCO2dCQUNoQyxJQUFJLElBQUksWUFBWSxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7b0JBQ25ELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2lCQUNyQjtxQkFBTTtvQkFDSCxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQztpQkFDdEI7Z0JBQ0QsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ2QsQ0FBQzs7O1dBQUE7UUFPRCx3QkFBUyxHQUFUO1lBQ0ksSUFBSSxJQUFJLEdBQVksQ0FBQyxDQUFDO1lBQ3RCLElBQUksSUFBSSxDQUFDLEtBQUssWUFBWSxLQUFLLEVBQUU7Z0JBQzdCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDeEMsSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3pCO2dCQUNELElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7YUFDL0I7aUJBQU07Z0JBQ0gsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7YUFDckI7WUFDRCxPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM1QixDQUFDO1FBRUwsV0FBQztJQUFELENBQUMsQUFoQ0QsSUFnQ0M7SUFoQ1ksb0JBQUkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTWF0aEludGVyZmFjZSB9IGZyb20gJy4vaW50ZXJmYWNlL21hdGhPcGVyYXRvckludGVyZmFjZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgTWVhbiBpbXBsZW1lbnRzIElNYXRoSW50ZXJmYWNlIHtcclxuXHJcbiAgICBwcml2YXRlIF9kYXRhO1xyXG4gICAgcHJpdmF0ZSBfbiA9IDA7XHJcblxyXG4gICAgc2V0IGRhdGEgKGRhdGE6IG51bWJlcnxBcnJheTxudW1iZXI+KSB7XHJcbiAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBBcnJheSB8fCB0aGlzLl9kYXRhID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YSArPSBkYXRhO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9uKys7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRhdGEgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBjYWxjdWxhdGUgKCkge1xyXG4gICAgICAgIGxldCBtZWFuIDogbnVtYmVyID0gMDtcclxuICAgICAgICBpZiAodGhpcy5fZGF0YSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fZGF0YS5sZW5ndGg7IGkrKyApe1xyXG4gICAgICAgICAgICAgICAgbWVhbiArPSB0aGlzLl9kYXRhW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX24gPSB0aGlzLl9kYXRhLmxlbmd0aDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtZWFuID0gdGhpcy5fZGF0YTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChtZWFuIC8gdGhpcy5fbik7XHJcbiAgICB9XHJcblxyXG59Il19