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
define(["require", "exports", "../../framework/events", "../../communication/rest/opcUaRestServices"], function (require, exports, events_1, opcUaRestServices_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * specifies socket event types
     *
     * @enum {number}
     */
    var SockeEventType;
    (function (SockeEventType) {
        SockeEventType[SockeEventType["undefined"] = 0] = "undefined";
        SockeEventType[SockeEventType["OPENED"] = 1] = "OPENED";
        SockeEventType[SockeEventType["CLOSED"] = 2] = "CLOSED";
        SockeEventType[SockeEventType["MESSAGE"] = 3] = "MESSAGE";
        SockeEventType[SockeEventType["ERROR"] = 4] = "ERROR";
    })(SockeEventType || (SockeEventType = {}));
    exports.SockeEventType = SockeEventType;
    /**
     * implements socket event arguments
     *
     * @class OpcUaWebSocketEventArgs
     */
    var OpcUaWebSocketEventArgs = /** @class */ (function () {
        function OpcUaWebSocketEventArgs(eventType, eventData) {
            this._type = SockeEventType.undefined;
            this._data = eventData;
            this._type = eventType;
        }
        Object.defineProperty(OpcUaWebSocketEventArgs.prototype, "type", {
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OpcUaWebSocketEventArgs.prototype, "data", {
            get: function () {
                return this._data;
            },
            enumerable: true,
            configurable: true
        });
        return OpcUaWebSocketEventArgs;
    }());
    exports.OpcUaWebSocketEventArgs = OpcUaWebSocketEventArgs;
    // declares an event for receiving opc-ua web socket messages
    var EventOpcUaWebSocket = /** @class */ (function (_super) {
        __extends(EventOpcUaWebSocket, _super);
        function EventOpcUaWebSocket() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventOpcUaWebSocket;
    }(events_1.TypedEvent));
    ;
    /**
     * implements receiving of opc-ua events with web sockets.
     *
     * @class OpcUaWebSocket
     */
    var OpcUaWebSocket = /** @class */ (function () {
        /**
     * creates an instance of OpcUaWebSocket.
     * @memberof OpcUaWebSocket
     */
        function OpcUaWebSocket() {
            // create web socket event
            this.eventOpcUaWebSocket = new EventOpcUaWebSocket();
        }
        /**
         * creates an opc-ua web socket
         *
         * @static
         * @returns {OpcUaWebSocket}
         * @memberof OpcUaWebSocket
         */
        OpcUaWebSocket.create = function () {
            return new OpcUaWebSocket();
        };
        /**
         * opens and connects an opc-ua socket
         *
         * @returns {*}
         * @memberof OpcUaWebSocket
         */
        OpcUaWebSocket.prototype.connect = function () {
            return __awaiter(this, void 0, void 0, function () {
                var connectionPromise;
                var _this = this;
                return __generator(this, function (_a) {
                    connectionPromise = new Promise(function (resolve, reject) {
                        try {
                            // if no web socket is defined ....
                            if (!_this._webSocket) {
                                // ... we create a web socket instance
                                _this.createWebSocketConnection(resolve);
                            }
                            else {
                                // ...otherwise we are already done
                                resolve();
                            }
                        }
                        catch (error) {
                            reject("could not create opc-ua web socket connection");
                        }
                    });
                    return [2 /*return*/, connectionPromise];
                });
            });
        };
        /**
         * Creates a web socket connection
         *
         * @private
         * @param {(value?: any) => void} resolve
         * @memberof OpcUaWebSocket
         */
        OpcUaWebSocket.prototype.createWebSocketConnection = function (resolve) {
            var _this = this;
            this._webSocket = new WebSocket(opcUaRestServices_1.OpcUaRestServices.getWsBaseUrl());
            // handle web socket callbacks
            this._webSocket.onopen = function () {
                _this.onSocketOpened();
                resolve();
            };
            this._webSocket.onmessage = function (socketMsg) {
                _this.onSocketMessageReceived(socketMsg.data);
            };
            this._webSocket.onclose = function () {
                _this.onSocketClosed(_this._webSocket.readyState);
            };
        };
        /**
         * closes an opc-ua web socket connection
         *
         * @returns {*}
         * @memberof OpcUaWebSocket
         */
        OpcUaWebSocket.prototype.close = function () {
            if (this._webSocket) {
                this._webSocket.close();
            }
        };
        /**
         *
         * notify that the socket has been opened
         * @returns {*}
         * @memberof OpcUaWebSocket
         */
        OpcUaWebSocket.prototype.onSocketOpened = function () {
            this.eventOpcUaWebSocket.raise(this, new OpcUaWebSocketEventArgs(SockeEventType.OPENED, null));
        };
        /**
         * notify that the socket has been closed
         *
         * @param {number} readyState
         * @returns {*}
         * @memberof OpcUaWebSocket
         */
        OpcUaWebSocket.prototype.onSocketClosed = function (readyState) {
            this.eventOpcUaWebSocket.raise(this, new OpcUaWebSocketEventArgs(SockeEventType.CLOSED, null));
        };
        /**
         * handles receiving socket messages
         *
         * @param {MessageEvent} socketMsg
         * @returns {*}
         * @memberof OpcUaWebSocket
         */
        OpcUaWebSocket.prototype.onSocketMessageReceived = function (socketMsg) {
            var socketMsgData = JSON.parse(socketMsg);
            // check if its a valid message
            if (socketMsgData.sessionId && socketMsgData.subscriptionId && socketMsgData.DataNotifications) {
                this.eventOpcUaWebSocket.raise(this, new OpcUaWebSocketEventArgs(SockeEventType.MESSAGE, socketMsgData));
            }
        };
        return OpcUaWebSocket;
    }());
    exports.OpcUaWebSocket = OpcUaWebSocket;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BjVWFXZWJTb2NrZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW11bmljYXRpb24vcmVzdC9vcGNVYVdlYlNvY2tldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBSUE7Ozs7T0FJRztJQUNILElBQUssY0FNSjtJQU5ELFdBQUssY0FBYztRQUNmLDZEQUFTLENBQUE7UUFDVCx1REFBTSxDQUFBO1FBQ04sdURBQU0sQ0FBQTtRQUNOLHlEQUFPLENBQUE7UUFDUCxxREFBSyxDQUFBO0lBQ1QsQ0FBQyxFQU5JLGNBQWMsS0FBZCxjQUFjLFFBTWxCO0lBK0xpRCx3Q0FBYztJQXRLaEU7Ozs7T0FJRztJQUNIO1FBWUksaUNBQVksU0FBeUIsRUFBRSxTQUFjO1lBWHJELFVBQUssR0FBbUIsY0FBYyxDQUFDLFNBQVMsQ0FBQztZQVk3QyxJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztZQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUMzQixDQUFDO1FBWEQsc0JBQUkseUNBQUk7aUJBQVI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFBO1lBQ3JCLENBQUM7OztXQUFBO1FBRUQsc0JBQUkseUNBQUk7aUJBQVI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFBO1lBQ3JCLENBQUM7OztXQUFBO1FBTUwsOEJBQUM7SUFBRCxDQUFDLEFBaEJELElBZ0JDO0lBaUp3QiwwREFBdUI7SUE5SWhELDZEQUE2RDtJQUM3RDtRQUFrQyx1Q0FBbUQ7UUFBckY7O1FBQXVGLENBQUM7UUFBRCwwQkFBQztJQUFELENBQUMsQUFBeEYsQ0FBa0MsbUJBQVUsR0FBNEM7SUFBQSxDQUFDO0lBSXpGOzs7O09BSUc7SUFDSDtRQVNJOzs7T0FHRDtRQUNDO1lBQ0ksMEJBQTBCO1lBQzFCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLG1CQUFtQixFQUFFLENBQUM7UUFDekQsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLHFCQUFNLEdBQWI7WUFDSSxPQUFPLElBQUksY0FBYyxFQUFFLENBQUM7UUFDaEMsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0csZ0NBQU8sR0FBYjs7Ozs7b0JBQ1UsaUJBQWlCLEdBQUcsSUFBSSxPQUFPLENBQU0sVUFBQyxPQUFPLEVBQUUsTUFBTTt3QkFDdkQsSUFBSTs0QkFDQSxtQ0FBbUM7NEJBQ25DLElBQUksQ0FBQyxLQUFJLENBQUMsVUFBVSxFQUFFO2dDQUNsQixzQ0FBc0M7Z0NBQ3RDLEtBQUksQ0FBQyx5QkFBeUIsQ0FBQyxPQUFPLENBQUMsQ0FBQzs2QkFDM0M7aUNBQU07Z0NBQ0gsbUNBQW1DO2dDQUNuQyxPQUFPLEVBQUUsQ0FBQzs2QkFDYjt5QkFDSjt3QkFBQyxPQUFPLEtBQUssRUFBRTs0QkFDWixNQUFNLENBQUMsK0NBQStDLENBQUMsQ0FBQzt5QkFDM0Q7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7b0JBRUgsc0JBQU8saUJBQWlCLEVBQUM7OztTQUM1QjtRQUdMOzs7Ozs7V0FNRztRQUNLLGtEQUF5QixHQUFqQyxVQUFrQyxPQUE4QjtZQUFoRSxpQkFjSztZQVpHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxTQUFTLENBQUMscUNBQWlCLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztZQUNsRSw4QkFBOEI7WUFDOUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUc7Z0JBQ3JCLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdEIsT0FBTyxFQUFFLENBQUM7WUFDZCxDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsR0FBRyxVQUFDLFNBQVM7Z0JBQ2xDLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakQsQ0FBQyxDQUFDO1lBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUc7Z0JBQ3RCLEtBQUksQ0FBQyxjQUFjLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNwRCxDQUFDLENBQUM7UUFDTixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCw4QkFBSyxHQUFMO1lBQ0ksSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQzNCO1FBQ0wsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsdUNBQWMsR0FBZDtZQUNJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksdUJBQXVCLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ25HLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSCx1Q0FBYyxHQUFkLFVBQWUsVUFBa0I7WUFDN0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSx1QkFBdUIsQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbkcsQ0FBQztRQUlEOzs7Ozs7V0FNRztRQUNILGdEQUF1QixHQUF2QixVQUF3QixTQUFpQjtZQUNyQyxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzFDLCtCQUErQjtZQUMvQixJQUFJLGFBQWEsQ0FBQyxTQUFTLElBQUksYUFBYSxDQUFDLGNBQWMsSUFBSSxhQUFhLENBQUMsaUJBQWlCLEVBQUU7Z0JBQzVGLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksdUJBQXVCLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDO2FBQzVHO1FBQ0wsQ0FBQztRQUdMLHFCQUFDO0lBQUQsQ0FBQyxBQWpJRCxJQWlJQztJQUdRLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IEludGVyZmFjZU9wY1VhUmVzdFJlc3VsdFN0YXRlIH0gZnJvbSBcIi4vb3BjVWFSZXN0UmVzdWx0VHlwZXNcIjtcclxuaW1wb3J0IHsgT3BjVWFSZXN0U2VydmljZXMgfSBmcm9tIFwiLi4vLi4vY29tbXVuaWNhdGlvbi9yZXN0L29wY1VhUmVzdFNlcnZpY2VzXCI7XHJcblxyXG4vKipcclxuICogc3BlY2lmaWVzIHNvY2tldCBldmVudCB0eXBlc1xyXG4gKlxyXG4gKiBAZW51bSB7bnVtYmVyfVxyXG4gKi9cclxuZW51bSBTb2NrZUV2ZW50VHlwZSB7XHJcbiAgICB1bmRlZmluZWQsXHJcbiAgICBPUEVORUQsXHJcbiAgICBDTE9TRUQsXHJcbiAgICBNRVNTQUdFLFxyXG4gICAgRVJST1IsXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBkZWNsYXJ0ZXMgdGhlIHN0cnVjdHVyZSBvZiB0aGUgY2hhbmdlZCBkYXRhIHJlc3VsdFxyXG4gKlxyXG4gKiBAaW50ZXJmYWNlIElPcGNVYURhdGFDaGFuZ2VkXHJcbiAqL1xyXG5pbnRlcmZhY2UgSU9wY1VhRGF0YUNoYW5nZWQge1xyXG4gICAgc2Vzc2lvbklkOiBudW1iZXI7XHJcbiAgICBzdWJzY3JpcHRpb25JZDogbnVtYmVyO1xyXG4gICAgRGF0YU5vdGlmaWNhdGlvbnM6IEFycmF5PElPcGNVYURhdGFOb3RpZmljYXRpb24+O1xyXG59XHJcblxyXG4vKipcclxuICogZGVjbGFyZXMgdGhlIHN0cnVjdHVyZSBvZiB0aGUgZGF0YSBub3RpZml2wrRjYXRpb25cclxuICpcclxuICogQGludGVyZmFjZSBJT3BjVWFEYXRhTm90aWZpY2F0aW9uXHJcbiAqL1xyXG5pbnRlcmZhY2UgSU9wY1VhRGF0YU5vdGlmaWNhdGlvbntcclxuICAgIGNsaWVudEhhbmRsZTpudW1iZXI7XHJcbiAgICB2YWx1ZTphbnk7XHJcbiAgICBzdGF0dXM6SW50ZXJmYWNlT3BjVWFSZXN0UmVzdWx0U3RhdGU7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyBzb2NrZXQgZXZlbnQgYXJndW1lbnRzXHJcbiAqXHJcbiAqIEBjbGFzcyBPcGNVYVdlYlNvY2tldEV2ZW50QXJnc1xyXG4gKi9cclxuY2xhc3MgT3BjVWFXZWJTb2NrZXRFdmVudEFyZ3Mge1xyXG4gICAgX3R5cGU6IFNvY2tlRXZlbnRUeXBlID0gU29ja2VFdmVudFR5cGUudW5kZWZpbmVkO1xyXG4gICAgX2RhdGE6IGFueTtcclxuXHJcbiAgICBnZXQgdHlwZSgpOiBTb2NrZUV2ZW50VHlwZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3R5cGVcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZGF0YSgpOiBJT3BjVWFEYXRhQ2hhbmdlZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihldmVudFR5cGU6IFNvY2tlRXZlbnRUeXBlLCBldmVudERhdGE6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSBldmVudERhdGE7XHJcbiAgICAgICAgdGhpcy5fdHlwZSA9IGV2ZW50VHlwZTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8vIGRlY2xhcmVzIGFuIGV2ZW50IGZvciByZWNlaXZpbmcgb3BjLXVhIHdlYiBzb2NrZXQgbWVzc2FnZXNcclxuY2xhc3MgRXZlbnRPcGNVYVdlYlNvY2tldCBleHRlbmRzIFR5cGVkRXZlbnQ8T3BjVWFXZWJTb2NrZXQsIE9wY1VhV2ViU29ja2V0RXZlbnRBcmdzPnsgfTtcclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudHMgcmVjZWl2aW5nIG9mIG9wYy11YSBldmVudHMgd2l0aCB3ZWIgc29ja2V0cy5cclxuICpcclxuICogQGNsYXNzIE9wY1VhV2ViU29ja2V0XHJcbiAqL1xyXG5jbGFzcyBPcGNVYVdlYlNvY2tldCB7XHJcblxyXG4gICAgLy8gaG9sZHMgdGhlIHdlYiBzb2NrZXQgaW5zdGFuY2VcclxuICAgIHByaXZhdGUgX3dlYlNvY2tldCE6IFdlYlNvY2tldDtcclxuXHJcbiAgICAvLyBEZWNsYXJlIGV2ZW50IHRyYWNlIGRhdGEgbG9hZGVkXHJcbiAgICBwdWJsaWMgZXZlbnRPcGNVYVdlYlNvY2tldDogRXZlbnRPcGNVYVdlYlNvY2tldDtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAqIGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgT3BjVWFXZWJTb2NrZXQuXHJcbiAqIEBtZW1iZXJvZiBPcGNVYVdlYlNvY2tldFxyXG4gKi9cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgLy8gY3JlYXRlIHdlYiBzb2NrZXQgZXZlbnRcclxuICAgICAgICB0aGlzLmV2ZW50T3BjVWFXZWJTb2NrZXQgPSBuZXcgRXZlbnRPcGNVYVdlYlNvY2tldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlcyBhbiBvcGMtdWEgd2ViIHNvY2tldFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEByZXR1cm5zIHtPcGNVYVdlYlNvY2tldH1cclxuICAgICAqIEBtZW1iZXJvZiBPcGNVYVdlYlNvY2tldFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY3JlYXRlKCk6IE9wY1VhV2ViU29ja2V0IHtcclxuICAgICAgICByZXR1cm4gbmV3IE9wY1VhV2ViU29ja2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBvcGVucyBhbmQgY29ubmVjdHMgYW4gb3BjLXVhIHNvY2tldFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhV2ViU29ja2V0XHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGNvbm5lY3QoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc3QgY29ubmVjdGlvblByb21pc2UgPSBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIC8vIGlmIG5vIHdlYiBzb2NrZXQgaXMgZGVmaW5lZCAuLi4uXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX3dlYlNvY2tldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIC4uLiB3ZSBjcmVhdGUgYSB3ZWIgc29ja2V0IGluc3RhbmNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVXZWJTb2NrZXRDb25uZWN0aW9uKHJlc29sdmUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAuLi5vdGhlcndpc2Ugd2UgYXJlIGFscmVhZHkgZG9uZVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChcImNvdWxkIG5vdCBjcmVhdGUgb3BjLXVhIHdlYiBzb2NrZXQgY29ubmVjdGlvblwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gY29ubmVjdGlvblByb21pc2U7XHJcbiAgICB9XHJcblxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSB3ZWIgc29ja2V0IGNvbm5lY3Rpb25cclxuICpcclxuICogQHByaXZhdGVcclxuICogQHBhcmFtIHsodmFsdWU/OiBhbnkpID0+IHZvaWR9IHJlc29sdmVcclxuICogQG1lbWJlcm9mIE9wY1VhV2ViU29ja2V0XHJcbiAqL1xyXG5wcml2YXRlIGNyZWF0ZVdlYlNvY2tldENvbm5lY3Rpb24ocmVzb2x2ZTogKHZhbHVlPzogYW55KSA9PiB2b2lkKSB7XHJcbiAgICAgICBcclxuICAgICAgICB0aGlzLl93ZWJTb2NrZXQgPSBuZXcgV2ViU29ja2V0KE9wY1VhUmVzdFNlcnZpY2VzLmdldFdzQmFzZVVybCgpKTtcclxuICAgICAgICAvLyBoYW5kbGUgd2ViIHNvY2tldCBjYWxsYmFja3NcclxuICAgICAgICB0aGlzLl93ZWJTb2NrZXQub25vcGVuID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm9uU29ja2V0T3BlbmVkKCk7XHJcbiAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX3dlYlNvY2tldC5vbm1lc3NhZ2UgPSAoc29ja2V0TXNnKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25Tb2NrZXRNZXNzYWdlUmVjZWl2ZWQoc29ja2V0TXNnLmRhdGEpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fd2ViU29ja2V0Lm9uY2xvc2UgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25Tb2NrZXRDbG9zZWQodGhpcy5fd2ViU29ja2V0LnJlYWR5U3RhdGUpO1xyXG4gICAgICAgIH07ICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjbG9zZXMgYW4gb3BjLXVhIHdlYiBzb2NrZXQgY29ubmVjdGlvblxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhV2ViU29ja2V0XHJcbiAgICAgKi9cclxuICAgIGNsb3NlKCk6IGFueSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3dlYlNvY2tldCkge1xyXG4gICAgICAgICAgICB0aGlzLl93ZWJTb2NrZXQuY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogbm90aWZ5IHRoYXQgdGhlIHNvY2tldCBoYXMgYmVlbiBvcGVuZWRcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhV2ViU29ja2V0XHJcbiAgICAgKi9cclxuICAgIG9uU29ja2V0T3BlbmVkKCk6IGFueSB7XHJcbiAgICAgICAgdGhpcy5ldmVudE9wY1VhV2ViU29ja2V0LnJhaXNlKHRoaXMsIG5ldyBPcGNVYVdlYlNvY2tldEV2ZW50QXJncyhTb2NrZUV2ZW50VHlwZS5PUEVORUQsIG51bGwpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG5vdGlmeSB0aGF0IHRoZSBzb2NrZXQgaGFzIGJlZW4gY2xvc2VkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJlYWR5U3RhdGVcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhV2ViU29ja2V0XHJcbiAgICAgKi9cclxuICAgIG9uU29ja2V0Q2xvc2VkKHJlYWR5U3RhdGU6IG51bWJlcik6IGFueSB7XHJcbiAgICAgICAgdGhpcy5ldmVudE9wY1VhV2ViU29ja2V0LnJhaXNlKHRoaXMsIG5ldyBPcGNVYVdlYlNvY2tldEV2ZW50QXJncyhTb2NrZUV2ZW50VHlwZS5DTE9TRUQsIG51bGwpKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaGFuZGxlcyByZWNlaXZpbmcgc29ja2V0IG1lc3NhZ2VzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNZXNzYWdlRXZlbnR9IHNvY2tldE1zZ1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFXZWJTb2NrZXRcclxuICAgICAqL1xyXG4gICAgb25Tb2NrZXRNZXNzYWdlUmVjZWl2ZWQoc29ja2V0TXNnOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgIGxldCBzb2NrZXRNc2dEYXRhID0gSlNPTi5wYXJzZShzb2NrZXRNc2cpO1xyXG4gICAgICAgIC8vIGNoZWNrIGlmIGl0cyBhIHZhbGlkIG1lc3NhZ2VcclxuICAgICAgICBpZiAoc29ja2V0TXNnRGF0YS5zZXNzaW9uSWQgJiYgc29ja2V0TXNnRGF0YS5zdWJzY3JpcHRpb25JZCAmJiBzb2NrZXRNc2dEYXRhLkRhdGFOb3RpZmljYXRpb25zKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRPcGNVYVdlYlNvY2tldC5yYWlzZSh0aGlzLCBuZXcgT3BjVWFXZWJTb2NrZXRFdmVudEFyZ3MoU29ja2VFdmVudFR5cGUuTUVTU0FHRSwgc29ja2V0TXNnRGF0YSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IHsgT3BjVWFXZWJTb2NrZXQsIE9wY1VhV2ViU29ja2V0RXZlbnRBcmdzLCBTb2NrZUV2ZW50VHlwZSwgSU9wY1VhRGF0YUNoYW5nZWQgfTsiXX0=