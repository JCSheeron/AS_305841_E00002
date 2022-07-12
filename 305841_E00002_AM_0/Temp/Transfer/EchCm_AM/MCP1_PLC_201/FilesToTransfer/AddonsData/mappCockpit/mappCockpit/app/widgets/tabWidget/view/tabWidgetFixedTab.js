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
define(["require", "exports", "../interfaces/tabWidgetTabInterface"], function (require, exports, tabWidgetTabInterface_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TabWidgetFixedTab = /** @class */ (function (_super) {
        __extends(TabWidgetFixedTab, _super);
        function TabWidgetFixedTab() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.isActive = false;
            return _this;
        }
        TabWidgetFixedTab.prototype.appendTabLayout = function (widgetMainDiv, parentCointainerId, tabName) {
            var _this = this;
            var newLayoutElementId = "tab_" + tabName.replace(" ", "");
            var widgetContaierId = "inner_" + newLayoutElementId;
            var tabContainer = "<div id=\"" + newLayoutElementId + "_tab\" class=\"TopBarTab\"></div>";
            $("#" + parentCointainerId).append(tabContainer);
            var navIcon = "<div id=\"" + newLayoutElementId + "_icon\" class=\"icon48 topBarNavigationElement\"><img src=\"\"></div>";
            $("#" + newLayoutElementId + "_tab").append(navIcon);
            this.widgetContainerId = widgetContaierId;
            this.tabContainerId = newLayoutElementId;
            var outerTab = "<div id=\"" + newLayoutElementId + "\" class=\"TopBarContent\" ></div>";
            $(widgetMainDiv).append(outerTab);
            if (!$("#" + widgetContaierId).length) {
                var innerTab = "<div id=\"" + widgetContaierId + "\"></div>";
                $("#" + newLayoutElementId).append(innerTab);
            }
            $("#" + $.escapeSelector(this.tabContainerId + "_tab"))[0].addEventListener("click", function (e) { return _this.tabClicked(_this.tabContainerId); });
        };
        TabWidgetFixedTab.prototype.isVisible = function () {
            return true;
        };
        return TabWidgetFixedTab;
    }(tabWidgetTabInterface_1.ITabWidgetTab));
    exports.TabWidgetFixedTab = TabWidgetFixedTab;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiV2lkZ2V0Rml4ZWRUYWIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvdGFiV2lkZ2V0L3ZpZXcvdGFiV2lkZ2V0Rml4ZWRUYWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUlBO1FBQWdDLHFDQUFhO1FBQTdDO1lBQUEscUVBdUNDO1lBakNHLGNBQVEsR0FBWSxLQUFLLENBQUM7O1FBaUM5QixDQUFDO1FBL0JHLDJDQUFlLEdBQWYsVUFBZ0IsYUFBNkIsRUFBRSxrQkFBMEIsRUFBRSxPQUFlO1lBQTFGLGlCQXlCQztZQXhCRyxJQUFJLGtCQUFrQixHQUFHLE1BQU0sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMzRCxJQUFJLGdCQUFnQixHQUFHLFFBQVEsR0FBRyxrQkFBa0IsQ0FBQztZQUVyRCxJQUFJLFlBQVksR0FBRyxZQUFXLEdBQUcsa0JBQWtCLEdBQUMsbUNBQWdDLENBQUE7WUFDcEYsQ0FBQyxDQUFDLEdBQUcsR0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUUvQyxJQUFJLE9BQU8sR0FBRSxZQUFXLEdBQUUsa0JBQWtCLEdBQUMsdUVBQWtFLENBQUE7WUFFL0csQ0FBQyxDQUFDLEdBQUcsR0FBQyxrQkFBa0IsR0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFakQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGdCQUFnQixDQUFDO1lBQzFDLElBQUksQ0FBQyxjQUFjLEdBQUcsa0JBQWtCLENBQUM7WUFHekMsSUFBSSxRQUFRLEdBQUcsWUFBVyxHQUFFLGtCQUFrQixHQUFHLG9DQUFpQyxDQUFDO1lBQ25GLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFbEMsSUFBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUMsZ0JBQWdCLENBQUMsQ0FBQyxNQUFNLEVBQUU7Z0JBQ2hDLElBQUksUUFBUSxHQUFHLFlBQVcsR0FBRSxnQkFBZ0IsR0FBRyxXQUFVLENBQUM7Z0JBQzFELENBQUMsQ0FBQyxHQUFHLEdBQUMsa0JBQWtCLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDOUM7WUFFRCxDQUFDLENBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGNBQWMsR0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFDLENBQU8sSUFBSyxPQUFBLEtBQUksQ0FBQyxVQUFVLENBQUMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxFQUFwQyxDQUFvQyxDQUFDLENBQUM7UUFFeEksQ0FBQztRQUVELHFDQUFTLEdBQVQ7WUFDSSxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRUwsd0JBQUM7SUFBRCxDQUFDLEFBdkNELENBQWdDLHFDQUFhLEdBdUM1QztJQUNPLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElUYWJXaWRnZXRUYWIgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy90YWJXaWRnZXRUYWJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVdpZGdldCB9IGZyb20gXCIuLi8uLi9jb21tb24vaW50ZXJmYWNlcy93aWRnZXRJbnRlcmZhY2VcIjtcclxuXHJcblxyXG5jbGFzcyBUYWJXaWRnZXRGaXhlZFRhYiBleHRlbmRzIElUYWJXaWRnZXRUYWJ7XHJcbiAgICBcclxuICAgIHRhYkNvbnRhaW5lcklkPzogc3RyaW5nIHwgdW5kZWZpbmVkO1xyXG4gICAgd2lkZ2V0Q29udGFpbmVySWQ/OiBzdHJpbmcgfCB1bmRlZmluZWQ7XHJcbiAgICB3aWRnZXQ/OiBJV2lkZ2V0IHwgdW5kZWZpbmVkO1xyXG4gICAgXHJcbiAgICBpc0FjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGFwcGVuZFRhYkxheW91dCh3aWRnZXRNYWluRGl2OiBIVE1MRGl2RWxlbWVudCwgcGFyZW50Q29pbnRhaW5lcklkOiBzdHJpbmcsIHRhYk5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHZhciBuZXdMYXlvdXRFbGVtZW50SWQgPSBcInRhYl9cIiArIHRhYk5hbWUucmVwbGFjZShcIiBcIiwgXCJcIik7XHJcbiAgICAgICAgdmFyIHdpZGdldENvbnRhaWVySWQgPSBcImlubmVyX1wiICsgbmV3TGF5b3V0RWxlbWVudElkO1xyXG5cclxuICAgICAgICBsZXQgdGFiQ29udGFpbmVyID0gYDxkaXYgaWQ9XCJgICsgbmV3TGF5b3V0RWxlbWVudElkK2BfdGFiXCIgY2xhc3M9XCJUb3BCYXJUYWJcIj48L2Rpdj5gXHJcbiAgICAgICAgJChcIiNcIitwYXJlbnRDb2ludGFpbmVySWQpLmFwcGVuZCh0YWJDb250YWluZXIpO1xyXG5cclxuICAgICAgICBsZXQgbmF2SWNvbj0gYDxkaXYgaWQ9XCJgKyBuZXdMYXlvdXRFbGVtZW50SWQrYF9pY29uXCIgY2xhc3M9XCJpY29uNDggdG9wQmFyTmF2aWdhdGlvbkVsZW1lbnRcIj48aW1nIHNyYz1cIlwiPjwvZGl2PmBcclxuXHJcbiAgICAgICAgJChcIiNcIituZXdMYXlvdXRFbGVtZW50SWQrXCJfdGFiXCIpLmFwcGVuZChuYXZJY29uKTtcclxuXHJcbiAgICAgICAgdGhpcy53aWRnZXRDb250YWluZXJJZCA9IHdpZGdldENvbnRhaWVySWQ7XHJcbiAgICAgICAgdGhpcy50YWJDb250YWluZXJJZCA9IG5ld0xheW91dEVsZW1lbnRJZDtcclxuXHJcblxyXG4gICAgICAgIGxldCBvdXRlclRhYiA9IGA8ZGl2IGlkPVwiYCsgbmV3TGF5b3V0RWxlbWVudElkICsgYFwiIGNsYXNzPVwiVG9wQmFyQ29udGVudFwiID48L2Rpdj5gO1xyXG4gICAgICAgICQod2lkZ2V0TWFpbkRpdikuYXBwZW5kKG91dGVyVGFiKTtcclxuICAgICAgICBcclxuICAgICAgICBpZighJChcIiNcIit3aWRnZXRDb250YWllcklkKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgbGV0IGlubmVyVGFiID0gYDxkaXYgaWQ9XCJgKyB3aWRnZXRDb250YWllcklkICsgYFwiPjwvZGl2PmA7XHJcbiAgICAgICAgICAgICQoXCIjXCIrbmV3TGF5b3V0RWxlbWVudElkKS5hcHBlbmQoaW5uZXJUYWIpOyAgICBcclxuICAgICAgICB9XHJcbiAgICAgICBcclxuICAgICAgICAkKFwiI1wiKyQuZXNjYXBlU2VsZWN0b3IodGhpcy50YWJDb250YWluZXJJZCtcIl90YWJcIikpWzBdLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZTpFdmVudCkgPT4gdGhpcy50YWJDbGlja2VkKHRoaXMudGFiQ29udGFpbmVySWQpKTtcclxuXHJcbiAgICB9XHJcbiAgIFxyXG4gICAgaXNWaXNpYmxlKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG59XHJcbmV4cG9ydCB7VGFiV2lkZ2V0Rml4ZWRUYWJ9XHJcbiJdfQ==