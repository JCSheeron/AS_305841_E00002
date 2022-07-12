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
define(["require", "exports", "./nwctPrsItemBase", "./nwctPrsPropertyNumber", "./nwctPropNames"], function (require, exports, nwctPrsItemBase_1, nwctPrsPropertyNumber_1, nwctPropNames_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Stongly typed access to a parsed config entry
     *
     * @export
     * @class NwctConfigEntry
     * @extends {NwctPrsItemBase}
     * @implements {INwctConfigEntry}
     */
    var NwctConfigEntry = /** @class */ (function (_super) {
        __extends(NwctConfigEntry, _super);
        /**
         * Creates an instance of NwctConfigEntry and expects the parsed object containing one configuration record comming from the kaitai parser
         * @param {*} input
         * @memberof NwctConfigEntry
         */
        function NwctConfigEntry(input) {
            var _this = _super.call(this, input) || this;
            // create all properties
            _this._configurationRecordId = new nwctPrsPropertyNumber_1.NwctPrsPropertyNumber(input, [nwctPropNames_1.NwctPropNames.configRecordId]);
            _this._networkType = new nwctPrsPropertyNumber_1.NwctPrsPropertyNumber(input, [nwctPropNames_1.NwctPropNames.configNetworkType]);
            _this._networkInterfaceIndex = new nwctPrsPropertyNumber_1.NwctPrsPropertyNumber(input, [nwctPropNames_1.NwctPropNames.configNetworkInterfaceIndex]);
            _this._nodeNumberOfDrive = new nwctPrsPropertyNumber_1.NwctPrsPropertyNumber(input, [nwctPropNames_1.NwctPropNames.configNodeNo]);
            _this._datagramType = new nwctPrsPropertyNumber_1.NwctPrsPropertyNumber(input, [nwctPropNames_1.NwctPropNames.configDatagramType]);
            _this._datagramEncodingId = new nwctPrsPropertyNumber_1.NwctPrsPropertyNumber(input, [nwctPropNames_1.NwctPropNames.configDatagramEncodingId]);
            // create list of all contained parse items to be able to compute the sum of the states
            _this._prsItems = new Array();
            _this._prsItems.push(_this._configurationRecordId);
            _this._prsItems.push(_this._networkType);
            _this._prsItems.push(_this._networkInterfaceIndex);
            _this._prsItems.push(_this._nodeNumberOfDrive);
            _this._prsItems.push(_this._datagramType);
            _this._prsItems.push(_this._datagramEncodingId);
            return _this;
        }
        Object.defineProperty(NwctConfigEntry.prototype, "valid", {
            /**
             * Returns true if all contained properties are valid
             * ATTENTION: Processing all properties can consume a long time
             *
             * @readonly
             * @memberof NwctConfigEntry
             */
            get: function () {
                // extract valid property
                var validStates = this._prsItems.map(function (propObj) { return propObj.valid; });
                // result is only true if all properties are valid
                var result = validStates.reduce(function (tmpResult, currentValue) { return tmpResult && currentValue; });
                return result;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctConfigEntry.prototype, "configurationRecordId", {
            /**
             * Returns the id of the configuration record
             *
             * @readonly
             * @type {INwctPrsPropertyNumber}
             * @memberof NwctConfigEntry
             */
            get: function () {
                return this._configurationRecordId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctConfigEntry.prototype, "networkType", {
            /**
             * Returns the network type id
             *
             * @readonly
             * @type {INwctPrsPropertyNumber}
             * @memberof NwctConfigEntry
             */
            get: function () {
                return this._networkType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctConfigEntry.prototype, "networkInterfaceIndex", {
            /**
             * Returns the index of the network interface
             *
             * @readonly
             * @type {INwctPrsPropertyNumber}
             * @memberof NwctConfigEntry
             */
            get: function () {
                return this._networkInterfaceIndex;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctConfigEntry.prototype, "nodeNumberOfDrive", {
            /**
             * Returns the node number of the drive
             *
             * @readonly
             * @type {INwctPrsPropertyNumber}
             * @memberof NwctConfigEntry
             */
            get: function () {
                return this._nodeNumberOfDrive;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctConfigEntry.prototype, "datagramType", {
            /**
             * Returns the datagram type id
             *
             * @readonly
             * @type {INwctPrsPropertyNumber}
             * @memberof NwctConfigEntry
             */
            get: function () {
                return this._datagramType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctConfigEntry.prototype, "datagramEncodingId", {
            /**
             * Returns the datagram encoding id
             *
             * @readonly
             * @type {INwctPrsPropertyNumber}
             * @memberof NwctConfigEntry
             */
            get: function () {
                return this._datagramEncodingId;
            },
            enumerable: true,
            configurable: true
        });
        return NwctConfigEntry;
    }(nwctPrsItemBase_1.NwctPrsItemBase));
    exports.NwctConfigEntry = NwctConfigEntry;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibndjdENvbmZpZ0VudHJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vbndjdFByb3ZpZGVyL29ialBhcnNlci9ud2N0Q29uZmlnRW50cnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVNBOzs7Ozs7O09BT0c7SUFDSDtRQUFxQyxtQ0FBZTtRQVVoRDs7OztXQUlHO1FBQ0gseUJBQW1CLEtBQVc7WUFBOUIsWUFDSSxrQkFBTSxLQUFLLENBQUMsU0FrQmY7WUFoQkcsd0JBQXdCO1lBQ3hCLEtBQUksQ0FBQyxzQkFBc0IsR0FBSSxJQUFJLDZDQUFxQixDQUFDLEtBQUssRUFBRSxDQUFDLDZCQUFhLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUNoRyxLQUFJLENBQUMsWUFBWSxHQUFjLElBQUksNkNBQXFCLENBQUMsS0FBSyxFQUFFLENBQUMsNkJBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDbkcsS0FBSSxDQUFDLHNCQUFzQixHQUFJLElBQUksNkNBQXFCLENBQUMsS0FBSyxFQUFFLENBQUMsNkJBQWEsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLENBQUM7WUFDN0csS0FBSSxDQUFDLGtCQUFrQixHQUFRLElBQUksNkNBQXFCLENBQUMsS0FBSyxFQUFFLENBQUMsNkJBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQzlGLEtBQUksQ0FBQyxhQUFhLEdBQWEsSUFBSSw2Q0FBcUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQyw2QkFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztZQUNwRyxLQUFJLENBQUMsbUJBQW1CLEdBQU8sSUFBSSw2Q0FBcUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQyw2QkFBYSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQztZQUUxRyx1RkFBdUY7WUFDdkYsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLEtBQUssRUFBbUIsQ0FBQztZQUM5QyxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUNqRCxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFFLENBQUM7WUFDeEMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDakQsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLGtCQUFrQixDQUFFLENBQUM7WUFDOUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3hDLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDOztRQUNsRCxDQUFDO1FBU0Qsc0JBQVcsa0NBQUs7WUFQaEI7Ozs7OztlQU1HO2lCQUNIO2dCQUVJLHlCQUF5QjtnQkFDekIsSUFBSSxXQUFXLEdBQXFCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLEtBQUssRUFBYixDQUFhLENBQUMsQ0FBQztnQkFFakYsa0RBQWtEO2dCQUNsRCxJQUFJLE1BQU0sR0FBYSxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQUMsU0FBUyxFQUFFLFlBQVksSUFBSyxPQUFBLFNBQVMsSUFBSSxZQUFZLEVBQXpCLENBQXlCLENBQUMsQ0FBQztnQkFFbEcsT0FBUSxNQUFNLENBQUM7WUFDbkIsQ0FBQzs7O1dBQUE7UUFVRCxzQkFBVyxrREFBcUI7WUFQaEM7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDO1lBQ3ZDLENBQUM7OztXQUFBO1FBU0Qsc0JBQVcsd0NBQVc7WUFQdEI7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztZQUM3QixDQUFDOzs7V0FBQTtRQVVELHNCQUFXLGtEQUFxQjtZQVBoQzs7Ozs7O2VBTUc7aUJBQ0g7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUM7WUFDdkMsQ0FBQzs7O1dBQUE7UUFVRCxzQkFBVyw4Q0FBaUI7WUFQNUI7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDO1lBQ25DLENBQUM7OztXQUFBO1FBU0Qsc0JBQVcseUNBQVk7WUFQdkI7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUM5QixDQUFDOzs7V0FBQTtRQVNELHNCQUFXLCtDQUFrQjtZQVA3Qjs7Ozs7O2VBTUc7aUJBQ0g7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUM7WUFDcEMsQ0FBQzs7O1dBQUE7UUFDTCxzQkFBQztJQUFELENBQUMsQUExSEQsQ0FBcUMsaUNBQWUsR0EwSG5EO0lBMUhZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU53Y3RDb25maWdFbnRyeSB9IGZyb20gXCIuL2ludGVyZmFjZXMvbndjdENvbmZpZ0VudHJ5SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElOd2N0UHJzUHJvcGVydHlOdW1iZXIgYXMgSU53Y3RQcnNQcm9wZXJ0eU51bWJlciB9IGZyb20gXCIuL2ludGVyZmFjZXMvbndjdFByc1Byb3BlcnR5TnVtYmVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IE53Y3RQcnNJdGVtQmFzZSBhcyBOd2N0UHJzSXRlbUJhc2UgfSBmcm9tIFwiLi9ud2N0UHJzSXRlbUJhc2VcIjtcclxuaW1wb3J0IHsgTndjdFByc1Byb3BlcnR5TnVtYmVyIH0gZnJvbSBcIi4vbndjdFByc1Byb3BlcnR5TnVtYmVyXCI7XHJcbmltcG9ydCB7IE53Y3RQcm9wTmFtZXMgfSBmcm9tIFwiLi9ud2N0UHJvcE5hbWVzXCI7XHJcbmltcG9ydCB7IElOd2N0UHJzSXRlbSB9IGZyb20gXCIuL2ludGVyZmFjZXMvbndjdFByc0l0ZW1JbnRlcmZhY2VcIjtcclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIFN0b25nbHkgdHlwZWQgYWNjZXNzIHRvIGEgcGFyc2VkIGNvbmZpZyBlbnRyeVxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBOd2N0Q29uZmlnRW50cnlcclxuICogQGV4dGVuZHMge053Y3RQcnNJdGVtQmFzZX1cclxuICogQGltcGxlbWVudHMge0lOd2N0Q29uZmlnRW50cnl9XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTndjdENvbmZpZ0VudHJ5IGV4dGVuZHMgTndjdFByc0l0ZW1CYXNlIGltcGxlbWVudHMgSU53Y3RDb25maWdFbnRyeXtcclxuXHJcbiAgICBwcml2YXRlIF9jb25maWd1cmF0aW9uUmVjb3JkSWQgIDogSU53Y3RQcnNQcm9wZXJ0eU51bWJlcjtcclxuICAgIHByaXZhdGUgX25ldHdvcmtUeXBlICAgICAgICAgICAgOiBJTndjdFByc1Byb3BlcnR5TnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfbmV0d29ya0ludGVyZmFjZUluZGV4ICA6IElOd2N0UHJzUHJvcGVydHlOdW1iZXI7XHJcbiAgICBwcml2YXRlIF9ub2RlTnVtYmVyT2ZEcml2ZSAgICAgIDogSU53Y3RQcnNQcm9wZXJ0eU51bWJlcjtcclxuICAgIHByaXZhdGUgX2RhdGFncmFtVHlwZSAgICAgICAgICAgOiBJTndjdFByc1Byb3BlcnR5TnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfZGF0YWdyYW1FbmNvZGluZ0lkICAgICA6IElOd2N0UHJzUHJvcGVydHlOdW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9wcnNJdGVtcyAgOiBBcnJheTxJTndjdFByc0l0ZW0+O1xyXG4gICBcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBOd2N0Q29uZmlnRW50cnkgYW5kIGV4cGVjdHMgdGhlIHBhcnNlZCBvYmplY3QgY29udGFpbmluZyBvbmUgY29uZmlndXJhdGlvbiByZWNvcmQgY29tbWluZyBmcm9tIHRoZSBrYWl0YWkgcGFyc2VyXHJcbiAgICAgKiBAcGFyYW0geyp9IGlucHV0XHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdENvbmZpZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihpbnB1dCA6IGFueSl7XHJcbiAgICAgICAgc3VwZXIoaW5wdXQpO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgYWxsIHByb3BlcnRpZXNcclxuICAgICAgICB0aGlzLl9jb25maWd1cmF0aW9uUmVjb3JkSWQgID0gbmV3IE53Y3RQcnNQcm9wZXJ0eU51bWJlcihpbnB1dCwgW053Y3RQcm9wTmFtZXMuY29uZmlnUmVjb3JkSWRdKTtcclxuICAgICAgICB0aGlzLl9uZXR3b3JrVHlwZSAgICAgICAgICAgID0gbmV3IE53Y3RQcnNQcm9wZXJ0eU51bWJlcihpbnB1dCwgW053Y3RQcm9wTmFtZXMuY29uZmlnTmV0d29ya1R5cGVdKTtcclxuICAgICAgICB0aGlzLl9uZXR3b3JrSW50ZXJmYWNlSW5kZXggID0gbmV3IE53Y3RQcnNQcm9wZXJ0eU51bWJlcihpbnB1dCwgW053Y3RQcm9wTmFtZXMuY29uZmlnTmV0d29ya0ludGVyZmFjZUluZGV4XSk7XHJcbiAgICAgICAgdGhpcy5fbm9kZU51bWJlck9mRHJpdmUgICAgICA9IG5ldyBOd2N0UHJzUHJvcGVydHlOdW1iZXIoaW5wdXQsIFtOd2N0UHJvcE5hbWVzLmNvbmZpZ05vZGVOb10pO1xyXG4gICAgICAgIHRoaXMuX2RhdGFncmFtVHlwZSAgICAgICAgICAgPSBuZXcgTndjdFByc1Byb3BlcnR5TnVtYmVyKGlucHV0LCBbTndjdFByb3BOYW1lcy5jb25maWdEYXRhZ3JhbVR5cGVdKTtcclxuICAgICAgICB0aGlzLl9kYXRhZ3JhbUVuY29kaW5nSWQgICAgID0gbmV3IE53Y3RQcnNQcm9wZXJ0eU51bWJlcihpbnB1dCwgW053Y3RQcm9wTmFtZXMuY29uZmlnRGF0YWdyYW1FbmNvZGluZ0lkXSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gY3JlYXRlIGxpc3Qgb2YgYWxsIGNvbnRhaW5lZCBwYXJzZSBpdGVtcyB0byBiZSBhYmxlIHRvIGNvbXB1dGUgdGhlIHN1bSBvZiB0aGUgc3RhdGVzXHJcbiAgICAgICAgdGhpcy5fcHJzSXRlbXMgPSBuZXcgQXJyYXk8TndjdFByc0l0ZW1CYXNlPigpO1xyXG4gICAgICAgIHRoaXMuX3Byc0l0ZW1zLnB1c2godGhpcy5fY29uZmlndXJhdGlvblJlY29yZElkKTtcclxuICAgICAgICB0aGlzLl9wcnNJdGVtcy5wdXNoKHRoaXMuX25ldHdvcmtUeXBlICk7XHJcbiAgICAgICAgdGhpcy5fcHJzSXRlbXMucHVzaCh0aGlzLl9uZXR3b3JrSW50ZXJmYWNlSW5kZXgpO1xyXG4gICAgICAgIHRoaXMuX3Byc0l0ZW1zLnB1c2godGhpcy5fbm9kZU51bWJlck9mRHJpdmUgKTtcclxuICAgICAgICB0aGlzLl9wcnNJdGVtcy5wdXNoKHRoaXMuX2RhdGFncmFtVHlwZSk7XHJcbiAgICAgICAgdGhpcy5fcHJzSXRlbXMucHVzaCh0aGlzLl9kYXRhZ3JhbUVuY29kaW5nSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIGFsbCBjb250YWluZWQgcHJvcGVydGllcyBhcmUgdmFsaWRcclxuICAgICAqIEFUVEVOVElPTjogUHJvY2Vzc2luZyBhbGwgcHJvcGVydGllcyBjYW4gY29uc3VtZSBhIGxvbmcgdGltZVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RDb25maWdFbnRyeVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHZhbGlkKCl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZXh0cmFjdCB2YWxpZCBwcm9wZXJ0eVxyXG4gICAgICAgIGxldCB2YWxpZFN0YXRlcyA6IEFycmF5PGJvb2xlYW4+ICA9IHRoaXMuX3Byc0l0ZW1zLm1hcChwcm9wT2JqID0+IHByb3BPYmoudmFsaWQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHJlc3VsdCBpcyBvbmx5IHRydWUgaWYgYWxsIHByb3BlcnRpZXMgYXJlIHZhbGlkXHJcbiAgICAgICAgbGV0IHJlc3VsdCA6IGJvb2xlYW4gPSB2YWxpZFN0YXRlcy5yZWR1Y2UoKHRtcFJlc3VsdCwgY3VycmVudFZhbHVlKSA9PiB0bXBSZXN1bHQgJiYgY3VycmVudFZhbHVlKTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gIHJlc3VsdDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpZCBvZiB0aGUgY29uZmlndXJhdGlvbiByZWNvcmRcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtJTndjdFByc1Byb3BlcnR5TnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RDb25maWdFbnRyeVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGNvbmZpZ3VyYXRpb25SZWNvcmRJZCgpIDogSU53Y3RQcnNQcm9wZXJ0eU51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlndXJhdGlvblJlY29yZElkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgbmV0d29yayB0eXBlIGlkXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7SU53Y3RQcnNQcm9wZXJ0eU51bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBOd2N0Q29uZmlnRW50cnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBuZXR3b3JrVHlwZSgpIDogSU53Y3RQcnNQcm9wZXJ0eU51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmV0d29ya1R5cGU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG5ldHdvcmsgaW50ZXJmYWNlXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7SU53Y3RQcnNQcm9wZXJ0eU51bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBOd2N0Q29uZmlnRW50cnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBuZXR3b3JrSW50ZXJmYWNlSW5kZXgoKSA6IElOd2N0UHJzUHJvcGVydHlOdW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25ldHdvcmtJbnRlcmZhY2VJbmRleDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBub2RlIG51bWJlciBvZiB0aGUgZHJpdmVcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtJTndjdFByc1Byb3BlcnR5TnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RDb25maWdFbnRyeVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IG5vZGVOdW1iZXJPZkRyaXZlKCkgOiBJTndjdFByc1Byb3BlcnR5TnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9ub2RlTnVtYmVyT2ZEcml2ZTtcclxuICAgIH0gXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkYXRhZ3JhbSB0eXBlIGlkXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7SU53Y3RQcnNQcm9wZXJ0eU51bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBOd2N0Q29uZmlnRW50cnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBkYXRhZ3JhbVR5cGUoKSA6IElOd2N0UHJzUHJvcGVydHlOdW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFncmFtVHlwZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRhdGFncmFtIGVuY29kaW5nIGlkXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7SU53Y3RQcnNQcm9wZXJ0eU51bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBOd2N0Q29uZmlnRW50cnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBkYXRhZ3JhbUVuY29kaW5nSWQoKSA6IElOd2N0UHJzUHJvcGVydHlOdW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFncmFtRW5jb2RpbmdJZDtcclxuICAgIH1cclxufVxyXG5cclxuIl19