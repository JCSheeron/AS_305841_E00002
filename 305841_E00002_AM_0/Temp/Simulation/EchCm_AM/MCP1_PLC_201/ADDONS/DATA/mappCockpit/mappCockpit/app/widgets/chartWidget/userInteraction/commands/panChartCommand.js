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
    var PanChartCommand = /** @class */ (function (_super) {
        __extends(PanChartCommand, _super);
        function PanChartCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PanChartCommand.prototype.onExecuteChartCommand = function (sender, args) {
            if (args.traceChart != undefined) {
                this.chartViewChartManager.doPanning(args.traceChart, args.data.args.mousePointChart.x, args.data.args.mousePointChart.y);
            }
        };
        return PanChartCommand;
    }(chartCommandBase_1.ChartCommandBase));
    exports.PanChartCommand = PanChartCommand;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuQ2hhcnRDb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0V2lkZ2V0L3VzZXJJbnRlcmFjdGlvbi9jb21tYW5kcy9wYW5DaGFydENvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUlBO1FBQThCLG1DQUFnQjtRQUE5Qzs7UUFPQSxDQUFDO1FBTEcsK0NBQXFCLEdBQXJCLFVBQXNCLE1BQVcsRUFBRSxJQUFrQztZQUNqRSxJQUFHLElBQUksQ0FBQyxVQUFVLElBQUksU0FBUyxFQUFDO2dCQUM1QixJQUFJLENBQUMscUJBQXFCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDN0g7UUFDTCxDQUFDO1FBQ0wsc0JBQUM7SUFBRCxDQUFDLEFBUEQsQ0FBOEIsbUNBQWdCLEdBTzdDO0lBRU8sMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFydENvbW1hbmRCYXNlIH0gZnJvbSBcIi4uL2NoYXJ0Q29tbWFuZEJhc2VcIjtcclxuaW1wb3J0IHsgRXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kQXJnc30gZnJvbSBcIi4uL3VzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXJcIjtcclxuXHJcblxyXG5jbGFzcyBQYW5DaGFydENvbW1hbmQgZXh0ZW5kcyBDaGFydENvbW1hbmRCYXNle1xyXG4gICAgXHJcbiAgICBvbkV4ZWN1dGVDaGFydENvbW1hbmQoc2VuZGVyOiBhbnksIGFyZ3M6IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3MpIHtcclxuICAgICAgICBpZihhcmdzLnRyYWNlQ2hhcnQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5jaGFydFZpZXdDaGFydE1hbmFnZXIuZG9QYW5uaW5nKGFyZ3MudHJhY2VDaGFydCwgYXJncy5kYXRhLmFyZ3MubW91c2VQb2ludENoYXJ0LngsIGFyZ3MuZGF0YS5hcmdzLm1vdXNlUG9pbnRDaGFydC55KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7UGFuQ2hhcnRDb21tYW5kfSJdfQ==