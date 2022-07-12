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
define(["require", "exports", "./nwctPrsItemBase", "./nwctPrsPayloadArgument", "./objectReflection"], function (require, exports, nwctPrsItemBase_1, nwctPrsPayloadArgument_1, objectReflection_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * This class retrieves the payload argurments of a data records using object reflection
     *
     * @export
     * @class NwctDataEntryPayload
     */
    var NwctPrsPayloadArguments = /** @class */ (function (_super) {
        __extends(NwctPrsPayloadArguments, _super);
        /**
         *Creates an instance of NwctPrsPayloadArguments.
         * @param {*} input
         * @param {string[]} location
         * @memberof NwctPrsPayloadArguments
         */
        function NwctPrsPayloadArguments(input, location) {
            var _this = _super.call(this, input, location) || this;
            _this._parsed = false; // only parse once
            _this.blackListProperties = ["_io", "_parent", "_root"]; // these properties are kaitai internal and NOT a payload property
            _this.blackListMethods = ["_read"]; // this method is kaitai internal and NOT a getter for a payload property
            _this._payload = new Array();
            return _this;
        }
        Object.defineProperty(NwctPrsPayloadArguments.prototype, "payload", {
            /**
             * Dynamically parse all properties of the payload (the number of properties depends on the parId)
             *
             * @readonly
             * @type {Array<NwctPrsPayloadArgument>}
             * @memberof NwctDataEntryPayload
             */
            get: function () {
                this.parseAllProperties(); // this method takes care that parsing is only done the first time
                return this._payload;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctPrsPayloadArguments.prototype, "valid", {
            /**
            * Returns true if all contained properties are valid
            * ATTENTION: Processing all properties can consume a long time
            *
            * @readonly
            * @memberof NwctConfigEntry
            */
            get: function () {
                // extract valid property
                var validStates = this.payload.map(function (propObj) { return propObj.valid; });
                // result is only true if all properties are valid
                var result = validStates.reduce(function (tmpResult, currentValue) { return tmpResult && currentValue; });
                return result;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * All properties are parsed and added into the paload argument array (if not parsed already)
         *
         * @private
         * @memberof NwctDataEntryPayload
         */
        NwctPrsPayloadArguments.prototype.parseAllProperties = function () {
            // parsing is only done once
            if (this._parsed) {
                return;
            }
            // normal value properies and getter properties are accessed differently via object reflection    
            this.parseGetterProperties();
            this.parseValueProperties();
            this._parsed = true;
        };
        /**
         * returns the properties of the untyped object that are accessable as value properties
         * except blacklisted properties
         *
         * @private
         * @returns
         * @memberof NwctPrsPayloadArguments
         */
        NwctPrsPayloadArguments.prototype.parseValueProperties = function () {
            var _this = this;
            var propertieNames = Object.keys(this._input);
            // result must be an array
            if (!Array.isArray(propertieNames)) {
                return;
            }
            // remove black list elemnts that are comming from the kaitai implementation: _io, _root, _parent            
            var filteredPropertieNames = propertieNames.filter(function (propertyName) { return !_this.isOnBlackList(propertyName, _this.blackListProperties); });
            // create a list containing the new properties
            filteredPropertieNames.forEach(function (propertyName) {
                var value = _this._input[propertyName]; // get untyped value
                var valid = _this.isValid(value); // check for validity
                // create payload item
                var payloadArg = new nwctPrsPayloadArgument_1.NwctPrsPayloadArgument(value, propertyName, valid);
                // add payload item
                _this._payload.push(payloadArg);
            });
        };
        /**
         * retrieves the properties of the untyped object that are accessable via getter methods
         * except blacklisted methods
         *
         * @private
         * @returns
         * @memberof NwctPrsPayloadArguments
         */
        NwctPrsPayloadArguments.prototype.parseGetterProperties = function () {
            var _this = this;
            var methodNames = objectReflection_1.ObjectReflection.getMethodNames(this._input);
            // result must be an array
            if (!Array.isArray(methodNames)) {
                return;
            }
            // remove irrelevant methods from black list
            var getterNames = methodNames.filter(function (getterName) { return !_this.isOnBlackList(getterName, _this.blackListMethods); });
            getterNames.forEach(function (getterName) {
                // call getter to retrieve the untyped value
                var value;
                try {
                    value = objectReflection_1.ObjectReflection.callGetterByName(_this._input, getterName);
                }
                catch (e) {
                    console.warn(e);
                }
                var valid = _this.isValid(value); // check for validity
                // create payload item
                var payloadArg = new nwctPrsPayloadArgument_1.NwctPrsPayloadArgument(value, getterName, valid);
                // add payload item
                _this._payload.push(payloadArg);
            });
        };
        /**
         * returns true if all items are valid
         *
         * @param {*} value
         * @returns {boolean}
         * @memberof NwctPrsPayloadArguments
         */
        NwctPrsPayloadArguments.prototype.isValid = function (value) {
            // check if type is supported
            return typeof (value) === "number" || typeof (value) === "string";
        };
        /**
         * Checks if the name is blacklisted
         *
         * @private
         * @param {string} name
         * @param {Array<string>} blackList
         * @returns
         * @memberof NwctPrsPayloadArguments
         */
        NwctPrsPayloadArguments.prototype.isOnBlackList = function (name, blackList) {
            // is on black list? 
            return blackList.indexOf(name) > -1;
            ;
        };
        return NwctPrsPayloadArguments;
    }(nwctPrsItemBase_1.NwctPrsItemBase));
    exports.NwctPrsPayloadArguments = NwctPrsPayloadArguments;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibndjdFByc1BheWxvYWRBcmd1bWVudHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi9ud2N0UHJvdmlkZXIvb2JqUGFyc2VyL253Y3RQcnNQYXlsb2FkQXJndW1lbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFJQTs7Ozs7T0FLRztJQUNIO1FBQTZDLDJDQUFlO1FBU3hEOzs7OztXQUtHO1FBQ0gsaUNBQW1CLEtBQVcsRUFBRSxRQUFtQjtZQUFuRCxZQUNHLGtCQUFNLEtBQUssRUFBRSxRQUFRLENBQUMsU0FFeEI7WUFmTyxhQUFPLEdBQWEsS0FBSyxDQUFDLENBQUMsa0JBQWtCO1lBRXBDLHlCQUFtQixHQUFHLENBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLGtFQUFrRTtZQUNuSCxzQkFBZ0IsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMseUVBQXlFO1lBV3JILEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxLQUFLLEVBQTBCLENBQUM7O1FBQ3ZELENBQUM7UUFVRCxzQkFBVyw0Q0FBTztZQVBsQjs7Ozs7O2VBTUc7aUJBQ0g7Z0JBQ0ksSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxrRUFBa0U7Z0JBQzdGLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUN6QixDQUFDOzs7V0FBQTtRQVdELHNCQUFXLDBDQUFLO1lBUGY7Ozs7OztjQU1FO2lCQUNIO2dCQUVJLHlCQUF5QjtnQkFDekIsSUFBSSxXQUFXLEdBQXFCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLEtBQUssRUFBYixDQUFhLENBQUMsQ0FBQztnQkFFL0Usa0RBQWtEO2dCQUNsRCxJQUFJLE1BQU0sR0FBYSxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQUMsU0FBUyxFQUFFLFlB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Q0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFFUCxDQUFDO1FBR0Q7Ozs7OztXQU1HO1FBQ0kseUNBQU8sR0FBZCxVQUFlLEtBQVc7WUFFdEIsNkJBQTZCO1lBQzdCLE9BQU8sT0FBTSxDQUFDLEtBQUssQ0FBQyxLQUFHLFFBQVEsSUFBSSxPQUFNLENBQUMsS0FBSyxDQUFDLEtBQUcsUUFBUSxDQUFDO1FBQ2hFLENBQUM7UUFHRDs7Ozs7Ozs7V0FRRztRQUNLLCtDQUFhLEdBQXJCLFVBQXNCLElBQWEsRUFBRSxTQUF5QjtZQUMxRCxxQkFBcUI7WUFDckIsT0FBTyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUEsQ0FBQztRQUN2QyxDQUFDO1FBRUwsOEJBQUM7SUFBRCxDQUFDLEFBbkxELENBQTZDLGlDQUFlLEdBbUwzRDtJQW5MWSwwREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOd2N0UHJzSXRlbUJhc2UgfSBmcm9tIFwiLi9ud2N0UHJzSXRlbUJhc2VcIjtcclxuaW1wb3J0IHsgTndjdFByc1BheWxvYWRBcmd1bWVudCB9IGZyb20gXCIuL253Y3RQcnNQYXlsb2FkQXJndW1lbnRcIjtcclxuaW1wb3J0IHsgT2JqZWN0UmVmbGVjdGlvbiB9IGZyb20gXCIuL29iamVjdFJlZmxlY3Rpb25cIjtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIHJldHJpZXZlcyB0aGUgcGF5bG9hZCBhcmd1cm1lbnRzIG9mIGEgZGF0YSByZWNvcmRzIHVzaW5nIG9iamVjdCByZWZsZWN0aW9uXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIE53Y3REYXRhRW50cnlQYXlsb2FkXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTndjdFByc1BheWxvYWRBcmd1bWVudHMgZXh0ZW5kcyBOd2N0UHJzSXRlbUJhc2V7XHJcblxyXG4gICAgcHJpdmF0ZSBfcGF5bG9hZCA6IEFycmF5PE53Y3RQcnNQYXlsb2FkQXJndW1lbnQ+O1xyXG4gICAgcHJpdmF0ZSBfcGFyc2VkIDogYm9vbGVhbiA9IGZhbHNlOyAvLyBvbmx5IHBhcnNlIG9uY2VcclxuICAgIFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBibGFja0xpc3RQcm9wZXJ0aWVzID0gW1wiX2lvXCIsXCJfcGFyZW50XCIsXCJfcm9vdFwiXTsgLy8gdGhlc2UgcHJvcGVydGllcyBhcmUga2FpdGFpIGludGVybmFsIGFuZCBOT1QgYSBwYXlsb2FkIHByb3BlcnR5XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGJsYWNrTGlzdE1ldGhvZHMgPSBbXCJfcmVhZFwiXTsgLy8gdGhpcyBtZXRob2QgaXMga2FpdGFpIGludGVybmFsIGFuZCBOT1QgYSBnZXR0ZXIgZm9yIGEgcGF5bG9hZCBwcm9wZXJ0eVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBOd2N0UHJzUGF5bG9hZEFyZ3VtZW50cy5cclxuICAgICAqIEBwYXJhbSB7Kn0gaW5wdXRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IGxvY2F0aW9uXHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdFByc1BheWxvYWRBcmd1bWVudHNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGlucHV0IDogYW55LCBsb2NhdGlvbiA6IHN0cmluZ1tdKXtcclxuICAgICAgIHN1cGVyKGlucHV0LCBsb2NhdGlvbik7XHJcbiAgICAgICB0aGlzLl9wYXlsb2FkID0gbmV3IEFycmF5PE53Y3RQcnNQYXlsb2FkQXJndW1lbnQ+KCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHluYW1pY2FsbHkgcGFyc2UgYWxsIHByb3BlcnRpZXMgb2YgdGhlIHBheWxvYWQgKHRoZSBudW1iZXIgb2YgcHJvcGVydGllcyBkZXBlbmRzIG9uIHRoZSBwYXJJZClcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtBcnJheTxOd2N0UHJzUGF5bG9hZEFyZ3VtZW50Pn1cclxuICAgICAqIEBtZW1iZXJvZiBOd2N0RGF0YUVudHJ5UGF5bG9hZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHBheWxvYWQoKSA6IEFycmF5PE53Y3RQcnNQYXlsb2FkQXJndW1lbnQ+e1xyXG4gICAgICAgIHRoaXMucGFyc2VBbGxQcm9wZXJ0aWVzKCk7IC8vIHRoaXMgbWV0aG9kIHRha2VzIGNhcmUgdGhhdCBwYXJzaW5nIGlzIG9ubHkgZG9uZSB0aGUgZmlyc3QgdGltZVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXlsb2FkOyAgICAgICBcclxuICAgIH1cclxuXHJcblxyXG4gICAgXHJcbiAgICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgYWxsIGNvbnRhaW5lZCBwcm9wZXJ0aWVzIGFyZSB2YWxpZFxyXG4gICAgICogQVRURU5USU9OOiBQcm9jZXNzaW5nIGFsbCBwcm9wZXJ0aWVzIGNhbiBjb25zdW1lIGEgbG9uZyB0aW1lXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdENvbmZpZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgdmFsaWQoKSA6IGJvb2xlYW57XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZXh0cmFjdCB2YWxpZCBwcm9wZXJ0eVxyXG4gICAgICAgIGxldCB2YWxpZFN0YXRlcyA6IEFycmF5PGJvb2xlYW4+ICA9IHRoaXMucGF5bG9hZC5tYXAocHJvcE9iaiA9PiBwcm9wT2JqLnZhbGlkKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyByZXN1bHQgaXMgb25seSB0cnVlIGlmIGFsbCBwcm9wZXJ0aWVzIGFyZSB2YWxpZFxyXG4gICAgICAgIGxldCByZXN1bHQgOiBib29sZWFuID0gdmFsaWRTdGF0ZXMucmVkdWNlKCh0bXBSZXN1bHQsIGN1cnJlbnRWYWx1ZSkgPT4gdG1wUmVzdWx0ICYmIGN1cnJlbnRWYWx1ZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuICByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFsbCBwcm9wZXJ0aWVzIGFyZSBwYXJzZWQgYW5kIGFkZGVkIGludG8gdGhlIHBhbG9hZCBhcmd1bWVudCBhcnJheSAoaWYgbm90IHBhcnNlZCBhbHJlYWR5KVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdERhdGFFbnRyeVBheWxvYWRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBwYXJzZUFsbFByb3BlcnRpZXMoKXtcclxuICAgICAgICBcclxuICAgICAgICAvLyBwYXJzaW5nIGlzIG9ubHkgZG9uZSBvbmNlXHJcbiAgICAgICAgaWYodGhpcy5fcGFyc2VkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gbm9ybWFsIHZhbHVlIHByb3BlcmllcyBhbmQgZ2V0dGVyIHByb3BlcnRpZXMgYXJlIGFjY2Vzc2VkIGRpZmZlcmVudGx5IHZpYSBvYmplY3QgcmVmbGVjdGlvbiAgICBcclxuICAgICAgICB0aGlzLnBhcnNlR2V0dGVyUHJvcGVydGllcygpO1xyXG4gICAgICAgIHRoaXMucGFyc2VWYWx1ZVByb3BlcnRpZXMoKTtcclxuICAgICAgICB0aGlzLl9wYXJzZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIHJldHVybnMgdGhlIHByb3BlcnRpZXMgb2YgdGhlIHVudHlwZWQgb2JqZWN0IHRoYXQgYXJlIGFjY2Vzc2FibGUgYXMgdmFsdWUgcHJvcGVydGllc1xyXG4gICAgICogZXhjZXB0IGJsYWNrbGlzdGVkIHByb3BlcnRpZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBOd2N0UHJzUGF5bG9hZEFyZ3VtZW50c1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHBhcnNlVmFsdWVQcm9wZXJ0aWVzKCl7XHJcbiAgICAgICAgbGV0IHByb3BlcnRpZU5hbWVzOiBzdHJpbmdbXSA9IE9iamVjdC5rZXlzKHRoaXMuX2lucHV0KTtcclxuXHJcbiAgICAgICAgLy8gcmVzdWx0IG11c3QgYmUgYW4gYXJyYXlcclxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocHJvcGVydGllTmFtZXMpKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gcmVtb3ZlIGJsYWNrIGxpc3QgZWxlbW50cyB0aGF0IGFyZSBjb21taW5nIGZyb20gdGhlIGthaXRhaSBpbXBsZW1lbnRhdGlvbjogX2lvLCBfcm9vdCwgX3BhcmVudCAgICAgICAgICAgIFxyXG4gICAgICAgIGxldCBmaWx0ZXJlZFByb3BlcnRpZU5hbWVzID0gcHJvcGVydGllTmFtZXMuZmlsdGVyKHByb3BlcnR5TmFtZSA9PiAhdGhpcy5pc09uQmxhY2tMaXN0KHByb3BlcnR5TmFtZSwgdGhpcy5ibGFja0xpc3RQcm9wZXJ0aWVzKSk7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBhIGxpc3QgY29udGFpbmluZyB0aGUgbmV3IHByb3BlcnRpZXNcclxuICAgICAgICBmaWx0ZXJlZFByb3BlcnRpZU5hbWVzLmZvckVhY2gocHJvcGVydHlOYW1lID0+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA6IGFueSA9IHRoaXMuX2lucHV0W3Byb3BlcnR5TmFtZV07ICAgIC8vIGdldCB1bnR5cGVkIHZhbHVlXHJcbiAgICAgICAgICAgIGxldCB2YWxpZCA6IGJvb2xlYW4gPSB0aGlzLmlzVmFsaWQodmFsdWUpOyAgICAgIC8vIGNoZWNrIGZvciB2YWxpZGl0eVxyXG5cclxuICAgICAgICAgICAgLy8gY3JlYXRlIHBheWxvYWQgaXRlbVxyXG4gICAgICAgICAgICBsZXQgcGF5bG9hZEFyZyA9IG5ldyBOd2N0UHJzUGF5bG9hZEFyZ3VtZW50KHZhbHVlLCBwcm9wZXJ0eU5hbWUsIHZhbGlkKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFkZCBwYXlsb2FkIGl0ZW1cclxuICAgICAgICAgICAgdGhpcy5fcGF5bG9hZC5wdXNoKHBheWxvYWRBcmcpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHJpZXZlcyB0aGUgcHJvcGVydGllcyBvZiB0aGUgdW50eXBlZCBvYmplY3QgdGhhdCBhcmUgYWNjZXNzYWJsZSB2aWEgZ2V0dGVyIG1ldGhvZHNcclxuICAgICAqIGV4Y2VwdCBibGFja2xpc3RlZCBtZXRob2RzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdFByc1BheWxvYWRBcmd1bWVudHNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBwYXJzZUdldHRlclByb3BlcnRpZXMoKSB7XHJcbiAgICAgICAgbGV0IG1ldGhvZE5hbWVzOiBzdHJpbmdbXSA9IE9iamVjdFJlZmxlY3Rpb24uZ2V0TWV0aG9kTmFtZXModGhpcy5faW5wdXQpO1xyXG5cclxuICAgICAgICAvLyByZXN1bHQgbXVzdCBiZSBhbiBhcnJheVxyXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShtZXRob2ROYW1lcykpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyByZW1vdmUgaXJyZWxldmFudCBtZXRob2RzIGZyb20gYmxhY2sgbGlzdFxyXG4gICAgICAgIGxldCBnZXR0ZXJOYW1lcyA9IG1ldGhvZE5hbWVzLmZpbHRlcihnZXR0ZXJOYW1lID0+ICF0aGlzLmlzT25CbGFja0xpc3QoZ2V0dGVyTmFtZSx0aGlzLmJsYWNrTGlzdE1ldGhvZHMpKTtcclxuXHJcblxyXG4gICAgICAgIGdldHRlck5hbWVzLmZvckVhY2goZ2V0dGVyTmFtZSA9PiB7XHJcblxyXG4gICAgICAgICAgICAvLyBjYWxsIGdldHRlciB0byByZXRyaWV2ZSB0aGUgdW50eXBlZCB2YWx1ZVxyXG4gICAgICAgICAgICBsZXQgdmFsdWU6IGFueTtcclxuICAgICAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBPYmplY3RSZWZsZWN0aW9uLmNhbGxHZXR0ZXJCeU5hbWUodGhpcy5faW5wdXQsIGdldHRlck5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoKGUpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHZhbGlkIDogYm9vbGVhbiA9IHRoaXMuaXNWYWxpZCh2YWx1ZSk7ICAgICAgLy8gY2hlY2sgZm9yIHZhbGlkaXR5XHJcblxyXG4gICAgICAgICAgICAvLyBjcmVhdGUgcGF5bG9hZCBpdGVtXHJcbiAgICAgICAgICAgIGxldCBwYXlsb2FkQXJnID0gbmV3IE53Y3RQcnNQYXlsb2FkQXJndW1lbnQodmFsdWUsIGdldHRlck5hbWUsIHZhbGlkKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGFkZCBwYXlsb2FkIGl0ZW1cclxuICAgICAgICAgICAgdGhpcy5fcGF5bG9hZC5wdXNoKHBheWxvYWRBcmcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHVybnMgdHJ1ZSBpZiBhbGwgaXRlbXMgYXJlIHZhbGlkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdFByc1BheWxvYWRBcmd1bWVudHNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGlzVmFsaWQodmFsdWUgOiBhbnkpIDogYm9vbGVhbntcclxuXHJcbiAgICAgICAgLy8gY2hlY2sgaWYgdHlwZSBpcyBzdXBwb3J0ZWRcclxuICAgICAgICByZXR1cm4gdHlwZW9mKHZhbHVlKT09PVwibnVtYmVyXCIgfHwgdHlwZW9mKHZhbHVlKT09PVwic3RyaW5nXCI7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHRoZSBuYW1lIGlzIGJsYWNrbGlzdGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IGJsYWNrTGlzdFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBOd2N0UHJzUGF5bG9hZEFyZ3VtZW50c1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGlzT25CbGFja0xpc3QobmFtZSA6IHN0cmluZywgYmxhY2tMaXN0IDogQXJyYXk8c3RyaW5nPil7XHJcbiAgICAgICAgLy8gaXMgb24gYmxhY2sgbGlzdD8gXHJcbiAgICAgICAgcmV0dXJuIGJsYWNrTGlzdC5pbmRleE9mKG5hbWUpPi0xOzsgXHJcbiAgICB9XHJcblxyXG59Il19