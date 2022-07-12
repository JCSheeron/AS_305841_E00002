define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SignalAction;
    (function (SignalAction) {
        SignalAction[SignalAction["rename"] = 0] = "rename";
        SignalAction[SignalAction["dataPointsChanged"] = 1] = "dataPointsChanged";
        SignalAction[SignalAction["colorChanged"] = 2] = "colorChanged";
        SignalAction[SignalAction["startTriggerTimeChanged"] = 3] = "startTriggerTimeChanged";
    })(SignalAction = exports.SignalAction || (exports.SignalAction = {}));
    /**
     * Defines the event args of the signal
     *
     * @class EventSignalDataChangedArgs
     */
    var EventSignalDataChangedArgs = /** @class */ (function () {
        function EventSignalDataChangedArgs(action, data, oldData) {
            if (oldData === void 0) { oldData = undefined; }
            this.action = action;
            this.data = data;
            this.oldData = oldData;
        }
        return EventSignalDataChangedArgs;
    }());
    exports.EventSignalDataChangedArgs = EventSignalDataChangedArgs;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRTaWduYWxEYXRhQ2hhbmdlZEFyZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jb21tb24vc2lnbmFsL2V2ZW50U2lnbmFsRGF0YUNoYW5nZWRBcmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBLElBQVksWUFLWDtJQUxELFdBQVksWUFBWTtRQUNwQixtREFBTSxDQUFBO1FBQ04seUVBQWlCLENBQUE7UUFDakIsK0RBQVksQ0FBQTtRQUNaLHFGQUF1QixDQUFBO0lBQzNCLENBQUMsRUFMVyxZQUFZLEdBQVosb0JBQVksS0FBWixvQkFBWSxRQUt2QjtJQUVEOzs7O09BSUc7SUFDSDtRQU1JLG9DQUFZLE1BQW9CLEVBQUUsSUFBUyxFQUFFLE9BQXdCO1lBQXhCLHdCQUFBLEVBQUEsbUJBQXdCO1lBQ2pFLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQzNCLENBQUM7UUFFTCxpQ0FBQztJQUFELENBQUMsQUFaRCxJQVlDO0lBWlksZ0VBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGVudW0gU2lnbmFsQWN0aW9uIHtcclxuICAgIHJlbmFtZSxcclxuICAgIGRhdGFQb2ludHNDaGFuZ2VkLFxyXG4gICAgY29sb3JDaGFuZ2VkLFxyXG4gICAgc3RhcnRUcmlnZ2VyVGltZUNoYW5nZWQsXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZWZpbmVzIHRoZSBldmVudCBhcmdzIG9mIHRoZSBzaWduYWxcclxuICpcclxuICogQGNsYXNzIEV2ZW50U2lnbmFsRGF0YUNoYW5nZWRBcmdzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRXZlbnRTaWduYWxEYXRhQ2hhbmdlZEFyZ3Mge1xyXG5cclxuICAgIGFjdGlvbjogU2lnbmFsQWN0aW9uO1xyXG4gICAgZGF0YTogYW55O1xyXG4gICAgb2xkRGF0YTogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGFjdGlvbjogU2lnbmFsQWN0aW9uLCBkYXRhOiBhbnksIG9sZERhdGE6IGFueSA9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuYWN0aW9uID0gYWN0aW9uO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5vbGREYXRhID0gb2xkRGF0YTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19