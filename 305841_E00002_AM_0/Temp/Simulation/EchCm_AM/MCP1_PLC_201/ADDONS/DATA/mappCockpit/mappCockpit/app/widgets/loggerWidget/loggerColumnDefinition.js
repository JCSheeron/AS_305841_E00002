define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Type of the data for a column (e.g. numeric or string)
     *
     * @export
     * @enum {number}
     */
    var FieldType;
    (function (FieldType) {
        FieldType[FieldType["Numeric"] = 0] = "Numeric";
        FieldType[FieldType["String"] = 1] = "String";
    })(FieldType = exports.FieldType || (exports.FieldType = {}));
    /**
     * Defines one column for the logger
     *
     * @export
     * @class LoggerColumnDefinition
     */
    var LoggerColumnDefinition = /** @class */ (function () {
        /**
         * Creates an instance of LoggerColumnDefinition
         * @param {string} fieldId
         * @param {string} displayName
         * @param {number} size
         * @param {FieldType} [fieldType=FieldType.String]
         * @param {boolean} [disableSorting=false]
         * @param {string} [tooltipTemplate=""]
         * @memberof LoggerColumnDefinition
         */
        function LoggerColumnDefinition(fieldId, displayName, size, fieldType, disableSorting, tooltipTemplate) {
            if (fieldType === void 0) { fieldType = FieldType.String; }
            if (disableSorting === void 0) { disableSorting = false; }
            if (tooltipTemplate === void 0) { tooltipTemplate = "defaultTooltipTemplate"; }
            this.fieldId = fieldId;
            this.displayName = displayName;
            this.size = size;
            this.fieldType = fieldType;
            this.disableSorting = disableSorting;
            this.tooltipTemplate = tooltipTemplate;
        }
        return LoggerColumnDefinition;
    }());
    exports.LoggerColumnDefinition = LoggerColumnDefinition;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyQ29sdW1uRGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9sb2dnZXJXaWRnZXQvbG9nZ2VyQ29sdW1uRGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFBQTs7Ozs7T0FLRztJQUNILElBQVksU0FHWDtJQUhELFdBQVksU0FBUztRQUNqQiwrQ0FBTyxDQUFBO1FBQ1AsNkNBQU0sQ0FBQTtJQUNWLENBQUMsRUFIVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQUdwQjtJQUVEOzs7OztPQUtHO0lBQ0g7UUFpREk7Ozs7Ozs7OztXQVNHO1FBQ0gsZ0NBQVksT0FBZSxFQUFFLFdBQW1CLEVBQUUsSUFBWSxFQUFFLFNBQXVDLEVBQUUsY0FBc0IsRUFBRSxlQUFrRDtZQUFuSCwwQkFBQSxFQUFBLFlBQXVCLFNBQVMsQ0FBQyxNQUFNO1lBQUUsK0JBQUEsRUFBQSxzQkFBc0I7WUFBRSxnQ0FBQSxFQUFBLDBDQUFrRDtZQUMvSyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztZQUMvQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUMzQixJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztZQUNyQyxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztRQUMzQyxDQUFDO1FBQ0wsNkJBQUM7SUFBRCxDQUFDLEFBbkVELElBbUVDO0lBbkVZLHdEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBUeXBlIG9mIHRoZSBkYXRhIGZvciBhIGNvbHVtbiAoZS5nLiBudW1lcmljIG9yIHN0cmluZylcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAZW51bSB7bnVtYmVyfVxyXG4gKi9cclxuZXhwb3J0IGVudW0gRmllbGRUeXBle1xyXG4gICAgTnVtZXJpYyxcclxuICAgIFN0cmluZ1xyXG59XHJcblxyXG4vKipcclxuICogRGVmaW5lcyBvbmUgY29sdW1uIGZvciB0aGUgbG9nZ2VyXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIExvZ2dlckNvbHVtbkRlZmluaXRpb25cclxuICovXHJcbmV4cG9ydCBjbGFzcyBMb2dnZXJDb2x1bW5EZWZpbml0aW9ue1xyXG4gICAgLyoqXHJcbiAgICAgKiBQcm9wZXJ0eSBpbiB0aGUgZGF0YSBtb2RlbCB0byB1c2UgZm9yIHRoaXMgY29sdW1uXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBMb2dnZXJDb2x1bW5EZWZpbml0aW9uXHJcbiAgICAgKi9cclxuICAgIHJlYWRvbmx5IGZpZWxkSWQ6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBkaXNwbGF5bmFtZSBmb3IgdGhpcyBjb2x1bW5cclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIExvZ2dlckNvbHVtbkRlZmluaXRpb25cclxuICAgICAqL1xyXG4gICAgcmVhZG9ubHkgZGlzcGxheU5hbWU6IHN0cmluZztcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZhdWx0IHNpemUgb2YgdGhlIGNvbHVtbiBpbiBwaXhlbFxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgTG9nZ2VyQ29sdW1uRGVmaW5pdGlvblxyXG4gICAgICovXHJcbiAgICByZWFkb25seSBzaXplOiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZmllbGRUeXBlIG9mIHRoaXMgY29sdW1uIChlLmcuIG51bWVyaWMsIHN0cmluZywgLi4uKVxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtGaWVsZFR5cGV9XHJcbiAgICAgKiBAbWVtYmVyb2YgTG9nZ2VyQ29sdW1uRGVmaW5pdGlvblxyXG4gICAgICovXHJcbiAgICByZWFkb25seSBmaWVsZFR5cGU6IEZpZWxkVHlwZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBpZCBvZiB0aGUgdG9vbHRpcCB0ZW1wbGF0ZSBmb3IgdGhpcyBjb2x1bW4oZGVmYXVsdCBpcyBcImRlZmF1bHRUb29sdGlwVGVtcGxhdGVcIilcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIExvZ2dlckNvbHVtbkRlZmluaXRpb25cclxuICAgICAqL1xyXG4gICAgcmVhZG9ubHkgdG9vbHRpcFRlbXBsYXRlOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNhYmxlcyB0aGUgc29ydGluZyBvZiB0aGlzIGNvbHVtblxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIExvZ2dlckNvbHVtbkRlZmluaXRpb25cclxuICAgICAqL1xyXG4gICAgcmVhZG9ubHkgZGlzYWJsZVNvcnRpbmc6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIExvZ2dlckNvbHVtbkRlZmluaXRpb25cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZElkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGlzcGxheU5hbWVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzaXplXHJcbiAgICAgKiBAcGFyYW0ge0ZpZWxkVHlwZX0gW2ZpZWxkVHlwZT1GaWVsZFR5cGUuU3RyaW5nXVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbZGlzYWJsZVNvcnRpbmc9ZmFsc2VdXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3Rvb2x0aXBUZW1wbGF0ZT1cIlwiXSBcclxuICAgICAqIEBtZW1iZXJvZiBMb2dnZXJDb2x1bW5EZWZpbml0aW9uXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGZpZWxkSWQ6IHN0cmluZywgZGlzcGxheU5hbWU6IHN0cmluZywgc2l6ZTogbnVtYmVyLCBmaWVsZFR5cGU6IEZpZWxkVHlwZSA9IEZpZWxkVHlwZS5TdHJpbmcsIGRpc2FibGVTb3J0aW5nID0gZmFsc2UsIHRvb2x0aXBUZW1wbGF0ZTogc3RyaW5nID0gXCJkZWZhdWx0VG9vbHRpcFRlbXBsYXRlXCIpe1xyXG4gICAgICAgIHRoaXMuZmllbGRJZCA9IGZpZWxkSWQ7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5TmFtZSA9IGRpc3BsYXlOYW1lO1xyXG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XHJcbiAgICAgICAgdGhpcy5maWVsZFR5cGUgPSBmaWVsZFR5cGU7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlU29ydGluZyA9IGRpc2FibGVTb3J0aW5nO1xyXG4gICAgICAgIHRoaXMudG9vbHRpcFRlbXBsYXRlID0gdG9vbHRpcFRlbXBsYXRlO1xyXG4gICAgfVxyXG59Il19