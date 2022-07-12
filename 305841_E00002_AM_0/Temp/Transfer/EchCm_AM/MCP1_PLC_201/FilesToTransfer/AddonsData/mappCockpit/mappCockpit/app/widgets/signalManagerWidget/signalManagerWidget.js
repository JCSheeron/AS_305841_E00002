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
define(["require", "exports", "../common/treeGridWidgetBase", "../../models/common/signal/serieGroup", "./view/smTreeGridCellEditEvents", "./view/smTreeGridCellEditTemplate", "./view/signalManagerTreeGridToolbar", "../../common/fileProvider", "../../framework/events", "../../common/exportImportHelper", "../common/busyInformation", "../../models/signalManagerDataModel/signalCategory", "../../models/signalManagerDataModel/signalManagerCalculation", "../../models/common/signal/serieContainer", "../../models/common/signal/serieNode", "../common/interfaces/dropInterface", "../common/dragDataObject", "../../models/signalManagerDataModel/signalManagerCalculationInputData", "../../models/signalManagerDataModel/signalManagerCalculationOutputData", "../common/dragDropRepresentation", "../../models/signalManagerDataModel/signalManagerCalculatorType", "../../models/common/series/seriesType", "./helpers/exportHelper", "../common/alertDialog", "../../models/signalManagerDataModel/signalRoot", "./componentDefaultDefinition", "../common/widgetBase", "../../common/persistence/persistDataProvider", "../../common/packageConversion/exportContainer", "../../common/packageConversion/mceConversionError", "../../common/mceExportImport/mceExportImportHelper", "../../framework/componentHub/componentDataHub", "../common/states/cursorStates"], function (require, exports, treeGridWidgetBase_1, serieGroup_1, smTreeGridCellEditEvents_1, smTreeGridCellEditTemplate_1, signalManagerTreeGridToolbar_1, fileProvider_1, events_1, exportImportHelper_1, busyInformation_1, signalCategory_1, signalManagerCalculation_1, serieContainer_1, serieNode_1, dropInterface_1, dragDataObject_1, signalManagerCalculationInputData_1, signalManagerCalculationOutputData_1, dragDropRepresentation_1, signalManagerCalculatorType_1, seriesType_1, exportHelper_1, alertDialog_1, signalRoot_1, componentDefaultDefinition_1, widgetBase_1, persistDataProvider_1, exportContainer_1, mceConversionError_1, mceExportImportHelper_1, componentDataHub_1, cursorStates_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventSerieDoubleClicked = /** @class */ (function (_super) {
        __extends(EventSerieDoubleClicked, _super);
        function EventSerieDoubleClicked() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventSerieDoubleClicked;
    }(events_1.TypedEvent));
    ;
    var EventChangeSize = /** @class */ (function (_super) {
        __extends(EventChangeSize, _super);
        function EventChangeSize() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventChangeSize;
    }(events_1.TypedEvent));
    ;
    var SignalManagerWidget = /** @class */ (function (_super) {
        __extends(SignalManagerWidget, _super);
        function SignalManagerWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._highlightAreaId = "signalManager_Highlighted";
            _this._deleteItemsContent = "This action will permanently delete selected elements.";
            _this._deleteItemsHeader = "Delete recorded data?";
            _this._warningImportingHeader = "Import canceled";
            _this._warningImportingContent = "It is not possible to import one .mce file with other files at the same time.";
            _this._MCEFilesImportedHeader = "Delete all trace data?";
            _this._MCEFilesImportedContent = "Do you want to delete all trace data and import the .mce file?";
            _this._isFirstResize = true;
            _this._indexesDragged = [];
            _this._fileProvider = new fileProvider_1.FileProvider();
            _this.editModeActive = false;
            _this._widthDifference = 450;
            _this._minWidth = 250;
            _this.eventSerieDoubleClicked = new EventSerieDoubleClicked();
            _this.eventChangeSize = new EventChangeSize();
            _this._uploadDataFinishedHandler = function (sender, args) { return _this.onUploadDataFinished(sender, args); };
            return _this;
        }
        Object.defineProperty(SignalManagerWidget.prototype, "autoUploadActive", {
            /**
             * Gets the information if the auto upload of tracedata is active
             *
             * @readonly
             * @type {boolean}
             * @memberof SignalManagerWidget
             */
            get: function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Defines the height of the header
         *
         * @returns {number}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.defineHeaderHeight = function () {
            return 30;
        };
        SignalManagerWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
        };
        SignalManagerWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            this.initSignalManagerDataModel();
            this.initSeriesProvider();
            this.initChartManagerDataModel();
            this.refresh();
            _super.prototype.setHeaderContent.call(this, "Signals");
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 0, 40);
            // Initialize scrollbars positions
            var scrollbarSettings = this.component.getSetting(treeGridWidgetBase_1.TreeGridWidgetBase.ScrollbarsSettingsId);
            this.setScrollBarSettings(scrollbarSettings);
            // Add drag support
            _super.prototype.addDraggingSupport.call(this);
            // Add drop support
            _super.prototype.addSupportedDragDropDataId.call(this, dropInterface_1.DragDropDataId.signal);
        };
        SignalManagerWidget.prototype.dispose = function () {
            this.removeSupportedDragDropDataId(dropInterface_1.DragDropDataId.signal);
            _super.prototype.dispose.call(this);
        };
        //#region drag support
        SignalManagerWidget.prototype.startDragging = function () {
            if (this._currentDragDropSeries != undefined) {
                var signalImage = void 0, signalName = void 0;
                var imageProvider = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.ImageProviderId);
                if (this._currentDragDropSeries.length == 1) {
                    // Default yt series svg
                    signalName = this._currentDragDropSeries[0].name;
                    if (imageProvider != undefined) {
                        signalImage = imageProvider.getImage("../app/widgets/common/style/images/dragDrop/ytSeries.svg");
                        if (this._currentDragDropSeries[0].type == seriesType_1.SeriesType.xySeries) {
                            // Use xy series svg
                            signalImage = imageProvider.getImage("../app/widgets/common/style/images/dragDrop/xySeries.svg");
                        }
                        else if (this._currentDragDropSeries[0].type == seriesType_1.SeriesType.fftSeries) {
                            // Use fft series svg
                            signalImage = imageProvider.getImage("../app/widgets/common/style/images/dragDrop/fftSeries.svg");
                        }
                        if (signalImage != undefined) {
                            // Replace serie color in svg with color of current serie
                            signalImage = signalImage.replace("stroke:#76bea6", "stroke:" + this._currentDragDropSeries[0].color);
                        }
                    }
                }
                else {
                    if (imageProvider != undefined) {
                        if (this._currentDragDropSeries[0].type == seriesType_1.SeriesType.xySeries) {
                            signalImage = imageProvider.getImage("../app/widgets/common/style/images/dragDrop/severalXYSeries.svg");
                        }
                        else if (this._currentDragDropSeries[0].type == seriesType_1.SeriesType.fftSeries) {
                            signalImage = imageProvider.getImage("../app/widgets/common/style/images/dragDrop/severalFFTSeries.svg");
                        }
                        else {
                            signalImage = imageProvider.getImage("../app/widgets/common/style/images/dragDrop/severalYTSeries.svg");
                        }
                    }
                }
                var dragDropIconRepresentation = new dragDropRepresentation_1.DragDropRepresentation();
                dragDropIconRepresentation.iconList.push(signalImage);
                dragDropIconRepresentation.textList.push(signalName);
                return new dragDataObject_1.DragDropDataObject(dropInterface_1.DragDropDataId.signal, this._currentDragDropSeries, dragDropIconRepresentation);
            }
            return undefined;
        };
        SignalManagerWidget.prototype.draggingStopped = function () {
            // Reset current drag drop signal
            this._currentDragDropSeries = undefined;
            this._currentCalculatorType = undefined;
            this._indexesDragged = [];
        };
        //#endregion
        //#region drop support
        SignalManagerWidget.prototype.addDropLocations = function (series) {
            if (series[0].parent != undefined && series.length == 1) {
                series[0].parent.visibleChilds.forEach(function (child) {
                    if (child instanceof signalManagerCalculation_1.SignalManagerCalculation) {
                        child.setDropLocations(true, series[0]);
                    }
                });
            }
        };
        SignalManagerWidget.prototype.removeDropLocations = function (series) {
            if (series[0].parent != undefined && series.length == 1) {
                series[0].parent.visibleChilds.forEach(function (child) {
                    if (child instanceof signalManagerCalculation_1.SignalManagerCalculation) {
                        child.setDropLocations(false, series[0]);
                    }
                });
            }
        };
        SignalManagerWidget.prototype.dragStart = function (args) {
            var series = args.data;
            // Add possible dropLocations
            this.addDropLocations(series);
            // Update treeGrid
            this.refresh();
            var treeGridObj = this.getTreeGridObject();
            this.updateSerieSelection(treeGridObj, this._indexesDragged);
        };
        SignalManagerWidget.prototype.dragStop = function (args) {
            var series = args.data;
            // Remove possible dropLocations
            this.removeDropLocations(series);
            // Update treeGrid
            this.refresh();
            var treeGridObj = this.getTreeGridObject();
            this.updateSerieSelection(treeGridObj, this._indexesDragged);
        };
        SignalManagerWidget.prototype.dragOver = function (args) {
            var calculationInputItem = this.getCalculationInputFromDropLocation(args.currentTarget);
            if (calculationInputItem != undefined && calculationInputItem.dropPossible == true) {
                this.addHighlightedArea(args.currentTarget);
                return true;
            }
            else {
                this.resetHighlightArea();
            }
            return false;
        };
        SignalManagerWidget.prototype.drop = function (args) {
            var series = args.data[0];
            var calculationInputTarget = this.getCalculationInputFromDropLocation(args.currentTarget);
            var calculationInputDraggedItem = this.getCalculationInputDragged(series);
            if (calculationInputTarget != undefined && calculationInputTarget.dropPossible == true) {
                if (series != undefined) {
                    //Exchange of serie if the dragged serie is inside the calculator
                    if (this._currentCalculatorType == calculationInputTarget.parent && calculationInputDraggedItem != undefined) {
                        var oldValue = calculationInputTarget.value;
                        calculationInputDraggedItem.value = oldValue;
                    }
                    calculationInputTarget.value = series.name;
                }
            }
        };
        /**
         * Adds a <div> into the cell when droppable is possible and signal is being dragged over
         *
         * @private
         * @param {*} currentTarget
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.addHighlightedArea = function (currentTarget) {
            var highlightElem = $('<div id="' + this._highlightAreaId + '" style=" pointer-events:none; position:absolute; " class="draggedOver"></div>');
            this.resetHighlightArea(highlightElem);
            $(currentTarget).append(highlightElem);
            highlightElem.offset({ top: $(currentTarget).offset().top, left: $(currentTarget).offset().left });
            highlightElem.css('height', currentTarget.offsetHeight);
            highlightElem.css('width', currentTarget.offsetWidth);
        };
        /**
         * Remove all signalManager highlighted areas (except the selected one)
         *
         * @private
         * @param {JQuery<HTMLElement>} [element]
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.resetHighlightArea = function (element) {
            var highlightElem = $('#' + this._highlightAreaId);
            for (var i = 0; i < highlightElem.length; i++) {
                if (element == undefined || highlightElem[i] != element[0]) {
                    highlightElem[i].remove();
                }
            }
        };
        SignalManagerWidget.prototype.getCalculationInputFromDropLocation = function (currentTarget) {
            var record = this.getTreeRecord(currentTarget);
            if (record != undefined) {
                if (record.item instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData && currentTarget.classList.value.includes('dropLocationArea')) {
                    return record.item;
                }
            }
            return undefined;
        };
        SignalManagerWidget.prototype.getCalculationInputDragged = function (serie) {
            if (this._currentCalculatorType != undefined) {
                for (var i = 0; i < this._currentCalculatorType.getChilds().length; i++) {
                    if (this._currentCalculatorType.getChilds()[i].serie == serie) {
                        return this._currentCalculatorType.getChilds()[i];
                    }
                }
            }
            return undefined;
        };
        //#endregion
        /**
         * Creates the layout of the widget
         *
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.createLayout = function () {
            this.mainDiv.style.overflow = "hidden";
            _super.prototype.createLayout.call(this);
        };
        SignalManagerWidget.prototype.initSignalManagerDataModel = function () {
            var dataModel = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.SignalManagerDataModelId);
            this.dataModel = dataModel;
        };
        SignalManagerWidget.prototype.initSeriesProvider = function () {
            this._seriesProvider = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.SeriesProviderId);
        };
        SignalManagerWidget.prototype.initChartManagerDataModel = function () {
            this._chartManagerDataModel = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.ChartManagerDataModelId);
        };
        /**
         * Handles the model changes
         *
         * @param {IDataModel} sender
         * @param {EventModelChangedArgs} eventArgs
         * @returns {*}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.handleModelChanged = function (sender, eventArgs) {
            this.refresh();
            this.saveTreeGridSettings();
        };
        /**
         * Resizes the signal manager widget
         *
         * @param {number} width
         * @param {number} height
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.resize = function (width, height) {
            if (this._isFirstResize && this.editModeActive) {
                //Deactivate editMode and set correct width when widget is initialized
                this._isFirstResize = false;
                this.activateEditMode(false);
            }
            else {
                this._isFirstResize = false;
                _super.prototype.resize.call(this, width, height);
            }
        };
        /**
     * Sets the selection to the given series
     *
     * @private
     * @param {*} treeGridObject
     * @param {Array<number>} indexes
     * @memberof SignalManagerWidget
     */
        SignalManagerWidget.prototype.updateSerieSelection = function (treeGridObject, indexes) {
            // deselect all selections in signal pane
            treeGridObject.clearSelection();
            if (indexes[0] == undefined) {
                return;
            }
            for (var i = 0; i < indexes.length; i++) {
                treeGridObject._multiSelectCtrlRequest = true;
                var visibleIndex = 0;
                for (var j = 0; j < treeGridObject.model.flatRecords.length; j++) {
                    if (j == indexes[i]) {
                        treeGridObject.selectRows(visibleIndex);
                    }
                    if (treeGridObject.model.flatRecords[j].visible != "false") {
                        visibleIndex++;
                    }
                }
            }
        };
        ;
        /**
         * Refreshes the tree grid
         *
         * @private
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.refresh = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    try {
                        if (this.refreshEnabled) {
                            this.setModelWithEditSupport(this.dataModel.data);
                        }
                    }
                    catch (e) {
                        console.info("SignalManager refresh error! => TreeGrid recreation!");
                        console.info(e);
                        this.createTreeGrid();
                    }
                    return [2 /*return*/];
                });
            });
        };
        /**
         * Creates the column templates for the tree grid and adds them to the widget container
         *
         * @protected
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.createTemplates = function () {
            var $widgetContainer = $(this.mainDiv);
            $widgetContainer.append(this.getColumnTemplateData(SignalManagerWidget.nameColumnId));
            $widgetContainer.append(this.getColumnTemplateData(SignalManagerWidget.colorColumnId));
        };
        /**
         * Creates the tree grid for the signal manager
         *
         * @protected
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.createTreeGrid = function () {
            var _this = this;
            $(this.mainDiv).ejTreeGrid(__assign(__assign(__assign(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridColumnResizeSupport()), this.getTreeGridToolbarSupport()), this.getTreeGridCellEditSupport()), this.getTreeGridDragDropSupport()), { dataSource: this.dataModel.data, childMapping: "visibleChilds", expandStateMapping: "expandState", allowReordering: false, rowHeight: 28, selectionSettings: {
                    selectionType: 'multiple'
                }, selectionType: 'multiple', expanded: function (args) { return _this.treeGridNodeExpandedOrCollapsed(); }, collapsed: function (args) { return _this.treeGridNodeExpandedOrCollapsed(); }, recordClick: function (args) { return _this.click(args); }, recordDoubleClick: function (args) { return _this.doubleClick(args); }, rowSelected: function (args) { return _this.rowSelected(args.data.item, args.model.currentViewData); }, create: function (args) { return _this.treeGridCreated(); }, actionBegin: function (args) { return _this.treeGridActionBegin(args); }, actionComplete: function (args) { return _this.treeGridActionComplete(args); }, queryCellInfo: function (args) { return _this.treeGridQueryCellInfo(args); } }));
        };
        /**
         * Returns the tree grid column definition
         *
         * @private
         * @returns {{}}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getTreeGridColumnDefinition = function () {
            return {
                columns: [
                    { field: SignalManagerWidget.nameColumnId, headerText: "Name", width: "351px", isTemplateColumn: true, templateID: "smNameColumnTemplate" },
                    { field: SignalManagerWidget.valueColumnId, headerText: "Value", visible: this.editModeActive, width: "300px", editTemplate: smTreeGridCellEditTemplate_1.SmTreeGridCellEditTemplate.createInstance(), isTemplateColumn: true },
                    { field: SignalManagerWidget.descriptionColumnId, headerText: "Description", visible: this.editModeActive, width: "100px" },
                    { field: SignalManagerWidget.colorColumnId, headerText: "Color", width: "50px", visible: this.editModeActive, editType: "DatePicker", editTemplate: smTreeGridCellEditTemplate_1.SmTreeGridCellEditTemplate.createInstance(), isTemplateColumn: true, templateID: "smColorColumnTemplate" },
                    { field: SignalManagerWidget.iconDefinitionColumnId, visible: false, width: "0px" },
                ],
            };
        };
        /**
         * Returns the tree grid column resize settings
         *
         * @private
         * @returns {{}}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getTreeGridColumnResizeSupport = function () {
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
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.treeGridColumnResized = function (args) {
            _super.prototype.resizeDynamicColumn.call(this, args.columnIndex, args.model);
            this.saveTreeGridSettings();
        };
        /**
         * Returns the tree grid toolbar settings
         *
         * @private
         * @returns {{}}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getTreeGridToolbarSupport = function () {
            this._toolbar = new signalManagerTreeGridToolbar_1.SignalManagerTreeGridToolbar(this.mainDiv);
            return _super.prototype.getTreeGridToolbarSupport.call(this);
        };
        /**
         * Returns the tree grid cell edit settings
         *
         * @private
         * @returns {{}}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getTreeGridCellEditSupport = function () {
            var _this = this;
            var cellEditEvents = new smTreeGridCellEditEvents_1.SmTreeGridCellEditEvents();
            return {
                editSettings: { allowEditing: true },
                beginEdit: function (args) { return cellEditEvents.beginEdit(args, _this); },
                endEdit: function (args) { return cellEditEvents.endEdit(args, _this); },
            };
        };
        /**
         * Activates the signal manager drag and drop support
         *
         * @private
         * @returns {{}}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getTreeGridDragDropSupport = function () {
            var _this = this;
            return {
                allowDragAndDrop: true,
                rowDragStart: function (args) { return _this.rowDragStart(args); },
            };
        };
        /**
         * Switch into "edit mode" or "normal mode"
         * if edit mode is active, the edit mode will be set to the datamodel, and the widget size will be increased
         * if normal mode is active, the normal mode will be set to the datamodel, and the widget size will be decreased
         *
         * @private
         * @param {boolean} active
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.setEditMode = function (active) {
            if (this.editModeActive != active) {
                if (active == true) {
                    this.onChangeSize(this._actualWidth + this._widthDifference);
                }
                else {
                    var newSize = this._actualWidth - this._widthDifference;
                    if (newSize < this._minWidth) {
                        newSize = this._minWidth;
                    }
                    this.onChangeSize(newSize);
                }
            }
            this.editModeActive = active;
            this.dataModel.editModeActive = this.editModeActive;
            this._toolbar.activateEditModeButton(this.editModeActive);
        };
        /**
         * Well be called after some tree grid action was started
         *
         * @private
         * @param {*} args
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.treeGridActionBegin = function (args) {
            // Support "Entf/Del" key
            if (args.requestType == "delete") {
                args.cancel = true;
                if (this.containsItemWithinRecentOrUploaded(args.deletedItems)) {
                    this.showMessageBoxForDeletingItem(args.deletedItems);
                }
                else {
                    this.deleteItems(args.deletedItems);
                }
            }
        };
        /**
         * Loads the styles for the chart manager widget
         *
         * @memberof ChartManagerWidget
         */
        SignalManagerWidget.prototype.loadStyles = function () {
            _super.prototype.loadStyles.call(this);
            _super.prototype.addStyle.call(this, "widgets/common/style/css/dropDownMenuStyle.css");
        };
        /**
         * Well be called after some tree grid action was completed
         *
         * @private
         * @param {*} args
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.treeGridActionComplete = function (args) {
            // Event trigger while changing datasource dynamically. 
            // code to done after the dynamic change of datasource. 
            if (args.requestType === 'refreshDataSource') {
                this.refreshSelection();
                if (this._serieContainerToSelectAfterRefresh != undefined) {
                    // Selects the imported signalfile, or the inserted calculation, ...
                    this.selectItem(this._serieContainerToSelectAfterRefresh);
                    this._serieContainerToSelectAfterRefresh = undefined;
                }
            }
        };
        /**
         * Will be called to update the style of the give cell if a refresh will be needed
         *
         * @private
         * @param {*} args
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.treeGridQueryCellInfo = function (args) {
            if (args.column.field == "name") {
                if (this.isGroupItem(args.data.item)) {
                    // Show group nodes always bold => also if they have no childs
                    if (args.cellElement.style != undefined) {
                        if (args.data.level == 0) {
                            args.cellElement.style.fontWeight = "800"; // 700 would be bold
                        }
                        else {
                            args.cellElement.style.fontWeight = "650";
                        }
                    }
                }
                // Show all nodes red which have invalid signals in it 
                if (this.isItemInvalid(args.data.item) == true) {
                    if (args.cellElement.style != undefined) {
                        args.cellElement.style.color = "red";
                        args.cellElement.style.fontWeight = "bold";
                        //args.cellElement.innerText = args.cellElement.innerText + "(invalid)";
                    }
                }
            }
            else if (args.column.field == "value") {
                if (args.data.dropPossible == true) {
                    args.cellElement.classList.add("dropLocationArea");
                }
            }
        };
        /**
         * Has the given item some data and is this data valid
         *
         * @private
         * @param {*} item
         * @returns {boolean}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.isItemInvalid = function (item) {
            if (item instanceof signalManagerCalculation_1.SignalManagerCalculation) {
                var calculatedSignals = item.getSeries();
                // check if a calculated output signal is invalid
                for (var i = 0; i < calculatedSignals.length; i++) {
                    if (calculatedSignals[i].rawPointsValid == false) {
                        return true;
                    }
                }
            }
            else if (item instanceof serieNode_1.SerieNode) {
                if (item.serie != undefined && item.serie.rawPointsValid == false) {
                    if (item instanceof signalManagerCalculationOutputData_1.SignalManagerCalculationOutputData) {
                        return true;
                    }
                    else {
                        return true;
                    }
                }
            }
            return false;
        };
        /**
         * A drag and drop operation was started
         *
         * @private
         * @param {*} args
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.rowDragStart = function (args) {
            this._indexesDragged = [];
            var selectedElements = this.checkSelectedElements(args.draggedRecords, args.draggedRow);
            if (selectedElements.length > 0) {
                this._currentDragDropSeries = selectedElements;
                // Set current drag drop signal
            }
            else {
                this._currentDragDropSeries = undefined; // Reset current drag drop signal
            }
            // Resets dragged Records because the tree grid drag drop is canceled(general drag drop is used after collection the drag object data here)
            // If dragged Records will not be resetet the next drag drop records will be added to the current records
            // args.draggedRecords = []; // Not working, we have to reset it directly in the tree grid object
            this.clearDraggedRecords();
            args.cancel = true;
        };
        SignalManagerWidget.prototype.refreshSelection = function () {
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
            var areElementsExportable = this.canItemsBeExported(treeObj.model.flatRecords);
            // update toolbar buttons
            if (treeObj.model.flatRecords[actualSelectedRowIndex] != undefined) {
                this.updateToolbarButtonStates(treeObj.model.flatRecords[actualSelectedRowIndex].item, areElementsExportable);
            }
            else {
                this.updateToolbarButtonStates(undefined, areElementsExportable);
            }
        };
        SignalManagerWidget.prototype.rowSelected = function (item, currentViewData) {
            var areElementsExportable = this.canItemsBeExported(currentViewData);
            this.updateToolbarButtonStates(item, areElementsExportable);
        };
        /**
         * updates the toolbar buttons(e.g. insert calulation only enabled on SerieGroup or under "Calculated signals" category)
         *
         * @private
         * @param {ISerieNode} item
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.updateToolbarButtonStates = function (item, areElementsExportable) {
            var toolbar = this._toolbar;
            if (item == undefined) {
                toolbar.disableInsertCalculationButton(true);
                toolbar.disableDeleteButton(true);
            }
            else {
                // set delete button state
                toolbar.disableDeleteButton(!item.canDelete);
                if (item instanceof serieGroup_1.SerieGroup) {
                    toolbar.disableExportButton(false);
                    toolbar.disableInsertCalculationButton(false);
                }
                else {
                    if (item.getSerieGroup() == undefined) {
                        toolbar.disableInsertCalculationButton(true);
                        toolbar.disableExportButton(true);
                    }
                    else if (item instanceof signalManagerCalculatorType_1.SignalManagerCalculatorType && item.name == 'Algorithm' || item instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData && item.serie == undefined ||
                        ((item instanceof signalManagerCalculation_1.SignalManagerCalculation || item instanceof signalManagerCalculationOutputData_1.SignalManagerCalculationOutputData) && (item.serie == undefined || item.serie.rawPointsValid == false))) {
                        toolbar.disableInsertCalculationButton(false);
                        toolbar.disableExportButton(true);
                    }
                    else {
                        toolbar.disableExportButton(false);
                        toolbar.disableInsertCalculationButton(false);
                    }
                }
            }
            if (areElementsExportable) {
                toolbar.disableExportButton(false);
            }
            else {
                toolbar.disableExportButton(true);
            }
        };
        SignalManagerWidget.prototype.canItemsBeExported = function (items) {
            var canBeExported = false;
            var exportHelper = new exportHelper_1.ExportHelper();
            for (var i = 0; i < items.length; i++) {
                if (exportHelper.isElementExportable(items[i].item) === true) {
                    canBeExported = true;
                    break;
                }
            }
            return canBeExported;
        };
        /**
         * A click on the tree grid (needed for reseting the current drag drop signal)
         *
         * @private
         * @param {*} args
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.click = function (args) {
            // Reset current drag drop signal after click was finished(click up)
            this._currentDragDropSeries = undefined;
            this.focus();
        };
        /**
         * A double click on the tree grid was done
         *
         * @private
         * @param {*} args
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.doubleClick = function (args) {
            if (args.cellIndex == 0) {
                var serieNode = args.data.item;
                var foundSeries = this.getSeriesFromItem(serieNode);
                if (foundSeries.length > 0) {
                    // Only one serie can be added by double click currently(TODO: add multi insert)
                    this.onSeriesDoubleClicked(foundSeries[0]);
                }
            }
        };
        /**
         * Checks if all elements selected are series and of the same type
         *
         * @private
         * @param {*} elements
         * @param {*} draggedRow
         * @returns {Array<BaseSeries>}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.checkSelectedElements = function (elements, draggedRow) {
            var series = new Array();
            var items = new Array();
            var draggedRowIsSelected = false;
            var invalidSelection = false;
            if (draggedRow == undefined || draggedRow.serie == undefined) {
                return [];
            }
            var type = draggedRow.serie.type;
            for (var i = 0; i < elements.length; i = i + 1) {
                if (elements[i].serie == undefined || elements[i].serie.type != type) {
                    invalidSelection = true;
                }
                if (elements[i] == draggedRow) {
                    draggedRowIsSelected = true;
                }
                series.push(elements[i].serie);
                items.push(elements[i]);
            }
            if (draggedRow.item instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData) {
                this._currentCalculatorType = draggedRow.parent;
            }
            //Once all elements have been checked, select correct elements according to the exceptions
            if (!draggedRowIsSelected) {
                series = [];
                series.push(draggedRow.serie);
                this._indexesDragged = [];
                this._indexesDragged.push(draggedRow.index);
            }
            else if (invalidSelection) {
                return [];
            }
            else {
                series = this.deleteEqualSignals(series, items);
            }
            return series;
        };
        /**
         * Delete duplicated signals from the drag&drop array
         *
         * @private
         * @param {Array<BaseSeries>} series
         * @param {*} elements
         * @returns
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.deleteEqualSignals = function (series, elements) {
            for (var i = 0; i < series.length; i++) {
                if (elements[i].item instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData) {
                    var selectedItems = Object.assign([], series);
                    selectedItems.splice(i, 1);
                    if (selectedItems.includes(series[i])) {
                        series.splice(i, 1);
                        elements.splice(i, 1);
                        i = -1;
                    }
                }
            }
            for (var i = 0; i < elements.length; i++) {
                this._indexesDragged.push(elements[i].index);
            }
            return series;
        };
        /**
         * Returns all series which were found in the serie node item(e.g. a normal serie or calculated series)
         *
         * @private
         * @param {*} item
         * @returns {Array<BaseSeries>}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getSeriesFromItem = function (item) {
            var signals = new Array();
            if (item instanceof serieNode_1.SerieNode && item.serie != undefined) { // Is Signal node
                signals.push(item.serie);
            }
            else if (item instanceof serieContainer_1.SerieContainer) { // is calculation(group node) with signals
                return item.getSeries();
            }
            return signals;
        };
        /**
         * Is the given item a group item (e.g. needed for setting the font style to bold)
         *
         * @private
         * @param {ISerieContainer} item
         * @returns
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.isGroupItem = function (item) {
            if (item == undefined) {
                return false;
            }
            if (item.visibleChilds != undefined) {
                return true;
            }
            return false;
        };
        SignalManagerWidget.prototype.insertCalculation = function (item) {
            if (item == undefined) {
                return;
            }
            var selectedItem = item.item;
            var serieGroup;
            if (selectedItem instanceof serieGroup_1.SerieGroup || selectedItem instanceof signalCategory_1.SignalCategory) {
                // Calculation can only be insert at groups or categories
                serieGroup = selectedItem;
            }
            else {
                serieGroup = selectedItem.getSerieGroup();
            }
            if (serieGroup != undefined) {
                this.activateEditMode(true);
                return this.addCalculationToContainer(serieGroup);
            }
            return undefined;
        };
        SignalManagerWidget.prototype.addCalculationToContainer = function (container) {
            if (this._seriesProvider == undefined) {
                return undefined;
            }
            var calculation = new signalManagerCalculation_1.SignalManagerCalculation("Calculation", this._seriesProvider);
            this._serieContainerToSelectAfterRefresh = calculation;
            container.addSerieContainer(calculation, -1);
            return calculation;
        };
        SignalManagerWidget.prototype.getComponentSettings = function (onlyModified) {
            this.component.setSetting(widgetBase_1.WidgetBase.WidgetSettingId, this.getWidgetSettings());
            return _super.prototype.getComponentSettings.call(this, onlyModified);
        };
        SignalManagerWidget.prototype.setComponentSettings = function (data) {
            _super.prototype.setComponentSettings.call(this, data);
            this.setWidgetSettings(this.component.getSetting(widgetBase_1.WidgetBase.WidgetSettingId));
        };
        SignalManagerWidget.prototype.getWidgetSettings = function () {
            var settings = { "editModeActive": this.editModeActive,
                "width": this._actualWidth
            };
            return settings;
        };
        SignalManagerWidget.prototype.setWidgetSettings = function (data) {
            if (data == undefined) {
                return;
            }
            this.editModeActive = (data["editModeActive"]);
            this._actualWidth = data["width"];
        };
        SignalManagerWidget.prototype.activateEditMode = function (activate) {
            // Show or hide edit mode columns
            var treeObject = this.getTreeGridObject();
            var valueColumn = treeObject.getColumnByField(SignalManagerWidget.valueColumnId);
            var descriptionColumn = treeObject.getColumnByField(SignalManagerWidget.descriptionColumnId);
            var colorColumn = treeObject.getColumnByField(SignalManagerWidget.colorColumnId);
            if (activate == true) {
                treeObject.showColumn(valueColumn.headerText);
                treeObject.showColumn(descriptionColumn.headerText);
                treeObject.showColumn(colorColumn.headerText);
            }
            else {
                treeObject.hideColumn(valueColumn.headerText);
                treeObject.hideColumn(descriptionColumn.headerText);
                treeObject.hideColumn(colorColumn.headerText);
            }
            this.setEditMode(activate);
            this.refresh();
            persistDataProvider_1.PersistDataProvider.getInstance().setDataWithId(this.component.id, this.getComponentSettings(true));
        };
        /**
         * Returns true if one of the items deleted has been done through the trace of mappCockpit
         *
         * @param {*} selectedItems
         * @returns {boolean}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.containsItemWithinRecentOrUploaded = function (selectedItems) {
            for (var i = 0; i < selectedItems.length; i++) {
                if (this.isItemInSignalCategory(selectedItems[i].item, signalCategory_1.SignalCategory.CategoryIdUploaded) || this.isItemInSignalCategory(selectedItems[i].item, signalCategory_1.SignalCategory.CategoryIdRecent)) {
                    return true;
                }
            }
            return false;
        };
        /**
         * Returns true if the item selected belongs to the signal category selected
         *
         * @private
         * @param {ISerieNode | ISerieContainer} item
         * @param {string} signalCategoryId
         * @returns {boolean}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.isItemInSignalCategory = function (item, signalCategoryId) {
            var parent = item.parent;
            if (parent instanceof signalCategory_1.SignalCategory && parent.id == signalCategoryId) {
                return true;
            }
            else if (!(parent instanceof signalRoot_1.SignalRoot)) {
                return this.isItemInSignalCategory(parent, signalCategoryId);
            }
            else {
                return false;
            }
        };
        /**
         * Shows message box according to type
         *
         * @private
         * @param {messageBoxType} type
         * @param {Map<string, string>} fileContents
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.showMessageBox = function (type, fileContents) {
            if (type === alertDialog_1.messageBoxType.Warning) {
                this.showWarningWhenImportingFiles();
            }
            else if (type === alertDialog_1.messageBoxType.YesNo) {
                this.showMessageBoxWhenImportingMCEFiles(fileContents);
            }
        };
        /**
         * Creates a warning message when the user imports a .mce file and other files too
         *
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.showWarningWhenImportingFiles = function () {
            new alertDialog_1.AlertDialog().createMessageBox(this._warningImportingHeader, this._warningImportingContent, alertDialog_1.messageBoxType.Warning, undefined);
        };
        /**
         * Creates a message box that lets user decide to delete selected data or not
         *
         * @param {*} deletedItems
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.showMessageBoxForDeletingItem = function (deletedItems) {
            var deferred = jQuery.Deferred();
            var self = this;
            new alertDialog_1.AlertDialog().createMessageBox(this._deleteItemsHeader, this._deleteItemsContent, alertDialog_1.messageBoxType.CancelDelete, deferred);
            $.when(deferred).done(function () {
                self.deleteItems(deletedItems);
            });
        };
        /**
         * Creates a message box that lets user decide to import .mce file nad delete all data or not
         *
         * @private
         * @param {Map<string, string>} fileContents
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.showMessageBoxWhenImportingMCEFiles = function (fileContents) {
            var deferred = jQuery.Deferred();
            var self = this;
            new alertDialog_1.AlertDialog().createMessageBox(this._MCEFilesImportedHeader, this._MCEFilesImportedContent, alertDialog_1.messageBoxType.YesNo, deferred);
            $.when(deferred).done(function () {
                self.startImport(fileContents);
            });
        };
        /**
         * Delete selected items
         *
         * @param {*} items
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.deleteItems = function (items) {
            this.enableTreeGridRefresh(false);
            for (var i = 0; i < items.length; i++) {
                this.deleteItem(items[i].item);
            }
            this.enableTreeGridRefresh(true);
            //Refresh treegrid just when all items have been deleted
            this.refresh();
        };
        /**
         * Delete a specific item
         *
         * @private
         * @param {*} item
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.deleteItem = function (item) {
            if (item.canDelete) {
                if (item instanceof serieContainer_1.SerieContainer) {
                    this.removeSerieContainer(item);
                }
                else {
                    this.removeSerieNode(item);
                }
            }
        };
        /**
         *  Remove the signal container with all sub containers and signals from datamodel
         *
         * @private
         * @param {ISerieContainer} serieGroup
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.removeSerieContainer = function (serieGroup) {
            this._dataModel.removeSerieContainer(serieGroup);
        };
        /**
         * Removes the signal from datamodel
         *
         * @private
         * @param {ISerieNode} serieNode
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.removeSerieNode = function (serieNode) {
            this._dataModel.removeSerieNode(serieNode);
        };
        /**
         * Exports a serieGroup
         *
         * @public
         * @param {Array<ExportSerieGroup>} elements
         * @memberof SignalManagerTreeGrid
         */
        SignalManagerWidget.prototype.exportSerieGroup = function (elements) {
            var _this = this;
            this.setBusyInformation(new busyInformation_1.BusyInformation("Exporting data...", busyInformation_1.ImageId.defaultImage, 48, true));
            this.setBusy(true);
            // Timeout needed to show the busyscreen before exporting data 
            setTimeout(function () { return _this.exportCsvData(elements); }, 200);
        };
        /**
         * Opens a file select dialog and imports a serieGroup from the file
         *
         * @public
         * @memberof SignalManagerTreeGrid
         */
        SignalManagerWidget.prototype.importSerieGroup = function () {
            this._serieContainerToSelectAfterRefresh = undefined;
            this._fileProvider.eventUploadDataFinished.attach(this._uploadDataFinishedHandler);
            this._fileProvider.uploadData(".csv, .mce, .mce1", true); // Only show/accept *.csv, *.mce, *.mce1 files
        };
        SignalManagerWidget.prototype.exportSignalManagerData = function () {
            var _this = this;
            this.setBusyInformation(new busyInformation_1.BusyInformation("Exporting data...", busyInformation_1.ImageId.defaultImage, 48, true));
            this.setBusy(true);
            // Timeout needed to show the busyscreen before exporting data 
            setTimeout(function () { return _this.exportData(); }, 200);
        };
        /**
         * Occurs after reading data from file(trace import data)
         *
         * @private
         * @param {HTMLInputElement} sender
         * @param {Map<string, string>} args
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.onUploadDataFinished = function (sender, args) {
            this.setBusyInformation(new busyInformation_1.BusyInformation("Importing data...", busyInformation_1.ImageId.defaultImage, 48, true));
            var msgBoxType = this.checkMessageBoxType(args);
            if (msgBoxType != undefined) {
                this.showMessageBox(msgBoxType, args);
            }
            else {
                this.startImport(args);
            }
            this._fileProvider.eventUploadDataFinished.detach(this._uploadDataFinishedHandler);
        };
        /**
         * Exports the given signal group to TraceData.csv file
         *
         * @private
         * @param { Array<ExportSerieGroup>} elements
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.exportCsvData = function (elements) {
            var data;
            if (this._seriesProvider != undefined) {
                data = new exportImportHelper_1.ExportImportHelper(this._seriesProvider).exportTraceData(elements);
            }
            else {
                console.error("SeriesProvider is not available!");
            }
            if (data !== undefined) {
                var blob = new Blob([data], { type: "text/csv" });
                fileProvider_1.FileProvider.downloadData("TraceData.csv", blob);
            }
            this.setBusy(false);
        };
        /**
         * Exports the signal manager data(datamodel, series provider, ...)
         *
         * @private
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.exportData = function () {
            if (this._seriesProvider != undefined) { // SeriesProvider needed to export data
                try {
                    var components = this.getComponentsToExport();
                    var settingObjects = this.getSettingObjectsToExport();
                    var stringData = mceExportImportHelper_1.MceExportImportHelper.getExportData(components, settingObjects);
                    var blob = new Blob([stringData], { type: "text/html" });
                    fileProvider_1.FileProvider.downloadData("Export.mce1", blob);
                }
                catch (e) {
                    if (mceConversionError_1.MceConversionError.isMceConversionError(e)) {
                        console.error(e.toString());
                    }
                    else {
                        console.error(e);
                    }
                }
            }
            else {
                console.error("SeriesProvider for export not available!");
            }
            this.setBusy(false);
        };
        /**
         * Returns the components in a defined order which should be cleared before importing new setting
         *
         * @private
         * @returns {Array<IComponent>}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getComponentsToClear = function () {
            var componentsToClear = new Array();
            componentsToClear.push(this.dataModel); // SignalManagerDataModel
            if (this._chartManagerDataModel != undefined) {
                componentsToClear.push(this._chartManagerDataModel); // ChartManagerDataModel
            }
            if (this._seriesProvider != undefined) {
                componentsToClear.push(this._seriesProvider); // SeriesProvider must be imported first
            }
            return componentsToClear;
        };
        /**
         * Returns the components which should be exported/imported from the mce file in the given order
         *
         * @private
         * @returns {Array<IComponent>}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getComponentsToExport = function () {
            var exportComponents = new Array();
            if (this._seriesProvider != undefined) {
                exportComponents.push(this._seriesProvider); // SeriesProvider must be imported first
            }
            exportComponents.push(this.dataModel); // SignalManagerDataModel
            if (this._chartManagerDataModel != undefined) {
                exportComponents.push(this._chartManagerDataModel); // ChartManagerDataModel
            }
            return exportComponents;
        };
        /**
         * Returns all settings objects which should be exported
         *
         * @private
         * @returns {Array<ISettingsObject>}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getSettingObjectsToExport = function () {
            var settingsObjects = new Array();
            // get current cursorstates
            var cursorstates = componentDataHub_1.ComponentDataHub.readShared(this, "app::trace view chart states", "cursor states", cursorStates_1.CursorStates);
            settingsObjects.push(cursorstates);
            return settingsObjects;
        };
        /**
         * Sets the busy screen and start importing data
         *
         * @private
         * @param {Map<string, string>} args
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.startImport = function (args) {
            var _this = this;
            this.setBusy(true);
            // Timeout needed to show the busyscreen before importing data 
            setTimeout(function () { return _this.importData(args); }, 200);
        };
        /**
         * imports the given filedata with the given filename to the signal manager datamodel
         *
         * @private
         * @param {Map<string, string>} fileContents
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.importData = function (fileContents) {
            var _this = this;
            fileContents.forEach(function (fileData, filename) {
                if (filename.toLowerCase().endsWith(".csv")) {
                    if (_this._seriesProvider != undefined) {
                        var exportImportHelper = new exportImportHelper_1.ExportImportHelper(_this._seriesProvider);
                        var serieGroups = exportImportHelper.importTraceData(fileData, filename);
                        var signalFile_1 = new serieContainer_1.SerieContainer(filename);
                        _this.setContainerId(signalFile_1);
                        serieGroups.forEach(function (serieGroup) {
                            signalFile_1.addSerieContainer(serieGroup, -1);
                        });
                        _this._serieContainerToSelectAfterRefresh = signalFile_1;
                        _this._dataModel.addSerieContainer(signalFile_1, signalCategory_1.SignalCategory.CategoryIdImported);
                    }
                    else {
                        console.error("SeriesProvider is not available!");
                    }
                }
                else if (filename.toLowerCase().endsWith(".mce") || filename.toLowerCase().endsWith(".mce1")) {
                    try {
                        _this.importMCEFile(fileData);
                    }
                    catch (e) {
                        if (mceConversionError_1.MceConversionError.isMceConversionError(e)) {
                            console.error(e.toString());
                        }
                        else {
                            console.error(e);
                        }
                    }
                }
                else {
                    console.error("Import for file format not implemented: " + filename);
                }
            });
            this.setBusy(false);
        };
        /**
         * Returns type of message box need it (if need it)
         *
         * @private
         * @param {Map<string, string>} fileContents
         * @returns {(messageBoxType | undefined)}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.checkMessageBoxType = function (fileContents) {
            var isSignalManagerEmpty = this.isSignalManagerEmpty(this.dataModel.data);
            var isThereMCEFile = false;
            fileContents.forEach(function (fileData, filename) {
                if (filename.toLowerCase().endsWith(".mce") || filename.toLowerCase().endsWith(".mce1")) {
                    isThereMCEFile = true;
                }
            });
            if (isThereMCEFile && fileContents.size > 1) {
                return alertDialog_1.messageBoxType.Warning;
            }
            else if (isThereMCEFile && !isSignalManagerEmpty) {
                return alertDialog_1.messageBoxType.YesNo;
            }
            else {
                return undefined;
            }
        };
        /**
         * Returns true if there is nothing in the signalManager
         *
         * @private
         * @param {*} data
         * @returns {boolean}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.isSignalManagerEmpty = function (data) {
            var isEmpty = true;
            for (var i = 0; i < data.length; i++) {
                if (data[i].childs.length > 0) {
                    isEmpty = false;
                    break;
                }
            }
            return isEmpty;
        };
        /**
         * Deletes all trace data and imports the .mce file
         *
         * @private
         * @param {*} data
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.importMCEFile = function (fileData) {
            if (this._seriesProvider) { // serie provider needed to import data
                this.enableTreeGridRefresh(false);
                // Clear components with the given order
                var componentsToClear = this.getComponentsToClear();
                mceExportImportHelper_1.MceExportImportHelper.clearComponents(componentsToClear);
                // Set the import data to the components in the given order
                var exportContainer = exportContainer_1.ExportContainer.fromJson(fileData);
                var components = this.getComponentsToExport(); // Import and Export components are the same so we can use the export components array
                var settingObjects = this.getSettingObjectsToExport(); // Import and Export objects are the same so we can use the export settings object array
                mceExportImportHelper_1.MceExportImportHelper.setImportData(components, settingObjects, exportContainer);
                this.enableTreeGridRefresh(true);
                this.refresh();
            }
            else {
                console.error("SeriesProvider for import not available!");
            }
        };
        /**
         * Selects the given container in the tree grid and scrolls to it if out of the window (TODO: Move to BaseClass incl. _serieContainerToSelectAfterRefresh)
         *
         * @private
         * @param {(ISerieContainer|undefined)} container
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.selectItem = function (container) {
            var treeObject = this.getTreeGridObject();
            var record = treeObject.model.flatRecords.filter(function (record) { return record.item === container; })[0];
            if (record != undefined) {
                // expand parent node if it is collapsed to see the new imported trace data
                if (record.parentItem.expandState == false) {
                    treeObject.expandCollapseRow(record.parentItem.index);
                }
                // treeObject.scrollOffset not possible if there would be some free space after the last item in the tree grid after scrolling to the given item
                // => scrollToBottom befor scroll to a special offset if possible
                treeObject.scrollToBottom();
                treeObject.setModel({ "selectedRowIndex": record.index });
                var rowHeight = treeObject.model.rowHeight;
                // scroll index not the same as the selectedIndex => collapsed nodes must be considered
                var scrollIndex = this.getScrollIndex(treeObject.model.flatRecords, record.index);
                var scrollOffset = (scrollIndex - 1) * rowHeight;
                treeObject.scrollOffset(0, scrollOffset); // Use parent index to see the parent node in the view
                //(<any>treeObject).updateScrollBar();
            }
        };
        /**
         * Returns the index of only the visible(expanded) rows
         *
         * @private
         * @param {Array<any>} rows
         * @param {number} rowIndex
         * @returns {number}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getScrollIndex = function (rows, rowIndex) {
            var scrollIndex = 0;
            for (var i = 0; i < rows.length; i++) {
                if (rows[i].index == rowIndex) {
                    scrollIndex++;
                    return scrollIndex;
                }
                /*if(rows[i].item instanceof SerieGroup){
                    if(this.isVisibleSerieGroupNode(rows[i]) == false){
                        continue;
                    }
                    scrollIndex++;
                }
                else */ if (rows[i].item instanceof serieContainer_1.SerieContainer) {
                    if (this.isVisibleSerieGroupNode(rows[i]) == false) {
                        continue;
                    }
                    scrollIndex++;
                }
                else if (rows[i].item instanceof serieNode_1.SerieNode) {
                    if (this.isVisibleSerieNode(rows[i]) == false) {
                        continue;
                    }
                    scrollIndex++;
                }
            }
            return scrollIndex;
        };
        /**
         * Set unique id for imported data
         *
         * @private
         * @param {SerieContainer} serieContainer
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.setContainerId = function (serieContainer) {
            serieContainer.id = this.getUniqueId();
        };
        /**
         * Returns a unique id for the imported serieContainer
         *
         * @private
         * @returns
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getUniqueId = function () {
            var importedDataIds = this.getImportedDataIds();
            for (var i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
                var id = i.toString();
                if (importedDataIds.includes(id) == false) {
                    return id;
                }
            }
            console.error("No unique id for serieContainer available!");
            return "";
        };
        /**
         * Returns an array of all ids from the imported from file category
         *
         * @private
         * @returns {Array<string>}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getImportedDataIds = function () {
            var ids = [];
            var signalCategory = this._dataModel.getSignalCategory(signalCategory_1.SignalCategory.CategoryIdImported);
            signalCategory.getChilds().forEach(function (child) {
                ids.push(child.id);
            });
            return ids;
        };
        SignalManagerWidget.prototype.isVisibleSerieGroupNode = function (node) {
            if (node.parentItem != null) {
                if (node.parentItem.expandState == false) {
                    return false;
                }
                else if (node.parentItem.parentItem != undefined) {
                    if (node.parentItem.parentItem.expandState == false) {
                        return false;
                    }
                }
            }
            return true;
        };
        SignalManagerWidget.prototype.isVisibleSerieNode = function (node) {
            if (node.parentItem.expandState == false || node.parentItem.parentItem.expandState == false) {
                return false;
            }
            else if (node.parentItem.parentItem.parentItem != undefined) {
                if (node.parentItem.parentItem.parentItem.expandState == false) {
                    return false;
                }
            }
            return true;
        };
        SignalManagerWidget.prototype.treeGridNodeExpandedOrCollapsed = function () {
            // Refresh to see correct expanded/collapsed icon
            this.refresh();
            //Persist data model (expandState)
            if (this._dataModel !== undefined) {
                this._dataModel.saveSettings();
            }
            this.saveTreeGridSettings();
        };
        /**
         * Returns the column template informations
         *
         * @private
         * @param {string} columnId
         * @returns {string}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getColumnTemplateData = function (columnId) {
            if (columnId == SignalManagerWidget.colorColumnId) {
                return "<script type=\"text/x-jsrender\" id=\"smColorColumnTemplate\">\n\t\t\t\t\t\t<div style='height:20px;padding-left:7px;padding-top:4px;' unselectable='on'>\n\t\t\t\t\t\t\t<div class='e-cell' style='display:inline-block;width:17px;height:17px;background-color: {{:#data['color']}};' unselectable='on'></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</script>";
            }
            else if (columnId == SignalManagerWidget.nameColumnId) {
                return "<script type=\"text/x-jsrender\" id=\"smNameColumnTemplate\">\n\t\t\t\t\t\t<div style='height:20px;' unselectable='on'>\n\t\t\t\t\t\t\t{{if hasChildRecords}}\n\t\t\t\t\t\t\t\t<div class='intend' style='height:1px; float:left; width:{{:level*10}}px; display:inline-block;'></div>\n\t\t\t\t\t\t\t{{else !hasChildRecords}}\n\t\t\t\t\t\t\t\t<div class='intend' style='height:1px; float:left; width:{{:level*10}}px; display:inline-block;'></div>\n\t\t\t\t\t\t\t{{/if}}\n\t\t\t\t\t\t\t{{:#data['iconDefinition']}}\n\t\t\t\t\t\t\t<div class='e-cell' style='display:inline-block;width:100%' unselectable='on'>{{:#data['name']}}</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</script>";
            }
            return "";
        };
        /**
         * Raises the series double click event
         *
         * @private
         * @param {BaseSeries} series
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.onSeriesDoubleClicked = function (series) {
            this.eventSerieDoubleClicked.raise(this, series);
        };
        /**
         * Raises the change size event
         *
         * @private
         * @param {number} size
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.onChangeSize = function (size) {
            this.eventChangeSize.raise(this, size);
        };
        /**
         * Mouse is not over signalManager while dragging operation
         *
         * @param {DragDropArgs} args
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.dropFocusLost = function (args) {
            this.resetHighlightArea();
        };
        // column definitions
        SignalManagerWidget.nameColumnId = "name";
        SignalManagerWidget.valueColumnId = "value";
        SignalManagerWidget.descriptionColumnId = "description";
        SignalManagerWidget.colorColumnId = "color";
        SignalManagerWidget.iconDefinitionColumnId = "iconDefinition";
        return SignalManagerWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.SignalManagerWidget = SignalManagerWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsTWFuYWdlcldpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9zaWduYWxNYW5hZ2VyV2lkZ2V0L3NpZ25hbE1hbmFnZXJXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBK0NBO1FBQXNDLDJDQUE0QztRQUFsRjs7UUFBb0YsQ0FBQztRQUFELDhCQUFDO0lBQUQsQ0FBQyxBQUFyRixDQUFzQyxtQkFBVSxHQUFxQztJQUFBLENBQUM7SUFDdEY7UUFBOEIsbUNBQXdDO1FBQXRFOztRQUF3RSxDQUFDO1FBQUQsc0JBQUM7SUFBRCxDQUFDLEFBQXpFLENBQThCLG1CQUFVLEdBQWlDO0lBQUEsQ0FBQztJQUUxRTtRQUFrQyx1Q0FBa0I7UUFBcEQ7WUFBQSxxRUFzcERDO1lBN29EaUIsc0JBQWdCLEdBQUcsMkJBQTJCLENBQUM7WUFFL0MseUJBQW1CLEdBQUcsd0RBQXdELENBQUM7WUFDL0Usd0JBQWtCLEdBQUcsdUJBQXVCLENBQUM7WUFDN0MsNkJBQXVCLEdBQUcsaUJBQWlCLENBQUE7WUFDM0MsOEJBQXdCLEdBQUcsK0VBQStFLENBQUE7WUFDMUcsNkJBQXVCLEdBQUcsd0JBQXdCLENBQUM7WUFDbkQsOEJBQXdCLEdBQUcsZ0VBQWdFLENBQUM7WUFFckcsb0JBQWMsR0FBWSxJQUFJLENBQUM7WUFFL0IscUJBQWUsR0FBa0IsRUFBRSxDQUFDO1lBUXBDLG1CQUFhLEdBQUcsSUFBSSwyQkFBWSxFQUFFLENBQUM7WUFNcEMsb0JBQWMsR0FBWSxLQUFLLENBQUM7WUFFL0Isc0JBQWdCLEdBQVcsR0FBRyxDQUFDO1lBQy9CLGVBQVMsR0FBVyxHQUFHLENBQUM7WUFJaEMsNkJBQXVCLEdBQUcsSUFBSSx1QkFBdUIsRUFBRSxDQUFDO1lBRXhELHFCQUFlLEdBQUcs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bUJBQW1CLENBQUMsYUFBYSxFQUFDO2dCQUNoRCxPQUFPLDJWQUlLLENBQUE7YUFDWjtpQkFDSSxJQUFHLFFBQVEsSUFBSSxtQkFBbUIsQ0FBQyxZQUFZLEVBQUM7Z0JBQ3BELE9BQU8sNHBCQVVLLENBQUM7YUFDYjtZQUNELE9BQU8sRUFBRSxDQUFDO1FBQ1gsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLG1EQUFxQixHQUE3QixVQUE4QixNQUFrQjtZQUMvQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNsRCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssMENBQVksR0FBcEIsVUFBcUIsSUFBWTtZQUNoQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ksMkNBQWEsR0FBcEIsVUFBcUIsSUFBa0I7WUFDaEMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDOUIsQ0FBQztRQW5wREoscUJBQXFCO1FBQ0UsZ0NBQVksR0FBRyxNQUFNLENBQUM7UUFDdEIsaUNBQWEsR0FBRyxPQUFPLENBQUM7UUFDeEIsdUNBQW1CLEdBQUcsYUFBYSxDQUFDO1FBQ3BDLGlDQUFhLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLDBDQUFzQixHQUFHLGdCQUFnQixDQUFDO1FBK29EbEUsMEJBQUM7S0FBQSxBQXRwREQsQ0FBa0MsdUNBQWtCLEdBc3BEbkQ7SUFFUSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vbGlicy91aS9UeXBlcy9lai53ZWIuYWxsLmQudHNcIiAvPlxyXG5pbXBvcnQgeyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MsIElEYXRhTW9kZWwgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUcmVlR3JpZFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3RyZWVHcmlkV2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBTZXJpZUdyb3VwIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vc2lnbmFsL3NlcmllR3JvdXBcIjtcclxuaW1wb3J0IHsgSVNpZ25hbE1hbmFnZXJEYXRhTW9kZWwsIElDaGFydE1hbmFnZXJEYXRhTW9kZWwgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RhdGFNb2RlbHNcIjtcclxuaW1wb3J0IHsgU21UcmVlR3JpZENlbGxFZGl0RXZlbnRzIH0gZnJvbSBcIi4vdmlldy9zbVRyZWVHcmlkQ2VsbEVkaXRFdmVudHNcIjtcclxuaW1wb3J0IHsgU21UcmVlR3JpZENlbGxFZGl0VGVtcGxhdGUgfSBmcm9tIFwiLi92aWV3L3NtVHJlZUdyaWRDZWxsRWRpdFRlbXBsYXRlXCI7XHJcbmltcG9ydCB7IFNpZ25hbE1hbmFnZXJUcmVlR3JpZFRvb2xiYXIgfSBmcm9tIFwiLi92aWV3L3NpZ25hbE1hbmFnZXJUcmVlR3JpZFRvb2xiYXJcIjtcclxuaW1wb3J0IHsgRmlsZVByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9maWxlUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IEV4cG9ydEltcG9ydEhlbHBlciB9IGZyb20gXCIuLi8uLi9jb21tb24vZXhwb3J0SW1wb3J0SGVscGVyXCI7XHJcbmltcG9ydCB7IEJ1c3lJbmZvcm1hdGlvbiwgSW1hZ2VJZCB9IGZyb20gXCIuLi9jb21tb24vYnVzeUluZm9ybWF0aW9uXCI7XHJcbmltcG9ydCB7IElTaWduYWxNYW5hZ2VyV2lkZ2V0IH0gZnJvbSBcIi4uL3dpZGdldHNcIjtcclxuaW1wb3J0IHsgU2lnbmFsQ2F0ZWdvcnkgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsQ2F0ZWdvcnlcIjtcclxuaW1wb3J0IHsgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uIH0gZnJvbSBcIi4uLy4uL21vZGVscy9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL3NpZ25hbE1hbmFnZXJDYWxjdWxhdGlvblwiO1xyXG5pbXBvcnQgeyBJU2VyaWVDb250YWluZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9pbnRlcmZhY2VzL3NlcmllQ29udGFpbmVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTZXJpZU5vZGUgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9pbnRlcmZhY2VzL3NlcmllTm9kZUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTZXJpZUNvbnRhaW5lciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3NpZ25hbC9zZXJpZUNvbnRhaW5lclwiO1xyXG5pbXBvcnQgeyBTZXJpZU5vZGUgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9zaWduYWwvc2VyaWVOb2RlXCI7XHJcbmltcG9ydCB7IERyYWdEcm9wRGF0YUlkLCBJRHJvcHBhYmxlIH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL2Ryb3BJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSURyYWdnYWJsZSB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9kcmFnSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IERyYWdEcm9wRGF0YU9iamVjdCB9IGZyb20gXCIuLi9jb21tb24vZHJhZ0RhdGFPYmplY3RcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3Nlcmllcy9iYXNlU2VyaWVzXCI7XHJcbmltcG9ydCB7IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGFcIjtcclxuaW1wb3J0IHsgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhXCI7XHJcbmltcG9ydCB7IERyYWdEcm9wUmVwcmVzZW50YXRpb24gfSBmcm9tIFwiLi4vY29tbW9uL2RyYWdEcm9wUmVwcmVzZW50YXRpb25cIjtcclxuaW1wb3J0IHsgRHJhZ0Ryb3BBcmdzIH0gZnJvbSBcIi4uL2NvbW1vbi9kcmFnRHJvcEFyZ3NcIjtcclxuaW1wb3J0IHsgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL3NpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZVwiO1xyXG5pbXBvcnQgeyBTZXJpZXNUeXBlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vc2VyaWVzL3Nlcmllc1R5cGVcIjtcclxuaW1wb3J0IHsgRXhwb3J0U2VyaWVHcm91cCB9IGZyb20gXCIuLi8uLi9jb21tb24vZXhwb3J0U2VyaWVHcm91cFwiO1xyXG5pbXBvcnQgeyBFeHBvcnRIZWxwZXIgfSBmcm9tIFwiLi9oZWxwZXJzL2V4cG9ydEhlbHBlclwiO1xyXG5pbXBvcnQgeyBBbGVydERpYWxvZywgbWVzc2FnZUJveFR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL2FsZXJ0RGlhbG9nXCI7XHJcbmltcG9ydCB7IFNpZ25hbFJvb3QgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsUm9vdFwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbiB9IGZyb20gXCIuL2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3dpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgSVNlcmllc1Byb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vc2VyaWVzUHJvdmlkZXIvc2VyaWVzUHJvdmlkZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUltYWdlUHJvdmlkZXIgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvaW1hZ2VQcm92aWRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQZXJzaXN0RGF0YVByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9wZXJzaXN0RGF0YVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IEV4cG9ydENvbnRhaW5lciB9IGZyb20gXCIuLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vZXhwb3J0Q29udGFpbmVyXCI7XHJcbmltcG9ydCB7IE1jZUNvbnZlcnNpb25FcnJvciB9IGZyb20gXCIuLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vbWNlQ29udmVyc2lvbkVycm9yXCI7XHJcbmltcG9ydCB7IE1jZUV4cG9ydEltcG9ydEhlbHBlciB9IGZyb20gXCIuLi8uLi9jb21tb24vbWNlRXhwb3J0SW1wb3J0L21jZUV4cG9ydEltcG9ydEhlbHBlclwiO1xyXG5pbXBvcnQgeyBJQ29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2ludGVyZmFjZXMvY29tcG9uZW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTZXR0aW5nc09iamVjdCB9IGZyb20gXCIuLi8uLi9jb21tb24vcGVyc2lzdGVuY2UvaW50ZXJmYWNlcy9zZXR0aW5nc09iamVjdEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREYXRhSHViIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9jb21wb25lbnRIdWIvY29tcG9uZW50RGF0YUh1YlwiO1xyXG5pbXBvcnQgeyBDdXJzb3JTdGF0ZXMgfSBmcm9tIFwiLi4vY29tbW9uL3N0YXRlcy9jdXJzb3JTdGF0ZXNcIjtcclxuXHJcbmNsYXNzIEV2ZW50U2VyaWVEb3VibGVDbGlja2VkIGV4dGVuZHMgVHlwZWRFdmVudDxJU2lnbmFsTWFuYWdlcldpZGdldCwgQmFzZVNlcmllcz57IH07XHJcbmNsYXNzIEV2ZW50Q2hhbmdlU2l6ZSBleHRlbmRzIFR5cGVkRXZlbnQ8SVNpZ25hbE1hbmFnZXJXaWRnZXQsIG51bWJlcj57IH07XHJcblxyXG5jbGFzcyBTaWduYWxNYW5hZ2VyV2lkZ2V0IGV4dGVuZHMgVHJlZUdyaWRXaWRnZXRCYXNlIGltcGxlbWVudHMgSVNpZ25hbE1hbmFnZXJXaWRnZXQsIElEcmFnZ2FibGUsIElEcm9wcGFibGV7XHJcblx0XHJcblx0Ly8gY29sdW1uIGRlZmluaXRpb25zXHJcblx0cHVibGljIHN0YXRpYyByZWFkb25seSBuYW1lQ29sdW1uSWQgPSBcIm5hbWVcIjtcclxuXHRwdWJsaWMgc3RhdGljIHJlYWRvbmx5IHZhbHVlQ29sdW1uSWQgPSBcInZhbHVlXCI7XHJcblx0cHVibGljIHN0YXRpYyByZWFkb25seSBkZXNjcmlwdGlvbkNvbHVtbklkID0gXCJkZXNjcmlwdGlvblwiO1xyXG5cdHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgY29sb3JDb2x1bW5JZCA9IFwiY29sb3JcIjtcclxuXHRwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGljb25EZWZpbml0aW9uQ29sdW1uSWQgPSBcImljb25EZWZpbml0aW9uXCI7XHJcblxyXG5cdHByaXZhdGUgcmVhZG9ubHkgX2hpZ2hsaWdodEFyZWFJZCA9IFwic2lnbmFsTWFuYWdlcl9IaWdobGlnaHRlZFwiO1xyXG5cclxuXHRwcml2YXRlIHJlYWRvbmx5IF9kZWxldGVJdGVtc0NvbnRlbnQgPSBcIlRoaXMgYWN0aW9uIHdpbGwgcGVybWFuZW50bHkgZGVsZXRlIHNlbGVjdGVkIGVsZW1lbnRzLlwiO1xyXG5cdHByaXZhdGUgcmVhZG9ubHkgX2RlbGV0ZUl0ZW1zSGVhZGVyID0gXCJEZWxldGUgcmVjb3JkZWQgZGF0YT9cIjtcclxuXHRwcml2YXRlIHJlYWRvbmx5IF93YXJuaW5nSW1wb3J0aW5nSGVhZGVyID0gXCJJbXBvcnQgY2FuY2VsZWRcIlxyXG5cdHByaXZhdGUgcmVhZG9ubHkgX3dhcm5pbmdJbXBvcnRpbmdDb250ZW50ID0gXCJJdCBpcyBub3QgcG9zc2libGUgdG8gaW1wb3J0IG9uZSAubWNlIGZpbGUgd2l0aCBvdGhlciBmaWxlcyBhdCB0aGUgc2FtZSB0aW1lLlwiIFxyXG5cdHByaXZhdGUgcmVhZG9ubHkgX01DRUZpbGVzSW1wb3J0ZWRIZWFkZXIgPSBcIkRlbGV0ZSBhbGwgdHJhY2UgZGF0YT9cIjtcclxuXHRwcml2YXRlIHJlYWRvbmx5IF9NQ0VGaWxlc0ltcG9ydGVkQ29udGVudCA9IFwiRG8geW91IHdhbnQgdG8gZGVsZXRlIGFsbCB0cmFjZSBkYXRhIGFuZCBpbXBvcnQgdGhlIC5tY2UgZmlsZT9cIjtcclxuXHJcblx0cHJpdmF0ZSBfaXNGaXJzdFJlc2l6ZTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG5cdHByaXZhdGUgX2luZGV4ZXNEcmFnZ2VkOiBBcnJheTxudW1iZXI+ID0gW107XHJcblxyXG5cdHByaXZhdGUgX2N1cnJlbnREcmFnRHJvcFNlcmllcz86IEFycmF5PEJhc2VTZXJpZXM+O1xyXG5cclxuXHRwcml2YXRlIF9jdXJyZW50Q2FsY3VsYXRvclR5cGU/OiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGU7XHJcblxyXG5cdHByaXZhdGUgX3NlcmllQ29udGFpbmVyVG9TZWxlY3RBZnRlclJlZnJlc2g6IElTZXJpZUNvbnRhaW5lcnx1bmRlZmluZWQ7XHJcblx0XHRcclxuXHRwcml2YXRlIF9maWxlUHJvdmlkZXIgPSBuZXcgRmlsZVByb3ZpZGVyKCk7XHJcblxyXG5cdHByaXZhdGUgX3Nlcmllc1Byb3ZpZGVyOiBJU2VyaWVzUHJvdmlkZXJ8dW5kZWZpbmVkO1xyXG5cclxuXHRwcml2YXRlIF9jaGFydE1hbmFnZXJEYXRhTW9kZWw6IElDaGFydE1hbmFnZXJEYXRhTW9kZWx8dW5kZWZpbmVkO1xyXG5cclxuXHRwdWJsaWMgZWRpdE1vZGVBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0cHJpdmF0ZSBfd2lkdGhEaWZmZXJlbmNlOiBudW1iZXIgPSA0NTA7XHJcblx0cHJpdmF0ZSBfbWluV2lkdGg6IG51bWJlciA9IDI1MDtcclxuXHJcblx0X2N1cnJlbnRUYXJnZXQ7XHJcblxyXG5cdGV2ZW50U2VyaWVEb3VibGVDbGlja2VkID0gbmV3IEV2ZW50U2VyaWVEb3VibGVDbGlja2VkKCk7XHJcblx0XHJcblx0ZXZlbnRDaGFuZ2VTaXplID0gbmV3IEV2ZW50Q2hhbmdlU2l6ZSgpO1xyXG5cdFxyXG5cdHByaXZhdGUgX3VwbG9hZERhdGFGaW5pc2hlZEhhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpPT50aGlzLm9uVXBsb2FkRGF0YUZpbmlzaGVkKHNlbmRlcixhcmdzKTtcclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyB0aGUgaW5mb3JtYXRpb24gaWYgdGhlIGF1dG8gdXBsb2FkIG9mIHRyYWNlZGF0YSBpcyBhY3RpdmVcclxuXHQgKlxyXG5cdCAqIEByZWFkb25seVxyXG5cdCAqIEB0eXBlIHtib29sZWFufVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0Z2V0IGF1dG9VcGxvYWRBY3RpdmUoKTpib29sZWFue1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuICAgICAqIERlZmluZXMgdGhlIGhlaWdodCBvZiB0aGUgaGVhZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGRlZmluZUhlYWRlckhlaWdodCgpOiBudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIDMwO1xyXG4gICAgfVxyXG5cdFxyXG5cdGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuXHRcdHRoaXMuY29tcG9uZW50LnNldERlZmF1bHREZWZpbml0aW9uKG5ldyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbigpKTtcclxuXHR9XHJcblx0XHJcblx0aW5pdGlhbGl6ZWQoKXtcclxuXHRcdHN1cGVyLmluaXRpYWxpemVkKCk7XHJcblxyXG5cdFx0dGhpcy5pbml0U2lnbmFsTWFuYWdlckRhdGFNb2RlbCgpO1xyXG5cdFx0dGhpcy5pbml0U2VyaWVzUHJvdmlkZXIoKTtcclxuXHRcdHRoaXMuaW5pdENoYXJ0TWFuYWdlckRhdGFNb2RlbCgpOyBcclxuXHRcdHRoaXMucmVmcmVzaCgpO1xyXG5cdFx0XHJcblx0XHRzdXBlci5zZXRIZWFkZXJDb250ZW50KFwiU2lnbmFsc1wiKTtcclxuXHJcblx0XHQvLyBTZXQgZHluYW1pYyBjb2x1bW4gc2V0dGluZ3NcclxuXHRcdHN1cGVyLnNldER5bmFtaWNDb2x1bW4oMCwgNDApO1xyXG5cclxuXHRcdC8vIEluaXRpYWxpemUgc2Nyb2xsYmFycyBwb3NpdGlvbnNcclxuXHRcdGxldCBzY3JvbGxiYXJTZXR0aW5ncyA9IHRoaXMuY29tcG9uZW50LmdldFNldHRpbmcoVHJlZUdyaWRXaWRnZXRCYXNlLlNjcm9sbGJhcnNTZXR0aW5nc0lkKTtcclxuXHRcdHRoaXMuc2V0U2Nyb2xsQmFyU2V0dGluZ3Moc2Nyb2xsYmFyU2V0dGluZ3MpO1xyXG5cdFx0XHJcblx0XHQvLyBBZGQgZHJhZyBzdXBwb3J0XHJcblx0XHRzdXBlci5hZGREcmFnZ2luZ1N1cHBvcnQoKTtcclxuXHRcdFxyXG5cdFx0Ly8gQWRkIGRyb3Agc3VwcG9ydFxyXG5cdFx0c3VwZXIuYWRkU3VwcG9ydGVkRHJhZ0Ryb3BEYXRhSWQoRHJhZ0Ryb3BEYXRhSWQuc2lnbmFsKVxyXG5cdH1cclxuXHJcblx0ZGlzcG9zZSgpe1xyXG5cdFx0dGhpcy5yZW1vdmVTdXBwb3J0ZWREcmFnRHJvcERhdGFJZChEcmFnRHJvcERhdGFJZC5zaWduYWwpO1xyXG5cdFx0c3VwZXIuZGlzcG9zZSgpO1xyXG5cdH1cclxuXHQgXHJcblx0Ly8jcmVnaW9uIGRyYWcgc3VwcG9ydFxyXG5cdHN0YXJ0RHJhZ2dpbmcoKTogRHJhZ0Ryb3BEYXRhT2JqZWN0fHVuZGVmaW5lZHtcclxuXHRcdGlmKHRoaXMuX2N1cnJlbnREcmFnRHJvcFNlcmllcyAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRsZXQgc2lnbmFsSW1hZ2UsXHJcblx0XHRcdFx0c2lnbmFsTmFtZTtcclxuXHRcdFx0XHJcblx0XHRcdGxldCBpbWFnZVByb3ZpZGVyID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLkltYWdlUHJvdmlkZXJJZCkgYXMgSUltYWdlUHJvdmlkZXI7XHJcblx0XHRcdGlmICh0aGlzLl9jdXJyZW50RHJhZ0Ryb3BTZXJpZXMubGVuZ3RoID09IDEpIHtcclxuXHRcdFx0XHQvLyBEZWZhdWx0IHl0IHNlcmllcyBzdmdcclxuXHRcdFx0XHRzaWduYWxOYW1lID0gdGhpcy5fY3VycmVudERyYWdEcm9wU2VyaWVzWzBdLm5hbWU7XHJcblx0XHRcdFx0aWYoaW1hZ2VQcm92aWRlciAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRcdFx0c2lnbmFsSW1hZ2UgPSBpbWFnZVByb3ZpZGVyLmdldEltYWdlKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC95dFNlcmllcy5zdmdcIik7XHJcblx0XHRcdFx0XHRpZih0aGlzLl9jdXJyZW50RHJhZ0Ryb3BTZXJpZXNbMF0udHlwZSA9PSBTZXJpZXNUeXBlLnh5U2VyaWVzKXtcclxuXHRcdFx0XHRcdFx0Ly8gVXNlIHh5IHNlcmllcyBzdmdcclxuXHRcdFx0XHRcdFx0c2lnbmFsSW1hZ2UgPSBpbWFnZVByb3ZpZGVyLmdldEltYWdlKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC94eVNlcmllcy5zdmdcIik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIGlmKHRoaXMuX2N1cnJlbnREcmFnRHJvcFNlcmllc1swXS50eXBlID09IFNlcmllc1R5cGUuZmZ0U2VyaWVzKXtcclxuXHRcdFx0XHRcdFx0Ly8gVXNlIGZmdCBzZXJpZXMgc3ZnXHJcblx0XHRcdFx0XHRcdHNpZ25hbEltYWdlID0gaW1hZ2VQcm92aWRlci5nZXRJbWFnZShcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3AvZmZ0U2VyaWVzLnN2Z1wiKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmKHNpZ25hbEltYWdlICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdFx0XHRcdC8vIFJlcGxhY2Ugc2VyaWUgY29sb3IgaW4gc3ZnIHdpdGggY29sb3Igb2YgY3VycmVudCBzZXJpZVxyXG5cdFx0XHRcdFx0XHRzaWduYWxJbWFnZSA9IHNpZ25hbEltYWdlLnJlcGxhY2UoXCJzdHJva2U6Izc2YmVhNlwiLCBcInN0cm9rZTpcIiArIHRoaXMuX2N1cnJlbnREcmFnRHJvcFNlcmllc1swXS5jb2xvcik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdGlmKGltYWdlUHJvdmlkZXIgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0XHRcdGlmKHRoaXMuX2N1cnJlbnREcmFnRHJvcFNlcmllc1swXS50eXBlID09IFNlcmllc1R5cGUueHlTZXJpZXMpe1xyXG5cdFx0XHRcdFx0XHRzaWduYWxJbWFnZSA9IGltYWdlUHJvdmlkZXIuZ2V0SW1hZ2UoXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2RyYWdEcm9wL3NldmVyYWxYWVNlcmllcy5zdmdcIik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIGlmKHRoaXMuX2N1cnJlbnREcmFnRHJvcFNlcmllc1swXS50eXBlID09IFNlcmllc1R5cGUuZmZ0U2VyaWVzKXtcclxuXHRcdFx0XHRcdFx0c2lnbmFsSW1hZ2UgPSBpbWFnZVByb3ZpZGVyLmdldEltYWdlKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9zZXZlcmFsRkZUU2VyaWVzLnN2Z1wiKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRzaWduYWxJbWFnZSA9IGltYWdlUHJvdmlkZXIuZ2V0SW1hZ2UoXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2RyYWdEcm9wL3NldmVyYWxZVFNlcmllcy5zdmdcIik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGxldCBkcmFnRHJvcEljb25SZXByZXNlbnRhdGlvbiA9IG5ldyBEcmFnRHJvcFJlcHJlc2VudGF0aW9uKCk7XHJcblx0XHRcdGRyYWdEcm9wSWNvblJlcHJlc2VudGF0aW9uLmljb25MaXN0LnB1c2goc2lnbmFsSW1hZ2UpO1xyXG5cdFx0XHRkcmFnRHJvcEljb25SZXByZXNlbnRhdGlvbi50ZXh0TGlzdC5wdXNoKHNpZ25hbE5hbWUpO1xyXG5cdFx0XHRyZXR1cm4gbmV3IERyYWdEcm9wRGF0YU9iamVjdChEcmFnRHJvcERhdGFJZC5zaWduYWwsIHRoaXMuX2N1cnJlbnREcmFnRHJvcFNlcmllcywgZHJhZ0Ryb3BJY29uUmVwcmVzZW50YXRpb24pO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcclxuXHR9XHJcblx0XHJcblx0ZHJhZ2dpbmdTdG9wcGVkKCl7XHJcblx0XHQvLyBSZXNldCBjdXJyZW50IGRyYWcgZHJvcCBzaWduYWxcclxuXHRcdHRoaXMuX2N1cnJlbnREcmFnRHJvcFNlcmllcyA9IHVuZGVmaW5lZDtcclxuXHRcdHRoaXMuX2N1cnJlbnRDYWxjdWxhdG9yVHlwZSA9IHVuZGVmaW5lZDtcclxuXHRcdHRoaXMuX2luZGV4ZXNEcmFnZ2VkID0gW107XHJcblx0fVxyXG5cdC8vI2VuZHJlZ2lvblxyXG5cclxuXHQvLyNyZWdpb24gZHJvcCBzdXBwb3J0XHJcblx0cHJpdmF0ZSBhZGREcm9wTG9jYXRpb25zKHNlcmllczogQXJyYXk8QmFzZVNlcmllcz4pe1xyXG4gICAgICAgIGlmIChzZXJpZXNbMF0ucGFyZW50ICE9IHVuZGVmaW5lZCAmJiBzZXJpZXMubGVuZ3RoID09IDEpIHtcclxuXHRcdFx0c2VyaWVzWzBdLnBhcmVudC52aXNpYmxlQ2hpbGRzIS5mb3JFYWNoKGNoaWxkID0+IHtcclxuXHRcdFx0XHRpZihjaGlsZCBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbil7XHJcblx0XHRcdFx0XHRjaGlsZC5zZXREcm9wTG9jYXRpb25zKHRydWUsIHNlcmllc1swXSk7XHJcblx0XHRcdFx0fVx0XHRcdFx0XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSByZW1vdmVEcm9wTG9jYXRpb25zKHNlcmllczogQXJyYXk8QmFzZVNlcmllcz4pe1xyXG5cdFx0aWYgKHNlcmllc1swXS5wYXJlbnQgIT0gdW5kZWZpbmVkICYmIHNlcmllcy5sZW5ndGggPT0gMSkge1xyXG5cdFx0XHRzZXJpZXNbMF0ucGFyZW50LnZpc2libGVDaGlsZHMhLmZvckVhY2goY2hpbGQgPT4ge1xyXG5cdFx0XHRcdGlmKGNoaWxkIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uKXtcclxuXHRcdFx0XHRcdGNoaWxkLnNldERyb3BMb2NhdGlvbnMoZmFsc2UsIHNlcmllc1swXSk7XHJcblx0XHRcdFx0fVx0XHRcdFx0XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZHJhZ1N0YXJ0KGFyZ3M6IERyYWdEcm9wQXJncykge1xyXG5cdFx0bGV0IHNlcmllcyA9IGFyZ3MuZGF0YSBhcyBBcnJheTxCYXNlU2VyaWVzPjtcclxuXHRcdFxyXG5cdFx0Ly8gQWRkIHBvc3NpYmxlIGRyb3BMb2NhdGlvbnNcclxuXHRcdHRoaXMuYWRkRHJvcExvY2F0aW9ucyhzZXJpZXMpO1xyXG5cdFx0XHJcblx0XHQvLyBVcGRhdGUgdHJlZUdyaWRcclxuXHRcdHRoaXMucmVmcmVzaCgpO1xyXG5cclxuXHRcdGxldCB0cmVlR3JpZE9iaiA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTtcclxuXHRcdHRoaXMudXBkYXRlU2VyaWVTZWxlY3Rpb24odHJlZUdyaWRPYmosIHRoaXMuX2luZGV4ZXNEcmFnZ2VkKTtcclxuXHR9XHJcblxyXG5cdGRyYWdTdG9wKGFyZ3M6IERyYWdEcm9wQXJncykge1xyXG5cdFx0bGV0IHNlcmllcyA9IGFyZ3MuZGF0YSBhcyBBcnJheTxCYXNlU2VyaWVzPjtcclxuXHRcdFxyXG5cdFx0Ly8gUmVtb3ZlIHBvc3NpYmxlIGRyb3BMb2NhdGlvbnNcclxuXHRcdHRoaXMucmVtb3ZlRHJvcExvY2F0aW9ucyhzZXJpZXMpO1xyXG5cclxuXHRcdC8vIFVwZGF0ZSB0cmVlR3JpZFxyXG5cdFx0dGhpcy5yZWZyZXNoKCk7XHJcblx0XHRcclxuXHRcdGxldCB0cmVlR3JpZE9iaiA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTtcclxuXHRcdHRoaXMudXBkYXRlU2VyaWVTZWxlY3Rpb24odHJlZUdyaWRPYmosIHRoaXMuX2luZGV4ZXNEcmFnZ2VkKTtcclxuXHR9XHJcblxyXG5cdGRyYWdPdmVyKGFyZ3M6IERyYWdEcm9wQXJncyk6IGJvb2xlYW4ge1xyXG5cdFx0bGV0IGNhbGN1bGF0aW9uSW5wdXRJdGVtID0gIHRoaXMuZ2V0Q2FsY3VsYXRpb25JbnB1dEZyb21Ecm9wTG9jYXRpb24oYXJncy5jdXJyZW50VGFyZ2V0KTtcclxuXHRcdFxyXG5cdFx0aWYoY2FsY3VsYXRpb25JbnB1dEl0ZW0gIT0gdW5kZWZpbmVkICYmIGNhbGN1bGF0aW9uSW5wdXRJdGVtLmRyb3BQb3NzaWJsZSA9PSB0cnVlKXtcclxuXHRcdFx0dGhpcy5hZGRIaWdobGlnaHRlZEFyZWEoYXJncy5jdXJyZW50VGFyZ2V0KTtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5yZXNldEhpZ2hsaWdodEFyZWEoKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdGRyb3AoYXJnczogRHJhZ0Ryb3BBcmdzKSB7XHJcblx0XHRsZXQgc2VyaWVzID0gYXJncy5kYXRhWzBdIGFzIEJhc2VTZXJpZXM7XHJcblx0XHRsZXQgY2FsY3VsYXRpb25JbnB1dFRhcmdldCA9ICB0aGlzLmdldENhbGN1bGF0aW9uSW5wdXRGcm9tRHJvcExvY2F0aW9uKGFyZ3MuY3VycmVudFRhcmdldCk7XHJcblx0XHRsZXQgY2FsY3VsYXRpb25JbnB1dERyYWdnZWRJdGVtID0gdGhpcy5nZXRDYWxjdWxhdGlvbklucHV0RHJhZ2dlZChzZXJpZXMpO1xyXG5cclxuXHRcdGlmKGNhbGN1bGF0aW9uSW5wdXRUYXJnZXQgIT0gdW5kZWZpbmVkICYmIGNhbGN1bGF0aW9uSW5wdXRUYXJnZXQuZHJvcFBvc3NpYmxlID09IHRydWUpe1xyXG5cdFx0XHRpZihzZXJpZXMgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0XHQvL0V4Y2hhbmdlIG9mIHNlcmllIGlmIHRoZSBkcmFnZ2VkIHNlcmllIGlzIGluc2lkZSB0aGUgY2FsY3VsYXRvclxyXG5cdFx0XHRcdGlmICh0aGlzLl9jdXJyZW50Q2FsY3VsYXRvclR5cGUgPT0gY2FsY3VsYXRpb25JbnB1dFRhcmdldC5wYXJlbnQgJiYgY2FsY3VsYXRpb25JbnB1dERyYWdnZWRJdGVtICE9IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0bGV0IG9sZFZhbHVlID0gY2FsY3VsYXRpb25JbnB1dFRhcmdldC52YWx1ZTtcclxuXHRcdFx0XHRcdGNhbGN1bGF0aW9uSW5wdXREcmFnZ2VkSXRlbSEudmFsdWUgPSBvbGRWYWx1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Y2FsY3VsYXRpb25JbnB1dFRhcmdldC52YWx1ZSA9IHNlcmllcy5uYW1lO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGEgPGRpdj4gaW50byB0aGUgY2VsbCB3aGVuIGRyb3BwYWJsZSBpcyBwb3NzaWJsZSBhbmQgc2lnbmFsIGlzIGJlaW5nIGRyYWdnZWQgb3ZlclxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0geyp9IGN1cnJlbnRUYXJnZXRcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgYWRkSGlnaGxpZ2h0ZWRBcmVhKGN1cnJlbnRUYXJnZXQpIHtcclxuXHRcdGxldCBoaWdobGlnaHRFbGVtID0gJCgnPGRpdiBpZD1cIicrIHRoaXMuX2hpZ2hsaWdodEFyZWFJZCArJ1wiIHN0eWxlPVwiIHBvaW50ZXItZXZlbnRzOm5vbmU7IHBvc2l0aW9uOmFic29sdXRlOyBcIiBjbGFzcz1cImRyYWdnZWRPdmVyXCI+PC9kaXY+Jyk7XHJcblx0XHR0aGlzLnJlc2V0SGlnaGxpZ2h0QXJlYShoaWdobGlnaHRFbGVtKTtcclxuXHRcdCQoY3VycmVudFRhcmdldCkuYXBwZW5kKGhpZ2hsaWdodEVsZW0pO1xyXG5cclxuXHRcdGhpZ2hsaWdodEVsZW0ub2Zmc2V0KHt0b3A6ICQoY3VycmVudFRhcmdldCkub2Zmc2V0KCkhLnRvcCwgbGVmdDogJChjdXJyZW50VGFyZ2V0KS5vZmZzZXQoKSEubGVmdH0pXHJcblx0XHRoaWdobGlnaHRFbGVtLmNzcygnaGVpZ2h0JywgY3VycmVudFRhcmdldC5vZmZzZXRIZWlnaHQpO1xyXG5cdFx0aGlnaGxpZ2h0RWxlbS5jc3MoJ3dpZHRoJywgY3VycmVudFRhcmdldC5vZmZzZXRXaWR0aCk7XHJcblx0fVxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlIGFsbCBzaWduYWxNYW5hZ2VyIGhpZ2hsaWdodGVkIGFyZWFzIChleGNlcHQgdGhlIHNlbGVjdGVkIG9uZSlcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtKUXVlcnk8SFRNTEVsZW1lbnQ+fSBbZWxlbWVudF1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgcmVzZXRIaWdobGlnaHRBcmVhIChlbGVtZW50PzogSlF1ZXJ5PEhUTUxFbGVtZW50Pikge1xyXG5cdFx0bGV0IGhpZ2hsaWdodEVsZW0gPSAkKCcjJyArIHRoaXMuX2hpZ2hsaWdodEFyZWFJZCk7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhpZ2hsaWdodEVsZW0ubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHRpZiAoZWxlbWVudCA9PSB1bmRlZmluZWQgfHwgaGlnaGxpZ2h0RWxlbVtpXSAhPSBlbGVtZW50WzBdKSB7XHJcblx0XHRcdFx0aGlnaGxpZ2h0RWxlbVtpXS5yZW1vdmUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBnZXRDYWxjdWxhdGlvbklucHV0RnJvbURyb3BMb2NhdGlvbihjdXJyZW50VGFyZ2V0KTogU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhfHVuZGVmaW5lZHtcclxuXHRcdGxldCByZWNvcmQgPSB0aGlzLmdldFRyZWVSZWNvcmQoY3VycmVudFRhcmdldCk7XHJcbiAgICAgICAgaWYocmVjb3JkICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdGlmKHJlY29yZC5pdGVtIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhICYmIGN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LnZhbHVlLmluY2x1ZGVzKCdkcm9wTG9jYXRpb25BcmVhJykpe1xyXG5cdFx0XHRcdHJldHVybiByZWNvcmQuaXRlbTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGdldENhbGN1bGF0aW9uSW5wdXREcmFnZ2VkKHNlcmllOiBCYXNlU2VyaWVzKTogU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhIHwgdW5kZWZpbmVke1xyXG5cdFx0aWYgKHRoaXMuX2N1cnJlbnRDYWxjdWxhdG9yVHlwZSAhPSB1bmRlZmluZWQpIHtcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9jdXJyZW50Q2FsY3VsYXRvclR5cGUhLmdldENoaWxkcygpLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0XHRpZiAodGhpcy5fY3VycmVudENhbGN1bGF0b3JUeXBlIS5nZXRDaGlsZHMoKVtpXS5zZXJpZSA9PSBzZXJpZSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX2N1cnJlbnRDYWxjdWxhdG9yVHlwZSEuZ2V0Q2hpbGRzKClbaV0gYXMgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcclxuXHR9XHJcblxyXG5cdC8vI2VuZHJlZ2lvblxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBsYXlvdXQgb2YgdGhlIHdpZGdldFxyXG5cdCAqXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRjcmVhdGVMYXlvdXQoKSB7XHJcblx0XHR0aGlzLm1haW5EaXYuc3R5bGUub3ZlcmZsb3cgPVwiaGlkZGVuXCI7XHJcblx0XHRzdXBlci5jcmVhdGVMYXlvdXQoKTtcclxuXHR9XHJcblxyXG5cdGluaXRTaWduYWxNYW5hZ2VyRGF0YU1vZGVsKCkge1xyXG5cdFx0bGV0IGRhdGFNb2RlbCA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5TaWduYWxNYW5hZ2VyRGF0YU1vZGVsSWQpIGFzIElTaWduYWxNYW5hZ2VyRGF0YU1vZGVsO1xyXG5cdFx0dGhpcy5kYXRhTW9kZWwgPSBkYXRhTW9kZWwgYXMgSVNpZ25hbE1hbmFnZXJEYXRhTW9kZWw7XHJcblx0fVxyXG5cclxuXHRpbml0U2VyaWVzUHJvdmlkZXIoKSB7XHJcblx0XHR0aGlzLl9zZXJpZXNQcm92aWRlciA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5TZXJpZXNQcm92aWRlcklkKSBhcyBJU2VyaWVzUHJvdmlkZXI7XHJcblx0fVxyXG5cclxuXHRpbml0Q2hhcnRNYW5hZ2VyRGF0YU1vZGVsKCkge1xyXG5cdFx0dGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLkNoYXJ0TWFuYWdlckRhdGFNb2RlbElkKSBhcyBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsO1xyXG5cdH1cclxuXHRcclxuXHJcblx0LyoqXHJcblx0ICogSGFuZGxlcyB0aGUgbW9kZWwgY2hhbmdlc1xyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtJRGF0YU1vZGVsfSBzZW5kZXJcclxuXHQgKiBAcGFyYW0ge0V2ZW50TW9kZWxDaGFuZ2VkQXJnc30gZXZlbnRBcmdzXHJcblx0ICogQHJldHVybnMgeyp9XHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRoYW5kbGVNb2RlbENoYW5nZWQoc2VuZGVyOiBJRGF0YU1vZGVsLCBldmVudEFyZ3M6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyk6IGFueSB7XHJcblx0XHR0aGlzLnJlZnJlc2goKTtcclxuXHRcdHRoaXMuc2F2ZVRyZWVHcmlkU2V0dGluZ3MoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlc2l6ZXMgdGhlIHNpZ25hbCBtYW5hZ2VyIHdpZGdldFxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoXHJcblx0ICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cmVzaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKXtcclxuXHRcdGlmICh0aGlzLl9pc0ZpcnN0UmVzaXplICYmIHRoaXMuZWRpdE1vZGVBY3RpdmUpIHtcclxuXHRcdFx0Ly9EZWFjdGl2YXRlIGVkaXRNb2RlIGFuZCBzZXQgY29ycmVjdCB3aWR0aCB3aGVuIHdpZGdldCBpcyBpbml0aWFsaXplZFxyXG5cdFx0XHR0aGlzLl9pc0ZpcnN0UmVzaXplID0gZmFsc2U7XHJcblx0XHRcdHRoaXMuYWN0aXZhdGVFZGl0TW9kZShmYWxzZSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLl9pc0ZpcnN0UmVzaXplID0gZmFsc2U7XHJcblx0XHRcdHN1cGVyLnJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdCAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHNlbGVjdGlvbiB0byB0aGUgZ2l2ZW4gc2VyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gdHJlZUdyaWRPYmplY3RcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gaW5kZXhlc1xyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVTZXJpZVNlbGVjdGlvbih0cmVlR3JpZE9iamVjdCwgaW5kZXhlczogQXJyYXk8bnVtYmVyPikge1xyXG4gICAgICAgIC8vIGRlc2VsZWN0IGFsbCBzZWxlY3Rpb25zIGluIHNpZ25hbCBwYW5lXHJcbiAgICAgICAgdHJlZUdyaWRPYmplY3QuY2xlYXJTZWxlY3Rpb24oKTtcclxuXHJcbiAgICAgICAgaWYoaW5kZXhlc1swXSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBpbmRleGVzLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICB0cmVlR3JpZE9iamVjdC5fbXVsdGlTZWxlY3RDdHJsUmVxdWVzdCA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCB2aXNpYmxlSW5kZXggPSAwO1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgKDxhbnk+dHJlZUdyaWRPYmplY3QubW9kZWwpLmZsYXRSZWNvcmRzLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgICAgIGlmKGogPT0gaW5kZXhlc1tpXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJlZUdyaWRPYmplY3Quc2VsZWN0Um93cyh2aXNpYmxlSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoKDxhbnk+dHJlZUdyaWRPYmplY3QubW9kZWwpLmZsYXRSZWNvcmRzW2pdLnZpc2libGUgIT0gXCJmYWxzZVwiKXtcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlSW5kZXgrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlZnJlc2hlcyB0aGUgdHJlZSBncmlkIFxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBhc3luYyByZWZyZXNoKCl7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRpZih0aGlzLnJlZnJlc2hFbmFibGVkKXtcclxuXHRcdFx0XHR0aGlzLnNldE1vZGVsV2l0aEVkaXRTdXBwb3J0KHRoaXMuZGF0YU1vZGVsLmRhdGEpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGNhdGNoKGUpe1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRjb25zb2xlLmluZm8oXCJTaWduYWxNYW5hZ2VyIHJlZnJlc2ggZXJyb3IhID0+IFRyZWVHcmlkIHJlY3JlYXRpb24hXCIpO1xyXG5cdFx0XHRjb25zb2xlLmluZm8oZSk7XHJcblx0XHRcdFxyXG5cdFx0XHR0aGlzLmNyZWF0ZVRyZWVHcmlkKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIGNvbHVtbiB0ZW1wbGF0ZXMgZm9yIHRoZSB0cmVlIGdyaWQgYW5kIGFkZHMgdGhlbSB0byB0aGUgd2lkZ2V0IGNvbnRhaW5lclxyXG5cdCAqXHJcblx0ICogQHByb3RlY3RlZFxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJvdGVjdGVkIGNyZWF0ZVRlbXBsYXRlcygpe1xyXG5cdFx0dmFyICR3aWRnZXRDb250YWluZXIgPSAkKHRoaXMubWFpbkRpdik7XHJcblx0XHQkd2lkZ2V0Q29udGFpbmVyLmFwcGVuZCh0aGlzLmdldENvbHVtblRlbXBsYXRlRGF0YShTaWduYWxNYW5hZ2VyV2lkZ2V0Lm5hbWVDb2x1bW5JZCkpO1xyXG5cdFx0JHdpZGdldENvbnRhaW5lci5hcHBlbmQodGhpcy5nZXRDb2x1bW5UZW1wbGF0ZURhdGEoU2lnbmFsTWFuYWdlcldpZGdldC5jb2xvckNvbHVtbklkKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSB0cmVlIGdyaWQgZm9yIHRoZSBzaWduYWwgbWFuYWdlclxyXG5cdCAqXHJcblx0ICogQHByb3RlY3RlZFxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJvdGVjdGVkIGNyZWF0ZVRyZWVHcmlkKCl7XHJcblx0XHQkKHRoaXMubWFpbkRpdikuZWpUcmVlR3JpZCh7XHJcblx0XHRcdC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCksXHJcblx0XHRcdC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5SZXNpemVTdXBwb3J0KCksXHJcblx0XHRcdC4uLnRoaXMuZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpLFx0XHJcblx0XHRcdC4uLnRoaXMuZ2V0VHJlZUdyaWRDZWxsRWRpdFN1cHBvcnQoKSxcclxuXHRcdFx0Li4udGhpcy5nZXRUcmVlR3JpZERyYWdEcm9wU3VwcG9ydCgpLFxyXG5cdFx0XHJcblx0XHRcdGRhdGFTb3VyY2U6dGhpcy5kYXRhTW9kZWwuZGF0YSxcclxuXHRcdFx0Y2hpbGRNYXBwaW5nOlwidmlzaWJsZUNoaWxkc1wiLFxyXG5cdFx0XHRleHBhbmRTdGF0ZU1hcHBpbmc6IFwiZXhwYW5kU3RhdGVcIixcclxuXHRcdFx0YWxsb3dSZW9yZGVyaW5nOiBmYWxzZSxcclxuXHRcdFx0cm93SGVpZ2h0OiAyOCxcclxuXHRcdFx0c2VsZWN0aW9uU2V0dGluZ3M6e1xyXG5cdFx0XHRcdHNlbGVjdGlvblR5cGUgOiAnbXVsdGlwbGUnIFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzZWxlY3Rpb25UeXBlOiAnbXVsdGlwbGUnLFxyXG5cdFx0XHRleHBhbmRlZDogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWROb2RlRXhwYW5kZWRPckNvbGxhcHNlZCgpLFxyXG5cdFx0XHRjb2xsYXBzZWQ6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkTm9kZUV4cGFuZGVkT3JDb2xsYXBzZWQoKSxcclxuXHJcblx0XHRcdHJlY29yZENsaWNrOiAoYXJncykgPT4gdGhpcy5jbGljayhhcmdzKSxcclxuXHRcdFx0cmVjb3JkRG91YmxlQ2xpY2s6IChhcmdzKSA9PiB0aGlzLmRvdWJsZUNsaWNrKGFyZ3MpLFxyXG5cdFx0XHRyb3dTZWxlY3RlZDogKGFyZ3MpID0+IHRoaXMucm93U2VsZWN0ZWQoYXJncy5kYXRhLml0ZW0sIGFyZ3MubW9kZWwuY3VycmVudFZpZXdEYXRhKSxcclxuXHRcdFx0Y3JlYXRlOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZENyZWF0ZWQoKSxcclxuXHRcdFx0YWN0aW9uQmVnaW46IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkQWN0aW9uQmVnaW4oYXJncyksXHJcblx0XHRcdGFjdGlvbkNvbXBsZXRlOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZEFjdGlvbkNvbXBsZXRlKGFyZ3MpLFxyXG5cdFx0XHRxdWVyeUNlbGxJbmZvOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZFF1ZXJ5Q2VsbEluZm8oYXJncyksXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiBkZWZpbml0aW9uXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEByZXR1cm5zIHt7fX1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCk6IHt9e1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Y29sdW1uczogW1xyXG5cdFx0XHRcdHsgZmllbGQ6IFNpZ25hbE1hbmFnZXJXaWRnZXQubmFtZUNvbHVtbklkLCBoZWFkZXJUZXh0OiBcIk5hbWVcIiwgd2lkdGg6IFwiMzUxcHhcIiAsIGlzVGVtcGxhdGVDb2x1bW46IHRydWUsIHRlbXBsYXRlSUQ6IFwic21OYW1lQ29sdW1uVGVtcGxhdGVcIn0sXHJcblx0XHRcdFx0eyBmaWVsZDogU2lnbmFsTWFuYWdlcldpZGdldC52YWx1ZUNvbHVtbklkLCBoZWFkZXJUZXh0OiBcIlZhbHVlXCIsIHZpc2libGU6IHRoaXMuZWRpdE1vZGVBY3RpdmUsIHdpZHRoOiBcIjMwMHB4XCIsIGVkaXRUZW1wbGF0ZTogU21UcmVlR3JpZENlbGxFZGl0VGVtcGxhdGUuY3JlYXRlSW5zdGFuY2UoKSwgaXNUZW1wbGF0ZUNvbHVtbjogdHJ1ZX0sXHJcblx0XHRcdFx0eyBmaWVsZDogU2lnbmFsTWFuYWdlcldpZGdldC5kZXNjcmlwdGlvbkNvbHVtbklkLCBoZWFkZXJUZXh0OiBcIkRlc2NyaXB0aW9uXCIsIHZpc2libGU6IHRoaXMuZWRpdE1vZGVBY3RpdmUsIHdpZHRoOiBcIjEwMHB4XCIgfSxcclxuXHRcdFx0XHR7IGZpZWxkOiBTaWduYWxNYW5hZ2VyV2lkZ2V0LmNvbG9yQ29sdW1uSWQsIGhlYWRlclRleHQ6IFwiQ29sb3JcIiwgd2lkdGg6IFwiNTBweFwiLCB2aXNpYmxlOiB0aGlzLmVkaXRNb2RlQWN0aXZlLCBlZGl0VHlwZTogXCJEYXRlUGlja2VyXCIsIGVkaXRUZW1wbGF0ZTogU21UcmVlR3JpZENlbGxFZGl0VGVtcGxhdGUuY3JlYXRlSW5zdGFuY2UoKSwgaXNUZW1wbGF0ZUNvbHVtbjogdHJ1ZSwgdGVtcGxhdGVJRDogXCJzbUNvbG9yQ29sdW1uVGVtcGxhdGVcIn0sXHJcblx0XHRcdFx0eyBmaWVsZDogU2lnbmFsTWFuYWdlcldpZGdldC5pY29uRGVmaW5pdGlvbkNvbHVtbklkLCB2aXNpYmxlOiBmYWxzZSwgd2lkdGg6IFwiMHB4XCIgfSxcclxuXHRcdFx0XSxcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY29sdW1uIHJlc2l6ZSBzZXR0aW5nc1xyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcmV0dXJucyB7e319XHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpOiB7fXtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGFsbG93Q29sdW1uUmVzaXplOiB0cnVlLFxyXG5cdFx0XHRjb2x1bW5SZXNpemVTZXR0aW5nczogeyBjb2x1bW5SZXNpemVNb2RlOiBlai5UcmVlR3JpZC5Db2x1bW5SZXNpemVNb2RlLkZpeGVkQ29sdW1uc1x0fSxcclxuXHRcdFx0Y29sdW1uUmVzaXplZDogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRDb2x1bW5SZXNpemVkKGFyZ3MpLFxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG4gICAgICogQSB0cmVlZ3JpZCBjb2x1bW4gd2FzIHJlc2l6ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHRyZWVHcmlkQ29sdW1uUmVzaXplZChhcmdzKXtcclxuXHRcdHN1cGVyLnJlc2l6ZUR5bmFtaWNDb2x1bW4oYXJncy5jb2x1bW5JbmRleCwgYXJncy5tb2RlbCk7XHJcblx0XHR0aGlzLnNhdmVUcmVlR3JpZFNldHRpbmdzKCk7XHJcbiAgICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCB0b29sYmFyIHNldHRpbmdzXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEByZXR1cm5zIHt7fX1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByb3RlY3RlZCBnZXRUcmVlR3JpZFRvb2xiYXJTdXBwb3J0KCk6IHt9e1xyXG5cdFx0dGhpcy5fdG9vbGJhciA9IG5ldyBTaWduYWxNYW5hZ2VyVHJlZUdyaWRUb29sYmFyKHRoaXMubWFpbkRpdik7XHRcclxuXHRcdHJldHVybiBzdXBlci5nZXRUcmVlR3JpZFRvb2xiYXJTdXBwb3J0KCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY2VsbCBlZGl0IHNldHRpbmdzXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEByZXR1cm5zIHt7fX1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZ2V0VHJlZUdyaWRDZWxsRWRpdFN1cHBvcnQoKToge317XHJcblx0XHR2YXIgY2VsbEVkaXRFdmVudHMgPSBuZXcgU21UcmVlR3JpZENlbGxFZGl0RXZlbnRzKCk7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRlZGl0U2V0dGluZ3M6IHtcdGFsbG93RWRpdGluZzogdHJ1ZSB9LFxyXG5cdFx0XHRiZWdpbkVkaXQ6IChhcmdzKSA9PiBjZWxsRWRpdEV2ZW50cy5iZWdpbkVkaXQoYXJncywgdGhpcyksXHJcblx0XHRcdGVuZEVkaXQ6IChhcmdzKSA9PiBjZWxsRWRpdEV2ZW50cy5lbmRFZGl0KGFyZ3MsIHRoaXMpLFxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFjdGl2YXRlcyB0aGUgc2lnbmFsIG1hbmFnZXIgZHJhZyBhbmQgZHJvcCBzdXBwb3J0XHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEByZXR1cm5zIHt7fX1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZ2V0VHJlZUdyaWREcmFnRHJvcFN1cHBvcnQoKToge317XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRhbGxvd0RyYWdBbmREcm9wIDogdHJ1ZSxcclxuXHRcdFx0cm93RHJhZ1N0YXJ0OiAoYXJncykgPT4gdGhpcy5yb3dEcmFnU3RhcnQoYXJncyksXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU3dpdGNoIGludG8gXCJlZGl0IG1vZGVcIiBvciBcIm5vcm1hbCBtb2RlXCJcclxuXHQgKiBpZiBlZGl0IG1vZGUgaXMgYWN0aXZlLCB0aGUgZWRpdCBtb2RlIHdpbGwgYmUgc2V0IHRvIHRoZSBkYXRhbW9kZWwsIGFuZCB0aGUgd2lkZ2V0IHNpemUgd2lsbCBiZSBpbmNyZWFzZWRcclxuXHQgKiBpZiBub3JtYWwgbW9kZSBpcyBhY3RpdmUsIHRoZSBub3JtYWwgbW9kZSB3aWxsIGJlIHNldCB0byB0aGUgZGF0YW1vZGVsLCBhbmQgdGhlIHdpZGdldCBzaXplIHdpbGwgYmUgZGVjcmVhc2VkXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gYWN0aXZlXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIHNldEVkaXRNb2RlKGFjdGl2ZTpib29sZWFuKXtcclxuXHRcdGlmKHRoaXMuZWRpdE1vZGVBY3RpdmUgIT0gYWN0aXZlKXtcclxuXHRcdFx0aWYoYWN0aXZlID09IHRydWUpe1xyXG5cdFx0XHRcdHRoaXMub25DaGFuZ2VTaXplKHRoaXMuX2FjdHVhbFdpZHRoICsgdGhpcy5fd2lkdGhEaWZmZXJlbmNlKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNle1xyXG5cdFx0XHRcdGxldCBuZXdTaXplID0gdGhpcy5fYWN0dWFsV2lkdGggLSB0aGlzLl93aWR0aERpZmZlcmVuY2U7XHJcblx0XHRcdFx0aWYobmV3U2l6ZSA8IHRoaXMuX21pbldpZHRoKXtcclxuXHRcdFx0XHRcdG5ld1NpemUgPSB0aGlzLl9taW5XaWR0aDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy5vbkNoYW5nZVNpemUobmV3U2l6ZSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHRoaXMuZWRpdE1vZGVBY3RpdmUgPSBhY3RpdmU7XHJcblx0XHQodGhpcy5kYXRhTW9kZWwgYXMgSVNpZ25hbE1hbmFnZXJEYXRhTW9kZWwpLmVkaXRNb2RlQWN0aXZlID0gdGhpcy5lZGl0TW9kZUFjdGl2ZTtcclxuXHJcblx0XHQodGhpcy5fdG9vbGJhciBhcyBTaWduYWxNYW5hZ2VyVHJlZUdyaWRUb29sYmFyKS5hY3RpdmF0ZUVkaXRNb2RlQnV0dG9uKHRoaXMuZWRpdE1vZGVBY3RpdmUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogV2VsbCBiZSBjYWxsZWQgYWZ0ZXIgc29tZSB0cmVlIGdyaWQgYWN0aW9uIHdhcyBzdGFydGVkXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7Kn0gYXJnc1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSB0cmVlR3JpZEFjdGlvbkJlZ2luKGFyZ3Mpe1xyXG5cdFx0Ly8gU3VwcG9ydCBcIkVudGYvRGVsXCIga2V5XHJcblx0XHRpZihhcmdzLnJlcXVlc3RUeXBlID09IFwiZGVsZXRlXCIpe1xyXG5cdFx0XHRhcmdzLmNhbmNlbCA9IHRydWU7XHJcblx0XHRcdGlmICh0aGlzLmNvbnRhaW5zSXRlbVdpdGhpblJlY2VudE9yVXBsb2FkZWQoYXJncy5kZWxldGVkSXRlbXMpKSB7XHJcblx0XHRcdFx0dGhpcy5zaG93TWVzc2FnZUJveEZvckRlbGV0aW5nSXRlbShhcmdzLmRlbGV0ZWRJdGVtcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZUl0ZW1zKGFyZ3MuZGVsZXRlZEl0ZW1zKTtcclxuICAgICAgICAgICAgfVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcbiAgICAgKiBMb2FkcyB0aGUgc3R5bGVzIGZvciB0aGUgY2hhcnQgbWFuYWdlciB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGxvYWRTdHlsZXMoKSB7XHJcbiAgICAgICAgc3VwZXIubG9hZFN0eWxlcygpO1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy9jb21tb24vc3R5bGUvY3NzL2Ryb3BEb3duTWVudVN0eWxlLmNzc1wiKTtcclxuICAgIH1cclxuXHJcblx0LyoqXHJcblx0ICogV2VsbCBiZSBjYWxsZWQgYWZ0ZXIgc29tZSB0cmVlIGdyaWQgYWN0aW9uIHdhcyBjb21wbGV0ZWRcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHsqfSBhcmdzXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIHRyZWVHcmlkQWN0aW9uQ29tcGxldGUoYXJncyl7IFxyXG5cdFx0Ly8gRXZlbnQgdHJpZ2dlciB3aGlsZSBjaGFuZ2luZyBkYXRhc291cmNlIGR5bmFtaWNhbGx5LiBcclxuXHRcdC8vIGNvZGUgdG8gZG9uZSBhZnRlciB0aGUgZHluYW1pYyBjaGFuZ2Ugb2YgZGF0YXNvdXJjZS4gXHJcblx0XHRpZiAoYXJncy5yZXF1ZXN0VHlwZSA9PT0gJ3JlZnJlc2hEYXRhU291cmNlJykgeyBcclxuXHRcdFx0dGhpcy5yZWZyZXNoU2VsZWN0aW9uKCk7XHJcblx0XHRcdGlmKHRoaXMuX3NlcmllQ29udGFpbmVyVG9TZWxlY3RBZnRlclJlZnJlc2ggIT0gdW5kZWZpbmVkKXtcdFx0XHRcdFxyXG5cdFx0XHRcdC8vIFNlbGVjdHMgdGhlIGltcG9ydGVkIHNpZ25hbGZpbGUsIG9yIHRoZSBpbnNlcnRlZCBjYWxjdWxhdGlvbiwgLi4uXHJcblx0XHRcdFx0dGhpcy5zZWxlY3RJdGVtKHRoaXMuX3NlcmllQ29udGFpbmVyVG9TZWxlY3RBZnRlclJlZnJlc2gpO1xyXG5cdFx0XHRcdHRoaXMuX3NlcmllQ29udGFpbmVyVG9TZWxlY3RBZnRlclJlZnJlc2ggPSB1bmRlZmluZWQ7XHJcblx0XHRcdH1cclxuXHRcdH0gXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBXaWxsIGJlIGNhbGxlZCB0byB1cGRhdGUgdGhlIHN0eWxlIG9mIHRoZSBnaXZlIGNlbGwgaWYgYSByZWZyZXNoIHdpbGwgYmUgbmVlZGVkXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7Kn0gYXJnc1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSB0cmVlR3JpZFF1ZXJ5Q2VsbEluZm8oYXJncyl7XHJcblx0XHRpZiAoYXJncy5jb2x1bW4uZmllbGQgPT0gXCJuYW1lXCIpe1xyXG5cdFx0XHRpZih0aGlzLmlzR3JvdXBJdGVtKGFyZ3MuZGF0YS5pdGVtKSkge1xyXG5cdFx0XHRcdC8vIFNob3cgZ3JvdXAgbm9kZXMgYWx3YXlzIGJvbGQgPT4gYWxzbyBpZiB0aGV5IGhhdmUgbm8gY2hpbGRzXHJcblx0XHRcdFx0aWYoYXJncy5jZWxsRWxlbWVudC5zdHlsZSAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRcdFx0aWYoYXJncy5kYXRhLmxldmVsID09IDApe1xyXG5cdFx0XHRcdFx0XHRhcmdzLmNlbGxFbGVtZW50LnN0eWxlLmZvbnRXZWlnaHQgPSBcIjgwMFwiOyAvLyA3MDAgd291bGQgYmUgYm9sZFxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZXtcclxuXHRcdFx0XHRcdFx0YXJncy5jZWxsRWxlbWVudC5zdHlsZS5mb250V2VpZ2h0ID0gXCI2NTBcIjtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gU2hvdyBhbGwgbm9kZXMgcmVkIHdoaWNoIGhhdmUgaW52YWxpZCBzaWduYWxzIGluIGl0IFxyXG5cdFx0XHRpZih0aGlzLmlzSXRlbUludmFsaWQoYXJncy5kYXRhLml0ZW0pID09IHRydWUpe1xyXG5cdFx0XHRcdGlmKGFyZ3MuY2VsbEVsZW1lbnQuc3R5bGUgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0XHRcdGFyZ3MuY2VsbEVsZW1lbnQuc3R5bGUuY29sb3IgPSBcInJlZFwiO1xyXG5cdFx0XHRcdFx0YXJncy5jZWxsRWxlbWVudC5zdHlsZS5mb250V2VpZ2h0ID0gXCJib2xkXCI7XHJcblx0XHRcdFx0XHQvL2FyZ3MuY2VsbEVsZW1lbnQuaW5uZXJUZXh0ID0gYXJncy5jZWxsRWxlbWVudC5pbm5lclRleHQgKyBcIihpbnZhbGlkKVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSBcclxuXHRcdGVsc2UgaWYgKGFyZ3MuY29sdW1uLmZpZWxkID09IFwidmFsdWVcIil7XHJcblx0XHRcdGlmKGFyZ3MuZGF0YS5kcm9wUG9zc2libGUgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICBhcmdzLmNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJkcm9wTG9jYXRpb25BcmVhXCIpO1xyXG5cdFx0XHR9XHJcblx0XHR9ICAgICAgXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBIYXMgdGhlIGdpdmVuIGl0ZW0gc29tZSBkYXRhIGFuZCBpcyB0aGlzIGRhdGEgdmFsaWQgXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7Kn0gaXRlbVxyXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBpc0l0ZW1JbnZhbGlkKGl0ZW0pOiBib29sZWFue1xyXG5cdFx0aWYoaXRlbSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbil7XHJcblx0XHRcdGxldCBjYWxjdWxhdGVkU2lnbmFscyA9IGl0ZW0uZ2V0U2VyaWVzKCk7XHJcblx0XHRcdC8vIGNoZWNrIGlmIGEgY2FsY3VsYXRlZCBvdXRwdXQgc2lnbmFsIGlzIGludmFsaWRcclxuXHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IGNhbGN1bGF0ZWRTaWduYWxzLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0XHRpZihjYWxjdWxhdGVkU2lnbmFsc1tpXS5yYXdQb2ludHNWYWxpZCA9PSBmYWxzZSl7XHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGVsc2UgaWYoaXRlbSBpbnN0YW5jZW9mIFNlcmllTm9kZSApe1xyXG5cdFx0XHRpZihpdGVtLnNlcmllICE9IHVuZGVmaW5lZCAmJiBpdGVtLnNlcmllLnJhd1BvaW50c1ZhbGlkID09IGZhbHNlKXtcclxuXHRcdFx0XHRpZihpdGVtIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YSl7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNle1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEEgZHJhZyBhbmQgZHJvcCBvcGVyYXRpb24gd2FzIHN0YXJ0ZWRcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHsqfSBhcmdzXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIHJvd0RyYWdTdGFydChhcmdzKXtcclxuXHRcdHRoaXMuX2luZGV4ZXNEcmFnZ2VkID0gW107XHJcblx0XHRcclxuXHRcdGxldCBzZWxlY3RlZEVsZW1lbnRzID0gdGhpcy5jaGVja1NlbGVjdGVkRWxlbWVudHMoYXJncy5kcmFnZ2VkUmVjb3JkcywgYXJncy5kcmFnZ2VkUm93KTtcclxuXHRcdGlmIChzZWxlY3RlZEVsZW1lbnRzLmxlbmd0aCA+IDAgKSB7XHJcblx0XHRcdHRoaXMuX2N1cnJlbnREcmFnRHJvcFNlcmllcyA9IHNlbGVjdGVkRWxlbWVudHM7XHJcblx0XHRcdCAvLyBTZXQgY3VycmVudCBkcmFnIGRyb3Agc2lnbmFsXHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5fY3VycmVudERyYWdEcm9wU2VyaWVzID0gdW5kZWZpbmVkOyAvLyBSZXNldCBjdXJyZW50IGRyYWcgZHJvcCBzaWduYWxcclxuXHRcdH1cclxuXHJcblx0XHQvLyBSZXNldHMgZHJhZ2dlZCBSZWNvcmRzIGJlY2F1c2UgdGhlIHRyZWUgZ3JpZCBkcmFnIGRyb3AgaXMgY2FuY2VsZWQoZ2VuZXJhbCBkcmFnIGRyb3AgaXMgdXNlZCBhZnRlciBjb2xsZWN0aW9uIHRoZSBkcmFnIG9iamVjdCBkYXRhIGhlcmUpXHJcblx0XHQvLyBJZiBkcmFnZ2VkIFJlY29yZHMgd2lsbCBub3QgYmUgcmVzZXRldCB0aGUgbmV4dCBkcmFnIGRyb3AgcmVjb3JkcyB3aWxsIGJlIGFkZGVkIHRvIHRoZSBjdXJyZW50IHJlY29yZHNcclxuXHRcdC8vIGFyZ3MuZHJhZ2dlZFJlY29yZHMgPSBbXTsgLy8gTm90IHdvcmtpbmcsIHdlIGhhdmUgdG8gcmVzZXQgaXQgZGlyZWN0bHkgaW4gdGhlIHRyZWUgZ3JpZCBvYmplY3RcclxuXHRcdHRoaXMuY2xlYXJEcmFnZ2VkUmVjb3JkcygpXHJcblx0XHRcclxuXHRcdGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgcmVmcmVzaFNlbGVjdGlvbigpe1xyXG5cdFx0Y29uc3QgdHJlZU9iaiA9ICQodGhpcy5tYWluRGl2KS5lalRyZWVHcmlkKCdpbnN0YW5jZScpOyBcclxuXHRcdFx0XHRcdFx0XHJcblx0XHQvLyBHZXQgYWN0dWFsIHNlbGVjdGlvbiBpbmRleFxyXG5cdFx0bGV0IGFjdHVhbFNlbGVjdGVkUm93SW5kZXggPSB0cmVlT2JqLm1vZGVsLnNlbGVjdGVkUm93SW5kZXg7XHJcblx0XHQvLyBSZXNldCBzZWxlY3Rpb25cclxuXHRcdHRyZWVPYmoubW9kZWwuc2VsZWN0ZWRSb3dJbmRleCA9IC0xO1xyXG5cdFx0XHJcblx0XHQvLyBTZXQgdG8gbGFzdCBpbmRleCBpZiBpbmRleCBpcyBvdXQgb2YgcmFuZ2VcclxuXHRcdGlmKGFjdHVhbFNlbGVjdGVkUm93SW5kZXggPj0gdHJlZU9iai5tb2RlbC5mbGF0UmVjb3Jkcy5sZW5ndGgpe1xyXG5cdFx0XHRhY3R1YWxTZWxlY3RlZFJvd0luZGV4ID0gdHJlZU9iai5tb2RlbC5mbGF0UmVjb3Jkcy5sZW5ndGgtMTtcclxuXHRcdH1cclxuXHRcdC8vIFNldCBzZWxlY3Rpb25cclxuXHRcdHRyZWVPYmoubW9kZWwuc2VsZWN0ZWRSb3dJbmRleCA9IGFjdHVhbFNlbGVjdGVkUm93SW5kZXg7XHJcblx0XHRcclxuXHRcdGxldCBhcmVFbGVtZW50c0V4cG9ydGFibGUgPSB0aGlzLmNhbkl0ZW1zQmVFeHBvcnRlZCh0cmVlT2JqLm1vZGVsLmZsYXRSZWNvcmRzKTtcclxuXHJcblx0XHQvLyB1cGRhdGUgdG9vbGJhciBidXR0b25zXHJcblx0XHRpZih0cmVlT2JqLm1vZGVsLmZsYXRSZWNvcmRzW2FjdHVhbFNlbGVjdGVkUm93SW5kZXhdICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdHRoaXMudXBkYXRlVG9vbGJhckJ1dHRvblN0YXRlcyh0cmVlT2JqLm1vZGVsLmZsYXRSZWNvcmRzW2FjdHVhbFNlbGVjdGVkUm93SW5kZXhdLml0ZW0sIGFyZUVsZW1lbnRzRXhwb3J0YWJsZSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLnVwZGF0ZVRvb2xiYXJCdXR0b25TdGF0ZXModW5kZWZpbmVkLCBhcmVFbGVtZW50c0V4cG9ydGFibGUpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSByb3dTZWxlY3RlZChpdGVtOiBhbnksIGN1cnJlbnRWaWV3RGF0YSl7XHJcblx0XHRsZXQgYXJlRWxlbWVudHNFeHBvcnRhYmxlID0gdGhpcy5jYW5JdGVtc0JlRXhwb3J0ZWQoY3VycmVudFZpZXdEYXRhKTtcclxuXHRcdHRoaXMudXBkYXRlVG9vbGJhckJ1dHRvblN0YXRlcyhpdGVtLCBhcmVFbGVtZW50c0V4cG9ydGFibGUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogdXBkYXRlcyB0aGUgdG9vbGJhciBidXR0b25zKGUuZy4gaW5zZXJ0IGNhbHVsYXRpb24gb25seSBlbmFibGVkIG9uIFNlcmllR3JvdXAgb3IgdW5kZXIgXCJDYWxjdWxhdGVkIHNpZ25hbHNcIiBjYXRlZ29yeSlcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtJU2VyaWVOb2RlfSBpdGVtXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIHVwZGF0ZVRvb2xiYXJCdXR0b25TdGF0ZXMoaXRlbTogSVNlcmllTm9kZSB8IHVuZGVmaW5lZCwgYXJlRWxlbWVudHNFeHBvcnRhYmxlOiBib29sZWFuKXtcclxuXHRcdGxldCB0b29sYmFyID0gdGhpcy5fdG9vbGJhciBhcyBTaWduYWxNYW5hZ2VyVHJlZUdyaWRUb29sYmFyO1xyXG5cdFx0aWYgKGl0ZW0gPT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0dG9vbGJhci5kaXNhYmxlSW5zZXJ0Q2FsY3VsYXRpb25CdXR0b24odHJ1ZSk7XHJcblx0XHRcdHRvb2xiYXIuZGlzYWJsZURlbGV0ZUJ1dHRvbih0cnVlKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHQvLyBzZXQgZGVsZXRlIGJ1dHRvbiBzdGF0ZVxyXG5cdFx0XHR0b29sYmFyLmRpc2FibGVEZWxldGVCdXR0b24oIWl0ZW0uY2FuRGVsZXRlKTtcclxuXHJcblx0XHRcdGlmKGl0ZW0gaW5zdGFuY2VvZiBTZXJpZUdyb3VwKXtcclxuXHRcdFx0XHR0b29sYmFyLmRpc2FibGVFeHBvcnRCdXR0b24oZmFsc2UpO1xyXG5cdFx0XHRcdHRvb2xiYXIuZGlzYWJsZUluc2VydENhbGN1bGF0aW9uQnV0dG9uKGZhbHNlKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNle1xyXG5cdFx0XHRcdGlmKGl0ZW0uZ2V0U2VyaWVHcm91cCgpID09IHVuZGVmaW5lZCl7XHJcblx0XHRcdFx0XHR0b29sYmFyLmRpc2FibGVJbnNlcnRDYWxjdWxhdGlvbkJ1dHRvbih0cnVlKTtcclxuXHRcdFx0XHRcdHRvb2xiYXIuZGlzYWJsZUV4cG9ydEJ1dHRvbih0cnVlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSBpZihpdGVtIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlICYmIGl0ZW0ubmFtZSA9PSAnQWxnb3JpdGhtJyB8fCBpdGVtIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhICYmIGl0ZW0uc2VyaWUgPT0gdW5kZWZpbmVkIHx8XHJcblx0XHRcdFx0KChpdGVtIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uIHx8IGl0ZW0gaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhKSAmJiAoaXRlbS5zZXJpZSA9PSB1bmRlZmluZWQgfHwgaXRlbS5zZXJpZSEucmF3UG9pbnRzVmFsaWQgPT0gZmFsc2UpKSl7XHJcblx0XHRcdFx0XHR0b29sYmFyLmRpc2FibGVJbnNlcnRDYWxjdWxhdGlvbkJ1dHRvbihmYWxzZSk7XHJcblx0XHRcdFx0XHR0b29sYmFyLmRpc2FibGVFeHBvcnRCdXR0b24odHJ1ZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2V7XHJcblx0XHRcdFx0XHR0b29sYmFyLmRpc2FibGVFeHBvcnRCdXR0b24oZmFsc2UpO1xyXG5cdFx0XHRcdFx0dG9vbGJhci5kaXNhYmxlSW5zZXJ0Q2FsY3VsYXRpb25CdXR0b24oZmFsc2UpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVx0XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGFyZUVsZW1lbnRzRXhwb3J0YWJsZSkge1xyXG5cdFx0XHR0b29sYmFyLmRpc2FibGVFeHBvcnRCdXR0b24oZmFsc2UpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRvb2xiYXIuZGlzYWJsZUV4cG9ydEJ1dHRvbih0cnVlKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBjYW5JdGVtc0JlRXhwb3J0ZWQoaXRlbXMpOiBib29sZWFuIHtcclxuXHRcdGxldCBjYW5CZUV4cG9ydGVkID0gZmFsc2U7XHJcblx0XHRsZXQgZXhwb3J0SGVscGVyID0gbmV3IEV4cG9ydEhlbHBlcigpO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAoZXhwb3J0SGVscGVyLmlzRWxlbWVudEV4cG9ydGFibGUoaXRlbXNbaV0uaXRlbSkgPT09IHRydWUpIHtcclxuXHRcdFx0XHRjYW5CZUV4cG9ydGVkID0gdHJ1ZTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGNhbkJlRXhwb3J0ZWQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBIGNsaWNrIG9uIHRoZSB0cmVlIGdyaWQgKG5lZWRlZCBmb3IgcmVzZXRpbmcgdGhlIGN1cnJlbnQgZHJhZyBkcm9wIHNpZ25hbClcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHsqfSBhcmdzXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGNsaWNrKGFyZ3Mpe1xyXG5cdFx0Ly8gUmVzZXQgY3VycmVudCBkcmFnIGRyb3Agc2lnbmFsIGFmdGVyIGNsaWNrIHdhcyBmaW5pc2hlZChjbGljayB1cClcclxuXHRcdHRoaXMuX2N1cnJlbnREcmFnRHJvcFNlcmllcyA9IHVuZGVmaW5lZDtcclxuXHRcdHRoaXMuZm9jdXMoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEEgZG91YmxlIGNsaWNrIG9uIHRoZSB0cmVlIGdyaWQgd2FzIGRvbmVcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHsqfSBhcmdzXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGRvdWJsZUNsaWNrKGFyZ3Mpe1xyXG5cdFx0aWYoYXJncy5jZWxsSW5kZXggPT0gMCl7XHJcblx0XHRcdGxldCBzZXJpZU5vZGUgPSBhcmdzLmRhdGEuaXRlbTtcclxuXHRcdFx0bGV0IGZvdW5kU2VyaWVzID0gdGhpcy5nZXRTZXJpZXNGcm9tSXRlbShzZXJpZU5vZGUpO1xyXG5cdFx0XHRpZihmb3VuZFNlcmllcy5sZW5ndGggPiAwKXtcclxuXHRcdFx0XHQvLyBPbmx5IG9uZSBzZXJpZSBjYW4gYmUgYWRkZWQgYnkgZG91YmxlIGNsaWNrIGN1cnJlbnRseShUT0RPOiBhZGQgbXVsdGkgaW5zZXJ0KVxyXG5cdFx0XHRcdHRoaXMub25TZXJpZXNEb3VibGVDbGlja2VkKGZvdW5kU2VyaWVzWzBdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgYWxsIGVsZW1lbnRzIHNlbGVjdGVkIGFyZSBzZXJpZXMgYW5kIG9mIHRoZSBzYW1lIHR5cGVcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHsqfSBlbGVtZW50c1xyXG5cdCAqIEBwYXJhbSB7Kn0gZHJhZ2dlZFJvd1xyXG5cdCAqIEByZXR1cm5zIHtBcnJheTxCYXNlU2VyaWVzPn1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgY2hlY2tTZWxlY3RlZEVsZW1lbnRzKGVsZW1lbnRzLCBkcmFnZ2VkUm93KTpBcnJheTxCYXNlU2VyaWVzPiB7XHJcblx0XHRsZXQgc2VyaWVzID0gbmV3IEFycmF5PEJhc2VTZXJpZXM+KCk7XHJcblx0XHRsZXQgaXRlbXMgPSBuZXcgQXJyYXk8YW55PigpO1xyXG5cdFx0bGV0IGRyYWdnZWRSb3dJc1NlbGVjdGVkID0gZmFsc2U7XHJcblx0XHRsZXQgaW52YWxpZFNlbGVjdGlvbiA9IGZhbHNlO1xyXG5cclxuXHRcdGlmIChkcmFnZ2VkUm93ID09IHVuZGVmaW5lZCB8fCBkcmFnZ2VkUm93LnNlcmllID09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gW107XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHR5cGUgPSBkcmFnZ2VkUm93LnNlcmllLnR5cGU7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSA9IGkgKyAxKXtcclxuXHRcdFx0aWYgKGVsZW1lbnRzW2ldLnNlcmllID09IHVuZGVmaW5lZCB8fCBlbGVtZW50c1tpXS5zZXJpZS50eXBlICE9IHR5cGUpIHtcclxuXHRcdFx0XHRpbnZhbGlkU2VsZWN0aW9uID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoZWxlbWVudHNbaV0gPT0gZHJhZ2dlZFJvdykge1xyXG5cdFx0XHRcdGRyYWdnZWRSb3dJc1NlbGVjdGVkID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRzZXJpZXMucHVzaChlbGVtZW50c1tpXS5zZXJpZSk7XHJcblx0XHRcdGl0ZW1zLnB1c2goZWxlbWVudHNbaV0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChkcmFnZ2VkUm93Lml0ZW0gaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGEpe1xyXG5cdFx0XHR0aGlzLl9jdXJyZW50Q2FsY3VsYXRvclR5cGUgPSBkcmFnZ2VkUm93LnBhcmVudDtcclxuXHRcdH1cclxuXHJcblx0XHQvL09uY2UgYWxsIGVsZW1lbnRzIGhhdmUgYmVlbiBjaGVja2VkLCBzZWxlY3QgY29ycmVjdCBlbGVtZW50cyBhY2NvcmRpbmcgdG8gdGhlIGV4Y2VwdGlvbnNcclxuXHRcdGlmICghZHJhZ2dlZFJvd0lzU2VsZWN0ZWQpIHtcclxuXHRcdFx0c2VyaWVzID0gW107XHJcblx0XHRcdHNlcmllcy5wdXNoKGRyYWdnZWRSb3cuc2VyaWUpO1xyXG5cdFx0XHR0aGlzLl9pbmRleGVzRHJhZ2dlZCA9IFtdO1xyXG5cdFx0XHR0aGlzLl9pbmRleGVzRHJhZ2dlZC5wdXNoKGRyYWdnZWRSb3cuaW5kZXgpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZihpbnZhbGlkU2VsZWN0aW9uKSB7XHJcblx0XHRcdHJldHVybiBbXTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRzZXJpZXMgPSB0aGlzLmRlbGV0ZUVxdWFsU2lnbmFscyhzZXJpZXMsIGl0ZW1zKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIHNlcmllcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlbGV0ZSBkdXBsaWNhdGVkIHNpZ25hbHMgZnJvbSB0aGUgZHJhZyZkcm9wIGFycmF5XHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7QXJyYXk8QmFzZVNlcmllcz59IHNlcmllc1xyXG5cdCAqIEBwYXJhbSB7Kn0gZWxlbWVudHNcclxuXHQgKiBAcmV0dXJuc1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBkZWxldGVFcXVhbFNpZ25hbHMoc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPiwgZWxlbWVudHMpIHtcclxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCBzZXJpZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKGVsZW1lbnRzW2ldLml0ZW0gaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGEpe1xyXG5cdFx0XHRcdGxldCBzZWxlY3RlZEl0ZW1zID0gT2JqZWN0LmFzc2lnbihbXSwgc2VyaWVzKTtcclxuXHRcdFx0XHRzZWxlY3RlZEl0ZW1zLnNwbGljZShpLCAxKTtcclxuXHRcdFx0XHRpZiAoc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhzZXJpZXNbaV0pKXtcclxuXHRcdFx0XHRcdHNlcmllcy5zcGxpY2UoaSwgMSk7XHJcblx0XHRcdFx0XHRlbGVtZW50cy5zcGxpY2UoaSwgMSk7XHJcblx0XHRcdFx0XHRpID0gLTE7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHRoaXMuX2luZGV4ZXNEcmFnZ2VkLnB1c2goZWxlbWVudHNbaV0uaW5kZXgpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gc2VyaWVzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyBhbGwgc2VyaWVzIHdoaWNoIHdlcmUgZm91bmQgaW4gdGhlIHNlcmllIG5vZGUgaXRlbShlLmcuIGEgbm9ybWFsIHNlcmllIG9yIGNhbGN1bGF0ZWQgc2VyaWVzKVxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0geyp9IGl0ZW1cclxuXHQgKiBAcmV0dXJucyB7QXJyYXk8QmFzZVNlcmllcz59XHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGdldFNlcmllc0Zyb21JdGVtKGl0ZW0pOiBBcnJheTxCYXNlU2VyaWVzPntcclxuXHRcdGxldCBzaWduYWxzID0gbmV3IEFycmF5PEJhc2VTZXJpZXM+KCk7XHJcblx0XHRpZihpdGVtIGluc3RhbmNlb2YgU2VyaWVOb2RlICYmIGl0ZW0uc2VyaWUgIT0gdW5kZWZpbmVkKXsgLy8gSXMgU2lnbmFsIG5vZGVcclxuXHRcdFx0c2lnbmFscy5wdXNoKGl0ZW0uc2VyaWUpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZihpdGVtIGluc3RhbmNlb2YgU2VyaWVDb250YWluZXIpeyAvLyBpcyBjYWxjdWxhdGlvbihncm91cCBub2RlKSB3aXRoIHNpZ25hbHNcclxuXHRcdFx0cmV0dXJuIGl0ZW0uZ2V0U2VyaWVzKCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gc2lnbmFscztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIElzIHRoZSBnaXZlbiBpdGVtIGEgZ3JvdXAgaXRlbSAoZS5nLiBuZWVkZWQgZm9yIHNldHRpbmcgdGhlIGZvbnQgc3R5bGUgdG8gYm9sZClcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtJU2VyaWVDb250YWluZXJ9IGl0ZW1cclxuXHQgKiBAcmV0dXJuc1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBpc0dyb3VwSXRlbShpdGVtOiBJU2VyaWVDb250YWluZXIpOiBib29sZWFue1xyXG5cdFx0aWYoaXRlbSA9PSB1bmRlZmluZWQpe1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRpZihpdGVtLnZpc2libGVDaGlsZHMgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRpbnNlcnRDYWxjdWxhdGlvbihpdGVtKTogU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9ufHVuZGVmaW5lZHtcclxuXHRcdGlmKGl0ZW0gPT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0dmFyIHNlbGVjdGVkSXRlbSA9IGl0ZW0uaXRlbTtcclxuXHRcdHZhciBzZXJpZUdyb3VwO1xyXG5cdFx0aWYoc2VsZWN0ZWRJdGVtIGluc3RhbmNlb2YgU2VyaWVHcm91cCB8fCBzZWxlY3RlZEl0ZW0gaW5zdGFuY2VvZiBTaWduYWxDYXRlZ29yeSl7XHJcblx0XHRcdC8vIENhbGN1bGF0aW9uIGNhbiBvbmx5IGJlIGluc2VydCBhdCBncm91cHMgb3IgY2F0ZWdvcmllc1xyXG5cdFx0XHRzZXJpZUdyb3VwID0gc2VsZWN0ZWRJdGVtO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZXtcclxuXHRcdFx0c2VyaWVHcm91cCA9IHNlbGVjdGVkSXRlbS5nZXRTZXJpZUdyb3VwKCk7XHJcblx0XHR9XHJcblx0XHRpZihzZXJpZUdyb3VwICE9IHVuZGVmaW5lZCl7XHJcblxyXG5cdFx0XHR0aGlzLmFjdGl2YXRlRWRpdE1vZGUodHJ1ZSk7XHJcblx0XHRcdHJldHVybiB0aGlzLmFkZENhbGN1bGF0aW9uVG9Db250YWluZXIoc2VyaWVHcm91cCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xyXG5cdH1cclxuXHRcclxuXHRwcml2YXRlIGFkZENhbGN1bGF0aW9uVG9Db250YWluZXIoY29udGFpbmVyOiBJU2VyaWVDb250YWluZXIpOiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb258dW5kZWZpbmVke1xyXG5cdFx0aWYodGhpcy5fc2VyaWVzUHJvdmlkZXIgPT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcclxuXHRcdH1cclxuXHRcdGxldCBjYWxjdWxhdGlvbiA9IG5ldyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24oXCJDYWxjdWxhdGlvblwiLCB0aGlzLl9zZXJpZXNQcm92aWRlcik7XHJcblx0XHR0aGlzLl9zZXJpZUNvbnRhaW5lclRvU2VsZWN0QWZ0ZXJSZWZyZXNoID0gY2FsY3VsYXRpb247XHJcblx0XHRjb250YWluZXIuYWRkU2VyaWVDb250YWluZXIoY2FsY3VsYXRpb24sIC0xKTtcclxuXHRcdHJldHVybiBjYWxjdWxhdGlvbjtcclxuICAgIH1cclxuXHJcblx0cHVibGljIGdldENvbXBvbmVudFNldHRpbmdzKG9ubHlNb2RpZmllZDogYm9vbGVhbik6IENvbXBvbmVudFNldHRpbmdze1xyXG5cdFx0dGhpcy5jb21wb25lbnQuc2V0U2V0dGluZyhXaWRnZXRCYXNlLldpZGdldFNldHRpbmdJZCwgdGhpcy5nZXRXaWRnZXRTZXR0aW5ncygpKTtcclxuXHRcdHJldHVybiBzdXBlci5nZXRDb21wb25lbnRTZXR0aW5ncyhvbmx5TW9kaWZpZWQpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldENvbXBvbmVudFNldHRpbmdzKGRhdGE6IENvbXBvbmVudFNldHRpbmdzKSB7XHJcblx0XHRzdXBlci5zZXRDb21wb25lbnRTZXR0aW5ncyhkYXRhKTtcclxuXHRcdHRoaXMuc2V0V2lkZ2V0U2V0dGluZ3ModGhpcy5jb21wb25lbnQuZ2V0U2V0dGluZyhXaWRnZXRCYXNlLldpZGdldFNldHRpbmdJZCkpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBnZXRXaWRnZXRTZXR0aW5ncygpOiBhbnl7XHJcblx0XHRsZXQgc2V0dGluZ3MgPSB7XCJlZGl0TW9kZUFjdGl2ZVwiOiB0aGlzLmVkaXRNb2RlQWN0aXZlLFxyXG5cdFx0XHRcdFx0XHRcIndpZHRoXCI6IHRoaXMuX2FjdHVhbFdpZHRoXHJcblx0XHRcdFx0XHRcdH07XHJcblx0XHRyZXR1cm4gc2V0dGluZ3M7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHNldFdpZGdldFNldHRpbmdzKGRhdGE6IGFueSkge1xyXG5cdFx0aWYoZGF0YSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcblx0XHR9XHJcblx0XHR0aGlzLmVkaXRNb2RlQWN0aXZlID0gKGRhdGFbXCJlZGl0TW9kZUFjdGl2ZVwiXSk7XHJcblx0XHR0aGlzLl9hY3R1YWxXaWR0aCA9IGRhdGFbXCJ3aWR0aFwiXTtcclxuXHR9XHJcblxyXG5cdGFjdGl2YXRlRWRpdE1vZGUoYWN0aXZhdGU6IGJvb2xlYW4pe1xyXG5cclxuXHRcdC8vIFNob3cgb3IgaGlkZSBlZGl0IG1vZGUgY29sdW1uc1xyXG5cdFx0bGV0IHRyZWVPYmplY3QgPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7IFxyXG5cdFx0bGV0IHZhbHVlQ29sdW1uID0gdHJlZU9iamVjdC5nZXRDb2x1bW5CeUZpZWxkKFNpZ25hbE1hbmFnZXJXaWRnZXQudmFsdWVDb2x1bW5JZCk7XHJcblx0XHRsZXQgZGVzY3JpcHRpb25Db2x1bW4gPSB0cmVlT2JqZWN0LmdldENvbHVtbkJ5RmllbGQoU2lnbmFsTWFuYWdlcldpZGdldC5kZXNjcmlwdGlvbkNvbHVtbklkKTtcclxuXHRcdGxldCBjb2xvckNvbHVtbiA9IHRyZWVPYmplY3QuZ2V0Q29sdW1uQnlGaWVsZChTaWduYWxNYW5hZ2VyV2lkZ2V0LmNvbG9yQ29sdW1uSWQpO1xyXG5cdFx0aWYoYWN0aXZhdGUgPT0gdHJ1ZSl7XHJcblx0XHRcdHRyZWVPYmplY3Quc2hvd0NvbHVtbih2YWx1ZUNvbHVtbi5oZWFkZXJUZXh0KTtcclxuXHRcdFx0dHJlZU9iamVjdC5zaG93Q29sdW1uKGRlc2NyaXB0aW9uQ29sdW1uLmhlYWRlclRleHQpO1xyXG5cdFx0XHR0cmVlT2JqZWN0LnNob3dDb2x1bW4oY29sb3JDb2x1bW4uaGVhZGVyVGV4dCk7XHJcblx0XHR9XHJcblx0XHRlbHNle1xyXG5cdFx0XHR0cmVlT2JqZWN0LmhpZGVDb2x1bW4odmFsdWVDb2x1bW4uaGVhZGVyVGV4dCk7XHJcblx0XHRcdHRyZWVPYmplY3QuaGlkZUNvbHVtbihkZXNjcmlwdGlvbkNvbHVtbi5oZWFkZXJUZXh0KTtcclxuXHRcdFx0dHJlZU9iamVjdC5oaWRlQ29sdW1uKGNvbG9yQ29sdW1uLmhlYWRlclRleHQpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5zZXRFZGl0TW9kZShhY3RpdmF0ZSk7XHJcblx0XHR0aGlzLnJlZnJlc2goKTtcclxuXHRcdFBlcnNpc3REYXRhUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5zZXREYXRhV2l0aElkKHRoaXMuY29tcG9uZW50LmlkLCB0aGlzLmdldENvbXBvbmVudFNldHRpbmdzKHRydWUpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdHJ1ZSBpZiBvbmUgb2YgdGhlIGl0ZW1zIGRlbGV0ZWQgaGFzIGJlZW4gZG9uZSB0aHJvdWdoIHRoZSB0cmFjZSBvZiBtYXBwQ29ja3BpdFxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHsqfSBzZWxlY3RlZEl0ZW1zXHJcblx0ICogQHJldHVybnMge2Jvb2xlYW59XHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwdWJsaWMgY29udGFpbnNJdGVtV2l0aGluUmVjZW50T3JVcGxvYWRlZChzZWxlY3RlZEl0ZW1zOiBBcnJheTxhbnk+KTogYm9vbGVhbiB7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHNlbGVjdGVkSXRlbXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKHRoaXMuaXNJdGVtSW5TaWduYWxDYXRlZ29yeShzZWxlY3RlZEl0ZW1zW2ldLml0ZW0sIFNpZ25hbENhdGVnb3J5LkNhdGVnb3J5SWRVcGxvYWRlZCkgfHwgdGhpcy5pc0l0ZW1JblNpZ25hbENhdGVnb3J5KHNlbGVjdGVkSXRlbXNbaV0uaXRlbSwgU2lnbmFsQ2F0ZWdvcnkuQ2F0ZWdvcnlJZFJlY2VudCkpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0cnVlIGlmIHRoZSBpdGVtIHNlbGVjdGVkIGJlbG9uZ3MgdG8gdGhlIHNpZ25hbCBjYXRlZ29yeSBzZWxlY3RlZFxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge0lTZXJpZU5vZGUgfCBJU2VyaWVDb250YWluZXJ9IGl0ZW1cclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gc2lnbmFsQ2F0ZWdvcnlJZFxyXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBpc0l0ZW1JblNpZ25hbENhdGVnb3J5KGl0ZW06IElTZXJpZU5vZGUgfCBJU2VyaWVDb250YWluZXIsIHNpZ25hbENhdGVnb3J5SWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0bGV0IHBhcmVudCA9IGl0ZW0ucGFyZW50O1xyXG5cclxuXHRcdGlmIChwYXJlbnQgaW5zdGFuY2VvZiBTaWduYWxDYXRlZ29yeSAmJiBwYXJlbnQuaWQgPT0gc2lnbmFsQ2F0ZWdvcnlJZCkge1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKCEocGFyZW50IGluc3RhbmNlb2YgU2lnbmFsUm9vdCkpe1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5pc0l0ZW1JblNpZ25hbENhdGVnb3J5KHBhcmVudCEsIHNpZ25hbENhdGVnb3J5SWQpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNob3dzIG1lc3NhZ2UgYm94IGFjY29yZGluZyB0byB0eXBlXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7bWVzc2FnZUJveFR5cGV9IHR5cGVcclxuXHQgKiBAcGFyYW0ge01hcDxzdHJpbmcsIHN0cmluZz59IGZpbGVDb250ZW50c1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBzaG93TWVzc2FnZUJveCh0eXBlOiBtZXNzYWdlQm94VHlwZSwgZmlsZUNvbnRlbnRzOiBNYXA8c3RyaW5nLCBzdHJpbmc+KSB7XHJcblx0XHRpZih0eXBlID09PSBtZXNzYWdlQm94VHlwZS5XYXJuaW5nKSB7XHJcblx0XHRcdHRoaXMuc2hvd1dhcm5pbmdXaGVuSW1wb3J0aW5nRmlsZXMoKTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYodHlwZSA9PT0gbWVzc2FnZUJveFR5cGUuWWVzTm8pIHtcclxuXHRcdFx0dGhpcy5zaG93TWVzc2FnZUJveFdoZW5JbXBvcnRpbmdNQ0VGaWxlcyhmaWxlQ29udGVudHMpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIHdhcm5pbmcgbWVzc2FnZSB3aGVuIHRoZSB1c2VyIGltcG9ydHMgYSAubWNlIGZpbGUgYW5kIG90aGVyIGZpbGVzIHRvb1xyXG5cdCAqXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIHNob3dXYXJuaW5nV2hlbkltcG9ydGluZ0ZpbGVzKCkge1xyXG5cdFx0bmV3IEFsZXJ0RGlhbG9nKCkuY3JlYXRlTWVzc2FnZUJveCh0aGlzLl93YXJuaW5nSW1wb3J0aW5nSGVhZGVyLHRoaXMuX3dhcm5pbmdJbXBvcnRpbmdDb250ZW50LCBtZXNzYWdlQm94VHlwZS5XYXJuaW5nLCB1bmRlZmluZWQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG1lc3NhZ2UgYm94IHRoYXQgbGV0cyB1c2VyIGRlY2lkZSB0byBkZWxldGUgc2VsZWN0ZWQgZGF0YSBvciBub3RcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7Kn0gZGVsZXRlZEl0ZW1zXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwdWJsaWMgc2hvd01lc3NhZ2VCb3hGb3JEZWxldGluZ0l0ZW0oZGVsZXRlZEl0ZW1zKSB7XHJcblx0XHRsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcclxuXHRcdGxldCBzZWxmID0gdGhpcztcclxuXHRcdFxyXG5cdFx0bmV3IEFsZXJ0RGlhbG9nKCkuY3JlYXRlTWVzc2FnZUJveCh0aGlzLl9kZWxldGVJdGVtc0hlYWRlcix0aGlzLl9kZWxldGVJdGVtc0NvbnRlbnQsIG1lc3NhZ2VCb3hUeXBlLkNhbmNlbERlbGV0ZSwgZGVmZXJyZWQpO1xyXG5cclxuXHRcdCQud2hlbihkZWZlcnJlZCkuZG9uZShmdW5jdGlvbigpe1xyXG5cdFx0XHRzZWxmLmRlbGV0ZUl0ZW1zKGRlbGV0ZWRJdGVtcyk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBtZXNzYWdlIGJveCB0aGF0IGxldHMgdXNlciBkZWNpZGUgdG8gaW1wb3J0IC5tY2UgZmlsZSBuYWQgZGVsZXRlIGFsbCBkYXRhIG9yIG5vdFxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge01hcDxzdHJpbmcsIHN0cmluZz59IGZpbGVDb250ZW50c1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBzaG93TWVzc2FnZUJveFdoZW5JbXBvcnRpbmdNQ0VGaWxlcyhmaWxlQ29udGVudHM6IE1hcDxzdHJpbmcsIHN0cmluZz4pIHtcclxuXHRcdGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xyXG5cdFx0bGV0IHNlbGYgPSB0aGlzO1xyXG5cdFx0XHJcblx0XHRuZXcgQWxlcnREaWFsb2coKS5jcmVhdGVNZXNzYWdlQm94KHRoaXMuX01DRUZpbGVzSW1wb3J0ZWRIZWFkZXIsdGhpcy5fTUNFRmlsZXNJbXBvcnRlZENvbnRlbnQsIG1lc3NhZ2VCb3hUeXBlLlllc05vLCBkZWZlcnJlZCk7XHJcblx0XHRcclxuXHRcdCQud2hlbihkZWZlcnJlZCkuZG9uZShmdW5jdGlvbigpe1xyXG5cdFx0XHRzZWxmLnN0YXJ0SW1wb3J0KGZpbGVDb250ZW50cyk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlbGV0ZSBzZWxlY3RlZCBpdGVtc1xyXG5cdCAqXHJcblx0ICogQHBhcmFtIHsqfSBpdGVtc1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHVibGljIGRlbGV0ZUl0ZW1zKGl0ZW1zKSB7XHJcblx0XHR0aGlzLmVuYWJsZVRyZWVHcmlkUmVmcmVzaChmYWxzZSk7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlSXRlbShpdGVtc1tpXS5pdGVtKTtcclxuXHRcdH1cclxuXHRcdHRoaXMuZW5hYmxlVHJlZUdyaWRSZWZyZXNoKHRydWUpO1xyXG5cdFx0Ly9SZWZyZXNoIHRyZWVncmlkIGp1c3Qgd2hlbiBhbGwgaXRlbXMgaGF2ZSBiZWVuIGRlbGV0ZWRcclxuXHRcdHRoaXMucmVmcmVzaCgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGVsZXRlIGEgc3BlY2lmaWMgaXRlbVxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0geyp9IGl0ZW1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZGVsZXRlSXRlbShpdGVtKXtcclxuXHRcdGlmKGl0ZW0uY2FuRGVsZXRlKXtcclxuXHRcdFx0aWYoaXRlbSBpbnN0YW5jZW9mIFNlcmllQ29udGFpbmVyKXtcclxuXHRcdFx0XHR0aGlzLnJlbW92ZVNlcmllQ29udGFpbmVyKGl0ZW0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2V7XHJcblx0XHRcdFx0dGhpcy5yZW1vdmVTZXJpZU5vZGUoaXRlbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogIFJlbW92ZSB0aGUgc2lnbmFsIGNvbnRhaW5lciB3aXRoIGFsbCBzdWIgY29udGFpbmVycyBhbmQgc2lnbmFscyBmcm9tIGRhdGFtb2RlbFxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge0lTZXJpZUNvbnRhaW5lcn0gc2VyaWVHcm91cFxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSByZW1vdmVTZXJpZUNvbnRhaW5lcihzZXJpZUdyb3VwOiBJU2VyaWVDb250YWluZXIpe1xyXG5cdFx0KDxJU2lnbmFsTWFuYWdlckRhdGFNb2RlbD50aGlzLl9kYXRhTW9kZWwpLnJlbW92ZVNlcmllQ29udGFpbmVyKHNlcmllR3JvdXApO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyB0aGUgc2lnbmFsIGZyb20gZGF0YW1vZGVsXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7SVNlcmllTm9kZX0gc2VyaWVOb2RlXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIHJlbW92ZVNlcmllTm9kZShzZXJpZU5vZGU6IElTZXJpZU5vZGUpe1xyXG5cdFx0KDxJU2lnbmFsTWFuYWdlckRhdGFNb2RlbD50aGlzLl9kYXRhTW9kZWwpLnJlbW92ZVNlcmllTm9kZShzZXJpZU5vZGUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRXhwb3J0cyBhIHNlcmllR3JvdXBcclxuXHQgKlxyXG5cdCAqIEBwdWJsaWNcclxuXHQgKiBAcGFyYW0ge0FycmF5PEV4cG9ydFNlcmllR3JvdXA+fSBlbGVtZW50c1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyVHJlZUdyaWRcclxuXHQgKi9cclxuXHRwdWJsaWMgZXhwb3J0U2VyaWVHcm91cChlbGVtZW50czogQXJyYXk8RXhwb3J0U2VyaWVHcm91cD4pe1xyXG5cdFx0dGhpcy5zZXRCdXN5SW5mb3JtYXRpb24obmV3IEJ1c3lJbmZvcm1hdGlvbihcIkV4cG9ydGluZyBkYXRhLi4uXCIsIEltYWdlSWQuZGVmYXVsdEltYWdlLCA0OCwgdHJ1ZSkpO1xyXG5cdFx0dGhpcy5zZXRCdXN5KHRydWUpO1xyXG5cdFx0Ly8gVGltZW91dCBuZWVkZWQgdG8gc2hvdyB0aGUgYnVzeXNjcmVlbiBiZWZvcmUgZXhwb3J0aW5nIGRhdGEgXHJcblx0XHRzZXRUaW1lb3V0KCgpID0+IHRoaXMuZXhwb3J0Q3N2RGF0YShlbGVtZW50cyksIDIwMCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBPcGVucyBhIGZpbGUgc2VsZWN0IGRpYWxvZyBhbmQgaW1wb3J0cyBhIHNlcmllR3JvdXAgZnJvbSB0aGUgZmlsZVxyXG5cdCAqXHJcblx0ICogQHB1YmxpY1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyVHJlZUdyaWRcclxuXHQgKi9cclxuXHRwdWJsaWMgaW1wb3J0U2VyaWVHcm91cCgpe1xyXG5cdFx0dGhpcy5fc2VyaWVDb250YWluZXJUb1NlbGVjdEFmdGVyUmVmcmVzaCA9IHVuZGVmaW5lZDtcclxuXHRcdHRoaXMuX2ZpbGVQcm92aWRlci5ldmVudFVwbG9hZERhdGFGaW5pc2hlZC5hdHRhY2godGhpcy5fdXBsb2FkRGF0YUZpbmlzaGVkSGFuZGxlcik7XHJcblx0XHR0aGlzLl9maWxlUHJvdmlkZXIudXBsb2FkRGF0YShcIi5jc3YsIC5tY2UsIC5tY2UxXCIsIHRydWUpOyAvLyBPbmx5IHNob3cvYWNjZXB0ICouY3N2LCAqLm1jZSwgKi5tY2UxIGZpbGVzXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZXhwb3J0U2lnbmFsTWFuYWdlckRhdGEoKXtcclxuXHRcdHRoaXMuc2V0QnVzeUluZm9ybWF0aW9uKG5ldyBCdXN5SW5mb3JtYXRpb24oXCJFeHBvcnRpbmcgZGF0YS4uLlwiLCBJbWFnZUlkLmRlZmF1bHRJbWFnZSwgNDgsIHRydWUpKTtcclxuXHRcdHRoaXMuc2V0QnVzeSh0cnVlKTtcclxuXHRcdC8vIFRpbWVvdXQgbmVlZGVkIHRvIHNob3cgdGhlIGJ1c3lzY3JlZW4gYmVmb3JlIGV4cG9ydGluZyBkYXRhIFxyXG5cdFx0c2V0VGltZW91dCgoKSA9PiB0aGlzLmV4cG9ydERhdGEoKSwgMjAwKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE9jY3VycyBhZnRlciByZWFkaW5nIGRhdGEgZnJvbSBmaWxlKHRyYWNlIGltcG9ydCBkYXRhKVxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR9IHNlbmRlclxyXG5cdCAqIEBwYXJhbSB7TWFwPHN0cmluZywgc3RyaW5nPn0gYXJnc1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBvblVwbG9hZERhdGFGaW5pc2hlZChzZW5kZXI6IEhUTUxJbnB1dEVsZW1lbnQsIGFyZ3M6IE1hcDxzdHJpbmcsIHN0cmluZz4pe1xyXG5cdFx0dGhpcy5zZXRCdXN5SW5mb3JtYXRpb24obmV3IEJ1c3lJbmZvcm1hdGlvbihcIkltcG9ydGluZyBkYXRhLi4uXCIsIEltYWdlSWQuZGVmYXVsdEltYWdlLCA0OCwgdHJ1ZSkpO1xyXG5cdFx0bGV0IG1zZ0JveFR5cGUgPSB0aGlzLmNoZWNrTWVzc2FnZUJveFR5cGUoYXJncyk7IFxyXG5cclxuXHRcdGlmIChtc2dCb3hUeXBlICE9IHVuZGVmaW5lZCkge1xyXG5cdFx0XHR0aGlzLnNob3dNZXNzYWdlQm94KG1zZ0JveFR5cGUsIGFyZ3MpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRoaXMuc3RhcnRJbXBvcnQoYXJncyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fZmlsZVByb3ZpZGVyLmV2ZW50VXBsb2FkRGF0YUZpbmlzaGVkLmRldGFjaCh0aGlzLl91cGxvYWREYXRhRmluaXNoZWRIYW5kbGVyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEV4cG9ydHMgdGhlIGdpdmVuIHNpZ25hbCBncm91cCB0byBUcmFjZURhdGEuY3N2IGZpbGVcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHsgQXJyYXk8RXhwb3J0U2VyaWVHcm91cD59IGVsZW1lbnRzXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGV4cG9ydENzdkRhdGEoZWxlbWVudHM6IEFycmF5PEV4cG9ydFNlcmllR3JvdXA+KXtcclxuXHRcdGxldCBkYXRhO1xyXG5cdFx0aWYodGhpcy5fc2VyaWVzUHJvdmlkZXIgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0ZGF0YSA9IG5ldyBFeHBvcnRJbXBvcnRIZWxwZXIodGhpcy5fc2VyaWVzUHJvdmlkZXIpLmV4cG9ydFRyYWNlRGF0YShlbGVtZW50cyk7XHJcblx0XHR9XHJcblx0XHRlbHNle1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKFwiU2VyaWVzUHJvdmlkZXIgaXMgbm90IGF2YWlsYWJsZSFcIilcclxuXHRcdH1cclxuXHRcdGlmKGRhdGEgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtkYXRhXSwgeyB0eXBlOiBcInRleHQvY3N2XCIgfSk7XHJcblx0XHRcdEZpbGVQcm92aWRlci5kb3dubG9hZERhdGEoXCJUcmFjZURhdGEuY3N2XCIsIGJsb2IpOyAgICBcclxuXHRcdH1cclxuXHRcdHRoaXMuc2V0QnVzeShmYWxzZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBFeHBvcnRzIHRoZSBzaWduYWwgbWFuYWdlciBkYXRhKGRhdGFtb2RlbCwgc2VyaWVzIHByb3ZpZGVyLCAuLi4pXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBleHBvcnREYXRhKCl7XHJcblx0XHRpZih0aGlzLl9zZXJpZXNQcm92aWRlciAhPSB1bmRlZmluZWQpeyAvLyBTZXJpZXNQcm92aWRlciBuZWVkZWQgdG8gZXhwb3J0IGRhdGFcclxuXHRcdFx0dHJ5e1xyXG5cdFx0XHRcdGxldCBjb21wb25lbnRzID0gdGhpcy5nZXRDb21wb25lbnRzVG9FeHBvcnQoKTtcclxuXHRcdFx0XHRsZXQgc2V0dGluZ09iamVjdHMgPSB0aGlzLmdldFNldHRpbmdPYmplY3RzVG9FeHBvcnQoKTtcclxuXHRcdFx0XHRsZXQgc3RyaW5nRGF0YSA9IE1jZUV4cG9ydEltcG9ydEhlbHBlci5nZXRFeHBvcnREYXRhKGNvbXBvbmVudHMsIHNldHRpbmdPYmplY3RzKTtcclxuXHRcdFx0XHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtzdHJpbmdEYXRhXSwgeyB0eXBlOiBcInRleHQvaHRtbFwiIH0pO1xyXG5cdFx0XHRcdEZpbGVQcm92aWRlci5kb3dubG9hZERhdGEoXCJFeHBvcnQubWNlMVwiLCBibG9iKTsgICAgXHJcblx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRpZihNY2VDb252ZXJzaW9uRXJyb3IuaXNNY2VDb252ZXJzaW9uRXJyb3IoZSkpIHtcclxuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZS50b1N0cmluZygpKVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBcclxuXHRcdH1cclxuXHRcdGVsc2V7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJTZXJpZXNQcm92aWRlciBmb3IgZXhwb3J0IG5vdCBhdmFpbGFibGUhXCIpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5zZXRCdXN5KGZhbHNlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIGNvbXBvbmVudHMgaW4gYSBkZWZpbmVkIG9yZGVyIHdoaWNoIHNob3VsZCBiZSBjbGVhcmVkIGJlZm9yZSBpbXBvcnRpbmcgbmV3IHNldHRpbmdcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHJldHVybnMge0FycmF5PElDb21wb25lbnQ+fVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBnZXRDb21wb25lbnRzVG9DbGVhcigpOiBBcnJheTxJQ29tcG9uZW50PntcclxuXHRcdGxldCBjb21wb25lbnRzVG9DbGVhciA9IG5ldyBBcnJheTxJQ29tcG9uZW50PigpO1xyXG5cdFx0Y29tcG9uZW50c1RvQ2xlYXIucHVzaCh0aGlzLmRhdGFNb2RlbCk7IC8vIFNpZ25hbE1hbmFnZXJEYXRhTW9kZWxcclxuXHRcdGlmKHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbCAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRjb21wb25lbnRzVG9DbGVhci5wdXNoKHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbCk7IC8vIENoYXJ0TWFuYWdlckRhdGFNb2RlbFxyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuX3Nlcmllc1Byb3ZpZGVyICE9IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRjb21wb25lbnRzVG9DbGVhci5wdXNoKHRoaXMuX3Nlcmllc1Byb3ZpZGVyKTsgLy8gU2VyaWVzUHJvdmlkZXIgbXVzdCBiZSBpbXBvcnRlZCBmaXJzdFxyXG4gICAgICAgIH1cclxuXHJcblx0XHRyZXR1cm4gY29tcG9uZW50c1RvQ2xlYXI7XHJcblx0fVxyXG4gICAgXHRcclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBjb21wb25lbnRzIHdoaWNoIHNob3VsZCBiZSBleHBvcnRlZC9pbXBvcnRlZCBmcm9tIHRoZSBtY2UgZmlsZSBpbiB0aGUgZ2l2ZW4gb3JkZXJcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHJldHVybnMge0FycmF5PElDb21wb25lbnQ+fVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBnZXRDb21wb25lbnRzVG9FeHBvcnQoKTogQXJyYXk8SUNvbXBvbmVudD57XHJcblx0XHRsZXQgZXhwb3J0Q29tcG9uZW50cyA9IG5ldyBBcnJheTxJQ29tcG9uZW50PigpO1xyXG5cdFx0aWYgKHRoaXMuX3Nlcmllc1Byb3ZpZGVyICE9IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRleHBvcnRDb21wb25lbnRzLnB1c2godGhpcy5fc2VyaWVzUHJvdmlkZXIpOyAvLyBTZXJpZXNQcm92aWRlciBtdXN0IGJlIGltcG9ydGVkIGZpcnN0XHJcbiAgICAgICAgfVxyXG5cdFx0ZXhwb3J0Q29tcG9uZW50cy5wdXNoKHRoaXMuZGF0YU1vZGVsKTsgLy8gU2lnbmFsTWFuYWdlckRhdGFNb2RlbFxyXG5cdFx0aWYodGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdGV4cG9ydENvbXBvbmVudHMucHVzaCh0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwpOyAvLyBDaGFydE1hbmFnZXJEYXRhTW9kZWxcclxuXHRcdH0gICAgICAgXHJcblx0XHJcblx0XHRyZXR1cm4gZXhwb3J0Q29tcG9uZW50cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuXHQgKiBSZXR1cm5zIGFsbCBzZXR0aW5ncyBvYmplY3RzIHdoaWNoIHNob3VsZCBiZSBleHBvcnRlZFxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcmV0dXJucyB7QXJyYXk8SVNldHRpbmdzT2JqZWN0Pn1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZ2V0U2V0dGluZ09iamVjdHNUb0V4cG9ydCgpOiBBcnJheTxJU2V0dGluZ3NPYmplY3Q+IHtcclxuXHRcdGxldCBzZXR0aW5nc09iamVjdHMgPSBuZXcgQXJyYXk8SVNldHRpbmdzT2JqZWN0PigpO1xyXG5cdFx0XHJcblx0XHQvLyBnZXQgY3VycmVudCBjdXJzb3JzdGF0ZXNcclxuXHRcdGxldCBjdXJzb3JzdGF0ZXMgPSBDb21wb25lbnREYXRhSHViLnJlYWRTaGFyZWQ8Q3Vyc29yU3RhdGVzPih0aGlzLCBcImFwcDo6dHJhY2UgdmlldyBjaGFydCBzdGF0ZXNcIiwgXCJjdXJzb3Igc3RhdGVzXCIsIEN1cnNvclN0YXRlcyk7XHJcblx0XHRzZXR0aW5nc09iamVjdHMucHVzaChjdXJzb3JzdGF0ZXMpO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gc2V0dGluZ3NPYmplY3RzO1xyXG4gICAgfVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBidXN5IHNjcmVlbiBhbmQgc3RhcnQgaW1wb3J0aW5nIGRhdGFcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtNYXA8c3RyaW5nLCBzdHJpbmc+fSBhcmdzXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIHN0YXJ0SW1wb3J0KGFyZ3M6IE1hcDxzdHJpbmcsIHN0cmluZz4pIHtcclxuXHRcdHRoaXMuc2V0QnVzeSh0cnVlKTtcclxuXHRcdC8vIFRpbWVvdXQgbmVlZGVkIHRvIHNob3cgdGhlIGJ1c3lzY3JlZW4gYmVmb3JlIGltcG9ydGluZyBkYXRhIFxyXG5cdFx0c2V0VGltZW91dCgoKSA9PiB0aGlzLmltcG9ydERhdGEoYXJncyksIDIwMCk7XHJcblx0fVxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogaW1wb3J0cyB0aGUgZ2l2ZW4gZmlsZWRhdGEgd2l0aCB0aGUgZ2l2ZW4gZmlsZW5hbWUgdG8gdGhlIHNpZ25hbCBtYW5hZ2VyIGRhdGFtb2RlbFxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge01hcDxzdHJpbmcsIHN0cmluZz59IGZpbGVDb250ZW50c1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBpbXBvcnREYXRhKGZpbGVDb250ZW50czogTWFwPHN0cmluZywgc3RyaW5nPil7XHJcblx0XHRmaWxlQ29udGVudHMuZm9yRWFjaCgoZmlsZURhdGEsIGZpbGVuYW1lKSA9PiB7XHJcblx0XHRcdGlmKGZpbGVuYW1lLnRvTG93ZXJDYXNlKCkuZW5kc1dpdGgoXCIuY3N2XCIpKXtcclxuXHRcdFx0XHRpZih0aGlzLl9zZXJpZXNQcm92aWRlciAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRcdFx0bGV0IGV4cG9ydEltcG9ydEhlbHBlciA9IG5ldyBFeHBvcnRJbXBvcnRIZWxwZXIodGhpcy5fc2VyaWVzUHJvdmlkZXIpO1xyXG5cdFx0XHRcdFx0bGV0IHNlcmllR3JvdXBzID0gZXhwb3J0SW1wb3J0SGVscGVyLmltcG9ydFRyYWNlRGF0YShmaWxlRGF0YSwgZmlsZW5hbWUpO1xyXG5cdFx0XHRcdFx0bGV0IHNpZ25hbEZpbGUgPSBuZXcgU2VyaWVDb250YWluZXIoZmlsZW5hbWUpO1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHR0aGlzLnNldENvbnRhaW5lcklkKHNpZ25hbEZpbGUpO1xyXG5cdFx0XHRcdFx0c2VyaWVHcm91cHMuZm9yRWFjaChzZXJpZUdyb3VwID0+e1x0XHJcblx0XHRcdFx0XHRcdHNpZ25hbEZpbGUuYWRkU2VyaWVDb250YWluZXIoc2VyaWVHcm91cCwgLTEpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0dGhpcy5fc2VyaWVDb250YWluZXJUb1NlbGVjdEFmdGVyUmVmcmVzaCA9IHNpZ25hbEZpbGU7XHJcblx0XHRcdFx0XHQoPElTaWduYWxNYW5hZ2VyRGF0YU1vZGVsPnRoaXMuX2RhdGFNb2RlbCkuYWRkU2VyaWVDb250YWluZXIoc2lnbmFsRmlsZSwgU2lnbmFsQ2F0ZWdvcnkuQ2F0ZWdvcnlJZEltcG9ydGVkKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZXtcclxuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJTZXJpZXNQcm92aWRlciBpcyBub3QgYXZhaWxhYmxlIVwiKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZiAoZmlsZW5hbWUudG9Mb3dlckNhc2UoKS5lbmRzV2l0aChcIi5tY2VcIikgfHwgZmlsZW5hbWUudG9Mb3dlckNhc2UoKS5lbmRzV2l0aChcIi5tY2UxXCIpKXtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0dGhpcy5pbXBvcnRNQ0VGaWxlKGZpbGVEYXRhKTtcclxuXHRcdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0XHRpZihNY2VDb252ZXJzaW9uRXJyb3IuaXNNY2VDb252ZXJzaW9uRXJyb3IoZSkpIHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcihlLnRvU3RyaW5nKCkpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZXtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKFwiSW1wb3J0IGZvciBmaWxlIGZvcm1hdCBub3QgaW1wbGVtZW50ZWQ6IFwiICsgZmlsZW5hbWUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fSk7XHJcblx0XHR0aGlzLnNldEJ1c3koZmFsc2UpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0eXBlIG9mIG1lc3NhZ2UgYm94IG5lZWQgaXQgKGlmIG5lZWQgaXQpXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7TWFwPHN0cmluZywgc3RyaW5nPn0gZmlsZUNvbnRlbnRzXHJcblx0ICogQHJldHVybnMgeyhtZXNzYWdlQm94VHlwZSB8IHVuZGVmaW5lZCl9XHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGNoZWNrTWVzc2FnZUJveFR5cGUoZmlsZUNvbnRlbnRzOiBNYXA8c3RyaW5nLCBzdHJpbmc+KTogbWVzc2FnZUJveFR5cGUgfCB1bmRlZmluZWQge1xyXG5cdFx0bGV0IGlzU2lnbmFsTWFuYWdlckVtcHR5ID0gdGhpcy5pc1NpZ25hbE1hbmFnZXJFbXB0eSh0aGlzLmRhdGFNb2RlbC5kYXRhKTtcclxuXHRcdGxldCBpc1RoZXJlTUNFRmlsZSA9IGZhbHNlO1xyXG5cclxuXHRcdGZpbGVDb250ZW50cy5mb3JFYWNoKChmaWxlRGF0YSwgZmlsZW5hbWUpID0+IHtcclxuXHRcdFx0aWYgKGZpbGVuYW1lLnRvTG93ZXJDYXNlKCkuZW5kc1dpdGgoXCIubWNlXCIpIHx8IGZpbGVuYW1lLnRvTG93ZXJDYXNlKCkuZW5kc1dpdGgoXCIubWNlMVwiKSkge1xyXG5cdFx0XHRcdGlzVGhlcmVNQ0VGaWxlID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0aWYgKGlzVGhlcmVNQ0VGaWxlICYmIGZpbGVDb250ZW50cy5zaXplID4gMSkge1xyXG5cdFx0XHRyZXR1cm4gbWVzc2FnZUJveFR5cGUuV2FybmluZztcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYoaXNUaGVyZU1DRUZpbGUgJiYgIWlzU2lnbmFsTWFuYWdlckVtcHR5KSB7XHJcblx0XHRcdHJldHVybiBtZXNzYWdlQm94VHlwZS5ZZXNObztcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0cnVlIGlmIHRoZXJlIGlzIG5vdGhpbmcgaW4gdGhlIHNpZ25hbE1hbmFnZXJcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHsqfSBkYXRhXHJcblx0ICogQHJldHVybnMge2Jvb2xlYW59XHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGlzU2lnbmFsTWFuYWdlckVtcHR5KGRhdGEpOiBib29sZWFuIHtcclxuXHRcdGxldCBpc0VtcHR5ID0gdHJ1ZTtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAoZGF0YVtpXS5jaGlsZHMubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdGlzRW1wdHkgPSBmYWxzZTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGlzRW1wdHk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZWxldGVzIGFsbCB0cmFjZSBkYXRhIGFuZCBpbXBvcnRzIHRoZSAubWNlIGZpbGVcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHsqfSBkYXRhXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGltcG9ydE1DRUZpbGUoZmlsZURhdGEpIHtcclxuXHRcdGlmKHRoaXMuX3Nlcmllc1Byb3ZpZGVyKXsgLy8gc2VyaWUgcHJvdmlkZXIgbmVlZGVkIHRvIGltcG9ydCBkYXRhXHJcblx0XHRcdHRoaXMuZW5hYmxlVHJlZUdyaWRSZWZyZXNoKGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENsZWFyIGNvbXBvbmVudHMgd2l0aCB0aGUgZ2l2ZW4gb3JkZXJcclxuXHRcdFx0bGV0IGNvbXBvbmVudHNUb0NsZWFyID0gdGhpcy5nZXRDb21wb25lbnRzVG9DbGVhcigpO1xyXG5cdFx0XHRNY2VFeHBvcnRJbXBvcnRIZWxwZXIuY2xlYXJDb21wb25lbnRzKGNvbXBvbmVudHNUb0NsZWFyKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNldCB0aGUgaW1wb3J0IGRhdGEgdG8gdGhlIGNvbXBvbmVudHMgaW4gdGhlIGdpdmVuIG9yZGVyXHJcblx0XHRcdGxldCBleHBvcnRDb250YWluZXIgPSBFeHBvcnRDb250YWluZXIuZnJvbUpzb24oZmlsZURhdGEpO1xyXG5cdFx0XHRsZXQgY29tcG9uZW50cyA9IHRoaXMuZ2V0Q29tcG9uZW50c1RvRXhwb3J0KCk7IC8vIEltcG9ydCBhbmQgRXhwb3J0IGNvbXBvbmVudHMgYXJlIHRoZSBzYW1lIHNvIHdlIGNhbiB1c2UgdGhlIGV4cG9ydCBjb21wb25lbnRzIGFycmF5XHJcblx0XHRcdGxldCBzZXR0aW5nT2JqZWN0cyA9IHRoaXMuZ2V0U2V0dGluZ09iamVjdHNUb0V4cG9ydCgpOyAvLyBJbXBvcnQgYW5kIEV4cG9ydCBvYmplY3RzIGFyZSB0aGUgc2FtZSBzbyB3ZSBjYW4gdXNlIHRoZSBleHBvcnQgc2V0dGluZ3Mgb2JqZWN0IGFycmF5XHJcblx0XHRcdE1jZUV4cG9ydEltcG9ydEhlbHBlci5zZXRJbXBvcnREYXRhKGNvbXBvbmVudHMsIHNldHRpbmdPYmplY3RzLCBleHBvcnRDb250YWluZXIpO1xyXG5cclxuXHRcdFx0dGhpcy5lbmFibGVUcmVlR3JpZFJlZnJlc2godHJ1ZSk7XHJcblx0XHRcdHRoaXMucmVmcmVzaCgpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZXtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihcIlNlcmllc1Byb3ZpZGVyIGZvciBpbXBvcnQgbm90IGF2YWlsYWJsZSFcIik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZWxlY3RzIHRoZSBnaXZlbiBjb250YWluZXIgaW4gdGhlIHRyZWUgZ3JpZCBhbmQgc2Nyb2xscyB0byBpdCBpZiBvdXQgb2YgdGhlIHdpbmRvdyAoVE9ETzogTW92ZSB0byBCYXNlQ2xhc3MgaW5jbC4gX3NlcmllQ29udGFpbmVyVG9TZWxlY3RBZnRlclJlZnJlc2gpXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7KElTZXJpZUNvbnRhaW5lcnx1bmRlZmluZWQpfSBjb250YWluZXJcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgc2VsZWN0SXRlbShjb250YWluZXI6IElTZXJpZUNvbnRhaW5lcnx1bmRlZmluZWQpe1xyXG5cdFx0bGV0IHRyZWVPYmplY3QgPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7IFxyXG5cdFx0bGV0IHJlY29yZCA9ICg8YW55PnRyZWVPYmplY3QubW9kZWwpLmZsYXRSZWNvcmRzLmZpbHRlcihyZWNvcmQgPT4ge3JldHVybiByZWNvcmQuaXRlbSA9PT0gY29udGFpbmVyfSlbMF07XHJcblx0XHRpZihyZWNvcmQgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0Ly8gZXhwYW5kIHBhcmVudCBub2RlIGlmIGl0IGlzIGNvbGxhcHNlZCB0byBzZWUgdGhlIG5ldyBpbXBvcnRlZCB0cmFjZSBkYXRhXHJcblx0XHRcdGlmKHJlY29yZC5wYXJlbnRJdGVtLmV4cGFuZFN0YXRlID09IGZhbHNlKXtcclxuXHRcdFx0XHR0cmVlT2JqZWN0LmV4cGFuZENvbGxhcHNlUm93KHJlY29yZC5wYXJlbnRJdGVtLmluZGV4KVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyB0cmVlT2JqZWN0LnNjcm9sbE9mZnNldCBub3QgcG9zc2libGUgaWYgdGhlcmUgd291bGQgYmUgc29tZSBmcmVlIHNwYWNlIGFmdGVyIHRoZSBsYXN0IGl0ZW0gaW4gdGhlIHRyZWUgZ3JpZCBhZnRlciBzY3JvbGxpbmcgdG8gdGhlIGdpdmVuIGl0ZW1cclxuXHRcdFx0Ly8gPT4gc2Nyb2xsVG9Cb3R0b20gYmVmb3Igc2Nyb2xsIHRvIGEgc3BlY2lhbCBvZmZzZXQgaWYgcG9zc2libGVcclxuXHRcdFx0dHJlZU9iamVjdC5zY3JvbGxUb0JvdHRvbSgpO1xyXG5cdFx0XHR0cmVlT2JqZWN0LnNldE1vZGVsKHtcInNlbGVjdGVkUm93SW5kZXhcIiA6IHJlY29yZC5pbmRleCB9KTtcclxuXHRcdFx0bGV0IHJvd0hlaWdodCA9IHRyZWVPYmplY3QubW9kZWwucm93SGVpZ2h0O1xyXG5cdFx0XHQvLyBzY3JvbGwgaW5kZXggbm90IHRoZSBzYW1lIGFzIHRoZSBzZWxlY3RlZEluZGV4ID0+IGNvbGxhcHNlZCBub2RlcyBtdXN0IGJlIGNvbnNpZGVyZWRcclxuXHRcdFx0bGV0IHNjcm9sbEluZGV4PSB0aGlzLmdldFNjcm9sbEluZGV4KCg8YW55PnRyZWVPYmplY3QubW9kZWwpLmZsYXRSZWNvcmRzLCByZWNvcmQuaW5kZXgpO1xyXG5cdFx0XHRsZXQgc2Nyb2xsT2Zmc2V0ID0gIChzY3JvbGxJbmRleC0xKSpyb3dIZWlnaHQhO1xyXG5cdFx0XHR0cmVlT2JqZWN0LnNjcm9sbE9mZnNldCgwLCBzY3JvbGxPZmZzZXQpOyAvLyBVc2UgcGFyZW50IGluZGV4IHRvIHNlZSB0aGUgcGFyZW50IG5vZGUgaW4gdGhlIHZpZXdcclxuXHRcdFx0Ly8oPGFueT50cmVlT2JqZWN0KS51cGRhdGVTY3JvbGxCYXIoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIGluZGV4IG9mIG9ubHkgdGhlIHZpc2libGUoZXhwYW5kZWQpIHJvd3NcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtBcnJheTxhbnk+fSByb3dzXHJcblx0ICogQHBhcmFtIHtudW1iZXJ9IHJvd0luZGV4XHJcblx0ICogQHJldHVybnMge251bWJlcn1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZ2V0U2Nyb2xsSW5kZXgocm93czogQXJyYXk8YW55Piwgcm93SW5kZXg6IG51bWJlcik6IG51bWJlcntcclxuXHRcdGxldCBzY3JvbGxJbmRleCA9IDA7XHJcblx0XHRmb3IobGV0IGk9MDsgaTwgcm93cy5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdGlmKHJvd3NbaV0uaW5kZXggPT0gcm93SW5kZXgpe1xyXG5cdFx0XHRcdHNjcm9sbEluZGV4KytcclxuXHRcdFx0XHRyZXR1cm4gc2Nyb2xsSW5kZXg7XHJcblx0XHRcdH1cclxuXHRcdFx0LyppZihyb3dzW2ldLml0ZW0gaW5zdGFuY2VvZiBTZXJpZUdyb3VwKXtcclxuXHRcdFx0XHRpZih0aGlzLmlzVmlzaWJsZVNlcmllR3JvdXBOb2RlKHJvd3NbaV0pID09IGZhbHNlKXtcclxuXHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRzY3JvbGxJbmRleCsrO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgKi9pZihyb3dzW2ldLml0ZW0gaW5zdGFuY2VvZiBTZXJpZUNvbnRhaW5lcil7XHJcblx0XHRcdFx0aWYodGhpcy5pc1Zpc2libGVTZXJpZUdyb3VwTm9kZShyb3dzW2ldKSA9PSBmYWxzZSl7XHJcblx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0c2Nyb2xsSW5kZXgrKztcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmKHJvd3NbaV0uaXRlbSBpbnN0YW5jZW9mIFNlcmllTm9kZSl7XHJcblx0XHRcdFx0aWYodGhpcy5pc1Zpc2libGVTZXJpZU5vZGUocm93c1tpXSkgPT0gZmFsc2Upe1xyXG5cdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHNjcm9sbEluZGV4Kys7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBzY3JvbGxJbmRleDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldCB1bmlxdWUgaWQgZm9yIGltcG9ydGVkIGRhdGFcclxuXHQgKlxyXG4gICAgICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge1NlcmllQ29udGFpbmVyfSBzZXJpZUNvbnRhaW5lclxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBzZXRDb250YWluZXJJZChzZXJpZUNvbnRhaW5lcjogU2VyaWVDb250YWluZXIpIHtcclxuXHRcdHNlcmllQ29udGFpbmVyLmlkID0gdGhpcy5nZXRVbmlxdWVJZCgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyBhIHVuaXF1ZSBpZCBmb3IgdGhlIGltcG9ydGVkIHNlcmllQ29udGFpbmVyXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEByZXR1cm5zXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGdldFVuaXF1ZUlkKCkge1xyXG5cdFx0bGV0IGltcG9ydGVkRGF0YUlkcyA9IHRoaXMuZ2V0SW1wb3J0ZWREYXRhSWRzKCk7XHJcbiAgICAgICAgZm9yKGxldCBpID0wOyBpIDwgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IGkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgaWYoaW1wb3J0ZWREYXRhSWRzLmluY2x1ZGVzKGlkKSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIk5vIHVuaXF1ZSBpZCBmb3Igc2VyaWVDb250YWluZXIgYXZhaWxhYmxlIVwiKTtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgYW4gYXJyYXkgb2YgYWxsIGlkcyBmcm9tIHRoZSBpbXBvcnRlZCBmcm9tIGZpbGUgY2F0ZWdvcnkgXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEByZXR1cm5zIHtBcnJheTxzdHJpbmc+fVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBnZXRJbXBvcnRlZERhdGFJZHMoKTogQXJyYXk8c3RyaW5nPiB7XHJcblx0XHRsZXQgaWRzOiBBcnJheTxzdHJpbmc+ID0gW107XHJcblx0XHRsZXQgc2lnbmFsQ2F0ZWdvcnkgPSAoPElTaWduYWxNYW5hZ2VyRGF0YU1vZGVsPnRoaXMuX2RhdGFNb2RlbCkuZ2V0U2lnbmFsQ2F0ZWdvcnkoU2lnbmFsQ2F0ZWdvcnkuQ2F0ZWdvcnlJZEltcG9ydGVkKTtcclxuXHRcdHNpZ25hbENhdGVnb3J5IS5nZXRDaGlsZHMoKS5mb3JFYWNoKGNoaWxkID0+IHtcclxuXHRcdFx0aWRzLnB1c2goKGNoaWxkIGFzIFNlcmllQ29udGFpbmVyKS5pZCk7XHJcblx0XHR9KTtcclxuXHRcdHJldHVybiBpZHM7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGlzVmlzaWJsZVNlcmllR3JvdXBOb2RlKG5vZGUpOiBib29sZWFue1xyXG5cdFx0aWYobm9kZS5wYXJlbnRJdGVtICE9IG51bGwpe1xyXG5cdFx0XHRpZihub2RlLnBhcmVudEl0ZW0uZXhwYW5kU3RhdGUgPT0gZmFsc2Upe1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmKG5vZGUucGFyZW50SXRlbS5wYXJlbnRJdGVtICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdFx0aWYobm9kZS5wYXJlbnRJdGVtLnBhcmVudEl0ZW0uZXhwYW5kU3RhdGUgPT0gZmFsc2Upe1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGlzVmlzaWJsZVNlcmllTm9kZShub2RlKTogYm9vbGVhbntcclxuXHRcdGlmKG5vZGUucGFyZW50SXRlbS5leHBhbmRTdGF0ZSA9PSBmYWxzZSB8fCBub2RlLnBhcmVudEl0ZW0ucGFyZW50SXRlbS5leHBhbmRTdGF0ZSA9PSBmYWxzZSl7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYobm9kZS5wYXJlbnRJdGVtLnBhcmVudEl0ZW0ucGFyZW50SXRlbSAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRpZihub2RlLnBhcmVudEl0ZW0ucGFyZW50SXRlbS5wYXJlbnRJdGVtLmV4cGFuZFN0YXRlID09IGZhbHNlKXtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSB0cmVlR3JpZE5vZGVFeHBhbmRlZE9yQ29sbGFwc2VkKCl7XHJcbiAgICAgICAgLy8gUmVmcmVzaCB0byBzZWUgY29ycmVjdCBleHBhbmRlZC9jb2xsYXBzZWQgaWNvblxyXG5cdFx0dGhpcy5yZWZyZXNoKCk7XHJcblx0XHQvL1BlcnNpc3QgZGF0YSBtb2RlbCAoZXhwYW5kU3RhdGUpXHJcblx0XHRpZiAodGhpcy5fZGF0YU1vZGVsICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0KDxhbnk+dGhpcy5fZGF0YU1vZGVsKS5zYXZlU2V0dGluZ3MoKTtcclxuXHRcdH1cclxuXHRcdHRoaXMuc2F2ZVRyZWVHcmlkU2V0dGluZ3MoKTtcclxuICAgIH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgY29sdW1uIHRlbXBsYXRlIGluZm9ybWF0aW9uc1xyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gY29sdW1uSWRcclxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBnZXRDb2x1bW5UZW1wbGF0ZURhdGEoY29sdW1uSWQ6IHN0cmluZykgOiBzdHJpbmd7XHJcblx0XHRpZihjb2x1bW5JZCA9PSBTaWduYWxNYW5hZ2VyV2lkZ2V0LmNvbG9yQ29sdW1uSWQpe1xyXG5cdFx0XHRyZXR1cm4gYDxzY3JpcHQgdHlwZT1cInRleHQveC1qc3JlbmRlclwiIGlkPVwic21Db2xvckNvbHVtblRlbXBsYXRlXCI+XHJcblx0XHRcdFx0XHRcdDxkaXYgc3R5bGU9J2hlaWdodDoyMHB4O3BhZGRpbmctbGVmdDo3cHg7cGFkZGluZy10b3A6NHB4OycgdW5zZWxlY3RhYmxlPSdvbic+XHJcblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz0nZS1jZWxsJyBzdHlsZT0nZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6MTdweDtoZWlnaHQ6MTdweDtiYWNrZ3JvdW5kLWNvbG9yOiB7ezojZGF0YVsnY29sb3InXX19OycgdW5zZWxlY3RhYmxlPSdvbic+PC9kaXY+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9zY3JpcHQ+YFxyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZihjb2x1bW5JZCA9PSBTaWduYWxNYW5hZ2VyV2lkZ2V0Lm5hbWVDb2x1bW5JZCl7XHJcblx0XHRcdHJldHVybiBgPHNjcmlwdCB0eXBlPVwidGV4dC94LWpzcmVuZGVyXCIgaWQ9XCJzbU5hbWVDb2x1bW5UZW1wbGF0ZVwiPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IHN0eWxlPSdoZWlnaHQ6MjBweDsnIHVuc2VsZWN0YWJsZT0nb24nPlxyXG5cdFx0XHRcdFx0XHRcdHt7aWYgaGFzQ2hpbGRSZWNvcmRzfX1cclxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9J2ludGVuZCcgc3R5bGU9J2hlaWdodDoxcHg7IGZsb2F0OmxlZnQ7IHdpZHRoOnt7OmxldmVsKjEwfX1weDsgZGlzcGxheTppbmxpbmUtYmxvY2s7Jz48L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHR7e2Vsc2UgIWhhc0NoaWxkUmVjb3Jkc319XHJcblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPSdpbnRlbmQnIHN0eWxlPSdoZWlnaHQ6MXB4OyBmbG9hdDpsZWZ0OyB3aWR0aDp7ezpsZXZlbCoxMH19cHg7IGRpc3BsYXk6aW5saW5lLWJsb2NrOyc+PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0e3svaWZ9fVxyXG5cdFx0XHRcdFx0XHRcdHt7OiNkYXRhWydpY29uRGVmaW5pdGlvbiddfX1cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPSdlLWNlbGwnIHN0eWxlPSdkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDoxMDAlJyB1bnNlbGVjdGFibGU9J29uJz57ezojZGF0YVsnbmFtZSddfX08L2Rpdj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L3NjcmlwdD5gO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIFwiXCI7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIFJhaXNlcyB0aGUgc2VyaWVzIGRvdWJsZSBjbGljayBldmVudFxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllc1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBvblNlcmllc0RvdWJsZUNsaWNrZWQoc2VyaWVzOiBCYXNlU2VyaWVzKSB7XHJcblx0XHR0aGlzLmV2ZW50U2VyaWVEb3VibGVDbGlja2VkLnJhaXNlKHRoaXMsIHNlcmllcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSYWlzZXMgdGhlIGNoYW5nZSBzaXplIGV2ZW50XHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBzaXplXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIG9uQ2hhbmdlU2l6ZShzaXplOiBudW1iZXIpIHtcclxuXHRcdHRoaXMuZXZlbnRDaGFuZ2VTaXplLnJhaXNlKHRoaXMsIHNpemUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTW91c2UgaXMgbm90IG92ZXIgc2lnbmFsTWFuYWdlciB3aGlsZSBkcmFnZ2luZyBvcGVyYXRpb25cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7RHJhZ0Ryb3BBcmdzfSBhcmdzXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwdWJsaWMgZHJvcEZvY3VzTG9zdChhcmdzOiBEcmFnRHJvcEFyZ3MpIHtcclxuICAgICAgICB0aGlzLnJlc2V0SGlnaGxpZ2h0QXJlYSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBTaWduYWxNYW5hZ2VyV2lkZ2V0IH07Il19