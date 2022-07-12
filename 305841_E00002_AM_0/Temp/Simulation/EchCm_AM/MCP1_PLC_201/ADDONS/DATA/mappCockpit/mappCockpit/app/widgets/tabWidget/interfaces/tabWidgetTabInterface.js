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
define(["require", "exports", "../../../framework/events", "../tabWidgetStyleProvider"], function (require, exports, events_1, tabWidgetStyleProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventTabWidgetActiveHidden = /** @class */ (function (_super) {
        __extends(EventTabWidgetActiveHidden, _super);
        function EventTabWidgetActiveHidden() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventTabWidgetActiveHidden;
    }(events_1.TypedEvent));
    exports.EventTabWidgetActiveHidden = EventTabWidgetActiveHidden;
    ;
    var EventTabBarTabClicked = /** @class */ (function (_super) {
        __extends(EventTabBarTabClicked, _super);
        function EventTabBarTabClicked() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventTabBarTabClicked;
    }(events_1.TypedEvent));
    exports.EventTabBarTabClicked = EventTabBarTabClicked;
    ;
    var EventTabBarWheelClicked = /** @class */ (function (_super) {
        __extends(EventTabBarWheelClicked, _super);
        function EventTabBarWheelClicked() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventTabBarWheelClicked;
    }(events_1.TypedEvent));
    exports.EventTabBarWheelClicked = EventTabBarWheelClicked;
    ;
    var ITabWidgetTab = /** @class */ (function () {
        function ITabWidgetTab() {
            this.eventTabWidgetActiveHidden = new EventTabWidgetActiveHidden();
            this.eventTabWidgetTabClicked = new EventTabBarTabClicked();
            this.eventTabWidgetTabWheelClicked = new EventTabBarWheelClicked();
            this.isActive = false;
        }
        ITabWidgetTab.prototype.tabClicked = function (tabContainerId) {
            var tabName = tabContainerId = tabContainerId.replace('tab_', '');
            this.eventTabWidgetTabClicked.raise(this, { tabName: tabName });
        };
        ITabWidgetTab.prototype.tabWheelClicked = function (event, tabContainerId) {
            var middleButton = 2;
            if (event.which === middleButton) {
                var tabName = tabContainerId;
                this.eventTabWidgetTabWheelClicked.raise(this, { tabName: tabName });
            }
        };
        ITabWidgetTab.prototype.preventWheelClickScrolling = function (event) {
            var auxiliaryButton = 1;
            if (event.button !== auxiliaryButton) {
                return;
            }
            event.preventDefault();
            event.stopPropagation();
        };
        ITabWidgetTab.prototype.addWidget = function (widget) {
            widget.initialize();
            // add widget to the parent container
            if (this.widgetContainerId != undefined) {
                widget.addToParentContainerId(this.widgetContainerId);
            }
            this.widget = widget;
        };
        ITabWidgetTab.prototype.setIcon = function (iconPath) {
            $("#" + this.tabContainerId + "_icon").find('img').attr("src", iconPath);
        };
        ITabWidgetTab.prototype.setDisplayNone = function () {
            $("#" + this.tabContainerId).css("display", "none");
        };
        ITabWidgetTab.prototype.removeStyleClassActive = function () {
            $("#" + this.tabContainerId + "_tab").removeClass("active");
        };
        ITabWidgetTab.prototype.setActive = function () {
            tabWidgetStyleProvider_1.TabWidgetStyleProvider.getInstance().setFlexTabActiveTabStyle(this.tabContainerId);
            this.isVisible("setActive");
        };
        return ITabWidgetTab;
    }());
    exports.ITabWidgetTab = ITabWidgetTab;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiV2lkZ2V0VGFiSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RhYldpZGdldC9pbnRlcmZhY2VzL3RhYldpZGdldFRhYkludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBSUE7UUFBeUMsOENBQWlDO1FBQTFFOztRQUEyRSxDQUFDO1FBQUQsaUNBQUM7SUFBRCxDQUFDLEFBQTVFLENBQXlDLG1CQUFVLEdBQXlCO0lBbUUvQixnRUFBMEI7SUFuRUssQ0FBQztJQUM3RTtRQUFvQyx5Q0FBaUM7UUFBckU7O1FBQXNFLENBQUM7UUFBRCw0QkFBQztJQUFELENBQUMsQUFBdkUsQ0FBb0MsbUJBQVUsR0FBeUI7SUFrRWhELHNEQUFxQjtJQWxFMkIsQ0FBQztJQUN4RTtRQUFzQywyQ0FBaUM7UUFBdkU7O1FBQXdFLENBQUM7UUFBRCw4QkFBQztJQUFELENBQUMsQUFBekUsQ0FBc0MsbUJBQVUsR0FBeUI7SUFpRUEsMERBQXVCO0lBakV2QixDQUFDO0lBRTFFO1FBQUE7WUFFSSwrQkFBMEIsR0FBK0IsSUFBSSwwQkFBMEIsRUFBRSxDQUFDO1lBQzFGLDZCQUF3QixHQUEwQixJQUFJLHFCQUFxQixFQUFFLENBQUM7WUFDOUUsa0NBQTZCLEdBQTRCLElBQUksdUJBQXVCLEVBQUUsQ0FBQztZQU12RixhQUFRLEdBQVksS0FBSyxDQUFDO1FBb0Q5QixDQUFDO1FBL0NHLGtDQUFVLEdBQVYsVUFBVyxjQUFjO1lBQ3JCLElBQUksT0FBTyxHQUFHLGNBQWMsR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNsRSxJQUFJLENBQUMsd0JBQXlCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDO1FBQ2pFLENBQUM7UUFFRCx1Q0FBZSxHQUFmLFVBQWdCLEtBQUssRUFBRSxjQUFjO1lBQ2pDLElBQU0sWUFBWSxHQUFXLENBQUMsQ0FBQztZQUMvQixJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssWUFBWSxFQUFDO2dCQUM3QixJQUFJLE9BQU8sR0FBRyxjQUFjLENBQUM7Z0JBQzdCLElBQUksQ0FBQyw2QkFBOEIsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFDLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxDQUFDLENBQUM7YUFDckU7UUFDTCxDQUFDO1FBRUQsa0RBQTBCLEdBQTFCLFVBQTJCLEtBQUs7WUFDNUIsSUFBTSxlQUFlLEdBQVcsQ0FBQyxDQUFDO1lBQ2xDLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxlQUFlLEVBQUM7Z0JBQUMsT0FBTzthQUFDO1lBQzlDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDNUIsQ0FBQztRQUVELGlDQUFTLEdBQVQsVUFBVSxNQUFlO1lBQ3JCLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNwQixxQ0FBcUM7WUFDckMsSUFBRyxJQUFJLENBQUMsaUJBQWlCLElBQUksU0FBUyxFQUFDO2dCQUNuQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7YUFDekQ7WUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUN6QixDQUFDO1FBRUQsK0JBQU8sR0FBUCxVQUFRLFFBQWdCO1lBQ3BCLENBQUMsQ0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLGNBQWUsR0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBQyxRQUFRLENBQUMsQ0FBQztRQUN6RSxDQUFDO1FBRUQsc0NBQWMsR0FBZDtZQUNJLENBQUMsQ0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLGNBQWUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkQsQ0FBQztRQUVELDhDQUFzQixHQUF0QjtZQUNJLENBQUMsQ0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLGNBQWUsR0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0QsQ0FBQztRQUVELGlDQUFTLEdBQVQ7WUFDSSwrQ0FBc0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsY0FBZSxDQUFDLENBQUM7WUFDcEYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBR0wsb0JBQUM7SUFBRCxDQUFDLEFBOURELElBOERDO0lBQ08sc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJV2lkZ2V0IH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9pbnRlcmZhY2VzL3dpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9ldmVudHNcIjtcclxuaW1wb3J0IHsgVGFiV2lkZ2V0U3R5bGVQcm92aWRlciB9IGZyb20gXCIuLi90YWJXaWRnZXRTdHlsZVByb3ZpZGVyXCI7XHJcblxyXG5jbGFzcyBFdmVudFRhYldpZGdldEFjdGl2ZUhpZGRlbiBleHRlbmRzIFR5cGVkRXZlbnQ8SVRhYldpZGdldFRhYiwgb2JqZWN0Pnt9O1xyXG5jbGFzcyBFdmVudFRhYkJhclRhYkNsaWNrZWQgZXh0ZW5kcyBUeXBlZEV2ZW50PElUYWJXaWRnZXRUYWIsIG9iamVjdD57fTtcclxuY2xhc3MgRXZlbnRUYWJCYXJXaGVlbENsaWNrZWQgZXh0ZW5kcyBUeXBlZEV2ZW50PElUYWJXaWRnZXRUYWIsIG9iamVjdD57fTtcclxuXHJcbmFic3RyYWN0IGNsYXNzIElUYWJXaWRnZXRUYWJ7XHJcbiAgICB0YWJOYW1lPzogc3RyaW5nO1xyXG4gICAgZXZlbnRUYWJXaWRnZXRBY3RpdmVIaWRkZW46IEV2ZW50VGFiV2lkZ2V0QWN0aXZlSGlkZGVuID0gbmV3IEV2ZW50VGFiV2lkZ2V0QWN0aXZlSGlkZGVuKCk7ICAgIFxyXG4gICAgZXZlbnRUYWJXaWRnZXRUYWJDbGlja2VkOiBFdmVudFRhYkJhclRhYkNsaWNrZWQgPSBuZXcgRXZlbnRUYWJCYXJUYWJDbGlja2VkKCk7XHJcbiAgICBldmVudFRhYldpZGdldFRhYldoZWVsQ2xpY2tlZDogRXZlbnRUYWJCYXJXaGVlbENsaWNrZWQgPSBuZXcgRXZlbnRUYWJCYXJXaGVlbENsaWNrZWQoKTtcclxuXHJcbiAgICB0YWJDb250YWluZXJJZD8gOiBzdHJpbmc7XHJcbiAgICB3aWRnZXRDb250YWluZXJJZD86IHN0cmluZ1xyXG4gICAgd2lkZ2V0PzogSVdpZGdldFxyXG5cclxuICAgIGlzQWN0aXZlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgYWJzdHJhY3QgaXNWaXNpYmxlKHRyaWdnZXIgOiBzdHJpbmcpOiBib29sZWFuO1xyXG4gICAgYWJzdHJhY3QgYXBwZW5kVGFiTGF5b3V0KHdpZGdldE1haW5EaXY6IEhUTUxEaXZFbGVtZW50LCBwYXJlbnRDb2ludGFpbmVySWQ6c3RyaW5nLCB0YWJJRDpzdHJpbmcsIGRpc3BsYXlOYW1lOiBzdHJpbmcpO1xyXG5cclxuICAgIHRhYkNsaWNrZWQodGFiQ29udGFpbmVySWQpe1xyXG4gICAgICAgIGxldCB0YWJOYW1lID0gdGFiQ29udGFpbmVySWQgPSB0YWJDb250YWluZXJJZC5yZXBsYWNlKCd0YWJfJywgJycpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRUYWJXaWRnZXRUYWJDbGlja2VkIS5yYWlzZSh0aGlzLHt0YWJOYW1lOnRhYk5hbWV9KTtcclxuICAgIH1cclxuXHJcbiAgICB0YWJXaGVlbENsaWNrZWQoZXZlbnQsIHRhYkNvbnRhaW5lcklkKXtcclxuICAgICAgICBjb25zdCBtaWRkbGVCdXR0b246IG51bWJlciA9IDI7XHJcbiAgICAgICAgaWYgKGV2ZW50LndoaWNoID09PSBtaWRkbGVCdXR0b24pe1xyXG4gICAgICAgICAgICBsZXQgdGFiTmFtZSA9IHRhYkNvbnRhaW5lcklkO1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50VGFiV2lkZ2V0VGFiV2hlZWxDbGlja2VkIS5yYWlzZSh0aGlzLHt0YWJOYW1lOnRhYk5hbWV9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJldmVudFdoZWVsQ2xpY2tTY3JvbGxpbmcoZXZlbnQpe1xyXG4gICAgICAgIGNvbnN0IGF1eGlsaWFyeUJ1dHRvbjogbnVtYmVyID0gMTtcclxuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uICE9PSBhdXhpbGlhcnlCdXR0b24pe3JldHVybjt9XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRXaWRnZXQod2lkZ2V0OiBJV2lkZ2V0KSB7XHJcbiAgICAgICAgd2lkZ2V0LmluaXRpYWxpemUoKTtcclxuICAgICAgICAvLyBhZGQgd2lkZ2V0IHRvIHRoZSBwYXJlbnQgY29udGFpbmVyXHJcbiAgICAgICAgaWYodGhpcy53aWRnZXRDb250YWluZXJJZCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB3aWRnZXQuYWRkVG9QYXJlbnRDb250YWluZXJJZCh0aGlzLndpZGdldENvbnRhaW5lcklkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy53aWRnZXQgPSB3aWRnZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SWNvbihpY29uUGF0aDogc3RyaW5nKSB7XHJcbiAgICAgICAgJChcIiNcIit0aGlzLnRhYkNvbnRhaW5lcklkIStcIl9pY29uXCIpLmZpbmQoJ2ltZycpLmF0dHIoXCJzcmNcIixpY29uUGF0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGlzcGxheU5vbmUoKSB7XHJcbiAgICAgICAgJChcIiNcIit0aGlzLnRhYkNvbnRhaW5lcklkISkuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlU3R5bGVDbGFzc0FjdGl2ZSgpIHtcclxuICAgICAgICAkKFwiI1wiK3RoaXMudGFiQ29udGFpbmVySWQhK1wiX3RhYlwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRBY3RpdmUoKXtcclxuICAgICAgICBUYWJXaWRnZXRTdHlsZVByb3ZpZGVyLmdldEluc3RhbmNlKCkuc2V0RmxleFRhYkFjdGl2ZVRhYlN0eWxlKHRoaXMudGFiQ29udGFpbmVySWQhKTtcclxuICAgICAgICB0aGlzLmlzVmlzaWJsZShcInNldEFjdGl2ZVwiKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcbn1cclxuZXhwb3J0IHtJVGFiV2lkZ2V0VGFiLCBFdmVudFRhYkJhclRhYkNsaWNrZWQsRXZlbnRUYWJXaWRnZXRBY3RpdmVIaWRkZW4sIEV2ZW50VGFiQmFyV2hlZWxDbGlja2VkfSJdfQ==