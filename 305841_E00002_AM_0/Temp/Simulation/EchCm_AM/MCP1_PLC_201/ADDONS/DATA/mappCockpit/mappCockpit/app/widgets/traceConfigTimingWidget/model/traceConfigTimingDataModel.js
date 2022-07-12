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
define(["require", "exports", "./timingParameter", "../../../models/dataModelBase", "../../../models/online/mappCockpitComponent", "../../../models/dataModelInterface", "../../../models/diagnostics/trace/traceConfig/traceConfigDefines"], function (require, exports, timingParameter_1, dataModelBase_1, mappCockpitComponent_1, dataModelInterface_1, traceConfigDefines_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implements the data model for the trace config timing settings
     *
     * @class TraceConfigTimingDataModel
     * @implements {ITraceConfigTimingDataModel}
     */
    var TraceConfigTimingDataModel = /** @class */ (function (_super) {
        __extends(TraceConfigTimingDataModel, _super);
        function TraceConfigTimingDataModel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * initializes the data model
         *
         * @memberof TraceConfigTimingDataModel
         */
        TraceConfigTimingDataModel.prototype.initialize = function () {
        };
        Object.defineProperty(TraceConfigTimingDataModel.prototype, "initData", {
            /**
             * set the data model object with the timing parameters
             *
             * @memberof TraceConfigTimingDataModel
             */
            set: function (timingParameters) {
                this._timingParameters = timingParameters;
                this.updataData();
                var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, "componentParametersUpdated", this.data);
                this.onModelChanged(this, eventArgs);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Sets the value of a timing parameter
         *
         * @param {TimingParameter} timingParameter
         * @param {string} value
         * @memberof TraceConfigTimingDataModel
         */
        TraceConfigTimingDataModel.prototype.setValue = function (timingParameter, value) {
            timingParameter.componentParameter.value = value;
        };
        /**
         * Updates the data model with the given timing parameters
         *
         * @private
         * @param {MappCockpitComponentParameter[]} timingParameters
         * @memberof TraceConfigTimingDataModel
         */
        TraceConfigTimingDataModel.prototype.updataData = function () {
            this._data = new Array();
            if (this._timingParameters) {
                // Set parameters order
                this.addParameter("Total recording time", "s", traceConfigDefines_1.TraceConfigBrowseNameIds.TotalRecordingTime);
                this.addParameter("Trigger offset time", "s", traceConfigDefines_1.TraceConfigBrowseNameIds.TriggerOffsetTime);
                if (this.addParameter("PLC task class number", "", traceConfigDefines_1.TraceConfigBrowseNameIds.PlcTaskClass) == true) {
                    // Set Enum info to the last added _data item
                    this.defineTaskClassEnum(this._data[this._data.length - 1].componentParameter);
                }
                this.addParameter("PLC sample time", "s", traceConfigDefines_1.TraceConfigBrowseNameIds.PlcSampleTime);
                this.addParameter("ACOPOS sample time", "s", traceConfigDefines_1.TraceConfigBrowseNameIds.AcoposSamplingTime);
            }
        };
        /**
         * Adds a timing parameter to the datamodel
         *
         * @private
         * @param {*} parameterDisplayName
         * @param {*} parameterDisplayUnitName
         * @param {*} componentParameterId
         * @returns {boolean}
         * @memberof TraceConfigTimingDataModel
         */
        TraceConfigTimingDataModel.prototype.addParameter = function (parameterDisplayName, parameterDisplayUnitName, componentParameterId) {
            var param = this._timingParameters.filter(function (param) { return param.browseName == componentParameterId; })[0];
            if (param != undefined) {
                this._data.push(new timingParameter_1.TimingParameter(parameterDisplayName, parameterDisplayUnitName, param));
                return true;
            }
            return false;
        };
        /**
         *Create enum for task class selection 1-8 => TODO: set at central position
         *
         * @private
         * @param {*} parameter
         * @memberof TraceConfigTimingDataModel
         */
        TraceConfigTimingDataModel.prototype.defineTaskClassEnum = function (parameter) {
            var taskClassEnum = new mappCockpitComponent_1.MappCockpitComponentParameterEnum();
            taskClassEnum._enumValues = new Array();
            for (var i = 1; i < 9; i++) {
                taskClassEnum.values.push(new mappCockpitComponent_1.MappCockpitComponentParameterEnumValue(i.toString(), i.toString()));
            }
            parameter.enumType = taskClassEnum;
        };
        return TraceConfigTimingDataModel;
    }(dataModelBase_1.DataModelBase));
    exports.TraceConfigTimingDataModel = TraceConfigTimingDataModel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWdUaW1pbmdEYXRhTW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvdHJhY2VDb25maWdUaW1pbmdXaWRnZXQvbW9kZWwvdHJhY2VDb25maWdUaW1pbmdEYXRhTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVFBOzs7OztPQUtHO0lBQ0g7UUFBeUMsOENBQWE7UUFBdEQ7O1FBNEZBLENBQUM7UUF4Rkc7Ozs7V0FJRztRQUNILCtDQUFVLEdBQVY7UUFFQSxDQUFDO1FBT0Qsc0JBQVcsZ0RBQVE7WUFMbkI7Ozs7ZUFJRztpQkFDSCxVQUFvQixnQkFBaUQ7Z0JBQ2pFLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxnQkFBZ0IsQ0FBQztnQkFDMUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUNsQixJQUFJLFNBQVMsR0FBRyxJQUFJLDBDQUFxQixDQUFDLElBQUksRUFBRSxvQ0FBZSxDQUFDLFlBQVksRUFBRSw0QkFBNEIsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZILElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3pDLENBQUM7OztXQUFBO1FBRUQ7Ozs7OztXQU1HO1FBQ0ksNkNBQVEsR0FBZixVQUFnQixlQUFnQyxFQUFFLEtBQWE7WUFDM0QsZUFBZSxDQUFDLGtCQUFrQixDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDckQsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLCtDQUFVLEdBQWxCO1lBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBbUIsQ0FBQztZQUMxQyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtnQkFDeEIsdUJBQXVCO2dCQUN2QixJQUFJLENBQUMsWUFBWSxDQUFDLHNCQUFzQixFQUFFLEdBQUcsRUFBRSw2Q0FBd0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2dCQUM1RixJQUFJLENBQUMsWUFBWSxDQUFDLHFCQUFxQixFQUFFLEdBQUcsRUFBRSw2Q0FBd0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUMxRixJQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsdUJBQXVCLEVBQUUsRUFBRSxFQUFFLDZDQUF3QixDQUFDLFlBQVksQ0FBQyxJQUFJLElBQUksRUFBQztvQkFDN0YsNkNBQTZDO29CQUM3QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2lCQUNoRjtnQkFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsRUFBRSw2Q0FBd0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDbEYsSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsNkNBQXdCLENBQUMsa0JBQWtCLENBQUMsQ0FBQzthQUM3RjtRQUNMLENBQUM7UUFFRDs7Ozs7Ozs7O1dBU0c7UUFDSyxpREFBWSxHQUFwQixVQUFxQixvQkFBb0IsRUFBRSx3QkFBd0IsRUFBRSxvQkFBb0I7WUFDckYsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxVQUFVLElBQUksb0JBQW9CLEVBQXhDLENBQXdDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoRyxJQUFHLEtBQUssSUFBSSxTQUFTLEVBQUM7Z0JBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksaUNBQWUsQ0FBQyxvQkFBb0IsRUFBRSx3QkFBd0IsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUM1RixPQUFPLElBQUksQ0FBQzthQUNmO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLHdEQUFtQixHQUEzQixVQUE0QixTQUFTO1lBQ2pDLElBQUksYUFBYSxHQUFHLElBQUksd0RBQWlDLEVBQUUsQ0FBQztZQUN0RCxhQUFjLENBQUMsV0FBVyxHQUFHLElBQUksS0FBSyxFQUEwQyxDQUFDO1lBQ3ZGLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQ3BCLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksNkRBQXNDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDcEc7WUFDRCxTQUFTLENBQUMsUUFBUSxHQUFHLGFBQWEsQ0FBQztRQUN2QyxDQUFDO1FBQ0wsaUNBQUM7SUFBRCxDQUFDLEFBNUZELENBQXlDLDZCQUFhLEdBNEZyRDtJQUVRLGdFQUEwQiIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBJVHJhY2VDb25maWdUaW1pbmdEYXRhTW9kZWwgfSBmcm9tIFwiLi90cmFjZUNvbmZpZ1RpbWluZ0RhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUaW1pbmdQYXJhbWV0ZXIgfSBmcm9tIFwiLi90aW1pbmdQYXJhbWV0ZXJcIjtcclxuaW1wb3J0IHsgRGF0YU1vZGVsQmFzZSB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvZGF0YU1vZGVsQmFzZVwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1WYWx1ZSwgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIsIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bSB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEV2ZW50TW9kZWxDaGFuZ2VkQXJncywgTW9kZWxDaGFuZ2VUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9kYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHJhY2VDb25maWdCcm93c2VOYW1lSWRzIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9kaWFnbm9zdGljcy90cmFjZS90cmFjZUNvbmZpZy90cmFjZUNvbmZpZ0RlZmluZXNcIjtcclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRzIHRoZSBkYXRhIG1vZGVsIGZvciB0aGUgdHJhY2UgY29uZmlnIHRpbWluZyBzZXR0aW5nc1xyXG4gKlxyXG4gKiBAY2xhc3MgVHJhY2VDb25maWdUaW1pbmdEYXRhTW9kZWxcclxuICogQGltcGxlbWVudHMge0lUcmFjZUNvbmZpZ1RpbWluZ0RhdGFNb2RlbH1cclxuICovXHJcbmNsYXNzIFRyYWNlQ29uZmlnVGltaW5nRGF0YU1vZGVsIGV4dGVuZHMgRGF0YU1vZGVsQmFzZSBpbXBsZW1lbnRzIElUcmFjZUNvbmZpZ1RpbWluZ0RhdGFNb2RlbCB7XHJcblxyXG4gICAgcHJpdmF0ZSBfdGltaW5nUGFyYW1ldGVycyE6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBpbml0aWFsaXplcyB0aGUgZGF0YSBtb2RlbFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RpbWluZ0RhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHNldCB0aGUgZGF0YSBtb2RlbCBvYmplY3Qgd2l0aCB0aGUgdGltaW5nIHBhcmFtZXRlcnNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUaW1pbmdEYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBpbml0RGF0YSh0aW1pbmdQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKSB7XHJcbiAgICAgICAgdGhpcy5fdGltaW5nUGFyYW1ldGVycyA9IHRpbWluZ1BhcmFtZXRlcnM7XHJcbiAgICAgICAgdGhpcy51cGRhdGFEYXRhKCk7XHJcbiAgICAgICAgdmFyIGV2ZW50QXJncyA9IG5ldyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3ModGhpcywgTW9kZWxDaGFuZ2VUeXBlLnVwZGF0ZVRhcmdldCwgXCJjb21wb25lbnRQYXJhbWV0ZXJzVXBkYXRlZFwiLCB0aGlzLmRhdGEpO1xyXG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcywgZXZlbnRBcmdzKTsgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB2YWx1ZSBvZiBhIHRpbWluZyBwYXJhbWV0ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1RpbWluZ1BhcmFtZXRlcn0gdGltaW5nUGFyYW1ldGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RpbWluZ0RhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0VmFsdWUodGltaW5nUGFyYW1ldGVyOiBUaW1pbmdQYXJhbWV0ZXIsIHZhbHVlOiBzdHJpbmcpe1xyXG4gICAgICAgIHRpbWluZ1BhcmFtZXRlci5jb21wb25lbnRQYXJhbWV0ZXIudmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGRhdGEgbW9kZWwgd2l0aCB0aGUgZ2l2ZW4gdGltaW5nIHBhcmFtZXRlcnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSB0aW1pbmdQYXJhbWV0ZXJzXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUaW1pbmdEYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGFEYXRhKCl7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IG5ldyBBcnJheTxUaW1pbmdQYXJhbWV0ZXI+KCk7IFxyXG4gICAgICAgIGlmICh0aGlzLl90aW1pbmdQYXJhbWV0ZXJzKSB7XHJcbiAgICAgICAgICAgIC8vIFNldCBwYXJhbWV0ZXJzIG9yZGVyXHJcbiAgICAgICAgICAgIHRoaXMuYWRkUGFyYW1ldGVyKFwiVG90YWwgcmVjb3JkaW5nIHRpbWVcIiwgXCJzXCIsIFRyYWNlQ29uZmlnQnJvd3NlTmFtZUlkcy5Ub3RhbFJlY29yZGluZ1RpbWUpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZFBhcmFtZXRlcihcIlRyaWdnZXIgb2Zmc2V0IHRpbWVcIiwgXCJzXCIsIFRyYWNlQ29uZmlnQnJvd3NlTmFtZUlkcy5UcmlnZ2VyT2Zmc2V0VGltZSk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYWRkUGFyYW1ldGVyKFwiUExDIHRhc2sgY2xhc3MgbnVtYmVyXCIsIFwiXCIsIFRyYWNlQ29uZmlnQnJvd3NlTmFtZUlkcy5QbGNUYXNrQ2xhc3MpID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgLy8gU2V0IEVudW0gaW5mbyB0byB0aGUgbGFzdCBhZGRlZCBfZGF0YSBpdGVtXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlZmluZVRhc2tDbGFzc0VudW0odGhpcy5fZGF0YVt0aGlzLl9kYXRhLmxlbmd0aC0xXS5jb21wb25lbnRQYXJhbWV0ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYWRkUGFyYW1ldGVyKFwiUExDIHNhbXBsZSB0aW1lXCIsIFwic1wiLCBUcmFjZUNvbmZpZ0Jyb3dzZU5hbWVJZHMuUGxjU2FtcGxlVGltZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkUGFyYW1ldGVyKFwiQUNPUE9TIHNhbXBsZSB0aW1lXCIsIFwic1wiLCBUcmFjZUNvbmZpZ0Jyb3dzZU5hbWVJZHMuQWNvcG9zU2FtcGxpbmdUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgdGltaW5nIHBhcmFtZXRlciB0byB0aGUgZGF0YW1vZGVsXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gcGFyYW1ldGVyRGlzcGxheU5hbWVcclxuICAgICAqIEBwYXJhbSB7Kn0gcGFyYW1ldGVyRGlzcGxheVVuaXROYW1lXHJcbiAgICAgKiBAcGFyYW0geyp9IGNvbXBvbmVudFBhcmFtZXRlcklkXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RpbWluZ0RhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZFBhcmFtZXRlcihwYXJhbWV0ZXJEaXNwbGF5TmFtZSwgcGFyYW1ldGVyRGlzcGxheVVuaXROYW1lLCBjb21wb25lbnRQYXJhbWV0ZXJJZCk6Ym9vbGVhbntcclxuICAgICAgICBsZXQgcGFyYW0gPSB0aGlzLl90aW1pbmdQYXJhbWV0ZXJzLmZpbHRlcihwYXJhbSA9PiBwYXJhbS5icm93c2VOYW1lID09IGNvbXBvbmVudFBhcmFtZXRlcklkKVswXTtcclxuICAgICAgICBpZihwYXJhbSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhLnB1c2gobmV3IFRpbWluZ1BhcmFtZXRlcihwYXJhbWV0ZXJEaXNwbGF5TmFtZSwgcGFyYW1ldGVyRGlzcGxheVVuaXROYW1lLCBwYXJhbSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpDcmVhdGUgZW51bSBmb3IgdGFzayBjbGFzcyBzZWxlY3Rpb24gMS04ID0+IFRPRE86IHNldCBhdCBjZW50cmFsIHBvc2l0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gcGFyYW1ldGVyXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUaW1pbmdEYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkZWZpbmVUYXNrQ2xhc3NFbnVtKHBhcmFtZXRlcil7XHJcbiAgICAgICAgbGV0IHRhc2tDbGFzc0VudW0gPSBuZXcgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtKCk7XHJcbiAgICAgICAgKDxhbnk+dGFza0NsYXNzRW51bSkuX2VudW1WYWx1ZXMgPSBuZXcgQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtVmFsdWU+KCk7XHJcbiAgICAgICAgZm9yKGxldCBpPTE7IGkgPCA5OyBpKyspe1xyXG4gICAgICAgICAgICB0YXNrQ2xhc3NFbnVtLnZhbHVlcy5wdXNoKG5ldyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1WYWx1ZShpLnRvU3RyaW5nKCksaS50b1N0cmluZygpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBhcmFtZXRlci5lbnVtVHlwZSA9IHRhc2tDbGFzc0VudW07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFRyYWNlQ29uZmlnVGltaW5nRGF0YU1vZGVsIH07Il19