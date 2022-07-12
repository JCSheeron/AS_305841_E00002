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
define(["require", "exports", "../../../framework/events", "../layout/tabWidgetDropDownHTMLProvider", "../model/tabWidgetFlexDropDownDataModel", "../model/tabWidgetFlexDropDownFooter", "../model/tabWidgetFlexDropDownItem", "../style/dropDownCssClassNameProvider", "../tabWidgetDOMManipulator", "./tabWidgetFlexDropDownSFHelper"], function (require, exports, events_1, tabWidgetDropDownHTMLProvider_1, tabWidgetFlexDropDownDataModel_1, tabWidgetFlexDropDownFooter_1, tabWidgetFlexDropDownItem_1, dropDownCssClassNameProvider_1, tabWidgetDOMManipulator_1, tabWidgetFlexDropDownSFHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventTabSelectedFromDropdown = /** @class */ (function (_super) {
        __extends(EventTabSelectedFromDropdown, _super);
        function EventTabSelectedFromDropdown() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventTabSelectedFromDropdown;
    }(events_1.TypedEvent));
    ;
    var EventTabBarCloseTab = /** @class */ (function (_super) {
        __extends(EventTabBarCloseTab, _super);
        function EventTabBarCloseTab() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventTabBarCloseTab;
    }(events_1.TypedEvent));
    ;
    var EventTabBarCloseAllTabs = /** @class */ (function (_super) {
        __extends(EventTabBarCloseAllTabs, _super);
        function EventTabBarCloseAllTabs() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventTabBarCloseAllTabs;
    }(events_1.TypedEvent));
    ;
    var EventTabBarCloseAllTabsButActive = /** @class */ (function (_super) {
        __extends(EventTabBarCloseAllTabsButActive, _super);
        function EventTabBarCloseAllTabsButActive() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventTabBarCloseAllTabsButActive;
    }(events_1.TypedEvent));
    ;
    var TabWidgetFlexDropDown = /** @class */ (function () {
        function TabWidgetFlexDropDown() {
            this.eventTabSelectedFromDropdown = new EventTabSelectedFromDropdown();
            this.eventTabBarCloseTab = new EventTabBarCloseTab();
            this.eventTabBarCloseAllTabs = new EventTabBarCloseAllTabs();
            this.eventTabBarCloseAllTabsButActive = new EventTabBarCloseAllTabsButActive();
            this._dropDownData = new tabWidgetFlexDropDownDataModel_1.TabWidgetFlexDropDownDataModel();
            this._layoutContainerId = "";
            this._dropDownContainerId = "";
            this._dropDownWrapperId = "";
            this._dropDownItemDeleteButtonId = "";
            this._dropDownFooterCloseAllId = "";
            this._dropDownFooterCloseAllOtherId = "";
        }
        /**
         * Creates the DropDownList for the given tab
         *
         * @param {string} layoutContainerId
         * @param {string} flexibleTabContainerId
         * @memberof TabWidgetFlexDropDown
         */
        TabWidgetFlexDropDown.prototype.initializeFlexTabDropdown = function (layoutContainerId, rightTabContainerId) {
            var _this = this;
            this.setIDs(layoutContainerId);
            this._dropDownData.initialize(this._dropDownContainerId);
            this.appendDropDownLayout(this._dropDownContainerId, rightTabContainerId);
            $("#" + this._dropDownContainerId).ejDropDownList({
                minPopupWidth: "280px",
                popupHeight: "250px",
                cssClass: dropDownCssClassNameProvider_1.DropDownCssClassNameProvider.dropDownListStyle,
                // The placeholder of the template is filled either from item or footer. (Info: JS2 has a footer template)
                template: "${dropDownTemplate}",
                htmlAttributes: {
                    class: dropDownCssClassNameProvider_1.DropDownCssClassNameProvider.dropDownWrapper,
                },
                select: function (args) { return _this.onDropdownSelected(args); },
                beforePopupShown: function (args) { return _this.updateDropDownOutput(); }
            });
            this.updateDropDownOutput();
            this.setDropdownVisibility();
        };
        /**
         * Adds new items at the first position
         *
         * @param {string} tabName
         * @param {string} tabId
         * @param {string} layoutContainerId
         * @param {string} [iconPath=""]
         * @memberof TabWidgetFlexDropDown
         */
        TabWidgetFlexDropDown.prototype.addItemToDropdown = function (tabName, tabId, layoutContainerId, iconPath) {
            if (iconPath === void 0) { iconPath = ""; }
            var item = new tabWidgetFlexDropDownItem_1.TabWidgetFlexDropDownItem(tabId, tabName, iconPath, this._dropDownItemDeleteButtonId);
            // Adds Item to first position (if position get passed the correct order can be set)
            this._dropDownData.addItemAtIndex(item, 0);
            this.setDropdownVisibility();
        };
        /**
         * Removes the item from dropdownlist by id
         *
         * @param {*} id
         * @param {*} mouseWheelClicked
         * @memberof TabWidgetFlexDropDown
         */
        TabWidgetFlexDropDown.prototype.removeItemFromDropdown = function (id, mouseWheelClicked) {
            this._dropDownData.removeItemByText(id);
            // This function call is needed cause the popup should stay opened when a single item is removed. If the popup should close after deleting an item, this function needs to be removed.
            this.updateDropDownOutput();
            this.setDropdownVisibility();
        };
        /**
         * At first changes all imagePaths to standard path.
         * Then sets the imagePath of the selected tab to "..._orange.svg"
         *
         * @param {string} tabId
         * @memberof TabWidgetFlexDropDown
         */
        TabWidgetFlexDropDown.prototype.setTabSelected = function (tabId) {
            // Reset current selected tab 
            this._dropDownData.replaceImagePath("_orange.svg", ".svg");
            // Select new tab
            this._dropDownData.replaceImagePathByID(".svg", "_orange.svg", tabId);
        };
        /**
         * When a tab is selected, the standard syncfusion selection is canceld and an event for setting the selected tab gets triggered
         *
         * @private
         * @param {ej.DropDownList.SelectEventArgs} args
         * @memberof TabWidgetFlexDropDown
         */
        TabWidgetFlexDropDown.prototype.onDropdownSelected = function (args) {
            // disable standard way of selection from syncfusion 
            args.cancel = true;
            // only list items should trigger an selection event
            if (args.itemId !== undefined) {
                var tabId = args.model.dataSource[args.itemId].id;
                // skip footer selection
                if (tabId !== undefined) {
                    // TODO: Refactore tabWidget selectTab() that the string does not need to be modified
                    tabId = tabId.replace("tab_", "");
                    this.eventTabSelectedFromDropdown.raise(this, { tabName: tabId });
                }
            }
        };
        /**
         * Set all IDs needed for accessing data and styling for the dropdownlist
         *
         * @private
         * @param {string} layoutContainerId
         * @memberof TabWidgetFlexDropDown
         */
        TabWidgetFlexDropDown.prototype.setIDs = function (layoutContainerId) {
            this._layoutContainerId = layoutContainerId;
            this._dropDownContainerId = layoutContainerId + "_dropdown";
            this._dropDownWrapperId = layoutContainerId + "_dropdown_wrapper";
            this._dropDownItemDeleteButtonId = layoutContainerId + "_dropDownItemDeleteButton_";
            this._dropDownFooterCloseAllId = layoutContainerId + "_dropDownFooterCloseAll";
            this._dropDownFooterCloseAllOtherId = layoutContainerId + "_dropDownFooterCloseAllOther";
        };
        /**
         * Append the dropdownlist on the right top of the tabwidget view
         *
         * @private
         * @param {string} dropDownContainerId
         * @param {string} rightTabContainerId
         * @memberof TabWidgetFlexDropDown
         */
        TabWidgetFlexDropDown.prototype.appendDropDownLayout = function (dropDownContainerId, rightTabContainerId) {
            var html = tabWidgetDropDownHTMLProvider_1.TabWidgetDropDownHTMLProvider.getDropDownPopupLayout(dropDownContainerId);
            tabWidgetDOMManipulator_1.TabWidgetDOMManipulator.appendHTMLTagAtID(rightTabContainerId, html);
        };
        /**
         * This function sets the actual datasource to the dropdownlist and sets the buttons and events needed for removing items
         *
         * @private
         * @memberof TabWidgetFlexDropDown
         */
        TabWidgetFlexDropDown.prototype.updateDropDownOutput = function () {
            var data = this.getData();
            tabWidgetFlexDropDownSFHelper_1.TabWidgetFlexDropDownSFHelper.setDataSource(this._dropDownContainerId, data);
            this.setDropDownDeleteButtons();
            this.setDropDownFooterButtons();
        };
        /**
         * Sets correct visibility of the wrapper and popup of the dropdownlist
         *
         * @private
         * @memberof TabWidgetFlexDropDown
         */
        TabWidgetFlexDropDown.prototype.setDropdownVisibility = function () {
            if (this._dropDownData.isEmpty() === true) {
                tabWidgetFlexDropDownSFHelper_1.TabWidgetFlexDropDownSFHelper.hidePopupList(this._dropDownContainerId);
                tabWidgetDOMManipulator_1.TabWidgetDOMManipulator.addClassAtID(this._dropDownWrapperId, dropDownCssClassNameProvider_1.DropDownCssClassNameProvider.hideDropDownWrapper);
            }
            else {
                tabWidgetDOMManipulator_1.TabWidgetDOMManipulator.removeClassAtID(this._dropDownWrapperId, dropDownCssClassNameProvider_1.DropDownCssClassNameProvider.hideDropDownWrapper);
            }
        };
        /**
         * Creates for each item of the dropdownlist a delete button
         *
         * @private
         * @memberof TabWidgetFlexDropDown
         */
        TabWidgetFlexDropDown.prototype.setDropDownDeleteButtons = function () {
            var _this = this;
            this._dropDownData.data.forEach(function (item) {
                // only for list items a button should be created
                if (item.id !== undefined) {
                    $("#" + _this._dropDownItemDeleteButtonId + item.id).ejButton({
                        contentType: ej.ContentType.ImageOnly,
                        cssClass: dropDownCssClassNameProvider_1.DropDownCssClassNameProvider.listItemDeleteButton,
                        click: function () { return _this.onDeleteItemButtonClicked(item.id); }
                    });
                }
            });
        };
        /**
         * Triggers an event that close the tab where the delete button was pressed
         *
         * @private
         * @param {string} tabName
         * @memberof TabWidgetFlexDropDown
         */
        TabWidgetFlexDropDown.prototype.onDeleteItemButtonClicked = function (tabName) {
            this.eventTabBarCloseTab.raise(this, { tabName: tabName });
        };
        /**
         * Creates syncfusion buttons "Close all" and "Close all other" for the footer of the dropdownlist
         *
         * @private
         * @memberof TabWidgetFlexDropDown
         */
        TabWidgetFlexDropDown.prototype.setDropDownFooterButtons = function () {
            var _this = this;
            $("#" + this._dropDownFooterCloseAllId).ejButton({
                text: "Close all",
                contentType: ej.ContentType.TextOnly,
                cssClass: dropDownCssClassNameProvider_1.DropDownCssClassNameProvider.dropDownFooterCloseAll,
                click: function (args) { return _this.onCloseAllTabs(args); }
            });
            $("#" + this._dropDownFooterCloseAllOtherId).ejButton({
                text: "Close all other",
                contentType: ej.ContentType.TextOnly,
                cssClass: dropDownCssClassNameProvider_1.DropDownCssClassNameProvider.dropDownFooterCloseAllOther,
                click: function (args) { return _this.onCloseAllTabsButActive(args); }
            });
        };
        /**
         * Triggers an event that closes all tabs
         *
         * @private
         * @param {*} event
         * @memberof TabWidgetFlexDropDown
         */
        TabWidgetFlexDropDown.prototype.onCloseAllTabs = function (event) {
            this.eventTabBarCloseAllTabs.raise(this, event);
        };
        /**
         * Triggers an event that closes all tabs but the active one
         *
         * @private
         * @param {*} event
         * @memberof TabWidgetFlexDropDown
         */
        TabWidgetFlexDropDown.prototype.onCloseAllTabsButActive = function (event) {
            this.eventTabBarCloseAllTabsButActive.raise(this, event);
        };
        /**
         * Gets the actual data for the dropdownlist
         *
         * @private
         * @return {*}  {(Array<TabWidgetFlexDropDownItem|TabWidgetFlexDropDownFooter>)}
         * @memberof TabWidgetFlexDropDown
         */
        TabWidgetFlexDropDown.prototype.getData = function () {
            // Get a deep copy of the dropdownitem array
            var data = this._dropDownData.data.slice();
            // add footer in the last position of the array that it gets displayed at the bottom
            data.push(new tabWidgetFlexDropDownFooter_1.TabWidgetFlexDropDownFooter(this._dropDownFooterCloseAllId, this._dropDownFooterCloseAllOtherId));
            return data;
        };
        return TabWidgetFlexDropDown;
    }());
    exports.TabWidgetFlexDropDown = TabWidgetFlexDropDown;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiV2lkZ2V0RmxleERyb3BEb3duLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RhYldpZGdldC92aWV3L3RhYldpZGdldEZsZXhEcm9wRG93bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBVUE7UUFBMkMsZ0RBQXlDO1FBQXBGOztRQUFxRixDQUFDO1FBQUQsbUNBQUM7SUFBRCxDQUFDLEFBQXRGLENBQTJDLG1CQUFVLEdBQWlDO0lBQUEsQ0FBQztJQUN2RjtRQUFrQyx1Q0FBeUM7UUFBM0U7O1FBQTRFLENBQUM7UUFBRCwwQkFBQztJQUFELENBQUMsQUFBN0UsQ0FBa0MsbUJBQVUsR0FBaUM7SUFBQSxDQUFDO0lBQzlFO1FBQXNDLDJDQUF5QztRQUEvRTs7UUFBZ0YsQ0FBQztRQUFELDhCQUFDO0lBQUQsQ0FBQyxBQUFqRixDQUFzQyxtQkFBVSxHQUFpQztJQUFBLENBQUM7SUFDbEY7UUFBK0Msb0RBQXlDO1FBQXhGOztRQUF5RixDQUFDO1FBQUQsdUNBQUM7SUFBRCxDQUFDLEFBQTFGLENBQStDLG1CQUFVLEdBQWlDO0lBQUEsQ0FBQztJQUUzRjtRQUFBO1lBRVcsaUNBQTRCLEdBQUcsSUFBSSw0QkFBNEIsRUFBRSxDQUFDO1lBQ2xFLHdCQUFtQixHQUFHLElBQUksbUJBQW1CLEVBQUUsQ0FBQztZQUNoRCw0QkFBdUIsR0FBRyxJQUFJLHVCQUF1QixFQUFFLENBQUM7WUFDeEQscUNBQWdDLEdBQUcsSUFBSSxnQ0FBZ0MsRUFBRSxDQUFDO1lBRXpFLGtCQUFhLEdBQW1DLElBQUksK0RBQThCLEVBQUUsQ0FBQztZQUVyRix1QkFBa0IsR0FBVyxFQUFFLENBQUM7WUFDaEMseUJBQW9CLEdBQVcsRUFBRSxDQUFDO1lBQ2xDLHVCQUFrQixHQUFXLEVBQUUsQ0FBQztZQUNoQyxnQ0FBMkIsR0FBVyxFQUFFLENBQUM7WUFDekMsOEJBQXlCLEdBQVcsRUFB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NUMsSUFBSSxJQUFJLEdBQWtFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRTFHLG9GQUFvRjtZQUNwRixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUkseURBQTJCLENBQUMsSUFBSSxDQUFDLHlCQUF5QixFQUFFLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLENBQUM7WUFFaEgsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNMLDRCQUFDO0lBQUQsQ0FBQyxBQXRSRCxJQXNSQztJQXRSWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9ldmVudHNcIjtcclxuaW1wb3J0IHsgSVRhYldpZGdldEZsZXhEcm9wRG93biB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3RhYldpZGdldEZsZXhEcm9wRG93bkludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUYWJXaWRnZXREcm9wRG93bkhUTUxQcm92aWRlciB9IGZyb20gXCIuLi9sYXlvdXQvdGFiV2lkZ2V0RHJvcERvd25IVE1MUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgVGFiV2lkZ2V0RmxleERyb3BEb3duRGF0YU1vZGVsIH0gZnJvbSBcIi4uL21vZGVsL3RhYldpZGdldEZsZXhEcm9wRG93bkRhdGFNb2RlbFwiO1xyXG5pbXBvcnQgeyBUYWJXaWRnZXRGbGV4RHJvcERvd25Gb290ZXIgfSBmcm9tIFwiLi4vbW9kZWwvdGFiV2lkZ2V0RmxleERyb3BEb3duRm9vdGVyXCI7XHJcbmltcG9ydCB7IFRhYldpZGdldEZsZXhEcm9wRG93bkl0ZW0gfSBmcm9tIFwiLi4vbW9kZWwvdGFiV2lkZ2V0RmxleERyb3BEb3duSXRlbVwiO1xyXG5pbXBvcnQgeyBEcm9wRG93bkNzc0NsYXNzTmFtZVByb3ZpZGVyIH0gZnJvbSBcIi4uL3N0eWxlL2Ryb3BEb3duQ3NzQ2xhc3NOYW1lUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgVGFiV2lkZ2V0RE9NTWFuaXB1bGF0b3IgfSBmcm9tIFwiLi4vdGFiV2lkZ2V0RE9NTWFuaXB1bGF0b3JcIjtcclxuaW1wb3J0IHsgVGFiV2lkZ2V0RmxleERyb3BEb3duU0ZIZWxwZXIgfSBmcm9tIFwiLi90YWJXaWRnZXRGbGV4RHJvcERvd25TRkhlbHBlclwiO1xyXG5cclxuY2xhc3MgRXZlbnRUYWJTZWxlY3RlZEZyb21Ecm9wZG93biBleHRlbmRzIFR5cGVkRXZlbnQ8VGFiV2lkZ2V0RmxleERyb3BEb3duLCBvYmplY3Q+e307XHJcbmNsYXNzIEV2ZW50VGFiQmFyQ2xvc2VUYWIgZXh0ZW5kcyBUeXBlZEV2ZW50PFRhYldpZGdldEZsZXhEcm9wRG93biwgb2JqZWN0Pnt9O1xyXG5jbGFzcyBFdmVudFRhYkJhckNsb3NlQWxsVGFicyBleHRlbmRzIFR5cGVkRXZlbnQ8VGFiV2lkZ2V0RmxleERyb3BEb3duLCBvYmplY3Q+e307XHJcbmNsYXNzIEV2ZW50VGFiQmFyQ2xvc2VBbGxUYWJzQnV0QWN0aXZlIGV4dGVuZHMgVHlwZWRFdmVudDxUYWJXaWRnZXRGbGV4RHJvcERvd24sIG9iamVjdD57fTtcclxuXHJcbmV4cG9ydCBjbGFzcyBUYWJXaWRnZXRGbGV4RHJvcERvd24gaW1wbGVtZW50cyBJVGFiV2lkZ2V0RmxleERyb3BEb3duIHtcclxuXHJcbiAgICBwdWJsaWMgZXZlbnRUYWJTZWxlY3RlZEZyb21Ecm9wZG93biA9IG5ldyBFdmVudFRhYlNlbGVjdGVkRnJvbURyb3Bkb3duKCk7XHJcbiAgICBwdWJsaWMgZXZlbnRUYWJCYXJDbG9zZVRhYiA9IG5ldyBFdmVudFRhYkJhckNsb3NlVGFiKCk7XHJcbiAgICBwdWJsaWMgZXZlbnRUYWJCYXJDbG9zZUFsbFRhYnMgPSBuZXcgRXZlbnRUYWJCYXJDbG9zZUFsbFRhYnMoKTtcclxuICAgIHB1YmxpYyBldmVudFRhYkJhckNsb3NlQWxsVGFic0J1dEFjdGl2ZSA9IG5ldyBFdmVudFRhYkJhckNsb3NlQWxsVGFic0J1dEFjdGl2ZSgpO1xyXG4gICAgXHJcbiAgICBwcml2YXRlIF9kcm9wRG93bkRhdGE6IFRhYldpZGdldEZsZXhEcm9wRG93bkRhdGFNb2RlbCA9IG5ldyBUYWJXaWRnZXRGbGV4RHJvcERvd25EYXRhTW9kZWwoKTtcclxuXHJcbiAgICBwcml2YXRlIF9sYXlvdXRDb250YWluZXJJZDogc3RyaW5nID0gXCJcIjsgXHJcbiAgICBwcml2YXRlIF9kcm9wRG93bkNvbnRhaW5lcklkOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJpdmF0ZSBfZHJvcERvd25XcmFwcGVySWQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwcml2YXRlIF9kcm9wRG93bkl0ZW1EZWxldGVCdXR0b25JZDogc3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgX2Ryb3BEb3duRm9vdGVyQ2xvc2VBbGxJZDogc3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgX2Ryb3BEb3duRm9vdGVyQ2xvc2VBbGxPdGhlcklkOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgRHJvcERvd25MaXN0IGZvciB0aGUgZ2l2ZW4gdGFiXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxheW91dENvbnRhaW5lcklkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmxleGlibGVUYWJDb250YWluZXJJZFxyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldEZsZXhEcm9wRG93blxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaW5pdGlhbGl6ZUZsZXhUYWJEcm9wZG93bihsYXlvdXRDb250YWluZXJJZDogc3RyaW5nLCByaWdodFRhYkNvbnRhaW5lcklkOiBzdHJpbmcpe1xyXG5cclxuICAgICAgICB0aGlzLnNldElEcyhsYXlvdXRDb250YWluZXJJZCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2Ryb3BEb3duRGF0YS5pbml0aWFsaXplKHRoaXMuX2Ryb3BEb3duQ29udGFpbmVySWQpO1xyXG5cclxuICAgICAgICB0aGlzLmFwcGVuZERyb3BEb3duTGF5b3V0KHRoaXMuX2Ryb3BEb3duQ29udGFpbmVySWQsIHJpZ2h0VGFiQ29udGFpbmVySWQpO1xyXG5cclxuICAgICAgICAkKFwiI1wiK3RoaXMuX2Ryb3BEb3duQ29udGFpbmVySWQpLmVqRHJvcERvd25MaXN0KHtcclxuICAgICAgICAgICAgbWluUG9wdXBXaWR0aDogXCIyODBweFwiLCBcclxuICAgICAgICAgICAgcG9wdXBIZWlnaHQ6IFwiMjUwcHhcIixcclxuICAgICAgICAgICAgY3NzQ2xhc3M6IERyb3BEb3duQ3NzQ2xhc3NOYW1lUHJvdmlkZXIuZHJvcERvd25MaXN0U3R5bGUsXHJcbiAgICAgICAgICAgIC8vIFRoZSBwbGFjZWhvbGRlciBvZiB0aGUgdGVtcGxhdGUgaXMgZmlsbGVkIGVpdGhlciBmcm9tIGl0ZW0gb3IgZm9vdGVyLiAoSW5mbzogSlMyIGhhcyBhIGZvb3RlciB0ZW1wbGF0ZSlcclxuICAgICAgICAgICAgdGVtcGxhdGU6IFwiJHtkcm9wRG93blRlbXBsYXRlfVwiLFxyXG4gICAgICAgICAgICBodG1sQXR0cmlidXRlczoge1xyXG4gICAgICAgICAgICAgICAgY2xhc3M6IERyb3BEb3duQ3NzQ2xhc3NOYW1lUHJvdmlkZXIuZHJvcERvd25XcmFwcGVyLFxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgc2VsZWN0OiAoYXJncykgPT4gdGhpcy5vbkRyb3Bkb3duU2VsZWN0ZWQoYXJncyksXHJcbiAgICAgICAgICAgIGJlZm9yZVBvcHVwU2hvd246IChhcmdzKSA9PiB0aGlzLnVwZGF0ZURyb3BEb3duT3V0cHV0KClcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVEcm9wRG93bk91dHB1dCgpO1xyXG5cclxuICAgICAgICB0aGlzLnNldERyb3Bkb3duVmlzaWJpbGl0eSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBuZXcgaXRlbXMgYXQgdGhlIGZpcnN0IHBvc2l0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRhYk5hbWVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0YWJJZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxheW91dENvbnRhaW5lcklkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2ljb25QYXRoPVwiXCJdXHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0RmxleERyb3BEb3duXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRJdGVtVG9Ecm9wZG93bih0YWJOYW1lOiBzdHJpbmcsIHRhYklkOiBzdHJpbmcsIGxheW91dENvbnRhaW5lcklkOiBzdHJpbmcsIGljb25QYXRoOiBzdHJpbmcgPSBcIlwiKXtcclxuXHJcbiAgICAgICAgbGV0IGl0ZW06IFRhYldpZGdldEZsZXhEcm9wRG93bkl0ZW0gPSBuZXcgVGFiV2lkZ2V0RmxleERyb3BEb3duSXRlbSh0YWJJZCwgdGFiTmFtZSwgaWNvblBhdGgsIHRoaXMuX2Ryb3BEb3duSXRlbURlbGV0ZUJ1dHRvbklkKTtcclxuXHJcbiAgICAgICAgLy8gQWRkcyBJdGVtIHRvIGZpcnN0IHBvc2l0aW9uIChpZiBwb3NpdGlvbiBnZXQgcGFzc2VkIHRoZSBjb3JyZWN0IG9yZGVyIGNhbiBiZSBzZXQpXHJcbiAgICAgICAgdGhpcy5fZHJvcERvd25EYXRhLmFkZEl0ZW1BdEluZGV4KGl0ZW0sIDApO1xyXG5cclxuICAgICAgICB0aGlzLnNldERyb3Bkb3duVmlzaWJpbGl0eSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyB0aGUgaXRlbSBmcm9tIGRyb3Bkb3dubGlzdCBieSBpZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gaWRcclxuICAgICAqIEBwYXJhbSB7Kn0gbW91c2VXaGVlbENsaWNrZWRcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRGbGV4RHJvcERvd25cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlbW92ZUl0ZW1Gcm9tRHJvcGRvd24oaWQ6IHN0cmluZywgbW91c2VXaGVlbENsaWNrZWQ6IGJvb2xlYW4pe1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX2Ryb3BEb3duRGF0YS5yZW1vdmVJdGVtQnlUZXh0KGlkKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBUaGlzIGZ1bmN0aW9uIGNhbGwgaXMgbmVlZGVkIGNhdXNlIHRoZSBwb3B1cCBzaG91bGQgc3RheSBvcGVuZWQgd2hlbiBhIHNpbmdsZSBpdGVtIGlzIHJlbW92ZWQuIElmIHRoZSBwb3B1cCBzaG91bGQgY2xvc2UgYWZ0ZXIgZGVsZXRpbmcgYW4gaXRlbSwgdGhpcyBmdW5jdGlvbiBuZWVkcyB0byBiZSByZW1vdmVkLlxyXG4gICAgICAgIHRoaXMudXBkYXRlRHJvcERvd25PdXRwdXQoKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnNldERyb3Bkb3duVmlzaWJpbGl0eSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXQgZmlyc3QgY2hhbmdlcyBhbGwgaW1hZ2VQYXRocyB0byBzdGFuZGFyZCBwYXRoLlxyXG4gICAgICogVGhlbiBzZXRzIHRoZSBpbWFnZVBhdGggb2YgdGhlIHNlbGVjdGVkIHRhYiB0byBcIi4uLl9vcmFuZ2Uuc3ZnXCIgXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRhYklkXHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0RmxleERyb3BEb3duXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRUYWJTZWxlY3RlZCh0YWJJZDogc3RyaW5nKXtcclxuICAgICAgICAvLyBSZXNldCBjdXJyZW50IHNlbGVjdGVkIHRhYiBcclxuICAgICAgICB0aGlzLl9kcm9wRG93bkRhdGEucmVwbGFjZUltYWdlUGF0aChcIl9vcmFuZ2Uuc3ZnXCIsIFwiLnN2Z1wiKTtcclxuXHJcbiAgICAgICAgLy8gU2VsZWN0IG5ldyB0YWJcclxuICAgICAgICB0aGlzLl9kcm9wRG93bkRhdGEucmVwbGFjZUltYWdlUGF0aEJ5SUQoXCIuc3ZnXCIsIFwiX29yYW5nZS5zdmdcIiwgdGFiSWQpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFdoZW4gYSB0YWIgaXMgc2VsZWN0ZWQsIHRoZSBzdGFuZGFyZCBzeW5jZnVzaW9uIHNlbGVjdGlvbiBpcyBjYW5jZWxkIGFuZCBhbiBldmVudCBmb3Igc2V0dGluZyB0aGUgc2VsZWN0ZWQgdGFiIGdldHMgdHJpZ2dlcmVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7ZWouRHJvcERvd25MaXN0LlNlbGVjdEV2ZW50QXJnc30gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldEZsZXhEcm9wRG93blxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uRHJvcGRvd25TZWxlY3RlZChhcmdzOiBlai5Ecm9wRG93bkxpc3QuU2VsZWN0RXZlbnRBcmdzKSB7XHJcbiAgICAgICAgLy8gZGlzYWJsZSBzdGFuZGFyZCB3YXkgb2Ygc2VsZWN0aW9uIGZyb20gc3luY2Z1c2lvbiBcclxuICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vIG9ubHkgbGlzdCBpdGVtcyBzaG91bGQgdHJpZ2dlciBhbiBzZWxlY3Rpb24gZXZlbnRcclxuICAgICAgICBpZihhcmdzLml0ZW1JZCAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IHRhYklkOiBzdHJpbmcgPSBhcmdzLm1vZGVsLmRhdGFTb3VyY2VbYXJncy5pdGVtSWRdLmlkO1xyXG4gICAgICAgICAgICAvLyBza2lwIGZvb3RlciBzZWxlY3Rpb25cclxuICAgICAgICAgICAgaWYodGFiSWQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogUmVmYWN0b3JlIHRhYldpZGdldCBzZWxlY3RUYWIoKSB0aGF0IHRoZSBzdHJpbmcgZG9lcyBub3QgbmVlZCB0byBiZSBtb2RpZmllZFxyXG4gICAgICAgICAgICAgICAgdGFiSWQgPSB0YWJJZC5yZXBsYWNlKFwidGFiX1wiLFwiXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRUYWJTZWxlY3RlZEZyb21Ecm9wZG93bi5yYWlzZSh0aGlzLHt0YWJOYW1lOiB0YWJJZH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IGFsbCBJRHMgbmVlZGVkIGZvciBhY2Nlc3NpbmcgZGF0YSBhbmQgc3R5bGluZyBmb3IgdGhlIGRyb3Bkb3dubGlzdFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGF5b3V0Q29udGFpbmVySWRcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRGbGV4RHJvcERvd25cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRJRHMobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2xheW91dENvbnRhaW5lcklkID0gbGF5b3V0Q29udGFpbmVySWQ7XHJcbiAgICAgICAgdGhpcy5fZHJvcERvd25Db250YWluZXJJZCA9IGxheW91dENvbnRhaW5lcklkICsgXCJfZHJvcGRvd25cIjtcclxuICAgICAgICB0aGlzLl9kcm9wRG93bldyYXBwZXJJZCA9IGxheW91dENvbnRhaW5lcklkICsgXCJfZHJvcGRvd25fd3JhcHBlclwiO1xyXG4gICAgICAgIHRoaXMuX2Ryb3BEb3duSXRlbURlbGV0ZUJ1dHRvbklkID0gbGF5b3V0Q29udGFpbmVySWQgKyBcIl9kcm9wRG93bkl0ZW1EZWxldGVCdXR0b25fXCI7XHJcbiAgICAgICAgdGhpcy5fZHJvcERvd25Gb290ZXJDbG9zZUFsbElkID0gbGF5b3V0Q29udGFpbmVySWQgKyBcIl9kcm9wRG93bkZvb3RlckNsb3NlQWxsXCI7XHJcbiAgICAgICAgdGhpcy5fZHJvcERvd25Gb290ZXJDbG9zZUFsbE90aGVySWQgPSBsYXlvdXRDb250YWluZXJJZCArIFwiX2Ryb3BEb3duRm9vdGVyQ2xvc2VBbGxPdGhlclwiO1xyXG4gICAgfSBcclxuIFxyXG4gICAgLyoqXHJcbiAgICAgKiBBcHBlbmQgdGhlIGRyb3Bkb3dubGlzdCBvbiB0aGUgcmlnaHQgdG9wIG9mIHRoZSB0YWJ3aWRnZXQgdmlld1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZHJvcERvd25Db250YWluZXJJZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJpZ2h0VGFiQ29udGFpbmVySWRcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRGbGV4RHJvcERvd25cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhcHBlbmREcm9wRG93bkxheW91dChkcm9wRG93bkNvbnRhaW5lcklkOiBzdHJpbmcsIHJpZ2h0VGFiQ29udGFpbmVySWQ6IHN0cmluZyl7XHJcbiAgICAgICAgbGV0IGh0bWw6IHN0cmluZyA9IFRhYldpZGdldERyb3BEb3duSFRNTFByb3ZpZGVyLmdldERyb3BEb3duUG9wdXBMYXlvdXQoZHJvcERvd25Db250YWluZXJJZCk7XHJcbiAgICAgICAgVGFiV2lkZ2V0RE9NTWFuaXB1bGF0b3IuYXBwZW5kSFRNTFRhZ0F0SUQocmlnaHRUYWJDb250YWluZXJJZCwgaHRtbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHNldHMgdGhlIGFjdHVhbCBkYXRhc291cmNlIHRvIHRoZSBkcm9wZG93bmxpc3QgYW5kIHNldHMgdGhlIGJ1dHRvbnMgYW5kIGV2ZW50cyBuZWVkZWQgZm9yIHJlbW92aW5nIGl0ZW1zIFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0RmxleERyb3BEb3duXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlRHJvcERvd25PdXRwdXQoKSB7XHJcblxyXG4gICAgICAgIGxldCBkYXRhOiBBcnJheTxUYWJXaWRnZXRGbGV4RHJvcERvd25JdGVtfFRhYldpZGdldEZsZXhEcm9wRG93bkZvb3Rlcj4gPSB0aGlzLmdldERhdGEoKTtcclxuXHJcbiAgICAgICAgVGFiV2lkZ2V0RmxleERyb3BEb3duU0ZIZWxwZXIuc2V0RGF0YVNvdXJjZSh0aGlzLl9kcm9wRG93bkNvbnRhaW5lcklkLCBkYXRhKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXREcm9wRG93bkRlbGV0ZUJ1dHRvbnMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXREcm9wRG93bkZvb3RlckJ1dHRvbnMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgY29ycmVjdCB2aXNpYmlsaXR5IG9mIHRoZSB3cmFwcGVyIGFuZCBwb3B1cCBvZiB0aGUgZHJvcGRvd25saXN0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRGbGV4RHJvcERvd25cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXREcm9wZG93blZpc2liaWxpdHkoKSB7XHJcbiAgICAgICAgaWYodGhpcy5fZHJvcERvd25EYXRhLmlzRW1wdHkoKSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBUYWJXaWRnZXRGbGV4RHJvcERvd25TRkhlbHBlci5oaWRlUG9wdXBMaXN0KHRoaXMuX2Ryb3BEb3duQ29udGFpbmVySWQpO1xyXG4gICAgICAgICAgICBUYWJXaWRnZXRET01NYW5pcHVsYXRvci5hZGRDbGFzc0F0SUQodGhpcy5fZHJvcERvd25XcmFwcGVySWQsIERyb3BEb3duQ3NzQ2xhc3NOYW1lUHJvdmlkZXIuaGlkZURyb3BEb3duV3JhcHBlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBUYWJXaWRnZXRET01NYW5pcHVsYXRvci5yZW1vdmVDbGFzc0F0SUQodGhpcy5fZHJvcERvd25XcmFwcGVySWQsIERyb3BEb3duQ3NzQ2xhc3NOYW1lUHJvdmlkZXIuaGlkZURyb3BEb3duV3JhcHBlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBmb3IgZWFjaCBpdGVtIG9mIHRoZSBkcm9wZG93bmxpc3QgYSBkZWxldGUgYnV0dG9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRGbGV4RHJvcERvd25cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXREcm9wRG93bkRlbGV0ZUJ1dHRvbnMoKSB7XHJcbiAgICAgICAgdGhpcy5fZHJvcERvd25EYXRhLmRhdGEuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgLy8gb25seSBmb3IgbGlzdCBpdGVtcyBhIGJ1dHRvbiBzaG91bGQgYmUgY3JlYXRlZFxyXG4gICAgICAgICAgICBpZihpdGVtLmlkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICQoXCIjXCIrdGhpcy5fZHJvcERvd25JdGVtRGVsZXRlQnV0dG9uSWQraXRlbS5pZCkuZWpCdXR0b24oe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBlai5Db250ZW50VHlwZS5JbWFnZU9ubHksXHJcbiAgICAgICAgICAgICAgICAgICAgY3NzQ2xhc3M6IERyb3BEb3duQ3NzQ2xhc3NOYW1lUHJvdmlkZXIubGlzdEl0ZW1EZWxldGVCdXR0b24sXHJcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6ICgpID0+IHRoaXMub25EZWxldGVJdGVtQnV0dG9uQ2xpY2tlZChpdGVtLmlkKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyaWdnZXJzIGFuIGV2ZW50IHRoYXQgY2xvc2UgdGhlIHRhYiB3aGVyZSB0aGUgZGVsZXRlIGJ1dHRvbiB3YXMgcHJlc3NlZCBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRhYk5hbWVcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRGbGV4RHJvcERvd25cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkRlbGV0ZUl0ZW1CdXR0b25DbGlja2VkKHRhYk5hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZXZlbnRUYWJCYXJDbG9zZVRhYi5yYWlzZSh0aGlzLHt0YWJOYW1lOiB0YWJOYW1lfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHN5bmNmdXNpb24gYnV0dG9ucyBcIkNsb3NlIGFsbFwiIGFuZCBcIkNsb3NlIGFsbCBvdGhlclwiIGZvciB0aGUgZm9vdGVyIG9mIHRoZSBkcm9wZG93bmxpc3RcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldEZsZXhEcm9wRG93blxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldERyb3BEb3duRm9vdGVyQnV0dG9ucygpIHtcclxuICAgICAgICAkKFwiI1wiK3RoaXMuX2Ryb3BEb3duRm9vdGVyQ2xvc2VBbGxJZCkuZWpCdXR0b24oe1xyXG4gICAgICAgICAgICB0ZXh0OiBcIkNsb3NlIGFsbFwiLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogZWouQ29udGVudFR5cGUuVGV4dE9ubHksXHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiBEcm9wRG93bkNzc0NsYXNzTmFtZVByb3ZpZGVyLmRyb3BEb3duRm9vdGVyQ2xvc2VBbGwsXHJcbiAgICAgICAgICAgIGNsaWNrOiAoYXJncykgPT4gdGhpcy5vbkNsb3NlQWxsVGFicyhhcmdzKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiI1wiK3RoaXMuX2Ryb3BEb3duRm9vdGVyQ2xvc2VBbGxPdGhlcklkKS5lakJ1dHRvbih7XHJcbiAgICAgICAgICAgIHRleHQ6IFwiQ2xvc2UgYWxsIG90aGVyXCIsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBlai5Db250ZW50VHlwZS5UZXh0T25seSxcclxuICAgICAgICAgICAgY3NzQ2xhc3M6IERyb3BEb3duQ3NzQ2xhc3NOYW1lUHJvdmlkZXIuZHJvcERvd25Gb290ZXJDbG9zZUFsbE90aGVyLFxyXG4gICAgICAgICAgICBjbGljazogKGFyZ3MpID0+IHRoaXMub25DbG9zZUFsbFRhYnNCdXRBY3RpdmUoYXJncylcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyaWdnZXJzIGFuIGV2ZW50IHRoYXQgY2xvc2VzIGFsbCB0YWJzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gZXZlbnRcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRGbGV4RHJvcERvd25cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkNsb3NlQWxsVGFicyhldmVudCl7XHJcbiAgICAgICAgdGhpcy5ldmVudFRhYkJhckNsb3NlQWxsVGFicy5yYWlzZSh0aGlzLGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyaWdnZXJzIGFuIGV2ZW50IHRoYXQgY2xvc2VzIGFsbCB0YWJzIGJ1dCB0aGUgYWN0aXZlIG9uZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGV2ZW50XHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0RmxleERyb3BEb3duXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25DbG9zZUFsbFRhYnNCdXRBY3RpdmUoZXZlbnQpe1xyXG4gICAgICAgIHRoaXMuZXZlbnRUYWJCYXJDbG9zZUFsbFRhYnNCdXRBY3RpdmUucmFpc2UodGhpcyxldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBhY3R1YWwgZGF0YSBmb3IgdGhlIGRyb3Bkb3dubGlzdFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuIHsqfSAgeyhBcnJheTxUYWJXaWRnZXRGbGV4RHJvcERvd25JdGVtfFRhYldpZGdldEZsZXhEcm9wRG93bkZvb3Rlcj4pfVxyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldEZsZXhEcm9wRG93blxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldERhdGEoKTogQXJyYXk8VGFiV2lkZ2V0RmxleERyb3BEb3duSXRlbXxUYWJXaWRnZXRGbGV4RHJvcERvd25Gb290ZXI+IHtcclxuXHJcbiAgICAgICAgLy8gR2V0IGEgZGVlcCBjb3B5IG9mIHRoZSBkcm9wZG93bml0ZW0gYXJyYXlcclxuICAgICAgICBsZXQgZGF0YSA6IEFycmF5PFRhYldpZGdldEZsZXhEcm9wRG93bkl0ZW18VGFiV2lkZ2V0RmxleERyb3BEb3duRm9vdGVyPiA9IHRoaXMuX2Ryb3BEb3duRGF0YS5kYXRhLnNsaWNlKCk7XHJcblxyXG4gICAgICAgIC8vIGFkZCBmb290ZXIgaW4gdGhlIGxhc3QgcG9zaXRpb24gb2YgdGhlIGFycmF5IHRoYXQgaXQgZ2V0cyBkaXNwbGF5ZWQgYXQgdGhlIGJvdHRvbVxyXG4gICAgICAgIGRhdGEucHVzaChuZXcgVGFiV2lkZ2V0RmxleERyb3BEb3duRm9vdGVyKHRoaXMuX2Ryb3BEb3duRm9vdGVyQ2xvc2VBbGxJZCwgdGhpcy5fZHJvcERvd25Gb290ZXJDbG9zZUFsbE90aGVySWQpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcbn0iXX0=