define(["require", "exports", "../layout/tabWidgetDropDownHTMLProvider"], function (require, exports, tabWidgetDropDownHTMLProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Contains the information of the dropdown list footer.
     * Each accessible class member that is used in an Syncfusion Template needs to have the same name.
     *
     * TODO: When changing to SF JS2, Footer item is not needed anymore, cause it can be set directly at the footerTemplate!
     *
     * @export
     * @class TabWidgetFlexDropDownFooter
     */
    var TabWidgetFlexDropDownFooter = /** @class */ (function () {
        function TabWidgetFlexDropDownFooter(dropDownFooterCloseAllId, dropDownFooterCloseAllOtherId) {
            this.dropDownTemplate = this.getFooterTemplate(dropDownFooterCloseAllId, dropDownFooterCloseAllOtherId);
        }
        /**
         *
         *
         * @private
         * @param {string} dropDownFooterCloseAllId
         * @param {string} dropDownFooterCloseAllOtherId
         * @return {*}  {string}
         * @memberof TabWidgetFlexDropDownFooter
         */
        TabWidgetFlexDropDownFooter.prototype.getFooterTemplate = function (dropDownFooterCloseAllId, dropDownFooterCloseAllOtherId) {
            return tabWidgetDropDownHTMLProvider_1.TabWidgetDropDownHTMLProvider.getDropDownFooterTemplate(dropDownFooterCloseAllId, dropDownFooterCloseAllOtherId);
        };
        return TabWidgetFlexDropDownFooter;
    }());
    exports.TabWidgetFlexDropDownFooter = TabWidgetFlexDropDownFooter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiV2lkZ2V0RmxleERyb3BEb3duRm9vdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RhYldpZGdldC9tb2RlbC90YWJXaWRnZXRGbGV4RHJvcERvd25Gb290ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBRUE7Ozs7Ozs7O09BUUc7SUFDSDtRQUtJLHFDQUFtQix3QkFBZ0MsRUFBRSw2QkFBcUM7WUFDdEYsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyx3QkFBd0IsRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO1FBQzVHLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNLLHVEQUFpQixHQUF6QixVQUEwQix3QkFBZ0MsRUFBRSw2QkFBcUM7WUFDN0YsT0FBTyw2REFBNkIsQ0FBQyx5QkFBeUIsQ0FBQyx3QkFBd0IsRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO1FBQzVILENBQUM7UUFDTCxrQ0FBQztJQUFELENBQUMsQUFyQkQsSUFxQkM7SUFyQlksa0VBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGFiV2lkZ2V0RHJvcERvd25IVE1MUHJvdmlkZXIgfSBmcm9tIFwiLi4vbGF5b3V0L3RhYldpZGdldERyb3BEb3duSFRNTFByb3ZpZGVyXCI7XHJcblxyXG4vKipcclxuICogQ29udGFpbnMgdGhlIGluZm9ybWF0aW9uIG9mIHRoZSBkcm9wZG93biBsaXN0IGZvb3Rlci5cclxuICogRWFjaCBhY2Nlc3NpYmxlIGNsYXNzIG1lbWJlciB0aGF0IGlzIHVzZWQgaW4gYW4gU3luY2Z1c2lvbiBUZW1wbGF0ZSBuZWVkcyB0byBoYXZlIHRoZSBzYW1lIG5hbWUuXHJcbiAqIFxyXG4gKiBUT0RPOiBXaGVuIGNoYW5naW5nIHRvIFNGIEpTMiwgRm9vdGVyIGl0ZW0gaXMgbm90IG5lZWRlZCBhbnltb3JlLCBjYXVzZSBpdCBjYW4gYmUgc2V0IGRpcmVjdGx5IGF0IHRoZSBmb290ZXJUZW1wbGF0ZSFcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgVGFiV2lkZ2V0RmxleERyb3BEb3duRm9vdGVyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVGFiV2lkZ2V0RmxleERyb3BEb3duRm9vdGVyIHtcclxuXHJcbiAgICAvLyBUT0RPOiBXaGVuIGNoYW5naW5nIHRvIFNGIEpTMiB0aGUgdGVtcGxhdGUgY2FuIGJlIHNldCBhcyBmb290ZXJUZW1wbGF0ZSB3aGlsZSBpbml0aWFsaXNhdGlvblxyXG4gICAgcHVibGljIHJlYWRvbmx5IGRyb3BEb3duVGVtcGxhdGU6IHN0cmluZztcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoZHJvcERvd25Gb290ZXJDbG9zZUFsbElkOiBzdHJpbmcsIGRyb3BEb3duRm9vdGVyQ2xvc2VBbGxPdGhlcklkOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmRyb3BEb3duVGVtcGxhdGUgPSB0aGlzLmdldEZvb3RlclRlbXBsYXRlKGRyb3BEb3duRm9vdGVyQ2xvc2VBbGxJZCwgZHJvcERvd25Gb290ZXJDbG9zZUFsbE90aGVySWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRyb3BEb3duRm9vdGVyQ2xvc2VBbGxJZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRyb3BEb3duRm9vdGVyQ2xvc2VBbGxPdGhlcklkXHJcbiAgICAgKiBAcmV0dXJuIHsqfSAge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRGbGV4RHJvcERvd25Gb290ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRGb290ZXJUZW1wbGF0ZShkcm9wRG93bkZvb3RlckNsb3NlQWxsSWQ6IHN0cmluZywgZHJvcERvd25Gb290ZXJDbG9zZUFsbE90aGVySWQ6IHN0cmluZykgOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBUYWJXaWRnZXREcm9wRG93bkhUTUxQcm92aWRlci5nZXREcm9wRG93bkZvb3RlclRlbXBsYXRlKGRyb3BEb3duRm9vdGVyQ2xvc2VBbGxJZCwgZHJvcERvd25Gb290ZXJDbG9zZUFsbE90aGVySWQpO1xyXG4gICAgfVxyXG59Il19