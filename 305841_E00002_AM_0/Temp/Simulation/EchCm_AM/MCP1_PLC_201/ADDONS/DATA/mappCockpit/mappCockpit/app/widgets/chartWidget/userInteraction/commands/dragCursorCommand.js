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
    var DragCursorCommand = /** @class */ (function (_super) {
        __extends(DragCursorCommand, _super);
        function DragCursorCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DragCursorCommand.prototype.onExecuteChartCommand = function (sender, args) {
            if (args.traceChart != null) {
                this.chartViewChartManager.dragCursorAlongLine(args.traceChart, args.data.movementX, args.data.movementY);
            }
        };
        return DragCursorCommand;
    }(chartCommandBase_1.ChartCommandBase));
    exports.DragCursorCommand = DragCursorCommand;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ0N1cnNvckNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY2hhcnRXaWRnZXQvdXNlckludGVyYWN0aW9uL2NvbW1hbmRzL2RyYWdDdXJzb3JDb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFHQTtRQUFnQyxxQ0FBZ0I7UUFBaEQ7O1FBT0EsQ0FBQztRQUxHLGlEQUFxQixHQUFyQixVQUFzQixNQUFXLEVBQUUsSUFBa0M7WUFDakUsSUFBRyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksRUFBQztnQkFDdkIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUM3RztRQUNMLENBQUM7UUFDTCx3QkFBQztJQUFELENBQUMsQUFQRCxDQUFnQyxtQ0FBZ0IsR0FPL0M7SUFFUSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFydENvbW1hbmRCYXNlIH0gZnJvbSBcIi4uL2NoYXJ0Q29tbWFuZEJhc2VcIjtcclxuaW1wb3J0IHsgRXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kQXJncyB9IGZyb20gXCIuLi91c2VySW50ZXJhY3Rpb25Db250cm9sbGVyXCI7XHJcblxyXG5jbGFzcyBEcmFnQ3Vyc29yQ29tbWFuZCBleHRlbmRzIENoYXJ0Q29tbWFuZEJhc2V7XHJcbiAgICBcclxuICAgIG9uRXhlY3V0ZUNoYXJ0Q29tbWFuZChzZW5kZXI6IGFueSwgYXJnczogRXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kQXJncykge1xyXG4gICAgICAgIGlmKGFyZ3MudHJhY2VDaGFydCAhPSBudWxsKXtcclxuICAgICAgICAgICAgdGhpcy5jaGFydFZpZXdDaGFydE1hbmFnZXIuZHJhZ0N1cnNvckFsb25nTGluZShhcmdzLnRyYWNlQ2hhcnQsIGFyZ3MuZGF0YS5tb3ZlbWVudFgsIGFyZ3MuZGF0YS5tb3ZlbWVudFkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgRHJhZ0N1cnNvckNvbW1hbmQgfSJdfQ==