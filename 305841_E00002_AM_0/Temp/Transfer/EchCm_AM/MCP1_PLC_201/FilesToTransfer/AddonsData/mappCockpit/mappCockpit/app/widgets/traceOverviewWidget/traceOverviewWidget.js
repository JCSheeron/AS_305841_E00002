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
define(["require", "exports", "../common/overviewTreeGridWidgetBase", "../../framework/events", "../common/eventOpenViewArgs", "../../framework/property", "../common/viewTypeProvider"], function (require, exports, overviewTreeGridWidgetBase_1, events_1, eventOpenViewArgs_1, property_1, viewTypeProvider_1) {
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
     * implements the TraceOverviewWidget
     *
     * @class TraceOverviewWidget
     * @extends {OverviewTreeGridWidgetBase}
     * @implements {ITraceOverviewWidget}
     */
    var TraceOverviewWidget = /** @class */ (function (_super) {
        __extends(TraceOverviewWidget, _super);
        function TraceOverviewWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.eventOpenView = new EventOpenView();
            _this._components = property_1.Property.create([]);
            return _this;
        }
        TraceOverviewWidget.prototype.getHeaderText = function () {
            return "Trace Overview";
        };
        Object.defineProperty(TraceOverviewWidget.prototype, "components", {
            get: function () {
                return this._components;
            },
            set: function (components) {
                this._components = components;
                if (this._components.value.length > 0) {
                    this.updateTraceOverviewData();
                }
            },
            enumerable: true,
            configurable: true
        });
        TraceOverviewWidget.prototype.activate = function () {
            this.updateTraceOverviewData();
        };
        TraceOverviewWidget.prototype.updateTraceOverviewData = function () {
            if (this.components.value == undefined) {
                return;
            }
            var mainDiv = $(this.mainDiv);
            if (mainDiv != undefined) {
                mainDiv.ejTreeGrid({
                    dataSource: this.components.value,
                });
            }
        };
        TraceOverviewWidget.prototype.getTreeGridColumnDefinition = function () {
            return {
                columns: [
                    { field: "displayName", headerText: TraceOverviewWidget.columnName, width: "350" },
                    { field: "commandButtons", headerText: TraceOverviewWidget.columnOpenView },
                ],
            };
        };
        TraceOverviewWidget.prototype.getNameForCommandId = function (commandId) {
            return viewTypeProvider_1.ViewType[commandId];
        };
        TraceOverviewWidget.prototype.getIconForCommandId = function (commandId) {
            return viewTypeProvider_1.ViewTypeProvider.getInstance().getIconClassByViewType(commandId);
        };
        TraceOverviewWidget.prototype.getCommandIdsFromItem = function (item) {
            var component = item;
            // TODO get available views from component
            var availableViews = new Array();
            availableViews.push(viewTypeProvider_1.ViewType.Configuration);
            availableViews.push(viewTypeProvider_1.ViewType.Analysis);
            return availableViews;
        };
        TraceOverviewWidget.prototype.getDefaultCommandFromComponent = function (component) {
            // TODO get default view from component
            return viewTypeProvider_1.ViewType.Analysis;
        };
        TraceOverviewWidget.prototype.click = function (item, commandId) {
            var component = item;
            this.onOpenView(component, commandId);
        };
        TraceOverviewWidget.prototype.doubleClick = function (args) {
            if (args.columnName == TraceOverviewWidget.columnName && args.model.selectedItem != undefined) {
                var component = args.model.selectedItem.item;
                var defaultOpenViewType = this.getDefaultCommandFromComponent(component);
                this.onOpenView(component, defaultOpenViewType);
            }
        };
        TraceOverviewWidget.prototype.onOpenView = function (component, openViewType) {
            var eventArgs = new eventOpenViewArgs_1.EventOpenViewArgs(this, component, openViewType);
            this.eventOpenView.raise(null, eventArgs);
        };
        TraceOverviewWidget.columnName = "Name";
        TraceOverviewWidget.columnOpenView = "Open View";
        return TraceOverviewWidget;
    }(overviewTreeGridWidgetBase_1.OverviewTreeGridWidgetBase));
    exports.TraceOverviewWidget = TraceOverviewWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VPdmVydmlld1dpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy90cmFjZU92ZXJ2aWV3V2lkZ2V0L3RyYWNlT3ZlcnZpZXdXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVNBO1FBQTRCLGlDQUFtQztRQUEvRDs7UUFBaUUsQ0FBQztRQUFELG9CQUFDO0lBQUQsQ0FBQyxBQUFsRSxDQUE0QixtQkFBVSxHQUE0QjtJQUFBLENBQUM7SUFFbkU7Ozs7OztPQU1HO0lBQ0g7UUFBa0MsdUNBQTBCO1FBQTVEO1lBQUEscUVBd0ZDO1lBdEZHLG1CQUFhLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztZQUs1QixpQkFBVyxHQUFnRCxtQkFBUSxDQUFDLE1BQU0sQ0FBbUMsRUFBRSxDQUFDLENBQUM7O1FBaUY3SCxDQUFDO1FBL0VhLDJDQUFhLEdBQXZCO1lBQ0ksT0FBTyxnQkFBZ0IsQ0FBQztRQUM1QixDQUFDO1FBRUQsc0JBQVcsMkNBQVU7aUJBT3JCO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQTtZQUMzQixDQUFDO2lCQVRELFVBQXNCLFVBQXVEO2dCQUN6RSxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztnQkFDOUIsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUNuQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztpQkFDbEM7WUFDTCxDQUFDOzs7V0FBQTtRQU1ELHNDQUFRLEdBQVI7WUFDSSxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUNuQyxDQUFDO1FBRU8scURBQXVCLEdBQS9CO1lBQ0ksSUFBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssSUFBSSxTQUFTLEVBQUM7Z0JBQ2xDLE9BQU87YUFDVjtZQUNELElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUIsSUFBRyxPQUFPLElBQUksU0FBUyxFQUFDO2dCQUNwQixPQUFPLENBQUMsVUFBVSxDQUFDO29CQUNmLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUs7aUJBQ3BDLENBQUMsQ0FBQzthQUNOO1FBQ0wsQ0FBQztRQUVTLHlEQUEyQixHQUFyQztZQUNJLE9BQU87Z0JBQ0gsT0FBTyxFQUFFO29CQUNMLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsbUJBQW1CLENBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7b0JBQ2xGLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFFLFVBQVUsRUFBRSxtQkFBbUIsQ0FBQyxjQUFjLEVBQUU7aUJBQzlFO2FBQ0osQ0FBQztRQUNOLENBQUM7UUFFUyxpREFBbUIsR0FBN0IsVUFBOEIsU0FBaUI7WUFDM0MsT0FBTywyQkFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9CLENBQUM7UUFFUyxpREFBbUIsR0FBN0IsVUFBOEIsU0FBaUI7WUFDM0MsT0FBTyxtQ0FBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBZ0IsU0FBUyxDQUFDLENBQUM7UUFDM0YsQ0FBQztRQUVTLG1EQUFxQixHQUEvQixVQUFnQyxJQUFJO1lBQ2hDLElBQUksU0FBUyxHQUF5QixJQUFJLENBQUM7WUFDM0MsMENBQTBDO1lBQzFDLElBQUksY0FBYyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7WUFDakMsY0FBYyxDQUFDLElBQUksQ0FBQywyQkFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzVDLGNBQWMsQ0FBQyxJQUFJLENBQUMsMkJBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN2QyxPQUFPLGNBQWMsQ0FBQztRQUMxQixDQUFDO1FBRU8sNERBQThCLEdBQXRDLFVBQXVDLFNBQStCO1lBQ2pFLHVDQUF1QztZQUN4QyxPQUFPLDJCQUFRLENBQUMsUUFBUSxDQUFDO1FBQzdCLENBQUM7UUFFUyxtQ0FBSyxHQUFmLFVBQWdCLElBQUksRUFBRSxTQUFTO1lBQzNCLElBQUksU0FBUyxHQUF5QixJQUFJLENBQUM7WUFDM0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUVTLHlDQUFXLEdBQXJCLFVBQXNCLElBQUk7WUFDdEIsSUFBRyxJQUFJLENBQUMsVUFBVSxJQUFJLG1CQUFtQixDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksSUFBSSxTQUFTLEVBQUM7Z0JBQ3pGLElBQUksU0FBUyxHQUF5QixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7Z0JBQ25FLElBQUksbUJBQW1CLEdBQUcsSUFBSSxDQUFDLDhCQUE4QixDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN6RSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO2FBQ25EO1FBQ0wsQ0FBQztRQUVPLHdDQUFVLEdBQWxCLFVBQW1CLFNBQThCLEVBQUUsWUFBcUI7WUFDcEUsSUFBSSxTQUFTLEdBQUcsSUFBSSxxQ0FBaUIsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFBO1lBQ3BFLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUM5QyxDQUFDO1FBbkZhLDhCQUFVLEdBQUcsTUFBTSxDQUFDO1FBQ3BCLGtDQUFjLEdBQUcsV0FBVyxDQUFDO1FBbUYvQywwQkFBQztLQUFBLEFBeEZELENBQWtDLHVEQUEwQixHQXdGM0Q7SUFFUSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJVHJhY2VPdmVydmlld1dpZGdldCB9IGZyb20gXCIuL2ludGVyZmFjZXMvdHJhY2VPdmVydmlld1dpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBPdmVydmlld1RyZWVHcmlkV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vb3ZlcnZpZXdUcmVlR3JpZFdpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IEV2ZW50T3BlblZpZXdBcmdzIH0gZnJvbSBcIi4uL2NvbW1vbi9ldmVudE9wZW5WaWV3QXJnc1wiO1xyXG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvcHJvcGVydHlcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBWaWV3VHlwZSwgVmlld1R5cGVQcm92aWRlciB9IGZyb20gXCIuLi9jb21tb24vdmlld1R5cGVQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9kaWFnbm9zdGljcy90cmFjZS9tYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50XCI7XHJcblxyXG5jbGFzcyBFdmVudE9wZW5WaWV3IGV4dGVuZHMgVHlwZWRFdmVudDxudWxsLCBFdmVudE9wZW5WaWV3QXJncz57IH07XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyB0aGUgVHJhY2VPdmVydmlld1dpZGdldFxyXG4gKlxyXG4gKiBAY2xhc3MgVHJhY2VPdmVydmlld1dpZGdldFxyXG4gKiBAZXh0ZW5kcyB7T3ZlcnZpZXdUcmVlR3JpZFdpZGdldEJhc2V9XHJcbiAqIEBpbXBsZW1lbnRzIHtJVHJhY2VPdmVydmlld1dpZGdldH1cclxuICovXHJcbmNsYXNzIFRyYWNlT3ZlcnZpZXdXaWRnZXQgZXh0ZW5kcyBPdmVydmlld1RyZWVHcmlkV2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElUcmFjZU92ZXJ2aWV3V2lkZ2V0IHtcclxuXHJcbiAgICBldmVudE9wZW5WaWV3ID0gbmV3IEV2ZW50T3BlblZpZXcoKTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNvbHVtbk5hbWUgPSBcIk5hbWVcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgY29sdW1uT3BlblZpZXcgPSBcIk9wZW4gVmlld1wiO1xyXG5cclxuICAgIHByaXZhdGUgX2NvbXBvbmVudHM6ICBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50Pj4gPSBQcm9wZXJ0eS5jcmVhdGU8QXJyYXk8TWFwcENvY2twaXRUcmFjZUNvbXBvbmVudD4+KFtdKTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0SGVhZGVyVGV4dCgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIFwiVHJhY2UgT3ZlcnZpZXdcIjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGNvbXBvbmVudHMoY29tcG9uZW50cyA6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnQ+Pikge1xyXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudHMgPSBjb21wb25lbnRzO1xyXG4gICAgICAgIGlmICh0aGlzLl9jb21wb25lbnRzLnZhbHVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVUcmFjZU92ZXJ2aWV3RGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGdldCBjb21wb25lbnRzKCkgOiBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50Pj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb21wb25lbnRzXHJcbiAgICB9XHJcblxyXG4gICAgYWN0aXZhdGUoKXtcclxuICAgICAgICB0aGlzLnVwZGF0ZVRyYWNlT3ZlcnZpZXdEYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVUcmFjZU92ZXJ2aWV3RGF0YSgpIHtcclxuICAgICAgICBpZih0aGlzLmNvbXBvbmVudHMudmFsdWUgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbWFpbkRpdiA9ICQodGhpcy5tYWluRGl2KTtcclxuICAgICAgICBpZihtYWluRGl2ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIG1haW5EaXYuZWpUcmVlR3JpZCh7XHJcbiAgICAgICAgICAgICAgICBkYXRhU291cmNlOiB0aGlzLmNvbXBvbmVudHMudmFsdWUsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCk6IHt9e1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvbHVtbnM6IFtcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiZGlzcGxheU5hbWVcIiwgaGVhZGVyVGV4dDogVHJhY2VPdmVydmlld1dpZGdldC5jb2x1bW5OYW1lLCB3aWR0aDogXCIzNTBcIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJjb21tYW5kQnV0dG9uc1wiLCBoZWFkZXJUZXh0OiBUcmFjZU92ZXJ2aWV3V2lkZ2V0LmNvbHVtbk9wZW5WaWV3IH0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0TmFtZUZvckNvbW1hbmRJZChjb21tYW5kSWQ6IHN0cmluZyk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gVmlld1R5cGVbY29tbWFuZElkXTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0SWNvbkZvckNvbW1hbmRJZChjb21tYW5kSWQ6IHN0cmluZykgOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIFZpZXdUeXBlUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRJY29uQ2xhc3NCeVZpZXdUeXBlKDxWaWV3VHlwZT48YW55PmNvbW1hbmRJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGdldENvbW1hbmRJZHNGcm9tSXRlbShpdGVtKTogQXJyYXk8c3RyaW5nPntcclxuICAgICAgICBsZXQgY29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudCA9IGl0ZW07XHJcbiAgICAgICAgLy8gVE9ETyBnZXQgYXZhaWxhYmxlIHZpZXdzIGZyb20gY29tcG9uZW50XHJcbiAgICAgICAgbGV0IGF2YWlsYWJsZVZpZXdzID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgYXZhaWxhYmxlVmlld3MucHVzaChWaWV3VHlwZS5Db25maWd1cmF0aW9uKTtcclxuICAgICAgICBhdmFpbGFibGVWaWV3cy5wdXNoKFZpZXdUeXBlLkFuYWx5c2lzKTtcclxuICAgICAgICByZXR1cm4gYXZhaWxhYmxlVmlld3M7XHJcbiAgICB9ICBcclxuXHJcbiAgICBwcml2YXRlIGdldERlZmF1bHRDb21tYW5kRnJvbUNvbXBvbmVudChjb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50KTogVmlld1R5cGV7XHJcbiAgICAgICAgIC8vIFRPRE8gZ2V0IGRlZmF1bHQgdmlldyBmcm9tIGNvbXBvbmVudFxyXG4gICAgICAgIHJldHVybiBWaWV3VHlwZS5BbmFseXNpcztcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgY2xpY2soaXRlbSwgY29tbWFuZElkKXtcclxuICAgICAgICBsZXQgY29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudCA9IGl0ZW07XHJcbiAgICAgICAgdGhpcy5vbk9wZW5WaWV3KGNvbXBvbmVudCwgY29tbWFuZElkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZG91YmxlQ2xpY2soYXJncyl7XHJcbiAgICAgICAgaWYoYXJncy5jb2x1bW5OYW1lID09IFRyYWNlT3ZlcnZpZXdXaWRnZXQuY29sdW1uTmFtZSAmJiBhcmdzLm1vZGVsLnNlbGVjdGVkSXRlbSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgY29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudCA9IGFyZ3MubW9kZWwuc2VsZWN0ZWRJdGVtLml0ZW07XHJcbiAgICAgICAgICAgIGxldCBkZWZhdWx0T3BlblZpZXdUeXBlID0gdGhpcy5nZXREZWZhdWx0Q29tbWFuZEZyb21Db21wb25lbnQoY29tcG9uZW50KTtcclxuICAgICAgICAgICAgdGhpcy5vbk9wZW5WaWV3KGNvbXBvbmVudCwgZGVmYXVsdE9wZW5WaWV3VHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25PcGVuVmlldyhjb21wb25lbnQ6TWFwcENvY2twaXRDb21wb25lbnQsIG9wZW5WaWV3VHlwZTpWaWV3VHlwZSkge1xyXG4gICAgICAgIGxldCBldmVudEFyZ3MgPSBuZXcgRXZlbnRPcGVuVmlld0FyZ3ModGhpcywgY29tcG9uZW50LCBvcGVuVmlld1R5cGUpXHJcbiAgICAgICAgdGhpcy5ldmVudE9wZW5WaWV3LnJhaXNlKG51bGwsIGV2ZW50QXJncyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFRyYWNlT3ZlcnZpZXdXaWRnZXQgfTsiXX0=