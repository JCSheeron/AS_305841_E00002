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
define(["require", "exports", "../../communication/rest/opcUaRestServices", "../../framework/events"], function (require, exports, opcUaRestServices_1, events_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // declares an event type for a component service notification
    var EventComponentServiceNotification = /** @class */ (function (_super) {
        __extends(EventComponentServiceNotification, _super);
        function EventComponentServiceNotification() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventComponentServiceNotification;
    }(events_1.TypedEvent));
    exports.EventComponentServiceNotification = EventComponentServiceNotification;
    ;
    // declare service request result states
    var ComponentServiceRequestResultState;
    (function (ComponentServiceRequestResultState) {
        ComponentServiceRequestResultState["accepted"] = "accepted";
        ComponentServiceRequestResultState["rejected"] = "rejected";
    })(ComponentServiceRequestResultState || (ComponentServiceRequestResultState = {}));
    /**
     * Declares the response type
     *
     * @export
     * @enum {number}
     */
    var ComponentServiceRequestType;
    (function (ComponentServiceRequestType) {
        ComponentServiceRequestType["changeParameterSet"] = "changeCfg";
    })(ComponentServiceRequestType = exports.ComponentServiceRequestType || (exports.ComponentServiceRequestType = {}));
    /**
     * The class implements an interface for observing component notifications via an info channel and requesting specific internal commands which can eventually result in a matching info channel response.
     *
     * @export
     * @class MappCockpitComponentService
     */
    var MappCockpitComponentService = /** @class */ (function () {
        function MappCockpitComponentService() {
            // declares an event source for a component service notification
            this.eventComponentServiceNotification = new EventComponentServiceNotification();
            // holds the info channel object
            this._serviceResponceInfoChannel = null;
            // holds the request method
            this._requestMethod = null;
            // holds a pending request
            this._pendingRequests = new Map();
        }
        Object.defineProperty(MappCockpitComponentService.prototype, "infoChannel", {
            /**
             * Gets the info channel property
             *
             * @type {(MappCockpitComponentParameter|null)}
             * @memberof MappCockpitComponentService
             */
            get: function () {
                return this._serviceResponceInfoChannel;
            },
            /**
             * Sets the info channel property
             *
             * @memberof MappCockpitComponentService
             */
            set: function (infoChannelParameter) {
                this._serviceResponceInfoChannel = infoChannelParameter;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentService.prototype, "request", {
            /**
             * Gets the request method
             *
             * @type {(MappCockpitComponentMethod|null)}
             * @memberof MappCockpitComponentService
             */
            get: function () {
                return this._requestMethod;
            },
            /**
             * Sets the request method
             *
             * @memberof MappCockpitComponentService
             */
            set: function (requestMethod) {
                this._requestMethod = requestMethod;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentService.prototype, "pendingRequests", {
            /**
             * Gets the pending request info and state
             *
             * @readonly
             * @type {(ComponentServiceRequestResult|null)}
             * @memberof MappCockpitComponentService
             */
            get: function () {
                return this._pendingRequests;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Retruns true if the the specified request is pending
         *
         * @param {string} requestID
         * @returns {boolean}
         * @memberof MappCockpitComponentService
         */
        MappCockpitComponentService.prototype.requestIsPending = function (requestID) {
            return this.pendingRequests.has(requestID);
        };
        /**
         * Initializes the service class
         *
         * @memberof MappCockpitComponentService
         */
        MappCockpitComponentService.prototype.initialize = function () {
        };
        /**
         * Writes the modified parameter values
         *
         * @param {((MappCockpitComponentParameter | undefined)[])} mofifiedParameters
         * @memberof MappCockpitComponentService
         */
        MappCockpitComponentService.prototype.writeParameterSet = function (mofifiedParameters) {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var component, requestChannelNodeId, requestMethodId, sessionId, requestMethodArgs, result, serviceRequestResult, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            component = (_a = mofifiedParameters[0]) === null || _a === void 0 ? void 0 : _a.component;
                            if (!(component && this.request)) return [3 /*break*/, 4];
                            requestChannelNodeId = component.id + MappCockpitComponentService.serviceNodeId;
                            requestMethodId = this.request.id;
                            sessionId = component.model._mappCockpitDiagnosticProvider._sessionId;
                            requestMethodArgs = this.createChangeParameterSetRequestArgs(mofifiedParameters);
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.executeServiceMethod(sessionId, requestChannelNodeId, requestMethodId, requestMethodArgs)];
                        case 2:
                            result = _b.sent();
                            serviceRequestResult = JSON.parse(result.args.reply);
                            if (serviceRequestResult.status === ComponentServiceRequestResultState.accepted) {
                                // add pending request
                                this.addPendingRequest(serviceRequestResult);
                                // return true to indicate that the request has been invoked successfully.   
                                return [2 /*return*/, true];
                            }
                            else {
                                console.error("MappCockpitComponentService: Could not execute service call!");
                                // return false to indicate that the request has not been invoked successfully.   
                                return [2 /*return*/, false];
                            }
                            console.log(result);
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _b.sent();
                            return [2 /*return*/, false];
                        case 4: return [2 /*return*/, false];
                    }
                });
            });
        };
        /**
         * Adds a request as pending
         *
         * @private
         * @param {ComponentServiceRequestResult} serviceRequestResult
         * @memberof MappCockpitComponentService
         */
        MappCockpitComponentService.prototype.addPendingRequest = function (serviceRequestResult) {
            this._pendingRequests.set(serviceRequestResult.requestID, serviceRequestResult);
        };
        /**
         * Clears a pending request
         *
         * @private
         * @param {ComponentServiceRequestResult} serviceRequestResult
         * @memberof MappCockpitComponentService
         */
        MappCockpitComponentService.prototype.clearPendingRequest = function (requestID) {
            this._pendingRequests.delete(requestID);
        };
        /**
         * Executes the specified service method
         *
         * @private
         * @param {*} sessionId
         * @param {string} requestChannelNodeId
         * @param {string} requestMethodId
         * @param {*} requestMethodArgs
         * @memberof MappCockpitComponentService
         */
        MappCockpitComponentService.prototype.executeServiceMethod = function (sessionId, requestChannelNodeId, requestMethodId, requestMethodArgs) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.executeMethod(sessionId, requestChannelNodeId, requestMethodId, requestMethodArgs)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * Creates the method args to specifiy the request method
         *
         * @private
         * @param {((MappCockpitComponentParameter | undefined)[])} mofifiedParameters
         * @returns
         * @memberof MappCockpitComponentService
         */
        MappCockpitComponentService.prototype.createChangeParameterSetRequestArgs = function (mofifiedParameters) {
            // create the request header
            var parameterSetWriteRequest = {
                requestSender: MappCockpitComponentService.serviceSenderId,
                requestType: ComponentServiceRequestType.changeParameterSet,
                requestData: []
            };
            // create the modified parameter list ...
            var modifiedParameterArgs = Array.from(mofifiedParameters.filter(function (parameter) { return parameter != undefined; }).map(function (parameter) { return { key: parameter.browseName, value: parameter.modifiedValue.toString() }; }));
            // ... and populate the request data
            parameterSetWriteRequest.requestData = modifiedParameterArgs;
            // prepare the request method args by creating an object containing the payload with the stringified JSON request data
            var requestMethodArgs = {
                payload: JSON.stringify(parameterSetWriteRequest),
            };
            return requestMethodArgs;
        };
        // specifies the node id containing the service methods and response channels
        MappCockpitComponentService.serviceNodeId = ".$BrComm";
        // specifies the request sender id
        MappCockpitComponentService.serviceSenderId = "mappCockpitV17";
        return MappCockpitComponentService;
    }());
    exports.MappCockpitComponentService = MappCockpitComponentService;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXRDb21wb25lbnRTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50U2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBS0EsOERBQThEO0lBQzlEO1FBQXVELHFEQUF3RTtRQUEvSDs7UUFBZ0ksQ0FBQztRQUFELHdDQUFDO0lBQUQsQ0FBQyxBQUFqSSxDQUF1RCxtQkFBVSxHQUFnRTtJQUFwSCw4RUFBaUM7SUFBbUYsQ0FBQztJQW1DbEksd0NBQXdDO0lBQ3hDLElBQUssa0NBR0o7SUFIRCxXQUFLLGtDQUFrQztRQUNuQywyREFBcUIsQ0FBQTtRQUNyQiwyREFBcUIsQ0FBQTtJQUN6QixDQUFDLEVBSEksa0NBQWtDLEtBQWxDLGtDQUFrQyxRQUd0QztJQVVEOzs7OztPQUtHO0lBQ0gsSUFBWSwyQkFFWDtJQUZELFdBQVksMkJBQTJCO1FBQ25DLCtEQUFnQyxDQUFBO0lBQ3BDLENBQUMsRUFGVywyQkFBMkIsR0FBM0IsbUNBQTJCLEtBQTNCLG1DQUEyQixRQUV0QztJQUlEOzs7OztPQUtHO0lBQ0g7UUFBQTtZQUVJLGdFQUFnRTtZQUN6RCxzQ0FBaUMsR0FBRyxJQUFJLGlDQUFpQyxFQUFFLENBQUM7WUFRbkYsZ0NBQWdDO1lBQ3hCLGdDQUEyQixHQUF1QyxJQUFJLENBQUM7WUFDL0UsMkJBQTJCO1lBQ25CLG1CQUFjLEdBQWtDLElBQUksQ0FBQztZQUM3RCwwQkFBMEI7WUFDbEIscUJBQWdCLEdBQTZDLElBQUksR0FBRyxFQUFFLENBQUM7UUFtTW5GLENBQUM7UUExTEksc0JBQVcsb0RBQVc7WUFOdkI7Ozs7O2VBS0c7aUJBQ0Y7Z0JBQ0csT0FBTyxJQUFJLENBQUMsMkJBQTJCLENBQUM7WUFDNUMsQ0FBQztZQUVE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Li4vLi4vY29tbXVuaWNhdGlvbi9yZXN0L29wY1VhUmVzdFNlcnZpY2VzXCI7XHJcbmltcG9ydCB7IFR5cGVkRXZlbnQgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2V2ZW50c1wiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudCwgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QsIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyIH0gZnJvbSBcIi4vbWFwcENvY2twaXRDb21wb25lbnRcIjtcclxuXHJcbi8vIGRlY2xhcmVzIGFuIGV2ZW50IHR5cGUgZm9yIGEgY29tcG9uZW50IHNlcnZpY2Ugbm90aWZpY2F0aW9uXHJcbmV4cG9ydCBjbGFzcyBFdmVudENvbXBvbmVudFNlcnZpY2VOb3RpZmljYXRpb24gZXh0ZW5kcyBUeXBlZEV2ZW50PE1hcHBDb2NrcGl0Q29tcG9uZW50U2VydmljZSwgU2VydmljZVJlc3BvbnNlQ2hhbmdlUGFyYW1ldGVycz57fTtcclxuXHJcbi8vIGRlY2xhcmUgbW9kaWZpZWQgcGFyYW1ldGVyIHR5cGVcclxudHlwZSBNb2RpZmllZFBhcmFtZXRlciA9IHtcclxuICAgIGtleTpzdHJpbmcsXHJcbiAgICB2YWx1ZTphbnlcclxufVxyXG5cclxuLy8gZGVjbGFyZSBzZXJ2aWNlIHJlcXVlc3QgdHlwZVxyXG50eXBlIENvbXBvbmVudFNlcnZpY2VSZXF1ZXN0Q2hhbmdlUGFyYW1ldGVycyA9IHtcclxuICAgIHJlcXVlc3RUeXBlOnN0cmluZyxcclxuICAgIHJlcXVlc3RTZW5kZXI6IHN0cmluZyxcclxuICAgIHJlcXVlc3REYXRhOiBNb2RpZmllZFBhcmFtZXRlcltdXHJcbn0gIFxyXG5cclxuLy8gZGVjbGFyZSB0aGUgc2VydmljZSByZXNwb25zZSB0eXBlXHJcbmV4cG9ydCB0eXBlIFNlcnZpY2VSZXNwb25zZUNoYW5nZVBhcmFtZXRlcnMgPSB7XHJcbiAgICBldmVudFR5cGU6c3RyaW5nLFxyXG4gICAgcmVxdWVzdFNlbmRlcjogc3RyaW5nLFxyXG4gICAgcmVxdWVzdElEOiBzdHJpbmcsXHJcbiAgICBldmVudERhdGE6IENvbXBvbmVudFNlcnZpY2VSZXNwb25zZURhdGFDaGFuZ2VQYXJhbWV0ZXJzXHJcbn0gIFxyXG5cclxuLy8gZGVjbGFyZSB0aGUgZGF0YSB0eXBlIGZvciBjaGFuZ2UgY29uZmlndXJhdGlvblxyXG5leHBvcnQgdHlwZSBDb21wb25lbnRTZXJ2aWNlUmVzcG9uc2VEYXRhQ2hhbmdlUGFyYW1ldGVycyA9IHtcclxuICAgIGFwcGxpZWQ6W0NvbXBvbmVudFNlcnZpY2VSZXNwb25zZURhdGFDaGFuZ2VkUGFyYW1ldGVyXSxcclxuICAgIHJlamVjdGVkOltDb21wb25lbnRTZXJ2aWNlUmVzcG9uc2VEYXRhQ2hhbmdlZFBhcmFtZXRlcl1cclxufSBcclxuXHJcbi8vIGRlY2xhcmVzIHRoZSBwYXJhbWV0ZXIgcmVzcG9uc2UgaW5mb1xyXG5leHBvcnQgdHlwZSBDb21wb25lbnRTZXJ2aWNlUmVzcG9uc2VEYXRhQ2hhbmdlZFBhcmFtZXRlciA9IHtcclxuICAgIGtleTpzdHJpbmcsXHJcbiAgICB2YWx1ZTphbnlcclxufSBcclxuXHJcbi8vIGRlY2xhcmUgc2VydmljZSByZXF1ZXN0IHJlc3VsdCBzdGF0ZXNcclxuZW51bSBDb21wb25lbnRTZXJ2aWNlUmVxdWVzdFJlc3VsdFN0YXRle1xyXG4gICAgYWNjZXB0ZWQgPSBcImFjY2VwdGVkXCIsXHJcbiAgICByZWplY3RlZCA9IFwicmVqZWN0ZWRcIlxyXG59XHJcblxyXG4vLyBkZWNsYXJlIHNlcnZpY2UgcmVzdWx0IHR5cGVcclxudHlwZSBDb21wb25lbnRTZXJ2aWNlUmVxdWVzdFJlc3VsdCA9IHtcclxuICAgIHJlcXVlc3RJRDpzdHJpbmcsXHJcbiAgICBzdGF0dXM6IENvbXBvbmVudFNlcnZpY2VSZXF1ZXN0UmVzdWx0U3RhdGUsXHJcbiAgICBlcnJvckluZm86IHN0cmluZyxcclxufSBcclxuXHJcblxyXG4vKipcclxuICogRGVjbGFyZXMgdGhlIHJlc3BvbnNlIHR5cGVcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAZW51bSB7bnVtYmVyfVxyXG4gKi9cclxuZXhwb3J0IGVudW0gQ29tcG9uZW50U2VydmljZVJlcXVlc3RUeXBle1xyXG4gICAgY2hhbmdlUGFyYW1ldGVyU2V0ID0gXCJjaGFuZ2VDZmdcIixcclxufVxyXG5cclxuXHJcblxyXG4vKipcclxuICogVGhlIGNsYXNzIGltcGxlbWVudHMgYW4gaW50ZXJmYWNlIGZvciBvYnNlcnZpbmcgY29tcG9uZW50IG5vdGlmaWNhdGlvbnMgdmlhIGFuIGluZm8gY2hhbm5lbCBhbmQgcmVxdWVzdGluZyBzcGVjaWZpYyBpbnRlcm5hbCBjb21tYW5kcyB3aGljaCBjYW4gZXZlbnR1YWxseSByZXN1bHQgaW4gYSBtYXRjaGluZyBpbmZvIGNoYW5uZWwgcmVzcG9uc2UuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50U2VydmljZVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50U2VydmljZSB7XHJcblxyXG4gICAgLy8gZGVjbGFyZXMgYW4gZXZlbnQgc291cmNlIGZvciBhIGNvbXBvbmVudCBzZXJ2aWNlIG5vdGlmaWNhdGlvblxyXG4gICAgcHVibGljIGV2ZW50Q29tcG9uZW50U2VydmljZU5vdGlmaWNhdGlvbiA9IG5ldyBFdmVudENvbXBvbmVudFNlcnZpY2VOb3RpZmljYXRpb24oKTtcclxuXHJcbiAgICAvLyBzcGVjaWZpZXMgdGhlIG5vZGUgaWQgY29udGFpbmluZyB0aGUgc2VydmljZSBtZXRob2RzIGFuZCByZXNwb25zZSBjaGFubmVsc1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBzZXJ2aWNlTm9kZUlkOiBzdHJpbmcgPSBcIi4kQnJDb21tXCI7XHJcbiAgICAvLyBzcGVjaWZpZXMgdGhlIHJlcXVlc3Qgc2VuZGVyIGlkXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IHNlcnZpY2VTZW5kZXJJZDogc3RyaW5nID0gXCJtYXBwQ29ja3BpdFYxN1wiO1xyXG5cclxuICAgIFxyXG4gICAgLy8gaG9sZHMgdGhlIGluZm8gY2hhbm5lbCBvYmplY3RcclxuICAgIHByaXZhdGUgX3NlcnZpY2VSZXNwb25jZUluZm9DaGFubmVsOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcnxudWxsID0gbnVsbDtcclxuICAgIC8vIGhvbGRzIHRoZSByZXF1ZXN0IG1ldGhvZFxyXG4gICAgcHJpdmF0ZSBfcmVxdWVzdE1ldGhvZDogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2R8bnVsbD1udWxsO1xyXG4gICAgLy8gaG9sZHMgYSBwZW5kaW5nIHJlcXVlc3RcclxuICAgIHByaXZhdGUgX3BlbmRpbmdSZXF1ZXN0czpNYXA8c3RyaW5nLENvbXBvbmVudFNlcnZpY2VSZXF1ZXN0UmVzdWx0PiA9IG5ldyBNYXAoKTtcclxuXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgaW5mbyBjaGFubmVsIHByb3BlcnR5XHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUgeyhNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcnxudWxsKX1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgIHB1YmxpYyBnZXQgaW5mb0NoYW5uZWwoKSA6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyfG51bGwge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJ2aWNlUmVzcG9uY2VJbmZvQ2hhbm5lbDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBpbmZvIGNoYW5uZWwgcHJvcGVydHlcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgICBwdWJsaWMgc2V0IGluZm9DaGFubmVsKGluZm9DaGFubmVsUGFyYW1ldGVyIDogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJ8bnVsbCkge1xyXG4gICAgICAgIHRoaXMuX3NlcnZpY2VSZXNwb25jZUluZm9DaGFubmVsID0gaW5mb0NoYW5uZWxQYXJhbWV0ZXI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgcmVxdWVzdCBtZXRob2RcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7KE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kfG51bGwpfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50U2VydmljZVxyXG4gICAgICovXHJcbiAgICAgcHVibGljIGdldCByZXF1ZXN0KCkgOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZHxudWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdE1ldGhvZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHJlcXVlc3QgbWV0aG9kXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50U2VydmljZVxyXG4gICAgICovXHJcbiAgICAgcHVibGljIHNldCByZXF1ZXN0KHJlcXVlc3RNZXRob2QgOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZHxudWxsKSB7XHJcbiAgICAgICAgdGhpcy5fcmVxdWVzdE1ldGhvZCA9IHJlcXVlc3RNZXRob2Q7XHJcbiAgICB9XHJcbiAgICAgXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHBlbmRpbmcgcmVxdWVzdCBpbmZvIGFuZCBzdGF0ZVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUgeyhDb21wb25lbnRTZXJ2aWNlUmVxdWVzdFJlc3VsdHxudWxsKX1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXQgcGVuZGluZ1JlcXVlc3RzKCkgOk1hcDxzdHJpbmcsQ29tcG9uZW50U2VydmljZVJlcXVlc3RSZXN1bHQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGVuZGluZ1JlcXVlc3RzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0cnVucyB0cnVlIGlmIHRoZSB0aGUgc3BlY2lmaWVkIHJlcXVlc3QgaXMgcGVuZGluZ1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXF1ZXN0SURcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50U2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVxdWVzdElzUGVuZGluZyhyZXF1ZXN0SUQ6c3RyaW5nKTpib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBlbmRpbmdSZXF1ZXN0cy5oYXMocmVxdWVzdElEKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgc2VydmljZSBjbGFzc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZSgpIHtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV3JpdGVzIHRoZSBtb2RpZmllZCBwYXJhbWV0ZXIgdmFsdWVzIFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7KChNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlciB8IHVuZGVmaW5lZClbXSl9IG1vZmlmaWVkUGFyYW1ldGVyc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50U2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgd3JpdGVQYXJhbWV0ZXJTZXQobW9maWZpZWRQYXJhbWV0ZXJzOiAoTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIgfCB1bmRlZmluZWQpW10pIDogUHJvbWlzZTxib29sZWFuPntcclxuXHJcbiAgICAgICAgLy8gZ2V0IHBhcmFtZXRlcnMgY29tcG9uZW50XHJcbiAgICAgICAgY29uc3QgY29tcG9uZW50OiBhbnkgPSBtb2ZpZmllZFBhcmFtZXRlcnNbMF0/LmNvbXBvbmVudCBhcyBNYXBwQ29ja3BpdENvbXBvbmVudDtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSByZXF1ZXN0IG1ldGhvZFxyXG4gICAgICAgIGlmIChjb21wb25lbnQgJiYgdGhpcy5yZXF1ZXN0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gc3BlY2lmeSB0aGUgQlIgcmVxdWVzdCBjaGFubmVsIGlkXHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXF1ZXN0Q2hhbm5lbE5vZGVJZCA9IGNvbXBvbmVudC5pZCArIE1hcHBDb2NrcGl0Q29tcG9uZW50U2VydmljZS5zZXJ2aWNlTm9kZUlkO1xyXG4gICAgICAgICAgICAgICAgLy8gc3BlY2lmeSB0aGUgQlIgcmVxdWVzdCBjaGFubmVsIGlkXHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXF1ZXN0TWV0aG9kSWQgPSB0aGlzLnJlcXVlc3QuaWQ7XHJcbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIHNlc3Npb24gaWRcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNlc3Npb25JZCA9IGNvbXBvbmVudC5tb2RlbC5fbWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIuX3Nlc3Npb25JZDtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgcmVxdWVzdCBkYXRhIG9iamVjdCBcclxuICAgICAgICAgICAgICAgIGxldCByZXF1ZXN0TWV0aG9kQXJnczogYW55ID0gdGhpcy5jcmVhdGVDaGFuZ2VQYXJhbWV0ZXJTZXRSZXF1ZXN0QXJncyhtb2ZpZmllZFBhcmFtZXRlcnMpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGNhbGwgdGhlIHJlcXVlc3RcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZXhlY3V0ZSB0aGUgcmVxdWVzdCBtZXRob2RcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLmV4ZWN1dGVTZXJ2aWNlTWV0aG9kKHNlc3Npb25JZCwgcmVxdWVzdENoYW5uZWxOb2RlSWQsIHJlcXVlc3RNZXRob2RJZCwgcmVxdWVzdE1ldGhvZEFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlcnZpY2VSZXF1ZXN0UmVzdWx0OkNvbXBvbmVudFNlcnZpY2VSZXF1ZXN0UmVzdWx0ID0gIEpTT04ucGFyc2UocmVzdWx0LmFyZ3MucmVwbHkpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXJ2aWNlUmVxdWVzdFJlc3VsdC5zdGF0dXMgPT09IENvbXBvbmVudFNlcnZpY2VSZXF1ZXN0UmVzdWx0U3RhdGUuYWNjZXB0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIHBlbmRpbmcgcmVxdWVzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFBlbmRpbmdSZXF1ZXN0KHNlcnZpY2VSZXF1ZXN0UmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmV0dXJuIHRydWUgdG8gaW5kaWNhdGUgdGhhdCB0aGUgcmVxdWVzdCBoYXMgYmVlbiBpbnZva2VkIHN1Y2Nlc3NmdWxseS4gICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7ICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk1hcHBDb2NrcGl0Q29tcG9uZW50U2VydmljZTogQ291bGQgbm90IGV4ZWN1dGUgc2VydmljZSBjYWxsIVwiKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJldHVybiBmYWxzZSB0byBpbmRpY2F0ZSB0aGF0IHRoZSByZXF1ZXN0IGhhcyBub3QgYmVlbiBpbnZva2VkIHN1Y2Nlc3NmdWxseS4gICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSByZXF1ZXN0IGFzIHBlbmRpbmdcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRTZXJ2aWNlUmVxdWVzdFJlc3VsdH0gc2VydmljZVJlcXVlc3RSZXN1bHRcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRQZW5kaW5nUmVxdWVzdChzZXJ2aWNlUmVxdWVzdFJlc3VsdDogQ29tcG9uZW50U2VydmljZVJlcXVlc3RSZXN1bHQpIHtcclxuICAgICAgICB0aGlzLl9wZW5kaW5nUmVxdWVzdHMuc2V0KHNlcnZpY2VSZXF1ZXN0UmVzdWx0LnJlcXVlc3RJRCxzZXJ2aWNlUmVxdWVzdFJlc3VsdCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbGVhcnMgYSBwZW5kaW5nIHJlcXVlc3RcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRTZXJ2aWNlUmVxdWVzdFJlc3VsdH0gc2VydmljZVJlcXVlc3RSZXN1bHRcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNsZWFyUGVuZGluZ1JlcXVlc3QocmVxdWVzdElEOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9wZW5kaW5nUmVxdWVzdHMuZGVsZXRlKHJlcXVlc3RJRCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBFeGVjdXRlcyB0aGUgc3BlY2lmaWVkIHNlcnZpY2UgbWV0aG9kXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gc2Vzc2lvbklkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdENoYW5uZWxOb2RlSWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXF1ZXN0TWV0aG9kSWRcclxuICAgICAqIEBwYXJhbSB7Kn0gcmVxdWVzdE1ldGhvZEFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgIHByaXZhdGUgYXN5bmMgZXhlY3V0ZVNlcnZpY2VNZXRob2Qoc2Vzc2lvbklkOiBhbnksIHJlcXVlc3RDaGFubmVsTm9kZUlkOiBzdHJpbmcsIHJlcXVlc3RNZXRob2RJZDogc3RyaW5nLCByZXF1ZXN0TWV0aG9kQXJnczogYW55KTpQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHJldHVybiBhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5leGVjdXRlTWV0aG9kKHNlc3Npb25JZCwgcmVxdWVzdENoYW5uZWxOb2RlSWQsIHJlcXVlc3RNZXRob2RJZCwgcmVxdWVzdE1ldGhvZEFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgbWV0aG9kIGFyZ3MgdG8gc3BlY2lmaXkgdGhlIHJlcXVlc3QgbWV0aG9kXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7KChNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlciB8IHVuZGVmaW5lZClbXSl9IG1vZmlmaWVkUGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVDaGFuZ2VQYXJhbWV0ZXJTZXRSZXF1ZXN0QXJncyhtb2ZpZmllZFBhcmFtZXRlcnM6IChNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlciB8IHVuZGVmaW5lZClbXSkge1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgdGhlIHJlcXVlc3QgaGVhZGVyXHJcbiAgICAgICAgbGV0IHBhcmFtZXRlclNldFdyaXRlUmVxdWVzdDogQ29tcG9uZW50U2VydmljZVJlcXVlc3RDaGFuZ2VQYXJhbWV0ZXJzID0ge1xyXG4gICAgICAgICAgICByZXF1ZXN0U2VuZGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudFNlcnZpY2Uuc2VydmljZVNlbmRlcklkLFxyXG4gICAgICAgICAgICByZXF1ZXN0VHlwZTogQ29tcG9uZW50U2VydmljZVJlcXVlc3RUeXBlLmNoYW5nZVBhcmFtZXRlclNldCxcclxuICAgICAgICAgICAgcmVxdWVzdERhdGE6IFtdXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIHRoZSBtb2RpZmllZCBwYXJhbWV0ZXIgbGlzdCAuLi5cclxuICAgICAgICBjb25zdCBtb2RpZmllZFBhcmFtZXRlckFyZ3M6IE1vZGlmaWVkUGFyYW1ldGVyW10gPSBBcnJheS5mcm9tKCBtb2ZpZmllZFBhcmFtZXRlcnMuZmlsdGVyKChwYXJhbWV0ZXIgKT0+eyByZXR1cm4gcGFyYW1ldGVyICE9IHVuZGVmaW5lZH0pLm1hcCgocGFyYW1ldGVyICk9PntyZXR1cm4geyBrZXk6IHBhcmFtZXRlciEuYnJvd3NlTmFtZSwgdmFsdWU6IHBhcmFtZXRlciEubW9kaWZpZWRWYWx1ZS50b1N0cmluZygpIH0gfSkpO1xyXG4gICAgICAgIC8vIC4uLiBhbmQgcG9wdWxhdGUgdGhlIHJlcXVlc3QgZGF0YVxyXG4gICAgICAgIHBhcmFtZXRlclNldFdyaXRlUmVxdWVzdC5yZXF1ZXN0RGF0YSA9IG1vZGlmaWVkUGFyYW1ldGVyQXJncztcclxuXHJcbiAgICAgICAgLy8gcHJlcGFyZSB0aGUgcmVxdWVzdCBtZXRob2QgYXJncyBieSBjcmVhdGluZyBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgcGF5bG9hZCB3aXRoIHRoZSBzdHJpbmdpZmllZCBKU09OIHJlcXVlc3QgZGF0YVxyXG4gICAgICAgIGxldCByZXF1ZXN0TWV0aG9kQXJnczogYW55ID0ge1xyXG4gICAgICAgICAgICBwYXlsb2FkOiBKU09OLnN0cmluZ2lmeShwYXJhbWV0ZXJTZXRXcml0ZVJlcXVlc3QpLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiByZXF1ZXN0TWV0aG9kQXJncztcclxuICAgIH1cclxuXHJcblxyXG5cclxufSJdfQ==