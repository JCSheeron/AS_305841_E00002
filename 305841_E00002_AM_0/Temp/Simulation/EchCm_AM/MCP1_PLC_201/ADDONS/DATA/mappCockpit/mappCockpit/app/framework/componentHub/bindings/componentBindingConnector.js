define(["require", "exports", "./componentBinding", "../../../common/utilities/dataBox", "../../events", "../../store"], function (require, exports, componentBinding_1, dataBox_1, events_1, store_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Implements an interface for binding/wiring components. A binding connector supports connecting components and exchanging data without any
     * direct dependencies.
     *
     * @export
     * @class ComponentBindingConnector
     */
    var ComponentBindingConnector = /** @class */ (function () {
        function ComponentBindingConnector() {
        }
        Object.defineProperty(ComponentBindingConnector, "sharedProperties", {
            /**
             * Gets the store with the bindable properties
             *
             * @readonly
             * @static
             * @type {Store}
             * @memberof ComponentBindings
             */
            get: function () {
                return this._sharedProperties;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Creates a binding according to the bindi8g declaration
         *
         * @static
         * @param {ComponentBinding} bindingDeclaration
         * @returns {ComponentBindingConnector}
         * @memberof ComponentBindingConnector
         */
        ComponentBindingConnector.bind = function (bindingDeclaration) {
            var bindingDescriptor = bindingDeclaration.descriptor;
            if (bindingDeclaration.sourceKey) {
                this.bindSource(bindingDeclaration.component, bindingDescriptor);
            }
            if (bindingDeclaration.targetKey) {
                this.bindTarget(bindingDeclaration.component, bindingDescriptor);
            }
            // release component dependency
            bindingDeclaration.component = null;
        };
        /**
         *
         *
         * @param {ComponentBinding} bindingDeclaration
         * @memberof ComponentBindingConnector
         */
        ComponentBindingConnector.bindSource = function (component, bindingDescriptor) {
            // check if the component contains the source key
            if (bindingDescriptor.sourceKey in component) {
                if (component[bindingDescriptor.sourceKey] instanceof events_1.TypedEvent) {
                    this.bindSourceEvent(component, bindingDescriptor);
                }
                else if (typeof component[bindingDescriptor.sourceKey] === 'function') {
                    this.bindSourceMethod(component, bindingDescriptor);
                }
            }
            else {
                console.error("The binding key %o is not contained in %o! ", bindingDescriptor.sourceKey, component);
            }
        };
        /**
         * Binds the components source method ....
         *
         * @private
         * @param {ComponentBinding} bindingDescriptor
         * @param {*} sourceMember
         * @memberof ComponentBindingConnector
         */
        ComponentBindingConnector.bindSourceMethod = function (component, bindingDescriptor) {
            var originalSourceMethod = component[bindingDescriptor.sourceKey];
            // capture respectively intercept the source member call
            component[bindingDescriptor.sourceKey] = methodBindingInterceptor;
            // declares the method interceptor necessary for capturing the sender.
            function methodBindingInterceptor(methodArgs) {
                // capture the caller
                var caller = this;
                // call original method
                originalSourceMethod.call(caller, methodArgs);
                // forward the call to the binding logic
                ComponentBindingConnector.updateBindingValue(caller, bindingDescriptor, methodArgs);
            }
        };
        /**
         * Updates the bound value when the components intercepted (bound) method has been called
         *
         * @private
         * @param {ComponentBinding} bindingInfo
         * @param {*} args
         * @memberof ComponentBindingConnector
         */
        ComponentBindingConnector.updateBindingValue = function (caller, bindingDescriptor, args) {
            // pass the data within a reference box if required. This keeps the data and its members unmodified respectively passed without copying.
            var bindingArgs = bindingDescriptor.passByValue ? args : dataBox_1.DataBox.Box(args);
            // get the data type 
            var dataType = bindingDescriptor.dataType;
            // get the binding id for the target object
            var bindingId = bindingDescriptor.fullId;
            // temporal variable containing the computed value for forceUpdate
            var computedForceUpdateValue = false;
            // in case of a command or command response we need to pass a null object if no command args are provided. also forceUpdate needs to be true 
            // to force the command execution by a simulated value change!
            if (bindingDescriptor.type === componentBinding_1.BindingType.COMMAND || bindingDescriptor.type === componentBinding_1.BindingType.COMMAND_RESPONSE) {
                var nullObject = {};
                bindingArgs = bindingArgs ? bindingArgs : nullObject;
                computedForceUpdateValue = true;
            }
            else { // if the value is passed by reference, we force updating to avoid the comparision of complex objects with references 
                computedForceUpdateValue = !bindingDescriptor.passByValue;
            }
            // set previously computed value for forceUpdate to const variable
            var forceUpdate = computedForceUpdateValue;
            // update the corresponding binding value
            this.sharedProperties.update(caller, dataType, bindingArgs, bindingId, forceUpdate);
        };
        /**
         * Binds ac omponent event
         *
         * @private
         * @param {ComponentBinding} bindingDeclaration
         * @memberof ComponentBindingConnector
         */
        ComponentBindingConnector.bindSourceEvent = function (component, bindingDescriptor) {
            var _this = this;
            var sourceEvent = component[bindingDescriptor.sourceKey];
            sourceEvent.attach(function (sender, args) { return _this.onSourceEventRaised(bindingDescriptor, sender, args); });
        };
        /**
         * Called when the components observed (bound) event has been raised
         *
         * @private
         * @param {ComponentBinding} bindingInfo
         * @param {*} sender
         * @param {*} eventArgs
         * @memberof ComponentBindingConnector
         */
        ComponentBindingConnector.onSourceEventRaised = function (bindingDescriptor, sender, eventArgs) {
            this.updateBindingValue(sender, bindingDescriptor, eventArgs);
        };
        /**
         * Binds a components property to a bindable value
         *
         * @param {ComponentBinding} bindingDeclaration
         * @memberof ComponentBindingConnector
         */
        ComponentBindingConnector.bindTarget = function (component, bindingDescriptor) {
            // check if the component contains the target key
            if (bindingDescriptor.targetKey in component) {
                // get the target instance 
                var connectionTarget = component;
                // get the data type 
                var dataType = bindingDescriptor.dataType;
                // get the binding id for the target object
                var bindingId = bindingDescriptor.fullId;
                // check if the endpoint is a function
                var endPointIsMethod = this.endPointIsFunction(connectionTarget, bindingDescriptor.targetKey);
                // check if the endpoint is a property
                var endPointIsProperty = this.endPointIsProperty(connectionTarget, bindingDescriptor.targetKey);
                // bind the target endpoint according to the handler type
                if (endPointIsMethod) {
                    // get the target handler
                    var targetBindingChangedHandler = connectionTarget[bindingDescriptor.targetKey];
                    // bind the method handler
                    this.bindTargetMethod(connectionTarget, targetBindingChangedHandler, dataType, bindingId);
                }
                else {
                    // bind the property handler
                    this.bindTargetProperty(connectionTarget, bindingDescriptor.targetKey, dataType, bindingId);
                }
            }
            else {
                console.error("ComponentBinding: The binding key %o is not contained in %o! ", bindingDescriptor.targetKey, component);
            }
        };
        /**
         * Binds a target method to a bindable value
         *
         * @private
         * @param {object} connectionTarget
         * @param {TBindableChangedHandler} targetBindingValueChangedHandler
         * @param {TConnectionDataType} dataType
         * @param {string} [bindingId=""]
         * @memberof ComponentBindingConnector
         */
        ComponentBindingConnector.bindTargetMethod = function (connectionTarget, targetBindingValueChangedHandler, dataType, bindingId) {
            var _this = this;
            if (bindingId === void 0) { bindingId = ""; }
            // create the data changed handler for an update method call
            var bindingValueChangedHandler = function (newValue, oldValue) { return _this.invokeTargetMethod(newValue, oldValue, connectionTarget, targetBindingValueChangedHandler, dataType); };
            // observe the state change and forward the notification to the target handler
            this.sharedProperties.observe(connectionTarget, dataType, bindingValueChangedHandler, bindingId);
        };
        /**
         * Invokes the components target method when a bindable value has been changed.
         *
         * @private
         * @param {*} newValue
         * @param {*} oldValue
         * @param {object} connectionTarget
         * @param {TBindableChangedHandler} targetBindingValueChangedHandler
         * @param {TConnectionDataType} dataType
         * @memberof ComponentBindingConnector
         */
        ComponentBindingConnector.invokeTargetMethod = function (newValue, oldValue, connectionTarget, targetBindingValueChangedHandler, dataType) {
            var modifiedType = newValue ? typeof newValue === "object" ? newValue.constructor.name : typeof newValue : undefined;
            var targetDataType = dataType ? typeof dataType === "string" ? dataType : dataType.name : undefined;
            if (!dataType || (modifiedType === targetDataType)) {
                targetBindingValueChangedHandler.bind(connectionTarget)(newValue, oldValue);
            }
            else {
                console.error("ComponentBinding: could not invoke %o because data types do not match!", connectionTarget);
            }
        };
        /**
         * Binds a component property to a bindable value.
         *
         * @private
         * @param {object} bindingTarget
         * @param {string} targetMemberName
         * @param {TConnectionDataType} dataType
         * @param {string} bindingId
         * @memberof ComponentBindingConnector
         */
        ComponentBindingConnector.bindTargetProperty = function (bindingTarget, targetMemberName, dataType, bindingId) {
            var _this = this;
            // create the data changed handler for a property update
            var bindingValueChangedHandler = function (newValue) { return _this.updateTargetProperty(bindingTarget, newValue, targetMemberName, dataType); };
            // observe the data change and forward the notification to the property changed handler 
            this.sharedProperties.observe(bindingTarget, dataType, bindingValueChangedHandler, bindingId);
        };
        /**
         * Updates the components property when a bindable value has been changed.
         *
         * @private
         * @param {object} bindingTarget
         * @param {*} newValue
         * @param {string} targetMemberName
         * @param {TConnectionDataType} dataType
         * @memberof ComponentBindingConnector
         */
        ComponentBindingConnector.updateTargetProperty = function (bindingTarget, newValue, targetMemberName, dataType) {
            var modifiedType = newValue ? typeof newValue === "object" ? newValue.constructor.name : typeof newValue : undefined;
            var targetDataType = dataType ? typeof dataType === "string" ? dataType : dataType.name : undefined;
            //TODO: make sure that the modified type and binding type are matching
            // if (!dataType || (modifiedType === targetDataType)) {
            for (var key in bindingTarget) {
                if (key === targetMemberName) {
                    bindingTarget[targetMemberName] = newValue;
                }
            }
        };
        /**
         * Determines if the end point is a function
         *
         * @private
         * @static
         * @param {object} connectionTarget
         * @returns
         * @memberof ComponentBindingConnector
         */
        ComponentBindingConnector.endPointIsFunction = function (connectionTarget, targetMemberName) {
            // get the target handler
            var connectionPointHandler = connectionTarget[targetMemberName];
            // check if the endpoint is a function
            var endPointIsFunction = connectionPointHandler instanceof Function;
            return endPointIsFunction;
        };
        /**
         * Determines if the end point is a property
         *
         * @private
         * @static
         * @param {object} connectionTarget
         * @returns
         * @memberof ComponentBindingConnector
         */
        ComponentBindingConnector.endPointIsProperty = function (connectionTarget, targetMemberName) {
            // check if the endpoint is a property
            var targetBaseOwnsProperty = connectionTarget.constructor.prototype.hasOwnProperty(targetMemberName);
            var targetOwnsProperty = connectionTarget.constructor.prototype.hasOwnProperty(targetMemberName);
            var endPointIsProperty = targetOwnsProperty && !this.endPointIsFunction(connectionTarget, targetMemberName);
            return endPointIsProperty;
        };
        /**
         * Unbinds a whole component or the binding specified by the binding declaration
         *
         * @static
         * @param {(object | ComponentBinding)} bindingObject
         * @memberof ComponentBindingConnector
         */
        ComponentBindingConnector.unbind = function (bindingObject) {
            if (bindingObject instanceof componentBinding_1.ComponentBinding) {
                this.unbindBinding(bindingObject);
            }
            else {
                this.unbindComponent(bindingObject);
            }
        };
        /**
         * Unbinds a specific binding
         *
         * @private
         * @static
         * @param {ComponentBinding} bindingDeclaration
         * @memberof ComponentBindingConnector
         */
        ComponentBindingConnector.unbindBinding = function (bindingDeclaration) {
            throw new Error("Method not implemented.");
        };
        /**
         * Unbinds all bindings related to the bound object
         *
         * @private
         * @static
         * @param {object} boundObject
         * @memberof ComponentBindingConnector
         */
        ComponentBindingConnector.unbindComponent = function (boundObject) {
            // detach the bound object from all shared properties
            this.sharedProperties.detach(boundObject);
        };
        /**
         * Updates a shared data item specified by scope and id
         *
         * @static
         * @template TDataType
         * @param {object} caller
         * @param {TDataType} value
         * @param {string} sharedDataScope
         * @param {string} sharedDataId
         * @param {(import("../componentDataService").SharedDataType | undefined)} sharedDataType
         * @memberof ComponentBindingConnector
         */
        ComponentBindingConnector.updateSharedData = function (caller, value, sharedDataScope, sharedDataId, sharedDataType) {
            // get the full id
            var sharedId = sharedDataScope + '.' + sharedDataId;
            // update the corresponding binding value
            this.sharedProperties.update(caller, sharedDataType, value, sharedId, false);
        };
        /**
         * Reads a shared data item specified by scope and id
         *
         * @static
         * @template TDataType
         * @param {object} caller
         * @param {string} sharedDataScope
         * @param {string} sharedDataId
         * @param {TStoreItemConstructor} sharedDataType
         * @returns {TDataType}
         * @memberof ComponentBindingConnector
         */
        ComponentBindingConnector.readSharedData = function (caller, sharedDataScope, sharedDataId, sharedDataType) {
            // get the full id
            var sharedId = sharedDataScope + '.' + sharedDataId;
            // read and return the requested item from the store
            return this.sharedProperties.read(sharedDataType, sharedId);
        };
        // holds the binding properties to be shared between source and target binding points as property objects in a store.
        ComponentBindingConnector._sharedProperties = new store_1.Store();
        return ComponentBindingConnector;
    }());
    exports.ComponentBindingConnector = ComponentBindingConnector;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50QmluZGluZ0Nvbm5lY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvZnJhbWV3b3JrL2NvbXBvbmVudEh1Yi9iaW5kaW5ncy9jb21wb25lbnRCaW5kaW5nQ29ubmVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQU9BOzs7Ozs7T0FNRztJQUNIO1FBQUE7UUFpYUEsQ0FBQztRQWxaRyxzQkFBbUIsNkNBQWdCO1lBUm5DOzs7Ozs7O2VBT0c7aUJBQ0g7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7WUFDbEMsQ0FBQzs7O1dBQUE7UUFHRDs7Ozs7OztXQU9HO1FBQ1csOEJBQUksR0FBbEIsVUFBbUIsa0JBQW9DO1lBRW5ELElBQU0saUJBQWlCLEdBQUcsa0JBQWtCLENBQUMsVUFBVSxDQUFDO1lBRXhELElBQUksa0JBQWtCLENBQUMsU0FBUyxFQUFFO2dCQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO2FBQ3BFO1lBRUQsSUFBSSxrQkFBa0IsQ0FBQyxTQUFTLEVBQUU7Z0JBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsU0FBUyxFQUFFLGlCQUFpQixDQUFDLENBQUM7YUFFcEU7WUFFRCwrQkFBK0I7WUFDL0Isa0JBQWtCLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN4QyxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDWSxvQ0FBVSxHQUF6QixVQUEwQixTQUFTLEVBQUUsaUJBQTZDO1lBRTlFLGlEQUFpRDtZQUNqRCxJQUFJLGlCQUFpQixDQUFDLFNBQVMsSUFBSSxTQUFTLEVBQUU7Z0JBQzFDLElBQUksU0FBUyxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxZQUFZLG1CQUFVLEVBQUU7b0JBQzlELElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLGlCQUFpQixD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ImltcG9ydCB7IFRCaW5kYWJsZUNoYW5nZWRIYW5kbGVyLCBUQ29ubmVjdGlvbkRhdGFUeXBlLCBUQ29uc3RydWN0b3IgfSBmcm9tIFwiLi4vY29tbW9uL2NvbW1vblR5cGVzXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudEJpbmRpbmcsIEJpbmRpbmdUeXBlLCBDb21wb25lbnRCaW5kaW5nRGVzY3JpcHRvciB9IGZyb20gXCIuL2NvbXBvbmVudEJpbmRpbmdcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50QmluZGluZ3MgfSBmcm9tIFwiLi9jb21wb25lbnRCaW5kaW5nc1wiO1xyXG5pbXBvcnQgeyBEYXRhQm94IH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi91dGlsaXRpZXMvZGF0YUJveFwiO1xyXG5pbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSBcIi4uLy4uL2V2ZW50c1wiO1xyXG5pbXBvcnQgeyBTdG9yZSwgVFN0b3JlSXRlbUNvbnN0cnVjdG9yIH0gZnJvbSBcIi4uLy4uL3N0b3JlXCI7XHJcblxyXG4vKipcclxuICogSW1wbGVtZW50cyBhbiBpbnRlcmZhY2UgZm9yIGJpbmRpbmcvd2lyaW5nIGNvbXBvbmVudHMuIEEgYmluZGluZyBjb25uZWN0b3Igc3VwcG9ydHMgY29ubmVjdGluZyBjb21wb25lbnRzIGFuZCBleGNoYW5naW5nIGRhdGEgd2l0aG91dCBhbnlcclxuICogZGlyZWN0IGRlcGVuZGVuY2llcy5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgQ29tcG9uZW50QmluZGluZ0Nvbm5lY3RvclxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbXBvbmVudEJpbmRpbmdDb25uZWN0b3Ige1xyXG5cclxuXHJcbiAgICAvLyBob2xkcyB0aGUgYmluZGluZyBwcm9wZXJ0aWVzIHRvIGJlIHNoYXJlZCBiZXR3ZWVuIHNvdXJjZSBhbmQgdGFyZ2V0IGJpbmRpbmcgcG9pbnRzIGFzIHByb3BlcnR5IG9iamVjdHMgaW4gYSBzdG9yZS5cclxuICAgIHByaXZhdGUgc3RhdGljIF9zaGFyZWRQcm9wZXJ0aWVzOiBTdG9yZSA9IG5ldyBTdG9yZSgpO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHN0b3JlIHdpdGggdGhlIGJpbmRhYmxlIHByb3BlcnRpZXNcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEB0eXBlIHtTdG9yZX1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCaW5kaW5nc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXQgc2hhcmVkUHJvcGVydGllcygpOiBTdG9yZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NoYXJlZFByb3BlcnRpZXM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIGJpbmRpbmcgYWNjb3JkaW5nIHRvIHRoZSBiaW5kaThnIGRlY2xhcmF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCaW5kaW5nfSBiaW5kaW5nRGVjbGFyYXRpb25cclxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnRCaW5kaW5nQ29ubmVjdG9yfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJpbmRpbmdDb25uZWN0b3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBiaW5kKGJpbmRpbmdEZWNsYXJhdGlvbjogQ29tcG9uZW50QmluZGluZykge1xyXG5cclxuICAgICAgICBjb25zdCBiaW5kaW5nRGVzY3JpcHRvciA9IGJpbmRpbmdEZWNsYXJhdGlvbi5kZXNjcmlwdG9yO1xyXG5cclxuICAgICAgICBpZiAoYmluZGluZ0RlY2xhcmF0aW9uLnNvdXJjZUtleSkge1xyXG4gICAgICAgICAgICB0aGlzLmJpbmRTb3VyY2UoYmluZGluZ0RlY2xhcmF0aW9uLmNvbXBvbmVudCwgYmluZGluZ0Rlc2NyaXB0b3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGJpbmRpbmdEZWNsYXJhdGlvbi50YXJnZXRLZXkpIHtcclxuICAgICAgICAgICAgdGhpcy5iaW5kVGFyZ2V0KGJpbmRpbmdEZWNsYXJhdGlvbi5jb21wb25lbnQsIGJpbmRpbmdEZXNjcmlwdG9yKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyByZWxlYXNlIGNvbXBvbmVudCBkZXBlbmRlbmN5XHJcbiAgICAgICAgYmluZGluZ0RlY2xhcmF0aW9uLmNvbXBvbmVudCA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJpbmRpbmd9IGJpbmRpbmdEZWNsYXJhdGlvblxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJpbmRpbmdDb25uZWN0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgYmluZFNvdXJjZShjb21wb25lbnQsIGJpbmRpbmdEZXNjcmlwdG9yOiBDb21wb25lbnRCaW5kaW5nRGVzY3JpcHRvcikge1xyXG5cclxuICAgICAgICAvLyBjaGVjayBpZiB0aGUgY29tcG9uZW50IGNvbnRhaW5zIHRoZSBzb3VyY2Uga2V5XHJcbiAgICAgICAgaWYgKGJpbmRpbmdEZXNjcmlwdG9yLnNvdXJjZUtleSBpbiBjb21wb25lbnQpIHtcclxuICAgICAgICAgICAgaWYgKGNvbXBvbmVudFtiaW5kaW5nRGVzY3JpcHRvci5zb3VyY2VLZXldIGluc3RhbmNlb2YgVHlwZWRFdmVudCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kU291cmNlRXZlbnQoY29tcG9uZW50LCBiaW5kaW5nRGVzY3JpcHRvcik7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbXBvbmVudFtiaW5kaW5nRGVzY3JpcHRvci5zb3VyY2VLZXldID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRTb3VyY2VNZXRob2QoY29tcG9uZW50LCBiaW5kaW5nRGVzY3JpcHRvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVGhlIGJpbmRpbmcga2V5ICVvIGlzIG5vdCBjb250YWluZWQgaW4gJW8hIFwiLCBiaW5kaW5nRGVzY3JpcHRvci5zb3VyY2VLZXksIGNvbXBvbmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJpbmRzIHRoZSBjb21wb25lbnRzIHNvdXJjZSBtZXRob2QgLi4uLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJpbmRpbmd9IGJpbmRpbmdEZXNjcmlwdG9yXHJcbiAgICAgKiBAcGFyYW0geyp9IHNvdXJjZU1lbWJlclxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJpbmRpbmdDb25uZWN0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgYmluZFNvdXJjZU1ldGhvZChjb21wb25lbnQsIGJpbmRpbmdEZXNjcmlwdG9yOiBDb21wb25lbnRCaW5kaW5nRGVzY3JpcHRvcikge1xyXG4gICAgICBcclxuICAgICAgICBjb25zdCBvcmlnaW5hbFNvdXJjZU1ldGhvZCA9IGNvbXBvbmVudFtiaW5kaW5nRGVzY3JpcHRvci5zb3VyY2VLZXldO1xyXG5cclxuICAgICAgICAvLyBjYXB0dXJlIHJlc3BlY3RpdmVseSBpbnRlcmNlcHQgdGhlIHNvdXJjZSBtZW1iZXIgY2FsbFxyXG4gICAgICAgIGNvbXBvbmVudFtiaW5kaW5nRGVzY3JpcHRvci5zb3VyY2VLZXldID0gbWV0aG9kQmluZGluZ0ludGVyY2VwdG9yO1xyXG5cclxuICAgICAgICAvLyBkZWNsYXJlcyB0aGUgbWV0aG9kIGludGVyY2VwdG9yIG5lY2Vzc2FyeSBmb3IgY2FwdHVyaW5nIHRoZSBzZW5kZXIuXHJcbiAgICAgICAgZnVuY3Rpb24gbWV0aG9kQmluZGluZ0ludGVyY2VwdG9yKHRoaXM6IGFueSwgbWV0aG9kQXJncykge1xyXG5cclxuICAgICAgICAgICAgLy8gY2FwdHVyZSB0aGUgY2FsbGVyXHJcbiAgICAgICAgICAgIGNvbnN0IGNhbGxlciA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBjYWxsIG9yaWdpbmFsIG1ldGhvZFxyXG4gICAgICAgICAgICBvcmlnaW5hbFNvdXJjZU1ldGhvZC5jYWxsKGNhbGxlciwgbWV0aG9kQXJncyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBmb3J3YXJkIHRoZSBjYWxsIHRvIHRoZSBiaW5kaW5nIGxvZ2ljXHJcbiAgICAgICAgICAgIENvbXBvbmVudEJpbmRpbmdDb25uZWN0b3IudXBkYXRlQmluZGluZ1ZhbHVlKGNhbGxlcixiaW5kaW5nRGVzY3JpcHRvciwgbWV0aG9kQXJncyk7XHJcbiAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBib3VuZCB2YWx1ZSB3aGVuIHRoZSBjb21wb25lbnRzIGludGVyY2VwdGVkIChib3VuZCkgbWV0aG9kIGhhcyBiZWVuIGNhbGxlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJpbmRpbmd9IGJpbmRpbmdJbmZvXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCaW5kaW5nQ29ubmVjdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHVwZGF0ZUJpbmRpbmdWYWx1ZShjYWxsZXIsYmluZGluZ0Rlc2NyaXB0b3I6IENvbXBvbmVudEJpbmRpbmdEZXNjcmlwdG9yLCBhcmdzOiBhbnkpIHtcclxuXHJcbiAgICAgICAgLy8gcGFzcyB0aGUgZGF0YSB3aXRoaW4gYSByZWZlcmVuY2UgYm94IGlmIHJlcXVpcmVkLiBUaGlzIGtlZXBzIHRoZSBkYXRhIGFuZCBpdHMgbWVtYmVycyB1bm1vZGlmaWVkIHJlc3BlY3RpdmVseSBwYXNzZWQgd2l0aG91dCBjb3B5aW5nLlxyXG4gICAgICAgIGxldCBiaW5kaW5nQXJncyA9IGJpbmRpbmdEZXNjcmlwdG9yLnBhc3NCeVZhbHVlID8gYXJncyA6IERhdGFCb3guQm94KGFyZ3MpO1xyXG5cclxuICAgICAgICAvLyBnZXQgdGhlIGRhdGEgdHlwZSBcclxuICAgICAgICBjb25zdCBkYXRhVHlwZSA9IGJpbmRpbmdEZXNjcmlwdG9yLmRhdGFUeXBlO1xyXG4gICAgICAgIC8vIGdldCB0aGUgYmluZGluZyBpZCBmb3IgdGhlIHRhcmdldCBvYmplY3RcclxuICAgICAgICBjb25zdCBiaW5kaW5nSWQgPSBiaW5kaW5nRGVzY3JpcHRvci5mdWxsSWQ7XHJcblxyXG4gICAgICAgIC8vIHRlbXBvcmFsIHZhcmlhYmxlIGNvbnRhaW5pbmcgdGhlIGNvbXB1dGVkIHZhbHVlIGZvciBmb3JjZVVwZGF0ZVxyXG4gICAgICAgIGxldCBjb21wdXRlZEZvcmNlVXBkYXRlVmFsdWU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gaW4gY2FzZSBvZiBhIGNvbW1hbmQgb3IgY29tbWFuZCByZXNwb25zZSB3ZSBuZWVkIHRvIHBhc3MgYSBudWxsIG9iamVjdCBpZiBubyBjb21tYW5kIGFyZ3MgYXJlIHByb3ZpZGVkLiBhbHNvIGZvcmNlVXBkYXRlIG5lZWRzIHRvIGJlIHRydWUgXHJcbiAgICAgICAgLy8gdG8gZm9yY2UgdGhlIGNvbW1hbmQgZXhlY3V0aW9uIGJ5IGEgc2ltdWxhdGVkIHZhbHVlIGNoYW5nZSFcclxuICAgICAgICBpZiAoYmluZGluZ0Rlc2NyaXB0b3IudHlwZSA9PT0gQmluZGluZ1R5cGUuQ09NTUFORCB8fCBiaW5kaW5nRGVzY3JpcHRvci50eXBlID09PSBCaW5kaW5nVHlwZS5DT01NQU5EX1JFU1BPTlNFKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG51bGxPYmplY3QgPSB7fTtcclxuICAgICAgICAgICAgYmluZGluZ0FyZ3MgPSBiaW5kaW5nQXJncyA/IGJpbmRpbmdBcmdzIDogbnVsbE9iamVjdDtcclxuICAgICAgICAgICAgY29tcHV0ZWRGb3JjZVVwZGF0ZVZhbHVlID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgeyAvLyBpZiB0aGUgdmFsdWUgaXMgcGFzc2VkIGJ5IHJlZmVyZW5jZSwgd2UgZm9yY2UgdXBkYXRpbmcgdG8gYXZvaWQgdGhlIGNvbXBhcmlzaW9uIG9mIGNvbXBsZXggb2JqZWN0cyB3aXRoIHJlZmVyZW5jZXMgXHJcbiAgICAgICAgICAgIGNvbXB1dGVkRm9yY2VVcGRhdGVWYWx1ZSA9ICFiaW5kaW5nRGVzY3JpcHRvci5wYXNzQnlWYWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHNldCBwcmV2aW91c2x5IGNvbXB1dGVkIHZhbHVlIGZvciBmb3JjZVVwZGF0ZSB0byBjb25zdCB2YXJpYWJsZVxyXG4gICAgICAgIGNvbnN0IGZvcmNlVXBkYXRlID0gY29tcHV0ZWRGb3JjZVVwZGF0ZVZhbHVlO1xyXG5cclxuICAgICAgICAvLyB1cGRhdGUgdGhlIGNvcnJlc3BvbmRpbmcgYmluZGluZyB2YWx1ZVxyXG4gICAgICAgIHRoaXMuc2hhcmVkUHJvcGVydGllcy51cGRhdGUoY2FsbGVyLGRhdGFUeXBlLCBiaW5kaW5nQXJncywgYmluZGluZ0lkLCBmb3JjZVVwZGF0ZSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQmluZHMgYWMgb21wb25lbnQgZXZlbnQgXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QmluZGluZ30gYmluZGluZ0RlY2xhcmF0aW9uXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmluZGluZ0Nvbm5lY3RvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBiaW5kU291cmNlRXZlbnQoY29tcG9uZW50LCBiaW5kaW5nRGVzY3JpcHRvcjogQ29tcG9uZW50QmluZGluZ0Rlc2NyaXB0b3IpIHtcclxuICAgICAgICBjb25zdCBzb3VyY2VFdmVudDogVHlwZWRFdmVudDxhbnksIGFueT4gPSBjb21wb25lbnRbYmluZGluZ0Rlc2NyaXB0b3Iuc291cmNlS2V5XTtcclxuXHJcbiAgICAgICAgc291cmNlRXZlbnQuYXR0YWNoKChzZW5kZXIsIGFyZ3MpID0+IHRoaXMub25Tb3VyY2VFdmVudFJhaXNlZChiaW5kaW5nRGVzY3JpcHRvciwgc2VuZGVyLCBhcmdzKSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIHdoZW4gdGhlIGNvbXBvbmVudHMgb2JzZXJ2ZWQgKGJvdW5kKSBldmVudCBoYXMgYmVlbiByYWlzZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCaW5kaW5nfSBiaW5kaW5nSW5mb1xyXG4gICAgICogQHBhcmFtIHsqfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7Kn0gZXZlbnRBcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmluZGluZ0Nvbm5lY3RvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBvblNvdXJjZUV2ZW50UmFpc2VkKGJpbmRpbmdEZXNjcmlwdG9yOiBDb21wb25lbnRCaW5kaW5nRGVzY3JpcHRvciwgc2VuZGVyOiBhbnksIGV2ZW50QXJnczogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVCaW5kaW5nVmFsdWUoc2VuZGVyLGJpbmRpbmdEZXNjcmlwdG9yLCBldmVudEFyZ3MpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCaW5kcyBhIGNvbXBvbmVudHMgcHJvcGVydHkgdG8gYSBiaW5kYWJsZSB2YWx1ZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QmluZGluZ30gYmluZGluZ0RlY2xhcmF0aW9uXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmluZGluZ0Nvbm5lY3RvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBiaW5kVGFyZ2V0KGNvbXBvbmVudCwgYmluZGluZ0Rlc2NyaXB0b3I6IENvbXBvbmVudEJpbmRpbmdEZXNjcmlwdG9yKSB7XHJcblxyXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZSBjb21wb25lbnQgY29udGFpbnMgdGhlIHRhcmdldCBrZXlcclxuICAgICAgICBpZiAoYmluZGluZ0Rlc2NyaXB0b3IudGFyZ2V0S2V5IGluIGNvbXBvbmVudCkge1xyXG5cclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSB0YXJnZXQgaW5zdGFuY2UgXHJcbiAgICAgICAgICAgIGNvbnN0IGNvbm5lY3Rpb25UYXJnZXQgPSBjb21wb25lbnQ7XHJcbiAgICAgICAgICAgIC8vIGdldCB0aGUgZGF0YSB0eXBlIFxyXG4gICAgICAgICAgICBjb25zdCBkYXRhVHlwZSA9IGJpbmRpbmdEZXNjcmlwdG9yLmRhdGFUeXBlO1xyXG4gICAgICAgICAgICAvLyBnZXQgdGhlIGJpbmRpbmcgaWQgZm9yIHRoZSB0YXJnZXQgb2JqZWN0XHJcbiAgICAgICAgICAgIGNvbnN0IGJpbmRpbmdJZCA9IGJpbmRpbmdEZXNjcmlwdG9yLmZ1bGxJZDtcclxuXHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBlbmRwb2ludCBpcyBhIGZ1bmN0aW9uXHJcbiAgICAgICAgICAgIGNvbnN0IGVuZFBvaW50SXNNZXRob2QgPSB0aGlzLmVuZFBvaW50SXNGdW5jdGlvbihjb25uZWN0aW9uVGFyZ2V0LCBiaW5kaW5nRGVzY3JpcHRvci50YXJnZXRLZXkpO1xyXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgZW5kcG9pbnQgaXMgYSBwcm9wZXJ0eVxyXG4gICAgICAgICAgICBjb25zdCBlbmRQb2ludElzUHJvcGVydHkgPSB0aGlzLmVuZFBvaW50SXNQcm9wZXJ0eShjb25uZWN0aW9uVGFyZ2V0LCBiaW5kaW5nRGVzY3JpcHRvci50YXJnZXRLZXkpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIGJpbmQgdGhlIHRhcmdldCBlbmRwb2ludCBhY2NvcmRpbmcgdG8gdGhlIGhhbmRsZXIgdHlwZVxyXG4gICAgICAgICAgICBpZiAoZW5kUG9pbnRJc01ldGhvZCkge1xyXG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSB0YXJnZXQgaGFuZGxlclxyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0QmluZGluZ0NoYW5nZWRIYW5kbGVyID0gY29ubmVjdGlvblRhcmdldFtiaW5kaW5nRGVzY3JpcHRvci50YXJnZXRLZXldO1xyXG4gICAgICAgICAgICAgICAgLy8gYmluZCB0aGUgbWV0aG9kIGhhbmRsZXJcclxuICAgICAgICAgICAgICAgIHRoaXMuYmluZFRhcmdldE1ldGhvZChjb25uZWN0aW9uVGFyZ2V0LCB0YXJnZXRCaW5kaW5nQ2hhbmdlZEhhbmRsZXIsIGRhdGFUeXBlLCBiaW5kaW5nSWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gYmluZCB0aGUgcHJvcGVydHkgaGFuZGxlclxyXG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kVGFyZ2V0UHJvcGVydHkoY29ubmVjdGlvblRhcmdldCwgYmluZGluZ0Rlc2NyaXB0b3IudGFyZ2V0S2V5LCBkYXRhVHlwZSwgYmluZGluZ0lkKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ29tcG9uZW50QmluZGluZzogVGhlIGJpbmRpbmcga2V5ICVvIGlzIG5vdCBjb250YWluZWQgaW4gJW8hIFwiLCBiaW5kaW5nRGVzY3JpcHRvci50YXJnZXRLZXksIGNvbXBvbmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQmluZHMgYSB0YXJnZXQgbWV0aG9kIHRvIGEgYmluZGFibGUgdmFsdWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGNvbm5lY3Rpb25UYXJnZXRcclxuICAgICAqIEBwYXJhbSB7VEJpbmRhYmxlQ2hhbmdlZEhhbmRsZXJ9IHRhcmdldEJpbmRpbmdWYWx1ZUNoYW5nZWRIYW5kbGVyXHJcbiAgICAgKiBAcGFyYW0ge1RDb25uZWN0aW9uRGF0YVR5cGV9IGRhdGFUeXBlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2JpbmRpbmdJZD1cIlwiXVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJpbmRpbmdDb25uZWN0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgYmluZFRhcmdldE1ldGhvZChjb25uZWN0aW9uVGFyZ2V0OiBvYmplY3QsIHRhcmdldEJpbmRpbmdWYWx1ZUNoYW5nZWRIYW5kbGVyOiBUQmluZGFibGVDaGFuZ2VkSGFuZGxlciwgZGF0YVR5cGU6IFRDb25uZWN0aW9uRGF0YVR5cGUsIGJpbmRpbmdJZDogc3RyaW5nID0gXCJcIikge1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgdGhlIGRhdGEgY2hhbmdlZCBoYW5kbGVyIGZvciBhbiB1cGRhdGUgbWV0aG9kIGNhbGxcclxuICAgICAgICBjb25zdCBiaW5kaW5nVmFsdWVDaGFuZ2VkSGFuZGxlcjogVEJpbmRhYmxlQ2hhbmdlZEhhbmRsZXIgPSAobmV3VmFsdWUsIG9sZFZhbHVlKSA9PiB0aGlzLmludm9rZVRhcmdldE1ldGhvZChuZXdWYWx1ZSwgb2xkVmFsdWUsIGNvbm5lY3Rpb25UYXJnZXQsIHRhcmdldEJpbmRpbmdWYWx1ZUNoYW5nZWRIYW5kbGVyLCBkYXRhVHlwZSk7XHJcblxyXG4gICAgICAgIC8vIG9ic2VydmUgdGhlIHN0YXRlIGNoYW5nZSBhbmQgZm9yd2FyZCB0aGUgbm90aWZpY2F0aW9uIHRvIHRoZSB0YXJnZXQgaGFuZGxlclxyXG4gICAgICAgIHRoaXMuc2hhcmVkUHJvcGVydGllcy5vYnNlcnZlKGNvbm5lY3Rpb25UYXJnZXQsZGF0YVR5cGUsIGJpbmRpbmdWYWx1ZUNoYW5nZWRIYW5kbGVyLCBiaW5kaW5nSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW52b2tlcyB0aGUgY29tcG9uZW50cyB0YXJnZXQgbWV0aG9kIHdoZW4gYSBiaW5kYWJsZSB2YWx1ZSBoYXMgYmVlbiBjaGFuZ2VkLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IG5ld1ZhbHVlXHJcbiAgICAgKiBAcGFyYW0geyp9IG9sZFZhbHVlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gY29ubmVjdGlvblRhcmdldFxyXG4gICAgICogQHBhcmFtIHtUQmluZGFibGVDaGFuZ2VkSGFuZGxlcn0gdGFyZ2V0QmluZGluZ1ZhbHVlQ2hhbmdlZEhhbmRsZXJcclxuICAgICAqIEBwYXJhbSB7VENvbm5lY3Rpb25EYXRhVHlwZX0gZGF0YVR5cGVcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCaW5kaW5nQ29ubmVjdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGludm9rZVRhcmdldE1ldGhvZChuZXdWYWx1ZTogYW55LCBvbGRWYWx1ZTogYW55LCBjb25uZWN0aW9uVGFyZ2V0OiBvYmplY3QsIHRhcmdldEJpbmRpbmdWYWx1ZUNoYW5nZWRIYW5kbGVyOiBUQmluZGFibGVDaGFuZ2VkSGFuZGxlciwgZGF0YVR5cGU6IFRDb25uZWN0aW9uRGF0YVR5cGUpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgY29uc3QgbW9kaWZpZWRUeXBlID0gbmV3VmFsdWUgPyB0eXBlb2YgbmV3VmFsdWUgPT09IFwib2JqZWN0XCIgPyBuZXdWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lIDogdHlwZW9mIG5ld1ZhbHVlIDogdW5kZWZpbmVkO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldERhdGFUeXBlID0gZGF0YVR5cGUgPyB0eXBlb2YgZGF0YVR5cGUgPT09IFwic3RyaW5nXCIgPyBkYXRhVHlwZSA6IGRhdGFUeXBlLm5hbWUgOiB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIGlmICghZGF0YVR5cGUgfHwgKG1vZGlmaWVkVHlwZSA9PT0gdGFyZ2V0RGF0YVR5cGUpKSB7XHJcbiAgICAgICAgICAgIHRhcmdldEJpbmRpbmdWYWx1ZUNoYW5nZWRIYW5kbGVyLmJpbmQoY29ubmVjdGlvblRhcmdldCkobmV3VmFsdWUsIG9sZFZhbHVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ29tcG9uZW50QmluZGluZzogY291bGQgbm90IGludm9rZSAlbyBiZWNhdXNlIGRhdGEgdHlwZXMgZG8gbm90IG1hdGNoIVwiLCBjb25uZWN0aW9uVGFyZ2V0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCaW5kcyBhIGNvbXBvbmVudCBwcm9wZXJ0eSB0byBhIGJpbmRhYmxlIHZhbHVlLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gYmluZGluZ1RhcmdldFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRhcmdldE1lbWJlck5hbWVcclxuICAgICAqIEBwYXJhbSB7VENvbm5lY3Rpb25EYXRhVHlwZX0gZGF0YVR5cGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBiaW5kaW5nSWRcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCaW5kaW5nQ29ubmVjdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGJpbmRUYXJnZXRQcm9wZXJ0eShiaW5kaW5nVGFyZ2V0OiBvYmplY3QsIHRhcmdldE1lbWJlck5hbWU6IHN0cmluZywgZGF0YVR5cGU6IFRDb25uZWN0aW9uRGF0YVR5cGUsIGJpbmRpbmdJZDogc3RyaW5nKSB7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgZGF0YSBjaGFuZ2VkIGhhbmRsZXIgZm9yIGEgcHJvcGVydHkgdXBkYXRlXHJcbiAgICAgICAgY29uc3QgYmluZGluZ1ZhbHVlQ2hhbmdlZEhhbmRsZXI6IFRCaW5kYWJsZUNoYW5nZWRIYW5kbGVyID0gKG5ld1ZhbHVlKSA9PiB0aGlzLnVwZGF0ZVRhcmdldFByb3BlcnR5KGJpbmRpbmdUYXJnZXQsIG5ld1ZhbHVlLCB0YXJnZXRNZW1iZXJOYW1lLCBkYXRhVHlwZSk7XHJcblxyXG4gICAgICAgIC8vIG9ic2VydmUgdGhlIGRhdGEgY2hhbmdlIGFuZCBmb3J3YXJkIHRoZSBub3RpZmljYXRpb24gdG8gdGhlIHByb3BlcnR5IGNoYW5nZWQgaGFuZGxlciBcclxuICAgICAgICB0aGlzLnNoYXJlZFByb3BlcnRpZXMub2JzZXJ2ZShiaW5kaW5nVGFyZ2V0LGRhdGFUeXBlLCBiaW5kaW5nVmFsdWVDaGFuZ2VkSGFuZGxlciwgYmluZGluZ0lkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGNvbXBvbmVudHMgcHJvcGVydHkgd2hlbiBhIGJpbmRhYmxlIHZhbHVlIGhhcyBiZWVuIGNoYW5nZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBiaW5kaW5nVGFyZ2V0XHJcbiAgICAgKiBAcGFyYW0geyp9IG5ld1ZhbHVlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGFyZ2V0TWVtYmVyTmFtZVxyXG4gICAgICogQHBhcmFtIHtUQ29ubmVjdGlvbkRhdGFUeXBlfSBkYXRhVHlwZVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJpbmRpbmdDb25uZWN0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdXBkYXRlVGFyZ2V0UHJvcGVydHkoYmluZGluZ1RhcmdldDogb2JqZWN0LCBuZXdWYWx1ZTogYW55LCB0YXJnZXRNZW1iZXJOYW1lOiBzdHJpbmcsIGRhdGFUeXBlOiBUQ29ubmVjdGlvbkRhdGFUeXBlKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGNvbnN0IG1vZGlmaWVkVHlwZSA9IG5ld1ZhbHVlID8gdHlwZW9mIG5ld1ZhbHVlID09PSBcIm9iamVjdFwiID8gbmV3VmFsdWUuY29uc3RydWN0b3IubmFtZSA6IHR5cGVvZiBuZXdWYWx1ZSA6IHVuZGVmaW5lZDtcclxuICAgICAgICBjb25zdCB0YXJnZXREYXRhVHlwZSA9IGRhdGFUeXBlID8gdHlwZW9mIGRhdGFUeXBlID09PSBcInN0cmluZ1wiID8gZGF0YVR5cGUgOiBkYXRhVHlwZS5uYW1lIDogdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAvL1RPRE86IG1ha2Ugc3VyZSB0aGF0IHRoZSBtb2RpZmllZCB0eXBlIGFuZCBiaW5kaW5nIHR5cGUgYXJlIG1hdGNoaW5nXHJcbiAgICAgICAgLy8gaWYgKCFkYXRhVHlwZSB8fCAobW9kaWZpZWRUeXBlID09PSB0YXJnZXREYXRhVHlwZSkpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBiaW5kaW5nVGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIGlmIChrZXkgPT09IHRhcmdldE1lbWJlck5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGJpbmRpbmdUYXJnZXRbdGFyZ2V0TWVtYmVyTmFtZV0gPSBuZXdWYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGVybWluZXMgaWYgdGhlIGVuZCBwb2ludCBpcyBhIGZ1bmN0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBjb25uZWN0aW9uVGFyZ2V0XHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJpbmRpbmdDb25uZWN0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZW5kUG9pbnRJc0Z1bmN0aW9uKGNvbm5lY3Rpb25UYXJnZXQ6IG9iamVjdCwgdGFyZ2V0TWVtYmVyTmFtZTogc3RyaW5nKSB7XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgdGFyZ2V0IGhhbmRsZXJcclxuICAgICAgICBjb25zdCBjb25uZWN0aW9uUG9pbnRIYW5kbGVyID0gY29ubmVjdGlvblRhcmdldFt0YXJnZXRNZW1iZXJOYW1lXTtcclxuXHJcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGVuZHBvaW50IGlzIGEgZnVuY3Rpb25cclxuICAgICAgICBjb25zdCBlbmRQb2ludElzRnVuY3Rpb24gPSBjb25uZWN0aW9uUG9pbnRIYW5kbGVyIGluc3RhbmNlb2YgRnVuY3Rpb247XHJcblxyXG4gICAgICAgIHJldHVybiBlbmRQb2ludElzRnVuY3Rpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBlbmQgcG9pbnQgaXMgYSBwcm9wZXJ0eVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gY29ubmVjdGlvblRhcmdldFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCaW5kaW5nQ29ubmVjdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGVuZFBvaW50SXNQcm9wZXJ0eShjb25uZWN0aW9uVGFyZ2V0OiBvYmplY3QsIHRhcmdldE1lbWJlck5hbWU6IHN0cmluZykge1xyXG5cclxuICAgICAgICAvLyBjaGVjayBpZiB0aGUgZW5kcG9pbnQgaXMgYSBwcm9wZXJ0eVxyXG4gICAgICAgIGNvbnN0IHRhcmdldEJhc2VPd25zUHJvcGVydHkgPSBjb25uZWN0aW9uVGFyZ2V0LmNvbnN0cnVjdG9yLnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSh0YXJnZXRNZW1iZXJOYW1lKTtcclxuICAgICAgICBjb25zdCB0YXJnZXRPd25zUHJvcGVydHkgPSBjb25uZWN0aW9uVGFyZ2V0LmNvbnN0cnVjdG9yLnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSh0YXJnZXRNZW1iZXJOYW1lKTtcclxuXHJcbiAgICAgICAgY29uc3QgZW5kUG9pbnRJc1Byb3BlcnR5ID0gdGFyZ2V0T3duc1Byb3BlcnR5ICYmICF0aGlzLmVuZFBvaW50SXNGdW5jdGlvbihjb25uZWN0aW9uVGFyZ2V0LCB0YXJnZXRNZW1iZXJOYW1lKTtcclxuICAgICAgICByZXR1cm4gZW5kUG9pbnRJc1Byb3BlcnR5O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVuYmluZHMgYSB3aG9sZSBjb21wb25lbnQgb3IgdGhlIGJpbmRpbmcgc3BlY2lmaWVkIGJ5IHRoZSBiaW5kaW5nIGRlY2xhcmF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHsob2JqZWN0IHwgQ29tcG9uZW50QmluZGluZyl9IGJpbmRpbmdPYmplY3RcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCaW5kaW5nQ29ubmVjdG9yXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyB1bmJpbmQoYmluZGluZ09iamVjdDogb2JqZWN0IHwgQ29tcG9uZW50QmluZGluZykge1xyXG4gXHJcbiAgICAgICAgaWYgKGJpbmRpbmdPYmplY3QgaW5zdGFuY2VvZiBDb21wb25lbnRCaW5kaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMudW5iaW5kQmluZGluZyhiaW5kaW5nT2JqZWN0IGFzIENvbXBvbmVudEJpbmRpbmcpOyAgICAgICAgXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMudW5iaW5kQ29tcG9uZW50KGJpbmRpbmdPYmplY3QpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVbmJpbmRzIGEgc3BlY2lmaWMgYmluZGluZ1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJpbmRpbmd9IGJpbmRpbmdEZWNsYXJhdGlvblxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJpbmRpbmdDb25uZWN0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdW5iaW5kQmluZGluZyhiaW5kaW5nRGVjbGFyYXRpb246IENvbXBvbmVudEJpbmRpbmcpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2Qgbm90IGltcGxlbWVudGVkLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVuYmluZHMgYWxsIGJpbmRpbmdzIHJlbGF0ZWQgdG8gdGhlIGJvdW5kIG9iamVjdFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gYm91bmRPYmplY3RcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCaW5kaW5nQ29ubmVjdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHVuYmluZENvbXBvbmVudChib3VuZE9iamVjdDogb2JqZWN0KSB7XHJcbiBcclxuICAgICAgICAvLyBkZXRhY2ggdGhlIGJvdW5kIG9iamVjdCBmcm9tIGFsbCBzaGFyZWQgcHJvcGVydGllc1xyXG4gICAgICAgIHRoaXMuc2hhcmVkUHJvcGVydGllcy5kZXRhY2goYm91bmRPYmplY3QpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgYSBzaGFyZWQgZGF0YSBpdGVtIHNwZWNpZmllZCBieSBzY29wZSBhbmQgaWRcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAdGVtcGxhdGUgVERhdGFUeXBlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gY2FsbGVyXHJcbiAgICAgKiBAcGFyYW0ge1REYXRhVHlwZX0gdmFsdWVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaGFyZWREYXRhU2NvcGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaGFyZWREYXRhSWRcclxuICAgICAqIEBwYXJhbSB7KGltcG9ydChcIi4uL2NvbXBvbmVudERhdGFTZXJ2aWNlXCIpLlNoYXJlZERhdGFUeXBlIHwgdW5kZWZpbmVkKX0gc2hhcmVkRGF0YVR5cGVcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCaW5kaW5nQ29ubmVjdG9yXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyB1cGRhdGVTaGFyZWREYXRhPFREYXRhVHlwZT4oY2FsbGVyOiBvYmplY3QsIHZhbHVlOiBURGF0YVR5cGUsIHNoYXJlZERhdGFTY29wZTogc3RyaW5nLCBzaGFyZWREYXRhSWQ6IHN0cmluZywgc2hhcmVkRGF0YVR5cGU6IFRDb25uZWN0aW9uRGF0YVR5cGUgfCB1bmRlZmluZWQpIHtcclxuICAgICAgICBcclxuICAgICAgICAvLyBnZXQgdGhlIGZ1bGwgaWRcclxuICAgICAgICBjb25zdCBzaGFyZWRJZCA9IHNoYXJlZERhdGFTY29wZSArICcuJyArIHNoYXJlZERhdGFJZDtcclxuICAgICAgICAvLyB1cGRhdGUgdGhlIGNvcnJlc3BvbmRpbmcgYmluZGluZyB2YWx1ZVxyXG4gICAgICAgIHRoaXMuc2hhcmVkUHJvcGVydGllcy51cGRhdGUoY2FsbGVyLHNoYXJlZERhdGFUeXBlLCB2YWx1ZSwgc2hhcmVkSWQsIGZhbHNlKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyBhIHNoYXJlZCBkYXRhIGl0ZW0gc3BlY2lmaWVkIGJ5IHNjb3BlIGFuZCBpZFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEB0ZW1wbGF0ZSBURGF0YVR5cGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBjYWxsZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaGFyZWREYXRhU2NvcGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaGFyZWREYXRhSWRcclxuICAgICAqIEBwYXJhbSB7VFN0b3JlSXRlbUNvbnN0cnVjdG9yfSBzaGFyZWREYXRhVHlwZVxyXG4gICAgICogQHJldHVybnMge1REYXRhVHlwZX1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCaW5kaW5nQ29ubmVjdG9yXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByZWFkU2hhcmVkRGF0YTxURGF0YVR5cGU+KGNhbGxlcjogb2JqZWN0LCBzaGFyZWREYXRhU2NvcGU6IHN0cmluZywgc2hhcmVkRGF0YUlkOiBzdHJpbmcsIHNoYXJlZERhdGFUeXBlOiBUU3RvcmVJdGVtQ29uc3RydWN0b3IpOiBURGF0YVR5cGUge1xyXG5cclxuICAgICAgICAvLyBnZXQgdGhlIGZ1bGwgaWRcclxuICAgICAgICBjb25zdCBzaGFyZWRJZCA9IHNoYXJlZERhdGFTY29wZSArICcuJyArIHNoYXJlZERhdGFJZDtcclxuXHJcbiAgICAgICAgLy8gcmVhZCBhbmQgcmV0dXJuIHRoZSByZXF1ZXN0ZWQgaXRlbSBmcm9tIHRoZSBzdG9yZVxyXG4gICAgICAgIHJldHVybiAgdGhpcy5zaGFyZWRQcm9wZXJ0aWVzLnJlYWQoc2hhcmVkRGF0YVR5cGUsc2hhcmVkSWQpO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuIl19