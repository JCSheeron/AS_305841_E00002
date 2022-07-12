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
define(["require", "exports", "../../common/componentBase/componentSettings", "../splitterWidget/splitterDefinition", "../common/splitterComponentSettings", "../common/componentDefaultDefinitionWidgetBase"], function (require, exports, componentSettings_1, splitterDefinition_1, splitterComponentSettings_1, componentDefaultDefinitionWidgetBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ComponentDefaultDefinition = /** @class */ (function (_super) {
        __extends(ComponentDefaultDefinition, _super);
        function ComponentDefaultDefinition() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.defaultComponentSettingsId = "dummyWidgetDefinition3";
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
            //componentSettings.addSubComponent("SplitterWidget", ComponentDefaultDefinition.mainWidgetId, ComponentDefaultDefinition.DummySplitterDefinitionId);
            return componentSettings;
        };
        /**
         * Returns the default persisting data for splitter
         *
         * @static
         * @returns {*}
         * @memberof ComponentDefaultDefinition
         */
        ComponentDefaultDefinition.prototype.getDummySplitterDefinition = function () {
            var splitterComponentSettings = new splitterComponentSettings_1.SplitterComponentSettings(splitterDefinition_1.SplitterDefinition.orientationVertical);
            splitterComponentSettings.addPane("ComponentOverviewWidget", "ComponentOverviewWidgetId", "", splitterComponentSettings_1.SplitterComponentSettings.getPaneSettings(-1));
            splitterComponentSettings.addPane("TraceOverviewWidget", "TraceOverviewWidgetId", "", splitterComponentSettings_1.SplitterComponentSettings.getPaneSettings(250));
            splitterComponentSettings.addPane("ToolsOverviewWidget", "ToolsOverviewWidgetId", "", splitterComponentSettings_1.SplitterComponentSettings.getPaneSettings(250));
            return splitterComponentSettings;
        };
        /**
         * Adds some default persisting data packages in the main default persisting data provider
         *
         * @private
         * @memberof ComponentDefaultDefinition
         */
        ComponentDefaultDefinition.prototype.getAdditionalDefaultComponentSettings = function () {
            var defaultSettingsPackages = new Array();
            //defaultSettingsPackages.push(new ComponentDefaultSettingsPackage(ComponentDefaultDefinition.DummySplitterDefinitionId, this.getDummySplitterDefinition()));
            return defaultSettingsPackages;
        };
        ComponentDefaultDefinition.mainWidgetId = "DummySplitterId3";
        ComponentDefaultDefinition.DummySplitterDefinitionId = "dummySplitterDefinition3";
        return ComponentDefaultDefinition;
    }(componentDefaultDefinitionWidgetBase_1.ComponentDefaultDefinitionWidgetBase));
    exports.ComponentDefaultDefinition = ComponentDefaultDefinition;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvZHVtbXlXaWRnZXQvY29tcG9uZW50RGVmYXVsdERlZmluaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQU1BO1FBQWdELDhDQUFvQztRQUFwRjtZQUFBLHFFQTRDQztZQXpDbUIsZ0NBQTBCLEdBQUcsd0JBQXdCLENBQUM7O1FBeUMxRSxDQUFDO1FBdENHOzs7OztXQUtBO1FBQ08sZ0VBQTJCLEdBQWxDO1lBQ0ksSUFBSSxpQkFBaUIsR0FBRyxJQUFJLHFDQUFpQixFQUFFLENBQUM7WUFDaEQscUpBQXFKO1lBQ3JKLE9BQU8saUJBQWlCLENBQUM7UUFDN0IsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLCtEQUEwQixHQUFsQztZQUNJLElBQUkseUJBQXlCLEdBQUcsSUFBSSxxREFBeUIsQ0FBQyx1Q0FBa0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ3RHLHlCQUF5QixDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsRUFBRSwyQkFBMkIsRUFBRSxFQUFFLEVBQUUscURBQXlCLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3SSx5QkFBeUIsQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsdUJBQXVCLEVBQUUsRUFBRSxFQUFFLHFEQUF5QixDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3RJLHlCQUF5QixDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSx1QkFBdUIsRUFBRSxFQUFFLEVBQUUscURBQXlCLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdEksT0FBTyx5QkFBeUIsQ0FBQztRQUNyQyxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCwwRUFBcUMsR0FBckM7WUFDSSxJQUFJLHVCQUF1QixHQUFHLElBQUksS0FBSyxFQUFtQyxDQUFDO1lBQzNFLDZKQUE2SjtZQUM3SixPQUFPLHVCQUF1QixDQUFDO1FBQ25DLENBQUM7UUF6Q2EsdUNBQVksR0FBRyxrQkFBa0IsQ0FBQztRQUVsQyxvREFBeUIsR0FBRywwQkFBMEIsQ0FBQztRQXdDekUsaUNBQUM7S0FBQSxBQTVDRCxDQUFnRCwyRUFBb0MsR0E0Q25GO0lBNUNZLGdFQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IFNwbGl0dGVyRGVmaW5pdGlvbiB9IGZyb20gXCIuLi9zcGxpdHRlcldpZGdldC9zcGxpdHRlckRlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgU3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi9jb21tb24vc3BsaXR0ZXJDb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbldpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uV2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZhdWx0U2V0dGluZ3NQYWNrYWdlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudERlZmF1bHRTZXR0aW5nc1BhY2thZ2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbiBleHRlbmRzIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uV2lkZ2V0QmFzZXtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIG1haW5XaWRnZXRJZCA9IFwiRHVtbXlTcGxpdHRlcklkM1wiO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGRlZmF1bHRDb21wb25lbnRTZXR0aW5nc0lkID0gXCJkdW1teVdpZGdldERlZmluaXRpb24zXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIER1bW15U3BsaXR0ZXJEZWZpbml0aW9uSWQgPSBcImR1bW15U3BsaXR0ZXJEZWZpbml0aW9uM1wiO1xyXG4gICAgXHJcbiAgICAvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGNvbXBvbmVudCBzZXR0aW5ncyBmb3IgdGhpcyB3aWRnZXRcclxuXHQgKlxyXG5cdCAqIEByZXR1cm5zIHtDb21wb25lbnRTZXR0aW5nc31cclxuXHQgKiBAbWVtYmVyb2YgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb25cclxuXHQgKi9cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKSA6IENvbXBvbmVudFNldHRpbmdzIHtcclxuICAgICAgICBsZXQgY29tcG9uZW50U2V0dGluZ3MgPSBuZXcgQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgICAgICAvL2NvbXBvbmVudFNldHRpbmdzLmFkZFN1YkNvbXBvbmVudChcIlNwbGl0dGVyV2lkZ2V0XCIsIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLm1haW5XaWRnZXRJZCwgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uRHVtbXlTcGxpdHRlckRlZmluaXRpb25JZCk7XHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudFNldHRpbmdzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBwZXJzaXN0aW5nIGRhdGEgZm9yIHNwbGl0dGVyXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb25cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXREdW1teVNwbGl0dGVyRGVmaW5pdGlvbigpIDogQ29tcG9uZW50U2V0dGluZ3Mge1xyXG4gICAgICAgIGxldCBzcGxpdHRlckNvbXBvbmVudFNldHRpbmdzID0gbmV3IFNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3MoU3BsaXR0ZXJEZWZpbml0aW9uLm9yaWVudGF0aW9uVmVydGljYWwpO1xyXG4gICAgICAgIHNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3MuYWRkUGFuZShcIkNvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0XCIsIFwiQ29tcG9uZW50T3ZlcnZpZXdXaWRnZXRJZFwiLCBcIlwiLCBTcGxpdHRlckNvbXBvbmVudFNldHRpbmdzLmdldFBhbmVTZXR0aW5ncygtMSkpO1xyXG4gICAgICAgIHNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3MuYWRkUGFuZShcIlRyYWNlT3ZlcnZpZXdXaWRnZXRcIiwgXCJUcmFjZU92ZXJ2aWV3V2lkZ2V0SWRcIiwgXCJcIiwgU3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncy5nZXRQYW5lU2V0dGluZ3MoMjUwKSk7XHJcbiAgICAgICAgc3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncy5hZGRQYW5lKFwiVG9vbHNPdmVydmlld1dpZGdldFwiLCBcIlRvb2xzT3ZlcnZpZXdXaWRnZXRJZFwiLCBcIlwiLCBTcGxpdHRlckNvbXBvbmVudFNldHRpbmdzLmdldFBhbmVTZXR0aW5ncygyNTApKTtcclxuICAgICAgICByZXR1cm4gc3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgc29tZSBkZWZhdWx0IHBlcnNpc3RpbmcgZGF0YSBwYWNrYWdlcyBpbiB0aGUgbWFpbiBkZWZhdWx0IHBlcnNpc3RpbmcgZGF0YSBwcm92aWRlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb25cclxuICAgICAqL1xyXG4gICAgZ2V0QWRkaXRpb25hbERlZmF1bHRDb21wb25lbnRTZXR0aW5ncygpe1xyXG4gICAgICAgIGxldCBkZWZhdWx0U2V0dGluZ3NQYWNrYWdlcyA9IG5ldyBBcnJheTxDb21wb25lbnREZWZhdWx0U2V0dGluZ3NQYWNrYWdlPigpO1xyXG4gICAgICAgIC8vZGVmYXVsdFNldHRpbmdzUGFja2FnZXMucHVzaChuZXcgQ29tcG9uZW50RGVmYXVsdFNldHRpbmdzUGFja2FnZShDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5EdW1teVNwbGl0dGVyRGVmaW5pdGlvbklkLCB0aGlzLmdldER1bW15U3BsaXR0ZXJEZWZpbml0aW9uKCkpKTtcclxuICAgICAgICByZXR1cm4gZGVmYXVsdFNldHRpbmdzUGFja2FnZXM7XHJcbiAgICB9XHJcbn0iXX0=