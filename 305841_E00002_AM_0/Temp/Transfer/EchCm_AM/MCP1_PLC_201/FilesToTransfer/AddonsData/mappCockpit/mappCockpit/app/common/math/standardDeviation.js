define(["require", "exports", "./mean"], function (require, exports, mean_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StandardDeviation = /** @class */ (function () {
        function StandardDeviation() {
            this._data = [];
        }
        Object.defineProperty(StandardDeviation.prototype, "data", {
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
        Object.defineProperty(StandardDeviation.prototype, "mean", {
            get: function () {
                return this._mean;
            },
            set: function (mean) {
                this._mean = mean;
            },
            enumerable: true,
            configurable: true
        });
        StandardDeviation.prototype.calculate = function () {
            //If there is no mean calculated we do the mean calculation first, as we need this for the calculation
            //of the standard deviation
            if (!this._mean) {
                var mean = new mean_1.Mean();
                mean.data = this._data;
                this._mean = mean.calculate();
            }
            var cumstd = 0;
            for (var i = 0; i < this._data.length; i++) {
                cumstd += Math.pow((this._data[i] - this._mean), 2);
            }
            return Math.sqrt(cumstd / this._data.length);
        };
        return StandardDeviation;
    }());
    exports.StandardDeviation = StandardDeviation;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhbmRhcmREZXZpYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi9tYXRoL3N0YW5kYXJkRGV2aWF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUdBO1FBQUE7WUFFWSxVQUFLLEdBQWtCLEVBQUUsQ0FBQztRQXlDdEMsQ0FBQztRQXRDRyxzQkFBSSxtQ0FBSTtpQkFRUjtnQkFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDdEIsQ0FBQztpQkFWRCxVQUFVLElBQTBCO2dCQUNoQyxJQUFJLElBQUksWUFBWSxLQUFLLEVBQUU7b0JBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2lCQUNyQjtxQkFBTTtvQkFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDekI7WUFDTCxDQUFDOzs7V0FBQTtRQU1ELHNCQUFJLG1DQUFJO2lCQUlSO2dCQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN0QixDQUFDO2lCQU5ELFVBQVUsSUFBSTtnQkFDVixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUN0QixDQUFDOzs7V0FBQTtRQU9ELHFDQUFTLEdBQVQ7WUFDSSxzR0FBc0c7WUFDdEcsMkJBQTJCO1lBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNiLElBQUksSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDakM7WUFFRCxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDZixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3hDLE1BQU0sSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDdkQ7WUFFRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakQsQ0FBQztRQUVMLHdCQUFDO0lBQUQsQ0FBQyxBQTNDRCxJQTJDQztJQTNDWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTWF0aEludGVyZmFjZSB9IGZyb20gJy4vaW50ZXJmYWNlL21hdGhPcGVyYXRvckludGVyZmFjZSc7XHJcbmltcG9ydCB7IE1lYW4gfSBmcm9tICcuL21lYW4nO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN0YW5kYXJkRGV2aWF0aW9uIGltcGxlbWVudHMgSU1hdGhJbnRlcmZhY2Uge1xyXG5cclxuICAgIHByaXZhdGUgX2RhdGE6IEFycmF5PG51bWJlcj4gPSBbXTtcclxuICAgIHByaXZhdGUgX21lYW47XHJcblxyXG4gICAgc2V0IGRhdGEgKGRhdGE6IG51bWJlcnxBcnJheTxudW1iZXI+KSB7XHJcbiAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhID0gZGF0YTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhLnB1c2goZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldCBkYXRhICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgbWVhbiAobWVhbikge1xyXG4gICAgICAgIHRoaXMuX21lYW4gPSBtZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtZWFuICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWVhbjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgY2FsY3VsYXRlICgpIHtcclxuICAgICAgICAvL0lmIHRoZXJlIGlzIG5vIG1lYW4gY2FsY3VsYXRlZCB3ZSBkbyB0aGUgbWVhbiBjYWxjdWxhdGlvbiBmaXJzdCwgYXMgd2UgbmVlZCB0aGlzIGZvciB0aGUgY2FsY3VsYXRpb25cclxuICAgICAgICAvL29mIHRoZSBzdGFuZGFyZCBkZXZpYXRpb25cclxuICAgICAgICBpZiAoIXRoaXMuX21lYW4pIHtcclxuICAgICAgICAgICAgbGV0IG1lYW4gPSBuZXcgTWVhbigpO1xyXG4gICAgICAgICAgICBtZWFuLmRhdGEgPSB0aGlzLl9kYXRhO1xyXG4gICAgICAgICAgICB0aGlzLl9tZWFuID0gbWVhbi5jYWxjdWxhdGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjdW1zdGQgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjdW1zdGQgKz0gTWF0aC5wb3coKHRoaXMuX2RhdGFbaV0gLSB0aGlzLl9tZWFuKSwgMik7IFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChjdW1zdGQgLyB0aGlzLl9kYXRhLmxlbmd0aCk7XHJcbiAgICB9XHJcblxyXG59Il19