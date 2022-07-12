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
define(["require", "exports", "../../framework/property", "../../framework/command", "./mappCockpitComponentReflection", "../../common/numericHelper", "../../widgets/methodParameterListWidget/parameterFilter", "../common/stateExpression/watchableStateExpression"], function (require, exports, property_1, command_1, mappCockpitComponentReflection_1, numericHelper_1, parameterFilter_1, watchableStateExpression_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Implements the base memebers for managing component model members.
     *
     * @class MappCockpitComponentItem
    /**
     *
     *
     * @class MappCockpitComponentItem
     */
    var MappCockpitComponentItem = /** @class */ (function () {
        /**
         * creates an instance of MappCockpitComponentItem.
         * @param {MappCockpitComponentItem} component
         * @param {string} name
         * @param {*} reference
         * @memberof MappCockpitComponentItem
         */
        function MappCockpitComponentItem(component, name, reference) {
            // Holds the items value
            // protected _value: any = "";
            // holds subitems if any
            this._items = [];
            this._valueSource = property_1.Property.create("");
            // holds the user roles
            this._writeAccess = property_1.Property.create(false);
            // specifies a response delaget for write requets
            this._reflectedWriteResponseDelegate = undefined;
            this._reference = reference;
            this._displayName = name;
            this._component = component;
        }
        Object.defineProperty(MappCockpitComponentItem.prototype, "displayName", {
            /**
             * Returns the items display name
             *
             * @readonly
             * @type {string}
             * @memberof MappCockpitComponentItem
             */
            get: function () {
                return this._displayName;
            },
            set: function (displayName) {
                this._displayName = displayName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "browseName", {
            get: function () {
                return this._reference.browseName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "name", {
            get: function () {
                return this._reference.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "component", {
            get: function () {
                return this._component;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "writeAccess", {
            /**
             * Gets the current user roles
             *
             * @readonly
             * @type {string[]}
             * @memberof MappCockpitComponentDataModel
             */
            get: function () {
                return this._writeAccess;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "id", {
            /**
             * Returns the items id
             *
             * @readonly
             * @type {string}
             * @memberof MappCockpitComponentItem
             */
            get: function () {
                return this._reference.nodeId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "value", {
            /**
             * sets/gets the items value object
             *
             * @readonly
             * @type {(MappCockpitComponentParameterValue|undefined)}
             * @memberof MappCockpitComponentParameter
             */
            get: function () {
                return this._valueSource.value;
            },
            set: function (value) {
                this._valueSource.value = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "valueSource", {
            get: function () {
                return this._valueSource;
            },
            set: function (valueSource) {
                this._valueSource = valueSource;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "reflectedWriteResponseDelegate", {
            /**
             * Gets the delegate for observing write respomses
             *
             * @memberof MappCockpitComponentItem
             */
            get: function () {
                return this._reflectedWriteResponseDelegate;
            },
            /**
             * Sets a delegate for observing write responses
             *
             * @memberof MappCockpitComponentItem
             */
            set: function (reflectedWriteResponseDelegate) {
                this._reflectedWriteResponseDelegate = reflectedWriteResponseDelegate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "displayValue", {
            /**
             * gets the value as formatted string if appropiate
             *
             * @type {*}
             * @memberof MappCockpitComponentItem
             */
            get: function () {
                return this._valueSource.toString();
            },
            set: function (inputValue) {
                this._valueSource.value = inputValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "dataTypeId", {
            get: function () {
                return this._reference.dataType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "items", {
            /**
             * gets the subitems if any
             *
             * @readonly
             * @type {Array<MappCockpitComponentItem>}
             * @memberof MappCockpitComponentItem
             */
            get: function () {
                return this._items;
            },
            enumerable: true,
            configurable: true
        });
        return MappCockpitComponentItem;
    }());
    exports.MappCockpitComponentItem = MappCockpitComponentItem;
    /**
     * The class represents a component to be used within mapp cockpit UI
     *
     * @class MappCockpitComponent
     */
    var MappCockpitComponent = /** @class */ (function (_super) {
        __extends(MappCockpitComponent, _super);
        function MappCockpitComponent() {
            /**
             * Holds the component methods
             *
             * @protected
             * @type {Array<MappCockpitComponentMethod>}
             * @memberof MappCockpitComponent
             */
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // Holds the component methods
            _this._componentService = null;
            _this._methods = [];
            _this._quickCommands = [];
            _this._userMethods = [];
            // Holds the component parameters
            _this._parameters = [];
            _this._watchableParameters = [];
            _this._watchableStateParameters = [];
            _this._configurationParameters = [];
            _this._messageParameters = [];
            _this._metaData = undefined;
            _this._parametersSource = property_1.Property.create([], function (dataLink) { _this.requestReadComponentParameters(dataLink); });
            _this._messageParametersSource = property_1.Property.create([], function (dataLink) { _this.requestReadComponentParameters(dataLink); });
            _this._watchableParametersSource = property_1.Property.create([], function (dataLink) { _this.requestReadComponentParameters(dataLink); });
            _this._configurationParametersSource = property_1.Property.create([], function (dataLink) { _this.requestReadComponentParameters(dataLink); });
            _this._methodsSource = property_1.Property.create([], function (dataLink) { _this.requestReadComponentMethods(dataLink); });
            _this._commandConnect = command_1.Command.create(_this, _this.executeCommandConnect());
            return _this;
        }
        Object.defineProperty(MappCockpitComponent.prototype, "commandConnectComponent", {
            /**
             * sets/gets the parameters of the component
             *
             * @readonly
             * @type {Array<MappCockpitComponentParameter>}
             * @memberof MappCockpitComponent
             */
            get: function () {
                return this._commandConnect;
            },
            enumerable: true,
            configurable: true
        });
        MappCockpitComponent.prototype.executeCommandConnect = function () {
            var _this = this;
            return function (commandPars, commandResponse) { return __awaiter(_this, void 0, void 0, function () {
                var model, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            model = this.model;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            if (!model) return [3 /*break*/, 3];
                            // read parameter component set
                            return [4 /*yield*/, model.browseComponent(this)];
                        case 2:
                            // read parameter component set
                            _a.sent();
                            // intitially update the components access rights
                            this.updateComponentAccessRights(model);
                            // watch access right changes
                            this.observeComponentAccessRights(model);
                            // update the data link
                            commandResponse.executed();
                            _a.label = 3;
                        case 3: return [3 /*break*/, 5];
                        case 4:
                            error_1 = _a.sent();
                            commandResponse.rejected(error_1);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            }); };
        };
        /**
         * Observes changes of the access rights
         *
         * @private
         * @param {MappCockpitComponentDataModel} mainModel
         * @memberof MappCockpitComponent
         */
        MappCockpitComponent.prototype.observeComponentAccessRights = function (mainModel) {
            var _this = this;
            mainModel.userRoles.changed(function (userRoles) {
                _this.updateComponentAccessRights(mainModel);
            });
        };
        /**
         * Updates the componentrs access rights
         *
         * @private
         * @param {MappCockpitComponentDataModel} mainModel
         * @memberof MappCockpitComponent
         */
        MappCockpitComponent.prototype.updateComponentAccessRights = function (mainModel) {
            var writeAccess = mainModel.writeAccess;
            console.log("user roles changed %o write access =%o", mainModel.userRoles.value, writeAccess);
            this.updateComponentMemberAccessRights(writeAccess);
            this.writeAccess.value = writeAccess;
        };
        /**
         * Updates the access rights of component members
         *
         * @param {boolean} writeAccess
         * @returns {*}
         * @memberof MappCockpitComponent
         */
        MappCockpitComponent.prototype.updateComponentMemberAccessRights = function (writeAccess) {
            this.updateParameterAccessRights(writeAccess);
            this.updateMethodsAccessRights(writeAccess);
        };
        /**
         * Updates the parameters access rights
         *
         * @private
         * @memberof MappCockpitComponent
         */
        MappCockpitComponent.prototype.updateParameterAccessRights = function (writeAccess) {
            this.parameters.forEach(function (parameter) {
                // rewrite the parameters write access property with its original raw value to force triggering the changed event. This is just a workaround
                // to fix the log in/out problem displaying wrong readonly states.
                // the workaround is intended to be replaced by proper batch refresh requests!
                parameter.isWriteable.value = parameter.isWriteable._value;
            });
        };
        /**
         * Updates the methods access rights
         *
         * @private
         * @returns {*}
         * @memberof MappCockpitComponent
         */
        MappCockpitComponent.prototype.updateMethodsAccessRights = function (writeAccess) {
            this.methods.forEach(function (method) {
                method.isExecutable.value = writeAccess;
            });
        };
        Object.defineProperty(MappCockpitComponent.prototype, "serviceChannel", {
            /**
             * Gets the service channel
             *
             * @type {(MappCockpitComponentService|null)}
             * @memberof MappCockpitComponent
             */
            get: function () {
                return this._componentService;
            },
            /**
             * Sets the service channel
             *
             * @memberof MappCockpitComponent
             */
            set: function (serviceChannel) {
                this._componentService = serviceChannel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "methods", {
            /**
             * sets/gets the parameters of the component
             *
             * @readonly
             * @type {Array<MappCockpitComponentParameter>}
             * @memberof MappCockpitComponent
             */
            get: function () {
                return this._methods;
            },
            set: function (methods) {
                this._methods = methods;
                this._methodsSource.value = this._methods;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "methodsSource", {
            get: function () {
                return this._methodsSource;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "quickCommands", {
            get: function () {
                return this._quickCommands;
            },
            set: function (quickCommands) {
                this._quickCommands = quickCommands;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "userMethods", {
            get: function () {
                return this._userMethods;
            },
            set: function (methods) {
                this._userMethods = methods;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "parameters", {
            /**
             * sets/gets the parameters of the component
             *
             * @readonly
             * @type {Array<MappCockpitComponentParameter>}
             * @memberof MappCockpitComponent
             */
            get: function () {
                return this._parameters;
            },
            set: function (parameters) {
                this._parameters = parameters;
                this._parametersSource.value = this._parameters;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "watchableParameters", {
            get: function () {
                return this._watchableParameters;
            },
            set: function (parameters) {
                this._watchableParameters = parameters;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "watchableStateParameters", {
            get: function () {
                return this._watchableStateParameters;
            },
            set: function (parameters) {
                this._watchableStateParameters = parameters;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "messageParameters", {
            get: function () {
                return this._messageParameters;
            },
            set: function (parameters) {
                this._messageParameters = parameters;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "configurationParameters", {
            get: function () {
                return this._configurationParameters;
            },
            set: function (parameters) {
                this._configurationParameters = parameters;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "parametersSource", {
            get: function () {
                return this._parametersSource;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "messageParametersSource", {
            get: function () {
                // filter the watchables and update the watchables parameter list
                this._messageParametersSource.value = this._messageParameters;
                return this._messageParametersSource;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "watchableParametersSource", {
            get: function () {
                // filter the watchables and update the watchables parameter list
                this._watchableParametersSource.value = this._watchableParameters;
                return this._watchableParametersSource;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "configurationParametersSource", {
            get: function () {
                this._configurationParametersSource.value = this._configurationParameters;
                return this._configurationParametersSource;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * refreshes the components parameter list
         *
         * @private
         * @param {Property<MappCockpitComponentParameter[]>} dataLink
         * @returns {*}
         * @memberof MappCockpitComponent
         */
        MappCockpitComponent.prototype.requestReadComponentParameters = function (dataLink) {
            return __awaiter(this, void 0, void 0, function () {
                var componentParameters, model, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            componentParameters = [];
                            model = this.model;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            if (!model) return [3 /*break*/, 3];
                            return [4 /*yield*/, model.browseParameters(this)];
                        case 2:
                            // read parameter component set
                            componentParameters = _a.sent();
                            // update the data link
                            dataLink.readRequestExecuted(componentParameters);
                            _a.label = 3;
                        case 3: return [3 /*break*/, 5];
                        case 4:
                            error_2 = _a.sent();
                            dataLink.readRequestRejected(error_2);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/, componentParameters];
                    }
                });
            });
        };
        /**
         * Refreshes the components methods
         *
         * @param {Property<MappCockpitComponentMethod[]>} dataLink
         * @returns {*}
         * @memberof MappCockpitComponent
         */
        MappCockpitComponent.prototype.requestReadComponentMethods = function (dataLink) {
            return __awaiter(this, void 0, void 0, function () {
                var componentMethods, model, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            componentMethods = [];
                            model = this.model;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            if (!model) return [3 /*break*/, 3];
                            return [4 /*yield*/, model.browseMethods(this)];
                        case 2:
                            // read parameter component set
                            componentMethods = _a.sent();
                            // update the data link
                            dataLink.readRequestExecuted(componentMethods);
                            _a.label = 3;
                        case 3: return [3 /*break*/, 5];
                        case 4:
                            error_3 = _a.sent();
                            dataLink.readRequestRejected(error_3);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/, componentMethods];
                    }
                });
            });
        };
        Object.defineProperty(MappCockpitComponent.prototype, "metaData", {
            /**
             *  gets the meta data of a component
             *
             * @type {*}
             * @memberof MappCockpitComponent
             */
            get: function () {
                return this._metaData;
            },
            set: function (metaData) {
                this._metaData = metaData;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Registers or marks the component as user component
         *
         * @static
         * @param {MappCockpitComponent} component
         * @returns {*}
         * @memberof MappCockpitComponent
         */
        MappCockpitComponent.registerUserComponent = function (component) {
            component.isUserComponent = true;
        };
        /**
         * Determines if the component is a user component
         *
         * @static
         * @param {MappCockpitComponent} component
         * @returns {boolean}
         * @memberof MappCockpitComponent
         */
        MappCockpitComponent.isUserComponent = function (component) {
            return component.isUserComponent;
        };
        return MappCockpitComponent;
    }(MappCockpitComponentItem));
    exports.MappCockpitComponent = MappCockpitComponent;
    /**
     * The class implements method access.
     *
     * @class MappCockpitComponentMethod
     */
    var MappCockpitComponentMethod = /** @class */ (function (_super) {
        __extends(MappCockpitComponentMethod, _super);
        function MappCockpitComponentMethod() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // Holds the method parameters
            _this._inputParameters = [];
            // specefies if the method is executable
            _this._isExecutable = property_1.Property.create(false, undefined, undefined, function (value) { return _this.methodIsExecutable(value); });
            return _this;
        }
        Object.defineProperty(MappCockpitComponentMethod.prototype, "inputParameters", {
            /**
             * Returns the input parameters of the method
             *
             * @readonly
             * @type {Array<MappCockpitMethodParameter>}
             * @memberof MappCockpitComponentMethod
             */
            get: function () {
                return this._inputParameters;
            },
            set: function (value) {
                this._inputParameters = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Invokes the execution of the component method
         *
         * @static
         * @param {MappCockpitComponentMethod} componentMethod
         * @returns {*}
         * @memberof MappCockpitComponentMethod
         */
        MappCockpitComponentMethod.execute = function (componentMethod) {
            return __awaiter(this, void 0, void 0, function () {
                var model;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            model = componentMethod.component.model;
                            if (!(model && model.executeComponentMethod)) return [3 /*break*/, 2];
                            return [4 /*yield*/, model.executeComponentMethod(componentMethod)];
                        case 1: 
                        // invoke the execution of the method
                        return [2 /*return*/, _a.sent()];
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Finds a method by name
         *
         * @static
         * @param {string} methodName
         * @param {(MappCockpitComponentMethod[]|undefined)} componentMethods
         * @param {boolean} [includeInternals=true]
         * @returns {MappCockpitComponentMethod|undefined}
         * @memberof MappCockpitComponentMethod
         */
        MappCockpitComponentMethod.find = function (methodName, componentMethods, includeInternals) {
            if (includeInternals === void 0) { includeInternals = true; }
            var method = undefined;
            if (componentMethods) {
                var model = componentMethods[0].component.model;
                if (model) {
                    // get the executable methods
                    var executableMethods = includeInternals ? componentMethods[0].component.methods : componentMethods;
                    var matchingMethods = executableMethods.filter(function (method) { return method.browseName === methodName; });
                    if (matchingMethods.length === 1) {
                        // call the requested method
                        method = matchingMethods[0];
                    }
                }
            }
            return method;
        };
        Object.defineProperty(MappCockpitComponentMethod.prototype, "isExecutable", {
            /**
             * Gets if the method is executable
             *
             * @readonly
             * @type {Property<boolean>}
             * @memberof MappCockpitComponentMethod
             */
            get: function () {
                return this._isExecutable;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Determines if the methid is executable
         *
         * @param {boolean} executable
         * @returns {*}
         * @memberof MappCockpitComponentMethod
         */
        MappCockpitComponentMethod.prototype.methodIsExecutable = function (executable) {
            var isExecutableValue = executable;
            var model = this.component.model;
            if (model && this.component) {
                // enable method execution for non user components
                isExecutableValue = MappCockpitComponent.isUserComponent(this.component) ? isExecutableValue : true;
            }
            return isExecutableValue;
        };
        /**
         * Updates the methods input parameters
         *
         * @static
         * @param {MappCockpitComponentMethod} componentMethod
         * @returns {Promise<MappCockpitMethodParameter[]>}
         * @memberof MappCockpitComponentMethod
         */
        MappCockpitComponentMethod.updateInputParameters = function (componentMethod) {
            return __awaiter(this, void 0, void 0, function () {
                var model;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            model = componentMethod.component.model;
                            if (!(model && model.executeComponentMethod)) return [3 /*break*/, 2];
                            return [4 /*yield*/, model.browseMethodInputParameters(componentMethod)];
                        case 1:
                            _a.sent();
                            mappCockpitComponentReflection_1.MappCockpitComponentMethodInfo.updateMethodInputParameters(componentMethod);
                            _a.label = 2;
                        case 2: return [2 /*return*/, componentMethod.inputParameters];
                    }
                });
            });
        };
        return MappCockpitComponentMethod;
    }(MappCockpitComponentItem));
    exports.MappCockpitComponentMethod = MappCockpitComponentMethod;
    var MappCockpitParameter = /** @class */ (function (_super) {
        __extends(MappCockpitParameter, _super);
        function MappCockpitParameter() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // Holds the parameters type
            _this._dataType = new MappCockpitParameterDataType();
            _this._enumRef = new MappCockpitComponentParameterEnum(null);
            _this._engineeringUnit = "";
            _this._isWriteable = property_1.Property.create(false, undefined, undefined, function (value) { return _this.parameterIsWritable(value); });
            _this._modifiedValue = undefined;
            _this._transferFailed = false;
            return _this;
        }
        Object.defineProperty(MappCockpitParameter.prototype, "dataType", {
            /**
             * Returns the parameters value object
             *
             * @readonly
             * @type {(MappCockpitParameterDataType)}
             * @memberof MappCockpitParameter
             */
            get: function () {
                return this._dataType;
            },
            set: function (dataType) {
                this._dataType = dataType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitParameter.prototype, "engineeringUnit", {
            get: function () {
                return this._engineeringUnit;
            },
            set: function (engineeringUnit) {
                this._engineeringUnit = engineeringUnit;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitParameter.prototype, "enumType", {
            get: function () {
                return this._enumRef;
            },
            set: function (enumRef) {
                this._enumRef = enumRef;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitParameter.prototype, "isWriteable", {
            get: function () {
                return this._isWriteable;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Determines if the properties value is writable.
         *
         * @private
         * @param {boolean} value
         * @returns {boolean}
         * @memberof MappCockpitParameter
         */
        MappCockpitParameter.prototype.parameterIsWritable = function (writable) {
            var writableValue = writable;
            var model = this.component.model;
            if (model) {
                writableValue = writable && model.writeAccess;
            }
            return writableValue;
        };
        Object.defineProperty(MappCockpitParameter.prototype, "displayValue", {
            /**
             * Retruns the display value
             *
             * @type {string}
             * @memberof MappCockpitParameter
             */
            get: function () {
                return this.valueToString(this._valueSource.value);
            },
            /**
             * Sets the display value
             *
             * @memberof MappCockpitParameter
             */
            set: function (inputValue) {
                var newValue = this.valueFromString(inputValue);
                this.value = newValue;
                console.log("MappCockpitParameter.setDisplayValue %o for %o", this.value, inputValue);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitParameter.prototype, "modifiedValue", {
            /**
             * Gets the modified parameter value.
             *
             * @type {*}
             * @memberof MappCockpitParameter
             */
            get: function () {
                return this._modifiedValue;
            },
            /**
             * Sets the modified parameter value.
             *
             * @memberof MappCockpitParameter
             */
            set: function (value) {
                this._modifiedValue = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitParameter.prototype, "modifiedDisplayValue", {
            /**
             * Gets the modified display parameter value.
             *
             * @type {*}
             * @memberof MappCockpitParameter
             */
            get: function () {
                if (this._modifiedValue != undefined) {
                    return this.valueToString(this._modifiedValue);
                }
                return this.valueToString(this._valueSource.value);
            },
            /**
             * Sets the modified display parameter value.
             *
             * @memberof MappCockpitParameter
             */
            set: function (value) {
                var newValue = this.valueFromString(value);
                this._modifiedValue = newValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitParameter.prototype, "transferFailed", {
            /**
             * True if transfer of modififed value was not possible
             *
             * @type {boolean}
             * @memberof MappCockpitParameter
             */
            get: function () {
                return this._transferFailed;
            },
            /**
             * Will be set to true if transfer of modififed value was not possible
             *
             * @memberof MappCockpitParameter
             */
            set: function (value) {
                this._transferFailed = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * converts the parameter value to a formatted string
         *
         * @param {*} value
         * @returns {string}
         * @memberof MappCockpitParameter
         */
        MappCockpitParameter.prototype.valueToString = function (value) {
            var valueString = "";
            // avoid converting null or undefined value
            if (value != null && value != undefined) {
                valueString = value.toString();
                valueString = numericHelper_1.NumericHelper.convertNumericString(valueString, this.dataType.name);
                if (this.enumType.isDefined) {
                    valueString = this.enumType.getDisplayValue(value);
                }
            }
            return valueString;
        };
        /**
         * converts a parameter value string to a value according to the parameters data type
         *
         * @param {string} inputValue
         * @returns {*}
         * @memberof MappCockpitParameter
         */
        MappCockpitParameter.prototype.valueFromString = function (inputValue) {
            // set an empty string for an undefined input value
            var value = inputValue !== undefined && inputValue !== null ? inputValue : "";
            // replace the enum string by the value if there is one defined.
            if (this.enumType.isDefined) {
                value = this.enumType.getValue(inputValue);
            }
            return value;
        };
        return MappCockpitParameter;
    }(MappCockpitComponentItem));
    /**
     * The class implements a component parameter
     *
     * @class MappCockpitComponentParameter
     */
    var MappCockpitComponentParameter = /** @class */ (function (_super) {
        __extends(MappCockpitComponentParameter, _super);
        function MappCockpitComponentParameter(component, name, reference) {
            var _this = _super.call(this, component, name, reference) || this;
            _this._valueSource = property_1.Property.create("", undefined, function (dataLink) { return _this.requestWriteValue(dataLink); });
            return _this;
        }
        /**
         * Writes the current parameter value to target
         *
         * @memberof MappCockpitComponentParameter
         */
        MappCockpitComponentParameter.prototype.write = function (reflectedWriteResponseDelegate) {
            // connect the write response delegate
            this.reflectedWriteResponseDelegate = reflectedWriteResponseDelegate;
            // execute writing the parameter value
            this.valueSource.write();
        };
        /**
         * Writes the data links value to target
         *
         * @private
         * @param {Property<any>} dataLink
         * @memberof MappCockpitComponentParameter
         */
        MappCockpitComponentParameter.prototype.requestWriteValue = function (dataLink) {
            return __awaiter(this, void 0, void 0, function () {
                var component, model, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            component = this.component;
                            if (!(component && component.model)) return [3 /*break*/, 2];
                            model = component.model;
                            return [4 /*yield*/, model.writeComponentParameter(this)];
                        case 1:
                            _a.sent();
                            dataLink.writeRequestExecuted(null);
                            _a.label = 2;
                        case 2: return [3 /*break*/, 4];
                        case 3:
                            error_4 = _a.sent();
                            dataLink.writeRequestRejected(error_4);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Initiates the observation of parameter value changes
         *
         * @static
         * @param {MappCockpitComponentParameter[]} watchableParameters
         * @returns {*}
         * @memberof MappCockpitComponentParameter
         */
        MappCockpitComponentParameter.observeParameterValueChanges = function (observer, observableParameters) {
            if (observableParameters.length > 0 && observableParameters[0] != undefined) {
                // get the parameters model from the parent component
                var model = MappCockpitComponentParameter.getModel(observableParameters[0]);
                if (model && model.observeDataModelItems) {
                    // invoke the observation on the model
                    model.observeDataModelItems(observer, observableParameters);
                }
            }
        };
        /**
         * Activates model items registered for observation
         *
         * @static
         * @param {*} observer
         * @param {MappCockpitComponentParameter[]} observableParameters
         * @returns {*}
         * @memberof MappCockpitComponentParameter
         */
        MappCockpitComponentParameter.activateComponentModelItems = function (observer, observableParameters) {
            //TODO: implement model item activation handling
        };
        /**
         * Unobserves all observables associated with the observer
         *
         * @static
         * @param {*} observer
         * @param {MappCockpitComponentParameter[]} observedParameters
         * @param {boolean} [suspend=true] suspends the observation if true otherwise removes the whole subscription
         * @memberof MappCockpitComponentParameter
         */
        MappCockpitComponentParameter.unobserveComponentModelItems = function (observer, observedParameters, suspend) {
            if (suspend === void 0) { suspend = true; }
            if (observedParameters.length > 0 && observedParameters[0] != undefined) {
                var model = MappCockpitComponentParameter.getModel(observedParameters[0]);
                if (model && model.unobserveComponentModelItems) {
                    // invoke the unobservation on the model
                    model.unobserveComponentModelItems(observer, observedParameters, suspend);
                }
            }
        };
        /**
         * Deactivates model items registered for observation
         *
         * @static
         * @param {*} observer
         * @param {MappCockpitComponentParameter[]} observedParameters
         * @param {boolean} [suspend=true]
         * @memberof MappCockpitComponentParameter
         */
        MappCockpitComponentParameter.deactivateComponentModelItems = function (observer, observedParameters, suspend) {
            if (suspend === void 0) { suspend = true; }
            //TODO: implement model item deactivation handling
        };
        /**
         * Gets the parameters model
         *
         * @private
         * @static
         * @param {MappCockpitComponentParameter[]} observableParameters
         * @returns
         * @memberof MappCockpitComponentParameter
         */
        MappCockpitComponentParameter.getModel = function (componentParameter) {
            if (!componentParameter) {
                console.error("componentParameter undefined !");
            }
            if (!componentParameter.component) {
                console.error("componentParameter.component undefined !");
            }
            return componentParameter.component.model;
        };
        return MappCockpitComponentParameter;
    }(MappCockpitParameter));
    exports.MappCockpitComponentParameter = MappCockpitComponentParameter;
    /**
     * Defines class used for state icons
     *
     * @class MappCockpitStateParameter
     */
    var MappCockpitStateParameter = /** @class */ (function () {
        function MappCockpitStateParameter(name, expression, watchableMapping, icon) {
            // Holds watchable state expression class
            this.stateExpression = new watchableStateExpression_1.WatchableStateExpression();
            this._name = name;
            this.stateExpression = new watchableStateExpression_1.WatchableStateExpression(name, expression, watchableMapping, icon);
        }
        Object.defineProperty(MappCockpitStateParameter.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        return MappCockpitStateParameter;
    }());
    exports.MappCockpitStateParameter = MappCockpitStateParameter;
    /**
     * implements a method parameter
     *
     * @class MappCockpitMethodParameter
     * @extends {MappCockpitParameter}
     */
    var MappCockpitMethodParameter = /** @class */ (function (_super) {
        __extends(MappCockpitMethodParameter, _super);
        function MappCockpitMethodParameter(component, name, reference) {
            var _this = _super.call(this, component, name, reference) || this;
            _this._filter = new parameterFilter_1.ParameterFilter();
            return _this;
        }
        Object.defineProperty(MappCockpitMethodParameter.prototype, "filter", {
            get: function () {
                return this._filter;
            },
            set: function (filter) {
                this._filter = filter;
            },
            enumerable: true,
            configurable: true
        });
        return MappCockpitMethodParameter;
    }(MappCockpitParameter));
    exports.MappCockpitMethodParameter = MappCockpitMethodParameter;
    /**
     * Defines the clas for quickcommands
     *
     * @class MappCockpitQuickCommandParameter
     */
    var MappCockpitQuickCommandParameter = /** @class */ (function () {
        function MappCockpitQuickCommandParameter(name, tooltip, imageName) {
            this._name = name;
            this._tooltip = tooltip;
            this._imageName = imageName;
        }
        Object.defineProperty(MappCockpitQuickCommandParameter.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitQuickCommandParameter.prototype, "tooltip", {
            get: function () {
                return this._tooltip;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitQuickCommandParameter.prototype, "imageName", {
            get: function () {
                return this._imageName;
            },
            enumerable: true,
            configurable: true
        });
        return MappCockpitQuickCommandParameter;
    }());
    exports.MappCockpitQuickCommandParameter = MappCockpitQuickCommandParameter;
    /**
     * defines the parameter data type
     *
     * @class MappCockpitComponentParameterDataType
     */
    var MappCockpitParameterDataType = /** @class */ (function () {
        function MappCockpitParameterDataType(dataTypeId, dataTypeName) {
            if (dataTypeId === void 0) { dataTypeId = "undefined"; }
            if (dataTypeName === void 0) { dataTypeName = "undefined"; }
            this._dataTypeId = "undefined";
            this._dataTypeName = "undefined";
            this._dataTypeId = dataTypeId;
            this._dataTypeName = dataTypeName;
        }
        Object.defineProperty(MappCockpitParameterDataType.prototype, "isDefined", {
            /**
             * Returns if the data type is defined.
             *
             * @readonly
             * @memberof MappCockpitParameter
             */
            get: function () {
                return this._dataTypeId !== "undefined" && this._dataTypeName !== "undefined";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitParameterDataType.prototype, "id", {
            get: function () {
                return this, this._dataTypeId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitParameterDataType.prototype, "name", {
            get: function () {
                return this._dataTypeName;
            },
            enumerable: true,
            configurable: true
        });
        return MappCockpitParameterDataType;
    }());
    exports.MappCockpitParameterDataType = MappCockpitParameterDataType;
    /**
     * implements a single enum value with value and string
     *
     * @class MappCockpitComponentParameterEnumValue
     */
    var MappCockpitComponentParameterEnumValue = /** @class */ (function () {
        /**
         * Creates an instance of MappCockpitComponentParameterEnumValue.
         * @param {string} displayText
         * @param {*} value
         * @memberof MappCockpitComponentParameterEnumValue
         */
        function MappCockpitComponentParameterEnumValue(displayText, value) {
            this._displayValue = "undefined";
            this._value = null;
            this._displayValue = displayText;
            this._value = value;
        }
        Object.defineProperty(MappCockpitComponentParameterEnumValue.prototype, "value", {
            /**
             * gets the value of the enum
             *
             * @readonly
             * @type {*}
             * @memberof MappCockpitComponentParameterEnumValue
             */
            get: function () {
                return this._value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentParameterEnumValue.prototype, "displayValue", {
            /**
             * gets the string of the enum value
             *
             * @readonly
             * @type {string}
             * @memberof MappCockpitComponentParameterEnumValue
             */
            get: function () {
                return this._displayValue;
            },
            enumerable: true,
            configurable: true
        });
        return MappCockpitComponentParameterEnumValue;
    }());
    exports.MappCockpitComponentParameterEnumValue = MappCockpitComponentParameterEnumValue;
    /**
     * implements a parameter enum holding a collection of enum items
     *
     * @class MappCockpitComponentParameterEnum
     */
    var MappCockpitComponentParameterEnum = /** @class */ (function () {
        function MappCockpitComponentParameterEnum(enumValuesReference) {
            if (enumValuesReference === void 0) { enumValuesReference = null; }
            this._browseName = "";
            this._enumValuesReference = enumValuesReference;
            if (this._enumValuesReference) {
                this._browseName = this._enumValuesReference.browseName;
                this._enumValues = this._enumValuesReference.enumValues.map(function (enumValueRef) { return new MappCockpitComponentParameterEnumValue(enumValueRef.displayName.text, enumValueRef.value); });
            }
        }
        Object.defineProperty(MappCockpitComponentParameterEnum.prototype, "browseName", {
            /**
             * gets the browse name of the enum
             *
             * @readonly
             * @type {string}
             * @memberof MappCockpitComponentParameterEnum
             */
            get: function () {
                return this._enumValuesReference.browseName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentParameterEnum.prototype, "values", {
            /**
             * gets the collection of enum items
             *
             * @readonly
             * @type {MappCockpitComponentParameterEnumValue[]}
             * @memberof MappCockpitComponentParameterEnum
             */
            get: function () {
                return this._enumValues;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentParameterEnum.prototype, "isDefined", {
            /**
             * determines if the enum is defined and contains values
             *
             * @readonly
             * @type {boolean}
             * @memberof MappCockpitComponentParameterEnum
             */
            get: function () {
                return this._enumValues && this._enumValues.length > 0;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * gets a string matching the specified enum value, otherwise return value string as default.
         *
         * @returns {*}
         * @memberof MappCockpitComponentParameterEnum
         */
        MappCockpitComponentParameterEnum.prototype.getDisplayValue = function (enumValue) {
            // get an enum item matching the requested value
            var matchingEnumItem = this.findMatchingEnumItemByValue(enumValue);
            // update the value string to the matching one or use the default string
            var enumValueString = matchingEnumItem ? matchingEnumItem.displayValue : enumValue.toString();
            return enumValueString;
        };
        /**
         *
         *
         * @param {string} inputValue
         * @returns {*}
         * @memberof MappCockpitComponentParameterEnum
         */
        MappCockpitComponentParameterEnum.prototype.getValue = function (enumDisplayValue) {
            var enumValue = enumDisplayValue;
            // get an enum item matching the requested string
            var matchingEnumItem = this.findMatchingEnumItemByString(enumDisplayValue);
            if (matchingEnumItem) {
                enumValue = matchingEnumItem.value;
            }
            else {
                console.error("MappCockpitComponentParameterEnum.getValue: could not find matching enum value for %o", enumDisplayValue);
            }
            return enumValue;
        };
        /**
         * find an enum item with matching value
         *
         * @private
         * @param {*} enumValue
         * @returns
         * @memberof MappCockpitComponentParameterEnum
         */
        MappCockpitComponentParameterEnum.prototype.findMatchingEnumItemByValue = function (enumValue) {
            var matchingEnumItem = this._enumValues.filter(function (enumItem) { return enumItem.value == enumValue; });
            return matchingEnumItem.length === 1 ? matchingEnumItem[0] : undefined;
        };
        /**
         * find an enum item with matching string
         *
         * @param {string} enumDisplayValue
         * @returns {*}
         * @memberof MappCockpitComponentParameterEnum
         */
        MappCockpitComponentParameterEnum.prototype.findMatchingEnumItemByString = function (enumDisplayValue) {
            var matchingEnumItem = this._enumValues.filter(function (enumItem) { return enumItem.displayValue === enumDisplayValue; });
            return matchingEnumItem.length === 1 ? matchingEnumItem[0] : undefined;
        };
        return MappCockpitComponentParameterEnum;
    }());
    exports.MappCockpitComponentParameterEnum = MappCockpitComponentParameterEnum;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXRDb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQVlBOzs7Ozs7OztPQVFHO0lBQ0g7UUF3Qkk7Ozs7OztXQU1HO1FBQ0gsa0NBQVksU0FBMEMsRUFBRSxJQUFZLEVBQUUsU0FBYztZQTNCcEYsd0JBQXdCO1lBQ3hCLDhCQUE4QjtZQUM5Qix3QkFBd0I7WUFDZCxXQUFNLEdBQW9DLEVBQUUsQ0FBQztZQVE3QyxpQkFBWSxHQUFrQixtQkFBUSxDQUFDLE1BQU0sQ0FBTSxFQUFFLENBQUMsQ0FBQztZQUVqRSx1QkFBdUI7WUFDZixpQkFBWSxHQUFzQixtQkFBUSxDQUFDLE1BQU0sQ0FBVSxLQUFLLENBQUMsQ0FBQztZQUUxRSxpREFBaUQ7WUFDekMsb0NBQStCLEdBQTRDLFNBQVMsQ0FBQztZQVd6RixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztZQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUNoQyxDQUFDO1FBU0Qsc0JBQVcsaURBQVc7WUFQdEI7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztZQUM3QixDQUFDO2lCQUVELFVBQXVCLFdBQW1CO2dCQUN0QyxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztZQUNwQyxDQUFDOzs7V0FKQTtRQU1ELHNCQUFXLGdEQUFVO2lCQUFyQjtnQkFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDO1lBQ3RDLENBQUM7OztXQUFBO1FBRUQsc0JBQVcsMENBQUk7aUJBQWY7Z0JBQ0ks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Q0FBQyxDQUFDLENBQUMsQ0FBQztZQUNySCxPQUFPLGdCQUFnQixDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDM0UsQ0FBQztRQUdMLHdDQUFDO0lBQUQsQ0FBQyxBQW5IRCxJQW1IQztJQUdtSiw4RUFBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGFEYXRhIH0gZnJvbSBcIi4vbWFwcENvY2twaXRDb21wb25lbnRNZXRhRGF0YVwiO1xyXG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvcHJvcGVydHlcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwgfSBmcm9tIFwiLi9jb21wb25lbnRzRGF0YU1vZGVsXCI7XHJcbmltcG9ydCB7IENvbW1hbmQsIElDb21tYW5kRXhlY3V0aW9uRGVsZWdhdGUgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2NvbW1hbmRcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvIH0gZnJvbSBcIi4vbWFwcENvY2twaXRDb21wb25lbnRSZWZsZWN0aW9uXCI7XHJcbmltcG9ydCB7IE51bWVyaWNIZWxwZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL251bWVyaWNIZWxwZXJcIjtcclxuaW1wb3J0IHsgSU9ic2VydmVyIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9pbnRlcmZhY2VzL29ic2VydmVyXCI7XHJcbmltcG9ydCB7IElWYWx1ZUxpc3RJdGVtIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9pbnRlcmZhY2VzL3ZhbHVlTGlzdEl0ZW1JbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgUGFyYW1ldGVyRmlsdGVyIH0gZnJvbSBcIi4uLy4uL3dpZGdldHMvbWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldC9wYXJhbWV0ZXJGaWx0ZXJcIjtcclxuaW1wb3J0IHsgV2F0Y2hhYmxlU3RhdGVFeHByZXNzaW9uIH0gZnJvbSBcIi4uL2NvbW1vbi9zdGF0ZUV4cHJlc3Npb24vd2F0Y2hhYmxlU3RhdGVFeHByZXNzaW9uXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50U2VydmljZSB9IGZyb20gXCIuL21hcHBDb2NrcGl0Q29tcG9uZW50U2VydmljZVwiO1xyXG5cclxuLyoqXHJcbiAqIEltcGxlbWVudHMgdGhlIGJhc2UgbWVtZWJlcnMgZm9yIG1hbmFnaW5nIGNvbXBvbmVudCBtb2RlbCBtZW1iZXJzLlxyXG4gKlxyXG4gKiBAY2xhc3MgTWFwcENvY2twaXRDb21wb25lbnRJdGVtXHJcbi8qKlxyXG4gKlxyXG4gKlxyXG4gKiBAY2xhc3MgTWFwcENvY2twaXRDb21wb25lbnRJdGVtXHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW0ge1xyXG5cclxuICAgIC8vIEhvbGRzIGEgcmVmZXJlbmNlIHRvIHRoZSB1bmRlcmx5aW5nIGl0ZW1cclxuICAgIHByb3RlY3RlZCByZWFkb25seSBfcmVmZXJlbmNlOiBhbnk7XHJcbiAgICAvLyBIb2xkcyB0aGUgaXRlbXMgdmFsdWVcclxuICAgIC8vIHByb3RlY3RlZCBfdmFsdWU6IGFueSA9IFwiXCI7XHJcbiAgICAvLyBob2xkcyBzdWJpdGVtcyBpZiBhbnlcclxuICAgIHByb3RlY3RlZCBfaXRlbXM6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbT4gPSBbXTtcclxuXHJcbiAgICAvLyBob2xkcyB0aGUgZGlhcGxheSBuYW1lXHJcbiAgICBwcm90ZWN0ZWQgX2Rpc3BsYXlOYW1lOiBhbnk7XHJcblxyXG4gICAgLy8gaG9sZHMgdGhlIGNvbXBvbmVudCByZXByZXNlbnRpbmcgdGhlIG93bmVyIG9mIHRoZSBjb21wb25lbnQgaXRlbVxyXG4gICAgcHJvdGVjdGVkIF9jb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbSB8IG51bGw7XHJcblxyXG4gICAgcHJvdGVjdGVkIF92YWx1ZVNvdXJjZTogUHJvcGVydHk8YW55PiA9IFByb3BlcnR5LmNyZWF0ZTxhbnk+KFwiXCIpO1xyXG5cclxuICAgIC8vIGhvbGRzIHRoZSB1c2VyIHJvbGVzXHJcbiAgICBwcml2YXRlIF93cml0ZUFjY2VzczogUHJvcGVydHk8Ym9vbGVhbj4gPSBQcm9wZXJ0eS5jcmVhdGU8Ym9vbGVhbj4oZmFsc2UpO1xyXG5cclxuICAgIC8vIHNwZWNpZmllcyBhIHJlc3BvbnNlIGRlbGFnZXQgZm9yIHdyaXRlIHJlcXVldHNcclxuICAgIHByaXZhdGUgX3JlZmxlY3RlZFdyaXRlUmVzcG9uc2VEZWxlZ2F0ZTogKChyZXN1bHREYXRhOiBhbnkpID0+IHZvaWQpIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgTWFwcENvY2twaXRDb21wb25lbnRJdGVtLlxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW19IGNvbXBvbmVudFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEBwYXJhbSB7Kn0gcmVmZXJlbmNlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRJdGVtXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGNvbXBvbmVudDogTWFwcENvY2twaXRDb21wb25lbnRJdGVtIHwgbnVsbCwgbmFtZTogc3RyaW5nLCByZWZlcmVuY2U6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX3JlZmVyZW5jZSA9IHJlZmVyZW5jZTtcclxuICAgICAgICB0aGlzLl9kaXNwbGF5TmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5fY29tcG9uZW50ID0gY29tcG9uZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgaXRlbXMgZGlzcGxheSBuYW1lIFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBkaXNwbGF5TmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNwbGF5TmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGRpc3BsYXlOYW1lKGRpc3BsYXlOYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9kaXNwbGF5TmFtZSA9IGRpc3BsYXlOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgYnJvd3NlTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZWZlcmVuY2UuYnJvd3NlTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVmZXJlbmNlLm5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjb21wb25lbnQoKTogTWFwcENvY2twaXRDb21wb25lbnRJdGVtIHwgbnVsbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBvbmVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGN1cnJlbnQgdXNlciByb2xlc1xyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ1tdfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgd3JpdGVBY2Nlc3MoKTogUHJvcGVydHk8Ym9vbGVhbj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93cml0ZUFjY2VzcztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpdGVtcyBpZFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBpZCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZWZlcmVuY2Uubm9kZUlkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2V0cy9nZXRzIHRoZSBpdGVtcyB2YWx1ZSBvYmplY3RcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHsoTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJWYWx1ZXx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgdmFsdWUoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWVTb3VyY2UudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCB2YWx1ZSh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fdmFsdWVTb3VyY2UudmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHZhbHVlU291cmNlKCk6IFByb3BlcnR5PGFueT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZVNvdXJjZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHZhbHVlU291cmNlKHZhbHVlU291cmNlOiBQcm9wZXJ0eTxhbnk+KSB7XHJcbiAgICAgICAgdGhpcy5fdmFsdWVTb3VyY2UgPSB2YWx1ZVNvdXJjZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgYSBkZWxlZ2F0ZSBmb3Igb2JzZXJ2aW5nIHdyaXRlIHJlc3BvbnNlc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCByZWZsZWN0ZWRXcml0ZVJlc3BvbnNlRGVsZWdhdGUocmVmbGVjdGVkV3JpdGVSZXNwb25zZURlbGVnYXRlOiAoKHJlZmxlY3RlZFdyaXRlUmVzcG9uc2VWYWx1ZTogYW55KSA9PiB2b2lkKSB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuX3JlZmxlY3RlZFdyaXRlUmVzcG9uc2VEZWxlZ2F0ZSA9IHJlZmxlY3RlZFdyaXRlUmVzcG9uc2VEZWxlZ2F0ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGRlbGVnYXRlIGZvciBvYnNlcnZpbmcgd3JpdGUgcmVzcG9tc2VzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJlZmxlY3RlZFdyaXRlUmVzcG9uc2VEZWxlZ2F0ZSgpOiAoKHJlZmxlY3RlZFdyaXRlUmVzcG9uc2VWYWx1ZTogYW55KSA9PiB2b2lkKSB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlZmxlY3RlZFdyaXRlUmVzcG9uc2VEZWxlZ2F0ZTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyB0aGUgdmFsdWUgYXMgZm9ybWF0dGVkIHN0cmluZyBpZiBhcHByb3BpYXRlXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRJdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgZGlzcGxheVZhbHVlKCk6IFN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlU291cmNlLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBzZXQgZGlzcGxheVZhbHVlKGlucHV0VmFsdWU6IFN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlU291cmNlLnZhbHVlID0gaW5wdXRWYWx1ZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGdldCBkYXRhVHlwZUlkKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlZmVyZW5jZS5kYXRhVHlwZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgdGhlIHN1Yml0ZW1zIGlmIGFueVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge0FycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRJdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgaXRlbXMoKTogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRJdGVtPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIFRoZSBjbGFzcyByZXByZXNlbnRzIGEgY29tcG9uZW50IHRvIGJlIHVzZWQgd2l0aGluIG1hcHAgY29ja3BpdCBVSVxyXG4gKlxyXG4gKiBAY2xhc3MgTWFwcENvY2twaXRDb21wb25lbnRcclxuICovXHJcbmNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50IGV4dGVuZHMgTWFwcENvY2twaXRDb21wb25lbnRJdGVtIHtcclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSG9sZHMgdGhlIGNvbXBvbmVudCBtZXRob2RzXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHR5cGUge0FycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kPn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICovXHJcblxyXG4gICAgLy8gSG9sZHMgdGhlIGNvbXBvbmVudCBtZXRob2RzXHJcbiAgICBwcml2YXRlIF9jb21wb25lbnRTZXJ2aWNlOiBNYXBwQ29ja3BpdENvbXBvbmVudFNlcnZpY2UgfCBudWxsPW51bGw7XHJcbiAgICBwcml2YXRlIF9tZXRob2RzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZD4gPSBbXTtcclxuICAgIHByaXZhdGUgX3F1aWNrQ29tbWFuZHM6IEFycmF5PE1hcHBDb2NrcGl0UXVpY2tDb21tYW5kUGFyYW1ldGVyPiA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfdXNlck1ldGhvZHM6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kPiA9IFtdO1xyXG5cclxuICAgIC8vIEhvbGRzIHRoZSBjb21wb25lbnQgcGFyYW1ldGVyc1xyXG4gICAgcHJpdmF0ZSBfcGFyYW1ldGVyczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+ID0gW107XHJcbiAgICBwcml2YXRlIF93YXRjaGFibGVQYXJhbWV0ZXJzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4gPSBbXTtcclxuICAgIHByaXZhdGUgX3dhdGNoYWJsZVN0YXRlUGFyYW1ldGVyczogQXJyYXk8TWFwcENvY2twaXRTdGF0ZVBhcmFtZXRlcj4gPSBbXTtcclxuICAgIHByaXZhdGUgX2NvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4gPSBbXTtcclxuICAgIHByaXZhdGUgX21lc3NhZ2VQYXJhbWV0ZXJzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4gPSBbXTtcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBfbWV0YURhdGE6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0YURhdGEgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9wYXJhbWV0ZXJzU291cmNlOiBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4+ID0gUHJvcGVydHkuY3JlYXRlPEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPj4oW10sIChkYXRhTGluaykgPT4geyB0aGlzLnJlcXVlc3RSZWFkQ29tcG9uZW50UGFyYW1ldGVycyhkYXRhTGluayk7IH0pO1xyXG4gICAgcHJpdmF0ZSBfbWVzc2FnZVBhcmFtZXRlcnNTb3VyY2U6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPj4gPSBQcm9wZXJ0eS5jcmVhdGU8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+PihbXSwgKGRhdGFMaW5rKSA9PiB7IHRoaXMucmVxdWVzdFJlYWRDb21wb25lbnRQYXJhbWV0ZXJzKGRhdGFMaW5rKTsgfSk7XHJcbiAgICBwcml2YXRlIF93YXRjaGFibGVQYXJhbWV0ZXJzU291cmNlOiBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4+ID0gUHJvcGVydHkuY3JlYXRlPEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPj4oW10sIChkYXRhTGluaykgPT4geyB0aGlzLnJlcXVlc3RSZWFkQ29tcG9uZW50UGFyYW1ldGVycyhkYXRhTGluayk7IH0pO1xyXG4gICAgcHJpdmF0ZSBfY29uZmlndXJhdGlvblBhcmFtZXRlcnNTb3VyY2U6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPj4gPSBQcm9wZXJ0eS5jcmVhdGU8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+PihbXSwgKGRhdGFMaW5rKSA9PiB7IHRoaXMucmVxdWVzdFJlYWRDb21wb25lbnRQYXJhbWV0ZXJzKGRhdGFMaW5rKTsgfSk7XHJcblxyXG4gICAgcHJpdmF0ZSBfbWV0aG9kc1NvdXJjZTogUHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+PiA9IFByb3BlcnR5LmNyZWF0ZTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZD4+KFtdLCAoZGF0YUxpbmspID0+IHsgdGhpcy5yZXF1ZXN0UmVhZENvbXBvbmVudE1ldGhvZHMoZGF0YUxpbmspOyB9KTtcclxuICAgIHByaXZhdGUgX2NvbW1hbmRDb25uZWN0ID0gQ29tbWFuZC5jcmVhdGU8YW55LCBhbnk+KHRoaXMsIHRoaXMuZXhlY3V0ZUNvbW1hbmRDb25uZWN0KCkpO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIHNldHMvZ2V0cyB0aGUgcGFyYW1ldGVycyBvZiB0aGUgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKi9cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbW1hbmRDb25uZWN0Q29tcG9uZW50KCk6IENvbW1hbmQ8YW55LCBhbnk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29tbWFuZENvbm5lY3Q7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBwcml2YXRlIGV4ZWN1dGVDb21tYW5kQ29ubmVjdCgpOiBJQ29tbWFuZEV4ZWN1dGlvbkRlbGVnYXRlPGFueSwgYW55PiB7XHJcbiAgICAgICAgcmV0dXJuIGFzeW5jIChjb21tYW5kUGFycywgY29tbWFuZFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBtb2RlbCA9ICg8YW55PnRoaXMpLm1vZGVsIGFzIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vZGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVhZCBwYXJhbWV0ZXIgY29tcG9uZW50IHNldFxyXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IG1vZGVsLmJyb3dzZUNvbXBvbmVudCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaW50aXRpYWxseSB1cGRhdGUgdGhlIGNvbXBvbmVudHMgYWNjZXNzIHJpZ2h0c1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ29tcG9uZW50QWNjZXNzUmlnaHRzKG1vZGVsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gd2F0Y2ggYWNjZXNzIHJpZ2h0IGNoYW5nZXNcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9ic2VydmVDb21wb25lbnRBY2Nlc3NSaWdodHMobW9kZWwpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyB1cGRhdGUgdGhlIGRhdGEgbGlua1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmRSZXNwb25zZS5leGVjdXRlZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29tbWFuZFJlc3BvbnNlLnJlamVjdGVkKGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYnNlcnZlcyBjaGFuZ2VzIG9mIHRoZSBhY2Nlc3MgcmlnaHRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWx9IG1haW5Nb2RlbFxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb2JzZXJ2ZUNvbXBvbmVudEFjY2Vzc1JpZ2h0cyhtYWluTW9kZWw6IE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsKSB7XHJcbiAgICAgICAgbWFpbk1vZGVsLnVzZXJSb2xlcy5jaGFuZ2VkKCh1c2VyUm9sZXMpID0+IHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDb21wb25lbnRBY2Nlc3NSaWdodHMobWFpbk1vZGVsKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGNvbXBvbmVudHJzIGFjY2VzcyByaWdodHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbH0gbWFpbk1vZGVsXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVDb21wb25lbnRBY2Nlc3NSaWdodHMobWFpbk1vZGVsOiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbCkge1xyXG4gICAgICAgIGxldCB3cml0ZUFjY2VzcyA9IG1haW5Nb2RlbC53cml0ZUFjY2VzcztcclxuICAgICAgICBjb25zb2xlLmxvZyhcInVzZXIgcm9sZXMgY2hhbmdlZCAlbyB3cml0ZSBhY2Nlc3MgPSVvXCIsIG1haW5Nb2RlbC51c2VyUm9sZXMudmFsdWUsIHdyaXRlQWNjZXNzKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBvbmVudE1lbWJlckFjY2Vzc1JpZ2h0cyh3cml0ZUFjY2Vzcyk7XHJcbiAgICAgICAgdGhpcy53cml0ZUFjY2Vzcy52YWx1ZSA9IHdyaXRlQWNjZXNzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgYWNjZXNzIHJpZ2h0cyBvZiBjb21wb25lbnQgbWVtYmVyc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gd3JpdGVBY2Nlc3NcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZUNvbXBvbmVudE1lbWJlckFjY2Vzc1JpZ2h0cyh3cml0ZUFjY2VzczogYm9vbGVhbik6IGFueSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVQYXJhbWV0ZXJBY2Nlc3NSaWdodHMod3JpdGVBY2Nlc3MpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlTWV0aG9kc0FjY2Vzc1JpZ2h0cyh3cml0ZUFjY2Vzcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBwYXJhbWV0ZXJzIGFjY2VzcyByaWdodHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlUGFyYW1ldGVyQWNjZXNzUmlnaHRzKHdyaXRlQWNjZXNzOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmZvckVhY2goKHBhcmFtZXRlcikgPT4ge1xyXG4gICAgICAgICAgICAvLyByZXdyaXRlIHRoZSBwYXJhbWV0ZXJzIHdyaXRlIGFjY2VzcyBwcm9wZXJ0eSB3aXRoIGl0cyBvcmlnaW5hbCByYXcgdmFsdWUgdG8gZm9yY2UgdHJpZ2dlcmluZyB0aGUgY2hhbmdlZCBldmVudC4gVGhpcyBpcyBqdXN0IGEgd29ya2Fyb3VuZFxyXG4gICAgICAgICAgICAvLyB0byBmaXggdGhlIGxvZyBpbi9vdXQgcHJvYmxlbSBkaXNwbGF5aW5nIHdyb25nIHJlYWRvbmx5IHN0YXRlcy5cclxuICAgICAgICAgICAgLy8gdGhlIHdvcmthcm91bmQgaXMgaW50ZW5kZWQgdG8gYmUgcmVwbGFjZWQgYnkgcHJvcGVyIGJhdGNoIHJlZnJlc2ggcmVxdWVzdHMhXHJcbiAgICAgICAgICAgIHBhcmFtZXRlci5pc1dyaXRlYWJsZS52YWx1ZSA9ICg8YW55PnBhcmFtZXRlci5pc1dyaXRlYWJsZSkuX3ZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgbWV0aG9kcyBhY2Nlc3MgcmlnaHRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlTWV0aG9kc0FjY2Vzc1JpZ2h0cyh3cml0ZUFjY2VzczogYm9vbGVhbik6IGFueSB7XHJcbiAgICAgICAgdGhpcy5tZXRob2RzLmZvckVhY2goKG1ldGhvZCkgPT4ge1xyXG4gICAgICAgICAgICBtZXRob2QuaXNFeGVjdXRhYmxlLnZhbHVlID0gd3JpdGVBY2Nlc3M7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBzZXJ2aWNlIGNoYW5uZWxcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7KE1hcHBDb2NrcGl0Q29tcG9uZW50U2VydmljZXxudWxsKX1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHNlcnZpY2VDaGFubmVsKCkgOiBNYXBwQ29ja3BpdENvbXBvbmVudFNlcnZpY2V8bnVsbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBvbmVudFNlcnZpY2U7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHNlcnZpY2UgY2hhbm5lbFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IHNlcnZpY2VDaGFubmVsKHNlcnZpY2VDaGFubmVsIDogTWFwcENvY2twaXRDb21wb25lbnRTZXJ2aWNlfG51bGwpIHtcclxuICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlID0gc2VydmljZUNoYW5uZWwgO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxuXHJcbiAgICAvKipcclxuICAgICAqIHNldHMvZ2V0cyB0aGUgcGFyYW1ldGVycyBvZiB0aGUgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIGdldCBtZXRob2RzKCk6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21ldGhvZHM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IG1ldGhvZHMobWV0aG9kczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+KSB7XHJcbiAgICAgICAgdGhpcy5fbWV0aG9kcyA9IG1ldGhvZHM7XHJcbiAgICAgICAgdGhpcy5fbWV0aG9kc1NvdXJjZS52YWx1ZSA9IHRoaXMuX21ldGhvZHM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG1ldGhvZHNTb3VyY2UoKTogUHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21ldGhvZHNTb3VyY2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHF1aWNrQ29tbWFuZHMoKTogQXJyYXk8TWFwcENvY2twaXRRdWlja0NvbW1hbmRQYXJhbWV0ZXI+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcXVpY2tDb21tYW5kcztcclxuICAgIH1cclxuXHJcbiAgICBzZXQgcXVpY2tDb21tYW5kcyhxdWlja0NvbW1hbmRzOiBBcnJheTxNYXBwQ29ja3BpdFF1aWNrQ29tbWFuZFBhcmFtZXRlcj4pIHtcclxuICAgICAgICB0aGlzLl9xdWlja0NvbW1hbmRzID0gcXVpY2tDb21tYW5kcztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdXNlck1ldGhvZHMoKTogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdXNlck1ldGhvZHM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHVzZXJNZXRob2RzKG1ldGhvZHM6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kPikge1xyXG4gICAgICAgIHRoaXMuX3VzZXJNZXRob2RzID0gbWV0aG9kcztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzZXRzL2dldHMgdGhlIHBhcmFtZXRlcnMgb2YgdGhlIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge0FycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBnZXQgcGFyYW1ldGVycygpOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBwYXJhbWV0ZXJzKHBhcmFtZXRlcnM6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPikge1xyXG4gICAgICAgIHRoaXMuX3BhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzO1xyXG4gICAgICAgIHRoaXMuX3BhcmFtZXRlcnNTb3VyY2UudmFsdWUgPSB0aGlzLl9wYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXQgd2F0Y2hhYmxlUGFyYW1ldGVycygpOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCB3YXRjaGFibGVQYXJhbWV0ZXJzKHBhcmFtZXRlcnM6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPikge1xyXG4gICAgICAgIHRoaXMuX3dhdGNoYWJsZVBhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB3YXRjaGFibGVTdGF0ZVBhcmFtZXRlcnMoKTogQXJyYXk8TWFwcENvY2twaXRTdGF0ZVBhcmFtZXRlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93YXRjaGFibGVTdGF0ZVBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHdhdGNoYWJsZVN0YXRlUGFyYW1ldGVycyhwYXJhbWV0ZXJzOiBBcnJheTxNYXBwQ29ja3BpdFN0YXRlUGFyYW1ldGVyPikge1xyXG4gICAgICAgIHRoaXMuX3dhdGNoYWJsZVN0YXRlUGFyYW1ldGVycyA9IHBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG1lc3NhZ2VQYXJhbWV0ZXJzKCk6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lc3NhZ2VQYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBtZXNzYWdlUGFyYW1ldGVycyhwYXJhbWV0ZXJzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4pIHtcclxuICAgICAgICB0aGlzLl9tZXNzYWdlUGFyYW1ldGVycyA9IHBhcmFtZXRlcnM7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldCBjb25maWd1cmF0aW9uUGFyYW1ldGVycygpOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWd1cmF0aW9uUGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcbiAgICBzZXQgY29uZmlndXJhdGlvblBhcmFtZXRlcnMocGFyYW1ldGVyczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+KSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlndXJhdGlvblBhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXQgcGFyYW1ldGVyc1NvdXJjZSgpOiBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGFyYW1ldGVyc1NvdXJjZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWVzc2FnZVBhcmFtZXRlcnNTb3VyY2UoKTogUHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+PiB7XHJcbiAgICAgICAgLy8gZmlsdGVyIHRoZSB3YXRjaGFibGVzIGFuZCB1cGRhdGUgdGhlIHdhdGNoYWJsZXMgcGFyYW1ldGVyIGxpc3RcclxuICAgICAgICB0aGlzLl9tZXNzYWdlUGFyYW1ldGVyc1NvdXJjZS52YWx1ZSA9IHRoaXMuX21lc3NhZ2VQYXJhbWV0ZXJzO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tZXNzYWdlUGFyYW1ldGVyc1NvdXJjZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgd2F0Y2hhYmxlUGFyYW1ldGVyc1NvdXJjZSgpOiBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4+IHtcclxuICAgICAgICAvLyBmaWx0ZXIgdGhlIHdhdGNoYWJsZXMgYW5kIHVwZGF0ZSB0aGUgd2F0Y2hhYmxlcyBwYXJhbWV0ZXIgbGlzdFxyXG4gICAgICAgIHRoaXMuX3dhdGNoYWJsZVBhcmFtZXRlcnNTb3VyY2UudmFsdWUgPSB0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzU291cmNlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXQgY29uZmlndXJhdGlvblBhcmFtZXRlcnNTb3VyY2UoKTogUHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+PiB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlndXJhdGlvblBhcmFtZXRlcnNTb3VyY2UudmFsdWUgPSB0aGlzLl9jb25maWd1cmF0aW9uUGFyYW1ldGVycztcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlndXJhdGlvblBhcmFtZXRlcnNTb3VyY2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWZyZXNoZXMgdGhlIGNvbXBvbmVudHMgcGFyYW1ldGVyIGxpc3RcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdPn0gZGF0YUxpbmtcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgcmVxdWVzdFJlYWRDb21wb25lbnRQYXJhbWV0ZXJzKGRhdGFMaW5rOiBQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdPik6IFByb21pc2U8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXT4ge1xyXG4gICAgICAgIGxldCBjb21wb25lbnRQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdID0gW107XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBjb21wb25lbnRzIG1haW4gbW9kZWxcclxuICAgICAgICBsZXQgbW9kZWwgPSAoPGFueT50aGlzKS5tb2RlbCBhcyBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbDtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAobW9kZWwpIHtcclxuICAgICAgICAgICAgICAgIC8vIHJlYWQgcGFyYW1ldGVyIGNvbXBvbmVudCBzZXRcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudFBhcmFtZXRlcnMgPSBhd2FpdCBtb2RlbC5icm93c2VQYXJhbWV0ZXJzKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBkYXRhIGxpbmtcclxuICAgICAgICAgICAgICAgIGRhdGFMaW5rLnJlYWRSZXF1ZXN0RXhlY3V0ZWQoY29tcG9uZW50UGFyYW1ldGVycyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBkYXRhTGluay5yZWFkUmVxdWVzdFJlamVjdGVkKGVycm9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb21wb25lbnRQYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZnJlc2hlcyB0aGUgY29tcG9uZW50cyBtZXRob2RzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdPn0gZGF0YUxpbmtcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgcmVxdWVzdFJlYWRDb21wb25lbnRNZXRob2RzKGRhdGFMaW5rOiBQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdPik6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudE1ldGhvZHM6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW10gPSBbXTtcclxuICAgICAgICAvLyBnZXQgdGhlIGNvbXBvbmVudHMgbWFpbiBtb2RlbFxyXG4gICAgICAgIGxldCBtb2RlbCA9ICg8YW55PnRoaXMpLm1vZGVsIGFzIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChtb2RlbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gcmVhZCBwYXJhbWV0ZXIgY29tcG9uZW50IHNldFxyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50TWV0aG9kcyA9IGF3YWl0IG1vZGVsLmJyb3dzZU1ldGhvZHModGhpcyk7XHJcbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgdGhlIGRhdGEgbGlua1xyXG4gICAgICAgICAgICAgICAgZGF0YUxpbmsucmVhZFJlcXVlc3RFeGVjdXRlZChjb21wb25lbnRNZXRob2RzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGRhdGFMaW5rLnJlYWRSZXF1ZXN0UmVqZWN0ZWQoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudE1ldGhvZHM7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqICBnZXRzIHRoZSBtZXRhIGRhdGEgb2YgYSBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBnZXQgbWV0YURhdGEoKTogTWFwcENvY2twaXRDb21wb25lbnRNZXRhRGF0YSB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21ldGFEYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBtZXRhRGF0YShtZXRhRGF0YTogTWFwcENvY2twaXRDb21wb25lbnRNZXRhRGF0YSB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuX21ldGFEYXRhID0gbWV0YURhdGE7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVnaXN0ZXJzIG9yIG1hcmtzIHRoZSBjb21wb25lbnQgYXMgdXNlciBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50fSBjb21wb25lbnRcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByZWdpc3RlclVzZXJDb21wb25lbnQoY29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudCk6IHZvaWQge1xyXG4gICAgICAgICg8YW55PmNvbXBvbmVudCkuaXNVc2VyQ29tcG9uZW50ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGVybWluZXMgaWYgdGhlIGNvbXBvbmVudCBpcyBhIHVzZXIgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudH0gY29tcG9uZW50XHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaXNVc2VyQ29tcG9uZW50KGNvbXBvbmVudDogTWFwcENvY2twaXRDb21wb25lbnQpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gKDxhbnk+Y29tcG9uZW50KS5pc1VzZXJDb21wb25lbnQ7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vKipcclxuICogVGhlIGNsYXNzIGltcGxlbWVudHMgbWV0aG9kIGFjY2Vzcy5cclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kXHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCBleHRlbmRzIE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbSB7XHJcblxyXG4gICAgLy8gSG9sZHMgdGhlIG1ldGhvZCBwYXJhbWV0ZXJzXHJcbiAgICBwcml2YXRlIF9pbnB1dFBhcmFtZXRlcnM6IEFycmF5PE1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyPiA9IFtdO1xyXG4gICAgXHJcbiAgICAvLyBzcGVjZWZpZXMgaWYgdGhlIG1ldGhvZCBpcyBleGVjdXRhYmxlXHJcbiAgICBwcm90ZWN0ZWQgX2lzRXhlY3V0YWJsZTogUHJvcGVydHk8Ym9vbGVhbj4gPSBQcm9wZXJ0eS5jcmVhdGU8Ym9vbGVhbj4oZmFsc2UsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCAodmFsdWUpID0+IHRoaXMubWV0aG9kSXNFeGVjdXRhYmxlKHZhbHVlKSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpbnB1dCBwYXJhbWV0ZXJzIG9mIHRoZSBtZXRob2RcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtBcnJheTxNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcj59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBpbnB1dFBhcmFtZXRlcnMoKTogQXJyYXk8TWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXI+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5wdXRQYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgaW5wdXRQYXJhbWV0ZXJzKHZhbHVlOiBBcnJheTxNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcj4pIHtcclxuICAgICAgICB0aGlzLl9pbnB1dFBhcmFtZXRlcnMgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEludm9rZXMgdGhlIGV4ZWN1dGlvbiBvZiB0aGUgY29tcG9uZW50IG1ldGhvZFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2R9IGNvbXBvbmVudE1ldGhvZFxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIGV4ZWN1dGUoY29tcG9uZW50TWV0aG9kOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBtZXRob2RzIG1vZGVsIGZyb20gdGhlIHBhcmVudCBjb21wb25lbnRcclxuICAgICAgICBsZXQgbW9kZWwgPSAoPGFueT5jb21wb25lbnRNZXRob2QuY29tcG9uZW50KS5tb2RlbCBhcyBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbDtcclxuICAgICAgICBpZiAobW9kZWwgJiYgbW9kZWwuZXhlY3V0ZUNvbXBvbmVudE1ldGhvZCkge1xyXG4gICAgICAgICAgICAvLyBpbnZva2UgdGhlIGV4ZWN1dGlvbiBvZiB0aGUgbWV0aG9kXHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBtb2RlbC5leGVjdXRlQ29tcG9uZW50TWV0aG9kKGNvbXBvbmVudE1ldGhvZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmluZHMgYSBtZXRob2QgYnkgbmFtZVxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2ROYW1lXHJcbiAgICAgKiBAcGFyYW0geyhNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdfHVuZGVmaW5lZCl9IGNvbXBvbmVudE1ldGhvZHNcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2luY2x1ZGVJbnRlcm5hbHM9dHJ1ZV1cclxuICAgICAqIEByZXR1cm5zIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZHx1bmRlZmluZWR9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGZpbmQobWV0aG9kTmFtZTogc3RyaW5nLCBjb21wb25lbnRNZXRob2RzOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdIHwgdW5kZWZpbmVkLCBpbmNsdWRlSW50ZXJuYWxzOiBib29sZWFuID0gdHJ1ZSk6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kIHwgdW5kZWZpbmVkIHtcclxuXHJcbiAgICAgICAgbGV0IG1ldGhvZDogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIGlmIChjb21wb25lbnRNZXRob2RzKSB7XHJcbiAgICAgICAgICAgIGxldCBtb2RlbCA9ICg8YW55PmNvbXBvbmVudE1ldGhvZHNbMF0uY29tcG9uZW50KS5tb2RlbCBhcyBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbDtcclxuICAgICAgICAgICAgaWYgKG1vZGVsKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBleGVjdXRhYmxlIG1ldGhvZHNcclxuICAgICAgICAgICAgICAgIGxldCBleGVjdXRhYmxlTWV0aG9kcyA9IGluY2x1ZGVJbnRlcm5hbHMgPyAoPGFueT5jb21wb25lbnRNZXRob2RzWzBdKS5jb21wb25lbnQubWV0aG9kcyA6IGNvbXBvbmVudE1ldGhvZHM7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG1hdGNoaW5nTWV0aG9kcyA9IGV4ZWN1dGFibGVNZXRob2RzLmZpbHRlcigobWV0aG9kKSA9PiB7IHJldHVybiBtZXRob2QuYnJvd3NlTmFtZSA9PT0gbWV0aG9kTmFtZSB9KTtcclxuICAgICAgICAgICAgICAgIGlmIChtYXRjaGluZ01ldGhvZHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY2FsbCB0aGUgcmVxdWVzdGVkIG1ldGhvZFxyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZCA9IG1hdGNoaW5nTWV0aG9kc1swXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1ldGhvZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgaWYgdGhlIG1ldGhvZCBpcyBleGVjdXRhYmxlXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7UHJvcGVydHk8Ym9vbGVhbj59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBpc0V4ZWN1dGFibGUoKTogUHJvcGVydHk8Ym9vbGVhbj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc0V4ZWN1dGFibGU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0ZXJtaW5lcyBpZiB0aGUgbWV0aGlkIGlzIGV4ZWN1dGFibGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGV4ZWN1dGFibGVcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbWV0aG9kSXNFeGVjdXRhYmxlKGV4ZWN1dGFibGU6IGJvb2xlYW4pOiBhbnkge1xyXG4gICAgICAgIGxldCBpc0V4ZWN1dGFibGVWYWx1ZSA9IGV4ZWN1dGFibGU7XHJcbiAgICAgICAgbGV0IG1vZGVsID0gKDxhbnk+dGhpcy5jb21wb25lbnQpLm1vZGVsIGFzIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsO1xyXG4gICAgICAgIGlmIChtb2RlbCAmJiB0aGlzLmNvbXBvbmVudCkge1xyXG4gICAgICAgICAgICAvLyBlbmFibGUgbWV0aG9kIGV4ZWN1dGlvbiBmb3Igbm9uIHVzZXIgY29tcG9uZW50c1xyXG4gICAgICAgICAgICBpc0V4ZWN1dGFibGVWYWx1ZSA9IE1hcHBDb2NrcGl0Q29tcG9uZW50LmlzVXNlckNvbXBvbmVudCh0aGlzLmNvbXBvbmVudCBhcyBNYXBwQ29ja3BpdENvbXBvbmVudCkgPyBpc0V4ZWN1dGFibGVWYWx1ZSA6IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpc0V4ZWN1dGFibGVWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIG1ldGhvZHMgaW5wdXQgcGFyYW1ldGVyc1xyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2R9IGNvbXBvbmVudE1ldGhvZFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8TWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXJbXT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIHVwZGF0ZUlucHV0UGFyYW1ldGVycyhjb21wb25lbnRNZXRob2Q6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kKTogUHJvbWlzZTxNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcltdPiB7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBtZXRob2RzIG1vZGVsIGZyb20gdGhlIHBhcmVudCBjb21wb25lbnRcclxuICAgICAgICBsZXQgbW9kZWwgPSAoPGFueT5jb21wb25lbnRNZXRob2QuY29tcG9uZW50KS5tb2RlbCBhcyBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbDtcclxuICAgICAgICBpZiAobW9kZWwgJiYgbW9kZWwuZXhlY3V0ZUNvbXBvbmVudE1ldGhvZCkge1xyXG4gICAgICAgICAgICBhd2FpdCBtb2RlbC5icm93c2VNZXRob2RJbnB1dFBhcmFtZXRlcnMoY29tcG9uZW50TWV0aG9kKTtcclxuICAgICAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvLnVwZGF0ZU1ldGhvZElucHV0UGFyYW1ldGVycyhjb21wb25lbnRNZXRob2QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29tcG9uZW50TWV0aG9kLmlucHV0UGFyYW1ldGVycztcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmNsYXNzIE1hcHBDb2NrcGl0UGFyYW1ldGVyIGV4dGVuZHMgTWFwcENvY2twaXRDb21wb25lbnRJdGVtIHtcclxuXHJcblxyXG4gICAgLy8gSG9sZHMgdGhlIHBhcmFtZXRlcnMgdHlwZVxyXG4gICAgcHJvdGVjdGVkIF9kYXRhVHlwZTogTWFwcENvY2twaXRQYXJhbWV0ZXJEYXRhVHlwZSA9IG5ldyBNYXBwQ29ja3BpdFBhcmFtZXRlckRhdGFUeXBlKCk7XHJcbiAgICBwcm90ZWN0ZWQgX2VudW1SZWY6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bSA9IG5ldyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW0obnVsbCk7XHJcbiAgICBwcm90ZWN0ZWQgX2VuZ2luZWVyaW5nVW5pdDogc3RyaW5nID0gXCJcIjtcclxuICAgIHByb3RlY3RlZCBfaXNXcml0ZWFibGU6IFByb3BlcnR5PGJvb2xlYW4+ID0gUHJvcGVydHkuY3JlYXRlPGJvb2xlYW4+KGZhbHNlLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgKHZhbHVlKSA9PiB0aGlzLnBhcmFtZXRlcklzV3JpdGFibGUodmFsdWUpKTtcclxuICAgIHByb3RlY3RlZCBfbW9kaWZpZWRWYWx1ZTphbnkgPSB1bmRlZmluZWQ7XHJcbiAgICBwcm90ZWN0ZWQgX3RyYW5zZmVyRmFpbGVkID0gZmFsc2U7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgcGFyYW1ldGVycyB2YWx1ZSBvYmplY3RcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHsoTWFwcENvY2twaXRQYXJhbWV0ZXJEYXRhVHlwZSl9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRQYXJhbWV0ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBkYXRhVHlwZSgpOiBNYXBwQ29ja3BpdFBhcmFtZXRlckRhdGFUeXBlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBkYXRhVHlwZShkYXRhVHlwZTogTWFwcENvY2twaXRQYXJhbWV0ZXJEYXRhVHlwZSkge1xyXG4gICAgICAgIHRoaXMuX2RhdGFUeXBlID0gZGF0YVR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBlbmdpbmVlcmluZ1VuaXQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZW5naW5lZXJpbmdVbml0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgZW5naW5lZXJpbmdVbml0KGVuZ2luZWVyaW5nVW5pdDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fZW5naW5lZXJpbmdVbml0ID0gZW5naW5lZXJpbmdVbml0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZW51bVR5cGUoKTogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZW51bVJlZjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGVudW1UeXBlKGVudW1SZWY6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bSkge1xyXG4gICAgICAgIHRoaXMuX2VudW1SZWYgPSBlbnVtUmVmO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaXNXcml0ZWFibGUoKTogUHJvcGVydHk8Ym9vbGVhbj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc1dyaXRlYWJsZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGVybWluZXMgaWYgdGhlIHByb3BlcnRpZXMgdmFsdWUgaXMgd3JpdGFibGUuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsdWVcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0UGFyYW1ldGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcGFyYW1ldGVySXNXcml0YWJsZSh3cml0YWJsZTogYm9vbGVhbik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCB3cml0YWJsZVZhbHVlID0gd3JpdGFibGU7XHJcbiAgICAgICAgbGV0IG1vZGVsID0gKDxhbnk+dGhpcy5jb21wb25lbnQpLm1vZGVsIGFzIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsO1xyXG4gICAgICAgIGlmIChtb2RlbCkge1xyXG4gICAgICAgICAgICB3cml0YWJsZVZhbHVlID0gd3JpdGFibGUgJiYgbW9kZWwud3JpdGVBY2Nlc3M7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB3cml0YWJsZVZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0cnVucyB0aGUgZGlzcGxheSB2YWx1ZVxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRQYXJhbWV0ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBkaXNwbGF5VmFsdWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZVRvU3RyaW5nKHRoaXMuX3ZhbHVlU291cmNlLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGRpc3BsYXkgdmFsdWVcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRQYXJhbWV0ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBkaXNwbGF5VmFsdWUoaW5wdXRWYWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IG5ld1ZhbHVlID0gdGhpcy52YWx1ZUZyb21TdHJpbmcoaW5wdXRWYWx1ZSk7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWFwcENvY2twaXRQYXJhbWV0ZXIuc2V0RGlzcGxheVZhbHVlICVvIGZvciAlb1wiLCB0aGlzLnZhbHVlLCBpbnB1dFZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIG1vZGlmaWVkIHBhcmFtZXRlciB2YWx1ZS5cclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFBhcmFtZXRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IG1vZGlmaWVkVmFsdWUoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbW9kaWZpZWRWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIG1vZGlmaWVkIHBhcmFtZXRlciB2YWx1ZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRQYXJhbWV0ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBtb2RpZmllZFZhbHVlKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9tb2RpZmllZFZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBtb2RpZmllZCBkaXNwbGF5IHBhcmFtZXRlciB2YWx1ZS5cclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFBhcmFtZXRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IG1vZGlmaWVkRGlzcGxheVZhbHVlKCk6IGFueSB7XHJcbiAgICAgICAgaWYodGhpcy5fbW9kaWZpZWRWYWx1ZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZVRvU3RyaW5nKHRoaXMuX21vZGlmaWVkVmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZVRvU3RyaW5nKHRoaXMuX3ZhbHVlU291cmNlLnZhbHVlKTsgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBtb2RpZmllZCBkaXNwbGF5IHBhcmFtZXRlciB2YWx1ZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRQYXJhbWV0ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBtb2RpZmllZERpc3BsYXlWYWx1ZSh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgbGV0IG5ld1ZhbHVlID0gdGhpcy52YWx1ZUZyb21TdHJpbmcodmFsdWUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX21vZGlmaWVkVmFsdWUgPSBuZXdWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRydWUgaWYgdHJhbnNmZXIgb2YgbW9kaWZpZmVkIHZhbHVlIHdhcyBub3QgcG9zc2libGVcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFBhcmFtZXRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHRyYW5zZmVyRmFpbGVkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RyYW5zZmVyRmFpbGVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2lsbCBiZSBzZXQgdG8gdHJ1ZSBpZiB0cmFuc2ZlciBvZiBtb2RpZmlmZWQgdmFsdWUgd2FzIG5vdCBwb3NzaWJsZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFBhcmFtZXRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IHRyYW5zZmVyRmFpbGVkKHZhbHVlOiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLl90cmFuc2ZlckZhaWxlZCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY29udmVydHMgdGhlIHBhcmFtZXRlciB2YWx1ZSB0byBhIGZvcm1hdHRlZCBzdHJpbmdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0UGFyYW1ldGVyXHJcbiAgICAgKi9cclxuICAgIHZhbHVlVG9TdHJpbmcodmFsdWU6IGFueSk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHZhbHVlU3RyaW5nID0gXCJcIjtcclxuICAgICAgICAvLyBhdm9pZCBjb252ZXJ0aW5nIG51bGwgb3IgdW5kZWZpbmVkIHZhbHVlXHJcbiAgICAgICAgaWYgKHZhbHVlICE9IG51bGwgJiYgdmFsdWUgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHZhbHVlU3RyaW5nID0gdmFsdWUudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgdmFsdWVTdHJpbmcgPSBOdW1lcmljSGVscGVyLmNvbnZlcnROdW1lcmljU3RyaW5nKHZhbHVlU3RyaW5nLCB0aGlzLmRhdGFUeXBlLm5hbWUpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5lbnVtVHlwZS5pc0RlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlU3RyaW5nID0gdGhpcy5lbnVtVHlwZS5nZXREaXNwbGF5VmFsdWUodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWx1ZVN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNvbnZlcnRzIGEgcGFyYW1ldGVyIHZhbHVlIHN0cmluZyB0byBhIHZhbHVlIGFjY29yZGluZyB0byB0aGUgcGFyYW1ldGVycyBkYXRhIHR5cGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRWYWx1ZVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRQYXJhbWV0ZXJcclxuICAgICAqL1xyXG4gICAgdmFsdWVGcm9tU3RyaW5nKGlucHV0VmFsdWU6IHN0cmluZyk6IGFueSB7XHJcblxyXG4gICAgICAgIC8vIHNldCBhbiBlbXB0eSBzdHJpbmcgZm9yIGFuIHVuZGVmaW5lZCBpbnB1dCB2YWx1ZVxyXG4gICAgICAgIGxldCB2YWx1ZSA9IGlucHV0VmFsdWUgIT09IHVuZGVmaW5lZCAmJiBpbnB1dFZhbHVlICE9PSBudWxsID8gaW5wdXRWYWx1ZSA6IFwiXCI7XHJcblxyXG4gICAgICAgIC8vIHJlcGxhY2UgdGhlIGVudW0gc3RyaW5nIGJ5IHRoZSB2YWx1ZSBpZiB0aGVyZSBpcyBvbmUgZGVmaW5lZC5cclxuICAgICAgICBpZiAodGhpcy5lbnVtVHlwZS5pc0RlZmluZWQpIHtcclxuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmVudW1UeXBlLmdldFZhbHVlKGlucHV0VmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBUaGUgY2xhc3MgaW1wbGVtZW50cyBhIGNvbXBvbmVudCBwYXJhbWV0ZXJcclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyXHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlciBleHRlbmRzIE1hcHBDb2NrcGl0UGFyYW1ldGVyIHtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IoY29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW0gfCBudWxsLCBuYW1lOiBzdHJpbmcsIHJlZmVyZW5jZTogYW55KSB7XHJcbiAgICAgICAgc3VwZXIoY29tcG9uZW50LCBuYW1lLCByZWZlcmVuY2UpO1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlU291cmNlID0gUHJvcGVydHkuY3JlYXRlPGFueT4oXCJcIiwgdW5kZWZpbmVkLCAoZGF0YUxpbmspID0+IHRoaXMucmVxdWVzdFdyaXRlVmFsdWUoZGF0YUxpbmspKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcml0ZXMgdGhlIGN1cnJlbnQgcGFyYW1ldGVyIHZhbHVlIHRvIHRhcmdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlclxyXG4gICAgICovXHJcbiAgICB3cml0ZShyZWZsZWN0ZWRXcml0ZVJlc3BvbnNlRGVsZWdhdGU6ICgocmVzdWx0RGF0YTogYW55KSA9PiB2b2lkKSB8IHVuZGVmaW5lZCkge1xyXG5cclxuICAgICAgICAvLyBjb25uZWN0IHRoZSB3cml0ZSByZXNwb25zZSBkZWxlZ2F0ZVxyXG4gICAgICAgIHRoaXMucmVmbGVjdGVkV3JpdGVSZXNwb25zZURlbGVnYXRlID0gcmVmbGVjdGVkV3JpdGVSZXNwb25zZURlbGVnYXRlO1xyXG5cclxuICAgICAgICAvLyBleGVjdXRlIHdyaXRpbmcgdGhlIHBhcmFtZXRlciB2YWx1ZVxyXG4gICAgICAgIHRoaXMudmFsdWVTb3VyY2Uud3JpdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdyaXRlcyB0aGUgZGF0YSBsaW5rcyB2YWx1ZSB0byB0YXJnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtQcm9wZXJ0eTxhbnk+fSBkYXRhTGlua1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgcmVxdWVzdFdyaXRlVmFsdWUoZGF0YUxpbms6IFByb3BlcnR5PGFueT4pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBsZXQgY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnQ7XHJcbiAgICAgICAgICAgIGlmIChjb21wb25lbnQgJiYgKDxhbnk+Y29tcG9uZW50KS5tb2RlbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1vZGVsID0gKDxhbnk+Y29tcG9uZW50KS5tb2RlbCBhcyBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbDtcclxuICAgICAgICAgICAgICAgIGF3YWl0IG1vZGVsLndyaXRlQ29tcG9uZW50UGFyYW1ldGVyKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgZGF0YUxpbmsud3JpdGVSZXF1ZXN0RXhlY3V0ZWQobnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBkYXRhTGluay53cml0ZVJlcXVlc3RSZWplY3RlZChlcnJvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYXRlcyB0aGUgb2JzZXJ2YXRpb24gb2YgcGFyYW1ldGVyIHZhbHVlIGNoYW5nZXNcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IHdhdGNoYWJsZVBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBvYnNlcnZlUGFyYW1ldGVyVmFsdWVDaGFuZ2VzKG9ic2VydmVyOiBJT2JzZXJ2ZXIsIG9ic2VydmFibGVQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKTogYW55IHtcclxuICAgICAgICBpZiAob2JzZXJ2YWJsZVBhcmFtZXRlcnMubGVuZ3RoID4gMCAmJiBvYnNlcnZhYmxlUGFyYW1ldGVyc1swXSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBwYXJhbWV0ZXJzIG1vZGVsIGZyb20gdGhlIHBhcmVudCBjb21wb25lbnRcclxuICAgICAgICAgICAgbGV0IG1vZGVsID0gTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIuZ2V0TW9kZWwob2JzZXJ2YWJsZVBhcmFtZXRlcnNbMF0pO1xyXG4gICAgICAgICAgICBpZiAobW9kZWwgJiYgbW9kZWwub2JzZXJ2ZURhdGFNb2RlbEl0ZW1zKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpbnZva2UgdGhlIG9ic2VydmF0aW9uIG9uIHRoZSBtb2RlbFxyXG4gICAgICAgICAgICAgICAgbW9kZWwub2JzZXJ2ZURhdGFNb2RlbEl0ZW1zKG9ic2VydmVyLCBvYnNlcnZhYmxlUGFyYW1ldGVycyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBY3RpdmF0ZXMgbW9kZWwgaXRlbXMgcmVnaXN0ZXJlZCBmb3Igb2JzZXJ2YXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0geyp9IG9ic2VydmVyXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IG9ic2VydmFibGVQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYWN0aXZhdGVDb21wb25lbnRNb2RlbEl0ZW1zKG9ic2VydmVyOiBhbnksIG9ic2VydmFibGVQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKTogYW55IHtcclxuICAgICAgICAvL1RPRE86IGltcGxlbWVudCBtb2RlbCBpdGVtIGFjdGl2YXRpb24gaGFuZGxpbmdcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVbm9ic2VydmVzIGFsbCBvYnNlcnZhYmxlcyBhc3NvY2lhdGVkIHdpdGggdGhlIG9ic2VydmVyXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHsqfSBvYnNlcnZlclxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBvYnNlcnZlZFBhcmFtZXRlcnNcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW3N1c3BlbmQ9dHJ1ZV0gc3VzcGVuZHMgdGhlIG9ic2VydmF0aW9uIGlmIHRydWUgb3RoZXJ3aXNlIHJlbW92ZXMgdGhlIHdob2xlIHN1YnNjcmlwdGlvblxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyB1bm9ic2VydmVDb21wb25lbnRNb2RlbEl0ZW1zKG9ic2VydmVyOiBhbnksIG9ic2VydmVkUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSwgc3VzcGVuZDogYm9vbGVhbiA9IHRydWUpIHtcclxuICAgICAgICBpZiAob2JzZXJ2ZWRQYXJhbWV0ZXJzLmxlbmd0aCA+IDAgJiYgb2JzZXJ2ZWRQYXJhbWV0ZXJzWzBdICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBsZXQgbW9kZWwgPSBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlci5nZXRNb2RlbChvYnNlcnZlZFBhcmFtZXRlcnNbMF0pO1xyXG4gICAgICAgICAgICBpZiAobW9kZWwgJiYgbW9kZWwudW5vYnNlcnZlQ29tcG9uZW50TW9kZWxJdGVtcykge1xyXG4gICAgICAgICAgICAgICAgLy8gaW52b2tlIHRoZSB1bm9ic2VydmF0aW9uIG9uIHRoZSBtb2RlbFxyXG4gICAgICAgICAgICAgICAgbW9kZWwudW5vYnNlcnZlQ29tcG9uZW50TW9kZWxJdGVtcyhvYnNlcnZlciwgb2JzZXJ2ZWRQYXJhbWV0ZXJzLCBzdXNwZW5kKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVhY3RpdmF0ZXMgbW9kZWwgaXRlbXMgcmVnaXN0ZXJlZCBmb3Igb2JzZXJ2YXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0geyp9IG9ic2VydmVyXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IG9ic2VydmVkUGFyYW1ldGVyc1xyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbc3VzcGVuZD10cnVlXVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBkZWFjdGl2YXRlQ29tcG9uZW50TW9kZWxJdGVtcyhvYnNlcnZlcjogYW55LCBvYnNlcnZlZFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10sIHN1c3BlbmQ6IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICAgICAgLy9UT0RPOiBpbXBsZW1lbnQgbW9kZWwgaXRlbSBkZWFjdGl2YXRpb24gaGFuZGxpbmdcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBwYXJhbWV0ZXJzIG1vZGVsXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gb2JzZXJ2YWJsZVBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0TW9kZWwoY29tcG9uZW50UGFyYW1ldGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcikge1xyXG4gICAgICAgIGlmICghY29tcG9uZW50UGFyYW1ldGVyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJjb21wb25lbnRQYXJhbWV0ZXIgdW5kZWZpbmVkICFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghY29tcG9uZW50UGFyYW1ldGVyLmNvbXBvbmVudCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiY29tcG9uZW50UGFyYW1ldGVyLmNvbXBvbmVudCB1bmRlZmluZWQgIVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICg8YW55PmNvbXBvbmVudFBhcmFtZXRlci5jb21wb25lbnQpLm1vZGVsIGFzIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZWZpbmVzIGNsYXNzIHVzZWQgZm9yIHN0YXRlIGljb25zXHJcbiAqXHJcbiAqIEBjbGFzcyBNYXBwQ29ja3BpdFN0YXRlUGFyYW1ldGVyXHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdFN0YXRlUGFyYW1ldGVyIHtcclxuXHJcbiAgICAvLyBIb2xkcyBuYW1lIG9mIHdhdGNoYWJsZSBzdGF0ZSBwYXJhbWV0ZXJcclxuICAgIHByaXZhdGUgX25hbWU6IHN0cmluZztcclxuICAgIC8vIEhvbGRzIHdhdGNoYWJsZSBzdGF0ZSBleHByZXNzaW9uIGNsYXNzXHJcbiAgICBwdWJsaWMgc3RhdGVFeHByZXNzaW9uID0gbmV3IFdhdGNoYWJsZVN0YXRlRXhwcmVzc2lvbigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgZXhwcmVzc2lvbjogc3RyaW5nLCB3YXRjaGFibGVNYXBwaW5nOiBBcnJheTxbc3RyaW5nLCBzdHJpbmddPiwgaWNvbikge1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuc3RhdGVFeHByZXNzaW9uID0gbmV3IFdhdGNoYWJsZVN0YXRlRXhwcmVzc2lvbihuYW1lLCBleHByZXNzaW9uLCB3YXRjaGFibGVNYXBwaW5nLCBpY29uKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyBhIG1ldGhvZCBwYXJhbWV0ZXJcclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyXHJcbiAqIEBleHRlbmRzIHtNYXBwQ29ja3BpdFBhcmFtZXRlcn1cclxuICovXHJcbmNsYXNzIE1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyIGV4dGVuZHMgTWFwcENvY2twaXRQYXJhbWV0ZXIge1xyXG5cclxuICAgIC8vIEhvbGRzIGluZm9ybWF0aW9uIGFib3V0IHRoZSBmaWx0ZXIgbWVjaGFuaXNtXHJcbiAgICBwcml2YXRlIF9maWx0ZXI6IFBhcmFtZXRlckZpbHRlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbSB8IG51bGwsIG5hbWU6IHN0cmluZywgcmVmZXJlbmNlOiBhbnkpIHtcclxuICAgICAgICBzdXBlcihjb21wb25lbnQsIG5hbWUsIHJlZmVyZW5jZSk7XHJcbiAgICAgICAgdGhpcy5fZmlsdGVyID0gbmV3IFBhcmFtZXRlckZpbHRlcigpXHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGZpbHRlcihmaWx0ZXI6IFBhcmFtZXRlckZpbHRlcikge1xyXG4gICAgICAgIHRoaXMuX2ZpbHRlciA9IGZpbHRlcjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZmlsdGVyKCk6IFBhcmFtZXRlckZpbHRlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbHRlcjtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIERlZmluZXMgdGhlIGNsYXMgZm9yIHF1aWNrY29tbWFuZHNcclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0UXVpY2tDb21tYW5kUGFyYW1ldGVyXHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdFF1aWNrQ29tbWFuZFBhcmFtZXRlciB7XHJcblxyXG4gICAgLy9Ib2xkcyBuYW1lIG9mIG1ldGhvZCBwYXJhbWV0ZXJcclxuICAgIHByaXZhdGUgX25hbWU6IHN0cmluZztcclxuICAgIC8vSG9sZHMgdG9vbHRpcCBpbmZvcm1hdGlvblxyXG4gICAgcHJpdmF0ZSBfdG9vbHRpcDogc3RyaW5nO1xyXG4gICAgLy9Ib2xkcyBuYW1lIG9mIGltYWdlIHVzZWRcclxuICAgIHByaXZhdGUgX2ltYWdlTmFtZTogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgdG9vbHRpcDogc3RyaW5nLCBpbWFnZU5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuX3Rvb2x0aXAgPSB0b29sdGlwO1xyXG4gICAgICAgIHRoaXMuX2ltYWdlTmFtZSA9IGltYWdlTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHRvb2x0aXAoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdG9vbHRpcDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGltYWdlTmFtZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW1hZ2VOYW1lO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogZGVmaW5lcyB0aGUgcGFyYW1ldGVyIGRhdGEgdHlwZVxyXG4gKlxyXG4gKiBAY2xhc3MgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJEYXRhVHlwZVxyXG4gKi9cclxuY2xhc3MgTWFwcENvY2twaXRQYXJhbWV0ZXJEYXRhVHlwZSB7XHJcbiAgICBwcml2YXRlIF9kYXRhVHlwZUlkID0gXCJ1bmRlZmluZWRcIjtcclxuICAgIHByaXZhdGUgX2RhdGFUeXBlTmFtZSA9IFwidW5kZWZpbmVkXCI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZGF0YVR5cGVJZDogc3RyaW5nID0gXCJ1bmRlZmluZWRcIiwgZGF0YVR5cGVOYW1lOiBzdHJpbmcgPSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YVR5cGVJZCA9IGRhdGFUeXBlSWQ7XHJcbiAgICAgICAgdGhpcy5fZGF0YVR5cGVOYW1lID0gZGF0YVR5cGVOYW1lO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAgICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGlmIHRoZSBkYXRhIHR5cGUgaXMgZGVmaW5lZC5cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFBhcmFtZXRlclxyXG4gICAgICovXHJcbiAgICAgZ2V0IGlzRGVmaW5lZCgpe1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVR5cGVJZCAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0aGlzLl9kYXRhVHlwZU5hbWUgIT09IFwidW5kZWZpbmVkXCI7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXQgaWQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcywgdGhpcy5fZGF0YVR5cGVJZFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhVHlwZU5hbWVcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudHMgYSBzaW5nbGUgZW51bSB2YWx1ZSB3aXRoIHZhbHVlIGFuZCBzdHJpbmdcclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bVZhbHVlXHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1WYWx1ZSBpbXBsZW1lbnRzIElWYWx1ZUxpc3RJdGVtIHtcclxuICAgIF9kaXNwbGF5VmFsdWU6IHN0cmluZyA9IFwidW5kZWZpbmVkXCI7XHJcbiAgICBfdmFsdWU6IGFueSA9IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bVZhbHVlLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRpc3BsYXlUZXh0XHJcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtVmFsdWVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZGlzcGxheVRleHQ6IHN0cmluZywgdmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX2Rpc3BsYXlWYWx1ZSA9IGRpc3BsYXlUZXh0O1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXRzIHRoZSB2YWx1ZSBvZiB0aGUgZW51bVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtVmFsdWVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB2YWx1ZSgpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgdGhlIHN0cmluZyBvZiB0aGUgZW51bSB2YWx1ZVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1WYWx1ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGRpc3BsYXlWYWx1ZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNwbGF5VmFsdWU7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyBhIHBhcmFtZXRlciBlbnVtIGhvbGRpbmcgYSBjb2xsZWN0aW9uIG9mIGVudW0gaXRlbXNcclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bVxyXG4gKi9cclxuY2xhc3MgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtIHtcclxuXHJcbiAgICBwcml2YXRlIF9icm93c2VOYW1lOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgIF9lbnVtVmFsdWVzUmVmZXJlbmNlOiBhbnk7XHJcblxyXG4gICAgcHJpdmF0ZSBfZW51bVZhbHVlcyE6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bVZhbHVlW107XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGVudW1WYWx1ZXNSZWZlcmVuY2U6IGFueSA9IG51bGwpIHtcclxuICAgICAgICB0aGlzLl9lbnVtVmFsdWVzUmVmZXJlbmNlID0gZW51bVZhbHVlc1JlZmVyZW5jZTtcclxuICAgICAgICBpZiAodGhpcy5fZW51bVZhbHVlc1JlZmVyZW5jZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9icm93c2VOYW1lID0gdGhpcy5fZW51bVZhbHVlc1JlZmVyZW5jZS5icm93c2VOYW1lO1xyXG4gICAgICAgICAgICB0aGlzLl9lbnVtVmFsdWVzID0gdGhpcy5fZW51bVZhbHVlc1JlZmVyZW5jZS5lbnVtVmFsdWVzLm1hcCgoZW51bVZhbHVlUmVmKSA9PiB7IHJldHVybiBuZXcgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtVmFsdWUoZW51bVZhbHVlUmVmLmRpc3BsYXlOYW1lLnRleHQsIGVudW1WYWx1ZVJlZi52YWx1ZSk7IH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgdGhlIGJyb3dzZSBuYW1lIG9mIHRoZSBlbnVtXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGJyb3dzZU5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZW51bVZhbHVlc1JlZmVyZW5jZS5icm93c2VOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyB0aGUgY29sbGVjdGlvbiBvZiBlbnVtIGl0ZW1zXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtVmFsdWVbXX1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB2YWx1ZXMoKTogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtVmFsdWVbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VudW1WYWx1ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkZXRlcm1pbmVzIGlmIHRoZSBlbnVtIGlzIGRlZmluZWQgYW5kIGNvbnRhaW5zIHZhbHVlc1xyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgaXNEZWZpbmVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lbnVtVmFsdWVzICYmIHRoaXMuX2VudW1WYWx1ZXMubGVuZ3RoID4gMDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXRzIGEgc3RyaW5nIG1hdGNoaW5nIHRoZSBzcGVjaWZpZWQgZW51bSB2YWx1ZSwgb3RoZXJ3aXNlIHJldHVybiB2YWx1ZSBzdHJpbmcgYXMgZGVmYXVsdC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1cclxuICAgICAqL1xyXG4gICAgZ2V0RGlzcGxheVZhbHVlKGVudW1WYWx1ZTogYW55KTogc3RyaW5nIHtcclxuICAgICAgICAvLyBnZXQgYW4gZW51bSBpdGVtIG1hdGNoaW5nIHRoZSByZXF1ZXN0ZWQgdmFsdWVcclxuICAgICAgICBsZXQgbWF0Y2hpbmdFbnVtSXRlbSA9IHRoaXMuZmluZE1hdGNoaW5nRW51bUl0ZW1CeVZhbHVlKGVudW1WYWx1ZSk7XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgdmFsdWUgc3RyaW5nIHRvIHRoZSBtYXRjaGluZyBvbmUgb3IgdXNlIHRoZSBkZWZhdWx0IHN0cmluZ1xyXG4gICAgICAgIGxldCBlbnVtVmFsdWVTdHJpbmcgPSBtYXRjaGluZ0VudW1JdGVtID8gbWF0Y2hpbmdFbnVtSXRlbS5kaXNwbGF5VmFsdWUgOiBlbnVtVmFsdWUudG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVudW1WYWx1ZVN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlucHV0VmFsdWVcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bVxyXG4gICAgICovXHJcbiAgICBnZXRWYWx1ZShlbnVtRGlzcGxheVZhbHVlOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgIGxldCBlbnVtVmFsdWUgPSBlbnVtRGlzcGxheVZhbHVlO1xyXG4gICAgICAgIC8vIGdldCBhbiBlbnVtIGl0ZW0gbWF0Y2hpbmcgdGhlIHJlcXVlc3RlZCBzdHJpbmdcclxuICAgICAgICBsZXQgbWF0Y2hpbmdFbnVtSXRlbSA9IHRoaXMuZmluZE1hdGNoaW5nRW51bUl0ZW1CeVN0cmluZyhlbnVtRGlzcGxheVZhbHVlKTtcclxuICAgICAgICBpZiAobWF0Y2hpbmdFbnVtSXRlbSkge1xyXG4gICAgICAgICAgICBlbnVtVmFsdWUgPSBtYXRjaGluZ0VudW1JdGVtLnZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW0uZ2V0VmFsdWU6IGNvdWxkIG5vdCBmaW5kIG1hdGNoaW5nIGVudW0gdmFsdWUgZm9yICVvXCIsIGVudW1EaXNwbGF5VmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGVudW1WYWx1ZTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZmluZCBhbiBlbnVtIGl0ZW0gd2l0aCBtYXRjaGluZyB2YWx1ZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGVudW1WYWx1ZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBmaW5kTWF0Y2hpbmdFbnVtSXRlbUJ5VmFsdWUoZW51bVZhbHVlOiBhbnkpIHtcclxuICAgICAgICBsZXQgbWF0Y2hpbmdFbnVtSXRlbSA9IHRoaXMuX2VudW1WYWx1ZXMuZmlsdGVyKChlbnVtSXRlbSkgPT4geyByZXR1cm4gZW51bUl0ZW0udmFsdWUgPT0gZW51bVZhbHVlOyB9KTtcclxuICAgICAgICByZXR1cm4gbWF0Y2hpbmdFbnVtSXRlbS5sZW5ndGggPT09IDEgPyBtYXRjaGluZ0VudW1JdGVtWzBdIDogdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZmluZCBhbiBlbnVtIGl0ZW0gd2l0aCBtYXRjaGluZyBzdHJpbmdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZW51bURpc3BsYXlWYWx1ZVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtXHJcbiAgICAgKi9cclxuICAgIGZpbmRNYXRjaGluZ0VudW1JdGVtQnlTdHJpbmcoZW51bURpc3BsYXlWYWx1ZTogc3RyaW5nKTogYW55IHtcclxuICAgICAgICBsZXQgbWF0Y2hpbmdFbnVtSXRlbSA9IHRoaXMuX2VudW1WYWx1ZXMuZmlsdGVyKChlbnVtSXRlbSkgPT4geyByZXR1cm4gZW51bUl0ZW0uZGlzcGxheVZhbHVlID09PSBlbnVtRGlzcGxheVZhbHVlOyB9KTtcclxuICAgICAgICByZXR1cm4gbWF0Y2hpbmdFbnVtSXRlbS5sZW5ndGggPT09IDEgPyBtYXRjaGluZ0VudW1JdGVtWzBdIDogdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBNYXBwQ29ja3BpdENvbXBvbmVudCwgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIsIE1hcHBDb2NrcGl0U3RhdGVQYXJhbWV0ZXIsIE1hcHBDb2NrcGl0UXVpY2tDb21tYW5kUGFyYW1ldGVyLCBNYXBwQ29ja3BpdFBhcmFtZXRlckRhdGFUeXBlLCBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW0sIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bVZhbHVlLCBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCwgTWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXIsIE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbVxyXG59O1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIl19