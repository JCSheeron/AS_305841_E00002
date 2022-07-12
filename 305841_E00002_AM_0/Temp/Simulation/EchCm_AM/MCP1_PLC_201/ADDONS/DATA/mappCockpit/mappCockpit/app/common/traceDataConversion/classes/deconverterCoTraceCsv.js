define(["require", "exports", "./CoTraceCsvDeconverter", "../exceptions/traceDataConversionError", "../enums/traceDataConversionErrorTypes", "./ytSignal", "../../../core/types/sample"], function (require, exports, CoTraceCsvDeconverter_1, traceDataConversionError_1, traceDataConversionErrorTypes_1, ytSignal_1, sample_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Runs deconvertion of a CoTrace CSV string.
     * Adapter class.
     *
     * @class DeconverterCoTraceCsv
     * @implements {IDeconverter}
     */
    var DeconverterCoTraceCsv = /** @class */ (function () {
        function DeconverterCoTraceCsv() {
        }
        /**
         * Starts a deconvertion of a CoTrace CSV string into an array of IRecording
         * Can throw TraceDataConversionError.
         *
         * @param {string} data
         * @returns {IRecording[]}
         * @memberof DeconverterCoTraceCsv
         */
        DeconverterCoTraceCsv.prototype.Deconvert = function (data) {
            var deconverter = new CoTraceCsvDeconverter_1.CoTraceCsvDeconverter();
            //run deconvertion
            var result;
            try {
                result = deconverter.deconvert(data);
            }
            catch (err) {
                throw traceDataConversionError_1.TraceDataConversionError.isTraceDataConversionError(err) ? err : traceDataConversionError_1.TraceDataConversionError.build(traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.INTERNAL, err);
            }
            //convert ICoTraceSignal to ISignal and store them in an array
            var signalArray = new Array();
            for (var i = 0; i < result.signals.length; i++) {
                signalArray.push(new ytSignal_1.YTSignal(result.signals[i].name, this.extractSamples(result.signals[i].samples)));
            }
            //build IRecording
            var recording = {
                startTriggerTime: result.starttrigger.getTime() * 1000.0,
                signals: signalArray
            };
            //add IRecording to an array as interface requires an array as return value
            var recordingArray = new Array();
            recordingArray.push(recording);
            return recordingArray;
        };
        /**
         * Builds explicit instances of class Sample from ISample interface.
         *
         * @private
         * @param {Array<ISample>} coTraceSamples
         * @returns {Array<Sample>}
         * @memberof DeconverterCoTraceCsv
         */
        DeconverterCoTraceCsv.prototype.extractSamples = function (coTraceSamples) {
            var samples = new Array();
            coTraceSamples.forEach(function (sample) {
                samples.push(new sample_1.Sample(sample.t, sample.y));
            });
            return samples;
        };
        return DeconverterCoTraceCsv;
    }());
    exports.DeconverterCoTraceCsv = DeconverterCoTraceCsv;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb252ZXJ0ZXJDb1RyYWNlQ3N2LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vdHJhY2VEYXRhQ29udmVyc2lvbi9jbGFzc2VzL2RlY29udmVydGVyQ29UcmFjZUNzdi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFZQTs7Ozs7O09BTUc7SUFDSDtRQUFBO1FBa0VBLENBQUM7UUEvREc7Ozs7Ozs7V0FPRztRQUNILHlDQUFTLEdBQVQsVUFBVSxJQUFZO1lBQ2xCLElBQUksV0FBVyxHQUFFLElBQUksNkNBQXFCLEVBQUUsQ0FBQztZQUU3QyxrQkFBa0I7WUFDbEIsSUFBSSxNQUF5QixDQUFDO1lBRTlCLElBQUk7Z0JBRUEsTUFBTSxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDeEM7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFFVixNQUFNLG1EQUF3QixDQUFDLDBCQUEwQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLG1EQUF3QixDQUFDLEtBQUssQ0FBQyw2REFBNkIsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDdEo7WUFFRCw4REFBOEQ7WUFDOUQsSUFBSSxXQUFXLEdBQWtCLElBQUksS0FBSyxFQUFXLENBQUM7WUFDdEQsS0FBSSxJQUFJLENBQUMsR0FBVSxDQUFDLEVBQUUsQ0FBQyxHQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUVoRCxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksbUJBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBRTFHO1lBRUQsa0JBQWtCO1lBQ2xCLElBQUksU0FBUyxHQUFjO2dCQUNLLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEdBQUMsTUFBTTtnQkFDdEQsT0FBTyxFQUFFLFdBQVc7YUFDdkIsQ0FBQztZQUU5QiwyRUFBMkU7WUFDM0UsSUFBSSxjQUFjLEdBQXFCLElBQUksS0FBSyxFQUFjLENBQUM7WUFDL0QsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUUvQixPQUFPLGNBQWMsQ0FBQztRQUMxQixDQUFDO1FBR0Q7Ozs7Ozs7V0FPRztRQUNLLDhDQUFjLEdBQXRCLFVBQXVCLGNBQThCO1lBQ2pELElBQUksT0FBTyxHQUFpQixJQUFJLEtBQUssRUFBVSxDQUFDO1lBRWhELGNBQWMsQ0FBQyxPQUFPLENBQUMsVUFBQSxNQUFNO2dCQUN6QixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksZUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakQsQ0FBQyxDQUFDLENBQUM7WUFFSCxPQUFPLE9BQU8sQ0FBQztRQUNuQixDQUFDO1FBR0wsNEJBQUM7SUFBRCxDQUFDLEFBbEVELElBa0VDO0lBRVEsc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNvVHJhY2VSZWNvcmRpbmcgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9JQ29UcmFjZVJlY29yZGluZ1wiO1xyXG5pbXBvcnQgeyBJUmVjb3JkaW5nIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcmVjb3JkaW5nSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENvVHJhY2VDc3ZEZWNvbnZlcnRlciB9IGZyb20gXCIuL0NvVHJhY2VDc3ZEZWNvbnZlcnRlclwiO1xyXG5pbXBvcnQgeyBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IgfSBmcm9tIFwiLi4vZXhjZXB0aW9ucy90cmFjZURhdGFDb252ZXJzaW9uRXJyb3JcIjtcclxuaW1wb3J0IHsgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yVHlwZXMgfSBmcm9tIFwiLi4vZW51bXMvdHJhY2VEYXRhQ29udmVyc2lvbkVycm9yVHlwZXNcIjtcclxuaW1wb3J0IHsgSVNhbXBsZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2ludGVyZmFjZXMvc2FtcGxlSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFlUU2lnbmFsIH0gZnJvbSBcIi4veXRTaWduYWxcIjtcclxuaW1wb3J0IHsgSVNpZ25hbCB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3NpZ25hbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJRGVjb252ZXJ0ZXIgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9JRGVjb252ZXJ0ZXJcIjtcclxuaW1wb3J0IHsgU2FtcGxlIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvdHlwZXMvc2FtcGxlXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIFJ1bnMgZGVjb252ZXJ0aW9uIG9mIGEgQ29UcmFjZSBDU1Ygc3RyaW5nLlxyXG4gKiBBZGFwdGVyIGNsYXNzLlxyXG4gKiBcclxuICogQGNsYXNzIERlY29udmVydGVyQ29UcmFjZUNzdlxyXG4gKiBAaW1wbGVtZW50cyB7SURlY29udmVydGVyfVxyXG4gKi9cclxuY2xhc3MgRGVjb252ZXJ0ZXJDb1RyYWNlQ3N2IGltcGxlbWVudHMgSURlY29udmVydGVyIHtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGFydHMgYSBkZWNvbnZlcnRpb24gb2YgYSBDb1RyYWNlIENTViBzdHJpbmcgaW50byBhbiBhcnJheSBvZiBJUmVjb3JkaW5nXHJcbiAgICAgKiBDYW4gdGhyb3cgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGF0YVxyXG4gICAgICogQHJldHVybnMge0lSZWNvcmRpbmdbXX1cclxuICAgICAqIEBtZW1iZXJvZiBEZWNvbnZlcnRlckNvVHJhY2VDc3ZcclxuICAgICAqL1xyXG4gICAgRGVjb252ZXJ0KGRhdGE6IHN0cmluZyk6SVJlY29yZGluZ1tdIHtcclxuICAgICAgICBsZXQgZGVjb252ZXJ0ZXI9IG5ldyBDb1RyYWNlQ3N2RGVjb252ZXJ0ZXIoKTtcclxuXHJcbiAgICAgICAgLy9ydW4gZGVjb252ZXJ0aW9uXHJcbiAgICAgICAgbGV0IHJlc3VsdDogSUNvVHJhY2VSZWNvcmRpbmc7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdHJ5IHtcclxuXHJcbiAgICAgICAgICAgIHJlc3VsdCA9IGRlY29udmVydGVyLmRlY29udmVydChkYXRhKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuXHJcbiAgICAgICAgICAgIHRocm93IFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvci5pc1RyYWNlRGF0YUNvbnZlcnNpb25FcnJvcihlcnIpID8gZXJyIDogVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yLmJ1aWxkKFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvclR5cGVzLklOVEVSTkFMLCBlcnIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9jb252ZXJ0IElDb1RyYWNlU2lnbmFsIHRvIElTaWduYWwgYW5kIHN0b3JlIHRoZW0gaW4gYW4gYXJyYXlcclxuICAgICAgICBsZXQgc2lnbmFsQXJyYXk6IEFycmF5PElTaWduYWw+PSBuZXcgQXJyYXk8SVNpZ25hbD4oKTtcclxuICAgICAgICBmb3IobGV0IGk6IG51bWJlcj0gMDsgaTxyZXN1bHQuc2lnbmFscy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgc2lnbmFsQXJyYXkucHVzaChuZXcgWVRTaWduYWwocmVzdWx0LnNpZ25hbHNbaV0ubmFtZSwgdGhpcy5leHRyYWN0U2FtcGxlcyhyZXN1bHQuc2lnbmFsc1tpXS5zYW1wbGVzKSkpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vYnVpbGQgSVJlY29yZGluZ1xyXG4gICAgICAgIGxldCByZWNvcmRpbmc6IElSZWNvcmRpbmc9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0VHJpZ2dlclRpbWU6IHJlc3VsdC5zdGFydHRyaWdnZXIuZ2V0VGltZSgpKjEwMDAuMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hbHM6IHNpZ25hbEFycmF5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9hZGQgSVJlY29yZGluZyB0byBhbiBhcnJheSBhcyBpbnRlcmZhY2UgcmVxdWlyZXMgYW4gYXJyYXkgYXMgcmV0dXJuIHZhbHVlXHJcbiAgICAgICAgbGV0IHJlY29yZGluZ0FycmF5OiBBcnJheTxJUmVjb3JkaW5nPj0gbmV3IEFycmF5PElSZWNvcmRpbmc+KCk7XHJcbiAgICAgICAgcmVjb3JkaW5nQXJyYXkucHVzaChyZWNvcmRpbmcpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiByZWNvcmRpbmdBcnJheTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCdWlsZHMgZXhwbGljaXQgaW5zdGFuY2VzIG9mIGNsYXNzIFNhbXBsZSBmcm9tIElTYW1wbGUgaW50ZXJmYWNlLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElTYW1wbGU+fSBjb1RyYWNlU2FtcGxlc1xyXG4gICAgICogQHJldHVybnMge0FycmF5PFNhbXBsZT59XHJcbiAgICAgKiBAbWVtYmVyb2YgRGVjb252ZXJ0ZXJDb1RyYWNlQ3N2XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZXh0cmFjdFNhbXBsZXMoY29UcmFjZVNhbXBsZXM6IEFycmF5PElTYW1wbGU+KTogQXJyYXk8U2FtcGxlPiB7XHJcbiAgICAgICAgbGV0IHNhbXBsZXM6IEFycmF5PFNhbXBsZT49IG5ldyBBcnJheTxTYW1wbGU+KCk7XHJcblxyXG4gICAgICAgIGNvVHJhY2VTYW1wbGVzLmZvckVhY2goc2FtcGxlID0+IHtcclxuICAgICAgICAgICAgc2FtcGxlcy5wdXNoKG5ldyBTYW1wbGUoc2FtcGxlLnQsIHNhbXBsZS55KSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBzYW1wbGVzO1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG59XHJcblxyXG5leHBvcnQgeyBEZWNvbnZlcnRlckNvVHJhY2VDc3YgfTsiXX0=