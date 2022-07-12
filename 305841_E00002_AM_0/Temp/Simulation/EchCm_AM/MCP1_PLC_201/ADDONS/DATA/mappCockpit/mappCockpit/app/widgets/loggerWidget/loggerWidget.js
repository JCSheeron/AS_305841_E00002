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
define(["require", "exports", "./componentDefaultDefinition", "../common/treeGridWidgetBase", "./view/loggerWidgetTreeGridToolbar", "./nullLogger/nullLoggerDataProvider", "./nullLogger/nullLoggerDefinitions", "./loggerProvider", "./loggerColumnDefinition", "../common/busyInformation", "./dataLoadingProgressArgs"], function (require, exports, componentDefaultDefinition_1, treeGridWidgetBase_1, loggerWidgetTreeGridToolbar_1, nullLoggerDataProvider_1, nullLoggerDefinitions_1, loggerProvider_1, loggerColumnDefinition_1, busyInformation_1, dataLoadingProgressArgs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Implements the LoggerWidget
     *
     * @export
     * @class LoggerWidget
     * @extends {TreeGridWidgetBase}
     * @implements {ILoggerWidget}
     */
    var LoggerWidget = /** @class */ (function (_super) {
        __extends(LoggerWidget, _super);
        function LoggerWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * Definitions for the logger(e.g. columns to show, ...)
             *
             * @private
             * @type {ILoggerDefinitions}
             * @memberof LoggerWidget
             */
            _this._loggerDefinition = new nullLoggerDefinitions_1.NullLoggerDefinitions();
            /**
             * Holds the provider for export/import/upload of logger data
             *
             * @private
             * @type {(ILoggerDataProvider)}
             * @memberof LoggerWidget
             */
            _this._loggerDataProvider = new nullLoggerDataProvider_1.NullLoggerDataProvider();
            /**
             * Holds the selected item before filtering
             *
             * @private
             * @memberof LoggerWidget
             */
            _this._selectedItem = undefined;
            /**
             * handler for the data available event
             *
             * @private
             * @memberof LoggerWidget
             */
            _this._dataAvailableHandler = function (sender, args) { return _this.onDataAvailable(sender, args); };
            /**
             * handler for the loading progress changed event
             *
             * @private
             * @memberof LoggerWidget
             */
            _this._dataLoadingProgressChangedHandler = function (sender, args) { return _this.onDataLoadingProgressChanged(sender, args); };
            return _this;
        }
        /**
         * Creates the templates(e.g. row, column, ...) for the tree grid and adds them to the widget container
         *
         * @protected
         * @memberof SignalManagerWidget
         */
        LoggerWidget.prototype.createTemplates = function () {
            this.addToolTipTemplate();
        };
        /**
         * Adds the tooltip template script to the logger widget div
         *
         * @private
         * @memberof LoggerWidget
         */
        LoggerWidget.prototype.addToolTipTemplate = function () {
            var $widgetContainer = $(this.mainDiv);
            var cellTooltipTemplateData = this._loggerDefinition.getCellTooltipTemplateData();
            $widgetContainer.append(cellTooltipTemplateData);
        };
        /**
         * Initialize the widget
         *
         * @memberof LoggerWidget
         */
        LoggerWidget.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
        };
        /**
         * Initialize the component
         *
         * @memberof LoggerWidget
         */
        LoggerWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
            this.component.disablePersisting();
        };
        Object.defineProperty(LoggerWidget.prototype, "activeComponent", {
            /**
             * Sets the active component to be displayed by the component view
             *
             * @memberof LoggerWidget
             */
            set: function (activeComponent) {
                this._activeComponent = activeComponent;
                // get logger data provider for the given component
                this._loggerDataProvider = loggerProvider_1.LoggerProvider.getLoggerDataProviderForComponent(this._activeComponent.value);
                this._loggerDataProvider.eventDataAvailable.attach(this._dataAvailableHandler);
                this._loggerDataProvider.eventDataLoadingProgressChanged.attach(this._dataLoadingProgressChangedHandler);
                // get logger definitions for the given component
                this._loggerDefinition = loggerProvider_1.LoggerProvider.getLoggerDefinitionsForComponent(this._activeComponent.value);
                // Destroy old treegrid instance
                this.destroyTreeGrid();
                // recreate tree grid because new data and logger definition is available
                this.createTreeGrid();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Destroys thte treegrid and reloads the needed setting for the mainDiv
         *
         * @private
         * @memberof LoggerWidget
         */
        LoggerWidget.prototype.destroyTreeGrid = function () {
            var treeGrid = this.getTreeGridObject();
            if (treeGrid != undefined) {
                // deactivate tooltip to avoid problems with freezing tooltip when loading new data(larger data)
                //treeGrid.setModel({"showGridCellTooltip" : false}, true);
                this.setModel({}, true);
                treeGrid.destroy();
            }
            // add networkCommandTrace class for correct style
            this.mainDiv.classList.add("networkCommandTrace");
            // Reload styles
            this.loadStyles();
            // Reload templates
            this.createTemplates();
        };
        /**
         * Disposes the LoggerWidget
         *
         * @memberof LoggerWidget
         */
        LoggerWidget.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._loggerDataProvider.eventDataAvailable.detach(this._dataAvailableHandler);
            this._loggerDataProvider.eventDataLoadingProgressChanged.detach(this._dataLoadingProgressChangedHandler);
        };
        /**
         * Load some styles(css files) for this widget
         *
         * @memberof LoggerWidget
         */
        LoggerWidget.prototype.loadStyles = function () {
            _super.prototype.addStyle.call(this, "widgets/loggerWidget/style/css/loggerStyle.css");
        };
        /**
         * Creates the tree grid
         *
         * @protected
         * @memberof LoggerWidget
         */
        LoggerWidget.prototype.createTreeGrid = function () {
            var _this = this;
            $(this.mainDiv).ejTreeGrid(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridToolbarSupport()), { create: function (args) { return _this.treeGridCreated(); }, queryCellInfo: function (args) { return _this.queryCellInfo(args); }, 
                // activate virtualization
                enableVirtualization: true, 
                // activate filtering
                allowFiltering: true, 
                // activate excel filter style
                filterSettings: {
                    filterType: ej.TreeGrid.FilterType.Excel,
                    filterHierarchyMode: ej.TreeGrid.FilterHierarchyMode.None,
                }, 
                // activate sorting
                allowSorting: true, 
                // defines the default row height
                rowHeight: 26, 
                // show cell tooltip
                showGridCellTooltip: true, 
                // Disable deleting of items
                editSettings: { allowDeleting: false }, actionBegin: function (args) { return _this.treeGridActionBegin(args); }, actionComplete: function (args) { return _this.treeGridActionComplete(args); } }));
        };
        /**
         * Handles the query cell info event, to show the correct data for the current cell
         *
         * @private
         * @param {*} args
         * @memberof LoggerWidget
         */
        LoggerWidget.prototype.queryCellInfo = function (args) {
            if (this._loggerDefinition != undefined) {
                args.cellElement.innerHTML = this._loggerDefinition.getCellData(args.column.field, args.data.item);
            }
        };
        /**
         * Raised when a tree grid action begins
         *
         * @private
         * @param {*} args
         * @memberof LoggerWidget
         */
        LoggerWidget.prototype.treeGridActionBegin = function (args) {
            if (args.requestType == "searching" && args.keyValue == "" || args.requestType == "filterbeforeopen") {
                // Save current selection before new filter is set
                if (args.model.selectedItem != undefined) {
                    this._selectedItem = args.model.selectedItem.item;
                }
                else {
                    this._selectedItem = undefined;
                }
            }
        };
        /**
         * Raised when a tree grid action is completed
         *
         * @private
         * @param {*} args
         * @memberof LoggerWidget
         */
        LoggerWidget.prototype.treeGridActionComplete = function (args) {
            if (args.requestType == "searching" && args.keyValue == ""
                || args.requestType == "filtering" && args.filterCollection != undefined && args.filterCollection.length == 0) {
                // Select the item which was selected before filtering
                if (this._selectedItem != undefined) {
                    this.selectItem(this._selectedItem);
                }
            }
        };
        /**
         * Select the given item and scroll to the item if scrollToItem = true
         *
         * @private
         * @param {*} item
         * @param {boolean} [scrollToItem=true] scrolls to the selected itme
         * @memberof LoggerWidget
         */
        LoggerWidget.prototype.selectItem = function (item, scrollToItem) {
            if (scrollToItem === void 0) { scrollToItem = true; }
            var treeObject = this.getTreeGridObject();
            var record = treeObject.model.flatRecords.filter(function (record) { return record.item === item; })[0];
            if (record != undefined) {
                // treeObject.scrollOffset not possible if there would be some free space after the last item in the tree grid after scrolling to the given item
                // => scrollToBottom befor scroll to a special offset if possible
                if (scrollToItem) {
                    treeObject.scrollToBottom();
                }
                var visibleIndex = this.getIndexOfVisibleRecords(treeObject.model.updatedRecords, item.recordNumber);
                treeObject.setModel({ "selectedRowIndex": visibleIndex });
                if (scrollToItem) {
                    // calculate scroll offset
                    var rowHeight = treeObject.model.rowHeight;
                    var scrollOffset = (visibleIndex - 1) * rowHeight;
                    // set the scroll offset
                    treeObject.scrollOffset(0, scrollOffset);
                }
            }
        };
        /**
         * Returns the index of the given recordNumber of an item in the current view(filtered view)
         *
         * @private
         * @param {Array<any>} data
         * @param {string} recordNumber
         * @returns {number}
         * @memberof LoggerWidget
         */
        LoggerWidget.prototype.getIndexOfVisibleRecords = function (data, recordNumber) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].recordNumber == recordNumber) {
                    return i;
                }
            }
            return -1;
        };
        /**
         * Handel tree grid created event
         *
         * @protected
         * @memberof LoggerWidget
         */
        LoggerWidget.prototype.treeGridCreated = function () {
            _super.prototype.treeGridCreated.call(this);
            /*let columnDefinition = this._loggerDefinition.getColumnDefinitions();
            super.setDynamicColumn(columnDefinition.length-2, 40); // sets the column before the last one to the dynamic column by default
    
            let treeGridObject = this.getTreeGridObject();
            // Update the dynamic column size after hide/show of some columns
            this.resizeDynamicColumn(0, treeGridObject.model);*/
        };
        /**
         * Returns the tree grid column resize settings
         *
         * @private
         * @returns {{}}
         * @memberof LoggerWidget
         */
        /*private getTreeGridColumnResizeSupport(): {} {
            return {
                allowColumnResize: true,
                columnResizeSettings: { columnResizeMode: ej.TreeGrid.ColumnResizeMode.FixedColumns },
                columnResized: (args) => this.treeGridColumnResized(args),
            };
        }*/
        /**
         * A treegrid column was resized
         *
         * @private
         * @param {*} args
         * @memberof LoggerWidget
         */
        /*private treeGridColumnResized(args){
            super.resizeDynamicColumn(args.columnIndex, args.model);
            //this.saveTreeGridSettings();
        }*/
        /**
         * Defines the treegrid toolbar
         *
         * @protected
         * @returns {{}}
         * @memberof LoggerWidget
         */
        LoggerWidget.prototype.getTreeGridToolbarSupport = function () {
            this._toolbar = new loggerWidgetTreeGridToolbar_1.LoggerWidgetTreeGridToolbar(this.mainDiv);
            return _super.prototype.getTreeGridToolbarSupport.call(this, true);
        };
        /**
         * Returns the treegrid column definitions
         *
         * @private
         * @returns {{}}
         * @memberof LoggerWidget
         */
        LoggerWidget.prototype.getTreeGridColumnDefinition = function () {
            // Converts the logger column definitions to the tree grid column definitions
            var columnDefinitionsForTreeGrid = new Array();
            var columnDefinition = this._loggerDefinition.getColumnDefinitions();
            columnDefinition.forEach(function (colDef) {
                var filterEditType = "stringedit"; // DefaultType for column is string
                if (colDef.fieldType == loggerColumnDefinition_1.FieldType.Numeric) {
                    filterEditType = "numericedit";
                }
                columnDefinitionsForTreeGrid.push({ field: colDef.fieldId, headerText: colDef.displayName, filterEditType: filterEditType, width: colDef.size, allowSorting: !colDef.disableSorting, tooltip: colDef.tooltipTemplate });
            });
            return {
                columns: columnDefinitionsForTreeGrid,
            };
        };
        /**
         * upload data from target and show data
         *
         * @memberof LoggerWidget
         */
        LoggerWidget.prototype.uploadData = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this._loggerDataProvider.uploadDataFromTarget();
                    return [2 /*return*/];
                });
            });
        };
        /**
         * import data from file
         *
         * @memberof LoggerWidget
         */
        LoggerWidget.prototype.importData = function () {
            this._loggerDataProvider.importDataFromFile();
        };
        /**
         * export the last imported/uploaded data to a file
         *
         * @memberof LoggerWidget
         */
        LoggerWidget.prototype.exportData = function () {
            var dataModel = this._currentDataModel;
            if (dataModel != undefined) {
                var exportData = dataModel.getSettings();
                var exportString = JSON.stringify(exportData);
                var data = new Blob([exportString], { type: "text/html" });
                this._loggerDataProvider.exportDataToFile(data);
            }
            else {
                console.error("Datamodel for export not available!");
            }
        };
        /**
         * handles the onDataAvailable if data from file or from target is available
         *
         * @private
         * @param {ILoggerDataProvider} sender
         * @param {ILoggerDataModel} args
         * @memberof LoggerWidget
         */
        LoggerWidget.prototype.onDataAvailable = function (sender, args) {
            var _this = this;
            // Recreate treeGrid to remove all filtering, searching and sorting
            this.destroyTreeGrid();
            this.createTreeGrid();
            // set the new data to the datamodel
            this.setBusyInformation(new busyInformation_1.BusyInformation(LoggerWidget.loadingViewMessage, busyInformation_1.ImageId.defaultImage, 48, true));
            this.setBusy(true);
            // Timeout needed to show the busyscreen before exporting data 
            setTimeout(function () { return _this.setDataToTreeGrid(args); }, 200);
            // Check if there is some data for export available and set export toolbar button state
            this._toolbar.disableExportButton(!this._loggerDataProvider.isExportPossible());
        };
        /**
         * Set new tree grid data
         *
         * @private
         * @param {ILoggerDataModel} loggerDataModel
         * @memberof LoggerWidget
         */
        LoggerWidget.prototype.setDataToTreeGrid = function (loggerDataModel) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this._currentDataModel = loggerDataModel;
                    this.setModel(loggerDataModel.dataSource);
                    this.setBusy(false);
                    return [2 /*return*/];
                });
            });
        };
        /**
         * Handles the data loading changed event
         *
         * @private
         * @param {ILoggerDataProvider} sender
         * @param {DataLoadingProgressArgs} args
         * @memberof LoggerWidget
         */
        LoggerWidget.prototype.onDataLoadingProgressChanged = function (sender, args) {
            if (args.progress == 0) {
                var message = LoggerWidget.loadingDataMessage;
                if (args.type == dataLoadingProgressArgs_1.DataLoadingProgressArgs.loadFromTargetType) { // Show % only while loading from target(otherwise UI is not updating the % values)
                    message += args.progress + "%";
                }
                else if (args.type == dataLoadingProgressArgs_1.DataLoadingProgressArgs.exportToFileType) {
                    message = LoggerWidget.exportingDataMessage;
                }
                else if (args.type == dataLoadingProgressArgs_1.DataLoadingProgressArgs.loadResourcesType) {
                    message = LoggerWidget.loadingResourcesMessage;
                }
                this.setBusyInformation(new busyInformation_1.BusyInformation(message, busyInformation_1.ImageId.defaultImage, 48, true));
                this.setBusy(true);
            }
            else if (args.progress == 100) {
                this.setBusy(false);
            }
            else {
                var message = LoggerWidget.loadingDataMessage;
                if (args.type == dataLoadingProgressArgs_1.DataLoadingProgressArgs.loadFromTargetType) { // Show % only while loading from target(otherwise UI is not updating the % values)
                    message += args.progress + "%";
                }
                else if (args.type == dataLoadingProgressArgs_1.DataLoadingProgressArgs.exportToFileType) {
                    message = LoggerWidget.exportingDataMessage;
                }
                else if (args.type == dataLoadingProgressArgs_1.DataLoadingProgressArgs.loadResourcesType) {
                    message = LoggerWidget.loadingResourcesMessage;
                }
                this.changeBusyMessage(message);
            }
        };
        /**
         * Some messages for the busy screen
         *
         * @private
         * @static
         * @memberof LoggerWidget
         */
        LoggerWidget.loadingDataMessage = "Loading drive log data... ";
        LoggerWidget.exportingDataMessage = "Exporting drive log data... ";
        LoggerWidget.loadingResourcesMessage = "Loading drive log resources... ";
        LoggerWidget.loadingViewMessage = "Loading drive log view... ";
        return LoggerWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.LoggerWidget = LoggerWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2xvZ2dlcldpZGdldC9sb2dnZXJXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBaUJBOzs7Ozs7O09BT0c7SUFDSDtRQUFrQyxnQ0FBa0I7UUFBcEQ7WUFBQSxxRUFxZ0JDO1lBMWZHOzs7Ozs7ZUFNRztZQUNLLHVCQUFpQixHQUF1QixJQUFJLDZDQUFxQixFQUFFLENBQUM7WUFFNUU7Ozs7OztlQU1HO1lBQ0sseUJBQW1CLEdBQXdCLElBQUksK0NBQXNCLEVBQUUsQ0FBQztZQUVoRjs7Ozs7ZUFLRztZQUNLLG1CQUFhLEdBQUcsU0FBUyxDQUFDO1lBV2xDOzs7OztlQUtHO1lBQ0ssMkJBQXFCLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEVBQWpDLENBQWlDLENBQUM7WUFFakY7Ozs7O2VBS0c7WUFDSyx3Q0FBa0MsR0FBRyxVQUFDLE1BQU0sRUFBQyxJQUFJLElBQUcsT0FBQSxLQUFJLENBQUMsNEJBQTRCLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxFQUE5QyxDQUE4QyxDQUFDOztRQXljL0csQ0FBQztRQTNiRzs7Ozs7V0FLQTtRQUNPLHNDQUFlLEdBQXpCO1lBQ0MsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDM0IsQ0FBQztRQUVFOzs7OztXQUtHO1FBQ0sseUNBQWtCLEdBQTFCO1lBQ0ksSUFBSSxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZDLElBQUksdUJBQXVCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLDBCQUEwQixFQUFFLENBQUM7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LElBQUksQ0FBQyxDQUFDO2FBQ3RCO2lCQUNJLElBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxHQUFHLEVBQUM7Z0JBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdkI7aUJBQ0c7Z0JBQ0EsSUFBSSxPQUFPLEdBQUcsWUFBWSxDQUFDLGtCQUFrQixDQUFDO2dCQUM5QyxJQUFHLElBQUksQ0FBQyxJQUFJLElBQUksaURBQXVCLENBQUMsa0JBQWtCLEVBQUMsRUFBRSxtRkFBbUY7b0JBQzVJLE9BQU8sSUFBSSxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztpQkFDbEM7cUJBQ0ksSUFBRyxJQUFJLENBQUMsSUFBSSxJQUFJLGlEQUF1QixDQUFDLGdCQUFnQixFQUFDO29CQUMxRCxPQUFPLEdBQUcsWUFBWSxDQUFDLG9CQUFvQixDQUFDO2lCQUMvQztxQkFDSSxJQUFHLElBQUksQ0FBQyxJQUFJLElBQUksaURBQXVCLENBQUMsaUJBQWlCLEVBQUM7b0JBQzNELE9BQU8sR0FBRyxZQUFZLENBQUMsdUJBQXVCLENBQUM7aUJBQ2xEO2dCQUNELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNuQztRQUNMLENBQUM7UUF0Y0Q7Ozs7OztXQU1HO1FBQ1ksK0JBQWtCLEdBQUcsNEJBQTRCLENBQUM7UUFDbEQsaUNBQW9CLEdBQUcsOEJBQThCLENBQUM7UUFDdEQsb0NBQXVCLEdBQUcsaUNBQWlDLENBQUM7UUFDNUQsK0JBQWtCLEdBQUcsNEJBQTRCLENBQUM7UUE2YnJFLG1CQUFDO0tBQUEsQUFyZ0JELENBQWtDLHVDQUFrQixHQXFnQm5EO0lBcmdCWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElMb2dnZXJXaWRnZXQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2xvZ2dlcldpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbiB9IGZyb20gXCIuL2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IFRyZWVHcmlkV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vdHJlZUdyaWRXaWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IExvZ2dlcldpZGdldFRyZWVHcmlkVG9vbGJhciB9IGZyb20gXCIuL3ZpZXcvbG9nZ2VyV2lkZ2V0VHJlZUdyaWRUb29sYmFyXCI7XHJcbmltcG9ydCB7IFByb3BlcnR5IH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9wcm9wZXJ0eVwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IElMb2dnZXJEYXRhUHJvdmlkZXIgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2xvZ2dlckRhdGFQcm92aWRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBOdWxsTG9nZ2VyRGF0YVByb3ZpZGVyIH0gZnJvbSBcIi4vbnVsbExvZ2dlci9udWxsTG9nZ2VyRGF0YVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IElMb2dnZXJEZWZpbml0aW9ucyB9IGZyb20gXCIuL2ludGVyZmFjZXMvbG9nZ2VyRGVmaW5pdGlvbnNJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgTnVsbExvZ2dlckRlZmluaXRpb25zIH0gZnJvbSBcIi4vbnVsbExvZ2dlci9udWxsTG9nZ2VyRGVmaW5pdGlvbnNcIjtcclxuaW1wb3J0IHsgTG9nZ2VyUHJvdmlkZXIgfSBmcm9tIFwiLi9sb2dnZXJQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBGaWVsZFR5cGUgfSBmcm9tIFwiLi9sb2dnZXJDb2x1bW5EZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IEltYWdlSWQsIEJ1c3lJbmZvcm1hdGlvbiB9IGZyb20gXCIuLi9jb21tb24vYnVzeUluZm9ybWF0aW9uXCI7XHJcbmltcG9ydCB7IERhdGFMb2FkaW5nUHJvZ3Jlc3NBcmdzIH0gZnJvbSBcIi4vZGF0YUxvYWRpbmdQcm9ncmVzc0FyZ3NcIjtcclxuaW1wb3J0IHsgSUxvZ2dlckRhdGFNb2RlbCB9IGZyb20gXCIuL2ludGVyZmFjZXMvbG9nZ2VyRGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTZXR0aW5nc09iamVjdCB9IGZyb20gXCIuLi8uLi9jb21tb24vcGVyc2lzdGVuY2UvaW50ZXJmYWNlcy9zZXR0aW5nc09iamVjdEludGVyZmFjZVwiO1xyXG5cclxuLyoqXHJcbiAqIEltcGxlbWVudHMgdGhlIExvZ2dlcldpZGdldFxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBMb2dnZXJXaWRnZXRcclxuICogQGV4dGVuZHMge1RyZWVHcmlkV2lkZ2V0QmFzZX1cclxuICogQGltcGxlbWVudHMge0lMb2dnZXJXaWRnZXR9XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTG9nZ2VyV2lkZ2V0IGV4dGVuZHMgVHJlZUdyaWRXaWRnZXRCYXNlIGltcGxlbWVudHMgSUxvZ2dlcldpZGdldCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyB0aGUgY29tcG9uZW50IHdoaWNoIGhhcyBzb21lIGxvZ2dlciBkYXRhIChlLmcuIERyaXZlTG9nKE1jQXBjRHJ2KSBmb3IgbmV0d29yayBjb21tYW5kIHRyYWNlKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7UHJvcGVydHk8TWFwcENvY2twaXRDb21wb25lbnQ+fVxyXG4gICAgICogQG1lbWJlcm9mIExvZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9hY3RpdmVDb21wb25lbnQhOiBQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudD47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbml0aW9ucyBmb3IgdGhlIGxvZ2dlcihlLmcuIGNvbHVtbnMgdG8gc2hvdywgLi4uKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7SUxvZ2dlckRlZmluaXRpb25zfVxyXG4gICAgICogQG1lbWJlcm9mIExvZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9sb2dnZXJEZWZpbml0aW9uOiBJTG9nZ2VyRGVmaW5pdGlvbnMgPSBuZXcgTnVsbExvZ2dlckRlZmluaXRpb25zKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyB0aGUgcHJvdmlkZXIgZm9yIGV4cG9ydC9pbXBvcnQvdXBsb2FkIG9mIGxvZ2dlciBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIHsoSUxvZ2dlckRhdGFQcm92aWRlcil9XHJcbiAgICAgKiBAbWVtYmVyb2YgTG9nZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2xvZ2dlckRhdGFQcm92aWRlcjogSUxvZ2dlckRhdGFQcm92aWRlciA9IG5ldyBOdWxsTG9nZ2VyRGF0YVByb3ZpZGVyKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyB0aGUgc2VsZWN0ZWQgaXRlbSBiZWZvcmUgZmlsdGVyaW5nXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBMb2dnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWRJdGVtID0gdW5kZWZpbmVkO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIHRoZSBjdXJyZW50IGRhdGFNb2RlbCB3aGljaCBpcyB1c2VkIGluIHRoZSBsb2dnZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUgeyhJTG9nZ2VyRGF0YU1vZGVsfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgTG9nZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2N1cnJlbnREYXRhTW9kZWw6IElMb2dnZXJEYXRhTW9kZWx8SVNldHRpbmdzT2JqZWN0fHVuZGVmaW5lZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIGhhbmRsZXIgZm9yIHRoZSBkYXRhIGF2YWlsYWJsZSBldmVudFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTG9nZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2RhdGFBdmFpbGFibGVIYW5kbGVyID0gKHNlbmRlcixhcmdzKT0+dGhpcy5vbkRhdGFBdmFpbGFibGUoc2VuZGVyLGFyZ3MpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogaGFuZGxlciBmb3IgdGhlIGxvYWRpbmcgcHJvZ3Jlc3MgY2hhbmdlZCBldmVudFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTG9nZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2RhdGFMb2FkaW5nUHJvZ3Jlc3NDaGFuZ2VkSGFuZGxlciA9IChzZW5kZXIsYXJncyk9PnRoaXMub25EYXRhTG9hZGluZ1Byb2dyZXNzQ2hhbmdlZChzZW5kZXIsYXJncyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTb21lIG1lc3NhZ2VzIGZvciB0aGUgYnVzeSBzY3JlZW5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQG1lbWJlcm9mIExvZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBsb2FkaW5nRGF0YU1lc3NhZ2UgPSBcIkxvYWRpbmcgZHJpdmUgbG9nIGRhdGEuLi4gXCI7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBleHBvcnRpbmdEYXRhTWVzc2FnZSA9IFwiRXhwb3J0aW5nIGRyaXZlIGxvZyBkYXRhLi4uIFwiO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgbG9hZGluZ1Jlc291cmNlc01lc3NhZ2UgPSBcIkxvYWRpbmcgZHJpdmUgbG9nIHJlc291cmNlcy4uLiBcIjtcclxuICAgIHByaXZhdGUgc3RhdGljIGxvYWRpbmdWaWV3TWVzc2FnZSA9IFwiTG9hZGluZyBkcml2ZSBsb2cgdmlldy4uLiBcIjtcclxuICAgICAgICBcclxuICAgIC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHRlbXBsYXRlcyhlLmcuIHJvdywgY29sdW1uLCAuLi4pIGZvciB0aGUgdHJlZSBncmlkIGFuZCBhZGRzIHRoZW0gdG8gdGhlIHdpZGdldCBjb250YWluZXJcclxuXHQgKlxyXG5cdCAqIEBwcm90ZWN0ZWRcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByb3RlY3RlZCBjcmVhdGVUZW1wbGF0ZXMoKXtcclxuXHRcdHRoaXMuYWRkVG9vbFRpcFRlbXBsYXRlKCk7XHJcblx0fVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgdGhlIHRvb2x0aXAgdGVtcGxhdGUgc2NyaXB0IHRvIHRoZSBsb2dnZXIgd2lkZ2V0IGRpdlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTG9nZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkVG9vbFRpcFRlbXBsYXRlKCl7XHJcbiAgICAgICAgbGV0ICR3aWRnZXRDb250YWluZXIgPSAkKHRoaXMubWFpbkRpdik7XHJcbiAgICAgICAgbGV0IGNlbGxUb29sdGlwVGVtcGxhdGVEYXRhID0gdGhpcy5fbG9nZ2VyRGVmaW5pdGlvbi5nZXRDZWxsVG9vbHRpcFRlbXBsYXRlRGF0YSgpO1xyXG5cdFx0JHdpZGdldENvbnRhaW5lci5hcHBlbmQoY2VsbFRvb2x0aXBUZW1wbGF0ZURhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIExvZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaW5pdGlhbGl6ZSgpe1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUoKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIExvZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldERlZmF1bHREZWZpbml0aW9uKG5ldyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbigpKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kaXNhYmxlUGVyc2lzdGluZygpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGFjdGl2ZSBjb21wb25lbnQgdG8gYmUgZGlzcGxheWVkIGJ5IHRoZSBjb21wb25lbnQgdmlld1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBMb2dnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBhY3RpdmVDb21wb25lbnQoYWN0aXZlQ29tcG9uZW50OiBQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudD4pIHtcclxuICAgICAgICB0aGlzLl9hY3RpdmVDb21wb25lbnQgPSBhY3RpdmVDb21wb25lbnQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZ2V0IGxvZ2dlciBkYXRhIHByb3ZpZGVyIGZvciB0aGUgZ2l2ZW4gY29tcG9uZW50XHJcbiAgICAgICAgdGhpcy5fbG9nZ2VyRGF0YVByb3ZpZGVyID0gTG9nZ2VyUHJvdmlkZXIuZ2V0TG9nZ2VyRGF0YVByb3ZpZGVyRm9yQ29tcG9uZW50KHRoaXMuX2FjdGl2ZUNvbXBvbmVudC52YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5fbG9nZ2VyRGF0YVByb3ZpZGVyLmV2ZW50RGF0YUF2YWlsYWJsZS5hdHRhY2godGhpcy5fZGF0YUF2YWlsYWJsZUhhbmRsZXIpO1xyXG4gICAgICAgIHRoaXMuX2xvZ2dlckRhdGFQcm92aWRlci5ldmVudERhdGFMb2FkaW5nUHJvZ3Jlc3NDaGFuZ2VkLmF0dGFjaCh0aGlzLl9kYXRhTG9hZGluZ1Byb2dyZXNzQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGdldCBsb2dnZXIgZGVmaW5pdGlvbnMgZm9yIHRoZSBnaXZlbiBjb21wb25lbnRcclxuICAgICAgICB0aGlzLl9sb2dnZXJEZWZpbml0aW9uID0gTG9nZ2VyUHJvdmlkZXIuZ2V0TG9nZ2VyRGVmaW5pdGlvbnNGb3JDb21wb25lbnQodGhpcy5fYWN0aXZlQ29tcG9uZW50LnZhbHVlKTtcclxuXHJcbiAgICAgICAgLy8gRGVzdHJveSBvbGQgdHJlZWdyaWQgaW5zdGFuY2VcclxuICAgICAgICB0aGlzLmRlc3Ryb3lUcmVlR3JpZCgpO1xyXG5cclxuICAgICAgICAvLyByZWNyZWF0ZSB0cmVlIGdyaWQgYmVjYXVzZSBuZXcgZGF0YSBhbmQgbG9nZ2VyIGRlZmluaXRpb24gaXMgYXZhaWxhYmxlXHJcbiAgICAgICAgdGhpcy5jcmVhdGVUcmVlR3JpZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVzdHJveXMgdGh0ZSB0cmVlZ3JpZCBhbmQgcmVsb2FkcyB0aGUgbmVlZGVkIHNldHRpbmcgZm9yIHRoZSBtYWluRGl2XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBMb2dnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkZXN0cm95VHJlZUdyaWQoKXtcclxuICAgICAgICBsZXQgdHJlZUdyaWQgPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcbiAgICAgICAgaWYodHJlZUdyaWQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gZGVhY3RpdmF0ZSB0b29sdGlwIHRvIGF2b2lkIHByb2JsZW1zIHdpdGggZnJlZXppbmcgdG9vbHRpcCB3aGVuIGxvYWRpbmcgbmV3IGRhdGEobGFyZ2VyIGRhdGEpXHJcbiAgICAgICAgICAgIC8vdHJlZUdyaWQuc2V0TW9kZWwoe1wic2hvd0dyaWRDZWxsVG9vbHRpcFwiIDogZmFsc2V9LCB0cnVlKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuc2V0TW9kZWwoe30sIHRydWUpO1xyXG4gICAgICAgICAgICB0cmVlR3JpZC5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBhZGQgbmV0d29ya0NvbW1hbmRUcmFjZSBjbGFzcyBmb3IgY29ycmVjdCBzdHlsZVxyXG4gICAgICAgIHRoaXMubWFpbkRpdi5jbGFzc0xpc3QuYWRkKFwibmV0d29ya0NvbW1hbmRUcmFjZVwiKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBSZWxvYWQgc3R5bGVzXHJcbiAgICAgICAgdGhpcy5sb2FkU3R5bGVzKCk7XHJcblxyXG4gICAgICAgIC8vIFJlbG9hZCB0ZW1wbGF0ZXNcclxuICAgICAgICB0aGlzLmNyZWF0ZVRlbXBsYXRlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZXMgdGhlIExvZ2dlcldpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBMb2dnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpc3Bvc2UoKXtcclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2xvZ2dlckRhdGFQcm92aWRlci5ldmVudERhdGFBdmFpbGFibGUuZGV0YWNoKHRoaXMuX2RhdGFBdmFpbGFibGVIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLl9sb2dnZXJEYXRhUHJvdmlkZXIuZXZlbnREYXRhTG9hZGluZ1Byb2dyZXNzQ2hhbmdlZC5kZXRhY2godGhpcy5fZGF0YUxvYWRpbmdQcm9ncmVzc0NoYW5nZWRIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWQgc29tZSBzdHlsZXMoY3NzIGZpbGVzKSBmb3IgdGhpcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTG9nZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGxvYWRTdHlsZXMoKSB7XHJcbiAgICAgICAgc3VwZXIuYWRkU3R5bGUoXCJ3aWRnZXRzL2xvZ2dlcldpZGdldC9zdHlsZS9jc3MvbG9nZ2VyU3R5bGUuY3NzXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgdHJlZSBncmlkXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQG1lbWJlcm9mIExvZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlVHJlZUdyaWQoKSB7XHJcbiAgICAgICAgJCh0aGlzLm1haW5EaXYpLmVqVHJlZUdyaWQoe1xyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpLFxyXG4gICAgICAgICAgICAvLy4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5SZXNpemVTdXBwb3J0KCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpLFxyXG5cclxuICAgICAgICAgICAgY3JlYXRlOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZENyZWF0ZWQoKSxcclxuICAgICAgICAgICAgcXVlcnlDZWxsSW5mbzogKGFyZ3MpID0+IHRoaXMucXVlcnlDZWxsSW5mbyhhcmdzKSxcclxuICAgICAgICAgICAgLy8gYWN0aXZhdGUgdmlydHVhbGl6YXRpb25cclxuICAgICAgICAgICAgZW5hYmxlVmlydHVhbGl6YXRpb246IHRydWUsXHJcbiAgICAgICAgICAgIC8vIGFjdGl2YXRlIGZpbHRlcmluZ1xyXG4gICAgICAgICAgICBhbGxvd0ZpbHRlcmluZyA6IHRydWUsXHJcbiAgICAgICAgICAgIC8vIGFjdGl2YXRlIGV4Y2VsIGZpbHRlciBzdHlsZVxyXG4gICAgICAgICAgICBmaWx0ZXJTZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyVHlwZTogZWouVHJlZUdyaWQuRmlsdGVyVHlwZS5FeGNlbCxcclxuICAgICAgICAgICAgICAgIGZpbHRlckhpZXJhcmNoeU1vZGU6IGVqLlRyZWVHcmlkLkZpbHRlckhpZXJhcmNoeU1vZGUuTm9uZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gYWN0aXZhdGUgc29ydGluZ1xyXG4gICAgICAgICAgICBhbGxvd1NvcnRpbmc6IHRydWUsXHJcbiAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBkZWZpbmVzIHRoZSBkZWZhdWx0IHJvdyBoZWlnaHRcclxuICAgICAgICAgICAgcm93SGVpZ2h0OiAyNixcclxuXHJcbiAgICAgICAgICAgIC8vIHNob3cgY2VsbCB0b29sdGlwXHJcbiAgICAgICAgICAgIHNob3dHcmlkQ2VsbFRvb2x0aXA6IHRydWUsXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBEaXNhYmxlIGRlbGV0aW5nIG9mIGl0ZW1zXHJcbiAgICAgICAgICAgIGVkaXRTZXR0aW5nczogeyBhbGxvd0RlbGV0aW5nIDogZmFsc2UgfSxcclxuXHJcbiAgICAgICAgICAgIGFjdGlvbkJlZ2luOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZEFjdGlvbkJlZ2luKGFyZ3MpLFxyXG4gICAgICAgICAgICBhY3Rpb25Db21wbGV0ZTogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRBY3Rpb25Db21wbGV0ZShhcmdzKSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIHRoZSBxdWVyeSBjZWxsIGluZm8gZXZlbnQsIHRvIHNob3cgdGhlIGNvcnJlY3QgZGF0YSBmb3IgdGhlIGN1cnJlbnQgY2VsbFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBMb2dnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBxdWVyeUNlbGxJbmZvKGFyZ3M6IGFueSkgeyBcclxuICAgICAgICBpZih0aGlzLl9sb2dnZXJEZWZpbml0aW9uICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGFyZ3MuY2VsbEVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5fbG9nZ2VyRGVmaW5pdGlvbi5nZXRDZWxsRGF0YShhcmdzLmNvbHVtbi5maWVsZCwgYXJncy5kYXRhLml0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH0gXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSYWlzZWQgd2hlbiBhIHRyZWUgZ3JpZCBhY3Rpb24gYmVnaW5zXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIExvZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHRyZWVHcmlkQWN0aW9uQmVnaW4oYXJnczogYW55KSB7XHJcbiAgICAgICAgaWYoYXJncy5yZXF1ZXN0VHlwZSA9PSBcInNlYXJjaGluZ1wiICYmIGFyZ3Mua2V5VmFsdWUgPT0gXCJcIiB8fCBhcmdzLnJlcXVlc3RUeXBlID09IFwiZmlsdGVyYmVmb3Jlb3BlblwiKSB7XHJcbiAgICAgICAgICAgIC8vIFNhdmUgY3VycmVudCBzZWxlY3Rpb24gYmVmb3JlIG5ldyBmaWx0ZXIgaXMgc2V0XHJcbiAgICAgICAgICAgIGlmKGFyZ3MubW9kZWwuc2VsZWN0ZWRJdGVtICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RlZEl0ZW0gPSBhcmdzLm1vZGVsLnNlbGVjdGVkSXRlbS5pdGVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RlZEl0ZW0gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSYWlzZWQgd2hlbiBhIHRyZWUgZ3JpZCBhY3Rpb24gaXMgY29tcGxldGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIExvZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHRyZWVHcmlkQWN0aW9uQ29tcGxldGUoYXJnczogYW55KSB7XHJcbiAgICAgICAgaWYoYXJncy5yZXF1ZXN0VHlwZSA9PSBcInNlYXJjaGluZ1wiICYmIGFyZ3Mua2V5VmFsdWUgPT0gXCJcIlxyXG4gICAgICAgICAgICB8fCBhcmdzLnJlcXVlc3RUeXBlID09IFwiZmlsdGVyaW5nXCIgJiYgYXJncy5maWx0ZXJDb2xsZWN0aW9uICE9IHVuZGVmaW5lZCAmJiBhcmdzLmZpbHRlckNvbGxlY3Rpb24ubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgLy8gU2VsZWN0IHRoZSBpdGVtIHdoaWNoIHdhcyBzZWxlY3RlZCBiZWZvcmUgZmlsdGVyaW5nXHJcbiAgICAgICAgICAgIGlmKHRoaXMuX3NlbGVjdGVkSXRlbSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RJdGVtKHRoaXMuX3NlbGVjdGVkSXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWxlY3QgdGhlIGdpdmVuIGl0ZW0gYW5kIHNjcm9sbCB0byB0aGUgaXRlbSBpZiBzY3JvbGxUb0l0ZW0gPSB0cnVlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gaXRlbVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbc2Nyb2xsVG9JdGVtPXRydWVdIHNjcm9sbHMgdG8gdGhlIHNlbGVjdGVkIGl0bWVcclxuICAgICAqIEBtZW1iZXJvZiBMb2dnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZWxlY3RJdGVtKGl0ZW06IGFueSwgc2Nyb2xsVG9JdGVtOiBib29sZWFuID0gdHJ1ZSl7XHJcblx0XHRsZXQgdHJlZU9iamVjdCA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTsgXHJcblx0XHRsZXQgcmVjb3JkID0gKDxhbnk+dHJlZU9iamVjdC5tb2RlbCkuZmxhdFJlY29yZHMuZmlsdGVyKHJlY29yZCA9PiB7cmV0dXJuIHJlY29yZC5pdGVtID09PSBpdGVtfSlbMF07XHJcblx0XHRpZihyZWNvcmQgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0Ly8gdHJlZU9iamVjdC5zY3JvbGxPZmZzZXQgbm90IHBvc3NpYmxlIGlmIHRoZXJlIHdvdWxkIGJlIHNvbWUgZnJlZSBzcGFjZSBhZnRlciB0aGUgbGFzdCBpdGVtIGluIHRoZSB0cmVlIGdyaWQgYWZ0ZXIgc2Nyb2xsaW5nIHRvIHRoZSBnaXZlbiBpdGVtXHJcblx0XHRcdC8vID0+IHNjcm9sbFRvQm90dG9tIGJlZm9yIHNjcm9sbCB0byBhIHNwZWNpYWwgb2Zmc2V0IGlmIHBvc3NpYmxlXHJcblx0XHRcdGlmKHNjcm9sbFRvSXRlbSl7XHJcbiAgICAgICAgICAgICAgICB0cmVlT2JqZWN0LnNjcm9sbFRvQm90dG9tKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCB2aXNpYmxlSW5kZXggPSB0aGlzLmdldEluZGV4T2ZWaXNpYmxlUmVjb3JkcygoPGFueT50cmVlT2JqZWN0Lm1vZGVsKS51cGRhdGVkUmVjb3JkcywgaXRlbS5yZWNvcmROdW1iZXIpO1xyXG5cdFx0XHR0cmVlT2JqZWN0LnNldE1vZGVsKHtcInNlbGVjdGVkUm93SW5kZXhcIiA6IHZpc2libGVJbmRleCB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHNjcm9sbFRvSXRlbSl7XHJcbiAgICAgICAgICAgICAgICAvLyBjYWxjdWxhdGUgc2Nyb2xsIG9mZnNldFxyXG4gICAgICAgICAgICAgICAgbGV0IHJvd0hlaWdodCA9IHRyZWVPYmplY3QubW9kZWwucm93SGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgbGV0IHNjcm9sbE9mZnNldCA9ICAodmlzaWJsZUluZGV4LTEpKnJvd0hlaWdodCE7XHJcbiAgICAgICAgICAgICAgICAvLyBzZXQgdGhlIHNjcm9sbCBvZmZzZXRcclxuICAgICAgICAgICAgICAgIHRyZWVPYmplY3Quc2Nyb2xsT2Zmc2V0KDAsIHNjcm9sbE9mZnNldCk7XHJcbiAgICAgICAgICAgIH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgZ2l2ZW4gcmVjb3JkTnVtYmVyIG9mIGFuIGl0ZW0gaW4gdGhlIGN1cnJlbnQgdmlldyhmaWx0ZXJlZCB2aWV3KVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PGFueT59IGRhdGFcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByZWNvcmROdW1iZXJcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgTG9nZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0SW5kZXhPZlZpc2libGVSZWNvcmRzKGRhdGE6IEFycmF5PGFueT4sIHJlY29yZE51bWJlcjogc3RyaW5nKTogbnVtYmVye1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgZGF0YS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKGRhdGFbaV0ucmVjb3JkTnVtYmVyID09IHJlY29yZE51bWJlcil7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kZWwgdHJlZSBncmlkIGNyZWF0ZWQgZXZlbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgTG9nZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCB0cmVlR3JpZENyZWF0ZWQoKXtcclxuICAgICAgICBzdXBlci50cmVlR3JpZENyZWF0ZWQoKTtcclxuICAgICAgICBcclxuICAgICAgICAvKmxldCBjb2x1bW5EZWZpbml0aW9uID0gdGhpcy5fbG9nZ2VyRGVmaW5pdGlvbi5nZXRDb2x1bW5EZWZpbml0aW9ucygpO1xyXG4gICAgICAgIHN1cGVyLnNldER5bmFtaWNDb2x1bW4oY29sdW1uRGVmaW5pdGlvbi5sZW5ndGgtMiwgNDApOyAvLyBzZXRzIHRoZSBjb2x1bW4gYmVmb3JlIHRoZSBsYXN0IG9uZSB0byB0aGUgZHluYW1pYyBjb2x1bW4gYnkgZGVmYXVsdFxyXG5cclxuICAgICAgICBsZXQgdHJlZUdyaWRPYmplY3QgPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcbiAgICAgICAgLy8gVXBkYXRlIHRoZSBkeW5hbWljIGNvbHVtbiBzaXplIGFmdGVyIGhpZGUvc2hvdyBvZiBzb21lIGNvbHVtbnNcclxuICAgICAgICB0aGlzLnJlc2l6ZUR5bmFtaWNDb2x1bW4oMCwgdHJlZUdyaWRPYmplY3QubW9kZWwpOyovXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY29sdW1uIHJlc2l6ZSBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgTG9nZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIC8qcHJpdmF0ZSBnZXRUcmVlR3JpZENvbHVtblJlc2l6ZVN1cHBvcnQoKToge30ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGFsbG93Q29sdW1uUmVzaXplOiB0cnVlLFxyXG4gICAgICAgICAgICBjb2x1bW5SZXNpemVTZXR0aW5nczogeyBjb2x1bW5SZXNpemVNb2RlOiBlai5UcmVlR3JpZC5Db2x1bW5SZXNpemVNb2RlLkZpeGVkQ29sdW1ucyB9LFxyXG4gICAgICAgICAgICBjb2x1bW5SZXNpemVkOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZENvbHVtblJlc2l6ZWQoYXJncyksXHJcbiAgICAgICAgfTtcclxuICAgIH0qL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQSB0cmVlZ3JpZCBjb2x1bW4gd2FzIHJlc2l6ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgTG9nZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIC8qcHJpdmF0ZSB0cmVlR3JpZENvbHVtblJlc2l6ZWQoYXJncyl7XHJcbiAgICAgICAgc3VwZXIucmVzaXplRHluYW1pY0NvbHVtbihhcmdzLmNvbHVtbkluZGV4LCBhcmdzLm1vZGVsKTtcclxuICAgICAgICAvL3RoaXMuc2F2ZVRyZWVHcmlkU2V0dGluZ3MoKTtcclxuICAgIH0qL1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgdGhlIHRyZWVncmlkIHRvb2xiYXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgTG9nZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRUcmVlR3JpZFRvb2xiYXJTdXBwb3J0KCk6IHt9e1xyXG5cdFx0dGhpcy5fdG9vbGJhciA9IG5ldyBMb2dnZXJXaWRnZXRUcmVlR3JpZFRvb2xiYXIodGhpcy5tYWluRGl2KTtcdFxyXG5cdFx0cmV0dXJuIHN1cGVyLmdldFRyZWVHcmlkVG9vbGJhclN1cHBvcnQodHJ1ZSk7XHJcblx0fVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZWdyaWQgY29sdW1uIGRlZmluaXRpb25zXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBMb2dnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKToge317XHJcbiAgICAgICAgLy8gQ29udmVydHMgdGhlIGxvZ2dlciBjb2x1bW4gZGVmaW5pdGlvbnMgdG8gdGhlIHRyZWUgZ3JpZCBjb2x1bW4gZGVmaW5pdGlvbnNcclxuICAgICAgICBsZXQgY29sdW1uRGVmaW5pdGlvbnNGb3JUcmVlR3JpZCA9IG5ldyBBcnJheTxhbnk+KCk7XHJcbiAgICAgICAgbGV0IGNvbHVtbkRlZmluaXRpb24gPSB0aGlzLl9sb2dnZXJEZWZpbml0aW9uLmdldENvbHVtbkRlZmluaXRpb25zKCk7XHJcbiAgICAgICAgY29sdW1uRGVmaW5pdGlvbi5mb3JFYWNoKGNvbERlZiA9PiB7XHJcbiAgICAgICAgICAgIGxldCBmaWx0ZXJFZGl0VHlwZSA9IFwic3RyaW5nZWRpdFwiOyAvLyBEZWZhdWx0VHlwZSBmb3IgY29sdW1uIGlzIHN0cmluZ1xyXG4gICAgICAgICAgICBpZihjb2xEZWYuZmllbGRUeXBlID09IEZpZWxkVHlwZS5OdW1lcmljKXtcclxuICAgICAgICAgICAgICAgIGZpbHRlckVkaXRUeXBlID0gXCJudW1lcmljZWRpdFwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb2x1bW5EZWZpbml0aW9uc0ZvclRyZWVHcmlkLnB1c2goeyBmaWVsZDogY29sRGVmLmZpZWxkSWQsIGhlYWRlclRleHQ6IGNvbERlZi5kaXNwbGF5TmFtZSwgZmlsdGVyRWRpdFR5cGU6IGZpbHRlckVkaXRUeXBlLCB3aWR0aDogY29sRGVmLnNpemUsIGFsbG93U29ydGluZzogIWNvbERlZi5kaXNhYmxlU29ydGluZywgdG9vbHRpcDogY29sRGVmLnRvb2x0aXBUZW1wbGF0ZX0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb2x1bW5zOiBjb2x1bW5EZWZpbml0aW9uc0ZvclRyZWVHcmlkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB1cGxvYWQgZGF0YSBmcm9tIHRhcmdldCBhbmQgc2hvdyBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIExvZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgdXBsb2FkRGF0YSgpe1xyXG4gICAgICAgIHRoaXMuX2xvZ2dlckRhdGFQcm92aWRlci51cGxvYWREYXRhRnJvbVRhcmdldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaW1wb3J0IGRhdGEgZnJvbSBmaWxlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIExvZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaW1wb3J0RGF0YSgpe1xyXG4gICAgICAgIHRoaXMuX2xvZ2dlckRhdGFQcm92aWRlci5pbXBvcnREYXRhRnJvbUZpbGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGV4cG9ydCB0aGUgbGFzdCBpbXBvcnRlZC91cGxvYWRlZCBkYXRhIHRvIGEgZmlsZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBMb2dnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGV4cG9ydERhdGEoKXtcclxuICAgICAgICBsZXQgZGF0YU1vZGVsID0gdGhpcy5fY3VycmVudERhdGFNb2RlbCBhcyBJU2V0dGluZ3NPYmplY3Q7XHJcbiAgICAgICAgaWYoZGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBleHBvcnREYXRhID0gZGF0YU1vZGVsLmdldFNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgIGxldCBleHBvcnRTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShleHBvcnREYXRhKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBkYXRhOiBCbG9iID0gbmV3IEJsb2IoW2V4cG9ydFN0cmluZ10sIHsgdHlwZTogXCJ0ZXh0L2h0bWxcIiB9KTtcclxuICAgICAgICAgICAgdGhpcy5fbG9nZ2VyRGF0YVByb3ZpZGVyLmV4cG9ydERhdGFUb0ZpbGUoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJEYXRhbW9kZWwgZm9yIGV4cG9ydCBub3QgYXZhaWxhYmxlIVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBoYW5kbGVzIHRoZSBvbkRhdGFBdmFpbGFibGUgaWYgZGF0YSBmcm9tIGZpbGUgb3IgZnJvbSB0YXJnZXQgaXMgYXZhaWxhYmxlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SUxvZ2dlckRhdGFQcm92aWRlcn0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge0lMb2dnZXJEYXRhTW9kZWx9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBMb2dnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkRhdGFBdmFpbGFibGUoc2VuZGVyOiBJTG9nZ2VyRGF0YVByb3ZpZGVyLCBhcmdzOiBJTG9nZ2VyRGF0YU1vZGVsKXtcclxuICAgICAgICAvLyBSZWNyZWF0ZSB0cmVlR3JpZCB0byByZW1vdmUgYWxsIGZpbHRlcmluZywgc2VhcmNoaW5nIGFuZCBzb3J0aW5nXHJcbiAgICAgICAgdGhpcy5kZXN0cm95VHJlZUdyaWQoKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZVRyZWVHcmlkKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gc2V0IHRoZSBuZXcgZGF0YSB0byB0aGUgZGF0YW1vZGVsXHJcbiAgICAgICAgdGhpcy5zZXRCdXN5SW5mb3JtYXRpb24obmV3IEJ1c3lJbmZvcm1hdGlvbihMb2dnZXJXaWRnZXQubG9hZGluZ1ZpZXdNZXNzYWdlLCBJbWFnZUlkLmRlZmF1bHRJbWFnZSwgNDgsIHRydWUpKTtcclxuICAgICAgICB0aGlzLnNldEJ1c3kodHJ1ZSk7XHJcbiAgICAgICAgLy8gVGltZW91dCBuZWVkZWQgdG8gc2hvdyB0aGUgYnVzeXNjcmVlbiBiZWZvcmUgZXhwb3J0aW5nIGRhdGEgXHJcblx0XHRzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2V0RGF0YVRvVHJlZUdyaWQoYXJncyksIDIwMCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlcmUgaXMgc29tZSBkYXRhIGZvciBleHBvcnQgYXZhaWxhYmxlIGFuZCBzZXQgZXhwb3J0IHRvb2xiYXIgYnV0dG9uIHN0YXRlXHJcbiAgICAgICAgKHRoaXMuX3Rvb2xiYXIgYXMgTG9nZ2VyV2lkZ2V0VHJlZUdyaWRUb29sYmFyKS5kaXNhYmxlRXhwb3J0QnV0dG9uKCF0aGlzLl9sb2dnZXJEYXRhUHJvdmlkZXIuaXNFeHBvcnRQb3NzaWJsZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBuZXcgdHJlZSBncmlkIGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJTG9nZ2VyRGF0YU1vZGVsfSBsb2dnZXJEYXRhTW9kZWxcclxuICAgICAqIEBtZW1iZXJvZiBMb2dnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBzZXREYXRhVG9UcmVlR3JpZChsb2dnZXJEYXRhTW9kZWw6IElMb2dnZXJEYXRhTW9kZWwpe1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbnREYXRhTW9kZWwgPSBsb2dnZXJEYXRhTW9kZWw7XHJcbiAgICAgICAgdGhpcy5zZXRNb2RlbChsb2dnZXJEYXRhTW9kZWwuZGF0YVNvdXJjZSk7XHJcbiAgICAgICAgdGhpcy5zZXRCdXN5KGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgdGhlIGRhdGEgbG9hZGluZyBjaGFuZ2VkIGV2ZW50XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SUxvZ2dlckRhdGFQcm92aWRlcn0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge0RhdGFMb2FkaW5nUHJvZ3Jlc3NBcmdzfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgTG9nZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25EYXRhTG9hZGluZ1Byb2dyZXNzQ2hhbmdlZChzZW5kZXI6IElMb2dnZXJEYXRhUHJvdmlkZXIsIGFyZ3M6IERhdGFMb2FkaW5nUHJvZ3Jlc3NBcmdzKXtcclxuICAgICAgICBpZihhcmdzLnByb2dyZXNzID09IDApe1xyXG4gICAgICAgICAgICBsZXQgbWVzc2FnZSA9IExvZ2dlcldpZGdldC5sb2FkaW5nRGF0YU1lc3NhZ2U7XHJcbiAgICAgICAgICAgIGlmKGFyZ3MudHlwZSA9PSBEYXRhTG9hZGluZ1Byb2dyZXNzQXJncy5sb2FkRnJvbVRhcmdldFR5cGUpeyAvLyBTaG93ICUgb25seSB3aGlsZSBsb2FkaW5nIGZyb20gdGFyZ2V0KG90aGVyd2lzZSBVSSBpcyBub3QgdXBkYXRpbmcgdGhlICUgdmFsdWVzKVxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSArPSBhcmdzLnByb2dyZXNzICsgXCIlXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihhcmdzLnR5cGUgPT0gRGF0YUxvYWRpbmdQcm9ncmVzc0FyZ3MuZXhwb3J0VG9GaWxlVHlwZSl7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gTG9nZ2VyV2lkZ2V0LmV4cG9ydGluZ0RhdGFNZXNzYWdlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoYXJncy50eXBlID09IERhdGFMb2FkaW5nUHJvZ3Jlc3NBcmdzLmxvYWRSZXNvdXJjZXNUeXBlKXtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBMb2dnZXJXaWRnZXQubG9hZGluZ1Jlc291cmNlc01lc3NhZ2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZXRCdXN5SW5mb3JtYXRpb24obmV3IEJ1c3lJbmZvcm1hdGlvbihtZXNzYWdlLCBJbWFnZUlkLmRlZmF1bHRJbWFnZSwgNDgsIHRydWUpKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRCdXN5KHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGFyZ3MucHJvZ3Jlc3MgPT0gMTAwKXtcclxuICAgICAgICAgICAgdGhpcy5zZXRCdXN5KGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSBMb2dnZXJXaWRnZXQubG9hZGluZ0RhdGFNZXNzYWdlO1xyXG4gICAgICAgICAgICBpZihhcmdzLnR5cGUgPT0gRGF0YUxvYWRpbmdQcm9ncmVzc0FyZ3MubG9hZEZyb21UYXJnZXRUeXBlKXsgLy8gU2hvdyAlIG9ubHkgd2hpbGUgbG9hZGluZyBmcm9tIHRhcmdldChvdGhlcndpc2UgVUkgaXMgbm90IHVwZGF0aW5nIHRoZSAlIHZhbHVlcylcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgKz0gYXJncy5wcm9ncmVzcyArIFwiJVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoYXJncy50eXBlID09IERhdGFMb2FkaW5nUHJvZ3Jlc3NBcmdzLmV4cG9ydFRvRmlsZVR5cGUpe1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IExvZ2dlcldpZGdldC5leHBvcnRpbmdEYXRhTWVzc2FnZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKGFyZ3MudHlwZSA9PSBEYXRhTG9hZGluZ1Byb2dyZXNzQXJncy5sb2FkUmVzb3VyY2VzVHlwZSl7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gTG9nZ2VyV2lkZ2V0LmxvYWRpbmdSZXNvdXJjZXNNZXNzYWdlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlQnVzeU1lc3NhZ2UobWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19