define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Max = /** @class */ (function () {
        function Max() {
            this._data = [];
        }
        Object.defineProperty(Max.prototype, "data", {
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
        Max.prototype.calculate = function () {
            var max = this._data[0];
            for (var i = 1; i < this._data.length; i++) {
                max = Math.max(max, this._data[i]);
            }
            return max;
        };
        return Max;
    }());
    exports.Max = Max;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vbWF0aC9tYXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBRUE7UUFBQTtZQUVZLFVBQUssR0FBa0IsRUFBRSxDQUFDO1FBdUJ0QyxDQUFDO1FBckJHLHNCQUFJLHFCQUFJO2lCQVFSO2dCQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN0QixDQUFDO2lCQVZELFVBQVUsSUFBMEI7Z0JBQ2hDLElBQUksSUFBSSxZQUFZLEtBQUssRUFBRTtvQkFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7aUJBQ3JCO3FCQUFNO29CQUNILElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUN6QjtZQUNMLENBQUM7OztXQUFBO1FBT0QsdUJBQVMsR0FBVDtZQUNJLElBQUksR0FBRyxHQUFZLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN4QyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3RDO1lBQ0QsT0FBTyxHQUFHLENBQUM7UUFDZixDQUFDO1FBRUwsVUFBQztJQUFELENBQUMsQUF6QkQsSUF5QkM7SUF6Qlksa0JBQUciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTWF0aEludGVyZmFjZSB9IGZyb20gJy4vaW50ZXJmYWNlL21hdGhPcGVyYXRvckludGVyZmFjZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgTWF4IGltcGxlbWVudHMgSU1hdGhJbnRlcmZhY2Uge1xyXG5cclxuICAgIHByaXZhdGUgX2RhdGE6IEFycmF5PG51bWJlcj4gPSBbXTtcclxuXHJcbiAgICBzZXQgZGF0YSAoZGF0YTogbnVtYmVyfEFycmF5PG51bWJlcj4pIHtcclxuICAgICAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGEucHVzaChkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRhdGEgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBjYWxjdWxhdGUgKCkge1xyXG4gICAgICAgIGxldCBtYXggOiBudW1iZXIgPSB0aGlzLl9kYXRhWzBdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgdGhpcy5fZGF0YS5sZW5ndGg7IGkrKyApe1xyXG4gICAgICAgICAgICBtYXggPSBNYXRoLm1heChtYXgsIHRoaXMuX2RhdGFbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWF4O1xyXG4gICAgfVxyXG5cclxufSJdfQ==