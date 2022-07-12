define(["require", "exports", "../../common/componentBase/componentSettings"], function (require, exports, componentSettings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ComponentDefaultDefinition = /** @class */ (function () {
        function ComponentDefaultDefinition() {
            this.defaultComponentSettingsId = "signalManagerDatamodelDefinition";
        }
        /**
         * Returns the default component settings for this datamodel
         *
         * @returns {ComponentSettings}
         * @memberof ComponentDefaultDefinition
         */
        ComponentDefaultDefinition.prototype.getDefaultComponentSettings = function () {
            var componentSettings = new componentSettings_1.ComponentSettings();
            componentSettings.addSubComponent("SeriesProvider", ComponentDefaultDefinition.SeriesProviderId);
            return componentSettings;
        };
        /**
         * Adds some default persisting data packages in the main default persisting data provider
         *
         * @returns {(ComponentDefaultSettingsPackage[]| undefined)}
         * @memberof ComponentDefaultDefinition
         */
        ComponentDefaultDefinition.prototype.getAdditionalDefaultComponentSettings = function () {
            return undefined;
        };
        ComponentDefaultDefinition.SeriesProviderId = "SeriesProvider";
        return ComponentDefaultDefinition;
    }());
    exports.ComponentDefaultDefinition = ComponentDefaultDefinition;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUlBO1FBQUE7WUFJb0IsK0JBQTBCLEdBQUcsa0NBQWtDLENBQUM7UUF1QnBGLENBQUM7UUFyQkc7Ozs7O1dBS0E7UUFDTyxnRUFBMkIsR0FBbEM7WUFDSSxJQUFJLGlCQUFpQixHQUFHLElBQUkscUNBQWlCLEVBQUUsQ0FBQztZQUNoRCxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLEVBQUUsMEJBQTBCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUNqRyxPQUFPLGlCQUFpQixDQUFDO1FBQzdCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNJLDBFQUFxQyxHQUE1QztZQUNJLE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUF4QmEsMkNBQWdCLEdBQUcsZ0JBQWdCLENBQUM7UUF5QnRELGlDQUFDO0tBQUEsQUEzQkQsSUEyQkM7SUEzQlksZ0VBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgSUNvbXBvbmVudERlZmF1bHREZWZpbml0aW9uIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2ludGVyZmFjZXMvY29tcG9uZW50RGVmYXVsdERlZmluaXRpb25JbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmYXVsdFNldHRpbmdzUGFja2FnZSB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnREZWZhdWx0U2V0dGluZ3NQYWNrYWdlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24gaW1wbGVtZW50cyBJQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb257XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBTZXJpZXNQcm92aWRlcklkID0gXCJTZXJpZXNQcm92aWRlclwiO1xyXG4gICAgXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgZGVmYXVsdENvbXBvbmVudFNldHRpbmdzSWQgPSBcInNpZ25hbE1hbmFnZXJEYXRhbW9kZWxEZWZpbml0aW9uXCI7XHJcblxyXG4gICAgLyoqXHJcblx0ICogUmV0dXJucyB0aGUgZGVmYXVsdCBjb21wb25lbnQgc2V0dGluZ3MgZm9yIHRoaXMgZGF0YW1vZGVsXHJcblx0ICpcclxuXHQgKiBAcmV0dXJucyB7Q29tcG9uZW50U2V0dGluZ3N9XHJcblx0ICogQG1lbWJlcm9mIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXHJcblx0ICovXHJcbiAgICBwdWJsaWMgZ2V0RGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCkgOiBDb21wb25lbnRTZXR0aW5ncyB7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudFNldHRpbmdzID0gbmV3IENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkU3ViQ29tcG9uZW50KFwiU2VyaWVzUHJvdmlkZXJcIiwgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uU2VyaWVzUHJvdmlkZXJJZCk7XHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudFNldHRpbmdzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBzb21lIGRlZmF1bHQgcGVyc2lzdGluZyBkYXRhIHBhY2thZ2VzIGluIHRoZSBtYWluIGRlZmF1bHQgcGVyc2lzdGluZyBkYXRhIHByb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyhDb21wb25lbnREZWZhdWx0U2V0dGluZ3NQYWNrYWdlW118IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEFkZGl0aW9uYWxEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKTogQ29tcG9uZW50RGVmYXVsdFNldHRpbmdzUGFja2FnZVtdfCB1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbn0gIl19