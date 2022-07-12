define(["require", "exports", "../../../models/diagnostics/trace/traceDataPoint"], function (require, exports, traceDataPoint_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TraceConfigDatapointsTreeGridCellEditEvents = /** @class */ (function () {
        function TraceConfigDatapointsTreeGridCellEditEvents() {
        }
        /**
         * Start editing a cell
         *
         * @param {*} args
         * @memberof TraceConfigDatapointsTreeGridCellEditEvents
         */
        TraceConfigDatapointsTreeGridCellEditEvents.prototype.beginEdit = function (args) {
            // Only datapoint column can be edited (TODO: use column id instead of index)
            if (args.columnIndex != 0) {
                args.cancel = true;
            }
        };
        /**
         * End of editing a cell
         *
         * @param {*} args
         * @param {*} dataModel
         * @param {TraceDataPointInfo[]} availableTraceDataPoints
         * @returns
         * @memberof TraceConfigDatapointsTreeGridCellEditEvents
         */
        TraceConfigDatapointsTreeGridCellEditEvents.prototype.endEdit = function (args, dataModel, availableTraceDataPoints) {
            if (args.columnObject.field == "dataPointName") {
                // dataPointName has changed
                var tcDataPointsModel = dataModel;
                // Is datapoint already in datamodel
                if (tcDataPointsModel.dataPointAlreadyInList(args.value, args.rowIndex, false)) {
                    console.info("Datapoint already in list!");
                    args.cancel = true;
                    return;
                }
                // Found available datapoint for the given datapoint name    
                var dataPointInfo = availableTraceDataPoints.filter(function (datapoint) { return datapoint.fullname == args.value; })[0];
                var dataPoint = void 0;
                if (dataPointInfo == undefined) {
                    dataPoint = traceDataPoint_1.TraceDataPoint.createSimpleDataPoint(args.value);
                }
                else {
                    dataPoint = traceDataPoint_1.TraceDataPoint.createWithDataPointInfo(dataPointInfo);
                }
                // Replace the current datapoint with the new one
                tcDataPointsModel.replaceDatapoint(args.rowIndex, dataPoint, false);
            }
        };
        return TraceConfigDatapointsTreeGridCellEditEvents;
    }());
    exports.TraceConfigDatapointsTreeGridCellEditEvents = TraceConfigDatapointsTreeGridCellEditEvents;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWdEYXRhcG9pbnRzVHJlZUdyaWRDZWxsRWRpdEV2ZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy90cmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXQvdmlldy90cmFjZUNvbmZpZ0RhdGFwb2ludHNUcmVlR3JpZENlbGxFZGl0RXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUlBO1FBQUE7UUErQ0EsQ0FBQztRQTlDRzs7Ozs7V0FLRztRQUNILCtEQUFTLEdBQVQsVUFBVSxJQUFJO1lBQ1YsNkVBQTZFO1lBQzdFLElBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLEVBQUM7Z0JBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2FBQ3RCO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0gsNkRBQU8sR0FBUCxVQUFRLElBQUksRUFBRSxTQUFTLEVBQUUsd0JBQThDO1lBQ25FLElBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLElBQUksZUFBZSxFQUFDO2dCQUMxQyw0QkFBNEI7Z0JBQzVCLElBQUksaUJBQWlCLEdBQW9DLFNBQVMsQ0FBQztnQkFDbkUsb0NBQW9DO2dCQUNwQyxJQUFHLGlCQUFpQixDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsRUFBQztvQkFDMUUsT0FBTyxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO29CQUMzQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztvQkFDbkIsT0FBTztpQkFDVjtnQkFDRCw2REFBNkQ7Z0JBQzdELElBQUksYUFBYSxHQUFHLHdCQUF3QixDQUFDLE1BQU0sQ0FBQyxVQUFDLFNBQVMsSUFBTyxPQUFPLFNBQVMsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsSCxJQUFJLFNBQVMsU0FBQSxDQUFDO2dCQUNkLElBQUcsYUFBYSxJQUFJLFNBQVMsRUFBQztvQkFDMUIsU0FBUyxHQUFHLCtCQUFjLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNoRTtxQkFDRztvQkFDQSxTQUFTLEdBQUcsK0JBQWMsQ0FBQyx1QkFBdUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztpQkFDckU7Z0JBRUQsaURBQWlEO2dCQUNqRCxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUN2RTtRQUNMLENBQUM7UUFDTCxrREFBQztJQUFELENBQUMsQUEvQ0QsSUErQ0M7SUEvQ1ksa0dBQTJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJhY2VEYXRhUG9pbnQgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2RpYWdub3N0aWNzL3RyYWNlL3RyYWNlRGF0YVBvaW50XCI7XHJcbmltcG9ydCB7IFRyYWNlRGF0YVBvaW50SW5mbyB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvdHJhY2VEYXRhUG9pbnRJbmZvXCI7XHJcbmltcG9ydCB7IElUcmFjZUNvbmZpZ0RhdGFwb2ludHNEYXRhTW9kZWwgfSBmcm9tIFwiLi4vbW9kZWwvdHJhY2VDb25maWdEYXRhcG9pbnRzRGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVHJhY2VDb25maWdEYXRhcG9pbnRzVHJlZUdyaWRDZWxsRWRpdEV2ZW50c3tcclxuICAgIC8qKlxyXG4gICAgICogU3RhcnQgZWRpdGluZyBhIGNlbGxcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ0RhdGFwb2ludHNUcmVlR3JpZENlbGxFZGl0RXZlbnRzXHJcbiAgICAgKi9cclxuICAgIGJlZ2luRWRpdChhcmdzKXtcclxuICAgICAgICAvLyBPbmx5IGRhdGFwb2ludCBjb2x1bW4gY2FuIGJlIGVkaXRlZCAoVE9ETzogdXNlIGNvbHVtbiBpZCBpbnN0ZWFkIG9mIGluZGV4KVxyXG4gICAgICAgIGlmKGFyZ3MuY29sdW1uSW5kZXggIT0gMCl7XHJcbiAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFbmQgb2YgZWRpdGluZyBhIGNlbGxcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBwYXJhbSB7Kn0gZGF0YU1vZGVsXHJcbiAgICAgKiBAcGFyYW0ge1RyYWNlRGF0YVBvaW50SW5mb1tdfSBhdmFpbGFibGVUcmFjZURhdGFQb2ludHNcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdEYXRhcG9pbnRzVHJlZUdyaWRDZWxsRWRpdEV2ZW50c1xyXG4gICAgICovXHJcbiAgICBlbmRFZGl0KGFyZ3MsIGRhdGFNb2RlbCwgYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzOiBUcmFjZURhdGFQb2ludEluZm9bXSl7XHJcbiAgICAgICAgaWYoYXJncy5jb2x1bW5PYmplY3QuZmllbGQgPT0gXCJkYXRhUG9pbnROYW1lXCIpe1xyXG4gICAgICAgICAgICAvLyBkYXRhUG9pbnROYW1lIGhhcyBjaGFuZ2VkXHJcbiAgICAgICAgICAgIGxldCB0Y0RhdGFQb2ludHNNb2RlbCA9IDxJVHJhY2VDb25maWdEYXRhcG9pbnRzRGF0YU1vZGVsPmRhdGFNb2RlbDtcclxuICAgICAgICAgICAgLy8gSXMgZGF0YXBvaW50IGFscmVhZHkgaW4gZGF0YW1vZGVsXHJcbiAgICAgICAgICAgIGlmKHRjRGF0YVBvaW50c01vZGVsLmRhdGFQb2ludEFscmVhZHlJbkxpc3QoYXJncy52YWx1ZSwgYXJncy5yb3dJbmRleCwgZmFsc2UpKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhcIkRhdGFwb2ludCBhbHJlYWR5IGluIGxpc3QhXCIpO1xyXG4gICAgICAgICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIEZvdW5kIGF2YWlsYWJsZSBkYXRhcG9pbnQgZm9yIHRoZSBnaXZlbiBkYXRhcG9pbnQgbmFtZSAgICBcclxuICAgICAgICAgICAgbGV0IGRhdGFQb2ludEluZm8gPSBhdmFpbGFibGVUcmFjZURhdGFQb2ludHMuZmlsdGVyKChkYXRhcG9pbnQpID0+IHsgcmV0dXJuIGRhdGFwb2ludC5mdWxsbmFtZSA9PSBhcmdzLnZhbHVlfSlbMF07XHJcbiAgICAgICAgICAgIGxldCBkYXRhUG9pbnQ7XHJcbiAgICAgICAgICAgIGlmKGRhdGFQb2ludEluZm8gPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGRhdGFQb2ludCA9IFRyYWNlRGF0YVBvaW50LmNyZWF0ZVNpbXBsZURhdGFQb2ludChhcmdzLnZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNleyAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZGF0YVBvaW50ID0gVHJhY2VEYXRhUG9pbnQuY3JlYXRlV2l0aERhdGFQb2ludEluZm8oZGF0YVBvaW50SW5mbyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFJlcGxhY2UgdGhlIGN1cnJlbnQgZGF0YXBvaW50IHdpdGggdGhlIG5ldyBvbmVcclxuICAgICAgICAgICAgdGNEYXRhUG9pbnRzTW9kZWwucmVwbGFjZURhdGFwb2ludChhcmdzLnJvd0luZGV4LCBkYXRhUG9pbnQsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19