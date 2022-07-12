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
    var EventDataChanged = /** @class */ (function (_super) {
        __extends(EventDataChanged, _super);
        function EventDataChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventDataChanged;
    }(events_1.TypedEvent));
    ;
    var EventSerieDataChanged = /** @class */ (function (_super) {
        __extends(EventSerieDataChanged, _super);
        function EventSerieDataChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventSerieDataChanged;
    }(events_1.TypedEvent));
    ;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWVOb2RlSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL2ludGVyZmFjZXMvc2VyaWVOb2RlSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFTQTtRQUErQixvQ0FBeUQ7UUFBeEY7O1FBQTBGLENBQUM7UUFBRCx1QkFBQztJQUFELENBQUMsQUFBM0YsQ0FBK0IsbUJBQVUsR0FBa0Q7SUFBQSxDQUFDO0lBQzVGO1FBQW9DLHlDQUFpRDtRQUFyRjs7UUFBdUYsQ0FBQztRQUFELDRCQUFDO0lBQUQsQ0FBQyxBQUF4RixDQUFvQyxtQkFBVSxHQUEwQztJQUFBLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9ldmVudHNcIjtcclxuaW1wb3J0IHsgRXZlbnRTaWduYWxNYW5hZ2VyRGF0YUNoYW5nZWRBcmdzIH0gZnJvbSBcIi4uLy4uL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvZXZlbnRTaWduYWxNYW5hZ2VyRGF0YUNoYW5nZWRBcmdzXCI7XHJcbmltcG9ydCB7IElTZXJpZUNvbnRhaW5lciB9IGZyb20gXCIuL3NlcmllQ29udGFpbmVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTaWduYWxNYW5hZ2VyRGF0YU1vZGVsIH0gZnJvbSBcIi4uLy4uL2RhdGFNb2RlbHNcIjtcclxuaW1wb3J0IHsgSVNlcmllR3JvdXAgfSBmcm9tIFwiLi9zZXJpZUdyb3VwSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3Nlcmllcy9iYXNlU2VyaWVzXCI7XHJcbmltcG9ydCB7IEV2ZW50U2VyaWVEYXRhQ2hhbmdlZEFyZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3Nlcmllcy9ldmVudFNlcmllRGF0YUNoYW5nZWRBcmdzXCI7XHJcbmltcG9ydCB7IE5vZGVUeXBlIH0gZnJvbSBcIi4uL3NpZ25hbC9zZXJpZU5vZGVcIjtcclxuXHJcbmNsYXNzIEV2ZW50RGF0YUNoYW5nZWQgZXh0ZW5kcyBUeXBlZEV2ZW50PElTZXJpZU5vZGUsIEV2ZW50U2lnbmFsTWFuYWdlckRhdGFDaGFuZ2VkQXJncz57IH07XHJcbmNsYXNzIEV2ZW50U2VyaWVEYXRhQ2hhbmdlZCBleHRlbmRzIFR5cGVkRXZlbnQ8QmFzZVNlcmllcywgRXZlbnRTZXJpZURhdGFDaGFuZ2VkQXJncz57IH07XHJcblxyXG4vKipcclxuICogRGVjbGFyZXMgdGhlIHNpZ25hbCBub2RlIGludGVyZmFjZVxyXG4gKlxyXG4gKiBAaW50ZXJmYWNlIElTZXJpZU5vZGVcclxuICAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElTZXJpZU5vZGV7XHJcbiAgZXZlbnREYXRhQ2hhbmdlZDogRXZlbnREYXRhQ2hhbmdlZDtcclxuICBldmVudFNlcmllRGF0YUNoYW5nZWQ6IEV2ZW50U2VyaWVEYXRhQ2hhbmdlZDtcclxuXHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIGNvbG9yOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gIGNhbkRlbGV0ZTogYm9vbGVhbjtcclxuICBzZXJpZTogQmFzZVNlcmllc3x1bmRlZmluZWQ7XHJcbiAgdmFsaWROb2RlOiBib29sZWFuO1xyXG5cclxuICBwYXJlbnQ6IElTZXJpZUNvbnRhaW5lcnx1bmRlZmluZWQ7XHJcbiAgbm9kZVR5cGU6IE5vZGVUeXBlO1xyXG5cclxuICBkaXNwb3NlKCk7XHJcbiAgY2xvbmUoKTogSVNlcmllTm9kZTtcclxuICBnZXREYXRhTW9kZWwoKTogSVNpZ25hbE1hbmFnZXJEYXRhTW9kZWx8dW5kZWZpbmVkO1xyXG4gIGdldFNlcmllR3JvdXAoKTogSVNlcmllR3JvdXB8dW5kZWZpbmVkO1xyXG59XHJcbiJdfQ==