define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TabWidgetFlexDropDownDataModel = /** @class */ (function () {
        function TabWidgetFlexDropDownDataModel() {
            this._dropDownContainerID = "";
            this._data = [];
        }
        /**
         * Initialize the dataModel for TabWidgetFlexDropDown
         * Needs to be called befor the creation of ejDropDownList
         *
         * @param {string} dropDownContainerID
         * @param {*} [dataModel=[]]    // Sets dataModel
         * @memberof TabWidgetFlexDropDownDataModel
         */
        TabWidgetFlexDropDownDataModel.prototype.initialize = function (dropDownContainerID, dataModel) {
            if (dataModel === void 0) { dataModel = []; }
            this._dropDownContainerID = dropDownContainerID;
            this._data = dataModel;
        };
        Object.defineProperty(TabWidgetFlexDropDownDataModel.prototype, "data", {
            /**
             * Get the current data of the dropdown list
             *
             * @return {*}  {Array<TabWidgetFlexDropDownItem>}
             * @memberof TabWidgetFlexDropDownDataModel
             */
            get: function () {
                return this._data;
            },
            set: function (data) {
                this._data = data;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Adds a item to dataModel at the given Index
         * When no index is passed the item is added on last position
         *
         * @param {TabWidgetFlexDropDownItem} item
         * @param {number} [index=this._dataModel.length]
         * @memberof TabWidgetFlexDropDownDataModel
         */
        TabWidgetFlexDropDownDataModel.prototype.addItemAtIndex = function (item, index) {
            if (index === void 0) { index = this._data.length; }
            this._data.splice(index, 0, item);
        };
        /**
         * Removes item from dataModel at the given Index and returns the actual dataModel
         *
         * @param {*} item
         * @param {number} index
         * @return {*}  {any[]}
         * @memberof TabWidgetFlexDropDownDataModel
        */
        TabWidgetFlexDropDownDataModel.prototype.removeItemByText = function (tabId) {
            var index = this._data.findIndex(function (item) { return item.id === tabId; });
            // When the item is found the item gets removed from dataModel
            if (index !== -1) {
                this._data.splice(index, 1);
            }
        };
        /**
         * When there is no item in list this function returns true, false otherwise
         *
         * @return {*}  {boolean}
         * @memberof TabWidgetFlexDropDownDataModel
         */
        TabWidgetFlexDropDownDataModel.prototype.isEmpty = function () {
            if (this._data.length === 0) {
                return true;
            }
            return false;
        };
        /**
         * Replaces matching string from imagepaths by the addedStr for each item of the dropdownlist
         *
         * @private
         * @param {string} replacedStr
         * @param {string} addedStr
         * @memberof TabWidgetFlexDropDownRefactored
        */
        TabWidgetFlexDropDownDataModel.prototype.replaceImagePath = function (replacedStr, addedStr) {
            this.data.forEach(function (item) {
                if (item.imagePath !== undefined) {
                    item.imagePath = item.imagePath.replace(replacedStr, addedStr);
                }
            });
        };
        /**
         * Replaces matching string from imagepath by the addedStr at the passed id
         *
         * @private
         * @param {string} replacedStr
         * @param {string} addedStr
         * @memberof TabWidgetFlexDropDownRefactored
        */
        TabWidgetFlexDropDownDataModel.prototype.replaceImagePathByID = function (replacedStr, addedStr, id) {
            this.data.forEach(function (item) {
                if (item.imagePath !== undefined && item.id === id) {
                    item.imagePath = item.imagePath.replace(replacedStr, addedStr);
                }
            });
        };
        return TabWidgetFlexDropDownDataModel;
    }());
    exports.TabWidgetFlexDropDownDataModel = TabWidgetFlexDropDownDataModel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiV2lkZ2V0RmxleERyb3BEb3duRGF0YU1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RhYldpZGdldC9tb2RlbC90YWJXaWRnZXRGbGV4RHJvcERvd25EYXRhTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBRUE7UUFBQTtZQUVZLHlCQUFvQixHQUFXLEVBQUUsQ0FBQztZQUNsQyxVQUFLLEdBQXFDLEVBQUUsQ0FBQztRQXVHekQsQ0FBQztRQXJHRzs7Ozs7OztXQU9HO1FBQ0ksbURBQVUsR0FBakIsVUFBa0IsbUJBQTJCLEVBQUUsU0FBZ0Q7WUFBaEQsMEJBQUEsRUFBQSxjQUFnRDtZQUMzRixJQUFJLENBQUMsb0JBQW9CLEdBQUcsbUJBQW1CLENBQUM7WUFDaEQsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDM0IsQ0FBQztRQVFELHNCQUFJLGdEQUFJO1lBTlI7Ozs7O2VBS0c7aUJBQ0g7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3RCLENBQUM7aUJBRUQsVUFBUyxJQUFzQztnQkFDM0MsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDdEIsQ0FBQzs7O1dBSkE7UUFNRDs7Ozs7OztXQU9HO1FBQ0ksdURBQWMsR0FBckIsVUFBc0IsSUFBK0IsRUFBRSxLQUFpQztZQUFqQyxzQkFBQSxFQUFBLFFBQWdCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTtZQUNwRixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFFRDs7Ozs7OztVQU9FO1FBQ0sseURBQWdCLEdBQXZCLFVBQXdCLEtBQWE7WUFFakMsSUFBSSxLQUFLLEdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsVUFBQyxJQUFJLElBQUssT0FBQSxJQUFJLENBQUMsRUFBRSxLQUFLLEtBQUssRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO1lBRXRFLDhEQUE4RDtZQUM5RCxJQUFHLEtBQUssS0FBSyxDQUFFLENBQUMsRUFBRTtnQkFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDL0I7UUFDTCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSSxnREFBTyxHQUFkO1lBQ0ksSUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ3hCLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBRUQ7Ozs7Ozs7VUFPRTtRQUNLLHlEQUFnQixHQUF2QixVQUF3QixXQUFtQixFQUFFLFFBQWdCO1lBQ3pELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtnQkFDbEIsSUFBRyxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtvQkFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7aUJBQ2xFO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQ7Ozs7Ozs7VUFPRTtRQUNLLDZEQUFvQixHQUEzQixVQUE0QixXQUFtQixFQUFFLFFBQWdCLEVBQUUsRUFBVTtZQUN6RSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7Z0JBQ2xCLElBQUcsSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUU7b0JBQy9DLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2lCQUNsRTtZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUNMLHFDQUFDO0lBQUQsQ0FBQyxBQTFHRCxJQTBHQztJQTFHWSx3RUFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUYWJXaWRnZXRGbGV4RHJvcERvd25JdGVtIH0gZnJvbSBcIi4vdGFiV2lkZ2V0RmxleERyb3BEb3duSXRlbVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRhYldpZGdldEZsZXhEcm9wRG93bkRhdGFNb2RlbCB7XHJcbiAgIFxyXG4gICAgcHJpdmF0ZSBfZHJvcERvd25Db250YWluZXJJRDogc3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgX2RhdGE6IEFycmF5PFRhYldpZGdldEZsZXhEcm9wRG93bkl0ZW0+ID0gW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplIHRoZSBkYXRhTW9kZWwgZm9yIFRhYldpZGdldEZsZXhEcm9wRG93blxyXG4gICAgICogTmVlZHMgdG8gYmUgY2FsbGVkIGJlZm9yIHRoZSBjcmVhdGlvbiBvZiBlakRyb3BEb3duTGlzdFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkcm9wRG93bkNvbnRhaW5lcklEXHJcbiAgICAgKiBAcGFyYW0geyp9IFtkYXRhTW9kZWw9W11dICAgIC8vIFNldHMgZGF0YU1vZGVsXHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0RmxleERyb3BEb3duRGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpbml0aWFsaXplKGRyb3BEb3duQ29udGFpbmVySUQ6IHN0cmluZywgZGF0YU1vZGVsOiBBcnJheTxUYWJXaWRnZXRGbGV4RHJvcERvd25JdGVtPiA9IFtdKSB7XHJcbiAgICAgICAgdGhpcy5fZHJvcERvd25Db250YWluZXJJRCA9IGRyb3BEb3duQ29udGFpbmVySUQ7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGFNb2RlbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgY3VycmVudCBkYXRhIG9mIHRoZSBkcm9wZG93biBsaXN0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7Kn0gIHtBcnJheTxUYWJXaWRnZXRGbGV4RHJvcERvd25JdGVtPn1cclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRGbGV4RHJvcERvd25EYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgZ2V0IGRhdGEoKTogQXJyYXk8VGFiV2lkZ2V0RmxleERyb3BEb3duSXRlbT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBkYXRhKGRhdGE6IEFycmF5PFRhYldpZGdldEZsZXhEcm9wRG93bkl0ZW0+KSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgaXRlbSB0byBkYXRhTW9kZWwgYXQgdGhlIGdpdmVuIEluZGV4XHJcbiAgICAgKiBXaGVuIG5vIGluZGV4IGlzIHBhc3NlZCB0aGUgaXRlbSBpcyBhZGRlZCBvbiBsYXN0IHBvc2l0aW9uXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7VGFiV2lkZ2V0RmxleERyb3BEb3duSXRlbX0gaXRlbVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtpbmRleD10aGlzLl9kYXRhTW9kZWwubGVuZ3RoXVxyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldEZsZXhEcm9wRG93bkRhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkSXRlbUF0SW5kZXgoaXRlbTogVGFiV2lkZ2V0RmxleERyb3BEb3duSXRlbSwgaW5kZXg6IG51bWJlciA9IHRoaXMuX2RhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YS5zcGxpY2UoaW5kZXgsIDAsIGl0ZW0pOyAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGl0ZW0gZnJvbSBkYXRhTW9kZWwgYXQgdGhlIGdpdmVuIEluZGV4IGFuZCByZXR1cm5zIHRoZSBhY3R1YWwgZGF0YU1vZGVsXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBpdGVtXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcclxuICAgICAqIEByZXR1cm4geyp9ICB7YW55W119XHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0RmxleERyb3BEb3duRGF0YU1vZGVsXHJcbiAgICAqL1xyXG4gICAgcHVibGljIHJlbW92ZUl0ZW1CeVRleHQodGFiSWQ6IHN0cmluZykge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBpbmRleDogbnVtYmVyID0gdGhpcy5fZGF0YS5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IHRhYklkKTtcclxuXHJcbiAgICAgICAgLy8gV2hlbiB0aGUgaXRlbSBpcyBmb3VuZCB0aGUgaXRlbSBnZXRzIHJlbW92ZWQgZnJvbSBkYXRhTW9kZWxcclxuICAgICAgICBpZihpbmRleCAhPT0gLSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGEuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGVuIHRoZXJlIGlzIG5vIGl0ZW0gaW4gbGlzdCB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdHJ1ZSwgZmFsc2Ugb3RoZXJ3aXNlXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7Kn0gIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldEZsZXhEcm9wRG93bkRhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaXNFbXB0eSgpOiBib29sZWFuIHtcclxuICAgICAgICBpZih0aGlzLl9kYXRhLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVwbGFjZXMgbWF0Y2hpbmcgc3RyaW5nIGZyb20gaW1hZ2VwYXRocyBieSB0aGUgYWRkZWRTdHIgZm9yIGVhY2ggaXRlbSBvZiB0aGUgZHJvcGRvd25saXN0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXBsYWNlZFN0clxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGFkZGVkU3RyXHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0RmxleERyb3BEb3duUmVmYWN0b3JlZFxyXG4gICAgKi9cclxuICAgIHB1YmxpYyByZXBsYWNlSW1hZ2VQYXRoKHJlcGxhY2VkU3RyOiBzdHJpbmcsIGFkZGVkU3RyOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmRhdGEuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgaWYoaXRlbS5pbWFnZVBhdGggIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5pbWFnZVBhdGggPSBpdGVtLmltYWdlUGF0aC5yZXBsYWNlKHJlcGxhY2VkU3RyLCBhZGRlZFN0cik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlcGxhY2VzIG1hdGNoaW5nIHN0cmluZyBmcm9tIGltYWdlcGF0aCBieSB0aGUgYWRkZWRTdHIgYXQgdGhlIHBhc3NlZCBpZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVwbGFjZWRTdHJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhZGRlZFN0clxyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldEZsZXhEcm9wRG93blJlZmFjdG9yZWRcclxuICAgICovXHJcbiAgICBwdWJsaWMgcmVwbGFjZUltYWdlUGF0aEJ5SUQocmVwbGFjZWRTdHI6IHN0cmluZywgYWRkZWRTdHI6IHN0cmluZywgaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuZGF0YS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICBpZihpdGVtLmltYWdlUGF0aCAhPT0gdW5kZWZpbmVkICYmIGl0ZW0uaWQgPT09IGlkKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmltYWdlUGF0aCA9IGl0ZW0uaW1hZ2VQYXRoLnJlcGxhY2UocmVwbGFjZWRTdHIsIGFkZGVkU3RyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59Il19