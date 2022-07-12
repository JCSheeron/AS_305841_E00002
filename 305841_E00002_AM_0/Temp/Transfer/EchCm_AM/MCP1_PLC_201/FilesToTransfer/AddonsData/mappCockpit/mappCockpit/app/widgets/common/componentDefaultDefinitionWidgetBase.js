define(["require", "exports", "../../common/componentBase/componentSettings"], function (require, exports, componentSettings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ComponentDefaultDefinitionWidgetBase = /** @class */ (function () {
        function ComponentDefaultDefinitionWidgetBase() {
            this.defaultComponentSettingsId = "";
        }
        ComponentDefaultDefinitionWidgetBase.prototype.getDefaultComponentSettings = function () {
            return new componentSettings_1.ComponentSettings();
        };
        /**
         * Adds some default persisting data packages in the main default persisting data provider
         *
         * @returns {(ComponentDefaultSettingsPackage[]| undefined)}
         * @memberof ComponentDefaultDefinitionWidgetBase
         */
        ComponentDefaultDefinitionWidgetBase.prototype.getAdditionalDefaultComponentSettings = function () {
            return undefined;
        };
        ComponentDefaultDefinitionWidgetBase.ImageProviderId = "ImageProvider";
        ComponentDefaultDefinitionWidgetBase.CommonLayoutProviderId = "CommonLayoutProvider";
        return ComponentDefaultDefinitionWidgetBase;
    }());
    exports.ComponentDefaultDefinitionWidgetBase = ComponentDefaultDefinitionWidgetBase;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50RGVmYXVsdERlZmluaXRpb25XaWRnZXRCYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NvbW1vbi9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbldpZGdldEJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBSUE7UUFBQTtZQUNvQiwrQkFBMEIsR0FBVyxFQUFFLENBQUM7UUFrQjVELENBQUM7UUFiVSwwRUFBMkIsR0FBbEM7WUFDSSxPQUFPLElBQUkscUNBQWlCLEVBQUUsQ0FBQztRQUNuQyxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSSxvRkFBcUMsR0FBNUM7WUFDRyxPQUFPLFNBQVMsQ0FBQztRQUNwQixDQUFDO1FBZmEsb0RBQWUsR0FBRyxlQUFlLENBQUM7UUFDbEMsMkRBQXNCLEdBQUcsc0JBQXNCLENBQUM7UUFlbEUsMkNBQUM7S0FBQSxBQW5CRCxJQW1CQztJQW5CWSxvRkFBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBJQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24gfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvaW50ZXJmYWNlcy9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbkludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZhdWx0U2V0dGluZ3NQYWNrYWdlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudERlZmF1bHRTZXR0aW5nc1BhY2thZ2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbldpZGdldEJhc2UgaW1wbGVtZW50cyBJQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb257XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgZGVmYXVsdENvbXBvbmVudFNldHRpbmdzSWQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBcclxuICAgIHB1YmxpYyBzdGF0aWMgSW1hZ2VQcm92aWRlcklkID0gXCJJbWFnZVByb3ZpZGVyXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIENvbW1vbkxheW91dFByb3ZpZGVySWQgPSBcIkNvbW1vbkxheW91dFByb3ZpZGVyXCI7XHJcblxyXG4gICAgcHVibGljIGdldERlZmF1bHRDb21wb25lbnRTZXR0aW5ncygpOiBDb21wb25lbnRTZXR0aW5nc3tcclxuICAgICAgICByZXR1cm4gbmV3IENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIHNvbWUgZGVmYXVsdCBwZXJzaXN0aW5nIGRhdGEgcGFja2FnZXMgaW4gdGhlIG1haW4gZGVmYXVsdCBwZXJzaXN0aW5nIGRhdGEgcHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7KENvbXBvbmVudERlZmF1bHRTZXR0aW5nc1BhY2thZ2VbXXwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbldpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEFkZGl0aW9uYWxEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKTogQ29tcG9uZW50RGVmYXVsdFNldHRpbmdzUGFja2FnZVtdfCB1bmRlZmluZWQge1xyXG4gICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxufSJdfQ==