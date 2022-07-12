var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "../chartCommandBase", "../../helpers/chartZoomCalculations", "../../../../models/chartManagerDataModel/chartManagerChart", "../../../../core/interfaces/components/ui/chart/chartInterface", "../../helpers/chartRangeHelper"], function (require, exports, chartCommandBase_1, chartZoomCalculations_1, chartManagerChart_1, chartInterface_1, chartRangeHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ZoomChartCommand = /** @class */ (function (_super) {
        __extends(ZoomChartCommand, _super);
        function ZoomChartCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ZoomChartCommand.prototype.onExecuteChartCommand = function (sender, args) {
            var chart = args.traceChart;
            if (chart != null) {
                if (args.data.axes.length == 0) {
                    args.data.axes = this.chartViewChartManager.getZoomAxesInChart(chart, args.data.zoomDirection);
                }
                var zoomCalculator = new chartZoomCalculations_1.ChartZoomCalculations();
                for (var i = 0; i < args.data.axes.length; i++) {
                    var axis = args.data.axes[i];
                    var newRange = zoomCalculator.calculateAxisZoomRanges(chart, axis, args.data.zoomStep, args.data.mousePoint.x, args.data.mousePoint.y);
                    //limit the axis range to Precision 11 to prevent syncfusion chart from failing
                    var distance = newRange[1] - newRange[0];
                    if (distance > chartRangeHelper_1.SF_axisResolution) {
                        if (axis.getAxisOrientation() == chartInterface_1.AxisOrientation.horizontal) {
                            var scale = chart.getScaleByScaleId(chart.scales[i].id);
                            if (scale != undefined) {
                                chart.setScaleRange(scale, newRange[0], newRange[1], scale.minYValue, scale.maxYValue, "horizontal");
                            }
                        }
                        else {
                            var scale = chart.getScaleByScaleId(axis.getAxisID());
                            if (scale != undefined) {
                                chart.setScaleRange(scale, scale.minXValue, scale.maxXValue, newRange[0], newRange[1]);
                            }
                        }
                    }
                }
                //Workaround!: Redraw charts except XY or just the XY chart we are zooming
                if (chart.type != chartManagerChart_1.ChartType.XYChart) {
                    this.chartViewChartManager.redrawCharts(false);
                }
                else {
                    chart.redrawChart();
                }
            }
        };
        return ZoomChartCommand;
    }(chartCommandBase_1.ChartCommandBase));
    exports.ZoomChartCommand = ZoomChartCommand;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9vbUNoYXJ0Q29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydFdpZGdldC91c2VySW50ZXJhY3Rpb24vY29tbWFuZHMvem9vbUNoYXJ0Q29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBV0E7UUFBK0Isb0NBQWdCO1FBQS9DOztRQTZDQSxDQUFDO1FBM0NHLGdEQUFxQixHQUFyQixVQUFzQixNQUFXLEVBQUUsSUFBa0M7WUFDakUsSUFBSSxLQUFLLEdBQXVCLElBQUksQ0FBQyxVQUFVLENBQUM7WUFFaEQsSUFBRyxLQUFLLElBQUksSUFBSSxFQUFDO2dCQUViLElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBQztvQkFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2lCQUNsRztnQkFFRCxJQUFJLGNBQWMsR0FBRyxJQUFJLDZDQUFxQixFQUFFLENBQUM7Z0JBQ2pELEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7b0JBQzFDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBZSxDQUFDO29CQUUzQyxJQUFJLFFBQVEsR0FBRyxjQUFjLENBQUMsdUJBQXVCLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRXZJLCtFQUErRTtvQkFDL0UsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDekMsSUFBRyxRQUFRLEdBQUcsb0NBQWlCLEVBQUM7d0JBQzVCLElBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLElBQUksZ0NBQWUsQ0FBQyxVQUFVLEVBQUM7NEJBQ3ZELElBQUksS0FBSyxHQUFJLEtBQW1CLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzs0QkFDdkUsSUFBRyxLQUFLLElBQUksU0FBUyxFQUFDO2dDQUNqQixLQUFtQixDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUM7NkJBQ3ZIO3lCQUNKOzZCQUNHOzRCQUNBLElBQUksS0FBSyxHQUFJLEtBQW1CLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7NEJBQ3JFLElBQUcsS0FBSyxJQUFJLFNBQVMsRUFBQztnQ0FDakIsS0FBbUIsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NkJBQ3pHO3lCQUNKO3FCQUNKO2lCQUVKO2dCQUVELDBFQUEwRTtnQkFDMUUsSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLDZCQUFTLENBQUMsT0FBTyxFQUFFO29CQUNqQyxJQUFJLENBQUMscUJBQXFCLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNsRDtxQkFDSTtvQkFDRCxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7aUJBQ3ZCO2FBQ0o7UUFDTCxDQUFDO1FBQ0wsdUJBQUM7SUFBRCxDQUFDLEFBN0NELENBQStCLG1DQUFnQixHQTZDOUM7SUFFTyw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFydENvbW1hbmRCYXNlIH0gZnJvbSBcIi4uL2NoYXJ0Q29tbWFuZEJhc2VcIjtcclxuaW1wb3J0IHsgRXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kQXJnc30gZnJvbSBcIi4uL3VzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IHsgQ2hhcnRab29tQ2FsY3VsYXRpb25zIH0gZnJvbSBcIi4uLy4uL2hlbHBlcnMvY2hhcnRab29tQ2FsY3VsYXRpb25zXCI7XHJcbmltcG9ydCB7IENoYXJ0QmFzZSB9IGZyb20gXCIuLi8uLi9DaGFydEJhc2VcIjtcclxuaW1wb3J0IHsgQ2hhcnRUeXBlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvY2hhcnRNYW5hZ2VyQ2hhcnRcIjtcclxuaW1wb3J0IHsgSVRyYWNlQ2hhcnQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy90cmFjZUNoYXJ0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElDaGFydEF4aXMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9pbnRlcmZhY2VzL2NvbXBvbmVudHMvdWkvY2hhcnQvQ2hhcnRBeGlzSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEF4aXNPcmllbnRhdGlvbiB9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL2ludGVyZmFjZXMvY29tcG9uZW50cy91aS9jaGFydC9jaGFydEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTRl9heGlzUmVzb2x1dGlvbiB9IGZyb20gXCIuLi8uLi9oZWxwZXJzL2NoYXJ0UmFuZ2VIZWxwZXJcIjtcclxuXHJcblxyXG5jbGFzcyBab29tQ2hhcnRDb21tYW5kIGV4dGVuZHMgQ2hhcnRDb21tYW5kQmFzZXtcclxuICAgIFxyXG4gICAgb25FeGVjdXRlQ2hhcnRDb21tYW5kKHNlbmRlcjogYW55LCBhcmdzOiBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzKSB7XHJcbiAgICAgICAgbGV0IGNoYXJ0OiBJVHJhY2VDaGFydCB8IG51bGwgPSBhcmdzLnRyYWNlQ2hhcnQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoY2hhcnQgIT0gbnVsbCl7XHJcblxyXG4gICAgICAgICAgICBpZihhcmdzLmRhdGEuYXhlcy5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICAgICAgICBhcmdzLmRhdGEuYXhlcyA9IHRoaXMuY2hhcnRWaWV3Q2hhcnRNYW5hZ2VyLmdldFpvb21BeGVzSW5DaGFydChjaGFydCwgYXJncy5kYXRhLnpvb21EaXJlY3Rpb24pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgem9vbUNhbGN1bGF0b3IgPSBuZXcgQ2hhcnRab29tQ2FsY3VsYXRpb25zKCk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhcmdzLmRhdGEuYXhlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXhpcyA9IGFyZ3MuZGF0YS5heGVzW2ldIGFzIElDaGFydEF4aXM7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1JhbmdlID0gem9vbUNhbGN1bGF0b3IuY2FsY3VsYXRlQXhpc1pvb21SYW5nZXMoY2hhcnQsIGF4aXMsIGFyZ3MuZGF0YS56b29tU3RlcCwgYXJncy5kYXRhLm1vdXNlUG9pbnQueCwgYXJncy5kYXRhLm1vdXNlUG9pbnQueSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vbGltaXQgdGhlIGF4aXMgcmFuZ2UgdG8gUHJlY2lzaW9uIDExIHRvIHByZXZlbnQgc3luY2Z1c2lvbiBjaGFydCBmcm9tIGZhaWxpbmdcclxuICAgICAgICAgICAgICAgIGxldCBkaXN0YW5jZSA9IG5ld1JhbmdlWzFdIC0gbmV3UmFuZ2VbMF07XHJcbiAgICAgICAgICAgICAgICBpZihkaXN0YW5jZSA+IFNGX2F4aXNSZXNvbHV0aW9uKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihheGlzLmdldEF4aXNPcmllbnRhdGlvbigpID09IEF4aXNPcmllbnRhdGlvbi5ob3Jpem9udGFsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNjYWxlID0gKGNoYXJ0IGFzIENoYXJ0QmFzZSkuZ2V0U2NhbGVCeVNjYWxlSWQoY2hhcnQuc2NhbGVzW2ldLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2NhbGUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjaGFydCBhcyBDaGFydEJhc2UpLnNldFNjYWxlUmFuZ2Uoc2NhbGUsIG5ld1JhbmdlWzBdLCBuZXdSYW5nZVsxXSwgc2NhbGUubWluWVZhbHVlLCBzY2FsZS5tYXhZVmFsdWUsIFwiaG9yaXpvbnRhbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2NhbGUgPSAoY2hhcnQgYXMgQ2hhcnRCYXNlKS5nZXRTY2FsZUJ5U2NhbGVJZChheGlzLmdldEF4aXNJRCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2NhbGUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjaGFydCBhcyBDaGFydEJhc2UpLnNldFNjYWxlUmFuZ2Uoc2NhbGUsIHNjYWxlLm1pblhWYWx1ZSwgc2NhbGUubWF4WFZhbHVlLCBuZXdSYW5nZVswXSwgbmV3UmFuZ2VbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vV29ya2Fyb3VuZCE6IFJlZHJhdyBjaGFydHMgZXhjZXB0IFhZIG9yIGp1c3QgdGhlIFhZIGNoYXJ0IHdlIGFyZSB6b29taW5nXHJcbiAgICAgICAgICAgIGlmIChjaGFydC50eXBlICE9IENoYXJ0VHlwZS5YWUNoYXJ0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYXJ0Vmlld0NoYXJ0TWFuYWdlci5yZWRyYXdDaGFydHMoZmFsc2UpOyAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNoYXJ0LnJlZHJhd0NoYXJ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7Wm9vbUNoYXJ0Q29tbWFuZH0iXX0=