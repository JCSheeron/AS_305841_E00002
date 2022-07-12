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
define(["require", "exports", "../../framework/events", "../common/eventOpenViewArgs", "../../framework/property", "../common/viewTypeProvider", "../common/overviewTreeGridWidgetBase"], function (require, exports, events_1, eventOpenViewArgs_1, property_1, viewTypeProvider_1, overviewTreeGridWidgetBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventOpenView = /** @class */ (function (_super) {
        __extends(EventOpenView, _super);
        function EventOpenView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventOpenView;
    }(events_1.TypedEvent));
    ;
    /**
     * implements the ComponentOverviewWidget
     *
     * @class ComponentOverviewWidget
     * @extends {OverviewTreeGridWidgetBase}
     * @implements {IComponentOverviewWidget}
     */
    var ComponentOverviewWidget = /** @class */ (function (_super) {
        __extends(ComponentOverviewWidget, _super);
        function ComponentOverviewWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.eventOpenView = new EventOpenView();
            _this._components = property_1.Property.create([]);
            return _this;
        }
        ComponentOverviewWidget.prototype.getHeaderText = function () {
            return "Component Overview";
        };
        Object.defineProperty(ComponentOverviewWidget.prototype, "components", {
            get: function () {
                return this._components;
            },
            set: function (components) {
                var _this = this;
                this._components = components;
                this._components.changed(function (components) {
                    _this.updateComponentOverviewData();
                });
            },
            enumerable: true,
            configurable: true
        });
        ComponentOverviewWidget.prototype.activate = function () {
            this.updateComponentOverviewData();
        };
        ComponentOverviewWidget.prototype.updateComponentOverviewData = function () {
            if (this.mainDiv != undefined) {
                $(this.mainDiv).ejTreeGrid({
                    dataSource: this.components.value,
                });
            }
        };
        ComponentOverviewWidget.prototype.getTreeGridColumnDefinition = function () {
            return {
                columns: [
                    { field: "displayName", headerText: ComponentOverviewWidget.columnName, width: "350", allowSorting: true },
                    { field: "commandButtons", headerText: ComponentOverviewWidget.columnOpenView, allowSorting: false },
                ],
            };
        };
        ComponentOverviewWidget.prototype.getTreeGridColumnSorting = function () {
            return {
                allowSorting: true,
            };
        };
        ComponentOverviewWidget.prototype.getNameForCommandId = function (commandId) {
            return viewTypeProvider_1.ViewType[commandId];
        };
        ComponentOverviewWidget.prototype.getIconForCommandId = function (commandId) {
            return viewTypeProvider_1.ViewTypeProvider.getInstance().getIconClassByViewType(commandId);
        };
        ComponentOverviewWidget.prototype.getCommandIdsFromItem = function (item) {
            var component = item;
            // TODO get available views from component
            var availableViews = new Array();
            availableViews.push(viewTypeProvider_1.ViewType.Common);
            return availableViews;
        };
        ComponentOverviewWidget.prototype.getDefaultCommandFromComponent = function (component) {
            // TODO get default view from component
            return viewTypeProvider_1.ViewType.Common;
        };
        ComponentOverviewWidget.prototype.click = function (item, commandId) {
            var component = item;
            this.onOpenView(component, commandId);
        };
        ComponentOverviewWidget.prototype.doubleClick = function (args) {
            if (args.columnName == ComponentOverviewWidget.columnName && args.model.selectedItem != undefined) {
                var component = args.model.selectedItem.item;
                var defaultOpenViewType = this.getDefaultCommandFromComponent(component);
                this.onOpenView(component, defaultOpenViewType);
            }
        };
        ComponentOverviewWidget.prototype.onOpenView = function (component, openViewType) {
            var eventArgs = new eventOpenViewArgs_1.EventOpenViewArgs(this, component, openViewType);
            this.eventOpenView.raise(null, eventArgs);
        };
        ComponentOverviewWidget.columnName = "Name";
        ComponentOverviewWidget.columnOpenView = "Open View";
        return ComponentOverviewWidget;
    }(overviewTreeGridWidgetBase_1.OverviewTreeGridWidgetBase));
    exports.ComponentOverviewWidget = ComponentOverviewWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50T3ZlcnZpZXdXaWRnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29tcG9uZW50T3ZlcnZpZXdXaWRnZXQvY29tcG9uZW50T3ZlcnZpZXdXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVFBO1FBQTRCLGlDQUFtQztRQUEvRDs7UUFBaUUsQ0FBQztRQUFELG9CQUFDO0lBQUQsQ0FBQyxBQUFsRSxDQUE0QixtQkFBVSxHQUE0QjtJQUFBLENBQUM7SUFFbkU7Ozs7OztPQU1HO0lBQ0g7UUFBc0MsMkNBQTBCO1FBQWhFO1lBQUEscUVBeUZDO1lBdkZHLG1CQUFhLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztZQUk1QixpQkFBVyxHQUEyQyxtQkFBUSxDQUFDLE1BQU0sQ0FBOEIsRUFBRSxDQUFDLENBQUM7O1FBbUZuSCxDQUFDO1FBakZhLCtDQUFhLEdBQXZCO1lBQ0ksT0FBTyxvQkFBb0IsQ0FBQztRQUNoQyxDQUFDO1FBRUQsc0JBQVcsK0NBQVU7aUJBT3JCO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQTtZQUMzQixDQUFDO2lCQVRELFVBQXNCLFVBQWtEO2dCQUF4RSxpQkFLQztnQkFKRyxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztnQkFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQyxVQUFVO29CQUNoQyxLQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztnQkFDdkMsQ0FBQyxDQUFDLENBQUE7WUFDTixDQUFDOzs7V0FBQTtRQU1ELDBDQUFRLEdBQVI7WUFDSSxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztRQUN2QyxDQUFDO1FBRU8sNkRBQTJCLEdBQW5DO1lBRUksSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLFNBQVMsRUFBRTtnQkFDM0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLENBQUM7b0JBQzNCLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUs7aUJBQ2hDLENBQUMsQ0FBQzthQUNOO1FBQ0wsQ0FBQztRQUVTLDZEQUEyQixHQUFyQztZQUNJLE9BQU87Z0JBQ0gsT0FBTyxFQUFFO29CQUNMLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsdUJBQXVCLENBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBQztvQkFDekcsRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLHVCQUF1QixDQUFDLGNBQWMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFDO2lCQUN0RzthQUNKLENBQUM7UUFDTixDQUFDO1FBRVMsMERBQXdCLEdBQWxDO1lBQ0ksT0FBTztnQkFDSCxZQUFZLEVBQUUsSUFBSTthQUNyQixDQUFDO1FBQ04sQ0FBQztRQUVTLHFEQUFtQixHQUE3QixVQUE4QixTQUFpQjtZQUMzQyxPQUFPLDJCQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUVTLHFEQUFtQixHQUE3QixVQUE4QixTQUFpQjtZQUMzQyxPQUFPLG1DQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLHNCQUFzQixDQUFnQixTQUFTLENBQUMsQ0FBQztRQUMzRixDQUFDO1FBRVMsdURBQXFCLEdBQS9CLFVBQWdDLElBQUk7WUFDaEMsSUFBSSxTQUFTLEdBQXlCLElBQUksQ0FBQztZQUMzQywwQ0FBMEM7WUFDMUMsSUFBSSxjQUFjLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUNqQyxjQUFjLENBQUMsSUFBSSxDQUFDLDJCQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDckMsT0FBTyxjQUFjLENBQUM7UUFDMUIsQ0FBQztRQUVPLGdFQUE4QixHQUF0QyxVQUF1QyxTQUErQjtZQUNsRSx1Q0FBdUM7WUFDeEMsT0FBTywyQkFBUSxDQUFDLE1BQU0sQ0FBQztRQUMxQixDQUFDO1FBRVMsdUNBQUssR0FBZixVQUFnQixJQUFJLEVBQUUsU0FBUztZQUMzQixJQUFJLFNBQVMsR0FBeUIsSUFBSSxDQUFDO1lBQzNDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzFDLENBQUM7UUFFUyw2Q0FBVyxHQUFyQixVQUFzQixJQUFJO1lBQ3RCLElBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSx1QkFBdUIsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLElBQUksU0FBUyxFQUFDO2dCQUM3RixJQUFJLFNBQVMsR0FBeUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO2dCQUNuRSxJQUFJLG1CQUFtQixHQUFHLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDekUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsbUJBQW1CLENBQUMsQ0FBQzthQUNuRDtRQUNMLENBQUM7UUFFTyw0Q0FBVSxHQUFsQixVQUFtQixTQUE4QixFQUFFLFlBQXFCO1lBQ3BFLElBQUksU0FBUyxHQUFHLElBQUkscUNBQWlCLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUNyRSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDOUMsQ0FBQztRQXBGYSxrQ0FBVSxHQUFHLE1BQU0sQ0FBQztRQUNwQixzQ0FBYyxHQUFHLFdBQVcsQ0FBQztRQW9GL0MsOEJBQUM7S0FBQSxBQXpGRCxDQUFzQyx1REFBMEIsR0F5Ri9EO0lBRVEsMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9jb21wb25lbnRPdmVydmlld1dpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9ldmVudHNcIjtcclxuaW1wb3J0IHsgRXZlbnRPcGVuVmlld0FyZ3MgfSBmcm9tIFwiLi4vY29tbW9uL2V2ZW50T3BlblZpZXdBcmdzXCI7XHJcbmltcG9ydCB7IFByb3BlcnR5IH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9wcm9wZXJ0eVwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFZpZXdUeXBlLCBWaWV3VHlwZVByb3ZpZGVyLCAgfSBmcm9tIFwiLi4vY29tbW9uL3ZpZXdUeXBlUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgT3ZlcnZpZXdUcmVlR3JpZFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL292ZXJ2aWV3VHJlZUdyaWRXaWRnZXRCYXNlXCI7XHJcblxyXG5jbGFzcyBFdmVudE9wZW5WaWV3IGV4dGVuZHMgVHlwZWRFdmVudDxudWxsLCBFdmVudE9wZW5WaWV3QXJncz57IH07XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyB0aGUgQ29tcG9uZW50T3ZlcnZpZXdXaWRnZXRcclxuICpcclxuICogQGNsYXNzIENvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0XHJcbiAqIEBleHRlbmRzIHtPdmVydmlld1RyZWVHcmlkV2lkZ2V0QmFzZX1cclxuICogQGltcGxlbWVudHMge0lDb21wb25lbnRPdmVydmlld1dpZGdldH1cclxuICovXHJcbmNsYXNzIENvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0IGV4dGVuZHMgT3ZlcnZpZXdUcmVlR3JpZFdpZGdldEJhc2UgaW1wbGVtZW50cyBJQ29tcG9uZW50T3ZlcnZpZXdXaWRnZXQge1xyXG4gICBcclxuICAgIGV2ZW50T3BlblZpZXcgPSBuZXcgRXZlbnRPcGVuVmlldygpO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY29sdW1uTmFtZSA9IFwiTmFtZVwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBjb2x1bW5PcGVuVmlldyA9IFwiT3BlbiBWaWV3XCI7XHJcbiAgICBwcml2YXRlIF9jb21wb25lbnRzOiAgUHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnQ+PiA9IFByb3BlcnR5LmNyZWF0ZTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudD4+KFtdKTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0SGVhZGVyVGV4dCgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIFwiQ29tcG9uZW50IE92ZXJ2aWV3XCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjb21wb25lbnRzKGNvbXBvbmVudHMgOiBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudD4+KSB7XHJcbiAgICAgICAgdGhpcy5fY29tcG9uZW50cyA9IGNvbXBvbmVudHM7XHJcbiAgICAgICAgdGhpcy5fY29tcG9uZW50cy5jaGFuZ2VkKChjb21wb25lbnRzKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbXBvbmVudE92ZXJ2aWV3RGF0YSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXQgY29tcG9uZW50cygpIDogUHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnQ+PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBvbmVudHNcclxuICAgIH1cclxuXHJcbiAgICBhY3RpdmF0ZSgpe1xyXG4gICAgICAgIHRoaXMudXBkYXRlQ29tcG9uZW50T3ZlcnZpZXdEYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVDb21wb25lbnRPdmVydmlld0RhdGEoKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm1haW5EaXYgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICQodGhpcy5tYWluRGl2KS5lalRyZWVHcmlkKHtcclxuICAgICAgICAgICAgZGF0YVNvdXJjZTogdGhpcy5jb21wb25lbnRzLnZhbHVlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpOiB7fXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb2x1bW5zOiBbXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcImRpc3BsYXlOYW1lXCIsIGhlYWRlclRleHQ6IENvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0LmNvbHVtbk5hbWUsIHdpZHRoOiBcIjM1MFwiLCBhbGxvd1NvcnRpbmc6IHRydWV9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJjb21tYW5kQnV0dG9uc1wiLCBoZWFkZXJUZXh0OiBDb21wb25lbnRPdmVydmlld1dpZGdldC5jb2x1bW5PcGVuVmlldywgYWxsb3dTb3J0aW5nOiBmYWxzZX0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIGdldFRyZWVHcmlkQ29sdW1uU29ydGluZygpOiB7fXtcclxuICAgICAgICByZXR1cm4geyAgICAgICAgXHJcbiAgICAgICAgICAgIGFsbG93U29ydGluZzogdHJ1ZSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBnZXROYW1lRm9yQ29tbWFuZElkKGNvbW1hbmRJZDogc3RyaW5nKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBWaWV3VHlwZVtjb21tYW5kSWRdO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBnZXRJY29uRm9yQ29tbWFuZElkKGNvbW1hbmRJZDogc3RyaW5nKSA6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gVmlld1R5cGVQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldEljb25DbGFzc0J5Vmlld1R5cGUoPFZpZXdUeXBlPjxhbnk+Y29tbWFuZElkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0Q29tbWFuZElkc0Zyb21JdGVtKGl0ZW0pOiBBcnJheTxzdHJpbmc+e1xyXG4gICAgICAgIGxldCBjb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50ID0gaXRlbTtcclxuICAgICAgICAvLyBUT0RPIGdldCBhdmFpbGFibGUgdmlld3MgZnJvbSBjb21wb25lbnRcclxuICAgICAgICBsZXQgYXZhaWxhYmxlVmlld3MgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICBhdmFpbGFibGVWaWV3cy5wdXNoKFZpZXdUeXBlLkNvbW1vbik7XHJcbiAgICAgICAgcmV0dXJuIGF2YWlsYWJsZVZpZXdzO1xyXG4gICAgfSAgXHJcblxyXG4gICAgcHJpdmF0ZSBnZXREZWZhdWx0Q29tbWFuZEZyb21Db21wb25lbnQoY29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudCk6IFZpZXdUeXBle1xyXG4gICAgICAgIC8vIFRPRE8gZ2V0IGRlZmF1bHQgdmlldyBmcm9tIGNvbXBvbmVudFxyXG4gICAgICAgcmV0dXJuIFZpZXdUeXBlLkNvbW1vbjtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgY2xpY2soaXRlbSwgY29tbWFuZElkKXtcclxuICAgICAgICBsZXQgY29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudCA9IGl0ZW07XHJcbiAgICAgICAgdGhpcy5vbk9wZW5WaWV3KGNvbXBvbmVudCwgY29tbWFuZElkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZG91YmxlQ2xpY2soYXJncyl7XHJcbiAgICAgICAgaWYoYXJncy5jb2x1bW5OYW1lID09IENvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0LmNvbHVtbk5hbWUgJiYgYXJncy5tb2RlbC5zZWxlY3RlZEl0ZW0gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IGNvbXBvbmVudDogTWFwcENvY2twaXRDb21wb25lbnQgPSBhcmdzLm1vZGVsLnNlbGVjdGVkSXRlbS5pdGVtO1xyXG4gICAgICAgICAgICBsZXQgZGVmYXVsdE9wZW5WaWV3VHlwZSA9IHRoaXMuZ2V0RGVmYXVsdENvbW1hbmRGcm9tQ29tcG9uZW50KGNvbXBvbmVudCk7IFxyXG4gICAgICAgICAgICB0aGlzLm9uT3BlblZpZXcoY29tcG9uZW50LCBkZWZhdWx0T3BlblZpZXdUeXBlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbk9wZW5WaWV3KGNvbXBvbmVudDpNYXBwQ29ja3BpdENvbXBvbmVudCwgb3BlblZpZXdUeXBlOlZpZXdUeXBlICkge1xyXG4gICAgICAgIGxldCBldmVudEFyZ3MgPSBuZXcgRXZlbnRPcGVuVmlld0FyZ3ModGhpcywgY29tcG9uZW50LCBvcGVuVmlld1R5cGUpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRPcGVuVmlldy5yYWlzZShudWxsLCBldmVudEFyZ3MpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBDb21wb25lbnRPdmVydmlld1dpZGdldCB9OyJdfQ==