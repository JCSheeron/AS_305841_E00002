define(["require", "exports", "./squaredsum"], function (require, exports, squaredsum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RootMeanSquare = /** @class */ (function () {
        function RootMeanSquare() {
            this._data = [];
            this._ss = new squaredsum_1.SquaredSum();
        }
        Object.defineProperty(RootMeanSquare.prototype, "data", {
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
        RootMeanSquare.prototype.calculate = function () {
            var rms = 0, ss = 0;
            this._ss.data = this._data;
            ss = this._ss.calculate();
            rms = Math.sqrt(ss / this._data.length);
            return rms;
        };
        return RootMeanSquare;
    }());
    exports.RootMeanSquare = RootMeanSquare;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm1zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vbWF0aC9ybXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBR0E7UUFBQTtZQUVZLFVBQUssR0FBa0IsRUFBRSxDQUFDO1lBQzFCLFFBQUcsR0FBRyxJQUFJLHVCQUFVLEVBQUUsQ0FBQztRQTJCbkMsQ0FBQztRQXpCRyxzQkFBSSxnQ0FBSTtpQkFRUjtnQkFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDdEIsQ0FBQztpQkFWRCxVQUFVLElBQTBCO2dCQUNoQyxJQUFJLElBQUksWUFBWSxLQUFLLEVBQUU7b0JBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2lCQUNyQjtxQkFBTTtvQkFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDekI7WUFDTCxDQUFDOzs7V0FBQTtRQU9ELGtDQUFTLEdBQVQ7WUFDSSxJQUFJLEdBQUcsR0FBWSxDQUFDLEVBQ2hCLEVBQUUsR0FBVyxDQUFDLENBQUM7WUFFbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUMzQixFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUUxQixHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUV4QyxPQUFPLEdBQUcsQ0FBQztRQUNmLENBQUM7UUFFTCxxQkFBQztJQUFELENBQUMsQUE5QkQsSUE4QkM7SUE5Qlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTWF0aEludGVyZmFjZSB9IGZyb20gJy4vaW50ZXJmYWNlL21hdGhPcGVyYXRvckludGVyZmFjZSc7XHJcbmltcG9ydCB7IFNxdWFyZWRTdW0gfSBmcm9tICcuL3NxdWFyZWRzdW0nO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJvb3RNZWFuU3F1YXJlIGltcGxlbWVudHMgSU1hdGhJbnRlcmZhY2Uge1xyXG5cclxuICAgIHByaXZhdGUgX2RhdGE6IEFycmF5PG51bWJlcj4gPSBbXTtcclxuICAgIHByaXZhdGUgX3NzID0gbmV3IFNxdWFyZWRTdW0oKTtcclxuXHJcbiAgICBzZXQgZGF0YSAoZGF0YTogbnVtYmVyfEFycmF5PG51bWJlcj4pIHtcclxuICAgICAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGEucHVzaChkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRhdGEgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBjYWxjdWxhdGUgKCkge1xyXG4gICAgICAgIGxldCBybXMgOiBudW1iZXIgPSAwLFxyXG4gICAgICAgICAgICBzczogbnVtYmVyID0gMDtcclxuXHJcbiAgICAgICAgdGhpcy5fc3MuZGF0YSA9IHRoaXMuX2RhdGE7XHJcbiAgICAgICAgc3MgPSB0aGlzLl9zcy5jYWxjdWxhdGUoKTtcclxuICAgIFxyXG4gICAgICAgIHJtcyA9IE1hdGguc3FydChzcyAvIHRoaXMuX2RhdGEubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJtcztcclxuICAgIH1cclxuXHJcbn0iXX0=