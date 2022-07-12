define(["require", "exports", "../reflection/metaClassProperties", "../reflection/metaClassReflectionInfo", "../../common/persistence/persistDataProvider"], function (require, exports, metaClassProperties_1, metaClassReflectionInfo_1, persistDataProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The class provides saving and loading instance persistence data.
     *
     * @export
     * @class ComponentPersistencyProvider
     */
    var ComponentPersistencyProvider = /** @class */ (function () {
        function ComponentPersistencyProvider() {
        }
        /**
         * Saves objects persistence data
         *
         * @static
         * @param {IPersistencyObject} persistableInstance
         * @memberof ComponentPersistencyProvider
         */
        ComponentPersistencyProvider.savePersistenceData = function (persistableInstance) {
            // Check if persistableInstance is persistable
            if (!this.isPersistencyObject(persistableInstance)) {
                this.showNoPersistencyObjectError(persistableInstance);
                return;
            }
            // Save persistence data for the given persistableInstance if id for persisting is set 
            if (persistableInstance.id != "") {
                persistDataProvider_1.PersistDataProvider.getInstance().setDataWithId(persistableInstance.id, persistableInstance.getSettings());
            }
            else {
                console.error("No id for persisting data available!");
                console.error(this);
            }
        };
        /**
        * Saves objects persistence data
        *
        * @static
        * @param {IPersistencyObject} persistableInstance
        * @memberof ComponentPersistencyProvider
        */
        ComponentPersistencyProvider.loadPersistenceData = function (persistableInstance) {
            // Check if persistableInstance is persistable
            if (!this.isPersistencyObject(persistableInstance)) {
                this.showNoPersistencyObjectError(persistableInstance);
                return;
            }
            // Load persistence data for the given persistableInstance
            var settingsData = persistDataProvider_1.PersistDataProvider.getInstance().getDataWithId(persistableInstance.id);
            if (settingsData != undefined) {
                persistableInstance.setSettings(settingsData);
            }
        };
        /**
         * Check if the object is a IPersistencyObject
         *
         * @private
         * @static
         * @param {*} object
         * @returns {boolean}
         * @memberof ComponentPersistencyProvider
         */
        ComponentPersistencyProvider.isPersistencyObject = function (object) {
            // getSetting and setSettings (from ISettingsObject interface) and also id (from IPersistencyObject interface) must be defined
            if (object.id != undefined && object.getSettings != undefined && object.setSettings != undefined) {
                return true;
            }
            return false;
        };
        /**
         * Shows a "no persistency object" error for the given object
         *
         * @private
         * @static
         * @param {*} object
         * @memberof ComponentPersistencyProvider
         */
        ComponentPersistencyProvider.showNoPersistencyObjectError = function (object) {
            console.error("The following object has no IPersistencyObject implementation!");
            console.error(object);
        };
        /**
         * Determines if the instance supports persistency
         *
         * @public
         * @static
         * @param {*} modifiedInstance
         * @returns {boolean}
         * @memberof ComponentPersistencyProvider
         */
        ComponentPersistencyProvider.instanceSupportsPersistency = function (modifiedInstance) {
            var instanceType = modifiedInstance.constructor;
            var isPersistable = metaClassReflectionInfo_1.MetaClassReflectionInfo.classHasMetaProperty(instanceType, metaClassProperties_1.MetaClassProperty.persistable) ? metaClassReflectionInfo_1.MetaClassReflectionInfo.getClassMetaPropertyValue(instanceType, metaClassProperties_1.MetaClassProperty.persistable) : false;
            return isPersistable;
        };
        return ComponentPersistencyProvider;
    }());
    exports.ComponentPersistencyProvider = ComponentPersistencyProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50UGVyc2lzdGVuY2VQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvZnJhbWV3b3JrL2NvbXBvbmVudEh1Yi9jb21wb25lbnRQZXJzaXN0ZW5jZVByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQU1BOzs7OztPQUtHO0lBQ0g7UUFBQTtRQTJGQSxDQUFDO1FBekZHOzs7Ozs7V0FNRztRQUNXLGdEQUFtQixHQUFqQyxVQUFrQyxtQkFBdUM7WUFDckUsOENBQThDO1lBQzlDLElBQUcsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsbUJBQW1CLENBQUMsRUFBQztnQkFDOUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLG1CQUFtQixDQUFDLENBQUM7Z0JBQ3ZELE9BQU87YUFDVjtZQUVELHVGQUF1RjtZQUN2RixJQUFJLG1CQUFtQixDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUU7Z0JBQzlCLHlDQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLEVBQUUsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQzthQUM5RztpQkFDSTtnQkFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7Z0JBQ3RELE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDdkI7UUFDTCxDQUFDO1FBRUQ7Ozs7OztVQU1FO1FBQ1ksZ0RBQW1CLEdBQWpDLFVBQWtDLG1CQUF1QztZQUNyRSw4Q0FBOEM7WUFDOUMsSUFBRyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFDO2dCQUM5QyxJQUFJLENBQUMsNEJBQTRCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztnQkFDdkQsT0FBTzthQUNWO1lBRUQsMERBQTBEO1lBQzFELElBQUksWUFBWSxHQUFHLHlDQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMzRixJQUFJLFlBQVksSUFBSSxTQUFTLEVBQUU7Z0JBQzNCLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNqRDtRQUNMLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNZLGdEQUFtQixHQUFsQyxVQUFtQyxNQUFXO1lBQzFDLDhIQUE4SDtZQUM5SCxJQUFHLE1BQU0sQ0FBQyxFQUFFLElBQUksU0FBUyxJQUFJLE1BQU0sQ0FBQyxXQUFXLElBQUksU0FBUyxJQUFJLE1BQU0sQ0FBQyxXQUFXLElBQUksU0FBUyxFQUFDO2dCQUM1RixPQUFPLElBQUksQ0FBQzthQUNmO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDWSx5REFBNEIsR0FBM0MsVUFBNEMsTUFBVztZQUNuRCxPQUFPLENBQUMsS0FBSyxDQUFDLGdFQUFnRSxDQUFDLENBQUM7WUFDaEYsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQixDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDVyx3REFBMkIsR0FBekMsVUFBMEMsZ0JBQXFCO1lBQzNELElBQU0sWUFBWSxHQUFHLGdCQUFnQixDQUFDLFdBQVcsQ0FBQztZQUNsRCxJQUFNLGFBQWEsR0FBRyxpREFBdUIsQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZLEVBQUUsdUNBQWlCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLGlEQUF1QixDQUFDLHlCQUF5QixDQUFDLFlBQVksRUFBRSx1Q0FBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ3pOLE9BQU8sYUFBYSxDQUFDO1FBQ3pCLENBQUM7UUFDTCxtQ0FBQztJQUFELENBQUMsQUEzRkQsSUEyRkM7SUEzRlksb0VBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWV0YUNsYXNzUHJvcGVydHkgfSBmcm9tIFwiLi4vcmVmbGVjdGlvbi9tZXRhQ2xhc3NQcm9wZXJ0aWVzXCI7XHJcbmltcG9ydCB7IE1ldGFDbGFzc1JlZmxlY3Rpb25JbmZvIH0gZnJvbSBcIi4uL3JlZmxlY3Rpb24vbWV0YUNsYXNzUmVmbGVjdGlvbkluZm9cIjtcclxuaW1wb3J0IHsgUGVyc2lzdERhdGFQcm92aWRlciB9IGZyb20gXCIuLi8uLi9jb21tb24vcGVyc2lzdGVuY2UvcGVyc2lzdERhdGFQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBJUGVyc2lzdGVuY3lPYmplY3QgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL2ludGVyZmFjZXMvcGVyc2lzdGVuY3lPYmplY3RJbnRlcmZhY2VcIjtcclxuXHJcblxyXG4vKipcclxuICogVGhlIGNsYXNzIHByb3ZpZGVzIHNhdmluZyBhbmQgbG9hZGluZyBpbnN0YW5jZSBwZXJzaXN0ZW5jZSBkYXRhLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBDb21wb25lbnRQZXJzaXN0ZW5jeVByb3ZpZGVyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50UGVyc2lzdGVuY3lQcm92aWRlciB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTYXZlcyBvYmplY3RzIHBlcnNpc3RlbmNlIGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0lQZXJzaXN0ZW5jeU9iamVjdH0gcGVyc2lzdGFibGVJbnN0YW5jZVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudFBlcnNpc3RlbmN5UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzYXZlUGVyc2lzdGVuY2VEYXRhKHBlcnNpc3RhYmxlSW5zdGFuY2U6IElQZXJzaXN0ZW5jeU9iamVjdCkge1xyXG4gICAgICAgIC8vIENoZWNrIGlmIHBlcnNpc3RhYmxlSW5zdGFuY2UgaXMgcGVyc2lzdGFibGVcclxuICAgICAgICBpZighdGhpcy5pc1BlcnNpc3RlbmN5T2JqZWN0KHBlcnNpc3RhYmxlSW5zdGFuY2UpKXtcclxuICAgICAgICAgICAgdGhpcy5zaG93Tm9QZXJzaXN0ZW5jeU9iamVjdEVycm9yKHBlcnNpc3RhYmxlSW5zdGFuY2UpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTYXZlIHBlcnNpc3RlbmNlIGRhdGEgZm9yIHRoZSBnaXZlbiBwZXJzaXN0YWJsZUluc3RhbmNlIGlmIGlkIGZvciBwZXJzaXN0aW5nIGlzIHNldCBcclxuICAgICAgICBpZiAocGVyc2lzdGFibGVJbnN0YW5jZS5pZCAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgIFBlcnNpc3REYXRhUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5zZXREYXRhV2l0aElkKHBlcnNpc3RhYmxlSW5zdGFuY2UuaWQsIHBlcnNpc3RhYmxlSW5zdGFuY2UuZ2V0U2V0dGluZ3MoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTm8gaWQgZm9yIHBlcnNpc3RpbmcgZGF0YSBhdmFpbGFibGUhXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogU2F2ZXMgb2JqZWN0cyBwZXJzaXN0ZW5jZSBkYXRhXHJcbiAgICAqXHJcbiAgICAqIEBzdGF0aWNcclxuICAgICogQHBhcmFtIHtJUGVyc2lzdGVuY3lPYmplY3R9IHBlcnNpc3RhYmxlSW5zdGFuY2VcclxuICAgICogQG1lbWJlcm9mIENvbXBvbmVudFBlcnNpc3RlbmN5UHJvdmlkZXJcclxuICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGxvYWRQZXJzaXN0ZW5jZURhdGEocGVyc2lzdGFibGVJbnN0YW5jZTogSVBlcnNpc3RlbmN5T2JqZWN0KSB7XHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgcGVyc2lzdGFibGVJbnN0YW5jZSBpcyBwZXJzaXN0YWJsZVxyXG4gICAgICAgIGlmKCF0aGlzLmlzUGVyc2lzdGVuY3lPYmplY3QocGVyc2lzdGFibGVJbnN0YW5jZSkpe1xyXG4gICAgICAgICAgICB0aGlzLnNob3dOb1BlcnNpc3RlbmN5T2JqZWN0RXJyb3IocGVyc2lzdGFibGVJbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gTG9hZCBwZXJzaXN0ZW5jZSBkYXRhIGZvciB0aGUgZ2l2ZW4gcGVyc2lzdGFibGVJbnN0YW5jZVxyXG4gICAgICAgIGxldCBzZXR0aW5nc0RhdGEgPSBQZXJzaXN0RGF0YVByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0RGF0YVdpdGhJZChwZXJzaXN0YWJsZUluc3RhbmNlLmlkKTtcclxuICAgICAgICBpZiAoc2V0dGluZ3NEYXRhICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBwZXJzaXN0YWJsZUluc3RhbmNlLnNldFNldHRpbmdzKHNldHRpbmdzRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgaWYgdGhlIG9iamVjdCBpcyBhIElQZXJzaXN0ZW5jeU9iamVjdFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0geyp9IG9iamVjdFxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50UGVyc2lzdGVuY3lQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpc1BlcnNpc3RlbmN5T2JqZWN0KG9iamVjdDogYW55KTogYm9vbGVhbntcclxuICAgICAgICAvLyBnZXRTZXR0aW5nIGFuZCBzZXRTZXR0aW5ncyAoZnJvbSBJU2V0dGluZ3NPYmplY3QgaW50ZXJmYWNlKSBhbmQgYWxzbyBpZCAoZnJvbSBJUGVyc2lzdGVuY3lPYmplY3QgaW50ZXJmYWNlKSBtdXN0IGJlIGRlZmluZWRcclxuICAgICAgICBpZihvYmplY3QuaWQgIT0gdW5kZWZpbmVkICYmIG9iamVjdC5nZXRTZXR0aW5ncyAhPSB1bmRlZmluZWQgJiYgb2JqZWN0LnNldFNldHRpbmdzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTaG93cyBhIFwibm8gcGVyc2lzdGVuY3kgb2JqZWN0XCIgZXJyb3IgZm9yIHRoZSBnaXZlbiBvYmplY3RcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHsqfSBvYmplY3RcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRQZXJzaXN0ZW5jeVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHNob3dOb1BlcnNpc3RlbmN5T2JqZWN0RXJyb3Iob2JqZWN0OiBhbnkpe1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJUaGUgZm9sbG93aW5nIG9iamVjdCBoYXMgbm8gSVBlcnNpc3RlbmN5T2JqZWN0IGltcGxlbWVudGF0aW9uIVwiKTtcclxuICAgICAgICBjb25zb2xlLmVycm9yKG9iamVjdCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBpbnN0YW5jZSBzdXBwb3J0cyBwZXJzaXN0ZW5jeVxyXG4gICAgICpcclxuICAgICAqIEBwdWJsaWNcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7Kn0gbW9kaWZpZWRJbnN0YW5jZVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50UGVyc2lzdGVuY3lQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGluc3RhbmNlU3VwcG9ydHNQZXJzaXN0ZW5jeShtb2RpZmllZEluc3RhbmNlOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCBpbnN0YW5jZVR5cGUgPSBtb2RpZmllZEluc3RhbmNlLmNvbnN0cnVjdG9yO1xyXG4gICAgICAgIGNvbnN0IGlzUGVyc2lzdGFibGUgPSBNZXRhQ2xhc3NSZWZsZWN0aW9uSW5mby5jbGFzc0hhc01ldGFQcm9wZXJ0eShpbnN0YW5jZVR5cGUsIE1ldGFDbGFzc1Byb3BlcnR5LnBlcnNpc3RhYmxlKSA/IE1ldGFDbGFzc1JlZmxlY3Rpb25JbmZvLmdldENsYXNzTWV0YVByb3BlcnR5VmFsdWUoaW5zdGFuY2VUeXBlLCBNZXRhQ2xhc3NQcm9wZXJ0eS5wZXJzaXN0YWJsZSkgOiBmYWxzZTtcclxuICAgICAgICByZXR1cm4gaXNQZXJzaXN0YWJsZTtcclxuICAgIH1cclxufSJdfQ==