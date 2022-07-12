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
    var ResetDragPositionCommand = /** @class */ (function (_super) {
        __extends(ResetDragPositionCommand, _super);
        function ResetDragPositionCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ResetDragPositionCommand.prototype.onExecuteChartCommand = function (sender, args) {
            this.chartViewChartManager.resetPanningCoords();
        };
        return ResetDragPositionCommand;
    }(chartCommandBase_1.ChartCommandBase));
    exports.ResetDragPositionCommand = ResetDragPositionCommand;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZXREcmFnUG9zaXRpb25Db21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0V2lkZ2V0L3VzZXJJbnRlcmFjdGlvbi9jb21tYW5kcy9yZXNldERyYWdQb3NpdGlvbkNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUdBO1FBQXVDLDRDQUFnQjtRQUF2RDs7UUFNQSxDQUFDO1FBSkcsd0RBQXFCLEdBQXJCLFVBQXNCLE1BQVcsRUFBRSxJQUFrQztZQUNqRSxJQUFJLENBQUMscUJBQXFCLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUVwRCxDQUFDO1FBQ0wsK0JBQUM7SUFBRCxDQUFDLEFBTkQsQ0FBdUMsbUNBQWdCLEdBTXREO0lBRU8sNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhcnRDb21tYW5kQmFzZSB9IGZyb20gXCIuLi9jaGFydENvbW1hbmRCYXNlXCI7XHJcbmltcG9ydCB7IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3N9IGZyb20gXCIuLi91c2VySW50ZXJhY3Rpb25Db250cm9sbGVyXCI7XHJcblxyXG5jbGFzcyBSZXNldERyYWdQb3NpdGlvbkNvbW1hbmQgZXh0ZW5kcyBDaGFydENvbW1hbmRCYXNle1xyXG4gICAgXHJcbiAgICBvbkV4ZWN1dGVDaGFydENvbW1hbmQoc2VuZGVyOiBhbnksIGFyZ3M6IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3MpIHtcclxuICAgICAgICB0aGlzLmNoYXJ0Vmlld0NoYXJ0TWFuYWdlci5yZXNldFBhbm5pbmdDb29yZHMoKTtcclxuICAgICAgXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7UmVzZXREcmFnUG9zaXRpb25Db21tYW5kfSJdfQ==