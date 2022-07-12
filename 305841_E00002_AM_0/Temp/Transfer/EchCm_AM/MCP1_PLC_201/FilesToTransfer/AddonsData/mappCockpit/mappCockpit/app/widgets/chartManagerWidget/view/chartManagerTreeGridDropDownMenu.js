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
define(["require", "exports", "../../../models/chartManagerDataModel/chartManagerChart", "../../../models/chartManagerDataModel/chartManagerChart", "../../../models/chartManagerDataModel/scale", "../../common/dropDownMenuBase"], function (require, exports, chartManagerChart_1, chartManagerChart_2, scale_1, dropDownMenuBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartManagerTreeGridDropDownMenu = /** @class */ (function (_super) {
        __extends(ChartManagerTreeGridDropDownMenu, _super);
        function ChartManagerTreeGridDropDownMenu(dataModel, widgetDiv) {
            var _this = _super.call(this, widgetDiv, "Add") || this;
            _this._width = '130px';
            _this._leftPosition = '1px';
            _this.dataModel = dataModel;
            _this.buttonsId = ["YTChart_Choose_Btn_DropDownMenu", "XYChart_Choose_Btn_DropDownMenu", "FFTChart_Choose_Btn_DropDownMenu",
                "YTAxis_Choose_Btn_DropDownMenu"];
            _this.ytChartDropDownMenu = _this.buttonsId[0];
            _this.xyChartDropDownMenu = _this.buttonsId[1];
            _this.fftChartDropDownMenu = _this.buttonsId[2];
            _this.axisChartDropDownMenu = _this.buttonsId[3];
            return _this;
        }
        /**
         * Updates the chartmanager datamodel
         *
         * @param {IChartManagerDataModel} dataModel
         * @memberof ChartManagerTreeGridDropDownMenu
         */
        ChartManagerTreeGridDropDownMenu.prototype.updateDataModel = function (dataModel) {
            this.dataModel = dataModel;
        };
        /**
         * Show dropdown menu
         *
         * @param {(IChartManagerChart | undefined)} selectedChart
         * @memberof ChartManagerTreeGridDropDownMenu
         */
        ChartManagerTreeGridDropDownMenu.prototype.showDropDownMenu = function (selectedChart) {
            var axisAvailable;
            var canAddChart = this.dataModel.canAddChart();
            if (selectedChart !== undefined && selectedChart.canAddYAxis()) {
                axisAvailable = true;
            }
            else {
                axisAvailable = false;
            }
            this.createDropDownMenu(this._width, this._leftPosition, this.buttonsId);
            this.createButton(this.ytChartDropDownMenu, "Add YT Chart", canAddChart, undefined);
            this.createButton(this.xyChartDropDownMenu, "Add XY Chart", canAddChart, undefined);
            this.createButton(this.fftChartDropDownMenu, "Add FFT Chart", canAddChart, undefined);
            this.createButton(this.axisChartDropDownMenu, "Add scale to chart", axisAvailable, selectedChart);
            this.isOpened = true;
        };
        /**
         * Create syncf button
         *
         * @private
         * @param {string} id
         * @param {string} text
         * @param {boolean} enabled
         * @param {(IChartManagerChart | undefined)} chart
         * @memberof ChartManagerTreeGridDropDownMenu
         */
        ChartManagerTreeGridDropDownMenu.prototype.createButton = function (id, text, enabled, chart) {
            var _this = this;
            $('#' + id).ejButton({
                text: text,
                contentType: ej.ContentType.TextOnly,
                cssClass: "dropDownMenu",
                prefixIcon: "e-icon",
                enabled: enabled,
                click: function (args) {
                    switch (id) {
                        case _this.ytChartDropDownMenu:
                            _this.addChart(chartManagerChart_2.ChartType.YTChart);
                            break;
                        case _this.xyChartDropDownMenu:
                            _this.addChart(chartManagerChart_2.ChartType.XYChart);
                            break;
                        case _this.fftChartDropDownMenu:
                            _this.addChart(chartManagerChart_2.ChartType.FFTChart);
                            break;
                        case _this.axisChartDropDownMenu:
                            _this.addANewYAxisToChart(chart);
                            break;
                    }
                    _this.hideDropDownMenu();
                }
            });
        };
        /**
         * Add an empty chart
         *
         * @private
         * @param {ChartType} type
         * @memberof ChartManagerTreeGridDropDownMenu
         */
        ChartManagerTreeGridDropDownMenu.prototype.addChart = function (type) {
            var newChart = new chartManagerChart_1.ChartManagerChart(this.dataModel.getUniqueChartName(), type);
            newChart.addDefaultYScale(this.dataModel);
            this.dataModel.addChart(newChart, 0);
        };
        /**
         * Add a new y axis to a chart
         *
         * @private
         * @param {IChartManagerChart} selectedChart
         * @memberof ChartManagerTreeGridDropDownMenu
         */
        ChartManagerTreeGridDropDownMenu.prototype.addANewYAxisToChart = function (selectedChart) {
            var yAxis = new scale_1.Scale(selectedChart.getNextYAxisId(), selectedChart);
            selectedChart.addYScale(yAxis);
            this.dataModel.addYScale(selectedChart, yAxis);
        };
        return ChartManagerTreeGridDropDownMenu;
    }(dropDownMenuBase_1.dropDownMenuBase));
    exports.ChartManagerTreeGridDropDownMenu = ChartManagerTreeGridDropDownMenu;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRNYW5hZ2VyVHJlZUdyaWREcm9wRG93bk1lbnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY2hhcnRNYW5hZ2VyV2lkZ2V0L3ZpZXcvY2hhcnRNYW5hZ2VyVHJlZUdyaWREcm9wRG93bk1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQU9BO1FBQXNELG9EQUFnQjtRQVlsRSwwQ0FBWSxTQUFpQyxFQUFFLFNBQXlCO1lBQXhFLFlBQ0ksa0JBQU0sU0FBUyxFQUFFLEtBQUssQ0FBQyxTQVMxQjtZQWJnQixZQUFNLEdBQVcsT0FBTyxDQUFDO1lBQ3pCLG1CQUFhLEdBQVcsS0FBSyxDQUFDO1lBSTNDLEtBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1lBRTNCLEtBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxpQ0FBaUMsRUFBRSxpQ0FBaUMsRUFBRSxrQ0FBa0M7Z0JBQzFILGdDQUFnQyxDQUFFLENBQUM7WUFDbkMsS0FBSSxDQUFDLG1CQUFtQixHQUFJLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUMsS0FBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0MsS0FBSSxDQUFDLG9CQUFvQixHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUMsS0FBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7O1FBQ25ELENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILDBEQUFlLEdBQWYsVUFBZ0IsU0FBaUM7WUFDN0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDL0IsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ksMkRBQWdCLEdBQXZCLFVBQXlCLGFBQTZDO1lBQ2xFLElBQUksYUFBc0Is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Q3BFLGFBQWEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ25ELENBQUM7UUFDTCx1Q0FBQztJQUFELENBQUMsQUF6SEQsQ0FBc0QsbUNBQWdCLEdBeUhyRTtJQXpIWSw0RUFBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFydE1hbmFnZXJDaGFydCB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2NoYXJ0TWFuYWdlckNoYXJ0XCI7XHJcbmltcG9ydCB7IElDaGFydE1hbmFnZXJDaGFydCB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2ludGVyZmFjZXMvY2hhcnRNYW5hZ2VyQ2hhcnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ2hhcnRUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvY2hhcnRNYW5hZ2VyQ2hhcnRcIlxyXG5pbXBvcnQgeyBTY2FsZSB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL3NjYWxlXCI7XHJcbmltcG9ydCB7IElDaGFydE1hbmFnZXJEYXRhTW9kZWwgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9pbnRlcmZhY2VzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBkcm9wRG93bk1lbnVCYXNlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9kcm9wRG93bk1lbnVCYXNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hhcnRNYW5hZ2VyVHJlZUdyaWREcm9wRG93bk1lbnUgZXh0ZW5kcyBkcm9wRG93bk1lbnVCYXNle1xyXG4gICAgXHJcbiAgICBwcml2YXRlIGRhdGFNb2RlbDogSUNoYXJ0TWFuYWdlckRhdGFNb2RlbDtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHl0Q2hhcnREcm9wRG93bk1lbnU6IHN0cmluZztcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgeHlDaGFydERyb3BEb3duTWVudTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBmZnRDaGFydERyb3BEb3duTWVudTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBheGlzQ2hhcnREcm9wRG93bk1lbnU6IHN0cmluZztcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF93aWR0aDogc3RyaW5nID0gJzEzMHB4JztcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2xlZnRQb3NpdGlvbjogc3RyaW5nID0gJzFweCc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZGF0YU1vZGVsOiBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsLCB3aWRnZXREaXY6IEhUTUxEaXZFbGVtZW50KXtcclxuICAgICAgICBzdXBlcih3aWRnZXREaXYsIFwiQWRkXCIpXHJcbiAgICAgICAgdGhpcy5kYXRhTW9kZWwgPSBkYXRhTW9kZWw7XHJcblxyXG4gICAgICAgIHRoaXMuYnV0dG9uc0lkID0gW1wiWVRDaGFydF9DaG9vc2VfQnRuX0Ryb3BEb3duTWVudVwiLCBcIlhZQ2hhcnRfQ2hvb3NlX0J0bl9Ecm9wRG93bk1lbnVcIiwgXCJGRlRDaGFydF9DaG9vc2VfQnRuX0Ryb3BEb3duTWVudVwiLCBcclxuICAgICAgICBcIllUQXhpc19DaG9vc2VfQnRuX0Ryb3BEb3duTWVudVwiIF07XHJcbiAgICAgICAgdGhpcy55dENoYXJ0RHJvcERvd25NZW51ID0gIHRoaXMuYnV0dG9uc0lkWzBdO1xyXG4gICAgICAgIHRoaXMueHlDaGFydERyb3BEb3duTWVudSA9IHRoaXMuYnV0dG9uc0lkWzFdO1xyXG4gICAgICAgIHRoaXMuZmZ0Q2hhcnREcm9wRG93bk1lbnUgPSB0aGlzLmJ1dHRvbnNJZFsyXTtcclxuICAgICAgICB0aGlzLmF4aXNDaGFydERyb3BEb3duTWVudSA9IHRoaXMuYnV0dG9uc0lkWzNdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgY2hhcnRtYW5hZ2VyIGRhdGFtb2RlbFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SUNoYXJ0TWFuYWdlckRhdGFNb2RlbH0gZGF0YU1vZGVsXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyVHJlZUdyaWREcm9wRG93bk1lbnVcclxuICAgICAqL1xyXG4gICAgdXBkYXRlRGF0YU1vZGVsKGRhdGFNb2RlbDogSUNoYXJ0TWFuYWdlckRhdGFNb2RlbCl7XHJcbiAgICAgICAgdGhpcy5kYXRhTW9kZWwgPSBkYXRhTW9kZWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTaG93IGRyb3Bkb3duIG1lbnVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyhJQ2hhcnRNYW5hZ2VyQ2hhcnQgfCB1bmRlZmluZWQpfSBzZWxlY3RlZENoYXJ0XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyVHJlZUdyaWREcm9wRG93bk1lbnVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNob3dEcm9wRG93bk1lbnUgKHNlbGVjdGVkQ2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGxldCBheGlzQXZhaWxhYmxlOiBib29sZWFuO1xyXG4gICAgICAgIGxldCBjYW5BZGRDaGFydCA9IHRoaXMuZGF0YU1vZGVsLmNhbkFkZENoYXJ0KCk7XHJcblxyXG4gICAgICAgIGlmIChzZWxlY3RlZENoYXJ0ICE9PSB1bmRlZmluZWQgJiYgc2VsZWN0ZWRDaGFydC5jYW5BZGRZQXhpcygpKXtcclxuICAgICAgICAgICAgYXhpc0F2YWlsYWJsZSA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYXhpc0F2YWlsYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jcmVhdGVEcm9wRG93bk1lbnUodGhpcy5fd2lkdGgsIHRoaXMuX2xlZnRQb3NpdGlvbiwgdGhpcy5idXR0b25zSWQpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlQnV0dG9uKHRoaXMueXRDaGFydERyb3BEb3duTWVudSwgXCJBZGQgWVQgQ2hhcnRcIiwgY2FuQWRkQ2hhcnQsIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVCdXR0b24odGhpcy54eUNoYXJ0RHJvcERvd25NZW51LCBcIkFkZCBYWSBDaGFydFwiLCBjYW5BZGRDaGFydCwgdW5kZWZpbmVkKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUJ1dHRvbih0aGlzLmZmdENoYXJ0RHJvcERvd25NZW51LCBcIkFkZCBGRlQgQ2hhcnRcIiwgY2FuQWRkQ2hhcnQsIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVCdXR0b24odGhpcy5heGlzQ2hhcnREcm9wRG93bk1lbnUsIFwiQWRkIHNjYWxlIHRvIGNoYXJ0XCIsIGF4aXNBdmFpbGFibGUsIHNlbGVjdGVkQ2hhcnQpO1xyXG5cclxuICAgICAgICB0aGlzLmlzT3BlbmVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBzeW5jZiBidXR0b25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBlbmFibGVkXHJcbiAgICAgKiBAcGFyYW0geyhJQ2hhcnRNYW5hZ2VyQ2hhcnQgfCB1bmRlZmluZWQpfSBjaGFydFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlclRyZWVHcmlkRHJvcERvd25NZW51XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlQnV0dG9uKGlkOiBzdHJpbmcsIHRleHQ6IHN0cmluZywgZW5hYmxlZDogYm9vbGVhbiwgY2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCB8IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgJCgnIycgKyBpZCkuZWpCdXR0b24oe1xyXG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogZWouQ29udGVudFR5cGUuVGV4dE9ubHksXHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiBcImRyb3BEb3duTWVudVwiLFxyXG4gICAgICAgICAgICBwcmVmaXhJY29uOiBcImUtaWNvblwiICwvL1NwZWNpZmllcyB0aGUgcHJpbWFyeSBpY29uIGZvciBCdXR0b25cclxuICAgICAgICAgICAgZW5hYmxlZDogZW5hYmxlZCxcclxuICAgICAgICAgICAgY2xpY2s6IChhcmdzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGlkKXtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHRoaXMueXRDaGFydERyb3BEb3duTWVudTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDaGFydChDaGFydFR5cGUuWVRDaGFydCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy54eUNoYXJ0RHJvcERvd25NZW51OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZENoYXJ0KENoYXJ0VHlwZS5YWUNoYXJ0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0aGlzLmZmdENoYXJ0RHJvcERvd25NZW51OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZENoYXJ0KENoYXJ0VHlwZS5GRlRDaGFydCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5heGlzQ2hhcnREcm9wRG93bk1lbnU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQU5ld1lBeGlzVG9DaGFydChjaGFydCEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlRHJvcERvd25NZW51KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBhbiBlbXB0eSBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0NoYXJ0VHlwZX0gdHlwZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlclRyZWVHcmlkRHJvcERvd25NZW51XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkQ2hhcnQgKHR5cGU6IENoYXJ0VHlwZSkge1xyXG4gICAgICAgIHZhciBuZXdDaGFydCA9IG5ldyBDaGFydE1hbmFnZXJDaGFydCh0aGlzLmRhdGFNb2RlbCEuZ2V0VW5pcXVlQ2hhcnROYW1lKCksIHR5cGUpO1xyXG4gICAgICAgIG5ld0NoYXJ0LmFkZERlZmF1bHRZU2NhbGUodGhpcy5kYXRhTW9kZWwpO1xyXG4gICAgICAgIHRoaXMuZGF0YU1vZGVsLmFkZENoYXJ0KG5ld0NoYXJ0LCAwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBhIG5ldyB5IGF4aXMgdG8gYSBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lDaGFydE1hbmFnZXJDaGFydH0gc2VsZWN0ZWRDaGFydFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlclRyZWVHcmlkRHJvcERvd25NZW51XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkQU5ld1lBeGlzVG9DaGFydCAoc2VsZWN0ZWRDaGFydDogSUNoYXJ0TWFuYWdlckNoYXJ0KSB7XHJcbiAgICAgICAgbGV0IHlBeGlzID0gbmV3IFNjYWxlKHNlbGVjdGVkQ2hhcnQuZ2V0TmV4dFlBeGlzSWQoKSwgc2VsZWN0ZWRDaGFydClcclxuICAgICAgICBzZWxlY3RlZENoYXJ0LmFkZFlTY2FsZSh5QXhpcyk7XHJcbiAgICAgICAgdGhpcy5kYXRhTW9kZWwuYWRkWVNjYWxlKHNlbGVjdGVkQ2hhcnQsIHlBeGlzKTtcclxuICAgIH1cclxufSJdfQ==