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
define(["require", "exports", "../../../framework/property", "./traceControl", "./traceConfig/traceConfigData", "./traceDataPoint", "./traceStartTrigger", "./traceConfig/traceConfigInfo", "../../../framework/command", "../../online/mappCockpitComponentReflection", "../../../framework/componentHub/bindings/componentBinding", "../../../framework/componentHub/bindings/componentBindings"], function (require, exports, property_1, traceControl_1, traceConfigData_1, traceDataPoint_1, traceStartTrigger_1, traceConfigInfo_1, command_1, mappCockpitComponentReflection_1, componentBinding_1, componentBindings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Provides data for describing a trace component
     *
     * @class MappCockpitTraceComponent
     */
    var MappCockpitTraceComponent = /** @class */ (function () {
        function MappCockpitTraceComponent(diagnosticProvider, mappCockpitComponent) {
            this._initialized = false;
            this._diagnosticProvider = diagnosticProvider;
            this._mappCockpitComponent = mappCockpitComponent;
            this._traceControl = new traceControl_1.TraceControl(this._diagnosticProvider);
            this._availableTraceDataPoints = property_1.Property.create([]);
            //todo  Property.create TraceConfigurationData
            this._traceConfigurationData = new traceConfigData_1.TraceConfigurationData(new Array(), new Array(), new Array());
            this._traceConfigurationInfo = new traceConfigInfo_1.TraceConfigurationInfo(new Array(), new Array(), new Array());
            this._traceComponentParameterInterface = property_1.Property.create({
                parameters: [],
                availableTraceDataPoints: this._availableTraceDataPoints,
                traceConfigurationData: this._traceConfigurationData,
                traceConfigurationInfo: this._traceConfigurationInfo,
                commandRead: this._commandReadTraceParameters,
                commandWrite: this._commandWriteTraceParameters,
            });
            this.createCommands();
            this.createComponentBindings();
        }
        /**
         * Creates the bindings to other components
         *
         * @private
         * @memberof MappCockpitTraceComponent
         */
        MappCockpitTraceComponent.prototype.createComponentBindings = function () {
            var bindingTraceDataPoints = new componentBinding_1.ComponentBinding();
            bindingTraceDataPoints.type = componentBinding_1.BindingType.DATA;
            bindingTraceDataPoints.component = this;
            bindingTraceDataPoints.scope = "app::trace configuration";
            bindingTraceDataPoints.id = "trace data points";
            bindingTraceDataPoints.sourceKey = "updateTraceDataPoints";
            bindingTraceDataPoints.passByValue = false;
            componentBindings_1.ComponentBindings.bind(bindingTraceDataPoints);
            var bindingTraceStartTriggers = new componentBinding_1.ComponentBinding();
            bindingTraceStartTriggers.type = componentBinding_1.BindingType.DATA;
            bindingTraceStartTriggers.component = this;
            bindingTraceStartTriggers.scope = "app::trace configuration";
            bindingTraceStartTriggers.id = "trace start trigger info";
            bindingTraceStartTriggers.sourceKey = "updateTraceStartTriggerInfo";
            bindingTraceStartTriggers.passByValue = false;
            componentBindings_1.ComponentBindings.bind(bindingTraceStartTriggers);
            var bindingTraceTimingParameters = new componentBinding_1.ComponentBinding();
            bindingTraceTimingParameters.type = componentBinding_1.BindingType.DATA;
            bindingTraceTimingParameters.component = this;
            bindingTraceTimingParameters.scope = "app::trace configuration";
            bindingTraceTimingParameters.id = "trace timing parameters";
            bindingTraceTimingParameters.sourceKey = "updateTraceTimingParameters";
            bindingTraceTimingParameters.passByValue = false;
            componentBindings_1.ComponentBindings.bind(bindingTraceTimingParameters);
        };
        /**
         * Creates the exposed commands
         *
         * @private
         * @memberof MappCockpitTraceComponent
         */
        MappCockpitTraceComponent.prototype.createCommands = function () {
            this._commandReadTraceParameters = command_1.Command.create(this, this.executeCommandReadTraceParameters());
            this._commandWriteTraceParameters = command_1.Command.create(this, this.executeCommandWriteTraceParameters());
        };
        /**
         * Implements the command for reading the trace parameters
         *
         * @returns {*}
         * @memberof MappCockpitTraceComponent
         */
        MappCockpitTraceComponent.prototype.executeCommandReadTraceParameters = function () {
            var _this = this;
            return function (traceParameters, commandResponse) {
                var parametersToRead = traceParameters ? traceParameters : _this.mappCockpitComponent.parameters;
                _this._diagnosticProvider.readParameterValues(parametersToRead).then(function (updatedParameters) {
                    commandResponse.executed(updatedParameters);
                }).catch(function (error) {
                    commandResponse.rejected(error);
                });
            };
        };
        /**
         * Implements the command for writing the trace parameters
         *
         * @returns {*}
         * @memberof MappCockpitTraceComponent
         */
        MappCockpitTraceComponent.prototype.executeCommandWriteTraceParameters = function () {
            var _this = this;
            return function (traceParameters, commandResponse) {
                var parametersToWrite = traceParameters ? traceParameters : _this.mappCockpitComponent.parameters;
                _this._diagnosticProvider.writeParameterValues(parametersToWrite).then(function (updatedParameters) {
                    commandResponse.executed(updatedParameters);
                }).catch(function (error) {
                    commandResponse.rejected(error);
                });
            };
        };
        MappCockpitTraceComponent.prototype.initialize = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this._initialized == true) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.connectComponent()];
                        case 1:
                            _a.sent();
                            this._traceControl.initialize(this);
                            this._traceConfigurationInfo = new traceConfigInfo_1.TraceConfigurationInfo(mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.retrieveTraceConfigurationDatapoints(this.mappCockpitComponent.parameters), mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.retrieveTraceConfigurationTimingParameters(this.mappCockpitComponent.parameters), mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.retrieveTraceConfigurationTriggerParameters(this.mappCockpitComponent.parameters));
                            this._traceConfigurationData = this.getTraceConfigurationData(this._traceConfigurationInfo);
                            this.updateParameterInterface();
                            this._initialized = true;
                            return [2 /*return*/];
                    }
                });
            });
        };
        MappCockpitTraceComponent.prototype.updateParameterInterface = function () {
            this._traceComponentParameterInterface.value = {
                parameters: this.mappCockpitComponent.parameters,
                availableTraceDataPoints: this._availableTraceDataPoints,
                traceConfigurationData: this._traceConfigurationData,
                traceConfigurationInfo: this._traceConfigurationInfo,
                commandRead: this._commandReadTraceParameters,
                commandWrite: this._commandWriteTraceParameters,
            };
            this.updateTraceTimingParameters(this._traceConfigurationData.timingParameters);
            this.updateTraceDataPoints(this._traceConfigurationData.dataPoints);
            var startTriggerInfos = { data: this._traceConfigurationData.startTriggers, info: this._traceConfigurationInfo.startTriggerInfos };
            this.updateTraceStartTriggerInfo(startTriggerInfos);
        };
        /**
         * Updates the trace start triggers
         *
         * @private
         * @param {TraceStartTrigger[]} startTriggers
         * @memberof MappCockpitTraceComponent
         */
        MappCockpitTraceComponent.prototype.updateTraceStartTriggerInfo = function (startTriggerInfo) {
            // BINDINGSOURCE: method stub to make the passed data bindable
        };
        /**
         * Updates the trace data points
         *
         * @private
         * @param {TraceDataPoint[]} dataPoints
         * @memberof MappCockpitTraceComponent
         */
        MappCockpitTraceComponent.prototype.updateTraceDataPoints = function (dataPoints) {
            // BINDINGSOURCE: method stub to make the passed data bindable
        };
        /**
         * Updates the trace timing parameters.
         *
         * @private
         * @param {MappCockpitComponentParameter[]} timingParameters
         * @memberof MappCockpitTraceComponent
         */
        MappCockpitTraceComponent.prototype.updateTraceTimingParameters = function (timingParameters) {
            // BINDINGSOURCE: method stub to make the passed data bindable
        };
        /**
         * Connects the trace component to the target and browses the methods,parameters
         *
         * @private
         * @param {MappCockpitComponent} traceComponent
         * @memberof MappCockpitTraceComponent
         */
        MappCockpitTraceComponent.prototype.connectComponent = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._diagnosticProvider.browseParameters(this._mappCockpitComponent)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this._diagnosticProvider.updateParameterDataTypes(this._mappCockpitComponent.parameters)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this._diagnosticProvider.browseMethods(this._mappCockpitComponent)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this._diagnosticProvider.browseMethodParameters(this._mappCockpitComponent.methods)];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, this._diagnosticProvider.readParameterValues(this._mappCockpitComponent.parameters)];
                        case 5:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        MappCockpitTraceComponent.prototype.getTraceConfigurationData = function (traceConfigurationInfo) {
            // get datapoints
            var datapoints = this.getDataPoints(traceConfigurationInfo.dataPointInfos);
            // get timing parameters
            var timingParameters = traceConfigurationInfo.timingParameterInfos;
            // get start trigger parameters
            var startTriggers = this.getStartTriggers(traceConfigurationInfo.startTriggerInfos);
            // create trace configuration data
            return new traceConfigData_1.TraceConfigurationData(datapoints, timingParameters, startTriggers);
        };
        MappCockpitTraceComponent.prototype.getDataPoints = function (datapointParameters) {
            var datapoints = new Array();
            var _loop_1 = function (datapoint) {
                if (datapoint.displayValue != "") {
                    var newDatapoint = traceDataPoint_1.TraceDataPoint.createSimpleDataPoint(datapoint.displayValue);
                    if (this_1._availableTraceDataPoints != undefined) {
                        var dataPointInfo = this_1._availableTraceDataPoints.value.filter(function (ele) { return ele.fullname == datapoint.displayValue; })[0];
                        if (dataPointInfo != undefined) {
                            newDatapoint = traceDataPoint_1.TraceDataPoint.createWithDataPointInfo(dataPointInfo);
                        }
                    }
                    datapoints.push(newDatapoint);
                }
            };
            var this_1 = this;
            for (var _i = 0, datapointParameters_1 = datapointParameters; _i < datapointParameters_1.length; _i++) {
                var datapoint = datapointParameters_1[_i];
                _loop_1(datapoint);
            }
            return datapoints;
        };
        MappCockpitTraceComponent.prototype.getStartTriggers = function (triggerParameters) {
            var startTriggers = new Array();
            var _loop_2 = function (triggerInstance) {
                var triggerInstanceId = "StartTrigger" + triggerInstance + "_";
                var dataPointNameParam = triggerParameters.filter(function (param) { return param.browseName == triggerInstanceId + "DataPoint"; })[0];
                if (dataPointNameParam != undefined) {
                    if (dataPointNameParam.value != "") { // Add no starttrigger if datapoint name is not defined
                        var startTrigger = this_2.getStartTrigger(dataPointNameParam.value, triggerInstanceId, triggerParameters);
                        startTriggers.push(startTrigger);
                    }
                }
            };
            var this_2 = this;
            for (var triggerInstance = 1; triggerInstance < 10; triggerInstance++) {
                _loop_2(triggerInstance);
            }
            return startTriggers;
        };
        MappCockpitTraceComponent.prototype.getStartTrigger = function (dataPointName, instanceId, componentParameters) {
            var condition = "";
            var conditionParam = componentParameters.filter(function (param) { return param.browseName == instanceId + "Condition"; })[0];
            if (conditionParam != undefined) {
                condition = conditionParam.value.toString();
            }
            var threshold = "";
            var thresholdParam = componentParameters.filter(function (param) { return param.browseName == instanceId + "Threshold"; })[0];
            if (thresholdParam != undefined) {
                threshold = thresholdParam.displayValue;
            }
            var triggerWindow = "";
            var triggerParam = componentParameters.filter(function (param) { return param.browseName == instanceId + "Window"; })[0];
            if (triggerParam != undefined) {
                triggerWindow = triggerParam.displayValue;
            }
            return new traceStartTrigger_1.TraceStartTrigger(condition, dataPointName, threshold, triggerWindow);
        };
        MappCockpitTraceComponent.prototype.updateDataPointInformations = function (traceConfigurationData) {
            var _this = this;
            traceConfigurationData.dataPoints.forEach(function (datapoint) {
                var dataPointInfo = _this._availableTraceDataPoints.value.filter(function (ele) { return ele.fullname == datapoint.dataPointName; })[0];
                if (dataPointInfo != undefined) {
                    var newDatapoint = traceDataPoint_1.TraceDataPoint.createWithDataPointInfo(dataPointInfo);
                    datapoint.componentName = newDatapoint.componentName;
                    datapoint.name = newDatapoint.name;
                    datapoint.description = newDatapoint.description;
                }
            });
        };
        Object.defineProperty(MappCockpitTraceComponent.prototype, "availableTraceDataPoints", {
            set: function (dataPoints) {
                this._availableTraceDataPoints = dataPoints;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitTraceComponent.prototype, "traceConfigurationData", {
            /**
             * Returns traceConfigurationData
             *
             * @readonly
             * @type {InterfaceTraceData}
             * @memberof MappCockpitTraceComponent
             */
            get: function () {
                return this._traceConfigurationData;
            },
            set: function (traceConfigurationData) {
                this._traceConfigurationData = traceConfigurationData;
                this.updateParameterInterface();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitTraceComponent.prototype, "mappCockpitComponent", {
            /**
             * Gets the MappCockpitComponent
             *
             * @readonly
             * @type {MappCockpitComponent}
             * @memberof MappCockpitTraceComponent
             */
            get: function () {
                return this._mappCockpitComponent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitTraceComponent.prototype, "traceControlInterface", {
            /**
             * Gets the TraceControlInterface
             *
             * @readonly
             * @type {ITraceComponentControl}
             * @memberof MappCockpitTraceComponent
             */
            get: function () {
                return this._traceControl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitTraceComponent.prototype, "traceParameters", {
            /**
             * Gets the Property<ITraceComponentParameters>
             *
             * @readonly
             * @type {Property<ITraceComponentParameters>}
             * @memberof MappCockpitTraceComponent
             */
            get: function () {
                return this._traceComponentParameterInterface;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitTraceComponent.prototype, "displayName", {
            /**
             * Gets the DisplayName
             *
             * @readonly
             * @type {Property<ITraceComponentParameters>}
             * @memberof MappCockpitTraceComponent
             */
            get: function () {
                return this._mappCockpitComponent.displayName;
            },
            enumerable: true,
            configurable: true
        });
        return MappCockpitTraceComponent;
    }());
    exports.MappCockpitTraceComponent = MappCockpitTraceComponent;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXRUcmFjZUNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2RpYWdub3N0aWNzL3RyYWNlL21hcHBDb2NrcGl0VHJhY2VDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZ0JBOzs7O09BSUc7SUFDSDtRQXlCSSxtQ0FBbUIsa0JBQWlELEVBQUUsb0JBQTBDO1lBdEJ4RyxpQkFBWSxHQUFHLEtBQUssQ0FBQztZQXVCekIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLGtCQUFrQixDQUFDO1lBQzlDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxvQkFBb0IsQ0FBQztZQUVsRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksMkJBQVksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUNoRSxJQUFJLENBQUMseUJBQXlCLEdBQUcsbUJBQVEsQ0FBQyxNQUFNLENBQTRCLEVBQUUsQ0FBQyxDQUFDO1lBQ3BGLDhDQUE4QztZQUMxQyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSx3Q0FBc0IsQ0FBQyxJQUFJLEtBQUssRUFBa0IsRUFBRSxJQUFJLEtBQUssRUFBaUMsRUFBRSxJQUFJLEtBQUssRUFBcUIsQ0FBQyxDQUFBO1lBQ2xLLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLHdDQUFzQixDQUFDLElBQUksS0FBSyxFQUFpQyxFQUFFLElBQUksS0FBSyxFQUFpQyxFQUFFLElBQUksS0FBSyxFQUFpQyxDQUFDLENBQUE7WUFFN0wsSUFBSSxDQUFDLGlDQUFpQyxHQUFHLG1CQUFRLENBQUMsTUFBTSxDQUN4RDtnQkFDSSxVQUFVLEVBQUUsRUFBRTtnQkFDZCx3QkFBd0IsRUFBRSxJQUFJLENBQUMseUJBQXlCO2dCQUN4RCxzQkFBc0IsRUFBRSxJQUFJLENBQUMsdUJBQXVCO2dC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VyxHQUFHLFlBQVksQ0FBQyxXQUFXLENBQUM7aUJBQ3BEO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQsc0JBQVcsK0RBQXdCO2lCQUFuQyxVQUFvQyxVQUFnRDtnQkFDaEYsSUFBSSxDQUFDLHlCQUF5QixHQUFHLFVBQVUsQ0FBQztZQUNoRCxDQUFDOzs7V0FBQTtRQVNELHNCQUFXLDZEQUFzQjtZQVBqQzs7Ozs7O2VBTUc7aUJBQ0g7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsdUJBQXVCLENBQUM7WUFDeEMsQ0FBQztpQkFFRCxVQUFrQyxzQkFBK0M7Z0JBQzdFLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxzQkFBc0IsQ0FBQztnQkFDdEQsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7WUFDcEMsQ0FBQzs7O1dBTEE7UUFjRCxzQkFBVywyREFBb0I7WUFQL0I7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDO1lBQ3RDLENBQUM7OztXQUFBO1FBU0Qsc0JBQVcsNERBQXFCO1lBUGhDOzs7Ozs7ZUFNRztpQkFDSDtnQkFDSSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7WUFDOUIsQ0FBQzs7O1dBQUE7UUFTRCxzQkFBVyxzREFBZTtZQVAxQjs7Ozs7O2VBTUc7aUJBQ0g7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsaUNBQWlDLENBQUM7WUFDbEQsQ0FBQzs7O1dBQUE7UUFTRCxzQkFBVyxrREFBVztZQVB0Qjs7Ozs7O2VBTUc7aUJBQ0g7Z0JBQ0ksT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFDO1lBQ2xELENBQUM7OztXQUFBO1FBQ0wsZ0NBQUM7SUFBRCxDQUFDLEFBclhELElBcVhDO0lBR08sOERBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnQsIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyIH0gZnJvbSBcIi4uLy4uL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBJVHJhY2VDb21wb25lbnRDb250cm9sIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy90cmFjZUNvbnRyb2xQcm92aWRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvcHJvcGVydHlcIjtcclxuaW1wb3J0IHsgSVRyYWNlQ29tcG9uZW50UGFyYW1ldGVycyB9IGZyb20gXCIuL2ludGVyZmFjZXMvdHJhY2VDb21wb25lbnRQYXJhbWV0ZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHJhY2VDb250cm9sIH0gZnJvbSBcIi4vdHJhY2VDb250cm9sXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyIH0gZnJvbSBcIi4uL21hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFRyYWNlQ29uZmlndXJhdGlvbkRhdGEgfSBmcm9tIFwiLi90cmFjZUNvbmZpZy90cmFjZUNvbmZpZ0RhdGFcIjtcclxuaW1wb3J0IHsgVHJhY2VEYXRhUG9pbnQgfSBmcm9tIFwiLi90cmFjZURhdGFQb2ludFwiO1xyXG5pbXBvcnQgeyBUcmFjZVN0YXJ0VHJpZ2dlciB9IGZyb20gXCIuL3RyYWNlU3RhcnRUcmlnZ2VyXCI7XHJcbmltcG9ydCB7IFRyYWNlQ29uZmlndXJhdGlvbkluZm8gfSBmcm9tIFwiLi90cmFjZUNvbmZpZy90cmFjZUNvbmZpZ0luZm9cIjtcclxuaW1wb3J0IHsgVHJhY2VEYXRhUG9pbnRJbmZvIH0gZnJvbSBcIi4vdHJhY2VEYXRhUG9pbnRJbmZvXCI7XHJcbmltcG9ydCB7IENvbW1hbmQsIElDb21tYW5kRXhlY3V0aW9uRGVsZWdhdGUsIElDb21tYW5kRXhlY3V0aW9uUmVzcG9uc2VEZWxlZ2F0ZSB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvY29tbWFuZFwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8gfSBmcm9tIFwiLi4vLi4vb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50UmVmbGVjdGlvblwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRCaW5kaW5nLCBCaW5kaW5nVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvY29tcG9uZW50SHViL2JpbmRpbmdzL2NvbXBvbmVudEJpbmRpbmdcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50QmluZGluZ3MgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2NvbXBvbmVudEh1Yi9iaW5kaW5ncy9jb21wb25lbnRCaW5kaW5nc1wiO1xyXG5cclxuLyoqXHJcbiAqIFByb3ZpZGVzIGRhdGEgZm9yIGRlc2NyaWJpbmcgYSB0cmFjZSBjb21wb25lbnRcclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnRcclxuICovXHJcbmNsYXNzIE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnR7XHJcblxyXG5cclxuICAgIHByaXZhdGUgX2luaXRpYWxpemVkID0gZmFsc2U7XHJcblxyXG4gICAgLy8gUmVmZXJlbmNlcyB0aGUgZGlhZ25vc3RpYyBwcm92aWRlclxyXG4gICAgcHJpdmF0ZSBfZGlhZ25vc3RpY1Byb3ZpZGVyOiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlcjtcclxuXHJcbiAgICBwcml2YXRlIF9tYXBwQ29ja3BpdENvbXBvbmVudDogTWFwcENvY2twaXRDb21wb25lbnQ7XHJcbiAgICBwcml2YXRlIF90cmFjZUNvbXBvbmVudFBhcmFtZXRlckludGVyZmFjZTogUHJvcGVydHk8SVRyYWNlQ29tcG9uZW50UGFyYW1ldGVycz47XHJcbiAgICBwcml2YXRlIF90cmFjZUNvbnRyb2whOiBUcmFjZUNvbnRyb2w7XHJcbiAgICBcclxuICAgIC8vIEhvbGRzIHRoZSBhdmFpbGFibGUgdHJhY2UgZGF0YSBwb2ludHM7XHJcbiAgICBwcml2YXRlIF9hdmFpbGFibGVUcmFjZURhdGFQb2ludHM6IFByb3BlcnR5PEFycmF5PFRyYWNlRGF0YVBvaW50SW5mbz4+O1xyXG5cclxuICAgIC8vIEhvbGRzIHRoZSBjb21tYW5kIGZvciByZWFkaW5nIHRoZSB0cmFjZSBwYXJhbWV0ZXJzXHJcbiAgICBwcml2YXRlIF9jb21tYW5kUmVhZFRyYWNlUGFyYW1ldGVycyE6IENvbW1hbmQ8IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10sIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10+O1xyXG4gICAgLy8gSG9sZHMgdGhlIGNvbW1hbmQgZm9yIHdyaXRpbmcgdGhlIHRyYWNlIHBhcmFtZXRlcnNcclxuICAgIHByaXZhdGUgX2NvbW1hbmRXcml0ZVRyYWNlUGFyYW1ldGVycyE6IENvbW1hbmQ8IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10sIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10+O1xyXG5cclxuICAgIC8vIEhvbGRzIHRoZSBlZmZlY3RpdmUgdHJhY2UgY29uZmlndXJhdGlvbiBkYXRhXHJcbiAgICBwcml2YXRlIF90cmFjZUNvbmZpZ3VyYXRpb25EYXRhOiBUcmFjZUNvbmZpZ3VyYXRpb25EYXRhO1xyXG4gICAgLy8gdHJhY2UgY29uZmlndXJhdGlvbiBkYXRhIGluZm9ybWF0aW9uXHJcbiAgICBwcml2YXRlIF90cmFjZUNvbmZpZ3VyYXRpb25JbmZvOiBUcmFjZUNvbmZpZ3VyYXRpb25JbmZvO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihkaWFnbm9zdGljUHJvdmlkZXI6IE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyLCBtYXBwQ29ja3BpdENvbXBvbmVudDogTWFwcENvY2twaXRDb21wb25lbnQpe1xyXG4gICAgICAgIHRoaXMuX2RpYWdub3N0aWNQcm92aWRlciA9IGRpYWdub3N0aWNQcm92aWRlcjtcclxuICAgICAgICB0aGlzLl9tYXBwQ29ja3BpdENvbXBvbmVudCA9IG1hcHBDb2NrcGl0Q29tcG9uZW50O1xyXG5cclxuICAgICAgICB0aGlzLl90cmFjZUNvbnRyb2wgPSBuZXcgVHJhY2VDb250cm9sKHRoaXMuX2RpYWdub3N0aWNQcm92aWRlcik7XHJcbiAgICAgICAgdGhpcy5fYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzID0gUHJvcGVydHkuY3JlYXRlPEFycmF5PFRyYWNlRGF0YVBvaW50SW5mbz4+KFtdKTtcclxuICAgIC8vdG9kbyAgUHJvcGVydHkuY3JlYXRlIFRyYWNlQ29uZmlndXJhdGlvbkRhdGFcclxuICAgICAgICB0aGlzLl90cmFjZUNvbmZpZ3VyYXRpb25EYXRhID0gbmV3IFRyYWNlQ29uZmlndXJhdGlvbkRhdGEobmV3IEFycmF5PFRyYWNlRGF0YVBvaW50PigpLCBuZXcgQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+KCksIG5ldyBBcnJheTxUcmFjZVN0YXJ0VHJpZ2dlcj4oKSlcclxuICAgICAgICB0aGlzLl90cmFjZUNvbmZpZ3VyYXRpb25JbmZvID0gbmV3IFRyYWNlQ29uZmlndXJhdGlvbkluZm8obmV3IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPigpLCBuZXcgQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+KCksIG5ldyBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4oKSlcclxuXHJcbiAgICAgICAgdGhpcy5fdHJhY2VDb21wb25lbnRQYXJhbWV0ZXJJbnRlcmZhY2UgPSBQcm9wZXJ0eS5jcmVhdGU8SVRyYWNlQ29tcG9uZW50UGFyYW1ldGVycz4oXHJcbiAgICAgICAgeyBcclxuICAgICAgICAgICAgcGFyYW1ldGVyczogW10sIFxyXG4gICAgICAgICAgICBhdmFpbGFibGVUcmFjZURhdGFQb2ludHM6IHRoaXMuX2F2YWlsYWJsZVRyYWNlRGF0YVBvaW50cyxcclxuICAgICAgICAgICAgdHJhY2VDb25maWd1cmF0aW9uRGF0YTogdGhpcy5fdHJhY2VDb25maWd1cmF0aW9uRGF0YSxcclxuICAgICAgICAgICAgdHJhY2VDb25maWd1cmF0aW9uSW5mbzogdGhpcy5fdHJhY2VDb25maWd1cmF0aW9uSW5mbyxcclxuICAgICAgICAgICAgY29tbWFuZFJlYWQ6IHRoaXMuX2NvbW1hbmRSZWFkVHJhY2VQYXJhbWV0ZXJzLFxyXG4gICAgICAgICAgICBjb21tYW5kV3JpdGU6IHRoaXMuX2NvbW1hbmRXcml0ZVRyYWNlUGFyYW1ldGVycyxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5jcmVhdGVDb21tYW5kcygpO1xyXG4gICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jcmVhdGVDb21wb25lbnRCaW5kaW5ncygpO1xyXG4gICAgfVxyXG4gICBcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgYmluZGluZ3MgdG8gb3RoZXIgY29tcG9uZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRUcmFjZUNvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZUNvbXBvbmVudEJpbmRpbmdzKCkge1xyXG5cclxuXHJcbiAgICAgICAgY29uc3QgYmluZGluZ1RyYWNlRGF0YVBvaW50cyA9IG5ldyBDb21wb25lbnRCaW5kaW5nKCk7XHJcbiAgICAgICAgYmluZGluZ1RyYWNlRGF0YVBvaW50cy50eXBlID0gQmluZGluZ1R5cGUuREFUQVxyXG4gICAgICAgIGJpbmRpbmdUcmFjZURhdGFQb2ludHMuY29tcG9uZW50ID0gdGhpcztcclxuICAgICAgICBiaW5kaW5nVHJhY2VEYXRhUG9pbnRzLnNjb3BlID0gXCJhcHA6OnRyYWNlIGNvbmZpZ3VyYXRpb25cIjtcclxuICAgICAgICBiaW5kaW5nVHJhY2VEYXRhUG9pbnRzLmlkID0gXCJ0cmFjZSBkYXRhIHBvaW50c1wiO1xyXG4gICAgICAgIGJpbmRpbmdUcmFjZURhdGFQb2ludHMuc291cmNlS2V5ID0gXCJ1cGRhdGVUcmFjZURhdGFQb2ludHNcIjtcclxuICAgICAgICBiaW5kaW5nVHJhY2VEYXRhUG9pbnRzLnBhc3NCeVZhbHVlID0gZmFsc2U7XHJcbiAgICAgICAgQ29tcG9uZW50QmluZGluZ3MuYmluZChiaW5kaW5nVHJhY2VEYXRhUG9pbnRzKTtcclxuXHJcblxyXG5cclxuICAgICAgICBjb25zdCBiaW5kaW5nVHJhY2VTdGFydFRyaWdnZXJzID0gbmV3IENvbXBvbmVudEJpbmRpbmcoKTtcclxuICAgICAgICBiaW5kaW5nVHJhY2VTdGFydFRyaWdnZXJzLnR5cGUgPSBCaW5kaW5nVHlwZS5EQVRBXHJcbiAgICAgICAgYmluZGluZ1RyYWNlU3RhcnRUcmlnZ2Vycy5jb21wb25lbnQgPSB0aGlzO1xyXG4gICAgICAgIGJpbmRpbmdUcmFjZVN0YXJ0VHJpZ2dlcnMuc2NvcGUgPSBcImFwcDo6dHJhY2UgY29uZmlndXJhdGlvblwiO1xyXG4gICAgICAgIGJpbmRpbmdUcmFjZVN0YXJ0VHJpZ2dlcnMuaWQgPSBcInRyYWNlIHN0YXJ0IHRyaWdnZXIgaW5mb1wiO1xyXG4gICAgICAgIGJpbmRpbmdUcmFjZVN0YXJ0VHJpZ2dlcnMuc291cmNlS2V5ID0gXCJ1cGRhdGVUcmFjZVN0YXJ0VHJpZ2dlckluZm9cIjtcclxuICAgICAgICBiaW5kaW5nVHJhY2VTdGFydFRyaWdnZXJzLnBhc3NCeVZhbHVlID0gZmFsc2U7XHJcbiAgICAgICAgQ29tcG9uZW50QmluZGluZ3MuYmluZChiaW5kaW5nVHJhY2VTdGFydFRyaWdnZXJzKTtcclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgY29uc3QgYmluZGluZ1RyYWNlVGltaW5nUGFyYW1ldGVycyA9IG5ldyBDb21wb25lbnRCaW5kaW5nKCk7XHJcbiAgICAgICAgYmluZGluZ1RyYWNlVGltaW5nUGFyYW1ldGVycy50eXBlID0gQmluZGluZ1R5cGUuREFUQVxyXG4gICAgICAgIGJpbmRpbmdUcmFjZVRpbWluZ1BhcmFtZXRlcnMuY29tcG9uZW50ID0gdGhpcztcclxuICAgICAgICBiaW5kaW5nVHJhY2VUaW1pbmdQYXJhbWV0ZXJzLnNjb3BlID0gXCJhcHA6OnRyYWNlIGNvbmZpZ3VyYXRpb25cIjtcclxuICAgICAgICBiaW5kaW5nVHJhY2VUaW1pbmdQYXJhbWV0ZXJzLmlkID0gXCJ0cmFjZSB0aW1pbmcgcGFyYW1ldGVyc1wiO1xyXG4gICAgICAgIGJpbmRpbmdUcmFjZVRpbWluZ1BhcmFtZXRlcnMuc291cmNlS2V5ID0gXCJ1cGRhdGVUcmFjZVRpbWluZ1BhcmFtZXRlcnNcIjtcclxuICAgICAgICBiaW5kaW5nVHJhY2VUaW1pbmdQYXJhbWV0ZXJzLnBhc3NCeVZhbHVlID0gZmFsc2U7XHJcbiAgICAgICAgQ29tcG9uZW50QmluZGluZ3MuYmluZChiaW5kaW5nVHJhY2VUaW1pbmdQYXJhbWV0ZXJzKTtcclxuXHJcblxyXG4gICAgfVxyXG4gICBcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgZXhwb3NlZCBjb21tYW5kc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRUcmFjZUNvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZUNvbW1hbmRzKCkge1xyXG4gICAgICAgIHRoaXMuX2NvbW1hbmRSZWFkVHJhY2VQYXJhbWV0ZXJzID0gQ29tbWFuZC5jcmVhdGUodGhpcywgdGhpcy5leGVjdXRlQ29tbWFuZFJlYWRUcmFjZVBhcmFtZXRlcnMoKSk7XHJcbiAgICAgICAgdGhpcy5fY29tbWFuZFdyaXRlVHJhY2VQYXJhbWV0ZXJzID0gQ29tbWFuZC5jcmVhdGUodGhpcywgdGhpcy5leGVjdXRlQ29tbWFuZFdyaXRlVHJhY2VQYXJhbWV0ZXJzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW1wbGVtZW50cyB0aGUgY29tbWFuZCBmb3IgcmVhZGluZyB0aGUgdHJhY2UgcGFyYW1ldGVyc1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgZXhlY3V0ZUNvbW1hbmRSZWFkVHJhY2VQYXJhbWV0ZXJzKCk6IElDb21tYW5kRXhlY3V0aW9uRGVsZWdhdGU8YW55LE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10+e1xyXG4gICAgICAgIHJldHVybiAodHJhY2VQYXJhbWV0ZXJzOk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10sY29tbWFuZFJlc3BvbnNlOiBJQ29tbWFuZEV4ZWN1dGlvblJlc3BvbnNlRGVsZWdhdGU8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXT4pID0+IHtcclxuICAgICAgICAgICAgbGV0IHBhcmFtZXRlcnNUb1JlYWQgPSB0cmFjZVBhcmFtZXRlcnMgPyB0cmFjZVBhcmFtZXRlcnMgOiB0aGlzLm1hcHBDb2NrcGl0Q29tcG9uZW50LnBhcmFtZXRlcnM7XHJcbiAgICAgICAgICAgIHRoaXMuX2RpYWdub3N0aWNQcm92aWRlci5yZWFkUGFyYW1ldGVyVmFsdWVzKHBhcmFtZXRlcnNUb1JlYWQpLnRoZW4oKHVwZGF0ZWRQYXJhbWV0ZXJzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb21tYW5kUmVzcG9uc2UuZXhlY3V0ZWQodXBkYXRlZFBhcmFtZXRlcnMpO1xyXG4gICAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbW1hbmRSZXNwb25zZS5yZWplY3RlZChlcnJvcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbXBsZW1lbnRzIHRoZSBjb21tYW5kIGZvciB3cml0aW5nIHRoZSB0cmFjZSBwYXJhbWV0ZXJzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRUcmFjZUNvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBleGVjdXRlQ29tbWFuZFdyaXRlVHJhY2VQYXJhbWV0ZXJzKCk6IElDb21tYW5kRXhlY3V0aW9uRGVsZWdhdGU8YW55LE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10+e1xyXG4gICAgICAgcmV0dXJuICh0cmFjZVBhcmFtZXRlcnM6TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSxjb21tYW5kUmVzcG9uc2U6IElDb21tYW5kRXhlY3V0aW9uUmVzcG9uc2VEZWxlZ2F0ZTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdPikgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcGFyYW1ldGVyc1RvV3JpdGUgPSB0cmFjZVBhcmFtZXRlcnMgPyB0cmFjZVBhcmFtZXRlcnMgOiB0aGlzLm1hcHBDb2NrcGl0Q29tcG9uZW50LnBhcmFtZXRlcnM7XHJcbiAgICAgICAgICAgIHRoaXMuX2RpYWdub3N0aWNQcm92aWRlci53cml0ZVBhcmFtZXRlclZhbHVlcyhwYXJhbWV0ZXJzVG9Xcml0ZSkudGhlbigodXBkYXRlZFBhcmFtZXRlcnMpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbW1hbmRSZXNwb25zZS5leGVjdXRlZCh1cGRhdGVkUGFyYW1ldGVycyk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29tbWFuZFJlc3BvbnNlLnJlamVjdGVkKGVycm9yKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZSgpe1xyXG5cclxuICAgICAgICBpZih0aGlzLl9pbml0aWFsaXplZCA9PSB0cnVlKXtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGF3YWl0IHRoaXMuY29ubmVjdENvbXBvbmVudCgpO1xyXG5cclxuICAgICAgICB0aGlzLl90cmFjZUNvbnRyb2wuaW5pdGlhbGl6ZSh0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5fdHJhY2VDb25maWd1cmF0aW9uSW5mbyA9IG5ldyBUcmFjZUNvbmZpZ3VyYXRpb25JbmZvKE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mby5yZXRyaWV2ZVRyYWNlQ29uZmlndXJhdGlvbkRhdGFwb2ludHModGhpcy5tYXBwQ29ja3BpdENvbXBvbmVudC5wYXJhbWV0ZXJzKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mby5yZXRyaWV2ZVRyYWNlQ29uZmlndXJhdGlvblRpbWluZ1BhcmFtZXRlcnModGhpcy5tYXBwQ29ja3BpdENvbXBvbmVudC5wYXJhbWV0ZXJzKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8ucmV0cmlldmVUcmFjZUNvbmZpZ3VyYXRpb25UcmlnZ2VyUGFyYW1ldGVycyh0aGlzLm1hcHBDb2NrcGl0Q29tcG9uZW50LnBhcmFtZXRlcnMpKTtcclxuICAgICAgICB0aGlzLl90cmFjZUNvbmZpZ3VyYXRpb25EYXRhID0gdGhpcy5nZXRUcmFjZUNvbmZpZ3VyYXRpb25EYXRhKHRoaXMuX3RyYWNlQ29uZmlndXJhdGlvbkluZm8pO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVBhcmFtZXRlckludGVyZmFjZSgpO1xyXG5cclxuICAgICAgICB0aGlzLl9pbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlUGFyYW1ldGVySW50ZXJmYWNlKCl7XHJcbiAgICAgICAgdGhpcy5fdHJhY2VDb21wb25lbnRQYXJhbWV0ZXJJbnRlcmZhY2UudmFsdWUgPSB7XHJcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IHRoaXMubWFwcENvY2twaXRDb21wb25lbnQucGFyYW1ldGVycyxcclxuICAgICAgICAgICAgYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzOiB0aGlzLl9hdmFpbGFibGVUcmFjZURhdGFQb2ludHMsXHJcbiAgICAgICAgICAgIHRyYWNlQ29uZmlndXJhdGlvbkRhdGE6IHRoaXMuX3RyYWNlQ29uZmlndXJhdGlvbkRhdGEsXHJcbiAgICAgICAgICAgIHRyYWNlQ29uZmlndXJhdGlvbkluZm86IHRoaXMuX3RyYWNlQ29uZmlndXJhdGlvbkluZm8sXHJcbiAgICAgICAgICAgIGNvbW1hbmRSZWFkOiB0aGlzLl9jb21tYW5kUmVhZFRyYWNlUGFyYW1ldGVycyxcclxuICAgICAgICAgICAgY29tbWFuZFdyaXRlOiB0aGlzLl9jb21tYW5kV3JpdGVUcmFjZVBhcmFtZXRlcnMsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVUcmFjZVRpbWluZ1BhcmFtZXRlcnModGhpcy5fdHJhY2VDb25maWd1cmF0aW9uRGF0YS50aW1pbmdQYXJhbWV0ZXJzKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVRyYWNlRGF0YVBvaW50cyh0aGlzLl90cmFjZUNvbmZpZ3VyYXRpb25EYXRhLmRhdGFQb2ludHMpO1xyXG5cclxuICAgICAgICBjb25zdCBzdGFydFRyaWdnZXJJbmZvcyA9IHtkYXRhOnRoaXMuX3RyYWNlQ29uZmlndXJhdGlvbkRhdGEuc3RhcnRUcmlnZ2VycywgaW5mbzp0aGlzLl90cmFjZUNvbmZpZ3VyYXRpb25JbmZvLnN0YXJ0VHJpZ2dlckluZm9zfVxyXG4gICAgICAgIHRoaXMudXBkYXRlVHJhY2VTdGFydFRyaWdnZXJJbmZvKHN0YXJ0VHJpZ2dlckluZm9zKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSB0cmFjZSBzdGFydCB0cmlnZ2Vyc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1RyYWNlU3RhcnRUcmlnZ2VyW119IHN0YXJ0VHJpZ2dlcnNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlVHJhY2VTdGFydFRyaWdnZXJJbmZvKHN0YXJ0VHJpZ2dlckluZm86IHsgZGF0YTpUcmFjZVN0YXJ0VHJpZ2dlcltdICwgaW5mbzpNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSkge1xyXG4gICAgICAgIC8vIEJJTkRJTkdTT1VSQ0U6IG1ldGhvZCBzdHViIHRvIG1ha2UgdGhlIHBhc3NlZCBkYXRhIGJpbmRhYmxlXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgdHJhY2UgZGF0YSBwb2ludHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtUcmFjZURhdGFQb2ludFtdfSBkYXRhUG9pbnRzXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRUcmFjZUNvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZVRyYWNlRGF0YVBvaW50cyhkYXRhUG9pbnRzOiBUcmFjZURhdGFQb2ludFtdKSB7XHJcbiAgICAgICAgLy8gQklORElOR1NPVVJDRTogbWV0aG9kIHN0dWIgdG8gbWFrZSB0aGUgcGFzc2VkIGRhdGEgYmluZGFibGVcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSB0cmFjZSB0aW1pbmcgcGFyYW1ldGVycy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSB0aW1pbmdQYXJhbWV0ZXJzXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRUcmFjZUNvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZVRyYWNlVGltaW5nUGFyYW1ldGVycyh0aW1pbmdQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKSB7XHJcbiAgICAgICAgLy8gQklORElOR1NPVVJDRTogbWV0aG9kIHN0dWIgdG8gbWFrZSB0aGUgcGFzc2VkIGRhdGEgYmluZGFibGVcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25uZWN0cyB0aGUgdHJhY2UgY29tcG9uZW50IHRvIHRoZSB0YXJnZXQgYW5kIGJyb3dzZXMgdGhlIG1ldGhvZHMscGFyYW1ldGVyc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50fSB0cmFjZUNvbXBvbmVudFxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBjb25uZWN0Q29tcG9uZW50KCkge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuX2RpYWdub3N0aWNQcm92aWRlci5icm93c2VQYXJhbWV0ZXJzKHRoaXMuX21hcHBDb2NrcGl0Q29tcG9uZW50KTtcclxuICAgICAgICBhd2FpdCB0aGlzLl9kaWFnbm9zdGljUHJvdmlkZXIudXBkYXRlUGFyYW1ldGVyRGF0YVR5cGVzKHRoaXMuX21hcHBDb2NrcGl0Q29tcG9uZW50LnBhcmFtZXRlcnMpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuX2RpYWdub3N0aWNQcm92aWRlci5icm93c2VNZXRob2RzKHRoaXMuX21hcHBDb2NrcGl0Q29tcG9uZW50KTtcclxuICAgICAgICBhd2FpdCB0aGlzLl9kaWFnbm9zdGljUHJvdmlkZXIuYnJvd3NlTWV0aG9kUGFyYW1ldGVycyh0aGlzLl9tYXBwQ29ja3BpdENvbXBvbmVudC5tZXRob2RzKTtcclxuXHJcbiAgICAgICAgYXdhaXQgdGhpcy5fZGlhZ25vc3RpY1Byb3ZpZGVyLnJlYWRQYXJhbWV0ZXJWYWx1ZXModGhpcy5fbWFwcENvY2twaXRDb21wb25lbnQucGFyYW1ldGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRUcmFjZUNvbmZpZ3VyYXRpb25EYXRhKHRyYWNlQ29uZmlndXJhdGlvbkluZm86IFRyYWNlQ29uZmlndXJhdGlvbkluZm8pOiBUcmFjZUNvbmZpZ3VyYXRpb25EYXRhe1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGdldCBkYXRhcG9pbnRzXHJcbiAgICAgICAgbGV0IGRhdGFwb2ludHMgPSB0aGlzLmdldERhdGFQb2ludHModHJhY2VDb25maWd1cmF0aW9uSW5mby5kYXRhUG9pbnRJbmZvcyk7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gZ2V0IHRpbWluZyBwYXJhbWV0ZXJzXHJcbiAgICAgICAgbGV0IHRpbWluZ1BhcmFtZXRlcnMgPSB0cmFjZUNvbmZpZ3VyYXRpb25JbmZvLnRpbWluZ1BhcmFtZXRlckluZm9zO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGdldCBzdGFydCB0cmlnZ2VyIHBhcmFtZXRlcnNcclxuICAgICAgICBsZXQgc3RhcnRUcmlnZ2VycyA9IHRoaXMuZ2V0U3RhcnRUcmlnZ2Vycyh0cmFjZUNvbmZpZ3VyYXRpb25JbmZvLnN0YXJ0VHJpZ2dlckluZm9zKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBjcmVhdGUgdHJhY2UgY29uZmlndXJhdGlvbiBkYXRhXHJcbiAgICAgICAgcmV0dXJuIG5ldyBUcmFjZUNvbmZpZ3VyYXRpb25EYXRhKGRhdGFwb2ludHMsIHRpbWluZ1BhcmFtZXRlcnMsIHN0YXJ0VHJpZ2dlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RGF0YVBvaW50cyhkYXRhcG9pbnRQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKTogQXJyYXk8VHJhY2VEYXRhUG9pbnQ+e1xyXG4gICAgICAgIGxldCBkYXRhcG9pbnRzID0gbmV3IEFycmF5PFRyYWNlRGF0YVBvaW50PigpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBkYXRhcG9pbnQgb2YgZGF0YXBvaW50UGFyYW1ldGVycykge1xyXG4gICAgICAgICAgICBpZiAoZGF0YXBvaW50LmRpc3BsYXlWYWx1ZSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3RGF0YXBvaW50ID0gVHJhY2VEYXRhUG9pbnQuY3JlYXRlU2ltcGxlRGF0YVBvaW50KGRhdGFwb2ludC5kaXNwbGF5VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5fYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGFQb2ludEluZm8gPSB0aGlzLl9hdmFpbGFibGVUcmFjZURhdGFQb2ludHMudmFsdWUuZmlsdGVyKGVsZSA9PiB7cmV0dXJuIGVsZS5mdWxsbmFtZSA9PSBkYXRhcG9pbnQuZGlzcGxheVZhbHVlfSlbMF07XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZihkYXRhUG9pbnRJbmZvICE9IHVuZGVmaW5lZCkgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3RGF0YXBvaW50ID0gVHJhY2VEYXRhUG9pbnQuY3JlYXRlV2l0aERhdGFQb2ludEluZm8oZGF0YVBvaW50SW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGF0YXBvaW50cy5wdXNoKG5ld0RhdGFwb2ludCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRhdGFwb2ludHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRTdGFydFRyaWdnZXJzKHRyaWdnZXJQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKTogVHJhY2VTdGFydFRyaWdnZXJbXXtcclxuICAgICAgICBsZXQgc3RhcnRUcmlnZ2VycyA9IG5ldyBBcnJheTxUcmFjZVN0YXJ0VHJpZ2dlcj4oKTtcclxuICAgICAgICBmb3IobGV0IHRyaWdnZXJJbnN0YW5jZSA9IDE7IHRyaWdnZXJJbnN0YW5jZSA8IDEwOyB0cmlnZ2VySW5zdGFuY2UrKyl7IC8vIFNlYXJjaCBmb3Igc3RhcnQgdHJpZ2dlcnMgd2l0aCBhIGRlZmluZWQgZGF0YXBvaW50IG5hbWVcclxuICAgICAgICAgICAgbGV0IHRyaWdnZXJJbnN0YW5jZUlkID0gXCJTdGFydFRyaWdnZXJcIiArIHRyaWdnZXJJbnN0YW5jZSArIFwiX1wiO1xyXG4gICAgICAgICAgICBsZXQgZGF0YVBvaW50TmFtZVBhcmFtID0gdHJpZ2dlclBhcmFtZXRlcnMuZmlsdGVyKHBhcmFtID0+IHBhcmFtLmJyb3dzZU5hbWUgPT0gdHJpZ2dlckluc3RhbmNlSWQgKyBcIkRhdGFQb2ludFwiKVswXTtcclxuICAgICAgICAgICAgaWYoZGF0YVBvaW50TmFtZVBhcmFtICE9IHVuZGVmaW5lZCl7IFxyXG4gICAgICAgICAgICAgICAgaWYoZGF0YVBvaW50TmFtZVBhcmFtLnZhbHVlICE9IFwiXCIpeyAvLyBBZGQgbm8gc3RhcnR0cmlnZ2VyIGlmIGRhdGFwb2ludCBuYW1lIGlzIG5vdCBkZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0VHJpZ2dlciA9IHRoaXMuZ2V0U3RhcnRUcmlnZ2VyKGRhdGFQb2ludE5hbWVQYXJhbS52YWx1ZSwgdHJpZ2dlckluc3RhbmNlSWQsIHRyaWdnZXJQYXJhbWV0ZXJzKTtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydFRyaWdnZXJzLnB1c2goc3RhcnRUcmlnZ2VyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RhcnRUcmlnZ2VycztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFN0YXJ0VHJpZ2dlcihkYXRhUG9pbnROYW1lOiBzdHJpbmcsIGluc3RhbmNlSWQ6IHN0cmluZywgY29tcG9uZW50UGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSk6IFRyYWNlU3RhcnRUcmlnZ2VyIHtcclxuICAgICAgICBsZXQgY29uZGl0aW9uID0gXCJcIjtcclxuICAgICAgICBsZXQgY29uZGl0aW9uUGFyYW0gPSBjb21wb25lbnRQYXJhbWV0ZXJzLmZpbHRlcihwYXJhbSA9PiBwYXJhbS5icm93c2VOYW1lID09IGluc3RhbmNlSWQgKyBcIkNvbmRpdGlvblwiKVswXTtcclxuICAgICAgICBpZihjb25kaXRpb25QYXJhbSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBjb25kaXRpb24gPSBjb25kaXRpb25QYXJhbS52YWx1ZS50b1N0cmluZygpO1xyXG4gICAgICAgIH0gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIGxldCB0aHJlc2hvbGQgPSBcIlwiO1xyXG4gICAgICAgIGxldCB0aHJlc2hvbGRQYXJhbSA9IGNvbXBvbmVudFBhcmFtZXRlcnMuZmlsdGVyKHBhcmFtID0+IHBhcmFtLmJyb3dzZU5hbWUgPT0gaW5zdGFuY2VJZCArIFwiVGhyZXNob2xkXCIpWzBdO1xyXG4gICAgICAgIGlmKHRocmVzaG9sZFBhcmFtICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRocmVzaG9sZCA9IHRocmVzaG9sZFBhcmFtLmRpc3BsYXlWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRyaWdnZXJXaW5kb3cgPSBcIlwiO1xyXG4gICAgICAgIGxldCB0cmlnZ2VyUGFyYW0gPSBjb21wb25lbnRQYXJhbWV0ZXJzLmZpbHRlcihwYXJhbSA9PiBwYXJhbS5icm93c2VOYW1lID09IGluc3RhbmNlSWQgKyBcIldpbmRvd1wiKVswXTtcclxuICAgICAgICBpZih0cmlnZ2VyUGFyYW0gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdHJpZ2dlcldpbmRvdyA9IHRyaWdnZXJQYXJhbS5kaXNwbGF5VmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBuZXcgVHJhY2VTdGFydFRyaWdnZXIoY29uZGl0aW9uLCBkYXRhUG9pbnROYW1lLCB0aHJlc2hvbGQsIHRyaWdnZXJXaW5kb3cpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgdXBkYXRlRGF0YVBvaW50SW5mb3JtYXRpb25zKHRyYWNlQ29uZmlndXJhdGlvbkRhdGE6IFRyYWNlQ29uZmlndXJhdGlvbkRhdGEpe1xyXG4gICAgICAgIHRyYWNlQ29uZmlndXJhdGlvbkRhdGEuZGF0YVBvaW50cy5mb3JFYWNoKGRhdGFwb2ludCA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhUG9pbnRJbmZvID0gdGhpcy5fYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzLnZhbHVlLmZpbHRlcihlbGUgPT4ge3JldHVybiBlbGUuZnVsbG5hbWUgPT0gZGF0YXBvaW50LmRhdGFQb2ludE5hbWV9KVswXTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKGRhdGFQb2ludEluZm8gIT0gdW5kZWZpbmVkKSAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5ld0RhdGFwb2ludCA9IFRyYWNlRGF0YVBvaW50LmNyZWF0ZVdpdGhEYXRhUG9pbnRJbmZvKGRhdGFQb2ludEluZm8pO1xyXG4gICAgICAgICAgICAgICAgZGF0YXBvaW50LmNvbXBvbmVudE5hbWUgPSBuZXdEYXRhcG9pbnQuY29tcG9uZW50TmFtZTtcclxuICAgICAgICAgICAgICAgIGRhdGFwb2ludC5uYW1lID0gbmV3RGF0YXBvaW50Lm5hbWU7XHJcbiAgICAgICAgICAgICAgICBkYXRhcG9pbnQuZGVzY3JpcHRpb24gPSBuZXdEYXRhcG9pbnQuZGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGF2YWlsYWJsZVRyYWNlRGF0YVBvaW50cyhkYXRhUG9pbnRzIDogUHJvcGVydHk8QXJyYXk8VHJhY2VEYXRhUG9pbnRJbmZvPj4pIHtcclxuICAgICAgICB0aGlzLl9hdmFpbGFibGVUcmFjZURhdGFQb2ludHMgPSBkYXRhUG9pbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cmFjZUNvbmZpZ3VyYXRpb25EYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7SW50ZXJmYWNlVHJhY2VEYXRhfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB0cmFjZUNvbmZpZ3VyYXRpb25EYXRhKCk6IFRyYWNlQ29uZmlndXJhdGlvbkRhdGEge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90cmFjZUNvbmZpZ3VyYXRpb25EYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgdHJhY2VDb25maWd1cmF0aW9uRGF0YSh0cmFjZUNvbmZpZ3VyYXRpb25EYXRhIDogVHJhY2VDb25maWd1cmF0aW9uRGF0YSkge1xyXG4gICAgICAgIHRoaXMuX3RyYWNlQ29uZmlndXJhdGlvbkRhdGEgPSB0cmFjZUNvbmZpZ3VyYXRpb25EYXRhO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUGFyYW1ldGVySW50ZXJmYWNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBNYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge01hcHBDb2NrcGl0Q29tcG9uZW50fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBtYXBwQ29ja3BpdENvbXBvbmVudCgpOiBNYXBwQ29ja3BpdENvbXBvbmVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcHBDb2NrcGl0Q29tcG9uZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgVHJhY2VDb250cm9sSW50ZXJmYWNlXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7SVRyYWNlQ29tcG9uZW50Q29udHJvbH1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgdHJhY2VDb250cm9sSW50ZXJmYWNlKCk6IElUcmFjZUNvbXBvbmVudENvbnRyb2wge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90cmFjZUNvbnRyb2w7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBQcm9wZXJ0eTxJVHJhY2VDb21wb25lbnRQYXJhbWV0ZXJzPlxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge1Byb3BlcnR5PElUcmFjZUNvbXBvbmVudFBhcmFtZXRlcnM+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB0cmFjZVBhcmFtZXRlcnMoKTogUHJvcGVydHk8SVRyYWNlQ29tcG9uZW50UGFyYW1ldGVycz4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90cmFjZUNvbXBvbmVudFBhcmFtZXRlckludGVyZmFjZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIERpc3BsYXlOYW1lXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7UHJvcGVydHk8SVRyYWNlQ29tcG9uZW50UGFyYW1ldGVycz59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRUcmFjZUNvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGRpc3BsYXlOYW1lKCkgOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXBwQ29ja3BpdENvbXBvbmVudC5kaXNwbGF5TmFtZTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCB7TWFwcENvY2twaXRUcmFjZUNvbXBvbmVudH0iXX0=