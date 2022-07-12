define(["require", "exports", "../enums/traceDataConversionErrorTypes", "../exceptions/traceDataConversionError"], function (require, exports, traceDataConversionErrorTypes_1, traceDataConversionError_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Represents a header row of the AS CSV format.
     * Contains the knowledge to read or write an ASCsv formatted header row.
     *
     * @class ASCsvHeader
     * @implements {IASCsvHeader}
     */
    var ASCsvHeader = /** @class */ (function () {
        /**
         * Creates an instance of ASCsvHeader.
         * Accessor private to force use of Factory methods.
         * @memberof ASCsvHeader
         */
        function ASCsvHeader() {
            this.title = "";
            this.starttrigger = new Date();
            this.xunit = "UnitX";
            this.yunit = "UnitY";
            this.rows = -1;
            this.formula = ASCsvHeader.originalDataFormula;
        }
        /**
         * Stringifies the header in an ASCsv formatted header row with linebreak.
         * Can throw TraceDataConversionError.
         *
         * @param {string} comsep
         * @param {string} colsep
         * @returns {string}
         * @memberof ASCsvHeader
         */
        ASCsvHeader.prototype.stringifyASCsvHeader = function (comsep, colsep) {
            var headerRow = '';
            headerRow = "% ";
            headerRow += ASCsvHeader.type_attribute + " ";
            headerRow += ASCsvHeader.version_attributeName + "=2" + comsep + "0 ";
            headerRow += ASCsvHeader.title_attributeName + "=\"" + ASCsvHeader.buildTitleAttributeString(this.title, this.starttrigger) + "\" ";
            headerRow += ASCsvHeader.xunit_attributeName + "=\"" + this.xunit + "\" ";
            headerRow += ASCsvHeader.yunit_attributeName + "=\"" + this.yunit + "\" ";
            headerRow += ASCsvHeader.formula_attributeName + "=\"" + this.formula + "\" ";
            headerRow += ASCsvHeader.rows_attributeName + "=" + this.rows + " ";
            headerRow += ASCsvHeader.columns_attributeName + "=2 ";
            headerRow += ASCsvHeader.createColsepAttribute(colsep) + " ";
            headerRow += colsep;
            headerRow += ASCsvHeader.linebreakString;
            return headerRow;
        };
        /**
         * Creates an AS CSV header from the IASCsvHeader interface.
         *
         * @static
         * @param {IASCsvHeader} headerData
         * @returns {ASCsvHeader}
         * @memberof ASCsvHeader
         */
        ASCsvHeader.buildASCsvHeaderFromInterface = function (headerData) {
            var header = new ASCsvHeader();
            header.title = headerData.title;
            header.starttrigger = headerData.starttrigger;
            header.rows = headerData.rows;
            header.formula = headerData.formula;
            header.xunit = headerData.xunit;
            header.yunit = headerData.yunit;
            return header;
        };
        /**
         * Creates an ASCsv header from the data.
         *
         * @static
         * @param {string} title
         * @param {Date} starttrigger
         * @param {number} rows
         * @param {string} [xunit]
         * @param {string} [yunit]
         * @param {string} [formula]
         * @returns {ASCsvHeader}
         * @memberof ASCsvHeader
         */
        ASCsvHeader.buildASCsvHeaderFromData = function (title, starttrigger, rows, xunit, yunit, formula) {
            var header = new ASCsvHeader();
            header.title = title;
            header.starttrigger = starttrigger;
            header.rows = rows;
            if (formula) {
                header.formula = formula;
            }
            if (xunit) {
                header.xunit = xunit;
            }
            if (yunit) {
                header.yunit = yunit;
            }
            return header;
        };
        /**
         * Creates an AS CSV header from a string containing an AS CSV formatted headerrow.
         * Can throw TraceDataConversionError.
         *
         * @static
         * @param {string} headerRow
         * @param {Date} backupDate
         * @returns {ASCsvHeader}
         * @memberof ASCsvHeader
         */
        ASCsvHeader.buildASCsvHeaderFromString = function (headerRow, backupDate) {
            var header = new ASCsvHeader();
            var titleStr = ASCsvHeader.getTextAttribute(ASCsvHeader.title_attributeName, headerRow);
            var titleParts = titleStr.split(',');
            header.title = ASCsvHeader.tryRemoveStartTrigger(titleStr);
            if (titleParts.length >= 3) {
                header.starttrigger = ASCsvHeader.parseStarttriggerDate(titleParts[titleParts.length - 2], titleParts[titleParts.length - 1]);
            }
            else {
                header.starttrigger = backupDate;
            }
            header.rows = ASCsvHeader.getNumberAttribute(ASCsvHeader.rows_attributeName, headerRow);
            header.xunit = ASCsvHeader.getTextAttribute(ASCsvHeader.xunit_attributeName, headerRow);
            header.yunit = ASCsvHeader.getTextAttribute(ASCsvHeader.yunit_attributeName, headerRow);
            header.formula = ASCsvHeader.getTextAttribute(ASCsvHeader.formula_attributeName, headerRow);
            return header;
        };
        /**
         * Tries to remove the starttrigger of the title of an AS CSV signal and return the title without the starttrigger.
         * If the substring representing the starttrigger can not be determined, it returns the title without changes.
         *
         * @static
         * @param {string} title
         * @returns {string}
         * @memberof ASCsvHeader
         */
        ASCsvHeader.tryRemoveStartTrigger = function (title) {
            var startTriggerSeperator = ',';
            var signalName = title;
            var titleParts = title.split(startTriggerSeperator);
            if (titleParts.length >= 3) {
                if ((/..\/..\/../.exec(titleParts[titleParts.length - 2]) != null) && (/..:..:../.exec(titleParts[titleParts.length - 1]) != null)) {
                    signalName = titleParts.slice(0, titleParts.length - 2).join(startTriggerSeperator);
                }
            }
            return signalName;
        };
        /**
         * Tries to extract the column seperator of an ASCsv formatted string.
         * Can throw TraceDataConversionError.
         *
         * @static
         * @param {string} data
         * @returns {string}
         * @memberof ASCsvHeader
         */
        ASCsvHeader.tryGetColumnSeperator = function (data) {
            var colSepAttributString = this.getTextAttribute(ASCsvHeader.columnSeperator_attributeName, data);
            switch (colSepAttributString) {
                case "SEMICOLON":
                    return ';';
                case "COMMA":
                    return ',';
                default:
                    throw traceDataConversionError_1.TraceDataConversionError.build(traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.UNKNOWN_COLSEP);
            }
        };
        /**
         * Returns comma seperator to given column seperator.
         * Can throw TraceDataConversionError.
         *
         * @static
         * @param {string} colsep
         * @returns {string}
         * @memberof ASCsvHeader
         */
        ASCsvHeader.getCommaSeperatorToColumnSeperator = function (colsep) {
            var comsep = "";
            switch (colsep) {
                case ';':
                    comsep = ',';
                    break;
                case ',':
                    comsep = '.';
                    break;
                default:
                    throw traceDataConversionError_1.TraceDataConversionError.build(traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.UNKNOWN_COLSEP);
            }
            return comsep;
        };
        /**
         * Returns formatted date mm/dd/yy  m=month in UTC
         *
         * @private
         * @static
         * @param {Date} date
         * @returns
         * @memberof ASCsvHeader
         */
        ASCsvHeader.retrieveFormattedDate = function (date) {
            var options = {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit',
                timeZone: 'UTC'
            };
            return new Intl.DateTimeFormat('en-US', options).format(date);
        };
        /**
         * Returns formatted time in hh/mm/ss  m=minute in UTC
         *
         * @private
         * @static
         * @param {Date} date
         * @returns
         * @memberof ASCsvHeader
         */
        ASCsvHeader.retrieveFormattedTime = function (date) {
            var options = {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZone: 'UTC'
            };
            return new Intl.DateTimeFormat('en-US', options).format(date);
        };
        /**
         * Creates the COLSEP attribute based on the given column seperator.
         * Throws error "unrecognised column seperator" if column seperator is not known
         * Can throw TraceDataConversionError.
         *
         * @private
         * @static
         * @param {string} colsep
         * @returns {string}
         * @memberof ASCsvHeader
         */
        ASCsvHeader.createColsepAttribute = function (colsep) {
            var colsepAttribute = '';
            switch (colsep) {
                case ";":
                    // Set COLSEP attribute for DE
                    colsepAttribute = ASCsvHeader.columnSeperator_attributeName + "=\"SEMICOLON\"";
                    break;
                case ",":
                    // Set COLSEP attribute for EN
                    colsepAttribute = ASCsvHeader.columnSeperator_attributeName + "=\"COMMA\"";
                    break;
                default:
                    throw traceDataConversionError_1.TraceDataConversionError.build(traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.UNKNOWN_COLSEP);
            }
            return colsepAttribute;
        };
        /**
         * Extracts text from an attribute based on its name.
         * Can throw TraceDataConversionError.
         *
         * @private
         * @static
         * @param {string} attributeName
         * @param {string} instr
         * @returns {string}
         * @memberof ASCsvHeader
         */
        ASCsvHeader.getTextAttribute = function (attributeName, instr) {
            var regex = new RegExp(attributeName + "=\"([^\"]+)");
            var arr = regex.exec(instr);
            if (arr) {
                return arr[1];
            }
            else {
                throw traceDataConversionError_1.TraceDataConversionError.build(traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.MISSING_ATTRIBUTE, attributeName);
            }
        };
        /**
         * Extracts a number an attribute based on its name.
         * Can throw TraceDataConversionError.
         *
         * @private
         * @static
         * @param {string} attributeName
         * @param {string} instr
         * @returns {number}
         * @memberof ASCsvHeader
         */
        ASCsvHeader.getNumberAttribute = function (attributeName, instr) {
            var regex = new RegExp(attributeName + "=([^ ]+)");
            var arr = regex.exec(instr);
            if (arr) {
                return Number(arr[1]);
            }
            else {
                throw traceDataConversionError_1.TraceDataConversionError.build(traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.MISSING_ATTRIBUTE, attributeName);
            }
        };
        /**
         * Parses a UTC date string in format mm/dd/yy (m = month) and a UTC time in format hh:mm:ss (m = minutes) into a Date object.
         *
         * @private
         * @static
         * @param {string} dateStr
         * @param {string} timeStr
         * @returns {Date}
         * @memberof ASCsvHeader
         */
        ASCsvHeader.parseStarttriggerDate = function (dateStr, timeStr) {
            var dateArr = dateStr.split('/');
            var timeArr = timeStr.split(':');
            var year = 2000 + Number(dateArr[2]);
            var month = Number(dateArr[0]) - 1; // months start counting at 0; valid range is 0 to 11
            var dayInMonth = Number(dateArr[1]); // days start counting at 1
            var hours = Number(timeArr[0]);
            var minutes = Number(timeArr[1]);
            var seconds = Number(Number(timeArr[2]));
            var milliseconds = 0; // set to zero to have the same defined value for all dates
            var starttrigger = new Date((Date.UTC(year, month, dayInMonth, hours, minutes, seconds, milliseconds)));
            return starttrigger;
        };
        /**
         * Builds the title attribute string.
         * Adds the given starttrigger formatted as a UTC date string in format mm/dd/yy (m = month) and a UTC time string in format hh:mm:ss (m = minutes) to the given title.
         *
         * @static
         * @param {string} title
         * @param {Date} starttrigger
         * @returns {string}
         * @memberof ASCsvHeader
         */
        ASCsvHeader.buildTitleAttributeString = function (title, starttrigger) {
            return title + ", " + ASCsvHeader.retrieveFormattedDate(starttrigger) + ", " + ASCsvHeader.retrieveFormattedTime(starttrigger);
        };
        /**
         * Checks if the IASCsvHeader describes a original signal.
         * A original signal has no calculation information (other than indicating it contains original data) in the formula attribute of its header.
         *
         * @static
         * @param {IASCsvHeader} signal
         * @returns {boolean}
         * @memberof ASCsvHeader
         */
        ASCsvHeader.isOriginalASCsvSignal = function (signal) {
            var isOriginal = false;
            if (signal.formula === ASCsvHeader.originalDataFormula || signal.formula === ("Y={" + ASCsvHeader.originalDataFormula + "}")) {
                isOriginal = true;
            }
            return isOriginal;
        };
        // static meta information used in convertion process
        ASCsvHeader.linebreakString = "\r\n";
        ASCsvHeader.originalDataFormula = "DO_NOT_CHANGE_ORIGINAL_DATA";
        ASCsvHeader.type_attribute = "TYPE=CHART-DATA-ASCII";
        ASCsvHeader.version_attributeName = "V";
        ASCsvHeader.title_attributeName = "TITLE";
        ASCsvHeader.xunit_attributeName = "XUNIT";
        ASCsvHeader.yunit_attributeName = "YUNIT";
        ASCsvHeader.formula_attributeName = "FORMULA";
        ASCsvHeader.rows_attributeName = "ROWS";
        ASCsvHeader.columns_attributeName = "COLS";
        ASCsvHeader.columnSeperator_attributeName = "COLSEP";
        return ASCsvHeader;
    }());
    exports.ASCsvHeader = ASCsvHeader;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQVNDc3ZIZWFkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi90cmFjZURhdGFDb252ZXJzaW9uL2NsYXNzZXMvQVNDc3ZIZWFkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBS0E7Ozs7OztPQU1HO0lBQ0g7UUF5Qkk7Ozs7V0FJRztRQUNIO1lBZE8sVUFBSyxHQUFVLEVBQUUsQ0FBQztZQUNsQixpQkFBWSxHQUFRLElBQUksSUFBSSxFQUFFLENBQUM7WUFDL0IsVUFBSyxHQUFVLE9BQU8sQ0FBQztZQUN2QixVQUFLLEdBQVUsT0FBTyxDQUFDO1lBQ3ZCLFNBQUksR0FBVSxDQUFDLENBQUMsQ0FBQztZQUNqQixZQUFPLEdBQVUsV0FBVyxDQUFDLG1CQUFtQixDQUFDO1FBU2pDLENBQUM7UUFHeEI7Ozs7Ozs7O1dBUUc7UUFDSSwwQ0FBb0IsR0FBM0IsVUFBNEIsTUFBYyxFQUFFLE1BQWM7WUFFdEQsSUFBSSxTQUFTLEdBQVUsRUFBRSxDQUFDO1lBRTFCLFNBQVMsR0FBRSxJQUFJLENBQUM7WUFDaEIsU0FBUyxJQUFJLFdBQVcsQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDO1lBQzlDLFNBQVMsSUFBSSxXQUFXLENBQUMscUJBQXFCLEdBQUcsSUFBSSxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDdEUsU0FBUyxJQUFJLFdBQVcsQ0FBQyxtQkFBbUIsR0FBRyxLQUFJLEdBQUcsV0FBVyxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEtBQUksQ0FBQztZQUNsSSxTQUFTLElBQUksV0FBVyxDQUFDLG1CQUFtQixHQUFHLEtBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQztZQUN4RSxTQUFTLElBQUksV0FBVyxDQUFDLG1CQUFtQixHQUFHLEtBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFH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VSxHQUFHLENBQUM7UUFDbkMsK0JBQW1CLEdBQVUsT0FBTyxDQUFDO1FBQ3JDLCtCQUFtQixHQUFVLE9BQU8sQ0FBQztRQUNyQywrQkFBbUIsR0FBVSxPQUFPLENBQUM7UUFDckMsaUNBQXFCLEdBQVUsU0FBUyxDQUFDO1FBQ3pDLDhCQUFrQixHQUFVLE1BQU0sQ0FBQztRQUNuQyxpQ0FBcUIsR0FBVSxNQUFNLENBQUM7UUFDdEMseUNBQTZCLEdBQVUsUUFBUSxDQUFDO1FBOFo1RSxrQkFBQztLQUFBLEFBM2FELElBMmFDO0lBRVEsa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQVNDc3ZIZWFkZXIgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9JQVNDc3ZIZWFkZXJcIjtcclxuaW1wb3J0IHsgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yVHlwZXMgfSBmcm9tIFwiLi4vZW51bXMvdHJhY2VEYXRhQ29udmVyc2lvbkVycm9yVHlwZXNcIjtcclxuaW1wb3J0IHsgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yIH0gZnJvbSBcIi4uL2V4Y2VwdGlvbnMvdHJhY2VEYXRhQ29udmVyc2lvbkVycm9yXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgYSBoZWFkZXIgcm93IG9mIHRoZSBBUyBDU1YgZm9ybWF0LlxyXG4gKiBDb250YWlucyB0aGUga25vd2xlZGdlIHRvIHJlYWQgb3Igd3JpdGUgYW4gQVNDc3YgZm9ybWF0dGVkIGhlYWRlciByb3cuXHJcbiAqXHJcbiAqIEBjbGFzcyBBU0NzdkhlYWRlclxyXG4gKiBAaW1wbGVtZW50cyB7SUFTQ3N2SGVhZGVyfVxyXG4gKi9cclxuY2xhc3MgQVNDc3ZIZWFkZXIgaW1wbGVtZW50cyBJQVNDc3ZIZWFkZXIge1xyXG5cclxuICAgIC8vIHN0YXRpYyBtZXRhIGluZm9ybWF0aW9uIHVzZWQgaW4gY29udmVydGlvbiBwcm9jZXNzXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGxpbmVicmVha1N0cmluZzogc3RyaW5nPSBcIlxcclxcblwiO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBvcmlnaW5hbERhdGFGb3JtdWxhID0gXCJET19OT1RfQ0hBTkdFX09SSUdJTkFMX0RBVEFcIjtcclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IHR5cGVfYXR0cmlidXRlOiBzdHJpbmc9ICBcIlRZUEU9Q0hBUlQtREFUQS1BU0NJSVwiO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgdmVyc2lvbl9hdHRyaWJ1dGVOYW1lOiBzdHJpbmc9IFwiVlwiO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgdGl0bGVfYXR0cmlidXRlTmFtZTogc3RyaW5nPSBcIlRJVExFXCI7XHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSB4dW5pdF9hdHRyaWJ1dGVOYW1lOiBzdHJpbmc9IFwiWFVOSVRcIjtcclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IHl1bml0X2F0dHJpYnV0ZU5hbWU6IHN0cmluZz0gXCJZVU5JVFwiO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgZm9ybXVsYV9hdHRyaWJ1dGVOYW1lOiBzdHJpbmc9IFwiRk9STVVMQVwiO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgcm93c19hdHRyaWJ1dGVOYW1lOiBzdHJpbmc9IFwiUk9XU1wiO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgY29sdW1uc19hdHRyaWJ1dGVOYW1lOiBzdHJpbmc9IFwiQ09MU1wiO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgY29sdW1uU2VwZXJhdG9yX2F0dHJpYnV0ZU5hbWU6IHN0cmluZz0gXCJDT0xTRVBcIjtcclxuXHJcblxyXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmc9IFwiXCI7XHJcbiAgICBwdWJsaWMgc3RhcnR0cmlnZ2VyOiBEYXRlPSBuZXcgRGF0ZSgpO1xyXG4gICAgcHVibGljIHh1bml0OiBzdHJpbmc9IFwiVW5pdFhcIjtcclxuICAgIHB1YmxpYyB5dW5pdDogc3RyaW5nPSBcIlVuaXRZXCI7XHJcbiAgICBwdWJsaWMgcm93czogbnVtYmVyPSAtMTtcclxuICAgIHB1YmxpYyBmb3JtdWxhOiBzdHJpbmc9IEFTQ3N2SGVhZGVyLm9yaWdpbmFsRGF0YUZvcm11bGE7XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQVNDc3ZIZWFkZXIuXHJcbiAgICAgKiBBY2Nlc3NvciBwcml2YXRlIHRvIGZvcmNlIHVzZSBvZiBGYWN0b3J5IG1ldGhvZHMuXHJcbiAgICAgKiBAbWVtYmVyb2YgQVNDc3ZIZWFkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RyaW5naWZpZXMgdGhlIGhlYWRlciBpbiBhbiBBU0NzdiBmb3JtYXR0ZWQgaGVhZGVyIHJvdyB3aXRoIGxpbmVicmVhay5cclxuICAgICAqIENhbiB0aHJvdyBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21zZXBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb2xzZXBcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQVNDc3ZIZWFkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0cmluZ2lmeUFTQ3N2SGVhZGVyKGNvbXNlcDogc3RyaW5nLCBjb2xzZXA6IHN0cmluZykgOiBzdHJpbmcge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBoZWFkZXJSb3c6IHN0cmluZz0gJyc7XHJcblxyXG4gICAgICAgIGhlYWRlclJvdz0gXCIlIFwiO1xyXG4gICAgICAgIGhlYWRlclJvdyArPSBBU0NzdkhlYWRlci50eXBlX2F0dHJpYnV0ZSArIFwiIFwiO1xyXG4gICAgICAgIGhlYWRlclJvdyArPSBBU0NzdkhlYWRlci52ZXJzaW9uX2F0dHJpYnV0ZU5hbWUgKyBcIj0yXCIgKyBjb21zZXAgKyBcIjAgXCI7XHJcbiAgICAgICAgaGVhZGVyUm93ICs9IEFTQ3N2SGVhZGVyLnRpdGxlX2F0dHJpYnV0ZU5hbWUgKyBgPVwiYCArIEFTQ3N2SGVhZGVyLmJ1aWxkVGl0bGVBdHRyaWJ1dGVTdHJpbmcodGhpcy50aXRsZSwgdGhpcy5zdGFydHRyaWdnZXIpICsgYFwiIGA7XHJcbiAgICAgICAgaGVhZGVyUm93ICs9IEFTQ3N2SGVhZGVyLnh1bml0X2F0dHJpYnV0ZU5hbWUgKyBgPVwiYCArIHRoaXMueHVuaXQgKyBgXCIgYDtcclxuICAgICAgICBoZWFkZXJSb3cgKz0gQVNDc3ZIZWFkZXIueXVuaXRfYXR0cmlidXRlTmFtZSArIGA9XCJgICsgdGhpcy55dW5pdCArIGBcIiBgO1xyXG4gICAgICAgIGhlYWRlclJvdyArPSBBU0NzdkhlYWRlci5mb3JtdWxhX2F0dHJpYnV0ZU5hbWUgKyBgPVwiYCArIHRoaXMuZm9ybXVsYSArIGBcIiBgO1xyXG4gICAgICAgIGhlYWRlclJvdyArPSBBU0NzdkhlYWRlci5yb3dzX2F0dHJpYnV0ZU5hbWUgKyBcIj1cIiArIHRoaXMucm93cyArIFwiIFwiO1xyXG4gICAgICAgIGhlYWRlclJvdyArPSBBU0NzdkhlYWRlci5jb2x1bW5zX2F0dHJpYnV0ZU5hbWUgKyBcIj0yIFwiO1xyXG5cclxuICAgICAgICBoZWFkZXJSb3cgKz0gQVNDc3ZIZWFkZXIuY3JlYXRlQ29sc2VwQXR0cmlidXRlKGNvbHNlcCkgKyBcIiBcIjtcclxuXHJcbiAgICAgICAgaGVhZGVyUm93ICs9IGNvbHNlcDtcclxuICAgICAgICBoZWFkZXJSb3cgKz0gQVNDc3ZIZWFkZXIubGluZWJyZWFrU3RyaW5nO1xyXG5cclxuICAgICAgICByZXR1cm4gaGVhZGVyUm93O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gQVMgQ1NWIGhlYWRlciBmcm9tIHRoZSBJQVNDc3ZIZWFkZXIgaW50ZXJmYWNlLlxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7SUFTQ3N2SGVhZGVyfSBoZWFkZXJEYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7QVNDc3ZIZWFkZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgQVNDc3ZIZWFkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBidWlsZEFTQ3N2SGVhZGVyRnJvbUludGVyZmFjZShoZWFkZXJEYXRhOiBJQVNDc3ZIZWFkZXIpOiBBU0NzdkhlYWRlciB7XHJcblxyXG4gICAgICAgIGxldCBoZWFkZXI6IEFTQ3N2SGVhZGVyPSBuZXcgQVNDc3ZIZWFkZXIoKTtcclxuXHJcbiAgICAgICAgaGVhZGVyLnRpdGxlPSBoZWFkZXJEYXRhLnRpdGxlO1xyXG4gICAgICAgIGhlYWRlci5zdGFydHRyaWdnZXI9IGhlYWRlckRhdGEuc3RhcnR0cmlnZ2VyO1xyXG4gICAgICAgIGhlYWRlci5yb3dzPSBoZWFkZXJEYXRhLnJvd3M7XHJcbiAgICAgICAgaGVhZGVyLmZvcm11bGE9IGhlYWRlckRhdGEuZm9ybXVsYTtcclxuICAgICAgICBoZWFkZXIueHVuaXQ9IGhlYWRlckRhdGEueHVuaXQ7XHJcbiAgICAgICAgaGVhZGVyLnl1bml0PSBoZWFkZXJEYXRhLnl1bml0O1xyXG5cclxuICAgICAgICByZXR1cm4gaGVhZGVyO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gQVNDc3YgaGVhZGVyIGZyb20gdGhlIGRhdGEuXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXHJcbiAgICAgKiBAcGFyYW0ge0RhdGV9IHN0YXJ0dHJpZ2dlclxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJvd3NcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbeHVuaXRdXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3l1bml0XVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtmb3JtdWxhXVxyXG4gICAgICogQHJldHVybnMge0FTQ3N2SGVhZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIEFTQ3N2SGVhZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgYnVpbGRBU0NzdkhlYWRlckZyb21EYXRhKHRpdGxlOiBzdHJpbmcsIHN0YXJ0dHJpZ2dlcjogRGF0ZSwgcm93czogbnVtYmVyLCB4dW5pdD86IHN0cmluZywgeXVuaXQ/OnN0cmluZywgZm9ybXVsYT86IHN0cmluZyApOiBBU0NzdkhlYWRlciB7XHJcblxyXG4gICAgICAgIGxldCBoZWFkZXI6IEFTQ3N2SGVhZGVyPSBuZXcgQVNDc3ZIZWFkZXIoKTtcclxuXHJcbiAgICAgICAgaGVhZGVyLnRpdGxlPSB0aXRsZTtcclxuICAgICAgICBoZWFkZXIuc3RhcnR0cmlnZ2VyPSBzdGFydHRyaWdnZXI7XHJcbiAgICAgICAgaGVhZGVyLnJvd3M9IHJvd3M7XHJcbiAgICAgICAgaWYoZm9ybXVsYSkge1xyXG5cclxuICAgICAgICAgICAgaGVhZGVyLmZvcm11bGE9IGZvcm11bGE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHh1bml0KSB7XHJcblxyXG4gICAgICAgICAgICBoZWFkZXIueHVuaXQ9IHh1bml0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih5dW5pdCkge1xyXG5cclxuICAgICAgICAgICAgaGVhZGVyLnl1bml0PSB5dW5pdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBoZWFkZXI7XHJcbiAgICB9IFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gQVMgQ1NWIGhlYWRlciBmcm9tIGEgc3RyaW5nIGNvbnRhaW5pbmcgYW4gQVMgQ1NWIGZvcm1hdHRlZCBoZWFkZXJyb3cuXHJcbiAgICAgKiBDYW4gdGhyb3cgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yLlxyXG4gICAgICogXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaGVhZGVyUm93XHJcbiAgICAgKiBAcGFyYW0ge0RhdGV9IGJhY2t1cERhdGVcclxuICAgICAqIEByZXR1cm5zIHtBU0NzdkhlYWRlcn1cclxuICAgICAqIEBtZW1iZXJvZiBBU0NzdkhlYWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGJ1aWxkQVNDc3ZIZWFkZXJGcm9tU3RyaW5nKGhlYWRlclJvdzogc3RyaW5nLCBiYWNrdXBEYXRlOiBEYXRlKTogQVNDc3ZIZWFkZXIge1xyXG5cclxuICAgICAgICBsZXQgaGVhZGVyOiBBU0NzdkhlYWRlcj0gbmV3IEFTQ3N2SGVhZGVyKCk7XHJcblxyXG4gICAgICAgIGxldCB0aXRsZVN0cjogc3RyaW5nID0gQVNDc3ZIZWFkZXIuZ2V0VGV4dEF0dHJpYnV0ZShBU0NzdkhlYWRlci50aXRsZV9hdHRyaWJ1dGVOYW1lLCBoZWFkZXJSb3cpO1xyXG4gICAgICAgIGxldCB0aXRsZVBhcnRzOiBBcnJheTxzdHJpbmc+PSB0aXRsZVN0ci5zcGxpdCgnLCcpO1xyXG5cclxuICAgICAgICBoZWFkZXIudGl0bGU9IEFTQ3N2SGVhZGVyLnRyeVJlbW92ZVN0YXJ0VHJpZ2dlcih0aXRsZVN0cik7XHJcblxyXG4gICAgICAgIGlmKHRpdGxlUGFydHMubGVuZ3RoID49IDMpe1xyXG5cclxuICAgICAgICAgICAgaGVhZGVyLnN0YXJ0dHJpZ2dlcj0gQVNDc3ZIZWFkZXIucGFyc2VTdGFydHRyaWdnZXJEYXRlKHRpdGxlUGFydHNbdGl0bGVQYXJ0cy5sZW5ndGgtMl0sIHRpdGxlUGFydHNbdGl0bGVQYXJ0cy5sZW5ndGgtMV0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBoZWFkZXIuc3RhcnR0cmlnZ2VyPSBiYWNrdXBEYXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaGVhZGVyLnJvd3M9IEFTQ3N2SGVhZGVyLmdldE51bWJlckF0dHJpYnV0ZShBU0NzdkhlYWRlci5yb3dzX2F0dHJpYnV0ZU5hbWUsIGhlYWRlclJvdyk7XHJcbiAgICAgICAgaGVhZGVyLnh1bml0PSBBU0NzdkhlYWRlci5nZXRUZXh0QXR0cmlidXRlKEFTQ3N2SGVhZGVyLnh1bml0X2F0dHJpYnV0ZU5hbWUsIGhlYWRlclJvdyk7XHJcbiAgICAgICAgaGVhZGVyLnl1bml0PSBBU0NzdkhlYWRlci5nZXRUZXh0QXR0cmlidXRlKEFTQ3N2SGVhZGVyLnl1bml0X2F0dHJpYnV0ZU5hbWUsIGhlYWRlclJvdyk7XHJcbiAgICAgICAgaGVhZGVyLmZvcm11bGE9IEFTQ3N2SGVhZGVyLmdldFRleHRBdHRyaWJ1dGUoQVNDc3ZIZWFkZXIuZm9ybXVsYV9hdHRyaWJ1dGVOYW1lLCBoZWFkZXJSb3cpO1xyXG5cclxuICAgICAgICByZXR1cm4gaGVhZGVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJpZXMgdG8gcmVtb3ZlIHRoZSBzdGFydHRyaWdnZXIgb2YgdGhlIHRpdGxlIG9mIGFuIEFTIENTViBzaWduYWwgYW5kIHJldHVybiB0aGUgdGl0bGUgd2l0aG91dCB0aGUgc3RhcnR0cmlnZ2VyLlxyXG4gICAgICogSWYgdGhlIHN1YnN0cmluZyByZXByZXNlbnRpbmcgdGhlIHN0YXJ0dHJpZ2dlciBjYW4gbm90IGJlIGRldGVybWluZWQsIGl0IHJldHVybnMgdGhlIHRpdGxlIHdpdGhvdXQgY2hhbmdlcy5cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQVNDc3ZIZWFkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyB0cnlSZW1vdmVTdGFydFRyaWdnZXIodGl0bGU6IHN0cmluZyk6IHN0cmluZyB7XHJcblxyXG4gICAgICAgIGxldCBzdGFydFRyaWdnZXJTZXBlcmF0b3IgPSAnLCc7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHNpZ25hbE5hbWU6IHN0cmluZyA9IHRpdGxlO1xyXG4gICAgICAgIGxldCB0aXRsZVBhcnRzOiBBcnJheTxzdHJpbmc+ID0gdGl0bGUuc3BsaXQoc3RhcnRUcmlnZ2VyU2VwZXJhdG9yKTtcclxuICAgICAgICBpZih0aXRsZVBhcnRzLmxlbmd0aCA+PSAzKSB7XHJcblxyXG4gICAgICAgICAgICBpZigoLy4uXFwvLi5cXC8uLi8uZXhlYyh0aXRsZVBhcnRzW3RpdGxlUGFydHMubGVuZ3RoLTJdKSAhPSBudWxsKSAmJiAoLy4uOi4uOi4uLy5leGVjKHRpdGxlUGFydHNbdGl0bGVQYXJ0cy5sZW5ndGgtMV0pICE9IG51bGwpKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHNpZ25hbE5hbWUgPSB0aXRsZVBhcnRzLnNsaWNlKDAsIHRpdGxlUGFydHMubGVuZ3RoLTIpLmpvaW4oc3RhcnRUcmlnZ2VyU2VwZXJhdG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNpZ25hbE5hbWVcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogVHJpZXMgdG8gZXh0cmFjdCB0aGUgY29sdW1uIHNlcGVyYXRvciBvZiBhbiBBU0NzdiBmb3JtYXR0ZWQgc3RyaW5nLlxyXG4gICAgICogQ2FuIHRocm93IFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvci5cclxuICAgICAqIFxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRhdGFcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQVNDc3ZIZWFkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyB0cnlHZXRDb2x1bW5TZXBlcmF0b3IoZGF0YTogc3RyaW5nKTogc3RyaW5ne1xyXG5cclxuICAgICAgICBsZXQgY29sU2VwQXR0cmlidXRTdHJpbmcgPSB0aGlzLmdldFRleHRBdHRyaWJ1dGUoQVNDc3ZIZWFkZXIuY29sdW1uU2VwZXJhdG9yX2F0dHJpYnV0ZU5hbWUsIGRhdGEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHN3aXRjaChjb2xTZXBBdHRyaWJ1dFN0cmluZykge1xyXG4gICAgICAgICAgICBjYXNlIFwiU0VNSUNPTE9OXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJzsnO1xyXG4gICAgICAgICAgICBjYXNlIFwiQ09NTUFcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiAnLCc7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFxyXG4gICAgICAgICAgICAgICAgdGhyb3cgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yLmJ1aWxkKFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvclR5cGVzLlVOS05PV05fQ09MU0VQKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBjb21tYSBzZXBlcmF0b3IgdG8gZ2l2ZW4gY29sdW1uIHNlcGVyYXRvci5cclxuICAgICAqIENhbiB0aHJvdyBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IuXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbHNlcFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBBU0NzdkhlYWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldENvbW1hU2VwZXJhdG9yVG9Db2x1bW5TZXBlcmF0b3IoY29sc2VwOiBzdHJpbmcpOiBzdHJpbmcge1xyXG5cclxuICAgICAgICBsZXQgY29tc2VwPSBcIlwiO1xyXG5cclxuICAgICAgICBzd2l0Y2goY29sc2VwKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJzsnOlxyXG4gICAgICAgICAgICAgICAgY29tc2VwPSAnLCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnLCc6XHJcbiAgICAgICAgICAgICAgICBjb21zZXA9ICcuJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhyb3cgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yLmJ1aWxkKFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvclR5cGVzLlVOS05PV05fQ09MU0VQKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb21zZXA7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBmb3JtYXR0ZWQgZGF0ZSBtbS9kZC95eSAgbT1tb250aCBpbiBVVEMgXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBBU0NzdkhlYWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyByZXRyaWV2ZUZvcm1hdHRlZERhdGUoZGF0ZTogRGF0ZSkge1xyXG5cclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgeWVhcjogJzItZGlnaXQnLFxyXG4gICAgICAgICAgICBtb250aDogJzItZGlnaXQnLCBcclxuICAgICAgICAgICAgZGF5OiAnMi1kaWdpdCcsXHJcbiAgICAgICAgICAgIHRpbWVab25lOiAnVVRDJ1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KCdlbi1VUycsb3B0aW9ucykuZm9ybWF0KGRhdGUpXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGZvcm1hdHRlZCB0aW1lIGluIGhoL21tL3NzICBtPW1pbnV0ZSBpbiBVVENcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtEYXRlfSBkYXRlXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIEFTQ3N2SGVhZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHJldHJpZXZlRm9ybWF0dGVkVGltZShkYXRlOkRhdGUpIHtcclxuXHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7IFxyXG4gICAgICAgICAgICBob3VyMTI6IGZhbHNlLFxyXG4gICAgICAgICAgXHRob3VyOiAnMi1kaWdpdCcsXHJcbiAgICAgICAgICAgIG1pbnV0ZTogJzItZGlnaXQnLCBcclxuICAgICAgICAgICAgc2Vjb25kOiAnMi1kaWdpdCcsXHJcbiAgICAgICAgICAgIHRpbWVab25lOiAnVVRDJ1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KCdlbi1VUycsb3B0aW9ucykuZm9ybWF0KGRhdGUpXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgQ09MU0VQIGF0dHJpYnV0ZSBiYXNlZCBvbiB0aGUgZ2l2ZW4gY29sdW1uIHNlcGVyYXRvci5cclxuICAgICAqIFRocm93cyBlcnJvciBcInVucmVjb2duaXNlZCBjb2x1bW4gc2VwZXJhdG9yXCIgaWYgY29sdW1uIHNlcGVyYXRvciBpcyBub3Qga25vd25cclxuICAgICAqIENhbiB0aHJvdyBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IuXHJcbiAgICAgKiBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29sc2VwXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIEFTQ3N2SGVhZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGNyZWF0ZUNvbHNlcEF0dHJpYnV0ZShjb2xzZXA6IHN0cmluZyk6IHN0cmluZyB7XHJcblxyXG4gICAgICAgIGxldCBjb2xzZXBBdHRyaWJ1dGU6IHN0cmluZz0gJyc7XHJcblxyXG4gICAgICAgIHN3aXRjaChjb2xzZXApIHtcclxuICAgICAgICBjYXNlIFwiO1wiOlxyXG4gICAgICAgICAgICAvLyBTZXQgQ09MU0VQIGF0dHJpYnV0ZSBmb3IgREVcclxuICAgICAgICAgICAgY29sc2VwQXR0cmlidXRlPSAgQVNDc3ZIZWFkZXIuY29sdW1uU2VwZXJhdG9yX2F0dHJpYnV0ZU5hbWUrYD1cIlNFTUlDT0xPTlwiYDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcIixcIjpcclxuICAgICAgICAgICAgLy8gU2V0IENPTFNFUCBhdHRyaWJ1dGUgZm9yIEVOXHJcbiAgICAgICAgICAgIGNvbHNlcEF0dHJpYnV0ZT0gQVNDc3ZIZWFkZXIuY29sdW1uU2VwZXJhdG9yX2F0dHJpYnV0ZU5hbWUrYD1cIkNPTU1BXCJgO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OiBcclxuICAgICAgICAgICAgdGhyb3cgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yLmJ1aWxkKFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvclR5cGVzLlVOS05PV05fQ09MU0VQKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb2xzZXBBdHRyaWJ1dGU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRXh0cmFjdHMgdGV4dCBmcm9tIGFuIGF0dHJpYnV0ZSBiYXNlZCBvbiBpdHMgbmFtZS5cclxuICAgICAqIENhbiB0aHJvdyBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IuXHJcbiAgICAgKiBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYXR0cmlidXRlTmFtZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGluc3RyXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIEFTQ3N2SGVhZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGdldFRleHRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZTogc3RyaW5nLCBpbnN0cjogc3RyaW5nKTogc3RyaW5nIHtcclxuXHJcbiAgICAgICAgbGV0IHJlZ2V4PSBuZXcgUmVnRXhwKGF0dHJpYnV0ZU5hbWUrXCI9XFxcIihbXlxcXCJdKylcIik7XHJcbiAgICAgICAgbGV0IGFycj0gcmVnZXguZXhlYyhpbnN0cik7XHJcbiAgICAgICAgaWYoYXJyKXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBhcnJbMV07XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aHJvdyBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IuYnVpbGQoVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yVHlwZXMuTUlTU0lOR19BVFRSSUJVVEUsIGF0dHJpYnV0ZU5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEV4dHJhY3RzIGEgbnVtYmVyIGFuIGF0dHJpYnV0ZSBiYXNlZCBvbiBpdHMgbmFtZS5cclxuICAgICAqIENhbiB0aHJvdyBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IuXHJcbiAgICAgKiBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYXR0cmlidXRlTmFtZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGluc3RyXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIEFTQ3N2SGVhZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGdldE51bWJlckF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lOiBzdHJpbmcsIGluc3RyOiBzdHJpbmcpOiBudW1iZXIge1xyXG5cclxuICAgICAgICBsZXQgcmVnZXg9IG5ldyBSZWdFeHAoYXR0cmlidXRlTmFtZStcIj0oW14gXSspXCIpO1xyXG4gICAgICAgIGxldCBhcnI9IHJlZ2V4LmV4ZWMoaW5zdHIpO1xyXG4gICAgICAgIGlmKGFycil7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gTnVtYmVyKGFyclsxXSk7XHJcbiAgICAgICAgfWVsc2V7XHJcblxyXG4gICAgICAgICAgICB0aHJvdyBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IuYnVpbGQoVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yVHlwZXMuTUlTU0lOR19BVFRSSUJVVEUsIGF0dHJpYnV0ZU5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQYXJzZXMgYSBVVEMgZGF0ZSBzdHJpbmcgaW4gZm9ybWF0IG1tL2RkL3l5IChtID0gbW9udGgpIGFuZCBhIFVUQyB0aW1lIGluIGZvcm1hdCBoaDptbTpzcyAobSA9IG1pbnV0ZXMpIGludG8gYSBEYXRlIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRhdGVTdHJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0aW1lU3RyXHJcbiAgICAgKiBAcmV0dXJucyB7RGF0ZX1cclxuICAgICAqIEBtZW1iZXJvZiBBU0NzdkhlYWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBwYXJzZVN0YXJ0dHJpZ2dlckRhdGUoZGF0ZVN0cjpzdHJpbmcsIHRpbWVTdHI6c3RyaW5nKTogRGF0ZXtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGRhdGVBcnI9IGRhdGVTdHIuc3BsaXQoJy8nKTtcclxuICAgICAgICBsZXQgdGltZUFycj0gdGltZVN0ci5zcGxpdCgnOicpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCB5ZWFyID0gMjAwMCtOdW1iZXIoZGF0ZUFyclsyXSk7IFxyXG4gICAgICAgIGxldCBtb250aCA9IE51bWJlcihkYXRlQXJyWzBdKS0xOyAvLyBtb250aHMgc3RhcnQgY291bnRpbmcgYXQgMDsgdmFsaWQgcmFuZ2UgaXMgMCB0byAxMVxyXG4gICAgICAgIGxldCBkYXlJbk1vbnRoID0gTnVtYmVyKGRhdGVBcnJbMV0pOyAvLyBkYXlzIHN0YXJ0IGNvdW50aW5nIGF0IDFcclxuXHJcbiAgICAgICAgbGV0IGhvdXJzID0gTnVtYmVyKHRpbWVBcnJbMF0pO1xyXG4gICAgICAgIGxldCBtaW51dGVzID0gTnVtYmVyKHRpbWVBcnJbMV0pO1xyXG4gICAgICAgIGxldCBzZWNvbmRzID0gTnVtYmVyKE51bWJlcih0aW1lQXJyWzJdKSk7XHJcbiAgICAgICAgbGV0IG1pbGxpc2Vjb25kcyA9IDA7IC8vIHNldCB0byB6ZXJvIHRvIGhhdmUgdGhlIHNhbWUgZGVmaW5lZCB2YWx1ZSBmb3IgYWxsIGRhdGVzXHJcblxyXG4gICAgICAgIGxldCBzdGFydHRyaWdnZXIgPSBuZXcgRGF0ZSgoRGF0ZS5VVEMoeWVhciwgbW9udGgsIGRheUluTW9udGgsIGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzLCBtaWxsaXNlY29uZHMpKSk7XHJcbiAgICBcclxuICAgICAgICByZXR1cm4gc3RhcnR0cmlnZ2VyO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJ1aWxkcyB0aGUgdGl0bGUgYXR0cmlidXRlIHN0cmluZy5cclxuICAgICAqIEFkZHMgdGhlIGdpdmVuIHN0YXJ0dHJpZ2dlciBmb3JtYXR0ZWQgYXMgYSBVVEMgZGF0ZSBzdHJpbmcgaW4gZm9ybWF0IG1tL2RkL3l5IChtID0gbW9udGgpIGFuZCBhIFVUQyB0aW1lIHN0cmluZyBpbiBmb3JtYXQgaGg6bW06c3MgKG0gPSBtaW51dGVzKSB0byB0aGUgZ2l2ZW4gdGl0bGUuXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXHJcbiAgICAgKiBAcGFyYW0ge0RhdGV9IHN0YXJ0dHJpZ2dlclxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBBU0NzdkhlYWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGJ1aWxkVGl0bGVBdHRyaWJ1dGVTdHJpbmcodGl0bGU6IHN0cmluZywgc3RhcnR0cmlnZ2VyOiBEYXRlKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGl0bGUgKyBcIiwgXCIgKyBBU0NzdkhlYWRlci5yZXRyaWV2ZUZvcm1hdHRlZERhdGUoc3RhcnR0cmlnZ2VyKSArIFwiLCBcIiArIEFTQ3N2SGVhZGVyLnJldHJpZXZlRm9ybWF0dGVkVGltZShzdGFydHRyaWdnZXIpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB0aGUgSUFTQ3N2SGVhZGVyIGRlc2NyaWJlcyBhIG9yaWdpbmFsIHNpZ25hbC5cclxuICAgICAqIEEgb3JpZ2luYWwgc2lnbmFsIGhhcyBubyBjYWxjdWxhdGlvbiBpbmZvcm1hdGlvbiAob3RoZXIgdGhhbiBpbmRpY2F0aW5nIGl0IGNvbnRhaW5zIG9yaWdpbmFsIGRhdGEpIGluIHRoZSBmb3JtdWxhIGF0dHJpYnV0ZSBvZiBpdHMgaGVhZGVyLlxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7SUFTQ3N2SGVhZGVyfSBzaWduYWxcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIEFTQ3N2SGVhZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgaXNPcmlnaW5hbEFTQ3N2U2lnbmFsKHNpZ25hbDogSUFTQ3N2SGVhZGVyKTogYm9vbGVhbiB7XHJcblxyXG4gICAgICAgIGxldCBpc09yaWdpbmFsOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmKHNpZ25hbC5mb3JtdWxhID09PSBBU0NzdkhlYWRlci5vcmlnaW5hbERhdGFGb3JtdWxhIHx8IHNpZ25hbC5mb3JtdWxhID09PSAoXCJZPXtcIisgQVNDc3ZIZWFkZXIub3JpZ2luYWxEYXRhRm9ybXVsYStcIn1cIikpIHtcclxuICAgICAgICAgICAgaXNPcmlnaW5hbCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaXNPcmlnaW5hbDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgQVNDc3ZIZWFkZXIgfTsiXX0=