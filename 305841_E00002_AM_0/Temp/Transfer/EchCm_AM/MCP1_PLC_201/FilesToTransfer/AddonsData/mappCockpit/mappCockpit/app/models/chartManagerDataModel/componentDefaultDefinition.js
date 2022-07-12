define(["require", "exports", "../../common/componentBase/componentSettings"], function (require, exports, componentSettings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ComponentDefaultDefinition = /** @class */ (function () {
        function ComponentDefaultDefinition() {
            this.defaultComponentSettingsId = "chartManagerDatamodelDefinition";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvY29tcG9uZW50RGVmYXVsdERlZmluaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBSUE7UUFBQTtZQUlvQiwrQkFBMEIsR0FBRyxpQ0FBaUMsQ0FBQztRQXVCbkYsQ0FBQztRQXJCRzs7Ozs7V0FLQTtRQUNPLGdFQUEyQixHQUFsQztZQUNJLElBQUksaUJBQWlCLEdBQUcsSUFBSSxxQ0FBaUIsRUFBRSxDQUFDO1lBQ2hELGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsRUFBRSwwQkFBMEIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ2pHLE9BQU8saUJBQWlCLENBQUM7UUFDN0IsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ksMEVBQXFDLEdBQTVDO1lBQ0ksT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQXhCYSwyQ0FBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztRQXlCdEQsaUNBQUM7S0FBQSxBQTNCRCxJQTJCQztJQTNCWSxnRUFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBJQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24gfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvaW50ZXJmYWNlcy9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbkludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZhdWx0U2V0dGluZ3NQYWNrYWdlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudERlZmF1bHRTZXR0aW5nc1BhY2thZ2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbiBpbXBsZW1lbnRzIElDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbntcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIFNlcmllc1Byb3ZpZGVySWQgPSBcIlNlcmllc1Byb3ZpZGVyXCI7XHJcbiAgICAgXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgZGVmYXVsdENvbXBvbmVudFNldHRpbmdzSWQgPSBcImNoYXJ0TWFuYWdlckRhdGFtb2RlbERlZmluaXRpb25cIjtcclxuXHJcbiAgICAvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGNvbXBvbmVudCBzZXR0aW5ncyBmb3IgdGhpcyBkYXRhbW9kZWxcclxuXHQgKlxyXG5cdCAqIEByZXR1cm5zIHtDb21wb25lbnRTZXR0aW5nc31cclxuXHQgKiBAbWVtYmVyb2YgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb25cclxuXHQgKi9cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKSA6IENvbXBvbmVudFNldHRpbmdzIHtcclxuICAgICAgICBsZXQgY29tcG9uZW50U2V0dGluZ3MgPSBuZXcgQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgICAgICBjb21wb25lbnRTZXR0aW5ncy5hZGRTdWJDb21wb25lbnQoXCJTZXJpZXNQcm92aWRlclwiLCBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5TZXJpZXNQcm92aWRlcklkKTtcclxuICAgICAgICByZXR1cm4gY29tcG9uZW50U2V0dGluZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIHNvbWUgZGVmYXVsdCBwZXJzaXN0aW5nIGRhdGEgcGFja2FnZXMgaW4gdGhlIG1haW4gZGVmYXVsdCBwZXJzaXN0aW5nIGRhdGEgcHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7KENvbXBvbmVudERlZmF1bHRTZXR0aW5nc1BhY2thZ2VbXXwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0QWRkaXRpb25hbERlZmF1bHRDb21wb25lbnRTZXR0aW5ncygpOiBDb21wb25lbnREZWZhdWx0U2V0dGluZ3NQYWNrYWdlW118IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxufSAiXX0=