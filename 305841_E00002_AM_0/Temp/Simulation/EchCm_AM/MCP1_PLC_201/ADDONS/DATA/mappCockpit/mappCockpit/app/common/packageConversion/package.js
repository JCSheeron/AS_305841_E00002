define(["require", "exports", "./enum/dataTypeEnum"], function (require, exports, dataTypeEnum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The Package object as used within the ExportContainer.
     *
     * @export
     * @class Package
     * @implements {IPackage}
     */
    var Package = /** @class */ (function () {
        /**
         * Creates an instance of Package.
         * The meta data and data must be provided.
         *
         * @param {IMeta} meta
         * @param {*} data
         * @memberof Package
         */
        function Package(meta, data) {
            this.meta = meta;
            this.data = data;
        }
        /**
         * The reviver function to be used, when parsing a Package from JSON.
         *
         * @static
         * @param {IPackage} this
         * @param {*} key
         * @param {*} value
         * @returns {*}
         * @memberof Package
         */
        Package.reviver = function (key, value) {
            var newValue = value;
            if (key === "data") {
                if (this.meta !== undefined && this.meta.dataType == dataTypeEnum_1.DataType.DATE) {
                    newValue = new Date(value);
                }
            }
            return newValue;
        };
        /**
         * The replacer function to be used, when stringifying a Package to JSON.
         *
         * @static
         * @param {IPackage} this
         * @param {*} key
         * @param {*} value
         * @returns
         * @memberof Package
         */
        Package.replacer = function (key, value) {
            var newValue = value;
            if (key === "data") {
                if (this.meta.dataType == dataTypeEnum_1.DataType.DATE) {
                    newValue = (new Date(value)).toISOString();
                }
            }
            return newValue;
        };
        return Package;
    }());
    exports.Package = Package;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL3BhY2thZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBS0E7Ozs7OztPQU1HO0lBQ0g7UUFrQkk7Ozs7Ozs7V0FPRztRQUNILGlCQUFZLElBQVcsRUFBRSxJQUFTO1lBQzlCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLENBQUM7UUFFRDs7Ozs7Ozs7O1dBU0c7UUFDVyxlQUFPLEdBQXJCLFVBQXNDLEdBQVEsRUFBRSxLQUFVO1lBQ3RELElBQUksUUFBUSxHQUFRLEtBQUssQ0FBQTtZQUN6QixJQUFHLEdBQUcsS0FBSyxNQUFNLEVBQUM7Z0JBQ2QsSUFBRyxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSx1QkFBUSxDQUFDLElBQUksRUFBRTtvQkFDL0QsUUFBUSxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO2lCQUM3QjthQUNKO1lBRUQsT0FBTyxRQUFRLENBQUM7UUFDcEIsQ0FBQztRQUVEOzs7Ozs7Ozs7V0FTRztRQUNXLGdCQUFRLEdBQXRCLFVBQXVDLEdBQVcsRUFBRSxLQUFVO1lBQzFELElBQUksUUFBUSxHQUFRLEtBQUssQ0FBQztZQUMxQixJQUFHLEdBQUcsS0FBSyxNQUFNLEVBQUU7Z0JBQ2YsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSx1QkFBUSxDQUFDLElBQUksRUFBRTtvQkFDcEMsUUFBUSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztpQkFDOUM7YUFDSjtZQUVELE9BQU8sUUFBUSxDQUFDO1FBQ3BCLENBQUM7UUFDTCxjQUFDO0lBQUQsQ0FBQyxBQXhFRCxJQXdFQztJQUVPLDBCQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVBhY2thZ2UgfSBmcm9tIFwiLi9pbnRlcmZhY2UvcGFja2FnZUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJTWV0YSB9IGZyb20gXCIuL2ludGVyZmFjZS9tZXRhSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IERhdGFUeXBlIH0gZnJvbSBcIi4vZW51bS9kYXRhVHlwZUVudW1cIjtcclxuXHJcblxyXG4vKipcclxuICogVGhlIFBhY2thZ2Ugb2JqZWN0IGFzIHVzZWQgd2l0aGluIHRoZSBFeHBvcnRDb250YWluZXIuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIFBhY2thZ2VcclxuICogQGltcGxlbWVudHMge0lQYWNrYWdlfVxyXG4gKi9cclxuY2xhc3MgUGFja2FnZSBpbXBsZW1lbnRzIElQYWNrYWdle1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIG1ldGEgZGF0YSBkZXNjcmliaW5nIHRoZSBkYXRhIGZpZWxkLlxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtJTWV0YX1cclxuICAgICAqIEBtZW1iZXJvZiBQYWNrYWdlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtZXRhOiBJTWV0YTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBkYXRhIGZpZWxkIGNvbnRhaW5pbmcgdGhlIGRhdGEgc3RvcmVkIGluIHRoaXMgcGFja2FnZS5cclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBQYWNrYWdlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkYXRhOiBhbnk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFBhY2thZ2UuXHJcbiAgICAgKiBUaGUgbWV0YSBkYXRhIGFuZCBkYXRhIG11c3QgYmUgcHJvdmlkZWQuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7SU1ldGF9IG1ldGFcclxuICAgICAqIEBwYXJhbSB7Kn0gZGF0YVxyXG4gICAgICogQG1lbWJlcm9mIFBhY2thZ2VcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobWV0YTogSU1ldGEsIGRhdGE6IGFueSkge1xyXG4gICAgICAgIHRoaXMubWV0YSA9IG1ldGE7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSByZXZpdmVyIGZ1bmN0aW9uIHRvIGJlIHVzZWQsIHdoZW4gcGFyc2luZyBhIFBhY2thZ2UgZnJvbSBKU09OLlxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7SVBhY2thZ2V9IHRoaXNcclxuICAgICAqIEBwYXJhbSB7Kn0ga2V5XHJcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBQYWNrYWdlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcmV2aXZlcih0aGlzOiBJUGFja2FnZSwga2V5OiBhbnksIHZhbHVlOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIGxldCBuZXdWYWx1ZTogYW55ID0gdmFsdWVcclxuICAgICAgICBpZihrZXkgPT09IFwiZGF0YVwiKXtcclxuICAgICAgICAgICAgaWYodGhpcy5tZXRhICE9PSB1bmRlZmluZWQgJiYgdGhpcy5tZXRhLmRhdGFUeXBlID09IERhdGFUeXBlLkRBVEUpIHtcclxuICAgICAgICAgICAgICAgIG5ld1ZhbHVlID0gbmV3IERhdGUodmFsdWUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIG5ld1ZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHJlcGxhY2VyIGZ1bmN0aW9uIHRvIGJlIHVzZWQsIHdoZW4gc3RyaW5naWZ5aW5nIGEgUGFja2FnZSB0byBKU09OLlxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7SVBhY2thZ2V9IHRoaXNcclxuICAgICAqIEBwYXJhbSB7Kn0ga2V5XHJcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFBhY2thZ2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyByZXBsYWNlcih0aGlzOiBJUGFja2FnZSwga2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcclxuICAgICAgICBsZXQgbmV3VmFsdWU6IGFueSA9IHZhbHVlO1xyXG4gICAgICAgIGlmKGtleSA9PT0gXCJkYXRhXCIpIHtcclxuICAgICAgICAgICAgaWYodGhpcy5tZXRhLmRhdGFUeXBlID09IERhdGFUeXBlLkRBVEUpIHtcclxuICAgICAgICAgICAgICAgIG5ld1ZhbHVlID0gKG5ldyBEYXRlKHZhbHVlKSkudG9JU09TdHJpbmcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gbmV3VmFsdWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydHsgUGFja2FnZSB9Il19