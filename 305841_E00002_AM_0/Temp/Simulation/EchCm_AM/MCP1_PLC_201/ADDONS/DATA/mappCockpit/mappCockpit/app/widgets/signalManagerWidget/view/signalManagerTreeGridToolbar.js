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
define(["require", "exports", "../../common/treeGridToolbarBase", "../../../common/directoryProvider", "../helpers/exportHelper", "./signalManagerExportDropDownMenu"], function (require, exports, treeGridToolbarBase_1, directoryProvider_1, exportHelper_1, signalManagerExportDropDownMenu_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SignalManagerTreeGridToolbar = /** @class */ (function (_super) {
        __extends(SignalManagerTreeGridToolbar, _super);
        /**
         * Creates an instance of SignalManagerTreeGridToolbar.
         * @param {HTMLDivElement} widgetDiv
         * @memberof SignalManagerTreeGridToolbar
         */
        function SignalManagerTreeGridToolbar(widgetDiv) {
            var _this = _super.call(this, widgetDiv) || this;
            _this._toolbarIdImport = "Import";
            _this._toolbarToolTipImport = "Imports trace data";
            _this._toolbarIdExport = "Export";
            _this._toolbarToolTipExport = "Exports trace data";
            _this._toolbarIdCalculation = "Calculation";
            _this._toolbarToolTipCalculation = "Inserts a new calculation";
            _this._toolbarIdDelete = "Delete";
            _this._toolbarToolTipDelete = "Delete trace data";
            _this._toolbarIdEditMode = "EditMode";
            _this._toolbarToolTipEditMode = "Open/Close edit mode";
            _this._editModeActivated = false;
            var imageDirectory = "../../../" + directoryProvider_1.DirectoryProvider.getWidgetsDirectory() + "signalManagerWidget/style/images/toolbar/";
            // buttons for the editor
            _this.addToolbarButton(_this._toolbarIdImport, _this._toolbarToolTipImport, imageDirectory + "import.svg");
            _this.addToolbarButton(_this._toolbarIdExport, _this._toolbarToolTipExport, imageDirectory + "export.svg");
            _this.addToolbarButton(_this._toolbarIdCalculation, _this._toolbarToolTipCalculation, imageDirectory + "calculation.svg");
            _this.addToolbarButton(_this._toolbarIdDelete, _this._toolbarToolTipDelete, imageDirectory + "delete.svg");
            // global used buttons of tree grid
            _this.setCollapseLevel(1);
            _this.addCollapseButton();
            _this.addExpandButton();
            // buttons on the right side
            _this.addToolbarButton(_this._toolbarIdEditMode, _this._toolbarToolTipEditMode, imageDirectory + "editMode.svg", treeGridToolbarBase_1.ToolbarButtonAlignment.Right);
            _this.dropDownMenu = new signalManagerExportDropDownMenu_1.SignalManagerExportDropDownMenu(_this, _this._widgetMainDiv);
            return _this;
        }
        /**
         * Sets the default toolbar states at startup
         *
         * @memberof SignalManagerTreeGridToolbar
         */
        SignalManagerTreeGridToolbar.prototype.initToolbarStates = function () {
            _super.prototype.initToolbarStates.call(this);
            // At the beginning the export/delete/insert calculation button is disabled because no selection is available
            this.disableExportButton(true);
            this.disableDeleteButton(true);
            this.disableInsertCalculationButton(true);
        };
        /**
         * Reacts on toolbar click
         *
         * @param {*} args
         * @param {SignalManagerWidget} signalManagerWidget
         * @memberof SignalManagerTreeGridToolbar
         */
        SignalManagerTreeGridToolbar.prototype.toolbarClick = function (args, signalManagerWidget) {
            //set edit cell to false so treegrid can be updated
            signalManagerWidget.setCellEdit(false);
            _super.prototype.toolbarClickBase.call(this, args);
            var clickedToolbarId = this.getClickedToolbarId(args.itemName, args.model.toolbarSettings);
            if (clickedToolbarId == this._toolbarIdImport) {
                signalManagerWidget.importSerieGroup();
            }
            else if (clickedToolbarId == this._toolbarIdExport) {
                if (!this.dropDownMenu.isOpened) {
                    var selectedItemsExportable = signalManagerWidget.canItemsBeExported(args.model.selectedItems);
                    this.dropDownMenu.showDropDownMenu(signalManagerWidget, args.model, selectedItemsExportable);
                }
                else {
                    this.dropDownMenu.hideDropDownMenu();
                }
            }
            else if (clickedToolbarId == this._toolbarIdCalculation) {
                signalManagerWidget.insertCalculation(args.model.selectedItem);
            }
            else if (clickedToolbarId == this._toolbarIdDelete) {
                var selectedItems = Object.assign([], args.model.selectedItems);
                if (signalManagerWidget.containsItemWithinRecentOrUploaded(selectedItems)) {
                    signalManagerWidget.showMessageBoxForDeletingItem(selectedItems);
                }
                else {
                    signalManagerWidget.deleteItems(selectedItems);
                }
            }
            else if (clickedToolbarId == this._toolbarIdEditMode) {
                this._editModeActivated = !this._editModeActivated;
                this.activateEditModeButton(this._editModeActivated);
                signalManagerWidget.activateEditMode(this._editModeActivated);
            }
        };
        SignalManagerTreeGridToolbar.prototype.exportSelectedTraceData = function (signalManagerWidget, selectedItems) {
            var items = new exportHelper_1.ExportHelper().getExportableElements(selectedItems);
            signalManagerWidget.exportSerieGroup(items);
        };
        SignalManagerTreeGridToolbar.prototype.exportAllTraceDataAsCsv = function (signalManagerWidget, allItems) {
            var itemsTobeExported = Object.assign([], allItems);
            var items = new exportHelper_1.ExportHelper().getExportableElements(itemsTobeExported);
            signalManagerWidget.exportSerieGroup(items);
        };
        SignalManagerTreeGridToolbar.prototype.exportAllTraceData = function (signalManagerWidget) {
            signalManagerWidget.exportSignalManagerData();
        };
        SignalManagerTreeGridToolbar.prototype.disableExportButton = function (disable) {
            this.disableButton(this._toolbarIdExport, disable);
        };
        SignalManagerTreeGridToolbar.prototype.disableDeleteButton = function (disable) {
            this.disableButton(this._toolbarIdDelete, disable);
        };
        SignalManagerTreeGridToolbar.prototype.disableInsertCalculationButton = function (disable) {
            this.disableButton(this._toolbarIdCalculation, disable);
        };
        SignalManagerTreeGridToolbar.prototype.activateEditModeButton = function (activate) {
            this._editModeActivated = activate;
            this.activateButton(this._toolbarIdEditMode, activate);
        };
        return SignalManagerTreeGridToolbar;
    }(treeGridToolbarBase_1.TreeGridToolbarBase));
    exports.SignalManagerTreeGridToolbar = SignalManagerTreeGridToolbar;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsTWFuYWdlclRyZWVHcmlkVG9vbGJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9zaWduYWxNYW5hZ2VyV2lkZ2V0L3ZpZXcvc2lnbmFsTWFuYWdlclRyZWVHcmlkVG9vbGJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBTUE7UUFBa0QsZ0RBQW1CO1FBcUJqRTs7OztXQUlHO1FBQ0gsc0NBQVksU0FBeUI7WUFBckMsWUFDSSxrQkFBTSxTQUFTLENBQUMsU0FtQm5CO1lBNUNnQixzQkFBZ0IsR0FBRyxRQUFRLENBQUM7WUFDNUIsMkJBQXFCLEdBQUcsb0JBQW9CLENBQUM7WUFFN0Msc0JBQWdCLEdBQUcsUUFBUSxDQUFDO1lBQzVCLDJCQUFxQixHQUFHLG9CQUFvQixDQUFDO1lBRTdDLDJCQUFxQixHQUFHLGFBQWEsQ0FBQztZQUN0QyxnQ0FBMEIsR0FBRywyQkFBMkIsQ0FBQztZQUV6RCxzQkFBZ0IsR0FBRyxRQUFRLENBQUM7WUFDNUIsMkJBQXFCLEdBQUcsbUJBQW1CLENBQUM7WUFFNUMsd0JBQWtCLEdBQUcsVUFBVSxDQUFDO1lBQ2hDLDZCQUF1QixHQUFHLHNCQUFzQixDQUFDO1lBSTFELHdCQUFrQixHQUFHLEtBQUssQ0FBQztZQVUvQixJQUFJLGNBQWMsR0FBRyxXQUFXLEdBQUcscUNBQWlCLENBQUMsbUJBQW1CLEVBQUUsR0FBRywyQ0FBMkMsQ0FBQztZQUV6SCx5QkFBeUI7WUFDekIsS0FBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxLQUFJLENBQUMscUJBQXFCLEVBQUUsY0FBYyxHQUFHLFlBQVksQ0FBQyxDQUFDO1lBQ3hHLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsS0FBSSxDQUFDLHFCQUFxQixFQUFFLGNBQWMsR0FBRyxZQUFZLENBQUMsQ0FBQztZQUN4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QUksQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN2RCxDQUFDO1FBRU0scUVBQThCLEdBQXJDLFVBQXNDLE9BQWdCO1lBQ2xELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzVELENBQUM7UUFFTSw2REFBc0IsR0FBN0IsVUFBOEIsUUFBaUI7WUFDM0MsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFFBQVEsQ0FBQztZQUNuQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMzRCxDQUFDO1FBQ0wsbUNBQUM7SUFBRCxDQUFDLEFBeElELENBQWtELHlDQUFtQixHQXdJcEU7SUF4SVksb0VBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJlZUdyaWRUb29sYmFyQmFzZSwgVG9vbGJhckJ1dHRvbkFsaWdubWVudCB9IGZyb20gXCIuLi8uLi9jb21tb24vdHJlZUdyaWRUb29sYmFyQmFzZVwiO1xyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyV2lkZ2V0IH0gZnJvbSBcIi4uL3NpZ25hbE1hbmFnZXJXaWRnZXRcIjtcclxuaW1wb3J0IHsgRGlyZWN0b3J5UHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2RpcmVjdG9yeVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IEV4cG9ydEhlbHBlciB9IGZyb20gXCIuLi9oZWxwZXJzL2V4cG9ydEhlbHBlclwiO1xyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyRXhwb3J0RHJvcERvd25NZW51IH0gZnJvbSBcIi4vc2lnbmFsTWFuYWdlckV4cG9ydERyb3BEb3duTWVudVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNpZ25hbE1hbmFnZXJUcmVlR3JpZFRvb2xiYXIgZXh0ZW5kcyBUcmVlR3JpZFRvb2xiYXJCYXNlIHtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF90b29sYmFySWRJbXBvcnQgPSBcIkltcG9ydFwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhclRvb2xUaXBJbXBvcnQgPSBcIkltcG9ydHMgdHJhY2UgZGF0YVwiO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJJZEV4cG9ydCA9IFwiRXhwb3J0XCI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF90b29sYmFyVG9vbFRpcEV4cG9ydCA9IFwiRXhwb3J0cyB0cmFjZSBkYXRhXCI7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhcklkQ2FsY3VsYXRpb24gPSBcIkNhbGN1bGF0aW9uXCI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF90b29sYmFyVG9vbFRpcENhbGN1bGF0aW9uID0gXCJJbnNlcnRzIGEgbmV3IGNhbGN1bGF0aW9uXCI7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhcklkRGVsZXRlID0gXCJEZWxldGVcIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJUb29sVGlwRGVsZXRlID0gXCJEZWxldGUgdHJhY2UgZGF0YVwiO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJJZEVkaXRNb2RlID0gXCJFZGl0TW9kZVwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhclRvb2xUaXBFZGl0TW9kZSA9IFwiT3Blbi9DbG9zZSBlZGl0IG1vZGVcIjtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBkcm9wRG93bk1lbnU6IFNpZ25hbE1hbmFnZXJFeHBvcnREcm9wRG93bk1lbnU7XHJcblxyXG4gICAgcHJpdmF0ZSBfZWRpdE1vZGVBY3RpdmF0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgU2lnbmFsTWFuYWdlclRyZWVHcmlkVG9vbGJhci5cclxuICAgICAqIEBwYXJhbSB7SFRNTERpdkVsZW1lbnR9IHdpZGdldERpdlxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJUcmVlR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Iod2lkZ2V0RGl2OiBIVE1MRGl2RWxlbWVudCkge1xyXG4gICAgICAgIHN1cGVyKHdpZGdldERpdik7XHJcblxyXG4gICAgICAgIGxldCBpbWFnZURpcmVjdG9yeSA9IFwiLi4vLi4vLi4vXCIgKyBEaXJlY3RvcnlQcm92aWRlci5nZXRXaWRnZXRzRGlyZWN0b3J5KCkgKyBcInNpZ25hbE1hbmFnZXJXaWRnZXQvc3R5bGUvaW1hZ2VzL3Rvb2xiYXIvXCI7XHJcblxyXG4gICAgICAgIC8vIGJ1dHRvbnMgZm9yIHRoZSBlZGl0b3JcclxuICAgICAgICB0aGlzLmFkZFRvb2xiYXJCdXR0b24odGhpcy5fdG9vbGJhcklkSW1wb3J0LCB0aGlzLl90b29sYmFyVG9vbFRpcEltcG9ydCwgaW1hZ2VEaXJlY3RvcnkgKyBcImltcG9ydC5zdmdcIik7XHJcbiAgICAgICAgdGhpcy5hZGRUb29sYmFyQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZEV4cG9ydCwgdGhpcy5fdG9vbGJhclRvb2xUaXBFeHBvcnQsIGltYWdlRGlyZWN0b3J5ICsgXCJleHBvcnQuc3ZnXCIpO1xyXG4gICAgICAgIHRoaXMuYWRkVG9vbGJhckJ1dHRvbih0aGlzLl90b29sYmFySWRDYWxjdWxhdGlvbiwgdGhpcy5fdG9vbGJhclRvb2xUaXBDYWxjdWxhdGlvbiwgaW1hZ2VEaXJlY3RvcnkgKyBcImNhbGN1bGF0aW9uLnN2Z1wiKTtcclxuICAgICAgICB0aGlzLmFkZFRvb2xiYXJCdXR0b24odGhpcy5fdG9vbGJhcklkRGVsZXRlLCB0aGlzLl90b29sYmFyVG9vbFRpcERlbGV0ZSwgaW1hZ2VEaXJlY3RvcnkgKyBcImRlbGV0ZS5zdmdcIik7XHJcblxyXG4gICAgICAgIC8vIGdsb2JhbCB1c2VkIGJ1dHRvbnMgb2YgdHJlZSBncmlkXHJcbiAgICAgICAgdGhpcy5zZXRDb2xsYXBzZUxldmVsKDEpO1xyXG4gICAgICAgIHRoaXMuYWRkQ29sbGFwc2VCdXR0b24oKTtcclxuICAgICAgICB0aGlzLmFkZEV4cGFuZEJ1dHRvbigpO1xyXG5cclxuICAgICAgICAvLyBidXR0b25zIG9uIHRoZSByaWdodCBzaWRlXHJcbiAgICAgICAgdGhpcy5hZGRUb29sYmFyQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZEVkaXRNb2RlLCB0aGlzLl90b29sYmFyVG9vbFRpcEVkaXRNb2RlLCBpbWFnZURpcmVjdG9yeSArIFwiZWRpdE1vZGUuc3ZnXCIsIFRvb2xiYXJCdXR0b25BbGlnbm1lbnQuUmlnaHQpO1xyXG4gICAgXHJcbiAgICAgICAgdGhpcy5kcm9wRG93bk1lbnUgPSBuZXcgU2lnbmFsTWFuYWdlckV4cG9ydERyb3BEb3duTWVudSh0aGlzLCB0aGlzLl93aWRnZXRNYWluRGl2KTtcclxuICAgIH1cclxuICAgIFxyXG5cdC8qKlxyXG4gICAgICogU2V0cyB0aGUgZGVmYXVsdCB0b29sYmFyIHN0YXRlcyBhdCBzdGFydHVwXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJUcmVlR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGluaXRUb29sYmFyU3RhdGVzKCl7XHJcbiAgICAgICAgc3VwZXIuaW5pdFRvb2xiYXJTdGF0ZXMoKTtcclxuICAgICAgICBcclxuXHRcdC8vIEF0IHRoZSBiZWdpbm5pbmcgdGhlIGV4cG9ydC9kZWxldGUvaW5zZXJ0IGNhbGN1bGF0aW9uIGJ1dHRvbiBpcyBkaXNhYmxlZCBiZWNhdXNlIG5vIHNlbGVjdGlvbiBpcyBhdmFpbGFibGVcclxuXHRcdHRoaXMuZGlzYWJsZUV4cG9ydEJ1dHRvbih0cnVlKTtcclxuXHRcdHRoaXMuZGlzYWJsZURlbGV0ZUJ1dHRvbih0cnVlKTtcclxuXHRcdHRoaXMuZGlzYWJsZUluc2VydENhbGN1bGF0aW9uQnV0dG9uKHRydWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJlYWN0cyBvbiB0b29sYmFyIGNsaWNrXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAcGFyYW0ge1NpZ25hbE1hbmFnZXJXaWRnZXR9IHNpZ25hbE1hbmFnZXJXaWRnZXRcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyVHJlZUdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0b29sYmFyQ2xpY2soYXJncywgc2lnbmFsTWFuYWdlcldpZGdldDogU2lnbmFsTWFuYWdlcldpZGdldCkge1xyXG4gICAgICAgIC8vc2V0IGVkaXQgY2VsbCB0byBmYWxzZSBzbyB0cmVlZ3JpZCBjYW4gYmUgdXBkYXRlZFxyXG4gICAgICAgIHNpZ25hbE1hbmFnZXJXaWRnZXQuc2V0Q2VsbEVkaXQoZmFsc2UpO1xyXG5cclxuICAgICAgICBzdXBlci50b29sYmFyQ2xpY2tCYXNlKGFyZ3MpO1xyXG4gICAgICAgIHZhciBjbGlja2VkVG9vbGJhcklkID0gdGhpcy5nZXRDbGlja2VkVG9vbGJhcklkKGFyZ3MuaXRlbU5hbWUsIGFyZ3MubW9kZWwudG9vbGJhclNldHRpbmdzKTtcclxuICAgICAgICBpZiAoY2xpY2tlZFRvb2xiYXJJZCA9PSB0aGlzLl90b29sYmFySWRJbXBvcnQpIHtcclxuICAgICAgICAgICAgc2lnbmFsTWFuYWdlcldpZGdldC5pbXBvcnRTZXJpZUdyb3VwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNsaWNrZWRUb29sYmFySWQgPT0gdGhpcy5fdG9vbGJhcklkRXhwb3J0KSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5kcm9wRG93bk1lbnUuaXNPcGVuZWQpe1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkSXRlbXNFeHBvcnRhYmxlID0gc2lnbmFsTWFuYWdlcldpZGdldC5jYW5JdGVtc0JlRXhwb3J0ZWQoYXJncy5tb2RlbC5zZWxlY3RlZEl0ZW1zKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJvcERvd25NZW51LnNob3dEcm9wRG93bk1lbnUoc2lnbmFsTWFuYWdlcldpZGdldCwgYXJncy5tb2RlbCwgc2VsZWN0ZWRJdGVtc0V4cG9ydGFibGUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcm9wRG93bk1lbnUuaGlkZURyb3BEb3duTWVudSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNsaWNrZWRUb29sYmFySWQgPT0gdGhpcy5fdG9vbGJhcklkQ2FsY3VsYXRpb24pIHtcclxuICAgICAgICAgICAgc2lnbmFsTWFuYWdlcldpZGdldC5pbnNlcnRDYWxjdWxhdGlvbihhcmdzLm1vZGVsLnNlbGVjdGVkSXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNsaWNrZWRUb29sYmFySWQgPT0gdGhpcy5fdG9vbGJhcklkRGVsZXRlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW1zID0gT2JqZWN0LmFzc2lnbihbXSwgYXJncy5tb2RlbC5zZWxlY3RlZEl0ZW1zKTtcclxuICAgICAgICAgICAgaWYgKHNpZ25hbE1hbmFnZXJXaWRnZXQuY29udGFpbnNJdGVtV2l0aGluUmVjZW50T3JVcGxvYWRlZChzZWxlY3RlZEl0ZW1zKSkge1xyXG4gICAgICAgICAgICAgICAgc2lnbmFsTWFuYWdlcldpZGdldC5zaG93TWVzc2FnZUJveEZvckRlbGV0aW5nSXRlbShzZWxlY3RlZEl0ZW1zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNpZ25hbE1hbmFnZXJXaWRnZXQuZGVsZXRlSXRlbXMoc2VsZWN0ZWRJdGVtcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY2xpY2tlZFRvb2xiYXJJZCA9PSB0aGlzLl90b29sYmFySWRFZGl0TW9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9lZGl0TW9kZUFjdGl2YXRlZCA9ICF0aGlzLl9lZGl0TW9kZUFjdGl2YXRlZDtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZUVkaXRNb2RlQnV0dG9uKHRoaXMuX2VkaXRNb2RlQWN0aXZhdGVkKTtcclxuICAgICAgICAgICAgc2lnbmFsTWFuYWdlcldpZGdldC5hY3RpdmF0ZUVkaXRNb2RlKHRoaXMuX2VkaXRNb2RlQWN0aXZhdGVkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGV4cG9ydFNlbGVjdGVkVHJhY2VEYXRhKHNpZ25hbE1hbmFnZXJXaWRnZXQ6IFNpZ25hbE1hbmFnZXJXaWRnZXQsIHNlbGVjdGVkSXRlbXMpIHtcclxuICAgICAgICBsZXQgaXRlbXMgPSBuZXcgRXhwb3J0SGVscGVyKCkuZ2V0RXhwb3J0YWJsZUVsZW1lbnRzKHNlbGVjdGVkSXRlbXMpO1xyXG4gICAgICAgIHNpZ25hbE1hbmFnZXJXaWRnZXQuZXhwb3J0U2VyaWVHcm91cChpdGVtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGV4cG9ydEFsbFRyYWNlRGF0YUFzQ3N2KHNpZ25hbE1hbmFnZXJXaWRnZXQ6IFNpZ25hbE1hbmFnZXJXaWRnZXQsIGFsbEl0ZW1zKSB7XHJcbiAgICAgICAgbGV0IGl0ZW1zVG9iZUV4cG9ydGVkID0gT2JqZWN0LmFzc2lnbihbXSwgYWxsSXRlbXMpO1xyXG4gICAgICAgIGxldCBpdGVtcyA9IG5ldyBFeHBvcnRIZWxwZXIoKS5nZXRFeHBvcnRhYmxlRWxlbWVudHMoaXRlbXNUb2JlRXhwb3J0ZWQpO1xyXG4gICAgICAgIHNpZ25hbE1hbmFnZXJXaWRnZXQuZXhwb3J0U2VyaWVHcm91cChpdGVtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGV4cG9ydEFsbFRyYWNlRGF0YShzaWduYWxNYW5hZ2VyV2lkZ2V0OiBTaWduYWxNYW5hZ2VyV2lkZ2V0KSB7XHJcbiAgICAgICAgc2lnbmFsTWFuYWdlcldpZGdldC5leHBvcnRTaWduYWxNYW5hZ2VyRGF0YSgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgZGlzYWJsZUV4cG9ydEJ1dHRvbihkaXNhYmxlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZEV4cG9ydCwgZGlzYWJsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc2FibGVEZWxldGVCdXR0b24oZGlzYWJsZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZUJ1dHRvbih0aGlzLl90b29sYmFySWREZWxldGUsIGRpc2FibGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNhYmxlSW5zZXJ0Q2FsY3VsYXRpb25CdXR0b24oZGlzYWJsZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZUJ1dHRvbih0aGlzLl90b29sYmFySWRDYWxjdWxhdGlvbiwgZGlzYWJsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFjdGl2YXRlRWRpdE1vZGVCdXR0b24oYWN0aXZhdGU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9lZGl0TW9kZUFjdGl2YXRlZCA9IGFjdGl2YXRlO1xyXG4gICAgICAgIHRoaXMuYWN0aXZhdGVCdXR0b24odGhpcy5fdG9vbGJhcklkRWRpdE1vZGUsIGFjdGl2YXRlKTtcclxuICAgIH1cclxufSJdfQ==