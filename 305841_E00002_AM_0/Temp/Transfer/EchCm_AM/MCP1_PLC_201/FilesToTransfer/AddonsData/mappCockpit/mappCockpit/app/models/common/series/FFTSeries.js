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
define(["require", "exports", "./seriesType", "../../../common/persistence/settings", "../calculatorProvider/calculationDataInfo", "./settingIds", "./baseSeries"], function (require, exports, seriesType_1, settings_1, calculationDataInfo_1, settingIds_1, baseSeries_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FFTSeries = /** @class */ (function (_super) {
        __extends(FFTSeries, _super);
        /**
         * Creates an instance of FFTSeries
         * @param {ISignal} signal
         * @param {string} name
         * @param {string} color
         * @param {ISeriesProvider} seriesProvider
         * @param {string} [uniqueId=""]
         * @memberof FFTSeries
         */
        function FFTSeries(signal, name, color, seriesProvider, uniqueId) {
            if (uniqueId === void 0) { uniqueId = ""; }
            var _this = _super.call(this, signal, name, color, seriesProvider, uniqueId) || this;
            _this.type = seriesType_1.SeriesType.fftSeries;
            _this.rawPoints = _this.signal.rawPoints;
            _this.updateTimestamps();
            _this.getRange();
            return _this;
        }
        /**
         * Creates an instance of FFTSeries with the given settings
         *
         * @static
         * @param {ISettings} settings
         * @param {ISeriesProvider} seriesProvider
         * @returns {FFTSeries}
         * @memberof FFTSeries
         */
        FFTSeries.create = function (settings, seriesProvider) {
            // get info from persistingdata
            var settingsObj = settings_1.Settings.create(settings);
            var id = settingsObj.getValue(settingIds_1.SettingIds.SeriesId);
            var name = settingsObj.getValue(settingIds_1.SettingIds.SeriesName);
            var color = settingsObj.getValue(settingIds_1.SettingIds.SeriesColor);
            var signalData = settingsObj.getValue(settingIds_1.SettingIds.SeriesSignalData);
            // create signal with the given signalData
            var signal = this.createSignal(signalData);
            // create series with the given data
            var newYTSeries = new FFTSeries(signal, name, color, seriesProvider, id);
            // set calculation informations if available
            var calculationDataInfo = settingsObj.getValue(settingIds_1.SettingIds.SeriesCalculationData);
            if (calculationDataInfo != undefined) {
                newYTSeries.calculationDataInfo = new calculationDataInfo_1.CalculationDataInfo();
                newYTSeries.calculationDataInfo.setSettings(calculationDataInfo);
            }
            return newYTSeries;
        };
        /**
         * Returns the settings of the FFTSeries
         *
         * @returns {ISettings}
         * @memberof FFTSeries
         */
        FFTSeries.prototype.getSettings = function () {
            var settings = _super.prototype.getSettings.call(this);
            settings.type = "FFTSeries";
            return settings;
        };
        /**
         * Get max X value from a serie
         *
         * @protected
         * @returns {(number | undefined)}
         * @memberof FFTSeries
         */
        FFTSeries.prototype.getMaxX = function () {
            if (this.rawPoints.length > 0) {
                return this.rawPoints[this.rawPoints.length - 1].x;
            }
            return undefined;
        };
        /**
         * Get min X value from a serie
         *
         * @protected
         * @returns {(number | undefined)}
         * @memberof FFTSeries
         */
        FFTSeries.prototype.getMinX = function () {
            if (this.rawPoints.length > 0) {
                return this.rawPoints[0].x;
            }
            return undefined;
        };
        /**
         * Updates the timestamps baseon the available series
         *
         * @private
         * @memberof FFTSeries
         */
        FFTSeries.prototype.updateTimestamps = function () {
            if (this.rawPoints.length > 0) {
                this._timestamps = this.rawPoints.map(function (rawPoint) { return rawPoint.x; });
            }
        };
        return FFTSeries;
    }(baseSeries_1.BaseSeries));
    exports.FFTSeries = FFTSeries;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRkZUU2VyaWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL3Nlcmllcy9GRlRTZXJpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVNBO1FBQStCLDZCQUFVO1FBSXJDOzs7Ozs7OztXQVFHO1FBQ0gsbUJBQVksTUFBZSxFQUFFLElBQVksRUFBRSxLQUFhLEVBQUUsY0FBK0IsRUFBRSxRQUFxQjtZQUFyQix5QkFBQSxFQUFBLGFBQXFCO1lBQWhILFlBQ0ksa0JBQU0sTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLFFBQVEsQ0FBQyxTQUl2RDtZQWhCUSxVQUFJLEdBQUcsdUJBQVUsQ0FBQyxTQUFTLENBQUM7WUFhakMsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztZQUN2QyxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUN4QixLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7O1FBQ3BCLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNJLGdCQUFNLEdBQWIsVUFBYyxRQUFtQixFQUFFLGNBQStCO1lBQzlELCtCQUErQjtZQUMvQixJQUFJLFdBQVcsR0FBRyxtQkFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM1QyxJQUFJLEVBQUUsR0FBVyxXQUFXLENBQUMsUUFBUSxDQUFDLHVCQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0QsSUFBSSxJQUFJLEdBQVcsV0FBVyxDQUFDLFFBQVEsQ0FBQyx1QkFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQy9ELElBQUksS0FBSyxHQUFXLFdBQVcsQ0FBQyxRQUFRLENBQUMsdUJBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNqRSxJQUFJLFVBQVUsR0FBd0IsV0FBVyxDQUFDLFFBQVEsQ0FBQyx1QkFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFeEYsMENBQTBDO1lBQzFDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFM0Msb0NBQW9DO1lBQ3BDLElBQUksV0FBVyxHQUFHLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUV6RSw0Q0FBNEM7WUFDNUMsSUFBSSxtQkFBbUIsR0FBd0IsV0FBVyxDQUFDLFFBQVEsQ0FBQyx1QkFBVSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDdEcsSUFBRyxtQkFBbUIsSUFBSSxTQUFTLEVBQUM7Z0JBQ2hDLFdBQVcsQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLHlDQUFtQixFQUFFLENBQUM7Z0JBQzVELFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLENBQUMsQ0FBQzthQUNwRTtZQUVELE9BQU8sV0FBVyxDQUFDO1FBQ3ZCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILCtCQUFXLEdBQVg7WUFDSSxJQUFJLFFBQVEsR0FBRyxpQkFBTSxXQUFXLFdBQUUsQ0FBQztZQUNuQyxRQUFRLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQztZQUM1QixPQUFPLFFBQVEsQ0FBQztRQUNwQixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ08sMkJBQU8sR0FBakI7WUFDSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDM0IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTthQUNyRDtZQUNELE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDTywyQkFBTyxHQUFqQjtZQUNJLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUMzQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzlCO1lBQ0QsT0FBTyxTQUFTLENBQUE7UUFDcEIsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ08sb0NBQWdCLEdBQTFCO1lBQ0ksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBQyxRQUFRLElBQU8sT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDL0U7UUFDTCxDQUFDO1FBQ0wsZ0JBQUM7SUFBRCxDQUFDLEFBeEdELENBQStCLHVCQUFVLEdBd0d4QztJQXhHWSw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElTaWduYWwgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9zaWduYWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNlcmllc1Byb3ZpZGVyIH0gZnJvbSBcIi4uL3Nlcmllc1Byb3ZpZGVyL3Nlcmllc1Byb3ZpZGVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGVyc2lzdGVuY2UvaW50ZXJmYWNlcy9zZXR0aW5nc0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTZXJpZXNUeXBlIH0gZnJvbSBcIi4vc2VyaWVzVHlwZVwiO1xyXG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGVyc2lzdGVuY2Uvc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhSW5mbyB9IGZyb20gXCIuLi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRpb25EYXRhSW5mb1wiO1xyXG5pbXBvcnQgeyBTZXR0aW5nSWRzIH0gZnJvbSBcIi4vc2V0dGluZ0lkc1wiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4vYmFzZVNlcmllc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZGVFNlcmllcyBleHRlbmRzIEJhc2VTZXJpZXN7XHJcbiAgICBcclxuICAgIHJlYWRvbmx5IHR5cGUgPSBTZXJpZXNUeXBlLmZmdFNlcmllcztcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgRkZUU2VyaWVzXHJcbiAgICAgKiBAcGFyYW0ge0lTaWduYWx9IHNpZ25hbFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb2xvclxyXG4gICAgICogQHBhcmFtIHtJU2VyaWVzUHJvdmlkZXJ9IHNlcmllc1Byb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3VuaXF1ZUlkPVwiXCJdXHJcbiAgICAgKiBAbWVtYmVyb2YgRkZUU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHNpZ25hbDogSVNpZ25hbCwgbmFtZTogc3RyaW5nLCBjb2xvcjogc3RyaW5nLCBzZXJpZXNQcm92aWRlcjogSVNlcmllc1Byb3ZpZGVyLCB1bmlxdWVJZDogc3RyaW5nID0gXCJcIikge1xyXG4gICAgICAgIHN1cGVyKHNpZ25hbCwgbmFtZSwgY29sb3IsIHNlcmllc1Byb3ZpZGVyLCB1bmlxdWVJZCk7XHJcbiAgICAgICAgdGhpcy5yYXdQb2ludHMgPSB0aGlzLnNpZ25hbC5yYXdQb2ludHM7XHJcbiAgICAgICAgdGhpcy51cGRhdGVUaW1lc3RhbXBzKCk7XHJcbiAgICAgICAgdGhpcy5nZXRSYW5nZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBGRlRTZXJpZXMgd2l0aCB0aGUgZ2l2ZW4gc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0lTZXR0aW5nc30gc2V0dGluZ3NcclxuICAgICAqIEBwYXJhbSB7SVNlcmllc1Byb3ZpZGVyfSBzZXJpZXNQcm92aWRlclxyXG4gICAgICogQHJldHVybnMge0ZGVFNlcmllc31cclxuICAgICAqIEBtZW1iZXJvZiBGRlRTZXJpZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNyZWF0ZShzZXR0aW5nczogSVNldHRpbmdzLCBzZXJpZXNQcm92aWRlcjogSVNlcmllc1Byb3ZpZGVyKTogRkZUU2VyaWVze1xyXG4gICAgICAgIC8vIGdldCBpbmZvIGZyb20gcGVyc2lzdGluZ2RhdGFcclxuICAgICAgICBsZXQgc2V0dGluZ3NPYmogPSBTZXR0aW5ncy5jcmVhdGUoc2V0dGluZ3MpO1xyXG4gICAgICAgIGxldCBpZDogc3RyaW5nID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoU2V0dGluZ0lkcy5TZXJpZXNJZCk7XHJcbiAgICAgICAgbGV0IG5hbWU6IHN0cmluZyA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuU2VyaWVzTmFtZSk7XHJcbiAgICAgICAgbGV0IGNvbG9yOiBzdHJpbmcgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShTZXR0aW5nSWRzLlNlcmllc0NvbG9yKTtcclxuICAgICAgICBsZXQgc2lnbmFsRGF0YTogSVNldHRpbmdzfHVuZGVmaW5lZCA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuU2VyaWVzU2lnbmFsRGF0YSk7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBzaWduYWwgd2l0aCB0aGUgZ2l2ZW4gc2lnbmFsRGF0YVxyXG4gICAgICAgIGxldCBzaWduYWwgPSB0aGlzLmNyZWF0ZVNpZ25hbChzaWduYWxEYXRhKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBjcmVhdGUgc2VyaWVzIHdpdGggdGhlIGdpdmVuIGRhdGFcclxuICAgICAgICBsZXQgbmV3WVRTZXJpZXMgPSBuZXcgRkZUU2VyaWVzKHNpZ25hbCwgbmFtZSwgY29sb3IsIHNlcmllc1Byb3ZpZGVyLCBpZCk7XHJcblxyXG4gICAgICAgIC8vIHNldCBjYWxjdWxhdGlvbiBpbmZvcm1hdGlvbnMgaWYgYXZhaWxhYmxlXHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uRGF0YUluZm86IElTZXR0aW5nc3x1bmRlZmluZWQgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShTZXR0aW5nSWRzLlNlcmllc0NhbGN1bGF0aW9uRGF0YSk7XHJcbiAgICAgICAgaWYoY2FsY3VsYXRpb25EYXRhSW5mbyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBuZXdZVFNlcmllcy5jYWxjdWxhdGlvbkRhdGFJbmZvID0gbmV3IENhbGN1bGF0aW9uRGF0YUluZm8oKTtcclxuICAgICAgICAgICAgbmV3WVRTZXJpZXMuY2FsY3VsYXRpb25EYXRhSW5mby5zZXRTZXR0aW5ncyhjYWxjdWxhdGlvbkRhdGFJbmZvKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXdZVFNlcmllcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHNldHRpbmdzIG9mIHRoZSBGRlRTZXJpZXNcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7SVNldHRpbmdzfVxyXG4gICAgICogQG1lbWJlcm9mIEZGVFNlcmllc1xyXG4gICAgICovXHJcbiAgICBnZXRTZXR0aW5ncygpOiBJU2V0dGluZ3N7XHJcbiAgICAgICAgbGV0IHNldHRpbmdzID0gc3VwZXIuZ2V0U2V0dGluZ3MoKTtcclxuICAgICAgICBzZXR0aW5ncy50eXBlID0gXCJGRlRTZXJpZXNcIjtcclxuICAgICAgICByZXR1cm4gc2V0dGluZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgbWF4IFggdmFsdWUgZnJvbSBhIHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHJldHVybnMgeyhudW1iZXIgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIEZGVFNlcmllc1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0TWF4WCgpOiBudW1iZXIgfCB1bmRlZmluZWR7XHJcbiAgICAgICAgaWYgKHRoaXMucmF3UG9pbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmF3UG9pbnRzW3RoaXMucmF3UG9pbnRzLmxlbmd0aCAtIDFdLnhcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBtaW4gWCB2YWx1ZSBmcm9tIGEgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7KG51bWJlciB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgRkZUU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRNaW5YKCk6IG51bWJlciB8IHVuZGVmaW5lZHtcclxuICAgICAgICBpZiAodGhpcy5yYXdQb2ludHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yYXdQb2ludHNbMF0ueDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgdGltZXN0YW1wcyBiYXNlb24gdGhlIGF2YWlsYWJsZSBzZXJpZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIEZGVFNlcmllc1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlVGltZXN0YW1wcygpIHtcclxuICAgICAgICBpZiAodGhpcy5yYXdQb2ludHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl90aW1lc3RhbXBzID0gdGhpcy5yYXdQb2ludHMubWFwKChyYXdQb2ludCkgPT4geyByZXR1cm4gcmF3UG9pbnQueDsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19