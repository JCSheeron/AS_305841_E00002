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
    var CheckCursorHoveringCommand = /** @class */ (function (_super) {
        __extends(CheckCursorHoveringCommand, _super);
        function CheckCursorHoveringCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CheckCursorHoveringCommand.prototype.onExecuteChartCommand = function (sender, args) {
            if (args.traceChart != undefined) {
                this.chartViewChartManager.checkReferenceCursorsHovering(args.data.mousePoint, args.traceChart);
            }
        };
        return CheckCursorHoveringCommand;
    }(chartCommandBase_1.ChartCommandBase));
    exports.CheckCursorHoveringCommand = CheckCursorHoveringCommand;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29ySG92ZXJpbmdDb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0V2lkZ2V0L3VzZXJJbnRlcmFjdGlvbi9jb21tYW5kcy9jdXJzb3JIb3ZlcmluZ0NvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUlBO1FBQXlDLDhDQUFnQjtRQUF6RDs7UUFPQSxDQUFDO1FBTEcsMERBQXFCLEdBQXJCLFVBQXNCLE1BQVcsRUFBRSxJQUFrQztZQUNqRSxJQUFHLElBQUksQ0FBQyxVQUFVLElBQUksU0FBUyxFQUFDO2dCQUM1QixJQUFJLENBQUMscUJBQXFCLENBQUMsNkJBQTZCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ25HO1FBQ0wsQ0FBQztRQUNMLGlDQUFDO0lBQUQsQ0FBQyxBQVBELENBQXlDLG1DQUFnQixHQU94RDtJQUVPLGdFQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYXJ0Q29tbWFuZEJhc2UgfSBmcm9tIFwiLi4vY2hhcnRDb21tYW5kQmFzZVwiO1xyXG5pbXBvcnQgeyBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzfSBmcm9tIFwiLi4vdXNlckludGVyYWN0aW9uQ29udHJvbGxlclwiO1xyXG5cclxuXHJcbmNsYXNzIENoZWNrQ3Vyc29ySG92ZXJpbmdDb21tYW5kIGV4dGVuZHMgQ2hhcnRDb21tYW5kQmFzZXtcclxuICAgIFxyXG4gICAgb25FeGVjdXRlQ2hhcnRDb21tYW5kKHNlbmRlcjogYW55LCBhcmdzOiBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzKSB7XHJcbiAgICAgICAgaWYoYXJncy50cmFjZUNoYXJ0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRWaWV3Q2hhcnRNYW5hZ2VyLmNoZWNrUmVmZXJlbmNlQ3Vyc29yc0hvdmVyaW5nKGFyZ3MuZGF0YS5tb3VzZVBvaW50LCBhcmdzLnRyYWNlQ2hhcnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtDaGVja0N1cnNvckhvdmVyaW5nQ29tbWFuZH0iXX0=