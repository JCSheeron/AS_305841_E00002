define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * This class handles the widgets which support dropping of data into them
     *
     * @export
     * @class WidgetsWithDropSupportProvider
     */
    var WidgetsWithDropSupportProvider = /** @class */ (function () {
        function WidgetsWithDropSupportProvider() {
            this._widgets = new Array();
        }
        Object.defineProperty(WidgetsWithDropSupportProvider.prototype, "availableWidgets", {
            /**
             * Returns all available widgets with drop support
             *
             * @readonly
             * @type {Array<IDroppable>}
             * @memberof WidgetsWithDropSupportProvider
             */
            get: function () {
                return this._widgets;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Returns available widgets with drop support for the given dragDropDataId
         *
         * @param {string} dragDropDataId
         * @returns {Array<IDroppable>}
         * @memberof DroppableWidgetsProvider
         */
        WidgetsWithDropSupportProvider.prototype.getWidgetsWithDragDropDataId = function (dragDropDataId) {
            var filteredWidget = this._widgets.filter(function (droppableWidget) {
                var index = droppableWidget.supportedDragDropDataIds.indexOf(dragDropDataId);
                if (index != -1) {
                    return true;
                }
                return false;
            });
            return filteredWidget;
        };
        /**
         * Returns the one and only singleton instance of the WidgetsWithDropSupportProvider
         *
         * @static
         * @returns
         * @memberof WidgetsWithDropSupportProvider
         */
        WidgetsWithDropSupportProvider.getInstance = function () {
            if (!WidgetsWithDropSupportProvider.instance) {
                WidgetsWithDropSupportProvider.instance = new WidgetsWithDropSupportProvider();
            }
            return WidgetsWithDropSupportProvider.instance;
        };
        /**
         * Adds a widget with drop support to the provider
         *
         * @param {IDroppable} widget
         * @memberof WidgetsWithDropSupportProvider
         */
        WidgetsWithDropSupportProvider.prototype.addWidget = function (widget) {
            var index = this._widgets.indexOf(widget);
            if (index == -1) {
                this._widgets.push(widget);
            }
        };
        /**
         * Removes a widget with drop support from the provider
         *
         * @param {IDroppable} widget
         * @memberof WidgetsWithDropSupportProvider
         */
        WidgetsWithDropSupportProvider.prototype.removeWidget = function (widget) {
            var index = this._widgets.indexOf(widget);
            if (index != -1) {
                this._widgets.splice(index, 1);
            }
        };
        return WidgetsWithDropSupportProvider;
    }());
    exports.WidgetsWithDropSupportProvider = WidgetsWithDropSupportProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0c1dpdGhEcm9wU3VwcG9ydFByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NvbW1vbi93aWRnZXRzV2l0aERyb3BTdXBwb3J0UHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBRUE7Ozs7O09BS0c7SUFDSDtRQUFBO1lBRVksYUFBUSxHQUFzQixJQUFJLEtBQUssRUFBYyxDQUFDO1FBd0VsRSxDQUFDO1FBL0RHLHNCQUFXLDREQUFnQjtZQVAzQjs7Ozs7O2VBTUc7aUJBQ0g7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ3pCLENBQUM7OztXQUFBO1FBRUQ7Ozs7OztXQU1HO1FBQ0kscUVBQTRCLEdBQW5DLFVBQW9DLGNBQXNCO1lBQ3RELElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQUEsZUFBZTtnQkFDckQsSUFBSSxLQUFLLEdBQUcsZUFBZSxDQUFDLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDN0UsSUFBRyxLQUFLLElBQUksQ0FBQyxDQUFDLEVBQUM7b0JBQ1gsT0FBTyxJQUFJLENBQUM7aUJBQ2Y7Z0JBQ0QsT0FBTyxLQUFLLENBQUM7WUFDakIsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLGNBQWMsQ0FBQztRQUMxQixDQUFDO1FBSUQ7Ozs7OztXQU1HO1FBQ0ksMENBQVcsR0FBbEI7WUFDSSxJQUFJLENBQUMsOEJBQThCLENBQUMsUUFBUSxFQUFFO2dCQUMxQyw4QkFBOEIsQ0FBQyxRQUFRLEdBQUcsSUFBSSw4QkFBOEIsRUFBRSxDQUFDO2FBQ2xGO1lBQ0QsT0FBTyw4QkFBOEIsQ0FBQyxRQUFRLENBQUM7UUFDbkQsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsa0RBQVMsR0FBVCxVQUFVLE1BQWtCO1lBQ3hCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFDLElBQUcsS0FBSyxJQUFJLENBQUMsQ0FBQyxFQUFDO2dCQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzlCO1FBQ0wsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gscURBQVksR0FBWixVQUFhLE1BQWtCO1lBQzNCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFDLElBQUcsS0FBSyxJQUFJLENBQUMsQ0FBQyxFQUFDO2dCQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNsQztRQUNMLENBQUM7UUFDTCxxQ0FBQztJQUFELENBQUMsQUExRUQsSUEwRUM7SUExRVksd0VBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSURyb3BwYWJsZSB9IGZyb20gXCIuL2ludGVyZmFjZXMvZHJvcEludGVyZmFjZVwiO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgaGFuZGxlcyB0aGUgd2lkZ2V0cyB3aGljaCBzdXBwb3J0IGRyb3BwaW5nIG9mIGRhdGEgaW50byB0aGVtXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIFdpZGdldHNXaXRoRHJvcFN1cHBvcnRQcm92aWRlclxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFdpZGdldHNXaXRoRHJvcFN1cHBvcnRQcm92aWRlcntcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfd2lkZ2V0czogQXJyYXk8SURyb3BwYWJsZT4gPSBuZXcgQXJyYXk8SURyb3BwYWJsZT4oKTtcclxuICAgICAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhbGwgYXZhaWxhYmxlIHdpZGdldHMgd2l0aCBkcm9wIHN1cHBvcnRcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtBcnJheTxJRHJvcHBhYmxlPn1cclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRzV2l0aERyb3BTdXBwb3J0UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBhdmFpbGFibGVXaWRnZXRzKCk6IEFycmF5PElEcm9wcGFibGU+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd2lkZ2V0cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYXZhaWxhYmxlIHdpZGdldHMgd2l0aCBkcm9wIHN1cHBvcnQgZm9yIHRoZSBnaXZlbiBkcmFnRHJvcERhdGFJZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkcmFnRHJvcERhdGFJZFxyXG4gICAgICogQHJldHVybnMge0FycmF5PElEcm9wcGFibGU+fVxyXG4gICAgICogQG1lbWJlcm9mIERyb3BwYWJsZVdpZGdldHNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0V2lkZ2V0c1dpdGhEcmFnRHJvcERhdGFJZChkcmFnRHJvcERhdGFJZDogc3RyaW5nKTogQXJyYXk8SURyb3BwYWJsZT4ge1xyXG4gICAgICAgIGxldCBmaWx0ZXJlZFdpZGdldCA9IHRoaXMuX3dpZGdldHMuZmlsdGVyKGRyb3BwYWJsZVdpZGdldCA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IGRyb3BwYWJsZVdpZGdldC5zdXBwb3J0ZWREcmFnRHJvcERhdGFJZHMuaW5kZXhPZihkcmFnRHJvcERhdGFJZCk7XHJcbiAgICAgICAgICAgIGlmKGluZGV4ICE9IC0xKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZmlsdGVyZWRXaWRnZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IFdpZGdldHNXaXRoRHJvcFN1cHBvcnRQcm92aWRlcjtcclxuICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgb25lIGFuZCBvbmx5IHNpbmdsZXRvbiBpbnN0YW5jZSBvZiB0aGUgV2lkZ2V0c1dpdGhEcm9wU3VwcG9ydFByb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRzV2l0aERyb3BTdXBwb3J0UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldEluc3RhbmNlKCkge1xyXG4gICAgICAgIGlmICghV2lkZ2V0c1dpdGhEcm9wU3VwcG9ydFByb3ZpZGVyLmluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIFdpZGdldHNXaXRoRHJvcFN1cHBvcnRQcm92aWRlci5pbnN0YW5jZSA9IG5ldyBXaWRnZXRzV2l0aERyb3BTdXBwb3J0UHJvdmlkZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFdpZGdldHNXaXRoRHJvcFN1cHBvcnRQcm92aWRlci5pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSB3aWRnZXQgd2l0aCBkcm9wIHN1cHBvcnQgdG8gdGhlIHByb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJRHJvcHBhYmxlfSB3aWRnZXRcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRzV2l0aERyb3BTdXBwb3J0UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgYWRkV2lkZ2V0KHdpZGdldDogSURyb3BwYWJsZSl7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5fd2lkZ2V0cy5pbmRleE9mKHdpZGdldCk7XHJcbiAgICAgICAgaWYoaW5kZXggPT0gLTEpe1xyXG4gICAgICAgICAgICB0aGlzLl93aWRnZXRzLnB1c2god2lkZ2V0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGEgd2lkZ2V0IHdpdGggZHJvcCBzdXBwb3J0IGZyb20gdGhlIHByb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJRHJvcHBhYmxlfSB3aWRnZXRcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRzV2l0aERyb3BTdXBwb3J0UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlV2lkZ2V0KHdpZGdldDogSURyb3BwYWJsZSl7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5fd2lkZ2V0cy5pbmRleE9mKHdpZGdldCk7XHJcbiAgICAgICAgaWYoaW5kZXggIT0gLTEpe1xyXG4gICAgICAgICAgICB0aGlzLl93aWRnZXRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19