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
define(["require", "exports", "../splitterWidget/splitterDefinition", "../../common/componentBase/componentSettings", "../common/splitterComponentSettings", "../common/componentDefaultDefinitionWidgetBase", "../../common/componentBase/componentDefaultSettingsPackage"], function (require, exports, splitterDefinition_1, componentSettings_1, splitterComponentSettings_1, componentDefaultDefinitionWidgetBase_1, componentDefaultSettingsPackage_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ComponentDefaultDefinition = /** @class */ (function (_super) {
        __extends(ComponentDefaultDefinition, _super);
        function ComponentDefaultDefinition() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.defaultComponentSettingsId = "componentViewWidgetDefinition";
            _this.MainSplitterDefinitionId = "componentViewMainSplitterDefinition";
            _this.TopSplitterDefinitionId = "componentViewTopSplitterDefinition";
            return _this;
        }
        /**
         * Returns the default component settings for this widget
         *
         * @returns {ComponentSettings}
         * @memberof ComponentDefaultDefinition
         */
        ComponentDefaultDefinition.prototype.getDefaultComponentSettings = function () {
            var componentSettings = new componentSettings_1.ComponentSettings();
            componentSettings.addSubComponent("SplitterWidget", ComponentDefaultDefinition.SplitterWidgetComponentViewId, this.MainSplitterDefinitionId);
            return componentSettings;
        };
        ComponentDefaultDefinition.prototype.getMainSplitterDefinition = function () {
            var splitterComponentSettings = new splitterComponentSettings_1.SplitterComponentSettings(splitterDefinition_1.SplitterDefinition.orientationVertical);
            splitterComponentSettings.addPane("SplitterWidget", ComponentDefaultDefinition.SplitterWidgetTopSplitterId, this.TopSplitterDefinitionId, splitterComponentSettings_1.SplitterComponentSettings.getPaneSettings(-1));
            splitterComponentSettings.addPane("MessagesWidget", ComponentDefaultDefinition.ComponentViewMessagesWidgetId, "", splitterComponentSettings_1.SplitterComponentSettings.getPaneSettings(110));
            return splitterComponentSettings;
        };
        ComponentDefaultDefinition.prototype.getTopSplitterDefinition = function () {
            var splitterComponentSettings = new splitterComponentSettings_1.SplitterComponentSettings(splitterDefinition_1.SplitterDefinition.orientationHorizontal);
            splitterComponentSettings.addPane("MethodsWidget", ComponentDefaultDefinition.MethodsWidgetId, "", splitterComponentSettings_1.SplitterComponentSettings.getPaneSettings(400));
            splitterComponentSettings.addPane("WatchablesWidget", ComponentDefaultDefinition.WatchablesWidgetId, "", splitterComponentSettings_1.SplitterComponentSettings.getPaneSettings(-1));
            splitterComponentSettings.addPane("ConfigManagerWidget", ComponentDefaultDefinition.ConfigManagerWidgetId, "", splitterComponentSettings_1.SplitterComponentSettings.getPaneSettings(750));
            return splitterComponentSettings;
        };
        /**
         * Adds some default persisting data packages in the main default persisting data provider
         *
         * @returns {(ComponentDefaultSettingsPackage[]| undefined)}
         * @memberof ComponentDefaultDefinition
         */
        ComponentDefaultDefinition.prototype.getAdditionalDefaultComponentSettings = function () {
            var defaultSettingsPackages = new Array();
            defaultSettingsPackages.push(new componentDefaultSettingsPackage_1.ComponentDefaultSettingsPackage(this.MainSplitterDefinitionId, this.getMainSplitterDefinition()));
            defaultSettingsPackages.push(new componentDefaultSettingsPackage_1.ComponentDefaultSettingsPackage(this.TopSplitterDefinitionId, this.getTopSplitterDefinition()));
            return defaultSettingsPackages;
        };
        ComponentDefaultDefinition.SplitterWidgetComponentViewId = "SplitterWidget_ComponentView";
        ComponentDefaultDefinition.SplitterWidgetTopSplitterId = "SplitterWidget_TopSplitter";
        ComponentDefaultDefinition.ComponentViewMessagesWidgetId = "ComponentViewMessagesWidget";
        ComponentDefaultDefinition.MethodsWidgetId = "MethodsWidget";
        ComponentDefaultDefinition.WatchablesWidgetId = "WatchablesWidget";
        ComponentDefaultDefinition.ConfigManagerWidgetId = "ConfigManagerWidget";
        return ComponentDefaultDefinition;
    }(componentDefaultDefinitionWidgetBase_1.ComponentDefaultDefinitionWidgetBase));
    exports.ComponentDefaultDefinition = ComponentDefaultDefinition;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29tcG9uZW50Vmlld1dpZGdldC9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBTUE7UUFBZ0QsOENBQW9DO1FBQXBGO1lBQUEscUVBc0RDO1lBNUNtQixnQ0FBMEIsR0FBRywrQkFBK0IsQ0FBQztZQUM1RCw4QkFBd0IsR0FBRyxxQ0FBcUMsQ0FBQztZQUNqRSw2QkFBdUIsR0FBRyxvQ0FBb0MsQ0FBQzs7UUEwQ3BGLENBQUM7UUF4Q0c7Ozs7O1dBS0c7UUFDSSxnRUFBMkIsR0FBbEM7WUFDSSxJQUFJLGlCQUFpQixHQUFHLElBQUkscUNBQWlCLEVBQUUsQ0FBQztZQUNoRCxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLEVBQUUsMEJBQTBCLENBQUMsNkJBQTZCLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDN0ksT0FBTyxpQkFBaUIsQ0FBQztRQUM3QixDQUFDO1FBRU8sOERBQXlCLEdBQWpDO1lBQ0ksSUFBSSx5QkFBeUIsR0FBRyxJQUFJLHFEQUF5QixDQUFDLHVDQUFrQixDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDdEcseUJBQXlCLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLDBCQUEwQixDQUFDLDJCQUEyQixFQUFFLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxxREFBeUIsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pMLHlCQUF5QixDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSwwQkFBMEIsQ0FBQyw2QkFBNkIsRUFBRSxFQUFFLEVBQUUscURBQXlCLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbEssT0FBTyx5QkFBeUIsQ0FBQztRQUNyQyxDQUFDO1FBRU8sNkRBQXdCLEdBQWhDO1lBQ0ksSUFBSSx5QkFBeUIsR0FBRyxJQUFJLHFEQUF5QixDQUFDLHVDQUFrQixDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDeEcseUJBQXlCLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSwwQkFBMEIsQ0FBQyxlQUFlLEVBQUUsRUFBRSxFQUFFLHFEQUF5QixDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ25KLHlCQUF5QixDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSwwQkFBMEIsQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLEVBQUUscURBQXlCLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4Six5QkFBeUIsQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsMEJBQTBCLENBQUMscUJBQXFCLEVBQUUsRUFBRSxFQUFFLHFEQUF5QixDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQy9KLE9BQU8seUJBQXlCLENBQUM7UUFDckMsQ0FBQztRQUdEOzs7OztXQUtHO1FBQ0ksMEVBQXFDLEdBQTVDO1lBQ0ksSUFBSSx1QkFBdUIsR0FBRyxJQUFJLEtBQUssRUFBbUMsQ0FBQztZQUMzRSx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxpRUFBK0IsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ25JLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLGlFQUErQixDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDakksT0FBTyx1QkFBdUIsQ0FBQztRQUNuQyxDQUFDO1FBbkRhLHdEQUE2QixHQUFHLDhCQUE4QixDQUFDO1FBQy9ELHNEQUEyQixHQUFHLDRCQUE0QixDQUFDO1FBQzNELHdEQUE2QixHQUFHLDZCQUE2QixDQUFDO1FBQzlELDBDQUFlLEdBQUcsZUFBZSxDQUFDO1FBQ2xDLDZDQUFrQixHQUFHLGtCQUFrQixDQUFDO1FBQ3hDLGdEQUFxQixHQUFHLHFCQUFxQixDQUFDO1FBK0NoRSxpQ0FBQztLQUFBLEFBdERELENBQWdELDJFQUFvQyxHQXNEbkY7SUF0RFksZ0VBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3BsaXR0ZXJEZWZpbml0aW9uIH0gZnJvbSBcIi4uL3NwbGl0dGVyV2lkZ2V0L3NwbGl0dGVyRGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBTcGxpdHRlckNvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uL2NvbW1vbi9zcGxpdHRlckNvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vY29tcG9uZW50RGVmYXVsdERlZmluaXRpb25XaWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudERlZmF1bHRTZXR0aW5nc1BhY2thZ2UgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50RGVmYXVsdFNldHRpbmdzUGFja2FnZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uIGV4dGVuZHMgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb25XaWRnZXRCYXNle1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgU3BsaXR0ZXJXaWRnZXRDb21wb25lbnRWaWV3SWQgPSBcIlNwbGl0dGVyV2lkZ2V0X0NvbXBvbmVudFZpZXdcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgU3BsaXR0ZXJXaWRnZXRUb3BTcGxpdHRlcklkID0gXCJTcGxpdHRlcldpZGdldF9Ub3BTcGxpdHRlclwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBDb21wb25lbnRWaWV3TWVzc2FnZXNXaWRnZXRJZCA9IFwiQ29tcG9uZW50Vmlld01lc3NhZ2VzV2lkZ2V0XCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIE1ldGhvZHNXaWRnZXRJZCA9IFwiTWV0aG9kc1dpZGdldFwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBXYXRjaGFibGVzV2lkZ2V0SWQgPSBcIldhdGNoYWJsZXNXaWRnZXRcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgQ29uZmlnTWFuYWdlcldpZGdldElkID0gXCJDb25maWdNYW5hZ2VyV2lkZ2V0XCI7XHJcblxyXG5cclxuICAgIHB1YmxpYyByZWFkb25seSBkZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NJZCA9IFwiY29tcG9uZW50Vmlld1dpZGdldERlZmluaXRpb25cIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgTWFpblNwbGl0dGVyRGVmaW5pdGlvbklkID0gXCJjb21wb25lbnRWaWV3TWFpblNwbGl0dGVyRGVmaW5pdGlvblwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBUb3BTcGxpdHRlckRlZmluaXRpb25JZCA9IFwiY29tcG9uZW50Vmlld1RvcFNwbGl0dGVyRGVmaW5pdGlvblwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBjb21wb25lbnQgc2V0dGluZ3MgZm9yIHRoaXMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudFNldHRpbmdzfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKSA6IENvbXBvbmVudFNldHRpbmdzIHtcclxuICAgICAgICBsZXQgY29tcG9uZW50U2V0dGluZ3MgPSBuZXcgQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgICAgICBjb21wb25lbnRTZXR0aW5ncy5hZGRTdWJDb21wb25lbnQoXCJTcGxpdHRlcldpZGdldFwiLCBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5TcGxpdHRlcldpZGdldENvbXBvbmVudFZpZXdJZCwgdGhpcy5NYWluU3BsaXR0ZXJEZWZpbml0aW9uSWQpO1xyXG4gICAgICAgIHJldHVybiBjb21wb25lbnRTZXR0aW5ncztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldE1haW5TcGxpdHRlckRlZmluaXRpb24oKSA6IENvbXBvbmVudFNldHRpbmdzIHtcclxuICAgICAgICBsZXQgc3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncyA9IG5ldyBTcGxpdHRlckNvbXBvbmVudFNldHRpbmdzKFNwbGl0dGVyRGVmaW5pdGlvbi5vcmllbnRhdGlvblZlcnRpY2FsKTtcclxuICAgICAgICBzcGxpdHRlckNvbXBvbmVudFNldHRpbmdzLmFkZFBhbmUoXCJTcGxpdHRlcldpZGdldFwiLCBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5TcGxpdHRlcldpZGdldFRvcFNwbGl0dGVySWQsIHRoaXMuVG9wU3BsaXR0ZXJEZWZpbml0aW9uSWQsIFNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3MuZ2V0UGFuZVNldHRpbmdzKC0xKSk7XHJcbiAgICAgICAgc3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncy5hZGRQYW5lKFwiTWVzc2FnZXNXaWRnZXRcIiwgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uQ29tcG9uZW50Vmlld01lc3NhZ2VzV2lkZ2V0SWQsIFwiXCIsIFNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3MuZ2V0UGFuZVNldHRpbmdzKDExMCkpO1xyXG4gICAgICAgIHJldHVybiBzcGxpdHRlckNvbXBvbmVudFNldHRpbmdzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0VG9wU3BsaXR0ZXJEZWZpbml0aW9uKCkgOiBDb21wb25lbnRTZXR0aW5ncyB7XHJcbiAgICAgICAgbGV0IHNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3MgPSBuZXcgU3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncyhTcGxpdHRlckRlZmluaXRpb24ub3JpZW50YXRpb25Ib3Jpem9udGFsKTtcclxuICAgICAgICBzcGxpdHRlckNvbXBvbmVudFNldHRpbmdzLmFkZFBhbmUoXCJNZXRob2RzV2lkZ2V0XCIsIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLk1ldGhvZHNXaWRnZXRJZCwgXCJcIiwgU3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncy5nZXRQYW5lU2V0dGluZ3MoNDAwKSk7XHJcbiAgICAgICAgc3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncy5hZGRQYW5lKFwiV2F0Y2hhYmxlc1dpZGdldFwiLCBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5XYXRjaGFibGVzV2lkZ2V0SWQsIFwiXCIsIFNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3MuZ2V0UGFuZVNldHRpbmdzKC0xKSk7XHJcbiAgICAgICAgc3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncy5hZGRQYW5lKFwiQ29uZmlnTWFuYWdlcldpZGdldFwiLCBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5Db25maWdNYW5hZ2VyV2lkZ2V0SWQsIFwiXCIsIFNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3MuZ2V0UGFuZVNldHRpbmdzKDc1MCkpO1xyXG4gICAgICAgIHJldHVybiBzcGxpdHRlckNvbXBvbmVudFNldHRpbmdzO1xyXG4gICAgfSBcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIHNvbWUgZGVmYXVsdCBwZXJzaXN0aW5nIGRhdGEgcGFja2FnZXMgaW4gdGhlIG1haW4gZGVmYXVsdCBwZXJzaXN0aW5nIGRhdGEgcHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7KENvbXBvbmVudERlZmF1bHRTZXR0aW5nc1BhY2thZ2VbXXwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0QWRkaXRpb25hbERlZmF1bHRDb21wb25lbnRTZXR0aW5ncygpOiBDb21wb25lbnREZWZhdWx0U2V0dGluZ3NQYWNrYWdlW118IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgbGV0IGRlZmF1bHRTZXR0aW5nc1BhY2thZ2VzID0gbmV3IEFycmF5PENvbXBvbmVudERlZmF1bHRTZXR0aW5nc1BhY2thZ2U+KCk7XHJcbiAgICAgICAgZGVmYXVsdFNldHRpbmdzUGFja2FnZXMucHVzaChuZXcgQ29tcG9uZW50RGVmYXVsdFNldHRpbmdzUGFja2FnZSh0aGlzLk1haW5TcGxpdHRlckRlZmluaXRpb25JZCwgdGhpcy5nZXRNYWluU3BsaXR0ZXJEZWZpbml0aW9uKCkpKTtcclxuICAgICAgICBkZWZhdWx0U2V0dGluZ3NQYWNrYWdlcy5wdXNoKG5ldyBDb21wb25lbnREZWZhdWx0U2V0dGluZ3NQYWNrYWdlKHRoaXMuVG9wU3BsaXR0ZXJEZWZpbml0aW9uSWQsIHRoaXMuZ2V0VG9wU3BsaXR0ZXJEZWZpbml0aW9uKCkpKTtcclxuICAgICAgICByZXR1cm4gZGVmYXVsdFNldHRpbmdzUGFja2FnZXM7XHJcbiAgICB9XHJcbn0iXX0=