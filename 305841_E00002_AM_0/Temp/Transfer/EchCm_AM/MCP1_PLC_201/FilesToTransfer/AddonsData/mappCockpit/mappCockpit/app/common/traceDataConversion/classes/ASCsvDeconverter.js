define(["require", "exports", "./ASCsvSignalObj", "./CsvDataRow", "./ASCsvHeader", "../enums/traceDataConversionErrorTypes", "../exceptions/traceDataConversionError", "../../../core/types/valuePair"], function (require, exports, ASCsvSignalObj_1, CsvDataRow_1, ASCsvHeader_1, traceDataConversionErrorTypes_1, traceDataConversionError_1, valuePair_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Deconverts an AS CSV string to an array of IASCsvSignal.
     *
     * @class ASCsvDeconverter
     */
    var ASCsvDeconverter = /** @class */ (function () {
        function ASCsvDeconverter() {
        }
        /**
         * Deconverts an ASCsv formatted csv string into an array of IASCsvSignal.
         * Can throw TraceDataConversionError.
         *
         * @param {string} csvString
         * @returns {Array<IASCsvSignal>}
         * @memberof ASCsvDeconverter
         */
        ASCsvDeconverter.prototype.deconvert = function (csvString) {
            var backupDate = new Date();
            var colsep = ASCsvHeader_1.ASCsvHeader.tryGetColumnSeperator(csvString);
            var comsep = ASCsvHeader_1.ASCsvHeader.getCommaSeperatorToColumnSeperator(colsep);
            var csvParts = this.devideCsvInParts(csvString, colsep, comsep);
            var headers = this.processHeaderPart(csvParts.headerRows, backupDate);
            var data = this.processDataPart(csvParts.dataRows, colsep, comsep);
            this.verifyDataMatrix(data, headers.length);
            var signals = this.buildSignals(headers, data);
            return signals;
        };
        /**
         * Splits the csv string into header and data part.
         *
         * @private
         * @param {string} csvString
         * @param {string} colsep
         * @param {string} comsep
         * @returns {Array<Array<string>>}
         * @memberof ASCsvDeconverter
         */
        ASCsvDeconverter.prototype.devideCsvInParts = function (csvString, colsep, comsep) {
            var parts = {
                headerRows: new Array(),
                dataRows: new Array()
            };
            var rows = csvString.split('\n');
            for (var i = 0; i < rows.length; i++) {
                if ((rows[i].search(/%/) !== -1)) {
                    parts.headerRows.push(rows[i]);
                }
                else {
                    parts.dataRows.push(rows[i]);
                }
            }
            return parts;
        };
        /**
         * Builds IASCsvHeaders out of the header rows.
         *
         * @private
         * @param {Array<string>} headerPart
         * @param {Date} backupDate
         * @returns {Array<IASCsvHeader>}
         * @memberof ASCsvDeconverter
         */
        ASCsvDeconverter.prototype.processHeaderPart = function (headerPart, backupDate) {
            var headers = new Array();
            for (var i = 0; i < headerPart.length; i++) {
                var header = ASCsvHeader_1.ASCsvHeader.buildASCsvHeaderFromString(headerPart[i], backupDate);
                headers.push(header);
            }
            return headers;
        };
        /**
         * Builds a data matrix out of the data rows.
         *
         * @private
         * @param {Array<string>} dataPart
         * @param {string} colsep
         * @param {string} comsep
         * @returns {Array<Array<number>>}
         * @memberof ASCsvDeconverter
         */
        ASCsvDeconverter.prototype.processDataPart = function (dataPart, colsep, comsep) {
            var data = new Array();
            for (var i = 0; i < dataPart.length; i++) {
                if (dataPart[i] !== '') {
                    var values = CsvDataRow_1.CsvDataRow.readDataRow(dataPart[i], colsep, comsep);
                    data.push(values);
                }
            }
            return data;
        };
        /**
         * Builds IASCsvSignals from IASCsvHeaders and value pair arrays.
         *
         * @private
         * @param {Array<IASCsvHeader>} headers
         * @param {Array<Array<number>>} values
         * @returns {Array<IASCsvSignal>}
         * @memberof ASCsvDeconverter
         */
        ASCsvDeconverter.prototype.buildSignals = function (headers, values) {
            var signals = new Array();
            var data = this.resolveValueMatrix(values, headers.length);
            for (var i = 0; i < headers.length; i++) {
                var signal = ASCsvSignalObj_1.ASCsvSignalObj.buildASCsvSignalObj(headers[i], data[i]);
                signals.push(signal);
            }
            return signals;
        };
        /**
         * Resolves the number matrix into value pair arrays.
         *
         * @private
         * @param {Array<Array<number>>} matrix
         * @param {number} numberOfSignals
         * @returns {Array<Array<IPoint>>}
         * @memberof ASCsvDeconverter
         */
        ASCsvDeconverter.prototype.resolveValueMatrix = function (matrix, numberOfSignals) {
            var sortedData = new Array();
            for (var i = 0; i < numberOfSignals; i++) {
                var arr = new Array();
                sortedData.push(arr);
            }
            for (var i = 0; i < matrix.length; i++) {
                for (var j = 0; j < matrix[i].length - 1; j += 2) {
                    var value1 = matrix[i][j];
                    var value2 = matrix[i][j + 1];
                    if ((value1 == value1) && (value2 == value2)) {
                        var valuePair = new valuePair_1.ValuePair(value1, value2);
                        sortedData[j / 2].push(valuePair);
                    }
                }
            }
            return sortedData;
        };
        /**
         * Verifies that the data matrix has two columns per signal.
         * Does not trigger exception when there is one additional column because this can happen when there is a colsep at the end of a data row.
         * Can throw TraceDataConversionError.
         *
         * @private
         * @param {number[][]} data
         * @param {number} numberOfSignals
         * @memberof ASCsvDeconverter
         */
        ASCsvDeconverter.prototype.verifyDataMatrix = function (data, numberOfSignals) {
            data.forEach(function (row) {
                if (((row.length - (row.length % 2)) / 2) != numberOfSignals) {
                    throw traceDataConversionError_1.TraceDataConversionError.build(traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.FORMAT_VIOLATION);
                }
            });
        };
        return ASCsvDeconverter;
    }());
    exports.ASCsvDeconverter = ASCsvDeconverter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQVNDc3ZEZWNvbnZlcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3RyYWNlRGF0YUNvbnZlcnNpb24vY2xhc3Nlcy9BU0NzdkRlY29udmVydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQWdCQTs7OztPQUlHO0lBQ0g7UUFBQTtRQXFNQSxDQUFDO1FBbE1HOzs7Ozs7O1dBT0c7UUFDSSxvQ0FBUyxHQUFoQixVQUFpQixTQUFpQjtZQUU5QixJQUFJLFVBQVUsR0FBUSxJQUFJLElBQUksRUFBRSxDQUFDO1lBRWpDLElBQUksTUFBTSxHQUFVLHlCQUFXLENBQUMscUJBQXFCLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDakUsSUFBSSxNQUFNLEdBQVUseUJBQVcsQ0FBQyxrQ0FBa0MsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUUzRSxJQUFJLFFBQVEsR0FBYyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUUzRSxJQUFJLE9BQU8sR0FBdUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFFMUYsSUFBSSxJQUFJLEdBQXdCLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFeEYsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFNUMsSUFBSSxPQUFPLEdBQXVCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRW5FLE9BQU8sT0FBTyxDQUFDO1FBQ25CLENBQUM7UUFJRDs7Ozs7Ozs7O1dBU0c7UUFDSywyQ0FBZ0IsR0FBeEIsVUFBeUIsU0FBaUIsRUFBRSxNQUFjLEVBQUUsTUFBYztZQUV0RSxJ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QUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLElBQUksZUFBZSxFQUFFO29CQUNuRCxNQUFNLG1EQUF3QixDQUFDLEtBQUssQ0FBQyw2REFBNkIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2lCQUN4RjtZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVMLHVCQUFDO0lBQUQsQ0FBQyxBQXJNRCxJQXFNQztJQUNRLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElBU0NzdlNpZ25hbCB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL0lBU0NzdlNpZ25hbFwiO1xyXG5pbXBvcnQgeyBBU0NzdlNpZ25hbE9iaiB9IGZyb20gXCIuL0FTQ3N2U2lnbmFsT2JqXCI7XHJcbmltcG9ydCB7IElBU0NzdkhlYWRlciB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL0lBU0NzdkhlYWRlclwiO1xyXG5pbXBvcnQgeyBDc3ZEYXRhUm93IH0gZnJvbSBcIi4vQ3N2RGF0YVJvd1wiO1xyXG5pbXBvcnQgeyBBU0NzdkhlYWRlciB9IGZyb20gXCIuL0FTQ3N2SGVhZGVyXCI7XHJcbmltcG9ydCB7IFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvclR5cGVzIH0gZnJvbSBcIi4uL2VudW1zL3RyYWNlRGF0YUNvbnZlcnNpb25FcnJvclR5cGVzXCI7XHJcbmltcG9ydCB7IFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvciB9IGZyb20gXCIuLi9leGNlcHRpb25zL3RyYWNlRGF0YUNvbnZlcnNpb25FcnJvclwiO1xyXG5pbXBvcnQgeyBJVmFsdWVQYWlyIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvaW50ZXJmYWNlcy92YWx1ZVBhaXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVmFsdWVQYWlyIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvdHlwZXMvdmFsdWVQYWlyXCI7XHJcblxyXG4vLyBUZW1wb3JhbCB0cmFuc21pc3Npb24gdHlwZSBmb3IgYXMgY3N2IHJvd3Mgc3BsaXQgaW50byBoZWFkZXIgYW5kIGRhdGEgcm93c1xyXG50eXBlIEFzQ3N2UGFydHMgPSB7XHJcbiAgICBoZWFkZXJSb3dzOiBBcnJheTxzdHJpbmc+LFxyXG4gICAgZGF0YVJvd3M6IEFycmF5PHN0cmluZz5cclxufTtcclxuXHJcbi8qKlxyXG4gKiBEZWNvbnZlcnRzIGFuIEFTIENTViBzdHJpbmcgdG8gYW4gYXJyYXkgb2YgSUFTQ3N2U2lnbmFsLlxyXG4gKlxyXG4gKiBAY2xhc3MgQVNDc3ZEZWNvbnZlcnRlclxyXG4gKi9cclxuY2xhc3MgQVNDc3ZEZWNvbnZlcnRlcntcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWNvbnZlcnRzIGFuIEFTQ3N2IGZvcm1hdHRlZCBjc3Ygc3RyaW5nIGludG8gYW4gYXJyYXkgb2YgSUFTQ3N2U2lnbmFsLlxyXG4gICAgICogQ2FuIHRocm93IFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvci5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNzdlN0cmluZ1xyXG4gICAgICogQHJldHVybnMge0FycmF5PElBU0NzdlNpZ25hbD59XHJcbiAgICAgKiBAbWVtYmVyb2YgQVNDc3ZEZWNvbnZlcnRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVjb252ZXJ0KGNzdlN0cmluZzogc3RyaW5nKTogQXJyYXk8SUFTQ3N2U2lnbmFsPiB7XHJcblxyXG4gICAgICAgIGxldCBiYWNrdXBEYXRlOiBEYXRlPSBuZXcgRGF0ZSgpO1xyXG5cclxuICAgICAgICBsZXQgY29sc2VwOiBzdHJpbmc9IEFTQ3N2SGVhZGVyLnRyeUdldENvbHVtblNlcGVyYXRvcihjc3ZTdHJpbmcpO1xyXG4gICAgICAgIGxldCBjb21zZXA6IHN0cmluZz0gQVNDc3ZIZWFkZXIuZ2V0Q29tbWFTZXBlcmF0b3JUb0NvbHVtblNlcGVyYXRvcihjb2xzZXApO1xyXG5cclxuICAgICAgICBsZXQgY3N2UGFydHM6IEFzQ3N2UGFydHM9IHRoaXMuZGV2aWRlQ3N2SW5QYXJ0cyhjc3ZTdHJpbmcsIGNvbHNlcCwgY29tc2VwKTtcclxuXHJcbiAgICAgICAgbGV0IGhlYWRlcnM6IEFycmF5PElBU0NzdkhlYWRlcj49IHRoaXMucHJvY2Vzc0hlYWRlclBhcnQoY3N2UGFydHMuaGVhZGVyUm93cywgYmFja3VwRGF0ZSk7XHJcblxyXG4gICAgICAgIGxldCBkYXRhOiBBcnJheTxBcnJheTxudW1iZXI+Pj0gdGhpcy5wcm9jZXNzRGF0YVBhcnQoY3N2UGFydHMuZGF0YVJvd3MsIGNvbHNlcCwgY29tc2VwKTtcclxuXHJcbiAgICAgICAgdGhpcy52ZXJpZnlEYXRhTWF0cml4KGRhdGEsIGhlYWRlcnMubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgbGV0IHNpZ25hbHM6IEFycmF5PElBU0NzdlNpZ25hbD49IHRoaXMuYnVpbGRTaWduYWxzKGhlYWRlcnMsIGRhdGEpO1xyXG5cclxuICAgICAgICByZXR1cm4gc2lnbmFscztcclxuICAgIH1cclxuICAgIFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNwbGl0cyB0aGUgY3N2IHN0cmluZyBpbnRvIGhlYWRlciBhbmQgZGF0YSBwYXJ0LlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY3N2U3RyaW5nXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29sc2VwXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29tc2VwXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8QXJyYXk8c3RyaW5nPj59XHJcbiAgICAgKiBAbWVtYmVyb2YgQVNDc3ZEZWNvbnZlcnRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRldmlkZUNzdkluUGFydHMoY3N2U3RyaW5nOiBzdHJpbmcsIGNvbHNlcDogc3RyaW5nLCBjb21zZXA6IHN0cmluZyk6IEFzQ3N2UGFydHMge1xyXG5cclxuICAgICAgICBsZXQgcGFydHM6IEFzQ3N2UGFydHM9IHtcclxuICAgICAgICAgICAgaGVhZGVyUm93czogIG5ldyBBcnJheSgpLFxyXG4gICAgICAgICAgICBkYXRhUm93czogbmV3IEFycmF5KClcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsZXQgcm93czogQXJyYXk8c3RyaW5nPj0gY3N2U3RyaW5nLnNwbGl0KCdcXG4nKTtcclxuICAgICAgICBcclxuICAgICAgICBmb3IobGV0IGk6IG51bWJlcj0gMDsgaSA8IHJvd3MubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIGlmKChyb3dzW2ldLnNlYXJjaCgvJS8pICE9PSAtMSkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBwYXJ0cy5oZWFkZXJSb3dzLnB1c2gocm93c1tpXSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHBhcnRzLmRhdGFSb3dzLnB1c2gocm93c1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBwYXJ0cztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCdWlsZHMgSUFTQ3N2SGVhZGVycyBvdXQgb2YgdGhlIGhlYWRlciByb3dzLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IGhlYWRlclBhcnRcclxuICAgICAqIEBwYXJhbSB7RGF0ZX0gYmFja3VwRGF0ZVxyXG4gICAgICogQHJldHVybnMge0FycmF5PElBU0NzdkhlYWRlcj59XHJcbiAgICAgKiBAbWVtYmVyb2YgQVNDc3ZEZWNvbnZlcnRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHByb2Nlc3NIZWFkZXJQYXJ0KGhlYWRlclBhcnQ6IEFycmF5PHN0cmluZz4sIGJhY2t1cERhdGU6IERhdGUpOiBBcnJheTxJQVNDc3ZIZWFkZXI+IHtcclxuXHJcbiAgICAgICAgbGV0IGhlYWRlcnM6IEFycmF5PElBU0NzdkhlYWRlcj49IG5ldyBBcnJheSgpO1xyXG5cclxuICAgICAgICBmb3IobGV0IGk6IG51bWJlcj0gMDsgaSA8IGhlYWRlclBhcnQubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBoZWFkZXI6IElBU0NzdkhlYWRlcj0gQVNDc3ZIZWFkZXIuYnVpbGRBU0NzdkhlYWRlckZyb21TdHJpbmcoaGVhZGVyUGFydFtpXSwgYmFja3VwRGF0ZSk7XHJcbiAgICAgICAgICAgIGhlYWRlcnMucHVzaChoZWFkZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGhlYWRlcnM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQnVpbGRzIGEgZGF0YSBtYXRyaXggb3V0IG9mIHRoZSBkYXRhIHJvd3MuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gZGF0YVBhcnRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb2xzZXBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21zZXBcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxBcnJheTxudW1iZXI+Pn1cclxuICAgICAqIEBtZW1iZXJvZiBBU0NzdkRlY29udmVydGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcHJvY2Vzc0RhdGFQYXJ0KGRhdGFQYXJ0OiBBcnJheTxzdHJpbmc+LCBjb2xzZXA6IHN0cmluZywgY29tc2VwOiBzdHJpbmcpOiBBcnJheTxBcnJheTxudW1iZXI+PiB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGRhdGE6IEFycmF5PEFycmF5PG51bWJlcj4+PSBuZXcgQXJyYXkoKTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpOiBudW1iZXI9IDA7IGkgPCBkYXRhUGFydC5sZW5ndGg7aSsrKSB7XHJcbiAgICAgICAgICAgIGlmKGRhdGFQYXJ0W2ldICE9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlczogQXJyYXk8bnVtYmVyPj0gQ3N2RGF0YVJvdy5yZWFkRGF0YVJvdyhkYXRhUGFydFtpXSwgY29sc2VwLCBjb21zZXApO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5wdXNoKHZhbHVlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJ1aWxkcyBJQVNDc3ZTaWduYWxzIGZyb20gSUFTQ3N2SGVhZGVycyBhbmQgdmFsdWUgcGFpciBhcnJheXMuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SUFTQ3N2SGVhZGVyPn0gaGVhZGVyc1xyXG4gICAgICogQHBhcmFtIHtBcnJheTxBcnJheTxudW1iZXI+Pn0gdmFsdWVzXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SUFTQ3N2U2lnbmFsPn1cclxuICAgICAqIEBtZW1iZXJvZiBBU0NzdkRlY29udmVydGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYnVpbGRTaWduYWxzKGhlYWRlcnM6IEFycmF5PElBU0NzdkhlYWRlcj4sIHZhbHVlczogQXJyYXk8QXJyYXk8bnVtYmVyPj4pOiBBcnJheTxJQVNDc3ZTaWduYWw+IHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgc2lnbmFsczogQXJyYXk8SUFTQ3N2U2lnbmFsPj0gbmV3IEFycmF5KCk7XHJcblxyXG4gICAgICAgIGxldCBkYXRhOiBBcnJheTxBcnJheTxJVmFsdWVQYWlyPG51bWJlciwgbnVtYmVyPj4+PSB0aGlzLnJlc29sdmVWYWx1ZU1hdHJpeCh2YWx1ZXMsIGhlYWRlcnMubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpOiBudW1iZXI9IDA7IGkgPCBoZWFkZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgc2lnbmFsOiBJQVNDc3ZTaWduYWw9IEFTQ3N2U2lnbmFsT2JqLmJ1aWxkQVNDc3ZTaWduYWxPYmooaGVhZGVyc1tpXSwgZGF0YVtpXSk7XHJcbiAgICAgICAgICAgIHNpZ25hbHMucHVzaChzaWduYWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNpZ25hbHM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzb2x2ZXMgdGhlIG51bWJlciBtYXRyaXggaW50byB2YWx1ZSBwYWlyIGFycmF5cy5cclxuICAgICAqICBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEFycmF5PG51bWJlcj4+fSBtYXRyaXhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1iZXJPZlNpZ25hbHNcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxBcnJheTxJUG9pbnQ+Pn1cclxuICAgICAqIEBtZW1iZXJvZiBBU0NzdkRlY29udmVydGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVzb2x2ZVZhbHVlTWF0cml4KG1hdHJpeDogQXJyYXk8QXJyYXk8bnVtYmVyPj4sIG51bWJlck9mU2lnbmFsczogbnVtYmVyKTogQXJyYXk8QXJyYXk8SVZhbHVlUGFpcjxudW1iZXIsIG51bWJlcj4+PiB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHNvcnRlZERhdGE6IEFycmF5PEFycmF5PElWYWx1ZVBhaXI8bnVtYmVyLCBudW1iZXI+Pj49IG5ldyBBcnJheSgpO1xyXG5cclxuICAgICAgICBmb3IobGV0IGk6IG51bWJlcj0gMDsgaSA8IG51bWJlck9mU2lnbmFsczsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgYXJyOiBBcnJheTxJVmFsdWVQYWlyPG51bWJlciwgbnVtYmVyPj49IG5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICBzb3J0ZWREYXRhLnB1c2goYXJyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvcihsZXQgaTogbnVtYmVyPSAwOyBpIDwgbWF0cml4Lmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICBmb3IobGV0IGo6IG51bWJlcj0gMDsgaiA8IG1hdHJpeFtpXS5sZW5ndGgtMTsgais9Mikge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZTE6IG51bWJlcj0gbWF0cml4W2ldW2pdO1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlMjogbnVtYmVyPSBtYXRyaXhbaV1baisxXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZigodmFsdWUxID09IHZhbHVlMSkgJiYgKHZhbHVlMiA9PSB2YWx1ZTIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlUGFpcjogSVZhbHVlUGFpcjxudW1iZXIsIG51bWJlcj49IG5ldyBWYWx1ZVBhaXIodmFsdWUxLCB2YWx1ZTIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNvcnRlZERhdGFbai8yXS5wdXNoKHZhbHVlUGFpcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzb3J0ZWREYXRhO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogVmVyaWZpZXMgdGhhdCB0aGUgZGF0YSBtYXRyaXggaGFzIHR3byBjb2x1bW5zIHBlciBzaWduYWwuXHJcbiAgICAgKiBEb2VzIG5vdCB0cmlnZ2VyIGV4Y2VwdGlvbiB3aGVuIHRoZXJlIGlzIG9uZSBhZGRpdGlvbmFsIGNvbHVtbiBiZWNhdXNlIHRoaXMgY2FuIGhhcHBlbiB3aGVuIHRoZXJlIGlzIGEgY29sc2VwIGF0IHRoZSBlbmQgb2YgYSBkYXRhIHJvdy5cclxuICAgICAqIENhbiB0aHJvdyBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyW11bXX0gZGF0YVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG51bWJlck9mU2lnbmFsc1xyXG4gICAgICogQG1lbWJlcm9mIEFTQ3N2RGVjb252ZXJ0ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB2ZXJpZnlEYXRhTWF0cml4KGRhdGE6IG51bWJlcltdW10sIG51bWJlck9mU2lnbmFsczogbnVtYmVyKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZGF0YS5mb3JFYWNoKChyb3cpID0+IHtcclxuICAgICAgICAgICAgaWYoKChyb3cubGVuZ3RoLShyb3cubGVuZ3RoJTIpKS8yKSAhPSBudW1iZXJPZlNpZ25hbHMpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvci5idWlsZChUcmFjZURhdGFDb252ZXJzaW9uRXJyb3JUeXBlcy5GT1JNQVRfVklPTEFUSU9OKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuZXhwb3J0IHsgQVNDc3ZEZWNvbnZlcnRlciB9O1xyXG5cclxuIl19