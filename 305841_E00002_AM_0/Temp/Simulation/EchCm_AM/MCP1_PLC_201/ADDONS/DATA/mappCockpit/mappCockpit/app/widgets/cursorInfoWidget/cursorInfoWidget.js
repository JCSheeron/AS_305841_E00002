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
define(["require", "exports", "./interfaces/cursorInfoWidgetInterface", "../common/treeGridWidgetBase", "./view/cursorInfoTreeGridToolbar", "./model/ytCursorSignal", "./model/xyCursorSignal", "./model/fftCursorSignal", "./model/cursorInfo", "../common/states/cursorStates", "./model/dynamicCursorSignalTemplate", "./model/cursorSignal", "../../common/seriesHelper", "../../common/utilities/binSearch", "../common/states/chartViewToolbarStates", "../../models/common/series/seriesType", "./componentDefaultDefinition", "../../models/chartManagerDataModel/chartManagerDataModel", "../common/states/cursorType"], function (require, exports, cursorInfoWidgetInterface_1, treeGridWidgetBase_1, cursorInfoTreeGridToolbar_1, ytCursorSignal_1, xyCursorSignal_1, fftCursorSignal_1, cursorInfo_1, cursorStates_1, dynamicCursorSignalTemplate_1, cursorSignal_1, seriesHelper_1, binSearch_1, chartViewToolbarStates_1, seriesType_1, componentDefaultDefinition_1, chartManagerDataModel_1, cursorType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // defines the base id for the cursor value template
    var CURSOR_VALUE_ID = "cursorValue_";
    /**
     * implements the CursorInfo Widget
     *
     * @class CursorInfoWidget
     * @extends {TreeGridWidgetBase}
     */
    var CursorInfoWidget = /** @class */ (function (_super) {
        __extends(CursorInfoWidget, _super);
        function CursorInfoWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._cursorInfoTemplateDataModel = new Array();
            _this._cursorSignalsDataModelChangedHandler = function (sender, args) { return _this.onCursorSignalsDataModelChanged(sender, args); };
            _this._chartManagerModelChangedHandler = function (sender, data) { return _this.onChartManagerModelChanged(sender, data); };
            _this._selectedCursorSignals = new Array();
            _this._cursorInfoSelectorIsActive = false;
            _this._columnId_Visible = "visible";
            _this._columnId_Name = "name";
            _this._columnId_Value = "value";
            _this._columnId_Description = "description";
            _this._columnId_IconDefinition = "iconDefinition";
            _this._indeterminateStateValue = "indeterminate";
            // holds the current cursor states values. We initialize the member for default. The effective initialization takes place when the external shared instance
            // of the cursor states is created and reflected through the curorStates setter!
            _this._cursorStates = new cursorStates_1.CursorStates();
            return _this;
        }
        /**
         * Initialize the widget
         *
         *  @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.initialize = function () {
            _super.prototype.setHeaderFilterBarHidden.call(this); // Must be set before initialization to avoid showing the filterbar
            _super.prototype.initialize.call(this);
        };
        /**
         * Defines the height of the header
         *
         * @returns {number}
         * @memberof OverviewTreeGridWidgetBase
         */
        CursorInfoWidget.prototype.defineHeaderHeight = function () {
            return 30;
        };
        CursorInfoWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            // Get cursor signals datamodel
            this._cursorSignalsDataModel = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.CursorSignalsDataModelId);
            // Attach cursor signals datamodel event
            if (this._cursorSignalsDataModel != undefined) {
                this._cursorSignalsDataModel.eventModelChanged.attach(this._cursorSignalsDataModelChangedHandler);
            }
            // Get cursor signals datamodel
            this._chartManagerDataModel = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.ChartManagerDataModelId);
            this.attachChartManagerDataModelEvents();
            // Refresh treeGrid to see the loaded persisting data
            this.refresh();
            // Initialize scrollbars positions
            var scrollbarSettings = this.component.getSetting(treeGridWidgetBase_1.TreeGridWidgetBase.ScrollbarsSettingsId);
            this.setScrollBarSettings(scrollbarSettings);
            _super.prototype.setHeaderContent.call(this, "Cursors");
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 1, 80);
        };
        CursorInfoWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
        };
        Object.defineProperty(CursorInfoWidget.prototype, "cursorsStates", {
            /**
             * Gets the cursors states
             *
             * @protected
             * @type {CursorStates}
             * @memberof ChartViewToolbar
             */
            get: function () {
                return this._cursorStates;
            },
            /**
             * Sets the cursors states. The method is called automatically whenever a cursor state has been changed externally.
             *
             * @protected
             * @memberof ChartViewToolbar
             */
            set: function (cursorStates) {
                // update the backup field
                this._cursorStates = cursorStates;
                this.updateInfoCursorsWithNewStateValues(cursorStates);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Updates the cursor states.
         *
         * @protected
         * @param {CursorStates} cursorStates
         * @memberof ChartBase
         */
        CursorInfoWidget.prototype.updateCursorStates = function (cursorStates) {
            // BINDINGSOURCE: dispatches the method call to bound targets
        };
        CursorInfoWidget.prototype.dispose = function () {
            this.detachChartManagerDataModelEvents();
            if (this._cursorSignalsDataModel != undefined) {
                // Detach cursor signals datamodel events
                this._cursorSignalsDataModel.eventModelChanged.detach(this._cursorSignalsDataModelChangedHandler);
                // Dispose cursor signals datamodel
                this._cursorSignalsDataModel.dispose();
            }
            _super.prototype.dispose.call(this);
        };
        CursorInfoWidget.prototype.getComponentSettings = function (onlyModified) {
            return _super.prototype.getComponentSettings.call(this, onlyModified);
        };
        CursorInfoWidget.prototype.setComponentSettings = function (data) {
            if (data != undefined) {
                _super.prototype.setComponentSettings.call(this, data);
            }
        };
        /**
         * Creates the column templates for the tree grid and adds them to the widget container
         *
         * @protected
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.createTemplates = function () {
            var $widgetContainer = $(this.mainDiv);
            $widgetContainer.append(this.getColumnTemplateData(this._columnId_Visible));
            $widgetContainer.append(this.getColumnTemplateData(this._columnId_Name));
        };
        /**
         * Returns the column template informations
         *
         * @private
         * @returns {string}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.getColumnTemplateData = function (columnId) {
            if (columnId == this._columnId_Visible) {
                return "<script type=\"text/x-jsrender\" id=\"ciVisibleColumnTemplate\">\n                        <div style=\"margin-left:10px;\">{{if visible == \"true\" && !hasChildRecords}} <input class=\"customCheckbox\" type=\"checkbox\" checked=\"checked\" value=\"\" />{{else !hasChildRecords}} <input class=\"customCheckbox\" type=\"checkbox\" value=\"\" />{{/if}}</div>\n                        </script>";
            }
            else if (columnId == this._columnId_Name) {
                return "<script type=\"text/x-jsrender\" id=\"ciNameColumnTemplate\">\n                        <div style='height:20px;' unselectable='on'>\n                            {{if hasChildRecords}}\n                                <div class='intend' style='height:1px; float:left; width:{{:level*6}}px; display:inline-block;'></div>\n                            {{else !hasChildRecords}}\n                                <div class='intend' style='height:1px; float:left; width:{{:level*6}}px; display:inline-block;'></div>\n                            {{/if}}\n                            {{:#data['iconDefinition']}}\n                            <div class='e-cell' style='display:inline-block;width:100%' unselectable='on'>{{:#data['name']}}</div>\n                        </div>\n                    </script>";
            }
            return "";
        };
        /**
         * Creates the tree grid for the CursorInfos
         *
         * @protected
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.createTreeGrid = function () {
            var _this = this;
            $(this.mainDiv).ejTreeGrid(__assign(__assign(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridColumnResizeSupport()), this.getTreeGridCellEditSupport()), this.getTreeGridToolbarSupport()), { childMapping: "filteredCursorInfos", expandStateMapping: "expandState", isResponsive: true, treeColumnIndex: 1, rowHeight: 28, 
                // Set init size to draw the toolbar icons at the right position
                sizeSettings: { height: '100px', width: '100px' }, selectionType: ej.TreeGrid.SelectionType.Multiple, expanded: function (args) { return _this.treeGridNodeExpandedOrCollapsed(); }, collapsed: function (args) { return _this.treeGridNodeExpandedOrCollapsed(); }, rowSelected: function (args) { return _this.treeGridRowSelected(args); }, create: function (args) { return _this.treeGridCreated(); }, actionBegin: function (args) { return _this.treeGridActionBegin(args); }, queryCellInfo: function (args) { return _this.queryCellInfo(args); } }));
        };
        CursorInfoWidget.prototype.treeGridNodeExpandedOrCollapsed = function () {
            // Refresh to see correct expanded/collapsed icon
            this.refresh();
            // Persist expandState in dataModel
            if (this._cursorSignalsDataModel !== undefined) {
                this._cursorSignalsDataModel.saveSettings();
            }
            // Persist scrollbar state in cursorInfoWidget
            this.saveTreeGridSettings();
        };
        CursorInfoWidget.prototype.queryCellInfo = function (args) {
            if (args.column.field == this._columnId_Visible) {
                if (args.cellValue == this._indeterminateStateValue) {
                    // Set indeterminate icons
                    $(args.cellElement.childNodes[1].childNodes[1]).prop(this._indeterminateStateValue, true);
                }
            }
        };
        /**
         * TreeGrid selected row has changed
         *
         * @private
         * @param {*} args
         * @returns
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.treeGridRowSelected = function (args) {
            if (args.model.selectedItems == undefined) {
                return;
            }
            if (this._cursorInfoSelectorIsActive == true) {
                // Saves the selected items for multiselection support in cursor info selector
                this._selectedCursorInfosOld = this._selectedCursorInfosNew;
                this._selectedCursorInfosNew = args.model.selectedItems;
            }
            else {
                this._selectedCursorSignals = this.getOnlyCursorSignals(args.model.selectedItems);
                this.updateCursorInfoSelectorButtonState();
            }
        };
        /**
         * get all CursorSignals for the current selection(if CursorInfo is selected, get the parent CursorSignal)
         *
         * @private
         * @param {*} selectedItems
         * @returns {Array<CursorSignal>}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.getOnlyCursorSignals = function (selectedItems) {
            var newList = new Array();
            for (var i = 0; i < selectedItems.length; i++) {
                if (selectedItems[i].item instanceof cursorSignal_1.CursorSignal) {
                    var index = newList.indexOf(selectedItems[i].item);
                    if (index == -1) { // Only add if not already in list
                        newList.push(selectedItems[i].item);
                    }
                }
                else if (selectedItems[i].item instanceof cursorInfo_1.CursorInfo) {
                    var index = newList.indexOf(selectedItems[i].parentItem.item);
                    if (index == -1) { // Only add if not already in list
                        newList.push(selectedItems[i].parentItem.item);
                    }
                }
            }
            return newList;
        };
        /**
         * Sets the cursor info selector button state (if one (or more) signal is selected the button is enabled)
         *
         * @private
         * @returns
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.updateCursorInfoSelectorButtonState = function () {
            var toolbar = this._toolbar;
            if (this._selectedCursorSignals == undefined) {
                // no items selected deactivate Filter button
                toolbar.disableCursorInfoSelectorButton(true);
                return;
            }
            if (this._selectedCursorSignals.length < 1) {
                // no items selected deactivate Filter button
                toolbar.disableCursorInfoSelectorButton(true);
            }
            else {
                toolbar.disableCursorInfoSelectorButton(false);
            }
        };
        /**
         * Returns the tree grid column definition
         *
         * @private
         * @returns {{}}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.getTreeGridColumnDefinition = function () {
            // add check box state information
            var checkBoxStates = [
                { text: "Yes", value: "true" },
                { text: "No", value: "false" }
            ];
            // return the column definitions
            return {
                columns: [
                    { field: this._columnId_Visible, headerText: "Visible", visible: false, allowEditing: false, isTemplateColumn: true, templateID: "ciVisibleColumnTemplate", filterEditType: "dropdownedit", dropdownData: checkBoxStates, allowFilteringBlankContent: false, width: "55px" },
                    { field: this._columnId_Name, headerText: "Name", allowEditing: false, isTemplateColumn: true, templateID: "ciNameColumnTemplate" },
                    { field: this._columnId_Value, headerText: "Value", allowEditing: false, width: "140px", isTemplateColumn: true, template: "<div style='padding-left: 20px' id='" + this.mainDivId + CURSOR_VALUE_ID + "{{:uiId}}'></div>" },
                    { field: this._columnId_Description, headerText: "Description", visible: false, allowEditing: false, width: "140px" },
                    { field: this._columnId_IconDefinition, visible: false, width: "0px" },
                ],
            };
        };
        /**
         * Returns the tree grid column resize settings
         *
         * @private
         * @returns {{}}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.getTreeGridColumnResizeSupport = function () {
            var _this = this;
            return {
                allowColumnResize: true,
                columnResizeSettings: { columnResizeMode: ej.TreeGrid.ColumnResizeMode.FixedColumns },
                columnResized: function (args) { return _this.treeGridColumnResized(args); },
            };
        };
        /**
         * Returns the tree grid cell edit settings
         *
         * @private
         * @returns {{}}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.getTreeGridCellEditSupport = function () {
            return {
                editSettings: {
                    allowEditing: true,
                    showDeleteConfirmDialog: false,
                    showConfirmDialog: false
                },
            };
        };
        /**
         * Returns the tree grid toolbar settings
         *
         * @private
         * @returns {{}}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.getTreeGridToolbarSupport = function () {
            this._toolbar = new cursorInfoTreeGridToolbar_1.CursorInfoTreeGridToolbar(this.mainDiv);
            return _super.prototype.getTreeGridToolbarSupport.call(this);
        };
        /**
         * TreeGrid was created
         *
         * @private
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.treeGridCreated = function () {
            _super.prototype.treeGridCreated.call(this);
            this.attachToCheckBoxChangedEvent();
        };
        /**
         * Attach check box changed events
         *
         * @private
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.attachToCheckBoxChangedEvent = function () {
            var _this = this;
            $(this.mainDiv).on("change", ".customCheckbox", function (e) { return _this.checkBoxChanged(e); });
        };
        CursorInfoWidget.prototype.loadStyles = function () {
            _super.prototype.addStyle.call(this, "widgets/cursorInfoWidget/style/css/cursorInfoStyleV1.css");
        };
        /**
         * Occurs on check box changed events
         *
         * @private
         * @param {*} e
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.checkBoxChanged = function (e) {
            var filterDataSource = this._cursorInfoTemplateDataModel;
            e = e || window.event;
            var targetEle = e.target;
            var checkStatus = $(targetEle).is(':checked');
            // $(targetEle).prop('checked', true);
            var record = this.getTreeRecord(targetEle);
            if (record != undefined) {
                if (checkStatus == false) {
                    record.item.visible = "false";
                    record["visible"] = "false";
                    this.setMultiSelectionCheckBoxes("false", record.index);
                }
                else {
                    record.item.visible = "true";
                    record["visible"] = "true";
                    this.setMultiSelectionCheckBoxes("true", record.index);
                }
                this.setModel(filterDataSource);
                // Set selection after setting checkbox because they are lost after setting a check box
                this.setSelectionInCursorInfoSelectorView(this._selectedCursorInfosOld);
                this.updateCheckBoxes();
                // Update cursor info visibilities if something has changed
                this.setCursorInfoVisibilities(this._selectedCursorSignals, this._cursorInfoTemplateDataModel[0]);
                // Update dataModel
                this._cursorSignalsDataModel.saveSettings();
            }
        };
        /**
         * If multi selection is active, set all selected items to the given state(checked/unchecked)
         *
         * @private
         * @param {string} state
         * @param {number} actualIndex
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.setMultiSelectionCheckBoxes = function (state, actualIndex) {
            var selectedCursorInfos = this._selectedCursorInfosOld;
            if (selectedCursorInfos != undefined) {
                // Set/Unset check boxes
                var indexWithinMultiSelection = false;
                for (var i = 0; i < selectedCursorInfos.length; i++) {
                    if (actualIndex == selectedCursorInfos[i].index) {
                        indexWithinMultiSelection = true;
                    }
                }
                ;
                if (indexWithinMultiSelection == true) {
                    selectedCursorInfos.forEach(function (cursorInfo) {
                        cursorInfo.item.visible = state;
                        cursorInfo["visible"] = state;
                    });
                }
                else {
                    // Only one checkbox was clicked => set selection to the new one
                    this._selectedCursorInfosOld = this._selectedCursorInfosNew;
                }
            }
        };
        CursorInfoWidget.prototype.treeGridActionBegin = function (args) {
            // Don't support "Entf/Del" key
            if (args.requestType == "delete") {
                args.cancel = true;
            }
        };
        /**
         * A treegrid column was resized
         *
         * @private
         * @param {*} args
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.treeGridColumnResized = function (args) {
            _super.prototype.resizeDynamicColumn.call(this, args.columnIndex, args.model);
            if (this._cursorInfoSelectorIsActive) {
                this.updateCheckBoxes();
            }
            // Refresh cursor info values after resize (treegrid sets the data to "0" after resize)
            this.refreshCursorValues();
            // Just persist column resize when filter is closed
            if (!this._cursorInfoSelectorIsActive) {
                this.saveTreeGridSettings();
            }
        };
        /** resizes the cursor values widget
         *
         * @param {number} width
         * @param {number} height
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.resize = function (width, height) {
            _super.prototype.resize.call(this, width, height);
            if (this._cursorInfoSelectorIsActive) {
                this.updateCheckBoxes();
            }
            // Refresh cursor values after resize (treegrid sets the data to "0" after resize)
            this.refreshCursorValues();
        };
        CursorInfoWidget.prototype.activateCursorInfoSelectorView = function (activate) {
            this._toolbar.activateCursorInfoSelectorView(activate);
            if (activate == true) {
                this.showCursorInfoSelectorView();
            }
            else {
                this.showCursorSignalsView();
            }
            // Update toolbar button positions(e.g. position of right align toolbar) after hide or show toolbar button
            this._toolbar.resize(this.width);
        };
        /**
         * Shows the curser signals with the filtered/defined cursor informations
         *
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.showCursorSignalsView = function () {
            this._cursorInfoSelectorIsActive = false;
            this._selectedCursorInfosOld = undefined;
            this._selectedCursorInfosNew = undefined;
            // Show actual cursorInfo data
            this.refresh();
            // Sets the column visibilities
            var treeGridObject = _super.prototype.getTreeGridObject.call(this);
            this.setColumnVisiblities(treeGridObject, false);
            // set the selection to state before switching to the cursor info selector view
            this.setSelectionWithCursorSignals(treeGridObject, this._selectedCursorSignals);
            // Update the dynamic column size after hide/show of some columns
            this.resizeDynamicColumn(0, treeGridObject.model);
            // refresh the cursor info values
            this.refreshCursorValues();
        };
        /**
         * Shows the cursor info selector view
         *
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.showCursorInfoSelectorView = function () {
            this._cursorInfoSelectorIsActive = true;
            // Reset cursor info template datamodel
            this._cursorInfoTemplateDataModel.splice(0, this._cursorInfoTemplateDataModel.length);
            // create a signal template based on the selected series
            var templateCursorSignal = new dynamicCursorSignalTemplate_1.DynamicCursorSignalTemplate(this._selectedCursorSignals);
            // add the signal template to the model
            this._cursorInfoTemplateDataModel.push(templateCursorSignal);
            // Set cursor info template visibilities
            this.updateTemplateVisibilities(this._selectedCursorSignals, templateCursorSignal);
            // show cursor info template datamodel (the possible cursor infos)
            this.updateDataSource(this._cursorInfoTemplateDataModel);
            // Sets the column visibilities
            var treeGridObject = _super.prototype.getTreeGridObject.call(this);
            this.setColumnVisiblities(treeGridObject, true);
            // Update the dynamic column size after hide/show of some columns
            this.resizeDynamicColumn(0, treeGridObject.model);
            // Removes the filter of the visibility flag which is needed in the cursor signal view
            treeGridObject.clearFilter(this._columnId_Visible);
            // Convert custom check boxes into syncfusion check boxes
            this.updateCheckBoxes();
        };
        /**
         * Sets the column visibilities for the cursor info selector view or the cursor signals view
         *
         * @private
         * @param {*} treeGridObject
         * @param {boolean} cursorInfoSelectorView
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.setColumnVisiblities = function (treeGridObject, cursorInfoSelectorView) {
            // get needed columns
            var visibleColumn = treeGridObject.getColumnByField(this._columnId_Visible);
            var descriptionColumn = treeGridObject.getColumnByField(this._columnId_Description);
            var valueColumn = treeGridObject.getColumnByField(this._columnId_Value);
            if (cursorInfoSelectorView == false) {
                // Hide visible column
                treeGridObject.hideColumn(visibleColumn.headerText);
                // Hide description column
                treeGridObject.hideColumn(descriptionColumn.headerText);
                // Show value column
                treeGridObject.showColumn(valueColumn.headerText);
            }
            else {
                // Show visible column
                treeGridObject.showColumn(visibleColumn.headerText);
                // Show description column
                treeGridObject.showColumn(descriptionColumn.headerText);
                // Hide value column
                treeGridObject.hideColumn(valueColumn.headerText);
            }
        };
        /**
         * Sets the selection to the given selection objects in cursor info selector view
         *
         * @private
         * @param {Array<any>} selectedObjects
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.setSelectionInCursorInfoSelectorView = function (selectedObjects) {
            if (selectedObjects === undefined) {
                return;
            }
            var treeGridObject = this.getTreeGridObject();
            treeGridObject.clearSelection();
            if (selectedObjects.length !== undefined) {
                for (var i = 0; i < selectedObjects.length; i++) {
                    treeGridObject._multiSelectCtrlRequest = true;
                    var visibleIndex = 0;
                    for (var j = 0; j < treeGridObject.model.flatRecords.length; j++) {
                        if (treeGridObject.model.flatRecords[j].id == selectedObjects[i].id) {
                            treeGridObject.selectRows(visibleIndex);
                        }
                        visibleIndex++;
                    }
                }
            }
            else {
                treeGridObject.selectRows(selectedObjects.index);
            }
            // Set actual selection for later use 
            this._selectedCursorInfosOld = selectedObjects;
            this._selectedCursorInfosNew = selectedObjects;
        };
        ;
        /**
         * Sets the selection to the given cursor signals
         *
         * @private
         * @param {*} treeGridObject
         * @param {Array<CursorSignal>} cursorSignals
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.setSelectionWithCursorSignals = function (treeGridObject, cursorSignals) {
            // deselect all selections in cursor signals view
            treeGridObject.clearSelection();
            if (cursorSignals == undefined) {
                return;
            }
            for (var i = 0; i < cursorSignals.length; i++) {
                treeGridObject._multiSelectCtrlRequest = true;
                var visibleIndex = 0;
                var model = treeGridObject.model;
                for (var j = 0; j < model.flatRecords.length; j++) {
                    if (model.flatRecords[j].item == cursorSignals[i]) {
                        treeGridObject.selectRows(visibleIndex);
                    }
                    if (model.flatRecords[j].visible != "false") {
                        visibleIndex++;
                    }
                }
            }
        };
        ;
        /**
         * Sets the visible flags in the template cursor signal to the informations from the cursor signals
         * (e.g. all signals show y1 cursor info so therefore template cursor info visibility is set to "true";
         *       all signals dosn't show y1 cursor info so therefore template cursor info visibility is set to "false";
         *       some signals show y1 cursor info so therefore template cursor info visibility is set to "indeterminate";
         * )
         *
         * @private
         * @param {Array<CursorSignal>} cursorSignals
         * @param {DynamicCursorSignalTemplate} templateCursorSignal
         * @returns
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.updateTemplateVisibilities = function (cursorSignals, templateCursorSignal) {
            var _this = this;
            if (templateCursorSignal && templateCursorSignal.cursorInfos) {
                // for all available merged cursor infos
                templateCursorSignal.cursorInfos.forEach(function (templateCursorSignalInfo) {
                    // clear existing visibility
                    templateCursorSignalInfo.visible = "";
                    // get the cursor infos by id
                    var matchingCursorInfos = _this.retrievCursorInfosById(cursorSignals, templateCursorSignalInfo.id);
                    // for all selected cursor signals with matching id ...
                    matchingCursorInfos.forEach(function (cursorSignalInfo) {
                        // if the visibility is yet undefined ..
                        if (!templateCursorSignalInfo.visible) {
                            // initialize the visibility with the first cursor signal infos value.
                            templateCursorSignalInfo.visible = cursorSignalInfo.visible;
                        }
                        else {
                            // set visibility to undetermined if one of the following values is different
                            if (cursorSignalInfo.visible !== templateCursorSignalInfo.visible) {
                                templateCursorSignalInfo.visible = _this._indeterminateStateValue;
                            }
                        }
                    });
                });
            }
        };
        /**
         * Sets the visibility defined in the template cursor signal to the cursor signals
         *
         * @private
         * @param {Array<CursorSignal>} cursorSignals
         * @param {DynamicCursorSignalTemplate} templateCursorSignal
         * @returns
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.setCursorInfoVisibilities = function (cursorSignals, templateCursorSignal) {
            var _this = this;
            if (templateCursorSignal && templateCursorSignal.cursorInfos) {
                // for all available merged cursor infos
                templateCursorSignal.cursorInfos.forEach(function (templateCursorSignalInfo) {
                    if (templateCursorSignalInfo.visible !== _this._indeterminateStateValue) {
                        // get the cursor infos by id
                        var matchingCursorInfos = _this.retrievCursorInfosById(cursorSignals, templateCursorSignalInfo.id);
                        // for all selected cursor infos with matching id ...
                        matchingCursorInfos.forEach(function (cursorSignalInfo) {
                            // set the cursor signals visibility from the template value if a valid state is defined
                            cursorSignalInfo.visible = templateCursorSignalInfo.visible;
                        });
                    }
                });
            }
        };
        /**
         * gets the cursor infos with the specified id
         *
         * @private
         * @param {Array<CursorSignal>} cursorSignals
         * @param {string} cursorInfoId
         * @returns {Array<CursorInfo>}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.retrievCursorInfosById = function (cursorSignals, cursorInfoId) {
            var matchingCursorInfos = [];
            cursorSignals.forEach(function (cursorSignal) {
                cursorSignal.cursorInfos.forEach(function (cursorSignalInfo) {
                    if (cursorSignalInfo.id === cursorInfoId) {
                        matchingCursorInfos.push(cursorSignalInfo);
                    }
                });
            });
            return matchingCursorInfos;
        };
        /**
         * Raises the move cursor event
         *
         * @param {number} cursorIndex
         * @param {CursorMovement} movement
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.onMoveCursor = function (cursorIndex, movement) {
            var data = [];
            var x = this.cursorsStates.getPosition(cursorIndex, this.cursorsStates.getLastCursorTypeSelected());
            if (this._cursorSignalsDataModel != undefined) {
                var cursors = this._cursorSignalsDataModel.getCursorSignals();
                cursors.forEach(function (cursor) {
                    data.push(cursor.serie);
                });
                if (x != undefined) {
                    this.moveCursor(cursorIndex, movement, data, x);
                }
            }
        };
        /**
         * moves the cursor for the specified direction and offset
         *
         * @private
         * @param {number} cursorIndex
         * @param {CursorMovement} cursorMovement
         * @param {BaseSeries[]} series
         * @param {number} cursorPosition
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.moveCursor = function (cursorIndex, cursorMovement, series, cursorPosition) {
            var cursorType = this.cursorsStates.getLastCursorTypeSelected();
            // get the next possible cursor timestamp
            var nearestTimestamp = this.findNearestTimestampInSeries(series, cursorPosition, cursorMovement, cursorType);
            // update the cursors timestamp location
            this.updateCursorLocation(cursorIndex, nearestTimestamp);
        };
        /**
         * searches the next timestamp in all available series. The picked value takes the movement direction intoi account.
         *
         * @private
         * @param {BaseSeries[]} series
         * @param {number} cursorTimeStamp
         * @param {CursorMovement} cursorMovement
         * @returns {number}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.findNearestTimestampInSeries = function (series, cursorTimeStamp, cursorMovement, cursorType) {
            // retrieve the timestamps series from the signal series
            var timestampSeries = series.map(function (singleSeries) {
                if (cursorType_1.CursorTypeHelper.getCursorTypeForSeries(singleSeries) == cursorType) {
                    return singleSeries.timestamps;
                }
                else {
                    return [];
                }
            });
            var nextNearestTimeStamp = cursorTimeStamp;
            // dpendiung on movement direction we pick the next possible time stamp
            switch (cursorMovement) {
                case cursorInfoWidgetInterface_1.CursorMovement.Right:
                    nextNearestTimeStamp = seriesHelper_1.SeriesHelper.findNearestValueFromCollection(cursorTimeStamp, timestampSeries, binSearch_1.BinSearchMode.NEXTUPPER);
                    break;
                case cursorInfoWidgetInterface_1.CursorMovement.Left:
                    nextNearestTimeStamp = seriesHelper_1.SeriesHelper.findNearestValueFromCollection(cursorTimeStamp, timestampSeries, binSearch_1.BinSearchMode.PREVIOUSLOWER);
                    break;
            }
            return nextNearestTimeStamp;
        };
        /**
         * Handle cursor activation/selection
         *
         * @param {number} cursorIndex
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.onReferenceCursorSelected = function (cursorIndex) {
            // update the cursor selection state
            this.cursorsStates.setSelected(cursorIndex, true);
            this.updateCursorStates(this.cursorsStates);
            // set the cursors as active tool
            var toolstate = this.states.read(chartViewToolbarStates_1.ChartViewToolState, "ChartViewToolState");
            toolstate.selectedTool = chartViewToolbarStates_1.ChartViewToolStateEnum.CURSORS;
            this.states.update(this, chartViewToolbarStates_1.ChartViewToolState, toolstate, "ChartViewToolState");
        };
        /**
         * Adds a signal to the cursor info widget
         *
         * @param {Array<BaseSeries>} series
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.addSeries = function (series) {
            var cursorSignals = new Array();
            for (var i = 0; i < series.length; i++) {
                if (series[i].type === seriesType_1.SeriesType.timeSeries) {
                    cursorSignals.push(new ytCursorSignal_1.YTCursorSignal(series[i], false));
                }
                else if (series[i].type === seriesType_1.SeriesType.xySeries) {
                    cursorSignals.push(new xyCursorSignal_1.XYCursorSignal(series[i], false));
                }
                else if (series[i].type === seriesType_1.SeriesType.fftSeries) {
                    cursorSignals.push(new fftCursorSignal_1.FFTCursorSignal(series[i], false));
                }
            }
            if (this._cursorSignalsDataModel != undefined) {
                this._cursorSignalsDataModel.addSignal(cursorSignals);
            }
        };
        /**
         * Remove a cursor signal from the cursor info widget
         *
         * @param {BaseSeries} serie
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.removeSerie = function (serie) {
            if (this._cursorSignalsDataModel != undefined) {
                var cursorSignal = this._cursorSignalsDataModel.getCursorSignal(serie);
                if (cursorSignal) {
                    this._cursorSignalsDataModel.removeSerie(cursorSignal);
                    // Disables filter button if is active
                    var toolbar_1 = this._toolbar;
                    if (toolbar_1.cursorInfoSelectionIsActive) {
                        toolbar_1.activateCursorInfoSelectorView(!toolbar_1.cursorInfoSelectionIsActive);
                    }
                    // Removes the cursor signal from the current selection list and updates the toolbar button
                    var index = this._selectedCursorSignals.indexOf(cursorSignal);
                    if (index != -1) {
                        this._selectedCursorSignals.splice(index, 1);
                        this.updateCursorInfoSelectorButtonState();
                    }
                }
            }
        };
        /**
         * changes and updates the cursor location of the selected cursor
         *
         * @param {number} cursorIndex
         * @param {number} cursorTimestamp
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.updateCursorLocation = function (cursorIndex, cursorTimestamp) {
            this.cursorsStates.setPosition(cursorIndex, cursorTimestamp);
            this.updateCursorStates(this.cursorsStates);
        };
        /**
         * refreshes the tree grids data
         *
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.refresh = function () {
            // refresh tree grid only if cursor signal view is active (not in case of cursor info selector)
            if (!this._cursorInfoSelectorIsActive && this.refreshEnabled) {
                if (this._cursorSignalsDataModel != undefined) {
                    var cursorSignals = this._cursorSignalsDataModel.getCursorSignals();
                    this.updateDataSource(cursorSignals);
                }
                // set the selection to the select signal before
                var treeGridObject = this.getTreeGridObject();
                this.setSelectionWithCursorSignals(treeGridObject, this._selectedCursorSignals);
                // Update cursor info values 
                this.refreshCursorStates();
            }
        };
        /**
         * Trigger the update of the cursorInfos for the current cursor states
         *
         * @private
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.refreshCursorStates = function () {
            this.updateCursorStates(this.cursorsStates);
        };
        CursorInfoWidget.prototype.updateDataSource = function (cursorSignals) {
            this.setCursorValueUiIds(cursorSignals);
            // Refresh TreeGrid with new datasource
            this.setModel(cursorSignals);
            // Refresh the cursor values after updating the model
            this.refreshCursorValues(cursorSignals);
        };
        /**
         * Defines and sets uids for every cursor value (cursor signals and cursor infos)
         *
         * @private
         * @param {Array<CursorSignal>} cursorSignals
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.setCursorValueUiIds = function (cursorSignals) {
            var cursorInfoId = 0;
            cursorSignals.forEach(function (cursorSignal) {
                cursorSignal.uiId = cursorInfoId++;
                cursorSignal.cursorInfos.forEach(function (cursorInfo) {
                    cursorInfo.uiId = cursorInfoId++;
                });
            });
        };
        /**
         * Refresh all cursor values
         *
         * @private
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.refreshCursorValues = function (cursorSignals) {
            var _this = this;
            if (cursorSignals === void 0) { cursorSignals = undefined; }
            if (cursorSignals == undefined && this._cursorSignalsDataModel != undefined) {
                cursorSignals = this._cursorSignalsDataModel.getCursorSignals();
            }
            if (cursorSignals != undefined) {
                cursorSignals.forEach(function (cursorSignal) {
                    _this.refreshCursorValueField(cursorSignal);
                    cursorSignal.cursorInfos.forEach(function (cursorInfo) {
                        _this.refreshCursorValueField(cursorInfo);
                    });
                });
            }
        };
        /**
         * updates a cursor value field with the current values of the correspondig cursor signal or info
         *
         * @private
         * @param {CursorSignal|CursorInfo} cursorSignalOrInfo
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.refreshCursorValueField = function (cursorSignalOrInfo) {
            if (cursorSignalOrInfo) {
                // get the corresponding ui element
                var cursorValueElement = this.getCursorValueElement(cursorSignalOrInfo);
                if (cursorValueElement != undefined) {
                    var valueString = cursorSignalOrInfo.value.toString();
                    cursorValueElement.innerText = valueString;
                }
            }
        };
        /**
         * Gets the corresponding cursor signal or info element
         *
         * @private
         * @param {CursorSignal|CursorInfo} cursorSignalOrInfo
         * @returns {(HTMLDivElement | undefined)}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.getCursorValueElement = function (cursorSignalOrInfo) {
            var mySubDiv = this.mainDiv.querySelector("#" + this.mainDivId + CURSOR_VALUE_ID + cursorSignalOrInfo.uiId);
            if (mySubDiv == null) {
                return undefined;
            }
            return mySubDiv;
        };
        CursorInfoWidget.prototype.onCursorSignalsDataModelChanged = function (sender, args) {
            this.refresh();
            this.saveTreeGridSettings();
        };
        /**
         * This method will update the cursor info widget with data from
         * the cursor state.
         *
         * @private
         * @param {CursorStates} modifiedState
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.updateInfoCursorsWithNewStateValues = function (modifiedState) {
            if (this._cursorSignalsDataModel != undefined) {
                this._cursorSignalsDataModel.updateInfoCursorsWithNewCursorStateValues(modifiedState);
            }
            this._toolbar.updateButtonStates(modifiedState);
            this.refreshCursorValues();
        };
        /**
         * Convert custom check boxes into syncfusion check boxes
         *
         * @private
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.updateCheckBoxes = function () {
            var checkBoxes = $('.customCheckbox');
            for (var i = 0; i < checkBoxes.length; i++) {
                checkBoxes[i].id = 'customCheckbox' + (i + 1);
                this.creatSyncfusionCheckbox(checkBoxes[i]);
            }
        };
        /**
         * Instantiate syncfusion check box
         *
         * @private
         * @param {HTMLElement} customCheckbox
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.creatSyncfusionCheckbox = function (customCheckbox) {
            var _this = this;
            var enableTriState = false;
            var state = this.getCustomCheckboxState($(customCheckbox));
            if (state === 'indeterminate') {
                enableTriState = true;
            }
            $(customCheckbox).ejCheckBox({
                enableTriState: enableTriState,
                id: customCheckbox.id,
                checkState: state,
                cssClass: "cursorInfoWidget",
                change: function (args) { return _this.syncfusionCheckBoxChanged(args); },
            });
        };
        /**
         * Trigger check box change event
         *
         * @private
         * @param {*} args
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.syncfusionCheckBoxChanged = function (args) {
            if (args.model.enableTriState) {
                $('#' + args.model.id).ejCheckBox({ enableTriState: false });
            }
            this.setSelectedCursorsInfo(args);
            var customCheckbox = $('#' + args.model.id);
            customCheckbox.change();
        };
        /**
         * Set selected cursor info when checkbox is clicked
         *
         * @param {*} args
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.setSelectedCursorsInfo = function (args) {
            var treegrid = this.getTreeGridObject();
            var index = parseInt(args.model.id.split('customCheckbox')[1], 10);
            if (this._selectedCursorInfosOld == undefined) {
                this._selectedCursorInfosOld = treegrid.model.flatRecords[index];
            }
            else {
                this._selectedCursorInfosOld = this._selectedCursorInfosNew;
            }
            this._selectedCursorInfosNew = treegrid.model.flatRecords[index];
        };
        /**
         * get state of checkbox
         *
         * @private
         * @param {JQuery<HTMLElement>} checkbox
         * @returns {string}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.getCustomCheckboxState = function (checkbox) {
            if (checkbox.is(':checked')) {
                return 'check';
            }
            else if (checkbox.is(':indeterminate')) {
                return 'indeterminate';
            }
            else {
                return 'uncheck';
            }
        };
        /**
         * Attaches the chart manager datamodel events
         *
         * @private
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.attachChartManagerDataModelEvents = function () {
            if (this._chartManagerDataModel) {
                this._chartManagerDataModel.eventModelChanged.attach(this._chartManagerModelChangedHandler);
            }
        };
        /**
         * Detaches the chart manager datamodel events
         *
         * @private
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.detachChartManagerDataModelEvents = function () {
            if (this._chartManagerDataModel) {
                this._chartManagerDataModel.eventModelChanged.detach(this._chartManagerModelChangedHandler);
            }
        };
        /**
         * chartManagerModel has changed
         *
         * @private
         * @param {*} sender
         * @param {*} args
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.onChartManagerModelChanged = function (sender, args) {
            // Update the cursor info widget
            if (args.hint == chartManagerDataModel_1.ChartManagerDataModelChangedHint.addSerie && args.data.series != undefined) {
                this.addSeries(args.data.series);
            }
            else if (args.hint == chartManagerDataModel_1.ChartManagerDataModelChangedHint.removeSerie) {
                if (args.data.signalUsedInOtherCharts == false) {
                    this.removeSerie(args.data.serie);
                }
            }
        };
        return CursorInfoWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.CursorInfoWidget = CursorInfoWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29ySW5mb1dpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jdXJzb3JJbmZvV2lkZ2V0L2N1cnNvckluZm9XaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBc0JBLG9EQUFvRDtJQUNwRCxJQUFNLGVBQWUsR0FBRyxjQUFjLENBQUM7SUFFdkM7Ozs7O09BS0c7SUFDSDtRQUErQixvQ0FBa0I7UUFBakQ7WUFBQSxxRUFzc0NDO1lBcHNDVyxrQ0FBNEIsR0FBdUMsSUFBSSxLQUFLLEVBQStCLENBQUM7WUFJNUcsMkNBQXFDLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLCtCQUErQixDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsRUFBakQsQ0FBaUQsQ0FBQztZQUN6RyxzQ0FBZ0MsR0FBRyxVQUFDLE1BQU0sRUFBRSxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsMEJBQTBCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUE3QyxDQUE2QyxDQUFDO1lBRW5HLDRCQUFzQixHQUF3QixJQUFJLEtBQUssRUFBZ0IsQ0FBQztZQUd4RSxpQ0FBMkIsR0FBRyxLQUFLLENBQUM7WUFFM0IsdUJBQWlCLEdBQUcsU0FBUyxDQUFDO1lBQzlCLG9CQUFjLEdBQUcsTUFBTSxDQUFDO1lBQ3hCLHFCQUFlLEdBQUcsT0FBTyxDQUFDO1lBQzFCLDJCQUFxQixHQUFHLGFBQWEsQ0FBQztZQUN0Qyw4QkFBd0IsR0FBRyxnQkFBZ0IsQ0FBQztZQUU1Qyw4QkFBd0IsR0FBRyxlQUFlLENBQUM7WUFFNUQsMkpBQTJKO1lBQzNKLGdGQUFnRjtZQUN0RSxtQkFBYSxHQUFpQixJQUFJLDJCQUFZLEVBQUUsQ0FBQzs7UUE4cUMvRCxDQUFDO1FBNXFDRzs7OztXQUlHO1FBQ0gscUNBQVUsR0FBVjtZQUNJLGlCQUFNLHdC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QUNKO1FBQ0wsQ0FBQztRQUNMLHVCQUFDO0lBQUQsQ0FBQyxBQXRzQ0QsQ0FBK0IsdUNBQWtCLEdBc3NDaEQ7SUFFUSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ3Vyc29ySW5mb1dpZGdldCxDdXJzb3JNb3ZlbWVudCB9IGZyb20gXCIuL2ludGVyZmFjZXMvY3Vyc29ySW5mb1dpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUcmVlR3JpZFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3RyZWVHcmlkV2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBDdXJzb3JJbmZvVHJlZUdyaWRUb29sYmFyIH0gZnJvbSBcIi4vdmlldy9jdXJzb3JJbmZvVHJlZUdyaWRUb29sYmFyXCI7XHJcbmltcG9ydCB7IEN1cnNvclNpZ25hbHNEYXRhTW9kZWwgfSBmcm9tIFwiLi9tb2RlbC9jdXJzb3JTaWduYWxzRGF0YU1vZGVsXCI7XHJcbmltcG9ydCB7IFlUQ3Vyc29yU2lnbmFsIH0gZnJvbSBcIi4vbW9kZWwveXRDdXJzb3JTaWduYWxcIjtcclxuaW1wb3J0IHsgWFlDdXJzb3JTaWduYWwgfSBmcm9tIFwiLi9tb2RlbC94eUN1cnNvclNpZ25hbFwiO1xyXG5pbXBvcnQgeyBGRlRDdXJzb3JTaWduYWwgfSBmcm9tIFwiLi9tb2RlbC9mZnRDdXJzb3JTaWduYWxcIjtcclxuaW1wb3J0IHsgSVVpQmluZGluZyB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy93aWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ3Vyc29ySW5mbyB9IGZyb20gXCIuL21vZGVsL2N1cnNvckluZm9cIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3Nlcmllcy9iYXNlU2VyaWVzXCI7XHJcbmltcG9ydCB7IEN1cnNvclN0YXRlcyB9IGZyb20gXCIuLi9jb21tb24vc3RhdGVzL2N1cnNvclN0YXRlc1wiO1xyXG5pbXBvcnQgeyBEeW5hbWljQ3Vyc29yU2lnbmFsVGVtcGxhdGUgfSBmcm9tIFwiLi9tb2RlbC9keW5hbWljQ3Vyc29yU2lnbmFsVGVtcGxhdGVcIjtcclxuaW1wb3J0IHsgQ3Vyc29yU2lnbmFsIH0gZnJvbSBcIi4vbW9kZWwvY3Vyc29yU2lnbmFsXCI7XHJcbmltcG9ydCB7IFNlcmllc0hlbHBlciB9IGZyb20gXCIuLi8uLi9jb21tb24vc2VyaWVzSGVscGVyXCI7XHJcbmltcG9ydCB7IEJpblNlYXJjaE1vZGUgYXMgU2VhcmNoTW9kZSB9IGZyb20gXCIuLi8uLi9jb21tb24vdXRpbGl0aWVzL2JpblNlYXJjaFwiO1xyXG5pbXBvcnQgeyBDaGFydFZpZXdUb29sU3RhdGUsIENoYXJ0Vmlld1Rvb2xTdGF0ZUVudW0gfSBmcm9tIFwiLi4vY29tbW9uL3N0YXRlcy9jaGFydFZpZXdUb29sYmFyU3RhdGVzXCI7XHJcbmltcG9ydCB7IFNlcmllc1R5cGUgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9zZXJpZXMvc2VyaWVzVHlwZVwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbiB9IGZyb20gXCIuL2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LCBDaGFydE1hbmFnZXJEYXRhTW9kZWwgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9jaGFydE1hbmFnZXJEYXRhTW9kZWxcIjtcclxuaW1wb3J0IHsgQ3Vyc29yVHlwZUhlbHBlciwgQ3Vyc29yVHlwZSB9IGZyb20gXCIuLi9jb21tb24vc3RhdGVzL2N1cnNvclR5cGVcIjtcclxuXHJcbi8vIGRlZmluZXMgdGhlIGJhc2UgaWQgZm9yIHRoZSBjdXJzb3IgdmFsdWUgdGVtcGxhdGVcclxuY29uc3QgQ1VSU09SX1ZBTFVFX0lEID0gXCJjdXJzb3JWYWx1ZV9cIjtcclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRzIHRoZSBDdXJzb3JJbmZvIFdpZGdldFxyXG4gKlxyXG4gKiBAY2xhc3MgQ3Vyc29ySW5mb1dpZGdldFxyXG4gKiBAZXh0ZW5kcyB7VHJlZUdyaWRXaWRnZXRCYXNlfVxyXG4gKi9cclxuY2xhc3MgQ3Vyc29ySW5mb1dpZGdldCBleHRlbmRzIFRyZWVHcmlkV2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElDdXJzb3JJbmZvV2lkZ2V0IHtcclxuICAgIHByaXZhdGUgX2N1cnNvclNpZ25hbHNEYXRhTW9kZWw6IEN1cnNvclNpZ25hbHNEYXRhTW9kZWx8dW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfY3Vyc29ySW5mb1RlbXBsYXRlRGF0YU1vZGVsOiBBcnJheTxEeW5hbWljQ3Vyc29yU2lnbmFsVGVtcGxhdGU+ID0gbmV3IEFycmF5PER5bmFtaWNDdXJzb3JTaWduYWxUZW1wbGF0ZT4oKTtcclxuXHJcbiAgICBwcml2YXRlIF9jaGFydE1hbmFnZXJEYXRhTW9kZWw6IENoYXJ0TWFuYWdlckRhdGFNb2RlbHx1bmRlZmluZWQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfY3Vyc29yU2lnbmFsc0RhdGFNb2RlbENoYW5nZWRIYW5kbGVyID0gKHNlbmRlcixhcmdzKT0+dGhpcy5vbkN1cnNvclNpZ25hbHNEYXRhTW9kZWxDaGFuZ2VkKHNlbmRlcixhcmdzKTtcclxuICAgIHByaXZhdGUgX2NoYXJ0TWFuYWdlck1vZGVsQ2hhbmdlZEhhbmRsZXIgPSAoc2VuZGVyLCBkYXRhKSA9PiB0aGlzLm9uQ2hhcnRNYW5hZ2VyTW9kZWxDaGFuZ2VkKHNlbmRlciwgZGF0YSk7ICBcclxuXHJcbiAgICBwcml2YXRlIF9zZWxlY3RlZEN1cnNvclNpZ25hbHM6IEFycmF5PEN1cnNvclNpZ25hbD4gPSBuZXcgQXJyYXk8Q3Vyc29yU2lnbmFsPigpO1xyXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWRDdXJzb3JJbmZvc09sZDtcclxuICAgIHByaXZhdGUgX3NlbGVjdGVkQ3Vyc29ySW5mb3NOZXc7XHJcbiAgICBwcml2YXRlIF9jdXJzb3JJbmZvU2VsZWN0b3JJc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jb2x1bW5JZF9WaXNpYmxlID0gXCJ2aXNpYmxlXCI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jb2x1bW5JZF9OYW1lID0gXCJuYW1lXCI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jb2x1bW5JZF9WYWx1ZSA9IFwidmFsdWVcIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2NvbHVtbklkX0Rlc2NyaXB0aW9uID0gXCJkZXNjcmlwdGlvblwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfY29sdW1uSWRfSWNvbkRlZmluaXRpb24gPSBcImljb25EZWZpbml0aW9uXCI7XHJcbiAgICBcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2luZGV0ZXJtaW5hdGVTdGF0ZVZhbHVlID0gXCJpbmRldGVybWluYXRlXCI7XHJcblxyXG4gICAgLy8gaG9sZHMgdGhlIGN1cnJlbnQgY3Vyc29yIHN0YXRlcyB2YWx1ZXMuIFdlIGluaXRpYWxpemUgdGhlIG1lbWJlciBmb3IgZGVmYXVsdC4gVGhlIGVmZmVjdGl2ZSBpbml0aWFsaXphdGlvbiB0YWtlcyBwbGFjZSB3aGVuIHRoZSBleHRlcm5hbCBzaGFyZWQgaW5zdGFuY2VcclxuICAgIC8vIG9mIHRoZSBjdXJzb3Igc3RhdGVzIGlzIGNyZWF0ZWQgYW5kIHJlZmxlY3RlZCB0aHJvdWdoIHRoZSBjdXJvclN0YXRlcyBzZXR0ZXIhXHJcbiAgICBwcm90ZWN0ZWQgX2N1cnNvclN0YXRlczogQ3Vyc29yU3RhdGVzID0gbmV3IEN1cnNvclN0YXRlcygpO1xyXG5cclxuICAgIC8qKiAgXHJcbiAgICAgKiBJbml0aWFsaXplIHRoZSB3aWRnZXRcclxuICAgICAqIFxyXG4gICAgICogIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemUoKSB7XHJcbiAgICAgICAgc3VwZXIuc2V0SGVhZGVyRmlsdGVyQmFySGlkZGVuKCk7Ly8gTXVzdCBiZSBzZXQgYmVmb3JlIGluaXRpYWxpemF0aW9uIHRvIGF2b2lkIHNob3dpbmcgdGhlIGZpbHRlcmJhclxyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgdGhlIGhlaWdodCBvZiB0aGUgaGVhZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBPdmVydmlld1RyZWVHcmlkV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBkZWZpbmVIZWFkZXJIZWlnaHQoKTogbnVtYmVye1xyXG4gICAgICAgIHJldHVybiAzMDtcclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsaXplZCgpe1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemVkKCk7XHJcblxyXG4gICAgICAgIC8vIEdldCBjdXJzb3Igc2lnbmFscyBkYXRhbW9kZWxcclxuICAgICAgICB0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLkN1cnNvclNpZ25hbHNEYXRhTW9kZWxJZCkgYXMgQ3Vyc29yU2lnbmFsc0RhdGFNb2RlbDtcclxuXHJcbiAgICAgICAgLy8gQXR0YWNoIGN1cnNvciBzaWduYWxzIGRhdGFtb2RlbCBldmVudFxyXG4gICAgICAgIGlmKHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbC5ldmVudE1vZGVsQ2hhbmdlZC5hdHRhY2godGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbENoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gR2V0IGN1cnNvciBzaWduYWxzIGRhdGFtb2RlbFxyXG4gICAgICAgIHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbCA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5DaGFydE1hbmFnZXJEYXRhTW9kZWxJZCkgYXMgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsO1xyXG5cclxuICAgICAgICB0aGlzLmF0dGFjaENoYXJ0TWFuYWdlckRhdGFNb2RlbEV2ZW50cygpO1xyXG5cclxuICAgICAgICAvLyBSZWZyZXNoIHRyZWVHcmlkIHRvIHNlZSB0aGUgbG9hZGVkIHBlcnNpc3RpbmcgZGF0YVxyXG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG5cclxuICAgICAgICAvLyBJbml0aWFsaXplIHNjcm9sbGJhcnMgcG9zaXRpb25zXHJcbiAgICAgICAgbGV0IHNjcm9sbGJhclNldHRpbmdzID0gdGhpcy5jb21wb25lbnQuZ2V0U2V0dGluZyhUcmVlR3JpZFdpZGdldEJhc2UuU2Nyb2xsYmFyc1NldHRpbmdzSWQpO1xyXG4gICAgICAgIHRoaXMuc2V0U2Nyb2xsQmFyU2V0dGluZ3Moc2Nyb2xsYmFyU2V0dGluZ3MpO1xyXG5cclxuICAgICAgICBzdXBlci5zZXRIZWFkZXJDb250ZW50KFwiQ3Vyc29yc1wiKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBTZXQgZHluYW1pYyBjb2x1bW4gc2V0dGluZ3NcclxuICAgICAgICBzdXBlci5zZXREeW5hbWljQ29sdW1uKDEsIDgwKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsaXplQ29tcG9uZW50KCl7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0RGVmYXVsdERlZmluaXRpb24obmV3IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgY3Vyc29ycyBzdGF0ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAdHlwZSB7Q3Vyc29yU3RhdGVzfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld1Rvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldCBjdXJzb3JzU3RhdGVzKCkgOiBDdXJzb3JTdGF0ZXMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJzb3JTdGF0ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGN1cnNvcnMgc3RhdGVzLiBUaGUgbWV0aG9kIGlzIGNhbGxlZCBhdXRvbWF0aWNhbGx5IHdoZW5ldmVyIGEgY3Vyc29yIHN0YXRlIGhhcyBiZWVuIGNoYW5nZWQgZXh0ZXJuYWxseS4gXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld1Rvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHNldCBjdXJzb3JzU3RhdGVzKGN1cnNvclN0YXRlcyA6IEN1cnNvclN0YXRlcykge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgYmFja3VwIGZpZWxkXHJcbiAgICAgICAgdGhpcy5fY3Vyc29yU3RhdGVzID0gY3Vyc29yU3RhdGVzO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZUluZm9DdXJzb3JzV2l0aE5ld1N0YXRlVmFsdWVzKGN1cnNvclN0YXRlcyk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgY3Vyc29yIHN0YXRlcy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvclN0YXRlc30gY3Vyc29yU3RhdGVzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCB1cGRhdGVDdXJzb3JTdGF0ZXMoY3Vyc29yU3RhdGVzOkN1cnNvclN0YXRlcyl7XHJcbiAgICAgICAgLy8gQklORElOR1NPVVJDRTogZGlzcGF0Y2hlcyB0aGUgbWV0aG9kIGNhbGwgdG8gYm91bmQgdGFyZ2V0c1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3Bvc2UoKXtcclxuICAgICAgICB0aGlzLmRldGFjaENoYXJ0TWFuYWdlckRhdGFNb2RlbEV2ZW50cygpO1xyXG5cclxuICAgICAgICBpZih0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIERldGFjaCBjdXJzb3Igc2lnbmFscyBkYXRhbW9kZWwgZXZlbnRzXHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwuZXZlbnRNb2RlbENoYW5nZWQuZGV0YWNoKHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWxDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgICAgIC8vIERpc3Bvc2UgY3Vyc29yIHNpZ25hbHMgZGF0YW1vZGVsXHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwuZGlzcG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXRDb21wb25lbnRTZXR0aW5ncyhvbmx5TW9kaWZpZWQ6IGJvb2xlYW4pOiBDb21wb25lbnRTZXR0aW5nc3tcclxuXHRcdHJldHVybiBzdXBlci5nZXRDb21wb25lbnRTZXR0aW5ncyhvbmx5TW9kaWZpZWQpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldENvbXBvbmVudFNldHRpbmdzKGRhdGE6IENvbXBvbmVudFNldHRpbmdzKSB7XHJcbiAgICAgICAgaWYoZGF0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBzdXBlci5zZXRDb21wb25lbnRTZXR0aW5ncyhkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBjb2x1bW4gdGVtcGxhdGVzIGZvciB0aGUgdHJlZSBncmlkIGFuZCBhZGRzIHRoZW0gdG8gdGhlIHdpZGdldCBjb250YWluZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlVGVtcGxhdGVzKCl7XHJcblx0XHR2YXIgJHdpZGdldENvbnRhaW5lciA9ICQodGhpcy5tYWluRGl2KTtcclxuXHRcdCR3aWRnZXRDb250YWluZXIuYXBwZW5kKHRoaXMuZ2V0Q29sdW1uVGVtcGxhdGVEYXRhKHRoaXMuX2NvbHVtbklkX1Zpc2libGUpKTtcclxuXHRcdCR3aWRnZXRDb250YWluZXIuYXBwZW5kKHRoaXMuZ2V0Q29sdW1uVGVtcGxhdGVEYXRhKHRoaXMuX2NvbHVtbklkX05hbWUpKTtcclxuXHR9XHJcblxyXG4gICAgLyoqXHJcblx0ICogUmV0dXJucyB0aGUgY29sdW1uIHRlbXBsYXRlIGluZm9ybWF0aW9uc1xyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG5cdCAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcblx0ICovXHJcbiAgICBwcml2YXRlIGdldENvbHVtblRlbXBsYXRlRGF0YShjb2x1bW5JZDogc3RyaW5nKSA6IHN0cmluZ3tcclxuICAgICAgICBpZihjb2x1bW5JZCA9PSB0aGlzLl9jb2x1bW5JZF9WaXNpYmxlKXtcclxuICAgICAgICAgICAgcmV0dXJuIGA8c2NyaXB0IHR5cGU9XCJ0ZXh0L3gtanNyZW5kZXJcIiBpZD1cImNpVmlzaWJsZUNvbHVtblRlbXBsYXRlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJtYXJnaW4tbGVmdDoxMHB4O1wiPnt7aWYgdmlzaWJsZSA9PSBcInRydWVcIiAmJiAhaGFzQ2hpbGRSZWNvcmRzfX0gPGlucHV0IGNsYXNzPVwiY3VzdG9tQ2hlY2tib3hcIiB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPVwiY2hlY2tlZFwiIHZhbHVlPVwiXCIgLz57e2Vsc2UgIWhhc0NoaWxkUmVjb3Jkc319IDxpbnB1dCBjbGFzcz1cImN1c3RvbUNoZWNrYm94XCIgdHlwZT1cImNoZWNrYm94XCIgdmFsdWU9XCJcIiAvPnt7L2lmfX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zY3JpcHQ+YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihjb2x1bW5JZCA9PSB0aGlzLl9jb2x1bW5JZF9OYW1lKXtcclxuICAgICAgICAgICAgcmV0dXJuIGA8c2NyaXB0IHR5cGU9XCJ0ZXh0L3gtanNyZW5kZXJcIiBpZD1cImNpTmFtZUNvbHVtblRlbXBsYXRlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9J2hlaWdodDoyMHB4OycgdW5zZWxlY3RhYmxlPSdvbic+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e2lmIGhhc0NoaWxkUmVjb3Jkc319XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0naW50ZW5kJyBzdHlsZT0naGVpZ2h0OjFweDsgZmxvYXQ6bGVmdDsgd2lkdGg6e3s6bGV2ZWwqNn19cHg7IGRpc3BsYXk6aW5saW5lLWJsb2NrOyc+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e2Vsc2UgIWhhc0NoaWxkUmVjb3Jkc319XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0naW50ZW5kJyBzdHlsZT0naGVpZ2h0OjFweDsgZmxvYXQ6bGVmdDsgd2lkdGg6e3s6bGV2ZWwqNn19cHg7IGRpc3BsYXk6aW5saW5lLWJsb2NrOyc+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ey9pZn19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ezojZGF0YVsnaWNvbkRlZmluaXRpb24nXX19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdlLWNlbGwnIHN0eWxlPSdkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDoxMDAlJyB1bnNlbGVjdGFibGU9J29uJz57ezojZGF0YVsnbmFtZSddfX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zY3JpcHQ+YDtcclxuICAgICAgICB9XHJcblx0XHRyZXR1cm4gXCJcIjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSB0cmVlIGdyaWQgZm9yIHRoZSBDdXJzb3JJbmZvc1xyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjcmVhdGVUcmVlR3JpZCgpe1xyXG4gICAgICAgICQodGhpcy5tYWluRGl2KS5lalRyZWVHcmlkKHtcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKSxcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZENvbHVtblJlc2l6ZVN1cHBvcnQoKSxcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZENlbGxFZGl0U3VwcG9ydCgpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkVG9vbGJhclN1cHBvcnQoKSxcdFxyXG5cclxuICAgICAgICAgICAgY2hpbGRNYXBwaW5nOiBcImZpbHRlcmVkQ3Vyc29ySW5mb3NcIixcclxuICAgICAgICAgICAgZXhwYW5kU3RhdGVNYXBwaW5nOiBcImV4cGFuZFN0YXRlXCIsXHJcbiAgICAgICAgICAgIGlzUmVzcG9uc2l2ZTogdHJ1ZSxcclxuICAgICAgICAgICAgdHJlZUNvbHVtbkluZGV4OiAxLFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcm93SGVpZ2h0IDogMjgsXHJcbiAgICAgICAgICAgIC8vIFNldCBpbml0IHNpemUgdG8gZHJhdyB0aGUgdG9vbGJhciBpY29ucyBhdCB0aGUgcmlnaHQgcG9zaXRpb25cclxuICAgICAgICAgICAgc2l6ZVNldHRpbmdzOiB7IGhlaWdodDogJzEwMHB4Jywgd2lkdGg6ICcxMDBweCcgfSxcclxuXHJcbiAgICAgICAgICAgIHNlbGVjdGlvblR5cGU6IGVqLlRyZWVHcmlkLlNlbGVjdGlvblR5cGUuTXVsdGlwbGUsXHJcblxyXG4gICAgICAgICAgICBleHBhbmRlZDogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWROb2RlRXhwYW5kZWRPckNvbGxhcHNlZCgpLFxyXG5cdFx0XHRjb2xsYXBzZWQ6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkTm9kZUV4cGFuZGVkT3JDb2xsYXBzZWQoKSxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJvd1NlbGVjdGVkOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZFJvd1NlbGVjdGVkKGFyZ3MpLFxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBjcmVhdGU6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkQ3JlYXRlZCgpLFxyXG4gICAgICAgICAgICBhY3Rpb25CZWdpbjogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRBY3Rpb25CZWdpbihhcmdzKSwgXHJcbiAgICAgICAgICAgIHF1ZXJ5Q2VsbEluZm86IChhcmdzKSA9PiB0aGlzLnF1ZXJ5Q2VsbEluZm8oYXJncyksXHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHJlZUdyaWROb2RlRXhwYW5kZWRPckNvbGxhcHNlZCgpe1xyXG4gICAgICAgIC8vIFJlZnJlc2ggdG8gc2VlIGNvcnJlY3QgZXhwYW5kZWQvY29sbGFwc2VkIGljb25cclxuICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICAvLyBQZXJzaXN0IGV4cGFuZFN0YXRlIGluIGRhdGFNb2RlbFxyXG4gICAgICAgIGlmICh0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbC5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUGVyc2lzdCBzY3JvbGxiYXIgc3RhdGUgaW4gY3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICAgIHRoaXMuc2F2ZVRyZWVHcmlkU2V0dGluZ3MoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHF1ZXJ5Q2VsbEluZm8oYXJncyl7XHJcbiAgICAgICAgaWYoYXJncy5jb2x1bW4uZmllbGQgPT0gdGhpcy5fY29sdW1uSWRfVmlzaWJsZSl7XHJcbiAgICAgICAgICAgIGlmKGFyZ3MuY2VsbFZhbHVlID09IHRoaXMuX2luZGV0ZXJtaW5hdGVTdGF0ZVZhbHVlKXtcclxuICAgICAgICAgICAgICAgIC8vIFNldCBpbmRldGVybWluYXRlIGljb25zXHJcbiAgICAgICAgICAgICAgICAkKGFyZ3MuY2VsbEVsZW1lbnQuY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzFdKS5wcm9wKHRoaXMuX2luZGV0ZXJtaW5hdGVTdGF0ZVZhbHVlLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyZWVHcmlkIHNlbGVjdGVkIHJvdyBoYXMgY2hhbmdlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHRyZWVHcmlkUm93U2VsZWN0ZWQoYXJncyl7XHJcbiAgICAgICAgaWYoYXJncy5tb2RlbC5zZWxlY3RlZEl0ZW1zID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5fY3Vyc29ySW5mb1NlbGVjdG9ySXNBY3RpdmUgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIC8vIFNhdmVzIHRoZSBzZWxlY3RlZCBpdGVtcyBmb3IgbXVsdGlzZWxlY3Rpb24gc3VwcG9ydCBpbiBjdXJzb3IgaW5mbyBzZWxlY3RvclxyXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZEN1cnNvckluZm9zT2xkID0gdGhpcy5fc2VsZWN0ZWRDdXJzb3JJbmZvc05ld1xyXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZEN1cnNvckluZm9zTmV3ID0gYXJncy5tb2RlbC5zZWxlY3RlZEl0ZW1zO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZEN1cnNvclNpZ25hbHMgPSB0aGlzLmdldE9ubHlDdXJzb3JTaWduYWxzKGFyZ3MubW9kZWwuc2VsZWN0ZWRJdGVtcyk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ3Vyc29ySW5mb1NlbGVjdG9yQnV0dG9uU3RhdGUoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldCBhbGwgQ3Vyc29yU2lnbmFscyBmb3IgdGhlIGN1cnJlbnQgc2VsZWN0aW9uKGlmIEN1cnNvckluZm8gaXMgc2VsZWN0ZWQsIGdldCB0aGUgcGFyZW50IEN1cnNvclNpZ25hbClcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzZWxlY3RlZEl0ZW1zXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8Q3Vyc29yU2lnbmFsPn1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0T25seUN1cnNvclNpZ25hbHMoc2VsZWN0ZWRJdGVtcyk6IEFycmF5PEN1cnNvclNpZ25hbD57XHJcbiAgICAgICAgbGV0IG5ld0xpc3QgPSBuZXcgQXJyYXk8Q3Vyc29yU2lnbmFsPigpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgc2VsZWN0ZWRJdGVtcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHNlbGVjdGVkSXRlbXNbaV0uaXRlbSBpbnN0YW5jZW9mIEN1cnNvclNpZ25hbCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBuZXdMaXN0LmluZGV4T2Yoc2VsZWN0ZWRJdGVtc1tpXS5pdGVtKTtcclxuICAgICAgICAgICAgICAgIGlmKGluZGV4ID09IC0xKXsgLy8gT25seSBhZGQgaWYgbm90IGFscmVhZHkgaW4gbGlzdFxyXG4gICAgICAgICAgICAgICAgICAgIG5ld0xpc3QucHVzaChzZWxlY3RlZEl0ZW1zW2ldLml0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoc2VsZWN0ZWRJdGVtc1tpXS5pdGVtIGluc3RhbmNlb2YgQ3Vyc29ySW5mbyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBuZXdMaXN0LmluZGV4T2Yoc2VsZWN0ZWRJdGVtc1tpXS5wYXJlbnRJdGVtLml0ZW0pO1xyXG4gICAgICAgICAgICAgICAgaWYoaW5kZXggPT0gLTEpeyAvLyBPbmx5IGFkZCBpZiBub3QgYWxyZWFkeSBpbiBsaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3TGlzdC5wdXNoKHNlbGVjdGVkSXRlbXNbaV0ucGFyZW50SXRlbS5pdGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3TGlzdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGN1cnNvciBpbmZvIHNlbGVjdG9yIGJ1dHRvbiBzdGF0ZSAoaWYgb25lIChvciBtb3JlKSBzaWduYWwgaXMgc2VsZWN0ZWQgdGhlIGJ1dHRvbiBpcyBlbmFibGVkKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVDdXJzb3JJbmZvU2VsZWN0b3JCdXR0b25TdGF0ZSgpe1xyXG4gICAgICAgIGxldCB0b29sYmFyID0gdGhpcy5fdG9vbGJhciBhcyBDdXJzb3JJbmZvVHJlZUdyaWRUb29sYmFyO1xyXG4gICAgICAgIGlmKHRoaXMuX3NlbGVjdGVkQ3Vyc29yU2lnbmFscyA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBubyBpdGVtcyBzZWxlY3RlZCBkZWFjdGl2YXRlIEZpbHRlciBidXR0b25cclxuICAgICAgICAgICAgdG9vbGJhci5kaXNhYmxlQ3Vyc29ySW5mb1NlbGVjdG9yQnV0dG9uKHRydWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLl9zZWxlY3RlZEN1cnNvclNpZ25hbHMubGVuZ3RoIDwgMSl7XHJcbiAgICAgICAgICAgIC8vIG5vIGl0ZW1zIHNlbGVjdGVkIGRlYWN0aXZhdGUgRmlsdGVyIGJ1dHRvblxyXG4gICAgICAgICAgICB0b29sYmFyLmRpc2FibGVDdXJzb3JJbmZvU2VsZWN0b3JCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRvb2xiYXIuZGlzYWJsZUN1cnNvckluZm9TZWxlY3RvckJ1dHRvbihmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiBkZWZpbml0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCk6IHt9e1xyXG4gICAgICAgIC8vIGFkZCBjaGVjayBib3ggc3RhdGUgaW5mb3JtYXRpb25cclxuICAgICAgICB2YXIgY2hlY2tCb3hTdGF0ZXMgPSBbXHJcbiAgICAgICAgICAgIHsgdGV4dDogXCJZZXNcIiwgdmFsdWU6IFwidHJ1ZVwiIH0sXHJcbiAgICAgICAgICAgIHsgdGV4dDogXCJOb1wiLCB2YWx1ZTogXCJmYWxzZVwiIH1cclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICAvLyByZXR1cm4gdGhlIGNvbHVtbiBkZWZpbml0aW9uc1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgeyBmaWVsZDogdGhpcy5fY29sdW1uSWRfVmlzaWJsZSwgaGVhZGVyVGV4dDogXCJWaXNpYmxlXCIsIHZpc2libGU6IGZhbHNlLCBhbGxvd0VkaXRpbmc6IGZhbHNlLCBpc1RlbXBsYXRlQ29sdW1uOiB0cnVlLCB0ZW1wbGF0ZUlEOiBcImNpVmlzaWJsZUNvbHVtblRlbXBsYXRlXCIsIGZpbHRlckVkaXRUeXBlOiBcImRyb3Bkb3duZWRpdFwiLCBkcm9wZG93bkRhdGE6IGNoZWNrQm94U3RhdGVzLCBhbGxvd0ZpbHRlcmluZ0JsYW5rQ29udGVudDogZmFsc2UsIHdpZHRoOiBcIjU1cHhcIn0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBmaWVsZDogdGhpcy5fY29sdW1uSWRfTmFtZSwgaGVhZGVyVGV4dDogXCJOYW1lXCIsIGFsbG93RWRpdGluZyA6IGZhbHNlLCBpc1RlbXBsYXRlQ29sdW1uOiB0cnVlLCB0ZW1wbGF0ZUlEOiBcImNpTmFtZUNvbHVtblRlbXBsYXRlXCJ9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgZmllbGQ6IHRoaXMuX2NvbHVtbklkX1ZhbHVlLCBoZWFkZXJUZXh0OiBcIlZhbHVlXCIsIGFsbG93RWRpdGluZyA6IGZhbHNlLCB3aWR0aDogXCIxNDBweFwiLCBpc1RlbXBsYXRlQ29sdW1uOiB0cnVlLCB0ZW1wbGF0ZTogXCI8ZGl2IHN0eWxlPSdwYWRkaW5nLWxlZnQ6IDIwcHgnIGlkPSdcIiArIHRoaXMubWFpbkRpdklkICsgQ1VSU09SX1ZBTFVFX0lEICsgXCJ7ezp1aUlkfX0nPjwvZGl2PlwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBmaWVsZDogdGhpcy5fY29sdW1uSWRfRGVzY3JpcHRpb24sIGhlYWRlclRleHQ6IFwiRGVzY3JpcHRpb25cIiwgIHZpc2libGU6IGZhbHNlLCBhbGxvd0VkaXRpbmcgOiBmYWxzZSwgd2lkdGg6IFwiMTQwcHhcIn0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBmaWVsZDogdGhpcy5fY29sdW1uSWRfSWNvbkRlZmluaXRpb24sIHZpc2libGU6IGZhbHNlLCB3aWR0aDogXCIwcHhcIiB9LFxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiByZXNpemUgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZENvbHVtblJlc2l6ZVN1cHBvcnQoKToge317XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYWxsb3dDb2x1bW5SZXNpemU6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbHVtblJlc2l6ZVNldHRpbmdzOiB7IGNvbHVtblJlc2l6ZU1vZGU6IGVqLlRyZWVHcmlkLkNvbHVtblJlc2l6ZU1vZGUuRml4ZWRDb2x1bW5zIH0sXHJcbiAgICAgICAgICAgIGNvbHVtblJlc2l6ZWQ6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkQ29sdW1uUmVzaXplZChhcmdzKSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCBjZWxsIGVkaXQgc2V0dGluZ3NcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHJldHVybnMge3t9fVxyXG5cdCAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBnZXRUcmVlR3JpZENlbGxFZGl0U3VwcG9ydCgpOiB7fXtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGVkaXRTZXR0aW5nczoge1x0XHJcbiAgICAgICAgICAgICAgICBhbGxvd0VkaXRpbmc6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzaG93RGVsZXRlQ29uZmlybURpYWxvZyAgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHNob3dDb25maXJtRGlhbG9nICA6IGZhbHNlIFxyXG4gICAgICAgICAgICB9LFxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgdG9vbGJhciBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpOiB7fXtcclxuICAgICAgICB0aGlzLl90b29sYmFyID0gbmV3IEN1cnNvckluZm9UcmVlR3JpZFRvb2xiYXIodGhpcy5tYWluRGl2KTtcclxuICAgICAgICByZXR1cm4gc3VwZXIuZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJlZUdyaWQgd2FzIGNyZWF0ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHRyZWVHcmlkQ3JlYXRlZCgpe1xyXG4gICAgICAgIHN1cGVyLnRyZWVHcmlkQ3JlYXRlZCgpO1xyXG5cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgdGhpcy5hdHRhY2hUb0NoZWNrQm94Q2hhbmdlZEV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRhY2ggY2hlY2sgYm94IGNoYW5nZWQgZXZlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXR0YWNoVG9DaGVja0JveENoYW5nZWRFdmVudCgpe1xyXG4gICAgICAgICQodGhpcy5tYWluRGl2KS5vbihcImNoYW5nZVwiLCBcIi5jdXN0b21DaGVja2JveFwiLCAoZSkgPT4gdGhpcy5jaGVja0JveENoYW5nZWQoZSkgKTtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkU3R5bGVzKCkge1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy9jdXJzb3JJbmZvV2lkZ2V0L3N0eWxlL2Nzcy9jdXJzb3JJbmZvU3R5bGVWMS5jc3NcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPY2N1cnMgb24gY2hlY2sgYm94IGNoYW5nZWQgZXZlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gZVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjaGVja0JveENoYW5nZWQoZSl7XHJcbiAgICAgICAgbGV0IGZpbHRlckRhdGFTb3VyY2UgPSB0aGlzLl9jdXJzb3JJbmZvVGVtcGxhdGVEYXRhTW9kZWw7XHJcblxyXG4gICAgICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcclxuICAgICAgICBsZXQgdGFyZ2V0RWxlID0gZS50YXJnZXQ7XHJcbiAgICAgICAgbGV0IGNoZWNrU3RhdHVzID0gJCh0YXJnZXRFbGUpLmlzKCc6Y2hlY2tlZCcpO1xyXG4gICAgICAgIC8vICQodGFyZ2V0RWxlKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAgICAgbGV0IHJlY29yZCA9IHRoaXMuZ2V0VHJlZVJlY29yZCh0YXJnZXRFbGUpO1xyXG4gICAgICAgIGlmKHJlY29yZCAhPSB1bmRlZmluZWQpeyAgICBcclxuICAgICAgICAgICAgaWYoY2hlY2tTdGF0dXMgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgcmVjb3JkLml0ZW0udmlzaWJsZSA9IFwiZmFsc2VcIjtcclxuICAgICAgICAgICAgICAgIHJlY29yZFtcInZpc2libGVcIl0gPSBcImZhbHNlXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldE11bHRpU2VsZWN0aW9uQ2hlY2tCb3hlcyhcImZhbHNlXCIsIHJlY29yZC5pbmRleCk7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHJlY29yZC5pdGVtLnZpc2libGUgPSBcInRydWVcIjtcclxuICAgICAgICAgICAgICAgIHJlY29yZFtcInZpc2libGVcIl0gPSBcInRydWVcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0TXVsdGlTZWxlY3Rpb25DaGVja0JveGVzKFwidHJ1ZVwiLCByZWNvcmQuaW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldE1vZGVsKGZpbHRlckRhdGFTb3VyY2UpO1xyXG5cclxuICAgICAgICAgICAgLy8gU2V0IHNlbGVjdGlvbiBhZnRlciBzZXR0aW5nIGNoZWNrYm94IGJlY2F1c2UgdGhleSBhcmUgbG9zdCBhZnRlciBzZXR0aW5nIGEgY2hlY2sgYm94XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0aW9uSW5DdXJzb3JJbmZvU2VsZWN0b3JWaWV3KHRoaXMuX3NlbGVjdGVkQ3Vyc29ySW5mb3NPbGQpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNoZWNrQm94ZXMoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBjdXJzb3IgaW5mbyB2aXNpYmlsaXRpZXMgaWYgc29tZXRoaW5nIGhhcyBjaGFuZ2VkXHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q3Vyc29ySW5mb1Zpc2liaWxpdGllcyh0aGlzLl9zZWxlY3RlZEN1cnNvclNpZ25hbHMsIHRoaXMuX2N1cnNvckluZm9UZW1wbGF0ZURhdGFNb2RlbFswXSk7XHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBkYXRhTW9kZWxcclxuICAgICAgICAgICAgdGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbCEuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSWYgbXVsdGkgc2VsZWN0aW9uIGlzIGFjdGl2ZSwgc2V0IGFsbCBzZWxlY3RlZCBpdGVtcyB0byB0aGUgZ2l2ZW4gc3RhdGUoY2hlY2tlZC91bmNoZWNrZWQpXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGFjdHVhbEluZGV4XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldE11bHRpU2VsZWN0aW9uQ2hlY2tCb3hlcyhzdGF0ZTogc3RyaW5nLCBhY3R1YWxJbmRleDogbnVtYmVyKXtcclxuICAgICAgICBsZXQgc2VsZWN0ZWRDdXJzb3JJbmZvcyA9IHRoaXMuX3NlbGVjdGVkQ3Vyc29ySW5mb3NPbGQ7XHJcbiAgICAgICAgaWYoc2VsZWN0ZWRDdXJzb3JJbmZvcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBTZXQvVW5zZXQgY2hlY2sgYm94ZXNcclxuICAgICAgICAgICAgbGV0IGluZGV4V2l0aGluTXVsdGlTZWxlY3Rpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0wOyBpIDwgc2VsZWN0ZWRDdXJzb3JJbmZvcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBpZihhY3R1YWxJbmRleCA9PSBzZWxlY3RlZEN1cnNvckluZm9zW2ldLmluZGV4KXtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleFdpdGhpbk11bHRpU2VsZWN0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYoaW5kZXhXaXRoaW5NdWx0aVNlbGVjdGlvbiA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ3Vyc29ySW5mb3MuZm9yRWFjaChjdXJzb3JJbmZvID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJzb3JJbmZvLml0ZW0udmlzaWJsZSA9IHN0YXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvckluZm9bXCJ2aXNpYmxlXCJdID0gc3RhdGU7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgLy8gT25seSBvbmUgY2hlY2tib3ggd2FzIGNsaWNrZWQgPT4gc2V0IHNlbGVjdGlvbiB0byB0aGUgbmV3IG9uZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRDdXJzb3JJbmZvc09sZCA9IHRoaXMuX3NlbGVjdGVkQ3Vyc29ySW5mb3NOZXc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cmVlR3JpZEFjdGlvbkJlZ2luKGFyZ3Mpe1xyXG4gICAgICAgIC8vIERvbid0IHN1cHBvcnQgXCJFbnRmL0RlbFwiIGtleVxyXG4gICAgICAgIGlmKGFyZ3MucmVxdWVzdFR5cGUgPT0gXCJkZWxldGVcIil7XHJcbiAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBIHRyZWVncmlkIGNvbHVtbiB3YXMgcmVzaXplZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdHJlZUdyaWRDb2x1bW5SZXNpemVkKGFyZ3Mpe1xyXG4gICAgICAgIHN1cGVyLnJlc2l6ZUR5bmFtaWNDb2x1bW4oYXJncy5jb2x1bW5JbmRleCwgYXJncy5tb2RlbCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2N1cnNvckluZm9TZWxlY3RvcklzQWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2hlY2tCb3hlcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBSZWZyZXNoIGN1cnNvciBpbmZvIHZhbHVlcyBhZnRlciByZXNpemUgKHRyZWVncmlkIHNldHMgdGhlIGRhdGEgdG8gXCIwXCIgYWZ0ZXIgcmVzaXplKVxyXG4gICAgICAgIHRoaXMucmVmcmVzaEN1cnNvclZhbHVlcygpO1xyXG5cclxuICAgICAgICAvLyBKdXN0IHBlcnNpc3QgY29sdW1uIHJlc2l6ZSB3aGVuIGZpbHRlciBpcyBjbG9zZWRcclxuICAgICAgICBpZiAoIXRoaXMuX2N1cnNvckluZm9TZWxlY3RvcklzQWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2F2ZVRyZWVHcmlkU2V0dGluZ3MoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHJlc2l6ZXMgdGhlIGN1cnNvciB2YWx1ZXMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICByZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlci5yZXNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2N1cnNvckluZm9TZWxlY3RvcklzQWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2hlY2tCb3hlcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBSZWZyZXNoIGN1cnNvciB2YWx1ZXMgYWZ0ZXIgcmVzaXplICh0cmVlZ3JpZCBzZXRzIHRoZSBkYXRhIHRvIFwiMFwiIGFmdGVyIHJlc2l6ZSlcclxuICAgICAgICB0aGlzLnJlZnJlc2hDdXJzb3JWYWx1ZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWN0aXZhdGVDdXJzb3JJbmZvU2VsZWN0b3JWaWV3KGFjdGl2YXRlOiBib29sZWFuKXtcclxuICAgICAgICAodGhpcy5fdG9vbGJhciBhcyBDdXJzb3JJbmZvVHJlZUdyaWRUb29sYmFyKS5hY3RpdmF0ZUN1cnNvckluZm9TZWxlY3RvclZpZXcoYWN0aXZhdGUpO1xyXG5cclxuICAgICAgICBpZihhY3RpdmF0ZSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgdGhpcy5zaG93Q3Vyc29ySW5mb1NlbGVjdG9yVmlldygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLnNob3dDdXJzb3JTaWduYWxzVmlldygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHRvb2xiYXIgYnV0dG9uIHBvc2l0aW9ucyhlLmcuIHBvc2l0aW9uIG9mIHJpZ2h0IGFsaWduIHRvb2xiYXIpIGFmdGVyIGhpZGUgb3Igc2hvdyB0b29sYmFyIGJ1dHRvblxyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIucmVzaXplKHRoaXMud2lkdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2hvd3MgdGhlIGN1cnNlciBzaWduYWxzIHdpdGggdGhlIGZpbHRlcmVkL2RlZmluZWQgY3Vyc29yIGluZm9ybWF0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2hvd0N1cnNvclNpZ25hbHNWaWV3KCl7XHJcbiAgICAgICAgdGhpcy5fY3Vyc29ySW5mb1NlbGVjdG9ySXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zZWxlY3RlZEN1cnNvckluZm9zT2xkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkQ3Vyc29ySW5mb3NOZXcgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIC8vIFNob3cgYWN0dWFsIGN1cnNvckluZm8gZGF0YVxyXG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG5cclxuICAgICAgICAvLyBTZXRzIHRoZSBjb2x1bW4gdmlzaWJpbGl0aWVzXHJcbiAgICAgICAgbGV0IHRyZWVHcmlkT2JqZWN0ID0gc3VwZXIuZ2V0VHJlZUdyaWRPYmplY3QoKTsgIFxyXG4gICAgICAgIHRoaXMuc2V0Q29sdW1uVmlzaWJsaXRpZXModHJlZUdyaWRPYmplY3QsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgLy8gc2V0IHRoZSBzZWxlY3Rpb24gdG8gc3RhdGUgYmVmb3JlIHN3aXRjaGluZyB0byB0aGUgY3Vyc29yIGluZm8gc2VsZWN0b3Igdmlld1xyXG4gICAgICAgIHRoaXMuc2V0U2VsZWN0aW9uV2l0aEN1cnNvclNpZ25hbHModHJlZUdyaWRPYmplY3QsIHRoaXMuX3NlbGVjdGVkQ3Vyc29yU2lnbmFscyk7XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgZHluYW1pYyBjb2x1bW4gc2l6ZSBhZnRlciBoaWRlL3Nob3cgb2Ygc29tZSBjb2x1bW5zXHJcbiAgICAgICAgdGhpcy5yZXNpemVEeW5hbWljQ29sdW1uKDAsIHRyZWVHcmlkT2JqZWN0Lm1vZGVsKTtcclxuXHJcbiAgICAgICAgLy8gcmVmcmVzaCB0aGUgY3Vyc29yIGluZm8gdmFsdWVzXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQ3Vyc29yVmFsdWVzKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogU2hvd3MgdGhlIGN1cnNvciBpbmZvIHNlbGVjdG9yIHZpZXdcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNob3dDdXJzb3JJbmZvU2VsZWN0b3JWaWV3KCl7XHJcbiAgICAgICAgdGhpcy5fY3Vyc29ySW5mb1NlbGVjdG9ySXNBY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICAvLyBSZXNldCBjdXJzb3IgaW5mbyB0ZW1wbGF0ZSBkYXRhbW9kZWxcclxuICAgICAgICB0aGlzLl9jdXJzb3JJbmZvVGVtcGxhdGVEYXRhTW9kZWwuc3BsaWNlKDAsIHRoaXMuX2N1cnNvckluZm9UZW1wbGF0ZURhdGFNb2RlbC5sZW5ndGgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGNyZWF0ZSBhIHNpZ25hbCB0ZW1wbGF0ZSBiYXNlZCBvbiB0aGUgc2VsZWN0ZWQgc2VyaWVzXHJcbiAgICAgICAgbGV0IHRlbXBsYXRlQ3Vyc29yU2lnbmFsID0gbmV3IER5bmFtaWNDdXJzb3JTaWduYWxUZW1wbGF0ZSh0aGlzLl9zZWxlY3RlZEN1cnNvclNpZ25hbHMpXHJcblxyXG4gICAgICAgIC8vIGFkZCB0aGUgc2lnbmFsIHRlbXBsYXRlIHRvIHRoZSBtb2RlbFxyXG4gICAgICAgIHRoaXMuX2N1cnNvckluZm9UZW1wbGF0ZURhdGFNb2RlbC5wdXNoKHRlbXBsYXRlQ3Vyc29yU2lnbmFsKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBTZXQgY3Vyc29yIGluZm8gdGVtcGxhdGUgdmlzaWJpbGl0aWVzXHJcbiAgICAgICAgdGhpcy51cGRhdGVUZW1wbGF0ZVZpc2liaWxpdGllcyh0aGlzLl9zZWxlY3RlZEN1cnNvclNpZ25hbHMsIHRlbXBsYXRlQ3Vyc29yU2lnbmFsKTtcclxuICAgICAgIFxyXG4gICAgICAgIC8vIHNob3cgY3Vyc29yIGluZm8gdGVtcGxhdGUgZGF0YW1vZGVsICh0aGUgcG9zc2libGUgY3Vyc29yIGluZm9zKVxyXG4gICAgICAgIHRoaXMudXBkYXRlRGF0YVNvdXJjZSg8YW55PnRoaXMuX2N1cnNvckluZm9UZW1wbGF0ZURhdGFNb2RlbCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gU2V0cyB0aGUgY29sdW1uIHZpc2liaWxpdGllc1xyXG4gICAgICAgIGxldCB0cmVlR3JpZE9iamVjdCA9IHN1cGVyLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcbiAgICAgICAgdGhpcy5zZXRDb2x1bW5WaXNpYmxpdGllcyh0cmVlR3JpZE9iamVjdCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgZHluYW1pYyBjb2x1bW4gc2l6ZSBhZnRlciBoaWRlL3Nob3cgb2Ygc29tZSBjb2x1bW5zXHJcbiAgICAgICAgdGhpcy5yZXNpemVEeW5hbWljQ29sdW1uKDAsIHRyZWVHcmlkT2JqZWN0Lm1vZGVsKTtcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlcyB0aGUgZmlsdGVyIG9mIHRoZSB2aXNpYmlsaXR5IGZsYWcgd2hpY2ggaXMgbmVlZGVkIGluIHRoZSBjdXJzb3Igc2lnbmFsIHZpZXdcclxuICAgICAgICB0cmVlR3JpZE9iamVjdC5jbGVhckZpbHRlcih0aGlzLl9jb2x1bW5JZF9WaXNpYmxlKTtcclxuXHJcbiAgICAgICAgLy8gQ29udmVydCBjdXN0b20gY2hlY2sgYm94ZXMgaW50byBzeW5jZnVzaW9uIGNoZWNrIGJveGVzXHJcbiAgICAgICAgdGhpcy51cGRhdGVDaGVja0JveGVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjb2x1bW4gdmlzaWJpbGl0aWVzIGZvciB0aGUgY3Vyc29yIGluZm8gc2VsZWN0b3IgdmlldyBvciB0aGUgY3Vyc29yIHNpZ25hbHMgdmlld1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHRyZWVHcmlkT2JqZWN0XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGN1cnNvckluZm9TZWxlY3RvclZpZXdcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0Q29sdW1uVmlzaWJsaXRpZXModHJlZUdyaWRPYmplY3QsIGN1cnNvckluZm9TZWxlY3RvclZpZXc6Ym9vbGVhbil7XHJcbiAgICAgICAgLy8gZ2V0IG5lZWRlZCBjb2x1bW5zXHJcbiAgICAgICAgbGV0IHZpc2libGVDb2x1bW4gPSB0cmVlR3JpZE9iamVjdC5nZXRDb2x1bW5CeUZpZWxkKHRoaXMuX2NvbHVtbklkX1Zpc2libGUpO1xyXG4gICAgICAgIGxldCBkZXNjcmlwdGlvbkNvbHVtbiA9IHRyZWVHcmlkT2JqZWN0LmdldENvbHVtbkJ5RmllbGQodGhpcy5fY29sdW1uSWRfRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIGxldCB2YWx1ZUNvbHVtbiA9IHRyZWVHcmlkT2JqZWN0LmdldENvbHVtbkJ5RmllbGQodGhpcy5fY29sdW1uSWRfVmFsdWUpO1xyXG5cclxuICAgICAgICBpZihjdXJzb3JJbmZvU2VsZWN0b3JWaWV3ID09IGZhbHNlKXtcclxuICAgICAgICAgICAgLy8gSGlkZSB2aXNpYmxlIGNvbHVtblxyXG4gICAgICAgICAgICB0cmVlR3JpZE9iamVjdC5oaWRlQ29sdW1uKHZpc2libGVDb2x1bW4uaGVhZGVyVGV4dCk7XHJcblxyXG4gICAgICAgICAgICAvLyBIaWRlIGRlc2NyaXB0aW9uIGNvbHVtblxyXG4gICAgICAgICAgICB0cmVlR3JpZE9iamVjdC5oaWRlQ29sdW1uKGRlc2NyaXB0aW9uQ29sdW1uLmhlYWRlclRleHQpO1xyXG5cclxuICAgICAgICAgICAgLy8gU2hvdyB2YWx1ZSBjb2x1bW5cclxuICAgICAgICAgICAgdHJlZUdyaWRPYmplY3Quc2hvd0NvbHVtbih2YWx1ZUNvbHVtbi5oZWFkZXJUZXh0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgLy8gU2hvdyB2aXNpYmxlIGNvbHVtblxyXG4gICAgICAgICAgICB0cmVlR3JpZE9iamVjdC5zaG93Q29sdW1uKHZpc2libGVDb2x1bW4uaGVhZGVyVGV4dCk7XHJcblxyXG4gICAgICAgICAgICAvLyBTaG93IGRlc2NyaXB0aW9uIGNvbHVtblxyXG4gICAgICAgICAgICB0cmVlR3JpZE9iamVjdC5zaG93Q29sdW1uKGRlc2NyaXB0aW9uQ29sdW1uLmhlYWRlclRleHQpO1xyXG5cclxuICAgICAgICAgICAgLy8gSGlkZSB2YWx1ZSBjb2x1bW5cclxuICAgICAgICAgICAgdHJlZUdyaWRPYmplY3QuaGlkZUNvbHVtbih2YWx1ZUNvbHVtbi5oZWFkZXJUZXh0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBzZWxlY3Rpb24gdG8gdGhlIGdpdmVuIHNlbGVjdGlvbiBvYmplY3RzIGluIGN1cnNvciBpbmZvIHNlbGVjdG9yIHZpZXdcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxhbnk+fSBzZWxlY3RlZE9iamVjdHNcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0U2VsZWN0aW9uSW5DdXJzb3JJbmZvU2VsZWN0b3JWaWV3KHNlbGVjdGVkT2JqZWN0cykge1xyXG4gICAgICAgIGlmIChzZWxlY3RlZE9iamVjdHMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB0cmVlR3JpZE9iamVjdDogYW55ID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG4gICAgICAgIHRyZWVHcmlkT2JqZWN0LmNsZWFyU2VsZWN0aW9uKCk7XHJcbiAgICAgICAgaWYgKHNlbGVjdGVkT2JqZWN0cy5sZW5ndGggIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgc2VsZWN0ZWRPYmplY3RzLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgdHJlZUdyaWRPYmplY3QuX211bHRpU2VsZWN0Q3RybFJlcXVlc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbGV0IHZpc2libGVJbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgdHJlZUdyaWRPYmplY3QubW9kZWwuZmxhdFJlY29yZHMubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRyZWVHcmlkT2JqZWN0Lm1vZGVsLmZsYXRSZWNvcmRzW2pdLmlkID09IHNlbGVjdGVkT2JqZWN0c1tpXS5pZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmVlR3JpZE9iamVjdC5zZWxlY3RSb3dzKHZpc2libGVJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGVJbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0cmVlR3JpZE9iamVjdC5zZWxlY3RSb3dzKHNlbGVjdGVkT2JqZWN0cy5pbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFNldCBhY3R1YWwgc2VsZWN0aW9uIGZvciBsYXRlciB1c2UgXHJcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRDdXJzb3JJbmZvc09sZCA9IHNlbGVjdGVkT2JqZWN0cztcclxuICAgICAgICB0aGlzLl9zZWxlY3RlZEN1cnNvckluZm9zTmV3ID0gc2VsZWN0ZWRPYmplY3RzO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHNlbGVjdGlvbiB0byB0aGUgZ2l2ZW4gY3Vyc29yIHNpZ25hbHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSB0cmVlR3JpZE9iamVjdFxyXG4gICAgICogQHBhcmFtIHtBcnJheTxDdXJzb3JTaWduYWw+fSBjdXJzb3JTaWduYWxzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldFNlbGVjdGlvbldpdGhDdXJzb3JTaWduYWxzKHRyZWVHcmlkT2JqZWN0LCBjdXJzb3JTaWduYWxzOiBBcnJheTxDdXJzb3JTaWduYWw+KSB7XHJcbiAgICAgICAgLy8gZGVzZWxlY3QgYWxsIHNlbGVjdGlvbnMgaW4gY3Vyc29yIHNpZ25hbHMgdmlld1xyXG4gICAgICAgIHRyZWVHcmlkT2JqZWN0LmNsZWFyU2VsZWN0aW9uKCk7XHJcblxyXG4gICAgICAgIGlmKGN1cnNvclNpZ25hbHMgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgY3Vyc29yU2lnbmFscy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgdHJlZUdyaWRPYmplY3QuX211bHRpU2VsZWN0Q3RybFJlcXVlc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgdmlzaWJsZUluZGV4ID0gMDtcclxuICAgICAgICAgICAgbGV0IG1vZGVsID0gdHJlZUdyaWRPYmplY3QubW9kZWw7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBtb2RlbC5mbGF0UmVjb3Jkcy5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgICAgICBpZihtb2RlbC5mbGF0UmVjb3Jkc1tqXS5pdGVtID09IGN1cnNvclNpZ25hbHNbaV0pe1xyXG4gICAgICAgICAgICAgICAgICAgIHRyZWVHcmlkT2JqZWN0LnNlbGVjdFJvd3ModmlzaWJsZUluZGV4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKG1vZGVsLmZsYXRSZWNvcmRzW2pdLnZpc2libGUgIT0gXCJmYWxzZVwiKXtcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlSW5kZXgrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgdmlzaWJsZSBmbGFncyBpbiB0aGUgdGVtcGxhdGUgY3Vyc29yIHNpZ25hbCB0byB0aGUgaW5mb3JtYXRpb25zIGZyb20gdGhlIGN1cnNvciBzaWduYWxzXHJcbiAgICAgKiAoZS5nLiBhbGwgc2lnbmFscyBzaG93IHkxIGN1cnNvciBpbmZvIHNvIHRoZXJlZm9yZSB0ZW1wbGF0ZSBjdXJzb3IgaW5mbyB2aXNpYmlsaXR5IGlzIHNldCB0byBcInRydWVcIjtcclxuICAgICAqICAgICAgIGFsbCBzaWduYWxzIGRvc24ndCBzaG93IHkxIGN1cnNvciBpbmZvIHNvIHRoZXJlZm9yZSB0ZW1wbGF0ZSBjdXJzb3IgaW5mbyB2aXNpYmlsaXR5IGlzIHNldCB0byBcImZhbHNlXCI7XHJcbiAgICAgKiAgICAgICBzb21lIHNpZ25hbHMgc2hvdyB5MSBjdXJzb3IgaW5mbyBzbyB0aGVyZWZvcmUgdGVtcGxhdGUgY3Vyc29yIGluZm8gdmlzaWJpbGl0eSBpcyBzZXQgdG8gXCJpbmRldGVybWluYXRlXCI7XHJcbiAgICAgKiApXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8Q3Vyc29yU2lnbmFsPn0gY3Vyc29yU2lnbmFsc1xyXG4gICAgICogQHBhcmFtIHtEeW5hbWljQ3Vyc29yU2lnbmFsVGVtcGxhdGV9IHRlbXBsYXRlQ3Vyc29yU2lnbmFsXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVUZW1wbGF0ZVZpc2liaWxpdGllcyhjdXJzb3JTaWduYWxzOiBBcnJheTxDdXJzb3JTaWduYWw+LCB0ZW1wbGF0ZUN1cnNvclNpZ25hbDogRHluYW1pY0N1cnNvclNpZ25hbFRlbXBsYXRlKSB7XHJcbiAgICAgICAgaWYgKHRlbXBsYXRlQ3Vyc29yU2lnbmFsICYmIHRlbXBsYXRlQ3Vyc29yU2lnbmFsLmN1cnNvckluZm9zKSB7XHJcbiAgICAgICAgICAgIC8vIGZvciBhbGwgYXZhaWxhYmxlIG1lcmdlZCBjdXJzb3IgaW5mb3NcclxuICAgICAgICAgICAgdGVtcGxhdGVDdXJzb3JTaWduYWwuY3Vyc29ySW5mb3MuZm9yRWFjaCgodGVtcGxhdGVDdXJzb3JTaWduYWxJbmZvKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gY2xlYXIgZXhpc3RpbmcgdmlzaWJpbGl0eVxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVDdXJzb3JTaWduYWxJbmZvLnZpc2libGUgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgY3Vyc29yIGluZm9zIGJ5IGlkXHJcbiAgICAgICAgICAgICAgICBsZXQgbWF0Y2hpbmdDdXJzb3JJbmZvczogQXJyYXk8Q3Vyc29ySW5mbz4gPSB0aGlzLnJldHJpZXZDdXJzb3JJbmZvc0J5SWQoY3Vyc29yU2lnbmFscywgdGVtcGxhdGVDdXJzb3JTaWduYWxJbmZvLmlkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBmb3IgYWxsIHNlbGVjdGVkIGN1cnNvciBzaWduYWxzIHdpdGggbWF0Y2hpbmcgaWQgLi4uXHJcbiAgICAgICAgICAgICAgICBtYXRjaGluZ0N1cnNvckluZm9zLmZvckVhY2goKGN1cnNvclNpZ25hbEluZm8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgdmlzaWJpbGl0eSBpcyB5ZXQgdW5kZWZpbmVkIC4uXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0ZW1wbGF0ZUN1cnNvclNpZ25hbEluZm8udmlzaWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpbml0aWFsaXplIHRoZSB2aXNpYmlsaXR5IHdpdGggdGhlIGZpcnN0IGN1cnNvciBzaWduYWwgaW5mb3MgdmFsdWUuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlQ3Vyc29yU2lnbmFsSW5mby52aXNpYmxlID0gY3Vyc29yU2lnbmFsSW5mby52aXNpYmxlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNldCB2aXNpYmlsaXR5IHRvIHVuZGV0ZXJtaW5lZCBpZiBvbmUgb2YgdGhlIGZvbGxvd2luZyB2YWx1ZXMgaXMgZGlmZmVyZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJzb3JTaWduYWxJbmZvLnZpc2libGUgIT09IHRlbXBsYXRlQ3Vyc29yU2lnbmFsSW5mby52aXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZUN1cnNvclNpZ25hbEluZm8udmlzaWJsZSA9IHRoaXMuX2luZGV0ZXJtaW5hdGVTdGF0ZVZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB2aXNpYmlsaXR5IGRlZmluZWQgaW4gdGhlIHRlbXBsYXRlIGN1cnNvciBzaWduYWwgdG8gdGhlIGN1cnNvciBzaWduYWxzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8Q3Vyc29yU2lnbmFsPn0gY3Vyc29yU2lnbmFsc1xyXG4gICAgICogQHBhcmFtIHtEeW5hbWljQ3Vyc29yU2lnbmFsVGVtcGxhdGV9IHRlbXBsYXRlQ3Vyc29yU2lnbmFsXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRDdXJzb3JJbmZvVmlzaWJpbGl0aWVzKGN1cnNvclNpZ25hbHM6IEFycmF5PEN1cnNvclNpZ25hbD4sIHRlbXBsYXRlQ3Vyc29yU2lnbmFsOiBEeW5hbWljQ3Vyc29yU2lnbmFsVGVtcGxhdGUpIHtcclxuICAgICAgICBpZiAodGVtcGxhdGVDdXJzb3JTaWduYWwgJiYgdGVtcGxhdGVDdXJzb3JTaWduYWwuY3Vyc29ySW5mb3MpIHtcclxuICAgICAgICAgICAgLy8gZm9yIGFsbCBhdmFpbGFibGUgbWVyZ2VkIGN1cnNvciBpbmZvc1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZUN1cnNvclNpZ25hbC5jdXJzb3JJbmZvcy5mb3JFYWNoKCh0ZW1wbGF0ZUN1cnNvclNpZ25hbEluZm8pID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGVtcGxhdGVDdXJzb3JTaWduYWxJbmZvLnZpc2libGUgIT09IHRoaXMuX2luZGV0ZXJtaW5hdGVTdGF0ZVZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBjdXJzb3IgaW5mb3MgYnkgaWRcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWF0Y2hpbmdDdXJzb3JJbmZvczogQXJyYXk8Q3Vyc29ySW5mbz4gPSB0aGlzLnJldHJpZXZDdXJzb3JJbmZvc0J5SWQoY3Vyc29yU2lnbmFscywgdGVtcGxhdGVDdXJzb3JTaWduYWxJbmZvLmlkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZm9yIGFsbCBzZWxlY3RlZCBjdXJzb3IgaW5mb3Mgd2l0aCBtYXRjaGluZyBpZCAuLi5cclxuICAgICAgICAgICAgICAgICAgICBtYXRjaGluZ0N1cnNvckluZm9zLmZvckVhY2goKGN1cnNvclNpZ25hbEluZm8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2V0IHRoZSBjdXJzb3Igc2lnbmFscyB2aXNpYmlsaXR5IGZyb20gdGhlIHRlbXBsYXRlIHZhbHVlIGlmIGEgdmFsaWQgc3RhdGUgaXMgZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3JTaWduYWxJbmZvLnZpc2libGUgPSB0ZW1wbGF0ZUN1cnNvclNpZ25hbEluZm8udmlzaWJsZTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgdGhlIGN1cnNvciBpbmZvcyB3aXRoIHRoZSBzcGVjaWZpZWQgaWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxDdXJzb3JTaWduYWw+fSBjdXJzb3JTaWduYWxzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY3Vyc29ySW5mb0lkXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8Q3Vyc29ySW5mbz59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJldHJpZXZDdXJzb3JJbmZvc0J5SWQoY3Vyc29yU2lnbmFsczogQXJyYXk8Q3Vyc29yU2lnbmFsPiwgY3Vyc29ySW5mb0lkOiBzdHJpbmcpOiBBcnJheTxDdXJzb3JJbmZvPiB7XHJcbiAgICAgICAgbGV0IG1hdGNoaW5nQ3Vyc29ySW5mb3M6IEFycmF5PEN1cnNvckluZm8+ID0gW107XHJcbiAgICAgICAgY3Vyc29yU2lnbmFscy5mb3JFYWNoKChjdXJzb3JTaWduYWwpID0+IHtjdXJzb3JTaWduYWwuY3Vyc29ySW5mb3MuZm9yRWFjaCgoY3Vyc29yU2lnbmFsSW5mbykgPT4geyBcclxuICAgICAgICAgICAgICAgIGlmIChjdXJzb3JTaWduYWxJbmZvLmlkID09PSBjdXJzb3JJbmZvSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXRjaGluZ0N1cnNvckluZm9zLnB1c2goY3Vyc29yU2lnbmFsSW5mbyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gbWF0Y2hpbmdDdXJzb3JJbmZvcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJhaXNlcyB0aGUgbW92ZSBjdXJzb3IgZXZlbnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3Vyc29ySW5kZXhcclxuICAgICAqIEBwYXJhbSB7Q3Vyc29yTW92ZW1lbnR9IG1vdmVtZW50XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25Nb3ZlQ3Vyc29yKGN1cnNvckluZGV4OiBudW1iZXIsIG1vdmVtZW50OiBDdXJzb3JNb3ZlbWVudCkge1xyXG4gICAgICAgIGxldCBkYXRhOiBCYXNlU2VyaWVzIFtdID0gW107XHJcblxyXG4gICAgICAgIGxldCB4ID0gdGhpcy5jdXJzb3JzU3RhdGVzLmdldFBvc2l0aW9uKGN1cnNvckluZGV4LCB0aGlzLmN1cnNvcnNTdGF0ZXMuZ2V0TGFzdEN1cnNvclR5cGVTZWxlY3RlZCgpKTtcclxuICAgICAgICBpZih0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBjdXJzb3JzID0gdGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbC5nZXRDdXJzb3JTaWduYWxzKCk7XHJcbiAgICAgICAgICAgIGN1cnNvcnMuZm9yRWFjaChjdXJzb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGF0YS5wdXNoKGN1cnNvci5zZXJpZSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmKHggIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZUN1cnNvcihjdXJzb3JJbmRleCwgbW92ZW1lbnQsIGRhdGEsIHgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbW92ZXMgdGhlIGN1cnNvciBmb3IgdGhlIHNwZWNpZmllZCBkaXJlY3Rpb24gYW5kIG9mZnNldFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3Vyc29ySW5kZXhcclxuICAgICAqIEBwYXJhbSB7Q3Vyc29yTW92ZW1lbnR9IGN1cnNvck1vdmVtZW50XHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXNbXX0gc2VyaWVzXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3Vyc29yUG9zaXRpb25cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbW92ZUN1cnNvcihjdXJzb3JJbmRleDogbnVtYmVyLCBjdXJzb3JNb3ZlbWVudDpDdXJzb3JNb3ZlbWVudCxzZXJpZXM6QmFzZVNlcmllc1tdLGN1cnNvclBvc2l0aW9uOm51bWJlcikge1xyXG5cclxuICAgICAgICBsZXQgY3Vyc29yVHlwZTogQ3Vyc29yVHlwZSA9IHRoaXMuY3Vyc29yc1N0YXRlcy5nZXRMYXN0Q3Vyc29yVHlwZVNlbGVjdGVkKCk7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBuZXh0IHBvc3NpYmxlIGN1cnNvciB0aW1lc3RhbXBcclxuICAgICAgICBsZXQgbmVhcmVzdFRpbWVzdGFtcCA9IHRoaXMuZmluZE5lYXJlc3RUaW1lc3RhbXBJblNlcmllcyhzZXJpZXMsIGN1cnNvclBvc2l0aW9uLCBjdXJzb3JNb3ZlbWVudCwgY3Vyc29yVHlwZSk7XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgY3Vyc29ycyB0aW1lc3RhbXAgbG9jYXRpb25cclxuICAgICAgICB0aGlzLnVwZGF0ZUN1cnNvckxvY2F0aW9uKGN1cnNvckluZGV4LCBuZWFyZXN0VGltZXN0YW1wKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHNlYXJjaGVzIHRoZSBuZXh0IHRpbWVzdGFtcCBpbiBhbGwgYXZhaWxhYmxlIHNlcmllcy4gVGhlIHBpY2tlZCB2YWx1ZSB0YWtlcyB0aGUgbW92ZW1lbnQgZGlyZWN0aW9uIGludG9pIGFjY291bnQuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc1tdfSBzZXJpZXNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJzb3JUaW1lU3RhbXBcclxuICAgICAqIEBwYXJhbSB7Q3Vyc29yTW92ZW1lbnR9IGN1cnNvck1vdmVtZW50XHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBmaW5kTmVhcmVzdFRpbWVzdGFtcEluU2VyaWVzKHNlcmllczogQmFzZVNlcmllc1tdLCBjdXJzb3JUaW1lU3RhbXA6IG51bWJlciwgY3Vyc29yTW92ZW1lbnQ6IEN1cnNvck1vdmVtZW50LCBjdXJzb3JUeXBlOiBDdXJzb3JUeXBlKTogbnVtYmVyIHtcclxuICAgICAgICAvLyByZXRyaWV2ZSB0aGUgdGltZXN0YW1wcyBzZXJpZXMgZnJvbSB0aGUgc2lnbmFsIHNlcmllc1xyXG4gICAgICAgIGxldCB0aW1lc3RhbXBTZXJpZXMgPSBzZXJpZXMubWFwKChzaW5nbGVTZXJpZXMpID0+IHsgXHJcbiAgICAgICAgICAgIGlmIChDdXJzb3JUeXBlSGVscGVyLmdldEN1cnNvclR5cGVGb3JTZXJpZXMoc2luZ2xlU2VyaWVzKSA9PSBjdXJzb3JUeXBlKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzaW5nbGVTZXJpZXMudGltZXN0YW1wczsgXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IG5leHROZWFyZXN0VGltZVN0YW1wID0gY3Vyc29yVGltZVN0YW1wO1xyXG5cclxuICAgICAgICAvLyBkcGVuZGl1bmcgb24gbW92ZW1lbnQgZGlyZWN0aW9uIHdlIHBpY2sgdGhlIG5leHQgcG9zc2libGUgdGltZSBzdGFtcFxyXG4gICAgICAgIHN3aXRjaCAoY3Vyc29yTW92ZW1lbnQpIHtcclxuICAgICAgICAgICAgY2FzZSBDdXJzb3JNb3ZlbWVudC5SaWdodDpcclxuICAgICAgICAgICAgICAgIG5leHROZWFyZXN0VGltZVN0YW1wID0gU2VyaWVzSGVscGVyLmZpbmROZWFyZXN0VmFsdWVGcm9tQ29sbGVjdGlvbihjdXJzb3JUaW1lU3RhbXAsIHRpbWVzdGFtcFNlcmllcywgU2VhcmNoTW9kZS5ORVhUVVBQRVIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ3Vyc29yTW92ZW1lbnQuTGVmdDpcclxuICAgICAgICAgICAgICAgIG5leHROZWFyZXN0VGltZVN0YW1wID0gU2VyaWVzSGVscGVyLmZpbmROZWFyZXN0VmFsdWVGcm9tQ29sbGVjdGlvbihjdXJzb3JUaW1lU3RhbXAsIHRpbWVzdGFtcFNlcmllcywgU2VhcmNoTW9kZS5QUkVWSU9VU0xPV0VSKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV4dE5lYXJlc3RUaW1lU3RhbXA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgY3Vyc29yIGFjdGl2YXRpb24vc2VsZWN0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN1cnNvckluZGV4XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25SZWZlcmVuY2VDdXJzb3JTZWxlY3RlZChjdXJzb3JJbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBjdXJzb3Igc2VsZWN0aW9uIHN0YXRlXHJcbiAgICAgICAgdGhpcy5jdXJzb3JzU3RhdGVzLnNldFNlbGVjdGVkKGN1cnNvckluZGV4LCB0cnVlKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlQ3Vyc29yU3RhdGVzKHRoaXMuY3Vyc29yc1N0YXRlcyk7XHJcblxyXG4gICAgICAgIC8vIHNldCB0aGUgY3Vyc29ycyBhcyBhY3RpdmUgdG9vbFxyXG4gICAgICAgIGxldCB0b29sc3RhdGU6IENoYXJ0Vmlld1Rvb2xTdGF0ZSA9IHRoaXMuc3RhdGVzLnJlYWQoQ2hhcnRWaWV3VG9vbFN0YXRlLFwiQ2hhcnRWaWV3VG9vbFN0YXRlXCIpO1xyXG4gICAgICAgIHRvb2xzdGF0ZS5zZWxlY3RlZFRvb2wgPSBDaGFydFZpZXdUb29sU3RhdGVFbnVtLkNVUlNPUlM7XHJcbiAgICAgICAgdGhpcy5zdGF0ZXMudXBkYXRlKHRoaXMsQ2hhcnRWaWV3VG9vbFN0YXRlLCB0b29sc3RhdGUsXCJDaGFydFZpZXdUb29sU3RhdGVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgc2lnbmFsIHRvIHRoZSBjdXJzb3IgaW5mbyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEJhc2VTZXJpZXM+fSBzZXJpZXNcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRTZXJpZXMoc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPil7XHJcbiAgICAgICAgbGV0IGN1cnNvclNpZ25hbHMgPSBuZXcgQXJyYXk8Q3Vyc29yU2lnbmFsPigpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VyaWVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYgKHNlcmllc1tpXS50eXBlID09PSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMpIHtcclxuICAgICAgICAgICAgICAgIGN1cnNvclNpZ25hbHMucHVzaChuZXcgWVRDdXJzb3JTaWduYWwoc2VyaWVzW2ldLCBmYWxzZSkpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNlcmllc1tpXS50eXBlID09PSBTZXJpZXNUeXBlLnh5U2VyaWVzKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3JTaWduYWxzLnB1c2gobmV3IFhZQ3Vyc29yU2lnbmFsKHNlcmllc1tpXSwgZmFsc2UpKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzZXJpZXNbaV0udHlwZSA9PT0gU2VyaWVzVHlwZS5mZnRTZXJpZXMpIHtcclxuICAgICAgICAgICAgICAgIGN1cnNvclNpZ25hbHMucHVzaChuZXcgRkZUQ3Vyc29yU2lnbmFsKHNlcmllc1tpXSwgZmFsc2UpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwuYWRkU2lnbmFsKGN1cnNvclNpZ25hbHMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZSBhIGN1cnNvciBzaWduYWwgZnJvbSB0aGUgY3Vyc29yIGluZm8gd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlbW92ZVNlcmllKHNlcmllOiBCYXNlU2VyaWVzKXtcclxuICAgICAgICBpZih0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBjdXJzb3JTaWduYWwgPSB0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsLmdldEN1cnNvclNpZ25hbChzZXJpZSk7XHJcbiAgICAgICAgICAgIGlmKGN1cnNvclNpZ25hbCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsLnJlbW92ZVNlcmllKGN1cnNvclNpZ25hbCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIERpc2FibGVzIGZpbHRlciBidXR0b24gaWYgaXMgYWN0aXZlXHJcbiAgICAgICAgICAgICAgICBsZXQgdG9vbGJhciA9IHRoaXMuX3Rvb2xiYXIgYXMgQ3Vyc29ySW5mb1RyZWVHcmlkVG9vbGJhcjtcclxuICAgICAgICAgICAgICAgIGlmKHRvb2xiYXIuY3Vyc29ySW5mb1NlbGVjdGlvbklzQWN0aXZlKXtcclxuICAgICAgICAgICAgICAgICAgICB0b29sYmFyLmFjdGl2YXRlQ3Vyc29ySW5mb1NlbGVjdG9yVmlldyghdG9vbGJhci5jdXJzb3JJbmZvU2VsZWN0aW9uSXNBY3RpdmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmVzIHRoZSBjdXJzb3Igc2lnbmFsIGZyb20gdGhlIGN1cnJlbnQgc2VsZWN0aW9uIGxpc3QgYW5kIHVwZGF0ZXMgdGhlIHRvb2xiYXIgYnV0dG9uXHJcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLl9zZWxlY3RlZEN1cnNvclNpZ25hbHMuaW5kZXhPZihjdXJzb3JTaWduYWwpO1xyXG4gICAgICAgICAgICAgICAgaWYoaW5kZXggIT0gLTEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkQ3Vyc29yU2lnbmFscy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ3Vyc29ySW5mb1NlbGVjdG9yQnV0dG9uU3RhdGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNoYW5nZXMgYW5kIHVwZGF0ZXMgdGhlIGN1cnNvciBsb2NhdGlvbiBvZiB0aGUgc2VsZWN0ZWQgY3Vyc29yXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN1cnNvckluZGV4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3Vyc29yVGltZXN0YW1wXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlQ3Vyc29yTG9jYXRpb24oY3Vyc29ySW5kZXg6IG51bWJlciwgY3Vyc29yVGltZXN0YW1wOiBudW1iZXIpIHtcclxuXHJcbiAgICAgICAgdGhpcy5jdXJzb3JzU3RhdGVzLnNldFBvc2l0aW9uKGN1cnNvckluZGV4LCBjdXJzb3JUaW1lc3RhbXApO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQ3Vyc29yU3RhdGVzKHRoaXMuY3Vyc29yc1N0YXRlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWZyZXNoZXMgdGhlIHRyZWUgZ3JpZHMgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWZyZXNoKCl7XHJcbiAgICAgICAgLy8gcmVmcmVzaCB0cmVlIGdyaWQgb25seSBpZiBjdXJzb3Igc2lnbmFsIHZpZXcgaXMgYWN0aXZlIChub3QgaW4gY2FzZSBvZiBjdXJzb3IgaW5mbyBzZWxlY3RvcilcclxuICAgICAgICBpZighdGhpcy5fY3Vyc29ySW5mb1NlbGVjdG9ySXNBY3RpdmUgJiYgdGhpcy5yZWZyZXNoRW5hYmxlZCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGxldCBjdXJzb3JTaWduYWxzID0gdGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbC5nZXRDdXJzb3JTaWduYWxzKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZURhdGFTb3VyY2UoY3Vyc29yU2lnbmFscyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHNldCB0aGUgc2VsZWN0aW9uIHRvIHRoZSBzZWxlY3Qgc2lnbmFsIGJlZm9yZVxyXG4gICAgICAgICAgICBsZXQgdHJlZUdyaWRPYmplY3Q6IGFueSA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb25XaXRoQ3Vyc29yU2lnbmFscyh0cmVlR3JpZE9iamVjdCwgdGhpcy5fc2VsZWN0ZWRDdXJzb3JTaWduYWxzKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBjdXJzb3IgaW5mbyB2YWx1ZXMgXHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaEN1cnNvclN0YXRlcygpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyaWdnZXIgdGhlIHVwZGF0ZSBvZiB0aGUgY3Vyc29ySW5mb3MgZm9yIHRoZSBjdXJyZW50IGN1cnNvciBzdGF0ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWZyZXNoQ3Vyc29yU3RhdGVzKCl7XHJcbiAgICAgICAgdGhpcy51cGRhdGVDdXJzb3JTdGF0ZXModGhpcy5jdXJzb3JzU3RhdGVzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZURhdGFTb3VyY2UoY3Vyc29yU2lnbmFsczogQXJyYXk8Q3Vyc29yU2lnbmFsPil7XHJcbiAgICAgICAgdGhpcy5zZXRDdXJzb3JWYWx1ZVVpSWRzKGN1cnNvclNpZ25hbHMpO1xyXG5cclxuICAgICAgICAvLyBSZWZyZXNoIFRyZWVHcmlkIHdpdGggbmV3IGRhdGFzb3VyY2VcclxuICAgICAgICB0aGlzLnNldE1vZGVsKGN1cnNvclNpZ25hbHMpO1xyXG5cclxuICAgICAgICAvLyBSZWZyZXNoIHRoZSBjdXJzb3IgdmFsdWVzIGFmdGVyIHVwZGF0aW5nIHRoZSBtb2RlbFxyXG4gICAgICAgIHRoaXMucmVmcmVzaEN1cnNvclZhbHVlcyhjdXJzb3JTaWduYWxzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgYW5kIHNldHMgdWlkcyBmb3IgZXZlcnkgY3Vyc29yIHZhbHVlIChjdXJzb3Igc2lnbmFscyBhbmQgY3Vyc29yIGluZm9zKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEN1cnNvclNpZ25hbD59IGN1cnNvclNpZ25hbHNcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0Q3Vyc29yVmFsdWVVaUlkcyhjdXJzb3JTaWduYWxzOiBBcnJheTxDdXJzb3JTaWduYWw+KSB7XHJcbiAgICAgICAgbGV0IGN1cnNvckluZm9JZCA9IDA7XHJcbiAgICAgICAgY3Vyc29yU2lnbmFscy5mb3JFYWNoKChjdXJzb3JTaWduYWwpPT57XHJcbiAgICAgICAgICAgICg8SVVpQmluZGluZz48YW55PmN1cnNvclNpZ25hbCkudWlJZCA9IGN1cnNvckluZm9JZCsrO1xyXG4gICAgICAgICAgICBjdXJzb3JTaWduYWwuY3Vyc29ySW5mb3MuZm9yRWFjaCgoY3Vyc29ySW5mbyk9PntcclxuICAgICAgICAgICAgICAgICAoPElVaUJpbmRpbmc+PGFueT5jdXJzb3JJbmZvKS51aUlkID0gY3Vyc29ySW5mb0lkKys7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWZyZXNoIGFsbCBjdXJzb3IgdmFsdWVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVmcmVzaEN1cnNvclZhbHVlcyhjdXJzb3JTaWduYWxzOiBDdXJzb3JTaWduYWxbXXx1bmRlZmluZWQgPSB1bmRlZmluZWQpIHsgICAgICAgICAgICAgICBcclxuICAgICAgICBpZihjdXJzb3JTaWduYWxzID09IHVuZGVmaW5lZCAmJiB0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGN1cnNvclNpZ25hbHMgPSB0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsLmdldEN1cnNvclNpZ25hbHMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoY3Vyc29yU2lnbmFscyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBjdXJzb3JTaWduYWxzLmZvckVhY2goKGN1cnNvclNpZ25hbCk9PnsgXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDdXJzb3JWYWx1ZUZpZWxkKGN1cnNvclNpZ25hbCk7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3JTaWduYWwuY3Vyc29ySW5mb3MuZm9yRWFjaCgoY3Vyc29ySW5mbyk9PntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDdXJzb3JWYWx1ZUZpZWxkKGN1cnNvckluZm8pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdXBkYXRlcyBhIGN1cnNvciB2YWx1ZSBmaWVsZCB3aXRoIHRoZSBjdXJyZW50IHZhbHVlcyBvZiB0aGUgY29ycmVzcG9uZGlnIGN1cnNvciBzaWduYWwgb3IgaW5mb1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvclNpZ25hbHxDdXJzb3JJbmZvfSBjdXJzb3JTaWduYWxPckluZm9cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVmcmVzaEN1cnNvclZhbHVlRmllbGQoY3Vyc29yU2lnbmFsT3JJbmZvOiBDdXJzb3JTaWduYWx8Q3Vyc29ySW5mbykge1xyXG4gICAgICAgIGlmIChjdXJzb3JTaWduYWxPckluZm8pIHtcclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBjb3JyZXNwb25kaW5nIHVpIGVsZW1lbnRcclxuICAgICAgICAgICAgbGV0IGN1cnNvclZhbHVlRWxlbWVudCA9IHRoaXMuZ2V0Q3Vyc29yVmFsdWVFbGVtZW50KGN1cnNvclNpZ25hbE9ySW5mbyk7XHJcbiAgICAgICAgICAgIGlmIChjdXJzb3JWYWx1ZUVsZW1lbnQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWVTdHJpbmc6IHN0cmluZyA9IGN1cnNvclNpZ25hbE9ySW5mby52YWx1ZS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvclZhbHVlRWxlbWVudC5pbm5lclRleHQgPSB2YWx1ZVN0cmluZztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGNvcnJlc3BvbmRpbmcgY3Vyc29yIHNpZ25hbCBvciBpbmZvIGVsZW1lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtDdXJzb3JTaWduYWx8Q3Vyc29ySW5mb30gY3Vyc29yU2lnbmFsT3JJbmZvXHJcbiAgICAgKiBAcmV0dXJucyB7KEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0Q3Vyc29yVmFsdWVFbGVtZW50KGN1cnNvclNpZ25hbE9ySW5mbzogQ3Vyc29yU2lnbmFsfEN1cnNvckluZm8pOiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgdmFyIG15U3ViRGl2ID0gdGhpcy5tYWluRGl2LnF1ZXJ5U2VsZWN0b3IoXCIjXCIgKyB0aGlzLm1haW5EaXZJZCArIENVUlNPUl9WQUxVRV9JRCArICg8SVVpQmluZGluZz48YW55PmN1cnNvclNpZ25hbE9ySW5mbykudWlJZCk7XHJcbiAgICAgICAgaWYobXlTdWJEaXYgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiA8SFRNTERpdkVsZW1lbnQ+bXlTdWJEaXY7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkN1cnNvclNpZ25hbHNEYXRhTW9kZWxDaGFuZ2VkKHNlbmRlciwgYXJncyl7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgdGhpcy5zYXZlVHJlZUdyaWRTZXR0aW5ncygpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgbWV0aG9kIHdpbGwgdXBkYXRlIHRoZSBjdXJzb3IgaW5mbyB3aWRnZXQgd2l0aCBkYXRhIGZyb21cclxuICAgICAqIHRoZSBjdXJzb3Igc3RhdGUuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Q3Vyc29yU3RhdGVzfSBtb2RpZmllZFN0YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUluZm9DdXJzb3JzV2l0aE5ld1N0YXRlVmFsdWVzIChtb2RpZmllZFN0YXRlOiBDdXJzb3JTdGF0ZXMpIHtcclxuICAgICAgICBpZih0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwudXBkYXRlSW5mb0N1cnNvcnNXaXRoTmV3Q3Vyc29yU3RhdGVWYWx1ZXMobW9kaWZpZWRTdGF0ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAodGhpcy5fdG9vbGJhciBhcyBDdXJzb3JJbmZvVHJlZUdyaWRUb29sYmFyKS51cGRhdGVCdXR0b25TdGF0ZXMobW9kaWZpZWRTdGF0ZSk7XHJcblxyXG4gICAgICAgIHRoaXMucmVmcmVzaEN1cnNvclZhbHVlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydCBjdXN0b20gY2hlY2sgYm94ZXMgaW50byBzeW5jZnVzaW9uIGNoZWNrIGJveGVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlQ2hlY2tCb3hlcygpIHtcclxuICAgICAgICB2YXIgY2hlY2tCb3hlcyA9ICQoJy5jdXN0b21DaGVja2JveCcpO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjaGVja0JveGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNoZWNrQm94ZXNbaV0uaWQgPSAnY3VzdG9tQ2hlY2tib3gnICsgKGkgKyAxKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdFN5bmNmdXNpb25DaGVja2JveChjaGVja0JveGVzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnN0YW50aWF0ZSBzeW5jZnVzaW9uIGNoZWNrIGJveFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjdXN0b21DaGVja2JveFxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdFN5bmNmdXNpb25DaGVja2JveChjdXN0b21DaGVja2JveDogSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICB2YXIgZW5hYmxlVHJpU3RhdGUgPSBmYWxzZTtcclxuICAgICAgICB2YXIgc3RhdGUgPSB0aGlzLmdldEN1c3RvbUNoZWNrYm94U3RhdGUoJChjdXN0b21DaGVja2JveCkpO1xyXG4gICAgICAgIGlmIChzdGF0ZSA9PT0gJ2luZGV0ZXJtaW5hdGUnKSB7IGVuYWJsZVRyaVN0YXRlID0gdHJ1ZTsgfVxyXG4gICAgICAgICQoY3VzdG9tQ2hlY2tib3gpLmVqQ2hlY2tCb3goXHJcbiAgICAgICAgICAgIHsgIFxyXG4gICAgICAgICAgICBlbmFibGVUcmlTdGF0ZTogZW5hYmxlVHJpU3RhdGUsXHJcbiAgICAgICAgICAgIGlkOiBjdXN0b21DaGVja2JveC5pZCxcclxuICAgICAgICAgICAgY2hlY2tTdGF0ZTogc3RhdGUsXHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiBcImN1cnNvckluZm9XaWRnZXRcIixcclxuICAgICAgICAgICAgY2hhbmdlOiAoYXJncykgPT4gdGhpcy5zeW5jZnVzaW9uQ2hlY2tCb3hDaGFuZ2VkKGFyZ3MpLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyaWdnZXIgY2hlY2sgYm94IGNoYW5nZSBldmVudFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3luY2Z1c2lvbkNoZWNrQm94Q2hhbmdlZChhcmdzKSB7XHJcbiAgICAgICAgaWYgKGFyZ3MubW9kZWwuZW5hYmxlVHJpU3RhdGUpIHtcclxuICAgICAgICAgICAgJCgnIycgKyBhcmdzLm1vZGVsLmlkKS5lakNoZWNrQm94KHtlbmFibGVUcmlTdGF0ZTogZmFsc2V9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZXRTZWxlY3RlZEN1cnNvcnNJbmZvKGFyZ3MpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBjdXN0b21DaGVja2JveCA9ICQoJyMnICsgYXJncy5tb2RlbC5pZCk7XHJcbiAgICAgICAgY3VzdG9tQ2hlY2tib3guY2hhbmdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgc2VsZWN0ZWQgY3Vyc29yIGluZm8gd2hlbiBjaGVja2JveCBpcyBjbGlja2VkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBzZXRTZWxlY3RlZEN1cnNvcnNJbmZvKGFyZ3Mpe1xyXG4gICAgICAgIHZhciB0cmVlZ3JpZDogYW55ID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG4gICAgICAgIHZhciBpbmRleCA9IHBhcnNlSW50KGFyZ3MubW9kZWwuaWQuc3BsaXQoJ2N1c3RvbUNoZWNrYm94JylbMV0sIDEwKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWRDdXJzb3JJbmZvc09sZCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRDdXJzb3JJbmZvc09sZCA9IHRyZWVncmlkLm1vZGVsLmZsYXRSZWNvcmRzW2luZGV4XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkQ3Vyc29ySW5mb3NPbGQgPSB0aGlzLl9zZWxlY3RlZEN1cnNvckluZm9zTmV3O1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9zZWxlY3RlZEN1cnNvckluZm9zTmV3ID0gdHJlZWdyaWQubW9kZWwuZmxhdFJlY29yZHNbaW5kZXhdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0IHN0YXRlIG9mIGNoZWNrYm94XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SlF1ZXJ5PEhUTUxFbGVtZW50Pn0gY2hlY2tib3hcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEN1c3RvbUNoZWNrYm94U3RhdGUoY2hlY2tib3g6IEpRdWVyeTxIVE1MRWxlbWVudD4pOiBzdHJpbmcge1xyXG4gICAgICAgIGlmIChjaGVja2JveC5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJ2NoZWNrJztcclxuICAgICAgICB9IGVsc2UgaWYgKGNoZWNrYm94LmlzKCc6aW5kZXRlcm1pbmF0ZScpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnaW5kZXRlcm1pbmF0ZSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gJ3VuY2hlY2snO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaGVzIHRoZSBjaGFydCBtYW5hZ2VyIGRhdGFtb2RlbCBldmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhdHRhY2hDaGFydE1hbmFnZXJEYXRhTW9kZWxFdmVudHMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwuZXZlbnRNb2RlbENoYW5nZWQuYXR0YWNoKHRoaXMuX2NoYXJ0TWFuYWdlck1vZGVsQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGFjaGVzIHRoZSBjaGFydCBtYW5hZ2VyIGRhdGFtb2RlbCBldmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkZXRhY2hDaGFydE1hbmFnZXJEYXRhTW9kZWxFdmVudHMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwuZXZlbnRNb2RlbENoYW5nZWQuZGV0YWNoKHRoaXMuX2NoYXJ0TWFuYWdlck1vZGVsQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNoYXJ0TWFuYWdlck1vZGVsIGhhcyBjaGFuZ2VkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25DaGFydE1hbmFnZXJNb2RlbENoYW5nZWQoc2VuZGVyLCBhcmdzKSB7XHJcbiAgICAgICAgLy8gVXBkYXRlIHRoZSBjdXJzb3IgaW5mbyB3aWRnZXRcclxuICAgICAgICBpZiAoYXJncy5oaW50ID09IENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LmFkZFNlcmllICYmIGFyZ3MuZGF0YS5zZXJpZXMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkU2VyaWVzKGFyZ3MuZGF0YS5zZXJpZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhcmdzLmhpbnQgPT0gQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQucmVtb3ZlU2VyaWUpIHtcclxuICAgICAgICAgICAgaWYgKGFyZ3MuZGF0YS5zaWduYWxVc2VkSW5PdGhlckNoYXJ0cyA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVTZXJpZShhcmdzLmRhdGEuc2VyaWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBDdXJzb3JJbmZvV2lkZ2V0IH07Il19