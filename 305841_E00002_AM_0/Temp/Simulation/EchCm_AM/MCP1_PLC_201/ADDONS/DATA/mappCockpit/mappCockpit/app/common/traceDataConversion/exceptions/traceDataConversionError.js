var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "../enums/traceDataConversionErrorTypes"], function (require, exports, traceDataConversionErrorTypes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * This class represents an error ocurred in traceDataConversion.
     *
     * @class TraceDataConversionError
     * @extends {Error}
     */
    var TraceDataConversionError = /** @class */ (function (_super) {
        __extends(TraceDataConversionError, _super);
        /**
         * Creates an instance of TraceDataConversionError.
         * The id will be added to the base name.
         *
         * @param {number} id
         * @param {string} text
         * @memberof TraceDataConversionError
         */
        function TraceDataConversionError(id, text) {
            var _this = _super.call(this, text) || this;
            _this.name = TraceDataConversionError.errorName + id;
            return _this;
        }
        /**
         * Typeguard to check if an Error is a TraceDataConversionError.
         *
         * @static
         * @param {Error} err
         * @returns {err is TraceDataConversionError}
         * @memberof TraceDataConversionError
         */
        TraceDataConversionError.isTraceDataConversionError = function (err) {
            var isFound = false;
            if (err instanceof Error && err.name.search(TraceDataConversionError.errorName) >= 0) {
                isFound = true;
            }
            return isFound;
        };
        /**
         * Builds a TraceData Conversion Error based on the TraceDataConversionErrorType
         * Appends additionalInfo to the base error text
         *
         * @static
         * @param {TraceDataConversionErrorTypes} errorType
         * @param {string} [additionalInfo]
         * @returns {TraceDataConversionError}
         * @memberof TraceDataConversionError
         */
        TraceDataConversionError.build = function (errorType, additionalInfo) {
            var text = this.getErrorText(errorType);
            text += additionalInfo ? (": " + additionalInfo) : ".";
            return new TraceDataConversionError(errorType, text);
        };
        /**
         * Provides the base error text for an TraceDataConversionErrorType or ID.
         *
         * @static
         * @param {TraceDataConversionErrorTypes} errorType
         * @returns {string}
         * @memberof TraceDataConversionError
         */
        TraceDataConversionError.getErrorText = function (errorType) {
            var text;
            switch (errorType) {
                case traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.WRONG_FORMAT:
                    text = "This format is not supported";
                    break;
                case traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.NO_DATA:
                    text = "There is no data to be converted";
                    break;
                case traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.FORMAT_VIOLATION:
                    text = "The format is invalid";
                    break;
                case traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.NO_COLSEP:
                    text = "The column seperator can not be determined";
                    break;
                case traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.NO_COMSEP:
                    text = "The comma seperator can not be determined";
                    break;
                case traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.UNKNOWN_COLSEP:
                    text = "The column seperator is unknown";
                    break;
                case traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.UNKNOWN_COMSEP:
                    text = "The comma seperator is unknown";
                    break;
                case traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.MISSING_ATTRIBUTE:
                    text = "An attribute does not exist";
                    break;
                case traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.UNKNOWN_FORMAT:
                    text = "The format can not be determined";
                    break;
                case traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.WRONG_FILETYPE:
                    text = "This filetype is not supported";
                    break;
                case traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.INTERNAL:
                    text = "Internal error";
                    break;
                case traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.INVALID_RECORDING:
                    text = "The recording contains signals with invalid numbers";
                    break;
                case traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.TIME_NOT_STRICTLY_MONOTONICALLY_INCREASING:
                    text = "The timestamps are not strictly monotonically increasing";
                    break;
                default:
                    text = "Unknown reason";
                    break;
            }
            return text;
        };
        /**
         * Holds the base name of the TraceDataConversion Error.
         *
         * @private
         * @static
         * @type {string}
         * @memberof TraceDataConversionError
         */
        TraceDataConversionError.errorName = "TraceDataConversionError ID ";
        return TraceDataConversionError;
    }(Error));
    exports.TraceDataConversionError = TraceDataConversionError;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VEYXRhQ29udmVyc2lvbkVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vdHJhY2VEYXRhQ29udmVyc2lvbi9leGNlcHRpb25zL3RyYWNlRGF0YUNvbnZlcnNpb25FcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBR0E7Ozs7O09BS0c7SUFDSDtRQUF1Qyw0Q0FBSztRQWdCeEM7Ozs7Ozs7V0FPRztRQUNILGtDQUFvQixFQUFVLEVBQUUsSUFBWTtZQUE1QyxZQUVJLGtCQUFNLElBQUksQ0FBQyxTQUVkO1lBREcsS0FBSSxDQUFDLElBQUksR0FBRyx3QkFBd0IsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDOztRQUN4RCxDQUFDO1FBS0Q7Ozs7Ozs7V0FPRztRQUNXLG1EQUEwQixHQUF4QyxVQUF5QyxHQUFRO1lBRTdDLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztZQUVwQixJQUFJLEdBQUcsWUFBWSxLQUFLLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUVsRixPQUFPLEdBQUcsSUFBSSxDQUFDO2FBQ2xCO1lBQ0QsT0FBTyxPQUFPLENBQUM7UUFDbkIsQ0FBQztRQUdEOzs7Ozs7Ozs7V0FTRztRQUNXLDhCQUFLLEdBQW5CLFVBQW9CLFNBQXdDLEVBQUUsY0FBdUI7WUFFakYsSUFBSSxJQUFJLEdBQVcsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUVoRCxJQUFJLElBQUksY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBRXZELE9BQU8sSUFBSSx3QkFBd0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDekQsQ0FBQztRQUlEOzs7Ozs7O1dBT0c7UUFDVyxxQ0FBWSxHQUExQixVQUEyQixTQUF3QztZQUUvRCxJQUFJLElBQVksQ0FBQztZQUVqQixRQUFRLFNBQVMsRUFBRTtnQkFFZixLQUFLLDZEQUE2QixDQUFDLFlBQVk7b0JBQzNDLElBQUksR0FBRyw4QkFBOEIsQ0FBQztvQkFDdEMsTUFBTTtnQkFDVixLQUFLLDZEQUE2QixDQUFDLE9BQU87b0JBQ3RDLElBQUksR0FBRyxrQ0FBa0MsQ0FBQztvQkFDMUMsTUFBSztnQkFDVCxLQUFLLDZEQUE2QixDQUFDLGdCQUFnQjtvQkFDL0MsSUFBSSxHQUFHLHVCQUF1QixDQUFBO29CQUM5QixNQUFLO2dCQUNULEtBQUssNkRBQTZCLENBQUMsU0FBUztvQkFDeEMsSUFBSSxHQUFHLDRDQUE0QyxDQUFDO29CQUNwRCxNQUFNO2dCQUNWLEtBQUssNkRBQTZCLENBQUMsU0FBUztvQkFDeEMsSUFBSSxHQUFHLDJDQUEyQyxDQUFDO29CQUNuRCxNQUFNO2dCQUNWLEtBQUssNkRBQTZCLENBQUMsY0FBYztvQkFDN0MsSUFBSSxHQUFHLGlDQUFpQyxDQUFDO29CQUN6QyxNQUFNO2dCQUNWLEtBQUssNkRBQTZCLENBQUMsY0FBYztvQkFDN0MsSUFBSSxHQUFHLGdDQUFnQyxDQUFDO29CQUN4QyxNQUFNO2dCQUNWLEtBQUssNkRBQTZCLENBQUMsaUJBQWlCO29CQUNoRCxJQUFJLEdBQUcsNkJBQTZCLENBQUM7b0JBQ3JDLE1BQU07Z0JBQ1YsS0FBSyw2REFBNkIsQ0FBQyxjQUFjO29CQUM3QyxJQUFJLEdBQUcsa0NBQWtDLENBQUM7b0JBQzFDLE1BQU07Z0JBQ1YsS0FBSyw2REFBNkIsQ0FBQyxjQUFjO29CQUM3QyxJQUFJLEdBQUcsZ0NBQWdDLENBQUM7b0JBQ3hDLE1BQU07Z0JBQ1YsS0FBSyw2REFBNkIsQ0FBQyxRQUFRO29CQUN2QyxJQUFJLEdBQUcsZ0JBQWdCLENBQUM7b0JBQ3hCLE1BQU07Z0JBQ1YsS0FBSyw2REFBNkIsQ0FBQyxpQkFBaUI7b0JBQ2hELElBQUksR0FBRyxxREFBcUQsQ0FBQztvQkFDN0QsTUFBTTtnQkFDVixLQUFLLDZEQUE2QixDQUFDLDBDQUEwQztvQkFDekUsSUFBSSxHQUFHLDBEQUEwRCxDQUFDO29CQUNsRSxNQUFNO2dCQUNWO29CQUNJLElBQUksR0FBRyxnQkFBZ0IsQ0FBQztvQkFDeEIsTUFBTTthQUNiO1lBRUQsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQWpJRDs7Ozs7OztXQU9HO1FBQ3FCLGtDQUFTLEdBQVcsOEJBQThCLENBQUM7UUEySC9FLCtCQUFDO0tBQUEsQUF2SUQsQ0FBdUMsS0FBSyxHQXVJM0M7SUFBVSw0REFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3JUeXBlcyB9IGZyb20gXCIuLi9lbnVtcy90cmFjZURhdGFDb252ZXJzaW9uRXJyb3JUeXBlc1wiO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIHJlcHJlc2VudHMgYW4gZXJyb3Igb2N1cnJlZCBpbiB0cmFjZURhdGFDb252ZXJzaW9uLlxyXG4gKlxyXG4gKiBAY2xhc3MgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yXHJcbiAqIEBleHRlbmRzIHtFcnJvcn1cclxuICovXHJcbmNsYXNzIFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvciBleHRlbmRzIEVycm9ye1xyXG5cclxuXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogSG9sZHMgdGhlIGJhc2UgbmFtZSBvZiB0aGUgVHJhY2VEYXRhQ29udmVyc2lvbiBFcnJvci5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgZXJyb3JOYW1lOiBzdHJpbmcgPSBcIlRyYWNlRGF0YUNvbnZlcnNpb25FcnJvciBJRCBcIjtcclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IuXHJcbiAgICAgKiBUaGUgaWQgd2lsbCBiZSBhZGRlZCB0byB0aGUgYmFzZSBuYW1lLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoaWQ6IG51bWJlciwgdGV4dDogc3RyaW5nKSB7XHJcblxyXG4gICAgICAgIHN1cGVyKHRleHQpO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvci5lcnJvck5hbWUgKyBpZDtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBUeXBlZ3VhcmQgdG8gY2hlY2sgaWYgYW4gRXJyb3IgaXMgYSBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IuXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtFcnJvcn0gZXJyXHJcbiAgICAgKiBAcmV0dXJucyB7ZXJyIGlzIFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvcn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBpc1RyYWNlRGF0YUNvbnZlcnNpb25FcnJvcihlcnI6IGFueSkgOiBlcnIgaXMgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9ye1xyXG5cclxuICAgICAgICBsZXQgaXNGb3VuZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IgJiYgZXJyLm5hbWUuc2VhcmNoKFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvci5lcnJvck5hbWUpID49IDApIHtcclxuXHJcbiAgICAgICAgICAgIGlzRm91bmQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXNGb3VuZDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCdWlsZHMgYSBUcmFjZURhdGEgQ29udmVyc2lvbiBFcnJvciBiYXNlZCBvbiB0aGUgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yVHlwZVxyXG4gICAgICogQXBwZW5kcyBhZGRpdGlvbmFsSW5mbyB0byB0aGUgYmFzZSBlcnJvciB0ZXh0XHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtUcmFjZURhdGFDb252ZXJzaW9uRXJyb3JUeXBlc30gZXJyb3JUeXBlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2FkZGl0aW9uYWxJbmZvXVxyXG4gICAgICogQHJldHVybnMge1RyYWNlRGF0YUNvbnZlcnNpb25FcnJvcn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBidWlsZChlcnJvclR5cGU6IFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvclR5cGVzLCBhZGRpdGlvbmFsSW5mbz86IHN0cmluZyk6IFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvciB7XHJcblxyXG4gICAgICAgIGxldCB0ZXh0OiBzdHJpbmcgPSB0aGlzLmdldEVycm9yVGV4dChlcnJvclR5cGUpO1xyXG5cclxuICAgICAgICB0ZXh0ICs9IGFkZGl0aW9uYWxJbmZvID8gKFwiOiBcIiArIGFkZGl0aW9uYWxJbmZvKSA6IFwiLlwiO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvcihlcnJvclR5cGUsIHRleHQpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUHJvdmlkZXMgdGhlIGJhc2UgZXJyb3IgdGV4dCBmb3IgYW4gVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yVHlwZSBvciBJRC5cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge1RyYWNlRGF0YUNvbnZlcnNpb25FcnJvclR5cGVzfSBlcnJvclR5cGVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0RXJyb3JUZXh0KGVycm9yVHlwZTogVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yVHlwZXMpOiBzdHJpbmcge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCB0ZXh0OiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHN3aXRjaCAoZXJyb3JUeXBlKSB7XHJcblxyXG4gICAgICAgICAgICBjYXNlIFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvclR5cGVzLldST05HX0ZPUk1BVDpcclxuICAgICAgICAgICAgICAgIHRleHQgPSBcIlRoaXMgZm9ybWF0IGlzIG5vdCBzdXBwb3J0ZWRcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvclR5cGVzLk5PX0RBVEE6XHJcbiAgICAgICAgICAgICAgICB0ZXh0ID0gXCJUaGVyZSBpcyBubyBkYXRhIHRvIGJlIGNvbnZlcnRlZFwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3JUeXBlcy5GT1JNQVRfVklPTEFUSU9OOlxyXG4gICAgICAgICAgICAgICAgdGV4dCA9IFwiVGhlIGZvcm1hdCBpcyBpbnZhbGlkXCJcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGNhc2UgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yVHlwZXMuTk9fQ09MU0VQOlxyXG4gICAgICAgICAgICAgICAgdGV4dCA9IFwiVGhlIGNvbHVtbiBzZXBlcmF0b3IgY2FuIG5vdCBiZSBkZXRlcm1pbmVkXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3JUeXBlcy5OT19DT01TRVA6XHJcbiAgICAgICAgICAgICAgICB0ZXh0ID0gXCJUaGUgY29tbWEgc2VwZXJhdG9yIGNhbiBub3QgYmUgZGV0ZXJtaW5lZFwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yVHlwZXMuVU5LTk9XTl9DT0xTRVA6XHJcbiAgICAgICAgICAgICAgICB0ZXh0ID0gXCJUaGUgY29sdW1uIHNlcGVyYXRvciBpcyB1bmtub3duXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3JUeXBlcy5VTktOT1dOX0NPTVNFUDpcclxuICAgICAgICAgICAgICAgIHRleHQgPSBcIlRoZSBjb21tYSBzZXBlcmF0b3IgaXMgdW5rbm93blwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yVHlwZXMuTUlTU0lOR19BVFRSSUJVVEU6XHJcbiAgICAgICAgICAgICAgICB0ZXh0ID0gXCJBbiBhdHRyaWJ1dGUgZG9lcyBub3QgZXhpc3RcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvclR5cGVzLlVOS05PV05fRk9STUFUOlxyXG4gICAgICAgICAgICAgICAgdGV4dCA9IFwiVGhlIGZvcm1hdCBjYW4gbm90IGJlIGRldGVybWluZWRcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvclR5cGVzLldST05HX0ZJTEVUWVBFOlxyXG4gICAgICAgICAgICAgICAgdGV4dCA9IFwiVGhpcyBmaWxldHlwZSBpcyBub3Qgc3VwcG9ydGVkXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3JUeXBlcy5JTlRFUk5BTDpcclxuICAgICAgICAgICAgICAgIHRleHQgPSBcIkludGVybmFsIGVycm9yXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3JUeXBlcy5JTlZBTElEX1JFQ09SRElORzpcclxuICAgICAgICAgICAgICAgIHRleHQgPSBcIlRoZSByZWNvcmRpbmcgY29udGFpbnMgc2lnbmFscyB3aXRoIGludmFsaWQgbnVtYmVyc1wiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7ICAgIFxyXG4gICAgICAgICAgICBjYXNlIFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvclR5cGVzLlRJTUVfTk9UX1NUUklDVExZX01PTk9UT05JQ0FMTFlfSU5DUkVBU0lORzpcclxuICAgICAgICAgICAgICAgIHRleHQgPSBcIlRoZSB0aW1lc3RhbXBzIGFyZSBub3Qgc3RyaWN0bHkgbW9ub3RvbmljYWxseSBpbmNyZWFzaW5nXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRleHQgPSBcIlVua25vd24gcmVhc29uXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0ZXh0O1xyXG4gICAgfSAgXHJcbiAgICBcclxufSBleHBvcnQgeyBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IgfSJdfQ==