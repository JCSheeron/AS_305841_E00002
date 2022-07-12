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
define(["require", "exports", "../common/treeGridWidgetBase", "./view/traceConfigTimingTreeGridToolbar", "./view/traceConfigTimingTreeGridCellEditEvents", "./view/traceConfigTimingTreeGridCellEditTemplate", "./model/traceConfigTimingDataModel", "./componentDefaultDefinition"], function (require, exports, treeGridWidgetBase_1, traceConfigTimingTreeGridToolbar_1, traceConfigTimingTreeGridCellEditEvents_1, traceConfigTimingTreeGridCellEditTemplate_1, traceConfigTimingDataModel_1, componentDefaultDefinition_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implements the TraceConfigTimingWidget
     *
     * @class TraceConfigTimingWidget
     * @extends {TreeGridWidgetBase}
     */
    var TraceConfigTimingWidget = /** @class */ (function (_super) {
        __extends(TraceConfigTimingWidget, _super);
        function TraceConfigTimingWidget() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Defines the height of the header
         *
         * @returns {number}
         * @memberof TraceConfigTimingWidget
         */
        TraceConfigTimingWidget.prototype.defineHeaderHeight = function () {
            return 30;
        };
        /**
         * Defines the height of the footer
         *
         * @returns {number}
         * @memberof TraceConfigTimingWidget
         */
        TraceConfigTimingWidget.prototype.defineFooterHeight = function () {
            return 290;
        };
        TraceConfigTimingWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
            this.component.disablePersisting();
        };
        TraceConfigTimingWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            _super.prototype.setHeaderContent.call(this, "Timing");
            this.initFooterContent();
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 0, 100);
        };
        /**
         * Processes trace timing parameter changes
         *
         * @private
         * @param {MappCockpitComponentParameter[]} traceTimingParameters
         * @memberof TraceConfigTimingWidget
         */
        TraceConfigTimingWidget.prototype.initializeTraceTimingParameters = function (traceTimingParameters) {
            if (traceTimingParameters.length > 0) {
                var traceConfigTimingDataModel = new traceConfigTimingDataModel_1.TraceConfigTimingDataModel();
                traceConfigTimingDataModel.initialize();
                this.dataModel = traceConfigTimingDataModel;
                traceConfigTimingDataModel.initData = traceTimingParameters;
            }
        };
        /** initialize the footer content
         *
         * @memberof TraceConfigTimingWidget
         */
        TraceConfigTimingWidget.prototype.initFooterContent = function () {
            var coTraceSetTimingImagePath = "widgets/traceConfigTimingWidget/resources/images/TraceTimingDiagram_TotalRecordingTime.svg";
            _super.prototype.setFooterContent.call(this, "Timing diagram:<br> \n        <img src=\"" + coTraceSetTimingImagePath + "\"></br>1... The first start trigger is detected.");
        };
        /**
         * implements the model change handling
         *
         * @param {IDataModel} sender
         * @param {EventModelChangedArgs} data
         * @returns {*}
         * @memberof TraceConfigTimingWidget
         */
        TraceConfigTimingWidget.prototype.handleModelChanged = function (sender, eventArgs) {
            this.refreshTimingParameterValues(this.dataModel.data);
        };
        /**
         * handles the changes of observed items requested by 'observeDataModelItems'
         *
         * @param {IDataModel} sender
         * @param {EventModelChangedArgs} data
         * @memberof TraceConfigTimingWidget
         */
        TraceConfigTimingWidget.prototype.handleModelItemsChanged = function (sender, eventArgs) {
            this.refreshTimingParameterValues(this.dataModel.data);
        };
        /** creates the tree grid for the timing informations
         *
         * @memberof TraceConfigTimingWidget
         */
        TraceConfigTimingWidget.prototype.createTreeGrid = function () {
            var _this = this;
            var cellEditEvents = new traceConfigTimingTreeGridCellEditEvents_1.TraceConfigTimingTreeGridCellEditEvents();
            $(this.mainDiv).ejTreeGrid(__assign(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridColumnResizeSupport()), this.getTreeGridToolbarSupport()), { editSettings: {
                    allowEditing: true,
                    allowDeleting: false,
                }, create: function (args) { return _this.treeGridCreated(); }, beginEdit: function (args) { return cellEditEvents.beginEdit(args); }, endEdit: function (args) { return cellEditEvents.endEdit(args, _this.dataModel); } }));
        };
        /**
         * Returns the tree grid column definition
         *
         * @private
         * @returns {{}}
         * @memberof TraceConfigTimingWidget
         */
        TraceConfigTimingWidget.prototype.getTreeGridColumnDefinition = function () {
            var cellEditTemplate = traceConfigTimingTreeGridCellEditTemplate_1.TraceConfigTimingTreeGridCellEditTemplate.createInstance();
            return {
                columns: [
                    { field: "displayName", headerText: "Name" },
                    { field: "displayValue", headerText: "Value", width: "200", editType: "stringedit", editTemplate: cellEditTemplate },
                    { field: "engineeringunit", headerText: "Unit", width: "100" },
                ],
            };
        };
        /**
         * Returns the tree grid column resize settings
         *
         * @private
         * @returns {{}}
         * @memberof TraceConfigTimingWidget
         */
        TraceConfigTimingWidget.prototype.getTreeGridColumnResizeSupport = function () {
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
         * @memberof TraceConfigTimingWidget
         */
        TraceConfigTimingWidget.prototype.getTreeGridToolbarSupport = function () {
            this._toolbar = new traceConfigTimingTreeGridToolbar_1.TraceConfigTimingTreeGridToolbar(this.mainDiv);
            return _super.prototype.getTreeGridToolbarSupport.call(this);
        };
        /**
         * refreshes the content of the timing parameters value fields
         *
         * @private
         * @param {TimingParameter[]} timingParameters
         * @memberof TraceConfigTimingWidget
         */
        TraceConfigTimingWidget.prototype.refreshTimingParameterValues = function (timingParameters) {
            $(this.mainDiv).ejTreeGrid({
                dataSource: timingParameters,
            });
        };
        return TraceConfigTimingWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.TraceConfigTimingWidget = TraceConfigTimingWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWdUaW1pbmdXaWRnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvdHJhY2VDb25maWdUaW1pbmdXaWRnZXQvdHJhY2VDb25maWdUaW1pbmdXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBWUE7Ozs7O09BS0c7SUFDSDtRQUFzQywyQ0FBa0I7UUFBeEQ7O1FBc0tBLENBQUM7UUFwS0c7Ozs7O1dBS0c7UUFDSCxvREFBa0IsR0FBbEI7WUFDSSxPQUFPLEVBQUUsQ0FBQztRQUNkLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILG9EQUFrQixHQUFsQjtZQUNJLE9BQU8sR0FBRyxDQUFDO1FBQ2YsQ0FBQztRQUVELHFEQUFtQixHQUFuQjtZQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsSUFBSSx1REFBMEIsRUFBRSxDQUFDLENBQUM7WUFDdEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3ZDLENBQUM7UUFHRCw2Q0FBVyxHQUFYO1lBQ0ksaUJBQU0sV0FBVyxXQUFFLENBQUM7WUFFcEIsaUJBQU0sZ0JBQWdCLFlBQUMsUUFBUSxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFFekIsOEJBQThCO1lBQzlCLGlCQUFNLGdCQUFnQixZQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssaUVBQStCLEdBQXZDLFVBQXdDLHFCQUFzRDtZQUMxRixJQUFHLHFCQUFxQixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUM7Z0JBQ2hDLElBQUksMEJBQTBCLEdBQUcsSUFBSSx1REFBMEIsRUFBaUMsQ0FBQztnQkFDakcsMEJBQTBCLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyxTQUFT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QXlCLFdBQUUsQ0FBQztRQUM3QyxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssOERBQTRCLEdBQXBDLFVBQXFDLGdCQUFtQztZQUNwRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQztnQkFDdkIsVUFBVSxFQUFFLGdCQUFnQjthQUMvQixDQUFDLENBQUM7UUFDUCxDQUFDO1FBQ0wsOEJBQUM7SUFBRCxDQUFDLEFBdEtELENBQXNDLHVDQUFrQixHQXNLdkQ7SUFFUSwwREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJVHJhY2VDb25maWdUaW1pbmdXaWRnZXQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL3RyYWNlQ29uZmlnVGltaW5nV2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRyZWVHcmlkV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vdHJlZUdyaWRXaWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IElEYXRhTW9kZWwsIEV2ZW50TW9kZWxDaGFuZ2VkQXJncyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRpbWluZ1BhcmFtZXRlciB9IGZyb20gXCIuL21vZGVsL3RpbWluZ1BhcmFtZXRlclwiO1xyXG5pbXBvcnQgeyBUcmFjZUNvbmZpZ1RpbWluZ1RyZWVHcmlkVG9vbGJhciB9IGZyb20gXCIuL3ZpZXcvdHJhY2VDb25maWdUaW1pbmdUcmVlR3JpZFRvb2xiYXJcIjtcclxuaW1wb3J0IHsgVHJhY2VDb25maWdUaW1pbmdUcmVlR3JpZENlbGxFZGl0RXZlbnRzIH0gZnJvbSBcIi4vdmlldy90cmFjZUNvbmZpZ1RpbWluZ1RyZWVHcmlkQ2VsbEVkaXRFdmVudHNcIjtcclxuaW1wb3J0IHsgSVRyYWNlQ29uZmlnVGltaW5nRGF0YU1vZGVsIH0gZnJvbSBcIi4vbW9kZWwvdHJhY2VDb25maWdUaW1pbmdEYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHJhY2VDb25maWdUaW1pbmdUcmVlR3JpZENlbGxFZGl0VGVtcGxhdGUgfSBmcm9tIFwiLi92aWV3L3RyYWNlQ29uZmlnVGltaW5nVHJlZUdyaWRDZWxsRWRpdFRlbXBsYXRlXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgVHJhY2VDb25maWdUaW1pbmdEYXRhTW9kZWwgfSBmcm9tIFwiLi9tb2RlbC90cmFjZUNvbmZpZ1RpbWluZ0RhdGFNb2RlbFwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbiB9IGZyb20gXCIuL2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXCI7XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyB0aGUgVHJhY2VDb25maWdUaW1pbmdXaWRnZXRcclxuICpcclxuICogQGNsYXNzIFRyYWNlQ29uZmlnVGltaW5nV2lkZ2V0XHJcbiAqIEBleHRlbmRzIHtUcmVlR3JpZFdpZGdldEJhc2V9XHJcbiAqL1xyXG5jbGFzcyBUcmFjZUNvbmZpZ1RpbWluZ1dpZGdldCBleHRlbmRzIFRyZWVHcmlkV2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElUcmFjZUNvbmZpZ1RpbWluZ1dpZGdldCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIHRoZSBoZWlnaHQgb2YgdGhlIGhlYWRlclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUaW1pbmdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgZGVmaW5lSGVhZGVySGVpZ2h0KCk6IG51bWJlcntcclxuICAgICAgICByZXR1cm4gMzA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIHRoZSBoZWlnaHQgb2YgdGhlIGZvb3RlclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUaW1pbmdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgZGVmaW5lRm9vdGVySGVpZ2h0KCk6IG51bWJlcntcclxuICAgICAgICByZXR1cm4gMjkwO1xyXG4gICAgfVxyXG4gICBcclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXREZWZhdWx0RGVmaW5pdGlvbihuZXcgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24oKSk7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZGlzYWJsZVBlcnNpc3RpbmcoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgaW5pdGlhbGl6ZWQoKXtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplZCgpO1xyXG5cclxuICAgICAgICBzdXBlci5zZXRIZWFkZXJDb250ZW50KFwiVGltaW5nXCIpO1xyXG4gICAgICAgIHRoaXMuaW5pdEZvb3RlckNvbnRlbnQoKTtcclxuXHJcbiAgICAgICAgLy8gU2V0IGR5bmFtaWMgY29sdW1uIHNldHRpbmdzXHJcbiAgICAgICAgc3VwZXIuc2V0RHluYW1pY0NvbHVtbigwLCAxMDApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvY2Vzc2VzIHRyYWNlIHRpbWluZyBwYXJhbWV0ZXIgY2hhbmdlc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IHRyYWNlVGltaW5nUGFyYW1ldGVyc1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVGltaW5nV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZVRyYWNlVGltaW5nUGFyYW1ldGVycyh0cmFjZVRpbWluZ1BhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pOiB2b2lkIHtcclxuICAgICAgICBpZih0cmFjZVRpbWluZ1BhcmFtZXRlcnMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIGxldCB0cmFjZUNvbmZpZ1RpbWluZ0RhdGFNb2RlbCA9IG5ldyBUcmFjZUNvbmZpZ1RpbWluZ0RhdGFNb2RlbCgpIGFzIElUcmFjZUNvbmZpZ1RpbWluZ0RhdGFNb2RlbDtcclxuICAgICAgICAgICAgdHJhY2VDb25maWdUaW1pbmdEYXRhTW9kZWwuaW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFNb2RlbCA9IHRyYWNlQ29uZmlnVGltaW5nRGF0YU1vZGVsO1xyXG4gICAgICAgICAgICB0cmFjZUNvbmZpZ1RpbWluZ0RhdGFNb2RlbC5pbml0RGF0YSA9IHRyYWNlVGltaW5nUGFyYW1ldGVyczsgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKiogaW5pdGlhbGl6ZSB0aGUgZm9vdGVyIGNvbnRlbnRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUaW1pbmdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0Rm9vdGVyQ29udGVudCgpe1xyXG4gICAgICAgIGxldCBjb1RyYWNlU2V0VGltaW5nSW1hZ2VQYXRoID0gXCJ3aWRnZXRzL3RyYWNlQ29uZmlnVGltaW5nV2lkZ2V0L3Jlc291cmNlcy9pbWFnZXMvVHJhY2VUaW1pbmdEaWFncmFtX1RvdGFsUmVjb3JkaW5nVGltZS5zdmdcIjtcclxuICAgICAgICBzdXBlci5zZXRGb290ZXJDb250ZW50KGBUaW1pbmcgZGlhZ3JhbTo8YnI+IFxyXG4gICAgICAgIDxpbWcgc3JjPVwiYCArIGNvVHJhY2VTZXRUaW1pbmdJbWFnZVBhdGggKyBgXCI+PC9icj4xLi4uIFRoZSBmaXJzdCBzdGFydCB0cmlnZ2VyIGlzIGRldGVjdGVkLmApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaW1wbGVtZW50cyB0aGUgbW9kZWwgY2hhbmdlIGhhbmRsaW5nXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJRGF0YU1vZGVsfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7RXZlbnRNb2RlbENoYW5nZWRBcmdzfSBkYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RpbWluZ1dpZGdldFxyXG4gICAgICovXHJcbiAgICBoYW5kbGVNb2RlbENoYW5nZWQoc2VuZGVyOiBJRGF0YU1vZGVsLCBldmVudEFyZ3M6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyk6IGFueSB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoVGltaW5nUGFyYW1ldGVyVmFsdWVzKHRoaXMuZGF0YU1vZGVsLmRhdGEgYXMgQXJyYXk8VGltaW5nUGFyYW1ldGVyPik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBoYW5kbGVzIHRoZSBjaGFuZ2VzIG9mIG9ic2VydmVkIGl0ZW1zIHJlcXVlc3RlZCBieSAnb2JzZXJ2ZURhdGFNb2RlbEl0ZW1zJ1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SURhdGFNb2RlbH0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50TW9kZWxDaGFuZ2VkQXJnc30gZGF0YVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVGltaW5nV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGhhbmRsZU1vZGVsSXRlbXNDaGFuZ2VkKHNlbmRlcjogSURhdGFNb2RlbCwgZXZlbnRBcmdzOiBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MpIHtcclxuICAgICAgICB0aGlzLnJlZnJlc2hUaW1pbmdQYXJhbWV0ZXJWYWx1ZXModGhpcy5kYXRhTW9kZWwuZGF0YSBhcyBBcnJheTxUaW1pbmdQYXJhbWV0ZXI+KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqIGNyZWF0ZXMgdGhlIHRyZWUgZ3JpZCBmb3IgdGhlIHRpbWluZyBpbmZvcm1hdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUaW1pbmdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVRyZWVHcmlkKCkge1xyXG4gICAgICAgIHZhciBjZWxsRWRpdEV2ZW50cyA9IG5ldyBUcmFjZUNvbmZpZ1RpbWluZ1RyZWVHcmlkQ2VsbEVkaXRFdmVudHMoKTtcclxuXHJcbiAgICAgICAgJCh0aGlzLm1haW5EaXYpLmVqVHJlZUdyaWQoe1xyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkVG9vbGJhclN1cHBvcnQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgZWRpdFNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICBhbGxvd0VkaXRpbmc6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBhbGxvd0RlbGV0aW5nIDogZmFsc2UsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNyZWF0ZTogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRDcmVhdGVkKCksXHJcbiAgICAgICAgICAgIGJlZ2luRWRpdDogKGFyZ3MpID0+IGNlbGxFZGl0RXZlbnRzLmJlZ2luRWRpdChhcmdzKSxcclxuICAgICAgICAgICAgZW5kRWRpdDogKGFyZ3MpID0+IGNlbGxFZGl0RXZlbnRzLmVuZEVkaXQoYXJncywgPElUcmFjZUNvbmZpZ1RpbWluZ0RhdGFNb2RlbD50aGlzLmRhdGFNb2RlbCksXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY29sdW1uIGRlZmluaXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVGltaW5nV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCk6IHt9e1xyXG4gICAgICAgIGxldCBjZWxsRWRpdFRlbXBsYXRlID0gVHJhY2VDb25maWdUaW1pbmdUcmVlR3JpZENlbGxFZGl0VGVtcGxhdGUuY3JlYXRlSW5zdGFuY2UoKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb2x1bW5zOiBbXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcImRpc3BsYXlOYW1lXCIsIGhlYWRlclRleHQ6IFwiTmFtZVwifSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiZGlzcGxheVZhbHVlXCIsIGhlYWRlclRleHQ6IFwiVmFsdWVcIiwgd2lkdGg6IFwiMjAwXCIsIGVkaXRUeXBlOiBcInN0cmluZ2VkaXRcIiwgZWRpdFRlbXBsYXRlOiBjZWxsRWRpdFRlbXBsYXRlfSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiZW5naW5lZXJpbmd1bml0XCIsIGhlYWRlclRleHQ6IFwiVW5pdFwiLCB3aWR0aDogXCIxMDBcIn0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCBjb2x1bW4gcmVzaXplIHNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RpbWluZ1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpOiB7fXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBhbGxvd0NvbHVtblJlc2l6ZTogdHJ1ZSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplU2V0dGluZ3M6IHsgY29sdW1uUmVzaXplTW9kZTogZWouVHJlZUdyaWQuQ29sdW1uUmVzaXplTW9kZS5GaXhlZENvbHVtbnMgfSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplZDogKGFyZ3MpID0+IHN1cGVyLnJlc2l6ZUR5bmFtaWNDb2x1bW4oYXJncy5jb2x1bW5JbmRleCwgYXJncy5tb2RlbCksXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCB0b29sYmFyIHNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RpbWluZ1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpOiB7fXtcclxuICAgICAgICB0aGlzLl90b29sYmFyID0gbmV3IFRyYWNlQ29uZmlnVGltaW5nVHJlZUdyaWRUb29sYmFyKHRoaXMubWFpbkRpdik7XHJcbiAgICAgICAgcmV0dXJuIHN1cGVyLmdldFRyZWVHcmlkVG9vbGJhclN1cHBvcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlZnJlc2hlcyB0aGUgY29udGVudCBvZiB0aGUgdGltaW5nIHBhcmFtZXRlcnMgdmFsdWUgZmllbGRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7VGltaW5nUGFyYW1ldGVyW119IHRpbWluZ1BhcmFtZXRlcnNcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RpbWluZ1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlZnJlc2hUaW1pbmdQYXJhbWV0ZXJWYWx1ZXModGltaW5nUGFyYW1ldGVyczogVGltaW5nUGFyYW1ldGVyW10pIHtcclxuICAgICAgICAkKHRoaXMubWFpbkRpdikuZWpUcmVlR3JpZCh7XHJcbiAgICAgICAgICAgIGRhdGFTb3VyY2U6IHRpbWluZ1BhcmFtZXRlcnMsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFRyYWNlQ29uZmlnVGltaW5nV2lkZ2V0IH07Il19