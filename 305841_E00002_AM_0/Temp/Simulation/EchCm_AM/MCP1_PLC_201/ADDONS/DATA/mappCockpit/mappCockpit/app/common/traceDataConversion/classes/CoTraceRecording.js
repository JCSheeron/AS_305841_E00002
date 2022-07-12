define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Represents a recording recorded by the CoTrace library.
     *
     * @class CoTraceRecording
     * @implements {ICoTraceRecording}
     */
    var CoTraceRecording = /** @class */ (function () {
        /**
         * Creates an instance of CoTraceRecording.
         *
         * @param {Date} starttrigger
         * @param {Array<ICoTraceSignal>} signals
         * @memberof CoTraceRecording
         */
        function CoTraceRecording(starttrigger, signals) {
            this.starttrigger = starttrigger;
            this.signals = signals;
        }
        return CoTraceRecording;
    }());
    exports.CoTraceRecording = CoTraceRecording;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29UcmFjZVJlY29yZGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3RyYWNlRGF0YUNvbnZlcnNpb24vY2xhc3Nlcy9Db1RyYWNlUmVjb3JkaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUdBOzs7OztPQUtHO0lBQ0g7UUFJSTs7Ozs7O1dBTUc7UUFDSCwwQkFBWSxZQUFrQixFQUFFLE9BQThCO1lBQzFELElBQUksQ0FBQyxZQUFZLEdBQUUsWUFBWSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUUsT0FBTyxDQUFDO1FBQzFCLENBQUM7UUFDTCx1QkFBQztJQUFELENBQUMsQUFmRCxJQWVDO0lBRVEsNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNvVHJhY2VSZWNvcmRpbmcgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9JQ29UcmFjZVJlY29yZGluZ1wiO1xyXG5pbXBvcnQgeyBJQ29UcmFjZVNpZ25hbCB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL0lDb1RyYWNlU2lnbmFsXCI7XHJcblxyXG4vKipcclxuICogUmVwcmVzZW50cyBhIHJlY29yZGluZyByZWNvcmRlZCBieSB0aGUgQ29UcmFjZSBsaWJyYXJ5LlxyXG4gKlxyXG4gKiBAY2xhc3MgQ29UcmFjZVJlY29yZGluZ1xyXG4gKiBAaW1wbGVtZW50cyB7SUNvVHJhY2VSZWNvcmRpbmd9XHJcbiAqL1xyXG5jbGFzcyBDb1RyYWNlUmVjb3JkaW5nIGltcGxlbWVudHMgSUNvVHJhY2VSZWNvcmRpbmcge1xyXG4gICAgcHVibGljIHN0YXJ0dHJpZ2dlcjogRGF0ZTtcclxuICAgIHB1YmxpYyBzaWduYWxzOiBBcnJheTxJQ29UcmFjZVNpZ25hbD47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIENvVHJhY2VSZWNvcmRpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtEYXRlfSBzdGFydHRyaWdnZXJcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SUNvVHJhY2VTaWduYWw+fSBzaWduYWxzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29UcmFjZVJlY29yZGluZ1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihzdGFydHRyaWdnZXI6IERhdGUsIHNpZ25hbHM6IEFycmF5PElDb1RyYWNlU2lnbmFsPil7XHJcbiAgICAgICAgdGhpcy5zdGFydHRyaWdnZXI9IHN0YXJ0dHJpZ2dlcjtcclxuICAgICAgICB0aGlzLnNpZ25hbHM9IHNpZ25hbHM7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IENvVHJhY2VSZWNvcmRpbmcgfSJdfQ==