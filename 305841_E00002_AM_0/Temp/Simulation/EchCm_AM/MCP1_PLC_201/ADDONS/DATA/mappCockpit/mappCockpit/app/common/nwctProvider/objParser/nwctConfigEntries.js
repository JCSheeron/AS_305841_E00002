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
define(["require", "exports", "./nwctConfigEntry", "./nwctPrsHelper", "./nwctPrsItemBase"], function (require, exports, nwctConfigEntry_1, nwctPrsHelper_1, nwctPrsItemBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * This class provides type safe access to a configuration records
     *
     * @export
     * @class NwctConfigEntries
     * @extends {NwctPrsItemBase}
     */
    var NwctConfigEntries = /** @class */ (function (_super) {
        __extends(NwctConfigEntries, _super);
        /**
         *Creates an instance of NwctConfigEntries.
         * @param {*} input
         * @param {string[]} location
         * @memberof NwctConfigEntries
         */
        function NwctConfigEntries(input, location) {
            var _this = _super.call(this, input, location) || this;
            _this._preprocessingCompleted = false; // is true after setting the config ID array once
            _this._configEntries = new Array();
            return _this;
        }
        Object.defineProperty(NwctConfigEntries.prototype, "configEntries", {
            /**
             * returns all config entries unsorted
             *
             * @readonly
             * @type {Array<INwctConfigEntry>}
             * @memberof NwctConfigEntries
             */
            get: function () {
                this.preprocess();
                return this._configEntries;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Allows to control when the time intensive parsing and sorting is done (also from the outside)
         *
         * @memberof NwctConfigEntries
         */
        NwctConfigEntries.prototype.preprocess = function () {
            // only do once
            if (this._preprocessingCompleted) {
                return;
            }
            this._preprocessingCompleted = true;
            this.parse(); // is only executed once anyway        
        };
        /**
        * Returns a list of all configuration entries
        *
        * @readonly
        * @private
        * @memberof NwctRoot
        */
        // private get configEntries(){      
        //     this.parse();
        //     return this._configEntries;
        // }
        /**
         * This method parses the untyped object
         * It takes care that parsing is done only once
         *
         * @private
         * @returns
         * @memberof NwctConfigEntries
         */
        NwctConfigEntries.prototype.parse = function () {
            // check availability of input data 
            if (!Array.isArray(this._input)) {
                this._configEntries = new Array(); // no items available --> create empty array
                return;
            }
            // good case (input data available) --> map array elements
            this._configEntries = this._input.map(function (untypedEntry) {
                // create a data entry for each untyped array element
                var dataEntry = new nwctConfigEntry_1.NwctConfigEntry(untypedEntry);
                return dataEntry;
            });
        };
        Object.defineProperty(NwctConfigEntries.prototype, "valid", {
            /**
             * Returns true if all contained items are valid
             * ATTENTION: Processing all items can consume a long time
             *
             * @readonly
             * @memberof NwctConfigEntry
             */
            get: function () {
                return nwctPrsHelper_1.NwctPrsHelper.areAllValid(this._configEntries);
            },
            enumerable: true,
            configurable: true
        });
        return NwctConfigEntries;
    }(nwctPrsItemBase_1.NwctPrsItemBase));
    exports.NwctConfigEntries = NwctConfigEntries;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibndjdENvbmZpZ0VudHJpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi9ud2N0UHJvdmlkZXIvb2JqUGFyc2VyL253Y3RDb25maWdFbnRyaWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFRQTs7Ozs7O09BTUc7SUFDSDtRQUF1QyxxQ0FBZTtRQUtsRDs7Ozs7V0FLRztRQUNILDJCQUFtQixLQUFXLEVBQUUsUUFBbUI7WUFBbkQsWUFDSSxrQkFBTSxLQUFLLEVBQUUsUUFBUSxDQUFDLFNBSXpCO1lBZE8sNkJBQXVCLEdBQWEsS0FBSyxDQUFDLENBQUMsaURBQWlEO1lBWWhHLEtBQUksQ0FBQyxjQUFjLEdBQWUsSUFBSSxLQUFLLEVBQW9CLENBQUM7O1FBRXBFLENBQUM7UUFVRCxzQkFBVyw0Q0FBYTtZQVB4Qjs7Ozs7O2VBTUc7aUJBQ0g7Z0JBQ0ksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUNsQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7WUFDL0IsQ0FBQzs7O1dBQUE7UUFLRDs7OztXQUlHO1FBQ0ksc0NBQVUsR0FBakI7WUFDSSxlQUFlO1lBQ2YsSUFBRyxJQUFJLENBQUMsdUJBQXVCLEVBQUM7Z0JBQzVCLE9BQU87YUFDVjtZQUVELElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUM7WUFFcEMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsdUNBQXVDO1FBQ3pELENBQUM7UUFHQTs7Ozs7O1VBTUU7UUFDSCxxQ0FBcUM7UUFDckMsb0JBQW9CO1FBQ3BCLGtDQUFrQztRQUNsQyxJQUFJO1FBS0o7Ozs7Ozs7V0FPRztRQUNLLGlDQUFLLEdBQWI7WUFFSSxvQ0FBb0M7WUFDcEMsSUFBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFDO2dCQUMzQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksS0FBSyxFQUFvQixDQUFDLENBQUMsNENBQTRDO2dCQUNqRyxPQUFPO2FBQ1Y7WUFHRCwwREFBMEQ7WUFDMUQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFBLFlBQVk7Z0JBRTlDLHFEQUFxRDtnQkFDckQsSUFBSSxTQUFTLEdBQXFCLElBQUksaUNBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDcEUsT0FBUSxTQUFTLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBU0Qsc0JBQVcsb0NBQUs7WUFQaEI7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLE9BQVEsNkJBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzNELENBQUM7OztXQUFBO1FBRUwsd0JBQUM7SUFBRCxDQUFDLEFBdkdELENBQXVDLGlDQUFlLEdBdUdyRDtJQXZHWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgSU53Y3RDb25maWdFbnRyaWVzIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9ud2N0Q29uZmlnRW50cmllc0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJTndjdENvbmZpZ0VudHJ5IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9ud2N0Q29uZmlnRW50cnlJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgTndjdENvbmZpZ0VudHJ5IH0gZnJvbSBcIi4vbndjdENvbmZpZ0VudHJ5XCI7XHJcbmltcG9ydCB7IE53Y3RQcnNIZWxwZXIgfSBmcm9tIFwiLi9ud2N0UHJzSGVscGVyXCI7XHJcbmltcG9ydCB7IE53Y3RQcnNJdGVtQmFzZSB9IGZyb20gXCIuL253Y3RQcnNJdGVtQmFzZVwiO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIHByb3ZpZGVzIHR5cGUgc2FmZSBhY2Nlc3MgdG8gYSBjb25maWd1cmF0aW9uIHJlY29yZHNcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgTndjdENvbmZpZ0VudHJpZXNcclxuICogQGV4dGVuZHMge053Y3RQcnNJdGVtQmFzZX1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBOd2N0Q29uZmlnRW50cmllcyBleHRlbmRzIE53Y3RQcnNJdGVtQmFzZSBpbXBsZW1lbnRzIElOd2N0Q29uZmlnRW50cmllc3tcclxuXHJcbiAgICBwcml2YXRlIF9wcmVwcm9jZXNzaW5nQ29tcGxldGVkIDogYm9vbGVhbiA9IGZhbHNlOyAvLyBpcyB0cnVlIGFmdGVyIHNldHRpbmcgdGhlIGNvbmZpZyBJRCBhcnJheSBvbmNlXHJcbiAgICBwcml2YXRlIF9jb25maWdFbnRyaWVzIDogQXJyYXk8SU53Y3RDb25maWdFbnRyeT47IC8vIGtlcHAgYWxsIGNvbmZpZyBlbnRyaWVzXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKkNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgTndjdENvbmZpZ0VudHJpZXMuXHJcbiAgICAgKiBAcGFyYW0geyp9IGlucHV0XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBsb2NhdGlvblxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RDb25maWdFbnRyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihpbnB1dCA6IGFueSwgbG9jYXRpb24gOiBzdHJpbmdbXSl7XHJcbiAgICAgICAgc3VwZXIoaW5wdXQsIGxvY2F0aW9uKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY29uZmlnRW50cmllcyAgICAgICAgICAgICA9IG5ldyBBcnJheTxJTndjdENvbmZpZ0VudHJ5PigpO1xyXG4gICBcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXR1cm5zIGFsbCBjb25maWcgZW50cmllcyB1bnNvcnRlZFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge0FycmF5PElOd2N0Q29uZmlnRW50cnk+fVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RDb25maWdFbnRyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgY29uZmlnRW50cmllcygpIDogIEFycmF5PElOd2N0Q29uZmlnRW50cnk+e1xyXG4gICAgICAgIHRoaXMucHJlcHJvY2VzcygpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWdFbnRyaWVzO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWxsb3dzIHRvIGNvbnRyb2wgd2hlbiB0aGUgdGltZSBpbnRlbnNpdmUgcGFyc2luZyBhbmQgc29ydGluZyBpcyBkb25lIChhbHNvIGZyb20gdGhlIG91dHNpZGUpXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RDb25maWdFbnRyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwcmVwcm9jZXNzKCl7XHJcbiAgICAgICAgLy8gb25seSBkbyBvbmNlXHJcbiAgICAgICAgaWYodGhpcy5fcHJlcHJvY2Vzc2luZ0NvbXBsZXRlZCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fcHJlcHJvY2Vzc2luZ0NvbXBsZXRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMucGFyc2UoKTsgLy8gaXMgb25seSBleGVjdXRlZCBvbmNlIGFueXdheSAgICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuICAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBsaXN0IG9mIGFsbCBjb25maWd1cmF0aW9uIGVudHJpZXNcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdFJvb3RcclxuICAgICAqL1xyXG4gICAgLy8gcHJpdmF0ZSBnZXQgY29uZmlnRW50cmllcygpeyAgICAgIFxyXG4gICAgLy8gICAgIHRoaXMucGFyc2UoKTtcclxuICAgIC8vICAgICByZXR1cm4gdGhpcy5fY29uZmlnRW50cmllcztcclxuICAgIC8vIH1cclxuXHJcblxyXG5cclxuIFxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBwYXJzZXMgdGhlIHVudHlwZWQgb2JqZWN0XHJcbiAgICAgKiBJdCB0YWtlcyBjYXJlIHRoYXQgcGFyc2luZyBpcyBkb25lIG9ubHkgb25jZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE53Y3RDb25maWdFbnRyaWVzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcGFyc2UoKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gY2hlY2sgYXZhaWxhYmlsaXR5IG9mIGlucHV0IGRhdGEgXHJcbiAgICAgICAgaWYoIUFycmF5LmlzQXJyYXkodGhpcy5faW5wdXQpKXsgXHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZ0VudHJpZXMgPSBuZXcgQXJyYXk8SU53Y3RDb25maWdFbnRyeT4oKTsgLy8gbm8gaXRlbXMgYXZhaWxhYmxlIC0tPiBjcmVhdGUgZW1wdHkgYXJyYXlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZ29vZCBjYXNlIChpbnB1dCBkYXRhIGF2YWlsYWJsZSkgLS0+IG1hcCBhcnJheSBlbGVtZW50c1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZ0VudHJpZXMgPSB0aGlzLl9pbnB1dC5tYXAodW50eXBlZEVudHJ5ID0+eyBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhIGRhdGEgZW50cnkgZm9yIGVhY2ggdW50eXBlZCBhcnJheSBlbGVtZW50XHJcbiAgICAgICAgICAgIGxldCBkYXRhRW50cnkgOiBOd2N0Q29uZmlnRW50cnkgPSBuZXcgTndjdENvbmZpZ0VudHJ5KHVudHlwZWRFbnRyeSk7XHJcbiAgICAgICAgICAgIHJldHVybiAgZGF0YUVudHJ5O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIGFsbCBjb250YWluZWQgaXRlbXMgYXJlIHZhbGlkXHJcbiAgICAgKiBBVFRFTlRJT046IFByb2Nlc3NpbmcgYWxsIGl0ZW1zIGNhbiBjb25zdW1lIGEgbG9uZyB0aW1lXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdENvbmZpZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgdmFsaWQoKXtcclxuICAgICAgICByZXR1cm4gIE53Y3RQcnNIZWxwZXIuYXJlQWxsVmFsaWQodGhpcy5fY29uZmlnRW50cmllcyk7XHJcbiAgICB9XHJcblxyXG59Il19