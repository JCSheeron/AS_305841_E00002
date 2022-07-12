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
            _this.defaultComponentSettingsId = "methodsWidgetDefinition";
            _this.MainSplitterDefinitionId = "methodsMainSplitterDefinition";
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
            componentSettings.addSubComponent("SplitterWidget", ComponentDefaultDefinition.SplitterWidgetMethodsId, this.MainSplitterDefinitionId);
            return componentSettings;
        };
        ComponentDefaultDefinition.prototype.getMainSplitterDefinition = function () {
            var splitterComponentSettings = new splitterComponentSettings_1.SplitterComponentSettings(splitterDefinition_1.SplitterDefinition.orientationVertical);
            splitterComponentSettings.addPane("MethodListWidget", ComponentDefaultDefinition.MethodListWidgetId, "", splitterComponentSettings_1.SplitterComponentSettings.getPaneSettings(-1, true, 38));
            splitterComponentSettings.addPane("MethodParameterListWidget", ComponentDefaultDefinition.MethodParameterListWidgetId, "", splitterComponentSettings_1.SplitterComponentSettings.getPaneSettings(200));
            return splitterComponentSettings;
        };
        /**
         * Adds some default persisting data packages in the main default persisting data provider
         *
         * @returns {Array<ComponentDefaultSettingsPackage>|undefined}
         * @memberof ComponentDefaultDefinition
         */
        ComponentDefaultDefinition.prototype.getAdditionalDefaultComponentSettings = function () {
            var defaultSettingsPackages = new Array();
            defaultSettingsPackages.push(new componentDefaultSettingsPackage_1.ComponentDefaultSettingsPackage(this.MainSplitterDefinitionId, this.getMainSplitterDefinition()));
            return defaultSettingsPackages;
        };
        ComponentDefaultDefinition.SplitterWidgetMethodsId = "SplitterWidget_Methods";
        ComponentDefaultDefinition.MethodListWidgetId = "MethodListWidget";
        ComponentDefaultDefinition.MethodParameterListWidgetId = "MethodParameterListWidget";
        return ComponentDefaultDefinition;
    }(componentDefaultDefinitionWidgetBase_1.ComponentDefaultDefinitionWidgetBase));
    exports.ComponentDefaultDefinition = ComponentDefaultDefinition;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvbWV0aG9kc1dpZGdldC9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBTUE7UUFBZ0QsOENBQW9DO1FBQXBGO1lBQUEscUVBdUNDO1lBakNtQixnQ0FBMEIsR0FBRyx5QkFBeUIsQ0FBQztZQUN0RCw4QkFBd0IsR0FBRywrQkFBK0IsQ0FBQzs7UUFnQ2hGLENBQUM7UUE5Qkc7Ozs7O1dBS0c7UUFDSSxnRUFBMkIsR0FBbEM7WUFDSSxJQUFJLGlCQUFpQixHQUFHLElBQUkscUNBQWlCLEVBQUUsQ0FBQztZQUNoRCxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLEVBQUUsMEJBQTBCLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDdkksT0FBTyxpQkFBaUIsQ0FBQztRQUM3QixDQUFDO1FBRU8sOERBQXlCLEdBQWpDO1lBQ0ksSUFBSSx5QkFBeUIsR0FBRyxJQUFJLHFEQUF5QixDQUFDLHVDQUFrQixDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDdEcseUJBQXlCLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFFLDBCQUEwQixDQUFDLGtCQUFrQixFQUFFLEVBQUUsRUFBRSxxREFBeUIsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbEsseUJBQXlCLENBQUMsT0FBTyxDQUFDLDJCQUEyQixFQUFFLDBCQUEwQixDQUFDLDJCQUEyQixFQUFFLEVBQUUsRUFBRSxxREFBeUIsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMzSyxPQUFPLHlCQUF5QixDQUFDO1FBQ3JDLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNJLDBFQUFxQyxHQUE1QztZQUNJLElBQUksdUJBQXVCLEdBQUcsSUFBSSxLQUFLLEVBQW1DLENBQUM7WUFDM0UsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksaUVBQStCLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNuSSxPQUFPLHVCQUF1QixDQUFDO1FBQ25DLENBQUM7UUFwQ2Esa0RBQXVCLEdBQUcsd0JBQXdCLENBQUM7UUFDbkQsNkNBQWtCLEdBQUcsa0JBQWtCLENBQUM7UUFDeEMsc0RBQTJCLEdBQUcsMkJBQTJCLENBQUM7UUFtQzVFLGlDQUFDO0tBQUEsQUF2Q0QsQ0FBZ0QsMkVBQW9DLEdBdUNuRjtJQXZDWSxnRUFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTcGxpdHRlckRlZmluaXRpb24gfSBmcm9tIFwiLi4vc3BsaXR0ZXJXaWRnZXQvc3BsaXR0ZXJEZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IFNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vY29tbW9uL3NwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb25XaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbldpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmYXVsdFNldHRpbmdzUGFja2FnZSB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnREZWZhdWx0U2V0dGluZ3NQYWNrYWdlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24gZXh0ZW5kcyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbldpZGdldEJhc2V7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBTcGxpdHRlcldpZGdldE1ldGhvZHNJZCA9IFwiU3BsaXR0ZXJXaWRnZXRfTWV0aG9kc1wiO1xyXG4gICAgcHVibGljIHN0YXRpYyBNZXRob2RMaXN0V2lkZ2V0SWQgPSBcIk1ldGhvZExpc3RXaWRnZXRcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgTWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldElkID0gXCJNZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0XCI7XHJcblxyXG4gICAgcHVibGljIHJlYWRvbmx5IGRlZmF1bHRDb21wb25lbnRTZXR0aW5nc0lkID0gXCJtZXRob2RzV2lkZ2V0RGVmaW5pdGlvblwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBNYWluU3BsaXR0ZXJEZWZpbml0aW9uSWQgPSBcIm1ldGhvZHNNYWluU3BsaXR0ZXJEZWZpbml0aW9uXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGNvbXBvbmVudCBzZXR0aW5ncyBmb3IgdGhpcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50U2V0dGluZ3N9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERlZmF1bHRDb21wb25lbnRTZXR0aW5ncygpIDogQ29tcG9uZW50U2V0dGluZ3Mge1xyXG4gICAgICAgIGxldCBjb21wb25lbnRTZXR0aW5ncyA9IG5ldyBDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLmFkZFN1YkNvbXBvbmVudChcIlNwbGl0dGVyV2lkZ2V0XCIsIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLlNwbGl0dGVyV2lkZ2V0TWV0aG9kc0lkLCB0aGlzLk1haW5TcGxpdHRlckRlZmluaXRpb25JZCk7XHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudFNldHRpbmdzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0TWFpblNwbGl0dGVyRGVmaW5pdGlvbigpIDogQ29tcG9uZW50U2V0dGluZ3Mge1xyXG4gICAgICAgIGxldCBzcGxpdHRlckNvbXBvbmVudFNldHRpbmdzID0gbmV3IFNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3MoU3BsaXR0ZXJEZWZpbml0aW9uLm9yaWVudGF0aW9uVmVydGljYWwpO1xyXG4gICAgICAgIHNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3MuYWRkUGFuZShcIk1ldGhvZExpc3RXaWRnZXRcIiwgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uTWV0aG9kTGlzdFdpZGdldElkLCBcIlwiLCBTcGxpdHRlckNvbXBvbmVudFNldHRpbmdzLmdldFBhbmVTZXR0aW5ncygtMSwgdHJ1ZSwgMzgpKTtcclxuICAgICAgICBzcGxpdHRlckNvbXBvbmVudFNldHRpbmdzLmFkZFBhbmUoXCJNZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0XCIsIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLk1ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXRJZCwgXCJcIiwgU3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncy5nZXRQYW5lU2V0dGluZ3MoMjAwKSk7XHJcbiAgICAgICAgcmV0dXJuIHNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIHNvbWUgZGVmYXVsdCBwZXJzaXN0aW5nIGRhdGEgcGFja2FnZXMgaW4gdGhlIG1haW4gZGVmYXVsdCBwZXJzaXN0aW5nIGRhdGEgcHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8Q29tcG9uZW50RGVmYXVsdFNldHRpbmdzUGFja2FnZT58dW5kZWZpbmVkfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRBZGRpdGlvbmFsRGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCk6IEFycmF5PENvbXBvbmVudERlZmF1bHRTZXR0aW5nc1BhY2thZ2U+fHVuZGVmaW5lZHtcclxuICAgICAgICBsZXQgZGVmYXVsdFNldHRpbmdzUGFja2FnZXMgPSBuZXcgQXJyYXk8Q29tcG9uZW50RGVmYXVsdFNldHRpbmdzUGFja2FnZT4oKTtcclxuICAgICAgICBkZWZhdWx0U2V0dGluZ3NQYWNrYWdlcy5wdXNoKG5ldyBDb21wb25lbnREZWZhdWx0U2V0dGluZ3NQYWNrYWdlKHRoaXMuTWFpblNwbGl0dGVyRGVmaW5pdGlvbklkLCB0aGlzLmdldE1haW5TcGxpdHRlckRlZmluaXRpb24oKSkpO1xyXG4gICAgICAgIHJldHVybiBkZWZhdWx0U2V0dGluZ3NQYWNrYWdlcztcclxuICAgIH1cclxufSJdfQ==