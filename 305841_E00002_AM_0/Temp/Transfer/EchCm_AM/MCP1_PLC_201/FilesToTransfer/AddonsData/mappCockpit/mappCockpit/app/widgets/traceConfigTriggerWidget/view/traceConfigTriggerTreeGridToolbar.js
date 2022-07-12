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
define(["require", "exports", "../../common/treeGridToolbarBase", "../../../common/directoryProvider"], function (require, exports, treeGridToolbarBase_1, directoryProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TraceConfigTriggerTreeGridToolbar = /** @class */ (function (_super) {
        __extends(TraceConfigTriggerTreeGridToolbar, _super);
        /**
         * Creates an instance of TraceConfigTriggerTreeGridToolbar.
         * @param {HTMLDivElement} widgetMainDiv
         * @memberof TraceConfigTriggerTreeGridToolbar
         */
        function TraceConfigTriggerTreeGridToolbar(widgetMainDiv) {
            var _this = _super.call(this, widgetMainDiv) || this;
            _this._toolbarIdAdd = "Add";
            _this._toolbarTooltipAdd = "Adds a new start trigger";
            _this.toolbarIdSelect = "Select";
            _this.toolbarToolTipSelect = "Select a trigger datapoint";
            _this.toolbarIdDelete = "Delete";
            _this.toolbarToolTipDelete = "Delete start trigger";
            var imageDirectory = "../../../" + directoryProvider_1.DirectoryProvider.getWidgetsDirectory() + "traceConfigTriggerWidget/style/images/toolbar/";
            _this.addToolbarButton(_this._toolbarIdAdd, _this._toolbarTooltipAdd, imageDirectory + "add.svg");
            _this.addToolbarButton(_this.toolbarIdSelect, _this.toolbarToolTipSelect, imageDirectory + "select.svg");
            _this.addToolbarButton(_this.toolbarIdDelete, _this.toolbarToolTipDelete, imageDirectory + "delete.svg");
            return _this;
        }
        /**
         * Reacts on toolbar click
         *
         * @param {*} args
         * @param {*} triggerWidget
         * @memberof TraceConfigTriggerTreeGridToolbar
         */
        TraceConfigTriggerTreeGridToolbar.prototype.toolbarClick = function (args, triggerWidget) {
            var clickedToolbarId = this.getClickedToolbarId(args.itemName, args.model.toolbarSettings);
            if (clickedToolbarId == this._toolbarIdAdd) {
                args.cancel = true;
                triggerWidget.addStartTrigger();
            }
            else if (clickedToolbarId == this.toolbarIdSelect) {
                args.cancel = true;
                triggerWidget.openDatapointDialog();
            }
            else if (clickedToolbarId == this.toolbarIdDelete) {
                args.cancel = true;
                triggerWidget.deleteStartTriggers(args.model.selectedItems);
            }
        };
        TraceConfigTriggerTreeGridToolbar.prototype.disableAddButton = function (disable) {
            this.disableButton(this._toolbarIdAdd, disable);
        };
        TraceConfigTriggerTreeGridToolbar.prototype.disableRemoveButton = function (disable) {
            this.disableButton(this.toolbarIdDelete, disable);
        };
        TraceConfigTriggerTreeGridToolbar.prototype.disableSelectTriggerDataPointButton = function (disable) {
            this.disableButton(this.toolbarIdSelect, disable);
        };
        return TraceConfigTriggerTreeGridToolbar;
    }(treeGridToolbarBase_1.TreeGridToolbarBase));
    exports.TraceConfigTriggerTreeGridToolbar = TraceConfigTriggerTreeGridToolbar;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWdUcmlnZ2VyVHJlZUdyaWRUb29sYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlQ29uZmlnVHJpZ2dlcldpZGdldC92aWV3L3RyYWNlQ29uZmlnVHJpZ2dlclRyZWVHcmlkVG9vbGJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBSUE7UUFBdUQscURBQW1CO1FBWXRFOzs7O1dBSUc7UUFDSCwyQ0FBWSxhQUE2QjtZQUF6QyxZQUNJLGtCQUFNLGFBQWEsQ0FBQyxTQU92QjtZQXZCZ0IsbUJBQWEsR0FBRSxLQUFLLENBQUM7WUFDckIsd0JBQWtCLEdBQUUsMEJBQTBCLENBQUM7WUFFL0MscUJBQWUsR0FBRSxRQUFRLENBQUM7WUFDMUIsMEJBQW9CLEdBQUUsNEJBQTRCLENBQUM7WUFFbkQscUJBQWUsR0FBRSxRQUFRLENBQUM7WUFDMUIsMEJBQW9CLEdBQUUsc0JBQXNCLENBQUM7WUFXMUQsSUFBSSxjQUFjLEdBQUcsV0FBVyxHQUFHLHFDQUFpQixDQUFDLG1CQUFtQixFQUFFLEdBQUcsZ0RBQWdELENBQUM7WUFFOUgsS0FBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUksQ0FBQyxhQUFhLEVBQUUsS0FBSSxDQUFDLGtCQUFrQixFQUFFLGNBQWMsR0FBRyxTQUFTLENBQUMsQ0FBQztZQUMvRixLQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSSxDQUFDLGVBQWUsRUFBRSxLQUFJLENBQUMsb0JBQW9CLEVBQUUsY0FBYyxHQUFHLFlBQVksQ0FBQyxDQUFDO1lBQ3RHLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFJLENBQUMsZUFBZSxFQUFFLEtBQUksQ0FBQyxvQkFBb0IsRUFBRSxjQUFjLEdBQUcsWUFBWSxDQUFDLENBQUM7O1FBQzFHLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSSx3REFBWSxHQUFuQixVQUFxQixJQUFJLEVBQUUsYUFBdUM7WUFDOUQsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzNGLElBQUksZ0JBQWdCLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDeEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ25CLGFBQWEsQ0FBQyxlQUFlLEVBQUUsQ0FBQzthQUNuQztpQkFDSSxJQUFJLGdCQUFnQixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQy9DLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUNuQixhQUFhLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzthQUN2QztpQkFDSSxJQUFJLGdCQUFnQixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQy9DLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUNuQixhQUFhLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUMvRDtRQUNMLENBQUM7UUFFTSw0REFBZ0IsR0FBdkIsVUFBd0IsT0FBZ0I7WUFDcEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3BELENBQUM7UUFFTSwrREFBbUIsR0FBMUIsVUFBMkIsT0FBZ0I7WUFDdkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3RELENBQUM7UUFFTSwrRUFBbUMsR0FBMUMsVUFBMkMsT0FBZ0I7WUFDdkQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3RELENBQUM7UUFDTCx3Q0FBQztJQUFELENBQUMsQUE3REQsQ0FBdUQseUNBQW1CLEdBNkR6RTtJQTdEWSw4RUFBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUcmVlR3JpZFRvb2xiYXJCYXNlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90cmVlR3JpZFRvb2xiYXJCYXNlXCI7XHJcbmltcG9ydCB7IERpcmVjdG9yeVByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9kaXJlY3RvcnlQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXQgfSBmcm9tIFwiLi4vdHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVHJhY2VDb25maWdUcmlnZ2VyVHJlZUdyaWRUb29sYmFyIGV4dGVuZHMgVHJlZUdyaWRUb29sYmFyQmFzZXtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhcklkQWRkID1cIkFkZFwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhclRvb2x0aXBBZGQgPVwiQWRkcyBhIG5ldyBzdGFydCB0cmlnZ2VyXCI7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSB0b29sYmFySWRTZWxlY3QgPVwiU2VsZWN0XCI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRvb2xiYXJUb29sVGlwU2VsZWN0ID1cIlNlbGVjdCBhIHRyaWdnZXIgZGF0YXBvaW50XCI7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSB0b29sYmFySWREZWxldGUgPVwiRGVsZXRlXCI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRvb2xiYXJUb29sVGlwRGVsZXRlID1cIkRlbGV0ZSBzdGFydCB0cmlnZ2VyXCI7XHJcbiAgICAgICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFRyYWNlQ29uZmlnVHJpZ2dlclRyZWVHcmlkVG9vbGJhci5cclxuICAgICAqIEBwYXJhbSB7SFRNTERpdkVsZW1lbnR9IHdpZGdldE1haW5EaXZcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RyaWdnZXJUcmVlR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Iod2lkZ2V0TWFpbkRpdjogSFRNTERpdkVsZW1lbnQpe1xyXG4gICAgICAgIHN1cGVyKHdpZGdldE1haW5EaXYpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBpbWFnZURpcmVjdG9yeSA9IFwiLi4vLi4vLi4vXCIgKyBEaXJlY3RvcnlQcm92aWRlci5nZXRXaWRnZXRzRGlyZWN0b3J5KCkgKyBcInRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldC9zdHlsZS9pbWFnZXMvdG9vbGJhci9cIjtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRUb29sYmFyQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZEFkZCwgdGhpcy5fdG9vbGJhclRvb2x0aXBBZGQsIGltYWdlRGlyZWN0b3J5ICsgXCJhZGQuc3ZnXCIpO1xyXG4gICAgICAgIHRoaXMuYWRkVG9vbGJhckJ1dHRvbih0aGlzLnRvb2xiYXJJZFNlbGVjdCwgdGhpcy50b29sYmFyVG9vbFRpcFNlbGVjdCwgaW1hZ2VEaXJlY3RvcnkgKyBcInNlbGVjdC5zdmdcIik7XHJcbiAgICAgICAgdGhpcy5hZGRUb29sYmFyQnV0dG9uKHRoaXMudG9vbGJhcklkRGVsZXRlLCB0aGlzLnRvb2xiYXJUb29sVGlwRGVsZXRlLCBpbWFnZURpcmVjdG9yeSArIFwiZGVsZXRlLnN2Z1wiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWN0cyBvbiB0b29sYmFyIGNsaWNrXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAcGFyYW0geyp9IHRyaWdnZXJXaWRnZXRcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RyaWdnZXJUcmVlR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHRvb2xiYXJDbGljayAoYXJncywgdHJpZ2dlcldpZGdldDogVHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0KXtcclxuICAgICAgICB2YXIgY2xpY2tlZFRvb2xiYXJJZCA9IHRoaXMuZ2V0Q2xpY2tlZFRvb2xiYXJJZChhcmdzLml0ZW1OYW1lLCBhcmdzLm1vZGVsLnRvb2xiYXJTZXR0aW5ncyk7XHJcbiAgICAgICAgaWYgKGNsaWNrZWRUb29sYmFySWQgPT0gdGhpcy5fdG9vbGJhcklkQWRkKSB7XHJcbiAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICAgICAgdHJpZ2dlcldpZGdldC5hZGRTdGFydFRyaWdnZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY2xpY2tlZFRvb2xiYXJJZCA9PSB0aGlzLnRvb2xiYXJJZFNlbGVjdCkge1xyXG4gICAgICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRyaWdnZXJXaWRnZXQub3BlbkRhdGFwb2ludERpYWxvZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjbGlja2VkVG9vbGJhcklkID09IHRoaXMudG9vbGJhcklkRGVsZXRlKSB7XHJcbiAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICAgICAgdHJpZ2dlcldpZGdldC5kZWxldGVTdGFydFRyaWdnZXJzKGFyZ3MubW9kZWwuc2VsZWN0ZWRJdGVtcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNhYmxlQWRkQnV0dG9uKGRpc2FibGU6IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZUJ1dHRvbih0aGlzLl90b29sYmFySWRBZGQsIGRpc2FibGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNhYmxlUmVtb3ZlQnV0dG9uKGRpc2FibGU6IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZUJ1dHRvbih0aGlzLnRvb2xiYXJJZERlbGV0ZSwgZGlzYWJsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc2FibGVTZWxlY3RUcmlnZ2VyRGF0YVBvaW50QnV0dG9uKGRpc2FibGU6IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZUJ1dHRvbih0aGlzLnRvb2xiYXJJZFNlbGVjdCwgZGlzYWJsZSk7XHJcbiAgICB9XHJcbn0iXX0=