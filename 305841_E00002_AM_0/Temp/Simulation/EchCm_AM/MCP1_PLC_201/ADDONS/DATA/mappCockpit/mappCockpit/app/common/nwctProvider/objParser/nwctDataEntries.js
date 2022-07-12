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
define(["require", "exports", "./nwctDataEntry", "./nwctPrsHelper", "./nwctPrsItemBase"], function (require, exports, nwctDataEntry_1, nwctPrsHelper_1, nwctPrsItemBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NwctDataEntries = /** @class */ (function (_super) {
        __extends(NwctDataEntries, _super);
        /**
         * Creates an instance of NwctDataEntries
         * Requires the part of the untyped nwct object (comming from the kaitai parser) that contains all data entries
         * @param {*} input
         * @param {NwctConfigEntries} configEntries
         * @memberof NwctDataEntries
         */
        function NwctDataEntries(input, location, configEntries) {
            var _this = _super.call(this, input, location) || this;
            _this._parsed = false;
            _this._sortedDataEntries = new Array();
            _this._configEntries = configEntries;
            return _this;
        }
        Object.defineProperty(NwctDataEntries.prototype, "sortedDataEntries", {
            /**
             * returns the sorted data entries
             * sorting order is with increasing index (this is equivalent to sort by increasing time)
             *
             * @readonly
             * @type {Array<INwctDataEntry>}
             * @memberof NwctDataEntries
             */
            get: function () {
                this.parse();
                return this._sortedDataEntries;
            },
            enumerable: true,
            configurable: true
        });
        /**
         *
         *
         * @readonly
         * @type {Array<NwctDataEntry>}
         * @memberof NwctRoot
         */
        NwctDataEntries.prototype.parse = function () {
            var _this = this;
            // only parse once
            if (this._parsed) {
                return;
            }
            this._parsed = true;
            // check availability of input data 
            if (!Array.isArray(this._input)) {
                this._sortedDataEntries = new Array(); // create empty array
                return;
            }
            // good case (input data available) --> map array elements
            var unsortedDataEntries = this._input.map(function (untypedEntry) {
                // create a data entry for each untyped array element
                var dataEntry = new nwctDataEntry_1.NwctDataEntry(untypedEntry, _this, _this._configEntries);
                return dataEntry;
            });
            // set sorted entries with ascending index
            this._sortedDataEntries = unsortedDataEntries.sort(this.compareIndex);
        };
        /**
         * Compare function to sort by growing index (for sorting)
         *
         * @private
         * @param {INwctDataEntry} a
         * @param {INwctDataEntry} b
         * @returns {number}
         * @memberof NwctDataEntries
         */
        NwctDataEntries.prototype.compareIndex = function (a, b) {
            // undefined should be set to the end
            if (!a.index.valid) {
                return 1; // positive number --> change order --> b,a
            }
            if (!b.index.valid) {
                return -1; // negative number --> nothing to do --> a,b
            }
            // 
            return a.index.value - b.index.value;
        };
        Object.defineProperty(NwctDataEntries.prototype, "valid", {
            /**
             *  Returns true if all items are valid
             *  ATTENTION: This can take a long time to process!
             *
             * @readonly
             * @type {boolean}
             * @memberof NwctDataEntries
             */
            get: function () {
                return nwctPrsHelper_1.NwctPrsHelper.areAllValid(this.sortedDataEntries);
            },
            enumerable: true,
            configurable: true
        });
        return NwctDataEntries;
    }(nwctPrsItemBase_1.NwctPrsItemBase));
    exports.NwctDataEntries = NwctDataEntries;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibndjdERhdGFFbnRyaWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vbndjdFByb3ZpZGVyL29ialBhcnNlci9ud2N0RGF0YUVudHJpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVFBO1FBQXFDLG1DQUFlO1FBT2hEOzs7Ozs7V0FNRztRQUNILHlCQUFtQixLQUFXLEVBQUUsUUFBa0IsRUFBRSxhQUFrQztZQUF0RixZQUNJLGtCQUFNLEtBQUssRUFBRSxRQUFRLENBQUMsU0FJekI7WUFkTyxhQUFPLEdBQWEsS0FBSyxDQUFDO1lBWTlCLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLEtBQUssRUFBa0IsQ0FBQztZQUN0RCxLQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQzs7UUFDeEMsQ0FBQztRQVdELHNCQUFXLDhDQUFpQjtZQVI1Qjs7Ozs7OztlQU9HO2lCQUNIO2dCQUNJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDYixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztZQUNuQyxDQUFDOzs7V0FBQTtRQUdEOzs7Ozs7V0FNRztRQUNLLCtCQUFLLEdBQWI7WUFBQSxpQkEwQkM7WUF4Qkcsa0JBQWtCO1lBQ2xCLElBQUcsSUFBSSxDQUFDLE9BQU8sRUFBQztnQkFDWixPQUFPO2FBQ1Y7WUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUdwQixvQ0FBb0M7WUFDcEMsSUFBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFDO2dCQUMzQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxLQUFLLEVBQWtCLENBQUMsQ0FBQyxxQkFBcUI7Z0JBQzVFLE9BQU87YUFDVjtZQUdELDBEQUEwRDtZQUMxRCxJQUFJLG1CQUFtQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUEsWUFBWTtnQkFFbEQscURBQXFEO2dCQUNyRCxJQUFJLFNBQVMsR0FBbUIsSUFBSSw2QkFBYSxDQUFDLFlBQVksRUFBRSxLQUFJLEVBQUUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUMzRixPQUFRLFNBQVMsQ0FBQztZQUN0QixDQUFDLENBQUMsQ0FBQztZQUVILDBDQUEwQztZQUMxQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMxRSxDQUFDO1FBY0Q7Ozs7Ozs7O1dBUUc7UUFDSyxzQ0FBWSxHQUFwQixVQUFxQixDQUFrQixFQUFFLENBQWlCO1lBQ3RELHFDQUFxQztZQUNyQyxJQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUM7Z0JBQ2QsT0FBTyxDQUFDLENBQUMsQ0FBQywyQ0FBMkM7YUFDeEQ7WUFDRCxJQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUM7Z0JBQ2QsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLDRDQUE0QzthQUMxRDtZQUNELEdBQUc7WUFDSCxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ3pDLENBQUM7UUFXRCxzQkFBVyxrQ0FBSztZQVJoQjs7Ozs7OztlQU9HO2lCQUNIO2dCQUNJLE9BQU8sNkJBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGlCQUFtQyxDQUFDLENBQUM7WUFDL0UsQ0FBQzs7O1dBQUE7UUFFTCxzQkFBQztJQUFELENBQUMsQUFySEQsQ0FBcUMsaUNBQWUsR0FxSG5EO0lBckhZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU53Y3RDb25maWdFbnRyaWVzIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9ud2N0Q29uZmlnRW50cmllc0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJTndjdERhdGFFbnRyaWVzIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9ud2N0RGF0YUVudHJpZXNJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSU53Y3REYXRhRW50cnkgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL253Y3REYXRhRW50cnlJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSU53Y3RQcnNJdGVtIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9ud2N0UHJzSXRlbUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBOd2N0RGF0YUVudHJ5IH0gZnJvbSBcIi4vbndjdERhdGFFbnRyeVwiO1xyXG5pbXBvcnQgeyBOd2N0UHJzSGVscGVyIH0gZnJvbSBcIi4vbndjdFByc0hlbHBlclwiO1xyXG5pbXBvcnQgeyBOd2N0UHJzSXRlbUJhc2UgfSBmcm9tIFwiLi9ud2N0UHJzSXRlbUJhc2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBOd2N0RGF0YUVudHJpZXMgZXh0ZW5kcyBOd2N0UHJzSXRlbUJhc2UgaW1wbGVtZW50cyBJTndjdERhdGFFbnRyaWVze1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2NvbmZpZ0VudHJpZXMgOiBJTndjdENvbmZpZ0VudHJpZXM7XHJcblxyXG4gICAgcHJpdmF0ZSBfc29ydGVkRGF0YUVudHJpZXMgOiBBcnJheTxJTndjdERhdGFFbnRyeT47IC8vIHNvcnRpbmcgaXMgcmVxdWlyZWQgd2hlbiBsaW5raW5nIHJlcXVlc3RzIGFuZCByZXNvbnNlc1xyXG4gICAgcHJpdmF0ZSBfcGFyc2VkIDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBOd2N0RGF0YUVudHJpZXMgXHJcbiAgICAgKiBSZXF1aXJlcyB0aGUgcGFydCBvZiB0aGUgdW50eXBlZCBud2N0IG9iamVjdCAoY29tbWluZyBmcm9tIHRoZSBrYWl0YWkgcGFyc2VyKSB0aGF0IGNvbnRhaW5zIGFsbCBkYXRhIGVudHJpZXNcclxuICAgICAqIEBwYXJhbSB7Kn0gaW5wdXRcclxuICAgICAqIEBwYXJhbSB7TndjdENvbmZpZ0VudHJpZXN9IGNvbmZpZ0VudHJpZXNcclxuICAgICAqIEBtZW1iZXJvZiBOd2N0RGF0YUVudHJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGlucHV0IDogYW55LCBsb2NhdGlvbjogc3RyaW5nW10sIGNvbmZpZ0VudHJpZXMgOiBJTndjdENvbmZpZ0VudHJpZXMpe1xyXG4gICAgICAgIHN1cGVyKGlucHV0LCBsb2NhdGlvbik7XHJcblxyXG4gICAgICAgIHRoaXMuX3NvcnRlZERhdGFFbnRyaWVzID0gbmV3IEFycmF5PElOd2N0RGF0YUVudHJ5PigpO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZ0VudHJpZXMgPSBjb25maWdFbnRyaWVzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHVybnMgdGhlIHNvcnRlZCBkYXRhIGVudHJpZXNcclxuICAgICAqIHNvcnRpbmcgb3JkZXIgaXMgd2l0aCBpbmNyZWFzaW5nIGluZGV4ICh0aGlzIGlzIGVxdWl2YWxlbnQgdG8gc29ydCBieSBpbmNyZWFzaW5nIHRpbWUpXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7QXJyYXk8SU53Y3REYXRhRW50cnk+fVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3REYXRhRW50cmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHNvcnRlZERhdGFFbnRyaWVzKCkgOiBBcnJheTxJTndjdERhdGFFbnRyeT57XHJcbiAgICAgICAgdGhpcy5wYXJzZSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zb3J0ZWREYXRhRW50cmllcztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIFxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7QXJyYXk8TndjdERhdGFFbnRyeT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdFJvb3RcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBwYXJzZSgpIHtcclxuICAgICAgICBcclxuICAgICAgICAvLyBvbmx5IHBhcnNlIG9uY2VcclxuICAgICAgICBpZih0aGlzLl9wYXJzZWQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSAgXHJcbiAgICAgICAgdGhpcy5fcGFyc2VkID0gdHJ1ZTtcclxuXHJcblxyXG4gICAgICAgIC8vIGNoZWNrIGF2YWlsYWJpbGl0eSBvZiBpbnB1dCBkYXRhIFxyXG4gICAgICAgIGlmKCFBcnJheS5pc0FycmF5KHRoaXMuX2lucHV0KSl7IFxyXG4gICAgICAgICAgICB0aGlzLl9zb3J0ZWREYXRhRW50cmllcyA9IG5ldyBBcnJheTxJTndjdERhdGFFbnRyeT4oKTsgLy8gY3JlYXRlIGVtcHR5IGFycmF5XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGdvb2QgY2FzZSAoaW5wdXQgZGF0YSBhdmFpbGFibGUpIC0tPiBtYXAgYXJyYXkgZWxlbWVudHNcclxuICAgICAgICBsZXQgdW5zb3J0ZWREYXRhRW50cmllcyA9IHRoaXMuX2lucHV0Lm1hcCh1bnR5cGVkRW50cnkgPT57IFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gY3JlYXRlIGEgZGF0YSBlbnRyeSBmb3IgZWFjaCB1bnR5cGVkIGFycmF5IGVsZW1lbnRcclxuICAgICAgICAgICAgbGV0IGRhdGFFbnRyeSA6IE53Y3REYXRhRW50cnkgPSBuZXcgTndjdERhdGFFbnRyeSh1bnR5cGVkRW50cnksIHRoaXMsIHRoaXMuX2NvbmZpZ0VudHJpZXMpO1xyXG4gICAgICAgICAgICByZXR1cm4gIGRhdGFFbnRyeTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gc2V0IHNvcnRlZCBlbnRyaWVzIHdpdGggYXNjZW5kaW5nIGluZGV4XHJcbiAgICAgICAgdGhpcy5fc29ydGVkRGF0YUVudHJpZXMgPSB1bnNvcnRlZERhdGFFbnRyaWVzLnNvcnQodGhpcy5jb21wYXJlSW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gXHJcbiAgICAvKipcclxuICAgICAqIENvbXBhcmUgZnVuY3Rpb24gdG8gc29ydCBieSBncm93aW5nIGluZGV4IChmb3Igc29ydGluZylcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJTndjdERhdGFFbnRyeX0gYVxyXG4gICAgICogQHBhcmFtIHtJTndjdERhdGFFbnRyeX0gYlxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBOd2N0RGF0YUVudHJpZXNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb21wYXJlSW5kZXgoYSA6IElOd2N0RGF0YUVudHJ5LCBiOiBJTndjdERhdGFFbnRyeSkgOiBudW1iZXJ7XHJcbiAgICAgICAgLy8gdW5kZWZpbmVkIHNob3VsZCBiZSBzZXQgdG8gdGhlIGVuZFxyXG4gICAgICAgIGlmKCFhLmluZGV4LnZhbGlkKXtcclxuICAgICAgICAgICAgcmV0dXJuIDE7IC8vIHBvc2l0aXZlIG51bWJlciAtLT4gY2hhbmdlIG9yZGVyIC0tPiBiLGFcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIWIuaW5kZXgudmFsaWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gLTE7IC8vIG5lZ2F0aXZlIG51bWJlciAtLT4gbm90aGluZyB0byBkbyAtLT4gYSxiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFxyXG4gICAgICAgIHJldHVybiBhLmluZGV4LnZhbHVlIC0gYi5pbmRleC52YWx1ZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgUmV0dXJucyB0cnVlIGlmIGFsbCBpdGVtcyBhcmUgdmFsaWRcclxuICAgICAqICBBVFRFTlRJT046IFRoaXMgY2FuIHRha2UgYSBsb25nIHRpbWUgdG8gcHJvY2VzcyFcclxuICAgICAqIFxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBOd2N0RGF0YUVudHJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB2YWxpZCgpOmJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIE53Y3RQcnNIZWxwZXIuYXJlQWxsVmFsaWQodGhpcy5zb3J0ZWREYXRhRW50cmllcyBhcyBJTndjdFByc0l0ZW1bXSk7XHJcbiAgICB9XHJcbiAgICBcclxufSJdfQ==