define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Meta data for a Package object.
     *
     * @export
     * @class Meta
     * @implements {IMeta}
     */
    var Meta = /** @class */ (function () {
        /**
         * Creates an instance of Meta.
         * A data type must be provided, with the option to provide any amount of additional key value pairs.
         *
         * @param {DataType} dataType
         * @param {Array<KeyValue>} [additionalMetaData=[]]
         * @memberof Meta
         */
        function Meta(dataType, additionalMetaData) {
            var _this = this;
            if (additionalMetaData === void 0) { additionalMetaData = []; }
            this.dataType = dataType;
            additionalMetaData.forEach(function (metaData) { _this[metaData.key] = metaData.value; });
        }
        /**
         * Creates an ID for a Package.
         *
         * @static
         * @returns {number}
         * @memberof Meta
         */
        Meta.createID = function () {
            return Meta.idCounter++;
        };
        /**
         * The counter used to generate IDs for packages
         *
         * @private
         * @static
         * @type {number}
         * @memberof Meta
         */
        Meta.idCounter = 0;
        return Meta;
    }());
    exports.Meta = Meta;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL21ldGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBT0E7Ozs7OztPQU1HO0lBQ0g7UUFrQ0k7Ozs7Ozs7V0FPRztRQUNILGNBQVksUUFBa0IsRUFBRSxrQkFBd0M7WUFBeEUsaUJBR0M7WUFIK0IsbUNBQUEsRUFBQSx1QkFBd0M7WUFDcEUsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFDekIsa0JBQWtCLENBQUMsT0FBTyxDQUFDLFVBQUEsUUFBUSxJQUFNLEtBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JGLENBQUM7UUFqQ0Q7Ozs7OztXQU1HO1FBQ1csYUFBUSxHQUF0QjtZQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzVCLENBQUM7UUFuQkQ7Ozs7Ozs7V0FPRztRQUNZLGNBQVMsR0FBVyxDQUFDLENBQUM7UUFvQ3pDLFdBQUM7S0FBQSxBQTlDRCxJQThDQztJQUVRLG9CQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU1ldGEgfSBmcm9tIFwiLi9pbnRlcmZhY2UvbWV0YUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBEYXRhVHlwZSB9IGZyb20gXCIuL2VudW0vZGF0YVR5cGVFbnVtXCI7XHJcblxyXG4vL1R5cGUgZGVzY3JpYmluZyBhIEtleSBWYWx1ZSBwYWlyLCBhcyBpdCBpcyBhY2NjZXB0ZWQgYnkgdGhlIE1ldGEgb2JqZWN0IGNvbnN0cnVjdG9yLlxyXG50eXBlIEtleVZhbHVlID0ge2tleTogc3RyaW5nLCB2YWx1ZTphbnl9O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBNZXRhIGRhdGEgZm9yIGEgUGFja2FnZSBvYmplY3QuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIE1ldGFcclxuICogQGltcGxlbWVudHMge0lNZXRhfVxyXG4gKi9cclxuY2xhc3MgTWV0YSBpbXBsZW1lbnRzIElNZXRhe1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvdW50ZXIgdXNlZCB0byBnZW5lcmF0ZSBJRHMgZm9yIHBhY2thZ2VzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0YVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpZENvdW50ZXI6IG51bWJlciA9IDA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIElEIGZvciBhIFBhY2thZ2UuXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBNZXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlSUQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTWV0YS5pZENvdW50ZXIrKztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE11c3QgY29udGFpbiB0aGUgZGF0YSB0eXBlIG9mIHRoZSBkYXRhIGJlaW5nIGRlc2NyaWJlZC5cclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7RGF0YVR5cGV9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgZGF0YVR5cGU6IERhdGFUeXBlO1xyXG4gICAgXHJcbiAgICBbaW5kZXg6IHN0cmluZ106YW55O1xyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIE1ldGEuXHJcbiAgICAgKiBBIGRhdGEgdHlwZSBtdXN0IGJlIHByb3ZpZGVkLCB3aXRoIHRoZSBvcHRpb24gdG8gcHJvdmlkZSBhbnkgYW1vdW50IG9mIGFkZGl0aW9uYWwga2V5IHZhbHVlIHBhaXJzLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge0RhdGFUeXBlfSBkYXRhVHlwZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxLZXlWYWx1ZT59IFthZGRpdGlvbmFsTWV0YURhdGE9W11dXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0YVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihkYXRhVHlwZTogRGF0YVR5cGUsIGFkZGl0aW9uYWxNZXRhRGF0YTogQXJyYXk8S2V5VmFsdWU+ID0gW10pIHtcclxuICAgICAgICB0aGlzLmRhdGFUeXBlID0gZGF0YVR5cGU7XHJcbiAgICAgICAgYWRkaXRpb25hbE1ldGFEYXRhLmZvckVhY2gobWV0YURhdGEgPT4geyB0aGlzW21ldGFEYXRhLmtleV0gPSBtZXRhRGF0YS52YWx1ZTsgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IE1ldGEgfSJdfQ==