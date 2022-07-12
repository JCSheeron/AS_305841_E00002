define(["require", "exports", "./ASCsvDeconverter", "../exceptions/traceDataConversionError", "../enums/traceDataConversionErrorTypes", "./ASCsvHeader", "./ytSignal", "./xySignal", "./fftSignal", "../../../core/types/frequencyAmplitude", "../../../core/types/point", "../../../core/types/sample"], function (require, exports, ASCsvDeconverter_1, traceDataConversionError_1, traceDataConversionErrorTypes_1, ASCsvHeader_1, ytSignal_1, xySignal_1, fftSignal_1, frequencyAmplitude_1, point_1, sample_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Runs deconvertion of an AS CSV string.
     * Adapter class.
     *
     * @class DeconverterASCsv
     * @implements {IDeconverter}
     */
    var DeconverterASCsv = /** @class */ (function () {
        function DeconverterASCsv() {
        }
        /**
         * Starts a deconvertion of an AS CSV string into an array of IRecording.
         * Can throw TraceDataConverionError.
         *
         * @param {string} data
         * @returns {Array<IRecording>}
         * @memberof DeconverterASCsv
         */
        DeconverterASCsv.prototype.Deconvert = function (data) {
            var deconverter = new ASCsvDeconverter_1.ASCsvDeconverter();
            var asCsvSignals;
            try {
                asCsvSignals = deconverter.deconvert(data);
            }
            catch (err) {
                throw traceDataConversionError_1.TraceDataConversionError.isTraceDataConversionError(err) ? err : traceDataConversionError_1.TraceDataConversionError.build(traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.INTERNAL, err);
            }
            var originalASCsvSignals = this.extractOriginalASCsvSignals(asCsvSignals);
            var calculatedASCsvSignals = this.extractCalculatedASCsvSignals(asCsvSignals);
            calculatedASCsvSignals = this.updateStartTriggerTimeCalculatedASCsvSignals(calculatedASCsvSignals, originalASCsvSignals);
            var recordings = this.createRecordings(originalASCsvSignals, calculatedASCsvSignals);
            return recordings;
        };
        /**
         * Changes the starttrigger time of a calculated AS CSV signal to the starttrigger time of its original signal.
         * If the starttriggertime of the original signals are not equal or the original signals are not found it will NOT update the start trigger time of the calculated signal.
         *
         * @private
         * @param {IASCsvSignal[]} calculatedASCsvSignals
         * @param {IASCsvSignal[]} originalASCsvSignals
         * @returns {IASCsvSignal[]}
         * @memberof DeconverterASCsv
         */
        DeconverterASCsv.prototype.updateStartTriggerTimeCalculatedASCsvSignals = function (calculatedASCsvSignals, originalASCsvSignals) {
            var _this = this;
            calculatedASCsvSignals.forEach(function (signal) {
                var starttriggers = new Array();
                var xyResult = DeconverterASCsv.xyFormulaRegExp.exec(signal.formula);
                if (xyResult != null) {
                    var signals = _this.tryGetASCsvSignalsByTitle([xyResult[1], xyResult[2]], originalASCsvSignals);
                    starttriggers = _this.getUniqueStarttriggers(signals);
                }
                var fftResult = DeconverterASCsv.fftFormulaRegExp.exec(signal.formula);
                if (fftResult != null) {
                    var signals = _this.tryGetASCsvSignalsByTitle([fftResult[1]], originalASCsvSignals);
                    starttriggers = _this.getUniqueStarttriggers(signals);
                }
                if (starttriggers.length === 1) {
                    signal.starttrigger = starttriggers[0];
                }
            });
            return calculatedASCsvSignals;
        };
        /**
         * Extracts AS CSV signals from an array based on the title.
         *
         * @private
         * @param {Array<string>} titles
         * @param {Array<IASCsvSignal>} originalASCsvSignals
         * @returns {Array<IASCsvSignal>}
         * @memberof DeconverterASCsv
         */
        DeconverterASCsv.prototype.tryGetASCsvSignalsByTitle = function (titles, originalASCsvSignals) {
            var names = new Array();
            titles.forEach(function (title) {
                names.push(ASCsvHeader_1.ASCsvHeader.tryRemoveStartTrigger(title));
            });
            var signals = new Array();
            originalASCsvSignals.forEach(function (signal) {
                if (names.includes(signal.title)) {
                    signals.push(signal);
                }
            });
            return signals;
        };
        /**
         * Creates Recordings based on the given original and calculated signals.
         *
         * @private
         * @param {Array<IASCsvSignal>} originalASCsvSignals
         * @param {Array<IASCsvSignal>} calculatedASCsvSignals
         * @returns {Array<IRecording>}
         * @memberof DeconverterASCsv
         */
        DeconverterASCsv.prototype.createRecordings = function (originalASCsvSignals, calculatedASCsvSignals) {
            var _this = this;
            var uniqueStarttriggers = this.getUniqueStarttriggers(originalASCsvSignals);
            var recordings = new Array();
            uniqueStarttriggers.forEach(function (starttrigger) {
                var asCsvSignals = _this.getASCsvSignalsToStarttrigger(starttrigger, originalASCsvSignals, calculatedASCsvSignals);
                var signals = _this.generateSignals(asCsvSignals);
                recordings.push({
                    startTriggerTime: starttrigger.getTime() * 1000.0,
                    signals: signals
                });
            });
            return recordings;
        };
        /**
         * Generates Signals according to its types.
         * The generated signals can be of type YTSignal, XYSignal and FFTSignal.
         *
         * @private
         * @param {IASCsvSignal[]} asCsvSignals
         * @returns {ISignal[]}
         * @memberof DeconverterASCsv
         */
        DeconverterASCsv.prototype.generateSignals = function (asCsvSignals) {
            var _this = this;
            var signals = new Array();
            asCsvSignals.forEach(function (signal) {
                if (ASCsvHeader_1.ASCsvHeader.isOriginalASCsvSignal(signal)) {
                    signals.push(_this.generateYTSignal(signal));
                    return;
                }
                var xyResult = DeconverterASCsv.xyFormulaRegExp.exec(signal.formula);
                if (xyResult !== null) {
                    var sourcesASCsv = _this.tryGetASCsvSignalsByTitle([xyResult[1], xyResult[2]], asCsvSignals);
                    var xSourceASCsv = sourcesASCsv.find(function (source) { return source.title === ASCsvHeader_1.ASCsvHeader.tryRemoveStartTrigger(xyResult[1]); });
                    var ySourceASCsv = sourcesASCsv.find(function (source) { return source.title === ASCsvHeader_1.ASCsvHeader.tryRemoveStartTrigger(xyResult[2]); });
                    if (xSourceASCsv !== undefined && ySourceASCsv !== undefined) {
                        signals.push(_this.generateXYSignal(signal, xSourceASCsv, ySourceASCsv));
                    }
                    return;
                }
                var fftResult = DeconverterASCsv.fftFormulaRegExp.exec(signal.formula);
                if (fftResult !== null) {
                    var sourceASCsv = _this.tryGetASCsvSignalsByTitle([fftResult[1]], asCsvSignals);
                    if (sourceASCsv.length === 1) {
                        signals.push(_this.generateFFTSignal(signal, sourceASCsv[0]));
                    }
                }
            });
            return signals;
        };
        /**
         * Generates a FFTSignal from an AS CSV signal.
         *
         * @private
         * @param {IASCsvSignal} signal
         * @param {IASCsvSignal} sourceASCsv
         * @returns {FFTSignal}
         * @memberof DeconverterASCsv
         */
        DeconverterASCsv.prototype.generateFFTSignal = function (signal, sourceASCsv) {
            var freqAmps = this.valuePairsToFrequencyAmplitudes(signal.data);
            var source = this.generateYTSignal(sourceASCsv);
            var fftSignal = new fftSignal_1.FFTSignal(signal.title, freqAmps, source);
            return fftSignal;
        };
        /**
         * Converts an array of value pairs to an array of FrequencyAmplitude.
         *
         * @private
         * @param {Array<IValuePair<number, number>>} data
         * @returns {Array<FrequencyAmplitude>}
         * @memberof DeconverterASCsv
         */
        DeconverterASCsv.prototype.valuePairsToFrequencyAmplitudes = function (data) {
            var freqAmps = new Array();
            data.forEach(function (valuePair) {
                freqAmps.push(new frequencyAmplitude_1.FrequencyAmplitude(valuePair.value1, valuePair.value2));
            });
            return freqAmps;
        };
        /**
         * Generates a XYSignal from an AS CSV signal.
         *
         * @private
         * @param {IASCsvSignal} signal
         * @param {IASCsvSignal} xSourceASCsv
         * @param {IASCsvSignal} ySourceASCsv
         * @returns {XYSignal}
         * @memberof DeconverterASCsv
         */
        DeconverterASCsv.prototype.generateXYSignal = function (signal, xSourceASCsv, ySourceASCsv) {
            var points = this.valuePairsToPoints(signal.data);
            var xSource = this.generateYTSignal(xSourceASCsv);
            var ySource = this.generateYTSignal(ySourceASCsv);
            var xySignal = new xySignal_1.XYSignal(signal.title, points, xSource, ySource);
            return xySignal;
        };
        /**
         * Converts an array of value parirs to an array of Point
         *
         * @private
         * @param {Array<IValuePair<number, number>>} data
         * @returns {Array<Point>}
         * @memberof DeconverterASCsv
         */
        DeconverterASCsv.prototype.valuePairsToPoints = function (data) {
            var points = new Array();
            data.forEach(function (valuePair) {
                points.push(new point_1.Point(valuePair.value1, valuePair.value2));
            });
            return points;
        };
        /**
         * Generates a YTSignal from an AS CSV signal.
         *
         * @private
         * @param {IASCsvSignal} signal
         * @returns {YTSignal}
         * @memberof DeconverterASCsv
         */
        DeconverterASCsv.prototype.generateYTSignal = function (signal) {
            var samples = this.valuePairsToSamples(signal.data);
            var ytSignal = new ytSignal_1.YTSignal(signal.title, samples);
            return ytSignal;
        };
        /**
         * Converts an array of value pairs to an array of Sample.
         *
         * @private
         * @param {Array<IValuePair<number, number>>} data
         * @returns {Array<Sample>}
         * @memberof DeconverterASCsv
         */
        DeconverterASCsv.prototype.valuePairsToSamples = function (data) {
            var samples = new Array();
            data.forEach(function (valuePair) {
                samples.push(new sample_1.Sample(valuePair.value1, valuePair.value2));
            });
            return samples;
        };
        /**
         * Extracts AS CSV signals based on the starttrigger.
         *
         * @private
         * @param {Date} starttrigger
         * @param {Array<IASCsvSignal>} originalASCsvSignals
         * @param {Array<IASCsvSignal>} calculatedASCsvSignals
         * @returns {Array<IASCsvSignal>}
         * @memberof DeconverterASCsv
         */
        DeconverterASCsv.prototype.getASCsvSignalsToStarttrigger = function (starttrigger, originalASCsvSignals, calculatedASCsvSignals) {
            var asCsvSignals = new Array();
            originalASCsvSignals.forEach(function (signal) {
                if (starttrigger.getTime() === signal.starttrigger.getTime()) {
                    asCsvSignals.push(signal);
                }
            });
            calculatedASCsvSignals.forEach(function (signal) {
                if (starttrigger.getTime() === signal.starttrigger.getTime()) {
                    asCsvSignals.push(signal);
                }
            });
            return asCsvSignals;
        };
        /**
         * Generates an array of unique starttriggers from an array of AS CSV signals.
         *
         * @private
         * @param {Array<IASCsvSignal>} originalASCsvSignals
         * @returns {Array<Date>}
         * @memberof DeconverterASCsv
         */
        DeconverterASCsv.prototype.getUniqueStarttriggers = function (originalASCsvSignals) {
            var starttriggers = new Array();
            originalASCsvSignals.forEach(function (signal) {
                if (starttriggers.every(function (starttrigger) { return starttrigger.getTime() !== signal.starttrigger.getTime(); })) {
                    starttriggers.push(signal.starttrigger);
                }
            });
            return starttriggers;
        };
        /**
         * Extracts calculated signals from an array of AS CSV signals.
         *
         * @private
         * @param {Array<IASCsvSignal>} asCsvSignals
         * @returns {Array<IASCsvSignal>}
         * @memberof DeconverterASCsv
         */
        DeconverterASCsv.prototype.extractCalculatedASCsvSignals = function (asCsvSignals) {
            var calculatedASCsvSignals = new Array();
            asCsvSignals.forEach(function (signal) {
                if (!ASCsvHeader_1.ASCsvHeader.isOriginalASCsvSignal(signal)) {
                    calculatedASCsvSignals.push(signal);
                }
            });
            return calculatedASCsvSignals;
        };
        /**
         * Extracts original (not calculated) signals from an array of AS CSV signals.
         *
         * @private
         * @param {Array<IASCsvSignal>} asCsvSignals
         * @returns {Array<IASCsvSignal>}
         * @memberof DeconverterASCsv
         */
        DeconverterASCsv.prototype.extractOriginalASCsvSignals = function (asCsvSignals) {
            var originalASCsvSignals = new Array();
            asCsvSignals.forEach(function (signal) {
                if (ASCsvHeader_1.ASCsvHeader.isOriginalASCsvSignal(signal)) {
                    originalASCsvSignals.push(signal);
                }
            });
            return originalASCsvSignals;
        };
        DeconverterASCsv.xyFormulaRegExp = /X={'(.+)'};Y={'(.+)'}/;
        DeconverterASCsv.fftFormulaRegExp = /Y={[Ff]{2}[Tt]\('(.+)'\)}/;
        return DeconverterASCsv;
    }());
    exports.DeconverterASCsv = DeconverterASCsv;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb252ZXJ0ZXJBU0Nzdi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3RyYWNlRGF0YUNvbnZlcnNpb24vY2xhc3Nlcy9kZWNvbnZlcnRlckFTQ3N2LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQWlCQTs7Ozs7O09BTUc7SUFDSDtRQUFBO1FBcVhBLENBQUM7UUEvV0c7Ozs7Ozs7V0FPRztRQUNJLG9DQUFTLEdBQWhCLFVBQWlCLElBQVk7WUFFekIsSUFBSSxXQUFXLEdBQUcsSUFBSSxtQ0FBZ0IsRUFBRSxDQUFDO1lBRXpDLElBQUksWUFBaUMsQ0FBQztZQUV0QyxJQUFHO2dCQUVDLFlBQVksR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzlDO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBRVYsTUFBTSxtREFBd0IsQ0FBQywwQkFBMEIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxtREFBd0IsQ0FBQyxLQUFLLENBQUMsNkRBQTZCLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ3RKO1lBQ0QsSUFBSSxvQkFBb0IsR0FBd0IsSUFBSSxDQUFDLDJCQUEyQixDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQy9GLElBQUksc0JBQXNCLEdBQXdCLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNuRyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsNENBQTRDLENBQUMsc0JBQXNCLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztZQUN6SCxJQUFJLFVBQVUsR0FBc0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixFQUFFLHNCQUFzQixDQUFDLENBQUM7WUFFeEcsT0FBTyxVQUFVLENBQUM7UUFDdEIsQ0FBQztRQUVEOzs7Ozs7Ozs7V0FTRztRQUNLLHVFQUE0QyxHQUFwRCxVQUFxRCxzQkFB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QyxDQUFDO1lBRUgsT0FBTyxvQkFBb0IsQ0FBQztRQUMvQixDQUFDO1FBaFh1QixnQ0FBZSxHQUFXLHVCQUF1QixDQUFDO1FBQ2xELGlDQUFnQixHQUFXLDJCQUEyQixDQUFDO1FBa1huRix1QkFBQztLQUFBLEFBclhELElBcVhDO0lBRVEsNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSURlY29udmVydGVyIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvSURlY29udmVydGVyXCI7XHJcbmltcG9ydCB7IElSZWNvcmRpbmcgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9yZWNvcmRpbmdJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQVNDc3ZEZWNvbnZlcnRlciB9IGZyb20gXCIuL0FTQ3N2RGVjb252ZXJ0ZXJcIjtcclxuaW1wb3J0IHsgSUFTQ3N2U2lnbmFsIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvSUFTQ3N2U2lnbmFsXCI7XHJcbmltcG9ydCB7IFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvciB9IGZyb20gXCIuLi9leGNlcHRpb25zL3RyYWNlRGF0YUNvbnZlcnNpb25FcnJvclwiO1xyXG5pbXBvcnQgeyBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3JUeXBlcyB9IGZyb20gXCIuLi9lbnVtcy90cmFjZURhdGFDb252ZXJzaW9uRXJyb3JUeXBlc1wiO1xyXG5pbXBvcnQgeyBBU0NzdkhlYWRlciB9IGZyb20gXCIuL0FTQ3N2SGVhZGVyXCI7XHJcbmltcG9ydCB7IElTaWduYWwgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9zaWduYWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgWVRTaWduYWwgfSBmcm9tIFwiLi95dFNpZ25hbFwiO1xyXG5pbXBvcnQgeyBYWVNpZ25hbCB9IGZyb20gXCIuL3h5U2lnbmFsXCI7XHJcbmltcG9ydCB7IEZGVFNpZ25hbCB9IGZyb20gXCIuL2ZmdFNpZ25hbFwiO1xyXG5pbXBvcnQgeyBGcmVxdWVuY3lBbXBsaXR1ZGUgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS90eXBlcy9mcmVxdWVuY3lBbXBsaXR1ZGVcIjtcclxuaW1wb3J0IHsgSVZhbHVlUGFpciB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2ludGVyZmFjZXMvdmFsdWVQYWlySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvdHlwZXMvcG9pbnRcIjtcclxuaW1wb3J0IHsgU2FtcGxlIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvdHlwZXMvc2FtcGxlXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIFJ1bnMgZGVjb252ZXJ0aW9uIG9mIGFuIEFTIENTViBzdHJpbmcuXHJcbiAqIEFkYXB0ZXIgY2xhc3MuXHJcbiAqXHJcbiAqIEBjbGFzcyBEZWNvbnZlcnRlckFTQ3N2XHJcbiAqIEBpbXBsZW1lbnRzIHtJRGVjb252ZXJ0ZXJ9XHJcbiAqL1xyXG5jbGFzcyBEZWNvbnZlcnRlckFTQ3N2IGltcGxlbWVudHMgSURlY29udmVydGVye1xyXG4gICAgXHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSB4eUZvcm11bGFSZWdFeHA6IFJlZ0V4cCA9IC9YPXsnKC4rKSd9O1k9eycoLispJ30vO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgZmZ0Rm9ybXVsYVJlZ0V4cDogUmVnRXhwID0gL1k9e1tGZl17Mn1bVHRdXFwoJyguKyknXFwpfS87XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RhcnRzIGEgZGVjb252ZXJ0aW9uIG9mIGFuIEFTIENTViBzdHJpbmcgaW50byBhbiBhcnJheSBvZiBJUmVjb3JkaW5nLlxyXG4gICAgICogQ2FuIHRocm93IFRyYWNlRGF0YUNvbnZlcmlvbkVycm9yLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGF0YVxyXG4gICAgICogQHJldHVybnMge0FycmF5PElSZWNvcmRpbmc+fVxyXG4gICAgICogQG1lbWJlcm9mIERlY29udmVydGVyQVNDc3ZcclxuICAgICAqL1xyXG4gICAgcHVibGljIERlY29udmVydChkYXRhOiBzdHJpbmcpOiBBcnJheTxJUmVjb3JkaW5nPiB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGRlY29udmVydGVyID0gbmV3IEFTQ3N2RGVjb252ZXJ0ZXIoKTtcclxuXHJcbiAgICAgICAgbGV0IGFzQ3N2U2lnbmFsczogQXJyYXk8SUFTQ3N2U2lnbmFsPjtcclxuXHJcbiAgICAgICAgdHJ5e1xyXG5cclxuICAgICAgICAgICAgYXNDc3ZTaWduYWxzID0gZGVjb252ZXJ0ZXIuZGVjb252ZXJ0KGRhdGEpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhyb3cgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yLmlzVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yKGVycikgPyBlcnIgOiBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IuYnVpbGQoVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yVHlwZXMuSU5URVJOQUwsIGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBvcmlnaW5hbEFTQ3N2U2lnbmFsczogQXJyYXk8SUFTQ3N2U2lnbmFsPiA9IHRoaXMuZXh0cmFjdE9yaWdpbmFsQVNDc3ZTaWduYWxzKGFzQ3N2U2lnbmFscyk7XHJcbiAgICAgICAgbGV0IGNhbGN1bGF0ZWRBU0NzdlNpZ25hbHM6IEFycmF5PElBU0NzdlNpZ25hbD4gPSB0aGlzLmV4dHJhY3RDYWxjdWxhdGVkQVNDc3ZTaWduYWxzKGFzQ3N2U2lnbmFscyk7XHJcbiAgICAgICAgY2FsY3VsYXRlZEFTQ3N2U2lnbmFscyA9IHRoaXMudXBkYXRlU3RhcnRUcmlnZ2VyVGltZUNhbGN1bGF0ZWRBU0NzdlNpZ25hbHMoY2FsY3VsYXRlZEFTQ3N2U2lnbmFscywgb3JpZ2luYWxBU0NzdlNpZ25hbHMpO1xyXG4gICAgICAgIGxldCByZWNvcmRpbmdzOiBBcnJheTxJUmVjb3JkaW5nPiA9IHRoaXMuY3JlYXRlUmVjb3JkaW5ncyhvcmlnaW5hbEFTQ3N2U2lnbmFscywgY2FsY3VsYXRlZEFTQ3N2U2lnbmFscyk7XHJcblxyXG4gICAgICAgIHJldHVybiByZWNvcmRpbmdzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hhbmdlcyB0aGUgc3RhcnR0cmlnZ2VyIHRpbWUgb2YgYSBjYWxjdWxhdGVkIEFTIENTViBzaWduYWwgdG8gdGhlIHN0YXJ0dHJpZ2dlciB0aW1lIG9mIGl0cyBvcmlnaW5hbCBzaWduYWwuXHJcbiAgICAgKiBJZiB0aGUgc3RhcnR0cmlnZ2VydGltZSBvZiB0aGUgb3JpZ2luYWwgc2lnbmFscyBhcmUgbm90IGVxdWFsIG9yIHRoZSBvcmlnaW5hbCBzaWduYWxzIGFyZSBub3QgZm91bmQgaXQgd2lsbCBOT1QgdXBkYXRlIHRoZSBzdGFydCB0cmlnZ2VyIHRpbWUgb2YgdGhlIGNhbGN1bGF0ZWQgc2lnbmFsLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lBU0NzdlNpZ25hbFtdfSBjYWxjdWxhdGVkQVNDc3ZTaWduYWxzXHJcbiAgICAgKiBAcGFyYW0ge0lBU0NzdlNpZ25hbFtdfSBvcmlnaW5hbEFTQ3N2U2lnbmFsc1xyXG4gICAgICogQHJldHVybnMge0lBU0NzdlNpZ25hbFtdfVxyXG4gICAgICogQG1lbWJlcm9mIERlY29udmVydGVyQVNDc3ZcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVTdGFydFRyaWdnZXJUaW1lQ2FsY3VsYXRlZEFTQ3N2U2lnbmFscyhjYWxjdWxhdGVkQVNDc3ZTaWduYWxzOiBJQVNDc3ZTaWduYWxbXSwgb3JpZ2luYWxBU0NzdlNpZ25hbHM6IElBU0NzdlNpZ25hbFtdKTogSUFTQ3N2U2lnbmFsW10ge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNhbGN1bGF0ZWRBU0NzdlNpZ25hbHMuZm9yRWFjaChzaWduYWwgPT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHN0YXJ0dHJpZ2dlcnM6IEFycmF5PERhdGU+ID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgIGxldCB4eVJlc3VsdCA9IERlY29udmVydGVyQVNDc3YueHlGb3JtdWxhUmVnRXhwLmV4ZWMoc2lnbmFsLmZvcm11bGEpO1xyXG5cclxuICAgICAgICAgICAgaWYoeHlSZXN1bHQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNpZ25hbHM6IEFycmF5PElBU0NzdlNpZ25hbD4gPSB0aGlzLnRyeUdldEFTQ3N2U2lnbmFsc0J5VGl0bGUoW3h5UmVzdWx0WzFdLCB4eVJlc3VsdFsyXV0sIG9yaWdpbmFsQVNDc3ZTaWduYWxzKTtcclxuICAgICAgICAgICAgICAgIHN0YXJ0dHJpZ2dlcnMgPSB0aGlzLmdldFVuaXF1ZVN0YXJ0dHJpZ2dlcnMoc2lnbmFscyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGZmdFJlc3VsdCA9IERlY29udmVydGVyQVNDc3YuZmZ0Rm9ybXVsYVJlZ0V4cC5leGVjKHNpZ25hbC5mb3JtdWxhKTtcclxuICAgICAgICAgICAgaWYoZmZ0UmVzdWx0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzaWduYWxzOiBBcnJheTxJQVNDc3ZTaWduYWw+ID0gdGhpcy50cnlHZXRBU0NzdlNpZ25hbHNCeVRpdGxlKFtmZnRSZXN1bHRbMV1dLCBvcmlnaW5hbEFTQ3N2U2lnbmFscyk7XHJcbiAgICAgICAgICAgICAgICBzdGFydHRyaWdnZXJzID0gdGhpcy5nZXRVbmlxdWVTdGFydHRyaWdnZXJzKHNpZ25hbHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHN0YXJ0dHJpZ2dlcnMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBzaWduYWwuc3RhcnR0cmlnZ2VyID0gIHN0YXJ0dHJpZ2dlcnNbMF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNhbGN1bGF0ZWRBU0NzdlNpZ25hbHM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRXh0cmFjdHMgQVMgQ1NWIHNpZ25hbHMgZnJvbSBhbiBhcnJheSBiYXNlZCBvbiB0aGUgdGl0bGUuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gdGl0bGVzXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElBU0NzdlNpZ25hbD59IG9yaWdpbmFsQVNDc3ZTaWduYWxzXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SUFTQ3N2U2lnbmFsPn1cclxuICAgICAqIEBtZW1iZXJvZiBEZWNvbnZlcnRlckFTQ3N2XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdHJ5R2V0QVNDc3ZTaWduYWxzQnlUaXRsZSh0aXRsZXM6IEFycmF5PHN0cmluZz4sIG9yaWdpbmFsQVNDc3ZTaWduYWxzOiBBcnJheTxJQVNDc3ZTaWduYWw+KTogQXJyYXk8SUFTQ3N2U2lnbmFsPiB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IG5hbWVzOiBBcnJheTxzdHJpbmc+ID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgdGl0bGVzLmZvckVhY2godGl0bGUgPT4ge1xyXG4gICAgICAgICAgICBuYW1lcy5wdXNoKEFTQ3N2SGVhZGVyLnRyeVJlbW92ZVN0YXJ0VHJpZ2dlcih0aXRsZSkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgc2lnbmFsczogQXJyYXk8SUFTQ3N2U2lnbmFsPiA9IG5ldyBBcnJheSgpO1xyXG5cclxuICAgICAgICBvcmlnaW5hbEFTQ3N2U2lnbmFscy5mb3JFYWNoKHNpZ25hbCA9PiB7XHJcbiAgICAgICAgICAgIGlmKG5hbWVzLmluY2x1ZGVzKHNpZ25hbC50aXRsZSkpIHtcclxuICAgICAgICAgICAgICAgIHNpZ25hbHMucHVzaChzaWduYWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBzaWduYWxzO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIFJlY29yZGluZ3MgYmFzZWQgb24gdGhlIGdpdmVuIG9yaWdpbmFsIGFuZCBjYWxjdWxhdGVkIHNpZ25hbHMuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SUFTQ3N2U2lnbmFsPn0gb3JpZ2luYWxBU0NzdlNpZ25hbHNcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SUFTQ3N2U2lnbmFsPn0gY2FsY3VsYXRlZEFTQ3N2U2lnbmFsc1xyXG4gICAgICogQHJldHVybnMge0FycmF5PElSZWNvcmRpbmc+fVxyXG4gICAgICogQG1lbWJlcm9mIERlY29udmVydGVyQVNDc3ZcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVSZWNvcmRpbmdzKG9yaWdpbmFsQVNDc3ZTaWduYWxzOiBBcnJheTxJQVNDc3ZTaWduYWw+LCBjYWxjdWxhdGVkQVNDc3ZTaWduYWxzOiBBcnJheTxJQVNDc3ZTaWduYWw+KTogQXJyYXk8SVJlY29yZGluZz4ge1xyXG4gICAgICBcclxuICAgICAgICBsZXQgdW5pcXVlU3RhcnR0cmlnZ2VyczogQXJyYXk8RGF0ZT4gPSB0aGlzLmdldFVuaXF1ZVN0YXJ0dHJpZ2dlcnMob3JpZ2luYWxBU0NzdlNpZ25hbHMpO1xyXG5cclxuICAgICAgICBsZXQgcmVjb3JkaW5nczogQXJyYXk8SVJlY29yZGluZz4gPSBuZXcgQXJyYXkoKTtcclxuXHJcbiAgICAgICAgdW5pcXVlU3RhcnR0cmlnZ2Vycy5mb3JFYWNoKHN0YXJ0dHJpZ2dlciA9PiB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgYXNDc3ZTaWduYWxzOkFycmF5PElBU0NzdlNpZ25hbD4gPSB0aGlzLmdldEFTQ3N2U2lnbmFsc1RvU3RhcnR0cmlnZ2VyKHN0YXJ0dHJpZ2dlciwgb3JpZ2luYWxBU0NzdlNpZ25hbHMsIGNhbGN1bGF0ZWRBU0NzdlNpZ25hbHMpO1xyXG4gICAgICAgICAgICBsZXQgc2lnbmFsczogQXJyYXk8SVNpZ25hbD4gPSB0aGlzLmdlbmVyYXRlU2lnbmFscyhhc0NzdlNpZ25hbHMpO1xyXG5cclxuICAgICAgICAgICAgcmVjb3JkaW5ncy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHN0YXJ0VHJpZ2dlclRpbWU6IHN0YXJ0dHJpZ2dlci5nZXRUaW1lKCkqMTAwMC4wLFxyXG4gICAgICAgICAgICAgICAgc2lnbmFsczogc2lnbmFsc1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlY29yZGluZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZW5lcmF0ZXMgU2lnbmFscyBhY2NvcmRpbmcgdG8gaXRzIHR5cGVzLlxyXG4gICAgICogVGhlIGdlbmVyYXRlZCBzaWduYWxzIGNhbiBiZSBvZiB0eXBlIFlUU2lnbmFsLCBYWVNpZ25hbCBhbmQgRkZUU2lnbmFsLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lBU0NzdlNpZ25hbFtdfSBhc0NzdlNpZ25hbHNcclxuICAgICAqIEByZXR1cm5zIHtJU2lnbmFsW119XHJcbiAgICAgKiBAbWVtYmVyb2YgRGVjb252ZXJ0ZXJBU0NzdlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdlbmVyYXRlU2lnbmFscyhhc0NzdlNpZ25hbHM6IElBU0NzdlNpZ25hbFtdKTogSVNpZ25hbFtdIHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgc2lnbmFsczogQXJyYXk8SVNpZ25hbD4gPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICBhc0NzdlNpZ25hbHMuZm9yRWFjaChzaWduYWwgPT4ge1xyXG4gICAgICAgICAgICBpZihBU0NzdkhlYWRlci5pc09yaWdpbmFsQVNDc3ZTaWduYWwoc2lnbmFsKSkge1xyXG4gICAgICAgICAgICAgICAgc2lnbmFscy5wdXNoKHRoaXMuZ2VuZXJhdGVZVFNpZ25hbChzaWduYWwpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgeHlSZXN1bHQgPSBEZWNvbnZlcnRlckFTQ3N2Lnh5Rm9ybXVsYVJlZ0V4cC5leGVjKHNpZ25hbC5mb3JtdWxhKTtcclxuICAgICAgICAgICAgaWYoeHlSZXN1bHQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzb3VyY2VzQVNDc3Y6IEFycmF5PElBU0NzdlNpZ25hbD4gPSB0aGlzLnRyeUdldEFTQ3N2U2lnbmFsc0J5VGl0bGUoW3h5UmVzdWx0WzFdLCB4eVJlc3VsdFsyXV0sIGFzQ3N2U2lnbmFscyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgeFNvdXJjZUFTQ3N2ID0gc291cmNlc0FTQ3N2LmZpbmQoc291cmNlID0+IHsgcmV0dXJuIHNvdXJjZS50aXRsZSA9PT0gQVNDc3ZIZWFkZXIudHJ5UmVtb3ZlU3RhcnRUcmlnZ2VyKCh4eVJlc3VsdCBhcyBSZWdFeHBFeGVjQXJyYXkpWzFdKX0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IHlTb3VyY2VBU0NzdiA9IHNvdXJjZXNBU0Nzdi5maW5kKHNvdXJjZSA9PiB7IHJldHVybiBzb3VyY2UudGl0bGUgPT09IEFTQ3N2SGVhZGVyLnRyeVJlbW92ZVN0YXJ0VHJpZ2dlcigoeHlSZXN1bHQgYXMgUmVnRXhwRXhlY0FycmF5KVsyXSl9KTtcclxuICAgICAgICAgICAgICAgIGlmKHhTb3VyY2VBU0NzdiAhPT0gdW5kZWZpbmVkICYmIHlTb3VyY2VBU0NzdiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2lnbmFscy5wdXNoKHRoaXMuZ2VuZXJhdGVYWVNpZ25hbChzaWduYWwsIHhTb3VyY2VBU0NzdiwgeVNvdXJjZUFTQ3N2KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGZmdFJlc3VsdCA9IERlY29udmVydGVyQVNDc3YuZmZ0Rm9ybXVsYVJlZ0V4cC5leGVjKHNpZ25hbC5mb3JtdWxhKTtcclxuICAgICAgICAgICAgaWYoZmZ0UmVzdWx0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc291cmNlQVNDc3Y6IEFycmF5PElBU0NzdlNpZ25hbD4gPSB0aGlzLnRyeUdldEFTQ3N2U2lnbmFsc0J5VGl0bGUoW2ZmdFJlc3VsdFsxXV0sIGFzQ3N2U2lnbmFscyk7XHJcbiAgICAgICAgICAgICAgICBpZihzb3VyY2VBU0Nzdi5sZW5ndGggPT09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHNpZ25hbHMucHVzaCh0aGlzLmdlbmVyYXRlRkZUU2lnbmFsKHNpZ25hbCwgc291cmNlQVNDc3ZbMF0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gc2lnbmFscztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdlbmVyYXRlcyBhIEZGVFNpZ25hbCBmcm9tIGFuIEFTIENTViBzaWduYWwuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SUFTQ3N2U2lnbmFsfSBzaWduYWxcclxuICAgICAqIEBwYXJhbSB7SUFTQ3N2U2lnbmFsfSBzb3VyY2VBU0NzdlxyXG4gICAgICogQHJldHVybnMge0ZGVFNpZ25hbH1cclxuICAgICAqIEBtZW1iZXJvZiBEZWNvbnZlcnRlckFTQ3N2XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2VuZXJhdGVGRlRTaWduYWwoc2lnbmFsOiBJQVNDc3ZTaWduYWwsIHNvdXJjZUFTQ3N2OiBJQVNDc3ZTaWduYWwpOiBGRlRTaWduYWwge1xyXG5cclxuICAgICAgICBsZXQgZnJlcUFtcHM6IEFycmF5PEZyZXF1ZW5jeUFtcGxpdHVkZT4gPSB0aGlzLnZhbHVlUGFpcnNUb0ZyZXF1ZW5jeUFtcGxpdHVkZXMoc2lnbmFsLmRhdGEpO1xyXG4gICAgICAgIGxldCBzb3VyY2U6IFlUU2lnbmFsID0gdGhpcy5nZW5lcmF0ZVlUU2lnbmFsKHNvdXJjZUFTQ3N2KTtcclxuICAgICAgICBsZXQgZmZ0U2lnbmFsOiBGRlRTaWduYWwgPSBuZXcgRkZUU2lnbmFsKHNpZ25hbC50aXRsZSwgZnJlcUFtcHMsIHNvdXJjZSk7XHJcblxyXG4gICAgICAgIHJldHVybiBmZnRTaWduYWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0cyBhbiBhcnJheSBvZiB2YWx1ZSBwYWlycyB0byBhbiBhcnJheSBvZiBGcmVxdWVuY3lBbXBsaXR1ZGUuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVZhbHVlUGFpcjxudW1iZXIsIG51bWJlcj4+fSBkYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8RnJlcXVlbmN5QW1wbGl0dWRlPn1cclxuICAgICAqIEBtZW1iZXJvZiBEZWNvbnZlcnRlckFTQ3N2XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdmFsdWVQYWlyc1RvRnJlcXVlbmN5QW1wbGl0dWRlcyhkYXRhOiBBcnJheTxJVmFsdWVQYWlyPG51bWJlciwgbnVtYmVyPj4pOiBBcnJheTxGcmVxdWVuY3lBbXBsaXR1ZGU+IHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgZnJlcUFtcHM6IEFycmF5PEZyZXF1ZW5jeUFtcGxpdHVkZT4gPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICBkYXRhLmZvckVhY2godmFsdWVQYWlyID0+IHtcclxuICAgICAgICAgICAgZnJlcUFtcHMucHVzaChuZXcgRnJlcXVlbmN5QW1wbGl0dWRlKHZhbHVlUGFpci52YWx1ZTEsIHZhbHVlUGFpci52YWx1ZTIpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZnJlcUFtcHM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2VuZXJhdGVzIGEgWFlTaWduYWwgZnJvbSBhbiBBUyBDU1Ygc2lnbmFsLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lBU0NzdlNpZ25hbH0gc2lnbmFsXHJcbiAgICAgKiBAcGFyYW0ge0lBU0NzdlNpZ25hbH0geFNvdXJjZUFTQ3N2XHJcbiAgICAgKiBAcGFyYW0ge0lBU0NzdlNpZ25hbH0geVNvdXJjZUFTQ3N2XHJcbiAgICAgKiBAcmV0dXJucyB7WFlTaWduYWx9XHJcbiAgICAgKiBAbWVtYmVyb2YgRGVjb252ZXJ0ZXJBU0NzdlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdlbmVyYXRlWFlTaWduYWwoc2lnbmFsOiBJQVNDc3ZTaWduYWwsIHhTb3VyY2VBU0NzdjogSUFTQ3N2U2lnbmFsLCB5U291cmNlQVNDc3Y6IElBU0NzdlNpZ25hbCk6IFhZU2lnbmFsIHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgcG9pbnRzOiBBcnJheTxQb2ludD4gPSB0aGlzLnZhbHVlUGFpcnNUb1BvaW50cyhzaWduYWwuZGF0YSk7XHJcbiAgICAgICAgbGV0IHhTb3VyY2U6IFlUU2lnbmFsID0gdGhpcy5nZW5lcmF0ZVlUU2lnbmFsKHhTb3VyY2VBU0Nzdik7XHJcbiAgICAgICAgbGV0IHlTb3VyY2U6IFlUU2lnbmFsID0gdGhpcy5nZW5lcmF0ZVlUU2lnbmFsKHlTb3VyY2VBU0Nzdik7XHJcbiAgICAgICAgbGV0IHh5U2lnbmFsOiBYWVNpZ25hbCA9IG5ldyBYWVNpZ25hbChzaWduYWwudGl0bGUsIHBvaW50cywgeFNvdXJjZSwgeVNvdXJjZSk7XHJcblxyXG4gICAgICAgIHJldHVybiB4eVNpZ25hbDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0cyBhbiBhcnJheSBvZiB2YWx1ZSBwYXJpcnMgdG8gYW4gYXJyYXkgb2YgUG9pbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJVmFsdWVQYWlyPG51bWJlciwgbnVtYmVyPj59IGRhdGFcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxQb2ludD59XHJcbiAgICAgKiBAbWVtYmVyb2YgRGVjb252ZXJ0ZXJBU0NzdlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHZhbHVlUGFpcnNUb1BvaW50cyhkYXRhOiBBcnJheTxJVmFsdWVQYWlyPG51bWJlciwgbnVtYmVyPj4pOiBBcnJheTxQb2ludD4ge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBwb2ludHM6IEFycmF5PFBvaW50PiA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIGRhdGEuZm9yRWFjaCh2YWx1ZVBhaXIgPT4ge1xyXG4gICAgICAgICAgICBwb2ludHMucHVzaChuZXcgUG9pbnQodmFsdWVQYWlyLnZhbHVlMSwgdmFsdWVQYWlyLnZhbHVlMikpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBwb2ludHM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2VuZXJhdGVzIGEgWVRTaWduYWwgZnJvbSBhbiBBUyBDU1Ygc2lnbmFsLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lBU0NzdlNpZ25hbH0gc2lnbmFsXHJcbiAgICAgKiBAcmV0dXJucyB7WVRTaWduYWx9XHJcbiAgICAgKiBAbWVtYmVyb2YgRGVjb252ZXJ0ZXJBU0NzdlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdlbmVyYXRlWVRTaWduYWwoc2lnbmFsOiBJQVNDc3ZTaWduYWwpOiBZVFNpZ25hbCB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHNhbXBsZXM6IEFycmF5PFNhbXBsZT4gPSB0aGlzLnZhbHVlUGFpcnNUb1NhbXBsZXMoc2lnbmFsLmRhdGEpO1xyXG4gICAgICAgIGxldCB5dFNpZ25hbDogWVRTaWduYWwgPSBuZXcgWVRTaWduYWwoc2lnbmFsLnRpdGxlLCBzYW1wbGVzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHl0U2lnbmFsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydHMgYW4gYXJyYXkgb2YgdmFsdWUgcGFpcnMgdG8gYW4gYXJyYXkgb2YgU2FtcGxlLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElWYWx1ZVBhaXI8bnVtYmVyLCBudW1iZXI+Pn0gZGF0YVxyXG4gICAgICogQHJldHVybnMge0FycmF5PFNhbXBsZT59XHJcbiAgICAgKiBAbWVtYmVyb2YgRGVjb252ZXJ0ZXJBU0NzdlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHZhbHVlUGFpcnNUb1NhbXBsZXMoZGF0YTogQXJyYXk8SVZhbHVlUGFpcjxudW1iZXIsIG51bWJlcj4+KTogQXJyYXk8U2FtcGxlPiB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHNhbXBsZXM6IEFycmF5PFNhbXBsZT4gPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICBkYXRhLmZvckVhY2godmFsdWVQYWlyID0+IHtcclxuICAgICAgICAgICAgc2FtcGxlcy5wdXNoKG5ldyBTYW1wbGUodmFsdWVQYWlyLnZhbHVlMSwgdmFsdWVQYWlyLnZhbHVlMikpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBzYW1wbGVzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEV4dHJhY3RzIEFTIENTViBzaWduYWxzIGJhc2VkIG9uIHRoZSBzdGFydHRyaWdnZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7RGF0ZX0gc3RhcnR0cmlnZ2VyXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElBU0NzdlNpZ25hbD59IG9yaWdpbmFsQVNDc3ZTaWduYWxzXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElBU0NzdlNpZ25hbD59IGNhbGN1bGF0ZWRBU0NzdlNpZ25hbHNcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxJQVNDc3ZTaWduYWw+fVxyXG4gICAgICogQG1lbWJlcm9mIERlY29udmVydGVyQVNDc3ZcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRBU0NzdlNpZ25hbHNUb1N0YXJ0dHJpZ2dlcihzdGFydHRyaWdnZXI6IERhdGUsIG9yaWdpbmFsQVNDc3ZTaWduYWxzOiBBcnJheTxJQVNDc3ZTaWduYWw+LCBjYWxjdWxhdGVkQVNDc3ZTaWduYWxzOiBBcnJheTxJQVNDc3ZTaWduYWw+KTogQXJyYXk8SUFTQ3N2U2lnbmFsPiB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGFzQ3N2U2lnbmFsczogQXJyYXk8SUFTQ3N2U2lnbmFsPiA9IG5ldyBBcnJheSgpO1xyXG5cclxuICAgICAgICBvcmlnaW5hbEFTQ3N2U2lnbmFscy5mb3JFYWNoKHNpZ25hbCA9PiB7XHJcbiAgICAgICAgICAgIGlmKHN0YXJ0dHJpZ2dlci5nZXRUaW1lKCkgPT09IHNpZ25hbC5zdGFydHRyaWdnZXIuZ2V0VGltZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBhc0NzdlNpZ25hbHMucHVzaChzaWduYWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY2FsY3VsYXRlZEFTQ3N2U2lnbmFscy5mb3JFYWNoKHNpZ25hbCA9PiB7XHJcbiAgICAgICAgICAgIGlmKHN0YXJ0dHJpZ2dlci5nZXRUaW1lKCkgPT09IHNpZ25hbC5zdGFydHRyaWdnZXIuZ2V0VGltZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBhc0NzdlNpZ25hbHMucHVzaChzaWduYWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBhc0NzdlNpZ25hbHM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2VuZXJhdGVzIGFuIGFycmF5IG9mIHVuaXF1ZSBzdGFydHRyaWdnZXJzIGZyb20gYW4gYXJyYXkgb2YgQVMgQ1NWIHNpZ25hbHMuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SUFTQ3N2U2lnbmFsPn0gb3JpZ2luYWxBU0NzdlNpZ25hbHNcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxEYXRlPn1cclxuICAgICAqIEBtZW1iZXJvZiBEZWNvbnZlcnRlckFTQ3N2XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VW5pcXVlU3RhcnR0cmlnZ2VycyhvcmlnaW5hbEFTQ3N2U2lnbmFsczogQXJyYXk8SUFTQ3N2U2lnbmFsPik6IEFycmF5PERhdGU+IHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgc3RhcnR0cmlnZ2VyczogQXJyYXk8RGF0ZT4gPSBuZXcgQXJyYXkoKTtcclxuXHJcbiAgICAgICAgb3JpZ2luYWxBU0NzdlNpZ25hbHMuZm9yRWFjaChzaWduYWwgPT4ge1xyXG4gICAgICAgICAgICBpZihzdGFydHRyaWdnZXJzLmV2ZXJ5KHN0YXJ0dHJpZ2dlciA9PiB7cmV0dXJuIHN0YXJ0dHJpZ2dlci5nZXRUaW1lKCkgIT09IHNpZ25hbC5zdGFydHRyaWdnZXIuZ2V0VGltZSgpO30pKSB7XHJcbiAgICAgICAgICAgICAgICBzdGFydHRyaWdnZXJzLnB1c2goc2lnbmFsLnN0YXJ0dHJpZ2dlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHN0YXJ0dHJpZ2dlcnM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRXh0cmFjdHMgY2FsY3VsYXRlZCBzaWduYWxzIGZyb20gYW4gYXJyYXkgb2YgQVMgQ1NWIHNpZ25hbHMuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SUFTQ3N2U2lnbmFsPn0gYXNDc3ZTaWduYWxzXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SUFTQ3N2U2lnbmFsPn1cclxuICAgICAqIEBtZW1iZXJvZiBEZWNvbnZlcnRlckFTQ3N2XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZXh0cmFjdENhbGN1bGF0ZWRBU0NzdlNpZ25hbHMoYXNDc3ZTaWduYWxzOiBBcnJheTxJQVNDc3ZTaWduYWw+KTogQXJyYXk8SUFTQ3N2U2lnbmFsPiB7XHJcbiAgICAgIFxyXG4gICAgICAgIGxldCBjYWxjdWxhdGVkQVNDc3ZTaWduYWxzOiBBcnJheTxJQVNDc3ZTaWduYWw+ID0gbmV3IEFycmF5KCk7XHJcblxyXG4gICAgICAgYXNDc3ZTaWduYWxzLmZvckVhY2goc2lnbmFsID0+IHtcclxuXHJcbiAgICAgICAgICAgaWYoIUFTQ3N2SGVhZGVyLmlzT3JpZ2luYWxBU0NzdlNpZ25hbChzaWduYWwpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FsY3VsYXRlZEFTQ3N2U2lnbmFscy5wdXNoKHNpZ25hbCk7XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgfSk7XHJcblxyXG4gICAgICAgcmV0dXJuIGNhbGN1bGF0ZWRBU0NzdlNpZ25hbHM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRXh0cmFjdHMgb3JpZ2luYWwgKG5vdCBjYWxjdWxhdGVkKSBzaWduYWxzIGZyb20gYW4gYXJyYXkgb2YgQVMgQ1NWIHNpZ25hbHMuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SUFTQ3N2U2lnbmFsPn0gYXNDc3ZTaWduYWxzXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SUFTQ3N2U2lnbmFsPn1cclxuICAgICAqIEBtZW1iZXJvZiBEZWNvbnZlcnRlckFTQ3N2XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZXh0cmFjdE9yaWdpbmFsQVNDc3ZTaWduYWxzKGFzQ3N2U2lnbmFsczogQXJyYXk8SUFTQ3N2U2lnbmFsPik6IEFycmF5PElBU0NzdlNpZ25hbD4ge1xyXG4gICAgICAgXHJcbiAgICAgICBsZXQgb3JpZ2luYWxBU0NzdlNpZ25hbHM6IEFycmF5PElBU0NzdlNpZ25hbD4gPSBuZXcgQXJyYXkoKTtcclxuXHJcbiAgICAgICBhc0NzdlNpZ25hbHMuZm9yRWFjaChzaWduYWwgPT4ge1xyXG5cclxuICAgICAgICAgICBpZihBU0NzdkhlYWRlci5pc09yaWdpbmFsQVNDc3ZTaWduYWwoc2lnbmFsKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIG9yaWdpbmFsQVNDc3ZTaWduYWxzLnB1c2goc2lnbmFsKTtcclxuICAgICAgICAgICB9XHJcbiAgICAgICB9KTtcclxuXHJcbiAgICAgICByZXR1cm4gb3JpZ2luYWxBU0NzdlNpZ25hbHM7XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuZXhwb3J0IHsgRGVjb252ZXJ0ZXJBU0NzdiB9OyJdfQ==