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
define(["require", "exports", "../../../framework/events"], function (require, exports, events_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventDataAvailable = /** @class */ (function (_super) {
        __extends(EventDataAvailable, _super);
        function EventDataAvailable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventDataAvailable;
    }(events_1.TypedEvent));
    exports.EventDataAvailable = EventDataAvailable;
    ;
    var EventDataLoadingProgress = /** @class */ (function (_super) {
        __extends(EventDataLoadingProgress, _super);
        function EventDataLoadingProgress() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventDataLoadingProgress;
    }(events_1.TypedEvent));
    exports.EventDataLoadingProgress = EventDataLoadingProgress;
    ;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyRGF0YVByb3ZpZGVySW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2xvZ2dlcldpZGdldC9pbnRlcmZhY2VzL2xvZ2dlckRhdGFQcm92aWRlckludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBR0E7UUFBd0Msc0NBQW9DO1FBQTVFOztRQUE4RSxDQUFDO1FBQUQseUJBQUM7SUFBRCxDQUFDLEFBQS9FLENBQXdDLG1CQUFVLEdBQTZCO0lBQWxFLGdEQUFrQjtJQUFnRCxDQUFDO0lBQ2hGO1FBQThDLDRDQUF3RDtRQUF0Rzs7UUFBd0csQ0FBQztRQUFELCtCQUFDO0lBQUQsQ0FBQyxBQUF6RyxDQUE4QyxtQkFBVSxHQUFpRDtJQUE1Riw0REFBd0I7SUFBb0UsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFR5cGVkRXZlbnQgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2V2ZW50c1wiO1xyXG5pbXBvcnQgeyBEYXRhTG9hZGluZ1Byb2dyZXNzQXJncyB9IGZyb20gXCIuLi9kYXRhTG9hZGluZ1Byb2dyZXNzQXJnc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEV2ZW50RGF0YUF2YWlsYWJsZSBleHRlbmRzIFR5cGVkRXZlbnQ8SUxvZ2dlckRhdGFQcm92aWRlciwgYW55PnsgfTtcclxuZXhwb3J0IGNsYXNzIEV2ZW50RGF0YUxvYWRpbmdQcm9ncmVzcyBleHRlbmRzIFR5cGVkRXZlbnQ8SUxvZ2dlckRhdGFQcm92aWRlciwgRGF0YUxvYWRpbmdQcm9ncmVzc0FyZ3M+eyB9O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTG9nZ2VyRGF0YVByb3ZpZGVye1xyXG4gICAgLyoqXHJcbiAgICAgKiBSYWlzZWQgd2hlbiBuZXcgZGF0YSBpcyBhdmFpbGFibGVcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7RXZlbnREYXRhQXZhaWxhYmxlfVxyXG4gICAgICogQG1lbWJlcm9mIElMb2dnZXJEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgZXZlbnREYXRhQXZhaWxhYmxlOiBFdmVudERhdGFBdmFpbGFibGU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSYWlzZWQgd2hlbiBkYXRhIGxvYWRpbmcgcHJvZ3Jlc3MgY2hhbmdlZFxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtFdmVudERhdGFMb2FkaW5nUHJvZ3Jlc3N9XHJcbiAgICAgKiBAbWVtYmVyb2YgSUxvZ2dlckRhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBldmVudERhdGFMb2FkaW5nUHJvZ3Jlc3NDaGFuZ2VkOiBFdmVudERhdGFMb2FkaW5nUHJvZ3Jlc3M7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGxvYWRzIGxvZ2dlciBkYXRhIGZyb20gdGFyZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIElMb2dnZXJEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgdXBsb2FkRGF0YUZyb21UYXJnZXQoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEltcG9ydHMgbG9nZ2VyIGRhdGEgZnJvbSBmaWxlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIElMb2dnZXJEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgaW1wb3J0RGF0YUZyb21GaWxlKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeHBvcnQgbG9nZ2VyIGRhdGEgdG8gZmlsZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QmxvYn0gZGF0YVxyXG4gICAgICogQG1lbWJlcm9mIElMb2dnZXJEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgZXhwb3J0RGF0YVRvRmlsZShkYXRhOiBCbG9iKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIGlzIGFuIGV4cG9ydCBwb3NzaWJsZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIElMb2dnZXJEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgaXNFeHBvcnRQb3NzaWJsZSgpOiBib29sZWFuO1xyXG59Il19