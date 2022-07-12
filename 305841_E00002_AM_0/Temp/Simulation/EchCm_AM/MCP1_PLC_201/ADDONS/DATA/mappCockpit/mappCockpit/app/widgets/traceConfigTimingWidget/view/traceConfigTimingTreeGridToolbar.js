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
    var TraceConfigTimingTreeGridToolbar = /** @class */ (function (_super) {
        __extends(TraceConfigTimingTreeGridToolbar, _super);
        /**
         * Creates an instance of TraceConfigTimingTreeGridToolbar.
         * @param {HTMLDivElement} widgetMainDiv
         * @memberof TraceConfigTimingTreeGridToolbar
         */
        function TraceConfigTimingTreeGridToolbar(widgetMainDiv) {
            var _this = _super.call(this, widgetMainDiv) || this;
            _this.toolbarIdEmpty = "Empty";
            _this.toolbarToolTipEmpty = " ";
            var imageDirectory = "../../../" + directoryProvider_1.DirectoryProvider.getWidgetsDirectory() + "traceConfigTimingWidget/style/images/toolbar/";
            // dummy toolbar button needed to show a toolbar
            _this.addToolbarButton(_this.toolbarIdEmpty, _this.toolbarToolTipEmpty, imageDirectory + "empty.svg");
            return _this;
        }
        /**
         * Sets the default toolbar states at startup
         *
         * @memberof TraceConfigTimingTreeGridToolbar
         */
        TraceConfigTimingTreeGridToolbar.prototype.initToolbarStates = function () {
            _super.prototype.initToolbarStates.call(this);
            // disable dummy button after creation
            this.disableDummyButton();
        };
        TraceConfigTimingTreeGridToolbar.prototype.disableDummyButton = function () {
            this.disableButton(this.toolbarIdEmpty, true);
        };
        return TraceConfigTimingTreeGridToolbar;
    }(treeGridToolbarBase_1.TreeGridToolbarBase));
    exports.TraceConfigTimingTreeGridToolbar = TraceConfigTimingTreeGridToolbar;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWdUaW1pbmdUcmVlR3JpZFRvb2xiYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvdHJhY2VDb25maWdUaW1pbmdXaWRnZXQvdmlldy90cmFjZUNvbmZpZ1RpbWluZ1RyZWVHcmlkVG9vbGJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBR0E7UUFBc0Qsb0RBQW1CO1FBS3JFOzs7O1dBSUc7UUFDSCwwQ0FBWSxhQUE2QjtZQUF6QyxZQUNJLGtCQUFNLGFBQWEsQ0FBQyxTQU12QjtZQWZnQixvQkFBYyxHQUFFLE9BQU8sQ0FBQztZQUN4Qix5QkFBbUIsR0FBRSxHQUFHLENBQUM7WUFVdEMsSUFBSSxjQUFjLEdBQUcsV0FBVyxHQUFHLHFDQUFpQixDQUFDLG1CQUFtQixFQUFFLEdBQUcsK0NBQStDLENBQUM7WUFFN0gsZ0RBQWdEO1lBQ2hELEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFJLENBQUMsY0FBYyxFQUFFLEtBQUksQ0FBQyxtQkFBbUIsRUFBRSxjQUFjLEdBQUcsV0FBVyxDQUFDLENBQUM7O1FBQ3ZHLENBQUM7UUFFRDs7OztXQUlHO1FBQ0ksNERBQWlCLEdBQXhCO1lBQ0ksaUJBQU0saUJBQWlCLFdBQUUsQ0FBQztZQUUxQixzQ0FBc0M7WUFDdEMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDOUIsQ0FBQztRQUVELDZEQUFrQixHQUFsQjtZQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRCxDQUFDO1FBQ0wsdUNBQUM7SUFBRCxDQUFDLEFBbENELENBQXNELHlDQUFtQixHQWtDeEU7SUFsQ1ksNEVBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJlZUdyaWRUb29sYmFyQmFzZSB9IGZyb20gXCIuLi8uLi9jb21tb24vdHJlZUdyaWRUb29sYmFyQmFzZVwiO1xyXG5pbXBvcnQgeyBEaXJlY3RvcnlQcm92aWRlciB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vZGlyZWN0b3J5UHJvdmlkZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUcmFjZUNvbmZpZ1RpbWluZ1RyZWVHcmlkVG9vbGJhciBleHRlbmRzIFRyZWVHcmlkVG9vbGJhckJhc2V7XHJcbiAgICBcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgdG9vbGJhcklkRW1wdHkgPVwiRW1wdHlcIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgdG9vbGJhclRvb2xUaXBFbXB0eSA9XCIgXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFRyYWNlQ29uZmlnVGltaW5nVHJlZUdyaWRUb29sYmFyLlxyXG4gICAgICogQHBhcmFtIHtIVE1MRGl2RWxlbWVudH0gd2lkZ2V0TWFpbkRpdlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVGltaW5nVHJlZUdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHdpZGdldE1haW5EaXY6IEhUTUxEaXZFbGVtZW50KXtcclxuICAgICAgICBzdXBlcih3aWRnZXRNYWluRGl2KTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgaW1hZ2VEaXJlY3RvcnkgPSBcIi4uLy4uLy4uL1wiICsgRGlyZWN0b3J5UHJvdmlkZXIuZ2V0V2lkZ2V0c0RpcmVjdG9yeSgpICsgXCJ0cmFjZUNvbmZpZ1RpbWluZ1dpZGdldC9zdHlsZS9pbWFnZXMvdG9vbGJhci9cIjtcclxuICAgICAgICBcclxuICAgICAgICAvLyBkdW1teSB0b29sYmFyIGJ1dHRvbiBuZWVkZWQgdG8gc2hvdyBhIHRvb2xiYXJcclxuICAgICAgICB0aGlzLmFkZFRvb2xiYXJCdXR0b24odGhpcy50b29sYmFySWRFbXB0eSwgdGhpcy50b29sYmFyVG9vbFRpcEVtcHR5LCBpbWFnZURpcmVjdG9yeSArIFwiZW1wdHkuc3ZnXCIpO1xyXG4gICAgfVxyXG4gICAgICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBkZWZhdWx0IHRvb2xiYXIgc3RhdGVzIGF0IHN0YXJ0dXBcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUaW1pbmdUcmVlR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGluaXRUb29sYmFyU3RhdGVzKCl7XHJcbiAgICAgICAgc3VwZXIuaW5pdFRvb2xiYXJTdGF0ZXMoKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBkaXNhYmxlIGR1bW15IGJ1dHRvbiBhZnRlciBjcmVhdGlvblxyXG4gICAgICAgIHRoaXMuZGlzYWJsZUR1bW15QnV0dG9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzYWJsZUR1bW15QnV0dG9uKCl7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlQnV0dG9uKHRoaXMudG9vbGJhcklkRW1wdHksIHRydWUpO1xyXG4gICAgfVxyXG59Il19