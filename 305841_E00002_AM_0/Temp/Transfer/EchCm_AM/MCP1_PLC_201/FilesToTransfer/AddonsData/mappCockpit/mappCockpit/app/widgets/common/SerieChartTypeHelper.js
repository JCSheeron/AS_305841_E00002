define(["require", "exports", "../../models/chartManagerDataModel/chartManagerChart", "../../models/common/series/seriesType"], function (require, exports, chartManagerChart_1, seriesType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SerieChartTypeHelper = /** @class */ (function () {
        function SerieChartTypeHelper() {
        }
        SerieChartTypeHelper.getSerieChartType = function (type) {
            if (type == seriesType_1.SeriesType.timeSeries) {
                return chartManagerChart_1.ChartType.YTChart;
            }
            else if (type == seriesType_1.SeriesType.xySeries) {
                return chartManagerChart_1.ChartType.XYChart;
            }
            else {
                return chartManagerChart_1.ChartType.FFTChart;
            }
        };
        SerieChartTypeHelper.setDropPossibleAreas = function (chart, series, serieChartType, sameGroup) {
            if (!chart.hasSeries(series) && chart.canSeriesBeDropped(series, serieChartType, sameGroup)) {
                chart.childs.forEach(function (yAxis) {
                    yAxis.dropPossible = true;
                });
                //Not possible to drop serie in chart name if is XY chart
                if (chart.canAddYAxis() && chart.chartType != chartManagerChart_1.ChartType.XYChart) {
                    chart.dropPossible = true;
                }
            }
        };
        /**
         * Return series that will be added
         *
         * @param {Array<BaseSeries>} seriesInChart
         * @param {Array<BaseSeries>} droppedSeries
         * @returns {Array<BaseSeries>}
         * @memberof ChartManagerWidget
         */
        SerieChartTypeHelper.getDroppableSeries = function (seriesInChart, droppedSeries) {
            for (var i = 0; i < seriesInChart.length; i++) {
                for (var j = 0; j < droppedSeries.length; j++) {
                    if (seriesInChart[i] == droppedSeries[j]) {
                        droppedSeries.splice(j, 1);
                        break;
                    }
                    //Check calculated input data for FFT charts if YT signals are dragged
                    if (seriesInChart[i].type == seriesType_1.SeriesType.fftSeries && droppedSeries[j].type == seriesType_1.SeriesType.timeSeries) {
                        var inputSerieId = undefined;
                        var calculationDataInfo = seriesInChart[i].calculationDataInfo;
                        if (calculationDataInfo != undefined) {
                            inputSerieId = calculationDataInfo.inputSeriesIds[0];
                        }
                        if (inputSerieId == droppedSeries[j].id) {
                            droppedSeries.splice(j, 1);
                            break;
                        }
                    }
                }
            }
            return droppedSeries;
        };
        return SerieChartTypeHelper;
    }());
    exports.SerieChartTypeHelper = SerieChartTypeHelper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VyaWVDaGFydFR5cGVIZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29tbW9uL1NlcmllQ2hhcnRUeXBlSGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUtBO1FBQUE7UUF5REEsQ0FBQztRQXZEaUIsc0NBQWlCLEdBQS9CLFVBQWdDLElBQWdCO1lBQzVDLElBQUksSUFBSSxJQUFJLHVCQUFVLENBQUMsVUFBVSxFQUFFO2dCQUMvQixPQUFPLDZCQUFTLENBQUMsT0FBTyxDQUFDO2FBQzVCO2lCQUFNLElBQUksSUFBSSxJQUFJLHVCQUFVLENBQUMsUUFBUSxFQUFFO2dCQUNwQyxPQUFPLDZCQUFTLENBQUMsT0FBTyxDQUFDO2FBQzVCO2lCQUFNO2dCQUNILE9BQU8sNkJBQVMsQ0FBQyxRQUFRLENBQUM7YUFDN0I7UUFDTCxDQUFDO1FBRWEseUNBQW9CLEdBQWxDLFVBQW1DLEtBQXlCLEVBQUUsTUFBeUIsRUFBRSxjQUF5QixFQUFFLFNBQWtCO1lBRWxJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsY0FBYyxFQUFFLFNBQVMsQ0FBQyxFQUFFO2dCQUN6RixLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUs7b0JBQ3RCLEtBQUssQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO2dCQUM5QixDQUFDLENBQUMsQ0FBQTtnQkFDRix5REFBeUQ7Z0JBQ3pELElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRSxJQUFJLEtBQUssQ0FBQyxTQUFTLElBQUksNkJBQVMsQ0FBQyxPQUFPLEVBQUU7b0JBQzdELEtBQUssQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO2lCQUM3QjthQUNKO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDVyx1Q0FBa0IsR0FBaEMsVUFBaUMsYUFBZ0MsRUFBRSxhQUFnQztZQUMvRixLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDMUMsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzFDLElBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBQzt3QkFDcEMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQzNCLE1BQU07cUJBQ1Q7b0JBRUQsc0VBQXNFO29CQUN0RSxJQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksdUJBQVUsQ0FBQyxTQUFTLElBQUksYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSx1QkFBVSxDQUFDLFVBQVUsRUFBRTt3QkFDaEcsSUFBSSxZQUFZLEdBQXFCLFNBQVMsQ0FBQzt3QkFDL0MsSUFBSSxtQkFBbUIsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUM7d0JBQy9ELElBQUcsbUJBQW1CLElBQUksU0FBUyxFQUFDOzRCQUNoQyxZQUFZLEdBQUcsbUJBQW1CLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUN4RDt3QkFDRCxJQUFHLFlBQVksSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFDOzRCQUNuQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs0QkFDM0IsTUFBTTt5QkFDVDtxQkFDSjtpQkFDSjthQUNKO1lBQ0QsT0FBTyxhQUFhLENBQUM7UUFDekIsQ0FBQztRQUNMLDJCQUFDO0lBQUQsQ0FBQyxBQXpERCxJQXlEQztJQXpEWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vc2VyaWVzL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgQ2hhcnRUeXBlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvY2hhcnRNYW5hZ2VyQ2hhcnRcIjtcclxuaW1wb3J0IHsgSUNoYXJ0TWFuYWdlckNoYXJ0IH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvaW50ZXJmYWNlcy9jaGFydE1hbmFnZXJDaGFydEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTZXJpZXNUeXBlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vc2VyaWVzL3Nlcmllc1R5cGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTZXJpZUNoYXJ0VHlwZUhlbHBlciB7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRTZXJpZUNoYXJ0VHlwZSh0eXBlOiBTZXJpZXNUeXBlKTogQ2hhcnRUeXBlIHtcclxuICAgICAgICBpZiAodHlwZSA9PSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIENoYXJ0VHlwZS5ZVENoYXJ0O1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PSBTZXJpZXNUeXBlLnh5U2VyaWVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBDaGFydFR5cGUuWFlDaGFydDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gQ2hhcnRUeXBlLkZGVENoYXJ0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHNldERyb3BQb3NzaWJsZUFyZWFzKGNoYXJ0OiBJQ2hhcnRNYW5hZ2VyQ2hhcnQsIHNlcmllczogQXJyYXk8QmFzZVNlcmllcz4sIHNlcmllQ2hhcnRUeXBlOiBDaGFydFR5cGUsIHNhbWVHcm91cDogYm9vbGVhbikge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICghY2hhcnQuaGFzU2VyaWVzKHNlcmllcykgJiYgY2hhcnQuY2FuU2VyaWVzQmVEcm9wcGVkKHNlcmllcywgc2VyaWVDaGFydFR5cGUsIHNhbWVHcm91cCkpIHtcclxuICAgICAgICAgICAgY2hhcnQuY2hpbGRzLmZvckVhY2goeUF4aXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgeUF4aXMuZHJvcFBvc3NpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy9Ob3QgcG9zc2libGUgdG8gZHJvcCBzZXJpZSBpbiBjaGFydCBuYW1lIGlmIGlzIFhZIGNoYXJ0XHJcbiAgICAgICAgICAgIGlmIChjaGFydC5jYW5BZGRZQXhpcygpICYmIGNoYXJ0LmNoYXJ0VHlwZSAhPSBDaGFydFR5cGUuWFlDaGFydCkge1xyXG4gICAgICAgICAgICAgICAgY2hhcnQuZHJvcFBvc3NpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiBzZXJpZXMgdGhhdCB3aWxsIGJlIGFkZGVkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxCYXNlU2VyaWVzPn0gc2VyaWVzSW5DaGFydFxyXG4gICAgICogQHBhcmFtIHtBcnJheTxCYXNlU2VyaWVzPn0gZHJvcHBlZFNlcmllc1xyXG4gICAgICogQHJldHVybnMge0FycmF5PEJhc2VTZXJpZXM+fVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldERyb3BwYWJsZVNlcmllcyhzZXJpZXNJbkNoYXJ0OiBBcnJheTxCYXNlU2VyaWVzPiwgZHJvcHBlZFNlcmllczogQXJyYXk8QmFzZVNlcmllcz4pOiBBcnJheTxCYXNlU2VyaWVzPntcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2VyaWVzSW5DaGFydC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgZHJvcHBlZFNlcmllcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYoc2VyaWVzSW5DaGFydFtpXSA9PSBkcm9wcGVkU2VyaWVzW2pdKXtcclxuICAgICAgICAgICAgICAgICAgICBkcm9wcGVkU2VyaWVzLnNwbGljZShqLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy9DaGVjayBjYWxjdWxhdGVkIGlucHV0IGRhdGEgZm9yIEZGVCBjaGFydHMgaWYgWVQgc2lnbmFscyBhcmUgZHJhZ2dlZFxyXG4gICAgICAgICAgICAgICAgaWYoc2VyaWVzSW5DaGFydFtpXS50eXBlID09IFNlcmllc1R5cGUuZmZ0U2VyaWVzICYmIGRyb3BwZWRTZXJpZXNbal0udHlwZSA9PSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5wdXRTZXJpZUlkOiBzdHJpbmd8dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjYWxjdWxhdGlvbkRhdGFJbmZvID0gc2VyaWVzSW5DaGFydFtpXS5jYWxjdWxhdGlvbkRhdGFJbmZvO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNhbGN1bGF0aW9uRGF0YUluZm8gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRTZXJpZUlkID0gY2FsY3VsYXRpb25EYXRhSW5mby5pbnB1dFNlcmllc0lkc1swXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaW5wdXRTZXJpZUlkID09IGRyb3BwZWRTZXJpZXNbal0uaWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wcGVkU2VyaWVzLnNwbGljZShqLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkcm9wcGVkU2VyaWVzO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==