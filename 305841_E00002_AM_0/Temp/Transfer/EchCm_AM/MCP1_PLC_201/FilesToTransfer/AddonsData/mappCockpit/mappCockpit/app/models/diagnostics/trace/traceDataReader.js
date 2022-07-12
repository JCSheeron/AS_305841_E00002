var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "../../../communication/rest/opcUaRestServices"], function (require, exports, opcUaRestServices_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TRACE_READ_CHUNK_SIZE = 1000;
    ;
    var TraceDataChunk = /** @class */ (function () {
        function TraceDataChunk(traceData) {
            if (traceData === void 0) { traceData = undefined; }
            this._timeValues = [];
            this._dataValues = [];
            if (traceData) {
                this._timeValues = traceData.TimeValues;
                this._dataValues = traceData.DataValues;
            }
        }
        Object.defineProperty(TraceDataChunk.prototype, "TimeValues", {
            get: function () {
                return this._timeValues;
            },
            set: function (timeValues) {
                this._timeValues = timeValues;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TraceDataChunk.prototype, "DataValues", {
            get: function () {
                return this._dataValues;
            },
            set: function (dataValues) {
                this._dataValues = dataValues;
            },
            enumerable: true,
            configurable: true
        });
        return TraceDataChunk;
    }());
    /**
     * Implements the trace request header
     *
     * @class TraceReadRequestHader
     * @implements {TRACE_READ_REQUEST_HEADER}
     */
    var TraceReadRequestHeader = /** @class */ (function () {
        function TraceReadRequestHeader(dataPointName, aboveTimeStamp, maxReadCount) {
            if (aboveTimeStamp === void 0) { aboveTimeStamp = 0; }
            if (maxReadCount === void 0) { maxReadCount = TRACE_READ_CHUNK_SIZE; }
            this._dataPointName = dataPointName;
            this._aboveTimeStamp = aboveTimeStamp;
            this._maxReadCount = maxReadCount;
        }
        Object.defineProperty(TraceReadRequestHeader.prototype, "DataPointName", {
            get: function () {
                return this._dataPointName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TraceReadRequestHeader.prototype, "MaxReadCount", {
            get: function () {
                return this._maxReadCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TraceReadRequestHeader.prototype, "AboveTimestamp", {
            get: function () {
                return this._aboveTimeStamp;
            },
            set: function (aboveTimeStamp) {
                this._aboveTimeStamp = aboveTimeStamp;
            },
            enumerable: true,
            configurable: true
        });
        return TraceReadRequestHeader;
    }());
    ;
    /**
     * Implements trace access services
     *
     * @class MappCockpitTraceDataReader
     */
    var MappCockpitTraceDataReader = /** @class */ (function () {
        function MappCockpitTraceDataReader(diagnosticProvider) {
            this._diagnosticProvider = diagnosticProvider;
            this._traceData = new TraceData();
        }
        Object.defineProperty(MappCockpitTraceDataReader.prototype, "traceDataProviderId", {
            /**
             * Specifies the trace reader node id
             *
             * @readonly
             * @private
             * @type {string}
             * @memberof MappCockpitTraceDataReader
             */
            get: function () {
                return this._diagnosticProvider.namespace + ";" + opcUaRestServices_1.OpcUaRestServices.mappCockpitTraceDataProviderId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitTraceDataReader.prototype, "traceDataReadMethodId", {
            /**
             * Specifies the trace data read method id
             *
             * @readonly
             * @private
             * @type {string}
             * @memberof MappCockpitTraceDataReader
             */
            get: function () {
                return this._diagnosticProvider.namespace + ";" + opcUaRestServices_1.OpcUaRestServices.mappCockpitTraceReadDataMethodId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitTraceDataReader.prototype, "traceData", {
            /**
             * Returns available trace data
             *
             * @readonly
             * @type {TraceData}
             * @memberof MappCockpitTraceDataReader
             */
            get: function () {
                return this._traceData;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Reads/downloads trace data from the target
         *
         * @param {MappCockpitComponentDataModel} mappCockpitComponentDataModel
         * @returns {Promise<TraceData>}
         * @memberof MappCockpitTraceDataReader
         */
        MappCockpitTraceDataReader.prototype.requestLoadTraceDataFromTarget = function () {
            return __awaiter(this, void 0, void 0, function () {
                var traceDataPoints, _a, i, tracePointName, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            // clear existing treca data
                            this._traceData.clear();
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 8, , 9]);
                            return [4 /*yield*/, this.requestReadTraceDataPointsFromTarget()];
                        case 2:
                            traceDataPoints = _b.sent();
                            // read and update the trigger time
                            _a = this._traceData;
                            return [4 /*yield*/, this.requestReadTraceTriggerTimeFromTarget()];
                        case 3:
                            // read and update the trigger time
                            _a.triggerTime = _b.sent();
                            i = 0;
                            _b.label = 4;
                        case 4:
                            if (!(i < traceDataPoints.length)) return [3 /*break*/, 7];
                            tracePointName = traceDataPoints[i];
                            return [4 /*yield*/, this.readTraceChannelData(tracePointName)];
                        case 5:
                            _b.sent();
                            _b.label = 6;
                        case 6:
                            i++;
                            return [3 /*break*/, 4];
                        case 7: return [3 /*break*/, 9];
                        case 8:
                            error_1 = _b.sent();
                            console.error(error_1);
                            return [3 /*break*/, 9];
                        case 9: return [2 /*return*/, this._traceData];
                    }
                });
            });
        };
        /**
         * Reads the trace data for the specified data point
         *
         * @private
         * @param {string} dataPointName
         * @memberof MappCockpitTraceDataReader
         */
        MappCockpitTraceDataReader.prototype.readTraceChannelData = function (dataPointName) {
            return __awaiter(this, void 0, void 0, function () {
                var traceReadRequestInfo, traceChannelData, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            traceReadRequestInfo = new TraceReadRequestHeader(dataPointName);
                            traceChannelData = new TraceDataChunk();
                            // read trace data
                            return [4 /*yield*/, this.readTraceDataChunk(traceReadRequestInfo, traceChannelData)];
                        case 1:
                            // read trace data
                            _a.sent();
                            // if data available add it to the trace data                
                            if (traceChannelData) {
                                // Add the trace channel data to the trace data
                                this.addTraceChannel(traceReadRequestInfo.DataPointName, traceChannelData);
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            error_2 = _a.sent();
                            console.error(error_2);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Reads a trace data chunk.
         *
         * @private
         * @param {{ DataPointName: string; MaxReadCount: number; AboveTimestamp: number; }} readTraceDataRequestInfo
         * @param {Rest.InterfaceTraceData} traceChannelData
         * @returns
         * @memberof MappCockpitTraceDataReader
         */
        MappCockpitTraceDataReader.prototype.readTraceDataChunk = function (readTraceDataRequestInfo, traceChannelData) {
            return __awaiter(this, void 0, void 0, function () {
                var traceChannelDataChunk, traceReadRequestHeader, _a, error_3;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            traceChannelDataChunk = new TraceDataChunk();
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 6, , 7]);
                            _b.label = 2;
                        case 2:
                            traceReadRequestHeader = { DataPointName: readTraceDataRequestInfo.DataPointName, AboveTimestamp: readTraceDataRequestInfo.AboveTimestamp, MaxReadCount: readTraceDataRequestInfo.MaxReadCount };
                            _a = TraceDataChunk.bind;
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.executeMethod(this._diagnosticProvider.sessionId, this.traceDataProviderId, this.traceDataReadMethodId, traceReadRequestHeader)];
                        case 3:
                            // read a trace data chunk
                            traceChannelDataChunk = new (_a.apply(TraceDataChunk, [void 0, (_b.sent()).args]))();
                            // if the trace data chunk is valid, we append it to the channel data
                            if (traceChannelDataChunk && traceChannelDataChunk.TimeValues.length > 0) {
                                this.appendTraceDataChunk(traceChannelData, traceChannelDataChunk);
                            }
                            // adjust the the time stamp to the next chunk based on the last time point of the current chunk.
                            readTraceDataRequestInfo.AboveTimestamp = traceChannelDataChunk.TimeValues[traceChannelDataChunk.TimeValues.length - 1];
                            _b.label = 4;
                        case 4:
                            if (this.nextTraceDataChunkAvailable(traceChannelDataChunk, readTraceDataRequestInfo.MaxReadCount)) return [3 /*break*/, 2];
                            _b.label = 5;
                        case 5: return [3 /*break*/, 7];
                        case 6:
                            error_3 = _b.sent();
                            console.error(error_3);
                            return [3 /*break*/, 7];
                        case 7: return [2 /*return*/, traceChannelDataChunk];
                    }
                });
            });
        };
        /**
         * Checks if more trace data is possibly available
         *
         * @private
         * @param {Rest.InterfaceTraceData} traceChannelData
         * @param {number} chunkSize
         * @returns
         * @memberof MappCockpitTraceDataReader
         */
        MappCockpitTraceDataReader.prototype.nextTraceDataChunkAvailable = function (traceChannelData, chunkSize) {
            return traceChannelData && traceChannelData.TimeValues.length === chunkSize;
        };
        /**
         * Appends a trace data block to the existing trace data channel
         *
         * @private
         * @param {Rest.InterfaceTraceData} traceChannelData
         * @param {Rest.InterfaceTraceData} nextTraceChannelDataBlock
         * @memberof MappCockpitTraceDataReader
         */
        MappCockpitTraceDataReader.prototype.appendTraceDataChunk = function (traceChannelData, nextTraceChannelDataBlock) {
            nextTraceChannelDataBlock.DataValues.forEach(function (traceValue) { traceChannelData.DataValues.push(traceValue); });
            nextTraceChannelDataBlock.TimeValues.forEach(function (traceTimeStamp) { traceChannelData.TimeValues.push(traceTimeStamp); });
        };
        /**
         * Creates initializes and adds a new trace channel to the trace data
         *
         * @private
         * @param {string} tracePointName
         * @param {Rest.InterfaceTraceData} traceData
         * @memberof MappCockpitTraceDataReader
         */
        MappCockpitTraceDataReader.prototype.addTraceChannel = function (tracePointName, traceData) {
            var tracePoints = new Array();
            for (var i = 0; i < traceData.DataValues.length; i++) {
                var dataValue = traceData.DataValues[i];
                var timestamp = traceData.TimeValues[i];
                tracePoints.push(new TracePoint(dataValue, timestamp));
            }
            this._traceData.addTraceChannel(tracePointName, tracePoints);
        };
        /**
         * Reads available trace data points.
         *
         * @returns {Promise<Array<string>>}
         * @memberof MappCockpitTraceDataReader
         */
        MappCockpitTraceDataReader.prototype.requestReadTraceDataPointsFromTarget = function () {
            return __awaiter(this, void 0, void 0, function () {
                var traceDataPointBaseName, traceDataPointNames, readDataPointNameRequests, i, availableTracePointNames, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            traceDataPointBaseName = this._diagnosticProvider.namespace + ";" + opcUaRestServices_1.OpcUaRestServices.mappCockpitTraceDataPointNameId;
                            traceDataPointNames = new Array();
                            readDataPointNameRequests = [];
                            for (i = 1; i <= opcUaRestServices_1.OpcUaRestServices.mappCockpitTraceDataPointCount; i++) {
                                readDataPointNameRequests.push(opcUaRestServices_1.OpcUaRestServices.readNodeAttribute(this._diagnosticProvider.sessionId, traceDataPointBaseName + i));
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, Promise.all(readDataPointNameRequests)];
                        case 2:
                            availableTracePointNames = _a.sent();
                            // filter valid trace point names
                            traceDataPointNames = availableTracePointNames.filter(function (tracePointName) { return tracePointName; });
                            return [3 /*break*/, 4];
                        case 3:
                            error_4 = _a.sent();
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/, traceDataPointNames];
                    }
                });
            });
        };
        /**
         * Reads the trace trigger time
         *
         * @private
         * @returns {Promise<Array<any>>}
         * @memberof MappCockpitTraceDataReader
         */
        MappCockpitTraceDataReader.prototype.requestReadTraceTriggerTimeFromTarget = function () {
            return __awaiter(this, void 0, void 0, function () {
                var traceTriggerTimeId, triggerTime;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            traceTriggerTimeId = this._diagnosticProvider.namespace + ";" + opcUaRestServices_1.OpcUaRestServices.mappCockpitTraceTriggerTime;
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.readNodeAttribute(this._diagnosticProvider.sessionId, traceTriggerTimeId)];
                        case 1:
                            triggerTime = _a.sent();
                            return [2 /*return*/, triggerTime];
                    }
                });
            });
        };
        return MappCockpitTraceDataReader;
    }());
    exports.MappCockpitTraceDataReader = MappCockpitTraceDataReader;
    /**
     * Implements a single trace point
     *
     * @class TracePoint
     */
    var TracePoint = /** @class */ (function () {
        function TracePoint(dataValue, timeValue) {
            this.dataValue = dataValue;
            this.timeStamp = timeValue;
        }
        return TracePoint;
    }());
    exports.TracePoint = TracePoint;
    /**
     * Implements a trace data channel
     *
     * @class TraceDataChannel
     */
    var TraceDataChannel = /** @class */ (function () {
        function TraceDataChannel(name, tracePoints) {
            this._name = name;
            this._tracePoints = tracePoints;
        }
        Object.defineProperty(TraceDataChannel.prototype, "name", {
            /**
             * The name of the trace channel
             *
             * @readonly
             * @type {string}
             * @memberof TraceDataChannel
             */
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TraceDataChannel.prototype, "tracePoints", {
            /**
             * The trace points of the trace channel
             *
             * @readonly
             * @type {Array<TracePoint>}
             * @memberof TraceDataChannel
             */
            get: function () {
                return this._tracePoints;
            },
            enumerable: true,
            configurable: true
        });
        return TraceDataChannel;
    }());
    exports.TraceDataChannel = TraceDataChannel;
    /**
     * Implements a class for downloading and providing trace data
     *
     * @class TraceData
     */
    var TraceData = /** @class */ (function () {
        function TraceData() {
            // Holds trace data channels
            this._traceChannels = [];
            this._triggerTime = 0;
            this._traceChannels = [];
        }
        TraceData.prototype.addTraceChannel = function (tracePointName, tracePoints) {
            var newTraceChannel = new TraceDataChannel(tracePointName, tracePoints);
            this._traceChannels.push(newTraceChannel);
        };
        Object.defineProperty(TraceData.prototype, "traceChannels", {
            /**
             * Returns the trace channels
             *
             * @readonly
             * @type {Array<TraceDataChannel>}
             * @memberof TraceData
             */
            get: function () {
                return this._traceChannels;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TraceData.prototype, "triggerTime", {
            get: function () {
                return this._triggerTime;
            },
            set: function (value) {
                this._triggerTime = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Clears existing trace data
         *
         * @returns {*}
         * @memberof TraceData
         */
        TraceData.prototype.clear = function () {
            this._traceChannels = [];
        };
        return TraceData;
    }());
    exports.TraceData = TraceData;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VEYXRhUmVhZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvdHJhY2VEYXRhUmVhZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUlBLElBQU0scUJBQXFCLEdBQUcsSUFBSSxDQUFDO0lBT2xDLENBQUM7SUFFRjtRQUlJLHdCQUFZLFNBQXVEO1lBQXZELDBCQUFBLEVBQUEscUJBQXVEO1lBSDNELGdCQUFXLEdBQU8sRUFBRSxDQUFDO1lBQ3JCLGdCQUFXLEdBQU8sRUFBRSxDQUFDO1lBR3pCLElBQUksU0FBUyxFQUFFO2dCQUNYLElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQztnQkFDeEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFBO2FBQzFDO1FBQ0wsQ0FBQztRQUVELHNCQUFXLHNDQUFVO2lCQUFyQjtnQkFDSSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDNUIsQ0FBQztpQkFFRCxVQUFzQixVQUFVO2dCQUM1QixJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztZQUNsQyxDQUFDOzs7V0FKQTtRQU1ELHNCQUFXLHNDQUFVO2lCQUFyQjtnQkFDSSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDNUIsQ0FBQztpQkFFRCxVQUFzQixVQUFVO2dCQUM1QixJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztZQUNsQyxDQUFDOzs7V0FKQTtRQVFMLHFCQUFDO0lBQUQsQ0FBQyxBQTdCRCxJQTZCQztJQUVEOzs7OztPQUtHO0lBQ0g7UUFNSSxnQ0FBWSxhQUFhLEVBQUMsY0FBa0IsRUFBQyxZQUFvQztZQUF2RCwrQkFBQSxFQUFBLGtCQUFrQjtZQUFDLDZCQUFBLEVBQUEsb0NBQW9DO1lBQzdFLElBQUks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LENBQUM7WUFDeEUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDOUMsQ0FBQztRQVNELHNCQUFXLG9DQUFhO1lBUHhCOzs7Ozs7ZUFNRztpQkFDSDtnQkFDSSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7WUFDL0IsQ0FBQzs7O1dBQUE7UUFHRCxzQkFBVyxrQ0FBVztpQkFLdEI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFBO1lBQzVCLENBQUM7aUJBUEQsVUFBdUIsS0FBWTtnQkFDL0IsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDOUIsQ0FBQzs7O1dBQUE7UUFVRDs7Ozs7V0FLRztRQUNILHlCQUFLLEdBQUw7WUFDSSxJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUM3QixDQUFDO1FBQ0wsZ0JBQUM7SUFBRCxDQUFDLEFBcERELElBb0RDO0lBR21DLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3BjVWFSZXN0U2VydmljZXMsIFJlc3QgfSBmcm9tICcuLi8uLi8uLi9jb21tdW5pY2F0aW9uL3Jlc3Qvb3BjVWFSZXN0U2VydmljZXMnO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlciB9IGZyb20gJy4uL21hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyJztcclxuXHJcblxyXG5jb25zdCBUUkFDRV9SRUFEX0NIVU5LX1NJWkUgPSAxMDAwO1xyXG5cclxuLy8gc3BlY2lmaWVzIHRoZSBkZXNjcmlwdG9yIGZvciB0cmFjZSBkYXRhIHJlYWQgcmVxdWVzdHNcclxuaW50ZXJmYWNlIElUcmFjZVJlYWRSZXF1ZXN0SGVhZGVyIHtcclxuICAgIERhdGFQb2ludE5hbWU6c3RyaW5nO1xyXG4gICAgTWF4UmVhZENvdW50OiBudW1iZXIsXHJcbiAgICBBYm92ZVRpbWVzdGFtcDogbnVtYmVyLFxyXG59O1xyXG5cclxuY2xhc3MgVHJhY2VEYXRhQ2h1bmsgaW1wbGVtZW50cyBSZXN0LkludGVyZmFjZVRyYWNlRGF0YXtcclxuICAgIHByaXZhdGUgX3RpbWVWYWx1ZXM6IFtdID0gW107XHJcbiAgICBwcml2YXRlIF9kYXRhVmFsdWVzOiBbXSA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRyYWNlRGF0YTpSZXN0LkludGVyZmFjZVRyYWNlRGF0YXx1bmRlZmluZWQgPSB1bmRlZmluZWQpe1xyXG4gICAgICAgIGlmICh0cmFjZURhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGltZVZhbHVlcyA9IHRyYWNlRGF0YS5UaW1lVmFsdWVzO1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhVmFsdWVzID0gdHJhY2VEYXRhLkRhdGFWYWx1ZXMgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXQgVGltZVZhbHVlcygpIDogW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90aW1lVmFsdWVzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgVGltZVZhbHVlcyh0aW1lVmFsdWVzKSB7XHJcbiAgICAgICAgdGhpcy5fdGltZVZhbHVlcyA9IHRpbWVWYWx1ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBEYXRhVmFsdWVzKCkgOiBbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFWYWx1ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBEYXRhVmFsdWVzKGRhdGFWYWx1ZXMpIHtcclxuICAgICAgICB0aGlzLl9kYXRhVmFsdWVzID0gZGF0YVZhbHVlcztcclxuICAgIH1cclxuICAgIFxyXG5cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRzIHRoZSB0cmFjZSByZXF1ZXN0IGhlYWRlclxyXG4gKlxyXG4gKiBAY2xhc3MgVHJhY2VSZWFkUmVxdWVzdEhhZGVyXHJcbiAqIEBpbXBsZW1lbnRzIHtUUkFDRV9SRUFEX1JFUVVFU1RfSEVBREVSfVxyXG4gKi9cclxuY2xhc3MgVHJhY2VSZWFkUmVxdWVzdEhlYWRlciBpbXBsZW1lbnRzIElUcmFjZVJlYWRSZXF1ZXN0SGVhZGVyIHtcclxuXHJcbiAgICBwcml2YXRlIF9tYXhSZWFkQ291bnQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX2RhdGFQb2ludE5hbWU6IHN0cmluZztcclxuICAgIHByaXZhdGUgX2Fib3ZlVGltZVN0YW1wOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZGF0YVBvaW50TmFtZSxhYm92ZVRpbWVTdGFtcCA9IDAsbWF4UmVhZENvdW50ID0gVFJBQ0VfUkVBRF9DSFVOS19TSVpFKXtcclxuICAgICAgICB0aGlzLl9kYXRhUG9pbnROYW1lID0gZGF0YVBvaW50TmFtZTtcclxuICAgICAgICB0aGlzLl9hYm92ZVRpbWVTdGFtcCA9IGFib3ZlVGltZVN0YW1wO1xyXG4gICAgICAgIHRoaXMuX21heFJlYWRDb3VudCA9IG1heFJlYWRDb3VudDtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXQgRGF0YVBvaW50TmFtZSgpIDogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVBvaW50TmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IE1heFJlYWRDb3VudCgpIDogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWF4UmVhZENvdW50O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgQWJvdmVUaW1lc3RhbXAoKSA6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Fib3ZlVGltZVN0YW1wO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgQWJvdmVUaW1lc3RhbXAoYWJvdmVUaW1lU3RhbXA6bnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fYWJvdmVUaW1lU3RhbXAgPSBhYm92ZVRpbWVTdGFtcDtcclxuICAgIH1cclxufTtcclxuXHJcblxyXG4vKipcclxuICogSW1wbGVtZW50cyB0cmFjZSBhY2Nlc3Mgc2VydmljZXNcclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0VHJhY2VEYXRhUmVhZGVyXHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdFRyYWNlRGF0YVJlYWRlciB7XHJcbiAgIFxyXG4gICAgLy8gUmVmZXJlbmNlcyB0aGUgZGlhZ25vc3RpYyBwcm92aWRlclxyXG4gICAgcHJpdmF0ZSBfZGlhZ25vc3RpY1Byb3ZpZGVyOiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlcjtcclxuICAgIC8vIEhvbGRzIHRoZSBhdmFpbGFibGUgdHJhY2UgZGF0YVxyXG4gICAgcHJpdmF0ZSBfdHJhY2VEYXRhOiBUcmFjZURhdGE7XHJcbiAgXHJcbiAgICBjb25zdHJ1Y3RvcihkaWFnbm9zdGljUHJvdmlkZXI6IE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyKXtcclxuICAgICAgICB0aGlzLl9kaWFnbm9zdGljUHJvdmlkZXIgPSBkaWFnbm9zdGljUHJvdmlkZXI7XHJcbiAgICAgICAgdGhpcy5fdHJhY2VEYXRhID0gbmV3IFRyYWNlRGF0YSgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNwZWNpZmllcyB0aGUgdHJhY2UgcmVhZGVyIG5vZGUgaWRcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0VHJhY2VEYXRhUmVhZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0IHRyYWNlRGF0YVByb3ZpZGVySWQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGlhZ25vc3RpY1Byb3ZpZGVyLm5hbWVzcGFjZSArIFwiO1wiICsgT3BjVWFSZXN0U2VydmljZXMubWFwcENvY2twaXRUcmFjZURhdGFQcm92aWRlcklkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3BlY2lmaWVzIHRoZSB0cmFjZSBkYXRhIHJlYWQgbWV0aG9kIGlkXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFRyYWNlRGF0YVJlYWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldCB0cmFjZURhdGFSZWFkTWV0aG9kSWQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGlhZ25vc3RpY1Byb3ZpZGVyLm5hbWVzcGFjZSArIFwiO1wiICsgT3BjVWFSZXN0U2VydmljZXMubWFwcENvY2twaXRUcmFjZVJlYWREYXRhTWV0aG9kSWQ7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhdmFpbGFibGUgdHJhY2UgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge1RyYWNlRGF0YX1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFRyYWNlRGF0YVJlYWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHRyYWNlRGF0YSgpOiBUcmFjZURhdGEge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90cmFjZURhdGE7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMvZG93bmxvYWRzIHRyYWNlIGRhdGEgZnJvbSB0aGUgdGFyZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbH0gbWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFRyYWNlRGF0YT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRUcmFjZURhdGFSZWFkZXJcclxuICAgICAqL1xyXG4gICAgYXN5bmMgcmVxdWVzdExvYWRUcmFjZURhdGFGcm9tVGFyZ2V0KCk6IFByb21pc2U8VHJhY2VEYXRhPiB7XHJcblxyXG4gICAgICAgIC8vIGNsZWFyIGV4aXN0aW5nIHRyZWNhIGRhdGFcclxuICAgICAgICB0aGlzLl90cmFjZURhdGEuY2xlYXIoKTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuXHJcbiAgICAgICAgICAgIC8vIGdldCBhdmFpbGFibGUgdHJhY2UgcG9pbnRzXHJcbiAgICAgICAgICAgIHZhciB0cmFjZURhdGFQb2ludHMgPSBhd2FpdCB0aGlzLnJlcXVlc3RSZWFkVHJhY2VEYXRhUG9pbnRzRnJvbVRhcmdldCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gcmVhZCBhbmQgdXBkYXRlIHRoZSB0cmlnZ2VyIHRpbWVcclxuICAgICAgICAgICAgdGhpcy5fdHJhY2VEYXRhLnRyaWdnZXJUaW1lID0gYXdhaXQgdGhpcy5yZXF1ZXN0UmVhZFRyYWNlVHJpZ2dlclRpbWVGcm9tVGFyZ2V0KCk7XHJcblxyXG4gICAgICAgICAgICAvLyByZWFkIHRyYWNlIGRhdGEgaW4gb3JkZXIgb2YgdGhlIHRyYWNlIGRhdGEgcG9pbnQgbGlzdFxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyYWNlRGF0YVBvaW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHJhY2VQb2ludE5hbWUgPSB0cmFjZURhdGFQb2ludHNbaV07XHJcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnJlYWRUcmFjZUNoYW5uZWxEYXRhKHRyYWNlUG9pbnROYW1lKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl90cmFjZURhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyB0aGUgdHJhY2UgZGF0YSBmb3IgdGhlIHNwZWNpZmllZCBkYXRhIHBvaW50XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhUG9pbnROYW1lXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRUcmFjZURhdGFSZWFkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyByZWFkVHJhY2VDaGFubmVsRGF0YShkYXRhUG9pbnROYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICB0cnkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRyYWNlUmVhZFJlcXVlc3RJbmZvID0gbmV3IFRyYWNlUmVhZFJlcXVlc3RIZWFkZXIoZGF0YVBvaW50TmFtZSkgO1xyXG4gICAgICAgICAgICAvLyByZWFkIHRoZSB0cmFjZSBkYXRhIGZvciB0aGUgc3BlY2lmaWVkIHRyYWNlIHBvaW50XHJcbiAgICAgICAgICAgIGxldCB0cmFjZUNoYW5uZWxEYXRhOiBUcmFjZURhdGFDaHVuayA9IG5ldyBUcmFjZURhdGFDaHVuaygpO1xyXG5cclxuICAgICAgICAgICAgLy8gcmVhZCB0cmFjZSBkYXRhXHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucmVhZFRyYWNlRGF0YUNodW5rKHRyYWNlUmVhZFJlcXVlc3RJbmZvLCB0cmFjZUNoYW5uZWxEYXRhKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGlmIGRhdGEgYXZhaWxhYmxlIGFkZCBpdCB0byB0aGUgdHJhY2UgZGF0YSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHRyYWNlQ2hhbm5lbERhdGEpIHtcclxuICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUgdHJhY2UgY2hhbm5lbCBkYXRhIHRvIHRoZSB0cmFjZSBkYXRhXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFRyYWNlQ2hhbm5lbCh0cmFjZVJlYWRSZXF1ZXN0SW5mby5EYXRhUG9pbnROYW1lLCB0cmFjZUNoYW5uZWxEYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgYSB0cmFjZSBkYXRhIGNodW5rLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3sgRGF0YVBvaW50TmFtZTogc3RyaW5nOyBNYXhSZWFkQ291bnQ6IG51bWJlcjsgQWJvdmVUaW1lc3RhbXA6IG51bWJlcjsgfX0gcmVhZFRyYWNlRGF0YVJlcXVlc3RJbmZvXHJcbiAgICAgKiBAcGFyYW0ge1Jlc3QuSW50ZXJmYWNlVHJhY2VEYXRhfSB0cmFjZUNoYW5uZWxEYXRhXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0VHJhY2VEYXRhUmVhZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgcmVhZFRyYWNlRGF0YUNodW5rKHJlYWRUcmFjZURhdGFSZXF1ZXN0SW5mbzpUcmFjZVJlYWRSZXF1ZXN0SGVhZGVyLCB0cmFjZUNoYW5uZWxEYXRhOiBSZXN0LkludGVyZmFjZVRyYWNlRGF0YSkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCB0cmFjZUNoYW5uZWxEYXRhQ2h1bmsgPSBuZXcgVHJhY2VEYXRhQ2h1bmsoKTtcclxuICAgICAgICBcclxuICAgICAgICB0cnkge1xyXG5cclxuICAgICAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIG5ldyByZXF1ZXN0IGhlYWRlclxyXG4gICAgICAgICAgICAgICAgbGV0IHRyYWNlUmVhZFJlcXVlc3RIZWFkZXIgPSB7RGF0YVBvaW50TmFtZTogcmVhZFRyYWNlRGF0YVJlcXVlc3RJbmZvLkRhdGFQb2ludE5hbWUsIEFib3ZlVGltZXN0YW1wOiByZWFkVHJhY2VEYXRhUmVxdWVzdEluZm8uQWJvdmVUaW1lc3RhbXAsIE1heFJlYWRDb3VudDogcmVhZFRyYWNlRGF0YVJlcXVlc3RJbmZvLk1heFJlYWRDb3VudCB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIHJlYWQgYSB0cmFjZSBkYXRhIGNodW5rXHJcbiAgICAgICAgICAgICAgICB0cmFjZUNoYW5uZWxEYXRhQ2h1bmsgPSBuZXcgVHJhY2VEYXRhQ2h1bmsoKGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLmV4ZWN1dGVNZXRob2Q8UmVzdC5JbnRlcmZhY2VPcGNVYVJlc3RNZXRob2RSZWFkVHJhY2VEYXRhUmVzdWx0Pih0aGlzLl9kaWFnbm9zdGljUHJvdmlkZXIuc2Vzc2lvbklkLCB0aGlzLnRyYWNlRGF0YVByb3ZpZGVySWQsIHRoaXMudHJhY2VEYXRhUmVhZE1ldGhvZElkLCB0cmFjZVJlYWRSZXF1ZXN0SGVhZGVyKSkuYXJncyk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSB0cmFjZSBkYXRhIGNodW5rIGlzIHZhbGlkLCB3ZSBhcHBlbmQgaXQgdG8gdGhlIGNoYW5uZWwgZGF0YVxyXG4gICAgICAgICAgICAgICAgaWYgKHRyYWNlQ2hhbm5lbERhdGFDaHVuayAmJiB0cmFjZUNoYW5uZWxEYXRhQ2h1bmsuVGltZVZhbHVlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRUcmFjZURhdGFDaHVuayh0cmFjZUNoYW5uZWxEYXRhLCB0cmFjZUNoYW5uZWxEYXRhQ2h1bmspO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyBhZGp1c3QgdGhlIHRoZSB0aW1lIHN0YW1wIHRvIHRoZSBuZXh0IGNodW5rIGJhc2VkIG9uIHRoZSBsYXN0IHRpbWUgcG9pbnQgb2YgdGhlIGN1cnJlbnQgY2h1bmsuXHJcbiAgICAgICAgICAgICAgICByZWFkVHJhY2VEYXRhUmVxdWVzdEluZm8uQWJvdmVUaW1lc3RhbXAgPSB0cmFjZUNoYW5uZWxEYXRhQ2h1bmsuVGltZVZhbHVlc1t0cmFjZUNoYW5uZWxEYXRhQ2h1bmsuVGltZVZhbHVlcy5sZW5ndGggLSAxXTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBjb250aW51ZSB1bnRpbCBjaHVua3MgYXZhaWxhYmxlXHJcbiAgICAgICAgICAgIH0gd2hpbGUgKHRoaXMubmV4dFRyYWNlRGF0YUNodW5rQXZhaWxhYmxlKHRyYWNlQ2hhbm5lbERhdGFDaHVuaywgcmVhZFRyYWNlRGF0YVJlcXVlc3RJbmZvLk1heFJlYWRDb3VudCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cmFjZUNoYW5uZWxEYXRhQ2h1bms7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgbW9yZSB0cmFjZSBkYXRhIGlzIHBvc3NpYmx5IGF2YWlsYWJsZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1Jlc3QuSW50ZXJmYWNlVHJhY2VEYXRhfSB0cmFjZUNoYW5uZWxEYXRhXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY2h1bmtTaXplXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0VHJhY2VEYXRhUmVhZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbmV4dFRyYWNlRGF0YUNodW5rQXZhaWxhYmxlKHRyYWNlQ2hhbm5lbERhdGE6IFJlc3QuSW50ZXJmYWNlVHJhY2VEYXRhLCBjaHVua1NpemU6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB0cmFjZUNoYW5uZWxEYXRhICAmJiB0cmFjZUNoYW5uZWxEYXRhLlRpbWVWYWx1ZXMubGVuZ3RoID09PSBjaHVua1NpemU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBcHBlbmRzIGEgdHJhY2UgZGF0YSBibG9jayB0byB0aGUgZXhpc3RpbmcgdHJhY2UgZGF0YSBjaGFubmVsXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7UmVzdC5JbnRlcmZhY2VUcmFjZURhdGF9IHRyYWNlQ2hhbm5lbERhdGFcclxuICAgICAqIEBwYXJhbSB7UmVzdC5JbnRlcmZhY2VUcmFjZURhdGF9IG5leHRUcmFjZUNoYW5uZWxEYXRhQmxvY2tcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFRyYWNlRGF0YVJlYWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFwcGVuZFRyYWNlRGF0YUNodW5rKHRyYWNlQ2hhbm5lbERhdGE6IFJlc3QuSW50ZXJmYWNlVHJhY2VEYXRhLCBuZXh0VHJhY2VDaGFubmVsRGF0YUJsb2NrOiBSZXN0LkludGVyZmFjZVRyYWNlRGF0YSwgKSB7XHJcbiAgICAgICAgbmV4dFRyYWNlQ2hhbm5lbERhdGFCbG9jay5EYXRhVmFsdWVzLmZvckVhY2goKHRyYWNlVmFsdWUpID0+IHsgdHJhY2VDaGFubmVsRGF0YS5EYXRhVmFsdWVzLnB1c2godHJhY2VWYWx1ZSk7IH0pO1xyXG4gICAgICAgIG5leHRUcmFjZUNoYW5uZWxEYXRhQmxvY2suVGltZVZhbHVlcy5mb3JFYWNoKCh0cmFjZVRpbWVTdGFtcCkgPT4geyB0cmFjZUNoYW5uZWxEYXRhLlRpbWVWYWx1ZXMucHVzaCh0cmFjZVRpbWVTdGFtcCk7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBpbml0aWFsaXplcyBhbmQgYWRkcyBhIG5ldyB0cmFjZSBjaGFubmVsIHRvIHRoZSB0cmFjZSBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0cmFjZVBvaW50TmFtZVxyXG4gICAgICogQHBhcmFtIHtSZXN0LkludGVyZmFjZVRyYWNlRGF0YX0gdHJhY2VEYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRUcmFjZURhdGFSZWFkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRUcmFjZUNoYW5uZWwodHJhY2VQb2ludE5hbWU6IHN0cmluZywgdHJhY2VEYXRhOiBSZXN0LkludGVyZmFjZVRyYWNlRGF0YSwgKSB7XHJcblxyXG4gICAgICAgIHZhciB0cmFjZVBvaW50cyA9IG5ldyBBcnJheTxUcmFjZVBvaW50PigpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJhY2VEYXRhLkRhdGFWYWx1ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgZGF0YVZhbHVlID0gdHJhY2VEYXRhLkRhdGFWYWx1ZXNbaV07XHJcbiAgICAgICAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IHRyYWNlRGF0YS5UaW1lVmFsdWVzW2ldO1xyXG4gICAgICAgICAgICB0cmFjZVBvaW50cy5wdXNoKG5ldyBUcmFjZVBvaW50KGRhdGFWYWx1ZSwgdGltZXN0YW1wKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl90cmFjZURhdGEuYWRkVHJhY2VDaGFubmVsKHRyYWNlUG9pbnROYW1lLCB0cmFjZVBvaW50cyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgYXZhaWxhYmxlIHRyYWNlIGRhdGEgcG9pbnRzLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PHN0cmluZz4+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0VHJhY2VEYXRhUmVhZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgcmVxdWVzdFJlYWRUcmFjZURhdGFQb2ludHNGcm9tVGFyZ2V0KCk6IFByb21pc2U8QXJyYXk8c3RyaW5nPj4ge1xyXG5cclxuICAgICAgICB2YXIgdHJhY2VEYXRhUG9pbnRCYXNlTmFtZSA9IHRoaXMuX2RpYWdub3N0aWNQcm92aWRlci5uYW1lc3BhY2UgKyBcIjtcIiArIE9wY1VhUmVzdFNlcnZpY2VzLm1hcHBDb2NrcGl0VHJhY2VEYXRhUG9pbnROYW1lSWQ7XHJcblxyXG4gICAgICAgIHZhciB0cmFjZURhdGFQb2ludE5hbWVzID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuXHJcbiAgICAgICAgbGV0IHJlYWREYXRhUG9pbnROYW1lUmVxdWVzdHM6IFByb21pc2U8c3RyaW5nPltdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gT3BjVWFSZXN0U2VydmljZXMubWFwcENvY2twaXRUcmFjZURhdGFQb2ludENvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgcmVhZERhdGFQb2ludE5hbWVSZXF1ZXN0cy5wdXNoKE9wY1VhUmVzdFNlcnZpY2VzLnJlYWROb2RlQXR0cmlidXRlKHRoaXMuX2RpYWdub3N0aWNQcm92aWRlci5zZXNzaW9uSWQsIHRyYWNlRGF0YVBvaW50QmFzZU5hbWUgKyBpKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBsZXQgYXZhaWxhYmxlVHJhY2VQb2ludE5hbWVzID0gYXdhaXQgUHJvbWlzZS5hbGwocmVhZERhdGFQb2ludE5hbWVSZXF1ZXN0cyk7ICBcclxuICAgICAgICAgICAgLy8gZmlsdGVyIHZhbGlkIHRyYWNlIHBvaW50IG5hbWVzXHJcbiAgICAgICAgICAgIHRyYWNlRGF0YVBvaW50TmFtZXMgPSBhdmFpbGFibGVUcmFjZVBvaW50TmFtZXMuZmlsdGVyKCh0cmFjZVBvaW50TmFtZSk9PnsgcmV0dXJuIHRyYWNlUG9pbnROYW1lOyB9KSAgICAgIFxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cmFjZURhdGFQb2ludE5hbWVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgdGhlIHRyYWNlIHRyaWdnZXIgdGltZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTxhbnk+Pn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFRyYWNlRGF0YVJlYWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIHJlcXVlc3RSZWFkVHJhY2VUcmlnZ2VyVGltZUZyb21UYXJnZXQoKTogUHJvbWlzZTxudW1iZXI+IHtcclxuXHJcbiAgICAgICAgdmFyIHRyYWNlVHJpZ2dlclRpbWVJZCA9IHRoaXMuX2RpYWdub3N0aWNQcm92aWRlci5uYW1lc3BhY2UgKyBcIjtcIiArIE9wY1VhUmVzdFNlcnZpY2VzLm1hcHBDb2NrcGl0VHJhY2VUcmlnZ2VyVGltZTtcclxuXHJcbiAgICAgICAgbGV0IHRyaWdnZXJUaW1lID0gYXdhaXQgT3BjVWFSZXN0U2VydmljZXMucmVhZE5vZGVBdHRyaWJ1dGUodGhpcy5fZGlhZ25vc3RpY1Byb3ZpZGVyLnNlc3Npb25JZCwgdHJhY2VUcmlnZ2VyVGltZUlkKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRyaWdnZXJUaW1lO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRzIGEgc2luZ2xlIHRyYWNlIHBvaW50XHJcbiAqXHJcbiAqIEBjbGFzcyBUcmFjZVBvaW50XHJcbiAqL1xyXG5jbGFzcyBUcmFjZVBvaW50IHtcclxuICAgIGRhdGFWYWx1ZTogbnVtYmVyO1xyXG4gICAgdGltZVN0YW1wOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZGF0YVZhbHVlOiBudW1iZXIsIHRpbWVWYWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhVmFsdWUgPSBkYXRhVmFsdWU7XHJcbiAgICAgICAgdGhpcy50aW1lU3RhbXAgPSB0aW1lVmFsdWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRzIGEgdHJhY2UgZGF0YSBjaGFubmVsXHJcbiAqXHJcbiAqIEBjbGFzcyBUcmFjZURhdGFDaGFubmVsXHJcbiAqL1xyXG5jbGFzcyBUcmFjZURhdGFDaGFubmVsIHtcclxuXHJcbiAgICAvLyBTcGVjZWZpZXMgdGhlIHRyYWNlIGNoYW5uZWwgbmFtZVxyXG4gICAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nO1xyXG4gICAgLy9Db250YWlucyB0aGUgdHJhY2Vwb2ludHNcclxuICAgIHByaXZhdGUgX3RyYWNlUG9pbnRzOiBBcnJheTxUcmFjZVBvaW50PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBuYW1lIG9mIHRoZSB0cmFjZSBjaGFubmVsXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlRGF0YUNoYW5uZWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWVcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHRyYWNlIHBvaW50cyBvZiB0aGUgdHJhY2UgY2hhbm5lbFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge0FycmF5PFRyYWNlUG9pbnQ+fVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlRGF0YUNoYW5uZWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB0cmFjZVBvaW50cygpOiBBcnJheTxUcmFjZVBvaW50PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RyYWNlUG9pbnRzXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgdHJhY2VQb2ludHM6IEFycmF5PFRyYWNlUG9pbnQ+KSB7XHJcblxyXG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuX3RyYWNlUG9pbnRzID0gdHJhY2VQb2ludHM7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRzIGEgY2xhc3MgZm9yIGRvd25sb2FkaW5nIGFuZCBwcm92aWRpbmcgdHJhY2UgZGF0YVxyXG4gKlxyXG4gKiBAY2xhc3MgVHJhY2VEYXRhXHJcbiAqL1xyXG5jbGFzcyBUcmFjZURhdGEge1xyXG4gICBcclxuICAgIC8vIGhvbGRzIHRoZSB0cmlnZ2VyIHRpbWVcclxuICAgIHByaXZhdGUgX3RyaWdnZXJUaW1lOiBudW1iZXI7XHJcblxyXG4gICAgLy8gSG9sZHMgdHJhY2UgZGF0YSBjaGFubmVsc1xyXG4gICAgcHJpdmF0ZSBfdHJhY2VDaGFubmVsczogQXJyYXk8VHJhY2VEYXRhQ2hhbm5lbD4gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuX3RyaWdnZXJUaW1lID0gMDtcclxuICAgICAgICB0aGlzLl90cmFjZUNoYW5uZWxzID0gW107XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGFkZFRyYWNlQ2hhbm5lbCh0cmFjZVBvaW50TmFtZTogc3RyaW5nLCB0cmFjZVBvaW50czogVHJhY2VQb2ludFtdKTogYW55IHtcclxuICAgICAgICB2YXIgbmV3VHJhY2VDaGFubmVsID0gbmV3IFRyYWNlRGF0YUNoYW5uZWwodHJhY2VQb2ludE5hbWUsIHRyYWNlUG9pbnRzKTtcclxuICAgICAgICB0aGlzLl90cmFjZUNoYW5uZWxzLnB1c2gobmV3VHJhY2VDaGFubmVsKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyYWNlIGNoYW5uZWxzXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7QXJyYXk8VHJhY2VEYXRhQ2hhbm5lbD59XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VEYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgdHJhY2VDaGFubmVscygpOiBBcnJheTxUcmFjZURhdGFDaGFubmVsPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RyYWNlQ2hhbm5lbHM7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBwdWJsaWMgc2V0IHRyaWdnZXJUaW1lKHZhbHVlOm51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX3RyaWdnZXJUaW1lID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0IHRyaWdnZXJUaW1lKCkgOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90cmlnZ2VyVGltZVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbGVhcnMgZXhpc3RpbmcgdHJhY2UgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlRGF0YVxyXG4gICAgICovXHJcbiAgICBjbGVhcigpOiBhbnkge1xyXG4gICAgICAgIHRoaXMuX3RyYWNlQ2hhbm5lbHMgPSBbXTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCB7TWFwcENvY2twaXRUcmFjZURhdGFSZWFkZXIsIFRyYWNlRGF0YSwgVHJhY2VEYXRhQ2hhbm5lbCwgVHJhY2VQb2ludCB9OyJdfQ==