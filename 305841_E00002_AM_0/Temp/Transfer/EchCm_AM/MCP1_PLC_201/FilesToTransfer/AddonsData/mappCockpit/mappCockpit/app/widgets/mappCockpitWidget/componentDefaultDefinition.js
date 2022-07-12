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
define(["require", "exports", "../../common/componentBase/componentSettings", "../common/componentDefaultDefinitionWidgetBase"], function (require, exports, componentSettings_1, componentDefaultDefinitionWidgetBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ComponentDefaultDefinition = /** @class */ (function (_super) {
        __extends(ComponentDefaultDefinition, _super);
        function ComponentDefaultDefinition() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.defaultComponentSettingsId = "mappCockpitWidgetDefinition";
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
            // add all subcomponents
            // add Image provider in the mappCockpit widget to trigger the initialization
            componentSettings.addSubComponent("ImageProvider", ComponentDefaultDefinition.ImageProviderId);
            // needed for disconnected screen
            componentSettings.addSubComponent("CommonLayoutProvider", ComponentDefaultDefinition.CommonLayoutProviderId);
            componentSettings.addSubComponent("MappCockpitDataModel", ComponentDefaultDefinition.MappCockpitDataModelId);
            componentSettings.addSubComponent("MainNavigationWidget", ComponentDefaultDefinition.MainNavigationWidgetId);
            componentSettings.addSubComponent("ComponentOverviewWidget", ComponentDefaultDefinition.ComponentOverviewWidgetId);
            componentSettings.addSubComponent("TraceOverviewWidget", ComponentDefaultDefinition.TraceOverviewWidgetId);
            componentSettings.addSubComponent("ToolsOverviewWidget", ComponentDefaultDefinition.ToolsOverviewWidgetId);
            componentSettings.addSubComponent("StartPageWidget", ComponentDefaultDefinition.StartPageWidgetId);
            componentSettings.addSubComponent("LoginWidget", ComponentDefaultDefinition.LoginWidgetId);
            //componentSettings.addSubComponent("DummyWidget", ComponentDefaultDefinition.DummyWidgetId);
            return componentSettings;
        };
        ComponentDefaultDefinition.MappCockpitDataModelId = "MappCockpitDataModel";
        ComponentDefaultDefinition.MainNavigationWidgetId = "MainNavigationWidget";
        ComponentDefaultDefinition.ComponentOverviewWidgetId = "ComponentOverviewWidget";
        ComponentDefaultDefinition.TraceOverviewWidgetId = "TraceOverviewWidget";
        ComponentDefaultDefinition.ToolsOverviewWidgetId = "ToolsOverviewWidget";
        ComponentDefaultDefinition.StartPageWidgetId = "StartPageWidget";
        ComponentDefaultDefinition.LoginWidgetId = "LoginWidget";
        ComponentDefaultDefinition.DummyWidgetId = "DummyWidget";
        return ComponentDefaultDefinition;
    }(componentDefaultDefinitionWidgetBase_1.ComponentDefaultDefinitionWidgetBase));
    exports.ComponentDefaultDefinition = ComponentDefaultDefinition;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvbWFwcENvY2twaXRXaWRnZXQvY29tcG9uZW50RGVmYXVsdERlZmluaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUdBO1FBQWdELDhDQUFvQztRQUFwRjtZQUFBLHFFQTJDQztZQS9CbUIsZ0NBQTBCLEdBQUcsNkJBQTZCLENBQUM7O1FBK0IvRSxDQUFDO1FBN0JHOzs7OztXQUtHO1FBQ0ksZ0VBQTJCLEdBQWxDO1lBQ0ksSUFBSSxpQkFBaUIsR0FBRyxJQUFJLHFDQUFpQixFQUFFLENBQUM7WUFFaEQsd0JBQXdCO1lBRXhCLDZFQUE2RTtZQUM3RSxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUFFLDBCQUEwQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBRS9GLGlDQUFpQztZQUNqQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsc0JBQXNCLEVBQUUsMEJBQTBCLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUU3RyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsc0JBQXNCLEVBQUUsMEJBQTBCLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUU3RyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsc0JBQXNCLEVBQUUsMEJBQTBCLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUM3RyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMseUJBQXlCLEVBQUUsMEJBQTBCLENBQUMseUJBQXlCLENBQUMsQ0FBQztZQUNuSCxpQkFBaUIsQ0FBQyxlQUFlLENBQUMscUJBQXFCLEVBQUUsMEJBQTBCLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUMzRyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMscUJBQXFCLEVBQUUsMEJBQTBCLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUMzRyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsaUJBQWlCLEVBQUUsMEJBQTBCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUNuRyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLDBCQUEwQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzNGLDZGQUE2RjtZQUU3RixPQUFPLGlCQUFpQixDQUFDO1FBQzdCLENBQUM7UUF6Q2EsaURBQXNCLEdBQUcsc0JBQXNCLENBQUM7UUFFaEQsaURBQXNCLEdBQUcsc0JBQXNCLENBQUM7UUFDaEQsb0RBQXlCLEdBQUcseUJBQXlCLENBQUM7UUFDdEQsZ0RBQXFCLEdBQUcscUJBQXFCLENBQUM7UUFDOUMsZ0RBQXFCLEdBQUcscUJBQXFCLENBQUM7UUFDOUMsNENBQWlCLEdBQUcsaUJBQWlCLENBQUM7UUFDdEMsd0NBQWEsR0FBRyxhQUFhLENBQUM7UUFFOUIsd0NBQWEsR0FBRyxhQUFhLENBQUM7UUFpQ2hELGlDQUFDO0tBQUEsQUEzQ0QsQ0FBZ0QsMkVBQW9DLEdBMkNuRjtJQTNDWSxnRUFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbldpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uV2lkZ2V0QmFzZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uIGV4dGVuZHMgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb25XaWRnZXRCYXNle1xyXG4gICAgcHVibGljIHN0YXRpYyBNYXBwQ29ja3BpdERhdGFNb2RlbElkID0gXCJNYXBwQ29ja3BpdERhdGFNb2RlbFwiO1xyXG4gICAgXHJcbiAgICBwdWJsaWMgc3RhdGljIE1haW5OYXZpZ2F0aW9uV2lkZ2V0SWQgPSBcIk1haW5OYXZpZ2F0aW9uV2lkZ2V0XCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIENvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0SWQgPSBcIkNvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0XCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFRyYWNlT3ZlcnZpZXdXaWRnZXRJZCA9IFwiVHJhY2VPdmVydmlld1dpZGdldFwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBUb29sc092ZXJ2aWV3V2lkZ2V0SWQgPSBcIlRvb2xzT3ZlcnZpZXdXaWRnZXRcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgU3RhcnRQYWdlV2lkZ2V0SWQgPSBcIlN0YXJ0UGFnZVdpZGdldFwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBMb2dpbldpZGdldElkID0gXCJMb2dpbldpZGdldFwiO1xyXG4gICAgICAgIFxyXG4gICAgcHVibGljIHN0YXRpYyBEdW1teVdpZGdldElkID0gXCJEdW1teVdpZGdldFwiO1xyXG4gICAgXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgZGVmYXVsdENvbXBvbmVudFNldHRpbmdzSWQgPSBcIm1hcHBDb2NrcGl0V2lkZ2V0RGVmaW5pdGlvblwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBjb21wb25lbnQgc2V0dGluZ3MgZm9yIHRoaXMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudFNldHRpbmdzfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKSA6IENvbXBvbmVudFNldHRpbmdzIHtcclxuICAgICAgICBsZXQgY29tcG9uZW50U2V0dGluZ3MgPSBuZXcgQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuXHJcbiAgICAgICAgLy8gYWRkIGFsbCBzdWJjb21wb25lbnRzXHJcblxyXG4gICAgICAgIC8vIGFkZCBJbWFnZSBwcm92aWRlciBpbiB0aGUgbWFwcENvY2twaXQgd2lkZ2V0IHRvIHRyaWdnZXIgdGhlIGluaXRpYWxpemF0aW9uXHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkU3ViQ29tcG9uZW50KFwiSW1hZ2VQcm92aWRlclwiLCBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5JbWFnZVByb3ZpZGVySWQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIG5lZWRlZCBmb3IgZGlzY29ubmVjdGVkIHNjcmVlblxyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLmFkZFN1YkNvbXBvbmVudChcIkNvbW1vbkxheW91dFByb3ZpZGVyXCIsIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLkNvbW1vbkxheW91dFByb3ZpZGVySWQpO1xyXG5cclxuICAgICAgICBjb21wb25lbnRTZXR0aW5ncy5hZGRTdWJDb21wb25lbnQoXCJNYXBwQ29ja3BpdERhdGFNb2RlbFwiLCBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5NYXBwQ29ja3BpdERhdGFNb2RlbElkKTtcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkU3ViQ29tcG9uZW50KFwiTWFpbk5hdmlnYXRpb25XaWRnZXRcIiwgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uTWFpbk5hdmlnYXRpb25XaWRnZXRJZCk7XHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkU3ViQ29tcG9uZW50KFwiQ29tcG9uZW50T3ZlcnZpZXdXaWRnZXRcIiwgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uQ29tcG9uZW50T3ZlcnZpZXdXaWRnZXRJZCk7XHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkU3ViQ29tcG9uZW50KFwiVHJhY2VPdmVydmlld1dpZGdldFwiLCBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5UcmFjZU92ZXJ2aWV3V2lkZ2V0SWQpO1xyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLmFkZFN1YkNvbXBvbmVudChcIlRvb2xzT3ZlcnZpZXdXaWRnZXRcIiwgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uVG9vbHNPdmVydmlld1dpZGdldElkKTtcclxuICAgICAgICBjb21wb25lbnRTZXR0aW5ncy5hZGRTdWJDb21wb25lbnQoXCJTdGFydFBhZ2VXaWRnZXRcIiwgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uU3RhcnRQYWdlV2lkZ2V0SWQpO1xyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLmFkZFN1YkNvbXBvbmVudChcIkxvZ2luV2lkZ2V0XCIsIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLkxvZ2luV2lkZ2V0SWQpOyAgICAgICAgXHJcbiAgICAgICAgLy9jb21wb25lbnRTZXR0aW5ncy5hZGRTdWJDb21wb25lbnQoXCJEdW1teVdpZGdldFwiLCBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5EdW1teVdpZGdldElkKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudFNldHRpbmdzO1xyXG4gICAgfVxyXG59Il19