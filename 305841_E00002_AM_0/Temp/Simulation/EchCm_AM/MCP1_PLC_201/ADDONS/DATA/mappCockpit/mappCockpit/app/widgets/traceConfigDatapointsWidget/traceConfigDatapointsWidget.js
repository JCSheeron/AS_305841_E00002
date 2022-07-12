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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "../common/treeGridWidgetBase", "./view/traceConfigDatapointsTreeGridToolbar", "../../view/datapointDialog/datapointDialog", "../../view/datapointDialog/eventDatapointArgs", "../../models/diagnostics/trace/traceDataPoint", "./view/traceConfigDatapointsTreeGridCellEditEvents", "./model/traceConfigDatapointsDataModel", "./componentDefaultDefinition"], function (require, exports, treeGridWidgetBase_1, traceConfigDatapointsTreeGridToolbar_1, datapointDialog_1, eventDatapointArgs_1, traceDataPoint_1, traceConfigDatapointsTreeGridCellEditEvents_1, traceConfigDatapointsDataModel_1, componentDefaultDefinition_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implements the TraceConfigDatapointsWidget
     *
     * @class TraceConfigDatapointsWidget
     * @extends {TreeGridWidgetBase}
     */
    var TraceConfigDatapointsWidget = /** @class */ (function (_super) {
        __extends(TraceConfigDatapointsWidget, _super);
        function TraceConfigDatapointsWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._addDataPointHandler = function (sender, args) { return _this.onAddDatapoint(sender, args); };
            _this._dialogClosedHandler = function (sender, args) { return _this.onDialogClosed(sender, args); };
            _this._availableTraceDataPoints = new Array();
            return _this;
        }
        /**
         * Defines the height of the header
         *
         * @returns {number}
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.defineHeaderHeight = function () {
            return 30;
        };
        TraceConfigDatapointsWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
            this.component.disablePersisting();
        };
        TraceConfigDatapointsWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            _super.prototype.setHeaderContent.call(this, "Data points");
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 3, 250);
        };
        /**
         * Updates and initializes the trace data points
         *
         * @private
         * @param {TraceDataPoint[]} traceDataPoints
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.initializeTraceDataPoints = function (traceDataPoints) {
            var traceConfigDatapointsDataModel = new traceConfigDatapointsDataModel_1.TraceConfigDatapointsDataModel();
            traceConfigDatapointsDataModel.initialize();
            this.dataModel = traceConfigDatapointsDataModel;
            traceConfigDatapointsDataModel.initData = traceDataPoints;
            this.updateToolbar();
        };
        /**
         * implements the model change handling
         *
         * @param {IDataModel} sender
         * @param {EventModelChangedArgs} data
         * @returns {*}
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.handleModelChanged = function (sender, eventArgs) {
            var dataPoints = eventArgs.data;
            this.refreshDatapointsValues(dataPoints);
            this.updateToolbarButtonStates(dataPoints);
        };
        /**
         * handles the changes of observed items requested by 'observeDataModelItems'
         *
         * @param {IDataModel} sender
         * @param {EventModelChangedArgs} data
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.handleModelItemsChanged = function (sender, eventArgs) {
            var dataPoints = this.dataModel.data;
            this.updateToolbarButtonStates(dataPoints);
            this.refreshDatapointsValues(dataPoints);
        };
        /** creates the datapoint selection dialog
         *
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.createDatapointsDialog = function () {
            var datapointDialogId = "datapointDialog";
            $(this.mainDiv).append("<div id='" + datapointDialogId + "'><div id='datapointContentRoot'></></>");
            datapointDialog_1.DatapointDialog.initialize(datapointDialogId);
        };
        /** catches the add datapoint event from the datapoint dialog
         * => adds or replaces the selected datapoint with the datapoint from the datapoint dialog
         *
         * @param {} sender
         * @param {EventDatapointArgs} args
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.onAddDatapoint = function (sender, args) {
            var treeGridObj = this.getTreeGridObject();
            var actualSelectionIndex = treeGridObj.model.selectedRowIndex;
            if (actualSelectionIndex == undefined) {
                actualSelectionIndex = -1;
            }
            var dataPoint = traceDataPoint_1.TraceDataPoint.createWithDataPointInfo(args.dataPointInfo);
            var tcDataPointDataModel = this._dataModel;
            if (args.action == eventDatapointArgs_1.DatapointAction.add) {
                tcDataPointDataModel.addDatapoint(actualSelectionIndex, dataPoint);
            }
            else if (args.action == eventDatapointArgs_1.DatapointAction.replace) {
                tcDataPointDataModel.replaceDatapoint(actualSelectionIndex, dataPoint, true);
            }
        };
        /** catches the dialog close event from the datapoint dialog
         * => detaches the dialog events
         *
         * @param {} sender
         * @param {} args
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.onDialogClosed = function (sender, args) {
            datapointDialog_1.DatapointDialog.eventAddDatapoint.detach(this._addDataPointHandler);
            datapointDialog_1.DatapointDialog.eventDialogClosed.detach(this._dialogClosedHandler);
        };
        /** creates the tree grid for the datapoint informations
         *
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.createTreeGrid = function () {
            var _this = this;
            this.createDatapointsDialog();
            $(this.mainDiv).ejTreeGrid(__assign(__assign(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridColumnResizeSupport()), this.getTreeGridToolbarSupport()), this.getTreeGridCellEditSupport()), { selectionType: ej.TreeGrid.SelectionType.Multiple, editSettings: { allowEditing: true }, rowSelected: function (args) { return _this.treeGridRowSelected(args); }, actionBegin: function (args) { return _this.treeGridActionBegin(args); }, create: function (args) { return _this.treeGridCreated(); } }));
        };
        /**
         * Returns the tree grid column definition
         *
         * @private
         * @returns {{}}
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.getTreeGridColumnDefinition = function () {
            return {
                columns: [
                    { field: "dataPointName", headerText: "Data point", width: "350" },
                    { field: "componentName", headerText: "Component" },
                    { field: "name", headerText: "Name" },
                    { field: "description", headerText: "Description", width: "250" },
                ],
            };
        };
        /**
         * Returns the tree grid column resize settings
         *
         * @private
         * @returns {{}}
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.getTreeGridColumnResizeSupport = function () {
            var _this = this;
            return {
                allowColumnResize: true,
                columnResizeSettings: { columnResizeMode: ej.TreeGrid.ColumnResizeMode.FixedColumns },
                columnResized: function (args) { return _super.prototype.resizeDynamicColumn.call(_this, args.columnIndex, args.model); },
            };
        };
        /**
         * Returns the tree grid toolbar settings
         *
         * @private
         * @returns {{}}
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.getTreeGridToolbarSupport = function () {
            this._toolbar = new traceConfigDatapointsTreeGridToolbar_1.TraceConfigDatapointsTreeGridToolbar(this.mainDiv);
            return _super.prototype.getTreeGridToolbarSupport.call(this);
        };
        /**
         * Returns the tree grid cell edit settings
         *
         * @private
         * @returns {{}}
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.getTreeGridCellEditSupport = function () {
            var _this = this;
            var cellEditEvents = new traceConfigDatapointsTreeGridCellEditEvents_1.TraceConfigDatapointsTreeGridCellEditEvents();
            return {
                beginEdit: function (args) { return cellEditEvents.beginEdit(args); },
                endEdit: function (args) { return cellEditEvents.endEdit(args, _this._dataModel, _this._availableTraceDataPoints); },
            };
        };
        TraceConfigDatapointsWidget.prototype.treeGridActionBegin = function (args) {
            // Support "Entf/Del" key
            if (args.requestType == "delete") {
                args.cancel = true;
                this.deleteDataPoints(args);
            }
        };
        TraceConfigDatapointsWidget.prototype.treeGridRowSelected = function (args) {
            if (args.model.selectedItem != undefined) {
                this._toolbar.disableRemoveButton(false);
            }
            else {
                this._toolbar.disableRemoveButton(true);
            }
        };
        TraceConfigDatapointsWidget.prototype.deleteDataPoints = function (args) {
            var indexList = new Array();
            for (var i = args.deletedItems.length - 1; i >= 0; i--) {
                indexList.push(args.deletedItems[i].index);
            }
            if (indexList.length > 0) {
                this._dataModel.removeDatapoints(indexList);
                var treeGridObj = this.getTreeGridObject();
                var newSelectionIndex = indexList[indexList.length - 1];
                if (newSelectionIndex >= args.model.parentRecords.length) {
                    newSelectionIndex = args.model.parentRecords.length - 1;
                }
                treeGridObj.option("selectedRowIndex", newSelectionIndex, true);
            }
        };
        /**
         * opens the datapoint selection dialog and attaches to the dialog events
         *
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.openDatapointDialog = function () {
            datapointDialog_1.DatapointDialog.eventAddDatapoint.attach(this._addDataPointHandler);
            datapointDialog_1.DatapointDialog.eventDialogClosed.attach(this._dialogClosedHandler);
            datapointDialog_1.DatapointDialog.open();
        };
        /**
         * updates the toolbar corresponding to the current data selection
         *
         * @private
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.updateToolbar = function () {
            // Update toolbar buttons => show/hide add datapoints toolbar button
            var dataPoints = this._dataModel.data;
            this.updateToolbarButtonStates(dataPoints);
        };
        /**
         * Initializes and updates the available trace data points
         *
         * @private
         * @param {TraceDataPointInfo[]} availableTraceDataPoints
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.initializeAvailableDataPoints = function (availableTraceDataPoints) {
            this._availableTraceDataPoints = availableTraceDataPoints;
            datapointDialog_1.DatapointDialog.setDatapoints(this._availableTraceDataPoints);
            this.updateToolbar();
        };
        /**
         * refreshes the content of the datapoints parameters value fields
         *
         * @private
         * @param {Datapoint[]} datapoints
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.refreshDatapointsValues = function (datapoints) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    try {
                        this.setModelWithEditSupport(datapoints);
                    }
                    catch (e) {
                        console.log(e);
                    }
                    return [2 /*return*/];
                });
            });
        };
        TraceConfigDatapointsWidget.prototype.updateToolbarButtonStates = function (dataPoints) {
            var selectedItem = undefined;
            var treeObj = this.getTreeGridObject();
            if (treeObj != undefined) {
                selectedItem = treeObj.model.selectedItem;
            }
            var dataPointsLength = 0;
            if (dataPoints != undefined) {
                dataPointsLength = dataPoints.length;
            }
            var toolbar = this._toolbar;
            if (dataPointsLength > 31) {
                toolbar.disableAddButton(true);
                toolbar.disableAddEmptyButton(true);
            }
            else {
                if (this._availableTraceDataPoints.length == 0) {
                    toolbar.disableAddButton(true);
                }
                else {
                    toolbar.disableAddButton(false);
                }
                toolbar.disableAddEmptyButton(false);
            }
            if (dataPointsLength == 0 || selectedItem == undefined) {
                toolbar.disableRemoveButton(true);
            }
            else {
                toolbar.disableRemoveButton(false);
            }
        };
        return TraceConfigDatapointsWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.TraceConfigDatapointsWidget = TraceConfigDatapointsWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldC90cmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBYUE7Ozs7O09BS0c7SUFDSDtRQUEwQywrQ0FBa0I7UUFBNUQ7WUFBQSxxRUFnVUM7WUE5VFcsMEJBQW9CLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEVBQWhDLENBQWdDLENBQUM7WUFDdkUsMEJBQW9CLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEVBQWhDLENBQWdDLENBQUM7WUFFdkUsK0JBQXlCLEdBQXlCLElBQUksS0FBSyxFQUFzQixDQUFDOztRQTJUOUYsQ0FBQztRQXpURzs7Ozs7V0FLRztRQUNILHdEQUFrQixHQUFsQjtZQUNJLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQztRQUVELHlEQUFtQixHQUFuQjtZQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsSUFBSSx1REFBMEIsRUFBRSxDQUFDLENBQUM7WUFDdEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3ZDLENBQUM7UUFFRCxpREFBVyxHQUFYO1lBQ0ksaUJBQU0sV0FBVyxXQUFFLENBQUM7WUFFcEIsaUJBQU0sZ0JBQWdCLFlBQUMsYUFBYSxDQUFDLENBQUM7WUFFdEMsOEJBQThCO1lBQzlCLGlCQUFNLGdCQUFnQixZQUFDLENBQUMsRUFBRSxH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VSxDQUFDLE1BQU0sQ0FBQzthQUN4QztZQUVELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFnRCxDQUFDO1lBQ3BFLElBQUcsZ0JBQWdCLEdBQUcsRUFBRSxFQUFDO2dCQUNyQixPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQy9CLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN2QztpQkFDRztnQkFDQSxJQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFDO29CQUMxQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ2xDO3FCQUNHO29CQUNBLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDbkM7Z0JBQ0QsT0FBTyxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3hDO1lBQ0QsSUFBRyxnQkFBZ0IsSUFBSSxDQUFDLElBQUksWUFBWSxJQUFJLFNBQVMsRUFBRTtnQkFDbkQsT0FBTyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3JDO2lCQUNHO2dCQUNBLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN0QztRQUNMLENBQUM7UUFDTCxrQ0FBQztJQUFELENBQUMsQUFoVUQsQ0FBMEMsdUNBQWtCLEdBZ1UzRDtJQUVRLGtFQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElUcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL3RyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUcmVlR3JpZFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3RyZWVHcmlkV2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBJRGF0YU1vZGVsLCBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUcmFjZUNvbmZpZ0RhdGFwb2ludHNUcmVlR3JpZFRvb2xiYXIgfSBmcm9tIFwiLi92aWV3L3RyYWNlQ29uZmlnRGF0YXBvaW50c1RyZWVHcmlkVG9vbGJhclwiO1xyXG5pbXBvcnQgeyBEYXRhcG9pbnREaWFsb2cgfSBmcm9tIFwiLi4vLi4vdmlldy9kYXRhcG9pbnREaWFsb2cvZGF0YXBvaW50RGlhbG9nXCI7XHJcbmltcG9ydCB7IEV2ZW50RGF0YXBvaW50QXJncywgRGF0YXBvaW50QWN0aW9uIH0gZnJvbSBcIi4uLy4uL3ZpZXcvZGF0YXBvaW50RGlhbG9nL2V2ZW50RGF0YXBvaW50QXJnc1wiO1xyXG5pbXBvcnQgeyBUcmFjZURhdGFQb2ludH0gZnJvbSBcIi4uLy4uL21vZGVscy9kaWFnbm9zdGljcy90cmFjZS90cmFjZURhdGFQb2ludFwiO1xyXG5pbXBvcnQgeyBUcmFjZURhdGFQb2ludEluZm8gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RpYWdub3N0aWNzL3RyYWNlL3RyYWNlRGF0YVBvaW50SW5mb1wiO1xyXG5pbXBvcnQgeyBUcmFjZUNvbmZpZ0RhdGFwb2ludHNUcmVlR3JpZENlbGxFZGl0RXZlbnRzIH0gZnJvbSBcIi4vdmlldy90cmFjZUNvbmZpZ0RhdGFwb2ludHNUcmVlR3JpZENlbGxFZGl0RXZlbnRzXCI7XHJcbmltcG9ydCB7IFRyYWNlQ29uZmlnRGF0YXBvaW50c0RhdGFNb2RlbCB9IGZyb20gXCIuL21vZGVsL3RyYWNlQ29uZmlnRGF0YXBvaW50c0RhdGFNb2RlbFwiO1xyXG5pbXBvcnQgeyBJVHJhY2VDb25maWdEYXRhcG9pbnRzRGF0YU1vZGVsIH0gZnJvbSBcIi4vbW9kZWwvdHJhY2VDb25maWdEYXRhcG9pbnRzRGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uIH0gZnJvbSBcIi4vY29tcG9uZW50RGVmYXVsdERlZmluaXRpb25cIjtcclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRzIHRoZSBUcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXRcclxuICpcclxuICogQGNsYXNzIFRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldFxyXG4gKiBAZXh0ZW5kcyB7VHJlZUdyaWRXaWRnZXRCYXNlfVxyXG4gKi9cclxuY2xhc3MgVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0IGV4dGVuZHMgVHJlZUdyaWRXaWRnZXRCYXNlIGltcGxlbWVudHMgSVRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldCB7XHJcblxyXG4gICAgcHJpdmF0ZSBfYWRkRGF0YVBvaW50SGFuZGxlciA9IChzZW5kZXIsYXJncyk9PnRoaXMub25BZGREYXRhcG9pbnQoc2VuZGVyLGFyZ3MpO1xyXG4gICAgcHJpdmF0ZSBfZGlhbG9nQ2xvc2VkSGFuZGxlciA9IChzZW5kZXIsYXJncyk9PnRoaXMub25EaWFsb2dDbG9zZWQoc2VuZGVyLGFyZ3MpO1xyXG5cclxuICAgIHByaXZhdGUgX2F2YWlsYWJsZVRyYWNlRGF0YVBvaW50czogVHJhY2VEYXRhUG9pbnRJbmZvW10gPSBuZXcgQXJyYXk8VHJhY2VEYXRhUG9pbnRJbmZvPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB0aGUgaGVpZ2h0IG9mIHRoZSBoZWFkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldFxyXG4gICAgICovXHJcbiAgICBkZWZpbmVIZWFkZXJIZWlnaHQoKTogbnVtYmVye1xyXG4gICAgICAgIHJldHVybiAzMDtcclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsaXplQ29tcG9uZW50KCl7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0RGVmYXVsdERlZmluaXRpb24obmV3IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uKCkpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRpc2FibGVQZXJzaXN0aW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZWQoKXtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplZCgpO1xyXG5cclxuICAgICAgICBzdXBlci5zZXRIZWFkZXJDb250ZW50KFwiRGF0YSBwb2ludHNcIik7XHJcblxyXG4gICAgICAgIC8vIFNldCBkeW5hbWljIGNvbHVtbiBzZXR0aW5nc1xyXG4gICAgICAgIHN1cGVyLnNldER5bmFtaWNDb2x1bW4oMywgMjUwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgYW5kIGluaXRpYWxpemVzIHRoZSB0cmFjZSBkYXRhIHBvaW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1RyYWNlRGF0YVBvaW50W119IHRyYWNlRGF0YVBvaW50c1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRpYWxpemVUcmFjZURhdGFQb2ludHModHJhY2VEYXRhUG9pbnRzOlRyYWNlRGF0YVBvaW50W10pe1xyXG4gICAgICAgIGxldCB0cmFjZUNvbmZpZ0RhdGFwb2ludHNEYXRhTW9kZWwgPSBuZXcgVHJhY2VDb25maWdEYXRhcG9pbnRzRGF0YU1vZGVsKCkgYXMgSVRyYWNlQ29uZmlnRGF0YXBvaW50c0RhdGFNb2RlbDtcclxuICAgICAgICB0cmFjZUNvbmZpZ0RhdGFwb2ludHNEYXRhTW9kZWwuaW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgIHRoaXMuZGF0YU1vZGVsID0gdHJhY2VDb25maWdEYXRhcG9pbnRzRGF0YU1vZGVsO1xyXG4gICAgICAgIHRyYWNlQ29uZmlnRGF0YXBvaW50c0RhdGFNb2RlbC5pbml0RGF0YSA9IHRyYWNlRGF0YVBvaW50cztcclxuICAgICAgICB0aGlzLnVwZGF0ZVRvb2xiYXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGltcGxlbWVudHMgdGhlIG1vZGVsIGNoYW5nZSBoYW5kbGluZ1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SURhdGFNb2RlbH0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50TW9kZWxDaGFuZ2VkQXJnc30gZGF0YVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGhhbmRsZU1vZGVsQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGV2ZW50QXJnczogRXZlbnRNb2RlbENoYW5nZWRBcmdzKTogYW55IHtcclxuICAgICAgICBsZXQgZGF0YVBvaW50cyA9IGV2ZW50QXJncy5kYXRhIGFzIEFycmF5PFRyYWNlRGF0YVBvaW50PjtcclxuICAgICAgICB0aGlzLnJlZnJlc2hEYXRhcG9pbnRzVmFsdWVzKGRhdGFQb2ludHMpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVG9vbGJhckJ1dHRvblN0YXRlcyhkYXRhUG9pbnRzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGhhbmRsZXMgdGhlIGNoYW5nZXMgb2Ygb2JzZXJ2ZWQgaXRlbXMgcmVxdWVzdGVkIGJ5ICdvYnNlcnZlRGF0YU1vZGVsSXRlbXMnXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJRGF0YU1vZGVsfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7RXZlbnRNb2RlbENoYW5nZWRBcmdzfSBkYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGhhbmRsZU1vZGVsSXRlbXNDaGFuZ2VkKHNlbmRlcjogSURhdGFNb2RlbCwgZXZlbnRBcmdzOiBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MpIHtcclxuICAgICAgICBsZXQgZGF0YVBvaW50cyA9IHRoaXMuZGF0YU1vZGVsLmRhdGEgYXMgQXJyYXk8VHJhY2VEYXRhUG9pbnQ+O1xyXG4gICAgICAgIHRoaXMudXBkYXRlVG9vbGJhckJ1dHRvblN0YXRlcyhkYXRhUG9pbnRzKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hEYXRhcG9pbnRzVmFsdWVzKGRhdGFQb2ludHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBjcmVhdGVzIHRoZSBkYXRhcG9pbnQgc2VsZWN0aW9uIGRpYWxvZ1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVEYXRhcG9pbnRzRGlhbG9nKCl7XHJcbiAgICAgICAgbGV0IGRhdGFwb2ludERpYWxvZ0lkID0gXCJkYXRhcG9pbnREaWFsb2dcIjtcclxuICAgICAgICAkKHRoaXMubWFpbkRpdikuYXBwZW5kKFwiPGRpdiBpZD0nXCIgKyBkYXRhcG9pbnREaWFsb2dJZCArIFwiJz48ZGl2IGlkPSdkYXRhcG9pbnRDb250ZW50Um9vdCc+PC8+PC8+XCIpOyAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIERhdGFwb2ludERpYWxvZy5pbml0aWFsaXplKGRhdGFwb2ludERpYWxvZ0lkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogY2F0Y2hlcyB0aGUgYWRkIGRhdGFwb2ludCBldmVudCBmcm9tIHRoZSBkYXRhcG9pbnQgZGlhbG9nXHJcbiAgICAgKiA9PiBhZGRzIG9yIHJlcGxhY2VzIHRoZSBzZWxlY3RlZCBkYXRhcG9pbnQgd2l0aCB0aGUgZGF0YXBvaW50IGZyb20gdGhlIGRhdGFwb2ludCBkaWFsb2dcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge30gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50RGF0YXBvaW50QXJnc30gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uQWRkRGF0YXBvaW50KHNlbmRlciwgYXJnczogRXZlbnREYXRhcG9pbnRBcmdzKXtcclxuICAgICAgICB2YXIgdHJlZUdyaWRPYmogPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcbiAgICAgICAgbGV0IGFjdHVhbFNlbGVjdGlvbkluZGV4ID0gdHJlZUdyaWRPYmoubW9kZWwuc2VsZWN0ZWRSb3dJbmRleDtcclxuICAgICAgICBpZihhY3R1YWxTZWxlY3Rpb25JbmRleCA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBhY3R1YWxTZWxlY3Rpb25JbmRleCA9IC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZGF0YVBvaW50ID0gVHJhY2VEYXRhUG9pbnQuY3JlYXRlV2l0aERhdGFQb2ludEluZm8oYXJncy5kYXRhUG9pbnRJbmZvKTtcclxuICAgICAgICBsZXQgdGNEYXRhUG9pbnREYXRhTW9kZWwgPSA8SVRyYWNlQ29uZmlnRGF0YXBvaW50c0RhdGFNb2RlbD50aGlzLl9kYXRhTW9kZWw7XHJcbiAgICAgICAgaWYoYXJncy5hY3Rpb24gPT0gRGF0YXBvaW50QWN0aW9uLmFkZCl7XHJcbiAgICAgICAgICAgIHRjRGF0YVBvaW50RGF0YU1vZGVsLmFkZERhdGFwb2ludChhY3R1YWxTZWxlY3Rpb25JbmRleCwgZGF0YVBvaW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihhcmdzLmFjdGlvbiA9PSBEYXRhcG9pbnRBY3Rpb24ucmVwbGFjZSl7XHJcbiAgICAgICAgICAgIHRjRGF0YVBvaW50RGF0YU1vZGVsLnJlcGxhY2VEYXRhcG9pbnQoYWN0dWFsU2VsZWN0aW9uSW5kZXgsIGRhdGFQb2ludCwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBjYXRjaGVzIHRoZSBkaWFsb2cgY2xvc2UgZXZlbnQgZnJvbSB0aGUgZGF0YXBvaW50IGRpYWxvZ1xyXG4gICAgICogPT4gZGV0YWNoZXMgdGhlIGRpYWxvZyBldmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge30gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge30gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uRGlhbG9nQ2xvc2VkKHNlbmRlciwgYXJncyl7XHJcbiAgICAgICAgRGF0YXBvaW50RGlhbG9nLmV2ZW50QWRkRGF0YXBvaW50LmRldGFjaCh0aGlzLl9hZGREYXRhUG9pbnRIYW5kbGVyKTtcclxuICAgICAgICBEYXRhcG9pbnREaWFsb2cuZXZlbnREaWFsb2dDbG9zZWQuZGV0YWNoKHRoaXMuX2RpYWxvZ0Nsb3NlZEhhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBjcmVhdGVzIHRoZSB0cmVlIGdyaWQgZm9yIHRoZSBkYXRhcG9pbnQgaW5mb3JtYXRpb25zXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlVHJlZUdyaWQoKSB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVEYXRhcG9pbnRzRGlhbG9nKCk7XHJcbiAgICAgXHJcbiAgICAgICAgJCh0aGlzLm1haW5EaXYpLmVqVHJlZUdyaWQoe1xyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkVG9vbGJhclN1cHBvcnQoKSxcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZENlbGxFZGl0U3VwcG9ydCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzZWxlY3Rpb25UeXBlOiBlai5UcmVlR3JpZC5TZWxlY3Rpb25UeXBlLk11bHRpcGxlLFxyXG4gICAgICAgICAgICBlZGl0U2V0dGluZ3M6IHsgYWxsb3dFZGl0aW5nOiB0cnVlIH0sXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByb3dTZWxlY3RlZDogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRSb3dTZWxlY3RlZChhcmdzKSxcclxuICAgICAgICAgICAgYWN0aW9uQmVnaW46IChhcmdzKSA9PiAgdGhpcy50cmVlR3JpZEFjdGlvbkJlZ2luKGFyZ3MpLFxyXG4gICAgICAgICAgICBjcmVhdGU6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkQ3JlYXRlZCgpLCAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiBkZWZpbml0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKToge317XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29sdW1uczogW1xyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJkYXRhUG9pbnROYW1lXCIsIGhlYWRlclRleHQ6IFwiRGF0YSBwb2ludFwiLCB3aWR0aDogXCIzNTBcIn0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcImNvbXBvbmVudE5hbWVcIiwgaGVhZGVyVGV4dDogXCJDb21wb25lbnRcIn0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcIm5hbWVcIiwgaGVhZGVyVGV4dDogXCJOYW1lXCJ9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJkZXNjcmlwdGlvblwiLCBoZWFkZXJUZXh0OiBcIkRlc2NyaXB0aW9uXCIsIHdpZHRoOiBcIjI1MFwifSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiByZXNpemUgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpOiB7fXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBhbGxvd0NvbHVtblJlc2l6ZTogdHJ1ZSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplU2V0dGluZ3M6IHsgY29sdW1uUmVzaXplTW9kZTogZWouVHJlZUdyaWQuQ29sdW1uUmVzaXplTW9kZS5GaXhlZENvbHVtbnMgfSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplZDogKGFyZ3MpID0+IHN1cGVyLnJlc2l6ZUR5bmFtaWNDb2x1bW4oYXJncy5jb2x1bW5JbmRleCwgYXJncy5tb2RlbCksXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCB0b29sYmFyIHNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldFRyZWVHcmlkVG9vbGJhclN1cHBvcnQoKToge317XHJcbiAgICAgICAgdGhpcy5fdG9vbGJhciA9IG5ldyBUcmFjZUNvbmZpZ0RhdGFwb2ludHNUcmVlR3JpZFRvb2xiYXIodGhpcy5tYWluRGl2KTtcclxuICAgICAgICByZXR1cm4gc3VwZXIuZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNlbGwgZWRpdCBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRDZWxsRWRpdFN1cHBvcnQoKToge317XHJcblx0XHR2YXIgY2VsbEVkaXRFdmVudHMgPSBuZXcgVHJhY2VDb25maWdEYXRhcG9pbnRzVHJlZUdyaWRDZWxsRWRpdEV2ZW50cygpO1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0YmVnaW5FZGl0OiAoYXJncykgPT4gY2VsbEVkaXRFdmVudHMuYmVnaW5FZGl0KGFyZ3MpLFxyXG4gICAgICAgICAgICBlbmRFZGl0OiAoYXJncykgPT4gY2VsbEVkaXRFdmVudHMuZW5kRWRpdChhcmdzLCB0aGlzLl9kYXRhTW9kZWwsIHRoaXMuX2F2YWlsYWJsZVRyYWNlRGF0YVBvaW50cyksXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcbiAgICBwcml2YXRlIHRyZWVHcmlkQWN0aW9uQmVnaW4oYXJncyl7XHJcbiAgICAgICAgLy8gU3VwcG9ydCBcIkVudGYvRGVsXCIga2V5XHJcbiAgICAgICAgaWYoYXJncy5yZXF1ZXN0VHlwZSA9PSBcImRlbGV0ZVwiKXtcclxuICAgICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmRlbGV0ZURhdGFQb2ludHMoYXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHJlZUdyaWRSb3dTZWxlY3RlZChhcmdzKXtcclxuICAgICAgICBpZihhcmdzLm1vZGVsLnNlbGVjdGVkSXRlbSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAodGhpcy5fdG9vbGJhciBhcyBUcmFjZUNvbmZpZ0RhdGFwb2ludHNUcmVlR3JpZFRvb2xiYXIpLmRpc2FibGVSZW1vdmVCdXR0b24oZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAodGhpcy5fdG9vbGJhciBhcyBUcmFjZUNvbmZpZ0RhdGFwb2ludHNUcmVlR3JpZFRvb2xiYXIpLmRpc2FibGVSZW1vdmVCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZWxldGVEYXRhUG9pbnRzKGFyZ3Mpe1xyXG4gICAgICAgIGxldCBpbmRleExpc3QgPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xyXG4gICAgICAgIGZvcihsZXQgaT1hcmdzLmRlbGV0ZWRJdGVtcy5sZW5ndGgtMTsgaSA+PSAwOyBpLS0pe1xyXG4gICAgICAgICAgICBpbmRleExpc3QucHVzaChhcmdzLmRlbGV0ZWRJdGVtc1tpXS5pbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGluZGV4TGlzdC5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgKDxJVHJhY2VDb25maWdEYXRhcG9pbnRzRGF0YU1vZGVsPnRoaXMuX2RhdGFNb2RlbCkucmVtb3ZlRGF0YXBvaW50cyhpbmRleExpc3QpO1xyXG4gICAgICAgICAgICB2YXIgdHJlZUdyaWRPYmogPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcbiAgICAgICAgICAgIGxldCBuZXdTZWxlY3Rpb25JbmRleCA9IGluZGV4TGlzdFtpbmRleExpc3QubGVuZ3RoLTFdO1xyXG4gICAgICAgICAgICBpZihuZXdTZWxlY3Rpb25JbmRleCA+PSBhcmdzLm1vZGVsLnBhcmVudFJlY29yZHMubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgIG5ld1NlbGVjdGlvbkluZGV4ID0gYXJncy5tb2RlbC5wYXJlbnRSZWNvcmRzLmxlbmd0aC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRyZWVHcmlkT2JqLm9wdGlvbihcInNlbGVjdGVkUm93SW5kZXhcIiwgbmV3U2VsZWN0aW9uSW5kZXgsIHRydWUpOyBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBvcGVucyB0aGUgZGF0YXBvaW50IHNlbGVjdGlvbiBkaWFsb2cgYW5kIGF0dGFjaGVzIHRvIHRoZSBkaWFsb2cgZXZlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb3BlbkRhdGFwb2ludERpYWxvZygpe1xyXG4gICAgICAgIERhdGFwb2ludERpYWxvZy5ldmVudEFkZERhdGFwb2ludC5hdHRhY2godGhpcy5fYWRkRGF0YVBvaW50SGFuZGxlcik7XHJcbiAgICAgICAgRGF0YXBvaW50RGlhbG9nLmV2ZW50RGlhbG9nQ2xvc2VkLmF0dGFjaCh0aGlzLl9kaWFsb2dDbG9zZWRIYW5kbGVyKTtcclxuICAgICAgICBEYXRhcG9pbnREaWFsb2cub3BlbigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdXBkYXRlcyB0aGUgdG9vbGJhciBjb3JyZXNwb25kaW5nIHRvIHRoZSBjdXJyZW50IGRhdGEgc2VsZWN0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXRcclxuICAgICAqL1xyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlVG9vbGJhcigpIHtcclxuICAgICAgICAgICAgLy8gVXBkYXRlIHRvb2xiYXIgYnV0dG9ucyA9PiBzaG93L2hpZGUgYWRkIGRhdGFwb2ludHMgdG9vbGJhciBidXR0b25cclxuICAgICAgICAgICAgbGV0IGRhdGFQb2ludHMgPSAoPElUcmFjZUNvbmZpZ0RhdGFwb2ludHNEYXRhTW9kZWw+dGhpcy5fZGF0YU1vZGVsKS5kYXRhIGFzIEFycmF5PGFueT47XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVG9vbGJhckJ1dHRvblN0YXRlcyhkYXRhUG9pbnRzKTtcclxuICAgIH0gICBcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplcyBhbmQgdXBkYXRlcyB0aGUgYXZhaWxhYmxlIHRyYWNlIGRhdGEgcG9pbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7VHJhY2VEYXRhUG9pbnRJbmZvW119IGF2YWlsYWJsZVRyYWNlRGF0YVBvaW50c1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRpYWxpemVBdmFpbGFibGVEYXRhUG9pbnRzKGF2YWlsYWJsZVRyYWNlRGF0YVBvaW50czpUcmFjZURhdGFQb2ludEluZm9bXSl7XHJcbiAgICAgICAgdGhpcy5fYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzID0gYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzO1xyXG4gICAgICAgIERhdGFwb2ludERpYWxvZy5zZXREYXRhcG9pbnRzKHRoaXMuX2F2YWlsYWJsZVRyYWNlRGF0YVBvaW50cyk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVUb29sYmFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWZyZXNoZXMgdGhlIGNvbnRlbnQgb2YgdGhlIGRhdGFwb2ludHMgcGFyYW1ldGVycyB2YWx1ZSBmaWVsZHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtEYXRhcG9pbnRbXX0gZGF0YXBvaW50c1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIHJlZnJlc2hEYXRhcG9pbnRzVmFsdWVzKGRhdGFwb2ludHM6IFRyYWNlRGF0YVBvaW50W10pIHtcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TW9kZWxXaXRoRWRpdFN1cHBvcnQoZGF0YXBvaW50cylcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2goZSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZVRvb2xiYXJCdXR0b25TdGF0ZXMoZGF0YVBvaW50czpBcnJheTxUcmFjZURhdGFQb2ludD4pe1xyXG4gICAgICAgIGxldCBzZWxlY3RlZEl0ZW0gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdmFyIHRyZWVPYmogPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcbiAgICAgICAgaWYodHJlZU9iaiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBzZWxlY3RlZEl0ZW0gPSAoPGFueT50cmVlT2JqLm1vZGVsKS5zZWxlY3RlZEl0ZW07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBkYXRhUG9pbnRzTGVuZ3RoID0gMDtcclxuICAgICAgICBpZihkYXRhUG9pbnRzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGRhdGFQb2ludHNMZW5ndGggPSBkYXRhUG9pbnRzLmxlbmd0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0b29sYmFyID0gdGhpcy5fdG9vbGJhciBhcyBUcmFjZUNvbmZpZ0RhdGFwb2ludHNUcmVlR3JpZFRvb2xiYXI7XHJcbiAgICAgICAgaWYoZGF0YVBvaW50c0xlbmd0aCA+IDMxKXtcclxuICAgICAgICAgICAgdG9vbGJhci5kaXNhYmxlQWRkQnV0dG9uKHRydWUpO1xyXG4gICAgICAgICAgICB0b29sYmFyLmRpc2FibGVBZGRFbXB0eUJ1dHRvbih0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgaWYodGhpcy5fYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzLmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgICAgICAgIHRvb2xiYXIuZGlzYWJsZUFkZEJ1dHRvbih0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdG9vbGJhci5kaXNhYmxlQWRkQnV0dG9uKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0b29sYmFyLmRpc2FibGVBZGRFbXB0eUJ1dHRvbihmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGRhdGFQb2ludHNMZW5ndGggPT0gMCB8fCBzZWxlY3RlZEl0ZW0gPT0gdW5kZWZpbmVkICl7XHJcbiAgICAgICAgICAgIHRvb2xiYXIuZGlzYWJsZVJlbW92ZUJ1dHRvbih0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdG9vbGJhci5kaXNhYmxlUmVtb3ZlQnV0dG9uKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldCB9OyJdfQ==