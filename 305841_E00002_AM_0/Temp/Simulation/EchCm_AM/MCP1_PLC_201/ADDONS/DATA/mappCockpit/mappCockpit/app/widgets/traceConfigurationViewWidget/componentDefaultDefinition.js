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
            _this.defaultComponentSettingsId = "traceConfigurationViewDefinition";
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
            componentSettings.addSubComponent("SplitterWidget", ComponentDefaultDefinition.SplitterWidgetTraceConfigurationViewId, ComponentDefaultDefinition.MainSplitterDefinitionId);
            return componentSettings;
        };
        ComponentDefaultDefinition.prototype.getMainSplitterDefinition = function () {
            var splitterComponentSettings = new splitterComponentSettings_1.SplitterComponentSettings(splitterDefinition_1.SplitterDefinition.orientationVertical);
            splitterComponentSettings.addPane("TraceControlWidget", ComponentDefaultDefinition.TraceControlWidgetId, "", splitterComponentSettings_1.SplitterComponentSettings.getPaneSettings(40, false));
            splitterComponentSettings.addPane("TraceConfigurationWidget", ComponentDefaultDefinition.TraceConfigurationWidgetId, "", splitterComponentSettings_1.SplitterComponentSettings.getPaneSettings(-1, true));
            splitterComponentSettings.addPane("MessagesWidget", ComponentDefaultDefinition.TraceConfigurationMessagesWidgetId, "", splitterComponentSettings_1.SplitterComponentSettings.getPaneSettings(110));
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
        ComponentDefaultDefinition.SplitterWidgetTraceConfigurationViewId = "SplitterWidget_TraceConfigurationView";
        ComponentDefaultDefinition.TraceControlWidgetId = "TraceControlWidget";
        ComponentDefaultDefinition.TraceConfigurationWidgetId = "TraceConfigurationWidget";
        ComponentDefaultDefinition.TraceConfigurationMessagesWidgetId = "TraceConfigurationMessagesWidget";
        ComponentDefaultDefinition.MainSplitterDefinitionId = "traceConfigurationViewMainSplitterDefinition";
        ComponentDefaultDefinition.InnerSplitterDefinitionId = "traceConfigurationViewInnerSplitterDefinition";
        return ComponentDefaultDefinition;
    }(componentDefaultDefinitionWidgetBase_1.ComponentDefaultDefinitionWidgetBase));
    exports.ComponentDefaultDefinition = ComponentDefaultDefinition;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvdHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldC9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBTUE7UUFBZ0QsOENBQW9DO1FBQXBGO1lBQUEscUVBMkNDO1lBcENtQixnQ0FBMEIsR0FBRyxrQ0FBa0MsQ0FBQzs7UUFvQ3BGLENBQUM7UUEvQkc7Ozs7O1dBS0c7UUFDSSxnRUFBMkIsR0FBbEM7WUFDSSxJQUFJLGlCQUFpQixHQUFHLElBQUkscUNBQWlCLEVBQUUsQ0FBQztZQUNoRCxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLEVBQUUsMEJBQTBCLENBQUMsc0NBQXNDLEVBQUUsMEJBQTBCLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUM1SyxPQUFPLGlCQUFpQixDQUFDO1FBQzdCLENBQUM7UUFFTyw4REFBeUIsR0FBakM7WUFDSSxJQUFJLHlCQUF5QixHQUFHLElBQUkscURBQXlCLENBQUMsdUNBQWtCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUN0Ryx5QkFBeUIsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEVBQUUsMEJBQTBCLENBQUMsb0JBQW9CLEVBQUUsRUFBRSxFQUFFLHFEQUF5QixDQUFDLGVBQWUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNuSyx5QkFBeUIsQ0FBQyxPQUFPLENBQUMsMEJBQTBCLEVBQUUsMEJBQTBCLENBQUMsMEJBQTBCLEVBQUUsRUFBRSxFQUFFLHFEQUF5QixDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzlLLHlCQUF5QixDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSwwQkFBMEIsQ0FBQyxrQ0FBa0MsRUFBRSxFQUFFLEVBQUUscURBQXlCLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdkssT0FBTyx5QkFBeUIsQ0FBQztRQUNyQyxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSSwwRUFBcUMsR0FBNUM7WUFDSSxJQUFJLHVCQUF1QixHQUFHLElBQUksS0FBSyxFQUFtQyxDQUFDO1lBQzNFLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLGlFQUErQixDQUFDLDBCQUEwQixDQUFDLHdCQUF3QixFQUFFLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN6SixPQUFPLHVCQUF1QixDQUFDO1FBQ25DLENBQUM7UUF4Q2EsaUVBQXNDLEdBQUcsdUNBQXVDLENBQUM7UUFDakYsK0NBQW9CLEdBQUcsb0JBQW9CLENBQUM7UUFDNUMscURBQTBCLEdBQUcsMEJBQTBCLENBQUM7UUFDeEQsNkRBQWtDLEdBQUcsa0NBQWtDLENBQUM7UUFJeEUsbURBQXdCLEdBQUcsOENBQThDLENBQUM7UUFDMUUsb0RBQXlCLEdBQUcsK0NBQStDLENBQUM7UUFpQzlGLGlDQUFDO0tBQUEsQUEzQ0QsQ0FBZ0QsMkVBQW9DLEdBMkNuRjtJQTNDWSxnRUFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTcGxpdHRlckRlZmluaXRpb24gfSBmcm9tIFwiLi4vc3BsaXR0ZXJXaWRnZXQvc3BsaXR0ZXJEZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IFNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vY29tbW9uL3NwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb25XaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbldpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmYXVsdFNldHRpbmdzUGFja2FnZSB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnREZWZhdWx0U2V0dGluZ3NQYWNrYWdlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24gZXh0ZW5kcyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbldpZGdldEJhc2V7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBTcGxpdHRlcldpZGdldFRyYWNlQ29uZmlndXJhdGlvblZpZXdJZCA9IFwiU3BsaXR0ZXJXaWRnZXRfVHJhY2VDb25maWd1cmF0aW9uVmlld1wiO1xyXG4gICAgcHVibGljIHN0YXRpYyBUcmFjZUNvbnRyb2xXaWRnZXRJZCA9IFwiVHJhY2VDb250cm9sV2lkZ2V0XCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFRyYWNlQ29uZmlndXJhdGlvbldpZGdldElkID0gXCJUcmFjZUNvbmZpZ3VyYXRpb25XaWRnZXRcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgVHJhY2VDb25maWd1cmF0aW9uTWVzc2FnZXNXaWRnZXRJZCA9IFwiVHJhY2VDb25maWd1cmF0aW9uTWVzc2FnZXNXaWRnZXRcIjtcclxuXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgZGVmYXVsdENvbXBvbmVudFNldHRpbmdzSWQgPSBcInRyYWNlQ29uZmlndXJhdGlvblZpZXdEZWZpbml0aW9uXCI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBNYWluU3BsaXR0ZXJEZWZpbml0aW9uSWQgPSBcInRyYWNlQ29uZmlndXJhdGlvblZpZXdNYWluU3BsaXR0ZXJEZWZpbml0aW9uXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIElubmVyU3BsaXR0ZXJEZWZpbml0aW9uSWQgPSBcInRyYWNlQ29uZmlndXJhdGlvblZpZXdJbm5lclNwbGl0dGVyRGVmaW5pdGlvblwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBjb21wb25lbnQgc2V0dGluZ3MgZm9yIHRoaXMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudFNldHRpbmdzfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKSA6IENvbXBvbmVudFNldHRpbmdzIHtcclxuICAgICAgICBsZXQgY29tcG9uZW50U2V0dGluZ3MgPSBuZXcgQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgICAgICBjb21wb25lbnRTZXR0aW5ncy5hZGRTdWJDb21wb25lbnQoXCJTcGxpdHRlcldpZGdldFwiLCBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5TcGxpdHRlcldpZGdldFRyYWNlQ29uZmlndXJhdGlvblZpZXdJZCwgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uTWFpblNwbGl0dGVyRGVmaW5pdGlvbklkKTtcclxuICAgICAgICByZXR1cm4gY29tcG9uZW50U2V0dGluZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRNYWluU3BsaXR0ZXJEZWZpbml0aW9uKCkgOiBhbnkge1xyXG4gICAgICAgIGxldCBzcGxpdHRlckNvbXBvbmVudFNldHRpbmdzID0gbmV3IFNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3MoU3BsaXR0ZXJEZWZpbml0aW9uLm9yaWVudGF0aW9uVmVydGljYWwpO1xyXG4gICAgICAgIHNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3MuYWRkUGFuZShcIlRyYWNlQ29udHJvbFdpZGdldFwiLCBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5UcmFjZUNvbnRyb2xXaWRnZXRJZCwgXCJcIiwgU3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncy5nZXRQYW5lU2V0dGluZ3MoNDAsIGZhbHNlKSk7XHJcbiAgICAgICAgc3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncy5hZGRQYW5lKFwiVHJhY2VDb25maWd1cmF0aW9uV2lkZ2V0XCIsIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLlRyYWNlQ29uZmlndXJhdGlvbldpZGdldElkLCBcIlwiLCBTcGxpdHRlckNvbXBvbmVudFNldHRpbmdzLmdldFBhbmVTZXR0aW5ncygtMSwgdHJ1ZSkpO1xyXG4gICAgICAgIHNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3MuYWRkUGFuZShcIk1lc3NhZ2VzV2lkZ2V0XCIsIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLlRyYWNlQ29uZmlndXJhdGlvbk1lc3NhZ2VzV2lkZ2V0SWQsIFwiXCIsIFNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3MuZ2V0UGFuZVNldHRpbmdzKDExMCkpO1xyXG4gICAgICAgIHJldHVybiBzcGxpdHRlckNvbXBvbmVudFNldHRpbmdzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBzb21lIGRlZmF1bHQgcGVyc2lzdGluZyBkYXRhIHBhY2thZ2VzIGluIHRoZSBtYWluIGRlZmF1bHQgcGVyc2lzdGluZyBkYXRhIHByb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyhDb21wb25lbnREZWZhdWx0U2V0dGluZ3NQYWNrYWdlW118IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEFkZGl0aW9uYWxEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKTogQ29tcG9uZW50RGVmYXVsdFNldHRpbmdzUGFja2FnZVtdfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGxldCBkZWZhdWx0U2V0dGluZ3NQYWNrYWdlcyA9IG5ldyBBcnJheTxDb21wb25lbnREZWZhdWx0U2V0dGluZ3NQYWNrYWdlPigpO1xyXG4gICAgICAgIGRlZmF1bHRTZXR0aW5nc1BhY2thZ2VzLnB1c2gobmV3IENvbXBvbmVudERlZmF1bHRTZXR0aW5nc1BhY2thZ2UoQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uTWFpblNwbGl0dGVyRGVmaW5pdGlvbklkLCB0aGlzLmdldE1haW5TcGxpdHRlckRlZmluaXRpb24oKSkpO1xyXG4gICAgICAgIHJldHVybiBkZWZhdWx0U2V0dGluZ3NQYWNrYWdlcztcclxuICAgIH1cclxufSJdfQ==