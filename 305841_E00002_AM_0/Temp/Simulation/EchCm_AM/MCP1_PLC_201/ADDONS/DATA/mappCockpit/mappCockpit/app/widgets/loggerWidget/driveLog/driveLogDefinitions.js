define(["require", "exports", "../loggerColumnDefinition"], function (require, exports, loggerColumnDefinition_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DriveLogDefinitions = /** @class */ (function () {
        function DriveLogDefinitions() {
            /**
             * Column id definitions
             * For this definitions properties must be available in the LoggerEntry interface
             *
             * @private
             * @memberof DriveLogDefinitions
             */
            this.columnIdRecordNumber = "recordNumber";
            this.columnIdTime = "time";
            this.columnIdModule = "module";
            this.columnIdObjectName = "objectName";
            this.columnIdDescriptionRawData = "descriptionRawData";
            this.columnIdResponseTime = "responseTime";
        }
        /**
         * Returns the column definition for the network command trace logger
         *
         * @returns {Array<LoggerColumnDefinition>}
         * @memberof DriveLogDefinitions
         */
        DriveLogDefinitions.prototype.getColumnDefinitions = function () {
            var columnDefinitions = new Array();
            columnDefinitions.push(new loggerColumnDefinition_1.LoggerColumnDefinition(this.columnIdRecordNumber, "No.", 40, loggerColumnDefinition_1.FieldType.Numeric));
            columnDefinitions.push(new loggerColumnDefinition_1.LoggerColumnDefinition(this.columnIdTime, "Time [s]", 60, loggerColumnDefinition_1.FieldType.Numeric, true));
            columnDefinitions.push(new loggerColumnDefinition_1.LoggerColumnDefinition(this.columnIdModule, "Module (Element)", 120, loggerColumnDefinition_1.FieldType.String, true));
            columnDefinitions.push(new loggerColumnDefinition_1.LoggerColumnDefinition(this.columnIdObjectName, "Appl. Object", 90, loggerColumnDefinition_1.FieldType.String, true));
            columnDefinitions.push(new loggerColumnDefinition_1.LoggerColumnDefinition(this.columnIdDescriptionRawData, "Drive Parameter Data", 320, loggerColumnDefinition_1.FieldType.String, true, "descriptionTooltipTemplate"));
            columnDefinitions.push(new loggerColumnDefinition_1.LoggerColumnDefinition(this.columnIdResponseTime, "Resp. Time [ms]", 70, loggerColumnDefinition_1.FieldType.Numeric, true));
            return columnDefinitions;
        };
        /**
         * Returns the html representation for the cell with the given columnId
         *
         * @param {string} columnId
         * @param {Array<string>} values
         * @returns {string}
         * @memberof DriveLogDefinitions
         */
        DriveLogDefinitions.prototype.getCellData = function (columnId, cellItem) {
            var item = cellItem;
            if (columnId == this.columnIdRecordNumber) {
                return "&nbsp;&nbsp;&nbsp;&nbsp;" + item.recordNumber.toString();
            }
            else if (columnId == this.columnIdTime) {
                return item.time;
            }
            else if (columnId == this.columnIdModule) {
                return item.module;
            }
            else if (columnId == this.columnIdObjectName) {
                return item.objectName;
            }
            else if (columnId == this.columnIdDescriptionRawData) {
                var imagePath = "widgets/loggerWidget/style/images/" + item.getDescriptionIconId() + ".svg";
                return "<div style=\"white-space: nowrap;\">\n                <div style='position: relative; top:  2px; display: inline-block; width: 30px;'><img height=\"22\" alt=\" \" src=\"" + imagePath + "\"></div>\n                <div style='position: relative; top: -5px; display: inline-block; width: 220px;'>" + item.getDescriptionTextFormated() + "</div>\n                <div style='position: relative; top: -5px; display: inline-block; width: 230px;'>" + item.getDescriptionValueWithUnitFormated() + "&nbsp;</div>\n                <div style='position: relative; top: -5px; display: inline-block;'>" + item.getDescriptionErrorFormated() + "</div>\n            </div>";
            }
            else if (columnId == this.columnIdResponseTime) {
                return item.responseTime;
            }
            console.error("CellData not implemented for column id: " + columnId);
            return "";
        };
        /**
         * Returns the template for the tooltip
         *
         * @returns {string}
         * @memberof DriveLogDefinitions
         */
        DriveLogDefinitions.prototype.getCellTooltipTemplateData = function () {
            return "<script type=\"text/x-jsrender\" id=\"defaultTooltipTemplate\">\n                </script>\n                <script type=\"text/x-jsrender\" id=\"descriptionTooltipTemplate\">\n                    <div class=\"tooltipBox\">\n                        {{:#data['record']['descriptionTooltip']}}\n                    </div>\n                </script>";
        };
        return DriveLogDefinitions;
    }());
    exports.DriveLogDefinitions = DriveLogDefinitions;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJpdmVMb2dEZWZpbml0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9sb2dnZXJXaWRnZXQvZHJpdmVMb2cvZHJpdmVMb2dEZWZpbml0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFLQTtRQUFBO1lBRUk7Ozs7OztlQU1HO1lBQ2MseUJBQW9CLEdBQUcsY0FBYyxDQUFDO1lBQ3RDLGlCQUFZLEdBQUcsTUFBTSxDQUFDO1lBQ3RCLG1CQUFjLEdBQUcsUUFBUSxDQUFDO1lBQzFCLHVCQUFrQixHQUFHLFlBQVksQ0FBQztZQUNsQywrQkFBMEIsR0FBRyxvQkFBb0IsQ0FBQztZQUNsRCx5QkFBb0IsR0FBRyxjQUFjLENBQUM7UUF3RTNELENBQUM7UUF0RUc7Ozs7O1dBS0c7UUFDSSxrREFBb0IsR0FBM0I7WUFDSSxJQUFJLGlCQUFpQixHQUFHLElBQUksS0FBSyxFQUEwQixDQUFDO1lBQzVELGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLCtDQUFzQixDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLGtDQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUM1RyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSwrQ0FBc0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsa0NBQVMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMvRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSwrQ0FBc0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLGtCQUFrQixFQUFFLEdBQUcsRUFBRSxrQ0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3pILGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLCtDQUFzQixDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFFLGtDQUFTLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDeEgsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksK0NBQXNCLENBQUMsSUFBSSxDQUFDLDBCQUEwQixFQUFFLHNCQUFzQixFQUFFLEdBQUcsRUFBRSxrQ0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsNEJBQTRCLENBQUMsQ0FBQyxDQUFDO1lBQ3ZLLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLCtDQUFzQixDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxpQkFBaUIsRUFBRSxFQUFFLEVBQUUsa0NBQVMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM5SCxPQUFPLGlCQUFpQixDQUFDO1FBQzdCLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0kseUNBQVcsR0FBbEIsVUFBbUIsUUFBZ0IsRUFBRSxRQUFzQjtZQUN2RCxJQUFJLElBQUksR0FBRyxRQUEwQixDQUFDO1lBQ3RDLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtnQkFDdkMsT0FBTywwQkFBMEIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ3BFO2lCQUNJLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ3BDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQzthQUNwQjtpQkFDSSxJQUFJLFFBQVEsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUN0QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDdEI7aUJBQ0ksSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO2dCQUMxQyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7YUFDMUI7aUJBQ0ksSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDLDBCQUEwQixFQUFFO2dCQUM5QyxJQUFJLFNBQVMsR0FBRyxvQ0FBb0MsR0FBRyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxNQUFNLENBQUM7Z0JBQzVGLE9BQU8sMktBQ3dHLEdBQUUsU0FBUyxHQUFHLDhHQUMzQyxHQUFFLElBQUksQ0FBQywwQkFBMEIsRUFBRSxHQUFHLDJHQUN0QyxHQUFFLElBQUksQ0FBQyxtQ0FBbUMsRUFBRSxHQUFHLG1HQUM3RCxHQUFFLElBQUksQ0FBQywyQkFBMkIsRUFBRSxHQUFHLDRCQUN4RyxDQUFDO2FBQ1g7aUJBQ0ksSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFO2dCQUM1QyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7YUFDNUI7WUFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLDBDQUEwQyxHQUFHLFFBQVEsQ0FBQyxDQUFDO1lBQ3JFLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ksd0RBQTBCLEdBQWpDO1lBQ0ksT0FBTyw0VkFNVyxDQUFDO1FBQ3ZCLENBQUM7UUFDTCwwQkFBQztJQUFELENBQUMsQUF0RkQsSUFzRkM7SUF0Rlksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUxvZ2dlckRlZmluaXRpb25zIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvbG9nZ2VyRGVmaW5pdGlvbnNJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgTG9nZ2VyQ29sdW1uRGVmaW5pdGlvbiwgRmllbGRUeXBlIH0gZnJvbSBcIi4uL2xvZ2dlckNvbHVtbkRlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgSUxvZ2dlckVudHJ5IH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvbG9nZ2VyRW50cnlcIjtcclxuaW1wb3J0IHsgSURyaXZlTG9nRW50cnkgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2RyaXZlTG9nRW50cnlJbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBEcml2ZUxvZ0RlZmluaXRpb25zIGltcGxlbWVudHMgSUxvZ2dlckRlZmluaXRpb25ze1xyXG4gICBcclxuICAgIC8qKlxyXG4gICAgICogQ29sdW1uIGlkIGRlZmluaXRpb25zXHJcbiAgICAgKiBGb3IgdGhpcyBkZWZpbml0aW9ucyBwcm9wZXJ0aWVzIG11c3QgYmUgYXZhaWxhYmxlIGluIHRoZSBMb2dnZXJFbnRyeSBpbnRlcmZhY2VcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRGVmaW5pdGlvbnNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBjb2x1bW5JZFJlY29yZE51bWJlciA9IFwicmVjb3JkTnVtYmVyXCI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNvbHVtbklkVGltZSA9IFwidGltZVwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBjb2x1bW5JZE1vZHVsZSA9IFwibW9kdWxlXCI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNvbHVtbklkT2JqZWN0TmFtZSA9IFwib2JqZWN0TmFtZVwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBjb2x1bW5JZERlc2NyaXB0aW9uUmF3RGF0YSA9IFwiZGVzY3JpcHRpb25SYXdEYXRhXCI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNvbHVtbklkUmVzcG9uc2VUaW1lID0gXCJyZXNwb25zZVRpbWVcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGNvbHVtbiBkZWZpbml0aW9uIGZvciB0aGUgbmV0d29yayBjb21tYW5kIHRyYWNlIGxvZ2dlclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxMb2dnZXJDb2x1bW5EZWZpbml0aW9uPn1cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RlZmluaXRpb25zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRDb2x1bW5EZWZpbml0aW9ucygpOiBBcnJheTxMb2dnZXJDb2x1bW5EZWZpbml0aW9uPntcclxuICAgICAgICBsZXQgY29sdW1uRGVmaW5pdGlvbnMgPSBuZXcgQXJyYXk8TG9nZ2VyQ29sdW1uRGVmaW5pdGlvbj4oKTtcclxuICAgICAgICBjb2x1bW5EZWZpbml0aW9ucy5wdXNoKG5ldyBMb2dnZXJDb2x1bW5EZWZpbml0aW9uKHRoaXMuY29sdW1uSWRSZWNvcmROdW1iZXIsIFwiTm8uXCIsIDQwLCBGaWVsZFR5cGUuTnVtZXJpYykpO1xyXG4gICAgICAgIGNvbHVtbkRlZmluaXRpb25zLnB1c2gobmV3IExvZ2dlckNvbHVtbkRlZmluaXRpb24odGhpcy5jb2x1bW5JZFRpbWUsIFwiVGltZSBbc11cIiwgNjAsIEZpZWxkVHlwZS5OdW1lcmljLCB0cnVlKSk7XHJcbiAgICAgICAgY29sdW1uRGVmaW5pdGlvbnMucHVzaChuZXcgTG9nZ2VyQ29sdW1uRGVmaW5pdGlvbih0aGlzLmNvbHVtbklkTW9kdWxlLCBcIk1vZHVsZSAoRWxlbWVudClcIiwgMTIwLCBGaWVsZFR5cGUuU3RyaW5nLCB0cnVlKSk7XHJcbiAgICAgICAgY29sdW1uRGVmaW5pdGlvbnMucHVzaChuZXcgTG9nZ2VyQ29sdW1uRGVmaW5pdGlvbih0aGlzLmNvbHVtbklkT2JqZWN0TmFtZSwgXCJBcHBsLiBPYmplY3RcIiwgOTAsIEZpZWxkVHlwZS5TdHJpbmcsIHRydWUpKTtcclxuICAgICAgICBjb2x1bW5EZWZpbml0aW9ucy5wdXNoKG5ldyBMb2dnZXJDb2x1bW5EZWZpbml0aW9uKHRoaXMuY29sdW1uSWREZXNjcmlwdGlvblJhd0RhdGEsIFwiRHJpdmUgUGFyYW1ldGVyIERhdGFcIiwgMzIwLCBGaWVsZFR5cGUuU3RyaW5nLCB0cnVlLCBcImRlc2NyaXB0aW9uVG9vbHRpcFRlbXBsYXRlXCIpKTtcclxuICAgICAgICBjb2x1bW5EZWZpbml0aW9ucy5wdXNoKG5ldyBMb2dnZXJDb2x1bW5EZWZpbml0aW9uKHRoaXMuY29sdW1uSWRSZXNwb25zZVRpbWUsIFwiUmVzcC4gVGltZSBbbXNdXCIsIDcwLCBGaWVsZFR5cGUuTnVtZXJpYywgdHJ1ZSkpO1xyXG4gICAgICAgIHJldHVybiBjb2x1bW5EZWZpbml0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGh0bWwgcmVwcmVzZW50YXRpb24gZm9yIHRoZSBjZWxsIHdpdGggdGhlIGdpdmVuIGNvbHVtbklkIFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb2x1bW5JZFxyXG4gICAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSB2YWx1ZXNcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dEZWZpbml0aW9uc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Q2VsbERhdGEoY29sdW1uSWQ6IHN0cmluZywgY2VsbEl0ZW06IElMb2dnZXJFbnRyeSk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IGl0ZW0gPSBjZWxsSXRlbSBhcyBJRHJpdmVMb2dFbnRyeTtcclxuICAgICAgICBpZiAoY29sdW1uSWQgPT0gdGhpcy5jb2x1bW5JZFJlY29yZE51bWJlcikgeyBcclxuICAgICAgICAgICAgcmV0dXJuIFwiJm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7XCIgKyBpdGVtLnJlY29yZE51bWJlci50b1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjb2x1bW5JZCA9PSB0aGlzLmNvbHVtbklkVGltZSkgeyBcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0udGltZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY29sdW1uSWQgPT0gdGhpcy5jb2x1bW5JZE1vZHVsZSkgeyBcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0ubW9kdWxlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjb2x1bW5JZCA9PSB0aGlzLmNvbHVtbklkT2JqZWN0TmFtZSkgeyBcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0ub2JqZWN0TmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY29sdW1uSWQgPT0gdGhpcy5jb2x1bW5JZERlc2NyaXB0aW9uUmF3RGF0YSkgeyBcclxuICAgICAgICAgICAgICAgIGxldCBpbWFnZVBhdGggPSBcIndpZGdldHMvbG9nZ2VyV2lkZ2V0L3N0eWxlL2ltYWdlcy9cIiArIGl0ZW0uZ2V0RGVzY3JpcHRpb25JY29uSWQoKSArIFwiLnN2Z1wiO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGA8ZGl2IHN0eWxlPVwid2hpdGUtc3BhY2U6IG5vd3JhcDtcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9J3Bvc2l0aW9uOiByZWxhdGl2ZTsgdG9wOiAgMnB4OyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IHdpZHRoOiAzMHB4Oyc+PGltZyBoZWlnaHQ9XCIyMlwiIGFsdD1cIiBcIiBzcmM9XCJgKyBpbWFnZVBhdGggKyBgXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPSdwb3NpdGlvbjogcmVsYXRpdmU7IHRvcDogLTVweDsgZGlzcGxheTogaW5saW5lLWJsb2NrOyB3aWR0aDogMjIwcHg7Jz5gKyBpdGVtLmdldERlc2NyaXB0aW9uVGV4dEZvcm1hdGVkKCkgKyBgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPSdwb3NpdGlvbjogcmVsYXRpdmU7IHRvcDogLTVweDsgZGlzcGxheTogaW5saW5lLWJsb2NrOyB3aWR0aDogMjMwcHg7Jz5gKyBpdGVtLmdldERlc2NyaXB0aW9uVmFsdWVXaXRoVW5pdEZvcm1hdGVkKCkgKyBgJm5ic3A7PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPSdwb3NpdGlvbjogcmVsYXRpdmU7IHRvcDogLTVweDsgZGlzcGxheTogaW5saW5lLWJsb2NrOyc+YCsgaXRlbS5nZXREZXNjcmlwdGlvbkVycm9yRm9ybWF0ZWQoKSArIGA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY29sdW1uSWQgPT0gdGhpcy5jb2x1bW5JZFJlc3BvbnNlVGltZSkgeyBcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0ucmVzcG9uc2VUaW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiQ2VsbERhdGEgbm90IGltcGxlbWVudGVkIGZvciBjb2x1bW4gaWQ6IFwiICsgY29sdW1uSWQpO1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfSAgICBcclxuICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRlbXBsYXRlIGZvciB0aGUgdG9vbHRpcFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dEZWZpbml0aW9uc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Q2VsbFRvb2x0aXBUZW1wbGF0ZURhdGEoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBgPHNjcmlwdCB0eXBlPVwidGV4dC94LWpzcmVuZGVyXCIgaWQ9XCJkZWZhdWx0VG9vbHRpcFRlbXBsYXRlXCI+XHJcbiAgICAgICAgICAgICAgICA8L3NjcmlwdD5cclxuICAgICAgICAgICAgICAgIDxzY3JpcHQgdHlwZT1cInRleHQveC1qc3JlbmRlclwiIGlkPVwiZGVzY3JpcHRpb25Ub29sdGlwVGVtcGxhdGVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9vbHRpcEJveFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7ezojZGF0YVsncmVjb3JkJ11bJ2Rlc2NyaXB0aW9uVG9vbHRpcCddfX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvc2NyaXB0PmA7XHJcbiAgICB9XHJcbn0iXX0=