define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Defines the trigger condition values which will be used in the trace configurations export/import format (e.g. coTRACE_IN_WINDOW_EVENT, ...)
     *
     * @class ConditionValueNames
     */
    var ConditionValueNames = /** @class */ (function () {
        function ConditionValueNames() {
        }
        ConditionValueNames.InWindow = "coTRACE_IN_WINDOW_EVENT";
        ConditionValueNames.OutOfWindow = "coTRACE_OUT_OF_WINDOW_EVENT";
        ConditionValueNames.AboveThreshold = "coTRACE_ABOVE_THRESHOLD_EVENT";
        ConditionValueNames.BelowThreshold = "coTRACE_BELOW_THRESHOLD_EVENT";
        ConditionValueNames.EnterWindow = "coTRACE_ENTER_WINDOW_EVENT";
        ConditionValueNames.LeaveWindow = "coTRACE_LEAVE_WINDOW_EVENT";
        ConditionValueNames.GoesAboveWindow = "coTRACE_GOES_ABOVE_WINDOW_EVENT";
        ConditionValueNames.GoesBelowWindow = "coTRACE_GOES_BELOW_WINDOW_EVENT";
        return ConditionValueNames;
    }());
    /**
     * Defines the trigger condition values which will be used in mappCockpit/opc ua server (e.g. 20, 30, ...)
     *
     * @class ConditionIds
     */
    var ConditionIds = /** @class */ (function () {
        function ConditionIds() {
        }
        ConditionIds.InWindow = 20;
        ConditionIds.OutOfWindow = 30;
        ConditionIds.AboveThreshold = 40;
        ConditionIds.BelowThreshold = 50;
        ConditionIds.EnterWindow = 24;
        ConditionIds.LeaveWindow = 34;
        ConditionIds.GoesAboveWindow = 44;
        ConditionIds.GoesBelowWindow = 54;
        return ConditionIds;
    }());
    exports.ConditionIds = ConditionIds;
    var TraceConfigValueConverter = /** @class */ (function () {
        function TraceConfigValueConverter() {
        }
        /**
         * Returns the condition id for the given export/import format condition define (e.g. coTRACE_IN_WINDOW_EVENT => 20)
         *
         * @static
         * @param {string} conditionDefine
         * @returns {number}
         * @memberof TraceConfigValueConverter
         */
        TraceConfigValueConverter.getConditionId = function (conditionDefine) {
            switch (conditionDefine) {
                case ConditionValueNames.InWindow: return ConditionIds.InWindow;
                case ConditionValueNames.OutOfWindow: return ConditionIds.OutOfWindow;
                case ConditionValueNames.AboveThreshold: return ConditionIds.AboveThreshold;
                case ConditionValueNames.BelowThreshold: return ConditionIds.BelowThreshold;
                case ConditionValueNames.EnterWindow: return ConditionIds.EnterWindow;
                case ConditionValueNames.LeaveWindow: return ConditionIds.LeaveWindow;
                case ConditionValueNames.GoesAboveWindow: return ConditionIds.GoesAboveWindow;
                case ConditionValueNames.GoesBelowWindow: return ConditionIds.GoesBelowWindow;
            }
            return 0;
        };
        /**
         * Returns the export/import format condition define for the given condition id (e.g. 20 => coTRACE_IN_WINDOW_EVENT)
         *
         * @static
         * @param {string} conditionId
         * @returns {string}
         * @memberof TraceConfigValueConverter
         */
        TraceConfigValueConverter.getConditionDefine = function (conditionId) {
            var conditionIdNumber = parseInt(conditionId, 10);
            switch (conditionIdNumber) {
                case ConditionIds.InWindow: return ConditionValueNames.InWindow;
                case ConditionIds.OutOfWindow: return ConditionValueNames.OutOfWindow;
                case ConditionIds.AboveThreshold: return ConditionValueNames.AboveThreshold;
                case ConditionIds.BelowThreshold: return ConditionValueNames.BelowThreshold;
                case ConditionIds.EnterWindow: return ConditionValueNames.EnterWindow;
                case ConditionIds.LeaveWindow: return ConditionValueNames.LeaveWindow;
                case ConditionIds.GoesAboveWindow: return ConditionValueNames.GoesAboveWindow;
                case ConditionIds.GoesBelowWindow: return ConditionValueNames.GoesBelowWindow;
            }
            return "";
        };
        /**
         * Returns the condition display name for the given condition id (e.g. 20 => IN_WINDOW)
         *
         * @static
         * @param {string} conditionId
         * @returns {string}
         * @memberof TraceConfigValueConverter
         */
        TraceConfigValueConverter.getTriggerConditionDisplayName = function (conditionId) {
            var conditionIdNumber = parseInt(conditionId, 10);
            switch (conditionIdNumber) {
                case ConditionIds.InWindow: return "IN_WINDOW";
                case ConditionIds.OutOfWindow: return "OUT_OF_WINDOW";
                case ConditionIds.AboveThreshold: return "ABOVE_THRESHOLD";
                case ConditionIds.BelowThreshold: return "BELOW_THRESHOLD";
                case ConditionIds.EnterWindow: return "ENTER_WINDOW";
                case ConditionIds.LeaveWindow: return "LEAVE_WINDOW";
                case ConditionIds.GoesAboveWindow: return "GOES_ABOVE_WINDOW";
                case ConditionIds.GoesBelowWindow: return "GOES_BELOW_WINDOW";
            }
            return "";
        };
        /**
         * Returns the task class number for the given export/import format task class define(e.g. TrcCyclic_1 => 1)
         *
         * @static
         * @param {string} taskClassDefine
         * @returns {string}
         * @memberof TraceConfigValueConverter
         */
        TraceConfigValueConverter.getPvTaskClassNumber = function (taskClassDefine) {
            return taskClassDefine.replace(TraceConfigValueConverter._taskClassCyclePrefix, "");
        };
        /**
         * Returns the export/import format define for task class number (e.g. 1 => TrcCyclic_1)
         *
         * @static
         * @param {string} taskClassNumber
         * @returns {string}
         * @memberof TraceConfigValueConverter
         */
        TraceConfigValueConverter.getPvTaskClassDefine = function (taskClassNumber) {
            return TraceConfigValueConverter._taskClassCyclePrefix + taskClassNumber;
        };
        /**
         * Prefix definition for taskclass cycle define => "TrcCyclic_"
         *
         * @private
         * @static
         * @memberof TraceConfigValueConverter
         */
        TraceConfigValueConverter._taskClassCyclePrefix = "TrcCyclic_";
        return TraceConfigValueConverter;
    }());
    exports.TraceConfigValueConverter = TraceConfigValueConverter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWdWYWx1ZUNvbnZlcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2RpYWdub3N0aWNzL3RyYWNlL3RyYWNlQ29uZmlnL3RyYWNlQ29uZmlnVmFsdWVDb252ZXJ0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBQUE7Ozs7T0FJRztJQUNIO1FBQUE7UUFTQSxDQUFDO1FBUm1CLDRCQUFRLEdBQUcseUJBQXlCLENBQUM7UUFDckMsK0JBQVcsR0FBRyw2QkFBNkIsQ0FBQztRQUM1QyxrQ0FBYyxHQUFHLCtCQUErQixDQUFDO1FBQ2pELGtDQUFjLEdBQUcsK0JBQStCLENBQUM7UUFDakQsK0JBQVcsR0FBRyw0QkFBNEIsQ0FBQztRQUMzQywrQkFBVyxHQUFHLDRCQUE0QixDQUFDO1FBQzNDLG1DQUFlLEdBQUcsaUNBQWlDLENBQUM7UUFDcEQsbUNBQWUsR0FBRyxpQ0FBaUMsQ0FBQztRQUN4RSwwQkFBQztLQUFBLEFBVEQsSUFTQztJQUVEOzs7O09BSUc7SUFDSDtRQUFBO1FBU0EsQ0FBQztRQVJtQixxQkFBUSxHQUFHLEVBQUUsQ0FBQztRQUNkLHdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLDJCQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLDJCQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLHdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLHdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLDRCQUFlLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLDRCQUFlLEdBQUcsRUFBRSxDQUFDO1FBQ3pDLG1CQUFDO0tBQUEsQUFURCxJQVNDO0lBVFksb0NBQVk7SUFXekI7UUFBQTtRQXFHQSxDQUFDO1FBM0ZHOzs7Ozs7O1dBT0c7UUFDSSx3Q0FBYyxHQUFyQixVQUFzQixlQUF1QjtZQUN6QyxRQUFRLGVBQWUsRUFBQztnQkFDcEIsS0FBSyxtQkFBbUIsQ0FBQyxRQUFRLENB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OENBQW9CLEdBQTNCLFVBQTRCLGVBQXVCO1lBQy9DLE9BQU8sZUFBZSxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxxQkFBcUIsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN4RixDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNJLDhDQUFvQixHQUEzQixVQUE0QixlQUF1QjtZQUMvQyxPQUFPLHlCQUF5QixDQUFDLHFCQUFxQixHQUFHLGVBQWUsQ0FBQztRQUM3RSxDQUFDO1FBbkdEOzs7Ozs7V0FNRztRQUNxQiwrQ0FBcUIsR0FBRyxZQUFZLENBQUM7UUE2RmpFLGdDQUFDO0tBQUEsQUFyR0QsSUFxR0M7SUFyR1ksOERBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIERlZmluZXMgdGhlIHRyaWdnZXIgY29uZGl0aW9uIHZhbHVlcyB3aGljaCB3aWxsIGJlIHVzZWQgaW4gdGhlIHRyYWNlIGNvbmZpZ3VyYXRpb25zIGV4cG9ydC9pbXBvcnQgZm9ybWF0IChlLmcuIGNvVFJBQ0VfSU5fV0lORE9XX0VWRU5ULCAuLi4pXHJcbiAqXHJcbiAqIEBjbGFzcyBDb25kaXRpb25WYWx1ZU5hbWVzXHJcbiAqL1xyXG5jbGFzcyBDb25kaXRpb25WYWx1ZU5hbWVze1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IEluV2luZG93ID0gXCJjb1RSQUNFX0lOX1dJTkRPV19FVkVOVFwiO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IE91dE9mV2luZG93ID0gXCJjb1RSQUNFX09VVF9PRl9XSU5ET1dfRVZFTlRcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBBYm92ZVRocmVzaG9sZCA9IFwiY29UUkFDRV9BQk9WRV9USFJFU0hPTERfRVZFTlRcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBCZWxvd1RocmVzaG9sZCA9IFwiY29UUkFDRV9CRUxPV19USFJFU0hPTERfRVZFTlRcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBFbnRlcldpbmRvdyA9IFwiY29UUkFDRV9FTlRFUl9XSU5ET1dfRVZFTlRcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBMZWF2ZVdpbmRvdyA9IFwiY29UUkFDRV9MRUFWRV9XSU5ET1dfRVZFTlRcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBHb2VzQWJvdmVXaW5kb3cgPSBcImNvVFJBQ0VfR09FU19BQk9WRV9XSU5ET1dfRVZFTlRcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBHb2VzQmVsb3dXaW5kb3cgPSBcImNvVFJBQ0VfR09FU19CRUxPV19XSU5ET1dfRVZFTlRcIjtcclxufVxyXG5cclxuLyoqXHJcbiAqIERlZmluZXMgdGhlIHRyaWdnZXIgY29uZGl0aW9uIHZhbHVlcyB3aGljaCB3aWxsIGJlIHVzZWQgaW4gbWFwcENvY2twaXQvb3BjIHVhIHNlcnZlciAoZS5nLiAyMCwgMzAsIC4uLilcclxuICpcclxuICogQGNsYXNzIENvbmRpdGlvbklkc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbmRpdGlvbklkc3tcclxuICAgIHN0YXRpYyByZWFkb25seSBJbldpbmRvdyA9IDIwO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IE91dE9mV2luZG93ID0gMzA7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgQWJvdmVUaHJlc2hvbGQgPSA0MDtcclxuICAgIHN0YXRpYyByZWFkb25seSBCZWxvd1RocmVzaG9sZCA9IDUwO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IEVudGVyV2luZG93ID0gMjQ7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgTGVhdmVXaW5kb3cgPSAzNDtcclxuICAgIHN0YXRpYyByZWFkb25seSBHb2VzQWJvdmVXaW5kb3cgPSA0NDtcclxuICAgIHN0YXRpYyByZWFkb25seSBHb2VzQmVsb3dXaW5kb3cgPSA1NDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRyYWNlQ29uZmlnVmFsdWVDb252ZXJ0ZXJ7XHJcbiAgICAvKipcclxuICAgICAqIFByZWZpeCBkZWZpbml0aW9uIGZvciB0YXNrY2xhc3MgY3ljbGUgZGVmaW5lID0+IFwiVHJjQ3ljbGljX1wiXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1ZhbHVlQ29udmVydGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF90YXNrQ2xhc3NDeWNsZVByZWZpeCA9IFwiVHJjQ3ljbGljX1wiO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGNvbmRpdGlvbiBpZCBmb3IgdGhlIGdpdmVuIGV4cG9ydC9pbXBvcnQgZm9ybWF0IGNvbmRpdGlvbiBkZWZpbmUgKGUuZy4gY29UUkFDRV9JTl9XSU5ET1dfRVZFTlQgPT4gMjApXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbmRpdGlvbkRlZmluZVxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1ZhbHVlQ29udmVydGVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRDb25kaXRpb25JZChjb25kaXRpb25EZWZpbmU6IHN0cmluZyk6IG51bWJlcntcclxuICAgICAgICBzd2l0Y2ggKGNvbmRpdGlvbkRlZmluZSl7XHJcbiAgICAgICAgICAgIGNhc2UgQ29uZGl0aW9uVmFsdWVOYW1lcy5JbldpbmRvdzogcmV0dXJuIENvbmRpdGlvbklkcy5JbldpbmRvdztcclxuICAgICAgICAgICAgY2FzZSBDb25kaXRpb25WYWx1ZU5hbWVzLk91dE9mV2luZG93OiByZXR1cm4gQ29uZGl0aW9uSWRzLk91dE9mV2luZG93O1xyXG4gICAgICAgICAgICBjYXNlIENvbmRpdGlvblZhbHVlTmFtZXMuQWJvdmVUaHJlc2hvbGQ6IHJldHVybiBDb25kaXRpb25JZHMuQWJvdmVUaHJlc2hvbGQ7XHJcbiAgICAgICAgICAgIGNhc2UgQ29uZGl0aW9uVmFsdWVOYW1lcy5CZWxvd1RocmVzaG9sZDogcmV0dXJuIENvbmRpdGlvbklkcy5CZWxvd1RocmVzaG9sZDtcclxuICAgICAgICAgICAgY2FzZSBDb25kaXRpb25WYWx1ZU5hbWVzLkVudGVyV2luZG93OiByZXR1cm4gQ29uZGl0aW9uSWRzLkVudGVyV2luZG93O1xyXG4gICAgICAgICAgICBjYXNlIENvbmRpdGlvblZhbHVlTmFtZXMuTGVhdmVXaW5kb3c6IHJldHVybiBDb25kaXRpb25JZHMuTGVhdmVXaW5kb3c7XHJcbiAgICAgICAgICAgIGNhc2UgQ29uZGl0aW9uVmFsdWVOYW1lcy5Hb2VzQWJvdmVXaW5kb3c6IHJldHVybiBDb25kaXRpb25JZHMuR29lc0Fib3ZlV2luZG93O1xyXG4gICAgICAgICAgICBjYXNlIENvbmRpdGlvblZhbHVlTmFtZXMuR29lc0JlbG93V2luZG93OiByZXR1cm4gQ29uZGl0aW9uSWRzLkdvZXNCZWxvd1dpbmRvdztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBleHBvcnQvaW1wb3J0IGZvcm1hdCBjb25kaXRpb24gZGVmaW5lIGZvciB0aGUgZ2l2ZW4gY29uZGl0aW9uIGlkIChlLmcuIDIwID0+IGNvVFJBQ0VfSU5fV0lORE9XX0VWRU5UKVxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb25kaXRpb25JZFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1ZhbHVlQ29udmVydGVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRDb25kaXRpb25EZWZpbmUoY29uZGl0aW9uSWQ6IHN0cmluZyk6IHN0cmluZ3tcclxuICAgICAgICBsZXQgY29uZGl0aW9uSWROdW1iZXIgPSBwYXJzZUludChjb25kaXRpb25JZCwgMTApO1xyXG4gICAgICAgIHN3aXRjaCAoY29uZGl0aW9uSWROdW1iZXIpe1xyXG4gICAgICAgICAgICBjYXNlIENvbmRpdGlvbklkcy5JbldpbmRvdzogcmV0dXJuIENvbmRpdGlvblZhbHVlTmFtZXMuSW5XaW5kb3c7XHJcbiAgICAgICAgICAgIGNhc2UgQ29uZGl0aW9uSWRzLk91dE9mV2luZG93OiByZXR1cm4gQ29uZGl0aW9uVmFsdWVOYW1lcy5PdXRPZldpbmRvdztcclxuICAgICAgICAgICAgY2FzZSBDb25kaXRpb25JZHMuQWJvdmVUaHJlc2hvbGQ6IHJldHVybiBDb25kaXRpb25WYWx1ZU5hbWVzLkFib3ZlVGhyZXNob2xkO1xyXG4gICAgICAgICAgICBjYXNlIENvbmRpdGlvbklkcy5CZWxvd1RocmVzaG9sZDogcmV0dXJuIENvbmRpdGlvblZhbHVlTmFtZXMuQmVsb3dUaHJlc2hvbGQ7XHJcbiAgICAgICAgICAgIGNhc2UgQ29uZGl0aW9uSWRzLkVudGVyV2luZG93OiByZXR1cm4gQ29uZGl0aW9uVmFsdWVOYW1lcy5FbnRlcldpbmRvdztcclxuICAgICAgICAgICAgY2FzZSBDb25kaXRpb25JZHMuTGVhdmVXaW5kb3c6IHJldHVybiBDb25kaXRpb25WYWx1ZU5hbWVzLkxlYXZlV2luZG93O1xyXG4gICAgICAgICAgICBjYXNlIENvbmRpdGlvbklkcy5Hb2VzQWJvdmVXaW5kb3c6IHJldHVybiBDb25kaXRpb25WYWx1ZU5hbWVzLkdvZXNBYm92ZVdpbmRvdztcclxuICAgICAgICAgICAgY2FzZSBDb25kaXRpb25JZHMuR29lc0JlbG93V2luZG93OiByZXR1cm4gQ29uZGl0aW9uVmFsdWVOYW1lcy5Hb2VzQmVsb3dXaW5kb3c7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgY29uZGl0aW9uIGRpc3BsYXkgbmFtZSBmb3IgdGhlIGdpdmVuIGNvbmRpdGlvbiBpZCAoZS5nLiAyMCA9PiBJTl9XSU5ET1cpXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbmRpdGlvbklkXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVmFsdWVDb252ZXJ0ZXJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldFRyaWdnZXJDb25kaXRpb25EaXNwbGF5TmFtZShjb25kaXRpb25JZDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgY29uZGl0aW9uSWROdW1iZXIgPSBwYXJzZUludChjb25kaXRpb25JZCwgMTApO1xyXG4gICAgICAgIHN3aXRjaChjb25kaXRpb25JZE51bWJlcil7XHJcbiAgICAgICAgICAgIGNhc2UgQ29uZGl0aW9uSWRzLkluV2luZG93OiByZXR1cm4gXCJJTl9XSU5ET1dcIjtcclxuICAgICAgICAgICAgY2FzZSBDb25kaXRpb25JZHMuT3V0T2ZXaW5kb3c6IHJldHVybiBcIk9VVF9PRl9XSU5ET1dcIjtcclxuICAgICAgICAgICAgY2FzZSBDb25kaXRpb25JZHMuQWJvdmVUaHJlc2hvbGQ6IHJldHVybiBcIkFCT1ZFX1RIUkVTSE9MRFwiO1xyXG4gICAgICAgICAgICBjYXNlIENvbmRpdGlvbklkcy5CZWxvd1RocmVzaG9sZDogcmV0dXJuIFwiQkVMT1dfVEhSRVNIT0xEXCI7XHJcbiAgICAgICAgICAgIGNhc2UgQ29uZGl0aW9uSWRzLkVudGVyV2luZG93OiByZXR1cm4gXCJFTlRFUl9XSU5ET1dcIjtcclxuICAgICAgICAgICAgY2FzZSBDb25kaXRpb25JZHMuTGVhdmVXaW5kb3c6IHJldHVybiBcIkxFQVZFX1dJTkRPV1wiO1xyXG4gICAgICAgICAgICBjYXNlIENvbmRpdGlvbklkcy5Hb2VzQWJvdmVXaW5kb3c6IHJldHVybiBcIkdPRVNfQUJPVkVfV0lORE9XXCI7XHJcbiAgICAgICAgICAgIGNhc2UgQ29uZGl0aW9uSWRzLkdvZXNCZWxvd1dpbmRvdzogcmV0dXJuIFwiR09FU19CRUxPV19XSU5ET1dcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0YXNrIGNsYXNzIG51bWJlciBmb3IgdGhlIGdpdmVuIGV4cG9ydC9pbXBvcnQgZm9ybWF0IHRhc2sgY2xhc3MgZGVmaW5lKGUuZy4gVHJjQ3ljbGljXzEgPT4gMSlcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGFza0NsYXNzRGVmaW5lXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVmFsdWVDb252ZXJ0ZXJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldFB2VGFza0NsYXNzTnVtYmVyKHRhc2tDbGFzc0RlZmluZTogc3RyaW5nKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0YXNrQ2xhc3NEZWZpbmUucmVwbGFjZShUcmFjZUNvbmZpZ1ZhbHVlQ29udmVydGVyLl90YXNrQ2xhc3NDeWNsZVByZWZpeCwgXCJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBleHBvcnQvaW1wb3J0IGZvcm1hdCBkZWZpbmUgZm9yIHRhc2sgY2xhc3MgbnVtYmVyIChlLmcuIDEgPT4gVHJjQ3ljbGljXzEpXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRhc2tDbGFzc051bWJlclxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1ZhbHVlQ29udmVydGVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRQdlRhc2tDbGFzc0RlZmluZSh0YXNrQ2xhc3NOdW1iZXI6IHN0cmluZyk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gVHJhY2VDb25maWdWYWx1ZUNvbnZlcnRlci5fdGFza0NsYXNzQ3ljbGVQcmVmaXggKyB0YXNrQ2xhc3NOdW1iZXI7XHJcbiAgICB9XHJcbn1cclxuIl19