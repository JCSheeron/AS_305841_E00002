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
define(["require", "exports", "../../../framework/events", "./strategies/charStrategyInterface", "./strategies/cursorStrategy", "./strategies/chartPanningStrategy", "../../chartViewWidget/chartViewWidget", "./strategies/chartBoxZoomStrategy", "./strategies/cursorDragStrategy", "../ChartBase", "../../common/states/chartViewToolbarStates", "./strategies/axisPanningStrategy", "../../../core/types/point"], function (require, exports, events_1, charStrategyInterface_1, cursorStrategy_1, chartPanningStrategy_1, chartViewWidget_1, chartBoxZoomStrategy_1, cursorDragStrategy_1, ChartBase_1, chartViewToolbarStates_1, axisPanningStrategy_1, point_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventExecuteChartCommand = /** @class */ (function (_super) {
        __extends(EventExecuteChartCommand, _super);
        function EventExecuteChartCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventExecuteChartCommand;
    }(events_1.TypedEvent));
    exports.EventExecuteChartCommand = EventExecuteChartCommand;
    ;
    /**
     * Commands that can be used within the charts
     *
     * @enum {number}
     */
    var ChartCommandType;
    (function (ChartCommandType) {
        ChartCommandType[ChartCommandType["setCursorOnPointerPosition"] = 0] = "setCursorOnPointerPosition";
        ChartCommandType[ChartCommandType["resetZoom"] = 1] = "resetZoom";
        ChartCommandType[ChartCommandType["selectCursor"] = 2] = "selectCursor";
        ChartCommandType[ChartCommandType["checkCursorHovering"] = 3] = "checkCursorHovering";
        ChartCommandType[ChartCommandType["dragCursor"] = 4] = "dragCursor";
        ChartCommandType[ChartCommandType["endCursorDrag"] = 5] = "endCursorDrag";
        ChartCommandType[ChartCommandType["panChart"] = 6] = "panChart";
        ChartCommandType[ChartCommandType["toggleBoxZoom"] = 7] = "toggleBoxZoom";
        ChartCommandType[ChartCommandType["togglePanning"] = 8] = "togglePanning";
        ChartCommandType[ChartCommandType["selectZoomAxis"] = 9] = "selectZoomAxis";
        ChartCommandType[ChartCommandType["selectPanningAxes"] = 10] = "selectPanningAxes";
        ChartCommandType[ChartCommandType["zoomChart"] = 11] = "zoomChart";
        ChartCommandType[ChartCommandType["autoScale"] = 12] = "autoScale";
        ChartCommandType[ChartCommandType["resetDragPosition"] = 13] = "resetDragPosition";
        ChartCommandType[ChartCommandType["resetCursorHovering"] = 14] = "resetCursorHovering";
    })(ChartCommandType || (ChartCommandType = {}));
    exports.ChartCommandType = ChartCommandType;
    /**
     * ChartInteractionType
     *
     * @enum {number}
     */
    var MouseActionType;
    (function (MouseActionType) {
        MouseActionType[MouseActionType["mouseDown"] = 0] = "mouseDown";
        MouseActionType[MouseActionType["mouseUp"] = 1] = "mouseUp";
        MouseActionType[MouseActionType["mouseMove"] = 2] = "mouseMove";
        MouseActionType[MouseActionType["mouseWheel"] = 3] = "mouseWheel";
    })(MouseActionType || (MouseActionType = {}));
    exports.MouseActionType = MouseActionType;
    /**
     * ChartMouseState
     *
     * @enum {number}
     */
    var ChartMouseState;
    (function (ChartMouseState) {
        ChartMouseState[ChartMouseState["mouseUp"] = 0] = "mouseUp";
        ChartMouseState[ChartMouseState["mouseDown"] = 1] = "mouseDown";
        ChartMouseState[ChartMouseState["dragging"] = 2] = "dragging";
    })(ChartMouseState || (ChartMouseState = {}));
    /**
     * Arguments for EventExecuteChartCommand
     *
     * @class EventExecuteChartCommandArgs
     */
    var EventExecuteChartCommandArgs = /** @class */ (function () {
        function EventExecuteChartCommandArgs(caller, commandType, traceChart, data) {
            if (data === void 0) { data = {}; }
            this.caller = caller;
            this.commandType = commandType;
            this.traceChart = traceChart;
            this.data = data;
        }
        return EventExecuteChartCommandArgs;
    }());
    exports.EventExecuteChartCommandArgs = EventExecuteChartCommandArgs;
    /**
     * UserInteractionController
     *
     * @class UserInteractionController
     * @implements {IUserInteractionController}
     */
    var UserInteractionController = /** @class */ (function () {
        function UserInteractionController(states) {
            var _this = this;
            this.mouseDownPosition = [];
            this.zoomStep = 1.2;
            this.zoomDirection = chartViewWidget_1.ZoomDirection.XY;
            this.eventExecuteChartCommand = new EventExecuteChartCommand();
            this.mouseState = ChartMouseState.mouseUp;
            this.activeStrategies = [];
            this.selectCursor(1);
            this._states = states;
            this._states.observe(this, chartViewToolbarStates_1.ChartViewToolState, function (modifiedState, oldState) {
                _this.updateOnChartViewToolStateChange(modifiedState);
            }, "ChartViewToolState");
            this._states.observe(this, chartViewToolbarStates_1.ChartViewZoomDirectionState, function (modifiedState, oldState) {
                _this.updateOnChartViewZoomDirectionChange(modifiedState);
            }, "ChartViewZoomDirectionState");
            //needed for mouse actions that are happening outside of the charts
            $(document).on("mouseup", (function () { return _this.onMouseUpOutsideOfChart(); }));
            $(document).on("mousemove", (function (e) { return _this.onMouseMoveOutsideOfChart(e); }));
        }
        UserInteractionController.prototype.updateOnChartViewToolStateChange = function (modifiedState) {
            switch (modifiedState.selectedTool) {
                case chartViewToolbarStates_1.ChartViewToolStateEnum.CURSORS: {
                    this.selectCursor(1);
                    break;
                }
                case chartViewToolbarStates_1.ChartViewToolStateEnum.PANNING:
                    this.setPanning();
                    break;
                case chartViewToolbarStates_1.ChartViewToolStateEnum.BOXZOOM:
                    this.setBoxZoom();
                    break;
            }
        };
        UserInteractionController.prototype.updateOnChartViewZoomDirectionChange = function (modifiedState) {
            switch (modifiedState.zoomDirection) {
                case chartViewWidget_1.ZoomDirection.X:
                    this.eventExecuteChartCommand.raise(this, new EventExecuteChartCommandArgs(this, ChartCommandType.selectZoomAxis, null, { zoomAxes: chartViewWidget_1.ZoomDirection.X }));
                    this.zoomDirection = chartViewWidget_1.ZoomDirection.X;
                    break;
                case chartViewWidget_1.ZoomDirection.Y:
                    this.eventExecuteChartCommand.raise(this, new EventExecuteChartCommandArgs(this, ChartCommandType.selectZoomAxis, null, { zoomAxes: chartViewWidget_1.ZoomDirection.Y }));
                    this.zoomDirection = chartViewWidget_1.ZoomDirection.Y;
                    break;
                case chartViewWidget_1.ZoomDirection.XY:
                    this.eventExecuteChartCommand.raise(this, new EventExecuteChartCommandArgs(this, ChartCommandType.selectZoomAxis, null, { zoomAxes: chartViewWidget_1.ZoomDirection.XY }));
                    this.zoomDirection = chartViewWidget_1.ZoomDirection.XY;
                    break;
            }
        };
        /**
         * method called when the user interacts with charts
         *
         * @param {MouseActionType} chartInteractionType
         * @param {ITraceChart} sender chart in which interaction happened
         * @param {*} args
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.onChartInteraction = function (chartInteractionType, sender, args) {
            switch (chartInteractionType) {
                case (MouseActionType.mouseDown):
                    this.onChartMouseDown(sender, args);
                    break;
                case (MouseActionType.mouseUp):
                    this.onChartMouseUp(sender, args);
                    break;
                case (MouseActionType.mouseMove):
                    this.onChartMouseMove(sender, args);
                    break;
                case (MouseActionType.mouseWheel):
                    this.onChartMouseWheel(sender, args);
                    break;
            }
        };
        /**
         *method called on mouse down event
         *
         * @private
         * @param {ITraceChart} sender chart in which mouseDown happened
         * @param {*} args
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.onChartMouseDown = function (sender, args) {
            this.mouseState = ChartMouseState.mouseDown;
            this.activeChart = sender;
            this.mouseDownPosition = [args.mousePointChart.x, args.mousePointChart.y];
            for (var i = 0; i < this.activeStrategies.length; i++) {
                args.objectUnderMouse = this.activeStrategies[i].onMouseDown(sender, args.objectUnderMouse, args.mousePointChart);
            }
        };
        /**
         *method called on mouse up event
         *
         * @private
         * @param {ITraceChart} sender chart in which mouseUp happened
         * @param {*} args
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.onChartMouseUp = function (sender, args) {
            if (this.mouseDownPosition[0] != args.mousePointChart.x || this.mouseDownPosition[1] != args.mousePointChart.y) {
                for (var i = 0; i < this.activeStrategies.length; i++) {
                    this.activeStrategies[i].onDragEnd(sender, args.objectUnderMouse);
                }
            }
            else {
                for (var i = 0; i < this.activeStrategies.length; i++) {
                    this.activeStrategies[i].onClick(sender, args.objectUnderMouse, args.mousePointChart);
                }
            }
            this.mouseState = ChartMouseState.mouseUp;
            this.activeChart = undefined;
            this.mouseDownPosition = [];
        };
        /**
         * called when the mousebutton is released outside of a chart
         *
         * @private
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.onMouseUpOutsideOfChart = function () {
            if (this.mouseState == ChartMouseState.dragging) {
                //each strategy has to be notified, when the drag stopped outside of the chart
                for (var i = 0; i < this.activeStrategies.length; i++) {
                    this.activeStrategies[i].onDragEnd(undefined, new ChartBase_1.ChartObjectInformation(ChartBase_1.ChartObjectType.invalid, {}));
                }
            }
            this.mouseState = ChartMouseState.mouseUp;
            this.mouseDownPosition = [];
            this.eventExecuteChartCommand.raise(this, new EventExecuteChartCommandArgs(this, ChartCommandType.resetDragPosition, null, {}));
        };
        /**
         * called when the mouse is moved outside of the chart
         *
         * @private
         * @param {*} e
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.onMouseMoveOutsideOfChart = function (e) {
            //only reset the hovering state when the mouse is currently dragging (e.g dragging the cursor)
            if (this.mouseState != ChartMouseState.dragging) {
                this.eventExecuteChartCommand.raise(this, new EventExecuteChartCommandArgs(this, ChartCommandType.resetCursorHovering, null, { e: e }));
            }
        };
        /**
         *method called on mouse move event
         *
         * @private
         * @param {ITraceChart} sender chart in which mouseDown happened
         * @param {*} args
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.onChartMouseMove = function (sender, args) {
            if (this.mouseState == ChartMouseState.mouseUp) {
                this.mouseHover(sender, args);
            }
            else {
                if (this.activeChart) {
                    args.mousePointChart = new point_1.Point(args.mousePoint.x - this.activeChart.mainDiv.getBoundingClientRect().x, args.mousePoint.y - this.activeChart.mainDiv.getBoundingClientRect().y);
                    this.mouseDrag(this.activeChart, args);
                }
            }
        };
        /**
         *method called when mouse is hovering above chart
         *
         * @private
         * @param {*} sender chart in which hover happened
         * @param {*} args
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.mouseHover = function (sender, args) {
            for (var i = 0; i < this.activeStrategies.length; i++) {
                this.activeStrategies[i].onMouseHover(sender, args.objectUnderMouse, args.mousePointChart);
            }
        };
        /**
         *method called when mouse is draged on chart
         *
         * @private
         * @param {*} sender chart in which drag happened
         * @param {*} args
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.mouseDrag = function (sender, args) {
            this.mouseState = ChartMouseState.dragging;
            var activeStrategy = this.getActiveDragStrategy();
            if (activeStrategy != undefined) {
                activeStrategy.onDrag(sender, args);
            }
            else {
                for (var i = 0; i < this.activeStrategies.length; i++) {
                    this.activeStrategies[i].onDrag(sender, args);
                    if (this.activeStrategies[i].dragIsActive == true) {
                        break;
                    }
                }
            }
        };
        /**
         * checks if any drag operation is active and return corresponding strategy
         *
         * @private
         * @returns IChartInteractionStrategy | undefined
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.getActiveDragStrategy = function () {
            for (var i = 0; i < this.activeStrategies.length; i++) {
                if (this.activeStrategies[i].dragIsActive == true) {
                    return this.activeStrategies[i];
                }
            }
            return undefined;
        };
        /**
         *method called when mouse wheel changes
         *
         * @private
         * @param {ITraceChart} sender
         * @param {*} args
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.onChartMouseWheel = function (sender, args) {
            var zoomStep = this.zoomStep;
            if (args.wheelDelta > 0) {
                zoomStep = 1 / this.zoomStep;
            }
            if (args.objectUnderMouse.chartObjectType != ChartBase_1.ChartObjectType.emptySpace) {
                var axes = new Array();
                if (args.objectUnderMouse.chartObjectType == ChartBase_1.ChartObjectType.axis) {
                    axes.push(sender.chart.getAxis(args.objectUnderMouse.args.axis.getAxisID()));
                }
                this.eventExecuteChartCommand.raise(this, new EventExecuteChartCommandArgs(this, ChartCommandType.zoomChart, sender, { mousePoint: args.mousePoint, zoomStep: zoomStep, zoomDirection: this.zoomDirection, axes: axes }));
            }
        };
        /**
         * method called when the chartViewToolbar is clicked
         *
         * @param {IChartViewToolbar} sender
         * @param {*} args
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.onToolbarClick = function (sender, args) {
            //TODO: remove this method and use state updates instead
            if (args.groupNumber == 3) {
                this.eventExecuteChartCommand.raise(this, new EventExecuteChartCommandArgs(this, ChartCommandType.autoScale, null));
            }
            if (args.groupNumber == 4) {
                this.eventExecuteChartCommand.raise(this, new EventExecuteChartCommandArgs(this, ChartCommandType.resetZoom, null));
            }
        };
        /**
         *method used to execute a chart command
         *
         * @param {EventExecuteChartCommandArgs} executeChartCommandArgs
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.executeCommand = function (executeChartCommandArgs) {
            this.eventExecuteChartCommand.raise(this, executeChartCommandArgs);
        };
        /**
         * method to choose one of the cursors as active tool by index
         *
         * @param {number} cursorIndex
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.selectCursor = function (cursorIndex) {
            //let commandArguments = new EventExecuteChartCommandArgs(this,ChartCommandType.selectCursor, null, {cursorIndex : cursorIndex});
            //this.executeCommand(commandArguments);
            var commandArguments = new EventExecuteChartCommandArgs(this, ChartCommandType.toggleBoxZoom, null, { enabled: false });
            this.executeCommand(commandArguments);
            commandArguments = new EventExecuteChartCommandArgs(this, ChartCommandType.togglePanning, null, { enabled: false });
            this.executeCommand(commandArguments);
            this.clearActiveStrategies();
            this.activeStrategies.push(new axisPanningStrategy_1.AxisPanningStrategy(this));
            this.activeStrategies.push(new cursorStrategy_1.CursorInteractionStrategy(this, cursorIndex));
            this.activeStrategies.push(new cursorDragStrategy_1.CursorDragStrategy(this, cursorIndex));
        };
        /**
         * method to set panning as active tool
         *
         * @private
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.setPanning = function () {
            this.clearActiveStrategies();
            this.activeStrategies.push(new axisPanningStrategy_1.AxisPanningStrategy(this));
            this.activeStrategies.push(new chartPanningStrategy_1.ChartPanningStrategy(this));
            this.activeStrategies.push(new cursorDragStrategy_1.CursorDragStrategy(this, 0));
            this.eventExecuteChartCommand.raise(this, new EventExecuteChartCommandArgs(this, ChartCommandType.toggleBoxZoom, null, { boxZoomEnabled: false }));
            this.eventExecuteChartCommand.raise(this, new EventExecuteChartCommandArgs(this, ChartCommandType.togglePanning, null, { panningEnabled: false }));
        };
        /**
         *method to set box zoom as active tool
         *
         * @private
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.setBoxZoom = function () {
            this.clearActiveStrategies();
            this.activeStrategies.push(new axisPanningStrategy_1.AxisPanningStrategy(this));
            this.activeStrategies.unshift(new chartBoxZoomStrategy_1.ChartBoxZoomStrategy(this));
            this.activeStrategies.push(new cursorDragStrategy_1.CursorDragStrategy(this, 0));
            this.eventExecuteChartCommand.raise(this, new EventExecuteChartCommandArgs(this, ChartCommandType.toggleBoxZoom, null, { boxZoomEnabled: true }));
            this.eventExecuteChartCommand.raise(this, new EventExecuteChartCommandArgs(this, ChartCommandType.togglePanning, null, { panningEnabled: false }));
        };
        /**
         *removes all active strategys that are in place
         *
         * @private
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.clearActiveStrategies = function () {
            this.activeStrategies = [];
            this.activeStrategies.push(new charStrategyInterface_1.ChartIdleStrategy(this));
        };
        return UserInteractionController;
    }());
    exports.UserInteractionController = UserInteractionController;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlckludGVyYWN0aW9uQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydFdpZGdldC91c2VySW50ZXJhY3Rpb24vdXNlckludGVyYWN0aW9uQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBa0JBO1FBQXVDLDRDQUFvRTtRQUEzRzs7UUFBOEcsQ0FBQztRQUFELCtCQUFDO0lBQUQsQ0FBQyxBQUEvRyxDQUF1QyxtQkFBVSxHQUE4RDtJQTJiM0UsNERBQXdCO0lBM2JtRCxDQUFDO0lBRWhIOzs7O09BSUc7SUFDSCxJQUFLLGdCQWdCSjtJQWhCRCxXQUFLLGdCQUFnQjtRQUNqQixtR0FBMEIsQ0FBQTtRQUMxQixpRUFBUyxDQUFBO1FBQ1QsdUVBQVksQ0FBQTtRQUNaLHFGQUFtQixDQUFBO1FBQ25CLG1FQUFVLENBQUE7UUFDVix5RUFBYSxDQUFBO1FBQ2IsK0RBQVEsQ0FBQTtRQUNSLHlFQUFhLENBQUE7UUFDYix5RUFBYSxDQUFBO1FBQ2IsMkVBQWMsQ0FBQTtRQUNkLGtGQUFpQixDQUFBO1FBQ2pCLGtFQUFTLENBQUE7UUFDVCxrRUFBUyxDQUFBO1FBQ1Qsa0ZBQWlCLENBQUE7UUFDakIsc0ZBQW1CLENBQUE7SUFDdkIsQ0FBQyxFQWhCSSxnQkFBZ0IsS0FBaEIsZ0JBQWdCLFFBZ0JwQjtJQW9hMkYsNENBQWdCO0lBbGE1Rzs7OztPQUlHO0lBQ0gsSUFBSyxlQUtKO0lBTEQsV0FBSyxlQUFlO1FBQ2hCLCtEQUFTLENBQUE7UUFDVCwyREFBTyxDQUFBO1FBQ1AsK0RBQVMsQ0FBQTtRQUNULGlFQUFVLENBQUE7SUFDZCxDQUFDLEVBTEksZUFBZSxLQUFmLGVBQWUsUUFLbkI7SUF3WjZHLDBDQUFlO0lBdFo3SDs7OztPQUlHO0lBQ0gsSUFBSyxlQUlKO0lBSkQsV0FBSyxlQUFlO1FBQ2hCLDJEQUFPLENBQUE7UUFD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LElBZ1hDO0lBRVEsOERBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVRyYWNlQ2hhcnQgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy90cmFjZUNoYXJ0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElVc2VySW50ZXJhY3Rpb25Db250cm9sbGVyIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9jb250cm9sbGVySW50ZXJmYWNlXCJcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IElDaGFydFZpZXdUb29sYmFyIH0gZnJvbSBcIi4uLy4uL2NoYXJ0Vmlld1dpZGdldC90b29sYmFyL2ludGVyZmFjZXMvY2hhcnRWaWV3VG9vbGJhckludGVyZmFjZVwiXHJcbmltcG9ydCB7IElDaGFydEludGVyYWN0aW9uU3RyYXRlZ3ksIENoYXJ0SWRsZVN0cmF0ZWd5IH0gZnJvbSBcIi4vc3RyYXRlZ2llcy9jaGFyU3RyYXRlZ3lJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ3Vyc29ySW50ZXJhY3Rpb25TdHJhdGVneSB9IGZyb20gXCIuL3N0cmF0ZWdpZXMvY3Vyc29yU3RyYXRlZ3lcIjtcclxuaW1wb3J0IHsgQ2hhcnRQYW5uaW5nU3RyYXRlZ3kgfSBmcm9tIFwiLi9zdHJhdGVnaWVzL2NoYXJ0UGFubmluZ1N0cmF0ZWd5XCI7XHJcbmltcG9ydCB7IFpvb21EaXJlY3Rpb24gfSBmcm9tIFwiLi4vLi4vY2hhcnRWaWV3V2lkZ2V0L2NoYXJ0Vmlld1dpZGdldFwiO1xyXG5pbXBvcnQgeyBDaGFydEJveFpvb21TdHJhdGVneSB9IGZyb20gXCIuL3N0cmF0ZWdpZXMvY2hhcnRCb3hab29tU3RyYXRlZ3lcIjtcclxuaW1wb3J0IHsgQ3Vyc29yRHJhZ1N0cmF0ZWd5IH0gZnJvbSBcIi4vc3RyYXRlZ2llcy9jdXJzb3JEcmFnU3RyYXRlZ3lcIjtcclxuaW1wb3J0IHsgQ2hhcnRPYmplY3RUeXBlLCBDaGFydE9iamVjdEluZm9ybWF0aW9uIH0gZnJvbSBcIi4uL0NoYXJ0QmFzZVwiO1xyXG5pbXBvcnQgeyBDaGFydFZpZXdUb29sU3RhdGUsIENoYXJ0Vmlld1Rvb2xTdGF0ZUVudW0sIENoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZSB9IGZyb20gXCIuLi8uLi9jb21tb24vc3RhdGVzL2NoYXJ0Vmlld1Rvb2xiYXJTdGF0ZXNcIjtcclxuaW1wb3J0IHsgU3RvcmUgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3N0b3JlXCI7XHJcbmltcG9ydCB7IEF4aXNQYW5uaW5nU3RyYXRlZ3kgfSBmcm9tIFwiLi9zdHJhdGVnaWVzL2F4aXNQYW5uaW5nU3RyYXRlZ3lcIjtcclxuaW1wb3J0IHsgRXZlbnRNb3VzZUFyZ3MgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9pbnRlcmZhY2VzL2NvbXBvbmVudHMvdWkvY2hhcnQvY2hhcnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS90eXBlcy9wb2ludFwiO1xyXG5cclxuXHJcbmNsYXNzIEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZCBleHRlbmRzIFR5cGVkRXZlbnQ8SVVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXIsIEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3M+IHsgfTtcclxuXHJcbi8qKlxyXG4gKiBDb21tYW5kcyB0aGF0IGNhbiBiZSB1c2VkIHdpdGhpbiB0aGUgY2hhcnRzXHJcbiAqXHJcbiAqIEBlbnVtIHtudW1iZXJ9XHJcbiAqL1xyXG5lbnVtIENoYXJ0Q29tbWFuZFR5cGUge1xyXG4gICAgc2V0Q3Vyc29yT25Qb2ludGVyUG9zaXRpb24sXHJcbiAgICByZXNldFpvb20sXHJcbiAgICBzZWxlY3RDdXJzb3IsXHJcbiAgICBjaGVja0N1cnNvckhvdmVyaW5nLFxyXG4gICAgZHJhZ0N1cnNvcixcclxuICAgIGVuZEN1cnNvckRyYWcsXHJcbiAgICBwYW5DaGFydCxcclxuICAgIHRvZ2dsZUJveFpvb20sXHJcbiAgICB0b2dnbGVQYW5uaW5nLFxyXG4gICAgc2VsZWN0Wm9vbUF4aXMsXHJcbiAgICBzZWxlY3RQYW5uaW5nQXhlcyxcclxuICAgIHpvb21DaGFydCxcclxuICAgIGF1dG9TY2FsZSxcclxuICAgIHJlc2V0RHJhZ1Bvc2l0aW9uLFxyXG4gICAgcmVzZXRDdXJzb3JIb3ZlcmluZ1xyXG59XHJcblxyXG4vKipcclxuICogQ2hhcnRJbnRlcmFjdGlvblR5cGVcclxuICpcclxuICogQGVudW0ge251bWJlcn1cclxuICovXHJcbmVudW0gTW91c2VBY3Rpb25UeXBlIHtcclxuICAgIG1vdXNlRG93bixcclxuICAgIG1vdXNlVXAsXHJcbiAgICBtb3VzZU1vdmUsXHJcbiAgICBtb3VzZVdoZWVsXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDaGFydE1vdXNlU3RhdGVcclxuICpcclxuICogQGVudW0ge251bWJlcn1cclxuICovXHJcbmVudW0gQ2hhcnRNb3VzZVN0YXRlIHtcclxuICAgIG1vdXNlVXAsXHJcbiAgICBtb3VzZURvd24sXHJcbiAgICBkcmFnZ2luZyxcclxufVxyXG5cclxuLyoqXHJcbiAqIEFyZ3VtZW50cyBmb3IgRXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kXHJcbiAqXHJcbiAqIEBjbGFzcyBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzXHJcbiAqL1xyXG5jbGFzcyBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzIHtcclxuICAgIGNvbW1hbmRUeXBlOiBDaGFydENvbW1hbmRUeXBlO1xyXG4gICAgY2FsbGVyOiBhbnk7XHJcbiAgICB0cmFjZUNoYXJ0OiBJVHJhY2VDaGFydCB8IG51bGw7XHJcbiAgICBkYXRhOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY2FsbGVyOiBhbnksIGNvbW1hbmRUeXBlOiBDaGFydENvbW1hbmRUeXBlLCB0cmFjZUNoYXJ0OiBJVHJhY2VDaGFydCB8IG51bGwsIGRhdGE6IGFueSA9IHt9KSB7XHJcbiAgICAgICAgdGhpcy5jYWxsZXIgPSBjYWxsZXI7XHJcbiAgICAgICAgdGhpcy5jb21tYW5kVHlwZSA9IGNvbW1hbmRUeXBlO1xyXG4gICAgICAgIHRoaXMudHJhY2VDaGFydCA9IHRyYWNlQ2hhcnQ7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgIH1cclxuXHJcbn1cclxuLyoqXHJcbiAqIFVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXJcclxuICpcclxuICogQGNsYXNzIFVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXJcclxuICogQGltcGxlbWVudHMge0lVc2VySW50ZXJhY3Rpb25Db250cm9sbGVyfVxyXG4gKi9cclxuY2xhc3MgVXNlckludGVyYWN0aW9uQ29udHJvbGxlciBpbXBsZW1lbnRzIElVc2VySW50ZXJhY3Rpb25Db250cm9sbGVyIHtcclxuXHJcbiAgICBldmVudEV4ZWN1dGVDaGFydENvbW1hbmQ6IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZDtcclxuXHJcbiAgICBwcml2YXRlIG1vdXNlU3RhdGU6IENoYXJ0TW91c2VTdGF0ZTtcclxuICAgIHByaXZhdGUgbW91c2VEb3duUG9zaXRpb246IG51bWJlcltdID0gW107XHJcblxyXG5cclxuICAgIHByaXZhdGUgYWN0aXZlU3RyYXRlZ2llczogSUNoYXJ0SW50ZXJhY3Rpb25TdHJhdGVneVtdO1xyXG4gICAgcHJpdmF0ZSBhY3RpdmVDaGFydDogSVRyYWNlQ2hhcnQgfCB1bmRlZmluZWRcclxuXHJcbiAgICBwcml2YXRlIHpvb21TdGVwOiBudW1iZXIgPSAxLjI7XHJcbiAgICBwcml2YXRlIHpvb21EaXJlY3Rpb246IFpvb21EaXJlY3Rpb24gPSBab29tRGlyZWN0aW9uLlhZO1xyXG5cclxuICAgIHByaXZhdGUgX3N0YXRlczogU3RvcmU7XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHN0YXRlczogU3RvcmUpIHtcclxuICAgICAgICB0aGlzLmV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZCA9IG5ldyBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5tb3VzZVN0YXRlID0gQ2hhcnRNb3VzZVN0YXRlLm1vdXNlVXBcclxuICAgICAgICB0aGlzLmFjdGl2ZVN0cmF0ZWdpZXMgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5zZWxlY3RDdXJzb3IoMSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3N0YXRlcyA9IHN0YXRlcztcclxuICAgICAgICB0aGlzLl9zdGF0ZXMub2JzZXJ2ZSh0aGlzLCBDaGFydFZpZXdUb29sU3RhdGUsIChtb2RpZmllZFN0YXRlOiBDaGFydFZpZXdUb29sU3RhdGUsIG9sZFN0YXRlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlT25DaGFydFZpZXdUb29sU3RhdGVDaGFuZ2UobW9kaWZpZWRTdGF0ZSk7XHJcbiAgICAgICAgfSwgXCJDaGFydFZpZXdUb29sU3RhdGVcIik7XHJcblxyXG4gICAgICAgIHRoaXMuX3N0YXRlcy5vYnNlcnZlKHRoaXMsIENoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZSwgKG1vZGlmaWVkU3RhdGU6IENoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZSwgb2xkU3RhdGUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVPbkNoYXJ0Vmlld1pvb21EaXJlY3Rpb25DaGFuZ2UobW9kaWZpZWRTdGF0ZSk7XHJcbiAgICAgICAgfSwgXCJDaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGVcIik7XHJcblxyXG4gICAgICAgIC8vbmVlZGVkIGZvciBtb3VzZSBhY3Rpb25zIHRoYXQgYXJlIGhhcHBlbmluZyBvdXRzaWRlIG9mIHRoZSBjaGFydHNcclxuICAgICAgICAkKGRvY3VtZW50KS5vbihcIm1vdXNldXBcIiwgKCgpID0+IHRoaXMub25Nb3VzZVVwT3V0c2lkZU9mQ2hhcnQoKSkpO1xyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKFwibW91c2Vtb3ZlXCIsICgoZSkgPT4gdGhpcy5vbk1vdXNlTW92ZU91dHNpZGVPZkNoYXJ0KGUpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVPbkNoYXJ0Vmlld1Rvb2xTdGF0ZUNoYW5nZShtb2RpZmllZFN0YXRlOiBDaGFydFZpZXdUb29sU3RhdGUpIHtcclxuICAgICAgICBzd2l0Y2ggKG1vZGlmaWVkU3RhdGUuc2VsZWN0ZWRUb29sKSB7XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRWaWV3VG9vbFN0YXRlRW51bS5DVVJTT1JTOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEN1cnNvcigxKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRWaWV3VG9vbFN0YXRlRW51bS5QQU5OSU5HOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQYW5uaW5nKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDaGFydFZpZXdUb29sU3RhdGVFbnVtLkJPWFpPT006XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEJveFpvb20oKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZU9uQ2hhcnRWaWV3Wm9vbURpcmVjdGlvbkNoYW5nZShtb2RpZmllZFN0YXRlOiBDaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGUpIHtcclxuICAgICAgICBzd2l0Y2ggKG1vZGlmaWVkU3RhdGUuem9vbURpcmVjdGlvbikge1xyXG4gICAgICAgICAgICBjYXNlIFpvb21EaXJlY3Rpb24uWDpcclxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kLnJhaXNlKHRoaXMsIG5ldyBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzKHRoaXMsIENoYXJ0Q29tbWFuZFR5cGUuc2VsZWN0Wm9vbUF4aXMsIG51bGwsIHsgem9vbUF4ZXM6IFpvb21EaXJlY3Rpb24uWCB9KSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnpvb21EaXJlY3Rpb24gPSBab29tRGlyZWN0aW9uLlg7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBab29tRGlyZWN0aW9uLlk6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZC5yYWlzZSh0aGlzLCBuZXcgRXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kQXJncyh0aGlzLCBDaGFydENvbW1hbmRUeXBlLnNlbGVjdFpvb21BeGlzLCBudWxsLCB7IHpvb21BeGVzOiBab29tRGlyZWN0aW9uLlkgfSkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy56b29tRGlyZWN0aW9uID0gWm9vbURpcmVjdGlvbi5ZO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgWm9vbURpcmVjdGlvbi5YWTpcclxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kLnJhaXNlKHRoaXMsIG5ldyBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzKHRoaXMsIENoYXJ0Q29tbWFuZFR5cGUuc2VsZWN0Wm9vbUF4aXMsIG51bGwsIHsgem9vbUF4ZXM6IFpvb21EaXJlY3Rpb24uWFkgfSkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy56b29tRGlyZWN0aW9uID0gWm9vbURpcmVjdGlvbi5YWTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG1ldGhvZCBjYWxsZWQgd2hlbiB0aGUgdXNlciBpbnRlcmFjdHMgd2l0aCBjaGFydHNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01vdXNlQWN0aW9uVHlwZX0gY2hhcnRJbnRlcmFjdGlvblR5cGVcclxuICAgICAqIEBwYXJhbSB7SVRyYWNlQ2hhcnR9IHNlbmRlciBjaGFydCBpbiB3aGljaCBpbnRlcmFjdGlvbiBoYXBwZW5lZFxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgVXNlckludGVyYWN0aW9uQ29udHJvbGxlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25DaGFydEludGVyYWN0aW9uKGNoYXJ0SW50ZXJhY3Rpb25UeXBlOiBNb3VzZUFjdGlvblR5cGUsIHNlbmRlcjogSVRyYWNlQ2hhcnQsIGFyZ3M6IGFueSkge1xyXG4gICAgICAgIHN3aXRjaCAoY2hhcnRJbnRlcmFjdGlvblR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAoTW91c2VBY3Rpb25UeXBlLm1vdXNlRG93bik6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2hhcnRNb3VzZURvd24oc2VuZGVyLCBhcmdzKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgKE1vdXNlQWN0aW9uVHlwZS5tb3VzZVVwKTpcclxuICAgICAgICAgICAgICAgIHRoaXMub25DaGFydE1vdXNlVXAoc2VuZGVyLCBhcmdzKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgKE1vdXNlQWN0aW9uVHlwZS5tb3VzZU1vdmUpOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNoYXJ0TW91c2VNb3ZlKHNlbmRlciwgYXJncylcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIChNb3VzZUFjdGlvblR5cGUubW91c2VXaGVlbCk6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2hhcnRNb3VzZVdoZWVsKHNlbmRlciwgYXJncylcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqbWV0aG9kIGNhbGxlZCBvbiBtb3VzZSBkb3duIGV2ZW50XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVRyYWNlQ2hhcnR9IHNlbmRlciBjaGFydCBpbiB3aGljaCBtb3VzZURvd24gaGFwcGVuZWRcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkNoYXJ0TW91c2VEb3duKHNlbmRlcjogSVRyYWNlQ2hhcnQsIGFyZ3M6IEV2ZW50TW91c2VBcmdzKSB7XHJcbiAgICAgICAgdGhpcy5tb3VzZVN0YXRlID0gQ2hhcnRNb3VzZVN0YXRlLm1vdXNlRG93bjtcclxuICAgICAgICB0aGlzLmFjdGl2ZUNoYXJ0ID0gc2VuZGVyO1xyXG4gICAgICAgIHRoaXMubW91c2VEb3duUG9zaXRpb24gPSBbYXJncy5tb3VzZVBvaW50Q2hhcnQueCwgYXJncy5tb3VzZVBvaW50Q2hhcnQueV07XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFjdGl2ZVN0cmF0ZWdpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgYXJncy5vYmplY3RVbmRlck1vdXNlID0gdGhpcy5hY3RpdmVTdHJhdGVnaWVzW2ldLm9uTW91c2VEb3duKHNlbmRlciwgYXJncy5vYmplY3RVbmRlck1vdXNlLCBhcmdzLm1vdXNlUG9pbnRDaGFydCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICptZXRob2QgY2FsbGVkIG9uIG1vdXNlIHVwIGV2ZW50XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVRyYWNlQ2hhcnR9IHNlbmRlciBjaGFydCBpbiB3aGljaCBtb3VzZVVwIGhhcHBlbmVkXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBVc2VySW50ZXJhY3Rpb25Db250cm9sbGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25DaGFydE1vdXNlVXAoc2VuZGVyOiBJVHJhY2VDaGFydCwgYXJncyA6IEV2ZW50TW91c2VBcmdzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubW91c2VEb3duUG9zaXRpb25bMF0gIT0gYXJncy5tb3VzZVBvaW50Q2hhcnQueCB8fCB0aGlzLm1vdXNlRG93blBvc2l0aW9uWzFdICE9IGFyZ3MubW91c2VQb2ludENoYXJ0LnkpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFjdGl2ZVN0cmF0ZWdpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlU3RyYXRlZ2llc1tpXS5vbkRyYWdFbmQoc2VuZGVyLCBhcmdzLm9iamVjdFVuZGVyTW91c2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYWN0aXZlU3RyYXRlZ2llcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVTdHJhdGVnaWVzW2ldLm9uQ2xpY2soc2VuZGVyLCBhcmdzLm9iamVjdFVuZGVyTW91c2UsIGFyZ3MubW91c2VQb2ludENoYXJ0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1vdXNlU3RhdGUgPSBDaGFydE1vdXNlU3RhdGUubW91c2VVcDtcclxuICAgICAgICB0aGlzLmFjdGl2ZUNoYXJ0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMubW91c2VEb3duUG9zaXRpb24gPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNhbGxlZCB3aGVuIHRoZSBtb3VzZWJ1dHRvbiBpcyByZWxlYXNlZCBvdXRzaWRlIG9mIGEgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbk1vdXNlVXBPdXRzaWRlT2ZDaGFydCgpIHtcclxuICAgICAgICBpZiAodGhpcy5tb3VzZVN0YXRlID09IENoYXJ0TW91c2VTdGF0ZS5kcmFnZ2luZykge1xyXG4gICAgICAgICAgICAvL2VhY2ggc3RyYXRlZ3kgaGFzIHRvIGJlIG5vdGlmaWVkLCB3aGVuIHRoZSBkcmFnIHN0b3BwZWQgb3V0c2lkZSBvZiB0aGUgY2hhcnRcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFjdGl2ZVN0cmF0ZWdpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlU3RyYXRlZ2llc1tpXS5vbkRyYWdFbmQodW5kZWZpbmVkIGFzIHVua25vd24gYXMgSVRyYWNlQ2hhcnQsIG5ldyBDaGFydE9iamVjdEluZm9ybWF0aW9uKENoYXJ0T2JqZWN0VHlwZS5pbnZhbGlkLCB7fSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm1vdXNlU3RhdGUgPSBDaGFydE1vdXNlU3RhdGUubW91c2VVcDtcclxuICAgICAgICB0aGlzLm1vdXNlRG93blBvc2l0aW9uID0gW107XHJcblxyXG4gICAgICAgIHRoaXMuZXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kLnJhaXNlKHRoaXMsIG5ldyBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzKHRoaXMsIENoYXJ0Q29tbWFuZFR5cGUucmVzZXREcmFnUG9zaXRpb24sIG51bGwsIHt9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjYWxsZWQgd2hlbiB0aGUgbW91c2UgaXMgbW92ZWQgb3V0c2lkZSBvZiB0aGUgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBlXHJcbiAgICAgKiBAbWVtYmVyb2YgVXNlckludGVyYWN0aW9uQ29udHJvbGxlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uTW91c2VNb3ZlT3V0c2lkZU9mQ2hhcnQoZSk6IHZvaWQge1xyXG4gICAgICAgIC8vb25seSByZXNldCB0aGUgaG92ZXJpbmcgc3RhdGUgd2hlbiB0aGUgbW91c2UgaXMgY3VycmVudGx5IGRyYWdnaW5nIChlLmcgZHJhZ2dpbmcgdGhlIGN1cnNvcilcclxuICAgICAgICBpZiAodGhpcy5tb3VzZVN0YXRlICE9IENoYXJ0TW91c2VTdGF0ZS5kcmFnZ2luZykge1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZC5yYWlzZSh0aGlzLCBuZXcgRXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kQXJncyh0aGlzLCBDaGFydENvbW1hbmRUeXBlLnJlc2V0Q3Vyc29ySG92ZXJpbmcsIG51bGwsIHsgZSB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICptZXRob2QgY2FsbGVkIG9uIG1vdXNlIG1vdmUgZXZlbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJVHJhY2VDaGFydH0gc2VuZGVyIGNoYXJ0IGluIHdoaWNoIG1vdXNlRG93biBoYXBwZW5lZFxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgVXNlckludGVyYWN0aW9uQ29udHJvbGxlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uQ2hhcnRNb3VzZU1vdmUoc2VuZGVyOiBJVHJhY2VDaGFydCwgYXJncyA6IEV2ZW50TW91c2VBcmdzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubW91c2VTdGF0ZSA9PSBDaGFydE1vdXNlU3RhdGUubW91c2VVcCkge1xyXG4gICAgICAgICAgICB0aGlzLm1vdXNlSG92ZXIoc2VuZGVyLCBhcmdzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2ZUNoYXJ0KSB7XHJcbiAgICAgICAgICAgICAgICBhcmdzLm1vdXNlUG9pbnRDaGFydCA9IG5ldyBQb2ludChhcmdzLm1vdXNlUG9pbnQueCAtIHRoaXMuYWN0aXZlQ2hhcnQubWFpbkRpdi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS54LCBhcmdzLm1vdXNlUG9pbnQueSAtIHRoaXMuYWN0aXZlQ2hhcnQubWFpbkRpdi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS55KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubW91c2VEcmFnKHRoaXMuYWN0aXZlQ2hhcnQsIGFyZ3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKm1ldGhvZCBjYWxsZWQgd2hlbiBtb3VzZSBpcyBob3ZlcmluZyBhYm92ZSBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlbmRlciBjaGFydCBpbiB3aGljaCBob3ZlciBoYXBwZW5lZFxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgVXNlckludGVyYWN0aW9uQ29udHJvbGxlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG1vdXNlSG92ZXIoc2VuZGVyLCBhcmdzIDogRXZlbnRNb3VzZUFyZ3MpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYWN0aXZlU3RyYXRlZ2llcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVN0cmF0ZWdpZXNbaV0ub25Nb3VzZUhvdmVyKHNlbmRlciwgYXJncy5vYmplY3RVbmRlck1vdXNlLCBhcmdzLm1vdXNlUG9pbnRDaGFydCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICptZXRob2QgY2FsbGVkIHdoZW4gbW91c2UgaXMgZHJhZ2VkIG9uIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gc2VuZGVyIGNoYXJ0IGluIHdoaWNoIGRyYWcgaGFwcGVuZWRcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBtb3VzZURyYWcoc2VuZGVyLCBhcmdzIDogRXZlbnRNb3VzZUFyZ3MpIHtcclxuICAgICAgICB0aGlzLm1vdXNlU3RhdGUgPSBDaGFydE1vdXNlU3RhdGUuZHJhZ2dpbmc7XHJcblxyXG4gICAgICAgIGxldCBhY3RpdmVTdHJhdGVneSA9IHRoaXMuZ2V0QWN0aXZlRHJhZ1N0cmF0ZWd5KCk7XHJcbiAgICAgICAgaWYgKGFjdGl2ZVN0cmF0ZWd5ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBhY3RpdmVTdHJhdGVneS5vbkRyYWcoc2VuZGVyLCBhcmdzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hY3RpdmVTdHJhdGVnaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZVN0cmF0ZWdpZXNbaV0ub25EcmFnKHNlbmRlciwgYXJncyk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hY3RpdmVTdHJhdGVnaWVzW2ldLmRyYWdJc0FjdGl2ZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjaGVja3MgaWYgYW55IGRyYWcgb3BlcmF0aW9uIGlzIGFjdGl2ZSBhbmQgcmV0dXJuIGNvcnJlc3BvbmRpbmcgc3RyYXRlZ3lcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMgSUNoYXJ0SW50ZXJhY3Rpb25TdHJhdGVneSB8IHVuZGVmaW5lZFxyXG4gICAgICogQG1lbWJlcm9mIFVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRBY3RpdmVEcmFnU3RyYXRlZ3koKTogSUNoYXJ0SW50ZXJhY3Rpb25TdHJhdGVneSB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFjdGl2ZVN0cmF0ZWdpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZlU3RyYXRlZ2llc1tpXS5kcmFnSXNBY3RpdmUgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlU3RyYXRlZ2llc1tpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKm1ldGhvZCBjYWxsZWQgd2hlbiBtb3VzZSB3aGVlbCBjaGFuZ2VzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVRyYWNlQ2hhcnR9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgVXNlckludGVyYWN0aW9uQ29udHJvbGxlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uQ2hhcnRNb3VzZVdoZWVsKHNlbmRlcjogSVRyYWNlQ2hhcnQsIGFyZ3MpIHtcclxuICAgICAgICBsZXQgem9vbVN0ZXAgPSB0aGlzLnpvb21TdGVwO1xyXG4gICAgICAgIGlmIChhcmdzLndoZWVsRGVsdGEgPiAwKSB7XHJcbiAgICAgICAgICAgIHpvb21TdGVwID0gMSAvIHRoaXMuem9vbVN0ZXBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhcmdzLm9iamVjdFVuZGVyTW91c2UuY2hhcnRPYmplY3RUeXBlICE9IENoYXJ0T2JqZWN0VHlwZS5lbXB0eVNwYWNlKSB7XHJcbiAgICAgICAgICAgIGxldCBheGVzID0gbmV3IEFycmF5KCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoYXJncy5vYmplY3RVbmRlck1vdXNlLmNoYXJ0T2JqZWN0VHlwZSA9PSBDaGFydE9iamVjdFR5cGUuYXhpcykge1xyXG4gICAgICAgICAgICAgICAgYXhlcy5wdXNoKHNlbmRlci5jaGFydC5nZXRBeGlzKGFyZ3Mub2JqZWN0VW5kZXJNb3VzZS5hcmdzLmF4aXMuZ2V0QXhpc0lEKCkpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5ldmVudEV4ZWN1dGVDaGFydENvbW1hbmQucmFpc2UodGhpcywgbmV3IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3ModGhpcywgQ2hhcnRDb21tYW5kVHlwZS56b29tQ2hhcnQsIHNlbmRlciwgeyBtb3VzZVBvaW50OiBhcmdzLm1vdXNlUG9pbnQsIHpvb21TdGVwOiB6b29tU3RlcCwgem9vbURpcmVjdGlvbjogdGhpcy56b29tRGlyZWN0aW9uLCBheGVzOiBheGVzIH0pKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBtZXRob2QgY2FsbGVkIHdoZW4gdGhlIGNoYXJ0Vmlld1Rvb2xiYXIgaXMgY2xpY2tlZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SUNoYXJ0Vmlld1Rvb2xiYXJ9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgVXNlckludGVyYWN0aW9uQ29udHJvbGxlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25Ub29sYmFyQ2xpY2soc2VuZGVyOiBJQ2hhcnRWaWV3VG9vbGJhciwgYXJncykge1xyXG5cclxuICAgICAgICAvL1RPRE86IHJlbW92ZSB0aGlzIG1ldGhvZCBhbmQgdXNlIHN0YXRlIHVwZGF0ZXMgaW5zdGVhZFxyXG4gICAgICAgIGlmIChhcmdzLmdyb3VwTnVtYmVyID09IDMpIHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudEV4ZWN1dGVDaGFydENvbW1hbmQucmFpc2UodGhpcywgbmV3IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3ModGhpcywgQ2hhcnRDb21tYW5kVHlwZS5hdXRvU2NhbGUsIG51bGwpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFyZ3MuZ3JvdXBOdW1iZXIgPT0gNCkge1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZC5yYWlzZSh0aGlzLCBuZXcgRXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kQXJncyh0aGlzLCBDaGFydENvbW1hbmRUeXBlLnJlc2V0Wm9vbSwgbnVsbCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqbWV0aG9kIHVzZWQgdG8gZXhlY3V0ZSBhIGNoYXJ0IGNvbW1hbmRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3N9IGV4ZWN1dGVDaGFydENvbW1hbmRBcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgVXNlckludGVyYWN0aW9uQ29udHJvbGxlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZXhlY3V0ZUNvbW1hbmQoZXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3M6IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3MpIHtcclxuICAgICAgICB0aGlzLmV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZC5yYWlzZSh0aGlzLCBleGVjdXRlQ2hhcnRDb21tYW5kQXJncyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIG1ldGhvZCB0byBjaG9vc2Ugb25lIG9mIHRoZSBjdXJzb3JzIGFzIGFjdGl2ZSB0b29sIGJ5IGluZGV4XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN1cnNvckluZGV4XHJcbiAgICAgKiBAbWVtYmVyb2YgVXNlckludGVyYWN0aW9uQ29udHJvbGxlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2VsZWN0Q3Vyc29yKGN1cnNvckluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICAvL2xldCBjb21tYW5kQXJndW1lbnRzID0gbmV3IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3ModGhpcyxDaGFydENvbW1hbmRUeXBlLnNlbGVjdEN1cnNvciwgbnVsbCwge2N1cnNvckluZGV4IDogY3Vyc29ySW5kZXh9KTtcclxuICAgICAgICAvL3RoaXMuZXhlY3V0ZUNvbW1hbmQoY29tbWFuZEFyZ3VtZW50cyk7XHJcbiAgICAgICAgbGV0IGNvbW1hbmRBcmd1bWVudHMgPSBuZXcgRXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kQXJncyh0aGlzLCBDaGFydENvbW1hbmRUeXBlLnRvZ2dsZUJveFpvb20sIG51bGwsIHsgZW5hYmxlZDogZmFsc2UgfSk7XHJcbiAgICAgICAgdGhpcy5leGVjdXRlQ29tbWFuZChjb21tYW5kQXJndW1lbnRzKTtcclxuICAgICAgICBjb21tYW5kQXJndW1lbnRzID0gbmV3IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3ModGhpcywgQ2hhcnRDb21tYW5kVHlwZS50b2dnbGVQYW5uaW5nLCBudWxsLCB7IGVuYWJsZWQ6IGZhbHNlIH0pO1xyXG4gICAgICAgIHRoaXMuZXhlY3V0ZUNvbW1hbmQoY29tbWFuZEFyZ3VtZW50cyk7XHJcblxyXG4gICAgICAgIHRoaXMuY2xlYXJBY3RpdmVTdHJhdGVnaWVzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYWN0aXZlU3RyYXRlZ2llcy5wdXNoKG5ldyBBeGlzUGFubmluZ1N0cmF0ZWd5KHRoaXMpKTtcclxuICAgICAgICB0aGlzLmFjdGl2ZVN0cmF0ZWdpZXMucHVzaChuZXcgQ3Vyc29ySW50ZXJhY3Rpb25TdHJhdGVneSh0aGlzLCBjdXJzb3JJbmRleCkpO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlU3RyYXRlZ2llcy5wdXNoKG5ldyBDdXJzb3JEcmFnU3RyYXRlZ3kodGhpcywgY3Vyc29ySW5kZXgpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG1ldGhvZCB0byBzZXQgcGFubmluZyBhcyBhY3RpdmUgdG9vbFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVXNlckludGVyYWN0aW9uQ29udHJvbGxlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldFBhbm5pbmcoKSB7XHJcbiAgICAgICAgdGhpcy5jbGVhckFjdGl2ZVN0cmF0ZWdpZXMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5hY3RpdmVTdHJhdGVnaWVzLnB1c2gobmV3IEF4aXNQYW5uaW5nU3RyYXRlZ3kodGhpcykpO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlU3RyYXRlZ2llcy5wdXNoKG5ldyBDaGFydFBhbm5pbmdTdHJhdGVneSh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVTdHJhdGVnaWVzLnB1c2gobmV3IEN1cnNvckRyYWdTdHJhdGVneSh0aGlzLCAwKSk7XHJcblxyXG4gICAgICAgIHRoaXMuZXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kLnJhaXNlKHRoaXMsIG5ldyBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzKHRoaXMsIENoYXJ0Q29tbWFuZFR5cGUudG9nZ2xlQm94Wm9vbSwgbnVsbCwgeyBib3hab29tRW5hYmxlZDogZmFsc2UgfSkpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kLnJhaXNlKHRoaXMsIG5ldyBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzKHRoaXMsIENoYXJ0Q29tbWFuZFR5cGUudG9nZ2xlUGFubmluZywgbnVsbCwgeyBwYW5uaW5nRW5hYmxlZDogZmFsc2UgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICptZXRob2QgdG8gc2V0IGJveCB6b29tIGFzIGFjdGl2ZSB0b29sXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBVc2VySW50ZXJhY3Rpb25Db250cm9sbGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0Qm94Wm9vbSgpIHtcclxuICAgICAgICB0aGlzLmNsZWFyQWN0aXZlU3RyYXRlZ2llcygpO1xyXG5cclxuICAgICAgICB0aGlzLmFjdGl2ZVN0cmF0ZWdpZXMucHVzaChuZXcgQXhpc1Bhbm5pbmdTdHJhdGVneSh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVTdHJhdGVnaWVzLnVuc2hpZnQobmV3IENoYXJ0Qm94Wm9vbVN0cmF0ZWd5KHRoaXMpKTtcclxuICAgICAgICB0aGlzLmFjdGl2ZVN0cmF0ZWdpZXMucHVzaChuZXcgQ3Vyc29yRHJhZ1N0cmF0ZWd5KHRoaXMsIDApKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuZXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kLnJhaXNlKHRoaXMsIG5ldyBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzKHRoaXMsIENoYXJ0Q29tbWFuZFR5cGUudG9nZ2xlQm94Wm9vbSwgbnVsbCwgeyBib3hab29tRW5hYmxlZDogdHJ1ZSB9KSk7XHJcbiAgICAgICAgdGhpcy5ldmVudEV4ZWN1dGVDaGFydENvbW1hbmQucmFpc2UodGhpcywgbmV3IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3ModGhpcywgQ2hhcnRDb21tYW5kVHlwZS50b2dnbGVQYW5uaW5nLCBudWxsLCB7IHBhbm5pbmdFbmFibGVkOiBmYWxzZSB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKnJlbW92ZXMgYWxsIGFjdGl2ZSBzdHJhdGVneXMgdGhhdCBhcmUgaW4gcGxhY2VcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjbGVhckFjdGl2ZVN0cmF0ZWdpZXMoKSB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVTdHJhdGVnaWVzID0gW107XHJcbiAgICAgICAgdGhpcy5hY3RpdmVTdHJhdGVnaWVzLnB1c2gobmV3IENoYXJ0SWRsZVN0cmF0ZWd5KHRoaXMpKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgVXNlckludGVyYWN0aW9uQ29udHJvbGxlciwgRXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kLCBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzLCBDaGFydENvbW1hbmRUeXBlLCBNb3VzZUFjdGlvblR5cGUgfSJdfQ==