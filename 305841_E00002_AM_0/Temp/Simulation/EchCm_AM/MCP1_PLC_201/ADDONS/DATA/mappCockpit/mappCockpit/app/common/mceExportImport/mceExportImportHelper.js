define(["require", "exports", "../../common/packageConversion/exportContainer", "../../common/packageConversion/mceConversionError", "../../framework/componentHub/componentDataHub", "../../widgets/common/states/cursorStates"], function (require, exports, exportContainer_1, mceConversionError_1, componentDataHub_1, cursorStates_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Handles the creation of *.mce file export data (mce => MappCockpitExport), and also the import of the export data into the components/settingsObjects
     *
     * @export
     * @class MceExportImportHelper
     */
    var MceExportImportHelper = /** @class */ (function () {
        function MceExportImportHelper() {
        }
        /**
         * Returns the export data for the given components
         *
         * @static
         * @param {Array<IComponent>} componentInstances
         * @param {Array<ISettingsObject>} settingsObjects
         * @returns {string}
         * @memberof MceExportImportHelper
         */
        MceExportImportHelper.getExportData = function (componentInstances, settingsObjects) {
            var container = new exportContainer_1.ExportContainer();
            try {
                // Add component data
                componentInstances.forEach(function (instance) {
                    var componentSettings = instance.getComponentSettings(false);
                    if (componentSettings !== undefined) {
                        container.addSettings(componentSettings, instance.component.type);
                    }
                });
                // TODO: Add settings objects data for CursorStates support
                settingsObjects.forEach(function (settingsObject) {
                    var settings = settingsObject.getSettings();
                    if (settings !== undefined) {
                        container.addSettings(settings, "CursorStates"); // CursorState type needed, or type of settings object
                    }
                });
                var stringData = container.toJson();
                return stringData;
            }
            catch (e) {
                if (mceConversionError_1.MceConversionError.isMceConversionError(e)) {
                    console.error(e.toString());
                }
                else {
                    console.error(e);
                }
            }
            return "";
        };
        /**
         * Clears all the components in the given order (needed before importing new data)
         *
         * @static
         * @param {Array<IComponent>} componentInstances
         * @memberof MceExportImportHelper
         */
        MceExportImportHelper.clearComponents = function (componentInstances) {
            componentInstances.forEach(function (componentInstances) {
                componentInstances.clear();
            });
        };
        /**
         * Sets the given data from a exportContainer to the given components
         *
         * @static
         * @param {Array<IComponent>} componentInstances
         * @param {Array<ISettingsObject>} settingsObjects
         * @param {ExportContainer} exportContainer
         * @memberof MceExportImportHelper
         */
        MceExportImportHelper.setImportData = function (componentInstances, settingsObjects, exportContainer) {
            // set all settings to the components
            componentInstances.forEach(function (componentInstances) {
                var componentSettings = exportContainer.getSettingsByKey(componentInstances.component.type);
                if (componentSettings != undefined) {
                    componentInstances.setComponentSettings(componentSettings);
                }
            });
            // TODO: Use settingsobjects data for more dynamic support
            //sets imported cursorstates settings 
            var cursorStatesSettings = exportContainer.getSettingsByKey("CursorStates");
            if (cursorStatesSettings !== null) {
                var cursorStatesScope = "app::trace view chart states";
                var cursorStatesID = "cursor states";
                var cursorStates = new cursorStates_1.CursorStates();
                cursorStates.setSettings(cursorStatesSettings);
                componentDataHub_1.ComponentDataHub.updateShared(this, cursorStates, cursorStatesScope, cursorStatesID, cursorStates_1.CursorStates);
            }
        };
        return MceExportImportHelper;
    }());
    exports.MceExportImportHelper = MceExportImportHelper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWNlRXhwb3J0SW1wb3J0SGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vbWNlRXhwb3J0SW1wb3J0L21jZUV4cG9ydEltcG9ydEhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFRQTs7Ozs7T0FLRztJQUNIO1FBQUE7UUFxRkEsQ0FBQztRQW5GRzs7Ozs7Ozs7V0FRRztRQUNJLG1DQUFhLEdBQXBCLFVBQXFCLGtCQUFxQyxFQUFFLGVBQXVDO1lBQy9GLElBQUksU0FBUyxHQUFHLElBQUksaUNBQWUsRUFBRSxDQUFDO1lBQ3RDLElBQUc7Z0JBQ0MscUJBQXFCO2dCQUNyQixrQkFBa0IsQ0FBQyxPQUFPLENBQUMsVUFBQSxRQUFRO29CQUMvQixJQUFJLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDN0QsSUFBRyxpQkFBaUIsS0FBSyxTQUFTLEVBQUM7d0JBQy9CLFNBQVMsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDcEU7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsMkRBQTJEO2dCQUMzRCxlQUFlLENBQUMsT0FBTyxDQUFDLFVBQUEsY0FBYztvQkFDbEMsSUFBSSxRQUFRLEdBQUcsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUM1QyxJQUFHLFFBQVEsS0FBSyxTQUFTLEVBQUM7d0JBQ3RCLFNBQVMsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUMsc0RBQXNEO3FCQUMxRztnQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFDSCxJQUFJLFVBQVUsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ3BDLE9BQU8sVUFBVSxDQUFDO2FBQ3JCO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1IsSUFBRyx1Q0FBa0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDM0MsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtpQkFDOUI7cUJBQU07b0JBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDcEI7YUFDSjtZQUNELE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLHFDQUFlLEdBQXRCLFVBQXVCLGtCQUFxQztZQUN4RCxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsVUFBQSxrQkFBa0I7Z0JBQ2xDLGtCQUFtQixDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3ZDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0ksbUNBQWEsR0FBcEIsVUFBcUIsa0JBQXFDLEVBQUUsZUFBdUMsRUFBRSxlQUFnQztZQUVqSSxxQ0FBcUM7WUFDckMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLFVBQUEsa0JBQWtCO2dCQUN6QyxJQUFJLGlCQUFpQixHQUFHLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFzQixDQUFDO2dCQUNqSCxJQUFHLGlCQUFpQixJQUFJLFNBQVMsRUFBQztvQkFDOUIsa0JBQWtCLENBQUMsb0JBQW9CLENBQUMsaUJBQWlCLENBQUMsQ0FBQztpQkFDOUQ7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILDBEQUEwRDtZQUMxRCxzQ0FBc0M7WUFDdEMsSUFBSSxvQkFBb0IsR0FBRyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDNUUsSUFBRyxvQkFBb0IsS0FBSyxJQUFJLEVBQUU7Z0JBQzlCLElBQUksaUJBQWlCLEdBQUcsOEJBQThCLENBQUM7Z0JBQ3ZELElBQUksY0FBYyxHQUFHLGVBQWUsQ0FBQztnQkFFckMsSUFBSSxZQUFZLEdBQUcsSUFBSSwyQkFBWSxFQUFFLENBQUM7Z0JBQ3RDLFlBQVksQ0FBQyxXQUFXLENBQUMsb0JBQW9CLENBQUMsQ0FBQztnQkFDL0MsbUNBQWdCLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLDJCQUFZLENBQUMsQ0FBQzthQUN0RztRQUNMLENBQUM7UUFDTCw0QkFBQztJQUFELENBQUMsQUFyRkQsSUFxRkM7SUFyRlksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXhwb3J0Q29udGFpbmVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9leHBvcnRDb250YWluZXJcIjtcclxuaW1wb3J0IHsgTWNlQ29udmVyc2lvbkVycm9yIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9tY2VDb252ZXJzaW9uRXJyb3JcIjtcclxuaW1wb3J0IHsgSUNvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9pbnRlcmZhY2VzL2NvbXBvbmVudEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJU2V0dGluZ3NPYmplY3QgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL2ludGVyZmFjZXMvc2V0dGluZ3NPYmplY3RJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGF0YUh1YiB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvY29tcG9uZW50SHViL2NvbXBvbmVudERhdGFIdWJcIjtcclxuaW1wb3J0IHsgQ3Vyc29yU3RhdGVzIH0gZnJvbSBcIi4uLy4uL3dpZGdldHMvY29tbW9uL3N0YXRlcy9jdXJzb3JTdGF0ZXNcIjtcclxuXHJcbi8qKlxyXG4gKiBIYW5kbGVzIHRoZSBjcmVhdGlvbiBvZiAqLm1jZSBmaWxlIGV4cG9ydCBkYXRhIChtY2UgPT4gTWFwcENvY2twaXRFeHBvcnQpLCBhbmQgYWxzbyB0aGUgaW1wb3J0IG9mIHRoZSBleHBvcnQgZGF0YSBpbnRvIHRoZSBjb21wb25lbnRzL3NldHRpbmdzT2JqZWN0c1xyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBNY2VFeHBvcnRJbXBvcnRIZWxwZXJcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNY2VFeHBvcnRJbXBvcnRIZWxwZXJ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBleHBvcnQgZGF0YSBmb3IgdGhlIGdpdmVuIGNvbXBvbmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElDb21wb25lbnQ+fSBjb21wb25lbnRJbnN0YW5jZXNcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVNldHRpbmdzT2JqZWN0Pn0gc2V0dGluZ3NPYmplY3RzXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIE1jZUV4cG9ydEltcG9ydEhlbHBlclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0RXhwb3J0RGF0YShjb21wb25lbnRJbnN0YW5jZXM6IEFycmF5PElDb21wb25lbnQ+LCBzZXR0aW5nc09iamVjdHM6IEFycmF5PElTZXR0aW5nc09iamVjdD4pOiBzdHJpbmd7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IG5ldyBFeHBvcnRDb250YWluZXIoKTtcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIC8vIEFkZCBjb21wb25lbnQgZGF0YVxyXG4gICAgICAgICAgICBjb21wb25lbnRJbnN0YW5jZXMuZm9yRWFjaChpbnN0YW5jZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29tcG9uZW50U2V0dGluZ3MgPSBpbnN0YW5jZS5nZXRDb21wb25lbnRTZXR0aW5ncyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBpZihjb21wb25lbnRTZXR0aW5ncyAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuYWRkU2V0dGluZ3MoY29tcG9uZW50U2V0dGluZ3MsaW5zdGFuY2UuY29tcG9uZW50LnR5cGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFRPRE86IEFkZCBzZXR0aW5ncyBvYmplY3RzIGRhdGEgZm9yIEN1cnNvclN0YXRlcyBzdXBwb3J0XHJcbiAgICAgICAgICAgIHNldHRpbmdzT2JqZWN0cy5mb3JFYWNoKHNldHRpbmdzT2JqZWN0ID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBzZXR0aW5ncyA9IHNldHRpbmdzT2JqZWN0LmdldFNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICBpZihzZXR0aW5ncyAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuYWRkU2V0dGluZ3Moc2V0dGluZ3MsIFwiQ3Vyc29yU3RhdGVzXCIpOyAvLyBDdXJzb3JTdGF0ZSB0eXBlIG5lZWRlZCwgb3IgdHlwZSBvZiBzZXR0aW5ncyBvYmplY3RcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGxldCBzdHJpbmdEYXRhID0gY29udGFpbmVyLnRvSnNvbigpO1xyXG4gICAgICAgICAgICByZXR1cm4gc3RyaW5nRGF0YTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGlmKE1jZUNvbnZlcnNpb25FcnJvci5pc01jZUNvbnZlcnNpb25FcnJvcihlKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlLnRvU3RyaW5nKCkpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsZWFycyBhbGwgdGhlIGNvbXBvbmVudHMgaW4gdGhlIGdpdmVuIG9yZGVyIChuZWVkZWQgYmVmb3JlIGltcG9ydGluZyBuZXcgZGF0YSlcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElDb21wb25lbnQ+fSBjb21wb25lbnRJbnN0YW5jZXNcclxuICAgICAqIEBtZW1iZXJvZiBNY2VFeHBvcnRJbXBvcnRIZWxwZXJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNsZWFyQ29tcG9uZW50cyhjb21wb25lbnRJbnN0YW5jZXM6IEFycmF5PElDb21wb25lbnQ+KXtcclxuICAgICAgICBjb21wb25lbnRJbnN0YW5jZXMuZm9yRWFjaChjb21wb25lbnRJbnN0YW5jZXMgPT4ge1xyXG4gICAgICAgICAgICAgKDxhbnk+Y29tcG9uZW50SW5zdGFuY2VzKS5jbGVhcigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgZ2l2ZW4gZGF0YSBmcm9tIGEgZXhwb3J0Q29udGFpbmVyIHRvIHRoZSBnaXZlbiBjb21wb25lbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtBcnJheTxJQ29tcG9uZW50Pn0gY29tcG9uZW50SW5zdGFuY2VzXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElTZXR0aW5nc09iamVjdD59IHNldHRpbmdzT2JqZWN0c1xyXG4gICAgICogQHBhcmFtIHtFeHBvcnRDb250YWluZXJ9IGV4cG9ydENvbnRhaW5lclxyXG4gICAgICogQG1lbWJlcm9mIE1jZUV4cG9ydEltcG9ydEhlbHBlclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgc2V0SW1wb3J0RGF0YShjb21wb25lbnRJbnN0YW5jZXM6IEFycmF5PElDb21wb25lbnQ+LCBzZXR0aW5nc09iamVjdHM6IEFycmF5PElTZXR0aW5nc09iamVjdD4sIGV4cG9ydENvbnRhaW5lcjogRXhwb3J0Q29udGFpbmVyKXtcclxuICAgICAgIFxyXG4gICAgICAgIC8vIHNldCBhbGwgc2V0dGluZ3MgdG8gdGhlIGNvbXBvbmVudHNcclxuICAgICAgICBjb21wb25lbnRJbnN0YW5jZXMuZm9yRWFjaChjb21wb25lbnRJbnN0YW5jZXMgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY29tcG9uZW50U2V0dGluZ3MgPSBleHBvcnRDb250YWluZXIuZ2V0U2V0dGluZ3NCeUtleShjb21wb25lbnRJbnN0YW5jZXMuY29tcG9uZW50LnR5cGUpIGFzIENvbXBvbmVudFNldHRpbmdzO1xyXG4gICAgICAgICAgICBpZihjb21wb25lbnRTZXR0aW5ncyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50SW5zdGFuY2VzLnNldENvbXBvbmVudFNldHRpbmdzKGNvbXBvbmVudFNldHRpbmdzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFRPRE86IFVzZSBzZXR0aW5nc29iamVjdHMgZGF0YSBmb3IgbW9yZSBkeW5hbWljIHN1cHBvcnRcclxuICAgICAgICAvL3NldHMgaW1wb3J0ZWQgY3Vyc29yc3RhdGVzIHNldHRpbmdzIFxyXG4gICAgICAgIGxldCBjdXJzb3JTdGF0ZXNTZXR0aW5ncyA9IGV4cG9ydENvbnRhaW5lci5nZXRTZXR0aW5nc0J5S2V5KFwiQ3Vyc29yU3RhdGVzXCIpO1xyXG4gICAgICAgIGlmKGN1cnNvclN0YXRlc1NldHRpbmdzICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxldCBjdXJzb3JTdGF0ZXNTY29wZSA9IFwiYXBwOjp0cmFjZSB2aWV3IGNoYXJ0IHN0YXRlc1wiO1xyXG4gICAgICAgICAgICBsZXQgY3Vyc29yU3RhdGVzSUQgPSBcImN1cnNvciBzdGF0ZXNcIjtcclxuXHJcbiAgICAgICAgICAgIGxldCBjdXJzb3JTdGF0ZXMgPSBuZXcgQ3Vyc29yU3RhdGVzKCk7XHJcbiAgICAgICAgICAgIGN1cnNvclN0YXRlcy5zZXRTZXR0aW5ncyhjdXJzb3JTdGF0ZXNTZXR0aW5ncyk7XHJcbiAgICAgICAgICAgIENvbXBvbmVudERhdGFIdWIudXBkYXRlU2hhcmVkKHRoaXMsIGN1cnNvclN0YXRlcywgY3Vyc29yU3RhdGVzU2NvcGUsIGN1cnNvclN0YXRlc0lELCBDdXJzb3JTdGF0ZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==