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
            _this.defaultComponentSettingsId = "traceConfigurationDefinition";
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
            componentSettings.addSubComponent("SplitterWidget", ComponentDefaultDefinition.SplitterWidgetTraceConfigurationId, ComponentDefaultDefinition.MainSplitterDefinitionId);
            return componentSettings;
        };
        ComponentDefaultDefinition.prototype.getMainSplitterDefinition = function () {
            var splitterComponentSettings = new splitterComponentSettings_1.SplitterComponentSettings(splitterDefinition_1.SplitterDefinition.orientationHorizontal);
            splitterComponentSettings.addPane("TraceConfigDatapointsWidget", ComponentDefaultDefinition.TraceConfigDatapointsWidgetId, "", splitterComponentSettings_1.SplitterComponentSettings.getPaneSettings(-1));
            splitterComponentSettings.addPane("TraceConfigTimingWidget", ComponentDefaultDefinition.TraceConfigTimingWidgetId, "", splitterComponentSettings_1.SplitterComponentSettings.getPaneSettings(570));
            splitterComponentSettings.addPane("TraceConfigTriggerWidget", ComponentDefaultDefinition.TraceConfigTriggerWidgetId, "", splitterComponentSettings_1.SplitterComponentSettings.getPaneSettings(500));
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
            defaultSettingsPackages.push(new componentDefaultSettingsPackage_1.ComponentDefaultSettingsPackage(ComponentDefaultDefinition.MainSplitterDefinitionId, this.getMainSplitterDefinition()));
            return defaultSettingsPackages;
        };
        ComponentDefaultDefinition.SplitterWidgetTraceConfigurationId = "SplitterWidget_TraceConfiguration";
        ComponentDefaultDefinition.TraceConfigDatapointsWidgetId = "TraceConfigDatapointsWidget";
        ComponentDefaultDefinition.TraceConfigTimingWidgetId = "TraceConfigTimingWidget";
        ComponentDefaultDefinition.TraceConfigTriggerWidgetId = "TraceConfigTriggerWidget";
        ComponentDefaultDefinition.MainSplitterDefinitionId = "traceConfigurationMainSplitterDefinition";
        return ComponentDefaultDefinition;
    }(componentDefaultDefinitionWidgetBase_1.ComponentDefaultDefinitionWidgetBase));
    exports.ComponentDefaultDefinition = ComponentDefaultDefinition;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvdHJhY2VDb25maWd1cmF0aW9uV2lkZ2V0L2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFNQTtRQUFnRCw4Q0FBb0M7UUFBcEY7WUFBQSxxRUEyQ0M7WUFuQ21CLGdDQUEwQixHQUFHLDhCQUE4QixDQUFDOztRQW1DaEYsQ0FBQztRQS9CRzs7Ozs7V0FLRztRQUNJLGdFQUEyQixHQUFsQztZQUNJLElBQUksaUJBQWlCLEdBQUcsSUFBSSxxQ0FBaUIsRUFBRSxDQUFDO1lBQ2hELGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsRUFBRSwwQkFBMEIsQ0FBQyxrQ0FBa0MsRUFBRSwwQkFBMEIsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQ3hLLE9BQU8saUJBQWlCLENBQUM7UUFDN0IsQ0FBQztRQUVPLDhEQUF5QixHQUFqQztZQUNJLElBQUkseUJBQXlCLEdBQUcsSUFBSSxxREFBeUIsQ0FBQyx1Q0FBa0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ3hHLHlCQUF5QixDQUFDLE9BQU8sQ0FBQyw2QkFBNkIsRUFBRSwwQkFBMEIsQ0FBQyw2QkFBNkIsRUFBRSxFQUFFLEVBQUUscURBQXlCLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5Syx5QkFBeUIsQ0FBQyxPQUFPLENBQUMseUJBQXlCLEVBQUUsMEJBQTBCLENBQUMseUJBQXlCLEVBQUUsRUFBRSxFQUFFLHFEQUF5QixDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3ZLLHlCQUF5QixDQUFDLE9BQU8sQ0FBQywwQkFBMEIsRUFBRSwwQkFBMEIsQ0FBQywwQkFBMEIsRUFBRSxFQUFFLEVBQUUscURBQXlCLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDekssT0FBTyx5QkFBeUIsQ0FBQztRQUNyQyxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSSwwRUFBcUMsR0FBNUM7WUFDSSxJQUFJLHVCQUF1QixHQUFHLElBQUksS0FBSyxFQUFtQyxDQUFDO1lBQzNFLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLGlFQUErQixDQUFDLDBCQUEwQixDQUFDLHdCQUF3QixFQUFFLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN6SixPQUFPLHVCQUF1QixDQUFDO1FBQ25DLENBQUM7UUF4Q2EsNkRBQWtDLEdBQUcsbUNBQW1DLENBQUM7UUFDekUsd0RBQTZCLEdBQUcsNkJBQTZCLENBQUM7UUFDOUQsb0RBQXlCLEdBQUcseUJBQXlCLENBQUM7UUFDdEQscURBQTBCLEdBQUcsMEJBQTBCLENBQUM7UUFLeEQsbURBQXdCLEdBQUcsMENBQTBDLENBQUM7UUFpQ3hGLGlDQUFDO0tBQUEsQUEzQ0QsQ0FBZ0QsMkVBQW9DLEdBMkNuRjtJQTNDWSxnRUFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTcGxpdHRlckRlZmluaXRpb24gfSBmcm9tIFwiLi4vc3BsaXR0ZXJXaWRnZXQvc3BsaXR0ZXJEZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IFNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vY29tbW9uL3NwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb25XaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbldpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmYXVsdFNldHRpbmdzUGFja2FnZSB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnREZWZhdWx0U2V0dGluZ3NQYWNrYWdlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24gZXh0ZW5kcyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbldpZGdldEJhc2V7XHJcbiAgICBcclxuICAgIHB1YmxpYyBzdGF0aWMgU3BsaXR0ZXJXaWRnZXRUcmFjZUNvbmZpZ3VyYXRpb25JZCA9IFwiU3BsaXR0ZXJXaWRnZXRfVHJhY2VDb25maWd1cmF0aW9uXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldElkID0gXCJUcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXRcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgVHJhY2VDb25maWdUaW1pbmdXaWRnZXRJZCA9IFwiVHJhY2VDb25maWdUaW1pbmdXaWRnZXRcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgVHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0SWQgPSBcIlRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFwiO1xyXG5cclxuXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgZGVmYXVsdENvbXBvbmVudFNldHRpbmdzSWQgPSBcInRyYWNlQ29uZmlndXJhdGlvbkRlZmluaXRpb25cIjtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIE1haW5TcGxpdHRlckRlZmluaXRpb25JZCA9IFwidHJhY2VDb25maWd1cmF0aW9uTWFpblNwbGl0dGVyRGVmaW5pdGlvblwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBjb21wb25lbnQgc2V0dGluZ3MgZm9yIHRoaXMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudFNldHRpbmdzfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKSA6IENvbXBvbmVudFNldHRpbmdzIHtcclxuICAgICAgICBsZXQgY29tcG9uZW50U2V0dGluZ3MgPSBuZXcgQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgICAgICBjb21wb25lbnRTZXR0aW5ncy5hZGRTdWJDb21wb25lbnQoXCJTcGxpdHRlcldpZGdldFwiLCBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5TcGxpdHRlcldpZGdldFRyYWNlQ29uZmlndXJhdGlvbklkLCBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5NYWluU3BsaXR0ZXJEZWZpbml0aW9uSWQpO1xyXG4gICAgICAgIHJldHVybiBjb21wb25lbnRTZXR0aW5ncztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldE1haW5TcGxpdHRlckRlZmluaXRpb24oKSA6IGFueSB7XHJcbiAgICAgICAgbGV0IHNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3MgPSBuZXcgU3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncyhTcGxpdHRlckRlZmluaXRpb24ub3JpZW50YXRpb25Ib3Jpem9udGFsKTtcclxuICAgICAgICBzcGxpdHRlckNvbXBvbmVudFNldHRpbmdzLmFkZFBhbmUoXCJUcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXRcIiwgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0SWQsIFwiXCIsIFNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3MuZ2V0UGFuZVNldHRpbmdzKC0xKSk7XHJcbiAgICAgICAgc3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncy5hZGRQYW5lKFwiVHJhY2VDb25maWdUaW1pbmdXaWRnZXRcIiwgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uVHJhY2VDb25maWdUaW1pbmdXaWRnZXRJZCwgXCJcIiwgU3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncy5nZXRQYW5lU2V0dGluZ3MoNTcwKSk7XHJcbiAgICAgICAgc3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncy5hZGRQYW5lKFwiVHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0XCIsIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLlRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldElkLCBcIlwiLCBTcGxpdHRlckNvbXBvbmVudFNldHRpbmdzLmdldFBhbmVTZXR0aW5ncyg1MDApKTtcclxuICAgICAgICByZXR1cm4gc3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncztcclxuICAgIH0gXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBzb21lIGRlZmF1bHQgcGVyc2lzdGluZyBkYXRhIHBhY2thZ2VzIGluIHRoZSBtYWluIGRlZmF1bHQgcGVyc2lzdGluZyBkYXRhIHByb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyhDb21wb25lbnREZWZhdWx0U2V0dGluZ3NQYWNrYWdlW118IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEFkZGl0aW9uYWxEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKTogQ29tcG9uZW50RGVmYXVsdFNldHRpbmdzUGFja2FnZVtdfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGxldCBkZWZhdWx0U2V0dGluZ3NQYWNrYWdlcyA9IG5ldyBBcnJheTxDb21wb25lbnREZWZhdWx0U2V0dGluZ3NQYWNrYWdlPigpO1xyXG4gICAgICAgIGRlZmF1bHRTZXR0aW5nc1BhY2thZ2VzLnB1c2gobmV3IENvbXBvbmVudERlZmF1bHRTZXR0aW5nc1BhY2thZ2UoQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uTWFpblNwbGl0dGVyRGVmaW5pdGlvbklkLCB0aGlzLmdldE1haW5TcGxpdHRlckRlZmluaXRpb24oKSkpO1xyXG4gICAgICAgIHJldHVybiBkZWZhdWx0U2V0dGluZ3NQYWNrYWdlcztcclxuICAgIH1cclxufSJdfQ==