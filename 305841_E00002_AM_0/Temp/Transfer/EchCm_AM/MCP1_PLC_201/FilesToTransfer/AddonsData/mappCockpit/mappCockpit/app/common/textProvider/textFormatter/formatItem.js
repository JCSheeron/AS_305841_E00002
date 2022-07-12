define(["require", "exports", "./editStringHelper", "./formatItemIdentifier", "./formatSpecification/formatSpecification"], function (require, exports, editStringHelper_1, formatItemIdentifier_1, formatSpecification_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Contains the different datasource types
     *
     * @export
     * @enum {number}
     */
    var DataSourceTypes;
    (function (DataSourceTypes) {
        DataSourceTypes[DataSourceTypes["external"] = 0] = "external";
        DataSourceTypes[DataSourceTypes["argument"] = 1] = "argument";
    })(DataSourceTypes = exports.DataSourceTypes || (exports.DataSourceTypes = {}));
    /**
     * This class holds the information of the format item.
     * Syntax: {<dataSource>|<formatSpecification>}
     *
     * @export
     * @class FormatItem
     */
    var FormatItem = /** @class */ (function () {
        /**
         * Creates an instance of FormatItem.
         *
         * @param {string} rawItem
         * @param {FormatterInputArgumentList} [argumentList]
         * @memberof FormatItem
         */
        function FormatItem(rawItem, argumentList) {
            // get dataSource type
            this._dataSourceType = this.getDataSourceType(rawItem[0]);
            // remove the data source identifier
            rawItem = this.removeIdentifiers(rawItem);
            this._dataSource = rawItem;
            // get default values
            this._formatSpecification = new formatSpecification_1.FormatSpecification();
            // search for a format specification "|"
            var indexOfFormatSpecification = rawItem.indexOf(formatItemIdentifier_1.FormatItemIdentifier.formatSpecification);
            // check if a format specification is found
            if (editStringHelper_1.EditStringHelper.indexIsValid(indexOfFormatSpecification)) {
                // get the string of the format specification
                var textFormatSpecification = rawItem.substring(indexOfFormatSpecification + 1, rawItem.length);
                // convert the format specification string to a IFormatSpecification
                this._formatSpecification = editStringHelper_1.EditStringHelper.getFormatSpecificationFromText(textFormatSpecification, argumentList);
                // get string index for the argument list
                this._dataSource = rawItem.substring(0, indexOfFormatSpecification);
            }
        }
        Object.defineProperty(FormatItem.prototype, "dataSource", {
            /**
             * get the string which refers to a data source
             *
             * @readonly
             * @type {string}
             * @memberof FormatItem
             */
            get: function () {
                return this._dataSource;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FormatItem.prototype, "formatSpecification", {
            /**
             * get the format specification of the format item
             *
             * @readonly
             * @type {IFormatSpecification}
             * @memberof FormatItem
             */
            get: function () {
                return this._formatSpecification;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FormatItem.prototype, "dataSourceType", {
            /**
             * get the type of the data source
             *
             * @readonly
             * @type {DataSourceTypes}
             * @memberof FormatItem
             */
            get: function () {
                return this._dataSourceType;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Checks if the processed format item need to be processed again for inner format items
         *
         * @private
         * @return {*}  {boolean}
         * @memberof FormatItem
         */
        FormatItem.prototype.isRecursive = function () {
            // add recursive data sources with or || if there are more 
            if (this._dataSourceType == DataSourceTypes.external) {
                return true;
            }
            else {
                return false;
            }
        };
        /**
         * get the type of the data source
         *
         * @private
         * @param {string} identifier
         * @return {*}  {DataSourceType}
         * @memberof FormatItem
         */
        FormatItem.prototype.getDataSourceType = function (identifier) {
            // check if it is a external data source item ("$")
            if (identifier === formatItemIdentifier_1.FormatItemIdentifier.externalDataSource) {
                return DataSourceTypes.external;
            }
            else {
                return DataSourceTypes.argument;
            }
        };
        /**
         * remove the datasource identifier from the raw Item
         *
         * @private
         * @param {string} rawItem
         * @return {*}  {string}
         * @memberof FormatItem
         */
        FormatItem.prototype.removeIdentifiers = function (rawItem) {
            if (this._dataSourceType === DataSourceTypes.external) {
                return rawItem.substring(1, rawItem.length);
            }
            else {
                return rawItem;
            }
        };
        return FormatItem;
    }());
    exports.FormatItem = FormatItem;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0SXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3RleHRQcm92aWRlci90ZXh0Rm9ybWF0dGVyL2Zvcm1hdEl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBTUE7Ozs7O09BS0c7SUFDSCxJQUFZLGVBR1g7SUFIRCxXQUFZLGVBQWU7UUFDdkIsNkRBQVEsQ0FBQTtRQUNSLDZEQUFRLENBQUE7SUFDWixDQUFDLEVBSFcsZUFBZSxHQUFmLHVCQUFlLEtBQWYsdUJBQWUsUUFHMUI7SUFFRDs7Ozs7O09BTUc7SUFDSDtRQU1JOzs7Ozs7V0FNRztRQUNILG9CQUFvQixPQUFlLEVBQUUsWUFBMEM7WUFFM0Usc0JBQXNCO1lBQ3RCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTFELG9DQUFvQztZQUNwQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDO1lBRTNCLHFCQUFxQjtZQUNyQixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSx5Q0FBbUIsRUFBRSxDQUFDO1lBQ3RELHdDQUF3QztZQUN4QyxJQUFJLDBCQUEwQixHQUFXLE9BQU8sQ0FBQyxPQUFPLENBQUMsMkNBQW9CLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUNuRywyQ0FBMkM7WUFDM0MsSUFBRyxtQ0FBZ0IsQ0FBQyxZQUFZLENBQUMsMEJBQTBCLENBQUMsRUFBRTtnQkFDMUQsNkNBQTZDO2dCQUM3QyxJQUFJLHVCQUF1QixHQUFXLE9BQU8sQ0FBQyxTQUFTLENBQUMsMEJBQTBCLEdBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEcsb0VBQW9FO2dCQUNwRSxJQUFJLENBQUMsb0JBQW9CLEdBQUcsbUNBQWdCLENBQUMsOEJBQThCLENBQUMsdUJBQXVCLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQ25ILHlDQUF5QztnQkFDekMsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO2FBQ3ZFO1FBQ0wsQ0FBQztRQVNELHNCQUFXLGtDQUFVO1lBUHJCOzs7Ozs7ZUFNRztpQkFDSDtnQkFDSSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDNUIsQ0FBQzs7O1dBQUE7UUFTRCxzQkFBVywyQ0FBbUI7WUFQOUI7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDO1lBQ3JDLENBQUM7OztXQUFBO1FBU0Qsc0JBQVcsc0NBQWM7WUFQekI7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztZQUNoQyxDQUFDOzs7V0FBQTtRQUVEOzs7Ozs7V0FNRztRQUNJLGdDQUFXLEdBQWxCO1lBQ0ksMkRBQTJEO1lBQzNELElBQUcsSUFBSSxDQUFDLGVBQWUsSUFBSSxlQUFlLENBQUMsUUFBUSxFQUFFO2dCQUNqRCxPQUFPLElBQUksQ0FBQzthQUNmO2lCQUNJO2dCQUNELE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSyxzQ0FBaUIsR0FBekIsVUFBMEIsVUFBa0I7WUFDeEMsbURBQW1EO1lBQ25ELElBQUcsVUFBVSxLQUFLLDJDQUFvQixDQUFDLGtCQUFrQixFQUFFO2dCQUN2RCxPQUFPLGVBQWUsQ0FBQyxRQUFRLENBQUM7YUFDbkM7aUJBQ0k7Z0JBQ0QsT0FBTyxlQUFlLENBQUMsUUFBUSxDQUFDO2FBQ25DO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSyxzQ0FBaUIsR0FBekIsVUFBMEIsT0FBZTtZQUNyQyxJQUFHLElBQUksQ0FBQyxlQUFlLEtBQUssZUFBZSxDQUFDLFFBQVEsRUFBRTtnQkFDbEQsT0FBTyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDL0M7aUJBQ0k7Z0JBQ0QsT0FBTyxPQUFPLENBQUM7YUFDbEI7UUFDTCxDQUFDO1FBQ0wsaUJBQUM7SUFBRCxDQUFDLEFBekhELElBeUhDO0lBekhZLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUZvcm1hdFNwZWNpZmljYXRpb24gfSBmcm9tIFwiLi4vaW50ZXJmYWNlL2Zvcm1hdFNwZWNpZmljYXRpb25JbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgRWRpdFN0cmluZ0hlbHBlciB9IGZyb20gXCIuL2VkaXRTdHJpbmdIZWxwZXJcIjtcclxuaW1wb3J0IHsgRm9ybWF0SXRlbUlkZW50aWZpZXIgfSBmcm9tIFwiLi9mb3JtYXRJdGVtSWRlbnRpZmllclwiO1xyXG5pbXBvcnQgeyBGb3JtYXRTcGVjaWZpY2F0aW9uIH0gZnJvbSBcIi4vZm9ybWF0U3BlY2lmaWNhdGlvbi9mb3JtYXRTcGVjaWZpY2F0aW9uXCI7XHJcbmltcG9ydCB7IEZvcm1hdHRlcklucHV0QXJndW1lbnRMaXN0IH0gZnJvbSBcIi4vZm9ybWF0dGVySW5wdXRBcmd1bWVudHMvZm9ybWF0dGVySW5wdXRBcmd1bWVudExpc3RcIjtcclxuXHJcbi8qKlxyXG4gKiBDb250YWlucyB0aGUgZGlmZmVyZW50IGRhdGFzb3VyY2UgdHlwZXNcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAZW51bSB7bnVtYmVyfVxyXG4gKi9cclxuZXhwb3J0IGVudW0gRGF0YVNvdXJjZVR5cGVze1xyXG4gICAgZXh0ZXJuYWwsXHJcbiAgICBhcmd1bWVudFxyXG59XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBob2xkcyB0aGUgaW5mb3JtYXRpb24gb2YgdGhlIGZvcm1hdCBpdGVtLiBcclxuICogU3ludGF4OiB7PGRhdGFTb3VyY2U+fDxmb3JtYXRTcGVjaWZpY2F0aW9uPn1cclxuICogXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIEZvcm1hdEl0ZW1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBGb3JtYXRJdGVtIHtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfZGF0YVNvdXJjZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfZm9ybWF0U3BlY2lmaWNhdGlvbjogSUZvcm1hdFNwZWNpZmljYXRpb247XHJcbiAgICBwcml2YXRlIF9kYXRhU291cmNlVHlwZTogRGF0YVNvdXJjZVR5cGVzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBGb3JtYXRJdGVtLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmF3SXRlbVxyXG4gICAgICogQHBhcmFtIHtGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50TGlzdH0gW2FyZ3VtZW50TGlzdF1cclxuICAgICAqIEBtZW1iZXJvZiBGb3JtYXRJdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciAocmF3SXRlbTogc3RyaW5nLCBhcmd1bWVudExpc3QgPzogRm9ybWF0dGVySW5wdXRBcmd1bWVudExpc3QpIHtcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gZ2V0IGRhdGFTb3VyY2UgdHlwZVxyXG4gICAgICAgIHRoaXMuX2RhdGFTb3VyY2VUeXBlID0gdGhpcy5nZXREYXRhU291cmNlVHlwZShyYXdJdGVtWzBdKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyByZW1vdmUgdGhlIGRhdGEgc291cmNlIGlkZW50aWZpZXJcclxuICAgICAgICByYXdJdGVtID0gdGhpcy5yZW1vdmVJZGVudGlmaWVycyhyYXdJdGVtKTtcclxuICAgICAgICB0aGlzLl9kYXRhU291cmNlID0gcmF3SXRlbTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBnZXQgZGVmYXVsdCB2YWx1ZXNcclxuICAgICAgICB0aGlzLl9mb3JtYXRTcGVjaWZpY2F0aW9uID0gbmV3IEZvcm1hdFNwZWNpZmljYXRpb24oKTsgICAgICAgIFxyXG4gICAgICAgIC8vIHNlYXJjaCBmb3IgYSBmb3JtYXQgc3BlY2lmaWNhdGlvbiBcInxcIlxyXG4gICAgICAgIGxldCBpbmRleE9mRm9ybWF0U3BlY2lmaWNhdGlvbjogbnVtYmVyID0gcmF3SXRlbS5pbmRleE9mKEZvcm1hdEl0ZW1JZGVudGlmaWVyLmZvcm1hdFNwZWNpZmljYXRpb24pOyAgICAgICAgICAgIFxyXG4gICAgICAgIC8vIGNoZWNrIGlmIGEgZm9ybWF0IHNwZWNpZmljYXRpb24gaXMgZm91bmRcclxuICAgICAgICBpZihFZGl0U3RyaW5nSGVscGVyLmluZGV4SXNWYWxpZChpbmRleE9mRm9ybWF0U3BlY2lmaWNhdGlvbikpIHtcclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBzdHJpbmcgb2YgdGhlIGZvcm1hdCBzcGVjaWZpY2F0aW9uXHJcbiAgICAgICAgICAgIGxldCB0ZXh0Rm9ybWF0U3BlY2lmaWNhdGlvbjogc3RyaW5nID0gcmF3SXRlbS5zdWJzdHJpbmcoaW5kZXhPZkZvcm1hdFNwZWNpZmljYXRpb24rMSwgcmF3SXRlbS5sZW5ndGgpO1xyXG4gICAgICAgICAgICAvLyBjb252ZXJ0IHRoZSBmb3JtYXQgc3BlY2lmaWNhdGlvbiBzdHJpbmcgdG8gYSBJRm9ybWF0U3BlY2lmaWNhdGlvblxyXG4gICAgICAgICAgICB0aGlzLl9mb3JtYXRTcGVjaWZpY2F0aW9uID0gRWRpdFN0cmluZ0hlbHBlci5nZXRGb3JtYXRTcGVjaWZpY2F0aW9uRnJvbVRleHQodGV4dEZvcm1hdFNwZWNpZmljYXRpb24sIGFyZ3VtZW50TGlzdCk7XHJcbiAgICAgICAgICAgIC8vIGdldCBzdHJpbmcgaW5kZXggZm9yIHRoZSBhcmd1bWVudCBsaXN0XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGFTb3VyY2UgPSByYXdJdGVtLnN1YnN0cmluZygwLCBpbmRleE9mRm9ybWF0U3BlY2lmaWNhdGlvbik7XHJcbiAgICAgICAgfSAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldCB0aGUgc3RyaW5nIHdoaWNoIHJlZmVycyB0byBhIGRhdGEgc291cmNlXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIEZvcm1hdEl0ZW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBkYXRhU291cmNlICgpIDogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldCB0aGUgZm9ybWF0IHNwZWNpZmljYXRpb24gb2YgdGhlIGZvcm1hdCBpdGVtXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7SUZvcm1hdFNwZWNpZmljYXRpb259XHJcbiAgICAgKiBAbWVtYmVyb2YgRm9ybWF0SXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGZvcm1hdFNwZWNpZmljYXRpb24gKCkgOiBJRm9ybWF0U3BlY2lmaWNhdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Zvcm1hdFNwZWNpZmljYXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgdGhlIHR5cGUgb2YgdGhlIGRhdGEgc291cmNlXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7RGF0YVNvdXJjZVR5cGVzfVxyXG4gICAgICogQG1lbWJlcm9mIEZvcm1hdEl0ZW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBkYXRhU291cmNlVHlwZSAoKSA6IERhdGFTb3VyY2VUeXBlcyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2VUeXBlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHRoZSBwcm9jZXNzZWQgZm9ybWF0IGl0ZW0gbmVlZCB0byBiZSBwcm9jZXNzZWQgYWdhaW4gZm9yIGlubmVyIGZvcm1hdCBpdGVtc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuIHsqfSAge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgRm9ybWF0SXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaXNSZWN1cnNpdmUoKSA6IGJvb2xlYW4ge1xyXG4gICAgICAgIC8vIGFkZCByZWN1cnNpdmUgZGF0YSBzb3VyY2VzIHdpdGggb3IgfHwgaWYgdGhlcmUgYXJlIG1vcmUgXHJcbiAgICAgICAgaWYodGhpcy5fZGF0YVNvdXJjZVR5cGUgPT0gRGF0YVNvdXJjZVR5cGVzLmV4dGVybmFsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldCB0aGUgdHlwZSBvZiB0aGUgZGF0YSBzb3VyY2VcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkZW50aWZpZXJcclxuICAgICAqIEByZXR1cm4geyp9ICB7RGF0YVNvdXJjZVR5cGV9XHJcbiAgICAgKiBAbWVtYmVyb2YgRm9ybWF0SXRlbVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldERhdGFTb3VyY2VUeXBlKGlkZW50aWZpZXI6IHN0cmluZykgOiBEYXRhU291cmNlVHlwZXMge1xyXG4gICAgICAgIC8vIGNoZWNrIGlmIGl0IGlzIGEgZXh0ZXJuYWwgZGF0YSBzb3VyY2UgaXRlbSAoXCIkXCIpXHJcbiAgICAgICAgaWYoaWRlbnRpZmllciA9PT0gRm9ybWF0SXRlbUlkZW50aWZpZXIuZXh0ZXJuYWxEYXRhU291cmNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBEYXRhU291cmNlVHlwZXMuZXh0ZXJuYWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gRGF0YVNvdXJjZVR5cGVzLmFyZ3VtZW50O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlbW92ZSB0aGUgZGF0YXNvdXJjZSBpZGVudGlmaWVyIGZyb20gdGhlIHJhdyBJdGVtXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByYXdJdGVtXHJcbiAgICAgKiBAcmV0dXJuIHsqfSAge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBGb3JtYXRJdGVtXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVtb3ZlSWRlbnRpZmllcnMocmF3SXRlbTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBpZih0aGlzLl9kYXRhU291cmNlVHlwZSA9PT0gRGF0YVNvdXJjZVR5cGVzLmV4dGVybmFsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByYXdJdGVtLnN1YnN0cmluZygxLCByYXdJdGVtLmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gcmF3SXRlbTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0gIl19