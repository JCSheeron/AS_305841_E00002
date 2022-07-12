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
    var SelectZoomAxesCommand = /** @class */ (function (_super) {
        __extends(SelectZoomAxesCommand, _super);
        function SelectZoomAxesCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SelectZoomAxesCommand.prototype.onExecuteChartCommand = function (sender, args) {
            this.chartViewChartManager.setChartZoomAxes(args.data.zoomAxes);
        };
        return SelectZoomAxesCommand;
    }(chartCommandBase_1.ChartCommandBase));
    exports.SelectZoomAxesCommand = SelectZoomAxesCommand;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0Wm9vbUF4ZXNDb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0V2lkZ2V0L3VzZXJJbnRlcmFjdGlvbi9jb21tYW5kcy9zZWxlY3Rab29tQXhlc0NvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUlBO1FBQW9DLHlDQUFnQjtRQUFwRDs7UUFLQSxDQUFDO1FBSEcscURBQXFCLEdBQXJCLFVBQXNCLE1BQVcsRUFBRSxJQUFrQztZQUNqRSxJQUFJLENBQUMscUJBQXFCLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwRSxDQUFDO1FBQ0wsNEJBQUM7SUFBRCxDQUFDLEFBTEQsQ0FBb0MsbUNBQWdCLEdBS25EO0lBRU8sc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhcnRDb21tYW5kQmFzZSB9IGZyb20gXCIuLi9jaGFydENvbW1hbmRCYXNlXCI7XHJcbmltcG9ydCB7IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3N9IGZyb20gXCIuLi91c2VySW50ZXJhY3Rpb25Db250cm9sbGVyXCI7XHJcblxyXG5cclxuY2xhc3MgU2VsZWN0Wm9vbUF4ZXNDb21tYW5kIGV4dGVuZHMgQ2hhcnRDb21tYW5kQmFzZXtcclxuICAgIFxyXG4gICAgb25FeGVjdXRlQ2hhcnRDb21tYW5kKHNlbmRlcjogYW55LCBhcmdzOiBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzKSB7XHJcbiAgICAgICAgdGhpcy5jaGFydFZpZXdDaGFydE1hbmFnZXIuc2V0Q2hhcnRab29tQXhlcyhhcmdzLmRhdGEuem9vbUF4ZXMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1NlbGVjdFpvb21BeGVzQ29tbWFuZH0iXX0=