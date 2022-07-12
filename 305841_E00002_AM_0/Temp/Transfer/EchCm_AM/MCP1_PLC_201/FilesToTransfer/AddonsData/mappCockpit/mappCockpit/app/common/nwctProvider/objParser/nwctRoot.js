define(["require", "exports", "./nwctConfigEntries", "./nwctDataEntries", "./nwctPropNames"], function (require, exports, nwctConfigEntries_1, nwctDataEntries_1, nwctPropNames_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * allows to access nwct data record entries
     *
     * @export
     * @class NwctRoot
     */
    var NwctRoot = /** @class */ (function () {
        /**
         *Creates an instance of NwctRoot.
         * @param {NwctBinParser} input
         * @memberof NwctRoot
         */
        function NwctRoot(input) {
            this._input = input;
            // objects for retrieving content are created, but parsing is only done on demand
            this._configEntries = new nwctConfigEntries_1.NwctConfigEntries(this._input, [nwctPropNames_1.NwctPropNames.configEntries]);
            this._dataEntries = new nwctDataEntries_1.NwctDataEntries(this._input, [nwctPropNames_1.NwctPropNames.dataEntries], this._configEntries);
        }
        Object.defineProperty(NwctRoot.prototype, "dataEntries", {
            /**
             * returns a list of data entries
             *
             * @readonly
             * @type {INwctDataEntries}
             * @memberof NwctRoot
             */
            get: function () {
                return this._dataEntries;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NwctRoot.prototype, "configEntries", {
            /**
             * returns a list of config entries
             *
             * @readonly
             * @type {INwctConfigEntries}
             * @memberof NwctRoot
             */
            get: function () {
                return this._configEntries;
            },
            enumerable: true,
            configurable: true
        });
        return NwctRoot;
    }());
    exports.NwctRoot = NwctRoot;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibndjdFJvb3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi9ud2N0UHJvdmlkZXIvb2JqUGFyc2VyL253Y3RSb290LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQU9BOzs7OztPQUtHO0lBQ0g7UUFPSTs7OztXQUlHO1FBQ0gsa0JBQW1CLEtBQXFCO1lBQ3BDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBRXBCLGlGQUFpRjtZQUNqRixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUkscUNBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLDZCQUFhLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUN4RixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksaUNBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsNkJBQWEsQ0FBQyxXQUFXLENBQUMsRUFBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFMUcsQ0FBQztRQVVELHNCQUFXLGlDQUFXO1lBUHRCOzs7Ozs7ZUFNRztpQkFDSDtnQkFDSSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDN0IsQ0FBQzs7O1dBQUE7UUFVRCxzQkFBVyxtQ0FBYTtZQVB4Qjs7Ozs7O2VBTUc7aUJBQ0g7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFBO1lBQzlCLENBQUM7OztXQUFBO1FBYUwsZUFBQztJQUFELENBQUMsQUF4REQsSUF3REM7SUF4RFksNEJBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBOd2N0QmluUGFyc2VyIGZyb20gXCIuLi8uLi8uLi9saWJzL2RhdGFwYXJzaW5nL053Y3RCaW5QYXJzZXJcIjtcclxuaW1wb3J0IHsgSU53Y3RDb25maWdFbnRyaWVzIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9ud2N0Q29uZmlnRW50cmllc0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJTndjdERhdGFFbnRyaWVzIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9ud2N0RGF0YUVudHJpZXNJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgTndjdENvbmZpZ0VudHJpZXMgfSBmcm9tIFwiLi9ud2N0Q29uZmlnRW50cmllc1wiO1xyXG5pbXBvcnQgeyBOd2N0RGF0YUVudHJpZXMgfSBmcm9tIFwiLi9ud2N0RGF0YUVudHJpZXNcIjtcclxuaW1wb3J0IHsgTndjdFByb3BOYW1lcyB9IGZyb20gXCIuL253Y3RQcm9wTmFtZXNcIjtcclxuXHJcbi8qKlxyXG4gKiBhbGxvd3MgdG8gYWNjZXNzIG53Y3QgZGF0YSByZWNvcmQgZW50cmllc1xyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBOd2N0Um9vdFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE53Y3RSb290IHtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9pbnB1dCA6IE53Y3RCaW5QYXJzZXI7IC8vIGluY29tbWluZyBwYXJzZXIgb2JqZWN0IGZyb20ga2FpdGFpIHJlcHJlc2VudGluZyB0aGUgY29tcGxldGUgcmluZyBidWZmZXJcclxuICAgIHByaXZhdGUgX2RhdGFFbnRyaWVzIDogSU53Y3REYXRhRW50cmllcztcclxuICAgIHByaXZhdGUgX2NvbmZpZ0VudHJpZXMgOiBJTndjdENvbmZpZ0VudHJpZXM7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICpDcmVhdGVzIGFuIGluc3RhbmNlIG9mIE53Y3RSb290LlxyXG4gICAgICogQHBhcmFtIHtOd2N0QmluUGFyc2VyfSBpbnB1dFxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RSb290XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihpbnB1dCA6IE53Y3RCaW5QYXJzZXIpe1xyXG4gICAgICAgIHRoaXMuX2lucHV0ID0gaW5wdXQ7XHJcblxyXG4gICAgICAgIC8vIG9iamVjdHMgZm9yIHJldHJpZXZpbmcgY29udGVudCBhcmUgY3JlYXRlZCwgYnV0IHBhcnNpbmcgaXMgb25seSBkb25lIG9uIGRlbWFuZFxyXG4gICAgICAgIHRoaXMuX2NvbmZpZ0VudHJpZXMgPSBuZXcgTndjdENvbmZpZ0VudHJpZXModGhpcy5faW5wdXQsIFtOd2N0UHJvcE5hbWVzLmNvbmZpZ0VudHJpZXNdKTtcclxuICAgICAgICB0aGlzLl9kYXRhRW50cmllcyA9IG5ldyBOd2N0RGF0YUVudHJpZXModGhpcy5faW5wdXQsIFtOd2N0UHJvcE5hbWVzLmRhdGFFbnRyaWVzXSx0aGlzLl9jb25maWdFbnRyaWVzKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIHJldHVybnMgYSBsaXN0IG9mIGRhdGEgZW50cmllc1xyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge0lOd2N0RGF0YUVudHJpZXN9XHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdFJvb3RcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBkYXRhRW50cmllcygpIDogSU53Y3REYXRhRW50cmllc3tcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YUVudHJpZXM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmV0dXJucyBhIGxpc3Qgb2YgY29uZmlnIGVudHJpZXNcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtJTndjdENvbmZpZ0VudHJpZXN9XHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdFJvb3RcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBjb25maWdFbnRyaWVzKCkgOiBJTndjdENvbmZpZ0VudHJpZXN7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZ0VudHJpZXNcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgXHJcblxyXG4gICAgXHJcblxyXG4gICAgXHJcblxyXG5cclxuXHJcblxyXG59Il19