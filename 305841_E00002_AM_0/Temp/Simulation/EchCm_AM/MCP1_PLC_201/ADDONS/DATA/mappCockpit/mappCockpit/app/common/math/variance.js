define(["require", "exports", "./standardDeviation"], function (require, exports, standardDeviation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Variance = /** @class */ (function () {
        function Variance() {
            this._std = 0;
        }
        Object.defineProperty(Variance.prototype, "data", {
            get: function () {
                return this._data;
            },
            /**
             * @method setData
             * This method takes the average and calculates the variance from it
             * 1. If an array is given the data only has to be added once.
             * 2. If a number is given, it will be assumed to be the standard devation, and will be used to calculate the variance
             */
            set: function (data) {
                this._data = data;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @method calculate
         */
        Variance.prototype.calculate = function () {
            if (this._data instanceof Array) {
                var std = new standardDeviation_1.StandardDeviation();
                std.data = this._data;
                this._std = std.calculate();
            }
            else {
                this._std = this._data;
            }
            return Math.pow(this._std, 2);
        };
        return Variance;
    }());
    exports.Variance = Variance;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFyaWFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi9tYXRoL3ZhcmlhbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUdBO1FBQUE7WUFHWSxTQUFJLEdBQUcsQ0FBQyxDQUFDO1FBaUNyQixDQUFDO1FBekJHLHNCQUFJLDBCQUFJO2lCQUlSO2dCQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN0QixDQUFDO1lBWkQ7Ozs7O2VBS0c7aUJBQ0gsVUFBVSxJQUEwQjtnQkFDaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDdEIsQ0FBQzs7O1dBQUE7UUFPRDs7V0FFRztRQUNILDRCQUFTLEdBQVQ7WUFFSSxJQUFJLElBQUksQ0FBQyxLQUFLLFlBQVksS0FBSyxFQUFFO2dCQUM3QixJQUFJLEdBQUcsR0FBRyxJQUFJLHFDQUFpQixFQUFFLENBQUM7Z0JBQ2xDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDdEIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDL0I7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO2FBQzFCO1lBRUQsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEMsQ0FBQztRQUVMLGVBQUM7SUFBRCxDQUFDLEFBcENELElBb0NDO0lBcENZLDRCQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU1hdGhJbnRlcmZhY2UgfSBmcm9tICcuL2ludGVyZmFjZS9tYXRoT3BlcmF0b3JJbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBTdGFuZGFyZERldmlhdGlvbiB9IGZyb20gJy4vc3RhbmRhcmREZXZpYXRpb24nO1xyXG5cclxuZXhwb3J0IGNsYXNzIFZhcmlhbmNlIGltcGxlbWVudHMgSU1hdGhJbnRlcmZhY2Uge1xyXG5cclxuICAgIHByaXZhdGUgX2RhdGE7XHJcbiAgICBwcml2YXRlIF9zdGQgPSAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG1ldGhvZCBzZXREYXRhXHJcbiAgICAgKiBUaGlzIG1ldGhvZCB0YWtlcyB0aGUgYXZlcmFnZSBhbmQgY2FsY3VsYXRlcyB0aGUgdmFyaWFuY2UgZnJvbSBpdFxyXG4gICAgICogMS4gSWYgYW4gYXJyYXkgaXMgZ2l2ZW4gdGhlIGRhdGEgb25seSBoYXMgdG8gYmUgYWRkZWQgb25jZS5cclxuICAgICAqIDIuIElmIGEgbnVtYmVyIGlzIGdpdmVuLCBpdCB3aWxsIGJlIGFzc3VtZWQgdG8gYmUgdGhlIHN0YW5kYXJkIGRldmF0aW9uLCBhbmQgd2lsbCBiZSB1c2VkIHRvIGNhbGN1bGF0ZSB0aGUgdmFyaWFuY2VcclxuICAgICAqL1xyXG4gICAgc2V0IGRhdGEgKGRhdGE6IG51bWJlcnxBcnJheTxudW1iZXI+KSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRhdGEgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBtZXRob2QgY2FsY3VsYXRlXHJcbiAgICAgKi9cclxuICAgIGNhbGN1bGF0ZSAoKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9kYXRhIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgICAgbGV0IHN0ZCA9IG5ldyBTdGFuZGFyZERldmlhdGlvbigpO1xyXG4gICAgICAgICAgICBzdGQuZGF0YSA9IHRoaXMuX2RhdGE7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0ZCA9IHN0ZC5jYWxjdWxhdGUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9zdGQgPSB0aGlzLl9kYXRhO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gTWF0aC5wb3codGhpcy5fc3RkLCAyKTtcclxuICAgIH1cclxuXHJcbn0iXX0=