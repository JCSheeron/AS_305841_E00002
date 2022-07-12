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
define(["require", "exports", "../../../models/dataModelBase", "../../../models/dataModelInterface"], function (require, exports, dataModelBase_1, dataModelInterface_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implements the data model for the trace config timing settings
     *
     * @class TraceConfigDatapointsDataModel
     * @implements {ITraceConfigDatapointsDataModel}
     */
    var TraceConfigDatapointsDataModel = /** @class */ (function (_super) {
        __extends(TraceConfigDatapointsDataModel, _super);
        function TraceConfigDatapointsDataModel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * initializes the data model
         *
         * @memberof TraceConfigDatapointsDataModel
         */
        TraceConfigDatapointsDataModel.prototype.initialize = function () {
        };
        /**
         * Adds a new datapoint at the given index if limit(32) is not exceded or datapoint with same name is already in the list
         *
         * @param {number} index
         * @param {TraceDataPoint} datapoint
         * @returns
         * @memberof TraceConfigDatapointsDataModel
         */
        TraceConfigDatapointsDataModel.prototype.addDatapoint = function (index, datapoint) {
            if (this._data.length >= 32) {
                console.info("Only 32 datapoints are supported!");
                return;
            }
            if (this.dataPointAlreadyInList(datapoint.dataPointName)) {
                console.info("Datapoint already in list!");
                return;
            }
            if (index == -1 || index >= this._data.length) {
                // No index defined or after the end => add at the end
                this._data.push(datapoint);
            }
            else {
                this._data.splice(index, 0, datapoint);
            }
            var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, "componentParametersUpdated", this.data);
            this.onModelChanged(this, eventArgs);
        };
        /**
         * Replace the datapoint at the given index with the new datapoint if a datapoint with the new datapoint name is not already in the datamodel
         *
         * @param {number} index
         * @param {TraceDataPoint} datapoint
         * @param {boolean} ignoreIndexForDuplicateCheck should the name of the datapoint also checked for the given index
         * @returns
         * @memberof TraceConfigDatapointsDataModel
         */
        TraceConfigDatapointsDataModel.prototype.replaceDatapoint = function (index, datapoint, ignoreIndexForDuplicateCheck) {
            if (index >= this._data.length) {
                console.error("Cannot replace datapoint with index: " + index);
                return;
            }
            if (this.dataPointAlreadyInList(datapoint.dataPointName, index, ignoreIndexForDuplicateCheck)) {
                console.info("Datapoint already in list!");
                return;
            }
            this._data.splice(index, 1, datapoint);
            var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, "componentParametersUpdated", this.data);
            this.onModelChanged(this, eventArgs);
        };
        /**
         * Removes all datapoints for the indexes given in the list
         *
         * @param {Array<number>} indexList
         * @memberof TraceConfigDatapointsDataModel
         */
        TraceConfigDatapointsDataModel.prototype.removeDatapoints = function (indexList) {
            for (var i = 0; i < indexList.length; i++) {
                this._data.splice(indexList[i], 1);
                console.log("removed datapoint index: " + indexList[i]);
            }
            var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, "componentParametersUpdated", this.data);
            this.onModelChanged(this, eventArgs);
        };
        Object.defineProperty(TraceConfigDatapointsDataModel.prototype, "initData", {
            /**
             * Sets the initial data for the datamodel
             *
             * @memberof TraceConfigDatapointsDataModel
             */
            set: function (datapointParameters) {
                this.data = datapointParameters;
                var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, "componentParametersUpdated", this.data);
                this.onModelChanged(this, eventArgs);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Check if a datapoint with the given name is already in the list at an other index position as the given one if checkIndex is true
         *
         * @param {string} dataPointName
         * @param {number} [index=-1]
         * @param {boolean} [ignoreIndex=true] should the name of the datapoint also be checked if already in use for the given index; for replace normally not needed
         * @returns {boolean}
         * @memberof TraceConfigDatapointsDataModel
         */
        TraceConfigDatapointsDataModel.prototype.dataPointAlreadyInList = function (dataPointName, index, ignoreIndex) {
            if (index === void 0) { index = -1; }
            if (ignoreIndex === void 0) { ignoreIndex = true; }
            if (!this.isDataPointAnEmptyLine(dataPointName)) {
                for (var i = 0; i < this._data.length; i++) {
                    if (i != index || ignoreIndex == true) {
                        if (this._data[i].dataPointName === dataPointName) {
                            return true;
                        }
                    }
                }
            }
            return false;
        };
        /**
         * Check if the datapoint name defines an empty line
         *
         * @private
         * @param {string} dataPointName
         * @returns {boolean}
         * @memberof TraceConfigDatapointsDataModel
         */
        TraceConfigDatapointsDataModel.prototype.isDataPointAnEmptyLine = function (dataPointName) {
            if (dataPointName == undefined || dataPointName == "") {
                return true;
            }
            return false;
        };
        return TraceConfigDatapointsDataModel;
    }(dataModelBase_1.DataModelBase));
    exports.TraceConfigDatapointsDataModel = TraceConfigDatapointsDataModel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWdEYXRhcG9pbnRzRGF0YU1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldC9tb2RlbC90cmFjZUNvbmZpZ0RhdGFwb2ludHNEYXRhTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUtBOzs7OztPQUtHO0lBQ0g7UUFBNkMsa0RBQWE7UUFBMUQ7O1FBK0hBLENBQUM7UUE3SEc7Ozs7V0FJRztRQUNILG1EQUFVLEdBQVY7UUFFQSxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNJLHFEQUFZLEdBQW5CLFVBQW9CLEtBQWEsRUFBRSxTQUF5QjtZQUN4RCxJQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLEVBQUUsRUFBQztnQkFDdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO2dCQUNsRCxPQUFPO2FBQ1Y7WUFDRCxJQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEVBQUM7Z0JBQ3BELE9BQU8sQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQztnQkFDM0MsT0FBTzthQUNWO1lBQ0QsSUFBRyxLQUFLLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFDO2dCQUN6QyxzREFBc0Q7Z0JBQ3RELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQzlCO2lCQUNHO2dCQUNELElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDekM7WUFDRCxJQUFJLFNBQVMsR0FBRyxJQUFJLDBDQUFxQixDQUFDLElBQUksRUFBRSxvQ0FBZSxDQUFDLFlBQVksRUFBRSw0QkFBNEIsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkgsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDekMsQ0FBQztRQUdEOzs7Ozs7OztXQVFHO1FBQ0kseURBQWdCLEdBQXZCLFVBQXdCLEtBQWEsRUFBRSxTQUF5QixFQUFFLDRCQUFxQztZQUNuRyxJQUFHLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBQztnQkFDMUIsT0FBTyxDQUFDLEtBQUssQ0FBQyx1Q0FBdUMsR0FBRyxLQUFLLENBQUMsQ0FBQztnQkFDL0QsT0FBTzthQUNWO1lBQ0QsSUFBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsNEJBQTRCLENBQUMsRUFBQztnQkFDekYsT0FBTyxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO2dCQUMzQyxPQUFPO2FBQ1Y7WUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBRXZDLElBQUksU0FBUyxHQUFHLElBQUksMENBQXFCLENBQUMsSUFBSSxFQUFFLG9DQUFlLENBQUMsWUFBWSxFQUFFLDRCQUE0QixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2SCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN6QyxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSSx5REFBZ0IsR0FBdkIsVUFBd0IsU0FBd0I7WUFDNUMsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMzRDtZQUNELElBQUksU0FBUyxHQUFHLElBQUksMENBQXFCLENBQUMsSUFBSSxFQUFFLG9DQUFlLENBQUMsWUFBWSxFQUFFLDRCQUE0QixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2SCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN6QyxDQUFDO1FBT0Qsc0JBQVcsb0RBQVE7WUFMbkI7Ozs7ZUFJRztpQkFDSCxVQUFvQixtQkFBcUM7Z0JBQ3JELElBQUksQ0FBQyxJQUFJLEdBQUcsbUJBQW1CLENBQUM7Z0JBQ2hDLElBQUksU0FBUyxHQUFHLElBQUksMENBQXFCLENBQUMsSUFBSSxFQUFFLG9DQUFlLENBQUMsWUFBWSxFQUFFLDRCQUE0QixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdkgsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDekMsQ0FBQzs7O1dBQUE7UUFFRDs7Ozs7Ozs7V0FRRztRQUNJLCtEQUFzQixHQUE3QixVQUE4QixhQUFxQixFQUFFLEtBQWtCLEVBQUUsV0FBMkI7WUFBL0Msc0JBQUEsRUFBQSxTQUFpQixDQUFDO1lBQUUsNEJBQUEsRUFBQSxrQkFBMkI7WUFDaEcsSUFBRyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsRUFBRTtnQkFDNUMsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO29CQUNyQyxJQUFHLENBQUMsSUFBSSxLQUFLLElBQUksV0FBVyxJQUFJLElBQUksRUFBQzt3QkFDakMsSUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsS0FBSyxhQUFhLEVBQUU7NEJBQzlDLE9BQU8sSUFBSSxDQUFDO3lCQUNmO3FCQUNKO2lCQUNKO2FBQ0o7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNLLCtEQUFzQixHQUE5QixVQUErQixhQUFxQjtZQUNoRCxJQUFJLGFBQWEsSUFBSSxTQUFTLElBQUksYUFBYSxJQUFJLEVBQUUsRUFBRTtnQkFDbkQsT0FBTyxJQUFJLENBQUM7YUFDZjtZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFDTCxxQ0FBQztJQUFELENBQUMsQUEvSEQsQ0FBNkMsNkJBQWEsR0ErSHpEO0lBRVEsd0VBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVRyYWNlQ29uZmlnRGF0YXBvaW50c0RhdGFNb2RlbCB9IGZyb20gXCIuL3RyYWNlQ29uZmlnRGF0YXBvaW50c0RhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBEYXRhTW9kZWxCYXNlIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9kYXRhTW9kZWxCYXNlXCI7XHJcbmltcG9ydCB7IFRyYWNlRGF0YVBvaW50IH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9kaWFnbm9zdGljcy90cmFjZS90cmFjZURhdGFQb2ludFwiO1xyXG5pbXBvcnQgeyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MsIE1vZGVsQ2hhbmdlVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvZGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyB0aGUgZGF0YSBtb2RlbCBmb3IgdGhlIHRyYWNlIGNvbmZpZyB0aW1pbmcgc2V0dGluZ3NcclxuICpcclxuICogQGNsYXNzIFRyYWNlQ29uZmlnRGF0YXBvaW50c0RhdGFNb2RlbFxyXG4gKiBAaW1wbGVtZW50cyB7SVRyYWNlQ29uZmlnRGF0YXBvaW50c0RhdGFNb2RlbH1cclxuICovXHJcbmNsYXNzIFRyYWNlQ29uZmlnRGF0YXBvaW50c0RhdGFNb2RlbCBleHRlbmRzIERhdGFNb2RlbEJhc2UgaW1wbGVtZW50cyBJVHJhY2VDb25maWdEYXRhcG9pbnRzRGF0YU1vZGVsIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIGluaXRpYWxpemVzIHRoZSBkYXRhIG1vZGVsXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnRGF0YXBvaW50c0RhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplKCkge1xyXG5cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgbmV3IGRhdGFwb2ludCBhdCB0aGUgZ2l2ZW4gaW5kZXggaWYgbGltaXQoMzIpIGlzIG5vdCBleGNlZGVkIG9yIGRhdGFwb2ludCB3aXRoIHNhbWUgbmFtZSBpcyBhbHJlYWR5IGluIHRoZSBsaXN0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XHJcbiAgICAgKiBAcGFyYW0ge1RyYWNlRGF0YVBvaW50fSBkYXRhcG9pbnRcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdEYXRhcG9pbnRzRGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGREYXRhcG9pbnQoaW5kZXg6IG51bWJlciwgZGF0YXBvaW50OiBUcmFjZURhdGFQb2ludCl7XHJcbiAgICAgICAgaWYodGhpcy5fZGF0YS5sZW5ndGggPj0gMzIpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmluZm8oXCJPbmx5IDMyIGRhdGFwb2ludHMgYXJlIHN1cHBvcnRlZCFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5kYXRhUG9pbnRBbHJlYWR5SW5MaXN0KGRhdGFwb2ludC5kYXRhUG9pbnROYW1lKSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhcIkRhdGFwb2ludCBhbHJlYWR5IGluIGxpc3QhXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGluZGV4ID09IC0xIHx8IGluZGV4ID49IHRoaXMuX2RhdGEubGVuZ3RoKXtcclxuICAgICAgICAgICAgLy8gTm8gaW5kZXggZGVmaW5lZCBvciBhZnRlciB0aGUgZW5kID0+IGFkZCBhdCB0aGUgZW5kXHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGEucHVzaChkYXRhcG9pbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgIHRoaXMuX2RhdGEuc3BsaWNlKGluZGV4LCAwLCBkYXRhcG9pbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZXZlbnRBcmdzID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBcImNvbXBvbmVudFBhcmFtZXRlcnNVcGRhdGVkXCIsIHRoaXMuZGF0YSk7XHJcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBldmVudEFyZ3MpOyBcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXBsYWNlIHRoZSBkYXRhcG9pbnQgYXQgdGhlIGdpdmVuIGluZGV4IHdpdGggdGhlIG5ldyBkYXRhcG9pbnQgaWYgYSBkYXRhcG9pbnQgd2l0aCB0aGUgbmV3IGRhdGFwb2ludCBuYW1lIGlzIG5vdCBhbHJlYWR5IGluIHRoZSBkYXRhbW9kZWxcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcclxuICAgICAqIEBwYXJhbSB7VHJhY2VEYXRhUG9pbnR9IGRhdGFwb2ludFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpZ25vcmVJbmRleEZvckR1cGxpY2F0ZUNoZWNrIHNob3VsZCB0aGUgbmFtZSBvZiB0aGUgZGF0YXBvaW50IGFsc28gY2hlY2tlZCBmb3IgdGhlIGdpdmVuIGluZGV4XHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnRGF0YXBvaW50c0RhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVwbGFjZURhdGFwb2ludChpbmRleDogbnVtYmVyLCBkYXRhcG9pbnQ6IFRyYWNlRGF0YVBvaW50LCBpZ25vcmVJbmRleEZvckR1cGxpY2F0ZUNoZWNrOiBib29sZWFuKXtcclxuICAgICAgICBpZihpbmRleCA+PSB0aGlzLl9kYXRhLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDYW5ub3QgcmVwbGFjZSBkYXRhcG9pbnQgd2l0aCBpbmRleDogXCIgKyBpbmRleCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5kYXRhUG9pbnRBbHJlYWR5SW5MaXN0KGRhdGFwb2ludC5kYXRhUG9pbnROYW1lLCBpbmRleCwgaWdub3JlSW5kZXhGb3JEdXBsaWNhdGVDaGVjaykpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmluZm8oXCJEYXRhcG9pbnQgYWxyZWFkeSBpbiBsaXN0IVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fZGF0YS5zcGxpY2UoaW5kZXgsIDEsIGRhdGFwb2ludCk7XHJcblxyXG4gICAgICAgIHZhciBldmVudEFyZ3MgPSBuZXcgRXZlbnRNb2RlbENoYW5nZWRBcmdzKHRoaXMsIE1vZGVsQ2hhbmdlVHlwZS51cGRhdGVUYXJnZXQsIFwiY29tcG9uZW50UGFyYW1ldGVyc1VwZGF0ZWRcIiwgdGhpcy5kYXRhKTtcclxuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMsIGV2ZW50QXJncyk7IFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBhbGwgZGF0YXBvaW50cyBmb3IgdGhlIGluZGV4ZXMgZ2l2ZW4gaW4gdGhlIGxpc3RcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IGluZGV4TGlzdFxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnRGF0YXBvaW50c0RhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlRGF0YXBvaW50cyhpbmRleExpc3Q6IEFycmF5PG51bWJlcj4pe1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgaW5kZXhMaXN0Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YS5zcGxpY2UoaW5kZXhMaXN0W2ldLCAxKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZW1vdmVkIGRhdGFwb2ludCBpbmRleDogXCIgKyBpbmRleExpc3RbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZXZlbnRBcmdzID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBcImNvbXBvbmVudFBhcmFtZXRlcnNVcGRhdGVkXCIsIHRoaXMuZGF0YSk7XHJcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBldmVudEFyZ3MpOyBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGluaXRpYWwgZGF0YSBmb3IgdGhlIGRhdGFtb2RlbFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ0RhdGFwb2ludHNEYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBpbml0RGF0YShkYXRhcG9pbnRQYXJhbWV0ZXJzOiBUcmFjZURhdGFQb2ludFtdKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YXBvaW50UGFyYW1ldGVycztcclxuICAgICAgICB2YXIgZXZlbnRBcmdzID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBcImNvbXBvbmVudFBhcmFtZXRlcnNVcGRhdGVkXCIsIHRoaXMuZGF0YSk7XHJcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBldmVudEFyZ3MpOyBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGlmIGEgZGF0YXBvaW50IHdpdGggdGhlIGdpdmVuIG5hbWUgaXMgYWxyZWFkeSBpbiB0aGUgbGlzdCBhdCBhbiBvdGhlciBpbmRleCBwb3NpdGlvbiBhcyB0aGUgZ2l2ZW4gb25lIGlmIGNoZWNrSW5kZXggaXMgdHJ1ZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhUG9pbnROYW1lXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2luZGV4PS0xXVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbaWdub3JlSW5kZXg9dHJ1ZV0gc2hvdWxkIHRoZSBuYW1lIG9mIHRoZSBkYXRhcG9pbnQgYWxzbyBiZSBjaGVja2VkIGlmIGFscmVhZHkgaW4gdXNlIGZvciB0aGUgZ2l2ZW4gaW5kZXg7IGZvciByZXBsYWNlIG5vcm1hbGx5IG5vdCBuZWVkZWRcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnRGF0YXBvaW50c0RhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGF0YVBvaW50QWxyZWFkeUluTGlzdChkYXRhUG9pbnROYW1lOiBzdHJpbmcsIGluZGV4OiBudW1iZXIgPSAtMSwgaWdub3JlSW5kZXg6IGJvb2xlYW4gPSB0cnVlKTogYm9vbGVhbntcclxuICAgICAgICBpZighdGhpcy5pc0RhdGFQb2ludEFuRW1wdHlMaW5lKGRhdGFQb2ludE5hbWUpKSB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpIDwgIHRoaXMuX2RhdGEubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYoaSAhPSBpbmRleCB8fCBpZ25vcmVJbmRleCA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLl9kYXRhW2ldLmRhdGFQb2ludE5hbWUgPT09IGRhdGFQb2ludE5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGlmIHRoZSBkYXRhcG9pbnQgbmFtZSBkZWZpbmVzIGFuIGVtcHR5IGxpbmVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRhdGFQb2ludE5hbWVcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnRGF0YXBvaW50c0RhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGlzRGF0YVBvaW50QW5FbXB0eUxpbmUoZGF0YVBvaW50TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGRhdGFQb2ludE5hbWUgPT0gdW5kZWZpbmVkIHx8IGRhdGFQb2ludE5hbWUgPT0gXCJcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBUcmFjZUNvbmZpZ0RhdGFwb2ludHNEYXRhTW9kZWwgfTsiXX0=