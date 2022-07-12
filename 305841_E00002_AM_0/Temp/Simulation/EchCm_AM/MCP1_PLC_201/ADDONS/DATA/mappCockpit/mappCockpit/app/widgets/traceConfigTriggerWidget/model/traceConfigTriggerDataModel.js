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
define(["require", "exports", "./triggerParameter", "./triggerGroup", "../../../models/dataModelBase", "../../../models/diagnostics/trace/traceStartTrigger", "../../../models/dataModelInterface", "../../../models/diagnostics/trace/traceConfig/traceConfigValueConverter"], function (require, exports, triggerParameter_1, triggerGroup_1, dataModelBase_1, traceStartTrigger_1, dataModelInterface_1, traceConfigValueConverter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implements the data model for the trigger settings
     *
     * @class TraceConfigTriggerDataModel
     * @implements {ITraceConfigTriggerDataModel}
     */
    var TraceConfigTriggerDataModel = /** @class */ (function (_super) {
        __extends(TraceConfigTriggerDataModel, _super);
        function TraceConfigTriggerDataModel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * initializes the data model
         *
         * @memberof TraceConfigTriggerDataModel
         */
        TraceConfigTriggerDataModel.prototype.initialize = function () {
        };
        Object.defineProperty(TraceConfigTriggerDataModel.prototype, "initData", {
            /**
             * Sets the trigger informations
             *
             * @memberof TraceConfigTriggerDataModel
             */
            set: function (startTriggersObject) {
                this._startTriggers = startTriggersObject.data;
                this._startTriggerInfos = startTriggersObject.info;
                // set the data model object to the given start triggers
                this.updateData();
                var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, "componentParametersUpdated", this.data);
                this.onModelChanged(this, eventArgs);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Adds a new start trigger at the end of the start trigger list
         *
         * @returns
         * @memberof TraceConfigTriggerDataModel
         */
        TraceConfigTriggerDataModel.prototype.addTrigger = function () {
            var triggerInstance = this.data.length + 1;
            if (triggerInstance == 3) {
                // Maximum two start triggers are supported
                console.info("Maximum two start triggers are supported!");
                return;
            }
            var newStartTrigger = new traceStartTrigger_1.TraceStartTrigger(traceConfigValueConverter_1.ConditionIds.InWindow.toString(), "", "0", "0");
            this._startTriggers.push(newStartTrigger);
            var triggerInstanceId = "StartTrigger" + triggerInstance + "_";
            // initialze new trigger group
            var triggerGroup = new triggerGroup_1.TriggerGroup("Start trigger " + triggerInstance, newStartTrigger);
            this.setDefaultTriggerGroupData(triggerGroup, triggerInstanceId);
            this.data.push(triggerGroup);
            var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, "componentParametersUpdated", this.data);
            this.onModelChanged(this, eventArgs);
        };
        /**
         * Removes all start triggers with the index listed in the indexList(use reverse sorting)
         *
         * @param {Array<number>} indexList
         * @returns
         * @memberof TraceConfigTriggerDataModel
         */
        TraceConfigTriggerDataModel.prototype.removeTriggers = function (indexList) {
            if (indexList.length == 0) {
                return;
            }
            for (var i = 0; i < indexList.length; i++) {
                var startTriggerRef = this._data[indexList[i]]._startTriggerRef;
                this._data.splice(indexList[i], 1);
                if (this._data.length > indexList[i]) {
                    // update starttrigger ref of following start triggers (actual only one following)
                    this._data[indexList[i]]._startTriggerRef = startTriggerRef;
                    this._data[indexList[i]].displayName = "Start trigger 1";
                }
                this._startTriggers.splice(indexList[i], 1);
                console.log("removed trigger index: " + indexList[i]);
            }
            var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, "componentParametersUpdated", this.data);
            this.onModelChanged(this, eventArgs);
        };
        /**
         * Set default values for new start trigger
         *
         * @private
         * @param {*} triggerGroup
         * @param {*} triggerInstanceId
         * @memberof TraceConfigTriggerDataModel
         */
        TraceConfigTriggerDataModel.prototype.setDefaultTriggerGroupData = function (triggerGroup, triggerInstanceId) {
            this.setTriggerGroupData(triggerGroup, triggerInstanceId, traceConfigValueConverter_1.TraceConfigValueConverter.getTriggerConditionDisplayName(traceConfigValueConverter_1.ConditionIds.InWindow.toString()), "", "0", "0");
        };
        /**
         * Sets trigger informations(datapointname, condition, threshold, window) to the given trigger group
         *
         * @private
         * @param {*} triggerGroup
         * @param {*} triggerInstanceId
         * @param {*} condition
         * @param {*} dataPointName
         * @param {*} threshold
         * @param {*} window
         * @memberof TraceConfigTriggerDataModel
         */
        TraceConfigTriggerDataModel.prototype.setTriggerGroupData = function (triggerGroup, triggerInstanceId, condition, dataPointName, threshold, window) {
            var conditionParamInfo = this._startTriggerInfos.filter(function (param) { return param.browseName == triggerInstanceId + "Condition"; })[0];
            triggerGroup.childs.push(new triggerParameter_1.TriggerParameter(triggerGroup_1.TriggerPropertIds.Condition, "Condition", condition, "", conditionParamInfo));
            var dataPointParamInfo = this._startTriggerInfos.filter(function (param) { return param.browseName == triggerInstanceId + "DataPoint"; })[0];
            triggerGroup.childs.push(new triggerParameter_1.TriggerParameter(triggerGroup_1.TriggerPropertIds.Datapoint, "Data point", dataPointName, "", dataPointParamInfo));
            var thresholdParamInfo = this._startTriggerInfos.filter(function (param) { return param.browseName == triggerInstanceId + "Threshold"; })[0];
            triggerGroup.childs.push(new triggerParameter_1.TriggerParameter(triggerGroup_1.TriggerPropertIds.Threshold, "Threshold", threshold, "", thresholdParamInfo));
            var windowParamInfo = this._startTriggerInfos.filter(function (param) { return param.browseName == triggerInstanceId + "Window"; })[0];
            triggerGroup.childs.push(new triggerParameter_1.TriggerParameter(triggerGroup_1.TriggerPropertIds.Window, "Window", window, "", windowParamInfo));
        };
        /**
         * Updates the datamodel with teh given start triggers _startTriggers
         *
         * @private
         * @returns {TriggerGroup[]}
         * @memberof TraceConfigTriggerDataModel
         */
        TraceConfigTriggerDataModel.prototype.updateData = function () {
            this._data = new Array();
            for (var index = 0; index < this._startTriggers.length; index++) {
                var instance = index + 1;
                var triggerInstanceId = "StartTrigger" + instance + "_";
                var startTrigger = this._startTriggers[index];
                // create new trigger group
                var triggerGroup = new triggerGroup_1.TriggerGroup("Start trigger " + instance, startTrigger);
                this._data.push(triggerGroup);
                var triggerConditionDisplayName = traceConfigValueConverter_1.TraceConfigValueConverter.getTriggerConditionDisplayName(startTrigger.condition);
                // set trigger parameters within the trigger group
                this.setTriggerGroupData(triggerGroup, triggerInstanceId, triggerConditionDisplayName, startTrigger.dataPointName, startTrigger.threshold, startTrigger.window);
            }
        };
        return TraceConfigTriggerDataModel;
    }(dataModelBase_1.DataModelBase));
    exports.TraceConfigTriggerDataModel = TraceConfigTriggerDataModel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWdUcmlnZ2VyRGF0YU1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlQ29uZmlnVHJpZ2dlcldpZGdldC9tb2RlbC90cmFjZUNvbmZpZ1RyaWdnZXJEYXRhTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVVBOzs7OztPQUtHO0lBQ0g7UUFBMEMsK0NBQWE7UUFBdkQ7O1FBZ0pBLENBQUM7UUEzSUc7Ozs7V0FJRztRQUNILGdEQUFVLEdBQVY7UUFFQSxDQUFDO1FBT0Qsc0JBQVcsaURBQVE7WUFMbkI7Ozs7ZUFJRztpQkFDSCxVQUFvQixtQkFBbUI7Z0JBRW5DLElBQUksQ0FBQyxjQUFjLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDO2dCQUMvQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDO2dCQUVuRCx3REFBd0Q7Z0JBQ3hELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFFbEIsSUFBSSxTQUFTLEdBQUcsSUFBSSwwQ0FBcUIsQ0FBQyxJQUFJLEVBQUUsb0NBQWUsQ0FBQyxZQUFZLEVBQUUsNEJBQTRCLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN2SCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztZQUN6QyxDQUFDOzs7V0FBQTtRQUVEOzs7OztXQUtHO1FBQ0ksZ0RBQVUsR0FBakI7WUFDSSxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUM7WUFDekMsSUFBRyxlQUFlLElBQUksQ0FBQyxFQUFDO2dCQUNwQiwyQ0FBMkM7Z0JBQzNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsMkNBQTJDLENBQUMsQ0FBQTtnQkFDekQsT0FBTzthQUNWO1lBQ0QsSUFBSSxlQUFlLEdBQUcsSUFB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QyxBQWhKRCxDQUEwQyw2QkFBYSxHQWdKdEQ7SUFFUSxrRUFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgSVRyYWNlQ29uZmlnVHJpZ2dlckRhdGFNb2RlbCB9IGZyb20gXCIuL3RyYWNlQ29uZmlnVHJpZ2dlckRhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUcmlnZ2VyUGFyYW1ldGVyIH0gZnJvbSBcIi4vdHJpZ2dlclBhcmFtZXRlclwiO1xyXG5pbXBvcnQgeyBUcmlnZ2VyR3JvdXAsIFRyaWdnZXJQcm9wZXJ0SWRzIH0gZnJvbSBcIi4vdHJpZ2dlckdyb3VwXCI7XHJcbmltcG9ydCB7IERhdGFNb2RlbEJhc2UgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2RhdGFNb2RlbEJhc2VcIjtcclxuaW1wb3J0IHsgVHJhY2VTdGFydFRyaWdnZXIgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2RpYWdub3N0aWNzL3RyYWNlL3RyYWNlU3RhcnRUcmlnZ2VyXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgRXZlbnRNb2RlbENoYW5nZWRBcmdzLCBNb2RlbENoYW5nZVR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2RhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUcmFjZUNvbmZpZ1ZhbHVlQ29udmVydGVyLCBDb25kaXRpb25JZHMgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2RpYWdub3N0aWNzL3RyYWNlL3RyYWNlQ29uZmlnL3RyYWNlQ29uZmlnVmFsdWVDb252ZXJ0ZXJcIjtcclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRzIHRoZSBkYXRhIG1vZGVsIGZvciB0aGUgdHJpZ2dlciBzZXR0aW5nc1xyXG4gKlxyXG4gKiBAY2xhc3MgVHJhY2VDb25maWdUcmlnZ2VyRGF0YU1vZGVsXHJcbiAqIEBpbXBsZW1lbnRzIHtJVHJhY2VDb25maWdUcmlnZ2VyRGF0YU1vZGVsfVxyXG4gKi9cclxuY2xhc3MgVHJhY2VDb25maWdUcmlnZ2VyRGF0YU1vZGVsIGV4dGVuZHMgRGF0YU1vZGVsQmFzZSBpbXBsZW1lbnRzIElUcmFjZUNvbmZpZ1RyaWdnZXJEYXRhTW9kZWwge1xyXG5cclxuICAgIHByaXZhdGUgX3N0YXJ0VHJpZ2dlcnM6IFRyYWNlU3RhcnRUcmlnZ2VyW118dW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfc3RhcnRUcmlnZ2VySW5mb3M6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW118dW5kZWZpbmVkO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIGluaXRpYWxpemVzIHRoZSBkYXRhIG1vZGVsXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlckRhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplKCkge1xyXG5cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB0cmlnZ2VyIGluZm9ybWF0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RyaWdnZXJEYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBpbml0RGF0YShzdGFydFRyaWdnZXJzT2JqZWN0KSB7XHJcblxyXG4gICAgICAgIHRoaXMuX3N0YXJ0VHJpZ2dlcnMgPSBzdGFydFRyaWdnZXJzT2JqZWN0LmRhdGE7XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUcmlnZ2VySW5mb3MgPSBzdGFydFRyaWdnZXJzT2JqZWN0LmluZm87XHJcblxyXG4gICAgICAgIC8vIHNldCB0aGUgZGF0YSBtb2RlbCBvYmplY3QgdG8gdGhlIGdpdmVuIHN0YXJ0IHRyaWdnZXJzXHJcbiAgICAgICAgdGhpcy51cGRhdGVEYXRhKCk7XHJcblxyXG4gICAgICAgIHZhciBldmVudEFyZ3MgPSBuZXcgRXZlbnRNb2RlbENoYW5nZWRBcmdzKHRoaXMsIE1vZGVsQ2hhbmdlVHlwZS51cGRhdGVUYXJnZXQsIFwiY29tcG9uZW50UGFyYW1ldGVyc1VwZGF0ZWRcIiwgdGhpcy5kYXRhKTtcclxuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMsIGV2ZW50QXJncyk7IFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIG5ldyBzdGFydCB0cmlnZ2VyIGF0IHRoZSBlbmQgb2YgdGhlIHN0YXJ0IHRyaWdnZXIgbGlzdFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUcmlnZ2VyRGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRUcmlnZ2VyKCl7XHJcbiAgICAgICAgbGV0IHRyaWdnZXJJbnN0YW5jZSA9IHRoaXMuZGF0YS5sZW5ndGgrMTtcclxuICAgICAgICBpZih0cmlnZ2VySW5zdGFuY2UgPT0gMyl7XHJcbiAgICAgICAgICAgIC8vIE1heGltdW0gdHdvIHN0YXJ0IHRyaWdnZXJzIGFyZSBzdXBwb3J0ZWRcclxuICAgICAgICAgICAgY29uc29sZS5pbmZvKFwiTWF4aW11bSB0d28gc3RhcnQgdHJpZ2dlcnMgYXJlIHN1cHBvcnRlZCFcIilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbmV3U3RhcnRUcmlnZ2VyID0gbmV3IFRyYWNlU3RhcnRUcmlnZ2VyKENvbmRpdGlvbklkcy5JbldpbmRvdy50b1N0cmluZygpLCBcIlwiLCBcIjBcIiwgXCIwXCIpO1xyXG4gICAgICAgIHRoaXMuX3N0YXJ0VHJpZ2dlcnMhLnB1c2gobmV3U3RhcnRUcmlnZ2VyKTtcclxuICAgICAgICBsZXQgdHJpZ2dlckluc3RhbmNlSWQgPSBcIlN0YXJ0VHJpZ2dlclwiICsgdHJpZ2dlckluc3RhbmNlICsgXCJfXCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gaW5pdGlhbHplIG5ldyB0cmlnZ2VyIGdyb3VwXHJcbiAgICAgICAgbGV0IHRyaWdnZXJHcm91cCA9IG5ldyBUcmlnZ2VyR3JvdXAoXCJTdGFydCB0cmlnZ2VyIFwiKyB0cmlnZ2VySW5zdGFuY2UsIG5ld1N0YXJ0VHJpZ2dlcik7XHJcbiAgICAgICAgdGhpcy5zZXREZWZhdWx0VHJpZ2dlckdyb3VwRGF0YSh0cmlnZ2VyR3JvdXAsIHRyaWdnZXJJbnN0YW5jZUlkKTsgICBcclxuICAgICAgICB0aGlzLmRhdGEucHVzaCh0cmlnZ2VyR3JvdXApO1xyXG4gICAgICAgXHJcbiAgICAgICAgdmFyIGV2ZW50QXJncyA9IG5ldyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3ModGhpcywgTW9kZWxDaGFuZ2VUeXBlLnVwZGF0ZVRhcmdldCwgXCJjb21wb25lbnRQYXJhbWV0ZXJzVXBkYXRlZFwiLCB0aGlzLmRhdGEpO1xyXG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcywgZXZlbnRBcmdzKTsgXHJcbiAgICB9XHJcbiAgICAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBhbGwgc3RhcnQgdHJpZ2dlcnMgd2l0aCB0aGUgaW5kZXggbGlzdGVkIGluIHRoZSBpbmRleExpc3QodXNlIHJldmVyc2Ugc29ydGluZylcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IGluZGV4TGlzdFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RyaWdnZXJEYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlbW92ZVRyaWdnZXJzKGluZGV4TGlzdDogQXJyYXk8bnVtYmVyPil7XHJcbiAgICAgICAgaWYoaW5kZXhMaXN0Lmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCBpbmRleExpc3QubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgc3RhcnRUcmlnZ2VyUmVmID0gdGhpcy5fZGF0YVtpbmRleExpc3RbaV1dLl9zdGFydFRyaWdnZXJSZWY7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGEuc3BsaWNlKGluZGV4TGlzdFtpXSwgMSk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2RhdGEubGVuZ3RoID4gaW5kZXhMaXN0W2ldKXtcclxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBzdGFydHRyaWdnZXIgcmVmIG9mIGZvbGxvd2luZyBzdGFydCB0cmlnZ2VycyAoYWN0dWFsIG9ubHkgb25lIGZvbGxvd2luZylcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGFbaW5kZXhMaXN0W2ldXS5fc3RhcnRUcmlnZ2VyUmVmID0gc3RhcnRUcmlnZ2VyUmVmO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGF0YVtpbmRleExpc3RbaV1dLmRpc3BsYXlOYW1lID0gXCJTdGFydCB0cmlnZ2VyIDFcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9zdGFydFRyaWdnZXJzIS5zcGxpY2UoaW5kZXhMaXN0W2ldLCAxKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZW1vdmVkIHRyaWdnZXIgaW5kZXg6IFwiICsgaW5kZXhMaXN0W2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIGV2ZW50QXJncyA9IG5ldyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3ModGhpcywgTW9kZWxDaGFuZ2VUeXBlLnVwZGF0ZVRhcmdldCwgXCJjb21wb25lbnRQYXJhbWV0ZXJzVXBkYXRlZFwiLCB0aGlzLmRhdGEpO1xyXG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcywgZXZlbnRBcmdzKTsgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogU2V0IGRlZmF1bHQgdmFsdWVzIGZvciBuZXcgc3RhcnQgdHJpZ2dlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHRyaWdnZXJHcm91cFxyXG4gICAgICogQHBhcmFtIHsqfSB0cmlnZ2VySW5zdGFuY2VJZFxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlckRhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldERlZmF1bHRUcmlnZ2VyR3JvdXBEYXRhKHRyaWdnZXJHcm91cCwgdHJpZ2dlckluc3RhbmNlSWQpe1xyXG4gICAgICAgIHRoaXMuc2V0VHJpZ2dlckdyb3VwRGF0YSh0cmlnZ2VyR3JvdXAsIHRyaWdnZXJJbnN0YW5jZUlkLCBUcmFjZUNvbmZpZ1ZhbHVlQ29udmVydGVyLmdldFRyaWdnZXJDb25kaXRpb25EaXNwbGF5TmFtZShDb25kaXRpb25JZHMuSW5XaW5kb3cudG9TdHJpbmcoKSksIFwiXCIsIFwiMFwiLCBcIjBcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRyaWdnZXIgaW5mb3JtYXRpb25zKGRhdGFwb2ludG5hbWUsIGNvbmRpdGlvbiwgdGhyZXNob2xkLCB3aW5kb3cpIHRvIHRoZSBnaXZlbiB0cmlnZ2VyIGdyb3VwIFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHRyaWdnZXJHcm91cFxyXG4gICAgICogQHBhcmFtIHsqfSB0cmlnZ2VySW5zdGFuY2VJZFxyXG4gICAgICogQHBhcmFtIHsqfSBjb25kaXRpb25cclxuICAgICAqIEBwYXJhbSB7Kn0gZGF0YVBvaW50TmFtZVxyXG4gICAgICogQHBhcmFtIHsqfSB0aHJlc2hvbGRcclxuICAgICAqIEBwYXJhbSB7Kn0gd2luZG93XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUcmlnZ2VyRGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0VHJpZ2dlckdyb3VwRGF0YSh0cmlnZ2VyR3JvdXAsIHRyaWdnZXJJbnN0YW5jZUlkLCBjb25kaXRpb24sIGRhdGFQb2ludE5hbWUsIHRocmVzaG9sZCwgd2luZG93KXtcclxuICAgICAgICBsZXQgY29uZGl0aW9uUGFyYW1JbmZvID0gdGhpcy5fc3RhcnRUcmlnZ2VySW5mb3MhLmZpbHRlcihwYXJhbSA9PiBwYXJhbS5icm93c2VOYW1lID09IHRyaWdnZXJJbnN0YW5jZUlkICsgXCJDb25kaXRpb25cIilbMF07XHJcbiAgICAgICAgdHJpZ2dlckdyb3VwLmNoaWxkcy5wdXNoKG5ldyBUcmlnZ2VyUGFyYW1ldGVyKFRyaWdnZXJQcm9wZXJ0SWRzLkNvbmRpdGlvbiwgXCJDb25kaXRpb25cIiwgY29uZGl0aW9uLCBcIlwiLCBjb25kaXRpb25QYXJhbUluZm8pKTtcclxuICAgICAgICBsZXQgZGF0YVBvaW50UGFyYW1JbmZvID0gdGhpcy5fc3RhcnRUcmlnZ2VySW5mb3MhLmZpbHRlcihwYXJhbSA9PiBwYXJhbS5icm93c2VOYW1lID09IHRyaWdnZXJJbnN0YW5jZUlkICsgXCJEYXRhUG9pbnRcIilbMF07XHJcbiAgICAgICAgdHJpZ2dlckdyb3VwLmNoaWxkcy5wdXNoKG5ldyBUcmlnZ2VyUGFyYW1ldGVyKFRyaWdnZXJQcm9wZXJ0SWRzLkRhdGFwb2ludCwgXCJEYXRhIHBvaW50XCIsIGRhdGFQb2ludE5hbWUsIFwiXCIsIGRhdGFQb2ludFBhcmFtSW5mbykpO1xyXG4gICAgICAgIGxldCB0aHJlc2hvbGRQYXJhbUluZm8gPSB0aGlzLl9zdGFydFRyaWdnZXJJbmZvcyEuZmlsdGVyKHBhcmFtID0+IHBhcmFtLmJyb3dzZU5hbWUgPT0gdHJpZ2dlckluc3RhbmNlSWQgKyBcIlRocmVzaG9sZFwiKVswXTtcclxuICAgICAgICB0cmlnZ2VyR3JvdXAuY2hpbGRzLnB1c2gobmV3IFRyaWdnZXJQYXJhbWV0ZXIoVHJpZ2dlclByb3BlcnRJZHMuVGhyZXNob2xkLCBcIlRocmVzaG9sZFwiLCB0aHJlc2hvbGQsIFwiXCIsIHRocmVzaG9sZFBhcmFtSW5mbykpO1xyXG4gICAgICAgIGxldCB3aW5kb3dQYXJhbUluZm8gPSB0aGlzLl9zdGFydFRyaWdnZXJJbmZvcyEuZmlsdGVyKHBhcmFtID0+IHBhcmFtLmJyb3dzZU5hbWUgPT0gdHJpZ2dlckluc3RhbmNlSWQgKyBcIldpbmRvd1wiKVswXTtcclxuICAgICAgICB0cmlnZ2VyR3JvdXAuY2hpbGRzLnB1c2gobmV3IFRyaWdnZXJQYXJhbWV0ZXIoVHJpZ2dlclByb3BlcnRJZHMuV2luZG93LCBcIldpbmRvd1wiLCB3aW5kb3csIFwiXCIsIHdpbmRvd1BhcmFtSW5mbykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgZGF0YW1vZGVsIHdpdGggdGVoIGdpdmVuIHN0YXJ0IHRyaWdnZXJzIF9zdGFydFRyaWdnZXJzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtUcmlnZ2VyR3JvdXBbXX1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RyaWdnZXJEYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVEYXRhKCl7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IG5ldyBBcnJheTxUcmlnZ2VyR3JvdXA+KCk7XHJcblxyXG4gICAgICAgIGZvcihsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuX3N0YXJ0VHJpZ2dlcnMhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGluc3RhbmNlID0gaW5kZXgrMTtcclxuICAgICAgICAgICAgbGV0IHRyaWdnZXJJbnN0YW5jZUlkID0gXCJTdGFydFRyaWdnZXJcIiArIGluc3RhbmNlICsgXCJfXCI7XHJcbiAgICAgICAgICAgIGxldCBzdGFydFRyaWdnZXIgPSB0aGlzLl9zdGFydFRyaWdnZXJzIVtpbmRleF07XHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBuZXcgdHJpZ2dlciBncm91cFxyXG4gICAgICAgICAgICBsZXQgdHJpZ2dlckdyb3VwID0gbmV3IFRyaWdnZXJHcm91cChcIlN0YXJ0IHRyaWdnZXIgXCIrIGluc3RhbmNlLCBzdGFydFRyaWdnZXIpO1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhLnB1c2godHJpZ2dlckdyb3VwKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0cmlnZ2VyQ29uZGl0aW9uRGlzcGxheU5hbWUgPSBUcmFjZUNvbmZpZ1ZhbHVlQ29udmVydGVyLmdldFRyaWdnZXJDb25kaXRpb25EaXNwbGF5TmFtZShzdGFydFRyaWdnZXIuY29uZGl0aW9uKTtcclxuICAgICAgICAgICAgLy8gc2V0IHRyaWdnZXIgcGFyYW1ldGVycyB3aXRoaW4gdGhlIHRyaWdnZXIgZ3JvdXBcclxuICAgICAgICAgICAgdGhpcy5zZXRUcmlnZ2VyR3JvdXBEYXRhKHRyaWdnZXJHcm91cCwgdHJpZ2dlckluc3RhbmNlSWQsIHRyaWdnZXJDb25kaXRpb25EaXNwbGF5TmFtZSwgc3RhcnRUcmlnZ2VyLmRhdGFQb2ludE5hbWUsIHN0YXJ0VHJpZ2dlci50aHJlc2hvbGQsIHN0YXJ0VHJpZ2dlci53aW5kb3cpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgVHJhY2VDb25maWdUcmlnZ2VyRGF0YU1vZGVsIH07Il19