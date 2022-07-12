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
define(["require", "exports", "./nwctPrsPropertyNumber", "./nwctPropNames", "./nwctPrsItemBase", "./nwctPrsPayloadBytes"], function (require, exports, nwctPrsPropertyNumber_1, nwctPropNames_1, nwctPrsItemBase_1, nwctPrsPayloadBytes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Parses a single data entry comming from the nwct kaitai parser
     * Gives strictly typed access to the content of the entry
     *
     * @export
     * @class NwctDataEntry
     */
    var NwctDataEntry = /** @class */ (function (_super) {
        __extends(NwctDataEntry, _super);
        /**
         * Creates an instance of NwctDataEntry.
         * @param {*} input expexts the data comming from the kaitai generated parser
         * @param {NwctConfigEntries} objParsRoot
         * @param {NwctDataEntries} dataEntries
         * @memberof NwctDataEntry
         */
        function NwctDataEntry(input, dataEntries, configEntries) {
            var _this = _super.call(this, input) || this;
            _this._configEntry = undefined; // this is teh configuration record that was referenced by the config record id
            _this._dataEntries = dataEntries;
            _this._configEntries = configEntries;
            _this._parId = new nwctPrsPropertyNumber_1.NwctPrsPropertyNumber(input, [nwctPropNames_1.NwctPropNames.dataAcopos, nwctPropNames_1.NwctPropNames.dataParId]);
            _this._time = new nwctPrsPropertyNumber_1.NwctPrsPropertyNumber(input, [nwctPropNames_1.NwctPropNames.dataTime]);
            _this._index = new nwctPrsPropertyNumber_1.NwctPrsPropertyNumber(input, [nwctPropNames_1.NwctPropNames.dataNo]);
            _this._parCnt = new nwctPrsPropertyNumber_1.NwctPrsPropertyNumber(input, [nwctPropNames_1.NwctPropNames.dataAcopos, nwctPropNames_1.NwctPropNames.dataCnt]);
            _this._channelIndex = new nwctPrsPropertyNumber_1.NwctPrsPropertyNumber(input, [nwctPropNames_1.NwctPropNames.dataChannelIndex]);
            _this._ncObjectType = new nwctPrsPropertyNumber_1.NwctPrsPropertyNumber(input, [nwctPropNames_1.NwctPropNames.ncObjectType]);
            _this._configId = new nwctPrsPropertyNumber_1.NwctPrsPropertyNumber(input, [nwctPropNames_1.NwctPropNames.dataConfigEntryId]);
            _this._payload = new nwctPrsPayloadBytes_1.NwctPrsPayloadBytes(input, [nwctPropNames_1.NwctPropNames.dataAcopos, nwctPropNames_1.NwctPropNames.dataPayload]);
            // create list of all contained parse items to be able to compute the sum of the states
            _this._prsItems = new Array();
            _this._prsItems.push(_this._parId);
            _this._prsItems.push(_this._time);
            _this._prsItems.push(_this._index);
            _this._prsItems.push(_this._parCnt);
            _this._prsItems.push(_this._channelIndex);
            _this._prsItems.push(_this._ncObjectType);
            _this._prsItems.push(_this._configId);
            _this._prsItems.push(_this._payload);
            return _this;
        }
        Object.defineProperty(NwctDataEntry.prototype, "valid", {
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
        Object.defineProperty(NwctDataEntry.prototype, "parId", {
            /**
             * reutuns the ParID
             *
             * @readonly
             * @type {INwctPrsPropertyNumber}
             * @memberof NwctDataEntry
             */
            get: function () {
                return this._parId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctDataEntry.prototype, "time", {
            /**
             * returns the time in seconds
             *
             * @readonly
             * @type {INwctPrsPropertyNumber}
             * @memberof NwctDataEntry
             */
            get: function () {
                return this._time;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctDataEntry.prototype, "index", {
            /**
             * returns the index (which represents the order of entries beeing written into the logbook)
             *
             * @readonly
             * @type {INwctPrsPropertyNumber}
             * @memberof NwctDataEntry
             */
            get: function () {
                return this._index;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctDataEntry.prototype, "parCnt", {
            /**
             *
             *
             * @readonly
             * @type {INwctPrsPropertyNumber}
             * @memberof NwctDataEntry
             */
            get: function () {
                return this._parCnt;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctDataEntry.prototype, "channelIndex", {
            /**
             * returns the channel index
             *
             * @readonly
             * @type {INwctPrsPropertyNumber}
             * @memberof NwctDataEntry
             */
            get: function () {
                return this._channelIndex;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctDataEntry.prototype, "ncObjectType", {
            /**
             * returns the nc obejct type
             *
             * @readonly
             * @type {INwctPrsPropertyNumber}
             * @memberof NwctDataEntry
             */
            get: function () {
                return this._ncObjectType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctDataEntry.prototype, "configId", {
            /**
             * The configuration id is used to retrieve the information from the configuration record and to find the response <--> request connection
             *
             * @readonly
             * @private
             * @type {INwctPrsPropertyNumber}
             * @memberof NwctDataEntry
             */
            get: function () {
                return this._configId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctDataEntry.prototype, "payloadBytes", {
            /**
             * returns all payload arguments (the number and type of the arguements depends on the ParID)
             *
             * @readonly
             * @type {Array<NwctPrsPayloadArgument>}
             * @memberof NwctDataEntry
             */
            get: function () {
                return this._payload;
            },
            enumerable: true,
            configurable: true
        });
        return NwctDataEntry;
    }(nwctPrsItemBase_1.NwctPrsItemBase));
    exports.NwctDataEntry = NwctDataEntry;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibndjdERhdGFFbnRyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL253Y3RQcm92aWRlci9vYmpQYXJzZXIvbndjdERhdGFFbnRyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBWUE7Ozs7OztPQU1HO0lBQ0g7UUFBbUMsaUNBQWU7UUFpQjlDOzs7Ozs7V0FNRztRQUNILHVCQUFtQixLQUFXLEVBQUUsV0FBOEIsRUFBQyxhQUFrQztZQUFqRyxZQUNJLGtCQUFNLEtBQUssQ0FBQyxTQXdCZjtZQXJDTyxrQkFBWSxHQUFtQyxTQUFTLENBQUMsQ0FBQywrRUFBK0U7WUFlN0ksS0FBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7WUFDaEMsS0FBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7WUFFcEMsS0FBSSxDQUFDLE1BQU0sR0FBVyxJQUFJLDZDQUFxQixDQUFDLEtBQUssRUFBRSxDQUFDLDZCQUFhLENBQUMsVUFBVSxFQUFFLDZCQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUM1RyxLQUFJLENBQUMsS0FBSyxHQUFZLElBQUksNkNBQXFCLENBQUMsS0FBSyxFQUFFLENBQUMsNkJBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBO1lBQ2hGLEtBQUksQ0FBQyxNQUFNLEdBQVcsSUFBSSw2Q0FBcUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQyw2QkFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDL0UsS0FBSSxDQUFDLE9BQU8sR0FBVSxJQUFJLDZDQUFxQixDQUFDLEtBQUssRUFBRSxDQUFDLDZCQUFhLENBQUMsVUFBVSxFQUFFLDZCQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUMxRyxLQUFJLENBQUMsYUFBYSxHQUFJLElBQUksNkNBQXFCLENBQUMsS0FBSyxFQUFFLENBQUMsNkJBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENB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Vyx1Q0FBWTtZQVB2Qjs7Ozs7O2VBTUc7aUJBQ0g7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ3pCLENBQUM7OztXQUFBO1FBQ0wsb0JBQUM7SUFBRCxDQUFDLEFBL0pELENBQW1DLGlDQUFlLEdBK0pqRDtJQS9KWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElOd2N0Q29uZmlnRW50cnkgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL253Y3RDb25maWdFbnRyeUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJTndjdERhdGFFbnRyeSB9IGZyb20gXCIuL2ludGVyZmFjZXMvbndjdERhdGFFbnRyeUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJTndjdFByc1Byb3BlcnR5TnVtYmVyIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9ud2N0UHJzUHJvcGVydHlOdW1iZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgTndjdFByc1Byb3BlcnR5TnVtYmVyIH0gZnJvbSBcIi4vbndjdFByc1Byb3BlcnR5TnVtYmVyXCI7XHJcbmltcG9ydCB7IE53Y3RQcm9wTmFtZXMgfSBmcm9tIFwiLi9ud2N0UHJvcE5hbWVzXCI7XHJcbmltcG9ydCB7IE53Y3RQcnNJdGVtQmFzZSB9IGZyb20gXCIuL253Y3RQcnNJdGVtQmFzZVwiO1xyXG5pbXBvcnQgeyBJTndjdFByc0l0ZW0gfSBmcm9tIFwiLi9pbnRlcmZhY2VzL253Y3RQcnNJdGVtSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElOd2N0Q29uZmlnRW50cmllcyB9IGZyb20gXCIuL2ludGVyZmFjZXMvbndjdENvbmZpZ0VudHJpZXNJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSU53Y3REYXRhRW50cmllcyB9IGZyb20gXCIuL2ludGVyZmFjZXMvbndjdERhdGFFbnRyaWVzSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IE53Y3RQcnNQYXlsb2FkQnl0ZXMgfSBmcm9tIFwiLi9ud2N0UHJzUGF5bG9hZEJ5dGVzXCI7XHJcbmltcG9ydCB7IElOd2N0UHJzUGF5bG9hZCB9IGZyb20gXCIuL2ludGVyZmFjZXMvbndjdFByc1BheWxvYWRJbnRlcmZhY2VcIjtcclxuXHJcbi8qKlxyXG4gKiBQYXJzZXMgYSBzaW5nbGUgZGF0YSBlbnRyeSBjb21taW5nIGZyb20gdGhlIG53Y3Qga2FpdGFpIHBhcnNlclxyXG4gKiBHaXZlcyBzdHJpY3RseSB0eXBlZCBhY2Nlc3MgdG8gdGhlIGNvbnRlbnQgb2YgdGhlIGVudHJ5XHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIE53Y3REYXRhRW50cnlcclxuICovXHJcbmV4cG9ydCBjbGFzcyBOd2N0RGF0YUVudHJ5IGV4dGVuZHMgTndjdFByc0l0ZW1CYXNlIGltcGxlbWVudHMgSU53Y3REYXRhRW50cnl7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfY29uZmlnRW50cmllczogSU53Y3RDb25maWdFbnRyaWVzOyAvLyBhbGxvd3MgdG8gc2VhcmNoIGZvciBjb25maWcgcmVjb3Jkc1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfZGF0YUVudHJpZXM6IElOd2N0RGF0YUVudHJpZXM7IC8vIGFsbG93cyB0byBzZWFyY2ggZm9yIHJlc3BvbnNlc1xyXG4gICAgXHJcbiAgICBwcml2YXRlIF9wYXJJZCA6ICAgICAgICBJTndjdFByc1Byb3BlcnR5TnVtYmVyOyAvLyB0aGUgZXh0cmFjdGVkIHBhcmlkXHJcbiAgICBwcml2YXRlIF90aW1lIDogICAgICAgICBJTndjdFByc1Byb3BlcnR5TnVtYmVyOyAvLyB0aGUgdGltZSBpbiBzZWNvbmRzIHJlbGF0aXZlIHRvIHNvbWUgaW50ZXJuYWwgc3RhcnRpbmcgdGltZVxyXG4gICAgcHJpdmF0ZSBfaW5kZXggOiAgICAgICAgSU53Y3RQcnNQcm9wZXJ0eU51bWJlcjsgLy8gdGhlIGluZGV4IHRoYXQgc3RhcnRzIHdpdGggMSBhbiBpbmNyZWFzZXMgd2l0aCB0aW1lXHJcbiAgICBwcml2YXRlIF9wYXJDbnQgOiAgICAgICBJTndjdFByc1Byb3BlcnR5TnVtYmVyOyAvLyB0aGlzIGlzIHNvbWUgY291bnRlciB1c2VkIHRvIGZpbmQgdGhlIGNvbm5lY3Rpb24gYmV0d2VlbiByZXNwb25zZSBhbmQgcmVxdWVzdFxyXG4gICAgcHJpdmF0ZSBfY2hhbm5lbEluZGV4IDogSU53Y3RQcnNQcm9wZXJ0eU51bWJlcjsgLy8gdGhpcyBpcyB0aGUgaW5kZXgvY2hhbm5lbCBvbiB0aGUgZGV2aWNlXHJcbiAgICBwcml2YXRlIF9uY09iamVjdFR5cGU6ICBJTndjdFByc1Byb3BlcnR5TnVtYmVyOyAvLyBuY09iamVjdCB0eXBlIHByb3BlcnR5XHJcbiAgICBwcml2YXRlIF9jb25maWdJZCA6ICAgICBJTndjdFByc1Byb3BlcnR5TnVtYmVyOyAvLyB0aGlzIGlkIGluZGVudGlmaWVzIHRoZSByZWxldmFudCBjb25maWd1cmF0aW9uIHJlY29yZFxyXG4gICAgcHJpdmF0ZSBfY29uZmlnRW50cnkgOiAgSU53Y3RDb25maWdFbnRyeSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDsgLy8gdGhpcyBpcyB0ZWggY29uZmlndXJhdGlvbiByZWNvcmQgdGhhdCB3YXMgcmVmZXJlbmNlZCBieSB0aGUgY29uZmlnIHJlY29yZCBpZFxyXG4gICAgcHJpdmF0ZSBfcGF5bG9hZCA6ICAgICAgTndjdFByc1BheWxvYWRCeXRlczsgLy8gdGhlIHBheWxvYWQgd2ljaCBtYXkgY29udGFpbiBtdWx0aXBsZSBpdGVtcyBvZiB0eXBlIG51bWJlciBvciBzdHJpbmdcclxuICAgIFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfcHJzSXRlbXMgIDogQXJyYXk8SU53Y3RQcnNJdGVtPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgTndjdERhdGFFbnRyeS5cclxuICAgICAqIEBwYXJhbSB7Kn0gaW5wdXQgZXhwZXh0cyB0aGUgZGF0YSBjb21taW5nIGZyb20gdGhlIGthaXRhaSBnZW5lcmF0ZWQgcGFyc2VyXHJcbiAgICAgKiBAcGFyYW0ge053Y3RDb25maWdFbnRyaWVzfSBvYmpQYXJzUm9vdFxyXG4gICAgICogQHBhcmFtIHtOd2N0RGF0YUVudHJpZXN9IGRhdGFFbnRyaWVzXHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdERhdGFFbnRyeVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoaW5wdXQgOiBhbnksIGRhdGFFbnRyaWVzIDogSU53Y3REYXRhRW50cmllcyxjb25maWdFbnRyaWVzIDogSU53Y3RDb25maWdFbnRyaWVzKXtcclxuICAgICAgICBzdXBlcihpbnB1dCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2RhdGFFbnRyaWVzID0gZGF0YUVudHJpZXM7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnRW50cmllcyA9IGNvbmZpZ0VudHJpZXM7XHJcblxyXG4gICAgICAgIHRoaXMuX3BhcklkICAgICAgICAgPSBuZXcgTndjdFByc1Byb3BlcnR5TnVtYmVyKGlucHV0LCBbTndjdFByb3BOYW1lcy5kYXRhQWNvcG9zLCBOd2N0UHJvcE5hbWVzLmRhdGFQYXJJZF0pO1xyXG4gICAgICAgIHRoaXMuX3RpbWUgICAgICAgICAgPSBuZXcgTndjdFByc1Byb3BlcnR5TnVtYmVyKGlucHV0LCBbTndjdFByb3BOYW1lcy5kYXRhVGltZV0pXHJcbiAgICAgICAgdGhpcy5faW5kZXggICAgICAgICA9IG5ldyBOd2N0UHJzUHJvcGVydHlOdW1iZXIoaW5wdXQsIFtOd2N0UHJvcE5hbWVzLmRhdGFOb10pO1xyXG4gICAgICAgIHRoaXMuX3BhckNudCAgICAgICAgPSBuZXcgTndjdFByc1Byb3BlcnR5TnVtYmVyKGlucHV0LCBbTndjdFByb3BOYW1lcy5kYXRhQWNvcG9zLCBOd2N0UHJvcE5hbWVzLmRhdGFDbnRdKTtcclxuICAgICAgICB0aGlzLl9jaGFubmVsSW5kZXggID0gbmV3IE53Y3RQcnNQcm9wZXJ0eU51bWJlcihpbnB1dCwgW053Y3RQcm9wTmFtZXMuZGF0YUNoYW5uZWxJbmRleF0pO1xyXG4gICAgICAgIHRoaXMuX25jT2JqZWN0VHlwZSAgPSBuZXcgTndjdFByc1Byb3BlcnR5TnVtYmVyKGlucHV0LCBbTndjdFByb3BOYW1lcy5uY09iamVjdFR5cGVdKTtcclxuICAgICAgICB0aGlzLl9jb25maWdJZCAgICAgID0gbmV3IE53Y3RQcnNQcm9wZXJ0eU51bWJlcihpbnB1dCwgW053Y3RQcm9wTmFtZXMuZGF0YUNvbmZpZ0VudHJ5SWRdKTtcclxuICAgICAgICB0aGlzLl9wYXlsb2FkICAgICAgID0gbmV3IE53Y3RQcnNQYXlsb2FkQnl0ZXMoaW5wdXQsIFtOd2N0UHJvcE5hbWVzLmRhdGFBY29wb3MsIE53Y3RQcm9wTmFtZXMuZGF0YVBheWxvYWRdKTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIGxpc3Qgb2YgYWxsIGNvbnRhaW5lZCBwYXJzZSBpdGVtcyB0byBiZSBhYmxlIHRvIGNvbXB1dGUgdGhlIHN1bSBvZiB0aGUgc3RhdGVzXHJcbiAgICAgICAgdGhpcy5fcHJzSXRlbXMgPSBuZXcgQXJyYXk8TndjdFByc0l0ZW1CYXNlPigpO1xyXG4gICAgICAgIHRoaXMuX3Byc0l0ZW1zLnB1c2godGhpcy5fcGFySWQpO1xyXG4gICAgICAgIHRoaXMuX3Byc0l0ZW1zLnB1c2godGhpcy5fdGltZSk7XHJcbiAgICAgICAgdGhpcy5fcHJzSXRlbXMucHVzaCh0aGlzLl9pbmRleCk7XHJcbiAgICAgICAgdGhpcy5fcHJzSXRlbXMucHVzaCh0aGlzLl9wYXJDbnQpO1xyXG4gICAgICAgIHRoaXMuX3Byc0l0ZW1zLnB1c2godGhpcy5fY2hhbm5lbEluZGV4KTtcclxuICAgICAgICB0aGlzLl9wcnNJdGVtcy5wdXNoKHRoaXMuX25jT2JqZWN0VHlwZSk7XHJcbiAgICAgICAgdGhpcy5fcHJzSXRlbXMucHVzaCh0aGlzLl9jb25maWdJZCk7XHJcbiAgICAgICAgdGhpcy5fcHJzSXRlbXMucHVzaCh0aGlzLl9wYXlsb2FkKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIGFsbCBjb250YWluZWQgcHJvcGVydGllcyBhcmUgdmFsaWRcclxuICAgICAqIEFUVEVOVElPTjogUHJvY2Vzc2luZyBhbGwgcHJvcGVydGllcyBjYW4gY29uc3VtZSBhIGxvbmcgdGltZVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RDb25maWdFbnRyeVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHZhbGlkKCkgOiBib29sZWFue1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGV4dHJhY3QgdmFsaWQgcHJvcGVydHlcclxuICAgICAgICBsZXQgdmFsaWRTdGF0ZXMgOiBBcnJheTxib29sZWFuPiAgPSB0aGlzLl9wcnNJdGVtcy5tYXAocHJvcE9iaiA9PiBwcm9wT2JqLnZhbGlkKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyByZXN1bHQgaXMgb25seSB0cnVlIGlmIGFsbCBwcm9wZXJ0aWVzIGFyZSB2YWxpZFxyXG4gICAgICAgIGxldCByZXN1bHQgOiBib29sZWFuID0gdmFsaWRTdGF0ZXMucmVkdWNlKCh0bXBSZXN1bHQsIGN1cnJlbnRWYWx1ZSkgPT4gdG1wUmVzdWx0ICYmIGN1cnJlbnRWYWx1ZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuICByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmV1dHVucyB0aGUgUGFySURcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtJTndjdFByc1Byb3BlcnR5TnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3REYXRhRW50cnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBwYXJJZCgpIDogSU53Y3RQcnNQcm9wZXJ0eU51bWJlcnsgXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcklkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmV0dXJucyB0aGUgdGltZSBpbiBzZWNvbmRzXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7SU53Y3RQcnNQcm9wZXJ0eU51bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBOd2N0RGF0YUVudHJ5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgdGltZSgpIDogSU53Y3RQcnNQcm9wZXJ0eU51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGltZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHVybnMgdGhlIGluZGV4ICh3aGljaCByZXByZXNlbnRzIHRoZSBvcmRlciBvZiBlbnRyaWVzIGJlZWluZyB3cml0dGVuIGludG8gdGhlIGxvZ2Jvb2spXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7SU53Y3RQcnNQcm9wZXJ0eU51bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBOd2N0RGF0YUVudHJ5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgaW5kZXgoKSA6IElOd2N0UHJzUHJvcGVydHlOdW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7SU53Y3RQcnNQcm9wZXJ0eU51bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBOd2N0RGF0YUVudHJ5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcGFyQ250KCkgOiBJTndjdFByc1Byb3BlcnR5TnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJDbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXR1cm5zIHRoZSBjaGFubmVsIGluZGV4XHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7SU53Y3RQcnNQcm9wZXJ0eU51bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBOd2N0RGF0YUVudHJ5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgY2hhbm5lbEluZGV4KCkgOiBJTndjdFByc1Byb3BlcnR5TnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jaGFubmVsSW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXR1cm5zIHRoZSBuYyBvYmVqY3QgdHlwZVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge0lOd2N0UHJzUHJvcGVydHlOdW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdERhdGFFbnRyeVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IG5jT2JqZWN0VHlwZSgpIDogSU53Y3RQcnNQcm9wZXJ0eU51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmNPYmplY3RUeXBlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbmZpZ3VyYXRpb24gaWQgaXMgdXNlZCB0byByZXRyaWV2ZSB0aGUgaW5mb3JtYXRpb24gZnJvbSB0aGUgY29uZmlndXJhdGlvbiByZWNvcmQgYW5kIHRvIGZpbmQgdGhlIHJlc3BvbnNlIDwtLT4gcmVxdWVzdCBjb25uZWN0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUge0lOd2N0UHJzUHJvcGVydHlOdW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdERhdGFFbnRyeVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGNvbmZpZ0lkKCkgOiBJTndjdFByc1Byb3BlcnR5TnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWdJZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHVybnMgYWxsIHBheWxvYWQgYXJndW1lbnRzICh0aGUgbnVtYmVyIGFuZCB0eXBlIG9mIHRoZSBhcmd1ZW1lbnRzIGRlcGVuZHMgb24gdGhlIFBhcklEKVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge0FycmF5PE53Y3RQcnNQYXlsb2FkQXJndW1lbnQ+fVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3REYXRhRW50cnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBwYXlsb2FkQnl0ZXMoKSA6IElOd2N0UHJzUGF5bG9hZHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGF5bG9hZDtcclxuICAgIH0gICAgXHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIl19