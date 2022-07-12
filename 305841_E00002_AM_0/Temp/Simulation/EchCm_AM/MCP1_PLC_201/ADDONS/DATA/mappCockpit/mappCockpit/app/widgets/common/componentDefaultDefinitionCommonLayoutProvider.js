define(["require", "exports", "../../common/componentBase/componentSettings"], function (require, exports, componentSettings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ComponentDefaultDefinitionCommonLayoutProvider = /** @class */ (function () {
        function ComponentDefaultDefinitionCommonLayoutProvider() {
            this.defaultComponentSettingsId = "commonLayoutProviderDefinition";
        }
        /**
         * Returns the default component settings for this widget
         *
         * @static
         * @returns {ComponentSettings}
         * @memberof ComponentDefaultDefinitionCommonLayoutProvider
         */
        ComponentDefaultDefinitionCommonLayoutProvider.prototype.getDefaultComponentSettings = function () {
            var componentSettings = new componentSettings_1.ComponentSettings();
            // add subcomponents
            componentSettings.addSubComponent("ImageProvider", ComponentDefaultDefinitionCommonLayoutProvider.ImageProviderId);
            return componentSettings;
        };
        /**
         * Adds some default persisting data packages in the main default persisting data provider
         *
         * @returns {(ComponentDefaultSettingsPackage[]| undefined)}
         * @memberof ComponentDefaultDefinitionCommonLayoutProvider
         */
        ComponentDefaultDefinitionCommonLayoutProvider.prototype.getAdditionalDefaultComponentSettings = function () {
            return undefined;
        };
        ComponentDefaultDefinitionCommonLayoutProvider.ImageProviderId = "ImageProvider";
        return ComponentDefaultDefinitionCommonLayoutProvider;
    }());
    exports.ComponentDefaultDefinitionCommonLayoutProvider = ComponentDefaultDefinitionCommonLayoutProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50RGVmYXVsdERlZmluaXRpb25Db21tb25MYXlvdXRQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb21tb24vY29tcG9uZW50RGVmYXVsdERlZmluaXRpb25Db21tb25MYXlvdXRQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFJQTtRQUFBO1lBR29CLCtCQUEwQixHQUFHLGdDQUFnQyxDQUFDO1FBMkJsRixDQUFDO1FBekJHOzs7Ozs7V0FNRztRQUNJLG9GQUEyQixHQUFsQztZQUNJLElBQUksaUJBQWlCLEdBQUcsSUFBSSxxQ0FBaUIsRUFBRSxDQUFDO1lBRWhELG9CQUFvQjtZQUNwQixpQkFBaUIsQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUFFLDhDQUE4QyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBRW5ILE9BQU8saUJBQWlCLENBQUM7UUFDN0IsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ksOEZBQXFDLEdBQTVDO1lBQ0ksT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQTNCYSw4REFBZSxHQUFHLGVBQWUsQ0FBQztRQTRCcEQscURBQUM7S0FBQSxBQTlCRCxJQThCQztJQTlCWSx3R0FBOEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBJQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24gfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvaW50ZXJmYWNlcy9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbkludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZhdWx0U2V0dGluZ3NQYWNrYWdlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudERlZmF1bHRTZXR0aW5nc1BhY2thZ2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbkNvbW1vbkxheW91dFByb3ZpZGVyIGltcGxlbWVudHMgSUNvbXBvbmVudERlZmF1bHREZWZpbml0aW9ue1xyXG4gICAgICAgIFxyXG4gICAgcHVibGljIHN0YXRpYyBJbWFnZVByb3ZpZGVySWQgPSBcIkltYWdlUHJvdmlkZXJcIjtcclxuICAgIHB1YmxpYyByZWFkb25seSBkZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NJZCA9IFwiY29tbW9uTGF5b3V0UHJvdmlkZXJEZWZpbml0aW9uXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGNvbXBvbmVudCBzZXR0aW5ncyBmb3IgdGhpcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50U2V0dGluZ3N9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb25Db21tb25MYXlvdXRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCkgOiBDb21wb25lbnRTZXR0aW5ncyB7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudFNldHRpbmdzID0gbmV3IENvbXBvbmVudFNldHRpbmdzKCk7XHJcblxyXG4gICAgICAgIC8vIGFkZCBzdWJjb21wb25lbnRzXHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkU3ViQ29tcG9uZW50KFwiSW1hZ2VQcm92aWRlclwiLCBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbkNvbW1vbkxheW91dFByb3ZpZGVyLkltYWdlUHJvdmlkZXJJZCk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb21wb25lbnRTZXR0aW5ncztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgc29tZSBkZWZhdWx0IHBlcnNpc3RpbmcgZGF0YSBwYWNrYWdlcyBpbiB0aGUgbWFpbiBkZWZhdWx0IHBlcnNpc3RpbmcgZGF0YSBwcm92aWRlclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsoQ29tcG9uZW50RGVmYXVsdFNldHRpbmdzUGFja2FnZVtdfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uQ29tbW9uTGF5b3V0UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEFkZGl0aW9uYWxEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKTogQ29tcG9uZW50RGVmYXVsdFNldHRpbmdzUGFja2FnZVtdfCB1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbn0iXX0=