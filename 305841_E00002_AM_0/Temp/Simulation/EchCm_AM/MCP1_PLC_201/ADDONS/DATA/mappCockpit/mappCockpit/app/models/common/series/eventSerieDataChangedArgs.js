define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SerieAction;
    (function (SerieAction) {
        SerieAction[SerieAction["rename"] = 0] = "rename";
        SerieAction[SerieAction["dataPointsChanged"] = 1] = "dataPointsChanged";
        SerieAction[SerieAction["colorChanged"] = 2] = "colorChanged";
        SerieAction[SerieAction["startTriggerTimeChanged"] = 3] = "startTriggerTimeChanged";
    })(SerieAction = exports.SerieAction || (exports.SerieAction = {}));
    /**
     * Defines the event args of the signal
     *
     * @class EventSerieDataChangedArgs
     */
    var EventSerieDataChangedArgs = /** @class */ (function () {
        function EventSerieDataChangedArgs(action, data, oldData) {
            if (oldData === void 0) { oldData = undefined; }
            this.action = action;
            this.data = data;
            this.oldData = oldData;
        }
        return EventSerieDataChangedArgs;
    }());
    exports.EventSerieDataChangedArgs = EventSerieDataChangedArgs;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRTZXJpZURhdGFDaGFuZ2VkQXJncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9zZXJpZXMvZXZlbnRTZXJpZURhdGFDaGFuZ2VkQXJncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFBQSxJQUFZLFdBS1g7SUFMRCxXQUFZLFdBQVc7UUFDbkIsaURBQU0sQ0FBQTtRQUNOLHVFQUFpQixDQUFBO1FBQ2pCLDZEQUFZLENBQUE7UUFDWixtRkFBdUIsQ0FBQTtJQUMzQixDQUFDLEVBTFcsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFLdEI7SUFFRDs7OztPQUlHO0lBQ0g7UUFNSSxtQ0FBWSxNQUFtQixFQUFFLElBQVMsRUFBRSxPQUF3QjtZQUF4Qix3QkFBQSxFQUFBLG1CQUF3QjtZQUNoRSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUMzQixDQUFDO1FBRUwsZ0NBQUM7SUFBRCxDQUFDLEFBWkQsSUFZQztJQVpZLDhEQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBlbnVtIFNlcmllQWN0aW9uIHtcclxuICAgIHJlbmFtZSxcclxuICAgIGRhdGFQb2ludHNDaGFuZ2VkLFxyXG4gICAgY29sb3JDaGFuZ2VkLFxyXG4gICAgc3RhcnRUcmlnZ2VyVGltZUNoYW5nZWQsXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZWZpbmVzIHRoZSBldmVudCBhcmdzIG9mIHRoZSBzaWduYWxcclxuICpcclxuICogQGNsYXNzIEV2ZW50U2VyaWVEYXRhQ2hhbmdlZEFyZ3NcclxuICovXHJcbmV4cG9ydCBjbGFzcyBFdmVudFNlcmllRGF0YUNoYW5nZWRBcmdzIHtcclxuXHJcbiAgICBhY3Rpb246IFNlcmllQWN0aW9uO1xyXG4gICAgZGF0YTogYW55O1xyXG4gICAgb2xkRGF0YTogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGFjdGlvbjogU2VyaWVBY3Rpb24sIGRhdGE6IGFueSwgb2xkRGF0YTogYW55ID0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5hY3Rpb24gPSBhY3Rpb247XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgICAgICB0aGlzLm9sZERhdGEgPSBvbGREYXRhO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=