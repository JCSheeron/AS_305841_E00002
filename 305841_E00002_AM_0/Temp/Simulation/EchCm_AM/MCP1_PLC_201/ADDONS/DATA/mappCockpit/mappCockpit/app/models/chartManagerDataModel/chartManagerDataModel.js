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
define(["require", "exports", "../dataModelInterface", "./scale", "../common/series/eventSerieDataChangedArgs", "./eventScaleDataChangedArgs", "./chartManagerChart", "./settingIds", "./componentDefaultDefinition", "./chartManagerData", "../dataModelBase"], function (require, exports, dataModelInterface_1, scale_1, eventSerieDataChangedArgs_1, eventScaleDataChangedArgs_1, chartManagerChart_1, settingIds_1, componentDefaultDefinition_1, chartManagerData_1, dataModelBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartManagerDataModelChangedHint;
    (function (ChartManagerDataModelChangedHint) {
        ChartManagerDataModelChangedHint[ChartManagerDataModelChangedHint["addSerie"] = 0] = "addSerie";
        ChartManagerDataModelChangedHint[ChartManagerDataModelChangedHint["moveSerie"] = 1] = "moveSerie";
        ChartManagerDataModelChangedHint[ChartManagerDataModelChangedHint["removeSerie"] = 2] = "removeSerie";
        ChartManagerDataModelChangedHint[ChartManagerDataModelChangedHint["addChart"] = 3] = "addChart";
        ChartManagerDataModelChangedHint[ChartManagerDataModelChangedHint["moveChart"] = 4] = "moveChart";
        ChartManagerDataModelChangedHint[ChartManagerDataModelChangedHint["removeChart"] = 5] = "removeChart";
        ChartManagerDataModelChangedHint[ChartManagerDataModelChangedHint["addYScale"] = 6] = "addYScale";
        ChartManagerDataModelChangedHint[ChartManagerDataModelChangedHint["removeYScale"] = 7] = "removeYScale";
        ChartManagerDataModelChangedHint[ChartManagerDataModelChangedHint["updateScaleRange"] = 8] = "updateScaleRange";
        ChartManagerDataModelChangedHint[ChartManagerDataModelChangedHint["disableChart"] = 9] = "disableChart";
        ChartManagerDataModelChangedHint[ChartManagerDataModelChangedHint["renameSignal"] = 10] = "renameSignal";
        ChartManagerDataModelChangedHint[ChartManagerDataModelChangedHint["startTriggerTimeChanged"] = 11] = "startTriggerTimeChanged";
        ChartManagerDataModelChangedHint[ChartManagerDataModelChangedHint["colorChanged"] = 12] = "colorChanged";
        ChartManagerDataModelChangedHint[ChartManagerDataModelChangedHint["dataPointsChanged"] = 13] = "dataPointsChanged";
        ChartManagerDataModelChangedHint[ChartManagerDataModelChangedHint["default"] = 14] = "default";
    })(ChartManagerDataModelChangedHint = exports.ChartManagerDataModelChangedHint || (exports.ChartManagerDataModelChangedHint = {}));
    var ChartManagerDataModel = /** @class */ (function (_super) {
        __extends(ChartManagerDataModel, _super);
        function ChartManagerDataModel() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.series = new Array();
            _this._chartManagerData = new chartManagerData_1.ChartManagerData();
            _this._serieDataChangedHandler = function (sender, args) { return _this.onSerieDataChanged(sender, args); };
            _this._scaleDataChangedHandler = function (sender, args) { return _this.onScaleDataChanged(sender, args); };
            _this._maxChartCount = 4; // Currently limitation of charts to the max. of 4 
            return _this;
        }
        /**
         * Initializes the ChartManagerDataModel
         *
         * @memberof ChartManagerDataModel
         */
        ChartManagerDataModel.prototype.initialize = function () {
            this._data = this._chartManagerData.childs;
            _super.prototype.initialize.call(this);
            this._dataSource = this;
            _super.prototype.initialize.call(this);
        };
        ChartManagerDataModel.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
        };
        ChartManagerDataModel.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.clear();
        };
        ChartManagerDataModel.prototype.clear = function () {
            // Remove all charts
            if (this.data != undefined) {
                for (var i = this.data.length - 1; i >= 0; i--) {
                    this.removeChart(this.data[i]);
                }
            }
        };
        ChartManagerDataModel.prototype.getComponentSettings = function (onlyModified) {
            var chartList = new Array();
            // export data
            this.data.forEach(function (child) {
                chartList.push(child.getSettings());
            });
            this.component.setSetting("dataModel", chartList);
            return _super.prototype.getComponentSettings.call(this, onlyModified);
        };
        ChartManagerDataModel.prototype.setComponentSettings = function (componentSettings) {
            var _this = this;
            _super.prototype.setComponentSettings.call(this, componentSettings);
            var dataModel = this.component.getSetting("dataModel");
            // Reset the data of this datamodel
            this.clear();
            if (dataModel != undefined) {
                // import data
                dataModel.forEach(function (chart) {
                    var newChart = new chartManagerChart_1.ChartManagerChart("");
                    newChart.setSettings(chart);
                    newChart.addDefaultYScale(_this);
                    // TODO: Set scales to chart within setSettings method of chart
                    var scales = chart.data[settingIds_1.SettingIds.ChartScales];
                    var _loop_1 = function (i) {
                        var scale = scales[i];
                        var newScale;
                        if (i == 0) {
                            // Set scale data to already available default scale
                            newScale = newChart.childs[0];
                            newScale.setSettings(scale);
                        }
                        else {
                            // Add new scale
                            newScale = new scale_1.Scale("", newChart);
                            newScale.setSettings(scale);
                            _this.addYScale(newChart, newScale);
                        }
                        // TODO: Set series to scale within setSettings method of scale
                        var seriesProvider = _this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.SeriesProviderId);
                        var seriesIds = scale.data[settingIds_1.SettingIds.ScaleSeriesIds];
                        seriesIds.forEach(function (seriesId) {
                            if (seriesProvider != undefined) {
                                var series = seriesProvider.get(seriesId);
                                if (series != undefined) {
                                    _this.addSeriesToChart(newChart, [series], newScale, true);
                                }
                            }
                        });
                    };
                    for (var i = 0; i < scales.length; i++) {
                        _loop_1(i);
                    }
                    ;
                    _this.addChart(newChart, -1);
                });
            }
        };
        /**
         * Adds a chart to the datamodel
         *
         * @param {IChartManagerChart} chart
         * @param {number} index
         * @returns {boolean} false if chart adding not possible, else true
         * @memberof ChartManagerDataModel
         */
        ChartManagerDataModel.prototype.addChart = function (chart, index) {
            var data = this.data;
            if (data.length >= this._maxChartCount) { // Limitation of charts
                return false;
            }
            this._chartManagerData.addChart(chart, index);
            var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.addChart, { data: data, chart: chart, index: index, type: chart.chartType });
            this.onModelChanged(this, eventArgs);
            var childsclone = chart.childs.slice();
            for (var i = 0; i < childsclone.length; i++) {
                var yAxis = childsclone[i];
                var series = yAxis.childs.slice();
                for (var j = 0; j < series.length; j++) {
                    // fire add serie event for all series of this chart
                    var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.addSerie, { data: data, chart: chart, axis: chart.childs[0], series: series, keepScales: true });
                    this.onModelChanged(this, eventArgs);
                }
            }
            return true;
        };
        /**
         * Returns true if a chart can be added, else false if chart limit was reached
         *
         * @returns {boolean}
         * @memberof ChartManagerDataModel
         */
        ChartManagerDataModel.prototype.canAddChart = function () {
            if (this.data.length >= this._maxChartCount) { // Limitation of charts
                return false;
            }
            return true;
        };
        /**
         * Removes a chart from the datamodel
         *
         * @param {IChartManagerChart} chart
         * @memberof ChartManagerDataModel
         */
        ChartManagerDataModel.prototype.removeChart = function (chart) {
            var axisInCharts = chart.getChilds();
            for (var i = 0; i < axisInCharts.length; i++) {
                this.removeYAxis(chart, axisInCharts[i]);
            }
            this._chartManagerData.removeChart(chart);
            var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.removeChart, { data: this.data, chart: chart });
            this.onModelChanged(this, eventArgs);
        };
        /**
         * Moves a chart within the datamodel
         *
         * @param {IChartManagerChart} chart
         * @param {IChartManagerChart} targetChart
         * @param {string} insertType e.g "insertAbove" or "insertBelow"
         * @memberof ChartManagerDataModel
         */
        ChartManagerDataModel.prototype.moveChart = function (chart, targetChart, insertType) {
            this._chartManagerData.moveChart(chart, targetChart, insertType);
            var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.moveChart, { data: this.data, chart: chart, target: targetChart, insertType: insertType });
            this.onModelChanged(this, eventArgs);
        };
        /**
         * Adds a serie to a chart
         *
         * @param {IChartManagerChart} chart
         * @param {Array<BaseSeries>} series
         * @param {Scale} scale
         * @memberof ChartManagerDataModel
         */
        ChartManagerDataModel.prototype.addSeriesToChart = function (chart, series, scale, keepScales) {
            if (keepScales === void 0) { keepScales = false; }
            if (chart.getYScale(scale.id) == undefined) {
                chart.addYScale(scale);
            }
            chart.addSeries(series, scale);
            for (var i = 0; i < series.length; i++) {
                series[i].eventDataChanged.attach(this._serieDataChangedHandler);
            }
            var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.addSerie, { data: this.data, chart: chart, series: series, axis: scale, keepScales: keepScales });
            this.onModelChanged(this, eventArgs);
        };
        /**
         * Removes a serie from a chart
         *
         * @param {IChartManagerChart} chart
         * @param {BaseSeries} serie
         * @memberof ChartManagerDataModel
         */
        ChartManagerDataModel.prototype.removeSerie = function (chart, serie) {
            if (chart != undefined) {
                chart.removeSerie(serie);
                var chartsWithThisSerie = this.getChartsWithSerie(serie);
                var serieUsed = false;
                if (chartsWithThisSerie.length > 0) {
                    serieUsed = true;
                }
                else { // Serie not used in an other chart => detach events
                    serie.eventDataChanged.detach(this._serieDataChangedHandler);
                }
                var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.removeSerie, { data: this.data, chart: chart, serie: serie, signalUsedInOtherCharts: serieUsed });
                this.onModelChanged(this, eventArgs);
            }
        };
        /**
         * Adds a yAxis to the given chart
         *
         * @param {IChartManagerChart} chart
         * @param {Scale} yScale
         * @memberof ChartManagerDataModel
         */
        ChartManagerDataModel.prototype.addYScale = function (chart, yScale) {
            if (chart != undefined) {
                chart.addYScale(yScale);
                yScale.eventDataChanged.attach(this._scaleDataChangedHandler);
                var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.addYScale, { data: this.data, chart: chart, yAxis: yScale });
                this.onModelChanged(this, eventArgs);
            }
        };
        ChartManagerDataModel.prototype.getDefaultXScaleRangeByType = function (type) {
            var scaleRange = { min: 0, max: 100 };
            var chart;
            if (type == chartManagerChart_1.ChartType.XYChart) {
                return scaleRange;
            }
            else {
                for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
                    chart = _a[_i];
                    if (chart.chartType == type) {
                        scaleRange.max = chart.childs[0].maxXValue;
                        scaleRange.min = chart.childs[0].minXValue;
                        return scaleRange;
                    }
                }
            }
            return scaleRange;
        };
        /**
         * Removes a yAxis from the given chart
         *
         * @param {IChartManagerChart} chart
         * @param {Scale} yAxis
         * @memberof ChartManagerDataModel
         */
        ChartManagerDataModel.prototype.removeYAxis = function (chart, yAxis) {
            if (chart != undefined) {
                //First, remove series from Y Axis
                var seriesInAxis = yAxis.getChilds();
                for (var i = 0; i < seriesInAxis.length; i++) {
                    this.removeSerie(chart, seriesInAxis[i]);
                }
                if (chart.removeYAxis(yAxis) == true) {
                    var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.removeYScale, { data: this.data, chart: chart, yAxis: yAxis });
                    this.onModelChanged(this, eventArgs);
                }
            }
        };
        /**
         * Removes a serie from all charts
         *
         * @param {BaseSeries} series
         * @memberof ChartManagerDataModel
         */
        ChartManagerDataModel.prototype.removeSerieFromAllCharts = function (serie) {
            for (var i = 0; i < this.data.length; i++) {
                var chart = this.data[i];
                if (chart != undefined) {
                    for (var j = 0; j < chart.childs.length; j++) {
                        if (chart.removeSerie(serie)) {
                            var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.removeSerie, { data: this.data, chart: chart, serie: serie, signalUsedInOtherCharts: false });
                            this.onModelChanged(this, eventArgs);
                        }
                    }
                }
            }
        };
        /**
         * Moves a serie from one position to an other, within a chart or into an other chart (=> currently only changed event will raised, moving is done by syncfusion treegrid!!!)
         *
         * @param {IChartManagerChart} sourceChart
         * @param {Scale} sourceAxis
         * @param {BaseSeries} serie
         * @param {IChartManagerChart} targetChart
         * @param {Scale} targetAxis
         * @param {string} insertType
         * @memberof ChartManagerDataModel
         */
        ChartManagerDataModel.prototype.moveSerie = function (sourceChart, sourceAxis, serie, targetChart, targetAxis, insertType) {
            // currently only changed event will raised (moving is done by syncfusion treegrid!!!) 
            var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.moveSerie, { data: this.data, chart: sourceChart, targetChart: targetChart, serie: serie, targetAxis: targetAxis });
            this.onModelChanged(this, eventArgs);
        };
        /**
         * Set the chart disabled or enabled
         *
         * @param {IChartManagerChart} chart
         * @param {boolean} disabled
         * @memberof ChartManagerDataModel
         */
        /*disableChart(chart: IChartManagerChart, disabled: boolean){
          chart.setDisabled(disabled);
          var eventArgs = new EventModelChangedArgs(this, ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.disableChart, {data: this.data});
          this.onModelChanged(this, eventArgs);
        }*/
        /**
         * Returns the chart with the given name or undefined if not found
         *
         * @param {string} chartName
         * @returns {(IChartManagerChart|undefined)}
         * @memberof ChartManagerDataModel
         */
        ChartManagerDataModel.prototype.getChart = function (chartName) {
            for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
                var chart = _a[_i];
                if (chart.name == chartName) {
                    return chart;
                }
            }
            ;
            return undefined;
        };
        /**
         * Returns a unique chart name (e.g "Chart 1", "chart 2", ...)
         *
         * @returns {string}
         * @memberof ChartManagerDataModel
         */
        ChartManagerDataModel.prototype.getUniqueChartName = function () {
            for (var i = 1; 1 < 1000; i++) {
                var newchartName = "Chart " + i;
                var chartNameAlreadyExists = false;
                for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
                    var chart = _a[_i];
                    if (chart.name == newchartName) {
                        chartNameAlreadyExists = true;
                        break;
                    }
                }
                if (chartNameAlreadyExists == false)
                    return newchartName;
            }
            return "Chart 1000";
        };
        /**
         * Returns all charts which work with the given serie
         *
         * @param {Array<BaseSeries>} serie
         * @returns {Array<IChartManagerChart>}
         * @memberof ChartManagerDataModel
         */
        ChartManagerDataModel.prototype.getChartsUsingSerie = function (serie) {
            var charts = new Array();
            for (var i = 0; i < this.data.length; i++) {
                var chart = this.data[i];
                if (chart.hasSeries(serie)) {
                    charts.push(chart);
                }
            }
            return charts;
        };
        /**
         * Returns all charts which have the given serie
         *
         * @param {BaseSeries} serie
         * @returns {Array<IChartManagerChart>}
         * @memberof ChartManagerDataModel
         */
        ChartManagerDataModel.prototype.getChartsWithSerie = function (serie) {
            var charts = new Array();
            for (var i = 0; i < this.data.length; i++) {
                var chart = this.data[i];
                if (chart.hasSerie(serie)) {
                    charts.push(chart);
                }
            }
            return charts;
        };
        ChartManagerDataModel.prototype.onSerieDataChanged = function (sender, args) {
            if (args.action == eventSerieDataChangedArgs_1.SerieAction.rename) {
                var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.renameSignal, { data: this.data });
                this.onModelChanged(this, eventArgs);
            }
            else if (args.action == eventSerieDataChangedArgs_1.SerieAction.startTriggerTimeChanged) {
                var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.startTriggerTimeChanged, { data: this.data });
                this.onModelChanged(this, eventArgs);
            }
            else if (args.action == eventSerieDataChangedArgs_1.SerieAction.colorChanged) {
                var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.colorChanged, { data: this.data });
                this.onModelChanged(this, eventArgs);
            }
            else if (args.action == eventSerieDataChangedArgs_1.SerieAction.dataPointsChanged) { // Needed for showing correct valid/invalid icon in chartmanager if data changes
                var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.dataPointsChanged, { data: this.data });
                this.onModelChanged(this, eventArgs);
            }
        };
        ChartManagerDataModel.prototype.onScaleDataChanged = function (sender, args) {
            if (args.action == eventScaleDataChangedArgs_1.ScaleAction.xRangeChanged && args.data.scale.parent.chartType != chartManagerChart_1.ChartType.XYChart) {
                var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.updateScaleRange, { data: this.data, scale: sender });
                this.onModelChanged(this, eventArgs);
            }
            if (args.action == eventScaleDataChangedArgs_1.ScaleAction.yRangeChanged) {
                var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.default, { data: this.data, scale: sender });
                this.onModelChanged(this, eventArgs);
            }
            if (args.action == eventScaleDataChangedArgs_1.ScaleAction.xRangeChanged && args.data.scale.parent.chartType == chartManagerChart_1.ChartType.XYChart) {
                var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.default, { data: this.data, scale: sender });
                this.onModelChanged(this, eventArgs);
            }
        };
        return ChartManagerDataModel;
    }(dataModelBase_1.DataModelBase));
    exports.ChartManagerDataModel = ChartManagerDataModel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBbUJBLElBQVksZ0NBaUJYO0lBakJELFdBQVksZ0NBQWdDO1FBQ3hDLCtGQUFRLENBQUE7UUFDUixpR0FBUyxDQUFBO1FBQ1QscUdBQVcsQ0FBQTtRQUNYLCtGQUFRLENBQUE7UUFDUixpR0FBUyxDQUFBO1FBQ1QscUdBQVcsQ0FBQTtRQUNYLGlHQUFTLENBQUE7UUFDVCx1R0FBWSxDQUFBO1FBQ1osK0dBQWdCLENBQUE7UUFDaEIsdUdBQVksQ0FBQTtRQUNaLHdHQUFZLENBQUE7UUFDWiw4SEFBdUIsQ0FBQTtRQUN2Qix3R0FBWSxDQUFBO1FBQ1osa0hBQWlCLENBQUE7UUFDakIsOEZBQU8sQ0FBQTtJQUVYLENBQUMsRUFqQlcsZ0NBQWdDLEdBQWhDLHdDQUFnQyxLQUFoQyx3Q0FBZ0MsUUFpQjNDO0lBRUQ7UUFBMkMseUNBQWE7UUFBeEQ7WUFBQSxxRUF1YkM7WUFyYkMsWUFBTSxHQUFpQixJQUFJLEtBQUssRUFBYyxDQUFDO1lBRXZDLHVCQUFpQixHQUFxQixJQUFJLG1DQUFnQixFQUFFLENBQUM7WUFFN0QsOEJBQXdCLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsRUFBcEMsQ0FBb0MsQ0FBQztZQUNoRiw4QkFBd0IsR0FBRyxVQUFDLE1BQU0sRUFBQyxJQUFJLElBQUcsT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxFQUFwQyxDQUFvQyxDQUFDO1lBRXJFLG9CQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUMsbURBQW1EOztR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Q0FBZSxDQUFDLFlBQVksRUFBRSxnQ0FBZ0MsQ0FBQyxPQUFPLEVBQUUsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztnQkFDMUosSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDdEM7WUFFRCxJQUFHLElBQUksQ0FBQyxNQUFNLElBQUksdUNBQVcsQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSw2QkFBUyxDQUFDLE9BQU8sRUFBQztnQkFDbkcsSUFBSSxTQUFTLEdBQUcsSUFBSSwwQ0FBcUIsQ0FBQyxJQUFJLEVBQUUsb0NBQWUsQ0FBQyxZQUFZLEVBQUUsZ0NBQWdDLENBQUMsT0FBTyxFQUFFLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUM7Z0JBQzFKLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2FBQ3RDO1FBQ0gsQ0FBQztRQUNILDRCQUFDO0lBQUQsQ0FBQyxBQXZiRCxDQUEyQyw2QkFBYSxHQXVidkQ7SUF2Ylksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVNlcmllc1Byb3ZpZGVyIH0gZnJvbSBcIi4uL2NvbW1vbi9zZXJpZXNQcm92aWRlci9zZXJpZXNQcm92aWRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJQ2hhcnRNYW5hZ2VyQ2hhcnQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2NoYXJ0TWFuYWdlckNoYXJ0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElDaGFydE1hbmFnZXJEYXRhTW9kZWwgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL2ludGVyZmFjZXMvc2V0dGluZ3NJbnRlcmZhY2VcIjtcclxuXHJcbmltcG9ydCB7IEV2ZW50TW9kZWxDaGFuZ2VkQXJncywgTW9kZWxDaGFuZ2VUeXBlIH0gZnJvbSBcIi4uL2RhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTY2FsZSB9IGZyb20gXCIuL3NjYWxlXCI7XHJcbmltcG9ydCB7IEV2ZW50U2VyaWVEYXRhQ2hhbmdlZEFyZ3MsIFNlcmllQWN0aW9uIH0gZnJvbSBcIi4uL2NvbW1vbi9zZXJpZXMvZXZlbnRTZXJpZURhdGFDaGFuZ2VkQXJnc1wiO1xyXG5pbXBvcnQgeyBFdmVudFNjYWxlRGF0YUNoYW5nZWRBcmdzLCBTY2FsZUFjdGlvbiB9IGZyb20gXCIuL2V2ZW50U2NhbGVEYXRhQ2hhbmdlZEFyZ3NcIjtcclxuaW1wb3J0IHsgQ2hhcnRUeXBlLCBDaGFydE1hbmFnZXJDaGFydCB9IGZyb20gXCIuL2NoYXJ0TWFuYWdlckNoYXJ0XCI7XHJcbmltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IFNldHRpbmdJZHMgfSBmcm9tIFwiLi9zZXR0aW5nSWRzXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uIH0gZnJvbSBcIi4vY29tcG9uZW50RGVmYXVsdERlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgQ2hhcnRNYW5hZ2VyRGF0YSB9IGZyb20gXCIuL2NoYXJ0TWFuYWdlckRhdGFcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi9jb21tb24vc2VyaWVzL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgRGF0YU1vZGVsQmFzZSB9IGZyb20gXCIuLi9kYXRhTW9kZWxCYXNlXCI7XHJcbmltcG9ydCB7IFNpbXBsZVJhbmdlIH0gZnJvbSBcIi4uLy4uL2NvcmUvaW50ZXJmYWNlcy9jb21wb25lbnRzL3VpL2NoYXJ0L2NoYXJ0SW50ZXJmYWNlXCI7XHJcblxyXG5cclxuZXhwb3J0IGVudW0gQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnR7XHJcbiAgICBhZGRTZXJpZSxcclxuICAgIG1vdmVTZXJpZSxcclxuICAgIHJlbW92ZVNlcmllLFxyXG4gICAgYWRkQ2hhcnQsXHJcbiAgICBtb3ZlQ2hhcnQsXHJcbiAgICByZW1vdmVDaGFydCxcclxuICAgIGFkZFlTY2FsZSxcclxuICAgIHJlbW92ZVlTY2FsZSxcclxuICAgIHVwZGF0ZVNjYWxlUmFuZ2UsXHJcbiAgICBkaXNhYmxlQ2hhcnQsIC8vVE9ETzogbm90IGltcGxlbWVudGVkIHlldFxyXG4gICAgcmVuYW1lU2lnbmFsLFxyXG4gICAgc3RhcnRUcmlnZ2VyVGltZUNoYW5nZWQsXHJcbiAgICBjb2xvckNoYW5nZWQsXHJcbiAgICBkYXRhUG9pbnRzQ2hhbmdlZCxcclxuICAgIGRlZmF1bHQsXHJcblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsIGV4dGVuZHMgRGF0YU1vZGVsQmFzZSBpbXBsZW1lbnRzIElDaGFydE1hbmFnZXJEYXRhTW9kZWx7XHJcbiAgICAgXHJcbiAgc2VyaWVzOiBCYXNlU2VyaWVzW10gPSBuZXcgQXJyYXk8QmFzZVNlcmllcz4oKTtcclxuXHJcbiAgcHJpdmF0ZSBfY2hhcnRNYW5hZ2VyRGF0YTogQ2hhcnRNYW5hZ2VyRGF0YSA9IG5ldyBDaGFydE1hbmFnZXJEYXRhKCk7XHJcblxyXG4gIHByaXZhdGUgX3NlcmllRGF0YUNoYW5nZWRIYW5kbGVyID0gKHNlbmRlcixhcmdzKT0+dGhpcy5vblNlcmllRGF0YUNoYW5nZWQoc2VuZGVyLGFyZ3MpO1xyXG4gIHB1YmxpYyBfc2NhbGVEYXRhQ2hhbmdlZEhhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpPT50aGlzLm9uU2NhbGVEYXRhQ2hhbmdlZChzZW5kZXIsYXJncyk7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgX21heENoYXJ0Q291bnQgPSA0OyAvLyBDdXJyZW50bHkgbGltaXRhdGlvbiBvZiBjaGFydHMgdG8gdGhlIG1heC4gb2YgNCBcclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6ZXMgdGhlIENoYXJ0TWFuYWdlckRhdGFNb2RlbFxyXG4gICAqXHJcbiAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIGluaXRpYWxpemUoKSB7XHJcbiAgICB0aGlzLl9kYXRhID0gdGhpcy5fY2hhcnRNYW5hZ2VyRGF0YS5jaGlsZHM7XHJcbiAgICBzdXBlci5pbml0aWFsaXplKCk7XHJcbiAgICB0aGlzLl9kYXRhU291cmNlID0gdGhpcztcclxuICAgIHN1cGVyLmluaXRpYWxpemUoKTtcclxuICB9XHJcblxyXG4gIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgIHRoaXMuY29tcG9uZW50LnNldERlZmF1bHREZWZpbml0aW9uKG5ldyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbigpKTtcclxuICB9XHJcblxyXG4gIGRpc3Bvc2UoKXtcclxuICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgIHRoaXMuY2xlYXIoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbGVhcigpe1xyXG4gICAgLy8gUmVtb3ZlIGFsbCBjaGFydHNcclxuICAgIGlmKHRoaXMuZGF0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICBmb3IobGV0IGk9dGhpcy5kYXRhLmxlbmd0aC0xOyBpID49IDA7IGktLSl7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVDaGFydCh0aGlzLmRhdGFbaV0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRDb21wb25lbnRTZXR0aW5ncyhvbmx5TW9kaWZpZWQ6IGJvb2xlYW4pOiBDb21wb25lbnRTZXR0aW5ncyB7XHJcbiAgICBsZXQgY2hhcnRMaXN0ID0gbmV3IEFycmF5PGFueT4oKTtcclxuICAgIC8vIGV4cG9ydCBkYXRhXHJcbiAgICB0aGlzLmRhdGEuZm9yRWFjaChjaGlsZCA9PiB7XHJcbiAgICAgIGNoYXJ0TGlzdC5wdXNoKGNoaWxkLmdldFNldHRpbmdzKCkpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmNvbXBvbmVudC5zZXRTZXR0aW5nKFwiZGF0YU1vZGVsXCIsIGNoYXJ0TGlzdCk7XHJcbiAgICByZXR1cm4gc3VwZXIuZ2V0Q29tcG9uZW50U2V0dGluZ3Mob25seU1vZGlmaWVkKTtcclxuICB9XHJcblxyXG4gIHNldENvbXBvbmVudFNldHRpbmdzKGNvbXBvbmVudFNldHRpbmdzOiBDb21wb25lbnRTZXR0aW5ncykge1xyXG4gICAgc3VwZXIuc2V0Q29tcG9uZW50U2V0dGluZ3MoY29tcG9uZW50U2V0dGluZ3MpO1xyXG4gICAgbGV0IGRhdGFNb2RlbCA9IHRoaXMuY29tcG9uZW50LmdldFNldHRpbmcoXCJkYXRhTW9kZWxcIik7XHJcbiAgICAvLyBSZXNldCB0aGUgZGF0YSBvZiB0aGlzIGRhdGFtb2RlbFxyXG4gICAgdGhpcy5jbGVhcigpO1xyXG4gICAgXHJcbiAgICBpZihkYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgLy8gaW1wb3J0IGRhdGFcclxuICAgICAgZGF0YU1vZGVsLmZvckVhY2goY2hhcnQgPT4ge1xyXG4gICAgICAgIGxldCBuZXdDaGFydCA9IG5ldyBDaGFydE1hbmFnZXJDaGFydChcIlwiKTtcclxuICAgICAgICBuZXdDaGFydC5zZXRTZXR0aW5ncyhjaGFydCk7XHJcblxyXG4gICAgICAgIG5ld0NoYXJ0LmFkZERlZmF1bHRZU2NhbGUodGhpcyk7XHJcblxyXG4gICAgICAgIC8vIFRPRE86IFNldCBzY2FsZXMgdG8gY2hhcnQgd2l0aGluIHNldFNldHRpbmdzIG1ldGhvZCBvZiBjaGFydFxyXG4gICAgICAgIGxldCBzY2FsZXM6IEFycmF5PElTZXR0aW5ncz4gPSBjaGFydC5kYXRhW1NldHRpbmdJZHMuQ2hhcnRTY2FsZXNdO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzY2FsZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgbGV0IHNjYWxlID0gc2NhbGVzW2ldO1xyXG4gICAgICAgICAgbGV0IG5ld1NjYWxlOiBTY2FsZTtcclxuICAgICAgICAgIGlmKGkgPT0gMCl7XHJcbiAgICAgICAgICAgIC8vIFNldCBzY2FsZSBkYXRhIHRvIGFscmVhZHkgYXZhaWxhYmxlIGRlZmF1bHQgc2NhbGVcclxuICAgICAgICAgICAgbmV3U2NhbGUgPSBuZXdDaGFydC5jaGlsZHNbMF07XHJcbiAgICAgICAgICAgIG5ld1NjYWxlLnNldFNldHRpbmdzKHNjYWxlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIC8vIEFkZCBuZXcgc2NhbGVcclxuICAgICAgICAgICAgbmV3U2NhbGUgPSBuZXcgU2NhbGUoXCJcIiwgbmV3Q2hhcnQpO1xyXG4gICAgICAgICAgICBuZXdTY2FsZS5zZXRTZXR0aW5ncyhzY2FsZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkWVNjYWxlKG5ld0NoYXJ0LCBuZXdTY2FsZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIC8vIFRPRE86IFNldCBzZXJpZXMgdG8gc2NhbGUgd2l0aGluIHNldFNldHRpbmdzIG1ldGhvZCBvZiBzY2FsZVxyXG4gICAgICAgICAgbGV0IHNlcmllc1Byb3ZpZGVyID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLlNlcmllc1Byb3ZpZGVySWQpIGFzIElTZXJpZXNQcm92aWRlcjtcclxuICAgICAgICAgIGxldCBzZXJpZXNJZHMgPSBzY2FsZS5kYXRhW1NldHRpbmdJZHMuU2NhbGVTZXJpZXNJZHNdO1xyXG4gICAgICAgICAgc2VyaWVzSWRzLmZvckVhY2goc2VyaWVzSWQgPT4ge1xyXG4gICAgICAgICAgICBpZihzZXJpZXNQcm92aWRlciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgIGxldCBzZXJpZXMgPSBzZXJpZXNQcm92aWRlci5nZXQoc2VyaWVzSWQpO1xyXG4gICAgICAgICAgICAgIGlmKHNlcmllcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRTZXJpZXNUb0NoYXJ0KG5ld0NoYXJ0LFtzZXJpZXNdLCBuZXdTY2FsZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmFkZENoYXJ0KG5ld0NoYXJ0LCAtMSk7XHJcblxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIFxyXG4gIC8qKlxyXG4gICAqIEFkZHMgYSBjaGFydCB0byB0aGUgZGF0YW1vZGVsXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0lDaGFydE1hbmFnZXJDaGFydH0gY2hhcnRcclxuICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gZmFsc2UgaWYgY2hhcnQgYWRkaW5nIG5vdCBwb3NzaWJsZSwgZWxzZSB0cnVlXHJcbiAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIGFkZENoYXJ0KGNoYXJ0IDogSUNoYXJ0TWFuYWdlckNoYXJ0LCBpbmRleDogbnVtYmVyKTogYm9vbGVhbntcclxuICAgIGxldCBkYXRhID0gdGhpcy5kYXRhO1xyXG4gICAgaWYoZGF0YS5sZW5ndGggPj0gdGhpcy5fbWF4Q2hhcnRDb3VudCl7IC8vIExpbWl0YXRpb24gb2YgY2hhcnRzXHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHRoaXMuX2NoYXJ0TWFuYWdlckRhdGEuYWRkQ2hhcnQoY2hhcnQsIGluZGV4KTtcclxuXHJcbiAgICB2YXIgZXZlbnRBcmdzID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5hZGRDaGFydCwge2RhdGE6IGRhdGEsIGNoYXJ0OiBjaGFydCwgaW5kZXg6IGluZGV4LCB0eXBlOiBjaGFydC5jaGFydFR5cGV9KTtcclxuICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcywgZXZlbnRBcmdzKTsgIFxyXG5cclxuICAgIGxldCBjaGlsZHNjbG9uZSA9IGNoYXJ0LmNoaWxkcy5zbGljZSgpO1xyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGNoaWxkc2Nsb25lLmxlbmd0aDsgaSsrKXtcclxuICAgICAgbGV0IHlBeGlzID0gY2hpbGRzY2xvbmVbaV07XHJcbiAgICAgIGxldCBzZXJpZXMgPSB5QXhpcy5jaGlsZHMuc2xpY2UoKTtcclxuICAgICAgZm9yKGxldCBqID0gMDsgaiA8IHNlcmllcy5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgLy8gZmlyZSBhZGQgc2VyaWUgZXZlbnQgZm9yIGFsbCBzZXJpZXMgb2YgdGhpcyBjaGFydFxyXG4gICAgICAgIHZhciBldmVudEFyZ3MgPSBuZXcgRXZlbnRNb2RlbENoYW5nZWRBcmdzKHRoaXMsIE1vZGVsQ2hhbmdlVHlwZS51cGRhdGVUYXJnZXQsIENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LmFkZFNlcmllLCB7ZGF0YTogZGF0YSwgY2hhcnQ6IGNoYXJ0LCBheGlzOiBjaGFydC5jaGlsZHNbMF0sIHNlcmllczogc2VyaWVzLCBrZWVwU2NhbGVzOiB0cnVlfSk7XHJcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBldmVudEFyZ3MpOyBcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRydWUgaWYgYSBjaGFydCBjYW4gYmUgYWRkZWQsIGVsc2UgZmFsc2UgaWYgY2hhcnQgbGltaXQgd2FzIHJlYWNoZWRcclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBjYW5BZGRDaGFydCgpOmJvb2xlYW57XHJcbiAgICBpZih0aGlzLmRhdGEubGVuZ3RoID49IHRoaXMuX21heENoYXJ0Q291bnQpeyAvLyBMaW1pdGF0aW9uIG9mIGNoYXJ0c1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbiAgXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlcyBhIGNoYXJ0IGZyb20gdGhlIGRhdGFtb2RlbFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtJQ2hhcnRNYW5hZ2VyQ2hhcnR9IGNoYXJ0XHJcbiAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIHJlbW92ZUNoYXJ0KGNoYXJ0IDogSUNoYXJ0TWFuYWdlckNoYXJ0KXtcclxuICAgIGxldCBheGlzSW5DaGFydHMgPSBjaGFydC5nZXRDaGlsZHMoKTtcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBheGlzSW5DaGFydHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICB0aGlzLnJlbW92ZVlBeGlzKGNoYXJ0LCBheGlzSW5DaGFydHNbaV0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fY2hhcnRNYW5hZ2VyRGF0YS5yZW1vdmVDaGFydChjaGFydCk7XHJcbiAgICB2YXIgZXZlbnRBcmdzID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5yZW1vdmVDaGFydCwge2RhdGE6IHRoaXMuZGF0YSwgY2hhcnQ6IGNoYXJ0fSk7XHJcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMsIGV2ZW50QXJncyk7ICBcclxuICB9XHJcbiAgXHJcbiAgLyoqXHJcbiAgICogTW92ZXMgYSBjaGFydCB3aXRoaW4gdGhlIGRhdGFtb2RlbFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtJQ2hhcnRNYW5hZ2VyQ2hhcnR9IGNoYXJ0XHJcbiAgICogQHBhcmFtIHtJQ2hhcnRNYW5hZ2VyQ2hhcnR9IHRhcmdldENoYXJ0XHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGluc2VydFR5cGUgZS5nIFwiaW5zZXJ0QWJvdmVcIiBvciBcImluc2VydEJlbG93XCJcclxuICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgbW92ZUNoYXJ0KGNoYXJ0IDogSUNoYXJ0TWFuYWdlckNoYXJ0LCB0YXJnZXRDaGFydCA6IElDaGFydE1hbmFnZXJDaGFydCwgaW5zZXJ0VHlwZTogc3RyaW5nKXtcclxuICAgIHRoaXMuX2NoYXJ0TWFuYWdlckRhdGEubW92ZUNoYXJ0KGNoYXJ0LCB0YXJnZXRDaGFydCwgaW5zZXJ0VHlwZSk7XHJcbiAgICB2YXIgZXZlbnRBcmdzID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5tb3ZlQ2hhcnQsIHtkYXRhOiB0aGlzLmRhdGEsIGNoYXJ0OiBjaGFydCwgdGFyZ2V0OiB0YXJnZXRDaGFydCwgaW5zZXJ0VHlwZTogaW5zZXJ0VHlwZX0pO1xyXG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBldmVudEFyZ3MpOyAgXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGRzIGEgc2VyaWUgdG8gYSBjaGFydFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtJQ2hhcnRNYW5hZ2VyQ2hhcnR9IGNoYXJ0XHJcbiAgICogQHBhcmFtIHtBcnJheTxCYXNlU2VyaWVzPn0gc2VyaWVzXHJcbiAgICogQHBhcmFtIHtTY2FsZX0gc2NhbGVcclxuICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgYWRkU2VyaWVzVG9DaGFydChjaGFydDogSUNoYXJ0TWFuYWdlckNoYXJ0LCBzZXJpZXM6IEFycmF5PEJhc2VTZXJpZXM+LCBzY2FsZSA6IFNjYWxlLCBrZWVwU2NhbGVzOiBib29sZWFuID0gZmFsc2Upe1xyXG4gICAgaWYoY2hhcnQuZ2V0WVNjYWxlKHNjYWxlLmlkKSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICBjaGFydC5hZGRZU2NhbGUoc2NhbGUpO1xyXG4gICAgfVxyXG4gICAgY2hhcnQuYWRkU2VyaWVzKHNlcmllcywgc2NhbGUpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZXJpZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICBzZXJpZXNbaV0uZXZlbnREYXRhQ2hhbmdlZC5hdHRhY2godGhpcy5fc2VyaWVEYXRhQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgfVxyXG4gICAgdmFyIGV2ZW50QXJncyA9IG5ldyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3ModGhpcywgTW9kZWxDaGFuZ2VUeXBlLnVwZGF0ZVRhcmdldCwgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQuYWRkU2VyaWUsIHtkYXRhOiB0aGlzLmRhdGEsIGNoYXJ0OiBjaGFydCwgc2VyaWVzOiBzZXJpZXMsIGF4aXM6IHNjYWxlLCBrZWVwU2NhbGVzOiBrZWVwU2NhbGVzfSk7XHJcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMsIGV2ZW50QXJncyk7XHJcbiAgfVxyXG4gIFxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZXMgYSBzZXJpZSBmcm9tIGEgY2hhcnRcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7SUNoYXJ0TWFuYWdlckNoYXJ0fSBjaGFydFxyXG4gICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgcmVtb3ZlU2VyaWUoY2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCwgc2VyaWUgOiBCYXNlU2VyaWVzKXtcclxuICAgIGlmKGNoYXJ0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgIGNoYXJ0LnJlbW92ZVNlcmllKHNlcmllKTtcclxuICAgICAgbGV0IGNoYXJ0c1dpdGhUaGlzU2VyaWUgPSB0aGlzLmdldENoYXJ0c1dpdGhTZXJpZShzZXJpZSk7XHJcbiAgICAgIGxldCBzZXJpZVVzZWQgPSBmYWxzZTtcclxuICAgICAgaWYoY2hhcnRzV2l0aFRoaXNTZXJpZS5sZW5ndGggPiAwKXtcclxuICAgICAgICBzZXJpZVVzZWQgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2V7IC8vIFNlcmllIG5vdCB1c2VkIGluIGFuIG90aGVyIGNoYXJ0ID0+IGRldGFjaCBldmVudHNcclxuICAgICAgICBzZXJpZS5ldmVudERhdGFDaGFuZ2VkLmRldGFjaCh0aGlzLl9zZXJpZURhdGFDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBldmVudEFyZ3MgPSBuZXcgRXZlbnRNb2RlbENoYW5nZWRBcmdzKHRoaXMsIE1vZGVsQ2hhbmdlVHlwZS51cGRhdGVUYXJnZXQsIENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LnJlbW92ZVNlcmllLCB7ZGF0YTogdGhpcy5kYXRhLCBjaGFydDogY2hhcnQsIHNlcmllOiBzZXJpZSwgc2lnbmFsVXNlZEluT3RoZXJDaGFydHM6IHNlcmllVXNlZH0pO1xyXG4gICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMsIGV2ZW50QXJncyk7ICBcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZHMgYSB5QXhpcyB0byB0aGUgZ2l2ZW4gY2hhcnRcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7SUNoYXJ0TWFuYWdlckNoYXJ0fSBjaGFydFxyXG4gICAqIEBwYXJhbSB7U2NhbGV9IHlTY2FsZVxyXG4gICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBhZGRZU2NhbGUoY2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCwgeVNjYWxlOiBTY2FsZSkge1xyXG4gICAgaWYoY2hhcnQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgY2hhcnQuYWRkWVNjYWxlKHlTY2FsZSk7XHJcblxyXG4gICAgICB5U2NhbGUuZXZlbnREYXRhQ2hhbmdlZC5hdHRhY2godGhpcy5fc2NhbGVEYXRhQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICB2YXIgZXZlbnRBcmdzID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5hZGRZU2NhbGUsIHtkYXRhOiB0aGlzLmRhdGEsIGNoYXJ0OiBjaGFydCwgeUF4aXM6IHlTY2FsZX0pO1xyXG4gICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMsIGV2ZW50QXJncyk7ICBcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXREZWZhdWx0WFNjYWxlUmFuZ2VCeVR5cGUodHlwZTogQ2hhcnRUeXBlKSA6IFNpbXBsZVJhbmdle1xyXG4gICAgbGV0IHNjYWxlUmFuZ2U6IFNpbXBsZVJhbmdlID0ge21pbjogMCwgbWF4OiAxMDB9O1xyXG4gICAgbGV0IGNoYXJ0OiBDaGFydE1hbmFnZXJDaGFydDtcclxuXHJcbiAgICBpZih0eXBlID09IENoYXJ0VHlwZS5YWUNoYXJ0KXtcclxuICAgICAgcmV0dXJuIHNjYWxlUmFuZ2U7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICBmb3IoY2hhcnQgb2YgdGhpcy5kYXRhKXtcclxuICAgICAgICBpZihjaGFydC5jaGFydFR5cGUgPT0gdHlwZSl7XHJcbiAgICAgICAgICBzY2FsZVJhbmdlLm1heCA9IGNoYXJ0LmNoaWxkc1swXS5tYXhYVmFsdWU7XHJcbiAgICAgICAgICBzY2FsZVJhbmdlLm1pbiA9IGNoYXJ0LmNoaWxkc1swXS5taW5YVmFsdWU7XHJcbiAgICAgICAgICByZXR1cm4gc2NhbGVSYW5nZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICBcclxuICAgIHJldHVybiBzY2FsZVJhbmdlO1xyXG4gIH1cclxuXHJcblxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmVzIGEgeUF4aXMgZnJvbSB0aGUgZ2l2ZW4gY2hhcnRcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7SUNoYXJ0TWFuYWdlckNoYXJ0fSBjaGFydFxyXG4gICAqIEBwYXJhbSB7U2NhbGV9IHlBeGlzXHJcbiAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIHJlbW92ZVlBeGlzKGNoYXJ0OiBJQ2hhcnRNYW5hZ2VyQ2hhcnQsIHlBeGlzOiBTY2FsZSkge1xyXG4gICAgaWYoY2hhcnQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgLy9GaXJzdCwgcmVtb3ZlIHNlcmllcyBmcm9tIFkgQXhpc1xyXG4gICAgICBsZXQgc2VyaWVzSW5BeGlzID0geUF4aXMuZ2V0Q2hpbGRzKCk7XHJcbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzZXJpZXNJbkF4aXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgIHRoaXMucmVtb3ZlU2VyaWUoY2hhcnQsIHNlcmllc0luQXhpc1tpXSk7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIGlmKGNoYXJ0LnJlbW92ZVlBeGlzKHlBeGlzKSA9PSB0cnVlKXtcclxuICAgICAgICB2YXIgZXZlbnRBcmdzID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5yZW1vdmVZU2NhbGUsIHtkYXRhOiB0aGlzLmRhdGEsIGNoYXJ0OiBjaGFydCwgeUF4aXM6IHlBeGlzfSk7XHJcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBldmVudEFyZ3MpOyAgXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZXMgYSBzZXJpZSBmcm9tIGFsbCBjaGFydHNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVzXHJcbiAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIHJlbW92ZVNlcmllRnJvbUFsbENoYXJ0cyhzZXJpZSA6IEJhc2VTZXJpZXNbXSl7XHJcbiAgICBmb3IobGV0IGk9MDsgaSA8IHRoaXMuZGF0YS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgIGxldCBjaGFydCA9IHRoaXMuZGF0YVtpXTtcclxuICAgICAgICBpZihjaGFydCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjaGFydC5jaGlsZHMubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICBpZihjaGFydC5yZW1vdmVTZXJpZShzZXJpZSkpe1xyXG4gICAgICAgICAgICAgIHZhciBldmVudEFyZ3MgPSBuZXcgRXZlbnRNb2RlbENoYW5nZWRBcmdzKHRoaXMsIE1vZGVsQ2hhbmdlVHlwZS51cGRhdGVUYXJnZXQsIENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LnJlbW92ZVNlcmllLCB7ZGF0YTogdGhpcy5kYXRhLCBjaGFydDogY2hhcnQsIHNlcmllOiBzZXJpZSwgc2lnbmFsVXNlZEluT3RoZXJDaGFydHM6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcywgZXZlbnRBcmdzKTsgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1vdmVzIGEgc2VyaWUgZnJvbSBvbmUgcG9zaXRpb24gdG8gYW4gb3RoZXIsIHdpdGhpbiBhIGNoYXJ0IG9yIGludG8gYW4gb3RoZXIgY2hhcnQgKD0+IGN1cnJlbnRseSBvbmx5IGNoYW5nZWQgZXZlbnQgd2lsbCByYWlzZWQsIG1vdmluZyBpcyBkb25lIGJ5IHN5bmNmdXNpb24gdHJlZWdyaWQhISEpIFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtJQ2hhcnRNYW5hZ2VyQ2hhcnR9IHNvdXJjZUNoYXJ0XHJcbiAgICogQHBhcmFtIHtTY2FsZX0gc291cmNlQXhpc1xyXG4gICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgKiBAcGFyYW0ge0lDaGFydE1hbmFnZXJDaGFydH0gdGFyZ2V0Q2hhcnRcclxuICAgKiBAcGFyYW0ge1NjYWxlfSB0YXJnZXRBeGlzXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGluc2VydFR5cGVcclxuICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgbW92ZVNlcmllKHNvdXJjZUNoYXJ0IDogSUNoYXJ0TWFuYWdlckNoYXJ0LCBzb3VyY2VBeGlzOiBTY2FsZSwgc2VyaWU6IEJhc2VTZXJpZXMsIHRhcmdldENoYXJ0IDogSUNoYXJ0TWFuYWdlckNoYXJ0LCB0YXJnZXRBeGlzOiBTY2FsZSwgaW5zZXJ0VHlwZTogc3RyaW5nKXtcclxuICAgIC8vIGN1cnJlbnRseSBvbmx5IGNoYW5nZWQgZXZlbnQgd2lsbCByYWlzZWQgKG1vdmluZyBpcyBkb25lIGJ5IHN5bmNmdXNpb24gdHJlZWdyaWQhISEpIFxyXG4gICAgdmFyIGV2ZW50QXJncyA9IG5ldyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3ModGhpcywgTW9kZWxDaGFuZ2VUeXBlLnVwZGF0ZVRhcmdldCwgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQubW92ZVNlcmllLCB7ZGF0YTogdGhpcy5kYXRhLCBjaGFydDogc291cmNlQ2hhcnQsIHRhcmdldENoYXJ0OiB0YXJnZXRDaGFydCwgc2VyaWU6IHNlcmllLCB0YXJnZXRBeGlzOiB0YXJnZXRBeGlzfSk7XHJcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMsIGV2ZW50QXJncyk7ICBcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgY2hhcnQgZGlzYWJsZWQgb3IgZW5hYmxlZFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtJQ2hhcnRNYW5hZ2VyQ2hhcnR9IGNoYXJ0XHJcbiAgICogQHBhcmFtIHtib29sZWFufSBkaXNhYmxlZFxyXG4gICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICAvKmRpc2FibGVDaGFydChjaGFydDogSUNoYXJ0TWFuYWdlckNoYXJ0LCBkaXNhYmxlZDogYm9vbGVhbil7XHJcbiAgICBjaGFydC5zZXREaXNhYmxlZChkaXNhYmxlZCk7XHJcbiAgICB2YXIgZXZlbnRBcmdzID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5kaXNhYmxlQ2hhcnQsIHtkYXRhOiB0aGlzLmRhdGF9KTtcclxuICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcywgZXZlbnRBcmdzKTsgIFxyXG4gIH0qL1xyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBjaGFydCB3aXRoIHRoZSBnaXZlbiBuYW1lIG9yIHVuZGVmaW5lZCBpZiBub3QgZm91bmRcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjaGFydE5hbWVcclxuICAgKiBAcmV0dXJucyB7KElDaGFydE1hbmFnZXJDaGFydHx1bmRlZmluZWQpfVxyXG4gICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBnZXRDaGFydChjaGFydE5hbWU6IHN0cmluZyk6IElDaGFydE1hbmFnZXJDaGFydHx1bmRlZmluZWR7XHJcbiAgICBmb3IgKGxldCBjaGFydCBvZiAgdGhpcy5kYXRhKSB7XHJcbiAgICAgIGlmKGNoYXJ0Lm5hbWUgPT0gY2hhcnROYW1lKXtcclxuICAgICAgICByZXR1cm4gY2hhcnQ7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBhIHVuaXF1ZSBjaGFydCBuYW1lIChlLmcgXCJDaGFydCAxXCIsIFwiY2hhcnQgMlwiLCAuLi4pXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBnZXRVbmlxdWVDaGFydE5hbWUoKTogc3RyaW5ne1xyXG4gICAgZm9yKHZhciBpPTE7IDE8MTAwMDsgaSsrKXtcclxuICAgICAgdmFyIG5ld2NoYXJ0TmFtZSA9IFwiQ2hhcnQgXCIraTtcclxuICAgICAgdmFyIGNoYXJ0TmFtZUFscmVhZHlFeGlzdHMgPSBmYWxzZTtcclxuICAgICAgZm9yIChsZXQgY2hhcnQgb2YgdGhpcy5kYXRhKXtcclxuICAgICAgICBpZihjaGFydC5uYW1lID09IG5ld2NoYXJ0TmFtZSl7XHJcbiAgICAgICAgICBjaGFydE5hbWVBbHJlYWR5RXhpc3RzID0gdHJ1ZTsgIFxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmKGNoYXJ0TmFtZUFscmVhZHlFeGlzdHMgPT0gZmFsc2UpXHJcbiAgICAgICAgcmV0dXJuIG5ld2NoYXJ0TmFtZTtcclxuICAgIH1cclxuICAgIHJldHVybiBcIkNoYXJ0IDEwMDBcIjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgYWxsIGNoYXJ0cyB3aGljaCB3b3JrIHdpdGggdGhlIGdpdmVuIHNlcmllXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0FycmF5PEJhc2VTZXJpZXM+fSBzZXJpZVxyXG4gICAqIEByZXR1cm5zIHtBcnJheTxJQ2hhcnRNYW5hZ2VyQ2hhcnQ+fVxyXG4gICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0Q2hhcnRzVXNpbmdTZXJpZShzZXJpZSA6IEFycmF5PEJhc2VTZXJpZXM+KTogQXJyYXk8SUNoYXJ0TWFuYWdlckNoYXJ0PntcclxuICAgIGxldCBjaGFydHMgPSBuZXcgQXJyYXk8SUNoYXJ0TWFuYWdlckNoYXJ0PigpO1xyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuZGF0YS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgIGxldCBjaGFydDogSUNoYXJ0TWFuYWdlckNoYXJ0ID0gdGhpcy5kYXRhW2ldO1xyXG4gICAgICBpZihjaGFydC5oYXNTZXJpZXMoc2VyaWUpKXtcclxuICAgICAgICBjaGFydHMucHVzaChjaGFydCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjaGFydHM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGFsbCBjaGFydHMgd2hpY2ggaGF2ZSB0aGUgZ2l2ZW4gc2VyaWVcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgKiBAcmV0dXJucyB7QXJyYXk8SUNoYXJ0TWFuYWdlckNoYXJ0Pn1cclxuICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgcHVibGljIGdldENoYXJ0c1dpdGhTZXJpZShzZXJpZSA6IEJhc2VTZXJpZXMpOiBBcnJheTxJQ2hhcnRNYW5hZ2VyQ2hhcnQ+e1xyXG4gICAgbGV0IGNoYXJ0cyA9IG5ldyBBcnJheTxJQ2hhcnRNYW5hZ2VyQ2hhcnQ+KCk7XHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5kYXRhLmxlbmd0aDsgaSsrKXtcclxuICAgICAgbGV0IGNoYXJ0ID0gdGhpcy5kYXRhW2ldO1xyXG4gICAgICBpZihjaGFydC5oYXNTZXJpZShzZXJpZSkpe1xyXG4gICAgICAgIGNoYXJ0cy5wdXNoKGNoYXJ0KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNoYXJ0cztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25TZXJpZURhdGFDaGFuZ2VkKHNlbmRlcjogQmFzZVNlcmllcywgYXJnczogRXZlbnRTZXJpZURhdGFDaGFuZ2VkQXJncyl7XHJcbiAgICBpZihhcmdzLmFjdGlvbiA9PSBTZXJpZUFjdGlvbi5yZW5hbWUpe1xyXG4gICAgICB2YXIgZXZlbnRBcmdzID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5yZW5hbWVTaWduYWwsIHtkYXRhOiB0aGlzLmRhdGF9KTtcclxuICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBldmVudEFyZ3MpOyAgXHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKGFyZ3MuYWN0aW9uID09IFNlcmllQWN0aW9uLnN0YXJ0VHJpZ2dlclRpbWVDaGFuZ2VkKXtcclxuICAgICAgdmFyIGV2ZW50QXJncyA9IG5ldyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3ModGhpcywgTW9kZWxDaGFuZ2VUeXBlLnVwZGF0ZVRhcmdldCwgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQuc3RhcnRUcmlnZ2VyVGltZUNoYW5nZWQsIHtkYXRhOiB0aGlzLmRhdGF9KTtcclxuICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBldmVudEFyZ3MpOyAgXHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKGFyZ3MuYWN0aW9uID09IFNlcmllQWN0aW9uLmNvbG9yQ2hhbmdlZCl7XHJcbiAgICAgIHZhciBldmVudEFyZ3MgPSBuZXcgRXZlbnRNb2RlbENoYW5nZWRBcmdzKHRoaXMsIE1vZGVsQ2hhbmdlVHlwZS51cGRhdGVUYXJnZXQsIENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LmNvbG9yQ2hhbmdlZCwge2RhdGE6IHRoaXMuZGF0YX0pO1xyXG4gICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMsIGV2ZW50QXJncyk7ICBcclxuICAgIH1cclxuICAgIGVsc2UgaWYoYXJncy5hY3Rpb24gPT0gU2VyaWVBY3Rpb24uZGF0YVBvaW50c0NoYW5nZWQpeyAvLyBOZWVkZWQgZm9yIHNob3dpbmcgY29ycmVjdCB2YWxpZC9pbnZhbGlkIGljb24gaW4gY2hhcnRtYW5hZ2VyIGlmIGRhdGEgY2hhbmdlc1xyXG4gICAgICB2YXIgZXZlbnRBcmdzID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5kYXRhUG9pbnRzQ2hhbmdlZCwge2RhdGE6IHRoaXMuZGF0YX0pO1xyXG4gICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMsIGV2ZW50QXJncyk7ICBcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25TY2FsZURhdGFDaGFuZ2VkKHNlbmRlcjogU2NhbGUsIGFyZ3M6IEV2ZW50U2NhbGVEYXRhQ2hhbmdlZEFyZ3Mpe1xyXG4gICAgaWYoYXJncy5hY3Rpb24gPT0gU2NhbGVBY3Rpb24ueFJhbmdlQ2hhbmdlZCAmJiBhcmdzLmRhdGEuc2NhbGUucGFyZW50LmNoYXJ0VHlwZSAhPSBDaGFydFR5cGUuWFlDaGFydCl7XHJcbiAgICAgIHZhciBldmVudEFyZ3MgPSBuZXcgRXZlbnRNb2RlbENoYW5nZWRBcmdzKHRoaXMsIE1vZGVsQ2hhbmdlVHlwZS51cGRhdGVUYXJnZXQsIENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LnVwZGF0ZVNjYWxlUmFuZ2UsIHtkYXRhOiB0aGlzLmRhdGEsIHNjYWxlOiBzZW5kZXJ9KTtcclxuICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBldmVudEFyZ3MpOyAgXHJcbiAgICB9XHJcbiAgICBpZihhcmdzLmFjdGlvbiA9PSBTY2FsZUFjdGlvbi55UmFuZ2VDaGFuZ2VkKXtcclxuICAgICAgdmFyIGV2ZW50QXJncyA9IG5ldyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3ModGhpcywgTW9kZWxDaGFuZ2VUeXBlLnVwZGF0ZVRhcmdldCwgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQuZGVmYXVsdCwge2RhdGE6IHRoaXMuZGF0YSwgc2NhbGU6IHNlbmRlcn0pO1xyXG4gICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMsIGV2ZW50QXJncyk7ICBcclxuICAgIH1cclxuXHJcbiAgICBpZihhcmdzLmFjdGlvbiA9PSBTY2FsZUFjdGlvbi54UmFuZ2VDaGFuZ2VkICYmIGFyZ3MuZGF0YS5zY2FsZS5wYXJlbnQuY2hhcnRUeXBlID09IENoYXJ0VHlwZS5YWUNoYXJ0KXtcclxuICAgICAgdmFyIGV2ZW50QXJncyA9IG5ldyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3ModGhpcywgTW9kZWxDaGFuZ2VUeXBlLnVwZGF0ZVRhcmdldCwgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQuZGVmYXVsdCwge2RhdGE6IHRoaXMuZGF0YSwgc2NhbGU6IHNlbmRlcn0pO1xyXG4gICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMsIGV2ZW50QXJncyk7ICBcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19