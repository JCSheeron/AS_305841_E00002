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
define(["require", "exports", "../../models/chartManagerDataModel/chartManagerChart", "./BasicChart", "./cursor/CursorHandler", "../common/states/cursorType"], function (require, exports, chartManagerChart_1, BasicChart_1, CursorHandler_1, cursorType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FFTChart = /** @class */ (function (_super) {
        __extends(FFTChart, _super);
        function FFTChart(parentView, name, type, scales) {
            var _this = _super.call(this, parentView, name, scales) || this;
            _this.primaryXAxisName = "PrimaryFrequencyAxis";
            _this.primaryYAxisName = "Scale_1";
            _this.widgetName = name;
            _this.type = type;
            _this.addWidgetToView(parentView);
            return _this;
        }
        FFTChart.prototype.initializeCursorHandlers = function () {
            if (this.cursorHandler == undefined) {
                this.cursorHandler = new CursorHandler_1.CursorHandler(this.mainDiv, this.chart.getChartArea());
                this.cursorHandler.enableLineCursor = true;
                this.cursorHandler.enableCrosshairCursor = true;
            }
        };
        /**
         * Internal method for actually moving the cursors. Pass the x and y
         * position on the property and this method will figure out where to
         * place the cursors and update the states accordingly
         *
         * @protected
         * @param {number} x
         * @param {number} y
         * @returns
         * @memberof ChartBase
         */
        FFTChart.prototype.setCursor = function (x, y) {
            if (!this.series.length) {
                return;
            }
            this.cursorsStates.setLastCursorTypeSelected(cursorType_1.CursorType.frequencyDomain);
            var hoveredCursorIndex = this.cursorsStates.getHoveredCursorIndex();
            if (hoveredCursorIndex > -1) { // Set selected cursor when hovered cursor was found
                this.cursorsStates.setSelected(hoveredCursorIndex, true);
            }
            else {
                this.cursorsStates.setSelected(this.cursorsStates.getSelectedCursorIndex(), true);
            }
            this.updateSelectedCursor(x, y);
        };
        /**
         * Get min x value from all series in the chart
         *
         * @param {*} traceChartList
         * @returns {(number|undefined)}
         * @memberof FFTChart
         */
        FFTChart.prototype.getTotalMinX = function (traceChartList) {
            var minX = undefined;
            for (var i = 0; i < traceChartList.length; i++) {
                var chart = traceChartList[i];
                for (var j = 0; j < chart.series.length; j++) {
                    if (chart.series[j] !== undefined && chart.type == chartManagerChart_1.ChartType.FFTChart) {
                        if (minX == undefined || chart.series[j].minX < minX) {
                            minX = chart.series[j].minX;
                        }
                    }
                }
            }
            return minX;
        };
        /**
         * Get max x value from all series in the chart
         *
         * @param {*} traceChartList
         * @returns {(number|undefined)}
         * @memberof FFTChart
         */
        FFTChart.prototype.getTotalMaxX = function (traceChartList) {
            var maxX = undefined;
            for (var i = 0; i < traceChartList.length; i++) {
                var chart = traceChartList[i];
                for (var j = 0; j < chart.series.length; j++) {
                    if (chart.series[j] !== undefined && chart.type == chartManagerChart_1.ChartType.FFTChart) {
                        if (maxX == undefined || chart.series[j].maxX > maxX) {
                            maxX = chart.series[j].maxX;
                        }
                    }
                }
            }
            return maxX;
        };
        /**
         * Get used cursor states
         *
         * @protected
         * @returns {Array<ICursorState>}
         * @memberof FFTChart
         */
        FFTChart.prototype.getUsedCursorStates = function () {
            return this.cursorsStates.getFrequencyStates();
        };
        return FFTChart;
    }(BasicChart_1.BasicChart));
    exports.FFTChart = FFTChart;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRkZUQ2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY2hhcnRXaWRnZXQvRkZUQ2hhcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVFBO1FBQXVCLDRCQUFVO1FBTzdCLGtCQUFZLFVBQWtCLEVBQUUsSUFBWSxFQUFFLElBQWUsRUFBRSxNQUFlO1lBQTlFLFlBQ0ksa0JBQU0sVUFBVSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsU0FNbEM7WUFaRCxzQkFBZ0IsR0FBRyxzQkFBc0IsQ0FBQztZQUMxQyxzQkFBZ0IsR0FBRyxTQUFTLENBQUM7WUFPekIsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDdkIsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFFakIsS0FBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQzs7UUFDckMsQ0FBQztRQUVTLDJDQUF3QixHQUFsQztZQUNJLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxTQUFTLEVBQUM7Z0JBQ2hDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSw2QkFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO2dCQUNoRixJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztnQkFDM0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7YUFFbkQ7UUFDTCxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNPLDRCQUFTLEdBQW5CLFVBQW9CLENBQVMsRUFBRSxDQUFTO1lBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBQztnQkFDcEIsT0FBTzthQUNWO1lBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyx5QkFBeUIsQ0FBQyx1QkFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBRXpFLElBQUksa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQ3BFLElBQUksa0JBQWtCLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxvREFBb0Q7Z0JBQy9FLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzVEO2lCQUNJO2dCQUNELElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNyRjtZQUVELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEMsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLCtCQUFZLEdBQW5CLFVBQW9CLGNBQWM7WUFDOUIsSUFBSSxJQUFJLEdBQXFCLFNBQVMsQ0FBQTtZQUN0QyxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDMUMsSUFBSSxLQUFLLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUM3QixLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7b0JBQ3hDLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSw2QkFBUyxDQUFDLFFBQVEsRUFBQzt3QkFDbEUsSUFBSSxJQUFJLElBQUksU0FBUyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksRUFBQzs0QkFDakQsSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO3lCQUMvQjtxQkFDSjtpQkFDSjthQUNKO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLCtCQUFZLEdBQW5CLFVBQW9CLGNBQWM7WUFDOUIsSUFBSSxJQUFJLEdBQXFCLFNBQVMsQ0FBQTtZQUN0QyxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDMUMsSUFBSSxLQUFLLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUM3QixLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7b0JBQ3hDLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSw2QkFBUyxDQUFDLFFBQVEsRUFBQzt3QkFDbEUsSUFBSSxJQUFJLElBQUksU0FBUyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksRUFBQzs0QkFDakQsSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO3lCQUMvQjtxQkFDSjtpQkFDSjthQUNKO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNPLHNDQUFtQixHQUE3QjtZQUNJLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQ25ELENBQUM7UUFDTCxlQUFDO0lBQUQsQ0FBQyxBQTNHRCxDQUF1Qix1QkFBVSxHQTJHaEM7SUFFUSw0QkFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYXJ0VHlwZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2NoYXJ0TWFuYWdlckNoYXJ0XCI7XHJcbmltcG9ydCB7IFNjYWxlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvc2NhbGVcIjtcclxuaW1wb3J0IHsgQmFzaWNDaGFydCB9IGZyb20gXCIuL0Jhc2ljQ2hhcnRcIjtcclxuaW1wb3J0IHsgQ3Vyc29ySGFuZGxlciB9IGZyb20gXCIuL2N1cnNvci9DdXJzb3JIYW5kbGVyXCI7XHJcbmltcG9ydCB7IElWaWV3IH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL3ZpZXdJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUN1cnNvclN0YXRlIH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL2N1cnNvclN0YXRlSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEN1cnNvclR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL3N0YXRlcy9jdXJzb3JUeXBlXCI7XHJcblxyXG5jbGFzcyBGRlRDaGFydCBleHRlbmRzIEJhc2ljQ2hhcnR7XHJcblxyXG4gICAgcHJpbWFyeVhBeGlzTmFtZSA9IFwiUHJpbWFyeUZyZXF1ZW5jeUF4aXNcIjtcclxuICAgIHByaW1hcnlZQXhpc05hbWUgPSBcIlNjYWxlXzFcIjtcclxuXHJcbiAgICBjdXJzb3JIYW5kbGVyITogQ3Vyc29ySGFuZGxlclxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBhcmVudFZpZXcgOiBJVmlldywgbmFtZTogc3RyaW5nLCB0eXBlOiBDaGFydFR5cGUsIHNjYWxlczogU2NhbGVbXSkge1xyXG4gICAgICAgIHN1cGVyKHBhcmVudFZpZXcsIG5hbWUsIHNjYWxlcyk7XHJcblxyXG4gICAgICAgIHRoaXMud2lkZ2V0TmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRXaWRnZXRUb1ZpZXcocGFyZW50Vmlldyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRpYWxpemVDdXJzb3JIYW5kbGVycygpe1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnNvckhhbmRsZXIgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5jdXJzb3JIYW5kbGVyID0gbmV3IEN1cnNvckhhbmRsZXIodGhpcy5tYWluRGl2LCB0aGlzLmNoYXJ0LmdldENoYXJ0QXJlYSgpKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJzb3JIYW5kbGVyLmVuYWJsZUxpbmVDdXJzb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnNvckhhbmRsZXIuZW5hYmxlQ3Jvc3NoYWlyQ3Vyc29yID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW50ZXJuYWwgbWV0aG9kIGZvciBhY3R1YWxseSBtb3ZpbmcgdGhlIGN1cnNvcnMuIFBhc3MgdGhlIHggYW5kIHlcclxuICAgICAqIHBvc2l0aW9uIG9uIHRoZSBwcm9wZXJ0eSBhbmQgdGhpcyBtZXRob2Qgd2lsbCBmaWd1cmUgb3V0IHdoZXJlIHRvXHJcbiAgICAgKiBwbGFjZSB0aGUgY3Vyc29ycyBhbmQgdXBkYXRlIHRoZSBzdGF0ZXMgYWNjb3JkaW5nbHlcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHlcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBzZXRDdXJzb3IoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc2VyaWVzLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jdXJzb3JzU3RhdGVzLnNldExhc3RDdXJzb3JUeXBlU2VsZWN0ZWQoQ3Vyc29yVHlwZS5mcmVxdWVuY3lEb21haW4pO1xyXG5cclxuICAgICAgICBsZXQgaG92ZXJlZEN1cnNvckluZGV4ID0gdGhpcy5jdXJzb3JzU3RhdGVzLmdldEhvdmVyZWRDdXJzb3JJbmRleCgpO1xyXG4gICAgICAgIGlmIChob3ZlcmVkQ3Vyc29ySW5kZXggPiAtMSkgeyAvLyBTZXQgc2VsZWN0ZWQgY3Vyc29yIHdoZW4gaG92ZXJlZCBjdXJzb3Igd2FzIGZvdW5kXHJcbiAgICAgICAgICAgIHRoaXMuY3Vyc29yc1N0YXRlcy5zZXRTZWxlY3RlZChob3ZlcmVkQ3Vyc29ySW5kZXgsIHRydWUpO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3Vyc29yc1N0YXRlcy5zZXRTZWxlY3RlZCh0aGlzLmN1cnNvcnNTdGF0ZXMuZ2V0U2VsZWN0ZWRDdXJzb3JJbmRleCgpLCB0cnVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlU2VsZWN0ZWRDdXJzb3IoeCwgeSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgbWluIHggdmFsdWUgZnJvbSBhbGwgc2VyaWVzIGluIHRoZSBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gdHJhY2VDaGFydExpc3RcclxuICAgICAqIEByZXR1cm5zIHsobnVtYmVyfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgRkZUQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFRvdGFsTWluWCh0cmFjZUNoYXJ0TGlzdCkgOiBudW1iZXJ8dW5kZWZpbmVke1xyXG4gICAgICAgIGxldCBtaW5YOiBudW1iZXJ8dW5kZWZpbmVkID0gdW5kZWZpbmVkXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGNoYXJ0ID0gdHJhY2VDaGFydExpc3RbaV1cclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IGNoYXJ0LnNlcmllcy5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hhcnQuc2VyaWVzW2pdICE9PSB1bmRlZmluZWQgJiYgY2hhcnQudHlwZSA9PSBDaGFydFR5cGUuRkZUQ2hhcnQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtaW5YID09IHVuZGVmaW5lZCB8fCBjaGFydC5zZXJpZXNbal0ubWluWCA8IG1pblgpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5YID0gY2hhcnQuc2VyaWVzW2pdLm1pblg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtaW5YOyAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IG1heCB4IHZhbHVlIGZyb20gYWxsIHNlcmllcyBpbiB0aGUgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IHRyYWNlQ2hhcnRMaXN0XHJcbiAgICAgKiBAcmV0dXJucyB7KG51bWJlcnx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIEZGVENoYXJ0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRUb3RhbE1heFgodHJhY2VDaGFydExpc3QpOiBudW1iZXJ8dW5kZWZpbmVke1xyXG4gICAgICAgIGxldCBtYXhYOiBudW1iZXJ8dW5kZWZpbmVkID0gdW5kZWZpbmVkXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGNoYXJ0ID0gdHJhY2VDaGFydExpc3RbaV1cclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IGNoYXJ0LnNlcmllcy5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hhcnQuc2VyaWVzW2pdICE9PSB1bmRlZmluZWQgJiYgY2hhcnQudHlwZSA9PSBDaGFydFR5cGUuRkZUQ2hhcnQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXhYID09IHVuZGVmaW5lZCB8fCBjaGFydC5zZXJpZXNbal0ubWF4WCA+IG1heFgpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhYID0gY2hhcnQuc2VyaWVzW2pdLm1heFg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtYXhYOyAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB1c2VkIGN1cnNvciBzdGF0ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SUN1cnNvclN0YXRlPn1cclxuICAgICAqIEBtZW1iZXJvZiBGRlRDaGFydFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0VXNlZEN1cnNvclN0YXRlcygpOiBBcnJheTxJQ3Vyc29yU3RhdGU+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJzb3JzU3RhdGVzLmdldEZyZXF1ZW5jeVN0YXRlcygpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBGRlRDaGFydCB9O1xyXG5cclxuXHJcbiJdfQ==