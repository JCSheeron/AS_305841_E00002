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
define(["require", "exports", "../../communication/rest/opcUaRestServices", "../online/mappCockpitComponent", "../online/mappCockpitComponentMetaData", "../online/mappCockpitComponentReflection"], function (require, exports, opcUaRestServices_1, mappCockpitComponent_1, mappCockpitComponentMetaData_1, mappCockpitComponentReflection_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MappCockpitCommonInfoProvider = /** @class */ (function () {
        /**
         * creates an instance of MappCockpitCommonInfoProvider.
         * @memberof MappCockpitCommonInfoProvider
         */
        function MappCockpitCommonInfoProvider() {
            // holds the currently acive session id
            this._sessionId = -1;
            // holds the mapp cockpit nmespace index
            this._namespaceIndex = -1;
            // holds enum type definitions
            this._enumTypeDefinitions = [];
        }
        /**
         * gets a singleton instance of MappCockpitCommonInfoProvider
         *
         * @readonly
         * @type {MappCockpitCommonInfoProvider}
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.getInstance = function () {
            this._instance = this._instance ? this._instance : new MappCockpitCommonInfoProvider();
            return this._instance;
        };
        /**
         * initializes the info provider and populates it with commonly needed data
         *
         * @param {number} sessionId
         * @param {number} namespaceIndex
         * @returns {*}
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.prototype.initialize = function (sessionId, namespaceIndex) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this._sessionId = sessionId;
                            this._namespaceIndex = namespaceIndex;
                            // browse available enum type definitions
                            return [4 /*yield*/, this.readEnumTypeDefinitions()];
                        case 1:
                            // browse available enum type definitions
                            _a.sent();
                            console.log("MappCockpitCommonInfoProvider.readEnumTypeDefinitions %o", this._enumTypeDefinitions);
                            return [2 /*return*/];
                    }
                });
            });
        };
        MappCockpitCommonInfoProvider.prototype.readComponentMetaInfo = function (component) {
            return __awaiter(this, void 0, void 0, function () {
                var componentMetaReferences, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.browseNodeMetaInfo(this._sessionId, component.id)];
                        case 1:
                            componentMetaReferences = _a.sent();
                            if (componentMetaReferences) {
                                component.metaData = this.parseComponentMetaData(componentMetaReferences);
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Parses the components meta data
         *
         * @private
         * @param {InterfaceOpcUaRestResultNodeReference[]} metaInfoReferences
         * @returns
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.prototype.parseComponentMetaData = function (metaInfoReferences) {
            var metaData = {};
            try {
                metaInfoReferences.forEach(function (metaInfoReference) {
                    metaData[metaInfoReference.browseName] = JSON.parse(metaInfoReference.value);
                });
            }
            catch (e) {
                throw new Error("MappCockpitComponentDataModel.browseMetaData: could not parse meta data: " + e.message);
            }
            return metaData;
        };
        /**
         * Initializes the meta data with specific sections
         *
         * @static
         * @param {MappCockpitComponentMetaData} metaData
         * @returns {*}
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.initializeMetaData = function (metaData) {
            // create and populate the parameters group
            metaData["Parameters"] = {};
            metaData["Parameters"]["Watchable"] = mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.readParameters(metaData, ["Watchable"]);
            metaData["Parameters"]["Message"] = mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.readMessageParameters(metaData);
            metaData["Parameters"]["Configuration"] = mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.readParameters(metaData, ["Parameter", "Group"]);
            metaData["Parameters"]["WatchableState"] = mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.readParameters(metaData, ["WatchableState"]);
            // create and populate the methods group
            metaData["Methods"] = {};
            metaData["Methods"]["Executable"] = mappCockpitComponentReflection_1.MappCockpitComponentMethodInfo.readMethods(metaData, ["MetaConfigCommands", "CommandsStructure"], ["Command"]);
            metaData["Methods"]["QuickCommand"] = mappCockpitComponentReflection_1.MappCockpitComponentMethodInfo.readMethods(metaData, ["MetaConfigQuickCommands", "QuickCommandsStructure"], ["QuickMethod"]);
        };
        Object.defineProperty(MappCockpitCommonInfoProvider.prototype, "enumTypeDefinitions", {
            /**
             * gets the available enum type definitions
             *
             * @readonly
             * @type {Array<MappCockpitComponentParameterEnum>}
             * @memberof MappCockpitCommonInfoProvider
             */
            get: function () {
                return this._enumTypeDefinitions;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * reads and updates enum type definitions
         *
         * @private
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.prototype.readEnumTypeDefinitions = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this;
                            return [4 /*yield*/, this.browseEnumTypeDefinitions(this._sessionId, this._namespaceIndex)];
                        case 1:
                            _a._enumTypeDefinitions = _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Browses the existing enum definitions (batched).
         *
         * @private
         * @param {number} sessionId
         * @param {*} namespaceIndex
         * @returns
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.prototype.browseEnumTypeDefinitions = function (sessionId, namespaceIndex) {
            return __awaiter(this, void 0, void 0, function () {
                var enums, _a, enumValueNodesResult, mcpEnums, error_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            enums = [];
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 4, , 5]);
                            return [4 /*yield*/, this.browseEnumNodes(sessionId, namespaceIndex)];
                        case 2:
                            _a = _b.sent(), enumValueNodesResult = _a.enumValueNodesResult, mcpEnums = _a.mcpEnums;
                            // retrieve the enum values nodes and assign them as reference to the enum node
                            this.readEnumValueNodes(enumValueNodesResult, mcpEnums);
                            //// browse enum values
                            return [4 /*yield*/, this.readEnumValues(mcpEnums, sessionId)];
                        case 3:
                            //// browse enum values
                            _b.sent();
                            // create the enum definition objects
                            enums = mcpEnums.map(function (opcUaEnumsRef) { return new mappCockpitComponent_1.MappCockpitComponentParameterEnum(opcUaEnumsRef); });
                            return [3 /*break*/, 5];
                        case 4:
                            error_2 = _b.sent();
                            console.error(error_2);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/, enums];
                    }
                });
            });
        };
        /**
         * Reads the enum value nodes
         *
         * @private
         * @param {*} enumValueNodesResult
         * @param {InterfaceOpcUaRestResultNodeReference[]} mcpEnums
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.prototype.readEnumValueNodes = function (enumValueNodesResult, mcpEnums) {
            // update the enum objects with their value references
            enumValueNodesResult.forEach(function (resultValue, requestId) {
                // filter the enum value nodes
                var valueReference = resultValue.references.find(function (enumValuesNode) { return enumValuesNode.browseName.includes("EnumValues") || enumValuesNode.browseName.includes("EnumStrings"); });
                // assign the value references to the enum object
                mcpEnums[requestId].valuesRef = valueReference;
            });
        };
        /**
         * Gets the enum values
         *
         * @private
         * @param {InterfaceOpcUaRestResultNodeReference[]} mcpEnums
         * @param {number} sessionId
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.prototype.readEnumValues = function (mcpEnums, sessionId) {
            return __awaiter(this, void 0, void 0, function () {
                var i, enumValuesResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // activate batch mode
                            opcUaRestServices_1.OpcUaRestServices.activateBatching();
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < mcpEnums.length)) return [3 /*break*/, 4];
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.readNodeAttribute(sessionId, mcpEnums[i].valuesRef.nodeId, opcUaRestServices_1.OpcUaAttribute.VALUE)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4: return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.executeBatchRequest()];
                        case 5:
                            enumValuesResult = _a.sent();
                            // update the enum values ...
                            (enumValuesResult).forEach(function (responseValue, requestId) {
                                mcpEnums[requestId].enumValues = responseValue.value;
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Browses the existin enum nodes
         *
         * @private
         * @param {number} sessionId
         * @param {*} namespaceIndex
         * @returns
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.prototype.browseEnumNodes = function (sessionId, namespaceIndex) {
            return __awaiter(this, void 0, void 0, function () {
                var opcUaEnums, mcpEnums, i, enumValueNodesResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.browseNodes(sessionId, opcUaRestServices_1.OpcUaRestServices.mappCockpitEnumsId)];
                        case 1:
                            opcUaEnums = _a.sent();
                            mcpEnums = opcUaEnums.filter(function (opcUaEnum) { return opcUaEnum.nodeId.indexOf(opcUaRestServices_1.OpcUaRestServices.mappCockpitNamespacePrefix + namespaceIndex) > -1; });
                            // activate batching 
                            opcUaRestServices_1.OpcUaRestServices.activateBatching();
                            i = 0;
                            _a.label = 2;
                        case 2:
                            if (!(i < mcpEnums.length)) return [3 /*break*/, 5];
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.browseNodes(sessionId, mcpEnums[i].nodeId)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            i++;
                            return [3 /*break*/, 2];
                        case 5: return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.executeBatchRequest()];
                        case 6:
                            enumValueNodesResult = _a.sent();
                            return [2 /*return*/, { enumValueNodesResult: enumValueNodesResult, mcpEnums: mcpEnums }];
                    }
                });
            });
        };
        /**
         * reads enum definitions for parameters
         *
         * @param {*} metaInfo
         * @returns an object with enum definitions with the parameter name as key
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.prototype.readEnumParameterDefinitions = function (componentParameters, metaInfo) {
            var enumParameters = {};
            // get the target model enum types
            var opcUaEnumTypes = MappCockpitCommonInfoProvider.getInstance().enumTypeDefinitions;
            // get the meta parameter infos
            var metaParameterInfo = MappCockpitCommonInfoProvider.readEnumMetaInfo(metaInfo);
            if (metaParameterInfo != undefined) {
                // get possible enum type meta items
                enumParameters = this.readEnumDefinitionsFromMetaInfo(metaParameterInfo, opcUaEnumTypes);
            }
            else {
                // without meta info we try to use the target model definitions.
                enumParameters = this.readEnumDefinitionFromTargetModel(componentParameters, opcUaEnumTypes);
            }
            return enumParameters;
        };
        /**
         * Reads the enum parameter meta info
         *
         * @private
         * @param {*} metaInfo
         * @returns
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.readEnumMetaInfo = function (metaInfo) {
            var metaParameterInfo;
            if (metaInfo) {
                // If no MetaConfigConfigProps are available only use watchables
                if (metaInfo.MetaConfigConfigProps != undefined) {
                    metaParameterInfo = metaInfo.MetaConfigConfigProps.ConfigurationStructure.Childs;
                    metaParameterInfo = metaParameterInfo.concat(metaInfo.MetaConfigWatchables.WatchablesStructure.Childs);
                }
                else {
                    if (metaInfo.MetaConfigWatchables != undefined) {
                        metaParameterInfo = metaInfo.MetaConfigWatchables.WatchablesStructure.Childs;
                    }
                }
            }
            return metaParameterInfo;
        };
        /**
         * Reads the available enum type definitions from the meta info
         *
         * @private
         * @param {*} metaParameterInfo
         * @param {MappCockpitComponentParameterEnum[]} opcUaEnumTypes
         * @returns {*}
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.prototype.readEnumDefinitionsFromMetaInfo = function (metaParameterInfo, opcUaEnumTypes) {
            var enumParameters = {};
            var metaParameterUsingEnums = MappCockpitCommonInfoProvider.readEnumMetaDefinitions(metaParameterInfo);
            metaParameterUsingEnums.forEach(function (enumParameterMetaItem) {
                var enumTypeRef = enumParameterMetaItem.TypeDef.EnumTypeRef;
                var matchingOpcUaEnumTypes = opcUaEnumTypes.filter(function (opcUaEnumType) { return opcUaEnumType.browseName === enumTypeRef; });
                if (matchingOpcUaEnumTypes.length === 1) {
                    // save the matching enum type info for the parameter name
                    enumParameters[enumParameterMetaItem.Ref] = matchingOpcUaEnumTypes[0];
                }
                else {
                    console.error("MappCockpitComponentParameterInfo - No enum type found for %o %o", enumTypeRef, enumParameterMetaItem);
                }
            });
            return enumParameters;
        };
        /**
         * Reads the enum definitions contained in the meta data
         *
         * @static
         * @param {*} metaParameterInfo
         * @returns
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.readEnumMetaDefinitions = function (metaParameterInfo) {
            var typeDefinitions = mappCockpitComponentMetaData_1.MappCockpitComponentMetaData.filterMetaItems(metaParameterInfo, ["Parameter", "Watchable", "Group"], function (metaItemGroupOrParameter) { return metaItemGroupOrParameter.hasOwnProperty("TypeDef"); });
            var enumTypeDefinitions = typeDefinitions.filter(function (typeDefinition) { return typeDefinition.TypeDef.hasOwnProperty("EnumTypeRef"); });
            return enumTypeDefinitions;
        };
        /**
         * reads the available enum type defintions from the target model
         *
         * @private
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @param {MappCockpitComponentParameterEnum[]} opcUaEnumTypes
         * @returns {*}
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.prototype.readEnumDefinitionFromTargetModel = function (componentParameters, opcUaEnumTypes) {
            var enumParameters = {};
            componentParameters.forEach(function (componentParameter) {
                var matchingOpcUaEnumTypes = opcUaEnumTypes.filter(function (opcUaEnumType) { return opcUaEnumType.browseName === componentParameter.dataType.name; });
                if (matchingOpcUaEnumTypes.length === 1) {
                    enumParameters[componentParameter.browseName] = matchingOpcUaEnumTypes[0];
                }
            });
            return enumParameters;
        };
        /**
         * reads enum type definitions for method parameters
         *
         * @param {MappCockpitComponentMethod} method
         * @param {*} metaInfo
         * @returns
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.prototype.readMetaEnumMethodParameterDefinitions = function (method, metaInfo) {
            var enumParameters = {};
            var opcUaEnumTypes = MappCockpitCommonInfoProvider.getInstance().enumTypeDefinitions;
            if (metaInfo == undefined)
                return enumParameters;
            // get the meta parameter infos
            if (metaInfo.MetaConfigCommands == undefined)
                return enumParameters;
            var metaMethodParameterInfo = metaInfo.MetaConfigCommands.CommandsStructure.Childs;
            if (metaMethodParameterInfo) {
                // get the command meta info
                var metaCommandInfo = mappCockpitComponentMetaData_1.MappCockpitComponentMetaData.filterMetaItems(metaMethodParameterInfo, ["Command"], function (command) { return command.Ref === method.browseName; });
                // get the commands parameter info
                var metaParameterUsingEnums = mappCockpitComponentMetaData_1.MappCockpitComponentMetaData.filterMetaItems(metaCommandInfo, ["Parameter"], function (metaItemGroupOrParameter) { return metaItemGroupOrParameter.hasOwnProperty("TypeDef"); });
                var _loop_1 = function (i) {
                    var enumParameterMetaItem = metaParameterUsingEnums[i];
                    var enumTypeRef = enumParameterMetaItem.TypeDef.EnumTypeRef;
                    var matchingOpcUaEnumTypes = opcUaEnumTypes.filter(function (opcUaEnumType) { return opcUaEnumType.browseName === enumTypeRef; });
                    if (matchingOpcUaEnumTypes.length > 0) {
                        // save the matching enum type info for the parameter name
                        enumParameters[enumParameterMetaItem.Ref] = matchingOpcUaEnumTypes[0];
                    }
                    else {
                        console.error("MappCockpitMethodParameterInfo - No enum type found for %o %o", enumTypeRef, enumParameterMetaItem);
                    }
                };
                // find and collect matching opcua enum type refs
                for (var i = 0; i < metaParameterUsingEnums.length; i++) {
                    _loop_1(i);
                }
            }
            return enumParameters;
        };
        /**
         * browses the enum values a sjson (for older targets)
         *
         * @private
         * @static
         * @param {number} sessionId
         * @param {*} opcUaEnum
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.prototype.browseEnumValuesJson = function (sessionId, opcUaEnum) {
            return __awaiter(this, void 0, void 0, function () {
                var enumValuesJsonString, enumValuesJson, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.readNodeAttribute(sessionId, opcUaEnum.nodeId, opcUaRestServices_1.OpcUaAttribute.DESCRIPTION)];
                        case 1:
                            enumValuesJsonString = _a.sent();
                            enumValuesJson = JSON.parse(enumValuesJsonString).enumValues.map(function (enumValueItem) { return { displayName: { locale: "", text: enumValueItem.text }, value: enumValueItem.value }; });
                            opcUaEnum.enumValuesJson = enumValuesJson;
                            return [3 /*break*/, 3];
                        case 2:
                            error_3 = _a.sent();
                            throw error_3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * browses the opc ua enum node for its value definitions
         *
         * @private
         * @static
         * @param {number} sessionId
         * @param {*} opcUaEnum
         * @returns
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.prototype.browseEnumValues = function (sessionId, opcUaEnum) {
            return __awaiter(this, void 0, void 0, function () {
                var enumValuesRef, enumValuesNodes, enumValues, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            enumValuesRef = undefined;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 5, , 6]);
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.browseNodes(sessionId, opcUaEnum.nodeId)];
                        case 2:
                            enumValuesNodes = _a.sent();
                            if (!enumValuesNodes) return [3 /*break*/, 4];
                            enumValues = enumValuesNodes.filter(function (enumValuesNode) { return enumValuesNode.browseName === "EnumValues" || enumValuesNode.browseName === "EnumStrings"; });
                            if (!(enumValues && enumValues.length > 0)) return [3 /*break*/, 4];
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.readNodeAttribute(sessionId, enumValues[0].nodeId, opcUaRestServices_1.OpcUaAttribute.VALUE)];
                        case 3:
                            enumValuesRef = _a.sent();
                            _a.label = 4;
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            error_4 = _a.sent();
                            throw error_4;
                        case 6:
                            opcUaEnum.enumValues = enumValuesRef;
                            return [2 /*return*/];
                    }
                });
            });
        };
        return MappCockpitCommonInfoProvider;
    }());
    exports.MappCockpitCommonInfoProvider = MappCockpitCommonInfoProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9kaWFnbm9zdGljcy9tYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFPQTtRQWVJOzs7V0FHRztRQUNIO1lBakJBLHVDQUF1QztZQUMvQixlQUFVLEdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDaEMsd0NBQXdDO1lBQ2hDLG9CQUFlLEdBQVcsQ0FBQyxDQUFDLENBQUM7WUFFckMsOEJBQThCO1lBQ3RCLHlCQUFvQixHQUFVLEVBQUUsQ0FBQztRQWF6QyxDQUFDO1FBR0Q7Ozs7OztXQU1HO1FBQ1cseUNBQVcsR0FBekI7WUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksNkJBQTZCLEVBQUUsQ0FBQztZQUN2RixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQztRQUdEOzs7Ozs7O1dBT0c7UUFDRyxrREFBVSxHQUFoQixVQUFpQixTQUFpQixFQUFFLGNBQXNCOzs7Ozs0QkFFdEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7NEJBQzVCLElBQUksQ0FBQyxlQUFlLEdBQUcsY0FBYyxDQUFDOzRCQUd0Qyx5Q0FBeUM7NEJBQ3pDLHFCQUFNLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxFQUFBOzs0QkFEcEMseUNBQXlDOzRCQUN6QyxTQUFvQyxDQUFDOzRCQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLDBEQUEwRCxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDOzs7OztTQUd0RztRQUdLLDZEQUFxQixHQUEzQixVQUE0QixTQUErQjs7Ozs7Ozs0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LE1BQU0sT0FBSyxDQUFDOzs7OztTQUVuQjtRQUVEOzs7Ozs7Ozs7V0FTRztRQUNXLHdEQUFnQixHQUE5QixVQUErQixTQUFpQixFQUFFLFNBQWM7Ozs7Ozs0QkFDeEQsYUFBYSxHQUFHLFNBQVMsQ0FBQzs7Ozs0QkFFSixxQkFBTSxxQ0FBaUIsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBQTs7NEJBQWxGLGVBQWUsR0FBRyxTQUFnRTtpQ0FDbEYsZUFBZSxFQUFmLHdCQUFlOzRCQUNYLFVBQVUsR0FBRyxlQUFlLENBQUMsTUFBTSxDQUFDLFVBQUMsY0FBYyxJQUFPLE9BQWEsY0FBZSxDQUFDLFVBQVUsS0FBSyxZQUFZLElBQVUsY0FBZSxDQUFDLFVBQVUsS0FBSyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQ0FDN0ssQ0FBQSxVQUFVLElBQUksVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUEsRUFBbkMsd0JBQW1DOzRCQUNuQixxQkFBTSxxQ0FBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxrQ0FBYyxDQUFDLEtBQUssQ0FBQyxFQUFBOzs0QkFBaEgsYUFBYSxHQUFHLFNBQWdHLENBQUM7Ozs7OzRCQUl6SCxNQUFNLE9BQUssQ0FBQzs7NEJBRWhCLFNBQVMsQ0FBQyxVQUFVLEdBQUcsYUFBYSxDQUFDOzs7OztTQUN4QztRQUNMLG9DQUFDO0lBQUQsQ0FBQyxBQXBjRCxJQW9jQztJQUdRLHNFQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9wY1VhUmVzdFNlcnZpY2VzLCBPcGNVYUF0dHJpYnV0ZSB9IGZyb20gXCIuLi8uLi9jb21tdW5pY2F0aW9uL3Jlc3Qvb3BjVWFSZXN0U2VydmljZXNcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtLCBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCwgTWFwcENvY2twaXRDb21wb25lbnQsIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyIH0gZnJvbSBcIi4uL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGFEYXRhIH0gZnJvbSBcIi4uL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudE1ldGFEYXRhXCI7XHJcbmltcG9ydCB7IEludGVyZmFjZU9wY1VhUmVzdFJlc3VsdE5vZGVSZWZlcmVuY2UgfSBmcm9tIFwiLi4vLi4vY29tbXVuaWNhdGlvbi9yZXN0L29wY1VhUmVzdFJlc3VsdFR5cGVzXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mbywgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvIH0gZnJvbSBcIi4uL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFJlZmxlY3Rpb25cIjtcclxuXHJcblxyXG5jbGFzcyBNYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlciB7XHJcblxyXG4gICAgLy8gaG9sZHMgdGhlIGN1cnJlbnRseSBhY2l2ZSBzZXNzaW9uIGlkXHJcbiAgICBwcml2YXRlIF9zZXNzaW9uSWQ6IG51bWJlciA9IC0xO1xyXG4gICAgLy8gaG9sZHMgdGhlIG1hcHAgY29ja3BpdCBubWVzcGFjZSBpbmRleFxyXG4gICAgcHJpdmF0ZSBfbmFtZXNwYWNlSW5kZXg6IG51bWJlciA9IC0xO1xyXG5cclxuICAgIC8vIGhvbGRzIGVudW0gdHlwZSBkZWZpbml0aW9uc1xyXG4gICAgcHJpdmF0ZSBfZW51bVR5cGVEZWZpbml0aW9uczogYW55W10gPSBbXTtcclxuXHJcbiAgICAvLyBob2xkcyBhbiBpbnN0YW5jZSBvZiB0aGlzIGNsYXNzXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyO1xyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyLlxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgYSBzaW5nbGV0b24gaW5zdGFuY2Ugb2YgTWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtNYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlcn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyIHtcclxuICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IHRoaXMuX2luc3RhbmNlID8gdGhpcy5faW5zdGFuY2UgOiBuZXcgTWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXIoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaW5pdGlhbGl6ZXMgdGhlIGluZm8gcHJvdmlkZXIgYW5kIHBvcHVsYXRlcyBpdCB3aXRoIGNvbW1vbmx5IG5lZWRlZCBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG5hbWVzcGFjZUluZGV4XHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlclxyXG4gICAgICovXHJcbiAgICBhc3luYyBpbml0aWFsaXplKHNlc3Npb25JZDogbnVtYmVyLCBuYW1lc3BhY2VJbmRleDogbnVtYmVyKTogUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgdGhpcy5fc2Vzc2lvbklkID0gc2Vzc2lvbklkO1xyXG4gICAgICAgIHRoaXMuX25hbWVzcGFjZUluZGV4ID0gbmFtZXNwYWNlSW5kZXg7XHJcblxyXG5cclxuICAgICAgICAvLyBicm93c2UgYXZhaWxhYmxlIGVudW0gdHlwZSBkZWZpbml0aW9uc1xyXG4gICAgICAgIGF3YWl0IHRoaXMucmVhZEVudW1UeXBlRGVmaW5pdGlvbnMoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyLnJlYWRFbnVtVHlwZURlZmluaXRpb25zICVvXCIsIHRoaXMuX2VudW1UeXBlRGVmaW5pdGlvbnMpO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGFzeW5jIHJlYWRDb21wb25lbnRNZXRhSW5mbyhjb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IGNvbXBvbmVudE1ldGFSZWZlcmVuY2VzID0gYXdhaXQgT3BjVWFSZXN0U2VydmljZXMuYnJvd3NlTm9kZU1ldGFJbmZvKHRoaXMuX3Nlc3Npb25JZCwgY29tcG9uZW50LmlkKTtcclxuICAgICAgICAgICAgaWYgKGNvbXBvbmVudE1ldGFSZWZlcmVuY2VzICkge1xyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50Lm1ldGFEYXRhID0gdGhpcy5wYXJzZUNvbXBvbmVudE1ldGFEYXRhKGNvbXBvbmVudE1ldGFSZWZlcmVuY2VzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFBhcnNlcyB0aGUgY29tcG9uZW50cyBtZXRhIGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJbnRlcmZhY2VPcGNVYVJlc3RSZXN1bHROb2RlUmVmZXJlbmNlW119IG1ldGFJbmZvUmVmZXJlbmNlc1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHBhcnNlQ29tcG9uZW50TWV0YURhdGEobWV0YUluZm9SZWZlcmVuY2VzOiBJbnRlcmZhY2VPcGNVYVJlc3RSZXN1bHROb2RlUmVmZXJlbmNlW10pIHtcclxuICAgICAgICBsZXQgbWV0YURhdGEgPSB7fTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbWV0YUluZm9SZWZlcmVuY2VzLmZvckVhY2goKG1ldGFJbmZvUmVmZXJlbmNlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIG1ldGFEYXRhW21ldGFJbmZvUmVmZXJlbmNlLmJyb3dzZU5hbWVdID0gSlNPTi5wYXJzZShtZXRhSW5mb1JlZmVyZW5jZS52YWx1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwuYnJvd3NlTWV0YURhdGE6IGNvdWxkIG5vdCBwYXJzZSBtZXRhIGRhdGE6IFwiICsgZS5tZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1ldGFEYXRhO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIHRoZSBtZXRhIGRhdGEgd2l0aCBzcGVjaWZpYyBzZWN0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRNZXRhRGF0YX0gbWV0YURhdGFcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBpbml0aWFsaXplTWV0YURhdGEobWV0YURhdGE6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0YURhdGEpOiBhbnkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGNyZWF0ZSBhbmQgcG9wdWxhdGUgdGhlIHBhcmFtZXRlcnMgZ3JvdXBcclxuICAgICAgICBtZXRhRGF0YVtcIlBhcmFtZXRlcnNcIl0gPSB7fTtcclxuICAgICAgICBtZXRhRGF0YVtcIlBhcmFtZXRlcnNcIl1bXCJXYXRjaGFibGVcIl0gPSBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8ucmVhZFBhcmFtZXRlcnMobWV0YURhdGEsIFtcIldhdGNoYWJsZVwiXSk7XHJcbiAgICAgICAgbWV0YURhdGFbXCJQYXJhbWV0ZXJzXCJdW1wiTWVzc2FnZVwiXSA9IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mby5yZWFkTWVzc2FnZVBhcmFtZXRlcnMobWV0YURhdGEpO1xyXG4gICAgICAgIG1ldGFEYXRhW1wiUGFyYW1ldGVyc1wiXVtcIkNvbmZpZ3VyYXRpb25cIl0gPSBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8ucmVhZFBhcmFtZXRlcnMobWV0YURhdGEsIFtcIlBhcmFtZXRlclwiLCBcIkdyb3VwXCJdKTtcclxuICAgICAgICBtZXRhRGF0YVtcIlBhcmFtZXRlcnNcIl1bXCJXYXRjaGFibGVTdGF0ZVwiXSA9IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mby5yZWFkUGFyYW1ldGVycyhtZXRhRGF0YSwgW1wiV2F0Y2hhYmxlU3RhdGVcIl0pO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgYW5kIHBvcHVsYXRlIHRoZSBtZXRob2RzIGdyb3VwXHJcbiAgICAgICAgbWV0YURhdGFbXCJNZXRob2RzXCJdID0ge307XHJcbiAgICAgICAgbWV0YURhdGFbXCJNZXRob2RzXCJdW1wiRXhlY3V0YWJsZVwiXSA9IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mby5yZWFkTWV0aG9kcyhtZXRhRGF0YSwgW1wiTWV0YUNvbmZpZ0NvbW1hbmRzXCIsIFwiQ29tbWFuZHNTdHJ1Y3R1cmVcIl0sIFtcIkNvbW1hbmRcIl0pO1xyXG4gICAgICAgIG1ldGFEYXRhW1wiTWV0aG9kc1wiXVtcIlF1aWNrQ29tbWFuZFwiXSA9IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mby5yZWFkTWV0aG9kcyhtZXRhRGF0YSwgW1wiTWV0YUNvbmZpZ1F1aWNrQ29tbWFuZHNcIiwgXCJRdWlja0NvbW1hbmRzU3RydWN0dXJlXCJdLCBbXCJRdWlja01ldGhvZFwiXSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyB0aGUgYXZhaWxhYmxlIGVudW0gdHlwZSBkZWZpbml0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge0FycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBlbnVtVHlwZURlZmluaXRpb25zKCk6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lbnVtVHlwZURlZmluaXRpb25zO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlYWRzIGFuZCB1cGRhdGVzIGVudW0gdHlwZSBkZWZpbml0aW9uc1xyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgcmVhZEVudW1UeXBlRGVmaW5pdGlvbnMoKSB7XHJcbiAgICAgICAgdGhpcy5fZW51bVR5cGVEZWZpbml0aW9ucyA9IGF3YWl0IHRoaXMuYnJvd3NlRW51bVR5cGVEZWZpbml0aW9ucyh0aGlzLl9zZXNzaW9uSWQsIHRoaXMuX25hbWVzcGFjZUluZGV4KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCcm93c2VzIHRoZSBleGlzdGluZyBlbnVtIGRlZmluaXRpb25zIChiYXRjaGVkKS5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZFxyXG4gICAgICogQHBhcmFtIHsqfSBuYW1lc3BhY2VJbmRleFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGJyb3dzZUVudW1UeXBlRGVmaW5pdGlvbnMoc2Vzc2lvbklkOiBudW1iZXIsIG5hbWVzcGFjZUluZGV4KSB7XHJcbiAgICAgICAgbGV0IGVudW1zOiBhbnlbXSA9IFtdO1xyXG5cclxuICAgICAgICB0cnkge1xyXG5cclxuICAgICAgICAgICAgLy8vL1xyXG4gICAgICAgICAgICAvLyBicm93c2UgZW51bSBub2Rlc1xyXG4gICAgICAgICAgICAvLyBnZXQgYWxsIGF2YWlsYWJsZSBlbnVtIG5vZGVzXHJcbiAgICAgICAgICAgIGxldCB7IGVudW1WYWx1ZU5vZGVzUmVzdWx0LCBtY3BFbnVtcyB9ID0gYXdhaXQgdGhpcy5icm93c2VFbnVtTm9kZXMoc2Vzc2lvbklkLCBuYW1lc3BhY2VJbmRleCk7XHJcblxyXG4gICAgICAgICAgICAvLyByZXRyaWV2ZSB0aGUgZW51bSB2YWx1ZXMgbm9kZXMgYW5kIGFzc2lnbiB0aGVtIGFzIHJlZmVyZW5jZSB0byB0aGUgZW51bSBub2RlXHJcbiAgICAgICAgICAgIHRoaXMucmVhZEVudW1WYWx1ZU5vZGVzKGVudW1WYWx1ZU5vZGVzUmVzdWx0LCBtY3BFbnVtcyk7XHJcblxyXG4gICAgICAgICAgICAvLy8vIGJyb3dzZSBlbnVtIHZhbHVlc1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnJlYWRFbnVtVmFsdWVzKG1jcEVudW1zLCBzZXNzaW9uSWQpO1xyXG5cclxuICAgICAgICAgICAgLy8gY3JlYXRlIHRoZSBlbnVtIGRlZmluaXRpb24gb2JqZWN0c1xyXG4gICAgICAgICAgICBlbnVtcyA9IG1jcEVudW1zLm1hcCgob3BjVWFFbnVtc1JlZikgPT4geyByZXR1cm4gbmV3IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bShvcGNVYUVudW1zUmVmKSB9KTtcclxuXHJcblxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiBcclxuICAgICAgICByZXR1cm4gZW51bXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyB0aGUgZW51bSB2YWx1ZSBub2Rlc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGVudW1WYWx1ZU5vZGVzUmVzdWx0XHJcbiAgICAgKiBAcGFyYW0ge0ludGVyZmFjZU9wY1VhUmVzdFJlc3VsdE5vZGVSZWZlcmVuY2VbXX0gbWNwRW51bXNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlYWRFbnVtVmFsdWVOb2RlcyhlbnVtVmFsdWVOb2Rlc1Jlc3VsdDogTWFwPHN0cmluZyxhbnk+LCBtY3BFbnVtczogSW50ZXJmYWNlT3BjVWFSZXN0UmVzdWx0Tm9kZVJlZmVyZW5jZVtdKSB7XHJcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBlbnVtIG9iamVjdHMgd2l0aCB0aGVpciB2YWx1ZSByZWZlcmVuY2VzXHJcbiAgICAgICAgZW51bVZhbHVlTm9kZXNSZXN1bHQuZm9yRWFjaCgocmVzdWx0VmFsdWUscmVxdWVzdElkKT0+e1xyXG4gICAgICAgICAgICAvLyBmaWx0ZXIgdGhlIGVudW0gdmFsdWUgbm9kZXNcclxuICAgICAgICAgICAgY29uc3QgdmFsdWVSZWZlcmVuY2UgPSByZXN1bHRWYWx1ZS5yZWZlcmVuY2VzLmZpbmQoKGVudW1WYWx1ZXNOb2RlKSA9PiB7IHJldHVybiAoPGFueT5lbnVtVmFsdWVzTm9kZSkuYnJvd3NlTmFtZS5pbmNsdWRlcyhcIkVudW1WYWx1ZXNcIikgfHwgKDxhbnk+ZW51bVZhbHVlc05vZGUpLmJyb3dzZU5hbWUuaW5jbHVkZXMoXCJFbnVtU3RyaW5nc1wiKTsgfSk7XHJcbiAgICAgICAgICAgIC8vIGFzc2lnbiB0aGUgdmFsdWUgcmVmZXJlbmNlcyB0byB0aGUgZW51bSBvYmplY3RcclxuICAgICAgICAgICAgKDxhbnk+bWNwRW51bXNbcmVxdWVzdElkXSkudmFsdWVzUmVmID0gdmFsdWVSZWZlcmVuY2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBlbnVtIHZhbHVlcyBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJbnRlcmZhY2VPcGNVYVJlc3RSZXN1bHROb2RlUmVmZXJlbmNlW119IG1jcEVudW1zXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vzc2lvbklkXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyByZWFkRW51bVZhbHVlcyhtY3BFbnVtczogSW50ZXJmYWNlT3BjVWFSZXN0UmVzdWx0Tm9kZVJlZmVyZW5jZVtdLCBzZXNzaW9uSWQ6IG51bWJlcikge1xyXG4gICAgICAgXHJcbiAgICAgICAgLy8gYWN0aXZhdGUgYmF0Y2ggbW9kZVxyXG4gICAgICAgIE9wY1VhUmVzdFNlcnZpY2VzLmFjdGl2YXRlQmF0Y2hpbmcoKTtcclxuXHJcbiAgICAgICAgLy8gcHJlcGFyZSByZWFkIGVudW0gdmFsdWUgcmVxdWVzdHNcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1jcEVudW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLnJlYWROb2RlQXR0cmlidXRlKHNlc3Npb25JZCwgKDxhbnk+bWNwRW51bXNbaV0pLnZhbHVlc1JlZi5ub2RlSWQsIE9wY1VhQXR0cmlidXRlLlZBTFVFKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgZW51bSB2YWx1ZXMgYmF0Y2hlZFxyXG4gICAgICAgIGxldCBlbnVtVmFsdWVzUmVzdWx0ID0gYXdhaXQgT3BjVWFSZXN0U2VydmljZXMuZXhlY3V0ZUJhdGNoUmVxdWVzdCgpO1xyXG5cclxuICAgICAgICAvLyB1cGRhdGUgdGhlIGVudW0gdmFsdWVzIC4uLlxyXG4gICAgICAgIChlbnVtVmFsdWVzUmVzdWx0KS5mb3JFYWNoKChyZXNwb25zZVZhbHVlLHJlcXVlc3RJZCk9PntcclxuICAgICAgICAgICAgKDxhbnk+bWNwRW51bXNbcmVxdWVzdElkXSkuZW51bVZhbHVlcyA9cmVzcG9uc2VWYWx1ZS52YWx1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJyb3dzZXMgdGhlIGV4aXN0aW4gZW51bSBub2Rlc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vzc2lvbklkXHJcbiAgICAgKiBAcGFyYW0geyp9IG5hbWVzcGFjZUluZGV4XHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgYnJvd3NlRW51bU5vZGVzKHNlc3Npb25JZDogbnVtYmVyLCBuYW1lc3BhY2VJbmRleDogYW55KSB7XHJcblxyXG4gICAgICAgIGxldCBvcGNVYUVudW1zID0gYXdhaXQgT3BjVWFSZXN0U2VydmljZXMuYnJvd3NlTm9kZXMoc2Vzc2lvbklkLCBPcGNVYVJlc3RTZXJ2aWNlcy5tYXBwQ29ja3BpdEVudW1zSWQpO1xyXG4gICAgICAgIC8vIGZpbHRlciBlbnVtcyB3aXRoaW4gbWFwcCBjb2NrcGl0IG5hbWVzcGFjZVxyXG4gICAgICAgIGxldCBtY3BFbnVtcyA9IG9wY1VhRW51bXMuZmlsdGVyKChvcGNVYUVudW0pID0+IHsgcmV0dXJuIG9wY1VhRW51bS5ub2RlSWQuaW5kZXhPZihPcGNVYVJlc3RTZXJ2aWNlcy5tYXBwQ29ja3BpdE5hbWVzcGFjZVByZWZpeCArIG5hbWVzcGFjZUluZGV4KSA+IC0xOyB9KTtcclxuXHJcbiAgICAgICAgLy8gYWN0aXZhdGUgYmF0Y2hpbmcgXHJcbiAgICAgICAgT3BjVWFSZXN0U2VydmljZXMuYWN0aXZhdGVCYXRjaGluZygpO1xyXG5cclxuICAgICAgICAvLyBjb2xsZWN0IHJlcXVlc3RzIGZvciBicm93c2luZyB0aGUgZW51bSBwcm9wZXJ0aWVzXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtY3BFbnVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgYXdhaXQgT3BjVWFSZXN0U2VydmljZXMuYnJvd3NlTm9kZXMoc2Vzc2lvbklkLCBtY3BFbnVtc1tpXS5ub2RlSWQpIGFzIGFueTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBlbnVtIG5vZGVzXHJcbiAgICAgICAgbGV0IGVudW1WYWx1ZU5vZGVzUmVzdWx0ID0gYXdhaXQgT3BjVWFSZXN0U2VydmljZXMuZXhlY3V0ZUJhdGNoUmVxdWVzdCgpO1xyXG5cclxuICAgICAgICByZXR1cm4geyBlbnVtVmFsdWVOb2Rlc1Jlc3VsdCwgbWNwRW51bXMgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlYWRzIGVudW0gZGVmaW5pdGlvbnMgZm9yIHBhcmFtZXRlcnNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IG1ldGFJbmZvXHJcbiAgICAgKiBAcmV0dXJucyBhbiBvYmplY3Qgd2l0aCBlbnVtIGRlZmluaXRpb25zIHdpdGggdGhlIHBhcmFtZXRlciBuYW1lIGFzIGtleVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHJlYWRFbnVtUGFyYW1ldGVyRGVmaW5pdGlvbnMoY29tcG9uZW50UGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSwgbWV0YUluZm86IGFueSkge1xyXG4gICAgICAgIGxldCBlbnVtUGFyYW1ldGVycyA9IHt9O1xyXG4gICAgICAgIC8vIGdldCB0aGUgdGFyZ2V0IG1vZGVsIGVudW0gdHlwZXNcclxuICAgICAgICBsZXQgb3BjVWFFbnVtVHlwZXMgPSBNYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlci5nZXRJbnN0YW5jZSgpLmVudW1UeXBlRGVmaW5pdGlvbnM7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBtZXRhIHBhcmFtZXRlciBpbmZvc1xyXG4gICAgICAgIGxldCBtZXRhUGFyYW1ldGVySW5mbyA9IE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyLnJlYWRFbnVtTWV0YUluZm8obWV0YUluZm8pO1xyXG4gICAgICAgIGlmIChtZXRhUGFyYW1ldGVySW5mbyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgLy8gZ2V0IHBvc3NpYmxlIGVudW0gdHlwZSBtZXRhIGl0ZW1zXHJcbiAgICAgICAgICAgIGVudW1QYXJhbWV0ZXJzID0gdGhpcy5yZWFkRW51bURlZmluaXRpb25zRnJvbU1ldGFJbmZvKG1ldGFQYXJhbWV0ZXJJbmZvLCBvcGNVYUVudW1UeXBlcyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gd2l0aG91dCBtZXRhIGluZm8gd2UgdHJ5IHRvIHVzZSB0aGUgdGFyZ2V0IG1vZGVsIGRlZmluaXRpb25zLlxyXG4gICAgICAgICAgICBlbnVtUGFyYW1ldGVycyA9IHRoaXMucmVhZEVudW1EZWZpbml0aW9uRnJvbVRhcmdldE1vZGVsKGNvbXBvbmVudFBhcmFtZXRlcnMsIG9wY1VhRW51bVR5cGVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVudW1QYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgdGhlIGVudW0gcGFyYW1ldGVyIG1ldGEgaW5mb1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IG1ldGFJbmZvXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByZWFkRW51bU1ldGFJbmZvKG1ldGFJbmZvOiBhbnkpIHtcclxuICAgICAgICBsZXQgbWV0YVBhcmFtZXRlckluZm87XHJcbiAgICAgICAgaWYgKG1ldGFJbmZvKSB7XHJcbiAgICAgICAgICAgIC8vIElmIG5vIE1ldGFDb25maWdDb25maWdQcm9wcyBhcmUgYXZhaWxhYmxlIG9ubHkgdXNlIHdhdGNoYWJsZXNcclxuICAgICAgICAgICAgaWYgKG1ldGFJbmZvLk1ldGFDb25maWdDb25maWdQcm9wcyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIG1ldGFQYXJhbWV0ZXJJbmZvID0gbWV0YUluZm8uTWV0YUNvbmZpZ0NvbmZpZ1Byb3BzLkNvbmZpZ3VyYXRpb25TdHJ1Y3R1cmUuQ2hpbGRzO1xyXG4gICAgICAgICAgICAgICAgbWV0YVBhcmFtZXRlckluZm8gPSBtZXRhUGFyYW1ldGVySW5mby5jb25jYXQobWV0YUluZm8uTWV0YUNvbmZpZ1dhdGNoYWJsZXMuV2F0Y2hhYmxlc1N0cnVjdHVyZS5DaGlsZHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1ldGFJbmZvLk1ldGFDb25maWdXYXRjaGFibGVzICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldGFQYXJhbWV0ZXJJbmZvID0gbWV0YUluZm8uTWV0YUNvbmZpZ1dhdGNoYWJsZXMuV2F0Y2hhYmxlc1N0cnVjdHVyZS5DaGlsZHM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtZXRhUGFyYW1ldGVySW5mbztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIHRoZSBhdmFpbGFibGUgZW51bSB0eXBlIGRlZmluaXRpb25zIGZyb20gdGhlIG1ldGEgaW5mb1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IG1ldGFQYXJhbWV0ZXJJbmZvXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bVtdfSBvcGNVYUVudW1UeXBlc1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWFkRW51bURlZmluaXRpb25zRnJvbU1ldGFJbmZvKG1ldGFQYXJhbWV0ZXJJbmZvOiBhbnksIG9wY1VhRW51bVR5cGVzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1bXSk6IGFueSB7XHJcbiAgICAgICAgbGV0IGVudW1QYXJhbWV0ZXJzID0ge307XHJcbiAgICAgICAgbGV0IG1ldGFQYXJhbWV0ZXJVc2luZ0VudW1zID0gTWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXIucmVhZEVudW1NZXRhRGVmaW5pdGlvbnMobWV0YVBhcmFtZXRlckluZm8pO1xyXG4gICAgICAgIG1ldGFQYXJhbWV0ZXJVc2luZ0VudW1zLmZvckVhY2goKGVudW1QYXJhbWV0ZXJNZXRhSXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZW51bVR5cGVSZWYgPSBlbnVtUGFyYW1ldGVyTWV0YUl0ZW0uVHlwZURlZi5FbnVtVHlwZVJlZjtcclxuICAgICAgICAgICAgbGV0IG1hdGNoaW5nT3BjVWFFbnVtVHlwZXMgPSBvcGNVYUVudW1UeXBlcy5maWx0ZXIoKG9wY1VhRW51bVR5cGUpID0+IHsgcmV0dXJuIG9wY1VhRW51bVR5cGUuYnJvd3NlTmFtZSA9PT0gZW51bVR5cGVSZWY7IH0pO1xyXG4gICAgICAgICAgICBpZiAobWF0Y2hpbmdPcGNVYUVudW1UeXBlcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIC8vIHNhdmUgdGhlIG1hdGNoaW5nIGVudW0gdHlwZSBpbmZvIGZvciB0aGUgcGFyYW1ldGVyIG5hbWVcclxuICAgICAgICAgICAgICAgIGVudW1QYXJhbWV0ZXJzW2VudW1QYXJhbWV0ZXJNZXRhSXRlbS5SZWZdID0gbWF0Y2hpbmdPcGNVYUVudW1UeXBlc1swXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8gLSBObyBlbnVtIHR5cGUgZm91bmQgZm9yICVvICVvXCIsIGVudW1UeXBlUmVmLCBlbnVtUGFyYW1ldGVyTWV0YUl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGVudW1QYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgdGhlIGVudW0gZGVmaW5pdGlvbnMgY29udGFpbmVkIGluIHRoZSBtZXRhIGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0geyp9IG1ldGFQYXJhbWV0ZXJJbmZvXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByZWFkRW51bU1ldGFEZWZpbml0aW9ucyhtZXRhUGFyYW1ldGVySW5mbzogYW55KSB7XHJcbiAgICAgICAgbGV0IHR5cGVEZWZpbml0aW9ucyA9ICBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGFEYXRhLmZpbHRlck1ldGFJdGVtcyhtZXRhUGFyYW1ldGVySW5mbywgW1wiUGFyYW1ldGVyXCIsIFwiV2F0Y2hhYmxlXCIsIFwiR3JvdXBcIl0sIChtZXRhSXRlbUdyb3VwT3JQYXJhbWV0ZXIpID0+IHsgcmV0dXJuIG1ldGFJdGVtR3JvdXBPclBhcmFtZXRlci5oYXNPd25Qcm9wZXJ0eShcIlR5cGVEZWZcIik7IH0pO1xyXG4gICAgICAgIGxldCBlbnVtVHlwZURlZmluaXRpb25zID0gdHlwZURlZmluaXRpb25zLmZpbHRlcigodHlwZURlZmluaXRpb24pPT4ge3JldHVybiB0eXBlRGVmaW5pdGlvbi5UeXBlRGVmLmhhc093blByb3BlcnR5KFwiRW51bVR5cGVSZWZcIil9KTtcclxuICAgICAgICByZXR1cm4gZW51bVR5cGVEZWZpbml0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlYWRzIHRoZSBhdmFpbGFibGUgZW51bSB0eXBlIGRlZmludGlvbnMgZnJvbSB0aGUgdGFyZ2V0IG1vZGVsXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gY29tcG9uZW50UGFyYW1ldGVyc1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1bXX0gb3BjVWFFbnVtVHlwZXNcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVhZEVudW1EZWZpbml0aW9uRnJvbVRhcmdldE1vZGVsKGNvbXBvbmVudFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10sIG9wY1VhRW51bVR5cGVzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1bXSk6IGFueSB7XHJcbiAgICAgICAgbGV0IGVudW1QYXJhbWV0ZXJzID0ge307XHJcbiAgICAgICAgY29tcG9uZW50UGFyYW1ldGVycy5mb3JFYWNoKChjb21wb25lbnRQYXJhbWV0ZXIpID0+IHtcclxuICAgICAgICAgICAgbGV0IG1hdGNoaW5nT3BjVWFFbnVtVHlwZXMgPSBvcGNVYUVudW1UeXBlcy5maWx0ZXIoKG9wY1VhRW51bVR5cGUpID0+IHsgcmV0dXJuIG9wY1VhRW51bVR5cGUuYnJvd3NlTmFtZSA9PT0gY29tcG9uZW50UGFyYW1ldGVyLmRhdGFUeXBlLm5hbWU7IH0pO1xyXG4gICAgICAgICAgICBpZiAobWF0Y2hpbmdPcGNVYUVudW1UeXBlcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIGVudW1QYXJhbWV0ZXJzW2NvbXBvbmVudFBhcmFtZXRlci5icm93c2VOYW1lXSA9IG1hdGNoaW5nT3BjVWFFbnVtVHlwZXNbMF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZW51bVBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFxyXG4gICAgICogcmVhZHMgZW51bSB0eXBlIGRlZmluaXRpb25zIGZvciBtZXRob2QgcGFyYW1ldGVyc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2R9IG1ldGhvZFxyXG4gICAgICogQHBhcmFtIHsqfSBtZXRhSW5mb1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlclxyXG4gICAgICovXHJcbiAgICByZWFkTWV0YUVudW1NZXRob2RQYXJhbWV0ZXJEZWZpbml0aW9ucyhtZXRob2Q6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLCBtZXRhSW5mbzogYW55KSB7XHJcbiAgICAgICAgbGV0IGVudW1QYXJhbWV0ZXJzID0ge307XHJcblxyXG4gICAgICAgIGxldCBvcGNVYUVudW1UeXBlcyA9IE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyLmdldEluc3RhbmNlKCkuZW51bVR5cGVEZWZpbml0aW9ucztcclxuXHJcbiAgICAgICAgaWYgKG1ldGFJbmZvID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgcmV0dXJuIGVudW1QYXJhbWV0ZXJzO1xyXG5cclxuICAgICAgICAvLyBnZXQgdGhlIG1ldGEgcGFyYW1ldGVyIGluZm9zXHJcbiAgICAgICAgaWYgKG1ldGFJbmZvLk1ldGFDb25maWdDb21tYW5kcyA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHJldHVybiBlbnVtUGFyYW1ldGVycztcclxuXHJcbiAgICAgICAgbGV0IG1ldGFNZXRob2RQYXJhbWV0ZXJJbmZvID0gbWV0YUluZm8uTWV0YUNvbmZpZ0NvbW1hbmRzLkNvbW1hbmRzU3RydWN0dXJlLkNoaWxkcztcclxuICAgICAgICBpZiAobWV0YU1ldGhvZFBhcmFtZXRlckluZm8pIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGdldCB0aGUgY29tbWFuZCBtZXRhIGluZm9cclxuICAgICAgICAgICAgbGV0IG1ldGFDb21tYW5kSW5mbyA9IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0YURhdGEuZmlsdGVyTWV0YUl0ZW1zKG1ldGFNZXRob2RQYXJhbWV0ZXJJbmZvLCBbXCJDb21tYW5kXCJdLCAoY29tbWFuZCkgPT4geyByZXR1cm4gY29tbWFuZC5SZWYgPT09IG1ldGhvZC5icm93c2VOYW1lOyB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGdldCB0aGUgY29tbWFuZHMgcGFyYW1ldGVyIGluZm9cclxuICAgICAgICAgICAgbGV0IG1ldGFQYXJhbWV0ZXJVc2luZ0VudW1zID0gTWFwcENvY2twaXRDb21wb25lbnRNZXRhRGF0YS5maWx0ZXJNZXRhSXRlbXMobWV0YUNvbW1hbmRJbmZvLCBbXCJQYXJhbWV0ZXJcIl0sIChtZXRhSXRlbUdyb3VwT3JQYXJhbWV0ZXIpID0+IHsgcmV0dXJuIG1ldGFJdGVtR3JvdXBPclBhcmFtZXRlci5oYXNPd25Qcm9wZXJ0eShcIlR5cGVEZWZcIik7IH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gZmluZCBhbmQgY29sbGVjdCBtYXRjaGluZyBvcGN1YSBlbnVtIHR5cGUgcmVmc1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1ldGFQYXJhbWV0ZXJVc2luZ0VudW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbnVtUGFyYW1ldGVyTWV0YUl0ZW0gPSBtZXRhUGFyYW1ldGVyVXNpbmdFbnVtc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZW51bVR5cGVSZWYgPSBlbnVtUGFyYW1ldGVyTWV0YUl0ZW0uVHlwZURlZi5FbnVtVHlwZVJlZjtcclxuICAgICAgICAgICAgICAgIGxldCBtYXRjaGluZ09wY1VhRW51bVR5cGVzID0gb3BjVWFFbnVtVHlwZXMuZmlsdGVyKChvcGNVYUVudW1UeXBlKSA9PiB7IHJldHVybiBvcGNVYUVudW1UeXBlLmJyb3dzZU5hbWUgPT09IGVudW1UeXBlUmVmOyB9KTtcclxuICAgICAgICAgICAgICAgIGlmIChtYXRjaGluZ09wY1VhRW51bVR5cGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBzYXZlIHRoZSBtYXRjaGluZyBlbnVtIHR5cGUgaW5mbyBmb3IgdGhlIHBhcmFtZXRlciBuYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgZW51bVBhcmFtZXRlcnNbZW51bVBhcmFtZXRlck1ldGFJdGVtLlJlZl0gPSBtYXRjaGluZ09wY1VhRW51bVR5cGVzWzBdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVySW5mbyAtIE5vIGVudW0gdHlwZSBmb3VuZCBmb3IgJW8gJW9cIiwgZW51bVR5cGVSZWYsIGVudW1QYXJhbWV0ZXJNZXRhSXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVudW1QYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIGJyb3dzZXMgdGhlIGVudW0gdmFsdWVzIGEgc2pzb24gKGZvciBvbGRlciB0YXJnZXRzKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vzc2lvbklkXHJcbiAgICAgKiBAcGFyYW0geyp9IG9wY1VhRW51bVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgYnJvd3NlRW51bVZhbHVlc0pzb24oc2Vzc2lvbklkOiBudW1iZXIsIG9wY1VhRW51bTogYW55KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IGVudW1WYWx1ZXNKc29uU3RyaW5nID0gYXdhaXQgT3BjVWFSZXN0U2VydmljZXMucmVhZE5vZGVBdHRyaWJ1dGUoc2Vzc2lvbklkLCBvcGNVYUVudW0ubm9kZUlkLCBPcGNVYUF0dHJpYnV0ZS5ERVNDUklQVElPTik7XHJcbiAgICAgICAgICAgIGxldCBlbnVtVmFsdWVzSnNvbjogYW55W10gPSBKU09OLnBhcnNlKGVudW1WYWx1ZXNKc29uU3RyaW5nKS5lbnVtVmFsdWVzLm1hcCgoZW51bVZhbHVlSXRlbSkgPT4geyByZXR1cm4geyBkaXNwbGF5TmFtZTogeyBsb2NhbGU6IFwiXCIsIHRleHQ6IGVudW1WYWx1ZUl0ZW0udGV4dCB9LCB2YWx1ZTogZW51bVZhbHVlSXRlbS52YWx1ZSB9IH0pO1xyXG4gICAgICAgICAgICBvcGNVYUVudW0uZW51bVZhbHVlc0pzb24gPSBlbnVtVmFsdWVzSnNvbjtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBicm93c2VzIHRoZSBvcGMgdWEgZW51bSBub2RlIGZvciBpdHMgdmFsdWUgZGVmaW5pdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZFxyXG4gICAgICogQHBhcmFtIHsqfSBvcGNVYUVudW1cclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBicm93c2VFbnVtVmFsdWVzKHNlc3Npb25JZDogbnVtYmVyLCBvcGNVYUVudW06IGFueSkge1xyXG4gICAgICAgIGxldCBlbnVtVmFsdWVzUmVmID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBlbnVtVmFsdWVzTm9kZXMgPSBhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5icm93c2VOb2RlcyhzZXNzaW9uSWQsIG9wY1VhRW51bS5ub2RlSWQpO1xyXG4gICAgICAgICAgICBpZiAoZW51bVZhbHVlc05vZGVzKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZW51bVZhbHVlcyA9IGVudW1WYWx1ZXNOb2Rlcy5maWx0ZXIoKGVudW1WYWx1ZXNOb2RlKSA9PiB7IHJldHVybiAoPGFueT5lbnVtVmFsdWVzTm9kZSkuYnJvd3NlTmFtZSA9PT0gXCJFbnVtVmFsdWVzXCIgfHwgKDxhbnk+ZW51bVZhbHVlc05vZGUpLmJyb3dzZU5hbWUgPT09IFwiRW51bVN0cmluZ3NcIjsgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZW51bVZhbHVlcyAmJiBlbnVtVmFsdWVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBlbnVtVmFsdWVzUmVmID0gYXdhaXQgT3BjVWFSZXN0U2VydmljZXMucmVhZE5vZGVBdHRyaWJ1dGUoc2Vzc2lvbklkLCBlbnVtVmFsdWVzWzBdLm5vZGVJZCwgT3BjVWFBdHRyaWJ1dGUuVkFMVUUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9wY1VhRW51bS5lbnVtVmFsdWVzID0gZW51bVZhbHVlc1JlZjtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCB7IE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyIH0iXX0=