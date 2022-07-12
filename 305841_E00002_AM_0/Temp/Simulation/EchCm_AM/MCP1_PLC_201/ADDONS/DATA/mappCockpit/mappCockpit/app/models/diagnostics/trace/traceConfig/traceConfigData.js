define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Provides data for describing a trace configuration
     *
     * @class TraceConfigurationData
     */
    var TraceConfigurationData = /** @class */ (function () {
        function TraceConfigurationData(dataPoints, timingParameters, startTriggers) {
            this._dataPoints = dataPoints;
            this._timingParameters = timingParameters;
            this._startTriggers = startTriggers;
        }
        Object.defineProperty(TraceConfigurationData.prototype, "dataPoints", {
            /**
             * Gets the data points
             *
             * @readonly
             * @type {TraceDataPoint[]}
             * @memberof TraceConfigurationData
             */
            get: function () {
                return this._dataPoints;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TraceConfigurationData.prototype, "timingParameters", {
            /**
             * Gets the timing parameters
             *
             * @readonly
             * @type {MappCockpitComponentParameter[]}
             * @memberof TraceConfigurationData
             */
            get: function () {
                return this._timingParameters;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TraceConfigurationData.prototype, "startTriggers", {
            /**
             * Gets the start trigger parameters
             *
             * @readonly
             * @type {TraceStartTrigger[]}
             * @memberof TraceConfigurationData
             */
            get: function () {
                return this._startTriggers;
            },
            enumerable: true,
            configurable: true
        });
        return TraceConfigurationData;
    }());
    exports.TraceConfigurationData = TraceConfigurationData;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWdEYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvdHJhY2VDb25maWcvdHJhY2VDb25maWdEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUlBOzs7O09BSUc7SUFDSDtRQU1JLGdDQUFZLFVBQTRCLEVBQUUsZ0JBQWlELEVBQUUsYUFBa0M7WUFDM0gsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7WUFDOUIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGdCQUFnQixDQUFDO1lBQzFDLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBQ3hDLENBQUM7UUFTRCxzQkFBVyw4Q0FBVTtZQVByQjs7Ozs7O2VBTUc7aUJBQ0g7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQzVCLENBQUM7OztXQUFBO1FBU0Qsc0JBQVcsb0RBQWdCO1lBUDNCOzs7Ozs7ZUFNRztpQkFDSDtnQkFDSSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUNsQyxDQUFDOzs7V0FBQTtRQVNELHNCQUFXLGlEQUFhO1lBUHhCOzs7Ozs7ZUFNRztpQkFDSDtnQkFDSSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7WUFDL0IsQ0FBQzs7O1dBQUE7UUFDTCw2QkFBQztJQUFELENBQUMsQUE1Q0QsSUE0Q0M7SUFFUSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlciB9IGZyb20gXCIuLi8uLi8uLi9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgVHJhY2VEYXRhUG9pbnQgfSBmcm9tIFwiLi4vdHJhY2VEYXRhUG9pbnRcIjtcclxuaW1wb3J0IHsgVHJhY2VTdGFydFRyaWdnZXIgfSBmcm9tIFwiLi4vdHJhY2VTdGFydFRyaWdnZXJcIjtcclxuXHJcbi8qKlxyXG4gKiBQcm92aWRlcyBkYXRhIGZvciBkZXNjcmliaW5nIGEgdHJhY2UgY29uZmlndXJhdGlvblxyXG4gKlxyXG4gKiBAY2xhc3MgVHJhY2VDb25maWd1cmF0aW9uRGF0YVxyXG4gKi9cclxuY2xhc3MgVHJhY2VDb25maWd1cmF0aW9uRGF0YXtcclxuXHJcbiAgICBwcml2YXRlIF9kYXRhUG9pbnRzOiBUcmFjZURhdGFQb2ludFtdO1xyXG4gICAgcHJpdmF0ZSBfdGltaW5nUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXTtcclxuICAgIHByaXZhdGUgX3N0YXJ0VHJpZ2dlcnM6IFRyYWNlU3RhcnRUcmlnZ2VyW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoZGF0YVBvaW50czogVHJhY2VEYXRhUG9pbnRbXSwgdGltaW5nUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSwgc3RhcnRUcmlnZ2VyczogVHJhY2VTdGFydFRyaWdnZXJbXSl7XHJcbiAgICAgICAgdGhpcy5fZGF0YVBvaW50cyA9IGRhdGFQb2ludHM7XHJcbiAgICAgICAgdGhpcy5fdGltaW5nUGFyYW1ldGVycyA9IHRpbWluZ1BhcmFtZXRlcnM7XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUcmlnZ2VycyA9IHN0YXJ0VHJpZ2dlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBkYXRhIHBvaW50c1xyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge1RyYWNlRGF0YVBvaW50W119XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWd1cmF0aW9uRGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGRhdGFQb2ludHMoKTogVHJhY2VEYXRhUG9pbnRbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFQb2ludHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSB0aW1pbmcgcGFyYW1ldGVyc1xyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWd1cmF0aW9uRGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHRpbWluZ1BhcmFtZXRlcnMoKTogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RpbWluZ1BhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBzdGFydCB0cmlnZ2VyIHBhcmFtZXRlcnNcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtUcmFjZVN0YXJ0VHJpZ2dlcltdfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlndXJhdGlvbkRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBzdGFydFRyaWdnZXJzKCk6IFRyYWNlU3RhcnRUcmlnZ2VyW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdGFydFRyaWdnZXJzO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBUcmFjZUNvbmZpZ3VyYXRpb25EYXRhIH07Il19