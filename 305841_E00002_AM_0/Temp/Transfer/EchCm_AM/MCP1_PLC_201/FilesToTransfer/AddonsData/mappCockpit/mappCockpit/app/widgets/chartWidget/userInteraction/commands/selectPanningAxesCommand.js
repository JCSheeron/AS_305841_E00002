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
    var SelectPanningAxesCommand = /** @class */ (function (_super) {
        __extends(SelectPanningAxesCommand, _super);
        function SelectPanningAxesCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SelectPanningAxesCommand.prototype.onExecuteChartCommand = function (sender, args) {
            this.chartViewChartManager.setPanningAxes([args.data.zoomAxes]);
        };
        return SelectPanningAxesCommand;
    }(chartCommandBase_1.ChartCommandBase));
    exports.SelectPanningAxesCommand = SelectPanningAxesCommand;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0UGFubmluZ0F4ZXNDb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0V2lkZ2V0L3VzZXJJbnRlcmFjdGlvbi9jb21tYW5kcy9zZWxlY3RQYW5uaW5nQXhlc0NvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUlBO1FBQXVDLDRDQUFnQjtRQUF2RDs7UUFLQSxDQUFDO1FBSEcsd0RBQXFCLEdBQXJCLFVBQXNCLE1BQVcsRUFBRSxJQUFrQztZQUNqRSxJQUFJLENBQUMscUJBQXFCLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3BFLENBQUM7UUFDTCwrQkFBQztJQUFELENBQUMsQUFMRCxDQUF1QyxtQ0FBZ0IsR0FLdEQ7SUFFTyw0REFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFydENvbW1hbmRCYXNlIH0gZnJvbSBcIi4uL2NoYXJ0Q29tbWFuZEJhc2VcIjtcclxuaW1wb3J0IHsgRXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kQXJnc30gZnJvbSBcIi4uL3VzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXJcIjtcclxuXHJcblxyXG5jbGFzcyBTZWxlY3RQYW5uaW5nQXhlc0NvbW1hbmQgZXh0ZW5kcyBDaGFydENvbW1hbmRCYXNle1xyXG4gICAgXHJcbiAgICBvbkV4ZWN1dGVDaGFydENvbW1hbmQoc2VuZGVyOiBhbnksIGFyZ3M6IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3MpIHtcclxuICAgICAgICB0aGlzLmNoYXJ0Vmlld0NoYXJ0TWFuYWdlci5zZXRQYW5uaW5nQXhlcyhbYXJncy5kYXRhLnpvb21BeGVzXSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7U2VsZWN0UGFubmluZ0F4ZXNDb21tYW5kfSJdfQ==