define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * typed access to a single payload argument
     *
     * @export
     * @class NwctPrsPayloadArgument
     */
    var NwctPrsPayloadArgument = /** @class */ (function () {
        /**
         *Creates an instance of NwctPrsPayloadArgument.
         * @param {(number | string)} value
         * @param {string} memberName
         * @param {boolean} valid
         * @memberof NwctPrsPayloadArgument
         */
        function NwctPrsPayloadArgument(value, memberName, valid) {
            this._value = value;
            this._memberName = memberName;
            this._valid = valid;
        }
        Object.defineProperty(NwctPrsPayloadArgument.prototype, "value", {
            /**
             * returns the value
             *
             * @readonly
             * @memberof NwctPrsPayloadArgument
             */
            get: function () { return this._value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctPrsPayloadArgument.prototype, "memberName", {
            /**
             * name of the property defined in the kaitai parser configuration
             *
             * @readonly
             * @memberof NwctPrsPayloadArgument
             */
            get: function () { return this._memberName; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctPrsPayloadArgument.prototype, "valid", {
            /**
             * returns true if valid
             *
             * @readonly
             * @memberof NwctPrsPayloadArgument
             */
            get: function () { return this._valid; },
            enumerable: true,
            configurable: true
        });
        return NwctPrsPayloadArgument;
    }());
    exports.NwctPrsPayloadArgument = NwctPrsPayloadArgument;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibndjdFByc1BheWxvYWRBcmd1bWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL253Y3RQcm92aWRlci9vYmpQYXJzZXIvbndjdFByc1BheWxvYWRBcmd1bWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFDQTs7Ozs7T0FLRztJQUNIO1FBTUk7Ozs7OztXQU1HO1FBQ0gsZ0NBQW1CLEtBQXVCLEVBQUUsVUFBbUIsRUFBRSxLQUFlO1lBQzVFLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1lBQzlCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLENBQUM7UUFRRCxzQkFBSSx5Q0FBSztZQU5UOzs7OztlQUtHO2lCQUNILGNBQVksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQzs7O1dBQUE7UUFRaEMsc0JBQUksOENBQVU7WUFOZDs7Ozs7ZUFLRztpQkFDSCxjQUFpQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQSxDQUFDOzs7V0FBQTtRQVExQyxzQkFBSSx5Q0FBSztZQU5UOzs7OztlQUtHO2lCQUNILGNBQVksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQzs7O1dBQUE7UUFHcEMsNkJBQUM7SUFBRCxDQUFDLEFBNUNELElBNENDO0lBNUNZLHdEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4vKipcclxuICogdHlwZWQgYWNjZXNzIHRvIGEgc2luZ2xlIHBheWxvYWQgYXJndW1lbnRcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgTndjdFByc1BheWxvYWRBcmd1bWVudFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE53Y3RQcnNQYXlsb2FkQXJndW1lbnR7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdmFsdWUgOiBudW1iZXJ8IHN0cmluZztcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX21lbWJlck5hbWUgOiBzdHJpbmc7IC8vIG5hbWUgdGhhdCB3YXMgZGVmaW5lZCBieSB0aGUga2FpdGFpIHBhcnNlciBjb25pZmd1cmFyYXRpb25cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3ZhbGlkIDogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBOd2N0UHJzUGF5bG9hZEFyZ3VtZW50LlxyXG4gICAgICogQHBhcmFtIHsobnVtYmVyIHwgc3RyaW5nKX0gdmFsdWVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZW1iZXJOYW1lXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbGlkXHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdFByc1BheWxvYWRBcmd1bWVudFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IodmFsdWUgOiBudW1iZXIgfCBzdHJpbmcsIG1lbWJlck5hbWUgOiBzdHJpbmcsIHZhbGlkIDogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLl9tZW1iZXJOYW1lID0gbWVtYmVyTmFtZTtcclxuICAgICAgICB0aGlzLl92YWxpZCA9IHZhbGlkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmV0dXJucyB0aGUgdmFsdWVcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBOd2N0UHJzUGF5bG9hZEFyZ3VtZW50XHJcbiAgICAgKi9cclxuICAgIGdldCB2YWx1ZSgpe3JldHVybiB0aGlzLl92YWx1ZTt9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBuYW1lIG9mIHRoZSBwcm9wZXJ0eSBkZWZpbmVkIGluIHRoZSBrYWl0YWkgcGFyc2VyIGNvbmZpZ3VyYXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBOd2N0UHJzUGF5bG9hZEFyZ3VtZW50XHJcbiAgICAgKi9cclxuICAgIGdldCBtZW1iZXJOYW1lKCl7cmV0dXJuIHRoaXMuX21lbWJlck5hbWU7fVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIHJldHVybnMgdHJ1ZSBpZiB2YWxpZFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RQcnNQYXlsb2FkQXJndW1lbnRcclxuICAgICAqL1xyXG4gICAgZ2V0IHZhbGlkKCl7cmV0dXJuIHRoaXMuX3ZhbGlkO31cclxuICAgIFxyXG5cclxufSJdfQ==