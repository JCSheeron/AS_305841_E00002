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
            _this.defaultComponentSettingsId = "traceControlDefinition";
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
            // Add subcomponents
            // needed for busy screen
            componentSettings.addSubComponent("CommonLayoutProvider", ComponentDefaultDefinition.CommonLayoutProviderId);
            // Add bindings
            componentSettings.addBinding(componentBinding_1.BindingType.COMMAND, "", "app::trace control", "trace activate", "", "activateTrace");
            componentSettings.addBinding(componentBinding_1.BindingType.COMMAND_RESPONSE, "", "app::trace control", "trace activated", "onTraceActivated", "");
            componentSettings.addBinding(componentBinding_1.BindingType.DATA, "", "app::trace control", "trace state", "onTraceStateChanged", "");
            return componentSettings;
        };
        return ComponentDefaultDefinition;
    }(componentDefaultDefinitionWidgetBase_1.ComponentDefaultDefinitionWidgetBase));
    exports.ComponentDefaultDefinition = ComponentDefaultDefinition;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvdHJhY2VDb250cm9sV2lkZ2V0L2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFJQTtRQUFnRCw4Q0FBb0M7UUFBcEY7WUFBQSxxRUF1QkM7WUFyQm1CLGdDQUEwQixHQUFHLHdCQUF3QixDQUFDOztRQXFCMUUsQ0FBQztRQW5CRzs7Ozs7V0FLRztRQUNJLGdFQUEyQixHQUFsQztZQUNJLElBQUksaUJBQWlCLEdBQUcsSUFBSSxxQ0FBaUIsRUFBRSxDQUFDO1lBRWhELG9CQUFvQjtZQUNwQix5QkFBeUI7WUFDekIsaUJBQWlCLENBQUMsZUFBZSxDQUFDLHNCQUFzQixFQUFFLDBCQUEwQixDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFFN0csZUFBZTtZQUNmLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyw4QkFBVyxDQUFDLE9BQU8sRUFBRSxFQUFFLEVBQUUsb0JBQW9CLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1lBQ25ILGlCQUFpQixDQUFDLFVBQVUsQ0FBQyw4QkFBVyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsRUFBRSxvQkFBb0IsRUFBRSxpQkFBaUIsRUFBRSxrQkFBa0IsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNoSSxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsOEJBQVcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLG9CQUFvQixFQUFFLGFBQWEsRUFBRSxxQkFBcUIsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNuSCxPQUFPLGlCQUFpQixDQUFDO1FBQzdCLENBQUM7UUFDTCxpQ0FBQztJQUFELENBQUMsQUF2QkQsQ0FBZ0QsMkVBQW9DLEdBdUJuRjtJQXZCWSxnRUFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBCaW5kaW5nVHlwZSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvY29tcG9uZW50SHViL2JpbmRpbmdzL2NvbXBvbmVudEJpbmRpbmdcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb25XaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbldpZGdldEJhc2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbiBleHRlbmRzIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uV2lkZ2V0QmFzZXtcclxuICAgIFxyXG4gICAgcHVibGljIHJlYWRvbmx5IGRlZmF1bHRDb21wb25lbnRTZXR0aW5nc0lkID0gXCJ0cmFjZUNvbnRyb2xEZWZpbml0aW9uXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGNvbXBvbmVudCBzZXR0aW5ncyBmb3IgdGhpcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50U2V0dGluZ3N9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERlZmF1bHRDb21wb25lbnRTZXR0aW5ncygpIDogQ29tcG9uZW50U2V0dGluZ3Mge1xyXG4gICAgICAgIGxldCBjb21wb25lbnRTZXR0aW5ncyA9IG5ldyBDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEFkZCBzdWJjb21wb25lbnRzXHJcbiAgICAgICAgLy8gbmVlZGVkIGZvciBidXN5IHNjcmVlblxyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLmFkZFN1YkNvbXBvbmVudChcIkNvbW1vbkxheW91dFByb3ZpZGVyXCIsIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLkNvbW1vbkxheW91dFByb3ZpZGVySWQpO1xyXG5cclxuICAgICAgICAvLyBBZGQgYmluZGluZ3NcclxuICAgICAgICBjb21wb25lbnRTZXR0aW5ncy5hZGRCaW5kaW5nKEJpbmRpbmdUeXBlLkNPTU1BTkQsIFwiXCIsIFwiYXBwOjp0cmFjZSBjb250cm9sXCIsIFwidHJhY2UgYWN0aXZhdGVcIiwgXCJcIiwgXCJhY3RpdmF0ZVRyYWNlXCIpO1xyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLmFkZEJpbmRpbmcoQmluZGluZ1R5cGUuQ09NTUFORF9SRVNQT05TRSwgXCJcIiwgXCJhcHA6OnRyYWNlIGNvbnRyb2xcIiwgXCJ0cmFjZSBhY3RpdmF0ZWRcIiwgXCJvblRyYWNlQWN0aXZhdGVkXCIsIFwiXCIpO1xyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLmFkZEJpbmRpbmcoQmluZGluZ1R5cGUuREFUQSwgXCJcIiwgXCJhcHA6OnRyYWNlIGNvbnRyb2xcIiwgXCJ0cmFjZSBzdGF0ZVwiLCBcIm9uVHJhY2VTdGF0ZUNoYW5nZWRcIiwgXCJcIik7XHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudFNldHRpbmdzO1xyXG4gICAgfVxyXG59Il19