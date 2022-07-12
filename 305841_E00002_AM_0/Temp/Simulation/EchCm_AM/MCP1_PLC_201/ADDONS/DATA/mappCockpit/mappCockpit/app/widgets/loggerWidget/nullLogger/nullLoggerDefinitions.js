define(["require", "exports", "./../loggerColumnDefinition"], function (require, exports, loggerColumnDefinition_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NullLoggerDefinitions = /** @class */ (function () {
        function NullLoggerDefinitions() {
            /**
             * Column id definitions
             * For this definitions properties must be available in the LoggerEntry interface
             *
             * @private
             * @memberof DriveLogDefinitions
             */
            this.columnIdRecordNumber = "recordNumber";
        }
        /**
         * Returns the column definition for this logger
         *
         * @returns {Array<LoggerColumnDefinition>}
         * @memberof NullLoggerDefinitions
         */
        NullLoggerDefinitions.prototype.getColumnDefinitions = function () {
            var columnDefinitions = new Array();
            columnDefinitions.push(new loggerColumnDefinition_1.LoggerColumnDefinition(this.columnIdRecordNumber, "Index", 40));
            return columnDefinitions;
        };
        /**
          * Returns the html representation for the cell with the given columnId
          *
          * @param {string} columnId
          * @param {ILoggerEntry} cellItem
          * @returns {string}
          * @memberof NullLoggerDefinitions
          */
        NullLoggerDefinitions.prototype.getCellData = function (columnId, cellItem) {
            var item = cellItem;
            if (columnId == this.columnIdRecordNumber) {
                return item.recordNumber.toString();
            }
            console.error("CellData not implemented for column id: " + columnId);
            return "";
        };
        /**
         * Returns the template for the tooltip
         *
         * @returns {string}
         * @memberof NullLoggerDefinitions
         */
        NullLoggerDefinitions.prototype.getCellTooltipTemplateData = function () {
            return "<script type=\"text/x-jsrender\" id=\"defaultTooltipTemplate\">\n            <table>\n                <tr>\n                    <td style='padding:5px;font-weight: bold;'>\n                        Task ID\n                    </td>\n                    <td style='padding:5px;'>\n                        : {{:#data['record']['recordNumber']}}\n                    </td>\n                </tr>\n            </table>\n        </script>";
        };
        return NullLoggerDefinitions;
    }());
    exports.NullLoggerDefinitions = NullLoggerDefinitions;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVsbExvZ2dlckRlZmluaXRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2xvZ2dlcldpZGdldC9udWxsTG9nZ2VyL251bGxMb2dnZXJEZWZpbml0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFLQTtRQUFBO1lBRUk7Ozs7OztlQU1HO1lBQ2MseUJBQW9CLEdBQUcsY0FBYyxDQUFDO1FBbUQzRCxDQUFDO1FBakRHOzs7OztXQUtHO1FBQ0ksb0RBQW9CLEdBQTNCO1lBQ0ksSUFBSSxpQkFBaUIsR0FBRyxJQUFJLEtBQUssRUFBMEIsQ0FBQztZQUM1RCxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSwrQ0FBc0IsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDMUYsT0FBTyxpQkFBaUIsQ0FBQztRQUM3QixDQUFDO1FBRUQ7Ozs7Ozs7WUFPSTtRQUNHLDJDQUFXLEdBQWxCLFVBQW1CLFFBQWdCLEVBQUUsUUFBc0I7WUFDdkQsSUFBSSxJQUFJLEdBQUcsUUFBNEIsQ0FBQztZQUN4QyxJQUFJLFFBQVEsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUU7Z0JBQ25DLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUMzQztZQUNELE9BQU8sQ0FBQyxLQUFLLENBQUMsMENBQTBDLEdBQUcsUUFBUSxDQUFDLENBQUM7WUFDckUsT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSSwwREFBMEIsR0FBakM7WUFDSSxPQUFPLG1iQVdHLENBQUM7UUFDZixDQUFDO1FBQ0wsNEJBQUM7SUFBRCxDQUFDLEFBNURELElBNERDO0lBNURZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElMb2dnZXJEZWZpbml0aW9ucyB9IGZyb20gXCIuLy4uL2ludGVyZmFjZXMvbG9nZ2VyRGVmaW5pdGlvbnNJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgTG9nZ2VyQ29sdW1uRGVmaW5pdGlvbiB9IGZyb20gXCIuLy4uL2xvZ2dlckNvbHVtbkRlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgSUxvZ2dlckVudHJ5IH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvbG9nZ2VyRW50cnlcIjtcclxuaW1wb3J0IHsgSU51bGxMb2dnZXJFbnRyeSB9IGZyb20gXCIuL2ludGVyZmFjZXMvbnVsbExvZ2dlckVudHJ5SW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTnVsbExvZ2dlckRlZmluaXRpb25zIGltcGxlbWVudHMgSUxvZ2dlckRlZmluaXRpb25ze1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIENvbHVtbiBpZCBkZWZpbml0aW9uc1xyXG4gICAgICogRm9yIHRoaXMgZGVmaW5pdGlvbnMgcHJvcGVydGllcyBtdXN0IGJlIGF2YWlsYWJsZSBpbiB0aGUgTG9nZ2VyRW50cnkgaW50ZXJmYWNlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RlZmluaXRpb25zXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgY29sdW1uSWRSZWNvcmROdW1iZXIgPSBcInJlY29yZE51bWJlclwiO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGNvbHVtbiBkZWZpbml0aW9uIGZvciB0aGlzIGxvZ2dlclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxMb2dnZXJDb2x1bW5EZWZpbml0aW9uPn1cclxuICAgICAqIEBtZW1iZXJvZiBOdWxsTG9nZ2VyRGVmaW5pdGlvbnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldENvbHVtbkRlZmluaXRpb25zKCk6IEFycmF5PExvZ2dlckNvbHVtbkRlZmluaXRpb24+e1xyXG4gICAgICAgIGxldCBjb2x1bW5EZWZpbml0aW9ucyA9IG5ldyBBcnJheTxMb2dnZXJDb2x1bW5EZWZpbml0aW9uPigpO1xyXG4gICAgICAgIGNvbHVtbkRlZmluaXRpb25zLnB1c2gobmV3IExvZ2dlckNvbHVtbkRlZmluaXRpb24odGhpcy5jb2x1bW5JZFJlY29yZE51bWJlciwgXCJJbmRleFwiLCA0MCkpXHJcbiAgICAgICAgcmV0dXJuIGNvbHVtbkRlZmluaXRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICAqIFJldHVybnMgdGhlIGh0bWwgcmVwcmVzZW50YXRpb24gZm9yIHRoZSBjZWxsIHdpdGggdGhlIGdpdmVuIGNvbHVtbklkXHJcbiAgICAgICpcclxuICAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29sdW1uSWRcclxuICAgICAgKiBAcGFyYW0ge0lMb2dnZXJFbnRyeX0gY2VsbEl0ZW1cclxuICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICAqIEBtZW1iZXJvZiBOdWxsTG9nZ2VyRGVmaW5pdGlvbnNcclxuICAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRDZWxsRGF0YShjb2x1bW5JZDogc3RyaW5nLCBjZWxsSXRlbTogSUxvZ2dlckVudHJ5KTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgaXRlbSA9IGNlbGxJdGVtIGFzIElOdWxsTG9nZ2VyRW50cnk7XHJcbiAgICAgICAgaWYgKGNvbHVtbklkID09IHRoaXMuY29sdW1uSWRSZWNvcmROdW1iZXIpIHsgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5yZWNvcmROdW1iZXIudG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkNlbGxEYXRhIG5vdCBpbXBsZW1lbnRlZCBmb3IgY29sdW1uIGlkOiBcIiArIGNvbHVtbklkKTtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH0gICAgXHJcbiAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0ZW1wbGF0ZSBmb3IgdGhlIHRvb2x0aXBcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIE51bGxMb2dnZXJEZWZpbml0aW9uc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Q2VsbFRvb2x0aXBUZW1wbGF0ZURhdGEoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBgPHNjcmlwdCB0eXBlPVwidGV4dC94LWpzcmVuZGVyXCIgaWQ9XCJkZWZhdWx0VG9vbHRpcFRlbXBsYXRlXCI+XHJcbiAgICAgICAgICAgIDx0YWJsZT5cclxuICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9J3BhZGRpbmc6NXB4O2ZvbnQtd2VpZ2h0OiBib2xkOyc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRhc2sgSURcclxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT0ncGFkZGluZzo1cHg7Jz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgOiB7ezojZGF0YVsncmVjb3JkJ11bJ3JlY29yZE51bWJlciddfX1cclxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICA8L3NjcmlwdD5gO1xyXG4gICAgfVxyXG59Il19