define(["require", "exports", "../chartWidget/YTChart", "../chartWidget/XYChart", "../chartWidget/FFTChart", "./chartViewWidget", "../common/viewTypeProvider", "../chartWidget/helpers/chartRangeHelper", "../../models/chartManagerDataModel/chartManagerDataModel", "../../models/chartManagerDataModel/chartManagerChart", "../../models/common/series/eventSerieDataChangedArgs", "./helpers/chartDropHelper", "../common/states/chartViewToolbarStates", "../../core/interfaces/components/ui/chart/chartInterface", "../common/SerieChartTypeHelper", "../../models/common/series/seriesType", "../chartWidget/cursor/CrossHairCursor", "../chartWidget/cursor/LineCursor", "../common/paneProperties"], function (require, exports, YTChart_1, XYChart_1, FFTChart_1, chartViewWidget_1, viewTypeProvider_1, chartRangeHelper_1, chartManagerDataModel_1, chartManagerChart_1, eventSerieDataChangedArgs_1, chartDropHelper_1, chartViewToolbarStates_1, chartInterface_1, SerieChartTypeHelper_1, seriesType_1, CrossHairCursor_1, LineCursor_1, paneProperties_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartViewChartManager = /** @class */ (function () {
        function ChartViewChartManager(chartViewWidget, userInteractionController, layoutManager, chartManagerDataModel) {
            var _this = this;
            this.traceChartList = [];
            this.series = new Array();
            this._onSerieDataChanged = function (sender, eventArgs) { return _this.onSerieDataChanged(sender, eventArgs); };
            this._userChartInteractionHandler = function (sender, args) { return _this.onUserChartInteraction(sender, args); };
            this._onRedrawAllCharts = function (sender, args) { return _this.onRedrawAllCharts(sender, args); };
            this._onChartSeriesAdded = function (sender, args) { return _this.onChartSeriesAdded(sender, args); };
            this._persistedPanes = [];
            this._chartMinHeight = 100;
            this.chartViewWidget = chartViewWidget;
            this._states = chartViewWidget.states;
            this.userInteractionController = userInteractionController;
            this.layoutManager = layoutManager;
            this._chartManagerDataModel = chartManagerDataModel;
        }
        ChartViewChartManager.prototype.initChartViewWithDataModel = function () {
            var _this = this;
            if (this._chartManagerDataModel != undefined) {
                // If there are already charts in the datamodel => show in chart view => needed for persisting
                if (this._chartManagerDataModel.data != undefined) {
                    //Get persisted chart panes
                    this._persistedPanes = this.layoutManager.chartSplitter.getChartViewSplitterPaneDefinitions();
                    this._chartManagerDataModel.data.forEach(function (chart) {
                        // Add charts, add scales, add series
                        _this.addTraceChart(chart, -1, chart.chartType, false); // Suppress redrawing and do it after all charts where added to avoid multiple redraws
                    });
                    // redraw all charts after adding
                    /*for (let i = 0; i < this.traceChartList.length; i++) {
                        this.traceChartList[i].redrawChart();
                    }*/
                }
            }
        };
        ChartViewChartManager.prototype.dispose = function () {
            for (var i = 0; i < this.traceChartList.length; i++) {
                this.traceChartList[i].dispose();
            }
        };
        ChartViewChartManager.prototype.addTraceChart = function (chart, index, type, supressRedraw) {
            if (index === void 0) { index = -1; }
            if (supressRedraw === void 0) { supressRedraw = false; }
            var newTraceChart = this.addChartToContainer(chart.name, index, type, chart.childs);
            if (supressRedraw == false) {
                this.redrawCharts(false);
            }
            this.updateZoomSettings();
            this.updateXAxisWidth(chart.chartType);
            return newTraceChart;
        };
        ChartViewChartManager.prototype.addChartToContainer = function (name, index, type, scales) {
            if (index === void 0) { index = -1; }
            var traceChart;
            var chartHeight = 300;
            if (this.chartViewWidget.view) {
                // TODO: Handle with settings object factory
                if (type === chartManagerChart_1.ChartType.YTChart) {
                    traceChart = new YTChart_1.YTChart(this.chartViewWidget.view, name, type, scales);
                }
                else if (type === chartManagerChart_1.ChartType.XYChart) {
                    traceChart = new XYChart_1.XYChart(this.chartViewWidget.view, name, type, scales);
                }
                else {
                    traceChart = new FFTChart_1.FFTChart(this.chartViewWidget.view, name, type, scales);
                }
                traceChart.eventUserChartInteraction.attach(this._userChartInteractionHandler);
                traceChart.eventRedrawAllCharts.attach(this._onRedrawAllCharts);
                traceChart.eventSeriesAdded.attach(this._onChartSeriesAdded);
                //Set the height of persisted charts
                if (this._persistedPanes.length > 0) {
                    chartHeight = this.getPersistedChartHeight(name);
                    //Workaround: Add 2 pixels if is the first chart 
                    if (this.layoutManager.chartSplitter.layoutPanes.length == 0) {
                        chartHeight += 2;
                    }
                }
                var paneProperties = new paneProperties_1.PaneProperties();
                paneProperties.paneSize = chartHeight;
                paneProperties.minSize = this._chartMinHeight;
                this.layoutManager.chartSplitter.addWidget(traceChart, name, viewTypeProvider_1.ViewType.User, paneProperties);
                if (index != -1) {
                    // TODO: set index at addWidget Method to avoid moving the chart afterwards
                    this.layoutManager.chartSplitter.moveWidget(traceChart, index);
                    this.traceChartList.splice(index, 0, traceChart);
                }
                else {
                    this.traceChartList.push(traceChart);
                }
                return traceChart;
            }
            return undefined;
        };
        /**
         * Get height of persisted charts
         *
         * @param {string} chartName
         * @returns {number}
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.getPersistedChartHeight = function (chartName) {
            var chartHeight = this.layoutManager.getChartViewSplitterHeight(this._persistedPanes, chartName);
            this._persistedPanes = this._persistedPanes.filter(function (element) { return element.componentDefinition.id != chartName; });
            return chartHeight;
        };
        /**
         * Method to set the ZoomSetting(Direction and BoxZoom) for all Charts according to the corresponding states
         *
         * @private
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.updateZoomSettings = function () {
            var toolstate = this._states.read(chartViewToolbarStates_1.ChartViewToolState, "ChartViewToolState");
            var zoomDirectionState = this._states.read(chartViewToolbarStates_1.ChartViewZoomDirectionState, "ChartViewZoomDirectionState");
            if (toolstate.selectedTool == chartViewToolbarStates_1.ChartViewToolStateEnum.BOXZOOM) {
                this.setBoxZoom(true);
                this.setPanning(false);
            }
            else if (toolstate.selectedTool == chartViewToolbarStates_1.ChartViewToolStateEnum.PANNING) {
                this.setBoxZoom(false);
                this.setPanning(false);
            }
            else {
                this.setBoxZoom(false);
                this.setPanning(false);
            }
            this.setChartZoomAxes(zoomDirectionState.zoomDirection);
        };
        ChartViewChartManager.prototype.removeTraceChart = function (chart) {
            chart.eventUserChartInteraction.detach(this._userChartInteractionHandler);
            chart.eventRedrawAllCharts.detach(this._onRedrawAllCharts);
            chart.eventSeriesAdded.detach(this._onChartSeriesAdded);
            this.removeChartFromChartList(chart);
            chart.dispose();
            this.layoutManager.chartSplitter.removeWidget(chart);
        };
        ChartViewChartManager.prototype.removeChartFromChartList = function (chart) {
            var index = this.getChartIndex(chart);
            if (index > -1) {
                this.traceChartList.splice(index, 1);
            }
        };
        ChartViewChartManager.prototype.moveTraceChart = function (chart, targetChart, args) {
            var traceChart = this.getChartObjectByName(chart.name);
            var targetTraceChart = this.getChartObjectByName(targetChart.name);
            if (traceChart != undefined && targetTraceChart != undefined) {
                var chartIndex = this.getChartIndex(traceChart);
                var targetIndex = this.getChartIndex(targetTraceChart);
                if (args.insertType == "insertBelow") {
                    targetIndex += 1;
                }
                if (chartIndex > -1 && targetIndex > -1) {
                    this.traceChartList.splice(chartIndex, 1);
                    if (chartIndex < targetIndex) {
                        this.traceChartList.splice(targetIndex - 1, 0, traceChart);
                    }
                    else {
                        this.traceChartList.splice(targetIndex, 0, traceChart);
                    }
                    this.layoutManager.chartSplitter.moveWidget(traceChart, targetIndex);
                }
                this.redrawCharts(false);
                this.updateXAxisWidth(chart.chartType);
            }
        };
        ChartViewChartManager.prototype.removeAllCharts = function () {
            while (this.traceChartList.length > 0) {
                this.removeTraceChart(this.traceChartList[0]);
            }
        };
        ChartViewChartManager.prototype.getChartIndex = function (chart) {
            var index = -1;
            for (var i = 0; i < this.traceChartList.length; i++) {
                if (this.traceChartList[i] == chart) {
                    index = i;
                }
            }
            return index;
        };
        ChartViewChartManager.prototype.getTraceChartByContainerId = function (containerID) {
            for (var i = 0; i < this.traceChartList.length; i++) {
                var divId = this.traceChartList[i].mainDivId;
                if (divId == containerID.substr(0, divId.length)) {
                    return this.traceChartList[i];
                }
            }
            return undefined;
        };
        ChartViewChartManager.prototype.getTraceChartByName = function (chartName) {
            for (var i = 0; i < this.traceChartList.length; i++) {
                if (this.traceChartList[i].widgetName == chartName) {
                    return this.traceChartList[i];
                }
            }
            return undefined;
        };
        ChartViewChartManager.prototype.onChartManagerModelChanged = function (dataModel, args) {
            this._chartManagerDataModel = dataModel;
            switch (args.hint) {
                case chartManagerDataModel_1.ChartManagerDataModelChangedHint.addSerie: {
                    this.addSeriesToChart(args.data.series, args.data.chart, args.data.axis, args.data.keepScales);
                    break;
                }
                case chartManagerDataModel_1.ChartManagerDataModelChangedHint.moveSerie: {
                    this.moveSerie(args.data.serie, args.data.chart.name, args.data.targetChart.name, args.data.targetAxis);
                    break;
                }
                case chartManagerDataModel_1.ChartManagerDataModelChangedHint.removeSerie: {
                    this.removeSerie(args.data.serie, args.data.chart.name);
                    break;
                }
                case chartManagerDataModel_1.ChartManagerDataModelChangedHint.removeChart: {
                    this.removeChart(args.data.chart);
                    break;
                }
                case chartManagerDataModel_1.ChartManagerDataModelChangedHint.addChart: {
                    this.addTraceChart(args.data.chart, args.data.index, args.data.type);
                    break;
                }
                case chartManagerDataModel_1.ChartManagerDataModelChangedHint.moveChart: {
                    this.moveTraceChart(args.data.chart, args.data.target, args.data);
                    break;
                }
                case chartManagerDataModel_1.ChartManagerDataModelChangedHint.addYScale: {
                    this.addYScale(args.data.yAxis, args.data.chart.name);
                    break;
                }
                case chartManagerDataModel_1.ChartManagerDataModelChangedHint.removeYScale: {
                    this.removeYAxis(args.data.yAxis, args.data.chart);
                    break;
                }
                case chartManagerDataModel_1.ChartManagerDataModelChangedHint.updateScaleRange: {
                    this.synchronizeScaleXRange(args.data.scale);
                    break;
                }
            }
        };
        ChartViewChartManager.prototype.addSeriesToChart = function (series, chart, scale, keepScales) {
            if (keepScales === void 0) { keepScales = false; }
            for (var i = 0; i < series.length; i++) {
                series[i].eventDataChanged.attach(this._onSerieDataChanged);
            }
            var chartName = chart.name;
            var resetXRange = false;
            var resetYRange = false;
            if (!keepScales) {
                resetXRange = this.isFirstSeriesOfTypeInCharts(series[0]);
                resetYRange = this.isFirstSeriesOnScale(series[0], scale);
            }
            else {
                var chartObj = this.getChartObjectByName(chartName);
                if (chartObj != undefined) {
                    // TODO: Only works for YT but not for FFT
                    // Update scale(Y)
                    chartObj.setScaleRange(scale, scale.minXValue, scale.maxXValue, scale.minYValue, scale.maxYValue);
                    // Update scale(X)
                    chartObj.setRangeX(scale.minXValue, scale.maxXValue);
                }
            }
            this.addSeries(series, chartName, scale, resetYRange, resetXRange);
            if (resetXRange) {
                this.resetXRange(series[0]);
            }
        };
        /**
         *Checks if a given Series is the first Series on a particular scale
         *
         * @private
         * @param {Array<BaseSeries>} series
         * @param {Scale} scale
         * @returns {boolean}
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.isFirstSeriesOnScale = function (series, scale) {
            //only reset the chartrange on the y axis if these are the first series in the scale
            if (scale.childs.length < 1 || series != scale.childs[0]) {
                return false;
            }
            return true;
        };
        /**
         *Checks if a given Series is the first of its type in all charts
         *
         * @private
         * @param {BaseSeries} series
         * @returns
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.isFirstSeriesOfTypeInCharts = function (series) {
            var charts = this.getChartsForSerie(series);
            for (var _i = 0, charts_1 = charts; _i < charts_1.length; _i++) {
                var chart = charts_1[_i];
                if (chart.series.length != 0) {
                    return false;
                }
            }
            return true;
        };
        ChartViewChartManager.prototype.getChartsForSerie = function (series) {
            var charts = Array();
            if (series.type == seriesType_1.SeriesType.fftSeries) {
                charts = new chartRangeHelper_1.ChartRangeHelper().getFFTCharts(this.traceChartList);
            }
            else if (series.type == seriesType_1.SeriesType.timeSeries) {
                charts = new chartRangeHelper_1.ChartRangeHelper().getYTCharts(this.traceChartList);
            }
            return charts;
        };
        ChartViewChartManager.prototype.onSerieDataChanged = function (sender, eventArgs) {
            if (eventArgs.action == eventSerieDataChangedArgs_1.SerieAction.dataPointsChanged) {
                this.updateSerieData(sender);
            }
            else if (eventArgs.action == eventSerieDataChangedArgs_1.SerieAction.colorChanged) {
                this.updateSerieColor(sender);
            }
        };
        /**
         *  Updates the serie datapoints in all charts where the serie is displayed
         *  If datapoints not valid, the serie will be removed from the charts otherwise added if not already in the chart
         *
         * @private
         * @param {BaseSeries} series
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.updateSerieData = function (series) {
            if (series.rawPointsValid == false) {
                // No valid serie data => remove from all charts
                this.removeSerieFromAllCharts(series);
            }
            else {
                // add serie to chart if not already in it otherwise update chart
                if (this._chartManagerDataModel != undefined) {
                    var charts = this._chartManagerDataModel.getChartsUsingSerie([series]);
                    this.updateSerieInAllCharts(charts, series);
                }
            }
        };
        ChartViewChartManager.prototype.updateSerieInAllCharts = function (charts, series) {
            var serieChartType = SerieChartTypeHelper_1.SerieChartTypeHelper.getSerieChartType(series.type);
            for (var i = 0; i < charts.length; i++) {
                var chart = this.getChartObjectByName(charts[i].name);
                if (chart != undefined && serieChartType == chart.type) {
                    if (!this.isSerieInChart(chart, series)) {
                        // add series 
                        var scale = charts[i].getYAxisForSerie(series);
                        if (scale != undefined) {
                            var isFirstSeriesInChart = this.isFirstSeriesOfTypeInCharts(series);
                            this.addSeries([series], charts[i].name, scale, this.isFirstSeriesOnScale(series, scale), true);
                            if (isFirstSeriesInChart) {
                                this.resetXRange(series);
                            }
                        }
                        else {
                            console.error("Scale not found for serie");
                        }
                    }
                    chart.setAvailableSeriesAsDataSource();
                    chart.redrawChart();
                }
            }
        };
        ChartViewChartManager.prototype.resetXRange = function (series) {
            var chartRangeHelper = new chartRangeHelper_1.ChartRangeHelper();
            if (series.type == seriesType_1.SeriesType.timeSeries) {
                chartRangeHelper.resetXRangesYT(this.traceChartList);
            }
            else if (series.type == seriesType_1.SeriesType.fftSeries) {
                chartRangeHelper.resetXRangesFFT(this.traceChartList);
            }
            this.redrawCharts(true);
        };
        /**
         * Updates the color of the serie in all charts where the serie is displayed
         *
         * @private
         * @param {BaseSeries} serie
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.updateSerieColor = function (serie) {
            if (this._chartManagerDataModel != undefined) {
                var series = new Array();
                series.push(serie);
                var charts = this._chartManagerDataModel.getChartsUsingSerie(series);
                for (var i = 0; i < charts.length; i++) {
                    var chart = this.getChartObjectByName(charts[i].name);
                    if (chart != undefined) {
                        // Update series color in the chart
                        chart.setAvailableSeriesAsDataSource();
                    }
                }
            }
        };
        /**
         * add serie to chart
         *
         * @param {Array<BaseSeries>} series
         * @param {string} chartName
         * @param {Scale} scale
         * @param {boolean} updateRangeY
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.addSeries = function (series, chartName, scale, updateRangeY, updateRangeX) {
            var chart = this.getChartObjectByName(chartName);
            if (chart != undefined) {
                var axisMin = void 0;
                var axisMax = void 0;
                var axis = chart.chart.getAxis(scale.id);
                if (axis != undefined) {
                    var axisRange = axis.getAxisRange();
                    if (axisRange != undefined) {
                        axisMin = axisRange.min;
                        axisMax = axisRange.max;
                    }
                }
                else {
                    console.error("Scale not available! " + scale.id);
                }
                chart.addSeriesToChart(series, scale, updateRangeX);
                chart.setAvailableSeriesAsDataSource();
                if (axisMin != undefined && axisMax != undefined) {
                    chart.setScaleRange(scale, scale.minXValue, scale.maxXValue, axisMin, axisMax);
                }
                if (updateRangeY) {
                    var axisMinValue = chart.getSeriesMinYForScale(scale);
                    var axisMaxValue = chart.getSeriesMaxYForScale(scale);
                    if (axisMinValue != undefined && axisMaxValue != undefined) {
                        chart.updateRangeY(scale, axisMinValue, axisMaxValue);
                    }
                }
                chart.redrawChart();
            }
        };
        ChartViewChartManager.prototype.addYScale = function (yScale, chartName) {
            var chart = this.getChartObjectByName(chartName);
            if (chart != undefined) {
                chart.addYScale(yScale, chartInterface_1.AxisPosition.right);
                this.updateXAxisWidth(chart.type);
            }
        };
        /**
         * move one serie from one chart to another
         *
         * @param {BaseSeries} serie
         * @param {string} chartName
         * @param {string} targetChartName
         * @param {Scale} targetScale
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.moveSerie = function (serie, chartName, targetChartName, targetScale) {
            if (serie.rawPointsValid == true) {
                var chart = this.getChartObjectByName(chartName);
                var target = this.getChartObjectByName(targetChartName);
                var series = new Array();
                series.push(serie);
                if (chart != undefined && target != undefined) {
                    chart.removeSerieFromChart(serie, this.isLastSerieWithCursorType(chart));
                    target.addSeriesToChart(series, targetScale, true);
                    chart.setAvailableSeriesAsDataSource();
                    target.setAvailableSeriesAsDataSource();
                }
                this.updateXAxisWidth(chart.type);
            }
        };
        /**
         * remove one serie from given chart
         *
         * @param {BaseSeries} serie
         * @param {string} chartName
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.removeSerie = function (serie, chartName) {
            var chart = this.getChartObjectByName(chartName);
            if (chart != undefined) {
                chart.removeSerieFromChart(serie, this.isLastSerieWithCursorType(chart));
                chart.setAvailableSeriesAsDataSource();
            }
            var chartsWithSerie = this._chartManagerDataModel.getChartsUsingSerie([serie]);
            if (chartsWithSerie.length == 0) { // Serie not used in an other chart => detach serie events
                serie.eventDataChanged.detach(this._onSerieDataChanged);
            }
        };
        ChartViewChartManager.prototype.removeYAxis = function (yScale, chart) {
            var traceChart = this.getChartObjectByName(chart.name);
            if (traceChart != undefined) {
                traceChart.removeYScaleFromChart(yScale);
                traceChart.setAvailableSeriesAsDataSource();
            }
            this.updateXAxisWidth(chart.chartType);
        };
        /**
         * remove chart
         *
         * @param {string} chartName
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.removeChart = function (chart) {
            var traceChart = this.getChartObjectByName(chart.name);
            if (traceChart != undefined) {
                this.removeTraceChart(traceChart);
                var minX = void 0;
                var maxX = void 0;
                for (var i = 0; i < traceChart.series.length; i++) {
                    if (minX == undefined || minX > traceChart.series[i].minX) {
                        minX = traceChart.series[i].minX;
                    }
                    if (maxX == undefined || maxX < traceChart.series[i].maxX) {
                        maxX = traceChart.series[i].maxX;
                    }
                }
            }
            this.updateXAxisWidth(chart.chartType);
        };
        ChartViewChartManager.prototype.setPanningAxes = function (axes) {
            for (var i = 0; i < this.traceChartList.length; i++) {
                var panningAxis = new Array();
                if (axes[0] == undefined) {
                    for (var j = 0; j < this.traceChartList[i].scales.length; j++) {
                        var axis = this.traceChartList[i].chart.getAxis(this.traceChartList[i].scales[j].id);
                        if (axis != undefined) {
                            panningAxis.push(axis);
                        }
                    }
                    var axis = this.traceChartList[i].chart.getAxis(this.traceChartList[i].primaryXAxisName);
                    if (axis != undefined) {
                        panningAxis.push(axis);
                    }
                }
                else {
                    panningAxis = axes;
                }
                this.traceChartList[i].chart.setPanningAxes(panningAxis);
            }
        };
        ChartViewChartManager.prototype.synchronizeScaleXRange = function (scale) {
            var chartType = scale.parent.chartType;
            var min = scale.minXValue;
            var max = scale.maxXValue;
            for (var i = 0; i < this.traceChartList.length; i++) {
                if (this.traceChartList[i].type == chartType) {
                    this.traceChartList[i].onSynchronizeScaleRange(scale, min, max);
                    //this.traceChartList[i].redrawChart();
                }
            }
        };
        ChartViewChartManager.prototype.getZoomAxesInChart = function (chart, zoomDirection) {
            var axes = new Array();
            if (zoomDirection == chartViewWidget_1.ZoomDirection.XY || zoomDirection == chartViewWidget_1.ZoomDirection.X) {
                var axis = chart.chart.getAxis(chart.primaryXAxisName);
                if (axis != undefined) {
                    axes.push(axis);
                }
            }
            if (zoomDirection == chartViewWidget_1.ZoomDirection.XY || zoomDirection == chartViewWidget_1.ZoomDirection.Y) {
                for (var i = 0; i < chart.scales.length; i++) {
                    var axis = chart.chart.getAxis(chart.scales[i].id);
                    if (axis != undefined && axis.getAxisOrientation() == chartInterface_1.AxisOrientation.vertical) {
                        axes.push(axis);
                    }
                }
            }
            return axes;
        };
        /**
         * Returns true if there are no more series in all other charts with the same cursor type
         *
         * @private
         * @param {ITraceChart} chart
         * @returns {boolean}
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.isLastSerieWithCursorType = function (chart) {
            var cursorType = chart.getSerieCursorType();
            if (chart.series.length > 1) {
                return false;
            }
            for (var i = 0; i < this.traceChartList.length; i++) {
                if (this.traceChartList[i].getSerieCursorType() === cursorType && this.traceChartList[i] !== chart) {
                    return false;
                }
            }
            return true;
        };
        /**
         * Finds ITraceChartObject by give name and return object
         *
         * @private
         * @param {string} name
         * @returns {(ITraceChart | undefined)}
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.getChartObjectByName = function (name) {
            for (var i = 0; i < this.traceChartList.length; i++) {
                if (this.traceChartList[i].widgetName == name) {
                    return this.traceChartList[i];
                }
            }
            return undefined;
        };
        ChartViewChartManager.prototype.isSerieInChart = function (chart, serie) {
            for (var i = 0; i < chart.series.length; i++) {
                if (chart.series[i].id === serie.id) {
                    return true;
                }
            }
            return false;
        };
        /*private getPreviousChartObjectByName(name :string) : ITraceChart | undefined{
            for(let i = 0; i < this.traceChartList.length; i++){
                if(this.traceChartList[i].widgetName == name){
                   return this.traceChartList[i];
                }
            }
            return undefined;
        }*/
        ChartViewChartManager.prototype.removeSerieFromAllCharts = function (serie) {
            for (var i = 0; i < this.traceChartList.length; i++) {
                var index = this.traceChartList[i].series.map(function (x) { return x.id; }).indexOf(serie.id);
                //const index = this.traceChartList[i].series.indexOf(serie, 0);
                if (index > -1) {
                    this.traceChartList[i].removeSerieFromChart(this.traceChartList[i].series[index], this.isLastSerieWithCursorType(this.traceChartList[i]));
                }
            }
        };
        ChartViewChartManager.prototype.checkReferenceCursorsHovering = function (mousePoint, traceChart) {
            traceChart.checkCursorsHovering(mousePoint);
        };
        ChartViewChartManager.prototype.dragCursorAlongLine = function (traceChart, movementX, movementY) {
            traceChart.dragCursorAlongLine(movementX, movementY, this._hoveredSeries);
        };
        ChartViewChartManager.prototype.setCursorOnPointerPosition = function (traceChart, mousePoint) {
            traceChart.setCursorOnPointerPosition(mousePoint);
        };
        ChartViewChartManager.prototype.doPanning = function (traceChart, mousePointX, mousePointY) {
            traceChart.doPanning(mousePointX, mousePointY);
        };
        ChartViewChartManager.prototype.resetPanningCoords = function () {
            for (var _i = 0, _a = this.traceChartList; _i < _a.length; _i++) {
                var chart = _a[_i];
                chart.resetPanningCoords();
            }
        };
        ChartViewChartManager.prototype.resetZoom = function () {
            var chartRangeHelper = new chartRangeHelper_1.ChartRangeHelper();
            chartRangeHelper.resetXRangesAllChartTypes(this.traceChartList);
            chartRangeHelper.resetYRangesAllChartTypes(this.traceChartList);
            this.redrawCharts(true);
        };
        ChartViewChartManager.prototype.resetCursorsHovering = function (args) {
            if (this.traceChartList.length > 0) {
                var parentElement = args.data.e.target.parentElement;
                if (parentElement !== undefined && parentElement !== null) {
                    var mouseOverCursors = this.isMouseOverCursors(parentElement);
                    //Just reset cursors if mouse is moving outside a chart
                    if (this.getTraceChartByContainerId(parentElement.id) === undefined && !mouseOverCursors) {
                        this.traceChartList[0].resetCursorsHovered();
                    }
                }
            }
        };
        ChartViewChartManager.prototype.autoScale = function () {
            var chartRangeHelper = new chartRangeHelper_1.ChartRangeHelper();
            for (var _i = 0, _a = this.traceChartList; _i < _a.length; _i++) {
                var chart = _a[_i];
                chart.autoScaleYScales();
            }
            chartRangeHelper.resetXRangesAllChartTypes(this.traceChartList);
            this.redrawCharts(true);
        };
        ChartViewChartManager.prototype.setChartZoomAxes = function (axes) {
            for (var i = 0; i < this.traceChartList.length; i++) {
                this.traceChartList[i].setZoomAxes(axes);
            }
            this.chartViewWidget.activeSelectedZoomAxis = axes;
        };
        ChartViewChartManager.prototype.setPanning = function (enable) {
            for (var i = 0; i < this.traceChartList.length; i++) {
                this.traceChartList[i].setPanning(enable);
            }
        };
        ChartViewChartManager.prototype.setBoxZoom = function (enable) {
            for (var i = 0; i < this.traceChartList.length; i++) {
                this.traceChartList[i].setBoxZoom(enable);
            }
        };
        ChartViewChartManager.prototype.redrawCharts = function (forceRedraw, chartType) {
            for (var i = 0; i < this.traceChartList.length; i++) {
                //if (forceRedraw == true || this.traceChartList[i].type != ChartType.XYChart) {
                //    this.traceChartList[i].redrawChart();
                //}
                if (chartType == undefined || forceRedraw == true || this.traceChartList[i].type == chartType) {
                    this.traceChartList[i].redrawChart();
                }
            }
        };
        ChartViewChartManager.prototype.onRedrawAllCharts = function (sender, args) {
            this.redrawCharts(false, args.chartType);
        };
        ChartViewChartManager.prototype.onChartSeriesAdded = function (sender, args) {
            if (args != undefined) {
                var serie = args;
                serie.eventDataChanged.attach(this._onSerieDataChanged);
            }
        };
        ChartViewChartManager.prototype.isMouseOverCursors = function (element) {
            if (element.classList.value.includes(CrossHairCursor_1.CrossHairCursor.crossHairCursorId) || element.classList.value.includes(LineCursor_1.LineCursor.lineCursorId)) {
                return true;
            }
            return false;
        };
        ChartViewChartManager.prototype.onUserChartInteraction = function (sender, eventUserChartInteractionArgs) {
            //on dragging the hoverd series needs to be stored to calculate the cursor postion when the mouse is moved over multiple charts
            if (eventUserChartInteractionArgs.eventArguments.hoveredSeries) {
                this._hoveredSeries = eventUserChartInteractionArgs.eventArguments.hoveredSeries;
            }
            this.chartViewWidget.onUserChartInteraction(sender, eventUserChartInteractionArgs);
        };
        ChartViewChartManager.prototype.addDroppableLocations = function (data, sameGroup) {
            for (var _i = 0, _a = this.traceChartList; _i < _a.length; _i++) {
                var chart = _a[_i];
                var chartManagerChart = this._chartManagerDataModel.getChart(chart.widgetName);
                var serieChartType = SerieChartTypeHelper_1.SerieChartTypeHelper.getSerieChartType(data[0].type);
                SerieChartTypeHelper_1.SerieChartTypeHelper.setDropPossibleAreas(chartManagerChart, data, serieChartType, sameGroup);
                chart.addSerieDropLocations(data, chartManagerChart);
            }
            var dropHelper = new chartDropHelper_1.ChartDropHelper(this._chartManagerDataModel, this.chartViewWidget);
            // Add empty space drop location
            if (dropHelper.canAddChart() == true) { // Is it possible to add one more chart
                var emptySpaceElement = document.getElementById(this.layoutManager.chartSplitter.getLastPaneId());
                var scrollBarWidth = $('#' + this.layoutManager.chartSplitterParentContainerId)[0].offsetWidth - $('#' + this.layoutManager.chartSplitterContainerId)[0].offsetWidth;
                if (emptySpaceElement != undefined) {
                    emptySpaceElement.style.backgroundColor = 'rgba(125,160,165, 0.2)';
                    if (data[0].type == seriesType_1.SeriesType.timeSeries && data.length > 2 || !sameGroup) {
                        this.addChartTypeAreas(emptySpaceElement, [true, false, true], scrollBarWidth);
                    }
                    else if (data[0].type == seriesType_1.SeriesType.timeSeries) {
                        this.addChartTypeAreas(emptySpaceElement, [true, true, true], scrollBarWidth);
                    }
                    else if (data[0].type == seriesType_1.SeriesType.xySeries) {
                        this.addChartTypeAreas(emptySpaceElement, [false, true, false], scrollBarWidth);
                    }
                    else if (data[0].type == seriesType_1.SeriesType.fftSeries) {
                        this.addChartTypeAreas(emptySpaceElement, [false, false, true], scrollBarWidth);
                    }
                }
            }
        };
        ChartViewChartManager.prototype.addChartTypeAreas = function (parent, enabled, scrollBarWidth) {
            var chartNames = ['YT', 'XY', 'FFT'];
            for (var i = 0; i < chartNames.length; i = i + 1) {
                var area = document.createElement('div');
                area.id = parent.id + '_' + chartNames[i];
                area.classList.add('chartTypes');
                if (!enabled[i]) {
                    area.classList.add('disabled');
                }
                area.style.width = ((parent.offsetWidth - scrollBarWidth) / chartNames.length).toString() + 'px';
                var image = document.createElement("img");
                image.src = './widgets/common/style/images/chartType' + chartNames[i] + '.svg';
                image.classList.add('imageChart');
                area.appendChild(image);
                parent.appendChild(area);
            }
        };
        ChartViewChartManager.prototype.removeDroppableLocations = function () {
            for (var _i = 0, _a = this.traceChartList; _i < _a.length; _i++) {
                var chart = _a[_i];
                chart.removeSerieDropLocations();
            }
            // Remove empty space drop location
            var emptySpaceElement = document.getElementById(this.layoutManager.chartSplitter.getLastPaneId());
            if (emptySpaceElement != undefined) {
                var typeOfCharts = emptySpaceElement.children.length;
                emptySpaceElement.style.backgroundColor = '#fff';
                for (var i = 0; i < typeOfCharts; i = i + 1) {
                    emptySpaceElement.children[0].remove();
                }
            }
        };
        ChartViewChartManager.prototype.updateXAxisWidth = function (chartType) {
            var maxYAxes = 0;
            var chartArea;
            for (var i = 0; i < this.traceChartList.length; i++) {
                if (this.traceChartList[i].type == chartType) {
                    this.traceChartList[i].chart.redraw();
                    var numberOfYAxesInChart = this.traceChartList[i].getNumberOfYScales();
                    if (numberOfYAxesInChart == 0) {
                        numberOfYAxesInChart = 1;
                    }
                    //if one chart has more axis than the others use its width, if they have the same amount use the one with the higher width
                    if (numberOfYAxesInChart > maxYAxes) {
                        maxYAxes = numberOfYAxesInChart;
                        chartArea = this.traceChartList[i].chart.getChartArea();
                    }
                    else if (numberOfYAxesInChart == maxYAxes && this.traceChartList[i].chart.getChartArea().width > chartArea.width) {
                        chartArea = this.traceChartList[i].chart.getChartArea();
                    }
                }
            }
            if (chartArea != undefined) {
                this.alignYAxes(chartArea, chartType);
            }
        };
        ChartViewChartManager.prototype.alignYAxes = function (chartArea, chartType) {
            for (var i = 0; i < this.traceChartList.length; i++) {
                if (this.traceChartList[i].type == chartType) {
                    var newChartArea = { x: chartArea.x, y: chartArea.y, width: chartArea.width, height: this.traceChartList[i].chart.getChartArea().height - 1 };
                    this.traceChartList[i].chart.setChartArea(newChartArea);
                    this.traceChartList[i].redrawChart();
                }
            }
        };
        return ChartViewChartManager;
    }());
    exports.ChartViewChartManager = ChartViewChartManager;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRWaWV3Q2hhcnRNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0Vmlld1dpZGdldC9jaGFydFZpZXdDaGFydE1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBZ0NBO1FBc0JJLCtCQUFZLGVBQWdDLEVBQUUseUJBQXFELEVBQUUsYUFBcUMsRUFBRSxxQkFBNkM7WUFBekwsaUJBTUM7WUExQkQsbUJBQWMsR0FBdUIsRUFBRSxDQUFDO1lBQ3hDLFdBQU0sR0FBaUIsSUFBSSxLQUFLLEVBQWMsQ0FBQztZQVF2Qyx3QkFBbUIsR0FBRyxVQUFDLE1BQU0sRUFBRSxTQUFTLElBQUssT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxFQUExQyxDQUEwQyxDQUFDO1lBQ3hGLGlDQUE0QixHQUFHLFVBQUMsTUFBTSxFQUFFLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQXpDLENBQXlDLENBQUM7WUFDM0YsdUJBQWtCLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsRUFBbkMsQ0FBbUMsQ0FBQztZQUMxRSx3QkFBbUIsR0FBRyxVQUFDLE1BQU0sRUFBQyxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxFQUFwQyxDQUFvQyxDQUFDO1lBRTVFLG9CQUFlLEdBQWtDLEVBQUUsQ0FBQztZQUkzQyxvQkFBZSxHQUFHLEdBQUcsQ0FBQztZQUduQyxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztZQUN2QyxJQUFJLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUM7WUFDdEMsSUFBSSxDQUFDLHlCQUF5QixH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QWtCLFNBQW9CLEVBQUUsU0FBb0I7WUFDeEQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNqRCxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLFNBQVMsRUFBRTtvQkFDMUMsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQyxDQUFDO29CQUM3SSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQ3hELElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7aUJBQ3hDO2FBRUo7UUFDTCxDQUFDO1FBQ0wsNEJBQUM7SUFBRCxDQUFDLEFBejZCRCxJQXk2QkM7SUF6NkJZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElUcmFjZUNoYXJ0IH0gZnJvbSBcIi4uL2NoYXJ0V2lkZ2V0L2ludGVyZmFjZXMvdHJhY2VDaGFydEludGVyZmFjZVwiXHJcbmltcG9ydCB7IFlUQ2hhcnQgfSBmcm9tIFwiLi4vY2hhcnRXaWRnZXQvWVRDaGFydFwiXHJcbmltcG9ydCB7IFhZQ2hhcnQgfSBmcm9tIFwiLi4vY2hhcnRXaWRnZXQvWFlDaGFydFwiXHJcbmltcG9ydCB7IEZGVENoYXJ0IH0gZnJvbSBcIi4uL2NoYXJ0V2lkZ2V0L0ZGVENoYXJ0XCI7XHJcbmltcG9ydCB7IEV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzLCBDaGFydEJhc2UsIEV2ZW50UmVkcmF3QWxsQ2hhcnRzQXJncyB9IGZyb20gXCIuLi9jaGFydFdpZGdldC9DaGFydEJhc2VcIlxyXG5pbXBvcnQgeyBDaGFydFZpZXdMYXlvdXRNYW5hZ2VyIH0gZnJvbSBcIi4vY2hhcnRWaWV3TGF5b3V0TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvaW50ZXJmYWNlcy9jaGFydE1hbmFnZXJEYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ2hhcnRWaWV3V2lkZ2V0LCBab29tRGlyZWN0aW9uIH0gZnJvbSBcIi4vY2hhcnRWaWV3V2lkZ2V0XCI7XHJcbmltcG9ydCB7IFZpZXdUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi92aWV3VHlwZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IENoYXJ0UmFuZ2VIZWxwZXIgfSBmcm9tIFwiLi4vY2hhcnRXaWRnZXQvaGVscGVycy9jaGFydFJhbmdlSGVscGVyXCI7XHJcbmltcG9ydCB7IENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsXCI7XHJcbmltcG9ydCB7IElVc2VySW50ZXJhY3Rpb25Db250cm9sbGVyIH0gZnJvbSBcIi4uL2NoYXJ0V2lkZ2V0L3VzZXJJbnRlcmFjdGlvbi9pbnRlcmZhY2VzL2NvbnRyb2xsZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ2hhcnRUeXBlLCBDaGFydE1hbmFnZXJDaGFydCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2NoYXJ0TWFuYWdlckNoYXJ0XCJcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3Nlcmllcy9iYXNlU2VyaWVzXCJcclxuaW1wb3J0IHsgU2VyaWVBY3Rpb24sIEV2ZW50U2VyaWVEYXRhQ2hhbmdlZEFyZ3MgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9zZXJpZXMvZXZlbnRTZXJpZURhdGFDaGFuZ2VkQXJnc1wiXHJcbmltcG9ydCB7IFNjYWxlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvc2NhbGVcIjtcclxuaW1wb3J0IHsgQ2hhcnREcm9wSGVscGVyIH0gZnJvbSBcIi4vaGVscGVycy9jaGFydERyb3BIZWxwZXJcIjtcclxuaW1wb3J0IHsgQ2hhcnRWaWV3VG9vbFN0YXRlLCBDaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGUsIENoYXJ0Vmlld1Rvb2xTdGF0ZUVudW0gfSBmcm9tIFwiLi4vY29tbW9uL3N0YXRlcy9jaGFydFZpZXdUb29sYmFyU3RhdGVzXCI7XHJcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9zdG9yZVwiO1xyXG5pbXBvcnQgeyBJQ2hhcnRNYW5hZ2VyQ2hhcnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9pbnRlcmZhY2VzL2NoYXJ0TWFuYWdlckNoYXJ0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEF4aXNQb3NpdGlvbiwgQXhpc09yaWVudGF0aW9uIH0gZnJvbSBcIi4uLy4uL2NvcmUvaW50ZXJmYWNlcy9jb21wb25lbnRzL3VpL2NoYXJ0L2NoYXJ0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFJlY3RhbmdsZSB9IGZyb20gXCIuLi8uLi9jb3JlL3R5cGVzL1JlY3RhbmdsZVwiO1xyXG5pbXBvcnQgeyBJQ2hhcnRBeGlzIH0gZnJvbSBcIi4uLy4uL2NvcmUvaW50ZXJmYWNlcy9jb21wb25lbnRzL3VpL2NoYXJ0L0NoYXJ0QXhpc0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTZXJpZUNoYXJ0VHlwZUhlbHBlciB9IGZyb20gXCIuLi9jb21tb24vU2VyaWVDaGFydFR5cGVIZWxwZXJcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3Nlcmllcy9zZXJpZXNUeXBlXCI7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi8uLi9jb3JlL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU3BsaXR0ZXJQYW5lRGVmaW5pdGlvbiB9IGZyb20gXCIuLi9zcGxpdHRlcldpZGdldC9zcGxpdHRlclBhbmVEZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENyb3NzSGFpckN1cnNvciB9IGZyb20gXCIuLi9jaGFydFdpZGdldC9jdXJzb3IvQ3Jvc3NIYWlyQ3Vyc29yXCI7XHJcbmltcG9ydCB7IExpbmVDdXJzb3IgfSBmcm9tIFwiLi4vY2hhcnRXaWRnZXQvY3Vyc29yL0xpbmVDdXJzb3JcIjtcclxuaW1wb3J0IHsgUGFuZVByb3BlcnRpZXMgfSBmcm9tIFwiLi4vY29tbW9uL3BhbmVQcm9wZXJ0aWVzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyIHtcclxuICAgIGNoYXJ0Vmlld1dpZGdldDogQ2hhcnRWaWV3V2lkZ2V0O1xyXG4gICAgdHJhY2VDaGFydExpc3Q6IEFycmF5PElUcmFjZUNoYXJ0PiA9IFtdO1xyXG4gICAgc2VyaWVzOiBCYXNlU2VyaWVzW10gPSBuZXcgQXJyYXk8QmFzZVNlcmllcz4oKTtcclxuXHJcbiAgICBsYXlvdXRNYW5hZ2VyOiBDaGFydFZpZXdMYXlvdXRNYW5hZ2VyO1xyXG4gICAgdXNlckludGVyYWN0aW9uQ29udHJvbGxlcjogSVVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXI7XHJcbiAgICBfY2hhcnRNYW5hZ2VyRGF0YU1vZGVsOiBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsO1xyXG5cclxuICAgIHByaXZhdGUgX3N0YXRlczogU3RvcmU7XHJcblxyXG4gICAgcHJpdmF0ZSBfb25TZXJpZURhdGFDaGFuZ2VkID0gKHNlbmRlciwgZXZlbnRBcmdzKSA9PiB0aGlzLm9uU2VyaWVEYXRhQ2hhbmdlZChzZW5kZXIsIGV2ZW50QXJncyk7XHJcbiAgICBwcml2YXRlIF91c2VyQ2hhcnRJbnRlcmFjdGlvbkhhbmRsZXIgPSAoc2VuZGVyLCBhcmdzKSA9PiB0aGlzLm9uVXNlckNoYXJ0SW50ZXJhY3Rpb24oc2VuZGVyLCBhcmdzKTtcclxuICAgIHByaXZhdGUgX29uUmVkcmF3QWxsQ2hhcnRzID0gKHNlbmRlcixhcmdzKSA9PiB0aGlzLm9uUmVkcmF3QWxsQ2hhcnRzKHNlbmRlcixhcmdzKTtcclxuICAgIHByaXZhdGUgX29uQ2hhcnRTZXJpZXNBZGRlZCA9IChzZW5kZXIsYXJncykgPT4gdGhpcy5vbkNoYXJ0U2VyaWVzQWRkZWQoc2VuZGVyLGFyZ3MpO1xyXG5cclxuICAgIHByaXZhdGUgX3BlcnNpc3RlZFBhbmVzOiBBcnJheTxTcGxpdHRlclBhbmVEZWZpbml0aW9uPiA9IFtdO1xyXG5cclxuICAgIHByaXZhdGUgX2hvdmVyZWRTZXJpZXM7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfY2hhcnRNaW5IZWlnaHQgPSAxMDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY2hhcnRWaWV3V2lkZ2V0OiBDaGFydFZpZXdXaWRnZXQsIHVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXI6IElVc2VySW50ZXJhY3Rpb25Db250cm9sbGVyLCBsYXlvdXRNYW5hZ2VyOiBDaGFydFZpZXdMYXlvdXRNYW5hZ2VyLCBjaGFydE1hbmFnZXJEYXRhTW9kZWw6IElDaGFydE1hbmFnZXJEYXRhTW9kZWwpIHtcclxuICAgICAgICB0aGlzLmNoYXJ0Vmlld1dpZGdldCA9IGNoYXJ0Vmlld1dpZGdldDtcclxuICAgICAgICB0aGlzLl9zdGF0ZXMgPSBjaGFydFZpZXdXaWRnZXQuc3RhdGVzO1xyXG4gICAgICAgIHRoaXMudXNlckludGVyYWN0aW9uQ29udHJvbGxlciA9IHVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXI7XHJcbiAgICAgICAgdGhpcy5sYXlvdXRNYW5hZ2VyID0gbGF5b3V0TWFuYWdlcjtcclxuICAgICAgICB0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwgPSBjaGFydE1hbmFnZXJEYXRhTW9kZWw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXRDaGFydFZpZXdXaXRoRGF0YU1vZGVsKCl7ICAgIFxyXG4gICAgICAgIGlmKHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBhcmUgYWxyZWFkeSBjaGFydHMgaW4gdGhlIGRhdGFtb2RlbCA9PiBzaG93IGluIGNoYXJ0IHZpZXcgPT4gbmVlZGVkIGZvciBwZXJzaXN0aW5nXHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbC5kYXRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAvL0dldCBwZXJzaXN0ZWQgY2hhcnQgcGFuZXNcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BlcnNpc3RlZFBhbmVzID0gdGhpcy5sYXlvdXRNYW5hZ2VyLmNoYXJ0U3BsaXR0ZXIuZ2V0Q2hhcnRWaWV3U3BsaXR0ZXJQYW5lRGVmaW5pdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbC5kYXRhLmZvckVhY2goY2hhcnQ9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIGNoYXJ0cywgYWRkIHNjYWxlcywgYWRkIHNlcmllc1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkVHJhY2VDaGFydChjaGFydCwtMSwgKGNoYXJ0IGFzIENoYXJ0TWFuYWdlckNoYXJ0KS5jaGFydFR5cGUsIGZhbHNlKTsgLy8gU3VwcHJlc3MgcmVkcmF3aW5nIGFuZCBkbyBpdCBhZnRlciBhbGwgY2hhcnRzIHdoZXJlIGFkZGVkIHRvIGF2b2lkIG11bHRpcGxlIHJlZHJhd3NcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHJlZHJhdyBhbGwgY2hhcnRzIGFmdGVyIGFkZGluZ1xyXG4gICAgICAgICAgICAgICAgLypmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHJhY2VDaGFydExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLnJlZHJhd0NoYXJ0KCk7XHJcbiAgICAgICAgICAgICAgICB9Ki9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkaXNwb3NlKCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50cmFjZUNoYXJ0TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLmRpc3Bvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYWRkVHJhY2VDaGFydChjaGFydDogQ2hhcnRNYW5hZ2VyQ2hhcnQsIGluZGV4OiBudW1iZXIgPSAtMSwgdHlwZTogbnVtYmVyLCBzdXByZXNzUmVkcmF3OiBib29sZWFuID0gZmFsc2UpOiBJVHJhY2VDaGFydHx1bmRlZmluZWQge1xyXG4gICAgICAgIGxldCBuZXdUcmFjZUNoYXJ0OiBJVHJhY2VDaGFydHx1bmRlZmluZWQgPSB0aGlzLmFkZENoYXJ0VG9Db250YWluZXIoY2hhcnQubmFtZSwgaW5kZXgsIHR5cGUsIGNoYXJ0LmNoaWxkcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoc3VwcmVzc1JlZHJhdyA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgIHRoaXMucmVkcmF3Q2hhcnRzKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy51cGRhdGVab29tU2V0dGluZ3MoKTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVYQXhpc1dpZHRoKGNoYXJ0LmNoYXJ0VHlwZSk7XHJcbiAgICAgICAgcmV0dXJuIG5ld1RyYWNlQ2hhcnQ7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgYWRkQ2hhcnRUb0NvbnRhaW5lcihuYW1lOiBzdHJpbmcsIGluZGV4OiBudW1iZXIgPSAtMSwgdHlwZTogQ2hhcnRUeXBlLCBzY2FsZXM6IFNjYWxlW10pOiBJVHJhY2VDaGFydHx1bmRlZmluZWQge1xyXG4gICAgICAgIGxldCB0cmFjZUNoYXJ0OiBJVHJhY2VDaGFydDtcclxuICAgICAgICBsZXQgY2hhcnRIZWlnaHQgPSAzMDA7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hhcnRWaWV3V2lkZ2V0LnZpZXcpIHtcclxuICAgICAgICAgICAgLy8gVE9ETzogSGFuZGxlIHdpdGggc2V0dGluZ3Mgb2JqZWN0IGZhY3RvcnlcclxuICAgICAgICAgICAgaWYgKHR5cGUgPT09IENoYXJ0VHlwZS5ZVENoYXJ0KSB7XHJcbiAgICAgICAgICAgICAgICB0cmFjZUNoYXJ0ID0gbmV3IFlUQ2hhcnQodGhpcy5jaGFydFZpZXdXaWRnZXQudmlldywgbmFtZSwgdHlwZSwgc2NhbGVzKVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IENoYXJ0VHlwZS5YWUNoYXJ0KSB7XHJcbiAgICAgICAgICAgICAgICB0cmFjZUNoYXJ0ID0gbmV3IFhZQ2hhcnQodGhpcy5jaGFydFZpZXdXaWRnZXQudmlldywgbmFtZSwgdHlwZSwgc2NhbGVzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRyYWNlQ2hhcnQgPSBuZXcgRkZUQ2hhcnQodGhpcy5jaGFydFZpZXdXaWRnZXQudmlldywgbmFtZSwgdHlwZSwgc2NhbGVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdHJhY2VDaGFydC5ldmVudFVzZXJDaGFydEludGVyYWN0aW9uLmF0dGFjaCh0aGlzLl91c2VyQ2hhcnRJbnRlcmFjdGlvbkhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0cmFjZUNoYXJ0LmV2ZW50UmVkcmF3QWxsQ2hhcnRzLmF0dGFjaCh0aGlzLl9vblJlZHJhd0FsbENoYXJ0cyk7XHJcbiAgICAgICAgICAgIHRyYWNlQ2hhcnQuZXZlbnRTZXJpZXNBZGRlZC5hdHRhY2godGhpcy5fb25DaGFydFNlcmllc0FkZGVkKVxyXG5cclxuICAgICAgICAgICAgLy9TZXQgdGhlIGhlaWdodCBvZiBwZXJzaXN0ZWQgY2hhcnRzXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9wZXJzaXN0ZWRQYW5lcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFydEhlaWdodCA9IHRoaXMuZ2V0UGVyc2lzdGVkQ2hhcnRIZWlnaHQobmFtZSk7XHJcbiAgICAgICAgICAgICAgICAvL1dvcmthcm91bmQ6IEFkZCAyIHBpeGVscyBpZiBpcyB0aGUgZmlyc3QgY2hhcnQgXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sYXlvdXRNYW5hZ2VyLmNoYXJ0U3BsaXR0ZXIubGF5b3V0UGFuZXMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGFydEhlaWdodCArPSAyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgcGFuZVByb3BlcnRpZXMgPSBuZXcgUGFuZVByb3BlcnRpZXMoKTtcclxuICAgICAgICAgICAgcGFuZVByb3BlcnRpZXMucGFuZVNpemUgPSBjaGFydEhlaWdodDtcclxuICAgICAgICAgICAgcGFuZVByb3BlcnRpZXMubWluU2l6ZSA9IHRoaXMuX2NoYXJ0TWluSGVpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLmxheW91dE1hbmFnZXIuY2hhcnRTcGxpdHRlci5hZGRXaWRnZXQodHJhY2VDaGFydCwgbmFtZSwgVmlld1R5cGUuVXNlciwgcGFuZVByb3BlcnRpZXMpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGluZGV4ICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBzZXQgaW5kZXggYXQgYWRkV2lkZ2V0IE1ldGhvZCB0byBhdm9pZCBtb3ZpbmcgdGhlIGNoYXJ0IGFmdGVyd2FyZHNcclxuICAgICAgICAgICAgICAgIHRoaXMubGF5b3V0TWFuYWdlci5jaGFydFNwbGl0dGVyLm1vdmVXaWRnZXQodHJhY2VDaGFydCwgaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmFjZUNoYXJ0TGlzdC5zcGxpY2UoaW5kZXgsIDAsIHRyYWNlQ2hhcnQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyYWNlQ2hhcnRMaXN0LnB1c2godHJhY2VDaGFydCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRyYWNlQ2hhcnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkOyBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBoZWlnaHQgb2YgcGVyc2lzdGVkIGNoYXJ0c1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjaGFydE5hbWVcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIGdldFBlcnNpc3RlZENoYXJ0SGVpZ2h0KGNoYXJ0TmFtZTogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgY2hhcnRIZWlnaHQgPSB0aGlzLmxheW91dE1hbmFnZXIuZ2V0Q2hhcnRWaWV3U3BsaXR0ZXJIZWlnaHQodGhpcy5fcGVyc2lzdGVkUGFuZXMsIGNoYXJ0TmFtZSk7XHJcbiAgICAgICAgdGhpcy5fcGVyc2lzdGVkUGFuZXMgPSB0aGlzLl9wZXJzaXN0ZWRQYW5lcy5maWx0ZXIoZWxlbWVudCA9PiB7IHJldHVybiBlbGVtZW50LmNvbXBvbmVudERlZmluaXRpb24uaWQgIT0gY2hhcnROYW1lfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBjaGFydEhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1ldGhvZCB0byBzZXQgdGhlIFpvb21TZXR0aW5nKERpcmVjdGlvbiBhbmQgQm94Wm9vbSkgZm9yIGFsbCBDaGFydHMgYWNjb3JkaW5nIHRvIHRoZSBjb3JyZXNwb25kaW5nIHN0YXRlc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlWm9vbVNldHRpbmdzKCkge1xyXG4gICAgICAgIGxldCB0b29sc3RhdGU6IENoYXJ0Vmlld1Rvb2xTdGF0ZSA9IHRoaXMuX3N0YXRlcy5yZWFkKENoYXJ0Vmlld1Rvb2xTdGF0ZSwgXCJDaGFydFZpZXdUb29sU3RhdGVcIik7XHJcbiAgICAgICAgbGV0IHpvb21EaXJlY3Rpb25TdGF0ZTogQ2hhcnRWaWV3Wm9vbURpcmVjdGlvblN0YXRlID0gdGhpcy5fc3RhdGVzLnJlYWQoQ2hhcnRWaWV3Wm9vbURpcmVjdGlvblN0YXRlLCBcIkNoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZVwiKTtcclxuXHJcbiAgICAgICAgaWYgKHRvb2xzdGF0ZS5zZWxlY3RlZFRvb2wgPT0gQ2hhcnRWaWV3VG9vbFN0YXRlRW51bS5CT1haT09NKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Qm94Wm9vbSh0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRQYW5uaW5nKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodG9vbHN0YXRlLnNlbGVjdGVkVG9vbCA9PSBDaGFydFZpZXdUb29sU3RhdGVFbnVtLlBBTk5JTkcpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRCb3hab29tKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRQYW5uaW5nKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Qm94Wm9vbShmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0UGFubmluZyhmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNldENoYXJ0Wm9vbUF4ZXMoem9vbURpcmVjdGlvblN0YXRlLnpvb21EaXJlY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZVRyYWNlQ2hhcnQoY2hhcnQ6IElUcmFjZUNoYXJ0KSB7XHJcbiAgICAgICAgY2hhcnQuZXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbi5kZXRhY2godGhpcy5fdXNlckNoYXJ0SW50ZXJhY3Rpb25IYW5kbGVyKTtcclxuICAgICAgICBjaGFydC5ldmVudFJlZHJhd0FsbENoYXJ0cy5kZXRhY2godGhpcy5fb25SZWRyYXdBbGxDaGFydHMpO1xyXG4gICAgICAgIGNoYXJ0LmV2ZW50U2VyaWVzQWRkZWQuZGV0YWNoKHRoaXMuX29uQ2hhcnRTZXJpZXNBZGRlZCk7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVDaGFydEZyb21DaGFydExpc3QoY2hhcnQpO1xyXG4gICAgICAgIGNoYXJ0LmRpc3Bvc2UoKTtcclxuICAgICAgICB0aGlzLmxheW91dE1hbmFnZXIuY2hhcnRTcGxpdHRlci5yZW1vdmVXaWRnZXQoY2hhcnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVtb3ZlQ2hhcnRGcm9tQ2hhcnRMaXN0KGNoYXJ0OiBJVHJhY2VDaGFydCkge1xyXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuZ2V0Q2hhcnRJbmRleChjaGFydCk7XHJcblxyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMudHJhY2VDaGFydExpc3Quc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZVRyYWNlQ2hhcnQoY2hhcnQ6IENoYXJ0TWFuYWdlckNoYXJ0LCB0YXJnZXRDaGFydDogQ2hhcnRNYW5hZ2VyQ2hhcnQsIGFyZ3MpIHtcclxuXHJcbiAgICAgICAgbGV0IHRyYWNlQ2hhcnQgPSB0aGlzLmdldENoYXJ0T2JqZWN0QnlOYW1lKGNoYXJ0Lm5hbWUpO1xyXG4gICAgICAgIGxldCB0YXJnZXRUcmFjZUNoYXJ0ID0gdGhpcy5nZXRDaGFydE9iamVjdEJ5TmFtZSh0YXJnZXRDaGFydC5uYW1lKTtcclxuXHJcbiAgICAgICAgaWYgKHRyYWNlQ2hhcnQgIT0gdW5kZWZpbmVkICYmIHRhcmdldFRyYWNlQ2hhcnQgIT0gdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgY2hhcnRJbmRleCA9IHRoaXMuZ2V0Q2hhcnRJbmRleCh0cmFjZUNoYXJ0KTtcclxuICAgICAgICAgICAgbGV0IHRhcmdldEluZGV4ID0gdGhpcy5nZXRDaGFydEluZGV4KHRhcmdldFRyYWNlQ2hhcnQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGFyZ3MuaW5zZXJ0VHlwZSA9PSBcImluc2VydEJlbG93XCIpIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldEluZGV4ICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjaGFydEluZGV4ID4gLTEgJiYgdGFyZ2V0SW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmFjZUNoYXJ0TGlzdC5zcGxpY2UoY2hhcnRJbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hhcnRJbmRleCA8IHRhcmdldEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFjZUNoYXJ0TGlzdC5zcGxpY2UodGFyZ2V0SW5kZXggLSAxLCAwLCB0cmFjZUNoYXJ0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJhY2VDaGFydExpc3Quc3BsaWNlKHRhcmdldEluZGV4LCAwLCB0cmFjZUNoYXJ0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubGF5b3V0TWFuYWdlci5jaGFydFNwbGl0dGVyLm1vdmVXaWRnZXQodHJhY2VDaGFydCwgdGFyZ2V0SW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnJlZHJhd0NoYXJ0cyhmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlWEF4aXNXaWR0aChjaGFydC5jaGFydFR5cGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbW92ZUFsbENoYXJ0cygpIHtcclxuICAgICAgICB3aGlsZSAodGhpcy50cmFjZUNoYXJ0TGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlVHJhY2VDaGFydCh0aGlzLnRyYWNlQ2hhcnRMaXN0WzBdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRDaGFydEluZGV4KGNoYXJ0OiBJVHJhY2VDaGFydCk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gLTFcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHJhY2VDaGFydExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHJhY2VDaGFydExpc3RbaV0gPT0gY2hhcnQpIHtcclxuICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VHJhY2VDaGFydEJ5Q29udGFpbmVySWQoY29udGFpbmVySUQ6IHN0cmluZyk6IElUcmFjZUNoYXJ0IHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHJhY2VDaGFydExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGRpdklkID0gdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5tYWluRGl2SWQ7XHJcbiAgICAgICAgICAgIGlmIChkaXZJZCA9PSBjb250YWluZXJJRC5zdWJzdHIoMCwgZGl2SWQubGVuZ3RoKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhY2VDaGFydExpc3RbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VHJhY2VDaGFydEJ5TmFtZShjaGFydE5hbWU6IHN0cmluZyk6IElUcmFjZUNoYXJ0IHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHJhY2VDaGFydExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHJhY2VDaGFydExpc3RbaV0ud2lkZ2V0TmFtZSA9PSBjaGFydE5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2hhcnRNYW5hZ2VyTW9kZWxDaGFuZ2VkKGRhdGFNb2RlbDogSUNoYXJ0TWFuYWdlckRhdGFNb2RlbCwgYXJnczogRXZlbnRNb2RlbENoYW5nZWRBcmdzKSB7XHJcbiAgICAgICAgdGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsID0gZGF0YU1vZGVsOyAgICAgIFxyXG4gICAgICAgIHN3aXRjaCAoYXJncy5oaW50KSB7XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQuYWRkU2VyaWU6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkU2VyaWVzVG9DaGFydChhcmdzLmRhdGEuc2VyaWVzLCBhcmdzLmRhdGEuY2hhcnQsIGFyZ3MuZGF0YS5heGlzLCBhcmdzLmRhdGEua2VlcFNjYWxlcyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50Lm1vdmVTZXJpZToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlU2VyaWUoYXJncy5kYXRhLnNlcmllLCBhcmdzLmRhdGEuY2hhcnQubmFtZSwgYXJncy5kYXRhLnRhcmdldENoYXJ0Lm5hbWUsIGFyZ3MuZGF0YS50YXJnZXRBeGlzKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQucmVtb3ZlU2VyaWU6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlU2VyaWUoYXJncy5kYXRhLnNlcmllLCBhcmdzLmRhdGEuY2hhcnQubmFtZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LnJlbW92ZUNoYXJ0OiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUNoYXJ0KGFyZ3MuZGF0YS5jaGFydCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LmFkZENoYXJ0OiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFRyYWNlQ2hhcnQoYXJncy5kYXRhLmNoYXJ0LCBhcmdzLmRhdGEuaW5kZXgsIGFyZ3MuZGF0YS50eXBlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQubW92ZUNoYXJ0OiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVUcmFjZUNoYXJ0KGFyZ3MuZGF0YS5jaGFydCwgYXJncy5kYXRhLnRhcmdldCwgYXJncy5kYXRhKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQuYWRkWVNjYWxlOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFlTY2FsZShhcmdzLmRhdGEueUF4aXMsIGFyZ3MuZGF0YS5jaGFydC5uYW1lKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQucmVtb3ZlWVNjYWxlOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVlBeGlzKGFyZ3MuZGF0YS55QXhpcywgYXJncy5kYXRhLmNoYXJ0KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQudXBkYXRlU2NhbGVSYW5nZToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zeW5jaHJvbml6ZVNjYWxlWFJhbmdlKGFyZ3MuZGF0YS5zY2FsZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHByaXZhdGUgYWRkU2VyaWVzVG9DaGFydChzZXJpZXM6IEFycmF5PEJhc2VTZXJpZXM+LCBjaGFydDogSUNoYXJ0TWFuYWdlckNoYXJ0LCBzY2FsZTogU2NhbGUsIGtlZXBTY2FsZXM6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlcmllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBzZXJpZXNbaV0uZXZlbnREYXRhQ2hhbmdlZC5hdHRhY2godGhpcy5fb25TZXJpZURhdGFDaGFuZ2VkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNoYXJ0TmFtZSA9IGNoYXJ0Lm5hbWU7XHJcblxyXG4gICAgICAgIGxldCByZXNldFhSYW5nZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCByZXNldFlSYW5nZSA9IGZhbHNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKCFrZWVwU2NhbGVzKXtcclxuICAgICAgICAgICAgcmVzZXRYUmFuZ2U9IHRoaXMuaXNGaXJzdFNlcmllc09mVHlwZUluQ2hhcnRzKHNlcmllc1swXSlcclxuICAgICAgICAgICAgcmVzZXRZUmFuZ2UgPSB0aGlzLmlzRmlyc3RTZXJpZXNPblNjYWxlKHNlcmllc1swXSwgc2NhbGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBsZXQgY2hhcnRPYmogPSB0aGlzLmdldENoYXJ0T2JqZWN0QnlOYW1lKGNoYXJ0TmFtZSk7XHJcbiAgICAgICAgICAgIGlmKGNoYXJ0T2JqICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBPbmx5IHdvcmtzIGZvciBZVCBidXQgbm90IGZvciBGRlRcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgc2NhbGUoWSlcclxuICAgICAgICAgICAgICAgIGNoYXJ0T2JqLnNldFNjYWxlUmFuZ2Uoc2NhbGUsIHNjYWxlLm1pblhWYWx1ZSwgc2NhbGUubWF4WFZhbHVlLCBzY2FsZS5taW5ZVmFsdWUsIHNjYWxlLm1heFlWYWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHNjYWxlKFgpXHJcbiAgICAgICAgICAgICAgICBjaGFydE9iai5zZXRSYW5nZVgoc2NhbGUubWluWFZhbHVlLCBzY2FsZS5tYXhYVmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFkZFNlcmllcyhzZXJpZXMsIGNoYXJ0TmFtZSwgc2NhbGUsIHJlc2V0WVJhbmdlLCByZXNldFhSYW5nZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHJlc2V0WFJhbmdlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXRYUmFuZ2Uoc2VyaWVzWzBdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKkNoZWNrcyBpZiBhIGdpdmVuIFNlcmllcyBpcyB0aGUgZmlyc3QgU2VyaWVzIG9uIGEgcGFydGljdWxhciBzY2FsZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEJhc2VTZXJpZXM+fSBzZXJpZXNcclxuICAgICAqIEBwYXJhbSB7U2NhbGV9IHNjYWxlXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdDaGFydE1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpc0ZpcnN0U2VyaWVzT25TY2FsZShzZXJpZXM6IEJhc2VTZXJpZXMsIHNjYWxlOiBTY2FsZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIC8vb25seSByZXNldCB0aGUgY2hhcnRyYW5nZSBvbiB0aGUgeSBheGlzIGlmIHRoZXNlIGFyZSB0aGUgZmlyc3Qgc2VyaWVzIGluIHRoZSBzY2FsZVxyXG4gICAgICAgIGlmIChzY2FsZS5jaGlsZHMubGVuZ3RoIDwgMSB8fCBzZXJpZXMgIT0gc2NhbGUuY2hpbGRzWzBdKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKkNoZWNrcyBpZiBhIGdpdmVuIFNlcmllcyBpcyB0aGUgZmlyc3Qgb2YgaXRzIHR5cGUgaW4gYWxsIGNoYXJ0c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllc1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdDaGFydE1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpc0ZpcnN0U2VyaWVzT2ZUeXBlSW5DaGFydHMoc2VyaWVzOiBCYXNlU2VyaWVzKSB7XHJcbiAgICAgICAgbGV0IGNoYXJ0cyA9IHRoaXMuZ2V0Q2hhcnRzRm9yU2VyaWUoc2VyaWVzKTtcclxuXHJcbiAgICAgICAgZm9yKCBsZXQgY2hhcnQgb2YgY2hhcnRzKXtcclxuICAgICAgICAgICAgaWYoY2hhcnQuc2VyaWVzLmxlbmd0aCAhPSAwKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldENoYXJ0c0ZvclNlcmllKHNlcmllczogQmFzZVNlcmllcyk6IElUcmFjZUNoYXJ0W10ge1xyXG4gICAgICAgIGxldCBjaGFydHMgPSBBcnJheTxJVHJhY2VDaGFydD4oKTtcclxuICAgICAgICBpZiAoc2VyaWVzLnR5cGUgPT0gU2VyaWVzVHlwZS5mZnRTZXJpZXMpIHtcclxuXHJcbiAgICAgICAgICAgIGNoYXJ0cyA9IG5ldyBDaGFydFJhbmdlSGVscGVyKCkuZ2V0RkZUQ2hhcnRzKHRoaXMudHJhY2VDaGFydExpc3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChzZXJpZXMudHlwZSA9PSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMpIHtcclxuICAgICAgICAgICAgY2hhcnRzID0gbmV3IENoYXJ0UmFuZ2VIZWxwZXIoKS5nZXRZVENoYXJ0cyh0aGlzLnRyYWNlQ2hhcnRMaXN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNoYXJ0cztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uU2VyaWVEYXRhQ2hhbmdlZChzZW5kZXIsIGV2ZW50QXJnczogRXZlbnRTZXJpZURhdGFDaGFuZ2VkQXJncykge1xyXG4gICAgICAgIGlmIChldmVudEFyZ3MuYWN0aW9uID09IFNlcmllQWN0aW9uLmRhdGFQb2ludHNDaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2VyaWVEYXRhKHNlbmRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGV2ZW50QXJncy5hY3Rpb24gPT0gU2VyaWVBY3Rpb24uY29sb3JDaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2VyaWVDb2xvcihzZW5kZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICBVcGRhdGVzIHRoZSBzZXJpZSBkYXRhcG9pbnRzIGluIGFsbCBjaGFydHMgd2hlcmUgdGhlIHNlcmllIGlzIGRpc3BsYXllZFxyXG4gICAgICogIElmIGRhdGFwb2ludHMgbm90IHZhbGlkLCB0aGUgc2VyaWUgd2lsbCBiZSByZW1vdmVkIGZyb20gdGhlIGNoYXJ0cyBvdGhlcndpc2UgYWRkZWQgaWYgbm90IGFscmVhZHkgaW4gdGhlIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlU2VyaWVEYXRhKHNlcmllczogQmFzZVNlcmllcykge1xyXG4gICAgICAgIGlmIChzZXJpZXMucmF3UG9pbnRzVmFsaWQgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgLy8gTm8gdmFsaWQgc2VyaWUgZGF0YSA9PiByZW1vdmUgZnJvbSBhbGwgY2hhcnRzXHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlU2VyaWVGcm9tQWxsQ2hhcnRzKHNlcmllcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBhZGQgc2VyaWUgdG8gY2hhcnQgaWYgbm90IGFscmVhZHkgaW4gaXQgb3RoZXJ3aXNlIHVwZGF0ZSBjaGFydFxyXG4gICAgICAgICAgICBpZiAodGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoYXJ0cyA9IHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbC5nZXRDaGFydHNVc2luZ1NlcmllKFtzZXJpZXNdKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2VyaWVJbkFsbENoYXJ0cyhjaGFydHMsIHNlcmllcylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZVNlcmllSW5BbGxDaGFydHMoY2hhcnRzOiBJQ2hhcnRNYW5hZ2VyQ2hhcnRbXSwgc2VyaWVzOiBCYXNlU2VyaWVzKSB7XHJcbiAgICAgICAgbGV0IHNlcmllQ2hhcnRUeXBlID0gU2VyaWVDaGFydFR5cGVIZWxwZXIuZ2V0U2VyaWVDaGFydFR5cGUoc2VyaWVzLnR5cGUpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJ0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY2hhcnQgPSB0aGlzLmdldENoYXJ0T2JqZWN0QnlOYW1lKGNoYXJ0c1tpXS5uYW1lKTtcclxuICAgICAgICAgICAgaWYgKGNoYXJ0ICE9IHVuZGVmaW5lZCAmJiBzZXJpZUNoYXJ0VHlwZSA9PSBjaGFydC50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNTZXJpZUluQ2hhcnQoY2hhcnQsIHNlcmllcykpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgc2VyaWVzIFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzY2FsZSA9IGNoYXJ0c1tpXS5nZXRZQXhpc0ZvclNlcmllKHNlcmllcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjYWxlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXNGaXJzdFNlcmllc0luQ2hhcnQgPSB0aGlzLmlzRmlyc3RTZXJpZXNPZlR5cGVJbkNoYXJ0cyhzZXJpZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFNlcmllcyhbc2VyaWVzXSwgY2hhcnRzW2ldLm5hbWUsIHNjYWxlLCB0aGlzLmlzRmlyc3RTZXJpZXNPblNjYWxlKHNlcmllcywgc2NhbGUpLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0ZpcnN0U2VyaWVzSW5DaGFydCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldFhSYW5nZShzZXJpZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiU2NhbGUgbm90IGZvdW5kIGZvciBzZXJpZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjaGFydC5zZXRBdmFpbGFibGVTZXJpZXNBc0RhdGFTb3VyY2UoKTtcclxuICAgICAgICAgICAgICAgIGNoYXJ0LnJlZHJhd0NoYXJ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZXNldFhSYW5nZShzZXJpZXM6IEJhc2VTZXJpZXMpe1xyXG4gICAgICAgIGxldCBjaGFydFJhbmdlSGVscGVyIDogQ2hhcnRSYW5nZUhlbHBlciA9IG5ldyBDaGFydFJhbmdlSGVscGVyKCk7XHJcbiAgICAgICAgaWYgKHNlcmllcy50eXBlID09IFNlcmllc1R5cGUudGltZVNlcmllcykge1xyXG4gICAgICAgICAgICBjaGFydFJhbmdlSGVscGVyLnJlc2V0WFJhbmdlc1lUKHRoaXMudHJhY2VDaGFydExpc3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChzZXJpZXMudHlwZSA9PSBTZXJpZXNUeXBlLmZmdFNlcmllcykge1xyXG4gICAgICAgICAgICBjaGFydFJhbmdlSGVscGVyLnJlc2V0WFJhbmdlc0ZGVCh0aGlzLnRyYWNlQ2hhcnRMaXN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZWRyYXdDaGFydHModHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBjb2xvciBvZiB0aGUgc2VyaWUgaW4gYWxsIGNoYXJ0cyB3aGVyZSB0aGUgc2VyaWUgaXMgZGlzcGxheWVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdDaGFydE1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVTZXJpZUNvbG9yKHNlcmllOiBCYXNlU2VyaWVzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgbGV0IHNlcmllcyA9IG5ldyBBcnJheTxCYXNlU2VyaWVzPigpO1xyXG4gICAgICAgICAgICBzZXJpZXMucHVzaChzZXJpZSk7XHJcbiAgICAgICAgICAgIGxldCBjaGFydHMgPSB0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwuZ2V0Q2hhcnRzVXNpbmdTZXJpZShzZXJpZXMpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJ0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoYXJ0ID0gdGhpcy5nZXRDaGFydE9iamVjdEJ5TmFtZShjaGFydHNbaV0ubmFtZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hhcnQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVXBkYXRlIHNlcmllcyBjb2xvciBpbiB0aGUgY2hhcnRcclxuICAgICAgICAgICAgICAgICAgICBjaGFydC5zZXRBdmFpbGFibGVTZXJpZXNBc0RhdGFTb3VyY2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGFkZCBzZXJpZSB0byBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8QmFzZVNlcmllcz59IHNlcmllc1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNoYXJ0TmFtZVxyXG4gICAgICogQHBhcmFtIHtTY2FsZX0gc2NhbGVcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gdXBkYXRlUmFuZ2VZXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIGFkZFNlcmllcyhzZXJpZXM6IEFycmF5PEJhc2VTZXJpZXM+LCBjaGFydE5hbWU6IHN0cmluZywgc2NhbGU6IFNjYWxlLCB1cGRhdGVSYW5nZVk6IGJvb2xlYW4sIHVwZGF0ZVJhbmdlWDogYm9vbGVhbikge1xyXG4gICAgICAgIGxldCBjaGFydCA9IHRoaXMuZ2V0Q2hhcnRPYmplY3RCeU5hbWUoY2hhcnROYW1lKTtcclxuICAgICAgICBpZiAoY2hhcnQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGxldCBheGlzTWluOiBudW1iZXIgfCB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGxldCBheGlzTWF4OiBudW1iZXIgfCB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgYXhpcyA9IChjaGFydCBhcyBDaGFydEJhc2UpLmNoYXJ0LmdldEF4aXMoc2NhbGUuaWQpO1xyXG4gICAgICAgICAgICBpZihheGlzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXhpc1JhbmdlID0gYXhpcy5nZXRBeGlzUmFuZ2UoKTtcclxuICAgICAgICAgICAgICAgIGlmIChheGlzUmFuZ2UgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXhpc01pbiA9IGF4aXNSYW5nZS5taW47XHJcbiAgICAgICAgICAgICAgICAgICAgYXhpc01heCA9IGF4aXNSYW5nZS5tYXhcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlNjYWxlIG5vdCBhdmFpbGFibGUhIFwiICsgc2NhbGUuaWQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjaGFydC5hZGRTZXJpZXNUb0NoYXJ0KHNlcmllcywgc2NhbGUsIHVwZGF0ZVJhbmdlWCk7XHJcbiAgICAgICAgICAgIGNoYXJ0LnNldEF2YWlsYWJsZVNlcmllc0FzRGF0YVNvdXJjZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGF4aXNNaW4gIT0gdW5kZWZpbmVkICYmIGF4aXNNYXggIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFydC5zZXRTY2FsZVJhbmdlKHNjYWxlLCBzY2FsZS5taW5YVmFsdWUsIHNjYWxlLm1heFhWYWx1ZSwgYXhpc01pbiwgYXhpc01heCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHVwZGF0ZVJhbmdlWSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGF4aXNNaW5WYWx1ZSA9IGNoYXJ0LmdldFNlcmllc01pbllGb3JTY2FsZShzY2FsZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXhpc01heFZhbHVlID0gY2hhcnQuZ2V0U2VyaWVzTWF4WUZvclNjYWxlKHNjYWxlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYXhpc01pblZhbHVlICE9IHVuZGVmaW5lZCAmJiBheGlzTWF4VmFsdWUgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhcnQudXBkYXRlUmFuZ2VZKHNjYWxlLCBheGlzTWluVmFsdWUsIGF4aXNNYXhWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2hhcnQucmVkcmF3Q2hhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYWRkWVNjYWxlKHlTY2FsZTogU2NhbGUsIGNoYXJ0TmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGNoYXJ0ID0gdGhpcy5nZXRDaGFydE9iamVjdEJ5TmFtZShjaGFydE5hbWUpO1xyXG4gICAgICAgIGlmKGNoYXJ0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGNoYXJ0IS5hZGRZU2NhbGUoeVNjYWxlLCBBeGlzUG9zaXRpb24ucmlnaHQpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVhBeGlzV2lkdGgoY2hhcnQhLnR5cGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG1vdmUgb25lIHNlcmllIGZyb20gb25lIGNoYXJ0IHRvIGFub3RoZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY2hhcnROYW1lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGFyZ2V0Q2hhcnROYW1lXHJcbiAgICAgKiBAcGFyYW0ge1NjYWxlfSB0YXJnZXRTY2FsZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld0NoYXJ0TWFuYWdlclxyXG4gICAgICovXHJcbiAgICBtb3ZlU2VyaWUoc2VyaWU6IEJhc2VTZXJpZXMsIGNoYXJ0TmFtZTogc3RyaW5nLCB0YXJnZXRDaGFydE5hbWU6IHN0cmluZywgdGFyZ2V0U2NhbGU6IFNjYWxlKSB7XHJcbiAgICAgICAgaWYgKHNlcmllLnJhd1BvaW50c1ZhbGlkID09IHRydWUpIHtcclxuICAgICAgICAgICAgbGV0IGNoYXJ0ID0gdGhpcy5nZXRDaGFydE9iamVjdEJ5TmFtZShjaGFydE5hbWUpO1xyXG4gICAgICAgICAgICBsZXQgdGFyZ2V0ID0gdGhpcy5nZXRDaGFydE9iamVjdEJ5TmFtZSh0YXJnZXRDaGFydE5hbWUpO1xyXG4gICAgICAgICAgICBsZXQgc2VyaWVzID0gbmV3IEFycmF5PEJhc2VTZXJpZXM+KCk7XHJcbiAgICAgICAgICAgIHNlcmllcy5wdXNoKHNlcmllKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjaGFydCAhPSB1bmRlZmluZWQgJiYgdGFyZ2V0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgY2hhcnQucmVtb3ZlU2VyaWVGcm9tQ2hhcnQoc2VyaWUsIHRoaXMuaXNMYXN0U2VyaWVXaXRoQ3Vyc29yVHlwZShjaGFydCkpO1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0LmFkZFNlcmllc1RvQ2hhcnQoc2VyaWVzLCB0YXJnZXRTY2FsZSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY2hhcnQuc2V0QXZhaWxhYmxlU2VyaWVzQXNEYXRhU291cmNlKCk7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuc2V0QXZhaWxhYmxlU2VyaWVzQXNEYXRhU291cmNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlWEF4aXNXaWR0aChjaGFydCEudHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVtb3ZlIG9uZSBzZXJpZSBmcm9tIGdpdmVuIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNoYXJ0TmFtZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld0NoYXJ0TWFuYWdlclxyXG4gICAgICovXHJcbiAgICByZW1vdmVTZXJpZShzZXJpZTogQmFzZVNlcmllcywgY2hhcnROYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgY2hhcnQgPSB0aGlzLmdldENoYXJ0T2JqZWN0QnlOYW1lKGNoYXJ0TmFtZSk7XHJcbiAgICAgICAgaWYgKGNoYXJ0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjaGFydC5yZW1vdmVTZXJpZUZyb21DaGFydChzZXJpZSwgdGhpcy5pc0xhc3RTZXJpZVdpdGhDdXJzb3JUeXBlKGNoYXJ0KSk7XHJcbiAgICAgICAgICAgIGNoYXJ0LnNldEF2YWlsYWJsZVNlcmllc0FzRGF0YVNvdXJjZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGNoYXJ0c1dpdGhTZXJpZSA9IHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbC5nZXRDaGFydHNVc2luZ1NlcmllKFtzZXJpZV0pO1xyXG4gICAgICAgIGlmIChjaGFydHNXaXRoU2VyaWUubGVuZ3RoID09IDApIHsgLy8gU2VyaWUgbm90IHVzZWQgaW4gYW4gb3RoZXIgY2hhcnQgPT4gZGV0YWNoIHNlcmllIGV2ZW50c1xyXG4gICAgICAgICAgICBzZXJpZS5ldmVudERhdGFDaGFuZ2VkLmRldGFjaCh0aGlzLl9vblNlcmllRGF0YUNoYW5nZWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVZQXhpcyh5U2NhbGU6IFNjYWxlLCBjaGFydDogQ2hhcnRNYW5hZ2VyQ2hhcnQpIHtcclxuICAgICAgICBsZXQgdHJhY2VDaGFydCA9IHRoaXMuZ2V0Q2hhcnRPYmplY3RCeU5hbWUoY2hhcnQubmFtZSk7XHJcbiAgICAgICAgaWYgKHRyYWNlQ2hhcnQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRyYWNlQ2hhcnQucmVtb3ZlWVNjYWxlRnJvbUNoYXJ0KHlTY2FsZSk7XHJcbiAgICAgICAgICAgIHRyYWNlQ2hhcnQuc2V0QXZhaWxhYmxlU2VyaWVzQXNEYXRhU291cmNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVhBeGlzV2lkdGgoY2hhcnQuY2hhcnRUeXBlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlbW92ZSBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjaGFydE5hbWVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdDaGFydE1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlQ2hhcnQoY2hhcnQ6IENoYXJ0TWFuYWdlckNoYXJ0KSB7XHJcbiAgICAgICAgbGV0IHRyYWNlQ2hhcnQgPSB0aGlzLmdldENoYXJ0T2JqZWN0QnlOYW1lKGNoYXJ0Lm5hbWUpO1xyXG4gICAgICAgIGlmICh0cmFjZUNoYXJ0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVRyYWNlQ2hhcnQodHJhY2VDaGFydCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgbWluWDogbnVtYmVyIHwgdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBsZXQgbWF4WDogbnVtYmVyIHwgdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmFjZUNoYXJ0LnNlcmllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1pblggPT0gdW5kZWZpbmVkIHx8IG1pblggPiB0cmFjZUNoYXJ0LnNlcmllc1tpXS5taW5YISkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1pblggPSB0cmFjZUNoYXJ0LnNlcmllc1tpXS5taW5YO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG1heFggPT0gdW5kZWZpbmVkIHx8IG1heFggPCB0cmFjZUNoYXJ0LnNlcmllc1tpXS5tYXhYISkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1heFggPSB0cmFjZUNoYXJ0LnNlcmllc1tpXS5tYXhYO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVhBeGlzV2lkdGgoY2hhcnQuY2hhcnRUeXBlKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQYW5uaW5nQXhlcyhheGVzOiBJQ2hhcnRBeGlzW10pIHtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBwYW5uaW5nQXhpcyA9IG5ldyBBcnJheTxJQ2hhcnRBeGlzPigpO1xyXG4gICAgICAgICAgICBpZiAoYXhlc1swXSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5zY2FsZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYXhpcyA9IHRoaXMudHJhY2VDaGFydExpc3RbaV0uY2hhcnQuZ2V0QXhpcyh0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLnNjYWxlc1tqXS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF4aXMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhbm5pbmdBeGlzLnB1c2goYXhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBheGlzID0gdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5jaGFydC5nZXRBeGlzKHRoaXMudHJhY2VDaGFydExpc3RbaV0ucHJpbWFyeVhBeGlzTmFtZSlcclxuICAgICAgICAgICAgICAgIGlmIChheGlzICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhbm5pbmdBeGlzLnB1c2goYXhpcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwYW5uaW5nQXhpcyA9IGF4ZXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMudHJhY2VDaGFydExpc3RbaV0uY2hhcnQuc2V0UGFubmluZ0F4ZXMocGFubmluZ0F4aXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzeW5jaHJvbml6ZVNjYWxlWFJhbmdlKHNjYWxlOiBTY2FsZSkge1xyXG4gICAgICAgIGxldCBjaGFydFR5cGUgPSBzY2FsZS5wYXJlbnQuY2hhcnRUeXBlO1xyXG4gICAgICAgIGxldCBtaW4gPSBzY2FsZS5taW5YVmFsdWU7XHJcbiAgICAgICAgbGV0IG1heCA9IHNjYWxlLm1heFhWYWx1ZTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLnR5cGUgPT0gY2hhcnRUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLm9uU3luY2hyb25pemVTY2FsZVJhbmdlKHNjYWxlLCBtaW4sIG1heCk7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMudHJhY2VDaGFydExpc3RbaV0ucmVkcmF3Q2hhcnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRab29tQXhlc0luQ2hhcnQoY2hhcnQ6IElUcmFjZUNoYXJ0LCB6b29tRGlyZWN0aW9uOiBab29tRGlyZWN0aW9uKTogQXJyYXk8SUNoYXJ0QXhpcz4ge1xyXG4gICAgICAgIGxldCBheGVzID0gbmV3IEFycmF5PElDaGFydEF4aXM+KCk7XHJcblxyXG4gICAgICAgIGlmICh6b29tRGlyZWN0aW9uID09IFpvb21EaXJlY3Rpb24uWFkgfHwgem9vbURpcmVjdGlvbiA9PSBab29tRGlyZWN0aW9uLlgpIHtcclxuICAgICAgICAgICAgbGV0IGF4aXMgPSBjaGFydC5jaGFydC5nZXRBeGlzKGNoYXJ0LnByaW1hcnlYQXhpc05hbWUpO1xyXG4gICAgICAgICAgICBpZiAoYXhpcyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGF4ZXMucHVzaChheGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHpvb21EaXJlY3Rpb24gPT0gWm9vbURpcmVjdGlvbi5YWSB8fCB6b29tRGlyZWN0aW9uID09IFpvb21EaXJlY3Rpb24uWSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJ0LnNjYWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGF4aXMgPSBjaGFydC5jaGFydC5nZXRBeGlzKGNoYXJ0LnNjYWxlc1tpXS5pZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXhpcyAhPSB1bmRlZmluZWQgJiYgYXhpcy5nZXRBeGlzT3JpZW50YXRpb24oKSA9PSBBeGlzT3JpZW50YXRpb24udmVydGljYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBheGVzLnB1c2goYXhpcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGF4ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlcmUgYXJlIG5vIG1vcmUgc2VyaWVzIGluIGFsbCBvdGhlciBjaGFydHMgd2l0aCB0aGUgc2FtZSBjdXJzb3IgdHlwZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lUcmFjZUNoYXJ0fSBjaGFydFxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaXNMYXN0U2VyaWVXaXRoQ3Vyc29yVHlwZShjaGFydDogSVRyYWNlQ2hhcnQpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgY3Vyc29yVHlwZSA9IGNoYXJ0LmdldFNlcmllQ3Vyc29yVHlwZSgpO1xyXG4gICAgICAgIGlmIChjaGFydC5zZXJpZXMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50cmFjZUNoYXJ0TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5nZXRTZXJpZUN1cnNvclR5cGUoKSA9PT0gY3Vyc29yVHlwZSAmJiB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldICE9PSBjaGFydCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmluZHMgSVRyYWNlQ2hhcnRPYmplY3QgYnkgZ2l2ZSBuYW1lIGFuZCByZXR1cm4gb2JqZWN0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKiBAcmV0dXJucyB7KElUcmFjZUNoYXJ0IHwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdDaGFydE1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRDaGFydE9iamVjdEJ5TmFtZShuYW1lOiBzdHJpbmcpOiBJVHJhY2VDaGFydCB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLndpZGdldE5hbWUgPT0gbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhY2VDaGFydExpc3RbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzU2VyaWVJbkNoYXJ0KGNoYXJ0LCBzZXJpZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhcnQuc2VyaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFydC5zZXJpZXNbaV0uaWQgPT09IHNlcmllLmlkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLypwcml2YXRlIGdldFByZXZpb3VzQ2hhcnRPYmplY3RCeU5hbWUobmFtZSA6c3RyaW5nKSA6IElUcmFjZUNoYXJ0IHwgdW5kZWZpbmVke1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYodGhpcy50cmFjZUNoYXJ0TGlzdFtpXS53aWRnZXROYW1lID09IG5hbWUpe1xyXG4gICAgICAgICAgICAgICByZXR1cm4gdGhpcy50cmFjZUNoYXJ0TGlzdFtpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfSovXHJcblxyXG4gICAgcHJpdmF0ZSByZW1vdmVTZXJpZUZyb21BbGxDaGFydHMoc2VyaWU6IEJhc2VTZXJpZXMpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHJhY2VDaGFydExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5zZXJpZXMubWFwKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4LmlkOyB9KS5pbmRleE9mKHNlcmllLmlkKTtcclxuICAgICAgICAgICAgLy9jb25zdCBpbmRleCA9IHRoaXMudHJhY2VDaGFydExpc3RbaV0uc2VyaWVzLmluZGV4T2Yoc2VyaWUsIDApO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5yZW1vdmVTZXJpZUZyb21DaGFydCh0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLnNlcmllc1tpbmRleF0sIHRoaXMuaXNMYXN0U2VyaWVXaXRoQ3Vyc29yVHlwZSh0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tSZWZlcmVuY2VDdXJzb3JzSG92ZXJpbmcobW91c2VQb2ludDogSVBvaW50LCB0cmFjZUNoYXJ0OiBJVHJhY2VDaGFydCk6IHZvaWR7XHJcbiAgICAgICAgdHJhY2VDaGFydC5jaGVja0N1cnNvcnNIb3ZlcmluZyhtb3VzZVBvaW50KTtcclxuICAgIH1cclxuXHJcbiAgICBkcmFnQ3Vyc29yQWxvbmdMaW5lKHRyYWNlQ2hhcnQ6IElUcmFjZUNoYXJ0LCBtb3ZlbWVudFg6IG51bWJlciwgbW92ZW1lbnRZOiBudW1iZXIpOiB2b2lke1xyXG4gICAgICAgIHRyYWNlQ2hhcnQuZHJhZ0N1cnNvckFsb25nTGluZShtb3ZlbWVudFgsIG1vdmVtZW50WSwgdGhpcy5faG92ZXJlZFNlcmllcyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q3Vyc29yT25Qb2ludGVyUG9zaXRpb24odHJhY2VDaGFydCA6IElUcmFjZUNoYXJ0LCBtb3VzZVBvaW50OiBJUG9pbnQpe1xyXG4gICAgICAgIHRyYWNlQ2hhcnQuc2V0Q3Vyc29yT25Qb2ludGVyUG9zaXRpb24obW91c2VQb2ludCk7XHJcbiAgICB9XHJcblxyXG4gICAgZG9QYW5uaW5nKHRyYWNlQ2hhcnQ6IElUcmFjZUNoYXJ0LCBtb3VzZVBvaW50WDogbnVtYmVyLCBtb3VzZVBvaW50WTogbnVtYmVyKTogdm9pZHtcclxuICAgICAgICB0cmFjZUNoYXJ0LmRvUGFubmluZyhtb3VzZVBvaW50WCwgbW91c2VQb2ludFkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0UGFubmluZ0Nvb3Jkcygpe1xyXG4gICAgICAgIGZvcihsZXQgY2hhcnQgb2YgdGhpcy50cmFjZUNoYXJ0TGlzdCl7XHJcbiAgICAgICAgICAgIGNoYXJ0LnJlc2V0UGFubmluZ0Nvb3JkcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcmVzZXRab29tKCkge1xyXG4gICAgICAgIGxldCBjaGFydFJhbmdlSGVscGVyID0gbmV3IENoYXJ0UmFuZ2VIZWxwZXIoKTtcclxuXHJcbiAgICAgICAgY2hhcnRSYW5nZUhlbHBlci5yZXNldFhSYW5nZXNBbGxDaGFydFR5cGVzKHRoaXMudHJhY2VDaGFydExpc3QpO1xyXG4gICAgICAgIGNoYXJ0UmFuZ2VIZWxwZXIucmVzZXRZUmFuZ2VzQWxsQ2hhcnRUeXBlcyh0aGlzLnRyYWNlQ2hhcnRMaXN0KTtcclxuICAgICAgICB0aGlzLnJlZHJhd0NoYXJ0cyh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICByZXNldEN1cnNvcnNIb3ZlcmluZyhhcmdzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudHJhY2VDaGFydExpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgcGFyZW50RWxlbWVudCA9IGFyZ3MuZGF0YS5lLnRhcmdldC5wYXJlbnRFbGVtZW50XHJcbiAgICAgICAgICAgIGlmIChwYXJlbnRFbGVtZW50ICE9PSB1bmRlZmluZWQgJiYgcGFyZW50RWxlbWVudCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1vdXNlT3ZlckN1cnNvcnMgPSB0aGlzLmlzTW91c2VPdmVyQ3Vyc29ycyhwYXJlbnRFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIC8vSnVzdCByZXNldCBjdXJzb3JzIGlmIG1vdXNlIGlzIG1vdmluZyBvdXRzaWRlIGEgY2hhcnRcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuZ2V0VHJhY2VDaGFydEJ5Q29udGFpbmVySWQocGFyZW50RWxlbWVudC5pZCkgPT09IHVuZGVmaW5lZCAmJiAhbW91c2VPdmVyQ3Vyc29ycykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJhY2VDaGFydExpc3RbMF0ucmVzZXRDdXJzb3JzSG92ZXJlZCgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgXHJcblxyXG4gICAgYXV0b1NjYWxlKCkge1xyXG4gICAgICAgIGxldCBjaGFydFJhbmdlSGVscGVyID0gbmV3IENoYXJ0UmFuZ2VIZWxwZXIoKTtcclxuICAgICAgICBmb3IgKGxldCBjaGFydCBvZiB0aGlzLnRyYWNlQ2hhcnRMaXN0KSB7XHJcbiAgICAgICAgICAgIGNoYXJ0LmF1dG9TY2FsZVlTY2FsZXMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNoYXJ0UmFuZ2VIZWxwZXIucmVzZXRYUmFuZ2VzQWxsQ2hhcnRUeXBlcyh0aGlzLnRyYWNlQ2hhcnRMaXN0KTtcclxuICAgICAgICB0aGlzLnJlZHJhd0NoYXJ0cyh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRDaGFydFpvb21BeGVzKGF4ZXM6IFpvb21EaXJlY3Rpb24pIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHJhY2VDaGFydExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5zZXRab29tQXhlcyhheGVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jaGFydFZpZXdXaWRnZXQuYWN0aXZlU2VsZWN0ZWRab29tQXhpcyA9IGF4ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UGFubmluZyhlbmFibGU6IGJvb2xlYW4pOiBhbnkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50cmFjZUNoYXJ0TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLnNldFBhbm5pbmcoZW5hYmxlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Qm94Wm9vbShlbmFibGU6IGJvb2xlYW4pOiBhbnkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50cmFjZUNoYXJ0TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLnNldEJveFpvb20oZW5hYmxlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVkcmF3Q2hhcnRzKGZvcmNlUmVkcmF3OiBib29sZWFuLCBjaGFydFR5cGU/OiBDaGFydFR5cGUpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHJhY2VDaGFydExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy9pZiAoZm9yY2VSZWRyYXcgPT0gdHJ1ZSB8fCB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLnR5cGUgIT0gQ2hhcnRUeXBlLlhZQ2hhcnQpIHtcclxuICAgICAgICAgICAgLy8gICAgdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5yZWRyYXdDaGFydCgpO1xyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgaWYoY2hhcnRUeXBlID09IHVuZGVmaW5lZCB8fCBmb3JjZVJlZHJhdyA9PSB0cnVlIHx8IHRoaXMudHJhY2VDaGFydExpc3RbaV0udHlwZSA9PSBjaGFydFR5cGUpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5yZWRyYXdDaGFydCgpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25SZWRyYXdBbGxDaGFydHMoc2VuZGVyLCBhcmdzIDogRXZlbnRSZWRyYXdBbGxDaGFydHNBcmdzKXtcclxuICAgICAgICB0aGlzLnJlZHJhd0NoYXJ0cyhmYWxzZSwgYXJncy5jaGFydFR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2hhcnRTZXJpZXNBZGRlZChzZW5kZXI6IElUcmFjZUNoYXJ0LCBhcmdzOiBCYXNlU2VyaWVzKXtcclxuICAgICAgICBpZihhcmdzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBzZXJpZSA9IGFyZ3M7XHJcbiAgICAgICAgICAgIHNlcmllLmV2ZW50RGF0YUNoYW5nZWQuYXR0YWNoKHRoaXMuX29uU2VyaWVEYXRhQ2hhbmdlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNNb3VzZU92ZXJDdXJzb3JzKGVsZW1lbnQpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QudmFsdWUuaW5jbHVkZXMoQ3Jvc3NIYWlyQ3Vyc29yLmNyb3NzSGFpckN1cnNvcklkKSB8fCBlbGVtZW50LmNsYXNzTGlzdC52YWx1ZS5pbmNsdWRlcyhMaW5lQ3Vyc29yLmxpbmVDdXJzb3JJZCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Vc2VyQ2hhcnRJbnRlcmFjdGlvbihzZW5kZXIsIGV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzOiBFdmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncykgOiB2b2lkIHtcclxuICAgICAgICAvL29uIGRyYWdnaW5nIHRoZSBob3ZlcmQgc2VyaWVzIG5lZWRzIHRvIGJlIHN0b3JlZCB0byBjYWxjdWxhdGUgdGhlIGN1cnNvciBwb3N0aW9uIHdoZW4gdGhlIG1vdXNlIGlzIG1vdmVkIG92ZXIgbXVsdGlwbGUgY2hhcnRzXHJcbiAgICAgICAgaWYgKGV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzLmV2ZW50QXJndW1lbnRzLmhvdmVyZWRTZXJpZXMpIHtcclxuICAgICAgICAgICAgdGhpcy5faG92ZXJlZFNlcmllcyA9IGV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzLmV2ZW50QXJndW1lbnRzLmhvdmVyZWRTZXJpZXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2hhcnRWaWV3V2lkZ2V0Lm9uVXNlckNoYXJ0SW50ZXJhY3Rpb24oc2VuZGVyLCBldmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncylcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkRHJvcHBhYmxlTG9jYXRpb25zKGRhdGEsIHNhbWVHcm91cDogYm9vbGVhbikge1xyXG4gICAgICAgIGZvciAobGV0IGNoYXJ0IG9mIHRoaXMudHJhY2VDaGFydExpc3QpIHtcclxuICAgICAgICAgICAgbGV0IGNoYXJ0TWFuYWdlckNoYXJ0ID0gdGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLmdldENoYXJ0KGNoYXJ0LndpZGdldE5hbWUpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHNlcmllQ2hhcnRUeXBlID0gU2VyaWVDaGFydFR5cGVIZWxwZXIuZ2V0U2VyaWVDaGFydFR5cGUoZGF0YVswXS50eXBlKTtcclxuICAgICAgICAgICAgU2VyaWVDaGFydFR5cGVIZWxwZXIuc2V0RHJvcFBvc3NpYmxlQXJlYXMoY2hhcnRNYW5hZ2VyQ2hhcnQhLCBkYXRhLCBzZXJpZUNoYXJ0VHlwZSwgc2FtZUdyb3VwKTtcclxuICAgICAgICAgICAgY2hhcnQuYWRkU2VyaWVEcm9wTG9jYXRpb25zKGRhdGEsIGNoYXJ0TWFuYWdlckNoYXJ0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBkcm9wSGVscGVyID0gbmV3IENoYXJ0RHJvcEhlbHBlcih0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwsIHRoaXMuY2hhcnRWaWV3V2lkZ2V0KTtcclxuICAgICAgICAvLyBBZGQgZW1wdHkgc3BhY2UgZHJvcCBsb2NhdGlvblxyXG4gICAgICAgIGlmIChkcm9wSGVscGVyLmNhbkFkZENoYXJ0KCkgPT0gdHJ1ZSkgeyAvLyBJcyBpdCBwb3NzaWJsZSB0byBhZGQgb25lIG1vcmUgY2hhcnRcclxuICAgICAgICAgICAgbGV0IGVtcHR5U3BhY2VFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5sYXlvdXRNYW5hZ2VyLmNoYXJ0U3BsaXR0ZXIuZ2V0TGFzdFBhbmVJZCgpKTtcclxuICAgICAgICAgICAgbGV0IHNjcm9sbEJhcldpZHRoID0gJCgnIycgKyB0aGlzLmxheW91dE1hbmFnZXIuY2hhcnRTcGxpdHRlclBhcmVudENvbnRhaW5lcklkKVswXS5vZmZzZXRXaWR0aCAtICQoJyMnICsgdGhpcy5sYXlvdXRNYW5hZ2VyLmNoYXJ0U3BsaXR0ZXJDb250YWluZXJJZClbMF0ub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgICAgIGlmIChlbXB0eVNwYWNlRWxlbWVudCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGVtcHR5U3BhY2VFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDEyNSwxNjAsMTY1LCAwLjIpJztcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhWzBdLnR5cGUgPT0gU2VyaWVzVHlwZS50aW1lU2VyaWVzICYmIGRhdGEubGVuZ3RoID4gMiB8fCAhc2FtZUdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDaGFydFR5cGVBcmVhcyhlbXB0eVNwYWNlRWxlbWVudCwgW3RydWUsIGZhbHNlLCB0cnVlXSwgc2Nyb2xsQmFyV2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZGF0YVswXS50eXBlID09IFNlcmllc1R5cGUudGltZVNlcmllcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2hhcnRUeXBlQXJlYXMoZW1wdHlTcGFjZUVsZW1lbnQsIFt0cnVlLCB0cnVlLCB0cnVlXSwgc2Nyb2xsQmFyV2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZGF0YVswXS50eXBlID09IFNlcmllc1R5cGUueHlTZXJpZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZENoYXJ0VHlwZUFyZWFzKGVtcHR5U3BhY2VFbGVtZW50LCBbZmFsc2UsIHRydWUsIGZhbHNlXSwgc2Nyb2xsQmFyV2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZGF0YVswXS50eXBlID09IFNlcmllc1R5cGUuZmZ0U2VyaWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDaGFydFR5cGVBcmVhcyhlbXB0eVNwYWNlRWxlbWVudCwgW2ZhbHNlLCBmYWxzZSwgdHJ1ZV0sIHNjcm9sbEJhcldpZHRoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFkZENoYXJ0VHlwZUFyZWFzKHBhcmVudDogSFRNTEVsZW1lbnQsIGVuYWJsZWQ6IEFycmF5PGJvb2xlYW4+LCBzY3JvbGxCYXJXaWR0aCkge1xyXG4gICAgICAgIGxldCBjaGFydE5hbWVzID0gWydZVCcsICdYWScsICdGRlQnXTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYXJ0TmFtZXMubGVuZ3RoOyBpID0gaSArIDEpIHtcclxuICAgICAgICAgICAgbGV0IGFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgYXJlYS5pZCA9IHBhcmVudC5pZCArICdfJyArIGNoYXJ0TmFtZXNbaV07XHJcbiAgICAgICAgICAgIGFyZWEuY2xhc3NMaXN0LmFkZCgnY2hhcnRUeXBlcycpO1xyXG4gICAgICAgICAgICBpZiAoIWVuYWJsZWRbaV0pIHtcclxuICAgICAgICAgICAgICAgIGFyZWEuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYXJlYS5zdHlsZS53aWR0aCA9ICgocGFyZW50Lm9mZnNldFdpZHRoIC0gc2Nyb2xsQmFyV2lkdGgpIC8gY2hhcnROYW1lcy5sZW5ndGgpLnRvU3RyaW5nKCkgKyAncHgnO1xyXG5cclxuICAgICAgICAgICAgbGV0IGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcclxuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gJy4vd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2NoYXJ0VHlwZScgKyBjaGFydE5hbWVzW2ldICsgJy5zdmcnO1xyXG4gICAgICAgICAgICBpbWFnZS5jbGFzc0xpc3QuYWRkKCdpbWFnZUNoYXJ0Jyk7XHJcblxyXG4gICAgICAgICAgICBhcmVhLmFwcGVuZENoaWxkKGltYWdlKTtcclxuICAgICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGFyZWEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlRHJvcHBhYmxlTG9jYXRpb25zKCkge1xyXG4gICAgICAgIGZvciAobGV0IGNoYXJ0IG9mIHRoaXMudHJhY2VDaGFydExpc3QpIHtcclxuICAgICAgICAgICAgY2hhcnQucmVtb3ZlU2VyaWVEcm9wTG9jYXRpb25zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFJlbW92ZSBlbXB0eSBzcGFjZSBkcm9wIGxvY2F0aW9uXHJcbiAgICAgICAgbGV0IGVtcHR5U3BhY2VFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5sYXlvdXRNYW5hZ2VyLmNoYXJ0U3BsaXR0ZXIuZ2V0TGFzdFBhbmVJZCgpKTtcclxuICAgICAgICBpZiAoZW1wdHlTcGFjZUVsZW1lbnQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGxldCB0eXBlT2ZDaGFydHMgPSBlbXB0eVNwYWNlRWxlbWVudC5jaGlsZHJlbi5sZW5ndGg7XHJcbiAgICAgICAgICAgIGVtcHR5U3BhY2VFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZmZmJztcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0eXBlT2ZDaGFydHM7IGkgPSBpICsgMSkge1xyXG4gICAgICAgICAgICAgICAgZW1wdHlTcGFjZUVsZW1lbnQuY2hpbGRyZW5bMF0ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZVhBeGlzV2lkdGgoY2hhcnRUeXBlOiBDaGFydFR5cGUpIHtcclxuICAgICAgICBsZXQgbWF4WUF4ZXMgPSAwO1xyXG4gICAgICAgIGxldCBjaGFydEFyZWE6IFJlY3RhbmdsZSB8IHVuZGVmaW5lZDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHJhY2VDaGFydExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHJhY2VDaGFydExpc3RbaV0udHlwZSA9PSBjaGFydFR5cGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJhY2VDaGFydExpc3RbaV0uY2hhcnQucmVkcmF3KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG51bWJlck9mWUF4ZXNJbkNoYXJ0ID0gdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5nZXROdW1iZXJPZllTY2FsZXMoKTtcclxuICAgICAgICAgICAgICAgIGlmIChudW1iZXJPZllBeGVzSW5DaGFydCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbnVtYmVyT2ZZQXhlc0luQ2hhcnQgPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vaWYgb25lIGNoYXJ0IGhhcyBtb3JlIGF4aXMgdGhhbiB0aGUgb3RoZXJzIHVzZSBpdHMgd2lkdGgsIGlmIHRoZXkgaGF2ZSB0aGUgc2FtZSBhbW91bnQgdXNlIHRoZSBvbmUgd2l0aCB0aGUgaGlnaGVyIHdpZHRoXHJcbiAgICAgICAgICAgICAgICBpZiAobnVtYmVyT2ZZQXhlc0luQ2hhcnQgPiBtYXhZQXhlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIG1heFlBeGVzID0gbnVtYmVyT2ZZQXhlc0luQ2hhcnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhcnRBcmVhID0gdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5jaGFydC5nZXRDaGFydEFyZWEoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG51bWJlck9mWUF4ZXNJbkNoYXJ0ID09IG1heFlBeGVzICYmIHRoaXMudHJhY2VDaGFydExpc3RbaV0uY2hhcnQuZ2V0Q2hhcnRBcmVhKCkud2lkdGggPiBjaGFydEFyZWEhLndpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhcnRBcmVhID0gdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5jaGFydC5nZXRDaGFydEFyZWEoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNoYXJ0QXJlYSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5hbGlnbllBeGVzKGNoYXJ0QXJlYSwgY2hhcnRUeXBlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhbGlnbllBeGVzKGNoYXJ0QXJlYTogUmVjdGFuZ2xlLCBjaGFydFR5cGU6IENoYXJ0VHlwZSkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50cmFjZUNoYXJ0TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50cmFjZUNoYXJ0TGlzdFtpXS50eXBlID09IGNoYXJ0VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld0NoYXJ0QXJlYSA9IHsgeDogY2hhcnRBcmVhLngsIHk6IGNoYXJ0QXJlYS55LCB3aWR0aDogY2hhcnRBcmVhLndpZHRoLCBoZWlnaHQ6IHRoaXMudHJhY2VDaGFydExpc3RbaV0uY2hhcnQuZ2V0Q2hhcnRBcmVhKCkuaGVpZ2h0IC0gMX07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLmNoYXJ0LnNldENoYXJ0QXJlYShuZXdDaGFydEFyZWEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5yZWRyYXdDaGFydCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==