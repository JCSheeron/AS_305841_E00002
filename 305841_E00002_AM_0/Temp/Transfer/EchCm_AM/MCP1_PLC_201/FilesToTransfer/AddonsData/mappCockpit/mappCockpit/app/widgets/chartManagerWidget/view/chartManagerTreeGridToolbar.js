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
define(["require", "exports", "../../../models/chartManagerDataModel/chartManagerChart", "../../common/treeGridToolbarBase", "../../../common/directoryProvider", "../../../models/common/series/baseSeries", "../../../models/chartManagerDataModel/scale", "./chartManagerTreeGridDropDownMenu"], function (require, exports, chartManagerChart_1, treeGridToolbarBase_1, directoryProvider_1, baseSeries_1, scale_1, chartManagerTreeGridDropDownMenu_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartManagerTreeGridToolbar = /** @class */ (function (_super) {
        __extends(ChartManagerTreeGridToolbar, _super);
        /**
         * Creates an instance of ChartManagerTreeGridToolbar.
         * @param {HTMLDivElement} widgetDiv
         * @param {IChartManagerDataModel} dataModel
         * @memberof ChartManagerTreeGridToolbar
         */
        function ChartManagerTreeGridToolbar(widgetDiv, dataModel) {
            var _this = _super.call(this, widgetDiv) || this;
            _this._toolbarIdAdd = "Add";
            _this._toolbarToolTipAdd = "Adds a new chart/scale";
            _this._toolbarIdDelete = "Delete";
            _this._toolbarToolTipDelete = "Deletes a chart, a scale or a signal";
            _this.dataModel = dataModel;
            _this.dropDownMenu = new chartManagerTreeGridDropDownMenu_1.ChartManagerTreeGridDropDownMenu(_this.dataModel, _this._widgetMainDiv);
            var imageDirectory = "../../../" + directoryProvider_1.DirectoryProvider.getWidgetsDirectory() + "chartManagerWidget/style/images/";
            _this.addToolbarButton(_this._toolbarIdAdd, _this._toolbarToolTipAdd, imageDirectory + "add.svg");
            _this.addToolbarButton(_this._toolbarIdDelete, _this._toolbarToolTipDelete, imageDirectory + "delete.svg");
            _this.addCollapseButton();
            _this.addExpandButton();
            return _this;
        }
        /**
         * Sets the default toolbar states at startup
         *
         * @memberof ChartManagerTreeGridToolbar
         */
        ChartManagerTreeGridToolbar.prototype.initToolbarStates = function () {
            _super.prototype.initToolbarStates.call(this);
            // disable dummy button after creation
            this.disableDeleteButton(true);
        };
        /**
         * Updates the chartmanager datamodel
         *
         * @param {IChartManagerDataModel} dataModel
         * @memberof ChartManagerTreeGridToolbar
         */
        ChartManagerTreeGridToolbar.prototype.updateDataModel = function (dataModel) {
            this.dataModel = dataModel;
            this.dropDownMenu.updateDataModel(dataModel);
        };
        /**
         * Reacts on toolbar click
         *
         * @param {*} args
         * @memberof ChartManagerTreeGridToolbar
         */
        ChartManagerTreeGridToolbar.prototype.toolbarClick = function (args, widget) {
            _super.prototype.toolbarClickBase.call(this, args);
            var clickedToolbarId = this.getClickedToolbarId(args.itemName, args.model.toolbarSettings);
            if (clickedToolbarId == this._toolbarIdAdd) {
                args.cancel = true;
                if (!this.dropDownMenu.isOpened) {
                    this.dropDownMenu.showDropDownMenu(this.selectedChart);
                }
                else {
                    this.dropDownMenu.hideDropDownMenu();
                }
            }
            else if (clickedToolbarId == this._toolbarIdDelete) {
                args.cancel = true;
                this.deleteItem(args.model.selectedItem);
            }
        };
        /**
         * deletes the given datamodel item(chart, scale, serie) from the datamodel
         *
         * @private
         * @param {*} selectedModelItem
         * @memberof ChartManagerTreeGridToolbar
         */
        ChartManagerTreeGridToolbar.prototype.deleteItem = function (selectedModelItem) {
            var selectedItem = selectedModelItem.item;
            if (selectedModelItem != null) {
                if (selectedItem instanceof chartManagerChart_1.ChartManagerChart) {
                    // Remove chart from datamodel
                    this.dataModel.removeChart(selectedItem);
                }
                else if (selectedItem instanceof baseSeries_1.BaseSeries) {
                    var chart = selectedModelItem.parentItem.parentItem.item;
                    if (chart != undefined) {
                        // Remove serie from datamodel
                        this.dataModel.removeSerie(chart, selectedItem);
                    }
                }
                else if (selectedItem instanceof scale_1.Scale) {
                    var chart = selectedModelItem.parentItem.item;
                    if (chart != undefined) {
                        // Remove yAxis from datamodel
                        this.dataModel.removeYAxis(chart, selectedItem);
                    }
                }
            }
        };
        /**
         * Disables/Enables the delete chart/serie button in the toolbar
         *
         * @param {boolean} disable
         * @memberof ChartManagerTreeGridToolbar
         */
        ChartManagerTreeGridToolbar.prototype.disableDeleteButton = function (disable) {
            this.disableButton(this._toolbarIdDelete, disable);
        };
        /**
         * Disables/Enables the add chart button in the toolbar
         *
         * @param {boolean} disable
         * @memberof ChartManagerTreeGridToolbar
         */
        ChartManagerTreeGridToolbar.prototype.disableAddButton = function (disable) {
            this.disableButton(this._toolbarIdAdd, disable);
        };
        /**
         * sets the current selected chart
         *
         * @param {(IChartManagerChart|Scale|BaseSeries)} chart
         * @memberof ChartManagerTreeGridToolbar
         */
        ChartManagerTreeGridToolbar.prototype.setSelectedChart = function (chart) {
            if (chart instanceof chartManagerChart_1.ChartManagerChart) {
                this.selectedChart = chart;
            }
            else {
                this.selectedChart = undefined;
            }
        };
        return ChartManagerTreeGridToolbar;
    }(treeGridToolbarBase_1.TreeGridToolbarBase));
    exports.ChartManagerTreeGridToolbar = ChartManagerTreeGridToolbar;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRNYW5hZ2VyVHJlZUdyaWRUb29sYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0TWFuYWdlcldpZGdldC92aWV3L2NoYXJ0TWFuYWdlclRyZWVHcmlkVG9vbGJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBVUE7UUFBaUQsK0NBQW1CO1FBV2hFOzs7OztXQUtHO1FBQ0gscUNBQVksU0FBeUIsRUFBRSxTQUFpQztZQUF4RSxZQUNJLGtCQUFNLFNBQVMsQ0FBQyxTQVluQjtZQTVCZ0IsbUJBQWEsR0FBRSxLQUFLLENBQUM7WUFDckIsd0JBQWtCLEdBQUUsd0JBQXdCLENBQUM7WUFLN0Msc0JBQWdCLEdBQUUsUUFBUSxDQUFDO1lBQzNCLDJCQUFxQixHQUFFLHNDQUFzQyxDQUFDO1lBVzNFLEtBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1lBQzNCLEtBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxtRUFBZ0MsQ0FBQyxLQUFJLENBQUMsU0FBUyxFQUFFLEtBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUU5RixJQUFJLGNBQWMsR0FBRyxXQUFXLEdBQUcscUNBQWlCLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxrQ0FBa0MsQ0FBQztZQUVoSCxLQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSSxDQUFDLGFBQWEsRUFBRSxLQUFJLENBQUMsa0JBQWtCLEVBQUUsY0FBYyxHQUFHLFNBQVMsQ0FBQyxDQUFDO1lBQy9GLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsS0FBSSxDQUFDLHFCQUFxQixFQUFFLGNBQWMsR0FBRyxZQUFZLENBQUMsQ0FBQztZQUV4RyxLQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUN6QixLQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7O1FBQzNCLENBQUM7UUFFRDs7OztXQUlHO1FB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LEtBQTBDO1lBQy9ELElBQUksS0FBSyxZQUFZLHFDQUFpQixFQUFFO2dCQUNwQyxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQzthQUM5QjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQzthQUNsQztRQUNMLENBQUM7UUFDTCxrQ0FBQztJQUFELENBQUMsQUE5SUQsQ0FBaUQseUNBQW1CLEdBOEluRTtJQTlJWSxrRUFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFydE1hbmFnZXJDaGFydCB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2NoYXJ0TWFuYWdlckNoYXJ0XCI7XHJcbmltcG9ydCB7IElDaGFydE1hbmFnZXJDaGFydCB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2ludGVyZmFjZXMvY2hhcnRNYW5hZ2VyQ2hhcnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHJlZUdyaWRUb29sYmFyQmFzZSB9IGZyb20gXCIuLi8uLi9jb21tb24vdHJlZUdyaWRUb29sYmFyQmFzZVwiO1xyXG5pbXBvcnQgeyBEaXJlY3RvcnlQcm92aWRlciB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vZGlyZWN0b3J5UHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY29tbW9uL3Nlcmllcy9iYXNlU2VyaWVzXCI7XHJcbmltcG9ydCB7IFNjYWxlIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvc2NhbGVcIjtcclxuaW1wb3J0IHsgSUNoYXJ0TWFuYWdlckRhdGFNb2RlbCB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2ludGVyZmFjZXMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENoYXJ0TWFuYWdlclRyZWVHcmlkRHJvcERvd25NZW51IH0gZnJvbSBcIi4vY2hhcnRNYW5hZ2VyVHJlZUdyaWREcm9wRG93bk1lbnVcIjtcclxuaW1wb3J0IHsgSVdpZGdldCB9IGZyb20gXCIuLi8uLi9jb21tb24vaW50ZXJmYWNlcy93aWRnZXRJbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDaGFydE1hbmFnZXJUcmVlR3JpZFRvb2xiYXIgZXh0ZW5kcyBUcmVlR3JpZFRvb2xiYXJCYXNle1xyXG4gICAgXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF90b29sYmFySWRBZGQgPVwiQWRkXCI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF90b29sYmFyVG9vbFRpcEFkZCA9XCJBZGRzIGEgbmV3IGNoYXJ0L3NjYWxlXCI7XHJcbiAgICBwcml2YXRlIGRhdGFNb2RlbDogSUNoYXJ0TWFuYWdlckRhdGFNb2RlbDtcclxuICAgIHByaXZhdGUgc2VsZWN0ZWRDaGFydDogSUNoYXJ0TWFuYWdlckNoYXJ0fHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgZHJvcERvd25NZW51OiBDaGFydE1hbmFnZXJUcmVlR3JpZERyb3BEb3duTWVudTtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF90b29sYmFySWREZWxldGUgPVwiRGVsZXRlXCI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF90b29sYmFyVG9vbFRpcERlbGV0ZSA9XCJEZWxldGVzIGEgY2hhcnQsIGEgc2NhbGUgb3IgYSBzaWduYWxcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQ2hhcnRNYW5hZ2VyVHJlZUdyaWRUb29sYmFyLlxyXG4gICAgICogQHBhcmFtIHtIVE1MRGl2RWxlbWVudH0gd2lkZ2V0RGl2XHJcbiAgICAgKiBAcGFyYW0ge0lDaGFydE1hbmFnZXJEYXRhTW9kZWx9IGRhdGFNb2RlbFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlclRyZWVHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih3aWRnZXREaXY6IEhUTUxEaXZFbGVtZW50LCBkYXRhTW9kZWw6IElDaGFydE1hbmFnZXJEYXRhTW9kZWwpeyAvLyBUT0RPOiB0eXBlXHJcbiAgICAgICAgc3VwZXIod2lkZ2V0RGl2KTtcclxuXHJcbiAgICAgICAgdGhpcy5kYXRhTW9kZWwgPSBkYXRhTW9kZWw7XHJcbiAgICAgICAgdGhpcy5kcm9wRG93bk1lbnUgPSBuZXcgQ2hhcnRNYW5hZ2VyVHJlZUdyaWREcm9wRG93bk1lbnUodGhpcy5kYXRhTW9kZWwsIHRoaXMuX3dpZGdldE1haW5EaXYpO1xyXG5cclxuICAgICAgICBsZXQgaW1hZ2VEaXJlY3RvcnkgPSBcIi4uLy4uLy4uL1wiICsgRGlyZWN0b3J5UHJvdmlkZXIuZ2V0V2lkZ2V0c0RpcmVjdG9yeSgpICsgXCJjaGFydE1hbmFnZXJXaWRnZXQvc3R5bGUvaW1hZ2VzL1wiO1xyXG5cclxuICAgICAgICB0aGlzLmFkZFRvb2xiYXJCdXR0b24odGhpcy5fdG9vbGJhcklkQWRkLCB0aGlzLl90b29sYmFyVG9vbFRpcEFkZCwgaW1hZ2VEaXJlY3RvcnkgKyBcImFkZC5zdmdcIik7XHJcbiAgICAgICAgdGhpcy5hZGRUb29sYmFyQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZERlbGV0ZSwgdGhpcy5fdG9vbGJhclRvb2xUaXBEZWxldGUsIGltYWdlRGlyZWN0b3J5ICsgXCJkZWxldGUuc3ZnXCIpO1xyXG5cclxuICAgICAgICB0aGlzLmFkZENvbGxhcHNlQnV0dG9uKCk7XHJcbiAgICAgICAgdGhpcy5hZGRFeHBhbmRCdXR0b24oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGRlZmF1bHQgdG9vbGJhciBzdGF0ZXMgYXQgc3RhcnR1cFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJUcmVlR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGluaXRUb29sYmFyU3RhdGVzKCl7XHJcbiAgICAgICAgc3VwZXIuaW5pdFRvb2xiYXJTdGF0ZXMoKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBkaXNhYmxlIGR1bW15IGJ1dHRvbiBhZnRlciBjcmVhdGlvblxyXG4gICAgICAgIHRoaXMuZGlzYWJsZURlbGV0ZUJ1dHRvbih0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGNoYXJ0bWFuYWdlciBkYXRhbW9kZWxcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lDaGFydE1hbmFnZXJEYXRhTW9kZWx9IGRhdGFNb2RlbFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlclRyZWVHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICB1cGRhdGVEYXRhTW9kZWwoZGF0YU1vZGVsOiBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsKXtcclxuICAgICAgICB0aGlzLmRhdGFNb2RlbCA9IGRhdGFNb2RlbDtcclxuICAgICAgICB0aGlzLmRyb3BEb3duTWVudS51cGRhdGVEYXRhTW9kZWwoZGF0YU1vZGVsKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWN0cyBvbiB0b29sYmFyIGNsaWNrXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyVHJlZUdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0b29sYmFyQ2xpY2sgKGFyZ3MsIHdpZGdldDogSVdpZGdldCl7XHJcbiAgICAgICAgc3VwZXIudG9vbGJhckNsaWNrQmFzZShhcmdzKTtcclxuICAgICAgICB2YXIgY2xpY2tlZFRvb2xiYXJJZCA9IHRoaXMuZ2V0Q2xpY2tlZFRvb2xiYXJJZChhcmdzLml0ZW1OYW1lLCBhcmdzLm1vZGVsLnRvb2xiYXJTZXR0aW5ncyk7XHJcbiAgICAgICAgaWYgKGNsaWNrZWRUb29sYmFySWQgPT0gdGhpcy5fdG9vbGJhcklkQWRkKSB7XHJcbiAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmRyb3BEb3duTWVudS5pc09wZW5lZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyb3BEb3duTWVudS5zaG93RHJvcERvd25NZW51KHRoaXMuc2VsZWN0ZWRDaGFydCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyb3BEb3duTWVudS5oaWRlRHJvcERvd25NZW51KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY2xpY2tlZFRvb2xiYXJJZCA9PSB0aGlzLl90b29sYmFySWREZWxldGUpIHtcclxuICAgICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmRlbGV0ZUl0ZW0oYXJncy5tb2RlbC5zZWxlY3RlZEl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGRlbGV0ZXMgdGhlIGdpdmVuIGRhdGFtb2RlbCBpdGVtKGNoYXJ0LCBzY2FsZSwgc2VyaWUpIGZyb20gdGhlIGRhdGFtb2RlbFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlbGVjdGVkTW9kZWxJdGVtXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyVHJlZUdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGVsZXRlSXRlbShzZWxlY3RlZE1vZGVsSXRlbSl7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkSXRlbSA9IHNlbGVjdGVkTW9kZWxJdGVtLml0ZW07XHJcbiAgICAgICAgaWYgKHNlbGVjdGVkTW9kZWxJdGVtICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaWYoc2VsZWN0ZWRJdGVtIGluc3RhbmNlb2YgQ2hhcnRNYW5hZ2VyQ2hhcnQpe1xyXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGNoYXJ0IGZyb20gZGF0YW1vZGVsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFNb2RlbC5yZW1vdmVDaGFydChzZWxlY3RlZEl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoc2VsZWN0ZWRJdGVtIGluc3RhbmNlb2YgQmFzZVNlcmllcyl7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydHx1bmRlZmluZWQgPSBzZWxlY3RlZE1vZGVsSXRlbS5wYXJlbnRJdGVtLnBhcmVudEl0ZW0uaXRlbTtcclxuICAgICAgICAgICAgICAgIGlmKGNoYXJ0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHNlcmllIGZyb20gZGF0YW1vZGVsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhTW9kZWwucmVtb3ZlU2VyaWUoY2hhcnQsIHNlbGVjdGVkSXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihzZWxlY3RlZEl0ZW0gaW5zdGFuY2VvZiBTY2FsZSl7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydHx1bmRlZmluZWQgPSBzZWxlY3RlZE1vZGVsSXRlbS5wYXJlbnRJdGVtLml0ZW07XHJcbiAgICAgICAgICAgICAgICBpZihjaGFydCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB5QXhpcyBmcm9tIGRhdGFtb2RlbFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YU1vZGVsLnJlbW92ZVlBeGlzKGNoYXJ0LCBzZWxlY3RlZEl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzYWJsZXMvRW5hYmxlcyB0aGUgZGVsZXRlIGNoYXJ0L3NlcmllIGJ1dHRvbiBpbiB0aGUgdG9vbGJhclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZGlzYWJsZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlclRyZWVHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGlzYWJsZURlbGV0ZUJ1dHRvbihkaXNhYmxlOiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLmRpc2FibGVCdXR0b24odGhpcy5fdG9vbGJhcklkRGVsZXRlLCBkaXNhYmxlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc2FibGVzL0VuYWJsZXMgdGhlIGFkZCBjaGFydCBidXR0b24gaW4gdGhlIHRvb2xiYXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGRpc2FibGVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJUcmVlR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpc2FibGVBZGRCdXR0b24oZGlzYWJsZTogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZEFkZCwgZGlzYWJsZSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogc2V0cyB0aGUgY3VycmVudCBzZWxlY3RlZCBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7KElDaGFydE1hbmFnZXJDaGFydHxTY2FsZXxCYXNlU2VyaWVzKX0gY2hhcnRcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJUcmVlR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFNlbGVjdGVkQ2hhcnQgKGNoYXJ0OiBJQ2hhcnRNYW5hZ2VyQ2hhcnR8U2NhbGV8QmFzZVNlcmllcykge1xyXG4gICAgICAgIGlmIChjaGFydCBpbnN0YW5jZW9mIENoYXJ0TWFuYWdlckNoYXJ0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFydCA9IGNoYXJ0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFydCA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=