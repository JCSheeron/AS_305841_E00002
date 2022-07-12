define(["require", "exports", "../../../models/chartManagerDataModel/chartManagerChart", "../../../models/common/series/baseSeries", "../../../models/chartManagerDataModel/scale"], function (require, exports, chartManagerChart_1, baseSeries_1, scale_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartManagerTreeGridDragDrop = /** @class */ (function () {
        function ChartManagerTreeGridDragDrop() {
        }
        /**
         * Sets the variable '_dragStartChartItem' when a drag operation is started
         *
         * @param {*} args
         * @memberof ChartManagerTreeGridDragDrop
         */
        ChartManagerTreeGridDragDrop.prototype.rowDragStart = function (args) {
            if (args.draggedRow.parentItem != undefined) {
                if (args.draggedRow.level == 2) {
                    this._dragStartChartItem = args.draggedRow.parentItem.parentItem.item;
                }
            }
            else if (args.draggedRow.level == 1) {
                this._dragStartChartItem = args.draggedRow.parentItem.item;
            }
            else if (args.draggedRow.level == 0) {
                this._dragStartChartItem = args.draggedRow.item;
            }
        };
        /**
         * Checks if drop is possible when dragging
         *
         * @param {*} args
         * @memberof ChartManagerTreeGridDragDrop
         */
        ChartManagerTreeGridDragDrop.prototype.rowDrag = function (args) {
            if (args.draggedRow.item instanceof chartManagerChart_1.ChartManagerChart) {
                this.canDropChart(args);
            }
            else if (args.draggedRow.item instanceof scale_1.Scale) {
                this.canDropYAxis(args);
            }
            else if (args.draggedRow.item instanceof baseSeries_1.BaseSeries) {
                this.canDropSerie(args);
            }
        };
        /**
         * Checks if chart can be dropped
         *
         * @private
         * @param {*} args
         * @memberof ChartManagerTreeGridDragDrop
         */
        ChartManagerTreeGridDragDrop.prototype.canDropChart = function (args) {
            if ((args.dropPosition == "insertAbove" || args.dropPosition == "insertBelow") && args.targetRow.level == 0) {
            }
            else {
                args.canDrop = false;
            }
        };
        /**
         * Checks if Scale can be dropped
         *
         * @private
         * @param {*} args
         * @memberof ChartManagerTreeGridDragDrop
         */
        ChartManagerTreeGridDragDrop.prototype.canDropYAxis = function (args) {
            // Drag & Drop of YAxis not allowed
            args.canDrop = false;
        };
        /**
         * Checks if Serie can be dropped
         *
         * @private
         * @param {*} args
         * @memberof ChartManagerTreeGridDragDrop
         */
        ChartManagerTreeGridDragDrop.prototype.canDropSerie = function (args) {
            if ((args.dropPosition == "insertAbove" || args.dropPosition == "insertBelow") && args.targetRow.level == 2
                || (args.dropPosition == "insertAsChild" && (args.targetRow.level == 1 || args.targetRow.level == 0))) {
                var targetAxis = this.getTargetAxisFromTragetRow(args.targetRow);
                var targetChart = this.getTargetChartFromTargetRow(args.targetRow);
                if (targetChart != undefined && args.draggedRow.type !== chartManagerChart_1.ChartType.XYChart) {
                    this.canDropNotXYSerie(args, targetAxis, targetChart);
                }
                else if (targetChart != undefined) {
                    this.canDropXYSerie(args, targetAxis, targetChart);
                }
            }
            else {
                args.canDrop = false;
            }
        };
        /**
         * Checks if YT or FFT serie can be dropped
         *
         * @private
         * @param {*} args
         * @param {(Scale | undefined)} targetAxis
         * @param {IChartManagerChart} targetChart
         * @memberof ChartManagerTreeGridDragDrop
         */
        ChartManagerTreeGridDragDrop.prototype.canDropNotXYSerie = function (args, targetAxis, targetChart) {
            var sourceChart = args.draggedRow.parentItem.parentItem.item;
            var sourceAxis = args.draggedRow.parentItem.item;
            var serie = args.draggedRow.item;
            var series = new Array();
            series.push(serie);
            if (targetAxis == sourceAxis) { // Avoid moving of series within an axis
                args.canDrop = false;
            }
            else if (args.draggedRow.parentItem.parentItem.chartType !== targetChart.chartType ||
                (targetChart != sourceChart && targetChart.hasSeries(series))) {
                args.canDrop = false;
            }
            else if (args.targetRow.level == 0) {
                // Check if a new axis can be added (drag and drop of a serie to a chart)
                if (!targetChart.canAddYAxis()) {
                    args.canDrop = false;
                }
            }
        };
        /**
         * Checks if XY serie can be dropped
         *
         * @private
         * @param {*} args
         * @param {(Scale | undefined)} targetAxis
         * @param {IChartManagerChart} targetChart
         * @memberof ChartManagerTreeGridDragDrop
         */
        ChartManagerTreeGridDragDrop.prototype.canDropXYSerie = function (args, targetAxis, targetChart) {
            var sourceChart = args.draggedRow.parentItem.parentItem.item;
            var sourceAxis = args.draggedRow.parentItem.item;
            var serie = args.draggedRow.item;
            var series = new Array();
            series.push(serie);
            if (targetAxis == sourceAxis || sourceChart == targetChart) { // Avoid moving of series within same axis
                args.canDrop = false;
            }
            else if (args.draggedRow.parentItem.parentItem.chartType !== targetChart.chartType ||
                (targetChart != sourceChart && targetChart.hasSeries(series))) {
                args.canDrop = false;
            }
        };
        /**
         * Triggered when drop action is done
         *
         * @param {*} args
         * @param {IChartManagerDataModel} dataModel
         * @memberof ChartManagerTreeGridDragDrop
         */
        ChartManagerTreeGridDragDrop.prototype.rowDropActionBegin = function (args, dataModel) {
            var dropPosition = args.dropPosition;
            if ((dropPosition == "insertAbove" || dropPosition == "insertBelow") && args.targetRow.level == 2
                || (dropPosition == "insertAsChild" && (args.targetRow.level == 1 || args.targetRow.level == 0))) {
                var targetAxis = this.getTargetAxisFromTragetRow(args.targetRow);
                var targetChart = this.getTargetChartFromTargetRow(args.targetRow);
                if (args.draggedRow.type !== chartManagerChart_1.ChartType.XYChart) {
                    this.NotXYrowDropAction(args, dataModel, targetAxis, targetChart);
                }
                else {
                    this.XYrowDropAction(args, dataModel, targetAxis, targetChart);
                }
            }
        };
        /**
         * Drop YT or FFT serie into the target chart
         *
         * @private
         * @param {*} args
         * @param {IChartManagerDataModel} dataModel
         * @param {(Scale | undefined)} targetAxis
         * @param {(IChartManagerChart | undefined)} targetChart
         * @memberof ChartManagerTreeGridDragDrop
         */
        ChartManagerTreeGridDragDrop.prototype.NotXYrowDropAction = function (args, dataModel, targetAxis, targetChart) {
            if (targetAxis == undefined) {
                // Handle drag of serie to chart
                var sourceChart = this._dragStartChartItem;
                if (sourceChart != undefined) {
                    var serie = args.draggedRow.item;
                    var series = new Array();
                    series.push(serie);
                    // Remove serie from source chart
                    dataModel.removeSerie(sourceChart, serie);
                    // Create new axis and add serie to target chart
                    var axisName = targetChart.getNextYAxisId();
                    var yAxis = new scale_1.Scale(axisName, targetChart);
                    dataModel.addYScale(targetChart, yAxis);
                    dataModel.addSeriesToChart(targetChart, series, yAxis);
                }
                args.cancel = true;
            }
        };
        /**
         * Drop XY serie into the target chart
         *
         * @private
         * @param {*} args
         * @param {IChartManagerDataModel} dataModel
         * @param {(Scale | undefined)} targetScale
         * @param {(IChartManagerChart | undefined)} targetChart
         * @memberof ChartManagerTreeGridDragDrop
         */
        ChartManagerTreeGridDragDrop.prototype.XYrowDropAction = function (args, dataModel, targetScale, targetChart) {
            if (targetScale == undefined) {
                // Handle drag of serie to chart
                var sourceChart = this._dragStartChartItem;
                if (sourceChart != undefined) {
                    var serie = args.draggedRow.item;
                    var series = new Array();
                    series.push(serie);
                    // Remove serie from source chart
                    dataModel.removeSerie(sourceChart, serie);
                    // Add serie to target chart
                    var scaleName = targetChart.getDefaultYAxisId();
                    var yScale = targetChart.getYScale(scaleName);
                    dataModel.addSeriesToChart(targetChart, series, yScale);
                }
                args.cancel = true;
            }
        };
        /**
         * Get target chart from row
         *
         * @private
         * @param {*} targetRow
         * @returns {(IChartManagerChart | undefined)}
         * @memberof ChartManagerTreeGridDragDrop
         */
        ChartManagerTreeGridDragDrop.prototype.getTargetChartFromTargetRow = function (targetRow) {
            if (targetRow.level == 2) {
                return targetRow.parentItem.parentItem.item;
            }
            else if (targetRow.level == 1) {
                return targetRow.parentItem.item;
            }
            else if (targetRow.level == 0) {
                return targetRow.item;
            }
            return undefined;
        };
        /**
         * Get target axis from row
         *
         * @private
         * @param {*} targetRow
         * @returns {(Scale | undefined)}
         * @memberof ChartManagerTreeGridDragDrop
         */
        ChartManagerTreeGridDragDrop.prototype.getTargetAxisFromTragetRow = function (targetRow) {
            if (targetRow.level == 2) {
                return targetRow.parentItem.item;
            }
            else if (targetRow.level == 1) {
                return targetRow.item;
            }
            else if (targetRow.level == 0) {
            }
            return undefined;
        };
        /**
         * Triggered when drag operation is finished
         *
         * @param {*} args
         * @param {IChartManagerDataModel} dataModel
         * @memberof ChartManagerTreeGridDragDrop
         */
        ChartManagerTreeGridDragDrop.prototype.rowDragStop = function (args, dataModel) {
            if (args.draggedRow.item instanceof chartManagerChart_1.ChartManagerChart) {
                this.dropChart(args, dataModel, args.requestType);
            }
            if (args.draggedRow.item instanceof baseSeries_1.BaseSeries) {
                this.dropSerie(args, dataModel, args.requestType);
            }
        };
        /**
         * Drop chart to selected position
         *
         * @private
         * @param {*} args
         * @param {IChartManagerDataModel} dataModel
         * @param {*} dropPosition
         * @memberof ChartManagerTreeGridDragDrop
         */
        ChartManagerTreeGridDragDrop.prototype.dropChart = function (args, dataModel, dropPosition) {
            if ((dropPosition == "insertAbove" || dropPosition == "insertBelow") && args.targetRow.level == 0) {
                dataModel.moveChart(args.draggedRow.item, args.targetRow.item, dropPosition);
            }
            else {
                args.cancel = true;
            }
        };
        /**
         * Drop serie to selected chart/scale
         *
         * @private
         * @param {*} args
         * @param {*} dataModel
         * @param {*} dropPosition
         * @memberof ChartManagerTreeGridDragDrop
         */
        ChartManagerTreeGridDragDrop.prototype.dropSerie = function (args, dataModel, dropPosition) {
            if ((dropPosition == "insertAbove" || dropPosition == "insertBelow") && args.targetRow.level == 2
                || (dropPosition == "insertAsChild" && (args.targetRow.level == 1 || args.targetRow.level == 0))) {
                var sourceChart = this._dragStartChartItem;
                var sourceAxis = args.draggedRow.parentItem.item;
                var serie = args.draggedRow.item;
                var targetAxis = this.getTargetAxisFromTragetRow(args.targetRow);
                var targetChart = this.getTargetChartFromTargetRow(args.targetRow);
                dataModel.moveSerie(sourceChart, sourceAxis, serie, targetChart, targetAxis, dropPosition);
            }
            else {
                args.cancel = true;
            }
        };
        return ChartManagerTreeGridDragDrop;
    }());
    exports.ChartManagerTreeGridDragDrop = ChartManagerTreeGridDragDrop;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRNYW5hZ2VyVHJlZUdyaWREcmFnRHJvcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydE1hbmFnZXJXaWRnZXQvdmlldy9jaGFydE1hbmFnZXJUcmVlR3JpZERyYWdEcm9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQU1BO1FBQUE7UUE0VUEsQ0FBQztRQXhVRzs7Ozs7V0FLRztRQUNILG1EQUFZLEdBQVosVUFBYSxJQUFJO1lBQ2IsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsSUFBSSxTQUFTLEVBQUU7Z0JBQ3pDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUFFO29CQUM1QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztpQkFDekU7YUFDSjtpQkFDSSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBRTtnQkFDakMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQzthQUM5RDtpQkFDSSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBRTtnQkFDakMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO2FBQ25EO1FBQ0wsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsOENBQU8sR0FBUCxVQUFRLElBQUk7WUFDUixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxZQUFZLHFDQUFpQixFQUFFO2dCQUNuRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzNCO2lCQUNJLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLFlBQVksYUFBSyxFQUFFO2dCQUM1QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzNCO2lCQUNJLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLFlBQVksdUJBQVUsRUFBRTtnQkFDakQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMzQjtRQUNMLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSyxtREFBWSxHQUFwQixVQUFxQixJQUFJO1lBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLGFBQWEsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLGFBQWEsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBRTthQUU1RztpQkFDSTtnQkFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzthQUN4QjtRQUNMLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSyxtREFBWSxHQUFwQixVQUFxQixJQUFJO1lBQ3JCLG1DQUFtQztZQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUN6QixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssbURBQVksR0FBcEIsVUFBcUIsSUFBSTtZQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxhQUFhLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxhQUFhLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxDQUFDO21CQUNwRyxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksZUFBZSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3ZHLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ2pFLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ25FLElBQUksV0FBVyxJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksS0FBSyw2QkFBUyxDQUFDLE9BQU8sRUFBRTtvQkFDeEUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7aUJBQ3pEO3FCQUNJLElBQUksV0FBVyxJQUFJLFNBQVMsRUFBRTtvQkFDL0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO2lCQUN0RDthQUNKO2lCQUNJO2dCQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2FBQ3hCO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0ssd0RBQWlCLEdBQXpCLFVBQTBCLElBQUksRUFBRSxVQUE2QixFQUFFLFdBQStCO1lBQzFGLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDN0QsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO1lBQ2pELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBa0IsQ0FBQztZQUMvQyxJQUFJLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBYyxDQUFDO1lBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkIsSUFBSSxVQUFVLElBQUksVUFBVSxFQUFFLEVBQUUsd0NBQXdDO2dCQUNwRSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzthQUN4QjtpQkFDSSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEtBQUssV0FBVyxDQUFDLFNBQVM7Z0JBQzlFLENBQUMsV0FBVyxJQUFJLFdBQVcsSUFBSSxXQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUU7Z0JBQy9ELElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2FBQ3hCO2lCQUNJLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUFFO2dCQUNoQyx5RUFBeUU7Z0JBQ3pFLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLEVBQUU7b0JBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2lCQUN4QjthQUNKO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0sscURBQWMsR0FBdEIsVUFBdUIsSUFBSSxFQUFFLFVBQTZCLEVBQUUsV0FBK0I7WUFDdkYsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztZQUM3RCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDakQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFrQixDQUFDO1lBQy9DLElBQUksTUFBTSxHQUFHLElBQUksS0FBSyxFQUFjLENBQUM7WUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQixJQUFJLFVBQVUsSUFBSSxVQUFVLElBQUksV0FBVyxJQUFJLFdBQVcsRUFBRSxFQUFFLDBDQUEwQztnQkFDcEcsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7YUFDeEI7aUJBQ0ksSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsU0FBUyxLQUFLLFdBQVcsQ0FBQyxTQUFTO2dCQUM5RSxDQUFDLFdBQVcsSUFBSSxXQUFXLElBQUksV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFO2dCQUMvRCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzthQUN4QjtRQUNMLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSCx5REFBa0IsR0FBbEIsVUFBbUIsSUFBSSxFQUFFLFNBQWlDO1lBQ3RELElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDckMsSUFBSSxDQUFDLFlBQVksSUFBSSxhQUFhLElBQUksWUFBWSxJQUFJLGFBQWEsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLENBQUM7bUJBQzFGLENBQUMsWUFBWSxJQUFJLGVBQWUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNsRyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNqRSxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNuRSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLDZCQUFTLENBQUMsT0FBTyxFQUFFO29CQUM1QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7aUJBQ3JFO3FCQUNJO29CQUNELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7aUJBQ2xFO2FBQ0o7UUFDTCxDQUFDO1FBQ0Q7Ozs7Ozs7OztXQVNHO1FBQ0sseURBQWtCLEdBQTFCLFVBQTJCLElBQUksRUFBRSxTQUFpQyxFQUFFLFVBQTZCLEVBQUUsV0FBMkM7WUFDMUksSUFBSSxVQUFVLElBQUksU0FBUyxFQUFFO2dCQUN6QixnQ0FBZ0M7Z0JBQ2hDLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztnQkFDM0MsSUFBSSxXQUFXLElBQUksU0FBUyxFQUFFO29CQUMxQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQWtCLENBQUM7b0JBQy9DLElBQUksTUFBTSxHQUFHLElBQUksS0FBSyxFQUFjLENBQUM7b0JBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ25CLGlDQUFpQztvQkFDakMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBRTFDLGdEQUFnRDtvQkFDaEQsSUFBSSxRQUFRLEdBQUcsV0FBWSxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUM3QyxJQUFJLEtBQUssR0FBRyxJQUFJLGFBQUssQ0FBQyxRQUFRLEVBQUUsV0FBWSxDQUFDLENBQUM7b0JBQzlDLFNBQVMsQ0FBQyxTQUFTLENBQUMsV0FBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUN6QyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsV0FBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztpQkFDM0Q7Z0JBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7YUFDdEI7UUFDTCxDQUFDO1FBRUQ7Ozs7Ozs7OztXQVNHO1FBQ0ssc0RBQWUsR0FBdkIsVUFBd0IsSUFBSSxFQUFFLFNBQWlDLEVBQUUsV0FBOEIsRUFBRSxXQUEyQztZQUN4SSxJQUFJLFdBQVcsSUFBSSxTQUFTLEVBQUU7Z0JBQzFCLGdDQUFnQztnQkFDaEMsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDO2dCQUMzQyxJQUFJLFdBQVcsSUFBSSxTQUFTLEVBQUU7b0JBQzFCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBa0IsQ0FBQztvQkFDL0MsSUFBSSxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQWMsQ0FBQztvQkFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDbkIsaUNBQWlDO29CQUNqQyxTQUFTLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFFMUMsNEJBQTRCO29CQUM1QixJQUFJLFNBQVMsR0FBRyxXQUFZLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztvQkFDakQsSUFBSSxNQUFNLEdBQUcsV0FBWSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDL0MsU0FBUyxDQUFDLGdCQUFnQixDQUFDLFdBQVksRUFBRSxNQUFNLEVBQUUsTUFBTyxDQUFDLENBQUM7aUJBRTdEO2dCQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2FBQ3RCO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSyxrRUFBMkIsR0FBbkMsVUFBb0MsU0FBYztZQUM5QyxJQUFJLFNBQVMsQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUFFO2dCQUN0QixPQUFPLFNBQVMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQTBCLENBQUM7YUFDckU7aUJBQ0ksSUFBSSxTQUFTLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBRTtnQkFDM0IsT0FBTyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQTBCLENBQUM7YUFDMUQ7aUJBQ0ksSUFBSSxTQUFTLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBRTtnQkFDM0IsT0FBTyxTQUFTLENBQUMsSUFBMEIsQ0FBQzthQUMvQztZQUNELE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ssaUVBQTBCLEdBQWxDLFVBQW1DLFNBQWM7WUFDN0MsSUFBSSxTQUFTLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBRTtnQkFDdEIsT0FBTyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQWEsQ0FBQzthQUM3QztpQkFDSSxJQUFJLFNBQVMsQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUFFO2dCQUMzQixPQUFPLFNBQVMsQ0FBQyxJQUFhLENBQUM7YUFDbEM7aUJBQ0ksSUFBSSxTQUFTLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBRTthQUU5QjtZQUNELE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSCxrREFBVyxHQUFYLFVBQVksSUFBSSxFQUFFLFNBQWlDO1lBQy9DLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLFlBQVkscUNBQWlCLEVBQUU7Z0JBQ25ELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDckQ7WUFDRCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxZQUFZLHVCQUFVLEVBQUU7Z0JBQzVDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDckQ7UUFDTCxDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSyxnREFBUyxHQUFqQixVQUFrQixJQUFJLEVBQUUsU0FBaUMsRUFBRSxZQUFZO1lBQ25FLElBQUksQ0FBQyxZQUFZLElBQUksYUFBYSxJQUFJLFlBQVksSUFBSSxhQUFhLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUU7Z0JBQy9GLFNBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7YUFDakY7aUJBQ0k7Z0JBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7YUFDdEI7UUFDTCxDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSyxnREFBUyxHQUFqQixVQUFrQixJQUFJLEVBQUUsU0FBUyxFQUFFLFlBQVk7WUFDM0MsSUFBSSxDQUFDLFlBQVksSUFBSSxhQUFhLElBQUksWUFBWSxJQUFJLGFBQWEsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLENBQUM7bUJBQzFGLENBQUMsWUFBWSxJQUFJLGVBQWUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUVsRyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsbUJBQXlDLENBQUM7Z0JBQ2pFLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQWEsQ0FBQztnQkFDMUQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFrQixDQUFDO2dCQUUvQyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNqRSxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNuRSxTQUFTLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7YUFDOUY7aUJBQ0k7Z0JBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7YUFDdEI7UUFDTCxDQUFDO1FBQ0wsbUNBQUM7SUFBRCxDQUFDLEFBNVVELElBNFVDO0lBNVVZLG9FQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYXJ0TWFuYWdlckNoYXJ0LCBDaGFydFR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9jaGFydE1hbmFnZXJDaGFydFwiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9jb21tb24vc2VyaWVzL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgU2NhbGUgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9zY2FsZVwiO1xyXG5pbXBvcnQgeyBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9kYXRhTW9kZWxzXCI7XHJcbmltcG9ydCB7IElDaGFydE1hbmFnZXJDaGFydCB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2ludGVyZmFjZXMvY2hhcnRNYW5hZ2VyQ2hhcnRJbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDaGFydE1hbmFnZXJUcmVlR3JpZERyYWdEcm9wIHtcclxuXHJcbiAgICBwcml2YXRlIF9kcmFnU3RhcnRDaGFydEl0ZW06IElDaGFydE1hbmFnZXJDaGFydCB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHZhcmlhYmxlICdfZHJhZ1N0YXJ0Q2hhcnRJdGVtJyB3aGVuIGEgZHJhZyBvcGVyYXRpb24gaXMgc3RhcnRlZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlclRyZWVHcmlkRHJhZ0Ryb3BcclxuICAgICAqL1xyXG4gICAgcm93RHJhZ1N0YXJ0KGFyZ3MpIHtcclxuICAgICAgICBpZiAoYXJncy5kcmFnZ2VkUm93LnBhcmVudEl0ZW0gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGlmIChhcmdzLmRyYWdnZWRSb3cubGV2ZWwgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZHJhZ1N0YXJ0Q2hhcnRJdGVtID0gYXJncy5kcmFnZ2VkUm93LnBhcmVudEl0ZW0ucGFyZW50SXRlbS5pdGVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGFyZ3MuZHJhZ2dlZFJvdy5sZXZlbCA9PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RyYWdTdGFydENoYXJ0SXRlbSA9IGFyZ3MuZHJhZ2dlZFJvdy5wYXJlbnRJdGVtLml0ZW07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGFyZ3MuZHJhZ2dlZFJvdy5sZXZlbCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RyYWdTdGFydENoYXJ0SXRlbSA9IGFyZ3MuZHJhZ2dlZFJvdy5pdGVtO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiBkcm9wIGlzIHBvc3NpYmxlIHdoZW4gZHJhZ2dpbmcgXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyVHJlZUdyaWREcmFnRHJvcFxyXG4gICAgICovXHJcbiAgICByb3dEcmFnKGFyZ3MpIHtcclxuICAgICAgICBpZiAoYXJncy5kcmFnZ2VkUm93Lml0ZW0gaW5zdGFuY2VvZiBDaGFydE1hbmFnZXJDaGFydCkge1xyXG4gICAgICAgICAgICB0aGlzLmNhbkRyb3BDaGFydChhcmdzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoYXJncy5kcmFnZ2VkUm93Lml0ZW0gaW5zdGFuY2VvZiBTY2FsZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNhbkRyb3BZQXhpcyhhcmdzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoYXJncy5kcmFnZ2VkUm93Lml0ZW0gaW5zdGFuY2VvZiBCYXNlU2VyaWVzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FuRHJvcFNlcmllKGFyZ3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiBjaGFydCBjYW4gYmUgZHJvcHBlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJUcmVlR3JpZERyYWdEcm9wXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2FuRHJvcENoYXJ0KGFyZ3MpIHtcclxuICAgICAgICBpZiAoKGFyZ3MuZHJvcFBvc2l0aW9uID09IFwiaW5zZXJ0QWJvdmVcIiB8fCBhcmdzLmRyb3BQb3NpdGlvbiA9PSBcImluc2VydEJlbG93XCIpICYmIGFyZ3MudGFyZ2V0Um93LmxldmVsID09IDApIHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBhcmdzLmNhbkRyb3AgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgU2NhbGUgY2FuIGJlIGRyb3BwZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyVHJlZUdyaWREcmFnRHJvcFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNhbkRyb3BZQXhpcyhhcmdzKSB7XHJcbiAgICAgICAgLy8gRHJhZyAmIERyb3Agb2YgWUF4aXMgbm90IGFsbG93ZWRcclxuICAgICAgICBhcmdzLmNhbkRyb3AgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiBTZXJpZSBjYW4gYmUgZHJvcHBlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJUcmVlR3JpZERyYWdEcm9wXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2FuRHJvcFNlcmllKGFyZ3MpIHtcclxuICAgICAgICBpZiAoKGFyZ3MuZHJvcFBvc2l0aW9uID09IFwiaW5zZXJ0QWJvdmVcIiB8fCBhcmdzLmRyb3BQb3NpdGlvbiA9PSBcImluc2VydEJlbG93XCIpICYmIGFyZ3MudGFyZ2V0Um93LmxldmVsID09IDJcclxuICAgICAgICAgICAgfHwgKGFyZ3MuZHJvcFBvc2l0aW9uID09IFwiaW5zZXJ0QXNDaGlsZFwiICYmIChhcmdzLnRhcmdldFJvdy5sZXZlbCA9PSAxIHx8IGFyZ3MudGFyZ2V0Um93LmxldmVsID09IDApKSkge1xyXG4gICAgICAgICAgICBsZXQgdGFyZ2V0QXhpcyA9IHRoaXMuZ2V0VGFyZ2V0QXhpc0Zyb21UcmFnZXRSb3coYXJncy50YXJnZXRSb3cpO1xyXG4gICAgICAgICAgICBsZXQgdGFyZ2V0Q2hhcnQgPSB0aGlzLmdldFRhcmdldENoYXJ0RnJvbVRhcmdldFJvdyhhcmdzLnRhcmdldFJvdyk7XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXRDaGFydCAhPSB1bmRlZmluZWQgJiYgYXJncy5kcmFnZ2VkUm93LnR5cGUgIT09IENoYXJ0VHlwZS5YWUNoYXJ0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbkRyb3BOb3RYWVNlcmllKGFyZ3MsIHRhcmdldEF4aXMsIHRhcmdldENoYXJ0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0YXJnZXRDaGFydCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FuRHJvcFhZU2VyaWUoYXJncywgdGFyZ2V0QXhpcywgdGFyZ2V0Q2hhcnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBhcmdzLmNhbkRyb3AgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgWVQgb3IgRkZUIHNlcmllIGNhbiBiZSBkcm9wcGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQHBhcmFtIHsoU2NhbGUgfCB1bmRlZmluZWQpfSB0YXJnZXRBeGlzXHJcbiAgICAgKiBAcGFyYW0ge0lDaGFydE1hbmFnZXJDaGFydH0gdGFyZ2V0Q2hhcnRcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJUcmVlR3JpZERyYWdEcm9wXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2FuRHJvcE5vdFhZU2VyaWUoYXJncywgdGFyZ2V0QXhpczogU2NhbGUgfCB1bmRlZmluZWQsIHRhcmdldENoYXJ0OiBJQ2hhcnRNYW5hZ2VyQ2hhcnQpIHtcclxuICAgICAgICBsZXQgc291cmNlQ2hhcnQgPSBhcmdzLmRyYWdnZWRSb3cucGFyZW50SXRlbS5wYXJlbnRJdGVtLml0ZW07XHJcbiAgICAgICAgbGV0IHNvdXJjZUF4aXMgPSBhcmdzLmRyYWdnZWRSb3cucGFyZW50SXRlbS5pdGVtO1xyXG4gICAgICAgIGxldCBzZXJpZSA9IGFyZ3MuZHJhZ2dlZFJvdy5pdGVtIGFzIEJhc2VTZXJpZXM7XHJcbiAgICAgICAgbGV0IHNlcmllcyA9IG5ldyBBcnJheTxCYXNlU2VyaWVzPigpO1xyXG4gICAgICAgIHNlcmllcy5wdXNoKHNlcmllKTtcclxuICAgICAgICBpZiAodGFyZ2V0QXhpcyA9PSBzb3VyY2VBeGlzKSB7IC8vIEF2b2lkIG1vdmluZyBvZiBzZXJpZXMgd2l0aGluIGFuIGF4aXNcclxuICAgICAgICAgICAgYXJncy5jYW5Ecm9wID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGFyZ3MuZHJhZ2dlZFJvdy5wYXJlbnRJdGVtLnBhcmVudEl0ZW0uY2hhcnRUeXBlICE9PSB0YXJnZXRDaGFydC5jaGFydFR5cGUgfHxcclxuICAgICAgICAgICAgKHRhcmdldENoYXJ0ICE9IHNvdXJjZUNoYXJ0ICYmIHRhcmdldENoYXJ0Lmhhc1NlcmllcyhzZXJpZXMpKSkge1xyXG4gICAgICAgICAgICBhcmdzLmNhbkRyb3AgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoYXJncy50YXJnZXRSb3cubGV2ZWwgPT0gMCkge1xyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiBhIG5ldyBheGlzIGNhbiBiZSBhZGRlZCAoZHJhZyBhbmQgZHJvcCBvZiBhIHNlcmllIHRvIGEgY2hhcnQpXHJcbiAgICAgICAgICAgIGlmICghdGFyZ2V0Q2hhcnQuY2FuQWRkWUF4aXMoKSkge1xyXG4gICAgICAgICAgICAgICAgYXJncy5jYW5Ecm9wID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgWFkgc2VyaWUgY2FuIGJlIGRyb3BwZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAcGFyYW0geyhTY2FsZSB8IHVuZGVmaW5lZCl9IHRhcmdldEF4aXNcclxuICAgICAqIEBwYXJhbSB7SUNoYXJ0TWFuYWdlckNoYXJ0fSB0YXJnZXRDaGFydFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlclRyZWVHcmlkRHJhZ0Ryb3BcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjYW5Ecm9wWFlTZXJpZShhcmdzLCB0YXJnZXRBeGlzOiBTY2FsZSB8IHVuZGVmaW5lZCwgdGFyZ2V0Q2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCkge1xyXG4gICAgICAgIGxldCBzb3VyY2VDaGFydCA9IGFyZ3MuZHJhZ2dlZFJvdy5wYXJlbnRJdGVtLnBhcmVudEl0ZW0uaXRlbTtcclxuICAgICAgICBsZXQgc291cmNlQXhpcyA9IGFyZ3MuZHJhZ2dlZFJvdy5wYXJlbnRJdGVtLml0ZW07XHJcbiAgICAgICAgbGV0IHNlcmllID0gYXJncy5kcmFnZ2VkUm93Lml0ZW0gYXMgQmFzZVNlcmllcztcclxuICAgICAgICBsZXQgc2VyaWVzID0gbmV3IEFycmF5PEJhc2VTZXJpZXM+KCk7XHJcbiAgICAgICAgc2VyaWVzLnB1c2goc2VyaWUpO1xyXG4gICAgICAgIGlmICh0YXJnZXRBeGlzID09IHNvdXJjZUF4aXMgfHwgc291cmNlQ2hhcnQgPT0gdGFyZ2V0Q2hhcnQpIHsgLy8gQXZvaWQgbW92aW5nIG9mIHNlcmllcyB3aXRoaW4gc2FtZSBheGlzXHJcbiAgICAgICAgICAgIGFyZ3MuY2FuRHJvcCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhcmdzLmRyYWdnZWRSb3cucGFyZW50SXRlbS5wYXJlbnRJdGVtLmNoYXJ0VHlwZSAhPT0gdGFyZ2V0Q2hhcnQuY2hhcnRUeXBlIHx8XHJcbiAgICAgICAgICAgICh0YXJnZXRDaGFydCAhPSBzb3VyY2VDaGFydCAmJiB0YXJnZXRDaGFydC5oYXNTZXJpZXMoc2VyaWVzKSkpIHtcclxuICAgICAgICAgICAgYXJncy5jYW5Ecm9wID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJpZ2dlcmVkIHdoZW4gZHJvcCBhY3Rpb24gaXMgZG9uZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQHBhcmFtIHtJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsfSBkYXRhTW9kZWxcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJUcmVlR3JpZERyYWdEcm9wXHJcbiAgICAgKi9cclxuICAgIHJvd0Ryb3BBY3Rpb25CZWdpbihhcmdzLCBkYXRhTW9kZWw6IElDaGFydE1hbmFnZXJEYXRhTW9kZWwpIHtcclxuICAgICAgICBsZXQgZHJvcFBvc2l0aW9uID0gYXJncy5kcm9wUG9zaXRpb247XHJcbiAgICAgICAgaWYgKChkcm9wUG9zaXRpb24gPT0gXCJpbnNlcnRBYm92ZVwiIHx8IGRyb3BQb3NpdGlvbiA9PSBcImluc2VydEJlbG93XCIpICYmIGFyZ3MudGFyZ2V0Um93LmxldmVsID09IDJcclxuICAgICAgICAgICAgfHwgKGRyb3BQb3NpdGlvbiA9PSBcImluc2VydEFzQ2hpbGRcIiAmJiAoYXJncy50YXJnZXRSb3cubGV2ZWwgPT0gMSB8fCBhcmdzLnRhcmdldFJvdy5sZXZlbCA9PSAwKSkpIHtcclxuICAgICAgICAgICAgbGV0IHRhcmdldEF4aXMgPSB0aGlzLmdldFRhcmdldEF4aXNGcm9tVHJhZ2V0Um93KGFyZ3MudGFyZ2V0Um93KTtcclxuICAgICAgICAgICAgbGV0IHRhcmdldENoYXJ0ID0gdGhpcy5nZXRUYXJnZXRDaGFydEZyb21UYXJnZXRSb3coYXJncy50YXJnZXRSb3cpO1xyXG4gICAgICAgICAgICBpZiAoYXJncy5kcmFnZ2VkUm93LnR5cGUgIT09IENoYXJ0VHlwZS5YWUNoYXJ0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLk5vdFhZcm93RHJvcEFjdGlvbihhcmdzLCBkYXRhTW9kZWwsIHRhcmdldEF4aXMsIHRhcmdldENoYXJ0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuWFlyb3dEcm9wQWN0aW9uKGFyZ3MsIGRhdGFNb2RlbCwgdGFyZ2V0QXhpcywgdGFyZ2V0Q2hhcnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBEcm9wIFlUIG9yIEZGVCBzZXJpZSBpbnRvIHRoZSB0YXJnZXQgY2hhcnQgXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQHBhcmFtIHtJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsfSBkYXRhTW9kZWxcclxuICAgICAqIEBwYXJhbSB7KFNjYWxlIHwgdW5kZWZpbmVkKX0gdGFyZ2V0QXhpc1xyXG4gICAgICogQHBhcmFtIHsoSUNoYXJ0TWFuYWdlckNoYXJ0IHwgdW5kZWZpbmVkKX0gdGFyZ2V0Q2hhcnRcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJUcmVlR3JpZERyYWdEcm9wXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgTm90WFlyb3dEcm9wQWN0aW9uKGFyZ3MsIGRhdGFNb2RlbDogSUNoYXJ0TWFuYWdlckRhdGFNb2RlbCwgdGFyZ2V0QXhpczogU2NhbGUgfCB1bmRlZmluZWQsIHRhcmdldENoYXJ0OiBJQ2hhcnRNYW5hZ2VyQ2hhcnQgfCB1bmRlZmluZWQpIHtcclxuICAgICAgICBpZiAodGFyZ2V0QXhpcyA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgLy8gSGFuZGxlIGRyYWcgb2Ygc2VyaWUgdG8gY2hhcnRcclxuICAgICAgICAgICAgbGV0IHNvdXJjZUNoYXJ0ID0gdGhpcy5fZHJhZ1N0YXJ0Q2hhcnRJdGVtO1xyXG4gICAgICAgICAgICBpZiAoc291cmNlQ2hhcnQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VyaWUgPSBhcmdzLmRyYWdnZWRSb3cuaXRlbSBhcyBCYXNlU2VyaWVzO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlcmllcyA9IG5ldyBBcnJheTxCYXNlU2VyaWVzPigpO1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzLnB1c2goc2VyaWUpO1xyXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHNlcmllIGZyb20gc291cmNlIGNoYXJ0XHJcbiAgICAgICAgICAgICAgICBkYXRhTW9kZWwucmVtb3ZlU2VyaWUoc291cmNlQ2hhcnQsIHNlcmllKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgbmV3IGF4aXMgYW5kIGFkZCBzZXJpZSB0byB0YXJnZXQgY2hhcnRcclxuICAgICAgICAgICAgICAgIGxldCBheGlzTmFtZSA9IHRhcmdldENoYXJ0IS5nZXROZXh0WUF4aXNJZCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHlBeGlzID0gbmV3IFNjYWxlKGF4aXNOYW1lLCB0YXJnZXRDaGFydCEpO1xyXG4gICAgICAgICAgICAgICAgZGF0YU1vZGVsLmFkZFlTY2FsZSh0YXJnZXRDaGFydCEsIHlBeGlzKTtcclxuICAgICAgICAgICAgICAgIGRhdGFNb2RlbC5hZGRTZXJpZXNUb0NoYXJ0KHRhcmdldENoYXJ0ISwgc2VyaWVzLCB5QXhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERyb3AgWFkgc2VyaWUgaW50byB0aGUgdGFyZ2V0IGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQHBhcmFtIHtJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsfSBkYXRhTW9kZWxcclxuICAgICAqIEBwYXJhbSB7KFNjYWxlIHwgdW5kZWZpbmVkKX0gdGFyZ2V0U2NhbGVcclxuICAgICAqIEBwYXJhbSB7KElDaGFydE1hbmFnZXJDaGFydCB8IHVuZGVmaW5lZCl9IHRhcmdldENoYXJ0XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyVHJlZUdyaWREcmFnRHJvcFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIFhZcm93RHJvcEFjdGlvbihhcmdzLCBkYXRhTW9kZWw6IElDaGFydE1hbmFnZXJEYXRhTW9kZWwsIHRhcmdldFNjYWxlOiBTY2FsZSB8IHVuZGVmaW5lZCwgdGFyZ2V0Q2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlmICh0YXJnZXRTY2FsZSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgLy8gSGFuZGxlIGRyYWcgb2Ygc2VyaWUgdG8gY2hhcnRcclxuICAgICAgICAgICAgbGV0IHNvdXJjZUNoYXJ0ID0gdGhpcy5fZHJhZ1N0YXJ0Q2hhcnRJdGVtO1xyXG4gICAgICAgICAgICBpZiAoc291cmNlQ2hhcnQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VyaWUgPSBhcmdzLmRyYWdnZWRSb3cuaXRlbSBhcyBCYXNlU2VyaWVzO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlcmllcyA9IG5ldyBBcnJheTxCYXNlU2VyaWVzPigpO1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzLnB1c2goc2VyaWUpO1xyXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHNlcmllIGZyb20gc291cmNlIGNoYXJ0XHJcbiAgICAgICAgICAgICAgICBkYXRhTW9kZWwucmVtb3ZlU2VyaWUoc291cmNlQ2hhcnQsIHNlcmllKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBBZGQgc2VyaWUgdG8gdGFyZ2V0IGNoYXJ0XHJcbiAgICAgICAgICAgICAgICBsZXQgc2NhbGVOYW1lID0gdGFyZ2V0Q2hhcnQhLmdldERlZmF1bHRZQXhpc0lkKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgeVNjYWxlID0gdGFyZ2V0Q2hhcnQhLmdldFlTY2FsZShzY2FsZU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgZGF0YU1vZGVsLmFkZFNlcmllc1RvQ2hhcnQodGFyZ2V0Q2hhcnQhLCBzZXJpZXMsIHlTY2FsZSEpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRhcmdldCBjaGFydCBmcm9tIHJvd1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHRhcmdldFJvd1xyXG4gICAgICogQHJldHVybnMgeyhJQ2hhcnRNYW5hZ2VyQ2hhcnQgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlclRyZWVHcmlkRHJhZ0Ryb3BcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUYXJnZXRDaGFydEZyb21UYXJnZXRSb3codGFyZ2V0Um93OiBhbnkpOiBJQ2hhcnRNYW5hZ2VyQ2hhcnQgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGlmICh0YXJnZXRSb3cubGV2ZWwgPT0gMikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0Um93LnBhcmVudEl0ZW0ucGFyZW50SXRlbS5pdGVtIGFzIElDaGFydE1hbmFnZXJDaGFydDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGFyZ2V0Um93LmxldmVsID09IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRhcmdldFJvdy5wYXJlbnRJdGVtLml0ZW0gYXMgSUNoYXJ0TWFuYWdlckNoYXJ0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0YXJnZXRSb3cubGV2ZWwgPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0Um93Lml0ZW0gYXMgSUNoYXJ0TWFuYWdlckNoYXJ0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRhcmdldCBheGlzIGZyb20gcm93XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gdGFyZ2V0Um93XHJcbiAgICAgKiBAcmV0dXJucyB7KFNjYWxlIHwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJUcmVlR3JpZERyYWdEcm9wXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VGFyZ2V0QXhpc0Zyb21UcmFnZXRSb3codGFyZ2V0Um93OiBhbnkpOiBTY2FsZSB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgaWYgKHRhcmdldFJvdy5sZXZlbCA9PSAyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXRSb3cucGFyZW50SXRlbS5pdGVtIGFzIFNjYWxlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0YXJnZXRSb3cubGV2ZWwgPT0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0Um93Lml0ZW0gYXMgU2NhbGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRhcmdldFJvdy5sZXZlbCA9PSAwKSB7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJpZ2dlcmVkIHdoZW4gZHJhZyBvcGVyYXRpb24gaXMgZmluaXNoZWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBwYXJhbSB7SUNoYXJ0TWFuYWdlckRhdGFNb2RlbH0gZGF0YU1vZGVsXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyVHJlZUdyaWREcmFnRHJvcFxyXG4gICAgICovXHJcbiAgICByb3dEcmFnU3RvcChhcmdzLCBkYXRhTW9kZWw6IElDaGFydE1hbmFnZXJEYXRhTW9kZWwpIHtcclxuICAgICAgICBpZiAoYXJncy5kcmFnZ2VkUm93Lml0ZW0gaW5zdGFuY2VvZiBDaGFydE1hbmFnZXJDaGFydCkge1xyXG4gICAgICAgICAgICB0aGlzLmRyb3BDaGFydChhcmdzLCBkYXRhTW9kZWwsIGFyZ3MucmVxdWVzdFR5cGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYXJncy5kcmFnZ2VkUm93Lml0ZW0gaW5zdGFuY2VvZiBCYXNlU2VyaWVzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJvcFNlcmllKGFyZ3MsIGRhdGFNb2RlbCwgYXJncy5yZXF1ZXN0VHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJvcCBjaGFydCB0byBzZWxlY3RlZCBwb3NpdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBwYXJhbSB7SUNoYXJ0TWFuYWdlckRhdGFNb2RlbH0gZGF0YU1vZGVsXHJcbiAgICAgKiBAcGFyYW0geyp9IGRyb3BQb3NpdGlvblxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlclRyZWVHcmlkRHJhZ0Ryb3BcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkcm9wQ2hhcnQoYXJncywgZGF0YU1vZGVsOiBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsLCBkcm9wUG9zaXRpb24pIHtcclxuICAgICAgICBpZiAoKGRyb3BQb3NpdGlvbiA9PSBcImluc2VydEFib3ZlXCIgfHwgZHJvcFBvc2l0aW9uID09IFwiaW5zZXJ0QmVsb3dcIikgJiYgYXJncy50YXJnZXRSb3cubGV2ZWwgPT0gMCkge1xyXG4gICAgICAgICAgICBkYXRhTW9kZWwhLm1vdmVDaGFydChhcmdzLmRyYWdnZWRSb3cuaXRlbSwgYXJncy50YXJnZXRSb3cuaXRlbSwgZHJvcFBvc2l0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcm9wIHNlcmllIHRvIHNlbGVjdGVkIGNoYXJ0L3NjYWxlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQHBhcmFtIHsqfSBkYXRhTW9kZWxcclxuICAgICAqIEBwYXJhbSB7Kn0gZHJvcFBvc2l0aW9uXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyVHJlZUdyaWREcmFnRHJvcFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRyb3BTZXJpZShhcmdzLCBkYXRhTW9kZWwsIGRyb3BQb3NpdGlvbikge1xyXG4gICAgICAgIGlmICgoZHJvcFBvc2l0aW9uID09IFwiaW5zZXJ0QWJvdmVcIiB8fCBkcm9wUG9zaXRpb24gPT0gXCJpbnNlcnRCZWxvd1wiKSAmJiBhcmdzLnRhcmdldFJvdy5sZXZlbCA9PSAyXHJcbiAgICAgICAgICAgIHx8IChkcm9wUG9zaXRpb24gPT0gXCJpbnNlcnRBc0NoaWxkXCIgJiYgKGFyZ3MudGFyZ2V0Um93LmxldmVsID09IDEgfHwgYXJncy50YXJnZXRSb3cubGV2ZWwgPT0gMCkpKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgc291cmNlQ2hhcnQgPSB0aGlzLl9kcmFnU3RhcnRDaGFydEl0ZW0gYXMgSUNoYXJ0TWFuYWdlckNoYXJ0O1xyXG4gICAgICAgICAgICBsZXQgc291cmNlQXhpcyA9IGFyZ3MuZHJhZ2dlZFJvdy5wYXJlbnRJdGVtLml0ZW0gYXMgU2NhbGU7XHJcbiAgICAgICAgICAgIGxldCBzZXJpZSA9IGFyZ3MuZHJhZ2dlZFJvdy5pdGVtIGFzIEJhc2VTZXJpZXM7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGFyZ2V0QXhpcyA9IHRoaXMuZ2V0VGFyZ2V0QXhpc0Zyb21UcmFnZXRSb3coYXJncy50YXJnZXRSb3cpO1xyXG4gICAgICAgICAgICBsZXQgdGFyZ2V0Q2hhcnQgPSB0aGlzLmdldFRhcmdldENoYXJ0RnJvbVRhcmdldFJvdyhhcmdzLnRhcmdldFJvdyk7XHJcbiAgICAgICAgICAgIGRhdGFNb2RlbC5tb3ZlU2VyaWUoc291cmNlQ2hhcnQsIHNvdXJjZUF4aXMsIHNlcmllLCB0YXJnZXRDaGFydCwgdGFyZ2V0QXhpcywgZHJvcFBvc2l0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=