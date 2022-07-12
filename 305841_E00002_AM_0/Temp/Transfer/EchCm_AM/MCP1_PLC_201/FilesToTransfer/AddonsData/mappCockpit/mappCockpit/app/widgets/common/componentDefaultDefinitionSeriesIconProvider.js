define(["require", "exports", "../../common/componentBase/componentSettings"], function (require, exports, componentSettings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ComponentDefaultDefinitionSeriesIconProvider = /** @class */ (function () {
        function ComponentDefaultDefinitionSeriesIconProvider() {
            this.defaultComponentSettingsId = "seriesIconProviderDefinition";
        }
        /**
         * Returns the default component settings for this provider
         *
         * @returns {ComponentSettings}
         * @memberof ComponentDefaultDefinitionSeriesIconProvider
         */
        ComponentDefaultDefinitionSeriesIconProvider.prototype.getDefaultComponentSettings = function () {
            var componentSettings = new componentSettings_1.ComponentSettings();
            // add subcomponents
            componentSettings.addSubComponent("ImageProvider", ComponentDefaultDefinitionSeriesIconProvider.ImageProviderId);
            return componentSettings;
        };
        /**
         * Adds some default persisting data packages in the main default persisting data provider
         *
         * @returns {(ComponentDefaultSettingsPackage[]| undefined)}
         * @memberof ComponentDefaultDefinitionSeriesIconProvider
         */
        ComponentDefaultDefinitionSeriesIconProvider.prototype.getAdditionalDefaultComponentSettings = function () {
            return undefined;
        };
        ComponentDefaultDefinitionSeriesIconProvider.ImageProviderId = "ImageProvider";
        return ComponentDefaultDefinitionSeriesIconProvider;
    }());
    exports.ComponentDefaultDefinitionSeriesIconProvider = ComponentDefaultDefinitionSeriesIconProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50RGVmYXVsdERlZmluaXRpb25TZXJpZXNJY29uUHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29tbW9uL2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uU2VyaWVzSWNvblByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUlBO1FBQUE7WUFHb0IsK0JBQTBCLEdBQUcsOEJBQThCLENBQUM7UUEwQmhGLENBQUM7UUF4Qkc7Ozs7O1dBS0c7UUFDSSxrRkFBMkIsR0FBbEM7WUFDSSxJQUFJLGlCQUFpQixHQUFHLElBQUkscUNBQWlCLEVBQUUsQ0FBQztZQUVoRCxvQkFBb0I7WUFDcEIsaUJBQWlCLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRSw0Q0FBNEMsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUVqSCxPQUFPLGlCQUFpQixDQUFDO1FBQzdCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNJLDRGQUFxQyxHQUE1QztZQUNJLE9BQU8sU0FBUyxDQUFDO1FBQ3BCLENBQUM7UUExQlksNERBQWUsR0FBRyxlQUFlLENBQUM7UUEyQnBELG1EQUFDO0tBQUEsQUE3QkQsSUE2QkM7SUE3Qlksb0dBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgSUNvbXBvbmVudERlZmF1bHREZWZpbml0aW9uIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2ludGVyZmFjZXMvY29tcG9uZW50RGVmYXVsdERlZmluaXRpb25JbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmYXVsdFNldHRpbmdzUGFja2FnZSB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnREZWZhdWx0U2V0dGluZ3NQYWNrYWdlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb25TZXJpZXNJY29uUHJvdmlkZXIgaW1wbGVtZW50cyBJQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb257XHJcbiAgICAgICAgXHJcbiAgICBwdWJsaWMgc3RhdGljIEltYWdlUHJvdmlkZXJJZCA9IFwiSW1hZ2VQcm92aWRlclwiO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGRlZmF1bHRDb21wb25lbnRTZXR0aW5nc0lkID0gXCJzZXJpZXNJY29uUHJvdmlkZXJEZWZpbml0aW9uXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGNvbXBvbmVudCBzZXR0aW5ncyBmb3IgdGhpcyBwcm92aWRlclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnRTZXR0aW5nc31cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvblNlcmllc0ljb25Qcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCkgOiBDb21wb25lbnRTZXR0aW5ncyB7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudFNldHRpbmdzID0gbmV3IENvbXBvbmVudFNldHRpbmdzKCk7XHJcblxyXG4gICAgICAgIC8vIGFkZCBzdWJjb21wb25lbnRzXHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkU3ViQ29tcG9uZW50KFwiSW1hZ2VQcm92aWRlclwiLCBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvblNlcmllc0ljb25Qcm92aWRlci5JbWFnZVByb3ZpZGVySWQpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29tcG9uZW50U2V0dGluZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIHNvbWUgZGVmYXVsdCBwZXJzaXN0aW5nIGRhdGEgcGFja2FnZXMgaW4gdGhlIG1haW4gZGVmYXVsdCBwZXJzaXN0aW5nIGRhdGEgcHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7KENvbXBvbmVudERlZmF1bHRTZXR0aW5nc1BhY2thZ2VbXXwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvblNlcmllc0ljb25Qcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0QWRkaXRpb25hbERlZmF1bHRDb21wb25lbnRTZXR0aW5ncygpOiBDb21wb25lbnREZWZhdWx0U2V0dGluZ3NQYWNrYWdlW118IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICB9XHJcbn0iXX0=