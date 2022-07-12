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
define(["require", "exports", "../common/treeGridWidgetBase", "./view/chartManagerTreeGridCellStyle", "./view/chartManagerTreeGridDragDrop", "./view/chartManagerTreeGridToolbar", "../../models/chartManagerDataModel/chartManagerChart", "../common/interfaces/dropInterface", "../../models/common/series/baseSeries", "../../models/chartManagerDataModel/scale", "../../models/chartManagerDataModel/chartManagerDataModel", "../chartViewWidget/chartViewWidget", "../chartViewWidget/helpers/chartDropHelper", "../common/SerieChartTypeHelper", "../../models/common/series/seriesType", "./componentDefaultDefinition"], function (require, exports, treeGridWidgetBase_1, chartManagerTreeGridCellStyle_1, chartManagerTreeGridDragDrop_1, chartManagerTreeGridToolbar_1, chartManagerChart_1, dropInterface_1, baseSeries_1, scale_1, chartManagerDataModel_1, chartViewWidget_1, chartDropHelper_1, SerieChartTypeHelper_1, seriesType_1, componentDefaultDefinition_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartManagerWidget = /** @class */ (function (_super) {
        __extends(ChartManagerWidget, _super);
        function ChartManagerWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.eventDropHelper = new chartViewWidget_1.EventDropHelper();
            _this.highlightAreaId = "chartManager_Highlighted";
            return _this;
            //*******************************************************End region drop support*******************************************************
        }
        /**
         * Defines the height of the header
         *
         * @returns {number}
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.defineHeaderHeight = function () {
            return 30;
        };
        ChartManagerWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
        };
        ChartManagerWidget.prototype.dispose = function () {
            this.removeSupportedDragDropDataId(dropInterface_1.DragDropDataId.signal);
            _super.prototype.dispose.call(this);
        };
        /**
         * Loads the styles for the chart manager widget
         *
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.loadStyles = function () {
            _super.prototype.loadStyles.call(this);
            _super.prototype.addStyle.call(this, "widgets/common/style/css/dropDownMenuStyle.css");
        };
        /**
         * Creates the layout of the widget
         *
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.createLayout = function () {
            this.mainDiv.style.overflow = "hidden";
            _super.prototype.createLayout.call(this);
        };
        ChartManagerWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            this.setChartManagerDataModel();
            _super.prototype.setHeaderContent.call(this, "Charts");
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 0, 80);
            // Initialize scrollbars positions      
            var scrollbarSettings = this.component.getSetting(treeGridWidgetBase_1.TreeGridWidgetBase.ScrollbarsSettingsId);
            this.setScrollBarSettings(scrollbarSettings);
            // Hide the column header of the tree grid
            //super.setColumnHeaderHidden();
            this.addSupportedDragDropDataId(dropInterface_1.DragDropDataId.signal);
        };
        ChartManagerWidget.prototype.setChartManagerDataModel = function () {
            var dataModel = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.ChartManagerDataModelId);
            this.dataModel = dataModel;
            // Refresh treeGrid(and toolbar) to use the new datamodel
            this.refresh();
        };
        ChartManagerWidget.prototype.getComponentSettings = function (onlyModified) {
            return _super.prototype.getComponentSettings.call(this, onlyModified);
        };
        ChartManagerWidget.prototype.setComponentSettings = function (data) {
            if (data != undefined) {
                _super.prototype.setComponentSettings.call(this, data);
            }
        };
        /**
         * Handles the model changes
         *
         * @param {IDataModel} sender
         * @param {EventModelChangedArgs} eventArgs
         * @returns {*}
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.handleModelChanged = function (sender, eventArgs) {
            if (eventArgs.hint != chartManagerDataModel_1.ChartManagerDataModelChangedHint.updateScaleRange && eventArgs.hint != chartManagerDataModel_1.ChartManagerDataModelChangedHint.default) {
                this.refresh();
                var treegridObj = this.getTreeGridObject();
                if (treegridObj.model.selectedRowIndex == -1) { // TODO: selectedItem != undefined but selectedRowIndex == -1 !!!
                    this.updateToolbarButtonStates(eventArgs.data.data, undefined);
                }
                else {
                    this.updateToolbarButtonStates(eventArgs.data.data, treegridObj.model.selectedItem.item);
                }
                this.saveTreeGridSettings();
            }
        };
        /**
         * Creates the drag and drop and column templates for the tree grid and adds them to the widget container
         *
         * @protected
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.createTemplates = function () {
            var $widgetContainer = $(this.mainDiv);
            $widgetContainer.append(this.getScriptForDragDropTemplateHelpers());
            $widgetContainer.append(this.getColumnTemplateData(ChartManagerWidget.nameColumnId));
        };
        /**
         * creates the tree grid for the chartmanager
         *
         * @protected
         * @returns
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.createTreeGrid = function () {
            var _this = this;
            if (this._dataModel == undefined) {
                console.info("dataModel undefined!");
                return;
            }
            var cellStyle = new chartManagerTreeGridCellStyle_1.ChartManagerTreeGridCellStyle();
            $(this.mainDiv).ejTreeGrid(__assign(__assign(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridColumnResizeSupport()), this.getTreeGridToolbarSupport()), this.getTreeGridDragDropSupport()), { dataSource: this._dataModel.data, childMapping: "childs", idMapping: ChartManagerWidget.nameColumnId, expandStateMapping: "expandState", isResponsive: true, rowHeight: 28, 
                // Set init size to draw the toolbar icons at the right position
                sizeSettings: { height: '100px', width: '100px', }, expanded: function (args) { return _this.treeGridNodeExpandedOrCollapsed(); }, collapsed: function (args) { return _this.treeGridNodeExpandedOrCollapsed(); }, rowSelected: function (args) { return _this.updateToolbarButtonStates(args.model.dataSource, args.data.item); }, create: function (args) { return _this.treeGridCreated(); }, actionBegin: function (args) { return _this.treeGridActionBegin(args); }, actionComplete: function (args) { return _this.treeGridActionComplete(args); }, queryCellInfo: function (args) { return cellStyle.setCellStyle(args); } }));
        };
        ChartManagerWidget.prototype.treeGridNodeExpandedOrCollapsed = function () {
            // Refresh to see correct expanded/collapsed icon
            this.refresh();
            //Persist data model (expandState)
            if (this._dataModel !== undefined) {
                this._dataModel.saveSettings();
            }
            //Persit scrollbar position of treeGrid
            this.saveTreeGridSettings();
        };
        /**
         * Returns the tree grid column definition
         *
         * @private
         * @returns {{}}
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.getTreeGridColumnDefinition = function () {
            return {
                columns: [
                    { field: ChartManagerWidget.nameColumnId, headerText: "Name", isTemplateColumn: true, templateID: "cmNameColumnTemplate" },
                    { field: ChartManagerWidget.additionalInfoColumnId, headerText: "", width: "140px" },
                    { field: ChartManagerWidget.iconDefinitionColumnId, visible: false, width: "0px" },
                ],
            };
        };
        /**
         * Returns the tree grid column resize settings
         *
         * @private
         * @returns {{}}
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.getTreeGridColumnResizeSupport = function () {
            var _this = this;
            return {
                allowColumnResize: true,
                columnResizeSettings: { columnResizeMode: ej.TreeGrid.ColumnResizeMode.FixedColumns },
                columnResized: function (args) { return _this.treeGridColumnResized(args); },
            };
        };
        /**
         * A treegrid column was resized
         *
         * @private
         * @param {*} args
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.treeGridColumnResized = function (args) {
            _super.prototype.resizeDynamicColumn.call(this, args.columnIndex, args.model);
            this.saveTreeGridSettings();
        };
        /**
         * Returns the tree grid toolbar settings
         *
         * @private
         * @returns {{}}
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.getTreeGridToolbarSupport = function () {
            this._toolbar = new chartManagerTreeGridToolbar_1.ChartManagerTreeGridToolbar(this.mainDiv, this._dataModel);
            return _super.prototype.getTreeGridToolbarSupport.call(this);
        };
        ChartManagerWidget.prototype.getTreeGridDragDropSupport = function () {
            var _this = this;
            var dragDrop = new chartManagerTreeGridDragDrop_1.ChartManagerTreeGridDragDrop();
            return {
                allowDragAndDrop: true,
                rowDragStart: function (args) { return dragDrop.rowDragStart(args); },
                rowDrag: function (args) { return dragDrop.rowDrag(args); },
                rowDropActionBegin: function (args) { return dragDrop.rowDropActionBegin(args, _this._dataModel); },
                rowDragStop: function (args) { return dragDrop.rowDragStop(args, _this._dataModel); },
            };
        };
        ChartManagerWidget.prototype.treeGridActionBegin = function (args) {
            // Support "Entf/Del" key
            if (args.requestType == "delete") {
                args.cancel = true;
                if (args.deletedItems[0].item instanceof chartManagerChart_1.ChartManagerChart) {
                    // Remove chart from datamodel
                    this._dataModel.removeChart(args.deletedItems[0].item);
                }
                else if (args.deletedItems[0].item instanceof baseSeries_1.BaseSeries) {
                    var chart = args.deletedItems[0].parentItem.parentItem.item;
                    if (chart != undefined) {
                        // Remove serie from datamodel
                        this._dataModel.removeSerie(chart, args.deletedItems[0].item);
                    }
                }
                else if (args.deletedItems[0].item instanceof scale_1.Scale) {
                    var chart = args.deletedItems[0].parentItem.item;
                    if (chart != undefined && chart.canRemoveYAxis() == true) {
                        // Remove yAxis from datamodel
                        this._dataModel.removeYAxis(chart, args.deletedItems[0].item);
                    }
                }
            }
        };
        ChartManagerWidget.prototype.treeGridActionComplete = function (args) {
            // Event trigger while changing datasource dynamically. 
            // code to done after the dynamic change of datasource. 
            if (args.requestType === 'refreshDataSource') {
                this.refreshSelection();
            }
        };
        ChartManagerWidget.prototype.resize = function (width, height) {
            _super.prototype.resize.call(this, width, height);
        };
        ChartManagerWidget.prototype.refresh = function () {
            try {
                if (this.refreshEnabled) {
                    // update datamodel in treegrid
                    this.setModel(this.dataModel.data);
                    // update datamodel in toolbar
                    this._toolbar.updateDataModel(this.dataModel);
                }
            }
            catch (e) {
                console.info("ChartManager refresh error! => TreeGrid recreation!");
                console.info(e);
                this.createTreeGrid();
            }
        };
        ChartManagerWidget.prototype.refreshSelection = function () {
            var treeObj = $(this.mainDiv).ejTreeGrid('instance');
            // Get actual selection index
            var actualSelectedRowIndex = treeObj.model.selectedRowIndex;
            // Reset selection
            treeObj.model.selectedRowIndex = -1;
            // Set to last index if index is out of range
            if (actualSelectedRowIndex >= treeObj.model.flatRecords.length) {
                actualSelectedRowIndex = treeObj.model.flatRecords.length - 1;
            }
            // Set selection
            treeObj.model.selectedRowIndex = actualSelectedRowIndex;
            // update toolbar buttons
            if (treeObj.model.flatRecords[actualSelectedRowIndex] != undefined) {
                this.updateToolbarButtonStates(treeObj.model.dataSource, treeObj.model.flatRecords[actualSelectedRowIndex].item);
            }
        };
        ChartManagerWidget.prototype.updateToolbarButtonStates = function (charts, selectedItem) {
            var toolbar = this._toolbar;
            if (charts.length == 0 || selectedItem == undefined || (selectedItem instanceof scale_1.Scale && selectedItem.parent.canRemoveYAxis() == false)) {
                toolbar.disableDeleteButton(true);
            }
            else {
                toolbar.disableDeleteButton(false);
            }
            if (this._dataModel.canAddChart() || (selectedItem instanceof chartManagerChart_1.ChartManagerChart && selectedItem.canAddYAxis())) {
                toolbar.disableAddButton(false);
            }
            else {
                toolbar.disableAddButton(true);
            }
            toolbar.setSelectedChart(selectedItem);
        };
        //*******************************************************Region drop support*******************************************************
        /**
         * Adds all possible dropLocations
         *
         * @private
         * @param {Array<BaseSeries>} series
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.addDropLocations = function (series) {
            // Add possible drop locations
        };
        /**
         * Removes all drop locations
         *
         * @private
         * @param {Array<BaseSeries>} series
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.removeDropLocations = function (series) {
            this._dataModel.data.forEach(function (chart) {
                chart.dropPossible = false;
                chart.childs.forEach(function (yAxis) {
                    yAxis.dropPossible = false;
                });
            });
        };
        ChartManagerWidget.prototype.dragStart = function (args) {
            var serie = args.data;
            // Add possible dropLocations
            this.addDropLocations(serie);
            // Update treeGrid
            this.refresh();
        };
        ChartManagerWidget.prototype.dragStop = function (args) {
            var serie = args.data;
            // Remove possible dropLocations
            this.removeDropLocations(serie);
            // Update treeGrid
            this.refresh();
        };
        ChartManagerWidget.prototype.dragOver = function (args) {
            var series = args.data;
            var dropPossible = false;
            var chart = this.getChartFromDragLocation(args.currentTarget);
            var yAxis = this.getYAxisFromDragLocation(args.currentTarget);
            var imageProvider = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.ImageProviderId);
            if (chart != undefined) {
                if (chart.dropPossible == true) {
                    dropPossible = true;
                    if (args.dragDropRepresentation != undefined) {
                        var addNewScaleImage = imageProvider.getImage("../app/widgets/common/style/images/dragDrop/addNewScale.svg");
                        args.dragDropRepresentation.iconList.push(addNewScaleImage);
                        if (series[0].type === seriesType_1.SeriesType.timeSeries && chart.chartType == chartManagerChart_1.ChartType.FFTChart) {
                            args.dragDropRepresentation.textList[0] = "Calculate FFT signal and add it to new scale";
                        }
                        else {
                            args.dragDropRepresentation.textList[0] = "Create a new scale and add dragged signals";
                        }
                    }
                }
            }
            else if (yAxis != undefined) {
                if (yAxis.dropPossible == true) {
                    dropPossible = true;
                    if (args.dragDropRepresentation != undefined) {
                        var addNewScaleImage = void 0;
                        //XY chart exception
                        if (yAxis.parent.chartType == chartManagerChart_1.ChartType.XYChart) {
                            addNewScaleImage = imageProvider.getImage("../app/widgets/common/style/images/dragDrop/assignToChart.svg");
                            if (series[0].type == seriesType_1.SeriesType.timeSeries) {
                                args.dragDropRepresentation.textList[0] = "Calculate XY signal and add it to the chart";
                            }
                            else {
                                args.dragDropRepresentation.textList[0] = "Add dragged signals to chart";
                            }
                        }
                        else if (yAxis.parent.chartType == chartManagerChart_1.ChartType.FFTChart) {
                            addNewScaleImage = imageProvider.getImage("../app/widgets/common/style/images/dragDrop/assignToScale.svg");
                            args.dragDropRepresentation.textList[0] = "Calculate FFT signal and add it to scale";
                        }
                        else {
                            addNewScaleImage = imageProvider.getImage("../app/widgets/common/style/images/dragDrop/assignToScale.svg");
                            args.dragDropRepresentation.textList[0] = "Add dragged signals to scale";
                        }
                        args.dragDropRepresentation.iconList.push(addNewScaleImage);
                    }
                }
            }
            this.highlightDroppableAreas(chart, yAxis, args.currentTarget);
            return dropPossible;
        };
        ChartManagerWidget.prototype.drop = function (args) {
            var series = args.data;
            var chart = this.getChartFromDragLocation(args.currentTarget);
            var yAxis = this.getYAxisFromDragLocation(args.currentTarget);
            if (yAxis != undefined) {
                chart = yAxis.parent;
            }
            series = SerieChartTypeHelper_1.SerieChartTypeHelper.getDroppableSeries(chart.getAllSeries(), series);
            var data = {
                chart: chart,
                yAxis: yAxis,
                series: series
            };
            //raise event to traceViewWidget
            if (series[0].type == seriesType_1.SeriesType.timeSeries && chart.chartType == chartManagerChart_1.ChartType.XYChart) {
                this.eventDropHelper.raise(this.dataModel, { hint: chartDropHelper_1.ChartDropHelperChangedHint.createXYSerie, data: data });
            }
            else if (series[0].type == seriesType_1.SeriesType.timeSeries && chart.chartType == chartManagerChart_1.ChartType.FFTChart) {
                this.eventDropHelper.raise(this.dataModel, { hint: chartDropHelper_1.ChartDropHelperChangedHint.createFFTSerie, data: data });
            }
            else {
                this.eventDropHelper.raise(this.dataModel, { hint: chartDropHelper_1.ChartDropHelperChangedHint.addSerie, data: data });
            }
            this.resetHighlightArea();
        };
        ChartManagerWidget.prototype.getChartFromDragLocation = function (currentTarget) {
            var classes = currentTarget.classList.value;
            //avoid dropping serie in not highlighted area
            if (!classes.includes('e-templatecell') && classes.includes('e-rowcell') || classes.includes('e-headercell') || currentTarget.localName == 'span') {
                return undefined;
            }
            var record = this.getTreeRecord(currentTarget);
            if (record != undefined) {
                if (record.item instanceof chartManagerChart_1.ChartManagerChart) {
                    return record.item;
                }
            }
            return undefined;
        };
        ChartManagerWidget.prototype.getYAxisFromDragLocation = function (currentTarget) {
            var classes = currentTarget.classList.value;
            //avoid dropping serie in not highlighted area
            if (!classes.includes('e-templatecell') && classes.includes('e-rowcell')) {
                return undefined;
            }
            var record = this.getTreeRecord(currentTarget);
            if (record != undefined) {
                if (record.item instanceof scale_1.Scale) {
                    return record.item;
                }
            }
            return undefined;
        };
        /**
         * Returns the column template informations
         *
         * @private
         * @returns {string}
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.getColumnTemplateData = function (columnId) {
            if (columnId == ChartManagerWidget.nameColumnId) {
                return "<script type=\"text/x-jsrender\" id=\"cmNameColumnTemplate\">\n\t\t\t            <div style='height:20px;' unselectable='on'>\n                            {{if !~getstate()}}\n                                <div class='e-dragintend' style='height:1px; float:left; width:14px; display:inline-block;'>\n                                    <div class={{:~_stageName()}} style='width:24px;'>\n                                        <span class='e-aboveIcon e-iconMargin e-icon' style='position:relative;float:right;display:none;'></span>\n                                        <span class='e-belowIcon e-iconMargin e-icon' style='position:relative;float:right;display:none;'></span>\n                                        <span class='e-childIcon e-iconMargin e-icon' style='position:relative;float:right;display:none;'></span>\n                                        <span class='e-cancelIcon e-iconMargin e-icon' style='position:relative;float:right;display:none;'></span>\n                                    </div>\n                                </div>\n                            {{else ~getstate()}}\n                                <div class='e-intendparent'>\n                                    <div class={{:~_stageName()}}>\n                                        <span class='e-aboveIcon e-iconMargin e-icon' style='position:relative;float:left;display:none;'></span>\n                                        <span class='e-belowIcon e-iconMargin e-icon' style='position:relative;float:left;display:none;'></span>\n                                        <span class='e-childIcon e-iconMargin e-icon' style='position:relative;float:left;display:none;'></span>\n                                        <span class='e-cancelIcon e-iconMargin e-icon' style='position:relative;float:left;display:none;'></span>\n                                    </div>\n                                </div>\n                            {{/if}}\n   \n                            {{:#data['iconDefinition']}}\n                            <div class='e-cell' style='display:inline-block;width:100%' unselectable='on'>{{:#data['name']}}</div>\n\t\t\t            </div>\n                    </script>";
            }
            return "";
        };
        ChartManagerWidget.prototype.getScriptForDragDropTemplateHelpers = function () {
            return "<script type=\"text/javascript\">\n                    $.views.helpers({ _stageName: getStageName });\n                    $.views.helpers({ getstate: _getState });\n                    $.views.helpers({ isGroup: _isGroup });\n                    \n                    function _getState() {\n                        if (this.data.parentItem)\n                            return false;\n                        else\n                            return true;\n                    }\n\n                    function _isGroup() {\n                        if (this.data.isGroup)\n                            return true;\n                        else\n                            return false;\n                    }\n\n                    function getStageName() {\n                        var rowClass = \"gridrowIndex\",\n                            proxy = this;\n                        rowClass += proxy.data.index.toString() + \"level\" + proxy.data.level.toString();\n                        return rowClass;\n\n                    }\n                </script>";
        };
        /**
         *
         *
         * @param {DragDropArgs} args
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.dropFocusLost = function (args) {
            this.resetHighlightArea();
        };
        ;
        /**
         * Highlight rows where signal is dragged over and possible to be dropped
         *
         * @private
         * @param {(IChartManagerChart | undefined)} chartManagerChart
         * @param {(Scale | undefined)} yAxis
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.highlightDroppableAreas = function (chartManagerChart, yAxis, currentTarget) {
            if (chartManagerChart != undefined && chartManagerChart.dropPossible) {
                var area = this.getAreaToFromCurrentTarget(currentTarget);
                this.addHighlightedArea(area);
            }
            else if (yAxis != undefined && yAxis.dropPossible) {
                var area = this.getAreaToFromCurrentTarget(currentTarget);
                this.addHighlightedArea(area);
            }
            else {
                this.resetHighlightArea();
            }
        };
        ChartManagerWidget.prototype.addHighlightedArea = function (area) {
            var highlightElem = $('<div id="' + this.highlightAreaId + '" style=" pointer-events:none; position:absolute; " class="draggedOver"></div>');
            this.resetHighlightArea(highlightElem);
            $(area).append(highlightElem);
            highlightElem.css('top', area.offsetTop);
            highlightElem.css('left', area.offsetLeft);
            highlightElem.css('height', area.offsetHeight);
            highlightElem.css('width', area.offsetWidth);
        };
        ChartManagerWidget.prototype.getAreaToFromCurrentTarget = function (currentTarget) {
            var classes = currentTarget.classList.value;
            if (classes.includes('e-rowcell')) {
                return currentTarget;
            }
            else {
                return this.getAreaToFromCurrentTarget(currentTarget.parentElement);
            }
        };
        /**
         * Reset all highlighted ares in chartManager except the cell being draggedOver
         *
         * @private
         * @param {JQuery<HTMLElement>} [element]
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.resetHighlightArea = function (element) {
            var highlightElem = $('#' + this.highlightAreaId);
            for (var i = 0; i < highlightElem.length; i++) {
                if (element == undefined || highlightElem[i] != element[0]) {
                    highlightElem[i].remove();
                }
            }
        };
        ChartManagerWidget.nameColumnId = "name";
        ChartManagerWidget.additionalInfoColumnId = "additionalInfo";
        ChartManagerWidget.iconDefinitionColumnId = "iconDefinition";
        return ChartManagerWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.ChartManagerWidget = ChartManagerWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRNYW5hZ2VyV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0TWFuYWdlcldpZGdldC9jaGFydE1hbmFnZXJXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBc0JBO1FBQWlDLHNDQUFrQjtRQUFuRDtZQUFBLHFFQTJuQkM7WUF6bkJHLHFCQUFlLEdBQW9CLElBQUksaUNBQWUsRUFBRSxDQUFDO1lBS3hDLHFCQUFlLEdBQUcsMEJBQTBCLENBQUM7O1lBbW5COUQsdUlBQXVJO1FBQzNJLENBQUM7UUFsbkJHOzs7OztXQUtHO1FBQ0gsK0NBQWtCLEdBQWxCO1lBQ0ksT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDO1FBRUQsZ0RBQW1CLEdBQW5CO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLHVEQUEwQixFQUFFLENBQUMsQ0FBQztRQUMxRSxDQUFDO1FBRUQsb0NBQU8sR0FBUDtZQUNJLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyw4QkFBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFELGlCQUFNLE9BQU8sV0FBRSxDQUFDO1FBQ3BCLENBQUM7UUFFRDs7OztXQUlHO1FBQ0gsdUNBQVUsR0FBVjtZQUNJLGlCQUFNLFVBQVUsV0FBRSxDQUFDO1lBQ25CLGlCQUFNLFFBQVEsWUFBQyxnREFBZ0QsQ0FBQyxDQUFDO1FBQ3JFLENBQUM7UUFFRDs7OztXQUlHO1FBQ0gseUNBQVksR0FBWjtZQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFFdkMsaUJBQU0sWUFBWSxXQUFFLENBQUM7UUFDekIsQ0FBQztRQUVELHdDQUFXLEdBQVg7WUFDSSxpQkFBTSxXQUFXLFdBQUUsQ0FBQztZQUVwQixJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztZQUVo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QUFDLEVBQUU7b0JBQzNELGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztpQkFDMUI7YUFDRDtRQUNDLENBQUM7UUFybkJ1QiwrQkFBWSxHQUFHLE1BQU0sQ0FBQztRQUN0Qix5Q0FBc0IsR0FBRyxnQkFBZ0IsQ0FBQztRQUMxQyx5Q0FBc0IsR0FBRyxnQkFBZ0IsQ0FBQztRQXFuQnRFLHlCQUFDO0tBQUEsQUEzbkJELENBQWlDLHVDQUFrQixHQTJuQmxEO0lBRVEsZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2xpYnMvdWkvVHlwZXMvZWoud2ViLmFsbC5kLnRzXCIgLz5cclxuaW1wb3J0IHsgRXZlbnRNb2RlbENoYW5nZWRBcmdzLCBJRGF0YU1vZGVsIH0gZnJvbSBcIi4uLy4uL21vZGVscy9kYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHJlZUdyaWRXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi90cmVlR3JpZFdpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgQ2hhcnRNYW5hZ2VyVHJlZUdyaWRDZWxsU3R5bGUgfSBmcm9tIFwiLi92aWV3L2NoYXJ0TWFuYWdlclRyZWVHcmlkQ2VsbFN0eWxlXCI7XHJcbmltcG9ydCB7IENoYXJ0TWFuYWdlclRyZWVHcmlkRHJhZ0Ryb3AgfSBmcm9tIFwiLi92aWV3L2NoYXJ0TWFuYWdlclRyZWVHcmlkRHJhZ0Ryb3BcIjtcclxuaW1wb3J0IHsgQ2hhcnRNYW5hZ2VyVHJlZUdyaWRUb29sYmFyIH0gZnJvbSBcIi4vdmlldy9jaGFydE1hbmFnZXJUcmVlR3JpZFRvb2xiYXJcIjtcclxuaW1wb3J0IHsgQ2hhcnRNYW5hZ2VyQ2hhcnQsIENoYXJ0VHlwZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2NoYXJ0TWFuYWdlckNoYXJ0XCI7XHJcbmltcG9ydCB7IElDaGFydE1hbmFnZXJDaGFydCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2ludGVyZmFjZXMvY2hhcnRNYW5hZ2VyQ2hhcnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSURyb3BwYWJsZSwgRHJhZ0Ryb3BEYXRhSWQgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvZHJvcEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vc2VyaWVzL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgU2NhbGUgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9zY2FsZVwiO1xyXG5pbXBvcnQgeyBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvaW50ZXJmYWNlcy9jaGFydE1hbmFnZXJEYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9jaGFydE1hbmFnZXJEYXRhTW9kZWxcIjtcclxuaW1wb3J0IHsgRHJhZ0Ryb3BBcmdzIH0gZnJvbSBcIi4uL2NvbW1vbi9kcmFnRHJvcEFyZ3NcIjtcclxuaW1wb3J0IHsgRXZlbnREcm9wSGVscGVyIH0gZnJvbSBcIi4uL2NoYXJ0Vmlld1dpZGdldC9jaGFydFZpZXdXaWRnZXRcIjtcclxuaW1wb3J0IHsgQ2hhcnREcm9wSGVscGVyQ2hhbmdlZEhpbnQgfSBmcm9tIFwiLi4vY2hhcnRWaWV3V2lkZ2V0L2hlbHBlcnMvY2hhcnREcm9wSGVscGVyXCI7XHJcbmltcG9ydCB7IFNlcmllQ2hhcnRUeXBlSGVscGVyIH0gZnJvbSBcIi4uL2NvbW1vbi9TZXJpZUNoYXJ0VHlwZUhlbHBlclwiO1xyXG5pbXBvcnQgeyBTZXJpZXNUeXBlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vc2VyaWVzL3Nlcmllc1R5cGVcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgSUltYWdlUHJvdmlkZXIgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvaW1hZ2VQcm92aWRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbiB9IGZyb20gXCIuL2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXCI7XHJcblxyXG5jbGFzcyBDaGFydE1hbmFnZXJXaWRnZXQgZXh0ZW5kcyBUcmVlR3JpZFdpZGdldEJhc2UgaW1wbGVtZW50cyBJRHJvcHBhYmxlIHtcclxuXHJcbiAgICBldmVudERyb3BIZWxwZXI6IEV2ZW50RHJvcEhlbHBlciA9IG5ldyBFdmVudERyb3BIZWxwZXIoKTtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgbmFtZUNvbHVtbklkID0gXCJuYW1lXCI7XHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBhZGRpdGlvbmFsSW5mb0NvbHVtbklkID0gXCJhZGRpdGlvbmFsSW5mb1wiO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgaWNvbkRlZmluaXRpb25Db2x1bW5JZCA9IFwiaWNvbkRlZmluaXRpb25cIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgaGlnaGxpZ2h0QXJlYUlkID0gXCJjaGFydE1hbmFnZXJfSGlnaGxpZ2h0ZWRcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgdGhlIGhlaWdodCBvZiB0aGUgaGVhZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgZGVmaW5lSGVhZGVySGVpZ2h0KCk6IG51bWJlcntcclxuICAgICAgICByZXR1cm4gMzA7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldERlZmF1bHREZWZpbml0aW9uKG5ldyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbigpKTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNwb3NlKCkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlU3VwcG9ydGVkRHJhZ0Ryb3BEYXRhSWQoRHJhZ0Ryb3BEYXRhSWQuc2lnbmFsKTtcclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyB0aGUgc3R5bGVzIGZvciB0aGUgY2hhcnQgbWFuYWdlciB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGxvYWRTdHlsZXMoKSB7XHJcbiAgICAgICAgc3VwZXIubG9hZFN0eWxlcygpO1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy9jb21tb24vc3R5bGUvY3NzL2Ryb3BEb3duTWVudVN0eWxlLmNzc1wiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGxheW91dCBvZiB0aGUgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICAgICAgdGhpcy5tYWluRGl2LnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcclxuXHJcbiAgICAgICAgc3VwZXIuY3JlYXRlTGF5b3V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZWQoKXtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplZCgpO1xyXG5cclxuICAgICAgICB0aGlzLnNldENoYXJ0TWFuYWdlckRhdGFNb2RlbCgpO1xyXG5cclxuICAgICAgICBzdXBlci5zZXRIZWFkZXJDb250ZW50KFwiQ2hhcnRzXCIpO1xyXG5cclxuICAgICAgICAvLyBTZXQgZHluYW1pYyBjb2x1bW4gc2V0dGluZ3NcclxuICAgICAgICBzdXBlci5zZXREeW5hbWljQ29sdW1uKDAsIDgwKTtcclxuXHJcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBzY3JvbGxiYXJzIHBvc2l0aW9ucyAgICAgIFxyXG4gICAgICAgIGxldCBzY3JvbGxiYXJTZXR0aW5ncyA9IHRoaXMuY29tcG9uZW50LmdldFNldHRpbmcoVHJlZUdyaWRXaWRnZXRCYXNlLlNjcm9sbGJhcnNTZXR0aW5nc0lkKTtcclxuICAgICAgICB0aGlzLnNldFNjcm9sbEJhclNldHRpbmdzKHNjcm9sbGJhclNldHRpbmdzKTtcclxuXHJcbiAgICAgICAgLy8gSGlkZSB0aGUgY29sdW1uIGhlYWRlciBvZiB0aGUgdHJlZSBncmlkXHJcbiAgICAgICAgLy9zdXBlci5zZXRDb2x1bW5IZWFkZXJIaWRkZW4oKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRTdXBwb3J0ZWREcmFnRHJvcERhdGFJZChEcmFnRHJvcERhdGFJZC5zaWduYWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldENoYXJ0TWFuYWdlckRhdGFNb2RlbCgpIHtcclxuICAgICAgICBsZXQgZGF0YU1vZGVsID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLkNoYXJ0TWFuYWdlckRhdGFNb2RlbElkKTtcclxuICAgICAgICB0aGlzLmRhdGFNb2RlbCA9IGRhdGFNb2RlbCBhcyBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFJlZnJlc2ggdHJlZUdyaWQoYW5kIHRvb2xiYXIpIHRvIHVzZSB0aGUgbmV3IGRhdGFtb2RlbFxyXG4gICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgIH1cclxuXHJcblx0cHVibGljIGdldENvbXBvbmVudFNldHRpbmdzKG9ubHlNb2RpZmllZDogYm9vbGVhbik6IENvbXBvbmVudFNldHRpbmdze1xyXG5cdFx0cmV0dXJuIHN1cGVyLmdldENvbXBvbmVudFNldHRpbmdzKG9ubHlNb2RpZmllZCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0Q29tcG9uZW50U2V0dGluZ3MoZGF0YTogQ29tcG9uZW50U2V0dGluZ3MpIHtcclxuICAgICAgICBpZihkYXRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHN1cGVyLnNldENvbXBvbmVudFNldHRpbmdzKGRhdGEpO1xyXG4gICAgICAgIH1cclxuXHR9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIHRoZSBtb2RlbCBjaGFuZ2VzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJRGF0YU1vZGVsfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7RXZlbnRNb2RlbENoYW5nZWRBcmdzfSBldmVudEFyZ3NcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBoYW5kbGVNb2RlbENoYW5nZWQoc2VuZGVyOiBJRGF0YU1vZGVsLCBldmVudEFyZ3M6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyk6IGFueSB7XHJcbiAgICAgICAgaWYgKGV2ZW50QXJncy5oaW50ICE9IENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LnVwZGF0ZVNjYWxlUmFuZ2UgJiYgZXZlbnRBcmdzLmhpbnQgIT0gQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQuZGVmYXVsdCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgdmFyIHRyZWVncmlkT2JqID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG4gICAgICAgICAgICBpZiAoKDxhbnk+dHJlZWdyaWRPYmoubW9kZWwpLnNlbGVjdGVkUm93SW5kZXggPT0gLTEpIHsgLy8gVE9ETzogc2VsZWN0ZWRJdGVtICE9IHVuZGVmaW5lZCBidXQgc2VsZWN0ZWRSb3dJbmRleCA9PSAtMSAhISFcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVG9vbGJhckJ1dHRvblN0YXRlcyhldmVudEFyZ3MuZGF0YS5kYXRhLCB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVUb29sYmFyQnV0dG9uU3RhdGVzKGV2ZW50QXJncy5kYXRhLmRhdGEsICg8YW55PnRyZWVncmlkT2JqLm1vZGVsKS5zZWxlY3RlZEl0ZW0uaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zYXZlVHJlZUdyaWRTZXR0aW5ncygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGRyYWcgYW5kIGRyb3AgYW5kIGNvbHVtbiB0ZW1wbGF0ZXMgZm9yIHRoZSB0cmVlIGdyaWQgYW5kIGFkZHMgdGhlbSB0byB0aGUgd2lkZ2V0IGNvbnRhaW5lclxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVRlbXBsYXRlcygpIHtcclxuICAgICAgICB2YXIgJHdpZGdldENvbnRhaW5lciA9ICQodGhpcy5tYWluRGl2KTtcclxuICAgICAgICAkd2lkZ2V0Q29udGFpbmVyLmFwcGVuZCh0aGlzLmdldFNjcmlwdEZvckRyYWdEcm9wVGVtcGxhdGVIZWxwZXJzKCkpO1xyXG4gICAgICAgICR3aWRnZXRDb250YWluZXIuYXBwZW5kKHRoaXMuZ2V0Q29sdW1uVGVtcGxhdGVEYXRhKENoYXJ0TWFuYWdlcldpZGdldC5uYW1lQ29sdW1uSWQpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZXMgdGhlIHRyZWUgZ3JpZCBmb3IgdGhlIGNoYXJ0bWFuYWdlclxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjcmVhdGVUcmVlR3JpZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fZGF0YU1vZGVsID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmluZm8oXCJkYXRhTW9kZWwgdW5kZWZpbmVkIVwiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjZWxsU3R5bGUgPSBuZXcgQ2hhcnRNYW5hZ2VyVHJlZUdyaWRDZWxsU3R5bGUoKTtcclxuICAgICAgICAkKHRoaXMubWFpbkRpdikuZWpUcmVlR3JpZCh7XHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5SZXNpemVTdXBwb3J0KCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkRHJhZ0Ryb3BTdXBwb3J0KCksXHJcblxyXG4gICAgICAgICAgICBkYXRhU291cmNlOiB0aGlzLl9kYXRhTW9kZWwuZGF0YSxcclxuICAgICAgICAgICAgY2hpbGRNYXBwaW5nOiBcImNoaWxkc1wiLFxyXG4gICAgICAgICAgICBpZE1hcHBpbmc6IENoYXJ0TWFuYWdlcldpZGdldC5uYW1lQ29sdW1uSWQsXHJcbiAgICAgICAgICAgIGV4cGFuZFN0YXRlTWFwcGluZzogXCJleHBhbmRTdGF0ZVwiLFxyXG4gICAgICAgICAgICBpc1Jlc3BvbnNpdmU6IHRydWUsXHJcbiAgICAgICAgICAgIHJvd0hlaWdodDogMjgsXHJcbiAgICAgICAgICAgIC8vIFNldCBpbml0IHNpemUgdG8gZHJhdyB0aGUgdG9vbGJhciBpY29ucyBhdCB0aGUgcmlnaHQgcG9zaXRpb25cclxuICAgICAgICAgICAgc2l6ZVNldHRpbmdzOiB7IGhlaWdodDogJzEwMHB4Jywgd2lkdGg6ICcxMDBweCcsIH0sXHJcblxyXG4gICAgICAgICAgICBleHBhbmRlZDogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWROb2RlRXhwYW5kZWRPckNvbGxhcHNlZCgpLFxyXG4gICAgICAgICAgICBjb2xsYXBzZWQ6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkTm9kZUV4cGFuZGVkT3JDb2xsYXBzZWQoKSxcclxuXHJcbiAgICAgICAgICAgIHJvd1NlbGVjdGVkOiAoYXJncykgPT4gdGhpcy51cGRhdGVUb29sYmFyQnV0dG9uU3RhdGVzKGFyZ3MubW9kZWwuZGF0YVNvdXJjZSwgYXJncy5kYXRhLml0ZW0pLFxyXG4gICAgICAgICAgICBjcmVhdGU6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkQ3JlYXRlZCgpLFxyXG4gICAgICAgICAgICBhY3Rpb25CZWdpbjogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRBY3Rpb25CZWdpbihhcmdzKSxcclxuICAgICAgICAgICAgYWN0aW9uQ29tcGxldGU6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkQWN0aW9uQ29tcGxldGUoYXJncyksXHJcbiAgICAgICAgICAgIHF1ZXJ5Q2VsbEluZm86IChhcmdzKSA9PiBjZWxsU3R5bGUuc2V0Q2VsbFN0eWxlKGFyZ3MpLFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cmVlR3JpZE5vZGVFeHBhbmRlZE9yQ29sbGFwc2VkKCkge1xyXG4gICAgICAgIC8vIFJlZnJlc2ggdG8gc2VlIGNvcnJlY3QgZXhwYW5kZWQvY29sbGFwc2VkIGljb25cclxuICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICBcclxuICAgICAgICAvL1BlcnNpc3QgZGF0YSBtb2RlbCAoZXhwYW5kU3RhdGUpXHJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGFNb2RlbCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICg8YW55PnRoaXMuX2RhdGFNb2RlbCkuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vUGVyc2l0IHNjcm9sbGJhciBwb3NpdGlvbiBvZiB0cmVlR3JpZFxyXG4gICAgICAgIHRoaXMuc2F2ZVRyZWVHcmlkU2V0dGluZ3MoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCBjb2x1bW4gZGVmaW5pdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCk6IHt9IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb2x1bW5zOiBbXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBDaGFydE1hbmFnZXJXaWRnZXQubmFtZUNvbHVtbklkLCBoZWFkZXJUZXh0OiBcIk5hbWVcIiwgaXNUZW1wbGF0ZUNvbHVtbjogdHJ1ZSwgdGVtcGxhdGVJRDogXCJjbU5hbWVDb2x1bW5UZW1wbGF0ZVwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBDaGFydE1hbmFnZXJXaWRnZXQuYWRkaXRpb25hbEluZm9Db2x1bW5JZCwgaGVhZGVyVGV4dDogXCJcIiwgd2lkdGg6IFwiMTQwcHhcIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogQ2hhcnRNYW5hZ2VyV2lkZ2V0Lmljb25EZWZpbml0aW9uQ29sdW1uSWQsIHZpc2libGU6IGZhbHNlLCB3aWR0aDogXCIwcHhcIiB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY29sdW1uIHJlc2l6ZSBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5SZXNpemVTdXBwb3J0KCk6IHt9IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBhbGxvd0NvbHVtblJlc2l6ZTogdHJ1ZSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplU2V0dGluZ3M6IHsgY29sdW1uUmVzaXplTW9kZTogZWouVHJlZUdyaWQuQ29sdW1uUmVzaXplTW9kZS5GaXhlZENvbHVtbnMgfSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplZDogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRDb2x1bW5SZXNpemVkKGFyZ3MpLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBIHRyZWVncmlkIGNvbHVtbiB3YXMgcmVzaXplZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB0cmVlR3JpZENvbHVtblJlc2l6ZWQoYXJncykge1xyXG4gICAgICAgIHN1cGVyLnJlc2l6ZUR5bmFtaWNDb2x1bW4oYXJncy5jb2x1bW5JbmRleCwgYXJncy5tb2RlbCk7XHJcbiAgICAgICAgdGhpcy5zYXZlVHJlZUdyaWRTZXR0aW5ncygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIHRvb2xiYXIgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpOiB7fSB7XHJcbiAgICAgICAgdGhpcy5fdG9vbGJhciA9IG5ldyBDaGFydE1hbmFnZXJUcmVlR3JpZFRvb2xiYXIodGhpcy5tYWluRGl2LCB0aGlzLl9kYXRhTW9kZWwgYXMgSUNoYXJ0TWFuYWdlckRhdGFNb2RlbCk7XHJcbiAgICAgICAgcmV0dXJuIHN1cGVyLmdldFRyZWVHcmlkVG9vbGJhclN1cHBvcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkRHJhZ0Ryb3BTdXBwb3J0KCk6IHt9IHtcclxuICAgICAgICB2YXIgZHJhZ0Ryb3AgPSBuZXcgQ2hhcnRNYW5hZ2VyVHJlZUdyaWREcmFnRHJvcCgpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGFsbG93RHJhZ0FuZERyb3A6IHRydWUsXHJcbiAgICAgICAgICAgIHJvd0RyYWdTdGFydDogKGFyZ3MpID0+IGRyYWdEcm9wLnJvd0RyYWdTdGFydChhcmdzKSxcclxuICAgICAgICAgICAgcm93RHJhZzogKGFyZ3MpID0+IGRyYWdEcm9wLnJvd0RyYWcoYXJncyksXHJcbiAgICAgICAgICAgIHJvd0Ryb3BBY3Rpb25CZWdpbjogKGFyZ3MpID0+IGRyYWdEcm9wLnJvd0Ryb3BBY3Rpb25CZWdpbihhcmdzLCB0aGlzLl9kYXRhTW9kZWwgYXMgSUNoYXJ0TWFuYWdlckRhdGFNb2RlbCksXHJcbiAgICAgICAgICAgIHJvd0RyYWdTdG9wOiAoYXJncykgPT4gZHJhZ0Ryb3Aucm93RHJhZ1N0b3AoYXJncywgdGhpcy5fZGF0YU1vZGVsIGFzIElDaGFydE1hbmFnZXJEYXRhTW9kZWwpLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cmVlR3JpZEFjdGlvbkJlZ2luKGFyZ3MpIHtcclxuICAgICAgICAvLyBTdXBwb3J0IFwiRW50Zi9EZWxcIiBrZXlcclxuICAgICAgICBpZiAoYXJncy5yZXF1ZXN0VHlwZSA9PSBcImRlbGV0ZVwiKSB7XHJcbiAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKGFyZ3MuZGVsZXRlZEl0ZW1zWzBdLml0ZW0gaW5zdGFuY2VvZiBDaGFydE1hbmFnZXJDaGFydCkge1xyXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGNoYXJ0IGZyb20gZGF0YW1vZGVsXHJcbiAgICAgICAgICAgICAgICAoPGFueT50aGlzLl9kYXRhTW9kZWwpIS5yZW1vdmVDaGFydChhcmdzLmRlbGV0ZWRJdGVtc1swXS5pdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChhcmdzLmRlbGV0ZWRJdGVtc1swXS5pdGVtIGluc3RhbmNlb2YgQmFzZVNlcmllcykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoYXJ0OiBJQ2hhcnRNYW5hZ2VyQ2hhcnQgfCB1bmRlZmluZWQgPSBhcmdzLmRlbGV0ZWRJdGVtc1swXS5wYXJlbnRJdGVtLnBhcmVudEl0ZW0uaXRlbTtcclxuICAgICAgICAgICAgICAgIGlmIChjaGFydCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgc2VyaWUgZnJvbSBkYXRhbW9kZWxcclxuICAgICAgICAgICAgICAgICAgICAoPGFueT50aGlzLl9kYXRhTW9kZWwpIS5yZW1vdmVTZXJpZShjaGFydCwgYXJncy5kZWxldGVkSXRlbXNbMF0uaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoYXJncy5kZWxldGVkSXRlbXNbMF0uaXRlbSBpbnN0YW5jZW9mIFNjYWxlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCB8IHVuZGVmaW5lZCA9IGFyZ3MuZGVsZXRlZEl0ZW1zWzBdLnBhcmVudEl0ZW0uaXRlbTtcclxuICAgICAgICAgICAgICAgIGlmIChjaGFydCAhPSB1bmRlZmluZWQgJiYgY2hhcnQuY2FuUmVtb3ZlWUF4aXMoKSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHlBeGlzIGZyb20gZGF0YW1vZGVsXHJcbiAgICAgICAgICAgICAgICAgICAgKDxhbnk+dGhpcy5fZGF0YU1vZGVsKSEucmVtb3ZlWUF4aXMoY2hhcnQsIGFyZ3MuZGVsZXRlZEl0ZW1zWzBdLml0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHJlZUdyaWRBY3Rpb25Db21wbGV0ZShhcmdzKSB7XHJcbiAgICAgICAgLy8gRXZlbnQgdHJpZ2dlciB3aGlsZSBjaGFuZ2luZyBkYXRhc291cmNlIGR5bmFtaWNhbGx5LiBcclxuICAgICAgICAvLyBjb2RlIHRvIGRvbmUgYWZ0ZXIgdGhlIGR5bmFtaWMgY2hhbmdlIG9mIGRhdGFzb3VyY2UuIFxyXG4gICAgICAgIGlmIChhcmdzLnJlcXVlc3RUeXBlID09PSAncmVmcmVzaERhdGFTb3VyY2UnKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFNlbGVjdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlci5yZXNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlZnJlc2goKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucmVmcmVzaEVuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBkYXRhbW9kZWwgaW4gdHJlZWdyaWRcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0TW9kZWwodGhpcy5kYXRhTW9kZWwuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgZGF0YW1vZGVsIGluIHRvb2xiYXJcclxuICAgICAgICAgICAgICAgICh0aGlzLl90b29sYmFyIGFzIENoYXJ0TWFuYWdlclRyZWVHcmlkVG9vbGJhcikudXBkYXRlRGF0YU1vZGVsKHRoaXMuZGF0YU1vZGVsIGFzIElDaGFydE1hbmFnZXJEYXRhTW9kZWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmluZm8oXCJDaGFydE1hbmFnZXIgcmVmcmVzaCBlcnJvciEgPT4gVHJlZUdyaWQgcmVjcmVhdGlvbiFcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVHJlZUdyaWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWZyZXNoU2VsZWN0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IHRyZWVPYmogPSAkKHRoaXMubWFpbkRpdikuZWpUcmVlR3JpZCgnaW5zdGFuY2UnKTtcclxuXHJcbiAgICAgICAgLy8gR2V0IGFjdHVhbCBzZWxlY3Rpb24gaW5kZXhcclxuICAgICAgICBsZXQgYWN0dWFsU2VsZWN0ZWRSb3dJbmRleCA9IHRyZWVPYmoubW9kZWwuc2VsZWN0ZWRSb3dJbmRleDtcclxuICAgICAgICAvLyBSZXNldCBzZWxlY3Rpb25cclxuICAgICAgICB0cmVlT2JqLm1vZGVsLnNlbGVjdGVkUm93SW5kZXggPSAtMTtcclxuXHJcbiAgICAgICAgLy8gU2V0IHRvIGxhc3QgaW5kZXggaWYgaW5kZXggaXMgb3V0IG9mIHJhbmdlXHJcbiAgICAgICAgaWYgKGFjdHVhbFNlbGVjdGVkUm93SW5kZXggPj0gdHJlZU9iai5tb2RlbC5mbGF0UmVjb3Jkcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgYWN0dWFsU2VsZWN0ZWRSb3dJbmRleCA9IHRyZWVPYmoubW9kZWwuZmxhdFJlY29yZHMubGVuZ3RoIC0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gU2V0IHNlbGVjdGlvblxyXG4gICAgICAgIHRyZWVPYmoubW9kZWwuc2VsZWN0ZWRSb3dJbmRleCA9IGFjdHVhbFNlbGVjdGVkUm93SW5kZXg7XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZSB0b29sYmFyIGJ1dHRvbnNcclxuICAgICAgICBpZiAodHJlZU9iai5tb2RlbC5mbGF0UmVjb3Jkc1thY3R1YWxTZWxlY3RlZFJvd0luZGV4XSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVUb29sYmFyQnV0dG9uU3RhdGVzKHRyZWVPYmoubW9kZWwuZGF0YVNvdXJjZSwgdHJlZU9iai5tb2RlbC5mbGF0UmVjb3Jkc1thY3R1YWxTZWxlY3RlZFJvd0luZGV4XS5pdGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVUb29sYmFyQnV0dG9uU3RhdGVzKGNoYXJ0czogQXJyYXk8SUNoYXJ0TWFuYWdlckNoYXJ0Piwgc2VsZWN0ZWRJdGVtKSB7XHJcbiAgICAgICAgbGV0IHRvb2xiYXIgPSB0aGlzLl90b29sYmFyIGFzIENoYXJ0TWFuYWdlclRyZWVHcmlkVG9vbGJhcjtcclxuICAgICAgICBpZiAoY2hhcnRzLmxlbmd0aCA9PSAwIHx8IHNlbGVjdGVkSXRlbSA9PSB1bmRlZmluZWQgfHwgKHNlbGVjdGVkSXRlbSBpbnN0YW5jZW9mIFNjYWxlICYmIHNlbGVjdGVkSXRlbS5wYXJlbnQuY2FuUmVtb3ZlWUF4aXMoKSA9PSBmYWxzZSkpIHtcclxuICAgICAgICAgICAgdG9vbGJhci5kaXNhYmxlRGVsZXRlQnV0dG9uKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdG9vbGJhci5kaXNhYmxlRGVsZXRlQnV0dG9uKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCg8YW55PnRoaXMuX2RhdGFNb2RlbCkuY2FuQWRkQ2hhcnQoKSB8fCAoc2VsZWN0ZWRJdGVtIGluc3RhbmNlb2YgQ2hhcnRNYW5hZ2VyQ2hhcnQgJiYgc2VsZWN0ZWRJdGVtLmNhbkFkZFlBeGlzKCkpKSB7XHJcbiAgICAgICAgICAgIHRvb2xiYXIuZGlzYWJsZUFkZEJ1dHRvbihmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0b29sYmFyLmRpc2FibGVBZGRCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0b29sYmFyLnNldFNlbGVjdGVkQ2hhcnQoc2VsZWN0ZWRJdGVtKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipSZWdpb24gZHJvcCBzdXBwb3J0KioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhbGwgcG9zc2libGUgZHJvcExvY2F0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEJhc2VTZXJpZXM+fSBzZXJpZXNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGREcm9wTG9jYXRpb25zKHNlcmllczogQXJyYXk8QmFzZVNlcmllcz4pIHtcclxuICAgICAgICAvLyBBZGQgcG9zc2libGUgZHJvcCBsb2NhdGlvbnNcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGFsbCBkcm9wIGxvY2F0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEJhc2VTZXJpZXM+fSBzZXJpZXNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZW1vdmVEcm9wTG9jYXRpb25zKHNlcmllczogQXJyYXk8QmFzZVNlcmllcz4pIHtcclxuICAgICAgICB0aGlzLl9kYXRhTW9kZWwuZGF0YS5mb3JFYWNoKGNoYXJ0ID0+IHtcclxuICAgICAgICAgICAgY2hhcnQuZHJvcFBvc3NpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNoYXJ0LmNoaWxkcy5mb3JFYWNoKHlBeGlzID0+IHtcclxuICAgICAgICAgICAgICAgIHlBeGlzLmRyb3BQb3NzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYWdTdGFydChhcmdzOiBEcmFnRHJvcEFyZ3MpIHtcclxuICAgICAgICBsZXQgc2VyaWUgPSBhcmdzLmRhdGEgYXMgQXJyYXk8QmFzZVNlcmllcz47XHJcblxyXG4gICAgICAgIC8vIEFkZCBwb3NzaWJsZSBkcm9wTG9jYXRpb25zXHJcbiAgICAgICAgdGhpcy5hZGREcm9wTG9jYXRpb25zKHNlcmllKTtcclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHRyZWVHcmlkXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhZ1N0b3AoYXJnczogRHJhZ0Ryb3BBcmdzKSB7XHJcbiAgICAgICAgbGV0IHNlcmllID0gYXJncy5kYXRhIGFzIEFycmF5PEJhc2VTZXJpZXM+O1xyXG5cclxuICAgICAgICAvLyBSZW1vdmUgcG9zc2libGUgZHJvcExvY2F0aW9uc1xyXG4gICAgICAgIHRoaXMucmVtb3ZlRHJvcExvY2F0aW9ucyhzZXJpZSk7XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSB0cmVlR3JpZFxyXG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYWdPdmVyKGFyZ3M6IERyYWdEcm9wQXJncyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBzZXJpZXMgPSBhcmdzLmRhdGEgYXMgQXJyYXk8QmFzZVNlcmllcz47XHJcblxyXG4gICAgICAgIGxldCBkcm9wUG9zc2libGUgPSBmYWxzZTtcclxuICAgICAgICBsZXQgY2hhcnQgPSB0aGlzLmdldENoYXJ0RnJvbURyYWdMb2NhdGlvbihhcmdzLmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgIGxldCB5QXhpcyA9IHRoaXMuZ2V0WUF4aXNGcm9tRHJhZ0xvY2F0aW9uKGFyZ3MuY3VycmVudFRhcmdldCk7XHJcbiAgICAgICAgbGV0IGltYWdlUHJvdmlkZXIgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uSW1hZ2VQcm92aWRlcklkKSBhcyBJSW1hZ2VQcm92aWRlcjtcclxuICAgICAgICBpZiAoY2hhcnQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFydC5kcm9wUG9zc2libGUgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgZHJvcFBvc3NpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmIChhcmdzLmRyYWdEcm9wUmVwcmVzZW50YXRpb24gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFkZE5ld1NjYWxlSW1hZ2UgPSBpbWFnZVByb3ZpZGVyLmdldEltYWdlKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9hZGROZXdTY2FsZS5zdmdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJncy5kcmFnRHJvcFJlcHJlc2VudGF0aW9uLmljb25MaXN0LnB1c2goYWRkTmV3U2NhbGVJbWFnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VyaWVzWzBdLnR5cGUgPT09IFNlcmllc1R5cGUudGltZVNlcmllcyAmJiBjaGFydC5jaGFydFR5cGUgPT0gQ2hhcnRUeXBlLkZGVENoYXJ0ICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLmRyYWdEcm9wUmVwcmVzZW50YXRpb24udGV4dExpc3RbMF0gPSBcIkNhbGN1bGF0ZSBGRlQgc2lnbmFsIGFuZCBhZGQgaXQgdG8gbmV3IHNjYWxlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLmRyYWdEcm9wUmVwcmVzZW50YXRpb24udGV4dExpc3RbMF0gPSBcIkNyZWF0ZSBhIG5ldyBzY2FsZSBhbmQgYWRkIGRyYWdnZWQgc2lnbmFsc1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh5QXhpcyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYgKHlBeGlzLmRyb3BQb3NzaWJsZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBkcm9wUG9zc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3MuZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbiAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYWRkTmV3U2NhbGVJbWFnZTtcclxuICAgICAgICAgICAgICAgICAgICAvL1hZIGNoYXJ0IGV4Y2VwdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh5QXhpcy5wYXJlbnQuY2hhcnRUeXBlID09IENoYXJ0VHlwZS5YWUNoYXJ0KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkTmV3U2NhbGVJbWFnZSA9IGltYWdlUHJvdmlkZXIuZ2V0SW1hZ2UoXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2RyYWdEcm9wL2Fzc2lnblRvQ2hhcnQuc3ZnXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZXJpZXNbMF0udHlwZSA9PSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MuZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbi50ZXh0TGlzdFswXSA9IFwiQ2FsY3VsYXRlIFhZIHNpZ25hbCBhbmQgYWRkIGl0IHRvIHRoZSBjaGFydFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5kcmFnRHJvcFJlcHJlc2VudGF0aW9uLnRleHRMaXN0WzBdID0gXCJBZGQgZHJhZ2dlZCBzaWduYWxzIHRvIGNoYXJ0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh5QXhpcy5wYXJlbnQuY2hhcnRUeXBlID09IENoYXJ0VHlwZS5GRlRDaGFydCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGROZXdTY2FsZUltYWdlID0gaW1hZ2VQcm92aWRlci5nZXRJbWFnZShcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3AvYXNzaWduVG9TY2FsZS5zdmdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MuZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbi50ZXh0TGlzdFswXSA9IFwiQ2FsY3VsYXRlIEZGVCBzaWduYWwgYW5kIGFkZCBpdCB0byBzY2FsZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkTmV3U2NhbGVJbWFnZSA9IGltYWdlUHJvdmlkZXIuZ2V0SW1hZ2UoXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2RyYWdEcm9wL2Fzc2lnblRvU2NhbGUuc3ZnXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLmRyYWdEcm9wUmVwcmVzZW50YXRpb24udGV4dExpc3RbMF0gPSBcIkFkZCBkcmFnZ2VkIHNpZ25hbHMgdG8gc2NhbGVcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYXJncy5kcmFnRHJvcFJlcHJlc2VudGF0aW9uLmljb25MaXN0LnB1c2goYWRkTmV3U2NhbGVJbWFnZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5oaWdobGlnaHREcm9wcGFibGVBcmVhcyhjaGFydCwgeUF4aXMsIGFyZ3MuY3VycmVudFRhcmdldCk7XHJcbiAgICAgICAgcmV0dXJuIGRyb3BQb3NzaWJsZTtcclxuICAgIH1cclxuXHJcbiAgICBkcm9wKGFyZ3M6IERyYWdEcm9wQXJncykge1xyXG4gICAgICAgIGxldCBzZXJpZXMgPSBhcmdzLmRhdGEgYXMgQXJyYXk8QmFzZVNlcmllcz47XHJcblxyXG4gICAgICAgIGxldCBjaGFydCA9IHRoaXMuZ2V0Q2hhcnRGcm9tRHJhZ0xvY2F0aW9uKGFyZ3MuY3VycmVudFRhcmdldCk7XHJcbiAgICAgICAgbGV0IHlBeGlzID0gdGhpcy5nZXRZQXhpc0Zyb21EcmFnTG9jYXRpb24oYXJncy5jdXJyZW50VGFyZ2V0KTtcclxuXHJcbiAgICAgICAgaWYgKHlBeGlzICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjaGFydCA9IHlBeGlzLnBhcmVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VyaWVzID0gU2VyaWVDaGFydFR5cGVIZWxwZXIuZ2V0RHJvcHBhYmxlU2VyaWVzKGNoYXJ0IS5nZXRBbGxTZXJpZXMoKSxzZXJpZXMpO1xyXG5cclxuICAgICAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgICAgICAgY2hhcnQ6IGNoYXJ0LFxyXG4gICAgICAgICAgICB5QXhpczogeUF4aXMsXHJcbiAgICAgICAgICAgIHNlcmllczogc2VyaWVzXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3JhaXNlIGV2ZW50IHRvIHRyYWNlVmlld1dpZGdldFxyXG4gICAgICAgIGlmIChzZXJpZXNbMF0udHlwZSA9PSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMgJiYgY2hhcnQhLmNoYXJ0VHlwZSA9PSBDaGFydFR5cGUuWFlDaGFydCkge1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50RHJvcEhlbHBlci5yYWlzZSh0aGlzLmRhdGFNb2RlbCwge2hpbnQ6IENoYXJ0RHJvcEhlbHBlckNoYW5nZWRIaW50LmNyZWF0ZVhZU2VyaWUsIGRhdGE6IGRhdGEgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHNlcmllc1swXS50eXBlID09IFNlcmllc1R5cGUudGltZVNlcmllcyAmJiBjaGFydCEuY2hhcnRUeXBlID09IENoYXJ0VHlwZS5GRlRDaGFydCl7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnREcm9wSGVscGVyLnJhaXNlKHRoaXMuZGF0YU1vZGVsLCB7aGludDogQ2hhcnREcm9wSGVscGVyQ2hhbmdlZEhpbnQuY3JlYXRlRkZUU2VyaWUsIGRhdGE6IGRhdGEgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50RHJvcEhlbHBlci5yYWlzZSh0aGlzLmRhdGFNb2RlbCwge2hpbnQ6IENoYXJ0RHJvcEhlbHBlckNoYW5nZWRIaW50LmFkZFNlcmllLCBkYXRhOiBkYXRhIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlc2V0SGlnaGxpZ2h0QXJlYSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Q2hhcnRGcm9tRHJhZ0xvY2F0aW9uKGN1cnJlbnRUYXJnZXQpOiBJQ2hhcnRNYW5hZ2VyQ2hhcnQgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGxldCBjbGFzc2VzID0gY3VycmVudFRhcmdldC5jbGFzc0xpc3QudmFsdWU7XHJcbiAgICAgICAgLy9hdm9pZCBkcm9wcGluZyBzZXJpZSBpbiBub3QgaGlnaGxpZ2h0ZWQgYXJlYVxyXG4gICAgICAgIGlmICghY2xhc3Nlcy5pbmNsdWRlcygnZS10ZW1wbGF0ZWNlbGwnKSAmJiBjbGFzc2VzLmluY2x1ZGVzKCdlLXJvd2NlbGwnKSB8fCBjbGFzc2VzLmluY2x1ZGVzKCdlLWhlYWRlcmNlbGwnKSB8fCBjdXJyZW50VGFyZ2V0LmxvY2FsTmFtZSA9PSAnc3BhbicpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByZWNvcmQgPSB0aGlzLmdldFRyZWVSZWNvcmQoY3VycmVudFRhcmdldCk7XHJcbiAgICAgICAgaWYgKHJlY29yZCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYgKHJlY29yZC5pdGVtIGluc3RhbmNlb2YgQ2hhcnRNYW5hZ2VyQ2hhcnQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWNvcmQuaXRlbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0WUF4aXNGcm9tRHJhZ0xvY2F0aW9uKGN1cnJlbnRUYXJnZXQpOiBTY2FsZSB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgbGV0IGNsYXNzZXMgPSBjdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC52YWx1ZTtcclxuICAgICAgICAvL2F2b2lkIGRyb3BwaW5nIHNlcmllIGluIG5vdCBoaWdobGlnaHRlZCBhcmVhXHJcbiAgICAgICAgaWYgKCFjbGFzc2VzLmluY2x1ZGVzKCdlLXRlbXBsYXRlY2VsbCcpICYmIGNsYXNzZXMuaW5jbHVkZXMoJ2Utcm93Y2VsbCcpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcmVjb3JkID0gdGhpcy5nZXRUcmVlUmVjb3JkKGN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgIGlmIChyZWNvcmQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGlmIChyZWNvcmQuaXRlbSBpbnN0YW5jZW9mIFNjYWxlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVjb3JkLml0ZW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBjb2x1bW4gdGVtcGxhdGUgaW5mb3JtYXRpb25zXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9XHJcblx0ICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG4gICAgcHJpdmF0ZSBnZXRDb2x1bW5UZW1wbGF0ZURhdGEoY29sdW1uSWQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKGNvbHVtbklkID09IENoYXJ0TWFuYWdlcldpZGdldC5uYW1lQ29sdW1uSWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGA8c2NyaXB0IHR5cGU9XCJ0ZXh0L3gtanNyZW5kZXJcIiBpZD1cImNtTmFtZUNvbHVtblRlbXBsYXRlXCI+XHJcblx0XHRcdCAgICAgICAgICAgIDxkaXYgc3R5bGU9J2hlaWdodDoyMHB4OycgdW5zZWxlY3RhYmxlPSdvbic+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e2lmICF+Z2V0c3RhdGUoKX19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nZS1kcmFnaW50ZW5kJyBzdHlsZT0naGVpZ2h0OjFweDsgZmxvYXQ6bGVmdDsgd2lkdGg6MTRweDsgZGlzcGxheTppbmxpbmUtYmxvY2s7Jz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz17ezp+X3N0YWdlTmFtZSgpfX0gc3R5bGU9J3dpZHRoOjI0cHg7Jz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSdlLWFib3ZlSWNvbiBlLWljb25NYXJnaW4gZS1pY29uJyBzdHlsZT0ncG9zaXRpb246cmVsYXRpdmU7ZmxvYXQ6cmlnaHQ7ZGlzcGxheTpub25lOyc+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9J2UtYmVsb3dJY29uIGUtaWNvbk1hcmdpbiBlLWljb24nIHN0eWxlPSdwb3NpdGlvbjpyZWxhdGl2ZTtmbG9hdDpyaWdodDtkaXNwbGF5Om5vbmU7Jz48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0nZS1jaGlsZEljb24gZS1pY29uTWFyZ2luIGUtaWNvbicgc3R5bGU9J3Bvc2l0aW9uOnJlbGF0aXZlO2Zsb2F0OnJpZ2h0O2Rpc3BsYXk6bm9uZTsnPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSdlLWNhbmNlbEljb24gZS1pY29uTWFyZ2luIGUtaWNvbicgc3R5bGU9J3Bvc2l0aW9uOnJlbGF0aXZlO2Zsb2F0OnJpZ2h0O2Rpc3BsYXk6bm9uZTsnPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e2Vsc2UgfmdldHN0YXRlKCl9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2UtaW50ZW5kcGFyZW50Jz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz17ezp+X3N0YWdlTmFtZSgpfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0nZS1hYm92ZUljb24gZS1pY29uTWFyZ2luIGUtaWNvbicgc3R5bGU9J3Bvc2l0aW9uOnJlbGF0aXZlO2Zsb2F0OmxlZnQ7ZGlzcGxheTpub25lOyc+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9J2UtYmVsb3dJY29uIGUtaWNvbk1hcmdpbiBlLWljb24nIHN0eWxlPSdwb3NpdGlvbjpyZWxhdGl2ZTtmbG9hdDpsZWZ0O2Rpc3BsYXk6bm9uZTsnPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSdlLWNoaWxkSWNvbiBlLWljb25NYXJnaW4gZS1pY29uJyBzdHlsZT0ncG9zaXRpb246cmVsYXRpdmU7ZmxvYXQ6bGVmdDtkaXNwbGF5Om5vbmU7Jz48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0nZS1jYW5jZWxJY29uIGUtaWNvbk1hcmdpbiBlLWljb24nIHN0eWxlPSdwb3NpdGlvbjpyZWxhdGl2ZTtmbG9hdDpsZWZ0O2Rpc3BsYXk6bm9uZTsnPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ey9pZn19XHJcbiAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3s6I2RhdGFbJ2ljb25EZWZpbml0aW9uJ119fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nZS1jZWxsJyBzdHlsZT0nZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6MTAwJScgdW5zZWxlY3RhYmxlPSdvbic+e3s6I2RhdGFbJ25hbWUnXX19PC9kaXY+XHJcblx0XHRcdCAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc2NyaXB0PmA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0U2NyaXB0Rm9yRHJhZ0Ryb3BUZW1wbGF0ZUhlbHBlcnMoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gYDxzY3JpcHQgdHlwZT1cInRleHQvamF2YXNjcmlwdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICQudmlld3MuaGVscGVycyh7IF9zdGFnZU5hbWU6IGdldFN0YWdlTmFtZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAkLnZpZXdzLmhlbHBlcnMoeyBnZXRzdGF0ZTogX2dldFN0YXRlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICQudmlld3MuaGVscGVycyh7IGlzR3JvdXA6IF9pc0dyb3VwIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIF9nZXRTdGF0ZSgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5wYXJlbnRJdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIF9pc0dyb3VwKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRhLmlzR3JvdXApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gZ2V0U3RhZ2VOYW1lKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm93Q2xhc3MgPSBcImdyaWRyb3dJbmRleFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJveHkgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3dDbGFzcyArPSBwcm94eS5kYXRhLmluZGV4LnRvU3RyaW5nKCkgKyBcImxldmVsXCIgKyBwcm94eS5kYXRhLmxldmVsLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByb3dDbGFzcztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgPC9zY3JpcHQ+YDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7RHJhZ0Ryb3BBcmdzfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkcm9wRm9jdXNMb3N0KGFyZ3M6IERyYWdEcm9wQXJncykge1xyXG4gICAgICAgIHRoaXMucmVzZXRIaWdobGlnaHRBcmVhKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGlnaGxpZ2h0IHJvd3Mgd2hlcmUgc2lnbmFsIGlzIGRyYWdnZWQgb3ZlciBhbmQgcG9zc2libGUgdG8gYmUgZHJvcHBlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyhJQ2hhcnRNYW5hZ2VyQ2hhcnQgfCB1bmRlZmluZWQpfSBjaGFydE1hbmFnZXJDaGFydFxyXG4gICAgICogQHBhcmFtIHsoU2NhbGUgfCB1bmRlZmluZWQpfSB5QXhpc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGhpZ2hsaWdodERyb3BwYWJsZUFyZWFzKGNoYXJ0TWFuYWdlckNoYXJ0OiBJQ2hhcnRNYW5hZ2VyQ2hhcnQgfCB1bmRlZmluZWQsIHlBeGlzOiBTY2FsZSB8IHVuZGVmaW5lZCwgY3VycmVudFRhcmdldCl7XHJcbiAgICAgICAgaWYgKGNoYXJ0TWFuYWdlckNoYXJ0ICE9IHVuZGVmaW5lZCAmJiBjaGFydE1hbmFnZXJDaGFydC5kcm9wUG9zc2libGUpIHtcclxuICAgICAgICAgICAgbGV0IGFyZWEgPSB0aGlzLmdldEFyZWFUb0Zyb21DdXJyZW50VGFyZ2V0KGN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZEhpZ2hsaWdodGVkQXJlYShhcmVhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoeUF4aXMgIT0gdW5kZWZpbmVkICYmIHlBeGlzLmRyb3BQb3NzaWJsZSkge1xyXG4gICAgICAgICAgICBsZXQgYXJlYSA9IHRoaXMuZ2V0QXJlYVRvRnJvbUN1cnJlbnRUYXJnZXQoY3VycmVudFRhcmdldCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkSGlnaGxpZ2h0ZWRBcmVhKGFyZWEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0SGlnaGxpZ2h0QXJlYSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFkZEhpZ2hsaWdodGVkQXJlYShhcmVhKSB7XHJcblx0XHRsZXQgaGlnaGxpZ2h0RWxlbSA9ICQoJzxkaXYgaWQ9XCInKyB0aGlzLmhpZ2hsaWdodEFyZWFJZCArJ1wiIHN0eWxlPVwiIHBvaW50ZXItZXZlbnRzOm5vbmU7IHBvc2l0aW9uOmFic29sdXRlOyBcIiBjbGFzcz1cImRyYWdnZWRPdmVyXCI+PC9kaXY+Jyk7XHJcblx0XHR0aGlzLnJlc2V0SGlnaGxpZ2h0QXJlYShoaWdobGlnaHRFbGVtKTtcclxuXHRcdCQoYXJlYSkuYXBwZW5kKGhpZ2hsaWdodEVsZW0pO1xyXG5cclxuXHRcdGhpZ2hsaWdodEVsZW0uY3NzKCd0b3AnLCBhcmVhLm9mZnNldFRvcCk7XHJcblx0XHRoaWdobGlnaHRFbGVtLmNzcygnbGVmdCcsIGFyZWEub2Zmc2V0TGVmdCk7XHJcblx0XHRoaWdobGlnaHRFbGVtLmNzcygnaGVpZ2h0JywgYXJlYS5vZmZzZXRIZWlnaHQpO1xyXG5cdFx0aGlnaGxpZ2h0RWxlbS5jc3MoJ3dpZHRoJywgYXJlYS5vZmZzZXRXaWR0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRBcmVhVG9Gcm9tQ3VycmVudFRhcmdldChjdXJyZW50VGFyZ2V0KSB7XHJcbiAgICAgICAgbGV0IGNsYXNzZXMgPSBjdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC52YWx1ZTtcclxuICAgICAgICBpZiAoY2xhc3Nlcy5pbmNsdWRlcygnZS1yb3djZWxsJykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRUYXJnZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBcmVhVG9Gcm9tQ3VycmVudFRhcmdldChjdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc2V0IGFsbCBoaWdobGlnaHRlZCBhcmVzIGluIGNoYXJ0TWFuYWdlciBleGNlcHQgdGhlIGNlbGwgYmVpbmcgZHJhZ2dlZE92ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtKUXVlcnk8SFRNTEVsZW1lbnQ+fSBbZWxlbWVudF1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZXNldEhpZ2hsaWdodEFyZWEgKGVsZW1lbnQ/OiBKUXVlcnk8SFRNTEVsZW1lbnQ+KSB7XHJcblx0XHRsZXQgaGlnaGxpZ2h0RWxlbSA9ICQoJyMnICsgdGhpcy5oaWdobGlnaHRBcmVhSWQpO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBoaWdobGlnaHRFbGVtLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0aWYgKGVsZW1lbnQgPT0gdW5kZWZpbmVkIHx8IGhpZ2hsaWdodEVsZW1baV0gIT0gZWxlbWVudFswXSkge1xyXG5cdFx0XHRcdGhpZ2hsaWdodEVsZW1baV0ucmVtb3ZlKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuICAgIH1cclxuICAgIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKkVuZCByZWdpb24gZHJvcCBzdXBwb3J0KioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG59XHJcblxyXG5leHBvcnQgeyBDaGFydE1hbmFnZXJXaWRnZXR9OyJdfQ==