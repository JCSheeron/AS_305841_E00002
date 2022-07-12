define(["require", "exports", "./CoTraceSignal", "./CoTraceRecording", "./CsvDataRow", "../enums/traceDataConversionErrorTypes", "../exceptions/traceDataConversionError", "../../../core/types/sample"], function (require, exports, CoTraceSignal_1, CoTraceRecording_1, CsvDataRow_1, traceDataConversionErrorTypes_1, traceDataConversionError_1, sample_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Deconverts a CoTrace CSV string into a ICoTraceRecording.
     *
     * @class CoTraceCsvDeconverter
     */
    var CoTraceCsvDeconverter = /** @class */ (function () {
        function CoTraceCsvDeconverter() {
        }
        /**
         * Deconverts an cotrace csv formatted string to an IRecording.
         * Can throw TraceDataConversionError.
         * Column and comma seperator may not contain:
         * - whitespace characters
         * - numbers
         * - letters which occur in variable or timestamp names
         * - multiple characters
         *
         * @param {string} csv
         * @returns {ICoTraceRecording}
         * @memberof CoTraceCsvDeconverter
         */
        CoTraceCsvDeconverter.prototype.deconvert = function (csv) {
            var lines = this.splitStringIntoRows(csv);
            var colsep = this.tryExtractColsep(lines[0]); //first row needs to be headerline
            var comsep = this.tryExtractComsep(lines, colsep);
            var dataMatrix = this.parseLinesToMatrix(lines, colsep, comsep);
            var signals = this.prepareSignals(lines[0], colsep);
            signals = this.resolveMatrix(signals, dataMatrix);
            var starttrigger = this.tryExtractStartTrigger(dataMatrix);
            return new CoTraceRecording_1.CoTraceRecording(starttrigger, signals);
        };
        /**
         * Builds the array of ICoTraceSignals based on their names in the headerline.
         *
         * @private
         * @param {string} headerline
         * @param {*} colsep
         * @returns {Array<ICoTraceSignal>}
         * @memberof CoTraceCsvDeconverter
         */
        CoTraceCsvDeconverter.prototype.prepareSignals = function (headerline, colsep) {
            var names = headerline.split(colsep);
            var signals = new Array();
            //traced variables start at index 3, because index 0-2 are timestamps
            for (var i = 3; i < names.length; i++) {
                if (names[i] !== "") {
                    signals.push(new CoTraceSignal_1.CoTraceSignal(names[i]));
                }
            }
            return signals;
        };
        /**
         * Resolves the data matrix into the ICotraceSignals.
         *
         * @private
         * @param {ICoTraceSignal[]} signals
         * @param {Array<Array<number>>} matrix
         * @returns {ICoTraceSignal[]}
         * @memberof CoTraceCsvDeconverter
         */
        CoTraceCsvDeconverter.prototype.resolveMatrix = function (signals, matrix) {
            for (var rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
                var relTime = matrix[rowIndex][2]; //relative time is in 3rd column -> index 2
                //traced variables start at index 3, because index 0-2 are timestamps
                for (var columnIndex = 3; (columnIndex - 3) < signals.length; columnIndex++) {
                    var sample = new sample_1.Sample(relTime, matrix[rowIndex][columnIndex]);
                    signals[columnIndex - 3].samples.push(sample);
                }
            }
            return signals;
        };
        /**
         * Creates a datamatrix out of the csv data representing the values and position within the csv.
         *
         * @private
         * @param {Array<string>} lines
         * @param {string} colsep
         * @param {(string|undefined)} comsep
         * @returns {Array<Array<number>>}
         * @memberof CoTraceCsvDeconverter
         */
        CoTraceCsvDeconverter.prototype.parseLinesToMatrix = function (lines, colsep, comsep) {
            var dataMatrix = new Array();
            for (var lineIndex = 1; lineIndex < lines.length; lineIndex++) {
                var row = CsvDataRow_1.CsvDataRow.readDataRow(lines[lineIndex], colsep, comsep);
                dataMatrix.push(row);
            }
            return dataMatrix;
        };
        /**
         * Tries to derive starttrigger from the data row with relative timestamp to start trigger 0.
         * If not possible the current timestamp is returned.
         *
         * @private
         * @param {Array<Array<number>>} matrix
         * @returns {Date}
         * @memberof CoTraceCsvDeconverter
         */
        CoTraceCsvDeconverter.prototype.tryExtractStartTrigger = function (matrix) {
            var starttrigger = new Date();
            for (var rowIndex = 1; rowIndex < matrix.length; rowIndex++) {
                if (matrix[rowIndex][2] === 0) { //if relative time to starttrigger is null
                    //take EpochTimestamp, transform it to UNIXTimestamp and build Date Object
                    starttrigger = new Date(matrix[rowIndex][0] * 1000);
                }
            }
            return starttrigger;
        };
        /**
         * Removes all whitespace characters and then splits the csv string into rows.
         * Can throw TraceDataConversionError.
         *
         * @private
         * @param {string} csv
         * @returns {Array<string>}
         * @memberof CoTraceCsvDeconverter
         */
        CoTraceCsvDeconverter.prototype.splitStringIntoRows = function (csv) {
            // matches all whitespace characters excluding \n
            var regex = /[\r\t\f\v ]+/gm;
            //removes all characters from string matched by the regex
            var filteredCsv = this.removeCharacter(csv, regex);
            var lines = filteredCsv.split('\n');
            lines = this.removeEmptyLines(lines);
            if (lines.length > 1) {
                // csv is only considered valid if at least 2 rows exist (the header row and one or more data rows) 
                return lines;
            }
            throw traceDataConversionError_1.TraceDataConversionError.build(traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.FORMAT_VIOLATION);
        };
        /**
         * Tries to extract the comma seperator the data lines.
         * The first character which is not a number, a '-', a whitespace character or the column seperator is taken as comma seperator.
         * If not found, the comma seperator is undefined.
         *
         * @private
         * @param {Array<string>} lines
         * @param {string} colsep
         * @returns {(string|undefined)}
         * @memberof CoTraceCsvDeconverter
         */
        CoTraceCsvDeconverter.prototype.tryExtractComsep = function (lines, colsep) {
            //matches for a single character which is not '-' or '0'-'9' or ' ' or colsep or whitespace character
            var getComsepRegEx = new RegExp("[^\-0-9\ " + colsep + "\r\n\t\f\v]");
            var comsepCandidates;
            var comsep = undefined;
            for (var i = 1; i < lines.length; i++) {
                comsepCandidates = getComsepRegEx.exec(lines[i]);
                //if a comsep candidate is found return it
                if (comsepCandidates) {
                    comsep = comsepCandidates[0];
                }
            }
            //if no comsep candidate is found return undefined. there is probably no decimal value in csv
            return comsep;
        };
        /**
         * Tries to extract the column seperator from known, fixed parts of the headerline.
         * Can throw TraceDataConversionError.
         *
         * @private
         * @param {string} headerline
         * @returns {string}
         * @memberof CoTraceCsvDeconverter
         */
        CoTraceCsvDeconverter.prototype.tryExtractColsep = function (headerline) {
            //matches for all characters between phrases "EpochTimestamp" and "SiosTimeUsec"
            var getColsepRegEx = new RegExp("EpochTimestamp(.)SiosTimeUsec");
            var colsepCandidates = getColsepRegEx.exec(headerline);
            if (colsepCandidates) {
                return colsepCandidates[1];
            }
            else {
                // if no colsep can be determined there is an incorrect headerline provided
                throw traceDataConversionError_1.TraceDataConversionError.build(traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.NO_COLSEP);
            }
        };
        /**
         * Removes empty strings in an array of strings.
         *
         * @private
         * @param {Array<string>} lines
         * @returns {Array<string>}
         * @memberof CoTraceCsvDeconverter
         */
        CoTraceCsvDeconverter.prototype.removeEmptyLines = function (lines) {
            return lines.filter(function (val) { return (val !== "") ? true : false; });
        };
        /**
         * Removes characters (specified by a regex) from a string.
         *
         * @private
         * @param {string} str
         * @param {RegExp} regex
         * @returns {string}
         * @memberof CoTraceCsvDeconverter
         */
        CoTraceCsvDeconverter.prototype.removeCharacter = function (str, regex) {
            return str.replace(regex, "");
        };
        return CoTraceCsvDeconverter;
    }());
    exports.CoTraceCsvDeconverter = CoTraceCsvDeconverter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29UcmFjZUNzdkRlY29udmVydGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vdHJhY2VEYXRhQ29udmVyc2lvbi9jbGFzc2VzL0NvVHJhY2VDc3ZEZWNvbnZlcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFXQTs7OztPQUlHO0lBQ0g7UUFBQTtRQW1RQSxDQUFDO1FBL1BHOzs7Ozs7Ozs7Ozs7V0FZRztRQUNJLHlDQUFTLEdBQWhCLFVBQWlCLEdBQVc7WUFFeEIsSUFBSSxLQUFLLEdBQWlCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUV4RCxJQUFJLE1BQU0sR0FBVSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxrQ0FBa0M7WUFDdkYsSUFBSSxNQUFNLEdBQW9CLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFHbkUsSUFBSSxVQUFVLEdBQXdCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBRXJGLElBQUksT0FBTyxHQUF5QixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUUxRSxPQUFPLEdBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFFakQsSUFBSSxZQUFZLEdBQVEsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRWhFLE9BQU8sSUFBSSxtQ0FBZ0IsQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDdkQsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0ssOENBQWMsR0FBdEIsVUFBdUIsVUFBa0IsRUFBRSxNQUFNO1lBRTdDLElBQUksS0FB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QWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFdEQsSUFBRyxnQkFBZ0IsRUFBRTtnQkFFakIsT0FBTyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM5QjtpQkFBTTtnQkFFSCwyRUFBMkU7Z0JBQzNFLE1BQU0sbURBQXdCLENBQUMsS0FBSyxDQUFDLDZEQUE2QixDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ2pGO1FBQ0wsQ0FBQztRQUdEOzs7Ozs7O1dBT0c7UUFDSyxnREFBZ0IsR0FBeEIsVUFBeUIsS0FBb0I7WUFFekMsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsR0FBRyxJQUFNLE9BQU8sQ0FBQyxHQUFHLEtBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFckUsQ0FBQztRQUdEOzs7Ozs7OztXQVFHO1FBQ0ssK0NBQWUsR0FBdkIsVUFBd0IsR0FBVyxFQUFFLEtBQWE7WUFFOUMsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNsQyxDQUFDO1FBQ0wsNEJBQUM7SUFBRCxDQUFDLEFBblFELElBbVFDO0lBRVEsc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29UcmFjZVNpZ25hbCB9IGZyb20gXCIuL0NvVHJhY2VTaWduYWxcIjtcclxuaW1wb3J0IHsgSUNvVHJhY2VTaWduYWwgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9JQ29UcmFjZVNpZ25hbFwiO1xyXG5pbXBvcnQgeyBJQ29UcmFjZVJlY29yZGluZyB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL0lDb1RyYWNlUmVjb3JkaW5nXCI7XHJcbmltcG9ydCB7IENvVHJhY2VSZWNvcmRpbmcgfSBmcm9tIFwiLi9Db1RyYWNlUmVjb3JkaW5nXCI7XHJcbmltcG9ydCB7IENzdkRhdGFSb3cgfSBmcm9tIFwiLi9Dc3ZEYXRhUm93XCI7XHJcbmltcG9ydCB7IFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvclR5cGVzIH0gZnJvbSBcIi4uL2VudW1zL3RyYWNlRGF0YUNvbnZlcnNpb25FcnJvclR5cGVzXCI7XHJcbmltcG9ydCB7IFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvciB9IGZyb20gXCIuLi9leGNlcHRpb25zL3RyYWNlRGF0YUNvbnZlcnNpb25FcnJvclwiO1xyXG5pbXBvcnQgeyBTYW1wbGUgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS90eXBlcy9zYW1wbGVcIjtcclxuaW1wb3J0IHsgSVNhbXBsZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2ludGVyZmFjZXMvc2FtcGxlSW50ZXJmYWNlXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIERlY29udmVydHMgYSBDb1RyYWNlIENTViBzdHJpbmcgaW50byBhIElDb1RyYWNlUmVjb3JkaW5nLlxyXG4gKlxyXG4gKiBAY2xhc3MgQ29UcmFjZUNzdkRlY29udmVydGVyXHJcbiAqL1xyXG5jbGFzcyBDb1RyYWNlQ3N2RGVjb252ZXJ0ZXIge1xyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWNvbnZlcnRzIGFuIGNvdHJhY2UgY3N2IGZvcm1hdHRlZCBzdHJpbmcgdG8gYW4gSVJlY29yZGluZy5cclxuICAgICAqIENhbiB0aHJvdyBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IuXHJcbiAgICAgKiBDb2x1bW4gYW5kIGNvbW1hIHNlcGVyYXRvciBtYXkgbm90IGNvbnRhaW46IFxyXG4gICAgICogLSB3aGl0ZXNwYWNlIGNoYXJhY3RlcnNcclxuICAgICAqIC0gbnVtYmVyc1xyXG4gICAgICogLSBsZXR0ZXJzIHdoaWNoIG9jY3VyIGluIHZhcmlhYmxlIG9yIHRpbWVzdGFtcCBuYW1lc1xyXG4gICAgICogLSBtdWx0aXBsZSBjaGFyYWN0ZXJzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNzdlxyXG4gICAgICogQHJldHVybnMge0lDb1RyYWNlUmVjb3JkaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIENvVHJhY2VDc3ZEZWNvbnZlcnRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVjb252ZXJ0KGNzdjogc3RyaW5nKTogSUNvVHJhY2VSZWNvcmRpbmcge1xyXG5cclxuICAgICAgICBsZXQgbGluZXM6IEFycmF5PHN0cmluZz49IHRoaXMuc3BsaXRTdHJpbmdJbnRvUm93cyhjc3YpO1xyXG5cclxuICAgICAgICBsZXQgY29sc2VwOiBzdHJpbmc9IHRoaXMudHJ5RXh0cmFjdENvbHNlcChsaW5lc1swXSk7IC8vZmlyc3Qgcm93IG5lZWRzIHRvIGJlIGhlYWRlcmxpbmVcclxuICAgICAgICBsZXQgY29tc2VwOiBzdHJpbmd8dW5kZWZpbmVkPSB0aGlzLnRyeUV4dHJhY3RDb21zZXAobGluZXMsIGNvbHNlcCk7XHJcblxyXG5cclxuICAgICAgICBsZXQgZGF0YU1hdHJpeDogQXJyYXk8QXJyYXk8bnVtYmVyPj49IHRoaXMucGFyc2VMaW5lc1RvTWF0cml4KGxpbmVzLCBjb2xzZXAsIGNvbXNlcCk7XHJcblxyXG4gICAgICAgIGxldCBzaWduYWxzOiBBcnJheTxJQ29UcmFjZVNpZ25hbD49IHRoaXMucHJlcGFyZVNpZ25hbHMobGluZXNbMF0sIGNvbHNlcCk7XHJcblxyXG4gICAgICAgIHNpZ25hbHM9IHRoaXMucmVzb2x2ZU1hdHJpeChzaWduYWxzLCBkYXRhTWF0cml4KTtcclxuXHJcbiAgICAgICAgbGV0IHN0YXJ0dHJpZ2dlcjogRGF0ZT0gdGhpcy50cnlFeHRyYWN0U3RhcnRUcmlnZ2VyKGRhdGFNYXRyaXgpO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IENvVHJhY2VSZWNvcmRpbmcoc3RhcnR0cmlnZ2VyLCBzaWduYWxzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJ1aWxkcyB0aGUgYXJyYXkgb2YgSUNvVHJhY2VTaWduYWxzIGJhc2VkIG9uIHRoZWlyIG5hbWVzIGluIHRoZSBoZWFkZXJsaW5lLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaGVhZGVybGluZVxyXG4gICAgICogQHBhcmFtIHsqfSBjb2xzZXBcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxJQ29UcmFjZVNpZ25hbD59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29UcmFjZUNzdkRlY29udmVydGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcHJlcGFyZVNpZ25hbHMoaGVhZGVybGluZTogc3RyaW5nLCBjb2xzZXApOiBBcnJheTxJQ29UcmFjZVNpZ25hbD4ge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBuYW1lczogQXJyYXk8c3RyaW5nPj0gaGVhZGVybGluZS5zcGxpdChjb2xzZXApO1xyXG5cclxuICAgICAgICBsZXQgc2lnbmFsczogQXJyYXk8SUNvVHJhY2VTaWduYWw+PSBuZXcgQXJyYXk8SUNvVHJhY2VTaWduYWw+KCk7XHJcblxyXG4gICAgICAgIC8vdHJhY2VkIHZhcmlhYmxlcyBzdGFydCBhdCBpbmRleCAzLCBiZWNhdXNlIGluZGV4IDAtMiBhcmUgdGltZXN0YW1wc1xyXG4gICAgICAgIGZvcihsZXQgaTogbnVtYmVyPSAzOyBpPG5hbWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihuYW1lc1tpXSAhPT0gXCJcIikge1xyXG5cclxuICAgICAgICAgICAgICAgIHNpZ25hbHMucHVzaChuZXcgQ29UcmFjZVNpZ25hbChuYW1lc1tpXSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc2lnbmFscztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNvbHZlcyB0aGUgZGF0YSBtYXRyaXggaW50byB0aGUgSUNvdHJhY2VTaWduYWxzLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lDb1RyYWNlU2lnbmFsW119IHNpZ25hbHNcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8QXJyYXk8bnVtYmVyPj59IG1hdHJpeFxyXG4gICAgICogQHJldHVybnMge0lDb1RyYWNlU2lnbmFsW119XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29UcmFjZUNzdkRlY29udmVydGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVzb2x2ZU1hdHJpeChzaWduYWxzOiBJQ29UcmFjZVNpZ25hbFtdLCBtYXRyaXg6IEFycmF5PEFycmF5PG51bWJlcj4+KTogSUNvVHJhY2VTaWduYWxbXSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yKGxldCByb3dJbmRleDogbnVtYmVyPSAwOyByb3dJbmRleCA8IG1hdHJpeC5sZW5ndGg7IHJvd0luZGV4KyspIHtcclxuXHJcbiAgICAgICAgICAgIGxldCByZWxUaW1lPSBtYXRyaXhbcm93SW5kZXhdWzJdOyAvL3JlbGF0aXZlIHRpbWUgaXMgaW4gM3JkIGNvbHVtbiAtPiBpbmRleCAyXHJcblxyXG4gICAgICAgICAgICAvL3RyYWNlZCB2YXJpYWJsZXMgc3RhcnQgYXQgaW5kZXggMywgYmVjYXVzZSBpbmRleCAwLTIgYXJlIHRpbWVzdGFtcHNcclxuICAgICAgICAgICAgZm9yKGxldCBjb2x1bW5JbmRleDogbnVtYmVyPSAzOyAoY29sdW1uSW5kZXgtMykgPCBzaWduYWxzLmxlbmd0aDsgY29sdW1uSW5kZXgrKykge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBzYW1wbGU6IElTYW1wbGU9IG5ldyBTYW1wbGUocmVsVGltZSwgbWF0cml4W3Jvd0luZGV4XVtjb2x1bW5JbmRleF0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHNpZ25hbHNbY29sdW1uSW5kZXgtM10uc2FtcGxlcy5wdXNoKHNhbXBsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHNpZ25hbHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgZGF0YW1hdHJpeCBvdXQgb2YgdGhlIGNzdiBkYXRhIHJlcHJlc2VudGluZyB0aGUgdmFsdWVzIGFuZCBwb3NpdGlvbiB3aXRoaW4gdGhlIGNzdi5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBsaW5lc1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbHNlcFxyXG4gICAgICogQHBhcmFtIHsoc3RyaW5nfHVuZGVmaW5lZCl9IGNvbXNlcFxyXG4gICAgICogQHJldHVybnMge0FycmF5PEFycmF5PG51bWJlcj4+fVxyXG4gICAgICogQG1lbWJlcm9mIENvVHJhY2VDc3ZEZWNvbnZlcnRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHBhcnNlTGluZXNUb01hdHJpeChsaW5lczogQXJyYXk8c3RyaW5nPiwgY29sc2VwOiBzdHJpbmcsIGNvbXNlcDogc3RyaW5nfHVuZGVmaW5lZCk6IEFycmF5PEFycmF5PG51bWJlcj4+IHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgZGF0YU1hdHJpeDogQXJyYXk8QXJyYXk8bnVtYmVyPj49IG5ldyBBcnJheSgpO1xyXG5cclxuICAgICAgICBmb3IobGV0IGxpbmVJbmRleDogbnVtYmVyPSAxOyBsaW5lSW5kZXggPCBsaW5lcy5sZW5ndGg7IGxpbmVJbmRleCsrKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgcm93OiBBcnJheTxudW1iZXI+PSBDc3ZEYXRhUm93LnJlYWREYXRhUm93KGxpbmVzW2xpbmVJbmRleF0sY29sc2VwLCBjb21zZXApO1xyXG4gICAgICAgICAgICBkYXRhTWF0cml4LnB1c2gocm93KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBkYXRhTWF0cml4O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyaWVzIHRvIGRlcml2ZSBzdGFydHRyaWdnZXIgZnJvbSB0aGUgZGF0YSByb3cgd2l0aCByZWxhdGl2ZSB0aW1lc3RhbXAgdG8gc3RhcnQgdHJpZ2dlciAwLlxyXG4gICAgICogSWYgbm90IHBvc3NpYmxlIHRoZSBjdXJyZW50IHRpbWVzdGFtcCBpcyByZXR1cm5lZC5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxBcnJheTxudW1iZXI+Pn0gbWF0cml4XHJcbiAgICAgKiBAcmV0dXJucyB7RGF0ZX1cclxuICAgICAqIEBtZW1iZXJvZiBDb1RyYWNlQ3N2RGVjb252ZXJ0ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB0cnlFeHRyYWN0U3RhcnRUcmlnZ2VyKG1hdHJpeDogQXJyYXk8QXJyYXk8bnVtYmVyPj4pOiBEYXRlIHtcclxuXHJcbiAgICAgICAgbGV0IHN0YXJ0dHJpZ2dlcjogRGF0ZT0gbmV3IERhdGUoKTtcclxuXHJcbiAgICAgICAgZm9yKGxldCByb3dJbmRleDogbnVtYmVyPSAxOyByb3dJbmRleCA8IG1hdHJpeC5sZW5ndGg7IHJvd0luZGV4KyspIHtcclxuICAgICAgICAgICAgaWYobWF0cml4W3Jvd0luZGV4XVsyXSA9PT0gMCkgeyAvL2lmIHJlbGF0aXZlIHRpbWUgdG8gc3RhcnR0cmlnZ2VyIGlzIG51bGxcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy90YWtlIEVwb2NoVGltZXN0YW1wLCB0cmFuc2Zvcm0gaXQgdG8gVU5JWFRpbWVzdGFtcCBhbmQgYnVpbGQgRGF0ZSBPYmplY3RcclxuICAgICAgICAgICAgICAgIHN0YXJ0dHJpZ2dlcj0gbmV3IERhdGUobWF0cml4W3Jvd0luZGV4XVswXSoxMDAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RhcnR0cmlnZ2VyO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYWxsIHdoaXRlc3BhY2UgY2hhcmFjdGVycyBhbmQgdGhlbiBzcGxpdHMgdGhlIGNzdiBzdHJpbmcgaW50byByb3dzLiBcclxuICAgICAqIENhbiB0aHJvdyBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IuXHJcbiAgICAgKiBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY3N2XHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8c3RyaW5nPn1cclxuICAgICAqIEBtZW1iZXJvZiBDb1RyYWNlQ3N2RGVjb252ZXJ0ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzcGxpdFN0cmluZ0ludG9Sb3dzKGNzdjogc3RyaW5nKTogQXJyYXk8c3RyaW5nPiB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gbWF0Y2hlcyBhbGwgd2hpdGVzcGFjZSBjaGFyYWN0ZXJzIGV4Y2x1ZGluZyBcXG5cclxuICAgICAgICBsZXQgcmVnZXg6IFJlZ0V4cD0gL1tcXHJcXHRcXGZcXHYgXSsvZ207XHJcblxyXG4gICAgICAgIC8vcmVtb3ZlcyBhbGwgY2hhcmFjdGVycyBmcm9tIHN0cmluZyBtYXRjaGVkIGJ5IHRoZSByZWdleFxyXG4gICAgICAgIGxldCBmaWx0ZXJlZENzdjogc3RyaW5nPSB0aGlzLnJlbW92ZUNoYXJhY3Rlcihjc3YsIHJlZ2V4KTtcclxuXHJcbiAgICAgICAgbGV0IGxpbmVzOiBBcnJheTxzdHJpbmc+PSBmaWx0ZXJlZENzdi5zcGxpdCgnXFxuJyk7XHJcblxyXG4gICAgICAgIGxpbmVzPSB0aGlzLnJlbW92ZUVtcHR5TGluZXMobGluZXMpO1xyXG5cclxuICAgICAgICBpZihsaW5lcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBjc3YgaXMgb25seSBjb25zaWRlcmVkIHZhbGlkIGlmIGF0IGxlYXN0IDIgcm93cyBleGlzdCAodGhlIGhlYWRlciByb3cgYW5kIG9uZSBvciBtb3JlIGRhdGEgcm93cykgXHJcbiAgICAgICAgICAgIHJldHVybiBsaW5lcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRocm93IFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvci5idWlsZChUcmFjZURhdGFDb252ZXJzaW9uRXJyb3JUeXBlcy5GT1JNQVRfVklPTEFUSU9OKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmllcyB0byBleHRyYWN0IHRoZSBjb21tYSBzZXBlcmF0b3IgdGhlIGRhdGEgbGluZXMuXHJcbiAgICAgKiBUaGUgZmlyc3QgY2hhcmFjdGVyIHdoaWNoIGlzIG5vdCBhIG51bWJlciwgYSAnLScsIGEgd2hpdGVzcGFjZSBjaGFyYWN0ZXIgb3IgdGhlIGNvbHVtbiBzZXBlcmF0b3IgaXMgdGFrZW4gYXMgY29tbWEgc2VwZXJhdG9yLlxyXG4gICAgICogSWYgbm90IGZvdW5kLCB0aGUgY29tbWEgc2VwZXJhdG9yIGlzIHVuZGVmaW5lZC5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBsaW5lc1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbHNlcFxyXG4gICAgICogQHJldHVybnMgeyhzdHJpbmd8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDb1RyYWNlQ3N2RGVjb252ZXJ0ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB0cnlFeHRyYWN0Q29tc2VwKGxpbmVzOiBBcnJheTxzdHJpbmc+LCBjb2xzZXA6IHN0cmluZyk6IHN0cmluZ3x1bmRlZmluZWQge1xyXG4gICAgICAgICBcclxuICAgICAgICAvL21hdGNoZXMgZm9yIGEgc2luZ2xlIGNoYXJhY3RlciB3aGljaCBpcyBub3QgJy0nIG9yICcwJy0nOScgb3IgJyAnIG9yIGNvbHNlcCBvciB3aGl0ZXNwYWNlIGNoYXJhY3RlclxyXG4gICAgICAgICBsZXQgZ2V0Q29tc2VwUmVnRXg6IFJlZ0V4cD0gbmV3IFJlZ0V4cChcIlteXFwtMC05XFwgXCIrY29sc2VwK1wiXFxyXFxuXFx0XFxmXFx2XVwiKTtcclxuICAgICAgICAgbGV0IGNvbXNlcENhbmRpZGF0ZXM7XHJcbiBcclxuICAgICAgICAgbGV0IGNvbXNlcDogc3RyaW5nIHwgdW5kZWZpbmVkPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgIGZvcihsZXQgaTogbnVtYmVyPSAxOyBpPGxpbmVzLmxlbmd0aDsgaSsrKSB7XHJcbiBcclxuICAgICAgICAgICAgIGNvbXNlcENhbmRpZGF0ZXM9IGdldENvbXNlcFJlZ0V4LmV4ZWMobGluZXNbaV0pOyBcclxuIFxyXG4gICAgICAgICAgICAgLy9pZiBhIGNvbXNlcCBjYW5kaWRhdGUgaXMgZm91bmQgcmV0dXJuIGl0XHJcbiAgICAgICAgICAgICBpZihjb21zZXBDYW5kaWRhdGVzKSB7XHJcbiAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBjb21zZXA9IGNvbXNlcENhbmRpZGF0ZXNbMF07XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuIFxyXG4gICAgICAgICBcclxuICAgICAgICAgLy9pZiBubyBjb21zZXAgY2FuZGlkYXRlIGlzIGZvdW5kIHJldHVybiB1bmRlZmluZWQuIHRoZXJlIGlzIHByb2JhYmx5IG5vIGRlY2ltYWwgdmFsdWUgaW4gY3N2XHJcbiAgICAgICAgIHJldHVybiBjb21zZXA7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJpZXMgdG8gZXh0cmFjdCB0aGUgY29sdW1uIHNlcGVyYXRvciBmcm9tIGtub3duLCBmaXhlZCBwYXJ0cyBvZiB0aGUgaGVhZGVybGluZS5cclxuICAgICAqIENhbiB0aHJvdyBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBoZWFkZXJsaW5lXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIENvVHJhY2VDc3ZEZWNvbnZlcnRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHRyeUV4dHJhY3RDb2xzZXAoaGVhZGVybGluZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBcclxuICAgICAgICAvL21hdGNoZXMgZm9yIGFsbCBjaGFyYWN0ZXJzIGJldHdlZW4gcGhyYXNlcyBcIkVwb2NoVGltZXN0YW1wXCIgYW5kIFwiU2lvc1RpbWVVc2VjXCJcclxuICAgICAgICBsZXQgZ2V0Q29sc2VwUmVnRXg6IFJlZ0V4cD0gbmV3IFJlZ0V4cChcIkVwb2NoVGltZXN0YW1wKC4pU2lvc1RpbWVVc2VjXCIpO1xyXG4gICAgICAgIGxldCBjb2xzZXBDYW5kaWRhdGVzPSBnZXRDb2xzZXBSZWdFeC5leGVjKGhlYWRlcmxpbmUpO1xyXG5cclxuICAgICAgICBpZihjb2xzZXBDYW5kaWRhdGVzKSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29sc2VwQ2FuZGlkYXRlc1sxXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgLy8gaWYgbm8gY29sc2VwIGNhbiBiZSBkZXRlcm1pbmVkIHRoZXJlIGlzIGFuIGluY29ycmVjdCBoZWFkZXJsaW5lIHByb3ZpZGVkXHJcbiAgICAgICAgICAgIHRocm93IFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvci5idWlsZChUcmFjZURhdGFDb252ZXJzaW9uRXJyb3JUeXBlcy5OT19DT0xTRVApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGVtcHR5IHN0cmluZ3MgaW4gYW4gYXJyYXkgb2Ygc3RyaW5ncy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBsaW5lc1xyXG4gICAgICogQHJldHVybnMge0FycmF5PHN0cmluZz59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29UcmFjZUNzdkRlY29udmVydGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVtb3ZlRW1wdHlMaW5lcyhsaW5lczogQXJyYXk8c3RyaW5nPik6IEFycmF5PHN0cmluZz4ge1xyXG5cclxuICAgICAgICByZXR1cm4gbGluZXMuZmlsdGVyKHZhbCA9PiB7IHJldHVybiAodmFsIT09XCJcIikgPyB0cnVlIDogZmFsc2UgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgY2hhcmFjdGVycyAoc3BlY2lmaWVkIGJ5IGEgcmVnZXgpIGZyb20gYSBzdHJpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcclxuICAgICAqIEBwYXJhbSB7UmVnRXhwfSByZWdleFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBDb1RyYWNlQ3N2RGVjb252ZXJ0ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZW1vdmVDaGFyYWN0ZXIoc3RyOiBzdHJpbmcsIHJlZ2V4OiBSZWdFeHApOiBzdHJpbmcge1xyXG5cclxuICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UocmVnZXgsIFwiXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBDb1RyYWNlQ3N2RGVjb252ZXJ0ZXIgfTtcclxuXHJcbiJdfQ==