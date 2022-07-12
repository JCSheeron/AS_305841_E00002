define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * This enum holds all possible types of errors that can occur in the traceDataConversion.
     *
     * @enum {number}
     */
    var TraceDataConversionErrorTypes;
    (function (TraceDataConversionErrorTypes) {
        TraceDataConversionErrorTypes[TraceDataConversionErrorTypes["WRONG_FORMAT"] = 0] = "WRONG_FORMAT";
        TraceDataConversionErrorTypes[TraceDataConversionErrorTypes["NO_DATA"] = 1] = "NO_DATA";
        TraceDataConversionErrorTypes[TraceDataConversionErrorTypes["FORMAT_VIOLATION"] = 2] = "FORMAT_VIOLATION";
        TraceDataConversionErrorTypes[TraceDataConversionErrorTypes["NO_COLSEP"] = 3] = "NO_COLSEP";
        TraceDataConversionErrorTypes[TraceDataConversionErrorTypes["NO_COMSEP"] = 4] = "NO_COMSEP";
        TraceDataConversionErrorTypes[TraceDataConversionErrorTypes["UNKNOWN_COLSEP"] = 5] = "UNKNOWN_COLSEP";
        TraceDataConversionErrorTypes[TraceDataConversionErrorTypes["UNKNOWN_COMSEP"] = 6] = "UNKNOWN_COMSEP";
        TraceDataConversionErrorTypes[TraceDataConversionErrorTypes["MISSING_ATTRIBUTE"] = 7] = "MISSING_ATTRIBUTE";
        TraceDataConversionErrorTypes[TraceDataConversionErrorTypes["UNKNOWN_FORMAT"] = 8] = "UNKNOWN_FORMAT";
        TraceDataConversionErrorTypes[TraceDataConversionErrorTypes["WRONG_FILETYPE"] = 9] = "WRONG_FILETYPE";
        TraceDataConversionErrorTypes[TraceDataConversionErrorTypes["INVALID_RECORDING"] = 10] = "INVALID_RECORDING";
        TraceDataConversionErrorTypes[TraceDataConversionErrorTypes["TIME_NOT_STRICTLY_MONOTONICALLY_INCREASING"] = 11] = "TIME_NOT_STRICTLY_MONOTONICALLY_INCREASING";
        TraceDataConversionErrorTypes[TraceDataConversionErrorTypes["INTERNAL"] = 999] = "INTERNAL";
    })(TraceDataConversionErrorTypes || (TraceDataConversionErrorTypes = {}));
    exports.TraceDataConversionErrorTypes = TraceDataConversionErrorTypes;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VEYXRhQ29udmVyc2lvbkVycm9yVHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi90cmFjZURhdGFDb252ZXJzaW9uL2VudW1zL3RyYWNlRGF0YUNvbnZlcnNpb25FcnJvclR5cGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUNBOzs7O09BSUc7SUFDSCxJQUFLLDZCQWNKO0lBZEQsV0FBSyw2QkFBNkI7UUFDOUIsaUdBQVksQ0FBQTtRQUNaLHVGQUFPLENBQUE7UUFDUCx5R0FBZ0IsQ0FBQTtRQUNoQiwyRkFBUyxDQUFBO1FBQ1QsMkZBQVMsQ0FBQTtRQUNULHFHQUFjLENBQUE7UUFDZCxxR0FBYyxDQUFBO1FBQ2QsMkdBQWlCLENBQUE7UUFDakIscUdBQWMsQ0FBQTtRQUNkLHFHQUFjLENBQUE7UUFDZCw0R0FBaUIsQ0FBQTtRQUNqQiw4SkFBMEMsQ0FBQTtRQUMxQywyRkFBYyxDQUFBO0lBQ2xCLENBQUMsRUFkSSw2QkFBNkIsS0FBN0IsNkJBQTZCLFFBY2pDO0lBQVUsc0VBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8qKlxyXG4gKiBUaGlzIGVudW0gaG9sZHMgYWxsIHBvc3NpYmxlIHR5cGVzIG9mIGVycm9ycyB0aGF0IGNhbiBvY2N1ciBpbiB0aGUgdHJhY2VEYXRhQ29udmVyc2lvbi5cclxuICpcclxuICogQGVudW0ge251bWJlcn1cclxuICovXHJcbmVudW0gVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yVHlwZXMge1xyXG4gICAgV1JPTkdfRk9STUFULFxyXG4gICAgTk9fREFUQSxcclxuICAgIEZPUk1BVF9WSU9MQVRJT04sXHJcbiAgICBOT19DT0xTRVAsXHJcbiAgICBOT19DT01TRVAsXHJcbiAgICBVTktOT1dOX0NPTFNFUCxcclxuICAgIFVOS05PV05fQ09NU0VQLFxyXG4gICAgTUlTU0lOR19BVFRSSUJVVEUsXHJcbiAgICBVTktOT1dOX0ZPUk1BVCxcclxuICAgIFdST05HX0ZJTEVUWVBFLFxyXG4gICAgSU5WQUxJRF9SRUNPUkRJTkcsXHJcbiAgICBUSU1FX05PVF9TVFJJQ1RMWV9NT05PVE9OSUNBTExZX0lOQ1JFQVNJTkcsXHJcbiAgICBJTlRFUk5BTCA9IDk5OVxyXG59IGV4cG9ydCB7IFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvclR5cGVzIH0iXX0=