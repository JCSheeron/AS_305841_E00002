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
define(["require", "exports", "./nwctPrsItemBase"], function (require, exports, nwctPrsItemBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * This class retrieves the payload argurments as an uninterpreted byte array
     *
     * @export
     * @class NwctPrsPayloadBytes
     */
    var NwctPrsPayloadBytes = /** @class */ (function (_super) {
        __extends(NwctPrsPayloadBytes, _super);
        /**
         *Creates an instance of NwctPrsPayloadBytes.
         * @param {*} input
         * @param {string[]} location
         * @memberof NwctPrsPayloadBytes
         */
        function NwctPrsPayloadBytes(input, location) {
            return _super.call(this, input, location) || this;
        }
        Object.defineProperty(NwctPrsPayloadBytes.prototype, "value", {
            /**
             * Dynamically parse all properties of the payload (the number of properties depends on the parId)
             *
             * @readonly
             * @type {Array<NwctPrsPayloadArgument>}
             * @memberof NwctPrsPayloadBytes
             */
            get: function () {
                return this._input;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctPrsPayloadBytes.prototype, "valid", {
            /**
            * Returns true, as the returned bytes can not be invalid
            *
            * @readonly
            * @memberof NwctPrsPayloadBytes
            */
            get: function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        return NwctPrsPayloadBytes;
    }(nwctPrsItemBase_1.NwctPrsItemBase));
    exports.NwctPrsPayloadBytes = NwctPrsPayloadBytes;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibndjdFByc1BheWxvYWRCeXRlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL253Y3RQcm92aWRlci9vYmpQYXJzZXIvbndjdFByc1BheWxvYWRCeXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBSUE7Ozs7O09BS0c7SUFDSDtRQUF5Qyx1Q0FBZTtRQUVwRDs7Ozs7V0FLRztRQUNILDZCQUFtQixLQUFXLEVBQUUsUUFBbUI7bUJBQ2hELGtCQUFNLEtBQUssRUFBRSxRQUFRLENBQUM7UUFDekIsQ0FBQztRQVVELHNCQUFXLHNDQUFLO1lBUGhCOzs7Ozs7ZUFNRztpQkFDSDtnQkFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDdkIsQ0FBQzs7O1dBQUE7UUFTRCxzQkFBVyxzQ0FBSztZQU5mOzs7OztjQUtFO2lCQUNIO2dCQUNJLE9BQVEsSUFBSSxDQUFDO1lBQ2pCLENBQUM7OztXQUFBO1FBR0wsMEJBQUM7SUFBRCxDQUFDLEFBcENELENBQXlDLGlDQUFlLEdBb0N2RDtJQXBDWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTndjdFByc1BheWxvYWQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL253Y3RQcnNQYXlsb2FkSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IE53Y3RQcnNJdGVtQmFzZSB9IGZyb20gXCIuL253Y3RQcnNJdGVtQmFzZVwiO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIHJldHJpZXZlcyB0aGUgcGF5bG9hZCBhcmd1cm1lbnRzIGFzIGFuIHVuaW50ZXJwcmV0ZWQgYnl0ZSBhcnJheVxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBOd2N0UHJzUGF5bG9hZEJ5dGVzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTndjdFByc1BheWxvYWRCeXRlcyBleHRlbmRzIE53Y3RQcnNJdGVtQmFzZSBpbXBsZW1lbnRzIElOd2N0UHJzUGF5bG9hZHtcclxuICBcclxuICAgIC8qKlxyXG4gICAgICpDcmVhdGVzIGFuIGluc3RhbmNlIG9mIE53Y3RQcnNQYXlsb2FkQnl0ZXMuXHJcbiAgICAgKiBAcGFyYW0geyp9IGlucHV0XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBsb2NhdGlvblxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RQcnNQYXlsb2FkQnl0ZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGlucHV0IDogYW55LCBsb2NhdGlvbiA6IHN0cmluZ1tdKXtcclxuICAgICAgIHN1cGVyKGlucHV0LCBsb2NhdGlvbik7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHluYW1pY2FsbHkgcGFyc2UgYWxsIHByb3BlcnRpZXMgb2YgdGhlIHBheWxvYWQgKHRoZSBudW1iZXIgb2YgcHJvcGVydGllcyBkZXBlbmRzIG9uIHRoZSBwYXJJZClcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtBcnJheTxOd2N0UHJzUGF5bG9hZEFyZ3VtZW50Pn1cclxuICAgICAqIEBtZW1iZXJvZiBOd2N0UHJzUGF5bG9hZEJ5dGVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgdmFsdWUoKSA6IFVpbnQ4QXJyYXl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lucHV0OyAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSwgYXMgdGhlIHJldHVybmVkIGJ5dGVzIGNhbiBub3QgYmUgaW52YWxpZFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RQcnNQYXlsb2FkQnl0ZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB2YWxpZCgpIDogYm9vbGVhbnsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuICB0cnVlO1xyXG4gICAgfVxyXG5cclxuXHJcbn0iXX0=