define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DriveLogEntryHelper = /** @class */ (function () {
        function DriveLogEntryHelper() {
        }
        /**
         * Returns main tooltip description
         *
         * @static
         * @param {string} recordType
         * @param {number} parId
         * @returns {string}
         * @memberof DriveLogEntryHelper
         */
        DriveLogEntryHelper.getMainDescriptionTooltip = function (recordType, parId) {
            var tooltip = "";
            // Add type of entry as header(bold)
            tooltip += "<b>" + recordType + "</b>";
            tooltip += "<br/>";
            // Add general tooltip info
            tooltip += "ParId: " + parId;
            tooltip += "<br/>";
            return tooltip;
        };
        /**
         * Returns the tooltip for the given additional data object
         *
         * @static
         * @param {(IAdditionalData|undefined)} data
         * @returns {string}
         * @memberof DriveLogEntryHelper
         */
        DriveLogEntryHelper.getAdditionalDescriptionTooltip = function (data) {
            var tooltip = "";
            if (data != undefined) {
                if (data.parGroup != undefined) {
                    tooltip += this.createParamGroupDescription(data.parGroup);
                }
                if (data.bitPattern != undefined) {
                    tooltip += "<br/>";
                    tooltip += this.createBitMaskTable(data.bitPattern);
                }
                if (data.errorInfo != undefined) {
                    tooltip += this.createErrorInfoDescription(data.errorInfo);
                }
            }
            return tooltip;
        };
        /**
         * Returns the descriptionValue incl. the unit
         *
         * @param {string} value
         * @param {(string|undefined)} unit
         * @returns {string}
         * @memberof DriveLogEntryHelper
         */
        DriveLogEntryHelper.combineValueWithUnit = function (value, unit) {
            if (unit != undefined && unit != "") {
                value += " " + unit;
            }
            return value;
        };
        /**
         * Generate icon id for the given records of this entry(e.g. recordId1_recordId2 or recId1_recId2_ivalid)
         *
         * @static
         * @param {(number|undefined)} recordType
         * @param {(number|undefined)} linkedRecordType
         * @param {boolean} invalidLinkedRecord
         * @returns {string}
         * @memberof DriveLogEntryHelper
         */
        DriveLogEntryHelper.generateIconId = function (recordType, linkedRecordType, invalidLinkedRecord) {
            var id = "";
            if (recordType != undefined) {
                id = recordType.toString();
            }
            if (linkedRecordType != undefined && linkedRecordType != -1) {
                if (id != "") {
                    id += "_";
                }
                id += linkedRecordType.toString();
            }
            if (invalidLinkedRecord == true) {
                id += "_invalid";
            }
            return id;
        };
        /**
         * Sets the red color and bold for the given error text
         *
         * @static
         * @param {string} text
         * @returns
         * @memberof DriveLogEntryHelper
         */
        DriveLogEntryHelper.setStyleError = function (text) {
            // set style red and bold
            return this.setStyle(text, "red", true);
        };
        /**
         * find first different character (after " " to use only whole words)
         *
         * @static
         * @param {string} text1
         * @param {string} text2
         * @returns {number}
         * @memberof DriveLogEntryHelper
         */
        DriveLogEntryHelper.findFirstDifferentChar = function (text1, text2) {
            var index = 0;
            for (var i = 0; i < text1.length; i++) {
                if (text2.length > i) {
                    if (text1[i] == " ") { // Different char must be after " " to use only whole words
                        // set index to character after last " "
                        index = i + 1;
                    }
                    if (text2[i] != text1[i]) {
                        return index;
                    }
                }
                else {
                    return index;
                }
            }
            return index;
        };
        /**
         * Creates the parameter group description for the given param group data
         *
         * @private
         * @static
         * @param {Array<INwctParamGroupInfo>} paramGroupExportDatas
         * @returns {string}
         * @memberof DriveLogEntryHelper
         */
        DriveLogEntryHelper.createParamGroupDescription = function (paramGroupExportDatas) {
            var _this = this;
            var tooltip = "";
            paramGroupExportDatas.forEach(function (parGroup) {
                if (parGroup.parName != undefined) {
                    // Add parameter info
                    tooltip += "<br/>" + parGroup.parName + " = " + parGroup.parValue;
                    if (parGroup.parUnit != undefined && parGroup.parUnit != "") { // Add unit if available
                        tooltip += " " + parGroup.parUnit;
                    }
                    // Add additional bit pattern info if available
                    if (parGroup.bitPattern != undefined) {
                        tooltip += _this.createBitMaskTable(parGroup.bitPattern);
                    }
                }
            });
            return tooltip;
        };
        /**
         * Creates the error info description for the given error info data
         *
         * @private
         * @static
         * @param {INwctErrorInfo} errorInfo
         * @returns {string}
         * @memberof DriveLogEntryHelper
         */
        DriveLogEntryHelper.createErrorInfoDescription = function (errorInfo) {
            var tooltip = "";
            if (errorInfo != undefined && errorInfo.errorNumber != undefined) {
                tooltip += "<br/>" + this.setStyleError(errorInfo.errorMessage);
            }
            return tooltip;
        };
        /**
         * Returns a string with some DIVs(table with rows and cells) with the bit mask informations
         *
         * @private
         * @static
         * @param {Array<INwctBitDefinition>} bitMaskDescription
         * @returns {string}
         * @memberof DriveLogEntryHelper
         */
        DriveLogEntryHelper.createBitMaskTable = function (bitMaskDescription) {
            var _this = this;
            var tooltip = "<div class='tooltipTable'>";
            if (bitMaskDescription.length > 16) { // Show bitmask info with two columns if more then 16 bits are available
                var rowCount = 0;
                var bitCount = bitMaskDescription.length;
                var modulo = bitCount % 2;
                var evenNumber = bitCount + modulo;
                var startIndexOfSecondColumn = evenNumber / 2;
                for (var i = startIndexOfSecondColumn; i < bitMaskDescription.length; i++) {
                    var elementColumn1 = bitMaskDescription[i - startIndexOfSecondColumn];
                    var elementColumn2 = bitMaskDescription[i];
                    var alternateRow = rowCount % 2;
                    // Add row with two bitmask infos
                    tooltip += this.createBitMaskTableRow(new Array(elementColumn1, elementColumn2), alternateRow == 1);
                    rowCount++;
                }
                // Add last single bit description
                if (modulo == 1) {
                    var elementColumn1 = bitMaskDescription[startIndexOfSecondColumn - 1];
                    var alternateRow = rowCount % 2;
                    // Add row with one bitmask info and one empty definiton
                    tooltip += this.createBitMaskTableRow(new Array(elementColumn1, undefined), alternateRow == 1);
                }
            }
            else { // Show bitmask info with only one column
                var rowCount_1 = 0;
                bitMaskDescription.forEach(function (element) {
                    var alternateRow = rowCount_1 % 2;
                    // Add row with one bitmask info 
                    tooltip += _this.createBitMaskTableRow(new Array(element), alternateRow == 1);
                    rowCount_1++;
                });
            }
            tooltip += '</div>';
            return tooltip;
        };
        /**
         * Returns a string with some DIVs(tableRow with some tableCells) for a bit mask representation(e.g. bitnumber, checked, bitname)
         *
         * @private
         * @static
         * @param {(Array<INwctBitDefinition|undefined>)} bitDefinitions
         * @param {boolean} alternateStyle
         * @returns {string}
         * @memberof DriveLogEntryHelper
         */
        DriveLogEntryHelper.createBitMaskTableRow = function (bitDefinitions, alternateStyle) {
            var _this = this;
            var tableRow = "";
            var classAlternate = "";
            if (alternateStyle == true) {
                classAlternate += " tooltipTableRowAlternate";
            }
            // add begin
            tableRow += "<div class='tooltipTableRow" + classAlternate + "'>";
            // add cells
            bitDefinitions.forEach(function (bitDef) {
                tableRow += _this.createBitMaskTableCells(bitDef);
            });
            // add end
            tableRow += "</div>";
            return tableRow;
        };
        /**
         * Returns a string with some DIVs(tableCells) for a bit mask representation(e.g. bitnumber, checked, bitname)
         *
         * @private
         * @static
         * @param {(INwctBitDefinition|undefined)} bitDef
         * @returns {string}
         * @memberof DriveLogEntryHelper
         */
        DriveLogEntryHelper.createBitMaskTableCells = function (bitDef) {
            var classForCell = "tooltipTableCell";
            if (bitDef == undefined) {
                // add three empty cells
                var definitionOfOneEmptyCell = "<div class='" + classForCell + "'></div>";
                var tableCell_1 = definitionOfOneEmptyCell;
                tableCell_1 += definitionOfOneEmptyCell;
                tableCell_1 += definitionOfOneEmptyCell;
                return tableCell_1;
            }
            var classForCellModified = "";
            if (bitDef.isModified) {
                classForCellModified = " tooltipTableCellModififed";
            }
            var isSetCheck = "&nbsp;";
            var classForCellBold = "";
            if (bitDef.isSet) {
                // Set check symbol for bit == 1 ...
                isSetCheck = "&#x2713;"; // unicode check symbol
                // ... and bold style
                classForCellBold = " tooltipTableCellBold";
            }
            // add cells with data(bitnumber, checked, bitname)
            var tableCell = "<div class='" + classForCell + classForCellBold + "'>" + bitDef.bit + "</div>";
            tableCell += "<div class='" + classForCell + classForCellBold + "'>" + isSetCheck + "</div>";
            tableCell += "<div class='" + classForCell + classForCellBold + classForCellModified + "'>" + bitDef.name + "</div>";
            return tableCell;
        };
        /**
         * Sets the gree color for the given text and bold if needed
         *
         * @private
         * @static
         * @param {string} text
         * @param {string} color
         * @param {boolean} [bold=false]
         * @returns
         * @memberof DriveLogEntryHelper
         */
        DriveLogEntryHelper.setStyle = function (text, color, bold) {
            if (bold === void 0) { bold = false; }
            if (text == "") { // don't add red style if no text is available
                return text;
            }
            var colorString = "";
            if (color != "") {
                colorString = 'color:' + color + ';';
            }
            if (bold == true) {
                return "<p style='" + colorString + "display:inline;font-weight:bold;'>" + text + "</p>";
            }
            return "<p style='" + colorString + "display:inline;'>" + text + "</p>";
        };
        return DriveLogEntryHelper;
    }());
    exports.DriveLogEntryHelper = DriveLogEntryHelper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJpdmVMb2dFbnRyeUhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9sb2dnZXJXaWRnZXQvZHJpdmVMb2cvZHJpdmVMb2dFbnRyeUhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFLQTtRQUFBO1FBeVRBLENBQUM7UUF2VEc7Ozs7Ozs7O1dBUUc7UUFDWSw2Q0FBeUIsR0FBdkMsVUFBd0MsVUFBa0IsRUFBRSxLQUFhO1lBQ3RFLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNqQixvQ0FBb0M7WUFDcEMsT0FBTyxJQUFJLEtBQUssR0FBRyxVQUFVLEdBQUUsTUFBTSxDQUFDO1lBQ3RDLE9BQU8sSUFBSSxPQUFPLENBQUM7WUFFbkIsMkJBQTJCO1lBQzNCLE9BQU8sSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQzdCLE9BQU8sSUFBSSxPQUFPLENBQUM7WUFDbkIsT0FBTyxPQUFPLENBQUM7UUFDbkIsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDVyxtREFBK0IsR0FBN0MsVUFBOEMsSUFBK0I7WUFDekUsSUFBSSxPQUFPLEdBQUUsRUFBRSxDQUFDO1lBQ2hCLElBQUcsSUFBSSxJQUFJLFNBQVMsRUFBQztnQkFDakIsSUFBRyxJQUFJLENBQUMsUUFBUSxJQUFJLFNBQVMsRUFBQztvQkFDMUIsT0FBTyxJQUFJLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQzlEO2dCQUNELElBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxTQUFTLEVBQUM7b0JBQzVCLE9BQU8sSUFBSSxPQUFPLENBQUM7b0JBQ25CLE9BQU8sSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUN2RDtnQkFDRCxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUksU0FBUyxFQUFDO29CQUMzQixPQUFPLElBQUks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OlsiaW1wb3J0IHsgSU53Y3RCaXREZWZpbml0aW9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9ud2N0UHJvdmlkZXIvaW50ZXJmYWNlcy9ud2N0Qml0RGVmaW5pdGlvbkludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJQWRkaXRpb25hbERhdGEgfSBmcm9tIFwiLi9kcml2ZUxvZ0VudHJ5QWRkaXRpb25hbERhdGFcIjtcclxuaW1wb3J0IHsgSU53Y3RQYXJhbUdyb3VwSW5mbyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vbndjdFByb3ZpZGVyL2ludGVyZmFjZXMvbndjdFBhcmFtR3JvdXBJbmZvSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElOd2N0RXJyb3JJbmZvIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9ud2N0UHJvdmlkZXIvaW50ZXJmYWNlcy9ud2N0RXJyb3JJbmZvSW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRHJpdmVMb2dFbnRyeUhlbHBlcntcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIG1haW4gdG9vbHRpcCBkZXNjcmlwdGlvblxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByZWNvcmRUeXBlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcGFySWRcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeUhlbHBlclxyXG4gICAgICovXHJcbiAgICAgcHVibGljIHN0YXRpYyBnZXRNYWluRGVzY3JpcHRpb25Ub29sdGlwKHJlY29yZFR5cGU6IHN0cmluZywgcGFySWQ6IG51bWJlcik6IHN0cmluZ3tcclxuICAgICAgICBsZXQgdG9vbHRpcCA9IFwiXCI7XHJcbiAgICAgICAgLy8gQWRkIHR5cGUgb2YgZW50cnkgYXMgaGVhZGVyKGJvbGQpXHJcbiAgICAgICAgdG9vbHRpcCArPSBcIjxiPlwiICsgcmVjb3JkVHlwZSArXCI8L2I+XCI7XHJcbiAgICAgICAgdG9vbHRpcCArPSBcIjxici8+XCI7IFxyXG5cclxuICAgICAgICAvLyBBZGQgZ2VuZXJhbCB0b29sdGlwIGluZm9cclxuICAgICAgICB0b29sdGlwICs9IFwiUGFySWQ6IFwiICsgcGFySWQ7XHJcbiAgICAgICAgdG9vbHRpcCArPSBcIjxici8+XCI7XHJcbiAgICAgICAgcmV0dXJuIHRvb2x0aXA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0b29sdGlwIGZvciB0aGUgZ2l2ZW4gYWRkaXRpb25hbCBkYXRhIG9iamVjdFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7KElBZGRpdGlvbmFsRGF0YXx1bmRlZmluZWQpfSBkYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRBZGRpdGlvbmFsRGVzY3JpcHRpb25Ub29sdGlwKGRhdGE6IElBZGRpdGlvbmFsRGF0YXx1bmRlZmluZWQpOiBzdHJpbmd7XHJcbiAgICAgICAgbGV0IHRvb2x0aXAgPVwiXCI7XHJcbiAgICAgICAgaWYoZGF0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZihkYXRhLnBhckdyb3VwICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB0b29sdGlwICs9IHRoaXMuY3JlYXRlUGFyYW1Hcm91cERlc2NyaXB0aW9uKGRhdGEucGFyR3JvdXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGRhdGEuYml0UGF0dGVybiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgdG9vbHRpcCArPSBcIjxici8+XCI7XHJcbiAgICAgICAgICAgICAgICB0b29sdGlwICs9IHRoaXMuY3JlYXRlQml0TWFza1RhYmxlKGRhdGEuYml0UGF0dGVybik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoZGF0YS5lcnJvckluZm8gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHRvb2x0aXAgKz0gdGhpcy5jcmVhdGVFcnJvckluZm9EZXNjcmlwdGlvbihkYXRhLmVycm9ySW5mbyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRvb2x0aXA7XHJcbiAgICB9ICAgIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVzY3JpcHRpb25WYWx1ZSBpbmNsLiB0aGUgdW5pdFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxyXG4gICAgICogQHBhcmFtIHsoc3RyaW5nfHVuZGVmaW5lZCl9IHVuaXRcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeUhlbHBlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNvbWJpbmVWYWx1ZVdpdGhVbml0KHZhbHVlOiBzdHJpbmcsIHVuaXQ6c3RyaW5nfHVuZGVmaW5lZCk6IHN0cmluZ3tcclxuICAgICAgICBpZih1bml0ICE9IHVuZGVmaW5lZCAmJiB1bml0ICE9IFwiXCIpe1xyXG4gICAgICAgICAgICB2YWx1ZSArPSBcIiBcIiArIHVuaXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdlbmVyYXRlIGljb24gaWQgZm9yIHRoZSBnaXZlbiByZWNvcmRzIG9mIHRoaXMgZW50cnkoZS5nLiByZWNvcmRJZDFfcmVjb3JkSWQyIG9yIHJlY0lkMV9yZWNJZDJfaXZhbGlkKVxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7KG51bWJlcnx1bmRlZmluZWQpfSByZWNvcmRUeXBlXHJcbiAgICAgKiBAcGFyYW0geyhudW1iZXJ8dW5kZWZpbmVkKX0gbGlua2VkUmVjb3JkVHlwZVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpbnZhbGlkTGlua2VkUmVjb3JkXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZW5lcmF0ZUljb25JZChyZWNvcmRUeXBlOiBudW1iZXJ8dW5kZWZpbmVkLCBsaW5rZWRSZWNvcmRUeXBlOiBudW1iZXJ8dW5kZWZpbmVkLCBpbnZhbGlkTGlua2VkUmVjb3JkOiBib29sZWFuKTogc3RyaW5ne1xyXG4gICAgICAgIGxldCBpZDogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICBpZihyZWNvcmRUeXBlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGlkID0gcmVjb3JkVHlwZS50b1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihsaW5rZWRSZWNvcmRUeXBlICE9IHVuZGVmaW5lZCAmJiBsaW5rZWRSZWNvcmRUeXBlICE9IC0xKXtcclxuICAgICAgICAgICAgaWYoaWQgIT0gXCJcIil7XHJcbiAgICAgICAgICAgICAgICBpZCArPSBcIl9cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZCArPSBsaW5rZWRSZWNvcmRUeXBlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGludmFsaWRMaW5rZWRSZWNvcmQgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIGlkICs9IFwiX2ludmFsaWRcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGlkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgcmVkIGNvbG9yIGFuZCBib2xkIGZvciB0aGUgZ2l2ZW4gZXJyb3IgdGV4dFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzZXRTdHlsZUVycm9yKHRleHQ6IHN0cmluZyl7XHJcbiAgICAgICAgLy8gc2V0IHN0eWxlIHJlZCBhbmQgYm9sZFxyXG4gICAgICAgIHJldHVybiB0aGlzLnNldFN0eWxlKHRleHQsIFwicmVkXCIsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZmluZCBmaXJzdCBkaWZmZXJlbnQgY2hhcmFjdGVyIChhZnRlciBcIiBcIiB0byB1c2Ugb25seSB3aG9sZSB3b3JkcylcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dDFcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0MlxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5SGVscGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZmluZEZpcnN0RGlmZmVyZW50Q2hhcih0ZXh0MTogc3RyaW5nLCB0ZXh0Mjogc3RyaW5nKTogbnVtYmVye1xyXG4gICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRleHQxLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYodGV4dDIubGVuZ3RoID4gaSl7XHJcbiAgICAgICAgICAgICAgICBpZih0ZXh0MVtpXSA9PSBcIiBcIil7IC8vIERpZmZlcmVudCBjaGFyIG11c3QgYmUgYWZ0ZXIgXCIgXCIgdG8gdXNlIG9ubHkgd2hvbGUgd29yZHNcclxuICAgICAgICAgICAgICAgICAgICAvLyBzZXQgaW5kZXggdG8gY2hhcmFjdGVyIGFmdGVyIGxhc3QgXCIgXCJcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGkrMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHRleHQyW2ldICE9IHRleHQxW2ldICl7IFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbmRleDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbmRleDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIHBhcmFtZXRlciBncm91cCBkZXNjcmlwdGlvbiBmb3IgdGhlIGdpdmVuIHBhcmFtIGdyb3VwIGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtBcnJheTxJTndjdFBhcmFtR3JvdXBJbmZvPn0gcGFyYW1Hcm91cEV4cG9ydERhdGFzXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgY3JlYXRlUGFyYW1Hcm91cERlc2NyaXB0aW9uKHBhcmFtR3JvdXBFeHBvcnREYXRhczogQXJyYXk8SU53Y3RQYXJhbUdyb3VwSW5mbz4pOiBzdHJpbmd7XHJcbiAgICAgICAgbGV0IHRvb2x0aXAgPSBcIlwiO1xyXG4gICAgICAgIHBhcmFtR3JvdXBFeHBvcnREYXRhcy5mb3JFYWNoKHBhckdyb3VwID0+IHtcclxuICAgICAgICAgICAgaWYocGFyR3JvdXAucGFyTmFtZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgLy8gQWRkIHBhcmFtZXRlciBpbmZvXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwICs9IFwiPGJyLz5cIiArIHBhckdyb3VwLnBhck5hbWUgKyBcIiA9IFwiICsgcGFyR3JvdXAucGFyVmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZihwYXJHcm91cC5wYXJVbml0ICE9IHVuZGVmaW5lZCAmJiBwYXJHcm91cC5wYXJVbml0ICE9IFwiXCIpeyAvLyBBZGQgdW5pdCBpZiBhdmFpbGFibGVcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwICs9IFwiIFwiICsgcGFyR3JvdXAucGFyVW5pdDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIEFkZCBhZGRpdGlvbmFsIGJpdCBwYXR0ZXJuIGluZm8gaWYgYXZhaWxhYmxlXHJcbiAgICAgICAgICAgICAgICBpZihwYXJHcm91cC5iaXRQYXR0ZXJuICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcCArPSB0aGlzLmNyZWF0ZUJpdE1hc2tUYWJsZShwYXJHcm91cC5iaXRQYXR0ZXJuKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0b29sdGlwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgZXJyb3IgaW5mbyBkZXNjcmlwdGlvbiBmb3IgdGhlIGdpdmVuIGVycm9yIGluZm8gZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0lOd2N0RXJyb3JJbmZvfSBlcnJvckluZm9cclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeUhlbHBlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBjcmVhdGVFcnJvckluZm9EZXNjcmlwdGlvbihlcnJvckluZm86IElOd2N0RXJyb3JJbmZvKTogc3RyaW5ne1xyXG4gICAgICAgIGxldCB0b29sdGlwID0gXCJcIjtcclxuICAgICAgICBpZihlcnJvckluZm8gIT0gdW5kZWZpbmVkICYmIGVycm9ySW5mby5lcnJvck51bWJlciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0b29sdGlwICs9IFwiPGJyLz5cIiArIHRoaXMuc2V0U3R5bGVFcnJvcihlcnJvckluZm8uZXJyb3JNZXNzYWdlKTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0b29sdGlwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIHN0cmluZyB3aXRoIHNvbWUgRElWcyh0YWJsZSB3aXRoIHJvd3MgYW5kIGNlbGxzKSB3aXRoIHRoZSBiaXQgbWFzayBpbmZvcm1hdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtBcnJheTxJTndjdEJpdERlZmluaXRpb24+fSBiaXRNYXNrRGVzY3JpcHRpb25cclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeUhlbHBlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBjcmVhdGVCaXRNYXNrVGFibGUoYml0TWFza0Rlc2NyaXB0aW9uOiBBcnJheTxJTndjdEJpdERlZmluaXRpb24+KTogc3RyaW5ne1xyXG4gICAgICAgIGxldCB0b29sdGlwID0gXCI8ZGl2IGNsYXNzPSd0b29sdGlwVGFibGUnPlwiO1xyXG4gICAgICAgIGlmKGJpdE1hc2tEZXNjcmlwdGlvbi5sZW5ndGggPiAxNil7IC8vIFNob3cgYml0bWFzayBpbmZvIHdpdGggdHdvIGNvbHVtbnMgaWYgbW9yZSB0aGVuIDE2IGJpdHMgYXJlIGF2YWlsYWJsZVxyXG4gICAgICAgICAgICBsZXQgcm93Q291bnQgPSAwO1xyXG4gICAgICAgICAgICBsZXQgYml0Q291bnQgPSBiaXRNYXNrRGVzY3JpcHRpb24ubGVuZ3RoO1xyXG4gICAgICAgICAgICBsZXQgbW9kdWxvID0gYml0Q291bnQlMjtcclxuICAgICAgICAgICAgbGV0IGV2ZW5OdW1iZXIgPSBiaXRDb3VudCttb2R1bG87XHJcbiAgICAgICAgICAgIGxldCBzdGFydEluZGV4T2ZTZWNvbmRDb2x1bW4gPSBldmVuTnVtYmVyLzI7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IHN0YXJ0SW5kZXhPZlNlY29uZENvbHVtbjsgaSA8IGJpdE1hc2tEZXNjcmlwdGlvbi5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBlbGVtZW50Q29sdW1uMSA9IGJpdE1hc2tEZXNjcmlwdGlvbltpLXN0YXJ0SW5kZXhPZlNlY29uZENvbHVtbl07XHJcbiAgICAgICAgICAgICAgICBsZXQgZWxlbWVudENvbHVtbjIgPSBiaXRNYXNrRGVzY3JpcHRpb25baV07XHJcbiAgICAgICAgICAgICAgICBsZXQgYWx0ZXJuYXRlUm93ID0gcm93Q291bnQlMjtcclxuICAgICAgICAgICAgICAgIC8vIEFkZCByb3cgd2l0aCB0d28gYml0bWFzayBpbmZvc1xyXG4gICAgICAgICAgICAgICAgdG9vbHRpcCArPSB0aGlzLmNyZWF0ZUJpdE1hc2tUYWJsZVJvdyhuZXcgQXJyYXk8SU53Y3RCaXREZWZpbml0aW9ufHVuZGVmaW5lZD4oZWxlbWVudENvbHVtbjEsIGVsZW1lbnRDb2x1bW4yKSwgYWx0ZXJuYXRlUm93ID09IDEpO1xyXG4gICAgICAgICAgICAgICAgcm93Q291bnQrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBBZGQgbGFzdCBzaW5nbGUgYml0IGRlc2NyaXB0aW9uXHJcbiAgICAgICAgICAgIGlmKG1vZHVsbyA9PSAxKXtcclxuICAgICAgICAgICAgICAgIGxldCBlbGVtZW50Q29sdW1uMSA9IGJpdE1hc2tEZXNjcmlwdGlvbltzdGFydEluZGV4T2ZTZWNvbmRDb2x1bW4tMV07XHJcbiAgICAgICAgICAgICAgICBsZXQgYWx0ZXJuYXRlUm93ID0gcm93Q291bnQlMjtcclxuICAgICAgICAgICAgICAgIC8vIEFkZCByb3cgd2l0aCBvbmUgYml0bWFzayBpbmZvIGFuZCBvbmUgZW1wdHkgZGVmaW5pdG9uXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwICs9IHRoaXMuY3JlYXRlQml0TWFza1RhYmxlUm93KG5ldyBBcnJheTxJTndjdEJpdERlZmluaXRpb258dW5kZWZpbmVkPihlbGVtZW50Q29sdW1uMSwgdW5kZWZpbmVkKSwgYWx0ZXJuYXRlUm93ID09IDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7IC8vIFNob3cgYml0bWFzayBpbmZvIHdpdGggb25seSBvbmUgY29sdW1uXHJcbiAgICAgICAgICAgIGxldCByb3dDb3VudD0wO1xyXG4gICAgICAgICAgICBiaXRNYXNrRGVzY3JpcHRpb24uZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBhbHRlcm5hdGVSb3cgPSByb3dDb3VudCUyO1xyXG4gICAgICAgICAgICAgICAgLy8gQWRkIHJvdyB3aXRoIG9uZSBiaXRtYXNrIGluZm8gXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwICs9IHRoaXMuY3JlYXRlQml0TWFza1RhYmxlUm93KG5ldyBBcnJheTxJTndjdEJpdERlZmluaXRpb258dW5kZWZpbmVkPihlbGVtZW50KSwgYWx0ZXJuYXRlUm93ID09IDEpO1xyXG4gICAgICAgICAgICAgICAgcm93Q291bnQrKztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRvb2x0aXAgKz0gJzwvZGl2Pic7XHJcbiAgICAgICAgcmV0dXJuIHRvb2x0aXA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgc3RyaW5nIHdpdGggc29tZSBESVZzKHRhYmxlUm93IHdpdGggc29tZSB0YWJsZUNlbGxzKSBmb3IgYSBiaXQgbWFzayByZXByZXNlbnRhdGlvbihlLmcuIGJpdG51bWJlciwgY2hlY2tlZCwgYml0bmFtZSlcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHsoQXJyYXk8SU53Y3RCaXREZWZpbml0aW9ufHVuZGVmaW5lZD4pfSBiaXREZWZpbml0aW9uc1xyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBhbHRlcm5hdGVTdHlsZVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5SGVscGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGNyZWF0ZUJpdE1hc2tUYWJsZVJvdyhiaXREZWZpbml0aW9uczogQXJyYXk8SU53Y3RCaXREZWZpbml0aW9ufHVuZGVmaW5lZD4sIGFsdGVybmF0ZVN0eWxlOiBib29sZWFuKTogc3RyaW5ne1xyXG4gICAgICAgIGxldCB0YWJsZVJvdyA9IFwiXCI7XHJcbiAgICAgICAgbGV0IGNsYXNzQWx0ZXJuYXRlID0gXCJcIjtcclxuICAgICAgICBpZihhbHRlcm5hdGVTdHlsZSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgY2xhc3NBbHRlcm5hdGUgKz0gXCIgdG9vbHRpcFRhYmxlUm93QWx0ZXJuYXRlXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGFkZCBiZWdpblxyXG4gICAgICAgIHRhYmxlUm93ICs9IFwiPGRpdiBjbGFzcz0ndG9vbHRpcFRhYmxlUm93XCIgKyBjbGFzc0FsdGVybmF0ZSArIFwiJz5cIjtcclxuXHJcbiAgICAgICAgLy8gYWRkIGNlbGxzXHJcbiAgICAgICAgYml0RGVmaW5pdGlvbnMuZm9yRWFjaChiaXREZWYgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGFibGVSb3cgKz0gdGhpcy5jcmVhdGVCaXRNYXNrVGFibGVDZWxscyhiaXREZWYpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBhZGQgZW5kXHJcbiAgICAgICAgdGFibGVSb3cgKz0gXCI8L2Rpdj5cIjtcclxuICAgICAgICByZXR1cm4gdGFibGVSb3c7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgc3RyaW5nIHdpdGggc29tZSBESVZzKHRhYmxlQ2VsbHMpIGZvciBhIGJpdCBtYXNrIHJlcHJlc2VudGF0aW9uKGUuZy4gYml0bnVtYmVyLCBjaGVja2VkLCBiaXRuYW1lKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0geyhJTndjdEJpdERlZmluaXRpb258dW5kZWZpbmVkKX0gYml0RGVmXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgY3JlYXRlQml0TWFza1RhYmxlQ2VsbHMoYml0RGVmOiBJTndjdEJpdERlZmluaXRpb258dW5kZWZpbmVkKTogc3RyaW5ne1xyXG4gICAgICAgIGxldCBjbGFzc0ZvckNlbGwgPSBcInRvb2x0aXBUYWJsZUNlbGxcIjtcclxuICAgICAgICBpZihiaXREZWYgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gYWRkIHRocmVlIGVtcHR5IGNlbGxzXHJcbiAgICAgICAgICAgIGxldCBkZWZpbml0aW9uT2ZPbmVFbXB0eUNlbGwgPSBcIjxkaXYgY2xhc3M9J1wiICsgY2xhc3NGb3JDZWxsICsgXCInPjwvZGl2PlwiO1xyXG4gICAgICAgICAgICBsZXQgdGFibGVDZWxsID0gZGVmaW5pdGlvbk9mT25lRW1wdHlDZWxsO1xyXG4gICAgICAgICAgICB0YWJsZUNlbGwgKz0gICAgZGVmaW5pdGlvbk9mT25lRW1wdHlDZWxsO1xyXG4gICAgICAgICAgICB0YWJsZUNlbGwgKz0gICAgZGVmaW5pdGlvbk9mT25lRW1wdHlDZWxsO1xyXG4gICAgICAgICAgICByZXR1cm4gdGFibGVDZWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY2xhc3NGb3JDZWxsTW9kaWZpZWQgPSBcIlwiO1xyXG4gICAgICAgIGlmKGJpdERlZi5pc01vZGlmaWVkKXtcclxuICAgICAgICAgICAgY2xhc3NGb3JDZWxsTW9kaWZpZWQgPSBcIiB0b29sdGlwVGFibGVDZWxsTW9kaWZpZmVkXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpc1NldENoZWNrID0gXCImbmJzcDtcIjtcclxuICAgICAgICBsZXQgY2xhc3NGb3JDZWxsQm9sZCA9IFwiXCI7XHJcbiAgICAgICAgaWYoYml0RGVmLmlzU2V0KXtcclxuICAgICAgICAgICAgLy8gU2V0IGNoZWNrIHN5bWJvbCBmb3IgYml0ID09IDEgLi4uXHJcbiAgICAgICAgICAgIGlzU2V0Q2hlY2sgPSBcIiYjeDI3MTM7XCI7IC8vIHVuaWNvZGUgY2hlY2sgc3ltYm9sXHJcbiAgICAgICAgICAgIC8vIC4uLiBhbmQgYm9sZCBzdHlsZVxyXG4gICAgICAgICAgICBjbGFzc0ZvckNlbGxCb2xkID0gXCIgdG9vbHRpcFRhYmxlQ2VsbEJvbGRcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gYWRkIGNlbGxzIHdpdGggZGF0YShiaXRudW1iZXIsIGNoZWNrZWQsIGJpdG5hbWUpXHJcbiAgICAgICAgbGV0IHRhYmxlQ2VsbCA9IFwiPGRpdiBjbGFzcz0nXCIrIGNsYXNzRm9yQ2VsbCArIGNsYXNzRm9yQ2VsbEJvbGQgKyBcIic+XCIgKyBiaXREZWYuYml0ICsgXCI8L2Rpdj5cIjtcclxuICAgICAgICB0YWJsZUNlbGwgKz0gICAgXCI8ZGl2IGNsYXNzPSdcIiArIGNsYXNzRm9yQ2VsbCArIGNsYXNzRm9yQ2VsbEJvbGQgKyBcIic+XCIgKyBpc1NldENoZWNrICsgXCI8L2Rpdj5cIjtcclxuICAgICAgICB0YWJsZUNlbGwgKz0gICAgXCI8ZGl2IGNsYXNzPSdcIisgY2xhc3NGb3JDZWxsICsgY2xhc3NGb3JDZWxsQm9sZCArIGNsYXNzRm9yQ2VsbE1vZGlmaWVkICtcIic+XCIgKyBiaXREZWYubmFtZSArIFwiPC9kaXY+XCI7XHJcbiAgICAgICAgcmV0dXJuIHRhYmxlQ2VsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGdyZWUgY29sb3IgZm9yIHRoZSBnaXZlbiB0ZXh0IGFuZCBib2xkIGlmIG5lZWRlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbG9yXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtib2xkPWZhbHNlXVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5SGVscGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHNldFN0eWxlKHRleHQ6IHN0cmluZywgY29sb3I6IHN0cmluZywgYm9sZDogYm9vbGVhbiA9IGZhbHNlKXtcclxuICAgICAgICBpZih0ZXh0ID09IFwiXCIpeyAvLyBkb24ndCBhZGQgcmVkIHN0eWxlIGlmIG5vIHRleHQgaXMgYXZhaWxhYmxlXHJcbiAgICAgICAgICAgIHJldHVybiB0ZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY29sb3JTdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIGlmKGNvbG9yICE9IFwiXCIpe1xyXG4gICAgICAgICAgICBjb2xvclN0cmluZyA9ICdjb2xvcjonICsgY29sb3IgKyAnOyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGJvbGQgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIHJldHVybiBcIjxwIHN0eWxlPSdcIiArIGNvbG9yU3RyaW5nICsgXCJkaXNwbGF5OmlubGluZTtmb250LXdlaWdodDpib2xkOyc+XCIgKyB0ZXh0ICsgXCI8L3A+XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIjxwIHN0eWxlPSdcIiArIGNvbG9yU3RyaW5nICsgXCJkaXNwbGF5OmlubGluZTsnPlwiICsgdGV4dCArIFwiPC9wPlwiO1xyXG4gICAgfVxyXG59Il19