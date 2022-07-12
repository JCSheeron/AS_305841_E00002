define(["require", "exports", "../enums/ConvertTypes", "./ASCsvHeader", "./CsvDataRow", "./PartialFile", "../exceptions/traceDataConversionError", "../enums/traceDataConversionErrorTypes"], function (require, exports, ConvertTypes_1, ASCsvHeader_1, CsvDataRow_1, PartialFile_1, traceDataConversionError_1, traceDataConversionErrorTypes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Converts IASCsvSignals to a ASCsv formatted string
     *
     * @class ASCsvConverter
     */
    var ASCsvConverter = /** @class */ (function () {
        function ASCsvConverter() {
        }
        /**
         * Converts the given data into the given AS CSV format.
         * Can throw TraceDataConversionError.
         *
         * @param {Array<IASCsvSignal>} signals
         * @param {ConvertTypes} type
         * @returns {IPartialFile}
         * @memberof ASCsvConverterV2
         */
        ASCsvConverter.prototype.convert = function (signals, type) {
            var comsep = "";
            var colsep = "";
            switch (type) {
                case ConvertTypes_1.ConvertTypes.CSV_AS_DE:
                    comsep = ",";
                    colsep = ";";
                    break;
                case ConvertTypes_1.ConvertTypes.CSV_AS_EN:
                    comsep = ".";
                    colsep = ",";
                    break;
                default:
                    throw traceDataConversionError_1.TraceDataConversionError.build(traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.WRONG_FORMAT);
            }
            var headerRows = this.createHeaderRows(signals, comsep, colsep);
            var dataMatrix = this.createDataMatrix(signals);
            var dataRows = this.createDataRows(dataMatrix, colsep, comsep);
            var csv = this.joinRows(headerRows, dataRows);
            return this.buildPartialFile(csv);
        };
        /**
         * Creates the header rows.
         * Each headerrow is terminated with the value of member linebreakstring.
         *
         * @private
         * @param {Array<IASCsvHeader>} headers
         * @param {string} comsep
         * @param {string} colsep
         * @returns {Array<string>}
         * @memberof ASCsvConverterV2
         */
        ASCsvConverter.prototype.createHeaderRows = function (headers, comsep, colsep) {
            var headerRows = new Array();
            for (var index = 0; index < headers.length; index++) {
                var header = ASCsvHeader_1.ASCsvHeader.buildASCsvHeaderFromInterface(headers[index]);
                var headerStr = header.stringifyASCsvHeader(comsep, colsep);
                headerRows.push(headerStr);
            }
            return headerRows;
        };
        /**
         * Reads the csv data into a matrix representing the csv string structure.
         * Can throw TraceDataConversionError.
         *
         * @private
         * @param {Array<IASCsvData>} data
         * @returns {Array<Array<number>>}
         * @memberof ASCsvConverterV2
         */
        ASCsvConverter.prototype.createDataMatrix = function (data) {
            if (data.length < 1) {
                throw traceDataConversionError_1.TraceDataConversionError.build(traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.NO_DATA);
            }
            var maxNrSamples = this.getmaxNrSamplesPerSignals(data);
            var dataMatrix = new Array();
            for (var rowIndex = 0; rowIndex < maxNrSamples; rowIndex++) {
                var row = new Array();
                for (var columnIndex = 0; columnIndex < data.length; columnIndex++) {
                    if (data[columnIndex].data.length > rowIndex) {
                        row.push(data[columnIndex].data[rowIndex].value1);
                        row.push(data[columnIndex].data[rowIndex].value2);
                    }
                    else {
                        row.push(NaN);
                        row.push(NaN);
                    }
                }
                dataMatrix.push(row);
            }
            return dataMatrix;
        };
        /**
         * Returns the maximum number of value pairs of any signal within the array.
         *
         * @private
         * @param {Array<IASCsvData>} data
         * @returns {number}
         * @memberof ASCsvConverterV2
         */
        ASCsvConverter.prototype.getmaxNrSamplesPerSignals = function (data) {
            var maxNrSamplesPerSignals = 0;
            data.forEach(function (signal) {
                maxNrSamplesPerSignals = Math.max(maxNrSamplesPerSignals, signal.data.length);
            });
            return maxNrSamplesPerSignals;
        };
        /**
         * Stringifies data rows out of the data matrix.
         *
         * @private
         * @param {Array<Array<number>>} dataMatrix
         * @param {string} colsep
         * @param {string} comsep
         * @returns {Array<string>}
         * @memberof ASCsvConverterV2
         */
        ASCsvConverter.prototype.createDataRows = function (dataMatrix, colsep, comsep) {
            var dataRows = new Array();
            for (var rowIndex = 0; rowIndex < dataMatrix.length; rowIndex++) {
                var row = CsvDataRow_1.CsvDataRow.writeDataRow(dataMatrix[rowIndex], colsep, comsep, true);
                dataRows.push(row);
            }
            return dataRows;
        };
        /**
         * Joins header and data rows to one string representing the ASCsv.
         *
         * @private
         * @param {Array<string>} headerRows
         * @param {Array<string>} dataRows
         * @returns {string}
         * @memberof ASCsvConverterV2
         */
        ASCsvConverter.prototype.joinRows = function (headerRows, dataRows) {
            var csv = "";
            csv += headerRows.join("");
            csv += dataRows.join(ASCsvHeader_1.ASCsvHeader.linebreakString);
            return csv;
        };
        /**
         * Builds a partial file out of the csv string.
         *
         * @private
         * @param {string} csv
         * @returns {IPartialFile}
         * @memberof ASCsvConverterV2
         */
        ASCsvConverter.prototype.buildPartialFile = function (csv) {
            var partialFile = new PartialFile_1.PartialFile();
            partialFile.fileending = "csv";
            partialFile.data = csv;
            return partialFile;
        };
        return ASCsvConverter;
    }());
    exports.ASCsvConverter = ASCsvConverter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQVNDc3ZDb252ZXJ0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi90cmFjZURhdGFDb252ZXJzaW9uL2NsYXNzZXMvQVNDc3ZDb252ZXJ0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBY0E7Ozs7T0FJRztJQUNIO1FBQUE7UUFpTUEsQ0FBQztRQS9MRzs7Ozs7Ozs7V0FRRztRQUNJLGdDQUFPLEdBQWQsVUFBZSxPQUE0QixFQUFFLElBQWtCO1lBRTNELElBQUksTUFBTSxHQUFVLEVBQUUsQ0FBQztZQUN2QixJQUFJLE1BQU0sR0FBVSxFQUFFLENBQUM7WUFFdkIsUUFBTyxJQUFJLEVBQUU7Z0JBQ1QsS0FBSywyQkFBWSxDQUFDLFNBQVM7b0JBQ3ZCLE1BQU0sR0FBRyxHQUFHLENBQUM7b0JBQ2IsTUFBTSxHQUFHLEdBQUcsQ0FBQztvQkFDYixNQUFNO2dCQUNWLEtBQUssMkJBQVksQ0FBQyxTQUFTO29CQUN2QixNQUFNLEdBQUcsR0FBRyxDQUFDO29CQUNiLE1BQU0sR0FBRyxHQUFHLENBQUM7b0JBQ2IsTUFBTTtnQkFDVjtvQkFDSSxNQUFNLG1EQUF3QixDQUFDLEtBQUssQ0FBQyw2REFBNkIsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUN4RjtZQUVELElBQUksVUFBVSxHQUFpQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUU5RSxJQUFJLFVBQVUsR0FBd0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRXJFLElBQUksUUFBUSxHQUFpQixJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFN0UsSUFBSSxHQUFHLEdBQVUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFFckQsT0FBTyxJQUFJLENB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QUFHLEdBQVUsdUJBQVUsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3BGLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDdEI7WUFFRCxPQUFPLFFBQVEsQ0FBQztRQUNwQixDQUFDO1FBR0Q7Ozs7Ozs7O1dBUUc7UUFDSyxpQ0FBUSxHQUFoQixVQUFpQixVQUF5QixFQUFFLFFBQXVCO1lBRS9ELElBQUksR0FBRyxHQUFVLEVBQUUsQ0FBQztZQUVwQixHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMzQixHQUFHLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyx5QkFBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBRWxELE9BQU8sR0FBRyxDQUFDO1FBQ2YsQ0FBQztRQUdEOzs7Ozs7O1dBT0c7UUFDSyx5Q0FBZ0IsR0FBeEIsVUFBeUIsR0FBVztZQUVoQyxJQUFJLFdBQVcsR0FBZ0IsSUFBSSx5QkFBVyxFQUFFLENBQUM7WUFFakQsV0FBVyxDQUFDLFVBQVUsR0FBRSxLQUFLLENBQUM7WUFDOUIsV0FBVyxDQUFDLElBQUksR0FBRSxHQUFHLENBQUM7WUFFdEIsT0FBTyxXQUFXLENBQUM7UUFDdkIsQ0FBQztRQUVMLHFCQUFDO0lBQUQsQ0FBQyxBQWpNRCxJQWlNQztJQUdRLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVBhcnRpYWxGaWxlIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvSVBhcnRpYWxGaWxlXCI7XHJcbmltcG9ydCB7IENvbnZlcnRUeXBlcyB9IGZyb20gXCIuLi9lbnVtcy9Db252ZXJ0VHlwZXNcIjtcclxuaW1wb3J0IHsgSUFTQ3N2U2lnbmFsIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvSUFTQ3N2U2lnbmFsXCI7XHJcbmltcG9ydCB7IEFTQ3N2SGVhZGVyIH0gZnJvbSBcIi4vQVNDc3ZIZWFkZXJcIjtcclxuaW1wb3J0IHsgQ3N2RGF0YVJvdyB9IGZyb20gXCIuL0NzdkRhdGFSb3dcIjtcclxuaW1wb3J0IHsgSUFTQ3N2RGF0YSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL0lBU0NzdkRhdGFcIjtcclxuaW1wb3J0IHsgSUFTQ3N2SGVhZGVyIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvSUFTQ3N2SGVhZGVyXCI7XHJcbmltcG9ydCB7IFBhcnRpYWxGaWxlIH0gZnJvbSBcIi4vUGFydGlhbEZpbGVcIjtcclxuaW1wb3J0IHsgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yIH0gZnJvbSBcIi4uL2V4Y2VwdGlvbnMvdHJhY2VEYXRhQ29udmVyc2lvbkVycm9yXCI7XHJcbmltcG9ydCB7IFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvclR5cGVzIH0gZnJvbSBcIi4uL2VudW1zL3RyYWNlRGF0YUNvbnZlcnNpb25FcnJvclR5cGVzXCI7XHJcblxyXG5cclxuXHJcblxyXG4vKipcclxuICogQ29udmVydHMgSUFTQ3N2U2lnbmFscyB0byBhIEFTQ3N2IGZvcm1hdHRlZCBzdHJpbmdcclxuICpcclxuICogQGNsYXNzIEFTQ3N2Q29udmVydGVyXHJcbiAqL1xyXG5jbGFzcyBBU0NzdkNvbnZlcnRlciB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0cyB0aGUgZ2l2ZW4gZGF0YSBpbnRvIHRoZSBnaXZlbiBBUyBDU1YgZm9ybWF0LlxyXG4gICAgICogQ2FuIHRocm93IFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElBU0NzdlNpZ25hbD59IHNpZ25hbHNcclxuICAgICAqIEBwYXJhbSB7Q29udmVydFR5cGVzfSB0eXBlXHJcbiAgICAgKiBAcmV0dXJucyB7SVBhcnRpYWxGaWxlfVxyXG4gICAgICogQG1lbWJlcm9mIEFTQ3N2Q29udmVydGVyVjJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnZlcnQoc2lnbmFsczogQXJyYXk8SUFTQ3N2U2lnbmFsPiwgdHlwZTogQ29udmVydFR5cGVzKTogSVBhcnRpYWxGaWxle1xyXG5cclxuICAgICAgICBsZXQgY29tc2VwOiBzdHJpbmc9IFwiXCI7XHJcbiAgICAgICAgbGV0IGNvbHNlcDogc3RyaW5nPSBcIlwiO1xyXG5cclxuICAgICAgICBzd2l0Y2godHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIENvbnZlcnRUeXBlcy5DU1ZfQVNfREU6XHJcbiAgICAgICAgICAgICAgICBjb21zZXAgPSBcIixcIjtcclxuICAgICAgICAgICAgICAgIGNvbHNlcCA9IFwiO1wiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ29udmVydFR5cGVzLkNTVl9BU19FTjpcclxuICAgICAgICAgICAgICAgIGNvbXNlcCA9IFwiLlwiO1xyXG4gICAgICAgICAgICAgICAgY29sc2VwID0gXCIsXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRocm93IFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvci5idWlsZChUcmFjZURhdGFDb252ZXJzaW9uRXJyb3JUeXBlcy5XUk9OR19GT1JNQVQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGhlYWRlclJvd3M6IEFycmF5PHN0cmluZz49IHRoaXMuY3JlYXRlSGVhZGVyUm93cyhzaWduYWxzLCBjb21zZXAsIGNvbHNlcCk7XHJcblxyXG4gICAgICAgIGxldCBkYXRhTWF0cml4OiBBcnJheTxBcnJheTxudW1iZXI+Pj0gdGhpcy5jcmVhdGVEYXRhTWF0cml4KHNpZ25hbHMpO1xyXG5cclxuICAgICAgICBsZXQgZGF0YVJvd3M6IEFycmF5PHN0cmluZz49IHRoaXMuY3JlYXRlRGF0YVJvd3MoZGF0YU1hdHJpeCwgY29sc2VwLCBjb21zZXApO1xyXG5cclxuICAgICAgICBsZXQgY3N2OiBzdHJpbmc9IHRoaXMuam9pblJvd3MoaGVhZGVyUm93cywgZGF0YVJvd3MpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5idWlsZFBhcnRpYWxGaWxlKGNzdik7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgaGVhZGVyIHJvd3MuXHJcbiAgICAgKiBFYWNoIGhlYWRlcnJvdyBpcyB0ZXJtaW5hdGVkIHdpdGggdGhlIHZhbHVlIG9mIG1lbWJlciBsaW5lYnJlYWtzdHJpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SUFTQ3N2SGVhZGVyPn0gaGVhZGVyc1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbXNlcFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbHNlcFxyXG4gICAgICogQHJldHVybnMge0FycmF5PHN0cmluZz59XHJcbiAgICAgKiBAbWVtYmVyb2YgQVNDc3ZDb252ZXJ0ZXJWMlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZUhlYWRlclJvd3MoaGVhZGVyczogQXJyYXk8SUFTQ3N2SGVhZGVyPiwgY29tc2VwOiBzdHJpbmcsIGNvbHNlcDogc3RyaW5nKTogQXJyYXk8c3RyaW5nPiB7XHJcblxyXG4gICAgICAgIGxldCBoZWFkZXJSb3dzOiBBcnJheTxzdHJpbmc+PSBuZXcgQXJyYXkoKTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpbmRleDogbnVtYmVyPSAwOyBpbmRleCA8IGhlYWRlcnMubGVuZ3RoOyBpbmRleCsrKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgaGVhZGVyOiBBU0NzdkhlYWRlcj0gQVNDc3ZIZWFkZXIuYnVpbGRBU0NzdkhlYWRlckZyb21JbnRlcmZhY2UoaGVhZGVyc1tpbmRleF0pO1xyXG5cclxuICAgICAgICAgICAgbGV0IGhlYWRlclN0cjogc3RyaW5nPSBoZWFkZXIuc3RyaW5naWZ5QVNDc3ZIZWFkZXIoY29tc2VwLCBjb2xzZXApO1xyXG5cclxuICAgICAgICAgICAgaGVhZGVyUm93cy5wdXNoKGhlYWRlclN0cik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaGVhZGVyUm93cztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyB0aGUgY3N2IGRhdGEgaW50byBhIG1hdHJpeCByZXByZXNlbnRpbmcgdGhlIGNzdiBzdHJpbmcgc3RydWN0dXJlLlxyXG4gICAgICogQ2FuIHRocm93IFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvci5cclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SUFTQ3N2RGF0YT59IGRhdGFcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxBcnJheTxudW1iZXI+Pn1cclxuICAgICAqIEBtZW1iZXJvZiBBU0NzdkNvbnZlcnRlclYyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlRGF0YU1hdHJpeChkYXRhOiBBcnJheTxJQVNDc3ZEYXRhPik6IEFycmF5PEFycmF5PG51bWJlcj4+IHtcclxuXHJcbiAgICAgICAgaWYoZGF0YS5sZW5ndGggPCAxKSB7XHJcblxyXG4gICAgICAgICAgICB0aHJvdyBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IuYnVpbGQoVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yVHlwZXMuTk9fREFUQSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbWF4TnJTYW1wbGVzOiBudW1iZXI9IHRoaXMuZ2V0bWF4TnJTYW1wbGVzUGVyU2lnbmFscyhkYXRhKTtcclxuICAgICAgICBsZXQgZGF0YU1hdHJpeDogQXJyYXk8QXJyYXk8bnVtYmVyPj49IG5ldyBBcnJheSgpO1xyXG5cclxuICAgICAgICBmb3IobGV0IHJvd0luZGV4OiBudW1iZXI9IDA7IHJvd0luZGV4IDwgbWF4TnJTYW1wbGVzOyByb3dJbmRleCsrKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgcm93OiBBcnJheTxudW1iZXI+PSBuZXcgQXJyYXkoKTsgXHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIGZvcihsZXQgY29sdW1uSW5kZXg6IG51bWJlcj0gMDsgY29sdW1uSW5kZXggPCBkYXRhLmxlbmd0aDsgY29sdW1uSW5kZXgrKykge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGRhdGFbY29sdW1uSW5kZXhdLmRhdGEubGVuZ3RoID4gcm93SW5kZXgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcm93LnB1c2goZGF0YVtjb2x1bW5JbmRleF0uZGF0YVtyb3dJbmRleF0udmFsdWUxKTtcclxuICAgICAgICAgICAgICAgICAgICByb3cucHVzaChkYXRhW2NvbHVtbkluZGV4XS5kYXRhW3Jvd0luZGV4XS52YWx1ZTIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcm93LnB1c2goTmFOKTtcclxuICAgICAgICAgICAgICAgICAgICByb3cucHVzaChOYU4pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkYXRhTWF0cml4LnB1c2gocm93KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBkYXRhTWF0cml4O1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBtYXhpbXVtIG51bWJlciBvZiB2YWx1ZSBwYWlycyBvZiBhbnkgc2lnbmFsIHdpdGhpbiB0aGUgYXJyYXkuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SUFTQ3N2RGF0YT59IGRhdGFcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgQVNDc3ZDb252ZXJ0ZXJWMlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldG1heE5yU2FtcGxlc1BlclNpZ25hbHMoZGF0YTogQXJyYXk8SUFTQ3N2RGF0YT4pOiBudW1iZXIge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBtYXhOclNhbXBsZXNQZXJTaWduYWxzIDogbnVtYmVyID0gMDtcclxuICAgICAgICBkYXRhLmZvckVhY2goc2lnbmFsID0+IHtcclxuICAgICAgICAgICAgbWF4TnJTYW1wbGVzUGVyU2lnbmFscyA9IE1hdGgubWF4KG1heE5yU2FtcGxlc1BlclNpZ25hbHMsc2lnbmFsLmRhdGEubGVuZ3RoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbWF4TnJTYW1wbGVzUGVyU2lnbmFscztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdHJpbmdpZmllcyBkYXRhIHJvd3Mgb3V0IG9mIHRoZSBkYXRhIG1hdHJpeC5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxBcnJheTxudW1iZXI+Pn0gZGF0YU1hdHJpeFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbHNlcFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbXNlcFxyXG4gICAgICogQHJldHVybnMge0FycmF5PHN0cmluZz59XHJcbiAgICAgKiBAbWVtYmVyb2YgQVNDc3ZDb252ZXJ0ZXJWMlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZURhdGFSb3dzKGRhdGFNYXRyaXg6IEFycmF5PEFycmF5PG51bWJlcj4+LCBjb2xzZXA6IHN0cmluZywgY29tc2VwOiBzdHJpbmcpOiBBcnJheTxzdHJpbmc+IHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgZGF0YVJvd3M6IEFycmF5PHN0cmluZz49IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvcihsZXQgcm93SW5kZXg6IG51bWJlcj0gMDsgcm93SW5kZXggPCBkYXRhTWF0cml4Lmxlbmd0aDsgcm93SW5kZXgrKykge1xyXG5cclxuICAgICAgICAgICAgbGV0IHJvdzogc3RyaW5nPSBDc3ZEYXRhUm93LndyaXRlRGF0YVJvdyhkYXRhTWF0cml4W3Jvd0luZGV4XSwgY29sc2VwLCBjb21zZXAsdHJ1ZSk7XHJcbiAgICAgICAgICAgIGRhdGFSb3dzLnB1c2gocm93KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBkYXRhUm93cztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBKb2lucyBoZWFkZXIgYW5kIGRhdGEgcm93cyB0byBvbmUgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgQVNDc3YuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gaGVhZGVyUm93c1xyXG4gICAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBkYXRhUm93c1xyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBBU0NzdkNvbnZlcnRlclYyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgam9pblJvd3MoaGVhZGVyUm93czogQXJyYXk8c3RyaW5nPiwgZGF0YVJvd3M6IEFycmF5PHN0cmluZz4pOiBzdHJpbmcge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBjc3Y6IHN0cmluZz0gXCJcIjtcclxuXHJcbiAgICAgICAgY3N2ICs9IGhlYWRlclJvd3Muam9pbihcIlwiKTtcclxuICAgICAgICBjc3YgKz0gZGF0YVJvd3Muam9pbihBU0NzdkhlYWRlci5saW5lYnJlYWtTdHJpbmcpO1xyXG5cclxuICAgICAgICByZXR1cm4gY3N2O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJ1aWxkcyBhIHBhcnRpYWwgZmlsZSBvdXQgb2YgdGhlIGNzdiBzdHJpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjc3ZcclxuICAgICAqIEByZXR1cm5zIHtJUGFydGlhbEZpbGV9XHJcbiAgICAgKiBAbWVtYmVyb2YgQVNDc3ZDb252ZXJ0ZXJWMlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGJ1aWxkUGFydGlhbEZpbGUoY3N2OiBzdHJpbmcpOiBJUGFydGlhbEZpbGUge1xyXG5cclxuICAgICAgICBsZXQgcGFydGlhbEZpbGU6IElQYXJ0aWFsRmlsZT0gbmV3IFBhcnRpYWxGaWxlKCk7XHJcblxyXG4gICAgICAgIHBhcnRpYWxGaWxlLmZpbGVlbmRpbmc9IFwiY3N2XCI7XHJcbiAgICAgICAgcGFydGlhbEZpbGUuZGF0YT0gY3N2O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBwYXJ0aWFsRmlsZTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgeyBBU0NzdkNvbnZlcnRlciB9Il19