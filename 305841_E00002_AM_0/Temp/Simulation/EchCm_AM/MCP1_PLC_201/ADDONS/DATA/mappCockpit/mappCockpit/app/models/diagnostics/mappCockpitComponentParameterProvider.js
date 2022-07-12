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
define(["require", "exports", "../../communication/rest/opcUaRestServices", "../online/mappCockpitComponent", "../online/mappCockpitComponentReflection"], function (require, exports, opcUaRestServices_1, ModelItems, mappCockpitComponentReflection_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Implements component parameter access services
     *
     * @class MappCockpitComponentParameterProvider
     */
    var MappCockpitComponentParameterProvider = /** @class */ (function () {
        /**
         * Creates an instance of MappCockpitComponentParameterProvider.
         * @param {MappCockpitDiagnosticProvider} diagnosticProvider
         * @memberof MappCockpitComponentParameterProvider
         */
        function MappCockpitComponentParameterProvider(diagnosticProvider) {
            this._diagnosticProvider = diagnosticProvider;
        }
        /**
         * Browses the parameters of a component
         *
         * @private
         * @param {MappCockpitComponent} mappCockpitComponent
         * @returns
         * @memberof MappCockpitComponentParameterProvider
         */
        MappCockpitComponentParameterProvider.prototype.browseComponentParameters = function (mappCockpitComponent) {
            return __awaiter(this, void 0, void 0, function () {
                var componentParameterSet, componentParameters;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.browseNodeParameterSet(this._diagnosticProvider.sessionId, mappCockpitComponent.id)];
                        case 1:
                            componentParameterSet = _a.sent();
                            componentParameters = componentParameterSet.map(function (parameter) {
                                var componentParameters = new ModelItems.MappCockpitComponentParameter(mappCockpitComponent, parameter.displayName, parameter);
                                return componentParameters;
                            });
                            mappCockpitComponent.parameters = componentParameters;
                            return [2 /*return*/, mappCockpitComponent.parameters];
                    }
                });
            });
        };
        /**
         * updates parameter data types
         *
         * @param {any[]} parameters
         * @returns {Promise<any>}
         * @memberof MappCockpitComponentParameterProvider
         */
        MappCockpitComponentParameterProvider.prototype.updateParameterDataTypes = function (parameters) {
            return __awaiter(this, void 0, void 0, function () {
                var parameterDataTypeInfo;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.readParameterTypeInfo(parameters)];
                        case 1:
                            parameterDataTypeInfo = _a.sent();
                            // update the parameter data types
                            this.updateParameterDataTypeInfo(parameters, parameterDataTypeInfo);
                            // read and update parameter enums
                            this.readParameterEnums(parameters);
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * reads the parameters data type infos
         *
         * @private
         * @param {ModelItems.MappCockpitComponentParameter[]} parameters
         * @returns {Promise<Map<string, ModelItems.MappCockpitParameterDataType>>}
         * @memberof MappCockpitComponentParameterProvider
         */
        MappCockpitComponentParameterProvider.prototype.readParameterTypeInfo = function (parameters) {
            return __awaiter(this, void 0, void 0, function () {
                var distinctParameterTypeIds, parameterTypes, dataTypeIds, parameterDataTypeInfo;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            distinctParameterTypeIds = new Map();
                            parameterTypes = new Map();
                            return [4 /*yield*/, this.readParameterDataTypeIds(parameters, distinctParameterTypeIds, parameterTypes)];
                        case 1:
                            dataTypeIds = _a.sent();
                            return [4 /*yield*/, this.readParameterDataTypeDisplayNames(parameters, dataTypeIds, distinctParameterTypeIds, parameterTypes)];
                        case 2:
                            parameterDataTypeInfo = _a.sent();
                            return [2 /*return*/, parameterDataTypeInfo];
                    }
                });
            });
        };
        /**
         * Reads the display names for the requested data types
         *
         * @private
         * @param {ModelItems.MappCockpitComponentParameter[]} parameters
         * @param {string[]} dataTypeIds
         * @param {Map<string, string>} distinctParameterTypeIds
         * @param {Map<string, string>} parameterTypes
         * @returns
         * @memberof MappCockpitComponentParameterProvider
         */
        MappCockpitComponentParameterProvider.prototype.readParameterDataTypeDisplayNames = function (parameters, dataTypeIds, distinctParameterTypeIds, parameterTypes) {
            return __awaiter(this, void 0, void 0, function () {
                var i, dataTypedisplayNameResult, parameterDataTypeInfo;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // activate batching
                            opcUaRestServices_1.OpcUaRestServices.activateBatching();
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < dataTypeIds.length)) return [3 /*break*/, 4];
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.readNodeAttribute(this._diagnosticProvider.sessionId, dataTypeIds[i], opcUaRestServices_1.OpcUaAttribute.DISPLAY_NAME)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4: return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.executeBatchRequest()];
                        case 5:
                            dataTypedisplayNameResult = _a.sent();
                            // create a map of data type id to data type name  
                            dataTypedisplayNameResult.forEach(function (responseValue, requestId) {
                                // set the item id for the created monitor item
                                var typeId = dataTypeIds[requestId];
                                var typeName = responseValue.value;
                                distinctParameterTypeIds.set(typeId, typeName);
                            });
                            parameterDataTypeInfo = new Map();
                            // create a map for the parameters type infos
                            parameters.forEach(function (parameter) {
                                var parameterDataTypeNodeId = parameterTypes.get(parameter.id);
                                var parameterDataTypeDisplayName = distinctParameterTypeIds.get(parameterDataTypeNodeId);
                                parameterDataTypeInfo.set(parameter.id, new ModelItems.MappCockpitParameterDataType(parameterDataTypeNodeId, parameterDataTypeDisplayName));
                            });
                            return [2 /*return*/, parameterDataTypeInfo];
                    }
                });
            });
        };
        /**
         * Reads the ids for the parameter data types
         *
         * @private
         * @param {ModelItems.MappCockpitComponentParameter[]} parameters
         * @param {Map<string, string>} distinctParameterTypeIds
         * @param {Map<string, string>} parameterTypes
         * @returns
         * @memberof MappCockpitComponentParameterProvider
         */
        MappCockpitComponentParameterProvider.prototype.readParameterDataTypeIds = function (parameters, distinctParameterTypeIds, parameterTypes) {
            return __awaiter(this, void 0, void 0, function () {
                var i, nodeDataTypesResult, dataTypeIds;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // activate batch mode which returns the rest settings instead of directly executing
                            opcUaRestServices_1.OpcUaRestServices.activateBatching();
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < parameters.length)) return [3 /*break*/, 4];
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.readNodeAttribute(this._diagnosticProvider.sessionId, parameters[i].id, opcUaRestServices_1.OpcUaAttribute.DATA_TYPE)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4: return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.executeBatchRequest()];
                        case 5:
                            nodeDataTypesResult = _a.sent();
                            // create a map of data type id to data type name  
                            nodeDataTypesResult.forEach(function (responseValue, requestId) {
                                var parameterTypeId = responseValue.value;
                                distinctParameterTypeIds.set(parameterTypeId, "");
                                parameterTypes.set(parameters[requestId].id, parameterTypeId);
                            });
                            dataTypeIds = Array.from(distinctParameterTypeIds.keys());
                            return [2 /*return*/, dataTypeIds];
                    }
                });
            });
        };
        MappCockpitComponentParameterProvider.prototype.updateParameterDataTypeInfo = function (parameters, parameterDataTypeInfo) {
            parameters.forEach(function (parameter) {
                // update the parameters data type if available
                var parameterTypeInfo = parameterDataTypeInfo.get(parameter.id);
                if (parameterTypeInfo) {
                    parameter.dataType = parameterTypeInfo;
                }
            });
        };
        /**
         * reads parameter data types
         *
         * @param {ModelItems.MappCockpitComponentParameter[]} mappCockpitComponentParameters
         * @memberof MappCockpitComponentParameterProvider
         */
        MappCockpitComponentParameterProvider.prototype.readParameterDataTypes = function (mappCockpitComponentParameters) {
            return __awaiter(this, void 0, void 0, function () {
                var readParameterDataTypeRequests;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            readParameterDataTypeRequests = [];
                            mappCockpitComponentParameters.forEach(function (componentParameter) { readParameterDataTypeRequests.push(_this.updateParameterDataType(componentParameter)); });
                            return [4 /*yield*/, Promise.all(readParameterDataTypeRequests)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Updates the
         *
         * @param {MappCockpitComponentParameter} componentParameter
         * @returns {Promise<any>}
         * @memberof MappCockpitComponentParameterProvider
         */
        MappCockpitComponentParameterProvider.prototype.updateParameterDataType = function (componentParameter) {
            return __awaiter(this, void 0, void 0, function () {
                var dataTypeRef;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.readComponentParameterDataType(componentParameter)];
                        case 1:
                            dataTypeRef = _a.sent();
                            componentParameter.dataType = dataTypeRef;
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * reads and updates the parameter enums for enum data types
         *
         * @param {ModelItems.MappCockpitComponentParameter[]} mappCockpitComponentParameters
         * @returns {Promise<any>}
         * @memberof MappCockpitComponentParameterProvider
         */
        MappCockpitComponentParameterProvider.prototype.readParameterEnums = function (mappCockpitComponentParameters) {
            mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.readParameterEnums(mappCockpitComponentParameters);
        };
        /**
         * reads the data type of a parameter
         *
         * @param {ModelItems.MappCockpitComponentParameter} componentParameter
         * @returns {Promise<any>}
         * @memberof MappCockpitComponentParameterProvider
         */
        MappCockpitComponentParameterProvider.prototype.readComponentParameterDataType = function (componentParameter) {
            return __awaiter(this, void 0, void 0, function () {
                var parameterDataTypeId, parameterDataTypeNodeId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.readNodeAttribute(this._diagnosticProvider.sessionId, componentParameter.id, opcUaRestServices_1.OpcUaAttribute.DATA_TYPE)];
                        case 1:
                            parameterDataTypeId = _a.sent();
                            parameterDataTypeNodeId = parameterDataTypeId;
                            return [4 /*yield*/, this.readDataTypeInfo(parameterDataTypeNodeId)];
                        case 2: 
                        // var parameterDataTypeBrowseName = await OpcUaRestServices.readNodeAttribute(this._diagnosticProvider.sessionId, parameterDataTypeNodeId,OpcUaAttribute.BROWSE_NAME);
                        return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * reads data type info for the specified data type id
         *
         * @private
         * @param {*} parameterDataTypeNodeId
         * @returns
         * @memberof MappCockpitComponentParameterProvider
         */
        MappCockpitComponentParameterProvider.prototype.readDataTypeInfo = function (parameterDataTypeNodeId) {
            return __awaiter(this, void 0, void 0, function () {
                var parameterDataTypeDisplayName;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            parameterDataTypeDisplayName = "";
                            if (!MappCockpitComponentParameterProvider.dataTypeNames.has(parameterDataTypeNodeId)) return [3 /*break*/, 1];
                            parameterDataTypeDisplayName = MappCockpitComponentParameterProvider.dataTypeNames.get(parameterDataTypeNodeId);
                            return [3 /*break*/, 3];
                        case 1: return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.readNodeAttribute(this._diagnosticProvider.sessionId, parameterDataTypeNodeId, opcUaRestServices_1.OpcUaAttribute.DISPLAY_NAME)];
                        case 2:
                            parameterDataTypeDisplayName = _a.sent();
                            MappCockpitComponentParameterProvider.dataTypeNames.set(parameterDataTypeNodeId, parameterDataTypeDisplayName);
                            _a.label = 3;
                        case 3: 
                        // var parameterDataTypeDescr = await OpcUaRestServices.readNodeAttribute(this._diagnosticProvider.sessionId, parameterDataTypeNodeId,OpcUaAttribute.DESCRIPTION);
                        return [2 /*return*/, new ModelItems.MappCockpitParameterDataType(parameterDataTypeNodeId, parameterDataTypeDisplayName)];
                    }
                });
            });
        };
        /**
         * reads a parameters value and updates the parameters value if specified
         *
         * @param {ModelItems.MappCockpitComponentParameter} componentParameter
         * @param {boolean} [update=true] updates the parameters value if true
         * @returns
         * @memberof MappCockpitComponentParameterProvider
         */
        MappCockpitComponentParameterProvider.prototype.readComponentParameterValue = function (componentParameter, update) {
            if (update === void 0) { update = true; }
            return __awaiter(this, void 0, void 0, function () {
                var componentParameterValue;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.readNodeAttribute(this._diagnosticProvider.sessionId, componentParameter.id)];
                        case 1:
                            componentParameterValue = _a.sent();
                            // update the parameters value
                            if (update) {
                                componentParameter.value = componentParameterValue;
                            }
                            return [2 /*return*/, componentParameterValue];
                    }
                });
            });
        };
        /**
         * writes a parameter value
         *
         * @param {ModelItems.MappCockpitComponentParameter} componentParameter
         * @returns
         * @memberof MappCockpitComponentParameterProvider
         */
        MappCockpitComponentParameterProvider.prototype.writeComponentParameterValue = function (componentParameter) {
            return __awaiter(this, void 0, void 0, function () {
                var componentParameterValue;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.writeNodeAttribute(this._diagnosticProvider.sessionId, componentParameter.id, opcUaRestServices_1.OpcUaAttribute.VALUE, componentParameter.value)];
                        case 1:
                            componentParameterValue = _a.sent();
                            // verify if the parameter has been written siccessfully
                            this.verifyParameterWrite(componentParameter);
                            return [2 /*return*/, componentParameterValue];
                    }
                });
            });
        };
        /**
         * Verifies if the parameter has been successfully written by reading back the value after some delay time
         *
         * @private
         * @param {ModelItems.MappCockpitComponentParameter} componentParameter
         * @memberof MappCockpitComponentParameterProvider
         */
        MappCockpitComponentParameterProvider.prototype.verifyParameterWrite = function (componentParameter) {
            var _this = this;
            // delay reread for 2 times the monitoring sampling rate so that change notification could possibly be received
            setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                var reflectedParameterValue;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.readComponentParameterValue(componentParameter, false)];
                        case 1:
                            reflectedParameterValue = _a.sent();
                            // update/rewrite the parameter if its value differs from the reflected value.
                            if (reflectedParameterValue !== componentParameter.value) {
                                componentParameter.value = reflectedParameterValue;
                            }
                            // reflect the written value via the write response delegate
                            if (componentParameter.reflectedWriteResponseDelegate) {
                                componentParameter.reflectedWriteResponseDelegate(reflectedParameterValue);
                                // clear the response delegate after the response call to make sure that every write uses its own response callback
                                componentParameter.reflectedWriteResponseDelegate = undefined;
                            }
                            return [2 /*return*/];
                    }
                });
            }); }, opcUaRestServices_1.OpcUaRestServices.monitoringSamplingInterval * 2);
        };
        // caches data type names for node ids
        MappCockpitComponentParameterProvider.dataTypeNames = new Map();
        return MappCockpitComponentParameterProvider;
    }());
    exports.MappCockpitComponentParameterProvider = MappCockpitComponentParameterProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2RpYWdub3N0aWNzL21hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyUHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBTUE7Ozs7T0FJRztJQUNIO1FBYUk7Ozs7V0FJRztRQUNILCtDQUFZLGtCQUFpRDtZQUN6RCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsa0JBQWtCLENBQUM7UUFDbEQsQ0FBQztRQUlEOzs7Ozs7O1dBT0c7UUFDVSx5RUFBeUIsR0FBdEMsVUFBdUMsb0JBQXFEOzs7OztnQ0FHNUQscUJBQU0scUNBQWlCLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxvQkFBb0IsQ0FBQyxFQUFFLENBQUMsRUFBQTs7NEJBQW5JLHFCQUFxQixHQUFHLFNBQTJHOzRCQUNuSSxtQkFBbUIsR0FBK0MscUJBQXFCLENBQUMsR0FBRyxDQUFDLFVBQUMsU0FBUztnQ0FDdEcsSUFBSSxtQkFBbUIsR0FBRyxJQUFJLFVBQVUsQ0FBQyw2QkFBNkIsQ0FBQyxvQkFBb0IsRUFBQyxTQUFTLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dDQUM5SCxPQUFPLG1CQUFtQixDQUFDOzRCQUMvQixDQUFDLENBQUMsQ0FBQzs0QkFFSCxvQkFBb0IsQ0FBQyxVQUFVLEdBQUcsbUJBQW1CLENBQUM7NEJBRXRELHNCQUFRLG9CQUFvQixDQUFDLFVBQVUsRUFBQzs7OztTQUMzQztRQUVEOzs7Ozs7V0FNRztRQUNHLHdFQUF3QixHQUE5QixVQUErQixVQUFzRDs7Ozs7Z0NBR0cscUJBQU0sSUFBSSxDQUFDLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxFQUFBOzs0QkFBMUgscUJBQXFCLEdBQXlELFNBQTRDOzRCQUVoSSxrQ0FBa0M7NEJBQ2xDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxVQUFVLEVBQUUscUJBQXFCLENBQUMsQ0FBQzs0QkFFcEUsa0NBQWtDOzRCQUNsQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7Ozs7O1NBQ3ZDO1FBR0Q7Ozs7Ozs7V0FPRztRQUNXLHFFQUFxQixHQUFuQyxVQUFvQyxVQUFzRDs7Ozs7OzRCQUVoRix3QkFBd0IsR0FBd0IsSUFBSSxHQUFHLEVBQUUsQ0FBQzs0QkFDMUQsY0FBYyxHQUF3QixJQUFJLEdBQUcsRUFBRSxDQUFDOzRCQUdwQyxxQkFBTSxJQUFJLENBQUMsd0JBQXdCLENBQUMsVUFBVSxFQUFFLHdCQUF3QixFQUFFLGNBQWMsQ0FBQyxFQUFBOzs0QkFBdkcsV0FBVyxHQUFHLFNBQXlGOzRCQUd2QixxQkFBTSxJQUFJLENBQUMsaUNBQWlDLENBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRSx3QkFBd0IsRUFBRyxjQUFjLENBQUMsRUFBQTs7NEJBQTlMLHFCQUFxQixHQUF5RCxTQUFnSDs0QkFFcE0sc0JBQU8scUJBQXFCLEVBQUM7Ozs7U0FDaEM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ1csaUZBQWlDLEdBQS9DLFVBQWdELFVBQXNELEVBQUUsV0FBcUIsRUFBRSx3QkFBNkMsRUFBRSxjQUFtQzs7Ozs7OzRCQUU3TSxvQkFBb0I7NEJBQ3BCLHFDQUFpQixDQUFDLGdCQUFnQixFQUFFLENBQUM7NEJBRzVCLENBQUMsR0FBRyxDQUFDOzs7aUNBQUUsQ0FBQSxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQTs0QkFDbEMscUJBQU0scUNBQWlCLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBTyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsa0NBQWMsQ0FBQyxZQUFZLENBQUMsRUFBQTs7NEJBQS9ILFNBQStILENBQUM7Ozs0QkFENUYsQ0FBQyxFQUFFLENBQUE7O2dDQUtYLHFCQUFNLHFDQUFpQixDQUFDLG1CQUFtQixFQUFFLEVBQUE7OzRCQUF6RSx5QkFBeUIsR0FBRyxTQUE2Qzs0QkFFN0UsbURBQW1EOzRCQUNuRCx5QkFBeUIsQ0FBQyxPQUFPLENBQUMsVUFBQyxhQUFhLEVBQUUsU0FBUztnQ0FDdkQsK0NBQStDO2dDQUMvQyxJQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7Z0NBQ3RDLElBQU0sUUFBUSxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUM7Z0NBQ3JDLHdCQUF3QixDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7NEJBQ25ELENBQUMsQ0FBQyxDQUFDOzRCQUdHLHFCQUFxQixHQUF5RCxJQUFJLEdBQUcsRUFBRSxDQUFDOzRCQUU5Riw2Q0FBNkM7NEJBQzdDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQyxTQUFTO2dDQUV6QixJQUFNLHVCQUF1QixHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dDQUNqRSxJQUFNLDRCQUE0QixHQUFHLHdCQUF3QixDQUFDLEdBQUcsQ0FBQyx1QkFBd0IsQ0FBQyxDQUFDO2dDQUU1RixxQkFBcUIsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxJQUFJLFVBQVUsQ0FBQyw0QkFBNEIsQ0FBQyx1QkFBdUIsRUFBRSw0QkFBNEIsQ0FBQyxDQUFDLENBQUM7NEJBRWhKLENBQUMsQ0FBQyxDQUFDOzRCQUVILHNCQUFPLHFCQUFxQixFQUFDOzs7O1NBQ2hDO1FBRUQ7Ozs7Ozs7OztXQVNHO1FBQ1csd0VBQXdCLEdBQXRDLFVBQXVDLFVBQXNELEVBQUUsd0JBQTZDLEVBQUUsY0FBbUM7Ozs7Ozs0QkFFN0ssb0ZBQW9GOzRCQUNwRixxQ0FBaUIsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDOzRCQUU1QixDQUFDLEdBQUcsQ0FBQzs7O2lDQUFFLENBQUEsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUE7NEJBQ2pDLHFCQUFNLHFDQUFpQixDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxrQ0FBYyxDQUFDLFNBQVMsQ0FBQyxFQUFBOzs0QkFBekgsU0FBeUgsQ0FBQzs7OzRCQUR2RixDQUFDLEVBQUUsQ0FBQTs7Z0NBS2hCLHFCQUFNLHFDQUFpQixDQUFDLG1CQUFtQixFQUFFLEVBQUE7OzRCQUFuRSxtQkFBbUIsR0FBRyxTQUE2Qzs0QkFFdkUsbURBQW1EOzRCQUNuRCxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsVUFBQyxhQUFhLEVBQUUsU0FBUztnQ0FDakQsSUFBTSxlQUFlLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQztnQ0FDNUMsd0JBQXdCLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQ0FDbEQsY0FBYyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxFQUFFLGVBQWUsQ0FBQyxDQUFDOzRCQUNsRSxDQUFDLENBQUMsQ0FBQzs0QkFHQyxXQUFXLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDOzRCQUM5RCxzQkFBTyxXQUFXLEVBQUM7Ozs7U0FDdEI7UUFFTywyRUFBMkIsR0FBbkMsVUFBb0MsVUFBc0QsRUFBRSxxQkFBMkU7WUFDbkssVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFDLFNBQVM7Z0JBRXpCLCtDQUErQztnQkFDL0MsSUFBTSxpQkFBaUIsR0FBRyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNsRSxJQUFJLGlCQUFpQixFQUFFO29CQUNuQixTQUFTLENBQUMsUUFBUSxHQUFHLGlCQUFpQixDQUFDO2lCQUMxQztZQUVMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0csc0VBQXNCLEdBQTVCLFVBQTZCLDhCQUEwRTs7Ozs7Ozs0QkFDL0YsNkJBQTZCLEdBQWtCLEVBQUUsQ0FBQzs0QkFDdEQsOEJBQThCLENBQUMsT0FBTyxDQUFDLFVBQUMsa0JBQWtCLElBQUssNkJBQTZCLENBQUMsSUFBSSxDQUFFLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQzs0QkFDeEoscUJBQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxFQUFBOzs0QkFBaEQsU0FBZ0QsQ0FBQzs7Ozs7U0FDcEQ7UUFFRDs7Ozs7O1dBTUc7UUFDRyx1RUFBdUIsR0FBN0IsVUFBOEIsa0JBQWlEOzs7OztnQ0FDekQscUJBQU0sSUFBSSxDQUFDLDhCQUE4QixDQUFDLGtCQUFrQixDQUFDLEVBQUE7OzRCQUEzRSxXQUFXLEdBQUcsU0FBNkQ7NEJBQy9FLGtCQUFrQixDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUM7Ozs7O1NBQzdDO1FBRUQ7Ozs7OztXQU1HO1FBQ0gsa0VBQWtCLEdBQWxCLFVBQW1CLDhCQUEwRTtZQUN6RixrRUFBaUMsQ0FBQyxrQkFBa0IsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBQ3pGLENBQUM7UUFHRDs7Ozs7O1dBTUc7UUFDRyw4RUFBOEIsR0FBcEMsVUFBcUMsa0JBQTREOzs7OztnQ0FHbkUscUJBQU0scUNBQWlCLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxrQkFBa0IsQ0FBQyxFQUFFLEVBQUUsa0NBQWMsQ0FBQyxTQUFTLENBQUMsRUFBQTs7NEJBQXBKLG1CQUFtQixHQUFHLFNBQThIOzRCQUNwSix1QkFBdUIsR0FBRyxtQkFBbUIsQ0FBQzs0QkFHM0MscUJBQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLHVCQUF1QixDQUFDLEVBQUE7O3dCQUQzRCx1S0FBdUs7d0JBQ3ZLLHNCQUFPLFNBQW9ELEVBQUM7Ozs7U0FDL0Q7UUFFRDs7Ozs7OztXQU9HO1FBQ1UsZ0VBQWdCLEdBQTdCLFVBQThCLHVCQUE0Qjs7Ozs7OzRCQUNsRCw0QkFBNEIsR0FBRyxFQUFFLENBQUM7aUNBR2xDLHFDQUFxQyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsRUFBaEYsd0JBQWdGOzRCQUNoRiw0QkFBNEIsR0FBRyxxQ0FBcUMsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7O2dDQUVqRixxQkFBTSxxQ0FBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLHVCQUF1QixFQUFFLGtDQUFjLENBQUMsWUFBWSxDQUFDLEVBQUE7OzRCQUFsSyw0QkFBNEIsR0FBRyxTQUFtSSxDQUFDOzRCQUNuSyxxQ0FBcUMsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFDLDRCQUE0QixDQUFDLENBQUM7Ozt3QkFHbEgsa0tBQWtLO3dCQUNsSyxzQkFBTyxJQUFJLFVBQVUsQ0FBQyw0QkFBNEIsQ0FBQyx1QkFBdUIsRUFBRSw0QkFBNEIsQ0FBQyxFQUFDOzs7O1NBQzdHO1FBR0Q7Ozs7Ozs7V0FPRztRQUNVLDJFQUEyQixHQUF4QyxVQUF5QyxrQkFBNEQsRUFBRSxNQUFhO1lBQWIsdUJBQUEsRUFBQSxhQUFhOzs7OztnQ0FDbEYscUJBQU0scUNBQWlCLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsRUFBQTs7NEJBQTlILHVCQUF1QixHQUFHLFNBQW9HOzRCQUNsSSw4QkFBOEI7NEJBQzlCLElBQUksTUFBTSxFQUFFO2dDQUNSLGtCQUFrQixDQUFDLEtBQUssR0FBRyx1QkFBdUIsQ0FBQzs2QkFDdEQ7NEJBQ0Qsc0JBQU8sdUJBQXVCLEVBQUM7Ozs7U0FDbEM7UUFFRDs7Ozs7O1dBTUc7UUFDVSw0RUFBNEIsR0FBekMsVUFBMEMsa0JBQTREOzs7OztnQ0FHcEUscUJBQU0scUNBQWlCLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxrQkFBa0IsQ0FBQyxFQUFFLEVBQUUsa0NBQWMsQ0FBQyxLQUFLLEVBQUUsa0JBQWtCLENBQUMsS0FBSyxDQUFDLEVBQUE7OzRCQUEvSyx1QkFBdUIsR0FBRyxTQUFxSjs0QkFDbkwsd0RBQXdEOzRCQUN4RCxJQUFJLENBQUMsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsQ0FBQzs0QkFFOUMsc0JBQU8sdUJBQXVCLEVBQUM7Ozs7U0FDbEM7UUFFRDs7Ozs7O1dBTUc7UUFDSSxvRUFBb0IsR0FBM0IsVUFBNEIsa0JBQTREO1lBQXhGLGlCQW9CQztZQWxCRywrR0FBK0c7WUFDL0csVUFBVSxDQUFDOzs7O2dDQUV1QixxQkFBTSxJQUFJLENBQUMsMkJBQTJCLENBQUMsa0JBQWtCLEVBQUMsS0FBSyxDQUFDLEVBQUE7OzRCQUExRix1QkFBdUIsR0FBRyxTQUFnRTs0QkFFOUYsOEVBQThFOzRCQUM5RSxJQUFJLHVCQUF1QixLQUFLLGtCQUFrQixDQUFDLEtBQUssRUFBRTtnQ0FDdEQsa0JBQWtCLENBQUMsS0FBSyxHQUFHLHVCQUF1QixDQUFDOzZCQUN0RDs0QkFFRCw0REFBNEQ7NEJBQzVELElBQUksa0JBQWtCLENBQUMsOEJBQThCLEVBQUU7Z0NBQ25ELGtCQUFrQixDQUFDLDhCQUE4QixDQUFDLHVCQUF1QixDQUFDLENBQUM7Z0NBQzNFLG1IQUFtSDtnQ0FDbkgsa0JBQWtCLENBQUMsOEJBQThCLEdBQUcsU0FBUyxDQUFDOzZCQUNqRTs7OztpQkFFSixFQUFFLHFDQUFpQixDQUFDLDBCQUEwQixHQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELENBQUM7UUF0VEQsc0NBQXNDO1FBQ3ZCLG1EQUFhLEdBQW1CLElBQUksR0FBRyxFQUFFLENBQUM7UUF1VDdELDRDQUFDO0tBQUEsQUFsVUQsSUFrVUM7SUFsVVksc0ZBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3BjVWFSZXN0U2VydmljZXMsIE9wY1VhQXR0cmlidXRlIH0gZnJvbSAnLi4vLi4vY29tbXVuaWNhdGlvbi9yZXN0L29wY1VhUmVzdFNlcnZpY2VzJztcclxuaW1wb3J0IHsgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIgfSBmcm9tICcuL21hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyJztcclxuaW1wb3J0ICogYXMgTW9kZWxJdGVtcyBmcm9tICcuLi9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8gfSBmcm9tICcuLi9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnRSZWZsZWN0aW9uJztcclxuaW1wb3J0IHsgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyIH0gZnJvbSAnLi4vb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50JztcclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRzIGNvbXBvbmVudCBwYXJhbWV0ZXIgYWNjZXNzIHNlcnZpY2VzXHJcbiAqXHJcbiAqIEBjbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlclByb3ZpZGVyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJQcm92aWRlciB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWZlcmVuY2VzIHRoZSBkaWFnbm9zdGljIHByb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge01hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfZGlhZ25vc3RpY1Byb3ZpZGVyOiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlcjtcclxuXHJcbiAgICAvLyBjYWNoZXMgZGF0YSB0eXBlIG5hbWVzIGZvciBub2RlIGlkc1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZGF0YVR5cGVOYW1lczpNYXA8c3RyaW5nLGFueT4gPSBuZXcgTWFwKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyUHJvdmlkZXIuXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyfSBkaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlclByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGRpYWdub3N0aWNQcm92aWRlcjogTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIpIHtcclxuICAgICAgICB0aGlzLl9kaWFnbm9zdGljUHJvdmlkZXIgPSBkaWFnbm9zdGljUHJvdmlkZXI7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJyb3dzZXMgdGhlIHBhcmFtZXRlcnMgb2YgYSBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudH0gbWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgYnJvd3NlQ29tcG9uZW50UGFyYW1ldGVycyhtYXBwQ29ja3BpdENvbXBvbmVudDogTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudCk6IFByb21pc2U8TW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdPiB7XHJcblxyXG4gICAgICAgIC8vIFJlYWQgY29tcG9uZW50IHBhcmFtZXRlcnMuXHJcbiAgICAgICAgdmFyIGNvbXBvbmVudFBhcmFtZXRlclNldCA9IGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLmJyb3dzZU5vZGVQYXJhbWV0ZXJTZXQodGhpcy5fZGlhZ25vc3RpY1Byb3ZpZGVyLnNlc3Npb25JZCwgbWFwcENvY2twaXRDb21wb25lbnQuaWQpO1xyXG4gICAgICAgIHZhciBjb21wb25lbnRQYXJhbWV0ZXJzOiBNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10gPSBjb21wb25lbnRQYXJhbWV0ZXJTZXQubWFwKChwYXJhbWV0ZXIpID0+IHtcclxuICAgICAgICAgICAgbGV0IGNvbXBvbmVudFBhcmFtZXRlcnMgPSBuZXcgTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcihtYXBwQ29ja3BpdENvbXBvbmVudCxwYXJhbWV0ZXIuZGlzcGxheU5hbWUsIHBhcmFtZXRlcik7XHJcbiAgICAgICAgICAgIHJldHVybiBjb21wb25lbnRQYXJhbWV0ZXJzO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBtYXBwQ29ja3BpdENvbXBvbmVudC5wYXJhbWV0ZXJzID0gY29tcG9uZW50UGFyYW1ldGVycztcclxuXHJcbiAgICAgICAgcmV0dXJuICBtYXBwQ29ja3BpdENvbXBvbmVudC5wYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdXBkYXRlcyBwYXJhbWV0ZXIgZGF0YSB0eXBlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7YW55W119IHBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBhc3luYyB1cGRhdGVQYXJhbWV0ZXJEYXRhVHlwZXMocGFyYW1ldGVyczogTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKTogUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSByZXF1ZXN0ZWQgcGFyYW1ldGVyIHR5cGUgaW5mb3NcclxuICAgICAgICBjb25zdCBwYXJhbWV0ZXJEYXRhVHlwZUluZm86IE1hcDxzdHJpbmcsIE1vZGVsSXRlbXMuTWFwcENvY2twaXRQYXJhbWV0ZXJEYXRhVHlwZT4gPSBhd2FpdCB0aGlzLnJlYWRQYXJhbWV0ZXJUeXBlSW5mbyhwYXJhbWV0ZXJzKTtcclxuXHJcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBwYXJhbWV0ZXIgZGF0YSB0eXBlc1xyXG4gICAgICAgIHRoaXMudXBkYXRlUGFyYW1ldGVyRGF0YVR5cGVJbmZvKHBhcmFtZXRlcnMsIHBhcmFtZXRlckRhdGFUeXBlSW5mbyk7XHJcblxyXG4gICAgICAgIC8vIHJlYWQgYW5kIHVwZGF0ZSBwYXJhbWV0ZXIgZW51bXNcclxuICAgICAgICB0aGlzLnJlYWRQYXJhbWV0ZXJFbnVtcyhwYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWFkcyB0aGUgcGFyYW1ldGVycyBkYXRhIHR5cGUgaW5mb3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IHBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPE1hcDxzdHJpbmcsIE1vZGVsSXRlbXMuTWFwcENvY2twaXRQYXJhbWV0ZXJEYXRhVHlwZT4+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyByZWFkUGFyYW1ldGVyVHlwZUluZm8ocGFyYW1ldGVyczogTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKTogUHJvbWlzZTxNYXA8c3RyaW5nLCBNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0UGFyYW1ldGVyRGF0YVR5cGU+PiB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgZGlzdGluY3RQYXJhbWV0ZXJUeXBlSWRzOiBNYXA8c3RyaW5nLCBzdHJpbmc+ID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIGNvbnN0IHBhcmFtZXRlclR5cGVzOiBNYXA8c3RyaW5nLCBzdHJpbmc+ID0gbmV3IE1hcCgpO1xyXG5cclxuICAgICAgICAvLyByZWFkIHRoZSBwYXJhbWV0ZXJzIGRhdGEgdHlwZSBpZHNcclxuICAgICAgICBsZXQgZGF0YVR5cGVJZHMgPSBhd2FpdCB0aGlzLnJlYWRQYXJhbWV0ZXJEYXRhVHlwZUlkcyhwYXJhbWV0ZXJzLCBkaXN0aW5jdFBhcmFtZXRlclR5cGVJZHMsIHBhcmFtZXRlclR5cGVzKTtcclxuXHJcbiAgICAgICAgLy8gcmVhZCB0aGUgZGF0YSB0eXBlcyBkaXNwbGF5IG5hbWVcclxuICAgICAgICBjb25zdCBwYXJhbWV0ZXJEYXRhVHlwZUluZm86IE1hcDxzdHJpbmcsIE1vZGVsSXRlbXMuTWFwcENvY2twaXRQYXJhbWV0ZXJEYXRhVHlwZT4gPSBhd2FpdCB0aGlzLnJlYWRQYXJhbWV0ZXJEYXRhVHlwZURpc3BsYXlOYW1lcyhwYXJhbWV0ZXJzLCBkYXRhVHlwZUlkcywgZGlzdGluY3RQYXJhbWV0ZXJUeXBlSWRzLCAgcGFyYW1ldGVyVHlwZXMpO1xyXG5cclxuICAgICAgICByZXR1cm4gcGFyYW1ldGVyRGF0YVR5cGVJbmZvO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgdGhlIGRpc3BsYXkgbmFtZXMgZm9yIHRoZSByZXF1ZXN0ZWQgZGF0YSB0eXBlc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gcGFyYW1ldGVyc1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gZGF0YVR5cGVJZHNcclxuICAgICAqIEBwYXJhbSB7TWFwPHN0cmluZywgc3RyaW5nPn0gZGlzdGluY3RQYXJhbWV0ZXJUeXBlSWRzXHJcbiAgICAgKiBAcGFyYW0ge01hcDxzdHJpbmcsIHN0cmluZz59IHBhcmFtZXRlclR5cGVzXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyByZWFkUGFyYW1ldGVyRGF0YVR5cGVEaXNwbGF5TmFtZXMocGFyYW1ldGVyczogTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdLCBkYXRhVHlwZUlkczogc3RyaW5nW10sIGRpc3RpbmN0UGFyYW1ldGVyVHlwZUlkczogTWFwPHN0cmluZywgc3RyaW5nPiwgcGFyYW1ldGVyVHlwZXM6IE1hcDxzdHJpbmcsIHN0cmluZz4pIHtcclxuXHJcbiAgICAgICAgLy8gYWN0aXZhdGUgYmF0Y2hpbmdcclxuICAgICAgICBPcGNVYVJlc3RTZXJ2aWNlcy5hY3RpdmF0ZUJhdGNoaW5nKCk7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgcmVxdWVzdHMgZm9yIHJlYWRpbmcgdGhlIGRhdGEgdHlwZXMgZGlzcGxheSBuYW1lXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhVHlwZUlkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5yZWFkTm9kZUF0dHJpYnV0ZSh0aGlzLl9kaWFnbm9zdGljUHJvdmlkZXIuc2Vzc2lvbklkLCA8YW55PmRhdGFUeXBlSWRzW2ldLCBPcGNVYUF0dHJpYnV0ZS5ESVNQTEFZX05BTUUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gcmVhZCB0aGUgZGlzcGxheSBuYW1lcyBwZXIgYmF0Y2ggcmVxdWVzdFxyXG4gICAgICAgIGxldCBkYXRhVHlwZWRpc3BsYXlOYW1lUmVzdWx0ID0gYXdhaXQgT3BjVWFSZXN0U2VydmljZXMuZXhlY3V0ZUJhdGNoUmVxdWVzdCgpO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgYSBtYXAgb2YgZGF0YSB0eXBlIGlkIHRvIGRhdGEgdHlwZSBuYW1lICBcclxuICAgICAgICBkYXRhVHlwZWRpc3BsYXlOYW1lUmVzdWx0LmZvckVhY2goKHJlc3BvbnNlVmFsdWUsIHJlcXVlc3RJZCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBzZXQgdGhlIGl0ZW0gaWQgZm9yIHRoZSBjcmVhdGVkIG1vbml0b3IgaXRlbVxyXG4gICAgICAgICAgICBjb25zdCB0eXBlSWQgPSBkYXRhVHlwZUlkc1tyZXF1ZXN0SWRdO1xyXG4gICAgICAgICAgICBjb25zdCB0eXBlTmFtZSA9IHJlc3BvbnNlVmFsdWUudmFsdWU7XHJcbiAgICAgICAgICAgIGRpc3RpbmN0UGFyYW1ldGVyVHlwZUlkcy5zZXQodHlwZUlkLCB0eXBlTmFtZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vLy8gY3JlYXRlIHRoZSBwYXJhbWV0ZXIgdHlwZSBpbmZvIG9iamVjdHNcclxuICAgICAgICBjb25zdCBwYXJhbWV0ZXJEYXRhVHlwZUluZm86IE1hcDxzdHJpbmcsIE1vZGVsSXRlbXMuTWFwcENvY2twaXRQYXJhbWV0ZXJEYXRhVHlwZT4gPSBuZXcgTWFwKCk7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBhIG1hcCBmb3IgdGhlIHBhcmFtZXRlcnMgdHlwZSBpbmZvc1xyXG4gICAgICAgIHBhcmFtZXRlcnMuZm9yRWFjaCgocGFyYW1ldGVyKSA9PiB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBwYXJhbWV0ZXJEYXRhVHlwZU5vZGVJZCA9IHBhcmFtZXRlclR5cGVzLmdldChwYXJhbWV0ZXIuaWQpO1xyXG4gICAgICAgICAgICBjb25zdCBwYXJhbWV0ZXJEYXRhVHlwZURpc3BsYXlOYW1lID0gZGlzdGluY3RQYXJhbWV0ZXJUeXBlSWRzLmdldChwYXJhbWV0ZXJEYXRhVHlwZU5vZGVJZCEpO1xyXG5cclxuICAgICAgICAgICAgcGFyYW1ldGVyRGF0YVR5cGVJbmZvLnNldChwYXJhbWV0ZXIuaWQsIG5ldyBNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0UGFyYW1ldGVyRGF0YVR5cGUocGFyYW1ldGVyRGF0YVR5cGVOb2RlSWQsIHBhcmFtZXRlckRhdGFUeXBlRGlzcGxheU5hbWUpKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBwYXJhbWV0ZXJEYXRhVHlwZUluZm87XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyB0aGUgaWRzIGZvciB0aGUgcGFyYW1ldGVyIGRhdGEgdHlwZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IHBhcmFtZXRlcnNcclxuICAgICAqIEBwYXJhbSB7TWFwPHN0cmluZywgc3RyaW5nPn0gZGlzdGluY3RQYXJhbWV0ZXJUeXBlSWRzXHJcbiAgICAgKiBAcGFyYW0ge01hcDxzdHJpbmcsIHN0cmluZz59IHBhcmFtZXRlclR5cGVzXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyByZWFkUGFyYW1ldGVyRGF0YVR5cGVJZHMocGFyYW1ldGVyczogTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdLCBkaXN0aW5jdFBhcmFtZXRlclR5cGVJZHM6IE1hcDxzdHJpbmcsIHN0cmluZz4sIHBhcmFtZXRlclR5cGVzOiBNYXA8c3RyaW5nLCBzdHJpbmc+KSB7XHJcblxyXG4gICAgICAgIC8vIGFjdGl2YXRlIGJhdGNoIG1vZGUgd2hpY2ggcmV0dXJucyB0aGUgcmVzdCBzZXR0aW5ncyBpbnN0ZWFkIG9mIGRpcmVjdGx5IGV4ZWN1dGluZ1xyXG4gICAgICAgIE9wY1VhUmVzdFNlcnZpY2VzLmFjdGl2YXRlQmF0Y2hpbmcoKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJhbWV0ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLnJlYWROb2RlQXR0cmlidXRlKHRoaXMuX2RpYWdub3N0aWNQcm92aWRlci5zZXNzaW9uSWQsIHBhcmFtZXRlcnNbaV0uaWQsIE9wY1VhQXR0cmlidXRlLkRBVEFfVFlQRSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyByZWFkIHRoZSBwYXJhbWV0ZXIgdHlwZSBpZHNcclxuICAgICAgICBsZXQgbm9kZURhdGFUeXBlc1Jlc3VsdCA9IGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLmV4ZWN1dGVCYXRjaFJlcXVlc3QoKTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIGEgbWFwIG9mIGRhdGEgdHlwZSBpZCB0byBkYXRhIHR5cGUgbmFtZSAgXHJcbiAgICAgICAgbm9kZURhdGFUeXBlc1Jlc3VsdC5mb3JFYWNoKChyZXNwb25zZVZhbHVlLCByZXF1ZXN0SWQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcGFyYW1ldGVyVHlwZUlkID0gcmVzcG9uc2VWYWx1ZS52YWx1ZTtcclxuICAgICAgICAgICAgZGlzdGluY3RQYXJhbWV0ZXJUeXBlSWRzLnNldChwYXJhbWV0ZXJUeXBlSWQsIFwiXCIpO1xyXG4gICAgICAgICAgICBwYXJhbWV0ZXJUeXBlcy5zZXQocGFyYW1ldGVyc1tyZXF1ZXN0SWRdLmlkLCBwYXJhbWV0ZXJUeXBlSWQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyByZXRyaWV2IHRoZSB1bmlxdWUgdHlwZSBpZHNcclxuICAgICAgICBsZXQgZGF0YVR5cGVJZHMgPSBBcnJheS5mcm9tKGRpc3RpbmN0UGFyYW1ldGVyVHlwZUlkcy5rZXlzKCkpO1xyXG4gICAgICAgIHJldHVybiBkYXRhVHlwZUlkcztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZVBhcmFtZXRlckRhdGFUeXBlSW5mbyhwYXJhbWV0ZXJzOiBNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10sIHBhcmFtZXRlckRhdGFUeXBlSW5mbzogTWFwPHN0cmluZywgTW9kZWxJdGVtcy5NYXBwQ29ja3BpdFBhcmFtZXRlckRhdGFUeXBlPikge1xyXG4gICAgICAgIHBhcmFtZXRlcnMuZm9yRWFjaCgocGFyYW1ldGVyKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAvLyB1cGRhdGUgdGhlIHBhcmFtZXRlcnMgZGF0YSB0eXBlIGlmIGF2YWlsYWJsZVxyXG4gICAgICAgICAgICBjb25zdCBwYXJhbWV0ZXJUeXBlSW5mbyA9IHBhcmFtZXRlckRhdGFUeXBlSW5mby5nZXQocGFyYW1ldGVyLmlkKTtcclxuICAgICAgICAgICAgaWYgKHBhcmFtZXRlclR5cGVJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJhbWV0ZXIuZGF0YVR5cGUgPSBwYXJhbWV0ZXJUeXBlSW5mbztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlYWRzIHBhcmFtZXRlciBkYXRhIHR5cGVzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IG1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgYXN5bmMgcmVhZFBhcmFtZXRlckRhdGFUeXBlcyhtYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcnM6IE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSkge1xyXG4gICAgICAgIGxldCByZWFkUGFyYW1ldGVyRGF0YVR5cGVSZXF1ZXN0czpQcm9taXNlPGFueT5bXSA9IFtdO1xyXG4gICAgICAgIG1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVycy5mb3JFYWNoKChjb21wb25lbnRQYXJhbWV0ZXIpPT57IHJlYWRQYXJhbWV0ZXJEYXRhVHlwZVJlcXVlc3RzLnB1c2goIHRoaXMudXBkYXRlUGFyYW1ldGVyRGF0YVR5cGUoY29tcG9uZW50UGFyYW1ldGVyKSk7fSk7XHJcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwocmVhZFBhcmFtZXRlckRhdGFUeXBlUmVxdWVzdHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcn0gY29tcG9uZW50UGFyYW1ldGVyXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgYXN5bmMgdXBkYXRlUGFyYW1ldGVyRGF0YVR5cGUoY29tcG9uZW50UGFyYW1ldGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcik6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgbGV0IGRhdGFUeXBlUmVmID0gYXdhaXQgdGhpcy5yZWFkQ29tcG9uZW50UGFyYW1ldGVyRGF0YVR5cGUoY29tcG9uZW50UGFyYW1ldGVyKTtcclxuICAgICAgICBjb21wb25lbnRQYXJhbWV0ZXIuZGF0YVR5cGUgPSBkYXRhVHlwZVJlZjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlYWRzIGFuZCB1cGRhdGVzIHRoZSBwYXJhbWV0ZXIgZW51bXMgZm9yIGVudW0gZGF0YSB0eXBlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBtYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJQcm92aWRlclxyXG4gICAgICovXHJcbiAgICByZWFkUGFyYW1ldGVyRW51bXMobWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJzOiBNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pe1xyXG4gICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mby5yZWFkUGFyYW1ldGVyRW51bXMobWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWFkcyB0aGUgZGF0YSB0eXBlIG9mIGEgcGFyYW1ldGVyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyfSBjb21wb25lbnRQYXJhbWV0ZXJcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBhc3luYyByZWFkQ29tcG9uZW50UGFyYW1ldGVyRGF0YVR5cGUoY29tcG9uZW50UGFyYW1ldGVyOiBNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyKTogUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgLy8gcmVhZCB0aGUgcGFyYW1ldGVycyBkYXRhIHR5cGUgXHJcbiAgICAgICAgdmFyIHBhcmFtZXRlckRhdGFUeXBlSWQgPSBhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5yZWFkTm9kZUF0dHJpYnV0ZSh0aGlzLl9kaWFnbm9zdGljUHJvdmlkZXIuc2Vzc2lvbklkLCBjb21wb25lbnRQYXJhbWV0ZXIuaWQsIE9wY1VhQXR0cmlidXRlLkRBVEFfVFlQRSk7XHJcbiAgICAgICAgdmFyIHBhcmFtZXRlckRhdGFUeXBlTm9kZUlkID0gcGFyYW1ldGVyRGF0YVR5cGVJZDtcclxuXHJcbiAgICAgICAgLy8gdmFyIHBhcmFtZXRlckRhdGFUeXBlQnJvd3NlTmFtZSA9IGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLnJlYWROb2RlQXR0cmlidXRlKHRoaXMuX2RpYWdub3N0aWNQcm92aWRlci5zZXNzaW9uSWQsIHBhcmFtZXRlckRhdGFUeXBlTm9kZUlkLE9wY1VhQXR0cmlidXRlLkJST1dTRV9OQU1FKTtcclxuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5yZWFkRGF0YVR5cGVJbmZvKHBhcmFtZXRlckRhdGFUeXBlTm9kZUlkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlYWRzIGRhdGEgdHlwZSBpbmZvIGZvciB0aGUgc3BlY2lmaWVkIGRhdGEgdHlwZSBpZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHBhcmFtZXRlckRhdGFUeXBlTm9kZUlkXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIHJlYWREYXRhVHlwZUluZm8ocGFyYW1ldGVyRGF0YVR5cGVOb2RlSWQ6IGFueSkge1xyXG4gICAgICAgIHZhciBwYXJhbWV0ZXJEYXRhVHlwZURpc3BsYXlOYW1lID0gXCJcIjtcclxuXHJcbiAgICAgICAgLy8gcmVhZCB0aGUgZGF0YSB0eXBlIGRzcGxheSBuYW1lIGlmIG5vdCB5ZXQgYXZhaWxhYmxlXHJcbiAgICAgICAgaWYgKE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyUHJvdmlkZXIuZGF0YVR5cGVOYW1lcy5oYXMocGFyYW1ldGVyRGF0YVR5cGVOb2RlSWQpKSB7XHJcbiAgICAgICAgICAgIHBhcmFtZXRlckRhdGFUeXBlRGlzcGxheU5hbWUgPSBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlclByb3ZpZGVyLmRhdGFUeXBlTmFtZXMuZ2V0KHBhcmFtZXRlckRhdGFUeXBlTm9kZUlkKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcGFyYW1ldGVyRGF0YVR5cGVEaXNwbGF5TmFtZSA9IGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLnJlYWROb2RlQXR0cmlidXRlKHRoaXMuX2RpYWdub3N0aWNQcm92aWRlci5zZXNzaW9uSWQsIHBhcmFtZXRlckRhdGFUeXBlTm9kZUlkLCBPcGNVYUF0dHJpYnV0ZS5ESVNQTEFZX05BTUUpO1xyXG4gICAgICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlclByb3ZpZGVyLmRhdGFUeXBlTmFtZXMuc2V0KHBhcmFtZXRlckRhdGFUeXBlTm9kZUlkLHBhcmFtZXRlckRhdGFUeXBlRGlzcGxheU5hbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdmFyIHBhcmFtZXRlckRhdGFUeXBlRGVzY3IgPSBhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5yZWFkTm9kZUF0dHJpYnV0ZSh0aGlzLl9kaWFnbm9zdGljUHJvdmlkZXIuc2Vzc2lvbklkLCBwYXJhbWV0ZXJEYXRhVHlwZU5vZGVJZCxPcGNVYUF0dHJpYnV0ZS5ERVNDUklQVElPTik7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0UGFyYW1ldGVyRGF0YVR5cGUocGFyYW1ldGVyRGF0YVR5cGVOb2RlSWQsIHBhcmFtZXRlckRhdGFUeXBlRGlzcGxheU5hbWUpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlYWRzIGEgcGFyYW1ldGVycyB2YWx1ZSBhbmQgdXBkYXRlcyB0aGUgcGFyYW1ldGVycyB2YWx1ZSBpZiBzcGVjaWZpZWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJ9IGNvbXBvbmVudFBhcmFtZXRlclxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbdXBkYXRlPXRydWVdIHVwZGF0ZXMgdGhlIHBhcmFtZXRlcnMgdmFsdWUgaWYgdHJ1ZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlclByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyByZWFkQ29tcG9uZW50UGFyYW1ldGVyVmFsdWUoY29tcG9uZW50UGFyYW1ldGVyOiBNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLCB1cGRhdGUgPSB0cnVlKSB7XHJcbiAgICAgICAgdmFyIGNvbXBvbmVudFBhcmFtZXRlclZhbHVlID0gYXdhaXQgT3BjVWFSZXN0U2VydmljZXMucmVhZE5vZGVBdHRyaWJ1dGUodGhpcy5fZGlhZ25vc3RpY1Byb3ZpZGVyLnNlc3Npb25JZCwgY29tcG9uZW50UGFyYW1ldGVyLmlkKTtcclxuICAgICAgICAvLyB1cGRhdGUgdGhlIHBhcmFtZXRlcnMgdmFsdWVcclxuICAgICAgICBpZiAodXBkYXRlKSB7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudFBhcmFtZXRlci52YWx1ZSA9IGNvbXBvbmVudFBhcmFtZXRlclZhbHVlOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29tcG9uZW50UGFyYW1ldGVyVmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB3cml0ZXMgYSBwYXJhbWV0ZXIgdmFsdWVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJ9IGNvbXBvbmVudFBhcmFtZXRlclxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlclByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyB3cml0ZUNvbXBvbmVudFBhcmFtZXRlclZhbHVlKGNvbXBvbmVudFBhcmFtZXRlcjogTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcikge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHdyaXRlIHRoZSBjb21wb25lbnQgcGFyYW1ldGVyIHRvIHRoZSB0YXJnZXRcclxuICAgICAgICB2YXIgY29tcG9uZW50UGFyYW1ldGVyVmFsdWUgPSBhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy53cml0ZU5vZGVBdHRyaWJ1dGUodGhpcy5fZGlhZ25vc3RpY1Byb3ZpZGVyLnNlc3Npb25JZCwgY29tcG9uZW50UGFyYW1ldGVyLmlkLCBPcGNVYUF0dHJpYnV0ZS5WQUxVRSwgY29tcG9uZW50UGFyYW1ldGVyLnZhbHVlKTtcclxuICAgICAgICAvLyB2ZXJpZnkgaWYgdGhlIHBhcmFtZXRlciBoYXMgYmVlbiB3cml0dGVuIHNpY2Nlc3NmdWxseVxyXG4gICAgICAgIHRoaXMudmVyaWZ5UGFyYW1ldGVyV3JpdGUoY29tcG9uZW50UGFyYW1ldGVyKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudFBhcmFtZXRlclZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVmVyaWZpZXMgaWYgdGhlIHBhcmFtZXRlciBoYXMgYmVlbiBzdWNjZXNzZnVsbHkgd3JpdHRlbiBieSByZWFkaW5nIGJhY2sgdGhlIHZhbHVlIGFmdGVyIHNvbWUgZGVsYXkgdGltZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJ9IGNvbXBvbmVudFBhcmFtZXRlclxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHZlcmlmeVBhcmFtZXRlcldyaXRlKGNvbXBvbmVudFBhcmFtZXRlcjogTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcikge1xyXG5cclxuICAgICAgICAvLyBkZWxheSByZXJlYWQgZm9yIDIgdGltZXMgdGhlIG1vbml0b3Jpbmcgc2FtcGxpbmcgcmF0ZSBzbyB0aGF0IGNoYW5nZSBub3RpZmljYXRpb24gY291bGQgcG9zc2libHkgYmUgcmVjZWl2ZWRcclxuICAgICAgICBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgLy8gcmVhZCB0aGUgcGFyYW1ldGVyIHZhbHVlIGZyb20gdGhlIHRhcmdldFxyXG4gICAgICAgICAgICBsZXQgcmVmbGVjdGVkUGFyYW1ldGVyVmFsdWUgPSBhd2FpdCB0aGlzLnJlYWRDb21wb25lbnRQYXJhbWV0ZXJWYWx1ZShjb21wb25lbnRQYXJhbWV0ZXIsZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgLy8gdXBkYXRlL3Jld3JpdGUgdGhlIHBhcmFtZXRlciBpZiBpdHMgdmFsdWUgZGlmZmVycyBmcm9tIHRoZSByZWZsZWN0ZWQgdmFsdWUuXHJcbiAgICAgICAgICAgIGlmIChyZWZsZWN0ZWRQYXJhbWV0ZXJWYWx1ZSAhPT0gY29tcG9uZW50UGFyYW1ldGVyLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnRQYXJhbWV0ZXIudmFsdWUgPSByZWZsZWN0ZWRQYXJhbWV0ZXJWYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gcmVmbGVjdCB0aGUgd3JpdHRlbiB2YWx1ZSB2aWEgdGhlIHdyaXRlIHJlc3BvbnNlIGRlbGVnYXRlXHJcbiAgICAgICAgICAgIGlmIChjb21wb25lbnRQYXJhbWV0ZXIucmVmbGVjdGVkV3JpdGVSZXNwb25zZURlbGVnYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnRQYXJhbWV0ZXIucmVmbGVjdGVkV3JpdGVSZXNwb25zZURlbGVnYXRlKHJlZmxlY3RlZFBhcmFtZXRlclZhbHVlKTtcclxuICAgICAgICAgICAgICAgIC8vIGNsZWFyIHRoZSByZXNwb25zZSBkZWxlZ2F0ZSBhZnRlciB0aGUgcmVzcG9uc2UgY2FsbCB0byBtYWtlIHN1cmUgdGhhdCBldmVyeSB3cml0ZSB1c2VzIGl0cyBvd24gcmVzcG9uc2UgY2FsbGJhY2tcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudFBhcmFtZXRlci5yZWZsZWN0ZWRXcml0ZVJlc3BvbnNlRGVsZWdhdGUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSwgT3BjVWFSZXN0U2VydmljZXMubW9uaXRvcmluZ1NhbXBsaW5nSW50ZXJ2YWwqMik7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXX0=