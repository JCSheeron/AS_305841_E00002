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
define(["require", "exports", "../common/treeGridWidgetBase", "./view/traceConfigTriggerTreeGridToolbar", "./view/traceConfigTriggerTreeGridCellEditTemplate", "./view/traceConfigTriggerTreeGridCellEditEvents", "../../view/datapointDialog/datapointDialog", "./model/traceConfigTriggerDataModel", "./triggerDescriptionProvider", "./componentDefaultDefinition"], function (require, exports, treeGridWidgetBase_1, traceConfigTriggerTreeGridToolbar_1, traceConfigTriggerTreeGridCellEditTemplate_1, traceConfigTriggerTreeGridCellEditEvents_1, datapointDialog_1, traceConfigTriggerDataModel_1, triggerDescriptionProvider_1, componentDefaultDefinition_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implements the TraceConfigTriggerWidget
     *
     * @class TraceConfigTriggerWidget
     * @extends {TreeGridWidgetBase}
     */
    var TraceConfigTriggerWidget = /** @class */ (function (_super) {
        __extends(TraceConfigTriggerWidget, _super);
        function TraceConfigTriggerWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._addDataPointHandler = function (sender, args) { return _this.onAddDatapoint(sender, args); };
            _this._dialogClosedHandler = function (sender, args) { return _this.onDialogClosed(sender, args); };
            _this._availableTraceDataPoints = new Array();
            _this._actualTriggerConditionDescriptionId = 0;
            _this._dropDownListSelectionChangedHandler = function (sender, args) { return _this.onDropDownListSelectionChanged(sender, args); };
            return _this;
        }
        /**
         * Defines the height of the header
         *
         * @returns {number}
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.defineHeaderHeight = function () {
            return 30;
        };
        /**
         * Defines the height of the footer
         *
         * @returns {number}
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.defineFooterHeight = function () {
            return 290;
        };
        TraceConfigTriggerWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
            this.component.disablePersisting();
        };
        TraceConfigTriggerWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            _super.prototype.setHeaderContent.call(this, "Trigger");
            this.updateFooterContent(0);
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 1, 80);
        };
        /**
         * Updates and initializes the trace data points
         *
         * @private
         * @param {TraceDataPoint[]} traceDataPoints
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.initializeAvailableDataPoints = function (availableTraceDataPoints) {
            this._availableTraceDataPoints = availableTraceDataPoints;
            datapointDialog_1.DatapointDialog.setDatapoints(this._availableTraceDataPoints);
        };
        /**
         * Updates and initializes the start triggers
         *
         * @private
         * @param {TraceStartTrigger[]} startTriggers
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.initializeTraceStartTriggerInfo = function (startTriggerInfo) {
            var traceConfigTriggerDataModel = new traceConfigTriggerDataModel_1.TraceConfigTriggerDataModel();
            traceConfigTriggerDataModel.initialize();
            this.dataModel = traceConfigTriggerDataModel;
            traceConfigTriggerDataModel.initData = startTriggerInfo;
        };
        TraceConfigTriggerWidget.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            if (this._cellEditTemplate != undefined) {
                this._cellEditTemplate.eventSelectionChanged.detach(this._dropDownListSelectionChangedHandler);
            }
        };
        /** updates the footer content with the trigger description
         *
         * @param {number} triggerConditionId (e.g. 20 for IN_WINDOW; 30 for OUT_WINDOW; ...)
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.updateFooterContent = function (triggerConditionId) {
            if (this._actualTriggerConditionDescriptionId != triggerConditionId) {
                this._actualTriggerConditionDescriptionId = triggerConditionId;
                var htmlData = triggerDescriptionProvider_1.TriggerDescriptionProvider.getHtmlDescription(triggerConditionId);
                _super.prototype.setFooterContent.call(this, htmlData);
            }
        };
        /**
         * implements the model change handling
         *
         * @param {IDataModel} sender
         * @param {EventModelChangedArgs} data
         * @returns {*}
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.handleModelChanged = function (sender, eventArgs) {
            this.refresh();
            // Set correct footer content 
            var treeGridObj = this.getTreeGridObject();
            var actualSelectedItem = treeGridObj.model.selectedItem;
            if (actualSelectedItem == undefined) {
                // get trigger condition of first trigger
                var conditionParameter = "StartTrigger1_Condition";
                var triggerConditionValue = this.getTriggerConditionValue(treeGridObj.model.dataSource, conditionParameter);
                this.updateFooterContent(triggerConditionValue);
            }
            else {
                this.updateFooterContentToSelectedItem(actualSelectedItem);
            }
        };
        TraceConfigTriggerWidget.prototype.updateFooterContentToSelectedItem = function (selectedItem) {
            var startTriggerGroup;
            if (selectedItem.level == 0) {
                // Rootnode selected
                startTriggerGroup = selectedItem;
            }
            else {
                // Parameter selected
                startTriggerGroup = selectedItem.parentItem;
            }
            if (startTriggerGroup != undefined) {
                // TODO: remove/change _startTriggerRef
                var triggerConditionValue = startTriggerGroup._startTriggerRef.condition;
                this.updateFooterContent(parseInt(triggerConditionValue, 10));
            }
        };
        /**
         * handles the changes of observed items requested by 'observeDataModelItems'
         *
         * @param {IDataModel} sender
         * @param {EventModelChangedArgs} data
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.handleModelItemsChanged = function (sender, eventArgs) {
            this.refresh();
        };
        /** creates the datapoint selection dialog
         *
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.createDatapointsDialog = function () {
            var datapointDialogId = "datapointDialogTrigger";
            $(this.mainDiv).append("<div id='" + datapointDialogId + "'></>");
            datapointDialog_1.DatapointDialog.initialize(datapointDialogId);
        };
        /** catches the add datapoint event from the datapoint dialog
         * => sets the selected datapoint to the actual selected trigger and closes the datapoint dialog
         *
         * @param {} sender
         * @param {EventDatapointArgs} args
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.onAddDatapoint = function (sender, args) {
            this.setDatapointNameToSelectedTrigger(args.dataPointInfo.fullname);
            datapointDialog_1.DatapointDialog.close();
        };
        /** catches the dialog close event from the datapoint dialog
         * => detaches the dialog events
         *
         * @param {} sender
         * @param {} args
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.onDialogClosed = function (sender, args) {
            datapointDialog_1.DatapointDialog.eventAddDatapoint.detach(this._addDataPointHandler);
            datapointDialog_1.DatapointDialog.eventDialogClosed.detach(this._dialogClosedHandler);
        };
        /** catches the dialog close event from the datapoint dialog
         * => detaches the dialog events
         *
         * @param {string} dataPointName
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.setDatapointNameToSelectedTrigger = function (dataPointName) {
            var treeGridObj = this.getTreeGridObject();
            var startTriggerItem;
            var actualSelectedItem = treeGridObj.model.selectedItem;
            if (actualSelectedItem != undefined) {
                if (actualSelectedItem.level == 0) {
                    startTriggerItem = actualSelectedItem;
                }
                else {
                    startTriggerItem = actualSelectedItem.parentItem;
                }
            }
            else {
                console.log("No start trigger selected!");
            }
            // Save cell bevor updating the datamodel to see the right data after update
            treeGridObj.saveCell();
            var dataPointNameParameter = startTriggerItem.item.childs.filter(function (triggerParameter) { return triggerParameter.id == "datapoint"; })[0];
            if (dataPointNameParameter != undefined) {
                dataPointNameParameter.displayValue = dataPointName;
                this.refresh();
                startTriggerItem.setValue(dataPointNameParameter, dataPointName);
            }
        };
        /** creates the tree grid for the trigger informations
         *
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.createTreeGrid = function () {
            var _this = this;
            this.createDatapointsDialog();
            $(this.mainDiv).ejTreeGrid(__assign(__assign(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridColumnResizeSupport()), this.getTreeGridToolbarSupport()), this.getTreeGridCellEditSupport()), { childMapping: "childs", expandStateMapping: "expandState", expanded: function (args) { return _this.treeGridNodeExpandedOrCollapsed(); }, collapsed: function (args) { return _this.treeGridNodeExpandedOrCollapsed(); }, rowSelected: function (args) { return _this.treeGridRowSelected(args); }, create: function (args) { return _this.treeGridCreated(); }, actionBegin: function (args) { return _this.treeGridActionBegin(args); }, actionComplete: function (args) { return _this.treeGridActionComplete(args); } }));
        };
        TraceConfigTriggerWidget.prototype.treeGridNodeExpandedOrCollapsed = function () {
            // Refresh to see correct expanded/collapsed icon
            this.refresh();
        };
        /**
         * Returns the tree grid column definition
         *
         * @private
         * @returns {{}}
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.getTreeGridColumnDefinition = function () {
            this._cellEditTemplate = traceConfigTriggerTreeGridCellEditTemplate_1.TraceConfigTriggerTreeGridCellEditTemplate.createInstance();
            this._cellEditTemplate.eventSelectionChanged.attach(this._dropDownListSelectionChangedHandler);
            return {
                columns: [
                    { field: "displayName", headerText: "Name", width: "200" },
                    { field: "displayValue", headerText: "Value", width: "200", editType: "stringedit", editTemplate: this._cellEditTemplate }
                ],
            };
        };
        /**
         * Returns the tree grid column resize settings
         *
         * @private
         * @returns {{}}
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.getTreeGridColumnResizeSupport = function () {
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
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.getTreeGridToolbarSupport = function () {
            this._toolbar = new traceConfigTriggerTreeGridToolbar_1.TraceConfigTriggerTreeGridToolbar(this.mainDiv);
            return _super.prototype.getTreeGridToolbarSupport.call(this);
        };
        /**
         * Returns the tree grid cell edit settings
         *
         * @private
         * @returns {{}}
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.getTreeGridCellEditSupport = function () {
            var cellEditEvents = new traceConfigTriggerTreeGridCellEditEvents_1.TraceConfigTriggerTreeGridCellEditEvents();
            return {
                editSettings: { allowEditing: true },
                beginEdit: function (args) { return cellEditEvents.beginEdit(args); },
                endEdit: function (args) { return cellEditEvents.endEdit(args); },
            };
        };
        TraceConfigTriggerWidget.prototype.treeGridActionBegin = function (args) {
            // Support "Entf/Del" key
            if (args.requestType == "delete") {
                this.deleteStartTriggers(args.deletedItems);
                args.cancel = true;
            }
        };
        TraceConfigTriggerWidget.prototype.treeGridActionComplete = function (args) {
            // Event trigger while changing datasource dynamically. 
            // code to done after the dynamic change of datasource. 
            if (args.requestType === 'refreshDataSource') {
                this.refreshSelection();
            }
        };
        TraceConfigTriggerWidget.prototype.treeGridRowSelected = function (args) {
            if (args.model.selectedItem != undefined) {
                this.updateFooterContentToSelectedItem(args.model.selectedItem);
                this.updateToolbarButtonStates(args.model.dataSource, args.model.selectedItem);
            }
        };
        TraceConfigTriggerWidget.prototype.addStartTrigger = function () {
            this.dataModel.addTrigger();
            this.refreshSelection();
            // Get actual selection item
            var treeObj = $(this.mainDiv).ejTreeGrid('instance');
            var selectedItem = treeObj.model.selectedItem;
            if (treeObj.model.selectedRowIndex == -1) {
                selectedItem = undefined;
            }
            this.updateToolbarButtonStates(treeObj.model.dataSource, selectedItem);
        };
        TraceConfigTriggerWidget.prototype.deleteStartTriggers = function (deleteItems) {
            var indexList = new Array();
            for (var i = deleteItems.length - 1; i >= 0; i--) {
                if (deleteItems[i].level == 0) {
                    // Only level 0 can be deleted (start trigger group, not single parameters of this group)
                    indexList.push(deleteItems[i].hierarchyRowIndex);
                }
            }
            if (indexList.length > 0) {
                this.dataModel.removeTriggers(indexList);
                this.refreshSelection();
                // Get actual selection item
                var treeObj = $(this.mainDiv).ejTreeGrid('instance');
                var selectedItem = treeObj.model.selectedItem;
                if (treeObj.model.selectedRowIndex == -1) {
                    selectedItem = undefined;
                }
                this.updateToolbarButtonStates(treeObj.model.dataSource, selectedItem);
            }
        };
        /**
         * opens the datapoint selection dialog and attaches to the dialog events
         *
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.openDatapointDialog = function () {
            datapointDialog_1.DatapointDialog.eventAddDatapoint.attach(this._addDataPointHandler);
            datapointDialog_1.DatapointDialog.eventDialogClosed.attach(this._dialogClosedHandler);
            datapointDialog_1.DatapointDialog.open(TraceConfigTriggerWidget.selectDataPointDialogTitle, datapointDialog_1.FooterContentType.applyClose);
        };
        TraceConfigTriggerWidget.prototype.refreshSelection = function () {
            var treeObj = $(this.mainDiv).ejTreeGrid('instance');
            // Get actual selection index
            var actualSelectedRowIndex = treeObj.model.selectedRowIndex;
            if (actualSelectedRowIndex == -1) {
                // update toolbar buttons in case of no selected item
                this.updateToolbarButtonStates(treeObj.model.dataSource, undefined);
                return;
            }
            // Reset selection
            treeObj.model.selectedRowIndex = -1;
            // Set to last index if index is out of range
            if (actualSelectedRowIndex >= treeObj.model.flatRecords.length) {
                actualSelectedRowIndex = treeObj.model.flatRecords.length - 1;
            }
            // Set selection
            treeObj.model.selectedRowIndex = actualSelectedRowIndex;
            // update toolbar buttons with selected item
            if (treeObj.model.flatRecords[actualSelectedRowIndex] != undefined) {
                this.updateToolbarButtonStates(treeObj.model.dataSource, treeObj.model.flatRecords[actualSelectedRowIndex].item);
            }
        };
        /**
         * Returns the trigger condition(e.g. 20 for IN_WINDOW; 30 for OUT_WINDOW; ...) for the given condition parameter id (e.g. StartTrigger1_Condition)
         *
         * @param {} dataSource
         * @param {string} conditionParameter
         * @returns {number}
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.getTriggerConditionValue = function (dataSource, conditionParameter) {
            for (var i = 0; i < dataSource.length; i++) {
                var startTrigger = dataSource[i];
                for (var j = 0; j < startTrigger.childs.length; j++) {
                    var parameter = startTrigger.childs[j];
                    if (parameter.componentParameter.browseName == conditionParameter) {
                        return parseInt(parameter.componentParameter.value, 10);
                    }
                }
            }
            return 0;
        };
        /**
         * Refreshes trigger parameters tree grid with the current model data
         *
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.refresh = function () {
            if (this.refreshEnabled) {
                this.setModel(this.dataModel.data);
            }
        };
        TraceConfigTriggerWidget.prototype.onDropDownListSelectionChanged = function (sender, args) {
            this.updateFooterContent(args.value);
        };
        TraceConfigTriggerWidget.prototype.updateToolbarButtonStates = function (startTriggers, selectedItem) {
            var toolbar = this._toolbar;
            // Set select trigger datapoint button state
            if (selectedItem == undefined) {
                toolbar.disableSelectTriggerDataPointButton(true);
            }
            else {
                toolbar.disableSelectTriggerDataPointButton(false);
            }
            // Set add trigger button state
            if (startTriggers.length > 1) {
                toolbar.disableAddButton(true);
            }
            else {
                toolbar.disableAddButton(false);
            }
            // Set remove trigger button state
            if (startTriggers.length == 0 || selectedItem == undefined || selectedItem.level > 0) {
                toolbar.disableRemoveButton(true);
            }
            else {
                toolbar.disableRemoveButton(false);
            }
        };
        TraceConfigTriggerWidget.selectDataPointDialogTitle = "Select data point";
        return TraceConfigTriggerWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.TraceConfigTriggerWidget = TraceConfigTriggerWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlQ29uZmlnVHJpZ2dlcldpZGdldC90cmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZUE7Ozs7O09BS0c7SUFDSDtRQUF1Qyw0Q0FBa0I7UUFBekQ7WUFBQSxxRUF1ZEM7WUFyZFcsMEJBQW9CLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEVBQWhDLENBQWdDLENBQUM7WUFDdkUsMEJBQW9CLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEVBQWhDLENBQWdDLENBQUM7WUFFdkUsK0JBQXlCLEdBQXlCLElBQUksS0FBSyxFQUFzQixDQUFDO1lBR2xGLDBDQUFvQyxHQUFHLENBQUMsQ0FBQztZQUl6QywwQ0FBb0MsR0FBRyxVQUFDLE1BQU0sRUFBQyxJQUFJLElBQUcsT0FBQSxLQUFJLENBQUMsOEJBQThCLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxFQUFoRCxDQUFnRCxDQUFDOztRQTJjbkgsQ0FBQztRQXpjRzs7Ozs7V0FLRztRQUNILHFEQUFrQixHQUFsQjtZQUNJLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gscURBQWtCLEdBQWxCO1lBQ0ksT0FBTyxHQUFHLENBQUM7UUFDZixDQUFDO1FBRUQsc0RBQW1CLEdBQW5CO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLHVEQUEwQixFQUFFLENBQUMsQ0FBQztZQUN0RSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFp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QkFDekIsT0FBTyxDQUFDLG1DQUFtQyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3JEO2lCQUFJO2dCQUNELE9BQU8sQ0FBQyxtQ0FBbUMsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN0RDtZQUVELCtCQUErQjtZQUMvQixJQUFHLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDO2dCQUN4QixPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDbEM7aUJBQ0c7Z0JBQ0EsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ25DO1lBRUQsa0NBQWtDO1lBQ2xDLElBQUcsYUFBYSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksWUFBWSxJQUFJLFNBQVMsSUFBSSxZQUFZLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBQztnQkFDaEYsT0FBTyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3JDO2lCQUNHO2dCQUNBLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN0QztRQUNMLENBQUM7UUE1Y00sbURBQTBCLEdBQUcsbUJBQW1CLENBQUM7UUE2YzVELCtCQUFDO0tBQUEsQUF2ZEQsQ0FBdUMsdUNBQWtCLEdBdWR4RDtJQUVRLDREQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyZWVHcmlkV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vdHJlZUdyaWRXaWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IElEYXRhTW9kZWwsIEV2ZW50TW9kZWxDaGFuZ2VkQXJnc30gZnJvbSBcIi4uLy4uL21vZGVscy9kYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHJhY2VDb25maWdUcmlnZ2VyVHJlZUdyaWRUb29sYmFyIH0gZnJvbSBcIi4vdmlldy90cmFjZUNvbmZpZ1RyaWdnZXJUcmVlR3JpZFRvb2xiYXJcIjtcclxuaW1wb3J0IHsgVHJhY2VDb25maWdUcmlnZ2VyVHJlZUdyaWRDZWxsRWRpdFRlbXBsYXRlIH0gZnJvbSBcIi4vdmlldy90cmFjZUNvbmZpZ1RyaWdnZXJUcmVlR3JpZENlbGxFZGl0VGVtcGxhdGVcIjtcclxuaW1wb3J0IHsgVHJhY2VDb25maWdUcmlnZ2VyVHJlZUdyaWRDZWxsRWRpdEV2ZW50cyB9IGZyb20gXCIuL3ZpZXcvdHJhY2VDb25maWdUcmlnZ2VyVHJlZUdyaWRDZWxsRWRpdEV2ZW50c1wiO1xyXG5pbXBvcnQgeyBEYXRhcG9pbnREaWFsb2csIEZvb3RlckNvbnRlbnRUeXBlIH0gZnJvbSBcIi4uLy4uL3ZpZXcvZGF0YXBvaW50RGlhbG9nL2RhdGFwb2ludERpYWxvZ1wiO1xyXG5pbXBvcnQgeyBFdmVudERhdGFwb2ludEFyZ3MgfSBmcm9tIFwiLi4vLi4vdmlldy9kYXRhcG9pbnREaWFsb2cvZXZlbnREYXRhcG9pbnRBcmdzXCI7XHJcbmltcG9ydCB7IFRyYWNlRGF0YVBvaW50SW5mbyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvdHJhY2VEYXRhUG9pbnRJbmZvXCI7XHJcbmltcG9ydCB7IFRyYWNlQ29uZmlnVHJpZ2dlckRhdGFNb2RlbCB9IGZyb20gXCIuL21vZGVsL3RyYWNlQ29uZmlnVHJpZ2dlckRhdGFNb2RlbFwiO1xyXG5pbXBvcnQgeyBJVHJhY2VDb25maWdUcmlnZ2VyRGF0YU1vZGVsIH0gZnJvbSBcIi4vbW9kZWwvdHJhY2VDb25maWdUcmlnZ2VyRGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRyaWdnZXJEZXNjcmlwdGlvblByb3ZpZGVyIH0gZnJvbSBcIi4vdHJpZ2dlckRlc2NyaXB0aW9uUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24gfSBmcm9tIFwiLi9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBUcmFjZVN0YXJ0VHJpZ2dlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvdHJhY2VTdGFydFRyaWdnZXJcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudHMgdGhlIFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFxyXG4gKlxyXG4gKiBAY2xhc3MgVHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0XHJcbiAqIEBleHRlbmRzIHtUcmVlR3JpZFdpZGdldEJhc2V9XHJcbiAqL1xyXG5jbGFzcyBUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXQgZXh0ZW5kcyBUcmVlR3JpZFdpZGdldEJhc2V7XHJcblxyXG4gICAgcHJpdmF0ZSBfYWRkRGF0YVBvaW50SGFuZGxlciA9IChzZW5kZXIsYXJncyk9PnRoaXMub25BZGREYXRhcG9pbnQoc2VuZGVyLGFyZ3MpO1xyXG4gICAgcHJpdmF0ZSBfZGlhbG9nQ2xvc2VkSGFuZGxlciA9IChzZW5kZXIsYXJncyk9PnRoaXMub25EaWFsb2dDbG9zZWQoc2VuZGVyLGFyZ3MpO1xyXG5cclxuICAgIHByaXZhdGUgX2F2YWlsYWJsZVRyYWNlRGF0YVBvaW50czogVHJhY2VEYXRhUG9pbnRJbmZvW10gPSBuZXcgQXJyYXk8VHJhY2VEYXRhUG9pbnRJbmZvPigpO1xyXG5cclxuICAgIHByaXZhdGUgX2NlbGxFZGl0VGVtcGxhdGU7XHJcbiAgICBwcml2YXRlIF9hY3R1YWxUcmlnZ2VyQ29uZGl0aW9uRGVzY3JpcHRpb25JZCA9IDA7XHJcblxyXG4gICAgc3RhdGljIHNlbGVjdERhdGFQb2ludERpYWxvZ1RpdGxlID0gXCJTZWxlY3QgZGF0YSBwb2ludFwiO1xyXG5cclxuICAgIHByaXZhdGUgX2Ryb3BEb3duTGlzdFNlbGVjdGlvbkNoYW5nZWRIYW5kbGVyID0gKHNlbmRlcixhcmdzKT0+dGhpcy5vbkRyb3BEb3duTGlzdFNlbGVjdGlvbkNoYW5nZWQoc2VuZGVyLGFyZ3MpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB0aGUgaGVpZ2h0IG9mIHRoZSBoZWFkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBkZWZpbmVIZWFkZXJIZWlnaHQoKTogbnVtYmVye1xyXG4gICAgICAgIHJldHVybiAzMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgdGhlIGhlaWdodCBvZiB0aGUgZm9vdGVyXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgZGVmaW5lRm9vdGVySGVpZ2h0KCk6IG51bWJlcntcclxuICAgICAgICByZXR1cm4gMjkwO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXREZWZhdWx0RGVmaW5pdGlvbihuZXcgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24oKSk7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZGlzYWJsZVBlcnNpc3RpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsaXplZCgpe1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemVkKCk7XHJcblxyXG4gICAgICAgIHN1cGVyLnNldEhlYWRlckNvbnRlbnQoXCJUcmlnZ2VyXCIpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlRm9vdGVyQ29udGVudCgwKTtcclxuXHJcbiAgICAgICAgLy8gU2V0IGR5bmFtaWMgY29sdW1uIHNldHRpbmdzXHJcbiAgICAgICAgc3VwZXIuc2V0RHluYW1pY0NvbHVtbigxLCA4MCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyBhbmQgaW5pdGlhbGl6ZXMgdGhlIHRyYWNlIGRhdGEgcG9pbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7VHJhY2VEYXRhUG9pbnRbXX0gdHJhY2VEYXRhUG9pbnRzXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZUF2YWlsYWJsZURhdGFQb2ludHMoYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzOlRyYWNlRGF0YVBvaW50SW5mb1tdKXtcclxuICAgICAgICB0aGlzLl9hdmFpbGFibGVUcmFjZURhdGFQb2ludHMgPSBhdmFpbGFibGVUcmFjZURhdGFQb2ludHM7XHJcbiAgICAgICAgRGF0YXBvaW50RGlhbG9nLnNldERhdGFwb2ludHModGhpcy5fYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIGFuZCBpbml0aWFsaXplcyB0aGUgc3RhcnQgdHJpZ2dlcnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtUcmFjZVN0YXJ0VHJpZ2dlcltdfSBzdGFydFRyaWdnZXJzXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZVRyYWNlU3RhcnRUcmlnZ2VySW5mbyhzdGFydFRyaWdnZXJJbmZvOiB7IGRhdGE6VHJhY2VTdGFydFRyaWdnZXJbXSAsIGluZm86TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0pe1xyXG4gICAgICAgIGxldCB0cmFjZUNvbmZpZ1RyaWdnZXJEYXRhTW9kZWwgPSBuZXcgVHJhY2VDb25maWdUcmlnZ2VyRGF0YU1vZGVsKCkgYXMgSVRyYWNlQ29uZmlnVHJpZ2dlckRhdGFNb2RlbDtcclxuICAgICAgICB0cmFjZUNvbmZpZ1RyaWdnZXJEYXRhTW9kZWwuaW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgIHRoaXMuZGF0YU1vZGVsID0gdHJhY2VDb25maWdUcmlnZ2VyRGF0YU1vZGVsO1xyXG4gICAgICAgIHRyYWNlQ29uZmlnVHJpZ2dlckRhdGFNb2RlbC5pbml0RGF0YSA9IHN0YXJ0VHJpZ2dlckluZm87XHJcbiAgICB9XHJcblxyXG4gICAgZGlzcG9zZSgpe1xyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgICAgICBpZih0aGlzLl9jZWxsRWRpdFRlbXBsYXRlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2NlbGxFZGl0VGVtcGxhdGUuZXZlbnRTZWxlY3Rpb25DaGFuZ2VkLmRldGFjaCh0aGlzLl9kcm9wRG93bkxpc3RTZWxlY3Rpb25DaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKiogdXBkYXRlcyB0aGUgZm9vdGVyIGNvbnRlbnQgd2l0aCB0aGUgdHJpZ2dlciBkZXNjcmlwdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0cmlnZ2VyQ29uZGl0aW9uSWQgKGUuZy4gMjAgZm9yIElOX1dJTkRPVzsgMzAgZm9yIE9VVF9XSU5ET1c7IC4uLilcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVwZGF0ZUZvb3RlckNvbnRlbnQodHJpZ2dlckNvbmRpdGlvbklkOiBudW1iZXIpe1xyXG4gICAgICAgIGlmKHRoaXMuX2FjdHVhbFRyaWdnZXJDb25kaXRpb25EZXNjcmlwdGlvbklkICE9IHRyaWdnZXJDb25kaXRpb25JZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2FjdHVhbFRyaWdnZXJDb25kaXRpb25EZXNjcmlwdGlvbklkID0gdHJpZ2dlckNvbmRpdGlvbklkO1xyXG4gICAgICAgICAgICBsZXQgaHRtbERhdGEgPSBUcmlnZ2VyRGVzY3JpcHRpb25Qcm92aWRlci5nZXRIdG1sRGVzY3JpcHRpb24odHJpZ2dlckNvbmRpdGlvbklkKTtcclxuICAgICAgICAgICAgc3VwZXIuc2V0Rm9vdGVyQ29udGVudChodG1sRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBpbXBsZW1lbnRzIHRoZSBtb2RlbCBjaGFuZ2UgaGFuZGxpbmdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lEYXRhTW9kZWx9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHtFdmVudE1vZGVsQ2hhbmdlZEFyZ3N9IGRhdGFcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBoYW5kbGVNb2RlbENoYW5nZWQoc2VuZGVyOiBJRGF0YU1vZGVsLCBldmVudEFyZ3M6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyk6IGFueSB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcblxyXG4gICAgICAgICAvLyBTZXQgY29ycmVjdCBmb290ZXIgY29udGVudCBcclxuICAgICAgICAgdmFyIHRyZWVHcmlkT2JqID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG4gICAgICAgICBsZXQgYWN0dWFsU2VsZWN0ZWRJdGVtID0gKDxhbnk+dHJlZUdyaWRPYmoubW9kZWwpLnNlbGVjdGVkSXRlbTtcclxuICAgICAgICAgaWYoYWN0dWFsU2VsZWN0ZWRJdGVtID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAvLyBnZXQgdHJpZ2dlciBjb25kaXRpb24gb2YgZmlyc3QgdHJpZ2dlclxyXG4gICAgICAgICAgICAgbGV0IGNvbmRpdGlvblBhcmFtZXRlciA9IFwiU3RhcnRUcmlnZ2VyMV9Db25kaXRpb25cIjtcclxuICAgICAgICAgICAgIGxldCB0cmlnZ2VyQ29uZGl0aW9uVmFsdWUgPSB0aGlzLmdldFRyaWdnZXJDb25kaXRpb25WYWx1ZSh0cmVlR3JpZE9iai5tb2RlbC5kYXRhU291cmNlLCBjb25kaXRpb25QYXJhbWV0ZXIpO1xyXG4gICAgICAgICAgICAgdGhpcy51cGRhdGVGb290ZXJDb250ZW50KHRyaWdnZXJDb25kaXRpb25WYWx1ZSk7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVGb290ZXJDb250ZW50VG9TZWxlY3RlZEl0ZW0oYWN0dWFsU2VsZWN0ZWRJdGVtKTtcclxuICAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSB1cGRhdGVGb290ZXJDb250ZW50VG9TZWxlY3RlZEl0ZW0oc2VsZWN0ZWRJdGVtKXtcclxuICAgICAgICBsZXQgc3RhcnRUcmlnZ2VyR3JvdXA7XHJcbiAgICAgICAgaWYoc2VsZWN0ZWRJdGVtLmxldmVsID09IDApe1xyXG4gICAgICAgICAgICAvLyBSb290bm9kZSBzZWxlY3RlZFxyXG4gICAgICAgICAgICBzdGFydFRyaWdnZXJHcm91cCA9IHNlbGVjdGVkSXRlbTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgLy8gUGFyYW1ldGVyIHNlbGVjdGVkXHJcbiAgICAgICAgICAgIHN0YXJ0VHJpZ2dlckdyb3VwID0gc2VsZWN0ZWRJdGVtLnBhcmVudEl0ZW07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHN0YXJ0VHJpZ2dlckdyb3VwICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IHJlbW92ZS9jaGFuZ2UgX3N0YXJ0VHJpZ2dlclJlZlxyXG4gICAgICAgICAgICBsZXQgdHJpZ2dlckNvbmRpdGlvblZhbHVlID0gc3RhcnRUcmlnZ2VyR3JvdXAuX3N0YXJ0VHJpZ2dlclJlZi5jb25kaXRpb247XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRm9vdGVyQ29udGVudChwYXJzZUludCh0cmlnZ2VyQ29uZGl0aW9uVmFsdWUsIDEwKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaGFuZGxlcyB0aGUgY2hhbmdlcyBvZiBvYnNlcnZlZCBpdGVtcyByZXF1ZXN0ZWQgYnkgJ29ic2VydmVEYXRhTW9kZWxJdGVtcydcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lEYXRhTW9kZWx9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHtFdmVudE1vZGVsQ2hhbmdlZEFyZ3N9IGRhdGFcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgaGFuZGxlTW9kZWxJdGVtc0NoYW5nZWQoc2VuZGVyOiBJRGF0YU1vZGVsLCBldmVudEFyZ3M6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncykge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBjcmVhdGVzIHRoZSBkYXRhcG9pbnQgc2VsZWN0aW9uIGRpYWxvZ1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVEYXRhcG9pbnRzRGlhbG9nKCl7XHJcbiAgICAgICAgbGV0IGRhdGFwb2ludERpYWxvZ0lkID0gXCJkYXRhcG9pbnREaWFsb2dUcmlnZ2VyXCI7XHJcbiAgICAgICAgJCh0aGlzLm1haW5EaXYpLmFwcGVuZChcIjxkaXYgaWQ9J1wiICsgZGF0YXBvaW50RGlhbG9nSWQgKyBcIic+PC8+XCIpO1xyXG5cclxuICAgICAgICBEYXRhcG9pbnREaWFsb2cuaW5pdGlhbGl6ZShkYXRhcG9pbnREaWFsb2dJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGNhdGNoZXMgdGhlIGFkZCBkYXRhcG9pbnQgZXZlbnQgZnJvbSB0aGUgZGF0YXBvaW50IGRpYWxvZ1xyXG4gICAgICogPT4gc2V0cyB0aGUgc2VsZWN0ZWQgZGF0YXBvaW50IHRvIHRoZSBhY3R1YWwgc2VsZWN0ZWQgdHJpZ2dlciBhbmQgY2xvc2VzIHRoZSBkYXRhcG9pbnQgZGlhbG9nXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHt9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHtFdmVudERhdGFwb2ludEFyZ3N9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkFkZERhdGFwb2ludChzZW5kZXIsIGFyZ3M6RXZlbnREYXRhcG9pbnRBcmdzKXtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnNldERhdGFwb2ludE5hbWVUb1NlbGVjdGVkVHJpZ2dlcihhcmdzLmRhdGFQb2ludEluZm8uZnVsbG5hbWUpO1xyXG4gICAgICAgIERhdGFwb2ludERpYWxvZy5jbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBjYXRjaGVzIHRoZSBkaWFsb2cgY2xvc2UgZXZlbnQgZnJvbSB0aGUgZGF0YXBvaW50IGRpYWxvZ1xyXG4gICAgICogPT4gZGV0YWNoZXMgdGhlIGRpYWxvZyBldmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge30gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge30gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uRGlhbG9nQ2xvc2VkKHNlbmRlciwgYXJncyl7XHJcbiAgICAgICAgRGF0YXBvaW50RGlhbG9nLmV2ZW50QWRkRGF0YXBvaW50LmRldGFjaCh0aGlzLl9hZGREYXRhUG9pbnRIYW5kbGVyKTtcclxuICAgICAgICBEYXRhcG9pbnREaWFsb2cuZXZlbnREaWFsb2dDbG9zZWQuZGV0YWNoKHRoaXMuX2RpYWxvZ0Nsb3NlZEhhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBjYXRjaGVzIHRoZSBkaWFsb2cgY2xvc2UgZXZlbnQgZnJvbSB0aGUgZGF0YXBvaW50IGRpYWxvZ1xyXG4gICAgICogPT4gZGV0YWNoZXMgdGhlIGRpYWxvZyBldmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGF0YVBvaW50TmFtZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldERhdGFwb2ludE5hbWVUb1NlbGVjdGVkVHJpZ2dlcihkYXRhUG9pbnROYW1lOiBzdHJpbmcpe1xyXG4gICAgICAgIHZhciB0cmVlR3JpZE9iaiA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTtcclxuICAgICAgICBsZXQgc3RhcnRUcmlnZ2VySXRlbTtcclxuICAgICAgICBsZXQgYWN0dWFsU2VsZWN0ZWRJdGVtID0gKDxhbnk+dHJlZUdyaWRPYmoubW9kZWwpLnNlbGVjdGVkSXRlbTtcclxuICAgICAgICBpZihhY3R1YWxTZWxlY3RlZEl0ZW0gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYoYWN0dWFsU2VsZWN0ZWRJdGVtLmxldmVsID09IDApe1xyXG4gICAgICAgICAgICAgICAgc3RhcnRUcmlnZ2VySXRlbSA9IGFjdHVhbFNlbGVjdGVkSXRlbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgc3RhcnRUcmlnZ2VySXRlbSA9IGFjdHVhbFNlbGVjdGVkSXRlbS5wYXJlbnRJdGVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm8gc3RhcnQgdHJpZ2dlciBzZWxlY3RlZCFcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTYXZlIGNlbGwgYmV2b3IgdXBkYXRpbmcgdGhlIGRhdGFtb2RlbCB0byBzZWUgdGhlIHJpZ2h0IGRhdGEgYWZ0ZXIgdXBkYXRlXHJcbiAgICAgICAgdHJlZUdyaWRPYmouc2F2ZUNlbGwoKTsgXHJcbiAgICAgICAgbGV0IGRhdGFQb2ludE5hbWVQYXJhbWV0ZXIgPSBzdGFydFRyaWdnZXJJdGVtLml0ZW0uY2hpbGRzLmZpbHRlcih0cmlnZ2VyUGFyYW1ldGVyICA9PiB7cmV0dXJuIHRyaWdnZXJQYXJhbWV0ZXIuaWQgPT0gXCJkYXRhcG9pbnRcIn0pWzBdO1xyXG4gICAgICAgIGlmKGRhdGFQb2ludE5hbWVQYXJhbWV0ZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgZGF0YVBvaW50TmFtZVBhcmFtZXRlci5kaXNwbGF5VmFsdWUgPSBkYXRhUG9pbnROYW1lO1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgc3RhcnRUcmlnZ2VySXRlbS5zZXRWYWx1ZShkYXRhUG9pbnROYW1lUGFyYW1ldGVyLCBkYXRhUG9pbnROYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGNyZWF0ZXMgdGhlIHRyZWUgZ3JpZCBmb3IgdGhlIHRyaWdnZXIgaW5mb3JtYXRpb25zXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlVHJlZUdyaWQoKSB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVEYXRhcG9pbnRzRGlhbG9nKCk7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICQodGhpcy5tYWluRGl2KS5lalRyZWVHcmlkKHtcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKSxcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZENvbHVtblJlc2l6ZVN1cHBvcnQoKSxcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZFRvb2xiYXJTdXBwb3J0KCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDZWxsRWRpdFN1cHBvcnQoKSxcclxuXHJcbiAgICAgICAgICAgIGNoaWxkTWFwcGluZzpcImNoaWxkc1wiLFxyXG4gICAgICAgICAgICBleHBhbmRTdGF0ZU1hcHBpbmc6IFwiZXhwYW5kU3RhdGVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgZXhwYW5kZWQ6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkTm9kZUV4cGFuZGVkT3JDb2xsYXBzZWQoKSxcclxuICAgICAgICAgICAgY29sbGFwc2VkOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZE5vZGVFeHBhbmRlZE9yQ29sbGFwc2VkKCksXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByb3dTZWxlY3RlZDogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRSb3dTZWxlY3RlZChhcmdzKSxcclxuICAgICAgICAgICAgY3JlYXRlOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZENyZWF0ZWQoKSxcclxuICAgICAgICAgICAgYWN0aW9uQmVnaW46IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkQWN0aW9uQmVnaW4oYXJncyksXHJcbiAgICAgICAgICAgIGFjdGlvbkNvbXBsZXRlOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZEFjdGlvbkNvbXBsZXRlKGFyZ3MpLCBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSB0cmVlR3JpZE5vZGVFeHBhbmRlZE9yQ29sbGFwc2VkKCl7XHJcbiAgICAgICAgLy8gUmVmcmVzaCB0byBzZWUgY29ycmVjdCBleHBhbmRlZC9jb2xsYXBzZWQgaWNvblxyXG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiBkZWZpbml0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKToge317XHJcbiAgICAgICAgdGhpcy5fY2VsbEVkaXRUZW1wbGF0ZSA9IFRyYWNlQ29uZmlnVHJpZ2dlclRyZWVHcmlkQ2VsbEVkaXRUZW1wbGF0ZS5jcmVhdGVJbnN0YW5jZSgpO1xyXG4gICAgICAgIHRoaXMuX2NlbGxFZGl0VGVtcGxhdGUuZXZlbnRTZWxlY3Rpb25DaGFuZ2VkLmF0dGFjaCh0aGlzLl9kcm9wRG93bkxpc3RTZWxlY3Rpb25DaGFuZ2VkSGFuZGxlcik7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvbHVtbnM6IFtcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiZGlzcGxheU5hbWVcIiwgaGVhZGVyVGV4dDogXCJOYW1lXCIsIHdpZHRoOiBcIjIwMFwifSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiZGlzcGxheVZhbHVlXCIsIGhlYWRlclRleHQ6IFwiVmFsdWVcIiwgd2lkdGg6IFwiMjAwXCIsIGVkaXRUeXBlOiBcInN0cmluZ2VkaXRcIiwgZWRpdFRlbXBsYXRlOiB0aGlzLl9jZWxsRWRpdFRlbXBsYXRlfVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY29sdW1uIHJlc2l6ZSBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5SZXNpemVTdXBwb3J0KCk6IHt9e1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGFsbG93Q29sdW1uUmVzaXplOiB0cnVlLFxyXG4gICAgICAgICAgICBjb2x1bW5SZXNpemVTZXR0aW5nczogeyBjb2x1bW5SZXNpemVNb2RlOiBlai5UcmVlR3JpZC5Db2x1bW5SZXNpemVNb2RlLkZpeGVkQ29sdW1ucyB9LFxyXG4gICAgICAgICAgICBjb2x1bW5SZXNpemVkOiAoYXJncykgPT4gc3VwZXIucmVzaXplRHluYW1pY0NvbHVtbihhcmdzLmNvbHVtbkluZGV4LCBhcmdzLm1vZGVsKSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIHRvb2xiYXIgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpOiB7fXtcclxuICAgICAgICB0aGlzLl90b29sYmFyID0gbmV3IFRyYWNlQ29uZmlnVHJpZ2dlclRyZWVHcmlkVG9vbGJhcih0aGlzLm1haW5EaXYpO1xyXG4gICAgICAgIHJldHVybiBzdXBlci5nZXRUcmVlR3JpZFRvb2xiYXJTdXBwb3J0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY2VsbCBlZGl0IHNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZENlbGxFZGl0U3VwcG9ydCgpOiB7fXtcclxuXHRcdGxldCBjZWxsRWRpdEV2ZW50cyA9IG5ldyBUcmFjZUNvbmZpZ1RyaWdnZXJUcmVlR3JpZENlbGxFZGl0RXZlbnRzKCk7XHJcblx0XHRyZXR1cm4ge1xyXG4gICAgICAgICAgICBlZGl0U2V0dGluZ3M6IHsgYWxsb3dFZGl0aW5nOiB0cnVlIH0sXHJcbiAgICAgICAgICAgIGJlZ2luRWRpdDogKGFyZ3MpID0+IGNlbGxFZGl0RXZlbnRzLmJlZ2luRWRpdChhcmdzKSxcclxuICAgICAgICAgICAgZW5kRWRpdDogKGFyZ3MpID0+IGNlbGxFZGl0RXZlbnRzLmVuZEVkaXQoYXJncyksXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcbiAgICBwcml2YXRlIHRyZWVHcmlkQWN0aW9uQmVnaW4oYXJncyl7XHJcbiAgICAgICAgLy8gU3VwcG9ydCBcIkVudGYvRGVsXCIga2V5XHJcbiAgICAgICAgaWYoYXJncy5yZXF1ZXN0VHlwZSA9PSBcImRlbGV0ZVwiKXtcclxuICAgICAgICAgICAgdGhpcy5kZWxldGVTdGFydFRyaWdnZXJzKGFyZ3MuZGVsZXRlZEl0ZW1zKTtcclxuICAgICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRyZWVHcmlkQWN0aW9uQ29tcGxldGUoYXJncyl7XHJcbiAgICAgICAgLy8gRXZlbnQgdHJpZ2dlciB3aGlsZSBjaGFuZ2luZyBkYXRhc291cmNlIGR5bmFtaWNhbGx5LiBcclxuICAgICAgICAvLyBjb2RlIHRvIGRvbmUgYWZ0ZXIgdGhlIGR5bmFtaWMgY2hhbmdlIG9mIGRhdGFzb3VyY2UuIFxyXG4gICAgICAgIGlmIChhcmdzLnJlcXVlc3RUeXBlID09PSAncmVmcmVzaERhdGFTb3VyY2UnKSB7IFxyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hTZWxlY3Rpb24oKTtcdFx0XHRcdFx0XHRcclxuICAgICAgICB9IFxyXG4gICAgfVxyXG4gICBcclxuICAgIHByaXZhdGUgdHJlZUdyaWRSb3dTZWxlY3RlZChhcmdzKXtcclxuICAgICAgICBpZihhcmdzLm1vZGVsLnNlbGVjdGVkSXRlbSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUZvb3RlckNvbnRlbnRUb1NlbGVjdGVkSXRlbShhcmdzLm1vZGVsLnNlbGVjdGVkSXRlbSk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVG9vbGJhckJ1dHRvblN0YXRlcyhhcmdzLm1vZGVsLmRhdGFTb3VyY2UsIGFyZ3MubW9kZWwuc2VsZWN0ZWRJdGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZFN0YXJ0VHJpZ2dlcigpe1xyXG4gICAgICAgICg8SVRyYWNlQ29uZmlnVHJpZ2dlckRhdGFNb2RlbD50aGlzLmRhdGFNb2RlbCkuYWRkVHJpZ2dlcigpO1xyXG5cclxuICAgICAgICB0aGlzLnJlZnJlc2hTZWxlY3Rpb24oKTtcclxuXHJcbiAgICAgICAgLy8gR2V0IGFjdHVhbCBzZWxlY3Rpb24gaXRlbVxyXG4gICAgICAgIGNvbnN0IHRyZWVPYmogPSAkKHRoaXMubWFpbkRpdikuZWpUcmVlR3JpZCgnaW5zdGFuY2UnKTsgXHJcbiAgICAgICAgbGV0IHNlbGVjdGVkSXRlbSA9IHRyZWVPYmoubW9kZWwuc2VsZWN0ZWRJdGVtO1xyXG4gICAgICAgIGlmKCB0cmVlT2JqLm1vZGVsLnNlbGVjdGVkUm93SW5kZXggPT0gLTEpe1xyXG4gICAgICAgICAgICBzZWxlY3RlZEl0ZW0gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlVG9vbGJhckJ1dHRvblN0YXRlcyh0cmVlT2JqLm1vZGVsLmRhdGFTb3VyY2UsIHNlbGVjdGVkSXRlbSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlbGV0ZVN0YXJ0VHJpZ2dlcnMoZGVsZXRlSXRlbXMpe1xyXG4gICAgICAgIGxldCBpbmRleExpc3QgPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xyXG4gICAgICAgIGZvcihsZXQgaT1kZWxldGVJdGVtcy5sZW5ndGgtMTsgaSA+PSAwOyBpLS0pe1xyXG4gICAgICAgICAgICBpZihkZWxldGVJdGVtc1tpXS5sZXZlbCA9PSAwKXtcclxuICAgICAgICAgICAgICAgIC8vIE9ubHkgbGV2ZWwgMCBjYW4gYmUgZGVsZXRlZCAoc3RhcnQgdHJpZ2dlciBncm91cCwgbm90IHNpbmdsZSBwYXJhbWV0ZXJzIG9mIHRoaXMgZ3JvdXApXHJcbiAgICAgICAgICAgICAgICBpbmRleExpc3QucHVzaChkZWxldGVJdGVtc1tpXS5oaWVyYXJjaHlSb3dJbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaW5kZXhMaXN0Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAoPElUcmFjZUNvbmZpZ1RyaWdnZXJEYXRhTW9kZWw+dGhpcy5kYXRhTW9kZWwpLnJlbW92ZVRyaWdnZXJzKGluZGV4TGlzdCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hTZWxlY3Rpb24oKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIEdldCBhY3R1YWwgc2VsZWN0aW9uIGl0ZW1cclxuICAgICAgICAgICAgY29uc3QgdHJlZU9iaiA9ICQodGhpcy5tYWluRGl2KS5lalRyZWVHcmlkKCdpbnN0YW5jZScpOyBcclxuICAgICAgICAgICAgbGV0IHNlbGVjdGVkSXRlbSA9IHRyZWVPYmoubW9kZWwuc2VsZWN0ZWRJdGVtO1xyXG4gICAgICAgICAgICBpZiggdHJlZU9iai5tb2RlbC5zZWxlY3RlZFJvd0luZGV4ID09IC0xKXtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkSXRlbSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRvb2xiYXJCdXR0b25TdGF0ZXModHJlZU9iai5tb2RlbC5kYXRhU291cmNlLCBzZWxlY3RlZEl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG9wZW5zIHRoZSBkYXRhcG9pbnQgc2VsZWN0aW9uIGRpYWxvZyBhbmQgYXR0YWNoZXMgdG8gdGhlIGRpYWxvZyBldmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvcGVuRGF0YXBvaW50RGlhbG9nKCl7XHJcbiAgICAgICAgRGF0YXBvaW50RGlhbG9nLmV2ZW50QWRkRGF0YXBvaW50LmF0dGFjaCh0aGlzLl9hZGREYXRhUG9pbnRIYW5kbGVyKTtcclxuICAgICAgICBEYXRhcG9pbnREaWFsb2cuZXZlbnREaWFsb2dDbG9zZWQuYXR0YWNoKHRoaXMuX2RpYWxvZ0Nsb3NlZEhhbmRsZXIpO1xyXG4gICAgICAgIERhdGFwb2ludERpYWxvZy5vcGVuKFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldC5zZWxlY3REYXRhUG9pbnREaWFsb2dUaXRsZSwgRm9vdGVyQ29udGVudFR5cGUuYXBwbHlDbG9zZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWZyZXNoU2VsZWN0aW9uKCl7XHJcblx0XHRjb25zdCB0cmVlT2JqID0gJCh0aGlzLm1haW5EaXYpLmVqVHJlZUdyaWQoJ2luc3RhbmNlJyk7IFxyXG5cdFx0XHRcdFx0XHRcclxuXHRcdC8vIEdldCBhY3R1YWwgc2VsZWN0aW9uIGluZGV4XHJcbiAgICAgICAgbGV0IGFjdHVhbFNlbGVjdGVkUm93SW5kZXggPSB0cmVlT2JqLm1vZGVsLnNlbGVjdGVkUm93SW5kZXg7XHJcbiAgICAgICAgaWYgKGFjdHVhbFNlbGVjdGVkUm93SW5kZXggPT0gLTEpe1xyXG4gICAgICAgICAgICAvLyB1cGRhdGUgdG9vbGJhciBidXR0b25zIGluIGNhc2Ugb2Ygbm8gc2VsZWN0ZWQgaXRlbVxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRvb2xiYXJCdXR0b25TdGF0ZXModHJlZU9iai5tb2RlbC5kYXRhU291cmNlLCB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuXHRcdC8vIFJlc2V0IHNlbGVjdGlvblxyXG5cdFx0dHJlZU9iai5tb2RlbC5zZWxlY3RlZFJvd0luZGV4ID0gLTE7XHJcblx0XHRcclxuXHRcdC8vIFNldCB0byBsYXN0IGluZGV4IGlmIGluZGV4IGlzIG91dCBvZiByYW5nZVxyXG5cdFx0aWYoYWN0dWFsU2VsZWN0ZWRSb3dJbmRleCA+PSB0cmVlT2JqLm1vZGVsLmZsYXRSZWNvcmRzLmxlbmd0aCl7XHJcblx0XHRcdGFjdHVhbFNlbGVjdGVkUm93SW5kZXggPSB0cmVlT2JqLm1vZGVsLmZsYXRSZWNvcmRzLmxlbmd0aC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuXHRcdC8vIFNldCBzZWxlY3Rpb25cclxuXHRcdHRyZWVPYmoubW9kZWwuc2VsZWN0ZWRSb3dJbmRleCA9IGFjdHVhbFNlbGVjdGVkUm93SW5kZXg7XHJcblx0XHRcclxuXHRcdC8vIHVwZGF0ZSB0b29sYmFyIGJ1dHRvbnMgd2l0aCBzZWxlY3RlZCBpdGVtXHJcblx0XHRpZih0cmVlT2JqLm1vZGVsLmZsYXRSZWNvcmRzW2FjdHVhbFNlbGVjdGVkUm93SW5kZXhdICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdHRoaXMudXBkYXRlVG9vbGJhckJ1dHRvblN0YXRlcyh0cmVlT2JqLm1vZGVsLmRhdGFTb3VyY2UsIHRyZWVPYmoubW9kZWwuZmxhdFJlY29yZHNbYWN0dWFsU2VsZWN0ZWRSb3dJbmRleF0uaXRlbSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJpZ2dlciBjb25kaXRpb24oZS5nLiAyMCBmb3IgSU5fV0lORE9XOyAzMCBmb3IgT1VUX1dJTkRPVzsgLi4uKSBmb3IgdGhlIGdpdmVuIGNvbmRpdGlvbiBwYXJhbWV0ZXIgaWQgKGUuZy4gU3RhcnRUcmlnZ2VyMV9Db25kaXRpb24pXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHt9IGRhdGFTb3VyY2VcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb25kaXRpb25QYXJhbWV0ZXJcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJpZ2dlckNvbmRpdGlvblZhbHVlKGRhdGFTb3VyY2UsIGNvbmRpdGlvblBhcmFtZXRlcjogc3RyaW5nKTogbnVtYmVye1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgZGF0YVNvdXJjZS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCAgc3RhcnRUcmlnZ2VyID0gZGF0YVNvdXJjZVtpXTtcclxuICAgICAgICAgICAgZm9yKGxldCBqPTA7IGogPCBzdGFydFRyaWdnZXIuY2hpbGRzLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgICAgIGxldCBwYXJhbWV0ZXIgPSBzdGFydFRyaWdnZXIuY2hpbGRzW2pdO1xyXG4gICAgICAgICAgICAgICAgaWYocGFyYW1ldGVyLmNvbXBvbmVudFBhcmFtZXRlci5icm93c2VOYW1lID09IGNvbmRpdGlvblBhcmFtZXRlcil7XHJcbiAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQocGFyYW1ldGVyLmNvbXBvbmVudFBhcmFtZXRlci52YWx1ZSwgMTApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVmcmVzaGVzIHRyaWdnZXIgcGFyYW1ldGVycyB0cmVlIGdyaWQgd2l0aCB0aGUgY3VycmVudCBtb2RlbCBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVmcmVzaCgpIHtcclxuICAgICAgICBpZiAodGhpcy5yZWZyZXNoRW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldE1vZGVsKHRoaXMuZGF0YU1vZGVsLmRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgXHJcbiAgICBwcml2YXRlIG9uRHJvcERvd25MaXN0U2VsZWN0aW9uQ2hhbmdlZChzZW5kZXIsYXJncyl7XHJcbiAgICAgICAgdGhpcy51cGRhdGVGb290ZXJDb250ZW50KGFyZ3MudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlVG9vbGJhckJ1dHRvblN0YXRlcyhzdGFydFRyaWdnZXJzOiBBcnJheTxhbnk+LCBzZWxlY3RlZEl0ZW0pe1xyXG4gICAgICAgIGxldCB0b29sYmFyID0gdGhpcy5fdG9vbGJhciBhcyBUcmFjZUNvbmZpZ1RyaWdnZXJUcmVlR3JpZFRvb2xiYXI7XHJcbiAgICAgICAgLy8gU2V0IHNlbGVjdCB0cmlnZ2VyIGRhdGFwb2ludCBidXR0b24gc3RhdGVcclxuICAgICAgICBpZihzZWxlY3RlZEl0ZW0gPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdG9vbGJhci5kaXNhYmxlU2VsZWN0VHJpZ2dlckRhdGFQb2ludEJ1dHRvbih0cnVlKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdG9vbGJhci5kaXNhYmxlU2VsZWN0VHJpZ2dlckRhdGFQb2ludEJ1dHRvbihmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFNldCBhZGQgdHJpZ2dlciBidXR0b24gc3RhdGVcclxuICAgICAgICBpZihzdGFydFRyaWdnZXJzLmxlbmd0aCA+IDEpe1xyXG4gICAgICAgICAgICB0b29sYmFyLmRpc2FibGVBZGRCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRvb2xiYXIuZGlzYWJsZUFkZEJ1dHRvbihmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTZXQgcmVtb3ZlIHRyaWdnZXIgYnV0dG9uIHN0YXRlXHJcbiAgICAgICAgaWYoc3RhcnRUcmlnZ2Vycy5sZW5ndGggPT0gMCB8fCBzZWxlY3RlZEl0ZW0gPT0gdW5kZWZpbmVkIHx8IHNlbGVjdGVkSXRlbS5sZXZlbCA+IDApe1xyXG4gICAgICAgICAgICB0b29sYmFyLmRpc2FibGVSZW1vdmVCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRvb2xiYXIuZGlzYWJsZVJlbW92ZUJ1dHRvbihmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXQgfTsiXX0=