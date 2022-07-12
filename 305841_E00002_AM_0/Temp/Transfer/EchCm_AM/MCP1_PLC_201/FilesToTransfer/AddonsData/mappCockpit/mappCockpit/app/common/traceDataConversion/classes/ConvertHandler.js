define(["require", "exports", "../enums/ConvertTypes", "./converterASCsv", "../enums/traceDataConversionErrorTypes", "../exceptions/traceDataConversionError"], function (require, exports, ConvertTypes_1, converterASCsv_1, traceDataConversionErrorTypes_1, traceDataConversionError_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Handles the convertion of an array of IRecording.
     *
     * @class ConvertHandler
     * @implements {IConvertHandler}
     */
    var ConvertHandler = /** @class */ (function () {
        function ConvertHandler() {
        }
        /**
         *  Handles convertion of an array of f IRecording.
         *  Data gets converted with chosen type of convertion.
         *  Can throw TraceDataConversionError.
         *
         * @param {IRecording[]} data
         * @param {ConvertTypes} type
         * @returns {IPartialFile}
         * @memberof ConvertHandler
         */
        ConvertHandler.prototype.convert = function (data, type) {
            var converter;
            switch (type) {
                case ConvertTypes_1.ConvertTypes.CSV_AS_DE:
                //convert to type CSV_AS_DE
                case ConvertTypes_1.ConvertTypes.CSV_AS_EN:
                    //convert to type CSV_AS_EN
                    converter = new converterASCsv_1.ConverterASCsv();
                    break;
                default:
                    throw traceDataConversionError_1.TraceDataConversionError.build(traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.WRONG_FORMAT);
            }
            try {
                return converter.Convert(data, type);
            }
            catch (err) {
                throw traceDataConversionError_1.TraceDataConversionError.isTraceDataConversionError(err) ? err : traceDataConversionError_1.TraceDataConversionError.build(traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.INTERNAL, err);
            }
        };
        return ConvertHandler;
    }());
    exports.ConvertHandler = ConvertHandler;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udmVydEhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi90cmFjZURhdGFDb252ZXJzaW9uL2NsYXNzZXMvQ29udmVydEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBV0E7Ozs7O09BS0c7SUFDSDtRQUFBO1FBb0NBLENBQUM7UUFqQ0c7Ozs7Ozs7OztXQVNHO1FBQ0ksZ0NBQU8sR0FBZCxVQUFlLElBQWtCLEVBQUUsSUFBa0I7WUFFakQsSUFBSSxTQUFxQixDQUFDO1lBRTFCLFFBQU8sSUFBSSxFQUFFO2dCQUNULEtBQUssMkJBQVksQ0FBQyxTQUFTLENBQUM7Z0JBQ3hCLDJCQUEyQjtnQkFDL0IsS0FBSywyQkFBWSxDQUFDLFNBQVM7b0JBQ3ZCLDJCQUEyQjtvQkFDM0IsU0FBUyxHQUFHLElBQUksK0JBQWMsRUFBRSxDQUFDO29CQUNqQyxNQUFNO2dCQUNWO29CQUNJLE1BQU0sbURBQXdCLENBQUMsS0FBSyxDQUFDLDZEQUE2QixDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ3hGO1lBRUQsSUFBSTtnQkFFQSxPQUFPLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3ZDO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBRVYsTUFBTSxtREFBd0IsQ0FBQywwQkFBMEIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxtREFBd0IsQ0FBQyxLQUFLLENBQUMsNkRBQTZCLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ3RKO1FBQ0wsQ0FBQztRQUNMLHFCQUFDO0lBQUQsQ0FBQyxBQXBDRCxJQW9DQztJQUNRLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29udmVydFR5cGVzIH0gZnJvbSBcIi4uL2VudW1zL0NvbnZlcnRUeXBlc1wiO1xyXG5pbXBvcnQgeyBJUGFydGlhbEZpbGUgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9JUGFydGlhbEZpbGVcIjtcclxuaW1wb3J0IHsgSUNvbnZlcnRIYW5kbGVyIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvSUNvbnZlcnRIYW5kbGVyXCI7XHJcbmltcG9ydCB7IENvbnZlcnRlckFTQ3N2IH0gZnJvbSBcIi4vY29udmVydGVyQVNDc3ZcIjtcclxuaW1wb3J0IHsgSUNvbnZlcnRlciB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL0lDb252ZXJ0ZXJcIjtcclxuaW1wb3J0IHsgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yVHlwZXMgfSBmcm9tIFwiLi4vZW51bXMvdHJhY2VEYXRhQ29udmVyc2lvbkVycm9yVHlwZXNcIjtcclxuaW1wb3J0IHsgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yIH0gZnJvbSBcIi4uL2V4Y2VwdGlvbnMvdHJhY2VEYXRhQ29udmVyc2lvbkVycm9yXCI7XHJcbmltcG9ydCB7IElSZWNvcmRpbmcgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9yZWNvcmRpbmdJbnRlcmZhY2VcIjtcclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIEhhbmRsZXMgdGhlIGNvbnZlcnRpb24gb2YgYW4gYXJyYXkgb2YgSVJlY29yZGluZy5cclxuICpcclxuICogQGNsYXNzIENvbnZlcnRIYW5kbGVyXHJcbiAqIEBpbXBsZW1lbnRzIHtJQ29udmVydEhhbmRsZXJ9XHJcbiAqL1xyXG5jbGFzcyBDb252ZXJ0SGFuZGxlciBpbXBsZW1lbnRzIElDb252ZXJ0SGFuZGxlciB7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIEhhbmRsZXMgY29udmVydGlvbiBvZiBhbiBhcnJheSBvZiBmIElSZWNvcmRpbmcuXHJcbiAgICAgKiAgRGF0YSBnZXRzIGNvbnZlcnRlZCB3aXRoIGNob3NlbiB0eXBlIG9mIGNvbnZlcnRpb24uXHJcbiAgICAgKiAgQ2FuIHRocm93IFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvci5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtJUmVjb3JkaW5nW119IGRhdGFcclxuICAgICAqIEBwYXJhbSB7Q29udmVydFR5cGVzfSB0eXBlXHJcbiAgICAgKiBAcmV0dXJucyB7SVBhcnRpYWxGaWxlfVxyXG4gICAgICogQG1lbWJlcm9mIENvbnZlcnRIYW5kbGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb252ZXJ0KGRhdGE6IElSZWNvcmRpbmdbXSwgdHlwZTogQ29udmVydFR5cGVzKTogSVBhcnRpYWxGaWxlIHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgY29udmVydGVyOiBJQ29udmVydGVyO1xyXG5cclxuICAgICAgICBzd2l0Y2godHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIENvbnZlcnRUeXBlcy5DU1ZfQVNfREU6XHJcbiAgICAgICAgICAgICAgICAvL2NvbnZlcnQgdG8gdHlwZSBDU1ZfQVNfREVcclxuICAgICAgICAgICAgY2FzZSBDb252ZXJ0VHlwZXMuQ1NWX0FTX0VOOlxyXG4gICAgICAgICAgICAgICAgLy9jb252ZXJ0IHRvIHR5cGUgQ1NWX0FTX0VOXHJcbiAgICAgICAgICAgICAgICBjb252ZXJ0ZXIgPSBuZXcgQ29udmVydGVyQVNDc3YoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhyb3cgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yLmJ1aWxkKFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvclR5cGVzLldST05HX0ZPUk1BVCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIGNvbnZlcnRlci5Db252ZXJ0KGRhdGEsdHlwZSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcblxyXG4gICAgICAgICAgICB0aHJvdyBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IuaXNUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IoZXJyKSA/IGVyciA6IFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvci5idWlsZChUcmFjZURhdGFDb252ZXJzaW9uRXJyb3JUeXBlcy5JTlRFUk5BTCwgZXJyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IHsgQ29udmVydEhhbmRsZXIgfTsiXX0=