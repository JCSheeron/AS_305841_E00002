define(["require", "exports", "../../common/componentBase/componentSettings", "./languageCodes", "./settingIds"], function (require, exports, componentSettings_1, languageCodes_1, settingIds_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Sets the ComponentDefaultDefinition for the TextFormatter
     *
     * @export
     * @class ComponentDefaultDefinition
     * @implements {IComponentDefaultDefinition}
     */
    var ComponentDefaultDefinition = /** @class */ (function () {
        function ComponentDefaultDefinition() {
            this.defaultComponentSettingsId = "textProviderDefinition";
        }
        /**
         * Returns the default component settings for this component
         *
         * @returns {ComponentSettings}
         * @memberof ComponentDefaultDefinition
         */
        ComponentDefaultDefinition.prototype.getDefaultComponentSettings = function () {
            var componentSettings = new componentSettings_1.ComponentSettings();
            // per default, english should be set as the selected langauge
            componentSettings.setValue(settingIds_1.SettingIds.SelectedLanguage, languageCodes_1.LanguageCodes.english);
            // per default, english should be set as the fallback language
            componentSettings.setValue(settingIds_1.SettingIds.FallbackLanguage, languageCodes_1.LanguageCodes.english);
            return componentSettings;
        };
        /**
         * Adds some default persisting data packages in the main default persisting data provider
         *
         * @returns {(Array<ComponentDefaultSettingsPackage>|undefined)}
         * @memberof ComponentDefaultDefinition
         */
        ComponentDefaultDefinition.prototype.getAdditionalDefaultComponentSettings = function () {
            return undefined;
        };
        return ComponentDefaultDefinition;
    }());
    exports.ComponentDefaultDefinition = ComponentDefaultDefinition;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi90ZXh0UHJvdmlkZXIvY29tcG9uZW50RGVmYXVsdERlZmluaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBTUE7Ozs7OztPQU1HO0lBQ0g7UUFJSTtZQUZnQiwrQkFBMEIsR0FBRyx3QkFBd0IsQ0FBQztRQUVoRCxDQUFDO1FBRXZCOzs7OztXQUtHO1FBQ0ksZ0VBQTJCLEdBQWxDO1lBQ0ksSUFBSSxpQkFBaUIsR0FBRyxJQUFJLHFDQUFpQixFQUFFLENBQUM7WUFFaEQsOERBQThEO1lBQzlELGlCQUFpQixDQUFDLFFBQVEsQ0FBQyx1QkFBVSxDQUFDLGdCQUFnQixFQUFFLDZCQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFL0UsOERBQThEO1lBQzlELGlCQUFpQixDQUFDLFFBQVEsQ0FBQyx1QkFBVSxDQUFDLGdCQUFnQixFQUFDLDZCQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFOUUsT0FBTyxpQkFBaUIsQ0FBQztRQUM3QixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSSwwRUFBcUMsR0FBNUM7WUFDSSxPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBQ0wsaUNBQUM7SUFBRCxDQUFDLEFBakNELElBaUNDO0lBakNZLGdFQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IExhbmd1YWdlQ29kZXMgfSBmcm9tIFwiLi9sYW5ndWFnZUNvZGVzXCI7XHJcbmltcG9ydCB7IFNldHRpbmdJZHMgfSBmcm9tIFwiLi9zZXR0aW5nSWRzXCI7XHJcbmltcG9ydCB7IElDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbiB9IGZyb20gXCIuLi9jb21wb25lbnRCYXNlL2ludGVyZmFjZXMvY29tcG9uZW50RGVmYXVsdERlZmluaXRpb25JbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmYXVsdFNldHRpbmdzUGFja2FnZSB9IGZyb20gXCIuLi9jb21wb25lbnRCYXNlL2NvbXBvbmVudERlZmF1bHRTZXR0aW5nc1BhY2thZ2VcIjtcclxuXHJcbi8qKlxyXG4gKiBTZXRzIHRoZSBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbiBmb3IgdGhlIFRleHRGb3JtYXR0ZXJcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb25cclxuICogQGltcGxlbWVudHMge0lDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbn1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbiBpbXBsZW1lbnRzIElDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbntcclxuXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgZGVmYXVsdENvbXBvbmVudFNldHRpbmdzSWQgPSBcInRleHRQcm92aWRlckRlZmluaXRpb25cIjtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBjb21wb25lbnQgc2V0dGluZ3MgZm9yIHRoaXMgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudFNldHRpbmdzfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKSA6IENvbXBvbmVudFNldHRpbmdzIHtcclxuICAgICAgICBsZXQgY29tcG9uZW50U2V0dGluZ3MgPSBuZXcgQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBwZXIgZGVmYXVsdCwgZW5nbGlzaCBzaG91bGQgYmUgc2V0IGFzIHRoZSBzZWxlY3RlZCBsYW5nYXVnZVxyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLnNldFZhbHVlKFNldHRpbmdJZHMuU2VsZWN0ZWRMYW5ndWFnZSwgTGFuZ3VhZ2VDb2Rlcy5lbmdsaXNoKTtcclxuXHJcbiAgICAgICAgLy8gcGVyIGRlZmF1bHQsIGVuZ2xpc2ggc2hvdWxkIGJlIHNldCBhcyB0aGUgZmFsbGJhY2sgbGFuZ3VhZ2VcclxuICAgICAgICBjb21wb25lbnRTZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLkZhbGxiYWNrTGFuZ3VhZ2UsTGFuZ3VhZ2VDb2Rlcy5lbmdsaXNoKTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gY29tcG9uZW50U2V0dGluZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIHNvbWUgZGVmYXVsdCBwZXJzaXN0aW5nIGRhdGEgcGFja2FnZXMgaW4gdGhlIG1haW4gZGVmYXVsdCBwZXJzaXN0aW5nIGRhdGEgcHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7KEFycmF5PENvbXBvbmVudERlZmF1bHRTZXR0aW5nc1BhY2thZ2U+fHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEFkZGl0aW9uYWxEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKTogQXJyYXk8Q29tcG9uZW50RGVmYXVsdFNldHRpbmdzUGFja2FnZT58dW5kZWZpbmVke1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbn0iXX0=