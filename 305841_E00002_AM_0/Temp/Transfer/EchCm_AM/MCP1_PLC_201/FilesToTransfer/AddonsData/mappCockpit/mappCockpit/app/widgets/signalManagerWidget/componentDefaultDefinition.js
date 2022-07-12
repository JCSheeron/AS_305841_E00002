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
            _this.defaultComponentSettingsId = "signalManagerWidgetDefinition";
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
            // add subcomponents
            componentSettings.addSubComponent("ImageProvider", ComponentDefaultDefinition.ImageProviderId);
            // needed for busy screen
            componentSettings.addSubComponent("CommonLayoutProvider", ComponentDefaultDefinition.CommonLayoutProviderId);
            componentSettings.addSubComponent("SeriesProvider", ComponentDefaultDefinition.SeriesProviderId);
            componentSettings.addSubComponent("SignalManagerDataModel", ComponentDefaultDefinition.SignalManagerDataModelId);
            componentSettings.addSubComponent("ChartManagerDataModel", ComponentDefaultDefinition.ChartManagerDataModelId);
            return componentSettings;
        };
        ComponentDefaultDefinition.SeriesProviderId = "SeriesProvider";
        ComponentDefaultDefinition.SignalManagerDataModelId = "SignalManagerDataModel";
        ComponentDefaultDefinition.ChartManagerDataModelId = "ChartManagerDataModel";
        return ComponentDefaultDefinition;
    }(componentDefaultDefinitionWidgetBase_1.ComponentDefaultDefinitionWidgetBase));
    exports.ComponentDefaultDefinition = ComponentDefaultDefinition;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvc2lnbmFsTWFuYWdlcldpZGdldC9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBR0E7UUFBZ0QsOENBQW9DO1FBQXBGO1lBQUEscUVBMEJDO1lBcEJtQixnQ0FBMEIsR0FBRywrQkFBK0IsQ0FBQzs7UUFvQmpGLENBQUM7UUFsQkc7Ozs7O1dBS0E7UUFDSSxnRUFBMkIsR0FBbEM7WUFDTyxJQUFJLGlCQUFpQixHQUFHLElBQUkscUNBQWlCLEVBQUUsQ0FBQztZQUNoRCxvQkFBb0I7WUFDcEIsaUJBQWlCLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRSwwQkFBMEIsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUMvRix5QkFBeUI7WUFDekIsaUJBQWlCLENBQUMsZUFBZSxDQUFDLHNCQUFzQixFQUFFLDBCQUEwQixDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFFN0csaUJBQWlCLENBQUMsZUFBZSxDQUFDLGdCQUFnQixFQUFFLDBCQUEwQixDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDakcsaUJBQWlCLENBQUMsZUFBZSxDQUFDLHdCQUF3QixFQUFFLDBCQUEwQixDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDakgsaUJBQWlCLENBQUMsZUFBZSxDQUFDLHVCQUF1QixFQUFFLDBCQUEwQixDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDL0csT0FBTyxpQkFBaUIsQ0FBQztRQUM3QixDQUFDO1FBdkJhLDJDQUFnQixHQUFHLGdCQUFnQixDQUFDO1FBQ3BDLG1EQUF3QixHQUFHLHdCQUF3QixDQUFDO1FBQ3BELGtEQUF1QixHQUFHLHVCQUF1QixDQUFDO1FBc0JwRSxpQ0FBQztLQUFBLEFBMUJELENBQWdELDJFQUFvQyxHQTBCbkY7SUExQlksZ0VBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb25XaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbldpZGdldEJhc2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbiBleHRlbmRzIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uV2lkZ2V0QmFzZXtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIFNlcmllc1Byb3ZpZGVySWQgPSBcIlNlcmllc1Byb3ZpZGVyXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNpZ25hbE1hbmFnZXJEYXRhTW9kZWxJZCA9IFwiU2lnbmFsTWFuYWdlckRhdGFNb2RlbFwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBDaGFydE1hbmFnZXJEYXRhTW9kZWxJZCA9IFwiQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsXCI7XHJcblxyXG4gICAgcHVibGljIHJlYWRvbmx5IGRlZmF1bHRDb21wb25lbnRTZXR0aW5nc0lkID0gXCJzaWduYWxNYW5hZ2VyV2lkZ2V0RGVmaW5pdGlvblwiO1xyXG5cclxuICAgIC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIGRlZmF1bHQgY29tcG9uZW50IHNldHRpbmdzIGZvciB0aGlzIHdpZGdldFxyXG5cdCAqXHJcblx0ICogQHJldHVybnMge0NvbXBvbmVudFNldHRpbmdzfVxyXG5cdCAqIEBtZW1iZXJvZiBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvblxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKTogQ29tcG9uZW50U2V0dGluZ3Mge1xyXG4gICAgICAgIGxldCBjb21wb25lbnRTZXR0aW5ncyA9IG5ldyBDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgICAgIC8vIGFkZCBzdWJjb21wb25lbnRzXHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkU3ViQ29tcG9uZW50KFwiSW1hZ2VQcm92aWRlclwiLCBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5JbWFnZVByb3ZpZGVySWQpO1xyXG4gICAgICAgIC8vIG5lZWRlZCBmb3IgYnVzeSBzY3JlZW5cclxuICAgICAgICBjb21wb25lbnRTZXR0aW5ncy5hZGRTdWJDb21wb25lbnQoXCJDb21tb25MYXlvdXRQcm92aWRlclwiLCBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5Db21tb25MYXlvdXRQcm92aWRlcklkKTtcclxuICAgICAgICBcclxuICAgICAgICBjb21wb25lbnRTZXR0aW5ncy5hZGRTdWJDb21wb25lbnQoXCJTZXJpZXNQcm92aWRlclwiLCBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5TZXJpZXNQcm92aWRlcklkKTtcclxuICAgICAgICBjb21wb25lbnRTZXR0aW5ncy5hZGRTdWJDb21wb25lbnQoXCJTaWduYWxNYW5hZ2VyRGF0YU1vZGVsXCIsIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLlNpZ25hbE1hbmFnZXJEYXRhTW9kZWxJZCk7XHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkU3ViQ29tcG9uZW50KFwiQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsXCIsIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLkNoYXJ0TWFuYWdlckRhdGFNb2RlbElkKTtcclxuICAgICAgICByZXR1cm4gY29tcG9uZW50U2V0dGluZ3M7XHJcbiAgICB9XHJcbn0iXX0=