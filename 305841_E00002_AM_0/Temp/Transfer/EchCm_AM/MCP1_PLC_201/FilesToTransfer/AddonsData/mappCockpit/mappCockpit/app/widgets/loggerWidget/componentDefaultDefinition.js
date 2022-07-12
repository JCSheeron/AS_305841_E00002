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
define(["require", "exports", "../common/componentDefaultDefinitionWidgetBase", "../../common/componentBase/componentSettings"], function (require, exports, componentDefaultDefinitionWidgetBase_1, componentSettings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Default definition for the logger widget
     *
     * @export
     * @class ComponentDefaultDefinition
     * @extends {ComponentDefaultDefinitionWidgetBase}
     */
    var ComponentDefaultDefinition = /** @class */ (function (_super) {
        __extends(ComponentDefaultDefinition, _super);
        function ComponentDefaultDefinition() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.defaultComponentSettingsId = "networkCommandTraceWigetDefinition";
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
            return componentSettings;
        };
        return ComponentDefaultDefinition;
    }(componentDefaultDefinitionWidgetBase_1.ComponentDefaultDefinitionWidgetBase));
    exports.ComponentDefaultDefinition = ComponentDefaultDefinition;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvbG9nZ2VyV2lkZ2V0L2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFHQTs7Ozs7O09BTUc7SUFDSDtRQUFnRCw4Q0FBb0M7UUFBcEY7WUFBQSxxRUFtQkM7WUFqQm1CLGdDQUEwQixHQUFHLG9DQUFvQyxDQUFDOztRQWlCdEYsQ0FBQztRQWZHOzs7OztXQUtHO1FBQ0ssZ0VBQTJCLEdBQWxDO1lBQ0csSUFBSSxpQkFBaUIsR0FBRyxJQUFJLHFDQUFpQixFQUFFLENBQUM7WUFFaEQsb0JBQW9CO1lBQ3BCLHlCQUF5QjtZQUN6QixpQkFBaUIsQ0FBQyxlQUFlLENBQUMsc0JBQXNCLEVBQUUsMEJBQTBCLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUU3RyxPQUFPLGlCQUFpQixDQUFDO1FBQzdCLENBQUM7UUFDTCxpQ0FBQztJQUFELENBQUMsQUFuQkQsQ0FBZ0QsMkVBQW9DLEdBbUJuRjtJQW5CWSxnRUFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbldpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uV2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5cclxuLyoqXHJcbiAqIERlZmF1bHQgZGVmaW5pdGlvbiBmb3IgdGhlIGxvZ2dlciB3aWRnZXRcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb25cclxuICogQGV4dGVuZHMge0NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uV2lkZ2V0QmFzZX1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbiBleHRlbmRzIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uV2lkZ2V0QmFzZXtcclxuXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgZGVmYXVsdENvbXBvbmVudFNldHRpbmdzSWQgPSBcIm5ldHdvcmtDb21tYW5kVHJhY2VXaWdldERlZmluaXRpb25cIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgY29tcG9uZW50IHNldHRpbmdzIGZvciB0aGlzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnRTZXR0aW5nc31cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvblxyXG4gICAgICovXHJcbiAgICAgcHVibGljIGdldERlZmF1bHRDb21wb25lbnRTZXR0aW5ncygpIDogQ29tcG9uZW50U2V0dGluZ3Mge1xyXG4gICAgICAgIGxldCBjb21wb25lbnRTZXR0aW5ncyA9IG5ldyBDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEFkZCBzdWJjb21wb25lbnRzXHJcbiAgICAgICAgLy8gbmVlZGVkIGZvciBidXN5IHNjcmVlblxyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLmFkZFN1YkNvbXBvbmVudChcIkNvbW1vbkxheW91dFByb3ZpZGVyXCIsIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLkNvbW1vbkxheW91dFByb3ZpZGVySWQpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29tcG9uZW50U2V0dGluZ3M7XHJcbiAgICB9XHJcbn0iXX0=