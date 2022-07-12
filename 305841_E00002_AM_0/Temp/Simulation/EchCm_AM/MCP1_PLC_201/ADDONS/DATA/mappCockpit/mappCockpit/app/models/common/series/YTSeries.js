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
define(["require", "exports", "../../../widgets/chartWidget/chartExtensions/chartDataOptimizer", "../../../common/math/mathX", "./seriesType", "../../../common/persistence/settings", "../calculatorProvider/calculationDataInfo", "./settingIds", "./baseSeries"], function (require, exports, chartDataOptimizer_1, mathX_1, seriesType_1, settings_1, calculationDataInfo_1, settingIds_1, baseSeries_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var YTSeries = /** @class */ (function (_super) {
        __extends(YTSeries, _super);
        /**
         * Creates an instance of YTSeries
         * @param {ISignal} signal
         * @param {string} name
         * @param {string} color
         * @param {ISeriesProvider} seriesProvider
         * @param {string} [uniqueId=""]
         * @memberof YTSeries
         */
        function YTSeries(signal, name, color, seriesProvider, uniqueId) {
            if (uniqueId === void 0) { uniqueId = ""; }
            var _this = _super.call(this, signal, name, color, seriesProvider, uniqueId) || this;
            _this.type = seriesType_1.SeriesType.timeSeries;
            _this.rawPoints = _this.signal.rawPoints;
            _this.updateTimestamps();
            _this.getRange();
            _this.simplifySignal(_this.rawPoints);
            return _this;
        }
        /**
         * Creates an instance of YTSeries with the given settings
         *
         * @static
         * @param {ISettings} settings
         * @param {ISeriesProvider} seriesProvider
         * @returns {YTSeries}
         * @memberof YTSeries
         */
        YTSeries.create = function (settings, seriesProvider) {
            // get info from persistingdata
            var settingsObj = settings_1.Settings.create(settings);
            var id = settingsObj.getValue(settingIds_1.SettingIds.SeriesId);
            var name = settingsObj.getValue(settingIds_1.SettingIds.SeriesName);
            var color = settingsObj.getValue(settingIds_1.SettingIds.SeriesColor);
            var signalData = settingsObj.getValue(settingIds_1.SettingIds.SeriesSignalData);
            // create signal with the given signalData
            var signal = this.createSignal(signalData);
            // create series with the given data
            var newYTSeries = new YTSeries(signal, name, color, seriesProvider, id);
            // set calculation informations if available
            var calculationDataInfo = settingsObj.getValue(settingIds_1.SettingIds.SeriesCalculationData);
            if (calculationDataInfo != undefined) {
                newYTSeries.calculationDataInfo = new calculationDataInfo_1.CalculationDataInfo();
                newYTSeries.calculationDataInfo.setSettings(calculationDataInfo);
            }
            return newYTSeries;
        };
        /**
         *  Returns the settings of the YTSeries
         *
         * @returns {ISettings}
         * @memberof YTSeries
         */
        YTSeries.prototype.getSettings = function () {
            var settings = _super.prototype.getSettings.call(this);
            settings.type = "YTSeries";
            return settings;
        };
        /**
         * Simplifies series data points
         *
         * @memberof YTSeries
         */
        YTSeries.prototype.simplifySignal = function (seriesPoints) {
            // retrieve x and y values
            var xValues = seriesPoints.map(function (point) { return point.x; });
            var yValues = seriesPoints.map(function (point) { return point.y; });
            // get the min max values
            var xMin = mathX_1.MathX.min(xValues);
            var xMax = mathX_1.MathX.max(xValues);
            var yMin = mathX_1.MathX.min(yValues);
            var yMax = mathX_1.MathX.max(yValues);
            // create the simplified points. For yt they are just the min max edge points for initializing the chart area. 
            var reducedSeriesPoints = [];
            reducedSeriesPoints.push(new chartDataOptimizer_1.ChartPoint(0, true, xMin, yMin));
            reducedSeriesPoints.push(new chartDataOptimizer_1.ChartPoint(1, true, xMax, yMax));
            // update simplified series with min/max yt points
            this.data = reducedSeriesPoints;
        };
        /**
         * Get max X value from a serie
         *
         * @protected
         * @returns {(number | undefined)}
         * @memberof YTSeries
         */
        YTSeries.prototype.getMaxX = function () {
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
         * @memberof YTSeries
         */
        YTSeries.prototype.getMinX = function () {
            if (this.rawPoints.length > 0) {
                return this.rawPoints[0].x;
            }
            return undefined;
        };
        /**
         * Updates the timestamps baseon the available series
         *
         * @private
         * @memberof YTSeries
         */
        YTSeries.prototype.updateTimestamps = function () {
            if (this.rawPoints.length > 0) {
                this._timestamps = this.rawPoints.map(function (rawPoint) { return rawPoint.x; });
            }
        };
        return YTSeries;
    }(baseSeries_1.BaseSeries));
    exports.YTSeries = YTSeries;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWVRTZXJpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jb21tb24vc2VyaWVzL1lUU2VyaWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFZQTtRQUE4Qiw0QkFBVTtRQUlwQzs7Ozs7Ozs7V0FRRztRQUNILGtCQUFZLE1BQWUsRUFBRSxJQUFZLEVBQUUsS0FBYSxFQUFFLGNBQStCLEVBQUUsUUFBcUI7WUFBckIseUJBQUEsRUFBQSxhQUFxQjtZQUFoSCxZQUNJLGtCQUFNLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxRQUFRLENBQUMsU0FLdkQ7WUFqQlEsVUFBSSxHQUFHLHVCQUFVLENBQUMsVUFBVSxDQUFDO1lBYWxDLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7WUFDdkMsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDeEIsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLEtBQUksQ0FBQyxjQUFjLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDOztRQUN4QyxDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSSxlQUFNLEdBQWIsVUFBYyxRQUFtQixFQUFFLGNBQStCO1lBQzlELCtCQUErQjtZQUMvQixJQUFJLFdBQVcsR0FBRyxtQkFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM1QyxJQUFJLEVBQUUsR0FBVyxXQUFXLENBQUMsUUFBUSxDQUFDLHVCQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0QsSUFBSSxJQUFJLEdBQVcsV0FBVyxDQUFDLFFBQVEsQ0FBQyx1QkFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQy9ELElBQUksS0FBSyxHQUFXLFdBQVcsQ0FBQyxRQUFRLENBQUMsdUJBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNq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QTtRQUNwQixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDTyxtQ0FBZ0IsR0FBMUI7WUFDSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFDLFFBQVEsSUFBTyxPQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMvRTtRQUNMLENBQUM7UUFDTCxlQUFDO0lBQUQsQ0FBQyxBQWxJRCxDQUE4Qix1QkFBVSxHQWtJdkM7SUFsSVksNEJBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJU2lnbmFsIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvc2lnbmFsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTZXJpZXNQcm92aWRlciB9IGZyb20gXCIuLi9zZXJpZXNQcm92aWRlci9zZXJpZXNQcm92aWRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL2ludGVyZmFjZXMvc2V0dGluZ3NJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIlxyXG5pbXBvcnQgeyBDaGFydFBvaW50IH0gZnJvbSBcIi4uLy4uLy4uL3dpZGdldHMvY2hhcnRXaWRnZXQvY2hhcnRFeHRlbnNpb25zL2NoYXJ0RGF0YU9wdGltaXplclwiO1xyXG5pbXBvcnQgeyBNYXRoWCB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vbWF0aC9tYXRoWFwiO1xyXG5pbXBvcnQgeyBTZXJpZXNUeXBlIH0gZnJvbSBcIi4vc2VyaWVzVHlwZVwiO1xyXG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGVyc2lzdGVuY2Uvc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhSW5mbyB9IGZyb20gXCIuLi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRpb25EYXRhSW5mb1wiO1xyXG5pbXBvcnQgeyBTZXR0aW5nSWRzIH0gZnJvbSBcIi4vc2V0dGluZ0lkc1wiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzfSBmcm9tIFwiLi9iYXNlU2VyaWVzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgWVRTZXJpZXMgZXh0ZW5kcyBCYXNlU2VyaWVze1xyXG4gICBcclxuICAgIHJlYWRvbmx5IHR5cGUgPSBTZXJpZXNUeXBlLnRpbWVTZXJpZXM7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBZVFNlcmllc1xyXG4gICAgICogQHBhcmFtIHtJU2lnbmFsfSBzaWduYWxcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29sb3JcclxuICAgICAqIEBwYXJhbSB7SVNlcmllc1Byb3ZpZGVyfSBzZXJpZXNQcm92aWRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFt1bmlxdWVJZD1cIlwiXVxyXG4gICAgICogQG1lbWJlcm9mIFlUU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHNpZ25hbDogSVNpZ25hbCwgbmFtZTogc3RyaW5nLCBjb2xvcjogc3RyaW5nLCBzZXJpZXNQcm92aWRlcjogSVNlcmllc1Byb3ZpZGVyLCB1bmlxdWVJZDogc3RyaW5nID0gXCJcIikge1xyXG4gICAgICAgIHN1cGVyKHNpZ25hbCwgbmFtZSwgY29sb3IsIHNlcmllc1Byb3ZpZGVyLCB1bmlxdWVJZCk7XHJcbiAgICAgICAgdGhpcy5yYXdQb2ludHMgPSB0aGlzLnNpZ25hbC5yYXdQb2ludHM7XHJcbiAgICAgICAgdGhpcy51cGRhdGVUaW1lc3RhbXBzKCk7XHJcbiAgICAgICAgdGhpcy5nZXRSYW5nZSgpO1xyXG4gICAgICAgIHRoaXMuc2ltcGxpZnlTaWduYWwodGhpcy5yYXdQb2ludHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBZVFNlcmllcyB3aXRoIHRoZSBnaXZlbiBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7SVNldHRpbmdzfSBzZXR0aW5nc1xyXG4gICAgICogQHBhcmFtIHtJU2VyaWVzUHJvdmlkZXJ9IHNlcmllc1Byb3ZpZGVyXHJcbiAgICAgKiBAcmV0dXJucyB7WVRTZXJpZXN9XHJcbiAgICAgKiBAbWVtYmVyb2YgWVRTZXJpZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNyZWF0ZShzZXR0aW5nczogSVNldHRpbmdzLCBzZXJpZXNQcm92aWRlcjogSVNlcmllc1Byb3ZpZGVyKTogWVRTZXJpZXN7XHJcbiAgICAgICAgLy8gZ2V0IGluZm8gZnJvbSBwZXJzaXN0aW5nZGF0YVxyXG4gICAgICAgIGxldCBzZXR0aW5nc09iaiA9IFNldHRpbmdzLmNyZWF0ZShzZXR0aW5ncyk7XHJcbiAgICAgICAgbGV0IGlkOiBzdHJpbmcgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShTZXR0aW5nSWRzLlNlcmllc0lkKTtcclxuICAgICAgICBsZXQgbmFtZTogc3RyaW5nID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoU2V0dGluZ0lkcy5TZXJpZXNOYW1lKTtcclxuICAgICAgICBsZXQgY29sb3I6IHN0cmluZyA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuU2VyaWVzQ29sb3IpO1xyXG4gICAgICAgIGxldCBzaWduYWxEYXRhOiBJU2V0dGluZ3N8dW5kZWZpbmVkID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoU2V0dGluZ0lkcy5TZXJpZXNTaWduYWxEYXRhKTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIHNpZ25hbCB3aXRoIHRoZSBnaXZlbiBzaWduYWxEYXRhXHJcbiAgICAgICAgbGV0IHNpZ25hbCA9IHRoaXMuY3JlYXRlU2lnbmFsKHNpZ25hbERhdGEpO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgc2VyaWVzIHdpdGggdGhlIGdpdmVuIGRhdGFcclxuICAgICAgICBsZXQgbmV3WVRTZXJpZXMgPSBuZXcgWVRTZXJpZXMoc2lnbmFsLCBuYW1lLCBjb2xvciwgc2VyaWVzUHJvdmlkZXIsIGlkKTtcclxuXHJcbiAgICAgICAgLy8gc2V0IGNhbGN1bGF0aW9uIGluZm9ybWF0aW9ucyBpZiBhdmFpbGFibGVcclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25EYXRhSW5mbzogSVNldHRpbmdzfHVuZGVmaW5lZCA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuU2VyaWVzQ2FsY3VsYXRpb25EYXRhKTtcclxuICAgICAgICBpZihjYWxjdWxhdGlvbkRhdGFJbmZvICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIG5ld1lUU2VyaWVzLmNhbGN1bGF0aW9uRGF0YUluZm8gPSBuZXcgQ2FsY3VsYXRpb25EYXRhSW5mbygpO1xyXG4gICAgICAgICAgICBuZXdZVFNlcmllcy5jYWxjdWxhdGlvbkRhdGFJbmZvLnNldFNldHRpbmdzKGNhbGN1bGF0aW9uRGF0YUluZm8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3WVRTZXJpZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgUmV0dXJucyB0aGUgc2V0dGluZ3Mgb2YgdGhlIFlUU2VyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0lTZXR0aW5nc31cclxuICAgICAqIEBtZW1iZXJvZiBZVFNlcmllc1xyXG4gICAgICovXHJcbiAgICBnZXRTZXR0aW5ncygpOiBJU2V0dGluZ3N7XHJcbiAgICAgICAgbGV0IHNldHRpbmdzID0gc3VwZXIuZ2V0U2V0dGluZ3MoKTtcclxuICAgICAgICBzZXR0aW5ncy50eXBlID0gXCJZVFNlcmllc1wiO1xyXG4gICAgICAgIHJldHVybiBzZXR0aW5ncztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNpbXBsaWZpZXMgc2VyaWVzIGRhdGEgcG9pbnRzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFlUU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzaW1wbGlmeVNpZ25hbChzZXJpZXNQb2ludHM6SVBvaW50W10pIHtcclxuXHJcbiAgICAgICAgLy8gcmV0cmlldmUgeCBhbmQgeSB2YWx1ZXNcclxuICAgICAgICBjb25zdCB4VmFsdWVzID0gc2VyaWVzUG9pbnRzLm1hcCgocG9pbnQpPT57IHJldHVybiBwb2ludC54O30pO1xyXG4gICAgICAgIGxldCB5VmFsdWVzID0gc2VyaWVzUG9pbnRzLm1hcCgocG9pbnQpPT57IHJldHVybiBwb2ludC55O30pO1xyXG5cclxuICAgICAgICAvLyBnZXQgdGhlIG1pbiBtYXggdmFsdWVzXHJcbiAgICAgICAgY29uc3QgeE1pbiA9IE1hdGhYLm1pbih4VmFsdWVzKTtcclxuICAgICAgICBjb25zdCB4TWF4ID0gTWF0aFgubWF4KHhWYWx1ZXMpO1xyXG4gICAgICAgIGNvbnN0IHlNaW4gPSBNYXRoWC5taW4oeVZhbHVlcyk7XHJcbiAgICAgICAgY29uc3QgeU1heCA9IE1hdGhYLm1heCh5VmFsdWVzKTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIHRoZSBzaW1wbGlmaWVkIHBvaW50cy4gRm9yIHl0IHRoZXkgYXJlIGp1c3QgdGhlIG1pbiBtYXggZWRnZSBwb2ludHMgZm9yIGluaXRpYWxpemluZyB0aGUgY2hhcnQgYXJlYS4gXHJcbiAgICAgICAgbGV0IHJlZHVjZWRTZXJpZXNQb2ludHM6Q2hhcnRQb2ludFtdID0gW107XHJcbiAgICAgICAgcmVkdWNlZFNlcmllc1BvaW50cy5wdXNoKG5ldyBDaGFydFBvaW50KDAsdHJ1ZSx4TWluLHlNaW4pKTtcclxuICAgICAgICByZWR1Y2VkU2VyaWVzUG9pbnRzLnB1c2gobmV3IENoYXJ0UG9pbnQoMSx0cnVlLHhNYXgseU1heCkpO1xyXG5cclxuICAgICAgICAvLyB1cGRhdGUgc2ltcGxpZmllZCBzZXJpZXMgd2l0aCBtaW4vbWF4IHl0IHBvaW50c1xyXG4gICAgICAgIHRoaXMuZGF0YSA9ICByZWR1Y2VkU2VyaWVzUG9pbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IG1heCBYIHZhbHVlIGZyb20gYSBzZXJpZVxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEByZXR1cm5zIHsobnVtYmVyIHwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBZVFNlcmllc1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0TWF4WCgpOiBudW1iZXIgfCB1bmRlZmluZWR7XHJcbiAgICAgICAgaWYgKHRoaXMucmF3UG9pbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmF3UG9pbnRzW3RoaXMucmF3UG9pbnRzLmxlbmd0aCAtIDFdLnhcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBtaW4gWCB2YWx1ZSBmcm9tIGEgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7KG51bWJlciB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgWVRTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldE1pblgoKTogbnVtYmVyIHwgdW5kZWZpbmVke1xyXG4gICAgICAgIGlmICh0aGlzLnJhd1BvaW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJhd1BvaW50c1swXS54O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgdGltZXN0YW1wcyBiYXNlb24gdGhlIGF2YWlsYWJsZSBzZXJpZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFlUU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCB1cGRhdGVUaW1lc3RhbXBzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnJhd1BvaW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWVzdGFtcHMgPSB0aGlzLnJhd1BvaW50cy5tYXAoKHJhd1BvaW50KSA9PiB7IHJldHVybiByYXdQb2ludC54OyB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=