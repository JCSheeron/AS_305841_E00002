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
define(["require", "exports", "../../common/dateTimeHelper", "../../models/common/point", "../../common/colorHelper", "../common/busyInformation", "../../models/chartManagerDataModel/chartManagerChart", "../../models/diagnostics/trace/traceConfig/traceConfigDefines", "../common/viewBase", "../chartViewWidget/helpers/chartDropHelper", "../chartViewWidget/insertedInfo", "../../models/chartManagerDataModel/scale", "../chartWidget/ChartBase", "../common/SerieChartTypeHelper", "../../models/signalManagerDataModel/signalManagerCalculation", "../../models/signalManagerDataModel/signalCategory", "../../models/common/signal/serieGroup", "../../models/common/signal/signal", "../../models/common/series/seriesType", "./componentDefaultDefinition", "../../common/seriesHelper", "../../models/common/calculatorProvider/calculators/xyCalculator", "../../models/common/calculatorProvider/calculators/fftCalculator"], function (require, exports, dateTimeHelper_1, point_1, colorHelper_1, busyInformation_1, chartManagerChart_1, traceConfigDefines_1, viewBase_1, chartDropHelper_1, insertedInfo_1, scale_1, ChartBase_1, SerieChartTypeHelper_1, signalManagerCalculation_1, signalCategory_1, serieGroup_1, signal_1, seriesType_1, componentDefaultDefinition_1, seriesHelper_1, xyCalculator_1, fftCalculator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TraceViewWidget = /** @class */ (function (_super) {
        __extends(TraceViewWidget, _super);
        function TraceViewWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._isLoadingTraceData = false;
            _this._widgetIsActive = true;
            // Event handlers
            _this._contentActivatedHandler = function (sender, args) { return _this.onContentActivated(sender, args); };
            _this._chartViewWidgetDropChangedHandler = function (sender, args) { return _this.onDropChanged(sender, args); };
            _this._signalManagerWidgetSerieDoubleClickedHandler = function (sender, data) { return _this.onSignalManagerWidgetSerieDoubleClicked(sender, data); };
            _this._signalManagerWidgetChangeSizeHandler = function (sender, data) { return _this.onSignalManagerWidgetChangeSize(sender, data); };
            _this._signalManagerSignalRemovedHandler = function (sender, data) { return _this.onSignalManagerSignalRemoved(sender, data); };
            _this._chartManagerWidgetdropHelperHandler = function (sender, args) { return _this.onDropChanged(sender, args); };
            _this._traceState = "";
            return _this;
        }
        TraceViewWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
            this.component.disablePersisting();
        };
        /**
         * Sets the widget content and eventually subwidgets
         *
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            this.initLayoutWidget();
            this.setSeriesProvider();
            this.setTraceControlWidget();
            this.setInnerWidgets();
        };
        TraceViewWidget.prototype.initLayoutWidget = function () {
            this._layoutWidget = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.SplitterWidgetTraceViewId);
            this.attachLayoutToView(this);
            this._layoutWidget.initialize();
            // add widget to the parent container
            this._layoutWidget.addToParentContainer(this.mainDiv);
            this._layoutWidget.eventWidgetActivated.attach(this._contentActivatedHandler);
        };
        /**
         * Sets the inner widgets (signalmanager, chart view, chartmanager/cursorinfo)
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.setInnerWidgets = function () {
            // Create left widget
            this.setSignalManagerWidget();
            this.attachSignalManagerWidgetEvents();
            // Create the middle widget
            this.setChartViewWidget();
            // Create the widgets on the right side
            this.setRightWidgets();
            this.attachSignalManagerDataModelEvents();
        };
        /**
         * Sets the right widgets (chartmanager, cursorinfo)
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.setRightWidgets = function () {
            // Sets the chart manager widget on top
            this.setChartManagerWidget();
        };
        /**
         * Sets the seriesProvider
         *
         * @returns {*}
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.setSeriesProvider = function () {
            this._seriesProvider = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.SeriesProviderId);
        };
        /**
         * Sets the trace control widget
         *
         * @returns {*}
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.setTraceControlWidget = function () {
            this._traceControlWidget = this.getWidgetById(componentDefaultDefinition_1.ComponentDefaultDefinition.TraceControlWidgetId);
        };
        /**
         * Sets the signal manager widget
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.setSignalManagerWidget = function () {
            this._signalManagerWidget = this.getWidgetById(componentDefaultDefinition_1.ComponentDefaultDefinition.SignalManagerWidgetId);
            this._signalManagerDataModel = this._signalManagerWidget.dataModel;
        };
        /**
         * Sets the chart view widget
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.setChartViewWidget = function () {
            this._chartViewWidget = this.getWidgetById(componentDefaultDefinition_1.ComponentDefaultDefinition.ChartViewWidgetId);
            this._chartViewWidget.eventDropHelper.attach(this._chartViewWidgetDropChangedHandler);
        };
        /**
         * Sets the chart manager widget
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.setChartManagerWidget = function () {
            this._chartManagerWidget = this.getWidgetById(componentDefaultDefinition_1.ComponentDefaultDefinition.ChartManagerWidgetId);
            this._chartManagerWidget.eventDropHelper.attach(this._chartManagerWidgetdropHelperHandler);
            this._chartManagerDataModel = this._chartManagerWidget.dataModel;
        };
        /**
         * Activate the widget
         *
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.activate = function () {
            this._layoutWidget.activate();
        };
        TraceViewWidget.prototype.dispose = function () {
            this._widgetIsActive = false;
            this._layoutWidget.dispose();
            // Detach events
            this.detachEvents();
            // Dispose provider
            this.disposeProviders();
            // Dispose datamodels
            this.disposeDataModels();
            _super.prototype.dispose.call(this);
        };
        /**
         * Detaches all events
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.detachEvents = function () {
            this.detachChartViewWidgetEvents();
            this.detachSignalManagerWidgetEvents();
            this.detachSignalManagerDataModelEvents();
            this.detachChartManagerWidgetEvents();
            this._layoutWidget.eventWidgetActivated.detach(this._contentActivatedHandler);
        };
        TraceViewWidget.prototype.disposeProviders = function () {
            if (this._seriesProvider != undefined) {
                // TODO: Last user must dispose
                this.component.componentFactory.disposeComponent("SeriesProvider");
            }
        };
        /**
         * Dispose all data models
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.disposeDataModels = function () {
            // TODO: Dispose datamodels central
            if (this._signalManagerDataModel != undefined) {
                this._signalManagerDataModel.dispose();
            }
            if (this._chartManagerDataModel != undefined) {
                // TODO: Last user must dispose
                // TODO: only needed to remove singleton instance of chartmanagerDataModel
                this.component.componentFactory.disposeComponent("ChartManagerDataModel");
            }
        };
        /** resizes the trace configuration widget
         *
         * @param {number} width
         * @param {number} height
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.resize = function (width, height) {
            this._actualWidth = width;
            this._actualHeight = height;
            if (this._layoutWidget != undefined) {
                this._layoutWidget.resize(width, height);
            }
        };
        TraceViewWidget.prototype.onContentActivated = function (sender, args) {
            args.widget.activate();
            this.resize(this._actualWidth, this._actualHeight);
        };
        TraceViewWidget.prototype.detachChartViewWidgetEvents = function () {
            if (this._chartViewWidget != undefined) {
                this._chartViewWidget.eventDropHelper.detach(this._chartViewWidgetDropChangedHandler);
            }
        };
        /**
         * Called when a D&D operation has been done
         *
         * @private
         * @param {*} sender
         * @param {*} args
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.onDropChanged = function (chartManagerDataModel, args) {
            switch (args.hint) {
                case chartDropHelper_1.ChartDropHelperChangedHint.createChart: {
                    //creates a chart an adds its series
                    var chartName = chartManagerDataModel.getUniqueChartName();
                    var chartManagerChart = new chartManagerChart_1.ChartManagerChart(chartName, args.data.type);
                    chartManagerChart.addDefaultYScale(this._chartManagerDataModel);
                    chartManagerDataModel.addChart(chartManagerChart, -1);
                    if (args.data.series != undefined) {
                        var yAxisId = chartManagerChart.getDefaultYAxisId();
                        var series = args.data.series;
                        if (args.data.type != chartManagerChart_1.ChartType.YTChart && args.data.series[0].type == seriesType_1.SeriesType.timeSeries) {
                            this._signalManagerWidget.enableTreeGridRefresh(false);
                            if (args.data.type == chartManagerChart_1.ChartType.XYChart) {
                                series = new Array();
                                var xySeries = this.createXYSerie(args.data.series[0].parent, args.data.series);
                                if (xySeries != undefined) {
                                    series.push(xySeries);
                                }
                            }
                            else if (args.data.type == chartManagerChart_1.ChartType.FFTChart) {
                                series = new Array();
                                for (var i = 0; i < args.data.series.length; i++) {
                                    var fftSeries = this.createFFTSerie(args.data.series[i].parent, args.data.series[i]);
                                    if (fftSeries != undefined) {
                                        series.push(fftSeries);
                                    }
                                }
                            }
                            this._signalManagerWidget.enableTreeGridRefresh(true);
                            if (!this._signalManagerWidget.editModeActive && args.data.type == chartManagerChart_1.ChartType.XYChart) {
                                this._signalManagerWidget.activateEditMode(true);
                            }
                        }
                        //Add all dragged series to the chart.
                        this.addSerieToChart(chartManagerDataModel, series, chartManagerChart, yAxisId);
                    }
                    break;
                }
                case chartDropHelper_1.ChartDropHelperChangedHint.addSerie: {
                    var series = args.data.series;
                    var chart = args.data.chart;
                    var yAxis = args.data.yAxis;
                    if (chart != undefined) {
                        //target chart may not be provided by the event args
                        if (args.data.targetChart == undefined) {
                            if (this._chartViewWidget != undefined) {
                                args.data.targetChart = this._chartViewWidget.getTraceChartByName(chart.name);
                            }
                        }
                        //if target chart still does not exist dont try to add the series to anything
                        if (args.data.targetChart != undefined) {
                            var yAxisId = this.getYAxisId(chartManagerDataModel, chart, yAxis, args.data.targetChart);
                            //insert serie to empty a chart
                            this.addSerieToChart(chartManagerDataModel, series, chart, yAxisId);
                        }
                    }
                    break;
                }
                case chartDropHelper_1.ChartDropHelperChangedHint.createXYSerie: {
                    //Creates XY serie and adds it to the XY chart
                    var chartManagerChart = args.data.chart;
                    var series = new Array();
                    var xySeries = this.createXYSerie(args.data.series[0].parent, args.data.series);
                    if (xySeries != undefined) {
                        series.push(xySeries);
                    }
                    var yAxisId = chartManagerChart.getDefaultYAxisId();
                    //Add all dragged series to the chart.
                    this.addSerieToChart(chartManagerDataModel, series, chartManagerChart, yAxisId);
                    break;
                }
                case chartDropHelper_1.ChartDropHelperChangedHint.createFFTSerie: {
                    //Creates FFT serie and add it to the FFT chart
                    var chart = args.data.chart;
                    var series = new Array();
                    for (var i = 0; i < args.data.series.length; i++) {
                        var fftSeries = this.createFFTSerie(args.data.series[i].parent, args.data.series[i]);
                        if (fftSeries != undefined) {
                            series.push(fftSeries);
                        }
                    }
                    var yAxis = args.data.yAxis;
                    //target chart may not be provided by the event args
                    if (args.data.targetChart == undefined) {
                        if (this._chartViewWidget != undefined) {
                            args.data.targetChart = this._chartViewWidget.getTraceChartByName(chart.name);
                        }
                    }
                    //if target chart still does not exist dont try to add the series to anything
                    if (args.data.targetChart != undefined) {
                        var yAxisId = this.getYAxisId(chartManagerDataModel, chart, yAxis, args.data.targetChart);
                        //Add all dragged series to the chart.
                        this.addSerieToChart(chartManagerDataModel, series, chart, yAxisId);
                    }
                }
            }
        };
        /**
         * Attaches the signal manager widget events
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.attachSignalManagerWidgetEvents = function () {
            if (this._signalManagerWidget != undefined) {
                this._signalManagerWidget.eventSerieDoubleClicked.attach(this._signalManagerWidgetSerieDoubleClickedHandler);
                this._signalManagerWidget.eventChangeSize.attach(this._signalManagerWidgetChangeSizeHandler);
            }
        };
        /**
         * Detaches the signal manager widget events
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.detachSignalManagerWidgetEvents = function () {
            if (this._signalManagerWidget != undefined) {
                this._signalManagerWidget.eventSerieDoubleClicked.detach(this._signalManagerWidgetSerieDoubleClickedHandler);
                this._signalManagerWidget.eventChangeSize.detach(this._signalManagerWidgetChangeSizeHandler);
            }
        };
        TraceViewWidget.prototype.onSignalManagerWidgetSerieDoubleClicked = function (sender, serie) {
            this.addNewChart(this._chartManagerWidget.dataModel, serie);
        };
        TraceViewWidget.prototype.onSignalManagerWidgetChangeSize = function (sender, newSize) {
            // get parent(splitter) widget of sender(signalManager)
            var innerLayoutSplitterWidget = this.getWidgetById(componentDefaultDefinition_1.ComponentDefaultDefinition.SplitterWidgetMainTraceId);
            // change size of splitter pane
            innerLayoutSplitterWidget.resizeWidget(sender, newSize);
        };
        /**
         * Adds a new chart to the chartmanager datamodel(if possible => max chart number) and adds the given signal to the new chart
         *
         * @private
         * @param {BaseSeries} serie
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.addNewChart = function (chartManagerDataModel, serie) {
            if (chartManagerDataModel) {
                var newChartName = chartManagerDataModel.getUniqueChartName();
                var serieChartType = SerieChartTypeHelper_1.SerieChartTypeHelper.getSerieChartType(serie.type);
                var newChart = new chartManagerChart_1.ChartManagerChart(newChartName, serieChartType);
                newChart.addDefaultYScale(this._chartManagerDataModel);
                var isChartAdded = chartManagerDataModel.addChart(newChart, 0);
                if (serie != undefined && isChartAdded) {
                    var series = new Array();
                    series.push(serie);
                    var yAxis = newChart.getYScale(newChart.getDefaultYAxisId());
                    if (yAxis != undefined) {
                        this.addSerieToChart(chartManagerDataModel, series, newChart, yAxis.id);
                    }
                    else {
                        console.error("Default yAxis not available!");
                    }
                }
            }
        };
        /**
         * Add serie to chart (one by one)
         *
         * @private
         * @param {Array<BaseSeries>} series
         * @param {(IChartManagerChart | undefined)} chartManagerChart
         * @param {string} yAxisId
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.addSerieToChart = function (chartManagerDataModel, series, chartManagerChart, yAxisId) {
            var yAxis = chartManagerChart.getYScale(yAxisId);
            var insertedInfo = new insertedInfo_1.InsertedInfo(series, yAxis, chartManagerChart);
            if (insertedInfo != undefined && insertedInfo.yAxis != undefined && insertedInfo.chart != undefined) {
                chartManagerDataModel.addSeriesToChart(insertedInfo.chart, insertedInfo.series, insertedInfo.yAxis);
            }
        };
        TraceViewWidget.prototype.createXYSerie = function (container, series) {
            if (this._seriesProvider == undefined) {
                return undefined;
            }
            // create calculation
            var calculation = new signalManagerCalculation_1.SignalManagerCalculation("Calculation", this._seriesProvider);
            // add calculation to container
            container.addSerieContainer(calculation, -1);
            // set calculation type
            calculation.setCalculatorTypeById(xyCalculator_1.XYCalculator.id);
            // set calculation input data
            if (series.length > 0 && series[0] != undefined) {
                calculation.setInputValueById(xyCalculator_1.XYCalculator.inputIdXSignal, series[0].name);
            }
            if (series.length > 1 && series[1] != undefined) {
                calculation.setInputValueById(xyCalculator_1.XYCalculator.inputIdYSignal, series[1].name);
            }
            // Return calculation output data 
            return calculation.getOutputCalculationData()[0].serie;
        };
        /**
         * Create FFT output serie
         *
         * @private
         * @param {ISerieContainer} container
         * @param {BaseSeries} series
         * @returns
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.createFFTSerie = function (container, series) {
            if (this._seriesProvider == undefined) {
                return undefined;
            }
            // create calculation
            var calculation = new signalManagerCalculation_1.SignalManagerCalculation("Calculation", this._seriesProvider);
            // add calculation to container
            container.addSerieContainer(calculation, -1);
            // set calculation type
            calculation.setCalculatorTypeById(fftCalculator_1.FftCalculator.id);
            // set calculation input data
            calculation.setInputValueById(fftCalculator_1.FftCalculator.inputIdSignal, series.name);
            // Change output data name and color of new FFT calculation
            var inputData = calculation.getInputCalculationData();
            var outputData = calculation.getOutputCalculationData();
            if (inputData[0].serie != undefined && inputData[0].serie.rawPointsValid) {
                var outputData_1 = calculation.getOutputCalculationData();
                if (outputData_1.length > 0) {
                    outputData_1[0].color = inputData[0].serie.color;
                    outputData_1[0].value = 'FFT(' + inputData[0].serie.name + ') ' + calculation.serie.calculationDataInfo.uniqueId;
                }
            }
            // Return calculation output data 
            return outputData[0].serie;
        };
        /**
         *
         *
         * @private
         * @param {IChartManagerDataModel} chartManagerDataModel
         * @param {IChartManagerChart} chart
         * @param {(Scale | undefined)} yAxis
         * @param {(ITraceChart | undefined)} targetChart
         * @returns {string}
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.getYAxisId = function (chartManagerDataModel, chart, yAxis, targetChart) {
            var yAxisId;
            if (yAxis != undefined) {
                chart = yAxis.parent;
                yAxisId = yAxis.id;
            }
            else {
                yAxisId = this.getYScaleId(chartManagerDataModel, chart, targetChart);
                if (yAxisId == undefined) {
                    // Create new scale
                    yAxisId = chart.getNextYAxisId();
                    var newYAxis = new scale_1.Scale(yAxisId, chart);
                    chartManagerDataModel.addYScale(chart, newYAxis);
                }
            }
            return yAxisId;
        };
        /**
         * Return yAxis id when serie is dropped in the chart view
         *
         * @private
         * @param {DataModels.IChartManagerDataModel} chartManagerDataModel
         * @param {IChartManagerChart} chartManagerChart
         * @param {*} targetChart
         * @returns {string}
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.getYScaleId = function (chartManagerDataModel, chartManagerChart, targetChart) {
            var yAxisId;
            if (chartManagerChart.chartType == chartManagerChart_1.ChartType.XYChart) {
                yAxisId = chartManagerChart.getDefaultYAxisId();
            }
            else {
                //adding series to YT charts
                var objectUnderMouse = targetChart.getChartObjectUnderMouse(targetChart.chartInstance.mousemoveX, targetChart.chartInstance.mousemoveY);
                if (objectUnderMouse.chartObjectType == ChartBase_1.ChartObjectType.axis) {
                    // get axis id
                    yAxisId = objectUnderMouse.args.axis.getAxisID();
                }
                else if (objectUnderMouse.chartObjectType == ChartBase_1.ChartObjectType.chartSpace) {
                    // create new axis
                    yAxisId = chartManagerChart.getNextYAxisId();
                    var newYAxis = new scale_1.Scale(yAxisId, chartManagerChart);
                    chartManagerDataModel.addYScale(chartManagerChart, newYAxis);
                }
            }
            return yAxisId;
        };
        /**
         * Attaches the signal manager datamodel events
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.attachSignalManagerDataModelEvents = function () {
            if (this._signalManagerDataModel) {
                this._signalManagerDataModel.eventSignalRemoved.attach(this._signalManagerSignalRemovedHandler);
            }
        };
        /**
         * Detaches the signal manager datamodel events
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.detachSignalManagerDataModelEvents = function () {
            if (this._signalManagerDataModel) {
                this._signalManagerDataModel.eventSignalRemoved.detach(this._signalManagerSignalRemovedHandler);
            }
        };
        TraceViewWidget.prototype.onSignalManagerSignalRemoved = function (sender, serie) {
            if (this._chartManagerDataModel) {
                this._chartManagerDataModel.removeSerieFromAllCharts(serie);
            }
        };
        /**
         * Detaches the chart manager widget events
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.detachChartManagerWidgetEvents = function () {
            this._chartManagerWidget.eventDropHelper.detach(this._chartManagerWidgetdropHelperHandler);
        };
        Object.defineProperty(TraceViewWidget.prototype, "activeComponent", {
            set: function (activeComponent) {
                var _this = this;
                this._activeComponent = activeComponent;
                this._activeComponent.value.initialize().then(function () {
                    _this._activeComponent.changed(function () {
                        var currentActiveComponent = _this._activeComponent.value;
                        if (currentActiveComponent.traceControlInterface != undefined) {
                            _this.traceControlInterface = currentActiveComponent.traceControlInterface;
                        }
                        if (currentActiveComponent.traceParameters != undefined) {
                            _this.traceParametersInterface = currentActiveComponent.traceParameters;
                        }
                    });
                });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TraceViewWidget.prototype, "traceParametersInterface", {
            set: function (traceParameterInterface) {
                var _this = this;
                traceParameterInterface.changed(function (traceParameterInterface) {
                    try {
                        _this.availableDataPoints = traceParameterInterface.availableTraceDataPoints;
                    }
                    catch (error) {
                        console.log(error);
                    }
                });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TraceViewWidget.prototype, "availableDataPoints", {
            /**
             * Sets the available trace datapoints to the trace view widget
             *
             * @memberof TraceViewWidget
             */
            set: function (availableTraceDataPoints) {
                var _this = this;
                availableTraceDataPoints.changed(function (dataPoints) {
                    _this._traceDataPointInfos = dataPoints;
                });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TraceViewWidget.prototype, "traceControlInterface", {
            /**
             * Sets and defines the interface to the trace control
             *
             * @memberof TraceViewWidget
             */
            set: function (traceComponentControl) {
                this.connectTraceControlWidget(traceComponentControl);
                this.connectTraceViewWidgetToTraceState();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Start loading trace data from target
         *
         * @private
         * @returns
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.loadTraceDataFromTarget = function () {
            if (this._isLoadingTraceData == true || this._widgetIsActive == false) {
                return;
            }
            this._isLoadingTraceData = true;
            this._traceControlWidget.setBusyInformation(new busyInformation_1.BusyInformation("Loading trace data", busyInformation_1.ImageId.defaultImage, 25, false));
            this._traceControlWidget.setBusy(true);
            // invoke loading trace data
            this.invokeLoadTraceData();
        };
        TraceViewWidget.prototype.invokeLoadTraceData = function () {
            // BINDINGSOURCE: method for dispatching the call to a bound target
        };
        /**
         * Informations if loading of trace data from target failed
         *
         * @private
         * @param {*} errorData
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.onErrorLoadingTraceData = function (errorData) {
            this._isLoadingTraceData = false;
            this._traceControlWidget.setBusy(false);
        };
        /**
         * handles trace state changes
         *
         * @param {*} traceState
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.onTraceStateChanged = function (traceState, oldTraceState) {
            this._traceState = traceState;
            if (traceState == traceConfigDefines_1.TraceStateIds.Data_available && oldTraceState != traceConfigDefines_1.TraceStateIds.Data_available) {
                // Auto upload of trace data
                this.loadTraceDataFromTarget();
            }
        };
        /**
         * Informations(tracedata) from target after successful trace data upload
         *
         * @private
         * @param {*} result
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.onTraceDataLoaded = function (result) {
            var traceData = result;
            var addTraceDataToSignalManager = true;
            // check if data already in signalmanager datamodel
            if (traceData.traceChannels.length > 0 && traceData.traceChannels[0].tracePoints.length > 0) {
                var serieGroupId = traceData.triggerTime.toString();
                if (this._signalManagerDataModel != undefined) {
                    if (this._signalManagerDataModel["disposed"] != true) { // Bugfix to avoid use of not unbinded datamodel
                        var latestCategory = this._signalManagerDataModel.getSignalCategory(signalCategory_1.SignalCategory.CategoryIdRecent);
                        if (latestCategory != undefined) {
                            var serieContainer = latestCategory.getSerieContainerById(serieGroupId);
                            if (serieContainer != undefined) { // signal container already exists; needed to avoid duplicated signal containers if event comes multiple times
                                addTraceDataToSignalManager = false;
                            }
                        }
                    }
                }
                else {
                    console.error("signalManagerDataModel not available");
                }
            }
            if (addTraceDataToSignalManager == true) {
                if (traceData.traceChannels.length > 0 && traceData.traceChannels[0].tracePoints.length > 0) {
                    this.addTraceDataToSignalManager(traceData);
                }
            }
            this._isLoadingTraceData = false;
            this._traceControlWidget.setBusy(false);
        };
        /**
         * Adds the given trace data to the signal manager
         *
         * @private
         * @param {*} traceData
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.addTraceDataToSignalManager = function (traceData) {
            var id = traceData.triggerTime.toString();
            var newSerieGroup = new serieGroup_1.SerieGroup(dateTimeHelper_1.DateTimeHelper.getDateTime(traceData.triggerTime), id, traceData.triggerTime);
            var _loop_1 = function () {
                data = new Array();
                for (var j = 0; j < traceData.traceChannels[i].tracePoints.length; j++) {
                    xVal = (traceData.traceChannels[i].tracePoints[j].timeStamp - traceData.triggerTime) / 1000000;
                    yVal = traceData.traceChannels[i].tracePoints[j].dataValue;
                    data.push(new point_1.Point(xVal, yVal));
                }
                var newSignal = new signal_1.Signal(traceData.traceChannels[i].name, data);
                if (this_1._seriesProvider != undefined) {
                    var settings = seriesHelper_1.SeriesHelper.createSerieSettings(newSignal, newSignal.name, colorHelper_1.ColorHelper.getColor(), this_1._seriesProvider.getUniqueId(), seriesType_1.SeriesType.timeSeries);
                    var newSerie = this_1._seriesProvider.createSerie(settings);
                    if (newSerie != undefined) {
                        if (this_1._traceDataPointInfos != undefined) {
                            var tracePointInfos = this_1._traceDataPointInfos.filter(function (element) { return element.fullname == newSignal.name; });
                            if (tracePointInfos.length == 1) {
                                newSerie.name = tracePointInfos[0].componentName + ":" + tracePointInfos[0].name;
                                newSerie.description = tracePointInfos[0].description;
                            }
                        }
                        newSerieGroup.addSerie(newSerie);
                    }
                    else {
                        console.error("Creation of the serie was not possible!");
                    }
                }
                else {
                    console.error("SeriesProvider not available!");
                }
            };
            var this_1 = this, data, xVal, yVal;
            for (var i = 0; i < traceData.traceChannels.length; i++) {
                _loop_1();
            }
            this._signalManagerDataModel.addUploadedSerieGroup(newSerieGroup);
        };
        /**
         *   Connects the trace control widget to the trace control provider
         *
         * @param {ITraceComponentControl} traceComponentControl
         * @returns {*}
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.connectTraceControlWidget = function (traceComponentControl) {
            if (this._traceControlWidget) {
                this._traceControlWidget.traceControlInterface = this.getInterfaceWithoutSaveCommand(traceComponentControl);
            }
        };
        /**
         * Returns the trace component control with out the save/import/export trace configuration command
         *
         * @private
         * @param {ITraceComponentControl} traceComponentControl
         * @returns {*}
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.getInterfaceWithoutSaveCommand = function (traceComponentControl) {
            return {
                commandForceStart: traceComponentControl.commandForceStart,
                commandForceStop: traceComponentControl.commandForceStop,
                traceState: traceComponentControl.traceState,
            };
        };
        /**
         *   Connects the TraceViewWidget to the trace control provider(trace state)
         *
         * @returns {*}
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.connectTraceViewWidgetToTraceState = function () {
            this._isLoadingTraceData = false;
            // load trace data initially if available
            if (this._traceState == traceConfigDefines_1.TraceStateIds.Data_available) {
                // Initial load trace data
                this.loadTraceDataFromTarget();
            }
        };
        return TraceViewWidget;
    }(viewBase_1.ViewBase));
    exports.TraceViewWidget = TraceViewWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VWaWV3V2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlVmlld1dpZGdldC90cmFjZVZpZXdXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQXNDQTtRQUE4QixtQ0FBUTtRQUF0QztZQUFBLHFFQXcwQkM7WUF6ekJXLHlCQUFtQixHQUFHLEtBQUssQ0FBQztZQUk1QixxQkFBZSxHQUFHLElBQUksQ0FBQztZQUUvQixpQkFBaUI7WUFDVCw4QkFBd0IsR0FBRyxVQUFDLE1BQU0sRUFBRSxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFyQyxDQUFxQyxDQUFDO1lBRW5GLHdDQUFrQyxHQUFHLFVBQUMsTUFBTSxFQUFFLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFoQyxDQUFnQyxDQUFDO1lBRXhGLG1EQUE2QyxHQUFHLFVBQUMsTUFBTSxFQUFFLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyx1Q0FBdUMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQTFELENBQTBELENBQUM7WUFDN0gsMkNBQXFDLEdBQUcsVUFBQyxNQUFNLEVBQUUsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLCtCQUErQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBbEQsQ0FBa0QsQ0FBQztZQUM3Ryx3Q0FBa0MsR0FBRyxVQUFDLE1BQU0sRUFBRSxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsNEJBQTRCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUEvQyxDQUErQyxDQUFDO1lBRXZHLDBDQUFvQyxHQUFHLFVBQUMsTUFBTSxFQUFFLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLElBQUksQ0FB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QUxoQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFOzthQThCdEQ7WUFDRCxJQUFJLENBQUMsdUJBQXVCLENBQUMscUJBQXFCLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdEUsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLG1EQUF5QixHQUFqQyxVQUFrQyxxQkFBNkM7WUFDM0UsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsOEJBQThCLENBQUMscUJBQXFCLENBQUMsQ0FBQzthQUMvRztRQUNMLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ssd0RBQThCLEdBQXRDLFVBQXVDLHFCQUE2QztZQUNoRixPQUFPO2dCQUNILGlCQUFpQixFQUFFLHFCQUFxQixDQUFDLGlCQUFpQjtnQkFDMUQsZ0JBQWdCLEVBQUUscUJBQXFCLENBQUMsZ0JBQWdCO2dCQUN4RCxVQUFVLEVBQUUscUJBQXFCLENBQUMsVUFBVTthQUMvQyxDQUFDO1FBQ04sQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ssNERBQWtDLEdBQTFDO1lBQ0ksSUFBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQztZQUVqQyx5Q0FBeUM7WUFDekMsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLGtDQUFhLENBQUMsY0FBYyxFQUFFO2dCQUNsRCwwQkFBMEI7Z0JBQzFCLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO2FBQ2xDO1FBQ0wsQ0FBQztRQUNMLHNCQUFDO0lBQUQsQ0FBQyxBQXgwQkQsQ0FBOEIsbUJBQVEsR0F3MEJyQztJQUVRLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUxheW91dFdpZGdldCB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9sYXlvdXRXaWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNlcmllc1Byb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vc2VyaWVzUHJvdmlkZXIvc2VyaWVzUHJvdmlkZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUNoYXJ0TWFuYWdlckNoYXJ0IH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvaW50ZXJmYWNlcy9jaGFydE1hbmFnZXJDaGFydEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJVHJhY2VDb21wb25lbnRDb250cm9sIH0gZnJvbSBcIi4uLy4uL21vZGVscy9kaWFnbm9zdGljcy90cmFjZS9pbnRlcmZhY2VzL3RyYWNlQ29udHJvbFByb3ZpZGVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVRyYWNlQ29tcG9uZW50UGFyYW1ldGVycyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvaW50ZXJmYWNlcy90cmFjZUNvbXBvbmVudFBhcmFtZXRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJVHJhY2VDaGFydCB9IGZyb20gXCIuLi9jaGFydFdpZGdldC9pbnRlcmZhY2VzL3RyYWNlQ2hhcnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNlcmllQ29udGFpbmVyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vaW50ZXJmYWNlcy9zZXJpZUNvbnRhaW5lckludGVyZmFjZVwiO1xyXG5cclxuaW1wb3J0IHsgUHJvcGVydHkgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL3Byb3BlcnR5XCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RpYWdub3N0aWNzL3RyYWNlL21hcHBDb2NrcGl0VHJhY2VDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgVHJhY2VEYXRhIH0gZnJvbSBcIi4uLy4uL21vZGVscy9kaWFnbm9zdGljcy90cmFjZS90cmFjZURhdGFSZWFkZXJcIjtcclxuaW1wb3J0IHsgRGF0ZVRpbWVIZWxwZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RhdGVUaW1lSGVscGVyXCI7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vcG9pbnRcIjtcclxuaW1wb3J0IHsgQ29sb3JIZWxwZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbG9ySGVscGVyXCI7XHJcbmltcG9ydCB7IEJ1c3lJbmZvcm1hdGlvbiwgSW1hZ2VJZCB9IGZyb20gXCIuLi9jb21tb24vYnVzeUluZm9ybWF0aW9uXCI7XHJcbmltcG9ydCB7IENoYXJ0TWFuYWdlckNoYXJ0LCBDaGFydFR5cGUgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9jaGFydE1hbmFnZXJDaGFydFwiO1xyXG5pbXBvcnQgeyBUcmFjZVN0YXRlSWRzIH0gZnJvbSBcIi4uLy4uL21vZGVscy9kaWFnbm9zdGljcy90cmFjZS90cmFjZUNvbmZpZy90cmFjZUNvbmZpZ0RlZmluZXNcIjtcclxuaW1wb3J0IHsgVHJhY2VEYXRhUG9pbnRJbmZvIH0gZnJvbSBcIi4uLy4uL21vZGVscy9kaWFnbm9zdGljcy90cmFjZS90cmFjZURhdGFQb2ludEluZm9cIjtcclxuaW1wb3J0IHsgVmlld0Jhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3ZpZXdCYXNlXCI7XHJcbmltcG9ydCB7IENoYXJ0RHJvcEhlbHBlckNoYW5nZWRIaW50IH0gZnJvbSBcIi4uL2NoYXJ0Vmlld1dpZGdldC9oZWxwZXJzL2NoYXJ0RHJvcEhlbHBlclwiO1xyXG5pbXBvcnQgeyBJbnNlcnRlZEluZm8gfSBmcm9tIFwiLi4vY2hhcnRWaWV3V2lkZ2V0L2luc2VydGVkSW5mb1wiO1xyXG5pbXBvcnQgeyBTY2FsZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL3NjYWxlXCI7XHJcbmltcG9ydCB7IENoYXJ0T2JqZWN0VHlwZSB9IGZyb20gXCIuLi9jaGFydFdpZGdldC9DaGFydEJhc2VcIjtcclxuaW1wb3J0IHsgU2VyaWVDaGFydFR5cGVIZWxwZXIgfSBmcm9tIFwiLi4vY29tbW9uL1NlcmllQ2hhcnRUeXBlSGVscGVyXCI7XHJcbmltcG9ydCB7IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbiB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25cIjtcclxuaW1wb3J0IHsgU2lnbmFsQ2F0ZWdvcnkgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsQ2F0ZWdvcnlcIjtcclxuaW1wb3J0IHsgU2VyaWVHcm91cCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3NpZ25hbC9zZXJpZUdyb3VwXCI7XHJcbmltcG9ydCB7IFNpZ25hbCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3NpZ25hbC9zaWduYWxcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3Nlcmllcy9zZXJpZXNUeXBlXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9zZXJpZXMvYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbiB9IGZyb20gXCIuL2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXCI7XHJcbmltcG9ydCAqIGFzIFdpZGdldHMgZnJvbSBcIi4uLy4uL3dpZGdldHMvd2lkZ2V0c1wiO1xyXG5pbXBvcnQgKiBhcyBEYXRhTW9kZWxzIGZyb20gJy4uLy4uL21vZGVscy9kYXRhTW9kZWxzJztcclxuaW1wb3J0IHsgU2VyaWVzSGVscGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJpZXNIZWxwZXJcIjtcclxuaW1wb3J0IHsgWFlDYWxjdWxhdG9yIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0b3JzL3h5Q2FsY3VsYXRvclwiO1xyXG5pbXBvcnQgeyBGZnRDYWxjdWxhdG9yIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0b3JzL2ZmdENhbGN1bGF0b3JcIjtcclxuXHJcbmNsYXNzIFRyYWNlVmlld1dpZGdldCBleHRlbmRzIFZpZXdCYXNlIHtcclxuXHJcbiAgICBwcml2YXRlIF9jaGFydE1hbmFnZXJEYXRhTW9kZWwhOiBEYXRhTW9kZWxzLklDaGFydE1hbmFnZXJEYXRhTW9kZWw7XHJcbiAgICBwcml2YXRlIF9jaGFydE1hbmFnZXJXaWRnZXQhOiBXaWRnZXRzLklDaGFydE1hbmFnZXJXaWRnZXQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfc2lnbmFsTWFuYWdlckRhdGFNb2RlbCE6IERhdGFNb2RlbHMuSVNpZ25hbE1hbmFnZXJEYXRhTW9kZWw7XHJcbiAgICBwdWJsaWMgX3NpZ25hbE1hbmFnZXJXaWRnZXQ/OiBXaWRnZXRzLklTaWduYWxNYW5hZ2VyV2lkZ2V0O1xyXG5cclxuICAgIHByaXZhdGUgX3Nlcmllc1Byb3ZpZGVyOiBJU2VyaWVzUHJvdmlkZXJ8dW5kZWZpbmVkO1xyXG5cclxuICAgIHByaXZhdGUgX2NoYXJ0Vmlld1dpZGdldD86IFdpZGdldHMuSUNoYXJ0Vmlld1dpZGdldDtcclxuXHJcbiAgICBwcml2YXRlIF9hY3RpdmVDb21wb25lbnQhOiBQcm9wZXJ0eTxNYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50PjtcclxuICAgIHByaXZhdGUgX3RyYWNlQ29udHJvbFdpZGdldCE6IFdpZGdldHMuSVRyYWNlQ29udHJvbFdpZGdldDtcclxuXHJcbiAgICBwcml2YXRlIF9pc0xvYWRpbmdUcmFjZURhdGEgPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIF90cmFjZURhdGFQb2ludEluZm9zOiBBcnJheTxUcmFjZURhdGFQb2ludEluZm8+IHwgdW5kZWZpbmVkO1xyXG5cclxuICAgIHByaXZhdGUgX3dpZGdldElzQWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAvLyBFdmVudCBoYW5kbGVyc1xyXG4gICAgcHJpdmF0ZSBfY29udGVudEFjdGl2YXRlZEhhbmRsZXIgPSAoc2VuZGVyLCBhcmdzKSA9PiB0aGlzLm9uQ29udGVudEFjdGl2YXRlZChzZW5kZXIsIGFyZ3MpO1xyXG5cclxuICAgIHByaXZhdGUgX2NoYXJ0Vmlld1dpZGdldERyb3BDaGFuZ2VkSGFuZGxlciA9IChzZW5kZXIsIGFyZ3MpID0+IHRoaXMub25Ecm9wQ2hhbmdlZChzZW5kZXIsIGFyZ3MpOyAgIFxyXG5cclxuICAgIHByaXZhdGUgX3NpZ25hbE1hbmFnZXJXaWRnZXRTZXJpZURvdWJsZUNsaWNrZWRIYW5kbGVyID0gKHNlbmRlciwgZGF0YSkgPT4gdGhpcy5vblNpZ25hbE1hbmFnZXJXaWRnZXRTZXJpZURvdWJsZUNsaWNrZWQoc2VuZGVyLCBkYXRhKTsgICAgIFxyXG4gICAgcHJpdmF0ZSBfc2lnbmFsTWFuYWdlcldpZGdldENoYW5nZVNpemVIYW5kbGVyID0gKHNlbmRlciwgZGF0YSkgPT4gdGhpcy5vblNpZ25hbE1hbmFnZXJXaWRnZXRDaGFuZ2VTaXplKHNlbmRlciwgZGF0YSk7ICAgICBcclxuICAgIHByaXZhdGUgX3NpZ25hbE1hbmFnZXJTaWduYWxSZW1vdmVkSGFuZGxlciA9IChzZW5kZXIsIGRhdGEpID0+IHRoaXMub25TaWduYWxNYW5hZ2VyU2lnbmFsUmVtb3ZlZChzZW5kZXIsIGRhdGEpOyAgICAgXHJcbiAgICBcclxuICAgIHByaXZhdGUgX2NoYXJ0TWFuYWdlcldpZGdldGRyb3BIZWxwZXJIYW5kbGVyID0gKHNlbmRlciwgYXJncykgPT4gdGhpcy5vbkRyb3BDaGFuZ2VkKHNlbmRlciwgYXJncyk7XHJcbiAgICBwcml2YXRlIF90cmFjZVN0YXRlOiBzdHJpbmc9XCJcIjtcclxuICBcclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXREZWZhdWx0RGVmaW5pdGlvbihuZXcgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24oKSk7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZGlzYWJsZVBlcnNpc3RpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHdpZGdldCBjb250ZW50IGFuZCBldmVudHVhbGx5IHN1YndpZGdldHNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemVkKCkge1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemVkKCk7XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdExheW91dFdpZGdldCgpO1xyXG5cclxuICAgICAgICB0aGlzLnNldFNlcmllc1Byb3ZpZGVyKCk7XHJcbiAgICAgICAgdGhpcy5zZXRUcmFjZUNvbnRyb2xXaWRnZXQoKTtcclxuICAgICAgICB0aGlzLnNldElubmVyV2lkZ2V0cygpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRMYXlvdXRXaWRnZXQoKSB7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0ID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLlNwbGl0dGVyV2lkZ2V0VHJhY2VWaWV3SWQpIGFzIElMYXlvdXRXaWRnZXQ7XHJcbiAgICAgICAgdGhpcy5hdHRhY2hMYXlvdXRUb1ZpZXcoPGFueT50aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5pbml0aWFsaXplKCk7XHJcbiAgICAgICAgLy8gYWRkIHdpZGdldCB0byB0aGUgcGFyZW50IGNvbnRhaW5lclxyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldC5hZGRUb1BhcmVudENvbnRhaW5lcih0aGlzLm1haW5EaXYpO1xyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldCEuZXZlbnRXaWRnZXRBY3RpdmF0ZWQuYXR0YWNoKHRoaXMuX2NvbnRlbnRBY3RpdmF0ZWRIYW5kbGVyKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBpbm5lciB3aWRnZXRzIChzaWduYWxtYW5hZ2VyLCBjaGFydCB2aWV3LCBjaGFydG1hbmFnZXIvY3Vyc29yaW5mbylcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldElubmVyV2lkZ2V0cygpIHtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGxlZnQgd2lkZ2V0XHJcbiAgICAgICAgdGhpcy5zZXRTaWduYWxNYW5hZ2VyV2lkZ2V0KCk7XHJcbiAgICAgICAgdGhpcy5hdHRhY2hTaWduYWxNYW5hZ2VyV2lkZ2V0RXZlbnRzKCk7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgbWlkZGxlIHdpZGdldFxyXG4gICAgICAgIHRoaXMuc2V0Q2hhcnRWaWV3V2lkZ2V0KCk7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgd2lkZ2V0cyBvbiB0aGUgcmlnaHQgc2lkZVxyXG4gICAgICAgIHRoaXMuc2V0UmlnaHRXaWRnZXRzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYXR0YWNoU2lnbmFsTWFuYWdlckRhdGFNb2RlbEV2ZW50cygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgcmlnaHQgd2lkZ2V0cyAoY2hhcnRtYW5hZ2VyLCBjdXJzb3JpbmZvKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0UmlnaHRXaWRnZXRzKCkge1xyXG5cclxuICAgICAgICAvLyBTZXRzIHRoZSBjaGFydCBtYW5hZ2VyIHdpZGdldCBvbiB0b3BcclxuICAgICAgICB0aGlzLnNldENoYXJ0TWFuYWdlcldpZGdldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgc2VyaWVzUHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRTZXJpZXNQcm92aWRlcigpIHtcclxuICAgICAgICB0aGlzLl9zZXJpZXNQcm92aWRlciA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5TZXJpZXNQcm92aWRlcklkKSBhcyBJU2VyaWVzUHJvdmlkZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB0cmFjZSBjb250cm9sIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldFRyYWNlQ29udHJvbFdpZGdldCgpIHtcclxuICAgICAgICB0aGlzLl90cmFjZUNvbnRyb2xXaWRnZXQgPSB0aGlzLmdldFdpZGdldEJ5SWQoQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uVHJhY2VDb250cm9sV2lkZ2V0SWQpIGFzIFdpZGdldHMuSVRyYWNlQ29udHJvbFdpZGdldDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHNpZ25hbCBtYW5hZ2VyIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0U2lnbmFsTWFuYWdlcldpZGdldCgpIHtcclxuICAgICAgICB0aGlzLl9zaWduYWxNYW5hZ2VyV2lkZ2V0ID0gdGhpcy5nZXRXaWRnZXRCeUlkKENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLlNpZ25hbE1hbmFnZXJXaWRnZXRJZCkgYXMgV2lkZ2V0cy5JU2lnbmFsTWFuYWdlcldpZGdldDtcclxuICAgICAgICB0aGlzLl9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsID0gdGhpcy5fc2lnbmFsTWFuYWdlcldpZGdldC5kYXRhTW9kZWwgYXMgRGF0YU1vZGVscy5JU2lnbmFsTWFuYWdlckRhdGFNb2RlbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGNoYXJ0IHZpZXcgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRDaGFydFZpZXdXaWRnZXQoKSB7XHJcbiAgICAgICAgdGhpcy5fY2hhcnRWaWV3V2lkZ2V0ID0gdGhpcy5nZXRXaWRnZXRCeUlkKENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLkNoYXJ0Vmlld1dpZGdldElkKSBhcyBXaWRnZXRzLklDaGFydFZpZXdXaWRnZXQ7XHJcbiAgICAgICAgdGhpcy5fY2hhcnRWaWV3V2lkZ2V0LmV2ZW50RHJvcEhlbHBlci5hdHRhY2godGhpcy5fY2hhcnRWaWV3V2lkZ2V0RHJvcENoYW5nZWRIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGNoYXJ0IG1hbmFnZXIgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRDaGFydE1hbmFnZXJXaWRnZXQoKSB7XHJcbiAgICAgICAgdGhpcy5fY2hhcnRNYW5hZ2VyV2lkZ2V0ID0gdGhpcy5nZXRXaWRnZXRCeUlkKENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLkNoYXJ0TWFuYWdlcldpZGdldElkKSBhcyBXaWRnZXRzLklDaGFydE1hbmFnZXJXaWRnZXQ7XHJcbiAgICAgICAgdGhpcy5fY2hhcnRNYW5hZ2VyV2lkZ2V0LmV2ZW50RHJvcEhlbHBlci5hdHRhY2godGhpcy5fY2hhcnRNYW5hZ2VyV2lkZ2V0ZHJvcEhlbHBlckhhbmRsZXIpO1xyXG5cclxuICAgICAgICB0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwgPSB0aGlzLl9jaGFydE1hbmFnZXJXaWRnZXQuZGF0YU1vZGVsIGFzIERhdGFNb2RlbHMuSUNoYXJ0TWFuYWdlckRhdGFNb2RlbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFjdGl2YXRlIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGFjdGl2YXRlKCkge1xyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldCEuYWN0aXZhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNwb3NlKCkge1xyXG4gICAgICAgIHRoaXMuX3dpZGdldElzQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5kaXNwb3NlKCk7XHJcblxyXG4gICAgICAgIC8vIERldGFjaCBldmVudHNcclxuICAgICAgICB0aGlzLmRldGFjaEV2ZW50cygpO1xyXG5cclxuICAgICAgICAvLyBEaXNwb3NlIHByb3ZpZGVyXHJcbiAgICAgICAgdGhpcy5kaXNwb3NlUHJvdmlkZXJzKCk7XHJcblxyXG4gICAgICAgIC8vIERpc3Bvc2UgZGF0YW1vZGVsc1xyXG4gICAgICAgIHRoaXMuZGlzcG9zZURhdGFNb2RlbHMoKTtcclxuXHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRhY2hlcyBhbGwgZXZlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkZXRhY2hFdmVudHMoKXtcclxuICAgICAgICB0aGlzLmRldGFjaENoYXJ0Vmlld1dpZGdldEV2ZW50cygpO1xyXG5cclxuICAgICAgICB0aGlzLmRldGFjaFNpZ25hbE1hbmFnZXJXaWRnZXRFdmVudHMoKTtcclxuICAgICAgICB0aGlzLmRldGFjaFNpZ25hbE1hbmFnZXJEYXRhTW9kZWxFdmVudHMoKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmRldGFjaENoYXJ0TWFuYWdlcldpZGdldEV2ZW50cygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldCEuZXZlbnRXaWRnZXRBY3RpdmF0ZWQuZGV0YWNoKHRoaXMuX2NvbnRlbnRBY3RpdmF0ZWRIYW5kbGVyKTsgIFxyXG4gICAgfVxyXG5cclxuICAgIGRpc3Bvc2VQcm92aWRlcnMoKXtcclxuICAgICAgICBpZih0aGlzLl9zZXJpZXNQcm92aWRlciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBMYXN0IHVzZXIgbXVzdCBkaXNwb3NlXHJcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmNvbXBvbmVudEZhY3RvcnkhLmRpc3Bvc2VDb21wb25lbnQoXCJTZXJpZXNQcm92aWRlclwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwb3NlIGFsbCBkYXRhIG1vZGVsc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGlzcG9zZURhdGFNb2RlbHMoKXtcclxuICAgICAgICAvLyBUT0RPOiBEaXNwb3NlIGRhdGFtb2RlbHMgY2VudHJhbFxyXG4gICAgICAgIGlmKHRoaXMuX3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fc2lnbmFsTWFuYWdlckRhdGFNb2RlbC5kaXNwb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBMYXN0IHVzZXIgbXVzdCBkaXNwb3NlXHJcbiAgICAgICAgICAgIC8vIFRPRE86IG9ubHkgbmVlZGVkIHRvIHJlbW92ZSBzaW5nbGV0b24gaW5zdGFuY2Ugb2YgY2hhcnRtYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmNvbXBvbmVudEZhY3RvcnkhLmRpc3Bvc2VDb21wb25lbnQoXCJDaGFydE1hbmFnZXJEYXRhTW9kZWxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiByZXNpemVzIHRoZSB0cmFjZSBjb25maWd1cmF0aW9uIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICByZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9hY3R1YWxXaWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbEhlaWdodCA9IGhlaWdodDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2xheW91dFdpZGdldCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5yZXNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Db250ZW50QWN0aXZhdGVkKHNlbmRlciwgYXJncykge1xyXG4gICAgICAgIGFyZ3Mud2lkZ2V0LmFjdGl2YXRlKCk7XHJcbiAgICAgICAgdGhpcy5yZXNpemUodGhpcy5fYWN0dWFsV2lkdGgsIHRoaXMuX2FjdHVhbEhlaWdodClcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHByaXZhdGUgZGV0YWNoQ2hhcnRWaWV3V2lkZ2V0RXZlbnRzKCl7XHJcbiAgICAgICAgaWYodGhpcy5fY2hhcnRWaWV3V2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2NoYXJ0Vmlld1dpZGdldC5ldmVudERyb3BIZWxwZXIuZGV0YWNoKHRoaXMuX2NoYXJ0Vmlld1dpZGdldERyb3BDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIHdoZW4gYSBEJkQgb3BlcmF0aW9uIGhhcyBiZWVuIGRvbmVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uRHJvcENoYW5nZWQoY2hhcnRNYW5hZ2VyRGF0YU1vZGVsOiBEYXRhTW9kZWxzLklDaGFydE1hbmFnZXJEYXRhTW9kZWwsIGFyZ3MpIHtcclxuICAgICAgICBzd2l0Y2ggKGFyZ3MuaGludCkge1xyXG4gICAgICAgICAgICBjYXNlIENoYXJ0RHJvcEhlbHBlckNoYW5nZWRIaW50LmNyZWF0ZUNoYXJ0OiB7XHJcbiAgICAgICAgICAgICAgICAvL2NyZWF0ZXMgYSBjaGFydCBhbiBhZGRzIGl0cyBzZXJpZXNcclxuICAgICAgICAgICAgICAgIGxldCBjaGFydE5hbWUgPSBjaGFydE1hbmFnZXJEYXRhTW9kZWwuZ2V0VW5pcXVlQ2hhcnROYW1lKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hhcnRNYW5hZ2VyQ2hhcnQgPSBuZXcgQ2hhcnRNYW5hZ2VyQ2hhcnQoY2hhcnROYW1lLCBhcmdzLmRhdGEudHlwZSk7XHJcbiAgICAgICAgICAgICAgICBjaGFydE1hbmFnZXJDaGFydC5hZGREZWZhdWx0WVNjYWxlKHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbCk7XHJcbiAgICAgICAgICAgICAgICBjaGFydE1hbmFnZXJEYXRhTW9kZWwuYWRkQ2hhcnQoY2hhcnRNYW5hZ2VyQ2hhcnQsIC0xKTtcclxuICAgICAgICAgICAgICAgIGlmIChhcmdzLmRhdGEuc2VyaWVzICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB5QXhpc0lkID0gY2hhcnRNYW5hZ2VyQ2hhcnQuZ2V0RGVmYXVsdFlBeGlzSWQoKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2VyaWVzID0gYXJncy5kYXRhLnNlcmllcyBhcyBCYXNlU2VyaWVzW107XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFyZ3MuZGF0YS50eXBlICE9IENoYXJ0VHlwZS5ZVENoYXJ0ICYmIGFyZ3MuZGF0YS5zZXJpZXNbMF0udHlwZSA9PSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NpZ25hbE1hbmFnZXJXaWRnZXQhLmVuYWJsZVRyZWVHcmlkUmVmcmVzaChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhcmdzLmRhdGEudHlwZSA9PSBDaGFydFR5cGUuWFlDaGFydCkgeyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcmllcyA9IG5ldyBBcnJheTxCYXNlU2VyaWVzPigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHh5U2VyaWVzID0gdGhpcy5jcmVhdGVYWVNlcmllKGFyZ3MuZGF0YS5zZXJpZXNbMF0ucGFyZW50LCBhcmdzLmRhdGEuc2VyaWVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHh5U2VyaWVzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VyaWVzLnB1c2goeHlTZXJpZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGFyZ3MuZGF0YS50eXBlID09IENoYXJ0VHlwZS5GRlRDaGFydCkgeyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcmllcyA9IG5ldyBBcnJheTxCYXNlU2VyaWVzPigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmRhdGEuc2VyaWVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmZ0U2VyaWVzID0gdGhpcy5jcmVhdGVGRlRTZXJpZShhcmdzLmRhdGEuc2VyaWVzW2ldLnBhcmVudCwgYXJncy5kYXRhLnNlcmllc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZmZ0U2VyaWVzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcmllcy5wdXNoKGZmdFNlcmllcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NpZ25hbE1hbmFnZXJXaWRnZXQhLmVuYWJsZVRyZWVHcmlkUmVmcmVzaCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5fc2lnbmFsTWFuYWdlcldpZGdldCEuZWRpdE1vZGVBY3RpdmUgJiYgYXJncy5kYXRhLnR5cGUgPT0gQ2hhcnRUeXBlLlhZQ2hhcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NpZ25hbE1hbmFnZXJXaWRnZXQhLmFjdGl2YXRlRWRpdE1vZGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy9BZGQgYWxsIGRyYWdnZWQgc2VyaWVzIHRvIHRoZSBjaGFydC5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFNlcmllVG9DaGFydChjaGFydE1hbmFnZXJEYXRhTW9kZWwsIHNlcmllcywgY2hhcnRNYW5hZ2VyQ2hhcnQsIHlBeGlzSWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBDaGFydERyb3BIZWxwZXJDaGFuZ2VkSGludC5hZGRTZXJpZTogeyBcclxuICAgICAgICAgICAgICAgIGxldCBzZXJpZXM6IEFycmF5PEJhc2VTZXJpZXM+ID0gYXJncy5kYXRhLnNlcmllcztcclxuICAgICAgICAgICAgICAgIGxldCBjaGFydDogSUNoYXJ0TWFuYWdlckNoYXJ0IHwgdW5kZWZpbmVkID0gYXJncy5kYXRhLmNoYXJ0O1xyXG4gICAgICAgICAgICAgICAgbGV0IHlBeGlzOiBTY2FsZSA9IGFyZ3MuZGF0YS55QXhpcztcclxuICAgICAgICAgICAgICAgIGlmIChjaGFydCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3RhcmdldCBjaGFydCBtYXkgbm90IGJlIHByb3ZpZGVkIGJ5IHRoZSBldmVudCBhcmdzXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYXJncy5kYXRhLnRhcmdldENoYXJ0ID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuX2NoYXJ0Vmlld1dpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5kYXRhLnRhcmdldENoYXJ0ID0gdGhpcy5fY2hhcnRWaWV3V2lkZ2V0LmdldFRyYWNlQ2hhcnRCeU5hbWUoY2hhcnQubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiB0YXJnZXQgY2hhcnQgc3RpbGwgZG9lcyBub3QgZXhpc3QgZG9udCB0cnkgdG8gYWRkIHRoZSBzZXJpZXMgdG8gYW55dGhpbmdcclxuICAgICAgICAgICAgICAgICAgICBpZihhcmdzLmRhdGEudGFyZ2V0Q2hhcnQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHlBeGlzSWQgPSB0aGlzLmdldFlBeGlzSWQoY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLCBjaGFydCwgeUF4aXMsIGFyZ3MuZGF0YS50YXJnZXRDaGFydCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaW5zZXJ0IHNlcmllIHRvIGVtcHR5IGEgY2hhcnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRTZXJpZVRvQ2hhcnQoY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLCBzZXJpZXMsIGNoYXJ0LCB5QXhpc0lkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY2FzZSBDaGFydERyb3BIZWxwZXJDaGFuZ2VkSGludC5jcmVhdGVYWVNlcmllOiB7IFxyXG4gICAgICAgICAgICAgICAgLy9DcmVhdGVzIFhZIHNlcmllIGFuZCBhZGRzIGl0IHRvIHRoZSBYWSBjaGFydFxyXG4gICAgICAgICAgICAgICAgbGV0IGNoYXJ0TWFuYWdlckNoYXJ0OiBJQ2hhcnRNYW5hZ2VyQ2hhcnQgPSBhcmdzLmRhdGEuY2hhcnQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VyaWVzID0gbmV3IEFycmF5PEJhc2VTZXJpZXM+KCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgeHlTZXJpZXMgPSB0aGlzLmNyZWF0ZVhZU2VyaWUoYXJncy5kYXRhLnNlcmllc1swXS5wYXJlbnQsIGFyZ3MuZGF0YS5zZXJpZXMpO1xyXG4gICAgICAgICAgICAgICAgaWYoeHlTZXJpZXMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBzZXJpZXMucHVzaCh4eVNlcmllcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgeUF4aXNJZCA9IGNoYXJ0TWFuYWdlckNoYXJ0LmdldERlZmF1bHRZQXhpc0lkKCk7XHJcbiAgICAgICAgICAgICAgICAvL0FkZCBhbGwgZHJhZ2dlZCBzZXJpZXMgdG8gdGhlIGNoYXJ0LlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRTZXJpZVRvQ2hhcnQoY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLCBzZXJpZXMsIGNoYXJ0TWFuYWdlckNoYXJ0LCB5QXhpc0lkKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjYXNlIENoYXJ0RHJvcEhlbHBlckNoYW5nZWRIaW50LmNyZWF0ZUZGVFNlcmllOiB7IFxyXG4gICAgICAgICAgICAgICAgLy9DcmVhdGVzIEZGVCBzZXJpZSBhbmQgYWRkIGl0IHRvIHRoZSBGRlQgY2hhcnRcclxuICAgICAgICAgICAgICAgIGxldCBjaGFydDogSUNoYXJ0TWFuYWdlckNoYXJ0ID0gYXJncy5kYXRhLmNoYXJ0O1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlcmllcyA9IG5ldyBBcnJheTxCYXNlU2VyaWVzPigpO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmRhdGEuc2VyaWVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmZ0U2VyaWVzID0gdGhpcy5jcmVhdGVGRlRTZXJpZShhcmdzLmRhdGEuc2VyaWVzW2ldLnBhcmVudCwgYXJncy5kYXRhLnNlcmllc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZmZ0U2VyaWVzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcmllcy5wdXNoKGZmdFNlcmllcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IHlBeGlzOiBTY2FsZSA9IGFyZ3MuZGF0YS55QXhpcztcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy90YXJnZXQgY2hhcnQgbWF5IG5vdCBiZSBwcm92aWRlZCBieSB0aGUgZXZlbnQgYXJnc1xyXG4gICAgICAgICAgICAgICAgaWYoYXJncy5kYXRhLnRhcmdldENoYXJ0ID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5fY2hhcnRWaWV3V2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MuZGF0YS50YXJnZXRDaGFydCA9IHRoaXMuX2NoYXJ0Vmlld1dpZGdldC5nZXRUcmFjZUNoYXJ0QnlOYW1lKGNoYXJ0Lm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vaWYgdGFyZ2V0IGNoYXJ0IHN0aWxsIGRvZXMgbm90IGV4aXN0IGRvbnQgdHJ5IHRvIGFkZCB0aGUgc2VyaWVzIHRvIGFueXRoaW5nXHJcbiAgICAgICAgICAgICAgICBpZihhcmdzLmRhdGEudGFyZ2V0Q2hhcnQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgeUF4aXNJZCA9IHRoaXMuZ2V0WUF4aXNJZChjaGFydE1hbmFnZXJEYXRhTW9kZWwsIGNoYXJ0LCB5QXhpcywgYXJncy5kYXRhLnRhcmdldENoYXJ0KTtcclxuICAgICAgICAgICAgICAgICAgICAvL0FkZCBhbGwgZHJhZ2dlZCBzZXJpZXMgdG8gdGhlIGNoYXJ0LlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkU2VyaWVUb0NoYXJ0KGNoYXJ0TWFuYWdlckRhdGFNb2RlbCwgc2VyaWVzLCBjaGFydCwgeUF4aXNJZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRhY2hlcyB0aGUgc2lnbmFsIG1hbmFnZXIgd2lkZ2V0IGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXR0YWNoU2lnbmFsTWFuYWdlcldpZGdldEV2ZW50cygpIHtcclxuICAgICAgICBpZih0aGlzLl9zaWduYWxNYW5hZ2VyV2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX3NpZ25hbE1hbmFnZXJXaWRnZXQuZXZlbnRTZXJpZURvdWJsZUNsaWNrZWQuYXR0YWNoKHRoaXMuX3NpZ25hbE1hbmFnZXJXaWRnZXRTZXJpZURvdWJsZUNsaWNrZWRIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5fc2lnbmFsTWFuYWdlcldpZGdldC5ldmVudENoYW5nZVNpemUuYXR0YWNoKHRoaXMuX3NpZ25hbE1hbmFnZXJXaWRnZXRDaGFuZ2VTaXplSGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0YWNoZXMgdGhlIHNpZ25hbCBtYW5hZ2VyIHdpZGdldCBldmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRldGFjaFNpZ25hbE1hbmFnZXJXaWRnZXRFdmVudHMoKSB7XHJcbiAgICAgICAgaWYodGhpcy5fc2lnbmFsTWFuYWdlcldpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9zaWduYWxNYW5hZ2VyV2lkZ2V0LmV2ZW50U2VyaWVEb3VibGVDbGlja2VkLmRldGFjaCh0aGlzLl9zaWduYWxNYW5hZ2VyV2lkZ2V0U2VyaWVEb3VibGVDbGlja2VkSGFuZGxlcik7XHJcbiAgICAgICAgICAgIHRoaXMuX3NpZ25hbE1hbmFnZXJXaWRnZXQuZXZlbnRDaGFuZ2VTaXplLmRldGFjaCh0aGlzLl9zaWduYWxNYW5hZ2VyV2lkZ2V0Q2hhbmdlU2l6ZUhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uU2lnbmFsTWFuYWdlcldpZGdldFNlcmllRG91YmxlQ2xpY2tlZChzZW5kZXIsIHNlcmllOiBCYXNlU2VyaWVzKSB7XHJcbiAgICAgICAgdGhpcy5hZGROZXdDaGFydCh0aGlzLl9jaGFydE1hbmFnZXJXaWRnZXQuZGF0YU1vZGVsIGFzIERhdGFNb2RlbHMuSUNoYXJ0TWFuYWdlckRhdGFNb2RlbCwgc2VyaWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25TaWduYWxNYW5hZ2VyV2lkZ2V0Q2hhbmdlU2l6ZShzZW5kZXIsIG5ld1NpemUpIHtcclxuICAgICAgICAvLyBnZXQgcGFyZW50KHNwbGl0dGVyKSB3aWRnZXQgb2Ygc2VuZGVyKHNpZ25hbE1hbmFnZXIpXHJcbiAgICAgICAgbGV0IGlubmVyTGF5b3V0U3BsaXR0ZXJXaWRnZXQgPSB0aGlzLmdldFdpZGdldEJ5SWQoQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uU3BsaXR0ZXJXaWRnZXRNYWluVHJhY2VJZCkgYXMgV2lkZ2V0cy5JU3BsaXR0ZXJXaWRnZXQ7XHJcbiAgICAgICAgLy8gY2hhbmdlIHNpemUgb2Ygc3BsaXR0ZXIgcGFuZVxyXG4gICAgICAgIGlubmVyTGF5b3V0U3BsaXR0ZXJXaWRnZXQucmVzaXplV2lkZ2V0KHNlbmRlciwgbmV3U2l6ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgbmV3IGNoYXJ0IHRvIHRoZSBjaGFydG1hbmFnZXIgZGF0YW1vZGVsKGlmIHBvc3NpYmxlID0+IG1heCBjaGFydCBudW1iZXIpIGFuZCBhZGRzIHRoZSBnaXZlbiBzaWduYWwgdG8gdGhlIG5ldyBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkTmV3Q2hhcnQoY2hhcnRNYW5hZ2VyRGF0YU1vZGVsOiBEYXRhTW9kZWxzLklDaGFydE1hbmFnZXJEYXRhTW9kZWwsIHNlcmllOiBCYXNlU2VyaWVzKSB7XHJcbiAgICAgICAgaWYgKGNoYXJ0TWFuYWdlckRhdGFNb2RlbCkge1xyXG4gICAgICAgICAgICB2YXIgbmV3Q2hhcnROYW1lID0gY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLmdldFVuaXF1ZUNoYXJ0TmFtZSgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHNlcmllQ2hhcnRUeXBlID0gU2VyaWVDaGFydFR5cGVIZWxwZXIuZ2V0U2VyaWVDaGFydFR5cGUoc2VyaWUudHlwZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbmV3Q2hhcnQgPSBuZXcgQ2hhcnRNYW5hZ2VyQ2hhcnQobmV3Q2hhcnROYW1lLCBzZXJpZUNoYXJ0VHlwZSk7XHJcbiAgICAgICAgICAgIG5ld0NoYXJ0LmFkZERlZmF1bHRZU2NhbGUodGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBpc0NoYXJ0QWRkZWQgPSBjaGFydE1hbmFnZXJEYXRhTW9kZWwuYWRkQ2hhcnQobmV3Q2hhcnQsIDApO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNlcmllICE9IHVuZGVmaW5lZCAmJiBpc0NoYXJ0QWRkZWQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzZXJpZXMgPSBuZXcgQXJyYXk8QmFzZVNlcmllcz4oKTtcclxuICAgICAgICAgICAgICAgIHNlcmllcy5wdXNoKHNlcmllKTtcclxuICAgICAgICAgICAgICAgIGxldCB5QXhpcyA9IG5ld0NoYXJ0LmdldFlTY2FsZShuZXdDaGFydC5nZXREZWZhdWx0WUF4aXNJZCgpKTtcclxuICAgICAgICAgICAgICAgIGlmICh5QXhpcyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFNlcmllVG9DaGFydChjaGFydE1hbmFnZXJEYXRhTW9kZWwsIHNlcmllcywgbmV3Q2hhcnQsIHlBeGlzLmlkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJEZWZhdWx0IHlBeGlzIG5vdCBhdmFpbGFibGUhXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIHNlcmllIHRvIGNoYXJ0IChvbmUgYnkgb25lKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEJhc2VTZXJpZXM+fSBzZXJpZXNcclxuICAgICAqIEBwYXJhbSB7KElDaGFydE1hbmFnZXJDaGFydCB8IHVuZGVmaW5lZCl9IGNoYXJ0TWFuYWdlckNoYXJ0XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30geUF4aXNJZFxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZFNlcmllVG9DaGFydChjaGFydE1hbmFnZXJEYXRhTW9kZWw6IERhdGFNb2RlbHMuSUNoYXJ0TWFuYWdlckRhdGFNb2RlbCwgc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPiwgY2hhcnRNYW5hZ2VyQ2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCB8IHVuZGVmaW5lZCwgeUF4aXNJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHlBeGlzID0gY2hhcnRNYW5hZ2VyQ2hhcnQhLmdldFlTY2FsZSh5QXhpc0lkKTtcclxuICAgICAgICBsZXQgaW5zZXJ0ZWRJbmZvID0gbmV3IEluc2VydGVkSW5mbyhzZXJpZXMsIHlBeGlzLCBjaGFydE1hbmFnZXJDaGFydCEpO1xyXG4gICAgICAgIGlmIChpbnNlcnRlZEluZm8gIT0gdW5kZWZpbmVkICYmIGluc2VydGVkSW5mby55QXhpcyAhPSB1bmRlZmluZWQgJiYgaW5zZXJ0ZWRJbmZvLmNoYXJ0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjaGFydE1hbmFnZXJEYXRhTW9kZWwuYWRkU2VyaWVzVG9DaGFydChpbnNlcnRlZEluZm8uY2hhcnQsIGluc2VydGVkSW5mby5zZXJpZXMsIGluc2VydGVkSW5mby55QXhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlWFlTZXJpZShjb250YWluZXI6IElTZXJpZUNvbnRhaW5lciwgc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPik6IEJhc2VTZXJpZXN8dW5kZWZpbmVkIHtcclxuICAgICAgaWYodGhpcy5fc2VyaWVzUHJvdmlkZXIgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgIH0gXHJcblxyXG4gICAgICAvLyBjcmVhdGUgY2FsY3VsYXRpb25cclxuXHQgIGxldCBjYWxjdWxhdGlvbiA9IG5ldyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24oXCJDYWxjdWxhdGlvblwiLCB0aGlzLl9zZXJpZXNQcm92aWRlcik7XHJcbiAgICAgICAgXHJcblx0ICAvLyBhZGQgY2FsY3VsYXRpb24gdG8gY29udGFpbmVyXHJcblx0ICBjb250YWluZXIuYWRkU2VyaWVDb250YWluZXIoY2FsY3VsYXRpb24sIC0xKTtcclxuICAgICAgICBcclxuXHQgIC8vIHNldCBjYWxjdWxhdGlvbiB0eXBlXHJcblx0ICBjYWxjdWxhdGlvbi5zZXRDYWxjdWxhdG9yVHlwZUJ5SWQoWFlDYWxjdWxhdG9yLmlkKTtcclxuXHJcblx0ICAvLyBzZXQgY2FsY3VsYXRpb24gaW5wdXQgZGF0YVxyXG5cdCAgaWYoc2VyaWVzLmxlbmd0aCA+IDAgJiYgc2VyaWVzWzBdICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgY2FsY3VsYXRpb24uc2V0SW5wdXRWYWx1ZUJ5SWQoWFlDYWxjdWxhdG9yLmlucHV0SWRYU2lnbmFsLCBzZXJpZXNbMF0ubmFtZSk7XHJcbiAgICAgIH1cclxuICAgICAgXHJcblx0ICBpZihzZXJpZXMubGVuZ3RoID4gMSAmJiBzZXJpZXNbMV0gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgY2FsY3VsYXRpb24uc2V0SW5wdXRWYWx1ZUJ5SWQoWFlDYWxjdWxhdG9yLmlucHV0SWRZU2lnbmFsLCBzZXJpZXNbMV0ubmFtZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFJldHVybiBjYWxjdWxhdGlvbiBvdXRwdXQgZGF0YSBcclxuICAgICAgcmV0dXJuIGNhbGN1bGF0aW9uLmdldE91dHB1dENhbGN1bGF0aW9uRGF0YSgpWzBdLnNlcmllIGFzIEJhc2VTZXJpZXM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIEZGVCBvdXRwdXQgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJU2VyaWVDb250YWluZXJ9IGNvbnRhaW5lclxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZXNcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlRkZUU2VyaWUoY29udGFpbmVyOiBJU2VyaWVDb250YWluZXIsIHNlcmllczogQmFzZVNlcmllcyk6IEJhc2VTZXJpZXN8dW5kZWZpbmVkIHtcclxuICAgICAgICBpZih0aGlzLl9zZXJpZXNQcm92aWRlciA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH0gXHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBjYWxjdWxhdGlvblxyXG4gICAgICAgIGxldCBjYWxjdWxhdGlvbiA9IG5ldyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24oXCJDYWxjdWxhdGlvblwiLCB0aGlzLl9zZXJpZXNQcm92aWRlcik7XHJcblxyXG4gICAgICAgIC8vIGFkZCBjYWxjdWxhdGlvbiB0byBjb250YWluZXJcclxuICAgICAgICBjb250YWluZXIuYWRkU2VyaWVDb250YWluZXIoY2FsY3VsYXRpb24sIC0xKTtcclxuXHJcbiAgICAgICAgLy8gc2V0IGNhbGN1bGF0aW9uIHR5cGVcclxuICAgICAgICBjYWxjdWxhdGlvbi5zZXRDYWxjdWxhdG9yVHlwZUJ5SWQoRmZ0Q2FsY3VsYXRvci5pZCk7XHJcblxyXG4gICAgICAgIC8vIHNldCBjYWxjdWxhdGlvbiBpbnB1dCBkYXRhXHJcbiAgICAgICAgY2FsY3VsYXRpb24uc2V0SW5wdXRWYWx1ZUJ5SWQoRmZ0Q2FsY3VsYXRvci5pbnB1dElkU2lnbmFsLCBzZXJpZXMubmFtZSk7XHJcblxyXG4gICAgICAgIC8vIENoYW5nZSBvdXRwdXQgZGF0YSBuYW1lIGFuZCBjb2xvciBvZiBuZXcgRkZUIGNhbGN1bGF0aW9uXHJcbiAgICAgICAgbGV0IGlucHV0RGF0YSA9IGNhbGN1bGF0aW9uLmdldElucHV0Q2FsY3VsYXRpb25EYXRhKCk7XHJcbiAgICAgICAgbGV0IG91dHB1dERhdGEgPSBjYWxjdWxhdGlvbi5nZXRPdXRwdXRDYWxjdWxhdGlvbkRhdGEoKTtcclxuICAgICAgICBpZihpbnB1dERhdGFbMF0uc2VyaWUgIT0gdW5kZWZpbmVkICYmIGlucHV0RGF0YVswXS5zZXJpZS5yYXdQb2ludHNWYWxpZCkge1xyXG4gICAgICAgICAgICBsZXQgb3V0cHV0RGF0YSA9IGNhbGN1bGF0aW9uLmdldE91dHB1dENhbGN1bGF0aW9uRGF0YSgpO1xyXG4gICAgICAgICAgICBpZihvdXRwdXREYXRhLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBvdXRwdXREYXRhWzBdLmNvbG9yID0gaW5wdXREYXRhWzBdLnNlcmllLmNvbG9yO1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0RGF0YVswXS52YWx1ZSA9ICdGRlQoJyArIGlucHV0RGF0YVswXS5zZXJpZS5uYW1lICsgJykgJyArIGNhbGN1bGF0aW9uLnNlcmllIS5jYWxjdWxhdGlvbkRhdGFJbmZvIS51bmlxdWVJZDsgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZXR1cm4gY2FsY3VsYXRpb24gb3V0cHV0IGRhdGEgXHJcbiAgICAgICAgcmV0dXJuIG91dHB1dERhdGFbMF0uc2VyaWUgYXMgQmFzZVNlcmllcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SUNoYXJ0TWFuYWdlckRhdGFNb2RlbH0gY2hhcnRNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICAgKiBAcGFyYW0ge0lDaGFydE1hbmFnZXJDaGFydH0gY2hhcnRcclxuICAgICAqIEBwYXJhbSB7KFNjYWxlIHwgdW5kZWZpbmVkKX0geUF4aXNcclxuICAgICAqIEBwYXJhbSB7KElUcmFjZUNoYXJ0IHwgdW5kZWZpbmVkKX0gdGFyZ2V0Q2hhcnRcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0WUF4aXNJZChjaGFydE1hbmFnZXJEYXRhTW9kZWw6IERhdGFNb2RlbHMuSUNoYXJ0TWFuYWdlckRhdGFNb2RlbCwgY2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCwgeUF4aXM6IFNjYWxlIHwgdW5kZWZpbmVkLCB0YXJnZXRDaGFydDogSVRyYWNlQ2hhcnQgfCB1bmRlZmluZWQpOiBzdHJpbmcge1xyXG4gICAgICAgbGV0IHlBeGlzSWQ6IHN0cmluZztcclxuICAgICAgICBpZiAoeUF4aXMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGNoYXJ0ID0geUF4aXMucGFyZW50O1xyXG4gICAgICAgICAgICB5QXhpc0lkID0geUF4aXMuaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB5QXhpc0lkID0gdGhpcy5nZXRZU2NhbGVJZChjaGFydE1hbmFnZXJEYXRhTW9kZWwsIGNoYXJ0LCB0YXJnZXRDaGFydCk7XHJcbiAgICAgICAgICAgIGlmKHlBeGlzSWQgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBuZXcgc2NhbGVcclxuICAgICAgICAgICAgICAgIHlBeGlzSWQgPSBjaGFydC5nZXROZXh0WUF4aXNJZCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1lBeGlzID0gbmV3IFNjYWxlKHlBeGlzSWQsIGNoYXJ0KTtcclxuICAgICAgICAgICAgICAgIGNoYXJ0TWFuYWdlckRhdGFNb2RlbC5hZGRZU2NhbGUoY2hhcnQsIG5ld1lBeGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4geUF4aXNJZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiB5QXhpcyBpZCB3aGVuIHNlcmllIGlzIGRyb3BwZWQgaW4gdGhlIGNoYXJ0IHZpZXdcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtEYXRhTW9kZWxzLklDaGFydE1hbmFnZXJEYXRhTW9kZWx9IGNoYXJ0TWFuYWdlckRhdGFNb2RlbFxyXG4gICAgICogQHBhcmFtIHtJQ2hhcnRNYW5hZ2VyQ2hhcnR9IGNoYXJ0TWFuYWdlckNoYXJ0XHJcbiAgICAgKiBAcGFyYW0geyp9IHRhcmdldENoYXJ0XHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFlTY2FsZUlkKGNoYXJ0TWFuYWdlckRhdGFNb2RlbDogRGF0YU1vZGVscy5JQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsLCBjaGFydE1hbmFnZXJDaGFydDogSUNoYXJ0TWFuYWdlckNoYXJ0LCB0YXJnZXRDaGFydCk6IHN0cmluZ3tcclxuICAgICAgICBsZXQgeUF4aXNJZDtcclxuICAgICAgICBpZiAoY2hhcnRNYW5hZ2VyQ2hhcnQuY2hhcnRUeXBlID09IENoYXJ0VHlwZS5YWUNoYXJ0KSB7XHJcbiAgICAgICAgICAgIHlBeGlzSWQgPSBjaGFydE1hbmFnZXJDaGFydC5nZXREZWZhdWx0WUF4aXNJZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy9hZGRpbmcgc2VyaWVzIHRvIFlUIGNoYXJ0c1xyXG4gICAgICAgICAgICBsZXQgb2JqZWN0VW5kZXJNb3VzZSA9IHRhcmdldENoYXJ0LmdldENoYXJ0T2JqZWN0VW5kZXJNb3VzZSh0YXJnZXRDaGFydC5jaGFydEluc3RhbmNlLm1vdXNlbW92ZVgsIHRhcmdldENoYXJ0LmNoYXJ0SW5zdGFuY2UubW91c2Vtb3ZlWSk7XHJcbiAgICAgICAgICAgIGlmIChvYmplY3RVbmRlck1vdXNlLmNoYXJ0T2JqZWN0VHlwZSA9PSBDaGFydE9iamVjdFR5cGUuYXhpcykgeyBcclxuICAgICAgICAgICAgICAgIC8vIGdldCBheGlzIGlkXHJcbiAgICAgICAgICAgICAgICB5QXhpc0lkID0gb2JqZWN0VW5kZXJNb3VzZS5hcmdzLmF4aXMuZ2V0QXhpc0lEKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAob2JqZWN0VW5kZXJNb3VzZS5jaGFydE9iamVjdFR5cGUgPT0gQ2hhcnRPYmplY3RUeXBlLmNoYXJ0U3BhY2UpIHsgXHJcbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgbmV3IGF4aXNcclxuICAgICAgICAgICAgICAgIHlBeGlzSWQgPSBjaGFydE1hbmFnZXJDaGFydC5nZXROZXh0WUF4aXNJZCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1lBeGlzID0gbmV3IFNjYWxlKHlBeGlzSWQsIGNoYXJ0TWFuYWdlckNoYXJ0KTtcclxuICAgICAgICAgICAgICAgIGNoYXJ0TWFuYWdlckRhdGFNb2RlbC5hZGRZU2NhbGUoY2hhcnRNYW5hZ2VyQ2hhcnQsIG5ld1lBeGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4geUF4aXNJZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaGVzIHRoZSBzaWduYWwgbWFuYWdlciBkYXRhbW9kZWwgZXZlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhdHRhY2hTaWduYWxNYW5hZ2VyRGF0YU1vZGVsRXZlbnRzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwuZXZlbnRTaWduYWxSZW1vdmVkLmF0dGFjaCh0aGlzLl9zaWduYWxNYW5hZ2VyU2lnbmFsUmVtb3ZlZEhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGFjaGVzIHRoZSBzaWduYWwgbWFuYWdlciBkYXRhbW9kZWwgZXZlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkZXRhY2hTaWduYWxNYW5hZ2VyRGF0YU1vZGVsRXZlbnRzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwuZXZlbnRTaWduYWxSZW1vdmVkLmRldGFjaCh0aGlzLl9zaWduYWxNYW5hZ2VyU2lnbmFsUmVtb3ZlZEhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uU2lnbmFsTWFuYWdlclNpZ25hbFJlbW92ZWQoc2VuZGVyLCBzZXJpZSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLnJlbW92ZVNlcmllRnJvbUFsbENoYXJ0cyhzZXJpZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0YWNoZXMgdGhlIGNoYXJ0IG1hbmFnZXIgd2lkZ2V0IGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGV0YWNoQ2hhcnRNYW5hZ2VyV2lkZ2V0RXZlbnRzKCkge1xyXG4gICAgICAgIHRoaXMuX2NoYXJ0TWFuYWdlcldpZGdldC5ldmVudERyb3BIZWxwZXIuZGV0YWNoKHRoaXMuX2NoYXJ0TWFuYWdlcldpZGdldGRyb3BIZWxwZXJIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGFjdGl2ZUNvbXBvbmVudChhY3RpdmVDb21wb25lbnQ6IFByb3BlcnR5PE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnQ+KSB7XHJcbiAgICAgICAgdGhpcy5fYWN0aXZlQ29tcG9uZW50ID0gYWN0aXZlQ29tcG9uZW50O1xyXG4gICAgICAgIHRoaXMuX2FjdGl2ZUNvbXBvbmVudC52YWx1ZS5pbml0aWFsaXplKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FjdGl2ZUNvbXBvbmVudC5jaGFuZ2VkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50QWN0aXZlQ29tcG9uZW50ID0gdGhpcy5fYWN0aXZlQ29tcG9uZW50LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRBY3RpdmVDb21wb25lbnQudHJhY2VDb250cm9sSW50ZXJmYWNlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJhY2VDb250cm9sSW50ZXJmYWNlID0gY3VycmVudEFjdGl2ZUNvbXBvbmVudC50cmFjZUNvbnRyb2xJbnRlcmZhY2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudEFjdGl2ZUNvbXBvbmVudC50cmFjZVBhcmFtZXRlcnMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFjZVBhcmFtZXRlcnNJbnRlcmZhY2UgPSBjdXJyZW50QWN0aXZlQ29tcG9uZW50LnRyYWNlUGFyYW1ldGVycztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCB0cmFjZVBhcmFtZXRlcnNJbnRlcmZhY2UodHJhY2VQYXJhbWV0ZXJJbnRlcmZhY2U6IFByb3BlcnR5PElUcmFjZUNvbXBvbmVudFBhcmFtZXRlcnM+KSB7XHJcbiAgICAgICAgdHJhY2VQYXJhbWV0ZXJJbnRlcmZhY2UuY2hhbmdlZCgodHJhY2VQYXJhbWV0ZXJJbnRlcmZhY2UpID0+IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXZhaWxhYmxlRGF0YVBvaW50cyA9IHRyYWNlUGFyYW1ldGVySW50ZXJmYWNlLmF2YWlsYWJsZVRyYWNlRGF0YVBvaW50cztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcblx0ICogU2V0cyB0aGUgYXZhaWxhYmxlIHRyYWNlIGRhdGFwb2ludHMgdG8gdGhlIHRyYWNlIHZpZXcgd2lkZ2V0XHJcblx0ICpcclxuXHQgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcblx0ICovXHJcbiAgICBwdWJsaWMgc2V0IGF2YWlsYWJsZURhdGFQb2ludHMoYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzOiBQcm9wZXJ0eTxUcmFjZURhdGFQb2ludEluZm9bXT4pIHtcclxuICAgICAgICBhdmFpbGFibGVUcmFjZURhdGFQb2ludHMuY2hhbmdlZCgoZGF0YVBvaW50cykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl90cmFjZURhdGFQb2ludEluZm9zID0gZGF0YVBvaW50cztcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG5cdCAqIFNldHMgYW5kIGRlZmluZXMgdGhlIGludGVyZmFjZSB0byB0aGUgdHJhY2UgY29udHJvbFxyXG5cdCAqXHJcblx0ICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG5cdCAqL1xyXG4gICAgcHVibGljIHNldCB0cmFjZUNvbnRyb2xJbnRlcmZhY2UodHJhY2VDb21wb25lbnRDb250cm9sOiBJVHJhY2VDb21wb25lbnRDb250cm9sKSB7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0VHJhY2VDb250cm9sV2lkZ2V0KHRyYWNlQ29tcG9uZW50Q29udHJvbCk7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0VHJhY2VWaWV3V2lkZ2V0VG9UcmFjZVN0YXRlKCk7XHJcbiAgICB9XHJcblxyXG5cdC8qKlxyXG4gICAgICogU3RhcnQgbG9hZGluZyB0cmFjZSBkYXRhIGZyb20gdGFyZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbG9hZFRyYWNlRGF0YUZyb21UYXJnZXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzTG9hZGluZ1RyYWNlRGF0YSA9PSB0cnVlIHx8IHRoaXMuX3dpZGdldElzQWN0aXZlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2lzTG9hZGluZ1RyYWNlRGF0YSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fdHJhY2VDb250cm9sV2lkZ2V0LnNldEJ1c3lJbmZvcm1hdGlvbihuZXcgQnVzeUluZm9ybWF0aW9uKFwiTG9hZGluZyB0cmFjZSBkYXRhXCIsIEltYWdlSWQuZGVmYXVsdEltYWdlLCAyNSwgZmFsc2UpKTtcclxuICAgICAgICB0aGlzLl90cmFjZUNvbnRyb2xXaWRnZXQuc2V0QnVzeSh0cnVlKTtcclxuXHJcbiAgICAgICAgLy8gaW52b2tlIGxvYWRpbmcgdHJhY2UgZGF0YVxyXG4gICAgICAgIHRoaXMuaW52b2tlTG9hZFRyYWNlRGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW52b2tlTG9hZFRyYWNlRGF0YSgpIHtcclxuICAgICAgICAvLyBCSU5ESU5HU09VUkNFOiBtZXRob2QgZm9yIGRpc3BhdGNoaW5nIHRoZSBjYWxsIHRvIGEgYm91bmQgdGFyZ2V0XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbmZvcm1hdGlvbnMgaWYgbG9hZGluZyBvZiB0cmFjZSBkYXRhIGZyb20gdGFyZ2V0IGZhaWxlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGVycm9yRGF0YVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uRXJyb3JMb2FkaW5nVHJhY2VEYXRhKGVycm9yRGF0YSkge1xyXG4gICAgICAgIHRoaXMuX2lzTG9hZGluZ1RyYWNlRGF0YSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3RyYWNlQ29udHJvbFdpZGdldC5zZXRCdXN5KGZhbHNlKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBoYW5kbGVzIHRyYWNlIHN0YXRlIGNoYW5nZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IHRyYWNlU3RhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblRyYWNlU3RhdGVDaGFuZ2VkKHRyYWNlU3RhdGU6IHN0cmluZyxvbGRUcmFjZVN0YXRlKSB7XHJcbiAgICAgICAgdGhpcy5fdHJhY2VTdGF0ZSA9IHRyYWNlU3RhdGU7XHJcbiAgICAgICAgaWYgKHRyYWNlU3RhdGUgPT0gVHJhY2VTdGF0ZUlkcy5EYXRhX2F2YWlsYWJsZSAmJiBvbGRUcmFjZVN0YXRlICE9IFRyYWNlU3RhdGVJZHMuRGF0YV9hdmFpbGFibGUpIHtcclxuICAgICAgICAgICAgLy8gQXV0byB1cGxvYWQgb2YgdHJhY2UgZGF0YVxyXG4gICAgICAgICAgICB0aGlzLmxvYWRUcmFjZURhdGFGcm9tVGFyZ2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5mb3JtYXRpb25zKHRyYWNlZGF0YSkgZnJvbSB0YXJnZXQgYWZ0ZXIgc3VjY2Vzc2Z1bCB0cmFjZSBkYXRhIHVwbG9hZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHJlc3VsdFxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uVHJhY2VEYXRhTG9hZGVkKHJlc3VsdCkge1xyXG4gICAgICAgIHZhciB0cmFjZURhdGEgPSByZXN1bHQgYXMgVHJhY2VEYXRhO1xyXG4gICAgICAgIGxldCBhZGRUcmFjZURhdGFUb1NpZ25hbE1hbmFnZXIgPSB0cnVlO1xyXG4gICAgICAgIC8vIGNoZWNrIGlmIGRhdGEgYWxyZWFkeSBpbiBzaWduYWxtYW5hZ2VyIGRhdGFtb2RlbFxyXG4gICAgICAgIGlmICh0cmFjZURhdGEudHJhY2VDaGFubmVscy5sZW5ndGggPiAwICYmIHRyYWNlRGF0YS50cmFjZUNoYW5uZWxzWzBdIS50cmFjZVBvaW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHZhciBzZXJpZUdyb3VwSWQgPSB0cmFjZURhdGEudHJpZ2dlclRpbWUudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHRoaXMuX3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX3NpZ25hbE1hbmFnZXJEYXRhTW9kZWxbXCJkaXNwb3NlZFwiXSAhPSB0cnVlKXsvLyBCdWdmaXggdG8gYXZvaWQgdXNlIG9mIG5vdCB1bmJpbmRlZCBkYXRhbW9kZWxcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGF0ZXN0Q2F0ZWdvcnkgPSB0aGlzLl9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsLmdldFNpZ25hbENhdGVnb3J5KFNpZ25hbENhdGVnb3J5LkNhdGVnb3J5SWRSZWNlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXRlc3RDYXRlZ29yeSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlcmllQ29udGFpbmVyID0gbGF0ZXN0Q2F0ZWdvcnkuZ2V0U2VyaWVDb250YWluZXJCeUlkKHNlcmllR3JvdXBJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZXJpZUNvbnRhaW5lciAhPSB1bmRlZmluZWQpIHsgLy8gc2lnbmFsIGNvbnRhaW5lciBhbHJlYWR5IGV4aXN0czsgbmVlZGVkIHRvIGF2b2lkIGR1cGxpY2F0ZWQgc2lnbmFsIGNvbnRhaW5lcnMgaWYgZXZlbnQgY29tZXMgbXVsdGlwbGUgdGltZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZFRyYWNlRGF0YVRvU2lnbmFsTWFuYWdlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwic2lnbmFsTWFuYWdlckRhdGFNb2RlbCBub3QgYXZhaWxhYmxlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWRkVHJhY2VEYXRhVG9TaWduYWxNYW5hZ2VyID09IHRydWUpIHtcclxuICAgICAgICAgICAgaWYgKHRyYWNlRGF0YS50cmFjZUNoYW5uZWxzLmxlbmd0aCA+IDAgJiYgdHJhY2VEYXRhLnRyYWNlQ2hhbm5lbHNbMF0hLnRyYWNlUG9pbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkVHJhY2VEYXRhVG9TaWduYWxNYW5hZ2VyKHRyYWNlRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5faXNMb2FkaW5nVHJhY2VEYXRhID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdHJhY2VDb250cm9sV2lkZ2V0LnNldEJ1c3koZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyB0aGUgZ2l2ZW4gdHJhY2UgZGF0YSB0byB0aGUgc2lnbmFsIG1hbmFnZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSB0cmFjZURhdGFcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRUcmFjZURhdGFUb1NpZ25hbE1hbmFnZXIodHJhY2VEYXRhKSB7XHJcbiAgICAgICAgbGV0IGlkID0gdHJhY2VEYXRhLnRyaWdnZXJUaW1lLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdmFyIG5ld1NlcmllR3JvdXAgPSBuZXcgU2VyaWVHcm91cChEYXRlVGltZUhlbHBlci5nZXREYXRlVGltZSh0cmFjZURhdGEudHJpZ2dlclRpbWUpLCBpZCwgdHJhY2VEYXRhLnRyaWdnZXJUaW1lKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRyYWNlRGF0YS50cmFjZUNoYW5uZWxzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdHJhY2VEYXRhLnRyYWNlQ2hhbm5lbHNbaV0udHJhY2VQb2ludHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciB4VmFsOiBudW1iZXIgPSAodHJhY2VEYXRhLnRyYWNlQ2hhbm5lbHNbaV0udHJhY2VQb2ludHNbal0udGltZVN0YW1wIC0gdHJhY2VEYXRhLnRyaWdnZXJUaW1lKSAvIDEwMDAwMDA7XHJcbiAgICAgICAgICAgICAgICB2YXIgeVZhbDogbnVtYmVyID0gdHJhY2VEYXRhLnRyYWNlQ2hhbm5lbHNbaV0udHJhY2VQb2ludHNbal0uZGF0YVZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGRhdGEucHVzaChuZXcgUG9pbnQoeFZhbCwgeVZhbCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBuZXdTaWduYWwgPSBuZXcgU2lnbmFsKHRyYWNlRGF0YS50cmFjZUNoYW5uZWxzW2ldLm5hbWUsIGRhdGEpO1xyXG4gICAgICAgICAgICBpZih0aGlzLl9zZXJpZXNQcm92aWRlciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgbGV0IHNldHRpbmdzID0gU2VyaWVzSGVscGVyLmNyZWF0ZVNlcmllU2V0dGluZ3MobmV3U2lnbmFsLCBuZXdTaWduYWwubmFtZSwgQ29sb3JIZWxwZXIuZ2V0Q29sb3IoKSwgdGhpcy5fc2VyaWVzUHJvdmlkZXIuZ2V0VW5pcXVlSWQoKSwgU2VyaWVzVHlwZS50aW1lU2VyaWVzKTtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdTZXJpZSA9IHRoaXMuX3Nlcmllc1Byb3ZpZGVyLmNyZWF0ZVNlcmllKHNldHRpbmdzKTtcclxuICAgICAgICAgICAgICAgIGlmKG5ld1NlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3RyYWNlRGF0YVBvaW50SW5mb3MgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0cmFjZVBvaW50SW5mb3MgPSB0aGlzLl90cmFjZURhdGFQb2ludEluZm9zLmZpbHRlcihlbGVtZW50ID0+IGVsZW1lbnQuZnVsbG5hbWUgPT0gbmV3U2lnbmFsLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJhY2VQb2ludEluZm9zLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdTZXJpZS5uYW1lID0gdHJhY2VQb2ludEluZm9zWzBdLmNvbXBvbmVudE5hbWUgKyBcIjpcIiArIHRyYWNlUG9pbnRJbmZvc1swXS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2VyaWUuZGVzY3JpcHRpb24gPSB0cmFjZVBvaW50SW5mb3NbMF0uZGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3U2VyaWVHcm91cC5hZGRTZXJpZShuZXdTZXJpZSEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3JlYXRpb24gb2YgdGhlIHNlcmllIHdhcyBub3QgcG9zc2libGUhXCIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJTZXJpZXNQcm92aWRlciBub3QgYXZhaWxhYmxlIVwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwuYWRkVXBsb2FkZWRTZXJpZUdyb3VwKG5ld1NlcmllR3JvdXApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogICBDb25uZWN0cyB0aGUgdHJhY2UgY29udHJvbCB3aWRnZXQgdG8gdGhlIHRyYWNlIGNvbnRyb2wgcHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lUcmFjZUNvbXBvbmVudENvbnRyb2x9IHRyYWNlQ29tcG9uZW50Q29udHJvbFxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29ubmVjdFRyYWNlQ29udHJvbFdpZGdldCh0cmFjZUNvbXBvbmVudENvbnRyb2w6IElUcmFjZUNvbXBvbmVudENvbnRyb2wpOiBhbnkge1xyXG4gICAgICAgIGlmICh0aGlzLl90cmFjZUNvbnRyb2xXaWRnZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5fdHJhY2VDb250cm9sV2lkZ2V0LnRyYWNlQ29udHJvbEludGVyZmFjZSA9IHRoaXMuZ2V0SW50ZXJmYWNlV2l0aG91dFNhdmVDb21tYW5kKHRyYWNlQ29tcG9uZW50Q29udHJvbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJhY2UgY29tcG9uZW50IGNvbnRyb2wgd2l0aCBvdXQgdGhlIHNhdmUvaW1wb3J0L2V4cG9ydCB0cmFjZSBjb25maWd1cmF0aW9uIGNvbW1hbmRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJVHJhY2VDb21wb25lbnRDb250cm9sfSB0cmFjZUNvbXBvbmVudENvbnRyb2xcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEludGVyZmFjZVdpdGhvdXRTYXZlQ29tbWFuZCh0cmFjZUNvbXBvbmVudENvbnRyb2w6IElUcmFjZUNvbXBvbmVudENvbnRyb2wpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvbW1hbmRGb3JjZVN0YXJ0OiB0cmFjZUNvbXBvbmVudENvbnRyb2wuY29tbWFuZEZvcmNlU3RhcnQsXHJcbiAgICAgICAgICAgIGNvbW1hbmRGb3JjZVN0b3A6IHRyYWNlQ29tcG9uZW50Q29udHJvbC5jb21tYW5kRm9yY2VTdG9wLFxyXG4gICAgICAgICAgICB0cmFjZVN0YXRlOiB0cmFjZUNvbXBvbmVudENvbnRyb2wudHJhY2VTdGF0ZSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogICBDb25uZWN0cyB0aGUgVHJhY2VWaWV3V2lkZ2V0IHRvIHRoZSB0cmFjZSBjb250cm9sIHByb3ZpZGVyKHRyYWNlIHN0YXRlKVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbm5lY3RUcmFjZVZpZXdXaWRnZXRUb1RyYWNlU3RhdGUoKTogYW55IHtcclxuICAgICAgICB0aGlzLl9pc0xvYWRpbmdUcmFjZURhdGEgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gbG9hZCB0cmFjZSBkYXRhIGluaXRpYWxseSBpZiBhdmFpbGFibGVcclxuICAgICAgICBpZiAodGhpcy5fdHJhY2VTdGF0ZSA9PSBUcmFjZVN0YXRlSWRzLkRhdGFfYXZhaWxhYmxlKSB7XHJcbiAgICAgICAgICAgIC8vIEluaXRpYWwgbG9hZCB0cmFjZSBkYXRhXHJcbiAgICAgICAgICAgIHRoaXMubG9hZFRyYWNlRGF0YUZyb21UYXJnZXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFRyYWNlVmlld1dpZGdldCB9OyJdfQ==