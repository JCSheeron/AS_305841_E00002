define(["require", "exports", "../enums/traceDataConversionErrorTypes", "../exceptions/traceDataConversionError"], function (require, exports, traceDataConversionErrorTypes_1, traceDataConversionError_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Represents the data contained in an AS CSV formatted string.
     *
     * @class ASCsvSignalObj
     * @implements {IASCsvSignal}
     */
    var ASCsvSignalObj = /** @class */ (function () {
        /**
         * Creates an instance of ASCsvSignalObj.
         *
         * @param {string} title
         * @param {Date} starttrigger
         * @param {number} rows
         * @param {Array<IPoint>} points
         * @param {string} [xunit="UnitX"]
         * @param {string} [yunit="UnitY"]
         * @param {string} [formula="DO_NOT_CHANGE_ORIGINAL_DATA"]
         * @memberof ASCsvSignalObj
         */
        function ASCsvSignalObj(title, starttrigger, rows, data, xunit, yunit, formula) {
            if (xunit === void 0) { xunit = "UnitX"; }
            if (yunit === void 0) { yunit = "UnitY"; }
            if (formula === void 0) { formula = "DO_NOT_CHANGE_ORIGINAL_DATA"; }
            this.title = title;
            this.starttrigger = starttrigger;
            this.rows = rows;
            this.data = data;
            this.xunit = xunit;
            this.yunit = yunit;
            this.formula = formula;
        }
        /**
         * Builds a ASCsvSignalObj from interfaces.
         * Can throw TraceDataConversionError.
         *
         * @static
         * @param {IASCsvHeader} header
         * @param {Array<IPoint>} data
         * @returns {ASCsvSignalObj}
         * @memberof ASCsvSignalObj
         */
        ASCsvSignalObj.buildASCsvSignalObj = function (header, data) {
            if (header.rows !== data.length) {
                throw traceDataConversionError_1.TraceDataConversionError.build(traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.FORMAT_VIOLATION);
            }
            return new ASCsvSignalObj(header.title, header.starttrigger, header.rows, data, header.xunit, header.yunit, header.formula);
        };
        return ASCsvSignalObj;
    }());
    exports.ASCsvSignalObj = ASCsvSignalObj;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQVNDc3ZTaWduYWxPYmouanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi90cmFjZURhdGFDb252ZXJzaW9uL2NsYXNzZXMvQVNDc3ZTaWduYWxPYmoudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBT0E7Ozs7O09BS0c7SUFDSDtRQUtJOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsd0JBQWEsS0FBYSxFQUFFLFlBQWtCLEVBQUUsSUFBWSxFQUFFLElBQXVDLEVBQUUsS0FBc0IsRUFBRSxLQUFzQixFQUFFLE9BQThDO1lBQTlGLHNCQUFBLEVBQUEsZUFBc0I7WUFBRSxzQkFBQSxFQUFBLGVBQXNCO1lBQUUsd0JBQUEsRUFBQSx1Q0FBOEM7WUFDak0sSUFBSSxDQUFDLEtBQUssR0FBRSxLQUFLLENBQUM7WUFDbEIsSUFBSSxDQUFDLFlBQVksR0FBRSxZQUFZLENBQUM7WUFDaEMsSUFBSSxDQUFDLElBQUksR0FBRSxJQUFJLENBQUM7WUFDaEIsSUFBSSxDQUFDLElBQUksR0FBRSxJQUFJLENBQUM7WUFDaEIsSUFBSSxDQUFDLEtBQUssR0FBRSxLQUFLLENBQUM7WUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRSxLQUFLLENBQUM7WUFDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRSxPQUFPLENBQUM7UUFDMUIsQ0FBQztRQVdEOzs7Ozs7Ozs7V0FTRztRQUNXLGtDQUFtQixHQUFqQyxVQUFrQyxNQUFvQixFQUFFLElBQXVDO1lBQzNGLElBQUcsTUFBTSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUM1QixNQUFNLG1EQUF3QixDQUFDLEtBQUssQ0FBQyw2REFBNkIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2FBQ3hGO1lBQ0QsT0FBTyxJQUFJLGNBQWMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoSSxDQUFDO1FBQ0wscUJBQUM7SUFBRCxDQUFDLEFBcERELElBb0RDO0lBRVEsd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQVNDc3ZTaWduYWwgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9JQVNDc3ZTaWduYWxcIjtcclxuaW1wb3J0IHsgSUFTQ3N2SGVhZGVyIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvSUFTQ3N2SGVhZGVyXCI7XHJcbmltcG9ydCB7IFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvclR5cGVzIH0gZnJvbSBcIi4uL2VudW1zL3RyYWNlRGF0YUNvbnZlcnNpb25FcnJvclR5cGVzXCI7XHJcbmltcG9ydCB7IFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvciB9IGZyb20gXCIuLi9leGNlcHRpb25zL3RyYWNlRGF0YUNvbnZlcnNpb25FcnJvclwiO1xyXG5pbXBvcnQgeyBJVmFsdWVQYWlyIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvaW50ZXJmYWNlcy92YWx1ZVBhaXJJbnRlcmZhY2VcIjtcclxuXHJcblxyXG4vKipcclxuICogUmVwcmVzZW50cyB0aGUgZGF0YSBjb250YWluZWQgaW4gYW4gQVMgQ1NWIGZvcm1hdHRlZCBzdHJpbmcuXHJcbiAqXHJcbiAqIEBjbGFzcyBBU0NzdlNpZ25hbE9ialxyXG4gKiBAaW1wbGVtZW50cyB7SUFTQ3N2U2lnbmFsfVxyXG4gKi9cclxuY2xhc3MgQVNDc3ZTaWduYWxPYmogaW1wbGVtZW50cyBJQVNDc3ZTaWduYWx7XHJcbiAgICBcclxuICAgIFxyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEFTQ3N2U2lnbmFsT2JqLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcclxuICAgICAqIEBwYXJhbSB7RGF0ZX0gc3RhcnR0cmlnZ2VyXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcm93c1xyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUG9pbnQ+fSBwb2ludHNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbeHVuaXQ9XCJVbml0WFwiXVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFt5dW5pdD1cIlVuaXRZXCJdXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2Zvcm11bGE9XCJET19OT1RfQ0hBTkdFX09SSUdJTkFMX0RBVEFcIl1cclxuICAgICAqIEBtZW1iZXJvZiBBU0NzdlNpZ25hbE9ialxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvciggdGl0bGU6IHN0cmluZywgc3RhcnR0cmlnZ2VyOiBEYXRlLCByb3dzOiBudW1iZXIsIGRhdGE6IEFycmF5PElWYWx1ZVBhaXI8bnVtYmVyLCBudW1iZXI+PiwgeHVuaXQ6IHN0cmluZz0gXCJVbml0WFwiLCB5dW5pdDogc3RyaW5nPSBcIlVuaXRZXCIsIGZvcm11bGE6IHN0cmluZz0gXCJET19OT1RfQ0hBTkdFX09SSUdJTkFMX0RBVEFcIil7XHJcbiAgICAgICAgdGhpcy50aXRsZT0gdGl0bGU7XHJcbiAgICAgICAgdGhpcy5zdGFydHRyaWdnZXI9IHN0YXJ0dHJpZ2dlcjtcclxuICAgICAgICB0aGlzLnJvd3M9IHJvd3M7XHJcbiAgICAgICAgdGhpcy5kYXRhPSBkYXRhO1xyXG4gICAgICAgIHRoaXMueHVuaXQ9IHh1bml0O1xyXG4gICAgICAgIHRoaXMueXVuaXQ9IHl1bml0O1xyXG4gICAgICAgIHRoaXMuZm9ybXVsYT0gZm9ybXVsYTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZzsgLy8gQ29udGFpbnMgdGhlIHRpdGxlIG9mIHRoZSBzaWduYWxcclxuICAgIHB1YmxpYyBzdGFydHRyaWdnZXI6IERhdGU7IC8vIENvbnRhaW5zIERhdGUgb2JqZWN0IG9mIHdoZW4gdGhlIHN0YXJ0dHJpZ2dlciBldmVudCBvY2N1cmVkXHJcbiAgICBwdWJsaWMgeHVuaXQ6IHN0cmluZzsgLy8gQ29udGFpbnMgdW5pdCBvZiBtZW1iZXIgeCBvZiBvYmplY3RzIHN0b3JlZCBpbiBwb2ludHNcclxuICAgIHB1YmxpYyB5dW5pdDogc3RyaW5nOyAvLyBDb250YWlucyB1bml0IG9mIG1lbWJlciB5IG9mIG9iamVjdHMgc3RvcmVkIGluIHBvaW50c1xyXG4gICAgcHVibGljIHJvd3M6IG51bWJlcjsgLy8gU3RvcmVzIG51bWJlciBvZiByb3dzLiBJcyB0aGUgbnVtYmVyIG9mIGVudHJpZXMgb2YgbWVtYmVyIHBvaW50c1xyXG4gICAgcHVibGljIGRhdGE6IEFycmF5PElWYWx1ZVBhaXI8bnVtYmVyLCBudW1iZXI+PjsgLy8gIFN0b3JlcyBkYXRhcG9pbnRzLiBBcnJheSBvZiBJU2FtcGxlLlxyXG4gICAgcHVibGljIGZvcm11bGE6IHN0cmluZzsgLy8gQ29udGFpbnMgdGhlIGZvcm11bGEgdXNlZCBvbiB0aGUgc2lnbmFsXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQnVpbGRzIGEgQVNDc3ZTaWduYWxPYmogZnJvbSBpbnRlcmZhY2VzLlxyXG4gICAgICogQ2FuIHRocm93IFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvci5cclxuICAgICAqIFxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtJQVNDc3ZIZWFkZXJ9IGhlYWRlclxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUG9pbnQ+fSBkYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7QVNDc3ZTaWduYWxPYmp9XHJcbiAgICAgKiBAbWVtYmVyb2YgQVNDc3ZTaWduYWxPYmpcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBidWlsZEFTQ3N2U2lnbmFsT2JqKGhlYWRlcjogSUFTQ3N2SGVhZGVyLCBkYXRhOiBBcnJheTxJVmFsdWVQYWlyPG51bWJlciwgbnVtYmVyPj4pOiBBU0NzdlNpZ25hbE9iaiB7XHJcbiAgICAgICAgaWYoaGVhZGVyLnJvd3MgIT09IGRhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRocm93IFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvci5idWlsZChUcmFjZURhdGFDb252ZXJzaW9uRXJyb3JUeXBlcy5GT1JNQVRfVklPTEFUSU9OKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBBU0NzdlNpZ25hbE9iaihoZWFkZXIudGl0bGUsIGhlYWRlci5zdGFydHRyaWdnZXIsIGhlYWRlci5yb3dzLCBkYXRhLCBoZWFkZXIueHVuaXQsIGhlYWRlci55dW5pdCwgaGVhZGVyLmZvcm11bGEpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBBU0NzdlNpZ25hbE9iaiB9OyJdfQ==