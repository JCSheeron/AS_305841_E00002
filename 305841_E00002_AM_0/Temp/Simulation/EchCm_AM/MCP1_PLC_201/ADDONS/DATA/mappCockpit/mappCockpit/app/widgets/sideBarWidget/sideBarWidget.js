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
define(["require", "exports", "../common/layoutWidgetBase", "../../framework/events", "../common/viewTypeProvider", "../common/uniqueIdGenerator"], function (require, exports, layoutWidgetBase_1, events_1, viewTypeProvider_1, uniqueIdGenerator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventWidgetActivated = /** @class */ (function (_super) {
        __extends(EventWidgetActivated, _super);
        function EventWidgetActivated() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventWidgetActivated;
    }(events_1.TypedEvent));
    ;
    var EventSizeChanged = /** @class */ (function (_super) {
        __extends(EventSizeChanged, _super);
        function EventSizeChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventSizeChanged;
    }(events_1.TypedEvent));
    ;
    var mainNavigationClassName = "mainNavigation";
    exports.mainNavigationClassName = mainNavigationClassName;
    var SideBarWidget = /** @class */ (function (_super) {
        __extends(SideBarWidget, _super);
        function SideBarWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // Events
            _this.eventWidgetActivated = new EventWidgetActivated();
            _this.eventSizeChanged = new EventSizeChanged();
            return _this;
        }
        SideBarWidget.prototype.initializeComponent = function () {
            this.component.disablePersisting();
        };
        /**
         * Creates the layout of the widget
         *
         * @memberof SideBarWidget
         */
        SideBarWidget.prototype.createLayout = function () {
            // Create the tab widget
            var tabLayout = "\n            <div class=\"" + mainNavigationClassName + "\">    \n            </div>\n            ";
            $(this.mainDiv).append(tabLayout);
        };
        /**
         * Loads the styles for the sidebar widget
         *
         * @memberof SideBarWidget
         */
        SideBarWidget.prototype.loadStyles = function () {
            _super.prototype.addStyle.call(this, "widgets/sideBarWidget/style/css/sideBarWidgetStyle.css");
            _super.prototype.addStyle.call(this, "widgets/sideBarWidget/style/css/sideBarWidgetStyleVariables.css");
        };
        /**
         *
         *
         * @param {*} evt
         * @param {*} outerTabId
         * @param {*} tabId
         * @memberof SideBarWidget
         */
        SideBarWidget.prototype.switchTab = function (outerTabId, tabId) {
            var i, tabcontent, tablinks;
            var button = document.getElementById(outerTabId + "_button");
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
                tablinks[i].getElementsByTagName('img')[0].src = tablinks[i].getElementsByTagName('img')[0].src.replace('_active.svg', '.svg');
            }
            tabId = uniqueIdGenerator_1.UniqueIdGenerator.getInstance().getUniqueIdFromString(tabId);
            var tabWidget = this._widgets.get(tabId);
            if (this._activeWidget != undefined && this._activeWidget != tabWidget) {
                this._activeWidget.deactivate();
                if (tabWidget != undefined) {
                    tabWidget.activate();
                }
            }
            this._activeWidget = tabWidget;
            var tabElement = document.getElementById(outerTabId);
            tabElement.style.display = "block";
            if (button.className.indexOf("active") < 0) {
                button.className += " active";
                button.getElementsByTagName('img')[0].src = button.getElementsByTagName('img')[0].src.replace(/(\.[\w\d_-]+)$/i, '_active.svg');
            }
            this.resize(this._actualWidth, this._actualHeight);
        };
        /**
         *
         *
         * @param {number} width
         * @param {number} height
         * @memberof SideBarWidget
         */
        SideBarWidget.prototype.resize = function (width, height) {
            // Set size of tab control itself
            this._actualWidth = width;
            this._actualHeight = height;
            this.mainDiv.style.width = width + "px";
            this.mainDiv.style.height = height + "px";
            // Set the sizes of the contents of this tab control
            var innerTabWidth = width - 48; // 48px sidebar on the left
            var innerTabHeight = height - 50; // 50px topbar 
            this._widgets.forEach(function (widget) {
                if (widget != undefined) {
                    widget.resize(innerTabWidth, innerTabHeight);
                }
            });
        };
        /**
         *
         *
         * @param {IWidget} widget
         * @param {string} name
         * @param {ViewType} viewType
         * @param {string} iconPath
         * @memberof SideBarWidget
         */
        SideBarWidget.prototype.addWidget = function (widget, name, viewType, iconPath) {
            var _this = this;
            name = name;
            _super.prototype.addWidget.call(this, widget, name, viewType);
            // Add a tab item
            var outerTabId = "tab_" + name.replace(" ", "");
            var innerTabId = "inner_" + outerTabId;
            var buttonClass = "";
            var outerTabClass = "";
            if (viewType == viewTypeProvider_1.ViewType.User) {
                buttonClass = "rightHandSideBarButton";
                outerTabClass = "absoluteTab";
            }
            var themedIconPath = this.getThemedFilePath(iconPath);
            var navButton = "<button id=\"" + outerTabId + "_button\" class=\"icon48 tablinks " + buttonClass + "\"><img src=\"" + themedIconPath + "\"></img></button>";
            $("." + mainNavigationClassName).append(navButton);
            var outerTab = "<div id=\"" + outerTabId + "\" class=\"tabcontent " + outerTabClass + "\" ></div>";
            $(this.mainDiv).append(outerTab);
            var outerTabObj = $(this.mainDiv).find("#" + outerTabId);
            var innerTab = "<div id=\"" + innerTabId + "\"></div>";
            outerTabObj.append(innerTab);
            widget.initialize();
            // add widget to the parent container
            widget.addToParentContainerId(innerTabId);
            var tabId = name + "_" + viewType;
            var outerTabButtonObj = $(this.mainDiv).find("#" + outerTabId + "_button");
            outerTabButtonObj[0].addEventListener("click", function (e) { return _this.switchTab(outerTabId, tabId); });
        };
        return SideBarWidget;
    }(layoutWidgetBase_1.LayoutWidgetBase));
    exports.SideBarWidget = SideBarWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZUJhcldpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9zaWRlQmFyV2lkZ2V0L3NpZGVCYXJXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVFBO1FBQW1DLHdDQUEwQztRQUE3RTs7UUFBK0UsQ0FBQztRQUFELDJCQUFDO0lBQUQsQ0FBQyxBQUFoRixDQUFtQyxtQkFBVSxHQUFtQztJQUFBLENBQUM7SUFDakY7UUFBK0Isb0NBQXNCO1FBQXJEOztRQUF1RCxDQUFDO1FBQUQsdUJBQUM7SUFBRCxDQUFDLEFBQXhELENBQStCLG1CQUFVLEdBQWU7SUFBQSxDQUFDO0lBR3pELElBQU0sdUJBQXVCLEdBQUcsZ0JBQWdCLENBQUM7SUF5SjNCLDBEQUF1QjtJQXZKN0M7UUFBNEIsaUNBQWdCO1FBQTVDO1lBQUEscUVBc0pDO1lBcEpHLFNBQVM7WUFDVCwwQkFBb0IsR0FBRyxJQUFJLG9CQUFvQixFQUFFLENBQUM7WUFDbEQsc0JBQWdCLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDOztRQWtKOUMsQ0FBQztRQTNJRywyQ0FBbUIsR0FBbkI7WUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDdkMsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCxvQ0FBWSxHQUFaO1lBQ0ksd0JBQXdCO1lBQ3hCLElBQUksU0FBUyxHQUFVLDZCQUNOLEdBQUMsdUJBQXVCLEdBQUMsMkNBRXJDLENBQUM7WUFDRixDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxQyxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILGtDQUFVLEdBQVY7WUFDSSxpQkFBTSxRQUFRLFlBQUMsd0RBQXdELENBQUMsQ0FBQztZQUN6RSxpQkFBTSxRQUFRLFlBQUMsaUVBQWlFLENBQUMsQ0FBQztRQUN0RixD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QTRCLG1DQUFnQixHQXNKM0M7SUFDTSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExheW91dFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL2xheW91dFdpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IEV2ZW50V2lkZ2V0QWN0aXZhdGVkQXJncyB9IGZyb20gXCIuLi9jb21tb24vZXZlbnRXaWRnZXRBY3RpdmF0ZWRBcmdzXCI7XHJcbmltcG9ydCB7IElXaWRnZXQgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvd2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTaWRlQmFyV2lkZ2V0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9zaWRlQmFyV2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFZpZXdUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi92aWV3VHlwZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFVuaXF1ZUlkR2VuZXJhdG9yIH0gZnJvbSBcIi4uL2NvbW1vbi91bmlxdWVJZEdlbmVyYXRvclwiO1xyXG5cclxuY2xhc3MgRXZlbnRXaWRnZXRBY3RpdmF0ZWQgZXh0ZW5kcyBUeXBlZEV2ZW50PG51bGwsIEV2ZW50V2lkZ2V0QWN0aXZhdGVkQXJncz57IH07XHJcbmNsYXNzIEV2ZW50U2l6ZUNoYW5nZWQgZXh0ZW5kcyBUeXBlZEV2ZW50PG51bGwsIG51bGw+eyB9O1xyXG5cclxuXHJcbmNvbnN0IG1haW5OYXZpZ2F0aW9uQ2xhc3NOYW1lID0gXCJtYWluTmF2aWdhdGlvblwiO1xyXG5cclxuY2xhc3MgU2lkZUJhcldpZGdldCBleHRlbmRzIExheW91dFdpZGdldEJhc2UgaW1wbGVtZW50cyBJU2lkZUJhcldpZGdldHtcclxuICAgIFxyXG4gICAgLy8gRXZlbnRzXHJcbiAgICBldmVudFdpZGdldEFjdGl2YXRlZCA9IG5ldyBFdmVudFdpZGdldEFjdGl2YXRlZCgpO1xyXG4gICAgZXZlbnRTaXplQ2hhbmdlZCA9IG5ldyBFdmVudFNpemVDaGFuZ2VkKCk7XHJcblxyXG4gICAgX2FjdHVhbFdpZHRoO1xyXG4gICAgX2FjdHVhbEhlaWdodDtcclxuXHJcbiAgICBwcml2YXRlIF9hY3RpdmVXaWRnZXQ/IDogSVdpZGdldDtcclxuICAgICBcclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kaXNhYmxlUGVyc2lzdGluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgbGF5b3V0IG9mIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lkZUJhcldpZGdldFxyXG4gICAgICovXHJcbiAgICBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSB0YWIgd2lkZ2V0XHJcbiAgICAgICAgbGV0IHRhYkxheW91dDogc3RyaW5nID1gXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJgK21haW5OYXZpZ2F0aW9uQ2xhc3NOYW1lK2BcIj4gICAgXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICAkKHRoaXMubWFpbkRpdikuYXBwZW5kKHRhYkxheW91dCk7ICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyB0aGUgc3R5bGVzIGZvciB0aGUgc2lkZWJhciB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lkZUJhcldpZGdldFxyXG4gICAgICovXHJcbiAgICBsb2FkU3R5bGVzKCl7XHJcbiAgICAgICAgc3VwZXIuYWRkU3R5bGUoXCJ3aWRnZXRzL3NpZGVCYXJXaWRnZXQvc3R5bGUvY3NzL3NpZGVCYXJXaWRnZXRTdHlsZS5jc3NcIik7XHJcbiAgICAgICAgc3VwZXIuYWRkU3R5bGUoXCJ3aWRnZXRzL3NpZGVCYXJXaWRnZXQvc3R5bGUvY3NzL3NpZGVCYXJXaWRnZXRTdHlsZVZhcmlhYmxlcy5jc3NcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gZXZ0XHJcbiAgICAgKiBAcGFyYW0geyp9IG91dGVyVGFiSWRcclxuICAgICAqIEBwYXJhbSB7Kn0gdGFiSWRcclxuICAgICAqIEBtZW1iZXJvZiBTaWRlQmFyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHN3aXRjaFRhYihvdXRlclRhYklkLCB0YWJJZCkge1xyXG4gICAgICAgIHZhciBpLCB0YWJjb250ZW50LCB0YWJsaW5rcztcclxuICAgICAgICBsZXQgYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQob3V0ZXJUYWJJZCtcIl9idXR0b25cIikhO1xyXG5cclxuICAgICAgICB0YWJjb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInRhYmNvbnRlbnRcIik7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHRhYmNvbnRlbnQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGFiY29udGVudFtpXS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRhYmxpbmtzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInRhYmxpbmtzXCIpO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB0YWJsaW5rcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0YWJsaW5rc1tpXS5jbGFzc05hbWUgPSB0YWJsaW5rc1tpXS5jbGFzc05hbWUucmVwbGFjZShcIiBhY3RpdmVcIiwgXCJcIik7XHJcbiAgICAgICAgICAgIHRhYmxpbmtzW2ldLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKVswXS5zcmMgPSB0YWJsaW5rc1tpXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJylbMF0uc3JjLnJlcGxhY2UoJ19hY3RpdmUuc3ZnJywgJy5zdmcnKTtcclxuICAgICAgICB9XHJcbiAgICAgICBcclxuICAgICAgICB0YWJJZCA9IFVuaXF1ZUlkR2VuZXJhdG9yLmdldEluc3RhbmNlKCkuZ2V0VW5pcXVlSWRGcm9tU3RyaW5nKHRhYklkKTtcclxuICAgICAgICBsZXQgdGFiV2lkZ2V0ID0gdGhpcy5fd2lkZ2V0cy5nZXQodGFiSWQpO1xyXG4gICAgICAgIGlmKHRoaXMuX2FjdGl2ZVdpZGdldCAhPSB1bmRlZmluZWQgJiYgdGhpcy5fYWN0aXZlV2lkZ2V0ICE9IHRhYldpZGdldCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2FjdGl2ZVdpZGdldC5kZWFjdGl2YXRlKCk7XHJcbiAgICAgICAgICAgIGlmKHRhYldpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgdGFiV2lkZ2V0LmFjdGl2YXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fYWN0aXZlV2lkZ2V0ID0gdGFiV2lkZ2V0O1xyXG4gICAgICAgIGxldCB0YWJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQob3V0ZXJUYWJJZCk7XHJcbiAgICAgICAgdGFiRWxlbWVudCEuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICBpZihidXR0b24uY2xhc3NOYW1lLmluZGV4T2YoXCJhY3RpdmVcIikgPCAwKXtcclxuICAgICAgICAgICAgYnV0dG9uLmNsYXNzTmFtZSArPSBcIiBhY3RpdmVcIjtcclxuICAgICAgICAgICAgYnV0dG9uLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKVswXS5zcmMgPSBidXR0b24uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpWzBdLnNyYy5yZXBsYWNlKC8oXFwuW1xcd1xcZF8tXSspJC9pLCAnX2FjdGl2ZS5zdmcnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZXNpemUodGhpcy5fYWN0dWFsV2lkdGgsdGhpcy5fYWN0dWFsSGVpZ2h0KVxyXG4gICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqXHJcbiAgICAqXHJcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gICAgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0XHJcbiAgICAqIEBtZW1iZXJvZiBTaWRlQmFyV2lkZ2V0XHJcbiAgICAqL1xyXG4gICByZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpe1xyXG4gICAgICAgLy8gU2V0IHNpemUgb2YgdGFiIGNvbnRyb2wgaXRzZWxmXHJcblxyXG4gICAgICAgdGhpcy5fYWN0dWFsV2lkdGggPSB3aWR0aDtcclxuICAgICAgIHRoaXMuX2FjdHVhbEhlaWdodCA9IGhlaWdodDtcclxuXHJcbiAgICAgICB0aGlzLm1haW5EaXYuc3R5bGUud2lkdGggPSB3aWR0aCArIFwicHhcIjtcclxuICAgICAgIHRoaXMubWFpbkRpdi5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyBcInB4XCI7XHJcblxyXG4gICAgICAgLy8gU2V0IHRoZSBzaXplcyBvZiB0aGUgY29udGVudHMgb2YgdGhpcyB0YWIgY29udHJvbFxyXG4gICAgICAgdmFyIGlubmVyVGFiV2lkdGggPSB3aWR0aCAtIDQ4OyAvLyA0OHB4IHNpZGViYXIgb24gdGhlIGxlZnRcclxuICAgICAgIHZhciBpbm5lclRhYkhlaWdodCA9IGhlaWdodCAtIDUwOyAvLyA1MHB4IHRvcGJhciBcclxuICAgICAgIFxyXG4gICAgICAgdGhpcy5fd2lkZ2V0cy5mb3JFYWNoKCh3aWRnZXQpID0+IHtcclxuICAgICAgICAgICAgaWYod2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgIHdpZGdldC5yZXNpemUoaW5uZXJUYWJXaWR0aCwgaW5uZXJUYWJIZWlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICB9KTtcclxuICAgfVxyXG4gICBcclxuICAgLyoqXHJcbiAgICAqXHJcbiAgICAqXHJcbiAgICAqIEBwYXJhbSB7SVdpZGdldH0gd2lkZ2V0XHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAqIEBwYXJhbSB7Vmlld1R5cGV9IHZpZXdUeXBlXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBpY29uUGF0aFxyXG4gICAgKiBAbWVtYmVyb2YgU2lkZUJhcldpZGdldFxyXG4gICAgKi9cclxuICAgYWRkV2lkZ2V0KHdpZGdldDogSVdpZGdldCwgbmFtZTogc3RyaW5nLCB2aWV3VHlwZTogVmlld1R5cGUsIGljb25QYXRoOiBzdHJpbmcpIHtcclxuICAgICAgICBcclxuICAgICAgICBuYW1lID0gbmFtZTtcclxuICAgICAgICBzdXBlci5hZGRXaWRnZXQod2lkZ2V0LCBuYW1lLCB2aWV3VHlwZSk7XHJcbiAgICAgICAvLyBBZGQgYSB0YWIgaXRlbVxyXG4gICAgICAgdmFyIG91dGVyVGFiSWQgPSBcInRhYl9cIiArIG5hbWUucmVwbGFjZShcIiBcIiwgXCJcIik7XHJcbiAgICAgICB2YXIgaW5uZXJUYWJJZCA9IFwiaW5uZXJfXCIgKyBvdXRlclRhYklkO1xyXG5cclxuICAgICAgIGxldCBidXR0b25DbGFzcyA9IFwiXCI7XHJcbiAgICAgICBsZXQgb3V0ZXJUYWJDbGFzcyA9IFwiXCI7XHJcbiAgICAgICBpZih2aWV3VHlwZSA9PSBWaWV3VHlwZS5Vc2VyKXtcclxuICAgICAgICAgICBidXR0b25DbGFzcyA9IFwicmlnaHRIYW5kU2lkZUJhckJ1dHRvblwiXHJcbiAgICAgICAgICAgb3V0ZXJUYWJDbGFzcyA9IFwiYWJzb2x1dGVUYWJcIjtcclxuICAgICAgIH1cclxuICAgICAgIGxldCB0aGVtZWRJY29uUGF0aCA9IHRoaXMuZ2V0VGhlbWVkRmlsZVBhdGgoaWNvblBhdGgpO1xyXG4gICAgICAgbGV0IG5hdkJ1dHRvbiA9IGA8YnV0dG9uIGlkPVwiYCsgb3V0ZXJUYWJJZCtgX2J1dHRvblwiIGNsYXNzPVwiaWNvbjQ4IHRhYmxpbmtzIGArIGJ1dHRvbkNsYXNzICtgXCI+PGltZyBzcmM9XCJgICsgdGhlbWVkSWNvblBhdGggKyBgXCI+PC9pbWc+PC9idXR0b24+YFxyXG4gICAgICAgJChcIi5cIittYWluTmF2aWdhdGlvbkNsYXNzTmFtZSkuYXBwZW5kKG5hdkJ1dHRvbik7XHJcbiAgICAgIFxyXG4gICAgICAgbGV0IG91dGVyVGFiID0gYDxkaXYgaWQ9XCJgKyBvdXRlclRhYklkICsgYFwiIGNsYXNzPVwidGFiY29udGVudCBgK291dGVyVGFiQ2xhc3MrYFwiID48L2Rpdj5gO1xyXG4gICAgICAgJCh0aGlzLm1haW5EaXYpLmFwcGVuZChvdXRlclRhYik7XHJcbiAgICAgICBsZXQgb3V0ZXJUYWJPYmogPSAkKHRoaXMubWFpbkRpdikuZmluZChcIiNcIiArIG91dGVyVGFiSWQpO1xyXG5cclxuICAgICAgIGxldCBpbm5lclRhYiA9IGA8ZGl2IGlkPVwiYCsgaW5uZXJUYWJJZCArIGBcIj48L2Rpdj5gO1xyXG4gICAgICAgb3V0ZXJUYWJPYmouYXBwZW5kKGlubmVyVGFiKTtcclxuXHJcbiAgICAgICB3aWRnZXQuaW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgLy8gYWRkIHdpZGdldCB0byB0aGUgcGFyZW50IGNvbnRhaW5lclxyXG4gICAgICAgd2lkZ2V0LmFkZFRvUGFyZW50Q29udGFpbmVySWQoaW5uZXJUYWJJZCk7XHJcblxyXG4gICAgICAgbGV0IHRhYklkID0gbmFtZSArIFwiX1wiICsgdmlld1R5cGU7XHJcbiAgICAgICBcclxuICAgICAgIGxldCBvdXRlclRhYkJ1dHRvbk9iaiA9ICQodGhpcy5tYWluRGl2KS5maW5kKFwiI1wiICsgb3V0ZXJUYWJJZCArIFwiX2J1dHRvblwiKTtcclxuICAgICAgIG91dGVyVGFiQnV0dG9uT2JqWzBdLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZTpFdmVudCkgPT4gdGhpcy5zd2l0Y2hUYWIob3V0ZXJUYWJJZCwgdGFiSWQgKSk7XHJcbiAgIH1cclxuXHJcbn1cclxuZXhwb3J0e1NpZGVCYXJXaWRnZXQsIG1haW5OYXZpZ2F0aW9uQ2xhc3NOYW1lfTsiXX0=