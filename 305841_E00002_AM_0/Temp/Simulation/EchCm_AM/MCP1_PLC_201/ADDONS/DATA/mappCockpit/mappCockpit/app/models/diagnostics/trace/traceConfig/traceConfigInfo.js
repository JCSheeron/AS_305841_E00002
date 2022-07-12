define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Provides data for describing trace configuration informations
     *
     * @class TraceConfigurationInfo
     */
    var TraceConfigurationInfo = /** @class */ (function () {
        function TraceConfigurationInfo(dataPointInfos, timingParameterInfos, startTriggerInfos) {
            this._dataPointInfos = dataPointInfos;
            this._timingParameterInfos = timingParameterInfos;
            this._startTriggerInfos = startTriggerInfos;
        }
        Object.defineProperty(TraceConfigurationInfo.prototype, "dataPointInfos", {
            /**
             * Gets the data point informations
             *
             * @readonly
             * @type {MappCockpitComponentParameter[]}
             * @memberof TraceConfigurationInfo
             */
            get: function () {
                return this._dataPointInfos;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TraceConfigurationInfo.prototype, "timingParameterInfos", {
            /**
             * Gets the timing parameters informations
             *
             * @readonly
             * @type {MappCockpitComponentParameter[]}
             * @memberof TraceConfigurationInfo
             */
            get: function () {
                return this._timingParameterInfos;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TraceConfigurationInfo.prototype, "startTriggerInfos", {
            /**
             * Gets the start trigger parameters information
             *
             * @readonly
             * @type {MappCockpitComponentParameter[]}
             * @memberof TraceConfigurationInfo
             */
            get: function () {
                return this._startTriggerInfos;
            },
            enumerable: true,
            configurable: true
        });
        return TraceConfigurationInfo;
    }());
    exports.TraceConfigurationInfo = TraceConfigurationInfo;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWdJbmZvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvdHJhY2VDb25maWcvdHJhY2VDb25maWdJbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUVBOzs7O09BSUc7SUFDSDtRQU1JLGdDQUFZLGNBQStDLEVBQUUsb0JBQXFELEVBQUUsaUJBQWtEO1lBQ2xLLElBQUksQ0FBQyxlQUFlLEdBQUcsY0FBYyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxvQkFBb0IsQ0FBQztZQUNsRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsaUJBQWlCLENBQUM7UUFDaEQsQ0FBQztRQVNELHNCQUFXLGtEQUFjO1lBUHpCOzs7Ozs7ZUFNRztpQkFDSDtnQkFDSSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7WUFDaEMsQ0FBQzs7O1dBQUE7UUFTRCxzQkFBVyx3REFBb0I7WUFQL0I7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDO1lBQ3RDLENBQUM7OztXQUFBO1FBU0Qsc0JBQVcscURBQWlCO1lBUDVCOzs7Ozs7ZUFNRztpQkFDSDtnQkFDSSxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztZQUNuQyxDQUFDOzs7V0FBQTtRQUNMLDZCQUFDO0lBQUQsQ0FBQyxBQTVDRCxJQTRDQztJQUVRLHdEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyIH0gZnJvbSBcIi4uLy4uLy4uL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5cclxuLyoqXHJcbiAqIFByb3ZpZGVzIGRhdGEgZm9yIGRlc2NyaWJpbmcgdHJhY2UgY29uZmlndXJhdGlvbiBpbmZvcm1hdGlvbnNcclxuICpcclxuICogQGNsYXNzIFRyYWNlQ29uZmlndXJhdGlvbkluZm9cclxuICovXHJcbmNsYXNzIFRyYWNlQ29uZmlndXJhdGlvbkluZm97XHJcblxyXG4gICAgcHJpdmF0ZSBfZGF0YVBvaW50SW5mb3M6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW107XHJcbiAgICBwcml2YXRlIF90aW1pbmdQYXJhbWV0ZXJJbmZvczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXTtcclxuICAgIHByaXZhdGUgX3N0YXJ0VHJpZ2dlckluZm9zOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGRhdGFQb2ludEluZm9zOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdLCB0aW1pbmdQYXJhbWV0ZXJJbmZvczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSwgc3RhcnRUcmlnZ2VySW5mb3M6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pe1xyXG4gICAgICAgIHRoaXMuX2RhdGFQb2ludEluZm9zID0gZGF0YVBvaW50SW5mb3M7XHJcbiAgICAgICAgdGhpcy5fdGltaW5nUGFyYW1ldGVySW5mb3MgPSB0aW1pbmdQYXJhbWV0ZXJJbmZvcztcclxuICAgICAgICB0aGlzLl9zdGFydFRyaWdnZXJJbmZvcyA9IHN0YXJ0VHJpZ2dlckluZm9zO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgZGF0YSBwb2ludCBpbmZvcm1hdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlndXJhdGlvbkluZm9cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBkYXRhUG9pbnRJbmZvcygpOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVBvaW50SW5mb3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSB0aW1pbmcgcGFyYW1ldGVycyBpbmZvcm1hdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlndXJhdGlvbkluZm9cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB0aW1pbmdQYXJhbWV0ZXJJbmZvcygpOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGltaW5nUGFyYW1ldGVySW5mb3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBzdGFydCB0cmlnZ2VyIHBhcmFtZXRlcnMgaW5mb3JtYXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlndXJhdGlvbkluZm9cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBzdGFydFRyaWdnZXJJbmZvcygpOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3RhcnRUcmlnZ2VySW5mb3M7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFRyYWNlQ29uZmlndXJhdGlvbkluZm8gfTsiXX0=