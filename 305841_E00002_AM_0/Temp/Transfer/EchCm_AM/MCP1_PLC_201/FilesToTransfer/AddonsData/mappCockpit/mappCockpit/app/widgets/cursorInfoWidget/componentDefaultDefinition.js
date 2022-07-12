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
define(["require", "exports", "../../common/componentBase/componentSettings", "../../framework/componentHub/bindings/componentBinding", "../common/states/cursorStates", "../common/componentDefaultDefinitionWidgetBase"], function (require, exports, componentSettings_1, componentBinding_1, cursorStates_1, componentDefaultDefinitionWidgetBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ComponentDefaultDefinition = /** @class */ (function (_super) {
        __extends(ComponentDefaultDefinition, _super);
        function ComponentDefaultDefinition() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.defaultComponentSettingsId = "CursorInfoWidgetDefinition";
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
            componentSettings.addSubComponent("ChartManagerDataModel", ComponentDefaultDefinition.ChartManagerDataModelId);
            componentSettings.addSubComponent("CursorSignalsDataModel", ComponentDefaultDefinition.CursorSignalsDataModelId);
            // Add bindings
            componentSettings.addBinding(componentBinding_1.BindingType.STATE, cursorStates_1.CursorStates, "app::trace view chart states", "cursor states", "cursorsStates", "updateCursorStates");
            return componentSettings;
        };
        ComponentDefaultDefinition.ChartManagerDataModelId = "ChartManagerDataModel";
        ComponentDefaultDefinition.CursorSignalsDataModelId = "CursorSignalsDataModel";
        return ComponentDefaultDefinition;
    }(componentDefaultDefinitionWidgetBase_1.ComponentDefaultDefinitionWidgetBase));
    exports.ComponentDefaultDefinition = ComponentDefaultDefinition;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY3Vyc29ySW5mb1dpZGdldC9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBS0E7UUFBZ0QsOENBQW9DO1FBQXBGO1lBQUEscUVBeUJDO1lBcEJtQixnQ0FBMEIsR0FBRyw0QkFBNEIsQ0FBQzs7UUFvQjlFLENBQUM7UUFsQkc7Ozs7O1dBS0c7UUFDSSxnRUFBMkIsR0FBbEM7WUFDSSxJQUFJLGlCQUFpQixHQUFHLElBQUkscUNBQWlCLEVBQUUsQ0FBQztZQUVoRCxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsdUJBQXVCLEVBQUUsMEJBQTBCLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUMvRyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsd0JBQXdCLEVBQUUsMEJBQTBCLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUVqSCxlQUFlO1lBQ2YsaUJBQWlCLENBQUMsVUFBVSxDQUFDLDhCQUFXLENBQUMsS0FBSyxFQUFFLDJCQUFZLEVBQUUsOEJBQThCLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1lBRXRKLE9BQU8saUJBQWlCLENBQUM7UUFDN0IsQ0FBQztRQXJCYSxrREFBdUIsR0FBRyx1QkFBdUIsQ0FBQztRQUNsRCxtREFBd0IsR0FBRyx3QkFBd0IsQ0FBQztRQXNCdEUsaUNBQUM7S0FBQSxBQXpCRCxDQUFnRCwyRUFBb0MsR0F5Qm5GO0lBekJZLGdFQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IEJpbmRpbmdUeXBlIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9jb21wb25lbnRIdWIvYmluZGluZ3MvY29tcG9uZW50QmluZGluZ1wiO1xyXG5pbXBvcnQgeyBDdXJzb3JTdGF0ZXMgfSBmcm9tIFwiLi4vY29tbW9uL3N0YXRlcy9jdXJzb3JTdGF0ZXNcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb25XaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbldpZGdldEJhc2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbiBleHRlbmRzIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uV2lkZ2V0QmFzZXtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIENoYXJ0TWFuYWdlckRhdGFNb2RlbElkID0gXCJDaGFydE1hbmFnZXJEYXRhTW9kZWxcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgQ3Vyc29yU2lnbmFsc0RhdGFNb2RlbElkID0gXCJDdXJzb3JTaWduYWxzRGF0YU1vZGVsXCI7XHJcbiAgICBcclxuICAgIHB1YmxpYyByZWFkb25seSBkZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NJZCA9IFwiQ3Vyc29ySW5mb1dpZGdldERlZmluaXRpb25cIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgY29tcG9uZW50IHNldHRpbmdzIGZvciB0aGlzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnRTZXR0aW5nc31cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCkgOiBDb21wb25lbnRTZXR0aW5ncyB7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudFNldHRpbmdzID0gbmV3IENvbXBvbmVudFNldHRpbmdzKCk7XHJcblxyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLmFkZFN1YkNvbXBvbmVudChcIkNoYXJ0TWFuYWdlckRhdGFNb2RlbFwiLCBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5DaGFydE1hbmFnZXJEYXRhTW9kZWxJZCk7XHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkU3ViQ29tcG9uZW50KFwiQ3Vyc29yU2lnbmFsc0RhdGFNb2RlbFwiLCBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5DdXJzb3JTaWduYWxzRGF0YU1vZGVsSWQpO1xyXG5cclxuICAgICAgICAvLyBBZGQgYmluZGluZ3NcclxuICAgICAgICBjb21wb25lbnRTZXR0aW5ncy5hZGRCaW5kaW5nKEJpbmRpbmdUeXBlLlNUQVRFLCBDdXJzb3JTdGF0ZXMsIFwiYXBwOjp0cmFjZSB2aWV3IGNoYXJ0IHN0YXRlc1wiLCBcImN1cnNvciBzdGF0ZXNcIiwgXCJjdXJzb3JzU3RhdGVzXCIsIFwidXBkYXRlQ3Vyc29yU3RhdGVzXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBjb21wb25lbnRTZXR0aW5ncztcclxuICAgIH1cclxuXHJcbn0iXX0=