define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TabWidgetStyleProvider = /** @class */ (function () {
        function TabWidgetStyleProvider() {
        }
        TabWidgetStyleProvider.getInstance = function () {
            if (!TabWidgetStyleProvider.instance) {
                TabWidgetStyleProvider.instance = new TabWidgetStyleProvider();
                // ... any one time initialization goes here ...
            }
            return TabWidgetStyleProvider.instance;
        };
        TabWidgetStyleProvider.prototype.setFlexTabStlye = function (newLayoutElementId) {
            $("#" + newLayoutElementId + "_tag_container").addClass("TabBarTagDropdown");
            $("#" + newLayoutElementId + "_tag_hidden").addClass("TabBarTagDropdown");
            $("#" + newLayoutElementId + "_tag_dropdown").addClass("TabBarTagDropdown");
            $("#" + newLayoutElementId + "_tag_hidden").css("background", "inherit");
            $("#" + newLayoutElementId + "_tag_hidden").css("color", "white");
            $("#" + newLayoutElementId + "_tag_hidden").css("opacity", "1");
            var width = $("#" + newLayoutElementId + "_tag_popup_list_wrapper").css("width");
            $("#" + newLayoutElementId + "_tag_hidden").css("width", width);
            $("#" + newLayoutElementId + "_tag_container").css("background", "inherit");
            $("#" + newLayoutElementId + "_tag_container").css("color", "white");
            $("#" + newLayoutElementId + "_tag_dropdown").css("background", "inherit");
            $("#" + newLayoutElementId + "_tag_dropdown").css("color", "white");
            $("#" + newLayoutElementId + "_tag_dropdown").css("border", "0px");
        };
        TabWidgetStyleProvider.prototype.setFlexTabActiveTabStyle = function (tabName) {
            var element = document.getElementById(tabName);
            if (element != undefined) {
                element.style.display = "block";
            }
            var tabElement = document.getElementById(tabName + "_tab");
            if (tabElement != undefined) {
                tabElement.className += " active";
            }
        };
        return TabWidgetStyleProvider;
    }());
    exports.TabWidgetStyleProvider = TabWidgetStyleProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiV2lkZ2V0U3R5bGVQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy90YWJXaWRnZXQvdGFiV2lkZ2V0U3R5bGVQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFBQTtRQUFBO1FBNENBLENBQUM7UUF4Q1Usa0NBQVcsR0FBbEI7WUFDSSxJQUFJLENBQUMsc0JBQXNCLENBQUMsUUFBUSxFQUFFO2dCQUNsQyxzQkFBc0IsQ0FBQyxRQUFRLEdBQUcsSUFBSSxzQkFBc0IsRUFBRSxDQUFDO2dCQUMvRCxnREFBZ0Q7YUFDbkQ7WUFDRCxPQUFPLHNCQUFzQixDQUFDLFFBQVEsQ0FBQztRQUMzQyxDQUFDO1FBRU0sZ0RBQWUsR0FBdEIsVUFBdUIsa0JBQTBCO1lBQzdDLENBQUMsQ0FBQyxHQUFHLEdBQUMsa0JBQWtCLEdBQUMsZ0JBQWdCLENBQUMsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUN6RSxDQUFDLENBQUMsR0FBRyxHQUFDLGtCQUFrQixHQUFDLGFBQWEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ3RFLENBQUMsQ0FBQyxHQUFHLEdBQUMsa0JBQWtCLEdBQUMsZUFBZSxDQUFDLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFHeEUsQ0FBQyxDQUFDLEdBQUcsR0FBQyxrQkFBa0IsR0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3JFLENBQUMsQ0FBQyxHQUFHLEdBQUMsa0JBQWtCLEdBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztZQUM5RCxDQUFDLENBQUMsR0FBRyxHQUFDLGtCQUFrQixHQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFFNUQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBQyxrQkFBa0IsR0FBQyx5QkFBeUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM3RSxDQUFDLENBQUMsR0FBRyxHQUFDLGtCQUFrQixHQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBTSxDQUFDLENBQUM7WUFFN0QsQ0FBQyxDQUFDLEdBQUcsR0FBQyxrQkFBa0IsR0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDeEUsQ0FBQyxDQUFDLEdBQUcsR0FBQyxrQkFBa0IsR0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFakUsQ0FBQyxDQUFDLEdBQUcsR0FBQyxrQkFBa0IsR0FBQyxlQUFlLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZFLENBQUMsQ0FBQyxHQUFHLEdBQUMsa0JBQWtCLEdBQUMsZUFBZSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNoRSxDQUFDLENBQUMsR0FBRyxHQUFDLGtCQUFrQixHQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbkUsQ0FBQztRQUVNLHlEQUF3QixHQUEvQixVQUFnQyxPQUFjO1lBQzFDLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDL0MsSUFBRyxPQUFPLElBQUksU0FBUyxFQUFDO2dCQUNwQixPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7YUFDbkM7WUFFRCxJQUFJLFVBQVUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sR0FBQyxNQUFNLENBQUMsQ0FBQztZQUN6RCxJQUFHLFVBQVUsSUFBSyxTQUFTLEVBQUM7Z0JBQ3hCLFVBQVUsQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDO2FBQ3JDO1FBQ0wsQ0FBQztRQUNMLDZCQUFDO0lBQUQsQ0FBQyxBQTVDRCxJQTRDQztJQTVDWSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgVGFiV2lkZ2V0U3R5bGVQcm92aWRlcntcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogVGFiV2lkZ2V0U3R5bGVQcm92aWRlcjtcclxuICBcclxuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcclxuICAgICAgICBpZiAoIVRhYldpZGdldFN0eWxlUHJvdmlkZXIuaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgVGFiV2lkZ2V0U3R5bGVQcm92aWRlci5pbnN0YW5jZSA9IG5ldyBUYWJXaWRnZXRTdHlsZVByb3ZpZGVyKCk7XHJcbiAgICAgICAgICAgIC8vIC4uLiBhbnkgb25lIHRpbWUgaW5pdGlhbGl6YXRpb24gZ29lcyBoZXJlIC4uLlxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gVGFiV2lkZ2V0U3R5bGVQcm92aWRlci5pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0RmxleFRhYlN0bHllKG5ld0xheW91dEVsZW1lbnRJZDogc3RyaW5nKXtcclxuICAgICAgICAkKFwiI1wiK25ld0xheW91dEVsZW1lbnRJZCtcIl90YWdfY29udGFpbmVyXCIpLmFkZENsYXNzKFwiVGFiQmFyVGFnRHJvcGRvd25cIik7XHJcbiAgICAgICAgJChcIiNcIituZXdMYXlvdXRFbGVtZW50SWQrXCJfdGFnX2hpZGRlblwiKS5hZGRDbGFzcyhcIlRhYkJhclRhZ0Ryb3Bkb3duXCIpO1xyXG4gICAgICAgICQoXCIjXCIrbmV3TGF5b3V0RWxlbWVudElkK1wiX3RhZ19kcm9wZG93blwiKS5hZGRDbGFzcyhcIlRhYkJhclRhZ0Ryb3Bkb3duXCIpO1xyXG5cclxuICAgIFxyXG4gICAgICAgICQoXCIjXCIrbmV3TGF5b3V0RWxlbWVudElkK1wiX3RhZ19oaWRkZW5cIikuY3NzKFwiYmFja2dyb3VuZFwiLCBcImluaGVyaXRcIik7XHJcbiAgICAgICAgJChcIiNcIituZXdMYXlvdXRFbGVtZW50SWQrXCJfdGFnX2hpZGRlblwiKS5jc3MoXCJjb2xvclwiLCBcIndoaXRlXCIpO1xyXG4gICAgICAgICQoXCIjXCIrbmV3TGF5b3V0RWxlbWVudElkK1wiX3RhZ19oaWRkZW5cIikuY3NzKFwib3BhY2l0eVwiLCBcIjFcIik7XHJcblxyXG4gICAgICAgIGxldCB3aWR0aCA9ICQoXCIjXCIrbmV3TGF5b3V0RWxlbWVudElkK1wiX3RhZ19wb3B1cF9saXN0X3dyYXBwZXJcIikuY3NzKFwid2lkdGhcIik7XHJcbiAgICAgICAgJChcIiNcIituZXdMYXlvdXRFbGVtZW50SWQrXCJfdGFnX2hpZGRlblwiKS5jc3MoXCJ3aWR0aFwiLCB3aWR0aCEpO1xyXG5cclxuICAgICAgICAkKFwiI1wiK25ld0xheW91dEVsZW1lbnRJZCtcIl90YWdfY29udGFpbmVyXCIpLmNzcyhcImJhY2tncm91bmRcIiwgXCJpbmhlcml0XCIpO1xyXG4gICAgICAgICQoXCIjXCIrbmV3TGF5b3V0RWxlbWVudElkK1wiX3RhZ19jb250YWluZXJcIikuY3NzKFwiY29sb3JcIiwgXCJ3aGl0ZVwiKTtcclxuXHJcbiAgICAgICAgJChcIiNcIituZXdMYXlvdXRFbGVtZW50SWQrXCJfdGFnX2Ryb3Bkb3duXCIpLmNzcyhcImJhY2tncm91bmRcIiwgXCJpbmhlcml0XCIpO1xyXG4gICAgICAgICQoXCIjXCIrbmV3TGF5b3V0RWxlbWVudElkK1wiX3RhZ19kcm9wZG93blwiKS5jc3MoXCJjb2xvclwiLCBcIndoaXRlXCIpO1xyXG4gICAgICAgICQoXCIjXCIrbmV3TGF5b3V0RWxlbWVudElkK1wiX3RhZ19kcm9wZG93blwiKS5jc3MoXCJib3JkZXJcIiwgXCIwcHhcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEZsZXhUYWJBY3RpdmVUYWJTdHlsZSh0YWJOYW1lOnN0cmluZyl7XHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YWJOYW1lKTtcclxuICAgICAgICBpZihlbGVtZW50ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHRhYkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YWJOYW1lK1wiX3RhYlwiKTtcclxuICAgICAgICBpZih0YWJFbGVtZW50ICE9ICB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0YWJFbGVtZW50LmNsYXNzTmFtZSArPSBcIiBhY3RpdmVcIjtcclxuICAgICAgICB9XHJcbiAgICB9IFxyXG59Il19