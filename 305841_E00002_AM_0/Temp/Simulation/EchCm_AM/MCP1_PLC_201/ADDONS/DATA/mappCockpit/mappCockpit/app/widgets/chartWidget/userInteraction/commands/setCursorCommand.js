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
define(["require", "exports", "../chartCommandBase"], function (require, exports, chartCommandBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SetCursorOnPointerPositionCommand = /** @class */ (function (_super) {
        __extends(SetCursorOnPointerPositionCommand, _super);
        function SetCursorOnPointerPositionCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SetCursorOnPointerPositionCommand.prototype.onExecuteChartCommand = function (sender, args) {
            if (args.traceChart != null) {
                this.chartViewChartManager.setCursorOnPointerPosition(args.traceChart, args.data.mousePoint);
            }
        };
        return SetCursorOnPointerPositionCommand;
    }(chartCommandBase_1.ChartCommandBase));
    exports.SetCursorOnPointerPositionCommand = SetCursorOnPointerPositionCommand;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0Q3Vyc29yQ29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydFdpZGdldC91c2VySW50ZXJhY3Rpb24vY29tbWFuZHMvc2V0Q3Vyc29yQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBSUE7UUFBZ0QscURBQWdCO1FBQWhFOztRQVFBLENBQUM7UUFMRyxpRUFBcUIsR0FBckIsVUFBc0IsTUFBVyxFQUFFLElBQWtDO1lBQ2pFLElBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDaEc7UUFDTCxDQUFDO1FBQ0wsd0NBQUM7SUFBRCxDQUFDLEFBUkQsQ0FBZ0QsbUNBQWdCLEdBUS9EO0lBRU8sOEVBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhcnRDb21tYW5kQmFzZSB9IGZyb20gXCIuLi9jaGFydENvbW1hbmRCYXNlXCI7XHJcbmltcG9ydCB7IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3MsIENoYXJ0Q29tbWFuZFR5cGUgfSBmcm9tIFwiLi4vdXNlckludGVyYWN0aW9uQ29udHJvbGxlclwiO1xyXG5cclxuXHJcbmNsYXNzIFNldEN1cnNvck9uUG9pbnRlclBvc2l0aW9uQ29tbWFuZCBleHRlbmRzIENoYXJ0Q29tbWFuZEJhc2V7XHJcbiAgICBcclxuICAgXHJcbiAgICBvbkV4ZWN1dGVDaGFydENvbW1hbmQoc2VuZGVyOiBhbnksIGFyZ3M6IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3MpIHtcclxuICAgICAgICBpZihhcmdzLnRyYWNlQ2hhcnQgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRWaWV3Q2hhcnRNYW5hZ2VyLnNldEN1cnNvck9uUG9pbnRlclBvc2l0aW9uKGFyZ3MudHJhY2VDaGFydCwgYXJncy5kYXRhLm1vdXNlUG9pbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtTZXRDdXJzb3JPblBvaW50ZXJQb3NpdGlvbkNvbW1hbmR9Il19