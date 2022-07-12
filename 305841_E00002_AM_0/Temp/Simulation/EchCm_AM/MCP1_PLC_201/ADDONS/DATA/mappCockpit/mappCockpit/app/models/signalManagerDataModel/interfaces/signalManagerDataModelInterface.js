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
    var EventSignalRemoved = /** @class */ (function (_super) {
        __extends(EventSignalRemoved, _super);
        function EventSignalRemoved() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventSignalRemoved;
    }(events_1.TypedEvent));
    ;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsTWFuYWdlckRhdGFNb2RlbEludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvaW50ZXJmYWNlcy9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFTQTtRQUFpQyxzQ0FBK0M7UUFBaEY7O1FBQWtGLENBQUM7UUFBRCx5QkFBQztJQUFELENBQUMsQUFBbkYsQ0FBaUMsbUJBQVUsR0FBd0M7SUFBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSURhdGFNb2RlbCB9IGZyb20gXCIuLi8uLi9kYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IElTZXJpZUNvbnRhaW5lciB9IGZyb20gXCIuLi8uLi9jb21tb24vaW50ZXJmYWNlcy9zZXJpZUNvbnRhaW5lckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJU2lnbmFsQ2F0ZWdvcnkgfSBmcm9tIFwiLi9zaWduYWxDYXRlZ29yeUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJU2VyaWVOb2RlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9pbnRlcmZhY2VzL3NlcmllTm9kZUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJpZXMvYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBJU2VyaWVHcm91cCB9IGZyb20gXCIuLi8uLi9jb21tb24vaW50ZXJmYWNlcy9zZXJpZUdyb3VwSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTZXJpZXNQcm92aWRlciB9IGZyb20gXCIuLi8uLi9jb21tb24vc2VyaWVzUHJvdmlkZXIvc2VyaWVzUHJvdmlkZXJJbnRlcmZhY2VcIjtcclxuXHJcbmNsYXNzIEV2ZW50U2lnbmFsUmVtb3ZlZCBleHRlbmRzIFR5cGVkRXZlbnQ8SVNpZ25hbE1hbmFnZXJEYXRhTW9kZWwsIEJhc2VTZXJpZXM+eyB9O1xyXG5cclxuLyoqXHJcbiAqIERlY2xhcmVzIHRoZSBzaWduYWwgbWFuYWdlciBkYXRhTW9kZWwgaW50ZXJmYWNlXHJcbiAqXHJcbiAqIEBpbnRlcmZhY2UgU2lnbmFsTWFuYWdlckRhdGFNb2RlbEludGVyZmFjZVxyXG4gKiBAZXh0ZW5kcyB7RGF0YU1vZGVsSW50ZXJmYWNlfVxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJU2lnbmFsTWFuYWdlckRhdGFNb2RlbCBleHRlbmRzIElEYXRhTW9kZWwge1xyXG4gIGV2ZW50U2lnbmFsUmVtb3ZlZDogRXZlbnRTaWduYWxSZW1vdmVkO1xyXG4gIGVkaXRNb2RlQWN0aXZlOmJvb2xlYW47XHJcbiAgc2VyaWVzUHJvdmlkZXI6IElTZXJpZXNQcm92aWRlcnx1bmRlZmluZWQ7XHJcbiAgY2xlYXIoKTtcclxuICBhZGRTZXJpZUNvbnRhaW5lcihzZXJpZUNvbnRhaW5lcjogSVNlcmllQ29udGFpbmVyLCBjYXRlZ29yeUlkOiBzdHJpbmcpO1xyXG4gIHJlbW92ZVNlcmllQ29udGFpbmVyKHNlcmllQ29udGFpbmVyOiBJU2VyaWVDb250YWluZXIpO1xyXG4gIGFkZFVwbG9hZGVkU2VyaWVHcm91cChzZXJpZUdyb3VwOiBJU2VyaWVHcm91cCk7XHJcbiAgZ2V0U2lnbmFsQ2F0ZWdvcnkoaWQ6IHN0cmluZyk6IElTaWduYWxDYXRlZ29yeXx1bmRlZmluZWQ7XHJcbiAgcmVtb3ZlU2VyaWVOb2RlKHNlcmllTm9kZTogSVNlcmllTm9kZSk7XHJcbn1cclxuIl19