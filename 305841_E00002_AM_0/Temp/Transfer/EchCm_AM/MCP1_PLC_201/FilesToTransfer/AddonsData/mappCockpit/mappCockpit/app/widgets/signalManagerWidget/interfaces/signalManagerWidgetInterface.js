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
    var EventSerieDoubleClicked = /** @class */ (function (_super) {
        __extends(EventSerieDoubleClicked, _super);
        function EventSerieDoubleClicked() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventSerieDoubleClicked;
    }(events_1.TypedEvent));
    ;
    var EventChangeSize = /** @class */ (function (_super) {
        __extends(EventChangeSize, _super);
        function EventChangeSize() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventChangeSize;
    }(events_1.TypedEvent));
    ;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsTWFuYWdlcldpZGdldEludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9zaWduYWxNYW5hZ2VyV2lkZ2V0L2ludGVyZmFjZXMvc2lnbmFsTWFuYWdlcldpZGdldEludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBSUE7UUFBc0MsMkNBQTRDO1FBQWxGOztRQUFvRixDQUFDO1FBQUQsOEJBQUM7SUFBRCxDQUFDLEFBQXJGLENBQXNDLG1CQUFVLEdBQXFDO0lBQUEsQ0FBQztJQUN0RjtRQUE4QixtQ0FBd0M7UUFBdEU7O1FBQXdFLENBQUM7UUFBRCxzQkFBQztJQUFELENBQUMsQUFBekUsQ0FBOEIsbUJBQVUsR0FBaUM7SUFBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVdpZGdldCB9IGZyb20gXCIuLi8uLi9jb21tb24vaW50ZXJmYWNlcy93aWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NvbW1vbi9zZXJpZXMvYmFzZVNlcmllc1wiO1xyXG5cclxuY2xhc3MgRXZlbnRTZXJpZURvdWJsZUNsaWNrZWQgZXh0ZW5kcyBUeXBlZEV2ZW50PElTaWduYWxNYW5hZ2VyV2lkZ2V0LCBCYXNlU2VyaWVzPnsgfTtcclxuY2xhc3MgRXZlbnRDaGFuZ2VTaXplIGV4dGVuZHMgVHlwZWRFdmVudDxJU2lnbmFsTWFuYWdlcldpZGdldCwgbnVtYmVyPnsgfTtcclxuXHJcbi8qKlxyXG4gKiBEZWNsYXJlcyB0aGUgU2lnbmFsIE1hbmFnZXIgV2lkZ2V0IGludGVyZmFjZVxyXG4gKlxyXG4gKiBAaW50ZXJmYWNlIElTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcbiAqIEBleHRlbmRzIHtXaWRnZXRJbnRlcmZhY2V9XHJcbiAqL1xyXG5pbnRlcmZhY2UgSVNpZ25hbE1hbmFnZXJXaWRnZXQgZXh0ZW5kcyBJV2lkZ2V0IHtcclxuICBlZGl0TW9kZUFjdGl2ZTtcclxuICBhY3RpdmF0ZUVkaXRNb2RlKGFjdGl2YXRlOiBib29sZWFuKTtcclxuICBlbmFibGVUcmVlR3JpZFJlZnJlc2godmFsdWU6IGJvb2xlYW4pO1xyXG4gIHJlZnJlc2goKTtcclxuICBldmVudFNlcmllRG91YmxlQ2xpY2tlZDogRXZlbnRTZXJpZURvdWJsZUNsaWNrZWQ7XHJcbiAgZXZlbnRDaGFuZ2VTaXplOiBFdmVudENoYW5nZVNpemU7XHJcbn1cclxuXHJcbmV4cG9ydCB7SVNpZ25hbE1hbmFnZXJXaWRnZXR9OyJdfQ==