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
define(["require", "exports", "./opcUaRestServices"], function (require, exports, opcUaRestServices_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Declares supported rest service types
     *
     * @enum {number}
     */
    var RestServiceType;
    (function (RestServiceType) {
        RestServiceType["POST"] = "POST";
        RestServiceType["DELETE"] = "DELETE";
        RestServiceType["GET"] = "GET";
        RestServiceType["PUT"] = "PUT";
        RestServiceType["PATCH"] = "PATCH";
        RestServiceType["Undefined"] = "";
    })(RestServiceType || (RestServiceType = {}));
    exports.RestServiceType = RestServiceType;
    var RestServiceMode;
    (function (RestServiceMode) {
        RestServiceMode[RestServiceMode["EXECUTE"] = 0] = "EXECUTE";
        RestServiceMode[RestServiceMode["BATCH"] = 1] = "BATCH";
    })(RestServiceMode || (RestServiceMode = {}));
    exports.RestServiceMode = RestServiceMode;
    /**
     * Provides a single batch request info
     *
     * @class BatchRequestInfo
     */
    var BatchRequestInfo = /** @class */ (function () {
        /**
         * Constructs an instance of BatchRequestInfo.
         * @param {number} id
         * @param {(string|undefined)} method
         * @param {string} url
         * @param {string} body
         * @memberof BatchRequestInfo
         */
        function BatchRequestInfo(id, method, url, body) {
            this._id = id;
            this._method = method;
            this._url = url;
            this._body = body;
        }
        Object.defineProperty(BatchRequestInfo.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BatchRequestInfo.prototype, "method", {
            get: function () {
                return this._method;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BatchRequestInfo.prototype, "body", {
            get: function () {
                return this._body;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BatchRequestInfo.prototype, "url", {
            get: function () {
                return this._url;
            },
            enumerable: true,
            configurable: true
        });
        /**
     * Creates an instance of BatchRequestInfo.
     * @param {number} id
    * @param {(string|undefined)} method
     * @param {string} url
     * @param {string} body
     * @memberof BatchRequestInfo
     */
        BatchRequestInfo.create = function (id, method, url, body) {
            // create the single batch object
            var singleBatchRequest = {
                id: id,
                method: method,
                url: url,
            };
            // add body data if defined
            if (body) {
                singleBatchRequest.body = body;
                singleBatchRequest.headers = { "Content-Type": "application/json" };
            }
            return singleBatchRequest;
        };
        return BatchRequestInfo;
    }());
    /**
     * Provides rest request info
     *
     * @class RestRequest
     */
    var RestRequestInfo = /** @class */ (function () {
        /**
         * Creates an instance of RestRequest.
         * @param {JQuery.AjaxSettings<any>} settings
         * @memberof RestRequest
         */
        function RestRequestInfo(settings) {
            this._settings = {};
            this._settings = settings;
        }
        Object.defineProperty(RestRequestInfo.prototype, "settings", {
            /**
             * Gets the rest request settings
             *
             * @readonly
             * @type {JQuery.AjaxSettings<any>}
             * @memberof RestRequest
             */
            get: function () {
                return this._settings;
            },
            enumerable: true,
            configurable: true
        });
        return RestRequestInfo;
    }());
    exports.RestRequestInfo = RestRequestInfo;
    /**
     * Implements a basic rest service call
     *
     * @class RestService
     */
    var RestService = /** @class */ (function () {
        function RestService() {
        }
        RestService.call = function (serviceType, serviceUrl, serviceData, serviceHeaders) {
            if (serviceData === void 0) { serviceData = null; }
            if (serviceHeaders === void 0) { serviceHeaders = null; }
            return __awaiter(this, void 0, void 0, function () {
                var restRequest, restServicePromise;
                return __generator(this, function (_a) {
                    restRequest = RestService.createRequest(serviceType, serviceUrl, serviceData, serviceHeaders);
                    restServicePromise = RestService.createRestRequestPromise(restRequest);
                    // attach the request info to the promise
                    restServicePromise.restRequestInfo = restRequest;
                    // return just the request info or wait for executing the requuest
                    return [2 /*return*/, restServicePromise];
                });
            });
        };
        /**
         * Clears the list of requets.
         *
         * @static
         * @memberof RestService
         */
        RestService.clearBatchRequests = function () {
            this._batchRequests = [];
        };
        /**
         * Executes the batch request specfied by the request collection
         *
         * @static
         * @returns {Promise<any>}
         * @memberof RestService
         */
        RestService.executeBatchRequest = function () {
            return __awaiter(this, void 0, void 0, function () {
                var batchResponse;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.callBatchRequest("", this._batchRequests)];
                        case 1:
                            batchResponse = _a.sent();
                            this._batchRequests = [];
                            return [2 /*return*/, batchResponse];
                    }
                });
            });
        };
        /**
         * calls a batch request
         *
         * @static
         * @template T
         * @param {JQuery.AjaxSettings<any>[]} restRequests
         * @memberof RestService
         */
        RestService.callBatchRequest = function (batchServiceBaseUrl, serviceRequests) {
            return __awaiter(this, void 0, void 0, function () {
                var batchRequests, batchRequest, restBatchServicePromise;
                return __generator(this, function (_a) {
                    // calculate the base url in common for all requets
                    batchServiceBaseUrl = this.getBatchRequestBaseUrl(serviceRequests);
                    batchRequests = { requests: RestService.createBatchRequestsData(serviceRequests, batchServiceBaseUrl) };
                    batchRequest = RestService.createRequest(RestServiceType.POST, batchServiceBaseUrl + '/$batch', batchRequests);
                    restBatchServicePromise = RestService.createRestRequestPromise(batchRequest);
                    // return just the request info or wait for executing the requuest
                    return [2 /*return*/, restBatchServicePromise];
                });
            });
        };
        /**
         * Creates and initializes the batch requests from the original single requests
         *
         * @private
         * @static
         * @param {RestRequestInfo[]} serviceRequests
         * @param {string} batchServiceBaseUrl
         * @returns
         * @memberof RestService
         */
        RestService.createBatchRequestsData = function (serviceRequests, batchServiceBaseUrl) {
            // build the batch requests
            var batchRequests = RestService.buildBatchRequests(serviceRequests, batchServiceBaseUrl);
            return batchRequests;
        };
        /**
         *
         *
         * @private
         * @static
         * @param {RestRequestInfo[]} serviceRequests
         * @param {string} batchServiceBaseUrl
         * @returns
         * @memberof RestService
         */
        RestService.buildBatchRequests = function (serviceRequests, batchServiceBaseUrl) {
            var batchRequests = [];
            for (var i = 0; i < serviceRequests.length; i++) {
                var serviceRequest = serviceRequests[i];
                if (serviceRequest.settings.url) {
                    // remove the base url from the single request url
                    var singleRequestUrl = serviceRequest.settings.url.replace(batchServiceBaseUrl, "");
                    // extract service data
                    var requestData = serviceRequest.settings.data ? JSON.parse(serviceRequest.settings.data) : undefined;
                    batchRequests.push(BatchRequestInfo.create(i, serviceRequest.settings.type, singleRequestUrl, requestData));
                }
            }
            return batchRequests;
        };
        /**
         * Calculates the base url which is the same for all requests
         *
         * @static
         * @param {RestRequestInfo[]} serviceRequests
         * @returns {string}
         * @memberof RestService
         */
        RestService.getBatchRequestBaseUrl = function (serviceRequests) {
            // retrieve request urls
            var requestUrls = serviceRequests.map(function (request) { return request.settings.url; }).filter(function (url) { return url !== undefined; });
            // split th urls into their parts
            var requestUrlsSplitted = requestUrls.map(function (requestUrl) { return requestUrl.split("/"); });
            // search for the base url in common for all requests
            var baseUrlDepth = -1;
            var baseUrlFound = false;
            while (!baseUrlFound) {
                // increase the url depth
                baseUrlDepth++;
                // iterate through all request urls ...
                for (var i = 0; i < requestUrlsSplitted.length; i++) {
                    // and check if the base url depth exeeds any single url depth or any of the url parts is deifferent.
                    if (baseUrlDepth >= requestUrlsSplitted[i].length || requestUrlsSplitted[i][baseUrlDepth] != requestUrlsSplitted[0][baseUrlDepth]) {
                        // we ar done with sreaching because the exit criteria is met.
                        baseUrlFound = true;
                        break;
                    }
                }
            }
            // build the base path based und the calculated depth and the first request
            var batchBaseUrl = "";
            for (var i = 0; i < baseUrlDepth; i++) {
                batchBaseUrl += requestUrlsSplitted[0][i] + "/";
            }
            // remove last "/"
            batchBaseUrl = batchBaseUrl.slice(0, batchBaseUrl.length - 1);
            return batchBaseUrl;
        };
        /**
         * Creates a promise enclosing the rest request
         *
         * @private
         * @static
         * @param {RestRequestInfo} restRequest
         * @returns
         * @memberof RestService
         */
        RestService.createRestRequestPromise = function (restRequest) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (opcUaRestServices_1.OpcUaRestServices.mode == RestServiceMode.EXECUTE) {
                    // execute the rest service
                    // attach the callback functions to the promise callbacks
                    restRequest.settings.success = resolve;
                    restRequest.settings.error = reject;
                    // execute rest request
                    $.ajax(restRequest.settings);
                }
                else if (opcUaRestServices_1.OpcUaRestServices.mode == RestServiceMode.BATCH) {
                    // in batch mode we just collect the requests ....
                    _this._batchRequests.push(restRequest);
                    // in batch mode rest request info is returned as result. This allows accumulating multiple requests to be executed within a batch request call.
                    resolve(restRequest);
                }
            });
        };
        /**
         * Creates the basic ajax request info
         *
         * @private
         * @static
         * @param {RestServiceType} serviceType
         * @param {string} serviceUrl
         * @param {(value?: any) => void} resolve
         * @param {(reason?: any) => void} reject
         * @returns {(JQuery.AjaxSettings<any> | undefined)}
         * @memberof RestService
         */
        RestService.createRequest = function (serviceType, serviceUrl, serviceData, serviceHeaders) {
            if (serviceData === void 0) { serviceData = null; }
            if (serviceHeaders === void 0) { serviceHeaders = null; }
            // create and initialize the service request object
            var restRequest = {
                type: serviceType,
                url: serviceUrl,
                xhrFields: {
                    withCredentials: true
                },
                dataType: 'json',
                contentType: 'application/json',
            };
            // set request data if defined
            if (serviceData) {
                restRequest.data = JSON.stringify(serviceData);
            }
            // set headers if defined
            if (serviceHeaders) {
                restRequest.headers = serviceHeaders;
            }
            return new RestRequestInfo(restRequest);
        };
        // holds rest request settings for batch mode
        RestService._batchRequests = [];
        return RestService;
    }());
    exports.RestService = RestService;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdFNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW11bmljYXRpb24vcmVzdC9yZXN0U2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFQTs7OztPQUlHO0lBQ0gsSUFBSyxlQU9KO0lBUEQsV0FBSyxlQUFlO1FBQ2hCLGdDQUFhLENBQUE7UUFDYixvQ0FBaUIsQ0FBQTtRQUNqQiw4QkFBVyxDQUFBO1FBQ1gsOEJBQVcsQ0FBQTtRQUNYLGtDQUFlLENBQUE7UUFDZixpQ0FBYyxDQUFBO0lBQ2xCLENBQUMsRUFQSSxlQUFlLEtBQWYsZUFBZSxRQU9uQjtJQTRXb0IsMENBQWU7SUF6V3BDLElBQUssZUFHSjtJQUhELFdBQUssZUFBZTtRQUNoQiwyREFBTyxDQUFBO1FBQ1AsdURBQUssQ0FBQTtJQUNULENBQUMsRUFISSxlQUFlLEtBQWYsZUFBZSxRQUduQjtJQXNXcUMsMENBQWU7SUF2VnJEOzs7O09BSUc7SUFDSDtRQXlCSTs7Ozs7OztXQU9HO1FBQ0gsMEJBQW9CLEVBQVMsRUFBRSxNQUF1QixFQUFFLEdBQVUsRUFBRSxJQUFXO1lBQzNFLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ2QsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7WUFDdEIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7WUFDaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDdEIsQ0FBQztRQTlCRCxzQkFBVyxnQ0FBRTtpQkFBYjtnQkFDSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7WUFDcEIsQ0FBQzs7O1dBQUE7UUFFRCxzQkFBVyxvQ0FBTTtpQkFBakI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ3hCLENBQUM7OztXQUFBO1FBRUQsc0JBQVcsa0NBQUk7aUJBQWY7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QUFBLGtCQUE0QjtZQUFHLCtCQUFBLEVBQUEscUJBQTZCO1lBRS9ILG1EQUFtRDtZQUNuRCxJQUFJLFdBQVcsR0FBNEI7Z0JBQ3ZDLElBQUksRUFBRSxXQUFXO2dCQUNqQixHQUFHLEVBQUUsVUFBVTtnQkFDZixTQUFTLEVBQUU7b0JBQ1AsZUFBZSxFQUFFLElBQUk7aUJBQ3hCO2dCQUNELFFBQVEsRUFBRSxNQUFNO2dCQUNoQixXQUFXLEVBQUUsa0JBQWtCO2FBQ2xDLENBQUM7WUFFRiw4QkFBOEI7WUFDOUIsSUFBSSxXQUFXLEVBQUU7Z0JBQ2IsV0FBVyxDQUFDLElBQUksR0FBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ25EO1lBQ0QseUJBQXlCO1lBQ3pCLElBQUksY0FBYyxFQUFFO2dCQUNoQixXQUFXLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQzthQUN4QztZQUVELE9BQU8sSUFBSSxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDNUMsQ0FBQztRQWxPRCw2Q0FBNkM7UUFDOUIsMEJBQWMsR0FBc0IsRUFBRSxDQUFDO1FBa08xRCxrQkFBQztLQUFBLEFBdE9ELElBc09DO0lBR08sa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPcGNVYVJlc3RTZXJ2aWNlcyB9IGZyb20gXCIuL29wY1VhUmVzdFNlcnZpY2VzXCI7XHJcblxyXG4vKipcclxuICogRGVjbGFyZXMgc3VwcG9ydGVkIHJlc3Qgc2VydmljZSB0eXBlc1xyXG4gKlxyXG4gKiBAZW51bSB7bnVtYmVyfVxyXG4gKi9cclxuZW51bSBSZXN0U2VydmljZVR5cGV7XHJcbiAgICBQT1NUID0gXCJQT1NUXCIsXHJcbiAgICBERUxFVEUgPSBcIkRFTEVURVwiLCBcclxuICAgIEdFVCA9IFwiR0VUXCIsXHJcbiAgICBQVVQgPSBcIlBVVFwiLFxyXG4gICAgUEFUQ0ggPSBcIlBBVENIXCIsXHJcbiAgICBVbmRlZmluZWQgPSBcIlwiLFxyXG59XHJcblxyXG5cclxuZW51bSBSZXN0U2VydmljZU1vZGV7XHJcbiAgICBFWEVDVVRFLFxyXG4gICAgQkFUQ0gsIFxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIERlY2xhcmVzIHRoZSBzaW5nbGUgYmF0Y2ggcmVxdWVzdCBpbmZvIG1lbWJlcnNcclxuICpcclxuICogQGludGVyZmFjZSBJQmF0Y2hSZXF1ZXN0SW5mb1xyXG4gKi9cclxuaW50ZXJmYWNlIElCYXRjaFJlcXVlc3RJbmZve1xyXG4gICAgaWQ6bnVtYmVyO1xyXG4gICAgbWV0aG9kOnN0cmluZ3x1bmRlZmluZWQ7XHJcbiAgICB1cmw6c3RyaW5nO1xyXG4gICAgYm9keTphbnk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQcm92aWRlcyBhIHNpbmdsZSBiYXRjaCByZXF1ZXN0IGluZm9cclxuICpcclxuICogQGNsYXNzIEJhdGNoUmVxdWVzdEluZm9cclxuICovXHJcbmNsYXNzIEJhdGNoUmVxdWVzdEluZm8gaW1wbGVtZW50cyBJQmF0Y2hSZXF1ZXN0SW5mb3tcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfaWQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX21ldGhvZDogc3RyaW5nfHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX3VybDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfYm9keTogc3RyaW5nO1xyXG5cclxuICAgIFxyXG4gICAgcHVibGljIGdldCBpZCgpIDogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXQgbWV0aG9kKCkgOiBzdHJpbmd8dW5kZWZpbmVkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWV0aG9kO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgYm9keSgpIDogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYm9keTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHVybCgpIDogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdXJsO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnN0cnVjdHMgYW4gaW5zdGFuY2Ugb2YgQmF0Y2hSZXF1ZXN0SW5mby5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpZFxyXG4gICAgICogQHBhcmFtIHsoc3RyaW5nfHVuZGVmaW5lZCl9IG1ldGhvZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHlcclxuICAgICAqIEBtZW1iZXJvZiBCYXRjaFJlcXVlc3RJbmZvXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoaWQ6bnVtYmVyLCBtZXRob2Q6c3RyaW5nfHVuZGVmaW5lZCwgdXJsOnN0cmluZywgYm9keTpzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuX2lkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5fbWV0aG9kID0gbWV0aG9kO1xyXG4gICAgICAgIHRoaXMuX3VybCA9IHVybDtcclxuICAgICAgICB0aGlzLl9ib2R5ID0gYm9keTtcclxuICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEJhdGNoUmVxdWVzdEluZm8uXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaWRcclxuICAgICogQHBhcmFtIHsoc3RyaW5nfHVuZGVmaW5lZCl9IG1ldGhvZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHlcclxuICAgICAqIEBtZW1iZXJvZiBCYXRjaFJlcXVlc3RJbmZvXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjcmVhdGUoaWQ6IG51bWJlciwgbWV0aG9kOiBzdHJpbmcgfCB1bmRlZmluZWQsIHVybDogc3RyaW5nLCBib2R5OiBhbnkpOiBJQmF0Y2hSZXF1ZXN0SW5mbyB7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgc2luZ2xlIGJhdGNoIG9iamVjdFxyXG4gICAgICAgIGxldCBzaW5nbGVCYXRjaFJlcXVlc3Q6YW55ID0ge1xyXG4gICAgICAgICAgICBpZDogaWQsIFxyXG4gICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCwgXHJcbiAgICAgICAgICAgIHVybDogdXJsLCBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGFkZCBib2R5IGRhdGEgaWYgZGVmaW5lZFxyXG4gICAgICAgIGlmIChib2R5KSB7XHJcbiAgICAgICAgICAgIHNpbmdsZUJhdGNoUmVxdWVzdC5ib2R5ID0gYm9keTtcclxuICAgICAgICAgICAgc2luZ2xlQmF0Y2hSZXF1ZXN0LmhlYWRlcnMgPSB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwifTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzaW5nbGVCYXRjaFJlcXVlc3Q7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIFByb3ZpZGVzIHJlc3QgcmVxdWVzdCBpbmZvXHJcbiAqXHJcbiAqIEBjbGFzcyBSZXN0UmVxdWVzdFxyXG4gKi9cclxuY2xhc3MgUmVzdFJlcXVlc3RJbmZve1xyXG4gICAgXHJcbiAgICBwcml2YXRlIF9zZXR0aW5nczpKUXVlcnkuQWpheFNldHRpbmdzPGFueT4gPSB7fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgUmVzdFJlcXVlc3QuXHJcbiAgICAgKiBAcGFyYW0ge0pRdWVyeS5BamF4U2V0dGluZ3M8YW55Pn0gc2V0dGluZ3NcclxuICAgICAqIEBtZW1iZXJvZiBSZXN0UmVxdWVzdFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihzZXR0aW5nczpKUXVlcnkuQWpheFNldHRpbmdzPGFueT4pe1xyXG4gICAgICAgIHRoaXMuX3NldHRpbmdzID0gc2V0dGluZ3M7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSByZXN0IHJlcXVlc3Qgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtKUXVlcnkuQWpheFNldHRpbmdzPGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgUmVzdFJlcXVlc3RcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBzZXR0aW5ncygpIDogSlF1ZXJ5LkFqYXhTZXR0aW5nczxhbnk+ICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NldHRpbmdzO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogSW1wbGVtZW50cyBhIGJhc2ljIHJlc3Qgc2VydmljZSBjYWxsXHJcbiAqXHJcbiAqIEBjbGFzcyBSZXN0U2VydmljZVxyXG4gKi9cclxuY2xhc3MgUmVzdFNlcnZpY2V7XHJcblxyXG5cclxuICAgIC8vIGhvbGRzIHJlc3QgcmVxdWVzdCBzZXR0aW5ncyBmb3IgYmF0Y2ggbW9kZVxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2JhdGNoUmVxdWVzdHM6IFJlc3RSZXF1ZXN0SW5mb1tdID0gW107XHJcblxyXG5cclxuICAgIHN0YXRpYyBhc3luYyBjYWxsPFQ+KHNlcnZpY2VUeXBlOiBSZXN0U2VydmljZVR5cGUsIHNlcnZpY2VVcmw6IHN0cmluZywgc2VydmljZURhdGE6IGFueSB8IG51bGwgPSBudWxsLCBzZXJ2aWNlSGVhZGVyczogYW55fG51bGwgPSBudWxsKTogUHJvbWlzZTxUPiB7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgYmFzaWMgcmVxdWVzdCBkZXNjcmlwdG9yXHJcbiAgICAgICAgbGV0IHJlc3RSZXF1ZXN0ID0gUmVzdFNlcnZpY2UuY3JlYXRlUmVxdWVzdChzZXJ2aWNlVHlwZSwgc2VydmljZVVybCxzZXJ2aWNlRGF0YSwgc2VydmljZUhlYWRlcnMpO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgcHJvbWlzZSBmb3IgdGhlIHJlc3QgcmVxdWVzdFxyXG4gICAgICAgIGNvbnN0IHJlc3RTZXJ2aWNlUHJvbWlzZSA9IFJlc3RTZXJ2aWNlLmNyZWF0ZVJlc3RSZXF1ZXN0UHJvbWlzZTxUPihyZXN0UmVxdWVzdCk7XHJcblxyXG4gICAgICAgIC8vIGF0dGFjaCB0aGUgcmVxdWVzdCBpbmZvIHRvIHRoZSBwcm9taXNlXHJcbiAgICAgICAgKDxhbnk+cmVzdFNlcnZpY2VQcm9taXNlKS5yZXN0UmVxdWVzdEluZm8gPSByZXN0UmVxdWVzdDtcclxuXHJcbiAgICAgICAgLy8gcmV0dXJuIGp1c3QgdGhlIHJlcXVlc3QgaW5mbyBvciB3YWl0IGZvciBleGVjdXRpbmcgdGhlIHJlcXV1ZXN0XHJcbiAgICAgICAgcmV0dXJuICByZXN0U2VydmljZVByb21pc2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xlYXJzIHRoZSBsaXN0IG9mIHJlcXVldHMuXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQG1lbWJlcm9mIFJlc3RTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY2xlYXJCYXRjaFJlcXVlc3RzKCl7XHJcblxyXG4gICAgICAgIHRoaXMuX2JhdGNoUmVxdWVzdHMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEV4ZWN1dGVzIHRoZSBiYXRjaCByZXF1ZXN0IHNwZWNmaWVkIGJ5IHRoZSByZXF1ZXN0IGNvbGxlY3Rpb25cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxyXG4gICAgICogQG1lbWJlcm9mIFJlc3RTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhc3luYyBleGVjdXRlQmF0Y2hSZXF1ZXN0KCk6UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBjb25zdCBiYXRjaFJlc3BvbnNlID0gYXdhaXQgdGhpcy5jYWxsQmF0Y2hSZXF1ZXN0KFwiXCIsdGhpcy5fYmF0Y2hSZXF1ZXN0cyk7XHJcbiAgICAgICAgdGhpcy5fYmF0Y2hSZXF1ZXN0cyA9IFtdO1xyXG4gICAgICAgIHJldHVybiBiYXRjaFJlc3BvbnNlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNhbGxzIGEgYmF0Y2ggcmVxdWVzdFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEB0ZW1wbGF0ZSBUXHJcbiAgICAgKiBAcGFyYW0ge0pRdWVyeS5BamF4U2V0dGluZ3M8YW55PltdfSByZXN0UmVxdWVzdHNcclxuICAgICAqIEBtZW1iZXJvZiBSZXN0U2VydmljZVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXN5bmMgY2FsbEJhdGNoUmVxdWVzdDxUPihiYXRjaFNlcnZpY2VCYXNlVXJsOiBzdHJpbmcsIHNlcnZpY2VSZXF1ZXN0czpSZXN0UmVxdWVzdEluZm9bXSk6IFByb21pc2U8VD4ge1xyXG5cclxuICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIGJhc2UgdXJsIGluIGNvbW1vbiBmb3IgYWxsIHJlcXVldHNcclxuICAgICAgICBiYXRjaFNlcnZpY2VCYXNlVXJsID0gdGhpcy5nZXRCYXRjaFJlcXVlc3RCYXNlVXJsKHNlcnZpY2VSZXF1ZXN0cyk7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgYmF0Y2ggbGlzdFxyXG4gICAgICAgIGxldCBiYXRjaFJlcXVlc3RzID0ge3JlcXVlc3RzOiBSZXN0U2VydmljZS5jcmVhdGVCYXRjaFJlcXVlc3RzRGF0YShzZXJ2aWNlUmVxdWVzdHMsIGJhdGNoU2VydmljZUJhc2VVcmwpIH0gO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgdGhlIGJhdGNoIHJlcXVlc3RcclxuICAgICAgICBsZXQgYmF0Y2hSZXF1ZXN0ID0gUmVzdFNlcnZpY2UuY3JlYXRlUmVxdWVzdChSZXN0U2VydmljZVR5cGUuUE9TVCwgYmF0Y2hTZXJ2aWNlQmFzZVVybCArICcvJGJhdGNoJyAsIGJhdGNoUmVxdWVzdHMgKTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIHByb21pc2UgZm9yIHRoZSByZXN0IGJhdGNoIHJlcXVlc3RcclxuICAgICAgICBjb25zdCByZXN0QmF0Y2hTZXJ2aWNlUHJvbWlzZSA9IFJlc3RTZXJ2aWNlLmNyZWF0ZVJlc3RSZXF1ZXN0UHJvbWlzZTxUPihiYXRjaFJlcXVlc3QpO1xyXG5cclxuICAgICAgICAvLyByZXR1cm4ganVzdCB0aGUgcmVxdWVzdCBpbmZvIG9yIHdhaXQgZm9yIGV4ZWN1dGluZyB0aGUgcmVxdXVlc3RcclxuICAgICAgICByZXR1cm4gIHJlc3RCYXRjaFNlcnZpY2VQcm9taXNlO1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuZCBpbml0aWFsaXplcyB0aGUgYmF0Y2ggcmVxdWVzdHMgZnJvbSB0aGUgb3JpZ2luYWwgc2luZ2xlIHJlcXVlc3RzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7UmVzdFJlcXVlc3RJbmZvW119IHNlcnZpY2VSZXF1ZXN0c1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJhdGNoU2VydmljZUJhc2VVcmxcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgUmVzdFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgY3JlYXRlQmF0Y2hSZXF1ZXN0c0RhdGEoc2VydmljZVJlcXVlc3RzOiBSZXN0UmVxdWVzdEluZm9bXSwgYmF0Y2hTZXJ2aWNlQmFzZVVybDogc3RyaW5nKTogSUJhdGNoUmVxdWVzdEluZm9bXSB7XHJcblxyXG4gICAgICAgIC8vIGJ1aWxkIHRoZSBiYXRjaCByZXF1ZXN0c1xyXG4gICAgICAgIGxldCBiYXRjaFJlcXVlc3RzID0gUmVzdFNlcnZpY2UuYnVpbGRCYXRjaFJlcXVlc3RzKHNlcnZpY2VSZXF1ZXN0cywgYmF0Y2hTZXJ2aWNlQmFzZVVybCk7XHJcblxyXG4gICAgICAgIHJldHVybiBiYXRjaFJlcXVlc3RzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge1Jlc3RSZXF1ZXN0SW5mb1tdfSBzZXJ2aWNlUmVxdWVzdHNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBiYXRjaFNlcnZpY2VCYXNlVXJsXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFJlc3RTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljICBidWlsZEJhdGNoUmVxdWVzdHMoc2VydmljZVJlcXVlc3RzOiBSZXN0UmVxdWVzdEluZm9bXSwgYmF0Y2hTZXJ2aWNlQmFzZVVybDogc3RyaW5nKSB7XHJcblxyXG4gICAgICAgIGxldCBiYXRjaFJlcXVlc3RzOiBJQmF0Y2hSZXF1ZXN0SW5mb1tdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZXJ2aWNlUmVxdWVzdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3Qgc2VydmljZVJlcXVlc3Q6IFJlc3RSZXF1ZXN0SW5mbyA9IHNlcnZpY2VSZXF1ZXN0c1tpXTtcclxuICAgICAgICAgICAgaWYgKHNlcnZpY2VSZXF1ZXN0LnNldHRpbmdzLnVybCkge1xyXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSBiYXNlIHVybCBmcm9tIHRoZSBzaW5nbGUgcmVxdWVzdCB1cmxcclxuICAgICAgICAgICAgICAgIGxldCBzaW5nbGVSZXF1ZXN0VXJsID0gc2VydmljZVJlcXVlc3QuICAgc2V0dGluZ3MudXJsLnJlcGxhY2UoYmF0Y2hTZXJ2aWNlQmFzZVVybCwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAvLyBleHRyYWN0IHNlcnZpY2UgZGF0YVxyXG4gICAgICAgICAgICAgICAgbGV0IHJlcXVlc3REYXRhID0gc2VydmljZVJlcXVlc3Quc2V0dGluZ3MuZGF0YSA/IEpTT04ucGFyc2UoPGFueT5zZXJ2aWNlUmVxdWVzdC5zZXR0aW5ncy5kYXRhKSA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIGJhdGNoUmVxdWVzdHMucHVzaChCYXRjaFJlcXVlc3RJbmZvLmNyZWF0ZShpLCBzZXJ2aWNlUmVxdWVzdC5zZXR0aW5ncy50eXBlLHNpbmdsZVJlcXVlc3RVcmwsIHJlcXVlc3REYXRhKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGJhdGNoUmVxdWVzdHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGVzIHRoZSBiYXNlIHVybCB3aGljaCBpcyB0aGUgc2FtZSBmb3IgYWxsIHJlcXVlc3RzXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtSZXN0UmVxdWVzdEluZm9bXX0gc2VydmljZVJlcXVlc3RzXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFJlc3RTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRCYXRjaFJlcXVlc3RCYXNlVXJsKHNlcnZpY2VSZXF1ZXN0czogUmVzdFJlcXVlc3RJbmZvW10pIDogc3RyaW5ne1xyXG4gICAgICAgIC8vIHJldHJpZXZlIHJlcXVlc3QgdXJsc1xyXG4gICAgICAgIHZhciByZXF1ZXN0VXJsczpzdHJpbmdbXSA9IHNlcnZpY2VSZXF1ZXN0cy5tYXAoKHJlcXVlc3QpPT4gcmVxdWVzdC5zZXR0aW5ncy51cmwpLmZpbHRlciggKHVybCkgPT4ge3JldHVybiB1cmwgIT09IHVuZGVmaW5lZCB9KSBhcyBzdHJpbmdbXTtcclxuICAgICAgICAvLyBzcGxpdCB0aCB1cmxzIGludG8gdGhlaXIgcGFydHNcclxuICAgICAgICB2YXIgcmVxdWVzdFVybHNTcGxpdHRlZCA9IHJlcXVlc3RVcmxzLm1hcCgocmVxdWVzdFVybCk9PiByZXF1ZXN0VXJsLnNwbGl0KFwiL1wiKSk7XHJcblxyXG4gICAgICAgIC8vIHNlYXJjaCBmb3IgdGhlIGJhc2UgdXJsIGluIGNvbW1vbiBmb3IgYWxsIHJlcXVlc3RzXHJcbiAgICAgICAgdmFyIGJhc2VVcmxEZXB0aCA9IC0xO1xyXG4gICAgICAgIHZhciBiYXNlVXJsRm91bmQgPSBmYWxzZTtcclxuICAgICAgICB3aGlsZSAoIWJhc2VVcmxGb3VuZCkge1xyXG4gICAgICAgICAgICAvLyBpbmNyZWFzZSB0aGUgdXJsIGRlcHRoXHJcbiAgICAgICAgICAgIGJhc2VVcmxEZXB0aCsrOyBcclxuICAgICAgICAgICAgLy8gaXRlcmF0ZSB0aHJvdWdoIGFsbCByZXF1ZXN0IHVybHMgLi4uXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVxdWVzdFVybHNTcGxpdHRlZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgLy8gYW5kIGNoZWNrIGlmIHRoZSBiYXNlIHVybCBkZXB0aCBleGVlZHMgYW55IHNpbmdsZSB1cmwgZGVwdGggb3IgYW55IG9mIHRoZSB1cmwgcGFydHMgaXMgZGVpZmZlcmVudC5cclxuICAgICAgICAgICAgICAgIGlmIChiYXNlVXJsRGVwdGggPj0gcmVxdWVzdFVybHNTcGxpdHRlZFtpXS5sZW5ndGggfHwgcmVxdWVzdFVybHNTcGxpdHRlZFtpXVtiYXNlVXJsRGVwdGhdICE9IHJlcXVlc3RVcmxzU3BsaXR0ZWRbMF1bYmFzZVVybERlcHRoXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHdlIGFyIGRvbmUgd2l0aCBzcmVhY2hpbmcgYmVjYXVzZSB0aGUgZXhpdCBjcml0ZXJpYSBpcyBtZXQuXHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZVVybEZvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gYnVpbGQgdGhlIGJhc2UgcGF0aCBiYXNlZCB1bmQgdGhlIGNhbGN1bGF0ZWQgZGVwdGggYW5kIHRoZSBmaXJzdCByZXF1ZXN0XHJcbiAgICAgICAgdmFyIGJhdGNoQmFzZVVybCA9IFwiXCI7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiYXNlVXJsRGVwdGg7IGkrKykge1xyXG4gICAgICAgICAgICBiYXRjaEJhc2VVcmwgKz0gIHJlcXVlc3RVcmxzU3BsaXR0ZWRbMF0hW2ldICsgXCIvXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyByZW1vdmUgbGFzdCBcIi9cIlxyXG4gICAgICAgIGJhdGNoQmFzZVVybCA9IGJhdGNoQmFzZVVybC5zbGljZSgwLGJhdGNoQmFzZVVybC5sZW5ndGgtMSk7XHJcblxyXG4gICAgICAgIHJldHVybiBiYXRjaEJhc2VVcmw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgcHJvbWlzZSBlbmNsb3NpbmcgdGhlIHJlc3QgcmVxdWVzdFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge1Jlc3RSZXF1ZXN0SW5mb30gcmVzdFJlcXVlc3RcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgUmVzdFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgY3JlYXRlUmVzdFJlcXVlc3RQcm9taXNlPFQ+KHJlc3RSZXF1ZXN0OiBSZXN0UmVxdWVzdEluZm8pOiBQcm9taXNlPFQ+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoT3BjVWFSZXN0U2VydmljZXMubW9kZSA9PSBSZXN0U2VydmljZU1vZGUuRVhFQ1VURSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGV4ZWN1dGUgdGhlIHJlc3Qgc2VydmljZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGF0dGFjaCB0aGUgY2FsbGJhY2sgZnVuY3Rpb25zIHRvIHRoZSBwcm9taXNlIGNhbGxiYWNrc1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3RSZXF1ZXN0LnNldHRpbmdzLnN1Y2Nlc3MgPSByZXNvbHZlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3RSZXF1ZXN0LnNldHRpbmdzLmVycm9yID0gcmVqZWN0O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGV4ZWN1dGUgcmVzdCByZXF1ZXN0XHJcbiAgICAgICAgICAgICAgICAgICAgJC5hamF4KHJlc3RSZXF1ZXN0LnNldHRpbmdzKTsgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKE9wY1VhUmVzdFNlcnZpY2VzLm1vZGUgPT0gUmVzdFNlcnZpY2VNb2RlLkJBVENIKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaW4gYmF0Y2ggbW9kZSB3ZSBqdXN0IGNvbGxlY3QgdGhlIHJlcXVlc3RzIC4uLi5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9iYXRjaFJlcXVlc3RzLnB1c2gocmVzdFJlcXVlc3QpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBpbiBiYXRjaCBtb2RlIHJlc3QgcmVxdWVzdCBpbmZvIGlzIHJldHVybmVkIGFzIHJlc3VsdC4gVGhpcyBhbGxvd3MgYWNjdW11bGF0aW5nIG11bHRpcGxlIHJlcXVlc3RzIHRvIGJlIGV4ZWN1dGVkIHdpdGhpbiBhIGJhdGNoIHJlcXVlc3QgY2FsbC5cclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3RSZXF1ZXN0KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBiYXNpYyBhamF4IHJlcXVlc3QgaW5mb1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge1Jlc3RTZXJ2aWNlVHlwZX0gc2VydmljZVR5cGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZXJ2aWNlVXJsXHJcbiAgICAgKiBAcGFyYW0geyh2YWx1ZT86IGFueSkgPT4gdm9pZH0gcmVzb2x2ZVxyXG4gICAgICogQHBhcmFtIHsocmVhc29uPzogYW55KSA9PiB2b2lkfSByZWplY3RcclxuICAgICAqIEByZXR1cm5zIHsoSlF1ZXJ5LkFqYXhTZXR0aW5nczxhbnk+IHwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBSZXN0U2VydmljZVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY3JlYXRlUmVxdWVzdChzZXJ2aWNlVHlwZTogUmVzdFNlcnZpY2VUeXBlLCBzZXJ2aWNlVXJsOiBzdHJpbmcsIHNlcnZpY2VEYXRhOiBhbnkgfCBudWxsPW51bGwgLCBzZXJ2aWNlSGVhZGVyczogYW55fG51bGw9bnVsbCk6IFJlc3RSZXF1ZXN0SW5mb3tcclxuICAgICAgICBcclxuICAgICAgICAvLyBjcmVhdGUgYW5kIGluaXRpYWxpemUgdGhlIHNlcnZpY2UgcmVxdWVzdCBvYmplY3RcclxuICAgICAgICBsZXQgcmVzdFJlcXVlc3Q6SlF1ZXJ5LkFqYXhTZXR0aW5nczxhbnk+ID0ge1xyXG4gICAgICAgICAgICB0eXBlOiBzZXJ2aWNlVHlwZSxcclxuICAgICAgICAgICAgdXJsOiBzZXJ2aWNlVXJsLFxyXG4gICAgICAgICAgICB4aHJGaWVsZHM6IHtcclxuICAgICAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIHNldCByZXF1ZXN0IGRhdGEgaWYgZGVmaW5lZFxyXG4gICAgICAgIGlmIChzZXJ2aWNlRGF0YSkge1xyXG4gICAgICAgICAgICByZXN0UmVxdWVzdC5kYXRhID0gIEpTT04uc3RyaW5naWZ5KHNlcnZpY2VEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gc2V0IGhlYWRlcnMgaWYgZGVmaW5lZFxyXG4gICAgICAgIGlmIChzZXJ2aWNlSGVhZGVycykge1xyXG4gICAgICAgICAgICByZXN0UmVxdWVzdC5oZWFkZXJzID0gc2VydmljZUhlYWRlcnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBuZXcgUmVzdFJlcXVlc3RJbmZvKHJlc3RSZXF1ZXN0KTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCB7UmVzdFNlcnZpY2UsIFJlc3RTZXJ2aWNlVHlwZSwgUmVzdFNlcnZpY2VNb2RlLFJlc3RSZXF1ZXN0SW5mb307Il19