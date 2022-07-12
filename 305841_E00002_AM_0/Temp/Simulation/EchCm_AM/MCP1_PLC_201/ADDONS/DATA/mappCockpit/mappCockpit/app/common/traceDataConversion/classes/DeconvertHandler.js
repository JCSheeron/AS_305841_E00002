define(["require", "exports", "./CsvHandler", "../exceptions/traceDataConversionError", "../enums/traceDataConversionErrorTypes", "../../../core/types/point", "../../../core/types/frequencyAmplitude", "../../../core/types/sample", "./ytSignal"], function (require, exports, CsvHandler_1, traceDataConversionError_1, traceDataConversionErrorTypes_1, point_1, frequencyAmplitude_1, sample_1, ytSignal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Handles deconvertion of a partial file.
     *
     * @class DeconvertHandler
     * @implements {IDeconvertHandler}
     */
    var DeconvertHandler = /** @class */ (function () {
        function DeconvertHandler() {
        }
        /**
         * Handles deconvertion based on fileending of IPartialFile.
         * Can throw TraceDataConversionError.
         *
         * @param {IPartialFile} partialFile
         * @returns {IRecording[]}
         * @memberof DeconvertHandler
         */
        DeconvertHandler.prototype.Deconvert = function (partialFile) {
            var deconverter;
            var result;
            switch (partialFile.fileending.toLowerCase()) {
                case "csv":
                    //assumed csv type is either AsCsv or CoTraceCsv
                    //analyzing csv string to pick deconverter
                    var deconvertCsvHandler = new CsvHandler_1.CsvHandler();
                    try {
                        deconverter = deconvertCsvHandler.pickDeconverter(partialFile.data);
                    }
                    catch (err) {
                        throw traceDataConversionError_1.TraceDataConversionError.isTraceDataConversionError(err) ? err : traceDataConversionError_1.TraceDataConversionError.build(traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.INTERNAL, err);
                    }
                    break;
                default:
                    throw traceDataConversionError_1.TraceDataConversionError.build(traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.WRONG_FILETYPE);
            }
            try {
                result = deconverter.Deconvert(partialFile.data);
                this.validateRecording(result);
            }
            catch (err) {
                throw traceDataConversionError_1.TraceDataConversionError.isTraceDataConversionError(err) ? err : traceDataConversionError_1.TraceDataConversionError.build(traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.INTERNAL, err);
            }
            return result;
        };
        /**
         * Checks if Recording contains only valid data points.
         * If invalid (NaN) data point is found it throws a TraceDataConversionError.
         *
         * @private
         * @param {IRecording[]} recording
         * @memberof DeconvertHandler
         */
        DeconvertHandler.prototype.validateRecording = function (recording) {
            recording.forEach(function (record) {
                record.signals.forEach(function (signal) {
                    signal.items.forEach(function (item) {
                        var val1 = NaN;
                        var val2 = NaN;
                        if (item instanceof sample_1.Sample) {
                            val1 = item.t;
                            val2 = item.y;
                        }
                        if (item instanceof point_1.Point) {
                            val1 = item.x;
                            val2 = item.y;
                        }
                        if (item instanceof frequencyAmplitude_1.FrequencyAmplitude) {
                            val1 = item.f;
                            val2 = item.a;
                        }
                        if (Number.isNaN(val1) || Number.isNaN(val2)) {
                            throw traceDataConversionError_1.TraceDataConversionError.build(traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.INVALID_RECORDING);
                        }
                    });
                    if (signal instanceof ytSignal_1.YTSignal) {
                        var isTimeStrictlyMonotonicallyIncreasing = signal.items.every(function (point, index, items) {
                            return (index !== 0) ? point.t > items[index - 1].t : true;
                        });
                        if (!isTimeStrictlyMonotonicallyIncreasing) {
                            throw traceDataConversionError_1.TraceDataConversionError.build(traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.TIME_NOT_STRICTLY_MONOTONICALLY_INCREASING, signal.name);
                        }
                    }
                });
            });
        };
        return DeconvertHandler;
    }());
    exports.DeconvertHandler = DeconvertHandler;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVjb252ZXJ0SGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3RyYWNlRGF0YUNvbnZlcnNpb24vY2xhc3Nlcy9EZWNvbnZlcnRIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQWVBOzs7OztPQUtHO0lBQ0g7UUFBQTtRQXVGQSxDQUFDO1FBcEZPOzs7Ozs7O1dBT0c7UUFDSSxvQ0FBUyxHQUFoQixVQUFpQixXQUF5QjtZQUVsQyxJQUFJLFdBQXlCLENBQUM7WUFDOUIsSUFBSSxNQUFvQixDQUFDO1lBQ3pCLFFBQVEsV0FBVyxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsRUFBRTtnQkFDdEMsS0FBSyxLQUFLO29CQUNGLGdEQUFnRDtvQkFDaEQsMENBQTBDO29CQUMxQyxJQUFJLG1CQUFtQixHQUFHLElBQUksdUJBQVUsRUFBRSxDQUFDO29CQUUzQyxJQUFJO3dCQUVKLFdBQVcsR0FBRSxtQkFBbUIsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUNsRTtvQkFBQyxPQUFNLEdBQUcsRUFBRTt3QkFFTCxNQUFNLG1EQUF3QixDQUFDLDBCQUEwQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLG1EQUF3QixDQUFDLEtBQUssQ0FBQyw2REFBNkIsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7cUJBQzFKO29CQUVELE1BQU07Z0JBQ2Q7b0JBQ1EsTUFBTSxtREFBd0IsQ0FBQyxLQUFLLENBQUMsNkRBQTZCLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDbEc7WUFDRCxJQUFJO2dCQUVJLE1BQU0sR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDakQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3RDO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBRU4sTUFBTSxtREFBd0IsQ0FBQywwQkFBMEIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxtREFBd0IsQ0FBQyxLQUFLLENBQUMsNkRBQTZCLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQzFKO1lBRUQsT0FBTyxNQUFNLENBQUM7UUFDdEIsQ0FBQztRQUdEOzs7Ozs7O1dBT0c7UUFDSyw0Q0FBaUIsR0FBekIsVUFBMEIsU0FBdUI7WUFDekMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQWtCO2dCQUM3QixNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQWU7b0JBQy9CLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBZ0M7d0JBQzlDLElBQUksSUFBSSxHQUFXLEdBQUcsQ0FBQzt3QkFDdkIsSUFBSSxJQUFJLEdBQVcsR0FBRyxDQUFDO3dCQUN2QixJQUFHLElBQUksWUFBWSxlQUFNLEVBQUU7NEJBQ25CLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDOzRCQUNkLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO3lCQUNyQjt3QkFDRCxJQUFHLElBQUksWUFBWSxhQUFLLEVBQUU7NEJBQ2xCLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDOzRCQUNkLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO3lCQUNyQjt3QkFDRCxJQUFHLElBQUksWUFBWSx1Q0FBa0IsRUFBRTs0QkFDL0IsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7NEJBQ2QsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7eUJBQ3JCO3dCQUNELElBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFOzRCQUNyQyxNQUFNLG1EQUF3QixDQUFDLEtBQUssQ0FBQyw2REFBNkIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO3lCQUM3RjtvQkFDVCxDQUFDLENBQUMsQ0FBQztvQkFDSCxJQUFHLE1BQU0sWUFBWSxtQkFBUSxFQUFFO3dCQUN2QixJQUFJLHFDQUFxQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFVBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLOzRCQUNuRSxPQUFPLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7d0JBQ2pFLENBQUMsQ0FBQyxDQUFDO3dCQUNYLElBQUcsQ0FBQyxxQ0FBcUMsRUFBRTs0QkFDbkMsTUFBTSxtREFBd0IsQ0FBQyxLQUFLLENBQUMsNkRBQTZCLENBQUMsMENBQTBDLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO3lCQUNuSTtxQkFDUjtnQkFDVCxDQUFDLENBQUMsQ0FBQztZQUNYLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQztRQUNULHVCQUFDO0lBQUQsQ0FBQyxBQXZGRCxJQXVGQztJQUNRLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElQYXJ0aWFsRmlsZSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL0lQYXJ0aWFsRmlsZVwiO1xyXG5pbXBvcnQgeyBJRGVjb252ZXJ0SGFuZGxlciB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL0lEZWNvbnZlcnRIYW5kbGVyXCI7XHJcbmltcG9ydCB7IENzdkhhbmRsZXIgfSBmcm9tIFwiLi9Dc3ZIYW5kbGVyXCI7XHJcbmltcG9ydCB7IElEZWNvbnZlcnRlciB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL0lEZWNvbnZlcnRlclwiO1xyXG5pbXBvcnQgeyBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IgfSBmcm9tIFwiLi4vZXhjZXB0aW9ucy90cmFjZURhdGFDb252ZXJzaW9uRXJyb3JcIjtcclxuaW1wb3J0IHsgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yVHlwZXMgfSBmcm9tIFwiLi4vZW51bXMvdHJhY2VEYXRhQ29udmVyc2lvbkVycm9yVHlwZXNcIjtcclxuaW1wb3J0IHsgSVJlY29yZGluZyB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3JlY29yZGluZ0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJU2lnbmFsIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvc2lnbmFsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvdHlwZXMvcG9pbnRcIjtcclxuaW1wb3J0IHsgRnJlcXVlbmN5QW1wbGl0dWRlIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvdHlwZXMvZnJlcXVlbmN5QW1wbGl0dWRlXCI7XHJcbmltcG9ydCB7IFNhbXBsZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3R5cGVzL3NhbXBsZVwiO1xyXG5pbXBvcnQgeyBJVmFsdWVQYWlyIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvaW50ZXJmYWNlcy92YWx1ZVBhaXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgWVRTaWduYWwgfSBmcm9tIFwiLi95dFNpZ25hbFwiO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBIYW5kbGVzIGRlY29udmVydGlvbiBvZiBhIHBhcnRpYWwgZmlsZS5cclxuICpcclxuICogQGNsYXNzIERlY29udmVydEhhbmRsZXJcclxuICogQGltcGxlbWVudHMge0lEZWNvbnZlcnRIYW5kbGVyfVxyXG4gKi9cclxuY2xhc3MgRGVjb252ZXJ0SGFuZGxlciBpbXBsZW1lbnRzIElEZWNvbnZlcnRIYW5kbGVyIHtcclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEhhbmRsZXMgZGVjb252ZXJ0aW9uIGJhc2VkIG9uIGZpbGVlbmRpbmcgb2YgSVBhcnRpYWxGaWxlLlxyXG4gICAgICAgICAqIENhbiB0aHJvdyBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge0lQYXJ0aWFsRmlsZX0gcGFydGlhbEZpbGVcclxuICAgICAgICAgKiBAcmV0dXJucyB7SVJlY29yZGluZ1tdfVxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBEZWNvbnZlcnRIYW5kbGVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIERlY29udmVydChwYXJ0aWFsRmlsZTogSVBhcnRpYWxGaWxlKTogSVJlY29yZGluZ1tdIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZGVjb252ZXJ0ZXI6IElEZWNvbnZlcnRlcjtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQ6IElSZWNvcmRpbmdbXTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAocGFydGlhbEZpbGUuZmlsZWVuZGluZy50b0xvd2VyQ2FzZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjc3ZcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2Fzc3VtZWQgY3N2IHR5cGUgaXMgZWl0aGVyIEFzQ3N2IG9yIENvVHJhY2VDc3ZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2FuYWx5emluZyBjc3Ygc3RyaW5nIHRvIHBpY2sgZGVjb252ZXJ0ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGVjb252ZXJ0Q3N2SGFuZGxlciA9IG5ldyBDc3ZIYW5kbGVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlY29udmVydGVyPSBkZWNvbnZlcnRDc3ZIYW5kbGVyLnBpY2tEZWNvbnZlcnRlcihwYXJ0aWFsRmlsZS5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoKGVycikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvci5pc1RyYWNlRGF0YUNvbnZlcnNpb25FcnJvcihlcnIpID8gZXJyIDogVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yLmJ1aWxkKFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvclR5cGVzLklOVEVSTkFMLCBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yLmJ1aWxkKFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvclR5cGVzLldST05HX0ZJTEVUWVBFKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBkZWNvbnZlcnRlci5EZWNvbnZlcnQocGFydGlhbEZpbGUuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmFsaWRhdGVSZWNvcmRpbmcocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yLmlzVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yKGVycikgPyBlcnIgOiBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IuYnVpbGQoVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yVHlwZXMuSU5URVJOQUwsIGVycik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDaGVja3MgaWYgUmVjb3JkaW5nIGNvbnRhaW5zIG9ubHkgdmFsaWQgZGF0YSBwb2ludHMuXHJcbiAgICAgICAgICogSWYgaW52YWxpZCAoTmFOKSBkYXRhIHBvaW50IGlzIGZvdW5kIGl0IHRocm93cyBhIFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvci5cclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICAgICAqIEBwYXJhbSB7SVJlY29yZGluZ1tdfSByZWNvcmRpbmdcclxuICAgICAgICAgKiBAbWVtYmVyb2YgRGVjb252ZXJ0SGFuZGxlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgdmFsaWRhdGVSZWNvcmRpbmcocmVjb3JkaW5nOiBJUmVjb3JkaW5nW10pIHtcclxuICAgICAgICAgICAgICAgIHJlY29yZGluZy5mb3JFYWNoKChyZWNvcmQ6IElSZWNvcmRpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVjb3JkLnNpZ25hbHMuZm9yRWFjaCgoc2lnbmFsOiBJU2lnbmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsLml0ZW1zLmZvckVhY2goKGl0ZW06IElWYWx1ZVBhaXI8bnVtYmVyLCBudW1iZXI+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFsMTogbnVtYmVyID0gTmFOO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbDI6IG51bWJlciA9IE5hTjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGl0ZW0gaW5zdGFuY2VvZiBTYW1wbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsMSA9IGl0ZW0udDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsMiA9IGl0ZW0ueTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGl0ZW0gaW5zdGFuY2VvZiBQb2ludCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwxID0gaXRlbS54O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwyID0gaXRlbS55O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXRlbSBpbnN0YW5jZW9mIEZyZXF1ZW5jeUFtcGxpdHVkZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwxID0gaXRlbS5mO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwyID0gaXRlbS5hO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoTnVtYmVyLmlzTmFOKHZhbDEpIHx8IE51bWJlci5pc05hTih2YWwyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IuYnVpbGQoVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yVHlwZXMuSU5WQUxJRF9SRUNPUkRJTkcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNpZ25hbCBpbnN0YW5jZW9mIFlUU2lnbmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXNUaW1lU3RyaWN0bHlNb25vdG9uaWNhbGx5SW5jcmVhc2luZyA9IHNpZ25hbC5pdGVtcy5ldmVyeSgocG9pbnQsIGluZGV4LCBpdGVtcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoaW5kZXggIT09IDApID8gcG9pbnQudCA+IGl0ZW1zW2luZGV4LTFdLnQgOiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFpc1RpbWVTdHJpY3RseU1vbm90b25pY2FsbHlJbmNyZWFzaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvci5idWlsZChUcmFjZURhdGFDb252ZXJzaW9uRXJyb3JUeXBlcy5USU1FX05PVF9TVFJJQ1RMWV9NT05PVE9OSUNBTExZX0lOQ1JFQVNJTkcsIHNpZ25hbC5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG59XHJcbmV4cG9ydCB7IERlY29udmVydEhhbmRsZXIgfTsiXX0=