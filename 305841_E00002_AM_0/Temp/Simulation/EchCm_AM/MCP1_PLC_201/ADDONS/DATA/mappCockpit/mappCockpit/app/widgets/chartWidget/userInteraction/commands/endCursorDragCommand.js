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
    var EndCursorDragCommand = /** @class */ (function (_super) {
        __extends(EndCursorDragCommand, _super);
        function EndCursorDragCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EndCursorDragCommand.prototype.onExecuteChartCommand = function (sender, args) {
            //TODO: get rid of typecast
            // (args.traceChart as ChartBase).refCursorsSetDragFlag(false);
        };
        return EndCursorDragCommand;
    }(chartCommandBase_1.ChartCommandBase));
    exports.EndCursorDragCommand = EndCursorDragCommand;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5kQ3Vyc29yRHJhZ0NvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY2hhcnRXaWRnZXQvdXNlckludGVyYWN0aW9uL2NvbW1hbmRzL2VuZEN1cnNvckRyYWdDb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFLQTtRQUFtQyx3Q0FBZ0I7UUFBbkQ7O1FBTUEsQ0FBQztRQUpHLG9EQUFxQixHQUFyQixVQUFzQixNQUFXLEVBQUUsSUFBa0M7WUFDakUsMkJBQTJCO1lBQzNCLCtEQUErRDtRQUNuRSxDQUFDO1FBQ0wsMkJBQUM7SUFBRCxDQUFDLEFBTkQsQ0FBbUMsbUNBQWdCLEdBTWxEO0lBRU8sb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhcnRDb21tYW5kQmFzZSB9IGZyb20gXCIuLi9jaGFydENvbW1hbmRCYXNlXCI7XHJcbmltcG9ydCB7IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3N9IGZyb20gXCIuLi91c2VySW50ZXJhY3Rpb25Db250cm9sbGVyXCI7XHJcbmltcG9ydCB7IENoYXJ0QmFzZSB9IGZyb20gXCIuLi8uLi9DaGFydEJhc2VcIjtcclxuXHJcblxyXG5jbGFzcyBFbmRDdXJzb3JEcmFnQ29tbWFuZCBleHRlbmRzIENoYXJ0Q29tbWFuZEJhc2V7XHJcbiAgICBcclxuICAgIG9uRXhlY3V0ZUNoYXJ0Q29tbWFuZChzZW5kZXI6IGFueSwgYXJnczogRXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kQXJncykge1xyXG4gICAgICAgIC8vVE9ETzogZ2V0IHJpZCBvZiB0eXBlY2FzdFxyXG4gICAgICAgIC8vIChhcmdzLnRyYWNlQ2hhcnQgYXMgQ2hhcnRCYXNlKS5yZWZDdXJzb3JzU2V0RHJhZ0ZsYWcoZmFsc2UpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge0VuZEN1cnNvckRyYWdDb21tYW5kfSJdfQ==