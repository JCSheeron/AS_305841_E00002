define(["require", "exports", "./bindings/componentBindingConnector", "./componentPersistenceProvider"], function (require, exports, componentBindingConnector_1, componentPersistenceProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The data hub provides updating, accessing and managing shared data
     *
     * @export
     * @class ComponentData
     */
    var ComponentDataHub = /** @class */ (function () {
        function ComponentDataHub() {
        }
        /**
         * Updates a shared data item specified by scope and id.
         *
         * @static
         * @template TDataType Specifies the values data type
         * @param {object} caller The caller of the update method
         * @param {TDataType} value The new update value.
         * @param {string} sharedDataScope Specefies the items shared scop
         * @param {string} sharedDataId Specifies the items id
         * @param {(SharedDataType|undefined)} [sharedDataType=undefined] Specifies the items data type
         * @memberof ComponentDataService
         */
        ComponentDataHub.updateShared = function (caller, value, sharedDataScope, sharedDataId, sharedDataType) {
            if (sharedDataType === void 0) { sharedDataType = undefined; }
            componentBindingConnector_1.ComponentBindingConnector.updateSharedData(caller, value, sharedDataScope, sharedDataId, sharedDataType);
        };
        /**
         * Reds a shared data item specified by scope and id.
         *
         * @static
         * @template TDataType
         * @param {object} caller
         * @param {string} sharedDataScope
         * @param {string} sharedDataId
         * @param {TConstructor} sharedDataType
         * @returns {TDataType}
         * @memberof ComponentDataHub
         */
        ComponentDataHub.readShared = function (caller, sharedDataScope, sharedDataId, sharedDataType) {
            return componentBindingConnector_1.ComponentBindingConnector.readSharedData(caller, sharedDataScope, sharedDataId, sharedDataType);
        };
        /**
         * Called when component data has changed and needs to be processed.
         *
         * @static
         * @param {object} caller
         * @param {*} modifiedInstance
         * @param {*} value
         * @param {string} [hints=""]
         * @memberof ComponentDataHub
         */
        ComponentDataHub.notifyChanged = function (caller, modifiedInstance, value, hints) {
            if (hints === void 0) { hints = ""; }
            // check if the instance should be persisted and delegate the change notification to the persistency provider
            if (componentPersistenceProvider_1.ComponentPersistencyProvider.instanceSupportsPersistency(modifiedInstance)) {
                componentPersistenceProvider_1.ComponentPersistencyProvider.savePersistenceData(modifiedInstance);
            }
        };
        /**
         * called whenever component data has been instantiated
         *
         * @static
         * @param {object} caller
         * @param {*} createdInstance
         * @param {string} [hints=""]
         * @memberof ComponentDataHub
         */
        ComponentDataHub.notifyCreated = function (caller, createdInstance, hints) {
            if (hints === void 0) { hints = ""; }
            // check if the instance should be persisted and delegate the change notification to the persistency provider
            if (componentPersistenceProvider_1.ComponentPersistencyProvider.instanceSupportsPersistency(createdInstance)) {
                componentPersistenceProvider_1.ComponentPersistencyProvider.loadPersistenceData(createdInstance);
            }
        };
        return ComponentDataHub;
    }());
    exports.ComponentDataHub = ComponentDataHub;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50RGF0YUh1Yi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvZnJhbWV3b3JrL2NvbXBvbmVudEh1Yi9jb21wb25lbnREYXRhSHViLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQU1BOzs7OztPQUtHO0lBQ0g7UUFBQTtRQTZFQSxDQUFDO1FBMUVHOzs7Ozs7Ozs7OztXQVdHO1FBQ1csNkJBQVksR0FBMUIsVUFBc0MsTUFBYSxFQUFDLEtBQWdCLEVBQUUsZUFBdUIsRUFBQyxZQUFvQixFQUFFLGNBQW1EO1lBQW5ELCtCQUFBLEVBQUEsMEJBQW1EO1lBQ25LLHFEQUF5QixDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRSxjQUFjLENBQUMsQ0FBQztRQUM1RyxDQUFDO1FBR0Q7Ozs7Ozs7Ozs7O1dBV0c7UUFDVywyQkFBVSxHQUF4QixVQUFvQyxNQUFhLEVBQUUsZUFBdUIsRUFBQyxZQUFvQixFQUFFLGNBQTJCO1lBQ3hILE9BQU8scURBQXlCLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQzNHLENBQUM7UUFHRDs7Ozs7Ozs7O1dBU0c7UUFDSSw4QkFBYSxHQUFwQixVQUFxQixNQUFjLEVBQUUsZ0JBQXFCLEVBQUUsS0FBVSxFQUFDLEtBQWlCO1lBQWpCLHNCQUFBLEVBQUEsVUFBaUI7WUFFcEYsNkdBQTZHO1lBQzdHLElBQUksMkRBQTRCLENBQUMsMkJBQTJCLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtnQkFDNUUsMkRBQTRCLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzthQUN0RTtRQUNMLENBQUM7UUFLRDs7Ozs7Ozs7V0FRRztRQUNJLDhCQUFhLEdBQXBCLFVBQXFCLE1BQWMsRUFBRSxlQUFvQixFQUFDLEtBQWlCO1lBQWpCLHNCQUFBLEVBQUEsVUFBaUI7WUFFdkUsNkdBQTZHO1lBQzdHLElBQUksMkRBQTRCLENBQUMsMkJBQTJCLENBQUMsZUFBZSxDQUFDLEVBQUU7Z0JBQzNFLDJEQUE0QixDQUFDLG1CQUFtQixDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQ3JFO1FBRUwsQ0FBQztRQUdMLHVCQUFDO0lBQUQsQ0FBQyxBQTdFRCxJQTZFQztJQTdFWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnRCaW5kaW5nQ29ubmVjdG9yIH0gZnJvbSBcIi4vYmluZGluZ3MvY29tcG9uZW50QmluZGluZ0Nvbm5lY3RvclwiO1xyXG5pbXBvcnQgeyBUQ29ubmVjdGlvbkRhdGFUeXBlLCBUQ29uc3RydWN0b3IgfSBmcm9tIFwiLi9jb21tb24vY29tbW9uVHlwZXNcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50UGVyc2lzdGVuY3lQcm92aWRlciB9IGZyb20gXCIuL2NvbXBvbmVudFBlcnNpc3RlbmNlUHJvdmlkZXJcIjtcclxuXHJcbmV4cG9ydCB0eXBlIFNoYXJlZERhdGFUeXBlID0gVENvbm5lY3Rpb25EYXRhVHlwZTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgZGF0YSBodWIgcHJvdmlkZXMgdXBkYXRpbmcsIGFjY2Vzc2luZyBhbmQgbWFuYWdpbmcgc2hhcmVkIGRhdGFcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgQ29tcG9uZW50RGF0YVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbXBvbmVudERhdGFIdWJ7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyBhIHNoYXJlZCBkYXRhIGl0ZW0gc3BlY2lmaWVkIGJ5IHNjb3BlIGFuZCBpZC5cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAdGVtcGxhdGUgVERhdGFUeXBlIFNwZWNpZmllcyB0aGUgdmFsdWVzIGRhdGEgdHlwZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGNhbGxlciBUaGUgY2FsbGVyIG9mIHRoZSB1cGRhdGUgbWV0aG9kXHJcbiAgICAgKiBAcGFyYW0ge1REYXRhVHlwZX0gdmFsdWUgVGhlIG5ldyB1cGRhdGUgdmFsdWUuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2hhcmVkRGF0YVNjb3BlIFNwZWNlZmllcyB0aGUgaXRlbXMgc2hhcmVkIHNjb3BcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaGFyZWREYXRhSWQgU3BlY2lmaWVzIHRoZSBpdGVtcyBpZFxyXG4gICAgICogQHBhcmFtIHsoU2hhcmVkRGF0YVR5cGV8dW5kZWZpbmVkKX0gW3NoYXJlZERhdGFUeXBlPXVuZGVmaW5lZF0gU3BlY2lmaWVzIHRoZSBpdGVtcyBkYXRhIHR5cGVcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnREYXRhU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHVwZGF0ZVNoYXJlZDxURGF0YVR5cGU+KGNhbGxlcjpvYmplY3QsdmFsdWU6IFREYXRhVHlwZSwgc2hhcmVkRGF0YVNjb3BlOiBzdHJpbmcsc2hhcmVkRGF0YUlkOiBzdHJpbmcsIHNoYXJlZERhdGFUeXBlOlNoYXJlZERhdGFUeXBlfHVuZGVmaW5lZCA9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgQ29tcG9uZW50QmluZGluZ0Nvbm5lY3Rvci51cGRhdGVTaGFyZWREYXRhKGNhbGxlcix2YWx1ZSwgc2hhcmVkRGF0YVNjb3BlLCBzaGFyZWREYXRhSWQsIHNoYXJlZERhdGFUeXBlKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWRzIGEgc2hhcmVkIGRhdGEgaXRlbSBzcGVjaWZpZWQgYnkgc2NvcGUgYW5kIGlkLlxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEB0ZW1wbGF0ZSBURGF0YVR5cGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBjYWxsZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaGFyZWREYXRhU2NvcGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaGFyZWREYXRhSWRcclxuICAgICAqIEBwYXJhbSB7VENvbnN0cnVjdG9yfSBzaGFyZWREYXRhVHlwZVxyXG4gICAgICogQHJldHVybnMge1REYXRhVHlwZX1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnREYXRhSHViXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZFNoYXJlZDxURGF0YVR5cGU+KGNhbGxlcjpvYmplY3QsIHNoYXJlZERhdGFTY29wZTogc3RyaW5nLHNoYXJlZERhdGFJZDogc3RyaW5nLCBzaGFyZWREYXRhVHlwZTpUQ29uc3RydWN0b3IpIDogVERhdGFUeXBle1xyXG4gICAgICAgIHJldHVybiBDb21wb25lbnRCaW5kaW5nQ29ubmVjdG9yLnJlYWRTaGFyZWREYXRhKGNhbGxlciwgc2hhcmVkRGF0YVNjb3BlLCBzaGFyZWREYXRhSWQsIHNoYXJlZERhdGFUeXBlKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgd2hlbiBjb21wb25lbnQgZGF0YSBoYXMgY2hhbmdlZCBhbmQgbmVlZHMgdG8gYmUgcHJvY2Vzc2VkLlxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBjYWxsZXJcclxuICAgICAqIEBwYXJhbSB7Kn0gbW9kaWZpZWRJbnN0YW5jZVxyXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtoaW50cz1cIlwiXVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudERhdGFIdWJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIG5vdGlmeUNoYW5nZWQoY2FsbGVyOiBvYmplY3QsIG1vZGlmaWVkSW5zdGFuY2U6IGFueSwgdmFsdWU6IGFueSxoaW50czpzdHJpbmcgPSBcIlwiKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGluc3RhbmNlIHNob3VsZCBiZSBwZXJzaXN0ZWQgYW5kIGRlbGVnYXRlIHRoZSBjaGFuZ2Ugbm90aWZpY2F0aW9uIHRvIHRoZSBwZXJzaXN0ZW5jeSBwcm92aWRlclxyXG4gICAgICAgIGlmIChDb21wb25lbnRQZXJzaXN0ZW5jeVByb3ZpZGVyLmluc3RhbmNlU3VwcG9ydHNQZXJzaXN0ZW5jeShtb2RpZmllZEluc3RhbmNlKSkge1xyXG4gICAgICAgICAgICBDb21wb25lbnRQZXJzaXN0ZW5jeVByb3ZpZGVyLnNhdmVQZXJzaXN0ZW5jZURhdGEobW9kaWZpZWRJbnN0YW5jZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY2FsbGVkIHdoZW5ldmVyIGNvbXBvbmVudCBkYXRhIGhhcyBiZWVuIGluc3RhbnRpYXRlZFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBjYWxsZXJcclxuICAgICAqIEBwYXJhbSB7Kn0gY3JlYXRlZEluc3RhbmNlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2hpbnRzPVwiXCJdXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50RGF0YUh1YlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbm90aWZ5Q3JlYXRlZChjYWxsZXI6IG9iamVjdCwgY3JlYXRlZEluc3RhbmNlOiBhbnksaGludHM6c3RyaW5nID0gXCJcIikge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZSBpbnN0YW5jZSBzaG91bGQgYmUgcGVyc2lzdGVkIGFuZCBkZWxlZ2F0ZSB0aGUgY2hhbmdlIG5vdGlmaWNhdGlvbiB0byB0aGUgcGVyc2lzdGVuY3kgcHJvdmlkZXJcclxuICAgICAgICBpZiAoQ29tcG9uZW50UGVyc2lzdGVuY3lQcm92aWRlci5pbnN0YW5jZVN1cHBvcnRzUGVyc2lzdGVuY3koY3JlYXRlZEluc3RhbmNlKSkge1xyXG4gICAgICAgICAgICBDb21wb25lbnRQZXJzaXN0ZW5jeVByb3ZpZGVyLmxvYWRQZXJzaXN0ZW5jZURhdGEoY3JlYXRlZEluc3RhbmNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICBcclxufSJdfQ==