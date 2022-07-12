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
define(["require", "exports", "../framework/events"], function (require, exports, events_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // specify the direction of the model change
    var ModelChangeType;
    (function (ModelChangeType) {
        ModelChangeType[ModelChangeType["updateTarget"] = 0] = "updateTarget";
        ModelChangeType[ModelChangeType["updateSource"] = 1] = "updateSource";
    })(ModelChangeType || (ModelChangeType = {}));
    exports.ModelChangeType = ModelChangeType;
    /**
     *
     *
     * @class EventModelChangedArgs
     */
    var EventModelChangedArgs = /** @class */ (function () {
        /**
         *Creates an instance of EventModelChangedArgs.
         * @param {*} caller instance which invoked the change
         * @param {ModelChangeType} changeType the change direction
         * @param {*} hint additional info describing what has changed
         * @param {*} data additional data describing/containing the changed data
         * @memberof EventModelChangedArgs
         */
        function EventModelChangedArgs(caller, changeType, hint, data) {
            if (hint === void 0) { hint = {}; }
            if (data === void 0) { data = {}; }
            this.caller = caller;
            this.changeType = changeType;
            this.data = data;
            this.hint = hint;
        }
        return EventModelChangedArgs;
    }());
    exports.EventModelChangedArgs = EventModelChangedArgs;
    // Declare the model changed event
    var EventModelChanged = /** @class */ (function (_super) {
        __extends(EventModelChanged, _super);
        function EventModelChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventModelChanged;
    }(events_1.TypedEvent));
    exports.EventModelChanged = EventModelChanged;
    ;
    var EventModelItemsChanged = /** @class */ (function (_super) {
        __extends(EventModelItemsChanged, _super);
        function EventModelItemsChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventModelItemsChanged;
    }(events_1.TypedEvent));
    exports.EventModelItemsChanged = EventModelItemsChanged;
    ;
    var EventModelInitialized = /** @class */ (function (_super) {
        __extends(EventModelInitialized, _super);
        function EventModelInitialized() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventModelInitialized;
    }(events_1.TypedEvent));
    exports.EventModelInitialized = EventModelInitialized;
    ;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YU1vZGVsSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvZGF0YU1vZGVsSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFHQSw0Q0FBNEM7SUFDNUMsSUFBSyxlQUdKO0lBSEQsV0FBSyxlQUFlO1FBQ2hCLHFFQUFZLENBQUE7UUFDWixxRUFBWSxDQUFBO0lBQ2hCLENBQUMsRUFISSxlQUFlLEtBQWYsZUFBZSxRQUduQjtJQXVGNEcsMENBQWU7SUFyRjVIOzs7O09BSUc7SUFDSDtRQU9JOzs7Ozs7O1dBT0c7UUFDSCwrQkFBWSxNQUFXLEVBQUUsVUFBMkIsRUFBQyxJQUFZLEVBQUMsSUFBWTtZQUF6QixxQkFBQSxFQUFBLFNBQVk7WUFBQyxxQkFBQSxFQUFBLFNBQVk7WUFDMUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDN0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFFckIsQ0FBQztRQUNMLDRCQUFDO0lBQUQsQ0FBQyxBQXRCRCxJQXNCQztJQTBENkgsc0RBQXFCO0lBeERuSixrQ0FBa0M7SUFDbEM7UUFBZ0MscUNBQTZDO1FBQTdFOztRQUErRSxDQUFDO1FBQUQsd0JBQUM7SUFBRCxDQUFDLEFBQWhGLENBQWdDLG1CQUFVLEdBQXNDO0lBdURwQyw4Q0FBaUI7SUF2RG1CLENBQUM7SUFDakY7UUFBcUMsMENBQTZDO1FBQWxGOztRQUFvRixDQUFDO1FBQUQsNkJBQUM7SUFBRCxDQUFDLEFBQXJGLENBQXFDLG1CQUFVLEdBQXNDO0lBc0R0Qix3REFBc0I7SUF0REEsQ0FBQztJQUN0RjtRQUFvQyx5Q0FBb0I7UUFBeEQ7O1FBQTBELENBQUM7UUFBRCw0QkFBQztJQUFELENBQUMsQUFBM0QsQ0FBb0MsbUJBQVUsR0FBYTtJQXFEMkIsc0RBQXFCO0lBckRoRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IElDb21wb25lbnQgfSBmcm9tIFwiLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvaW50ZXJmYWNlcy9jb21wb25lbnRJbnRlcmZhY2VcIjtcclxuXHJcbi8vIHNwZWNpZnkgdGhlIGRpcmVjdGlvbiBvZiB0aGUgbW9kZWwgY2hhbmdlXHJcbmVudW0gTW9kZWxDaGFuZ2VUeXBlIHtcclxuICAgIHVwZGF0ZVRhcmdldCxcclxuICAgIHVwZGF0ZVNvdXJjZSxcclxufVxyXG5cclxuLyoqXHJcbiAqXHJcbiAqXHJcbiAqIEBjbGFzcyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3NcclxuICovXHJcbmNsYXNzIEV2ZW50TW9kZWxDaGFuZ2VkQXJncyB7XHJcblxyXG4gICAgY2hhbmdlVHlwZSE6IE1vZGVsQ2hhbmdlVHlwZTtcclxuICAgIGNhbGxlcjogYW55O1xyXG4gICAgaGludDogYW55O1xyXG4gICAgZGF0YTogYW55O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICpDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEV2ZW50TW9kZWxDaGFuZ2VkQXJncy5cclxuICAgICAqIEBwYXJhbSB7Kn0gY2FsbGVyIGluc3RhbmNlIHdoaWNoIGludm9rZWQgdGhlIGNoYW5nZVxyXG4gICAgICogQHBhcmFtIHtNb2RlbENoYW5nZVR5cGV9IGNoYW5nZVR5cGUgdGhlIGNoYW5nZSBkaXJlY3Rpb25cclxuICAgICAqIEBwYXJhbSB7Kn0gaGludCBhZGRpdGlvbmFsIGluZm8gZGVzY3JpYmluZyB3aGF0IGhhcyBjaGFuZ2VkXHJcbiAgICAgKiBAcGFyYW0geyp9IGRhdGEgYWRkaXRpb25hbCBkYXRhIGRlc2NyaWJpbmcvY29udGFpbmluZyB0aGUgY2hhbmdlZCBkYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgRXZlbnRNb2RlbENoYW5nZWRBcmdzXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGNhbGxlcjogYW55LCBjaGFuZ2VUeXBlOiBNb2RlbENoYW5nZVR5cGUsaGludDogYW55PXt9LGRhdGE6IGFueT17fSkge1xyXG4gICAgICAgIHRoaXMuY2FsbGVyID0gY2FsbGVyO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlVHlwZSA9IGNoYW5nZVR5cGU7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgICAgICB0aGlzLmhpbnQgPSBoaW50O1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuLy8gRGVjbGFyZSB0aGUgbW9kZWwgY2hhbmdlZCBldmVudFxyXG5jbGFzcyBFdmVudE1vZGVsQ2hhbmdlZCBleHRlbmRzIFR5cGVkRXZlbnQ8SURhdGFNb2RlbCwgRXZlbnRNb2RlbENoYW5nZWRBcmdzPnsgfTtcclxuY2xhc3MgRXZlbnRNb2RlbEl0ZW1zQ2hhbmdlZCBleHRlbmRzIFR5cGVkRXZlbnQ8SURhdGFNb2RlbCwgRXZlbnRNb2RlbENoYW5nZWRBcmdzPnsgfTtcclxuY2xhc3MgRXZlbnRNb2RlbEluaXRpYWxpemVkIGV4dGVuZHMgVHlwZWRFdmVudDxhbnksIGFueT57IH07XHJcblxyXG4vKipcclxuICogc3BlY2lmaWVzIHRoZSBkYXRhIG1vZGVsIGludGVyZmFjZVxyXG4gKlxyXG4gKiBAaW50ZXJmYWNlIElEYXRhTW9kZWxcclxuICovXHJcbmludGVyZmFjZSBJRGF0YU1vZGVsIGV4dGVuZHMgSURhdGFNb2RlbEl0ZW1PYnNlcnZlciwgSUNvbXBvbmVudCB7XHJcblxyXG4gICAgZGF0YTogYW55O1xyXG4gICAgZGF0YVNvdXJjZTogYW55O1xyXG5cclxuICAgIGV2ZW50TW9kZWxDaGFuZ2VkOiBFdmVudE1vZGVsQ2hhbmdlZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIGluaXRpYWxpemVzIHRoZSBkYXRhIG1vZGVsXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIElEYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZSgpOiB2b2lkO1xyXG4gICAgXHJcbiAgICBjbGVhcigpO1xyXG5cclxuICAgIGRpc3Bvc2UoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIGZvcmNlcyBhbiB1cGRhdGUgb2YgdGhlIHdob2xlIGRhdGEgbW9kZWxcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgSURhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBjb25uZWN0KGNvbXBvbmVudE5hbWU6IHN0cmluZyk6IHZvaWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBub3RpZmllcyBvdGhlciBsaXN0ZW5lcnMgZnJvbSBhIG1vZGVsIGNoYW5nZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SURhdGFNb2RlbH0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50TW9kZWxDaGFuZ2VkQXJnc30gZGF0YVxyXG4gICAgICogQG1lbWJlcm9mIElEYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgb25Nb2RlbENoYW5nZWQoc2VuZGVyOiBJRGF0YU1vZGVsLCBkYXRhOiBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MpO1xyXG4gICAgaGFuZGxlTW9kZWxDaGFuZ2VkKHNlbmRlcjogSURhdGFNb2RlbCwgZGF0YTogRXZlbnRNb2RlbENoYW5nZWRBcmdzKTtcclxuXHJcbn1cclxuXHJcbmludGVyZmFjZSBJRGF0YU1vZGVsSXRlbU9ic2VydmVyIHtcclxuICAgIGV2ZW50TW9kZWxJdGVtc0NoYW5nZWQ6IEV2ZW50TW9kZWxJdGVtc0NoYW5nZWQ7XHJcbiAgICBvYnNlcnZlTW9kZWxJdGVtcyhvYnNlcnZhYmxlSXRlbXM6QXJyYXk8YW55Pik7XHJcbiAgICBvbk1vZGVsSXRlbXNDaGFuZ2VkKHNlbmRlcjogSURhdGFNb2RlbCwgZGF0YTogRXZlbnRNb2RlbENoYW5nZWRBcmdzKTtcclxuICAgIGhhbmRsZU1vZGVsSXRlbXNDaGFuZ2VkKHNlbmRlcjogSURhdGFNb2RlbCwgZGF0YTogRXZlbnRNb2RlbENoYW5nZWRBcmdzKTtcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgeyBJRGF0YU1vZGVsLCBJRGF0YU1vZGVsSXRlbU9ic2VydmVyLEV2ZW50TW9kZWxDaGFuZ2VkLCBFdmVudE1vZGVsSXRlbXNDaGFuZ2VkLEV2ZW50TW9kZWxJbml0aWFsaXplZCwgTW9kZWxDaGFuZ2VUeXBlLCBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MgfTsiXX0=