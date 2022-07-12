define(["require", "exports", "../../../models/chartManagerDataModel/chartManagerChart"], function (require, exports, chartManagerChart_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //smalles resolution that SF can display on an axis
    exports.SF_axisResolution = 1e-12;
    var ChartRangeHelper = /** @class */ (function () {
        function ChartRangeHelper() {
        }
        /**
         *  Set all X-Axis ranges to the smallest range possbile without hiding data
         *
         * @param {ITraceChart[]} traceChartList
         * @memberof ChartRangeHelper
         */
        ChartRangeHelper.prototype.resetXRangesAllChartTypes = function (traceChartList) {
            this.resetXRangesYT(traceChartList);
            this.resetXRangesXY(traceChartList);
            this.resetXRangesFFT(traceChartList);
        };
        /**
         * Set all Y-Axis ranges to the smallest range possbile without hiding data
         *
         * @param {ITraceChart[]} traceChartList
         * @memberof ChartRangeHelper
         */
        ChartRangeHelper.prototype.resetYRangesAllChartTypes = function (traceChartList) {
            for (var _i = 0, traceChartList_1 = traceChartList; _i < traceChartList_1.length; _i++) {
                var chart = traceChartList_1[_i];
                for (var _a = 0, _b = chart.getYScales(); _a < _b.length; _a++) {
                    var yAxis = _b[_a];
                    var axisMinValue = chart.getSeriesMinYForScale(yAxis);
                    var axisMaxValue = chart.getSeriesMaxYForScale(yAxis);
                    if (axisMinValue != undefined && axisMaxValue != undefined) {
                        chart.updateRangeY(yAxis, axisMinValue, axisMaxValue);
                    }
                }
            }
        };
        /**
         *Set the X-Axis ranges of all YT-Charts to the smallest range possbile without hiding data
         *
         * @param {ITraceChart[]} traceChartList
         * @memberof ChartRangeHelper
         */
        ChartRangeHelper.prototype.resetXRangesYT = function (traceChartList) {
            var ytChartList = this.getYTCharts(traceChartList);
            var minX = this.getTotalMinX(ytChartList);
            var maxX = this.getTotalMaxX(ytChartList);
            for (var _i = 0, ytChartList_1 = ytChartList; _i < ytChartList_1.length; _i++) {
                var ytChart = ytChartList_1[_i];
                if (minX != undefined && maxX != undefined) {
                    ytChart.updateChartRangeX(minX, maxX);
                }
            }
        };
        /**
         *Set the X-Axis ranges of all XY-Charts to the smallest range possbile without hiding data
         *
         * @param {ITraceChart[]} traceChartList
         * @memberof ChartRangeHelper
         */
        ChartRangeHelper.prototype.resetXRangesXY = function (traceChartList) {
            var xyChartList = this.getXYCharts(traceChartList);
            for (var _i = 0, xyChartList_1 = xyChartList; _i < xyChartList_1.length; _i++) {
                var xyChart = xyChartList_1[_i];
                var minX = this.getTotalMinX([xyChart]);
                var maxX = this.getTotalMaxX([xyChart]);
                if (minX != undefined && maxX != undefined) {
                    xyChart.updateChartRangeX(minX, maxX);
                }
            }
        };
        /**
         *Set the X-Axis ranges of all FFT-Charts to the smallest range possbile without hiding data
         *
         * @param {ITraceChart[]} traceChartList
         * @memberof ChartRangeHelper
         */
        ChartRangeHelper.prototype.resetXRangesFFT = function (traceChartList) {
            var fftChartList = this.getFFTCharts(traceChartList);
            var minX = this.getTotalMinX(fftChartList);
            var maxX = this.getTotalMaxX(fftChartList);
            for (var _i = 0, fftChartList_1 = fftChartList; _i < fftChartList_1.length; _i++) {
                var fftChart = fftChartList_1[_i];
                if (minX != undefined && maxX != undefined) {
                    fftChart.updateChartRangeX(minX, maxX);
                }
            }
        };
        /**
         * return axis display offset
         *
         * @param {number} axisRange
         * @param {number} axisPixelRange
         * @returns {number}
         * @memberof ChartRangeHelper
         */
        ChartRangeHelper.prototype.getAxisOffset = function (axisRange, axisPixelRange) {
            var clcOffset = 0;
            clcOffset = (axisRange / axisPixelRange) * 10;
            var minOffset = exports.SF_axisResolution; // compansate for smallest resolution of syncfution axis
            return Math.max(clcOffset, minOffset);
        };
        /**
         * return axis display offset if the only signal inside the chart is a line
         *
         * @param {number} lineValue
         * @returns {number}
         * @memberof ChartRangeHelper
         */
        ChartRangeHelper.prototype.getAxisOffsetForStraightLines = function (lineValue) {
            var clcOffset = Math.abs(lineValue) * 0.1;
            var minOffset = exports.SF_axisResolution; // compansate for smallest resolution of syncfution axis
            return Math.max(clcOffset, minOffset);
        };
        /**
        * Get the minimum x-Value from the given Charts
        *
        * @param {*} traceChartList
        * @returns {(number|undefined)}
        * @memberof YTChart
        */
        ChartRangeHelper.prototype.getTotalMinX = function (traceChartList) {
            var minX = undefined;
            //put all series in one array
            var allSeries = new Array();
            for (var _i = 0, traceChartList_2 = traceChartList; _i < traceChartList_2.length; _i++) {
                var chart = traceChartList_2[_i];
                for (var _a = 0, _b = chart.series; _a < _b.length; _a++) {
                    var series = _b[_a];
                    allSeries.push(series);
                }
            }
            //loop through all series and calculate the minimum X-Value
            for (var _c = 0, allSeries_1 = allSeries; _c < allSeries_1.length; _c++) {
                var series = allSeries_1[_c];
                if (series.minX != undefined && (minX == undefined || series.minX < minX)) {
                    minX = series.minX;
                }
            }
            return minX;
        };
        /**
         * Get the maximum x-Value from the given Charts
         *
         * @param {*} traceChartList
         * @returns {(number|undefined)}
         * @memberof YTChart
         */
        ChartRangeHelper.prototype.getTotalMaxX = function (traceChartList) {
            var maxX = undefined;
            //put all series in one array
            var allSeries = new Array();
            for (var _i = 0, traceChartList_3 = traceChartList; _i < traceChartList_3.length; _i++) {
                var chart = traceChartList_3[_i];
                for (var _a = 0, _b = chart.series; _a < _b.length; _a++) {
                    var series = _b[_a];
                    allSeries.push(series);
                }
            }
            //loop through all series and calculate the maximum X-Value
            for (var _c = 0, allSeries_2 = allSeries; _c < allSeries_2.length; _c++) {
                var series = allSeries_2[_c];
                if (series.maxX != undefined && (maxX == undefined || series.maxX > maxX)) {
                    maxX = series.maxX;
                }
            }
            return maxX;
        };
        /**
         * Return all Charts in an ChartArray that are from Type YTChart
         *
         * @param {ITraceChart[]} traceChartList
         * @returns {ITraceChart[]}
         * @memberof ChartRangeHelper
         */
        ChartRangeHelper.prototype.getYTCharts = function (traceChartList) {
            var ytCharts = [];
            for (var _i = 0, traceChartList_4 = traceChartList; _i < traceChartList_4.length; _i++) {
                var chart = traceChartList_4[_i];
                if (chart.type == chartManagerChart_1.ChartType.YTChart) {
                    ytCharts.push(chart);
                }
            }
            return ytCharts;
        };
        /**
         * Return all Charts in an ChartArray that are from Type YTChart
         *
         * @param {ITraceChart[]} traceChartList
         * @returns {ITraceChart[]}
         * @memberof ChartRangeHelper
         */
        ChartRangeHelper.prototype.getFFTCharts = function (traceChartList) {
            var fftCharts = [];
            for (var _i = 0, traceChartList_5 = traceChartList; _i < traceChartList_5.length; _i++) {
                var chart = traceChartList_5[_i];
                if (chart.type == chartManagerChart_1.ChartType.FFTChart) {
                    fftCharts.push(chart);
                }
            }
            return fftCharts;
        };
        /**
         * Return all Charts in an ChartArray that are from Type XYChart
         *
         * @param {ITraceChart[]} traceChartList
         * @returns {ITraceChart[]}
         * @memberof ChartRangeHelper
         */
        ChartRangeHelper.prototype.getXYCharts = function (traceChartList) {
            var xyCharts = [];
            for (var _i = 0, traceChartList_6 = traceChartList; _i < traceChartList_6.length; _i++) {
                var chart = traceChartList_6[_i];
                if (chart.type == chartManagerChart_1.ChartType.XYChart) {
                    xyCharts.push(chart);
                }
            }
            return xyCharts;
        };
        return ChartRangeHelper;
    }());
    exports.ChartRangeHelper = ChartRangeHelper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRSYW5nZUhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydFdpZGdldC9oZWxwZXJzL2NoYXJ0UmFuZ2VIZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBSUEsbURBQW1EO0lBQ3RDLFFBQUEsaUJBQWlCLEdBQVcsS0FBSyxDQUFDO0lBQy9DO1FBQUE7UUFnUEEsQ0FBQztRQTlPRzs7Ozs7V0FLRztRQUNILG9EQUF5QixHQUF6QixVQUEwQixjQUE2QjtZQUNuRCxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN6QyxDQUFDO1FBR0Q7Ozs7O1dBS0c7UUFDSCxvREFBeUIsR0FBekIsVUFBMEIsY0FBNkI7WUFDbkQsS0FBa0IsVUFBYyxFQUFkLGlDQUFjLEVBQWQsNEJBQWMsRUFBZCxJQUFjLEVBQUU7Z0JBQTdCLElBQUksS0FBSyx1QkFBQTtnQkFDVixLQUFrQixVQUFrQixFQUFsQixLQUFBLEtBQUssQ0FBQyxVQUFVLEVBQUUsRUFBbEIsY0FBa0IsRUFBbEIsSUFBa0IsRUFBRTtvQkFBakMsSUFBSSxLQUFLLFNBQUE7b0JBQ1YsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN0RCxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBRXRELElBQUksWUFBWSxJQUFJLFNBQVMsSUFBSSxZQUFZLElBQUksU0FBUyxFQUFFO3dCQUN4RCxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUM7cUJBQ3pEO2lCQUNKO2FBQ0o7UUFFTCxDQUFDO1FB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QzVDLElBQUksUUFBUSxHQUFrQixFQUFFLENBQUM7WUFDakMsS0FBa0IsVUFBYyxFQUFkLGlDQUFjLEVBQWQsNEJBQWMsRUFBZCxJQUFjLEVBQUU7Z0JBQTdCLElBQUksS0FBSyx1QkFBQTtnQkFDVixJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksNkJBQVMsQ0FBQyxPQUFPLEVBQUU7b0JBQ2pDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3hCO2FBQ0o7WUFFRCxPQUFPLFFBQVEsQ0FBQztRQUNwQixDQUFDO1FBS0wsdUJBQUM7SUFBRCxDQUFDLEFBaFBELElBZ1BDO0lBRVEsNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVRyYWNlQ2hhcnQgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy90cmFjZUNoYXJ0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENoYXJ0VHlwZSB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2NoYXJ0TWFuYWdlckNoYXJ0XCI7XHJcbmltcG9ydCB7IENoYXJ0Vmlld1NlcmllIH0gZnJvbSBcIi4uL2NoYXJ0Vmlld1NlcmllXCI7XHJcblxyXG4vL3NtYWxsZXMgcmVzb2x1dGlvbiB0aGF0IFNGIGNhbiBkaXNwbGF5IG9uIGFuIGF4aXNcclxuZXhwb3J0IGNvbnN0IFNGX2F4aXNSZXNvbHV0aW9uOiBudW1iZXIgPSAxZS0xMjtcclxuY2xhc3MgQ2hhcnRSYW5nZUhlbHBlciB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgU2V0IGFsbCBYLUF4aXMgcmFuZ2VzIHRvIHRoZSBzbWFsbGVzdCByYW5nZSBwb3NzYmlsZSB3aXRob3V0IGhpZGluZyBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJVHJhY2VDaGFydFtdfSB0cmFjZUNoYXJ0TGlzdFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0UmFuZ2VIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcmVzZXRYUmFuZ2VzQWxsQ2hhcnRUeXBlcyh0cmFjZUNoYXJ0TGlzdDogSVRyYWNlQ2hhcnRbXSkge1xyXG4gICAgICAgIHRoaXMucmVzZXRYUmFuZ2VzWVQodHJhY2VDaGFydExpc3QpO1xyXG4gICAgICAgIHRoaXMucmVzZXRYUmFuZ2VzWFkodHJhY2VDaGFydExpc3QpO1xyXG4gICAgICAgIHRoaXMucmVzZXRYUmFuZ2VzRkZUKHRyYWNlQ2hhcnRMaXN0KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgYWxsIFktQXhpcyByYW5nZXMgdG8gdGhlIHNtYWxsZXN0IHJhbmdlIHBvc3NiaWxlIHdpdGhvdXQgaGlkaW5nIGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lUcmFjZUNoYXJ0W119IHRyYWNlQ2hhcnRMaXN0XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRSYW5nZUhlbHBlclxyXG4gICAgICovXHJcbiAgICByZXNldFlSYW5nZXNBbGxDaGFydFR5cGVzKHRyYWNlQ2hhcnRMaXN0OiBJVHJhY2VDaGFydFtdKSB7XHJcbiAgICAgICAgZm9yIChsZXQgY2hhcnQgb2YgdHJhY2VDaGFydExpc3QpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgeUF4aXMgb2YgY2hhcnQuZ2V0WVNjYWxlcygpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXhpc01pblZhbHVlID0gY2hhcnQuZ2V0U2VyaWVzTWluWUZvclNjYWxlKHlBeGlzKTtcclxuICAgICAgICAgICAgICAgIGxldCBheGlzTWF4VmFsdWUgPSBjaGFydC5nZXRTZXJpZXNNYXhZRm9yU2NhbGUoeUF4aXMpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChheGlzTWluVmFsdWUgIT0gdW5kZWZpbmVkICYmIGF4aXNNYXhWYWx1ZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGFydC51cGRhdGVSYW5nZVkoeUF4aXMsIGF4aXNNaW5WYWx1ZSwgYXhpc01heFZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICpTZXQgdGhlIFgtQXhpcyByYW5nZXMgb2YgYWxsIFlULUNoYXJ0cyB0byB0aGUgc21hbGxlc3QgcmFuZ2UgcG9zc2JpbGUgd2l0aG91dCBoaWRpbmcgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVRyYWNlQ2hhcnRbXX0gdHJhY2VDaGFydExpc3RcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFJhbmdlSGVscGVyXHJcbiAgICAgKi9cclxuICAgIHJlc2V0WFJhbmdlc1lUKHRyYWNlQ2hhcnRMaXN0OiBJVHJhY2VDaGFydFtdKSB7XHJcbiAgICAgICAgbGV0IHl0Q2hhcnRMaXN0OiBJVHJhY2VDaGFydFtdID0gdGhpcy5nZXRZVENoYXJ0cyh0cmFjZUNoYXJ0TGlzdCk7XHJcblxyXG4gICAgICAgIGxldCBtaW5YID0gdGhpcy5nZXRUb3RhbE1pblgoeXRDaGFydExpc3QpO1xyXG4gICAgICAgIGxldCBtYXhYID0gdGhpcy5nZXRUb3RhbE1heFgoeXRDaGFydExpc3QpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCB5dENoYXJ0IG9mIHl0Q2hhcnRMaXN0KSB7XHJcbiAgICAgICAgICAgIGlmIChtaW5YICE9IHVuZGVmaW5lZCAmJiBtYXhYICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgeXRDaGFydC51cGRhdGVDaGFydFJhbmdlWChtaW5YLCBtYXhYKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICpTZXQgdGhlIFgtQXhpcyByYW5nZXMgb2YgYWxsIFhZLUNoYXJ0cyB0byB0aGUgc21hbGxlc3QgcmFuZ2UgcG9zc2JpbGUgd2l0aG91dCBoaWRpbmcgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVRyYWNlQ2hhcnRbXX0gdHJhY2VDaGFydExpc3RcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFJhbmdlSGVscGVyXHJcbiAgICAgKi9cclxuICAgIHJlc2V0WFJhbmdlc1hZKHRyYWNlQ2hhcnRMaXN0OiBJVHJhY2VDaGFydFtdKSB7XHJcbiAgICAgICAgbGV0IHh5Q2hhcnRMaXN0OiBJVHJhY2VDaGFydFtdID0gdGhpcy5nZXRYWUNoYXJ0cyh0cmFjZUNoYXJ0TGlzdCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IHh5Q2hhcnQgb2YgeHlDaGFydExpc3QpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBtaW5YID0gdGhpcy5nZXRUb3RhbE1pblgoW3h5Q2hhcnRdKTtcclxuICAgICAgICAgICAgbGV0IG1heFggPSB0aGlzLmdldFRvdGFsTWF4WChbeHlDaGFydF0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1pblggIT0gdW5kZWZpbmVkICYmIG1heFggIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB4eUNoYXJ0LnVwZGF0ZUNoYXJ0UmFuZ2VYKG1pblgsIG1heFgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpTZXQgdGhlIFgtQXhpcyByYW5nZXMgb2YgYWxsIEZGVC1DaGFydHMgdG8gdGhlIHNtYWxsZXN0IHJhbmdlIHBvc3NiaWxlIHdpdGhvdXQgaGlkaW5nIGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lUcmFjZUNoYXJ0W119IHRyYWNlQ2hhcnRMaXN0XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRSYW5nZUhlbHBlclxyXG4gICAgICovXHJcbiAgICByZXNldFhSYW5nZXNGRlQodHJhY2VDaGFydExpc3Q6IElUcmFjZUNoYXJ0W10pIHtcclxuICAgICAgICBsZXQgZmZ0Q2hhcnRMaXN0OiBJVHJhY2VDaGFydFtdID0gdGhpcy5nZXRGRlRDaGFydHModHJhY2VDaGFydExpc3QpO1xyXG5cclxuICAgICAgICBsZXQgbWluWCA9IHRoaXMuZ2V0VG90YWxNaW5YKGZmdENoYXJ0TGlzdCk7XHJcbiAgICAgICAgbGV0IG1heFggPSB0aGlzLmdldFRvdGFsTWF4WChmZnRDaGFydExpc3QpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBmZnRDaGFydCBvZiBmZnRDaGFydExpc3QpIHtcclxuICAgICAgICAgICAgaWYgKG1pblggIT0gdW5kZWZpbmVkICYmIG1heFggIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBmZnRDaGFydC51cGRhdGVDaGFydFJhbmdlWChtaW5YLCBtYXhYKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXR1cm4gYXhpcyBkaXNwbGF5IG9mZnNldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBheGlzUmFuZ2VcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBheGlzUGl4ZWxSYW5nZVxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFJhbmdlSGVscGVyXHJcbiAgICAgKi9cclxuICAgIGdldEF4aXNPZmZzZXQoYXhpc1JhbmdlOiBudW1iZXIsIGF4aXNQaXhlbFJhbmdlOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBjbGNPZmZzZXQgPSAwO1xyXG4gICAgICAgIGNsY09mZnNldCA9IChheGlzUmFuZ2UgLyBheGlzUGl4ZWxSYW5nZSkgKiAxMFxyXG4gICAgICAgIGxldCBtaW5PZmZzZXQgPSBTRl9heGlzUmVzb2x1dGlvbjsgLy8gY29tcGFuc2F0ZSBmb3Igc21hbGxlc3QgcmVzb2x1dGlvbiBvZiBzeW5jZnV0aW9uIGF4aXNcclxuXHJcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KGNsY09mZnNldCwgbWluT2Zmc2V0KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXR1cm4gYXhpcyBkaXNwbGF5IG9mZnNldCBpZiB0aGUgb25seSBzaWduYWwgaW5zaWRlIHRoZSBjaGFydCBpcyBhIGxpbmVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbGluZVZhbHVlXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0UmFuZ2VIZWxwZXJcclxuICAgICAqL1xyXG4gICAgZ2V0QXhpc09mZnNldEZvclN0cmFpZ2h0TGluZXMobGluZVZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBjbGNPZmZzZXQgPSBNYXRoLmFicyhsaW5lVmFsdWUpICogMC4xO1xyXG4gICAgICAgIGxldCBtaW5PZmZzZXQgPSBTRl9heGlzUmVzb2x1dGlvbjsgLy8gY29tcGFuc2F0ZSBmb3Igc21hbGxlc3QgcmVzb2x1dGlvbiBvZiBzeW5jZnV0aW9uIGF4aXNcclxuICAgICAgICByZXR1cm4gTWF0aC5tYXgoY2xjT2Zmc2V0LCBtaW5PZmZzZXQpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEdldCB0aGUgbWluaW11bSB4LVZhbHVlIGZyb20gdGhlIGdpdmVuIENoYXJ0c1xyXG4gICAgKlxyXG4gICAgKiBAcGFyYW0geyp9IHRyYWNlQ2hhcnRMaXN0XHJcbiAgICAqIEByZXR1cm5zIHsobnVtYmVyfHVuZGVmaW5lZCl9XHJcbiAgICAqIEBtZW1iZXJvZiBZVENoYXJ0XHJcbiAgICAqL1xyXG4gICAgcHVibGljIGdldFRvdGFsTWluWCh0cmFjZUNoYXJ0TGlzdDogSVRyYWNlQ2hhcnRbXSk6IG51bWJlciB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgbGV0IG1pblg6IG51bWJlciB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgLy9wdXQgYWxsIHNlcmllcyBpbiBvbmUgYXJyYXlcclxuICAgICAgICBsZXQgYWxsU2VyaWVzOiBDaGFydFZpZXdTZXJpZVtdID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgZm9yIChsZXQgY2hhcnQgb2YgdHJhY2VDaGFydExpc3QpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgc2VyaWVzIG9mIGNoYXJ0LnNlcmllcykge1xyXG4gICAgICAgICAgICAgICAgYWxsU2VyaWVzLnB1c2goc2VyaWVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9sb29wIHRocm91Z2ggYWxsIHNlcmllcyBhbmQgY2FsY3VsYXRlIHRoZSBtaW5pbXVtIFgtVmFsdWVcclxuICAgICAgICBmb3IgKGxldCBzZXJpZXMgb2YgYWxsU2VyaWVzKSB7XHJcbiAgICAgICAgICAgIGlmIChzZXJpZXMubWluWCAhPSB1bmRlZmluZWQgJiYgKG1pblggPT0gdW5kZWZpbmVkIHx8IHNlcmllcy5taW5YIDwgbWluWCkpIHtcclxuICAgICAgICAgICAgICAgIG1pblggPSBzZXJpZXMubWluWDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1pblg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIG1heGltdW0geC1WYWx1ZSBmcm9tIHRoZSBnaXZlbiBDaGFydHNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IHRyYWNlQ2hhcnRMaXN0XHJcbiAgICAgKiBAcmV0dXJucyB7KG51bWJlcnx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFlUQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFRvdGFsTWF4WCh0cmFjZUNoYXJ0TGlzdDogSVRyYWNlQ2hhcnRbXSk6IG51bWJlciB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgbGV0IG1heFg6IG51bWJlciB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZFxyXG5cclxuICAgICAgICAvL3B1dCBhbGwgc2VyaWVzIGluIG9uZSBhcnJheVxyXG4gICAgICAgIGxldCBhbGxTZXJpZXM6IENoYXJ0Vmlld1NlcmllW10gPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICBmb3IgKGxldCBjaGFydCBvZiB0cmFjZUNoYXJ0TGlzdCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBzZXJpZXMgb2YgY2hhcnQuc2VyaWVzKSB7XHJcbiAgICAgICAgICAgICAgICBhbGxTZXJpZXMucHVzaChzZXJpZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2xvb3AgdGhyb3VnaCBhbGwgc2VyaWVzIGFuZCBjYWxjdWxhdGUgdGhlIG1heGltdW0gWC1WYWx1ZVxyXG4gICAgICAgIGZvciAobGV0IHNlcmllcyBvZiBhbGxTZXJpZXMpXHJcbiAgICAgICAgICAgIGlmIChzZXJpZXMubWF4WCAhPSB1bmRlZmluZWQgJiYgKG1heFggPT0gdW5kZWZpbmVkIHx8IHNlcmllcy5tYXhYID4gbWF4WCkpIHtcclxuICAgICAgICAgICAgICAgIG1heFggPSBzZXJpZXMubWF4WDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtYXhYO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIGFsbCBDaGFydHMgaW4gYW4gQ2hhcnRBcnJheSB0aGF0IGFyZSBmcm9tIFR5cGUgWVRDaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVRyYWNlQ2hhcnRbXX0gdHJhY2VDaGFydExpc3RcclxuICAgICAqIEByZXR1cm5zIHtJVHJhY2VDaGFydFtdfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0UmFuZ2VIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFlUQ2hhcnRzKHRyYWNlQ2hhcnRMaXN0OiBJVHJhY2VDaGFydFtdKTogSVRyYWNlQ2hhcnRbXSB7XHJcbiAgICAgICAgbGV0IHl0Q2hhcnRzOiBJVHJhY2VDaGFydFtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgY2hhcnQgb2YgdHJhY2VDaGFydExpc3QpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJ0LnR5cGUgPT0gQ2hhcnRUeXBlLllUQ2hhcnQpIHtcclxuICAgICAgICAgICAgICAgIHl0Q2hhcnRzLnB1c2goY2hhcnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4geXRDaGFydHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gYWxsIENoYXJ0cyBpbiBhbiBDaGFydEFycmF5IHRoYXQgYXJlIGZyb20gVHlwZSBZVENoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJVHJhY2VDaGFydFtdfSB0cmFjZUNoYXJ0TGlzdFxyXG4gICAgICogQHJldHVybnMge0lUcmFjZUNoYXJ0W119XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRSYW5nZUhlbHBlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RkZUQ2hhcnRzKHRyYWNlQ2hhcnRMaXN0OiBJVHJhY2VDaGFydFtdKTogSVRyYWNlQ2hhcnRbXSB7XHJcbiAgICAgICAgbGV0IGZmdENoYXJ0czogSVRyYWNlQ2hhcnRbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGNoYXJ0IG9mIHRyYWNlQ2hhcnRMaXN0KSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFydC50eXBlID09IENoYXJ0VHlwZS5GRlRDaGFydCkge1xyXG4gICAgICAgICAgICAgICAgZmZ0Q2hhcnRzLnB1c2goY2hhcnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmZ0Q2hhcnRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIGFsbCBDaGFydHMgaW4gYW4gQ2hhcnRBcnJheSB0aGF0IGFyZSBmcm9tIFR5cGUgWFlDaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVRyYWNlQ2hhcnRbXX0gdHJhY2VDaGFydExpc3RcclxuICAgICAqIEByZXR1cm5zIHtJVHJhY2VDaGFydFtdfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0UmFuZ2VIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFhZQ2hhcnRzKHRyYWNlQ2hhcnRMaXN0OiBJVHJhY2VDaGFydFtdKTogSVRyYWNlQ2hhcnRbXSB7XHJcbiAgICAgICAgbGV0IHh5Q2hhcnRzOiBJVHJhY2VDaGFydFtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgY2hhcnQgb2YgdHJhY2VDaGFydExpc3QpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJ0LnR5cGUgPT0gQ2hhcnRUeXBlLlhZQ2hhcnQpIHtcclxuICAgICAgICAgICAgICAgIHh5Q2hhcnRzLnB1c2goY2hhcnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4geHlDaGFydHM7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG59XHJcblxyXG5leHBvcnQgeyBDaGFydFJhbmdlSGVscGVyIH07Il19