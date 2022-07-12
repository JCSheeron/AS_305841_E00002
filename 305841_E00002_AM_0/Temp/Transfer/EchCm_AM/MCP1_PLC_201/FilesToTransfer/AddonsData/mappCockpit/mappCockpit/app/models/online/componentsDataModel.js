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
define(["require", "exports", "../diagnostics/mappCockpitDiagnosticProvider", "./mappCockpitComponent", "../../framework/events", "../dataModelInterface", "../dataModelBase", "../../framework/property", "../../framework/command", "../diagnostics/mappCockpitCommonInfoProvider", "./mappCockpitComponentReflection", "../../common/mappCockpitConfig"], function (require, exports, mappCockpitDiagnosticProvider_1, mappCockpitComponent_1, events_1, dataModelInterface_1, dataModelBase_1, property_1, command_1, mappCockpitCommonInfoProvider_1, mappCockpitComponentReflection_1, mappCockpitConfig_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventTraceDataLoaded = /** @class */ (function (_super) {
        __extends(EventTraceDataLoaded, _super);
        function EventTraceDataLoaded() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventTraceDataLoaded;
    }(events_1.TypedEvent));
    ;
    var EventComponentsUpdated = /** @class */ (function (_super) {
        __extends(EventComponentsUpdated, _super);
        function EventComponentsUpdated() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventComponentsUpdated;
    }(events_1.TypedEvent));
    ;
    var EventComponentParametersUpdated = /** @class */ (function (_super) {
        __extends(EventComponentParametersUpdated, _super);
        function EventComponentParametersUpdated() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventComponentParametersUpdated;
    }(events_1.TypedEvent));
    ;
    var EventComponentMethodsUpdated = /** @class */ (function (_super) {
        __extends(EventComponentMethodsUpdated, _super);
        function EventComponentMethodsUpdated() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventComponentMethodsUpdated;
    }(events_1.TypedEvent));
    ;
    var EventParameterValuesUpdated = /** @class */ (function (_super) {
        __extends(EventParameterValuesUpdated, _super);
        function EventParameterValuesUpdated() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventParameterValuesUpdated;
    }(events_1.TypedEvent));
    ;
    var EventModelConnection = /** @class */ (function (_super) {
        __extends(EventModelConnection, _super);
        function EventModelConnection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventModelConnection;
    }(events_1.TypedEvent));
    ;
    /**
     * The class implements the main data model for mapp Cockpit.
     *
     * @class MappCockpitComponentDataModel
     */
    var MappCockpitComponentDataModel = /** @class */ (function () {
        /**
         * Creates an instance of MappCockpitComponentDataModel.
         * @memberof MappCockpitComponentDataModel
         */
        function MappCockpitComponentDataModel() {
            var _this = this;
            // Create a data source for the components.
            this._componentsSource = property_1.Property.create([]);
            this._userComponentsSource = property_1.Property.create([], function (dataLink) { _this.requestReadUserComponents(dataLink); });
            // Holds user roles
            this._userRoles = property_1.Property.create([]);
            // specifies interval for connection observation
            this._connectionObservationInterval = 1000;
            // specefies the connection observation id
            this._connectionObservationTimerId = -1;
            // holds the current model connection state
            this._modelConnected = false;
            this._observablesChangedHandler = function (sender, eventArgs) { _this.handleObservableItemsChanged(eventArgs); };
            // Initialize members
            this._mappCockpitDiagnosticProvider = new mappCockpitDiagnosticProvider_1.MappCockpitDiagnosticProvider(this);
            this._components = [];
            // Create event sources
            this.eventTraceDataLoaded = new EventTraceDataLoaded();
            this.eventComponentsUpdated = new EventComponentsUpdated();
            this.eventComponentParametersUpdated = new EventComponentParametersUpdated();
            this.eventParameterValuesUpdated = new EventParameterValuesUpdated();
            this.eventComponentMethodsUpdated = new EventComponentMethodsUpdated();
            this.eventModelConnectionChanged = new EventModelConnection();
            // forward the event
            this._mappCockpitDiagnosticProvider.eventObservablesChanged.attach(this._observablesChangedHandler);
            // Create and initialize commands
            this.createCommands();
        }
        /**
         * Dispose the MappCockpitComponentDataModel
         *
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.dispose = function () {
            // detach events
            this._mappCockpitDiagnosticProvider.eventObservablesChanged.detach(this._observablesChangedHandler);
            this._mappCockpitDiagnosticProvider.dispose();
        };
        /**
         * Creates exposed commands
         *
         * @private
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.createCommands = function () {
            this._commandChangeUser = command_1.Command.create(this, this.executeCommandChangeUser());
        };
        /**
         * initializes the data model
         *
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.initialize = function () {
        };
        Object.defineProperty(MappCockpitComponentDataModel.prototype, "traceProvider", {
            /**
             * Gets the trace provider
             *
             * @readonly
             * @type {MappCockpitTraceProvider}
             * @memberof MappCockpitComponentDataModel
             */
            get: function () {
                return this._mappCockpitDiagnosticProvider.traceProvider;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * connects the data model to the data source
         *
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.connect = function () {
            return __awaiter(this, void 0, void 0, function () {
                var error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, this._mappCockpitDiagnosticProvider.beginSession()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.browseComponents()];
                        case 2:
                            _a.sent();
                            // after connectin successfully
                            this.startObserveModelConnection();
                            return [2 /*return*/, true];
                        case 3:
                            error_1 = _a.sent();
                            return [2 /*return*/, false];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        Object.defineProperty(MappCockpitComponentDataModel.prototype, "commandChangeUser", {
            get: function () {
                return this._commandChangeUser;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentDataModel.prototype, "components", {
            /**
             * Returns the available mapp components
             *
             * @readonly
             * @type {Array<MappCockpitComponent>}
             * @memberof MappCockpitComponentDataModel
             */
            get: function () {
                return this._components;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentDataModel.prototype, "componentsSource", {
            get: function () {
                return this._componentsSource;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentDataModel.prototype, "userComponentsSource", {
            get: function () {
                return this._userComponentsSource;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentDataModel.prototype, "userRoles", {
            /**
             * Gets the current user roles
             *
             * @readonly
             * @type {string[]}
             * @memberof MappCockpitComponentDataModel
             */
            get: function () {
                return this._userRoles;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentDataModel.prototype, "writeAccess", {
            /**
             *
             *
             * @returns {boolean}
             * @memberof MappCockpitComponentDataModel
             */
            get: function () {
                var modelHasWriteAccess = false;
                if (this.userRoles.value.length > 0) {
                    // update the write access right according the current role
                    modelHasWriteAccess = this.userRoles.value.some(function (userRole) { return userRole === mappCockpitConfig_1.MappCockpitConfiguration.writeAccessRole; });
                }
                return modelHasWriteAccess;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Clears the data model
         *
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.clear = function () {
            this._components = [];
        };
        /**
         * Browses all available resources and updates the model
         *
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.browseComponents = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            // Update components in model
                            _a = this;
                            return [4 /*yield*/, this._mappCockpitDiagnosticProvider.componentProvider.browseComponents()];
                        case 1:
                            // Update components in model
                            _a._components = _b.sent();
                            return [4 /*yield*/, this.updateComponentMetaData()];
                        case 2:
                            _b.sent();
                            // Connect to model
                            this.connectComponentsToModel();
                            this.componentsSource.value = this._components;
                            return [2 /*return*/, this._components];
                    }
                });
            });
        };
        /**
         * Connects the components to the maon data model
         *
         * @private
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.connectComponentsToModel = function () {
            var _this = this;
            this._components.forEach(function (component) { component.model = _this; });
        };
        /**
         * Updates the components meta data
         *
         * @private
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.updateComponentMetaData = function () {
            return __awaiter(this, void 0, void 0, function () {
                var i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < this._components.length)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.browseMetaInfo(this._components[i])];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Reads the available user components
         *
         * @private
         * @param {Property<MappCockpitComponent[]>} dataLink
         * @returns {Promise<MappCockpitComponent[]>}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.requestReadUserComponents = function (dataLink) {
            return __awaiter(this, void 0, void 0, function () {
                var components;
                return __generator(this, function (_a) {
                    components = [];
                    try {
                        // filter components to be exposed to the user
                        components = this._components.filter(function (component) { return component.metaData; });
                        components.forEach(function (component) { mappCockpitComponent_1.MappCockpitComponent.registerUserComponent(component); });
                        dataLink.readRequestExecuted(components);
                    }
                    catch (error) {
                        console.error(error);
                        dataLink.readRequestRejected(error);
                    }
                    return [2 /*return*/, components];
                });
            });
        };
        /**
         * browses the meta data, parameters ans methods of a single component
         *
         * @private
         * @param {MappCockpitComponent} mappCockpitComponent
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.browseComponent = function (mappCockpitComponent) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.browseParameters(mappCockpitComponent)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.browseMethods(mappCockpitComponent)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.browseServiceChannel(mappCockpitComponent)];
                        case 3:
                            _a.sent();
                            console.log("MappCockpitComponentDataModel.browseComponent: %o", mappCockpitComponent);
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Called after components update
         *
         * @param {MappCockpitComponent[]} mappCockpitComponents
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.onComponentsUpdated = function (mappCockpitComponents) {
            this.eventComponentsUpdated.raise(this, mappCockpitComponents);
        };
        /**
           * browses the meta info for a component
         *
         * @param {MappCockpitComponent} mappCockpitComponent
         * @returns {Promise<any>}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.browseMetaInfo = function (mappCockpitComponent) {
            return __awaiter(this, void 0, void 0, function () {
                var metaInfoReferences, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this._mappCockpitDiagnosticProvider.browseMetaInfo(mappCockpitComponent)];
                        case 1:
                            metaInfoReferences = _a.sent();
                            if (metaInfoReferences) {
                                mappCockpitComponent.metaData = this.readMetaData(metaInfoReferences);
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            e_1 = _a.sent();
                            console.error(e_1.message);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/, mappCockpitComponent.metaData];
                    }
                });
            });
        };
        /**
         * Browses available component parameters
         *
         * @returns {Promise<void>}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.browseParameters = function (mappCockpitComponent) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            // Update components in model
                            _a = mappCockpitComponent;
                            return [4 /*yield*/, this._mappCockpitDiagnosticProvider.browseParameters(mappCockpitComponent)];
                        case 1:
                            // Update components in model
                            _a.parameters = _b.sent();
                            // retrieve and update user parameters
                            return [4 /*yield*/, this.retrieveUserParameters(mappCockpitComponent)];
                        case 2:
                            // retrieve and update user parameters
                            _b.sent();
                            return [2 /*return*/, mappCockpitComponent.parameters];
                    }
                });
            });
        };
        /**
         * Browses and updates the methods input parameters
         *
         * @param {MappCockpitComponentMethod} mappCockpitComponentMethod
         * @returns {Promise<MappCockpitMethodParameter[]>}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.browseMethodInputParameters = function (mappCockpitComponentMethod) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // browse and update the methods parameters
                        return [4 /*yield*/, this._mappCockpitDiagnosticProvider.browseMethodParameters([mappCockpitComponentMethod])];
                        case 1:
                            // browse and update the methods parameters
                            _a.sent();
                            // update the parameter data types
                            return [4 /*yield*/, this._mappCockpitDiagnosticProvider.updateMethodParameterDataTypes([mappCockpitComponentMethod])];
                        case 2:
                            // update the parameter data types
                            _a.sent();
                            return [2 /*return*/, mappCockpitComponentMethod.inputParameters];
                    }
                });
            });
        };
        /**
         * Retrieves the component parameters relevant for the user. They are specified by meta data
         *
         * @private
         * @param {MappCockpitComponent} mappCockpitComponent
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.retrieveUserParameters = function (mappCockpitComponent) {
            return __awaiter(this, void 0, void 0, function () {
                var watchableMetaConfig, watchableStateMetaConfig;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            watchableMetaConfig = ['MetaConfigWatchables', 'WatchablesStructure', 'Watchable'];
                            watchableStateMetaConfig = ['MetaConfigWatchablesStates', 'WatchablesStatesStructure', 'WatchableState'];
                            mappCockpitComponent.messageParameters = mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.retrieveMessageParameters(mappCockpitComponent.parameters);
                            if (!mappCockpitComponent.metaData) return [3 /*break*/, 5];
                            if (!(mappCockpitComponent.metaData.hasOwnProperty("Parameters") && mappCockpitComponent.metaData["Parameters"].hasOwnProperty("Watchable"))) return [3 /*break*/, 2];
                            mappCockpitComponent.watchableParameters = mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.retrieveWatchableParameters(mappCockpitComponent.parameters, watchableMetaConfig);
                            if (!(mappCockpitComponent.watchableParameters.length > 0)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this._mappCockpitDiagnosticProvider.updateParameterDataTypes(mappCockpitComponent.watchableParameters)];
                        case 1:
                            _a.sent();
                            mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.updateParameter(mappCockpitComponent.watchableParameters, mappCockpitComponent.metaData["Parameters"]["Watchable"]);
                            _a.label = 2;
                        case 2:
                            if (!(mappCockpitComponent.metaData.hasOwnProperty("Parameters") && mappCockpitComponent.metaData["Parameters"].hasOwnProperty("Configuration"))) return [3 /*break*/, 4];
                            mappCockpitComponent.configurationParameters = mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.retrieveConfigurationParameters(mappCockpitComponent.parameters);
                            if (!(mappCockpitComponent.configurationParameters.length > 0)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this._mappCockpitDiagnosticProvider.updateParameterDataTypes(mappCockpitComponent.configurationParameters)];
                        case 3:
                            _a.sent();
                            mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.updateParameter(mappCockpitComponent.configurationParameters, mappCockpitComponent.metaData["Parameters"]["Configuration"]);
                            _a.label = 4;
                        case 4:
                            if (mappCockpitComponent.metaData.hasOwnProperty("Parameters") && mappCockpitComponent.metaData["Parameters"].hasOwnProperty("WatchableState") && mappCockpitComponent.watchableParameters.length > 0) {
                                mappCockpitComponent.watchableStateParameters = mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.retrieveWatchableStates(mappCockpitComponent.watchableParameters, watchableStateMetaConfig);
                            }
                            _a.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * writes the value to component parameter
         *
         * @param {MappCockpitComponentParameter} parameter
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.writeComponentParameter = function (parameter) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._mappCockpitDiagnosticProvider.writeParameterValue(parameter, parameter.value)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * browses the component methods
         *
         * @param {MappCockpitComponent} mappCockpitComponent
         * @returns {Promise<MappCockpitComponentMethod[]>}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.browseMethods = function (mappCockpitComponent) {
            return __awaiter(this, void 0, void 0, function () {
                var methodsMetaConfig, quickCommandsMetaConfig, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            methodsMetaConfig = ['MetaConfigCommands', 'CommandsStructure', 'Command'];
                            quickCommandsMetaConfig = ['MetaConfigQuickCommands', 'QuickCommandsStructure', 'QuickCommand'];
                            // Update component methods in model
                            _a = mappCockpitComponent;
                            return [4 /*yield*/, this._mappCockpitDiagnosticProvider.browseMethods(mappCockpitComponent)];
                        case 1:
                            // Update component methods in model
                            _a.methods = _b.sent();
                            // filter the methods to the ones specefied by meta info
                            mappCockpitComponent.userMethods = mappCockpitComponentReflection_1.MappCockpitComponentMethodInfo.retrieveExecutableMethods(mappCockpitComponent.methods, methodsMetaConfig);
                            mappCockpitComponent.quickCommands = mappCockpitComponentReflection_1.MappCockpitComponentMethodInfo.retrieveQuickCommands(mappCockpitComponent.methods, quickCommandsMetaConfig);
                            return [2 /*return*/, mappCockpitComponent.methods];
                    }
                });
            });
        };
        /**
         * Browses for the service channel and connects it if available
         *
         * @param {MappCockpitComponent} mappCockpitComponent
         * @returns {Promise<any>}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.browseServiceChannel = function (mappCockpitComponent) {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            // browse the service channel
                            _b = mappCockpitComponent;
                            return [4 /*yield*/, this._mappCockpitDiagnosticProvider.browseServiceChannel(mappCockpitComponent)];
                        case 1:
                            // browse the service channel
                            _b.serviceChannel = _c.sent();
                            if (!mappCockpitComponent.serviceChannel) return [3 /*break*/, 3];
                            // update the request methods input parameters
                            return [4 /*yield*/, this.browseMethodInputParameters((_a = mappCockpitComponent.serviceChannel) === null || _a === void 0 ? void 0 : _a.request)];
                        case 2:
                            // update the request methods input parameters
                            _c.sent();
                            if (mappCockpitComponent.serviceChannel) {
                                mappCockpitComponent.serviceChannel.initialize();
                            }
                            _c.label = 3;
                        case 3: return [2 /*return*/, mappCockpitComponent.serviceChannel];
                    }
                });
            });
        };
        /**
         * Retrieves the methods relevant for the user. They are specified by meta data
         *
         * @private
         * @param {MappCockpitComponent} mappCockpitComponent
         * @param {*} componentMethods
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.retrieveUserMethods = function (mappCockpitComponent, componentMethods) {
            var userMethods = [];
            if (mappCockpitComponent.metaData && mappCockpitComponent.metaData.hasOwnProperty("Methods") && mappCockpitComponent.metaData["Methods"].hasOwnProperty("Executable")) {
                var methodsMeta_1 = mappCockpitComponent.metaData["Methods"]["Executable"];
                userMethods = componentMethods.filter(function (method) { return methodsMeta_1[method.browseName]; });
            }
            return userMethods;
        };
        /**
         * reads the meta infos into a single object
         *
         * @private
         * @param {Array<string>} metaParameters
         * @returns
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.readMetaData = function (metaParameters) {
            var metaData = {};
            try {
                metaParameters.forEach(function (metaParameter) {
                    if (metaParameter.value == "") { // Fallback: Use empty object in case of empty metaInfo
                        metaParameter.value = "{}";
                    }
                    //Just for prototype: Enable/Disable of methods
                    // if (metaParameter.nodeId == "ns=5;s=gAxis1.MetaConfigCommands") {
                    //     metaParameter.value = '{"CommandsStructure":{"Scope":"mapp/Motion/Axis/AcpAxis","Childs":[{"Group":{"DisplayName":"Preparation","Childs":[{"Command":{"DisplayName":"Power on","Ref":"Power On","WatchableVariablesMapping":[["Is Powered","Is_Powered"]],"EnableStateExpression":"Is_Powered == false ? true : false"}},{"Command":{"DisplayName":"Power off","Ref":"Power Off","WatchableVariablesMapping":[["Is Powered","Is_Powered"]],"EnableStateExpression":"Is_Powered == true ? true : false"}},{"Command":{"DisplayName":"Init home","Ref":"Init Home","Parameters":[{"Parameter":{"DisplayName":"Homing mode","Ref":"Homing Mode","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::InitHomeReduced"}}},{"Parameter":{"DisplayName":"Position","Ref":"Position","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Start velocity","Ref":"Start Velocity","DefaultValue":"0.0","EU":"mm/s"}},{"Parameter":{"DisplayName":"Homing velocity","Ref":"Homing Velocity","DefaultValue":"0.0","EU":"mm/s"}},{"Parameter":{"DisplayName":"Acceleration","Ref":"Acceleration","DefaultValue":"0.0","EU":"mm/s²"}},{"Parameter":{"DisplayName":"Switch edge","Ref":"SwitchEdge","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::InitHomeDirection"}}},{"Parameter":{"DisplayName":"Start direction","Ref":"Start Direction","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::InitHomeDirection"}}},{"Parameter":{"DisplayName":"Homing direction","Ref":"Homing Direction","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::InitHomeDirection"}}},{"Parameter":{"DisplayName":"Reference pulse","Ref":"Reference Pulse","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::Switch"}}},{"Parameter":{"DisplayName":"Keep direction","Ref":"Keep Direction","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::Switch"}}},{"Parameter":{"DisplayName":"Reference pulse blocking distance","Ref":"Reference Pulse Blocking Distance","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Torque limit","Ref":"Torque Limit","DefaultValue":"0.0","EU":"N·m"}},{"Parameter":{"DisplayName":"Block detection position error","Ref":"Block Detection Position Error","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Position error stop limit","Ref":"Position Error Stop Limit","DefaultValue":"0.0","EU":"mm"}}]}},{"Command":{"DisplayName":"Home","Ref":"Home","Parameters":[{"Parameter":{"DisplayName":"Position","Ref":"Position","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Homing mode","Ref":"Homing Mode","DefaultValue":"140","TypeDef":{"EnumTypeRef":"AcpAx::HomingReduced"}}}]}}]}},{"Group":{"DisplayName":"Administration","Childs":[{"Command":{"DisplayName":"Reset","Ref":"Reset"}},{"Command":{"DisplayName":"Set override","Ref":"Set Override","Parameters":[{"Parameter":{"DisplayName":"Velocity factor","Ref":"Velocity Factor","DefaultValue":"1.0"}},{"Parameter":{"DisplayName":"Acceleration factor","Ref":"Acceleration Factor","DefaultValue":"1.0"}}]}},{"Command":{"DisplayName":"Command error","Ref":"CommandError","Parameters":[{"Parameter":{"DisplayName":"Command","Ref":"Command","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::CommandErrors"}}}]}},{"Command":{"DisplayName":"Read ParID","Ref":"Read ParId","Parameters":[{"Parameter":{"DisplayName":"ParID","Ref":"ParId","DefaultValue":"0"}}]}},{"Command":{"DisplayName":"Write ParID","Ref":"Write ParId","Parameters":[{"Parameter":{"DisplayName":"ParID","Ref":"ParId","DefaultValue":"0"}},{"Parameter":{"DisplayName":"Value","Ref":"Value","DefaultValue":"0"}}]}}]}},{"Group":{"DisplayName":"Movement","Childs":[{"Command":{"DisplayName":"Move absolute","Ref":"Move Absolute","Parameters":[{"Parameter":{"DisplayName":"Position","Ref":"Position","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Velocity","Ref":"Velocity","DefaultValue":"2","EU":"mm/s"}},{"Parameter":{"DisplayName":"Acceleration","Ref":"Acceleration","DefaultValue":"10","EU":"mm/s²"}},{"Parameter":{"DisplayName":"Deceleration","Ref":"Deceleration","DefaultValue":"10","EU":"mm/s²"}},{"Parameter":{"DisplayName":"Direction","Ref":"Direction","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::MoveAbsDirection"}}}]}},{"Command":{"DisplayName":"Move additive","Ref":"Move Additive","Parameters":[{"Parameter":{"DisplayName":"Distance","Ref":"Distance","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Velocity","Ref":"Velocity","DefaultValue":"2","EU":"mm/s"}},{"Parameter":{"DisplayName":"Acceleration","Ref":"Acceleration","DefaultValue":"10","EU":"mm/s²"}},{"Parameter":{"DisplayName":"Deceleration","Ref":"Deceleration","DefaultValue":"10","EU":"mm/s²"}}]}},{"Command":{"DisplayName":"Move velocity","Ref":"Move Velocity","Parameters":[{"Parameter":{"DisplayName":"Velocity","Ref":"Velocity","DefaultValue":"2","EU":"mm/s"}},{"Parameter":{"DisplayName":"Acceleration","Ref":"Acceleration","DefaultValue":"10","EU":"mm/s²"}},{"Parameter":{"DisplayName":"Deceleration","Ref":"Deceleration","DefaultValue":"10","EU":"mm/s²"}},{"Parameter":{"DisplayName":"Direction","Ref":"Direction","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::MoveVeloDirection"}}}]}},{"Command":{"DisplayName":"Gear in","Ref":"Gear In","Parameters":[{"Parameter":{"DisplayName":"Master","Ref":"Master","DefaultValue":""}},{"Parameter":{"DisplayName":"Ratio numerator","Ref":"Ratio Numerator","DefaultValue":"0.0"}},{"Parameter":{"DisplayName":"Ratio denominator","Ref":"Ratio Denominator","DefaultValue":"0.0"}},{"Parameter":{"DisplayName":"Master value source","Ref":"Master Value Source","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::ValueSource"}}},{"Parameter":{"DisplayName":"Acceleration","Ref":"Acceleration","DefaultValue":"0.0","EU":"mm/s²"}},{"Parameter":{"DisplayName":"Deceleration","Ref":"Deceleration","DefaultValue":"0.0","EU":"mm/s²"}},{"Parameter":{"DisplayName":"Master max velocity","Ref":"Master Max Velocity","DefaultValue":"0.0","EU":"mm/s"}}]}},{"Command":{"DisplayName":"Cam in","Ref":"CamIn","Parameters":[{"Parameter":{"DisplayName":"Master","Ref":"Master","DefaultValue":""}},{"Parameter":{"DisplayName":"Master offset","Ref":"MasterOffset","DefaultValue":"0.0","EU":"mm/s"}},{"Parameter":{"DisplayName":"Slave offset","Ref":"SlaveOffset","DefaultValue":"0.0","EU":"mm/s"}},{"Parameter":{"DisplayName":"Master scaling","Ref":"MasterScaling","DefaultValue":"0"}},{"Parameter":{"DisplayName":"Slave scaling","Ref":"SlaveScaling","DefaultValue":"0"}},{"Parameter":{"DisplayName":"Start mode","Ref":"StartMode","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::CamStartMode"}}},{"Parameter":{"DisplayName":"Master value source","Ref":"MasterValueSource","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::ValueSourceCamIn"}}},{"Parameter":{"DisplayName":"Cam ID","Ref":"CamID","DefaultValue":"65535"}},{"Parameter":{"DisplayName":"Periodic","Ref":"Periodic","DefaultValue":"0"}},{"Parameter":{"DisplayName":"Velocity","Ref":"Velocity","DefaultValue":"0.0","EU":"mm/s"}},{"Parameter":{"DisplayName":"Acceleration","Ref":"Acceleration","DefaultValue":"0.0","EU":"mm/s²"}},{"Parameter":{"DisplayName":"Deceleration","Ref":"Deceleration","DefaultValue":"0.0","EU":"mm/s²"}}]}},{"Command":{"DisplayName":"Torque control","Ref":"Torque Control","Parameters":[{"Parameter":{"DisplayName":"Torque","Ref":"Torque","DefaultValue":"0.0","EU":"N·m"}},{"Parameter":{"DisplayName":"Torque ramp","Ref":"Torque Ramp","DefaultValue":"0.0","EU":"N·m/s"}},{"Parameter":{"DisplayName":"Velocity","Ref":"Velocity","DefaultValue":"0.0","EU":"mm/s"}},{"Parameter":{"DisplayName":"Acceleration","Ref":"Acceleration","DefaultValue":"0.0","EU":"mm/s²"}}]}},{"Command":{"DisplayName":"Brake operation","Ref":"Brake Operation","Parameters":[{"Parameter":{"DisplayName":"Command","Ref":"Command","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::BrakeCommand"}}}]}},{"Command":{"DisplayName":"Halt","Ref":"Halt","Parameters":[{"Parameter":{"DisplayName":"Deceleration","Ref":"Deceleration","DefaultValue":"10","EU":"mm/s²"}}]}}]}},{"Group":{"DisplayName":"Load simulation","Childs":[{"Command":{"DisplayName":"Load simulation command","Ref":"Load Simulation Command","Parameters":[{"Parameter":{"DisplayName":"Command","Ref":"Command","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::SimulationCommand"}}}]}},{"Command":{"DisplayName":"Load simulation set params auto","Ref":"Load Simulation Set Params Auto","Parameters":[{"Parameter":{"DisplayName":"Additive load ParID","Ref":"Additive Load ParId","DefaultValue":"0"}}]}},{"Command":{"DisplayName":"Load simulation set params one mass","Ref":"Load Simulation Set Params One Mass","Parameters":[{"Parameter":{"DisplayName":"Additive load ParID","Ref":"Additive Load ParId","DefaultValue":"0"}},{"Parameter":{"DisplayName":"Inertia","Ref":"Inertia","DefaultValue":"0.0","EU":"kg·m²"}},{"Parameter":{"DisplayName":"Static friction","Ref":"Static Friction","DefaultValue":"0.0","EU":"N·m"}},{"Parameter":{"DisplayName":"Viscous friction","Ref":"Viscous Friction","DefaultValue":"0.0","EU":"N·m·s"}}]}},{"Command":{"DisplayName":"Load simulation set params two masses","Ref":"Load Simulation Set Params Two Masses","Parameters":[{"Parameter":{"DisplayName":"Additive load ParID","Ref":"Additive Load ParId","DefaultValue":"0"}},{"Parameter":{"DisplayName":"Inertia M1","Ref":"Inertia M1","DefaultValue":"0.0","EU":"kg·m²"}},{"Parameter":{"DisplayName":"Static friction M1","Ref":"Static Friction M1","DefaultValue":"0.0","EU":"N·m"}},{"Parameter":{"DisplayName":"Viscous friction M1","Ref":"Viscous Friction M1","DefaultValue":"0.0","EU":"N·m·s"}},{"Parameter":{"DisplayName":"Inertia M2","Ref":"Inertia M2","DefaultValue":"0.0","EU":"kg·m²"}},{"Parameter":{"DisplayName":"Static friction M2","Ref":"Static Friction M2","DefaultValue":"0.0","EU":"N·m"}},{"Parameter":{"DisplayName":"Viscous friction M2","Ref":"Viscous Friction M2","DefaultValue":"0.0","EU":"N·m·s"}},{"Parameter":{"DisplayName":"Stiffness","Ref":"Stiffness","DefaultValue":"0.0","EU":"N·m/rad"}},{"Parameter":{"DisplayName":"Damping","Ref":"Damping","DefaultValue":"0.0","EU":"N·m·s/rad"}}]}}]}},{"Group":{"DisplayName":"AutoTune","Childs":[{"Command":{"DisplayName":"Autotune position controller","Ref":"Auto Tune Position Controller","Parameters":[{"Parameter":{"DisplayName":"Orientation","Ref":"Orientation","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningOrientation"}}},{"Parameter":{"DisplayName":"Max current percent","Ref":"Max Current Percent","DefaultValue":"50","EU":"%"}},{"Parameter":{"DisplayName":"Max distance","Ref":"Max Distance","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Max position error","Ref":"Max Position Error","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Operating point","Ref":"Operating Point","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningOperationPoint"}}},{"Parameter":{"DisplayName":"Velocity","Ref":"Velocity","DefaultValue":"0.0","EU":"mm/s"}},{"Parameter":{"DisplayName":"Acceleration","Ref":"Acceleration","DefaultValue":"0.0","EU":"mm/s²"}},{"Parameter":{"DisplayName":"Max proportional gain","Ref":"Max Proportional Gain","DefaultValue":"2000.0","EU":"As"}},{"Parameter":{"DisplayName":"Proportional gain percent","Ref":"Proportional Gain Percent","DefaultValue":"100.0","EU":"%"}},{"Parameter":{"DisplayName":"Signal type","Ref":"Signal Type","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningExcitationSignal"}}},{"Parameter":{"DisplayName":"Signal order","Ref":"Signal Order","DefaultValue":"9"}},{"Parameter":{"DisplayName":"Delay time","Ref":"Delay Time","DefaultValue":"0.0","EU":"s"}},{"Parameter":{"DisplayName":"Signal start frequency","Ref":"Signal Start Frequency","DefaultValue":"0.0","EU":"Hz"}},{"Parameter":{"DisplayName":"Signal stop frequency","Ref":"Signal Stop Frequency","DefaultValue":"0.0","EU":"Hz"}},{"Parameter":{"DisplayName":"Signal time","Ref":"Signal Time","DefaultValue":"0.0","EU":"s"}}]}},{"Command":{"DisplayName":"Autotune speed controller","Ref":"Auto Tune Speed Controller","Parameters":[{"Parameter":{"DisplayName":"Orientation","Ref":"Orientation","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningOrientation"}}},{"Parameter":{"DisplayName":"Max current percent","Ref":"Max Current Percent","DefaultValue":"50","EU":"%"}},{"Parameter":{"DisplayName":"Max distance","Ref":"Max Distance","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Max position error","Ref":"Max Position Error","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Loop filter1 mode","Ref":"Loop Filter1 Mode","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningLoopFilterMode"}}},{"Parameter":{"DisplayName":"Filter time mode","Ref":"Filter Time Mode","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningFilterTimeMode"}}},{"Parameter":{"DisplayName":"Integration time mode","Ref":"Integration Time Mode","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningIntegrationTimeMode"}}},{"Parameter":{"DisplayName":"Operating point","Ref":"Operating Point","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningOperationPoint"}}},{"Parameter":{"DisplayName":"Velocity","Ref":"Velocity","DefaultValue":"0.0","EU":"mm/s"}},{"Parameter":{"DisplayName":"Acceleration","Ref":"Acceleration","DefaultValue":"0.0","EU":"mm/s²"}},{"Parameter":{"DisplayName":"Max proportional gain","Ref":"Max Proportional Gain","DefaultValue":"2000.0","EU":"As"}},{"Parameter":{"DisplayName":"Proportional gain percent","Ref":"Proportional Gain Percent","DefaultValue":"100.0","EU":"%"}},{"Parameter":{"DisplayName":"Resonance factor","Ref":"Resonance Factor","DefaultValue":"2.0"}},{"Parameter":{"DisplayName":"Inertia estimation lower frequency","Ref":"Inertia Estimation Lower Frequency","DefaultValue":"10.0","EU":"Hz"}},{"Parameter":{"DisplayName":"Inertia estimation upper frequency","Ref":"Inertia Estimation Upper Frequency","DefaultValue":"40.0","EU":"Hz"}},{"Parameter":{"DisplayName":"Signal type","Ref":"Signal Type","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningExcitationSignal"}}},{"Parameter":{"DisplayName":"Signal order","Ref":"Signal Order","DefaultValue":"9"}},{"Parameter":{"DisplayName":"Delay time","Ref":"Delay Time","DefaultValue":"0.0","EU":"s"}},{"Parameter":{"DisplayName":"Signal start frequency","Ref":"Signal Start Frequency","DefaultValue":"0.0","EU":"Hz"}},{"Parameter":{"DisplayName":"Signal stop frequency","Ref":"Signal Stop Frequency","DefaultValue":"0.0","EU":"Hz"}},{"Parameter":{"DisplayName":"Signal time","Ref":"Signal Time","DefaultValue":"0.0","EU":"s"}}]}},{"Command":{"DisplayName":"Autotune feed forward","Ref":"Auto Tune Feed Forward","Parameters":[{"Parameter":{"DisplayName":"Direction","Ref":"Direction","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::Direction"}}},{"Parameter":{"DisplayName":"Orientation","Ref":"Orientation","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningOrientation"}}},{"Parameter":{"DisplayName":"Max distance","Ref":"Max Distance","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Max position error","Ref":"Max Position Error","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Velocity","Ref":"Velocity","DefaultValue":"0.0","EU":"mm/s"}},{"Parameter":{"DisplayName":"Acceleration","Ref":"Acceleration","DefaultValue":"0.0","EU":"mm/s²"}},{"Parameter":{"DisplayName":"Max current percentage","Ref":"Max Current Percentage","DefaultValue":"50","EU":"%"}},{"Parameter":{"DisplayName":"Max velocity percentage","Ref":"Max Velocity Percentage","DefaultValue":"50","EU":"%"}},{"Parameter":{"DisplayName":"Signal type","Ref":"Signal Type","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningExcitationSignal"}}},{"Parameter":{"DisplayName":"Signal order","Ref":"Signal Order","DefaultValue":"9"}},{"Parameter":{"DisplayName":"Delay time","Ref":"Delay Time","DefaultValue":"0.0","EU":"s"}},{"Parameter":{"DisplayName":"Signal start frequency","Ref":"Signal Start Frequency","DefaultValue":"0.0","EU":"Hz"}},{"Parameter":{"DisplayName":"Signal stop frequency","Ref":"Signal Stop Frequency","DefaultValue":"0.0","EU":"Hz"}},{"Parameter":{"DisplayName":"Signal time","Ref":"Signal Time","DefaultValue":"0.0","EU":"s"}}]}},{"Command":{"DisplayName":"Autotune loop filters","Ref":"Auto Tune Loop Filters","Parameters":[{"Parameter":{"DisplayName":"Loop filter 1 mode","Ref":"Loop Filter1 Mode","DefaultValue":"1","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningLoopFilterMode"}}},{"Parameter":{"DisplayName":"Loop filter 2 mode","Ref":"Loop Filter2 Mode","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningLoopFilterMode"}}},{"Parameter":{"DisplayName":"Loop filter 3 mode","Ref":"Loop Filter3 Mode","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningLoopFilterMode"}}},{"Parameter":{"DisplayName":"Orientation","Ref":"Orientation","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningOrientation"}}},{"Parameter":{"DisplayName":"Max current percent","Ref":"Max Current Percent","DefaultValue":"50","EU":"%"}},{"Parameter":{"DisplayName":"Max distance","Ref":"Max Distance","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Max position error","Ref":"Max Position Error","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Operating point","Ref":"Operating Point","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningOperationPoint"}}},{"Parameter":{"DisplayName":"Velocity","Ref":"Velocity","DefaultValue":"0.0","EU":"mm/s"}},{"Parameter":{"DisplayName":"Acceleration","Ref":"Acceleration","DefaultValue":"0.0","EU":"mm/s²"}},{"Parameter":{"DisplayName":"Resonance factor","Ref":"Resonance Factor","DefaultValue":"2"}},{"Parameter":{"DisplayName":"Signal type","Ref":"Signal Type","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningExcitationSignal"}}},{"Parameter":{"DisplayName":"Signal order","Ref":"Signal Order","DefaultValue":"9"}},{"Parameter":{"DisplayName":"Delay time","Ref":"Delay Time","DefaultValue":"0.0","EU":"s"}},{"Parameter":{"DisplayName":"Signal start frequency","Ref":"Signal Start Frequency","DefaultValue":"0.0","EU":"Hz"}},{"Parameter":{"DisplayName":"Signal stop frequency","Ref":"Signal Stop Frequency","DefaultValue":"0.0","EU":"Hz"}},{"Parameter":{"DisplayName":"Signal time","Ref":"Signal Time","DefaultValue":"0.0","EU":"s"}}]}},{"Command":{"DisplayName":"Autotune test","Ref":"Auto Tune Test","Parameters":[{"Parameter":{"DisplayName":"Mode","Ref":"Mode","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningTestMode"}}},{"Parameter":{"DisplayName":"Orientation","Ref":"Orientation","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningOrientation"}}},{"Parameter":{"DisplayName":"Max current percent","Ref":"Max Current Percent","DefaultValue":"50","EU":"%"}},{"Parameter":{"DisplayName":"Max distance","Ref":"Max Distance","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Max position error","Ref":"Max Position Error","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Signal type","Ref":"Signal Type","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningExcitationSignal"}}},{"Parameter":{"DisplayName":"Signal order","Ref":"Signal Order","DefaultValue":"9"}},{"Parameter":{"DisplayName":"Delay time","Ref":"Delay Time","DefaultValue":"0.0","EU":"s"}},{"Parameter":{"DisplayName":"Signal start frequency","Ref":"Signal Start Frequency","DefaultValue":"0.0","EU":"Hz"}},{"Parameter":{"DisplayName":"Signal stop frequency","Ref":"Signal Stop Frequency","DefaultValue":"0.0","EU":"Hz"}},{"Parameter":{"DisplayName":"Signal time","Ref":"Signal Time","DefaultValue":"0.0","EU":"s"}}]}}]}}]}}'
                    // }
                    metaData[metaParameter.browseName] = JSON.parse(metaParameter.value);
                    //Just for prototype: watchableIcons
                    //var watchstateMetaData = '{"WatchablesStatesStructure":{"Scope":"mapp/Motion/Axis/AcpAxis","Childs":[{"Group":{"DisplayName":"Main","Childs":[{"WatchableState":{"Ref":"Axis_state","WatchableVariablesMapping":[["Communication Ready","Communication"],["PlcOpen State","PLC_State"]],"IconExpression":"Communication == false ? 1 : PLC_State == 1 ? 2 : PLC_State == 2 ? 3 : PLC_State == 3 or PLC_State == 4 or PLC_State == 5 ? 4 : PLC_State == 6 ? 5 : PLC_State == 7 ? 6 : 0","Icon":{"0":{"ImageName":"GearDisabled","Tooltip":"Axis is disabled"},"1":{"ImageName":"CommunicationNotReady","Tooltip":"Communication is not ready"},"2":{"ImageName":"GearEnabled","Tooltip":"Axis is standstill"},"3":{"ImageName":"GeneralError","Tooltip":"Axis is in error state"},"4":{"ImageName":"GearRotating","Tooltip":"Axis is moving"},"5":{"ImageName":"GearsRotating","Tooltip":"Axis is synchronized"}}}},{"WatchableState":{"Ref":"Controller_state","WatchableVariablesMapping":[["Is Powered","Is_Powered"]],"IconExpression":"Is_Powered == true ? 1 : 0","Icon":{"0":{"ImageName":"Off","Tooltip":"Controller is switched off"},"1":{"ImageName":"On","Tooltip":"Controller is switched on"}}}},{"WatchableState":{"Ref":"Axis_reference_state","WatchableVariablesMapping":[["Is Homed","Is_Homed"],["PlcOpen State","PLC_State"]],"IconExpression":"Is_Homed == true ? 1 : PLC_State == 7 ? 2: 0","Icon":{"0":{"ImageName":"UnkownPosition","Tooltip":"Axis is not homed"},"1":{"ImageName":"KnownPosition","Tooltip":"Axis is homed"},"2":{"ImageName":"FindingPosition","Tooltip":"Axis is homing"}}}}]}}]}}'; 
                    //metaData['MetaConfigWatchablesStates'] = JSON.parse(watchstateMetaData);
                    //Just for prototype: quickCommands
                    // var quickMethod = ' {"QuickCommandsStructure":{"Scope":"mapp/Motion/Axis/AcpAxis","Childs":[{"Group":{"DisplayName":"Main","Childs":[{"QuickCommand":{"Ref":"Power On","Tooltip":"Power on","ImageName":"On"}},{"QuickCommand":{"Ref":"Power Off","Tooltip":"Power off","ImageName":"Off"}},{"QuickCommand":{"Ref":"Abort Command","Tooltip":"Abort command","ImageName":"Stop"}},{"QuickCommand":{"Ref":"Reset","Tooltip":"Reset","ImageName":"Reset"}}]}}]}} '
                    // metaData['MetaConfigQuickCommands'] = JSON.parse(quickMethod);
                });
                // update specific parameter types in meta data object
                mappCockpitCommonInfoProvider_1.MappCockpitCommonInfoProvider.initializeMetaData(metaData);
            }
            catch (e) {
                throw new Error("MappCockpitComponentDataModel.browseMetaData: could not parse meta data: " + e.message);
            }
            return metaData;
        };
        MappCockpitComponentDataModel.prototype.executeComponentMethod = function (componentMethod) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._mappCockpitDiagnosticProvider.executeComponentMethod(componentMethod)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * called after component parameters have been updated
         *
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        // Obsolete because components can't be updated at runtime
        /*onComponentParametersUpdated(component: MappCockpitComponent, componentParameters: MappCockpitComponentParameter[]): any {
            this.eventComponentParametersUpdated.raise(this, new EventModelChangedArgs(this, ModelChangeType.updateTarget, "updatedComponentParameters", componentParameters));
        }*/
        /**
         * called after component methods have been updated
         *
         * @param {MappCockpitComponent} component
         * @param {MappCockpitComponentParameter[]} componentMethods
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        // Obsolete because components can't be updated at runtime
        /*onComponentMethodsUpdated(component: MappCockpitComponent, componentMethods: MappCockpitComponentMethod[]): any {
            this.eventComponentMethodsUpdated.raise(this, new EventModelChangedArgs(this, ModelChangeType.updateTarget, "updatedComponentMethods", componentMethods));
        }*/
        /**
         * reads  and updates the parameter values of the specified parameter list
         *
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.readParameterValues = function (componentParameters) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._mappCockpitDiagnosticProvider.readParameterValues(componentParameters)];
                        case 1:
                            _a.sent();
                            this.onParameterValuesUpdated(componentParameters);
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * observes the parameters for value changes
         *
         * @param {IObserver} observer
         * @param {MappCockpitComponentItem[]} observableDataModelItems
         * @returns {Promise<any>}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.observeDataModelItems = function (observer, observableDataModelItems) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._mappCockpitDiagnosticProvider.observeComponentModelItems(observer, observableDataModelItems)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Unobserves the passed parameters.
         *
         * @param {*} observer
         * @param {MappCockpitComponentParameter[]} observableParameters
         * @param {boolean} suspend
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.unobserveComponentModelItems = function (observer, observableParameters, suspend) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._mappCockpitDiagnosticProvider.unobserveComponentModelItems(observer, observableParameters, suspend)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * handles observable changed notifications
         *
         * @private
         * @param {EventObservedItemsChangedArgs} eventArgs
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.handleObservableItemsChanged = function (eventArgs) {
            if (eventArgs.observer instanceof dataModelBase_1.DataModelBase) {
                // create model changed args
                var modelItemsChangedArgs = new dataModelInterface_1.EventModelChangedArgs(eventArgs.observer, dataModelInterface_1.ModelChangeType.updateTarget, "changed observables", eventArgs.changedItems);
                // notify observers from changing model items
                eventArgs.observer.onModelItemsChanged(eventArgs.observer, modelItemsChangedArgs);
            }
        };
        /**
         * notify from updating the specified parameters values
         *
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.onParameterValuesUpdated = function (componentParameters) {
            this.eventParameterValuesUpdated.raise(this, componentParameters);
        };
        /**
         * Called when the model has been successfully connected
         *
         * @private
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.onModelConnected = function () {
            this._modelConnected = true;
            this.onModelConnectionChanged(this._modelConnected);
        };
        /**
         * Called when the model has lost the connection to the target
         *
         * @private
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.onModelDisconnected = function () {
            // notify connection change
            this._modelConnected = false;
            this.onModelConnectionChanged(this._modelConnected);
        };
        /**
         * Observes the connection if it is still alive
         *
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.startObserveModelConnection = function () {
            var _this = this;
            // initially notify the successfull connection
            this.onModelConnected();
            // establish a timer for watching the connection
            if (this._connectionObservationTimerId == -1) {
                this._connectionObservationTimerId = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.observeModelConnection()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }, this._connectionObservationInterval);
            }
        };
        /**
         * Obsereves the model connection
         *
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.observeModelConnection = function () {
            return __awaiter(this, void 0, void 0, function () {
                var isConnected;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._mappCockpitDiagnosticProvider.checkTargetConnection()];
                        case 1:
                            isConnected = _a.sent();
                            if (isConnected) {
                                if (!this._modelConnected) {
                                    this.onModelConnected();
                                }
                            }
                            else {
                                if (this._modelConnected) {
                                    this.onModelDisconnected();
                                }
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Called when the model connection has changed
         *
         * @param {boolean} connected
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.onModelConnectionChanged = function (connected) {
            this.eventModelConnectionChanged.raise(this, connected);
        };
        /**
         * Provides command for changing the user to be logged in
         *
         * @returns {ICommandExecutionDelegate<any,any>}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.executeCommandChangeUser = function () {
            var _this = this;
            return function (userInfo, commandResponse) { return __awaiter(_this, void 0, void 0, function () {
                var _a, error_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            // update the user roles
                            _a = this._userRoles;
                            return [4 /*yield*/, this._mappCockpitDiagnosticProvider.changeUser(userInfo)];
                        case 1:
                            // update the user roles
                            _a.value = (_b.sent());
                            commandResponse.executed(this._userRoles);
                            return [3 /*break*/, 3];
                        case 2:
                            error_2 = _b.sent();
                            commandResponse.rejected(error_2);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); };
        };
        return MappCockpitComponentDataModel;
    }());
    exports.MappCockpitComponentDataModel = MappCockpitComponentDataModel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50c0RhdGFNb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL29ubGluZS9jb21wb25lbnRzRGF0YU1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFpQkE7UUFBbUMsd0NBQW9EO1FBQXZGOztRQUF5RixDQUFDO1FBQUQsMkJBQUM7SUFBRCxDQUFDLEFBQTFGLENBQW1DLG1CQUFVLEdBQTZDO0lBQUEsQ0FBQztJQUMzRjtRQUFxQywwQ0FBaUU7UUFBdEc7O1FBQXdHLENBQUM7UUFBRCw2QkFBQztJQUFELENBQUMsQUFBekcsQ0FBcUMsbUJBQVUsR0FBMEQ7SUFBQSxDQUFDO0lBQzFHO1FBQThDLG1EQUFnRTtRQUE5Rzs7UUFBZ0gsQ0FBQztRQUFELHNDQUFDO0lBQUQsQ0FBQyxBQUFqSCxDQUE4QyxtQkFBVSxHQUF5RDtJQUFBLENBQUM7SUFDbEg7UUFBMkMsZ0RBQWdFO1FBQTNHOztRQUE2RyxDQUFDO1FBQUQsbUNBQUM7SUFBRCxDQUFDLEFBQTlHLENBQTJDLG1CQUFVLEdBQXlEO0lBQUEsQ0FBQztJQUMvRztRQUEwQywrQ0FBK0U7UUFBekg7O1FBQTJILENBQUM7UUFBRCxrQ0FBQztJQUFELENBQUMsQUFBNUgsQ0FBMEMsbUJBQVUsR0FBd0U7SUFBQSxDQUFDO0lBRTdIO1FBQW1DLHdDQUFrRDtRQUFyRjs7UUFBc0YsQ0FBQztRQUFELDJCQUFDO0lBQUQsQ0FBQyxBQUF2RixDQUFtQyxtQkFBVSxHQUEwQztJQUFBLENBQUM7SUFFeEY7Ozs7T0FJRztJQUNIO1FBd0NJOzs7V0FHRztRQUNIO1lBQUEsaUJBb0JDO1lBM0NELDJDQUEyQztZQUNuQyxzQkFBaUIsR0FBMEMsbUJBQVEsQ0FBQyxNQUFNLENBQThCLEVBQUUsQ0FBQyxDQUFDO1lBQzVHLDBCQUFxQixHQUEwQyxtQkFBUSxDQUFDLE1BQU0sQ0FBOEIsRUFBRSxFQUFDLFVBQUMsUUFBUSxJQUFJLEtBQUksQ0FBQyx5QkFBeUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDO1lBS2hMLG1CQUFtQjtZQUNYLGVBQVUsR0FBd0IsbUJBQVEsQ0FBQyxNQUFNLENBQVcsRUFBRSxDQUFDLENBQUM7WUFFeEUsZ0RBQWdEO1lBQ3ZDLG1DQUE4QixHQUFXLElBQUksQ0FBQztZQUN2RCwwQ0FBMEM7WUFDbEMsa0NBQTZCLEdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDbkQsMkNBQTJDO1lBQ25DLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1lBRXhCLCtCQUEwQixHQUFHLFVBQUMsTUFBTSxFQUFFLFNBQVMsSUFBTyxLQUFJLENBQUMsNEJBQTRCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFRMUcscUJBQXFCO1lBQ3JCLElBQUksQ0FBQyw4QkFBOEIsR0FBRyxJQUFJLDZEQUE2QixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlFLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBRXRCLHVCQUF1QjtZQUN2QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxvQkFBb0IsRUFBRSxDQUFDO1lBQ3ZELElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLHNCQUFzQixFQUFFLENBQUM7WUFDM0QsSUFBSSxDQUFDLCtCQUErQixHQUFHLElBQUksK0JBQStCLEVBQUUsQ0FBQztZQUM3RSxJQUFJLENBQUMsMkJBQTJCLEdBQUcsSUFBSSwyQkFBMkIsRUFBRSxDQUFDO1lBQ3JFLElBQUksQ0FBQyw0QkFBNEIsR0FBRyxJQUFJLDRCQUE0QixFQUFFLENBQUM7WUFFdkUsSUFBSSxDQUFDLDJCQUEyQixHQUFHLElBQUksb0JBQW9CLEVBQUUsQ0FBQztZQUU5RCxvQkFBb0I7WUFDcEIsSUFBSSxDQUFDLDhCQUE4QixDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztZQUVwRyxpQ0FBaUM7WUFDakMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzFCLENBQUM7UUFFRDs7OztXQUlHO1FBQ0gsK0NBQU8sR0FBUDtZQUNJLGdCQUFnQjtZQUNoQixJQUFJLENBQUMsOEJBQThCLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1lBQ3BHLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNsRCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSyxzREFBYyxHQUF0QjtZQUNJLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxpQkFBTyxDQUFDLE1BQU0sQ0FBUSxJQUFJLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUMsQ0FBQztRQUMzRixDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILGtEQUFVLEdBQVY7UUFFQSxDQUFDO1FBU0Qsc0JBQVcsd0RBQWE7WUFQeEI7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLDhCQUE4QixDQUFDLGFBQWEsQ0FBQztZQUM3RCxDQUFDOzs7V0FBQTtRQUVEOzs7OztXQUtHO1FBQ0csK0NBQU8sR0FBYjs7Ozs7Ozs0QkFHUSxxQkFBTSxJQUFJLENBQUMsOEJBQThCLENBQUMsWUFBWSxFQUFFLEVBQUE7OzRCQUF4RCxTQUF3RCxDQUFDOzRCQUN6RCxxQkFBTSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBQTs7NEJBQTdCLFNBQTZCLENBQUM7NEJBRTlCLCtCQUErQjs0QkFDL0IsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7NEJBQ25DLHNCQUFPLElBQUksRUFBQzs7OzRCQUVaLHNCQUFPLEtBQUssRUFBQzs7Ozs7U0FFcEI7UUFFRCxzQkFBVyw0REFBaUI7aUJBQTVCO2dCQUNJLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDO1lBQ25DLENBQUM7OztXQUFBO1FBU0Qsc0JBQVcscURBQVU7WUFQckI7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUM1QixDQUFDOzs7V0FBQTtRQUVELHNCQUFXLDJEQUFnQjtpQkFBM0I7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7WUFDbEMsQ0FBQzs7O1dBQUE7UUFFRCxzQkFBVywrREFBb0I7aUJBQS9CO2dCQUNJLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDO1lBQ3RDLENBQUM7OztXQUFBO1FBU0Qsc0JBQVcsb0RBQVM7WUFQcEI7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUMzQixDQUFDOzs7V0FBQTtRQVFELHNCQUFXLHNEQUFXO1lBTnRCOzs7OztlQUtHO2lCQUNIO2dCQUVJLElBQUksbUJBQW1CLEdBQUcsS0FBSyxDQUFDO2dCQUNoQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ2pDLDJEQUEyRDtvQkFDM0QsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQUMsUUFBUSxJQUFLLE9BQU8sUUFBUSxLQUFLLDRDQUF3QixDQUFDLGVBQWUsQ0FBQSxDQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUNsSTtnQkFDRCxPQUFPLG1CQUFtQixDQUFDO1lBQy9CLENBQUM7OztXQUFBO1FBRUQ7Ozs7O1dBS0c7UUFDSCw2Q0FBSyxHQUFMO1lBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDMUIsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0csd0RBQWdCLEdBQXRCOzs7Ozs7NEJBRUksNkJBQTZCOzRCQUM3QixLQUFBLElBQUksQ0FBQTs0QkFBZSxxQkFBTSxJQUFJLENBQUMsOEJBQThCLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLEVBQUUsRUFBQTs7NEJBRGpHLDZCQUE2Qjs0QkFDN0IsR0FBSyxXQUFXLEdBQUcsU0FBOEUsQ0FBQzs0QkFFbEcscUJBQU0sSUFBSSxDQUFDLHVCQUF1QixFQUFFLEVBQUE7OzRCQUFwQyxTQUFvQyxDQUFDOzRCQUVyQyxtQkFBbUI7NEJBQ25CLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDOzRCQUVoQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7NEJBRS9DLHNCQUFPLElBQUksQ0FBQyxXQUFXLEVBQUM7Ozs7U0FDM0I7UUFFRDs7Ozs7V0FLRztRQUNLLGdFQUF3QixHQUFoQztZQUFBLGlCQUVDO1lBREcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQyxTQUFTLElBQWEsU0FBVSxDQUFDLEtBQUssR0FBRyxLQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoRixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDVywrREFBdUIsR0FBckM7Ozs7Ozs0QkFDYSxDQUFDLEdBQUcsQ0FBQzs7O2lDQUFFLENBQUEsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFBOzRCQUN2QyxxQkFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQTs7NEJBQTlDLFNBQThDLENBQUM7Ozs0QkFETixDQUFDLEVBQUUsQ0FBQTs7Ozs7O1NBR25EO1FBRUQ7Ozs7Ozs7V0FPRztRQUNXLGlFQUF5QixHQUF2QyxVQUF3QyxRQUEwQzs7OztvQkFDMUUsVUFBVSxHQUEyQixFQUFFLENBQUM7b0JBRTVDLElBQUk7d0JBQ0EsOENBQThDO3dCQUM5QyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBQyxTQUFTLElBQU8sT0FBTyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBRXBGLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQyxTQUFTLElBQUssMkNBQW9CLENBQUMscUJBQXFCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFFNUYsUUFBUSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxDQUFDO3FCQUM1QztvQkFBQyxPQUFPLEtBQUssRUFBRTt3QkFDWixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNyQixRQUFRLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ3ZDO29CQUNELHNCQUFPLFVBQVUsRUFBQzs7O1NBQ3JCO1FBRUQ7Ozs7OztXQU1HO1FBQ1UsdURBQWUsR0FBNUIsVUFBNkIsb0JBQTBDOzs7O2dDQUNuRSxxQkFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsb0JBQW9CLENBQUMsRUFBQTs7NEJBQWpELFNBQWlELENBQUM7NEJBQ2xELHFCQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsRUFBQTs7NEJBQTlDLFNBQThDLENBQUM7NEJBQy9DLHFCQUFNLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFBOzs0QkFBckQsU0FBcUQsQ0FBQzs0QkFFdEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtREFBbUQsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDOzs7OztTQUMxRjtRQUVEOzs7Ozs7V0FNRztRQUNILDJEQUFtQixHQUFuQixVQUFvQixxQkFBNkM7WUFDN0QsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUscUJBQXFCLENBQUMsQ0FBQTtRQUNsRSxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0csc0RBQWMsR0FBcEIsVUFBcUIsb0JBQTBDOzs7Ozs7OzRCQUc5QixxQkFBTSxJQUFJLENBQUMsOEJBQThCLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFDLEVBQUE7OzRCQUFuRyxrQkFBa0IsR0FBRyxTQUE4RTs0QkFDdkcsSUFBSSxrQkFBa0IsRUFBRTtnQ0FDcEIsb0JBQW9CLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBQzs2QkFDekU7Ozs7NEJBRUQsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7O2dDQUU3QixzQkFBTyxvQkFBb0IsQ0FBQyxRQUFRLEVBQUM7Ozs7U0FDeEM7UUFFRDs7Ozs7V0FLRztRQUNHLHdEQUFnQixHQUF0QixVQUF1QixvQkFBMEM7Ozs7Ozs0QkFDN0QsNkJBQTZCOzRCQUM3QixLQUFBLG9CQUFvQixDQUFBOzRCQUFjLHFCQUFNLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxnQkFBZ0IsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFBOzs0QkFEbEgsNkJBQTZCOzRCQUM3QixHQUFxQixVQUFVLEdBQUcsU0FBZ0YsQ0FBQzs0QkFFbkgsc0NBQXNDOzRCQUN0QyxxQkFBTSxJQUFJLENBQUMsc0JBQXNCLENBQUMsb0JBQW9CLENBQUMsRUFBQTs7NEJBRHZELHNDQUFzQzs0QkFDdEMsU0FBdUQsQ0FBQzs0QkFFeEQsc0JBQU8sb0JBQW9CLENBQUMsVUFBVSxFQUFDOzs7O1NBQzFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0csbUVBQTJCLEdBQWpDLFVBQWtDLDBCQUFzRDs7Ozs7d0JBRXBGLDJDQUEyQzt3QkFDM0MscUJBQU0sSUFBSSxDQUFDLDhCQUE4QixDQUFDLHNCQUFzQixDQUFDLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxFQUFBOzs0QkFEOUYsMkNBQTJDOzRCQUMzQyxTQUE4RixDQUFDOzRCQUUvRixrQ0FBa0M7NEJBQ2xDLHFCQUFNLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLDBCQUEwQixDQUFDLENBQUMsRUFBQTs7NEJBRHRHLGtDQUFrQzs0QkFDbEMsU0FBc0csQ0FBQzs0QkFFdkcsc0JBQU8sMEJBQTBCLENBQUMsZUFBZSxFQUFDOzs7O1NBQ3JEO1FBRUQ7Ozs7OztXQU1HO1FBQ1csOERBQXNCLEdBQXBDLFVBQXFDLG9CQUEwQzs7Ozs7OzRCQUN2RSxtQkFBbUIsR0FBRyxDQUFDLHNCQUFzQixFQUFFLHFCQUFxQixFQUFFLFdBQVcsQ0FBQyxDQUFDOzRCQUNuRix3QkFBd0IsR0FBRyxDQUFDLDRCQUE0QixFQUFFLDJCQUEyQixFQUFFLGdCQUFnQixDQUFDLENBQUM7NEJBRTdHLG9CQUFvQixDQUFDLGlCQUFpQixHQUFHLGtFQUFpQyxDQUFDLHlCQUF5QixDQUFDLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxDQUFDO2lDQUNsSSxvQkFBb0IsQ0FBQyxRQUFRLEVBQTdCLHdCQUE2QjtpQ0FFekIsQ0FBQSxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxJQUFJLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUEsRUFBckksd0JBQXFJOzRCQUNySSxvQkFBb0IsQ0FBQyxtQkFBbUIsR0FBRyxrRUFBaUMsQ0FBQywyQkFBMkIsQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztpQ0FDM0osQ0FBQSxvQkFBb0IsQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBLEVBQW5ELHdCQUFtRDs0QkFDbkQscUJBQU0sSUFBSSxDQUFDLDhCQUE4QixDQUFDLHdCQUF3QixDQUFDLG9CQUFvQixDQUFDLG1CQUFtQixDQUFDLEVBQUE7OzRCQUE1RyxTQUE0RyxDQUFDOzRCQUM3RyxrRUFBaUMsQ0FBQyxlQUFlLENBQUMsb0JBQW9CLENBQUMsbUJBQW1CLEVBQUUsb0JBQW9CLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7OztpQ0FLekosQ0FBQSxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxJQUFJLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUEsRUFBekksd0JBQXlJOzRCQUUxSSxvQkFBb0IsQ0FBQyx1QkFBdUIsR0FBRyxrRUFBaUMsQ0FBQywrQkFBK0IsQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztpQ0FDOUksQ0FBQSxvQkFBb0IsQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBLEVBQXZELHdCQUF1RDs0QkFDdkQscUJBQU0sSUFBSSxDQUFDLDhCQUE4QixDQUFDLHdCQUF3QixDQUFDLG9CQUFvQixDQUFDLHVCQUF1QixDQUFDLEVBQUE7OzRCQUFoSCxTQUFnSCxDQUFDOzRCQUNqSCxrRUFBaUMsQ0FBQyxlQUFlLENBQUMsb0JBQW9CLENBQUMsdUJBQXVCLEVBQUUsb0JBQW9CLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7Ozs0QkFLdEssSUFBSyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxJQUFJLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxvQkFBb0IsQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dDQUNwTSxvQkFBb0IsQ0FBQyx3QkFBd0IsR0FBRyxrRUFBaUMsQ0FBQyx1QkFBdUIsQ0FBQyxvQkFBb0IsQ0FBQyxtQkFBbUIsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDOzZCQUNqTDs7Ozs7O1NBR1I7UUFFRDs7Ozs7V0FLRztRQUNHLCtEQUF1QixHQUE3QixVQUE4QixTQUF3Qzs7OztnQ0FDbEUscUJBQU0sSUFBSSxDQUFDLDhCQUE4QixDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUE7OzRCQUF6RixTQUF5RixDQUFDOzs7OztTQUM3RjtRQUVEOzs7Ozs7V0FNRztRQUNHLHFEQUFhLEdBQW5CLFVBQW9CLG9CQUEwQzs7Ozs7OzRCQUN0RCxpQkFBaUIsR0FBRyxDQUFDLG9CQUFvQixFQUFFLG1CQUFtQixFQUFFLFNBQVMsQ0FBQyxDQUFDOzRCQUMzRSx1QkFBdUIsR0FBRyxDQUFDLHlCQUF5QixFQUFFLHdCQUF3QixFQUFFLGNBQWMsQ0FBQyxDQUFDOzRCQUVwRyxvQ0FBb0M7NEJBQ3BDLEtBQUEsb0JBQW9CLENBQUE7NEJBQVcscUJBQU0sSUFBSSxDQUFDLDhCQUE4QixDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFBOzs0QkFENUcsb0NBQW9DOzRCQUNwQyxHQUFxQixPQUFPLEdBQUcsU0FBNkUsQ0FBQzs0QkFFN0csd0RBQXdEOzRCQUN4RCxvQkFBb0IsQ0FBQyxXQUFXLEdBQUcsK0RBQThCLENBQUMseUJBQXlCLENBQUMsb0JBQW9CLENBQUMsT0FBTyxFQUFFLGlCQUFpQixDQUFDLENBQUM7NEJBQzdJLG9CQUFvQixDQUFDLGFBQWEsR0FBRywrREFBOEIsQ0FBQyxxQkFBcUIsQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsdUJBQXVCLENBQUMsQ0FBQzs0QkFDakosc0JBQU8sb0JBQW9CLENBQUMsT0FBTyxFQUFDOzs7O1NBQ3ZDO1FBRUQ7Ozs7OztXQU1HO1FBQ0csNERBQW9CLEdBQTFCLFVBQTJCLG9CQUEwQzs7Ozs7Ozs0QkFFakUsNkJBQTZCOzRCQUM3QixLQUFBLG9CQUFvQixDQUFBOzRCQUFrQixxQkFBTSxJQUFJLENBQUMsOEJBQThCLENBQUMsb0JBQW9CLENBQUMsb0JBQW9CLENBQUMsRUFBQTs7NEJBRDFILDZCQUE2Qjs0QkFDN0IsR0FBcUIsY0FBYyxHQUFHLFNBQW9GLENBQUM7aUNBR3ZILG9CQUFvQixDQUFDLGNBQWMsRUFBbkMsd0JBQW1DOzRCQUNuQyw4Q0FBOEM7NEJBQzlDLHFCQUFNLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxNQUFBLG9CQUFvQixDQUFDLGNBQWMsMENBQUUsT0FBUSxDQUFDLEVBQUE7OzRCQURyRiw4Q0FBOEM7NEJBQzlDLFNBQXFGLENBQUM7NEJBRXRGLElBQUksb0JBQW9CLENBQUMsY0FBYyxFQUFFO2dDQUNyQyxvQkFBb0IsQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLENBQUM7NkJBQ3BEOztnQ0FJTCxzQkFBTyxvQkFBb0IsQ0FBQyxjQUFjLEVBQUM7Ozs7U0FDOUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ssMkRBQW1CLEdBQTNCLFVBQTRCLG9CQUEwQyxFQUFFLGdCQUFxQjtZQUN6RixJQUFJLFdBQVcsR0FBaUMsRUFBRSxDQUFDO1lBRW5ELElBQUksb0JBQW9CLENBQUMsUUFBUSxJQUFLLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLElBQUksb0JBQW9CLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsRUFBRTtnQkFDcEssSUFBSSxhQUFXLEdBQUcsb0JBQW9CLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUN6RSxXQUFXLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLFVBQUMsTUFBTSxJQUFPLE9BQU8sYUFBVyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2pHO1lBQ0QsT0FBTyxXQUFXLENBQUM7UUFDdkIsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSyxvREFBWSxHQUFwQixVQUFxQixjQUE2QjtZQUM5QyxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFFbEIsSUFBSTtnQkFDQSxjQUFjLENBQUMsT0FBTyxDQUFDLFVBQUMsYUFBa0I7b0JBQ3RDLElBQUcsYUFBYSxDQUFDLEtBQUssSUFBSSxFQUFFLEVBQUMsRUFBRSx1REFBdUQ7d0JBQ2xGLGFBQWEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO3FCQUM5QjtvQkFFRCwrQ0FBK0M7b0JBQy9DLG9FQUFvRTtvQkFDcEUsMG5tQkFBMG5tQjtvQkFDMW5tQixJQUFJO29CQUNKLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBRXJFLG9DQUFvQztvQkFDcEMsbWlEQUFtaUQ7b0JBQ25pRCwwRUFBMEU7b0JBRTFFLG1DQUFtQztvQkFDbkMsbWNBQW1jO29CQUNuYyxpRUFBaUU7Z0JBQ3JFLENBQUMsQ0FBQyxDQUFDO2dCQUVILHNEQUFzRDtnQkFDdEQsNkRBQTZCLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDOUQ7WUFDRCxPQUFPLENBQUMsRUFBRTtnQkFDTixNQUFNLElBQUksS0FBSyxDQUFDLDJFQUEyRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUM1RztZQUNELE9BQU8sUUFBUSxDQUFDO1FBQ3BCLENBQUM7UUFFSyw4REFBc0IsR0FBNUIsVUFBNkIsZUFBMkM7Ozs7Z0NBQzdELHFCQUFNLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxzQkFBc0IsQ0FBQyxlQUFlLENBQUMsRUFBQTtnQ0FBeEYsc0JBQU8sU0FBaUYsRUFBQzs7OztTQUM1RjtRQUVEOzs7Ozs7V0FNRztRQUNILDBEQUEwRDtRQUMxRDs7V0FFRztRQUVIOzs7Ozs7O1dBT0c7UUFDSCwwREFBMEQ7UUFDMUQ7O1dBRUc7UUFFSDs7Ozs7O1dBTUc7UUFDRywyREFBbUIsR0FBekIsVUFBMEIsbUJBQW9EOzs7O2dDQUMxRSxxQkFBTSxJQUFJLENBQUMsOEJBQThCLENBQUMsbUJBQW1CLENBQUMsbUJBQW1CLENBQUMsRUFBQTs7NEJBQWxGLFNBQWtGLENBQUM7NEJBQ25GLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDOzs7OztTQUN0RDtRQUVEOzs7Ozs7O1dBT0c7UUFDRyw2REFBcUIsR0FBM0IsVUFBNEIsUUFBbUIsRUFBRSx3QkFBb0Q7Ozs7Z0NBQ2pHLHFCQUFNLElBQUksQ0FBQyw4QkFBOEIsQ0FBQywwQkFBMEIsQ0FBQyxRQUFRLEVBQUUsd0JBQXdCLENBQUMsRUFBQTs7NEJBQXhHLFNBQXdHLENBQUM7Ozs7O1NBQzVHO1FBRUQ7Ozs7Ozs7V0FPRztRQUNHLG9FQUE0QixHQUFsQyxVQUFtQyxRQUFhLEVBQUUsb0JBQXFELEVBQUUsT0FBZTs7OztnQ0FDcEgscUJBQU0sSUFBSSxDQUFDLDhCQUE4QixDQUFDLDRCQUE0QixDQUFDLFFBQVEsRUFBRSxvQkFBb0IsRUFBQyxPQUFPLENBQUMsRUFBQTs7NEJBQTlHLFNBQThHLENBQUM7Ozs7O1NBQ2xIO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssb0VBQTRCLEdBQXBDLFVBQXFDLFNBQXdDO1lBRXpFLElBQUksU0FBUyxDQUFDLFFBQVEsWUFBWSw2QkFBYSxFQUFFO2dCQUU3Qyw0QkFBNEI7Z0JBQzVCLElBQUkscUJBQXFCLEdBQUcsSUFBSSwwQ0FBcUIsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLG9DQUFlLENBQUMsWUFBWSxFQUFFLHFCQUFxQixFQUFFLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDdkosNkNBQTZDO2dCQUM3QyxTQUFTLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUscUJBQXFCLENBQUMsQ0FBQzthQUNyRjtRQUNMLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSyxnRUFBd0IsR0FBaEMsVUFBaUMsbUJBQW9EO1lBQ2pGLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLG1CQUFtQixDQUFDLENBQUM7UUFDdEUsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ssd0RBQWdCLEdBQXhCO1lBRUksSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7WUFDNUIsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN4RCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSywyREFBbUIsR0FBM0I7WUFDSSwyQkFBMkI7WUFDM0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7WUFDN0IsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN4RCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSyxtRUFBMkIsR0FBbkM7WUFBQSxpQkFXQztZQVRHLDhDQUE4QztZQUM5QyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUV4QixnREFBZ0Q7WUFDaEQsSUFBSSxJQUFJLENBQUMsNkJBQTZCLElBQUksQ0FBQyxDQUFDLEVBQUU7Z0JBQzFDLElBQUksQ0FBQyw2QkFBNkIsR0FBRyxXQUFXLENBQUM7OztvQ0FDN0MscUJBQU0sSUFBSSxDQUFDLHNCQUFzQixFQUFFLEVBQUE7O2dDQUFuQyxTQUFtQyxDQUFDOzs7O3FCQUN2QyxFQUFFLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO2FBQzNDO1FBQ0wsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ1csOERBQXNCLEdBQXBDOzs7OztnQ0FHc0IscUJBQU0sSUFBSSxDQUFDLDhCQUE4QixDQUFDLHFCQUFxQixFQUFFLEVBQUE7OzRCQUEvRSxXQUFXLEdBQUcsU0FBaUU7NEJBRW5GLElBQUksV0FBVyxFQUFFO2dDQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO29DQUN2QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztpQ0FDM0I7NkJBQ0o7aUNBQUk7Z0NBQ0QsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO29DQUN0QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztpQ0FDOUI7NkJBQ0o7Ozs7O1NBQ0o7UUFFRDs7Ozs7O1dBTUc7UUFDSCxnRUFBd0IsR0FBeEIsVUFBeUIsU0FBaUI7WUFDdEMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0QsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsZ0VBQXdCLEdBQXhCO1lBQUEsaUJBVUM7WUFURyxPQUFPLFVBQU8sUUFBWSxFQUFFLGVBQXVEOzs7Ozs7NEJBRTNFLHdCQUF3Qjs0QkFDeEIsS0FBQSxJQUFJLENBQUMsVUFBVSxDQUFBOzRCQUFVLHFCQUFNLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUE7OzRCQUR2Rix3QkFBd0I7NEJBQ3hCLEdBQWdCLEtBQUssSUFBSSxTQUEwRSxDQUFBLENBQUM7NEJBQ3BHLGVBQWUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDOzs7OzRCQUUxQyxlQUFlLENBQUMsUUFBUSxDQUFDLE9BQUssQ0FBQyxDQUFDOzs7OztpQkFFdkMsQ0FBQztRQUNOLENBQUM7UUFDTCxvQ0FBQztJQUFELENBQUMsQUFycUJELElBcXFCQztJQUVRLHNFQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyIH0gZnJvbSBcIi4uL2RpYWdub3N0aWNzL21hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50LCBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlciwgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QsIE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbSwgTWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXIgfSBmcm9tIFwiLi9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdFRyYWNlUHJvdmlkZXIgfSBmcm9tIFwiLi4vZGlhZ25vc3RpY3MvdHJhY2UvbWFwcENvY2twaXRUcmFjZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFR5cGVkRXZlbnQgfSBmcm9tICcuLi8uLi9mcmFtZXdvcmsvZXZlbnRzJztcclxuaW1wb3J0IHsgRXZlbnRNb2RlbENoYW5nZWRBcmdzLCBNb2RlbENoYW5nZVR5cGUgfSBmcm9tIFwiLi4vZGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEV2ZW50T2JzZXJ2ZWRJdGVtc0NoYW5nZWRBcmdzIH0gZnJvbSBcIi4uL2RpYWdub3N0aWNzL21hcHBDb2NrcGl0RGlhZ25vc3RpY01vbml0b3JpbmdQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBEYXRhTW9kZWxCYXNlIH0gZnJvbSBcIi4uL2RhdGFNb2RlbEJhc2VcIjtcclxuaW1wb3J0IHsgUHJvcGVydHkgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL3Byb3BlcnR5XCI7XHJcbmltcG9ydCB7IENvbW1hbmQsIElDb21tYW5kRXhlY3V0aW9uUmVzcG9uc2VEZWxlZ2F0ZSwgSUNvbW1hbmRFeGVjdXRpb25EZWxlZ2F0ZSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvY29tbWFuZFwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlciB9IGZyb20gXCIuLi9kaWFnbm9zdGljcy9tYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlclwiO1xyXG5pbXBvcnQgeyBUcmFjZURhdGEgfSBmcm9tIFwiLi4vZGlhZ25vc3RpY3MvdHJhY2UvdHJhY2VEYXRhUmVhZGVyXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mbywgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvIH0gZnJvbSBcIi4vbWFwcENvY2twaXRDb21wb25lbnRSZWZsZWN0aW9uXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29uZmlndXJhdGlvbiB9IGZyb20gXCIuLi8uLi9jb21tb24vbWFwcENvY2twaXRDb25maWdcIjtcclxuaW1wb3J0IHsgSU9ic2VydmVyIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9pbnRlcmZhY2VzL29ic2VydmVyXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50U2VydmljZSB9IGZyb20gXCIuL21hcHBDb2NrcGl0Q29tcG9uZW50U2VydmljZVwiO1xyXG5cclxuXHJcbmNsYXNzIEV2ZW50VHJhY2VEYXRhTG9hZGVkIGV4dGVuZHMgVHlwZWRFdmVudDxNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbCwgVHJhY2VEYXRhPnsgfTtcclxuY2xhc3MgRXZlbnRDb21wb25lbnRzVXBkYXRlZCBleHRlbmRzIFR5cGVkRXZlbnQ8TWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwsIE1hcHBDb2NrcGl0Q29tcG9uZW50W10+eyB9O1xyXG5jbGFzcyBFdmVudENvbXBvbmVudFBhcmFtZXRlcnNVcGRhdGVkIGV4dGVuZHMgVHlwZWRFdmVudDxNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbCwgRXZlbnRNb2RlbENoYW5nZWRBcmdzPnsgfTtcclxuY2xhc3MgRXZlbnRDb21wb25lbnRNZXRob2RzVXBkYXRlZCBleHRlbmRzIFR5cGVkRXZlbnQ8TWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwsIEV2ZW50TW9kZWxDaGFuZ2VkQXJncz57IH07XHJcbmNsYXNzIEV2ZW50UGFyYW1ldGVyVmFsdWVzVXBkYXRlZCBleHRlbmRzIFR5cGVkRXZlbnQ8TWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwsIEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPj57IH07XHJcblxyXG5jbGFzcyBFdmVudE1vZGVsQ29ubmVjdGlvbiBleHRlbmRzIFR5cGVkRXZlbnQ8TWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwsIGJvb2xlYW4+e307XHJcblxyXG4vKipcclxuICogVGhlIGNsYXNzIGltcGxlbWVudHMgdGhlIG1haW4gZGF0YSBtb2RlbCBmb3IgbWFwcCBDb2NrcGl0LiBcclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbCB7XHJcblxyXG4gICAgcHJvdGVjdGVkIF9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlcjogTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXI7XHJcblxyXG4gICAgcHJvdGVjdGVkIF9jb21wb25lbnRzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudD47XHJcblxyXG4gICAgLy8gRGVjbGFyZSBldmVudCB0cmFjZSBkYXRhIGxvYWRlZFxyXG4gICAgcHVibGljIGV2ZW50VHJhY2VEYXRhTG9hZGVkOiBFdmVudFRyYWNlRGF0YUxvYWRlZDtcclxuXHJcbiAgICAvLyBEZWNsYXJlIGV2ZW50IHRyYWNlIGRhdGEgbG9hZGVkXHJcbiAgICBwdWJsaWMgZXZlbnRDb21wb25lbnRzVXBkYXRlZDogRXZlbnRDb21wb25lbnRzVXBkYXRlZDtcclxuXHJcbiAgICBwdWJsaWMgZXZlbnRDb21wb25lbnRQYXJhbWV0ZXJzVXBkYXRlZDogRXZlbnRDb21wb25lbnRQYXJhbWV0ZXJzVXBkYXRlZDtcclxuXHJcbiAgICBwdWJsaWMgZXZlbnRDb21wb25lbnRNZXRob2RzVXBkYXRlZDogRXZlbnRDb21wb25lbnRNZXRob2RzVXBkYXRlZDtcclxuXHJcbiAgICBwdWJsaWMgZXZlbnRQYXJhbWV0ZXJWYWx1ZXNVcGRhdGVkOiBFdmVudFBhcmFtZXRlclZhbHVlc1VwZGF0ZWQ7XHJcblxyXG4gICAgLy8gRGVjbGFyZSBldmVudCBmb3IgbW9kZWwgY29ubmVjdGlvbiBjaGFuZ2VcclxuICAgIHB1YmxpYyBldmVudE1vZGVsQ29ubmVjdGlvbkNoYW5nZWQ6IEV2ZW50TW9kZWxDb25uZWN0aW9uO1xyXG5cclxuICAgIC8vIENyZWF0ZSBhIGRhdGEgc291cmNlIGZvciB0aGUgY29tcG9uZW50cy5cclxuICAgIHByaXZhdGUgX2NvbXBvbmVudHNTb3VyY2U6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50Pj4gPSBQcm9wZXJ0eS5jcmVhdGU8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnQ+PihbXSk7XHJcbiAgICBwcml2YXRlIF91c2VyQ29tcG9uZW50c1NvdXJjZTogUHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnQ+PiA9IFByb3BlcnR5LmNyZWF0ZTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudD4+KFtdLChkYXRhTGluayk9Pnt0aGlzLnJlcXVlc3RSZWFkVXNlckNvbXBvbmVudHMoZGF0YUxpbmspO30pO1xyXG5cclxuICAgIC8vIENvbW1hbmQgZm9yIGNoYW5naW5nIHRoZSB1c2VyXHJcbiAgICBwcml2YXRlIF9jb21tYW5kQ2hhbmdlVXNlciE6IENvbW1hbmQ8e30sIHt9PjtcclxuICAgIFxyXG4gICAgLy8gSG9sZHMgdXNlciByb2xlc1xyXG4gICAgcHJpdmF0ZSBfdXNlclJvbGVzOiBQcm9wZXJ0eTxzdHJpbmdbXT4gPSAgUHJvcGVydHkuY3JlYXRlPHN0cmluZ1tdPihbXSk7XHJcblxyXG4gICAgLy8gc3BlY2lmaWVzIGludGVydmFsIGZvciBjb25uZWN0aW9uIG9ic2VydmF0aW9uXHJcbiAgICBwcml2YXRlICBfY29ubmVjdGlvbk9ic2VydmF0aW9uSW50ZXJ2YWw6IG51bWJlciA9IDEwMDA7XHJcbiAgICAvLyBzcGVjZWZpZXMgdGhlIGNvbm5lY3Rpb24gb2JzZXJ2YXRpb24gaWRcclxuICAgIHByaXZhdGUgX2Nvbm5lY3Rpb25PYnNlcnZhdGlvblRpbWVySWQ6IG51bWJlciA9IC0xO1xyXG4gICAgLy8gaG9sZHMgdGhlIGN1cnJlbnQgbW9kZWwgY29ubmVjdGlvbiBzdGF0ZVxyXG4gICAgcHJpdmF0ZSBfbW9kZWxDb25uZWN0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIF9vYnNlcnZhYmxlc0NoYW5nZWRIYW5kbGVyID0gKHNlbmRlciwgZXZlbnRBcmdzKSA9PiB7IHRoaXMuaGFuZGxlT2JzZXJ2YWJsZUl0ZW1zQ2hhbmdlZChldmVudEFyZ3MpOyB9OyBcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwuXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgICAgIC8vIEluaXRpYWxpemUgbWVtYmVyc1xyXG4gICAgICAgIHRoaXMuX21hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyID0gbmV3IE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudHMgPSBbXTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGV2ZW50IHNvdXJjZXNcclxuICAgICAgICB0aGlzLmV2ZW50VHJhY2VEYXRhTG9hZGVkID0gbmV3IEV2ZW50VHJhY2VEYXRhTG9hZGVkKCk7XHJcbiAgICAgICAgdGhpcy5ldmVudENvbXBvbmVudHNVcGRhdGVkID0gbmV3IEV2ZW50Q29tcG9uZW50c1VwZGF0ZWQoKTtcclxuICAgICAgICB0aGlzLmV2ZW50Q29tcG9uZW50UGFyYW1ldGVyc1VwZGF0ZWQgPSBuZXcgRXZlbnRDb21wb25lbnRQYXJhbWV0ZXJzVXBkYXRlZCgpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRQYXJhbWV0ZXJWYWx1ZXNVcGRhdGVkID0gbmV3IEV2ZW50UGFyYW1ldGVyVmFsdWVzVXBkYXRlZCgpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRDb21wb25lbnRNZXRob2RzVXBkYXRlZCA9IG5ldyBFdmVudENvbXBvbmVudE1ldGhvZHNVcGRhdGVkKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZXZlbnRNb2RlbENvbm5lY3Rpb25DaGFuZ2VkID0gbmV3IEV2ZW50TW9kZWxDb25uZWN0aW9uKCk7XHJcblxyXG4gICAgICAgIC8vIGZvcndhcmQgdGhlIGV2ZW50XHJcbiAgICAgICAgdGhpcy5fbWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIuZXZlbnRPYnNlcnZhYmxlc0NoYW5nZWQuYXR0YWNoKHRoaXMuX29ic2VydmFibGVzQ2hhbmdlZEhhbmRsZXIpO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgYW5kIGluaXRpYWxpemUgY29tbWFuZHNcclxuICAgICAgICB0aGlzLmNyZWF0ZUNvbW1hbmRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwb3NlIHRoZSBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBkaXNwb3NlKCl7XHJcbiAgICAgICAgLy8gZGV0YWNoIGV2ZW50c1xyXG4gICAgICAgIHRoaXMuX21hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyLmV2ZW50T2JzZXJ2YWJsZXNDaGFuZ2VkLmRldGFjaCh0aGlzLl9vYnNlcnZhYmxlc0NoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLl9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGV4cG9zZWQgY29tbWFuZHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlQ29tbWFuZHMoKSB7XHJcbiAgICAgICAgdGhpcy5fY29tbWFuZENoYW5nZVVzZXIgPSBDb21tYW5kLmNyZWF0ZTx7fSx7fT4odGhpcywgdGhpcy5leGVjdXRlQ29tbWFuZENoYW5nZVVzZXIoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBpbml0aWFsaXplcyB0aGUgZGF0YSBtb2RlbFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHRyYWNlIHByb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7TWFwcENvY2twaXRUcmFjZVByb3ZpZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgdHJhY2VQcm92aWRlcigpOiBNYXBwQ29ja3BpdFRyYWNlUHJvdmlkZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlci50cmFjZVByb3ZpZGVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY29ubmVjdHMgdGhlIGRhdGEgbW9kZWwgdG8gdGhlIGRhdGEgc291cmNlXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgYXN5bmMgY29ubmVjdCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgICAgICB0cnkge1xyXG5cclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5fbWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIuYmVnaW5TZXNzaW9uKCk7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuYnJvd3NlQ29tcG9uZW50cygpO1xyXG5cclxuICAgICAgICAgICAgLy8gYWZ0ZXIgY29ubmVjdGluIHN1Y2Nlc3NmdWxseVxyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0T2JzZXJ2ZU1vZGVsQ29ubmVjdGlvbigpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY29tbWFuZENoYW5nZVVzZXIoKTogQ29tbWFuZDx7fSwge30+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29tbWFuZENoYW5nZVVzZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBhdmFpbGFibGUgbWFwcCBjb21wb25lbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnQ+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgY29tcG9uZW50cygpOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb21wb25lbnRzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0IGNvbXBvbmVudHNTb3VyY2UoKSA6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50Pj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb21wb25lbnRzU291cmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgdXNlckNvbXBvbmVudHNTb3VyY2UoKSA6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50Pj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl91c2VyQ29tcG9uZW50c1NvdXJjZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBjdXJyZW50IHVzZXIgcm9sZXNcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtzdHJpbmdbXX1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHVzZXJSb2xlcygpIDogUHJvcGVydHk8c3RyaW5nW10+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdXNlclJvbGVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHdyaXRlQWNjZXNzKCk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIGxldCBtb2RlbEhhc1dyaXRlQWNjZXNzID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMudXNlclJvbGVzLnZhbHVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSB3cml0ZSBhY2Nlc3MgcmlnaHQgYWNjb3JkaW5nIHRoZSBjdXJyZW50IHJvbGVcclxuICAgICAgICAgICAgbW9kZWxIYXNXcml0ZUFjY2VzcyA9IHRoaXMudXNlclJvbGVzLnZhbHVlLnNvbWUoKHVzZXJSb2xlKT0+eyByZXR1cm4gdXNlclJvbGUgPT09IE1hcHBDb2NrcGl0Q29uZmlndXJhdGlvbi53cml0ZUFjY2Vzc1JvbGUgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbW9kZWxIYXNXcml0ZUFjY2VzcztcclxuICAgIH0gICBcclxuICBcclxuICAgIC8qKlxyXG4gICAgICogQ2xlYXJzIHRoZSBkYXRhIG1vZGVsXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgY2xlYXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29tcG9uZW50cyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQnJvd3NlcyBhbGwgYXZhaWxhYmxlIHJlc291cmNlcyBhbmQgdXBkYXRlcyB0aGUgbW9kZWxcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBhc3luYyBicm93c2VDb21wb25lbnRzKCk6IFByb21pc2U8TWFwcENvY2twaXRDb21wb25lbnRbXT4ge1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgY29tcG9uZW50cyBpbiBtb2RlbFxyXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudHMgPSBhd2FpdCB0aGlzLl9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlci5jb21wb25lbnRQcm92aWRlci5icm93c2VDb21wb25lbnRzKCk7XHJcblxyXG4gICAgICAgIGF3YWl0IHRoaXMudXBkYXRlQ29tcG9uZW50TWV0YURhdGEoKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBDb25uZWN0IHRvIG1vZGVsXHJcbiAgICAgICAgdGhpcy5jb25uZWN0Q29tcG9uZW50c1RvTW9kZWwoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnRzU291cmNlLnZhbHVlID0gdGhpcy5fY29tcG9uZW50cztcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBvbmVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25uZWN0cyB0aGUgY29tcG9uZW50cyB0byB0aGUgbWFvbiBkYXRhIG1vZGVsXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbm5lY3RDb21wb25lbnRzVG9Nb2RlbCgpIHtcclxuICAgICAgICB0aGlzLl9jb21wb25lbnRzLmZvckVhY2goKGNvbXBvbmVudCkgPT4geyAoPGFueT5jb21wb25lbnQpLm1vZGVsID0gdGhpczsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBjb21wb25lbnRzIG1ldGEgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyB1cGRhdGVDb21wb25lbnRNZXRhRGF0YSgpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2NvbXBvbmVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5icm93c2VNZXRhSW5mbyh0aGlzLl9jb21wb25lbnRzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyB0aGUgYXZhaWxhYmxlIHVzZXIgY29tcG9uZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1Byb3BlcnR5PE1hcHBDb2NrcGl0Q29tcG9uZW50W10+fSBkYXRhTGlua1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8TWFwcENvY2twaXRDb21wb25lbnRbXT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyByZXF1ZXN0UmVhZFVzZXJDb21wb25lbnRzKGRhdGFMaW5rOiBQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudFtdPik6IFByb21pc2U8TWFwcENvY2twaXRDb21wb25lbnRbXT4ge1xyXG4gICAgICAgIGxldCBjb21wb25lbnRzOiBNYXBwQ29ja3BpdENvbXBvbmVudFtdID0gW107XHJcblxyXG4gICAgICAgIHRyeSB7ICAgICAgXHJcbiAgICAgICAgICAgIC8vIGZpbHRlciBjb21wb25lbnRzIHRvIGJlIGV4cG9zZWQgdG8gdGhlIHVzZXJcclxuICAgICAgICAgICAgY29tcG9uZW50cyA9IHRoaXMuX2NvbXBvbmVudHMuZmlsdGVyKChjb21wb25lbnQpID0+IHsgcmV0dXJuIGNvbXBvbmVudC5tZXRhRGF0YTsgfSk7XHJcblxyXG4gICAgICAgICAgICBjb21wb25lbnRzLmZvckVhY2goKGNvbXBvbmVudCk9PnsgTWFwcENvY2twaXRDb21wb25lbnQucmVnaXN0ZXJVc2VyQ29tcG9uZW50KGNvbXBvbmVudCk7IH0pO1xyXG5cclxuICAgICAgICAgICAgZGF0YUxpbmsucmVhZFJlcXVlc3RFeGVjdXRlZChjb21wb25lbnRzKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgZGF0YUxpbmsucmVhZFJlcXVlc3RSZWplY3RlZChlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb21wb25lbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYnJvd3NlcyB0aGUgbWV0YSBkYXRhLCBwYXJhbWV0ZXJzIGFucyBtZXRob2RzIG9mIGEgc2luZ2xlIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50fSBtYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBicm93c2VDb21wb25lbnQobWFwcENvY2twaXRDb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50KSB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5icm93c2VQYXJhbWV0ZXJzKG1hcHBDb2NrcGl0Q29tcG9uZW50KTtcclxuICAgICAgICBhd2FpdCB0aGlzLmJyb3dzZU1ldGhvZHMobWFwcENvY2twaXRDb21wb25lbnQpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuYnJvd3NlU2VydmljZUNoYW5uZWwobWFwcENvY2twaXRDb21wb25lbnQpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIk1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsLmJyb3dzZUNvbXBvbmVudDogJW9cIiwgbWFwcENvY2twaXRDb21wb25lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIGFmdGVyIGNvbXBvbmVudHMgdXBkYXRlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFtdfSBtYXBwQ29ja3BpdENvbXBvbmVudHNcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIG9uQ29tcG9uZW50c1VwZGF0ZWQobWFwcENvY2twaXRDb21wb25lbnRzOiBNYXBwQ29ja3BpdENvbXBvbmVudFtdKTogYW55IHtcclxuICAgICAgICB0aGlzLmV2ZW50Q29tcG9uZW50c1VwZGF0ZWQucmFpc2UodGhpcywgbWFwcENvY2twaXRDb21wb25lbnRzKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICAgKiBicm93c2VzIHRoZSBtZXRhIGluZm8gZm9yIGEgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudH0gbWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgYXN5bmMgYnJvd3NlTWV0YUluZm8obWFwcENvY2twaXRDb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50KTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBVcGRhdGUgY29tcG9uZW50cyBpbiBtb2RlbFxyXG4gICAgICAgICAgICBsZXQgbWV0YUluZm9SZWZlcmVuY2VzID0gYXdhaXQgdGhpcy5fbWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIuYnJvd3NlTWV0YUluZm8obWFwcENvY2twaXRDb21wb25lbnQpO1xyXG4gICAgICAgICAgICBpZiAobWV0YUluZm9SZWZlcmVuY2VzKSB7XHJcbiAgICAgICAgICAgICAgICBtYXBwQ29ja3BpdENvbXBvbmVudC5tZXRhRGF0YSA9IHRoaXMucmVhZE1ldGFEYXRhKG1ldGFJbmZvUmVmZXJlbmNlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZS5tZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1hcHBDb2NrcGl0Q29tcG9uZW50Lm1ldGFEYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQnJvd3NlcyBhdmFpbGFibGUgY29tcG9uZW50IHBhcmFtZXRlcnNcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBhc3luYyBicm93c2VQYXJhbWV0ZXJzKG1hcHBDb2NrcGl0Q29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudCk6IFByb21pc2U8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXT4ge1xyXG4gICAgICAgIC8vIFVwZGF0ZSBjb21wb25lbnRzIGluIG1vZGVsXHJcbiAgICAgICAgbWFwcENvY2twaXRDb21wb25lbnQucGFyYW1ldGVycyA9IGF3YWl0IHRoaXMuX21hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyLmJyb3dzZVBhcmFtZXRlcnMobWFwcENvY2twaXRDb21wb25lbnQpO1xyXG5cclxuICAgICAgICAvLyByZXRyaWV2ZSBhbmQgdXBkYXRlIHVzZXIgcGFyYW1ldGVyc1xyXG4gICAgICAgIGF3YWl0IHRoaXMucmV0cmlldmVVc2VyUGFyYW1ldGVycyhtYXBwQ29ja3BpdENvbXBvbmVudCk7XHJcbiAgICAgICBcclxuICAgICAgICByZXR1cm4gbWFwcENvY2twaXRDb21wb25lbnQucGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJyb3dzZXMgYW5kIHVwZGF0ZXMgdGhlIG1ldGhvZHMgaW5wdXQgcGFyYW1ldGVyc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2R9IG1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcltdPn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBhc3luYyBicm93c2VNZXRob2RJbnB1dFBhcmFtZXRlcnMobWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kKTogUHJvbWlzZTxNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcltdPiB7XHJcblxyXG4gICAgICAgIC8vIGJyb3dzZSBhbmQgdXBkYXRlIHRoZSBtZXRob2RzIHBhcmFtZXRlcnNcclxuICAgICAgICBhd2FpdCB0aGlzLl9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlci5icm93c2VNZXRob2RQYXJhbWV0ZXJzKFttYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZF0pO1xyXG5cclxuICAgICAgICAvLyB1cGRhdGUgdGhlIHBhcmFtZXRlciBkYXRhIHR5cGVzXHJcbiAgICAgICAgYXdhaXQgdGhpcy5fbWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIudXBkYXRlTWV0aG9kUGFyYW1ldGVyRGF0YVR5cGVzKFttYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZF0pOyAgXHJcbiAgICAgICBcclxuICAgICAgICByZXR1cm4gbWFwcENvY2twaXRDb21wb25lbnRNZXRob2QuaW5wdXRQYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0cmlldmVzIHRoZSBjb21wb25lbnQgcGFyYW1ldGVycyByZWxldmFudCBmb3IgdGhlIHVzZXIuIFRoZXkgYXJlIHNwZWNpZmllZCBieSBtZXRhIGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudH0gbWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIHJldHJpZXZlVXNlclBhcmFtZXRlcnMobWFwcENvY2twaXRDb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50KSB7XHJcbiAgICAgICAgbGV0IHdhdGNoYWJsZU1ldGFDb25maWcgPSBbJ01ldGFDb25maWdXYXRjaGFibGVzJywgJ1dhdGNoYWJsZXNTdHJ1Y3R1cmUnLCAnV2F0Y2hhYmxlJ107XHJcbiAgICAgICAgbGV0IHdhdGNoYWJsZVN0YXRlTWV0YUNvbmZpZyA9IFsnTWV0YUNvbmZpZ1dhdGNoYWJsZXNTdGF0ZXMnLCAnV2F0Y2hhYmxlc1N0YXRlc1N0cnVjdHVyZScsICdXYXRjaGFibGVTdGF0ZSddO1xyXG5cclxuICAgICAgICBtYXBwQ29ja3BpdENvbXBvbmVudC5tZXNzYWdlUGFyYW1ldGVycyA9IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mby5yZXRyaWV2ZU1lc3NhZ2VQYXJhbWV0ZXJzKG1hcHBDb2NrcGl0Q29tcG9uZW50LnBhcmFtZXRlcnMpO1xyXG4gICAgICAgIGlmIChtYXBwQ29ja3BpdENvbXBvbmVudC5tZXRhRGF0YSkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICBpZiAoIG1hcHBDb2NrcGl0Q29tcG9uZW50Lm1ldGFEYXRhLmhhc093blByb3BlcnR5KFwiUGFyYW1ldGVyc1wiKSAmJiBtYXBwQ29ja3BpdENvbXBvbmVudC5tZXRhRGF0YVtcIlBhcmFtZXRlcnNcIl0uaGFzT3duUHJvcGVydHkoXCJXYXRjaGFibGVcIikpIHtcclxuICAgICAgICAgICAgICAgIG1hcHBDb2NrcGl0Q29tcG9uZW50LndhdGNoYWJsZVBhcmFtZXRlcnMgPSBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8ucmV0cmlldmVXYXRjaGFibGVQYXJhbWV0ZXJzKG1hcHBDb2NrcGl0Q29tcG9uZW50LnBhcmFtZXRlcnMsIHdhdGNoYWJsZU1ldGFDb25maWcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hcHBDb2NrcGl0Q29tcG9uZW50LndhdGNoYWJsZVBhcmFtZXRlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX21hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyLnVwZGF0ZVBhcmFtZXRlckRhdGFUeXBlcyhtYXBwQ29ja3BpdENvbXBvbmVudC53YXRjaGFibGVQYXJhbWV0ZXJzKTsgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLnVwZGF0ZVBhcmFtZXRlcihtYXBwQ29ja3BpdENvbXBvbmVudC53YXRjaGFibGVQYXJhbWV0ZXJzLCBtYXBwQ29ja3BpdENvbXBvbmVudC5tZXRhRGF0YVtcIlBhcmFtZXRlcnNcIl1bXCJXYXRjaGFibGVcIl0pOyAgICAgXHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgIFxyXG4gICBcclxuICAgICAgICAgICAgaWYgKCBtYXBwQ29ja3BpdENvbXBvbmVudC5tZXRhRGF0YS5oYXNPd25Qcm9wZXJ0eShcIlBhcmFtZXRlcnNcIikgJiYgbWFwcENvY2twaXRDb21wb25lbnQubWV0YURhdGFbXCJQYXJhbWV0ZXJzXCJdLmhhc093blByb3BlcnR5KFwiQ29uZmlndXJhdGlvblwiKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIG1hcHBDb2NrcGl0Q29tcG9uZW50LmNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzID0gTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLnJldHJpZXZlQ29uZmlndXJhdGlvblBhcmFtZXRlcnMobWFwcENvY2twaXRDb21wb25lbnQucGFyYW1ldGVycyk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWFwcENvY2twaXRDb21wb25lbnQuY29uZmlndXJhdGlvblBhcmFtZXRlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX21hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyLnVwZGF0ZVBhcmFtZXRlckRhdGFUeXBlcyhtYXBwQ29ja3BpdENvbXBvbmVudC5jb25maWd1cmF0aW9uUGFyYW1ldGVycyk7ICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLnVwZGF0ZVBhcmFtZXRlcihtYXBwQ29ja3BpdENvbXBvbmVudC5jb25maWd1cmF0aW9uUGFyYW1ldGVycywgbWFwcENvY2twaXRDb21wb25lbnQubWV0YURhdGFbXCJQYXJhbWV0ZXJzXCJdW1wiQ29uZmlndXJhdGlvblwiXSk7ICAgICBcclxuICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0gICBcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICggbWFwcENvY2twaXRDb21wb25lbnQubWV0YURhdGEuaGFzT3duUHJvcGVydHkoXCJQYXJhbWV0ZXJzXCIpICYmIG1hcHBDb2NrcGl0Q29tcG9uZW50Lm1ldGFEYXRhW1wiUGFyYW1ldGVyc1wiXS5oYXNPd25Qcm9wZXJ0eShcIldhdGNoYWJsZVN0YXRlXCIpICYmIG1hcHBDb2NrcGl0Q29tcG9uZW50LndhdGNoYWJsZVBhcmFtZXRlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgbWFwcENvY2twaXRDb21wb25lbnQud2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXJzID0gTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLnJldHJpZXZlV2F0Y2hhYmxlU3RhdGVzKG1hcHBDb2NrcGl0Q29tcG9uZW50LndhdGNoYWJsZVBhcmFtZXRlcnMsIHdhdGNoYWJsZVN0YXRlTWV0YUNvbmZpZyk7ICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB3cml0ZXMgdGhlIHZhbHVlIHRvIGNvbXBvbmVudCBwYXJhbWV0ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyfSBwYXJhbWV0ZXJcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBhc3luYyB3cml0ZUNvbXBvbmVudFBhcmFtZXRlcihwYXJhbWV0ZXI6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyKSB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5fbWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIud3JpdGVQYXJhbWV0ZXJWYWx1ZShwYXJhbWV0ZXIsIHBhcmFtZXRlci52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBicm93c2VzIHRoZSBjb21wb25lbnQgbWV0aG9kc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnR9IG1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdPn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBhc3luYyBicm93c2VNZXRob2RzKG1hcHBDb2NrcGl0Q29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudCk6IFByb21pc2U8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXT4ge1xyXG4gICAgICAgIGxldCBtZXRob2RzTWV0YUNvbmZpZyA9IFsnTWV0YUNvbmZpZ0NvbW1hbmRzJywgJ0NvbW1hbmRzU3RydWN0dXJlJywgJ0NvbW1hbmQnXTtcclxuICAgICAgICBsZXQgcXVpY2tDb21tYW5kc01ldGFDb25maWcgPSBbJ01ldGFDb25maWdRdWlja0NvbW1hbmRzJywgJ1F1aWNrQ29tbWFuZHNTdHJ1Y3R1cmUnLCAnUXVpY2tDb21tYW5kJ107XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSBjb21wb25lbnQgbWV0aG9kcyBpbiBtb2RlbFxyXG4gICAgICAgIG1hcHBDb2NrcGl0Q29tcG9uZW50Lm1ldGhvZHMgPSBhd2FpdCB0aGlzLl9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlci5icm93c2VNZXRob2RzKG1hcHBDb2NrcGl0Q29tcG9uZW50KTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBmaWx0ZXIgdGhlIG1ldGhvZHMgdG8gdGhlIG9uZXMgc3BlY2VmaWVkIGJ5IG1ldGEgaW5mb1xyXG4gICAgICAgIG1hcHBDb2NrcGl0Q29tcG9uZW50LnVzZXJNZXRob2RzID0gTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvLnJldHJpZXZlRXhlY3V0YWJsZU1ldGhvZHMobWFwcENvY2twaXRDb21wb25lbnQubWV0aG9kcywgbWV0aG9kc01ldGFDb25maWcpO1xyXG4gICAgICAgIG1hcHBDb2NrcGl0Q29tcG9uZW50LnF1aWNrQ29tbWFuZHMgPSBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8ucmV0cmlldmVRdWlja0NvbW1hbmRzKG1hcHBDb2NrcGl0Q29tcG9uZW50Lm1ldGhvZHMsIHF1aWNrQ29tbWFuZHNNZXRhQ29uZmlnKTtcclxuICAgICAgICByZXR1cm4gbWFwcENvY2twaXRDb21wb25lbnQubWV0aG9kcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJyb3dzZXMgZm9yIHRoZSBzZXJ2aWNlIGNoYW5uZWwgYW5kIGNvbm5lY3RzIGl0IGlmIGF2YWlsYWJsZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnR9IG1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGJyb3dzZVNlcnZpY2VDaGFubmVsKG1hcHBDb2NrcGl0Q29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudCk6IFByb21pc2U8TWFwcENvY2twaXRDb21wb25lbnRTZXJ2aWNlfG51bGw+IHtcclxuXHJcbiAgICAgICAgLy8gYnJvd3NlIHRoZSBzZXJ2aWNlIGNoYW5uZWxcclxuICAgICAgICBtYXBwQ29ja3BpdENvbXBvbmVudC5zZXJ2aWNlQ2hhbm5lbCA9IGF3YWl0IHRoaXMuX21hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyLmJyb3dzZVNlcnZpY2VDaGFubmVsKG1hcHBDb2NrcGl0Q29tcG9uZW50KTtcclxuXHJcbiAgICAgICAgLy8gaW5pdGlhbGl6ZSBzZXJ2aWNlIGNoYW5uZWwgIGlmIGF2YWlsYWJsZS5cclxuICAgICAgICBpZiAobWFwcENvY2twaXRDb21wb25lbnQuc2VydmljZUNoYW5uZWwpIHtcclxuICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSByZXF1ZXN0IG1ldGhvZHMgaW5wdXQgcGFyYW1ldGVyc1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmJyb3dzZU1ldGhvZElucHV0UGFyYW1ldGVycyhtYXBwQ29ja3BpdENvbXBvbmVudC5zZXJ2aWNlQ2hhbm5lbD8ucmVxdWVzdCEpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1hcHBDb2NrcGl0Q29tcG9uZW50LnNlcnZpY2VDaGFubmVsKSB7XHJcbiAgICAgICAgICAgICAgICBtYXBwQ29ja3BpdENvbXBvbmVudC5zZXJ2aWNlQ2hhbm5lbC5pbml0aWFsaXplKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWFwcENvY2twaXRDb21wb25lbnQuc2VydmljZUNoYW5uZWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMgdGhlIG1ldGhvZHMgcmVsZXZhbnQgZm9yIHRoZSB1c2VyLiBUaGV5IGFyZSBzcGVjaWZpZWQgYnkgbWV0YSBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnR9IG1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKiBAcGFyYW0geyp9IGNvbXBvbmVudE1ldGhvZHNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJldHJpZXZlVXNlck1ldGhvZHMobWFwcENvY2twaXRDb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50LCBjb21wb25lbnRNZXRob2RzOiBhbnkpOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdIHtcclxuICAgICAgICBsZXQgdXNlck1ldGhvZHM6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW10gPSBbXTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAobWFwcENvY2twaXRDb21wb25lbnQubWV0YURhdGEgJiYgIG1hcHBDb2NrcGl0Q29tcG9uZW50Lm1ldGFEYXRhLmhhc093blByb3BlcnR5KFwiTWV0aG9kc1wiKSAmJiBtYXBwQ29ja3BpdENvbXBvbmVudC5tZXRhRGF0YVtcIk1ldGhvZHNcIl0uaGFzT3duUHJvcGVydHkoXCJFeGVjdXRhYmxlXCIpKSB7XHJcbiAgICAgICAgICAgIGxldCBtZXRob2RzTWV0YSA9IG1hcHBDb2NrcGl0Q29tcG9uZW50Lm1ldGFEYXRhW1wiTWV0aG9kc1wiXVtcIkV4ZWN1dGFibGVcIl07XHJcbiAgICAgICAgICAgIHVzZXJNZXRob2RzID0gY29tcG9uZW50TWV0aG9kcy5maWx0ZXIoKG1ldGhvZCkgPT4geyByZXR1cm4gbWV0aG9kc01ldGFbbWV0aG9kLmJyb3dzZU5hbWVdOyB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVzZXJNZXRob2RzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVhZHMgdGhlIG1ldGEgaW5mb3MgaW50byBhIHNpbmdsZSBvYmplY3RcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBtZXRhUGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlYWRNZXRhRGF0YShtZXRhUGFyYW1ldGVyczogQXJyYXk8c3RyaW5nPikge1xyXG4gICAgICAgIGxldCBtZXRhRGF0YSA9IHt9O1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBtZXRhUGFyYW1ldGVycy5mb3JFYWNoKChtZXRhUGFyYW1ldGVyOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKG1ldGFQYXJhbWV0ZXIudmFsdWUgPT0gXCJcIil7IC8vIEZhbGxiYWNrOiBVc2UgZW1wdHkgb2JqZWN0IGluIGNhc2Ugb2YgZW1wdHkgbWV0YUluZm9cclxuICAgICAgICAgICAgICAgICAgICBtZXRhUGFyYW1ldGVyLnZhbHVlID0gXCJ7fVwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvL0p1c3QgZm9yIHByb3RvdHlwZTogRW5hYmxlL0Rpc2FibGUgb2YgbWV0aG9kc1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgKG1ldGFQYXJhbWV0ZXIubm9kZUlkID09IFwibnM9NTtzPWdBeGlzMS5NZXRhQ29uZmlnQ29tbWFuZHNcIikge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIG1ldGFQYXJhbWV0ZXIudmFsdWUgPSAne1wiQ29tbWFuZHNTdHJ1Y3R1cmVcIjp7XCJTY29wZVwiOlwibWFwcC9Nb3Rpb24vQXhpcy9BY3BBeGlzXCIsXCJDaGlsZHNcIjpbe1wiR3JvdXBcIjp7XCJEaXNwbGF5TmFtZVwiOlwiUHJlcGFyYXRpb25cIixcIkNoaWxkc1wiOlt7XCJDb21tYW5kXCI6e1wiRGlzcGxheU5hbWVcIjpcIlBvd2VyIG9uXCIsXCJSZWZcIjpcIlBvd2VyIE9uXCIsXCJXYXRjaGFibGVWYXJpYWJsZXNNYXBwaW5nXCI6W1tcIklzIFBvd2VyZWRcIixcIklzX1Bvd2VyZWRcIl1dLFwiRW5hYmxlU3RhdGVFeHByZXNzaW9uXCI6XCJJc19Qb3dlcmVkID09IGZhbHNlID8gdHJ1ZSA6IGZhbHNlXCJ9fSx7XCJDb21tYW5kXCI6e1wiRGlzcGxheU5hbWVcIjpcIlBvd2VyIG9mZlwiLFwiUmVmXCI6XCJQb3dlciBPZmZcIixcIldhdGNoYWJsZVZhcmlhYmxlc01hcHBpbmdcIjpbW1wiSXMgUG93ZXJlZFwiLFwiSXNfUG93ZXJlZFwiXV0sXCJFbmFibGVTdGF0ZUV4cHJlc3Npb25cIjpcIklzX1Bvd2VyZWQgPT0gdHJ1ZSA/IHRydWUgOiBmYWxzZVwifX0se1wiQ29tbWFuZFwiOntcIkRpc3BsYXlOYW1lXCI6XCJJbml0IGhvbWVcIixcIlJlZlwiOlwiSW5pdCBIb21lXCIsXCJQYXJhbWV0ZXJzXCI6W3tcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJIb21pbmcgbW9kZVwiLFwiUmVmXCI6XCJIb21pbmcgTW9kZVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCIsXCJUeXBlRGVmXCI6e1wiRW51bVR5cGVSZWZcIjpcIkFjcEF4OjpJbml0SG9tZVJlZHVjZWRcIn19fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiUG9zaXRpb25cIixcIlJlZlwiOlwiUG9zaXRpb25cIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwibW1cIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJTdGFydCB2ZWxvY2l0eVwiLFwiUmVmXCI6XCJTdGFydCBWZWxvY2l0eVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJtbS9zXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiSG9taW5nIHZlbG9jaXR5XCIsXCJSZWZcIjpcIkhvbWluZyBWZWxvY2l0eVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJtbS9zXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiQWNjZWxlcmF0aW9uXCIsXCJSZWZcIjpcIkFjY2VsZXJhdGlvblwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJtbS9zwrJcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJTd2l0Y2ggZWRnZVwiLFwiUmVmXCI6XCJTd2l0Y2hFZGdlXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIixcIlR5cGVEZWZcIjp7XCJFbnVtVHlwZVJlZlwiOlwiQXhpczo6SW5pdEhvbWVEaXJlY3Rpb25cIn19fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiU3RhcnQgZGlyZWN0aW9uXCIsXCJSZWZcIjpcIlN0YXJ0IERpcmVjdGlvblwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCIsXCJUeXBlRGVmXCI6e1wiRW51bVR5cGVSZWZcIjpcIkF4aXM6OkluaXRIb21lRGlyZWN0aW9uXCJ9fX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkhvbWluZyBkaXJlY3Rpb25cIixcIlJlZlwiOlwiSG9taW5nIERpcmVjdGlvblwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCIsXCJUeXBlRGVmXCI6e1wiRW51bVR5cGVSZWZcIjpcIkF4aXM6OkluaXRIb21lRGlyZWN0aW9uXCJ9fX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlJlZmVyZW5jZSBwdWxzZVwiLFwiUmVmXCI6XCJSZWZlcmVuY2UgUHVsc2VcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwiLFwiVHlwZURlZlwiOntcIkVudW1UeXBlUmVmXCI6XCJBeGlzOjpTd2l0Y2hcIn19fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiS2VlcCBkaXJlY3Rpb25cIixcIlJlZlwiOlwiS2VlcCBEaXJlY3Rpb25cIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwiLFwiVHlwZURlZlwiOntcIkVudW1UeXBlUmVmXCI6XCJBeGlzOjpTd2l0Y2hcIn19fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiUmVmZXJlbmNlIHB1bHNlIGJsb2NraW5nIGRpc3RhbmNlXCIsXCJSZWZcIjpcIlJlZmVyZW5jZSBQdWxzZSBCbG9ja2luZyBEaXN0YW5jZVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJtbVwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlRvcnF1ZSBsaW1pdFwiLFwiUmVmXCI6XCJUb3JxdWUgTGltaXRcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwiTsK3bVwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkJsb2NrIGRldGVjdGlvbiBwb3NpdGlvbiBlcnJvclwiLFwiUmVmXCI6XCJCbG9jayBEZXRlY3Rpb24gUG9zaXRpb24gRXJyb3JcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwibW1cIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJQb3NpdGlvbiBlcnJvciBzdG9wIGxpbWl0XCIsXCJSZWZcIjpcIlBvc2l0aW9uIEVycm9yIFN0b3AgTGltaXRcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwibW1cIn19XX19LHtcIkNvbW1hbmRcIjp7XCJEaXNwbGF5TmFtZVwiOlwiSG9tZVwiLFwiUmVmXCI6XCJIb21lXCIsXCJQYXJhbWV0ZXJzXCI6W3tcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJQb3NpdGlvblwiLFwiUmVmXCI6XCJQb3NpdGlvblwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJtbVwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkhvbWluZyBtb2RlXCIsXCJSZWZcIjpcIkhvbWluZyBNb2RlXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjE0MFwiLFwiVHlwZURlZlwiOntcIkVudW1UeXBlUmVmXCI6XCJBY3BBeDo6SG9taW5nUmVkdWNlZFwifX19XX19XX19LHtcIkdyb3VwXCI6e1wiRGlzcGxheU5hbWVcIjpcIkFkbWluaXN0cmF0aW9uXCIsXCJDaGlsZHNcIjpbe1wiQ29tbWFuZFwiOntcIkRpc3BsYXlOYW1lXCI6XCJSZXNldFwiLFwiUmVmXCI6XCJSZXNldFwifX0se1wiQ29tbWFuZFwiOntcIkRpc3BsYXlOYW1lXCI6XCJTZXQgb3ZlcnJpZGVcIixcIlJlZlwiOlwiU2V0IE92ZXJyaWRlXCIsXCJQYXJhbWV0ZXJzXCI6W3tcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJWZWxvY2l0eSBmYWN0b3JcIixcIlJlZlwiOlwiVmVsb2NpdHkgRmFjdG9yXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjEuMFwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkFjY2VsZXJhdGlvbiBmYWN0b3JcIixcIlJlZlwiOlwiQWNjZWxlcmF0aW9uIEZhY3RvclwiLFwiRGVmYXVsdFZhbHVlXCI6XCIxLjBcIn19XX19LHtcIkNvbW1hbmRcIjp7XCJEaXNwbGF5TmFtZVwiOlwiQ29tbWFuZCBlcnJvclwiLFwiUmVmXCI6XCJDb21tYW5kRXJyb3JcIixcIlBhcmFtZXRlcnNcIjpbe1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkNvbW1hbmRcIixcIlJlZlwiOlwiQ29tbWFuZFwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCIsXCJUeXBlRGVmXCI6e1wiRW51bVR5cGVSZWZcIjpcIkF4aXM6OkNvbW1hbmRFcnJvcnNcIn19fV19fSx7XCJDb21tYW5kXCI6e1wiRGlzcGxheU5hbWVcIjpcIlJlYWQgUGFySURcIixcIlJlZlwiOlwiUmVhZCBQYXJJZFwiLFwiUGFyYW1ldGVyc1wiOlt7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiUGFySURcIixcIlJlZlwiOlwiUGFySWRcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwifX1dfX0se1wiQ29tbWFuZFwiOntcIkRpc3BsYXlOYW1lXCI6XCJXcml0ZSBQYXJJRFwiLFwiUmVmXCI6XCJXcml0ZSBQYXJJZFwiLFwiUGFyYW1ldGVyc1wiOlt7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiUGFySURcIixcIlJlZlwiOlwiUGFySWRcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlZhbHVlXCIsXCJSZWZcIjpcIlZhbHVlXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIn19XX19XX19LHtcIkdyb3VwXCI6e1wiRGlzcGxheU5hbWVcIjpcIk1vdmVtZW50XCIsXCJDaGlsZHNcIjpbe1wiQ29tbWFuZFwiOntcIkRpc3BsYXlOYW1lXCI6XCJNb3ZlIGFic29sdXRlXCIsXCJSZWZcIjpcIk1vdmUgQWJzb2x1dGVcIixcIlBhcmFtZXRlcnNcIjpbe1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlBvc2l0aW9uXCIsXCJSZWZcIjpcIlBvc2l0aW9uXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIm1tXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiVmVsb2NpdHlcIixcIlJlZlwiOlwiVmVsb2NpdHlcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMlwiLFwiRVVcIjpcIm1tL3NcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJBY2NlbGVyYXRpb25cIixcIlJlZlwiOlwiQWNjZWxlcmF0aW9uXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjEwXCIsXCJFVVwiOlwibW0vc8KyXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiRGVjZWxlcmF0aW9uXCIsXCJSZWZcIjpcIkRlY2VsZXJhdGlvblwiLFwiRGVmYXVsdFZhbHVlXCI6XCIxMFwiLFwiRVVcIjpcIm1tL3PCslwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkRpcmVjdGlvblwiLFwiUmVmXCI6XCJEaXJlY3Rpb25cIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwiLFwiVHlwZURlZlwiOntcIkVudW1UeXBlUmVmXCI6XCJBeGlzOjpNb3ZlQWJzRGlyZWN0aW9uXCJ9fX1dfX0se1wiQ29tbWFuZFwiOntcIkRpc3BsYXlOYW1lXCI6XCJNb3ZlIGFkZGl0aXZlXCIsXCJSZWZcIjpcIk1vdmUgQWRkaXRpdmVcIixcIlBhcmFtZXRlcnNcIjpbe1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkRpc3RhbmNlXCIsXCJSZWZcIjpcIkRpc3RhbmNlXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIm1tXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiVmVsb2NpdHlcIixcIlJlZlwiOlwiVmVsb2NpdHlcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMlwiLFwiRVVcIjpcIm1tL3NcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJBY2NlbGVyYXRpb25cIixcIlJlZlwiOlwiQWNjZWxlcmF0aW9uXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjEwXCIsXCJFVVwiOlwibW0vc8KyXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiRGVjZWxlcmF0aW9uXCIsXCJSZWZcIjpcIkRlY2VsZXJhdGlvblwiLFwiRGVmYXVsdFZhbHVlXCI6XCIxMFwiLFwiRVVcIjpcIm1tL3PCslwifX1dfX0se1wiQ29tbWFuZFwiOntcIkRpc3BsYXlOYW1lXCI6XCJNb3ZlIHZlbG9jaXR5XCIsXCJSZWZcIjpcIk1vdmUgVmVsb2NpdHlcIixcIlBhcmFtZXRlcnNcIjpbe1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlZlbG9jaXR5XCIsXCJSZWZcIjpcIlZlbG9jaXR5XCIsXCJEZWZhdWx0VmFsdWVcIjpcIjJcIixcIkVVXCI6XCJtbS9zXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiQWNjZWxlcmF0aW9uXCIsXCJSZWZcIjpcIkFjY2VsZXJhdGlvblwiLFwiRGVmYXVsdFZhbHVlXCI6XCIxMFwiLFwiRVVcIjpcIm1tL3PCslwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkRlY2VsZXJhdGlvblwiLFwiUmVmXCI6XCJEZWNlbGVyYXRpb25cIixcIkRlZmF1bHRWYWx1ZVwiOlwiMTBcIixcIkVVXCI6XCJtbS9zwrJcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJEaXJlY3Rpb25cIixcIlJlZlwiOlwiRGlyZWN0aW9uXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIixcIlR5cGVEZWZcIjp7XCJFbnVtVHlwZVJlZlwiOlwiQXhpczo6TW92ZVZlbG9EaXJlY3Rpb25cIn19fV19fSx7XCJDb21tYW5kXCI6e1wiRGlzcGxheU5hbWVcIjpcIkdlYXIgaW5cIixcIlJlZlwiOlwiR2VhciBJblwiLFwiUGFyYW1ldGVyc1wiOlt7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTWFzdGVyXCIsXCJSZWZcIjpcIk1hc3RlclwiLFwiRGVmYXVsdFZhbHVlXCI6XCJcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJSYXRpbyBudW1lcmF0b3JcIixcIlJlZlwiOlwiUmF0aW8gTnVtZXJhdG9yXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlJhdGlvIGRlbm9taW5hdG9yXCIsXCJSZWZcIjpcIlJhdGlvIERlbm9taW5hdG9yXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIk1hc3RlciB2YWx1ZSBzb3VyY2VcIixcIlJlZlwiOlwiTWFzdGVyIFZhbHVlIFNvdXJjZVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCIsXCJUeXBlRGVmXCI6e1wiRW51bVR5cGVSZWZcIjpcIkF4aXM6OlZhbHVlU291cmNlXCJ9fX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkFjY2VsZXJhdGlvblwiLFwiUmVmXCI6XCJBY2NlbGVyYXRpb25cIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwibW0vc8KyXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiRGVjZWxlcmF0aW9uXCIsXCJSZWZcIjpcIkRlY2VsZXJhdGlvblwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJtbS9zwrJcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJNYXN0ZXIgbWF4IHZlbG9jaXR5XCIsXCJSZWZcIjpcIk1hc3RlciBNYXggVmVsb2NpdHlcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwibW0vc1wifX1dfX0se1wiQ29tbWFuZFwiOntcIkRpc3BsYXlOYW1lXCI6XCJDYW0gaW5cIixcIlJlZlwiOlwiQ2FtSW5cIixcIlBhcmFtZXRlcnNcIjpbe1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIk1hc3RlclwiLFwiUmVmXCI6XCJNYXN0ZXJcIixcIkRlZmF1bHRWYWx1ZVwiOlwiXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTWFzdGVyIG9mZnNldFwiLFwiUmVmXCI6XCJNYXN0ZXJPZmZzZXRcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwibW0vc1wifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlNsYXZlIG9mZnNldFwiLFwiUmVmXCI6XCJTbGF2ZU9mZnNldFwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJtbS9zXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTWFzdGVyIHNjYWxpbmdcIixcIlJlZlwiOlwiTWFzdGVyU2NhbGluZ1wiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiU2xhdmUgc2NhbGluZ1wiLFwiUmVmXCI6XCJTbGF2ZVNjYWxpbmdcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlN0YXJ0IG1vZGVcIixcIlJlZlwiOlwiU3RhcnRNb2RlXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIixcIlR5cGVEZWZcIjp7XCJFbnVtVHlwZVJlZlwiOlwiQXhpczo6Q2FtU3RhcnRNb2RlXCJ9fX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIk1hc3RlciB2YWx1ZSBzb3VyY2VcIixcIlJlZlwiOlwiTWFzdGVyVmFsdWVTb3VyY2VcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwiLFwiVHlwZURlZlwiOntcIkVudW1UeXBlUmVmXCI6XCJBeGlzOjpWYWx1ZVNvdXJjZUNhbUluXCJ9fX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkNhbSBJRFwiLFwiUmVmXCI6XCJDYW1JRFwiLFwiRGVmYXVsdFZhbHVlXCI6XCI2NTUzNVwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlBlcmlvZGljXCIsXCJSZWZcIjpcIlBlcmlvZGljXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJWZWxvY2l0eVwiLFwiUmVmXCI6XCJWZWxvY2l0eVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJtbS9zXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiQWNjZWxlcmF0aW9uXCIsXCJSZWZcIjpcIkFjY2VsZXJhdGlvblwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJtbS9zwrJcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJEZWNlbGVyYXRpb25cIixcIlJlZlwiOlwiRGVjZWxlcmF0aW9uXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIm1tL3PCslwifX1dfX0se1wiQ29tbWFuZFwiOntcIkRpc3BsYXlOYW1lXCI6XCJUb3JxdWUgY29udHJvbFwiLFwiUmVmXCI6XCJUb3JxdWUgQ29udHJvbFwiLFwiUGFyYW1ldGVyc1wiOlt7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiVG9ycXVlXCIsXCJSZWZcIjpcIlRvcnF1ZVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJOwrdtXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiVG9ycXVlIHJhbXBcIixcIlJlZlwiOlwiVG9ycXVlIFJhbXBcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwiTsK3bS9zXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiVmVsb2NpdHlcIixcIlJlZlwiOlwiVmVsb2NpdHlcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwibW0vc1wifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkFjY2VsZXJhdGlvblwiLFwiUmVmXCI6XCJBY2NlbGVyYXRpb25cIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwibW0vc8KyXCJ9fV19fSx7XCJDb21tYW5kXCI6e1wiRGlzcGxheU5hbWVcIjpcIkJyYWtlIG9wZXJhdGlvblwiLFwiUmVmXCI6XCJCcmFrZSBPcGVyYXRpb25cIixcIlBhcmFtZXRlcnNcIjpbe1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkNvbW1hbmRcIixcIlJlZlwiOlwiQ29tbWFuZFwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCIsXCJUeXBlRGVmXCI6e1wiRW51bVR5cGVSZWZcIjpcIkF4aXM6OkJyYWtlQ29tbWFuZFwifX19XX19LHtcIkNvbW1hbmRcIjp7XCJEaXNwbGF5TmFtZVwiOlwiSGFsdFwiLFwiUmVmXCI6XCJIYWx0XCIsXCJQYXJhbWV0ZXJzXCI6W3tcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJEZWNlbGVyYXRpb25cIixcIlJlZlwiOlwiRGVjZWxlcmF0aW9uXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjEwXCIsXCJFVVwiOlwibW0vc8KyXCJ9fV19fV19fSx7XCJHcm91cFwiOntcIkRpc3BsYXlOYW1lXCI6XCJMb2FkIHNpbXVsYXRpb25cIixcIkNoaWxkc1wiOlt7XCJDb21tYW5kXCI6e1wiRGlzcGxheU5hbWVcIjpcIkxvYWQgc2ltdWxhdGlvbiBjb21tYW5kXCIsXCJSZWZcIjpcIkxvYWQgU2ltdWxhdGlvbiBDb21tYW5kXCIsXCJQYXJhbWV0ZXJzXCI6W3tcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJDb21tYW5kXCIsXCJSZWZcIjpcIkNvbW1hbmRcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwiLFwiVHlwZURlZlwiOntcIkVudW1UeXBlUmVmXCI6XCJBeGlzOjpTaW11bGF0aW9uQ29tbWFuZFwifX19XX19LHtcIkNvbW1hbmRcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTG9hZCBzaW11bGF0aW9uIHNldCBwYXJhbXMgYXV0b1wiLFwiUmVmXCI6XCJMb2FkIFNpbXVsYXRpb24gU2V0IFBhcmFtcyBBdXRvXCIsXCJQYXJhbWV0ZXJzXCI6W3tcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJBZGRpdGl2ZSBsb2FkIFBhcklEXCIsXCJSZWZcIjpcIkFkZGl0aXZlIExvYWQgUGFySWRcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwifX1dfX0se1wiQ29tbWFuZFwiOntcIkRpc3BsYXlOYW1lXCI6XCJMb2FkIHNpbXVsYXRpb24gc2V0IHBhcmFtcyBvbmUgbWFzc1wiLFwiUmVmXCI6XCJMb2FkIFNpbXVsYXRpb24gU2V0IFBhcmFtcyBPbmUgTWFzc1wiLFwiUGFyYW1ldGVyc1wiOlt7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiQWRkaXRpdmUgbG9hZCBQYXJJRFwiLFwiUmVmXCI6XCJBZGRpdGl2ZSBMb2FkIFBhcklkXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJJbmVydGlhXCIsXCJSZWZcIjpcIkluZXJ0aWFcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwia2fCt23CslwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlN0YXRpYyBmcmljdGlvblwiLFwiUmVmXCI6XCJTdGF0aWMgRnJpY3Rpb25cIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwiTsK3bVwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlZpc2NvdXMgZnJpY3Rpb25cIixcIlJlZlwiOlwiVmlzY291cyBGcmljdGlvblwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJOwrdtwrdzXCJ9fV19fSx7XCJDb21tYW5kXCI6e1wiRGlzcGxheU5hbWVcIjpcIkxvYWQgc2ltdWxhdGlvbiBzZXQgcGFyYW1zIHR3byBtYXNzZXNcIixcIlJlZlwiOlwiTG9hZCBTaW11bGF0aW9uIFNldCBQYXJhbXMgVHdvIE1hc3Nlc1wiLFwiUGFyYW1ldGVyc1wiOlt7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiQWRkaXRpdmUgbG9hZCBQYXJJRFwiLFwiUmVmXCI6XCJBZGRpdGl2ZSBMb2FkIFBhcklkXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJJbmVydGlhIE0xXCIsXCJSZWZcIjpcIkluZXJ0aWEgTTFcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwia2fCt23CslwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlN0YXRpYyBmcmljdGlvbiBNMVwiLFwiUmVmXCI6XCJTdGF0aWMgRnJpY3Rpb24gTTFcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwiTsK3bVwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlZpc2NvdXMgZnJpY3Rpb24gTTFcIixcIlJlZlwiOlwiVmlzY291cyBGcmljdGlvbiBNMVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJOwrdtwrdzXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiSW5lcnRpYSBNMlwiLFwiUmVmXCI6XCJJbmVydGlhIE0yXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcImtnwrdtwrJcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJTdGF0aWMgZnJpY3Rpb24gTTJcIixcIlJlZlwiOlwiU3RhdGljIEZyaWN0aW9uIE0yXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIk7Ct21cIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJWaXNjb3VzIGZyaWN0aW9uIE0yXCIsXCJSZWZcIjpcIlZpc2NvdXMgRnJpY3Rpb24gTTJcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwiTsK3bcK3c1wifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlN0aWZmbmVzc1wiLFwiUmVmXCI6XCJTdGlmZm5lc3NcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwiTsK3bS9yYWRcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJEYW1waW5nXCIsXCJSZWZcIjpcIkRhbXBpbmdcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwiTsK3bcK3cy9yYWRcIn19XX19XX19LHtcIkdyb3VwXCI6e1wiRGlzcGxheU5hbWVcIjpcIkF1dG9UdW5lXCIsXCJDaGlsZHNcIjpbe1wiQ29tbWFuZFwiOntcIkRpc3BsYXlOYW1lXCI6XCJBdXRvdHVuZSBwb3NpdGlvbiBjb250cm9sbGVyXCIsXCJSZWZcIjpcIkF1dG8gVHVuZSBQb3NpdGlvbiBDb250cm9sbGVyXCIsXCJQYXJhbWV0ZXJzXCI6W3tcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJPcmllbnRhdGlvblwiLFwiUmVmXCI6XCJPcmllbnRhdGlvblwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCIsXCJUeXBlRGVmXCI6e1wiRW51bVR5cGVSZWZcIjpcIkFjcEF4OjpBdXRvVHVuaW5nT3JpZW50YXRpb25cIn19fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTWF4IGN1cnJlbnQgcGVyY2VudFwiLFwiUmVmXCI6XCJNYXggQ3VycmVudCBQZXJjZW50XCIsXCJEZWZhdWx0VmFsdWVcIjpcIjUwXCIsXCJFVVwiOlwiJVwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIk1heCBkaXN0YW5jZVwiLFwiUmVmXCI6XCJNYXggRGlzdGFuY2VcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwibW1cIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJNYXggcG9zaXRpb24gZXJyb3JcIixcIlJlZlwiOlwiTWF4IFBvc2l0aW9uIEVycm9yXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIm1tXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiT3BlcmF0aW5nIHBvaW50XCIsXCJSZWZcIjpcIk9wZXJhdGluZyBQb2ludFwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCIsXCJUeXBlRGVmXCI6e1wiRW51bVR5cGVSZWZcIjpcIkFjcEF4OjpBdXRvVHVuaW5nT3BlcmF0aW9uUG9pbnRcIn19fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiVmVsb2NpdHlcIixcIlJlZlwiOlwiVmVsb2NpdHlcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwibW0vc1wifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkFjY2VsZXJhdGlvblwiLFwiUmVmXCI6XCJBY2NlbGVyYXRpb25cIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwibW0vc8KyXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTWF4IHByb3BvcnRpb25hbCBnYWluXCIsXCJSZWZcIjpcIk1heCBQcm9wb3J0aW9uYWwgR2FpblwiLFwiRGVmYXVsdFZhbHVlXCI6XCIyMDAwLjBcIixcIkVVXCI6XCJBc1wifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlByb3BvcnRpb25hbCBnYWluIHBlcmNlbnRcIixcIlJlZlwiOlwiUHJvcG9ydGlvbmFsIEdhaW4gUGVyY2VudFwiLFwiRGVmYXVsdFZhbHVlXCI6XCIxMDAuMFwiLFwiRVVcIjpcIiVcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJTaWduYWwgdHlwZVwiLFwiUmVmXCI6XCJTaWduYWwgVHlwZVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCIsXCJUeXBlRGVmXCI6e1wiRW51bVR5cGVSZWZcIjpcIkFjcEF4OjpBdXRvVHVuaW5nRXhjaXRhdGlvblNpZ25hbFwifX19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJTaWduYWwgb3JkZXJcIixcIlJlZlwiOlwiU2lnbmFsIE9yZGVyXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjlcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJEZWxheSB0aW1lXCIsXCJSZWZcIjpcIkRlbGF5IFRpbWVcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwic1wifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlNpZ25hbCBzdGFydCBmcmVxdWVuY3lcIixcIlJlZlwiOlwiU2lnbmFsIFN0YXJ0IEZyZXF1ZW5jeVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJIelwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlNpZ25hbCBzdG9wIGZyZXF1ZW5jeVwiLFwiUmVmXCI6XCJTaWduYWwgU3RvcCBGcmVxdWVuY3lcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwiSHpcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJTaWduYWwgdGltZVwiLFwiUmVmXCI6XCJTaWduYWwgVGltZVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJzXCJ9fV19fSx7XCJDb21tYW5kXCI6e1wiRGlzcGxheU5hbWVcIjpcIkF1dG90dW5lIHNwZWVkIGNvbnRyb2xsZXJcIixcIlJlZlwiOlwiQXV0byBUdW5lIFNwZWVkIENvbnRyb2xsZXJcIixcIlBhcmFtZXRlcnNcIjpbe1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIk9yaWVudGF0aW9uXCIsXCJSZWZcIjpcIk9yaWVudGF0aW9uXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIixcIlR5cGVEZWZcIjp7XCJFbnVtVHlwZVJlZlwiOlwiQWNwQXg6OkF1dG9UdW5pbmdPcmllbnRhdGlvblwifX19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJNYXggY3VycmVudCBwZXJjZW50XCIsXCJSZWZcIjpcIk1heCBDdXJyZW50IFBlcmNlbnRcIixcIkRlZmF1bHRWYWx1ZVwiOlwiNTBcIixcIkVVXCI6XCIlXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTWF4IGRpc3RhbmNlXCIsXCJSZWZcIjpcIk1heCBEaXN0YW5jZVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJtbVwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIk1heCBwb3NpdGlvbiBlcnJvclwiLFwiUmVmXCI6XCJNYXggUG9zaXRpb24gRXJyb3JcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwibW1cIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJMb29wIGZpbHRlcjEgbW9kZVwiLFwiUmVmXCI6XCJMb29wIEZpbHRlcjEgTW9kZVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCIsXCJUeXBlRGVmXCI6e1wiRW51bVR5cGVSZWZcIjpcIkFjcEF4OjpBdXRvVHVuaW5nTG9vcEZpbHRlck1vZGVcIn19fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiRmlsdGVyIHRpbWUgbW9kZVwiLFwiUmVmXCI6XCJGaWx0ZXIgVGltZSBNb2RlXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIixcIlR5cGVEZWZcIjp7XCJFbnVtVHlwZVJlZlwiOlwiQWNwQXg6OkF1dG9UdW5pbmdGaWx0ZXJUaW1lTW9kZVwifX19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJJbnRlZ3JhdGlvbiB0aW1lIG1vZGVcIixcIlJlZlwiOlwiSW50ZWdyYXRpb24gVGltZSBNb2RlXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIixcIlR5cGVEZWZcIjp7XCJFbnVtVHlwZVJlZlwiOlwiQWNwQXg6OkF1dG9UdW5pbmdJbnRlZ3JhdGlvblRpbWVNb2RlXCJ9fX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIk9wZXJhdGluZyBwb2ludFwiLFwiUmVmXCI6XCJPcGVyYXRpbmcgUG9pbnRcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwiLFwiVHlwZURlZlwiOntcIkVudW1UeXBlUmVmXCI6XCJBY3BBeDo6QXV0b1R1bmluZ09wZXJhdGlvblBvaW50XCJ9fX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlZlbG9jaXR5XCIsXCJSZWZcIjpcIlZlbG9jaXR5XCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIm1tL3NcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJBY2NlbGVyYXRpb25cIixcIlJlZlwiOlwiQWNjZWxlcmF0aW9uXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIm1tL3PCslwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIk1heCBwcm9wb3J0aW9uYWwgZ2FpblwiLFwiUmVmXCI6XCJNYXggUHJvcG9ydGlvbmFsIEdhaW5cIixcIkRlZmF1bHRWYWx1ZVwiOlwiMjAwMC4wXCIsXCJFVVwiOlwiQXNcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJQcm9wb3J0aW9uYWwgZ2FpbiBwZXJjZW50XCIsXCJSZWZcIjpcIlByb3BvcnRpb25hbCBHYWluIFBlcmNlbnRcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMTAwLjBcIixcIkVVXCI6XCIlXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiUmVzb25hbmNlIGZhY3RvclwiLFwiUmVmXCI6XCJSZXNvbmFuY2UgRmFjdG9yXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjIuMFwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkluZXJ0aWEgZXN0aW1hdGlvbiBsb3dlciBmcmVxdWVuY3lcIixcIlJlZlwiOlwiSW5lcnRpYSBFc3RpbWF0aW9uIExvd2VyIEZyZXF1ZW5jeVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIxMC4wXCIsXCJFVVwiOlwiSHpcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJJbmVydGlhIGVzdGltYXRpb24gdXBwZXIgZnJlcXVlbmN5XCIsXCJSZWZcIjpcIkluZXJ0aWEgRXN0aW1hdGlvbiBVcHBlciBGcmVxdWVuY3lcIixcIkRlZmF1bHRWYWx1ZVwiOlwiNDAuMFwiLFwiRVVcIjpcIkh6XCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiU2lnbmFsIHR5cGVcIixcIlJlZlwiOlwiU2lnbmFsIFR5cGVcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwiLFwiVHlwZURlZlwiOntcIkVudW1UeXBlUmVmXCI6XCJBY3BBeDo6QXV0b1R1bmluZ0V4Y2l0YXRpb25TaWduYWxcIn19fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiU2lnbmFsIG9yZGVyXCIsXCJSZWZcIjpcIlNpZ25hbCBPcmRlclwiLFwiRGVmYXVsdFZhbHVlXCI6XCI5XCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiRGVsYXkgdGltZVwiLFwiUmVmXCI6XCJEZWxheSBUaW1lXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcInNcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJTaWduYWwgc3RhcnQgZnJlcXVlbmN5XCIsXCJSZWZcIjpcIlNpZ25hbCBTdGFydCBGcmVxdWVuY3lcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwiSHpcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJTaWduYWwgc3RvcCBmcmVxdWVuY3lcIixcIlJlZlwiOlwiU2lnbmFsIFN0b3AgRnJlcXVlbmN5XCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIkh6XCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiU2lnbmFsIHRpbWVcIixcIlJlZlwiOlwiU2lnbmFsIFRpbWVcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwic1wifX1dfX0se1wiQ29tbWFuZFwiOntcIkRpc3BsYXlOYW1lXCI6XCJBdXRvdHVuZSBmZWVkIGZvcndhcmRcIixcIlJlZlwiOlwiQXV0byBUdW5lIEZlZWQgRm9yd2FyZFwiLFwiUGFyYW1ldGVyc1wiOlt7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiRGlyZWN0aW9uXCIsXCJSZWZcIjpcIkRpcmVjdGlvblwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCIsXCJUeXBlRGVmXCI6e1wiRW51bVR5cGVSZWZcIjpcIkF4aXM6OkRpcmVjdGlvblwifX19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJPcmllbnRhdGlvblwiLFwiUmVmXCI6XCJPcmllbnRhdGlvblwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCIsXCJUeXBlRGVmXCI6e1wiRW51bVR5cGVSZWZcIjpcIkFjcEF4OjpBdXRvVHVuaW5nT3JpZW50YXRpb25cIn19fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTWF4IGRpc3RhbmNlXCIsXCJSZWZcIjpcIk1heCBEaXN0YW5jZVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJtbVwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIk1heCBwb3NpdGlvbiBlcnJvclwiLFwiUmVmXCI6XCJNYXggUG9zaXRpb24gRXJyb3JcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwibW1cIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJWZWxvY2l0eVwiLFwiUmVmXCI6XCJWZWxvY2l0eVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJtbS9zXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiQWNjZWxlcmF0aW9uXCIsXCJSZWZcIjpcIkFjY2VsZXJhdGlvblwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJtbS9zwrJcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJNYXggY3VycmVudCBwZXJjZW50YWdlXCIsXCJSZWZcIjpcIk1heCBDdXJyZW50IFBlcmNlbnRhZ2VcIixcIkRlZmF1bHRWYWx1ZVwiOlwiNTBcIixcIkVVXCI6XCIlXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTWF4IHZlbG9jaXR5IHBlcmNlbnRhZ2VcIixcIlJlZlwiOlwiTWF4IFZlbG9jaXR5IFBlcmNlbnRhZ2VcIixcIkRlZmF1bHRWYWx1ZVwiOlwiNTBcIixcIkVVXCI6XCIlXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiU2lnbmFsIHR5cGVcIixcIlJlZlwiOlwiU2lnbmFsIFR5cGVcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwiLFwiVHlwZURlZlwiOntcIkVudW1UeXBlUmVmXCI6XCJBY3BBeDo6QXV0b1R1bmluZ0V4Y2l0YXRpb25TaWduYWxcIn19fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiU2lnbmFsIG9yZGVyXCIsXCJSZWZcIjpcIlNpZ25hbCBPcmRlclwiLFwiRGVmYXVsdFZhbHVlXCI6XCI5XCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiRGVsYXkgdGltZVwiLFwiUmVmXCI6XCJEZWxheSBUaW1lXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcInNcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJTaWduYWwgc3RhcnQgZnJlcXVlbmN5XCIsXCJSZWZcIjpcIlNpZ25hbCBTdGFydCBGcmVxdWVuY3lcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwiSHpcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJTaWduYWwgc3RvcCBmcmVxdWVuY3lcIixcIlJlZlwiOlwiU2lnbmFsIFN0b3AgRnJlcXVlbmN5XCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIkh6XCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiU2lnbmFsIHRpbWVcIixcIlJlZlwiOlwiU2lnbmFsIFRpbWVcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwic1wifX1dfX0se1wiQ29tbWFuZFwiOntcIkRpc3BsYXlOYW1lXCI6XCJBdXRvdHVuZSBsb29wIGZpbHRlcnNcIixcIlJlZlwiOlwiQXV0byBUdW5lIExvb3AgRmlsdGVyc1wiLFwiUGFyYW1ldGVyc1wiOlt7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTG9vcCBmaWx0ZXIgMSBtb2RlXCIsXCJSZWZcIjpcIkxvb3AgRmlsdGVyMSBNb2RlXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjFcIixcIlR5cGVEZWZcIjp7XCJFbnVtVHlwZVJlZlwiOlwiQWNwQXg6OkF1dG9UdW5pbmdMb29wRmlsdGVyTW9kZVwifX19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJMb29wIGZpbHRlciAyIG1vZGVcIixcIlJlZlwiOlwiTG9vcCBGaWx0ZXIyIE1vZGVcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwiLFwiVHlwZURlZlwiOntcIkVudW1UeXBlUmVmXCI6XCJBY3BBeDo6QXV0b1R1bmluZ0xvb3BGaWx0ZXJNb2RlXCJ9fX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkxvb3AgZmlsdGVyIDMgbW9kZVwiLFwiUmVmXCI6XCJMb29wIEZpbHRlcjMgTW9kZVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCIsXCJUeXBlRGVmXCI6e1wiRW51bVR5cGVSZWZcIjpcIkFjcEF4OjpBdXRvVHVuaW5nTG9vcEZpbHRlck1vZGVcIn19fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiT3JpZW50YXRpb25cIixcIlJlZlwiOlwiT3JpZW50YXRpb25cIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwiLFwiVHlwZURlZlwiOntcIkVudW1UeXBlUmVmXCI6XCJBY3BBeDo6QXV0b1R1bmluZ09yaWVudGF0aW9uXCJ9fX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIk1heCBjdXJyZW50IHBlcmNlbnRcIixcIlJlZlwiOlwiTWF4IEN1cnJlbnQgUGVyY2VudFwiLFwiRGVmYXVsdFZhbHVlXCI6XCI1MFwiLFwiRVVcIjpcIiVcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJNYXggZGlzdGFuY2VcIixcIlJlZlwiOlwiTWF4IERpc3RhbmNlXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIm1tXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTWF4IHBvc2l0aW9uIGVycm9yXCIsXCJSZWZcIjpcIk1heCBQb3NpdGlvbiBFcnJvclwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJtbVwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIk9wZXJhdGluZyBwb2ludFwiLFwiUmVmXCI6XCJPcGVyYXRpbmcgUG9pbnRcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwiLFwiVHlwZURlZlwiOntcIkVudW1UeXBlUmVmXCI6XCJBY3BBeDo6QXV0b1R1bmluZ09wZXJhdGlvblBvaW50XCJ9fX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlZlbG9jaXR5XCIsXCJSZWZcIjpcIlZlbG9jaXR5XCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIm1tL3NcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJBY2NlbGVyYXRpb25cIixcIlJlZlwiOlwiQWNjZWxlcmF0aW9uXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIm1tL3PCslwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlJlc29uYW5jZSBmYWN0b3JcIixcIlJlZlwiOlwiUmVzb25hbmNlIEZhY3RvclwiLFwiRGVmYXVsdFZhbHVlXCI6XCIyXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiU2lnbmFsIHR5cGVcIixcIlJlZlwiOlwiU2lnbmFsIFR5cGVcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwiLFwiVHlwZURlZlwiOntcIkVudW1UeXBlUmVmXCI6XCJBY3BBeDo6QXV0b1R1bmluZ0V4Y2l0YXRpb25TaWduYWxcIn19fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiU2lnbmFsIG9yZGVyXCIsXCJSZWZcIjpcIlNpZ25hbCBPcmRlclwiLFwiRGVmYXVsdFZhbHVlXCI6XCI5XCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiRGVsYXkgdGltZVwiLFwiUmVmXCI6XCJEZWxheSBUaW1lXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcInNcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJTaWduYWwgc3RhcnQgZnJlcXVlbmN5XCIsXCJSZWZcIjpcIlNpZ25hbCBTdGFydCBGcmVxdWVuY3lcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwiSHpcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJTaWduYWwgc3RvcCBmcmVxdWVuY3lcIixcIlJlZlwiOlwiU2lnbmFsIFN0b3AgRnJlcXVlbmN5XCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIkh6XCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiU2lnbmFsIHRpbWVcIixcIlJlZlwiOlwiU2lnbmFsIFRpbWVcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwic1wifX1dfX0se1wiQ29tbWFuZFwiOntcIkRpc3BsYXlOYW1lXCI6XCJBdXRvdHVuZSB0ZXN0XCIsXCJSZWZcIjpcIkF1dG8gVHVuZSBUZXN0XCIsXCJQYXJhbWV0ZXJzXCI6W3tcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJNb2RlXCIsXCJSZWZcIjpcIk1vZGVcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwiLFwiVHlwZURlZlwiOntcIkVudW1UeXBlUmVmXCI6XCJBY3BBeDo6QXV0b1R1bmluZ1Rlc3RNb2RlXCJ9fX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIk9yaWVudGF0aW9uXCIsXCJSZWZcIjpcIk9yaWVudGF0aW9uXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIixcIlR5cGVEZWZcIjp7XCJFbnVtVHlwZVJlZlwiOlwiQWNwQXg6OkF1dG9UdW5pbmdPcmllbnRhdGlvblwifX19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJNYXggY3VycmVudCBwZXJjZW50XCIsXCJSZWZcIjpcIk1heCBDdXJyZW50IFBlcmNlbnRcIixcIkRlZmF1bHRWYWx1ZVwiOlwiNTBcIixcIkVVXCI6XCIlXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTWF4IGRpc3RhbmNlXCIsXCJSZWZcIjpcIk1heCBEaXN0YW5jZVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJtbVwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIk1heCBwb3NpdGlvbiBlcnJvclwiLFwiUmVmXCI6XCJNYXggUG9zaXRpb24gRXJyb3JcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwibW1cIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJTaWduYWwgdHlwZVwiLFwiUmVmXCI6XCJTaWduYWwgVHlwZVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCIsXCJUeXBlRGVmXCI6e1wiRW51bVR5cGVSZWZcIjpcIkFjcEF4OjpBdXRvVHVuaW5nRXhjaXRhdGlvblNpZ25hbFwifX19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJTaWduYWwgb3JkZXJcIixcIlJlZlwiOlwiU2lnbmFsIE9yZGVyXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjlcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJEZWxheSB0aW1lXCIsXCJSZWZcIjpcIkRlbGF5IFRpbWVcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwic1wifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlNpZ25hbCBzdGFydCBmcmVxdWVuY3lcIixcIlJlZlwiOlwiU2lnbmFsIFN0YXJ0IEZyZXF1ZW5jeVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJIelwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlNpZ25hbCBzdG9wIGZyZXF1ZW5jeVwiLFwiUmVmXCI6XCJTaWduYWwgU3RvcCBGcmVxdWVuY3lcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwiSHpcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJTaWduYWwgdGltZVwiLFwiUmVmXCI6XCJTaWduYWwgVGltZVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJzXCJ9fV19fV19fV19fSdcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgIG1ldGFEYXRhW21ldGFQYXJhbWV0ZXIuYnJvd3NlTmFtZV0gPSBKU09OLnBhcnNlKG1ldGFQYXJhbWV0ZXIudmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vSnVzdCBmb3IgcHJvdG90eXBlOiB3YXRjaGFibGVJY29uc1xyXG4gICAgICAgICAgICAgICAgLy92YXIgd2F0Y2hzdGF0ZU1ldGFEYXRhID0gJ3tcIldhdGNoYWJsZXNTdGF0ZXNTdHJ1Y3R1cmVcIjp7XCJTY29wZVwiOlwibWFwcC9Nb3Rpb24vQXhpcy9BY3BBeGlzXCIsXCJDaGlsZHNcIjpbe1wiR3JvdXBcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTWFpblwiLFwiQ2hpbGRzXCI6W3tcIldhdGNoYWJsZVN0YXRlXCI6e1wiUmVmXCI6XCJBeGlzX3N0YXRlXCIsXCJXYXRjaGFibGVWYXJpYWJsZXNNYXBwaW5nXCI6W1tcIkNvbW11bmljYXRpb24gUmVhZHlcIixcIkNvbW11bmljYXRpb25cIl0sW1wiUGxjT3BlbiBTdGF0ZVwiLFwiUExDX1N0YXRlXCJdXSxcIkljb25FeHByZXNzaW9uXCI6XCJDb21tdW5pY2F0aW9uID09IGZhbHNlID8gMSA6IFBMQ19TdGF0ZSA9PSAxID8gMiA6IFBMQ19TdGF0ZSA9PSAyID8gMyA6IFBMQ19TdGF0ZSA9PSAzIG9yIFBMQ19TdGF0ZSA9PSA0IG9yIFBMQ19TdGF0ZSA9PSA1ID8gNCA6IFBMQ19TdGF0ZSA9PSA2ID8gNSA6IFBMQ19TdGF0ZSA9PSA3ID8gNiA6IDBcIixcIkljb25cIjp7XCIwXCI6e1wiSW1hZ2VOYW1lXCI6XCJHZWFyRGlzYWJsZWRcIixcIlRvb2x0aXBcIjpcIkF4aXMgaXMgZGlzYWJsZWRcIn0sXCIxXCI6e1wiSW1hZ2VOYW1lXCI6XCJDb21tdW5pY2F0aW9uTm90UmVhZHlcIixcIlRvb2x0aXBcIjpcIkNvbW11bmljYXRpb24gaXMgbm90IHJlYWR5XCJ9LFwiMlwiOntcIkltYWdlTmFtZVwiOlwiR2VhckVuYWJsZWRcIixcIlRvb2x0aXBcIjpcIkF4aXMgaXMgc3RhbmRzdGlsbFwifSxcIjNcIjp7XCJJbWFnZU5hbWVcIjpcIkdlbmVyYWxFcnJvclwiLFwiVG9vbHRpcFwiOlwiQXhpcyBpcyBpbiBlcnJvciBzdGF0ZVwifSxcIjRcIjp7XCJJbWFnZU5hbWVcIjpcIkdlYXJSb3RhdGluZ1wiLFwiVG9vbHRpcFwiOlwiQXhpcyBpcyBtb3ZpbmdcIn0sXCI1XCI6e1wiSW1hZ2VOYW1lXCI6XCJHZWFyc1JvdGF0aW5nXCIsXCJUb29sdGlwXCI6XCJBeGlzIGlzIHN5bmNocm9uaXplZFwifX19fSx7XCJXYXRjaGFibGVTdGF0ZVwiOntcIlJlZlwiOlwiQ29udHJvbGxlcl9zdGF0ZVwiLFwiV2F0Y2hhYmxlVmFyaWFibGVzTWFwcGluZ1wiOltbXCJJcyBQb3dlcmVkXCIsXCJJc19Qb3dlcmVkXCJdXSxcIkljb25FeHByZXNzaW9uXCI6XCJJc19Qb3dlcmVkID09IHRydWUgPyAxIDogMFwiLFwiSWNvblwiOntcIjBcIjp7XCJJbWFnZU5hbWVcIjpcIk9mZlwiLFwiVG9vbHRpcFwiOlwiQ29udHJvbGxlciBpcyBzd2l0Y2hlZCBvZmZcIn0sXCIxXCI6e1wiSW1hZ2VOYW1lXCI6XCJPblwiLFwiVG9vbHRpcFwiOlwiQ29udHJvbGxlciBpcyBzd2l0Y2hlZCBvblwifX19fSx7XCJXYXRjaGFibGVTdGF0ZVwiOntcIlJlZlwiOlwiQXhpc19yZWZlcmVuY2Vfc3RhdGVcIixcIldhdGNoYWJsZVZhcmlhYmxlc01hcHBpbmdcIjpbW1wiSXMgSG9tZWRcIixcIklzX0hvbWVkXCJdLFtcIlBsY09wZW4gU3RhdGVcIixcIlBMQ19TdGF0ZVwiXV0sXCJJY29uRXhwcmVzc2lvblwiOlwiSXNfSG9tZWQgPT0gdHJ1ZSA/IDEgOiBQTENfU3RhdGUgPT0gNyA/IDI6IDBcIixcIkljb25cIjp7XCIwXCI6e1wiSW1hZ2VOYW1lXCI6XCJVbmtvd25Qb3NpdGlvblwiLFwiVG9vbHRpcFwiOlwiQXhpcyBpcyBub3QgaG9tZWRcIn0sXCIxXCI6e1wiSW1hZ2VOYW1lXCI6XCJLbm93blBvc2l0aW9uXCIsXCJUb29sdGlwXCI6XCJBeGlzIGlzIGhvbWVkXCJ9LFwiMlwiOntcIkltYWdlTmFtZVwiOlwiRmluZGluZ1Bvc2l0aW9uXCIsXCJUb29sdGlwXCI6XCJBeGlzIGlzIGhvbWluZ1wifX19fV19fV19fSc7IFxyXG4gICAgICAgICAgICAgICAgLy9tZXRhRGF0YVsnTWV0YUNvbmZpZ1dhdGNoYWJsZXNTdGF0ZXMnXSA9IEpTT04ucGFyc2Uod2F0Y2hzdGF0ZU1ldGFEYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL0p1c3QgZm9yIHByb3RvdHlwZTogcXVpY2tDb21tYW5kc1xyXG4gICAgICAgICAgICAgICAgLy8gdmFyIHF1aWNrTWV0aG9kID0gJyB7XCJRdWlja0NvbW1hbmRzU3RydWN0dXJlXCI6e1wiU2NvcGVcIjpcIm1hcHAvTW90aW9uL0F4aXMvQWNwQXhpc1wiLFwiQ2hpbGRzXCI6W3tcIkdyb3VwXCI6e1wiRGlzcGxheU5hbWVcIjpcIk1haW5cIixcIkNoaWxkc1wiOlt7XCJRdWlja0NvbW1hbmRcIjp7XCJSZWZcIjpcIlBvd2VyIE9uXCIsXCJUb29sdGlwXCI6XCJQb3dlciBvblwiLFwiSW1hZ2VOYW1lXCI6XCJPblwifX0se1wiUXVpY2tDb21tYW5kXCI6e1wiUmVmXCI6XCJQb3dlciBPZmZcIixcIlRvb2x0aXBcIjpcIlBvd2VyIG9mZlwiLFwiSW1hZ2VOYW1lXCI6XCJPZmZcIn19LHtcIlF1aWNrQ29tbWFuZFwiOntcIlJlZlwiOlwiQWJvcnQgQ29tbWFuZFwiLFwiVG9vbHRpcFwiOlwiQWJvcnQgY29tbWFuZFwiLFwiSW1hZ2VOYW1lXCI6XCJTdG9wXCJ9fSx7XCJRdWlja0NvbW1hbmRcIjp7XCJSZWZcIjpcIlJlc2V0XCIsXCJUb29sdGlwXCI6XCJSZXNldFwiLFwiSW1hZ2VOYW1lXCI6XCJSZXNldFwifX1dfX1dfX0gJ1xyXG4gICAgICAgICAgICAgICAgLy8gbWV0YURhdGFbJ01ldGFDb25maWdRdWlja0NvbW1hbmRzJ10gPSBKU09OLnBhcnNlKHF1aWNrTWV0aG9kKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyB1cGRhdGUgc3BlY2lmaWMgcGFyYW1ldGVyIHR5cGVzIGluIG1ldGEgZGF0YSBvYmplY3RcclxuICAgICAgICAgICAgTWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXIuaW5pdGlhbGl6ZU1ldGFEYXRhKG1ldGFEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwuYnJvd3NlTWV0YURhdGE6IGNvdWxkIG5vdCBwYXJzZSBtZXRhIGRhdGE6IFwiICsgZS5tZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1ldGFEYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGV4ZWN1dGVDb21wb25lbnRNZXRob2QoY29tcG9uZW50TWV0aG9kOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX21hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyLmV4ZWN1dGVDb21wb25lbnRNZXRob2QoY29tcG9uZW50TWV0aG9kKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNhbGxlZCBhZnRlciBjb21wb25lbnQgcGFyYW1ldGVycyBoYXZlIGJlZW4gdXBkYXRlZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gY29tcG9uZW50UGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgLy8gT2Jzb2xldGUgYmVjYXVzZSBjb21wb25lbnRzIGNhbid0IGJlIHVwZGF0ZWQgYXQgcnVudGltZVxyXG4gICAgLypvbkNvbXBvbmVudFBhcmFtZXRlcnNVcGRhdGVkKGNvbXBvbmVudDogTWFwcENvY2twaXRDb21wb25lbnQsIGNvbXBvbmVudFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pOiBhbnkge1xyXG4gICAgICAgIHRoaXMuZXZlbnRDb21wb25lbnRQYXJhbWV0ZXJzVXBkYXRlZC5yYWlzZSh0aGlzLCBuZXcgRXZlbnRNb2RlbENoYW5nZWRBcmdzKHRoaXMsIE1vZGVsQ2hhbmdlVHlwZS51cGRhdGVUYXJnZXQsIFwidXBkYXRlZENvbXBvbmVudFBhcmFtZXRlcnNcIiwgY29tcG9uZW50UGFyYW1ldGVycykpO1xyXG4gICAgfSovXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjYWxsZWQgYWZ0ZXIgY29tcG9uZW50IG1ldGhvZHMgaGF2ZSBiZWVuIHVwZGF0ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50fSBjb21wb25lbnRcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gY29tcG9uZW50TWV0aG9kc1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgLy8gT2Jzb2xldGUgYmVjYXVzZSBjb21wb25lbnRzIGNhbid0IGJlIHVwZGF0ZWQgYXQgcnVudGltZVxyXG4gICAgLypvbkNvbXBvbmVudE1ldGhvZHNVcGRhdGVkKGNvbXBvbmVudDogTWFwcENvY2twaXRDb21wb25lbnQsIGNvbXBvbmVudE1ldGhvZHM6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW10pOiBhbnkge1xyXG4gICAgICAgIHRoaXMuZXZlbnRDb21wb25lbnRNZXRob2RzVXBkYXRlZC5yYWlzZSh0aGlzLCBuZXcgRXZlbnRNb2RlbENoYW5nZWRBcmdzKHRoaXMsIE1vZGVsQ2hhbmdlVHlwZS51cGRhdGVUYXJnZXQsIFwidXBkYXRlZENvbXBvbmVudE1ldGhvZHNcIiwgY29tcG9uZW50TWV0aG9kcykpO1xyXG4gICAgfSovXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWFkcyAgYW5kIHVwZGF0ZXMgdGhlIHBhcmFtZXRlciB2YWx1ZXMgb2YgdGhlIHNwZWNpZmllZCBwYXJhbWV0ZXIgbGlzdFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gY29tcG9uZW50UGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgYXN5bmMgcmVhZFBhcmFtZXRlclZhbHVlcyhjb21wb25lbnRQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBhd2FpdCB0aGlzLl9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlci5yZWFkUGFyYW1ldGVyVmFsdWVzKGNvbXBvbmVudFBhcmFtZXRlcnMpO1xyXG4gICAgICAgIHRoaXMub25QYXJhbWV0ZXJWYWx1ZXNVcGRhdGVkKGNvbXBvbmVudFBhcmFtZXRlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogb2JzZXJ2ZXMgdGhlIHBhcmFtZXRlcnMgZm9yIHZhbHVlIGNoYW5nZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lPYnNlcnZlcn0gb2JzZXJ2ZXJcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRJdGVtW119IG9ic2VydmFibGVEYXRhTW9kZWxJdGVtc1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBhc3luYyBvYnNlcnZlRGF0YU1vZGVsSXRlbXMob2JzZXJ2ZXI6IElPYnNlcnZlciwgb2JzZXJ2YWJsZURhdGFNb2RlbEl0ZW1zOiBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW1bXSk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5fbWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIub2JzZXJ2ZUNvbXBvbmVudE1vZGVsSXRlbXMob2JzZXJ2ZXIsIG9ic2VydmFibGVEYXRhTW9kZWxJdGVtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVbm9ic2VydmVzIHRoZSBwYXNzZWQgcGFyYW1ldGVycy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IG9ic2VydmVyXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IG9ic2VydmFibGVQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHN1c3BlbmRcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBhc3luYyB1bm9ic2VydmVDb21wb25lbnRNb2RlbEl0ZW1zKG9ic2VydmVyOiBhbnksIG9ic2VydmFibGVQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdLCBzdXNwZW5kOmJvb2xlYW4pIHtcclxuICAgICAgICBhd2FpdCB0aGlzLl9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlci51bm9ic2VydmVDb21wb25lbnRNb2RlbEl0ZW1zKG9ic2VydmVyLCBvYnNlcnZhYmxlUGFyYW1ldGVycyxzdXNwZW5kKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGhhbmRsZXMgb2JzZXJ2YWJsZSBjaGFuZ2VkIG5vdGlmaWNhdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtFdmVudE9ic2VydmVkSXRlbXNDaGFuZ2VkQXJnc30gZXZlbnRBcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBoYW5kbGVPYnNlcnZhYmxlSXRlbXNDaGFuZ2VkKGV2ZW50QXJnczogRXZlbnRPYnNlcnZlZEl0ZW1zQ2hhbmdlZEFyZ3MpIHtcclxuXHJcbiAgICAgICAgaWYgKGV2ZW50QXJncy5vYnNlcnZlciBpbnN0YW5jZW9mIERhdGFNb2RlbEJhc2UpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBtb2RlbCBjaGFuZ2VkIGFyZ3NcclxuICAgICAgICAgICAgbGV0IG1vZGVsSXRlbXNDaGFuZ2VkQXJncyA9IG5ldyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MoZXZlbnRBcmdzLm9ic2VydmVyLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBcImNoYW5nZWQgb2JzZXJ2YWJsZXNcIiwgZXZlbnRBcmdzLmNoYW5nZWRJdGVtcyk7XHJcbiAgICAgICAgICAgIC8vIG5vdGlmeSBvYnNlcnZlcnMgZnJvbSBjaGFuZ2luZyBtb2RlbCBpdGVtc1xyXG4gICAgICAgICAgICBldmVudEFyZ3Mub2JzZXJ2ZXIub25Nb2RlbEl0ZW1zQ2hhbmdlZChldmVudEFyZ3Mub2JzZXJ2ZXIsIG1vZGVsSXRlbXNDaGFuZ2VkQXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbm90aWZ5IGZyb20gdXBkYXRpbmcgdGhlIHNwZWNpZmllZCBwYXJhbWV0ZXJzIHZhbHVlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gY29tcG9uZW50UGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblBhcmFtZXRlclZhbHVlc1VwZGF0ZWQoY29tcG9uZW50UGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSk6IGFueSB7XHJcbiAgICAgICAgdGhpcy5ldmVudFBhcmFtZXRlclZhbHVlc1VwZGF0ZWQucmFpc2UodGhpcywgY29tcG9uZW50UGFyYW1ldGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgd2hlbiB0aGUgbW9kZWwgaGFzIGJlZW4gc3VjY2Vzc2Z1bGx5IGNvbm5lY3RlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbk1vZGVsQ29ubmVjdGVkKCkge1xyXG5cclxuICAgICAgICB0aGlzLl9tb2RlbENvbm5lY3RlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5vbk1vZGVsQ29ubmVjdGlvbkNoYW5nZWQodGhpcy5fbW9kZWxDb25uZWN0ZWQpOyBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCB3aGVuIHRoZSBtb2RlbCBoYXMgbG9zdCB0aGUgY29ubmVjdGlvbiB0byB0aGUgdGFyZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uTW9kZWxEaXNjb25uZWN0ZWQoKSB7XHJcbiAgICAgICAgLy8gbm90aWZ5IGNvbm5lY3Rpb24gY2hhbmdlXHJcbiAgICAgICAgdGhpcy5fbW9kZWxDb25uZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm9uTW9kZWxDb25uZWN0aW9uQ2hhbmdlZCh0aGlzLl9tb2RlbENvbm5lY3RlZCk7IFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2JzZXJ2ZXMgdGhlIGNvbm5lY3Rpb24gaWYgaXQgaXMgc3RpbGwgYWxpdmVcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXJ0T2JzZXJ2ZU1vZGVsQ29ubmVjdGlvbigpOiBhbnkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGluaXRpYWxseSBub3RpZnkgdGhlIHN1Y2Nlc3NmdWxsIGNvbm5lY3Rpb25cclxuICAgICAgICB0aGlzLm9uTW9kZWxDb25uZWN0ZWQoKTtcclxuXHJcbiAgICAgICAgLy8gZXN0YWJsaXNoIGEgdGltZXIgZm9yIHdhdGNoaW5nIHRoZSBjb25uZWN0aW9uXHJcbiAgICAgICAgaWYgKHRoaXMuX2Nvbm5lY3Rpb25PYnNlcnZhdGlvblRpbWVySWQgPT0gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5fY29ubmVjdGlvbk9ic2VydmF0aW9uVGltZXJJZCA9IHNldEludGVydmFsKGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMub2JzZXJ2ZU1vZGVsQ29ubmVjdGlvbigpO1xyXG4gICAgICAgICAgICB9LCB0aGlzLl9jb25uZWN0aW9uT2JzZXJ2YXRpb25JbnRlcnZhbCk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2JzZXJldmVzIHRoZSBtb2RlbCBjb25uZWN0aW9uIFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgb2JzZXJ2ZU1vZGVsQ29ubmVjdGlvbigpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBcclxuICAgICAgICAvLyByZWFkIHRoZSBjb25uZWN0aW9uIHN0YXRlXHJcbiAgICAgICAgbGV0IGlzQ29ubmVjdGVkID0gYXdhaXQgdGhpcy5fbWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIuY2hlY2tUYXJnZXRDb25uZWN0aW9uKCk7ICAgXHJcbiBcclxuICAgICAgICBpZiAoaXNDb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9tb2RlbENvbm5lY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ29ubmVjdGVkKCk7XHJcbiAgICAgICAgICAgIH0gICAgICAgXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9tb2RlbENvbm5lY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbk1vZGVsRGlzY29ubmVjdGVkKCk7IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIHdoZW4gdGhlIG1vZGVsIGNvbm5lY3Rpb24gaGFzIGNoYW5nZWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGNvbm5lY3RlZFxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgb25Nb2RlbENvbm5lY3Rpb25DaGFuZ2VkKGNvbm5lY3RlZDpib29sZWFuKTogYW55IHtcclxuICAgICAgICB0aGlzLmV2ZW50TW9kZWxDb25uZWN0aW9uQ2hhbmdlZC5yYWlzZSh0aGlzLGNvbm5lY3RlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcm92aWRlcyBjb21tYW5kIGZvciBjaGFuZ2luZyB0aGUgdXNlciB0byBiZSBsb2dnZWQgaW5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7SUNvbW1hbmRFeGVjdXRpb25EZWxlZ2F0ZTxhbnksYW55Pn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBleGVjdXRlQ29tbWFuZENoYW5nZVVzZXIoKTogSUNvbW1hbmRFeGVjdXRpb25EZWxlZ2F0ZTxhbnksYW55PiB7XHJcbiAgICAgICAgcmV0dXJuIGFzeW5jICh1c2VySW5mbzoge30sIGNvbW1hbmRSZXNwb25zZTogSUNvbW1hbmRFeGVjdXRpb25SZXNwb25zZURlbGVnYXRlPGFueT4pID0+IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgdXNlciByb2xlc1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXNlclJvbGVzLnZhbHVlID0gIGF3YWl0IHRoaXMuX21hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyLmNoYW5nZVVzZXIodXNlckluZm8pIGFzIHN0cmluZ1tdO1xyXG4gICAgICAgICAgICAgICAgY29tbWFuZFJlc3BvbnNlLmV4ZWN1dGVkKHRoaXMuX3VzZXJSb2xlcyk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb21tYW5kUmVzcG9uc2UucmVqZWN0ZWQoZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwgfTsiXX0=