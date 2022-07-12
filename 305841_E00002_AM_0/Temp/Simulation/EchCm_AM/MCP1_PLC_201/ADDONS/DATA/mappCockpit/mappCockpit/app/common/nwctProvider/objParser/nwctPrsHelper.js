define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Contains all helper functions when parsing or processing the parsed items
     *
     * @export
     * @class NwctPrsHelper
     */
    var NwctPrsHelper = /** @class */ (function () {
        /**
         * This class can not be instantiated, all methods are static
         * @memberof NwctPrsHelper
         */
        function NwctPrsHelper() {
        }
        ;
        /**
        * Returns true if all contained parsed items are valid
        *
        * @static
        * @param {Array<INwctPrsItem>} prsItems
        * @returns
        * @memberof NwctPrsHelper
        */
        NwctPrsHelper.areAllValid = function (prsItems) {
            // extract valid property
            var validStates = prsItems.map(function (propObj) { return propObj.valid; });
            // result is only true if all properties are valid
            var result = validStates.reduce(function (tmpResult, currentValue) { return tmpResult && currentValue; });
            return result;
        };
        return NwctPrsHelper;
    }());
    exports.NwctPrsHelper = NwctPrsHelper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibndjdFByc0hlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL253Y3RQcm92aWRlci9vYmpQYXJzZXIvbndjdFByc0hlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFLQTs7Ozs7T0FLRztJQUNIO1FBRUk7OztXQUdHO1FBQ0g7UUFBc0IsQ0FBQztRQUFBLENBQUM7UUFFdkI7Ozs7Ozs7VUFPRTtRQUNXLHlCQUFXLEdBQXpCLFVBQTBCLFFBQThCO1lBQ3BELHlCQUF5QjtZQUN6QixJQUFJLFdBQVcsR0FBcUIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxLQUFLLEVBQWIsQ0FBYSxDQUFDLENBQUM7WUFFM0Usa0RBQWtEO1lBQ2xELElBQUksTUFBTSxHQUFhLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBQyxTQUFTLEVBQUUsWUFBWSxJQUFLLE9BQUEsU0FBUyxJQUFJLFlBQVksRUFBekIsQ0FBeUIsQ0FBQyxDQUFDO1lBRWxHLE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUM7UUFDTCxvQkFBQztJQUFELENBQUMsQUF6QkQsSUF5QkM7SUF6Qlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgSU53Y3RQcnNJdGVtIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9ud2N0UHJzSXRlbUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBOd2N0UHJzSXRlbUJhc2UgfSBmcm9tIFwiLi9ud2N0UHJzSXRlbUJhc2VcIjtcclxuXHJcblxyXG4vKipcclxuICogQ29udGFpbnMgYWxsIGhlbHBlciBmdW5jdGlvbnMgd2hlbiBwYXJzaW5nIG9yIHByb2Nlc3NpbmcgdGhlIHBhcnNlZCBpdGVtc1xyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBOd2N0UHJzSGVscGVyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTndjdFByc0hlbHBlcntcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgY2xhc3MgY2FuIG5vdCBiZSBpbnN0YW50aWF0ZWQsIGFsbCBtZXRob2RzIGFyZSBzdGF0aWNcclxuICAgICAqIEBtZW1iZXJvZiBOd2N0UHJzSGVscGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKXt9O1xyXG5cclxuICAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiBhbGwgY29udGFpbmVkIHBhcnNlZCBpdGVtcyBhcmUgdmFsaWRcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElOd2N0UHJzSXRlbT59IHByc0l0ZW1zXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE53Y3RQcnNIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBhcmVBbGxWYWxpZChwcnNJdGVtcyA6IEFycmF5PElOd2N0UHJzSXRlbT4pe1xyXG4gICAgICAgIC8vIGV4dHJhY3QgdmFsaWQgcHJvcGVydHlcclxuICAgICAgICBsZXQgdmFsaWRTdGF0ZXMgOiBBcnJheTxib29sZWFuPiAgPSBwcnNJdGVtcy5tYXAocHJvcE9iaiA9PiBwcm9wT2JqLnZhbGlkKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyByZXN1bHQgaXMgb25seSB0cnVlIGlmIGFsbCBwcm9wZXJ0aWVzIGFyZSB2YWxpZFxyXG4gICAgICAgIGxldCByZXN1bHQgOiBib29sZWFuID0gdmFsaWRTdGF0ZXMucmVkdWNlKCh0bXBSZXN1bHQsIGN1cnJlbnRWYWx1ZSkgPT4gdG1wUmVzdWx0ICYmIGN1cnJlbnRWYWx1ZSk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbn0iXX0=