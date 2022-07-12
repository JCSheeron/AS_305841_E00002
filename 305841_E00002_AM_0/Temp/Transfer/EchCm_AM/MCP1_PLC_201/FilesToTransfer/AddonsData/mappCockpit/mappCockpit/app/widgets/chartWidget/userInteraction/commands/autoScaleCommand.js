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
    var AutoScaleCommand = /** @class */ (function (_super) {
        __extends(AutoScaleCommand, _super);
        function AutoScaleCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AutoScaleCommand.prototype.onExecuteChartCommand = function (sender, args) {
            this.chartViewChartManager.autoScale();
        };
        return AutoScaleCommand;
    }(chartCommandBase_1.ChartCommandBase));
    exports.AutoScaleCommand = AutoScaleCommand;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b1NjYWxlQ29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydFdpZGdldC91c2VySW50ZXJhY3Rpb24vY29tbWFuZHMvYXV0b1NjYWxlQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBSUE7UUFBK0Isb0NBQWdCO1FBQS9DOztRQUtBLENBQUM7UUFIRyxnREFBcUIsR0FBckIsVUFBc0IsTUFBVyxFQUFFLElBQWtDO1lBQ2pFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMzQyxDQUFDO1FBQ0wsdUJBQUM7SUFBRCxDQUFDLEFBTEQsQ0FBK0IsbUNBQWdCLEdBSzlDO0lBRU8sNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhcnRDb21tYW5kQmFzZSB9IGZyb20gXCIuLi9jaGFydENvbW1hbmRCYXNlXCI7XHJcbmltcG9ydCB7IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3N9IGZyb20gXCIuLi91c2VySW50ZXJhY3Rpb25Db250cm9sbGVyXCI7XHJcblxyXG5cclxuY2xhc3MgQXV0b1NjYWxlQ29tbWFuZCBleHRlbmRzIENoYXJ0Q29tbWFuZEJhc2V7XHJcbiAgICBcclxuICAgIG9uRXhlY3V0ZUNoYXJ0Q29tbWFuZChzZW5kZXI6IGFueSwgYXJnczogRXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kQXJncykge1xyXG4gICAgICAgIHRoaXMuY2hhcnRWaWV3Q2hhcnRNYW5hZ2VyLmF1dG9TY2FsZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge0F1dG9TY2FsZUNvbW1hbmR9Il19