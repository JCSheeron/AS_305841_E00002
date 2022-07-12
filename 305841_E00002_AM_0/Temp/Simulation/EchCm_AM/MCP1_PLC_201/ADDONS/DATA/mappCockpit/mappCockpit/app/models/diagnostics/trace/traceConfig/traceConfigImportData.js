define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Provides data for describing a imported trace configuration
     *
     * @class TraceConfigurationImportData
     */
    var TraceConfigurationImportData = /** @class */ (function () {
        function TraceConfigurationImportData(dataPoints, timingParameters, startTriggers) {
            this._dataPoints = dataPoints;
            this._timingParameters = timingParameters;
            this._startTriggers = startTriggers;
        }
        Object.defineProperty(TraceConfigurationImportData.prototype, "dataPoints", {
            /**
             * Gets the data points
             *
             * @readonly
             * @type {TraceDataPoint[]}
             * @memberof TraceConfigurationImportData
             */
            get: function () {
                return this._dataPoints;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TraceConfigurationImportData.prototype, "timingParameters", {
            /**
             * Gets the timing parameters
             *
             * @readonly
             * @type {[key: string]: string}
             * @memberof TraceConfigurationImportData
             */
            get: function () {
                return this._timingParameters;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TraceConfigurationImportData.prototype, "startTriggers", {
            /**
             * Gets the start trigger parameters
             *
             * @readonly
             * @type {TraceStartTrigger[]}
             * @memberof TraceConfigurationImportData
             */
            get: function () {
                return this._startTriggers;
            },
            enumerable: true,
            configurable: true
        });
        return TraceConfigurationImportData;
    }());
    exports.TraceConfigurationImportData = TraceConfigurationImportData;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWdJbXBvcnREYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvdHJhY2VDb25maWcvdHJhY2VDb25maWdJbXBvcnREYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUdBOzs7O09BSUc7SUFDSDtRQU1JLHNDQUFZLFVBQTRCLEVBQUUsZ0JBQXlDLEVBQUUsYUFBa0M7WUFDbkgsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7WUFDOUIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGdCQUFnQixDQUFDO1lBQzFDLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBQ3hDLENBQUM7UUFTRCxzQkFBVyxvREFBVTtZQVByQjs7Ozs7O2VBTUc7aUJBQ0g7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQzVCLENBQUM7OztXQUFBO1FBU0Qsc0JBQVcsMERBQWdCO1lBUDNCOzs7Ozs7ZUFNRztpQkFDSDtnQkFDSSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUNsQyxDQUFDOzs7V0FBQTtRQVNELHNCQUFXLHVEQUFhO1lBUHhCOzs7Ozs7ZUFNRztpQkFDSDtnQkFDSSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7WUFDL0IsQ0FBQzs7O1dBQUE7UUFDTCxtQ0FBQztJQUFELENBQUMsQUE1Q0QsSUE0Q0M7SUE1Q1ksb0VBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJhY2VEYXRhUG9pbnQgfSBmcm9tIFwiLi4vdHJhY2VEYXRhUG9pbnRcIjtcclxuaW1wb3J0IHsgVHJhY2VTdGFydFRyaWdnZXIgfSBmcm9tIFwiLi4vdHJhY2VTdGFydFRyaWdnZXJcIjtcclxuXHJcbi8qKlxyXG4gKiBQcm92aWRlcyBkYXRhIGZvciBkZXNjcmliaW5nIGEgaW1wb3J0ZWQgdHJhY2UgY29uZmlndXJhdGlvblxyXG4gKlxyXG4gKiBAY2xhc3MgVHJhY2VDb25maWd1cmF0aW9uSW1wb3J0RGF0YVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFRyYWNlQ29uZmlndXJhdGlvbkltcG9ydERhdGF7XHJcblxyXG4gICAgcHJpdmF0ZSBfZGF0YVBvaW50czogVHJhY2VEYXRhUG9pbnRbXTtcclxuICAgIHByaXZhdGUgX3RpbWluZ1BhcmFtZXRlcnM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9O1xyXG4gICAgcHJpdmF0ZSBfc3RhcnRUcmlnZ2VyczogVHJhY2VTdGFydFRyaWdnZXJbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihkYXRhUG9pbnRzOiBUcmFjZURhdGFQb2ludFtdLCB0aW1pbmdQYXJhbWV0ZXJzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSwgc3RhcnRUcmlnZ2VyczogVHJhY2VTdGFydFRyaWdnZXJbXSl7XHJcbiAgICAgICAgdGhpcy5fZGF0YVBvaW50cyA9IGRhdGFQb2ludHM7XHJcbiAgICAgICAgdGhpcy5fdGltaW5nUGFyYW1ldGVycyA9IHRpbWluZ1BhcmFtZXRlcnM7XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUcmlnZ2VycyA9IHN0YXJ0VHJpZ2dlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBkYXRhIHBvaW50c1xyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge1RyYWNlRGF0YVBvaW50W119XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWd1cmF0aW9uSW1wb3J0RGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGRhdGFQb2ludHMoKTogVHJhY2VEYXRhUG9pbnRbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFQb2ludHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSB0aW1pbmcgcGFyYW1ldGVyc1xyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge1trZXk6IHN0cmluZ106IHN0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ3VyYXRpb25JbXBvcnREYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgdGltaW5nUGFyYW1ldGVycygpOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RpbWluZ1BhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBzdGFydCB0cmlnZ2VyIHBhcmFtZXRlcnNcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtUcmFjZVN0YXJ0VHJpZ2dlcltdfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlndXJhdGlvbkltcG9ydERhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBzdGFydFRyaWdnZXJzKCk6IFRyYWNlU3RhcnRUcmlnZ2VyW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdGFydFRyaWdnZXJzO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==