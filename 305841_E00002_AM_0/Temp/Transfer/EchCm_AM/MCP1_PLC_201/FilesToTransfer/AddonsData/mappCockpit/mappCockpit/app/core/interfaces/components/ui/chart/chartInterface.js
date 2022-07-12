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
define(["require", "exports", "../../../../../framework/events"], function (require, exports, events_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AxisOrientation;
    (function (AxisOrientation) {
        AxisOrientation[AxisOrientation["horizontal"] = 0] = "horizontal";
        AxisOrientation[AxisOrientation["vertical"] = 1] = "vertical";
    })(AxisOrientation = exports.AxisOrientation || (exports.AxisOrientation = {}));
    var AxisPosition;
    (function (AxisPosition) {
        AxisPosition[AxisPosition["left"] = 0] = "left";
        AxisPosition[AxisPosition["right"] = 1] = "right";
    })(AxisPosition = exports.AxisPosition || (exports.AxisPosition = {}));
    var EventAxisRangeChanged = /** @class */ (function (_super) {
        __extends(EventAxisRangeChanged, _super);
        function EventAxisRangeChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventAxisRangeChanged;
    }(events_1.TypedEvent));
    exports.EventAxisRangeChanged = EventAxisRangeChanged;
    ;
    var EventAxisRangeChangedArgs = /** @class */ (function () {
        function EventAxisRangeChangedArgs(axisIDs, forceRedraw, syncAxis) {
            if (syncAxis === void 0) { syncAxis = false; }
            this.axisIDs = axisIDs;
            this.forceRedraw = forceRedraw;
            this.syncAxis = syncAxis;
        }
        return EventAxisRangeChangedArgs;
    }());
    exports.EventAxisRangeChangedArgs = EventAxisRangeChangedArgs;
    var EventMouseAction = /** @class */ (function (_super) {
        __extends(EventMouseAction, _super);
        function EventMouseAction() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventMouseAction;
    }(events_1.TypedEvent));
    exports.EventMouseAction = EventMouseAction;
    ;
    var EventMouseArgs = /** @class */ (function () {
        function EventMouseArgs(mouseActionType, mousePoint, mousePointChart, objectUnderMouse) {
            this.mouseActionType = mouseActionType;
            this.mousePoint = mousePoint;
            this.mousePointChart = mousePointChart;
            this.objectUnderMouse = objectUnderMouse;
        }
        return EventMouseArgs;
    }());
    exports.EventMouseArgs = EventMouseArgs;
    var EventMouseWheel = /** @class */ (function (_super) {
        __extends(EventMouseWheel, _super);
        function EventMouseWheel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventMouseWheel;
    }(events_1.TypedEvent));
    exports.EventMouseWheel = EventMouseWheel;
    ;
    var EventMouseWheelArgs = /** @class */ (function () {
        function EventMouseWheelArgs(mousePoint, objectUnderMouse, wheelDelta) {
            this.mousePoint = mousePoint;
            this.objectUnderMouse = objectUnderMouse;
            this.wheelDelta = wheelDelta;
        }
        return EventMouseWheelArgs;
    }());
    exports.EventMouseWheelArgs = EventMouseWheelArgs;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvcmUvaW50ZXJmYWNlcy9jb21wb25lbnRzL3VpL2NoYXJ0L2NoYXJ0SW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFnQkEsSUFBWSxlQUdYO0lBSEQsV0FBWSxlQUFlO1FBQ3ZCLGlFQUFZLENBQUE7UUFDWiw2REFBVSxDQUFBO0lBQ2QsQ0FBQyxFQUhXLGVBQWUsR0FBZix1QkFBZSxLQUFmLHVCQUFlLFFBRzFCO0lBRUQsSUFBWSxZQUdYO0lBSEQsV0FBWSxZQUFZO1FBQ3BCLCtDQUFJLENBQUE7UUFDSixpREFBSyxDQUFBO0lBQ1QsQ0FBQyxFQUhXLFlBQVksR0FBWixvQkFBWSxLQUFaLG9CQUFZLFFBR3ZCO0lBRUQ7UUFBMkMseUNBQWtEO1FBQTdGOztRQUErRixDQUFDO1FBQUQsNEJBQUM7SUFBRCxDQUFDLEFBQWhHLENBQTJDLG1CQUFVLEdBQTJDO0lBQW5GLHNEQUFxQjtJQUE4RCxDQUFDO0lBQ2pHO1FBS0ksbUNBQWEsT0FBaUIsRUFBRSxXQUFvQixFQUFFLFFBQXlCO1lBQXpCLHlCQUFBLEVBQUEsZ0JBQXlCO1lBQzNFLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1lBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQzdCLENBQUM7UUFDTCxnQ0FBQztJQUFELENBQUMsQUFWRCxJQVVDO0lBVlksOERBQXlCO0lBWXRDO1FBQXNDLG9DQUFtQztRQUF6RTs7UUFBMkUsQ0FBQztRQUFELHVCQUFDO0lBQUQsQ0FBQyxBQUE1RSxDQUFzQyxtQkFBVSxHQUE0QjtJQUEvRCw0Q0FBZ0I7SUFBK0MsQ0FBQztJQUM3RTtRQU1JLHdCQUFhLGVBQWdDLEVBQUUsVUFBbUIsRUFBRSxlQUF1QixFQUFFLGdCQUF3QztZQUNqSSxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztZQUN2QyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztZQUM3QixJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztZQUN2QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7UUFDN0MsQ0FBQztRQUNMLHFCQUFDO0lBQUQsQ0FBQyxBQVpELElBWUM7SUFaWSx3Q0FBYztJQWMzQjtRQUFxQyxtQ0FBd0M7UUFBN0U7O1FBQStFLENBQUM7UUFBRCxzQkFBQztJQUFELENBQUMsQUFBaEYsQ0FBcUMsbUJBQVUsR0FBaUM7SUFBbkUsMENBQWU7SUFBb0QsQ0FBQztJQUNqRjtRQUtJLDZCQUFhLFVBQW1CLEVBQUUsZ0JBQXdDLEVBQUUsVUFBa0I7WUFDMUYsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDN0IsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO1lBQ3pDLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQ2pDLENBQUM7UUFDTCwwQkFBQztJQUFELENBQUMsQUFWRCxJQVVDO0lBVlksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IFJlY3RhbmdsZSB9IGZyb20gXCIuLi8uLi8uLi8uLi90eXBlcy9SZWN0YW5nbGVcIjtcclxuaW1wb3J0IHsgSUNoYXJ0QXhpcyB9IGZyb20gXCIuL0NoYXJ0QXhpc0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vbW9kZWxzL2NvbW1vbi9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENoYXJ0T2JqZWN0SW5mb3JtYXRpb24gfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vd2lkZ2V0cy9jaGFydFdpZGdldC9DaGFydEJhc2VcIjtcclxuaW1wb3J0IHsgWm9vbURpcmVjdGlvbiB9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi93aWRnZXRzL2NoYXJ0Vmlld1dpZGdldC9jaGFydFZpZXdXaWRnZXRcIjtcclxuaW1wb3J0IHsgTW91c2VBY3Rpb25UeXBlIH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL3dpZGdldHMvY2hhcnRXaWRnZXQvdXNlckludGVyYWN0aW9uL3VzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi9tb2RlbHMvY29tbW9uL3Nlcmllcy9iYXNlU2VyaWVzXCI7XHJcblxyXG4vL0xpbWl0c1xyXG5leHBvcnQgaW50ZXJmYWNlIFNpbXBsZVJhbmdle1xyXG4gICAgbWluOiBudW1iZXI7XHJcbiAgICBtYXg6IG51bWJlcjtcclxuICAgIGRlbHRhPzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBBeGlzT3JpZW50YXRpb257XHJcbiAgICBcImhvcml6b250YWxcIixcclxuICAgIFwidmVydGljYWxcIlxyXG59XHJcblxyXG5leHBvcnQgZW51bSBBeGlzUG9zaXRpb257XHJcbiAgICBsZWZ0LFxyXG4gICAgcmlnaHRcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEV2ZW50QXhpc1JhbmdlQ2hhbmdlZCBleHRlbmRzIFR5cGVkRXZlbnQgPElDaGFydEF4aXMsIEV2ZW50QXhpc1JhbmdlQ2hhbmdlZEFyZ3M+IHt9O1xyXG5leHBvcnQgY2xhc3MgRXZlbnRBeGlzUmFuZ2VDaGFuZ2VkQXJncyB7XHJcbiAgICBheGlzSURzOiBzdHJpbmdbXTtcclxuICAgIGZvcmNlUmVkcmF3OiBib29sZWFuO1xyXG4gICAgc3luY0F4aXMgOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yIChheGlzSURzOiBzdHJpbmdbXSwgZm9yY2VSZWRyYXc6IGJvb2xlYW4sIHN5bmNBeGlzOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLmF4aXNJRHMgPSBheGlzSURzO1xyXG4gICAgICAgIHRoaXMuZm9yY2VSZWRyYXcgPSBmb3JjZVJlZHJhdztcclxuICAgICAgICB0aGlzLnN5bmNBeGlzID0gc3luY0F4aXM7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFdmVudE1vdXNlQWN0aW9uIGV4dGVuZHMgVHlwZWRFdmVudCA8SUNoYXJ0LCBFdmVudE1vdXNlQXJncz4ge307XHJcbmV4cG9ydCBjbGFzcyBFdmVudE1vdXNlQXJncyB7XHJcbiAgICBtb3VzZUFjdGlvblR5cGUgOiBNb3VzZUFjdGlvblR5cGU7XHJcbiAgICBtb3VzZVBvaW50IDogSVBvaW50O1xyXG4gICAgbW91c2VQb2ludENoYXJ0IDogSVBvaW50XHJcbiAgICBvYmplY3RVbmRlck1vdXNlOiBDaGFydE9iamVjdEluZm9ybWF0aW9uO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yIChtb3VzZUFjdGlvblR5cGU6IE1vdXNlQWN0aW9uVHlwZSwgbW91c2VQb2ludCA6IElQb2ludCwgbW91c2VQb2ludENoYXJ0OiBJUG9pbnQsIG9iamVjdFVuZGVyTW91c2U6IENoYXJ0T2JqZWN0SW5mb3JtYXRpb24pe1xyXG4gICAgICAgIHRoaXMubW91c2VBY3Rpb25UeXBlID0gbW91c2VBY3Rpb25UeXBlO1xyXG4gICAgICAgIHRoaXMubW91c2VQb2ludCA9IG1vdXNlUG9pbnQ7XHJcbiAgICAgICAgdGhpcy5tb3VzZVBvaW50Q2hhcnQgPSBtb3VzZVBvaW50Q2hhcnQ7XHJcbiAgICAgICAgdGhpcy5vYmplY3RVbmRlck1vdXNlID0gb2JqZWN0VW5kZXJNb3VzZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEV2ZW50TW91c2VXaGVlbCBleHRlbmRzIFR5cGVkRXZlbnQgPElDaGFydCwgRXZlbnRNb3VzZVdoZWVsQXJncz4ge307XHJcbmV4cG9ydCBjbGFzcyBFdmVudE1vdXNlV2hlZWxBcmdzIHtcclxuICAgIG1vdXNlUG9pbnQgOiBJUG9pbnQ7XHJcbiAgICB3aGVlbERlbHRhIDogbnVtYmVyO1xyXG4gICAgb2JqZWN0VW5kZXJNb3VzZTogQ2hhcnRPYmplY3RJbmZvcm1hdGlvbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAobW91c2VQb2ludCA6IElQb2ludCwgb2JqZWN0VW5kZXJNb3VzZTogQ2hhcnRPYmplY3RJbmZvcm1hdGlvbiwgd2hlZWxEZWx0YTogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLm1vdXNlUG9pbnQgPSBtb3VzZVBvaW50O1xyXG4gICAgICAgIHRoaXMub2JqZWN0VW5kZXJNb3VzZSA9IG9iamVjdFVuZGVyTW91c2U7XHJcbiAgICAgICAgdGhpcy53aGVlbERlbHRhID0gd2hlZWxEZWx0YTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElDaGFydHtcclxuXHJcbiAgICBldmVudEF4aXNSYW5nZUNoYW5nZWQgOiBFdmVudEF4aXNSYW5nZUNoYW5nZWQ7XHJcbiAgICBldmVudE1vdXNlQWN0aW9uIDogRXZlbnRNb3VzZUFjdGlvbjtcclxuICAgIGV2ZW50TW91c2VXaGVlbDogRXZlbnRNb3VzZVdoZWVsO1xyXG5cclxuICAgIHJlZHJhdygpO1xyXG4gICAgcmVzaXplKGhlaWdodCA6IG51bWJlciwgd2lkdGg6IG51bWJlcik7XHJcblxyXG4gICAgc2V0Wm9vbURpcmVjdGlvbih6b29tRGlyZWN0aW9uOiBab29tRGlyZWN0aW9uKTtcclxuICAgIGVuYWJsZUJveFpvb20oZW5hYmxlOiBib29sZWFuKTtcclxuICAgIFxyXG4gICAgZW5hYmxlUGFubmluZyhlbmFibGU6IGJvb2xlYW4pO1xyXG4gICAgc2V0UGFubmluZ0F4ZXMoYXhlcyA6IElDaGFydEF4aXNbXSlcclxuXHJcbiAgICBnZXRDaGFydEFyZWEoKSA6IFJlY3RhbmdsZTtcclxuICAgIHNldENoYXJ0QXJlYShjaGFydEFyZWE6IFJlY3RhbmdsZSk7XHJcblxyXG4gICAgZ2V0WEF4aXNXaWR0aCgpIDogbnVtYmVyO1xyXG5cclxuICAgIGRvUGFubmluZyhtb3VzZVg6IG51bWJlciwgbW91c2VZOiBudW1iZXIpO1xyXG5cclxuICAgIGdldEF4aXMoYXhpc0lEOiBzdHJpbmcpIDogSUNoYXJ0QXhpc3x1bmRlZmluZWQ7XHJcbiAgICBhZGRZQXhpcyhheGlzSUQ6IHN0cmluZywgYXhpc01pbjogbnVtYmVyLCBheGlzTWF4Om51bWJlciwgcG9zaXRpb24gOiBBeGlzUG9zaXRpb24pO1xyXG4gICAgcmVtb3ZlWUF4aXMoYXhpc0lEIDogc3RyaW5nKTtcclxuXHJcbiAgICBzZXRTZXJpZXMoc2VyaWVzIDogYW55W10pO1xyXG4gICAgY3JlYXRlVHJhY2VEYXRhU2VyaWVzKHNlcmllOiBCYXNlU2VyaWVzLCBheGlzSUQ6IHN0cmluZyk6IHt9fHVuZGVmaW5lZDtcclxuXHJcbiAgICAvL3NldFlBeGlzT2Zmc2V0KG51bWJlck9mQXhlczogbnVtYmVyKTtcclxuXHJcbn0iXX0=