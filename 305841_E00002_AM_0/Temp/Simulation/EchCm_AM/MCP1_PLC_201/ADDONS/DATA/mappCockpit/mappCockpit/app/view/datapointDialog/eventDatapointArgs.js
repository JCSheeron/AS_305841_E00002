define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // specify the direction of the model change
    var DatapointAction;
    (function (DatapointAction) {
        DatapointAction[DatapointAction["add"] = 0] = "add";
        DatapointAction[DatapointAction["replace"] = 1] = "replace";
    })(DatapointAction || (DatapointAction = {}));
    exports.DatapointAction = DatapointAction;
    /**
     *
     *
     * @class EventModelChangedArgs
     */
    var EventDatapointArgs = /** @class */ (function () {
        function EventDatapointArgs(caller, action, dataPointInfo) {
            this.caller = caller;
            this.action = action;
            this.dataPointInfo = dataPointInfo;
        }
        return EventDatapointArgs;
    }());
    exports.EventDatapointArgs = EventDatapointArgs;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnREYXRhcG9pbnRBcmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC92aWV3L2RhdGFwb2ludERpYWxvZy9ldmVudERhdGFwb2ludEFyZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBRUEsNENBQTRDO0lBQzVDLElBQUssZUFHSjtJQUhELFdBQUssZUFBZTtRQUNoQixtREFBRyxDQUFBO1FBQ0gsMkRBQU8sQ0FBQTtJQUNYLENBQUMsRUFISSxlQUFlLEtBQWYsZUFBZSxRQUduQjtJQXFCUSwwQ0FBZTtJQW5CeEI7Ozs7T0FJRztJQUNIO1FBTUksNEJBQVksTUFBVyxFQUFFLE1BQXVCLEVBQUUsYUFBaUM7WUFDL0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDckIsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDdkMsQ0FBQztRQUVMLHlCQUFDO0lBQUQsQ0FBQyxBQVpELElBWUM7SUFFeUIsZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJhY2VEYXRhUG9pbnRJbmZvIH0gZnJvbSBcIi4uLy4uL21vZGVscy9kaWFnbm9zdGljcy90cmFjZS90cmFjZURhdGFQb2ludEluZm9cIjtcclxuXHJcbi8vIHNwZWNpZnkgdGhlIGRpcmVjdGlvbiBvZiB0aGUgbW9kZWwgY2hhbmdlXHJcbmVudW0gRGF0YXBvaW50QWN0aW9uIHtcclxuICAgIGFkZCxcclxuICAgIHJlcGxhY2UsXHJcbn1cclxuXHJcbi8qKlxyXG4gKlxyXG4gKlxyXG4gKiBAY2xhc3MgRXZlbnRNb2RlbENoYW5nZWRBcmdzXHJcbiAqL1xyXG5jbGFzcyBFdmVudERhdGFwb2ludEFyZ3Mge1xyXG5cclxuICAgIGFjdGlvbiE6IERhdGFwb2ludEFjdGlvbjtcclxuICAgIGNhbGxlcjogYW55O1xyXG4gICAgZGF0YVBvaW50SW5mbzogVHJhY2VEYXRhUG9pbnRJbmZvO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNhbGxlcjogYW55LCBhY3Rpb246IERhdGFwb2ludEFjdGlvbiwgZGF0YVBvaW50SW5mbzogVHJhY2VEYXRhUG9pbnRJbmZvKSB7XHJcbiAgICAgICAgdGhpcy5jYWxsZXIgPSBjYWxsZXI7XHJcbiAgICAgICAgdGhpcy5hY3Rpb24gPSBhY3Rpb247XHJcbiAgICAgICAgdGhpcy5kYXRhUG9pbnRJbmZvID0gZGF0YVBvaW50SW5mbztcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCB7IERhdGFwb2ludEFjdGlvbiwgRXZlbnREYXRhcG9pbnRBcmdzIH07Il19