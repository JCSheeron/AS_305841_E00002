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
    /**
     * Implementation of the logger widget toolbar
     *
     * @export
     * @class LoggerWidgetTreeGridToolbar
     * @extends {TreeGridToolbarBase}
     */
    var LoggerWidgetTreeGridToolbar = /** @class */ (function (_super) {
        __extends(LoggerWidgetTreeGridToolbar, _super);
        /**
         * Creates an instance of LoggerWidgetTreeGridToolbar
         * @param {HTMLDivElement} widgetDiv
         * @memberof LoggerWidgetTreeGridToolbar
         */
        function LoggerWidgetTreeGridToolbar(widgetDiv) {
            var _this = _super.call(this, widgetDiv) || this;
            // Defines the toolbar button ids and the tooltip texts
            _this._toolbarIdUpload = "Upload";
            _this._toolbarToolTipUpload = "Load data from target";
            _this._toolbarIdImport = "Import";
            _this._toolbarToolTipImport = "Import data";
            _this._toolbarIdExport = "Export";
            _this._toolbarToolTipExport = "Export data";
            var imageDirectory = "../../../" + directoryProvider_1.DirectoryProvider.getWidgetsDirectory() + "loggerWidget/style/images/toolbar/";
            // buttons for the editor
            _this.addToolbarButton(_this._toolbarIdUpload, _this._toolbarToolTipUpload, imageDirectory + "upload.svg");
            _this.addToolbarButton(_this._toolbarIdImport, _this._toolbarToolTipImport, imageDirectory + "import.svg");
            _this.addToolbarButton(_this._toolbarIdExport, _this._toolbarToolTipExport, imageDirectory + "export.svg");
            return _this;
        }
        /**
         * Reacts on toolbar click
         *
         * @param {*} args
         * @param {LoggerWidget} loggerWidget
         * @memberof LoggerWidgetTreeGridToolbar
         */
        LoggerWidgetTreeGridToolbar.prototype.toolbarClick = function (args, loggerWidget) {
            //set edit cell to false so treegrid can be updated
            loggerWidget.setCellEdit(false);
            _super.prototype.toolbarClickBase.call(this, args);
            var clickedToolbarId = this.getClickedToolbarId(args.itemName, args.model.toolbarSettings);
            if (clickedToolbarId == this._toolbarIdUpload) {
                loggerWidget.uploadData();
            }
            else if (clickedToolbarId == this._toolbarIdImport) {
                loggerWidget.importData();
            }
            else if (clickedToolbarId == this._toolbarIdExport) {
                loggerWidget.exportData();
            }
        };
        /**
         * Initialise the toolbar states
         *
         * @memberof LoggerWidgetTreeGridToolbar
         */
        LoggerWidgetTreeGridToolbar.prototype.initToolbarStates = function () {
            _super.prototype.initToolbarStates.call(this);
            // Disable buttons at startup
            this.disableExportButton(true);
        };
        /**
         * Disables the import button
         *
         * @param {boolean} disable
         * @memberof LoggerWidgetTreeGridToolbar
         */
        LoggerWidgetTreeGridToolbar.prototype.disableUploadButton = function (disable) {
            this.disableButton(this._toolbarIdUpload, disable);
        };
        /**
         * Disables the export button
         *
         * @param {boolean} disable
         * @memberof LoggerWidgetTreeGridToolbar
         */
        LoggerWidgetTreeGridToolbar.prototype.disableExportButton = function (disable) {
            this.disableButton(this._toolbarIdExport, disable);
        };
        return LoggerWidgetTreeGridToolbar;
    }(treeGridToolbarBase_1.TreeGridToolbarBase));
    exports.LoggerWidgetTreeGridToolbar = LoggerWidgetTreeGridToolbar;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyV2lkZ2V0VHJlZUdyaWRUb29sYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2xvZ2dlcldpZGdldC92aWV3L2xvZ2dlcldpZGdldFRyZWVHcmlkVG9vbGJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBSUE7Ozs7OztPQU1HO0lBQ0g7UUFBaUQsK0NBQW1CO1FBWWhFOzs7O1dBSUc7UUFDSCxxQ0FBWSxTQUF5QjtZQUFyQyxZQUNJLGtCQUFNLFNBQVMsQ0FBQyxTQVFuQjtZQXhCRCx1REFBdUQ7WUFDdEMsc0JBQWdCLEdBQUcsUUFBUSxDQUFDO1lBQzVCLDJCQUFxQixHQUFHLHVCQUF1QixDQUFDO1lBRWhELHNCQUFnQixHQUFHLFFBQVEsQ0FBQztZQUM1QiwyQkFBcUIsR0FBRyxhQUFhLENBQUM7WUFFdEMsc0JBQWdCLEdBQUcsUUFBUSxDQUFDO1lBQzVCLDJCQUFxQixHQUFHLGFBQWEsQ0FBQztZQVVuRCxJQUFJLGNBQWMsR0FBRyxXQUFXLEdBQUcscUNBQWlCLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxvQ0FBb0MsQ0FBQztZQUVsSCx5QkFBeUI7WUFDekIsS0FBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxLQUFJLENBQUMscUJBQXFCLEVBQUUsY0FBYyxHQUFHLFlBQVksQ0FBQyxDQUFDO1lBQ3hHLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsS0FBSSxDQUFDLHFCQUFxQixFQUFFLGNBQWMsR0FBRyxZQUFZLENBQUMsQ0FBQztZQUN4RyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSSxDQUFDLGdCQUFnQixFQUFFLEtBQUksQ0FBQyxxQkFBcUIsRUFBRSxjQUFjLEdBQUcsWUFBWSxDQUFDLENBQUM7O1FBQzVHLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSSxrREFBWSxHQUFuQixVQUFvQixJQUFJLEVBQUUsWUFBMEI7WUFDaEQsbURBQW1EO1lBQ25ELFlBQVksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFaEMsaUJBQU0sZ0JBQWdCLFlBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0IsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzNGLElBQUksZ0JBQWdCLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO2dCQUMzQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUM7YUFDN0I7aUJBQ0ksSUFBSSxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ2hELFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQzthQUM3QjtpQkFDSSxJQUFJLGdCQUFnQixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDaEQsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQzdCO1FBQ0wsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSSx1REFBaUIsR0FBeEI7WUFDSSxpQkFBTSxpQkFBaUIsV0FBRSxDQUFDO1lBRTFCLDZCQUE2QjtZQUM3QixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0kseURBQW1CLEdBQTFCLFVBQTJCLE9BQWdCO1lBQ3ZDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZELENBQUM7UUFFRDs7Ozs7V0FLRztRQUNJLHlEQUFtQixHQUExQixVQUEyQixPQUFnQjtZQUN2QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN2RCxDQUFDO1FBQ0wsa0NBQUM7SUFBRCxDQUFDLEFBbkZELENBQWlELHlDQUFtQixHQW1GbkU7SUFuRlksa0VBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJlZUdyaWRUb29sYmFyQmFzZSB9IGZyb20gXCIuLi8uLi9jb21tb24vdHJlZUdyaWRUb29sYmFyQmFzZVwiO1xyXG5pbXBvcnQgeyBEaXJlY3RvcnlQcm92aWRlciB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vZGlyZWN0b3J5UHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgTG9nZ2VyV2lkZ2V0IH0gZnJvbSBcIi4uL2xvZ2dlcldpZGdldFwiO1xyXG5cclxuLyoqXHJcbiAqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBsb2dnZXIgd2lkZ2V0IHRvb2xiYXJcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgTG9nZ2VyV2lkZ2V0VHJlZUdyaWRUb29sYmFyXHJcbiAqIEBleHRlbmRzIHtUcmVlR3JpZFRvb2xiYXJCYXNlfVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIExvZ2dlcldpZGdldFRyZWVHcmlkVG9vbGJhciBleHRlbmRzIFRyZWVHcmlkVG9vbGJhckJhc2Uge1xyXG4gICAgXHJcbiAgICAvLyBEZWZpbmVzIHRoZSB0b29sYmFyIGJ1dHRvbiBpZHMgYW5kIHRoZSB0b29sdGlwIHRleHRzXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF90b29sYmFySWRVcGxvYWQgPSBcIlVwbG9hZFwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhclRvb2xUaXBVcGxvYWQgPSBcIkxvYWQgZGF0YSBmcm9tIHRhcmdldFwiO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJJZEltcG9ydCA9IFwiSW1wb3J0XCI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF90b29sYmFyVG9vbFRpcEltcG9ydCA9IFwiSW1wb3J0IGRhdGFcIjtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF90b29sYmFySWRFeHBvcnQgPSBcIkV4cG9ydFwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhclRvb2xUaXBFeHBvcnQgPSBcIkV4cG9ydCBkYXRhXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIExvZ2dlcldpZGdldFRyZWVHcmlkVG9vbGJhclxyXG4gICAgICogQHBhcmFtIHtIVE1MRGl2RWxlbWVudH0gd2lkZ2V0RGl2XHJcbiAgICAgKiBAbWVtYmVyb2YgTG9nZ2VyV2lkZ2V0VHJlZUdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHdpZGdldERpdjogSFRNTERpdkVsZW1lbnQpIHtcclxuICAgICAgICBzdXBlcih3aWRnZXREaXYpO1xyXG5cclxuICAgICAgICBsZXQgaW1hZ2VEaXJlY3RvcnkgPSBcIi4uLy4uLy4uL1wiICsgRGlyZWN0b3J5UHJvdmlkZXIuZ2V0V2lkZ2V0c0RpcmVjdG9yeSgpICsgXCJsb2dnZXJXaWRnZXQvc3R5bGUvaW1hZ2VzL3Rvb2xiYXIvXCI7IFxyXG5cclxuICAgICAgICAvLyBidXR0b25zIGZvciB0aGUgZWRpdG9yXHJcbiAgICAgICAgdGhpcy5hZGRUb29sYmFyQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZFVwbG9hZCwgdGhpcy5fdG9vbGJhclRvb2xUaXBVcGxvYWQsIGltYWdlRGlyZWN0b3J5ICsgXCJ1cGxvYWQuc3ZnXCIpO1xyXG4gICAgICAgIHRoaXMuYWRkVG9vbGJhckJ1dHRvbih0aGlzLl90b29sYmFySWRJbXBvcnQsIHRoaXMuX3Rvb2xiYXJUb29sVGlwSW1wb3J0LCBpbWFnZURpcmVjdG9yeSArIFwiaW1wb3J0LnN2Z1wiKTtcclxuICAgICAgICB0aGlzLmFkZFRvb2xiYXJCdXR0b24odGhpcy5fdG9vbGJhcklkRXhwb3J0LCB0aGlzLl90b29sYmFyVG9vbFRpcEV4cG9ydCwgaW1hZ2VEaXJlY3RvcnkgKyBcImV4cG9ydC5zdmdcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFjdHMgb24gdG9vbGJhciBjbGlja1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQHBhcmFtIHtMb2dnZXJXaWRnZXR9IGxvZ2dlcldpZGdldFxyXG4gICAgICogQG1lbWJlcm9mIExvZ2dlcldpZGdldFRyZWVHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdG9vbGJhckNsaWNrKGFyZ3MsIGxvZ2dlcldpZGdldDogTG9nZ2VyV2lkZ2V0KSB7XHJcbiAgICAgICAgLy9zZXQgZWRpdCBjZWxsIHRvIGZhbHNlIHNvIHRyZWVncmlkIGNhbiBiZSB1cGRhdGVkXHJcbiAgICAgICAgbG9nZ2VyV2lkZ2V0LnNldENlbGxFZGl0KGZhbHNlKTtcclxuXHJcbiAgICAgICAgc3VwZXIudG9vbGJhckNsaWNrQmFzZShhcmdzKTtcclxuICAgICAgICB2YXIgY2xpY2tlZFRvb2xiYXJJZCA9IHRoaXMuZ2V0Q2xpY2tlZFRvb2xiYXJJZChhcmdzLml0ZW1OYW1lLCBhcmdzLm1vZGVsLnRvb2xiYXJTZXR0aW5ncyk7XHJcbiAgICAgICAgaWYgKGNsaWNrZWRUb29sYmFySWQgPT0gdGhpcy5fdG9vbGJhcklkVXBsb2FkKSB7XHJcbiAgICAgICAgICAgIGxvZ2dlcldpZGdldC51cGxvYWREYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNsaWNrZWRUb29sYmFySWQgPT0gdGhpcy5fdG9vbGJhcklkSW1wb3J0KSB7XHJcbiAgICAgICAgICAgIGxvZ2dlcldpZGdldC5pbXBvcnREYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNsaWNrZWRUb29sYmFySWQgPT0gdGhpcy5fdG9vbGJhcklkRXhwb3J0KSB7XHJcbiAgICAgICAgICAgIGxvZ2dlcldpZGdldC5leHBvcnREYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGlzZSB0aGUgdG9vbGJhciBzdGF0ZXNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTG9nZ2VyV2lkZ2V0VHJlZUdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpbml0VG9vbGJhclN0YXRlcygpe1xyXG4gICAgICAgIHN1cGVyLmluaXRUb29sYmFyU3RhdGVzKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gRGlzYWJsZSBidXR0b25zIGF0IHN0YXJ0dXBcclxuICAgICAgICB0aGlzLmRpc2FibGVFeHBvcnRCdXR0b24odHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNhYmxlcyB0aGUgaW1wb3J0IGJ1dHRvblxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZGlzYWJsZVxyXG4gICAgICogQG1lbWJlcm9mIExvZ2dlcldpZGdldFRyZWVHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGlzYWJsZVVwbG9hZEJ1dHRvbihkaXNhYmxlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZFVwbG9hZCwgZGlzYWJsZSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogRGlzYWJsZXMgdGhlIGV4cG9ydCBidXR0b25cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGRpc2FibGVcclxuICAgICAqIEBtZW1iZXJvZiBMb2dnZXJXaWRnZXRUcmVlR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpc2FibGVFeHBvcnRCdXR0b24oZGlzYWJsZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZUJ1dHRvbih0aGlzLl90b29sYmFySWRFeHBvcnQsIGRpc2FibGUpO1xyXG4gICAgfVxyXG59Il19