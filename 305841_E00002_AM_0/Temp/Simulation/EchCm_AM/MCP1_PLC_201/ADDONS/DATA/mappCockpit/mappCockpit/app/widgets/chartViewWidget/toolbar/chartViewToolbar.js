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
define(["require", "exports", "../../common/widgetBase", "../../common/themeProvider", "../../../common/directoryProvider", "../../../framework/events", "../../common/states/cursorStates", "../../common/states/chartViewToolbarStates", "../chartViewWidget", "./componentDefaultDefinition"], function (require, exports, widgetBase_1, themeProvider_1, directoryProvider_1, events_1, cursorStates_1, chartViewToolbarStates_1, chartViewWidget_1, componentDefaultDefinition_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Enum of ChartViewToolbarButtonIds
     *
     * @enum {number}
     */
    var ChartViewToolbarButtonId;
    (function (ChartViewToolbarButtonId) {
        ChartViewToolbarButtonId["RefCursor1"] = "RefCursor1";
        ChartViewToolbarButtonId["RefCursor2"] = "RefCursor2";
        ChartViewToolbarButtonId["Panning"] = "Panning";
        ChartViewToolbarButtonId["BoxZoom"] = "BoxZoom";
        ChartViewToolbarButtonId["ZoomX"] = "ZoomX";
        ChartViewToolbarButtonId["ZoomY"] = "ZoomY";
        ChartViewToolbarButtonId["ZoomXY"] = "ZoomXY";
        ChartViewToolbarButtonId["ResetZoom"] = "ResetZoom";
        ChartViewToolbarButtonId["AutoScale"] = "AutoScale";
    })(ChartViewToolbarButtonId || (ChartViewToolbarButtonId = {}));
    exports.ChartViewToolbarButtonId = ChartViewToolbarButtonId;
    var EventToolbarButtonClicked = /** @class */ (function (_super) {
        __extends(EventToolbarButtonClicked, _super);
        function EventToolbarButtonClicked() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventToolbarButtonClicked;
    }(events_1.TypedEvent));
    exports.EventToolbarButtonClicked = EventToolbarButtonClicked;
    ;
    var EventToolbarButtonClickedArgs = /** @class */ (function () {
        function EventToolbarButtonClickedArgs(selectedButton, groupNumber) {
            this.groupNumber = 0;
            this.groupNumber = groupNumber;
            this.selectedButton = selectedButton;
        }
        return EventToolbarButtonClickedArgs;
    }());
    /**
     *Toolbar for ChartViewWidget
     *
     * @class ChartViewToolbar
     * @extends {WidgetBase}
     * @implements {IChartViewToolbar}
     */
    var ChartViewToolbar = /** @class */ (function (_super) {
        __extends(ChartViewToolbar, _super);
        function ChartViewToolbar() {
            var _this = _super.call(this) || this;
            _this.toolbarButtonGroup1 = [];
            _this.toolbarButtonGroup2 = [];
            _this.toolbarButtonGroup3 = [];
            // holds the current cursor states values. We initialize the member for default. The effective initialization takes place when the external shared instance
            // of the cursor states is created and reflected through the curorStates setter!
            _this._cursorStates = new cursorStates_1.CursorStates();
            _this.eventToolbarButtonClicked = new EventToolbarButtonClicked();
            return _this;
        }
        /**
         * Dispose the chart view toolbar
         *
         * @memberof ChartViewToolbar
         */
        ChartViewToolbar.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            var toolbar = this.getToolbarInstance();
            if (toolbar != undefined) {
                toolbar.destroy();
            }
        };
        ChartViewToolbar.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            this.toolbarButtonGroup1.push(ChartViewToolbarButtonId.RefCursor1);
            this.toolbarButtonGroup1.push(ChartViewToolbarButtonId.RefCursor2);
            this.toolbarButtonGroup3.push(ChartViewToolbarButtonId.Panning);
            this.toolbarButtonGroup3.push(ChartViewToolbarButtonId.BoxZoom);
            this.toolbarButtonGroup2.push(ChartViewToolbarButtonId.ZoomX);
            this.toolbarButtonGroup2.push(ChartViewToolbarButtonId.ZoomXY);
            this.toolbarButtonGroup2.push(ChartViewToolbarButtonId.ZoomY);
            this.observeChartViewToolStateChange();
            this.observeChartViewZoomDirectionStateChange();
        };
        ChartViewToolbar.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
        };
        Object.defineProperty(ChartViewToolbar.prototype, "cursorsStates", {
            /**
             * Gets the cursors states
             *
             * @protected
             * @type {CursorStates}
             * @memberof ChartViewToolbar
             */
            get: function () {
                return this._cursorStates;
            },
            /**
             * Sets the cursors states. The method is called automatically whenever a cursor state has been changed externally.
             *
             * @protected
             * @memberof ChartViewToolbar
             */
            set: function (cursorStates) {
                // update the backup field
                this._cursorStates = cursorStates;
                this.updateOnCursorStatesChanges(cursorStates);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Updates the cursor states.
         *
         * @protected
         * @param {CursorStates} cursorStates
         * @memberof ChartBase
         */
        ChartViewToolbar.prototype.updateCursorStates = function (cursorStates) {
            // BINDINGSOURCE: dispatches the method call to bound targets
        };
        ChartViewToolbar.prototype.observeChartViewToolStateChange = function () {
            var _this = this;
            this.states.observe(this, chartViewToolbarStates_1.ChartViewToolState, function (modifiedItem, item) {
                _this.updateOnChartViewToolStateChange(modifiedItem);
            }, "ChartViewToolState");
        };
        ChartViewToolbar.prototype.observeChartViewZoomDirectionStateChange = function () {
            var _this = this;
            this.states.observe(this, chartViewToolbarStates_1.ChartViewZoomDirectionState, function (modifiedItem, item) {
                _this.updateOnChartViewZoomDirectionStateChange(modifiedItem);
            }, "ChartViewZoomDirectionState");
        };
        /**
         * create the ChartViewToolbars Layout
         *
         * @memberof ChartViewToolbar
         */
        ChartViewToolbar.prototype.createLayout = function () {
            var _this = this;
            this.addLayoutDivs();
            $(this.mainDiv).ejToolbar({
                width: "100%",
                enableSeparator: true,
                height: 33,
                click: function (args) { return _this.onChartViewToolbarClick(args.currentTarget.id); }
            });
            var toolbarInstance = this.getToolbarInstance();
            if (toolbarInstance != undefined) {
                toolbarInstance.selectItemByID(ChartViewToolbarButtonId.RefCursor1);
                toolbarInstance.selectItemByID(ChartViewToolbarButtonId.ZoomXY);
            }
        };
        /**
         * add the needed html code for the toolbar
         *
         * @private
         * @memberof ChartViewToolbar
         */
        ChartViewToolbar.prototype.addLayoutDivs = function () {
            $(this.mainDiv).append("<ul> " +
                "<li id='" + ChartViewToolbarButtonId.RefCursor1 + "' style='background-image: url(" + this.getImagePath("cursor1.svg") + "); background-repeat: no-repeat; padding: 0px; margin: 0px; background-size: 24px 24px; height: 30px; width: 30px; background-position: center center;' title='Cursor 1'> </li>" +
                "<li id='" + ChartViewToolbarButtonId.RefCursor2 + "' style='background-image: url(" + this.getImagePath("cursor2.svg") + "); background-repeat: no-repeat; padding: 0px; margin: 0px; background-size: 24px 24px; height: 30px; width: 30px; background-position: center center;' title='Cursor 2'> </li>" +
                "</ul>" +
                "<ul> " +
                "<li id='" + ChartViewToolbarButtonId.Panning + "' style='background-image: url(" + this.getImagePath("panning.svg") + "); background-repeat: no-repeat; padding: 0px; margin: 0px; background-size: 24px 24px; height: 30px; width: 30px; background-position: center center;' title='Panning'> </li>" +
                "<li id='" + ChartViewToolbarButtonId.BoxZoom + "' style='background-image: url(" + this.getImagePath("box_zoom.svg") + "); background-repeat: no-repeat; padding: 0px; margin: 0px; background-size: 24px 24px; height: 30px; width: 30px; background-position: center center;' title='BoxZoom'> </li>" +
                "</ul>" +
                "<ul> " +
                "<li id='" + ChartViewToolbarButtonId.ZoomXY + "' style='background-image: url(" + this.getImagePath("zoomXY.svg") + "); background-repeat: no-repeat; padding: 0px; margin: 0px; background-size: 24px 24px; height: 30px; width: 30px; background-position: center center;' title='Zoom XY '> </li>" +
                "<li id='" + ChartViewToolbarButtonId.ZoomX + "' style='background-image: url(" + this.getImagePath("zoomX.svg") + "); background-repeat: no-repeat; padding: 0px; margin: 0px; background-size: 24px 24px; height: 30px; width: 30px; background-position: center center;' title='Zoom X'> </li>" +
                "<li id='" + ChartViewToolbarButtonId.ZoomY + "' style='background-image: url(" + this.getImagePath("zoomY.svg") + "); background-repeat: no-repeat; padding: 0px; margin: 0px; background-size: 24px 24px; height: 30px; width: 30px; background-position: center center;' title='Zoom Y'> </li>" +
                "</ul>" +
                "<ul> " +
                "<li id='" + ChartViewToolbarButtonId.AutoScale + "' style='background-image: url(" + this.getImagePath("zoom_autoscale.svg") + "); background-repeat: no-repeat; padding: 0px; margin: 0px; background-size: 24px 24px; height: 30px; width: 30px; background-position: center center;' title='Auto Scale'> </li>" +
                "<li id='" + ChartViewToolbarButtonId.ResetZoom + "' style='background-image: url(" + this.getImagePath("zoom_reset_all.svg") + "); background-repeat: no-repeat; padding: 0px; margin: 0px; background-size: 24px 24px; height: 30px; width: 30px; background-position: center center;' title='Reset All'> </li>" +
                "</ul>");
        };
        /**
         * return the Path of an image by its name
         *
         * @private
         * @param {string} imageName
         * @returns {string}
         * @memberof ChartViewToolbar
         */
        ChartViewToolbar.prototype.getImagePath = function (imageName) {
            return themeProvider_1.ThemeProvider.getInstance().getThemedFilePath("../../" + directoryProvider_1.DirectoryProvider.getWidgetsDirectory() + "chartViewWidget/style/images/toolbar/" + imageName);
        };
        /**
         *  deselect all toolbar items and remove highlighting
         *
         * @private
         * @memberof ChartViewToolbar
         */
        ChartViewToolbar.prototype.deselectToolbarGroup = function (toolbarGroup) {
            var toolbarInstance = this.getToolbarInstance();
            if (toolbarInstance != undefined) {
                for (var i = 0; i < toolbarGroup.length; i++) {
                    toolbarInstance.deselectItemByID(toolbarGroup[i]);
                }
            }
        };
        /**
         * react on a mouse click on one of the toolbars buttons
         *
         * @private
         * @param {ChartViewToolbarButtonId} buttonID
         * @memberof ChartViewToolbar
         */
        ChartViewToolbar.prototype.onChartViewToolbarClick = function (buttonID) {
            var toolstate = this.states.read(chartViewToolbarStates_1.ChartViewToolState, "ChartViewToolState");
            var zoomDirectionState = this.states.read(chartViewToolbarStates_1.ChartViewZoomDirectionState, "ChartViewZoomDirectionState");
            switch (buttonID) {
                case ChartViewToolbarButtonId.BoxZoom:
                    toolstate.selectedTool = chartViewToolbarStates_1.ChartViewToolStateEnum.BOXZOOM;
                    break;
                case ChartViewToolbarButtonId.Panning:
                    toolstate.selectedTool = chartViewToolbarStates_1.ChartViewToolStateEnum.PANNING;
                    break;
                case ChartViewToolbarButtonId.RefCursor1:
                    toolstate.selectedTool = chartViewToolbarStates_1.ChartViewToolStateEnum.CURSORS;
                    this.cursorsStates.setSelected(0, true);
                    break;
                case ChartViewToolbarButtonId.RefCursor2:
                    toolstate.selectedTool = chartViewToolbarStates_1.ChartViewToolStateEnum.CURSORS;
                    this.cursorsStates.setSelected(1, true);
                    break;
                case ChartViewToolbarButtonId.ZoomX:
                    zoomDirectionState.zoomDirection = chartViewWidget_1.ZoomDirection.X;
                    break;
                case ChartViewToolbarButtonId.ZoomY:
                    zoomDirectionState.zoomDirection = chartViewWidget_1.ZoomDirection.Y;
                    break;
                case ChartViewToolbarButtonId.ZoomXY:
                    zoomDirectionState.zoomDirection = chartViewWidget_1.ZoomDirection.XY;
                    break;
                case ChartViewToolbarButtonId.AutoScale:
                    //TODO: remove Event and find solution via states
                    var eventToolbarButtonClickedArgs = new EventToolbarButtonClickedArgs(0, 3);
                    this.eventToolbarButtonClicked.raise(this, eventToolbarButtonClickedArgs);
                    break;
                case ChartViewToolbarButtonId.ResetZoom:
                    //TODO: remove Event and find solution via states
                    var eventToolbarButtonClickedArgs2 = new EventToolbarButtonClickedArgs(0, 4);
                    this.eventToolbarButtonClicked.raise(this, eventToolbarButtonClickedArgs2);
                    break;
            }
            this.updateCursorStates(this.cursorsStates);
            this.states.update(this, chartViewToolbarStates_1.ChartViewToolState, toolstate, "ChartViewToolState");
            this.states.update(this, chartViewToolbarStates_1.ChartViewZoomDirectionState, zoomDirectionState, "ChartViewZoomDirectionState");
        };
        /**
         * highlight one of the cursor button as the selected one
         *
         * @private
         * @param {*} index
         * @memberof ChartViewToolbar
         */
        ChartViewToolbar.prototype.setCursorButtonSelected = function (index) {
            var toolbarInstance = this.getToolbarInstance();
            if (toolbarInstance != undefined) {
                var firstFreqCursor = 2;
                var secondFreqCursor = 3;
                this.deselectToolbarGroup(this.toolbarButtonGroup1);
                if (index < 4 && toolbarInstance.selectItemByID) {
                    if (index == secondFreqCursor) {
                        index = 1;
                    }
                    else if (index == firstFreqCursor) {
                        index = 0;
                    }
                    toolbarInstance.selectItemByID(this.toolbarButtonGroup1[index]);
                }
            }
        };
        ChartViewToolbar.prototype.setChartViewToolSelected = function (chartViewToolState) {
            var toolbarInstance = this.getToolbarInstance();
            if (toolbarInstance != undefined) {
                this.deselectToolbarGroup(this.toolbarButtonGroup3);
                switch (chartViewToolState) {
                    case chartViewToolbarStates_1.ChartViewToolStateEnum.PANNING:
                        toolbarInstance.selectItemByID(ChartViewToolbarButtonId.Panning);
                        break;
                    case chartViewToolbarStates_1.ChartViewToolStateEnum.BOXZOOM:
                        toolbarInstance.selectItemByID(ChartViewToolbarButtonId.BoxZoom);
                        break;
                }
            }
        };
        ChartViewToolbar.prototype.getToolbarInstance = function () {
            var instance = undefined;
            try {
                instance = $(this.mainDiv).ejToolbar("instance");
            }
            catch (e) {
                console.error("ToolbarInstance not available");
            }
            return instance;
        };
        ChartViewToolbar.prototype.setZoomDirectionButtonSelected = function (chartViewZoomDirectionState) {
            var toolbarInstance = this.getToolbarInstance();
            if (toolbarInstance != undefined) {
                this.deselectToolbarGroup(this.toolbarButtonGroup2);
                switch (chartViewZoomDirectionState) {
                    case chartViewWidget_1.ZoomDirection.X:
                        toolbarInstance.selectItemByID(ChartViewToolbarButtonId.ZoomX);
                        break;
                    case chartViewWidget_1.ZoomDirection.Y:
                        toolbarInstance.selectItemByID(ChartViewToolbarButtonId.ZoomY);
                        break;
                    case chartViewWidget_1.ZoomDirection.XY:
                        toolbarInstance.selectItemByID(ChartViewToolbarButtonId.ZoomXY);
                        break;
                }
            }
        };
        ChartViewToolbar.prototype.updateOnCursorStatesChanges = function (modifiedStates) {
            this.setCursorButtonSelected(modifiedStates.getSelectedCursorIndex());
        };
        ChartViewToolbar.prototype.updateOnChartViewToolStateChange = function (modifiedStates) {
            this.setChartViewToolSelected(modifiedStates.selectedTool);
        };
        ChartViewToolbar.prototype.updateOnChartViewZoomDirectionStateChange = function (modifiedStates) {
            this.setZoomDirectionButtonSelected(modifiedStates.zoomDirection);
        };
        return ChartViewToolbar;
    }(widgetBase_1.WidgetBase));
    exports.ChartViewToolbar = ChartViewToolbar;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRWaWV3VG9vbGJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydFZpZXdXaWRnZXQvdG9vbGJhci9jaGFydFZpZXdUb29sYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFVQTs7OztPQUlHO0lBQ0gsSUFBSyx3QkFVSjtJQVZELFdBQUssd0JBQXdCO1FBQ3pCLHFEQUF5QixDQUFBO1FBQ3pCLHFEQUF5QixDQUFBO1FBQ3pCLCtDQUFtQixDQUFBO1FBQ25CLCtDQUFtQixDQUFBO1FBQ25CLDJDQUFlLENBQUE7UUFDZiwyQ0FBZSxDQUFBO1FBQ2YsNkNBQWlCLENBQUE7UUFDakIsbURBQXVCLENBQUE7UUFDdkIsbURBQXVCLENBQUE7SUFDM0IsQ0FBQyxFQVZJLHdCQUF3QixLQUF4Qix3QkFBd0IsUUFVNUI7SUFtV3lCLDREQUF3QjtJQS9WbEQ7UUFBd0MsNkNBQTREO1FBQXBHOztRQUFzRyxDQUFDO1FBQUQsZ0NBQUM7SUFBRCxDQUFDLEFBQXZHLENBQXdDLG1CQUFVLEdBQXFEO0lBK1ZuRCw4REFBeUI7SUEvVjBCLENBQUM7SUFHeEc7UUFJSSx1Q0FBWSxjQUFtQixFQUFFLFdBQW1CO1lBRnBELGdCQUFXLEdBQVksQ0FBQyxDQUFDO1lBR3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1lBQy9CLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3pDLENBQUM7UUFFTCxvQ0FBQztJQUFELENBQUMsQUFURCxJQVNDO0lBRUQ7Ozs7OztPQU1HO0lBQ0g7UUFBK0Isb0NBQVU7UUFjckM7WUFBQSxZQUNJLGlCQUFPLFNBR1Y7WUFiRCx5QkFBbUIsR0FBZ0MsRUFBRSxDQUFDO1lBQ3RELHlCQUFtQixHQUFnQyxFQUFFLENBQUM7WUFDdEQseUJBQW1CLEdBQWdDLEVBQUUsQ0FBQztZQUd0RCwySkFBMko7WUFDM0osZ0ZB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LEdBd1V4QztJQUVPLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDaGFydFZpZXdUb29sYmFyIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9jaGFydFZpZXdUb29sYmFySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3dpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgVGhlbWVQcm92aWRlciB9IGZyb20gXCIuLi8uLi9jb21tb24vdGhlbWVQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBEaXJlY3RvcnlQcm92aWRlciB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vZGlyZWN0b3J5UHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IEN1cnNvclN0YXRlcyB9IGZyb20gXCIuLi8uLi9jb21tb24vc3RhdGVzL2N1cnNvclN0YXRlc1wiO1xyXG5pbXBvcnQgeyBDaGFydFZpZXdUb29sU3RhdGUsIENoYXJ0Vmlld1Rvb2xTdGF0ZUVudW0sIENoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZSB9IGZyb20gXCIuLi8uLi9jb21tb24vc3RhdGVzL2NoYXJ0Vmlld1Rvb2xiYXJTdGF0ZXNcIjtcclxuaW1wb3J0IHsgWm9vbURpcmVjdGlvbiB9IGZyb20gXCIuLi9jaGFydFZpZXdXaWRnZXRcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24gfSBmcm9tIFwiLi9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvblwiO1xyXG5cclxuLyoqXHJcbiAqIEVudW0gb2YgQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkc1xyXG4gKlxyXG4gKiBAZW51bSB7bnVtYmVyfVxyXG4gKi9cclxuZW51bSBDaGFydFZpZXdUb29sYmFyQnV0dG9uSWR7XHJcbiAgICBSZWZDdXJzb3IxID0gXCJSZWZDdXJzb3IxXCIsXHJcbiAgICBSZWZDdXJzb3IyID0gXCJSZWZDdXJzb3IyXCIsXHJcbiAgICBQYW5uaW5nID0gXCJQYW5uaW5nXCIsXHJcbiAgICBCb3hab29tID0gXCJCb3hab29tXCIsXHJcbiAgICBab29tWCA9IFwiWm9vbVhcIixcclxuICAgIFpvb21ZID0gXCJab29tWVwiLFxyXG4gICAgWm9vbVhZID0gXCJab29tWFlcIixcclxuICAgIFJlc2V0Wm9vbSA9IFwiUmVzZXRab29tXCIsXHJcbiAgICBBdXRvU2NhbGUgPSBcIkF1dG9TY2FsZVwiXHJcbn1cclxuXHJcblxyXG5cclxuY2xhc3MgRXZlbnRUb29sYmFyQnV0dG9uQ2xpY2tlZCBleHRlbmRzIFR5cGVkRXZlbnQgPENoYXJ0Vmlld1Rvb2xiYXIsIEV2ZW50VG9vbGJhckJ1dHRvbkNsaWNrZWRBcmdzPiB7fTtcclxuXHJcblxyXG5jbGFzcyBFdmVudFRvb2xiYXJCdXR0b25DbGlja2VkQXJncyB7XHJcbiAgICBzZWxlY3RlZEJ1dHRvbjogYW55O1xyXG4gICAgZ3JvdXBOdW1iZXIgOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNlbGVjdGVkQnV0dG9uOiBhbnksIGdyb3VwTnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmdyb3VwTnVtYmVyID0gZ3JvdXBOdW1iZXI7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEJ1dHRvbiA9IHNlbGVjdGVkQnV0dG9uO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqVG9vbGJhciBmb3IgQ2hhcnRWaWV3V2lkZ2V0XHJcbiAqXHJcbiAqIEBjbGFzcyBDaGFydFZpZXdUb29sYmFyXHJcbiAqIEBleHRlbmRzIHtXaWRnZXRCYXNlfVxyXG4gKiBAaW1wbGVtZW50cyB7SUNoYXJ0Vmlld1Rvb2xiYXJ9XHJcbiAqL1xyXG5jbGFzcyBDaGFydFZpZXdUb29sYmFyIGV4dGVuZHMgV2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElDaGFydFZpZXdUb29sYmFyIHtcclxuICAgIFxyXG4gICAgZXZlbnRUb29sYmFyQnV0dG9uQ2xpY2tlZDogRXZlbnRUb29sYmFyQnV0dG9uQ2xpY2tlZDtcclxuXHJcbiAgICBcclxuICAgIHRvb2xiYXJCdXR0b25Hcm91cDEgOiBDaGFydFZpZXdUb29sYmFyQnV0dG9uSWRbXSA9IFtdO1xyXG4gICAgdG9vbGJhckJ1dHRvbkdyb3VwMiA6IENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZFtdID0gW107XHJcbiAgICB0b29sYmFyQnV0dG9uR3JvdXAzIDogQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkW10gPSBbXTtcclxuXHJcblxyXG4gICAgLy8gaG9sZHMgdGhlIGN1cnJlbnQgY3Vyc29yIHN0YXRlcyB2YWx1ZXMuIFdlIGluaXRpYWxpemUgdGhlIG1lbWJlciBmb3IgZGVmYXVsdC4gVGhlIGVmZmVjdGl2ZSBpbml0aWFsaXphdGlvbiB0YWtlcyBwbGFjZSB3aGVuIHRoZSBleHRlcm5hbCBzaGFyZWQgaW5zdGFuY2VcclxuICAgIC8vIG9mIHRoZSBjdXJzb3Igc3RhdGVzIGlzIGNyZWF0ZWQgYW5kIHJlZmxlY3RlZCB0aHJvdWdoIHRoZSBjdXJvclN0YXRlcyBzZXR0ZXIhXHJcbiAgICBwcm90ZWN0ZWQgX2N1cnNvclN0YXRlczogQ3Vyc29yU3RhdGVzID0gbmV3IEN1cnNvclN0YXRlcygpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmV2ZW50VG9vbGJhckJ1dHRvbkNsaWNrZWQgPSBuZXcgRXZlbnRUb29sYmFyQnV0dG9uQ2xpY2tlZCgpO1xyXG4gICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwb3NlIHRoZSBjaGFydCB2aWV3IHRvb2xiYXJcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3VG9vbGJhclxyXG4gICAgICovXHJcbiAgICBkaXNwb3NlKCl7XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG5cclxuICAgICAgICBsZXQgdG9vbGJhciA9IHRoaXMuZ2V0VG9vbGJhckluc3RhbmNlKCk7XHJcbiAgICAgICAgaWYodG9vbGJhciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0b29sYmFyLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZWQoKXtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplZCgpO1xyXG5cclxuICAgICAgICB0aGlzLnRvb2xiYXJCdXR0b25Hcm91cDEucHVzaChDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuUmVmQ3Vyc29yMSlcclxuICAgICAgICB0aGlzLnRvb2xiYXJCdXR0b25Hcm91cDEucHVzaChDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuUmVmQ3Vyc29yMilcclxuICAgICAgICB0aGlzLnRvb2xiYXJCdXR0b25Hcm91cDMucHVzaChDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuUGFubmluZylcclxuICAgICAgICB0aGlzLnRvb2xiYXJCdXR0b25Hcm91cDMucHVzaChDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuQm94Wm9vbSlcclxuXHJcbiAgICAgICAgdGhpcy50b29sYmFyQnV0dG9uR3JvdXAyLnB1c2goQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlpvb21YKVxyXG4gICAgICAgIHRoaXMudG9vbGJhckJ1dHRvbkdyb3VwMi5wdXNoKENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5ab29tWFkpXHJcbiAgICAgICAgdGhpcy50b29sYmFyQnV0dG9uR3JvdXAyLnB1c2goQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlpvb21ZKVxyXG5cclxuICAgICAgICB0aGlzLm9ic2VydmVDaGFydFZpZXdUb29sU3RhdGVDaGFuZ2UoKTtcclxuICAgICAgICB0aGlzLm9ic2VydmVDaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGVDaGFuZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsaXplQ29tcG9uZW50KCl7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0RGVmYXVsdERlZmluaXRpb24obmV3IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgY3Vyc29ycyBzdGF0ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAdHlwZSB7Q3Vyc29yU3RhdGVzfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld1Rvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldCBjdXJzb3JzU3RhdGVzKCkgOiBDdXJzb3JTdGF0ZXMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJzb3JTdGF0ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGN1cnNvcnMgc3RhdGVzLiBUaGUgbWV0aG9kIGlzIGNhbGxlZCBhdXRvbWF0aWNhbGx5IHdoZW5ldmVyIGEgY3Vyc29yIHN0YXRlIGhhcyBiZWVuIGNoYW5nZWQgZXh0ZXJuYWxseS4gXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld1Rvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHNldCBjdXJzb3JzU3RhdGVzKGN1cnNvclN0YXRlcyA6IEN1cnNvclN0YXRlcykge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgYmFja3VwIGZpZWxkXHJcbiAgICAgICAgdGhpcy5fY3Vyc29yU3RhdGVzID0gY3Vyc29yU3RhdGVzO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZU9uQ3Vyc29yU3RhdGVzQ2hhbmdlcyhjdXJzb3JTdGF0ZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgY3Vyc29yIHN0YXRlcy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvclN0YXRlc30gY3Vyc29yU3RhdGVzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCB1cGRhdGVDdXJzb3JTdGF0ZXMoY3Vyc29yU3RhdGVzOkN1cnNvclN0YXRlcyl7XHJcbiAgICAgICAgLy8gQklORElOR1NPVVJDRTogZGlzcGF0Y2hlcyB0aGUgbWV0aG9kIGNhbGwgdG8gYm91bmQgdGFyZ2V0c1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb2JzZXJ2ZUNoYXJ0Vmlld1Rvb2xTdGF0ZUNoYW5nZSgpe1xyXG4gICAgICAgIHRoaXMuc3RhdGVzLm9ic2VydmUodGhpcyxDaGFydFZpZXdUb29sU3RhdGUsIChtb2RpZmllZEl0ZW0gOiBDaGFydFZpZXdUb29sU3RhdGUsIGl0ZW06IENoYXJ0Vmlld1Rvb2xTdGF0ZSk9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlT25DaGFydFZpZXdUb29sU3RhdGVDaGFuZ2UobW9kaWZpZWRJdGVtKVxyXG4gICAgICAgIH0sXCJDaGFydFZpZXdUb29sU3RhdGVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvYnNlcnZlQ2hhcnRWaWV3Wm9vbURpcmVjdGlvblN0YXRlQ2hhbmdlKCl7XHJcbiAgICAgICAgdGhpcy5zdGF0ZXMub2JzZXJ2ZSh0aGlzLENoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZSwgKG1vZGlmaWVkSXRlbSA6IENoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZSwgaXRlbTogQ2hhcnRWaWV3Wm9vbURpcmVjdGlvblN0YXRlKT0+IHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVPbkNoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZUNoYW5nZShtb2RpZmllZEl0ZW0pXHJcbiAgICAgICAgfSxcIkNoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZSB0aGUgQ2hhcnRWaWV3VG9vbGJhcnMgTGF5b3V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld1Rvb2xiYXJcclxuICAgICAqL1xyXG4gICAgY3JlYXRlTGF5b3V0KCl7XHJcbiAgICAgICAgdGhpcy5hZGRMYXlvdXREaXZzKCk7XHJcbiAgICAgICAgJCh0aGlzLm1haW5EaXYpLmVqVG9vbGJhcih7XHJcbiAgICAgICAgICAgICB3aWR0aDogXCIxMDAlXCIsXHJcbiAgICAgICAgICAgICBlbmFibGVTZXBhcmF0b3I6IHRydWUsXHJcbiAgICAgICAgICAgICBoZWlnaHQ6IDMzLFxyXG4gICAgICAgICAgICAgY2xpY2s6IChhcmdzKSA9PiB0aGlzLm9uQ2hhcnRWaWV3VG9vbGJhckNsaWNrKGFyZ3MuY3VycmVudFRhcmdldC5pZClcclxuIFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgdG9vbGJhckluc3RhbmNlID0gdGhpcy5nZXRUb29sYmFySW5zdGFuY2UoKTtcclxuICAgICAgICBpZih0b29sYmFySW5zdGFuY2UgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdG9vbGJhckluc3RhbmNlLnNlbGVjdEl0ZW1CeUlEKENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5SZWZDdXJzb3IxKTtcclxuICAgICAgICAgICAgdG9vbGJhckluc3RhbmNlLnNlbGVjdEl0ZW1CeUlEKENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5ab29tWFkpO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYWRkIHRoZSBuZWVkZWQgaHRtbCBjb2RlIGZvciB0aGUgdG9vbGJhclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3VG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZExheW91dERpdnMoKXtcclxuICAgICAgICAkKHRoaXMubWFpbkRpdikuYXBwZW5kKFxyXG4gICAgICAgICAgICBcIjx1bD4gXCIgKyBcclxuICAgICAgICAgICAgXCI8bGkgaWQ9J1wiK0NoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5SZWZDdXJzb3IxKyBcIicgc3R5bGU9J2JhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIHRoaXMuZ2V0SW1hZ2VQYXRoKFwiY3Vyc29yMS5zdmdcIikgKyBcIik7IGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7IHBhZGRpbmc6IDBweDsgbWFyZ2luOiAwcHg7IGJhY2tncm91bmQtc2l6ZTogMjRweCAyNHB4OyBoZWlnaHQ6IDMwcHg7IHdpZHRoOiAzMHB4OyBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyOycgdGl0bGU9J0N1cnNvciAxJz4gPC9saT5cIiArIFxyXG4gICAgICAgICAgICBcIjxsaSBpZD0nXCIrQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlJlZkN1cnNvcjIrIFwiJyBzdHlsZT0nYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgdGhpcy5nZXRJbWFnZVBhdGgoXCJjdXJzb3IyLnN2Z1wiKSArIFwiKTsgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDsgcGFkZGluZzogMHB4OyBtYXJnaW46IDBweDsgYmFja2dyb3VuZC1zaXplOiAyNHB4IDI0cHg7IGhlaWdodDogMzBweDsgd2lkdGg6IDMwcHg7IGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7JyB0aXRsZT0nQ3Vyc29yIDInPiA8L2xpPlwiICtcclxuICAgICAgICAgICAgXCI8L3VsPlwiICtcclxuXHJcbiAgICAgICAgICAgIFwiPHVsPiBcIiArIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXCI8bGkgaWQ9J1wiK0NoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5QYW5uaW5nKyBcIicgc3R5bGU9J2JhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIHRoaXMuZ2V0SW1hZ2VQYXRoKFwicGFubmluZy5zdmdcIikgKyBcIik7IGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7IHBhZGRpbmc6IDBweDsgbWFyZ2luOiAwcHg7IGJhY2tncm91bmQtc2l6ZTogMjRweCAyNHB4OyBoZWlnaHQ6IDMwcHg7IHdpZHRoOiAzMHB4OyBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyOycgdGl0bGU9J1Bhbm5pbmcnPiA8L2xpPlwiICtcclxuICAgICAgICAgICAgXCI8bGkgaWQ9J1wiK0NoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5Cb3hab29tKyBcIicgc3R5bGU9J2JhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIHRoaXMuZ2V0SW1hZ2VQYXRoKFwiYm94X3pvb20uc3ZnXCIpICsgXCIpOyBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0OyBwYWRkaW5nOiAwcHg7IG1hcmdpbjogMHB4OyBiYWNrZ3JvdW5kLXNpemU6IDI0cHggMjRweDsgaGVpZ2h0OiAzMHB4OyB3aWR0aDogMzBweDsgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjsnIHRpdGxlPSdCb3hab29tJz4gPC9saT5cIiArXHJcblxyXG4gICAgICAgICAgICBcIjwvdWw+XCIgK1xyXG5cclxuICAgICAgICAgICAgXCI8dWw+IFwiICtcclxuICAgICAgICAgICAgXCI8bGkgaWQ9J1wiK0NoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5ab29tWFkrXCInIHN0eWxlPSdiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyB0aGlzLmdldEltYWdlUGF0aChcInpvb21YWS5zdmdcIikgKyBcIik7IGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7IHBhZGRpbmc6IDBweDsgbWFyZ2luOiAwcHg7IGJhY2tncm91bmQtc2l6ZTogMjRweCAyNHB4OyBoZWlnaHQ6IDMwcHg7IHdpZHRoOiAzMHB4OyBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyOycgdGl0bGU9J1pvb20gWFkgJz4gPC9saT5cIiArXHJcbiAgICAgICAgICAgIFwiPGxpIGlkPSdcIitDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuWm9vbVgrIFwiJyBzdHlsZT0nYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgdGhpcy5nZXRJbWFnZVBhdGgoXCJ6b29tWC5zdmdcIikgKyBcIik7IGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7IHBhZGRpbmc6IDBweDsgbWFyZ2luOiAwcHg7IGJhY2tncm91bmQtc2l6ZTogMjRweCAyNHB4OyBoZWlnaHQ6IDMwcHg7IHdpZHRoOiAzMHB4OyBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyOycgdGl0bGU9J1pvb20gWCc+IDwvbGk+XCIgK1xyXG4gICAgICAgICAgICBcIjxsaSBpZD0nXCIrQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlpvb21ZKyBcIicgc3R5bGU9J2JhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIHRoaXMuZ2V0SW1hZ2VQYXRoKFwiem9vbVkuc3ZnXCIpICsgXCIpOyBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0OyBwYWRkaW5nOiAwcHg7IG1hcmdpbjogMHB4OyBiYWNrZ3JvdW5kLXNpemU6IDI0cHggMjRweDsgaGVpZ2h0OiAzMHB4OyB3aWR0aDogMzBweDsgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjsnIHRpdGxlPSdab29tIFknPiA8L2xpPlwiICtcclxuICAgICAgICAgICAgXCI8L3VsPlwiICtcclxuXHJcbiAgICAgICAgICAgIFwiPHVsPiBcIiArIFxyXG4gICAgICAgICAgICBcIjxsaSBpZD0nXCIrQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLkF1dG9TY2FsZStcIicgc3R5bGU9J2JhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIHRoaXMuZ2V0SW1hZ2VQYXRoKFwiem9vbV9hdXRvc2NhbGUuc3ZnXCIpICsgXCIpOyBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0OyBwYWRkaW5nOiAwcHg7IG1hcmdpbjogMHB4OyBiYWNrZ3JvdW5kLXNpemU6IDI0cHggMjRweDsgaGVpZ2h0OiAzMHB4OyB3aWR0aDogMzBweDsgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjsnIHRpdGxlPSdBdXRvIFNjYWxlJz4gPC9saT5cIiArXHJcbiAgICAgICAgICAgIFwiPGxpIGlkPSdcIitDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuUmVzZXRab29tK1wiJyBzdHlsZT0nYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgdGhpcy5nZXRJbWFnZVBhdGgoXCJ6b29tX3Jlc2V0X2FsbC5zdmdcIikgKyBcIik7IGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7IHBhZGRpbmc6IDBweDsgbWFyZ2luOiAwcHg7IGJhY2tncm91bmQtc2l6ZTogMjRweCAyNHB4OyBoZWlnaHQ6IDMwcHg7IHdpZHRoOiAzMHB4OyBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyOycgdGl0bGU9J1Jlc2V0IEFsbCc+IDwvbGk+XCIgK1xyXG4gICAgICAgICAgICBcIjwvdWw+XCJcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmV0dXJuIHRoZSBQYXRoIG9mIGFuIGltYWdlIGJ5IGl0cyBuYW1lXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbWFnZU5hbWVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3VG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEltYWdlUGF0aChpbWFnZU5hbWU6IHN0cmluZyk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gVGhlbWVQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldFRoZW1lZEZpbGVQYXRoKFwiLi4vLi4vXCIgKyBEaXJlY3RvcnlQcm92aWRlci5nZXRXaWRnZXRzRGlyZWN0b3J5KCkgKyBcImNoYXJ0Vmlld1dpZGdldC9zdHlsZS9pbWFnZXMvdG9vbGJhci9cIiArIGltYWdlTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgZGVzZWxlY3QgYWxsIHRvb2xiYXIgaXRlbXMgYW5kIHJlbW92ZSBoaWdobGlnaHRpbmdcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld1Rvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkZXNlbGVjdFRvb2xiYXJHcm91cCh0b29sYmFyR3JvdXA6IENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZFtdKXtcclxuICAgICAgICBsZXQgdG9vbGJhckluc3RhbmNlID0gdGhpcy5nZXRUb29sYmFySW5zdGFuY2UoKTtcclxuICAgICAgICBpZih0b29sYmFySW5zdGFuY2UgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRvb2xiYXJHcm91cC5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgIHRvb2xiYXJJbnN0YW5jZS5kZXNlbGVjdEl0ZW1CeUlEKHRvb2xiYXJHcm91cFtpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWFjdCBvbiBhIG1vdXNlIGNsaWNrIG9uIG9uZSBvZiB0aGUgdG9vbGJhcnMgYnV0dG9uc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0NoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZH0gYnV0dG9uSURcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25DaGFydFZpZXdUb29sYmFyQ2xpY2soYnV0dG9uSUQgOiBDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQpe1xyXG5cclxuICAgICAgICBsZXQgdG9vbHN0YXRlIDogQ2hhcnRWaWV3VG9vbFN0YXRlID0gdGhpcy5zdGF0ZXMucmVhZChDaGFydFZpZXdUb29sU3RhdGUsXCJDaGFydFZpZXdUb29sU3RhdGVcIik7XHJcblxyXG4gICAgICAgIGxldCB6b29tRGlyZWN0aW9uU3RhdGUgOiBDaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGUgPSB0aGlzLnN0YXRlcy5yZWFkKENoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZSxcIkNoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZVwiKTtcclxuXHJcbiAgICAgICAgc3dpdGNoIChidXR0b25JRCl7XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLkJveFpvb206XHJcbiAgICAgICAgICAgICAgICB0b29sc3RhdGUuc2VsZWN0ZWRUb29sID0gQ2hhcnRWaWV3VG9vbFN0YXRlRW51bS5CT1haT09NO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlBhbm5pbmc6XHJcbiAgICAgICAgICAgICAgICB0b29sc3RhdGUuc2VsZWN0ZWRUb29sID0gQ2hhcnRWaWV3VG9vbFN0YXRlRW51bS5QQU5OSU5HO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlJlZkN1cnNvcjE6XHJcbiAgICAgICAgICAgICAgICB0b29sc3RhdGUuc2VsZWN0ZWRUb29sID0gQ2hhcnRWaWV3VG9vbFN0YXRlRW51bS5DVVJTT1JTO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJzb3JzU3RhdGVzLnNldFNlbGVjdGVkKDAsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlJlZkN1cnNvcjI6XHJcbiAgICAgICAgICAgICAgICB0b29sc3RhdGUuc2VsZWN0ZWRUb29sID0gQ2hhcnRWaWV3VG9vbFN0YXRlRW51bS5DVVJTT1JTO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJzb3JzU3RhdGVzLnNldFNlbGVjdGVkKDEsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlpvb21YOlxyXG4gICAgICAgICAgICAgICAgem9vbURpcmVjdGlvblN0YXRlLnpvb21EaXJlY3Rpb24gPSBab29tRGlyZWN0aW9uLlg7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuWm9vbVk6XHJcbiAgICAgICAgICAgICAgICB6b29tRGlyZWN0aW9uU3RhdGUuem9vbURpcmVjdGlvbiA9IFpvb21EaXJlY3Rpb24uWTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5ab29tWFk6XHJcbiAgICAgICAgICAgICAgICB6b29tRGlyZWN0aW9uU3RhdGUuem9vbURpcmVjdGlvbiA9IFpvb21EaXJlY3Rpb24uWFk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLkF1dG9TY2FsZTpcclxuICAgICAgICAgICAgICAgIC8vVE9ETzogcmVtb3ZlIEV2ZW50IGFuZCBmaW5kIHNvbHV0aW9uIHZpYSBzdGF0ZXNcclxuICAgICAgICAgICAgICAgIGxldCBldmVudFRvb2xiYXJCdXR0b25DbGlja2VkQXJnczogRXZlbnRUb29sYmFyQnV0dG9uQ2xpY2tlZEFyZ3MgPSBuZXcgRXZlbnRUb29sYmFyQnV0dG9uQ2xpY2tlZEFyZ3MoMCwgMylcclxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRUb29sYmFyQnV0dG9uQ2xpY2tlZC5yYWlzZSh0aGlzLCBldmVudFRvb2xiYXJCdXR0b25DbGlja2VkQXJncyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuUmVzZXRab29tOlxyXG4gICAgICAgICAgICAgICAgLy9UT0RPOiByZW1vdmUgRXZlbnQgYW5kIGZpbmQgc29sdXRpb24gdmlhIHN0YXRlc1xyXG4gICAgICAgICAgICAgICAgbGV0IGV2ZW50VG9vbGJhckJ1dHRvbkNsaWNrZWRBcmdzMjogRXZlbnRUb29sYmFyQnV0dG9uQ2xpY2tlZEFyZ3MgPSBuZXcgRXZlbnRUb29sYmFyQnV0dG9uQ2xpY2tlZEFyZ3MoMCwgNClcclxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRUb29sYmFyQnV0dG9uQ2xpY2tlZC5yYWlzZSh0aGlzLCBldmVudFRvb2xiYXJCdXR0b25DbGlja2VkQXJnczIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnVwZGF0ZUN1cnNvclN0YXRlcyh0aGlzLmN1cnNvcnNTdGF0ZXMpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlcy51cGRhdGUodGhpcyxDaGFydFZpZXdUb29sU3RhdGUsIHRvb2xzdGF0ZSxcIkNoYXJ0Vmlld1Rvb2xTdGF0ZVwiKTtcclxuICAgICAgICB0aGlzLnN0YXRlcy51cGRhdGUodGhpcyxDaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGUsIHpvb21EaXJlY3Rpb25TdGF0ZSxcIkNoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGhpZ2hsaWdodCBvbmUgb2YgdGhlIGN1cnNvciBidXR0b24gYXMgdGhlIHNlbGVjdGVkIG9uZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGluZGV4XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3VG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldEN1cnNvckJ1dHRvblNlbGVjdGVkKGluZGV4KXtcclxuICAgICAgICBsZXQgdG9vbGJhckluc3RhbmNlID0gdGhpcy5nZXRUb29sYmFySW5zdGFuY2UoKTtcclxuICAgICAgICBpZih0b29sYmFySW5zdGFuY2UgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgY29uc3QgZmlyc3RGcmVxQ3Vyc29yID0gMjtcclxuICAgICAgICAgICAgY29uc3Qgc2Vjb25kRnJlcUN1cnNvciA9IDM7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RUb29sYmFyR3JvdXAodGhpcy50b29sYmFyQnV0dG9uR3JvdXAxKTtcclxuICAgICAgICAgICAgaWYoaW5kZXggPCA0ICYmIHRvb2xiYXJJbnN0YW5jZS5zZWxlY3RJdGVtQnlJRCl7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT0gc2Vjb25kRnJlcUN1cnNvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGluZGV4ID09IGZpcnN0RnJlcUN1cnNvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRvb2xiYXJJbnN0YW5jZS5zZWxlY3RJdGVtQnlJRCh0aGlzLnRvb2xiYXJCdXR0b25Hcm91cDFbaW5kZXhdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldENoYXJ0Vmlld1Rvb2xTZWxlY3RlZChjaGFydFZpZXdUb29sU3RhdGUgOiBDaGFydFZpZXdUb29sU3RhdGVFbnVtKXtcclxuICAgICAgICBsZXQgdG9vbGJhckluc3RhbmNlID0gdGhpcy5nZXRUb29sYmFySW5zdGFuY2UoKTtcclxuICAgICAgICBpZih0b29sYmFySW5zdGFuY2UgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdFRvb2xiYXJHcm91cCh0aGlzLnRvb2xiYXJCdXR0b25Hcm91cDMpO1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoIChjaGFydFZpZXdUb29sU3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgQ2hhcnRWaWV3VG9vbFN0YXRlRW51bS5QQU5OSU5HOlxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2xiYXJJbnN0YW5jZS5zZWxlY3RJdGVtQnlJRChDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuUGFubmluZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSBDaGFydFZpZXdUb29sU3RhdGVFbnVtLkJPWFpPT006XHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbGJhckluc3RhbmNlLnNlbGVjdEl0ZW1CeUlEKENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5Cb3hab29tKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFRvb2xiYXJJbnN0YW5jZSgpOiBlai5Ub29sYmFyfHVuZGVmaW5lZHtcclxuICAgICAgICBsZXQgaW5zdGFuY2UgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICBpbnN0YW5jZSA9ICQodGhpcy5tYWluRGl2KS5lalRvb2xiYXIoXCJpbnN0YW5jZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2goZSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJUb29sYmFySW5zdGFuY2Ugbm90IGF2YWlsYWJsZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0Wm9vbURpcmVjdGlvbkJ1dHRvblNlbGVjdGVkKGNoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZTogWm9vbURpcmVjdGlvbikge1xyXG4gICAgICAgIGxldCB0b29sYmFySW5zdGFuY2UgPSB0aGlzLmdldFRvb2xiYXJJbnN0YW5jZSgpO1xyXG4gICAgICAgIGlmKHRvb2xiYXJJbnN0YW5jZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmRlc2VsZWN0VG9vbGJhckdyb3VwKHRoaXMudG9vbGJhckJ1dHRvbkdyb3VwMik7XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKGNoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFpvb21EaXJlY3Rpb24uWDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvb2xiYXJJbnN0YW5jZS5zZWxlY3RJdGVtQnlJRChDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuWm9vbVgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFpvb21EaXJlY3Rpb24uWTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvb2xiYXJJbnN0YW5jZS5zZWxlY3RJdGVtQnlJRChDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuWm9vbVkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFpvb21EaXJlY3Rpb24uWFk6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b29sYmFySW5zdGFuY2Uuc2VsZWN0SXRlbUJ5SUQoQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlpvb21YWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgXHJcbiAgICBwcml2YXRlIHVwZGF0ZU9uQ3Vyc29yU3RhdGVzQ2hhbmdlcyhtb2RpZmllZFN0YXRlcyA6IEN1cnNvclN0YXRlcykge1xyXG4gICAgICAgIHRoaXMuc2V0Q3Vyc29yQnV0dG9uU2VsZWN0ZWQobW9kaWZpZWRTdGF0ZXMuZ2V0U2VsZWN0ZWRDdXJzb3JJbmRleCgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZU9uQ2hhcnRWaWV3VG9vbFN0YXRlQ2hhbmdlKG1vZGlmaWVkU3RhdGVzOiBDaGFydFZpZXdUb29sU3RhdGUpe1xyXG4gICAgICAgIHRoaXMuc2V0Q2hhcnRWaWV3VG9vbFNlbGVjdGVkKG1vZGlmaWVkU3RhdGVzLnNlbGVjdGVkVG9vbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVPbkNoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZUNoYW5nZShtb2RpZmllZFN0YXRlczogQ2hhcnRWaWV3Wm9vbURpcmVjdGlvblN0YXRlKXtcclxuICAgICAgICB0aGlzLnNldFpvb21EaXJlY3Rpb25CdXR0b25TZWxlY3RlZChtb2RpZmllZFN0YXRlcy56b29tRGlyZWN0aW9uKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtDaGFydFZpZXdUb29sYmFyLCBDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQsIEV2ZW50VG9vbGJhckJ1dHRvbkNsaWNrZWR9Il19