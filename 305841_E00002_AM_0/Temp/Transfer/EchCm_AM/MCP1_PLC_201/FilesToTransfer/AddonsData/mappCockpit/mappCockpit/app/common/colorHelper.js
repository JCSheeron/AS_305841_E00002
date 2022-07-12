define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ColorHelper = /** @class */ (function () {
        function ColorHelper() {
        }
        ColorHelper.getColor = function () {
            if (this._newColorIndex >= this._colorsScheme.length)
                this._newColorIndex = 0;
            var color = this._colorsScheme[this._newColorIndex];
            this._newColorIndex++;
            return color;
        };
        ColorHelper._newColorIndex = 0;
        ColorHelper._colorsScheme = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe',
            '#008080', '#e6beff', '#9a6324', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#000000'];
        return ColorHelper;
    }());
    exports.ColorHelper = ColorHelper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3JIZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi9jb2xvckhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFDQTtRQUFBO1FBYUEsQ0FBQztRQVBVLG9CQUFRLEdBQWY7WUFDSSxJQUFHLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNO2dCQUMvQyxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztZQUM1QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdEIsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQVZjLDBCQUFjLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLHlCQUFhLEdBQUcsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO1lBQzVHLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBU2xKLGtCQUFDO0tBQUEsQUFiRCxJQWFDO0lBYlksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJcclxuZXhwb3J0IGNsYXNzIENvbG9ySGVscGVyIHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfbmV3Q29sb3JJbmRleCA9IDA7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfY29sb3JzU2NoZW1lID0gWycjZTYxOTRiJywgJyMzY2I0NGInLCAnI2ZmZTExOScsICcjNDM2M2Q4JywgJyNmNTgyMzEnLCAnIzkxMWViNCcsICcjNDZmMGYwJywgJyNmMDMyZTYnLCAnI2JjZjYwYycsICcjZmFiZWJlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJyMwMDgwODAnLCAnI2U2YmVmZicsICcjOWE2MzI0JywgJyM4MDAwMDAnLCAnI2FhZmZjMycsICcjODA4MDAwJywgJyNmZmQ4YjEnLCAnIzAwMDA3NScsICcjODA4MDgwJywgJyMwMDAwMDAnXTtcclxuXHJcbiAgICBzdGF0aWMgZ2V0Q29sb3IoKTogc3RyaW5nIHtcclxuICAgICAgICBpZih0aGlzLl9uZXdDb2xvckluZGV4ID49IHRoaXMuX2NvbG9yc1NjaGVtZS5sZW5ndGgpXHJcbiAgICAgICAgICAgIHRoaXMuX25ld0NvbG9ySW5kZXggPSAwO1xyXG4gICAgICAgIHZhciBjb2xvciA9IHRoaXMuX2NvbG9yc1NjaGVtZVt0aGlzLl9uZXdDb2xvckluZGV4XTtcclxuICAgICAgICB0aGlzLl9uZXdDb2xvckluZGV4Kys7XHJcbiAgICAgICAgcmV0dXJuIGNvbG9yO1xyXG4gICAgfVxyXG59Il19