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
define(["require", "exports", "./chartViewChartManager", "../chartViewWidget/chartViewLayoutManager", "../common/widgetBase", "../../framework/events", "../chartWidget/userInteraction/userInteractionController", "../chartWidget/userInteraction/commands/setCursorCommand", "../chartWidget/userInteraction/commands/resetZoomCommand", "../chartWidget/ChartBase", "../chartWidget/userInteraction/commands/cursorHoveringCommand", "../chartWidget/userInteraction/commands/dragCursorCommand", "../chartWidget/userInteraction/commands/endCursorDragCommand", "../chartWidget/userInteraction/commands/panChartCommand", "../chartWidget/userInteraction/commands/toogleBoxZoomCommand", "../chartWidget/userInteraction/commands/tooglePanningCommand", "../chartWidget/userInteraction/commands/selectZoomAxesCommand", "../../models/chartManagerDataModel/chartManagerChart", "../common/interfaces/dropInterface", "../chartWidget/userInteraction/commands/zoomChartCommand", "../chartWidget/userInteraction/commands/selectPanningAxesCommand", "../../models/common/series/baseSeries", "./helpers/chartDropHelper", "../chartWidget/userInteraction/commands/autoScaleCommand", "../chartWidget/userInteraction/commands/resetDragPositionCommand", "../chartWidget/userInteraction/commands/resetCursorHoveringCommand", "../common/SerieChartTypeHelper", "../../models/common/series/seriesType", "./componentDefaultDefinition"], function (require, exports, chartViewChartManager_1, chartViewLayoutManager_1, widgetBase_1, events_1, userInteractionController_1, setCursorCommand_1, resetZoomCommand_1, ChartBase_1, cursorHoveringCommand_1, dragCursorCommand_1, endCursorDragCommand_1, panChartCommand_1, toogleBoxZoomCommand_1, tooglePanningCommand_1, selectZoomAxesCommand_1, chartManagerChart_1, dropInterface_1, zoomChartCommand_1, selectPanningAxesCommand_1, baseSeries_1, chartDropHelper_1, autoScaleCommand_1, resetDragPositionCommand_1, resetCursorHoveringCommand_1, SerieChartTypeHelper_1, seriesType_1, componentDefaultDefinition_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventDropHelper = /** @class */ (function (_super) {
        __extends(EventDropHelper, _super);
        function EventDropHelper() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventDropHelper;
    }(events_1.TypedEvent));
    exports.EventDropHelper = EventDropHelper;
    ;
    var ChartViewTools;
    (function (ChartViewTools) {
        ChartViewTools[ChartViewTools["none"] = 0] = "none";
        ChartViewTools[ChartViewTools["referenceCursor1"] = 1] = "referenceCursor1";
        ChartViewTools[ChartViewTools["referenceCursor2"] = 2] = "referenceCursor2";
        ChartViewTools[ChartViewTools["pageScroll"] = 3] = "pageScroll";
        ChartViewTools[ChartViewTools["chartScroll"] = 4] = "chartScroll";
        ChartViewTools[ChartViewTools["boxZoom"] = 5] = "boxZoom";
        ChartViewTools[ChartViewTools["panning"] = 6] = "panning";
    })(ChartViewTools || (ChartViewTools = {}));
    exports.ChartViewTools = ChartViewTools;
    var ZoomDirection;
    (function (ZoomDirection) {
        ZoomDirection[ZoomDirection["X"] = 0] = "X";
        ZoomDirection[ZoomDirection["Y"] = 1] = "Y";
        ZoomDirection[ZoomDirection["XY"] = 2] = "XY";
    })(ZoomDirection || (ZoomDirection = {}));
    exports.ZoomDirection = ZoomDirection;
    var ChartViewWidget = /** @class */ (function (_super) {
        __extends(ChartViewWidget, _super);
        function ChartViewWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.eventDropHelper = new EventDropHelper();
            _this.activeSelectedZoomAxis = ZoomDirection.XY;
            _this.dropPossible = false;
            _this._scrollbarTopPosition = 0;
            _this.chartCommandMap = {};
            _this._userInteractionControllerExecuteChartCommandHandler = function (sender, args) { return _this.onExecuteChartCommand(sender, args); };
            _this._chartManagerModelChangedHandler = function (sender, data) { return _this.onChartManagerModelChanged(sender, data); };
            return _this;
            //****************************************#endregion drop support*****************************************
        }
        /**
         * Defines the height of the header
         *
         * @returns {number}
         * @memberof ChartViewWidget
         */
        ChartViewWidget.prototype.defineHeaderHeight = function () {
            return 30;
        };
        ChartViewWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
        };
        /**
         * Dispose the objects from this widget
         *
         * @memberof ChartViewWidget
         */
        ChartViewWidget.prototype.dispose = function () {
            this.removeSupportedDragDropDataId(dropInterface_1.DragDropDataId.signal);
            this.detachChartManagerDataModelEvents();
            if (this._layoutManager != undefined) {
                this._layoutManager.dispose();
            }
            if (this.chartManager != undefined) {
                this.chartManager.dispose();
            }
            if (this.userInteractionController != undefined) {
                this.userInteractionController.eventExecuteChartCommand.detach(this._userInteractionControllerExecuteChartCommandHandler);
            }
            _super.prototype.dispose.call(this);
        };
        /**
         * Creates the layout of the widget
         *
         * @memberof ChartViewWidget
         */
        ChartViewWidget.prototype.createLayout = function () {
            $(this.mainDiv).css("overflow", "hidden");
            $(this.mainDiv).append('<div id="InnerChartViewContainer" style="display: flex; flex-direction: column; height: 100%;"></div>');
            if (this.view != undefined) {
                this.userInteractionController = new userInteractionController_1.UserInteractionController(this.states);
            }
            this._layoutManager = new chartViewLayoutManager_1.ChartViewLayoutManager(this, this.component);
            var div = $(this.mainDiv).find("#InnerChartViewContainer");
            this._layoutManager.addChartViewContainers(div);
        };
        /**
         * Loads the styles for the chart view toolbar
         *
         * @memberof ChartViewWidget
         */
        ChartViewWidget.prototype.loadStyles = function () {
            _super.prototype.addStyle.call(this, "widgets/chartViewWidget/style/css/refCursorStyle.css");
        };
        ChartViewWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            this.setHeaderContent("Analysis");
            this.initChartManagerDataModel();
            if (this.userInteractionController) {
                this.chartManager = new chartViewChartManager_1.ChartViewChartManager(this, this.userInteractionController, this._layoutManager, this.dataModel);
            }
            this.addChartCommands();
            this._layoutManager.initializeChartViewLayout();
            this.disableMouseWheelForScrollbar();
            this.attachChartManagerDataModelEvents();
            this.chartManager.initChartViewWithDataModel();
            this.enableScrollPersisting();
            this.addSupportedDragDropDataId(dropInterface_1.DragDropDataId.signal);
        };
        ChartViewWidget.prototype.initChartManagerDataModel = function () {
            var dataModel = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.ChartManagerDataModelId);
            this.dataModel = dataModel;
        };
        /**
         * Attaches the chart manager datamodel events
         *
         * @private
         * @memberof ChartViewWidget
         */
        ChartViewWidget.prototype.attachChartManagerDataModelEvents = function () {
            if (this.dataModel) {
                this.dataModel.eventModelChanged.attach(this._chartManagerModelChangedHandler);
            }
        };
        /**
         * Detaches the chart manager datamodel events
         *
         * @private
         * @memberof ChartViewWidget
         */
        ChartViewWidget.prototype.detachChartManagerDataModelEvents = function () {
            if (this.dataModel) {
                this.dataModel.eventModelChanged.detach(this._chartManagerModelChangedHandler);
            }
        };
        ChartViewWidget.prototype.onChartManagerModelChanged = function (sender, args) {
            // Update the chart view widget
            this.refreshCharts(sender, args);
        };
        ChartViewWidget.prototype.addChartCommands = function () {
            if (this.chartManager != undefined && this.userInteractionController != undefined) {
                var setCursorOnPointerPositionCommand = new setCursorCommand_1.SetCursorOnPointerPositionCommand(this.chartManager);
                this.chartCommandMap[userInteractionController_1.ChartCommandType.setCursorOnPointerPosition] = setCursorOnPointerPositionCommand;
                var resetZoomCommand = new resetZoomCommand_1.ResetZoomCommand(this.chartManager);
                this.chartCommandMap[userInteractionController_1.ChartCommandType.resetZoom] = resetZoomCommand;
                var checkCursorHoveringCommand = new cursorHoveringCommand_1.CheckCursorHoveringCommand(this.chartManager);
                this.chartCommandMap[userInteractionController_1.ChartCommandType.checkCursorHovering] = checkCursorHoveringCommand;
                var dragCursorCommand = new dragCursorCommand_1.DragCursorCommand(this.chartManager);
                this.chartCommandMap[userInteractionController_1.ChartCommandType.dragCursor] = dragCursorCommand;
                var endCursorDragCommand = new endCursorDragCommand_1.EndCursorDragCommand(this.chartManager);
                this.chartCommandMap[userInteractionController_1.ChartCommandType.endCursorDrag] = endCursorDragCommand;
                var panChartCommand = new panChartCommand_1.PanChartCommand(this.chartManager);
                this.chartCommandMap[userInteractionController_1.ChartCommandType.panChart] = panChartCommand;
                var toggleBoxZoomCommand = new toogleBoxZoomCommand_1.ToogleBoxZoomCommand(this.chartManager);
                this.chartCommandMap[userInteractionController_1.ChartCommandType.toggleBoxZoom] = toggleBoxZoomCommand;
                var togglePanningCommand = new tooglePanningCommand_1.TooglePanningCommand(this.chartManager);
                this.chartCommandMap[userInteractionController_1.ChartCommandType.togglePanning] = togglePanningCommand;
                var selectZoomAxesCommand = new selectZoomAxesCommand_1.SelectZoomAxesCommand(this.chartManager);
                this.chartCommandMap[userInteractionController_1.ChartCommandType.selectZoomAxis] = selectZoomAxesCommand;
                var zoomChartCommand = new zoomChartCommand_1.ZoomChartCommand(this.chartManager);
                this.chartCommandMap[userInteractionController_1.ChartCommandType.zoomChart] = zoomChartCommand;
                var selectPanningAxesCommand = new selectPanningAxesCommand_1.SelectPanningAxesCommand(this.chartManager);
                this.chartCommandMap[userInteractionController_1.ChartCommandType.selectPanningAxes] = selectPanningAxesCommand;
                var autoScaleCommand = new autoScaleCommand_1.AutoScaleCommand(this.chartManager);
                this.chartCommandMap[userInteractionController_1.ChartCommandType.autoScale] = autoScaleCommand;
                var resetDragPositionCommand = new resetDragPositionCommand_1.ResetDragPositionCommand(this.chartManager);
                this.chartCommandMap[userInteractionController_1.ChartCommandType.resetDragPosition] = resetDragPositionCommand;
                var resetCursorHoveringCommand = new resetCursorHoveringCommand_1.ResetCursorHoveringCommand(this.chartManager);
                this.chartCommandMap[userInteractionController_1.ChartCommandType.resetCursorHovering] = resetCursorHoveringCommand;
                this.userInteractionController.eventExecuteChartCommand.attach(this._userInteractionControllerExecuteChartCommandHandler);
            }
            else {
                console.log("chartManager undefined");
            }
        };
        ChartViewWidget.prototype.onExecuteChartCommand = function (sender, args) {
            this.chartCommandMap[args.commandType].onExecuteChartCommand(sender, args);
        };
        ChartViewWidget.prototype.onEventToolbarButtonClicked = function (sender, args) {
            if (this.userInteractionController) {
                this.userInteractionController.onToolbarClick(sender, args);
            }
        };
        ChartViewWidget.prototype.onUserChartInteraction = function (sender, eventUserChartInteractionArgs) {
            if (this.userInteractionController) {
                this.userInteractionController.onChartInteraction(eventUserChartInteractionArgs.chartInteractionType, sender, eventUserChartInteractionArgs.eventArguments);
            }
        };
        ChartViewWidget.prototype.resize = function (width, height) {
            var div = $(this.mainDiv).find("#InnerChartViewContainer");
            var heightWithoutHeader = height - this._headerHeight;
            div[0].style.height = heightWithoutHeader + "px";
            //If width is not defined, it means it is first resize and scroll needs to be set
            if (div[0].style.width === "") {
                var scrollbarSettings = this.component.getSetting(ChartViewWidget.ScrollbarSettingId);
                this.setScrollBarSettings(scrollbarSettings);
            }
            div[0].style.width = width + "px";
            this._layoutManager.resize(width, heightWithoutHeader);
        };
        ChartViewWidget.prototype.updateCharts = function (traceChartList) {
            this._layoutManager.updateCharts(this.chartManager.traceChartList);
        };
        ChartViewWidget.prototype.refreshCharts = function (sender, data) {
            this.chartManager.onChartManagerModelChanged(sender, data);
        };
        ChartViewWidget.prototype.getTraceChartByName = function (name) {
            if (this.chartManager != undefined) {
                return this.chartManager.getTraceChartByName(name);
            }
            return undefined;
        };
        ChartViewWidget.prototype.setPageScroll = function (enable) {
            ChartViewWidget._pageScrollActive = enable;
        };
        ChartViewWidget.prototype.selectReferenceCursor = function (cursorIndex) {
            if (this.userInteractionController) {
                this.userInteractionController.selectCursor(cursorIndex);
            }
            else {
                console.error("UserInteractionController not defined");
            }
        };
        ChartViewWidget.prototype.disableMouseWheelForScrollbar = function () {
            $("#" + this._layoutManager.chartSplitterParentContainerId).bind('mousewheel DOMMouseScroll', function (e) {
                var disableScrollbarScroll = false;
                if (ChartViewWidget._pageScrollActive == false && e.target.id !== 'ChartViewChartSplitterContainer') {
                    if (e.type == 'mousewheel') {
                        disableScrollbarScroll = true;
                    }
                    else if (e.type == 'DOMMouseScroll') {
                        disableScrollbarScroll = true;
                    }
                }
                if (disableScrollbarScroll) {
                    e.preventDefault();
                }
            });
        };
        /**
         * Enable persistency of scroll
         *
         * @private
         * @memberof ChartViewWidget
         */
        ChartViewWidget.prototype.enableScrollPersisting = function () {
            var widget = this;
            $("#" + this._layoutManager.chartSplitterParentContainerId).scroll(function (e) {
                widget._scrollbarTopPosition = this.scrollTop;
                widget.saveSettings();
            });
        };
        ChartViewWidget.prototype.getComponentSettings = function (onlyModified) {
            this.component.setSetting(ChartViewWidget.ScrollbarSettingId, this.getScrollBarSettings());
            return _super.prototype.getComponentSettings.call(this, onlyModified);
        };
        ChartViewWidget.prototype.getScrollBarSettings = function () {
            var settings = { "vertical": this._scrollbarTopPosition };
            return settings;
        };
        ChartViewWidget.prototype.setScrollBarSettings = function (data) {
            if (data == undefined) {
                return;
            }
            $("#" + this._layoutManager.chartSplitterParentContainerId)[0].scrollTo(0, data["vertical"]);
        };
        //***************************************#Region drop support**************************************************
        ChartViewWidget.prototype.dragStart = function (args) {
            if (args.data[0] instanceof baseSeries_1.BaseSeries) {
                var sameGroup = this.areSeriesFromSameGroup(args.data);
                this.chartManager.addDroppableLocations(args.data, sameGroup);
            }
        };
        ChartViewWidget.prototype.dragStop = function (args) {
            if (args.data[0] instanceof baseSeries_1.BaseSeries) {
                this.chartManager.removeDroppableLocations();
            }
        };
        ChartViewWidget.prototype.dragOver = function (args) {
            var _a;
            this.dropPossible = false;
            var targetChartContainerId = args.currentTarget.parentElement.id;
            var targetChart = this.chartManager.getTraceChartByContainerId(targetChartContainerId);
            var chartManagerDataModel = this.dataModel;
            var dropHelper = new chartDropHelper_1.ChartDropHelper(chartManagerDataModel, this);
            var chartArea = this.getChartAreaId(args.currentTarget);
            if (targetChart != undefined) {
                // Drag over a chart/chart widget
                var series = args.data;
                var chart = targetChart;
                var dropLocationType = dropHelper.getDropLocationType(args.currentTarget, chart, series);
                this.dragAndDropRepresentation(chart, series, dropLocationType, args.dragDropRepresentation);
                this.highlightDroppableAreas(chart, args.currentTarget);
            }
            else if (dropHelper.canAddChart() == true) { // Is it possible to add one more chart
                var chartViewChartSplitterLastPaneId = (_a = this._layoutManager) === null || _a === void 0 ? void 0 : _a.chartSplitter.getLastPaneId();
                this.resetHighlighting();
                // Maybe drag over empty space
                if (chartArea == chartViewChartSplitterLastPaneId + "_YT") {
                    this.dropPossible = true;
                    this.updateDragDropRepresentation(args.dragDropRepresentation, "../app/widgets/common/style/images/dragDrop/addNewYTChart.svg", "Create a new YT chart and add dragged signals");
                    this.updateChartTypeDroppableAreas(chartArea);
                }
                else if (chartArea == chartViewChartSplitterLastPaneId + "_FFT") {
                    this.dropPossible = true;
                    this.updateDragDropRepresentation(args.dragDropRepresentation, "../app/widgets/common/style/images/dragDrop/addNewFFTChart.svg", "Create a new FFT chart and add dragged signals");
                    this.updateChartTypeDroppableAreas(chartArea);
                }
                else if (chartArea == chartViewChartSplitterLastPaneId + "_XY") {
                    this.dropPossible = true;
                    this.updateDragDropRepresentation(args.dragDropRepresentation, "../app/widgets/common/style/images/dragDrop/addNewXYChart.svg", "Create a new XY chart and add a calculated XY signal");
                    this.updateChartTypeDroppableAreas(chartArea);
                }
            }
            if (chartArea == undefined) {
                this.updateChartTypeDroppableAreas(chartArea);
            }
            return this.dropPossible;
        };
        ChartViewWidget.prototype.dragAndDropRepresentation = function (chart, series, dropLocationType, dragDropRepresentation) {
            if (chart.type == chartManagerChart_1.ChartType.YTChart || chart.type == chartManagerChart_1.ChartType.FFTChart) {
                if (dropLocationType == ChartBase_1.DropLocationType.addNewScale) {
                    this.dropPossible = true;
                    if (series[0].type === seriesType_1.SeriesType.timeSeries && chart.type == chartManagerChart_1.ChartType.FFTChart) {
                        this.updateDragDropRepresentation(dragDropRepresentation, "../app/widgets/common/style/images/dragDrop/addNewScale.svg", "Calculate FFT signal and add it to new scale");
                    }
                    else {
                        this.updateDragDropRepresentation(dragDropRepresentation, "../app/widgets/common/style/images/dragDrop/addNewScale.svg", "Create a new scale and add dragged signals");
                    }
                }
                else if (dropLocationType == ChartBase_1.DropLocationType.assignToScale) {
                    this.dropPossible = true;
                    if (series[0].type === seriesType_1.SeriesType.timeSeries && chart.type == chartManagerChart_1.ChartType.FFTChart) {
                        this.updateDragDropRepresentation(dragDropRepresentation, "../app/widgets/common/style/images/dragDrop/assignToScale.svg", "Calculate FFT signal and add it to scale");
                    }
                    else {
                        this.updateDragDropRepresentation(dragDropRepresentation, "../app/widgets/common/style/images/dragDrop/assignToScale.svg", "Add dragged signals to scale");
                    }
                }
            }
            else {
                if (dropLocationType == ChartBase_1.DropLocationType.assignToScale && this.areSeriesFromSameGroup(series)) {
                    this.dropPossible = true;
                    if (series[0].type == seriesType_1.SeriesType.timeSeries) {
                        this.updateDragDropRepresentation(dragDropRepresentation, "../app/widgets/common/style/images/dragDrop/assignToChart.svg", "Calculate XY signal and add it to the chart");
                    }
                    else {
                        this.updateDragDropRepresentation(dragDropRepresentation, "../app/widgets/common/style/images/dragDrop/assignToChart.svg", "Add dragged signals to chart");
                    }
                }
            }
        };
        /**
         * Updates the drag and drop representation while dragging with new icons or texts
         *
         * @private
         * @param {DragDropRepresentation} dragDropRepresentation
         * @param {string} overlayIconPath
         * @param {string} newText
         * @memberof ChartViewWidget
         */
        ChartViewWidget.prototype.updateDragDropRepresentation = function (dragDropRepresentation, overlayIconPath, newText) {
            if (dragDropRepresentation != undefined) {
                // Add overlay icon if available
                if (overlayIconPath != "") {
                    var imageProvider = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.ImageProviderId);
                    if (imageProvider != undefined) {
                        var addNewScaleImage = imageProvider.getImage(overlayIconPath);
                        if (addNewScaleImage != "") {
                            dragDropRepresentation.iconList.push(addNewScaleImage);
                        }
                    }
                }
                // add text or replace existing text
                if (dragDropRepresentation.textList.length == 0) {
                    dragDropRepresentation.textList.push(newText);
                }
                else {
                    dragDropRepresentation.textList[0] = newText;
                }
            }
        };
        ChartViewWidget.prototype.drop = function (args) {
            var series = args.data;
            if (this.dropPossible) { // Is drop possible
                var chartManagerDataModel = this.dataModel;
                var dropHelper = new chartDropHelper_1.ChartDropHelper(chartManagerDataModel, this);
                var targetChart = this.chartManager.getTraceChartByContainerId(args.currentTarget.parentElement.id);
                if (targetChart != undefined) {
                    var chart = chartManagerDataModel.getChart(targetChart.widgetName);
                    series = SerieChartTypeHelper_1.SerieChartTypeHelper.getDroppableSeries(chart.getAllSeries(), series);
                }
                dropHelper.addSeries(args.currentTarget, targetChart, series, this._layoutManager);
            }
        };
        /**
         * Mouse is not over chartView while dragging operation
         *
         * @param {DragDropArgs} args
         * @memberof ChartViewWidget
         */
        ChartViewWidget.prototype.dropFocusLost = function (args) {
            this.updateChartTypeDroppableAreas(args.currentTarget);
            this.resetHighlighting();
        };
        /**
         * Highlights areas where signals is being dragged
         *
         * @param {ChartBase} chart
         * @param {*} currentTarget
         * @memberof ChartViewWidget
         */
        ChartViewWidget.prototype.highlightDroppableAreas = function (chart, currentTarget) {
            if (currentTarget.id.includes("_axisDropZoneScale") || currentTarget.id.includes("_axisDropZone_chartArea") || currentTarget.id.includes("_refCursor_")) {
                chart.updateDroppableAreas(currentTarget);
                this.resetHighlighting(chart);
            }
            else {
                this.resetHighlighting();
            }
        };
        /**
         * Reset highlighted areas for all charts, except the selected one
         *
         * @param {ITraceChart} [chart]
         * @memberof ChartViewWidget
         */
        ChartViewWidget.prototype.resetHighlighting = function (chart) {
            var traceCharts = this.chartManager.traceChartList;
            for (var i = 0; i < traceCharts.length; i++) {
                if (chart != traceCharts[i]) {
                    traceCharts[i].resetHighlighting();
                }
            }
        };
        /**
         * Update highlighting state for chart Type areas
         *
         * @protected
         * @param {(string | undefined)} currentTargetId
         * @memberof ChartViewWidget
         */
        ChartViewWidget.prototype.updateChartTypeDroppableAreas = function (currentTargetId) {
            var _a;
            var chartViewChartSplitterLastPaneId = (_a = this._layoutManager) === null || _a === void 0 ? void 0 : _a.chartSplitter.getLastPaneId();
            var emptySpaceElement = document.getElementById(chartViewChartSplitterLastPaneId);
            if (emptySpaceElement != undefined) {
                for (var i = 0; i < emptySpaceElement.childElementCount; i = i + 1) {
                    if (emptySpaceElement.children[i].id == currentTargetId) {
                        var area = document.getElementById(emptySpaceElement.children[i].id);
                        area.classList.add('draggedOver');
                    }
                    else {
                        var area = document.getElementById(emptySpaceElement.children[i].id);
                        area.classList.remove('draggedOver');
                    }
                }
            }
        };
        /**
         * Gets the chart area id
         *
         * @protected
         * @param {HTMLElement} target
         * @returns {(string | undefined)}
         * @memberof ChartViewWidget
         */
        ChartViewWidget.prototype.getChartAreaId = function (target) {
            var _a;
            var chartViewChartSplitterLastPaneId = (_a = this._layoutManager) === null || _a === void 0 ? void 0 : _a.chartSplitter.getLastPaneId();
            var ytArea = chartViewChartSplitterLastPaneId + "_YT";
            var fftArea = chartViewChartSplitterLastPaneId + "_FFT";
            var xyArea = chartViewChartSplitterLastPaneId + "_XY";
            if (target.classList.contains('disabled') || target.parentElement.classList.contains('disabled')) {
                return undefined;
            }
            else if (target.id == ytArea || target.parentElement.id == ytArea) {
                return ytArea;
            }
            else if (target.id == fftArea || target.parentElement.id == fftArea) {
                return fftArea;
            }
            else if (target.id == xyArea || target.parentElement.id == xyArea) {
                return xyArea;
            }
            return undefined;
        };
        /**
         * Returns true if drag series belong to the same serie group
         *
         * @private
         * @param {Array<BaseSeries>} series
         * @returns {boolean}
         * @memberof ChartViewWidget
         */
        ChartViewWidget.prototype.areSeriesFromSameGroup = function (series) {
            var parent = series[0].parent;
            for (var i = 1; i < series.length; i = i + 1) {
                if (series[i].parent != parent) {
                    return false;
                }
            }
            return true;
        };
        ChartViewWidget._pageScrollActive = false;
        ChartViewWidget.ScrollbarSettingId = "scrollbar";
        return ChartViewWidget;
    }(widgetBase_1.WidgetBase));
    exports.ChartViewWidget = ChartViewWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRWaWV3V2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0Vmlld1dpZGdldC9jaGFydFZpZXdXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQXNDQTtRQUE4QixtQ0FBc0I7UUFBcEQ7O1FBQXVELENBQUM7UUFBRCxzQkFBQztJQUFELENBQUMsQUFBeEQsQ0FBOEIsbUJBQVUsR0FBZ0I7SUFva0JDLDBDQUFlO0lBcGtCaEIsQ0FBQztJQUV6RCxJQUFLLGNBUUo7SUFSRCxXQUFLLGNBQWM7UUFDZixtREFBSSxDQUFBO1FBQ0osMkVBQWdCLENBQUE7UUFDaEIsMkVBQWdCLENBQUE7UUFDaEIsK0RBQVUsQ0FBQTtRQUNWLGlFQUFXLENBQUE7UUFDWCx5REFBTyxDQUFBO1FBQ1AseURBQU8sQ0FBQTtJQUNYLENBQUMsRUFSSSxjQUFjLEtBQWQsY0FBYyxRQVFsQjtJQTBqQnlCLHdDQUFjO0lBeGpCeEMsSUFBSyxhQUlKO0lBSkQsV0FBSyxhQUFhO1FBQ2QsMkNBQUMsQ0FBQTtRQUNELDJDQUFDLENBQUE7UUFDRCw2Q0FBRSxDQUFBO0lBQ04sQ0FBQyxFQUpJLGFBQWEsS0FBYixhQUFhLFFBSWpCO0lBb2pCeUMsc0NBQWE7SUFsakJ2RDtRQUE4QixtQ0FBVTtRQUF4QztZQUFBLHFFQWdqQkM7WUE5aUJHLHFCQUFlLEdBQW9CLElBQUksZUFBZSxFQUFFLENBQUM7WUFPekQsNEJBQXNCLEdBQUcsYUFBYSxDQUFDLEVBQUUsQ0FBQztZQUMxQyxrQkFBWSxHQUFZLEtBQUssQ0FBQztZQUc5QiwyQkFBcUIsR0FBVyxDQUFDLENBQUM7WUFHMUIscUJBQWUsR0FBdUMsRUFBRSxDQUFDO1lBRXpELDBEQUFvRCxHQUFHLFVBQUMsTUFBTSxFQUFDLElBQUksSUFBRyxPQUFBLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFD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REFBc0IsR0FBOUIsVUFBK0IsTUFBeUI7WUFDcEQsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUM5QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBQztnQkFDekMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLE1BQU0sRUFBQztvQkFDM0IsT0FBTyxLQUFLLENBQUM7aUJBQ2hCO2FBQ0o7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBbGlCTSxpQ0FBaUIsR0FBWSxLQUFLLENBQUM7UUFHbkIsa0NBQWtCLEdBQUcsV0FBVyxDQUFDO1FBa2lCNUQsc0JBQUM7S0FBQSxBQWhqQkQsQ0FBOEIsdUJBQVUsR0FnakJ2QztJQUVRLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyIH0gZnJvbSBcIi4vY2hhcnRWaWV3Q2hhcnRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IENoYXJ0Vmlld0xheW91dE1hbmFnZXIgfSBmcm9tIFwiLi4vY2hhcnRWaWV3V2lkZ2V0L2NoYXJ0Vmlld0xheW91dE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vd2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBJVHJhY2VDaGFydCB9IGZyb20gXCIuLi9jaGFydFdpZGdldC9pbnRlcmZhY2VzL3RyYWNlQ2hhcnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IFVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXIsIENoYXJ0Q29tbWFuZFR5cGUgfSBmcm9tIFwiLi4vY2hhcnRXaWRnZXQvdXNlckludGVyYWN0aW9uL3VzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IHsgU2V0Q3Vyc29yT25Qb2ludGVyUG9zaXRpb25Db21tYW5kIH0gZnJvbSBcIi4uL2NoYXJ0V2lkZ2V0L3VzZXJJbnRlcmFjdGlvbi9jb21tYW5kcy9zZXRDdXJzb3JDb21tYW5kXCI7XHJcbmltcG9ydCB7IFJlc2V0Wm9vbUNvbW1hbmQgfSBmcm9tIFwiLi4vY2hhcnRXaWRnZXQvdXNlckludGVyYWN0aW9uL2NvbW1hbmRzL3Jlc2V0Wm9vbUNvbW1hbmRcIjtcclxuaW1wb3J0IHsgQ2hhcnRDb21tYW5kQmFzZSB9IGZyb20gXCIuLi9jaGFydFdpZGdldC91c2VySW50ZXJhY3Rpb24vY2hhcnRDb21tYW5kQmFzZVwiO1xyXG5pbXBvcnQgeyBFdmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncywgQ2hhcnRCYXNlLCBEcm9wTG9jYXRpb25UeXBlIH0gZnJvbSBcIi4uL2NoYXJ0V2lkZ2V0L0NoYXJ0QmFzZVwiO1xyXG5pbXBvcnQgeyBDaGVja0N1cnNvckhvdmVyaW5nQ29tbWFuZCB9IGZyb20gXCIuLi9jaGFydFdpZGdldC91c2VySW50ZXJhY3Rpb24vY29tbWFuZHMvY3Vyc29ySG92ZXJpbmdDb21tYW5kXCI7XHJcbmltcG9ydCB7IERyYWdDdXJzb3JDb21tYW5kIH0gZnJvbSBcIi4uL2NoYXJ0V2lkZ2V0L3VzZXJJbnRlcmFjdGlvbi9jb21tYW5kcy9kcmFnQ3Vyc29yQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBFbmRDdXJzb3JEcmFnQ29tbWFuZCB9IGZyb20gXCIuLi9jaGFydFdpZGdldC91c2VySW50ZXJhY3Rpb24vY29tbWFuZHMvZW5kQ3Vyc29yRHJhZ0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgUGFuQ2hhcnRDb21tYW5kIH0gZnJvbSBcIi4uL2NoYXJ0V2lkZ2V0L3VzZXJJbnRlcmFjdGlvbi9jb21tYW5kcy9wYW5DaGFydENvbW1hbmRcIjtcclxuaW1wb3J0IHsgVG9vZ2xlQm94Wm9vbUNvbW1hbmQgYXMgVG9nZ2xlQm94Wm9vbUNvbW1hbmQgfSBmcm9tIFwiLi4vY2hhcnRXaWRnZXQvdXNlckludGVyYWN0aW9uL2NvbW1hbmRzL3Rvb2dsZUJveFpvb21Db21tYW5kXCI7XHJcbmltcG9ydCB7IFRvb2dsZVBhbm5pbmdDb21tYW5kIH0gZnJvbSBcIi4uL2NoYXJ0V2lkZ2V0L3VzZXJJbnRlcmFjdGlvbi9jb21tYW5kcy90b29nbGVQYW5uaW5nQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBTZWxlY3Rab29tQXhlc0NvbW1hbmQgfSBmcm9tIFwiLi4vY2hhcnRXaWRnZXQvdXNlckludGVyYWN0aW9uL2NvbW1hbmRzL3NlbGVjdFpvb21BeGVzQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBDaGFydFR5cGUgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9jaGFydE1hbmFnZXJDaGFydFwiO1xyXG5pbXBvcnQgeyBJRHJvcHBhYmxlLCBEcmFnRHJvcERhdGFJZCB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9kcm9wSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFpvb21DaGFydENvbW1hbmQgfSBmcm9tIFwiLi4vY2hhcnRXaWRnZXQvdXNlckludGVyYWN0aW9uL2NvbW1hbmRzL3pvb21DaGFydENvbW1hbmRcIjtcclxuaW1wb3J0IHsgU2VsZWN0UGFubmluZ0F4ZXNDb21tYW5kIH0gZnJvbSBcIi4uL2NoYXJ0V2lkZ2V0L3VzZXJJbnRlcmFjdGlvbi9jb21tYW5kcy9zZWxlY3RQYW5uaW5nQXhlc0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3Nlcmllcy9iYXNlU2VyaWVzXCI7XHJcbmltcG9ydCB7IElDaGFydE1hbmFnZXJEYXRhTW9kZWwgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9pbnRlcmZhY2VzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDaGFydERyb3BIZWxwZXIgfSBmcm9tIFwiLi9oZWxwZXJzL2NoYXJ0RHJvcEhlbHBlclwiO1xyXG5pbXBvcnQgeyBBdXRvU2NhbGVDb21tYW5kIH0gZnJvbSBcIi4uL2NoYXJ0V2lkZ2V0L3VzZXJJbnRlcmFjdGlvbi9jb21tYW5kcy9hdXRvU2NhbGVDb21tYW5kXCI7XHJcbmltcG9ydCB7IERyYWdEcm9wQXJncyB9IGZyb20gXCIuLi9jb21tb24vZHJhZ0Ryb3BBcmdzXCI7XHJcbmltcG9ydCB7IFJlc2V0RHJhZ1Bvc2l0aW9uQ29tbWFuZCB9IGZyb20gXCIuLi9jaGFydFdpZGdldC91c2VySW50ZXJhY3Rpb24vY29tbWFuZHMvcmVzZXREcmFnUG9zaXRpb25Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlc2V0Q3Vyc29ySG92ZXJpbmdDb21tYW5kIH0gZnJvbSBcIi4uL2NoYXJ0V2lkZ2V0L3VzZXJJbnRlcmFjdGlvbi9jb21tYW5kcy9yZXNldEN1cnNvckhvdmVyaW5nQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBEcmFnRHJvcFJlcHJlc2VudGF0aW9uIH0gZnJvbSBcIi4uL2NvbW1vbi9kcmFnRHJvcFJlcHJlc2VudGF0aW9uXCI7XHJcbmltcG9ydCB7IElDaGFydE1hbmFnZXJDaGFydCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2ludGVyZmFjZXMvY2hhcnRNYW5hZ2VyQ2hhcnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2VyaWVDaGFydFR5cGVIZWxwZXIgfSBmcm9tIFwiLi4vY29tbW9uL1NlcmllQ2hhcnRUeXBlSGVscGVyXCI7XHJcbmltcG9ydCB7IFNlcmllc1R5cGUgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9zZXJpZXMvc2VyaWVzVHlwZVwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbiB9IGZyb20gXCIuL2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IElJbWFnZVByb3ZpZGVyIH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL2ltYWdlUHJvdmlkZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgRXZlbnRNb2RlbENoYW5nZWRBcmdzLCBJRGF0YU1vZGVsIH0gZnJvbSBcIi4uLy4uL21vZGVscy9kYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuXHJcblxyXG5jbGFzcyBFdmVudERyb3BIZWxwZXIgZXh0ZW5kcyBUeXBlZEV2ZW50PE9iamVjdCwge30+IHsgfTtcclxuXHJcbmVudW0gQ2hhcnRWaWV3VG9vbHMge1xyXG4gICAgbm9uZSxcclxuICAgIHJlZmVyZW5jZUN1cnNvcjEsXHJcbiAgICByZWZlcmVuY2VDdXJzb3IyLFxyXG4gICAgcGFnZVNjcm9sbCxcclxuICAgIGNoYXJ0U2Nyb2xsLFxyXG4gICAgYm94Wm9vbSxcclxuICAgIHBhbm5pbmcsXHJcbn1cclxuXHJcbmVudW0gWm9vbURpcmVjdGlvbiB7XHJcbiAgICBYLFxyXG4gICAgWSxcclxuICAgIFhZXHJcbn1cclxuXHJcbmNsYXNzIENoYXJ0Vmlld1dpZGdldCBleHRlbmRzIFdpZGdldEJhc2UgaW1wbGVtZW50cyBJRHJvcHBhYmxlIHtcclxuXHJcbiAgICBldmVudERyb3BIZWxwZXI6IEV2ZW50RHJvcEhlbHBlciA9IG5ldyBFdmVudERyb3BIZWxwZXIoKTtcclxuICAgIC8vZXZlbnREcmFnT3ZlcjogRXZlbnREcmFnT3ZlciA9IG5ldyBFdmVudERyYWdPdmVyKCk7XHJcblxyXG4gICAgX2xheW91dE1hbmFnZXI/OiBDaGFydFZpZXdMYXlvdXRNYW5hZ2VyO1xyXG4gICAgY2hhcnRNYW5hZ2VyPzogQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyXHJcbiAgICB1c2VySW50ZXJhY3Rpb25Db250cm9sbGVyPzogVXNlckludGVyYWN0aW9uQ29udHJvbGxlcjtcclxuICAgIFxyXG4gICAgYWN0aXZlU2VsZWN0ZWRab29tQXhpcyA9IFpvb21EaXJlY3Rpb24uWFk7XHJcbiAgICBkcm9wUG9zc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHN0YXRpYyBfcGFnZVNjcm9sbEFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIF9zY3JvbGxiYXJUb3BQb3NpdGlvbjogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgU2Nyb2xsYmFyU2V0dGluZ0lkID0gXCJzY3JvbGxiYXJcIjtcclxuXHJcbiAgICBwcml2YXRlIGNoYXJ0Q29tbWFuZE1hcDogeyBbaWQ6IHN0cmluZ106IENoYXJ0Q29tbWFuZEJhc2UgfSA9IHt9O1xyXG5cclxuICAgIHByaXZhdGUgX3VzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXJFeGVjdXRlQ2hhcnRDb21tYW5kSGFuZGxlciA9IChzZW5kZXIsYXJncyk9PnRoaXMub25FeGVjdXRlQ2hhcnRDb21tYW5kKHNlbmRlciAsYXJncyk7XHJcblxyXG4gICAgcHJpdmF0ZSBfY2hhcnRNYW5hZ2VyTW9kZWxDaGFuZ2VkSGFuZGxlciA9IChzZW5kZXIsIGRhdGEpID0+IHRoaXMub25DaGFydE1hbmFnZXJNb2RlbENoYW5nZWQoc2VuZGVyLCBkYXRhKTsgIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB0aGUgaGVpZ2h0IG9mIHRoZSBoZWFkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBkZWZpbmVIZWFkZXJIZWlnaHQoKTogbnVtYmVye1xyXG4gICAgICAgIHJldHVybiAzMDtcclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsaXplQ29tcG9uZW50KCl7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0RGVmYXVsdERlZmluaXRpb24obmV3IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZSB0aGUgb2JqZWN0cyBmcm9tIHRoaXMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBkaXNwb3NlKCkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlU3VwcG9ydGVkRHJhZ0Ryb3BEYXRhSWQoRHJhZ0Ryb3BEYXRhSWQuc2lnbmFsKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmRldGFjaENoYXJ0TWFuYWdlckRhdGFNb2RlbEV2ZW50cygpO1xyXG5cclxuICAgICAgICBpZih0aGlzLl9sYXlvdXRNYW5hZ2VyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2xheW91dE1hbmFnZXIuZGlzcG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmNoYXJ0TWFuYWdlciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJ0TWFuYWdlci5kaXNwb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMudXNlckludGVyYWN0aW9uQ29udHJvbGxlciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgIHRoaXMudXNlckludGVyYWN0aW9uQ29udHJvbGxlci5ldmVudEV4ZWN1dGVDaGFydENvbW1hbmQuZGV0YWNoKHRoaXMuX3VzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXJFeGVjdXRlQ2hhcnRDb21tYW5kSGFuZGxlcik7IFxyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgbGF5b3V0IG9mIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZUxheW91dCgpIHtcclxuXHJcbiAgICAgICAgJCh0aGlzLm1haW5EaXYpLmNzcyhcIm92ZXJmbG93XCIsIFwiaGlkZGVuXCIpO1xyXG4gICAgICAgICQodGhpcy5tYWluRGl2KS5hcHBlbmQoJzxkaXYgaWQ9XCJJbm5lckNoYXJ0Vmlld0NvbnRhaW5lclwiIHN0eWxlPVwiZGlzcGxheTogZmxleDsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgaGVpZ2h0OiAxMDAlO1wiPjwvZGl2PicpXHJcblxyXG4gICAgICAgIGlmICh0aGlzLnZpZXcgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXNlckludGVyYWN0aW9uQ29udHJvbGxlciA9IG5ldyBVc2VySW50ZXJhY3Rpb25Db250cm9sbGVyKHRoaXMuc3RhdGVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0TWFuYWdlciA9IG5ldyBDaGFydFZpZXdMYXlvdXRNYW5hZ2VyKHRoaXMsIHRoaXMuY29tcG9uZW50KTtcclxuICAgICAgICBsZXQgZGl2ID0gJCh0aGlzLm1haW5EaXYpLmZpbmQoXCIjSW5uZXJDaGFydFZpZXdDb250YWluZXJcIik7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0TWFuYWdlciEuYWRkQ2hhcnRWaWV3Q29udGFpbmVycyhkaXYpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgdGhlIHN0eWxlcyBmb3IgdGhlIGNoYXJ0IHZpZXcgdG9vbGJhclxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgbG9hZFN0eWxlcygpIHtcclxuICAgICAgICBzdXBlci5hZGRTdHlsZShcIndpZGdldHMvY2hhcnRWaWV3V2lkZ2V0L3N0eWxlL2Nzcy9yZWZDdXJzb3JTdHlsZS5jc3NcIik7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGluaXRpYWxpemVkKCl7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZWQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRIZWFkZXJDb250ZW50KFwiQW5hbHlzaXNcIik7XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdENoYXJ0TWFuYWdlckRhdGFNb2RlbCgpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy51c2VySW50ZXJhY3Rpb25Db250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRNYW5hZ2VyID0gbmV3IENoYXJ0Vmlld0NoYXJ0TWFuYWdlcih0aGlzLCB0aGlzLnVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXIsIHRoaXMuX2xheW91dE1hbmFnZXIhLCB0aGlzLmRhdGFNb2RlbCBhcyBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWRkQ2hhcnRDb21tYW5kcygpO1xyXG5cclxuICAgICAgICB0aGlzLl9sYXlvdXRNYW5hZ2VyIS5pbml0aWFsaXplQ2hhcnRWaWV3TGF5b3V0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuZGlzYWJsZU1vdXNlV2hlZWxGb3JTY3JvbGxiYXIoKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmF0dGFjaENoYXJ0TWFuYWdlckRhdGFNb2RlbEV2ZW50cygpO1xyXG5cclxuICAgICAgICB0aGlzLmNoYXJ0TWFuYWdlciEuaW5pdENoYXJ0Vmlld1dpdGhEYXRhTW9kZWwoKTtcclxuXHJcbiAgICAgICAgdGhpcy5lbmFibGVTY3JvbGxQZXJzaXN0aW5nKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkU3VwcG9ydGVkRHJhZ0Ryb3BEYXRhSWQoRHJhZ0Ryb3BEYXRhSWQuc2lnbmFsKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0Q2hhcnRNYW5hZ2VyRGF0YU1vZGVsKCkge1xyXG4gICAgICAgIGxldCBkYXRhTW9kZWwgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsSWQpO1xyXG4gICAgICAgIHRoaXMuZGF0YU1vZGVsID0gZGF0YU1vZGVsIGFzIElDaGFydE1hbmFnZXJEYXRhTW9kZWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRhY2hlcyB0aGUgY2hhcnQgbWFuYWdlciBkYXRhbW9kZWwgZXZlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhdHRhY2hDaGFydE1hbmFnZXJEYXRhTW9kZWxFdmVudHMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YU1vZGVsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YU1vZGVsLmV2ZW50TW9kZWxDaGFuZ2VkLmF0dGFjaCh0aGlzLl9jaGFydE1hbmFnZXJNb2RlbENoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRhY2hlcyB0aGUgY2hhcnQgbWFuYWdlciBkYXRhbW9kZWwgZXZlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkZXRhY2hDaGFydE1hbmFnZXJEYXRhTW9kZWxFdmVudHMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YU1vZGVsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YU1vZGVsLmV2ZW50TW9kZWxDaGFuZ2VkLmRldGFjaCh0aGlzLl9jaGFydE1hbmFnZXJNb2RlbENoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNoYXJ0TWFuYWdlck1vZGVsQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGFyZ3M6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncykge1xyXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgY2hhcnQgdmlldyB3aWRnZXRcclxuICAgICAgICB0aGlzLnJlZnJlc2hDaGFydHMoc2VuZGVyLCBhcmdzKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBhZGRDaGFydENvbW1hbmRzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNoYXJ0TWFuYWdlciAhPSB1bmRlZmluZWQgJiYgdGhpcy51c2VySW50ZXJhY3Rpb25Db250cm9sbGVyICE9IHVuZGVmaW5lZCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHNldEN1cnNvck9uUG9pbnRlclBvc2l0aW9uQ29tbWFuZCA9IG5ldyBTZXRDdXJzb3JPblBvaW50ZXJQb3NpdGlvbkNvbW1hbmQodGhpcy5jaGFydE1hbmFnZXIhKTtcclxuICAgICAgICAgICAgdGhpcy5jaGFydENvbW1hbmRNYXBbQ2hhcnRDb21tYW5kVHlwZS5zZXRDdXJzb3JPblBvaW50ZXJQb3NpdGlvbl0gPSBzZXRDdXJzb3JPblBvaW50ZXJQb3NpdGlvbkNvbW1hbmQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVzZXRab29tQ29tbWFuZCA9IG5ldyBSZXNldFpvb21Db21tYW5kKHRoaXMuY2hhcnRNYW5hZ2VyKTtcclxuICAgICAgICAgICAgdGhpcy5jaGFydENvbW1hbmRNYXBbQ2hhcnRDb21tYW5kVHlwZS5yZXNldFpvb21dID0gcmVzZXRab29tQ29tbWFuZDtcclxuXHJcbiAgICAgICAgICAgIGxldCBjaGVja0N1cnNvckhvdmVyaW5nQ29tbWFuZCA9IG5ldyBDaGVja0N1cnNvckhvdmVyaW5nQ29tbWFuZCh0aGlzLmNoYXJ0TWFuYWdlcik7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRDb21tYW5kTWFwW0NoYXJ0Q29tbWFuZFR5cGUuY2hlY2tDdXJzb3JIb3ZlcmluZ10gPSBjaGVja0N1cnNvckhvdmVyaW5nQ29tbWFuZDtcclxuXHJcbiAgICAgICAgICAgIGxldCBkcmFnQ3Vyc29yQ29tbWFuZCA9IG5ldyBEcmFnQ3Vyc29yQ29tbWFuZCh0aGlzLmNoYXJ0TWFuYWdlcik7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRDb21tYW5kTWFwW0NoYXJ0Q29tbWFuZFR5cGUuZHJhZ0N1cnNvcl0gPSBkcmFnQ3Vyc29yQ29tbWFuZDtcclxuXHJcbiAgICAgICAgICAgIGxldCBlbmRDdXJzb3JEcmFnQ29tbWFuZCA9IG5ldyBFbmRDdXJzb3JEcmFnQ29tbWFuZCh0aGlzLmNoYXJ0TWFuYWdlcik7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRDb21tYW5kTWFwW0NoYXJ0Q29tbWFuZFR5cGUuZW5kQ3Vyc29yRHJhZ10gPSBlbmRDdXJzb3JEcmFnQ29tbWFuZDtcclxuXHJcbiAgICAgICAgICAgIGxldCBwYW5DaGFydENvbW1hbmQgPSBuZXcgUGFuQ2hhcnRDb21tYW5kKHRoaXMuY2hhcnRNYW5hZ2VyKTtcclxuICAgICAgICAgICAgdGhpcy5jaGFydENvbW1hbmRNYXBbQ2hhcnRDb21tYW5kVHlwZS5wYW5DaGFydF0gPSBwYW5DaGFydENvbW1hbmQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgdG9nZ2xlQm94Wm9vbUNvbW1hbmQgPSBuZXcgVG9nZ2xlQm94Wm9vbUNvbW1hbmQodGhpcy5jaGFydE1hbmFnZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJ0Q29tbWFuZE1hcFtDaGFydENvbW1hbmRUeXBlLnRvZ2dsZUJveFpvb21dID0gdG9nZ2xlQm94Wm9vbUNvbW1hbmQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgdG9nZ2xlUGFubmluZ0NvbW1hbmQgPSBuZXcgVG9vZ2xlUGFubmluZ0NvbW1hbmQodGhpcy5jaGFydE1hbmFnZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJ0Q29tbWFuZE1hcFtDaGFydENvbW1hbmRUeXBlLnRvZ2dsZVBhbm5pbmddID0gdG9nZ2xlUGFubmluZ0NvbW1hbmQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2VsZWN0Wm9vbUF4ZXNDb21tYW5kID0gbmV3IFNlbGVjdFpvb21BeGVzQ29tbWFuZCh0aGlzLmNoYXJ0TWFuYWdlcik7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRDb21tYW5kTWFwW0NoYXJ0Q29tbWFuZFR5cGUuc2VsZWN0Wm9vbUF4aXNdID0gc2VsZWN0Wm9vbUF4ZXNDb21tYW5kO1xyXG5cclxuICAgICAgICAgICAgbGV0IHpvb21DaGFydENvbW1hbmQgPSBuZXcgWm9vbUNoYXJ0Q29tbWFuZCh0aGlzLmNoYXJ0TWFuYWdlcik7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRDb21tYW5kTWFwW0NoYXJ0Q29tbWFuZFR5cGUuem9vbUNoYXJ0XSA9IHpvb21DaGFydENvbW1hbmQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2VsZWN0UGFubmluZ0F4ZXNDb21tYW5kID0gbmV3IFNlbGVjdFBhbm5pbmdBeGVzQ29tbWFuZCh0aGlzLmNoYXJ0TWFuYWdlcik7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRDb21tYW5kTWFwW0NoYXJ0Q29tbWFuZFR5cGUuc2VsZWN0UGFubmluZ0F4ZXNdID0gc2VsZWN0UGFubmluZ0F4ZXNDb21tYW5kO1xyXG5cclxuICAgICAgICAgICAgbGV0IGF1dG9TY2FsZUNvbW1hbmQgPSBuZXcgQXV0b1NjYWxlQ29tbWFuZCh0aGlzLmNoYXJ0TWFuYWdlcik7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRDb21tYW5kTWFwW0NoYXJ0Q29tbWFuZFR5cGUuYXV0b1NjYWxlXSA9IGF1dG9TY2FsZUNvbW1hbmQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVzZXREcmFnUG9zaXRpb25Db21tYW5kID0gbmV3IFJlc2V0RHJhZ1Bvc2l0aW9uQ29tbWFuZCh0aGlzLmNoYXJ0TWFuYWdlcik7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRDb21tYW5kTWFwW0NoYXJ0Q29tbWFuZFR5cGUucmVzZXREcmFnUG9zaXRpb25dID0gcmVzZXREcmFnUG9zaXRpb25Db21tYW5kO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJlc2V0Q3Vyc29ySG92ZXJpbmdDb21tYW5kID0gbmV3IFJlc2V0Q3Vyc29ySG92ZXJpbmdDb21tYW5kKHRoaXMuY2hhcnRNYW5hZ2VyKTtcclxuICAgICAgICAgICAgdGhpcy5jaGFydENvbW1hbmRNYXBbQ2hhcnRDb21tYW5kVHlwZS5yZXNldEN1cnNvckhvdmVyaW5nXSA9IHJlc2V0Q3Vyc29ySG92ZXJpbmdDb21tYW5kO1xyXG5cclxuICAgICAgICAgICAgdGhpcy51c2VySW50ZXJhY3Rpb25Db250cm9sbGVyLmV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZC5hdHRhY2godGhpcy5fdXNlckludGVyYWN0aW9uQ29udHJvbGxlckV4ZWN1dGVDaGFydENvbW1hbmRIYW5kbGVyKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNoYXJ0TWFuYWdlciB1bmRlZmluZWRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25FeGVjdXRlQ2hhcnRDb21tYW5kKHNlbmRlciwgYXJncykge1xyXG4gICAgICAgIHRoaXMuY2hhcnRDb21tYW5kTWFwW2FyZ3MuY29tbWFuZFR5cGVdLm9uRXhlY3V0ZUNoYXJ0Q29tbWFuZChzZW5kZXIsIGFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkV2ZW50VG9vbGJhckJ1dHRvbkNsaWNrZWQoc2VuZGVyLCBhcmdzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudXNlckludGVyYWN0aW9uQ29udHJvbGxlcikge1xyXG4gICAgICAgICAgICB0aGlzLnVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXIub25Ub29sYmFyQ2xpY2soc2VuZGVyLCBhcmdzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25Vc2VyQ2hhcnRJbnRlcmFjdGlvbihzZW5kZXIsIGV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzOiBFdmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncykge1xyXG4gICAgICAgIGlmICh0aGlzLnVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgdGhpcy51c2VySW50ZXJhY3Rpb25Db250cm9sbGVyLm9uQ2hhcnRJbnRlcmFjdGlvbihldmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncy5jaGFydEludGVyYWN0aW9uVHlwZSwgc2VuZGVyLCBldmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncy5ldmVudEFyZ3VtZW50cyk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgZGl2ID0gJCh0aGlzLm1haW5EaXYpLmZpbmQoXCIjSW5uZXJDaGFydFZpZXdDb250YWluZXJcIik7XHJcbiAgICAgICAgbGV0IGhlaWdodFdpdGhvdXRIZWFkZXIgPSBoZWlnaHQtdGhpcy5faGVhZGVySGVpZ2h0O1xyXG4gICAgICAgIGRpdlswXS5zdHlsZS5oZWlnaHQgPSBoZWlnaHRXaXRob3V0SGVhZGVyICsgXCJweFwiO1xyXG5cclxuICAgICAgICAvL0lmIHdpZHRoIGlzIG5vdCBkZWZpbmVkLCBpdCBtZWFucyBpdCBpcyBmaXJzdCByZXNpemUgYW5kIHNjcm9sbCBuZWVkcyB0byBiZSBzZXRcclxuICAgICAgICBpZiAoZGl2WzBdLnN0eWxlLndpZHRoID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGxldCBzY3JvbGxiYXJTZXR0aW5ncyA9IHRoaXMuY29tcG9uZW50LmdldFNldHRpbmcoQ2hhcnRWaWV3V2lkZ2V0LlNjcm9sbGJhclNldHRpbmdJZCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2Nyb2xsQmFyU2V0dGluZ3Moc2Nyb2xsYmFyU2V0dGluZ3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGl2WzBdLnN0eWxlLndpZHRoID0gd2lkdGggKyBcInB4XCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fbGF5b3V0TWFuYWdlciEucmVzaXplKHdpZHRoLCBoZWlnaHRXaXRob3V0SGVhZGVyKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVDaGFydHModHJhY2VDaGFydExpc3Q6IEFycmF5PElUcmFjZUNoYXJ0Pikge1xyXG4gICAgICAgIHRoaXMuX2xheW91dE1hbmFnZXIhLnVwZGF0ZUNoYXJ0cyh0aGlzLmNoYXJ0TWFuYWdlciEudHJhY2VDaGFydExpc3QpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hDaGFydHMoc2VuZGVyOiBJRGF0YU1vZGVsLCBkYXRhOiBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MpIHtcclxuICAgICAgICB0aGlzLmNoYXJ0TWFuYWdlciEub25DaGFydE1hbmFnZXJNb2RlbENoYW5nZWQoc2VuZGVyIGFzIElDaGFydE1hbmFnZXJEYXRhTW9kZWwsIGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFRyYWNlQ2hhcnRCeU5hbWUobmFtZTogc3RyaW5nKTogSVRyYWNlQ2hhcnR8dW5kZWZpbmVke1xyXG4gICAgICAgIGlmKHRoaXMuY2hhcnRNYW5hZ2VyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNoYXJ0TWFuYWdlci5nZXRUcmFjZUNoYXJ0QnlOYW1lKG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFBhZ2VTY3JvbGwoZW5hYmxlOiBib29sZWFuKSB7XHJcbiAgICAgICAgQ2hhcnRWaWV3V2lkZ2V0Ll9wYWdlU2Nyb2xsQWN0aXZlID0gZW5hYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdFJlZmVyZW5jZUN1cnNvcihjdXJzb3JJbmRleCkge1xyXG4gICAgICAgIGlmICh0aGlzLnVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgdGhpcy51c2VySW50ZXJhY3Rpb25Db250cm9sbGVyLnNlbGVjdEN1cnNvcihjdXJzb3JJbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVXNlckludGVyYWN0aW9uQ29udHJvbGxlciBub3QgZGVmaW5lZFwiKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRpc2FibGVNb3VzZVdoZWVsRm9yU2Nyb2xsYmFyKCkge1xyXG4gICAgICAgICQoXCIjXCIgKyB0aGlzLl9sYXlvdXRNYW5hZ2VyIS5jaGFydFNwbGl0dGVyUGFyZW50Q29udGFpbmVySWQpLmJpbmQoJ21vdXNld2hlZWwgRE9NTW91c2VTY3JvbGwnLCBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgICAgICAgdmFyIGRpc2FibGVTY3JvbGxiYXJTY3JvbGwgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChDaGFydFZpZXdXaWRnZXQuX3BhZ2VTY3JvbGxBY3RpdmUgPT0gZmFsc2UgJiYgZS50YXJnZXQuaWQgIT09ICdDaGFydFZpZXdDaGFydFNwbGl0dGVyQ29udGFpbmVyJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUudHlwZSA9PSAnbW91c2V3aGVlbCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlU2Nyb2xsYmFyU2Nyb2xsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGUudHlwZSA9PSAnRE9NTW91c2VTY3JvbGwnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZVNjcm9sbGJhclNjcm9sbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGRpc2FibGVTY3JvbGxiYXJTY3JvbGwpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEVuYWJsZSBwZXJzaXN0ZW5jeSBvZiBzY3JvbGxcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGVuYWJsZVNjcm9sbFBlcnNpc3RpbmcoKSB7XHJcbiAgICAgICAgbGV0IHdpZGdldDogQ2hhcnRWaWV3V2lkZ2V0ID0gdGhpcztcclxuICAgICAgICAkKFwiI1wiICsgdGhpcy5fbGF5b3V0TWFuYWdlciEuY2hhcnRTcGxpdHRlclBhcmVudENvbnRhaW5lcklkKS5zY3JvbGwoZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIHdpZGdldC5fc2Nyb2xsYmFyVG9wUG9zaXRpb24gPSB0aGlzLnNjcm9sbFRvcDtcclxuICAgICAgICAgICAgd2lkZ2V0LnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDb21wb25lbnRTZXR0aW5ncyhvbmx5TW9kaWZpZWQ6IGJvb2xlYW4pOiBDb21wb25lbnRTZXR0aW5nc3tcclxuXHRcdHRoaXMuY29tcG9uZW50LnNldFNldHRpbmcoQ2hhcnRWaWV3V2lkZ2V0LlNjcm9sbGJhclNldHRpbmdJZCwgdGhpcy5nZXRTY3JvbGxCYXJTZXR0aW5ncygpKTtcclxuXHRcdHJldHVybiBzdXBlci5nZXRDb21wb25lbnRTZXR0aW5ncyhvbmx5TW9kaWZpZWQpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIGdldFNjcm9sbEJhclNldHRpbmdzKCk6IGFueSB7XHJcblx0XHRsZXQgc2V0dGluZ3MgPSB7XCJ2ZXJ0aWNhbFwiOiB0aGlzLl9zY3JvbGxiYXJUb3BQb3NpdGlvbn07XHJcblx0XHRyZXR1cm4gc2V0dGluZ3M7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBzZXRTY3JvbGxCYXJTZXR0aW5ncyhkYXRhKXtcclxuXHRcdGlmKGRhdGEgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0JChcIiNcIiArIHRoaXMuX2xheW91dE1hbmFnZXIhLmNoYXJ0U3BsaXR0ZXJQYXJlbnRDb250YWluZXJJZClbMF0uc2Nyb2xsVG8oMCwgZGF0YVtcInZlcnRpY2FsXCJdKTtcclxuXHR9XHJcblxyXG4gICAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiojUmVnaW9uIGRyb3Agc3VwcG9ydCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICBkcmFnU3RhcnQoYXJnczogRHJhZ0Ryb3BBcmdzKSB7XHJcbiAgICAgICAgaWYgKGFyZ3MuZGF0YVswXSBpbnN0YW5jZW9mIEJhc2VTZXJpZXMpIHtcclxuICAgICAgICAgICAgbGV0IHNhbWVHcm91cCA9IHRoaXMuYXJlU2VyaWVzRnJvbVNhbWVHcm91cChhcmdzLmRhdGEpO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJ0TWFuYWdlciEuYWRkRHJvcHBhYmxlTG9jYXRpb25zKGFyZ3MuZGF0YSwgc2FtZUdyb3VwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZHJhZ1N0b3AoYXJnczogRHJhZ0Ryb3BBcmdzKSB7XHJcbiAgICAgICAgaWYgKGFyZ3MuZGF0YVswXSBpbnN0YW5jZW9mIEJhc2VTZXJpZXMpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFydE1hbmFnZXIhLnJlbW92ZURyb3BwYWJsZUxvY2F0aW9ucygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkcmFnT3ZlcihhcmdzOiBEcmFnRHJvcEFyZ3MpOiBib29sZWFuIHtcclxuICAgICAgICB0aGlzLmRyb3BQb3NzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHZhciB0YXJnZXRDaGFydENvbnRhaW5lcklkID0gYXJncy5jdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQuaWQ7XHJcbiAgICAgICAgdmFyIHRhcmdldENoYXJ0ID0gdGhpcy5jaGFydE1hbmFnZXIhLmdldFRyYWNlQ2hhcnRCeUNvbnRhaW5lcklkKHRhcmdldENoYXJ0Q29udGFpbmVySWQpO1xyXG4gICAgICAgIGxldCBjaGFydE1hbmFnZXJEYXRhTW9kZWwgPSB0aGlzLmRhdGFNb2RlbCBhcyBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsO1xyXG4gICAgICAgIGxldCBkcm9wSGVscGVyID0gbmV3IENoYXJ0RHJvcEhlbHBlcihjaGFydE1hbmFnZXJEYXRhTW9kZWwsIHRoaXMpO1xyXG4gICAgICAgIGxldCBjaGFydEFyZWEgPSB0aGlzLmdldENoYXJ0QXJlYUlkKGFyZ3MuY3VycmVudFRhcmdldCk7XHJcbiAgICAgICAgaWYgKHRhcmdldENoYXJ0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAvLyBEcmFnIG92ZXIgYSBjaGFydC9jaGFydCB3aWRnZXRcclxuICAgICAgICAgICAgbGV0IHNlcmllcyA9IGFyZ3MuZGF0YSBhcyBBcnJheTxCYXNlU2VyaWVzPjtcclxuICAgICAgICAgICAgbGV0IGNoYXJ0ID0gdGFyZ2V0Q2hhcnQgYXMgQ2hhcnRCYXNlO1xyXG4gICAgICAgICAgICBsZXQgZHJvcExvY2F0aW9uVHlwZSA9IGRyb3BIZWxwZXIuZ2V0RHJvcExvY2F0aW9uVHlwZShhcmdzLmN1cnJlbnRUYXJnZXQsIGNoYXJ0LCBzZXJpZXMpO1xyXG4gICAgICAgICAgICB0aGlzLmRyYWdBbmREcm9wUmVwcmVzZW50YXRpb24oY2hhcnQsIHNlcmllcywgZHJvcExvY2F0aW9uVHlwZSwgYXJncy5kcmFnRHJvcFJlcHJlc2VudGF0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHREcm9wcGFibGVBcmVhcyhjaGFydCwgYXJncy5jdXJyZW50VGFyZ2V0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZHJvcEhlbHBlci5jYW5BZGRDaGFydCgpID09IHRydWUpIHsgIC8vIElzIGl0IHBvc3NpYmxlIHRvIGFkZCBvbmUgbW9yZSBjaGFydFxyXG4gICAgICAgICAgICBsZXQgY2hhcnRWaWV3Q2hhcnRTcGxpdHRlckxhc3RQYW5lSWQgPSB0aGlzLl9sYXlvdXRNYW5hZ2VyPy5jaGFydFNwbGl0dGVyLmdldExhc3RQYW5lSWQoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucmVzZXRIaWdobGlnaHRpbmcoKTtcclxuICAgICAgICAgICAgLy8gTWF5YmUgZHJhZyBvdmVyIGVtcHR5IHNwYWNlXHJcbiAgICAgICAgICAgIGlmIChjaGFydEFyZWEgPT0gY2hhcnRWaWV3Q2hhcnRTcGxpdHRlckxhc3RQYW5lSWQgKyBcIl9ZVFwiICkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcm9wUG9zc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVEcmFnRHJvcFJlcHJlc2VudGF0aW9uKGFyZ3MuZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbiwgXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2RyYWdEcm9wL2FkZE5ld1lUQ2hhcnQuc3ZnXCIsIFwiQ3JlYXRlIGEgbmV3IFlUIGNoYXJ0IGFuZCBhZGQgZHJhZ2dlZCBzaWduYWxzXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDaGFydFR5cGVEcm9wcGFibGVBcmVhcyhjaGFydEFyZWEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNoYXJ0QXJlYSA9PSBjaGFydFZpZXdDaGFydFNwbGl0dGVyTGFzdFBhbmVJZCArIFwiX0ZGVFwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyb3BQb3NzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZURyYWdEcm9wUmVwcmVzZW50YXRpb24oYXJncy5kcmFnRHJvcFJlcHJlc2VudGF0aW9uLCBcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3AvYWRkTmV3RkZUQ2hhcnQuc3ZnXCIsIFwiQ3JlYXRlIGEgbmV3IEZGVCBjaGFydCBhbmQgYWRkIGRyYWdnZWQgc2lnbmFsc1wiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ2hhcnRUeXBlRHJvcHBhYmxlQXJlYXMoY2hhcnRBcmVhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjaGFydEFyZWEgPT0gY2hhcnRWaWV3Q2hhcnRTcGxpdHRlckxhc3RQYW5lSWQgKyBcIl9YWVwiKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJvcFBvc3NpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRHJhZ0Ryb3BSZXByZXNlbnRhdGlvbihhcmdzLmRyYWdEcm9wUmVwcmVzZW50YXRpb24sIFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9hZGROZXdYWUNoYXJ0LnN2Z1wiLCBcIkNyZWF0ZSBhIG5ldyBYWSBjaGFydCBhbmQgYWRkIGEgY2FsY3VsYXRlZCBYWSBzaWduYWxcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUNoYXJ0VHlwZURyb3BwYWJsZUFyZWFzKGNoYXJ0QXJlYSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoYXJ0QXJlYSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDaGFydFR5cGVEcm9wcGFibGVBcmVhcyhjaGFydEFyZWEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5kcm9wUG9zc2libGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmFnQW5kRHJvcFJlcHJlc2VudGF0aW9uKGNoYXJ0OiBJVHJhY2VDaGFydCwgc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPiwgZHJvcExvY2F0aW9uVHlwZTogRHJvcExvY2F0aW9uVHlwZSwgZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbil7XHJcbiAgICAgICAgaWYoY2hhcnQudHlwZSA9PSBDaGFydFR5cGUuWVRDaGFydCB8fCBjaGFydC50eXBlID09IENoYXJ0VHlwZS5GRlRDaGFydCl7XHJcbiAgICAgICAgICAgIGlmIChkcm9wTG9jYXRpb25UeXBlID09IERyb3BMb2NhdGlvblR5cGUuYWRkTmV3U2NhbGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJvcFBvc3NpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmKHNlcmllc1swXS50eXBlID09PSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMgJiYgY2hhcnQudHlwZSA9PSBDaGFydFR5cGUuRkZUQ2hhcnQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVEcmFnRHJvcFJlcHJlc2VudGF0aW9uKGRyYWdEcm9wUmVwcmVzZW50YXRpb24sIFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9hZGROZXdTY2FsZS5zdmdcIiwgXCJDYWxjdWxhdGUgRkZUIHNpZ25hbCBhbmQgYWRkIGl0IHRvIG5ldyBzY2FsZVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRHJhZ0Ryb3BSZXByZXNlbnRhdGlvbihkcmFnRHJvcFJlcHJlc2VudGF0aW9uLCBcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3AvYWRkTmV3U2NhbGUuc3ZnXCIsIFwiQ3JlYXRlIGEgbmV3IHNjYWxlIGFuZCBhZGQgZHJhZ2dlZCBzaWduYWxzXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGRyb3BMb2NhdGlvblR5cGUgPT0gRHJvcExvY2F0aW9uVHlwZS5hc3NpZ25Ub1NjYWxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyb3BQb3NzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZihzZXJpZXNbMF0udHlwZSA9PT0gU2VyaWVzVHlwZS50aW1lU2VyaWVzICYmIGNoYXJ0LnR5cGUgPT0gQ2hhcnRUeXBlLkZGVENoYXJ0ICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRHJhZ0Ryb3BSZXByZXNlbnRhdGlvbihkcmFnRHJvcFJlcHJlc2VudGF0aW9uLCBcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3AvYXNzaWduVG9TY2FsZS5zdmdcIiwgXCJDYWxjdWxhdGUgRkZUIHNpZ25hbCBhbmQgYWRkIGl0IHRvIHNjYWxlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVEcmFnRHJvcFJlcHJlc2VudGF0aW9uKGRyYWdEcm9wUmVwcmVzZW50YXRpb24sIFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9hc3NpZ25Ub1NjYWxlLnN2Z1wiLCBcIkFkZCBkcmFnZ2VkIHNpZ25hbHMgdG8gc2NhbGVcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChkcm9wTG9jYXRpb25UeXBlID09IERyb3BMb2NhdGlvblR5cGUuYXNzaWduVG9TY2FsZSAmJiB0aGlzLmFyZVNlcmllc0Zyb21TYW1lR3JvdXAoc2VyaWVzKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcm9wUG9zc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYoc2VyaWVzWzBdLnR5cGUgPT0gU2VyaWVzVHlwZS50aW1lU2VyaWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVEcmFnRHJvcFJlcHJlc2VudGF0aW9uKGRyYWdEcm9wUmVwcmVzZW50YXRpb24sIFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9hc3NpZ25Ub0NoYXJ0LnN2Z1wiLCBcIkNhbGN1bGF0ZSBYWSBzaWduYWwgYW5kIGFkZCBpdCB0byB0aGUgY2hhcnRcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZURyYWdEcm9wUmVwcmVzZW50YXRpb24oZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbiwgXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2RyYWdEcm9wL2Fzc2lnblRvQ2hhcnQuc3ZnXCIsIFwiQWRkIGRyYWdnZWQgc2lnbmFscyB0byBjaGFydFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGRyYWcgYW5kIGRyb3AgcmVwcmVzZW50YXRpb24gd2hpbGUgZHJhZ2dpbmcgd2l0aCBuZXcgaWNvbnMgb3IgdGV4dHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtEcmFnRHJvcFJlcHJlc2VudGF0aW9ufSBkcmFnRHJvcFJlcHJlc2VudGF0aW9uXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb3ZlcmxheUljb25QYXRoXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV3VGV4dFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZURyYWdEcm9wUmVwcmVzZW50YXRpb24oZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbjogRHJhZ0Ryb3BSZXByZXNlbnRhdGlvbnx1bmRlZmluZWQsIG92ZXJsYXlJY29uUGF0aDogc3RyaW5nLCBuZXdUZXh0OiBzdHJpbmcpe1xyXG4gICAgICAgIGlmKGRyYWdEcm9wUmVwcmVzZW50YXRpb24gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gQWRkIG92ZXJsYXkgaWNvbiBpZiBhdmFpbGFibGVcclxuICAgICAgICAgICAgaWYob3ZlcmxheUljb25QYXRoICE9IFwiXCIpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGltYWdlUHJvdmlkZXIgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uSW1hZ2VQcm92aWRlcklkKSBhcyBJSW1hZ2VQcm92aWRlcjtcclxuICAgICAgICAgICAgICAgIGlmKGltYWdlUHJvdmlkZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYWRkTmV3U2NhbGVJbWFnZSA9IGltYWdlUHJvdmlkZXIuZ2V0SW1hZ2Uob3ZlcmxheUljb25QYXRoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihhZGROZXdTY2FsZUltYWdlICE9IFwiXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcmFnRHJvcFJlcHJlc2VudGF0aW9uLmljb25MaXN0LnB1c2goYWRkTmV3U2NhbGVJbWFnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGFkZCB0ZXh0IG9yIHJlcGxhY2UgZXhpc3RpbmcgdGV4dFxyXG4gICAgICAgICAgICBpZihkcmFnRHJvcFJlcHJlc2VudGF0aW9uLnRleHRMaXN0Lmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgICAgICAgIGRyYWdEcm9wUmVwcmVzZW50YXRpb24udGV4dExpc3QucHVzaChuZXdUZXh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbi50ZXh0TGlzdFswXSA9IG5ld1RleHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZHJvcChhcmdzOiBEcmFnRHJvcEFyZ3MpIHtcclxuICAgICAgICBsZXQgc2VyaWVzID0gYXJncy5kYXRhIGFzIEFycmF5PEJhc2VTZXJpZXM+O1xyXG4gICAgICAgIGlmICh0aGlzLmRyb3BQb3NzaWJsZSkgeyAvLyBJcyBkcm9wIHBvc3NpYmxlXHJcbiAgICAgICAgICAgIGxldCBjaGFydE1hbmFnZXJEYXRhTW9kZWwgPSB0aGlzLmRhdGFNb2RlbCBhcyBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsO1xyXG4gICAgICAgICAgICBsZXQgZHJvcEhlbHBlciA9IG5ldyBDaGFydERyb3BIZWxwZXIoY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLCB0aGlzKTtcclxuICAgICAgICAgICAgbGV0IHRhcmdldENoYXJ0ID0gdGhpcy5jaGFydE1hbmFnZXIhLmdldFRyYWNlQ2hhcnRCeUNvbnRhaW5lcklkKGFyZ3MuY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50LmlkKTtcclxuICAgICAgICAgICAgaWYgKHRhcmdldENoYXJ0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCB8IHVuZGVmaW5lZCA9IGNoYXJ0TWFuYWdlckRhdGFNb2RlbC5nZXRDaGFydCh0YXJnZXRDaGFydC53aWRnZXROYW1lKTtcclxuICAgICAgICAgICAgICAgIHNlcmllcyA9IFNlcmllQ2hhcnRUeXBlSGVscGVyLmdldERyb3BwYWJsZVNlcmllcyhjaGFydCEuZ2V0QWxsU2VyaWVzKCksc2VyaWVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkcm9wSGVscGVyLmFkZFNlcmllcyhhcmdzLmN1cnJlbnRUYXJnZXQsIHRhcmdldENoYXJ0LCBzZXJpZXMsIHRoaXMuX2xheW91dE1hbmFnZXIhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNb3VzZSBpcyBub3Qgb3ZlciBjaGFydFZpZXcgd2hpbGUgZHJhZ2dpbmcgb3BlcmF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtEcmFnRHJvcEFyZ3N9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRyb3BGb2N1c0xvc3QoYXJnczogRHJhZ0Ryb3BBcmdzKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVDaGFydFR5cGVEcm9wcGFibGVBcmVhcyhhcmdzLmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgIHRoaXMucmVzZXRIaWdobGlnaHRpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhpZ2hsaWdodHMgYXJlYXMgd2hlcmUgc2lnbmFscyBpcyBiZWluZyBkcmFnZ2VkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtDaGFydEJhc2V9IGNoYXJ0XHJcbiAgICAgKiBAcGFyYW0geyp9IGN1cnJlbnRUYXJnZXRcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBoaWdobGlnaHREcm9wcGFibGVBcmVhcyhjaGFydDogQ2hhcnRCYXNlLCBjdXJyZW50VGFyZ2V0KXtcclxuICAgICAgICBpZihjdXJyZW50VGFyZ2V0LmlkLmluY2x1ZGVzKFwiX2F4aXNEcm9wWm9uZVNjYWxlXCIpIHx8IGN1cnJlbnRUYXJnZXQuaWQuaW5jbHVkZXMoXCJfYXhpc0Ryb3Bab25lX2NoYXJ0QXJlYVwiKSB8fCBjdXJyZW50VGFyZ2V0LmlkLmluY2x1ZGVzKFwiX3JlZkN1cnNvcl9cIikpe1xyXG4gICAgICAgICAgICBjaGFydC51cGRhdGVEcm9wcGFibGVBcmVhcyhjdXJyZW50VGFyZ2V0KTtcclxuICAgICAgICAgICAgdGhpcy5yZXNldEhpZ2hsaWdodGluZyhjaGFydCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0SGlnaGxpZ2h0aW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzZXQgaGlnaGxpZ2h0ZWQgYXJlYXMgZm9yIGFsbCBjaGFydHMsIGV4Y2VwdCB0aGUgc2VsZWN0ZWQgb25lIFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVRyYWNlQ2hhcnR9IFtjaGFydF1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZXNldEhpZ2hsaWdodGluZyhjaGFydD86IElUcmFjZUNoYXJ0KXtcclxuICAgICAgICBsZXQgdHJhY2VDaGFydHM6IEFycmF5PElUcmFjZUNoYXJ0PiA9IHRoaXMuY2hhcnRNYW5hZ2VyIS50cmFjZUNoYXJ0TGlzdDtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdHJhY2VDaGFydHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJ0ICE9IHRyYWNlQ2hhcnRzW2ldKXtcclxuICAgICAgICAgICAgICAgIHRyYWNlQ2hhcnRzW2ldLnJlc2V0SGlnaGxpZ2h0aW5nKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGUgaGlnaGxpZ2h0aW5nIHN0YXRlIGZvciBjaGFydCBUeXBlIGFyZWFzXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHsoc3RyaW5nIHwgdW5kZWZpbmVkKX0gY3VycmVudFRhcmdldElkXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCB1cGRhdGVDaGFydFR5cGVEcm9wcGFibGVBcmVhcyhjdXJyZW50VGFyZ2V0SWQ6IHN0cmluZyB8IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgbGV0IGNoYXJ0Vmlld0NoYXJ0U3BsaXR0ZXJMYXN0UGFuZUlkID0gdGhpcy5fbGF5b3V0TWFuYWdlcj8uY2hhcnRTcGxpdHRlci5nZXRMYXN0UGFuZUlkKCk7XHJcbiAgICAgICAgbGV0IGVtcHR5U3BhY2VFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2hhcnRWaWV3Q2hhcnRTcGxpdHRlckxhc3RQYW5lSWQpO1xyXG4gICAgICAgIGlmKGVtcHR5U3BhY2VFbGVtZW50ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBlbXB0eVNwYWNlRWxlbWVudC5jaGlsZEVsZW1lbnRDb3VudDsgaSA9IGkgKyAxKXtcclxuICAgICAgICAgICAgICAgIGlmIChlbXB0eVNwYWNlRWxlbWVudCEuY2hpbGRyZW5baV0uaWQgPT0gY3VycmVudFRhcmdldElkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbXB0eVNwYWNlRWxlbWVudCEuY2hpbGRyZW5baV0uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFyZWEhLmNsYXNzTGlzdC5hZGQoJ2RyYWdnZWRPdmVyJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZW1wdHlTcGFjZUVsZW1lbnQhLmNoaWxkcmVuW2ldLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICBhcmVhIS5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnZ2VkT3ZlcicpOyAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGNoYXJ0IGFyZWEgaWQgXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdGFyZ2V0XHJcbiAgICAgKiBAcmV0dXJucyB7KHN0cmluZyB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRDaGFydEFyZWFJZCh0YXJnZXQ6IEhUTUxFbGVtZW50KTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBsZXQgY2hhcnRWaWV3Q2hhcnRTcGxpdHRlckxhc3RQYW5lSWQgPSB0aGlzLl9sYXlvdXRNYW5hZ2VyPy5jaGFydFNwbGl0dGVyLmdldExhc3RQYW5lSWQoKTtcclxuICAgICAgICBsZXQgeXRBcmVhID0gY2hhcnRWaWV3Q2hhcnRTcGxpdHRlckxhc3RQYW5lSWQgKyBcIl9ZVFwiO1xyXG4gICAgICAgIGxldCBmZnRBcmVhID0gY2hhcnRWaWV3Q2hhcnRTcGxpdHRlckxhc3RQYW5lSWQgKyBcIl9GRlRcIjtcclxuICAgICAgICBsZXQgeHlBcmVhID0gY2hhcnRWaWV3Q2hhcnRTcGxpdHRlckxhc3RQYW5lSWQgKyBcIl9YWVwiO1xyXG5cclxuICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGlzYWJsZWQnKSB8fCB0YXJnZXQhLnBhcmVudEVsZW1lbnQhLmNsYXNzTGlzdC5jb250YWlucygnZGlzYWJsZWQnKSl7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRhcmdldC5pZCA9PSB5dEFyZWEgfHwgdGFyZ2V0IS5wYXJlbnRFbGVtZW50IS5pZCA9PSB5dEFyZWEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHl0QXJlYTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGFyZ2V0LmlkID09IGZmdEFyZWEgfHwgdGFyZ2V0IS5wYXJlbnRFbGVtZW50IS5pZCA9PSBmZnRBcmVhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmZnRBcmVhO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZWxzZSBpZiAodGFyZ2V0LmlkID09IHh5QXJlYSB8fCB0YXJnZXQhLnBhcmVudEVsZW1lbnQhLmlkID09IHh5QXJlYSkge1xyXG4gICAgICAgICAgICByZXR1cm4geHlBcmVhO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIGRyYWcgc2VyaWVzIGJlbG9uZyB0byB0aGUgc2FtZSBzZXJpZSBncm91cFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEJhc2VTZXJpZXM+fSBzZXJpZXNcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFyZVNlcmllc0Zyb21TYW1lR3JvdXAoc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPik6IGJvb2xlYW57XHJcbiAgICAgICAgbGV0IHBhcmVudCA9IHNlcmllc1swXS5wYXJlbnQ7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBzZXJpZXMubGVuZ3RoOyBpID0gaSArIDEpe1xyXG4gICAgICAgICAgICBpZiAoc2VyaWVzW2ldLnBhcmVudCAhPSBwYXJlbnQpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiNlbmRyZWdpb24gZHJvcCBzdXBwb3J0KioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxufVxyXG5cclxuZXhwb3J0IHsgQ2hhcnRWaWV3V2lkZ2V0LCBDaGFydFZpZXdUb29scywgWm9vbURpcmVjdGlvbiwgRXZlbnREcm9wSGVscGVyfTtcclxuXHJcbiJdfQ==