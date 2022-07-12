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
define(["require", "exports", "./opcUaRestResultTypes", "./restService", "../../common/mappCockpitConfig"], function (require, exports, Rest, restService_1, mappCockpitConfig_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Rest = Rest;
    exports.RestServiceMode = restService_1.RestServiceMode;
    /**
     * Implements the rest service calls for mapp Cockpit
     *
     * @class OpcUaRestServices
     */
    var OpcUaRestServices = /** @class */ (function () {
        function OpcUaRestServices() {
        }
        // specifies the rest service end point url
        OpcUaRestServices.getOpcUaRestServiceEndPointUrl = function () {
            return 'opc.tcp://' + this.opcuaIp + ':' + mappCockpitConfig_1.MappCockpitConfiguration.opcUaPort;
        };
        /**
         * Activates batching of single request calls.
         *
         * @static
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.activateBatching = function () {
            // clear existing requests
            restService_1.RestService.clearBatchRequests();
            // switch to batch mode
            this.mode = restService_1.RestServiceMode.BATCH;
        };
        /**
         * Executes the collected batch requests since last "activateBatching"
         *
         * @static
         * @returns {Promise<Map<string,any>>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.executeBatchRequest = function () {
            return __awaiter(this, void 0, void 0, function () {
                var batchRequestResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // switch back to execution mode 
                            this.mode = restService_1.RestServiceMode.EXECUTE;
                            return [4 /*yield*/, restService_1.RestService.executeBatchRequest()];
                        case 1:
                            batchRequestResult = _a.sent();
                            // now we are done and we can clear the requests.
                            restService_1.RestService.clearBatchRequests();
                            // executes the batch request populated with the collected list of single requests.
                            return [2 /*return*/, OpcUaRestServices.getBatchRequestResult(batchRequestResult)];
                    }
                });
            });
        };
        /**
         * Retrieves the batch requests result from the response values
         *
         * @private
         * @static
         * @param {*} batchRequestResult
         * @returns
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.getBatchRequestResult = function (batchRequestResult) {
            // we return the batch result as map requesKey => responseValue
            var batchResultValues = new Map();
            batchRequestResult.responses.forEach(function (singleRequestResult) {
                batchResultValues.set(singleRequestResult.id, singleRequestResult.body);
            });
            return batchResultValues;
        };
        /**
         * reads access configuration data and sets the base url for the rest services
         *
         * @private
         * @static
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.getBaseUrl = function () {
            // get port for RestServiceBaseUrl from mappCockpit config
            return "http://" + location.hostname + ":" + mappCockpitConfig_1.MappCockpitConfiguration.port + "/api/1.0";
        };
        /**
         * Gets the url for reading the opcu local ip address
         *
         * @static
         * @returns {string}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.getOpcUaIpUrl = function () {
            // get resource string for reading the opcua ip address 
            return this.getOpcUaBaseUrl() + "/localip";
        };
        /**
         * gets the base url for opc ua access
         *
         * @static
         * @returns {string}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.getOpcUaBaseUrl = function () {
            return this.getBaseUrl() + "/opcua";
        };
        /**
         * gets the base url for the web socket
         *
         * @private
         * @static
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.getWsBaseUrl = function () {
            // get port for RestServiceBaseUrl from mappCockpit config
            return "ws://" + location.hostname + ":" + mappCockpitConfig_1.MappCockpitConfiguration.port + "/api/1.0/pushchannel";
        };
        /**
         * Reads the ip address to be used for opcua services
         *
         * @static
         * @returns {Promise<string>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.readOpcUaLocalIp = function () {
            return __awaiter(this, void 0, void 0, function () {
                var serviceUrl, result, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            serviceUrl = this.getOpcUaIpUrl();
                            return [4 /*yield*/, restService_1.RestService.call(restService_1.RestServiceType.GET, serviceUrl)];
                        case 1:
                            result = _a.sent();
                            this.opcuaIp = result.ip;
                            return [2 /*return*/, this.opcuaIp];
                        case 2:
                            error_1 = _a.sent();
                            throw new Error(error_1);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * provides authentifictaion for rest service access
         *
         * @static
         * @returns {Promise<number>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.authenticate = function () {
            return __awaiter(this, void 0, void 0, function () {
                var serviceUrl, result, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            serviceUrl = OpcUaRestServices.getBaseUrl() + '/auth';
                            return [4 /*yield*/, restService_1.RestService.call(restService_1.RestServiceType.GET, serviceUrl)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                        case 2:
                            error_2 = _a.sent();
                            throw new Error(error_2);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Changes login to the specified user with
         *
         * @static
         * @param {number} sessionId
         * @param {string} user
         * @param {string} password
         * @returns {Promise<number>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.changeUser = function (sessionId, userInfo) {
            return __awaiter(this, void 0, void 0, function () {
                var serviceData, serviceUrl, userRoles, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            serviceData = { "userIdentityToken": userInfo };
                            serviceUrl = OpcUaRestServices.getOpcUaBaseUrl() + '/sessions/' + sessionId;
                            return [4 /*yield*/, restService_1.RestService.call(restService_1.RestServiceType.PATCH, serviceUrl, serviceData)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, OpcUaRestServices.getUserRoles(userInfo)];
                        case 2:
                            userRoles = _a.sent();
                            // return user roles as login (change user) result
                            return [2 /*return*/, userRoles.roles];
                        case 3:
                            error_3 = _a.sent();
                            throw new Error(error_3);
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Reads a users roles
         *
         * @static
         * @param {{}} userInfo
         * @returns {Promise<{}>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.getUserRoles = function (userInfo) {
            return __awaiter(this, void 0, void 0, function () {
                var headers, serviceUrl, userRoles, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            headers = OpcUaRestServices.createUserRoleAccessHeaders(userInfo);
                            serviceUrl = OpcUaRestServices.getBaseUrl() + '/rbac/myroles';
                            return [4 /*yield*/, restService_1.RestService.call(restService_1.RestServiceType.GET, serviceUrl, null, headers)];
                        case 1:
                            userRoles = _a.sent();
                            return [2 /*return*/, userRoles];
                        case 2:
                            error_4 = _a.sent();
                            throw new Error(error_4);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Creates the headers for accessing user roles
         *
         * @private
         * @static
         * @param {{}} userInfo
         * @returns
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.createUserRoleAccessHeaders = function (userInfo) {
            return {
                "Authorization": "Basic " + btoa(OpcUaRestServices.encode_utf8(userInfo.username) + ":" + OpcUaRestServices.encode_utf8(userInfo.password))
            };
        };
        OpcUaRestServices.encode_utf8 = function (s) {
            return unescape(encodeURIComponent(s));
        };
        /**
         * Creates a new session
         *
         * @static
         * @returns {Promise<string>} The created session id
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.createSession = function () {
            return __awaiter(this, void 0, void 0, function () {
                var serviceUrl, serviceData, result, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            serviceUrl = OpcUaRestServices.getOpcUaBaseUrl() + '/sessions';
                            serviceData = { "url": OpcUaRestServices.getOpcUaRestServiceEndPointUrl(), "userIdentityToken": OpcUaRestServices.defaultUser, "timeout": OpcUaRestServices.opcUaSessionTimeout };
                            return [4 /*yield*/, restService_1.RestService.call(restService_1.RestServiceType.POST, serviceUrl, serviceData)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result.id];
                        case 2:
                            error_5 = _a.sent();
                            throw new Error(error_5);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Deletes a session
         *
         * @static
         * @param {number} sessionId Specifies the session to delete.
         * @returns {Promise<number>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.deleteSession = function (sessionId) {
            return __awaiter(this, void 0, void 0, function () {
                var serviceUrl, error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            serviceUrl = OpcUaRestServices.getOpcUaBaseUrl() + '/sessions/' + sessionId;
                            return [4 /*yield*/, restService_1.RestService.call(restService_1.RestServiceType.DELETE, serviceUrl)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, sessionId];
                        case 2:
                            error_6 = _a.sent();
                            throw new Error(error_6);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * creates a subscription as a container for opc-ua items to be monitored (observed)
         *
         * @static
         * @param {number} sessionId
         * @param {number} [interval=100]
         * @param {boolean} [enabled=true]
         * @returns {Promise<string>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.createSubscription = function (sessionId, interval, enabled) {
            if (interval === void 0) { interval = 50; }
            if (enabled === void 0) { enabled = true; }
            return __awaiter(this, void 0, void 0, function () {
                var serviceUrl, subscriptionSettings, serviceData, result, error_7;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            serviceUrl = OpcUaRestServices.getOpcUaBaseUrl() + '/sessions/' + sessionId + '/subscriptions';
                            subscriptionSettings = {
                                publishingInterval: interval,
                                publishingEnabled: enabled
                            };
                            serviceData = subscriptionSettings;
                            return [4 /*yield*/, restService_1.RestService.call(restService_1.RestServiceType.POST, serviceUrl, serviceData)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result.subscriptionId];
                        case 2:
                            error_7 = _a.sent();
                            throw new Error(error_7);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * deletes a subscription
         *
         * @static
         * @param {number} sessionId
         * @param {*} subscriptionId
         * @returns {Promise<string>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.deleteSubscription = function (sessionId, subscriptionId) {
            return __awaiter(this, void 0, void 0, function () {
                var serviceUrl, serviceData, error_8;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            serviceUrl = OpcUaRestServices.getOpcUaBaseUrl() + '/sessions/' + sessionId + '/subscriptions/' + subscriptionId;
                            serviceData = { "url": OpcUaRestServices.getOpcUaRestServiceEndPointUrl() };
                            return [4 /*yield*/, restService_1.RestService.call(restService_1.RestServiceType.DELETE, serviceUrl, serviceData)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, subscriptionId];
                        case 2:
                            error_8 = _a.sent();
                            throw new Error(error_8);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * create a monitored item
         *
         * @static
         * @param {number} sessionId specifies the service session id
         * @param {string} subscriptionId specifies the subscription id
         * @param {string} nodeId specifies the node to be subscribed
         * @param {OpcUaAttribute} specifies the attribute to be scubscribed
         * @returns {Promise<string>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.createMonitoredItem = function (sessionId, subscriptionId, nodeId, itemId, samplingInterval, attribute) {
            return __awaiter(this, void 0, void 0, function () {
                var serviceUrl, monitorItemSettings, serviceData, result, error_9;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            serviceUrl = OpcUaRestServices.getOpcUaBaseUrl() + '/sessions/' + sessionId + '/subscriptions/' + subscriptionId + '/monitoredItems';
                            monitorItemSettings = {
                                itemToMonitor: {
                                    nodeId: nodeId,
                                    attribute: attribute
                                },
                                monitoringParameters: {
                                    samplingInterval: samplingInterval,
                                    queueSize: 0,
                                    clientHandle: itemId
                                },
                            };
                            serviceData = monitorItemSettings;
                            return [4 /*yield*/, restService_1.RestService.call(restService_1.RestServiceType.POST, serviceUrl, serviceData)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                        case 2:
                            error_9 = _a.sent();
                            throw new Error(error_9);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * deletes a monitored item
         *
         * @static
         * @param {number} sessionId
         * @param {string} subscriptionId
         * @param {*} monitoredItemId
         * @returns {Promise<string>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.deleteMonitoredItem = function (sessionId, subscriptionId, monitoredItemId) {
            return __awaiter(this, void 0, void 0, function () {
                var serviceUrl, result;
                return __generator(this, function (_a) {
                    try {
                        serviceUrl = OpcUaRestServices.getOpcUaBaseUrl() + '/sessions/' + sessionId + '/subscriptions/' + subscriptionId + '/monitoredItems/' + monitoredItemId;
                        result = restService_1.RestService.call(restService_1.RestServiceType.DELETE, serviceUrl);
                        return [2 /*return*/, result];
                    }
                    catch (error) {
                        throw new Error(error);
                    }
                    return [2 /*return*/];
                });
            });
        };
        /**
        * Reads the namespace index for mapp Cockpit services
        *
        * @static
        * @param {number} sessionId
        * @returns {Promise<number>} The index of the namespace
        * @memberof OpcUaRestServices
        */
        OpcUaRestServices.getNamespaceIndex = function (sessionId) {
            return __awaiter(this, void 0, void 0, function () {
                var serviceUrl, result, error_10;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            serviceUrl = OpcUaRestServices.getOpcUaBaseUrl() + '/sessions/' + sessionId + '/namespaces/' + encodeURIComponent(OpcUaRestServices.mappCockpitOpcUaNamespace);
                            return [4 /*yield*/, restService_1.RestService.call(restService_1.RestServiceType.GET, serviceUrl)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result.index];
                        case 2:
                            error_10 = _a.sent();
                            throw new Error(error_10);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Browses the child nodes of the specified parent node
         *
         * @static
         * @param {number} sessionId
         * @param {string} parentNodeId
         * @returns {Promise<any>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.browseNodes = function (sessionId, parentNodeId) {
            return __awaiter(this, void 0, void 0, function () {
                var serviceUrl, result, error_11;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            serviceUrl = OpcUaRestServices.getOpcUaBaseUrl() + '/sessions/' + sessionId + '/nodes/' + encodeURIComponent(parentNodeId) + '/references';
                            return [4 /*yield*/, restService_1.RestService.call(restService_1.RestServiceType.GET, serviceUrl)];
                        case 1:
                            result = _a.sent();
                            // in execution mode we take the and update the browsed node names
                            if (OpcUaRestServices.mode === restService_1.RestServiceMode.EXECUTE) {
                                // Remove NamespaceIndex from browseName
                                result.references.forEach(function (reference) {
                                    var startIndex = reference.browseName.indexOf('"', 0);
                                    startIndex++;
                                    var endIndex = reference.browseName.indexOf('"', startIndex);
                                    reference.browseName = reference.browseName.substr(startIndex, endIndex - startIndex);
                                });
                            }
                            // in execution mode we return the references , in batch mode just the request settings.
                            return [2 /*return*/, OpcUaRestServices.mode === restService_1.RestServiceMode.EXECUTE ? result.references : result];
                        case 2:
                            error_11 = _a.sent();
                            throw new Error(error_11);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * browses the meta info for a component
         *
         * @static
         * @param {number} sessionId
         * @param {string} nodeId
         * @returns {Promise<Array<Rest.InterfaceOpcUaRestResultNodeReference>>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.browseNodeMetaInfo = function (sessionId, nodeId) {
            return __awaiter(this, void 0, void 0, function () {
                var metaInfoReferences, childNodes, metaNodes, metaNode, error_12;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 5, , 6]);
                            metaInfoReferences = undefined;
                            return [4 /*yield*/, OpcUaRestServices.browseNodes(sessionId, nodeId)];
                        case 1:
                            childNodes = _a.sent();
                            metaNodes = childNodes.filter(function (childNode) { return childNode.browseName === OpcUaRestServices.mappCockpitMetaNodeId; });
                            if (!(metaNodes.length === 1)) return [3 /*break*/, 4];
                            metaNode = metaNodes[0];
                            return [4 /*yield*/, OpcUaRestServices.browseNodes(sessionId, metaNode.nodeId)];
                        case 2:
                            // Browse the meta info nodes
                            metaInfoReferences = _a.sent();
                            if (!metaInfoReferences) return [3 /*break*/, 4];
                            return [4 /*yield*/, OpcUaRestServices.browseNodeMetaInfoValues(metaInfoReferences, sessionId)];
                        case 3:
                            // retrieve valid meta nodes
                            metaInfoReferences = _a.sent();
                            _a.label = 4;
                        case 4: return [2 /*return*/, metaInfoReferences];
                        case 5:
                            error_12 = _a.sent();
                            throw error_12;
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Browses and updates the meta info values
         *
         * @private
         * @static
         * @param {Rest.InterfaceOpcUaRestResultNodeReference[]} metaInfoReferences
         * @param {number} sessionId
         * @returns
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.browseNodeMetaInfoValues = function (metaInfoReferences, sessionId) {
            return __awaiter(this, void 0, void 0, function () {
                var readMetaInfoValuesResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            metaInfoReferences = metaInfoReferences.filter(function (parameter) { return parameter.nodeClass === "Variable"; });
                            return [4 /*yield*/, OpcUaRestServices.readMetaInfoValues(metaInfoReferences, sessionId)];
                        case 1:
                            readMetaInfoValuesResult = _a.sent();
                            // assign meta info values
                            OpcUaRestServices.updateMetaInfoValues(readMetaInfoValuesResult, metaInfoReferences);
                            return [2 /*return*/, metaInfoReferences];
                    }
                });
            });
        };
        /**
         * Updates hte meta info values
         *
         * @private
         * @static
         * @param {*} readMetaInfoValuesResult
         * @param {Rest.InterfaceOpcUaRestResultNodeReference[]} metaInfoReferences
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.updateMetaInfoValues = function (readMetaInfoValuesResult, metaInfoReferences) {
            for (var i = 0; i < readMetaInfoValuesResult.responses.length; i++) {
                // get meta info value
                var metaInfoValue = readMetaInfoValuesResult.responses[i].body.value;
                // get response id
                var responseId = readMetaInfoValuesResult.responses[i].id;
                // assign meta info value to corresponding meta value object
                metaInfoReferences[responseId].value = metaInfoValue;
            }
        };
        /**
         * Reads the meta info values
         *
         * @private
         * @static
         * @param {Rest.InterfaceOpcUaRestResultNodeReference[]} metaInfoReferences
         * @param {number} sessionId
         * @returns
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.readMetaInfoValues = function (metaInfoReferences, sessionId) {
            return __awaiter(this, void 0, void 0, function () {
                var readMetaInfoValuesRequests, i, _a, _b, readMetaInfoValuesResult;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            // activate batch mode
                            OpcUaRestServices.mode = restService_1.RestServiceMode.BATCH;
                            readMetaInfoValuesRequests = [];
                            i = 0;
                            _c.label = 1;
                        case 1:
                            if (!(i < metaInfoReferences.length)) return [3 /*break*/, 4];
                            _b = (_a = readMetaInfoValuesRequests).push;
                            return [4 /*yield*/, OpcUaRestServices.readNodeAttribute(sessionId, metaInfoReferences[i].nodeId)];
                        case 2:
                            _b.apply(_a, [_c.sent()]);
                            _c.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4:
                            // eterminate batch mode and excute batch request
                            OpcUaRestServices.mode = restService_1.RestServiceMode.EXECUTE;
                            return [4 /*yield*/, OpcUaRestServices.callBatchRequest(readMetaInfoValuesRequests)];
                        case 5:
                            readMetaInfoValuesResult = _c.sent();
                            return [2 /*return*/, readMetaInfoValuesResult];
                    }
                });
            });
        };
        /**
         * Browses the parameters of the specified node
         *
         * @static
         * @param {number} sessionId
         * @param {string} nodeId
         * @returns {Promise<Array<Rest.InterfaceOpcUaRestResultNodeReference>>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.browseNodeParameters = function (sessionId, nodeId) {
            return __awaiter(this, void 0, void 0, function () {
                var parameterReferences, valueParameterReferences, error_13;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, OpcUaRestServices.browseNodes(sessionId, nodeId)];
                        case 1:
                            parameterReferences = _a.sent();
                            valueParameterReferences = parameterReferences.filter(function (parameter) { return parameter.nodeClass === "Variable"; });
                            return [2 /*return*/, valueParameterReferences];
                        case 2:
                            error_13 = _a.sent();
                            throw new Error(error_13);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Browses the parameter set of a node if any.
         *
         * @static
         * @param {number} sessionId
         * @param {string} nodeId
         * @returns {Promise<Array<OpcUaNodeReferenceInterface>>} The paremeter references
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.browseNodeParameterSet = function (sessionId, nodeId) {
            return __awaiter(this, void 0, void 0, function () {
                var parameterReferences, valueParameterReferences, error_14;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            // Add the sub node id for parameter.
                            nodeId += ".ParameterSet";
                            return [4 /*yield*/, OpcUaRestServices.browseNodes(sessionId, nodeId)];
                        case 1:
                            parameterReferences = (_a.sent());
                            valueParameterReferences = parameterReferences.filter(function (parameter) { return parameter.nodeClass === "Variable"; });
                            return [2 /*return*/, valueParameterReferences];
                        case 2:
                            error_14 = _a.sent();
                            throw new Error(error_14);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Reads the specified node attribute
         *
         * @static
         * @param {number} sessionId
         * @param {string} nodeId
         * @param {*} attribute
         * @param {*} OpcUaAttribute
         * @returns {Promise<any>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.readNodeAttribute = function (sessionId, nodeId, attribute) {
            if (attribute === void 0) { attribute = OpcUaAttribute.VALUE; }
            return __awaiter(this, void 0, void 0, function () {
                var serviceUrl, restServiceResult, error_15;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            serviceUrl = OpcUaRestServices.getOpcUaBaseUrl() + '/sessions/' + sessionId + '/nodes/' + encodeURIComponent(nodeId) + '/attributes/' + attribute;
                            return [4 /*yield*/, restService_1.RestService.call(restService_1.RestServiceType.GET, serviceUrl)];
                        case 1:
                            restServiceResult = (_a.sent());
                            return [2 /*return*/, OpcUaRestServices.mode === restService_1.RestServiceMode.EXECUTE ? restServiceResult.value : restServiceResult];
                        case 2:
                            error_15 = _a.sent();
                            throw new Error(error_15);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Writes the node attribute
         *
         * @static
         * @param {number} sessionId
         * @param {string} nodeId
         * @param {OpcUaAttribute} [attribute=OpcUaAttribute.VALUE]
         * @param {*} value
         * @returns {Promise<any>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.writeNodeAttribute = function (sessionId, nodeId, attribute, value) {
            if (attribute === void 0) { attribute = OpcUaAttribute.VALUE; }
            return __awaiter(this, void 0, void 0, function () {
                var valueData, serviceUrl, error_16;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            valueData = value;
                            if (attribute === OpcUaAttribute.VALUE) {
                                valueData = { "value": value };
                            }
                            serviceUrl = OpcUaRestServices.getOpcUaBaseUrl() + '/sessions/' + sessionId + '/nodes/' + encodeURIComponent(nodeId) + '/attributes/' + attribute;
                            return [4 /*yield*/, restService_1.RestService.call(restService_1.RestServiceType.PUT, serviceUrl, valueData)];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_16 = _a.sent();
                            throw new Error(error_16);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Browses the methods pf the specifed node
         *
         * @static
         * @param {number} sessionId
         * @param {string} nodeId
         * @returns {Promise<Array<Rest.InterfaceOpcUaRestResultNodeReference>>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.browseNodeMethods = function (sessionId, nodeId) {
            return __awaiter(this, void 0, void 0, function () {
                var methodReferences, error_17;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, OpcUaRestServices.browseNodes(sessionId, nodeId)];
                        case 1:
                            methodReferences = (_a.sent()).filter(function (method) { return method.nodeClass === "Method"; });
                            return [2 /*return*/, methodReferences];
                        case 2:
                            error_17 = _a.sent();
                            throw new Error(error_17);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Browses the method set of a node if any.
         *
         * @static
         * @param {number} sessionId
         * @param {string} nodeId
         * @returns {Promise<Array<OpcUaNodeReferenceInterface>>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.browseNodeMethodSet = function (sessionId, nodeId) {
            return __awaiter(this, void 0, void 0, function () {
                var methodReferences, error_18;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            // Add the sub node id for methods.
                            nodeId += ".MethodSet";
                            return [4 /*yield*/, OpcUaRestServices.browseNodes(sessionId, nodeId)];
                        case 1:
                            methodReferences = (_a.sent()).filter(function (method) { return method.nodeClass === "Method"; });
                            return [2 /*return*/, methodReferences];
                        case 2:
                            error_18 = _a.sent();
                            throw new Error(error_18);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Reads the input parameters of a method
         *
         * @static
         * @param {number} sessionId
         * @param {string} nodeId
         * @returns {Promise<any>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.readMethodParameters = function (sessionId, nodeId) {
            return __awaiter(this, void 0, void 0, function () {
                var inputArguments, error_19;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            // Add the sub node id for method parameters.
                            nodeId += "#InputArguments";
                            return [4 /*yield*/, OpcUaRestServices.readNodeAttribute(sessionId, nodeId, OpcUaAttribute.VALUE)];
                        case 1:
                            inputArguments = (_a.sent());
                            return [2 /*return*/, inputArguments];
                        case 2:
                            error_19 = _a.sent();
                            throw new Error(error_19);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Create and call a json batch request
         *
         * @static
         * @param {JQuery.AjaxSettings<any>[]} restRequests
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.callBatchRequest = function (restRequests) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, restService_1.RestService.callBatchRequest(this.getOpcUaBaseUrl(), restRequests)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * Executes the specified method
         *
         * @static
         * @template T_METHOD_RESULT
         * @param {number} sessionId
         * @param {string} nodeId
         * @param {string} methodId
         * @param {*} methodArgs
         * @returns {Promise<T_METHOD_RESULT>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.executeMethod = function (sessionId, nodeId, methodId, methodArgs) {
            return __awaiter(this, void 0, void 0, function () {
                var serviceUrl, result, error_20;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            serviceUrl = OpcUaRestServices.getOpcUaBaseUrl() + '/sessions/' + sessionId + '/nodes/' + encodeURIComponent(nodeId) + '/methods/' + encodeURIComponent(methodId);
                            return [4 /*yield*/, restService_1.RestService.call(restService_1.RestServiceType.POST, serviceUrl, methodArgs)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                        case 2:
                            error_20 = _a.sent();
                            throw new Error(error_20);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Filters the nodes to be displayed in mapp cockpit
         *
         * @static
         * @param {Array<Rest.InterfaceOpcUaRestResultNodeReference>} opcUaNodes
         * @param {string} mappCockpitNamespace
         * @returns
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.filterMappCockpitNodes = function (opcUaNodes, mappCockpitNamespace) {
            return opcUaNodes.filter(function (nodeReference) {
                var isChildNode = nodeReference.isForward === true;
                // check if the node is within the mapp cockpit namespace
                var isMappComponent = nodeReference.typeDefinition.indexOf(mappCockpitNamespace) > -1;
                return isChildNode && isMappComponent;
            });
        };
        // Specifies the mapp Cockpit namespace
        OpcUaRestServices.mappCockpitOpcUaNamespace = "urn:B&R/Diagnosis/mappCockpit";
        // Specifies the mapp Cockpit componente root node id
        OpcUaRestServices.mappCockpitRootNodeId = "i=2100";
        // Specifies the component for reading trace data
        OpcUaRestServices.mappCockpitTraceDataProviderId = "s=NewTraceRecord.MethodSet";
        // Specifies the datapoint name base for reading trace data
        OpcUaRestServices.mappCockpitTraceDataPointNameId = "s=NewTraceRecord.RecordedDataPointName";
        // Specifies the trgger time name for reading trace data
        OpcUaRestServices.mappCockpitTraceTriggerTime = "s=NewTraceRecord.TriggerTime";
        OpcUaRestServices.mappCockpitTraceDataPointCount = 32;
        // Specifies the component for reading trace data
        OpcUaRestServices.mappCockpitTraceReadDataMethodId = "s=NewTraceRecord.GetRecordedDataArray";
        // specifies the root node id for enum definitions
        OpcUaRestServices.mappCockpitEnumsId = "ns=0;i=29";
        // specifies the meta info node id
        OpcUaRestServices.mappCockpitMetaNodeId = "$BrMetaInfo";
        // specifies the namespace prefix string
        OpcUaRestServices.mappCockpitNamespacePrefix = "ns=";
        // specifies the sampling rate for montitoring items
        OpcUaRestServices.monitoringSamplingInterval = 100;
        // specifies the service mode
        OpcUaRestServices.mode = restService_1.RestServiceMode.EXECUTE;
        // specifies the service channel id
        OpcUaRestServices.serviceChannelNodeId = "$BrComm";
        // specifies the opc ua rest services address an set it to localhost. This is necessary to make sure that the rest connection works with NAT.
        OpcUaRestServices.opcuaIp = '127.0.0.1';
        // specifies the default user settings
        OpcUaRestServices.defaultUser = { username: "Anonymous", password: "" };
        // specifies the session timeout. The value is set to 0 as a workoround to disable the session timeout until we can provider proper refresh.
        OpcUaRestServices.opcUaSessionTimeout = 0;
        return OpcUaRestServices;
    }());
    exports.OpcUaRestServices = OpcUaRestServices;
    /**
     * Defines OpcUa Attribute names.
     *
     * @enum {number}
     */
    var OpcUaAttribute;
    (function (OpcUaAttribute) {
        OpcUaAttribute["VALUE"] = "Value";
        OpcUaAttribute["DATA_TYPE"] = "DataType";
        OpcUaAttribute["BROWSE_NAME"] = "BrowseName";
        OpcUaAttribute["DISPLAY_NAME"] = "DisplayName";
        OpcUaAttribute["DESCRIPTION"] = "Description";
        OpcUaAttribute["USER_ACCESS_LEVEL"] = "UserAccessLevel";
    })(OpcUaAttribute || (OpcUaAttribute = {}));
    exports.OpcUaAttribute = OpcUaAttribute;
    /**
     * Specifies access levels ( as bit flags )
     *
     * @enum {number}
     */
    var OpcUaAccessLevel;
    (function (OpcUaAccessLevel) {
        OpcUaAccessLevel[OpcUaAccessLevel["CurrentRead"] = 1] = "CurrentRead";
        OpcUaAccessLevel[OpcUaAccessLevel["CurrentWrite"] = 2] = "CurrentWrite";
        OpcUaAccessLevel[OpcUaAccessLevel["HistoryRead"] = 4] = "HistoryRead";
        OpcUaAccessLevel[OpcUaAccessLevel["HistoryWrite"] = 8] = "HistoryWrite";
        OpcUaAccessLevel[OpcUaAccessLevel["SemanticChange"] = 16] = "SemanticChange";
        OpcUaAccessLevel[OpcUaAccessLevel["StatusWrite"] = 32] = "StatusWrite";
        OpcUaAccessLevel[OpcUaAccessLevel["TimestampWrite"] = 64] = "TimestampWrite";
        OpcUaAccessLevel[OpcUaAccessLevel["Reserved"] = 128] = "Reserved";
    })(OpcUaAccessLevel || (OpcUaAccessLevel = {}));
    exports.OpcUaAccessLevel = OpcUaAccessLevel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BjVWFSZXN0U2VydmljZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW11bmljYXRpb24vcmVzdC9vcGNVYVJlc3RTZXJ2aWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUF3ekI0QixvQkFBSTtJQUFFLDBCQXZ6QkksNkJBQWUsQ0F1ekJKO0lBcHpCakQ7Ozs7T0FJRztJQUNIO1FBQUE7UUE2d0JBLENBQUM7UUFsdUJHLDJDQUEyQztRQUNwQyxnREFBOEIsR0FBckM7WUFDSSxPQUFPLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsR0FBRyw0Q0FBd0IsQ0FBQyxTQUFTLENBQUM7UUFDbEYsQ0FBQztRQVNEOzs7OztXQUtHO1FBQ0ksa0NBQWdCLEdBQXZCO1lBQ0ksMEJBQTBCO1lBQzFCLHlCQUFXLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUNqQyx1QkFBdUI7WUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyw2QkFBZSxDQUFDLEtBQUssQ0FBQztRQUN0QyxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ1UscUNBQW1CLEdBQWhDOzs7Ozs7NEJBRUksaUNBQWlDOzRCQUNqQyxJQUFJLENBQUMsSUFBSSxHQUFHLDZCQUFlLENBQUMsT0FBTyxDQUFDOzRCQUNYLHFCQUFNLHlCQUFXLENBQUMsbUJBQW1CLEVBQUUsRUFBQTs7NEJBQTVELGtCQUFrQixHQUFHLFNBQXVDOzRCQUVoRSxpREFBaUQ7NEJBQ2pELHlCQUFXLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzs0QkFFakMsbUZBQW1GOzRCQUNuRixzQkFBTyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFDOzs7O1NBR3RFO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDWSx1Q0FBcUIsR0FBcEMsVUFBcUMsa0JBQXVCO1lBRXhELCtEQUErRDtZQUMvRCxJ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SUFDSCxJQUFLLGNBT0o7SUFQRCxXQUFLLGNBQWM7UUFDZixpQ0FBZSxDQUFBO1FBQ2Ysd0NBQXNCLENBQUE7UUFDdEIsNENBQTBCLENBQUE7UUFDMUIsOENBQTRCLENBQUE7UUFDNUIsNkNBQTJCLENBQUE7UUFDM0IsdURBQXFDLENBQUE7SUFDekMsQ0FBQyxFQVBJLGNBQWMsS0FBZCxjQUFjLFFBT2xCO0lBcUJpRCx3Q0FBYztJQW5CaEU7Ozs7T0FJRztJQUNILElBQUssZ0JBU0o7SUFURCxXQUFLLGdCQUFnQjtRQUNqQixxRUFBa0IsQ0FBQTtRQUNsQix1RUFBbUIsQ0FBQTtRQUNuQixxRUFBa0IsQ0FBQTtRQUNsQix1RUFBbUIsQ0FBQTtRQUNuQiw0RUFBcUIsQ0FBQTtRQUNyQixzRUFBa0IsQ0FBQTtRQUNsQiw0RUFBcUIsQ0FBQTtRQUNyQixpRUFBZSxDQUFBO0lBQ25CLENBQUMsRUFUSSxnQkFBZ0IsS0FBaEIsZ0JBQWdCLFFBU3BCO0lBS2lFLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlc3QgZnJvbSBcIi4vb3BjVWFSZXN0UmVzdWx0VHlwZXNcIjtcclxuaW1wb3J0IHsgUmVzdFNlcnZpY2UsIFJlc3RTZXJ2aWNlVHlwZSxSZXN0U2VydmljZU1vZGUsIFJlc3RSZXF1ZXN0SW5mbyB9IGZyb20gXCIuL3Jlc3RTZXJ2aWNlXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29uZmlndXJhdGlvbiB9IGZyb20gXCIuLi8uLi9jb21tb24vbWFwcENvY2twaXRDb25maWdcIjtcclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRzIHRoZSByZXN0IHNlcnZpY2UgY2FsbHMgZm9yIG1hcHAgQ29ja3BpdFxyXG4gKlxyXG4gKiBAY2xhc3MgT3BjVWFSZXN0U2VydmljZXNcclxuICovXHJcbmNsYXNzIE9wY1VhUmVzdFNlcnZpY2VzIHtcclxuXHJcbiAgICAvLyBTcGVjaWZpZXMgdGhlIG1hcHAgQ29ja3BpdCBuYW1lc3BhY2VcclxuICAgIHN0YXRpYyByZWFkb25seSBtYXBwQ29ja3BpdE9wY1VhTmFtZXNwYWNlOiBzdHJpbmcgPSBcInVybjpCJlIvRGlhZ25vc2lzL21hcHBDb2NrcGl0XCI7XHJcblxyXG4gICAgLy8gU3BlY2lmaWVzIHRoZSBtYXBwIENvY2twaXQgY29tcG9uZW50ZSByb290IG5vZGUgaWRcclxuICAgIHN0YXRpYyByZWFkb25seSBtYXBwQ29ja3BpdFJvb3ROb2RlSWQ6IHN0cmluZyA9IFwiaT0yMTAwXCI7XHJcblxyXG4gICAgLy8gU3BlY2lmaWVzIHRoZSBjb21wb25lbnQgZm9yIHJlYWRpbmcgdHJhY2UgZGF0YVxyXG4gICAgc3RhdGljIHJlYWRvbmx5IG1hcHBDb2NrcGl0VHJhY2VEYXRhUHJvdmlkZXJJZDogc3RyaW5nID0gXCJzPU5ld1RyYWNlUmVjb3JkLk1ldGhvZFNldFwiO1xyXG5cclxuICAgIC8vIFNwZWNpZmllcyB0aGUgZGF0YXBvaW50IG5hbWUgYmFzZSBmb3IgcmVhZGluZyB0cmFjZSBkYXRhXHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgbWFwcENvY2twaXRUcmFjZURhdGFQb2ludE5hbWVJZDogc3RyaW5nID0gXCJzPU5ld1RyYWNlUmVjb3JkLlJlY29yZGVkRGF0YVBvaW50TmFtZVwiO1xyXG5cclxuICAgIC8vIFNwZWNpZmllcyB0aGUgdHJnZ2VyIHRpbWUgbmFtZSBmb3IgcmVhZGluZyB0cmFjZSBkYXRhXHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgbWFwcENvY2twaXRUcmFjZVRyaWdnZXJUaW1lOiBzdHJpbmcgPSBcInM9TmV3VHJhY2VSZWNvcmQuVHJpZ2dlclRpbWVcIjtcclxuXHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgbWFwcENvY2twaXRUcmFjZURhdGFQb2ludENvdW50OiBudW1iZXIgPSAzMjtcclxuXHJcbiAgICAvLyBTcGVjaWZpZXMgdGhlIGNvbXBvbmVudCBmb3IgcmVhZGluZyB0cmFjZSBkYXRhXHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgbWFwcENvY2twaXRUcmFjZVJlYWREYXRhTWV0aG9kSWQ6IHN0cmluZyA9IFwicz1OZXdUcmFjZVJlY29yZC5HZXRSZWNvcmRlZERhdGFBcnJheVwiO1xyXG5cclxuICAgIC8vIHNwZWNpZmllcyB0aGUgcm9vdCBub2RlIGlkIGZvciBlbnVtIGRlZmluaXRpb25zXHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgbWFwcENvY2twaXRFbnVtc0lkOiBzdHJpbmcgPSBcIm5zPTA7aT0yOVwiO1xyXG5cclxuICAgIC8vIHNwZWNpZmllcyB0aGUgbWV0YSBpbmZvIG5vZGUgaWRcclxuICAgIHN0YXRpYyByZWFkb25seSBtYXBwQ29ja3BpdE1ldGFOb2RlSWQ6c3RyaW5nID0gXCIkQnJNZXRhSW5mb1wiO1xyXG5cclxuICAgIC8vIHNwZWNpZmllcyB0aGUgbmFtZXNwYWNlIHByZWZpeCBzdHJpbmdcclxuICAgIHN0YXRpYyByZWFkb25seSBtYXBwQ29ja3BpdE5hbWVzcGFjZVByZWZpeDogc3RyaW5nID0gXCJucz1cIjtcclxuXHJcbiAgICAvLyBzcGVjaWZpZXMgdGhlIHNhbXBsaW5nIHJhdGUgZm9yIG1vbnRpdG9yaW5nIGl0ZW1zXHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgbW9uaXRvcmluZ1NhbXBsaW5nSW50ZXJ2YWw6IG51bWJlciA9IDEwMDtcclxuICAgIFxyXG4gICAgLy8gc3BlY2lmaWVzIHRoZSBzZXJ2aWNlIG1vZGVcclxuICAgIHN0YXRpYyBtb2RlOiBSZXN0U2VydmljZU1vZGUgPSBSZXN0U2VydmljZU1vZGUuRVhFQ1VURTtcclxuXHJcbiAgICAvLyBzcGVjaWZpZXMgdGhlIHNlcnZpY2UgY2hhbm5lbCBpZFxyXG4gICAgc3RhdGljIHJlYWRvbmx5IHNlcnZpY2VDaGFubmVsTm9kZUlkOnN0cmluZyA9IFwiJEJyQ29tbVwiO1xyXG5cclxuICAgIC8vIHNwZWNpZmllcyB0aGUgb3BjIHVhIHJlc3Qgc2VydmljZXMgYWRkcmVzcyBhbiBzZXQgaXQgdG8gbG9jYWxob3N0LiBUaGlzIGlzIG5lY2Vzc2FyeSB0byBtYWtlIHN1cmUgdGhhdCB0aGUgcmVzdCBjb25uZWN0aW9uIHdvcmtzIHdpdGggTkFULlxyXG4gICAgc3RhdGljIG9wY3VhSXAgPSAnMTI3LjAuMC4xJztcclxuXHJcbiAgICAvLyBzcGVjaWZpZXMgdGhlIHJlc3Qgc2VydmljZSBlbmQgcG9pbnQgdXJsXHJcbiAgICBzdGF0aWMgZ2V0T3BjVWFSZXN0U2VydmljZUVuZFBvaW50VXJsKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuICdvcGMudGNwOi8vJyArIHRoaXMub3BjdWFJcCArICc6JyArIE1hcHBDb2NrcGl0Q29uZmlndXJhdGlvbi5vcGNVYVBvcnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc3BlY2lmaWVzIHRoZSBkZWZhdWx0IHVzZXIgc2V0dGluZ3NcclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IGRlZmF1bHRVc2VyID0geyB1c2VybmFtZTogXCJBbm9ueW1vdXNcIiwgcGFzc3dvcmQ6IFwiXCIgfTtcclxuXHJcbiAgICAvLyBzcGVjaWZpZXMgdGhlIHNlc3Npb24gdGltZW91dC4gVGhlIHZhbHVlIGlzIHNldCB0byAwIGFzIGEgd29ya29yb3VuZCB0byBkaXNhYmxlIHRoZSBzZXNzaW9uIHRpbWVvdXQgdW50aWwgd2UgY2FuIHByb3ZpZGVyIHByb3BlciByZWZyZXNoLlxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgb3BjVWFTZXNzaW9uVGltZW91dCA9IDA7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWN0aXZhdGVzIGJhdGNoaW5nIG9mIHNpbmdsZSByZXF1ZXN0IGNhbGxzLlxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYWN0aXZhdGVCYXRjaGluZygpe1xyXG4gICAgICAgIC8vIGNsZWFyIGV4aXN0aW5nIHJlcXVlc3RzXHJcbiAgICAgICAgUmVzdFNlcnZpY2UuY2xlYXJCYXRjaFJlcXVlc3RzKCk7XHJcbiAgICAgICAgLy8gc3dpdGNoIHRvIGJhdGNoIG1vZGVcclxuICAgICAgICB0aGlzLm1vZGUgPSBSZXN0U2VydmljZU1vZGUuQkFUQ0g7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeGVjdXRlcyB0aGUgY29sbGVjdGVkIGJhdGNoIHJlcXVlc3RzIHNpbmNlIGxhc3QgXCJhY3RpdmF0ZUJhdGNoaW5nXCJcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxNYXA8c3RyaW5nLGFueT4+fVxyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhc3luYyBleGVjdXRlQmF0Y2hSZXF1ZXN0KCk6UHJvbWlzZTxNYXA8c3RyaW5nLGFueT4+e1xyXG5cclxuICAgICAgICAvLyBzd2l0Y2ggYmFjayB0byBleGVjdXRpb24gbW9kZSBcclxuICAgICAgICB0aGlzLm1vZGUgPSBSZXN0U2VydmljZU1vZGUuRVhFQ1VURTtcclxuICAgICAgICBsZXQgYmF0Y2hSZXF1ZXN0UmVzdWx0ID0gYXdhaXQgUmVzdFNlcnZpY2UuZXhlY3V0ZUJhdGNoUmVxdWVzdCgpO1xyXG5cclxuICAgICAgICAvLyBub3cgd2UgYXJlIGRvbmUgYW5kIHdlIGNhbiBjbGVhciB0aGUgcmVxdWVzdHMuXHJcbiAgICAgICAgUmVzdFNlcnZpY2UuY2xlYXJCYXRjaFJlcXVlc3RzKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZXhlY3V0ZXMgdGhlIGJhdGNoIHJlcXVlc3QgcG9wdWxhdGVkIHdpdGggdGhlIGNvbGxlY3RlZCBsaXN0IG9mIHNpbmdsZSByZXF1ZXN0cy5cclxuICAgICAgICByZXR1cm4gT3BjVWFSZXN0U2VydmljZXMuZ2V0QmF0Y2hSZXF1ZXN0UmVzdWx0KGJhdGNoUmVxdWVzdFJlc3VsdCk7O1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMgdGhlIGJhdGNoIHJlcXVlc3RzIHJlc3VsdCBmcm9tIHRoZSByZXNwb25zZSB2YWx1ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHsqfSBiYXRjaFJlcXVlc3RSZXN1bHRcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0QmF0Y2hSZXF1ZXN0UmVzdWx0KGJhdGNoUmVxdWVzdFJlc3VsdDogYW55KSB7XHJcblxyXG4gICAgICAgIC8vIHdlIHJldHVybiB0aGUgYmF0Y2ggcmVzdWx0IGFzIG1hcCByZXF1ZXNLZXkgPT4gcmVzcG9uc2VWYWx1ZVxyXG4gICAgICAgIGxldCBiYXRjaFJlc3VsdFZhbHVlczogTWFwPHN0cmluZywgYW55PiA9IG5ldyBNYXAoKTtcclxuXHJcbiAgICAgICAgYmF0Y2hSZXF1ZXN0UmVzdWx0LnJlc3BvbnNlcy5mb3JFYWNoKHNpbmdsZVJlcXVlc3RSZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICBiYXRjaFJlc3VsdFZhbHVlcy5zZXQoc2luZ2xlUmVxdWVzdFJlc3VsdC5pZCwgc2luZ2xlUmVxdWVzdFJlc3VsdC5ib2R5KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gYmF0Y2hSZXN1bHRWYWx1ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWFkcyBhY2Nlc3MgY29uZmlndXJhdGlvbiBkYXRhIGFuZCBzZXRzIHRoZSBiYXNlIHVybCBmb3IgdGhlIHJlc3Qgc2VydmljZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRCYXNlVXJsKCk6IHN0cmluZyB7XHJcbiAgICAgICAgIC8vIGdldCBwb3J0IGZvciBSZXN0U2VydmljZUJhc2VVcmwgZnJvbSBtYXBwQ29ja3BpdCBjb25maWdcclxuICAgICAgICByZXR1cm4gXCJodHRwOi8vXCIgKyBsb2NhdGlvbi5ob3N0bmFtZSArIFwiOlwiICsgTWFwcENvY2twaXRDb25maWd1cmF0aW9uLnBvcnQgKyBcIi9hcGkvMS4wXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSB1cmwgZm9yIHJlYWRpbmcgdGhlIG9wY3UgbG9jYWwgaXAgYWRkcmVzc1xyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldE9wY1VhSXBVcmwoKTogc3RyaW5nIHtcclxuICAgICAgICAvLyBnZXQgcmVzb3VyY2Ugc3RyaW5nIGZvciByZWFkaW5nIHRoZSBvcGN1YSBpcCBhZGRyZXNzIFxyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wY1VhQmFzZVVybCgpICsgXCIvbG9jYWxpcFwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyB0aGUgYmFzZSB1cmwgZm9yIG9wYyB1YSBhY2Nlc3NcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRPcGNVYUJhc2VVcmwoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRCYXNlVXJsKCkgKyBcIi9vcGN1YVwiO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgdGhlIGJhc2UgdXJsIGZvciB0aGUgd2ViIHNvY2tldFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldFdzQmFzZVVybCgpOiBzdHJpbmcge1xyXG4gICAgICAgIC8vIGdldCBwb3J0IGZvciBSZXN0U2VydmljZUJhc2VVcmwgZnJvbSBtYXBwQ29ja3BpdCBjb25maWdcclxuICAgICAgICByZXR1cm4gXCJ3czovL1wiICsgbG9jYXRpb24uaG9zdG5hbWUgKyBcIjpcIiArIE1hcHBDb2NrcGl0Q29uZmlndXJhdGlvbi5wb3J0ICsgXCIvYXBpLzEuMC9wdXNoY2hhbm5lbFwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgdGhlIGlwIGFkZHJlc3MgdG8gYmUgdXNlZCBmb3Igb3BjdWEgc2VydmljZXNcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzdHJpbmc+fVxyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhc3luYyByZWFkT3BjVWFMb2NhbElwKCk6UHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgICB0cnkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHNlcnZpY2VVcmwgPSB0aGlzLmdldE9wY1VhSXBVcmwoKTtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgUmVzdFNlcnZpY2UuY2FsbDxhbnk+KFJlc3RTZXJ2aWNlVHlwZS5HRVQsIHNlcnZpY2VVcmwpO1xyXG4gICAgICAgICAgICB0aGlzLm9wY3VhSXAgPSByZXN1bHQuaXA7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9wY3VhSXA7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcHJvdmlkZXMgYXV0aGVudGlmaWN0YWlvbiBmb3IgcmVzdCBzZXJ2aWNlIGFjY2Vzc1xyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPG51bWJlcj59XHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIGF1dGhlbnRpY2F0ZSgpOiBQcm9taXNlPG51bWJlcj4ge1xyXG4gICAgICAgIHRyeSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgc2VydmljZVVybCA9IE9wY1VhUmVzdFNlcnZpY2VzLmdldEJhc2VVcmwoKSArICcvYXV0aCc7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBhd2FpdCBSZXN0U2VydmljZS5jYWxsPGFueT4oUmVzdFNlcnZpY2VUeXBlLkdFVCwgc2VydmljZVVybCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGFuZ2VzIGxvZ2luIHRvIHRoZSBzcGVjaWZpZWQgdXNlciB3aXRoXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXNzd29yZFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8bnVtYmVyPn1cclxuICAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXN5bmMgY2hhbmdlVXNlcihzZXNzaW9uSWQ6IG51bWJlciwgdXNlckluZm86IHt9KTogUHJvbWlzZTx7fT4ge1xyXG4gICAgICAgIHRyeSB7XHJcblxyXG4gICAgICAgICAgICAvL3sgdXNlcm5hbWU6IHVzZXIsIHBhc3N3b3JkOiBwYXNzd29yZCB9IFxyXG4gICAgICAgICAgICB2YXIgc2VydmljZURhdGEgPSB7IFwidXNlcklkZW50aXR5VG9rZW5cIjogdXNlckluZm8gfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNlcnZpY2VVcmwgPSBPcGNVYVJlc3RTZXJ2aWNlcy5nZXRPcGNVYUJhc2VVcmwoKSArICcvc2Vzc2lvbnMvJyArIHNlc3Npb25JZDtcclxuICAgICAgICAgICAgYXdhaXQgUmVzdFNlcnZpY2UuY2FsbChSZXN0U2VydmljZVR5cGUuUEFUQ0gsIHNlcnZpY2VVcmwsIHNlcnZpY2VEYXRhKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFmdGVyIHN1Y2Nlc3NmdWxsIGxvZ2luIHdlIHJlYWQgdGhlIHVzZXJzIHJvbGVzXHJcbiAgICAgICAgICAgIGxldCB1c2VyUm9sZXMgPSBhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5nZXRVc2VyUm9sZXModXNlckluZm8pO1xyXG4gICAgICAgICAgICAvLyByZXR1cm4gdXNlciByb2xlcyBhcyBsb2dpbiAoY2hhbmdlIHVzZXIpIHJlc3VsdFxyXG4gICAgICAgICAgICByZXR1cm4gKDxhbnk+dXNlclJvbGVzKS5yb2xlcztcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyBhIHVzZXJzIHJvbGVzXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHt7fX0gdXNlckluZm9cclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHt9Pn1cclxuICAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXN5bmMgZ2V0VXNlclJvbGVzKHVzZXJJbmZvOiB7fSk6IFByb21pc2U8e30+IHtcclxuICAgICAgICB0cnkge1xyXG5cclxuICAgICAgICAgICAgbGV0IGhlYWRlcnMgPSBPcGNVYVJlc3RTZXJ2aWNlcy5jcmVhdGVVc2VyUm9sZUFjY2Vzc0hlYWRlcnModXNlckluZm8pO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc2VydmljZVVybCA9IE9wY1VhUmVzdFNlcnZpY2VzLmdldEJhc2VVcmwoKSArICcvcmJhYy9teXJvbGVzJztcclxuICAgICAgICAgICAgbGV0IHVzZXJSb2xlcyA9IGF3YWl0IFJlc3RTZXJ2aWNlLmNhbGw8e30+KFJlc3RTZXJ2aWNlVHlwZS5HRVQsIHNlcnZpY2VVcmwsIG51bGwsIGhlYWRlcnMpO1xyXG4gICAgICAgICAgICByZXR1cm4gdXNlclJvbGVzO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgaGVhZGVycyBmb3IgYWNjZXNzaW5nIHVzZXIgcm9sZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHt7fX0gdXNlckluZm9cclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgY3JlYXRlVXNlclJvbGVBY2Nlc3NIZWFkZXJzKHVzZXJJbmZvOiB7fSkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIFwiICsgYnRvYShPcGNVYVJlc3RTZXJ2aWNlcy5lbmNvZGVfdXRmOCgoPGFueT51c2VySW5mbykudXNlcm5hbWUpICsgXCI6XCIgKyBPcGNVYVJlc3RTZXJ2aWNlcy5lbmNvZGVfdXRmOCgoPGFueT51c2VySW5mbykucGFzc3dvcmQpKVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZW5jb2RlX3V0Zjgocykge1xyXG4gICAgICAgIHJldHVybiB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQocykpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgc2Vzc2lvblxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHN0cmluZz59IFRoZSBjcmVhdGVkIHNlc3Npb24gaWRcclxuICAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXN5bmMgY3JlYXRlU2Vzc2lvbigpOiBQcm9taXNlPG51bWJlcj4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhciBzZXJ2aWNlVXJsID0gT3BjVWFSZXN0U2VydmljZXMuZ2V0T3BjVWFCYXNlVXJsKCkgKyAnL3Nlc3Npb25zJztcclxuICAgICAgICAgICAgLy8gY3JlYXRlIGEgc2Vzc2lvbiB3aXRoIGRlZmF1bHQgdXNlciBhY2Nlc3MgcmlnaHRzIGFuZCBhIHRpbWVvdXRcclxuICAgICAgICAgICAgdmFyIHNlcnZpY2VEYXRhID0geyBcInVybFwiOiBPcGNVYVJlc3RTZXJ2aWNlcy5nZXRPcGNVYVJlc3RTZXJ2aWNlRW5kUG9pbnRVcmwoKSwgXCJ1c2VySWRlbnRpdHlUb2tlblwiOiBPcGNVYVJlc3RTZXJ2aWNlcy5kZWZhdWx0VXNlciAsIFwidGltZW91dFwiOiBPcGNVYVJlc3RTZXJ2aWNlcy5vcGNVYVNlc3Npb25UaW1lb3V0IH07XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBhd2FpdCBSZXN0U2VydmljZS5jYWxsPGFueT4oUmVzdFNlcnZpY2VUeXBlLlBPU1QsIHNlcnZpY2VVcmwsIHNlcnZpY2VEYXRhKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5pZDtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZXRlcyBhIHNlc3Npb25cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vzc2lvbklkIFNwZWNpZmllcyB0aGUgc2Vzc2lvbiB0byBkZWxldGUuXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxudW1iZXI+fVxyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhc3luYyBkZWxldGVTZXNzaW9uKHNlc3Npb25JZDogbnVtYmVyKTogUHJvbWlzZTxudW1iZXI+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBzZXJ2aWNlVXJsID0gT3BjVWFSZXN0U2VydmljZXMuZ2V0T3BjVWFCYXNlVXJsKCkgKyAnL3Nlc3Npb25zLycgKyBzZXNzaW9uSWQ7XHJcbiAgICAgICAgICAgIGF3YWl0IFJlc3RTZXJ2aWNlLmNhbGwoUmVzdFNlcnZpY2VUeXBlLkRFTEVURSwgc2VydmljZVVybCk7XHJcbiAgICAgICAgICAgIHJldHVybiBzZXNzaW9uSWQ7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGVzIGEgc3Vic2NyaXB0aW9uIGFzIGEgY29udGFpbmVyIGZvciBvcGMtdWEgaXRlbXMgdG8gYmUgbW9uaXRvcmVkIChvYnNlcnZlZClcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vzc2lvbklkXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2ludGVydmFsPTEwMF1cclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2VuYWJsZWQ9dHJ1ZV1cclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHN0cmluZz59XHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIGNyZWF0ZVN1YnNjcmlwdGlvbihzZXNzaW9uSWQ6IG51bWJlciwgaW50ZXJ2YWw6IG51bWJlciA9IDUwLCBlbmFibGVkOiBib29sZWFuID0gdHJ1ZSk6IFByb21pc2U8bnVtYmVyPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gZGVmaW5lIGJhZXMgdXJsXHJcbiAgICAgICAgICAgIHZhciBzZXJ2aWNlVXJsID0gT3BjVWFSZXN0U2VydmljZXMuZ2V0T3BjVWFCYXNlVXJsKCkgKyAnL3Nlc3Npb25zLycgKyBzZXNzaW9uSWQgKyAnL3N1YnNjcmlwdGlvbnMnO1xyXG5cclxuICAgICAgICAgICAgLy8gZGVmaW5lIHN1YnNjcml0aW9uIHNldHRpbmdzXHJcbiAgICAgICAgICAgIGxldCBzdWJzY3JpcHRpb25TZXR0aW5ncyA9IHtcclxuICAgICAgICAgICAgICAgIHB1Ymxpc2hpbmdJbnRlcnZhbDogaW50ZXJ2YWwsXHJcbiAgICAgICAgICAgICAgICBwdWJsaXNoaW5nRW5hYmxlZDogZW5hYmxlZFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAvLyBjYWxsIHRoZSBzZXJ2aWNlIHdpdGggdGhlIHNwZWNpZmllZCBwYXJhbWV0ZXJzICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBzZXJ2aWNlRGF0YSA9IHN1YnNjcmlwdGlvblNldHRpbmdzO1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gYXdhaXQgUmVzdFNlcnZpY2UuY2FsbDxhbnk+KFJlc3RTZXJ2aWNlVHlwZS5QT1NULCBzZXJ2aWNlVXJsLCBzZXJ2aWNlRGF0YSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQuc3Vic2NyaXB0aW9uSWQ7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkZWxldGVzIGEgc3Vic2NyaXB0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZFxyXG4gICAgICogQHBhcmFtIHsqfSBzdWJzY3JpcHRpb25JZFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nPn1cclxuICAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXN5bmMgZGVsZXRlU3Vic2NyaXB0aW9uKHNlc3Npb25JZDogbnVtYmVyLCBzdWJzY3JpcHRpb25JZDogbnVtYmVyKTogUHJvbWlzZTxudW1iZXI+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgc2VydmljZVVybCA9IE9wY1VhUmVzdFNlcnZpY2VzLmdldE9wY1VhQmFzZVVybCgpICsgJy9zZXNzaW9ucy8nICsgc2Vzc2lvbklkICsgJy9zdWJzY3JpcHRpb25zLycgKyBzdWJzY3JpcHRpb25JZDtcclxuICAgICAgICAgICAgdmFyIHNlcnZpY2VEYXRhID0geyBcInVybFwiOiBPcGNVYVJlc3RTZXJ2aWNlcy5nZXRPcGNVYVJlc3RTZXJ2aWNlRW5kUG9pbnRVcmwoKSB9O1xyXG4gICAgICAgICAgICBhd2FpdCBSZXN0U2VydmljZS5jYWxsPGFueT4oUmVzdFNlcnZpY2VUeXBlLkRFTEVURSwgc2VydmljZVVybCwgc2VydmljZURhdGEpO1xyXG4gICAgICAgICAgICByZXR1cm4gc3Vic2NyaXB0aW9uSWQ7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGUgYSBtb25pdG9yZWQgaXRlbVxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZXNzaW9uSWQgc3BlY2lmaWVzIHRoZSBzZXJ2aWNlIHNlc3Npb24gaWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdWJzY3JpcHRpb25JZCBzcGVjaWZpZXMgdGhlIHN1YnNjcmlwdGlvbiBpZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5vZGVJZCBzcGVjaWZpZXMgdGhlIG5vZGUgdG8gYmUgc3Vic2NyaWJlZFxyXG4gICAgICogQHBhcmFtIHtPcGNVYUF0dHJpYnV0ZX0gc3BlY2lmaWVzIHRoZSBhdHRyaWJ1dGUgdG8gYmUgc2N1YnNjcmliZWRcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHN0cmluZz59XHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIGNyZWF0ZU1vbml0b3JlZEl0ZW0oc2Vzc2lvbklkOiBudW1iZXIsIHN1YnNjcmlwdGlvbklkOiBudW1iZXIsIG5vZGVJZDogc3RyaW5nLCBpdGVtSWQ6IG51bWJlciwgc2FtcGxpbmdJbnRlcnZhbDogbnVtYmVyLCBhdHRyaWJ1dGU6IE9wY1VhQXR0cmlidXRlKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBkZWZpbmUgYmFlcyB1cmxcclxuICAgICAgICAgICAgdmFyIHNlcnZpY2VVcmwgPSBPcGNVYVJlc3RTZXJ2aWNlcy5nZXRPcGNVYUJhc2VVcmwoKSArICcvc2Vzc2lvbnMvJyArIHNlc3Npb25JZCArICcvc3Vic2NyaXB0aW9ucy8nICsgc3Vic2NyaXB0aW9uSWQgKyAnL21vbml0b3JlZEl0ZW1zJztcclxuXHJcbiAgICAgICAgICAgIC8vIGRlZmluZSBtb25pdG9yIGl0ZW0gc2V0dGluZ3NcclxuICAgICAgICAgICAgY29uc3QgbW9uaXRvckl0ZW1TZXR0aW5ncyA9IHtcclxuICAgICAgICAgICAgICAgIGl0ZW1Ub01vbml0b3I6IHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlSWQ6IG5vZGVJZCxcclxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGU6IGF0dHJpYnV0ZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBtb25pdG9yaW5nUGFyYW1ldGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNhbXBsaW5nSW50ZXJ2YWw6IHNhbXBsaW5nSW50ZXJ2YWwsXHJcbiAgICAgICAgICAgICAgICAgICAgcXVldWVTaXplOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsaWVudEhhbmRsZTogaXRlbUlkXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNhbGwgdGhlIHNlcnZpY2Ugd2l0aCB0aGUgc3BlY2lmaWVkIHBhcmFtZXRlcnMgICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHNlcnZpY2VEYXRhID0gbW9uaXRvckl0ZW1TZXR0aW5ncztcclxuXHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBhd2FpdCBSZXN0U2VydmljZS5jYWxsPGFueT4oUmVzdFNlcnZpY2VUeXBlLlBPU1QsIHNlcnZpY2VVcmwsIHNlcnZpY2VEYXRhKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZGVsZXRlcyBhIG1vbml0b3JlZCBpdGVtXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN1YnNjcmlwdGlvbklkXHJcbiAgICAgKiBAcGFyYW0geyp9IG1vbml0b3JlZEl0ZW1JZFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nPn1cclxuICAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgIGFzeW5jIGRlbGV0ZU1vbml0b3JlZEl0ZW0oc2Vzc2lvbklkOiBzdHJpbmcsIHN1YnNjcmlwdGlvbklkOiBudW1iZXIsIG1vbml0b3JlZEl0ZW1JZDogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBkZWZpbmUgYmFlcyB1cmxcclxuICAgICAgICAgICAgdmFyIHNlcnZpY2VVcmwgPSBPcGNVYVJlc3RTZXJ2aWNlcy5nZXRPcGNVYUJhc2VVcmwoKSArICcvc2Vzc2lvbnMvJyArIHNlc3Npb25JZCArICcvc3Vic2NyaXB0aW9ucy8nICsgc3Vic2NyaXB0aW9uSWQgKyAnL21vbml0b3JlZEl0ZW1zLycgKyBtb25pdG9yZWRJdGVtSWQ7XHJcbiAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gUmVzdFNlcnZpY2UuY2FsbChSZXN0U2VydmljZVR5cGUuREVMRVRFLCBzZXJ2aWNlVXJsKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFJlYWRzIHRoZSBuYW1lc3BhY2UgaW5kZXggZm9yIG1hcHAgQ29ja3BpdCBzZXJ2aWNlcyBcclxuICAgICpcclxuICAgICogQHN0YXRpY1xyXG4gICAgKiBAcGFyYW0ge251bWJlcn0gc2Vzc2lvbklkXHJcbiAgICAqIEByZXR1cm5zIHtQcm9taXNlPG51bWJlcj59IFRoZSBpbmRleCBvZiB0aGUgbmFtZXNwYWNlXHJcbiAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgKi9cclxuICAgIHN0YXRpYyBhc3luYyBnZXROYW1lc3BhY2VJbmRleChzZXNzaW9uSWQ6IG51bWJlcik6IFByb21pc2U8bnVtYmVyPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIHNlcnZpY2VVcmwgPSBPcGNVYVJlc3RTZXJ2aWNlcy5nZXRPcGNVYUJhc2VVcmwoKSArICcvc2Vzc2lvbnMvJyArIHNlc3Npb25JZCArICcvbmFtZXNwYWNlcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KE9wY1VhUmVzdFNlcnZpY2VzLm1hcHBDb2NrcGl0T3BjVWFOYW1lc3BhY2UpO1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gYXdhaXQgUmVzdFNlcnZpY2UuY2FsbDxhbnk+KFJlc3RTZXJ2aWNlVHlwZS5HRVQsIHNlcnZpY2VVcmwpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0LmluZGV4O1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBCcm93c2VzIHRoZSBjaGlsZCBub2RlcyBvZiB0aGUgc3BlY2lmaWVkIHBhcmVudCBub2RlXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhcmVudE5vZGVJZFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cclxuICAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXN5bmMgYnJvd3NlTm9kZXMoc2Vzc2lvbklkOiBudW1iZXIsIHBhcmVudE5vZGVJZDogc3RyaW5nKTogUHJvbWlzZTxBcnJheTxSZXN0LkludGVyZmFjZU9wY1VhUmVzdFJlc3VsdE5vZGVSZWZlcmVuY2U+PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIHNlcnZpY2VVcmwgPSBPcGNVYVJlc3RTZXJ2aWNlcy5nZXRPcGNVYUJhc2VVcmwoKSArICcvc2Vzc2lvbnMvJyArIHNlc3Npb25JZCArICcvbm9kZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChwYXJlbnROb2RlSWQpICsgJy9yZWZlcmVuY2VzJztcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGF3YWl0IFJlc3RTZXJ2aWNlLmNhbGw8UmVzdC5JbnRlcmZhY2VPcGNVYVJlc3RSZXN1bHRSZWZlcmVuY2VzVmFsdWU+KFJlc3RTZXJ2aWNlVHlwZS5HRVQsIHNlcnZpY2VVcmwpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gaW4gZXhlY3V0aW9uIG1vZGUgd2UgdGFrZSB0aGUgYW5kIHVwZGF0ZSB0aGUgYnJvd3NlZCBub2RlIG5hbWVzXHJcbiAgICAgICAgICAgIGlmIChPcGNVYVJlc3RTZXJ2aWNlcy5tb2RlID09PSBSZXN0U2VydmljZU1vZGUuRVhFQ1VURSkge1xyXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIE5hbWVzcGFjZUluZGV4IGZyb20gYnJvd3NlTmFtZVxyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnJlZmVyZW5jZXMuZm9yRWFjaChyZWZlcmVuY2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdGFydEluZGV4ID0gcmVmZXJlbmNlLmJyb3dzZU5hbWUuaW5kZXhPZignXCInLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydEluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVuZEluZGV4ID0gcmVmZXJlbmNlLmJyb3dzZU5hbWUuaW5kZXhPZignXCInLCBzdGFydEluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICByZWZlcmVuY2UuYnJvd3NlTmFtZSA9IHJlZmVyZW5jZS5icm93c2VOYW1lLnN1YnN0cihzdGFydEluZGV4LCBlbmRJbmRleCAtIHN0YXJ0SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGluIGV4ZWN1dGlvbiBtb2RlIHdlIHJldHVybiB0aGUgcmVmZXJlbmNlcyAsIGluIGJhdGNoIG1vZGUganVzdCB0aGUgcmVxdWVzdCBzZXR0aW5ncy5cclxuICAgICAgICAgICAgcmV0dXJuIE9wY1VhUmVzdFNlcnZpY2VzLm1vZGUgPT09IFJlc3RTZXJ2aWNlTW9kZS5FWEVDVVRFID8gKDxhbnk+cmVzdWx0LnJlZmVyZW5jZXMpIDogcmVzdWx0OyAgICAgICAgICAgXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBicm93c2VzIHRoZSBtZXRhIGluZm8gZm9yIGEgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5vZGVJZFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8UmVzdC5JbnRlcmZhY2VPcGNVYVJlc3RSZXN1bHROb2RlUmVmZXJlbmNlPj59XHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgIHN0YXRpYyBhc3luYyBicm93c2VOb2RlTWV0YUluZm8oc2Vzc2lvbklkOiBudW1iZXIsIG5vZGVJZDogc3RyaW5nKTogUHJvbWlzZTxBcnJheTxSZXN0LkludGVyZmFjZU9wY1VhUmVzdFJlc3VsdE5vZGVSZWZlcmVuY2U+fHVuZGVmaW5lZD4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBtZXRhSW5mb1JlZmVyZW5jZXM6QXJyYXk8UmVzdC5JbnRlcmZhY2VPcGNVYVJlc3RSZXN1bHROb2RlUmVmZXJlbmNlPnx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICAvLyByZWFkIHRoZSBjaGlsZCBub2Rlc1xyXG4gICAgICAgICAgICBsZXQgY2hpbGROb2RlcyA9IGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLmJyb3dzZU5vZGVzKHNlc3Npb25JZCwgbm9kZUlkKTtcclxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGNoaWxkIG5vZGVzIGNvbnRhaW4gYSBtZXRhIG5vZGVcclxuICAgICAgICAgICAgbGV0IG1ldGFOb2RlcyA9IGNoaWxkTm9kZXMuZmlsdGVyKChjaGlsZE5vZGUpPT57IHJldHVybiBjaGlsZE5vZGUuYnJvd3NlTmFtZSA9PT0gIE9wY1VhUmVzdFNlcnZpY2VzLm1hcHBDb2NrcGl0TWV0YU5vZGVJZDt9KVxyXG4gICAgICAgICAgICBpZiAobWV0YU5vZGVzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgLy8gQWRkIHRoZSBzdWIgbm9kZSBpZCBmb3IgcGFyYW1ldGVyLlxyXG4gICAgICAgICAgICAgICAgbGV0IG1ldGFOb2RlID0gbWV0YU5vZGVzWzBdO1xyXG4gICAgICAgICAgICAgICAgLy8gQnJvd3NlIHRoZSBtZXRhIGluZm8gbm9kZXNcclxuICAgICAgICAgICAgICAgIG1ldGFJbmZvUmVmZXJlbmNlcyA9IGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLmJyb3dzZU5vZGVzKHNlc3Npb25JZCwgbWV0YU5vZGUubm9kZUlkKTtcclxuICAgICAgICAgICAgICAgIGlmIChtZXRhSW5mb1JlZmVyZW5jZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyByZXRyaWV2ZSB2YWxpZCBtZXRhIG5vZGVzXHJcbiAgICAgICAgICAgICAgICAgICAgbWV0YUluZm9SZWZlcmVuY2VzID0gYXdhaXQgT3BjVWFSZXN0U2VydmljZXMuYnJvd3NlTm9kZU1ldGFJbmZvVmFsdWVzKG1ldGFJbmZvUmVmZXJlbmNlcywgc2Vzc2lvbklkKTsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtZXRhSW5mb1JlZmVyZW5jZXM7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJyb3dzZXMgYW5kIHVwZGF0ZXMgdGhlIG1ldGEgaW5mbyB2YWx1ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtSZXN0LkludGVyZmFjZU9wY1VhUmVzdFJlc3VsdE5vZGVSZWZlcmVuY2VbXX0gbWV0YUluZm9SZWZlcmVuY2VzXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vzc2lvbklkXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGFzeW5jIGJyb3dzZU5vZGVNZXRhSW5mb1ZhbHVlcyhtZXRhSW5mb1JlZmVyZW5jZXM6IFJlc3QuSW50ZXJmYWNlT3BjVWFSZXN0UmVzdWx0Tm9kZVJlZmVyZW5jZVtdLCBzZXNzaW9uSWQ6IG51bWJlcikge1xyXG5cclxuICAgICAgICBtZXRhSW5mb1JlZmVyZW5jZXMgPSBtZXRhSW5mb1JlZmVyZW5jZXMuZmlsdGVyKChwYXJhbWV0ZXIpID0+IHsgcmV0dXJuIHBhcmFtZXRlci5ub2RlQ2xhc3MgPT09IFwiVmFyaWFibGVcIjsgfSk7XHJcblxyXG4gICAgICAgIC8vIHJlYWQgbWV0YSBpbmZvIHZhbHVlc1xyXG4gICAgICAgIGxldCByZWFkTWV0YUluZm9WYWx1ZXNSZXN1bHQgPSBhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5yZWFkTWV0YUluZm9WYWx1ZXMobWV0YUluZm9SZWZlcmVuY2VzLCBzZXNzaW9uSWQpO1xyXG5cclxuICAgICAgICAvLyBhc3NpZ24gbWV0YSBpbmZvIHZhbHVlc1xyXG4gICAgICAgIE9wY1VhUmVzdFNlcnZpY2VzLnVwZGF0ZU1ldGFJbmZvVmFsdWVzKHJlYWRNZXRhSW5mb1ZhbHVlc1Jlc3VsdCwgbWV0YUluZm9SZWZlcmVuY2VzKTtcclxuICAgICAgICByZXR1cm4gbWV0YUluZm9SZWZlcmVuY2VzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyBodGUgbWV0YSBpbmZvIHZhbHVlc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0geyp9IHJlYWRNZXRhSW5mb1ZhbHVlc1Jlc3VsdFxyXG4gICAgICogQHBhcmFtIHtSZXN0LkludGVyZmFjZU9wY1VhUmVzdFJlc3VsdE5vZGVSZWZlcmVuY2VbXX0gbWV0YUluZm9SZWZlcmVuY2VzXHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdXBkYXRlTWV0YUluZm9WYWx1ZXMocmVhZE1ldGFJbmZvVmFsdWVzUmVzdWx0OiBhbnksIG1ldGFJbmZvUmVmZXJlbmNlczogUmVzdC5JbnRlcmZhY2VPcGNVYVJlc3RSZXN1bHROb2RlUmVmZXJlbmNlW10pIHtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZWFkTWV0YUluZm9WYWx1ZXNSZXN1bHQucmVzcG9uc2VzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBnZXQgbWV0YSBpbmZvIHZhbHVlXHJcbiAgICAgICAgICAgIGNvbnN0IG1ldGFJbmZvVmFsdWUgPSByZWFkTWV0YUluZm9WYWx1ZXNSZXN1bHQucmVzcG9uc2VzW2ldLmJvZHkudmFsdWU7XHJcbiAgICAgICAgICAgIC8vIGdldCByZXNwb25zZSBpZFxyXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZUlkID0gcmVhZE1ldGFJbmZvVmFsdWVzUmVzdWx0LnJlc3BvbnNlc1tpXS5pZDtcclxuICAgICAgICAgICAgLy8gYXNzaWduIG1ldGEgaW5mbyB2YWx1ZSB0byBjb3JyZXNwb25kaW5nIG1ldGEgdmFsdWUgb2JqZWN0XHJcbiAgICAgICAgICAgICg8YW55Pm1ldGFJbmZvUmVmZXJlbmNlc1tyZXNwb25zZUlkXSkudmFsdWUgPSBtZXRhSW5mb1ZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIHRoZSBtZXRhIGluZm8gdmFsdWVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7UmVzdC5JbnRlcmZhY2VPcGNVYVJlc3RSZXN1bHROb2RlUmVmZXJlbmNlW119IG1ldGFJbmZvUmVmZXJlbmNlc1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBhc3luYyByZWFkTWV0YUluZm9WYWx1ZXMobWV0YUluZm9SZWZlcmVuY2VzOiBSZXN0LkludGVyZmFjZU9wY1VhUmVzdFJlc3VsdE5vZGVSZWZlcmVuY2VbXSwgc2Vzc2lvbklkOiBudW1iZXIpIHtcclxuXHJcbiAgICAgICAgLy8gYWN0aXZhdGUgYmF0Y2ggbW9kZVxyXG4gICAgICAgIE9wY1VhUmVzdFNlcnZpY2VzLm1vZGUgPSBSZXN0U2VydmljZU1vZGUuQkFUQ0g7XHJcbiAgICAgICAgbGV0IHJlYWRNZXRhSW5mb1ZhbHVlc1JlcXVlc3RzOiBSZXN0UmVxdWVzdEluZm9bXSA9IFtdO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgcmVxdWVzdHMgZm9yIHJlYWRpbmcgdGhlIG1ldGEgaW5mbyBub2Rlcy92YWx1ZXNcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1ldGFJbmZvUmVmZXJlbmNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICByZWFkTWV0YUluZm9WYWx1ZXNSZXF1ZXN0cy5wdXNoKGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLnJlYWROb2RlQXR0cmlidXRlKHNlc3Npb25JZCwgbWV0YUluZm9SZWZlcmVuY2VzW2ldLm5vZGVJZCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZXRlcm1pbmF0ZSBiYXRjaCBtb2RlIGFuZCBleGN1dGUgYmF0Y2ggcmVxdWVzdFxyXG4gICAgICAgIE9wY1VhUmVzdFNlcnZpY2VzLm1vZGUgPSBSZXN0U2VydmljZU1vZGUuRVhFQ1VURTtcclxuICAgICAgICBsZXQgcmVhZE1ldGFJbmZvVmFsdWVzUmVzdWx0ID0gYXdhaXQgT3BjVWFSZXN0U2VydmljZXMuY2FsbEJhdGNoUmVxdWVzdChyZWFkTWV0YUluZm9WYWx1ZXNSZXF1ZXN0cyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHJlYWRNZXRhSW5mb1ZhbHVlc1Jlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJyb3dzZXMgdGhlIHBhcmFtZXRlcnMgb2YgdGhlIHNwZWNpZmllZCBub2RlXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5vZGVJZFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8UmVzdC5JbnRlcmZhY2VPcGNVYVJlc3RSZXN1bHROb2RlUmVmZXJlbmNlPj59XHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIGJyb3dzZU5vZGVQYXJhbWV0ZXJzKHNlc3Npb25JZDogbnVtYmVyLCBub2RlSWQ6IHN0cmluZyk6IFByb21pc2U8QXJyYXk8UmVzdC5JbnRlcmZhY2VPcGNVYVJlc3RSZXN1bHROb2RlUmVmZXJlbmNlPj4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIEJyb3dzZSB0aGUgcGFyYW1ldGVyIHNldCBhbmQgZXh0cmFjdCB2YXJpYWJsZSB0eXBlcyBvbmx5LlxyXG5cclxuICAgICAgICAgICAgdmFyIHBhcmFtZXRlclJlZmVyZW5jZXMgPSBhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5icm93c2VOb2RlcyhzZXNzaW9uSWQsIG5vZGVJZCk7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZVBhcmFtZXRlclJlZmVyZW5jZXMgPSBwYXJhbWV0ZXJSZWZlcmVuY2VzLmZpbHRlcigocGFyYW1ldGVyKSA9PiB7IHJldHVybiBwYXJhbWV0ZXIubm9kZUNsYXNzID09PSBcIlZhcmlhYmxlXCIgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZVBhcmFtZXRlclJlZmVyZW5jZXM7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCcm93c2VzIHRoZSBwYXJhbWV0ZXIgc2V0IG9mIGEgbm9kZSBpZiBhbnkuXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5vZGVJZFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8T3BjVWFOb2RlUmVmZXJlbmNlSW50ZXJmYWNlPj59IFRoZSBwYXJlbWV0ZXIgcmVmZXJlbmNlc1xyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhc3luYyBicm93c2VOb2RlUGFyYW1ldGVyU2V0KHNlc3Npb25JZDogbnVtYmVyLCBub2RlSWQ6IHN0cmluZyk6IFByb21pc2U8QXJyYXk8UmVzdC5JbnRlcmZhY2VPcGNVYVJlc3RSZXN1bHROb2RlUmVmZXJlbmNlPj4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIEFkZCB0aGUgc3ViIG5vZGUgaWQgZm9yIHBhcmFtZXRlci5cclxuICAgICAgICAgICAgbm9kZUlkICs9IFwiLlBhcmFtZXRlclNldFwiO1xyXG4gICAgICAgICAgICAvLyBCcm93c2UgdGhlIHBhcmFtZXRlciBzZXQgYW5kIGV4dHJhY3QgdmFyaWFibGUgdHlwZXMgb25seS5cclxuXHJcbiAgICAgICAgICAgIHZhciBwYXJhbWV0ZXJSZWZlcmVuY2VzID0gKGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLmJyb3dzZU5vZGVzKHNlc3Npb25JZCwgbm9kZUlkKSk7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZVBhcmFtZXRlclJlZmVyZW5jZXMgPSBwYXJhbWV0ZXJSZWZlcmVuY2VzLmZpbHRlcigocGFyYW1ldGVyKSA9PiB7IHJldHVybiBwYXJhbWV0ZXIubm9kZUNsYXNzID09PSBcIlZhcmlhYmxlXCIgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZVBhcmFtZXRlclJlZmVyZW5jZXM7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIHRoZSBzcGVjaWZpZWQgbm9kZSBhdHRyaWJ1dGVcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vzc2lvbklkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbm9kZUlkXHJcbiAgICAgKiBAcGFyYW0geyp9IGF0dHJpYnV0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBPcGNVYUF0dHJpYnV0ZVxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cclxuICAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXN5bmMgcmVhZE5vZGVBdHRyaWJ1dGUoc2Vzc2lvbklkOiBudW1iZXIsIG5vZGVJZDogc3RyaW5nLCBhdHRyaWJ1dGU6IE9wY1VhQXR0cmlidXRlID0gT3BjVWFBdHRyaWJ1dGUuVkFMVUUpOiAgUHJvbWlzZTxhbnk+e1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhciBzZXJ2aWNlVXJsID0gT3BjVWFSZXN0U2VydmljZXMuZ2V0T3BjVWFCYXNlVXJsKCkgKyAnL3Nlc3Npb25zLycgKyBzZXNzaW9uSWQgKyAnL25vZGVzLycgKyBlbmNvZGVVUklDb21wb25lbnQobm9kZUlkKSArICcvYXR0cmlidXRlcy8nICsgYXR0cmlidXRlO1xyXG4gICAgICAgICAgICB2YXIgcmVzdFNlcnZpY2VSZXN1bHQgPSAoYXdhaXQgUmVzdFNlcnZpY2UuY2FsbDxSZXN0LkludGVyZmFjZU9wY1VhUmVzdFJlc3VsdEF0dHJpYnV0ZVZhbHVlPihSZXN0U2VydmljZVR5cGUuR0VULCBzZXJ2aWNlVXJsKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBPcGNVYVJlc3RTZXJ2aWNlcy5tb2RlID09PSBSZXN0U2VydmljZU1vZGUuRVhFQ1VURSA/ICg8YW55PnJlc3RTZXJ2aWNlUmVzdWx0KS52YWx1ZSA6IHJlc3RTZXJ2aWNlUmVzdWx0O1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV3JpdGVzIHRoZSBub2RlIGF0dHJpYnV0ZVxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZXNzaW9uSWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBub2RlSWRcclxuICAgICAqIEBwYXJhbSB7T3BjVWFBdHRyaWJ1dGV9IFthdHRyaWJ1dGU9T3BjVWFBdHRyaWJ1dGUuVkFMVUVdXHJcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhc3luYyB3cml0ZU5vZGVBdHRyaWJ1dGUoc2Vzc2lvbklkOiBudW1iZXIsIG5vZGVJZDogc3RyaW5nLCBhdHRyaWJ1dGU6IE9wY1VhQXR0cmlidXRlID0gT3BjVWFBdHRyaWJ1dGUuVkFMVUUsIHZhbHVlOiBhbnkpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZURhdGEgPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChhdHRyaWJ1dGUgPT09IE9wY1VhQXR0cmlidXRlLlZBTFVFKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZURhdGEgPSB7IFwidmFsdWVcIjogdmFsdWUgfTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHNlcnZpY2VVcmwgPSBPcGNVYVJlc3RTZXJ2aWNlcy5nZXRPcGNVYUJhc2VVcmwoKSArICcvc2Vzc2lvbnMvJyArIHNlc3Npb25JZCArICcvbm9kZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChub2RlSWQpICsgJy9hdHRyaWJ1dGVzLycgKyBhdHRyaWJ1dGU7XHJcbiAgICAgICAgICAgIGF3YWl0IFJlc3RTZXJ2aWNlLmNhbGw8UmVzdC5JbnRlcmZhY2VPcGNVYVJlc3RSZXN1bHRBdHRyaWJ1dGVWYWx1ZT4oUmVzdFNlcnZpY2VUeXBlLlBVVCwgc2VydmljZVVybCwgdmFsdWVEYXRhKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJyb3dzZXMgdGhlIG1ldGhvZHMgcGYgdGhlIHNwZWNpZmVkIG5vZGVcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vzc2lvbklkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbm9kZUlkXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTxSZXN0LkludGVyZmFjZU9wY1VhUmVzdFJlc3VsdE5vZGVSZWZlcmVuY2U+Pn1cclxuICAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXN5bmMgYnJvd3NlTm9kZU1ldGhvZHMoc2Vzc2lvbklkOiBudW1iZXIsIG5vZGVJZDogc3RyaW5nKTogUHJvbWlzZTxBcnJheTxSZXN0LkludGVyZmFjZU9wY1VhUmVzdFJlc3VsdE5vZGVSZWZlcmVuY2U+PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gQnJvd3NlIHRoZSBtZXRob2Qgc2V0LlxyXG4gICAgICAgICAgICB2YXIgbWV0aG9kUmVmZXJlbmNlcyA9IChhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5icm93c2VOb2RlcyhzZXNzaW9uSWQsIG5vZGVJZCkpLmZpbHRlcigobWV0aG9kKSA9PiB7IHJldHVybiBtZXRob2Qubm9kZUNsYXNzID09PSBcIk1ldGhvZFwiIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kUmVmZXJlbmNlcztcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJyb3dzZXMgdGhlIG1ldGhvZCBzZXQgb2YgYSBub2RlIGlmIGFueS5cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vzc2lvbklkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbm9kZUlkXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTxPcGNVYU5vZGVSZWZlcmVuY2VJbnRlcmZhY2U+Pn1cclxuICAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXN5bmMgYnJvd3NlTm9kZU1ldGhvZFNldChzZXNzaW9uSWQ6IG51bWJlciwgbm9kZUlkOiBzdHJpbmcpOiBQcm9taXNlPEFycmF5PFJlc3QuSW50ZXJmYWNlT3BjVWFSZXN0UmVzdWx0Tm9kZVJlZmVyZW5jZT4+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBBZGQgdGhlIHN1YiBub2RlIGlkIGZvciBtZXRob2RzLlxyXG4gICAgICAgICAgICBub2RlSWQgKz0gXCIuTWV0aG9kU2V0XCI7XHJcbiAgICAgICAgICAgIC8vIEJyb3dzZSB0aGUgbWV0aG9kIHNldC5cclxuICAgICAgICAgICAgdmFyIG1ldGhvZFJlZmVyZW5jZXMgPSAoYXdhaXQgT3BjVWFSZXN0U2VydmljZXMuYnJvd3NlTm9kZXMoc2Vzc2lvbklkLCBub2RlSWQpKS5maWx0ZXIoKG1ldGhvZCkgPT4geyByZXR1cm4gbWV0aG9kLm5vZGVDbGFzcyA9PT0gXCJNZXRob2RcIiB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZFJlZmVyZW5jZXM7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgdGhlIGlucHV0IHBhcmFtZXRlcnMgb2YgYSBtZXRob2RcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vzc2lvbklkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbm9kZUlkXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhc3luYyByZWFkTWV0aG9kUGFyYW1ldGVycyhzZXNzaW9uSWQ6IG51bWJlciwgbm9kZUlkOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIEFkZCB0aGUgc3ViIG5vZGUgaWQgZm9yIG1ldGhvZCBwYXJhbWV0ZXJzLlxyXG4gICAgICAgICAgICBub2RlSWQgKz0gXCIjSW5wdXRBcmd1bWVudHNcIjtcclxuICAgICAgICAgICAgLy8gQnJvd3NlIHRoZSBpbnB1dCBhcmd1bWVudHNcclxuICAgICAgICAgICAgdmFyIGlucHV0QXJndW1lbnRzID0gKGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLnJlYWROb2RlQXR0cmlidXRlKHNlc3Npb25JZCwgbm9kZUlkLCBPcGNVYUF0dHJpYnV0ZS5WQUxVRSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gaW5wdXRBcmd1bWVudHM7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYW5kIGNhbGwgYSBqc29uIGJhdGNoIHJlcXVlc3RcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0pRdWVyeS5BamF4U2V0dGluZ3M8YW55PltdfSByZXN0UmVxdWVzdHNcclxuICAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXN5bmMgY2FsbEJhdGNoUmVxdWVzdChyZXN0UmVxdWVzdHM6IFJlc3RSZXF1ZXN0SW5mb1tdKSB7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IFJlc3RTZXJ2aWNlLmNhbGxCYXRjaFJlcXVlc3Q8YW55Pih0aGlzLmdldE9wY1VhQmFzZVVybCgpICxyZXN0UmVxdWVzdHMpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeGVjdXRlcyB0aGUgc3BlY2lmaWVkIG1ldGhvZCBcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAdGVtcGxhdGUgVF9NRVRIT0RfUkVTVUxUXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vzc2lvbklkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbm9kZUlkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kSWRcclxuICAgICAqIEBwYXJhbSB7Kn0gbWV0aG9kQXJnc1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8VF9NRVRIT0RfUkVTVUxUPn1cclxuICAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXN5bmMgZXhlY3V0ZU1ldGhvZDxUX01FVEhPRF9SRVNVTFQ+KHNlc3Npb25JZDogbnVtYmVyLCBub2RlSWQ6IHN0cmluZywgbWV0aG9kSWQ6IHN0cmluZywgbWV0aG9kQXJnczogYW55KTogUHJvbWlzZTxUX01FVEhPRF9SRVNVTFQ+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgc2VydmljZVVybCA9IE9wY1VhUmVzdFNlcnZpY2VzLmdldE9wY1VhQmFzZVVybCgpICsgJy9zZXNzaW9ucy8nICsgc2Vzc2lvbklkICsgJy9ub2Rlcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KG5vZGVJZCkgKyAnL21ldGhvZHMvJyArIGVuY29kZVVSSUNvbXBvbmVudChtZXRob2RJZCk7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBhd2FpdCBSZXN0U2VydmljZS5jYWxsPGFueT4oUmVzdFNlcnZpY2VUeXBlLlBPU1QsIHNlcnZpY2VVcmwsIG1ldGhvZEFyZ3MpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmlsdGVycyB0aGUgbm9kZXMgdG8gYmUgZGlzcGxheWVkIGluIG1hcHAgY29ja3BpdFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8UmVzdC5JbnRlcmZhY2VPcGNVYVJlc3RSZXN1bHROb2RlUmVmZXJlbmNlPn0gb3BjVWFOb2Rlc1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1hcHBDb2NrcGl0TmFtZXNwYWNlXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBmaWx0ZXJNYXBwQ29ja3BpdE5vZGVzKG9wY1VhTm9kZXM6IEFycmF5PFJlc3QuSW50ZXJmYWNlT3BjVWFSZXN0UmVzdWx0Tm9kZVJlZmVyZW5jZT4sIG1hcHBDb2NrcGl0TmFtZXNwYWNlOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gb3BjVWFOb2Rlcy5maWx0ZXIoKG5vZGVSZWZlcmVuY2UpID0+IHtcclxuICAgICAgICAgICAgdmFyIGlzQ2hpbGROb2RlID0gbm9kZVJlZmVyZW5jZS5pc0ZvcndhcmQgPT09IHRydWU7XHJcblxyXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgbm9kZSBpcyB3aXRoaW4gdGhlIG1hcHAgY29ja3BpdCBuYW1lc3BhY2VcclxuICAgICAgICAgICAgdmFyIGlzTWFwcENvbXBvbmVudCA9ICg8U3RyaW5nPm5vZGVSZWZlcmVuY2UudHlwZURlZmluaXRpb24pLmluZGV4T2YobWFwcENvY2twaXROYW1lc3BhY2UpID4gLTE7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gaXNDaGlsZE5vZGUgJiYgaXNNYXBwQ29tcG9uZW50O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbi8qKlxyXG4gKiBEZWZpbmVzIE9wY1VhIEF0dHJpYnV0ZSBuYW1lcy5cclxuICpcclxuICogQGVudW0ge251bWJlcn1cclxuICovXHJcbmVudW0gT3BjVWFBdHRyaWJ1dGUge1xyXG4gICAgVkFMVUUgPSBcIlZhbHVlXCIsXHJcbiAgICBEQVRBX1RZUEUgPSBcIkRhdGFUeXBlXCIsXHJcbiAgICBCUk9XU0VfTkFNRSA9IFwiQnJvd3NlTmFtZVwiLFxyXG4gICAgRElTUExBWV9OQU1FID0gXCJEaXNwbGF5TmFtZVwiLFxyXG4gICAgREVTQ1JJUFRJT04gPSBcIkRlc2NyaXB0aW9uXCIsXHJcbiAgICBVU0VSX0FDQ0VTU19MRVZFTCA9IFwiVXNlckFjY2Vzc0xldmVsXCJcclxufVxyXG5cclxuLyoqXHJcbiAqIFNwZWNpZmllcyBhY2Nlc3MgbGV2ZWxzICggYXMgYml0IGZsYWdzICkgXHJcbiAqXHJcbiAqIEBlbnVtIHtudW1iZXJ9XHJcbiAqL1xyXG5lbnVtIE9wY1VhQWNjZXNzTGV2ZWwge1xyXG4gICAgQ3VycmVudFJlYWQgPSAweDAxLFxyXG4gICAgQ3VycmVudFdyaXRlID0gMHgwMixcclxuICAgIEhpc3RvcnlSZWFkID0gMHgwNCxcclxuICAgIEhpc3RvcnlXcml0ZSA9IDB4MDgsXHJcbiAgICBTZW1hbnRpY0NoYW5nZSA9IDB4MTAsXHJcbiAgICBTdGF0dXNXcml0ZSA9IDB4MjAsXHJcbiAgICBUaW1lc3RhbXBXcml0ZSA9IDB4NDAsXHJcbiAgICBSZXNlcnZlZCA9IDB4ODAsXHJcbn1cclxuXHJcblxyXG5cclxuXHJcbmV4cG9ydCB7IE9wY1VhUmVzdFNlcnZpY2VzLCBSZXN0LCBSZXN0U2VydmljZU1vZGUsT3BjVWFBdHRyaWJ1dGUsIE9wY1VhQWNjZXNzTGV2ZWwgfTsiXX0=