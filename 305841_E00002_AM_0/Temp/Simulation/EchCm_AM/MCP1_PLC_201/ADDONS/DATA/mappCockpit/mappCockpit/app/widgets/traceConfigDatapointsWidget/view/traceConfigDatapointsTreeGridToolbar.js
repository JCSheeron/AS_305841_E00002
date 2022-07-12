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
define(["require", "exports", "../../../models/diagnostics/trace/traceDataPoint", "../../common/treeGridToolbarBase", "../../../common/directoryProvider"], function (require, exports, traceDataPoint_1, treeGridToolbarBase_1, directoryProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TraceConfigDatapointsTreeGridToolbar = /** @class */ (function (_super) {
        __extends(TraceConfigDatapointsTreeGridToolbar, _super);
        /**
         * Creates an instance of TraceConfigDatapointsTreeGridToolbar.
         * @param {HTMLDivElement} widgetMainDiv
         * @memberof TraceConfigDatapointsTreeGridToolbar
         */
        function TraceConfigDatapointsTreeGridToolbar(widgetMainDiv) {
            var _this = _super.call(this, widgetMainDiv) || this;
            _this._toolbarIdAdd = "Add";
            _this._toolbarTooltipAdd = "Adds a datapoint";
            _this._toolbarIdAddEmptyLine = "AddEmptyLine";
            _this._toolbarTooltipAddEmptyLine = "Adds an empty line";
            _this._toolbarIdRemoveLine = "RemoveLine";
            _this._toolbarTooltipRemoveLine = "Removes the selected line";
            var imageDirectory = "../../../" + directoryProvider_1.DirectoryProvider.getWidgetsDirectory() + "traceConfigDatapointsWidget/style/images/toolbar/";
            _this.addToolbarButton(_this._toolbarIdAdd, _this._toolbarTooltipAdd, imageDirectory + "add.svg");
            _this.addToolbarButton(_this._toolbarIdAddEmptyLine, _this._toolbarTooltipAddEmptyLine, imageDirectory + "addEmptyLine.svg");
            _this.addToolbarButton(_this._toolbarIdRemoveLine, _this._toolbarTooltipRemoveLine, imageDirectory + "removeLine.svg");
            return _this;
        }
        /**
         * Reacts on toolbar click
         *
         * @param {*} args
         * @param {TraceConfigDatapointsWidget} dataPointWidget
         * @memberof TraceConfigDatapointsTreeGridToolbar
         */
        TraceConfigDatapointsTreeGridToolbar.prototype.toolbarClick = function (args, dataPointWidget) {
            var clickedToolbarId = this.getClickedToolbarId(args.itemName, args.model.toolbarSettings);
            if (clickedToolbarId == this._toolbarIdAdd) {
                args.cancel = true;
                dataPointWidget.openDatapointDialog();
            }
            else if (clickedToolbarId == this._toolbarIdAddEmptyLine) {
                args.cancel = true;
                dataPointWidget.dataModel.addDatapoint(args.model.selectedRowIndex, traceDataPoint_1.TraceDataPoint.createSimpleDataPoint(""));
            }
            else if (clickedToolbarId == this._toolbarIdRemoveLine) {
                args.cancel = true;
                this.deleteSelectedDataPoint(args.model, dataPointWidget.dataModel);
            }
        };
        TraceConfigDatapointsTreeGridToolbar.prototype.initToolbarStates = function () {
            _super.prototype.initToolbarStates.call(this);
            // Disable buttons at startup
            this.disableAddButton(true);
            this.disableAddEmptyButton(true);
            this.disableRemoveButton(true);
        };
        TraceConfigDatapointsTreeGridToolbar.prototype.disableAddButton = function (disable) {
            this.disableButton(this._toolbarIdAdd, disable);
        };
        TraceConfigDatapointsTreeGridToolbar.prototype.disableAddEmptyButton = function (disable) {
            this.disableButton(this._toolbarIdAddEmptyLine, disable);
        };
        TraceConfigDatapointsTreeGridToolbar.prototype.disableRemoveButton = function (disable) {
            this.disableButton(this._toolbarIdRemoveLine, disable);
        };
        TraceConfigDatapointsTreeGridToolbar.prototype.deleteSelectedDataPoint = function (model, dataPointsDataModel) {
            var indexList = new Array();
            for (var i = model.selectedItems.length - 1; i >= 0; i--) {
                indexList.push(model.selectedItems[i].index);
            }
            if (indexList.length > 0) {
                dataPointsDataModel.removeDatapoints(indexList);
                var newSelectionIndex = indexList[indexList.length - 1];
                if (newSelectionIndex >= model.parentRecords.length) {
                    newSelectionIndex = model.parentRecords.length - 1;
                }
                var treeGridObj = this.getTreeGridObject();
                treeGridObj.option("selectedRowIndex", newSelectionIndex, true);
            }
        };
        return TraceConfigDatapointsTreeGridToolbar;
    }(treeGridToolbarBase_1.TreeGridToolbarBase));
    exports.TraceConfigDatapointsTreeGridToolbar = TraceConfigDatapointsTreeGridToolbar;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWdEYXRhcG9pbnRzVHJlZUdyaWRUb29sYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldC92aWV3L3RyYWNlQ29uZmlnRGF0YXBvaW50c1RyZWVHcmlkVG9vbGJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBTUE7UUFBMEQsd0RBQW1CO1FBV3pFOzs7O1dBSUc7UUFDSCw4Q0FBWSxhQUE2QjtZQUF6QyxZQUNJLGtCQUFNLGFBQWEsQ0FBQyxTQU92QjtZQXRCZ0IsbUJBQWEsR0FBRSxLQUFLLENBQUM7WUFDckIsd0JBQWtCLEdBQUUsa0JBQWtCLENBQUM7WUFFdkMsNEJBQXNCLEdBQUUsY0FBYyxDQUFDO1lBQ3ZDLGlDQUEyQixHQUFFLG9CQUFvQixDQUFDO1lBRWxELDBCQUFvQixHQUFFLFlBQVksQ0FBQztZQUNuQywrQkFBeUIsR0FBRSwyQkFBMkIsQ0FBQztZQVVwRSxJQUFJLGNBQWMsR0FBRyxXQUFXLEdBQUcscUNBQWlCLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxtREFBbUQsQ0FBQztZQUVqSSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSSxDQUFDLGFBQWEsRUFBRSxLQUFJLENBQUMsa0JBQWtCLEVBQUUsY0FBYyxHQUFHLFNBQVMsQ0FBQyxDQUFDO1lBQy9GLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFJLENBQUMsc0JBQXNCLEVBQUUsS0FBSSxDQUFDLDJCQUEyQixFQUFFLGNBQWMsR0FBRyxrQkFBa0IsQ0FBQyxDQUFDO1lBQzFILEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFJLENBQUMsb0JBQW9CLEVBQUUsS0FBSSxDQUFDLHlCQUF5QixFQUFFLGNBQWMsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDOztRQUN4SCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ksMkRBQVksR0FBbkIsVUFBcUIsSUFBSSxFQUFFLGVBQTRDO1lBQ25FLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUMzRixJQUFJLGdCQUFnQixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ3hDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUNuQixlQUFlLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzthQUN6QztpQkFDSSxJQUFJLGdCQUFnQixJQUFJLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtnQkFDdEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ2xCLGVBQWUsQ0FBQyxTQUE2QyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUFFLCtCQUFjLENBQUMscUJBQXFCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUN0SjtpQkFDSSxJQUFJLGdCQUFnQixJQUFJLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtnQkFDcEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ25CLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLGVBQWUsQ0FBQyxTQUE0QyxDQUFDLENBQUM7YUFDMUc7UUFDTCxDQUFDO1FBRU0sZ0VBQWlCLEdBQXhCO1lBQ0ksaUJBQU0saUJBQWlCLFdBQUUsQ0FBQztZQUUxQiw2QkFBNkI7WUFDN0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUVNLCtEQUFnQixHQUF2QixVQUF3QixPQUFnQjtZQUNwQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEQsQ0FBQztRQUVNLG9FQUFxQixHQUE1QixVQUE2QixPQUFnQjtZQUN6QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM3RCxDQUFDO1FBRU0sa0VBQW1CLEdBQTFCLFVBQTJCLE9BQWdCO1lBQ3ZDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzNELENBQUM7UUFFTyxzRUFBdUIsR0FBL0IsVUFBZ0MsS0FBSyxFQUFFLG1CQUFvRDtZQUN2RixJQUFJLFNBQVMsR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO1lBQ3BDLEtBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQ2xELFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNoRDtZQUNELElBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUM7Z0JBQ3BCLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNoRCxJQUFJLGlCQUFpQixHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0RCxJQUFHLGlCQUFpQixJQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFDO29CQUMvQyxpQkFBaUIsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUM7aUJBQ3BEO2dCQUNELElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUMzQyxXQUFXLENBQUMsTUFBTSxDQUFDLGtCQUFrQixFQUFFLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ25FO1FBQ0wsQ0FBQztRQUNMLDJDQUFDO0lBQUQsQ0FBQyxBQXJGRCxDQUEwRCx5Q0FBbUIsR0FxRjVFO0lBckZZLG9GQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyYWNlRGF0YVBvaW50IH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9kaWFnbm9zdGljcy90cmFjZS90cmFjZURhdGFQb2ludFwiO1xyXG5pbXBvcnQgeyBUcmVlR3JpZFRvb2xiYXJCYXNlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90cmVlR3JpZFRvb2xiYXJCYXNlXCI7XHJcbmltcG9ydCB7IERpcmVjdG9yeVByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9kaXJlY3RvcnlQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBUcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXQgfSBmcm9tIFwiLi4vdHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0XCI7XHJcbmltcG9ydCB7IElUcmFjZUNvbmZpZ0RhdGFwb2ludHNEYXRhTW9kZWwgfSBmcm9tIFwiLi4vbW9kZWwvdHJhY2VDb25maWdEYXRhcG9pbnRzRGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVHJhY2VDb25maWdEYXRhcG9pbnRzVHJlZUdyaWRUb29sYmFyIGV4dGVuZHMgVHJlZUdyaWRUb29sYmFyQmFzZXtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhcklkQWRkID1cIkFkZFwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhclRvb2x0aXBBZGQgPVwiQWRkcyBhIGRhdGFwb2ludFwiO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJJZEFkZEVtcHR5TGluZSA9XCJBZGRFbXB0eUxpbmVcIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJUb29sdGlwQWRkRW1wdHlMaW5lID1cIkFkZHMgYW4gZW1wdHkgbGluZVwiO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJJZFJlbW92ZUxpbmUgPVwiUmVtb3ZlTGluZVwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhclRvb2x0aXBSZW1vdmVMaW5lID1cIlJlbW92ZXMgdGhlIHNlbGVjdGVkIGxpbmVcIjtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFRyYWNlQ29uZmlnRGF0YXBvaW50c1RyZWVHcmlkVG9vbGJhci5cclxuICAgICAqIEBwYXJhbSB7SFRNTERpdkVsZW1lbnR9IHdpZGdldE1haW5EaXZcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ0RhdGFwb2ludHNUcmVlR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Iod2lkZ2V0TWFpbkRpdjogSFRNTERpdkVsZW1lbnQpe1xyXG4gICAgICAgIHN1cGVyKHdpZGdldE1haW5EaXYpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBpbWFnZURpcmVjdG9yeSA9IFwiLi4vLi4vLi4vXCIgKyBEaXJlY3RvcnlQcm92aWRlci5nZXRXaWRnZXRzRGlyZWN0b3J5KCkgKyBcInRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldC9zdHlsZS9pbWFnZXMvdG9vbGJhci9cIjtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmFkZFRvb2xiYXJCdXR0b24odGhpcy5fdG9vbGJhcklkQWRkLCB0aGlzLl90b29sYmFyVG9vbHRpcEFkZCwgaW1hZ2VEaXJlY3RvcnkgKyBcImFkZC5zdmdcIik7XHJcbiAgICAgICAgdGhpcy5hZGRUb29sYmFyQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZEFkZEVtcHR5TGluZSwgdGhpcy5fdG9vbGJhclRvb2x0aXBBZGRFbXB0eUxpbmUsIGltYWdlRGlyZWN0b3J5ICsgXCJhZGRFbXB0eUxpbmUuc3ZnXCIpO1xyXG4gICAgICAgIHRoaXMuYWRkVG9vbGJhckJ1dHRvbih0aGlzLl90b29sYmFySWRSZW1vdmVMaW5lLCB0aGlzLl90b29sYmFyVG9vbHRpcFJlbW92ZUxpbmUsIGltYWdlRGlyZWN0b3J5ICsgXCJyZW1vdmVMaW5lLnN2Z1wiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWN0cyBvbiB0b29sYmFyIGNsaWNrXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAcGFyYW0ge1RyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldH0gZGF0YVBvaW50V2lkZ2V0XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdEYXRhcG9pbnRzVHJlZUdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0b29sYmFyQ2xpY2sgKGFyZ3MsIGRhdGFQb2ludFdpZGdldDogVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0KXtcclxuICAgICAgICB2YXIgY2xpY2tlZFRvb2xiYXJJZCA9IHRoaXMuZ2V0Q2xpY2tlZFRvb2xiYXJJZChhcmdzLml0ZW1OYW1lLCBhcmdzLm1vZGVsLnRvb2xiYXJTZXR0aW5ncyk7XHJcbiAgICAgICAgaWYgKGNsaWNrZWRUb29sYmFySWQgPT0gdGhpcy5fdG9vbGJhcklkQWRkKSB7XHJcbiAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICAgICAgZGF0YVBvaW50V2lkZ2V0Lm9wZW5EYXRhcG9pbnREaWFsb2coKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY2xpY2tlZFRvb2xiYXJJZCA9PSB0aGlzLl90b29sYmFySWRBZGRFbXB0eUxpbmUpIHtcclxuICAgICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAoZGF0YVBvaW50V2lkZ2V0LmRhdGFNb2RlbCBhcyBJVHJhY2VDb25maWdEYXRhcG9pbnRzRGF0YU1vZGVsKS5hZGREYXRhcG9pbnQoYXJncy5tb2RlbC5zZWxlY3RlZFJvd0luZGV4LCBUcmFjZURhdGFQb2ludC5jcmVhdGVTaW1wbGVEYXRhUG9pbnQoXCJcIikpO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZWxzZSBpZiAoY2xpY2tlZFRvb2xiYXJJZCA9PSB0aGlzLl90b29sYmFySWRSZW1vdmVMaW5lKSB7XHJcbiAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5kZWxldGVTZWxlY3RlZERhdGFQb2ludChhcmdzLm1vZGVsLCBkYXRhUG9pbnRXaWRnZXQuZGF0YU1vZGVsIGFzIElUcmFjZUNvbmZpZ0RhdGFwb2ludHNEYXRhTW9kZWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGluaXRUb29sYmFyU3RhdGVzKCl7XHJcbiAgICAgICAgc3VwZXIuaW5pdFRvb2xiYXJTdGF0ZXMoKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBEaXNhYmxlIGJ1dHRvbnMgYXQgc3RhcnR1cFxyXG4gICAgICAgIHRoaXMuZGlzYWJsZUFkZEJ1dHRvbih0cnVlKTtcclxuICAgICAgICB0aGlzLmRpc2FibGVBZGRFbXB0eUJ1dHRvbih0cnVlKTtcclxuICAgICAgICB0aGlzLmRpc2FibGVSZW1vdmVCdXR0b24odHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc2FibGVBZGRCdXR0b24oZGlzYWJsZTogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZEFkZCwgZGlzYWJsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc2FibGVBZGRFbXB0eUJ1dHRvbihkaXNhYmxlOiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLmRpc2FibGVCdXR0b24odGhpcy5fdG9vbGJhcklkQWRkRW1wdHlMaW5lLCBkaXNhYmxlKTtcclxuICAgIH1cclxuICAgXHJcbiAgICBwdWJsaWMgZGlzYWJsZVJlbW92ZUJ1dHRvbihkaXNhYmxlOiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLmRpc2FibGVCdXR0b24odGhpcy5fdG9vbGJhcklkUmVtb3ZlTGluZSwgZGlzYWJsZSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgZGVsZXRlU2VsZWN0ZWREYXRhUG9pbnQobW9kZWwsIGRhdGFQb2ludHNEYXRhTW9kZWw6IElUcmFjZUNvbmZpZ0RhdGFwb2ludHNEYXRhTW9kZWwpe1xyXG4gICAgICAgIGxldCBpbmRleExpc3QgPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IG1vZGVsLnNlbGVjdGVkSXRlbXMubGVuZ3RoLTE7IGkgPj0gMDsgaS0tKXtcclxuICAgICAgICAgICAgaW5kZXhMaXN0LnB1c2gobW9kZWwuc2VsZWN0ZWRJdGVtc1tpXS5pbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGluZGV4TGlzdC5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgZGF0YVBvaW50c0RhdGFNb2RlbC5yZW1vdmVEYXRhcG9pbnRzKGluZGV4TGlzdCk7XHJcbiAgICAgICAgICAgIGxldCBuZXdTZWxlY3Rpb25JbmRleCA9IGluZGV4TGlzdFtpbmRleExpc3QubGVuZ3RoLTFdO1xyXG4gICAgICAgICAgICBpZihuZXdTZWxlY3Rpb25JbmRleCA+PSBtb2RlbC5wYXJlbnRSZWNvcmRzLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICBuZXdTZWxlY3Rpb25JbmRleCA9IG1vZGVsLnBhcmVudFJlY29yZHMubGVuZ3RoLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHRyZWVHcmlkT2JqID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG4gICAgICAgICAgICB0cmVlR3JpZE9iai5vcHRpb24oXCJzZWxlY3RlZFJvd0luZGV4XCIsIG5ld1NlbGVjdGlvbkluZGV4LCB0cnVlKTsgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19