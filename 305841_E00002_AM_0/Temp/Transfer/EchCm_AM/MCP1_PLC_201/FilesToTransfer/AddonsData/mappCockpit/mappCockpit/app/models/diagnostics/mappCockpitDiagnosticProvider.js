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
define(["require", "exports", "../../communication/rest/opcUaRestServices", "./mappCockpitComponentProvider", "./mappCockpitCommonInfoProvider", "./trace/mappCockpitTraceProvider", "./mappCockpitDiagnosticMonitoringProvider", "../../framework/events", "../online/mappCockpitComponent", "../../services/appServices", "../online/mappCockpitComponentService"], function (require, exports, opcUaRestServices_1, mappCockpitComponentProvider_1, mappCockpitCommonInfoProvider_1, mappCockpitTraceProvider_1, mappCockpitDiagnosticMonitoringProvider_1, events_1, ModelItems, appServices_1, mappCockpitComponentService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventObservablesChanged = /** @class */ (function (_super) {
        __extends(EventObservablesChanged, _super);
        function EventObservablesChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventObservablesChanged;
    }(events_1.TypedEvent));
    ;
    /**
     * Implements the mapp cockpit diagnostic provider
     *
     * @class MappCockpitDiagnosticProvider
     */
    var MappCockpitDiagnosticProvider = /** @class */ (function () {
        /**
         * Creates an instance of MappCockpitDiagnosticProvider.
         * @memberof MappCockpitDiagnosticProvider
         */
        function MappCockpitDiagnosticProvider(dataModel) {
            var _this = this;
            // Holds the currently acive session id
            this._sessionId = -1;
            // Holds the mapp cockpit nmespace index
            this._namespaceIndex = -1;
            this._observedItemsChangedHandler = function (sender, eventArgs) { _this.handleObservableChanged(sender, eventArgs); };
            // Initialize members
            this._dataModel = dataModel;
            this._componentProvider = new mappCockpitComponentProvider_1.MappCockpitComponentProvider(this);
            this._traceProvider = new mappCockpitTraceProvider_1.MappCockpitTraceProvider(this);
            this._monitoringProvider = new mappCockpitDiagnosticMonitoringProvider_1.MappCockpitDiagnosticMonitoringProvider(this);
            this._commonInfoProvider = mappCockpitCommonInfoProvider_1.MappCockpitCommonInfoProvider.getInstance();
            this.eventObservablesChanged = new EventObservablesChanged();
            // attach events 
            this._monitoringProvider.eventObservedItemsChanged.attach(this._observedItemsChangedHandler);
        }
        /**
         * Dispose the MappCockpitDiagnosticProvider
         *
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.dispose = function () {
            var _this = this;
            // detach events 
            this._monitoringProvider.eventObservedItemsChanged.detach(this._observedItemsChangedHandler);
            // terminate the current session
            (function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.endSession()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); })();
        };
        Object.defineProperty(MappCockpitDiagnosticProvider.prototype, "componentProvider", {
            /**
             * Gets the component provider
             *
             * @readonly
             * @type {MappCockpitTraceProvider}
             * @memberof MappCockpitDiagnosticProvider
             */
            get: function () {
                return this._componentProvider;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitDiagnosticProvider.prototype, "model", {
            /**
             * Gets the data model
             *
             * @readonly
             * @type {MappCockpitComponentDataModel}
             * @memberof MappCockpitDiagnosticProvider
             */
            get: function () {
                return this._dataModel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitDiagnosticProvider.prototype, "traceProvider", {
            /**
             * Gets the trace provider
             *
             * @readonly
             * @type {MappCockpitTraceProvider}
             * @memberof MappCockpitDiagnosticProvider
             */
            get: function () {
                return this._traceProvider;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitDiagnosticProvider.prototype, "sessionId", {
            /**
             * Returns the current session id
             *
             * @readonly
             * @type {string}
             * @memberof MappCockpitDiagnosticProvider
             */
            get: function () {
                return this._sessionId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitDiagnosticProvider.prototype, "namespaceIndex", {
            /**
             * Returns the effective namespace index
             *
             * @readonly
             * @type {number}
             * @memberof MappCockpitDiagnosticProvider
             */
            get: function () {
                return this._namespaceIndex;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitDiagnosticProvider.prototype, "namespace", {
            /**
             * Returns the mapp cockpit namespace
             *
             * @readonly
             * @type {string}
             * @memberof MappCockpitDiagnosticProvider
             */
            get: function () {
                return opcUaRestServices_1.OpcUaRestServices.mappCockpitNamespacePrefix + this._namespaceIndex;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * starts a diagnostic session
         *
         * @private
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.beginSession = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 8, , 9]);
                            // get opc ua address
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.readOpcUaLocalIp()];
                        case 1:
                            // get opc ua address
                            _b.sent();
                            // authenticate 
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.authenticate()];
                        case 2:
                            // authenticate 
                            _b.sent();
                            // create a socket connection for receiving opc-ua events
                            return [4 /*yield*/, this._monitoringProvider.createOpcUaSocket()];
                        case 3:
                            // create a socket connection for receiving opc-ua events
                            _b.sent();
                            console.log('MappCockpitDiagnosticProvider: created web socket ');
                            // create a session
                            return [4 /*yield*/, this.createSession()];
                        case 4:
                            // create a session
                            _b.sent();
                            console.log("MappCockpitDiagnosticProvider: created session: %o", this.sessionId);
                            // read the namespace index for further access
                            _a = this;
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.getNamespaceIndex(this.sessionId)];
                        case 5:
                            // read the namespace index for further access
                            _a._namespaceIndex = _b.sent();
                            console.log("MappCockpitDiagnosticProvider: got namespace index: %o", this._namespaceIndex);
                            // initialize common info provider 
                            return [4 /*yield*/, this._commonInfoProvider.initialize(this.sessionId, this._namespaceIndex)];
                        case 6:
                            // initialize common info provider 
                            _b.sent();
                            // connects to the text system
                            return [4 /*yield*/, this.connectTextSystem()];
                        case 7:
                            // connects to the text system
                            _b.sent();
                            return [3 /*break*/, 9];
                        case 8:
                            error_1 = _b.sent();
                            console.log(error_1);
                            return [3 /*break*/, 9];
                        case 9: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Connects and initializes the textsystem
         *
         * @private
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.connectTextSystem = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, appServices_1.Services.textSystem.connectTextSystem()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        // /**
        //  * Just a test method for browsing the text system
        //  *
        //  * @private
        //  * @memberof MappCockpitDiagnosticProvider
        //  */
        // private async browseTextSystem() {
        //     // read the default language
        //     const defaultLanguageId = await Services.textSystem.getDefaultLanguage();
        //     // read all available languages
        //     const languages = await Services.textSystem.getLanguages();
        //     // read namespace text resources
        //     const namespaceTextItemsMap = await Services.textSystem.getNamespaceTextItems(defaultLanguageId,"BR/GMC/Enum/AcpParIdDescription");
        //     // get one text from the map
        //     const parIdTextFromMap = namespaceTextItemsMap.get("111");
        //     // read single specific text from namespace
        //     const parIdText = await Services.textSystem.getText(defaultLanguageId,"BR/GMC/Enum/AcpParIdDescription","111");
        //     // // read all text items of the namespace per single access
        //     // // retrieve the text keys
        //     // const textItemIds = Object.keys(namespaceTextItems);
        //     // let retrievedNsTextItems  = {};
        //     // // iterate all text keys and get the correponding text
        //     // textItemIds.forEach(async textItemId => {
        //     //     const nsText = await Services.textSystem.getText(defaultLanguageId,"BR/GMC/Enum/AcpParIdDescription",textItemId);
        //     //     retrievedNsTextItems[textItemId] = nsText;
        //     // }); 
        //     console.log(languages);
        // }
        // private _text: TextItem = new TextItem();
        // private _uploadedNamespacesFinishedHandler = (sender, args)=>this.onUploadedNamespacesFinished(sender, args);
        // private onUploadedNamespacesFinished(sender: ITextProvider, args: EventNamespacesLoadedResponse) {
        //     if(args.notFoundNamespaces.length !== 0) {
        //         // react to not all namespaces found
        //     }
        //     let inputArgs = new FormatterInputArgumentList();
        //     inputArgs.push(new FormatterInputArgumentString("°C"));
        //     inputArgs.push(new FormatterInputArgumentFloat(23.12000));
        //     this._text = sender.getFormattedText("BR/EventLog", "-2141085654", inputArgs);
        // }
        // private async browseTextProvider() {
        //     let componentFactory: IComponentFactory = ComponentFactory.getInstance();
        //     let textProvider: ITextProvider = componentFactory.create(new ComponentDefinition("TextProvider", "TextProvider", "textProviderDefinition"), undefined) as ITextProvider;
        //     const defaultLanguageId = await Services.textSystem.getDefaultLanguage();
        //     textProvider.setSelectedLanguage(defaultLanguageId);
        //     let namespaces: Array<string> = new Array<string>();
        //     namespaces.push("BR/GMC/Enum/AcpParIdDescription");
        //     namespaces.push("BR/EventLog");
        //     textProvider.eventNamespacesLoaded.attach(this._uploadedNamespacesFinishedHandler);
        //     textProvider.loadFullNamespacesRequest(namespaces);
        //     textProvider.eventNamespacesLoaded.detach(this._uploadedNamespacesFinishedHandler);
        // }
        /**
         * Creates a new session if not already available.
         *
         * @private
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.createSession = function () {
            return __awaiter(this, void 0, void 0, function () {
                var newSessionId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this._sessionId === -1)) return [3 /*break*/, 2];
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.createSession()];
                        case 1:
                            newSessionId = _a.sent();
                            this._sessionId = newSessionId;
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * terminates a diagnostic session
         *
         * @private
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.endSession = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this._monitoringProvider.close();
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.deleteSession(this.sessionId)];
                        case 1:
                            _a.sent();
                            this._sessionId = -1;
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Checks is the connection to the target is still valid
         *
         * @returns {*}
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.checkTargetConnection = function () {
            return __awaiter(this, void 0, void 0, function () {
                var connected, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            connected = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            // we access the mapp cockpit roots description atribute as live check. The connection is valid if the attribute could be read successfully.
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.readNodeAttribute(this.sessionId, this.namespace + ";" + opcUaRestServices_1.OpcUaRestServices.mappCockpitRootNodeId, opcUaRestServices_1.OpcUaAttribute.DESCRIPTION)];
                        case 2:
                            // we access the mapp cockpit roots description atribute as live check. The connection is valid if the attribute could be read successfully.
                            _a.sent();
                            connected = true;
                            return [3 /*break*/, 4];
                        case 3:
                            error_2 = _a.sent();
                            connected = false;
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/, connected];
                    }
                });
            });
        };
        /**
         * Login new user
         *
         * @param {string} user
         * @param {string} password
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.changeUser = function (userInfo) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.changeUser(this.sessionId, userInfo)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * browses the meta info for a component
         *
         * @param {ModelItems.MappCockpitComponent} mappCockpitComponent
         * @returns {Promise<any>}
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.browseMetaInfo = function (mappCockpitComponent) {
            return __awaiter(this, void 0, void 0, function () {
                var metaInfo;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._componentProvider.browseComponentMetaInfo(mappCockpitComponent)];
                        case 1:
                            metaInfo = _a.sent();
                            return [2 /*return*/, metaInfo];
                    }
                });
            });
        };
        /**
         * browses the parameters of a component
         *
         * @param {ModelItems.MappCockpitComponent} mappCockpitComponent
         * @returns {Promise<ModelItems.MappCockpitComponentParameter[]>}
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.browseParameters = function (mappCockpitComponent) {
            return __awaiter(this, void 0, void 0, function () {
                var mappCockpitComponentParameters;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._componentProvider.browseComponentParameters(mappCockpitComponent)];
                        case 1:
                            mappCockpitComponentParameters = _a.sent();
                            return [2 /*return*/, mappCockpitComponentParameters];
                    }
                });
            });
        };
        /**
         * updates parameter data types
         *
         * @param {ModelItems.MappCockpitComponentParameter[]} parameters
         * @returns {Promise<any>}
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.updateParameterDataTypes = function (parameters) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._componentProvider.updateParameterDataTypes(parameters)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * updates method parameter data types
         *
         * @param {ModelItems.MappCockpitComponentMethod[]} methods
         * @returns {Promise<any>}
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.updateMethodParameterDataTypes = function (methods) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._componentProvider.updateMethodParameterDataTypes(methods)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * reads a list of parameter values
         *
         * @param {Array<ModelItems.MappCockpitComponentParameter>} componentParameters
         * @returns {Promise<Array<ModelItems.MappCockpitComponentParameter>>}
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.readParameterValues = function (componentParameters) {
            return __awaiter(this, void 0, void 0, function () {
                var requestsReadParameterValues;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            requestsReadParameterValues = componentParameters.map(function (componentParameter) { return _this._componentProvider.readComponentParameterValue(componentParameter); });
                            return [4 /*yield*/, Promise.all(requestsReadParameterValues)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, componentParameters];
                    }
                });
            });
        };
        /**
         * Writes the parameters values
         *
         * @param {ModelItems.MappCockpitComponentParameter[]} componentParameters
         * @returns {*}
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.writeParameterValues = function (componentParameters) {
            return __awaiter(this, void 0, void 0, function () {
                var requestsWriteParameterValues;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            requestsWriteParameterValues = componentParameters.map(function (componentParameter) { return _this._componentProvider.writeComponentParameterValue(componentParameter); });
                            return [4 /*yield*/, Promise.all(requestsWriteParameterValues)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, componentParameters];
                    }
                });
            });
        };
        /**
         * observes the list of items for value changes
         *
         * @param {Array<ModelItems.MappCockpitComponentParameter>} componentParameters
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.observeComponentModelItems = function (observer, componentParameters) {
            this._monitoringProvider.observeComponentModelItems(observer, this.sessionId, componentParameters);
        };
        /**
         * Unobserves the passed parameters.
         *
         * @param {*} observer
         * @param {ModelItems.MappCockpitComponentParameter[]} observableParameters
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.unobserveComponentModelItems = function (observer, observableParameters, suspend) {
            this._monitoringProvider.unobserveComponentModelItems(observer, this.sessionId, observableParameters, suspend);
        };
        /**
         * handles change notifications from observables
         *
         * @returns {*}
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.handleObservableChanged = function (sender, changedEventArgs) {
            this.eventObservablesChanged.raise(this, changedEventArgs);
        };
        /**
         * writes a parameters value
         *
         * @param {ModelItems.MappCockpitComponentParameter} componentParameter
         * @param {*} value
         * @returns {Promise<any>}
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.writeParameterValue = function (componentParameter, value) {
            return __awaiter(this, void 0, void 0, function () {
                var componentParameterValue;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._componentProvider.writeComponentParameterValue(componentParameter)];
                        case 1:
                            componentParameterValue = _a.sent();
                            return [2 /*return*/, componentParameterValue];
                    }
                });
            });
        };
        /**
         * browses the methods of a component
         *
         * @param {MappCockpitComponent} mappCockpitComponent
         * @returns {*}
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.browseMethods = function (mappCockpitComponent) {
            return __awaiter(this, void 0, void 0, function () {
                var mappCockpitComponentMethods;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._componentProvider.browseComponentMethods(mappCockpitComponent)];
                        case 1:
                            mappCockpitComponentMethods = _a.sent();
                            return [2 /*return*/, mappCockpitComponentMethods];
                    }
                });
            });
        };
        MappCockpitDiagnosticProvider.prototype.browseMethodParameters = function (mappCockpitComponentMethods) {
            return __awaiter(this, void 0, void 0, function () {
                var mappCockpitComponentMethodParameters;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._componentProvider.browseComponentMethodParameters(mappCockpitComponentMethods)];
                        case 1:
                            mappCockpitComponentMethodParameters = _a.sent();
                            return [2 /*return*/, mappCockpitComponentMethodParameters];
                    }
                });
            });
        };
        /**
         * executes a component method
         *
         * @param {*} mappCockpitComponent
         * @returns {*}
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.executeComponentMethod = function (mappCockpitComponentMethod) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._componentProvider.executeComponentMethod(mappCockpitComponentMethod)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * Browses for the service node and creates a component service object
         *
         * @param {ModelItems.MappCockpitComponent} mappCockpitComponent
         * @returns {Promise<MappCockpitComponentService>}
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.browseServiceChannel = function (mappCockpitComponent) {
            return __awaiter(this, void 0, void 0, function () {
                var componentService, componentNodes, serviceNodeId, serviceParameters, serviceChannel, serviceMethods, serviceRequest, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            componentService = new mappCockpitComponentService_1.MappCockpitComponentService();
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 6, , 7]);
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.browseNodes(this.sessionId, mappCockpitComponent.id)];
                        case 2:
                            componentNodes = _a.sent();
                            if (!(componentNodes && componentNodes.find(function (node) { return node.browseName === opcUaRestServices_1.OpcUaRestServices.serviceChannelNodeId; }))) return [3 /*break*/, 5];
                            serviceNodeId = mappCockpitComponent.id + "." + opcUaRestServices_1.OpcUaRestServices.serviceChannelNodeId;
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.browseNodeParameters(this.sessionId, serviceNodeId)];
                        case 3:
                            serviceParameters = _a.sent();
                            serviceChannel = serviceParameters.filter(function (parameter) { return parameter.browseName === "infoChannel"; });
                            if (serviceChannel.length === 1) {
                                componentService.infoChannel = new ModelItems.MappCockpitComponentParameter(mappCockpitComponent, serviceChannel[0].displayName, serviceChannel[0]);
                                ;
                            }
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.browseNodeMethods(this.sessionId, serviceNodeId)];
                        case 4:
                            serviceMethods = _a.sent();
                            serviceRequest = serviceMethods.filter(function (parameter) { return parameter.browseName === "request"; });
                            if (serviceRequest.length === 1) {
                                componentService.request = new ModelItems.MappCockpitComponentMethod(mappCockpitComponent, serviceRequest[0].displayName, serviceRequest[0]);
                            }
                            _a.label = 5;
                        case 5: return [3 /*break*/, 7];
                        case 6:
                            error_3 = _a.sent();
                            return [3 /*break*/, 7];
                        case 7: return [2 /*return*/, componentService.request && componentService.infoChannel ? componentService : null];
                    }
                });
            });
        };
        return MappCockpitDiagnosticProvider;
    }());
    exports.MappCockpitDiagnosticProvider = MappCockpitDiagnosticProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9kaWFnbm9zdGljcy9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBYUE7UUFBc0MsMkNBQXdFO1FBQTlHOztRQUFnSCxDQUFDO1FBQUQsOEJBQUM7SUFBRCxDQUFDLEFBQWpILENBQXNDLG1CQUFVLEdBQWlFO0lBQUEsQ0FBQztJQUVsSDs7OztPQUlHO0lBQ0g7UUFzQkk7OztXQUdHO1FBQ0gsdUNBQVksU0FBd0M7WUFBcEQsaUJBYUM7WUE1QkQsdUNBQXVDO1lBQy9CLGVBQVUsR0FBVyxDQUFDLENBQUMsQ0FBQztZQUNoQyx3Q0FBd0M7WUFDaEMsb0JBQWUsR0FBVyxDQUFDLENBQUMsQ0FBQztZQU03QixpQ0FBNEIsR0FBRyxVQUFDLE1BQU0sRUFBRSxTQUFTLElBQU8sS0FBSSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQztZQVE5RyxxQkFBcUI7WUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7WUFDNUIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksMkRBQTRCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakUsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLG1EQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLGlGQUF1QyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyw2REFBNkIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUV2RSxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSx1QkFB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QUFDO0lBQUQsQ0FBQyxBQXRnQkQsSUFzZ0JDO0lBR1Esc0VBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3BjVWFSZXN0U2VydmljZXMsIE9wY1VhQXR0cmlidXRlIH0gZnJvbSAnLi4vLi4vY29tbXVuaWNhdGlvbi9yZXN0L29wY1VhUmVzdFNlcnZpY2VzJ1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudFByb3ZpZGVyIH0gZnJvbSAnLi9tYXBwQ29ja3BpdENvbXBvbmVudFByb3ZpZGVyJztcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXIgfSBmcm9tICcuL21hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyJztcclxuaW1wb3J0IHsgTWFwcENvY2twaXRUcmFjZVByb3ZpZGVyIH0gZnJvbSAnLi90cmFjZS9tYXBwQ29ja3BpdFRyYWNlUHJvdmlkZXInO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdERpYWdub3N0aWNNb25pdG9yaW5nUHJvdmlkZXIsIEV2ZW50T2JzZXJ2ZWRJdGVtc0NoYW5nZWRBcmdzIH0gZnJvbSAnLi9tYXBwQ29ja3BpdERpYWdub3N0aWNNb25pdG9yaW5nUHJvdmlkZXInO1xyXG5pbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSAnLi4vLi4vZnJhbWV3b3JrL2V2ZW50cyc7XHJcbmltcG9ydCAqIGFzIE1vZGVsSXRlbXMgZnJvbSAnLi4vb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50JztcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRJdGVtLCBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCB9IGZyb20gJy4uL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudCc7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsIH0gZnJvbSAnLi4vb25saW5lL2NvbXBvbmVudHNEYXRhTW9kZWwnO1xyXG5pbXBvcnQgeyBTZXJ2aWNlcyB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwcFNlcnZpY2VzJztcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRTZXJ2aWNlIH0gZnJvbSAnLi4vb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50U2VydmljZSc7XHJcblxyXG5cclxuY2xhc3MgRXZlbnRPYnNlcnZhYmxlc0NoYW5nZWQgZXh0ZW5kcyBUeXBlZEV2ZW50PE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyLCBFdmVudE9ic2VydmVkSXRlbXNDaGFuZ2VkQXJncz57IH07XHJcblxyXG4vKipcclxuICogSW1wbGVtZW50cyB0aGUgbWFwcCBjb2NrcGl0IGRpYWdub3N0aWMgcHJvdmlkZXJcclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlciB7XHJcblxyXG4gICAgLy8gSG9sZHMgYW4gaW5zdGFuY2Ugb2YgdGhlIGNvbXBvbmVudCBwcm92aWRlclxyXG4gICAgcHJpdmF0ZSBfY29tcG9uZW50UHJvdmlkZXI6IE1hcHBDb2NrcGl0Q29tcG9uZW50UHJvdmlkZXI7XHJcbiAgICAvLyBIb2xkcyBhbiBpbnN0YW5jZSBvZiB0aGUgdHJhY2UgcHJvdmlkZXJcclxuICAgIHByaXZhdGUgX3RyYWNlUHJvdmlkZXI6IE1hcHBDb2NrcGl0VHJhY2VQcm92aWRlcjtcclxuICAgIC8vIGhvbGRzIGFuIGluc3RhbmNlIG9mIHRoZSBtb25pdG9yaW5nIHByb3ZpZGVyXHJcbiAgICBwcml2YXRlIF9tb25pdG9yaW5nUHJvdmlkZXI6IE1hcHBDb2NrcGl0RGlhZ25vc3RpY01vbml0b3JpbmdQcm92aWRlcjtcclxuICAgIC8vIGhvbGRzIGFuIGluc3RhbmNlIG9mIGEgcHJvdmlkZXIgZm9yIHJlYWRpbmcgYW5kIGV4cG9zaW5nIGNvbW1vbiBpbmZvIChlbnVtcywgbWV0YSlcclxuICAgIHByaXZhdGUgX2NvbW1vbkluZm9Qcm92aWRlcjogTWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXI7XHJcblxyXG4gICAgLy8gSG9sZHMgdGhlIGN1cnJlbnRseSBhY2l2ZSBzZXNzaW9uIGlkXHJcbiAgICBwcml2YXRlIF9zZXNzaW9uSWQ6IG51bWJlciA9IC0xO1xyXG4gICAgLy8gSG9sZHMgdGhlIG1hcHAgY29ja3BpdCBubWVzcGFjZSBpbmRleFxyXG4gICAgcHJpdmF0ZSBfbmFtZXNwYWNlSW5kZXg6IG51bWJlciA9IC0xO1xyXG4gICAgLy8gZGVjbGFyZXMgb2JzZXJ2YWJsZSBjaGFuZ2VkIGV2ZW50XHJcbiAgICBldmVudE9ic2VydmFibGVzQ2hhbmdlZDogRXZlbnRPYnNlcnZhYmxlc0NoYW5nZWQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfZGF0YU1vZGVsOiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbDtcclxuXHJcbiAgICBwcml2YXRlIF9vYnNlcnZlZEl0ZW1zQ2hhbmdlZEhhbmRsZXIgPSAoc2VuZGVyLCBldmVudEFyZ3MpID0+IHsgdGhpcy5oYW5kbGVPYnNlcnZhYmxlQ2hhbmdlZChzZW5kZXIsIGV2ZW50QXJncykgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIuXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZGF0YU1vZGVsOiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbCkge1xyXG5cclxuICAgICAgICAvLyBJbml0aWFsaXplIG1lbWJlcnNcclxuICAgICAgICB0aGlzLl9kYXRhTW9kZWwgPSBkYXRhTW9kZWw7XHJcbiAgICAgICAgdGhpcy5fY29tcG9uZW50UHJvdmlkZXIgPSBuZXcgTWFwcENvY2twaXRDb21wb25lbnRQcm92aWRlcih0aGlzKTtcclxuICAgICAgICB0aGlzLl90cmFjZVByb3ZpZGVyID0gbmV3IE1hcHBDb2NrcGl0VHJhY2VQcm92aWRlcih0aGlzKTtcclxuICAgICAgICB0aGlzLl9tb25pdG9yaW5nUHJvdmlkZXIgPSBuZXcgTWFwcENvY2twaXREaWFnbm9zdGljTW9uaXRvcmluZ1Byb3ZpZGVyKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX2NvbW1vbkluZm9Qcm92aWRlciA9IE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyLmdldEluc3RhbmNlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZXZlbnRPYnNlcnZhYmxlc0NoYW5nZWQgPSBuZXcgRXZlbnRPYnNlcnZhYmxlc0NoYW5nZWQoKTtcclxuXHJcbiAgICAgICAgLy8gYXR0YWNoIGV2ZW50cyBcclxuICAgICAgICB0aGlzLl9tb25pdG9yaW5nUHJvdmlkZXIuZXZlbnRPYnNlcnZlZEl0ZW1zQ2hhbmdlZC5hdHRhY2godGhpcy5fb2JzZXJ2ZWRJdGVtc0NoYW5nZWRIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2UgdGhlIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGRpc3Bvc2UoKXtcclxuICAgICAgICAvLyBkZXRhY2ggZXZlbnRzIFxyXG4gICAgICAgIHRoaXMuX21vbml0b3JpbmdQcm92aWRlci5ldmVudE9ic2VydmVkSXRlbXNDaGFuZ2VkLmRldGFjaCh0aGlzLl9vYnNlcnZlZEl0ZW1zQ2hhbmdlZEhhbmRsZXIpO1xyXG5cclxuICAgICAgICAvLyB0ZXJtaW5hdGUgdGhlIGN1cnJlbnQgc2Vzc2lvblxyXG4gICAgICAgIChhc3luYyAoKT0+e1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmVuZFNlc3Npb24oKTtcclxuICAgICAgICB9KSgpO1xyXG5cclxuICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgY29tcG9uZW50IHByb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7TWFwcENvY2twaXRUcmFjZVByb3ZpZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgY29tcG9uZW50UHJvdmlkZXIoKSA6IE1hcHBDb2NrcGl0Q29tcG9uZW50UHJvdmlkZXIge1xyXG4gICAgICAgIHJldHVybiAgdGhpcy5fY29tcG9uZW50UHJvdmlkZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBkYXRhIG1vZGVsXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7TWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWx9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBtb2RlbCgpIDogTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhTW9kZWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSB0cmFjZSBwcm92aWRlclxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge01hcHBDb2NrcGl0VHJhY2VQcm92aWRlcn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHRyYWNlUHJvdmlkZXIoKSA6IE1hcHBDb2NrcGl0VHJhY2VQcm92aWRlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RyYWNlUHJvdmlkZXI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgY3VycmVudCBzZXNzaW9uIGlkXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgc2Vzc2lvbklkKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nlc3Npb25JZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGVmZmVjdGl2ZSBuYW1lc3BhY2UgaW5kZXhcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBuYW1lc3BhY2VJbmRleCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lc3BhY2VJbmRleDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIG1hcHAgY29ja3BpdCBuYW1lc3BhY2VcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBuYW1lc3BhY2UoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gIE9wY1VhUmVzdFNlcnZpY2VzLm1hcHBDb2NrcGl0TmFtZXNwYWNlUHJlZml4ICsgdGhpcy5fbmFtZXNwYWNlSW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzdGFydHMgYSBkaWFnbm9zdGljIHNlc3Npb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGJlZ2luU2Vzc2lvbigpIHtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuXHJcbiAgICAgICAgICAgIC8vIGdldCBvcGMgdWEgYWRkcmVzc1xyXG4gICAgICAgICAgICBhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5yZWFkT3BjVWFMb2NhbElwKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBhdXRoZW50aWNhdGUgXHJcbiAgICAgICAgICAgIGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLmF1dGhlbnRpY2F0ZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gY3JlYXRlIGEgc29ja2V0IGNvbm5lY3Rpb24gZm9yIHJlY2VpdmluZyBvcGMtdWEgZXZlbnRzXHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX21vbml0b3JpbmdQcm92aWRlci5jcmVhdGVPcGNVYVNvY2tldCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXI6IGNyZWF0ZWQgd2ViIHNvY2tldCAnKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhIHNlc3Npb25cclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5jcmVhdGVTZXNzaW9uKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXI6IGNyZWF0ZWQgc2Vzc2lvbjogJW9cIiwgdGhpcy5zZXNzaW9uSWQpO1xyXG5cclxuICAgICAgICAgICAgLy8gcmVhZCB0aGUgbmFtZXNwYWNlIGluZGV4IGZvciBmdXJ0aGVyIGFjY2Vzc1xyXG4gICAgICAgICAgICB0aGlzLl9uYW1lc3BhY2VJbmRleCA9IGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLmdldE5hbWVzcGFjZUluZGV4KHRoaXMuc2Vzc2lvbklkKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlcjogZ290IG5hbWVzcGFjZSBpbmRleDogJW9cIiwgdGhpcy5fbmFtZXNwYWNlSW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgLy8gaW5pdGlhbGl6ZSBjb21tb24gaW5mbyBwcm92aWRlciBcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5fY29tbW9uSW5mb1Byb3ZpZGVyLmluaXRpYWxpemUodGhpcy5zZXNzaW9uSWQsIHRoaXMuX25hbWVzcGFjZUluZGV4KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNvbm5lY3RzIHRvIHRoZSB0ZXh0IHN5c3RlbVxyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmNvbm5lY3RUZXh0U3lzdGVtKCk7XHJcblxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25uZWN0cyBhbmQgaW5pdGlhbGl6ZXMgdGhlIHRleHRzeXN0ZW1cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgY29ubmVjdFRleHRTeXN0ZW0oKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgYXdhaXQgU2VydmljZXMudGV4dFN5c3RlbS5jb25uZWN0VGV4dFN5c3RlbSgpO1xyXG5cclxuICAgICAgICAvLyAvLyBicm93c2UgdGhlIHRleHRzeXN0ZW0ganVzdCBmb3IgdGVzdCBhbmQgZXhlbXBsYXJpYyBwdXJwb3Nlc1xyXG4gICAgICAgIC8vIGF3YWl0IHRoaXMuYnJvd3NlVGV4dFN5c3RlbSgpO1xyXG5cclxuICAgICAgICAvLyAvLyBicm93c2UgdGhlIHRleHRwcm92aWRlciBqdXN0IGZvciB0ZXN0IGFuZCBleGVtcGxhcmljIHB1cnBvc2VzXHJcbiAgICAgICAgLy8gYXdhaXQgdGhpcy5icm93c2VUZXh0UHJvdmlkZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAvKipcclxuICAgIC8vICAqIEp1c3QgYSB0ZXN0IG1ldGhvZCBmb3IgYnJvd3NpbmcgdGhlIHRleHQgc3lzdGVtXHJcbiAgICAvLyAgKlxyXG4gICAgLy8gICogQHByaXZhdGVcclxuICAgIC8vICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlclxyXG4gICAgLy8gICovXHJcbiAgICAvLyBwcml2YXRlIGFzeW5jIGJyb3dzZVRleHRTeXN0ZW0oKSB7XHJcblxyXG4gICAgLy8gICAgIC8vIHJlYWQgdGhlIGRlZmF1bHQgbGFuZ3VhZ2VcclxuICAgIC8vICAgICBjb25zdCBkZWZhdWx0TGFuZ3VhZ2VJZCA9IGF3YWl0IFNlcnZpY2VzLnRleHRTeXN0ZW0uZ2V0RGVmYXVsdExhbmd1YWdlKCk7XHJcblxyXG4gICAgLy8gICAgIC8vIHJlYWQgYWxsIGF2YWlsYWJsZSBsYW5ndWFnZXNcclxuICAgIC8vICAgICBjb25zdCBsYW5ndWFnZXMgPSBhd2FpdCBTZXJ2aWNlcy50ZXh0U3lzdGVtLmdldExhbmd1YWdlcygpO1xyXG5cclxuICAgIC8vICAgICAvLyByZWFkIG5hbWVzcGFjZSB0ZXh0IHJlc291cmNlc1xyXG4gICAgLy8gICAgIGNvbnN0IG5hbWVzcGFjZVRleHRJdGVtc01hcCA9IGF3YWl0IFNlcnZpY2VzLnRleHRTeXN0ZW0uZ2V0TmFtZXNwYWNlVGV4dEl0ZW1zKGRlZmF1bHRMYW5ndWFnZUlkLFwiQlIvR01DL0VudW0vQWNwUGFySWREZXNjcmlwdGlvblwiKTtcclxuXHJcbiAgICAvLyAgICAgLy8gZ2V0IG9uZSB0ZXh0IGZyb20gdGhlIG1hcFxyXG4gICAgLy8gICAgIGNvbnN0IHBhcklkVGV4dEZyb21NYXAgPSBuYW1lc3BhY2VUZXh0SXRlbXNNYXAuZ2V0KFwiMTExXCIpO1xyXG5cclxuICAgIC8vICAgICAvLyByZWFkIHNpbmdsZSBzcGVjaWZpYyB0ZXh0IGZyb20gbmFtZXNwYWNlXHJcbiAgICAvLyAgICAgY29uc3QgcGFySWRUZXh0ID0gYXdhaXQgU2VydmljZXMudGV4dFN5c3RlbS5nZXRUZXh0KGRlZmF1bHRMYW5ndWFnZUlkLFwiQlIvR01DL0VudW0vQWNwUGFySWREZXNjcmlwdGlvblwiLFwiMTExXCIpO1xyXG5cclxuICAgIC8vICAgICAvLyAvLyByZWFkIGFsbCB0ZXh0IGl0ZW1zIG9mIHRoZSBuYW1lc3BhY2UgcGVyIHNpbmdsZSBhY2Nlc3NcclxuICAgIC8vICAgICAvLyAvLyByZXRyaWV2ZSB0aGUgdGV4dCBrZXlzXHJcbiAgICAvLyAgICAgLy8gY29uc3QgdGV4dEl0ZW1JZHMgPSBPYmplY3Qua2V5cyhuYW1lc3BhY2VUZXh0SXRlbXMpO1xyXG4gICAgLy8gICAgIC8vIGxldCByZXRyaWV2ZWROc1RleHRJdGVtcyAgPSB7fTtcclxuICAgIC8vICAgICAvLyAvLyBpdGVyYXRlIGFsbCB0ZXh0IGtleXMgYW5kIGdldCB0aGUgY29ycmVwb25kaW5nIHRleHRcclxuICAgIC8vICAgICAvLyB0ZXh0SXRlbUlkcy5mb3JFYWNoKGFzeW5jIHRleHRJdGVtSWQgPT4ge1xyXG4gICAgLy8gICAgIC8vICAgICBjb25zdCBuc1RleHQgPSBhd2FpdCBTZXJ2aWNlcy50ZXh0U3lzdGVtLmdldFRleHQoZGVmYXVsdExhbmd1YWdlSWQsXCJCUi9HTUMvRW51bS9BY3BQYXJJZERlc2NyaXB0aW9uXCIsdGV4dEl0ZW1JZCk7XHJcbiAgICAvLyAgICAgLy8gICAgIHJldHJpZXZlZE5zVGV4dEl0ZW1zW3RleHRJdGVtSWRdID0gbnNUZXh0O1xyXG4gICAgLy8gICAgIC8vIH0pOyBcclxuXHJcbiAgICAvLyAgICAgY29uc29sZS5sb2cobGFuZ3VhZ2VzKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBwcml2YXRlIF90ZXh0OiBUZXh0SXRlbSA9IG5ldyBUZXh0SXRlbSgpO1xyXG5cclxuICAgIC8vIHByaXZhdGUgX3VwbG9hZGVkTmFtZXNwYWNlc0ZpbmlzaGVkSGFuZGxlciA9IChzZW5kZXIsIGFyZ3MpPT50aGlzLm9uVXBsb2FkZWROYW1lc3BhY2VzRmluaXNoZWQoc2VuZGVyLCBhcmdzKTtcclxuXHJcbiAgICAvLyBwcml2YXRlIG9uVXBsb2FkZWROYW1lc3BhY2VzRmluaXNoZWQoc2VuZGVyOiBJVGV4dFByb3ZpZGVyLCBhcmdzOiBFdmVudE5hbWVzcGFjZXNMb2FkZWRSZXNwb25zZSkge1xyXG4gICAgLy8gICAgIGlmKGFyZ3Mubm90Rm91bmROYW1lc3BhY2VzLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgLy8gICAgICAgICAvLyByZWFjdCB0byBub3QgYWxsIG5hbWVzcGFjZXMgZm91bmRcclxuICAgIC8vICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAvLyAgICAgbGV0IGlucHV0QXJncyA9IG5ldyBGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50TGlzdCgpO1xyXG4gICAgLy8gICAgIGlucHV0QXJncy5wdXNoKG5ldyBGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50U3RyaW5nKFwiwrBDXCIpKTtcclxuICAgIC8vICAgICBpbnB1dEFyZ3MucHVzaChuZXcgRm9ybWF0dGVySW5wdXRBcmd1bWVudEZsb2F0KDIzLjEyMDAwKSk7XHJcblxyXG4gICAgLy8gICAgIHRoaXMuX3RleHQgPSBzZW5kZXIuZ2V0Rm9ybWF0dGVkVGV4dChcIkJSL0V2ZW50TG9nXCIsIFwiLTIxNDEwODU2NTRcIiwgaW5wdXRBcmdzKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBwcml2YXRlIGFzeW5jIGJyb3dzZVRleHRQcm92aWRlcigpIHtcclxuICAgICAgICBcclxuICAgIC8vICAgICBsZXQgY29tcG9uZW50RmFjdG9yeTogSUNvbXBvbmVudEZhY3RvcnkgPSBDb21wb25lbnRGYWN0b3J5LmdldEluc3RhbmNlKCk7XHJcblxyXG4gICAgLy8gICAgIGxldCB0ZXh0UHJvdmlkZXI6IElUZXh0UHJvdmlkZXIgPSBjb21wb25lbnRGYWN0b3J5LmNyZWF0ZShuZXcgQ29tcG9uZW50RGVmaW5pdGlvbihcIlRleHRQcm92aWRlclwiLCBcIlRleHRQcm92aWRlclwiLCBcInRleHRQcm92aWRlckRlZmluaXRpb25cIiksIHVuZGVmaW5lZCkgYXMgSVRleHRQcm92aWRlcjtcclxuXHJcbiAgICAvLyAgICAgY29uc3QgZGVmYXVsdExhbmd1YWdlSWQgPSBhd2FpdCBTZXJ2aWNlcy50ZXh0U3lzdGVtLmdldERlZmF1bHRMYW5ndWFnZSgpO1xyXG5cclxuICAgIC8vICAgICB0ZXh0UHJvdmlkZXIuc2V0U2VsZWN0ZWRMYW5ndWFnZShkZWZhdWx0TGFuZ3VhZ2VJZCk7XHJcblxyXG4gICAgLy8gICAgIGxldCBuYW1lc3BhY2VzOiBBcnJheTxzdHJpbmc+ID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuICAgIC8vICAgICBuYW1lc3BhY2VzLnB1c2goXCJCUi9HTUMvRW51bS9BY3BQYXJJZERlc2NyaXB0aW9uXCIpO1xyXG4gICAgLy8gICAgIG5hbWVzcGFjZXMucHVzaChcIkJSL0V2ZW50TG9nXCIpO1xyXG4gICAgICBcclxuICAgIC8vICAgICB0ZXh0UHJvdmlkZXIuZXZlbnROYW1lc3BhY2VzTG9hZGVkLmF0dGFjaCh0aGlzLl91cGxvYWRlZE5hbWVzcGFjZXNGaW5pc2hlZEhhbmRsZXIpO1xyXG4gICAgICAgIFxyXG4gICAgLy8gICAgIHRleHRQcm92aWRlci5sb2FkRnVsbE5hbWVzcGFjZXNSZXF1ZXN0KG5hbWVzcGFjZXMpO1xyXG5cclxuICAgIC8vICAgICB0ZXh0UHJvdmlkZXIuZXZlbnROYW1lc3BhY2VzTG9hZGVkLmRldGFjaCh0aGlzLl91cGxvYWRlZE5hbWVzcGFjZXNGaW5pc2hlZEhhbmRsZXIpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBzZXNzaW9uIGlmIG5vdCBhbHJlYWR5IGF2YWlsYWJsZS4gXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGNyZWF0ZVNlc3Npb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3Nlc3Npb25JZCA9PT0gLTEpIHsgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBuZXdTZXNzaW9uSWQgPSBhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5jcmVhdGVTZXNzaW9uKCk7ICAgIFxyXG4gICAgICAgICAgICB0aGlzLl9zZXNzaW9uSWQgPSBuZXdTZXNzaW9uSWQ7ICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0ZXJtaW5hdGVzIGEgZGlhZ25vc3RpYyBzZXNzaW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBhc3luYyBlbmRTZXNzaW9uKCkge1xyXG5cclxuICAgICAgICB0aGlzLl9tb25pdG9yaW5nUHJvdmlkZXIuY2xvc2UoKTtcclxuXHJcbiAgICAgICAgYXdhaXQgT3BjVWFSZXN0U2VydmljZXMuZGVsZXRlU2Vzc2lvbih0aGlzLnNlc3Npb25JZCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3Nlc3Npb25JZCA9IC0xO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlzIHRoZSBjb25uZWN0aW9uIHRvIHRoZSB0YXJnZXQgaXMgc3RpbGwgdmFsaWRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBhc3luYyBjaGVja1RhcmdldENvbm5lY3Rpb24oKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBsZXQgY29ubmVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gd2UgYWNjZXNzIHRoZSBtYXBwIGNvY2twaXQgcm9vdHMgZGVzY3JpcHRpb24gYXRyaWJ1dGUgYXMgbGl2ZSBjaGVjay4gVGhlIGNvbm5lY3Rpb24gaXMgdmFsaWQgaWYgdGhlIGF0dHJpYnV0ZSBjb3VsZCBiZSByZWFkIHN1Y2Nlc3NmdWxseS5cclxuICAgICAgICAgICAgYXdhaXQgT3BjVWFSZXN0U2VydmljZXMucmVhZE5vZGVBdHRyaWJ1dGUodGhpcy5zZXNzaW9uSWQsIHRoaXMubmFtZXNwYWNlICsgXCI7XCIgKyBPcGNVYVJlc3RTZXJ2aWNlcy5tYXBwQ29ja3BpdFJvb3ROb2RlSWQsIE9wY1VhQXR0cmlidXRlLkRFU0NSSVBUSU9OKTtcclxuICAgICAgICAgICAgY29ubmVjdGVkID0gdHJ1ZTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25uZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbm5lY3RlZDtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9naW4gbmV3IHVzZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhc3N3b3JkXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgYXN5bmMgY2hhbmdlVXNlcih1c2VySW5mbzp7fSkge1xyXG4gICAgICAgIHJldHVybiBhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5jaGFuZ2VVc2VyKHRoaXMuc2Vzc2lvbklkLCB1c2VySW5mbyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBicm93c2VzIHRoZSBtZXRhIGluZm8gZm9yIGEgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50fSBtYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBhc3luYyBicm93c2VNZXRhSW5mbyhtYXBwQ29ja3BpdENvbXBvbmVudDogTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudCk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgdmFyIG1ldGFJbmZvID0gYXdhaXQgdGhpcy5fY29tcG9uZW50UHJvdmlkZXIuYnJvd3NlQ29tcG9uZW50TWV0YUluZm8obWFwcENvY2twaXRDb21wb25lbnQpO1xyXG4gICAgICAgIHJldHVybiBtZXRhSW5mbztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBicm93c2VzIHRoZSBwYXJhbWV0ZXJzIG9mIGEgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50fSBtYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8TW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdPn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBhc3luYyBicm93c2VQYXJhbWV0ZXJzKG1hcHBDb2NrcGl0Q29tcG9uZW50OiBNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50KTogUHJvbWlzZTxNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10+IHtcclxuICAgICAgICB2YXIgbWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJzID0gYXdhaXQgdGhpcy5fY29tcG9uZW50UHJvdmlkZXIuYnJvd3NlQ29tcG9uZW50UGFyYW1ldGVycyhtYXBwQ29ja3BpdENvbXBvbmVudCk7XHJcblxyXG4gICAgICAgIHJldHVybiBtYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB1cGRhdGVzIHBhcmFtZXRlciBkYXRhIHR5cGVzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IHBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgYXN5bmMgdXBkYXRlUGFyYW1ldGVyRGF0YVR5cGVzKHBhcmFtZXRlcnM6IE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5fY29tcG9uZW50UHJvdmlkZXIudXBkYXRlUGFyYW1ldGVyRGF0YVR5cGVzKHBhcmFtZXRlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdXBkYXRlcyBtZXRob2QgcGFyYW1ldGVyIGRhdGEgdHlwZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXX0gbWV0aG9kc1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBhc3luYyB1cGRhdGVNZXRob2RQYXJhbWV0ZXJEYXRhVHlwZXMobWV0aG9kczogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXSk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5fY29tcG9uZW50UHJvdmlkZXIudXBkYXRlTWV0aG9kUGFyYW1ldGVyRGF0YVR5cGVzKG1ldGhvZHMpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlYWRzIGEgbGlzdCBvZiBwYXJhbWV0ZXIgdmFsdWVzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPn0gY29tcG9uZW50UGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8TW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIHJlYWRQYXJhbWV0ZXJWYWx1ZXMoY29tcG9uZW50UGFyYW1ldGVyczogQXJyYXk8TW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4pOiBQcm9taXNlPEFycmF5PE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+PiB7XHJcblxyXG4gICAgICAgIGxldCByZXF1ZXN0c1JlYWRQYXJhbWV0ZXJWYWx1ZXMgPSBjb21wb25lbnRQYXJhbWV0ZXJzLm1hcCgoY29tcG9uZW50UGFyYW1ldGVyKSA9PiB7IHJldHVybiB0aGlzLl9jb21wb25lbnRQcm92aWRlci5yZWFkQ29tcG9uZW50UGFyYW1ldGVyVmFsdWUoY29tcG9uZW50UGFyYW1ldGVyKSB9KTtcclxuXHJcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwocmVxdWVzdHNSZWFkUGFyYW1ldGVyVmFsdWVzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudFBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcml0ZXMgdGhlIHBhcmFtZXRlcnMgdmFsdWVzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IGNvbXBvbmVudFBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIHdyaXRlUGFyYW1ldGVyVmFsdWVzKGNvbXBvbmVudFBhcmFtZXRlcnM6IE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHJlcXVlc3RzV3JpdGVQYXJhbWV0ZXJWYWx1ZXMgPSBjb21wb25lbnRQYXJhbWV0ZXJzLm1hcCgoY29tcG9uZW50UGFyYW1ldGVyKSA9PiB7IHJldHVybiB0aGlzLl9jb21wb25lbnRQcm92aWRlci53cml0ZUNvbXBvbmVudFBhcmFtZXRlclZhbHVlKGNvbXBvbmVudFBhcmFtZXRlcikgfSk7XHJcblxyXG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKHJlcXVlc3RzV3JpdGVQYXJhbWV0ZXJWYWx1ZXMpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29tcG9uZW50UGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBvYnNlcnZlcyB0aGUgbGlzdCBvZiBpdGVtcyBmb3IgdmFsdWUgY2hhbmdlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8TW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj59IGNvbXBvbmVudFBhcmFtZXRlcnNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBvYnNlcnZlQ29tcG9uZW50TW9kZWxJdGVtcyhvYnNlcnZlcjogYW55LCBjb21wb25lbnRQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW1bXSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX21vbml0b3JpbmdQcm92aWRlci5vYnNlcnZlQ29tcG9uZW50TW9kZWxJdGVtcyhvYnNlcnZlciwgdGhpcy5zZXNzaW9uSWQsIGNvbXBvbmVudFBhcmFtZXRlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVW5vYnNlcnZlcyB0aGUgcGFzc2VkIHBhcmFtZXRlcnMuIFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gb2JzZXJ2ZXJcclxuICAgICAqIEBwYXJhbSB7TW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBvYnNlcnZhYmxlUGFyYW1ldGVyc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHVub2JzZXJ2ZUNvbXBvbmVudE1vZGVsSXRlbXMob2JzZXJ2ZXI6IGFueSwgb2JzZXJ2YWJsZVBhcmFtZXRlcnM6IE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSwgc3VzcGVuZDpib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fbW9uaXRvcmluZ1Byb3ZpZGVyLnVub2JzZXJ2ZUNvbXBvbmVudE1vZGVsSXRlbXMob2JzZXJ2ZXIsIHRoaXMuc2Vzc2lvbklkLCBvYnNlcnZhYmxlUGFyYW1ldGVycyxzdXNwZW5kKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGhhbmRsZXMgY2hhbmdlIG5vdGlmaWNhdGlvbnMgZnJvbSBvYnNlcnZhYmxlc1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGhhbmRsZU9ic2VydmFibGVDaGFuZ2VkKHNlbmRlcjogYW55LCBjaGFuZ2VkRXZlbnRBcmdzOiBFdmVudE9ic2VydmVkSXRlbXNDaGFuZ2VkQXJncyk6IGFueSB7XHJcbiAgICAgICAgdGhpcy5ldmVudE9ic2VydmFibGVzQ2hhbmdlZC5yYWlzZSh0aGlzLCBjaGFuZ2VkRXZlbnRBcmdzKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIHdyaXRlcyBhIHBhcmFtZXRlcnMgdmFsdWVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJ9IGNvbXBvbmVudFBhcmFtZXRlclxyXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZVxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBhc3luYyB3cml0ZVBhcmFtZXRlclZhbHVlKGNvbXBvbmVudFBhcmFtZXRlcjogTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlciwgdmFsdWU6IGFueSk6IFByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgIC8vIEluaXRpYXRlIGxvYWRpbmcgdHJhY2UgZGF0YVxyXG4gICAgICAgIHZhciBjb21wb25lbnRQYXJhbWV0ZXJWYWx1ZSA9IGF3YWl0IHRoaXMuX2NvbXBvbmVudFByb3ZpZGVyLndyaXRlQ29tcG9uZW50UGFyYW1ldGVyVmFsdWUoY29tcG9uZW50UGFyYW1ldGVyKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudFBhcmFtZXRlclZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYnJvd3NlcyB0aGUgbWV0aG9kcyBvZiBhIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnR9IG1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBhc3luYyBicm93c2VNZXRob2RzKG1hcHBDb2NrcGl0Q29tcG9uZW50OiBNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50KTogUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgdmFyIG1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kcyA9IGF3YWl0IHRoaXMuX2NvbXBvbmVudFByb3ZpZGVyLmJyb3dzZUNvbXBvbmVudE1ldGhvZHMobWFwcENvY2twaXRDb21wb25lbnQpO1xyXG5cclxuICAgICAgICByZXR1cm4gbWFwcENvY2twaXRDb21wb25lbnRNZXRob2RzO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGJyb3dzZU1ldGhvZFBhcmFtZXRlcnMobWFwcENvY2twaXRDb21wb25lbnRNZXRob2RzOiBNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW10pOiBQcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICB2YXIgbWFwcENvY2twaXRDb21wb25lbnRNZXRob2RQYXJhbWV0ZXJzID0gYXdhaXQgdGhpcy5fY29tcG9uZW50UHJvdmlkZXIuYnJvd3NlQ29tcG9uZW50TWV0aG9kUGFyYW1ldGVycyhtYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZHMpO1xyXG5cclxuICAgICAgICByZXR1cm4gbWFwcENvY2twaXRDb21wb25lbnRNZXRob2RQYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZXhlY3V0ZXMgYSBjb21wb25lbnQgbWV0aG9kXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBtYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgYXN5bmMgZXhlY3V0ZUNvbXBvbmVudE1ldGhvZChtYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZDogTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX2NvbXBvbmVudFByb3ZpZGVyLmV4ZWN1dGVDb21wb25lbnRNZXRob2QobWFwcENvY2twaXRDb21wb25lbnRNZXRob2QpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQnJvd3NlcyBmb3IgdGhlIHNlcnZpY2Ugbm9kZSBhbmQgY3JlYXRlcyBhIGNvbXBvbmVudCBzZXJ2aWNlIG9iamVjdFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudH0gbWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPE1hcHBDb2NrcGl0Q29tcG9uZW50U2VydmljZT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgYXN5bmMgYnJvd3NlU2VydmljZUNoYW5uZWwobWFwcENvY2twaXRDb21wb25lbnQ6IE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnQpOiBQcm9taXNlPE1hcHBDb2NrcGl0Q29tcG9uZW50U2VydmljZXxudWxsPiB7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgY29tcG9uZW50IHNlcnZpY2Ugb2JqZWN0XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudFNlcnZpY2UgPSBuZXcgTWFwcENvY2twaXRDb21wb25lbnRTZXJ2aWNlKCk7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIGdldCB0aGUgY29tcG9uZW50cyBub2Rlcy5cclxuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50Tm9kZXMgPSBhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5icm93c2VOb2Rlcyh0aGlzLnNlc3Npb25JZCwgbWFwcENvY2twaXRDb21wb25lbnQuaWQpO1xyXG5cclxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHNlcnZpY2Ugbm9kZSBpcyBhdmFpbGFibGVcclxuICAgICAgICAgICAgaWYgKGNvbXBvbmVudE5vZGVzICYmIGNvbXBvbmVudE5vZGVzLmZpbmQoKG5vZGUpID0+IHsgcmV0dXJuIG5vZGUuYnJvd3NlTmFtZSA9PT0gT3BjVWFSZXN0U2VydmljZXMuc2VydmljZUNoYW5uZWxOb2RlSWQgfSkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGNvbXBvbmVudHMgc2VydmljZSBub2RlIGlkXHJcbiAgICAgICAgICAgICAgICBjb25zdCBzZXJ2aWNlTm9kZUlkID0gbWFwcENvY2twaXRDb21wb25lbnQuaWQgKyBcIi5cIiArIE9wY1VhUmVzdFNlcnZpY2VzLnNlcnZpY2VDaGFubmVsTm9kZUlkO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGJyb3dzZSBhbmQgZ2V0IHRoZSBpbmZvIGNoYW5uZWwgcHJvcGVydHlcclxuICAgICAgICAgICAgICAgIGxldCBzZXJ2aWNlUGFyYW1ldGVycyA9IGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLmJyb3dzZU5vZGVQYXJhbWV0ZXJzKHRoaXMuc2Vzc2lvbklkLHNlcnZpY2VOb2RlSWQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlcnZpY2VDaGFubmVsID0gc2VydmljZVBhcmFtZXRlcnMuZmlsdGVyKChwYXJhbWV0ZXIpID0+IHsgcmV0dXJuIHBhcmFtZXRlci5icm93c2VOYW1lID09PSBcImluZm9DaGFubmVsXCIgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VydmljZUNoYW5uZWwubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50U2VydmljZS5pbmZvQ2hhbm5lbCA9IG5ldyBNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyKG1hcHBDb2NrcGl0Q29tcG9uZW50LCBzZXJ2aWNlQ2hhbm5lbFswXS5kaXNwbGF5TmFtZSwgc2VydmljZUNoYW5uZWxbMF0pOztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBicm93c2UgYW5kIGdldCB0aGUgcmVxdWVzdCBtZXRob2RcclxuICAgICAgICAgICAgICAgIGxldCBzZXJ2aWNlTWV0aG9kcyA9IGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLmJyb3dzZU5vZGVNZXRob2RzKHRoaXMuc2Vzc2lvbklkLCBzZXJ2aWNlTm9kZUlkKTtcclxuICAgICAgICAgICAgICAgIGxldCBzZXJ2aWNlUmVxdWVzdCA9IHNlcnZpY2VNZXRob2RzLmZpbHRlcigocGFyYW1ldGVyKSA9PiB7IHJldHVybiBwYXJhbWV0ZXIuYnJvd3NlTmFtZSA9PT0gXCJyZXF1ZXN0XCIgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VydmljZVJlcXVlc3QubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50U2VydmljZS5yZXF1ZXN0ID0gbmV3IE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QobWFwcENvY2twaXRDb21wb25lbnQsIHNlcnZpY2VSZXF1ZXN0WzBdLmRpc3BsYXlOYW1lLCBzZXJ2aWNlUmVxdWVzdFswXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb21wb25lbnRTZXJ2aWNlLnJlcXVlc3QgJiYgY29tcG9uZW50U2VydmljZS5pbmZvQ2hhbm5lbCA/IGNvbXBvbmVudFNlcnZpY2UgOiBudWxsO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IHsgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIgfTsiXX0=