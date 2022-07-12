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
define(["require", "exports", "../../../common/math/lineReductionAlgorithm/rdp", "../../../common/math/mathX", "./seriesType", "../../../common/persistence/settings", "../calculatorProvider/calculationDataInfo", "./settingIds", "./baseSeries", "../../../widgets/chartWidget/chartExtensions/chartDataOptimizer"], function (require, exports, rdp_1, mathX_1, seriesType_1, settings_1, calculationDataInfo_1, settingIds_1, baseSeries_1, chartDataOptimizer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var XYSeries = /** @class */ (function (_super) {
        __extends(XYSeries, _super);
        /**
         * Creates an instance of XYSeries
         * @param {ISignal} signal
         * @param {string} name
         * @param {string} color
         * @param {ISeriesProvider} seriesProvider
         * @param {string} [uniqueId=""]
         * @memberof XYSeries
         */
        function XYSeries(signal, name, color, seriesProvider, uniqueId) {
            if (uniqueId === void 0) { uniqueId = ""; }
            var _this = _super.call(this, signal, name, color, seriesProvider, uniqueId) || this;
            _this.type = seriesType_1.SeriesType.xySeries;
            _this.rawPoints = _this.signal.rawPoints;
            _this.updateTimestamps();
            _this.getRange();
            _this.simplifySignal(_this.rawPoints);
            return _this;
        }
        /**
         * Creates an instance of XYSeries with the given settings
         *
         * @static
         * @param {ISettings} settings
         * @param {ISeriesProvider} seriesProvider
         * @returns {XYSeries}
         * @memberof XYSeries
         */
        XYSeries.create = function (settings, seriesProvider) {
            // get info from persistingdata
            var settingsObj = settings_1.Settings.create(settings);
            var id = settingsObj.getValue(settingIds_1.SettingIds.SeriesId);
            var name = settingsObj.getValue(settingIds_1.SettingIds.SeriesName);
            var color = settingsObj.getValue(settingIds_1.SettingIds.SeriesColor);
            var signalData = settingsObj.getValue(settingIds_1.SettingIds.SeriesSignalData);
            // create signal with the given signalData
            var signal = this.createSignal(signalData);
            // create series with the given data
            var newXYSeries = new XYSeries(signal, name, color, seriesProvider, id);
            // set calculation informations if available
            var calculationDataInfo = settingsObj.getValue(settingIds_1.SettingIds.SeriesCalculationData);
            if (calculationDataInfo != undefined) {
                newXYSeries.calculationDataInfo = new calculationDataInfo_1.CalculationDataInfo();
                newXYSeries.calculationDataInfo.setSettings(calculationDataInfo);
            }
            return newXYSeries;
        };
        /**
         * Returns the settings of the XYSeries
         *
         * @returns {ISettings}
         * @memberof XYSeries
         */
        XYSeries.prototype.getSettings = function () {
            var settings = _super.prototype.getSettings.call(this);
            settings.type = "XYSeries";
            return settings;
        };
        /**
         * Calculates an initial line simplification
         *
         * @param {IPoint[]} seriesPoints
         * @memberof XYSeries
         */
        XYSeries.prototype.simplifySignal = function (seriesPoints) {
            var lineOptimization = new rdp_1.RDP();
            var xValues = seriesPoints.map(function (point) { return point.x; });
            var yValues = seriesPoints.map(function (point) { return point.y; });
            var xMin = mathX_1.MathX.min(xValues);
            var xMax = mathX_1.MathX.max(xValues);
            var yMin = mathX_1.MathX.min(yValues);
            var yMax = mathX_1.MathX.max(yValues);
            // calculate series ranges
            var xRange = xMax - xMin;
            var yRange = yMax - yMin;
            // calculate unit per pixel ratios
            var xRatio = xRange / 10000;
            var yRatio = yRange / 10000;
            // the units/pixel ratio must not be 0 
            xRatio = xRatio > 0 ? xRatio : Number.MIN_VALUE;
            yRatio = yRatio > 0 ? yRatio : Number.MIN_VALUE;
            // set required simplification precision
            var precision = 1;
            // create chart points from the raw points
            var rawPoints = seriesPoints.map(function (point, i) { return new chartDataOptimizer_1.ChartPoint(i, true, point.x, point.y); });
            // calculate the reduced point set
            var reducedSeriesPoints = lineOptimization.simplify(rawPoints, precision, xRatio, yRatio, true);
            // update simplified series view points and reduction ratios
            this.data = reducedSeriesPoints;
            this.data.pixelRatioX = xRatio;
            this.data.pixelRatioY = yRatio;
        };
        /**
         * Get max X value from a serie
         *
         * @protected
         * @returns {(number | undefined)}
         * @memberof XYSeries
         */
        XYSeries.prototype.getMaxX = function () {
            var maxX;
            if (this.rawPoints.length > 0) {
                for (var i = 0; i < this.rawPoints.length; i++) {
                    if (maxX == undefined || this.rawPoints[i].x > maxX) {
                        maxX = this.rawPoints[i].x;
                    }
                }
            }
            return maxX;
        };
        /**
         * Get min X value from a serie
         *
         * @protected
         * @returns {(number | undefined)}
         * @memberof XYSeries
         */
        XYSeries.prototype.getMinX = function () {
            var minX;
            if (this.rawPoints.length > 0) {
                for (var i = 0; i < this.rawPoints.length; i++) {
                    if (minX == undefined || this.rawPoints[i].x < minX) {
                        minX = this.rawPoints[i].x;
                    }
                }
            }
            return minX;
        };
        /**
         * Updates the timestamps baseon the available series
         *
         * @private
         * @memberof XYSeries
         */
        XYSeries.prototype.updateTimestamps = function () {
            if (this.calculationDataInfo != undefined) {
                if (this.calculationDataInfo.inputData.length > 0) {
                    // we use the x values from the input 0 as the timestamps source
                    this._timestamps = this.calculationDataInfo.inputData[0].getData().map(function (inputDataPoint) { return inputDataPoint.x; });
                }
            }
        };
        /**
         * Called whenever the seris data has changed
         *
         * @private
         * @param {IPoint[]} data
         * @memberof XYSeries
         */
        XYSeries.prototype.onSerieDataChanged = function (seriesData) {
            if (seriesData && seriesData.length > 0) {
                this.simplifySignal(seriesData);
            }
        };
        return XYSeries;
    }(baseSeries_1.BaseSeries));
    exports.XYSeries = XYSeries;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWFlTZXJpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jb21tb24vc2VyaWVzL1hZU2VyaWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFjQTtRQUE4Qiw0QkFBVTtRQUlwQzs7Ozs7Ozs7V0FRRztRQUNILGtCQUFZLE1BQWUsRUFBRSxJQUFZLEVBQUUsS0FBYSxFQUFFLGNBQStCLEVBQUUsUUFBcUI7WUFBckIseUJBQUEsRUFBQSxhQUFxQjtZQUFoSCxZQUNJLGtCQUFNLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxRQUFRLENBQUMsU0FLdkQ7WUFqQkQsVUFBSSxHQUFHLHVCQUFVLENBQUMsUUFBUSxDQUFDO1lBYXZCLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7WUFDdkMsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDeEIsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLEtBQUksQ0FBQyxjQUFjLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDOztRQUN4QyxDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSSxlQUFNLEdBQWIsVUFBYyxRQUFtQixFQUFFLGNBQStCO1lBQzlELCtCQUErQjtZQUMvQixJQUFJLFdBQVcsR0FBRyxtQkFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM1QyxJQUFJLEVBQUUsR0FBVyxXQUFXLENBQUMsUUFBUSxDQUFDLHVCQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0QsSUFBSSxJQUFJLEdBQVcsV0FBVyxDQUFDLFFBQVEsQ0FBQyx1QkFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQy9ELElBQUksS0FBSyxHQUFXLFdBQVcsQ0FBQyxRQUFRLENBQUMsdUJBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNq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aEQsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO3FCQUM3QjtpQkFDSjthQUNKO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ksbUNBQWdCLEdBQXZCO1lBQ0ksSUFBRyxJQUFJLENBQUMsbUJBQW1CLElBQUksU0FBUyxFQUFDO2dCQUNyQyxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDL0MsZ0VBQWdFO29CQUNoRSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQUMsY0FBYyxJQUFLLE9BQU8sY0FBYyxDQUFDLENBQUMsQ0FBQSxDQUFBLENBQUMsQ0FBQyxDQUFDO2lCQUN4SDthQUNKO1FBQ0wsQ0FBQztRQUdEOzs7Ozs7V0FNRztRQUNPLHFDQUFrQixHQUE1QixVQUE4QixVQUFvQjtZQUM5QyxJQUFHLFVBQVUsSUFBSSxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQztnQkFDbkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNuQztRQUNMLENBQUM7UUFJTCxlQUFDO0lBQUQsQ0FBQyxBQWpMRCxDQUE4Qix1QkFBVSxHQWlMdkM7SUFqTFksNEJBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJU2lnbmFsIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvc2lnbmFsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTZXJpZXNQcm92aWRlciB9IGZyb20gXCIuLi9zZXJpZXNQcm92aWRlci9zZXJpZXNQcm92aWRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL2ludGVyZmFjZXMvc2V0dGluZ3NJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgUkRQIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9tYXRoL2xpbmVSZWR1Y3Rpb25BbGdvcml0aG0vcmRwXCI7XHJcbmltcG9ydCB7IE1hdGhYIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9tYXRoL21hdGhYXCI7XHJcbmltcG9ydCB7IFNlcmllc1R5cGUgfSBmcm9tIFwiLi9zZXJpZXNUeXBlXCI7XHJcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFJbmZvIH0gZnJvbSBcIi4uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGFJbmZvXCI7XHJcbmltcG9ydCB7IFNldHRpbmdJZHMgfSBmcm9tIFwiLi9zZXR0aW5nSWRzXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi9iYXNlU2VyaWVzXCI7XHJcblxyXG5pbXBvcnQgeyBDaGFydFBvaW50IH0gZnJvbSBcIi4uLy4uLy4uL3dpZGdldHMvY2hhcnRXaWRnZXQvY2hhcnRFeHRlbnNpb25zL2NoYXJ0RGF0YU9wdGltaXplclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFhZU2VyaWVzIGV4dGVuZHMgQmFzZVNlcmllc3tcclxuICAgIFxyXG4gICAgdHlwZSA9IFNlcmllc1R5cGUueHlTZXJpZXM7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFhZU2VyaWVzXHJcbiAgICAgKiBAcGFyYW0ge0lTaWduYWx9IHNpZ25hbFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb2xvclxyXG4gICAgICogQHBhcmFtIHtJU2VyaWVzUHJvdmlkZXJ9IHNlcmllc1Byb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3VuaXF1ZUlkPVwiXCJdXHJcbiAgICAgKiBAbWVtYmVyb2YgWFlTZXJpZXNcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioc2lnbmFsOiBJU2lnbmFsLCBuYW1lOiBzdHJpbmcsIGNvbG9yOiBzdHJpbmcsIHNlcmllc1Byb3ZpZGVyOiBJU2VyaWVzUHJvdmlkZXIsIHVuaXF1ZUlkOiBzdHJpbmcgPSBcIlwiKSB7XHJcbiAgICAgICAgc3VwZXIoc2lnbmFsLCBuYW1lLCBjb2xvciwgc2VyaWVzUHJvdmlkZXIsIHVuaXF1ZUlkKTtcclxuICAgICAgICB0aGlzLnJhd1BvaW50cyA9IHRoaXMuc2lnbmFsLnJhd1BvaW50cztcclxuICAgICAgICB0aGlzLnVwZGF0ZVRpbWVzdGFtcHMoKTtcclxuICAgICAgICB0aGlzLmdldFJhbmdlKCk7XHJcbiAgICAgICAgdGhpcy5zaW1wbGlmeVNpZ25hbCh0aGlzLnJhd1BvaW50cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFhZU2VyaWVzIHdpdGggdGhlIGdpdmVuIHNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtJU2V0dGluZ3N9IHNldHRpbmdzXHJcbiAgICAgKiBAcGFyYW0ge0lTZXJpZXNQcm92aWRlcn0gc2VyaWVzUHJvdmlkZXJcclxuICAgICAqIEByZXR1cm5zIHtYWVNlcmllc31cclxuICAgICAqIEBtZW1iZXJvZiBYWVNlcmllc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY3JlYXRlKHNldHRpbmdzOiBJU2V0dGluZ3MsIHNlcmllc1Byb3ZpZGVyOiBJU2VyaWVzUHJvdmlkZXIpOiBYWVNlcmllc3tcclxuICAgICAgICAvLyBnZXQgaW5mbyBmcm9tIHBlcnNpc3RpbmdkYXRhXHJcbiAgICAgICAgbGV0IHNldHRpbmdzT2JqID0gU2V0dGluZ3MuY3JlYXRlKHNldHRpbmdzKTtcclxuICAgICAgICBsZXQgaWQ6IHN0cmluZyA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuU2VyaWVzSWQpO1xyXG4gICAgICAgIGxldCBuYW1lOiBzdHJpbmcgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShTZXR0aW5nSWRzLlNlcmllc05hbWUpO1xyXG4gICAgICAgIGxldCBjb2xvcjogc3RyaW5nID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoU2V0dGluZ0lkcy5TZXJpZXNDb2xvcik7XHJcbiAgICAgICAgbGV0IHNpZ25hbERhdGE6IElTZXR0aW5nc3x1bmRlZmluZWQgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShTZXR0aW5nSWRzLlNlcmllc1NpZ25hbERhdGEpO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgc2lnbmFsIHdpdGggdGhlIGdpdmVuIHNpZ25hbERhdGFcclxuICAgICAgICBsZXQgc2lnbmFsID0gdGhpcy5jcmVhdGVTaWduYWwoc2lnbmFsRGF0YSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gY3JlYXRlIHNlcmllcyB3aXRoIHRoZSBnaXZlbiBkYXRhXHJcbiAgICAgICAgbGV0IG5ld1hZU2VyaWVzID0gbmV3IFhZU2VyaWVzKHNpZ25hbCwgbmFtZSwgY29sb3IsIHNlcmllc1Byb3ZpZGVyLCBpZCk7XHJcblxyXG4gICAgICAgIC8vIHNldCBjYWxjdWxhdGlvbiBpbmZvcm1hdGlvbnMgaWYgYXZhaWxhYmxlXHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uRGF0YUluZm86IElTZXR0aW5nc3x1bmRlZmluZWQgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShTZXR0aW5nSWRzLlNlcmllc0NhbGN1bGF0aW9uRGF0YSk7XHJcbiAgICAgICAgaWYoY2FsY3VsYXRpb25EYXRhSW5mbyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBuZXdYWVNlcmllcy5jYWxjdWxhdGlvbkRhdGFJbmZvID0gbmV3IENhbGN1bGF0aW9uRGF0YUluZm8oKTtcclxuICAgICAgICAgICAgbmV3WFlTZXJpZXMuY2FsY3VsYXRpb25EYXRhSW5mby5zZXRTZXR0aW5ncyhjYWxjdWxhdGlvbkRhdGFJbmZvKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ld1hZU2VyaWVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgc2V0dGluZ3Mgb2YgdGhlIFhZU2VyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0lTZXR0aW5nc31cclxuICAgICAqIEBtZW1iZXJvZiBYWVNlcmllc1xyXG4gICAgICovXHJcbiAgICBnZXRTZXR0aW5ncygpOiBJU2V0dGluZ3N7XHJcbiAgICAgICAgbGV0IHNldHRpbmdzID0gc3VwZXIuZ2V0U2V0dGluZ3MoKTtcclxuICAgICAgICBzZXR0aW5ncy50eXBlID0gXCJYWVNlcmllc1wiO1xyXG4gICAgICAgIHJldHVybiBzZXR0aW5ncztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZXMgYW4gaW5pdGlhbCBsaW5lIHNpbXBsaWZpY2F0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJUG9pbnRbXX0gc2VyaWVzUG9pbnRzXHJcbiAgICAgKiBAbWVtYmVyb2YgWFlTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNpbXBsaWZ5U2lnbmFsKHNlcmllc1BvaW50czpJUG9pbnRbXSkge1xyXG5cclxuICAgICAgICBjb25zdCBsaW5lT3B0aW1pemF0aW9uID0gbmV3IFJEUCgpO1xyXG5cclxuICAgICAgICBjb25zdCB4VmFsdWVzID0gc2VyaWVzUG9pbnRzLm1hcCgocG9pbnQpPT57IHJldHVybiBwb2ludC54O30pO1xyXG4gICAgICAgIGxldCB5VmFsdWVzID0gc2VyaWVzUG9pbnRzLm1hcCgocG9pbnQpPT57IHJldHVybiBwb2ludC55O30pO1xyXG5cclxuICAgICAgICBjb25zdCB4TWluID0gTWF0aFgubWluKHhWYWx1ZXMpO1xyXG4gICAgICAgIGNvbnN0IHhNYXggPSBNYXRoWC5tYXgoeFZhbHVlcyk7XHJcbiAgICAgICAgY29uc3QgeU1pbiA9IE1hdGhYLm1pbih5VmFsdWVzKTtcclxuICAgICAgICBjb25zdCB5TWF4ID0gTWF0aFgubWF4KHlWYWx1ZXMpO1xyXG5cclxuICAgICAgICAvLyBjYWxjdWxhdGUgc2VyaWVzIHJhbmdlc1xyXG4gICAgICAgIGNvbnN0IHhSYW5nZSA9IHhNYXgteE1pbjtcclxuICAgICAgICBjb25zdCB5UmFuZ2UgPSB5TWF4LXlNaW47XHJcbiAgICAgICAgLy8gY2FsY3VsYXRlIHVuaXQgcGVyIHBpeGVsIHJhdGlvc1xyXG4gICAgICAgIGxldCB4UmF0aW8gPSB4UmFuZ2UvMTAwMDAgOyAgIFxyXG4gICAgICAgIGxldCB5UmF0aW8gPSB5UmFuZ2UvMTAwMDAgOyAgXHJcblxyXG4gICAgICAgIC8vIHRoZSB1bml0cy9waXhlbCByYXRpbyBtdXN0IG5vdCBiZSAwIFxyXG4gICAgICAgIHhSYXRpbyA9IHhSYXRpbyA+IDAgPyB4UmF0aW86IE51bWJlci5NSU5fVkFMVUUgOyAgIFxyXG4gICAgICAgIHlSYXRpbyA9IHlSYXRpbyA+IDAgPyB5UmF0aW86IE51bWJlci5NSU5fVkFMVUUgOyAgXHJcbiAgICAgICAgLy8gc2V0IHJlcXVpcmVkIHNpbXBsaWZpY2F0aW9uIHByZWNpc2lvblxyXG4gICAgICAgIGNvbnN0IHByZWNpc2lvbiA9IDE7XHJcbiBcclxuICAgICAgICAvLyBjcmVhdGUgY2hhcnQgcG9pbnRzIGZyb20gdGhlIHJhdyBwb2ludHNcclxuICAgICAgICBsZXQgcmF3UG9pbnRzID0gIHNlcmllc1BvaW50cy5tYXAoKHBvaW50LGkpPT57IHJldHVybiBuZXcgQ2hhcnRQb2ludChpLHRydWUsIHBvaW50LngsIHBvaW50LnkpOyB9KTtcclxuICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIHJlZHVjZWQgcG9pbnQgc2V0XHJcbiAgICAgICAgbGV0IHJlZHVjZWRTZXJpZXNQb2ludHMgPSBsaW5lT3B0aW1pemF0aW9uLnNpbXBsaWZ5KHJhd1BvaW50cyxwcmVjaXNpb24sIHhSYXRpbyx5UmF0aW8sIHRydWUpO1xyXG5cclxuICAgICAgICAvLyB1cGRhdGUgc2ltcGxpZmllZCBzZXJpZXMgdmlldyBwb2ludHMgYW5kIHJlZHVjdGlvbiByYXRpb3NcclxuICAgICAgICB0aGlzLmRhdGEgPSAgcmVkdWNlZFNlcmllc1BvaW50cztcclxuICAgICAgICAoPGFueT50aGlzLmRhdGEpLnBpeGVsUmF0aW9YID0geFJhdGlvO1xyXG4gICAgICAgICg8YW55PnRoaXMuZGF0YSkucGl4ZWxSYXRpb1kgPSB5UmF0aW87XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IG1heCBYIHZhbHVlIGZyb20gYSBzZXJpZVxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEByZXR1cm5zIHsobnVtYmVyIHwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBYWVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0TWF4WCgpOiBudW1iZXIgfCB1bmRlZmluZWR7XHJcbiAgICAgICAgbGV0IG1heFg7XHJcbiAgICAgICAgaWYgKHRoaXMucmF3UG9pbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMucmF3UG9pbnRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKG1heFggPT0gdW5kZWZpbmVkIHx8IHRoaXMucmF3UG9pbnRzW2ldLnggPiBtYXhYICl7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4WCA9IHRoaXMucmF3UG9pbnRzW2ldLnhcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWF4WDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBtaW4gWCB2YWx1ZSBmcm9tIGEgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7KG51bWJlciB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgWFlTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldE1pblgoKTogbnVtYmVyIHwgdW5kZWZpbmVke1xyXG4gICAgICAgIGxldCBtaW5YO1xyXG4gICAgICAgIGlmICh0aGlzLnJhd1BvaW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnJhd1BvaW50cy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBpZihtaW5YID09IHVuZGVmaW5lZCB8fCB0aGlzLnJhd1BvaW50c1tpXS54IDwgbWluWCApe1xyXG4gICAgICAgICAgICAgICAgICAgIG1pblggPSB0aGlzLnJhd1BvaW50c1tpXS54XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1pblg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSB0aW1lc3RhbXBzIGJhc2VvbiB0aGUgYXZhaWxhYmxlIHNlcmllc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgWFlTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVwZGF0ZVRpbWVzdGFtcHMoKSB7XHJcbiAgICAgICAgaWYodGhpcy5jYWxjdWxhdGlvbkRhdGFJbmZvICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhbGN1bGF0aW9uRGF0YUluZm8uaW5wdXREYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIC8vIHdlIHVzZSB0aGUgeCB2YWx1ZXMgZnJvbSB0aGUgaW5wdXQgMCBhcyB0aGUgdGltZXN0YW1wcyBzb3VyY2VcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RpbWVzdGFtcHMgPSB0aGlzLmNhbGN1bGF0aW9uRGF0YUluZm8uaW5wdXREYXRhWzBdLmdldERhdGEoKS5tYXAoKGlucHV0RGF0YVBvaW50KT0+eyByZXR1cm4gaW5wdXREYXRhUG9pbnQueH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCB3aGVuZXZlciB0aGUgc2VyaXMgZGF0YSBoYXMgY2hhbmdlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lQb2ludFtdfSBkYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgWFlTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG9uU2VyaWVEYXRhQ2hhbmdlZCggc2VyaWVzRGF0YTogSVBvaW50W10pIHtcclxuICAgICAgICBpZihzZXJpZXNEYXRhICYmIHNlcmllc0RhdGEubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2ltcGxpZnlTaWduYWwoc2VyaWVzRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG59Il19