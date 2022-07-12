define(["require", "exports", "../../chartWidget/ChartBase", "../../../models/chartManagerDataModel/chartManagerChart", "../../common/SerieChartTypeHelper"], function (require, exports, ChartBase_1, chartManagerChart_1, SerieChartTypeHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartDropHelperChangedHint;
    (function (ChartDropHelperChangedHint) {
        ChartDropHelperChangedHint[ChartDropHelperChangedHint["createChart"] = 0] = "createChart";
        ChartDropHelperChangedHint[ChartDropHelperChangedHint["addSerie"] = 1] = "addSerie";
        ChartDropHelperChangedHint[ChartDropHelperChangedHint["createXYSerie"] = 2] = "createXYSerie";
        ChartDropHelperChangedHint[ChartDropHelperChangedHint["createFFTSerie"] = 3] = "createFFTSerie";
    })(ChartDropHelperChangedHint = exports.ChartDropHelperChangedHint || (exports.ChartDropHelperChangedHint = {}));
    var ChartDropHelper = /** @class */ (function () {
        function ChartDropHelper(chartManagerDataModel, chartView) {
            this.chartManagerDataModel = chartManagerDataModel;
            this.chartViewWidget = chartView;
        }
        /**
         * Returns true if a chart can be added
         *
         * @returns {boolean}
         * @memberof ChartDropHelper
         */
        ChartDropHelper.prototype.canAddChart = function () {
            if (this.chartManagerDataModel != undefined) {
                if (this.chartManagerDataModel.canAddChart() == true) {
                    return true;
                }
            }
            return false;
        };
        /**
         * add the dropped serie to the correct place
         *
         * @param {*} currentTarget
         * @param {(ITraceChart | undefined)} targetChart
         * @param {Array<BaseSeries>} series
         * @param {(ChartViewLayoutManager | undefined)} layoutManager
         * @memberof ChartDropHelper
         */
        ChartDropHelper.prototype.addSeries = function (currentTarget, targetChart, series, layoutManager) {
            var serieChartType = SerieChartTypeHelper_1.SerieChartTypeHelper.getSerieChartType(series[0].type);
            var chartViewChartSplitterLastPaneId = layoutManager.chartSplitter.getLastPaneId();
            var areaXY = document.getElementById(chartViewChartSplitterLastPaneId + "_XY");
            var areaYT = document.getElementById(chartViewChartSplitterLastPaneId + "_YT");
            if (targetChart && serieChartType == targetChart.type) {
                this.addSeriesToExistingChart(targetChart, series);
            }
            else if (targetChart && serieChartType != targetChart.type) {
                this.addYTSeriesToDifferentChart(targetChart, series);
            }
            else if (currentTarget == areaXY || currentTarget.parentElement == areaXY) {
                this.createNewChart(chartManagerChart_1.ChartType.XYChart, series);
            }
            else if (currentTarget == areaYT || currentTarget.parentElement == areaYT) {
                this.createNewChart(chartManagerChart_1.ChartType.YTChart, series);
            }
            else {
                this.createNewChart(chartManagerChart_1.ChartType.FFTChart, series);
            }
        };
        /**
         * add the dropped serie to an existing chart
         *
         * @private
         * @param {ITraceChart} targetChart
         * @memberof ChartDropHelper
         */
        ChartDropHelper.prototype.addSeriesToExistingChart = function (targetChart, series) {
            // get chart/axis information
            var data = {
                targetChart: targetChart,
                chart: this.chartManagerDataModel.getChart(targetChart.widgetName),
                series: series
            };
            //raise event to traceViewWidget
            this.chartViewWidget.eventDropHelper.raise(this.chartManagerDataModel, { hint: ChartDropHelperChangedHint.addSerie, data: data });
        };
        ChartDropHelper.prototype.addYTSeriesToDifferentChart = function (targetChart, series) {
            // get chart/axis information
            var data = {
                targetChart: targetChart,
                chart: this.chartManagerDataModel.getChart(targetChart.widgetName),
                series: series
            };
            //raise event to traceViewWidget
            if (targetChart.type == chartManagerChart_1.ChartType.XYChart) {
                this.chartViewWidget.eventDropHelper.raise(this.chartManagerDataModel, { hint: ChartDropHelperChangedHint.createXYSerie, data: data });
            }
            else if (targetChart.type == chartManagerChart_1.ChartType.FFTChart) {
                this.chartViewWidget.eventDropHelper.raise(this.chartManagerDataModel, { hint: ChartDropHelperChangedHint.createFFTSerie, data: data });
            }
        };
        /**
         * create a new chart where serie will be dropped
         *
         * @private
         * @param {ChartType} newChartType
         * @param {Array<BaseSeries>} series
         * @memberof ChartDropHelper
         */
        ChartDropHelper.prototype.createNewChart = function (newChartType, series) {
            var data = {
                type: newChartType,
                series: series
            };
            //raise event to traceViewWidget
            this.chartViewWidget.eventDropHelper.raise(this.chartManagerDataModel, { hint: ChartDropHelperChangedHint.createChart, data: data });
        };
        /**
         * Return a DropLocationType for the current drop position or DropLocationType.invalid if drop not possible
         *
         * @param {ChartBase} chart
         * @param {Array<BaseSeries>} series
         * @returns {DropLocationType}
         * @memberof ChartDropHelper
         */
        ChartDropHelper.prototype.getDropLocationType = function (currentTarget, chart, series) {
            if (this.chartManagerDataModel != undefined) {
                var chartManagerChart = this.chartManagerDataModel.getChart(chart.widgetName);
                if (chartManagerChart != undefined) {
                    if (chartManagerChart.dropPossible || chartManagerChart.childs[0].dropPossible) {
                        return chart.getDropLocationType(currentTarget);
                    }
                }
            }
            return ChartBase_1.DropLocationType.invalid;
        };
        return ChartDropHelper;
    }());
    exports.ChartDropHelper = ChartDropHelper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnREcm9wSGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0Vmlld1dpZGdldC9oZWxwZXJzL2NoYXJ0RHJvcEhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFTQSxJQUFZLDBCQUtYO0lBTEQsV0FBWSwwQkFBMEI7UUFDbEMseUZBQVcsQ0FBQTtRQUNYLG1GQUFRLENBQUE7UUFDUiw2RkFBYSxDQUFBO1FBQ2IsK0ZBQWMsQ0FBQTtJQUNsQixDQUFDLEVBTFcsMEJBQTBCLEdBQTFCLGtDQUEwQixLQUExQixrQ0FBMEIsUUFLckM7SUFFRDtRQUtJLHlCQUFZLHFCQUE2QyxFQUFFLFNBQTBCO1lBQ2pGLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxxQkFBcUIsQ0FBQztZQUNuRCxJQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztRQUNyQyxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSSxxQ0FBVyxHQUFsQjtZQUNJLElBQUksSUFBSSxDQUFDLHFCQUFxQixJQUFJLFNBQVMsRUFBRTtnQkFDekMsSUFBSSxJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxFQUFFLElBQUksSUFBSSxFQUFFO29CQUNsRCxPQUFPLElBQUksQ0FBQztpQkFDZjthQUNKO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0ksbUNBQVMsR0FBaEIsVUFBaUIsYUFBYSxFQUFFLFdBQW9DLEVBQUUsTUFBeUIsRUFBRSxhQUFpRDtZQUM5SSxJQUFJLGNBQWMsR0FBRywyQ0FBb0IsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUUsSUFBSSxnQ0FBZ0MsR0FBRyxhQUFjLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3BGLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFj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Q0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsRUFBQyxJQUFJLEVBQUUsMEJBQTBCLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3hJLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ksNkNBQW1CLEdBQTFCLFVBQTJCLGFBQWtCLEVBQUUsS0FBZ0IsRUFBRSxNQUF5QjtZQUN0RixJQUFJLElBQUksQ0FBQyxxQkFBcUIsSUFBSSxTQUFTLEVBQUU7Z0JBQ3pDLElBQUksaUJBQWlCLEdBQUcsSUFBSSxDQUFDLHFCQUFzQixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQy9FLElBQUksaUJBQWlCLElBQUksU0FBUyxFQUFFO29CQUNoQyxJQUFJLGlCQUFpQixDQUFDLFlBQVksSUFBSSxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxFQUFFO3dCQUM1RSxPQUFPLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztxQkFDbkQ7aUJBQ0o7YUFDSjtZQUNELE9BQU8sNEJBQWdCLENBQUMsT0FBTyxDQUFDO1FBQ3BDLENBQUM7UUFDTCxzQkFBQztJQUFELENBQUMsQUEvSEQsSUErSEM7SUFFUSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NvbW1vbi9zZXJpZXMvYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9kYXRhTW9kZWxzXCI7XHJcbmltcG9ydCB7IENoYXJ0QmFzZSwgRHJvcExvY2F0aW9uVHlwZSB9IGZyb20gXCIuLi8uLi9jaGFydFdpZGdldC9DaGFydEJhc2VcIjtcclxuaW1wb3J0IHsgQ2hhcnRUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvY2hhcnRNYW5hZ2VyQ2hhcnRcIjtcclxuaW1wb3J0IHsgQ2hhcnRWaWV3TGF5b3V0TWFuYWdlciB9IGZyb20gXCIuLi9jaGFydFZpZXdMYXlvdXRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IElUcmFjZUNoYXJ0IH0gZnJvbSBcIi4uLy4uL2NoYXJ0V2lkZ2V0L2ludGVyZmFjZXMvdHJhY2VDaGFydEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDaGFydFZpZXdXaWRnZXQgfSBmcm9tIFwiLi4vY2hhcnRWaWV3V2lkZ2V0XCI7XHJcbmltcG9ydCB7IFNlcmllQ2hhcnRUeXBlSGVscGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9TZXJpZUNoYXJ0VHlwZUhlbHBlclwiO1xyXG5cclxuZXhwb3J0IGVudW0gQ2hhcnREcm9wSGVscGVyQ2hhbmdlZEhpbnR7XHJcbiAgICBjcmVhdGVDaGFydCxcclxuICAgIGFkZFNlcmllLFxyXG4gICAgY3JlYXRlWFlTZXJpZSxcclxuICAgIGNyZWF0ZUZGVFNlcmllXHJcbn1cclxuXHJcbmNsYXNzIENoYXJ0RHJvcEhlbHBlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBjaGFydE1hbmFnZXJEYXRhTW9kZWw6IElDaGFydE1hbmFnZXJEYXRhTW9kZWw7XHJcbiAgICBwcml2YXRlIGNoYXJ0Vmlld1dpZGdldDogQ2hhcnRWaWV3V2lkZ2V0O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNoYXJ0TWFuYWdlckRhdGFNb2RlbDogSUNoYXJ0TWFuYWdlckRhdGFNb2RlbCwgY2hhcnRWaWV3OiBDaGFydFZpZXdXaWRnZXQpIHtcclxuICAgICAgICB0aGlzLmNoYXJ0TWFuYWdlckRhdGFNb2RlbCA9IGNoYXJ0TWFuYWdlckRhdGFNb2RlbDtcclxuICAgICAgICB0aGlzLmNoYXJ0Vmlld1dpZGdldCA9IGNoYXJ0VmlldztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiBhIGNoYXJ0IGNhbiBiZSBhZGRlZFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0RHJvcEhlbHBlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2FuQWRkQ2hhcnQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hhcnRNYW5hZ2VyRGF0YU1vZGVsICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jaGFydE1hbmFnZXJEYXRhTW9kZWwuY2FuQWRkQ2hhcnQoKSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBhZGQgdGhlIGRyb3BwZWQgc2VyaWUgdG8gdGhlIGNvcnJlY3QgcGxhY2VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGN1cnJlbnRUYXJnZXRcclxuICAgICAqIEBwYXJhbSB7KElUcmFjZUNoYXJ0IHwgdW5kZWZpbmVkKX0gdGFyZ2V0Q2hhcnRcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8QmFzZVNlcmllcz59IHNlcmllc1xyXG4gICAgICogQHBhcmFtIHsoQ2hhcnRWaWV3TGF5b3V0TWFuYWdlciB8IHVuZGVmaW5lZCl9IGxheW91dE1hbmFnZXJcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydERyb3BIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZFNlcmllcyhjdXJyZW50VGFyZ2V0LCB0YXJnZXRDaGFydDogSVRyYWNlQ2hhcnQgfCB1bmRlZmluZWQsIHNlcmllczogQXJyYXk8QmFzZVNlcmllcz4sIGxheW91dE1hbmFnZXI6IENoYXJ0Vmlld0xheW91dE1hbmFnZXIgfCB1bmRlZmluZWQpIHtcclxuICAgICAgICBsZXQgc2VyaWVDaGFydFR5cGUgPSBTZXJpZUNoYXJ0VHlwZUhlbHBlci5nZXRTZXJpZUNoYXJ0VHlwZShzZXJpZXNbMF0udHlwZSk7XHJcbiAgICAgICAgbGV0IGNoYXJ0Vmlld0NoYXJ0U3BsaXR0ZXJMYXN0UGFuZUlkID0gbGF5b3V0TWFuYWdlciEuY2hhcnRTcGxpdHRlci5nZXRMYXN0UGFuZUlkKCk7XHJcbiAgICAgICAgbGV0IGFyZWFYWSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNoYXJ0Vmlld0NoYXJ0U3BsaXR0ZXJMYXN0UGFuZUlkICsgXCJfWFlcIik7XHJcbiAgICAgICAgbGV0IGFyZWFZVCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNoYXJ0Vmlld0NoYXJ0U3BsaXR0ZXJMYXN0UGFuZUlkICsgXCJfWVRcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRhcmdldENoYXJ0ICYmIHNlcmllQ2hhcnRUeXBlID09IHRhcmdldENoYXJ0LnR5cGUpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRTZXJpZXNUb0V4aXN0aW5nQ2hhcnQodGFyZ2V0Q2hhcnQsIHNlcmllcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRhcmdldENoYXJ0ICYmIHNlcmllQ2hhcnRUeXBlICE9IHRhcmdldENoYXJ0LnR5cGUpe1xyXG4gICAgICAgICAgICB0aGlzLmFkZFlUU2VyaWVzVG9EaWZmZXJlbnRDaGFydCh0YXJnZXRDaGFydCwgc2VyaWVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY3VycmVudFRhcmdldCA9PSBhcmVhWFkgfHwgY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50ID09IGFyZWFYWSkgeyBcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVOZXdDaGFydChDaGFydFR5cGUuWFlDaGFydCwgc2VyaWVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY3VycmVudFRhcmdldCA9PSBhcmVhWVQgfHwgY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50ID09IGFyZWFZVCkge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU5ld0NoYXJ0KENoYXJ0VHlwZS5ZVENoYXJ0LCBzZXJpZXMpO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTmV3Q2hhcnQoQ2hhcnRUeXBlLkZGVENoYXJ0LCBzZXJpZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGFkZCB0aGUgZHJvcHBlZCBzZXJpZSB0byBhbiBleGlzdGluZyBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lUcmFjZUNoYXJ0fSB0YXJnZXRDaGFydFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0RHJvcEhlbHBlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZFNlcmllc1RvRXhpc3RpbmdDaGFydCh0YXJnZXRDaGFydDogSVRyYWNlQ2hhcnQsIHNlcmllczogQXJyYXk8QmFzZVNlcmllcz4pIHtcclxuICAgICAgICAvLyBnZXQgY2hhcnQvYXhpcyBpbmZvcm1hdGlvblxyXG4gICAgICAgIGxldCBkYXRhID0ge1xyXG4gICAgICAgICAgICB0YXJnZXRDaGFydDogdGFyZ2V0Q2hhcnQsXHJcbiAgICAgICAgICAgIGNoYXJ0OiB0aGlzLmNoYXJ0TWFuYWdlckRhdGFNb2RlbCEuZ2V0Q2hhcnQodGFyZ2V0Q2hhcnQud2lkZ2V0TmFtZSksXHJcbiAgICAgICAgICAgIHNlcmllczogc2VyaWVzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vcmFpc2UgZXZlbnQgdG8gdHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgICAgdGhpcy5jaGFydFZpZXdXaWRnZXQuZXZlbnREcm9wSGVscGVyLnJhaXNlKHRoaXMuY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLCB7aGludDogQ2hhcnREcm9wSGVscGVyQ2hhbmdlZEhpbnQuYWRkU2VyaWUsIGRhdGE6IGRhdGEgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGRZVFNlcmllc1RvRGlmZmVyZW50Q2hhcnQodGFyZ2V0Q2hhcnQ6IElUcmFjZUNoYXJ0LCBzZXJpZXM6IEFycmF5PEJhc2VTZXJpZXM+KSB7XHJcbiAgICAgICAgLy8gZ2V0IGNoYXJ0L2F4aXMgaW5mb3JtYXRpb25cclxuICAgICAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgICAgICAgdGFyZ2V0Q2hhcnQ6IHRhcmdldENoYXJ0LFxyXG4gICAgICAgICAgICBjaGFydDogdGhpcy5jaGFydE1hbmFnZXJEYXRhTW9kZWwhLmdldENoYXJ0KHRhcmdldENoYXJ0LndpZGdldE5hbWUpLFxyXG4gICAgICAgICAgICBzZXJpZXM6IHNlcmllc1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL3JhaXNlIGV2ZW50IHRvIHRyYWNlVmlld1dpZGdldFxyXG4gICAgICAgIGlmICh0YXJnZXRDaGFydC50eXBlID09IENoYXJ0VHlwZS5YWUNoYXJ0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRWaWV3V2lkZ2V0LmV2ZW50RHJvcEhlbHBlci5yYWlzZSh0aGlzLmNoYXJ0TWFuYWdlckRhdGFNb2RlbCwge2hpbnQ6IENoYXJ0RHJvcEhlbHBlckNoYW5nZWRIaW50LmNyZWF0ZVhZU2VyaWUsIGRhdGE6IGRhdGEgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRhcmdldENoYXJ0LnR5cGUgPT0gQ2hhcnRUeXBlLkZGVENoYXJ0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRWaWV3V2lkZ2V0LmV2ZW50RHJvcEhlbHBlci5yYWlzZSh0aGlzLmNoYXJ0TWFuYWdlckRhdGFNb2RlbCwge2hpbnQ6IENoYXJ0RHJvcEhlbHBlckNoYW5nZWRIaW50LmNyZWF0ZUZGVFNlcmllLCBkYXRhOiBkYXRhIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZSBhIG5ldyBjaGFydCB3aGVyZSBzZXJpZSB3aWxsIGJlIGRyb3BwZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtDaGFydFR5cGV9IG5ld0NoYXJ0VHlwZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxCYXNlU2VyaWVzPn0gc2VyaWVzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnREcm9wSGVscGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlTmV3Q2hhcnQobmV3Q2hhcnRUeXBlOiBDaGFydFR5cGUsIHNlcmllczogQXJyYXk8QmFzZVNlcmllcz4pIHtcclxuICAgICAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgICAgICAgdHlwZTogbmV3Q2hhcnRUeXBlLFxyXG4gICAgICAgICAgICBzZXJpZXM6IHNlcmllc1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL3JhaXNlIGV2ZW50IHRvIHRyYWNlVmlld1dpZGdldFxyXG4gICAgICAgIHRoaXMuY2hhcnRWaWV3V2lkZ2V0LmV2ZW50RHJvcEhlbHBlci5yYWlzZSh0aGlzLmNoYXJ0TWFuYWdlckRhdGFNb2RlbCwge2hpbnQ6IENoYXJ0RHJvcEhlbHBlckNoYW5nZWRIaW50LmNyZWF0ZUNoYXJ0LCBkYXRhOiBkYXRhIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIGEgRHJvcExvY2F0aW9uVHlwZSBmb3IgdGhlIGN1cnJlbnQgZHJvcCBwb3NpdGlvbiBvciBEcm9wTG9jYXRpb25UeXBlLmludmFsaWQgaWYgZHJvcCBub3QgcG9zc2libGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0NoYXJ0QmFzZX0gY2hhcnRcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8QmFzZVNlcmllcz59IHNlcmllc1xyXG4gICAgICogQHJldHVybnMge0Ryb3BMb2NhdGlvblR5cGV9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnREcm9wSGVscGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREcm9wTG9jYXRpb25UeXBlKGN1cnJlbnRUYXJnZXQ6IGFueSwgY2hhcnQ6IENoYXJ0QmFzZSwgc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPik6IERyb3BMb2NhdGlvblR5cGUge1xyXG4gICAgICAgIGlmICh0aGlzLmNoYXJ0TWFuYWdlckRhdGFNb2RlbCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgbGV0IGNoYXJ0TWFuYWdlckNoYXJ0ID0gdGhpcy5jaGFydE1hbmFnZXJEYXRhTW9kZWwhLmdldENoYXJ0KGNoYXJ0LndpZGdldE5hbWUpO1xyXG4gICAgICAgICAgICBpZiAoY2hhcnRNYW5hZ2VyQ2hhcnQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hhcnRNYW5hZ2VyQ2hhcnQuZHJvcFBvc3NpYmxlIHx8IGNoYXJ0TWFuYWdlckNoYXJ0LmNoaWxkc1swXS5kcm9wUG9zc2libGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2hhcnQuZ2V0RHJvcExvY2F0aW9uVHlwZShjdXJyZW50VGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gRHJvcExvY2F0aW9uVHlwZS5pbnZhbGlkO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBDaGFydERyb3BIZWxwZXIgfTsiXX0=