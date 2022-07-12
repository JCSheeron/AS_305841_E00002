define(["require", "exports", "./scale", "../../common/persistence/settings", "./settingIds"], function (require, exports, scale_1, settings_1, settingIds_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartType;
    (function (ChartType) {
        ChartType[ChartType["YTChart"] = 0] = "YTChart";
        ChartType[ChartType["XYChart"] = 1] = "XYChart";
        ChartType[ChartType["FFTChart"] = 2] = "FFTChart";
    })(ChartType = exports.ChartType || (exports.ChartType = {}));
    var ChartManagerChart = /** @class */ (function () {
        /**
         * Creates an instance of ChartManagerChart.
         * @param {string} name
         * @param {ChartType} type
         * @memberof ChartManagerChart
         */
        function ChartManagerChart(name, type) {
            if (type === void 0) { type = ChartType.YTChart; }
            this.dropPossible = false;
            this.expandState = true;
            this.isGroup = true;
            this.nextUniqueScaleId = 1;
            this.name = name;
            this.chartType = type;
            this.description = "";
            this.childs = new Array();
            this.isDisabled = false;
        }
        Object.defineProperty(ChartManagerChart.prototype, "additionalInfo", {
            get: function () {
                switch (this.chartType) {
                    case ChartType.XYChart:
                        return 'XY';
                    case ChartType.YTChart:
                        return 'YT';
                    case ChartType.FFTChart:
                        return 'FFT';
                }
                return "";
            },
            enumerable: true,
            configurable: true
        });
        ChartManagerChart.prototype.getSettings = function () {
            var scales = this.getChilds();
            var scaleExport = new Array();
            scales.forEach(function (scale) {
                scaleExport.push(scale.getSettings());
            });
            var settings = new settings_1.Settings("Chart");
            settings.setValue(settingIds_1.SettingIds.ChartName, this.name);
            settings.setValue(settingIds_1.SettingIds.ChartType, this.chartType);
            settings.setValue(settingIds_1.SettingIds.ChartExpandState, this.expandState);
            settings.setValue(settingIds_1.SettingIds.ChartScales, scaleExport);
            return settings;
        };
        ChartManagerChart.prototype.setSettings = function (settings) {
            var settingsObj = settings_1.Settings.create(settings);
            this.name = settingsObj.getValue(settingIds_1.SettingIds.ChartName);
            this.chartType = settingsObj.getValue(settingIds_1.SettingIds.ChartType);
            this.expandState = settingsObj.getValue(settingIds_1.SettingIds.ChartExpandState);
        };
        ChartManagerChart.prototype.addDefaultYScale = function (dataModel) {
            // add default yAxis
            var yScale = new scale_1.Scale("Scale_1", this);
            var defaultXScaleRange = dataModel.getDefaultXScaleRangeByType(this.chartType);
            yScale.minXValue = defaultXScaleRange.min;
            yScale.maxXValue = defaultXScaleRange.max;
            //dataModel.addYScale(this, yScale);
            this.addYScale(yScale);
            yScale.eventDataChanged.attach(dataModel._scaleDataChangedHandler);
        };
        Object.defineProperty(ChartManagerChart.prototype, "iconDefinition", {
            /**
             * Returns the icon definition for this chart object
             *
             * @readonly
             * @type {string}
             * @memberof ChartManagerChart
             */
            get: function () {
                var iconDefinition = "";
                var classNames = "e-treegridcollapse treegridcollapse";
                // Add collapse/expand icon 
                if (this.expandState == true) {
                    classNames += "e-treegridexpand treegridexpand";
                }
                iconDefinition += "<div class='" + classNames + "'></div>";
                return iconDefinition;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Adds a serie to the given scale in this chart
         *
         * @param {Array<BaseSeries>} series
         * @param {Scale} scale
         * @memberof ChartManagerChart
         */
        ChartManagerChart.prototype.addSeries = function (series, scale) {
            if (scale !== undefined) {
                scale.addSeries(series);
            }
        };
        /**
         * Removes the serie from this chart(will be removed from child => YAxis)
         *
         * @param {BaseSeries} serie
         * @returns {boolean}
         * @memberof ChartManagerChart
         */
        ChartManagerChart.prototype.removeSerie = function (serie) {
            for (var i = 0; i < this.childs.length; i++) {
                var yAxis = this.childs[i];
                if (yAxis.removeSerie(serie)) {
                    return true;
                }
            }
            return false;
        };
        ChartManagerChart.prototype.canSeriesBeDropped = function (series, serieChartType, sameGroup) {
            if (serieChartType == this.chartType) {
                return true;
            }
            else if (series.length == 2 && sameGroup && this.chartType == ChartType.XYChart && serieChartType != ChartType.FFTChart) {
                return true;
            }
            else if (serieChartType == ChartType.YTChart && this.chartType == ChartType.FFTChart) {
                return true;
            }
            return false;
        };
        /**
         * Returns true if it is possible to add an other axis(current limit is 2 yAxis)
         *
         * @returns {boolean}
         * @memberof ChartManagerChart
         */
        ChartManagerChart.prototype.canAddYAxis = function () {
            var maxYAxisCount = 2;
            if (this.chartType == ChartType.XYChart) {
                maxYAxisCount = 1;
            }
            if (this.childs.length < maxYAxisCount) {
                return true;
            }
            return false;
        };
        /**
         * Returns false if there is only one yAxis available
         * There must always be one yAxis available; the last yAxis may not be deleted
         *
         * @memberof ChartManagerChart
         */
        ChartManagerChart.prototype.canRemoveYAxis = function () {
            var minYAxisCount = 1;
            if (this.childs.length <= minYAxisCount) {
                return false;
            }
            return true;
        };
        /**
         * Adds a new yAxis to the chart
         * Returns true if added else false
         *
         * @param {Scale} yAxis
         * @returns {boolean}
         * @memberof ChartManagerChart
         */
        ChartManagerChart.prototype.addYScale = function (yAxis) {
            if (this.canAddYAxis() == false) {
                // Not possible to add more yAxis(limit reached)
                return false;
            }
            this.childs.push(yAxis);
            this.nextUniqueScaleId++;
            return true;
        };
        /**
         * Removes a yAxis from the chart
         * Returns true if removed, else false-
         *
         * @param {Scale} yAxis
         * @returns {boolean}
         * @memberof ChartManagerChart
         */
        ChartManagerChart.prototype.removeYAxis = function (yAxis) {
            if (this.canRemoveYAxis() == false) {
                // There must always be one yAxis available; the last yAxis may not be deleted
                return false;
            }
            var index = -1;
            for (var j = 0; j < this.childs.length; j++) {
                if (this.childs[j] == yAxis) {
                    index = j;
                    break;
                }
            }
            if (index > -1) {
                this.childs.splice(index, 1);
                return true;
            }
            return false;
        };
        /**
         * Returns the name of the next scale, which is currently not in this chart
         *
         * @returns {string}
         * @memberof ChartManagerChart
         */
        ChartManagerChart.prototype.getNextYAxisId = function () {
            return "Scale_" + this.nextUniqueScaleId;
        };
        /**
         * Returns true if the given serie or its only child (FFT) is in the chart, else false
         *
         * @param {Array<BaseSeries>} serie
         * @returns {boolean}
         * @memberof ChartManagerChart
         */
        ChartManagerChart.prototype.hasSeries = function (series) {
            var seriesInChart = 0;
            for (var i = 0; i < this.childs.length; i++) {
                var yAxis = this.childs[i];
                //number of dropped series that are already in the chart 
                seriesInChart = seriesInChart + yAxis.numberOfMatchingSeries(series);
            }
            if (seriesInChart == series.length) {
                return true;
            }
            else {
                return false;
            }
        };
        /**
         * Returns true if the given serie is in the chart, else false
         *
         * @param {BaseSeries} serie
         * @returns
         * @memberof ChartManagerChart
         */
        ChartManagerChart.prototype.hasSerie = function (serie) {
            for (var i = 0; i < this.childs.length; i++) {
                var yAxis = this.childs[i];
                if (yAxis.hasSerie(serie)) {
                    return true;
                }
            }
            return false;
        };
        /**
         * Returns the yAxis object for the given yAxis name
         *
         * @param {string} yAxisId
         * @returns {(Scale|undefined)}
         * @memberof ChartManagerChart
         */
        ChartManagerChart.prototype.getYScale = function (yAxisId) {
            for (var i = 0; i < this.childs.length; i++) {
                if (this.childs[i].id == yAxisId) {
                    return this.childs[i];
                }
            }
            return undefined;
        };
        /**
         * Returns the yAxis object for the given serie
         *
         * @param {BaseSeries} serie
         * @returns {(Scale|undefined)}
         * @memberof ChartManagerChart
         */
        ChartManagerChart.prototype.getYAxisForSerie = function (serie) {
            for (var i = 0; i < this.childs.length; i++) {
                for (var j = 0; j < this.childs[i].childs.length; j++) {
                    if (this.childs[i].childs[j] == serie) {
                        return this.childs[i];
                    }
                }
            }
            return undefined;
        };
        /**
         * Returns the id of the first yAxis
         *
         * @returns {string}
         * @memberof ChartManagerChart
         */
        ChartManagerChart.prototype.getDefaultYAxisId = function () {
            return this.childs[0].id;
        };
        /**
         * Returns all childs of this chart(e.g. yAxis)
         *
         * @returns
         * @memberof ChartManagerChart
         */
        ChartManagerChart.prototype.getChilds = function () {
            var yAxis = [];
            for (var i = 0; i < this.childs.length; i++) {
                yAxis.push(this.childs[i]);
            }
            return yAxis;
        };
        /**
         * Returns some additional infos which would be shown in the second column in the chartmanager
         *
         * @returns
         * @memberof ChartManagerChart
         */
        ChartManagerChart.prototype.getAdditionalInfo = function () {
            var value;
            switch (this.chartType) {
                case ChartType.XYChart:
                    value = 'XY';
                    break;
                case ChartType.YTChart:
                    value = 'YT';
                    break;
                case ChartType.FFTChart:
                    value = 'FFT';
                    break;
            }
            return value;
        };
        /**
         * Sets the chart disabled or enabled
         *
         * @param {boolean} disabled
         * @memberof ChartManagerChart
         */
        ChartManagerChart.prototype.setDisabled = function (disabled) {
            this.isDisabled = disabled;
        };
        ChartManagerChart.prototype.getAllSeries = function () {
            var series = new Array();
            for (var i = 0; i < this.childs.length; i++) {
                var yAxis = this.childs[i];
                for (var j = 0; j < yAxis.childs.length; j++) {
                    series.push(yAxis.childs[j]);
                }
            }
            return series;
        };
        return ChartManagerChart;
    }());
    exports.ChartManagerChart = ChartManagerChart;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRNYW5hZ2VyQ2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvY2hhcnRNYW5hZ2VyQ2hhcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBUUEsSUFBWSxTQUlYO0lBSkQsV0FBWSxTQUFTO1FBQ2pCLCtDQUFPLENBQUE7UUFDUCwrQ0FBTyxDQUFBO1FBQ1AsaURBQVEsQ0FBQTtJQUNaLENBQUMsRUFKVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQUlwQjtJQUVEO1FBd0JJOzs7OztXQUtHO1FBQ0gsMkJBQVksSUFBWSxFQUFFLElBQW1DO1lBQW5DLHFCQUFBLEVBQUEsT0FBa0IsU0FBUyxDQUFDLE9BQU87WUF4QjdELGlCQUFZLEdBQVksS0FBSyxDQUFDO1lBQzlCLGdCQUFXLEdBQVksSUFBSSxDQUFDO1lBQzVCLFlBQU8sR0FBWSxJQUFJLENBQUM7WUFjaEIsc0JBQWlCLEdBQVUsQ0FBQyxDQUFDO1lBU2pDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQVMsQ0FBQztZQUNqQyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUM1QixDQUFDO1FBMUJELHNCQUFXLDZDQUFjO2lCQUF6QjtnQkFDSSxRQUFRLElBQUksQ0FBQyxTQUFTLEVBQUU7b0JBQ3BCLEtBQUssU0FBUyxDQUFDLE9BQU87d0JBQ2xCLE9BQU8sSUFBSSxDQUFDO29CQUNoQixLQUFLLFNBQVMsQ0FBQyxPQUFPO3dCQUNsQixPQUFPLElBQUksQ0FBQztvQkFDaEIsS0FBSyxTQUFTLENBQUMsUUFBUTt3QkFDbkIsT0FBTyxLQUFLLENBQUM7aUJB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QUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDO1FBQ0wsd0JBQUM7SUFBRCxDQUFDLEFBeldELElBeVdDO0lBeldZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDaGFydE1hbmFnZXJDaGFydCB9IGZyb20gXCIuL2ludGVyZmFjZXMvY2hhcnRNYW5hZ2VyQ2hhcnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi9jb21tb24vc2VyaWVzL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgU2NhbGUgfSBmcm9tIFwiLi9zY2FsZVwiO1xyXG5pbXBvcnQgeyBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsIH0gZnJvbSBcIi4uL2RhdGFNb2RlbHNcIjtcclxuaW1wb3J0IHsgSVNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9pbnRlcmZhY2VzL3NldHRpbmdzSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBTZXR0aW5nSWRzIH0gZnJvbSBcIi4vc2V0dGluZ0lkc1wiO1xyXG5cclxuZXhwb3J0IGVudW0gQ2hhcnRUeXBle1xyXG4gICAgWVRDaGFydCxcclxuICAgIFhZQ2hhcnQsXHJcbiAgICBGRlRDaGFydFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hhcnRNYW5hZ2VyQ2hhcnQgaW1wbGVtZW50cyBJQ2hhcnRNYW5hZ2VyQ2hhcnR7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBjaGFydFR5cGU6IENoYXJ0VHlwZTtcclxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgICBjaGlsZHM6IFNjYWxlW107XHJcbiAgICBpc0Rpc2FibGVkOiBib29sZWFuO1xyXG4gICAgZHJvcFBvc3NpYmxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBleHBhbmRTdGF0ZTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBpc0dyb3VwOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IGFkZGl0aW9uYWxJbmZvKCk6IHN0cmluZyB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLmNoYXJ0VHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIENoYXJ0VHlwZS5YWUNoYXJ0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdYWSc7XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRUeXBlLllUQ2hhcnQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ1lUJztcclxuICAgICAgICAgICAgY2FzZSBDaGFydFR5cGUuRkZUQ2hhcnQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ0ZGVCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbmV4dFVuaXF1ZVNjYWxlSWQ6bnVtYmVyID0gMTtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIENoYXJ0TWFuYWdlckNoYXJ0LlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEBwYXJhbSB7Q2hhcnRUeXBlfSB0eXBlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyQ2hhcnRcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCB0eXBlOiBDaGFydFR5cGUgPSBDaGFydFR5cGUuWVRDaGFydCl7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmNoYXJ0VHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5jaGlsZHMgPSBuZXcgQXJyYXk8U2NhbGU+KCk7XHJcbiAgICAgICAgdGhpcy5pc0Rpc2FibGVkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2V0dGluZ3MoKTogSVNldHRpbmdze1xyXG4gICAgICAgIGxldCBzY2FsZXMgPSB0aGlzLmdldENoaWxkcygpO1xyXG4gICAgICAgIGxldCBzY2FsZUV4cG9ydCA9IG5ldyBBcnJheTxJU2V0dGluZ3M+KCk7XHJcbiAgICAgICAgc2NhbGVzLmZvckVhY2goc2NhbGUgPT57XHJcbiAgICAgICAgICAgIHNjYWxlRXhwb3J0LnB1c2goc2NhbGUuZ2V0U2V0dGluZ3MoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IHNldHRpbmdzID0gbmV3IFNldHRpbmdzKFwiQ2hhcnRcIik7XHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5DaGFydE5hbWUsIHRoaXMubmFtZSk7XHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5DaGFydFR5cGUsIHRoaXMuY2hhcnRUeXBlKTtcclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLkNoYXJ0RXhwYW5kU3RhdGUsIHRoaXMuZXhwYW5kU3RhdGUpXHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5DaGFydFNjYWxlcywgc2NhbGVFeHBvcnQpO1xyXG4gICAgICAgIHJldHVybiBzZXR0aW5ncztcclxuICAgIH1cclxuXHJcbiAgICBzZXRTZXR0aW5ncyhzZXR0aW5nczogSVNldHRpbmdzKXtcclxuICAgICAgICBsZXQgc2V0dGluZ3NPYmogPSBTZXR0aW5ncy5jcmVhdGUoc2V0dGluZ3MpO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuQ2hhcnROYW1lKTtcclxuICAgICAgICB0aGlzLmNoYXJ0VHlwZSA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuQ2hhcnRUeXBlKTtcclxuICAgICAgICB0aGlzLmV4cGFuZFN0YXRlID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoU2V0dGluZ0lkcy5DaGFydEV4cGFuZFN0YXRlKTsgICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBhZGREZWZhdWx0WVNjYWxlKGRhdGFNb2RlbDogSUNoYXJ0TWFuYWdlckRhdGFNb2RlbCl7XHJcbiAgICAgICAgLy8gYWRkIGRlZmF1bHQgeUF4aXNcclxuICAgICAgICBsZXQgeVNjYWxlID0gbmV3IFNjYWxlKFwiU2NhbGVfMVwiLCB0aGlzKTtcclxuICAgICAgICBsZXQgZGVmYXVsdFhTY2FsZVJhbmdlID0gZGF0YU1vZGVsLmdldERlZmF1bHRYU2NhbGVSYW5nZUJ5VHlwZSh0aGlzLmNoYXJ0VHlwZSk7XHJcbiAgICAgICAgeVNjYWxlLm1pblhWYWx1ZSA9IGRlZmF1bHRYU2NhbGVSYW5nZS5taW47XHJcbiAgICAgICAgeVNjYWxlLm1heFhWYWx1ZSA9IGRlZmF1bHRYU2NhbGVSYW5nZS5tYXg7XHJcbiAgICAgICAgLy9kYXRhTW9kZWwuYWRkWVNjYWxlKHRoaXMsIHlTY2FsZSk7XHJcbiAgICAgICAgdGhpcy5hZGRZU2NhbGUoeVNjYWxlKTtcclxuICAgICAgICB5U2NhbGUuZXZlbnREYXRhQ2hhbmdlZC5hdHRhY2goZGF0YU1vZGVsLl9zY2FsZURhdGFDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpY29uIGRlZmluaXRpb24gZm9yIHRoaXMgY2hhcnQgb2JqZWN0XHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlckNoYXJ0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgaWNvbkRlZmluaXRpb24oKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgaWNvbkRlZmluaXRpb24gPSBcIlwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBjbGFzc05hbWVzID0gXCJlLXRyZWVncmlkY29sbGFwc2UgdHJlZWdyaWRjb2xsYXBzZVwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEFkZCBjb2xsYXBzZS9leHBhbmQgaWNvbiBcclxuICAgICAgICBpZih0aGlzLmV4cGFuZFN0YXRlID09IHRydWUpe1xyXG4gICAgICAgICAgICBjbGFzc05hbWVzICs9IFwiZS10cmVlZ3JpZGV4cGFuZCB0cmVlZ3JpZGV4cGFuZFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpY29uRGVmaW5pdGlvbiArPSBgPGRpdiBjbGFzcz0nYCArIGNsYXNzTmFtZXMgKyBgJz48L2Rpdj5gO1xyXG4gICAgICAgIHJldHVybiBpY29uRGVmaW5pdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBzZXJpZSB0byB0aGUgZ2l2ZW4gc2NhbGUgaW4gdGhpcyBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8QmFzZVNlcmllcz59IHNlcmllc1xyXG4gICAgICogQHBhcmFtIHtTY2FsZX0gc2NhbGVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJDaGFydFxyXG4gICAgICovXHJcbiAgICBhZGRTZXJpZXMoc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPiwgc2NhbGUgOiBTY2FsZSl7XHJcbiAgICAgICAgaWYgKHNjYWxlICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBzY2FsZS5hZGRTZXJpZXMoc2VyaWVzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIHRoZSBzZXJpZSBmcm9tIHRoaXMgY2hhcnQod2lsbCBiZSByZW1vdmVkIGZyb20gY2hpbGQgPT4gWUF4aXMpXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlU2VyaWUoc2VyaWU6IEJhc2VTZXJpZXMpOiBib29sZWFue1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCB5QXhpcyA9IHRoaXMuY2hpbGRzW2ldO1xyXG4gICAgICAgICAgICBpZiAoeUF4aXMucmVtb3ZlU2VyaWUoc2VyaWUpKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgY2FuU2VyaWVzQmVEcm9wcGVkKHNlcmllczogQXJyYXk8QmFzZVNlcmllcz4sIHNlcmllQ2hhcnRUeXBlOiBDaGFydFR5cGUsIHNhbWVHcm91cDogYm9vbGVhbik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChzZXJpZUNoYXJ0VHlwZSA9PSB0aGlzLmNoYXJ0VHlwZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoc2VyaWVzLmxlbmd0aCA9PSAyICYmIHNhbWVHcm91cCAmJiB0aGlzLmNoYXJ0VHlwZSA9PSBDaGFydFR5cGUuWFlDaGFydCAmJiBzZXJpZUNoYXJ0VHlwZSAhPSBDaGFydFR5cGUuRkZUQ2hhcnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHNlcmllQ2hhcnRUeXBlID09IENoYXJ0VHlwZS5ZVENoYXJ0ICYmIHRoaXMuY2hhcnRUeXBlID09IENoYXJ0VHlwZS5GRlRDaGFydCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIGl0IGlzIHBvc3NpYmxlIHRvIGFkZCBhbiBvdGhlciBheGlzKGN1cnJlbnQgbGltaXQgaXMgMiB5QXhpcylcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJDaGFydFxyXG4gICAgICovXHJcbiAgICBjYW5BZGRZQXhpcygpOiBib29sZWFue1xyXG4gICAgICAgIGxldCBtYXhZQXhpc0NvdW50OiBudW1iZXIgPSAyO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuY2hhcnRUeXBlID09IENoYXJ0VHlwZS5YWUNoYXJ0KSB7XHJcbiAgICAgICAgICAgIG1heFlBeGlzQ291bnQgPSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5jaGlsZHMubGVuZ3RoIDwgbWF4WUF4aXNDb3VudCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgZmFsc2UgaWYgdGhlcmUgaXMgb25seSBvbmUgeUF4aXMgYXZhaWxhYmxlXHJcbiAgICAgKiBUaGVyZSBtdXN0IGFsd2F5cyBiZSBvbmUgeUF4aXMgYXZhaWxhYmxlOyB0aGUgbGFzdCB5QXhpcyBtYXkgbm90IGJlIGRlbGV0ZWRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyQ2hhcnRcclxuICAgICAqL1xyXG4gICAgY2FuUmVtb3ZlWUF4aXMoKTogYm9vbGVhbntcclxuICAgICAgICBsZXQgbWluWUF4aXNDb3VudDogbnVtYmVyID0gMTtcclxuICAgICAgICBpZih0aGlzLmNoaWxkcy5sZW5ndGggPD0gbWluWUF4aXNDb3VudCl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgbmV3IHlBeGlzIHRvIHRoZSBjaGFydFxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIGFkZGVkIGVsc2UgZmFsc2VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1NjYWxlfSB5QXhpc1xyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyQ2hhcnRcclxuICAgICAqL1xyXG4gICAgYWRkWVNjYWxlKHlBeGlzOiBTY2FsZSk6IGJvb2xlYW57XHJcbiAgICAgICAgaWYodGhpcy5jYW5BZGRZQXhpcygpID09IGZhbHNlKXtcclxuICAgICAgICAgICAgLy8gTm90IHBvc3NpYmxlIHRvIGFkZCBtb3JlIHlBeGlzKGxpbWl0IHJlYWNoZWQpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jaGlsZHMucHVzaCh5QXhpcyk7XHJcbiAgICAgICAgdGhpcy5uZXh0VW5pcXVlU2NhbGVJZCsrO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBhIHlBeGlzIGZyb20gdGhlIGNoYXJ0XHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgcmVtb3ZlZCwgZWxzZSBmYWxzZS1cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1NjYWxlfSB5QXhpc1xyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlWUF4aXMoeUF4aXM6IFNjYWxlKTogYm9vbGVhbntcclxuICAgICAgICBpZih0aGlzLmNhblJlbW92ZVlBeGlzKCkgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAvLyBUaGVyZSBtdXN0IGFsd2F5cyBiZSBvbmUgeUF4aXMgYXZhaWxhYmxlOyB0aGUgbGFzdCB5QXhpcyBtYXkgbm90IGJlIGRlbGV0ZWRcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaW5kZXggPSAtMTtcclxuICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgdGhpcy5jaGlsZHMubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICBpZih0aGlzLmNoaWxkc1tqXSA9PSB5QXhpcyl7XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IGo7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLmNoaWxkcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgbmFtZSBvZiB0aGUgbmV4dCBzY2FsZSwgd2hpY2ggaXMgY3VycmVudGx5IG5vdCBpbiB0aGlzIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJDaGFydFxyXG4gICAgICovXHJcbiAgICBnZXROZXh0WUF4aXNJZCgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIFwiU2NhbGVfXCIgKyB0aGlzLm5leHRVbmlxdWVTY2FsZUlkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBzZXJpZSBvciBpdHMgb25seSBjaGlsZCAoRkZUKSBpcyBpbiB0aGUgY2hhcnQsIGVsc2UgZmFsc2UgXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxCYXNlU2VyaWVzPn0gc2VyaWVcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlckNoYXJ0XHJcbiAgICAgKi9cclxuICAgIGhhc1NlcmllcyhzZXJpZXM6IEFycmF5PEJhc2VTZXJpZXM+KTogYm9vbGVhbntcclxuICAgICAgICBsZXQgc2VyaWVzSW5DaGFydDogbnVtYmVyID0gMDtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgeUF4aXMgPSB0aGlzLmNoaWxkc1tpXTtcclxuICAgICAgICAgICAgLy9udW1iZXIgb2YgZHJvcHBlZCBzZXJpZXMgdGhhdCBhcmUgYWxyZWFkeSBpbiB0aGUgY2hhcnQgXHJcbiAgICAgICAgICAgIHNlcmllc0luQ2hhcnQgPSBzZXJpZXNJbkNoYXJ0ICsgeUF4aXMubnVtYmVyT2ZNYXRjaGluZ1NlcmllcyhzZXJpZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2VyaWVzSW5DaGFydCA9PSBzZXJpZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gc2VyaWUgaXMgaW4gdGhlIGNoYXJ0LCBlbHNlIGZhbHNlIFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyQ2hhcnRcclxuICAgICAqL1xyXG4gICAgaGFzU2VyaWUoc2VyaWU6IEJhc2VTZXJpZXMpOiBib29sZWFuIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgeUF4aXMgPSB0aGlzLmNoaWxkc1tpXTtcclxuICAgICAgICAgICAgaWYgKHlBeGlzLmhhc1NlcmllKHNlcmllKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgeUF4aXMgb2JqZWN0IGZvciB0aGUgZ2l2ZW4geUF4aXMgbmFtZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB5QXhpc0lkXHJcbiAgICAgKiBAcmV0dXJucyB7KFNjYWxlfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyQ2hhcnRcclxuICAgICAqL1xyXG4gICAgZ2V0WVNjYWxlKHlBeGlzSWQ6IHN0cmluZyk6IFNjYWxlfHVuZGVmaW5lZHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZih0aGlzLmNoaWxkc1tpXS5pZCA9PSB5QXhpc0lkKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNoaWxkc1tpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgeUF4aXMgb2JqZWN0IGZvciB0aGUgZ2l2ZW4gc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICAgKiBAcmV0dXJucyB7KFNjYWxlfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyQ2hhcnRcclxuICAgICAqL1xyXG4gICAgZ2V0WUF4aXNGb3JTZXJpZShzZXJpZSA6IEJhc2VTZXJpZXMpOiBTY2FsZXx1bmRlZmluZWR7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IHRoaXMuY2hpbGRzW2ldLmNoaWxkcy5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNoaWxkc1tpXS5jaGlsZHNbal0gPT0gc2VyaWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNoaWxkc1tpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgaWQgb2YgdGhlIGZpcnN0IHlBeGlzIFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyQ2hhcnRcclxuICAgICAqL1xyXG4gICAgZ2V0RGVmYXVsdFlBeGlzSWQoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNoaWxkc1swXS5pZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYWxsIGNoaWxkcyBvZiB0aGlzIGNoYXJ0KGUuZy4geUF4aXMpXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJDaGFydFxyXG4gICAgICovXHJcbiAgICBnZXRDaGlsZHMoKSB7XHJcbiAgICAgICAgbGV0IHlBeGlzOiBTY2FsZVtdID0gW107XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgeUF4aXMucHVzaCh0aGlzLmNoaWxkc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB5QXhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgc29tZSBhZGRpdGlvbmFsIGluZm9zIHdoaWNoIHdvdWxkIGJlIHNob3duIGluIHRoZSBzZWNvbmQgY29sdW1uIGluIHRoZSBjaGFydG1hbmFnZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlckNoYXJ0XHJcbiAgICAgKi9cclxuICAgIGdldEFkZGl0aW9uYWxJbmZvKCkge1xyXG4gICAgICAgIGxldCB2YWx1ZTtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuY2hhcnRUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRUeXBlLlhZQ2hhcnQ6XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9ICdYWSc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDaGFydFR5cGUuWVRDaGFydDpcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gJ1lUJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENoYXJ0VHlwZS5GRlRDaGFydDpcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gJ0ZGVCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgY2hhcnQgZGlzYWJsZWQgb3IgZW5hYmxlZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZGlzYWJsZWRcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJDaGFydFxyXG4gICAgICovXHJcbiAgICBzZXREaXNhYmxlZChkaXNhYmxlZDogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5pc0Rpc2FibGVkID0gZGlzYWJsZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QWxsU2VyaWVzKCk6IEFycmF5PEJhc2VTZXJpZXM+e1xyXG4gICAgICAgIGxldCBzZXJpZXMgPSBuZXcgQXJyYXk8QmFzZVNlcmllcz4oKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgeUF4aXMgPSB0aGlzLmNoaWxkc1tpXTtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IHlBeGlzLmNoaWxkcy5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgICAgICBzZXJpZXMucHVzaCh5QXhpcy5jaGlsZHNbal0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXJpZXM7XHJcbiAgICB9XHJcbn0iXX0=