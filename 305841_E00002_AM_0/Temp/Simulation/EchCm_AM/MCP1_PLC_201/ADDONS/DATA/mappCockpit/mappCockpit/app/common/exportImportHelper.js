define(["require", "exports", "./traceDataConversion/classes/ConvertHandler", "./traceDataConversion/enums/ConvertTypes", "../models/common/signal/signal", "./colorHelper", "./dateTimeHelper", "../models/common/point", "./traceDataConversion/classes/DeconvertHandler", "./traceDataConversion/exceptions/traceDataConversionError", "./traceDataConversion/classes/ytSignal", "./traceDataConversion/classes/xySignal", "./traceDataConversion/classes/fftSignal", "../core/types/sample", "../core/types/frequencyAmplitude", "../core/types/point", "../models/common/series/seriesType", "./exportSerieGroup", "../models/common/signal/serieGroup", "../models/signalManagerDataModel/signalManagerCalculation", "./seriesHelper", "../models/common/calculatorProvider/calculators/fftCalculator", "../models/common/calculatorProvider/calculators/xyCalculator"], function (require, exports, ConvertHandler_1, ConvertTypes_1, signal_1, colorHelper_1, dateTimeHelper_1, point_1, DeconvertHandler_1, traceDataConversionError_1, ytSignal_1, xySignal_1, fftSignal_1, sample_1, frequencyAmplitude_1, point_2, seriesType_1, exportSerieGroup_1, serieGroup_1, signalManagerCalculation_1, seriesHelper_1, fftCalculator_1, xyCalculator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ExportImportHelper = /** @class */ (function () {
        /**
         * Creates an instance of ExportImportHelper
         * @param {ISeriesProvider} seriesProvider
         * @memberof ExportImportHelper
         */
        function ExportImportHelper(seriesProvider) {
            this._seriesProvider = seriesProvider;
        }
        /**
         * converts the data of a serieGroup to a csv string
         *
         * @param {Array<ExportSerieGroup>} elements
         * @returns {string}
         * @memberof ExportImportHelper
         */
        ExportImportHelper.prototype.exportTraceData = function (elements) {
            var returnValue = undefined;
            try {
                var recordings = new Array();
                for (var i = 0; i < elements.length; i++) { // create a recording for each ExportSeriesGroup
                    try {
                        var recording = new Recording(elements[i], this._seriesProvider);
                        recordings.push(recording);
                    }
                    catch (e) {
                        console.error("Convert for " + elements[i].name + " not possible!");
                        console.error(e);
                    }
                }
                if (recordings.length > 0) { //convert recordings if there are any
                    var convertHandler = new ConvertHandler_1.ConvertHandler();
                    var partialFile = convertHandler.convert(recordings, ConvertTypes_1.ConvertTypes.CSV_AS_EN);
                    returnValue = partialFile.data;
                }
            }
            catch (e) {
                if (traceDataConversionError_1.TraceDataConversionError.isTraceDataConversionError(e)) {
                    console.error("ErrorType: " + e.name + " ErrorMessage: " + e.message);
                }
                else {
                    console.error("Convert not possible! Signals can not be exported!");
                }
                alert("Trace data can not be exported!");
            }
            return returnValue;
        };
        /**
         * Converts a csv string to a list of serie groups
         *
         * @param {string} data
         * @param {string} filename
         * @param {(Array<TraceDataPointInfo>|undefined)} [traceDataPointInfos=undefined] can be used for adding alias and description of a datapoint
         * @returns {ISerieGroup[]}
         * @memberof ExportImportHelper
         */
        ExportImportHelper.prototype.importTraceData = function (data, filename, traceDataPointInfos) {
            if (traceDataPointInfos === void 0) { traceDataPointInfos = undefined; }
            // get recordings from data(csv)
            var recordings = ExportImportHelper.getRecordingsFromData(data, filename);
            if (recordings == undefined) {
                return [new serieGroup_1.SerieGroup("No data found!", '0', 0)];
            }
            // get serie groups from the recording datas
            return this.getSerieGroupsFromRecordings(recordings, traceDataPointInfos);
        };
        /**
         * Returns recording data from the given input data(csv)
         *
         * @private
         * @static
         * @param {string} data
         * @param {string} filename
         * @returns
         * @memberof ExportImportHelper
         */
        ExportImportHelper.getRecordingsFromData = function (data, filename) {
            var deconverter = new DeconvertHandler_1.DeconvertHandler();
            var recordings;
            try {
                recordings = deconverter.Deconvert({ data: data, fileending: this.getFileExtension(filename) });
            }
            catch (e) {
                if (traceDataConversionError_1.TraceDataConversionError.isTraceDataConversionError(e)) {
                    console.error("ErrorType: " + e.name + " ErrorMessage: " + e.message);
                }
                else {
                    console.error("Deconvert not possible! Signals can not be imported!");
                }
                alert("Trace data can not be imported from file!");
                return undefined;
            }
            return recordings;
        };
        /**
         * Returns a series group array with the informations from the given recordings
         *
         * @private
         * @param {Array<IRecording>} recordings
         * @param {(Array<TraceDataPointInfo>|undefined)} [traceDataPointInfos=undefined]
         * @returns
         * @memberof ExportImportHelper
         */
        ExportImportHelper.prototype.getSerieGroupsFromRecordings = function (recordings, traceDataPointInfos) {
            var _this = this;
            if (traceDataPointInfos === void 0) { traceDataPointInfos = undefined; }
            var serieGroups = new Array();
            // Each recording will be displayed as a own signal group with its own start trigger time
            recordings.forEach(function (recording) {
                var timestamp = recording.startTriggerTime;
                var id = timestamp.toString();
                var serieGroup = new serieGroup_1.SerieGroup(dateTimeHelper_1.DateTimeHelper.getDateTime(timestamp), id, timestamp);
                var signals = recording.signals;
                var _loop_1 = function (i) {
                    if (signals[i] instanceof ytSignal_1.YTSignal) {
                        var newSerie = _this.createYTSerieFromYTSignal(serieGroup, signals[i]);
                        if (traceDataPointInfos != undefined) {
                            // Add description and alias name for datapoint if found
                            var tracePointInfos = traceDataPointInfos.filter(function (element) { return element.fullname == signals[i].name; });
                            if (tracePointInfos.length == 1) {
                                newSerie.name = tracePointInfos[0].componentName + ":" + tracePointInfos[0].name;
                                newSerie.description = traceDataPointInfos[0].description;
                            }
                        }
                        serieGroup.addSerie(newSerie);
                    }
                };
                for (var i = 0; i < signals.length; i++) {
                    _loop_1(i);
                }
                signals.forEach(function (signal) {
                    if (signal instanceof xySignal_1.XYSignal || signal instanceof fftSignal_1.FFTSignal) {
                        _this.createCalculatedSerieFromCalculatedSignal(serieGroup, signal);
                    }
                });
                serieGroups.push(serieGroup);
            });
            return serieGroups;
        };
        ExportImportHelper.prototype.createYTSerieFromYTSignal = function (serieGroup, signal) {
            var signalData = new Array();
            for (var i = 0; i < signal.items.length; i++) {
                signalData.push(new point_1.Point(signal.items[i].t, signal.items[i].y));
            }
            var newSignal = new signal_1.Signal(signal.name, signalData);
            var settings = seriesHelper_1.SeriesHelper.createSerieSettings(newSignal, newSignal.name, colorHelper_1.ColorHelper.getColor(), this._seriesProvider.getUniqueId(), seriesType_1.SeriesType.timeSeries);
            var newSerie = this._seriesProvider.createSerie(settings);
            return newSerie;
        };
        ExportImportHelper.prototype.createCalculatedSerieFromCalculatedSignal = function (serieGroup, signal) {
            var calculation = new signalManagerCalculation_1.SignalManagerCalculation(signal.name, this._seriesProvider);
            serieGroup.addSerieContainer(calculation, -1);
            if (signal instanceof xySignal_1.XYSignal) {
                calculation.setCalculatorTypeById(xyCalculator_1.XYCalculator.id);
                calculation.setInputValueById(xyCalculator_1.XYCalculator.inputIdXSignal, signal.xSource.name);
                calculation.setInputValueById(xyCalculator_1.XYCalculator.inputIdYSignal, signal.ySource.name);
                calculation.setOutputSignalName(signal.name);
            }
            if (signal instanceof fftSignal_1.FFTSignal) {
                calculation.setCalculatorTypeById(fftCalculator_1.FftCalculator.id);
                calculation.setInputValueById(fftCalculator_1.FftCalculator.inputIdSignal, signal.source.name);
                calculation.setOutputSignalName(signal.name);
            }
        };
        ExportImportHelper.getFileExtension = function (filename) {
            return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
        };
        return ExportImportHelper;
    }());
    exports.ExportImportHelper = ExportImportHelper;
    var Recording = /** @class */ (function () {
        function Recording(element, seriesProvider) {
            this.startTriggerTime = 0;
            this.signals = new Array();
            this._seriesProvider = seriesProvider;
            //Export a serieGroup
            if (element instanceof exportSerieGroup_1.ExportSerieGroup) {
                this.startTriggerTime = element.startTriggerTime;
                for (var i = 0; i < element.series.length; i++) {
                    if (element.series[i].type == seriesType_1.SeriesType.timeSeries) { //Export YTSeries
                        this.signals.push(this.createYTSignalFromSeries(element.series[i]));
                    }
                    if (element.series[i].type == seriesType_1.SeriesType.xySeries) { //Export XYSeries
                        this.signals.push(this.createXYSignalFromSeries(element.series[i]));
                    }
                    if (element.series[i].type == seriesType_1.SeriesType.fftSeries) { //Export FFTSeries
                        this.signals.push(this.createFFTSignalFromSeries(element.series[i]));
                    }
                }
            }
        }
        Recording.prototype.createYTSignalFromSeries = function (serie) {
            var samples = new Array();
            serie.rawPoints.forEach(function (point) {
                samples.push(new sample_1.Sample(point.x, point.y));
            });
            return new ytSignal_1.YTSignal(serie.name, samples);
        };
        Recording.prototype.createXYSignalFromSeries = function (serie) {
            var points = new Array();
            serie.rawPoints.forEach(function (point) {
                points.push(new point_2.Point(point.x, point.y));
            });
            var calculationDataInfo = serie.calculationDataInfo;
            var xSource = this.createYTSignalFromSeries(this._seriesProvider.get(calculationDataInfo.inputSeriesIds[0]));
            var ySource = this.createYTSignalFromSeries(this._seriesProvider.get(calculationDataInfo.inputSeriesIds[1]));
            return new xySignal_1.XYSignal(serie.name, points, xSource, ySource);
        };
        Recording.prototype.createFFTSignalFromSeries = function (serie) {
            var freqAmps = new Array();
            serie.rawPoints.forEach(function (point) {
                freqAmps.push(new frequencyAmplitude_1.FrequencyAmplitude(point.x, point.y));
            });
            var calculationDataInfo = serie.calculationDataInfo;
            var source = this.createYTSignalFromSeries(this._seriesProvider.get(calculationDataInfo.inputSeriesIds[0]));
            return new fftSignal_1.FFTSignal(serie.name, freqAmps, source);
        };
        return Recording;
    }());
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0SW1wb3J0SGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vZXhwb3J0SW1wb3J0SGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQWdDQTtRQVdJOzs7O1dBSUc7UUFDSCw0QkFBWSxjQUErQjtZQUN2QyxJQUFJLENBQUMsZUFBZSxHQUFHLGNBQWMsQ0FBQztRQUMxQyxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0gsNENBQWUsR0FBZixVQUFnQixRQUFpQztZQUU3QyxJQUFJLFdBQVcsR0FBdUIsU0FBUyxDQUFDO1lBRWhELElBQUk7Z0JBQ0EsSUFBSSxVQUFVLEdBQUcsSUFBSSxLQUFLLEVBQWMsQ0FBQztnQkFDekMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUMsRUFBRSxnREFBZ0Q7b0JBRXZGLElBQUk7d0JBQ0EsSUFBSSxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzt3QkFDakUsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztxQkFDOUI7b0JBQUMsT0FBTSxDQUFDLEVBQUU7d0JBQ1AsT0FBTyxDQUFDLEtBQUssQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDO3dCQUNwRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUNwQjtpQkFDSjtnQkFDRCxJQUFHLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLEVBQUUscUNBQXFDO29CQUM3RCxJQUFJLGNBQWMsR0FBRyxJQUFJLCtCQUFjLEVBQUUsQ0FBQztvQkFDMUMsSUFBSSxXQUFXLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FB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QUksQ0FBQyxJQUFJLHVDQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUQsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLG1CQUFtQixHQUFHLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQztZQUNwRCxJQUFJLE1BQU0sR0FBYSxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsbUJBQW9CLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFhLENBQUMsQ0FBQztZQUVuSSxPQUFPLElBQUkscUJBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN2RCxDQUFDO1FBQ0wsZ0JBQUM7SUFBRCxDQUFDLEFBaEVELElBZ0VDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVNlcmllc1Byb3ZpZGVyIH0gZnJvbSBcIi4uL21vZGVscy9jb21tb24vc2VyaWVzUHJvdmlkZXIvc2VyaWVzUHJvdmlkZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNpZ25hbCBhcyBJTGliU2lnbmFsIH0gZnJvbSBcIi4vdHJhY2VEYXRhQ29udmVyc2lvbi9pbnRlcmZhY2VzL3NpZ25hbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJUmVjb3JkaW5nIH0gZnJvbSBcIi4vdHJhY2VEYXRhQ29udmVyc2lvbi9pbnRlcmZhY2VzL3JlY29yZGluZ0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJU2VyaWVHcm91cCB9IGZyb20gXCIuLi9tb2RlbHMvY29tbW9uL2ludGVyZmFjZXMvc2VyaWVHcm91cEludGVyZmFjZVwiO1xyXG5cclxuaW1wb3J0IHsgQ29udmVydEhhbmRsZXIgfSBmcm9tIFwiLi90cmFjZURhdGFDb252ZXJzaW9uL2NsYXNzZXMvQ29udmVydEhhbmRsZXJcIjtcclxuaW1wb3J0IHsgQ29udmVydFR5cGVzIH0gZnJvbSBcIi4vdHJhY2VEYXRhQ29udmVyc2lvbi9lbnVtcy9Db252ZXJ0VHlwZXNcIjtcclxuaW1wb3J0IHsgU2lnbmFsIH0gZnJvbSBcIi4uL21vZGVscy9jb21tb24vc2lnbmFsL3NpZ25hbFwiO1xyXG5pbXBvcnQgeyBDb2xvckhlbHBlciB9IGZyb20gXCIuL2NvbG9ySGVscGVyXCI7XHJcbmltcG9ydCB7IERhdGVUaW1lSGVscGVyIH0gZnJvbSBcIi4vZGF0ZVRpbWVIZWxwZXJcIjtcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vbW9kZWxzL2NvbW1vbi9wb2ludFwiO1xyXG5pbXBvcnQgeyBEZWNvbnZlcnRIYW5kbGVyIH0gZnJvbSBcIi4vdHJhY2VEYXRhQ29udmVyc2lvbi9jbGFzc2VzL0RlY29udmVydEhhbmRsZXJcIjtcclxuaW1wb3J0IHsgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yIH0gZnJvbSBcIi4vdHJhY2VEYXRhQ29udmVyc2lvbi9leGNlcHRpb25zL3RyYWNlRGF0YUNvbnZlcnNpb25FcnJvclwiO1xyXG5pbXBvcnQgeyBUcmFjZURhdGFQb2ludEluZm8gfSBmcm9tIFwiLi4vbW9kZWxzL2RpYWdub3N0aWNzL3RyYWNlL3RyYWNlRGF0YVBvaW50SW5mb1wiO1xyXG5pbXBvcnQgeyBZVFNpZ25hbCB9IGZyb20gXCIuL3RyYWNlRGF0YUNvbnZlcnNpb24vY2xhc3Nlcy95dFNpZ25hbFwiO1xyXG5pbXBvcnQgeyBYWVNpZ25hbCB9IGZyb20gXCIuL3RyYWNlRGF0YUNvbnZlcnNpb24vY2xhc3Nlcy94eVNpZ25hbFwiO1xyXG5pbXBvcnQgeyBGRlRTaWduYWwgfSBmcm9tIFwiLi90cmFjZURhdGFDb252ZXJzaW9uL2NsYXNzZXMvZmZ0U2lnbmFsXCI7XHJcbmltcG9ydCB7IFNhbXBsZSB9IGZyb20gXCIuLi9jb3JlL3R5cGVzL3NhbXBsZVwiO1xyXG5pbXBvcnQgeyBYWVNlcmllcyB9IGZyb20gXCIuLi9tb2RlbHMvY29tbW9uL3Nlcmllcy9YWVNlcmllc1wiO1xyXG5pbXBvcnQgeyBGRlRTZXJpZXMgfSBmcm9tIFwiLi4vbW9kZWxzL2NvbW1vbi9zZXJpZXMvRkZUU2VyaWVzXCI7XHJcbmltcG9ydCB7IFlUU2VyaWVzIH0gZnJvbSBcIi4uL21vZGVscy9jb21tb24vc2VyaWVzL1lUU2VyaWVzXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vbW9kZWxzL2NvbW1vbi9zZXJpZXMvYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBGcmVxdWVuY3lBbXBsaXR1ZGUgfSBmcm9tIFwiLi4vY29yZS90eXBlcy9mcmVxdWVuY3lBbXBsaXR1ZGVcIjtcclxuaW1wb3J0IHsgUG9pbnQgYXMgQ29yZVBvaW50IH0gZnJvbSBcIi4uL2NvcmUvdHlwZXMvcG9pbnRcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuLi9tb2RlbHMvY29tbW9uL3Nlcmllcy9zZXJpZXNUeXBlXCI7XHJcbmltcG9ydCB7IEV4cG9ydFNlcmllR3JvdXAgfSBmcm9tIFwiLi9leHBvcnRTZXJpZUdyb3VwXCI7XHJcbmltcG9ydCB7IFNlcmllR3JvdXAgfSBmcm9tIFwiLi4vbW9kZWxzL2NvbW1vbi9zaWduYWwvc2VyaWVHcm91cFwiO1xyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24gfSBmcm9tIFwiLi4vbW9kZWxzL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uXCI7XHJcbmltcG9ydCB7IFNlcmllc0hlbHBlciB9IGZyb20gXCIuL3Nlcmllc0hlbHBlclwiO1xyXG5pbXBvcnQgeyBGZnRDYWxjdWxhdG9yIH0gZnJvbSBcIi4uL21vZGVscy9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0b3JzL2ZmdENhbGN1bGF0b3JcIjtcclxuaW1wb3J0IHsgWFlDYWxjdWxhdG9yIH0gZnJvbSBcIi4uL21vZGVscy9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0b3JzL3h5Q2FsY3VsYXRvclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEV4cG9ydEltcG9ydEhlbHBlciB7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogSG9sZHMgdGhlIHNlcmllcyBwcm92aWRlciBpbnN0YW5jZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7SVNlcmllc1Byb3ZpZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIEV4cG9ydEltcG9ydEhlbHBlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9zZXJpZXNQcm92aWRlcjogSVNlcmllc1Byb3ZpZGVyO1xyXG4gICAgICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEV4cG9ydEltcG9ydEhlbHBlclxyXG4gICAgICogQHBhcmFtIHtJU2VyaWVzUHJvdmlkZXJ9IHNlcmllc1Byb3ZpZGVyXHJcbiAgICAgKiBAbWVtYmVyb2YgRXhwb3J0SW1wb3J0SGVscGVyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHNlcmllc1Byb3ZpZGVyOiBJU2VyaWVzUHJvdmlkZXIpe1xyXG4gICAgICAgIHRoaXMuX3Nlcmllc1Byb3ZpZGVyID0gc2VyaWVzUHJvdmlkZXI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogY29udmVydHMgdGhlIGRhdGEgb2YgYSBzZXJpZUdyb3VwIHRvIGEgY3N2IHN0cmluZ1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8RXhwb3J0U2VyaWVHcm91cD59IGVsZW1lbnRzXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIEV4cG9ydEltcG9ydEhlbHBlclxyXG4gICAgICovXHJcbiAgICBleHBvcnRUcmFjZURhdGEoZWxlbWVudHM6IEFycmF5PEV4cG9ydFNlcmllR3JvdXA+KTogc3RyaW5nIHwgdW5kZWZpbmVke1xyXG5cclxuICAgICAgICBsZXQgcmV0dXJuVmFsdWU6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IHJlY29yZGluZ3MgPSBuZXcgQXJyYXk8SVJlY29yZGluZz4oKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKyl7IC8vIGNyZWF0ZSBhIHJlY29yZGluZyBmb3IgZWFjaCBFeHBvcnRTZXJpZXNHcm91cFxyXG5cclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlY29yZGluZyA9IG5ldyBSZWNvcmRpbmcoZWxlbWVudHNbaV0sIHRoaXMuX3Nlcmllc1Byb3ZpZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICByZWNvcmRpbmdzLnB1c2gocmVjb3JkaW5nKTtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDb252ZXJ0IGZvciBcIiArIGVsZW1lbnRzW2ldLm5hbWUgKyBcIiBub3QgcG9zc2libGUhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYocmVjb3JkaW5ncy5sZW5ndGggPiAwKSB7IC8vY29udmVydCByZWNvcmRpbmdzIGlmIHRoZXJlIGFyZSBhbnlcclxuICAgICAgICAgICAgICAgIGxldCBjb252ZXJ0SGFuZGxlciA9IG5ldyBDb252ZXJ0SGFuZGxlcigpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhcnRpYWxGaWxlID0gY29udmVydEhhbmRsZXIuY29udmVydChyZWNvcmRpbmdzLCBDb252ZXJ0VHlwZXMuQ1NWX0FTX0VOKTtcclxuICAgICAgICAgICAgICAgIHJldHVyblZhbHVlID0gcGFydGlhbEZpbGUuZGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1jYXRjaChlKXtcclxuICAgICAgICAgICAgaWYoVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yLmlzVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yKGUpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3JUeXBlOiBcIisgZS5uYW1lICtcIiBFcnJvck1lc3NhZ2U6IFwiKyBlLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNvbnZlcnQgbm90IHBvc3NpYmxlISBTaWduYWxzIGNhbiBub3QgYmUgZXhwb3J0ZWQhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiVHJhY2UgZGF0YSBjYW4gbm90IGJlIGV4cG9ydGVkIVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xyXG4gICAgfVxyXG4gICBcclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydHMgYSBjc3Ygc3RyaW5nIHRvIGEgbGlzdCBvZiBzZXJpZSBncm91cHNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGF0YVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVuYW1lXHJcbiAgICAgKiBAcGFyYW0geyhBcnJheTxUcmFjZURhdGFQb2ludEluZm8+fHVuZGVmaW5lZCl9IFt0cmFjZURhdGFQb2ludEluZm9zPXVuZGVmaW5lZF0gY2FuIGJlIHVzZWQgZm9yIGFkZGluZyBhbGlhcyBhbmQgZGVzY3JpcHRpb24gb2YgYSBkYXRhcG9pbnRcclxuICAgICAqIEByZXR1cm5zIHtJU2VyaWVHcm91cFtdfVxyXG4gICAgICogQG1lbWJlcm9mIEV4cG9ydEltcG9ydEhlbHBlclxyXG4gICAgICovXHJcbiAgICBpbXBvcnRUcmFjZURhdGEoZGF0YTogc3RyaW5nLCBmaWxlbmFtZTogc3RyaW5nLCB0cmFjZURhdGFQb2ludEluZm9zOiBBcnJheTxUcmFjZURhdGFQb2ludEluZm8+fHVuZGVmaW5lZCA9IHVuZGVmaW5lZCk6IElTZXJpZUdyb3VwW117XHJcbiAgICAgICAgLy8gZ2V0IHJlY29yZGluZ3MgZnJvbSBkYXRhKGNzdilcclxuICAgICAgICBsZXQgcmVjb3JkaW5ncz0gRXhwb3J0SW1wb3J0SGVscGVyLmdldFJlY29yZGluZ3NGcm9tRGF0YShkYXRhLCBmaWxlbmFtZSk7XHJcbiAgICAgICAgaWYocmVjb3JkaW5ncyA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gW25ldyBTZXJpZUdyb3VwKFwiTm8gZGF0YSBmb3VuZCFcIiwgJzAnLCAwKV0gYXMgSVNlcmllR3JvdXBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZ2V0IHNlcmllIGdyb3VwcyBmcm9tIHRoZSByZWNvcmRpbmcgZGF0YXNcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRTZXJpZUdyb3Vwc0Zyb21SZWNvcmRpbmdzKHJlY29yZGluZ3MsIHRyYWNlRGF0YVBvaW50SW5mb3MpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyByZWNvcmRpbmcgZGF0YSBmcm9tIHRoZSBnaXZlbiBpbnB1dCBkYXRhKGNzdilcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRhdGFcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlbmFtZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBFeHBvcnRJbXBvcnRIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0UmVjb3JkaW5nc0Zyb21EYXRhKGRhdGE6IHN0cmluZywgZmlsZW5hbWU6IHN0cmluZyl7XHJcbiAgICAgICAgbGV0IGRlY29udmVydGVyID0gbmV3IERlY29udmVydEhhbmRsZXIoKTtcclxuICAgICAgICBsZXQgcmVjb3JkaW5nczogSVJlY29yZGluZ1tdO1xyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgcmVjb3JkaW5ncyA9IGRlY29udmVydGVyLkRlY29udmVydCh7ZGF0YTpkYXRhLCBmaWxlZW5kaW5nOiB0aGlzLmdldEZpbGVFeHRlbnNpb24oZmlsZW5hbWUpfSk7XHJcbiAgICAgICAgfWNhdGNoKGUpe1xyXG4gICAgICAgICAgICBpZihUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IuaXNUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IoZSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvclR5cGU6IFwiKyBlLm5hbWUgK1wiIEVycm9yTWVzc2FnZTogXCIrIGUubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRGVjb252ZXJ0IG5vdCBwb3NzaWJsZSEgU2lnbmFscyBjYW4gbm90IGJlIGltcG9ydGVkIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhbGVydChcIlRyYWNlIGRhdGEgY2FuIG5vdCBiZSBpbXBvcnRlZCBmcm9tIGZpbGUhXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVjb3JkaW5ncztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBzZXJpZXMgZ3JvdXAgYXJyYXkgd2l0aCB0aGUgaW5mb3JtYXRpb25zIGZyb20gdGhlIGdpdmVuIHJlY29yZGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUmVjb3JkaW5nPn0gcmVjb3JkaW5nc1xyXG4gICAgICogQHBhcmFtIHsoQXJyYXk8VHJhY2VEYXRhUG9pbnRJbmZvPnx1bmRlZmluZWQpfSBbdHJhY2VEYXRhUG9pbnRJbmZvcz11bmRlZmluZWRdXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIEV4cG9ydEltcG9ydEhlbHBlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFNlcmllR3JvdXBzRnJvbVJlY29yZGluZ3MocmVjb3JkaW5nczogQXJyYXk8SVJlY29yZGluZz4sIHRyYWNlRGF0YVBvaW50SW5mb3M6IEFycmF5PFRyYWNlRGF0YVBvaW50SW5mbz58dW5kZWZpbmVkID0gdW5kZWZpbmVkKXtcclxuICAgICAgICBsZXQgc2VyaWVHcm91cHMgPSBuZXcgQXJyYXk8SVNlcmllR3JvdXA+KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gRWFjaCByZWNvcmRpbmcgd2lsbCBiZSBkaXNwbGF5ZWQgYXMgYSBvd24gc2lnbmFsIGdyb3VwIHdpdGggaXRzIG93biBzdGFydCB0cmlnZ2VyIHRpbWVcclxuICAgICAgICByZWNvcmRpbmdzLmZvckVhY2gocmVjb3JkaW5nID0+e1xyXG4gICAgICAgICAgICBsZXQgdGltZXN0YW1wID0gcmVjb3JkaW5nLnN0YXJ0VHJpZ2dlclRpbWU7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IHRpbWVzdGFtcC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICBsZXQgc2VyaWVHcm91cCA9IG5ldyBTZXJpZUdyb3VwKERhdGVUaW1lSGVscGVyLmdldERhdGVUaW1lKHRpbWVzdGFtcCksIGlkLCB0aW1lc3RhbXApO1xyXG4gICAgICAgICAgICBsZXQgc2lnbmFscyA9IHJlY29yZGluZy5zaWduYWxzO1xyXG5cclxuICAgICAgICAgICAgZm9yKGxldCBpID0wOyBpIDwgc2lnbmFscy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZihzaWduYWxzW2ldIGluc3RhbmNlb2YgWVRTaWduYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3U2VyaWU6IEJhc2VTZXJpZXMgPSB0aGlzLmNyZWF0ZVlUU2VyaWVGcm9tWVRTaWduYWwoc2VyaWVHcm91cCwgc2lnbmFsc1tpXSBhcyBZVFNpZ25hbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodHJhY2VEYXRhUG9pbnRJbmZvcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgZGVzY3JpcHRpb24gYW5kIGFsaWFzIG5hbWUgZm9yIGRhdGFwb2ludCBpZiBmb3VuZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdHJhY2VQb2ludEluZm9zID0gdHJhY2VEYXRhUG9pbnRJbmZvcy5maWx0ZXIoZWxlbWVudCA9PiBlbGVtZW50LmZ1bGxuYW1lID09IHNpZ25hbHNbaV0ubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRyYWNlUG9pbnRJbmZvcy5sZW5ndGggPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdTZXJpZS5uYW1lID0gdHJhY2VQb2ludEluZm9zWzBdLmNvbXBvbmVudE5hbWUgKyBcIjpcIiArIHRyYWNlUG9pbnRJbmZvc1swXS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2VyaWUuZGVzY3JpcHRpb24gPSB0cmFjZURhdGFQb2ludEluZm9zWzBdLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNlcmllR3JvdXAuYWRkU2VyaWUobmV3U2VyaWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNpZ25hbHMuZm9yRWFjaChzaWduYWwgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoc2lnbmFsIGluc3RhbmNlb2YgWFlTaWduYWwgfHwgc2lnbmFsIGluc3RhbmNlb2YgRkZUU2lnbmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVDYWxjdWxhdGVkU2VyaWVGcm9tQ2FsY3VsYXRlZFNpZ25hbChzZXJpZUdyb3VwLCBzaWduYWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBzZXJpZUdyb3Vwcy5wdXNoKHNlcmllR3JvdXApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBzZXJpZUdyb3VwcztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZVlUU2VyaWVGcm9tWVRTaWduYWwoc2VyaWVHcm91cDogU2VyaWVHcm91cCwgc2lnbmFsOiBZVFNpZ25hbCk6IEJhc2VTZXJpZXMge1xyXG5cclxuICAgICAgICBsZXQgc2lnbmFsRGF0YSA9IG5ldyBBcnJheTxhbnk+KCk7XHJcblxyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgc2lnbmFsLml0ZW1zLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgc2lnbmFsRGF0YS5wdXNoKG5ldyBQb2ludChzaWduYWwuaXRlbXNbaV0udCwgc2lnbmFsLml0ZW1zW2ldLnkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG5ld1NpZ25hbCA9IG5ldyBTaWduYWwoc2lnbmFsLm5hbWUsIHNpZ25hbERhdGEpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICBsZXQgc2V0dGluZ3MgPSBTZXJpZXNIZWxwZXIuY3JlYXRlU2VyaWVTZXR0aW5ncyhuZXdTaWduYWwsIG5ld1NpZ25hbC5uYW1lLCBDb2xvckhlbHBlci5nZXRDb2xvcigpLCB0aGlzLl9zZXJpZXNQcm92aWRlci5nZXRVbmlxdWVJZCgpLCBTZXJpZXNUeXBlLnRpbWVTZXJpZXMpO1xyXG4gICAgICAgIGxldCBuZXdTZXJpZSA9IHRoaXMuX3Nlcmllc1Byb3ZpZGVyLmNyZWF0ZVNlcmllKHNldHRpbmdzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ld1NlcmllITtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlICBjcmVhdGVDYWxjdWxhdGVkU2VyaWVGcm9tQ2FsY3VsYXRlZFNpZ25hbChzZXJpZUdyb3VwOiBTZXJpZUdyb3VwLCBzaWduYWw6IElMaWJTaWduYWwpOiB2b2lke1xyXG5cclxuICAgICAgICBsZXQgY2FsY3VsYXRpb24gPSBuZXcgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uKHNpZ25hbC5uYW1lLCB0aGlzLl9zZXJpZXNQcm92aWRlcik7XHJcbiAgICAgICAgc2VyaWVHcm91cC5hZGRTZXJpZUNvbnRhaW5lcihjYWxjdWxhdGlvbiwgLTEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHNpZ25hbCBpbnN0YW5jZW9mICBYWVNpZ25hbCkge1xyXG5cclxuICAgICAgICAgICAgY2FsY3VsYXRpb24uc2V0Q2FsY3VsYXRvclR5cGVCeUlkKFhZQ2FsY3VsYXRvci5pZCk7XHJcbiAgICAgICAgICAgIGNhbGN1bGF0aW9uLnNldElucHV0VmFsdWVCeUlkKFhZQ2FsY3VsYXRvci5pbnB1dElkWFNpZ25hbCwgc2lnbmFsLnhTb3VyY2UubmFtZSk7XHJcbiAgICAgICAgICAgIGNhbGN1bGF0aW9uLnNldElucHV0VmFsdWVCeUlkKFhZQ2FsY3VsYXRvci5pbnB1dElkWVNpZ25hbCwgc2lnbmFsLnlTb3VyY2UubmFtZSk7XHJcbiAgICAgICAgICAgIGNhbGN1bGF0aW9uLnNldE91dHB1dFNpZ25hbE5hbWUoc2lnbmFsLm5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzaWduYWwgaW5zdGFuY2VvZiAgRkZUU2lnbmFsKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjYWxjdWxhdGlvbi5zZXRDYWxjdWxhdG9yVHlwZUJ5SWQoRmZ0Q2FsY3VsYXRvci5pZCk7XHJcbiAgICAgICAgICAgIGNhbGN1bGF0aW9uLnNldElucHV0VmFsdWVCeUlkKEZmdENhbGN1bGF0b3IuaW5wdXRJZFNpZ25hbCwgc2lnbmFsLnNvdXJjZS5uYW1lKTtcclxuICAgICAgICAgICAgY2FsY3VsYXRpb24uc2V0T3V0cHV0U2lnbmFsTmFtZShzaWduYWwubmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGdldEZpbGVFeHRlbnNpb24oZmlsZW5hbWUpOnN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGZpbGVuYW1lLnNsaWNlKChmaWxlbmFtZS5sYXN0SW5kZXhPZihcIi5cIikgLSAxID4+PiAwKSArIDIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBSZWNvcmRpbmcgaW1wbGVtZW50cyBJUmVjb3JkaW5ne1xyXG4gICAgc3RhcnRUcmlnZ2VyVGltZTogbnVtYmVyID0gMDtcclxuICAgIHNpZ25hbHM6IElMaWJTaWduYWxbXTtcclxuICAgIHByaXZhdGUgX3Nlcmllc1Byb3ZpZGVyOiBJU2VyaWVzUHJvdmlkZXI7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEV4cG9ydFNlcmllR3JvdXAsIHNlcmllc1Byb3ZpZGVyOiBJU2VyaWVzUHJvdmlkZXIpe1xyXG4gICAgICAgIHRoaXMuc2lnbmFscyA9IG5ldyBBcnJheTxJTGliU2lnbmFsPigpO1xyXG4gICAgICAgIHRoaXMuX3Nlcmllc1Byb3ZpZGVyID0gc2VyaWVzUHJvdmlkZXI7XHJcblxyXG4gICAgICAgIC8vRXhwb3J0IGEgc2VyaWVHcm91cFxyXG4gICAgICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgRXhwb3J0U2VyaWVHcm91cCkgeyAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5zdGFydFRyaWdnZXJUaW1lID0gZWxlbWVudC5zdGFydFRyaWdnZXJUaW1lOyAgXHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpIDwgZWxlbWVudC5zZXJpZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYoZWxlbWVudC5zZXJpZXNbaV0udHlwZSA9PSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMpeyAvL0V4cG9ydCBZVFNlcmllc1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2lnbmFscy5wdXNoKHRoaXMuY3JlYXRlWVRTaWduYWxGcm9tU2VyaWVzKGVsZW1lbnQuc2VyaWVzW2ldIGFzIFlUU2VyaWVzKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihlbGVtZW50LnNlcmllc1tpXS50eXBlID09IFNlcmllc1R5cGUueHlTZXJpZXMpeyAvL0V4cG9ydCBYWVNlcmllc1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2lnbmFscy5wdXNoKHRoaXMuY3JlYXRlWFlTaWduYWxGcm9tU2VyaWVzKGVsZW1lbnQuc2VyaWVzW2ldIGFzIFhZU2VyaWVzKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihlbGVtZW50LnNlcmllc1tpXS50eXBlID09IFNlcmllc1R5cGUuZmZ0U2VyaWVzKXsgLy9FeHBvcnQgRkZUU2VyaWVzXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaWduYWxzLnB1c2godGhpcy5jcmVhdGVGRlRTaWduYWxGcm9tU2VyaWVzKGVsZW1lbnQuc2VyaWVzW2ldIGFzIEZGVFNlcmllcykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlWVRTaWduYWxGcm9tU2VyaWVzKHNlcmllOiBZVFNlcmllcyk6IFlUU2lnbmFsIHtcclxuXHJcbiAgICAgICAgbGV0IHNhbXBsZXM6IEFycmF5PFNhbXBsZT4gPSBuZXcgQXJyYXkoKTtcclxuXHJcbiAgICAgICAgc2VyaWUucmF3UG9pbnRzLmZvckVhY2gocG9pbnQgPT4ge1xyXG4gICAgICAgICAgICBzYW1wbGVzLnB1c2gobmV3IFNhbXBsZShwb2ludC54LCBwb2ludC55KSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBZVFNpZ25hbChzZXJpZS5uYW1lLCBzYW1wbGVzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZVhZU2lnbmFsRnJvbVNlcmllcyhzZXJpZTogWFlTZXJpZXMpOiBYWVNpZ25hbCB7XHJcblxyXG4gICAgICAgIGxldCBwb2ludHM6IEFycmF5PENvcmVQb2ludD4gPSBuZXcgQXJyYXkoKTtcclxuXHJcbiAgICAgICAgc2VyaWUucmF3UG9pbnRzLmZvckVhY2gocG9pbnQgPT4ge1xyXG4gICAgICAgICAgICBwb2ludHMucHVzaChuZXcgQ29yZVBvaW50KHBvaW50LngsIHBvaW50LnkpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uRGF0YUluZm8gPSBzZXJpZS5jYWxjdWxhdGlvbkRhdGFJbmZvO1xyXG4gICAgICAgIGxldCB4U291cmNlOiBZVFNpZ25hbCA9IHRoaXMuY3JlYXRlWVRTaWduYWxGcm9tU2VyaWVzKHRoaXMuX3Nlcmllc1Byb3ZpZGVyLmdldChjYWxjdWxhdGlvbkRhdGFJbmZvIS5pbnB1dFNlcmllc0lkc1swXSkgYXMgWVRTZXJpZXMpO1xyXG4gICAgICAgIGxldCB5U291cmNlOiBZVFNpZ25hbCA9IHRoaXMuY3JlYXRlWVRTaWduYWxGcm9tU2VyaWVzKHRoaXMuX3Nlcmllc1Byb3ZpZGVyLmdldChjYWxjdWxhdGlvbkRhdGFJbmZvIS5pbnB1dFNlcmllc0lkc1sxXSkgYXMgWVRTZXJpZXMpO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFhZU2lnbmFsKHNlcmllLm5hbWUsIHBvaW50cywgeFNvdXJjZSwgeVNvdXJjZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVGRlRTaWduYWxGcm9tU2VyaWVzKHNlcmllOiBGRlRTZXJpZXMpOiBGRlRTaWduYWwge1xyXG5cclxuICAgICAgICBsZXQgZnJlcUFtcHM6IEFycmF5PEZyZXF1ZW5jeUFtcGxpdHVkZT4gPSBuZXcgQXJyYXkoKTtcclxuXHJcbiAgICAgICAgc2VyaWUucmF3UG9pbnRzLmZvckVhY2gocG9pbnQgPT4ge1xyXG4gICAgICAgICAgICBmcmVxQW1wcy5wdXNoKG5ldyBGcmVxdWVuY3lBbXBsaXR1ZGUocG9pbnQueCwgcG9pbnQueSkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25EYXRhSW5mbyA9IHNlcmllLmNhbGN1bGF0aW9uRGF0YUluZm87XHJcbiAgICAgICAgbGV0IHNvdXJjZTogWVRTaWduYWwgPSB0aGlzLmNyZWF0ZVlUU2lnbmFsRnJvbVNlcmllcyh0aGlzLl9zZXJpZXNQcm92aWRlci5nZXQoY2FsY3VsYXRpb25EYXRhSW5mbyEuaW5wdXRTZXJpZXNJZHNbMF0pIGFzIFlUU2VyaWVzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBGRlRTaWduYWwoc2VyaWUubmFtZSwgZnJlcUFtcHMsIHNvdXJjZSk7XHJcbiAgICB9XHJcbn1cclxuIl19