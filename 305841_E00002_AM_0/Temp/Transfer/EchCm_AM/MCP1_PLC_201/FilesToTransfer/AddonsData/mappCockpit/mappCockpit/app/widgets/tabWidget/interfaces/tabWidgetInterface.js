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
    /**
     * Declares the tab widget interface
     *
     * @interface TopBarWidget
     * @extends {IWidget}
     */
    var EventTabBarWidgetSelected = /** @class */ (function (_super) {
        __extends(EventTabBarWidgetSelected, _super);
        function EventTabBarWidgetSelected() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventTabBarWidgetSelected;
    }(events_1.TypedEvent));
    exports.EventTabBarWidgetSelected = EventTabBarWidgetSelected;
    ;
    var EventTabBarWidgetClosed = /** @class */ (function (_super) {
        __extends(EventTabBarWidgetClosed, _super);
        function EventTabBarWidgetClosed() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventTabBarWidgetClosed;
    }(events_1.TypedEvent));
    exports.EventTabBarWidgetClosed = EventTabBarWidgetClosed;
    ;
    var TabWidgetWidgetPositons;
    (function (TabWidgetWidgetPositons) {
        TabWidgetWidgetPositons[TabWidgetWidgetPositons["left"] = 0] = "left";
        TabWidgetWidgetPositons[TabWidgetWidgetPositons["flex"] = 1] = "flex";
        TabWidgetWidgetPositons[TabWidgetWidgetPositons["right"] = 2] = "right";
    })(TabWidgetWidgetPositons || (TabWidgetWidgetPositons = {}));
    exports.TabWidgetWidgetPositons = TabWidgetWidgetPositons;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiV2lkZ2V0SW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RhYldpZGdldC9pbnRlcmZhY2VzL3RhYldpZGdldEludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBR0E7Ozs7O09BS0c7SUFDSDtRQUF3Qyw2Q0FBOEI7UUFBdEU7O1FBQXVFLENBQUM7UUFBRCxnQ0FBQztJQUFELENBQUMsQUFBeEUsQ0FBd0MsbUJBQVUsR0FBc0I7SUFjRiw4REFBeUI7SUFkdkIsQ0FBQztJQUN6RTtRQUFzQywyQ0FBOEI7UUFBcEU7O1FBQXFFLENBQUM7UUFBRCw4QkFBQztJQUFELENBQUMsQUFBdEUsQ0FBc0MsbUJBQVUsR0FBc0I7SUFhekIsMERBQXVCO0lBYkUsQ0FBQztJQUV2RSxJQUFLLHVCQUlKO0lBSkQsV0FBSyx1QkFBdUI7UUFDeEIscUVBQUksQ0FBQTtRQUNKLHFFQUFJLENBQUE7UUFDSix1RUFBSyxDQUFBO0lBQ1QsQ0FBQyxFQUpJLHVCQUF1QixLQUF2Qix1QkFBdUIsUUFJM0I7SUFPbUIsMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUxheW91dFdpZGdldCB9IGZyb20gXCIuLi8uLi9jb21tb24vaW50ZXJmYWNlcy9sYXlvdXRXaWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVRhYldpZGdldFRhYiB9IGZyb20gXCIuL3RhYldpZGdldFRhYkludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9ldmVudHNcIjtcclxuLyoqXHJcbiAqIERlY2xhcmVzIHRoZSB0YWIgd2lkZ2V0IGludGVyZmFjZVxyXG4gKlxyXG4gKiBAaW50ZXJmYWNlIFRvcEJhcldpZGdldFxyXG4gKiBAZXh0ZW5kcyB7SVdpZGdldH1cclxuICovXHJcbmNsYXNzIEV2ZW50VGFiQmFyV2lkZ2V0U2VsZWN0ZWQgZXh0ZW5kcyBUeXBlZEV2ZW50PElUYWJXaWRnZXQsIG9iamVjdD57fTtcclxuY2xhc3MgRXZlbnRUYWJCYXJXaWRnZXRDbG9zZWQgZXh0ZW5kcyBUeXBlZEV2ZW50PElUYWJXaWRnZXQsIG9iamVjdD57fTtcclxuXHJcbmVudW0gVGFiV2lkZ2V0V2lkZ2V0UG9zaXRvbnN7XHJcbiAgICBsZWZ0LFxyXG4gICAgZmxleCxcclxuICAgIHJpZ2h0LFxyXG59XHJcblxyXG5pbnRlcmZhY2UgSVRhYldpZGdldCBleHRlbmRzIElMYXlvdXRXaWRnZXQge1xyXG4gICAgc2VsZWN0VGFiKHRhYk5hbWUpIDogSVRhYldpZGdldFRhYnx1bmRlZmluZWQ7XHJcbiAgICBvbkFic29sdXRlVGFiU2VsZWN0ZWQoKTtcclxufVxyXG5cclxuZXhwb3J0IHtJVGFiV2lkZ2V0LCBUYWJXaWRnZXRXaWRnZXRQb3NpdG9ucywgRXZlbnRUYWJCYXJXaWRnZXRDbG9zZWQsIEV2ZW50VGFiQmFyV2lkZ2V0U2VsZWN0ZWR9OyJdfQ==