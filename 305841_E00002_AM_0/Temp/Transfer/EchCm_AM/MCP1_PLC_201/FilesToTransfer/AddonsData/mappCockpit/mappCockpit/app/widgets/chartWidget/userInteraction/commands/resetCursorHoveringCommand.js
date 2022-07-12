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
    var ResetCursorHoveringCommand = /** @class */ (function (_super) {
        __extends(ResetCursorHoveringCommand, _super);
        function ResetCursorHoveringCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ResetCursorHoveringCommand.prototype.onExecuteChartCommand = function (sender, args) {
            this.chartViewChartManager.resetCursorsHovering(args);
        };
        return ResetCursorHoveringCommand;
    }(chartCommandBase_1.ChartCommandBase));
    exports.ResetCursorHoveringCommand = ResetCursorHoveringCommand;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZXRDdXJzb3JIb3ZlcmluZ0NvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY2hhcnRXaWRnZXQvdXNlckludGVyYWN0aW9uL2NvbW1hbmRzL3Jlc2V0Q3Vyc29ySG92ZXJpbmdDb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFJQTtRQUF5Qyw4Q0FBZ0I7UUFBekQ7O1FBS0EsQ0FBQztRQUhHLDBEQUFxQixHQUFyQixVQUFzQixNQUFXLEVBQUUsSUFBa0M7WUFDakUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFELENBQUM7UUFDTCxpQ0FBQztJQUFELENBQUMsQUFMRCxDQUF5QyxtQ0FBZ0IsR0FLeEQ7SUFFTyxnRUFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFydENvbW1hbmRCYXNlIH0gZnJvbSBcIi4uL2NoYXJ0Q29tbWFuZEJhc2VcIjtcclxuaW1wb3J0IHsgRXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kQXJnc30gZnJvbSBcIi4uL3VzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXJcIjtcclxuXHJcblxyXG5jbGFzcyBSZXNldEN1cnNvckhvdmVyaW5nQ29tbWFuZCBleHRlbmRzIENoYXJ0Q29tbWFuZEJhc2V7XHJcbiAgICBcclxuICAgIG9uRXhlY3V0ZUNoYXJ0Q29tbWFuZChzZW5kZXI6IGFueSwgYXJnczogRXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kQXJncykge1xyXG4gICAgICAgIHRoaXMuY2hhcnRWaWV3Q2hhcnRNYW5hZ2VyLnJlc2V0Q3Vyc29yc0hvdmVyaW5nKGFyZ3MpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1Jlc2V0Q3Vyc29ySG92ZXJpbmdDb21tYW5kfSJdfQ==