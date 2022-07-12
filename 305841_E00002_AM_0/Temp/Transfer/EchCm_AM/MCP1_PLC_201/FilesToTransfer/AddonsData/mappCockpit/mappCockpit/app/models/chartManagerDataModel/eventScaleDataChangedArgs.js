define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ScaleAction;
    (function (ScaleAction) {
        ScaleAction[ScaleAction["yRangeChanged"] = 0] = "yRangeChanged";
        ScaleAction[ScaleAction["xRangeChanged"] = 1] = "xRangeChanged";
    })(ScaleAction = exports.ScaleAction || (exports.ScaleAction = {}));
    /**
     * Defines the event args of the signal
     *
     * @class EventSerieDataChangedArgs
     */
    var EventScaleDataChangedArgs = /** @class */ (function () {
        function EventScaleDataChangedArgs(action, data, oldData) {
            if (oldData === void 0) { oldData = undefined; }
            this.action = action;
            this.data = data;
            this.oldData = oldData;
        }
        return EventScaleDataChangedArgs;
    }());
    exports.EventScaleDataChangedArgs = EventScaleDataChangedArgs;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRTY2FsZURhdGFDaGFuZ2VkQXJncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9ldmVudFNjYWxlRGF0YUNoYW5nZWRBcmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBLElBQVksV0FHWDtJQUhELFdBQVksV0FBVztRQUNwQiwrREFBYSxDQUFBO1FBQ2IsK0RBQWEsQ0FBQTtJQUNoQixDQUFDLEVBSFcsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFHdEI7SUFFRDs7OztPQUlHO0lBQ0g7UUFNSSxtQ0FBWSxNQUFtQixFQUFFLElBQVMsRUFBRSxPQUF3QjtZQUF4Qix3QkFBQSxFQUFBLG1CQUF3QjtZQUNoRSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUMzQixDQUFDO1FBRUwsZ0NBQUM7SUFBRCxDQUFDLEFBWkQsSUFZQztJQVpZLDhEQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBlbnVtIFNjYWxlQWN0aW9uIHtcclxuICAgeVJhbmdlQ2hhbmdlZCxcclxuICAgeFJhbmdlQ2hhbmdlZFxyXG59XHJcblxyXG4vKipcclxuICogRGVmaW5lcyB0aGUgZXZlbnQgYXJncyBvZiB0aGUgc2lnbmFsXHJcbiAqXHJcbiAqIEBjbGFzcyBFdmVudFNlcmllRGF0YUNoYW5nZWRBcmdzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRXZlbnRTY2FsZURhdGFDaGFuZ2VkQXJncyB7XHJcblxyXG4gICAgYWN0aW9uOiBTY2FsZUFjdGlvbjtcclxuICAgIGRhdGE6IGFueTtcclxuICAgIG9sZERhdGE6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhY3Rpb246IFNjYWxlQWN0aW9uLCBkYXRhOiBhbnksIG9sZERhdGE6IGFueSA9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuYWN0aW9uID0gYWN0aW9uO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5vbGREYXRhID0gb2xkRGF0YTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19