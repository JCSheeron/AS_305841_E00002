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
define(["require", "exports", "../../framework/events", "../common/eventWidgetActivatedArgs", "../common/layoutWidgetBase", "../common/widgetBase"], function (require, exports, events_1, eventWidgetActivatedArgs_1, layoutWidgetBase_1, widgetBase_1) {
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
    // Declare the initial layout fragment for the tab widget
    var tabBootLayout = '<div><ul></ul></div>';
    /**
     * Implements a widget with alternatively selectable tabs
     *
     * @class TabWidget
     * @implements {TabWidgetInterface}
     */
    var TabWidgetSF = /** @class */ (function (_super) {
        __extends(TabWidgetSF, _super);
        function TabWidgetSF() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // Events
            _this.eventWidgetActivated = new EventWidgetActivated();
            _this.eventSizeChanged = new EventSizeChanged();
            return _this;
        }
        TabWidgetSF.prototype.initialize = function () {
            // add initial layout fragment for the tab widget
            var $tabContent = $(tabBootLayout);
            var layoutContainerId = widgetBase_1.WidgetBase.getUniqueDivId();
            $("#" + layoutContainerId).append($tabContent);
            _super.prototype.initialize.call(this);
        };
        /**
         * Creates the layout of the widget
         *
         * @memberof TabWidgetSF
         */
        TabWidgetSF.prototype.createLayout = function () {
            var _this = this;
            // Create the tab widget
            $(this.mainDiv).ejTab({
                heightAdjustMode: "None",
                itemActive: function (args) {
                    _this.onTabHasActivated(args.activeIndex);
                },
            });
        };
        TabWidgetSF.prototype.resize = function (width, height) {
            // Set size of tab control itself
            this.mainDiv.style.width = width + "px";
            this.mainDiv.style.height = height + "px";
            // Set the sizes of the contents of this tab control
            var tabHeaderSize = 45; // TODO: get actual tab header height( )
            var innerTabWidth = width - 2; // 2px for the border to avoid scrollbars
            var innerTabHeight = height - tabHeaderSize;
            this._widgets.forEach(function (widget) {
                if (widget != undefined) {
                    widget.resize(innerTabWidth, innerTabHeight);
                }
            });
        };
        TabWidgetSF.prototype.addWidget = function (widget, name, viewType) {
            _super.prototype.addWidget.call(this, widget, name, viewType);
            // Add a tab item
            var ejTabInstance = $(this.mainDiv).data("ejTab");
            if (ejTabInstance) {
                var ejTabId = "tab_" + name.replace(" ", "");
                ejTabInstance.addItem("#" + ejTabId, name, ejTabInstance.getItemsCount(), "", ejTabId);
                $("#" + ejTabId)[0].style.padding = "0px";
                $("#" + ejTabId)[0].style.overflow = "hidden";
                // add inner element to ej tab element for the content of this tab
                var innerTabId = "inner_" + ejTabId;
                var innerTabDiv = document.createElement("div");
                innerTabDiv.id = innerTabId;
                innerTabDiv.style.padding = "0px";
                $("#" + ejTabId).append(innerTabDiv);
                widget.initialize();
                // add widget to the parent container
                widget.addToParentContainer(innerTabDiv);
            }
        };
        /**
           * Notifies that a tab has activated
           *
           * @private
           */
        TabWidgetSF.prototype.onTabHasActivated = function (activeIndex) {
            var args = new eventWidgetActivatedArgs_1.EventWidgetActivatedArgs(this, "tab has activated", this._widgets.get(activeIndex));
            this.eventWidgetActivated.raise(null, args);
        };
        return TabWidgetSF;
    }(layoutWidgetBase_1.LayoutWidgetBase));
    exports.TabWidgetSF = TabWidgetSF;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiV2lkZ2V0U0YuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvdGFiV2lkZ2V0U0YvdGFiV2lkZ2V0U0YudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVFBO1FBQW1DLHdDQUEwQztRQUE3RTs7UUFBK0UsQ0FBQztRQUFELDJCQUFDO0lBQUQsQ0FBQyxBQUFoRixDQUFtQyxtQkFBVSxHQUFtQztJQUFBLENBQUM7SUFDakY7UUFBK0Isb0NBQXNCO1FBQXJEOztRQUF1RCxDQUFDO1FBQUQsdUJBQUM7SUFBRCxDQUFDLEFBQXhELENBQStCLG1CQUFVLEdBQWU7SUFBQSxDQUFDO0lBRXpELHlEQUF5RDtJQUN6RCxJQUFNLGFBQWEsR0FBRyxzQkFBc0IsQ0FBQztJQUU3Qzs7Ozs7T0FLRztJQUNIO1FBQTBCLCtCQUFnQjtRQUExQztZQUFBLHFFQWtGQztZQWhGRyxTQUFTO1lBQ1QsMEJBQW9CLEdBQUcsSUFBSSxvQkFBb0IsRUFBRSxDQUFDO1lBQ2xELHNCQUFnQixHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQzs7UUE4RTlDLENBQUM7UUE1RUcsZ0NBQVUsR0FBVjtZQUVJLGlEQUFpRDtZQUNqRCxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDbkMsSUFBSSxpQkFBaUIsR0FBRyx1QkFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3BELENBQUMsQ0FBQyxHQUFHLEdBQUcsaUJBQWlCLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFL0MsaUJBQU0sVUFBVSxXQUFFLENBQUM7UUFDdkIsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCxrQ0FBWSxHQUFaO1lBQUEsaUJBUUM7WUFQRyx3QkFBd0I7WUFDeEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQ2xCLGdCQUFnQixFQUFFLE1B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O0lBQUQsQ0FBQyxBQWxGRCxDQUEwQixtQ0FBZ0IsR0FrRnpDO0lBRVEsa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vbGlicy91aS9UeXBlcy9lai53ZWIuYWxsLmQudHNcIiAvPlxyXG5pbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9ldmVudHNcIjtcclxuaW1wb3J0IHsgRXZlbnRXaWRnZXRBY3RpdmF0ZWRBcmdzIH0gZnJvbSBcIi4uL2NvbW1vbi9ldmVudFdpZGdldEFjdGl2YXRlZEFyZ3NcIjtcclxuaW1wb3J0IHsgSVdpZGdldCB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy93aWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgTGF5b3V0V2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vbGF5b3V0V2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBWaWV3VHlwZSB9IGZyb20gXCIuLi9jb21tb24vdmlld1R5cGVQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi93aWRnZXRCYXNlXCI7XHJcblxyXG5jbGFzcyBFdmVudFdpZGdldEFjdGl2YXRlZCBleHRlbmRzIFR5cGVkRXZlbnQ8bnVsbCwgRXZlbnRXaWRnZXRBY3RpdmF0ZWRBcmdzPnsgfTtcclxuY2xhc3MgRXZlbnRTaXplQ2hhbmdlZCBleHRlbmRzIFR5cGVkRXZlbnQ8bnVsbCwgbnVsbD57IH07XHJcblxyXG4vLyBEZWNsYXJlIHRoZSBpbml0aWFsIGxheW91dCBmcmFnbWVudCBmb3IgdGhlIHRhYiB3aWRnZXRcclxuY29uc3QgdGFiQm9vdExheW91dCA9ICc8ZGl2Pjx1bD48L3VsPjwvZGl2Pic7XHJcblxyXG4vKipcclxuICogSW1wbGVtZW50cyBhIHdpZGdldCB3aXRoIGFsdGVybmF0aXZlbHkgc2VsZWN0YWJsZSB0YWJzXHJcbiAqXHJcbiAqIEBjbGFzcyBUYWJXaWRnZXRcclxuICogQGltcGxlbWVudHMge1RhYldpZGdldEludGVyZmFjZX1cclxuICovXHJcbmNsYXNzIFRhYldpZGdldFNGIGV4dGVuZHMgTGF5b3V0V2lkZ2V0QmFzZSB7XHJcblxyXG4gICAgLy8gRXZlbnRzXHJcbiAgICBldmVudFdpZGdldEFjdGl2YXRlZCA9IG5ldyBFdmVudFdpZGdldEFjdGl2YXRlZCgpO1xyXG4gICAgZXZlbnRTaXplQ2hhbmdlZCA9IG5ldyBFdmVudFNpemVDaGFuZ2VkKCk7XHJcblxyXG4gICAgaW5pdGlhbGl6ZSgpIHtcclxuXHJcbiAgICAgICAgLy8gYWRkIGluaXRpYWwgbGF5b3V0IGZyYWdtZW50IGZvciB0aGUgdGFiIHdpZGdldFxyXG4gICAgICAgIHZhciAkdGFiQ29udGVudCA9ICQodGFiQm9vdExheW91dCk7XHJcbiAgICAgICAgbGV0IGxheW91dENvbnRhaW5lcklkID0gV2lkZ2V0QmFzZS5nZXRVbmlxdWVEaXZJZCgpO1xyXG4gICAgICAgICQoXCIjXCIgKyBsYXlvdXRDb250YWluZXJJZCkuYXBwZW5kKCR0YWJDb250ZW50KTtcclxuICAgICAgICBcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBsYXlvdXQgb2YgdGhlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRTRlxyXG4gICAgICovXHJcbiAgICBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSB0YWIgd2lkZ2V0XHJcbiAgICAgICAgJCh0aGlzLm1haW5EaXYpLmVqVGFiKHtcclxuICAgICAgICAgICAgaGVpZ2h0QWRqdXN0TW9kZTogXCJOb25lXCIsXHJcbiAgICAgICAgICAgIGl0ZW1BY3RpdmU6IChhcmdzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uVGFiSGFzQWN0aXZhdGVkKGFyZ3MuYWN0aXZlSW5kZXgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcil7XHJcbiAgICAgICAgLy8gU2V0IHNpemUgb2YgdGFiIGNvbnRyb2wgaXRzZWxmXHJcbiAgICAgICAgdGhpcy5tYWluRGl2LnN0eWxlLndpZHRoID0gd2lkdGggKyBcInB4XCI7XHJcbiAgICAgICAgdGhpcy5tYWluRGl2LnN0eWxlLmhlaWdodCA9IGhlaWdodCArIFwicHhcIjtcclxuXHJcbiAgICAgICAgLy8gU2V0IHRoZSBzaXplcyBvZiB0aGUgY29udGVudHMgb2YgdGhpcyB0YWIgY29udHJvbFxyXG4gICAgICAgIHZhciB0YWJIZWFkZXJTaXplID0gNDU7IC8vIFRPRE86IGdldCBhY3R1YWwgdGFiIGhlYWRlciBoZWlnaHQoIClcclxuICAgICAgICB2YXIgaW5uZXJUYWJXaWR0aCA9IHdpZHRoLTI7IC8vIDJweCBmb3IgdGhlIGJvcmRlciB0byBhdm9pZCBzY3JvbGxiYXJzXHJcbiAgICAgICAgdmFyIGlubmVyVGFiSGVpZ2h0ID0gaGVpZ2h0LXRhYkhlYWRlclNpemU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fd2lkZ2V0cy5mb3JFYWNoKCh3aWRnZXQpID0+IHtcclxuICAgICAgICAgICAgaWYod2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB3aWRnZXQucmVzaXplKGlubmVyVGFiV2lkdGgsIGlubmVyVGFiSGVpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBhZGRXaWRnZXQod2lkZ2V0OiBJV2lkZ2V0LCBuYW1lOiBzdHJpbmcsIHZpZXdUeXBlOiBWaWV3VHlwZSkge1xyXG5cclxuICAgICAgICBzdXBlci5hZGRXaWRnZXQod2lkZ2V0LCBuYW1lLCB2aWV3VHlwZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQWRkIGEgdGFiIGl0ZW1cclxuICAgICAgICB2YXIgZWpUYWJJbnN0YW5jZSA9ICQodGhpcy5tYWluRGl2KS5kYXRhKFwiZWpUYWJcIik7XHJcbiAgICAgICAgaWYgKGVqVGFiSW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgbGV0IGVqVGFiSWQgPSBcInRhYl9cIiArIG5hbWUucmVwbGFjZShcIiBcIiwgXCJcIik7XHJcbiAgICAgICAgICAgIGVqVGFiSW5zdGFuY2UuYWRkSXRlbShcIiNcIiArIGVqVGFiSWQsIG5hbWUsIGVqVGFiSW5zdGFuY2UuZ2V0SXRlbXNDb3VudCgpLCBcIlwiLCBlalRhYklkKTtcclxuICAgICAgICAgICAgJChcIiNcIiArIGVqVGFiSWQpWzBdLnN0eWxlLnBhZGRpbmcgPSBcIjBweFwiO1xyXG4gICAgICAgICAgICAkKFwiI1wiICsgZWpUYWJJZClbMF0uc3R5bGUub3ZlcmZsb3cgPVwiaGlkZGVuXCI7XHJcblxyXG4gICAgICAgICAgICAvLyBhZGQgaW5uZXIgZWxlbWVudCB0byBlaiB0YWIgZWxlbWVudCBmb3IgdGhlIGNvbnRlbnQgb2YgdGhpcyB0YWJcclxuICAgICAgICAgICAgbGV0IGlubmVyVGFiSWQgPSBcImlubmVyX1wiICsgZWpUYWJJZDtcclxuICAgICAgICAgICAgbGV0IGlubmVyVGFiRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgaW5uZXJUYWJEaXYuaWQgPSBpbm5lclRhYklkO1xyXG4gICAgICAgICAgICBpbm5lclRhYkRpdi5zdHlsZS5wYWRkaW5nID0gXCIwcHhcIjtcclxuXHJcbiAgICAgICAgICAgICQoXCIjXCIgKyBlalRhYklkKS5hcHBlbmQoaW5uZXJUYWJEaXYpO1xyXG4gICAgICAgICAgICB3aWRnZXQuaW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgICAgICAvLyBhZGQgd2lkZ2V0IHRvIHRoZSBwYXJlbnQgY29udGFpbmVyXHJcbiAgICAgICAgICAgIHdpZGdldC5hZGRUb1BhcmVudENvbnRhaW5lcihpbm5lclRhYkRpdik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuLyoqXHJcbiAgICogTm90aWZpZXMgdGhhdCBhIHRhYiBoYXMgYWN0aXZhdGVkXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25UYWJIYXNBY3RpdmF0ZWQoYWN0aXZlSW5kZXgpIHtcclxuICAgIHZhciBhcmdzID0gbmV3IEV2ZW50V2lkZ2V0QWN0aXZhdGVkQXJncyh0aGlzLCBcInRhYiBoYXMgYWN0aXZhdGVkXCIsIHRoaXMuX3dpZGdldHMuZ2V0KGFjdGl2ZUluZGV4KSk7XHJcbiAgICB0aGlzLmV2ZW50V2lkZ2V0QWN0aXZhdGVkLnJhaXNlKG51bGwsIGFyZ3MpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHsgVGFiV2lkZ2V0U0YgfTsiXX0=