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
define(["require", "exports", "../../common/componentBase/componentSettings", "../../framework/componentHub/bindings/componentBinding", "../common/componentDefaultDefinitionWidgetBase"], function (require, exports, componentSettings_1, componentBinding_1, componentDefaultDefinitionWidgetBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ComponentDefaultDefinition = /** @class */ (function (_super) {
        __extends(ComponentDefaultDefinition, _super);
        function ComponentDefaultDefinition() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.defaultComponentSettingsId = "traceConfigurationTriggerDefinition";
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
            // Add bindings
            componentSettings.addBinding(componentBinding_1.BindingType.DATA, "", "app::trace configuration", "available data points", "initializeAvailableDataPoints", "");
            componentSettings.addBinding(componentBinding_1.BindingType.DATA, "", "app::trace configuration", "trace start trigger info", "initializeTraceStartTriggerInfo", "");
            return componentSettings;
        };
        return ComponentDefaultDefinition;
    }(componentDefaultDefinitionWidgetBase_1.ComponentDefaultDefinitionWidgetBase));
    exports.ComponentDefaultDefinition = ComponentDefaultDefinition;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvdHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0L2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFJQTtRQUFnRCw4Q0FBb0M7UUFBcEY7WUFBQSxxRUFtQkM7WUFqQm1CLGdDQUEwQixHQUFHLHFDQUFxQyxDQUFDOztRQWlCdkYsQ0FBQztRQWZHOzs7OztXQUtHO1FBQ0ksZ0VBQTJCLEdBQWxDO1lBQ0ksSUFBSSxpQkFBaUIsR0FBRyxJQUFJLHFDQUFpQixFQUFFLENBQUM7WUFFaEQsZUFBZTtZQUNmLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyw4QkFBVyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsMEJBQTBCLEVBQUUsdUJBQXVCLEVBQUUsK0JBQStCLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDN0ksaUJBQWlCLENBQUMsVUFBVSxDQUFDLDhCQUFXLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSwwQkFBMEIsRUFBRSwwQkFBMEIsRUFBRSxpQ0FBaUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUVsSixPQUFPLGlCQUFpQixDQUFDO1FBQzdCLENBQUM7UUFDTCxpQ0FBQztJQUFELENBQUMsQUFuQkQsQ0FBZ0QsMkVBQW9DLEdBbUJuRjtJQW5CWSxnRUFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBCaW5kaW5nVHlwZSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvY29tcG9uZW50SHViL2JpbmRpbmdzL2NvbXBvbmVudEJpbmRpbmdcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb25XaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbldpZGdldEJhc2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbiBleHRlbmRzIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uV2lkZ2V0QmFzZXtcclxuICAgIFxyXG4gICAgcHVibGljIHJlYWRvbmx5IGRlZmF1bHRDb21wb25lbnRTZXR0aW5nc0lkID0gXCJ0cmFjZUNvbmZpZ3VyYXRpb25UcmlnZ2VyRGVmaW5pdGlvblwiO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgY29tcG9uZW50IHNldHRpbmdzIGZvciB0aGlzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnRTZXR0aW5nc31cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCkgOiBDb21wb25lbnRTZXR0aW5ncyB7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudFNldHRpbmdzID0gbmV3IENvbXBvbmVudFNldHRpbmdzKCk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBiaW5kaW5nc1xyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLmFkZEJpbmRpbmcoQmluZGluZ1R5cGUuREFUQSwgXCJcIiwgXCJhcHA6OnRyYWNlIGNvbmZpZ3VyYXRpb25cIiwgXCJhdmFpbGFibGUgZGF0YSBwb2ludHNcIiwgXCJpbml0aWFsaXplQXZhaWxhYmxlRGF0YVBvaW50c1wiLCBcIlwiKTtcclxuICAgICAgICBjb21wb25lbnRTZXR0aW5ncy5hZGRCaW5kaW5nKEJpbmRpbmdUeXBlLkRBVEEsIFwiXCIsIFwiYXBwOjp0cmFjZSBjb25maWd1cmF0aW9uXCIsIFwidHJhY2Ugc3RhcnQgdHJpZ2dlciBpbmZvXCIsIFwiaW5pdGlhbGl6ZVRyYWNlU3RhcnRUcmlnZ2VySW5mb1wiLCBcIlwiKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudFNldHRpbmdzO1xyXG4gICAgfVxyXG59Il19