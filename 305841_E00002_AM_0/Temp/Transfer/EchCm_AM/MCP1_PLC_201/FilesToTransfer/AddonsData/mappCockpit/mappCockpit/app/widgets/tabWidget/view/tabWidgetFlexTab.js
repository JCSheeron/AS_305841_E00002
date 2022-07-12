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
define(["require", "exports", "../interfaces/tabWidgetTabInterface", "../tabWidgetStyleProvider", "../layout/tabWidgetLayoutProvider"], function (require, exports, tabWidgetTabInterface_1, tabWidgetStyleProvider_1, tabWidgetLayoutProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EventTabWidgetActiveHidden = tabWidgetTabInterface_1.EventTabWidgetActiveHidden;
    var TabWidgetFlexTab = /** @class */ (function (_super) {
        __extends(TabWidgetFlexTab, _super);
        function TabWidgetFlexTab() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.eventTabWidgetActiveHidden = new tabWidgetTabInterface_1.EventTabWidgetActiveHidden();
            _this.eventTabWidgetTabClicked = new tabWidgetTabInterface_1.EventTabBarTabClicked();
            _this.eventTabWidgetTabWheelClicked = new tabWidgetTabInterface_1.EventTabBarWheelClicked();
            _this.isActive = false;
            _this.dropDownDataSource = [{}];
            return _this;
        }
        TabWidgetFlexTab.prototype.appendTabLayout = function (widgetMainDiv, parentCointainerId, tabId, displayName) {
            var _this = this;
            var newLayoutElementId = "tab_" + tabId.replace(" ", "");
            var widgetContaierId = "inner_" + newLayoutElementId;
            var tabContainer = "<div id=\"" + newLayoutElementId + "_tab\" class=\"TopBarTab TopBarFlexTab\"></div>";
            var tabLayout = tabWidgetLayoutProvider_1.TabWidgetLayoutProvider.getInstance().getFlexTabLayout(newLayoutElementId);
            var outerTab = "<div id=\"" + newLayoutElementId + "\" class=\"TopBarContent\" ></div>";
            var innerTab = "<div id=\"" + widgetContaierId + "\"></div>";
            $("#" + parentCointainerId).append(tabContainer);
            $("#" + newLayoutElementId + "_tab").append(tabLayout);
            $(widgetMainDiv).append(outerTab);
            $("#" + newLayoutElementId).append(innerTab);
            var t = $("#" + newLayoutElementId + "_tag");
            t.append(displayName);
            //this.dropDownDataSource = [{ text: displayName, value: "tab1" },{ text: displayName+"_2", value: "tab2" }];
            //this.initializeDropdownList(newLayoutElementId);
            tabWidgetStyleProvider_1.TabWidgetStyleProvider.getInstance().setFlexTabStlye(newLayoutElementId);
            this.tabName = tabId;
            this.widgetContainerId = widgetContaierId;
            this.tabContainerId = newLayoutElementId;
            $("#" + this.tabContainerId + "_tab")[0].addEventListener("click", function (e) { return _this.tabClicked(_this.tabContainerId); });
            $("#" + this.tabContainerId + "_tab")[0].addEventListener("mousedown", function (e) { return _this.preventWheelClickScrolling(e); });
            $("#" + this.tabContainerId + "_tab")[0].addEventListener("auxclick", function (e) { return _this.tabWheelClicked(e, _this.tabContainerId); });
        };
        /*initializeDropdownList(newLayoutElementId){
            $("#"+newLayoutElementId+"_tag").ejDropDownList({
                dataSource: this.dropDownDataSource,
                targetID: newLayoutElementId+"_tag_dropdown",
                width: "100%",
                enabled:false,
               
                change: (event) => {
                    console.log($("#"+newLayoutElementId+"_tag_popup_list_wrapper").css("width"));
                },
    
                selectedIndex: 0,
    
            });
        }*/
        /*enableTagDropDown(enable: boolean){
            let dropDownInstance = $("#"+this.tabContainerId+"_tag").ejDropDownList("instance")
            if(enable == true){
               dropDownInstance.enable();
            }
            else{
                dropDownInstance.disable();
            }
        }*/
        TabWidgetFlexTab.prototype.isVisible = function (trigger) {
            //Tab is visibile if it is in the same line as its parent
            var tabObject = $("#" + this.tabContainerId + "_tab")[0];
            //checks of single TabObject is in the same line as the tabWidget
            if (tabObject.offsetTop == tabObject.parentElement.offsetTop) {
                return true;
            }
            this.eventTabWidgetActiveHidden.raise(this, { eventTrigger: trigger });
            return false;
        };
        TabWidgetFlexTab.prototype.setActive = function () {
            _super.prototype.setActive.call(this);
            //this.enableTagDropDown(true);
        };
        return TabWidgetFlexTab;
    }(tabWidgetTabInterface_1.ITabWidgetTab));
    exports.TabWidgetFlexTab = TabWidgetFlexTab;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiV2lkZ2V0RmxleFRhYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy90YWJXaWRnZXQvdmlldy90YWJXaWRnZXRGbGV4VGFiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFtRzBCLHFDQW5HRixrREFBMEIsQ0FtR0U7SUE1RnBEO1FBQStCLG9DQUFhO1FBQTVDO1lBQUEscUVBMkZDO1lBekZHLGdDQUEwQixHQUFHLElBQUksa0RBQTBCLEVBQUUsQ0FBQztZQUM5RCw4QkFBd0IsR0FBRyxJQUFJLDZDQUFxQixFQUFFLENBQUM7WUFDdkQsbUNBQTZCLEdBQUcsSUFBSSwrQ0FBdUIsRUFBRSxDQUFDO1lBUTlELGNBQVEsR0FBRyxLQUFLLENBQUM7WUFFakIsd0JBQWtCLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7UUE2RTlCLENBQUM7UUEzRUcsMENBQWUsR0FBZixVQUFnQixhQUE2QixFQUFFLGtCQUEwQixFQUFFLEtBQVksRUFBRSxXQUFtQjtZQUE1RyxpQkE4QkM7WUE1QkcsSUFBSSxrQkFBa0IsR0FBRyxNQUFNLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDekQsSUFBSSxnQkFBZ0IsR0FBRyxRQUFRLEdBQUcsa0JBQWtCLENBQUM7WUFFckQsSUFBSSxZQUFZLEdBQUcsWUFBVyxHQUFFLGtCQUFrQixHQUFDLGlEQUE4QyxDQUFBO1lBQ2pHLElBQUksU0FBUyxHQUFHLGlEQUF1QixDQUFDLFdBQVcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDM0YsSUFBSSxRQUFRLEdBQUcsWUFBVyxHQUFFLGtCQUFrQixHQUFHLG9DQUFpQyxDQUFDO1lBQ25GLElBQUksUUFBUSxHQUFHLFlBQVcsR0FBRSxnQkFBZ0IsR0FBRyxXQUFVLENBQUM7WUFFMUQsQ0FBQyxDQUFDLEdBQUcsR0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMvQyxDQUFDLENBQUMsR0FBRyxHQUFDLGtCQUFrQixHQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNuRCxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2xDLENBQUMsQ0FBQyxHQUFHLEdBQUMsa0JBQWtCLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFM0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxrQkFBa0IsR0FBRSxNQUFNLENBQUMsQ0FBQztZQUM1QyxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3RCLDZHQUE2RztZQUM3RyxrREFBa0Q7WUFFbEQsK0NBQXNCLENBQUMsV0FBVyxFQUFFLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFFekUsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGdCQUFnQixDQUFDO1lBQzFDLElBQUksQ0FBQyxjQUFjLEdBQUcsa0JBQWtCLENBQUM7WUFHekMsQ0FBQyxDQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsY0FBYyxHQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFDLENBQU8sSUFBSyxPQUFBLEtBQUksQ0FBQyxVQUFVLENBQUMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxFQUFwQyxDQUFvQyxDQUFDLENBQUM7WUFDbEgsQ0FBQyxDQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsY0FBYyxHQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBQyxVQUFDLENBQU8sSUFBSyxPQUFBLEtBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUMsRUFBbEMsQ0FBa0MsQ0FBQyxDQUFDO1lBQ25ILENBQUMsQ0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLGNBQWMsR0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsVUFBQyxDQUFPLElBQUssT0FBQSxLQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRSxLQUFJLENBQUMsY0FBYyxDQUFDLEVBQTVDLENBQTRDLENBQUMsQ0FBQztRQUNqSSxDQUFDO1FBR0Q7Ozs7Ozs7Ozs7Ozs7O1dBY0c7UUFFSDs7Ozs7Ozs7V0FRRztRQUVILG9DQUFTLEdBQVQsVUFBVSxPQUFnQjtZQUN0Qix5REFBeUQ7WUFDekQsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRSxJQUFJLENBQUMsY0FBYyxHQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25ELGlFQUFpRTtZQUNqRSxJQUFHLFNBQVMsQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLGFBQWMsQ0FBQyxTQUFTLEVBQUM7Z0JBQ3pELE9BQU8sSUFBSSxDQUFDO2FBQ2Y7WUFDTCxJQUFJLENBQUMsMEJBQTJCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQyxFQUFDLFlBQVksRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDO1lBQ3JFLE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFFRCxvQ0FBUyxHQUFUO1lBQ0ksaUJBQU0sU0FBUyxXQUFFLENBQUM7WUFDbEIsK0JBQStCO1FBQ25DLENBQUM7UUFFTCx1QkFBQztJQUFELENBQUMsQUEzRkQsQ0FBK0IscUNBQWEsR0EyRjNDO0lBQ08sNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVRhYldpZGdldFRhYiwgRXZlbnRUYWJXaWRnZXRBY3RpdmVIaWRkZW4sIEV2ZW50VGFiQmFyVGFiQ2xpY2tlZCwgRXZlbnRUYWJCYXJXaGVlbENsaWNrZWQgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy90YWJXaWRnZXRUYWJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVdpZGdldCB9IGZyb20gXCIuLi8uLi9jb21tb24vaW50ZXJmYWNlcy93aWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVGFiV2lkZ2V0U3R5bGVQcm92aWRlciB9IGZyb20gXCIuLi90YWJXaWRnZXRTdHlsZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFRhYldpZGdldExheW91dFByb3ZpZGVyIH0gZnJvbSBcIi4uL2xheW91dC90YWJXaWRnZXRMYXlvdXRQcm92aWRlclwiO1xyXG5cclxuXHJcblxyXG5jbGFzcyBUYWJXaWRnZXRGbGV4VGFiIGV4dGVuZHMgSVRhYldpZGdldFRhYntcclxuICAgXHJcbiAgICBldmVudFRhYldpZGdldEFjdGl2ZUhpZGRlbiA9IG5ldyBFdmVudFRhYldpZGdldEFjdGl2ZUhpZGRlbigpO1xyXG4gICAgZXZlbnRUYWJXaWRnZXRUYWJDbGlja2VkID0gbmV3IEV2ZW50VGFiQmFyVGFiQ2xpY2tlZCgpO1xyXG4gICAgZXZlbnRUYWJXaWRnZXRUYWJXaGVlbENsaWNrZWQgPSBuZXcgRXZlbnRUYWJCYXJXaGVlbENsaWNrZWQoKTtcclxuXHJcbiAgICB0YWJOYW1lPyA6IHN0cmluZ1xyXG4gICAgdGFiQ29udGFpbmVySWQ/IDogc3RyaW5nO1xyXG4gICAgd2lkZ2V0Q29udGFpbmVySWQ/OiBzdHJpbmdcclxuICAgIFxyXG4gICAgd2lkZ2V0PyA6IElXaWRnZXQgICAgXHJcblxyXG4gICAgaXNBY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICBkcm9wRG93bkRhdGFTb3VyY2UgPSBbe31dO1xyXG4gICAgXHJcbiAgICBhcHBlbmRUYWJMYXlvdXQod2lkZ2V0TWFpbkRpdjogSFRNTERpdkVsZW1lbnQsIHBhcmVudENvaW50YWluZXJJZDogc3RyaW5nLCB0YWJJZDpzdHJpbmcsIGRpc3BsYXlOYW1lOiBzdHJpbmcpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBuZXdMYXlvdXRFbGVtZW50SWQgPSBcInRhYl9cIiArIHRhYklkLnJlcGxhY2UoXCIgXCIsIFwiXCIpO1xyXG4gICAgICAgIHZhciB3aWRnZXRDb250YWllcklkID0gXCJpbm5lcl9cIiArIG5ld0xheW91dEVsZW1lbnRJZDtcclxuXHJcbiAgICAgICAgbGV0IHRhYkNvbnRhaW5lciA9IGA8ZGl2IGlkPVwiYCsgbmV3TGF5b3V0RWxlbWVudElkK2BfdGFiXCIgY2xhc3M9XCJUb3BCYXJUYWIgVG9wQmFyRmxleFRhYlwiPjwvZGl2PmBcclxuICAgICAgICBsZXQgdGFiTGF5b3V0ID0gVGFiV2lkZ2V0TGF5b3V0UHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRGbGV4VGFiTGF5b3V0KG5ld0xheW91dEVsZW1lbnRJZCk7XHJcbiAgICAgICAgbGV0IG91dGVyVGFiID0gYDxkaXYgaWQ9XCJgKyBuZXdMYXlvdXRFbGVtZW50SWQgKyBgXCIgY2xhc3M9XCJUb3BCYXJDb250ZW50XCIgPjwvZGl2PmA7XHJcbiAgICAgICAgbGV0IGlubmVyVGFiID0gYDxkaXYgaWQ9XCJgKyB3aWRnZXRDb250YWllcklkICsgYFwiPjwvZGl2PmA7XHJcblxyXG4gICAgICAgICQoXCIjXCIrcGFyZW50Q29pbnRhaW5lcklkKS5hcHBlbmQodGFiQ29udGFpbmVyKTtcclxuICAgICAgICAkKFwiI1wiK25ld0xheW91dEVsZW1lbnRJZCtcIl90YWJcIikuYXBwZW5kKHRhYkxheW91dCk7XHJcbiAgICAgICAgJCh3aWRnZXRNYWluRGl2KS5hcHBlbmQob3V0ZXJUYWIpO1xyXG4gICAgICAgICQoXCIjXCIrbmV3TGF5b3V0RWxlbWVudElkKS5hcHBlbmQoaW5uZXJUYWIpO1xyXG5cclxuICAgICAgICBsZXQgdCA9ICQoXCIjXCIgKyBuZXdMYXlvdXRFbGVtZW50SWQgK1wiX3RhZ1wiKTtcclxuICAgICAgICB0LmFwcGVuZChkaXNwbGF5TmFtZSk7XHJcbiAgICAgICAgLy90aGlzLmRyb3BEb3duRGF0YVNvdXJjZSA9IFt7IHRleHQ6IGRpc3BsYXlOYW1lLCB2YWx1ZTogXCJ0YWIxXCIgfSx7IHRleHQ6IGRpc3BsYXlOYW1lK1wiXzJcIiwgdmFsdWU6IFwidGFiMlwiIH1dO1xyXG4gICAgICAgIC8vdGhpcy5pbml0aWFsaXplRHJvcGRvd25MaXN0KG5ld0xheW91dEVsZW1lbnRJZCk7XHJcblxyXG4gICAgICAgIFRhYldpZGdldFN0eWxlUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5zZXRGbGV4VGFiU3RseWUobmV3TGF5b3V0RWxlbWVudElkKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnRhYk5hbWUgPSB0YWJJZDtcclxuICAgICAgICB0aGlzLndpZGdldENvbnRhaW5lcklkID0gd2lkZ2V0Q29udGFpZXJJZDtcclxuICAgICAgICB0aGlzLnRhYkNvbnRhaW5lcklkID0gbmV3TGF5b3V0RWxlbWVudElkO1xyXG5cclxuXHJcbiAgICAgICAgJChcIiNcIit0aGlzLnRhYkNvbnRhaW5lcklkK1wiX3RhYlwiKVswXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGU6RXZlbnQpID0+IHRoaXMudGFiQ2xpY2tlZCh0aGlzLnRhYkNvbnRhaW5lcklkKSk7XHJcbiAgICAgICAgJChcIiNcIit0aGlzLnRhYkNvbnRhaW5lcklkK1wiX3RhYlwiKVswXS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsKGU6RXZlbnQpID0+IHRoaXMucHJldmVudFdoZWVsQ2xpY2tTY3JvbGxpbmcoZSkpO1xyXG4gICAgICAgICQoXCIjXCIrdGhpcy50YWJDb250YWluZXJJZCtcIl90YWJcIilbMF0uYWRkRXZlbnRMaXN0ZW5lcihcImF1eGNsaWNrXCIsIChlOkV2ZW50KSA9PiB0aGlzLnRhYldoZWVsQ2xpY2tlZChlLCB0aGlzLnRhYkNvbnRhaW5lcklkKSk7IFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKmluaXRpYWxpemVEcm9wZG93bkxpc3QobmV3TGF5b3V0RWxlbWVudElkKXtcclxuICAgICAgICAkKFwiI1wiK25ld0xheW91dEVsZW1lbnRJZCtcIl90YWdcIikuZWpEcm9wRG93bkxpc3Qoe1xyXG4gICAgICAgICAgICBkYXRhU291cmNlOiB0aGlzLmRyb3BEb3duRGF0YVNvdXJjZSxcclxuICAgICAgICAgICAgdGFyZ2V0SUQ6IG5ld0xheW91dEVsZW1lbnRJZCtcIl90YWdfZHJvcGRvd25cIixcclxuICAgICAgICAgICAgd2lkdGg6IFwiMTAwJVwiLFxyXG4gICAgICAgICAgICBlbmFibGVkOmZhbHNlLFxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBjaGFuZ2U6IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJChcIiNcIituZXdMYXlvdXRFbGVtZW50SWQrXCJfdGFnX3BvcHVwX2xpc3Rfd3JhcHBlclwiKS5jc3MoXCJ3aWR0aFwiKSk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBzZWxlY3RlZEluZGV4OiAwLFxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH0qL1xyXG5cclxuICAgIC8qZW5hYmxlVGFnRHJvcERvd24oZW5hYmxlOiBib29sZWFuKXtcclxuICAgICAgICBsZXQgZHJvcERvd25JbnN0YW5jZSA9ICQoXCIjXCIrdGhpcy50YWJDb250YWluZXJJZCtcIl90YWdcIikuZWpEcm9wRG93bkxpc3QoXCJpbnN0YW5jZVwiKVxyXG4gICAgICAgIGlmKGVuYWJsZSA9PSB0cnVlKXtcclxuICAgICAgICAgICBkcm9wRG93bkluc3RhbmNlLmVuYWJsZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBkcm9wRG93bkluc3RhbmNlLmRpc2FibGUoKTsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfSovXHJcblxyXG4gICAgaXNWaXNpYmxlKHRyaWdnZXIgOiBzdHJpbmcpOiBib29sZWFue1xyXG4gICAgICAgIC8vVGFiIGlzIHZpc2liaWxlIGlmIGl0IGlzIGluIHRoZSBzYW1lIGxpbmUgYXMgaXRzIHBhcmVudFxyXG4gICAgICAgIGxldCB0YWJPYmplY3QgPSAkKFwiI1wiKyB0aGlzLnRhYkNvbnRhaW5lcklkICtcIl90YWJcIilbMF07XHJcbiAgICAgICAgICAgIC8vY2hlY2tzIG9mIHNpbmdsZSBUYWJPYmplY3QgaXMgaW4gdGhlIHNhbWUgbGluZSBhcyB0aGUgdGFiV2lkZ2V0XHJcbiAgICAgICAgICAgIGlmKHRhYk9iamVjdC5vZmZzZXRUb3AgPT0gdGFiT2JqZWN0LnBhcmVudEVsZW1lbnQhLm9mZnNldFRvcCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZXZlbnRUYWJXaWRnZXRBY3RpdmVIaWRkZW4hLnJhaXNlKHRoaXMse2V2ZW50VHJpZ2dlcjogdHJpZ2dlcn0pO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRBY3RpdmUoKXtcclxuICAgICAgICBzdXBlci5zZXRBY3RpdmUoKTtcclxuICAgICAgICAvL3RoaXMuZW5hYmxlVGFnRHJvcERvd24odHJ1ZSk7XHJcbiAgICB9XHJcblxyXG59XHJcbmV4cG9ydCB7VGFiV2lkZ2V0RmxleFRhYiwgRXZlbnRUYWJXaWRnZXRBY3RpdmVIaWRkZW59Il19