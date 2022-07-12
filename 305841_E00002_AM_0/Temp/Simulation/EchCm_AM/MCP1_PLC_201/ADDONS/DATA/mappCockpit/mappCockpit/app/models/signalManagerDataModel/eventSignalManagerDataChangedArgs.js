define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // specify the action of the model change
    var SignalManagerAction;
    (function (SignalManagerAction) {
        SignalManagerAction[SignalManagerAction["add"] = 0] = "add";
        SignalManagerAction[SignalManagerAction["remove"] = 1] = "remove";
        SignalManagerAction[SignalManagerAction["valueChanged"] = 2] = "valueChanged";
        SignalManagerAction[SignalManagerAction["clearAll"] = 3] = "clearAll";
        SignalManagerAction[SignalManagerAction["colorChanged"] = 4] = "colorChanged";
    })(SignalManagerAction = exports.SignalManagerAction || (exports.SignalManagerAction = {}));
    /**
     * Define the event args of the signal manager
     *
     * @class EventSignalManagerDataChangedArgs
     */
    var EventSignalManagerDataChangedArgs = /** @class */ (function () {
        function EventSignalManagerDataChangedArgs(action, data, oldData) {
            if (oldData === void 0) { oldData = undefined; }
            this.action = action;
            this.data = data;
            this.oldData = oldData;
        }
        return EventSignalManagerDataChangedArgs;
    }());
    exports.EventSignalManagerDataChangedArgs = EventSignalManagerDataChangedArgs;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRTaWduYWxNYW5hZ2VyRGF0YUNoYW5nZWRBcmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9ldmVudFNpZ25hbE1hbmFnZXJEYXRhQ2hhbmdlZEFyZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBQUEseUNBQXlDO0lBQ3pDLElBQVksbUJBTVg7SUFORCxXQUFZLG1CQUFtQjtRQUMzQiwyREFBRyxDQUFBO1FBQ0gsaUVBQU0sQ0FBQTtRQUNOLDZFQUFZLENBQUE7UUFDWixxRUFBUSxDQUFBO1FBQ1IsNkVBQVksQ0FBQTtJQUNoQixDQUFDLEVBTlcsbUJBQW1CLEdBQW5CLDJCQUFtQixLQUFuQiwyQkFBbUIsUUFNOUI7SUFFRDs7OztPQUlHO0lBQ0g7UUFNSSwyQ0FBWSxNQUEyQixFQUFFLElBQVMsRUFBRSxPQUF3QjtZQUF4Qix3QkFBQSxFQUFBLG1CQUF3QjtZQUN4RSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUMzQixDQUFDO1FBRUwsd0NBQUM7SUFBRCxDQUFDLEFBWkQsSUFZQztJQVpZLDhFQUFpQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHNwZWNpZnkgdGhlIGFjdGlvbiBvZiB0aGUgbW9kZWwgY2hhbmdlXHJcbmV4cG9ydCBlbnVtIFNpZ25hbE1hbmFnZXJBY3Rpb24ge1xyXG4gICAgYWRkLFxyXG4gICAgcmVtb3ZlLFxyXG4gICAgdmFsdWVDaGFuZ2VkLFxyXG4gICAgY2xlYXJBbGwsXHJcbiAgICBjb2xvckNoYW5nZWQsXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZWZpbmUgdGhlIGV2ZW50IGFyZ3Mgb2YgdGhlIHNpZ25hbCBtYW5hZ2VyXHJcbiAqXHJcbiAqIEBjbGFzcyBFdmVudFNpZ25hbE1hbmFnZXJEYXRhQ2hhbmdlZEFyZ3NcclxuICovXHJcbmV4cG9ydCBjbGFzcyBFdmVudFNpZ25hbE1hbmFnZXJEYXRhQ2hhbmdlZEFyZ3Mge1xyXG5cclxuICAgIGFjdGlvbjogU2lnbmFsTWFuYWdlckFjdGlvbjtcclxuICAgIGRhdGE6IGFueTtcclxuICAgIG9sZERhdGE6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhY3Rpb246IFNpZ25hbE1hbmFnZXJBY3Rpb24sIGRhdGE6IGFueSwgb2xkRGF0YTogYW55ID0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5hY3Rpb24gPSBhY3Rpb247XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgICAgICB0aGlzLm9sZERhdGEgPSBvbGREYXRhO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=