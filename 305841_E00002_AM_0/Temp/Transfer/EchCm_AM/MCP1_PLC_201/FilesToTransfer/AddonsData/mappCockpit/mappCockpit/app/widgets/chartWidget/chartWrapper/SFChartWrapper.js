var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
define(["require", "exports", "../../../core/interfaces/components/ui/chart/chartInterface", "./SFChartAxis", "../helpers/chartLabelFormater", "../../../models/common/point", "../../chartViewWidget/chartViewWidget", "../userInteraction/userInteractionController", "../ChartBase", "../helpers/chartRangeHelper"], function (require, exports, chartInterface_1, SFChartAxis_1, chartLabelFormater_1, point_1, chartViewWidget_1, userInteractionController_1, ChartBase_1, chartRangeHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var spaceChartRightHandSide = 15;
    var SFChartWrapper = /** @class */ (function () {
        function SFChartWrapper(div, scales, nameScaleX) {
            this.prevPanningCoords = {
                'x': undefined,
                'y': undefined
            };
            this._SFChart = this.initializeSFChart(div, scales, nameScaleX);
            this.addTextMeasurementCanvas();
            this.eventAxisRangeChanged = new chartInterface_1.EventAxisRangeChanged();
            this.eventMouseAction = new chartInterface_1.EventMouseAction();
            this.eventMouseWheel = new chartInterface_1.EventMouseWheel();
            this.addEventListenersToChart();
        }
        /**
         * Initialization of Syncfusion chart
         *
         * @private
         * @memberof ChartBase
         */
        SFChartWrapper.prototype.initializeSFChart = function (div, scales, nameScaleX) {
            var chartSettings = {};
            chartSettings = __assign(__assign(__assign(__assign({ enableCanvasRendering: true }, this.getSFChartSeriesSettings(scales)), this.getSFChartScaleSettings(scales, nameScaleX)), { zooming: { enable: true, enableMouseWheel: false, type: "XY", enableScrollbar: false, toolbarItems: [""] }, crosshair: { visible: false, type: 'crosshair', line: { color: "black" } }, legend: { visible: false, enableScrollbar: false } }), this.getSFChartEventHandlers());
            $(div).ejChart(chartSettings);
            var SFChartInstance = $(div).ejChart("instance"); // as ej.datavisualization.Chart;
            SFChartInstance.maxLabelWidth = 55;
            return SFChartInstance;
        };
        /**
        *
        *
        * @private
        * @returns {{}}
        * @memberof ChartBase
        */
        SFChartWrapper.prototype.getSFChartSeriesSettings = function (scales) {
            var seriesArray = [];
            for (var _i = 0, scales_1 = scales; _i < scales_1.length; _i++) {
                var scale = scales_1[_i];
                for (var _a = 0, _b = scale.childs; _a < _b.length; _a++) {
                    var series = _b[_a];
                    var traceDataSeries = this.createTraceDataSeries(series, scale.id);
                    if (traceDataSeries != undefined) {
                        seriesArray.push(traceDataSeries);
                    }
                }
            }
            return { series: seriesArray };
        };
        /**
      *
      *
      * @private
      * @returns {{}}
      * @memberof ChartBase
      */
        SFChartWrapper.prototype.getSFChartScaleSettings = function (scales, nameScaleX) {
            var data = {
                primaryXAxis: {
                    name: nameScaleX,
                    crosshairLabel: { visible: true, trackballTooltipSettings: { border: { width: 10 } } },
                    labelFormat: 'n3',
                    labelPlacement: 'onticks',
                    scrollbarSettings: {
                        visible: false,
                        canResize: false,
                    },
                    labelIntersectAction: "Hide",
                    range: { min: scales[0].minXValue, max: scales[0].maxXValue }
                },
                primaryYAxis: {
                    name: scales[0].id,
                    crosshairLabel: { visible: true },
                    enableAutoIntervalOnZooming: true,
                    labelFormat: "n3",
                    maximumLabelWidth: 60,
                    labelIntersectAction: "Hide",
                    range: { min: scales[0].minYValue, max: scales[0].maxYValue }
                },
            };
            for (var i = 1; i < scales.length; i++) {
                data.axes = [{
                        name: scales[i].id,
                        opposedPosition: true,
                        majorGridLines: { visible: false },
                        range: { min: scales[i].minYValue, max: scales[i].maxYValue },
                        orientation: "vertical"
                    }];
            }
            return data;
        };
        SFChartWrapper.prototype.setSeries = function (series) {
            this._SFChart.option("series", series);
        };
        /**
         * Create property containing data to be drawn
         *
         * @private
         * @param {BaseSeries} serie
         * @param {string} axisID
         * @returns {{}}
         * @memberof BasicChart
         */
        SFChartWrapper.prototype.createTraceDataSeries = function (serie, axisID) {
            if (serie.rawPointsValid == false) {
                // For invalid point data a trace data serie can't be created(ejChart crash if points with undefined x or y values)
                return undefined;
            }
            var properties = {
                name: serie.id,
                type: 'line',
                dataSource: serie.data,
                xName: "x",
                yName: "y",
                fill: serie.color,
                yAxisName: axisID,
                _yAxisName: axisID,
            };
            return properties;
        };
        /**
        *
        *
        * @private
        * @returns {{}}
        * @memberof ChartBase
        */
        SFChartWrapper.prototype.getSFChartEventHandlers = function () {
            var _this = this;
            return {
                zoomed: function (args) { _this.onChartZoomed(args); },
                axesLabelRendering: function (args) { _this.onAxesLabelRendering(args); },
            };
        };
        /**
        *
        *
        * @private
        * @memberof ChartBase
        */
        SFChartWrapper.prototype.addEventListenersToChart = function () {
            var _this = this;
            this._SFChart._on(this._SFChart.element, "mousewheel", function (args) { return _this.onChartMouseWheel(args); });
            this._SFChart._on(this._SFChart.element, "mousedown", function (args) { return _this.onChartMouseDown(args); });
            this._SFChart._on(this._SFChart.element, "mouseup", function (args) { return _this.onChartMouseUp(args); });
            this._SFChart._on(this._SFChart.element, "mousemove", function (args) { return _this.onChartMouseMove(args); });
        };
        SFChartWrapper.prototype.onChartMouseDown = function (args) {
            var chartObjectUnderMouse = this.getChartObjectUnderMouse(this._SFChart.mousemoveX, this._SFChart.mousemoveY);
            if (chartObjectUnderMouse.args.axis != undefined) {
                this.mouseDownAxis = chartObjectUnderMouse.args.axis.name;
            }
            var mousePoint = new point_1.Point(args.clientX, args.clientY);
            var mousePointChart = new point_1.Point(this._SFChart.mousemoveX, this._SFChart.mousemoveY);
            var mouseDownArgs = new chartInterface_1.EventMouseArgs(userInteractionController_1.MouseActionType.mouseDown, mousePoint, mousePointChart, args.objectUnderMouse);
            this.eventMouseAction.raise(this, mouseDownArgs);
        };
        SFChartWrapper.prototype.onChartMouseUp = function (args) {
            this.mouseDownAxis = undefined;
            var mousePoint = new point_1.Point(args.clientX, args.clientY);
            var mousePointChart = new point_1.Point(this._SFChart.mousemoveX, this._SFChart.mousemoveY);
            var mouseUpArgs = new chartInterface_1.EventMouseArgs(userInteractionController_1.MouseActionType.mouseUp, mousePoint, mousePointChart, args.objectUnderMouse);
            this.eventMouseAction.raise(this, mouseUpArgs);
        };
        SFChartWrapper.prototype.onChartMouseMove = function (args) {
            var mousePoint = new point_1.Point(args.clientX, args.clientY);
            var mousePointChart = new point_1.Point(this._SFChart.mousemoveX, this._SFChart.mousemoveY);
            var mouseMoveArgs = new chartInterface_1.EventMouseArgs(userInteractionController_1.MouseActionType.mouseMove, mousePoint, mousePointChart, args.objectUnderMouse);
            this.eventMouseAction.raise(this, mouseMoveArgs);
        };
        SFChartWrapper.prototype.onChartMouseWheel = function (args) {
            var mouseWheelArgs = new chartInterface_1.EventMouseWheelArgs(new point_1.Point(this._SFChart.mousemoveX, this._SFChart.mousemoveY), args.objectUnderMouse, args.originalEvent.wheelDelta);
            this.eventMouseWheel.raise(this, mouseWheelArgs);
        };
        /**
      * Sets scale ranges after boxZoom accordingy to zooming position and factor; sets zp and zf to 0/1
      *
      * @protected
      * @param {*} args
      * @memberof ChartBase
      */
        SFChartWrapper.prototype.onChartZoomed = function (args) {
            //let yScales = this.getYScales();
            var chartAxes = args.model._axes;
            var xAxisZoomCanceled = false;
            for (var _i = 0, chartAxes_1 = chartAxes; _i < chartAxes_1.length; _i++) {
                var currentChartAxis = chartAxes_1[_i];
                var minVal = currentChartAxis.visibleRange.min;
                var maxVal = currentChartAxis.visibleRange.max;
                //limit the axis range to Precision 11 to prevent syncfusion chart from failing
                if (maxVal.toPrecision(11) - minVal.toPrecision(11) > chartRangeHelper_1.SF_axisResolution) {
                    var axis_1 = this.getAxis(currentChartAxis.name);
                    if (axis_1 != undefined) {
                        axis_1.setAxisRange({ min: minVal, max: maxVal }, false, false);
                    }
                }
                else {
                    if (currentChartAxis.orientation == "horizontal") {
                        xAxisZoomCanceled = true;
                    }
                }
                currentChartAxis.zoomPosition = 0;
                currentChartAxis.zoomFactor = 1;
            }
            var axis = this.getAxis(chartAxes[0].name);
            if (axis != undefined && xAxisZoomCanceled == false) {
                axis.setAxisRange(axis.getAxisRange(), false, true);
            }
            this._SFChart.zoomed = false;
        };
        SFChartWrapper.prototype.redraw = function () {
            this._SFChart.redraw();
        };
        SFChartWrapper.prototype.resize = function (height, width) {
            this._SFChart.option("size", { height: String(height), width: String(width - spaceChartRightHandSide) });
        };
        /**
       * Sets zoomAxes
       *
       * @param {ZoomDirection} zoomAxes
       * @memberof ChartBase
       */
        SFChartWrapper.prototype.setZoomDirection = function (zoomAxes) {
            this._SFChart.model.zooming.type = chartViewWidget_1.ZoomDirection[zoomAxes];
        };
        /**
        * Enables box zooming
        *
        * @param {boolean} enable
        * @memberof ChartBase
        */
        SFChartWrapper.prototype.enableBoxZoom = function (enable) {
            this._SFChart.model.zooming.enable = enable;
        };
        /**
         * Enables panning
         *
         * @param {boolean} enable
         * @memberof ChartBase
         */
        SFChartWrapper.prototype.enablePanning = function (enable) {
            this._SFChart.panning = enable;
        };
        SFChartWrapper.prototype.setPanningAxes = function (axes) {
            this._SFChart.activePanningAxes = axes;
        };
        /**
         * Adds an invisible Canvas which is used to measure label width
         *
         * @private
         * @memberof ChartBase
         */
        SFChartWrapper.prototype.addTextMeasurementCanvas = function () {
            var id = this._SFChart.chartContainer[0].id;
            var t = $("#" + id);
            t.append('<canvas id="' + id + '_' + "textMaesurementCanvas" + '" style="z-index: -5; position:absolute"> </canvas>');
        };
        /**
       *
       *
       * @private
       * @param {*} args
       * @memberof ChartBase
       */
        SFChartWrapper.prototype.onAxesLabelRendering = function (args) {
            if (this._SFChart != undefined) {
                var id = this._SFChart.chartContainer[0].id;
                var textMaesurementCanvas = document.getElementById(id + '_' + "textMaesurementCanvas");
                if (textMaesurementCanvas) {
                    var context = textMaesurementCanvas.getContext("2d");
                    var number = args.data.label["Value"];
                    var interval = args.data.axis.visibleRange.interval;
                    if (args.data.axis.orientation == "horizontal") {
                        // XAxis(time)
                        args.data.label["Text"] = chartLabelFormater_1.ChartLabelFormater.getXAxisLabelText(number, context, interval);
                    }
                    else {
                        // YAxis
                        args.data.label["Text"] = chartLabelFormater_1.ChartLabelFormater.getYAxisLabelText(number, context, interval);
                    }
                }
            }
        };
        SFChartWrapper.prototype.getChartArea = function () {
            return { x: this._SFChart.canvasX, y: this._SFChart.canvasY, width: this._SFChart.canvasWidth, height: this._SFChart.canvasHeight };
        };
        SFChartWrapper.prototype.setChartArea = function (chartArea) {
            this._SFChart.model.margin.left = chartArea.x - 71;
            this._SFChart.model.margin.top = chartArea.y - 10;
            var numbrOfYAxis = this._SFChart.model._axes.length - 2;
            this._SFChart.model.margin.right = this._SFChart.model.width - (chartArea.x + chartArea.width) - 10 - (numbrOfYAxis * 71);
            this._SFChart.model.margin.bottom = this._SFChart.model.height - ((chartArea.y) + chartArea.height) - 31;
        };
        SFChartWrapper.prototype.getAxis = function (axisID) {
            var axis = this.getChartAxisByName(axisID);
            if (axis != undefined) {
                return new SFChartAxis_1.SFChartAxis(axis, this.eventAxisRangeChanged, this);
            }
            else {
                return undefined;
            }
        };
        SFChartWrapper.prototype.getXAxisWidth = function () {
            return this.getChartArea().width;
        };
        /**
        * Get axis with a given name
        *
        * @param {string} axisName
        * @returns {*}
        * @memberof ChartBase
        */
        SFChartWrapper.prototype.getChartAxisByName = function (axisName) {
            var axes = this._SFChart.model._axes;
            for (var i = 0; i < axes.length; i++) {
                if (axes[i].name == axisName) {
                    return axes[i];
                }
            }
        };
        SFChartWrapper.prototype.doPanning = function (pageX, pageY) {
            if (this.prevPanningCoords.x != undefined) {
                var oDelta = void 0;
                oDelta = {
                    'x': this.prevPanningCoords.x - pageX,
                    'y': this.prevPanningCoords.y - pageY
                };
                this.prevPanningCoords = {
                    'x': pageX,
                    'y': pageY
                };
                for (var i = 0; i < this._SFChart.activePanningAxes.length; i++) {
                    var axis = this.getChartAxisByName(this._SFChart.activePanningAxes[i].getAxisID());
                    for (var j = 0; j < this._SFChart.model._axes.length; j++) {
                        if (axis.name == this._SFChart.model._axes[j].name) {
                            axis = this._SFChart.model._axes[j];
                        }
                    }
                    var delta = void 0;
                    if (axis.orientation == "horizontal") {
                        delta = ((Big(axis.visibleRange.max).minus(Big(axis.visibleRange.min))).div(Big(axis.width))).times(Big(oDelta.x));
                        var deltaNmbr = Number(delta.toString());
                        if (axis != undefined) {
                            this.getAxis(axis.name).setAxisRange({ min: axis.visibleRange.min + deltaNmbr, max: axis.visibleRange.max + deltaNmbr });
                        }
                    }
                    else {
                        if (axis != undefined) {
                            delta = ((Big(axis.visibleRange.max).minus(Big(axis.visibleRange.min))).div(Big(axis.height))).times(Big(oDelta.y));
                            var deltaNmbr = Number(delta.toString());
                            deltaNmbr = deltaNmbr * -1;
                            this.getAxis(axis.name).setAxisRange({ min: axis.visibleRange.min + deltaNmbr, max: axis.visibleRange.max + deltaNmbr });
                        }
                    }
                }
            }
            else {
                this.prevPanningCoords = {
                    'x': pageX,
                    'y': pageY
                };
            }
        };
        SFChartWrapper.prototype.addYAxis = function (axisName, axisMin, axisMax, position) {
            var currentAxes = this._SFChart.option("axes");
            var opposedPosition = false;
            if (position == chartInterface_1.AxisPosition.right) {
                opposedPosition = true;
                ;
            }
            currentAxes.push({
                name: axisName,
                opposedPosition: opposedPosition,
                majorGridLines: { visible: false },
                range: { min: axisMin, max: axisMax },
                orientation: "vertical"
            });
            this._SFChart.option("axes", currentAxes);
            if (this._SFChart.model.axes.length == 1) {
                this._SFChart.model.margin.right = 10;
            }
        };
        SFChartWrapper.prototype.removeYAxis = function (axisName) {
            //TODO: Update so it works for more than 2 axis
            var index;
            for (var i = 0; i < this._SFChart.model.axes.length; i++) {
                if (this._SFChart.model.axes[i].name === axisName) {
                    index = i;
                    break;
                }
            }
            if (index > -1) {
                this._SFChart.model.axes.splice(index, 1);
            }
            else if (this._SFChart.model.axes.length > 0) {
                this._SFChart.model.primaryYAxis = this._SFChart.model.axes[0];
                this._SFChart.model.primaryYAxis.majorGridLines.visible = true;
                this._SFChart.model.primaryYAxis.opposedPosition = false;
                this._SFChart.model.primaryYAxis.backGround = 'transparent';
                this._SFChart.model.axes = [];
            }
            if (this._SFChart.model.axes.length == 0) {
                this._SFChart.model.margin.right = 10;
            }
        };
        SFChartWrapper.prototype.setYAxisOffset = function (numberOfAxes) {
            if (numberOfAxes > 0) {
                this._SFChart.model.margin.right = 10 + (71 * numberOfAxes);
            }
            else {
                this._SFChart.model.margin.right = 10;
            }
        };
        SFChartWrapper.prototype.getChartObjectUnderMouse = function (mouseX, mouseY) {
            var chartObjectUnderMouse = new ChartBase_1.ChartObjectInformation(ChartBase_1.ChartObjectType.emptySpace, {});
            var axisBounds = Array();
            for (var i = 0; i < this._SFChart.model._axes.length; i++) {
                axisBounds.push(this.getAxis(this._SFChart.model._axes[i].name).getAxisBounds());
            }
            for (var i = 0; i < axisBounds.length; i++) {
                if ((mouseX - axisBounds[i].x) < (axisBounds[i].width) && mouseX > axisBounds[i].x) {
                    if ((mouseY - axisBounds[i].y) < (axisBounds[i].height) && mouseY > axisBounds[i].y) {
                        chartObjectUnderMouse = new ChartBase_1.ChartObjectInformation(ChartBase_1.ChartObjectType.axis, { axis: axisBounds[i].axis });
                    }
                }
            }
            return chartObjectUnderMouse;
        };
        return SFChartWrapper;
    }());
    exports.SFChartWrapper = SFChartWrapper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZDaGFydFdyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY2hhcnRXaWRnZXQvY2hhcnRXcmFwcGVyL1NGQ2hhcnRXcmFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBZUEsSUFBTSx1QkFBdUIsR0FBVyxFQUFFLENBQUM7SUFHM0M7UUFjSSx3QkFBWSxHQUFtQixFQUFFLE1BQWdCLEVBQUUsVUFBa0I7WUFMOUQsc0JBQWlCLEdBQUc7Z0JBQ3ZCLEdBQUcsRUFBRSxTQUFTO2dCQUNkLEdBQUcsRUFBRSxTQUFTO2FBQ2pCLENBQUE7WUFHRyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ2hFLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1lBRWhDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLHNDQUFxQixFQUFFLENBQUM7WUFDekQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksaUNBQWdCLEVBQUUsQ0FBQztZQUMvQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksZ0NBQWUsRUFBRSxDQUFDO1lBRzdDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBQ3BDLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNLLDBDQUFpQixHQUF6QixVQUEwQixHQUFtQixFQUFFLE1BQWdCLEVBQUUsVUFBa0I7WUFFL0UsSUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFBO1lBQ3RCLGFBQWEseUNBQ1QscUJBQXFCLEVBQUUsSUFBSSxJQUV4QixJQUFJLENBQUMsd0JBQXdCLENBQUMsTUFBTSxDQUFDLEdBQ3JDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLEtBRW5ELE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsZ0JB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QyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksTUFBTSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUM7d0JBQy9FLHFCQUFxQixHQUFHLElBQUksa0NBQXNCLENBQUMsMkJBQWUsQ0FBQyxJQUFJLEVBQUUsRUFBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBQyxDQUFDLENBQUM7cUJBQ3hHO2lCQUNKO2FBQ0o7WUFFRCxPQUFPLHFCQUFxQixDQUFDO1FBQ2pDLENBQUM7UUFFTCxxQkFBQztJQUFELENBQUMsQUFwaEJELElBb2hCQztJQUVPLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2NhbGUgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9zY2FsZVwiO1xyXG5pbXBvcnQgeyBJQ2hhcnQsIEV2ZW50QXhpc1JhbmdlQ2hhbmdlZCwgRXZlbnRNb3VzZUFjdGlvbiwgRXZlbnRNb3VzZUFyZ3MsIEV2ZW50TW91c2VXaGVlbCwgRXZlbnRNb3VzZVdoZWVsQXJncywgQXhpc1Bvc2l0aW9ufSBmcm9tIFwiLi4vLi4vLi4vY29yZS9pbnRlcmZhY2VzL2NvbXBvbmVudHMvdWkvY2hhcnQvY2hhcnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQXhpc0JvdW5kcyB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3R5cGVzL0F4aXNCb3VuZHNcIjtcclxuaW1wb3J0IHsgSUNoYXJ0QXhpcyB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2ludGVyZmFjZXMvY29tcG9uZW50cy91aS9jaGFydC9DaGFydEF4aXNJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU0ZDaGFydEF4aXMgfSBmcm9tIFwiLi9TRkNoYXJ0QXhpc1wiO1xyXG5pbXBvcnQgeyBSZWN0YW5nbGUgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS90eXBlcy9SZWN0YW5nbGVcIjtcclxuaW1wb3J0IHsgQ2hhcnRMYWJlbEZvcm1hdGVyIH0gZnJvbSBcIi4uL2hlbHBlcnMvY2hhcnRMYWJlbEZvcm1hdGVyXCI7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9jb21tb24vcG9pbnRcIjtcclxuaW1wb3J0IHsgWm9vbURpcmVjdGlvbiB9IGZyb20gXCIuLi8uLi9jaGFydFZpZXdXaWRnZXQvY2hhcnRWaWV3V2lkZ2V0XCJcclxuaW1wb3J0IHsgTW91c2VBY3Rpb25UeXBlIH0gZnJvbSBcIi4uL3VzZXJJbnRlcmFjdGlvbi91c2VySW50ZXJhY3Rpb25Db250cm9sbGVyXCI7XHJcbmltcG9ydCB7IENoYXJ0T2JqZWN0SW5mb3JtYXRpb24sIENoYXJ0T2JqZWN0VHlwZSB9IGZyb20gXCIuLi9DaGFydEJhc2VcIjtcclxuaW1wb3J0IHsgU0ZfYXhpc1Jlc29sdXRpb24gfSBmcm9tIFwiLi4vaGVscGVycy9jaGFydFJhbmdlSGVscGVyXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NvbW1vbi9zZXJpZXMvYmFzZVNlcmllc1wiO1xyXG5cclxuXHJcbmNvbnN0IHNwYWNlQ2hhcnRSaWdodEhhbmRTaWRlOiBudW1iZXIgPSAxNTtcclxuXHJcblxyXG5jbGFzcyBTRkNoYXJ0V3JhcHBlciBpbXBsZW1lbnRzIElDaGFydHtcclxuICAgIF9TRkNoYXJ0Ly86IGVqLmRhdGF2aXN1YWxpemF0aW9uLkNoYXJ0O1xyXG4gICAgZXZlbnRBeGlzUmFuZ2VDaGFuZ2VkIDogRXZlbnRBeGlzUmFuZ2VDaGFuZ2VkO1xyXG4gICAgZXZlbnRNb3VzZUFjdGlvbiA6IEV2ZW50TW91c2VBY3Rpb247XHJcbiAgICBldmVudE1vdXNlV2hlZWw6IEV2ZW50TW91c2VXaGVlbDtcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBtb3VzZURvd25BeGlzO1xyXG5cclxuICAgIHB1YmxpYyBwcmV2UGFubmluZ0Nvb3JkcyA9IHtcclxuICAgICAgICAneCc6IHVuZGVmaW5lZCxcclxuICAgICAgICAneSc6IHVuZGVmaW5lZFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGRpdjogSFRNTERpdkVsZW1lbnQsIHNjYWxlcyA6IFNjYWxlW10sIG5hbWVTY2FsZVg6IHN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5fU0ZDaGFydCA9IHRoaXMuaW5pdGlhbGl6ZVNGQ2hhcnQoZGl2LCBzY2FsZXMsIG5hbWVTY2FsZVgpO1xyXG4gICAgICAgIHRoaXMuYWRkVGV4dE1lYXN1cmVtZW50Q2FudmFzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZXZlbnRBeGlzUmFuZ2VDaGFuZ2VkID0gbmV3IEV2ZW50QXhpc1JhbmdlQ2hhbmdlZCgpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRNb3VzZUFjdGlvbiA9IG5ldyBFdmVudE1vdXNlQWN0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5ldmVudE1vdXNlV2hlZWwgPSBuZXcgRXZlbnRNb3VzZVdoZWVsKCk7XHJcblxyXG5cclxuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzVG9DaGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6YXRpb24gb2YgU3luY2Z1c2lvbiBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZVNGQ2hhcnQoZGl2OiBIVE1MRGl2RWxlbWVudCwgc2NhbGVzIDogU2NhbGVbXSwgbmFtZVNjYWxlWDogc3RyaW5nKSA6IGVqLmRhdGF2aXN1YWxpemF0aW9uLkNoYXJ0e1xyXG5cclxuICAgICAgICBsZXQgY2hhcnRTZXR0aW5ncyA9IHt9XHJcbiAgICAgICAgY2hhcnRTZXR0aW5ncyA9IHtcclxuICAgICAgICAgICAgZW5hYmxlQ2FudmFzUmVuZGVyaW5nOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgLi4udGhpcy5nZXRTRkNoYXJ0U2VyaWVzU2V0dGluZ3Moc2NhbGVzKSxcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRTRkNoYXJ0U2NhbGVTZXR0aW5ncyhzY2FsZXMsIG5hbWVTY2FsZVgpLFxyXG5cclxuICAgICAgICAgICAgem9vbWluZzogeyBlbmFibGU6IHRydWUsIGVuYWJsZU1vdXNlV2hlZWw6IGZhbHNlLCB0eXBlOiBcIlhZXCIsIGVuYWJsZVNjcm9sbGJhcjogZmFsc2UsIHRvb2xiYXJJdGVtczogW1wiXCJdIH0sXHJcbiAgICAgICAgICAgIGNyb3NzaGFpcjogeyB2aXNpYmxlOiBmYWxzZSwgdHlwZTogJ2Nyb3NzaGFpcicsIGxpbmU6IHsgY29sb3I6IFwiYmxhY2tcIiB9IH0sXHJcbiAgICAgICAgICAgIGxlZ2VuZDogeyB2aXNpYmxlOiBmYWxzZSwgZW5hYmxlU2Nyb2xsYmFyIDogZmFsc2V9LFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0U0ZDaGFydEV2ZW50SGFuZGxlcnMoKSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkKGRpdikuZWpDaGFydChjaGFydFNldHRpbmdzKTtcclxuICAgICAgICBsZXQgU0ZDaGFydEluc3RhbmNlID0gJChkaXYpLmVqQ2hhcnQoXCJpbnN0YW5jZVwiKS8vIGFzIGVqLmRhdGF2aXN1YWxpemF0aW9uLkNoYXJ0O1xyXG4gICAgICAgIFxyXG4gICAgICAgIFNGQ2hhcnRJbnN0YW5jZS5tYXhMYWJlbFdpZHRoID0gNTU7XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gU0ZDaGFydEluc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRTRkNoYXJ0U2VyaWVzU2V0dGluZ3Moc2NhbGVzIDogU2NhbGVbXSkgOiB7fXtcclxuICAgICAgICBsZXQgc2VyaWVzQXJyYXkgOiB7fVtdPSBbXTtcclxuICAgICAgICBmb3IobGV0IHNjYWxlIG9mIHNjYWxlcyl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgc2VyaWVzIG9mIHNjYWxlLmNoaWxkcyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgdHJhY2VEYXRhU2VyaWVzID0gdGhpcy5jcmVhdGVUcmFjZURhdGFTZXJpZXMoc2VyaWVzLCBzY2FsZS5pZCk7XHJcbiAgICAgICAgICAgICAgICBpZih0cmFjZURhdGFTZXJpZXMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBzZXJpZXNBcnJheS5wdXNoKHRyYWNlRGF0YVNlcmllcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7c2VyaWVzOiBzZXJpZXNBcnJheX07XHJcblxyXG4gICAgfVxyXG5cclxuICAgICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFNGQ2hhcnRTY2FsZVNldHRpbmdzKHNjYWxlcyA6IFNjYWxlW10sIG5hbWVTY2FsZVg6IHN0cmluZykgOiB7fXtcclxuICAgICAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgICAgICAgcHJpbWFyeVhBeGlzOiB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lU2NhbGVYLFxyXG4gICAgICAgICAgICAgICAgY3Jvc3NoYWlyTGFiZWw6IHsgdmlzaWJsZTogdHJ1ZSwgdHJhY2tiYWxsVG9vbHRpcFNldHRpbmdzOiB7IGJvcmRlcjogeyB3aWR0aDogMTAgfSB9IH0sXHJcbiAgICAgICAgICAgICAgICBsYWJlbEZvcm1hdDogJ24zJyxcclxuICAgICAgICAgICAgICAgIGxhYmVsUGxhY2VtZW50OiAnb250aWNrcycsXHJcbiAgICAgICAgICAgICAgICBzY3JvbGxiYXJTZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhblJlc2l6ZTogZmFsc2UsICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBsYWJlbEludGVyc2VjdEFjdGlvbiA6IFwiSGlkZVwiLFxyXG4gICAgICAgICAgICAgICAgcmFuZ2U6IHttaW46IHNjYWxlc1swXS5taW5YVmFsdWUsIG1heDogc2NhbGVzWzBdLm1heFhWYWx1ZX1cclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHByaW1hcnlZQXhpczoge1xyXG4gICAgICAgICAgICAgICAgbmFtZSA6IHNjYWxlc1swXS5pZCxcclxuICAgICAgICAgICAgICAgIGNyb3NzaGFpckxhYmVsOiB7IHZpc2libGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIGVuYWJsZUF1dG9JbnRlcnZhbE9uWm9vbWluZzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGxhYmVsRm9ybWF0OiBcIm4zXCIsXHJcbiAgICAgICAgICAgICAgICBtYXhpbXVtTGFiZWxXaWR0aCA6IDYwLFxyXG4gICAgICAgICAgICAgICAgbGFiZWxJbnRlcnNlY3RBY3Rpb24gOiBcIkhpZGVcIixcclxuICAgICAgICAgICAgICAgIHJhbmdlOiB7bWluOiBzY2FsZXNbMF0ubWluWVZhbHVlLCBtYXg6IHNjYWxlc1swXS5tYXhZVmFsdWV9XHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMTsgaSA8IHNjYWxlcy5sZW5ndGg7IGkrKyApe1xyXG4gICAgICAgICAgICAoZGF0YSBhcyBhbnkpLmF4ZXMgPSBbe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogc2NhbGVzW2ldLmlkLFxyXG4gICAgICAgICAgICAgICAgb3Bwb3NlZFBvc2l0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgbWFqb3JHcmlkTGluZXM6IHsgdmlzaWJsZTogZmFsc2UgfSxcclxuICAgICAgICAgICAgICAgIHJhbmdlOiB7bWluOiBzY2FsZXNbaV0ubWluWVZhbHVlLCBtYXg6IHNjYWxlc1tpXS5tYXhZVmFsdWV9LFxyXG4gICAgICAgICAgICAgICAgb3JpZW50YXRpb246IFwidmVydGljYWxcIlxyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBzZXRTZXJpZXMoc2VyaWVzKXtcclxuICAgICAgICB0aGlzLl9TRkNoYXJ0Lm9wdGlvbihcInNlcmllc1wiLCBzZXJpZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIHByb3BlcnR5IGNvbnRhaW5pbmcgZGF0YSB0byBiZSBkcmF3blxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYXhpc0lEXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzaWNDaGFydFxyXG4gICAgICovXHJcbiAgICAgICAgcHVibGljICBjcmVhdGVUcmFjZURhdGFTZXJpZXMoc2VyaWU6IEJhc2VTZXJpZXMsIGF4aXNJRDogc3RyaW5nKToge318dW5kZWZpbmVkIHtcclxuICAgICAgICAgICAgaWYoc2VyaWUucmF3UG9pbnRzVmFsaWQgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgLy8gRm9yIGludmFsaWQgcG9pbnQgZGF0YSBhIHRyYWNlIGRhdGEgc2VyaWUgY2FuJ3QgYmUgY3JlYXRlZChlakNoYXJ0IGNyYXNoIGlmIHBvaW50cyB3aXRoIHVuZGVmaW5lZCB4IG9yIHkgdmFsdWVzKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgcHJvcGVydGllcyA9IHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IHNlcmllLmlkLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2xpbmUnLFxyXG4gICAgICAgICAgICAgICAgZGF0YVNvdXJjZTogc2VyaWUuZGF0YSxcclxuICAgICAgICAgICAgICAgIHhOYW1lOiBcInhcIixcclxuICAgICAgICAgICAgICAgIHlOYW1lOiBcInlcIixcclxuICAgICAgICAgICAgICAgIGZpbGw6IHNlcmllLmNvbG9yLFxyXG4gICAgICAgICAgICAgICAgeUF4aXNOYW1lOiBheGlzSUQsXHJcbiAgICAgICAgICAgICAgICBfeUF4aXNOYW1lOiBheGlzSUQsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICBcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BlcnRpZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGUgXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0U0ZDaGFydEV2ZW50SGFuZGxlcnMoKSA6IHt9e1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHpvb21lZDogKGFyZ3MpID0+IHt0aGlzLm9uQ2hhcnRab29tZWQoYXJncyl9LFxyXG4gICAgICAgICAgICBheGVzTGFiZWxSZW5kZXJpbmc6IChhcmdzKSA9PiB7dGhpcy5vbkF4ZXNMYWJlbFJlbmRlcmluZyhhcmdzKX0sXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRFdmVudExpc3RlbmVyc1RvQ2hhcnQoKXtcclxuICAgICAgICB0aGlzLl9TRkNoYXJ0Ll9vbih0aGlzLl9TRkNoYXJ0LmVsZW1lbnQsIFwibW91c2V3aGVlbFwiLCAoYXJncykgPT4gdGhpcy5vbkNoYXJ0TW91c2VXaGVlbChhcmdzKSk7XHJcbiAgICAgICAgdGhpcy5fU0ZDaGFydC5fb24odGhpcy5fU0ZDaGFydC5lbGVtZW50LCBcIm1vdXNlZG93blwiLCAoYXJncykgPT4gdGhpcy5vbkNoYXJ0TW91c2VEb3duKGFyZ3MpKTtcclxuICAgICAgICB0aGlzLl9TRkNoYXJ0Ll9vbih0aGlzLl9TRkNoYXJ0LmVsZW1lbnQsIFwibW91c2V1cFwiLCAoYXJncykgPT4gdGhpcy5vbkNoYXJ0TW91c2VVcChhcmdzKSk7XHJcbiAgICAgICAgdGhpcy5fU0ZDaGFydC5fb24odGhpcy5fU0ZDaGFydC5lbGVtZW50LCBcIm1vdXNlbW92ZVwiLCAoYXJncykgPT4gdGhpcy5vbkNoYXJ0TW91c2VNb3ZlKGFyZ3MpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2hhcnRNb3VzZURvd24oYXJncyl7XHJcbiAgICAgICAgbGV0IGNoYXJ0T2JqZWN0VW5kZXJNb3VzZSA9IHRoaXMuZ2V0Q2hhcnRPYmplY3RVbmRlck1vdXNlKHRoaXMuX1NGQ2hhcnQubW91c2Vtb3ZlWCwgdGhpcy5fU0ZDaGFydC5tb3VzZW1vdmVZKTtcclxuICAgICAgICBpZihjaGFydE9iamVjdFVuZGVyTW91c2UuYXJncy5heGlzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMubW91c2VEb3duQXhpcyA9IGNoYXJ0T2JqZWN0VW5kZXJNb3VzZS5hcmdzLmF4aXMubmFtZTsgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbW91c2VQb2ludCA9IG5ldyBQb2ludChhcmdzLmNsaWVudFgsIGFyZ3MuY2xpZW50WSlcclxuICAgICAgICBsZXQgbW91c2VQb2ludENoYXJ0ID0gbmV3IFBvaW50KHRoaXMuX1NGQ2hhcnQubW91c2Vtb3ZlWCwgdGhpcy5fU0ZDaGFydC5tb3VzZW1vdmVZKTtcclxuICAgICAgICBsZXQgbW91c2VEb3duQXJncyA6IEV2ZW50TW91c2VBcmdzID0gbmV3IEV2ZW50TW91c2VBcmdzKE1vdXNlQWN0aW9uVHlwZS5tb3VzZURvd24sIG1vdXNlUG9pbnQsIG1vdXNlUG9pbnRDaGFydCwgYXJncy5vYmplY3RVbmRlck1vdXNlKVxyXG4gICAgICAgIHRoaXMuZXZlbnRNb3VzZUFjdGlvbi5yYWlzZSh0aGlzLCBtb3VzZURvd25BcmdzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2hhcnRNb3VzZVVwKGFyZ3Mpe1xyXG4gICAgICAgIHRoaXMubW91c2VEb3duQXhpcyA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgbGV0IG1vdXNlUG9pbnQgPSBuZXcgUG9pbnQoYXJncy5jbGllbnRYLCBhcmdzLmNsaWVudFkpXHJcbiAgICAgICAgbGV0IG1vdXNlUG9pbnRDaGFydCA9IG5ldyBQb2ludCh0aGlzLl9TRkNoYXJ0Lm1vdXNlbW92ZVgsIHRoaXMuX1NGQ2hhcnQubW91c2Vtb3ZlWSk7XHJcbiAgICAgICAgbGV0IG1vdXNlVXBBcmdzIDogRXZlbnRNb3VzZUFyZ3MgPSBuZXcgRXZlbnRNb3VzZUFyZ3MoTW91c2VBY3Rpb25UeXBlLm1vdXNlVXAsIG1vdXNlUG9pbnQsIG1vdXNlUG9pbnRDaGFydCwgYXJncy5vYmplY3RVbmRlck1vdXNlKVxyXG4gICAgICAgIHRoaXMuZXZlbnRNb3VzZUFjdGlvbi5yYWlzZSh0aGlzLCBtb3VzZVVwQXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNoYXJ0TW91c2VNb3ZlKGFyZ3Mpe1xyXG4gICAgIFxyXG4gICAgICAgIGxldCBtb3VzZVBvaW50ID0gbmV3IFBvaW50KGFyZ3MuY2xpZW50WCwgYXJncy5jbGllbnRZKVxyXG4gICAgICAgIGxldCBtb3VzZVBvaW50Q2hhcnQgPSBuZXcgUG9pbnQodGhpcy5fU0ZDaGFydC5tb3VzZW1vdmVYLCB0aGlzLl9TRkNoYXJ0Lm1vdXNlbW92ZVkpO1xyXG4gICAgICAgIGxldCBtb3VzZU1vdmVBcmdzIDogRXZlbnRNb3VzZUFyZ3MgPSBuZXcgRXZlbnRNb3VzZUFyZ3MoTW91c2VBY3Rpb25UeXBlLm1vdXNlTW92ZSwgbW91c2VQb2ludCwgbW91c2VQb2ludENoYXJ0LCBhcmdzLm9iamVjdFVuZGVyTW91c2UpXHJcbiAgICAgICAgdGhpcy5ldmVudE1vdXNlQWN0aW9uLnJhaXNlKHRoaXMsIG1vdXNlTW92ZUFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DaGFydE1vdXNlV2hlZWwoYXJncyl7XHJcbiAgICAgICAgbGV0IG1vdXNlV2hlZWxBcmdzIDogRXZlbnRNb3VzZVdoZWVsQXJncyA9IG5ldyBFdmVudE1vdXNlV2hlZWxBcmdzKG5ldyBQb2ludCh0aGlzLl9TRkNoYXJ0Lm1vdXNlbW92ZVgsIHRoaXMuX1NGQ2hhcnQubW91c2Vtb3ZlWSksIGFyZ3Mub2JqZWN0VW5kZXJNb3VzZSwgYXJncy5vcmlnaW5hbEV2ZW50LndoZWVsRGVsdGEpXHJcbiAgICAgICAgdGhpcy5ldmVudE1vdXNlV2hlZWwucmFpc2UodGhpcywgbW91c2VXaGVlbEFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgICAgIC8qKlxyXG4gICAgICogU2V0cyBzY2FsZSByYW5nZXMgYWZ0ZXIgYm94Wm9vbSBhY2NvcmRpbmd5IHRvIHpvb21pbmcgcG9zaXRpb24gYW5kIGZhY3Rvcjsgc2V0cyB6cCBhbmQgemYgdG8gMC8xXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvbkNoYXJ0Wm9vbWVkKGFyZ3MpIHtcclxuICAgICAgICAvL2xldCB5U2NhbGVzID0gdGhpcy5nZXRZU2NhbGVzKCk7XHJcbiAgICAgICAgbGV0IGNoYXJ0QXhlcyA6IGFueVtdID0gYXJncy5tb2RlbC5fYXhlcztcclxuICAgICAgICBsZXQgeEF4aXNab29tQ2FuY2VsZWQgPSBmYWxzZTtcclxuICAgICAgXHJcbiAgICAgICAgZm9yKGxldCBjdXJyZW50Q2hhcnRBeGlzIG9mIGNoYXJ0QXhlcyl7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgbWluVmFsID0gIGN1cnJlbnRDaGFydEF4aXMudmlzaWJsZVJhbmdlLm1pbjtcclxuICAgICAgICAgICAgbGV0IG1heFZhbCA9ICBjdXJyZW50Q2hhcnRBeGlzLnZpc2libGVSYW5nZS5tYXg7XHJcblxyXG4gICAgICAgICAgICAvL2xpbWl0IHRoZSBheGlzIHJhbmdlIHRvIFByZWNpc2lvbiAxMSB0byBwcmV2ZW50IHN5bmNmdXNpb24gY2hhcnQgZnJvbSBmYWlsaW5nXHJcbiAgICAgICAgICAgIGlmKG1heFZhbC50b1ByZWNpc2lvbigxMSkgLSBtaW5WYWwudG9QcmVjaXNpb24oMTEpID4gU0ZfYXhpc1Jlc29sdXRpb24pe1xyXG4gICAgICAgICAgICAgICAgbGV0IGF4aXMgPSB0aGlzLmdldEF4aXMoY3VycmVudENoYXJ0QXhpcy5uYW1lKTtcclxuICAgICAgICAgICAgICAgIGlmKGF4aXMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXhpcy5zZXRBeGlzUmFuZ2Uoe21pbjogbWluVmFsLCBtYXg6IG1heFZhbH0sZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgaWYoY3VycmVudENoYXJ0QXhpcy5vcmllbnRhdGlvbiA9PSBcImhvcml6b250YWxcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgeEF4aXNab29tQ2FuY2VsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjdXJyZW50Q2hhcnRBeGlzLnpvb21Qb3NpdGlvbiA9IDA7XHJcbiAgICAgICAgICAgIGN1cnJlbnRDaGFydEF4aXMuem9vbUZhY3RvciA9IDE7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGF4aXMgPSB0aGlzLmdldEF4aXMoY2hhcnRBeGVzWzBdLm5hbWUpO1xyXG4gICAgICAgIGlmKGF4aXMgIT0gdW5kZWZpbmVkICYmIHhBeGlzWm9vbUNhbmNlbGVkID09IGZhbHNlKXtcclxuICAgICAgICAgICAgYXhpcy5zZXRBeGlzUmFuZ2UoYXhpcy5nZXRBeGlzUmFuZ2UoKSwgZmFsc2UsIHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICB0aGlzLl9TRkNoYXJ0Lnpvb21lZCA9IGZhbHNlO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZWRyYXcoKXtcclxuICAgICAgICB0aGlzLl9TRkNoYXJ0LnJlZHJhdygpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZXNpemUoaGVpZ2h0OiBudW1iZXIsIHdpZHRoOiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuX1NGQ2hhcnQub3B0aW9uKFwic2l6ZVwiLCB7aGVpZ2h0OiBTdHJpbmcoaGVpZ2h0KSwgd2lkdGg6IFN0cmluZyh3aWR0aCAtIHNwYWNlQ2hhcnRSaWdodEhhbmRTaWRlKX0pO1xyXG4gICAgfVxyXG5cclxuICAgICAgLyoqXHJcbiAgICAgKiBTZXRzIHpvb21BeGVzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtab29tRGlyZWN0aW9ufSB6b29tQXhlc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0Wm9vbURpcmVjdGlvbih6b29tQXhlczogWm9vbURpcmVjdGlvbikge1xyXG4gICAgICAgIHRoaXMuX1NGQ2hhcnQubW9kZWwuem9vbWluZy50eXBlID0gIFpvb21EaXJlY3Rpb25bem9vbUF4ZXNdO1xyXG4gICAgfVxyXG5cclxuICAgICAvKipcclxuICAgICAqIEVuYWJsZXMgYm94IHpvb21pbmdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGVuYWJsZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZW5hYmxlQm94Wm9vbShlbmFibGU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9TRkNoYXJ0Lm1vZGVsLnpvb21pbmcuZW5hYmxlID0gZW5hYmxlO1xyXG4gICAgfVxyXG4gXHJcbiAgICAgLyoqXHJcbiAgICAgICogRW5hYmxlcyBwYW5uaW5nXHJcbiAgICAgICpcclxuICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGVuYWJsZVxyXG4gICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAgKi9cclxuICAgICBwdWJsaWMgZW5hYmxlUGFubmluZyhlbmFibGU6IGJvb2xlYW4pIHtcclxuICAgICAgICAgdGhpcy5fU0ZDaGFydC5wYW5uaW5nID0gZW5hYmxlO1xyXG4gICAgIH1cclxuXHJcblxyXG4gICAgIHB1YmxpYyBzZXRQYW5uaW5nQXhlcyhheGVzIDogSUNoYXJ0QXhpc1tdKXtcclxuICAgICAgICB0aGlzLl9TRkNoYXJ0LmFjdGl2ZVBhbm5pbmdBeGVzID0gYXhlczsgXHJcbiAgICAgfVxyXG4gXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGFuIGludmlzaWJsZSBDYW52YXMgd2hpY2ggaXMgdXNlZCB0byBtZWFzdXJlIGxhYmVsIHdpZHRoXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRUZXh0TWVhc3VyZW1lbnRDYW52YXMoKXtcclxuICAgICAgICBsZXQgaWQgPSB0aGlzLl9TRkNoYXJ0LmNoYXJ0Q29udGFpbmVyWzBdLmlkO1xyXG4gICAgICAgIGxldCB0ID0gJChcIiNcIitpZCk7IFxyXG4gICAgICAgIHQuYXBwZW5kKCc8Y2FudmFzIGlkPVwiJytpZCsnXycrXCJ0ZXh0TWFlc3VyZW1lbnRDYW52YXNcIisnXCIgc3R5bGU9XCJ6LWluZGV4OiAtNTsgcG9zaXRpb246YWJzb2x1dGVcIj4gPC9jYW52YXM+Jyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkF4ZXNMYWJlbFJlbmRlcmluZyhhcmdzKXtcclxuICAgICAgICBpZih0aGlzLl9TRkNoYXJ0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IHRoaXMuX1NGQ2hhcnQuY2hhcnRDb250YWluZXJbMF0uaWQ7XHJcbiAgICAgICAgICAgIGxldCB0ZXh0TWFlc3VyZW1lbnRDYW52YXMgPSA8SFRNTENhbnZhc0VsZW1lbnQ+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKydfJytcInRleHRNYWVzdXJlbWVudENhbnZhc1wiKTtcclxuICAgICAgICAgICAgaWYodGV4dE1hZXN1cmVtZW50Q2FudmFzKXtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IGNvbnRleHQgPSB0ZXh0TWFlc3VyZW1lbnRDYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG51bWJlciA9IGFyZ3MuZGF0YS5sYWJlbFtcIlZhbHVlXCJdO1xyXG4gICAgICAgICAgICAgICAgbGV0IGludGVydmFsID1hcmdzLmRhdGEuYXhpcy52aXNpYmxlUmFuZ2UuaW50ZXJ2YWw7XHJcbiAgICAgICAgICAgICAgICBpZihhcmdzLmRhdGEuYXhpcy5vcmllbnRhdGlvbiA9PSBcImhvcml6b250YWxcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gWEF4aXModGltZSlcclxuICAgICAgICAgICAgICAgICAgICBhcmdzLmRhdGEubGFiZWxbXCJUZXh0XCJdID0gQ2hhcnRMYWJlbEZvcm1hdGVyLmdldFhBeGlzTGFiZWxUZXh0KG51bWJlciwgY29udGV4dCwgaW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBZQXhpc1xyXG4gICAgICAgICAgICAgICAgICAgIGFyZ3MuZGF0YS5sYWJlbFtcIlRleHRcIl0gPSBDaGFydExhYmVsRm9ybWF0ZXIuZ2V0WUF4aXNMYWJlbFRleHQobnVtYmVyLCBjb250ZXh0LCBpbnRlcnZhbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2hhcnRBcmVhKCkgOiBSZWN0YW5nbGV7XHJcbiAgICAgICAgcmV0dXJuICB7eDogdGhpcy5fU0ZDaGFydC5jYW52YXNYLCB5OiB0aGlzLl9TRkNoYXJ0LmNhbnZhc1ksIHdpZHRoOiB0aGlzLl9TRkNoYXJ0LmNhbnZhc1dpZHRoLCBoZWlnaHQ6IHRoaXMuX1NGQ2hhcnQuY2FudmFzSGVpZ2h0fTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRDaGFydEFyZWEoY2hhcnRBcmVhOiBSZWN0YW5nbGUpe1xyXG4gICAgICAgIHRoaXMuX1NGQ2hhcnQubW9kZWwubWFyZ2luLmxlZnQgPSBjaGFydEFyZWEueCAtIDcxO1xyXG4gICAgICAgIHRoaXMuX1NGQ2hhcnQubW9kZWwubWFyZ2luLnRvcCA9IGNoYXJ0QXJlYS55IC0gMTA7XHJcblxyXG4gICAgICAgIGxldCBudW1ick9mWUF4aXMgPSB0aGlzLl9TRkNoYXJ0Lm1vZGVsLl9heGVzLmxlbmd0aCAtIDJcclxuXHJcbiAgICAgICAgdGhpcy5fU0ZDaGFydC5tb2RlbC5tYXJnaW4ucmlnaHQgPSB0aGlzLl9TRkNoYXJ0Lm1vZGVsLndpZHRoIC0gKGNoYXJ0QXJlYS54ICsgY2hhcnRBcmVhLndpZHRoKSAtIDEwIC0gKG51bWJyT2ZZQXhpcyAqIDcxKSA7XHJcbiAgICAgICAgdGhpcy5fU0ZDaGFydC5tb2RlbC5tYXJnaW4uYm90dG9tID0gdGhpcy5fU0ZDaGFydC5tb2RlbC5oZWlnaHQgLSAoKGNoYXJ0QXJlYS55KSArIGNoYXJ0QXJlYS5oZWlnaHQpIC0gMzE7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldEF4aXMoYXhpc0lEKSA6IFNGQ2hhcnRBeGlzfHVuZGVmaW5lZHtcclxuICAgICAgICBsZXQgYXhpcyA9IHRoaXMuZ2V0Q2hhcnRBeGlzQnlOYW1lKGF4aXNJRClcclxuICAgICAgICBpZihheGlzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgU0ZDaGFydEF4aXMoYXhpcywgdGhpcy5ldmVudEF4aXNSYW5nZUNoYW5nZWQsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRYQXhpc1dpZHRoKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2hhcnRBcmVhKCkud2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgIC8qKlxyXG4gICAgICogR2V0IGF4aXMgd2l0aCBhIGdpdmVuIG5hbWVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYXhpc05hbWVcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldENoYXJ0QXhpc0J5TmFtZShheGlzTmFtZSA6IHN0cmluZykgOiBhbnl7XHJcbiAgICAgICAgbGV0IGF4ZXMgPSB0aGlzLl9TRkNoYXJ0Lm1vZGVsLl9heGVzO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBheGVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYoYXhlc1tpXS5uYW1lID09IGF4aXNOYW1lKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBheGVzW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGRvUGFubmluZyhwYWdlWCwgcGFnZVkpe1xyXG4gICAgIFxyXG5cclxuICAgICAgICBpZih0aGlzLnByZXZQYW5uaW5nQ29vcmRzLnggIT0gdW5kZWZpbmVkKXsgXHJcbiAgICAgICAgICAgIGxldCBvRGVsdGE7XHJcbiAgICAgICAgICAgIG9EZWx0YSA9IHtcclxuICAgICAgICAgICAgICAgICd4JzogIHRoaXMucHJldlBhbm5pbmdDb29yZHMueCEgLSBwYWdlWCxcclxuICAgICAgICAgICAgICAgICd5JzogIHRoaXMucHJldlBhbm5pbmdDb29yZHMueSEgLSBwYWdlWVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5wcmV2UGFubmluZ0Nvb3JkcyA9IHtcclxuICAgICAgICAgICAgICAgICd4JzogcGFnZVgsXHJcbiAgICAgICAgICAgICAgICAneSc6IHBhZ2VZXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLl9TRkNoYXJ0LmFjdGl2ZVBhbm5pbmdBeGVzLmxlbmd0aCA7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBheGlzID0gdGhpcy5nZXRDaGFydEF4aXNCeU5hbWUodGhpcy5fU0ZDaGFydC5hY3RpdmVQYW5uaW5nQXhlc1tpXS5nZXRBeGlzSUQoKSk7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgdGhpcy5fU0ZDaGFydC5tb2RlbC5fYXhlcy5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYXhpcy5uYW1lID09IHRoaXMuX1NGQ2hhcnQubW9kZWwuX2F4ZXNbal0ubmFtZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF4aXMgPSB0aGlzLl9TRkNoYXJ0Lm1vZGVsLl9heGVzW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IGRlbHRhO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGF4aXMub3JpZW50YXRpb24gPT0gXCJob3Jpem9udGFsXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbHRhID0gKChCaWcoYXhpcy52aXNpYmxlUmFuZ2UubWF4KS5taW51cyhCaWcoYXhpcy52aXNpYmxlUmFuZ2UubWluKSkpLmRpdihCaWcoYXhpcy53aWR0aCkpKS50aW1lcyhCaWcob0RlbHRhLngpKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGVsdGFObWJyID0gTnVtYmVyKGRlbHRhLnRvU3RyaW5nKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYXhpcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEF4aXMoYXhpcy5uYW1lKSEuc2V0QXhpc1JhbmdlKHttaW46IGF4aXMudmlzaWJsZVJhbmdlLm1pbiArIGRlbHRhTm1iciwgbWF4OiBheGlzLnZpc2libGVSYW5nZS5tYXggKyBkZWx0YU5tYnJ9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihheGlzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbHRhID0gKChCaWcoYXhpcy52aXNpYmxlUmFuZ2UubWF4KS5taW51cyhCaWcoYXhpcy52aXNpYmxlUmFuZ2UubWluKSkpLmRpdihCaWcoYXhpcy5oZWlnaHQpKSkudGltZXMoQmlnKG9EZWx0YS55KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGVsdGFObWJyID0gTnVtYmVyKGRlbHRhLnRvU3RyaW5nKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbHRhTm1iciA9IGRlbHRhTm1iciAqIC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEF4aXMoYXhpcy5uYW1lKSEuc2V0QXhpc1JhbmdlKHttaW46IGF4aXMudmlzaWJsZVJhbmdlLm1pbiArIGRlbHRhTm1iciwgbWF4OiBheGlzLnZpc2libGVSYW5nZS5tYXggKyBkZWx0YU5tYnJ9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLnByZXZQYW5uaW5nQ29vcmRzID0ge1xyXG4gICAgICAgICAgICAgICAgJ3gnOiBwYWdlWCxcclxuICAgICAgICAgICAgICAgICd5JzogcGFnZVlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGFkZFlBeGlzKGF4aXNOYW1lOiBzdHJpbmcsIGF4aXNNaW46IG51bWJlciwgYXhpc01heDpudW1iZXIsIHBvc2l0aW9uIDogQXhpc1Bvc2l0aW9uKXtcclxuICAgICAgICBsZXQgY3VycmVudEF4ZXMgPSAgdGhpcy5fU0ZDaGFydC5vcHRpb24oXCJheGVzXCIpO1xyXG4gICAgICAgIGxldCBvcHBvc2VkUG9zaXRpb24gPSBmYWxzZTtcclxuICAgICAgICBpZihwb3NpdGlvbiA9PSBBeGlzUG9zaXRpb24ucmlnaHQpe1xyXG4gICAgICAgICAgICBvcHBvc2VkUG9zaXRpb24gPSB0cnVlOztcclxuICAgICAgICB9XHJcblxyXG4gICAgICBcclxuICAgICAgICBjdXJyZW50QXhlcy5wdXNoKHtcclxuICAgICAgICAgICAgbmFtZTogYXhpc05hbWUsXHJcbiAgICAgICAgICAgIG9wcG9zZWRQb3NpdGlvbjogb3Bwb3NlZFBvc2l0aW9uLFxyXG4gICAgICAgICAgICBtYWpvckdyaWRMaW5lczogeyB2aXNpYmxlOiBmYWxzZSB9LFxyXG4gICAgICAgICAgICByYW5nZToge21pbjogYXhpc01pbiwgbWF4OiBheGlzTWF4fSxcclxuICAgICAgICAgICAgb3JpZW50YXRpb246IFwidmVydGljYWxcIlxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX1NGQ2hhcnQub3B0aW9uKFwiYXhlc1wiLCBjdXJyZW50QXhlcyk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuX1NGQ2hhcnQubW9kZWwuYXhlcy5sZW5ndGggPT0gMSl7XHJcbiAgICAgICAgICAgIHRoaXMuX1NGQ2hhcnQubW9kZWwubWFyZ2luLnJpZ2h0ID0gMTA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlWUF4aXMoYXhpc05hbWUgOiBzdHJpbmcpe1xyXG4gICAgICAgIC8vVE9ETzogVXBkYXRlIHNvIGl0IHdvcmtzIGZvciBtb3JlIHRoYW4gMiBheGlzXHJcbiAgICAgICAgbGV0IGluZGV4O1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAobGV0IGk9MDsgaSA8IHRoaXMuX1NGQ2hhcnQubW9kZWwuYXhlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX1NGQ2hhcnQubW9kZWwuYXhlc1tpXS5uYW1lID09PSBheGlzTmFtZSl7XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaW5kZXggPiAtMSl7XHJcbiAgICAgICAgICAgIHRoaXMuX1NGQ2hhcnQubW9kZWwuYXhlcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5fU0ZDaGFydC5tb2RlbC5heGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fU0ZDaGFydC5tb2RlbC5wcmltYXJ5WUF4aXMgPSB0aGlzLl9TRkNoYXJ0Lm1vZGVsLmF4ZXNbMF07XHJcbiAgICAgICAgICAgIHRoaXMuX1NGQ2hhcnQubW9kZWwucHJpbWFyeVlBeGlzLm1ham9yR3JpZExpbmVzLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9TRkNoYXJ0Lm1vZGVsLnByaW1hcnlZQXhpcy5vcHBvc2VkUG9zaXRpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fU0ZDaGFydC5tb2RlbC5wcmltYXJ5WUF4aXMuYmFja0dyb3VuZCA9ICd0cmFuc3BhcmVudCc7XHJcbiAgICAgICAgICAgIHRoaXMuX1NGQ2hhcnQubW9kZWwuYXhlcyA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5fU0ZDaGFydC5tb2RlbC5heGVzLmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgICAgdGhpcy5fU0ZDaGFydC5tb2RlbC5tYXJnaW4ucmlnaHQgPSAxMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHNldFlBeGlzT2Zmc2V0KG51bWJlck9mQXhlczogbnVtYmVyKXtcclxuICAgICAgICBpZihudW1iZXJPZkF4ZXMgPiAwKXtcclxuICAgICAgICAgICAgdGhpcy5fU0ZDaGFydC5tb2RlbC5tYXJnaW4ucmlnaHQgPSAxMCArICg3MSAqIG51bWJlck9mQXhlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX1NGQ2hhcnQubW9kZWwubWFyZ2luLnJpZ2h0ID0gMTA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q2hhcnRPYmplY3RVbmRlck1vdXNlKG1vdXNlWDogbnVtYmVyLCBtb3VzZVk6IG51bWJlcikgOiBDaGFydE9iamVjdEluZm9ybWF0aW9ue1xyXG4gICAgICAgIGxldCBjaGFydE9iamVjdFVuZGVyTW91c2UgPSBuZXcgQ2hhcnRPYmplY3RJbmZvcm1hdGlvbihDaGFydE9iamVjdFR5cGUuZW1wdHlTcGFjZSwge30pO1xyXG4gICAgXHJcbiAgICAgICAgbGV0IGF4aXNCb3VuZHMgPSBBcnJheTxBeGlzQm91bmRzPigpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLl9TRkNoYXJ0Lm1vZGVsLl9heGVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgYXhpc0JvdW5kcy5wdXNoKHRoaXMuZ2V0QXhpcyh0aGlzLl9TRkNoYXJ0Lm1vZGVsLl9heGVzW2ldLm5hbWUpIS5nZXRBeGlzQm91bmRzKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBheGlzQm91bmRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYoKG1vdXNlWCAtIGF4aXNCb3VuZHNbaV0ueCkgPCAoYXhpc0JvdW5kc1tpXS53aWR0aCkgJiYgbW91c2VYID4gYXhpc0JvdW5kc1tpXS54KXtcclxuICAgICAgICAgICAgICAgIGlmKChtb3VzZVkgLSBheGlzQm91bmRzW2ldLnkpIDwgKGF4aXNCb3VuZHNbaV0uaGVpZ2h0KSAmJiBtb3VzZVkgPiBheGlzQm91bmRzW2ldLnkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYXJ0T2JqZWN0VW5kZXJNb3VzZSA9IG5ldyBDaGFydE9iamVjdEluZm9ybWF0aW9uKENoYXJ0T2JqZWN0VHlwZS5heGlzLCB7YXhpczogYXhpc0JvdW5kc1tpXS5heGlzfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjaGFydE9iamVjdFVuZGVyTW91c2U7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQge1NGQ2hhcnRXcmFwcGVyfSJdfQ==