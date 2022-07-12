define(["require", "exports", "./ytSignal", "./xySignal", "./fftSignal", "../exceptions/traceDataConversionError", "../enums/traceDataConversionErrorTypes", "./ASCsvConverter", "./ASCsvSignalObj", "./ASCsvHeader"], function (require, exports, ytSignal_1, xySignal_1, fftSignal_1, traceDataConversionError_1, traceDataConversionErrorTypes_1, ASCsvConverter_1, ASCsvSignalObj_1, ASCsvHeader_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Runs convertion to an AS CSV string.
     * Adapter class.
     *
     * @class ConverterASCsv
     * @implements {IConverter}
     */
    var ConverterASCsv = /** @class */ (function () {
        function ConverterASCsv() {
        }
        /**
         * Starts convertion of an array of IRecording to a partial file containing an AS CSV string of given format as data and 'csv' as fileending.
         * Can throw TraceDataConversionError.
         *
         * @param {Array<IRecording>} data
         * @param {ConvertTypes} format
         * @returns {IPartialFile}
         * @memberof ConverterASCsv
         */
        ConverterASCsv.prototype.Convert = function (data, format) {
            var _this = this;
            var asCsvSignalArr = new Array();
            //merge recordings with same starttrigger to remove redundant signals
            var mergedRecordings = this.mergeRecordingsOfSameStarttrigger(data);
            mergedRecordings.forEach(function (recording) {
                recording.signals.forEach(function (signal) {
                    var asCsvSignal = _this.handleSignal(signal, new Date(recording.startTriggerTime / 1000.0));
                    asCsvSignalArr.push(asCsvSignal);
                });
            });
            var converterInstance = new ASCsvConverter_1.ASCsvConverter();
            var partialFile;
            try {
                partialFile = converterInstance.convert(asCsvSignalArr, format);
            }
            catch (err) {
                throw traceDataConversionError_1.TraceDataConversionError.isTraceDataConversionError(err) ? err : traceDataConversionError_1.TraceDataConversionError.build(traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.INTERNAL, err);
            }
            return partialFile;
        };
        /**
         * Merges IRecordings with same start triggers.
         * When merging two recordings with same starttrigger, duplicates of signals (identified by name) are removed.
         *
         * @param {IRecording[]} data
         * @returns {Array<IRecording>}
         * @memberof ConverterASCsv
         */
        ConverterASCsv.prototype.mergeRecordingsOfSameStarttrigger = function (data) {
            var filteredRecordings = new Array();
            var reduceTimePrecisionConstant = 1000000;
            var _loop_1 = function (recording) {
                //find index of recording with same startrigger (start trigger time is compared on floored seconds resulution)
                var index = filteredRecordings.findIndex(function (elem) { return (elem.startTriggerTime - (elem.startTriggerTime % reduceTimePrecisionConstant)) === (recording.startTriggerTime - (recording.startTriggerTime % reduceTimePrecisionConstant)); });
                if (index === -1) { // no recording with same starttrigger found => no merging needed
                    filteredRecordings.push(recording);
                }
                else { // recording with same starttrigger found => merge recording (remove possible duplicate signals)
                    var _loop_2 = function (signal) {
                        if (filteredRecordings[index].signals.every(function (elem) { return elem.name !== signal.name; })) { //if signals with same name do not exist in merged recording
                            filteredRecordings[index].signals.push(signal);
                        }
                    };
                    for (var _i = 0, _a = recording.signals; _i < _a.length; _i++) {
                        var signal = _a[_i];
                        _loop_2(signal);
                    }
                }
            };
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var recording = data_1[_i];
                _loop_1(recording);
            }
            return filteredRecordings;
        };
        /**
         * Handles the generation of an AS CSV signal from an YTSignal, XYSignal or FFTSignal.
         *
         * @private
         * @param {ISignal} signal
         * @param {Date} starttrigger
         * @returns {IASCsvSignal}
         * @memberof ConverterASCsv
         */
        ConverterASCsv.prototype.handleSignal = function (signal, starttrigger) {
            var asCsvSignal;
            if (signal instanceof ytSignal_1.YTSignal) {
                asCsvSignal = this.buildASCsvSignalFromYTSignal(signal, starttrigger);
            }
            else if (signal instanceof xySignal_1.XYSignal) {
                asCsvSignal = this.buildASCsvSignalFromXYSignal(signal, starttrigger);
            }
            else if (signal instanceof fftSignal_1.FFTSignal) {
                asCsvSignal = this.buildASCsvSignalFromFFTSignal(signal, starttrigger);
            }
            else {
                throw traceDataConversionError_1.TraceDataConversionError.build(traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.UNKNOWN_FORMAT);
            }
            return asCsvSignal;
        };
        /**
         * Builds an AS CSV signal from a YTSignal.
         *
         * @private
         * @param {YTSignal} signal
         * @param {Date} starttrigger
         * @returns {IASCsvSignal}
         * @memberof ConverterASCsv
         */
        ConverterASCsv.prototype.buildASCsvSignalFromYTSignal = function (signal, starttrigger) {
            var asCsvSignal = new ASCsvSignalObj_1.ASCsvSignalObj(signal.name, starttrigger, signal.items.length, signal.items, undefined, undefined, undefined);
            return asCsvSignal;
        };
        /**
         * Builds an AS CSV signal from a XYSignal.
         *
         * @private
         * @param {XYSignal} signal
         * @param {Date} starttrigger
         * @returns {IASCsvSignal}
         * @memberof ConverterASCsv
         */
        ConverterASCsv.prototype.buildASCsvSignalFromXYSignal = function (signal, starttrigger) {
            var xSignalName = ASCsvHeader_1.ASCsvHeader.buildTitleAttributeString(signal.xSource.name, starttrigger);
            var ySignalName = ASCsvHeader_1.ASCsvHeader.buildTitleAttributeString(signal.ySource.name, starttrigger);
            var formula = "X={'" + xSignalName + "'};Y={'" + ySignalName + "'}";
            var asCsvSignal = new ASCsvSignalObj_1.ASCsvSignalObj(signal.name, starttrigger, signal.items.length, signal.items, undefined, undefined, formula);
            return asCsvSignal;
        };
        /**
         * Builds an AS CSV signal from a FFTSignal.
         *
         * @private
         * @param {FFTSignal} signal
         * @param {Date} starttrigger
         * @returns {IASCsvSignal}
         * @memberof ConverterASCsv
         */
        ConverterASCsv.prototype.buildASCsvSignalFromFFTSignal = function (signal, starttrigger) {
            var signalName = ASCsvHeader_1.ASCsvHeader.buildTitleAttributeString(signal.source.name, starttrigger);
            var formula = "Y={FFT('" + signalName + "')}";
            var asCsvSignal = new ASCsvSignalObj_1.ASCsvSignalObj(signal.name, starttrigger, signal.items.length, signal.items, undefined, undefined, formula);
            return asCsvSignal;
        };
        return ConverterASCsv;
    }());
    exports.ConverterASCsv = ConverterASCsv;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydGVyQVNDc3YuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi90cmFjZURhdGFDb252ZXJzaW9uL2NsYXNzZXMvY29udmVydGVyQVNDc3YudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBZ0JBOzs7Ozs7T0FNRztJQUNIO1FBQUE7UUE4SkEsQ0FBQztRQTNKRzs7Ozs7Ozs7V0FRRztRQUNJLGdDQUFPLEdBQWQsVUFBZSxJQUF1QixFQUFFLE1BQW9CO1lBQTVELGlCQTBCQztZQXhCRyxJQUFJLGNBQWMsR0FBd0IsSUFBSSxLQUFLLEVBQWdCLENBQUM7WUFFcEUscUVBQXFFO1lBQ3JFLElBQUksZ0JBQWdCLEdBQXNCLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUV2RixnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsVUFBQSxTQUFTO2dCQUM5QixTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFBLE1BQU07b0JBQzVCLElBQUksV0FBVyxHQUFFLEtBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsR0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUV4RixjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNyQyxDQUFDLENBQUMsQ0FBQTtZQUNOLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLCtCQUFjLEVBQUUsQ0FBQztZQUU3QyxJQUFJLFdBQXlCLENBQUM7WUFDOUIsSUFBSTtnQkFDQSxXQUFXLEdBQUUsaUJBQWlCLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQzthQUNsRTtZQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUVWLE1BQU0sbURBQXdCLENBQUMsMEJBQTBCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFD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Q0wscUJBQUM7SUFBRCxDQUFDLEFBOUpELElBOEpDO0lBRVEsd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb252ZXJ0VHlwZXMgfSBmcm9tIFwiLi4vZW51bXMvQ29udmVydFR5cGVzXCI7XHJcbmltcG9ydCB7IElSZWNvcmRpbmcgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9yZWNvcmRpbmdJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVBhcnRpYWxGaWxlIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvSVBhcnRpYWxGaWxlXCI7XHJcbmltcG9ydCB7IElBU0NzdlNpZ25hbCB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL0lBU0NzdlNpZ25hbFwiO1xyXG5pbXBvcnQgeyBZVFNpZ25hbCB9IGZyb20gXCIuL3l0U2lnbmFsXCI7XHJcbmltcG9ydCB7IFhZU2lnbmFsIH0gZnJvbSBcIi4veHlTaWduYWxcIjtcclxuaW1wb3J0IHsgRkZUU2lnbmFsIH0gZnJvbSBcIi4vZmZ0U2lnbmFsXCI7XHJcbmltcG9ydCB7IFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvciB9IGZyb20gXCIuLi9leGNlcHRpb25zL3RyYWNlRGF0YUNvbnZlcnNpb25FcnJvclwiO1xyXG5pbXBvcnQgeyBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3JUeXBlcyB9IGZyb20gXCIuLi9lbnVtcy90cmFjZURhdGFDb252ZXJzaW9uRXJyb3JUeXBlc1wiO1xyXG5pbXBvcnQgeyBBU0NzdkNvbnZlcnRlciB9IGZyb20gXCIuL0FTQ3N2Q29udmVydGVyXCI7XHJcbmltcG9ydCB7IEFTQ3N2U2lnbmFsT2JqIH0gZnJvbSBcIi4vQVNDc3ZTaWduYWxPYmpcIjtcclxuaW1wb3J0IHsgQVNDc3ZIZWFkZXIgfSBmcm9tIFwiLi9BU0NzdkhlYWRlclwiO1xyXG5pbXBvcnQgeyBJU2lnbmFsIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvc2lnbmFsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElDb252ZXJ0ZXIgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9JQ29udmVydGVyXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIFJ1bnMgY29udmVydGlvbiB0byBhbiBBUyBDU1Ygc3RyaW5nLlxyXG4gKiBBZGFwdGVyIGNsYXNzLlxyXG4gKlxyXG4gKiBAY2xhc3MgQ29udmVydGVyQVNDc3ZcclxuICogQGltcGxlbWVudHMge0lDb252ZXJ0ZXJ9XHJcbiAqL1xyXG5jbGFzcyBDb252ZXJ0ZXJBU0NzdiBpbXBsZW1lbnRzIElDb252ZXJ0ZXIge1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0YXJ0cyBjb252ZXJ0aW9uIG9mIGFuIGFycmF5IG9mIElSZWNvcmRpbmcgdG8gYSBwYXJ0aWFsIGZpbGUgY29udGFpbmluZyBhbiBBUyBDU1Ygc3RyaW5nIG9mIGdpdmVuIGZvcm1hdCBhcyBkYXRhIGFuZCAnY3N2JyBhcyBmaWxlZW5kaW5nLlxyXG4gICAgICogQ2FuIHRocm93IFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElSZWNvcmRpbmc+fSBkYXRhXHJcbiAgICAgKiBAcGFyYW0ge0NvbnZlcnRUeXBlc30gZm9ybWF0XHJcbiAgICAgKiBAcmV0dXJucyB7SVBhcnRpYWxGaWxlfVxyXG4gICAgICogQG1lbWJlcm9mIENvbnZlcnRlckFTQ3N2XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDb252ZXJ0KGRhdGE6IEFycmF5PElSZWNvcmRpbmc+LCBmb3JtYXQ6IENvbnZlcnRUeXBlcyk6IElQYXJ0aWFsRmlsZSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGFzQ3N2U2lnbmFsQXJyOiBBcnJheTxJQVNDc3ZTaWduYWw+ID0gbmV3IEFycmF5PElBU0NzdlNpZ25hbD4oKTtcclxuXHJcbiAgICAgICAgLy9tZXJnZSByZWNvcmRpbmdzIHdpdGggc2FtZSBzdGFydHRyaWdnZXIgdG8gcmVtb3ZlIHJlZHVuZGFudCBzaWduYWxzXHJcbiAgICAgICAgbGV0IG1lcmdlZFJlY29yZGluZ3M6IEFycmF5PElSZWNvcmRpbmc+ID0gdGhpcy5tZXJnZVJlY29yZGluZ3NPZlNhbWVTdGFydHRyaWdnZXIoZGF0YSk7XHJcblxyXG4gICAgICAgIG1lcmdlZFJlY29yZGluZ3MuZm9yRWFjaChyZWNvcmRpbmcgPT4ge1xyXG4gICAgICAgICAgICByZWNvcmRpbmcuc2lnbmFscy5mb3JFYWNoKHNpZ25hbCA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXNDc3ZTaWduYWwgPXRoaXMuaGFuZGxlU2lnbmFsKHNpZ25hbCwgbmV3IERhdGUocmVjb3JkaW5nLnN0YXJ0VHJpZ2dlclRpbWUvMTAwMC4wKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgYXNDc3ZTaWduYWxBcnIucHVzaChhc0NzdlNpZ25hbCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBjb252ZXJ0ZXJJbnN0YW5jZSA9IG5ldyBBU0NzdkNvbnZlcnRlcigpO1xyXG5cclxuICAgICAgICBsZXQgcGFydGlhbEZpbGU6IElQYXJ0aWFsRmlsZTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBwYXJ0aWFsRmlsZT0gY29udmVydGVySW5zdGFuY2UuY29udmVydChhc0NzdlNpZ25hbEFyciwgZm9ybWF0KTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRocm93IFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvci5pc1RyYWNlRGF0YUNvbnZlcnNpb25FcnJvcihlcnIpID8gZXJyIDogVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yLmJ1aWxkKFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvclR5cGVzLklOVEVSTkFMLCBlcnIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHBhcnRpYWxGaWxlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWVyZ2VzIElSZWNvcmRpbmdzIHdpdGggc2FtZSBzdGFydCB0cmlnZ2Vycy4gXHJcbiAgICAgKiBXaGVuIG1lcmdpbmcgdHdvIHJlY29yZGluZ3Mgd2l0aCBzYW1lIHN0YXJ0dHJpZ2dlciwgZHVwbGljYXRlcyBvZiBzaWduYWxzIChpZGVudGlmaWVkIGJ5IG5hbWUpIGFyZSByZW1vdmVkLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVJlY29yZGluZ1tdfSBkYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SVJlY29yZGluZz59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29udmVydGVyQVNDc3ZcclxuICAgICAqL1xyXG4gICAgbWVyZ2VSZWNvcmRpbmdzT2ZTYW1lU3RhcnR0cmlnZ2VyKGRhdGE6IElSZWNvcmRpbmdbXSk6IEFycmF5PElSZWNvcmRpbmc+IHtcclxuXHJcbiAgICAgICAgbGV0IGZpbHRlcmVkUmVjb3JkaW5nczogQXJyYXk8SVJlY29yZGluZz4gPSBuZXcgQXJyYXkoKTtcclxuXHJcbiAgICAgICAgbGV0IHJlZHVjZVRpbWVQcmVjaXNpb25Db25zdGFudCA9IDEwMDAwMDA7XHJcblxyXG4gICAgICAgIGZvcihsZXQgcmVjb3JkaW5nIG9mIGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgIC8vZmluZCBpbmRleCBvZiByZWNvcmRpbmcgd2l0aCBzYW1lIHN0YXJ0cmlnZ2VyIChzdGFydCB0cmlnZ2VyIHRpbWUgaXMgY29tcGFyZWQgb24gZmxvb3JlZCBzZWNvbmRzIHJlc3VsdXRpb24pXHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IGZpbHRlcmVkUmVjb3JkaW5ncy5maW5kSW5kZXgoKGVsZW0pID0+IHtyZXR1cm4gKGVsZW0uc3RhcnRUcmlnZ2VyVGltZS0oZWxlbS5zdGFydFRyaWdnZXJUaW1lJXJlZHVjZVRpbWVQcmVjaXNpb25Db25zdGFudCkpID09PSAocmVjb3JkaW5nLnN0YXJ0VHJpZ2dlclRpbWUtKHJlY29yZGluZy5zdGFydFRyaWdnZXJUaW1lJXJlZHVjZVRpbWVQcmVjaXNpb25Db25zdGFudCkpfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihpbmRleCA9PT0gLTEpIHsgLy8gbm8gcmVjb3JkaW5nIHdpdGggc2FtZSBzdGFydHRyaWdnZXIgZm91bmQgPT4gbm8gbWVyZ2luZyBuZWVkZWRcclxuXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJlZFJlY29yZGluZ3MucHVzaChyZWNvcmRpbmcpO1xyXG4gICAgICAgICAgICB9IGVsc2UgeyAvLyByZWNvcmRpbmcgd2l0aCBzYW1lIHN0YXJ0dHJpZ2dlciBmb3VuZCA9PiBtZXJnZSByZWNvcmRpbmcgKHJlbW92ZSBwb3NzaWJsZSBkdXBsaWNhdGUgc2lnbmFscylcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBzaWduYWwgb2YgcmVjb3JkaW5nLnNpZ25hbHMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZmlsdGVyZWRSZWNvcmRpbmdzW2luZGV4XS5zaWduYWxzLmV2ZXJ5KChlbGVtKSA9PiB7cmV0dXJuIGVsZW0ubmFtZSAhPT0gc2lnbmFsLm5hbWV9KSkgeyAvL2lmIHNpZ25hbHMgd2l0aCBzYW1lIG5hbWUgZG8gbm90IGV4aXN0IGluIG1lcmdlZCByZWNvcmRpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRSZWNvcmRpbmdzW2luZGV4XS5zaWduYWxzLnB1c2goc2lnbmFsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmaWx0ZXJlZFJlY29yZGluZ3M7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlcyB0aGUgZ2VuZXJhdGlvbiBvZiBhbiBBUyBDU1Ygc2lnbmFsIGZyb20gYW4gWVRTaWduYWwsIFhZU2lnbmFsIG9yIEZGVFNpZ25hbC5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJU2lnbmFsfSBzaWduYWxcclxuICAgICAqIEBwYXJhbSB7RGF0ZX0gc3RhcnR0cmlnZ2VyXHJcbiAgICAgKiBAcmV0dXJucyB7SUFTQ3N2U2lnbmFsfVxyXG4gICAgICogQG1lbWJlcm9mIENvbnZlcnRlckFTQ3N2XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaGFuZGxlU2lnbmFsKHNpZ25hbDogSVNpZ25hbCwgc3RhcnR0cmlnZ2VyOiBEYXRlKTogSUFTQ3N2U2lnbmFsIHtcclxuXHJcbiAgICAgICAgbGV0IGFzQ3N2U2lnbmFsOiBJQVNDc3ZTaWduYWw7XHJcbiAgICAgICAgaWYoc2lnbmFsIGluc3RhbmNlb2YgWVRTaWduYWwpIHtcclxuXHJcbiAgICAgICAgICAgIGFzQ3N2U2lnbmFsID0gdGhpcy5idWlsZEFTQ3N2U2lnbmFsRnJvbVlUU2lnbmFsKHNpZ25hbCwgc3RhcnR0cmlnZ2VyKTtcclxuICAgICAgICB9IGVsc2UgaWYoc2lnbmFsIGluc3RhbmNlb2YgWFlTaWduYWwpIHtcclxuXHJcbiAgICAgICAgICAgIGFzQ3N2U2lnbmFsID0gdGhpcy5idWlsZEFTQ3N2U2lnbmFsRnJvbVhZU2lnbmFsKHNpZ25hbCwgc3RhcnR0cmlnZ2VyKTtcclxuICAgICAgICB9IGVsc2UgaWYoc2lnbmFsIGluc3RhbmNlb2YgRkZUU2lnbmFsKSB7XHJcblxyXG4gICAgICAgICAgICBhc0NzdlNpZ25hbCA9IHRoaXMuYnVpbGRBU0NzdlNpZ25hbEZyb21GRlRTaWduYWwoc2lnbmFsLCBzdGFydHRyaWdnZXIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICB0aHJvdyBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IuYnVpbGQoVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yVHlwZXMuVU5LTk9XTl9GT1JNQVQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGFzQ3N2U2lnbmFsO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJ1aWxkcyBhbiBBUyBDU1Ygc2lnbmFsIGZyb20gYSBZVFNpZ25hbC5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtZVFNpZ25hbH0gc2lnbmFsXHJcbiAgICAgKiBAcGFyYW0ge0RhdGV9IHN0YXJ0dHJpZ2dlclxyXG4gICAgICogQHJldHVybnMge0lBU0NzdlNpZ25hbH1cclxuICAgICAqIEBtZW1iZXJvZiBDb252ZXJ0ZXJBU0NzdlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGJ1aWxkQVNDc3ZTaWduYWxGcm9tWVRTaWduYWwoc2lnbmFsOiBZVFNpZ25hbCwgc3RhcnR0cmlnZ2VyOiBEYXRlKTogSUFTQ3N2U2lnbmFsIHtcclxuXHJcbiAgICAgICAgbGV0IGFzQ3N2U2lnbmFsOiBJQVNDc3ZTaWduYWwgPSBuZXcgQVNDc3ZTaWduYWxPYmooc2lnbmFsLm5hbWUsIHN0YXJ0dHJpZ2dlciwgc2lnbmFsLml0ZW1zLmxlbmd0aCwgc2lnbmFsLml0ZW1zLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGFzQ3N2U2lnbmFsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQnVpbGRzIGFuIEFTIENTViBzaWduYWwgZnJvbSBhIFhZU2lnbmFsLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1hZU2lnbmFsfSBzaWduYWxcclxuICAgICAqIEBwYXJhbSB7RGF0ZX0gc3RhcnR0cmlnZ2VyXHJcbiAgICAgKiBAcmV0dXJucyB7SUFTQ3N2U2lnbmFsfVxyXG4gICAgICogQG1lbWJlcm9mIENvbnZlcnRlckFTQ3N2XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYnVpbGRBU0NzdlNpZ25hbEZyb21YWVNpZ25hbChzaWduYWw6IFhZU2lnbmFsLCBzdGFydHRyaWdnZXI6IERhdGUpOiBJQVNDc3ZTaWduYWwge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCB4U2lnbmFsTmFtZTogc3RyaW5nID0gQVNDc3ZIZWFkZXIuYnVpbGRUaXRsZUF0dHJpYnV0ZVN0cmluZyhzaWduYWwueFNvdXJjZS5uYW1lLCBzdGFydHRyaWdnZXIpO1xyXG4gICAgICAgIGxldCB5U2lnbmFsTmFtZTogc3RyaW5nID0gQVNDc3ZIZWFkZXIuYnVpbGRUaXRsZUF0dHJpYnV0ZVN0cmluZyhzaWduYWwueVNvdXJjZS5uYW1lLCBzdGFydHRyaWdnZXIpO1xyXG4gICAgICAgIGxldCBmb3JtdWxhOiBzdHJpbmcgPSBcIlg9eydcIisgeFNpZ25hbE5hbWUgK1wiJ307WT17J1wiKyB5U2lnbmFsTmFtZSArXCInfVwiO1xyXG4gICAgICAgIGxldCBhc0NzdlNpZ25hbDogSUFTQ3N2U2lnbmFsID0gbmV3IEFTQ3N2U2lnbmFsT2JqKHNpZ25hbC5uYW1lLCBzdGFydHRyaWdnZXIsIHNpZ25hbC5pdGVtcy5sZW5ndGgsIHNpZ25hbC5pdGVtcywgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGZvcm11bGEpO1xyXG5cclxuICAgICAgICByZXR1cm4gYXNDc3ZTaWduYWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCdWlsZHMgYW4gQVMgQ1NWIHNpZ25hbCBmcm9tIGEgRkZUU2lnbmFsLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0ZGVFNpZ25hbH0gc2lnbmFsXHJcbiAgICAgKiBAcGFyYW0ge0RhdGV9IHN0YXJ0dHJpZ2dlclxyXG4gICAgICogQHJldHVybnMge0lBU0NzdlNpZ25hbH1cclxuICAgICAqIEBtZW1iZXJvZiBDb252ZXJ0ZXJBU0NzdlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGJ1aWxkQVNDc3ZTaWduYWxGcm9tRkZUU2lnbmFsKHNpZ25hbDogRkZUU2lnbmFsLCBzdGFydHRyaWdnZXI6IERhdGUpOiBJQVNDc3ZTaWduYWwge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBzaWduYWxOYW1lOiBzdHJpbmcgPSBBU0NzdkhlYWRlci5idWlsZFRpdGxlQXR0cmlidXRlU3RyaW5nKHNpZ25hbC5zb3VyY2UubmFtZSwgc3RhcnR0cmlnZ2VyKTtcclxuICAgICAgICBsZXQgZm9ybXVsYTogc3RyaW5nID0gXCJZPXtGRlQoJ1wiKyBzaWduYWxOYW1lICtcIicpfVwiO1xyXG4gICAgICAgIGxldCBhc0NzdlNpZ25hbDogSUFTQ3N2U2lnbmFsID0gbmV3IEFTQ3N2U2lnbmFsT2JqKHNpZ25hbC5uYW1lLCBzdGFydHRyaWdnZXIsIHNpZ25hbC5pdGVtcy5sZW5ndGgsIHNpZ25hbC5pdGVtcywgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGZvcm11bGEpO1xyXG5cclxuICAgICAgICByZXR1cm4gYXNDc3ZTaWduYWw7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IENvbnZlcnRlckFTQ3N2IH07Il19