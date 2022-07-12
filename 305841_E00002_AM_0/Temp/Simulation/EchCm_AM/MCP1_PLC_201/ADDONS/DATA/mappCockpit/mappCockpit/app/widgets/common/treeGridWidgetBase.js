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
define(["require", "exports", "./widgetBase", "./treeGridColumnDefinition", "./treeGridToolbarBase"], function (require, exports, widgetBase_1, treeGridColumnDefinition_1, treeGridToolbarBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TreeGridWidgetBase = /** @class */ (function (_super) {
        __extends(TreeGridWidgetBase, _super);
        function TreeGridWidgetBase() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._columnIndexForDynamicSize = -1; // -1 for no dynamic size behavior
            _this._minColumnWidthForDynamicColumn = 10;
            _this._hideColumnHeader = false;
            _this._hideHeaderFilterBar = false;
            _this._previousScrollSettings = { "vertical": 0, "horizontal": 0 };
            _this._toolbar = new treeGridToolbarBase_1.TreeGridToolbarBase(_this.mainDiv);
            _this.refreshEnabled = true;
            return _this;
        }
        TreeGridWidgetBase.prototype.initialize = function () {
            this.initializeLocales();
            // Initialize the widget
            _super.prototype.initialize.call(this);
        };
        /**
         * Dispose the tree grid data
         *
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            var treeGridObject = this.getTreeGridObject();
            if (treeGridObject != undefined) {
                treeGridObject.destroy();
            }
        };
        /**
         * TreeGrid was created
         *
         * @private
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.treeGridCreated = function () {
            // Sets the default toolbar button states
            this._toolbar.initToolbarStates();
        };
        /**
         * Sets a dynamic column
         * This column will be resized if the window/widget were resized
         *
         * @protected
         * @param {number} columnIndex
         * @param {number} minColumnWidthForDynamicColumn
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.setDynamicColumn = function (columnIndex, minColumnWidthForDynamicColumn) {
            this._columnIndexForDynamicSize = columnIndex;
            this._minColumnWidthForDynamicColumn = minColumnWidthForDynamicColumn;
        };
        /**
         * Loads the styles for the tree grid widget base
         *
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.loadStyles = function () {
            this.addStyle("widgets/common/style/css/treeGridStyle.css");
            this.addStyle("widgets/common/style/css/treeGridScrollBarStyle.css");
            this.addStyle("widgets/common/style/css/treeGridIconStyle.css");
            this.addStyle("widgets/common/style/css/treeGridToolbarButtonStyle.css");
            this.addStyle("widgets/common/style/css/widgetHeaderFooterStyle.css");
        };
        TreeGridWidgetBase.prototype.setCellEdit = function (value) {
            var treeGridObject = this.getTreeGridObject();
            treeGridObject.model.isEdit = value;
        };
        /**
         * Sets the flag that the column header of the tree grid should be hidden
         *
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.setColumnHeaderHidden = function () {
            this._hideColumnHeader = true;
        };
        /**
         * Sets the flag that the header filterbar of the tree grid should be hidden
         *
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.setHeaderFilterBarHidden = function () {
            this._hideHeaderFilterBar = true;
        };
        /** resizes the tree grid widget
         *
         * @param {number} width
         * @param {number} height
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.resize = function (width, height) {
            this._actualWidth = width;
            this._actualHeight = height;
            var newWidth = "";
            var newHeight = "";
            if (width != 0) {
                newWidth = width + "px";
            }
            if (height != 0) {
                newHeight = this.getNewHeight(height);
            }
            var treeGridObj = this.getTreeGridObject(), sizeSettings = {
                height: newHeight, width: newWidth,
            };
            if (treeGridObj) {
                // Save cell if currently in edit mode before start resizing the treegrid, otherwise errors would occur
                treeGridObj.saveCell();
                treeGridObj.option("sizeSettings", sizeSettings, true); // force the setting to resize the treegrid correct
            }
            if (this._columnIndexForDynamicSize != -1) {
                this.fillSpaceWithDynamicColumn(width);
            }
            //When treeGrid is resized, syncf scrollbar can be added or removed
            this.updatescrollbarsObservation();
            this._toolbar.resize(width);
        };
        /**
         * Returns the tree grid object definition for using a toolbar
         *
         * @returns {*}
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.getTreeGridToolbarSupport = function (activeSearchSupport) {
            var _this = this;
            if (activeSearchSupport === void 0) { activeSearchSupport = false; }
            if (activeSearchSupport == true) {
                return {
                    toolbarSettings: {
                        showToolbar: true,
                        toolbarItems: [ej.TreeGrid.ToolbarItems.Search],
                        customToolbarItems: this._toolbar.getCustomToolbars(),
                    },
                    toolbarClick: function (args) { return _this.toolbarClick(args); },
                };
            }
            return {
                toolbarSettings: {
                    showToolbar: true,
                    customToolbarItems: this._toolbar.getCustomToolbars(),
                },
                toolbarClick: function (args) { return _this.toolbarClick(args); },
            };
        };
        /**
         * Get new height of treegrid
         *
         * @param {number} height
         * @returns {string}
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.getNewHeight = function (height) {
            var newHeight = height - this._headerHeight - this._footerHeight + "px";
            if (this._footerHeight != 0) {
                var nonContentHeight = this.getNonTreeGridContentHeight();
                if (parseFloat(newHeight) < nonContentHeight) {
                    if (this.footerDiv != undefined) {
                        this.footerDiv.hidden = true;
                    }
                    newHeight = height - this._headerHeight + "px";
                }
                else {
                    if (this.footerDiv != undefined) {
                        this.footerDiv.hidden = false;
                    }
                }
            }
            return newHeight;
        };
        /**
         * Get height of treegrid without content (toolbar + header)
         *
         * @returns {number}
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.getNonTreeGridContentHeight = function () {
            var toolbar = $(this.mainDiv).find('.e-treegridtoolbar');
            var header = $(this.mainDiv).find('.e-gridheader');
            var toolbarHeight = parseFloat(toolbar.css('height'));
            var headerHeight = parseFloat(header.css('height'));
            toolbarHeight = toolbarHeight == NaN ? 0 : toolbarHeight;
            headerHeight = headerHeight == NaN ? 0 : headerHeight;
            //1 is added if it is not a Gantt chart (syncfusion internal weird stuff)
            return toolbarHeight + headerHeight + 1;
        };
        /**
         * Sets the datamodel to the dataSource of the treegrid, also if an edit operation is active
         *
         * @protected
         * @param {*} datamodel
         * @returns
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.setModelWithEditSupport = function (datamodel) {
            return __awaiter(this, void 0, void 0, function () {
                var i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this.isTreeGridInEditMode() == false)) return [3 /*break*/, 1];
                            // To refresh TreeGrid with new datasource
                            this.setModel(datamodel);
                            return [3 /*break*/, 5];
                        case 1:
                            i = 0;
                            _a.label = 2;
                        case 2:
                            if (!(i < 100)) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.sleep(200)];
                        case 3:
                            _a.sent();
                            // is editing already finished
                            if (this.isTreeGridInEditMode() == false) {
                                this.setModel(datamodel);
                                return [2 /*return*/];
                            }
                            _a.label = 4;
                        case 4:
                            i++;
                            return [3 /*break*/, 2];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Sleeps for some milliseconds
         *
         * @private
         * @param {number} ms
         * @returns
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.sleep = function (ms) {
            return new Promise(function (resolve) { return setTimeout(resolve, ms); });
        };
        /**
         * Returns true if the treegrid is currently in editmode
         *
         * @private
         * @returns {boolean}
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.isTreeGridInEditMode = function () {
            var treegridObj = this.getTreeGridObject();
            if (treegridObj.model.isEdit == true) {
                return true;
            }
            return false;
        };
        /**
         * Sets the datamodel to the dataSource of the treegrid
         *
         * @protected
         * @param {*} model
         * @param {boolean} [force=false]
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.setModel = function (model, force) {
            if (force === void 0) { force = false; }
            var treeGridObj = this.getTreeGridObject();
            if (treeGridObj != undefined) {
                treeGridObj.setModel({ "dataSource": model }, force);
                if (this._columnIndexForDynamicSize != -1) {
                    // To avoid empty space after last column because of removing the scrollbar if less data is available
                    this.fillSpaceWithDynamicColumn(this.width);
                }
            }
        };
        /**
         * Resize dynamic column
         * If changed column was dynamic column the size of the last column will be adapted
         *
         * @protected
         * @param {*} columnIndex	columnIndex of changed column
         * @param {*} treeGridModel
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.resizeDynamicColumn = function (columnIndex, treeGridModel) {
            var treeGridWidth = parseInt(treeGridModel.sizeSettings.width, 10); // parseInt to remove "px"
            if (columnIndex != this._columnIndexForDynamicSize && columnIndex < this._columnIndexForDynamicSize) {
                this.fillSpaceWithDynamicColumn(treeGridWidth);
            }
            else {
                // Dynamic column size was changed => update last "visible" column to fill space
                var lastVisibleColumnIndex = this.getLastVisibleColumnIndex(treeGridModel);
                this.fillSpaceWithColumn(lastVisibleColumnIndex, treeGridWidth);
            }
        };
        /**
         * Returns the settings of this component
         *
         * @param {boolean} onlyModified
         * @returns {ComponentSettings}
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.getComponentSettings = function (onlyModified) {
            // Add treegrid persisting data
            this.component.setSetting(TreeGridWidgetBase.ColumnsSettingId, this.getColumnSettings());
            this.component.setSetting(TreeGridWidgetBase.ScrollbarsSettingsId, this.getScrollBarSettings());
            return _super.prototype.getComponentSettings.call(this, onlyModified);
        };
        /**
         * Sets the given settings to this component
         *2
         * @param {ComponentSettings} componentSettings
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.setComponentSettings = function (componentSettings) {
            if (componentSettings != undefined) {
                _super.prototype.setComponentSettings.call(this, componentSettings);
                this.setColumnSettings(this.component.getSetting(TreeGridWidgetBase.ColumnsSettingId));
                this.setScrollBarSettings(this.component.getSetting(TreeGridWidgetBase.ScrollbarsSettingsId));
                // Hide tableheader/filter row after setting new column sizes if needed
                if (this.hideSomeTableHeaderParts() == true) {
                    // After setting the treegrid column sizes, the header parts will be shown => hide header parts if not needed
                    this.hideTableHeader();
                }
            }
        };
        /**
         * Returns the column settings
         *
         * @private
         * @returns {Array<TreeGridColumnDefinition>}
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.getColumnSettings = function () {
            var columnData = new Array();
            var treeGridObject = this.getTreeGridObject();
            if (treeGridObject != undefined) {
                var columnSettings = treeGridObject.option("columns");
                if (columnSettings != undefined) {
                    for (var i = 0; i < columnSettings.length; i++) {
                        columnData.push(new treeGridColumnDefinition_1.TreeGridColumnDefinition(columnSettings[i].field, columnSettings[i].width, columnSettings[i].visible));
                    }
                }
            }
            return columnData;
        };
        /**
         * Sets the given columns settings
         *
         * @param {Array<TreeGridColumnDefinition>} columnData
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.setColumnSettings = function (columnData) {
            var treeGridObject = this.getTreeGridObject();
            if (treeGridObject != undefined) {
                if (columnData != undefined) {
                    var columnSettings = treeGridObject.option("columns");
                    if (columnSettings != undefined) {
                        var _loop_1 = function (i) {
                            var columnSetting = columnSettings.find(function (colSetting) { return colSetting.field == columnData[i].id; });
                            if (columnSetting != undefined) {
                                columnSetting.visible = columnData[i].isVisible;
                                columnSetting.width = columnData[i].width;
                            }
                            else {
                                console.error("columnSettings not available for index: " + i);
                            }
                        };
                        for (var i = 0; i < columnData.length; i++) {
                            _loop_1(i);
                        }
                    }
                    treeGridObject.option("columns", columnSettings, true);
                }
                // Hide tableheader/filter row after setting new column sizes if needed
                if (this.hideSomeTableHeaderParts() == true) {
                    // After setting the treegrid column sizes, the header parts will be shown => hide header parts if not needed
                    this.hideTableHeader();
                }
            }
        };
        TreeGridWidgetBase.prototype.getScrollBarSettings = function () {
            var treeGridObject = this.getTreeGridObject();
            var settings = {
                "vertical": treeGridObject.getScrollTopOffset(),
                "horizontal": treeGridObject.getScrollLeftOffset()
            };
            return settings;
        };
        TreeGridWidgetBase.prototype.setScrollBarSettings = function (data) {
            if (data == undefined) {
                return;
            }
            var treeGridObject = this.getTreeGridObject();
            treeGridObject.scrollOffset(data.horizontal, data.vertical);
        };
        /**
         * Returns the index of the last visible column
         *
         * @private
         * @param {*} treeGridModel
         * @returns
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.getLastVisibleColumnIndex = function (treeGridModel) {
            for (var i = treeGridModel.columns.length - 1; i >= 0; i--) {
                if (treeGridModel.columns[i].visible == true) {
                    return i;
                }
            }
            return -1;
        };
        /**
         * creates the tree grid
         *
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.createLayout = function () {
            this.createTemplates();
            this.createTreeGrid();
            if (this.hideSomeTableHeaderParts() == true) {
                // Hide some header parts of treegrid
                this.hideTableHeader();
            }
        };
        /**
         * Returns the ej tree grid object
         *
         * @returns {ej.TreeGrid}
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.getTreeGridObject = function () {
            return $(this.mainDiv).data("ejTreeGrid");
        };
        /**
         * clears the dragged records list(needed after drag & drop was canceled)
         *
         * @protected
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.clearDraggedRecords = function () {
            var treeGridObject = this.getTreeGridObject();
            if (treeGridObject != undefined) {
                treeGridObject._draggedRecords = [];
            }
        };
        /**
         * Returns the tree record for the given element
         *
         * @protected
         * @param {*} element
         * @returns {any}
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.getTreeRecord = function (element) {
            var treegridObj = this.getTreeGridObject();
            var tr = element.closest("tr");
            if (tr != undefined) {
                var index = tr.rowIndex;
                if (treegridObj.model.currentViewData != undefined) {
                    return treegridObj.model.currentViewData[index];
                }
            }
            return undefined;
        };
        /**
         * Set the focus to the current tree grid
         *
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.focus = function () {
            // TODO: No public focus method available for tree grid, but needed for forcing the focus to the tree grid if draggable is used in a tree grid
            // (in case of draggable tree grid will not be focused because not the treegrid row will be selected on a click, but the directly div will by selected => svg or other div)
            this.getTreeGridObject()._focusTreeGridElement();
        };
        /**
         * Initializes locale resources
         *
         * @private
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.initializeLocales = function () {
            // get the locales for the treegrid
            var loc = ej.TreeGrid.Locale;
            // show an empty string if no records are available
            loc.default.emptyRecord = "";
        };
        TreeGridWidgetBase.prototype.fillSpaceWithDynamicColumn = function (treegridWidth) {
            if (this._columnIndexForDynamicSize == -1) {
                return;
            }
            this.fillSpaceWithColumn(this._columnIndexForDynamicSize, treegridWidth);
        };
        TreeGridWidgetBase.prototype.fillSpaceWithColumn = function (fillSpaceColumnIndex, treegridWidth) {
            var treeObj = this.getTreeGridObject();
            if (!treeObj) {
                return;
            }
            var columns = treeObj.option("columns");
            if (!columns) {
                return;
            }
            var newColumnWidth = this.getNewColumnWidth(treegridWidth, columns, fillSpaceColumnIndex);
            if (newColumnWidth > this._minColumnWidthForDynamicColumn) {
                columns[fillSpaceColumnIndex].width = newColumnWidth - 3; //-3 to avoid scrollbar
                columns[fillSpaceColumnIndex].width -= this.getScrollBarWidth(); // remove scrollbar size
                treeObj.option("columns", columns, true);
                if (this.hideSomeTableHeaderParts() == true) {
                    // After setting the treegrid co6lumn sizes, the header parts will be shown => hide header parts if not needed
                    this.hideTableHeader();
                }
            }
        };
        TreeGridWidgetBase.prototype.setColumnWidth = function (index, width) {
            var treeObj = this.getTreeGridObject();
            if (!treeObj) {
                return;
            }
            var columns = treeObj.option("columns");
            if (!columns) {
                return;
            }
            columns[index].width = width;
            treeObj.option("columns", columns, true);
            this.fillSpaceWithColumn(this._columnIndexForDynamicSize, this._actualWidth);
        };
        /**
         * Returns true if some parts of the table header should be hidden(e.g. column header, filterbar, ...)
         *
         * @private
         * @returns {boolean}
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.hideSomeTableHeaderParts = function () {
            if (this._hideColumnHeader == true) {
                return true;
            }
            if (this._hideHeaderFilterBar == true) {
                return true;
            }
            return false;
        };
        TreeGridWidgetBase.prototype.getScrollBarWidth = function () {
            var viewDiv = $(this.mainDiv).find('.e-gridcontent');
            for (var childIndex = 0; childIndex < viewDiv[0].children.length; childIndex++) {
                var child = viewDiv[0].children[childIndex];
                if (child.classList.contains("e-vscrollbar") == true) {
                    return child.clientWidth;
                }
            }
            return 0;
        };
        TreeGridWidgetBase.prototype.getNewColumnWidth = function (treegridWidth, columns, fillSpaceColumnIndex) {
            var newColumnWidth = treegridWidth;
            for (var columnIndex = 0; columnIndex < columns.length; columnIndex++) {
                if (columnIndex != fillSpaceColumnIndex) {
                    if (columns[columnIndex] != undefined && columns[columnIndex].visible == true) {
                        newColumnWidth -= columns[columnIndex].width;
                    }
                }
            }
            return newColumnWidth;
        };
        /**
         * Hides the table header parts which are currently defined to be hidden(e.g. _hideColumnHeader, _hideHeaderFilterBar, ...)
         *
         * @private
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.hideTableHeader = function () {
            var $treeGridHeader = $(this.mainDiv).find(".e-gridheader");
            var tableHeader = $treeGridHeader[0].children[0].children[0];
            if (tableHeader != undefined) {
                var columnHeader = tableHeader.rows[0];
                var filterBar = tableHeader.rows[1];
                if (columnHeader != undefined) {
                    if (this._hideColumnHeader == true) {
                        // hide column header
                        columnHeader.style.display = "none";
                    }
                }
                if (filterBar != undefined) {
                    if (this._hideHeaderFilterBar == true) {
                        // hide filterbar
                        filterBar.style.display = "none";
                    }
                }
            }
        };
        /**
         * Called when a button in the toolbar is clicked
         *
         * @protected
         * @param {*} args
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.toolbarClick = function (args) {
            var treeGridObj = this.getTreeGridObject();
            //Cancel edit cell when toolbar button is clicked
            if (treeGridObj != undefined && treeGridObj.model.isEdit == true) {
                treeGridObj.cancelEditCell();
            }
            if (this._toolbar.isExpandCollapseSelected(args) == true) {
                // Disables refresh caused by syncfusion calls
                this.enableTreeGridRefresh(false);
                this._toolbar.toolbarClick(args, this);
                this.enableTreeGridRefresh(true);
                this.refresh();
            }
            else {
                this._toolbar.toolbarClick(args, this);
            }
        };
        /**
         * Save tree grid settings
         *
         * @protected
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.saveTreeGridSettings = function () {
            if (this.component.getPersistency()) {
                this.updatescrollbarsObservation();
                this.saveSettings();
            }
        };
        /**
         * Updates scrollbar observation for both scrollbars
         *
         * @protected
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.updatescrollbarsObservation = function () {
            var verticalScrollbar = this.getVerticalScrollbar();
            var horizontalScrollbar = this.getHorizontalScrollbar();
            this.updateScrollbarObservation(verticalScrollbar, this._verticalScrollbarObserver);
            this.updateScrollbarObservation(horizontalScrollbar, this._horizontalScrollbarObserver);
        };
        /**
         * Observe scrollbar, unobserve scrollbar or don't do anything.
         *
         * @private
         * @param {(HTMLElement | undefined)} element
         * @param {(MutationObserver | undefined)} observer
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.updateScrollbarObservation = function (element, observer) {
            if (element !== undefined && observer === undefined) {
                this.observeScrollbar(element, observer);
            }
            else if (element === undefined) {
                this.unobserveScrollbar(observer);
            }
        };
        /**
         * Get element of vertical scrollbar
         *
         * @private
         * @returns {(HTMLElement | undefined)}
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.getVerticalScrollbar = function () {
            var scrollbarElement = $(this.mainDiv).find('.e-vscrollbar');
            if (scrollbarElement.length > 0) {
                return scrollbarElement.find('.e-vhandle')[0];
            }
            return undefined;
        };
        /**
         * Get element of horizontal scrollbar
         *
         * @private
         * @returns {(HTMLElement | undefined)}
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.getHorizontalScrollbar = function () {
            var scrollbarElement = $(this.mainDiv).find('.e-hscrollbar');
            if (scrollbarElement.length > 0) {
                return scrollbarElement.find('.e-hhandle')[0];
            }
            return undefined;
        };
        /**
         * Observe scrollbar for changes
         *
         * @private
         * @param {HTMLElement} target
         * @param {(MutationObserver | undefined)} observer
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.observeScrollbar = function (target, observer) {
            var widget = this;
            observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutationRecord) {
                    var scrollSettings = widget.getComponentSettings(true).data.scrollbars;
                    if (scrollSettings.horizontal != widget._previousScrollSettings.horizontal || scrollSettings.vertical != widget._previousScrollSettings.vertical) {
                        widget._previousScrollSettings = scrollSettings;
                        widget.saveSettings();
                    }
                });
            });
            observer.observe(target, { attributes: true });
        };
        /**
         * Unobserve scrollbar
         *
         * @private
         * @param {(MutationObserver | undefined)} observer
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.unobserveScrollbar = function (observer) {
            if (observer !== undefined) {
                observer.disconnect();
                observer = undefined;
            }
        };
        /**
         * Sets flags that enables/disables refresh of treegrid
         *
         * @protected
         * @param {boolean} value
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.enableTreeGridRefresh = function (value) {
            this.refreshEnabled = value;
        };
        TreeGridWidgetBase.prototype.refresh = function () { };
        ;
        /**
         * Creates the templates(e.g. column, row, ...) for the tree grid and adds them to the widget container
         *
         * @protected
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.createTemplates = function () {
        };
        TreeGridWidgetBase.ColumnsSettingId = "columns";
        TreeGridWidgetBase.ScrollbarsSettingsId = "scrollbars";
        return TreeGridWidgetBase;
    }(widgetBase_1.WidgetBase));
    exports.TreeGridWidgetBase = TreeGridWidgetBase;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZUdyaWRXaWRnZXRCYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NvbW1vbi90cmVlR3JpZFdpZGdldEJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQU1BO1FBQTBDLHNDQUFVO1FBQXBEO1lBQUEscUVBdXhCQztZQWx4QlEsZ0NBQTBCLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxrQ0FBa0M7WUFDbkUscUNBQStCLEdBQUcsRUFBRSxDQUFDO1lBQ3JDLHVCQUFpQixHQUFHLEtBQUssQ0FBQztZQUMxQiwwQkFBb0IsR0FBRyxLQUFLLENBQUM7WUFJN0IsNkJBQXVCLEdBQW9CLEVBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxZQUFZLEVBQUUsQ0FBQyxFQUFDLENBQUM7WUFLMUUsY0FBUSxHQUF3QixJQUFJLHlDQUFtQixDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUV0RSxvQkFBYyxHQUFZLElBQUksQ0FBQzs7UUFvd0IxQyxDQUFDO1FBbHdCQSx1Q0FBVSxHQUFWO1lBQ0MsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFFekIsd0JBQXdCO1lBQ3hCLGlCQUFNLFVBQVUsV0FBRSxDQUFDO1FBQ3BCLENBQUM7UUFFRDs7OztXQUlHO1FBQ0gsb0NBQU8sR0FBUDtZQUNDLGlCQUFNLE9BQU8sV0FBRSxDQUFDO1lBRWhCLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQzlDLElBQUcsY0FBYyxJQUFJLFNBQVMsRUFBQztnQkFDOUIsY0FBYyxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ3pCO1FBQ0YsQ0FBQztRQUVEOzs7OztXQUtNO1FBQ08sNENBQWUsR0FBekI7WUFDSSx5Q0FBeUM7WUFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFB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Q08sNENBQWUsR0FBekI7UUFFQSxDQUFDO1FBdHdCc0IsbUNBQWdCLEdBQUcsU0FBUyxDQUFDO1FBQzdCLHVDQUFvQixHQUFHLFlBQVksQ0FBQztRQXd3QjVELHlCQUFDO0tBQUEsQUF2eEJELENBQTBDLHVCQUFVLEdBdXhCbkQ7SUFFTyxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBXaWRnZXRCYXNlIH0gZnJvbSBcIi4vd2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBUcmVlR3JpZENvbHVtbkRlZmluaXRpb24gfSBmcm9tIFwiLi90cmVlR3JpZENvbHVtbkRlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgSVNjcm9sbFNldHRpbmdzIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9zY3JvbGxTZXR0aW5nc0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUcmVlR3JpZFRvb2xiYXJCYXNlIH0gZnJvbSBcIi4vdHJlZUdyaWRUb29sYmFyQmFzZVwiO1xyXG5cclxuYWJzdHJhY3QgY2xhc3MgVHJlZUdyaWRXaWRnZXRCYXNlIGV4dGVuZHMgV2lkZ2V0QmFzZXtcclxuXHJcblx0cHJvdGVjdGVkIF9hY3R1YWxXaWR0aDtcclxuXHRwcm90ZWN0ZWQgX2FjdHVhbEhlaWdodDtcclxuXHJcblx0cHJpdmF0ZSBfY29sdW1uSW5kZXhGb3JEeW5hbWljU2l6ZSA9IC0xOyAvLyAtMSBmb3Igbm8gZHluYW1pYyBzaXplIGJlaGF2aW9yXHJcblx0cHJpdmF0ZSBfbWluQ29sdW1uV2lkdGhGb3JEeW5hbWljQ29sdW1uID0gMTA7XHJcblx0cHJpdmF0ZSBfaGlkZUNvbHVtbkhlYWRlciA9IGZhbHNlO1xyXG5cdHByaXZhdGUgX2hpZGVIZWFkZXJGaWx0ZXJCYXIgPSBmYWxzZTtcclxuXHJcblx0cHJpdmF0ZSBfdmVydGljYWxTY3JvbGxiYXJPYnNlcnZlcjtcclxuXHRwcml2YXRlIF9ob3Jpem9udGFsU2Nyb2xsYmFyT2JzZXJ2ZXI7XHJcblx0cHJpdmF0ZSBfcHJldmlvdXNTY3JvbGxTZXR0aW5nczogSVNjcm9sbFNldHRpbmdzID0ge1widmVydGljYWxcIjogMCwgXCJob3Jpem9udGFsXCI6IDB9O1xyXG5cclxuXHRwdWJsaWMgc3RhdGljIHJlYWRvbmx5IENvbHVtbnNTZXR0aW5nSWQgPSBcImNvbHVtbnNcIjtcclxuXHRwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFNjcm9sbGJhcnNTZXR0aW5nc0lkID0gXCJzY3JvbGxiYXJzXCI7XHJcblxyXG5cdHByb3RlY3RlZCBfdG9vbGJhcjogVHJlZUdyaWRUb29sYmFyQmFzZSA9IG5ldyBUcmVlR3JpZFRvb2xiYXJCYXNlKHRoaXMubWFpbkRpdik7XHJcblxyXG5cdHByb3RlY3RlZCByZWZyZXNoRW5hYmxlZDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG5cdGluaXRpYWxpemUoKSB7XHJcblx0XHR0aGlzLmluaXRpYWxpemVMb2NhbGVzKCk7XHJcblx0XHRcclxuXHRcdC8vIEluaXRpYWxpemUgdGhlIHdpZGdldFxyXG5cdFx0c3VwZXIuaW5pdGlhbGl6ZSgpO1x0XHRcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERpc3Bvc2UgdGhlIHRyZWUgZ3JpZCBkYXRhXHJcblx0ICpcclxuXHQgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcblx0ICovXHJcblx0ZGlzcG9zZSgpe1xyXG5cdFx0c3VwZXIuZGlzcG9zZSgpO1xyXG5cclxuXHRcdGxldCB0cmVlR3JpZE9iamVjdCA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTtcclxuXHRcdGlmKHRyZWVHcmlkT2JqZWN0ICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdHRyZWVHcmlkT2JqZWN0LmRlc3Ryb3koKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG4gICAgICogVHJlZUdyaWQgd2FzIGNyZWF0ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgdHJlZUdyaWRDcmVhdGVkKCl7XHJcbiAgICAgICAgLy8gU2V0cyB0aGUgZGVmYXVsdCB0b29sYmFyIGJ1dHRvbiBzdGF0ZXNcclxuICAgICAgICB0aGlzLl90b29sYmFyLmluaXRUb29sYmFyU3RhdGVzKCk7XHJcbiAgICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgYSBkeW5hbWljIGNvbHVtblxyXG5cdCAqIFRoaXMgY29sdW1uIHdpbGwgYmUgcmVzaXplZCBpZiB0aGUgd2luZG93L3dpZGdldCB3ZXJlIHJlc2l6ZWRcclxuXHQgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBjb2x1bW5JbmRleFxyXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBtaW5Db2x1bW5XaWR0aEZvckR5bmFtaWNDb2x1bW5cclxuXHQgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcblx0ICovXHJcblx0cHJvdGVjdGVkIHNldER5bmFtaWNDb2x1bW4oY29sdW1uSW5kZXg6IG51bWJlciwgbWluQ29sdW1uV2lkdGhGb3JEeW5hbWljQ29sdW1uOiBudW1iZXIpe1xyXG5cdFx0dGhpcy5fY29sdW1uSW5kZXhGb3JEeW5hbWljU2l6ZSA9IGNvbHVtbkluZGV4O1xyXG5cdFx0dGhpcy5fbWluQ29sdW1uV2lkdGhGb3JEeW5hbWljQ29sdW1uID0gbWluQ29sdW1uV2lkdGhGb3JEeW5hbWljQ29sdW1uO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcbiAgICAgKiBMb2FkcyB0aGUgc3R5bGVzIGZvciB0aGUgdHJlZSBncmlkIHdpZGdldCBiYXNlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBsb2FkU3R5bGVzKCl7XHJcblx0XHR0aGlzLmFkZFN0eWxlKFwid2lkZ2V0cy9jb21tb24vc3R5bGUvY3NzL3RyZWVHcmlkU3R5bGUuY3NzXCIpO1xyXG5cdFx0dGhpcy5hZGRTdHlsZShcIndpZGdldHMvY29tbW9uL3N0eWxlL2Nzcy90cmVlR3JpZFNjcm9sbEJhclN0eWxlLmNzc1wiKTtcclxuXHRcdHRoaXMuYWRkU3R5bGUoXCJ3aWRnZXRzL2NvbW1vbi9zdHlsZS9jc3MvdHJlZUdyaWRJY29uU3R5bGUuY3NzXCIpO1xyXG5cdFx0dGhpcy5hZGRTdHlsZShcIndpZGdldHMvY29tbW9uL3N0eWxlL2Nzcy90cmVlR3JpZFRvb2xiYXJCdXR0b25TdHlsZS5jc3NcIik7XHJcblx0XHR0aGlzLmFkZFN0eWxlKFwid2lkZ2V0cy9jb21tb24vc3R5bGUvY3NzL3dpZGdldEhlYWRlckZvb3RlclN0eWxlLmNzc1wiKTtcclxuXHR9XHJcblxyXG5cdHNldENlbGxFZGl0KHZhbHVlOiBib29sZWFuKXtcclxuXHRcdHZhciB0cmVlR3JpZE9iamVjdCA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTtcclxuXHRcdCg8YW55PnRyZWVHcmlkT2JqZWN0Lm1vZGVsKS5pc0VkaXQgPSB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGZsYWcgdGhhdCB0aGUgY29sdW1uIGhlYWRlciBvZiB0aGUgdHJlZSBncmlkIHNob3VsZCBiZSBoaWRkZW5cclxuXHQgKlxyXG5cdCAqIEBtZW1iZXJvZiBUcmVlR3JpZFdpZGdldEJhc2VcclxuXHQgKi9cclxuXHRzZXRDb2x1bW5IZWFkZXJIaWRkZW4oKXtcclxuXHRcdHRoaXMuX2hpZGVDb2x1bW5IZWFkZXIgPSB0cnVlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgZmxhZyB0aGF0IHRoZSBoZWFkZXIgZmlsdGVyYmFyIG9mIHRoZSB0cmVlIGdyaWQgc2hvdWxkIGJlIGhpZGRlblxyXG5cdCAqXHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdHNldEhlYWRlckZpbHRlckJhckhpZGRlbigpe1xyXG5cdFx0dGhpcy5faGlkZUhlYWRlckZpbHRlckJhciA9IHRydWU7XHJcblx0fVxyXG5cclxuXHQvKiogcmVzaXplcyB0aGUgdHJlZSBncmlkIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG4gICAgICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICByZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpe1xyXG5cdFx0dGhpcy5fYWN0dWFsV2lkdGggPSB3aWR0aDtcclxuXHRcdHRoaXMuX2FjdHVhbEhlaWdodCA9IGhlaWdodDtcclxuXHJcblx0XHR2YXIgbmV3V2lkdGggOiBzdHJpbmcgPSBcIlwiO1xyXG5cdFx0dmFyIG5ld0hlaWdodCA6IHN0cmluZyA9IFwiXCI7XHJcblx0XHRpZih3aWR0aCAhPSAwKXtcclxuXHRcdFx0bmV3V2lkdGggPSB3aWR0aCArIFwicHhcIjtcclxuXHRcdH1cclxuXHRcdGlmKGhlaWdodCAhPSAwKXtcclxuXHRcdFx0bmV3SGVpZ2h0ID0gdGhpcy5nZXROZXdIZWlnaHQoaGVpZ2h0KTtcclxuXHRcdH1cclxuXHRcdFx0XHJcblx0XHR2YXIgdHJlZUdyaWRPYmogPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCksXHJcblx0XHRcdHNpemVTZXR0aW5ncyA9IHtcclxuXHRcdFx0XHRoZWlnaHQ6IG5ld0hlaWdodCwgd2lkdGg6IG5ld1dpZHRoLCAvLyAxMDAlIHdvdWxkIGJlIHdyb25nID0+IHNldCBlbXB0eSBzdHJpbmcgdG8gcmVzaXplIHRoZSB0cmVlZ3JpZCBjb3JyZWN0XHJcblx0XHR9O1xyXG5cdFx0aWYgKHRyZWVHcmlkT2JqKXtcclxuXHRcdFx0Ly8gU2F2ZSBjZWxsIGlmIGN1cnJlbnRseSBpbiBlZGl0IG1vZGUgYmVmb3JlIHN0YXJ0IHJlc2l6aW5nIHRoZSB0cmVlZ3JpZCwgb3RoZXJ3aXNlIGVycm9ycyB3b3VsZCBvY2N1clxyXG5cdFx0XHR0cmVlR3JpZE9iai5zYXZlQ2VsbCgpOyBcclxuXHRcdFx0dHJlZUdyaWRPYmoub3B0aW9uKFwic2l6ZVNldHRpbmdzXCIsIHNpemVTZXR0aW5ncywgdHJ1ZSk7IC8vIGZvcmNlIHRoZSBzZXR0aW5nIHRvIHJlc2l6ZSB0aGUgdHJlZWdyaWQgY29ycmVjdFxyXG5cdFx0fVxyXG5cdFx0aWYodGhpcy5fY29sdW1uSW5kZXhGb3JEeW5hbWljU2l6ZSAhPSAtMSl7XHJcblx0XHRcdHRoaXMuZmlsbFNwYWNlV2l0aER5bmFtaWNDb2x1bW4od2lkdGgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vV2hlbiB0cmVlR3JpZCBpcyByZXNpemVkLCBzeW5jZiBzY3JvbGxiYXIgY2FuIGJlIGFkZGVkIG9yIHJlbW92ZWRcclxuXHRcdHRoaXMudXBkYXRlc2Nyb2xsYmFyc09ic2VydmF0aW9uKCk7XHJcblxyXG5cdFx0dGhpcy5fdG9vbGJhci5yZXNpemUod2lkdGgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgdHJlZSBncmlkIG9iamVjdCBkZWZpbml0aW9uIGZvciB1c2luZyBhIHRvb2xiYXJcclxuXHQgKlxyXG5cdCAqIEByZXR1cm5zIHsqfVxyXG5cdCAqIEBtZW1iZXJvZiBUcmVlR3JpZFdpZGdldEJhc2VcclxuXHQgKi9cclxuXHRwcm90ZWN0ZWQgZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydChhY3RpdmVTZWFyY2hTdXBwb3J0OiBib29sZWFuID0gZmFsc2UpOiB7fXtcclxuXHRcdGlmKGFjdGl2ZVNlYXJjaFN1cHBvcnQgPT0gdHJ1ZSl7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0dG9vbGJhclNldHRpbmdzOiB7XHJcblx0XHRcdFx0XHRzaG93VG9vbGJhcjogdHJ1ZSxcclxuXHRcdFx0XHRcdHRvb2xiYXJJdGVtczogIFsgZWouVHJlZUdyaWQuVG9vbGJhckl0ZW1zLlNlYXJjaCBdLFxyXG5cdFx0XHRcdFx0Y3VzdG9tVG9vbGJhckl0ZW1zOiB0aGlzLl90b29sYmFyLmdldEN1c3RvbVRvb2xiYXJzKCksXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR0b29sYmFyQ2xpY2s6IChhcmdzKSA9PiB0aGlzLnRvb2xiYXJDbGljayhhcmdzKSxcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHtcclxuICAgICAgICAgICAgdG9vbGJhclNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICBzaG93VG9vbGJhcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGN1c3RvbVRvb2xiYXJJdGVtczogdGhpcy5fdG9vbGJhci5nZXRDdXN0b21Ub29sYmFycygpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0b29sYmFyQ2xpY2s6IChhcmdzKSA9PiB0aGlzLnRvb2xiYXJDbGljayhhcmdzKSxcclxuICAgICAgICB9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXQgbmV3IGhlaWdodCBvZiB0cmVlZ3JpZFxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9XHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdGdldE5ld0hlaWdodChoZWlnaHQ6IG51bWJlcik6IHN0cmluZyB7XHJcblx0XHRsZXQgbmV3SGVpZ2h0ID0gaGVpZ2h0IC0gdGhpcy5faGVhZGVySGVpZ2h0IC0gdGhpcy5fZm9vdGVySGVpZ2h0ICsgXCJweFwiO1xyXG5cdFx0aWYgKHRoaXMuX2Zvb3RlckhlaWdodCAhPSAwKSB7XHJcblx0XHRcdGxldCBub25Db250ZW50SGVpZ2h0ID0gdGhpcy5nZXROb25UcmVlR3JpZENvbnRlbnRIZWlnaHQoKTtcclxuXHRcdFx0aWYgKHBhcnNlRmxvYXQobmV3SGVpZ2h0KSA8IG5vbkNvbnRlbnRIZWlnaHQpIHtcclxuXHRcdFx0XHRpZih0aGlzLmZvb3RlckRpdiAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRcdFx0dGhpcy5mb290ZXJEaXYuaGlkZGVuID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0bmV3SGVpZ2h0ID0gaGVpZ2h0IC0gdGhpcy5faGVhZGVySGVpZ2h0ICtcInB4XCI7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0aWYodGhpcy5mb290ZXJEaXYgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0XHRcdHRoaXMuZm9vdGVyRGl2LmhpZGRlbiA9IGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG5ld0hlaWdodDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldCBoZWlnaHQgb2YgdHJlZWdyaWQgd2l0aG91dCBjb250ZW50ICh0b29sYmFyICsgaGVhZGVyKVxyXG5cdCAqXHJcblx0ICogQHJldHVybnMge251bWJlcn1cclxuXHQgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcblx0ICovXHJcblx0Z2V0Tm9uVHJlZUdyaWRDb250ZW50SGVpZ2h0KCk6IG51bWJlciB7XHJcblx0XHRsZXQgdG9vbGJhciA9ICQodGhpcy5tYWluRGl2KS5maW5kKCcuZS10cmVlZ3JpZHRvb2xiYXInKTtcclxuXHRcdGxldCBoZWFkZXIgPSAkKHRoaXMubWFpbkRpdikuZmluZCgnLmUtZ3JpZGhlYWRlcicpO1xyXG5cdFx0bGV0IHRvb2xiYXJIZWlnaHQgPSBwYXJzZUZsb2F0KHRvb2xiYXIuY3NzKCdoZWlnaHQnKSk7XHJcblx0XHRsZXQgaGVhZGVySGVpZ2h0ID0gcGFyc2VGbG9hdChoZWFkZXIuY3NzKCdoZWlnaHQnKSk7XHJcblx0XHR0b29sYmFySGVpZ2h0ID0gdG9vbGJhckhlaWdodCA9PSBOYU4gPyAwIDogdG9vbGJhckhlaWdodDtcclxuXHRcdGhlYWRlckhlaWdodCA9IGhlYWRlckhlaWdodCA9PSBOYU4gPyAwIDogaGVhZGVySGVpZ2h0O1xyXG5cdFx0XHJcblx0XHQvLzEgaXMgYWRkZWQgaWYgaXQgaXMgbm90IGEgR2FudHQgY2hhcnQgKHN5bmNmdXNpb24gaW50ZXJuYWwgd2VpcmQgc3R1ZmYpXHJcblx0XHRyZXR1cm4gdG9vbGJhckhlaWdodCArIGhlYWRlckhlaWdodCArIDE7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBkYXRhbW9kZWwgdG8gdGhlIGRhdGFTb3VyY2Ugb2YgdGhlIHRyZWVncmlkLCBhbHNvIGlmIGFuIGVkaXQgb3BlcmF0aW9uIGlzIGFjdGl2ZVxyXG5cdCAqXHJcblx0ICogQHByb3RlY3RlZFxyXG5cdCAqIEBwYXJhbSB7Kn0gZGF0YW1vZGVsXHJcblx0ICogQHJldHVybnNcclxuXHQgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcblx0ICovXHJcblx0cHJvdGVjdGVkIGFzeW5jIHNldE1vZGVsV2l0aEVkaXRTdXBwb3J0KGRhdGFtb2RlbDogYW55KXtcclxuXHRcdGlmICh0aGlzLmlzVHJlZUdyaWRJbkVkaXRNb2RlKCkgPT0gZmFsc2Upe1xyXG5cdFx0XHQvLyBUbyByZWZyZXNoIFRyZWVHcmlkIHdpdGggbmV3IGRhdGFzb3VyY2VcclxuXHRcdFx0dGhpcy5zZXRNb2RlbChkYXRhbW9kZWwpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZXtcclxuXHRcdFx0Ly8gdHJlZWdyaWQgaXMgaW4gZWRpdCBtb2RlID0+IHJlZnJlc2ggd291bGQgbm90IHdvcmsgPT4gd2FpdCBmb3IgZWRpdGluZyBpcyBmaW5pc2hlZFxyXG5cdFx0XHRmb3IobGV0IGkgPTA7IGkgPCAxMDA7IGkrKyl7XHJcblx0XHRcdFx0YXdhaXQgdGhpcy5zbGVlcCgyMDApO1xyXG5cdFx0XHRcdC8vIGlzIGVkaXRpbmcgYWxyZWFkeSBmaW5pc2hlZFxyXG5cdFx0XHRcdGlmICh0aGlzLmlzVHJlZUdyaWRJbkVkaXRNb2RlKCkgPT0gZmFsc2Upe1xyXG5cdFx0XHRcdFx0dGhpcy5zZXRNb2RlbChkYXRhbW9kZWwpO1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVx0XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcblx0ICogU2xlZXBzIGZvciBzb21lIG1pbGxpc2Vjb25kc1xyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge251bWJlcn0gbXNcclxuXHQgKiBAcmV0dXJuc1xyXG5cdCAqIEBtZW1iZXJvZiBUcmVlR3JpZFdpZGdldEJhc2VcclxuXHQgKi9cclxuXHRwcml2YXRlIHNsZWVwKG1zOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKTtcclxuICAgIH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0cnVlIGlmIHRoZSB0cmVlZ3JpZCBpcyBjdXJyZW50bHkgaW4gZWRpdG1vZGVcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHJldHVybnMge2Jvb2xlYW59XHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaXNUcmVlR3JpZEluRWRpdE1vZGUoKTogYm9vbGVhbntcclxuXHRcdGxldCB0cmVlZ3JpZE9iaiA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTtcclxuXHRcdGlmICgoPGFueT50cmVlZ3JpZE9iai5tb2RlbCkuaXNFZGl0ID09IHRydWUpe1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGRhdGFtb2RlbCB0byB0aGUgZGF0YVNvdXJjZSBvZiB0aGUgdHJlZWdyaWRcclxuXHQgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG5cdCAqIEBwYXJhbSB7Kn0gbW9kZWxcclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IFtmb3JjZT1mYWxzZV1cclxuXHQgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcblx0ICovXHJcblx0cHJvdGVjdGVkIHNldE1vZGVsKG1vZGVsOiBhbnksIGZvcmNlOiBib29sZWFuID0gZmFsc2Upe1xyXG5cdFx0dmFyIHRyZWVHcmlkT2JqID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG5cdFx0aWYgKHRyZWVHcmlkT2JqICE9IHVuZGVmaW5lZCkge1xyXG5cdFx0XHR0cmVlR3JpZE9iai5zZXRNb2RlbCh7XCJkYXRhU291cmNlXCIgOiBtb2RlbH0sIGZvcmNlKTtcclxuXHRcdFxyXG5cdFx0XHRpZih0aGlzLl9jb2x1bW5JbmRleEZvckR5bmFtaWNTaXplICE9IC0xKXtcclxuXHRcdFx0XHQvLyBUbyBhdm9pZCBlbXB0eSBzcGFjZSBhZnRlciBsYXN0IGNvbHVtbiBiZWNhdXNlIG9mIHJlbW92aW5nIHRoZSBzY3JvbGxiYXIgaWYgbGVzcyBkYXRhIGlzIGF2YWlsYWJsZVxyXG5cdFx0XHRcdHRoaXMuZmlsbFNwYWNlV2l0aER5bmFtaWNDb2x1bW4odGhpcy53aWR0aCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlc2l6ZSBkeW5hbWljIGNvbHVtblxyXG5cdCAqIElmIGNoYW5nZWQgY29sdW1uIHdhcyBkeW5hbWljIGNvbHVtbiB0aGUgc2l6ZSBvZiB0aGUgbGFzdCBjb2x1bW4gd2lsbCBiZSBhZGFwdGVkXHJcblx0ICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuXHQgKiBAcGFyYW0geyp9IGNvbHVtbkluZGV4XHRjb2x1bW5JbmRleCBvZiBjaGFuZ2VkIGNvbHVtblxyXG5cdCAqIEBwYXJhbSB7Kn0gdHJlZUdyaWRNb2RlbFxyXG5cdCAqIEBtZW1iZXJvZiBUcmVlR3JpZFdpZGdldEJhc2VcclxuXHQgKi9cclxuXHRwcm90ZWN0ZWQgcmVzaXplRHluYW1pY0NvbHVtbihjb2x1bW5JbmRleCwgdHJlZUdyaWRNb2RlbCl7XHJcblx0XHRsZXQgdHJlZUdyaWRXaWR0aCA9IHBhcnNlSW50KHRyZWVHcmlkTW9kZWwuc2l6ZVNldHRpbmdzLndpZHRoLCAxMCk7IC8vIHBhcnNlSW50IHRvIHJlbW92ZSBcInB4XCJcclxuXHRcdGlmKGNvbHVtbkluZGV4ICE9IHRoaXMuX2NvbHVtbkluZGV4Rm9yRHluYW1pY1NpemUgJiYgY29sdW1uSW5kZXggPCB0aGlzLl9jb2x1bW5JbmRleEZvckR5bmFtaWNTaXplKXtcclxuXHRcdFx0dGhpcy5maWxsU3BhY2VXaXRoRHluYW1pY0NvbHVtbih0cmVlR3JpZFdpZHRoKTsgXHJcblx0XHR9XHJcblx0XHRlbHNle1xyXG5cdFx0XHQvLyBEeW5hbWljIGNvbHVtbiBzaXplIHdhcyBjaGFuZ2VkID0+IHVwZGF0ZSBsYXN0IFwidmlzaWJsZVwiIGNvbHVtbiB0byBmaWxsIHNwYWNlXHJcblx0XHRcdGxldCBsYXN0VmlzaWJsZUNvbHVtbkluZGV4ID0gdGhpcy5nZXRMYXN0VmlzaWJsZUNvbHVtbkluZGV4KHRyZWVHcmlkTW9kZWwpO1xyXG5cdFx0XHR0aGlzLmZpbGxTcGFjZVdpdGhDb2x1bW4obGFzdFZpc2libGVDb2x1bW5JbmRleCwgdHJlZUdyaWRXaWR0aCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBzZXR0aW5ncyBvZiB0aGlzIGNvbXBvbmVudFxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtib29sZWFufSBvbmx5TW9kaWZpZWRcclxuXHQgKiBAcmV0dXJucyB7Q29tcG9uZW50U2V0dGluZ3N9XHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXRDb21wb25lbnRTZXR0aW5ncyhvbmx5TW9kaWZpZWQ6IGJvb2xlYW4pOiBDb21wb25lbnRTZXR0aW5nc3tcclxuXHRcdC8vIEFkZCB0cmVlZ3JpZCBwZXJzaXN0aW5nIGRhdGFcclxuXHRcdHRoaXMuY29tcG9uZW50LnNldFNldHRpbmcoVHJlZUdyaWRXaWRnZXRCYXNlLkNvbHVtbnNTZXR0aW5nSWQsIHRoaXMuZ2V0Q29sdW1uU2V0dGluZ3MoKSk7XHJcblx0XHR0aGlzLmNvbXBvbmVudC5zZXRTZXR0aW5nKFRyZWVHcmlkV2lkZ2V0QmFzZS5TY3JvbGxiYXJzU2V0dGluZ3NJZCwgdGhpcy5nZXRTY3JvbGxCYXJTZXR0aW5ncygpKTtcclxuXHRcdHJldHVybiBzdXBlci5nZXRDb21wb25lbnRTZXR0aW5ncyhvbmx5TW9kaWZpZWQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgZ2l2ZW4gc2V0dGluZ3MgdG8gdGhpcyBjb21wb25lbnRcclxuXHQgKjJcclxuXHQgKiBAcGFyYW0ge0NvbXBvbmVudFNldHRpbmdzfSBjb21wb25lbnRTZXR0aW5nc1xyXG5cdCAqIEBtZW1iZXJvZiBUcmVlR3JpZFdpZGdldEJhc2VcclxuXHQgKi9cclxuXHRwdWJsaWMgc2V0Q29tcG9uZW50U2V0dGluZ3MoY29tcG9uZW50U2V0dGluZ3M6IENvbXBvbmVudFNldHRpbmdzKSB7XHJcblx0XHRpZihjb21wb25lbnRTZXR0aW5ncyAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRzdXBlci5zZXRDb21wb25lbnRTZXR0aW5ncyhjb21wb25lbnRTZXR0aW5ncyk7XHRcdFxyXG5cdFx0XHR0aGlzLnNldENvbHVtblNldHRpbmdzKHRoaXMuY29tcG9uZW50LmdldFNldHRpbmcoVHJlZUdyaWRXaWRnZXRCYXNlLkNvbHVtbnNTZXR0aW5nSWQpKTtcclxuXHRcdFx0dGhpcy5zZXRTY3JvbGxCYXJTZXR0aW5ncyh0aGlzLmNvbXBvbmVudC5nZXRTZXR0aW5nKFRyZWVHcmlkV2lkZ2V0QmFzZS5TY3JvbGxiYXJzU2V0dGluZ3NJZCkpO1xyXG5cdFx0XHQvLyBIaWRlIHRhYmxlaGVhZGVyL2ZpbHRlciByb3cgYWZ0ZXIgc2V0dGluZyBuZXcgY29sdW1uIHNpemVzIGlmIG5lZWRlZFxyXG5cdFx0XHRpZih0aGlzLmhpZGVTb21lVGFibGVIZWFkZXJQYXJ0cygpID09IHRydWUpe1xyXG5cdFx0XHRcdC8vIEFmdGVyIHNldHRpbmcgdGhlIHRyZWVncmlkIGNvbHVtbiBzaXplcywgdGhlIGhlYWRlciBwYXJ0cyB3aWxsIGJlIHNob3duID0+IGhpZGUgaGVhZGVyIHBhcnRzIGlmIG5vdCBuZWVkZWRcclxuXHRcdFx0XHR0aGlzLmhpZGVUYWJsZUhlYWRlcigpOyBcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgY29sdW1uIHNldHRpbmdzXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEByZXR1cm5zIHtBcnJheTxUcmVlR3JpZENvbHVtbkRlZmluaXRpb24+fVxyXG5cdCAqIEBtZW1iZXJvZiBUcmVlR3JpZFdpZGdldEJhc2VcclxuXHQgKi9cclxuXHRwcml2YXRlIGdldENvbHVtblNldHRpbmdzKCk6IEFycmF5PFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbj57XHJcblx0XHRsZXQgY29sdW1uRGF0YSA9IG5ldyBBcnJheTxhbnk+KCk7XHJcblx0XHRsZXQgdHJlZUdyaWRPYmplY3QgPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcblx0XHRpZih0cmVlR3JpZE9iamVjdCAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRsZXQgY29sdW1uU2V0dGluZ3MgPSB0cmVlR3JpZE9iamVjdC5vcHRpb24oXCJjb2x1bW5zXCIpOyBcclxuXHRcdFx0aWYoY29sdW1uU2V0dGluZ3MgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgY29sdW1uU2V0dGluZ3MubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHRcdFx0Y29sdW1uRGF0YS5wdXNoKG5ldyBUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oY29sdW1uU2V0dGluZ3NbaV0uZmllbGQsIGNvbHVtblNldHRpbmdzW2ldLndpZHRoLCBjb2x1bW5TZXR0aW5nc1tpXS52aXNpYmxlKSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gY29sdW1uRGF0YTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGdpdmVuIGNvbHVtbnMgc2V0dGluZ3MgXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge0FycmF5PFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbj59IGNvbHVtbkRhdGFcclxuXHQgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcblx0ICovXHJcblx0cHVibGljIHNldENvbHVtblNldHRpbmdzKGNvbHVtbkRhdGE6IEFycmF5PFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbj4pIHtcclxuXHRcdGxldCB0cmVlR3JpZE9iamVjdCA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTtcclxuXHRcdGlmKHRyZWVHcmlkT2JqZWN0ICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdGlmKGNvbHVtbkRhdGEgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0XHRsZXQgY29sdW1uU2V0dGluZ3M6IEFycmF5PGFueT4gPSB0cmVlR3JpZE9iamVjdC5vcHRpb24oXCJjb2x1bW5zXCIpO1xyXG5cdFx0XHRcdGlmKGNvbHVtblNldHRpbmdzICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgY29sdW1uRGF0YS5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdFx0XHRcdGxldCBjb2x1bW5TZXR0aW5nID0gY29sdW1uU2V0dGluZ3MuZmluZChjb2xTZXR0aW5nID0+IGNvbFNldHRpbmcuZmllbGQgPT0gY29sdW1uRGF0YVtpXS5pZCk7XHJcblx0XHRcdFx0XHRcdGlmKGNvbHVtblNldHRpbmcgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0XHRcdFx0XHRjb2x1bW5TZXR0aW5nLnZpc2libGUgPSBjb2x1bW5EYXRhW2ldLmlzVmlzaWJsZTtcclxuXHRcdFx0XHRcdFx0XHRjb2x1bW5TZXR0aW5nLndpZHRoID0gY29sdW1uRGF0YVtpXS53aWR0aDtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRlbHNle1xyXG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJjb2x1bW5TZXR0aW5ncyBub3QgYXZhaWxhYmxlIGZvciBpbmRleDogXCIgKyBpKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR0cmVlR3JpZE9iamVjdC5vcHRpb24oXCJjb2x1bW5zXCIsIGNvbHVtblNldHRpbmdzLCB0cnVlKTsgXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIEhpZGUgdGFibGVoZWFkZXIvZmlsdGVyIHJvdyBhZnRlciBzZXR0aW5nIG5ldyBjb2x1bW4gc2l6ZXMgaWYgbmVlZGVkXHJcblx0XHRcdGlmKHRoaXMuaGlkZVNvbWVUYWJsZUhlYWRlclBhcnRzKCkgPT0gdHJ1ZSl7XHJcblx0XHRcdFx0Ly8gQWZ0ZXIgc2V0dGluZyB0aGUgdHJlZWdyaWQgY29sdW1uIHNpemVzLCB0aGUgaGVhZGVyIHBhcnRzIHdpbGwgYmUgc2hvd24gPT4gaGlkZSBoZWFkZXIgcGFydHMgaWYgbm90IG5lZWRlZFxyXG5cdFx0XHRcdHRoaXMuaGlkZVRhYmxlSGVhZGVyKCk7IFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGdldFNjcm9sbEJhclNldHRpbmdzKCk6IElTY3JvbGxTZXR0aW5ncyB7XHJcblx0XHRsZXQgdHJlZUdyaWRPYmplY3QgPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcblx0XHRsZXQgc2V0dGluZ3M6IElTY3JvbGxTZXR0aW5ncyA9IHtcclxuXHRcdFx0XCJ2ZXJ0aWNhbFwiOiB0cmVlR3JpZE9iamVjdC5nZXRTY3JvbGxUb3BPZmZzZXQoKSxcclxuXHRcdFx0XCJob3Jpem9udGFsXCI6IHRyZWVHcmlkT2JqZWN0LmdldFNjcm9sbExlZnRPZmZzZXQoKVxyXG5cdFx0fTtcclxuXHJcblx0XHRyZXR1cm4gc2V0dGluZ3M7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgc2V0U2Nyb2xsQmFyU2V0dGluZ3MoZGF0YTogSVNjcm9sbFNldHRpbmdzIHwgdW5kZWZpbmVkKXtcclxuXHRcdGlmKGRhdGEgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0bGV0IHRyZWVHcmlkT2JqZWN0ID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG5cdFx0dHJlZUdyaWRPYmplY3Quc2Nyb2xsT2Zmc2V0KGRhdGEuaG9yaXpvbnRhbCwgZGF0YS52ZXJ0aWNhbCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbGFzdCB2aXNpYmxlIGNvbHVtblxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0geyp9IHRyZWVHcmlkTW9kZWxcclxuXHQgKiBAcmV0dXJuc1xyXG5cdCAqIEBtZW1iZXJvZiBUcmVlR3JpZFdpZGdldEJhc2VcclxuXHQgKi9cclxuXHRwcml2YXRlIGdldExhc3RWaXNpYmxlQ29sdW1uSW5kZXgodHJlZUdyaWRNb2RlbCl7XHJcblx0XHRmb3IobGV0IGkgPSB0cmVlR3JpZE1vZGVsLmNvbHVtbnMubGVuZ3RoLTE7IGkgPj0gMDsgaS0tKXtcclxuXHRcdFx0aWYodHJlZUdyaWRNb2RlbC5jb2x1bW5zW2ldLnZpc2libGUgPT0gdHJ1ZSl7XHJcblx0XHRcdFx0cmV0dXJuIGk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiAtMTtcclxuXHR9XHJcblxyXG4gICAgLyoqXHJcblx0ICogY3JlYXRlcyB0aGUgdHJlZSBncmlkXHJcblx0ICpcclxuXHQgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcblx0ICovXHJcbiAgICBjcmVhdGVMYXlvdXQoKSB7XHJcblx0XHRcclxuXHRcdHRoaXMuY3JlYXRlVGVtcGxhdGVzKCk7XHJcblxyXG5cdFx0dGhpcy5jcmVhdGVUcmVlR3JpZCgpO1xyXG5cdFxyXG5cdFx0aWYodGhpcy5oaWRlU29tZVRhYmxlSGVhZGVyUGFydHMoKSA9PSB0cnVlKXtcclxuXHRcdFx0Ly8gSGlkZSBzb21lIGhlYWRlciBwYXJ0cyBvZiB0cmVlZ3JpZFxyXG5cdFx0XHR0aGlzLmhpZGVUYWJsZUhlYWRlcigpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBlaiB0cmVlIGdyaWQgb2JqZWN0XHJcblx0ICpcclxuXHQgKiBAcmV0dXJucyB7ZWouVHJlZUdyaWR9XHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdHByb3RlY3RlZCBnZXRUcmVlR3JpZE9iamVjdCgpOiBlai5UcmVlR3JpZHtcclxuXHRcdHJldHVybiAkKHRoaXMubWFpbkRpdikuZGF0YShcImVqVHJlZUdyaWRcIik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBjbGVhcnMgdGhlIGRyYWdnZWQgcmVjb3JkcyBsaXN0KG5lZWRlZCBhZnRlciBkcmFnICYgZHJvcCB3YXMgY2FuY2VsZWQpXHJcblx0ICpcclxuXHQgKiBAcHJvdGVjdGVkXHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdHByb3RlY3RlZCBjbGVhckRyYWdnZWRSZWNvcmRzKCl7XHJcblx0XHRsZXQgdHJlZUdyaWRPYmplY3QgPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcblx0XHRpZih0cmVlR3JpZE9iamVjdCAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHQoPGFueT50cmVlR3JpZE9iamVjdCkuX2RyYWdnZWRSZWNvcmRzID0gW107XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSB0cmVlIHJlY29yZCBmb3IgdGhlIGdpdmVuIGVsZW1lbnRcclxuXHQgKlxyXG5cdCAqIEBwcm90ZWN0ZWRcclxuXHQgKiBAcGFyYW0geyp9IGVsZW1lbnRcclxuXHQgKiBAcmV0dXJucyB7YW55fVxyXG5cdCAqIEBtZW1iZXJvZiBUcmVlR3JpZFdpZGdldEJhc2VcclxuXHQgKi9cclxuXHRwcm90ZWN0ZWQgZ2V0VHJlZVJlY29yZChlbGVtZW50KTogYW55e1xyXG4gICAgICAgIGxldCB0cmVlZ3JpZE9iaiA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTtcclxuICAgICAgICBsZXQgdHIgPSBlbGVtZW50LmNsb3Nlc3QoXCJ0clwiKTsgIFxyXG4gICAgICAgIGlmKHRyICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdGxldCBpbmRleCA9IHRyLnJvd0luZGV4O1xyXG5cdFx0XHRpZigoPGFueT50cmVlZ3JpZE9iai5tb2RlbCkuY3VycmVudFZpZXdEYXRhICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdFx0cmV0dXJuICg8YW55PnRyZWVncmlkT2JqLm1vZGVsKS5jdXJyZW50Vmlld0RhdGFbaW5kZXhdO1xyXG5cdFx0XHR9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldCB0aGUgZm9jdXMgdG8gdGhlIGN1cnJlbnQgdHJlZSBncmlkXHJcblx0ICpcclxuXHQgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcblx0ICovXHJcblx0Zm9jdXMoKXtcclxuXHRcdC8vIFRPRE86IE5vIHB1YmxpYyBmb2N1cyBtZXRob2QgYXZhaWxhYmxlIGZvciB0cmVlIGdyaWQsIGJ1dCBuZWVkZWQgZm9yIGZvcmNpbmcgdGhlIGZvY3VzIHRvIHRoZSB0cmVlIGdyaWQgaWYgZHJhZ2dhYmxlIGlzIHVzZWQgaW4gYSB0cmVlIGdyaWRcclxuXHRcdC8vIChpbiBjYXNlIG9mIGRyYWdnYWJsZSB0cmVlIGdyaWQgd2lsbCBub3QgYmUgZm9jdXNlZCBiZWNhdXNlIG5vdCB0aGUgdHJlZWdyaWQgcm93IHdpbGwgYmUgc2VsZWN0ZWQgb24gYSBjbGljaywgYnV0IHRoZSBkaXJlY3RseSBkaXYgd2lsbCBieSBzZWxlY3RlZCA9PiBzdmcgb3Igb3RoZXIgZGl2KVxyXG5cdFx0KDxhbnk+dGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpKS5fZm9jdXNUcmVlR3JpZEVsZW1lbnQoKTtcclxuXHR9XHJcblx0XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluaXRpYWxpemVzIGxvY2FsZSByZXNvdXJjZXNcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaW5pdGlhbGl6ZUxvY2FsZXMoKSB7XHJcblx0XHQvLyBnZXQgdGhlIGxvY2FsZXMgZm9yIHRoZSB0cmVlZ3JpZFxyXG5cdFx0bGV0IGxvYyA9IGVqLlRyZWVHcmlkLkxvY2FsZTtcclxuXHJcblx0XHQvLyBzaG93IGFuIGVtcHR5IHN0cmluZyBpZiBubyByZWNvcmRzIGFyZSBhdmFpbGFibGVcclxuXHRcdGxvYy5kZWZhdWx0LmVtcHR5UmVjb3JkID0gXCJcIjtcclxuXHR9XHJcblx0XHJcblx0cHJpdmF0ZSBmaWxsU3BhY2VXaXRoRHluYW1pY0NvbHVtbih0cmVlZ3JpZFdpZHRoOiBudW1iZXIpe1xyXG5cdFx0aWYodGhpcy5fY29sdW1uSW5kZXhGb3JEeW5hbWljU2l6ZSA9PSAtMSl7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHRoaXMuZmlsbFNwYWNlV2l0aENvbHVtbih0aGlzLl9jb2x1bW5JbmRleEZvckR5bmFtaWNTaXplLCB0cmVlZ3JpZFdpZHRoKVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBmaWxsU3BhY2VXaXRoQ29sdW1uKGZpbGxTcGFjZUNvbHVtbkluZGV4OiBudW1iZXIsIHRyZWVncmlkV2lkdGg6IG51bWJlcil7XHJcblx0XHR2YXIgdHJlZU9iaiA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTtcclxuXHRcdGlmKCF0cmVlT2JqKXtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBjb2x1bW5zID0gdHJlZU9iai5vcHRpb24oXCJjb2x1bW5zXCIpOyBcclxuXHRcdGlmKCFjb2x1bW5zKXtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBuZXdDb2x1bW5XaWR0aCA9IHRoaXMuZ2V0TmV3Q29sdW1uV2lkdGgodHJlZWdyaWRXaWR0aCwgY29sdW1ucywgZmlsbFNwYWNlQ29sdW1uSW5kZXgpO1xyXG4gICAgICAgIGlmKG5ld0NvbHVtbldpZHRoID4gdGhpcy5fbWluQ29sdW1uV2lkdGhGb3JEeW5hbWljQ29sdW1uKXtcclxuICAgICAgICAgICAgY29sdW1uc1tmaWxsU3BhY2VDb2x1bW5JbmRleF0ud2lkdGggPSBuZXdDb2x1bW5XaWR0aC0zOyAvLy0zIHRvIGF2b2lkIHNjcm9sbGJhclxyXG5cdFx0XHRjb2x1bW5zW2ZpbGxTcGFjZUNvbHVtbkluZGV4XS53aWR0aCAtPSB0aGlzLmdldFNjcm9sbEJhcldpZHRoKCk7ICAgLy8gcmVtb3ZlIHNjcm9sbGJhciBzaXplXHJcblx0XHRcdHRyZWVPYmoub3B0aW9uKFwiY29sdW1uc1wiLCBjb2x1bW5zLCB0cnVlKTsgXHJcblx0XHRcdFxyXG5cdFx0XHRpZih0aGlzLmhpZGVTb21lVGFibGVIZWFkZXJQYXJ0cygpID09IHRydWUpe1xyXG5cdFx0XHRcdC8vIEFmdGVyIHNldHRpbmcgdGhlIHRyZWVncmlkIGNvNmx1bW4gc2l6ZXMsIHRoZSBoZWFkZXIgcGFydHMgd2lsbCBiZSBzaG93biA9PiBoaWRlIGhlYWRlciBwYXJ0cyBpZiBub3QgbmVlZGVkXHJcblx0XHRcdFx0dGhpcy5oaWRlVGFibGVIZWFkZXIoKTsgXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXRDb2x1bW5XaWR0aChpbmRleDogbnVtYmVyLCB3aWR0aDogbnVtYmVyKXtcclxuXHRcdHZhciB0cmVlT2JqID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG5cdFx0aWYoIXRyZWVPYmope1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGNvbHVtbnMgPSB0cmVlT2JqLm9wdGlvbihcImNvbHVtbnNcIik7IFxyXG5cdFx0aWYoIWNvbHVtbnMpe1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGNvbHVtbnNbaW5kZXhdLndpZHRoID0gd2lkdGg7XHJcblx0XHR0cmVlT2JqLm9wdGlvbihcImNvbHVtbnNcIiwgY29sdW1ucywgdHJ1ZSk7IFxyXG5cclxuXHRcdHRoaXMuZmlsbFNwYWNlV2l0aENvbHVtbih0aGlzLl9jb2x1bW5JbmRleEZvckR5bmFtaWNTaXplLCB0aGlzLl9hY3R1YWxXaWR0aCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRydWUgaWYgc29tZSBwYXJ0cyBvZiB0aGUgdGFibGUgaGVhZGVyIHNob3VsZCBiZSBoaWRkZW4oZS5nLiBjb2x1bW4gaGVhZGVyLCBmaWx0ZXJiYXIsIC4uLilcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHJldHVybnMge2Jvb2xlYW59XHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaGlkZVNvbWVUYWJsZUhlYWRlclBhcnRzKCk6IGJvb2xlYW57XHJcblx0XHRpZih0aGlzLl9oaWRlQ29sdW1uSGVhZGVyID09IHRydWUpe1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdGlmKHRoaXMuX2hpZGVIZWFkZXJGaWx0ZXJCYXIgPT0gdHJ1ZSl7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBnZXRTY3JvbGxCYXJXaWR0aCgpOiBudW1iZXJ7XHJcblx0XHR2YXIgdmlld0RpdiA9ICQodGhpcy5tYWluRGl2KS5maW5kKCcuZS1ncmlkY29udGVudCcpO1xyXG5cdFx0Zm9yKGxldCBjaGlsZEluZGV4PTA7IGNoaWxkSW5kZXggPCB2aWV3RGl2WzBdLmNoaWxkcmVuLmxlbmd0aDsgY2hpbGRJbmRleCsrKXtcclxuXHRcdFx0bGV0IGNoaWxkID0gdmlld0RpdlswXS5jaGlsZHJlbltjaGlsZEluZGV4XTtcclxuXHRcdFx0aWYoY2hpbGQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZS12c2Nyb2xsYmFyXCIpID09IHRydWUpe1xyXG5cdFx0XHRcdHJldHVybiBjaGlsZC5jbGllbnRXaWR0aDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIDA7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGdldE5ld0NvbHVtbldpZHRoKHRyZWVncmlkV2lkdGgsIGNvbHVtbnMsIGZpbGxTcGFjZUNvbHVtbkluZGV4KTogbnVtYmVye1xyXG5cdFx0bGV0IG5ld0NvbHVtbldpZHRoID0gdHJlZWdyaWRXaWR0aDtcclxuXHRcdGZvcihsZXQgY29sdW1uSW5kZXg9MDsgY29sdW1uSW5kZXggPCBjb2x1bW5zLmxlbmd0aDsgY29sdW1uSW5kZXgrKyl7XHJcbiAgICAgICAgICAgIGlmKGNvbHVtbkluZGV4ICE9IGZpbGxTcGFjZUNvbHVtbkluZGV4KXtcclxuXHRcdFx0XHRpZihjb2x1bW5zW2NvbHVtbkluZGV4XSAhPSB1bmRlZmluZWQgJiYgY29sdW1uc1tjb2x1bW5JbmRleF0udmlzaWJsZSA9PSB0cnVlKXtcclxuXHRcdFx0XHRcdG5ld0NvbHVtbldpZHRoIC09IGNvbHVtbnNbY29sdW1uSW5kZXhdLndpZHRoO1xyXG5cdFx0XHRcdH1cclxuICAgICAgICAgICAgfVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG5ld0NvbHVtbldpZHRoO1xyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKiBIaWRlcyB0aGUgdGFibGUgaGVhZGVyIHBhcnRzIHdoaWNoIGFyZSBjdXJyZW50bHkgZGVmaW5lZCB0byBiZSBoaWRkZW4oZS5nLiBfaGlkZUNvbHVtbkhlYWRlciwgX2hpZGVIZWFkZXJGaWx0ZXJCYXIsIC4uLilcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaGlkZVRhYmxlSGVhZGVyKCl7XHJcblx0XHRsZXQgJHRyZWVHcmlkSGVhZGVyID0gJCh0aGlzLm1haW5EaXYpLmZpbmQoXCIuZS1ncmlkaGVhZGVyXCIpXHJcblx0XHRsZXQgdGFibGVIZWFkZXIgPSAkdHJlZUdyaWRIZWFkZXJbMF0uY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF07XHJcblx0XHRpZih0YWJsZUhlYWRlciAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRsZXQgY29sdW1uSGVhZGVyID0gKDxhbnk+dGFibGVIZWFkZXIpLnJvd3NbMF07XHJcblx0XHRcdGxldCBmaWx0ZXJCYXIgPSAoPGFueT50YWJsZUhlYWRlcikucm93c1sxXTtcclxuXHRcdFx0aWYoY29sdW1uSGVhZGVyICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdFx0aWYodGhpcy5faGlkZUNvbHVtbkhlYWRlciA9PSB0cnVlKXtcclxuXHRcdFx0XHRcdC8vIGhpZGUgY29sdW1uIGhlYWRlclxyXG5cdFx0XHRcdFx0Y29sdW1uSGVhZGVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0aWYoZmlsdGVyQmFyICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdFx0aWYodGhpcy5faGlkZUhlYWRlckZpbHRlckJhciA9PSB0cnVlKXtcclxuXHRcdFx0XHRcdC8vIGhpZGUgZmlsdGVyYmFyXHJcblx0XHRcdFx0XHRmaWx0ZXJCYXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2FsbGVkIHdoZW4gYSBidXR0b24gaW4gdGhlIHRvb2xiYXIgaXMgY2xpY2tlZFxyXG5cdCAqXHJcblx0ICogQHByb3RlY3RlZFxyXG5cdCAqIEBwYXJhbSB7Kn0gYXJnc1xyXG5cdCAqIEBtZW1iZXJvZiBUcmVlR3JpZFdpZGdldEJhc2VcclxuXHQgKi9cclxuXHRwcm90ZWN0ZWQgdG9vbGJhckNsaWNrKGFyZ3MpIHtcclxuXHRcdGxldCB0cmVlR3JpZE9iaiA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTtcclxuXHRcdC8vQ2FuY2VsIGVkaXQgY2VsbCB3aGVuIHRvb2xiYXIgYnV0dG9uIGlzIGNsaWNrZWRcclxuXHRcdGlmICh0cmVlR3JpZE9iaiAhPSB1bmRlZmluZWQgJiYgdHJlZUdyaWRPYmoubW9kZWwuaXNFZGl0ID09IHRydWUpIHtcclxuXHRcdFx0dHJlZUdyaWRPYmouY2FuY2VsRWRpdENlbGwoKTsgXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuX3Rvb2xiYXIuaXNFeHBhbmRDb2xsYXBzZVNlbGVjdGVkKGFyZ3MpID09IHRydWUpIHtcclxuXHRcdFx0Ly8gRGlzYWJsZXMgcmVmcmVzaCBjYXVzZWQgYnkgc3luY2Z1c2lvbiBjYWxsc1xyXG5cdFx0XHR0aGlzLmVuYWJsZVRyZWVHcmlkUmVmcmVzaChmYWxzZSk7XHJcblx0XHRcdHRoaXMuX3Rvb2xiYXIhLnRvb2xiYXJDbGljayhhcmdzLCB0aGlzKTtcclxuXHRcdFx0dGhpcy5lbmFibGVUcmVlR3JpZFJlZnJlc2godHJ1ZSk7XHJcblx0XHRcdFxyXG5cdFx0XHR0aGlzLnJlZnJlc2goKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLl90b29sYmFyLnRvb2xiYXJDbGljayhhcmdzLCB0aGlzKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNhdmUgdHJlZSBncmlkIHNldHRpbmdzXHJcblx0ICpcclxuXHQgKiBAcHJvdGVjdGVkXHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdHByb3RlY3RlZCBzYXZlVHJlZUdyaWRTZXR0aW5ncygpIHtcclxuXHRcdGlmICh0aGlzLmNvbXBvbmVudC5nZXRQZXJzaXN0ZW5jeSgpKSB7XHJcblx0XHRcdHRoaXMudXBkYXRlc2Nyb2xsYmFyc09ic2VydmF0aW9uKCk7XHJcblx0XHRcdHRoaXMuc2F2ZVNldHRpbmdzKCk7XHJcblx0XHR9XHJcbiAgICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFVwZGF0ZXMgc2Nyb2xsYmFyIG9ic2VydmF0aW9uIGZvciBib3RoIHNjcm9sbGJhcnNcclxuXHQgKlxyXG4gXHQgKiBAcHJvdGVjdGVkXHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgdXBkYXRlc2Nyb2xsYmFyc09ic2VydmF0aW9uKCl7XHJcblx0XHR2YXIgdmVydGljYWxTY3JvbGxiYXIgPSB0aGlzLmdldFZlcnRpY2FsU2Nyb2xsYmFyKCk7XHJcblx0XHR2YXIgaG9yaXpvbnRhbFNjcm9sbGJhciA9IHRoaXMuZ2V0SG9yaXpvbnRhbFNjcm9sbGJhcigpO1xyXG5cclxuXHRcdHRoaXMudXBkYXRlU2Nyb2xsYmFyT2JzZXJ2YXRpb24odmVydGljYWxTY3JvbGxiYXIsIHRoaXMuX3ZlcnRpY2FsU2Nyb2xsYmFyT2JzZXJ2ZXIpO1xyXG5cdFx0dGhpcy51cGRhdGVTY3JvbGxiYXJPYnNlcnZhdGlvbihob3Jpem9udGFsU2Nyb2xsYmFyLCB0aGlzLl9ob3Jpem9udGFsU2Nyb2xsYmFyT2JzZXJ2ZXIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogT2JzZXJ2ZSBzY3JvbGxiYXIsIHVub2JzZXJ2ZSBzY3JvbGxiYXIgb3IgZG9uJ3QgZG8gYW55dGhpbmcuXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7KEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkKX0gZWxlbWVudFxyXG5cdCAqIEBwYXJhbSB7KE11dGF0aW9uT2JzZXJ2ZXIgfCB1bmRlZmluZWQpfSBvYnNlcnZlclxyXG5cdCAqIEBtZW1iZXJvZiBUcmVlR3JpZFdpZGdldEJhc2VcclxuXHQgKi9cclxuXHRwcml2YXRlIHVwZGF0ZVNjcm9sbGJhck9ic2VydmF0aW9uKGVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkLCBvYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlciB8IHVuZGVmaW5lZCkge1xyXG5cdFx0aWYgKGVsZW1lbnQgIT09IHVuZGVmaW5lZCAmJiBvYnNlcnZlciA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHRoaXMub2JzZXJ2ZVNjcm9sbGJhcihlbGVtZW50LCBvYnNlcnZlcik7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmIChlbGVtZW50ID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0dGhpcy51bm9ic2VydmVTY3JvbGxiYXIob2JzZXJ2ZXIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0IGVsZW1lbnQgb2YgdmVydGljYWwgc2Nyb2xsYmFyXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEByZXR1cm5zIHsoSFRNTEVsZW1lbnQgfCB1bmRlZmluZWQpfVxyXG5cdCAqIEBtZW1iZXJvZiBUcmVlR3JpZFdpZGdldEJhc2VcclxuXHQgKi9cclxuXHRwcml2YXRlIGdldFZlcnRpY2FsU2Nyb2xsYmFyKCk6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkIHtcclxuXHRcdHZhciBzY3JvbGxiYXJFbGVtZW50ID0gJCh0aGlzLm1haW5EaXYpLmZpbmQoJy5lLXZzY3JvbGxiYXInKTtcclxuXHRcdGlmIChzY3JvbGxiYXJFbGVtZW50Lmxlbmd0aCA+IDApIHtcclxuXHRcdFx0cmV0dXJuIHNjcm9sbGJhckVsZW1lbnQuZmluZCgnLmUtdmhhbmRsZScpWzBdO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldCBlbGVtZW50IG9mIGhvcml6b250YWwgc2Nyb2xsYmFyXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEByZXR1cm5zIHsoSFRNTEVsZW1lbnQgfCB1bmRlZmluZWQpfVxyXG5cdCAqIEBtZW1iZXJvZiBUcmVlR3JpZFdpZGdldEJhc2VcclxuXHQgKi9cclxuXHRwcml2YXRlIGdldEhvcml6b250YWxTY3JvbGxiYXIoKTogSFRNTEVsZW1lbnQgfCB1bmRlZmluZWQge1xyXG5cdFx0dmFyIHNjcm9sbGJhckVsZW1lbnQgPSAkKHRoaXMubWFpbkRpdikuZmluZCgnLmUtaHNjcm9sbGJhcicpO1xyXG5cdFx0aWYgKHNjcm9sbGJhckVsZW1lbnQubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRyZXR1cm4gc2Nyb2xsYmFyRWxlbWVudC5maW5kKCcuZS1oaGFuZGxlJylbMF07XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogT2JzZXJ2ZSBzY3JvbGxiYXIgZm9yIGNoYW5nZXNcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdGFyZ2V0XHJcblx0ICogQHBhcmFtIHsoTXV0YXRpb25PYnNlcnZlciB8IHVuZGVmaW5lZCl9IG9ic2VydmVyXHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgb2JzZXJ2ZVNjcm9sbGJhcih0YXJnZXQ6IEhUTUxFbGVtZW50LCBvYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlciB8IHVuZGVmaW5lZCApIHtcclxuXHRcdHZhciB3aWRnZXQgPSB0aGlzO1xyXG5cdFx0b2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbihtdXRhdGlvbnMpIHtcclxuICAgICAgICAgICAgbXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24obXV0YXRpb25SZWNvcmQpIHtcclxuXHRcdFx0XHRsZXQgc2Nyb2xsU2V0dGluZ3M6IElTY3JvbGxTZXR0aW5ncyA9IHdpZGdldC5nZXRDb21wb25lbnRTZXR0aW5ncyh0cnVlKS5kYXRhLnNjcm9sbGJhcnM7XHJcblx0XHRcdFx0aWYgKHNjcm9sbFNldHRpbmdzLmhvcml6b250YWwgIT0gd2lkZ2V0Ll9wcmV2aW91c1Njcm9sbFNldHRpbmdzLmhvcml6b250YWwgfHwgc2Nyb2xsU2V0dGluZ3MudmVydGljYWwgIT0gd2lkZ2V0Ll9wcmV2aW91c1Njcm9sbFNldHRpbmdzLnZlcnRpY2FsKSB7XHJcblx0XHRcdFx0XHR3aWRnZXQuX3ByZXZpb3VzU2Nyb2xsU2V0dGluZ3MgPSBzY3JvbGxTZXR0aW5ncztcclxuXHRcdFx0XHRcdHdpZGdldC5zYXZlU2V0dGluZ3MoKTtcclxuXHRcdFx0XHR9XHJcbiAgICAgICAgICAgIH0pOyAgICBcclxuXHRcdH0pO1xyXG5cdFxyXG5cdFx0b2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXQsIHsgYXR0cmlidXRlcyA6IHRydWV9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFVub2JzZXJ2ZSBzY3JvbGxiYXJcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHsoTXV0YXRpb25PYnNlcnZlciB8IHVuZGVmaW5lZCl9IG9ic2VydmVyXHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgdW5vYnNlcnZlU2Nyb2xsYmFyKG9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyIHwgdW5kZWZpbmVkKSB7XHJcblx0XHRpZiAob2JzZXJ2ZXIgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRvYnNlcnZlci5kaXNjb25uZWN0KCk7XHJcblx0XHRcdG9ic2VydmVyID0gdW5kZWZpbmVkO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyBmbGFncyB0aGF0IGVuYWJsZXMvZGlzYWJsZXMgcmVmcmVzaCBvZiB0cmVlZ3JpZFxyXG5cdCAqXHJcblx0ICogQHByb3RlY3RlZFxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsdWVcclxuXHQgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcblx0ICovXHJcblx0cHVibGljIGVuYWJsZVRyZWVHcmlkUmVmcmVzaCh2YWx1ZTogYm9vbGVhbikge1xyXG5cdFx0dGhpcy5yZWZyZXNoRW5hYmxlZCA9IHZhbHVlO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHJlZnJlc2goKSB7fTtcclxuXHRcclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSB0ZW1wbGF0ZXMoZS5nLiBjb2x1bW4sIHJvdywgLi4uKSBmb3IgdGhlIHRyZWUgZ3JpZCBhbmQgYWRkcyB0aGVtIHRvIHRoZSB3aWRnZXQgY29udGFpbmVyXHJcblx0ICpcclxuXHQgKiBAcHJvdGVjdGVkXHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdHByb3RlY3RlZCBjcmVhdGVUZW1wbGF0ZXMoKXtcclxuXHJcblx0fVxyXG5cdFxyXG5cdHByb3RlY3RlZCBhYnN0cmFjdCBjcmVhdGVUcmVlR3JpZCgpO1xyXG59XHJcblxyXG5leHBvcnQge1RyZWVHcmlkV2lkZ2V0QmFzZX07Il19