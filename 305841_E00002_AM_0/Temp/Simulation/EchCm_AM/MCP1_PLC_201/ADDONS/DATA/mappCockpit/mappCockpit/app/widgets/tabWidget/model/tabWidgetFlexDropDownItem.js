define(["require", "exports", "../layout/tabWidgetDropDownHTMLProvider"], function (require, exports, tabWidgetDropDownHTMLProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Contains the information of a a dropdown list item.
     * Each accessible class member that is used in an Syncfusion Template needs to have the same name.
     *
     * @export
     * @class TabWidgetFlexDropDownItem
     */
    var TabWidgetFlexDropDownItem = /** @class */ (function () {
        /**
         * Creates an instance of TabWidgetFlexDropDownDataModel.
         * The variable names needs to match with the keys set in the template of ejDropDownList
         * @memberof TabWidgetFlexDropDownDataModel
         */
        function TabWidgetFlexDropDownItem(id, text, imagePath, dropDownItemDeleteButtonId) {
            this.id = id;
            this.text = text;
            this._imagePath = imagePath;
            this.dropDownTemplate = this.getListItemTemplate(dropDownItemDeleteButtonId);
        }
        Object.defineProperty(TabWidgetFlexDropDownItem.prototype, "imagePath", {
            get: function () {
                return this._imagePath;
            },
            set: function (value) {
                this._imagePath = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         *
         *
         * @private
         * @param {string} dropDownItemDeleteButtonId
         * @return {*}  {string}
         * @memberof TabWidgetFlexDropDownItem
         */
        TabWidgetFlexDropDownItem.prototype.getListItemTemplate = function (dropDownItemDeleteButtonId) {
            return tabWidgetDropDownHTMLProvider_1.TabWidgetDropDownHTMLProvider.getDropDownItemTemplate(dropDownItemDeleteButtonId);
        };
        return TabWidgetFlexDropDownItem;
    }());
    exports.TabWidgetFlexDropDownItem = TabWidgetFlexDropDownItem;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiV2lkZ2V0RmxleERyb3BEb3duSXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy90YWJXaWRnZXQvbW9kZWwvdGFiV2lkZ2V0RmxleERyb3BEb3duSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFFQTs7Ozs7O09BTUc7SUFDSDtRQVFJOzs7O1dBSUc7UUFDSCxtQ0FBbUIsRUFBVSxFQUFFLElBQVksRUFBRSxTQUFpQixFQUFFLDBCQUFrQztZQUM5RixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUNiLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1lBQzVCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUNqRixDQUFDO1FBRUQsc0JBQVcsZ0RBQVM7aUJBQXBCO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUMzQixDQUFDO2lCQUVELFVBQXFCLEtBQWE7Z0JBQzlCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQzVCLENBQUM7OztXQUpBO1FBTUQ7Ozs7Ozs7V0FPRztRQUNLLHVEQUFtQixHQUEzQixVQUE0QiwwQkFBa0M7WUFDMUQsT0FBTyw2REFBNkIsQ0FBQyx1QkFBdUIsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBQzdGLENBQUM7UUFDTCxnQ0FBQztJQUFELENBQUMsQUF2Q0QsSUF1Q0M7SUF2Q1ksOERBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGFiV2lkZ2V0RHJvcERvd25IVE1MUHJvdmlkZXIgfSBmcm9tIFwiLi4vbGF5b3V0L3RhYldpZGdldERyb3BEb3duSFRNTFByb3ZpZGVyXCI7XHJcblxyXG4vKipcclxuICogQ29udGFpbnMgdGhlIGluZm9ybWF0aW9uIG9mIGEgYSBkcm9wZG93biBsaXN0IGl0ZW0uXHJcbiAqIEVhY2ggYWNjZXNzaWJsZSBjbGFzcyBtZW1iZXIgdGhhdCBpcyB1c2VkIGluIGFuIFN5bmNmdXNpb24gVGVtcGxhdGUgbmVlZHMgdG8gaGF2ZSB0aGUgc2FtZSBuYW1lLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBUYWJXaWRnZXRGbGV4RHJvcERvd25JdGVtXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVGFiV2lkZ2V0RmxleERyb3BEb3duSXRlbSB7XHJcblxyXG4gICAgcHVibGljIHJlYWRvbmx5IGlkOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgdGV4dDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfaW1hZ2VQYXRoOiBzdHJpbmc7XHJcbiAgICAvLyBUT0RPOiBXaGVuIGNoYW5naW5nIHRvIFNGIEpTMiB0aGUgdGVtcGxhdGUgY2FuIGJlIHNldCBhcyBpdGVtVGVtcGxhdGUgd2hpbGUgaW5pdGlhbGlzYXRpb25cclxuICAgIHB1YmxpYyByZWFkb25seSBkcm9wRG93blRlbXBsYXRlOiBzdHJpbmc7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBUYWJXaWRnZXRGbGV4RHJvcERvd25EYXRhTW9kZWwuXHJcbiAgICAgKiBUaGUgdmFyaWFibGUgbmFtZXMgbmVlZHMgdG8gbWF0Y2ggd2l0aCB0aGUga2V5cyBzZXQgaW4gdGhlIHRlbXBsYXRlIG9mIGVqRHJvcERvd25MaXN0XHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0RmxleERyb3BEb3duRGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCB0ZXh0OiBzdHJpbmcsIGltYWdlUGF0aDogc3RyaW5nLCBkcm9wRG93bkl0ZW1EZWxldGVCdXR0b25JZDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMudGV4dCA9IHRleHQ7XHJcbiAgICAgICAgdGhpcy5faW1hZ2VQYXRoID0gaW1hZ2VQYXRoO1xyXG4gICAgICAgIHRoaXMuZHJvcERvd25UZW1wbGF0ZSA9IHRoaXMuZ2V0TGlzdEl0ZW1UZW1wbGF0ZShkcm9wRG93bkl0ZW1EZWxldGVCdXR0b25JZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpbWFnZVBhdGgoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW1hZ2VQYXRoO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgaW1hZ2VQYXRoKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9pbWFnZVBhdGggPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZHJvcERvd25JdGVtRGVsZXRlQnV0dG9uSWRcclxuICAgICAqIEByZXR1cm4geyp9ICB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldEZsZXhEcm9wRG93bkl0ZW1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRMaXN0SXRlbVRlbXBsYXRlKGRyb3BEb3duSXRlbURlbGV0ZUJ1dHRvbklkOiBzdHJpbmcpIDogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gVGFiV2lkZ2V0RHJvcERvd25IVE1MUHJvdmlkZXIuZ2V0RHJvcERvd25JdGVtVGVtcGxhdGUoZHJvcERvd25JdGVtRGVsZXRlQnV0dG9uSWQpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==