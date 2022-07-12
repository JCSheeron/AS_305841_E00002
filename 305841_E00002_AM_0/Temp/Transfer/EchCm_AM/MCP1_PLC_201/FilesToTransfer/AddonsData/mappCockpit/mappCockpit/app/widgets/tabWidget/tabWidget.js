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
define(["require", "exports", "../common/layoutWidgetBase", "./view/tabWidgetFlexTab", "./interfaces/tabWidgetInterface", "./view/tabWidgetFixedTab", "./layout/tabWidgetLayoutProvider", "../common/viewTypeProvider", "../common/uniqueIdGenerator", "./componentDefaultDefinition", "../common/widgetBase", "./view/tabWidgetFlexDropDown"], function (require, exports, layoutWidgetBase_1, tabWidgetFlexTab_1, tabWidgetInterface_1, tabWidgetFixedTab_1, tabWidgetLayoutProvider_1, viewTypeProvider_1, uniqueIdGenerator_1, componentDefaultDefinition_1, widgetBase_1, tabWidgetFlexDropDown_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.topBarClassName = "TopBar";
    var tabWidgetFlexTabAreaWidth = "100%";
    var tabWidgetRightTabAreaWidth = "0px";
    var TabWidget = /** @class */ (function (_super) {
        __extends(TabWidget, _super);
        function TabWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._rightTabContainerId = "tabWidgetTabContainerRight";
            _this._flexibleTabContainerId = "tabWidgetFlexibleTabContainer";
            _this._leftTabContainerId = "tabWidgetTabContainerLeft";
            _this._flexDropDown = new tabWidgetFlexDropDown_1.TabWidgetFlexDropDown();
            _this._tabSelectedFromDropDownHandler = function (sender, eventArgs) { _this.onTabClicked(eventArgs); };
            _this._tabBarCloseTabHandler = function (sender, args) { _this.closeTab(args, false); };
            _this._tabBarCloseAllTabsHandler = function (sender, args) { _this.closeAllTabs(args); };
            _this._tabBarCloseAllTabsButActiveHandler = function (sender, args) { _this.closeAllTabsButActive(args); };
            _this._tabClickedHandler = function (sender, args) { _this.onTabClicked(args); };
            _this._tabWheelClickedHandler = function (sender, args) { _this.onTabWheelClicked(args); };
            _this._activeTabHiddenHandler = function (sender, args) { _this.onActiveTabHidden(sender, args); };
            return _this;
        }
        /**
         *
         *
         * @memberof TabWidget
         */
        TabWidget.prototype.initialize = function () {
            this._actualWidth = 500;
            this._actualHeight = 500;
            this.attachFlexDropDownEvents();
            var layoutContainerId = widgetBase_1.WidgetBase.getUniqueDivId();
            this.setUniqueTabContainerIds(layoutContainerId);
            _super.prototype.initialize.call(this);
        };
        TabWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
            this.component.disablePersisting();
        };
        TabWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            this.dataModel = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.TabWidgetDataModel);
        };
        TabWidget.prototype.dispose = function () {
            // Dispose widgets
            this._widgets.forEach(function (widget) {
                if (widget != undefined) {
                    widget.dispose();
                }
            });
            this.dataModel.dispose();
            this.detachFlexDropDownEvents();
            _super.prototype.dispose.call(this);
        };
        /**
         * Attaches the flexDropDown events
         *
         * @private
         * @memberof TabWidget
         */
        TabWidget.prototype.attachFlexDropDownEvents = function () {
            this._flexDropDown.eventTabSelectedFromDropdown.attach(this._tabSelectedFromDropDownHandler);
            this._flexDropDown.eventTabBarCloseTab.attach(this._tabBarCloseTabHandler);
            this._flexDropDown.eventTabBarCloseAllTabs.attach(this._tabBarCloseAllTabsHandler);
            this._flexDropDown.eventTabBarCloseAllTabsButActive.attach(this._tabBarCloseAllTabsButActiveHandler);
        };
        /**
         * Detaches the flexDropDown events
         *
         * @private
         * @memberof TabWidget
         */
        TabWidget.prototype.detachFlexDropDownEvents = function () {
            this._flexDropDown.eventTabSelectedFromDropdown.detach(this._tabSelectedFromDropDownHandler);
            this._flexDropDown.eventTabBarCloseTab.detach(this._tabBarCloseTabHandler);
            this._flexDropDown.eventTabBarCloseAllTabs.detach(this._tabBarCloseAllTabsHandler);
            this._flexDropDown.eventTabBarCloseAllTabsButActive.detach(this._tabBarCloseAllTabsButActiveHandler);
        };
        /**
         *
         *
         * @private
         * @param {string} layoutContainerId
         * @memberof TabWidget
         */
        TabWidget.prototype.setUniqueTabContainerIds = function (layoutContainerId) {
            this._rightTabContainerId = layoutContainerId + "_tabWidgetTabContainerRight";
            this._flexibleTabContainerId = layoutContainerId + "_tabWidgetFlexibleTabContainer";
            this._leftTabContainerId = layoutContainerId + "_tabWidgetTabContainerLeft";
        };
        /**
         * Creates the layout of the widget
         *
         * @memberof TabWidget
         */
        TabWidget.prototype.createLayout = function () {
            var tabLayout = tabWidgetLayoutProvider_1.TabWidgetLayoutProvider.getInstance().getTabBarLayout(this.mainDivId, this._leftTabContainerId, this._flexibleTabContainerId, this._rightTabContainerId);
            $(this.mainDiv).append(tabLayout);
            //$("."+mainNavigationClassName).parent().append($(`<div id="`+ this._rightTabContainerId +`" class="topBarTabContainerRight"></div>`))
            this._flexDropDown.initializeFlexTabDropdown(this.mainDivId, this._rightTabContainerId);
            this.adaptWidthOfFlexTabBar();
        };
        /**
         * Loads the styles for the tab widget
         *
         * @memberof TabWidget
         */
        TabWidget.prototype.loadStyles = function () {
            _super.prototype.addStyle.call(this, "widgets/tabWidget/style/css/tabWidgetStyle.css");
            _super.prototype.addStyle.call(this, "widgets/tabWidget/style/css/tabWidgetDropDownStyle.css");
        };
        /**
         *
         *
         * @memberof TabWidget
         */
        TabWidget.prototype.activate = function () {
            if (this.dataModel.getFlexTabs().length == 0) {
                this.selectOverview();
            }
            var widget = this.dataModel.getActiveTab().widget;
            if (widget != undefined) {
                widget.activate();
            }
        };
        TabWidget.prototype.deactivate = function () {
            var tabs = this.dataModel.getAllTabs();
            for (var _i = 0, tabs_1 = tabs; _i < tabs_1.length; _i++) {
                var element = tabs_1[_i];
                if (element.widget != undefined) {
                    element.widget.deactivate();
                }
            }
        };
        /**
         *
         *
         * @param {IWidget} widget
         * @param {string} tabName
         * @param {ViewType} viewType
         * @param {*} data
         * @memberof TabWidget
         */
        TabWidget.prototype.addWidget = function (widget, tabName, viewType, data) {
            _super.prototype.addWidget.call(this, widget, tabName, viewType);
            var tabId = tabName + "_" + viewType.toString();
            tabId = uniqueIdGenerator_1.UniqueIdGenerator.getInstance().getUniqueIdFromString(tabId);
            var iconPath = viewTypeProvider_1.ViewTypeProvider.getInstance().getIconByViewType(viewType);
            var newTab = this.addNewTab(data.widgetPosition, iconPath, tabId, tabName);
            if (newTab) {
                newTab.addWidget(widget);
            }
        };
        /**
         *
         *
         * @private
         * @param {*} widgetPosition
         * @param {*} iconPath
         * @param {*} tabId
         * @returns
         * @memberof TabWidget
         */
        TabWidget.prototype.addNewTab = function (widgetPosition, iconPath, tabId, displayName) {
            var newTab;
            switch (widgetPosition) {
                case tabWidgetInterface_1.TabWidgetWidgetPositons.flex:
                    newTab = this.addFlexibleTab(tabId, iconPath, displayName);
                    break;
                case tabWidgetInterface_1.TabWidgetWidgetPositons.right:
                    newTab = this.addFixedTab(tabId, iconPath, this._rightTabContainerId);
                    break;
                case tabWidgetInterface_1.TabWidgetWidgetPositons.left:
                    newTab = this.addFixedTab(tabId, iconPath, this._leftTabContainerId);
                    break;
            }
            this.registerEventsForTab(newTab);
            this.dataModel.addTab(newTab);
            return newTab;
        };
        /**
         *
         *
         * @private
         * @param {ITabWidgetTab} tab
         * @memberof TabWidget
         */
        TabWidget.prototype.registerEventsForTab = function (tab) {
            if (tab != undefined) {
                tab.eventTabWidgetTabClicked.attach(this._tabClickedHandler);
                tab.eventTabWidgetTabWheelClicked.attach(this._tabWheelClickedHandler);
                tab.eventTabWidgetActiveHidden.attach(this._activeTabHiddenHandler);
            }
        };
        TabWidget.prototype.unregisterEventsForTab = function (tab) {
            if (tab != undefined) {
                tab.eventTabWidgetTabClicked.detach(this._tabClickedHandler);
                tab.eventTabWidgetTabWheelClicked.detach(this._tabWheelClickedHandler);
                tab.eventTabWidgetActiveHidden.detach(this._activeTabHiddenHandler);
            }
        };
        /**
         *
         *
         * @private
         * @param {*} tabID
         * @param {*} iconPath
         * @returns {ITabWidgetTab}
         * @memberof TabWidget
         */
        TabWidget.prototype.addFlexibleTab = function (tabID, iconPath, displayName) {
            var newTab = new tabWidgetFlexTab_1.TabWidgetFlexTab();
            newTab.appendTabLayout(this.mainDiv, this._flexibleTabContainerId + "_flexBox", tabID, displayName);
            newTab.setIcon(iconPath);
            if (newTab.tabContainerId) {
                this._flexDropDown.addItemToDropdown(displayName, newTab.tabContainerId, this.mainDivId, iconPath);
            }
            return newTab;
        };
        /**
         *
         *
         * @private
         * @param {*} tabName
         * @param {*} iconPath
         * @param {*} widgetPosition
         * @returns {ITabWidgetTab}
         * @memberof TabWidget
         */
        TabWidget.prototype.addFixedTab = function (tabName, iconPath, widgetPosition) {
            var newTab = new tabWidgetFixedTab_1.TabWidgetFixedTab();
            newTab.appendTabLayout(this.mainDiv, widgetPosition, tabName, "");
            newTab.setIcon(iconPath);
            return newTab;
        };
        /**
         *
         *
         * @private
         * @memberof TabWidget
         */
        TabWidget.prototype.adaptWidthOfFlexTabBar = function () {
            tabWidgetFlexTabAreaWidth = "calc( 100% - 54px )";
            tabWidgetRightTabAreaWidth = "calc( 0px + 51px )";
            document.documentElement.style.setProperty('--tabWidgetFlexTabAreaWidth', tabWidgetFlexTabAreaWidth);
            document.documentElement.style.setProperty('--tabWidgetRightTabAreaWidth', tabWidgetRightTabAreaWidth);
        };
        /**
         *
         *
         * @private
         * @param {ITabWidgetTab} sender
         * @param {object} eventArgs
         * @returns {*}
         * @memberof TabWidget
         */
        TabWidget.prototype.onActiveTabHidden = function (sender, eventArgs) {
            if (eventArgs["eventTrigger"] == "resize") {
                var newIndex = this.dataModel.getFlexTabIndex(sender) - 1;
                if (newIndex >= 0) {
                    this.dataModel.setFlexTabPosition(newIndex, sender);
                    sender.isVisible(eventArgs["eventTrigger"]);
                }
            }
            else {
                this.dataModel.setFlexTabPosition(0, sender);
            }
        };
        /**
         *
         *
         * @private
         * @param {*} args
         * @memberof TabWidget
         */
        TabWidget.prototype.onTabClicked = function (args) {
            this.selectTab(args.tabName);
        };
        /**
         *
         *
         * @private
         * @param {*} args
         * @memberof TabWidget
         */
        TabWidget.prototype.onTabWheelClicked = function (args) {
            this.closeTab(args, true);
        };
        /**
         *
         *
         * @param {*} tabName
         * @returns {ITabWidgetTab}
         * @memberof TabWidget
         */
        TabWidget.prototype.selectTab = function (tabName) {
            var tabId = "tab_" + tabName;
            var selectedTab = this.dataModel.getTabById(tabId);
            if (selectedTab != undefined && !selectedTab.isActive) {
                this._flexDropDown.setTabSelected(tabId);
                this.setTabActive(selectedTab);
                this.resizeTab(selectedTab);
            }
            else if (selectedTab == undefined) {
                console.error("selected Tab is not defined");
            }
            return selectedTab;
        };
        /**
         *
         *
         * @private
         * @param {ITabWidgetTab} selectedTab
         * @memberof TabWidget
         */
        TabWidget.prototype.setTabActive = function (selectedTab) {
            this.setAllTabsInactive();
            if (this.dataModel.getActiveTab().widget != undefined) {
                this.dataModel.getActiveTab().widget.deactivate();
            }
            selectedTab.setActive();
            if (selectedTab.widget != undefined) {
                selectedTab.widget.activate();
            }
            this.dataModel.setActiveTab(selectedTab);
        };
        /**
         *
         *
         * @private
         * @param {ITabWidgetTab} selectedTab
         * @memberof TabWidget
         */
        TabWidget.prototype.resizeTab = function (selectedTab) {
            if (selectedTab.widget != undefined) {
                selectedTab.widget.resize(this._actualWidth, this._actualHeight);
            }
        };
        /**
         *
         *
         * @private
         * @memberof TabWidget
         */
        TabWidget.prototype.setAllTabsInactive = function () {
            for (var i = 0; i < this.dataModel.getAllTabs().length; i++) {
                this.dataModel.getAllTabs()[i].setDisplayNone();
                this.dataModel.getAllTabs()[i].removeStyleClassActive();
            }
        };
        TabWidget.prototype.onAbsoluteTabSelected = function () {
            for (var i = 0; i < this.dataModel.getAllTabs().length; i++) {
                this.dataModel.getAllTabs()[i].removeStyleClassActive();
            }
            var rightHandSideBarButtons = $(".rightHandSideBarButton");
            for (var i = 0; i < rightHandSideBarButtons.length; i++) {
                rightHandSideBarButtons[i].className = rightHandSideBarButtons[i].className.replace(" active", "");
                rightHandSideBarButtons[i].getElementsByTagName('img')[0].src = rightHandSideBarButtons[i].getElementsByTagName('img')[0].src.replace('_active.svg', '.svg');
            }
            var absoluteTabs = $(".absoluteTab");
            for (var i = 0; i < rightHandSideBarButtons.length; i++) {
                absoluteTabs[i].style.display = "none";
            }
        };
        /**
         *
         *
         * @param {number} width
         * @param {number} height
         * @memberof TabWidget
         */
        TabWidget.prototype.resize = function (width, height) {
            this._actualWidth = width;
            this._actualHeight = height;
            // Set size of tab control itself
            this.mainDiv.style.width = width + "px";
            this.mainDiv.style.height = height + "px";
            this.dataModel.getActiveTab().isVisible("resize");
            if (this.dataModel.getActiveTab().widget != undefined) {
                this.dataModel.getActiveTab().widget.resize(width, height);
            }
        };
        /**
         *
         *
         * @memberof TabWidget
         */
        TabWidget.prototype.selectOverview = function () {
            var fixedTabs = this.dataModel.data.fixedTabs;
            var overviewId = fixedTabs[fixedTabs.length - 1].tabContainerId;
            overviewId = overviewId.replace("tab_", "");
            this.selectTab(overviewId);
        };
        /**
         *
         *
         * @private
         * @param {ITabWidgetTab} tabToRemove
         * @param {*} mouseWheelClicked
         * @memberof TabWidget
         */
        TabWidget.prototype.removeTab = function (tabToRemove, mouseWheelClicked) {
            if (tabToRemove == this.dataModel.getActiveTab()) {
                var flexTabIndex = this.dataModel.getFlexTabIndex(tabToRemove);
                if ((this.dataModel.getFlexTabs()[flexTabIndex - 1]) != undefined) {
                    this.selectTab(this.dataModel.getFlexTabs()[flexTabIndex - 1].tabName);
                }
                else if ((this.dataModel.getFlexTabs()[flexTabIndex + 1]) != undefined) {
                    this.selectTab(this.dataModel.getFlexTabs()[flexTabIndex + 1].tabName);
                }
                else {
                    this.selectOverview();
                }
            }
            var index = this.dataModel.data.flexTabs.indexOf(tabToRemove, 0);
            if (index > -1) {
                this.dataModel.data.flexTabs.splice(index, 1);
            }
            this._flexDropDown.removeItemFromDropdown(tabToRemove.tabContainerId, mouseWheelClicked);
            var tabContainer = document.getElementById(tabToRemove.tabContainerId);
            var tabContainertab = document.getElementById(tabToRemove.tabContainerId + "_tab");
            tabContainertab.parentNode.removeChild(tabContainertab);
            tabContainer.parentNode.removeChild(tabContainer);
            this.unregisterEventsForTab(tabToRemove);
            _super.prototype.removeWidget.call(this, tabToRemove.widget);
        };
        /**
         *
         *
         * @private
         * @param {*} args
         * @param {*} mouseWheelClicked
         * @memberof TabWidget
         */
        TabWidget.prototype.closeTab = function (args, mouseWheelClicked) {
            var tabToClose = this.dataModel.getTabById(args.tabName);
            if (tabToClose != undefined) {
                //tabToClose.widget.saveComponentSettings();
                if (tabToClose.widget != undefined) {
                    tabToClose.widget.dispose();
                }
                this.removeTab(tabToClose, mouseWheelClicked);
            }
        };
        /**
         *
         *
         * @private
         * @param {*} args
         * @memberof TabWidget
         */
        TabWidget.prototype.closeAllTabs = function (args) {
            var tabsToClose = new Array();
            for (var i = 0; i < this.dataModel.getFlexTabs().length; i++) {
                tabsToClose.push(this.dataModel.getFlexTabs()[i]);
            }
            for (var i = 0; i < tabsToClose.length; i++) {
                tabsToClose[i].widget.dispose();
                this.removeTab(tabsToClose[i], false);
            }
        };
        /**
         *
         *
         * @private
         * @param {*} args
         * @memberof TabWidget
         */
        TabWidget.prototype.closeAllTabsButActive = function (args) {
            var tabsToClose = new Array();
            for (var i = 0; i < this.dataModel.getFlexTabs().length; i++) {
                if (this.dataModel.getFlexTabs()[i] != this.dataModel.getActiveTab()) {
                    tabsToClose.push(this.dataModel.getFlexTabs()[i]);
                }
            }
            for (var i = 0; i < tabsToClose.length; i++) {
                tabsToClose[i].widget.dispose();
                this.removeTab(tabsToClose[i], false);
            }
        };
        return TabWidget;
    }(layoutWidgetBase_1.LayoutWidgetBase));
    exports.TabWidget = TabWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RhYldpZGdldC90YWJXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQWVhLFFBQUEsZUFBZSxHQUFHLFFBQVEsQ0FBQztJQUV4QyxJQUFJLHlCQUF5QixHQUFHLE1BQU0sQ0FBQztJQUN2QyxJQUFJLDBCQUEwQixHQUFHLEtBQUssQ0FBQztJQUd2QztRQUF3Qiw2QkFBZ0I7UUFBeEM7WUFBQSxxRUEyaEJDO1lBemhCRywwQkFBb0IsR0FBRyw0QkFBNEIsQ0FBQztZQUNwRCw2QkFBdUIsR0FBRywrQkFBK0IsQ0FBQztZQUMxRCx5QkFBbUIsR0FBRywyQkFBMkIsQ0FBQztZQUUxQyxtQkFBYSxHQUEyQixJQUFJLDZDQUFxQixFQUFFLENBQUM7WUFLcEUscUNBQStCLEdBQUcsVUFBQyxNQUFNLEVBQUUsU0FBUyxJQUFPLEtBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUM7WUFDekYsNEJBQXNCLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFNLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFBLENBQUEsQ0FBQyxDQUFDO1lBQ3ZFLGdDQUEwQixHQUFHLFVBQUMsTUFBTSxFQUFDLElBQUksSUFBTSxLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUEsQ0FBQyxDQUFDO1lBQ3hFLHlDQUFtQyxHQUFHLFVBQUMsTUFBTSxFQUFDLElBQUksSUFBTSxLQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUM7WUFFMUYsd0JBQWtCLEdBQUcsVUFBQyxNQUFNLEVBQUUsSUFBSSxJQUFNLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUM7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QUNELEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUN2QyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUN6QztRQUNMLENBQUM7UUFDTCxnQkFBQztJQUFELENBQUMsQUEzaEJELENBQXdCLG1DQUFnQixHQTJoQnZDO0lBQ08sOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMYXlvdXRXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi9sYXlvdXRXaWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IElXaWRnZXQgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvd2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRhYldpZGdldEZsZXhUYWIgfSBmcm9tIFwiLi92aWV3L3RhYldpZGdldEZsZXhUYWJcIjtcclxuaW1wb3J0IHsgSVRhYldpZGdldFRhYiB9IGZyb20gXCIuL2ludGVyZmFjZXMvdGFiV2lkZ2V0VGFiSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElUYWJXaWRnZXREYXRhTW9kZWwgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3RvcEJhckRhdGFNb2RlbC9pbnRlcmZhY2VzL3RhYldpZGdldERhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUYWJXaWRnZXRXaWRnZXRQb3NpdG9uc30gZnJvbSBcIi4vaW50ZXJmYWNlcy90YWJXaWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVGFiV2lkZ2V0Rml4ZWRUYWIgfSBmcm9tIFwiLi92aWV3L3RhYldpZGdldEZpeGVkVGFiXCI7XHJcbmltcG9ydCB7IFRhYldpZGdldExheW91dFByb3ZpZGVyIH0gZnJvbSBcIi4vbGF5b3V0L3RhYldpZGdldExheW91dFByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFZpZXdUeXBlUHJvdmlkZXIsIFZpZXdUeXBlfSBmcm9tIFwiLi4vY29tbW9uL3ZpZXdUeXBlUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgVW5pcXVlSWRHZW5lcmF0b3IgfSBmcm9tIFwiLi4vY29tbW9uL3VuaXF1ZUlkR2VuZXJhdG9yXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uIH0gZnJvbSBcIi4vY29tcG9uZW50RGVmYXVsdERlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vd2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBJVGFiV2lkZ2V0RmxleERyb3BEb3duIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy90YWJXaWRnZXRGbGV4RHJvcERvd25JbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVGFiV2lkZ2V0RmxleERyb3BEb3duIH0gZnJvbSBcIi4vdmlldy90YWJXaWRnZXRGbGV4RHJvcERvd25cIjtcclxuXHJcbmV4cG9ydCBjb25zdCB0b3BCYXJDbGFzc05hbWUgPSBcIlRvcEJhclwiO1xyXG5cclxubGV0IHRhYldpZGdldEZsZXhUYWJBcmVhV2lkdGggPSBcIjEwMCVcIjtcclxubGV0IHRhYldpZGdldFJpZ2h0VGFiQXJlYVdpZHRoID0gXCIwcHhcIjtcclxuXHJcblxyXG5jbGFzcyBUYWJXaWRnZXQgZXh0ZW5kcyBMYXlvdXRXaWRnZXRCYXNlIHtcclxuXHJcbiAgICBfcmlnaHRUYWJDb250YWluZXJJZCA9IFwidGFiV2lkZ2V0VGFiQ29udGFpbmVyUmlnaHRcIjtcclxuICAgIF9mbGV4aWJsZVRhYkNvbnRhaW5lcklkID0gXCJ0YWJXaWRnZXRGbGV4aWJsZVRhYkNvbnRhaW5lclwiO1xyXG4gICAgX2xlZnRUYWJDb250YWluZXJJZCA9IFwidGFiV2lkZ2V0VGFiQ29udGFpbmVyTGVmdFwiO1xyXG5cclxuICAgIHByaXZhdGUgX2ZsZXhEcm9wRG93bjogSVRhYldpZGdldEZsZXhEcm9wRG93biA9IG5ldyBUYWJXaWRnZXRGbGV4RHJvcERvd24oKTtcclxuXHJcblxyXG4gICAgZGF0YU1vZGVsITogSVRhYldpZGdldERhdGFNb2RlbDtcclxuICAgXHJcbiAgICBwcml2YXRlIF90YWJTZWxlY3RlZEZyb21Ecm9wRG93bkhhbmRsZXIgPSAoc2VuZGVyLCBldmVudEFyZ3MpID0+IHsgdGhpcy5vblRhYkNsaWNrZWQoZXZlbnRBcmdzKX07XHJcbiAgICBwcml2YXRlIF90YWJCYXJDbG9zZVRhYkhhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpID0+IHt0aGlzLmNsb3NlVGFiKGFyZ3MsIGZhbHNlKX07XHJcbiAgICBwcml2YXRlIF90YWJCYXJDbG9zZUFsbFRhYnNIYW5kbGVyID0gKHNlbmRlcixhcmdzKSA9PiB7dGhpcy5jbG9zZUFsbFRhYnMoYXJncyl9O1xyXG4gICAgcHJpdmF0ZSBfdGFiQmFyQ2xvc2VBbGxUYWJzQnV0QWN0aXZlSGFuZGxlciA9IChzZW5kZXIsYXJncykgPT4ge3RoaXMuY2xvc2VBbGxUYWJzQnV0QWN0aXZlKGFyZ3MpfTtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfdGFiQ2xpY2tlZEhhbmRsZXIgPSAoc2VuZGVyLCBhcmdzKSA9PiB7dGhpcy5vblRhYkNsaWNrZWQoYXJncyl9O1xyXG4gICAgcHJpdmF0ZSBfdGFiV2hlZWxDbGlja2VkSGFuZGxlciA9IChzZW5kZXIsIGFyZ3MpID0+IHt0aGlzLm9uVGFiV2hlZWxDbGlja2VkKGFyZ3MpfTtcclxuICAgIHByaXZhdGUgX2FjdGl2ZVRhYkhpZGRlbkhhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpID0+IHt0aGlzLm9uQWN0aXZlVGFiSGlkZGVuKHNlbmRlcixhcmdzKX07XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemUoKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX2FjdHVhbFdpZHRoPTUwMDtcclxuICAgICAgICB0aGlzLl9hY3R1YWxIZWlnaHQ9NTAwO1xyXG5cclxuICAgICAgICB0aGlzLmF0dGFjaEZsZXhEcm9wRG93bkV2ZW50cygpO1xyXG5cclxuICAgICAgICBsZXQgbGF5b3V0Q29udGFpbmVySWQgPSBXaWRnZXRCYXNlLmdldFVuaXF1ZURpdklkKCk7XHJcbiAgICAgICAgdGhpcy5zZXRVbmlxdWVUYWJDb250YWluZXJJZHMobGF5b3V0Q29udGFpbmVySWQpO1xyXG5cclxuICAgICAgICBzdXBlci5pbml0aWFsaXplKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldERlZmF1bHREZWZpbml0aW9uKG5ldyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbigpKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kaXNhYmxlUGVyc2lzdGluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVkKCl7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZWQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5kYXRhTW9kZWwgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uVGFiV2lkZ2V0RGF0YU1vZGVsKSBhcyBJVGFiV2lkZ2V0RGF0YU1vZGVsO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3Bvc2UoKXtcclxuICAgICAgICAvLyBEaXNwb3NlIHdpZGdldHNcclxuICAgICAgICB0aGlzLl93aWRnZXRzLmZvckVhY2goKHdpZGdldCkgPT4ge1xyXG4gICAgICAgICAgICBpZih3aWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHdpZGdldC5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5kYXRhTW9kZWwuZGlzcG9zZSgpO1xyXG4gICAgICAgIHRoaXMuZGV0YWNoRmxleERyb3BEb3duRXZlbnRzKCk7XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaGVzIHRoZSBmbGV4RHJvcERvd24gZXZlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhdHRhY2hGbGV4RHJvcERvd25FdmVudHMoKXtcclxuICAgICAgICB0aGlzLl9mbGV4RHJvcERvd24uZXZlbnRUYWJTZWxlY3RlZEZyb21Ecm9wZG93bi5hdHRhY2godGhpcy5fdGFiU2VsZWN0ZWRGcm9tRHJvcERvd25IYW5kbGVyKTtcclxuICAgICAgICB0aGlzLl9mbGV4RHJvcERvd24uZXZlbnRUYWJCYXJDbG9zZVRhYi5hdHRhY2godGhpcy5fdGFiQmFyQ2xvc2VUYWJIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLl9mbGV4RHJvcERvd24uZXZlbnRUYWJCYXJDbG9zZUFsbFRhYnMuYXR0YWNoKHRoaXMuX3RhYkJhckNsb3NlQWxsVGFic0hhbmRsZXIpO1xyXG4gICAgICAgIHRoaXMuX2ZsZXhEcm9wRG93bi5ldmVudFRhYkJhckNsb3NlQWxsVGFic0J1dEFjdGl2ZS5hdHRhY2godGhpcy5fdGFiQmFyQ2xvc2VBbGxUYWJzQnV0QWN0aXZlSGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRhY2hlcyB0aGUgZmxleERyb3BEb3duIGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGV0YWNoRmxleERyb3BEb3duRXZlbnRzKCl7XHJcbiAgICAgICAgdGhpcy5fZmxleERyb3BEb3duLmV2ZW50VGFiU2VsZWN0ZWRGcm9tRHJvcGRvd24uZGV0YWNoKHRoaXMuX3RhYlNlbGVjdGVkRnJvbURyb3BEb3duSGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5fZmxleERyb3BEb3duLmV2ZW50VGFiQmFyQ2xvc2VUYWIuZGV0YWNoKHRoaXMuX3RhYkJhckNsb3NlVGFiSGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5fZmxleERyb3BEb3duLmV2ZW50VGFiQmFyQ2xvc2VBbGxUYWJzLmRldGFjaCh0aGlzLl90YWJCYXJDbG9zZUFsbFRhYnNIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLl9mbGV4RHJvcERvd24uZXZlbnRUYWJCYXJDbG9zZUFsbFRhYnNCdXRBY3RpdmUuZGV0YWNoKHRoaXMuX3RhYkJhckNsb3NlQWxsVGFic0J1dEFjdGl2ZUhhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxheW91dENvbnRhaW5lcklkXHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0VW5pcXVlVGFiQ29udGFpbmVySWRzKGxheW91dENvbnRhaW5lcklkOiBzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuX3JpZ2h0VGFiQ29udGFpbmVySWQgPSBsYXlvdXRDb250YWluZXJJZCArIFwiX3RhYldpZGdldFRhYkNvbnRhaW5lclJpZ2h0XCI7XHJcbiAgICAgICAgdGhpcy5fZmxleGlibGVUYWJDb250YWluZXJJZCA9IGxheW91dENvbnRhaW5lcklkICsgXCJfdGFiV2lkZ2V0RmxleGlibGVUYWJDb250YWluZXJcIjtcclxuICAgICAgICB0aGlzLl9sZWZ0VGFiQ29udGFpbmVySWQgPSBsYXlvdXRDb250YWluZXJJZCArIFwiX3RhYldpZGdldFRhYkNvbnRhaW5lckxlZnRcIjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBsYXlvdXQgb2YgdGhlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgY3JlYXRlTGF5b3V0KCkge1xyXG5cclxuICAgICAgICBsZXQgdGFiTGF5b3V0OiBzdHJpbmcgPSBUYWJXaWRnZXRMYXlvdXRQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldFRhYkJhckxheW91dCh0aGlzLm1haW5EaXZJZCwgdGhpcy5fbGVmdFRhYkNvbnRhaW5lcklkLHRoaXMuX2ZsZXhpYmxlVGFiQ29udGFpbmVySWQsdGhpcy5fcmlnaHRUYWJDb250YWluZXJJZCk7XHJcbiAgICAgICAgJCh0aGlzLm1haW5EaXYpLmFwcGVuZCh0YWJMYXlvdXQpO1xyXG4gICAgICAgIC8vJChcIi5cIittYWluTmF2aWdhdGlvbkNsYXNzTmFtZSkucGFyZW50KCkuYXBwZW5kKCQoYDxkaXYgaWQ9XCJgKyB0aGlzLl9yaWdodFRhYkNvbnRhaW5lcklkICtgXCIgY2xhc3M9XCJ0b3BCYXJUYWJDb250YWluZXJSaWdodFwiPjwvZGl2PmApKVxyXG4gICAgICAgIHRoaXMuX2ZsZXhEcm9wRG93bi5pbml0aWFsaXplRmxleFRhYkRyb3Bkb3duKHRoaXMubWFpbkRpdklkLCB0aGlzLl9yaWdodFRhYkNvbnRhaW5lcklkKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGFwdFdpZHRoT2ZGbGV4VGFiQmFyKCk7XHJcbiAgICB9ICAgIFxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIExvYWRzIHRoZSBzdHlsZXMgZm9yIHRoZSB0YWIgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldFxyXG4gICAgICovXHJcbiAgICBsb2FkU3R5bGVzKCl7XHJcbiAgICAgICAgc3VwZXIuYWRkU3R5bGUoXCJ3aWRnZXRzL3RhYldpZGdldC9zdHlsZS9jc3MvdGFiV2lkZ2V0U3R5bGUuY3NzXCIpO1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy90YWJXaWRnZXQvc3R5bGUvY3NzL3RhYldpZGdldERyb3BEb3duU3R5bGUuY3NzXCIpO1xyXG4gICAgfVxyXG4gICAgICAgXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldFxyXG4gICAgICovXHJcbiAgICBhY3RpdmF0ZSgpe1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YU1vZGVsLmdldEZsZXhUYWJzKCkubGVuZ3RoID09IDApe1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdE92ZXJ2aWV3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB3aWRnZXQgPSB0aGlzLmRhdGFNb2RlbC5nZXRBY3RpdmVUYWIoKS53aWRnZXQ7XHJcbiAgICAgICAgaWYod2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHdpZGdldC5hY3RpdmF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkZWFjdGl2YXRlKCl7XHJcbiAgICAgICAgbGV0IHRhYnMgPSB0aGlzLmRhdGFNb2RlbC5nZXRBbGxUYWJzKCk7XHJcbiAgICAgICAgZm9yKGxldCBlbGVtZW50IG9mIHRhYnMpe1xyXG4gICAgICAgICAgICBpZihlbGVtZW50LndpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC53aWRnZXQhLmRlYWN0aXZhdGUoKTtcclxuICAgICAgICAgICAgfSAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lXaWRnZXR9IHdpZGdldFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRhYk5hbWVcclxuICAgICAqIEBwYXJhbSB7Vmlld1R5cGV9IHZpZXdUeXBlXHJcbiAgICAgKiBAcGFyYW0geyp9IGRhdGFcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgYWRkV2lkZ2V0KHdpZGdldDogSVdpZGdldCwgdGFiTmFtZTogc3RyaW5nLCB2aWV3VHlwZTogVmlld1R5cGUsIGRhdGEgOiBhbnkpe1xyXG4gICAgICAgIHN1cGVyLmFkZFdpZGdldCh3aWRnZXQsIHRhYk5hbWUsIHZpZXdUeXBlKTtcclxuICAgICAgICBsZXQgdGFiSWQgPSB0YWJOYW1lICsgXCJfXCIgKyB2aWV3VHlwZS50b1N0cmluZygpO1xyXG4gICAgICAgIHRhYklkID0gVW5pcXVlSWRHZW5lcmF0b3IuZ2V0SW5zdGFuY2UoKS5nZXRVbmlxdWVJZEZyb21TdHJpbmcodGFiSWQpXHJcblxyXG4gICAgICAgIGxldCBpY29uUGF0aCA9IFZpZXdUeXBlUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRJY29uQnlWaWV3VHlwZSh2aWV3VHlwZSk7XHJcbiAgICAgICAgbGV0IG5ld1RhYiA9IHRoaXMuYWRkTmV3VGFiKGRhdGEud2lkZ2V0UG9zaXRpb24sIGljb25QYXRoLCB0YWJJZCwgdGFiTmFtZSk7XHJcbiAgICAgICAgaWYobmV3VGFiKXtcclxuICAgICAgICAgICAgbmV3VGFiLmFkZFdpZGdldCh3aWRnZXQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gd2lkZ2V0UG9zaXRpb25cclxuICAgICAqIEBwYXJhbSB7Kn0gaWNvblBhdGhcclxuICAgICAqIEBwYXJhbSB7Kn0gdGFiSWRcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkTmV3VGFiKHdpZGdldFBvc2l0aW9uLCBpY29uUGF0aCwgdGFiSWQsIGRpc3BsYXlOYW1lKXtcclxuICAgICAgICBsZXQgbmV3VGFiOiBJVGFiV2lkZ2V0VGFiIHwgdW5kZWZpbmVkO1xyXG4gICAgICAgIHN3aXRjaCAod2lkZ2V0UG9zaXRpb24pe1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUYWJXaWRnZXRXaWRnZXRQb3NpdG9ucy5mbGV4IDpcclxuICAgICAgICAgICAgICAgICAgICBuZXdUYWIgPSB0aGlzLmFkZEZsZXhpYmxlVGFiKHRhYklkLCBpY29uUGF0aCwgZGlzcGxheU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUYWJXaWRnZXRXaWRnZXRQb3NpdG9ucy5yaWdodDpcclxuICAgICAgICAgICAgICAgICAgICBuZXdUYWIgPSB0aGlzLmFkZEZpeGVkVGFiKHRhYklkLGljb25QYXRoLHRoaXMuX3JpZ2h0VGFiQ29udGFpbmVySWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNhc2UgVGFiV2lkZ2V0V2lkZ2V0UG9zaXRvbnMubGVmdDpcclxuICAgICAgICAgICAgICAgICAgICBuZXdUYWIgPSB0aGlzLmFkZEZpeGVkVGFiKHRhYklkLGljb25QYXRoLHRoaXMuX2xlZnRUYWJDb250YWluZXJJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzRm9yVGFiKG5ld1RhYik7XHJcbiAgICAgICAgdGhpcy5kYXRhTW9kZWwuYWRkVGFiKG5ld1RhYiEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBuZXdUYWI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lUYWJXaWRnZXRUYWJ9IHRhYlxyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlZ2lzdGVyRXZlbnRzRm9yVGFiKHRhYjogSVRhYldpZGdldFRhYnx1bmRlZmluZWQpe1xyXG4gICAgICAgIGlmKHRhYiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0YWIuZXZlbnRUYWJXaWRnZXRUYWJDbGlja2VkLmF0dGFjaCh0aGlzLl90YWJDbGlja2VkSGFuZGxlcik7XHJcbiAgICAgICAgICAgIHRhYi5ldmVudFRhYldpZGdldFRhYldoZWVsQ2xpY2tlZC5hdHRhY2godGhpcy5fdGFiV2hlZWxDbGlja2VkSGFuZGxlcik7XHJcbiAgICAgICAgICAgIHRhYi5ldmVudFRhYldpZGdldEFjdGl2ZUhpZGRlbi5hdHRhY2godGhpcy5fYWN0aXZlVGFiSGlkZGVuSGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdW5yZWdpc3RlckV2ZW50c0ZvclRhYih0YWI6IElUYWJXaWRnZXRUYWJ8dW5kZWZpbmVkKXtcclxuICAgICAgICBpZih0YWIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGFiLmV2ZW50VGFiV2lkZ2V0VGFiQ2xpY2tlZC5kZXRhY2godGhpcy5fdGFiQ2xpY2tlZEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0YWIuZXZlbnRUYWJXaWRnZXRUYWJXaGVlbENsaWNrZWQuZGV0YWNoKHRoaXMuX3RhYldoZWVsQ2xpY2tlZEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0YWIuZXZlbnRUYWJXaWRnZXRBY3RpdmVIaWRkZW4uZGV0YWNoKHRoaXMuX2FjdGl2ZVRhYkhpZGRlbkhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gdGFiSURcclxuICAgICAqIEBwYXJhbSB7Kn0gaWNvblBhdGhcclxuICAgICAqIEByZXR1cm5zIHtJVGFiV2lkZ2V0VGFifVxyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZEZsZXhpYmxlVGFiKHRhYklELGljb25QYXRoLCBkaXNwbGF5TmFtZSkgOiBJVGFiV2lkZ2V0VGFie1xyXG4gICAgICAgIGxldCBuZXdUYWI6IElUYWJXaWRnZXRUYWIgPSBuZXcgVGFiV2lkZ2V0RmxleFRhYigpO1xyXG4gICAgICAgIG5ld1RhYi5hcHBlbmRUYWJMYXlvdXQodGhpcy5tYWluRGl2LCB0aGlzLl9mbGV4aWJsZVRhYkNvbnRhaW5lcklkK1wiX2ZsZXhCb3hcIiwgdGFiSUQsIGRpc3BsYXlOYW1lKTtcclxuICAgICAgICBuZXdUYWIuc2V0SWNvbihpY29uUGF0aCk7XHJcblxyXG4gICAgICAgIGlmKG5ld1RhYi50YWJDb250YWluZXJJZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9mbGV4RHJvcERvd24uYWRkSXRlbVRvRHJvcGRvd24oZGlzcGxheU5hbWUsIG5ld1RhYi50YWJDb250YWluZXJJZCwgdGhpcy5tYWluRGl2SWQsIGljb25QYXRoKTsgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXdUYWI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHRhYk5hbWVcclxuICAgICAqIEBwYXJhbSB7Kn0gaWNvblBhdGhcclxuICAgICAqIEBwYXJhbSB7Kn0gd2lkZ2V0UG9zaXRpb25cclxuICAgICAqIEByZXR1cm5zIHtJVGFiV2lkZ2V0VGFifVxyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZEZpeGVkVGFiKHRhYk5hbWUsaWNvblBhdGgsIHdpZGdldFBvc2l0aW9uKSA6IElUYWJXaWRnZXRUYWJ7XHJcbiAgICAgICAgbGV0IG5ld1RhYjogSVRhYldpZGdldFRhYiA9IG5ldyBUYWJXaWRnZXRGaXhlZFRhYigpO1xyXG4gICAgICAgIG5ld1RhYi5hcHBlbmRUYWJMYXlvdXQodGhpcy5tYWluRGl2LCB3aWRnZXRQb3NpdGlvbiwgdGFiTmFtZSwgXCJcIik7XHJcbiAgICAgICAgbmV3VGFiLnNldEljb24oaWNvblBhdGgpO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3VGFiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkYXB0V2lkdGhPZkZsZXhUYWJCYXIoKXtcclxuICAgICAgICB0YWJXaWRnZXRGbGV4VGFiQXJlYVdpZHRoID0gXCJjYWxjKCAxMDAlIC0gNTRweCApXCI7XHJcbiAgICAgICAgdGFiV2lkZ2V0UmlnaHRUYWJBcmVhV2lkdGggPSBcImNhbGMoIDBweCArIDUxcHggKVwiO1xyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCEuc3R5bGUuc2V0UHJvcGVydHkoJy0tdGFiV2lkZ2V0RmxleFRhYkFyZWFXaWR0aCcsIHRhYldpZGdldEZsZXhUYWJBcmVhV2lkdGgpO1xyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCEuc3R5bGUuc2V0UHJvcGVydHkoJy0tdGFiV2lkZ2V0UmlnaHRUYWJBcmVhV2lkdGgnLCB0YWJXaWRnZXRSaWdodFRhYkFyZWFXaWR0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lUYWJXaWRnZXRUYWJ9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGV2ZW50QXJnc1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25BY3RpdmVUYWJIaWRkZW4oc2VuZGVyOiBJVGFiV2lkZ2V0VGFiLCBldmVudEFyZ3M6IG9iamVjdCk6IGFueSB7XHJcbiAgICAgICAgaWYoZXZlbnRBcmdzW1wiZXZlbnRUcmlnZ2VyXCJdID09IFwicmVzaXplXCIpe1xyXG4gICAgICAgICAgICBsZXQgbmV3SW5kZXggPSB0aGlzLmRhdGFNb2RlbC5nZXRGbGV4VGFiSW5kZXgoc2VuZGVyKS0xO1xyXG4gICAgICAgICAgICBpZihuZXdJbmRleCA+PSAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YU1vZGVsLnNldEZsZXhUYWJQb3NpdGlvbihuZXdJbmRleCwgc2VuZGVyKTtcclxuICAgICAgICAgICAgICAgIHNlbmRlci5pc1Zpc2libGUoZXZlbnRBcmdzW1wiZXZlbnRUcmlnZ2VyXCJdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFNb2RlbC5zZXRGbGV4VGFiUG9zaXRpb24oMCxzZW5kZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uVGFiQ2xpY2tlZChhcmdzKXtcclxuICAgICAgICB0aGlzLnNlbGVjdFRhYihhcmdzLnRhYk5hbWUpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblRhYldoZWVsQ2xpY2tlZChhcmdzKXtcclxuICAgICAgICB0aGlzLmNsb3NlVGFiKGFyZ3MsIHRydWUpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gdGFiTmFtZVxyXG4gICAgICogQHJldHVybnMge0lUYWJXaWRnZXRUYWJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHNlbGVjdFRhYih0YWJOYW1lKSA6IElUYWJXaWRnZXRUYWJ8dW5kZWZpbmVke1xyXG4gICAgICAgIGxldCB0YWJJZCA9IFwidGFiX1wiK3RhYk5hbWU7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkVGFiID0gdGhpcy5kYXRhTW9kZWwuZ2V0VGFiQnlJZCh0YWJJZCk7XHJcbiAgICAgICAgaWYgKHNlbGVjdGVkVGFiICE9IHVuZGVmaW5lZCAmJiAhc2VsZWN0ZWRUYWIuaXNBY3RpdmUpe1xyXG4gICAgICAgICAgICB0aGlzLl9mbGV4RHJvcERvd24uc2V0VGFiU2VsZWN0ZWQodGFiSWQpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRhYkFjdGl2ZShzZWxlY3RlZFRhYik7XHJcbiAgICAgICAgICAgIHRoaXMucmVzaXplVGFiKHNlbGVjdGVkVGFiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihzZWxlY3RlZFRhYiA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwic2VsZWN0ZWQgVGFiIGlzIG5vdCBkZWZpbmVkXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZWxlY3RlZFRhYjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVRhYldpZGdldFRhYn0gc2VsZWN0ZWRUYWJcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRUYWJBY3RpdmUoc2VsZWN0ZWRUYWI6IElUYWJXaWRnZXRUYWIpe1xyXG4gICAgICAgIHRoaXMuc2V0QWxsVGFic0luYWN0aXZlKCk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuZGF0YU1vZGVsLmdldEFjdGl2ZVRhYigpLndpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFNb2RlbC5nZXRBY3RpdmVUYWIoKS53aWRnZXQhLmRlYWN0aXZhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZWN0ZWRUYWIuc2V0QWN0aXZlKCk7XHJcbiAgICAgICAgaWYoc2VsZWN0ZWRUYWIud2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzZWxlY3RlZFRhYi53aWRnZXQuYWN0aXZhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kYXRhTW9kZWwuc2V0QWN0aXZlVGFiKHNlbGVjdGVkVGFiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVRhYldpZGdldFRhYn0gc2VsZWN0ZWRUYWJcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZXNpemVUYWIoc2VsZWN0ZWRUYWI6IElUYWJXaWRnZXRUYWIpe1xyXG4gICAgICAgIGlmKHNlbGVjdGVkVGFiLndpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBzZWxlY3RlZFRhYi53aWRnZXQhLnJlc2l6ZSh0aGlzLl9hY3R1YWxXaWR0aCwgdGhpcy5fYWN0dWFsSGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHNldEFsbFRhYnNJbmFjdGl2ZSgpe1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmRhdGFNb2RlbC5nZXRBbGxUYWJzKCkubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YU1vZGVsLmdldEFsbFRhYnMoKVtpXS5zZXREaXNwbGF5Tm9uZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFNb2RlbC5nZXRBbGxUYWJzKClbaV0ucmVtb3ZlU3R5bGVDbGFzc0FjdGl2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkFic29sdXRlVGFiU2VsZWN0ZWQoKXtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5kYXRhTW9kZWwuZ2V0QWxsVGFicygpLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFNb2RlbC5nZXRBbGxUYWJzKClbaV0ucmVtb3ZlU3R5bGVDbGFzc0FjdGl2ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJpZ2h0SGFuZFNpZGVCYXJCdXR0b25zID0gJChcIi5yaWdodEhhbmRTaWRlQmFyQnV0dG9uXCIpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCByaWdodEhhbmRTaWRlQmFyQnV0dG9ucy5sZW5ndGggOyBpKyspe1xyXG4gICAgICAgICAgICByaWdodEhhbmRTaWRlQmFyQnV0dG9uc1tpXS5jbGFzc05hbWUgPSByaWdodEhhbmRTaWRlQmFyQnV0dG9uc1tpXS5jbGFzc05hbWUucmVwbGFjZShcIiBhY3RpdmVcIiwgXCJcIik7XHJcbiAgICAgICAgICAgIHJpZ2h0SGFuZFNpZGVCYXJCdXR0b25zW2ldLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKVswXS5zcmMgPSByaWdodEhhbmRTaWRlQmFyQnV0dG9uc1tpXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJylbMF0uc3JjLnJlcGxhY2UoJ19hY3RpdmUuc3ZnJywgJy5zdmcnKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYWJzb2x1dGVUYWJzID0gJChcIi5hYnNvbHV0ZVRhYlwiKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcmlnaHRIYW5kU2lkZUJhckJ1dHRvbnMubGVuZ3RoIDsgaSsrKXtcclxuICAgICAgICAgICAgYWJzb2x1dGVUYWJzW2ldLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcmVzaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKXtcclxuXHJcbiAgICAgICAgdGhpcy5fYWN0dWFsV2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLl9hY3R1YWxIZWlnaHQgPSBoZWlnaHQ7XHJcblxyXG4gICAgICAgIC8vIFNldCBzaXplIG9mIHRhYiBjb250cm9sIGl0c2VsZlxyXG4gICAgICAgIHRoaXMubWFpbkRpdi5zdHlsZS53aWR0aCA9IHdpZHRoICsgXCJweFwiO1xyXG4gICAgICAgIHRoaXMubWFpbkRpdi5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyBcInB4XCI7XHJcbiAgICBcclxuXHJcbiAgICAgICAgdGhpcy5kYXRhTW9kZWwuZ2V0QWN0aXZlVGFiKCkuaXNWaXNpYmxlKFwicmVzaXplXCIpXHJcbiAgICAgICAgaWYodGhpcy5kYXRhTW9kZWwuZ2V0QWN0aXZlVGFiKCkud2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YU1vZGVsLmdldEFjdGl2ZVRhYigpLndpZGdldCEucmVzaXplKHdpZHRoLGhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZWxlY3RPdmVydmlldygpe1xyXG4gICAgICAgIGxldCBmaXhlZFRhYnMgPSB0aGlzLmRhdGFNb2RlbC5kYXRhLmZpeGVkVGFicztcclxuICAgICAgICBsZXQgb3ZlcnZpZXdJZCA9IGZpeGVkVGFic1tmaXhlZFRhYnMubGVuZ3RoLTFdLnRhYkNvbnRhaW5lcklkO1xyXG4gICAgICAgIG92ZXJ2aWV3SWQgPSBvdmVydmlld0lkLnJlcGxhY2UoXCJ0YWJfXCIsXCJcIik7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RUYWIob3ZlcnZpZXdJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lUYWJXaWRnZXRUYWJ9IHRhYlRvUmVtb3ZlXHJcbiAgICAgKiBAcGFyYW0geyp9IG1vdXNlV2hlZWxDbGlja2VkXHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVtb3ZlVGFiKHRhYlRvUmVtb3ZlOiBJVGFiV2lkZ2V0VGFiLCBtb3VzZVdoZWVsQ2xpY2tlZCl7XHJcbiAgICAgICAgaWYodGFiVG9SZW1vdmUgPT0gdGhpcy5kYXRhTW9kZWwuZ2V0QWN0aXZlVGFiKCkpe1xyXG4gICAgICAgICAgICBsZXQgZmxleFRhYkluZGV4ID0gdGhpcy5kYXRhTW9kZWwuZ2V0RmxleFRhYkluZGV4KHRhYlRvUmVtb3ZlKTtcclxuICAgICAgICAgICAgaWYoKHRoaXMuZGF0YU1vZGVsLmdldEZsZXhUYWJzKClbZmxleFRhYkluZGV4IC0gMV0pICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFRhYih0aGlzLmRhdGFNb2RlbC5nZXRGbGV4VGFicygpW2ZsZXhUYWJJbmRleCAtIDFdLnRhYk5hbWUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZigodGhpcy5kYXRhTW9kZWwuZ2V0RmxleFRhYnMoKVtmbGV4VGFiSW5kZXggKyAxXSkgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFiKHRoaXMuZGF0YU1vZGVsLmdldEZsZXhUYWJzKClbZmxleFRhYkluZGV4ICsgMV0udGFiTmFtZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RPdmVydmlldygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuZGF0YU1vZGVsLmRhdGEuZmxleFRhYnMuaW5kZXhPZih0YWJUb1JlbW92ZSwgMCk7XHJcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhTW9kZWwuZGF0YS5mbGV4VGFicy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9mbGV4RHJvcERvd24ucmVtb3ZlSXRlbUZyb21Ecm9wZG93bih0YWJUb1JlbW92ZS50YWJDb250YWluZXJJZCEsIG1vdXNlV2hlZWxDbGlja2VkKTtcclxuXHJcbiAgICAgICAgbGV0IHRhYkNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhYlRvUmVtb3ZlLnRhYkNvbnRhaW5lcklkISk7XHJcbiAgICAgICAgbGV0IHRhYkNvbnRhaW5lcnRhYiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhYlRvUmVtb3ZlLnRhYkNvbnRhaW5lcklkK1wiX3RhYlwiKTtcclxuXHJcbiAgICAgICAgdGFiQ29udGFpbmVydGFiIS5wYXJlbnROb2RlIS5yZW1vdmVDaGlsZCh0YWJDb250YWluZXJ0YWIhKTtcclxuICAgICAgICB0YWJDb250YWluZXIhLnBhcmVudE5vZGUhLnJlbW92ZUNoaWxkKHRhYkNvbnRhaW5lciEpO1xyXG4gICAgICAgIHRoaXMudW5yZWdpc3RlckV2ZW50c0ZvclRhYih0YWJUb1JlbW92ZSk7XHJcbiAgICAgICAgc3VwZXIucmVtb3ZlV2lkZ2V0KHRhYlRvUmVtb3ZlLndpZGdldCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBwYXJhbSB7Kn0gbW91c2VXaGVlbENsaWNrZWRcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjbG9zZVRhYihhcmdzLCBtb3VzZVdoZWVsQ2xpY2tlZCl7XHJcbiAgICAgICAgbGV0IHRhYlRvQ2xvc2UgPSB0aGlzLmRhdGFNb2RlbC5nZXRUYWJCeUlkKGFyZ3MudGFiTmFtZSk7ICAgXHJcbiAgICAgICAgaWYodGFiVG9DbG9zZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvL3RhYlRvQ2xvc2Uud2lkZ2V0LnNhdmVDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICBpZih0YWJUb0Nsb3NlLndpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgdGFiVG9DbG9zZS53aWRnZXQuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlVGFiKHRhYlRvQ2xvc2UsIG1vdXNlV2hlZWxDbGlja2VkKTtcclxuICAgICAgICB9ICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjbG9zZUFsbFRhYnMoYXJncyl7XHJcbiAgICAgICAgbGV0IHRhYnNUb0Nsb3NlID0gbmV3IEFycmF5KCk7XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmRhdGFNb2RlbC5nZXRGbGV4VGFicygpLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgdGFic1RvQ2xvc2UucHVzaCh0aGlzLmRhdGFNb2RlbC5nZXRGbGV4VGFicygpW2ldKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0YWJzVG9DbG9zZS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIHRhYnNUb0Nsb3NlW2ldLndpZGdldC5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlVGFiKHRhYnNUb0Nsb3NlW2ldLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2xvc2VBbGxUYWJzQnV0QWN0aXZlKGFyZ3Mpe1xyXG4gICAgICAgIGxldCB0YWJzVG9DbG9zZSA9IG5ldyBBcnJheSgpO1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5kYXRhTW9kZWwuZ2V0RmxleFRhYnMoKS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZGF0YU1vZGVsLmdldEZsZXhUYWJzKClbaV0gIT0gdGhpcy5kYXRhTW9kZWwuZ2V0QWN0aXZlVGFiKCkpe1xyXG4gICAgICAgICAgICAgICAgdGFic1RvQ2xvc2UucHVzaCh0aGlzLmRhdGFNb2RlbC5nZXRGbGV4VGFicygpW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGFic1RvQ2xvc2UubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICB0YWJzVG9DbG9zZVtpXS53aWRnZXQuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVRhYih0YWJzVG9DbG9zZVtpXSwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnQge1RhYldpZGdldH07Il19