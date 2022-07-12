define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Sum = /** @class */ (function () {
        function Sum() {
            this._data = [];
        }
        Object.defineProperty(Sum.prototype, "data", {
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
        Sum.prototype.calculate = function () {
            var sum = 0;
            for (var i = 0; i < this._data.length; i++) {
                sum += this._data[i];
            }
            return sum;
        };
        return Sum;
    }());
    exports.Sum = Sum;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vbWF0aC9zdW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBRUE7UUFBQTtZQUVZLFVBQUssR0FBa0IsRUFBRSxDQUFDO1FBdUJ0QyxDQUFDO1FBckJHLHNCQUFJLHFCQUFJO2lCQVFSO2dCQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN0QixDQUFDO2lCQVZELFVBQVUsSUFBMEI7Z0JBQ2hDLElBQUksSUFBSSxZQUFZLEtBQUssRUFBRTtvQkFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7aUJBQ3JCO3FCQUFNO29CQUNILElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUN6QjtZQUNMLENBQUM7OztXQUFBO1FBT0QsdUJBQVMsR0FBVDtZQUNJLElBQUksR0FBRyxHQUFZLENBQUMsQ0FBQztZQUNyQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3hDLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3hCO1lBQ0QsT0FBTyxHQUFHLENBQUM7UUFDZixDQUFDO1FBRUwsVUFBQztJQUFELENBQUMsQUF6QkQsSUF5QkM7SUF6Qlksa0JBQUciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTWF0aEludGVyZmFjZSB9IGZyb20gJy4vaW50ZXJmYWNlL21hdGhPcGVyYXRvckludGVyZmFjZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgU3VtIGltcGxlbWVudHMgSU1hdGhJbnRlcmZhY2Uge1xyXG5cclxuICAgIHByaXZhdGUgX2RhdGE6IEFycmF5PG51bWJlcj4gPSBbXTtcclxuXHJcbiAgICBzZXQgZGF0YSAoZGF0YTogbnVtYmVyfEFycmF5PG51bWJlcj4pIHtcclxuICAgICAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGEucHVzaChkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRhdGEgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBjYWxjdWxhdGUgKCkge1xyXG4gICAgICAgIGxldCBzdW0gOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fZGF0YS5sZW5ndGg7IGkrKyApe1xyXG4gICAgICAgICAgICBzdW0gKz0gdGhpcy5fZGF0YVtpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN1bTtcclxuICAgIH1cclxuXHJcbn0iXX0=