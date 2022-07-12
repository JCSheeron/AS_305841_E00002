define(["require", "exports", "./property", "../common/utilities/objectx", "./componentHub/componentDataHub"], function (require, exports, property_1, objectx_1, componentDataHub_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Implemens a store for holding and sharing named data objects.
     *
     * @export
     * @class Store
     */
    var Store = /** @class */ (function () {
        function Store() {
            /**
             * holds the named store items
             *
             * @protected
             * @memberof Store
             */
            this._items = new Map();
        }
        /**
         * reads a named store item
         *
         * @template STOREITEMTYPE specifies the store items type for casting to the result type
         * @param {*} storeItemTypeConstructor specifies the type to be constructed
         * @param {string} [storeItemId] specifies store items id
         * @returns {STOREITEMTYPE} the requested store item
         * @memberof Store
         */
        Store.prototype.read = function (storeItemTypeConstructor, storeItemId) {
            // retrieve a copy of a named store item
            var itemValue = this.getStoreItem(storeItemId, storeItemTypeConstructor).value;
            // we copy the item value to prohibit directly modifying the original object.
            var storeItem = property_1.Property.copyValue(itemValue, storeItemTypeConstructor);
            return storeItem;
        };
        /**
         * updates the store item with values of the specified item
         *
         * @template STOREITEMTYPE specifies the store items type for casting to the result type
         * @param {*} storeItemTypeConstructor specifies the type to be constructed
         * @param {string} [storeItemId] specifies store items id
         * @memberof Store
         */
        Store.prototype.update = function (caller, storeItemTypeConstructor, newValue, storeItemId, forceUpdate) {
            if (forceUpdate === void 0) { forceUpdate = false; }
            // get the named store item
            var storeItemProperty = this.getStoreItem(storeItemId, storeItemTypeConstructor);
            // register the caller as accessor
            if (!storeItemProperty.isAccessedBy(caller)) {
                storeItemProperty.attachAccessor(caller);
            }
            // update (and notify observers implicitly) the state properties value if the state objects content has changed. If the update
            // is forced the vaule is updated anyway and in response sent to listeners.
            if (forceUpdate || !objectx_1.ObjectX.deepEquals(storeItemProperty.value, newValue)) {
                // console.log("updated modified state: old %o new %o",storeItemProperty.value,modifiedStoreItem);
                // update the store item value
                storeItemProperty.update(newValue, storeItemTypeConstructor);
                // notify component data hub from updating a shared property
                componentDataHub_1.ComponentDataHub.notifyChanged(this, newValue, newValue);
            }
        };
        /**
         * observes changes of the store item as a consequence of an update call.
         *
         * @template STOREITEMTYPE specifies the store items type for casting to the result type
         * @param {*} storeItemTypeConstructor specifies the type to be constructed
         * @param {(newValue: STOREITEMTYPE, oldValue: STOREITEMTYPE) => void} storeItemChangedCallback
         * @param {string} [storeItemId] specifies store items id
         * @memberof Store
         */
        Store.prototype.observe = function (caller, storeItemTypeConstructor, storeItemChangedCallback, storeItemId) {
            // get the named store item
            var storeItem = this.getStoreItem(storeItemId, storeItemTypeConstructor);
            // observe the value change of the property and notify the caller
            if (!storeItem.isObservedBy(caller)) {
                // register the caller as observer
                storeItem.attachObserver(caller, storeItemChangedCallback, storeItemTypeConstructor);
            }
            else {
                console.error("shared propery store: The item %o is already attached to observer %o", storeItem, caller);
            }
        };
        /**
         * checks if the store contains the specified item
         *
         * @param {string} itemId specifies store items id
         * @returns {*}
         * @memberof Store
         */
        Store.prototype.contains = function (itemId) {
            return this._items.has(itemId);
        };
        /**
         * retrieves the store item by id
         *
         * @private
         * @template STOREITEMTYPE specifies the store items type for casting to the result type
        * @param {string} [storeItemId=""] specifies store items id
         * @param {*} storeItemType specifies the type to be constructed
         * @returns {Property<STOREITEMTYPE>} a property object holding the store item
         * @memberof Store
         */
        Store.prototype.getStoreItem = function (storeItemId, storeItemType) {
            var itemType = typeof storeItemType !== "string" ? storeItemType : undefined;
            var effectivestoreItemId = storeItemId ? storeItemId : itemType ? itemType.name : "undefined";
            // get the existing property by id
            var property = this._items.get(effectivestoreItemId);
            // create a new one if not yet available
            if (!property) {
                // create an initial tore item value
                var initialStoreItemValue = itemType ? new itemType() : undefined;
                property = property_1.Property.create(initialStoreItemValue);
                // put the new property into the map
                this._items.set(effectivestoreItemId, property);
                // notify component data hub from creating a shared property
                if (initialStoreItemValue) {
                    componentDataHub_1.ComponentDataHub.notifyCreated(this, initialStoreItemValue);
                }
            }
            return property;
        };
        /**
         * Detaches all properties connected to the bound object
         *
         * @param {object} boundObject
         * @memberof Store
         */
        Store.prototype.detach = function (boundObject) {
            this.detachBoundObjectFromProperties(boundObject);
            this.deleteUnattachedProperties();
        };
        /**
         * Detaches the bound object from the related properties
         *
         * @private
         * @param {object} boundObject
         * @memberof Store
         */
        Store.prototype.detachBoundObjectFromProperties = function (boundObject) {
            // retrieve all observed properties
            var observedProperties = Array.from(this._items.values()).filter(function (storeProperty) { return storeProperty.isObservedBy(boundObject); });
            // detach the bound object from these properties as observer
            observedProperties.forEach(function (property) { property.detachObserver(boundObject); });
            // retrieve all accessed properties
            var accessedProperties = Array.from(this._items.values()).filter(function (storeProperty) { return storeProperty.isAccessedBy(boundObject); });
            // detach the bound object from these properties as accessor
            accessedProperties.forEach(function (property) { property.detachAccessor(boundObject); });
        };
        /**
         * Deletes all properties from the store which are not observed or accessed.
         *
         * @private
         * @memberof Store
         */
        Store.prototype.deleteUnattachedProperties = function () {
            var _this = this;
            // get the unattchaed property keys
            var unattachedPropertyKeys = Array.from(this._items.keys()).filter(function (storePropertyKey) {
                var propertyIsUnattached = false;
                var storeProperty = _this._items.get(storePropertyKey);
                if (storeProperty) {
                    propertyIsUnattached = !storeProperty.isAttached;
                }
                return propertyIsUnattached;
            });
            //// remove the unattached properties from the store
            unattachedPropertyKeys.forEach(function (unattachedPropertyKey) {
                _this._items.delete(unattachedPropertyKey);
            });
        };
        return Store;
    }());
    exports.Store = Store;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBwL2ZyYW1ld29yay9zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFPQTs7Ozs7T0FLRztJQUNIO1FBQUE7WUFFSTs7Ozs7ZUFLRztZQUNPLFdBQU0sR0FBNkIsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQTRMM0QsQ0FBQztRQXpMRzs7Ozs7Ozs7V0FRRztRQUNILG9CQUFJLEdBQUosVUFBb0Isd0JBQStDLEVBQUUsV0FBbUI7WUFDcEYsd0NBQXdDO1lBQ3hDLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQWdCLFdBQVcsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNoRyw2RUFBNkU7WUFDN0UsSUFBSSxTQUFTLEdBQWtCLG1CQUFRLENBQUMsU0FBUyxDQUFnQixTQUFTLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztZQUN0RyxPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBR0Q7Ozs7Ozs7V0FPRztRQUNILHNCQUFNLEdBQU4sVUFBc0IsTUFBYyxFQUFFLHdCQUF3QixFQUFFLFFBQXVCLEVBQUUsV0FBbUIsRUFBRSxXQUE0QjtZQUE1Qiw0QkFBQSxFQUFBLG1CQUE0QjtZQUV0SSwyQkFBMkI7WUFDM0IsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFnQixXQUFXLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztZQUVoRyxrQ0FBa0M7WUFDbEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDekMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzVDO1lBRUQsOEhBQThIO1lBQzlILDJFQUEyRTtZQUMzRSxJQUFJLFdBQVcsSUFBSSxDQUFDLGlCQUFPLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsRUFBRTtn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LENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUNMLFlBQUM7SUFBRCxDQUFDLEFBcE1ELElBb01DO0lBcE1ZLHNCQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJvcGVydHkgfSBmcm9tIFwiLi9wcm9wZXJ0eVwiO1xyXG5pbXBvcnQgeyBPYmplY3RYIH0gZnJvbSBcIi4uL2NvbW1vbi91dGlsaXRpZXMvb2JqZWN0eFwiO1xyXG5pbXBvcnQgeyBUQ29uc3RydWN0b3IsIFRDb25uZWN0aW9uRGF0YVR5cGUgfSBmcm9tIFwiLi9jb21wb25lbnRIdWIvY29tbW9uL2NvbW1vblR5cGVzXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudERhdGFIdWIgfSBmcm9tIFwiLi9jb21wb25lbnRIdWIvY29tcG9uZW50RGF0YUh1YlwiO1xyXG5cclxuXHJcbmV4cG9ydCB0eXBlIFRTdG9yZUl0ZW1Db25zdHJ1Y3RvciA9IG5ldyAoKSA9PiBvYmplY3Q7XHJcbi8qKlxyXG4gKiBJbXBsZW1lbnMgYSBzdG9yZSBmb3IgaG9sZGluZyBhbmQgc2hhcmluZyBuYW1lZCBkYXRhIG9iamVjdHMuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIFN0b3JlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU3RvcmUge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogaG9sZHMgdGhlIG5hbWVkIHN0b3JlIGl0ZW1zXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQG1lbWJlcm9mIFN0b3JlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBfaXRlbXM6TWFwPHN0cmluZyxQcm9wZXJ0eTxhbnk+PiA9IG5ldyBNYXAoKTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWFkcyBhIG5hbWVkIHN0b3JlIGl0ZW1cclxuICAgICAqXHJcbiAgICAgKiBAdGVtcGxhdGUgU1RPUkVJVEVNVFlQRSBzcGVjaWZpZXMgdGhlIHN0b3JlIGl0ZW1zIHR5cGUgZm9yIGNhc3RpbmcgdG8gdGhlIHJlc3VsdCB0eXBlXHJcbiAgICAgKiBAcGFyYW0geyp9IHN0b3JlSXRlbVR5cGVDb25zdHJ1Y3RvciBzcGVjaWZpZXMgdGhlIHR5cGUgdG8gYmUgY29uc3RydWN0ZWQgXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3N0b3JlSXRlbUlkXSBzcGVjaWZpZXMgc3RvcmUgaXRlbXMgaWRcclxuICAgICAqIEByZXR1cm5zIHtTVE9SRUlURU1UWVBFfSB0aGUgcmVxdWVzdGVkIHN0b3JlIGl0ZW1cclxuICAgICAqIEBtZW1iZXJvZiBTdG9yZVxyXG4gICAgICovXHJcbiAgICByZWFkPFNUT1JFSVRFTVRZUEU+KHN0b3JlSXRlbVR5cGVDb25zdHJ1Y3RvcjogVFN0b3JlSXRlbUNvbnN0cnVjdG9yLCBzdG9yZUl0ZW1JZDogc3RyaW5nKTogU1RPUkVJVEVNVFlQRSB7XHJcbiAgICAgICAgLy8gcmV0cmlldmUgYSBjb3B5IG9mIGEgbmFtZWQgc3RvcmUgaXRlbVxyXG4gICAgICAgIGNvbnN0IGl0ZW1WYWx1ZSA9IHRoaXMuZ2V0U3RvcmVJdGVtPFNUT1JFSVRFTVRZUEU+KHN0b3JlSXRlbUlkLCBzdG9yZUl0ZW1UeXBlQ29uc3RydWN0b3IpLnZhbHVlO1xyXG4gICAgICAgIC8vIHdlIGNvcHkgdGhlIGl0ZW0gdmFsdWUgdG8gcHJvaGliaXQgZGlyZWN0bHkgbW9kaWZ5aW5nIHRoZSBvcmlnaW5hbCBvYmplY3QuXHJcbiAgICAgICAgbGV0IHN0b3JlSXRlbTogU1RPUkVJVEVNVFlQRSA9IFByb3BlcnR5LmNvcHlWYWx1ZTxTVE9SRUlURU1UWVBFPihpdGVtVmFsdWUsIHN0b3JlSXRlbVR5cGVDb25zdHJ1Y3Rvcik7XHJcbiAgICAgICAgcmV0dXJuIHN0b3JlSXRlbTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB1cGRhdGVzIHRoZSBzdG9yZSBpdGVtIHdpdGggdmFsdWVzIG9mIHRoZSBzcGVjaWZpZWQgaXRlbVxyXG4gICAgICpcclxuICAgICAqIEB0ZW1wbGF0ZSBTVE9SRUlURU1UWVBFIHNwZWNpZmllcyB0aGUgc3RvcmUgaXRlbXMgdHlwZSBmb3IgY2FzdGluZyB0byB0aGUgcmVzdWx0IHR5cGVcclxuICAgICAqIEBwYXJhbSB7Kn0gc3RvcmVJdGVtVHlwZUNvbnN0cnVjdG9yIHNwZWNpZmllcyB0aGUgdHlwZSB0byBiZSBjb25zdHJ1Y3RlZCBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbc3RvcmVJdGVtSWRdIHNwZWNpZmllcyBzdG9yZSBpdGVtcyBpZFxyXG4gICAgICogQG1lbWJlcm9mIFN0b3JlXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZTxTVE9SRUlURU1UWVBFPihjYWxsZXI6IG9iamVjdCwgc3RvcmVJdGVtVHlwZUNvbnN0cnVjdG9yLCBuZXdWYWx1ZTogU1RPUkVJVEVNVFlQRSwgc3RvcmVJdGVtSWQ6IHN0cmluZywgZm9yY2VVcGRhdGU6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG5cclxuICAgICAgICAvLyBnZXQgdGhlIG5hbWVkIHN0b3JlIGl0ZW1cclxuICAgICAgICBsZXQgc3RvcmVJdGVtUHJvcGVydHkgPSB0aGlzLmdldFN0b3JlSXRlbTxTVE9SRUlURU1UWVBFPihzdG9yZUl0ZW1JZCwgc3RvcmVJdGVtVHlwZUNvbnN0cnVjdG9yKTtcclxuXHJcbiAgICAgICAgLy8gcmVnaXN0ZXIgdGhlIGNhbGxlciBhcyBhY2Nlc3NvclxyXG4gICAgICAgIGlmICghc3RvcmVJdGVtUHJvcGVydHkuaXNBY2Nlc3NlZEJ5KGNhbGxlcikpIHtcclxuICAgICAgICAgICAgc3RvcmVJdGVtUHJvcGVydHkuYXR0YWNoQWNjZXNzb3IoY2FsbGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZSAoYW5kIG5vdGlmeSBvYnNlcnZlcnMgaW1wbGljaXRseSkgdGhlIHN0YXRlIHByb3BlcnRpZXMgdmFsdWUgaWYgdGhlIHN0YXRlIG9iamVjdHMgY29udGVudCBoYXMgY2hhbmdlZC4gSWYgdGhlIHVwZGF0ZVxyXG4gICAgICAgIC8vIGlzIGZvcmNlZCB0aGUgdmF1bGUgaXMgdXBkYXRlZCBhbnl3YXkgYW5kIGluIHJlc3BvbnNlIHNlbnQgdG8gbGlzdGVuZXJzLlxyXG4gICAgICAgIGlmIChmb3JjZVVwZGF0ZSB8fCAhT2JqZWN0WC5kZWVwRXF1YWxzKHN0b3JlSXRlbVByb3BlcnR5LnZhbHVlLCBuZXdWYWx1ZSkpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwidXBkYXRlZCBtb2RpZmllZCBzdGF0ZTogb2xkICVvIG5ldyAlb1wiLHN0b3JlSXRlbVByb3BlcnR5LnZhbHVlLG1vZGlmaWVkU3RvcmVJdGVtKTtcclxuICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBzdG9yZSBpdGVtIHZhbHVlXHJcbiAgICAgICAgICAgIHN0b3JlSXRlbVByb3BlcnR5LnVwZGF0ZShuZXdWYWx1ZSxzdG9yZUl0ZW1UeXBlQ29uc3RydWN0b3IpO1xyXG5cclxuICAgICAgICAgICAgLy8gbm90aWZ5IGNvbXBvbmVudCBkYXRhIGh1YiBmcm9tIHVwZGF0aW5nIGEgc2hhcmVkIHByb3BlcnR5XHJcbiAgICAgICAgICAgIENvbXBvbmVudERhdGFIdWIubm90aWZ5Q2hhbmdlZCh0aGlzLG5ld1ZhbHVlLG5ld1ZhbHVlKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogb2JzZXJ2ZXMgY2hhbmdlcyBvZiB0aGUgc3RvcmUgaXRlbSBhcyBhIGNvbnNlcXVlbmNlIG9mIGFuIHVwZGF0ZSBjYWxsLlxyXG4gICAgICpcclxuICAgICAqIEB0ZW1wbGF0ZSBTVE9SRUlURU1UWVBFIHNwZWNpZmllcyB0aGUgc3RvcmUgaXRlbXMgdHlwZSBmb3IgY2FzdGluZyB0byB0aGUgcmVzdWx0IHR5cGVcclxuICAgICAqIEBwYXJhbSB7Kn0gc3RvcmVJdGVtVHlwZUNvbnN0cnVjdG9yIHNwZWNpZmllcyB0aGUgdHlwZSB0byBiZSBjb25zdHJ1Y3RlZCBcclxuICAgICAqIEBwYXJhbSB7KG5ld1ZhbHVlOiBTVE9SRUlURU1UWVBFLCBvbGRWYWx1ZTogU1RPUkVJVEVNVFlQRSkgPT4gdm9pZH0gc3RvcmVJdGVtQ2hhbmdlZENhbGxiYWNrXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3N0b3JlSXRlbUlkXSBzcGVjaWZpZXMgc3RvcmUgaXRlbXMgaWRcclxuICAgICAqIEBtZW1iZXJvZiBTdG9yZVxyXG4gICAgICovXHJcbiAgICBvYnNlcnZlPFNUT1JFSVRFTVRZUEU+KGNhbGxlcjogb2JqZWN0LCBzdG9yZUl0ZW1UeXBlQ29uc3RydWN0b3IsIHN0b3JlSXRlbUNoYW5nZWRDYWxsYmFjazogKG5ld1ZhbHVlOiBTVE9SRUlURU1UWVBFLCBvbGRWYWx1ZTogU1RPUkVJVEVNVFlQRSkgPT4gdm9pZCwgc3RvcmVJdGVtSWQ6IHN0cmluZyk6IHZvaWQge1xyXG5cclxuICAgICAgICAvLyBnZXQgdGhlIG5hbWVkIHN0b3JlIGl0ZW1cclxuICAgICAgICBsZXQgc3RvcmVJdGVtID0gdGhpcy5nZXRTdG9yZUl0ZW08U1RPUkVJVEVNVFlQRT4oc3RvcmVJdGVtSWQsIHN0b3JlSXRlbVR5cGVDb25zdHJ1Y3Rvcik7XHJcblxyXG4gICAgICAgIC8vIG9ic2VydmUgdGhlIHZhbHVlIGNoYW5nZSBvZiB0aGUgcHJvcGVydHkgYW5kIG5vdGlmeSB0aGUgY2FsbGVyXHJcbiAgICAgICAgaWYgKCFzdG9yZUl0ZW0uaXNPYnNlcnZlZEJ5KGNhbGxlcikpIHtcclxuICAgICAgICAgICAgLy8gcmVnaXN0ZXIgdGhlIGNhbGxlciBhcyBvYnNlcnZlclxyXG4gICAgICAgICAgICBzdG9yZUl0ZW0uYXR0YWNoT2JzZXJ2ZXIoY2FsbGVyLHN0b3JlSXRlbUNoYW5nZWRDYWxsYmFjayxzdG9yZUl0ZW1UeXBlQ29uc3RydWN0b3IpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwic2hhcmVkIHByb3Blcnkgc3RvcmU6IFRoZSBpdGVtICVvIGlzIGFscmVhZHkgYXR0YWNoZWQgdG8gb2JzZXJ2ZXIgJW9cIiwgc3RvcmVJdGVtLCBjYWxsZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjaGVja3MgaWYgdGhlIHN0b3JlIGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgaXRlbVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpdGVtSWQgc3BlY2lmaWVzIHN0b3JlIGl0ZW1zIGlkXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBTdG9yZVxyXG4gICAgICovXHJcbiAgICBjb250YWlucyhpdGVtSWQ6IHN0cmluZyk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zLmhhcyhpdGVtSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmV0cmlldmVzIHRoZSBzdG9yZSBpdGVtIGJ5IGlkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0ZW1wbGF0ZSBTVE9SRUlURU1UWVBFIHNwZWNpZmllcyB0aGUgc3RvcmUgaXRlbXMgdHlwZSBmb3IgY2FzdGluZyB0byB0aGUgcmVzdWx0IHR5cGVcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IFtzdG9yZUl0ZW1JZD1cIlwiXSBzcGVjaWZpZXMgc3RvcmUgaXRlbXMgaWRcclxuICAgICAqIEBwYXJhbSB7Kn0gc3RvcmVJdGVtVHlwZSBzcGVjaWZpZXMgdGhlIHR5cGUgdG8gYmUgY29uc3RydWN0ZWQgXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvcGVydHk8U1RPUkVJVEVNVFlQRT59IGEgcHJvcGVydHkgb2JqZWN0IGhvbGRpbmcgdGhlIHN0b3JlIGl0ZW1cclxuICAgICAqIEBtZW1iZXJvZiBTdG9yZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFN0b3JlSXRlbTxTVE9SRUlURU1UWVBFPihzdG9yZUl0ZW1JZDogc3RyaW5nLCBzdG9yZUl0ZW1UeXBlOiBUQ29ubmVjdGlvbkRhdGFUeXBlKTogUHJvcGVydHk8U1RPUkVJVEVNVFlQRT4ge1xyXG5cclxuICAgICAgICBjb25zdCBpdGVtVHlwZTogVENvbnN0cnVjdG9yIHwgdW5kZWZpbmVkID0gdHlwZW9mIHN0b3JlSXRlbVR5cGUgIT09IFwic3RyaW5nXCIgPyBzdG9yZUl0ZW1UeXBlIGFzIFRDb25zdHJ1Y3RvciA6IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgbGV0IGVmZmVjdGl2ZXN0b3JlSXRlbUlkID0gc3RvcmVJdGVtSWQgPyBzdG9yZUl0ZW1JZCA6IGl0ZW1UeXBlID8gaXRlbVR5cGUubmFtZSA6IFwidW5kZWZpbmVkXCI7XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgZXhpc3RpbmcgcHJvcGVydHkgYnkgaWRcclxuICAgICAgICBsZXQgcHJvcGVydHkgPSB0aGlzLl9pdGVtcy5nZXQoZWZmZWN0aXZlc3RvcmVJdGVtSWQpO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgYSBuZXcgb25lIGlmIG5vdCB5ZXQgYXZhaWxhYmxlXHJcbiAgICAgICAgaWYgKCFwcm9wZXJ0eSkge1xyXG5cclxuICAgICAgICAgICAgLy8gY3JlYXRlIGFuIGluaXRpYWwgdG9yZSBpdGVtIHZhbHVlXHJcbiAgICAgICAgICAgIGxldCBpbml0aWFsU3RvcmVJdGVtVmFsdWUgPSBpdGVtVHlwZSA/IG5ldyBpdGVtVHlwZSgpIDogdW5kZWZpbmVkIGFzIGFueTtcclxuICAgICAgICAgICAgcHJvcGVydHkgPSBQcm9wZXJ0eS5jcmVhdGU8U1RPUkVJVEVNVFlQRT4oaW5pdGlhbFN0b3JlSXRlbVZhbHVlKTtcclxuICAgICAgICAgICAgLy8gcHV0IHRoZSBuZXcgcHJvcGVydHkgaW50byB0aGUgbWFwXHJcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1zLnNldChlZmZlY3RpdmVzdG9yZUl0ZW1JZCxwcm9wZXJ0eSk7XHJcblxyXG4gICAgICAgICAgICAvLyBub3RpZnkgY29tcG9uZW50IGRhdGEgaHViIGZyb20gY3JlYXRpbmcgYSBzaGFyZWQgcHJvcGVydHlcclxuICAgICAgICAgICAgaWYgKGluaXRpYWxTdG9yZUl0ZW1WYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgQ29tcG9uZW50RGF0YUh1Yi5ub3RpZnlDcmVhdGVkKHRoaXMsaW5pdGlhbFN0b3JlSXRlbVZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHByb3BlcnR5O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0YWNoZXMgYWxsIHByb3BlcnRpZXMgY29ubmVjdGVkIHRvIHRoZSBib3VuZCBvYmplY3RcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gYm91bmRPYmplY3RcclxuICAgICAqIEBtZW1iZXJvZiBTdG9yZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGV0YWNoKGJvdW5kT2JqZWN0OiBvYmplY3QpIHtcclxuICBcclxuICAgICAgICB0aGlzLmRldGFjaEJvdW5kT2JqZWN0RnJvbVByb3BlcnRpZXMoYm91bmRPYmplY3QpO1xyXG5cclxuICAgICAgICB0aGlzLmRlbGV0ZVVuYXR0YWNoZWRQcm9wZXJ0aWVzKCk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGFjaGVzIHRoZSBib3VuZCBvYmplY3QgZnJvbSB0aGUgcmVsYXRlZCBwcm9wZXJ0aWVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBib3VuZE9iamVjdFxyXG4gICAgICogQG1lbWJlcm9mIFN0b3JlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGV0YWNoQm91bmRPYmplY3RGcm9tUHJvcGVydGllcyhib3VuZE9iamVjdDogb2JqZWN0KSB7XHJcblxyXG4gICAgICAgIC8vIHJldHJpZXZlIGFsbCBvYnNlcnZlZCBwcm9wZXJ0aWVzXHJcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZWRQcm9wZXJ0aWVzOiBBcnJheTxQcm9wZXJ0eTxhbnk+PiA9IEFycmF5LmZyb20odGhpcy5faXRlbXMudmFsdWVzKCkpLmZpbHRlcigoc3RvcmVQcm9wZXJ0eSkgPT4geyByZXR1cm4gc3RvcmVQcm9wZXJ0eS5pc09ic2VydmVkQnkoYm91bmRPYmplY3QpOyB9KTtcclxuICAgICAgICAvLyBkZXRhY2ggdGhlIGJvdW5kIG9iamVjdCBmcm9tIHRoZXNlIHByb3BlcnRpZXMgYXMgb2JzZXJ2ZXJcclxuICAgICAgICBvYnNlcnZlZFByb3BlcnRpZXMuZm9yRWFjaCgocHJvcGVydHkpID0+IHsgcHJvcGVydHkuZGV0YWNoT2JzZXJ2ZXIoYm91bmRPYmplY3QpOyB9KTtcclxuXHJcbiAgICAgICAgLy8gcmV0cmlldmUgYWxsIGFjY2Vzc2VkIHByb3BlcnRpZXNcclxuICAgICAgICBjb25zdCBhY2Nlc3NlZFByb3BlcnRpZXM6IEFycmF5PFByb3BlcnR5PGFueT4+ID0gQXJyYXkuZnJvbSh0aGlzLl9pdGVtcy52YWx1ZXMoKSkuZmlsdGVyKChzdG9yZVByb3BlcnR5KSA9PiB7IHJldHVybiBzdG9yZVByb3BlcnR5LmlzQWNjZXNzZWRCeShib3VuZE9iamVjdCk7IH0pO1xyXG4gICAgICAgIC8vIGRldGFjaCB0aGUgYm91bmQgb2JqZWN0IGZyb20gdGhlc2UgcHJvcGVydGllcyBhcyBhY2Nlc3NvclxyXG4gICAgICAgIGFjY2Vzc2VkUHJvcGVydGllcy5mb3JFYWNoKChwcm9wZXJ0eSkgPT4geyBwcm9wZXJ0eS5kZXRhY2hBY2Nlc3Nvcihib3VuZE9iamVjdCk7IH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogRGVsZXRlcyBhbGwgcHJvcGVydGllcyBmcm9tIHRoZSBzdG9yZSB3aGljaCBhcmUgbm90IG9ic2VydmVkIG9yIGFjY2Vzc2VkLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgU3RvcmVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkZWxldGVVbmF0dGFjaGVkUHJvcGVydGllcygpIHtcclxuICAgICAgICBcclxuICAgICAgICAvLyBnZXQgdGhlIHVuYXR0Y2hhZWQgcHJvcGVydHkga2V5c1xyXG4gICAgICAgIGNvbnN0IHVuYXR0YWNoZWRQcm9wZXJ0eUtleXMgPSBBcnJheS5mcm9tKHRoaXMuX2l0ZW1zLmtleXMoKSkuZmlsdGVyKChzdG9yZVByb3BlcnR5S2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwcm9wZXJ0eUlzVW5hdHRhY2hlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjb25zdCBzdG9yZVByb3BlcnR5ID0gdGhpcy5faXRlbXMuZ2V0KHN0b3JlUHJvcGVydHlLZXkpO1xyXG4gICAgICAgICAgICBpZiAoc3RvcmVQcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgcHJvcGVydHlJc1VuYXR0YWNoZWQgPSAhc3RvcmVQcm9wZXJ0eS5pc0F0dGFjaGVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wZXJ0eUlzVW5hdHRhY2hlZDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8vLyByZW1vdmUgdGhlIHVuYXR0YWNoZWQgcHJvcGVydGllcyBmcm9tIHRoZSBzdG9yZVxyXG4gICAgICAgIHVuYXR0YWNoZWRQcm9wZXJ0eUtleXMuZm9yRWFjaCgodW5hdHRhY2hlZFByb3BlcnR5S2V5KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1zLmRlbGV0ZSh1bmF0dGFjaGVkUHJvcGVydHlLZXkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59Il19