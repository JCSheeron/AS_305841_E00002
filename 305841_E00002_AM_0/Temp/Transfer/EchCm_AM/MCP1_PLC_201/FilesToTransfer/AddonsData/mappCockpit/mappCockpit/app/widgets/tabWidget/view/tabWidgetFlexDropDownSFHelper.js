define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TabWidgetFlexDropDownSFHelper = /** @class */ (function () {
        function TabWidgetFlexDropDownSFHelper() {
        }
        /**
         * Hides popuplist bay the passed id
         *
         * @static
         * @param {string} dropDownContainerId
         * @memberof TabWidgetFlexDropDownSFHelper
         */
        TabWidgetFlexDropDownSFHelper.hidePopupList = function (dropDownContainerId) {
            $("#" + dropDownContainerId).ejDropDownList("hidePopup");
        };
        /**
         * Set datasource to SF datamodel by the passed id
         *
         * @static
         * @param {string} dropDownContainerId
         * @param {(Array<TabWidgetFlexDropDownItem|TabWidgetFlexDropDownFooter>)} dataSource
         * @memberof TabWidgetFlexDropDownSFHelper
         */
        TabWidgetFlexDropDownSFHelper.setDataSource = function (dropDownContainerId, dataSource) {
            $("#" + dropDownContainerId).data("ejDropDownList").option("dataSource", dataSource);
        };
        return TabWidgetFlexDropDownSFHelper;
    }());
    exports.TabWidgetFlexDropDownSFHelper = TabWidgetFlexDropDownSFHelper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiV2lkZ2V0RmxleERyb3BEb3duU0ZIZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvdGFiV2lkZ2V0L3ZpZXcvdGFiV2lkZ2V0RmxleERyb3BEb3duU0ZIZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBR0E7UUFFSTtRQUF1QixDQUFDO1FBRXhCOzs7Ozs7V0FNRztRQUNXLDJDQUFhLEdBQTNCLFVBQTRCLG1CQUEyQjtZQUNuRCxDQUFDLENBQUMsR0FBRyxHQUFDLG1CQUFtQixDQUFDLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzNELENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ1csMkNBQWEsR0FBM0IsVUFBNEIsbUJBQTJCLEVBQUUsVUFBd0U7WUFDN0gsQ0FBQyxDQUFDLEdBQUcsR0FBQyxtQkFBbUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDdkYsQ0FBQztRQUVMLG9DQUFDO0lBQUQsQ0FBQyxBQTNCRCxJQTJCQztJQTNCWSxzRUFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUYWJXaWRnZXRGbGV4RHJvcERvd25Gb290ZXIgfSBmcm9tIFwiLi4vbW9kZWwvdGFiV2lkZ2V0RmxleERyb3BEb3duRm9vdGVyXCI7XHJcbmltcG9ydCB7IFRhYldpZGdldEZsZXhEcm9wRG93bkl0ZW0gfSBmcm9tIFwiLi4vbW9kZWwvdGFiV2lkZ2V0RmxleERyb3BEb3duSXRlbVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRhYldpZGdldEZsZXhEcm9wRG93blNGSGVscGVyIHtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIaWRlcyBwb3B1cGxpc3QgYmF5IHRoZSBwYXNzZWQgaWRcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZHJvcERvd25Db250YWluZXJJZFxyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldEZsZXhEcm9wRG93blNGSGVscGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgaGlkZVBvcHVwTGlzdChkcm9wRG93bkNvbnRhaW5lcklkOiBzdHJpbmcpIHtcclxuICAgICAgICAkKFwiI1wiK2Ryb3BEb3duQ29udGFpbmVySWQpLmVqRHJvcERvd25MaXN0KFwiaGlkZVBvcHVwXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IGRhdGFzb3VyY2UgdG8gU0YgZGF0YW1vZGVsIGJ5IHRoZSBwYXNzZWQgaWRcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZHJvcERvd25Db250YWluZXJJZFxyXG4gICAgICogQHBhcmFtIHsoQXJyYXk8VGFiV2lkZ2V0RmxleERyb3BEb3duSXRlbXxUYWJXaWRnZXRGbGV4RHJvcERvd25Gb290ZXI+KX0gZGF0YVNvdXJjZVxyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldEZsZXhEcm9wRG93blNGSGVscGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc2V0RGF0YVNvdXJjZShkcm9wRG93bkNvbnRhaW5lcklkOiBzdHJpbmcsIGRhdGFTb3VyY2U6IEFycmF5PFRhYldpZGdldEZsZXhEcm9wRG93bkl0ZW18VGFiV2lkZ2V0RmxleERyb3BEb3duRm9vdGVyPil7XHJcbiAgICAgICAgJChcIiNcIitkcm9wRG93bkNvbnRhaW5lcklkKS5kYXRhKFwiZWpEcm9wRG93bkxpc3RcIikub3B0aW9uKFwiZGF0YVNvdXJjZVwiLCBkYXRhU291cmNlKTtcclxuICAgIH1cclxuXHJcbn0iXX0=