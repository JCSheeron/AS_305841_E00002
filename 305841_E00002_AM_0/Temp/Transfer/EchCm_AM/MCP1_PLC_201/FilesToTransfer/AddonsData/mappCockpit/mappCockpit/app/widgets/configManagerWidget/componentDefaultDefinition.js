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
            _this.defaultComponentSettingsId = "configManagerWidgetDefinition";
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
            componentSettings.addSubComponent("ConfigManagerDataModel", ComponentDefaultDefinition.ConfigManagerDataModel);
            return componentSettings;
        };
        ComponentDefaultDefinition.ConfigManagerDataModel = "ConfigManagerDataModel";
        return ComponentDefaultDefinition;
    }(componentDefaultDefinitionWidgetBase_1.ComponentDefaultDefinitionWidgetBase));
    exports.ComponentDefaultDefinition = ComponentDefaultDefinition;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29uZmlnTWFuYWdlcldpZGdldC9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBSUE7UUFBZ0QsOENBQW9DO1FBQXBGO1lBQUEscUVBb0JDO1lBaEJtQixnQ0FBMEIsR0FBRywrQkFBK0IsQ0FBQzs7UUFnQmpGLENBQUM7UUFkRzs7Ozs7V0FLRztRQUNJLGdFQUEyQixHQUFsQztZQUNJLElBQUksaUJBQWlCLEdBQUcsSUFBSSxxQ0FBaUIsRUFBRSxDQUFDO1lBRWhELGlCQUFpQixDQUFDLGVBQWUsQ0FBQyx3QkFBd0IsRUFBRSwwQkFBMEIsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBRS9HLE9BQU8saUJBQWlCLENBQUM7UUFDN0IsQ0FBQztRQWhCYSxpREFBc0IsR0FBRyx3QkFBd0IsQ0FBQztRQWtCcEUsaUNBQUM7S0FBQSxBQXBCRCxDQUFnRCwyRUFBb0MsR0FvQm5GO0lBcEJZLGdFQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vY29tcG9uZW50RGVmYXVsdERlZmluaXRpb25XaWRnZXRCYXNlXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uIGV4dGVuZHMgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb25XaWRnZXRCYXNle1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgQ29uZmlnTWFuYWdlckRhdGFNb2RlbCA9IFwiQ29uZmlnTWFuYWdlckRhdGFNb2RlbFwiO1xyXG5cclxuICAgIHB1YmxpYyByZWFkb25seSBkZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NJZCA9IFwiY29uZmlnTWFuYWdlcldpZGdldERlZmluaXRpb25cIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgY29tcG9uZW50IHNldHRpbmdzIGZvciB0aGlzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnRTZXR0aW5nc31cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCkgOiBDb21wb25lbnRTZXR0aW5ncyB7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudFNldHRpbmdzID0gbmV3IENvbXBvbmVudFNldHRpbmdzKCk7XHJcblxyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLmFkZFN1YkNvbXBvbmVudChcIkNvbmZpZ01hbmFnZXJEYXRhTW9kZWxcIiwgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uQ29uZmlnTWFuYWdlckRhdGFNb2RlbCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudFNldHRpbmdzO1xyXG4gICAgfVxyXG5cclxufSJdfQ==