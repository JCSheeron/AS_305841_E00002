define(["require", "exports", "../style/dropDownCssClassNameProvider"], function (require, exports, dropDownCssClassNameProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TabWidgetDropDownHTMLProvider = /** @class */ (function () {
        function TabWidgetDropDownHTMLProvider() {
        }
        /**
         * Sets the dropdownlist Id, on that position the dropdownlist is added
         *
         * @static
         * @param {string} dropDownContainerId
         * @return {*}  {string}
         * @memberof TabWidgetDropDownHTMLProvider
         */
        TabWidgetDropDownHTMLProvider.getDropDownPopupLayout = function (dropDownContainerId) {
            var html = '<input id="' + dropDownContainerId + '" />';
            return html;
        };
        /**
         * Template for list items
         *
         * @private
         * @static
         * @param {string} dropDownItemDeleteButtonId
         * @return {*}  {string}
         * @memberof TabWidgetDropDownHTMLProvider
         */
        TabWidgetDropDownHTMLProvider.getDropDownItemTemplate = function (dropDownItemDeleteButtonId) {
            var html = '<img class="' + dropDownCssClassNameProvider_1.DropDownCssClassNameProvider.dropDownItemImg + '" src="${imagePath}"/>'
                +
                    '<div class="' + dropDownCssClassNameProvider_1.DropDownCssClassNameProvider.dropDownItemText + '">${text}</div>'
                +
                    '<button id="' + dropDownItemDeleteButtonId + '${id}"></button>';
            return html;
        };
        /**
         * Template for footer
         *
         * @private
         * @static
         * @param {string} dropDownFooterCloseAllId
         * @param {string} dropDownFooterCloseAllOtherId
         * @return {*}  {string}
         * @memberof TabWidgetDropDownHTMLProvider
         */
        TabWidgetDropDownHTMLProvider.getDropDownFooterTemplate = function (dropDownFooterCloseAllId, dropDownFooterCloseAllOtherId) {
            var html = '<button id="' + dropDownFooterCloseAllId + '"></button>'
                +
                    '<button id="' + dropDownFooterCloseAllOtherId + '"></button>';
            return html;
        };
        return TabWidgetDropDownHTMLProvider;
    }());
    exports.TabWidgetDropDownHTMLProvider = TabWidgetDropDownHTMLProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiV2lkZ2V0RHJvcERvd25IVE1MUHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvdGFiV2lkZ2V0L2xheW91dC90YWJXaWRnZXREcm9wRG93bkhUTUxQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFFQTtRQUVJO1FBQXVCLENBQUM7UUFFeEI7Ozs7Ozs7V0FPRztRQUNZLG9EQUFzQixHQUFyQyxVQUFzQyxtQkFBMkI7WUFDN0QsSUFBSSxJQUFJLEdBQUcsYUFBYSxHQUFDLG1CQUFtQixHQUFDLE1BQU0sQ0FBQztZQUNwRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDVyxxREFBdUIsR0FBckMsVUFBc0MsMEJBQWtDO1lBQ3BFLElBQUksSUFBSSxHQUNSLGNBQWMsR0FBQywyREFBNEIsQ0FBQyxlQUFlLEdBQUMsd0JBQXdCOztvQkFFcEYsY0FBYyxHQUFDLDJEQUE0QixDQUFDLGdCQUFnQixHQUFDLGlCQUFpQjs7b0JBRTlFLGNBQWMsR0FBQywwQkFBMEIsR0FBQyxrQkFBa0IsQ0FBQztZQUM3RCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRUQ7Ozs7Ozs7OztXQVNHO1FBQ1csdURBQXlCLEdBQXZDLFVBQXdDLHdCQUFnQyxFQUFFLDZCQUFxQztZQUMzRyxJQUFJLElBQUksR0FDUixjQUFjLEdBQUMsd0JBQXdCLEdBQUMsYUFBYTs7b0JBRXJELGNBQWMsR0FBQyw2QkFBNkIsR0FBQyxhQUFhLENBQUM7WUFDM0QsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNMLG9DQUFDO0lBQUQsQ0FBQyxBQXJERCxJQXFEQztJQXJEWSxzRUFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEcm9wRG93bkNzc0NsYXNzTmFtZVByb3ZpZGVyIH0gZnJvbSBcIi4uL3N0eWxlL2Ryb3BEb3duQ3NzQ2xhc3NOYW1lUHJvdmlkZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUYWJXaWRnZXREcm9wRG93bkhUTUxQcm92aWRlcntcclxuXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGRyb3Bkb3dubGlzdCBJZCwgb24gdGhhdCBwb3NpdGlvbiB0aGUgZHJvcGRvd25saXN0IGlzIGFkZGVkXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRyb3BEb3duQ29udGFpbmVySWRcclxuICAgICAqIEByZXR1cm4geyp9ICB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldERyb3BEb3duSFRNTFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyAgc3RhdGljIGdldERyb3BEb3duUG9wdXBMYXlvdXQoZHJvcERvd25Db250YWluZXJJZDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgaHRtbCA9ICc8aW5wdXQgaWQ9XCInK2Ryb3BEb3duQ29udGFpbmVySWQrJ1wiIC8+JztcclxuICAgICAgICByZXR1cm4gaHRtbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRlbXBsYXRlIGZvciBsaXN0IGl0ZW1zXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkcm9wRG93bkl0ZW1EZWxldGVCdXR0b25JZFxyXG4gICAgICogQHJldHVybiB7Kn0gIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0RHJvcERvd25IVE1MUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXREcm9wRG93bkl0ZW1UZW1wbGF0ZShkcm9wRG93bkl0ZW1EZWxldGVCdXR0b25JZDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgaHRtbDogc3RyaW5nID0gIFxyXG4gICAgICAgICc8aW1nIGNsYXNzPVwiJytEcm9wRG93bkNzc0NsYXNzTmFtZVByb3ZpZGVyLmRyb3BEb3duSXRlbUltZysnXCIgc3JjPVwiJHtpbWFnZVBhdGh9XCIvPicgXHJcbiAgICAgICAgK1xyXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiJytEcm9wRG93bkNzc0NsYXNzTmFtZVByb3ZpZGVyLmRyb3BEb3duSXRlbVRleHQrJ1wiPiR7dGV4dH08L2Rpdj4nXHJcbiAgICAgICAgK1xyXG4gICAgICAgICc8YnV0dG9uIGlkPVwiJytkcm9wRG93bkl0ZW1EZWxldGVCdXR0b25JZCsnJHtpZH1cIj48L2J1dHRvbj4nO1xyXG4gICAgICAgIHJldHVybiBodG1sO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGVtcGxhdGUgZm9yIGZvb3RlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZHJvcERvd25Gb290ZXJDbG9zZUFsbElkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZHJvcERvd25Gb290ZXJDbG9zZUFsbE90aGVySWRcclxuICAgICAqIEByZXR1cm4geyp9ICB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldERyb3BEb3duSFRNTFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0RHJvcERvd25Gb290ZXJUZW1wbGF0ZShkcm9wRG93bkZvb3RlckNsb3NlQWxsSWQ6IHN0cmluZywgZHJvcERvd25Gb290ZXJDbG9zZUFsbE90aGVySWQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IGh0bWw6IHN0cmluZyA9IFxyXG4gICAgICAgICc8YnV0dG9uIGlkPVwiJytkcm9wRG93bkZvb3RlckNsb3NlQWxsSWQrJ1wiPjwvYnV0dG9uPidcclxuICAgICAgICArXHJcbiAgICAgICAgJzxidXR0b24gaWQ9XCInK2Ryb3BEb3duRm9vdGVyQ2xvc2VBbGxPdGhlcklkKydcIj48L2J1dHRvbj4nO1xyXG4gICAgICAgIHJldHVybiBodG1sO1xyXG4gICAgfVxyXG59Il19