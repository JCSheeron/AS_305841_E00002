define(["require", "exports", "../common/utilities/dataBox", "../common/utilities/objectx", "./reflection/metaClassReflectionInfo", "../framework/reflection/decorators/metaClassPropertyDecorator", "./componentHub/common/commonTypes"], function (require, exports, dataBox_1, objectx_1, metaClassReflectionInfo_1, Reflection, commonTypes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Implements a typed data link.
     *
     *
     *
     * @class Property
     * @template T
     */
    var Property = /** @class */ (function () {
        /**
         *Creates an instance of DataLink.
         *    @memberof Property
         */
        function Property(initialValue, valueReadRequest, valueWriteRequest, valueGetter) {
            if (valueGetter === void 0) { valueGetter = undefined; }
            // Holds the change notification callbacks    
            this._valueChangedCallbacks = [];
            // specifies a read response delegate called after a read has successfully been executed.
            this._readResponseDelegates = [];
            // specifies the read rejection delegates
            this._readRejectionResponseDelegates = [];
            // specifies a write response delegate called after a read has successfully been executed.
            this._writeResponseDelegate = undefined;
            // specifies a read response delegate called after a write request has  been rejected.
            this._writeResponseRejectionDelegate = undefined;
            // specifies the write rejection delegate
            this._writeRejectionResponseDelegate = undefined;
            // specifies the data link read request state
            this._readRequestState = PropertyRequestState.Ready;
            // specifies the data link read request state
            this._writeRequestState = PropertyRequestState.Ready;
            // holds observers
            this._observers = [];
            // holds accessors, meaning objects updating the property values
            this._accessors = [];
            this._valueReadRequestDelegate = valueReadRequest;
            this._valueWriteRequestDelegate = valueWriteRequest;
            this._value = initialValue;
            this._readRequestState = PropertyRequestState.Ready;
            this._writeRequestState = PropertyRequestState.Ready;
            this._valueGetter = valueGetter;
        }
        /**
         * Attaches an accessor instance.
         *
         * @param {object} accessorInstance
         * @memberof Property
         */
        Property.prototype.attachAccessor = function (accessorInstance) {
            this.addAccessor(accessorInstance);
        };
        /**
         * Adds an accessor
         *
         * @private
         * @param {object} caller
         * @memberof Property
         */
        Property.prototype.addAccessor = function (caller) {
            this.accessors.push(new PropertyClient(caller));
        };
        /**
         * Detaches the bound object as accessor
         *
         * @param {object} boundObject
         * @memberof Property
         */
        Property.prototype.detachAccessor = function (boundObject) {
            // remove the client object from the accessors list
            this.removeAccessor(boundObject);
        };
        /**
         * Removes an accessor instance
         *
         * @private
         * @param {object} boundObject
         * @memberof Property
         */
        Property.prototype.removeAccessor = function (boundObject) {
            this._accessors = this._accessors.filter(function (accessor) { return accessor.client != boundObject; });
        };
        /**
         * Attaches the caller as observer
         *
         * @param {object} caller
         * @memberof Property
         */
        Property.prototype.attachObserver = function (caller, propertyValueChangedDelegate, storeItemTypeConstructor) {
            if (storeItemTypeConstructor === void 0) { storeItemTypeConstructor = null; }
            // add the caller as observer
            this.addObserver(caller, propertyValueChangedDelegate);
            // get an initialization value.
            var initValue = this.getInitValue(storeItemTypeConstructor);
            // attach the change notification callback
            this.observePropertyValue(propertyValueChangedDelegate, storeItemTypeConstructor, initValue);
        };
        /**
         * Adds an observer instance
         *
         * @private
         * @param {object} caller
         * @param {T_PROPERTYCHANGED_HANDLER} propertyValueChangedDelegate
         * @memberof Property
         */
        Property.prototype.addObserver = function (caller, propertyValueChangedDelegate) {
            this.observers.push(new PropertyClient(caller, propertyValueChangedDelegate));
        };
        /**
         * Obseres the property value and calls the specified changed delegate after changes.
         *
         * @private
         * @param {T_PROPERTYCHANGED_HANDLER} propertyValueChangedDelegate
         * @memberof Property
         */
        Property.prototype.observePropertyValue = function (propertyValueChangedDelegate, storeItemTypeConstructor, initValue) {
            this.changed(propertyValueChangedDelegate, storeItemTypeConstructor, initValue);
        };
        /**
         * Detaches the bound object as accessor
         *
         * @param {object} boundObject
         * @memberof Property
         */
        Property.prototype.detachObserver = function (boundObject) {
            // get the observer client object
            var observerClient = this._observers.find(function (observer) { return observer.client === boundObject; });
            if (observerClient) {
                if (observerClient.valueChangedHandler) {
                    // remove the observers delegate from the changed notifications
                    this.removeValueChangedDelegate(observerClient.valueChangedHandler);
                    // remove the client object from the accessors list
                    this.removeObserver(observerClient);
                }
            }
        };
        /**
         * Removes an observer
         *
         * @private
         * @param {PropertyClient} observerClient
         * @memberof Property
         */
        Property.prototype.removeObserver = function (observerClient) {
            this._observers = this._observers.filter(function (observer) { return observer.client != observerClient.client; });
        };
        /**
         * Removes the specified value changed delagate
         *addval
         * @private
         * @param {PropertyClient} observerClient
         * @memberof Property
         */
        Property.prototype.removeValueChangedDelegate = function (valueChangedDelegate) {
            this._valueChangedCallbacks = this._valueChangedCallbacks.filter(function (vaueChangedHandler) { return vaueChangedHandler != valueChangedDelegate; });
        };
        /**
         * Returns true if the property is already observed by the specified instance
         *
         * @param {object} observer
         * @returns {boolean}
         * @memberof Property
         */
        Property.prototype.isObservedBy = function (observerInstance) {
            return this.observers.find(function (observer) { return observer.client === observerInstance; }) !== undefined;
        };
        /**
         * Returns true if the property is already registered to be accessed by the specified instance
         *
         * @param {object} accessor
         * @returns {boolean}
         * @memberof Property
         */
        Property.prototype.isAccessedBy = function (accessorInstance) {
            return this.accessors.find(function (accessor) { return accessor.client === accessorInstance; }) !== undefined;
        };
        Object.defineProperty(Property.prototype, "isAttached", {
            /**
             * Gets true if the property is attached, meaning accessed or observed.
             *
             * @readonly
             * @type {boolean}
             * @memberof Property
             */
            get: function () {
                return this.observers.length > 0 || this.accessors.length > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Property.prototype, "observers", {
            /**
             * Gets the properties observers
             *
             * @readonly
             * @type {Array<PropertyClient>}
             * @memberof Property
             */
            get: function () {
                return this._observers;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Property.prototype, "accessors", {
            /**
             * Gets the properties accessors
             *
             * @readonly
             * @type { Array<PropertyClient> }
             * @memberof Property
             */
            get: function () {
                return this._accessors;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Creates a new DataLink object with the specified type
         *
         * @static
         * @template T
         * @param {T} initialValue
         * @returns
         * @memberof Property
         */
        Property.create = function (initialValue, valueReadRequest, valueWriteRequest, valueGetter) {
            if (valueReadRequest === void 0) { valueReadRequest = undefined; }
            if (valueWriteRequest === void 0) { valueWriteRequest = undefined; }
            if (valueGetter === void 0) { valueGetter = undefined; }
            valueReadRequest = valueReadRequest ? valueReadRequest : Property.DEFAULT_READ_REQUEST_HANDLER;
            valueWriteRequest = valueWriteRequest ? valueWriteRequest : Property.DEFAULT_WRITE_REQUEST_HANDLER;
            valueGetter = valueGetter ? valueGetter : Property.DEFAULT_VALUE_GETTER;
            return new Property(initialValue, valueReadRequest, valueWriteRequest, valueGetter);
        };
        /**
         * Gets an init value for the property to be passed when attaching and updating the consumer the first time.
         *
         * @private
         * @param {(TStoreItemConstructor | null)} storeItemTypeConstructor
         * @returns
         * @memberof Property
         */
        Property.prototype.getInitValue = function (storeItemTypeConstructor) {
            // if there is a known type (storeItemConstructor) we use a copy of the existing instance as init value.
            return storeItemTypeConstructor ? Property.copyValue(this._value, storeItemTypeConstructor) : this._value;
        };
        Object.defineProperty(Property.prototype, "value", {
            /**
             * Gets the property object value.
             *
             * @type {T}
             * @memberof Property
             */
            get: function () {
                var value = this._value;
                // get the value via the value getter delegate, if defined. Otherwise use the original value.
                if (this._valueGetter) {
                    value = this._valueGetter(value);
                }
                return value;
            },
            /**
             * Sets the DataLink Objects value.
             *
             * @memberof Property
             */
            set: function (newValue) {
                var oldValue = this._value;
                this._value = newValue;
                this.onValueChanged(this._value, oldValue);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Updates the properties value.
         *
         * @param {*} newValue
         * @param {TStoreItemConstructor} propertyValueType
         * @memberof Property
         */
        Property.prototype.update = function (newValue, propertyValueType) {
            var oldValue = this._value;
            // update the value with a copy
            this._value = Property.copyValue(newValue, propertyValueType);
            // forward a value copy to the changed consumers ..
            var copiedValue = Property.copyValue(newValue, propertyValueType);
            // _value and the forwarded value need to be different instances (copies) to provide proper updating!
            this.onValueChanged(copiedValue, oldValue, propertyValueType);
        };
        /**
         * Called whenever the value has been set. Notifies listeners from a value change
         *
         * @param {T} _value
         * @returns {*}
         * @memberof Property
         */
        Property.prototype.onValueChanged = function (newValue, oldValue, propertyValueType) {
            if (propertyValueType === void 0) { propertyValueType = null; }
            // invoke the value changed callbacks
            this._valueChangedCallbacks.forEach(function (callback) { callback(newValue, oldValue); });
        };
        /**
         * Called whenever the property value has been changed
         *
         * @param {(newValue: T, oldValue: T) => void} onValueChangedCallBack
         * @param {(TStoreItemConstructor|null)} [propertyValueType=null] specefies the type of th property value.
         * @memberof Property
         */
        Property.prototype.changed = function (onValueChangedCallBack, propertyValueType, initValue) {
            if (propertyValueType === void 0) { propertyValueType = null; }
            if (initValue === void 0) { initValue = null; }
            if (!this._valueChangedCallbacks.includes(onValueChangedCallBack)) {
                // add the new handler
                this.addValueChangedDelegate(onValueChangedCallBack);
                // if there is already a value or init value available, we forward it to the new listener.
                var initialChangedValue = initValue ? initValue : this._value;
                if (initialChangedValue) {
                    this.onValueChanged(initialChangedValue, this._value, propertyValueType);
                }
            }
            else {
                console.error("Property change already observed by the same handler");
            }
        };
        /**
         * Adds the specified value changed delegate.
         *
         * @private
         * @param {T_PROPERTYCHANGED_HANDLER} onValueChangedDelegate
         * @memberof Property
         */
        Property.prototype.addValueChangedDelegate = function (onValueChangedDelegate) {
            this._valueChangedCallbacks.push(onValueChangedDelegate);
        };
        /**
         * Forces a refresh o the data links value
         *
         * @memberof Property
         */
        Property.prototype.read = function (readResponseDelegate, rejectionResponseDelegate) {
            // add a response delegate for every read caller. This makes sure, that more callers possibly from different components, receive the results as well !
            if (readResponseDelegate === void 0) { readResponseDelegate = undefined; }
            if (rejectionResponseDelegate === void 0) { rejectionResponseDelegate = undefined; }
            // add read request delegate 
            if (readResponseDelegate) {
                this._readResponseDelegates.push(readResponseDelegate);
            }
            // add read rejection delegate
            if (rejectionResponseDelegate) {
                this._readRejectionResponseDelegates.push(rejectionResponseDelegate);
            }
            // invoke the read request if not already running
            if (this._readRequestState === PropertyRequestState.Ready) {
                this.beginReadRequest();
            }
        };
        /**
         * Starts the request for reading a data links value. The method delgates the request to the callback if defined.
         *
         * @private
         * @memberof Property
         */
        Property.prototype.beginReadRequest = function () {
            this._readRequestState = PropertyRequestState.Pending;
            if (this._valueReadRequestDelegate) {
                this._valueReadRequestDelegate(this);
            }
        };
        /**
         * Called after a read request has been executed successfully
         *
         * @param {T} componentParameters
         * @memberof Property
         */
        Property.prototype.readRequestExecuted = function (readResult) {
            var _this = this;
            // update the data links value
            this.value = readResult;
            // recall response handler and pass the updated value
            this._readResponseDelegates.forEach(function (readResponseDelegate) {
                readResponseDelegate(_this.value);
            });
            // after processing the response calls, the current response list is obsolete!
            this.endReadRequest();
        };
        /**
         * Called after a read request has been rejetced
         *
         * @param {*} error
         * @memberof Property
         */
        Property.prototype.readRequestRejected = function (error) {
            // recall response handler and pass the updated value
            this._readRejectionResponseDelegates.forEach(function (readRejectionResponseDelegate) {
                readRejectionResponseDelegate(error);
            });
            this.endReadRequest();
        };
        /**
         * Terminates a read request
         *
         * @private
         * @memberof Property
         */
        Property.prototype.endReadRequest = function () {
            this._readResponseDelegates = [];
            this._readRequestState = PropertyRequestState.Ready;
        };
        /**
         * Forces a write of the data link value to the value provider
         *
         * @param {*} newValue
         * @param {(((writeResult:T)=>void)|undefined)} [writeResponseDelegate=undefined]
         * @memberof Property
         */
        Property.prototype.write = function (writeResponseDelegate, writeRejectionDelegate) {
            if (writeResponseDelegate === void 0) { writeResponseDelegate = undefined; }
            if (writeRejectionDelegate === void 0) { writeRejectionDelegate = undefined; }
            this._writeResponseDelegate = writeResponseDelegate;
            if (this._writeRequestState === PropertyRequestState.Ready) {
                this.beginWriteRequest();
            }
        };
        /**
         * Terminates the write request
         *
         * @private
         * @memberof Property
         */
        Property.prototype.endWriteRequest = function () {
            this._writeResponseDelegate = undefined;
            this._writeRequestState = PropertyRequestState.Ready;
        };
        /**
         * Starts the request for writing a data links value. The method delgates the request to the callback if defined.
         *
         * @param {*} newValue
         * @returns {*}
         * @memberof Property
         */
        Property.prototype.beginWriteRequest = function () {
            this._writeRequestState = PropertyRequestState.Pending;
            if (this._valueWriteRequestDelegate) {
                this._valueWriteRequestDelegate(this);
            }
        };
        /**
         * Called after a write request has been executed successfully
         *
         * @param {T} writeResult
         * @memberof Property
         */
        Property.prototype.writeRequestExecuted = function (writeResult) {
            // recall response handler and pass the updated value
            if (this._writeResponseDelegate) {
                this._writeResponseDelegate(writeResult);
            }
            // after processing the response calls, the current response list is obsolete!
            this.endWriteRequest();
        };
        /**
         * Called after a write request has been rejected
         *
         * @param {*} error
         * @memberof Property
         */
        Property.prototype.writeRequestRejected = function (error) {
            // recall response handler and pass the updated value
            if (this._writeResponseRejectionDelegate) {
                this._writeResponseRejectionDelegate(error);
            }
            this.endWriteRequest();
        };
        /**
         * Copies the item value to prohibit any indirect change of the original value.
         *
         * @private
         * @template STOREITEMTYPE
         * @param {STOREITEMTYPE} newValue
         * @param {*} storeItemTypeConstructor
         * @returns {STOREITEMTYPE}
         * @memberof Property
         */
        Property.copyValue = function (newValue, storeItemTypeConstructor) {
            // retrieve the instances transfer type
            var transferType = newValue.constructor ? metaClassReflectionInfo_1.MetaClassReflectionInfo.getClassMetaPropertyValue(newValue.constructor, Reflection.MetaClassProperty.transferType) : undefined;
            // should the data be transferred by value ?
            var transferByValue = transferType !== undefined && transferType === commonTypes_1.DataTransferType.byValue;
            // if the value is boxed (should be passed as reference ) we just use the unboxed value. 
            // ... otherwise we transfer the object as specified by the transfer type .... if any.
            // all other objects are just passed through without modification or copying.
            return newValue instanceof dataBox_1.DataBox ? newValue.Unbox() : transferByValue ? objectx_1.ObjectX.clone(storeItemTypeConstructor, newValue) : newValue;
        };
        // specifies a default handler for the read request
        Property.DEFAULT_READ_REQUEST_HANDLER = function () { console.error("Property: Read request can not be executed because the request handler is undefined!"); };
        // specifies a default handler for the read request
        Property.DEFAULT_WRITE_REQUEST_HANDLER = function () { console.error("Property: Write request can not be executed because the request handler is undefined!"); };
        // specefies the default value getter
        Property.DEFAULT_VALUE_GETTER = function (value) { return value; };
        return Property;
    }());
    exports.Property = Property;
    var PropertyRequestState;
    (function (PropertyRequestState) {
        PropertyRequestState[PropertyRequestState["Ready"] = 0] = "Ready";
        PropertyRequestState[PropertyRequestState["Pending"] = 1] = "Pending";
    })(PropertyRequestState || (PropertyRequestState = {}));
    var PropertyClient = /** @class */ (function () {
        function PropertyClient(client, changedHandler) {
            if (changedHandler === void 0) { changedHandler = null; }
            this._client = client;
            this._changedHandler = changedHandler;
        }
        Object.defineProperty(PropertyClient.prototype, "client", {
            get: function () {
                return this._client;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropertyClient.prototype, "valueChangedHandler", {
            get: function () {
                return this._changedHandler;
            },
            enumerable: true,
            configurable: true
        });
        return PropertyClient;
    }());
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBwL2ZyYW1ld29yay9wcm9wZXJ0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFVQTs7Ozs7OztPQU9HO0lBRUg7UUF1Q0k7OztXQUdHO1FBQ0gsa0JBQXNCLFlBQWUsRUFBRSxnQkFBbUQsRUFBRSxpQkFBb0QsRUFBRSxXQUFxRDtZQUFyRCw0QkFBQSxFQUFBLHVCQUFxRDtZQXRDdk0sOENBQThDO1lBQ3RDLDJCQUFzQixHQUFxQyxFQUFFLENBQUM7WUFZdEUseUZBQXlGO1lBQ2pGLDJCQUFzQixHQUErQixFQUFFLENBQUM7WUFDaEUseUNBQXlDO1lBQ2pDLG9DQUErQixHQUFpQyxFQUFFLENBQUM7WUFDM0UsMEZBQTBGO1lBQ2xGLDJCQUFzQixHQUF1QyxTQUFTLENBQUM7WUFDL0Usc0ZBQXNGO1lBQzlFLG9DQUErQixHQUEyQyxTQUFTLENBQUM7WUFDNUYseUNBQXlDO1lBQ2pDLG9DQUErQixHQUEyQyxTQUFTLENBQUM7WUFDNUYsNkNBQTZDO1lBQ3JDLHNCQUFpQixHQUF5QixvQkFBb0IsQ0FBQyxLQUFLLENBQUM7WUFDN0UsNkNBQTZDO1lBQ3JDLHVCQUFrQixHQUF5QixvQkFBb0IsQ0FBQyxLQUFLLENBQUM7WUFHOUUsa0JBQWtCO1lBQ1YsZUFBVSxHQUEyQixFQUFFLENBQUM7WUFDaEQsZ0VBQWdFO1lBQ3hELGVBQVUsR0FBMkIsRUFBRSxDQUFDO1lBTzVDLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxnQkFBZ0IsQ0FBQztZQUNsRCxJQUFJLENBQUMsMEJBQTBCLEdBQUcsaUJBQWlCLENBQUM7WUFDcEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUM7WUFDM0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLG9CQUFvQixDQUFDLEtBQUssQ0FBQztZQUNwRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsb0JBQW9CLENBQUMsS0FBSyxDQUFDO1lB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QUFXLGtDQUFNO2lCQUFqQjtnQkFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUE7WUFDdkIsQ0FBQzs7O1dBQUE7UUFJRCxzQkFBVywrQ0FBbUI7aUJBQTlCO2dCQUNJLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQTtZQUMvQixDQUFDOzs7V0FBQTtRQUlMLHFCQUFDO0lBQUQsQ0FBQyxBQXpCRCxJQXlCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGFCb3ggfSBmcm9tIFwiLi4vY29tbW9uL3V0aWxpdGllcy9kYXRhQm94XCI7XHJcbmltcG9ydCB7IE9iamVjdFggfSBmcm9tIFwiLi4vY29tbW9uL3V0aWxpdGllcy9vYmplY3R4XCI7XHJcbmltcG9ydCB7IE1ldGFDbGFzc1Byb3BlcnR5IH0gZnJvbSBcIi4vcmVmbGVjdGlvbi9tZXRhQ2xhc3NQcm9wZXJ0aWVzXCI7XHJcbmltcG9ydCB7IE1ldGFDbGFzc1JlZmxlY3Rpb25JbmZvIH0gZnJvbSBcIi4vcmVmbGVjdGlvbi9tZXRhQ2xhc3NSZWZsZWN0aW9uSW5mb1wiO1xyXG5pbXBvcnQgeyBUU3RvcmVJdGVtQ29uc3RydWN0b3IgfSBmcm9tIFwiLi9zdG9yZVwiO1xyXG5pbXBvcnQgKiBhcyBSZWZsZWN0aW9uICBmcm9tIFwiLi4vZnJhbWV3b3JrL3JlZmxlY3Rpb24vZGVjb3JhdG9ycy9tZXRhQ2xhc3NQcm9wZXJ0eURlY29yYXRvclwiO1xyXG5pbXBvcnQgeyBEYXRhVHJhbnNmZXJUeXBlIH0gZnJvbSBcIi4vY29tcG9uZW50SHViL2NvbW1vbi9jb21tb25UeXBlc1wiO1xyXG5cclxudHlwZSBUX1BST1BFUlRZQ0hBTkdFRF9IQU5ETEVSID0gIChuZXdWYWx1ZTogYW55LCBvbGRWYWx1ZTogYW55KSA9PiB2b2lkO1xyXG5cclxuLyoqXHJcbiAqIEltcGxlbWVudHMgYSB0eXBlZCBkYXRhIGxpbmsuIFxyXG4gKiBcclxuICogXHJcbiAqXHJcbiAqIEBjbGFzcyBQcm9wZXJ0eVxyXG4gKiBAdGVtcGxhdGUgVFxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBQcm9wZXJ0eTxUPiB7XHJcblxyXG4gICAgLy8gSG9sZHMgdGhlIHZhbHVlXHJcbiAgICBwcml2YXRlIF92YWx1ZSE6IFQ7XHJcblxyXG4gICAgLy8gSG9sZHMgdGhlIGNoYW5nZSBub3RpZmljYXRpb24gY2FsbGJhY2tzICAgIFxyXG4gICAgcHJpdmF0ZSBfdmFsdWVDaGFuZ2VkQ2FsbGJhY2tzOiBBcnJheTxUX1BST1BFUlRZQ0hBTkdFRF9IQU5ETEVSPiA9IFtdO1xyXG4gICAgLy8gaG9sZHMgYSBjYWxsYmFjayBoYW5kbGVyIGZvciBhIGZvcmNlZCByZWFkIG9mIHRoZSB2YWx1ZVxyXG4gICAgcHJpdmF0ZSBfdmFsdWVSZWFkUmVxdWVzdERlbGVnYXRlOiAocHJvcGVydHk6IFByb3BlcnR5PFQ+KSA9PiB2b2lkO1xyXG4gICAgLy8gaG9sZHMgYSBjYWxsYmFjayBoYW5kbGVyIGZvciBhIGZvcmNlZCB3cml0ZSByZXF1ZXN0XHJcbiAgICBwcml2YXRlIF92YWx1ZVdyaXRlUmVxdWVzdERlbGVnYXRlOiAoKHByb3BlcnR5OiBQcm9wZXJ0eTxUPikgPT4gdm9pZCk7XHJcbiAgICAvLyBzcGVjaWZpZXMgYSBkZWZhdWx0IGhhbmRsZXIgZm9yIHRoZSByZWFkIHJlcXVlc3RcclxuICAgIHByaXZhdGUgc3RhdGljIERFRkFVTFRfUkVBRF9SRVFVRVNUX0hBTkRMRVI6ICgocHJvcGVydHk6IFByb3BlcnR5PGFueT4pID0+IHZvaWQpID0gKCkgPT4geyBjb25zb2xlLmVycm9yKFwiUHJvcGVydHk6IFJlYWQgcmVxdWVzdCBjYW4gbm90IGJlIGV4ZWN1dGVkIGJlY2F1c2UgdGhlIHJlcXVlc3QgaGFuZGxlciBpcyB1bmRlZmluZWQhXCIpOyB9O1xyXG4gICAgLy8gc3BlY2lmaWVzIGEgZGVmYXVsdCBoYW5kbGVyIGZvciB0aGUgcmVhZCByZXF1ZXN0XHJcbiAgICBwcml2YXRlIHN0YXRpYyBERUZBVUxUX1dSSVRFX1JFUVVFU1RfSEFORExFUjogKChwcm9wZXJ0eTogUHJvcGVydHk8YW55PikgPT4gdm9pZCkgPSAoKSA9PiB7IGNvbnNvbGUuZXJyb3IoXCJQcm9wZXJ0eTogV3JpdGUgcmVxdWVzdCBjYW4gbm90IGJlIGV4ZWN1dGVkIGJlY2F1c2UgdGhlIHJlcXVlc3QgaGFuZGxlciBpcyB1bmRlZmluZWQhXCIpOyB9O1xyXG4gICAgLy8gc3BlY2VmaWVzIHRoZSBkZWZhdWx0IHZhbHVlIGdldHRlclxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgREVGQVVMVF9WQUxVRV9HRVRURVI6ICgodmFsdWU6IGFueSkgPT4gYW55KSA9ICh2YWx1ZSkgPT4geyAgcmV0dXJuIHZhbHVlOyB9O1xyXG4gICBcclxuICAgIC8vIHNwZWNpZmllcyBhIHJlYWQgcmVzcG9uc2UgZGVsZWdhdGUgY2FsbGVkIGFmdGVyIGEgcmVhZCBoYXMgc3VjY2Vzc2Z1bGx5IGJlZW4gZXhlY3V0ZWQuXHJcbiAgICBwcml2YXRlIF9yZWFkUmVzcG9uc2VEZWxlZ2F0ZXM6IElQcm9wZXJ0eVJlYWRSZXNwb25zZTxUPltdID0gW107XHJcbiAgICAvLyBzcGVjaWZpZXMgdGhlIHJlYWQgcmVqZWN0aW9uIGRlbGVnYXRlc1xyXG4gICAgcHJpdmF0ZSBfcmVhZFJlamVjdGlvblJlc3BvbnNlRGVsZWdhdGVzOiBJUHJvcGVydHlSZWplY3Rpb25SZXNwb25zZVtdID0gW107XHJcbiAgICAvLyBzcGVjaWZpZXMgYSB3cml0ZSByZXNwb25zZSBkZWxlZ2F0ZSBjYWxsZWQgYWZ0ZXIgYSByZWFkIGhhcyBzdWNjZXNzZnVsbHkgYmVlbiBleGVjdXRlZC5cclxuICAgIHByaXZhdGUgX3dyaXRlUmVzcG9uc2VEZWxlZ2F0ZTogSVByb3BlcnR5V3JpdGVSZXNwb25zZSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgIC8vIHNwZWNpZmllcyBhIHJlYWQgcmVzcG9uc2UgZGVsZWdhdGUgY2FsbGVkIGFmdGVyIGEgd3JpdGUgcmVxdWVzdCBoYXMgIGJlZW4gcmVqZWN0ZWQuXHJcbiAgICBwcml2YXRlIF93cml0ZVJlc3BvbnNlUmVqZWN0aW9uRGVsZWdhdGU6IElQcm9wZXJ0eVJlamVjdGlvblJlc3BvbnNlIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgLy8gc3BlY2lmaWVzIHRoZSB3cml0ZSByZWplY3Rpb24gZGVsZWdhdGVcclxuICAgIHByaXZhdGUgX3dyaXRlUmVqZWN0aW9uUmVzcG9uc2VEZWxlZ2F0ZTogSVByb3BlcnR5UmVqZWN0aW9uUmVzcG9uc2UgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAvLyBzcGVjaWZpZXMgdGhlIGRhdGEgbGluayByZWFkIHJlcXVlc3Qgc3RhdGVcclxuICAgIHByaXZhdGUgX3JlYWRSZXF1ZXN0U3RhdGU6IFByb3BlcnR5UmVxdWVzdFN0YXRlID0gUHJvcGVydHlSZXF1ZXN0U3RhdGUuUmVhZHk7XHJcbiAgICAvLyBzcGVjaWZpZXMgdGhlIGRhdGEgbGluayByZWFkIHJlcXVlc3Qgc3RhdGVcclxuICAgIHByaXZhdGUgX3dyaXRlUmVxdWVzdFN0YXRlOiBQcm9wZXJ0eVJlcXVlc3RTdGF0ZSA9IFByb3BlcnR5UmVxdWVzdFN0YXRlLlJlYWR5O1xyXG4gICAgLy8gaG9sZHMgdGhlIHZhbHVlIGdldHRlciBkZWxlZ2F0ZVxyXG4gICAgcHJpdmF0ZSBfdmFsdWVHZXR0ZXI6ICgodmFsdWU6IFQpID0+IFQpIHwgdW5kZWZpbmVkO1xyXG4gICAgLy8gaG9sZHMgb2JzZXJ2ZXJzXHJcbiAgICBwcml2YXRlIF9vYnNlcnZlcnM6IEFycmF5PFByb3BlcnR5Q2xpZW50ID4gPSBbXTtcclxuICAgIC8vIGhvbGRzIGFjY2Vzc29ycywgbWVhbmluZyBvYmplY3RzIHVwZGF0aW5nIHRoZSBwcm9wZXJ0eSB2YWx1ZXNcclxuICAgIHByaXZhdGUgX2FjY2Vzc29yczogQXJyYXk8UHJvcGVydHlDbGllbnQgPiA9IFtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICpDcmVhdGVzIGFuIGluc3RhbmNlIG9mIERhdGFMaW5rLlxyXG4gICAgICogICAgQG1lbWJlcm9mIFByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3Rvcihpbml0aWFsVmFsdWU6IFQsIHZhbHVlUmVhZFJlcXVlc3Q6ICgoZGF0YUxpbms6IFByb3BlcnR5PFQ+KSA9PiB2b2lkKSwgdmFsdWVXcml0ZVJlcXVlc3Q6ICgoZGF0YUxpbms6IFByb3BlcnR5PFQ+KSA9PiB2b2lkKSwgdmFsdWVHZXR0ZXI6ICgodmFsdWU6VCkgPT4gVCkgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLl92YWx1ZVJlYWRSZXF1ZXN0RGVsZWdhdGUgPSB2YWx1ZVJlYWRSZXF1ZXN0O1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlV3JpdGVSZXF1ZXN0RGVsZWdhdGUgPSB2YWx1ZVdyaXRlUmVxdWVzdDtcclxuICAgICAgICB0aGlzLl92YWx1ZSA9IGluaXRpYWxWYWx1ZTtcclxuICAgICAgICB0aGlzLl9yZWFkUmVxdWVzdFN0YXRlID0gUHJvcGVydHlSZXF1ZXN0U3RhdGUuUmVhZHk7XHJcbiAgICAgICAgdGhpcy5fd3JpdGVSZXF1ZXN0U3RhdGUgPSBQcm9wZXJ0eVJlcXVlc3RTdGF0ZS5SZWFkeTtcclxuICAgICAgICB0aGlzLl92YWx1ZUdldHRlciA9IHZhbHVlR2V0dGVyO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRhY2hlcyBhbiBhY2Nlc3NvciBpbnN0YW5jZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gYWNjZXNzb3JJbnN0YW5jZVxyXG4gICAgICogQG1lbWJlcm9mIFByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhdHRhY2hBY2Nlc3NvcihhY2Nlc3Nvckluc3RhbmNlOiBvYmplY3QpIHtcclxuICAgICAgICB0aGlzLmFkZEFjY2Vzc29yKGFjY2Vzc29ySW5zdGFuY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhbiBhY2Nlc3NvclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gY2FsbGVyXHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRBY2Nlc3NvcihjYWxsZXI6IG9iamVjdCkge1xyXG4gICAgICAgIHRoaXMuYWNjZXNzb3JzLnB1c2gobmV3IFByb3BlcnR5Q2xpZW50KGNhbGxlcikpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0YWNoZXMgdGhlIGJvdW5kIG9iamVjdCBhcyBhY2Nlc3NvclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBib3VuZE9iamVjdFxyXG4gICAgICogQG1lbWJlcm9mIFByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkZXRhY2hBY2Nlc3Nvcihib3VuZE9iamVjdDogb2JqZWN0KSB7XHJcbiAgICAgICAgLy8gcmVtb3ZlIHRoZSBjbGllbnQgb2JqZWN0IGZyb20gdGhlIGFjY2Vzc29ycyBsaXN0XHJcbiAgICAgICAgdGhpcy5yZW1vdmVBY2Nlc3Nvcihib3VuZE9iamVjdCk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYW4gYWNjZXNzb3IgaW5zdGFuY2VcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGJvdW5kT2JqZWN0XHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZW1vdmVBY2Nlc3Nvcihib3VuZE9iamVjdDogb2JqZWN0KSB7XHJcbiAgICAgICAgdGhpcy5fYWNjZXNzb3JzID0gdGhpcy5fYWNjZXNzb3JzLmZpbHRlcigoYWNjZXNzb3IpID0+IHsgcmV0dXJuIGFjY2Vzc29yLmNsaWVudCAhPSBib3VuZE9iamVjdDsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRhY2hlcyB0aGUgY2FsbGVyIGFzIG9ic2VydmVyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGNhbGxlclxyXG4gICAgICogQG1lbWJlcm9mIFByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhdHRhY2hPYnNlcnZlcihjYWxsZXI6IG9iamVjdCwgIHByb3BlcnR5VmFsdWVDaGFuZ2VkRGVsZWdhdGU6VF9QUk9QRVJUWUNIQU5HRURfSEFORExFUixzdG9yZUl0ZW1UeXBlQ29uc3RydWN0b3I6IFRTdG9yZUl0ZW1Db25zdHJ1Y3RvcnxudWxsID0gbnVsbCkge1xyXG5cclxuICAgICAgICAvLyBhZGQgdGhlIGNhbGxlciBhcyBvYnNlcnZlclxyXG4gICAgICAgIHRoaXMuYWRkT2JzZXJ2ZXIoY2FsbGVyLCBwcm9wZXJ0eVZhbHVlQ2hhbmdlZERlbGVnYXRlKTtcclxuXHJcbiAgICAgICAgLy8gZ2V0IGFuIGluaXRpYWxpemF0aW9uIHZhbHVlLlxyXG4gICAgICAgIGxldCBpbml0VmFsdWUgPSB0aGlzLmdldEluaXRWYWx1ZShzdG9yZUl0ZW1UeXBlQ29uc3RydWN0b3IpO1xyXG5cclxuICAgICAgICAvLyBhdHRhY2ggdGhlIGNoYW5nZSBub3RpZmljYXRpb24gY2FsbGJhY2tcclxuICAgICAgICB0aGlzLm9ic2VydmVQcm9wZXJ0eVZhbHVlKHByb3BlcnR5VmFsdWVDaGFuZ2VkRGVsZWdhdGUsc3RvcmVJdGVtVHlwZUNvbnN0cnVjdG9yLGluaXRWYWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGFuIG9ic2VydmVyIGluc3RhbmNlIFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gY2FsbGVyXHJcbiAgICAgKiBAcGFyYW0ge1RfUFJPUEVSVFlDSEFOR0VEX0hBTkRMRVJ9IHByb3BlcnR5VmFsdWVDaGFuZ2VkRGVsZWdhdGVcclxuICAgICAqIEBtZW1iZXJvZiBQcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZE9ic2VydmVyKGNhbGxlcjogb2JqZWN0LCBwcm9wZXJ0eVZhbHVlQ2hhbmdlZERlbGVnYXRlOiBUX1BST1BFUlRZQ0hBTkdFRF9IQU5ETEVSKSB7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZlcnMucHVzaChuZXcgUHJvcGVydHlDbGllbnQoY2FsbGVyLCBwcm9wZXJ0eVZhbHVlQ2hhbmdlZERlbGVnYXRlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYnNlcmVzIHRoZSBwcm9wZXJ0eSB2YWx1ZSBhbmQgY2FsbHMgdGhlIHNwZWNpZmllZCBjaGFuZ2VkIGRlbGVnYXRlIGFmdGVyIGNoYW5nZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7VF9QUk9QRVJUWUNIQU5HRURfSEFORExFUn0gcHJvcGVydHlWYWx1ZUNoYW5nZWREZWxlZ2F0ZVxyXG4gICAgICogQG1lbWJlcm9mIFByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb2JzZXJ2ZVByb3BlcnR5VmFsdWUocHJvcGVydHlWYWx1ZUNoYW5nZWREZWxlZ2F0ZTogVF9QUk9QRVJUWUNIQU5HRURfSEFORExFUixzdG9yZUl0ZW1UeXBlQ29uc3RydWN0b3I6IFRTdG9yZUl0ZW1Db25zdHJ1Y3RvcnxudWxsLGluaXRWYWx1ZTphbnl8bnVsbCkge1xyXG4gICAgICAgIHRoaXMuY2hhbmdlZChwcm9wZXJ0eVZhbHVlQ2hhbmdlZERlbGVnYXRlLHN0b3JlSXRlbVR5cGVDb25zdHJ1Y3Rvcixpbml0VmFsdWUpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGFjaGVzIHRoZSBib3VuZCBvYmplY3QgYXMgYWNjZXNzb3JcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gYm91bmRPYmplY3RcclxuICAgICAqIEBtZW1iZXJvZiBQcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGV0YWNoT2JzZXJ2ZXIoYm91bmRPYmplY3Q6IG9iamVjdCkge1xyXG5cclxuICAgICAgICAvLyBnZXQgdGhlIG9ic2VydmVyIGNsaWVudCBvYmplY3RcclxuICAgICAgICBjb25zdCBvYnNlcnZlckNsaWVudCA9IHRoaXMuX29ic2VydmVycy5maW5kKChvYnNlcnZlcikgPT4geyByZXR1cm4gb2JzZXJ2ZXIuY2xpZW50ID09PSBib3VuZE9iamVjdCB9KTtcclxuICAgICAgICBpZiAob2JzZXJ2ZXJDbGllbnQpIHtcclxuICAgICAgICAgICAgaWYgKG9ic2VydmVyQ2xpZW50LnZhbHVlQ2hhbmdlZEhhbmRsZXIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgdGhlIG9ic2VydmVycyBkZWxlZ2F0ZSBmcm9tIHRoZSBjaGFuZ2VkIG5vdGlmaWNhdGlvbnNcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlVmFsdWVDaGFuZ2VkRGVsZWdhdGUob2JzZXJ2ZXJDbGllbnQudmFsdWVDaGFuZ2VkSGFuZGxlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSBjbGllbnQgb2JqZWN0IGZyb20gdGhlIGFjY2Vzc29ycyBsaXN0XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZU9ic2VydmVyKG9ic2VydmVyQ2xpZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGFuIG9ic2VydmVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7UHJvcGVydHlDbGllbnR9IG9ic2VydmVyQ2xpZW50XHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZW1vdmVPYnNlcnZlcihvYnNlcnZlckNsaWVudDogUHJvcGVydHlDbGllbnQpIHtcclxuICAgICAgICB0aGlzLl9vYnNlcnZlcnMgPSB0aGlzLl9vYnNlcnZlcnMuZmlsdGVyKChvYnNlcnZlcikgPT4geyByZXR1cm4gb2JzZXJ2ZXIuY2xpZW50ICE9IG9ic2VydmVyQ2xpZW50LmNsaWVudDsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIHRoZSBzcGVjaWZpZWQgdmFsdWUgY2hhbmdlZCBkZWxhZ2F0ZVxyXG4gICAgICphZGR2YWxcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1Byb3BlcnR5Q2xpZW50fSBvYnNlcnZlckNsaWVudFxyXG4gICAgICogQG1lbWJlcm9mIFByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVtb3ZlVmFsdWVDaGFuZ2VkRGVsZWdhdGUodmFsdWVDaGFuZ2VkRGVsZWdhdGU6IFRfUFJPUEVSVFlDSEFOR0VEX0hBTkRMRVIpIHtcclxuICAgICAgICB0aGlzLl92YWx1ZUNoYW5nZWRDYWxsYmFja3MgPSB0aGlzLl92YWx1ZUNoYW5nZWRDYWxsYmFja3MuZmlsdGVyKCh2YXVlQ2hhbmdlZEhhbmRsZXIpID0+IHsgcmV0dXJuIHZhdWVDaGFuZ2VkSGFuZGxlciAhPSB2YWx1ZUNoYW5nZWREZWxlZ2F0ZTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHByb3BlcnR5IGlzIGFscmVhZHkgb2JzZXJ2ZWQgYnkgdGhlIHNwZWNpZmllZCBpbnN0YW5jZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvYnNlcnZlclxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGlzT2JzZXJ2ZWRCeShvYnNlcnZlckluc3RhbmNlOiBvYmplY3QpOmJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9ic2VydmVycy5maW5kKChvYnNlcnZlcik9PnsgcmV0dXJuIG9ic2VydmVyLmNsaWVudCA9PT0gb2JzZXJ2ZXJJbnN0YW5jZX0pICE9PSB1bmRlZmluZWQgO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgcHJvcGVydHkgaXMgYWxyZWFkeSByZWdpc3RlcmVkIHRvIGJlIGFjY2Vzc2VkIGJ5IHRoZSBzcGVjaWZpZWQgaW5zdGFuY2VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gYWNjZXNzb3JcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIFByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpc0FjY2Vzc2VkQnkoYWNjZXNzb3JJbnN0YW5jZTogb2JqZWN0KTpib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hY2Nlc3NvcnMuZmluZCgoYWNjZXNzb3IpPT57IHJldHVybiBhY2Nlc3Nvci5jbGllbnQgPT09IGFjY2Vzc29ySW5zdGFuY2V9KSAhPT0gdW5kZWZpbmVkIDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRydWUgaWYgdGhlIHByb3BlcnR5IGlzIGF0dGFjaGVkLCBtZWFuaW5nIGFjY2Vzc2VkIG9yIG9ic2VydmVkLlxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBpc0F0dGFjaGVkKCkgOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5vYnNlcnZlcnMubGVuZ3RoID4gMCB8fCB0aGlzLmFjY2Vzc29ycy5sZW5ndGggPiAwO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgcHJvcGVydGllcyBvYnNlcnZlcnNcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtBcnJheTxQcm9wZXJ0eUNsaWVudD59XHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXQgb2JzZXJ2ZXJzKCkgOiBBcnJheTxQcm9wZXJ0eUNsaWVudD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9vYnNlcnZlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBwcm9wZXJ0aWVzIGFjY2Vzc29yc1xyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUgeyBBcnJheTxQcm9wZXJ0eUNsaWVudD4gfVxyXG4gICAgICogQG1lbWJlcm9mIFByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0IGFjY2Vzc29ycygpIDogIEFycmF5PFByb3BlcnR5Q2xpZW50PiAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hY2Nlc3NvcnM7XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgRGF0YUxpbmsgb2JqZWN0IHdpdGggdGhlIHNwZWNpZmllZCB0eXBlXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHRlbXBsYXRlIFRcclxuICAgICAqIEBwYXJhbSB7VH0gaW5pdGlhbFZhbHVlXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjcmVhdGU8VD4oaW5pdGlhbFZhbHVlOiBULCB2YWx1ZVJlYWRSZXF1ZXN0OiAoKGRhdGFMaW5rOiBQcm9wZXJ0eTxUPikgPT4gdm9pZCkgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQsIHZhbHVlV3JpdGVSZXF1ZXN0OiAoKGRhdGFMaW5rOiBQcm9wZXJ0eTxUPikgPT4gdm9pZCkgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQsIHZhbHVlR2V0dGVyOiAoKHZhbHVlOlQpID0+IFQpIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkKSB7XHJcblxyXG5cclxuICAgICAgICB2YWx1ZVJlYWRSZXF1ZXN0ID0gdmFsdWVSZWFkUmVxdWVzdCA/IHZhbHVlUmVhZFJlcXVlc3QgOiBQcm9wZXJ0eS5ERUZBVUxUX1JFQURfUkVRVUVTVF9IQU5ETEVSO1xyXG4gICAgICAgIHZhbHVlV3JpdGVSZXF1ZXN0ID0gdmFsdWVXcml0ZVJlcXVlc3QgPyB2YWx1ZVdyaXRlUmVxdWVzdCA6IFByb3BlcnR5LkRFRkFVTFRfV1JJVEVfUkVRVUVTVF9IQU5ETEVSO1xyXG4gICAgICAgIHZhbHVlR2V0dGVyID0gdmFsdWVHZXR0ZXIgPyB2YWx1ZUdldHRlciA6IFByb3BlcnR5LkRFRkFVTFRfVkFMVUVfR0VUVEVSO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFByb3BlcnR5KGluaXRpYWxWYWx1ZSwgdmFsdWVSZWFkUmVxdWVzdCwgdmFsdWVXcml0ZVJlcXVlc3QsdmFsdWVHZXR0ZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIGFuIGluaXQgdmFsdWUgZm9yIHRoZSBwcm9wZXJ0eSB0byBiZSBwYXNzZWQgd2hlbiBhdHRhY2hpbmcgYW5kIHVwZGF0aW5nIHRoZSBjb25zdW1lciB0aGUgZmlyc3QgdGltZS5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsoVFN0b3JlSXRlbUNvbnN0cnVjdG9yIHwgbnVsbCl9IHN0b3JlSXRlbVR5cGVDb25zdHJ1Y3RvclxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBQcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICAgcHJpdmF0ZSBnZXRJbml0VmFsdWUoc3RvcmVJdGVtVHlwZUNvbnN0cnVjdG9yOiBUU3RvcmVJdGVtQ29uc3RydWN0b3IgfCBudWxsKSB7XHJcblxyXG4gICAgICAgIC8vIGlmIHRoZXJlIGlzIGEga25vd24gdHlwZSAoc3RvcmVJdGVtQ29uc3RydWN0b3IpIHdlIHVzZSBhIGNvcHkgb2YgdGhlIGV4aXN0aW5nIGluc3RhbmNlIGFzIGluaXQgdmFsdWUuXHJcbiAgICAgICAgcmV0dXJuIHN0b3JlSXRlbVR5cGVDb25zdHJ1Y3RvciA/IFByb3BlcnR5LmNvcHlWYWx1ZSh0aGlzLl92YWx1ZSwgc3RvcmVJdGVtVHlwZUNvbnN0cnVjdG9yKSA6IHRoaXMuX3ZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgRGF0YUxpbmsgT2JqZWN0cyB2YWx1ZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCB2YWx1ZShuZXdWYWx1ZTogVCkge1xyXG5cclxuICAgICAgICBsZXQgb2xkVmFsdWUgPSB0aGlzLl92YWx1ZTtcclxuICAgICAgICB0aGlzLl92YWx1ZSA9IG5ld1ZhbHVlO1xyXG5cclxuICAgICAgICB0aGlzLm9uVmFsdWVDaGFuZ2VkKHRoaXMuX3ZhbHVlLCBvbGRWYWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBwcm9wZXJ0eSBvYmplY3QgdmFsdWUuXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge1R9XHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB2YWx1ZSgpOiBUIHtcclxuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLl92YWx1ZTtcclxuICAgICAgICAvLyBnZXQgdGhlIHZhbHVlIHZpYSB0aGUgdmFsdWUgZ2V0dGVyIGRlbGVnYXRlLCBpZiBkZWZpbmVkLiBPdGhlcndpc2UgdXNlIHRoZSBvcmlnaW5hbCB2YWx1ZS5cclxuICAgICAgICBpZiAodGhpcy5fdmFsdWVHZXR0ZXIpIHtcclxuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLl92YWx1ZUdldHRlcih2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHByb3BlcnRpZXMgdmFsdWUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBuZXdWYWx1ZVxyXG4gICAgICogQHBhcmFtIHtUU3RvcmVJdGVtQ29uc3RydWN0b3J9IHByb3BlcnR5VmFsdWVUeXBlXHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVwZGF0ZShuZXdWYWx1ZTogYW55LCBwcm9wZXJ0eVZhbHVlVHlwZTogVFN0b3JlSXRlbUNvbnN0cnVjdG9yKSB7XHJcbiAgICAgIFxyXG4gICAgICAgIGxldCBvbGRWYWx1ZSA9IHRoaXMuX3ZhbHVlO1xyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgdmFsdWUgd2l0aCBhIGNvcHlcclxuICAgICAgICB0aGlzLl92YWx1ZSA9IFByb3BlcnR5LmNvcHlWYWx1ZShuZXdWYWx1ZSxwcm9wZXJ0eVZhbHVlVHlwZSk7XHJcbiAgICAgICAgLy8gZm9yd2FyZCBhIHZhbHVlIGNvcHkgdG8gdGhlIGNoYW5nZWQgY29uc3VtZXJzIC4uXHJcbiAgICAgICAgbGV0IGNvcGllZFZhbHVlID0gUHJvcGVydHkuY29weVZhbHVlKG5ld1ZhbHVlLHByb3BlcnR5VmFsdWVUeXBlKTtcclxuXHJcbiAgICAgICAgLy8gX3ZhbHVlIGFuZCB0aGUgZm9yd2FyZGVkIHZhbHVlIG5lZWQgdG8gYmUgZGlmZmVyZW50IGluc3RhbmNlcyAoY29waWVzKSB0byBwcm92aWRlIHByb3BlciB1cGRhdGluZyFcclxuICAgICAgICB0aGlzLm9uVmFsdWVDaGFuZ2VkKGNvcGllZFZhbHVlLCBvbGRWYWx1ZSxwcm9wZXJ0eVZhbHVlVHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgd2hlbmV2ZXIgdGhlIHZhbHVlIGhhcyBiZWVuIHNldC4gTm90aWZpZXMgbGlzdGVuZXJzIGZyb20gYSB2YWx1ZSBjaGFuZ2VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1R9IF92YWx1ZVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblZhbHVlQ2hhbmdlZChuZXdWYWx1ZTogVCwgb2xkVmFsdWU6IFQscHJvcGVydHlWYWx1ZVR5cGU6IFRTdG9yZUl0ZW1Db25zdHJ1Y3RvcnxudWxsID0gbnVsbCk6IGFueSB7XHJcblxyXG4gICAgICAgIC8vIGludm9rZSB0aGUgdmFsdWUgY2hhbmdlZCBjYWxsYmFja3NcclxuICAgICAgICB0aGlzLl92YWx1ZUNoYW5nZWRDYWxsYmFja3MuZm9yRWFjaCgoY2FsbGJhY2spID0+IHsgY2FsbGJhY2sobmV3VmFsdWUsIG9sZFZhbHVlKSB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgd2hlbmV2ZXIgdGhlIHByb3BlcnR5IHZhbHVlIGhhcyBiZWVuIGNoYW5nZWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyhuZXdWYWx1ZTogVCwgb2xkVmFsdWU6IFQpID0+IHZvaWR9IG9uVmFsdWVDaGFuZ2VkQ2FsbEJhY2tcclxuICAgICAqIEBwYXJhbSB7KFRTdG9yZUl0ZW1Db25zdHJ1Y3RvcnxudWxsKX0gW3Byb3BlcnR5VmFsdWVUeXBlPW51bGxdIHNwZWNlZmllcyB0aGUgdHlwZSBvZiB0aCBwcm9wZXJ0eSB2YWx1ZS5cclxuICAgICAqIEBtZW1iZXJvZiBQcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBjaGFuZ2VkKG9uVmFsdWVDaGFuZ2VkQ2FsbEJhY2s6IChuZXdWYWx1ZTogVCwgb2xkVmFsdWU6IFQpID0+IHZvaWQscHJvcGVydHlWYWx1ZVR5cGU6IFRTdG9yZUl0ZW1Db25zdHJ1Y3RvcnxudWxsPW51bGwsaW5pdFZhbHVlOmFueXxudWxsID0gbnVsbCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5fdmFsdWVDaGFuZ2VkQ2FsbGJhY2tzLmluY2x1ZGVzKG9uVmFsdWVDaGFuZ2VkQ2FsbEJhY2spKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBhZGQgdGhlIG5ldyBoYW5kbGVyXHJcbiAgICAgICAgICAgIHRoaXMuYWRkVmFsdWVDaGFuZ2VkRGVsZWdhdGUob25WYWx1ZUNoYW5nZWRDYWxsQmFjayk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBhbHJlYWR5IGEgdmFsdWUgb3IgaW5pdCB2YWx1ZSBhdmFpbGFibGUsIHdlIGZvcndhcmQgaXQgdG8gdGhlIG5ldyBsaXN0ZW5lci5cclxuICAgICAgICAgICAgbGV0IGluaXRpYWxDaGFuZ2VkVmFsdWUgPSBpbml0VmFsdWUgPyBpbml0VmFsdWUgOiB0aGlzLl92YWx1ZTtcclxuICAgICAgICAgICAgaWYgKGluaXRpYWxDaGFuZ2VkVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25WYWx1ZUNoYW5nZWQoaW5pdGlhbENoYW5nZWRWYWx1ZSx0aGlzLl92YWx1ZSxwcm9wZXJ0eVZhbHVlVHlwZSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlByb3BlcnR5IGNoYW5nZSBhbHJlYWR5IG9ic2VydmVkIGJ5IHRoZSBzYW1lIGhhbmRsZXJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyB0aGUgc3BlY2lmaWVkIHZhbHVlIGNoYW5nZWQgZGVsZWdhdGUuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7VF9QUk9QRVJUWUNIQU5HRURfSEFORExFUn0gb25WYWx1ZUNoYW5nZWREZWxlZ2F0ZVxyXG4gICAgICogQG1lbWJlcm9mIFByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkVmFsdWVDaGFuZ2VkRGVsZWdhdGUob25WYWx1ZUNoYW5nZWREZWxlZ2F0ZTogVF9QUk9QRVJUWUNIQU5HRURfSEFORExFUikge1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlQ2hhbmdlZENhbGxiYWNrcy5wdXNoKG9uVmFsdWVDaGFuZ2VkRGVsZWdhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRm9yY2VzIGEgcmVmcmVzaCBvIHRoZSBkYXRhIGxpbmtzIHZhbHVlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHJlYWQocmVhZFJlc3BvbnNlRGVsZWdhdGU6IElQcm9wZXJ0eVJlYWRSZXNwb25zZTxUPiB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZCwgcmVqZWN0aW9uUmVzcG9uc2VEZWxlZ2F0ZTogSVByb3BlcnR5UmVqZWN0aW9uUmVzcG9uc2UgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQpIHtcclxuXHJcbiAgICAgICAgLy8gYWRkIGEgcmVzcG9uc2UgZGVsZWdhdGUgZm9yIGV2ZXJ5IHJlYWQgY2FsbGVyLiBUaGlzIG1ha2VzIHN1cmUsIHRoYXQgbW9yZSBjYWxsZXJzIHBvc3NpYmx5IGZyb20gZGlmZmVyZW50IGNvbXBvbmVudHMsIHJlY2VpdmUgdGhlIHJlc3VsdHMgYXMgd2VsbCAhXHJcblxyXG4gICAgICAgIC8vIGFkZCByZWFkIHJlcXVlc3QgZGVsZWdhdGUgXHJcbiAgICAgICAgaWYgKHJlYWRSZXNwb25zZURlbGVnYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlYWRSZXNwb25zZURlbGVnYXRlcy5wdXNoKHJlYWRSZXNwb25zZURlbGVnYXRlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGFkZCByZWFkIHJlamVjdGlvbiBkZWxlZ2F0ZVxyXG4gICAgICAgIGlmIChyZWplY3Rpb25SZXNwb25zZURlbGVnYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlYWRSZWplY3Rpb25SZXNwb25zZURlbGVnYXRlcy5wdXNoKHJlamVjdGlvblJlc3BvbnNlRGVsZWdhdGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaW52b2tlIHRoZSByZWFkIHJlcXVlc3QgaWYgbm90IGFscmVhZHkgcnVubmluZ1xyXG4gICAgICAgIGlmICh0aGlzLl9yZWFkUmVxdWVzdFN0YXRlID09PSBQcm9wZXJ0eVJlcXVlc3RTdGF0ZS5SZWFkeSkge1xyXG4gICAgICAgICAgICB0aGlzLmJlZ2luUmVhZFJlcXVlc3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RhcnRzIHRoZSByZXF1ZXN0IGZvciByZWFkaW5nIGEgZGF0YSBsaW5rcyB2YWx1ZS4gVGhlIG1ldGhvZCBkZWxnYXRlcyB0aGUgcmVxdWVzdCB0byB0aGUgY2FsbGJhY2sgaWYgZGVmaW5lZC5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYmVnaW5SZWFkUmVxdWVzdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9yZWFkUmVxdWVzdFN0YXRlID0gUHJvcGVydHlSZXF1ZXN0U3RhdGUuUGVuZGluZztcclxuICAgICAgICBpZiAodGhpcy5fdmFsdWVSZWFkUmVxdWVzdERlbGVnYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlUmVhZFJlcXVlc3REZWxlZ2F0ZSh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIGFmdGVyIGEgcmVhZCByZXF1ZXN0IGhhcyBiZWVuIGV4ZWN1dGVkIHN1Y2Nlc3NmdWxseVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7VH0gY29tcG9uZW50UGFyYW1ldGVyc1xyXG4gICAgICogQG1lbWJlcm9mIFByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHJlYWRSZXF1ZXN0RXhlY3V0ZWQocmVhZFJlc3VsdDogVCk6IHZvaWQge1xyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgZGF0YSBsaW5rcyB2YWx1ZVxyXG4gICAgICAgIHRoaXMudmFsdWUgPSByZWFkUmVzdWx0O1xyXG5cclxuICAgICAgICAvLyByZWNhbGwgcmVzcG9uc2UgaGFuZGxlciBhbmQgcGFzcyB0aGUgdXBkYXRlZCB2YWx1ZVxyXG4gICAgICAgIHRoaXMuX3JlYWRSZXNwb25zZURlbGVnYXRlcy5mb3JFYWNoKChyZWFkUmVzcG9uc2VEZWxlZ2F0ZSkgPT4ge1xyXG4gICAgICAgICAgICByZWFkUmVzcG9uc2VEZWxlZ2F0ZSh0aGlzLnZhbHVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gYWZ0ZXIgcHJvY2Vzc2luZyB0aGUgcmVzcG9uc2UgY2FsbHMsIHRoZSBjdXJyZW50IHJlc3BvbnNlIGxpc3QgaXMgb2Jzb2xldGUhXHJcbiAgICAgICAgdGhpcy5lbmRSZWFkUmVxdWVzdCgpO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgYWZ0ZXIgYSByZWFkIHJlcXVlc3QgaGFzIGJlZW4gcmVqZXRjZWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGVycm9yXHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcmVhZFJlcXVlc3RSZWplY3RlZChlcnJvcjogYW55KTogdm9pZCB7XHJcblxyXG4gICAgICAgIC8vIHJlY2FsbCByZXNwb25zZSBoYW5kbGVyIGFuZCBwYXNzIHRoZSB1cGRhdGVkIHZhbHVlXHJcbiAgICAgICAgdGhpcy5fcmVhZFJlamVjdGlvblJlc3BvbnNlRGVsZWdhdGVzLmZvckVhY2goKHJlYWRSZWplY3Rpb25SZXNwb25zZURlbGVnYXRlKSA9PiB7XHJcbiAgICAgICAgICAgIHJlYWRSZWplY3Rpb25SZXNwb25zZURlbGVnYXRlKGVycm9yKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5lbmRSZWFkUmVxdWVzdCgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRlcm1pbmF0ZXMgYSByZWFkIHJlcXVlc3RcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZW5kUmVhZFJlcXVlc3QoKSB7XHJcbiAgICAgICAgdGhpcy5fcmVhZFJlc3BvbnNlRGVsZWdhdGVzID0gW107XHJcbiAgICAgICAgdGhpcy5fcmVhZFJlcXVlc3RTdGF0ZSA9IFByb3BlcnR5UmVxdWVzdFN0YXRlLlJlYWR5O1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZvcmNlcyBhIHdyaXRlIG9mIHRoZSBkYXRhIGxpbmsgdmFsdWUgdG8gdGhlIHZhbHVlIHByb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBuZXdWYWx1ZVxyXG4gICAgICogQHBhcmFtIHsoKCh3cml0ZVJlc3VsdDpUKT0+dm9pZCl8dW5kZWZpbmVkKX0gW3dyaXRlUmVzcG9uc2VEZWxlZ2F0ZT11bmRlZmluZWRdXHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgd3JpdGUod3JpdGVSZXNwb25zZURlbGVnYXRlOiBJUHJvcGVydHlXcml0ZVJlc3BvbnNlIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkLCB3cml0ZVJlamVjdGlvbkRlbGVnYXRlOiBJUHJvcGVydHlSZWplY3Rpb25SZXNwb25zZSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuX3dyaXRlUmVzcG9uc2VEZWxlZ2F0ZSA9IHdyaXRlUmVzcG9uc2VEZWxlZ2F0ZTtcclxuICAgICAgICBpZiAodGhpcy5fd3JpdGVSZXF1ZXN0U3RhdGUgPT09IFByb3BlcnR5UmVxdWVzdFN0YXRlLlJlYWR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmVnaW5Xcml0ZVJlcXVlc3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGVybWluYXRlcyB0aGUgd3JpdGUgcmVxdWVzdFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBlbmRXcml0ZVJlcXVlc3QoKSB7XHJcbiAgICAgICAgdGhpcy5fd3JpdGVSZXNwb25zZURlbGVnYXRlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuX3dyaXRlUmVxdWVzdFN0YXRlID0gUHJvcGVydHlSZXF1ZXN0U3RhdGUuUmVhZHk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGFydHMgdGhlIHJlcXVlc3QgZm9yIHdyaXRpbmcgYSBkYXRhIGxpbmtzIHZhbHVlLiBUaGUgbWV0aG9kIGRlbGdhdGVzIHRoZSByZXF1ZXN0IHRvIHRoZSBjYWxsYmFjayBpZiBkZWZpbmVkLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gbmV3VmFsdWVcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIFByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIGJlZ2luV3JpdGVSZXF1ZXN0KCk6IGFueSB7XHJcbiAgICAgICAgdGhpcy5fd3JpdGVSZXF1ZXN0U3RhdGUgPSBQcm9wZXJ0eVJlcXVlc3RTdGF0ZS5QZW5kaW5nO1xyXG4gICAgICAgIGlmICh0aGlzLl92YWx1ZVdyaXRlUmVxdWVzdERlbGVnYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlV3JpdGVSZXF1ZXN0RGVsZWdhdGUodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgYWZ0ZXIgYSB3cml0ZSByZXF1ZXN0IGhhcyBiZWVuIGV4ZWN1dGVkIHN1Y2Nlc3NmdWxseVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7VH0gd3JpdGVSZXN1bHRcclxuICAgICAqIEBtZW1iZXJvZiBQcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICB3cml0ZVJlcXVlc3RFeGVjdXRlZCh3cml0ZVJlc3VsdDogYW55KTogdm9pZCB7XHJcblxyXG4gICAgICAgIC8vIHJlY2FsbCByZXNwb25zZSBoYW5kbGVyIGFuZCBwYXNzIHRoZSB1cGRhdGVkIHZhbHVlXHJcbiAgICAgICAgaWYgKHRoaXMuX3dyaXRlUmVzcG9uc2VEZWxlZ2F0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl93cml0ZVJlc3BvbnNlRGVsZWdhdGUod3JpdGVSZXN1bHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gYWZ0ZXIgcHJvY2Vzc2luZyB0aGUgcmVzcG9uc2UgY2FsbHMsIHRoZSBjdXJyZW50IHJlc3BvbnNlIGxpc3QgaXMgb2Jzb2xldGUhXHJcbiAgICAgICAgdGhpcy5lbmRXcml0ZVJlcXVlc3QoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgYWZ0ZXIgYSB3cml0ZSByZXF1ZXN0IGhhcyBiZWVuIHJlamVjdGVkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBlcnJvclxyXG4gICAgICogQG1lbWJlcm9mIFByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHdyaXRlUmVxdWVzdFJlamVjdGVkKGVycm9yOiBhbnkpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgLy8gcmVjYWxsIHJlc3BvbnNlIGhhbmRsZXIgYW5kIHBhc3MgdGhlIHVwZGF0ZWQgdmFsdWVcclxuICAgICAgICBpZiAodGhpcy5fd3JpdGVSZXNwb25zZVJlamVjdGlvbkRlbGVnYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3dyaXRlUmVzcG9uc2VSZWplY3Rpb25EZWxlZ2F0ZShlcnJvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmVuZFdyaXRlUmVxdWVzdCgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvcGllcyB0aGUgaXRlbSB2YWx1ZSB0byBwcm9oaWJpdCBhbnkgaW5kaXJlY3QgY2hhbmdlIG9mIHRoZSBvcmlnaW5hbCB2YWx1ZS4gXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0ZW1wbGF0ZSBTVE9SRUlURU1UWVBFXHJcbiAgICAgKiBAcGFyYW0ge1NUT1JFSVRFTVRZUEV9IG5ld1ZhbHVlXHJcbiAgICAgKiBAcGFyYW0geyp9IHN0b3JlSXRlbVR5cGVDb25zdHJ1Y3RvclxyXG4gICAgICogQHJldHVybnMge1NUT1JFSVRFTVRZUEV9XHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjb3B5VmFsdWU8U1RPUkVJVEVNVFlQRT4obmV3VmFsdWU6IFNUT1JFSVRFTVRZUEUsIHN0b3JlSXRlbVR5cGVDb25zdHJ1Y3RvcjogYW55KTogU1RPUkVJVEVNVFlQRSB7XHJcblxyXG4gICAgICAgIC8vIHJldHJpZXZlIHRoZSBpbnN0YW5jZXMgdHJhbnNmZXIgdHlwZVxyXG4gICAgICAgIGNvbnN0IHRyYW5zZmVyVHlwZSA9ICg8YW55Pm5ld1ZhbHVlKS5jb25zdHJ1Y3RvciA/IE1ldGFDbGFzc1JlZmxlY3Rpb25JbmZvLmdldENsYXNzTWV0YVByb3BlcnR5VmFsdWUoKDxhbnk+bmV3VmFsdWUpLmNvbnN0cnVjdG9yLFJlZmxlY3Rpb24uTWV0YUNsYXNzUHJvcGVydHkudHJhbnNmZXJUeXBlKSA6IHVuZGVmaW5lZDtcclxuICAgICAgICAvLyBzaG91bGQgdGhlIGRhdGEgYmUgdHJhbnNmZXJyZWQgYnkgdmFsdWUgP1xyXG4gICAgICAgIGNvbnN0IHRyYW5zZmVyQnlWYWx1ZSA9IHRyYW5zZmVyVHlwZSAhPT0gdW5kZWZpbmVkICYmIHRyYW5zZmVyVHlwZSA9PT0gRGF0YVRyYW5zZmVyVHlwZS5ieVZhbHVlO1xyXG5cclxuICAgICAgICAvLyBpZiB0aGUgdmFsdWUgaXMgYm94ZWQgKHNob3VsZCBiZSBwYXNzZWQgYXMgcmVmZXJlbmNlICkgd2UganVzdCB1c2UgdGhlIHVuYm94ZWQgdmFsdWUuIFxyXG4gICAgICAgIC8vIC4uLiBvdGhlcndpc2Ugd2UgdHJhbnNmZXIgdGhlIG9iamVjdCBhcyBzcGVjaWZpZWQgYnkgdGhlIHRyYW5zZmVyIHR5cGUgLi4uLiBpZiBhbnkuXHJcbiAgICAgICAgLy8gYWxsIG90aGVyIG9iamVjdHMgYXJlIGp1c3QgcGFzc2VkIHRocm91Z2ggd2l0aG91dCBtb2RpZmljYXRpb24gb3IgY29weWluZy5cclxuICAgICAgICByZXR1cm4gbmV3VmFsdWUgaW5zdGFuY2VvZiBEYXRhQm94ID8gKDxEYXRhQm94Pm5ld1ZhbHVlKS5VbmJveCgpIDogdHJhbnNmZXJCeVZhbHVlID8gT2JqZWN0WC5jbG9uZTxTVE9SRUlURU1UWVBFPihzdG9yZUl0ZW1UeXBlQ29uc3RydWN0b3IsIG5ld1ZhbHVlKSA6IG5ld1ZhbHVlO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuaW50ZXJmYWNlIElQcm9wZXJ0eVJlYWRSZXNwb25zZTxUPiB7XHJcbiAgICAocmVzdWx0RGF0YTogVCk6IHZvaWQ7XHJcbn1cclxuXHJcblxyXG5pbnRlcmZhY2UgSVByb3BlcnR5V3JpdGVSZXNwb25zZSB7XHJcbiAgICAocmVzdWx0RGF0YTogYW55KTogdm9pZDtcclxufVxyXG5cclxuXHJcbmludGVyZmFjZSBJUHJvcGVydHlSZWplY3Rpb25SZXNwb25zZSB7XHJcbiAgICAoZXJyb3I6IGFueSk6IHZvaWQ7XHJcbn1cclxuXHJcbmVudW0gUHJvcGVydHlSZXF1ZXN0U3RhdGUge1xyXG4gICAgUmVhZHksXHJcbiAgICBQZW5kaW5nLFxyXG59XHJcblxyXG5cclxuXHJcblxyXG5jbGFzcyBQcm9wZXJ0eUNsaWVudHtcclxuXHJcbiAgICBwcml2YXRlIF9jbGllbnQ6b2JqZWN0O1xyXG4gICAgcHJpdmF0ZSBfY2hhbmdlZEhhbmRsZXI6VF9QUk9QRVJUWUNIQU5HRURfSEFORExFUnxudWxsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNsaWVudCxjaGFuZ2VkSGFuZGxlcjpUX1BST1BFUlRZQ0hBTkdFRF9IQU5ETEVSfG51bGwgPSBudWxsKXtcclxuXHJcbiAgICAgICAgdGhpcy5fY2xpZW50ID0gY2xpZW50O1xyXG4gICAgICAgIHRoaXMuX2NoYW5nZWRIYW5kbGVyID0gY2hhbmdlZEhhbmRsZXI7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgcHVibGljIGdldCBjbGllbnQoKSA6IG9iamVjdCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NsaWVudFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXQgdmFsdWVDaGFuZ2VkSGFuZGxlcigpIDogVF9QUk9QRVJUWUNIQU5HRURfSEFORExFUnxudWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2hhbmdlZEhhbmRsZXJcclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcblxyXG59XHJcblxyXG5cclxuXHJcblxyXG4iXX0=