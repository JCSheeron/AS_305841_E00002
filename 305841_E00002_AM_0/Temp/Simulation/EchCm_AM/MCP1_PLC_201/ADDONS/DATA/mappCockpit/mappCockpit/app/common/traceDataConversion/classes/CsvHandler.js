define(["require", "exports", "./deconverterCoTraceCsv", "./deconverterASCsv", "../exceptions/traceDataConversionError", "../enums/traceDataConversionErrorTypes"], function (require, exports, deconverterCoTraceCsv_1, deconverterASCsv_1, traceDataConversionError_1, traceDataConversionErrorTypes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Handles the decision of which deconverter to use on a csv string.
     *
     * @class CsvHandler
     */
    var CsvHandler = /** @class */ (function () {
        function CsvHandler() {
        }
        /**
         * Analyzes csv string to pick correct csv deconverter and deconverts with it.
         * Can throw TraceDataConversionError.
         *
         * @param {string} csv
         * @returns {IRecording[]}
         * @memberof CsvHandler
         */
        CsvHandler.prototype.pickDeconverter = function (csv) {
            var deconverter;
            deconverter = this.chooseCsvDeconverter(csv);
            if (deconverter != null) {
                return deconverter;
            }
            throw traceDataConversionError_1.TraceDataConversionError.build(traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.UNKNOWN_FORMAT);
        };
        /**
         * Returns associated Deconverter based on characteristics of csv string or null if no characteristics are met.
         *
         * @private
         * @param {string} csv
         * @returns {(IDeconverter | null)}
         * @memberof CsvHandler
         */
        CsvHandler.prototype.chooseCsvDeconverter = function (csv) {
            var deconverter = null;
            //assuming csv string to be a CoTraceCsv if it contains appropriate headerline
            //<start of line>EpochTimestamp<column seperator>SiosTimeUsec<column seperator>RelativeTime
            if (csv.search(/^EpochTimestamp.SiosTimeUsec.RelativeTime/m) >= 0) {
                deconverter = new deconverterCoTraceCsv_1.DeconverterCoTraceCsv();
            }
            //assuming csv string to be a AsCsv if it contains appropriate part of headerline
            //<start of line>% TYPE=CHART-DATA-ASCII V=2<comma seperator>0
            if (csv.search(/^%\ TYPE=CHART-DATA-ASCII\ V=2.0/m) >= 0) {
                deconverter = new deconverterASCsv_1.DeconverterASCsv();
            }
            return deconverter;
        };
        return CsvHandler;
    }());
    exports.CsvHandler = CsvHandler;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3N2SGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3RyYWNlRGF0YUNvbnZlcnNpb24vY2xhc3Nlcy9Dc3ZIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQU9BOzs7O09BSUc7SUFDSDtRQUFBO1FBc0RBLENBQUM7UUFuREc7Ozs7Ozs7V0FPRztRQUNJLG9DQUFlLEdBQXRCLFVBQXVCLEdBQVc7WUFFOUIsSUFBSSxXQUFnQyxDQUFDO1lBRXJDLFdBQVcsR0FBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFNUMsSUFBRyxXQUFXLElBQUksSUFBSSxFQUFFO2dCQUNwQixPQUFPLFdBQVcsQ0FBQzthQUN0QjtZQUVELE1BQU0sbURBQXdCLENBQUMsS0FBSyxDQUFDLDZEQUE2QixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3ZGLENBQUM7UUFHRDs7Ozs7OztXQU9HO1FBQ0sseUNBQW9CLEdBQTVCLFVBQTZCLEdBQVc7WUFFcEMsSUFBSSxXQUFXLEdBQXVCLElBQUksQ0FBQztZQUUzQyw4RUFBOEU7WUFDOUUsMkZBQTJGO1lBQzNGLElBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyw0Q0FBNEMsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFFOUQsV0FBVyxHQUFFLElBQUksNkNBQXFCLEVBQUUsQ0FBQzthQUM1QztZQUVELGlGQUFpRjtZQUNqRiw4REFBOEQ7WUFDOUQsSUFBRyxHQUFHLENBQUMsTUFBTSxDQUFDLG1DQUFtQyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUVyRCxXQUFXLEdBQUUsSUFBSSxtQ0FBZ0IsRUFBRSxDQUFDO2FBQ3ZDO1lBRUQsT0FBTyxXQUFXLENBQUM7UUFFdkIsQ0FBQztRQUNMLGlCQUFDO0lBQUQsQ0FBQyxBQXRERCxJQXNEQztJQUVRLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGVjb252ZXJ0ZXJDb1RyYWNlQ3N2IH0gZnJvbSBcIi4vZGVjb252ZXJ0ZXJDb1RyYWNlQ3N2XCI7XHJcbmltcG9ydCB7IElEZWNvbnZlcnRlciB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL0lEZWNvbnZlcnRlclwiO1xyXG5pbXBvcnQgeyBEZWNvbnZlcnRlckFTQ3N2IH0gZnJvbSBcIi4vZGVjb252ZXJ0ZXJBU0NzdlwiO1xyXG5pbXBvcnQgeyBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IgfSBmcm9tIFwiLi4vZXhjZXB0aW9ucy90cmFjZURhdGFDb252ZXJzaW9uRXJyb3JcIjtcclxuaW1wb3J0IHsgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yVHlwZXMgfSBmcm9tIFwiLi4vZW51bXMvdHJhY2VEYXRhQ29udmVyc2lvbkVycm9yVHlwZXNcIjtcclxuXHJcblxyXG4vKipcclxuICogSGFuZGxlcyB0aGUgZGVjaXNpb24gb2Ygd2hpY2ggZGVjb252ZXJ0ZXIgdG8gdXNlIG9uIGEgY3N2IHN0cmluZy5cclxuICpcclxuICogQGNsYXNzIENzdkhhbmRsZXJcclxuICovXHJcbmNsYXNzIENzdkhhbmRsZXIge1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFuYWx5emVzIGNzdiBzdHJpbmcgdG8gcGljayBjb3JyZWN0IGNzdiBkZWNvbnZlcnRlciBhbmQgZGVjb252ZXJ0cyB3aXRoIGl0LlxyXG4gICAgICogQ2FuIHRocm93IFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY3N2XHJcbiAgICAgKiBAcmV0dXJucyB7SVJlY29yZGluZ1tdfVxyXG4gICAgICogQG1lbWJlcm9mIENzdkhhbmRsZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHBpY2tEZWNvbnZlcnRlcihjc3Y6IHN0cmluZyk6IElEZWNvbnZlcnRlciB7XHJcblxyXG4gICAgICAgIGxldCBkZWNvbnZlcnRlcjogSURlY29udmVydGVyIHwgbnVsbDtcclxuXHJcbiAgICAgICAgZGVjb252ZXJ0ZXI9IHRoaXMuY2hvb3NlQ3N2RGVjb252ZXJ0ZXIoY3N2KTtcclxuXHJcbiAgICAgICAgaWYoZGVjb252ZXJ0ZXIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZGVjb252ZXJ0ZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aHJvdyBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IuYnVpbGQoVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yVHlwZXMuVU5LTk9XTl9GT1JNQVQpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYXNzb2NpYXRlZCBEZWNvbnZlcnRlciBiYXNlZCBvbiBjaGFyYWN0ZXJpc3RpY3Mgb2YgY3N2IHN0cmluZyBvciBudWxsIGlmIG5vIGNoYXJhY3RlcmlzdGljcyBhcmUgbWV0LlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY3N2XHJcbiAgICAgKiBAcmV0dXJucyB7KElEZWNvbnZlcnRlciB8IG51bGwpfVxyXG4gICAgICogQG1lbWJlcm9mIENzdkhhbmRsZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjaG9vc2VDc3ZEZWNvbnZlcnRlcihjc3Y6IHN0cmluZyk6IElEZWNvbnZlcnRlciB8IG51bGwge1xyXG5cclxuICAgICAgICBsZXQgZGVjb252ZXJ0ZXI6IElEZWNvbnZlcnRlciB8IG51bGw9IG51bGw7XHJcblxyXG4gICAgICAgIC8vYXNzdW1pbmcgY3N2IHN0cmluZyB0byBiZSBhIENvVHJhY2VDc3YgaWYgaXQgY29udGFpbnMgYXBwcm9wcmlhdGUgaGVhZGVybGluZVxyXG4gICAgICAgIC8vPHN0YXJ0IG9mIGxpbmU+RXBvY2hUaW1lc3RhbXA8Y29sdW1uIHNlcGVyYXRvcj5TaW9zVGltZVVzZWM8Y29sdW1uIHNlcGVyYXRvcj5SZWxhdGl2ZVRpbWVcclxuICAgICAgICBpZihjc3Yuc2VhcmNoKC9eRXBvY2hUaW1lc3RhbXAuU2lvc1RpbWVVc2VjLlJlbGF0aXZlVGltZS9tKSA+PSAwKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBkZWNvbnZlcnRlcj0gbmV3IERlY29udmVydGVyQ29UcmFjZUNzdigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9hc3N1bWluZyBjc3Ygc3RyaW5nIHRvIGJlIGEgQXNDc3YgaWYgaXQgY29udGFpbnMgYXBwcm9wcmlhdGUgcGFydCBvZiBoZWFkZXJsaW5lXHJcbiAgICAgICAgLy88c3RhcnQgb2YgbGluZT4lIFRZUEU9Q0hBUlQtREFUQS1BU0NJSSBWPTI8Y29tbWEgc2VwZXJhdG9yPjBcclxuICAgICAgICBpZihjc3Yuc2VhcmNoKC9eJVxcIFRZUEU9Q0hBUlQtREFUQS1BU0NJSVxcIFY9Mi4wL20pID49IDApIHtcclxuXHJcbiAgICAgICAgICAgIGRlY29udmVydGVyPSBuZXcgRGVjb252ZXJ0ZXJBU0NzdigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGRlY29udmVydGVyO1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgQ3N2SGFuZGxlciB9OyJdfQ==