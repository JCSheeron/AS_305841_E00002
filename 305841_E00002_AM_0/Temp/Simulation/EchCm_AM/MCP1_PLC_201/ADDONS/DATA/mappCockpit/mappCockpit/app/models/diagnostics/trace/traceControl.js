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
define(["require", "exports", "../../online/mappCockpitComponent", "../../online/mappCockpitComponentReflection", "../../../framework/property", "../../../framework/command", "./traceDataReader", "./traceConfig/traceConfigData", "./traceConfig/traceConfigExport", "./traceConfig/traceConfigImport", "../../../framework/componentHub/bindings/componentBinding", "../../../framework/componentHub/bindings/componentBindings"], function (require, exports, mappCockpitComponent_1, mappCockpitComponentReflection_1, property_1, command_1, traceDataReader_1, traceConfigData_1, traceConfigExport_1, traceConfigImport_1, componentBinding_1, componentBindings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Defines the browsenames of the trace control methods on the opc ua server (e.g. "Activate")
     *
     * @class TraceMethodIds
     */
    var TraceMethodIds = /** @class */ (function () {
        function TraceMethodIds() {
        }
        TraceMethodIds.Activate = "Activate";
        TraceMethodIds.ForceStop = "ForceStop";
        TraceMethodIds.ForceStart = "ForceStart";
        TraceMethodIds.SaveTraceConfig = "SaveTraceConfig";
        TraceMethodIds.Reset = "Reset";
        TraceMethodIds.RemoveDataPoint = "RemoveDataPoint";
        TraceMethodIds.RemoveStartTrigger1 = "RemoveStartTrigger1";
        TraceMethodIds.RemoveStartTrigger2 = "RemoveStartTrigger2";
        TraceMethodIds.AddDataPoint = "AddDataPoint";
        TraceMethodIds.SetStartTrigger = "SetStartTrigger";
        return TraceMethodIds;
    }());
    var TraceControl = /** @class */ (function () {
        /**
         * Creates an instance of TraceControl.
         * @param {MappCockpitDiagnosticProvider} diagnosticProvider
         * @memberof TraceControl
         */
        function TraceControl(diagnosticProvider) {
            this._actualTraceState = "";
            this._traceDataLoading = false;
            this._diagnosticProvider = diagnosticProvider;
            this._traceDataReader = new traceDataReader_1.MappCockpitTraceDataReader(diagnosticProvider);
            this.createComponentBindings();
        }
        ;
        /**
         * Creates the bindings to other components
         *
         * @private
         * @memberof TraceControl
         */
        TraceControl.prototype.createComponentBindings = function () {
            var bindingActivateTrace = new componentBinding_1.ComponentBinding();
            bindingActivateTrace.type = componentBinding_1.BindingType.COMMAND;
            bindingActivateTrace.component = this;
            bindingActivateTrace.scope = "app::trace control";
            bindingActivateTrace.id = "trace activate";
            bindingActivateTrace.targetKey = "activateTrace";
            componentBindings_1.ComponentBindings.bind(bindingActivateTrace);
            var bindingTraceActivated = new componentBinding_1.ComponentBinding();
            bindingTraceActivated.type = componentBinding_1.BindingType.COMMAND_RESPONSE;
            bindingTraceActivated.component = this;
            bindingTraceActivated.scope = "app::trace control";
            bindingTraceActivated.id = "trace activated";
            bindingTraceActivated.sourceKey = "onTraceActivated";
            componentBindings_1.ComponentBindings.bind(bindingTraceActivated);
            var bindingTraceActivationError = new componentBinding_1.ComponentBinding();
            bindingTraceActivationError.type = componentBinding_1.BindingType.COMMAND_RESPONSE;
            bindingTraceActivationError.component = this;
            bindingTraceActivationError.scope = "app::trace control";
            bindingTraceActivationError.id = "error trace activation";
            bindingTraceActivationError.sourceKey = "onErrorTraceActivation";
            componentBindings_1.ComponentBindings.bind(bindingTraceActivationError);
            var bindingLoadTraceData = new componentBinding_1.ComponentBinding();
            bindingLoadTraceData.type = componentBinding_1.BindingType.COMMAND;
            bindingLoadTraceData.component = this;
            bindingLoadTraceData.scope = "app::trace control";
            bindingLoadTraceData.id = "load trace data";
            bindingLoadTraceData.targetKey = "invokeLoadTraceData";
            componentBindings_1.ComponentBindings.bind(bindingLoadTraceData);
            var bindingTraceDataLoaded = new componentBinding_1.ComponentBinding();
            bindingTraceDataLoaded.type = componentBinding_1.BindingType.COMMAND_RESPONSE;
            bindingTraceDataLoaded.component = this;
            bindingTraceDataLoaded.scope = "app::trace control";
            bindingTraceDataLoaded.id = "trace data loaded";
            bindingTraceDataLoaded.sourceKey = "onTraceDataLoaded";
            componentBindings_1.ComponentBindings.bind(bindingTraceDataLoaded);
            var bindingTraceDataLoadingError = new componentBinding_1.ComponentBinding();
            bindingTraceDataLoadingError.type = componentBinding_1.BindingType.COMMAND_RESPONSE;
            bindingTraceDataLoadingError.component = this;
            bindingTraceDataLoadingError.scope = "app::trace control";
            bindingTraceDataLoadingError.id = "error loading trace data";
            bindingTraceDataLoadingError.sourceKey = "onErrorLoadingTraceData";
            componentBindings_1.ComponentBindings.bind(bindingTraceDataLoadingError);
            var bindingTraceState = new componentBinding_1.ComponentBinding();
            bindingTraceState.type = componentBinding_1.BindingType.DATA;
            bindingTraceState.component = this;
            bindingTraceState.scope = "app::trace control";
            bindingTraceState.id = "trace state";
            bindingTraceState.sourceKey = "onTraceStateChanged";
            componentBindings_1.ComponentBindings.bind(bindingTraceState);
            var bindingTraceDataAvailable = new componentBinding_1.ComponentBinding();
            bindingTraceState.type = componentBinding_1.BindingType.DATA;
            bindingTraceState.component = this;
            bindingTraceState.scope = "app::trace control";
            bindingTraceState.id = "state trace data available";
            bindingTraceState.sourceKey = "onTraceDataAvailable";
            componentBindings_1.ComponentBindings.bind(bindingTraceDataAvailable);
        };
        /**
         * Activates the configurated trace
         *
         * @private
         * @param {*} traceCommandArgs
         * @memberof TraceControl
         */
        TraceControl.prototype.activateTrace = function (traceCommandArgs) {
            var _this = this;
            this.transferDataToTarget()
                .then(function () {
                return _this.executeMethod(_this.getTraceMethod(TraceMethodIds.Activate));
            })
                .then(function () {
                // confirm the execution of the trace activation
                _this.onTraceActivated();
            })
                .catch(function (error) {
                _this.onErrorTraceActivation(error);
            });
        };
        /**
         * Confirms the trace activation
         *
         * @memberof TraceControl
         */
        TraceControl.prototype.onTraceActivated = function () {
            // BINDINGSOURCE: dispatches the method call to bound targets
        };
        /**
         * Trace activation triggered an error
         *
         * @param {*} error
         * @memberof TraceControl
         */
        TraceControl.prototype.onErrorTraceActivation = function (error) {
            // BINDINGSOURCE: dispatches the method call to bound targets
        };
        /**
         * Initializes the TraceControl instance
         *
         * @returns {*}
         * @memberof TraceControl
         */
        TraceControl.prototype.initialize = function (traceComponent) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this._traceComponent = traceComponent;
                    // create commands
                    this.createCommands();
                    // create the control command provider
                    this.createTraceControlProperties();
                    this.observeTraceState(this._traceComponent.mappCockpitComponent.parameters);
                    return [2 /*return*/];
                });
            });
        };
        /**
         * Creates commands exposed by trace control
         *
         * @private
         * @memberof TraceControl
         */
        TraceControl.prototype.createCommands = function () {
            this._commandForceStart = command_1.Command.create(this, this.executeCommandForceStart());
            this._commandForceStop = command_1.Command.create(this, this.executeCommandForceStop());
            this._commandSaveConfiguration = command_1.Command.create(this, this.executeCommandSaveConfiguration());
            this._commandImportTraceConfiguration = command_1.Command.create(this, this.executeCommandImportTraceConfiguration());
            this._commandExportTraceConfiguration = command_1.Command.create(this, this.executeCommandExportTraceConfiguration());
        };
        Object.defineProperty(TraceControl.prototype, "commandForceStart", {
            get: function () {
                return this._commandForceStart;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TraceControl.prototype, "commandForceStop", {
            get: function () {
                return this._commandForceStop;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TraceControl.prototype, "commandSaveConfiguration", {
            get: function () {
                return this._commandSaveConfiguration;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TraceControl.prototype, "commandImportTraceConfiguration", {
            get: function () {
                return this._commandImportTraceConfiguration;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TraceControl.prototype, "commandExportTraceConfiguration", {
            get: function () {
                return this._commandExportTraceConfiguration;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Processes the force stop command
         *
         * @private
         * @returns {ICommandExecutionDelegate<any,any>}
         * @memberof TraceControl
         */
        TraceControl.prototype.executeCommandForceStop = function () {
            var _this = this;
            return function (commandPars, commandResponse) {
                _this.executeMethod(_this.getTraceMethod(TraceMethodIds.ForceStop))
                    .then(function () {
                    commandResponse.executed();
                }).catch(function (error) {
                    commandResponse.rejected(error);
                });
                commandResponse.executed();
            };
        };
        /**
         * Processes the force start command
         *
         * @private
         * @returns {ICommandExecutionDelegate<any,any>}
         * @memberof TraceControl
         */
        TraceControl.prototype.executeCommandForceStart = function () {
            var _this = this;
            return function (commandPars, commandResponse) {
                _this.executeMethod(_this.getTraceMethod(TraceMethodIds.ForceStart))
                    .then(function () {
                    commandResponse.executed();
                })
                    .catch(function (error) {
                    commandResponse.rejected(error);
                });
            };
        };
        /**
         * Processes the save configuration command
         *
         * @private
         * @returns {ICommandExecutionDelegate<any,any>}
         * @memberof TraceControl
         */
        TraceControl.prototype.executeCommandSaveConfiguration = function () {
            var _this = this;
            return function (commandPars, commandResponse) {
                _this.transferDataToTarget()
                    .then(function () {
                    return _this.executeMethod(_this.getTraceMethod(TraceMethodIds.SaveTraceConfig));
                })
                    .then(function () {
                    commandResponse.executed();
                })
                    .catch(function (error) {
                    commandResponse.rejected(error);
                });
            };
        };
        /**
         * Invokes loading trace data
         *
         * @private
         * @memberof TraceControl
         */
        TraceControl.prototype.invokeLoadTraceData = function () {
            var _this = this;
            if (!this._traceDataLoading && this._actualTraceState == "23") {
                this._traceDataLoading = true;
                this._traceDataReader.requestLoadTraceDataFromTarget().then(function (traceData) {
                    // confirm loading trace data successfully
                    _this.onTraceDataLoaded(traceData);
                    _this._traceDataLoading = false;
                }).catch(function (error) {
                    // notify loading error
                    _this.onErrorLoadingTraceData(error);
                    _this._traceDataLoading = false;
                });
            }
            else {
                this.onErrorLoadingTraceData("trace data loading already in progress!");
            }
        };
        /**
         * Confirms trace data loaded
         *
         * @memberof TraceControl
         */
        TraceControl.prototype.onTraceDataLoaded = function (traceData) {
            // BINDINGSOURCE: dispatches the method call to bound targets
        };
        /**
         * Trace data loading triggered an error
         *
         * @param {*} error
         * @memberof TraceControlProvider
         */
        TraceControl.prototype.onErrorLoadingTraceData = function (error) {
            // BINDINGSOURCE: dispatches the method call to bound targets
        };
        /**
         * Processes the import trace configuration command
         *
         * @private
         * @returns {ICommandExecutionDelegate<any,any>}
         * @memberof TraceControl
         */
        TraceControl.prototype.executeCommandImportTraceConfiguration = function () {
            var _this = this;
            return function (commandPars, commandResponse) {
                try {
                    _this.importTraceConfiguration(commandPars);
                }
                catch (e) {
                    console.error(e);
                }
                commandResponse.executed();
            };
        };
        /**
         * Processes the export trace configuration command
         *
         * @private
         * @returns {ICommandExecutionDelegate<any,any>}
         * @memberof TraceControl
         */
        TraceControl.prototype.executeCommandExportTraceConfiguration = function () {
            var _this = this;
            return function (commandPars, commandResponse) {
                var exportData = "";
                try {
                    exportData = _this.exportTraceConfiguration();
                }
                catch (e) {
                    console.error(e);
                }
                commandResponse.executed(exportData);
            };
        };
        /**
         * Returns the XmlData of the current trace configuration (for export)
         *
         * @private
         * @returns {string}
         * @memberof TraceControl
         */
        TraceControl.prototype.exportTraceConfiguration = function () {
            var traceConfigExport = new traceConfigExport_1.TraceConfigExport();
            return traceConfigExport.getXmlDataFromTraceConfig(this._traceComponent.traceConfigurationData);
        };
        /**
         * Imports the given xml data to the trace configuration
         *
         * @private
         * @param {string} fileData
         * @returns
         * @memberof TraceControl
         */
        TraceControl.prototype.importTraceConfiguration = function (fileData) {
            var traceConfigData = traceConfigImport_1.TraceConfigImport.getTraceConfigDataFromXml(fileData);
            if (traceConfigData != undefined) {
                this.setValuesOfTimingParameters(this._traceComponent.traceConfigurationData.timingParameters, traceConfigData.timingParameters);
                var traceConfigurationData = new traceConfigData_1.TraceConfigurationData(traceConfigData.dataPoints, this._traceComponent.traceConfigurationData.timingParameters, traceConfigData.startTriggers);
                // Update datapoint informations (e.g. axis name, description, ...)
                this._traceComponent.updateDataPointInformations(traceConfigurationData);
                // Set new trace configuration data to trace component
                this._traceComponent.traceConfigurationData = traceConfigurationData;
            }
        };
        /**
         * Sets the values of the timing parameters(from import) to the mappCockpitComponentParameters
         *
         * @private
         * @param {MappCockpitComponentParameter[]} timingParameters
         * @param {{[key: string]: string}} values
         * @memberof TraceControl
         */
        TraceControl.prototype.setValuesOfTimingParameters = function (timingParameters, values) {
            for (var i = 0; i < timingParameters.length; i++) {
                var timingParam = timingParameters[i];
                var timingParamId = traceConfigExport_1.TraceConfigExport.getTimingParamId(timingParam.browseName);
                if (timingParamId != "") {
                    var newValue = values[timingParamId];
                    timingParam.value = newValue;
                }
            }
        };
        /**
         * Creates a command provider for handling trace control commands
         *
         * @private
         * @memberof TraceControl
         */
        TraceControl.prototype.createTraceControlProperties = function () {
            this._traceState = property_1.Property.create(new mappCockpitComponent_1.MappCockpitComponentParameter(null, "DymmyPar", null));
        };
        Object.defineProperty(TraceControl.prototype, "traceState", {
            /**
             * Gets the trace state link
             *
             * @readonly
             * @type {*}
             * @memberof TraceControl
             */
            get: function () {
                return this._traceState;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Observes the trace state
         *
         * @private
         * @param {MappCockpitComponentParameter[]} parameters
         * @returns {*}
         * @memberof TraceControl
         */
        TraceControl.prototype.observeTraceState = function (parameters) {
            var _this = this;
            var traceStateParameter = parameters.filter(function (traceParameter) { return traceParameter.browseName === "TraceStatus"; })[0];
            traceStateParameter.valueSource.changed(function (newTraceStateValue, oldTraceStateValue) {
                _this._actualTraceState = traceStateParameter.value;
                // notify trace state change
                _this.onTraceStateChanged(traceStateParameter.value);
                if (newTraceStateValue != oldTraceStateValue) {
                    if (_this._actualTraceState == "23") {
                        // notify trace data available
                        _this.onTraceDataAvailable(true);
                    }
                }
            });
            // watch trace state changes
            this._diagnosticProvider.observeComponentModelItems(this, [traceStateParameter]);
        };
        TraceControl.prototype.onTraceDataAvailable = function (traceDataAvailable) {
            // BINDINGSOURCE: method dispatches the call to a bound target
        };
        TraceControl.prototype.onTraceStateChanged = function (traceState) {
            // BINDINGSOURCE: method dispatches the value to a bound target
        };
        /**
         * transfers the trace configuration data to the target (e.g. datapoints, timing parameters, triggers, ...),
         * and clears all data on target before
         *
         * @private
         * @memberof TraceControl
         */
        TraceControl.prototype.transferDataToTarget = function () {
            return __awaiter(this, void 0, void 0, function () {
                var i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < this._traceComponent.mappCockpitComponent.methods.length)) return [3 /*break*/, 4];
                            // update the methods input parameters
                            return [4 /*yield*/, mappCockpitComponent_1.MappCockpitComponentMethod.updateInputParameters(this._traceComponent.mappCockpitComponent.methods[i])];
                        case 2:
                            // update the methods input parameters
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4: 
                        // Call reset method before transfering data to avoid problems when trace is in wrong state
                        return [4 /*yield*/, this.executeMethod(this.getTraceMethod(TraceMethodIds.Reset))];
                        case 5:
                            // Call reset method before transfering data to avoid problems when trace is in wrong state
                            _a.sent();
                            // remove all datapoints
                            return [4 /*yield*/, this.removeAllDatapoints()];
                        case 6:
                            // remove all datapoints
                            _a.sent();
                            // remove all start triggers
                            return [4 /*yield*/, this.removeAllStartTriggers()];
                        case 7:
                            // remove all start triggers
                            _a.sent();
                            // write timing parameters
                            return [4 /*yield*/, this.setTimingParameters()];
                        case 8:
                            // write timing parameters
                            _a.sent();
                            // add all datapoints
                            return [4 /*yield*/, this.addDatapoints()];
                        case 9:
                            // add all datapoints
                            _a.sent();
                            // add all start triggers
                            return [4 /*yield*/, this.addStartTriggers()];
                        case 10:
                            // add all start triggers
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Removes all trace configuration datapoints on target
         *
         * @private
         * @memberof TraceControl
         */
        TraceControl.prototype.removeAllDatapoints = function () {
            return __awaiter(this, void 0, void 0, function () {
                var datapoints, removeDataPointMethod, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            datapoints = mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.retrieveTraceConfigurationDatapoints(this._traceComponent.mappCockpitComponent.parameters);
                            return [4 /*yield*/, this._diagnosticProvider.readParameterValues(datapoints)];
                        case 1:
                            _a.sent();
                            removeDataPointMethod = this.getTraceMethod(TraceMethodIds.RemoveDataPoint);
                            if (!(removeDataPointMethod != undefined)) return [3 /*break*/, 5];
                            i = 0;
                            _a.label = 2;
                        case 2:
                            if (!(i < datapoints.length)) return [3 /*break*/, 5];
                            if (!(datapoints[i].value != "")) return [3 /*break*/, 4];
                            removeDataPointMethod.inputParameters[0].value = datapoints[i].value;
                            console.info("Remove datapoint: " + datapoints[i].value);
                            return [4 /*yield*/, this.executeMethod(removeDataPointMethod)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            i++;
                            return [3 /*break*/, 2];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Removes all trace configuration start triggers on target
         *
         * @private
         * @memberof TraceControl
         */
        TraceControl.prototype.removeAllStartTriggers = function () {
            return __awaiter(this, void 0, void 0, function () {
                var triggerParameters, startTriggerDataPoint1, startTriggerDataPoint2, removeStartTrigger1Method, removeStartTrigger2Method;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            triggerParameters = mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.retrieveTraceConfigurationTriggerParameters(this._traceComponent.mappCockpitComponent.parameters);
                            return [4 /*yield*/, this._diagnosticProvider.readParameterValues(triggerParameters)];
                        case 1:
                            _a.sent();
                            startTriggerDataPoint1 = this.getTraceParameter("StartTrigger1_DataPoint");
                            startTriggerDataPoint2 = this.getTraceParameter("StartTrigger2_DataPoint");
                            removeStartTrigger1Method = this.getTraceMethod(TraceMethodIds.RemoveStartTrigger1);
                            removeStartTrigger2Method = this.getTraceMethod(TraceMethodIds.RemoveStartTrigger2);
                            if (!(startTriggerDataPoint2.value != "")) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.executeMethod(removeStartTrigger2Method)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            if (!(startTriggerDataPoint1.value != "")) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.executeMethod(removeStartTrigger1Method)];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Sets all timing parameters on target with the current trace configuration from mappCockpit
         *
         * @private
         * @memberof TraceControl
         */
        TraceControl.prototype.setTimingParameters = function () {
            return __awaiter(this, void 0, void 0, function () {
                var timingParameters, i, timingParameter;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            timingParameters = this._traceComponent.traceConfigurationData.timingParameters;
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < timingParameters.length)) return [3 /*break*/, 4];
                            timingParameter = timingParameters[i];
                            /*if (timingParam.displayName == "PLC task class number") {
                                // use value to avoid problems with taskclass cycle time displayValue
                                //timingParam.componentParameter.value = timingParam.value; // value not up to date currently
                                timingParam.componentParameter.value = timingParam.displayValue.substr(0, 1); // value not up to date currently
                            }
                            else {
                                timingParam.componentParameter.value = timingParam.displayValue;
                            }*/
                            return [4 /*yield*/, this._diagnosticProvider.writeParameterValue(timingParameter, timingParameter.value)];
                        case 2:
                            /*if (timingParam.displayName == "PLC task class number") {
                                // use value to avoid problems with taskclass cycle time displayValue
                                //timingParam.componentParameter.value = timingParam.value; // value not up to date currently
                                timingParam.componentParameter.value = timingParam.displayValue.substr(0, 1); // value not up to date currently
                            }
                            else {
                                timingParam.componentParameter.value = timingParam.displayValue;
                            }*/
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
         * Sets all datapoints on target with the current trace configuration from mappCockpit
         *
         * @private
         * @memberof TraceControl
         */
        TraceControl.prototype.addDatapoints = function () {
            return __awaiter(this, void 0, void 0, function () {
                var addDataPointMethod, dataPoints, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            addDataPointMethod = this.getTraceMethod(TraceMethodIds.AddDataPoint);
                            if (!(addDataPointMethod != undefined)) return [3 /*break*/, 4];
                            dataPoints = this._traceComponent.traceConfigurationData.dataPoints;
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < dataPoints.length)) return [3 /*break*/, 4];
                            if (!(dataPoints[i].dataPointName != "")) return [3 /*break*/, 3];
                            addDataPointMethod.inputParameters[0].value = dataPoints[i].dataPointName;
                            console.info("Add datapoint: " + dataPoints[i].dataPointName);
                            return [4 /*yield*/, this.executeMethod(addDataPointMethod)];
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
         * Sets all starttriggers on target with the current trace configuration from mappCockpit
         *
         * @private
         * @memberof TraceControl
         */
        TraceControl.prototype.addStartTriggers = function () {
            return __awaiter(this, void 0, void 0, function () {
                var setStartTriggerMethod, startTriggers, i, startTrigger, missingInfo;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            setStartTriggerMethod = this.getTraceMethod(TraceMethodIds.SetStartTrigger);
                            startTriggers = this._traceComponent.traceConfigurationData.startTriggers;
                            if (!(setStartTriggerMethod != undefined)) return [3 /*break*/, 4];
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < startTriggers.length)) return [3 /*break*/, 4];
                            startTrigger = startTriggers[i];
                            missingInfo = false;
                            // set setStartTrigger method input args
                            setStartTriggerMethod.inputParameters[0].value = startTrigger.condition;
                            setStartTriggerMethod.inputParameters[1].value = startTrigger.dataPointName;
                            setStartTriggerMethod.inputParameters[2].value = startTrigger.threshold;
                            setStartTriggerMethod.inputParameters[3].value = startTrigger.window;
                            if (!(missingInfo == false)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.executeMethod(setStartTriggerMethod)];
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
         * Returns a trace component method for the given method id or undefined if not found
         *
         * @private
         * @param {string} methodId
         * @returns {(MappCockpitComponentMethod | undefined)}
         * @memberof TraceControl
         */
        TraceControl.prototype.getTraceMethod = function (methodId) {
            var traceComponent = this._traceComponent.mappCockpitComponent;
            for (var i = 0; i < traceComponent.methods.length; i++) {
                if (traceComponent.methods[i].browseName == methodId) {
                    return traceComponent.methods[i];
                }
            }
            console.warn("Method '" + methodId + "' not found on trace component!");
            return undefined;
        };
        /**
         * Returns a trace component parameter for the given parameter id or undefined if not found
         *
         * @private
         * @param {string} parameterId
         * @returns {(MappCockpitComponentParameter | undefined)}
         * @memberof TraceControl
         */
        TraceControl.prototype.getTraceParameter = function (parameterId) {
            var traceComponent = this._traceComponent.mappCockpitComponent;
            for (var i = 0; i < traceComponent.parameters.length; i++) {
                if (traceComponent.parameters[i].browseName == parameterId) {
                    return traceComponent.parameters[i];
                }
            }
            console.warn("Parameter '" + parameterId + "' not found on trace component!");
            return undefined;
        };
        /**
         * executes the selected method
         *
         * @private
         * @memberof TraceControl
         */
        TraceControl.prototype.executeMethod = function (method) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!method) return [3 /*break*/, 2];
                            return [4 /*yield*/, this._diagnosticProvider.executeComponentMethod(method)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        return TraceControl;
    }());
    exports.TraceControl = TraceControl;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb250cm9sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvdHJhY2VDb250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWNBOzs7O09BSUc7SUFDSDtRQUFBO1FBV0EsQ0FBQztRQVZtQix1QkFBUSxHQUFHLFVBQVUsQ0FBQztRQUN0Qix3QkFBUyxHQUFHLFdBQVcsQ0FBQztRQUN4Qix5QkFBVSxHQUFHLFlBQVksQ0FBQztRQUMxQiw4QkFBZSxHQUFHLGlCQUFpQixDQUFDO1FBQ3BDLG9CQUFLLEdBQUcsT0FBTyxDQUFDO1FBQ2hCLDhCQUFlLEdBQUcsaUJBQWlCLENBQUM7UUFDcEMsa0NBQW1CLEdBQUcscUJBQXFCLENBQUM7UUFDNUMsa0NBQW1CLEdBQUcscUJBQXFCLENBQUM7UUFDNUMsMkJBQVksR0FBRyxjQUFjLENBQUM7UUFDOUIsOEJBQWUsR0FBRyxpQkFBaUIsQ0FBQztRQUN4RCxxQkFBQztLQUFBLEFBWEQsSUFXQztJQUVEO1FBaUJJOzs7O1dBSUc7UUFDSCxzQkFBWSxrQkFBaUQ7WUFqQnJELHNCQUFpQixHQUFVLEVBQUUsQ0FBQztZQVU5QixzQkFBaUIsR0FBWSxLQUFLLENBQUM7WUFRdkMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLGtCQUFrQixDQUFDO1lBQzlDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLDRDQUEwQixDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFFMUUsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDcEMsQ0FBQztRQVowQyxDQUFDO1FBYzVDOzs7OztXQUtHO1FBQ0ssOENBQXVCLEdBQS9CO1lBRUksSUFBTSxvQkFBb0IsR0FBRyxJQUFJLG1DQUFnQixFQUFFLENBQUM7WUFDcEQsb0JBQW9CLENBQUMsSUFBSSxHQUFHLDhCQUFX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eyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlciwgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QsIE1hcHBDb2NrcGl0Q29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8gfSBmcm9tIFwiLi4vLi4vb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50UmVmbGVjdGlvblwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlciB9IGZyb20gXCIuLi9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvcHJvcGVydHlcIjtcclxuaW1wb3J0IHsgQ29tbWFuZCwgSUNvbW1hbmRFeGVjdXRpb25EZWxlZ2F0ZSwgSUNvbW1hbmRFeGVjdXRpb25SZXNwb25zZURlbGVnYXRlIH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9jb21tYW5kXCI7XHJcbmltcG9ydCB7IElUcmFjZUNvbXBvbmVudENvbnRyb2wgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL3RyYWNlQ29udHJvbFByb3ZpZGVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0VHJhY2VEYXRhUmVhZGVyIH0gZnJvbSBcIi4vdHJhY2VEYXRhUmVhZGVyXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnQgfSBmcm9tIFwiLi9tYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFRyYWNlQ29uZmlndXJhdGlvbkRhdGEgfSBmcm9tIFwiLi90cmFjZUNvbmZpZy90cmFjZUNvbmZpZ0RhdGFcIjtcclxuaW1wb3J0IHsgVHJhY2VDb25maWdFeHBvcnQgfSBmcm9tIFwiLi90cmFjZUNvbmZpZy90cmFjZUNvbmZpZ0V4cG9ydFwiO1xyXG5pbXBvcnQgeyBUcmFjZUNvbmZpZ0ltcG9ydCB9IGZyb20gXCIuL3RyYWNlQ29uZmlnL3RyYWNlQ29uZmlnSW1wb3J0XCI7XHJcbmltcG9ydCB7IENvbXBvbmVudEJpbmRpbmcsIEJpbmRpbmdUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9jb21wb25lbnRIdWIvYmluZGluZ3MvY29tcG9uZW50QmluZGluZ1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRCaW5kaW5ncyB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvY29tcG9uZW50SHViL2JpbmRpbmdzL2NvbXBvbmVudEJpbmRpbmdzXCI7XHJcblxyXG4vKipcclxuICogRGVmaW5lcyB0aGUgYnJvd3NlbmFtZXMgb2YgdGhlIHRyYWNlIGNvbnRyb2wgbWV0aG9kcyBvbiB0aGUgb3BjIHVhIHNlcnZlciAoZS5nLiBcIkFjdGl2YXRlXCIpXHJcbiAqXHJcbiAqIEBjbGFzcyBUcmFjZU1ldGhvZElkc1xyXG4gKi9cclxuY2xhc3MgVHJhY2VNZXRob2RJZHN7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgQWN0aXZhdGUgPSBcIkFjdGl2YXRlXCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgRm9yY2VTdG9wID0gXCJGb3JjZVN0b3BcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBGb3JjZVN0YXJ0ID0gXCJGb3JjZVN0YXJ0XCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgU2F2ZVRyYWNlQ29uZmlnID0gXCJTYXZlVHJhY2VDb25maWdcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBSZXNldCA9IFwiUmVzZXRcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBSZW1vdmVEYXRhUG9pbnQgPSBcIlJlbW92ZURhdGFQb2ludFwiO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IFJlbW92ZVN0YXJ0VHJpZ2dlcjEgPSBcIlJlbW92ZVN0YXJ0VHJpZ2dlcjFcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBSZW1vdmVTdGFydFRyaWdnZXIyID0gXCJSZW1vdmVTdGFydFRyaWdnZXIyXCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgQWRkRGF0YVBvaW50ID0gXCJBZGREYXRhUG9pbnRcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBTZXRTdGFydFRyaWdnZXIgPSBcIlNldFN0YXJ0VHJpZ2dlclwiO1xyXG59XHJcblxyXG5jbGFzcyBUcmFjZUNvbnRyb2wgaW1wbGVtZW50cyBJVHJhY2VDb21wb25lbnRDb250cm9se1xyXG5cclxuICAgIHByaXZhdGUgX2RpYWdub3N0aWNQcm92aWRlcjogTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXI7XHJcbiAgICBwcml2YXRlIF90cmFjZUNvbXBvbmVudCE6IE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnQ7XHJcbiAgICBwcml2YXRlIF90cmFjZVN0YXRlITogUHJvcGVydHk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+O1xyXG4gICAgcHJpdmF0ZSBfYWN0dWFsVHJhY2VTdGF0ZTpzdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgIHByaXZhdGUgX2NvbW1hbmRGb3JjZVN0YXJ0ITogQ29tbWFuZDxhbnksYW55PjtcclxuICAgIHByaXZhdGUgX2NvbW1hbmRGb3JjZVN0b3AhOiBDb21tYW5kPGFueSxhbnk+O1xyXG4gICAgcHJpdmF0ZSBfY29tbWFuZFNhdmVDb25maWd1cmF0aW9uITogQ29tbWFuZDxhbnksYW55PjtcclxuICAgIHByaXZhdGUgX2NvbW1hbmRJbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb24hOiBDb21tYW5kPGFueSxhbnk+O1xyXG4gICAgcHJpdmF0ZSBfY29tbWFuZEV4cG9ydFRyYWNlQ29uZmlndXJhdGlvbiE6IENvbW1hbmQ8YW55LGFueT47XHJcblxyXG4gICAgLy8gaG9sZHMgYW4gaW5zdGFuY2Ugb2YgYSB0cmFjZSBkYXRhIHJlYWRlclxyXG4gICAgcHJpdmF0ZSBfdHJhY2VEYXRhUmVhZGVyOiBNYXBwQ29ja3BpdFRyYWNlRGF0YVJlYWRlcjtcclxuICAgIHByaXZhdGUgX3RyYWNlRGF0YUxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTs7XHJcblxyXG4gICAgLyoqIFxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBUcmFjZUNvbnRyb2wuXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyfSBkaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZGlhZ25vc3RpY1Byb3ZpZGVyOiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlcikge1xyXG4gICAgICAgIHRoaXMuX2RpYWdub3N0aWNQcm92aWRlciA9IGRpYWdub3N0aWNQcm92aWRlcjtcclxuICAgICAgICB0aGlzLl90cmFjZURhdGFSZWFkZXIgPSBuZXcgTWFwcENvY2twaXRUcmFjZURhdGFSZWFkZXIoZGlhZ25vc3RpY1Byb3ZpZGVyKTtcclxuXHJcbiAgICAgICAgIHRoaXMuY3JlYXRlQ29tcG9uZW50QmluZGluZ3MoKTtcclxuICAgIH1cclxuICAgXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGJpbmRpbmdzIHRvIG90aGVyIGNvbXBvbmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZUNvbXBvbmVudEJpbmRpbmdzKCkge1xyXG5cclxuICAgICAgICBjb25zdCBiaW5kaW5nQWN0aXZhdGVUcmFjZSA9IG5ldyBDb21wb25lbnRCaW5kaW5nKCk7XHJcbiAgICAgICAgYmluZGluZ0FjdGl2YXRlVHJhY2UudHlwZSA9IEJpbmRpbmdUeXBlLkNPTU1BTkRcclxuICAgICAgICBiaW5kaW5nQWN0aXZhdGVUcmFjZS5jb21wb25lbnQgPSB0aGlzO1xyXG4gICAgICAgIGJpbmRpbmdBY3RpdmF0ZVRyYWNlLnNjb3BlID0gXCJhcHA6OnRyYWNlIGNvbnRyb2xcIjtcclxuICAgICAgICBiaW5kaW5nQWN0aXZhdGVUcmFjZS5pZCA9IFwidHJhY2UgYWN0aXZhdGVcIjtcclxuICAgICAgICBiaW5kaW5nQWN0aXZhdGVUcmFjZS50YXJnZXRLZXkgPSBcImFjdGl2YXRlVHJhY2VcIjtcclxuICAgICAgICBDb21wb25lbnRCaW5kaW5ncy5iaW5kKGJpbmRpbmdBY3RpdmF0ZVRyYWNlKTtcclxuXHJcbiAgICAgICAgY29uc3QgYmluZGluZ1RyYWNlQWN0aXZhdGVkID0gbmV3IENvbXBvbmVudEJpbmRpbmcoKTtcclxuICAgICAgICBiaW5kaW5nVHJhY2VBY3RpdmF0ZWQudHlwZSA9IEJpbmRpbmdUeXBlLkNPTU1BTkRfUkVTUE9OU0VcclxuICAgICAgICBiaW5kaW5nVHJhY2VBY3RpdmF0ZWQuY29tcG9uZW50ID0gdGhpcztcclxuICAgICAgICBiaW5kaW5nVHJhY2VBY3RpdmF0ZWQuc2NvcGUgPSBcImFwcDo6dHJhY2UgY29udHJvbFwiO1xyXG4gICAgICAgIGJpbmRpbmdUcmFjZUFjdGl2YXRlZC5pZCA9IFwidHJhY2UgYWN0aXZhdGVkXCI7XHJcbiAgICAgICAgYmluZGluZ1RyYWNlQWN0aXZhdGVkLnNvdXJjZUtleSA9IFwib25UcmFjZUFjdGl2YXRlZFwiO1xyXG4gICAgICAgIENvbXBvbmVudEJpbmRpbmdzLmJpbmQoYmluZGluZ1RyYWNlQWN0aXZhdGVkKTtcclxuXHJcbiAgICAgICAgY29uc3QgYmluZGluZ1RyYWNlQWN0aXZhdGlvbkVycm9yID0gbmV3IENvbXBvbmVudEJpbmRpbmcoKTtcclxuICAgICAgICBiaW5kaW5nVHJhY2VBY3RpdmF0aW9uRXJyb3IudHlwZSA9IEJpbmRpbmdUeXBlLkNPTU1BTkRfUkVTUE9OU0VcclxuICAgICAgICBiaW5kaW5nVHJhY2VBY3RpdmF0aW9uRXJyb3IuY29tcG9uZW50ID0gdGhpcztcclxuICAgICAgICBiaW5kaW5nVHJhY2VBY3RpdmF0aW9uRXJyb3Iuc2NvcGUgPSBcImFwcDo6dHJhY2UgY29udHJvbFwiO1xyXG4gICAgICAgIGJpbmRpbmdUcmFjZUFjdGl2YXRpb25FcnJvci5pZCA9IFwiZXJyb3IgdHJhY2UgYWN0aXZhdGlvblwiO1xyXG4gICAgICAgIGJpbmRpbmdUcmFjZUFjdGl2YXRpb25FcnJvci5zb3VyY2VLZXkgPSBcIm9uRXJyb3JUcmFjZUFjdGl2YXRpb25cIjtcclxuICAgICAgICBDb21wb25lbnRCaW5kaW5ncy5iaW5kKGJpbmRpbmdUcmFjZUFjdGl2YXRpb25FcnJvcik7XHJcblxyXG5cclxuICAgICAgICBjb25zdCBiaW5kaW5nTG9hZFRyYWNlRGF0YSA9IG5ldyBDb21wb25lbnRCaW5kaW5nKCk7XHJcbiAgICAgICAgYmluZGluZ0xvYWRUcmFjZURhdGEudHlwZSA9IEJpbmRpbmdUeXBlLkNPTU1BTkRcclxuICAgICAgICBiaW5kaW5nTG9hZFRyYWNlRGF0YS5jb21wb25lbnQgPSB0aGlzO1xyXG4gICAgICAgIGJpbmRpbmdMb2FkVHJhY2VEYXRhLnNjb3BlID0gXCJhcHA6OnRyYWNlIGNvbnRyb2xcIjtcclxuICAgICAgICBiaW5kaW5nTG9hZFRyYWNlRGF0YS5pZCA9IFwibG9hZCB0cmFjZSBkYXRhXCI7XHJcbiAgICAgICAgYmluZGluZ0xvYWRUcmFjZURhdGEudGFyZ2V0S2V5ID0gXCJpbnZva2VMb2FkVHJhY2VEYXRhXCI7XHJcbiAgICAgICAgQ29tcG9uZW50QmluZGluZ3MuYmluZChiaW5kaW5nTG9hZFRyYWNlRGF0YSk7XHJcblxyXG5cclxuICAgICAgICBjb25zdCBiaW5kaW5nVHJhY2VEYXRhTG9hZGVkID0gbmV3IENvbXBvbmVudEJpbmRpbmcoKTtcclxuICAgICAgICBiaW5kaW5nVHJhY2VEYXRhTG9hZGVkLnR5cGUgPSBCaW5kaW5nVHlwZS5DT01NQU5EX1JFU1BPTlNFXHJcbiAgICAgICAgYmluZGluZ1RyYWNlRGF0YUxvYWRlZC5jb21wb25lbnQgPSB0aGlzO1xyXG4gICAgICAgIGJpbmRpbmdUcmFjZURhdGFMb2FkZWQuc2NvcGUgPSBcImFwcDo6dHJhY2UgY29udHJvbFwiO1xyXG4gICAgICAgIGJpbmRpbmdUcmFjZURhdGFMb2FkZWQuaWQgPSBcInRyYWNlIGRhdGEgbG9hZGVkXCI7XHJcbiAgICAgICAgYmluZGluZ1RyYWNlRGF0YUxvYWRlZC5zb3VyY2VLZXkgPSBcIm9uVHJhY2VEYXRhTG9hZGVkXCI7XHJcbiAgICAgICAgQ29tcG9uZW50QmluZGluZ3MuYmluZChiaW5kaW5nVHJhY2VEYXRhTG9hZGVkKTtcclxuXHJcbiAgICAgICAgY29uc3QgYmluZGluZ1RyYWNlRGF0YUxvYWRpbmdFcnJvciA9IG5ldyBDb21wb25lbnRCaW5kaW5nKCk7XHJcbiAgICAgICAgYmluZGluZ1RyYWNlRGF0YUxvYWRpbmdFcnJvci50eXBlID0gQmluZGluZ1R5cGUuQ09NTUFORF9SRVNQT05TRVxyXG4gICAgICAgIGJpbmRpbmdUcmFjZURhdGFMb2FkaW5nRXJyb3IuY29tcG9uZW50ID0gdGhpcztcclxuICAgICAgICBiaW5kaW5nVHJhY2VEYXRhTG9hZGluZ0Vycm9yLnNjb3BlID0gXCJhcHA6OnRyYWNlIGNvbnRyb2xcIjtcclxuICAgICAgICBiaW5kaW5nVHJhY2VEYXRhTG9hZGluZ0Vycm9yLmlkID0gXCJlcnJvciBsb2FkaW5nIHRyYWNlIGRhdGFcIjtcclxuICAgICAgICBiaW5kaW5nVHJhY2VEYXRhTG9hZGluZ0Vycm9yLnNvdXJjZUtleSA9IFwib25FcnJvckxvYWRpbmdUcmFjZURhdGFcIjtcclxuICAgICAgICBDb21wb25lbnRCaW5kaW5ncy5iaW5kKGJpbmRpbmdUcmFjZURhdGFMb2FkaW5nRXJyb3IpO1xyXG5cclxuXHJcbiAgICAgICAgY29uc3QgYmluZGluZ1RyYWNlU3RhdGUgPSBuZXcgQ29tcG9uZW50QmluZGluZygpO1xyXG4gICAgICAgIGJpbmRpbmdUcmFjZVN0YXRlLnR5cGUgPSBCaW5kaW5nVHlwZS5EQVRBXHJcbiAgICAgICAgYmluZGluZ1RyYWNlU3RhdGUuY29tcG9uZW50ID0gdGhpcztcclxuICAgICAgICBiaW5kaW5nVHJhY2VTdGF0ZS5zY29wZSA9IFwiYXBwOjp0cmFjZSBjb250cm9sXCI7XHJcbiAgICAgICAgYmluZGluZ1RyYWNlU3RhdGUuaWQgPSBcInRyYWNlIHN0YXRlXCI7XHJcbiAgICAgICAgYmluZGluZ1RyYWNlU3RhdGUuc291cmNlS2V5ID0gXCJvblRyYWNlU3RhdGVDaGFuZ2VkXCI7XHJcbiAgICAgICAgQ29tcG9uZW50QmluZGluZ3MuYmluZChiaW5kaW5nVHJhY2VTdGF0ZSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGJpbmRpbmdUcmFjZURhdGFBdmFpbGFibGUgPSBuZXcgQ29tcG9uZW50QmluZGluZygpO1xyXG4gICAgICAgIGJpbmRpbmdUcmFjZVN0YXRlLnR5cGUgPSBCaW5kaW5nVHlwZS5EQVRBXHJcbiAgICAgICAgYmluZGluZ1RyYWNlU3RhdGUuY29tcG9uZW50ID0gdGhpcztcclxuICAgICAgICBiaW5kaW5nVHJhY2VTdGF0ZS5zY29wZSA9IFwiYXBwOjp0cmFjZSBjb250cm9sXCI7XHJcbiAgICAgICAgYmluZGluZ1RyYWNlU3RhdGUuaWQgPSBcInN0YXRlIHRyYWNlIGRhdGEgYXZhaWxhYmxlXCI7XHJcbiAgICAgICAgYmluZGluZ1RyYWNlU3RhdGUuc291cmNlS2V5ID0gXCJvblRyYWNlRGF0YUF2YWlsYWJsZVwiO1xyXG4gICAgICAgIENvbXBvbmVudEJpbmRpbmdzLmJpbmQoYmluZGluZ1RyYWNlRGF0YUF2YWlsYWJsZSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWN0aXZhdGVzIHRoZSBjb25maWd1cmF0ZWQgdHJhY2VcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSB0cmFjZUNvbW1hbmRBcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWN0aXZhdGVUcmFjZSh0cmFjZUNvbW1hbmRBcmdzOiBhbnkpIHtcclxuXHJcbiAgICAgICAgdGhpcy50cmFuc2ZlckRhdGFUb1RhcmdldCgpXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGVNZXRob2QodGhpcy5nZXRUcmFjZU1ldGhvZChUcmFjZU1ldGhvZElkcy5BY3RpdmF0ZSkpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25maXJtIHRoZSBleGVjdXRpb24gb2YgdGhlIHRyYWNlIGFjdGl2YXRpb25cclxuICAgICAgICAgICAgICAgIHRoaXMub25UcmFjZUFjdGl2YXRlZCgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uRXJyb3JUcmFjZUFjdGl2YXRpb24oZXJyb3IpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQ29uZmlybXMgdGhlIHRyYWNlIGFjdGl2YXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvblRyYWNlQWN0aXZhdGVkKCl7XHJcbiAgICAgICAgLy8gQklORElOR1NPVVJDRTogZGlzcGF0Y2hlcyB0aGUgbWV0aG9kIGNhbGwgdG8gYm91bmQgdGFyZ2V0c1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyYWNlIGFjdGl2YXRpb24gdHJpZ2dlcmVkIGFuIGVycm9yXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBlcnJvclxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25FcnJvclRyYWNlQWN0aXZhdGlvbihlcnJvcikge1xyXG4gICAgICAgICAgICAgLy8gQklORElOR1NPVVJDRTogZGlzcGF0Y2hlcyB0aGUgbWV0aG9kIGNhbGwgdG8gYm91bmQgdGFyZ2V0c1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIHRoZSBUcmFjZUNvbnRyb2wgaW5zdGFuY2VcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xcclxuICAgICAqL1xyXG4gICAgYXN5bmMgaW5pdGlhbGl6ZSh0cmFjZUNvbXBvbmVudDogTWFwcENvY2twaXRUcmFjZUNvbXBvbmVudCk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgdGhpcy5fdHJhY2VDb21wb25lbnQgPSB0cmFjZUNvbXBvbmVudDtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAvLyBjcmVhdGUgY29tbWFuZHNcclxuICAgICAgICB0aGlzLmNyZWF0ZUNvbW1hbmRzKCk7XHJcbiAgICAgICAgLy8gY3JlYXRlIHRoZSBjb250cm9sIGNvbW1hbmQgcHJvdmlkZXJcclxuICAgICAgICB0aGlzLmNyZWF0ZVRyYWNlQ29udHJvbFByb3BlcnRpZXMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5vYnNlcnZlVHJhY2VTdGF0ZSh0aGlzLl90cmFjZUNvbXBvbmVudC5tYXBwQ29ja3BpdENvbXBvbmVudC5wYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgY29tbWFuZHMgZXhwb3NlZCBieSB0cmFjZSBjb250cm9sXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVDb21tYW5kcygpIHtcclxuICAgICAgICB0aGlzLl9jb21tYW5kRm9yY2VTdGFydCA9IENvbW1hbmQuY3JlYXRlKHRoaXMsIHRoaXMuZXhlY3V0ZUNvbW1hbmRGb3JjZVN0YXJ0KCkpO1xyXG4gICAgICAgIHRoaXMuX2NvbW1hbmRGb3JjZVN0b3AgPSBDb21tYW5kLmNyZWF0ZSh0aGlzLCB0aGlzLmV4ZWN1dGVDb21tYW5kRm9yY2VTdG9wKCkpO1xyXG4gICAgICAgIHRoaXMuX2NvbW1hbmRTYXZlQ29uZmlndXJhdGlvbiA9IENvbW1hbmQuY3JlYXRlKHRoaXMsIHRoaXMuZXhlY3V0ZUNvbW1hbmRTYXZlQ29uZmlndXJhdGlvbigpKTtcclxuICAgICAgICB0aGlzLl9jb21tYW5kSW1wb3J0VHJhY2VDb25maWd1cmF0aW9uID0gQ29tbWFuZC5jcmVhdGUodGhpcywgdGhpcy5leGVjdXRlQ29tbWFuZEltcG9ydFRyYWNlQ29uZmlndXJhdGlvbigpKTtcclxuICAgICAgICB0aGlzLl9jb21tYW5kRXhwb3J0VHJhY2VDb25maWd1cmF0aW9uID0gQ29tbWFuZC5jcmVhdGUodGhpcywgdGhpcy5leGVjdXRlQ29tbWFuZEV4cG9ydFRyYWNlQ29uZmlndXJhdGlvbigpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbW1hbmRGb3JjZVN0YXJ0KCkgOiBDb21tYW5kPGFueSxhbnk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29tbWFuZEZvcmNlU3RhcnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjb21tYW5kRm9yY2VTdG9wKCkgOiBDb21tYW5kPGFueSxhbnk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29tbWFuZEZvcmNlU3RvcDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbW1hbmRTYXZlQ29uZmlndXJhdGlvbigpIDogQ29tbWFuZDxhbnksYW55PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbW1hbmRTYXZlQ29uZmlndXJhdGlvbjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGdldCBjb21tYW5kSW1wb3J0VHJhY2VDb25maWd1cmF0aW9uKCkgOiBDb21tYW5kPGFueSxhbnk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29tbWFuZEltcG9ydFRyYWNlQ29uZmlndXJhdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbW1hbmRFeHBvcnRUcmFjZUNvbmZpZ3VyYXRpb24oKSA6IENvbW1hbmQ8YW55LGFueT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb21tYW5kRXhwb3J0VHJhY2VDb25maWd1cmF0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvY2Vzc2VzIHRoZSBmb3JjZSBzdG9wIGNvbW1hbmRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge0lDb21tYW5kRXhlY3V0aW9uRGVsZWdhdGU8YW55LGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZXhlY3V0ZUNvbW1hbmRGb3JjZVN0b3AoKTogSUNvbW1hbmRFeGVjdXRpb25EZWxlZ2F0ZTxhbnksYW55PiB7XHJcbiAgICAgICAgcmV0dXJuIChjb21tYW5kUGFyczphbnksY29tbWFuZFJlc3BvbnNlKSA9PiB7IFxyXG4gICAgICAgICAgICB0aGlzLmV4ZWN1dGVNZXRob2QodGhpcy5nZXRUcmFjZU1ldGhvZChUcmFjZU1ldGhvZElkcy5Gb3JjZVN0b3ApKVxyXG4gICAgICAgICAgICAudGhlbigoKT0+e1xyXG4gICAgICAgICAgICAgICAgY29tbWFuZFJlc3BvbnNlLmV4ZWN1dGVkKCk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKChlcnJvcik9PntcclxuICAgICAgICAgICAgICAgIGNvbW1hbmRSZXNwb25zZS5yZWplY3RlZChlcnJvcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb21tYW5kUmVzcG9uc2UuZXhlY3V0ZWQoKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvY2Vzc2VzIHRoZSBmb3JjZSBzdGFydCBjb21tYW5kXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtJQ29tbWFuZEV4ZWN1dGlvbkRlbGVnYXRlPGFueSxhbnk+fVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGV4ZWN1dGVDb21tYW5kRm9yY2VTdGFydCgpOiAgSUNvbW1hbmRFeGVjdXRpb25EZWxlZ2F0ZTxhbnksYW55PiB7XHJcbiAgICAgICAgcmV0dXJuIChjb21tYW5kUGFyczphbnksY29tbWFuZFJlc3BvbnNlKSA9PiB7IFxyXG4gICAgICAgICAgICB0aGlzLmV4ZWN1dGVNZXRob2QodGhpcy5nZXRUcmFjZU1ldGhvZChUcmFjZU1ldGhvZElkcy5Gb3JjZVN0YXJ0KSlcclxuICAgICAgICAgICAgLnRoZW4oKCk9PntcclxuICAgICAgICAgICAgICAgIGNvbW1hbmRSZXNwb25zZS5leGVjdXRlZCgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKT0+e1xyXG4gICAgICAgICAgICAgICAgY29tbWFuZFJlc3BvbnNlLnJlamVjdGVkKGVycm9yKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICBcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvY2Vzc2VzIHRoZSBzYXZlIGNvbmZpZ3VyYXRpb24gY29tbWFuZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7SUNvbW1hbmRFeGVjdXRpb25EZWxlZ2F0ZTxhbnksYW55Pn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBleGVjdXRlQ29tbWFuZFNhdmVDb25maWd1cmF0aW9uKCk6IElDb21tYW5kRXhlY3V0aW9uRGVsZWdhdGU8YW55LGFueT4ge1xyXG4gICAgICAgIHJldHVybiAoY29tbWFuZFBhcnM6YW55LGNvbW1hbmRSZXNwb25zZSkgPT4geyBcclxuICAgICAgICAgICAgdGhpcy50cmFuc2ZlckRhdGFUb1RhcmdldCgpXHJcbiAgICAgICAgICAgIC50aGVuKCgpPT57XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlTWV0aG9kKHRoaXMuZ2V0VHJhY2VNZXRob2QoVHJhY2VNZXRob2RJZHMuU2F2ZVRyYWNlQ29uZmlnKSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKCgpPT57XHJcbiAgICAgICAgICAgICAgICBjb21tYW5kUmVzcG9uc2UuZXhlY3V0ZWQoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcik9PntcclxuICAgICAgICAgICAgICAgIGNvbW1hbmRSZXNwb25zZS5yZWplY3RlZChlcnJvcik7XHJcbiAgICAgICAgICAgIH0pOyBcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW52b2tlcyBsb2FkaW5nIHRyYWNlIGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFxyXG4gICAgICovXHJcbiAgICBcclxuICAgICBwcml2YXRlIGludm9rZUxvYWRUcmFjZURhdGEoKXtcclxuICAgICAgICBpZiAoICF0aGlzLl90cmFjZURhdGFMb2FkaW5nICYmIHRoaXMuX2FjdHVhbFRyYWNlU3RhdGUgPT0gXCIyM1wiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RyYWNlRGF0YUxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl90cmFjZURhdGFSZWFkZXIucmVxdWVzdExvYWRUcmFjZURhdGFGcm9tVGFyZ2V0KCkudGhlbigodHJhY2VEYXRhKT0+e1xyXG4gICAgICAgICAgICAgICAgLy8gY29uZmlybSBsb2FkaW5nIHRyYWNlIGRhdGEgc3VjY2Vzc2Z1bGx5XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uVHJhY2VEYXRhTG9hZGVkKHRyYWNlRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90cmFjZURhdGFMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKChlcnJvcik9PntcclxuICAgICAgICAgICAgICAgIC8vIG5vdGlmeSBsb2FkaW5nIGVycm9yXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uRXJyb3JMb2FkaW5nVHJhY2VEYXRhKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RyYWNlRGF0YUxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMub25FcnJvckxvYWRpbmdUcmFjZURhdGEoXCJ0cmFjZSBkYXRhIGxvYWRpbmcgYWxyZWFkeSBpbiBwcm9ncmVzcyFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSBcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbmZpcm1zIHRyYWNlIGRhdGEgbG9hZGVkXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25UcmFjZURhdGFMb2FkZWQodHJhY2VEYXRhKXtcclxuICAgICAgICAgIC8vIEJJTkRJTkdTT1VSQ0U6IGRpc3BhdGNoZXMgdGhlIG1ldGhvZCBjYWxsIHRvIGJvdW5kIHRhcmdldHNcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyYWNlIGRhdGEgbG9hZGluZyB0cmlnZ2VyZWQgYW4gZXJyb3JcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGVycm9yXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uRXJyb3JMb2FkaW5nVHJhY2VEYXRhKGVycm9yKSB7XHJcbiAgICAgICAgICAvLyBCSU5ESU5HU09VUkNFOiBkaXNwYXRjaGVzIHRoZSBtZXRob2QgY2FsbCB0byBib3VuZCB0YXJnZXRzXHJcbiAgICB9XHJcbiAgICBcclxuICAgIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvY2Vzc2VzIHRoZSBpbXBvcnQgdHJhY2UgY29uZmlndXJhdGlvbiBjb21tYW5kXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtJQ29tbWFuZEV4ZWN1dGlvbkRlbGVnYXRlPGFueSxhbnk+fVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGV4ZWN1dGVDb21tYW5kSW1wb3J0VHJhY2VDb25maWd1cmF0aW9uKCk6IElDb21tYW5kRXhlY3V0aW9uRGVsZWdhdGU8YW55LGFueT4ge1xyXG4gICAgICAgIHJldHVybiAoY29tbWFuZFBhcnM6YW55LGNvbW1hbmRSZXNwb25zZSkgPT4geyBcclxuICAgICAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb24oY29tbWFuZFBhcnMpOyBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaChlKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29tbWFuZFJlc3BvbnNlLmV4ZWN1dGVkKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH0gXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcm9jZXNzZXMgdGhlIGV4cG9ydCB0cmFjZSBjb25maWd1cmF0aW9uIGNvbW1hbmRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge0lDb21tYW5kRXhlY3V0aW9uRGVsZWdhdGU8YW55LGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZXhlY3V0ZUNvbW1hbmRFeHBvcnRUcmFjZUNvbmZpZ3VyYXRpb24oKTogSUNvbW1hbmRFeGVjdXRpb25EZWxlZ2F0ZTxhbnksYW55PiB7XHJcbiAgICAgICAgcmV0dXJuIChjb21tYW5kUGFyczphbnksY29tbWFuZFJlc3BvbnNlOiBJQ29tbWFuZEV4ZWN1dGlvblJlc3BvbnNlRGVsZWdhdGU8c3RyaW5nPikgPT4geyBcclxuICAgICAgICAgICAgbGV0IGV4cG9ydERhdGE6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgIHRyeXtcclxuICAgICAgICAgICAgICAgIGV4cG9ydERhdGEgPSB0aGlzLmV4cG9ydFRyYWNlQ29uZmlndXJhdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoKGUpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb21tYW5kUmVzcG9uc2UuZXhlY3V0ZWQoZXhwb3J0RGF0YSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIFhtbERhdGEgb2YgdGhlIGN1cnJlbnQgdHJhY2UgY29uZmlndXJhdGlvbiAoZm9yIGV4cG9ydClcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBleHBvcnRUcmFjZUNvbmZpZ3VyYXRpb24oKTogc3RyaW5ne1xyXG4gICAgICAgIGxldCB0cmFjZUNvbmZpZ0V4cG9ydCA9IG5ldyBUcmFjZUNvbmZpZ0V4cG9ydCgpO1xyXG4gICAgICAgIHJldHVybiB0cmFjZUNvbmZpZ0V4cG9ydC5nZXRYbWxEYXRhRnJvbVRyYWNlQ29uZmlnKHRoaXMuX3RyYWNlQ29tcG9uZW50LnRyYWNlQ29uZmlndXJhdGlvbkRhdGEpOyAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEltcG9ydHMgdGhlIGdpdmVuIHhtbCBkYXRhIHRvIHRoZSB0cmFjZSBjb25maWd1cmF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlRGF0YVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb24oZmlsZURhdGE6IHN0cmluZyl7XHJcbiAgICAgICAgbGV0IHRyYWNlQ29uZmlnRGF0YSA9IFRyYWNlQ29uZmlnSW1wb3J0LmdldFRyYWNlQ29uZmlnRGF0YUZyb21YbWwoZmlsZURhdGEpO1xyXG4gICAgICAgIGlmKHRyYWNlQ29uZmlnRGF0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlc09mVGltaW5nUGFyYW1ldGVycyh0aGlzLl90cmFjZUNvbXBvbmVudC50cmFjZUNvbmZpZ3VyYXRpb25EYXRhLnRpbWluZ1BhcmFtZXRlcnMsIHRyYWNlQ29uZmlnRGF0YS50aW1pbmdQYXJhbWV0ZXJzKTtcclxuICAgICAgICAgICAgbGV0IHRyYWNlQ29uZmlndXJhdGlvbkRhdGEgPSBuZXcgVHJhY2VDb25maWd1cmF0aW9uRGF0YSh0cmFjZUNvbmZpZ0RhdGEuZGF0YVBvaW50cywgdGhpcy5fdHJhY2VDb21wb25lbnQudHJhY2VDb25maWd1cmF0aW9uRGF0YS50aW1pbmdQYXJhbWV0ZXJzLCB0cmFjZUNvbmZpZ0RhdGEuc3RhcnRUcmlnZ2Vycyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBVcGRhdGUgZGF0YXBvaW50IGluZm9ybWF0aW9ucyAoZS5nLiBheGlzIG5hbWUsIGRlc2NyaXB0aW9uLCAuLi4pXHJcbiAgICAgICAgICAgIHRoaXMuX3RyYWNlQ29tcG9uZW50LnVwZGF0ZURhdGFQb2ludEluZm9ybWF0aW9ucyh0cmFjZUNvbmZpZ3VyYXRpb25EYXRhKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIFNldCBuZXcgdHJhY2UgY29uZmlndXJhdGlvbiBkYXRhIHRvIHRyYWNlIGNvbXBvbmVudFxyXG4gICAgICAgICAgICB0aGlzLl90cmFjZUNvbXBvbmVudC50cmFjZUNvbmZpZ3VyYXRpb25EYXRhID0gdHJhY2VDb25maWd1cmF0aW9uRGF0YTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB2YWx1ZXMgb2YgdGhlIHRpbWluZyBwYXJhbWV0ZXJzKGZyb20gaW1wb3J0KSB0byB0aGUgbWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJzXHJcbiAgICAgKiBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IHRpbWluZ1BhcmFtZXRlcnNcclxuICAgICAqIEBwYXJhbSB7e1trZXk6IHN0cmluZ106IHN0cmluZ319IHZhbHVlc1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldFZhbHVlc09mVGltaW5nUGFyYW1ldGVycyh0aW1pbmdQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdLCB2YWx1ZXM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9KXtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGltaW5nUGFyYW1ldGVycy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCB0aW1pbmdQYXJhbSA9IHRpbWluZ1BhcmFtZXRlcnNbaV07XHJcbiAgICAgICAgICAgIGxldCB0aW1pbmdQYXJhbUlkID0gVHJhY2VDb25maWdFeHBvcnQuZ2V0VGltaW5nUGFyYW1JZCh0aW1pbmdQYXJhbS5icm93c2VOYW1lKTtcclxuICAgICAgICAgICAgaWYodGltaW5nUGFyYW1JZCAhPSBcIlwiKXtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdWYWx1ZSA9IHZhbHVlc1t0aW1pbmdQYXJhbUlkXTtcclxuICAgICAgICAgICAgICAgIHRpbWluZ1BhcmFtLnZhbHVlID0gbmV3VmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAgICBcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIGNvbW1hbmQgcHJvdmlkZXIgZm9yIGhhbmRsaW5nIHRyYWNlIGNvbnRyb2wgY29tbWFuZHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZVRyYWNlQ29udHJvbFByb3BlcnRpZXMoKSB7XHJcbiAgICAgICAgdGhpcy5fdHJhY2VTdGF0ZSA9IFByb3BlcnR5LmNyZWF0ZTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4obmV3IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyKG51bGwsXCJEeW1teVBhclwiLG51bGwpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHRyYWNlIHN0YXRlIGxpbmtcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHRyYWNlU3RhdGUoKTogUHJvcGVydHk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdHJhY2VTdGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9ic2VydmVzIHRoZSB0cmFjZSBzdGF0ZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IHBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9ic2VydmVUcmFjZVN0YXRlKHBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pOiBhbnkge1xyXG4gICAgICAgIGxldCB0cmFjZVN0YXRlUGFyYW1ldGVyID0gcGFyYW1ldGVycy5maWx0ZXIoKHRyYWNlUGFyYW1ldGVyKSA9PiB7IHJldHVybiB0cmFjZVBhcmFtZXRlci5icm93c2VOYW1lID09PSBcIlRyYWNlU3RhdHVzXCIgfSlbMF07XHJcblxyXG4gICAgICAgIHRyYWNlU3RhdGVQYXJhbWV0ZXIudmFsdWVTb3VyY2UuY2hhbmdlZCgobmV3VHJhY2VTdGF0ZVZhbHVlLG9sZFRyYWNlU3RhdGVWYWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5fYWN0dWFsVHJhY2VTdGF0ZSA9IHRyYWNlU3RhdGVQYXJhbWV0ZXIudmFsdWU7XHJcblxyXG4gICAgICAgICAgICAvLyBub3RpZnkgdHJhY2Ugc3RhdGUgY2hhbmdlXHJcbiAgICAgICAgICAgIHRoaXMub25UcmFjZVN0YXRlQ2hhbmdlZCh0cmFjZVN0YXRlUGFyYW1ldGVyLnZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChuZXdUcmFjZVN0YXRlVmFsdWUgIT0gb2xkVHJhY2VTdGF0ZVZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmICggICB0aGlzLl9hY3R1YWxUcmFjZVN0YXRlID09IFwiMjNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5vdGlmeSB0cmFjZSBkYXRhIGF2YWlsYWJsZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25UcmFjZURhdGFBdmFpbGFibGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gd2F0Y2ggdHJhY2Ugc3RhdGUgY2hhbmdlc1xyXG4gICAgICAgIHRoaXMuX2RpYWdub3N0aWNQcm92aWRlci5vYnNlcnZlQ29tcG9uZW50TW9kZWxJdGVtcyh0aGlzLCBbdHJhY2VTdGF0ZVBhcmFtZXRlcl0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25UcmFjZURhdGFBdmFpbGFibGUodHJhY2VEYXRhQXZhaWxhYmxlOmJvb2xlYW4pIHtcclxuICAgICAgICAvLyBCSU5ESU5HU09VUkNFOiBtZXRob2QgZGlzcGF0Y2hlcyB0aGUgY2FsbCB0byBhIGJvdW5kIHRhcmdldFxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25UcmFjZVN0YXRlQ2hhbmdlZCh0cmFjZVN0YXRlOiBhbnkpIHtcclxuICAgICAgICAvLyBCSU5ESU5HU09VUkNFOiBtZXRob2QgZGlzcGF0Y2hlcyB0aGUgdmFsdWUgdG8gYSBib3VuZCB0YXJnZXRcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHRyYW5zZmVycyB0aGUgdHJhY2UgY29uZmlndXJhdGlvbiBkYXRhIHRvIHRoZSB0YXJnZXQgKGUuZy4gZGF0YXBvaW50cywgdGltaW5nIHBhcmFtZXRlcnMsIHRyaWdnZXJzLCAuLi4pLFxyXG4gICAgICogYW5kIGNsZWFycyBhbGwgZGF0YSBvbiB0YXJnZXQgYmVmb3JlIFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgdHJhbnNmZXJEYXRhVG9UYXJnZXQoKSB7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCB0aGlzLl90cmFjZUNvbXBvbmVudC5tYXBwQ29ja3BpdENvbXBvbmVudC5tZXRob2RzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBtZXRob2RzIGlucHV0IHBhcmFtZXRlcnNcclxuICAgICAgICAgICAgYXdhaXQgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QudXBkYXRlSW5wdXRQYXJhbWV0ZXJzKHRoaXMuX3RyYWNlQ29tcG9uZW50Lm1hcHBDb2NrcGl0Q29tcG9uZW50Lm1ldGhvZHNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBDYWxsIHJlc2V0IG1ldGhvZCBiZWZvcmUgdHJhbnNmZXJpbmcgZGF0YSB0byBhdm9pZCBwcm9ibGVtcyB3aGVuIHRyYWNlIGlzIGluIHdyb25nIHN0YXRlXHJcbiAgICAgICAgYXdhaXQgdGhpcy5leGVjdXRlTWV0aG9kKHRoaXMuZ2V0VHJhY2VNZXRob2QoVHJhY2VNZXRob2RJZHMuUmVzZXQpKTtcclxuXHJcbiAgICAgICAgLy8gcmVtb3ZlIGFsbCBkYXRhcG9pbnRzXHJcbiAgICAgICAgYXdhaXQgdGhpcy5yZW1vdmVBbGxEYXRhcG9pbnRzKCk7XHJcbiAgICAgICAgLy8gcmVtb3ZlIGFsbCBzdGFydCB0cmlnZ2Vyc1xyXG4gICAgICAgIGF3YWl0IHRoaXMucmVtb3ZlQWxsU3RhcnRUcmlnZ2VycygpO1xyXG5cclxuICAgICAgICAvLyB3cml0ZSB0aW1pbmcgcGFyYW1ldGVyc1xyXG4gICAgICAgIGF3YWl0IHRoaXMuc2V0VGltaW5nUGFyYW1ldGVycygpO1xyXG5cclxuICAgICAgICAvLyBhZGQgYWxsIGRhdGFwb2ludHNcclxuICAgICAgICBhd2FpdCB0aGlzLmFkZERhdGFwb2ludHMoKTtcclxuICAgICAgICAvLyBhZGQgYWxsIHN0YXJ0IHRyaWdnZXJzXHJcbiAgICAgICAgYXdhaXQgdGhpcy5hZGRTdGFydFRyaWdnZXJzKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBhbGwgdHJhY2UgY29uZmlndXJhdGlvbiBkYXRhcG9pbnRzIG9uIHRhcmdldCBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIHJlbW92ZUFsbERhdGFwb2ludHMoKSB7XHJcbiAgICAgICAgbGV0IGRhdGFwb2ludHMgPSBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8ucmV0cmlldmVUcmFjZUNvbmZpZ3VyYXRpb25EYXRhcG9pbnRzKHRoaXMuX3RyYWNlQ29tcG9uZW50Lm1hcHBDb2NrcGl0Q29tcG9uZW50LnBhcmFtZXRlcnMpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuX2RpYWdub3N0aWNQcm92aWRlci5yZWFkUGFyYW1ldGVyVmFsdWVzKGRhdGFwb2ludHMpO1xyXG5cclxuICAgICAgICBsZXQgcmVtb3ZlRGF0YVBvaW50TWV0aG9kID0gdGhpcy5nZXRUcmFjZU1ldGhvZChUcmFjZU1ldGhvZElkcy5SZW1vdmVEYXRhUG9pbnQpO1xyXG4gICAgICAgIGlmIChyZW1vdmVEYXRhUG9pbnRNZXRob2QgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YXBvaW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFwb2ludHNbaV0udmFsdWUgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZURhdGFQb2ludE1ldGhvZC5pbnB1dFBhcmFtZXRlcnNbMF0udmFsdWUgPSBkYXRhcG9pbnRzW2ldLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhcIlJlbW92ZSBkYXRhcG9pbnQ6IFwiICsgZGF0YXBvaW50c1tpXS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5leGVjdXRlTWV0aG9kKHJlbW92ZURhdGFQb2ludE1ldGhvZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGFsbCB0cmFjZSBjb25maWd1cmF0aW9uIHN0YXJ0IHRyaWdnZXJzIG9uIHRhcmdldFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgcmVtb3ZlQWxsU3RhcnRUcmlnZ2VycygpIHtcclxuICAgICAgICBsZXQgdHJpZ2dlclBhcmFtZXRlcnMgPSBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8ucmV0cmlldmVUcmFjZUNvbmZpZ3VyYXRpb25UcmlnZ2VyUGFyYW1ldGVycyh0aGlzLl90cmFjZUNvbXBvbmVudC5tYXBwQ29ja3BpdENvbXBvbmVudC5wYXJhbWV0ZXJzKTtcclxuICAgICAgICBhd2FpdCB0aGlzLl9kaWFnbm9zdGljUHJvdmlkZXIucmVhZFBhcmFtZXRlclZhbHVlcyh0cmlnZ2VyUGFyYW1ldGVycyk7XHJcblxyXG4gICAgICAgIGxldCBzdGFydFRyaWdnZXJEYXRhUG9pbnQxID0gdGhpcy5nZXRUcmFjZVBhcmFtZXRlcihcIlN0YXJ0VHJpZ2dlcjFfRGF0YVBvaW50XCIpO1xyXG4gICAgICAgIGxldCBzdGFydFRyaWdnZXJEYXRhUG9pbnQyID0gdGhpcy5nZXRUcmFjZVBhcmFtZXRlcihcIlN0YXJ0VHJpZ2dlcjJfRGF0YVBvaW50XCIpO1xyXG5cclxuICAgICAgICBsZXQgcmVtb3ZlU3RhcnRUcmlnZ2VyMU1ldGhvZCA9IHRoaXMuZ2V0VHJhY2VNZXRob2QoVHJhY2VNZXRob2RJZHMuUmVtb3ZlU3RhcnRUcmlnZ2VyMSk7XHJcbiAgICAgICAgbGV0IHJlbW92ZVN0YXJ0VHJpZ2dlcjJNZXRob2QgPSB0aGlzLmdldFRyYWNlTWV0aG9kKFRyYWNlTWV0aG9kSWRzLlJlbW92ZVN0YXJ0VHJpZ2dlcjIpO1xyXG5cclxuICAgICAgICAvLyBvbmx5IGRlbGV0ZSBpZiBzdGFydHRyaWdnZXIgaWYgZGVmaW5lZChkYXRhcG9pbnQgaXMgZGVmaW5lZClcclxuICAgICAgICBpZiAoc3RhcnRUcmlnZ2VyRGF0YVBvaW50MiEudmFsdWUgIT0gXCJcIikge1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmV4ZWN1dGVNZXRob2QocmVtb3ZlU3RhcnRUcmlnZ2VyMk1ldGhvZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdGFydFRyaWdnZXJEYXRhUG9pbnQxIS52YWx1ZSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZXhlY3V0ZU1ldGhvZChyZW1vdmVTdGFydFRyaWdnZXIxTWV0aG9kKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIGFsbCB0aW1pbmcgcGFyYW1ldGVycyBvbiB0YXJnZXQgd2l0aCB0aGUgY3VycmVudCB0cmFjZSBjb25maWd1cmF0aW9uIGZyb20gbWFwcENvY2twaXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIHNldFRpbWluZ1BhcmFtZXRlcnMoKSB7XHJcbiAgICAgICAgbGV0IHRpbWluZ1BhcmFtZXRlcnMgPSB0aGlzLl90cmFjZUNvbXBvbmVudC50cmFjZUNvbmZpZ3VyYXRpb25EYXRhIS50aW1pbmdQYXJhbWV0ZXJzO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGltaW5nUGFyYW1ldGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgdGltaW5nUGFyYW1ldGVyID0gdGltaW5nUGFyYW1ldGVyc1tpXTtcclxuICAgICAgICAgICAgLyppZiAodGltaW5nUGFyYW0uZGlzcGxheU5hbWUgPT0gXCJQTEMgdGFzayBjbGFzcyBudW1iZXJcIikge1xyXG4gICAgICAgICAgICAgICAgLy8gdXNlIHZhbHVlIHRvIGF2b2lkIHByb2JsZW1zIHdpdGggdGFza2NsYXNzIGN5Y2xlIHRpbWUgZGlzcGxheVZhbHVlXHJcbiAgICAgICAgICAgICAgICAvL3RpbWluZ1BhcmFtLmNvbXBvbmVudFBhcmFtZXRlci52YWx1ZSA9IHRpbWluZ1BhcmFtLnZhbHVlOyAvLyB2YWx1ZSBub3QgdXAgdG8gZGF0ZSBjdXJyZW50bHlcclxuICAgICAgICAgICAgICAgIHRpbWluZ1BhcmFtLmNvbXBvbmVudFBhcmFtZXRlci52YWx1ZSA9IHRpbWluZ1BhcmFtLmRpc3BsYXlWYWx1ZS5zdWJzdHIoMCwgMSk7IC8vIHZhbHVlIG5vdCB1cCB0byBkYXRlIGN1cnJlbnRseVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGltaW5nUGFyYW0uY29tcG9uZW50UGFyYW1ldGVyLnZhbHVlID0gdGltaW5nUGFyYW0uZGlzcGxheVZhbHVlO1xyXG4gICAgICAgICAgICB9Ki9cclxuICAgICAgICAgICBhd2FpdCB0aGlzLl9kaWFnbm9zdGljUHJvdmlkZXIud3JpdGVQYXJhbWV0ZXJWYWx1ZSh0aW1pbmdQYXJhbWV0ZXIsIHRpbWluZ1BhcmFtZXRlci52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyBhbGwgZGF0YXBvaW50cyBvbiB0YXJnZXQgd2l0aCB0aGUgY3VycmVudCB0cmFjZSBjb25maWd1cmF0aW9uIGZyb20gbWFwcENvY2twaXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGFkZERhdGFwb2ludHMoKSB7XHJcbiAgICAgICAgbGV0IGFkZERhdGFQb2ludE1ldGhvZCA9IHRoaXMuZ2V0VHJhY2VNZXRob2QoVHJhY2VNZXRob2RJZHMuQWRkRGF0YVBvaW50KTtcclxuICAgICAgICBpZiAoYWRkRGF0YVBvaW50TWV0aG9kICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBsZXQgZGF0YVBvaW50cyA9IHRoaXMuX3RyYWNlQ29tcG9uZW50LnRyYWNlQ29uZmlndXJhdGlvbkRhdGEhLmRhdGFQb2ludHM7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YVBvaW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFQb2ludHNbaV0uZGF0YVBvaW50TmFtZSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkRGF0YVBvaW50TWV0aG9kLmlucHV0UGFyYW1ldGVyc1swXS52YWx1ZSA9IGRhdGFQb2ludHNbaV0uZGF0YVBvaW50TmFtZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oXCJBZGQgZGF0YXBvaW50OiBcIiArIGRhdGFQb2ludHNbaV0uZGF0YVBvaW50TmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5leGVjdXRlTWV0aG9kKGFkZERhdGFQb2ludE1ldGhvZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIGFsbCBzdGFydHRyaWdnZXJzIG9uIHRhcmdldCB3aXRoIHRoZSBjdXJyZW50IHRyYWNlIGNvbmZpZ3VyYXRpb24gZnJvbSBtYXBwQ29ja3BpdFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgYWRkU3RhcnRUcmlnZ2VycygpIHtcclxuICAgICAgICBsZXQgc2V0U3RhcnRUcmlnZ2VyTWV0aG9kID0gdGhpcy5nZXRUcmFjZU1ldGhvZChUcmFjZU1ldGhvZElkcy5TZXRTdGFydFRyaWdnZXIpO1xyXG4gICAgICAgIGxldCBzdGFydFRyaWdnZXJzID0gdGhpcy5fdHJhY2VDb21wb25lbnQudHJhY2VDb25maWd1cmF0aW9uRGF0YSEuc3RhcnRUcmlnZ2VycztcclxuXHJcbiAgICAgICAgaWYgKHNldFN0YXJ0VHJpZ2dlck1ldGhvZCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGFydFRyaWdnZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBzdGFydFRyaWdnZXIgPSBzdGFydFRyaWdnZXJzW2ldO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1pc3NpbmdJbmZvID0gZmFsc2U7IC8vIFRPRE86IHVzZSBtaXNzaW5nIGluZm8gYW5kIHJlcG9ydCBlcnJvciA9PiBubyBkYXRhcG9pbnRuYW1lIGRlZmluZWRcclxuICAgICAgICAgICAgICAgIC8vIHNldCBzZXRTdGFydFRyaWdnZXIgbWV0aG9kIGlucHV0IGFyZ3NcclxuICAgICAgICAgICAgICAgIHNldFN0YXJ0VHJpZ2dlck1ldGhvZC5pbnB1dFBhcmFtZXRlcnNbMF0udmFsdWUgPSBzdGFydFRyaWdnZXIuY29uZGl0aW9uO1xyXG4gICAgICAgICAgICAgICAgc2V0U3RhcnRUcmlnZ2VyTWV0aG9kLmlucHV0UGFyYW1ldGVyc1sxXS52YWx1ZSA9IHN0YXJ0VHJpZ2dlci5kYXRhUG9pbnROYW1lO1xyXG4gICAgICAgICAgICAgICAgc2V0U3RhcnRUcmlnZ2VyTWV0aG9kLmlucHV0UGFyYW1ldGVyc1syXS52YWx1ZSA9IHN0YXJ0VHJpZ2dlci50aHJlc2hvbGQ7XHJcbiAgICAgICAgICAgICAgICBzZXRTdGFydFRyaWdnZXJNZXRob2QuaW5wdXRQYXJhbWV0ZXJzWzNdLnZhbHVlID0gc3RhcnRUcmlnZ2VyLndpbmRvdztcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWlzc2luZ0luZm8gPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmV4ZWN1dGVNZXRob2Qoc2V0U3RhcnRUcmlnZ2VyTWV0aG9kKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSB0cmFjZSBjb21wb25lbnQgbWV0aG9kIGZvciB0aGUgZ2l2ZW4gbWV0aG9kIGlkIG9yIHVuZGVmaW5lZCBpZiBub3QgZm91bmRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1ldGhvZElkXHJcbiAgICAgKiBAcmV0dXJucyB7KE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kIHwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmFjZU1ldGhvZChtZXRob2RJZDogc3RyaW5nKTogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGxldCB0cmFjZUNvbXBvbmVudCA9IHRoaXMuX3RyYWNlQ29tcG9uZW50Lm1hcHBDb2NrcGl0Q29tcG9uZW50O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJhY2VDb21wb25lbnQubWV0aG9kcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodHJhY2VDb21wb25lbnQubWV0aG9kc1tpXS5icm93c2VOYW1lID09IG1ldGhvZElkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJhY2VDb21wb25lbnQubWV0aG9kc1tpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLndhcm4oXCJNZXRob2QgJ1wiICsgbWV0aG9kSWQgKyBcIicgbm90IGZvdW5kIG9uIHRyYWNlIGNvbXBvbmVudCFcIik7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSB0cmFjZSBjb21wb25lbnQgcGFyYW1ldGVyIGZvciB0aGUgZ2l2ZW4gcGFyYW1ldGVyIGlkIG9yIHVuZGVmaW5lZCBpZiBub3QgZm91bmRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhcmFtZXRlcklkXHJcbiAgICAgKiBAcmV0dXJucyB7KE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyIHwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmFjZVBhcmFtZXRlcihwYXJhbWV0ZXJJZDogc3RyaW5nKTogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGxldCB0cmFjZUNvbXBvbmVudCA9IHRoaXMuX3RyYWNlQ29tcG9uZW50Lm1hcHBDb2NrcGl0Q29tcG9uZW50O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJhY2VDb21wb25lbnQucGFyYW1ldGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodHJhY2VDb21wb25lbnQucGFyYW1ldGVyc1tpXS5icm93c2VOYW1lID09IHBhcmFtZXRlcklkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJhY2VDb21wb25lbnQucGFyYW1ldGVyc1tpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLndhcm4oXCJQYXJhbWV0ZXIgJ1wiICsgcGFyYW1ldGVySWQgKyBcIicgbm90IGZvdW5kIG9uIHRyYWNlIGNvbXBvbmVudCFcIik7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGV4ZWN1dGVzIHRoZSBzZWxlY3RlZCBtZXRob2RcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGV4ZWN1dGVNZXRob2QobWV0aG9kOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlmIChtZXRob2QpIHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5fZGlhZ25vc3RpY1Byb3ZpZGVyLmV4ZWN1dGVDb21wb25lbnRNZXRob2QobWV0aG9kKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFRyYWNlQ29udHJvbCB9OyJdfQ==