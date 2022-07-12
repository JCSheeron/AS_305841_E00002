define(["require", "exports", "../../../core/interfaces/components/ui/chart/chartInterface"], function (require, exports, chartInterface_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartZoomCalculations = /** @class */ (function () {
        function ChartZoomCalculations() {
        }
        ChartZoomCalculations.prototype.calculateAxisZoomRanges = function (traceChart, chartAxisY, zoomStep, mouseX, mouseY) {
            var axisMin = Big(chartAxisY.getAxisRange().min);
            var axisMax = Big(chartAxisY.getAxisRange().max);
            var axisRange = axisMax.minus(axisMin);
            var chartCoordinate = traceChart.getChartCoordinateFromPixel(traceChart.primaryXAxisName, chartAxisY.getAxisID(), mouseX, mouseY);
            var axisValue;
            if (chartAxisY.getAxisOrientation() == chartInterface_1.AxisOrientation.horizontal) {
                axisValue = Big(chartCoordinate.x);
            }
            else {
                axisValue = Big(chartCoordinate.y);
            }
            if (axisValue != undefined) {
                var axisValuePercentage = (axisValue.minus(axisMin)).div(axisRange);
                var newAxisRange = axisRange.times(zoomStep);
                var newAxisMin = Big(axisValue.minus(newAxisRange.times(axisValuePercentage)));
                var newAxisMax = newAxisMin.plus(newAxisRange);
                var newAxisMinNumber = Number(newAxisMin.toString());
                var newAxisMaxNumber = Number(newAxisMax.toString());
                return [newAxisMinNumber, newAxisMaxNumber];
            }
            else {
                console.error("axis value not defined");
                var newAxisMinNumber = Number(axisMin.toString());
                var newAxisMaxNumber = Number(axisMax.toString());
                return [newAxisMinNumber, newAxisMaxNumber];
            }
        };
        return ChartZoomCalculations;
    }());
    exports.ChartZoomCalculations = ChartZoomCalculations;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRab29tQ2FsY3VsYXRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0V2lkZ2V0L2hlbHBlcnMvY2hhcnRab29tQ2FsY3VsYXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUdBO1FBQUE7UUE2Q0EsQ0FBQztRQTNDRyx1REFBdUIsR0FBdkIsVUFBd0IsVUFBd0IsRUFBRSxVQUF1QixFQUFFLFFBQWlCLEVBQUUsTUFBTSxFQUFFLE1BQU07WUFHeEcsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqRCxJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pELElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFdkMsSUFBSSxlQUFlLEdBQUcsVUFBVSxDQUFDLDJCQUEyQixDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLENBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBRWxJLElBQUksU0FBUyxDQUFDO1lBQ2QsSUFBRyxVQUFVLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxnQ0FBZSxDQUFDLFVBQVUsRUFBQztnQkFDN0QsU0FBUyxHQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdEM7aUJBQ0c7Z0JBQ0EsU0FBUyxHQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdEM7WUFFRCxJQUFHLFNBQVMsSUFBSSxTQUFTLEVBQUM7Z0JBQ3RCLElBQUksbUJBQW1CLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNwRSxJQUFJLFlBQVksR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUU3QyxJQUFJLFVBQVUsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvRSxJQUFJLFVBQVUsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUUvQyxJQUFJLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDckQsSUFBSSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBRXJELE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO2FBQy9DO2lCQUVHO2dCQUNBLE9BQU8sQ0FBQyxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztnQkFFeEMsSUFBSSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQ2xELElBQUksZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUNsRCxPQUFPLENBQUMsZ0JBQWdCLEVBQUMsZ0JBQWdCLENBQUMsQ0FBQzthQUM5QztRQUVMLENBQUM7UUFLTCw0QkFBQztJQUFELENBQUMsQUE3Q0QsSUE2Q0M7SUFFTyxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJVHJhY2VDaGFydCB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3RyYWNlQ2hhcnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUNoYXJ0QXhpcyB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2ludGVyZmFjZXMvY29tcG9uZW50cy91aS9jaGFydC9DaGFydEF4aXNJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQXhpc09yaWVudGF0aW9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvaW50ZXJmYWNlcy9jb21wb25lbnRzL3VpL2NoYXJ0L2NoYXJ0SW50ZXJmYWNlXCI7XHJcbmNsYXNzIENoYXJ0Wm9vbUNhbGN1bGF0aW9uc3tcclxuXHJcbiAgICBjYWxjdWxhdGVBeGlzWm9vbVJhbmdlcyh0cmFjZUNoYXJ0IDogSVRyYWNlQ2hhcnQsIGNoYXJ0QXhpc1kgOiBJQ2hhcnRBeGlzLCB6b29tU3RlcCA6IG51bWJlciwgbW91c2VYLCBtb3VzZVkpe1xyXG5cclxuICAgICBcclxuICAgICAgICBsZXQgYXhpc01pbiA9IEJpZyhjaGFydEF4aXNZLmdldEF4aXNSYW5nZSgpLm1pbik7XHJcbiAgICAgICAgbGV0IGF4aXNNYXggPSBCaWcoY2hhcnRBeGlzWS5nZXRBeGlzUmFuZ2UoKS5tYXgpO1xyXG4gICAgICAgIGxldCBheGlzUmFuZ2UgPSBheGlzTWF4Lm1pbnVzKGF4aXNNaW4pO1xyXG5cclxuICAgICAgICBsZXQgY2hhcnRDb29yZGluYXRlID0gdHJhY2VDaGFydC5nZXRDaGFydENvb3JkaW5hdGVGcm9tUGl4ZWwodHJhY2VDaGFydC5wcmltYXJ5WEF4aXNOYW1lLCBjaGFydEF4aXNZLmdldEF4aXNJRCgpLCBtb3VzZVgsIG1vdXNlWSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGF4aXNWYWx1ZTsgXHJcbiAgICAgICAgaWYoY2hhcnRBeGlzWS5nZXRBeGlzT3JpZW50YXRpb24oKSA9PSBBeGlzT3JpZW50YXRpb24uaG9yaXpvbnRhbCl7XHJcbiAgICAgICAgICAgIGF4aXNWYWx1ZSA9IEJpZyhjaGFydENvb3JkaW5hdGUueCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGF4aXNWYWx1ZSA9IEJpZyhjaGFydENvb3JkaW5hdGUueSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihheGlzVmFsdWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IGF4aXNWYWx1ZVBlcmNlbnRhZ2UgPSAoYXhpc1ZhbHVlLm1pbnVzKGF4aXNNaW4pKS5kaXYoYXhpc1JhbmdlKTtcclxuICAgICAgICAgICAgbGV0IG5ld0F4aXNSYW5nZSA9IGF4aXNSYW5nZS50aW1lcyh6b29tU3RlcCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgbmV3QXhpc01pbiA9IEJpZyhheGlzVmFsdWUubWludXMobmV3QXhpc1JhbmdlLnRpbWVzKGF4aXNWYWx1ZVBlcmNlbnRhZ2UpKSk7XHJcbiAgICAgICAgICAgIGxldCBuZXdBeGlzTWF4ID0gbmV3QXhpc01pbi5wbHVzKG5ld0F4aXNSYW5nZSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgbmV3QXhpc01pbk51bWJlciA9IE51bWJlcihuZXdBeGlzTWluLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICBsZXQgbmV3QXhpc01heE51bWJlciA9IE51bWJlcihuZXdBeGlzTWF4LnRvU3RyaW5nKCkpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIFtuZXdBeGlzTWluTnVtYmVyLCBuZXdBeGlzTWF4TnVtYmVyXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJheGlzIHZhbHVlIG5vdCBkZWZpbmVkXCIpO1xyXG5cclxuICAgICAgICAgICAgbGV0IG5ld0F4aXNNaW5OdW1iZXIgPSBOdW1iZXIoYXhpc01pbi50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgbGV0IG5ld0F4aXNNYXhOdW1iZXIgPSBOdW1iZXIoYXhpc01heC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgcmV0dXJuIFtuZXdBeGlzTWluTnVtYmVyLG5ld0F4aXNNYXhOdW1iZXJdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG59XHJcblxyXG5leHBvcnQge0NoYXJ0Wm9vbUNhbGN1bGF0aW9uc30iXX0=