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
define(["require", "exports", "../common/layoutWidgetBase", "../tabWidget/interfaces/tabWidgetInterface", "../common/viewTypeProvider", "../../framework/property", "../common/uniqueIdGenerator", "./componentDefaultDefinition", "../../common/componentBase/contextIds/ctxComponentView", "../../common/componentBase/componentContext"], function (require, exports, layoutWidgetBase_1, tabWidgetInterface_1, viewTypeProvider_1, property_1, uniqueIdGenerator_1, componentDefaultDefinition_1, ctxComponentView_1, componentContext_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MainNavigationWidget = /** @class */ (function (_super) {
        __extends(MainNavigationWidget, _super);
        function MainNavigationWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._sideBarMap = {};
            return _this;
        }
        MainNavigationWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
            this.component.disablePersisting();
        };
        /**
         * Dispose the MainNavigationWidget
         *
         * @memberof MainNavigationWidget
         */
        MainNavigationWidget.prototype.dispose = function () {
            // Dispose widgets
            var keys = Object.keys(this._sideBarMap);
            for (var i = 0; i < keys.length; i++) {
                var sideBarObj = this._sideBarMap[keys[i]];
                if (sideBarObj != undefined) {
                    sideBarObj.dispose();
                }
            }
            if (this.sideBarWidget != undefined) {
                this.sideBarWidget.dispose();
            }
            _super.prototype.dispose.call(this);
        };
        /**
         * Adds SideBar to given Container
         *
         * @memberof MainNavigationWidget
         */
        MainNavigationWidget.prototype.createLayout = function () {
            this.sideBarWidget = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.SideBarWidgetId);
            this.sideBarWidget.initialize();
            // add widget to the parent container
            this.sideBarWidget.addToParentContainer(this.mainDiv);
        };
        /**
         *Resize
         *
         * @param {number} width
         * @param {number} height
         * @memberof MainNavigationWidget
         */
        MainNavigationWidget.prototype.resize = function (width, height) {
            this._actualWidth = width;
            this._actualHeight = height;
            if (this.sideBarWidget != undefined) {
                this.sideBarWidget.resize(width, height);
            }
        };
        /**
         *Select Tab in Tabwidget
         *
         * @param {string} parent
         * @param {string} tabname
         * @param {ViewType} viewType
         * @memberof MainNavigationWidget
         */
        MainNavigationWidget.prototype.selectTab = function (parent, tabname, viewType) {
            var tabId = tabname + "_" + viewType.toString();
            tabId = uniqueIdGenerator_1.UniqueIdGenerator.getInstance().getUniqueIdFromString(tabId);
            this._sideBarMap[parent].selectTab(tabId);
            this.sideBarWidget.switchTab("tab_" + parent, parent + "_" + viewTypeProvider_1.ViewType.SideBarTab);
        };
        /**
         * Add Widget to SideBarTabs TabWidget
         *
         * @param {IWidget} widget
         * @param {string} tabName
         * @param {ViewType} viewType
         * @param {*} data
         * @memberof MainNavigationWidget
         */
        MainNavigationWidget.prototype.addWidget = function (widget, tabName, viewType, data) {
            this._sideBarMap[data["parent"]].addWidget(widget, tabName, viewType, data);
        };
        /**
         * Add Tab to SideBar
         *
         * @param {string} name
         * @param {string} iconPath
         * @returns {ITabWidget}
         * @memberof MainNavigationWidget
         */
        MainNavigationWidget.prototype.addSideBarTab = function (name, iconPath) {
            var newTabWidget = this.component.addSubComponent("TabWidget", "TabWidget_" + name, "", this.component.context);
            this.sideBarWidget.addWidget(newTabWidget, name, viewTypeProvider_1.ViewType.SideBarTab, iconPath);
            this._sideBarMap[name] = newTabWidget;
            return newTabWidget;
        };
        /**
         * Add UserWidget to SideBarTabs TabWidget
         *
         * @param {Widgets.ILoginWidget} loginWidget
         * @param {*} data
         * @memberof MainNavigationWidget
         */
        MainNavigationWidget.prototype.addUserWidget = function (loginWidget, data) {
            this._sideBarMap[data["parent"]].addWidget(loginWidget, data["parent"] + "_LoginView", viewTypeProvider_1.ViewType.User, { widgetPosition: tabWidgetInterface_1.TabWidgetWidgetPositons.right });
        };
        /**
         * Add ViewInstance of specific type
         *
         * @param {string} parent
         * @param {MappCockpitComponent} component
         * @param {ViewType} viewType
         * @param {boolean} select
         * @memberof MainNavigationWidget
         */
        MainNavigationWidget.prototype.addView = function (parent, component, viewType, select) {
            var tabWidget = this._sideBarMap[parent];
            if (!this.componentAlreadyOpen(tabWidget, component.displayName, viewType)) {
                var activeComponentLink = property_1.Property.create({});
                activeComponentLink.value = component;
                var widget = this.createWidgetForViewType(viewType, component.browseName);
                if (widget != undefined) {
                    tabWidget.addWidget(widget, component.displayName, viewType, { widgetPosition: tabWidgetInterface_1.TabWidgetWidgetPositons.flex });
                    // activeComponent must be set after addWidget(=> add widget initializes the widget data fully, which will be needed)
                    widget.activeComponent = activeComponentLink;
                }
            }
            if (select) {
                this.selectTab(parent, component.displayName, viewType);
            }
        };
        /**
         * Creates and returns a widget for the given viewType
         *
         * @private
         * @param {ViewType} viewType
         * @returns {(IWidget|undefined)}
         * @memberof MainNavigationWidget
         */
        MainNavigationWidget.prototype.createWidgetForViewType = function (viewType, contextComponentId) {
            var componentType = viewTypeProvider_1.ViewTypeProvider.getInstance().getComponentTypeForViewType(viewType);
            var componentId = viewTypeProvider_1.ViewTypeProvider.getInstance().getDefaultComponentIdForViewType(viewType);
            if (componentType != "" && componentId != "") {
                var context = new componentContext_1.ComponentContext();
                context.data.set(ctxComponentView_1.CtxComponentView.componentId, contextComponentId);
                return this.component.addSubComponent(componentType, componentId, "", context);
            }
            return undefined;
        };
        /**
         * Test if view of component ist already open
         *
         * @private
         * @param {*} tabWidget
         * @param {string} componentName
         * @param {string} viewType
         * @returns {boolean}
         * @memberof MainNavigationWidget
         */
        MainNavigationWidget.prototype.componentAlreadyOpen = function (tabWidget, componentName, viewType) {
            var tabs = tabWidget.dataModel.data.flexTabs;
            var componentAlreadyOpen = false;
            tabs.forEach(function (tab) {
                var tabId = uniqueIdGenerator_1.UniqueIdGenerator.getInstance().getUniqueIdFromString(componentName + "_" + viewType);
                if (tab.tabName == tabId) {
                    componentAlreadyOpen = true;
                }
            });
            return componentAlreadyOpen;
        };
        return MainNavigationWidget;
    }(layoutWidgetBase_1.LayoutWidgetBase));
    exports.MainNavigationWidget = MainNavigationWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbk5hdmlnYXRpb25XaWRnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvbWFpbk5hdmlnYXRpb25XaWRnZXQvbWFpbk5hdmlnYXRpb25XaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQWVBO1FBQW1DLHdDQUFnQjtRQUFuRDtZQUFBLHFFQXNMQztZQW5MVyxpQkFBVyxHQUFtQyxFQUFFLENBQUM7O1FBbUw3RCxDQUFDO1FBakxHLGtEQUFtQixHQUFuQjtZQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsSUFBSSx1REFBMEIsRUFBRSxDQUFDLENBQUM7WUFDdEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3ZDLENBQUM7UUFFRDs7OztXQUlHO1FBQ0gsc0NBQU8sR0FBUDtZQUNJLGtCQUFrQjtZQUNsQixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN6QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDbEMsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0MsSUFBRyxVQUFVLElBQUksU0FBUyxFQUFDO29CQUN2QixVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7aUJBQ3hCO2FBQ0o7WUFFRCxJQUFHLElBQUksQ0FBQyxhQUFhLElBQUksU0FBUyxFQUFDO2dCQUMvQixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ2hDO1lBQ0QsaUJBQU0sT0FBTyxXQUFFLENBQUM7UUFDcEIsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCwyQ0FBWSxHQUFaO1lBQ0ks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QUFDLENBQUM7Z0JBQ25FLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFZLENBQUM7YUFDN0Y7WUFDRCxPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBRUQ7Ozs7Ozs7OztXQVNHO1FBQ0ssbURBQW9CLEdBQTVCLFVBQTZCLFNBQVMsRUFBRSxhQUFxQixFQUFFLFFBQWtCO1lBQzdFLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUM3QyxJQUFJLG9CQUFvQixHQUFHLEtBQUssQ0FBQztZQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRztnQkFDWixJQUFJLEtBQUssR0FBRyxxQ0FBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxhQUFhLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQyxDQUFDO2dCQUNsRyxJQUFHLEdBQUcsQ0FBQyxPQUFPLElBQUksS0FBSyxFQUFDO29CQUNwQixvQkFBb0IsR0FBRyxJQUFJLENBQUM7aUJBQy9CO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLG9CQUFvQixDQUFDO1FBQ2hDLENBQUM7UUFDTCwyQkFBQztJQUFELENBQUMsQUF0TEQsQ0FBbUMsbUNBQWdCLEdBc0xsRDtJQUNPLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExheW91dFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL2xheW91dFdpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgSU1haW5OYXZpZ2F0aW9uV2lkZ2V0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9tYWluTmF2aWdhdGlvbldpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgKiBhcyBXaWRnZXRzIGZyb20gXCIuLi8uLi93aWRnZXRzL3dpZGdldHNcIjtcclxuaW1wb3J0IHsgSVdpZGdldCB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy93aWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVRhYldpZGdldCB9IGZyb20gXCIuLi90YWJXaWRnZXQvaW50ZXJmYWNlcy90YWJXaWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVGFiV2lkZ2V0V2lkZ2V0UG9zaXRvbnMgfSBmcm9tIFwiLi4vdGFiV2lkZ2V0L2ludGVyZmFjZXMvdGFiV2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTaWRlQmFyV2lkZ2V0IH0gZnJvbSBcIi4uL3NpZGVCYXJXaWRnZXQvaW50ZXJmYWNlcy9zaWRlQmFyV2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFZpZXdUeXBlLCBWaWV3VHlwZVByb3ZpZGVyIH0gZnJvbSBcIi4uL2NvbW1vbi92aWV3VHlwZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFByb3BlcnR5IH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9wcm9wZXJ0eVwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFVuaXF1ZUlkR2VuZXJhdG9yIH0gZnJvbSBcIi4uL2NvbW1vbi91bmlxdWVJZEdlbmVyYXRvclwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbiB9IGZyb20gXCIuL2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IEN0eENvbXBvbmVudFZpZXcgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29udGV4dElkcy9jdHhDb21wb25lbnRWaWV3XCI7XHJcbmltcG9ydCB7IENvbXBvbmVudENvbnRleHQgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50Q29udGV4dFwiO1xyXG5cclxuY2xhc3MgTWFpbk5hdmlnYXRpb25XaWRnZXQgZXh0ZW5kcyBMYXlvdXRXaWRnZXRCYXNlIGltcGxlbWVudHMgSU1haW5OYXZpZ2F0aW9uV2lkZ2V0e1xyXG4gICAgc2lkZUJhcldpZGdldCEgOiBJU2lkZUJhcldpZGdldDtcclxuXHJcbiAgICBwcml2YXRlIF9zaWRlQmFyTWFwOiB7IFtpZDogc3RyaW5nXSA6IElUYWJXaWRnZXQ7IH0gPSB7fTtcclxuXHJcbiAgICBpbml0aWFsaXplQ29tcG9uZW50KCl7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0RGVmYXVsdERlZmluaXRpb24obmV3IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uKCkpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRpc2FibGVQZXJzaXN0aW5nKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZSB0aGUgTWFpbk5hdmlnYXRpb25XaWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFpbk5hdmlnYXRpb25XaWRnZXRcclxuICAgICAqL1xyXG4gICAgZGlzcG9zZSgpe1xyXG4gICAgICAgIC8vIERpc3Bvc2Ugd2lkZ2V0c1xyXG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXModGhpcy5fc2lkZUJhck1hcCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzaWRlQmFyT2JqID0gdGhpcy5fc2lkZUJhck1hcFtrZXlzW2ldXTtcclxuICAgICAgICAgICAgaWYoc2lkZUJhck9iaiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgc2lkZUJhck9iai5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5zaWRlQmFyV2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2lkZUJhcldpZGdldC5kaXNwb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgU2lkZUJhciB0byBnaXZlbiBDb250YWluZXJcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFpbk5hdmlnYXRpb25XaWRnZXRcclxuICAgICAqL1xyXG4gICAgY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgICAgIHRoaXMuc2lkZUJhcldpZGdldCA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5TaWRlQmFyV2lkZ2V0SWQpIGFzIFdpZGdldHMuSVNpZGVCYXJXaWRnZXQ7XHJcbiAgICAgICAgdGhpcy5zaWRlQmFyV2lkZ2V0LmluaXRpYWxpemUoKTsgICAgXHJcbiAgICAgICAgLy8gYWRkIHdpZGdldCB0byB0aGUgcGFyZW50IGNvbnRhaW5lclxyXG4gICAgICAgIHRoaXMuc2lkZUJhcldpZGdldC5hZGRUb1BhcmVudENvbnRhaW5lcih0aGlzLm1haW5EaXYpO1xyXG4gICAgfSAgICBcclxuXHJcbiAgICAvKipcclxuICAgICAqUmVzaXplXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFpbk5hdmlnYXRpb25XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcmVzaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLl9hY3R1YWxXaWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbEhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICBpZih0aGlzLnNpZGVCYXJXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5zaWRlQmFyV2lkZ2V0IS5yZXNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpTZWxlY3QgVGFiIGluIFRhYndpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXJlbnRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0YWJuYW1lXHJcbiAgICAgKiBAcGFyYW0ge1ZpZXdUeXBlfSB2aWV3VHlwZVxyXG4gICAgICogQG1lbWJlcm9mIE1haW5OYXZpZ2F0aW9uV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHNlbGVjdFRhYihwYXJlbnQ6IHN0cmluZywgdGFibmFtZTogc3RyaW5nLCB2aWV3VHlwZTogVmlld1R5cGUpe1xyXG4gICAgICAgIGxldCB0YWJJZCA9IHRhYm5hbWUgKyBcIl9cIiArIHZpZXdUeXBlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdGFiSWQgPSBVbmlxdWVJZEdlbmVyYXRvci5nZXRJbnN0YW5jZSgpLmdldFVuaXF1ZUlkRnJvbVN0cmluZyh0YWJJZCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3NpZGVCYXJNYXBbcGFyZW50XS5zZWxlY3RUYWIodGFiSWQpO1xyXG4gICAgICAgIHRoaXMuc2lkZUJhcldpZGdldC5zd2l0Y2hUYWIoXCJ0YWJfXCIrcGFyZW50LCBwYXJlbnQrIFwiX1wiICsgVmlld1R5cGUuU2lkZUJhclRhYik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgV2lkZ2V0IHRvIFNpZGVCYXJUYWJzIFRhYldpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVdpZGdldH0gd2lkZ2V0XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGFiTmFtZVxyXG4gICAgICogQHBhcmFtIHtWaWV3VHlwZX0gdmlld1R5cGVcclxuICAgICAqIEBwYXJhbSB7Kn0gZGF0YVxyXG4gICAgICogQG1lbWJlcm9mIE1haW5OYXZpZ2F0aW9uV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGFkZFdpZGdldCh3aWRnZXQ6IElXaWRnZXQsIHRhYk5hbWU6IHN0cmluZywgdmlld1R5cGU6IFZpZXdUeXBlLCBkYXRhIDogYW55KXtcclxuICAgICAgICB0aGlzLl9zaWRlQmFyTWFwW2RhdGFbXCJwYXJlbnRcIl1dLmFkZFdpZGdldCh3aWRnZXQsdGFiTmFtZSx2aWV3VHlwZSxkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBUYWIgdG8gU2lkZUJhclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWNvblBhdGhcclxuICAgICAqIEByZXR1cm5zIHtJVGFiV2lkZ2V0fVxyXG4gICAgICogQG1lbWJlcm9mIE1haW5OYXZpZ2F0aW9uV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGFkZFNpZGVCYXJUYWIobmFtZTogc3RyaW5nLCBpY29uUGF0aDogc3RyaW5nKSA6IElUYWJXaWRnZXR7XHJcbiAgICAgICAgbGV0IG5ld1RhYldpZGdldCA9IHRoaXMuY29tcG9uZW50LmFkZFN1YkNvbXBvbmVudChcIlRhYldpZGdldFwiLCBcIlRhYldpZGdldF9cIiArIG5hbWUsIFwiXCIsIHRoaXMuY29tcG9uZW50LmNvbnRleHQpIGFzIElUYWJXaWRnZXQ7XHJcbiAgICAgICAgdGhpcy5zaWRlQmFyV2lkZ2V0LmFkZFdpZGdldChuZXdUYWJXaWRnZXQsIG5hbWUsIFZpZXdUeXBlLlNpZGVCYXJUYWIsIGljb25QYXRoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fc2lkZUJhck1hcFtuYW1lXSA9IG5ld1RhYldpZGdldDtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ld1RhYldpZGdldDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBVc2VyV2lkZ2V0IHRvIFNpZGVCYXJUYWJzIFRhYldpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7V2lkZ2V0cy5JTG9naW5XaWRnZXR9IGxvZ2luV2lkZ2V0XHJcbiAgICAgKiBAcGFyYW0geyp9IGRhdGFcclxuICAgICAqIEBtZW1iZXJvZiBNYWluTmF2aWdhdGlvbldpZGdldFxyXG4gICAgICovXHJcbiAgICBhZGRVc2VyV2lkZ2V0KGxvZ2luV2lkZ2V0OiBXaWRnZXRzLklMb2dpbldpZGdldCwgZGF0YSA6IGFueSl7XHJcbiAgICAgICAgdGhpcy5fc2lkZUJhck1hcFtkYXRhW1wicGFyZW50XCJdXS5hZGRXaWRnZXQobG9naW5XaWRnZXQsIGRhdGFbXCJwYXJlbnRcIl0gKyBcIl9Mb2dpblZpZXdcIiwgVmlld1R5cGUuVXNlciwge3dpZGdldFBvc2l0aW9uOiBUYWJXaWRnZXRXaWRnZXRQb3NpdG9ucy5yaWdodH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIFZpZXdJbnN0YW5jZSBvZiBzcGVjaWZpYyB0eXBlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhcmVudFxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudH0gY29tcG9uZW50XHJcbiAgICAgKiBAcGFyYW0ge1ZpZXdUeXBlfSB2aWV3VHlwZVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBzZWxlY3RcclxuICAgICAqIEBtZW1iZXJvZiBNYWluTmF2aWdhdGlvbldpZGdldFxyXG4gICAgICovXHJcbiAgICBhZGRWaWV3KHBhcmVudDogc3RyaW5nLCBjb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50LCB2aWV3VHlwZTogVmlld1R5cGUsIHNlbGVjdDogYm9vbGVhbil7XHJcbiAgICAgICAgbGV0IHRhYldpZGdldCA9IHRoaXMuX3NpZGVCYXJNYXBbcGFyZW50XTtcclxuICAgIFxyXG4gICAgICAgIGlmKCF0aGlzLmNvbXBvbmVudEFscmVhZHlPcGVuKHRhYldpZGdldCwgY29tcG9uZW50LmRpc3BsYXlOYW1lLCB2aWV3VHlwZSkpe1xyXG4gICAgICAgICAgICBsZXQgYWN0aXZlQ29tcG9uZW50TGluazogUHJvcGVydHk8TWFwcENvY2twaXRDb21wb25lbnQ+ID0gUHJvcGVydHkuY3JlYXRlPE1hcHBDb2NrcGl0Q29tcG9uZW50Pig8YW55Pnt9KTtcclxuICAgICAgICAgICAgYWN0aXZlQ29tcG9uZW50TGluay52YWx1ZSA9IGNvbXBvbmVudDtcclxuICAgICAgICAgICAgbGV0IHdpZGdldCA9IHRoaXMuY3JlYXRlV2lkZ2V0Rm9yVmlld1R5cGUodmlld1R5cGUsIGNvbXBvbmVudC5icm93c2VOYW1lKTtcclxuICAgICAgICAgICAgaWYod2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB0YWJXaWRnZXQuYWRkV2lkZ2V0KHdpZGdldCwgY29tcG9uZW50LmRpc3BsYXlOYW1lLCB2aWV3VHlwZSwge3dpZGdldFBvc2l0aW9uOiBUYWJXaWRnZXRXaWRnZXRQb3NpdG9ucy5mbGV4fSk7XHJcbiAgICAgICAgICAgICAgICAvLyBhY3RpdmVDb21wb25lbnQgbXVzdCBiZSBzZXQgYWZ0ZXIgYWRkV2lkZ2V0KD0+IGFkZCB3aWRnZXQgaW5pdGlhbGl6ZXMgdGhlIHdpZGdldCBkYXRhIGZ1bGx5LCB3aGljaCB3aWxsIGJlIG5lZWRlZClcclxuICAgICAgICAgICAgICAgICg8YW55PndpZGdldCkuYWN0aXZlQ29tcG9uZW50ID0gYWN0aXZlQ29tcG9uZW50TGluaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzZWxlY3Qpe1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdFRhYihwYXJlbnQsIGNvbXBvbmVudC5kaXNwbGF5TmFtZSwgdmlld1R5cGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW5kIHJldHVybnMgYSB3aWRnZXQgZm9yIHRoZSBnaXZlbiB2aWV3VHlwZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1ZpZXdUeXBlfSB2aWV3VHlwZVxyXG4gICAgICogQHJldHVybnMgeyhJV2lkZ2V0fHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFpbk5hdmlnYXRpb25XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVXaWRnZXRGb3JWaWV3VHlwZSh2aWV3VHlwZTogVmlld1R5cGUsIGNvbnRleHRDb21wb25lbnRJZDogc3RyaW5nKTogSVdpZGdldHx1bmRlZmluZWR7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudFR5cGUgPSBWaWV3VHlwZVByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0Q29tcG9uZW50VHlwZUZvclZpZXdUeXBlKHZpZXdUeXBlKTtcclxuICAgICAgICBsZXQgY29tcG9uZW50SWQgPSBWaWV3VHlwZVByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0RGVmYXVsdENvbXBvbmVudElkRm9yVmlld1R5cGUodmlld1R5cGUpO1xyXG4gICAgICAgIGlmKGNvbXBvbmVudFR5cGUgIT0gXCJcIiAmJiBjb21wb25lbnRJZCAhPSBcIlwiKXtcclxuICAgICAgICAgICAgbGV0IGNvbnRleHQgPSBuZXcgQ29tcG9uZW50Q29udGV4dCgpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmRhdGEuc2V0KEN0eENvbXBvbmVudFZpZXcuY29tcG9uZW50SWQsIGNvbnRleHRDb21wb25lbnRJZCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudC5hZGRTdWJDb21wb25lbnQoY29tcG9uZW50VHlwZSwgY29tcG9uZW50SWQsIFwiXCIsIGNvbnRleHQpIGFzIElXaWRnZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUZXN0IGlmIHZpZXcgb2YgY29tcG9uZW50IGlzdCBhbHJlYWR5IG9wZW5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSB0YWJXaWRnZXRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnROYW1lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmlld1R5cGVcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIE1haW5OYXZpZ2F0aW9uV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29tcG9uZW50QWxyZWFkeU9wZW4odGFiV2lkZ2V0LCBjb21wb25lbnROYW1lOiBzdHJpbmcsIHZpZXdUeXBlOiBWaWV3VHlwZSk6IGJvb2xlYW57XHJcbiAgICAgICAgbGV0IHRhYnMgPSB0YWJXaWRnZXQuZGF0YU1vZGVsLmRhdGEuZmxleFRhYnM7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudEFscmVhZHlPcGVuID0gZmFsc2U7XHJcbiAgICAgICAgdGFicy5mb3JFYWNoKHRhYiA9PiB7XHJcbiAgICAgICAgICAgIGxldCB0YWJJZCA9IFVuaXF1ZUlkR2VuZXJhdG9yLmdldEluc3RhbmNlKCkuZ2V0VW5pcXVlSWRGcm9tU3RyaW5nKGNvbXBvbmVudE5hbWUgKyBcIl9cIiArIHZpZXdUeXBlKTtcclxuICAgICAgICAgICAgaWYodGFiLnRhYk5hbWUgPT0gdGFiSWQpe1xyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50QWxyZWFkeU9wZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEFscmVhZHlPcGVuO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB7TWFpbk5hdmlnYXRpb25XaWRnZXR9Il19