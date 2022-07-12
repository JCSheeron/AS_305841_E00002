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
define(["require", "exports", "./ChartBase", "../../common/seriesHelper", "./chartExtensions/chartExtensions"], function (require, exports, ChartBase_1, seriesHelper_1, chartExtensions_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BasicChart = /** @class */ (function (_super) {
        __extends(BasicChart, _super);
        function BasicChart(parentView, name, scale) {
            return _super.call(this, parentView, name, scale) || this;
        }
        /**
         * dispose chart
         *
         * @memberof BasicChart
         */
        BasicChart.prototype.dispose = function () {
            this.removeWidgetFromView(this.parentView);
            _super.prototype.dispose.call(this);
        };
        /**
         *
         *
         * @protected
         * @param {IView} parentView
         * @memberof BasicChart
         */
        BasicChart.prototype.addWidgetToView = function (parentView) {
            if (parentView) {
                parentView.addWidget(this);
            }
        };
        /**
         *
         *
         * @private
         * @param {ChartViewChartManager} chartManager
         * @memberof BasicChart
         */
        BasicChart.prototype.removeWidgetFromView = function (parentView) {
            if (parentView) {
                parentView.removeWidget(this);
            }
        };
        BasicChart.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            this.initializeCursorHandlers();
            this.attachChartExtensions(this.chartInstance);
            this.xAxisWidth = this.chart.getXAxisWidth();
        };
        /**
         * Reinitializes the chart
         *
         * @memberof BasicChart
         */
        BasicChart.prototype.reinitialize = function () {
            _super.prototype.reinitialize.call(this);
            this.setAvailableSeriesAsDataSource();
            this.attachChartExtensions(this.chartInstance);
            this.xAxisWidth = this.chart.getXAxisWidth();
            this.cursorHandler = undefined;
            this.initializeCursorHandlers();
        };
        /**
         * Attaches a extension instance
         *
         * @private
         * @param {*} chartInstance
         * @returns {*}
         * @memberof BasicChart
         */
        BasicChart.prototype.attachChartExtensions = function (chartInstance) {
            // inject an extension provider
            var basicChartExtensions = new chartExtensions_1.ChartExtensions(this);
            // use an yt/fft optimization algorithm
            basicChartExtensions.chartDataOptimizer.trimSeriesForChartBounds = basicChartExtensions.chartDataOptimizer.trimSeriesForChartBoundsYt;
            // set the chart extensions
            chartInstance.chartExtensions = basicChartExtensions;
        };
        /**
         * Send data of the series to the chart instance
         *
         * @memberof BasicChart
         */
        BasicChart.prototype.setAvailableSeriesAsDataSource = function () {
            var traceDataSeries = new Array();
            for (var i = 0; i < this.scales.length; i++) {
                for (var j = 0; j < this.scales[i].childs.length; j++) {
                    if (this.scales[i].childs[j].rawPointsValid) {
                        var effectiveSerie = this.chartInstance.chartExtensions ? this.chartInstance.chartExtensions.chartDataOptimizer.attachSeries(this.scales[i].childs[j]) : this.scales[i].childs[j];
                        traceDataSeries.push(this.chart.createTraceDataSeries(effectiveSerie, this.scales[i].id));
                    }
                }
            }
            this.chart.setSeries(traceDataSeries);
        };
        /**
         * Adds a new y axis into the chart
         *
         * @param {Scale} yAxis
         * @param {boolean} opposedPosition
         * @param {string} color
         * @memberof BasicChart
         */
        BasicChart.prototype.addYScale = function (scale, position) {
            var newAxisWidth = 71;
            this.chart.addYAxis(scale.id, scale.minYValue, scale.maxYValue, position);
            this.xAxisWidth = this.chart.getXAxisWidth() - newAxisWidth;
            if (this.scales.indexOf(scale) == -1) {
                this.scales.push(scale);
            }
        };
        /**
         *
         *
         * @param {Scale} yScale
         * @memberof BasicChart
         */
        BasicChart.prototype.removeYScaleFromChart = function (yScale) {
            this.chart.removeYAxis(yScale.id);
            this.chart.redraw();
            this.xAxisWidth = this.chart.getXAxisWidth();
            var scaleIndex = this.scales.indexOf(yScale);
            if (scaleIndex > -1) {
                this.scales.splice(scaleIndex, 1);
            }
        };
        /**
         *
         *
         * @param {*} referenceAxis
         * @param {number} min
         * @param {number} max
         * @memberof BasicChart
         */
        BasicChart.prototype.onSynchronizeScaleRange = function (scale, min, max) {
            var yScales = this.getYScales();
            for (var _i = 0, yScales_1 = yScales; _i < yScales_1.length; _i++) {
                var yScale = yScales_1[_i];
                yScale.minXValue = min;
                yScale.maxXValue = max;
            }
            var axis = this.chart.getAxis(this.primaryXAxisName);
            if (axis != undefined) {
                axis.setAxisRange({ min: min, max: max });
            }
        };
        BasicChart.prototype.getTimestampInSeries = function (point, availableSeries) {
            // get the points of the available series
            // get the timestamps series from the signal series
            var timestampSeries;
            timestampSeries = availableSeries.map(function (singleSeries) { return singleSeries.serie.timestamps; });
            var nearestPoint = seriesHelper_1.SeriesHelper.findNearestValueFromCollection(point.x, timestampSeries);
            return nearestPoint;
        };
        /**
         * Gets a chart point for the specified timestamp
         *
         * @private
         * @param {number} leadCursorTimeStamp
         * @returns {Point}
         * @memberof BasicChart
         */
        BasicChart.prototype.getCursorPoint = function (timestamp, series, seriesIndex) {
            var cursorPoint = series[seriesIndex].serie.previousPointFromTimestamp(timestamp);
            return { timestamp: cursorPoint.x, x: cursorPoint.x, y: cursorPoint.y };
        };
        /**
         *
         *
         * @protected
         * @param {{ x: number, y: number}} currPos
         * @param {{ x: number, y: number}} clickPos
         * @returns {number}
         * @memberof BasicChart
         */
        BasicChart.prototype.absDistanceToCursor = function (currPos, clickPos) {
            return Math.sqrt(Math.pow(clickPos.x - currPos.x, 2));
        };
        ;
        /**
         * Add drop locations in the chart
         *
         * @param {Array<BaseSeries>} serie
         * @returns
         * @memberof BasicChart
         */
        BasicChart.prototype.addSerieDropLocations = function (serie, chartManagerChart) {
            if (chartManagerChart.childs[0].dropPossible) {
                this.addSerieYAxisDropLocations(serie[0]);
            }
            if (chartManagerChart.dropPossible) {
                this.addSerieChartAreaDropLocations(serie[0]);
            }
        };
        /**
         * Add drop locations to the y axis
         *
         * @private
         * @param {*} data
         * @memberof BasicChart
         */
        BasicChart.prototype.addSerieYAxisDropLocations = function (data) {
            if (data.name)
                this.calculateChartDimensions();
            for (var _i = 0, _a = this.axisBounds; _i < _a.length; _i++) {
                var axisBound = _a[_i];
                var offsetWidth = 4;
                var offsetLeft = 2;
                if (axisBound.axis.orientation == "vertical") {
                    $(this.mainDiv).append('<div id="' + this.axisDropZoneId + axisBound.axis.name + '" style="position:absolute; width: ' + (axisBound.width - offsetWidth) + 'px; height: ' + (axisBound.height) + 'px; left:' + (axisBound.x + offsetLeft) + 'px; top:' + (axisBound.y) + 'px" class="dropLocationArea"></div>');
                }
            }
        };
        /**
         * Add drop locations in the chart area
         *
         * @private
         * @param {BaseSeries} serie
         * @memberof BasicChart
         */
        BasicChart.prototype.addSerieChartAreaDropLocations = function (serie) {
            var maximumYAxis = 2;
            if (serie.name)
                if (this.scales.length < maximumYAxis) {
                    var chartArea = this.chart.getChartArea();
                    $(this.mainDiv).append('<div id="' + this.axisDropZoneId + "_chartArea" + '" style="z-index: 5; position:absolute; width: ' + (chartArea.width) + 'px; height: ' + (chartArea.height) + 'px; left:' + (chartArea.x) + 'px; top:' + (chartArea.y) + 'px" class="dropLocationArea"></div>');
                }
        };
        /**
        * Returns the current drop location type (e.g. assign to scale, add new scale, invalid for drop)
        *
        * @param {*} currentTarget
        * @returns {DropLocationType}
        * @memberof BasicChart
        */
        BasicChart.prototype.getDropLocationType = function (currentTarget) {
            if (currentTarget.id.includes("_axisDropZoneScale")) {
                return ChartBase_1.DropLocationType.assignToScale;
            }
            if (currentTarget.id.includes("_axisDropZone_chartArea") && this.scales.length < 2) {
                return ChartBase_1.DropLocationType.addNewScale;
            }
            return ChartBase_1.DropLocationType.invalid;
        };
        /**
         * Highlight droppable areas if a valid signal is dragged over
         *
         * @param {*} currentTarget
         * @memberof BasicChart
         */
        BasicChart.prototype.updateDroppableAreas = function (currentTarget) {
            if (currentTarget.id.includes("_axisDropZone_chartArea") || currentTarget.id.includes("_refCursor_")) {
                var chartArea = document.getElementById(this.axisDropZoneChartAreaId);
                if (chartArea != undefined) {
                    chartArea.classList.add('draggedOver');
                }
                for (var i = 0; i < this.scales.length; i++) {
                    var axisArea = document.getElementById(this.axisDropZoneId + this.scales[i].id);
                    if (axisArea != undefined) {
                        axisArea.classList.remove('draggedOver');
                    }
                }
            }
            else if (currentTarget.id.includes("_axisDropZoneScale")) {
                for (var i = 0; i < this.scales.length; i++) {
                    if (currentTarget.id.includes(this.scales[i].id)) {
                        var axisArea = document.getElementById(this.axisDropZoneId + this.scales[i].id);
                        if (axisArea != undefined) {
                            axisArea.classList.add('draggedOver');
                        }
                    }
                    else {
                        var axisArea = document.getElementById(this.axisDropZoneId + this.scales[i].id);
                        if (axisArea != undefined) {
                            axisArea.classList.remove('draggedOver');
                        }
                    }
                }
                var chartArea = document.getElementById(this.axisDropZoneChartAreaId);
                if (chartArea != undefined) {
                    chartArea.classList.remove('draggedOver');
                }
            }
        };
        ;
        /**
         * Reset highlighted areas
         *
         * @memberof BasicChart
         */
        BasicChart.prototype.resetHighlighting = function () {
            var chartArea = document.getElementById(this.axisDropZoneChartAreaId);
            if (chartArea != undefined) {
                chartArea.classList.remove('draggedOver');
            }
            for (var i = 0; i < this.scales.length; i++) {
                var axisArea = document.getElementById(this.axisDropZoneId + this.scales[i].id);
                if (axisArea != undefined) {
                    axisArea.classList.remove('draggedOver');
                }
            }
        };
        BasicChart.prototype.initializeCursorHandlers = function () { };
        return BasicChart;
    }(ChartBase_1.ChartBase));
    exports.BasicChart = BasicChart;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzaWNDaGFydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydFdpZGdldC9CYXNpY0NoYXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFZQTtRQUFrQyw4QkFBUztRQUl2QyxvQkFBWSxVQUFpQixFQUFFLElBQVksRUFBRSxLQUFjO21CQUN2RCxrQkFBTSxVQUFVLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQztRQUNsQyxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNJLDRCQUFPLEdBQWQ7WUFDSSxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzNDLGlCQUFNLE9BQU8sV0FBRSxDQUFDO1FBQ3BCLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDTyxvQ0FBZSxHQUF6QixVQUEwQixVQUFrQjtZQUN4QyxJQUFJLFVBQVUsRUFBRTtnQkFDWixVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzlCO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLHlDQUFvQixHQUE1QixVQUE2QixVQUFpQjtZQUMxQyxJQUFJLFVBQVUsRUFBRTtnQkFDWixVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2pDO1FBQ0wsQ0FBQztRQUVELGdDQUFXLEdBQVg7WUFDSSxpQkFBTSxXQUFXLFdBQUUsQ0FBQztZQUVwQixJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRS9DLElBQUksQ0FBQyxVQUFVLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNsRCxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNJLGlDQUFZLEdBQW5CO1lBQ0ksaUJBQU0sWUFBWSxXQUFFLENBQUM7WUFDckIsSUFB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UyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQzt5QkFDN0M7cUJBQ0o7aUJBQ0o7Z0JBRUQsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztnQkFDdEUsSUFBRyxTQUFTLElBQUksU0FBUyxFQUFFO29CQUN2QixTQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztpQkFDOUM7YUFDSjtRQUNMLENBQUM7UUFBQSxDQUFDO1FBRUY7Ozs7V0FJRztRQUNJLHNDQUFpQixHQUF4QjtZQUNJLElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDdEUsSUFBRyxTQUFTLElBQUksU0FBUyxFQUFFO2dCQUN2QixTQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUM5QztZQUNELEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDdkMsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2hGLElBQUcsUUFBUSxJQUFJLFNBQVMsRUFBRTtvQkFDdEIsUUFBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7aUJBQzdDO2FBQ0o7UUFDTCxDQUFDO1FBRVMsNkNBQXdCLEdBQWxDLGNBQXVDLENBQUM7UUFFNUMsaUJBQUM7SUFBRCxDQUFDLEFBalZELENBQWtDLHFCQUFTLEdBaVYxQztJQUVRLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhcnRCYXNlLCBEcm9wTG9jYXRpb25UeXBlLCBUaW1lUG9pbnQgfSBmcm9tIFwiLi9DaGFydEJhc2VcIjtcclxuaW1wb3J0IHsgU2VyaWVzSGVscGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJpZXNIZWxwZXJcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3Nlcmllcy9iYXNlU2VyaWVzXCI7XHJcbmltcG9ydCB7IFNjYWxlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvc2NhbGVcIjtcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJQ2hhcnRNYW5hZ2VyQ2hhcnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9pbnRlcmZhY2VzL2NoYXJ0TWFuYWdlckNoYXJ0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEF4aXNQb3NpdGlvbiB9IGZyb20gXCIuLi8uLi9jb3JlL2ludGVyZmFjZXMvY29tcG9uZW50cy91aS9jaGFydC9jaGFydEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDaGFydEV4dGVuc2lvbnMgfSBmcm9tIFwiLi9jaGFydEV4dGVuc2lvbnMvY2hhcnRFeHRlbnNpb25zXCI7XHJcbmltcG9ydCB7IEN1cnNvckhhbmRsZXIgfSBmcm9tIFwiLi9jdXJzb3IvQ3Vyc29ySGFuZGxlclwiO1xyXG5pbXBvcnQgeyBDaGFydFZpZXdTZXJpZSB9IGZyb20gXCIuL2NoYXJ0Vmlld1NlcmllXCI7XHJcbmltcG9ydCB7IElWaWV3IH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL3ZpZXdJbnRlcmZhY2VcIjtcclxuXHJcbmFic3RyYWN0IGNsYXNzIEJhc2ljQ2hhcnQgZXh0ZW5kcyBDaGFydEJhc2V7XHJcbiAgICBcclxuICAgIGFic3RyYWN0IGN1cnNvckhhbmRsZXI6IEN1cnNvckhhbmRsZXJ8dW5kZWZpbmVkO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBhcmVudFZpZXc6IElWaWV3LCBuYW1lOiBzdHJpbmcsIHNjYWxlOiBTY2FsZVtdKSB7XHJcbiAgICAgICAgc3VwZXIocGFyZW50VmlldywgbmFtZSwgc2NhbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZGlzcG9zZSBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCYXNpY0NoYXJ0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXNwb3NlKCl7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVXaWRnZXRGcm9tVmlldyh0aGlzLnBhcmVudFZpZXcpO1xyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHtJVmlld30gcGFyZW50Vmlld1xyXG4gICAgICogQG1lbWJlcm9mIEJhc2ljQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFkZFdpZGdldFRvVmlldyhwYXJlbnRWaWV3IDogSVZpZXcpIHtcclxuICAgICAgICBpZiAocGFyZW50Vmlldykge1xyXG4gICAgICAgICAgICBwYXJlbnRWaWV3LmFkZFdpZGdldCh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0NoYXJ0Vmlld0NoYXJ0TWFuYWdlcn0gY2hhcnRNYW5hZ2VyXHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzaWNDaGFydFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlbW92ZVdpZGdldEZyb21WaWV3KHBhcmVudFZpZXc6IElWaWV3KSB7XHJcbiAgICAgICAgaWYgKHBhcmVudFZpZXcpIHtcclxuICAgICAgICAgICAgcGFyZW50Vmlldy5yZW1vdmVXaWRnZXQodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVkKCl7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZWQoKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVDdXJzb3JIYW5kbGVycygpO1xyXG4gICAgICAgIHRoaXMuYXR0YWNoQ2hhcnRFeHRlbnNpb25zKHRoaXMuY2hhcnRJbnN0YW5jZSk7XHJcblxyXG4gICAgICAgIHRoaXMueEF4aXNXaWR0aCA9ICB0aGlzLmNoYXJ0LmdldFhBeGlzV2lkdGgoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlaW5pdGlhbGl6ZXMgdGhlIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJhc2ljQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlaW5pdGlhbGl6ZSgpIHtcclxuICAgICAgICBzdXBlci5yZWluaXRpYWxpemUoKTsgXHJcbiAgICAgICAgdGhpcy5zZXRBdmFpbGFibGVTZXJpZXNBc0RhdGFTb3VyY2UoKTtcclxuICAgICAgICB0aGlzLmF0dGFjaENoYXJ0RXh0ZW5zaW9ucyh0aGlzLmNoYXJ0SW5zdGFuY2UpO1xyXG5cclxuICAgICAgICB0aGlzLnhBeGlzV2lkdGggPSAgdGhpcy5jaGFydC5nZXRYQXhpc1dpZHRoKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY3Vyc29ySGFuZGxlciA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVDdXJzb3JIYW5kbGVycygpOyBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaGVzIGEgZXh0ZW5zaW9uIGluc3RhbmNlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gY2hhcnRJbnN0YW5jZVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzaWNDaGFydFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGF0dGFjaENoYXJ0RXh0ZW5zaW9ucyhjaGFydEluc3RhbmNlOiBhbnkpOiBhbnkge1xyXG5cclxuICAgICAgICAvLyBpbmplY3QgYW4gZXh0ZW5zaW9uIHByb3ZpZGVyXHJcbiAgICAgICAgbGV0IGJhc2ljQ2hhcnRFeHRlbnNpb25zID0gbmV3IENoYXJ0RXh0ZW5zaW9ucyh0aGlzKTtcclxuICAgICAgICAvLyB1c2UgYW4geXQvZmZ0IG9wdGltaXphdGlvbiBhbGdvcml0aG1cclxuICAgICAgICBiYXNpY0NoYXJ0RXh0ZW5zaW9ucy5jaGFydERhdGFPcHRpbWl6ZXIudHJpbVNlcmllc0ZvckNoYXJ0Qm91bmRzID0gYmFzaWNDaGFydEV4dGVuc2lvbnMuY2hhcnREYXRhT3B0aW1pemVyLnRyaW1TZXJpZXNGb3JDaGFydEJvdW5kc1l0O1xyXG4gICAgICAgIC8vIHNldCB0aGUgY2hhcnQgZXh0ZW5zaW9uc1xyXG4gICAgICAgIGNoYXJ0SW5zdGFuY2UuY2hhcnRFeHRlbnNpb25zID0gYmFzaWNDaGFydEV4dGVuc2lvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZW5kIGRhdGEgb2YgdGhlIHNlcmllcyB0byB0aGUgY2hhcnQgaW5zdGFuY2VcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzaWNDaGFydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0QXZhaWxhYmxlU2VyaWVzQXNEYXRhU291cmNlKCkge1xyXG4gICAgICAgIGxldCB0cmFjZURhdGFTZXJpZXMgPSBuZXcgQXJyYXkoKTtcclxuICAgICBcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zY2FsZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgdGhpcy5zY2FsZXNbaV0uY2hpbGRzLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc2NhbGVzW2ldLmNoaWxkc1tqXS5yYXdQb2ludHNWYWxpZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVmZmVjdGl2ZVNlcmllID0gdGhpcy5jaGFydEluc3RhbmNlLmNoYXJ0RXh0ZW5zaW9ucyA/IHRoaXMuY2hhcnRJbnN0YW5jZS5jaGFydEV4dGVuc2lvbnMuY2hhcnREYXRhT3B0aW1pemVyLmF0dGFjaFNlcmllcyh0aGlzLnNjYWxlc1tpXS5jaGlsZHNbal0pIDogdGhpcy5zY2FsZXNbaV0uY2hpbGRzW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYWNlRGF0YVNlcmllcy5wdXNoKHRoaXMuY2hhcnQuY3JlYXRlVHJhY2VEYXRhU2VyaWVzKGVmZmVjdGl2ZVNlcmllLCB0aGlzLnNjYWxlc1tpXS5pZCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNoYXJ0LnNldFNlcmllcyh0cmFjZURhdGFTZXJpZXMpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgbmV3IHkgYXhpcyBpbnRvIHRoZSBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U2NhbGV9IHlBeGlzXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wcG9zZWRQb3NpdGlvblxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbG9yXHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzaWNDaGFydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkWVNjYWxlKHNjYWxlOiBTY2FsZSwgcG9zaXRpb24gOiBBeGlzUG9zaXRpb24pe1xyXG4gICAgICAgIGNvbnN0IG5ld0F4aXNXaWR0aCA9IDcxO1xyXG4gICAgXHR0aGlzLmNoYXJ0LmFkZFlBeGlzKHNjYWxlLmlkLCBzY2FsZS5taW5ZVmFsdWUsIHNjYWxlLm1heFlWYWx1ZSwgcG9zaXRpb24pO1xyXG5cclxuICAgIFx0dGhpcy54QXhpc1dpZHRoID0gdGhpcy5jaGFydC5nZXRYQXhpc1dpZHRoKCkgLSBuZXdBeGlzV2lkdGg7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuc2NhbGVzLmluZGV4T2Yoc2NhbGUpID09IC0xKXtcclxuICAgICAgICAgICAgdGhpcy5zY2FsZXMucHVzaChzY2FsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTY2FsZX0geVNjYWxlXHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzaWNDaGFydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlWVNjYWxlRnJvbUNoYXJ0KHlTY2FsZTogU2NhbGUpe1xyXG4gICAgICAgIHRoaXMuY2hhcnQucmVtb3ZlWUF4aXMoeVNjYWxlLmlkKTtcclxuICAgICAgICB0aGlzLmNoYXJ0LnJlZHJhdygpO1xyXG5cclxuICAgICAgICB0aGlzLnhBeGlzV2lkdGggPSB0aGlzLmNoYXJ0LmdldFhBeGlzV2lkdGgoKTtcclxuICAgICAgICBsZXQgc2NhbGVJbmRleCA9IHRoaXMuc2NhbGVzLmluZGV4T2YoeVNjYWxlKTtcclxuICAgICAgICBpZiAoc2NhbGVJbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NhbGVzLnNwbGljZShzY2FsZUluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gcmVmZXJlbmNlQXhpc1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1pblxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1heFxyXG4gICAgICogQG1lbWJlcm9mIEJhc2ljQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uU3luY2hyb25pemVTY2FsZVJhbmdlKHNjYWxlIDogU2NhbGUsIG1pbjpudW1iZXIsIG1heDpudW1iZXIpIHtcclxuICAgICAgICBsZXQgeVNjYWxlcyA9IHRoaXMuZ2V0WVNjYWxlcygpO1xyXG4gICAgICAgIGZvcihsZXQgeVNjYWxlIG9mIHlTY2FsZXMpe1xyXG4gICAgICAgICAgICB5U2NhbGUubWluWFZhbHVlID0gbWluO1xyXG4gICAgICAgICAgICB5U2NhbGUubWF4WFZhbHVlID0gbWF4O1xyXG4gICAgICAgIH1cclxuICAgICAgICAgbGV0IGF4aXMgPSB0aGlzLmNoYXJ0LmdldEF4aXModGhpcy5wcmltYXJ5WEF4aXNOYW1lKTtcclxuICAgICAgICAgaWYoYXhpcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBheGlzLnNldEF4aXNSYW5nZSh7bWluLCBtYXh9KTtcclxuICAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0VGltZXN0YW1wSW5TZXJpZXMocG9pbnQ6IElQb2ludCwgYXZhaWxhYmxlU2VyaWVzIDogQ2hhcnRWaWV3U2VyaWVbXSkgOiBudW1iZXJ7XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgcG9pbnRzIG9mIHRoZSBhdmFpbGFibGUgc2VyaWVzXHJcbiAgICAgICAgLy8gZ2V0IHRoZSB0aW1lc3RhbXBzIHNlcmllcyBmcm9tIHRoZSBzaWduYWwgc2VyaWVzXHJcbiAgICAgICAgbGV0IHRpbWVzdGFtcFNlcmllcztcclxuICAgICAgICB0aW1lc3RhbXBTZXJpZXM9IGF2YWlsYWJsZVNlcmllcy5tYXAoKHNpbmdsZVNlcmllcyk9PnsgcmV0dXJuIHNpbmdsZVNlcmllcy5zZXJpZS50aW1lc3RhbXBzfSk7ICAgICAgICBcclxuICAgICAgICBsZXQgbmVhcmVzdFBvaW50ID0gU2VyaWVzSGVscGVyLmZpbmROZWFyZXN0VmFsdWVGcm9tQ29sbGVjdGlvbihwb2ludC54LCB0aW1lc3RhbXBTZXJpZXMpO1xyXG5cclxuICAgICAgICByZXR1cm4gbmVhcmVzdFBvaW50O1xyXG4gICAgfVxyXG5cclxuIFxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIGEgY2hhcnQgcG9pbnQgZm9yIHRoZSBzcGVjaWZpZWQgdGltZXN0YW1wXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsZWFkQ3Vyc29yVGltZVN0YW1wXHJcbiAgICAgKiBAcmV0dXJucyB7UG9pbnR9XHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzaWNDaGFydFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0Q3Vyc29yUG9pbnQodGltZXN0YW1wOiBudW1iZXIsc2VyaWVzOiBDaGFydFZpZXdTZXJpZVtdLCBzZXJpZXNJbmRleDpudW1iZXIpOiBUaW1lUG9pbnQge1xyXG4gICAgICAgIGxldCBjdXJzb3JQb2ludCA9IHNlcmllc1tzZXJpZXNJbmRleF0uc2VyaWUucHJldmlvdXNQb2ludEZyb21UaW1lc3RhbXAodGltZXN0YW1wKTtcclxuICAgICAgICByZXR1cm4ge3RpbWVzdGFtcDogY3Vyc29yUG9pbnQueCwgeDogY3Vyc29yUG9pbnQueCwgeTpjdXJzb3JQb2ludC55IH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7eyB4OiBudW1iZXIsIHk6IG51bWJlcn19IGN1cnJQb3NcclxuICAgICAqIEBwYXJhbSB7eyB4OiBudW1iZXIsIHk6IG51bWJlcn19IGNsaWNrUG9zXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIEJhc2ljQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFic0Rpc3RhbmNlVG9DdXJzb3IgKGN1cnJQb3M6IHsgeDogbnVtYmVyLCB5OiBudW1iZXJ9LCBcclxuICAgICAgICBjbGlja1BvczogeyB4OiBudW1iZXIsIHk6IG51bWJlcn0pOiBudW1iZXJ7XHJcblxyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3coY2xpY2tQb3MueCAtIGN1cnJQb3MueCwgMikpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBkcm9wIGxvY2F0aW9ucyBpbiB0aGUgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEJhc2VTZXJpZXM+fSBzZXJpZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBCYXNpY0NoYXJ0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRTZXJpZURyb3BMb2NhdGlvbnMoc2VyaWU6IEFycmF5PEJhc2VTZXJpZXM+LCBjaGFydE1hbmFnZXJDaGFydDogSUNoYXJ0TWFuYWdlckNoYXJ0KXtcclxuICAgICAgICBpZiAoY2hhcnRNYW5hZ2VyQ2hhcnQuY2hpbGRzWzBdLmRyb3BQb3NzaWJsZSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZFNlcmllWUF4aXNEcm9wTG9jYXRpb25zKHNlcmllWzBdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoYXJ0TWFuYWdlckNoYXJ0LmRyb3BQb3NzaWJsZSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZFNlcmllQ2hhcnRBcmVhRHJvcExvY2F0aW9ucyhzZXJpZVswXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIGRyb3AgbG9jYXRpb25zIHRvIHRoZSB5IGF4aXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBkYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzaWNDaGFydFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZFNlcmllWUF4aXNEcm9wTG9jYXRpb25zKGRhdGE6IEJhc2VTZXJpZXMpe1xyXG4gICAgICAgIGlmKGRhdGEubmFtZSlcclxuICAgICAgICB0aGlzLmNhbGN1bGF0ZUNoYXJ0RGltZW5zaW9ucygpO1xyXG4gICAgICAgIGZvcihsZXQgYXhpc0JvdW5kIG9mIHRoaXMuYXhpc0JvdW5kcyl7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXRXaWR0aCA9IDQ7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXRMZWZ0ID0gMjtcclxuICAgICAgICAgICAgaWYoYXhpc0JvdW5kLmF4aXMub3JpZW50YXRpb24gPT0gXCJ2ZXJ0aWNhbFwiKXtcclxuICAgICAgICAgICAgICAgICQodGhpcy5tYWluRGl2KS5hcHBlbmQoJzxkaXYgaWQ9XCInK3RoaXMuYXhpc0Ryb3Bab25lSWQgKyBheGlzQm91bmQuYXhpcy5uYW1lKydcIiBzdHlsZT1cInBvc2l0aW9uOmFic29sdXRlOyB3aWR0aDogJysgKGF4aXNCb3VuZC53aWR0aC1vZmZzZXRXaWR0aCkgKyAncHg7IGhlaWdodDogJysgKGF4aXNCb3VuZC5oZWlnaHQpICsncHg7IGxlZnQ6JysoYXhpc0JvdW5kLnggKyBvZmZzZXRMZWZ0KSsncHg7IHRvcDonKyhheGlzQm91bmQueSkrJ3B4XCIgY2xhc3M9XCJkcm9wTG9jYXRpb25BcmVhXCI+PC9kaXY+Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgZHJvcCBsb2NhdGlvbnMgaW4gdGhlIGNoYXJ0IGFyZWFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZVxyXG4gICAgICogQG1lbWJlcm9mIEJhc2ljQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRTZXJpZUNoYXJ0QXJlYURyb3BMb2NhdGlvbnMoc2VyaWU6IEJhc2VTZXJpZXMpe1xyXG4gICAgICAgIGNvbnN0IG1heGltdW1ZQXhpcyA9IDI7XHJcbiAgICAgICAgaWYoc2VyaWUubmFtZSlcclxuICAgICAgXHRpZih0aGlzLnNjYWxlcy5sZW5ndGggPCBtYXhpbXVtWUF4aXMpe1xyXG4gICAgICAgICAgICBsZXQgY2hhcnRBcmVhID0gdGhpcy5jaGFydC5nZXRDaGFydEFyZWEoKTtcclxuICAgICAgICAgICAgJCh0aGlzLm1haW5EaXYpLmFwcGVuZCgnPGRpdiBpZD1cIicrIHRoaXMuYXhpc0Ryb3Bab25lSWQgK1wiX2NoYXJ0QXJlYVwiKydcIiBzdHlsZT1cInotaW5kZXg6IDU7IHBvc2l0aW9uOmFic29sdXRlOyB3aWR0aDogJysgKGNoYXJ0QXJlYS53aWR0aCkgKyAncHg7IGhlaWdodDogJysgKGNoYXJ0QXJlYS5oZWlnaHQpICsncHg7IGxlZnQ6JysoY2hhcnRBcmVhLngpKydweDsgdG9wOicrKGNoYXJ0QXJlYS55KSsncHhcIiBjbGFzcz1cImRyb3BMb2NhdGlvbkFyZWFcIj48L2Rpdj4nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgY3VycmVudCBkcm9wIGxvY2F0aW9uIHR5cGUgKGUuZy4gYXNzaWduIHRvIHNjYWxlLCBhZGQgbmV3IHNjYWxlLCBpbnZhbGlkIGZvciBkcm9wKVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gY3VycmVudFRhcmdldFxyXG4gICAgICogQHJldHVybnMge0Ryb3BMb2NhdGlvblR5cGV9XHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzaWNDaGFydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RHJvcExvY2F0aW9uVHlwZShjdXJyZW50VGFyZ2V0OiBhbnkpOiBEcm9wTG9jYXRpb25UeXBle1xyXG4gICAgICAgIGlmKGN1cnJlbnRUYXJnZXQuaWQuaW5jbHVkZXMoXCJfYXhpc0Ryb3Bab25lU2NhbGVcIikpe1xyXG4gICAgICAgICAgICByZXR1cm4gRHJvcExvY2F0aW9uVHlwZS5hc3NpZ25Ub1NjYWxlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihjdXJyZW50VGFyZ2V0LmlkLmluY2x1ZGVzKFwiX2F4aXNEcm9wWm9uZV9jaGFydEFyZWFcIikgJiYgdGhpcy5zY2FsZXMubGVuZ3RoIDwgMil7XHJcbiAgICAgICAgICAgIHJldHVybiBEcm9wTG9jYXRpb25UeXBlLmFkZE5ld1NjYWxlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gRHJvcExvY2F0aW9uVHlwZS5pbnZhbGlkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGlnaGxpZ2h0IGRyb3BwYWJsZSBhcmVhcyBpZiBhIHZhbGlkIHNpZ25hbCBpcyBkcmFnZ2VkIG92ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGN1cnJlbnRUYXJnZXRcclxuICAgICAqIEBtZW1iZXJvZiBCYXNpY0NoYXJ0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1cGRhdGVEcm9wcGFibGVBcmVhcyhjdXJyZW50VGFyZ2V0KSB7XHJcbiAgICAgICAgaWYoY3VycmVudFRhcmdldC5pZC5pbmNsdWRlcyhcIl9heGlzRHJvcFpvbmVfY2hhcnRBcmVhXCIpIHx8IGN1cnJlbnRUYXJnZXQuaWQuaW5jbHVkZXMoXCJfcmVmQ3Vyc29yX1wiKSl7XHJcbiAgICAgICAgICAgIGxldCBjaGFydEFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmF4aXNEcm9wWm9uZUNoYXJ0QXJlYUlkKTtcclxuICAgICAgICAgICAgaWYoY2hhcnRBcmVhICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgY2hhcnRBcmVhIS5jbGFzc0xpc3QuYWRkKCdkcmFnZ2VkT3ZlcicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLnNjYWxlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXhpc0FyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmF4aXNEcm9wWm9uZUlkICsgdGhpcy5zY2FsZXNbaV0uaWQpO1xyXG4gICAgICAgICAgICAgICAgaWYoYXhpc0FyZWEgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXhpc0FyZWEhLmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWdnZWRPdmVyJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY3VycmVudFRhcmdldC5pZC5pbmNsdWRlcyhcIl9heGlzRHJvcFpvbmVTY2FsZVwiKSl7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zY2FsZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYoY3VycmVudFRhcmdldC5pZC5pbmNsdWRlcyh0aGlzLnNjYWxlc1tpXS5pZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYXhpc0FyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmF4aXNEcm9wWm9uZUlkICsgdGhpcy5zY2FsZXNbaV0uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGF4aXNBcmVhICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBheGlzQXJlYSEuY2xhc3NMaXN0LmFkZCgnZHJhZ2dlZE92ZXInKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYXhpc0FyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmF4aXNEcm9wWm9uZUlkICsgdGhpcy5zY2FsZXNbaV0uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGF4aXNBcmVhICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBheGlzQXJlYSEuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ2dlZE92ZXInKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBjaGFydEFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmF4aXNEcm9wWm9uZUNoYXJ0QXJlYUlkKTtcclxuICAgICAgICAgICAgaWYoY2hhcnRBcmVhICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgY2hhcnRBcmVhIS5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnZ2VkT3ZlcicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc2V0IGhpZ2hsaWdodGVkIGFyZWFzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJhc2ljQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlc2V0SGlnaGxpZ2h0aW5nKCl7XHJcbiAgICAgICAgbGV0IGNoYXJ0QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuYXhpc0Ryb3Bab25lQ2hhcnRBcmVhSWQpO1xyXG4gICAgICAgIGlmKGNoYXJ0QXJlYSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgY2hhcnRBcmVhIS5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnZ2VkT3ZlcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5zY2FsZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgYXhpc0FyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmF4aXNEcm9wWm9uZUlkICsgdGhpcy5zY2FsZXNbaV0uaWQpO1xyXG4gICAgICAgICAgICBpZihheGlzQXJlYSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGF4aXNBcmVhIS5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnZ2VkT3ZlcicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0aWFsaXplQ3Vyc29ySGFuZGxlcnMoKSB7IH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCB7IEJhc2ljQ2hhcnQgfTtcclxuXHJcbiJdfQ==