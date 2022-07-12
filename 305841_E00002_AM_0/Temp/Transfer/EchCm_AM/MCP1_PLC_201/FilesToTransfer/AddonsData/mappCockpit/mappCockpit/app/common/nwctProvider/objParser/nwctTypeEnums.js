define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * the type of a data entry
     * this information is used to find out if a request or response should be available
     *
     * @export
     * @enum {number}
     */
    var NwctDatagramType;
    (function (NwctDatagramType) {
        NwctDatagramType[NwctDatagramType["BREADCAST_COMMAND"] = 1] = "BREADCAST_COMMAND";
        NwctDatagramType[NwctDatagramType["WRITE_REQUEST"] = 2] = "WRITE_REQUEST";
        NwctDatagramType[NwctDatagramType["WRITE_RESPONSE"] = 3] = "WRITE_RESPONSE";
        NwctDatagramType[NwctDatagramType["READ_REQUEST"] = 4] = "READ_REQUEST";
        NwctDatagramType[NwctDatagramType["READ_RESPONSE"] = 5] = "READ_RESPONSE";
        NwctDatagramType[NwctDatagramType["STATUS"] = 6] = "STATUS";
        NwctDatagramType[NwctDatagramType["INFORMATION"] = 7] = "INFORMATION";
    })(NwctDatagramType = exports.NwctDatagramType || (exports.NwctDatagramType = {}));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibndjdFR5cGVFbnVtcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL253Y3RQcm92aWRlci9vYmpQYXJzZXIvbndjdFR5cGVFbnVtcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFDQTs7Ozs7O09BTUc7SUFDSCxJQUFZLGdCQVFYO0lBUkQsV0FBWSxnQkFBZ0I7UUFDeEIsaUZBQXFCLENBQUE7UUFDckIseUVBQWlCLENBQUE7UUFDakIsMkVBQWtCLENBQUE7UUFDbEIsdUVBQWdCLENBQUE7UUFDaEIseUVBQWlCLENBQUE7UUFDakIsMkRBQVUsQ0FBQTtRQUNWLHFFQUFlLENBQUE7SUFDbkIsQ0FBQyxFQVJXLGdCQUFnQixHQUFoQix3QkFBZ0IsS0FBaEIsd0JBQWdCLFFBUTNCIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8qKlxyXG4gKiB0aGUgdHlwZSBvZiBhIGRhdGEgZW50cnlcclxuICogdGhpcyBpbmZvcm1hdGlvbiBpcyB1c2VkIHRvIGZpbmQgb3V0IGlmIGEgcmVxdWVzdCBvciByZXNwb25zZSBzaG91bGQgYmUgYXZhaWxhYmxlXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGVudW0ge251bWJlcn1cclxuICovXHJcbmV4cG9ydCBlbnVtIE53Y3REYXRhZ3JhbVR5cGV7XHJcbiAgICBCUkVBRENBU1RfQ09NTUFORCA9IDEsXHJcbiAgICBXUklURV9SRVFVRVNUID0gMixcclxuICAgIFdSSVRFX1JFU1BPTlNFID0gMyxcclxuICAgIFJFQURfUkVRVUVTVCA9IDQsXHJcbiAgICBSRUFEX1JFU1BPTlNFID0gNSxcclxuICAgIFNUQVRVUyA9IDYsXHJcbiAgICBJTkZPUk1BVElPTiA9IDdcclxufSJdfQ==