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
define(["require", "exports", "./cmGroup", "../dataModelBase", "../dataModelInterface", "../online/mappCockpitComponent", "../online/mappCockpitComponentReflection", "../online/mappCockpitComponentService"], function (require, exports, cmGroup_1, dataModelBase_1, dataModelInterface_1, mappCockpitComponent_1, mappCockpitComponentReflection_1, mappCockpitComponentService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ConfigManagerDataModel = /** @class */ (function (_super) {
        __extends(ConfigManagerDataModel, _super);
        function ConfigManagerDataModel() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * Holds the service channel
             *
             * @private
             * @type {(MappCockpitComponentService | null)}
             * @memberof ConfigManagerDataModel
             */
            _this._serviceChannel = null;
            // holds the actual connected component
            _this._actualComponent = undefined;
            /**
             * DataModel changed handler
             *
             * @private
             * @memberof ConfigManagerDataModel
             */
            _this._dataModelChangedHandler = function (sender, eventArgs) { _this.handleModelChanged(sender, eventArgs); };
            /**
             * Holds the info if the datamodel is currently in edit mode
             *
             * @private
             * @type {boolean}
             * @memberof ConfigManagerDataModel
             */
            _this._editModeActive = false;
            return _this;
        }
        /**
         * Initialize the configmanager datamodel
         *
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.initialize = function () {
            // watch the data model for change events
            this.eventModelChanged.attach(this._dataModelChangedHandler);
            _super.prototype.initialize.call(this);
        };
        /**
         * Initialize the component
         *
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.initializeComponent = function () {
            this.component.disablePersisting();
        };
        /**
         * Dispose the configmanager datamodel
         *
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.dispose = function () {
            this.eventModelChanged.detach(this._dataModelChangedHandler);
        };
        Object.defineProperty(ConfigManagerDataModel.prototype, "configurationParameters", {
            /**
             * Sets the configurationparameters as the data source for the configuration manager datamodel
             *
             * @memberof ConfigManagerDataModel
             */
            set: function (configurationParameters) {
                var componentParameters = configurationParameters.value;
                if (componentParameters.length > 0) {
                    this.onComponentParametersUpdated(componentParameters);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigManagerDataModel.prototype, "componentParameters", {
            /**
             * Returns the parameters of the component which is used in this datamodel
             *
             * @readonly
             * @type {(MappCockpitComponentParameter[]|undefined)}
             * @memberof ConfigManagerDataModel
             */
            get: function () {
                return this._componentParameters;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Handle component parameters update
         *
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.onComponentParametersUpdated = function (componentParameters) {
            // filter the configuration parameters and update the parameter values
            if (componentParameters.length != 0 && componentParameters[0] != undefined) {
                this._componentParameters = componentParameters;
                this._actualComponent = this.getComponentFromParameters();
                if (this._actualComponent != undefined) {
                    this._data = this.createDataModelData(this._actualComponent);
                    // observe the service channel
                    this.connectServiceChannel(this._actualComponent);
                }
                this.observeConfigParameters(componentParameters);
                this.onModelChanged(this, new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, "componentParametersUpdated", this));
            }
        };
        /**
         * Connects to the service channel for calling service methods (...bulk write) and observing service notifications
         *
         * @private
         * @param {MappCockpitComponent} component
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.connectServiceChannel = function (component) {
            if (component.serviceChannel) {
                // connect and preserve the service channel
                this._serviceChannel = component.serviceChannel;
                // observe the service notification
                this.observeParameterSetWriteResponse(component);
            }
        };
        /**
           * handles the component parameter update.
           *
           * @param {MappCockpitComponentDataModel} sender
           * @param {EventModelChangedArgs} eventArgs
           * @memberof ConfigManagerDataModel
           */
        ConfigManagerDataModel.prototype.handleEventComponentParametersUpdated = function (sender, eventArgs) {
            var componentParameters = eventArgs.data;
            if (componentParameters) {
                var configParameters = mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.retrieveConfigurationParameters(componentParameters);
                if (configParameters.length > 0) {
                    this._componentParameters = configParameters;
                    var component = this.getComponentFromParameters();
                    if (component != undefined) {
                        this._data = this.createDataModelData(component);
                    }
                }
                this.onModelChanged(this, new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, "componentParametersUpdated", this));
            }
        };
        /**
         * Returns the configuration structure metaInfo for the given component
         *
         * @private
         * @param {MappCockpitComponent} component
         * @returns {*} metaInfo object from the component
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.getMetaInfoFromComponent = function (component) {
            var compMetaData = component.metaData;
            if (compMetaData != undefined) {
                return compMetaData.MetaConfigConfigProps;
            }
            return undefined;
        };
        /**
         * handles model changes
         *
         * @param {IDataModel} sender
         * @param {EventModelChangedArgs} eventArgs
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.handleModelChanged = function (sender, eventArgs) {
            // external model changes with change type "updateSource" have to be forwarded (written) to the source
            if (eventArgs.caller !== this && eventArgs.changeType === dataModelInterface_1.ModelChangeType.updateSource) {
                console.log("handleModelChanged (%o) : %o", this, eventArgs);
                var modifiedComponentParameter = eventArgs.hint.changedItemData.componentParameter;
                // modify parameter value
                this.modifyParameter(modifiedComponentParameter, eventArgs.hint.newItemData);
            }
        };
        /**
         * Modifies the specified parameter value
         *
         * @param {MappCockpitComponentParameter} modifiedParameter
         * @param {*} newItemData
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.modifyParameter = function (modifiedParameter, value) {
            // preserve the modified value ...
            modifiedParameter.modifiedDisplayValue = value;
        };
        /**
         * Applies the modified parameter set
         *
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.applyModifiedParameters = function () {
            var _this = this;
            // get the modified parameters
            var modifiedParameters = this.getModifiedParameters();
            // exit on no parameters to modify or the component not defined
            if (modifiedParameters.length > 0) {
                // get the component holding the parameters
                var component = modifiedParameters[0].component;
                if (component && component.serviceChannel) {
                    // invoke writing the parameter set
                    (function (component) { return __awaiter(_this, void 0, void 0, function () {
                        var success;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, component.serviceChannel.writeParameterSet(modifiedParameters)];
                                case 1:
                                    success = _a.sent();
                                    if (success) {
                                        // the request has been invoked successfully ....-> wait for  and handle response event
                                        console.log("Parameter write pending ...: %0 ", modifiedParameters);
                                    }
                                    else {
                                        // the request could not be invoked successfully ... -> handle request failure
                                        console.log("Could not write parameters: %0 ", modifiedParameters);
                                        this.setParametersTransferFailed(modifiedParameters);
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); })(component);
                }
            }
        };
        /**
         * Sets all the given parameters to transferFailed
         *
         * @private
         * @param {MappCockpitComponentParameter[]} modifiedParameters
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.setParametersTransferFailed = function (modifiedParameters) {
            modifiedParameters.forEach(function (modifiedParameters) {
                modifiedParameters.transferFailed = true;
            });
            // Update transfer failed icon in the view 
            this.onModelChanged(this, new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, "componentParametersUpdated", this));
        };
        /**
         * Returns the modified parameters
         *
         * @private
         * @returns {Array<MappCockpitComponentParameter>}
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.getModifiedParameters = function () {
            var _this = this;
            var modifiedParameters = new Array();
            this.componentParameters.forEach(function (parameter) {
                if (parameter.modifiedValue != undefined) {
                    var isFiltered = _this.isParameterFiltered(parameter, _this._data);
                    if (isFiltered == false) {
                        // Add parameter only to modified parameter list if parameter is not filtered(not shown in config manager)
                        modifiedParameters.push(parameter);
                    }
                }
            });
            return modifiedParameters;
        };
        /**
         * Returns true if this component parameter is used within a filtered configManager parameter
         *
         * @private
         * @param {MappCockpitComponentParameter} componentParameter
         * @param {Array<ICmParameter>} parameters
         * @returns {boolean}
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.isParameterFiltered = function (componentParameter, parameters) {
            for (var i = 0; i <= parameters.length; i++) {
                var parameter = parameters[i];
                if (parameter != undefined) {
                    if (parameter.componentParameter == componentParameter) {
                        if (parameter.filter != undefined) {
                            if (parameter.filter.active == true) {
                                return true;
                            }
                        }
                    }
                    else if (parameter instanceof cmGroup_1.CmGroup) {
                        var filtered = this.isParameterFiltered(componentParameter, parameter.childs);
                        if (filtered == true) {
                            return true;
                        }
                    }
                }
            }
            return false;
        };
        /**
         * Discards user edited parameter modifications
         *
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.discardModifications = function () {
            // clear modifications 
            this.clearModifiedParameters();
        };
        /**
         * Sets the edit mode and updates the datamodel
         *
         * @param {boolean} active
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.setEditModeActive = function (active) {
            this._editModeActive = active;
            var component = this.getComponentFromParameters();
            if (component != undefined) {
                this._data = this.createDataModelData(component);
                this.updateFiltersInDataModel();
            }
        };
        /**
         * Returns the component of the given component parameters(first parameter)
         *
         * @private
         * @returns {(MappCockpitComponentItem|undefined)}
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.getComponentFromParameters = function () {
            if (this.componentParameters != undefined) {
                if (this.componentParameters.length > 0) {
                    var component = this.componentParameters[0].component;
                    if (component != null) {
                        return component;
                    }
                }
            }
            return undefined;
        };
        /**
         * Marks the parameters with a flag that the parameter value was not transfered
         *
         * @private
         * @param {(Array<ComponentServiceResponseDataChangedParameter>|undefined)} [failedParameters=undefined]
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.setTransferFailedParameters = function (failedParameters) {
            this.componentParameters.forEach(function (parameter) {
                var foundParam = failedParameters.find(function (param) { return param.key == parameter.browseName; });
                if (foundParam != undefined) {
                    parameter.transferFailed = true;
                }
            });
        };
        /**
         * Clears the modified parameters
         *
         * @private
         * @param {(Array<ComponentServiceResponseDataChangedParameter>|undefined)} [parametersToClear=undefined]
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.clearModifiedParameters = function (parametersToClear) {
            if (parametersToClear === void 0) { parametersToClear = undefined; }
            this.componentParameters.forEach(function (parameter) {
                if (parametersToClear == undefined) {
                    parameter.modifiedValue = undefined;
                    parameter.transferFailed = false;
                }
                else {
                    var paramFound = parametersToClear.find(function (param) { return param.key == parameter.browseName; });
                    if (paramFound != undefined) {
                        parameter.modifiedValue = undefined;
                        parameter.transferFailed = false;
                    }
                }
            });
            this.updateFiltersInDataModel();
        };
        /**
         * Updates all filters and raises the model changed event
         *
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.updateFiltersInDataModel = function () {
            this.updateFilterState();
            // Update modified value (modified icon) in the view 
            this.onModelChanged(this, new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, "componentParametersUpdated", this));
        };
        /**
         * Creates the datamodel data for the given metaInformation
         *
         * @private
         * @param {*} metaInformation
         * @returns {Array<ICmGroup>}
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.createDataModelData = function (component) {
            var _this = this;
            var metaInformation = this.getMetaInfoFromComponent(component);
            var metaInformationDataModel = new Array();
            if (metaInformation.ConfigurationStructure != null) {
                if (metaInformation.ConfigurationStructure.Childs != null) {
                    metaInformation.ConfigurationStructure.Childs.forEach(function (element) {
                        metaInformationDataModel.push(new cmGroup_1.CmGroup(element.Group, _this.componentParameters, _this._editModeActive));
                    });
                }
            }
            return metaInformationDataModel;
        };
        /**
         * Updates all filters of the given cmParameters(or the whole datamodel if undefined)if they are active or not for there corresponding values
         *
         * @param {(ICmParameter[]|undefined)} [cmParameters=undefined]
         * @returns
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.updateFilterState = function (cmParameters) {
            var _this = this;
            if (cmParameters === void 0) { cmParameters = undefined; }
            if (cmParameters == undefined) {
                cmParameters = this._data;
            }
            if (cmParameters == undefined) {
                return;
            }
            cmParameters.forEach(function (element) {
                if (element instanceof cmGroup_1.CmGroup) {
                    if (element.filter != null) {
                        _this.updateFilter(element.filter, element.editModeActive);
                    }
                    if (element.childs != null) {
                        _this.updateFilterState(element.childs);
                    }
                }
                else {
                    if (element.filter != null) {
                        _this.updateFilter(element.filter, element.editModeActive);
                    }
                }
            });
        };
        /**
         * Updates the info, if the filter is active for the given parameter with the given value
         *
         * @private
         * @param {ICmFilter} filter
         * @param {boolean} editModeActive
         * @returns
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.updateFilter = function (filter, editModeActive) {
            filter.active = false;
            if (filter.parameterRef == "" && filter.parameterValue == undefined && filter.parameterValues == undefined) {
                return; // No filter defined
            }
            var paramValue = this.getParameterValueFromSource(filter.parameterRef, editModeActive);
            if (paramValue == undefined) {
                filter.active = true;
                return;
            }
            if (filter.parameterValue != undefined) {
                // Check single parameterValue filter
                if (paramValue != filter.parameterValue) {
                    filter.active = true;
                }
            }
            else if (filter.parameterValues != undefined) {
                // Check multiple parameterValue filter
                filter.active = true;
                filter.parameterValues.forEach(function (filterParamValue) {
                    if (filterParamValue == paramValue) {
                        filter.active = false;
                    }
                });
            }
        };
        /**
         * Returns the value/modified value for the given parameter reference name
         *
         * @private
         * @param {string} parameterRef
         * @param {boolean} editModeActive
         * @returns {(string | undefined)}
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.getParameterValueFromSource = function (parameterRef, editModeActive) {
            if (this.componentParameters == undefined) {
                return undefined;
            }
            for (var _i = 0, _a = this.componentParameters; _i < _a.length; _i++) {
                var parameter = _a[_i];
                if (parameter.browseName == parameterRef) {
                    var value = parameter.modifiedValue;
                    if (editModeActive == false) {
                        value = parameter.value; // Use value instead of modifiedValue if editMode is not active
                    }
                    if (value == undefined) {
                        value = parameter.value; // Use value if no modified value is defined
                    }
                    return value;
                }
            }
            return undefined;
        };
        /**
         * Observes the config parameters for changes
         *
         * @param {MappCockpitComponentParameter[]} observableParmeters
         * @returns {*}
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.observeConfigParameters = function (observableParmeters) {
            // observe component write access
            this.observeComponentWriteAccess(observableParmeters);
            // add the service channl parameter to the observables
            var serviceChannelInfoParameter = this._serviceChannel && this._serviceChannel && this._serviceChannel.infoChannel ? this._serviceChannel.infoChannel : null;
            if (serviceChannelInfoParameter) {
                observableParmeters.push(serviceChannelInfoParameter);
            }
            // invoke observing the config parameters
            mappCockpitComponent_1.MappCockpitComponentParameter.observeParameterValueChanges(this, observableParmeters);
        };
        /**
         * Observes the component reply channel for the purpose of receiving the response for parameter set write requests.
         *
         * @private
         * @param {MappCockpitComponent} component
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.observeParameterSetWriteResponse = function (component) {
            var _this = this;
            // get the components reply channel parameter ...
            var serviceChannelInfoParameter = this._serviceChannel && this._serviceChannel && this._serviceChannel.infoChannel ? this._serviceChannel.infoChannel : null;
            // ...and observe the info channel parameter
            if (serviceChannelInfoParameter) {
                // listen to the response notifications
                serviceChannelInfoParameter.valueSource.changed(function (infoChannelData) {
                    _this.handleParameterSetWriteResponse(infoChannelData);
                });
            }
        };
        /**
       * Handles the notification in response to parameter set write requests.
       *
       * @private
       * @param {*} responseData
       * @memberof ConfigManagerDataModel
       */
        ConfigManagerDataModel.prototype.handleParameterSetWriteResponse = function (serviceInfoData) {
            if (serviceInfoData) {
                try {
                    var serviceResponseData = JSON.parse(serviceInfoData);
                    // process the service response 
                    switch (serviceResponseData.eventType) {
                        case mappCockpitComponentService_1.ComponentServiceRequestType.changeParameterSet:
                            this.handleServiceResponseChangeParameterSet(serviceResponseData);
                            break;
                        default:
                            break;
                    }
                }
                catch (error) {
                    console.error(error);
                }
            }
        };
        /**
         * Handles the service response for parameter set changed.
         *
         * @private
         * @param {ServiceResponseChangeParameters} serviceResponseData
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.handleServiceResponseChangeParameterSet = function (serviceResponseData) {
            var _a;
            // the response id needs to match the request id to make sure that the result corresponds to the request!
            if ((_a = this._serviceChannel) === null || _a === void 0 ? void 0 : _a.requestIsPending(serviceResponseData.requestID)) {
                // rejected parameters need to be indicated as erroneous. 
                var rejectedParameters = serviceResponseData.eventData.rejected ? serviceResponseData.eventData.rejected : [];
                this.setTransferFailedParameters(rejectedParameters);
                // applied parameters are considered as no longer modified. Thus the corresponding modified parameters ( or state ) need to be removed
                var appliedParameters = serviceResponseData.eventData.applied ? serviceResponseData.eventData.applied : [];
                this.clearModifiedParameters(appliedParameters);
                // now we can clear the matching pending request.
                this._serviceChannel.clearPendingRequest(serviceResponseData.requestID);
            }
        };
        /**
         * handles observable changes
         *
         * @param {Observable[]} changedObservables
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.onObservablesChanged = function (changedObservables) {
            console.log("onObservablesChanged: %o %o", this, changedObservables);
            this.updateFiltersInDataModel();
        };
        /**
         * Observes if the component changes the write access
         *
         * @param {MappCockpitComponentParameter[]} configParameters
         * @returns {*}
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.observeComponentWriteAccess = function (configParameters) {
            var _this = this;
            // we use a single parameter to get the parent component and observe changes of the write acces value.
            configParameters[0].component.writeAccess.changed(function (writeAccess) {
                // invoke common model changed processing triggered by write access change.
                _this.onModelChanged(_this, new dataModelInterface_1.EventModelChangedArgs(_this, dataModelInterface_1.ModelChangeType.updateTarget, "componentParametersUpdated", _this));
                // invoke specific write access changed changed processing.
                _this.onModelChanged(_this, new dataModelInterface_1.EventModelChangedArgs(_this, dataModelInterface_1.ModelChangeType.updateTarget, "writeAccessChanged", writeAccess));
            });
        };
        return ConfigManagerDataModel;
    }(dataModelBase_1.DataModelBase));
    exports.ConfigManagerDataModel = ConfigManagerDataModel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnTWFuYWdlckRhdGFNb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbmZpZ01hbmFnZXJEYXRhTW9kZWwvY29uZmlnTWFuYWdlckRhdGFNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBY0E7UUFBNEMsMENBQWE7UUFBekQ7WUFBQSxxRUE0b0JDO1lBMW9CQzs7Ozs7O2VBTUc7WUFDSyxxQkFBZSxHQUF1QyxJQUFJLENBQUM7WUFXbkUsdUNBQXVDO1lBQy9CLHNCQUFnQixHQUFtQyxTQUFTLENBQUM7WUFFckU7Ozs7O2VBS0c7WUFDSyw4QkFBd0IsR0FBRyxVQUFDLE1BQU0sRUFBRSxTQUFTLElBQU8sS0FBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQztZQUV6Rzs7Ozs7O2VBTUc7WUFDSyxxQkFBZSxHQUFZLEtBQUssQ0FBQzs7UUFzbUIzQyxDQUFDO1FBcG1CQzs7OztXQUlHO1FBQ0gsMkNBQVUsR0FBVjtZQUNFLHlDQUF5QztZQUN6QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBRTdELGlCQUFNLFVBQVUsV0FBRSxDQUFDO1FBQ3JCLENBQUM7UUFFRDs7OztXQUlHO1FBQ0gsb0RBQW1CLEdBQW5CO1lBQ0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3JDLENBQUM7UUFFRDs7OztXQUlHO1FBQ0gsd0NBQU8sR0FBUDtZQUNFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFFL0QsQ0FBQztRQU9ELHNCQUFXLDJEQUF1QjtZQUxsQzs7OztlQUlHO2lCQUNI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QzNELEtBQUksQ0FBQyxjQUFjLENBQUMsS0FBSSxFQUFFLElBQUksMENBQXFCLENBQUMsS0FBSSxFQUFFLG9DQUFlLENBQUMsWUFBWSxFQUFFLG9CQUFvQixFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDOUgsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBQ0gsNkJBQUM7SUFBRCxDQUFDLEFBNW9CRCxDQUE0Qyw2QkFBYSxHQTRvQnhEO0lBNW9CWSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ21Hcm91cCB9IGZyb20gXCIuL2ludGVyZmFjZXMvY21Hcm91cEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDbUdyb3VwIH0gZnJvbSBcIi4vY21Hcm91cFwiO1xyXG5pbXBvcnQgeyBJQ21GaWx0ZXIgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2NtRmlsdGVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElDbVBhcmFtZXRlciB9IGZyb20gXCIuL2ludGVyZmFjZXMvY21QYXJhbWV0ZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgRGF0YU1vZGVsQmFzZSB9IGZyb20gXCIuLi9kYXRhTW9kZWxCYXNlXCI7XHJcbmltcG9ydCB7IElDb25maWdNYW5hZ2VyRGF0YU1vZGVsIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9jb25maWdNYW5hZ2VyRGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsIH0gZnJvbSBcIi4uL29ubGluZS9jb21wb25lbnRzRGF0YU1vZGVsXCI7XHJcbmltcG9ydCB7IEV2ZW50TW9kZWxDaGFuZ2VkQXJncywgTW9kZWxDaGFuZ2VUeXBlLCBJRGF0YU1vZGVsIH0gZnJvbSBcIi4uL2RhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlciwgTWFwcENvY2twaXRDb21wb25lbnQsIE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbSB9IGZyb20gXCIuLi9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvIH0gZnJvbSBcIi4uL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFJlZmxlY3Rpb25cIjtcclxuaW1wb3J0IHsgUHJvcGVydHkgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL3Byb3BlcnR5XCI7XHJcbmltcG9ydCB7IElPYnNlcnZlciwgT2JzZXJ2YWJsZSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvaW50ZXJmYWNlcy9vYnNlcnZlclwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudFNlcnZpY2UsIENvbXBvbmVudFNlcnZpY2VSZXF1ZXN0VHlwZSwgU2VydmljZVJlc3BvbnNlQ2hhbmdlUGFyYW1ldGVycywgQ29tcG9uZW50U2VydmljZVJlc3BvbnNlRGF0YUNoYW5nZWRQYXJhbWV0ZXIgfSBmcm9tIFwiLi4vb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50U2VydmljZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbmZpZ01hbmFnZXJEYXRhTW9kZWwgZXh0ZW5kcyBEYXRhTW9kZWxCYXNlIGltcGxlbWVudHMgSUNvbmZpZ01hbmFnZXJEYXRhTW9kZWwsIElPYnNlcnZlciB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEhvbGRzIHRoZSBzZXJ2aWNlIGNoYW5uZWxcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogQHR5cGUgeyhNYXBwQ29ja3BpdENvbXBvbmVudFNlcnZpY2UgfCBudWxsKX1cclxuICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3NlcnZpY2VDaGFubmVsOiBNYXBwQ29ja3BpdENvbXBvbmVudFNlcnZpY2UgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgLyoqXHJcbiAgICogSG9sZHMgdGhlIHBhcmFtZXRlcnMgb2YgdGhlIHVzZWQgY29tcG9uZW50IGluIHRoaXMgZGF0YW1vZGVsXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIEB0eXBlIHsoQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+fHVuZGVmaW5lZCl9XHJcbiAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBwcml2YXRlIF9jb21wb25lbnRQYXJhbWV0ZXJzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj58dW5kZWZpbmVkO1xyXG5cclxuICAvLyBob2xkcyB0aGUgYWN0dWFsIGNvbm5lY3RlZCBjb21wb25lbnRcclxuICBwcml2YXRlIF9hY3R1YWxDb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50fHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICBcclxuICAvKipcclxuICAgKiBEYXRhTW9kZWwgY2hhbmdlZCBoYW5kbGVyXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZGF0YU1vZGVsQ2hhbmdlZEhhbmRsZXIgPSAoc2VuZGVyLCBldmVudEFyZ3MpID0+IHsgdGhpcy5oYW5kbGVNb2RlbENoYW5nZWQoc2VuZGVyLCBldmVudEFyZ3MpIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEhvbGRzIHRoZSBpbmZvIGlmIHRoZSBkYXRhbW9kZWwgaXMgY3VycmVudGx5IGluIGVkaXQgbW9kZVxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2VkaXRNb2RlQWN0aXZlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemUgdGhlIGNvbmZpZ21hbmFnZXIgZGF0YW1vZGVsXHJcbiAgICpcclxuICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIGluaXRpYWxpemUoKSB7XHJcbiAgICAvLyB3YXRjaCB0aGUgZGF0YSBtb2RlbCBmb3IgY2hhbmdlIGV2ZW50c1xyXG4gICAgdGhpcy5ldmVudE1vZGVsQ2hhbmdlZC5hdHRhY2godGhpcy5fZGF0YU1vZGVsQ2hhbmdlZEhhbmRsZXIpO1xyXG5cclxuICAgIHN1cGVyLmluaXRpYWxpemUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemUgdGhlIGNvbXBvbmVudFxyXG4gICAqXHJcbiAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBpbml0aWFsaXplQ29tcG9uZW50KCkge1xyXG4gICAgdGhpcy5jb21wb25lbnQuZGlzYWJsZVBlcnNpc3RpbmcoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERpc3Bvc2UgdGhlIGNvbmZpZ21hbmFnZXIgZGF0YW1vZGVsXHJcbiAgICpcclxuICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIGRpc3Bvc2UoKSB7XHJcbiAgICB0aGlzLmV2ZW50TW9kZWxDaGFuZ2VkLmRldGFjaCh0aGlzLl9kYXRhTW9kZWxDaGFuZ2VkSGFuZGxlcik7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgY29uZmlndXJhdGlvbnBhcmFtZXRlcnMgYXMgdGhlIGRhdGEgc291cmNlIGZvciB0aGUgY29uZmlndXJhdGlvbiBtYW5hZ2VyIGRhdGFtb2RlbFxyXG4gICAqXHJcbiAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBwdWJsaWMgc2V0IGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzKGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzOiBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4+KSB7XHJcbiAgICBsZXQgY29tcG9uZW50UGFyYW1ldGVycyA9IGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzLnZhbHVlO1xyXG4gICAgaWYgKGNvbXBvbmVudFBhcmFtZXRlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICB0aGlzLm9uQ29tcG9uZW50UGFyYW1ldGVyc1VwZGF0ZWQoY29tcG9uZW50UGFyYW1ldGVycyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBwYXJhbWV0ZXJzIG9mIHRoZSBjb21wb25lbnQgd2hpY2ggaXMgdXNlZCBpbiB0aGlzIGRhdGFtb2RlbFxyXG4gICAqXHJcbiAgICogQHJlYWRvbmx5XHJcbiAgICogQHR5cGUgeyhNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfHVuZGVmaW5lZCl9XHJcbiAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0IGNvbXBvbmVudFBhcmFtZXRlcnMoKTogIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW118dW5kZWZpbmVke1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbXBvbmVudFBhcmFtZXRlcnM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGUgY29tcG9uZW50IHBhcmFtZXRlcnMgdXBkYXRlXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IGNvbXBvbmVudFBhcmFtZXRlcnNcclxuICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIG9uQ29tcG9uZW50UGFyYW1ldGVyc1VwZGF0ZWQoY29tcG9uZW50UGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSkge1xyXG4gICAgLy8gZmlsdGVyIHRoZSBjb25maWd1cmF0aW9uIHBhcmFtZXRlcnMgYW5kIHVwZGF0ZSB0aGUgcGFyYW1ldGVyIHZhbHVlc1xyXG4gICAgaWYgKGNvbXBvbmVudFBhcmFtZXRlcnMubGVuZ3RoICE9IDAgJiYgY29tcG9uZW50UGFyYW1ldGVyc1swXSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5fY29tcG9uZW50UGFyYW1ldGVycyA9IGNvbXBvbmVudFBhcmFtZXRlcnM7XHJcbiAgICAgIHRoaXMuX2FjdHVhbENvbXBvbmVudCA9IHRoaXMuZ2V0Q29tcG9uZW50RnJvbVBhcmFtZXRlcnMoKTtcclxuICAgICAgaWYodGhpcy5fYWN0dWFsQ29tcG9uZW50ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IHRoaXMuY3JlYXRlRGF0YU1vZGVsRGF0YSh0aGlzLl9hY3R1YWxDb21wb25lbnQpO1xyXG5cclxuICAgICAgICAvLyBvYnNlcnZlIHRoZSBzZXJ2aWNlIGNoYW5uZWxcclxuICAgICAgICB0aGlzLmNvbm5lY3RTZXJ2aWNlQ2hhbm5lbCh0aGlzLl9hY3R1YWxDb21wb25lbnQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLm9ic2VydmVDb25maWdQYXJhbWV0ZXJzKGNvbXBvbmVudFBhcmFtZXRlcnMpO1xyXG5cclxuICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBuZXcgRXZlbnRNb2RlbENoYW5nZWRBcmdzKHRoaXMsIE1vZGVsQ2hhbmdlVHlwZS51cGRhdGVUYXJnZXQsIFwiY29tcG9uZW50UGFyYW1ldGVyc1VwZGF0ZWRcIiwgdGhpcykpO1xyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICAvKipcclxuICAgKiBDb25uZWN0cyB0byB0aGUgc2VydmljZSBjaGFubmVsIGZvciBjYWxsaW5nIHNlcnZpY2UgbWV0aG9kcyAoLi4uYnVsayB3cml0ZSkgYW5kIG9ic2VydmluZyBzZXJ2aWNlIG5vdGlmaWNhdGlvbnNcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudH0gY29tcG9uZW50XHJcbiAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBwcml2YXRlIGNvbm5lY3RTZXJ2aWNlQ2hhbm5lbChjb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50KSB7XHJcbiAgICBpZiAoY29tcG9uZW50LnNlcnZpY2VDaGFubmVsKSB7XHJcblxyXG4gICAgICAvLyBjb25uZWN0IGFuZCBwcmVzZXJ2ZSB0aGUgc2VydmljZSBjaGFubmVsXHJcbiAgICAgIHRoaXMuX3NlcnZpY2VDaGFubmVsID0gY29tcG9uZW50LnNlcnZpY2VDaGFubmVsO1xyXG5cclxuICAgICAgLy8gb2JzZXJ2ZSB0aGUgc2VydmljZSBub3RpZmljYXRpb25cclxuICAgICAgIHRoaXMub2JzZXJ2ZVBhcmFtZXRlclNldFdyaXRlUmVzcG9uc2UoY29tcG9uZW50KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAgICogaGFuZGxlcyB0aGUgY29tcG9uZW50IHBhcmFtZXRlciB1cGRhdGUuIFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWx9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHtFdmVudE1vZGVsQ2hhbmdlZEFyZ3N9IGV2ZW50QXJnc1xyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgICAqL1xyXG4gIGhhbmRsZUV2ZW50Q29tcG9uZW50UGFyYW1ldGVyc1VwZGF0ZWQoc2VuZGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbCwgZXZlbnRBcmdzOiBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MpIHtcclxuICAgIGxldCBjb21wb25lbnRQYXJhbWV0ZXJzID0gZXZlbnRBcmdzLmRhdGEgYXMgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXTtcclxuICAgIGlmIChjb21wb25lbnRQYXJhbWV0ZXJzKSB7XHJcbiAgICAgIGxldCBjb25maWdQYXJhbWV0ZXJzID0gTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLnJldHJpZXZlQ29uZmlndXJhdGlvblBhcmFtZXRlcnMoY29tcG9uZW50UGFyYW1ldGVycyk7XHJcbiAgICAgIGlmIChjb25maWdQYXJhbWV0ZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB0aGlzLl9jb21wb25lbnRQYXJhbWV0ZXJzID0gY29uZmlnUGFyYW1ldGVycztcclxuXHJcbiAgICAgICAgbGV0IGNvbXBvbmVudCA9IHRoaXMuZ2V0Q29tcG9uZW50RnJvbVBhcmFtZXRlcnMoKTtcclxuICAgICAgICBpZihjb21wb25lbnQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgIHRoaXMuX2RhdGEgPSB0aGlzLmNyZWF0ZURhdGFNb2RlbERhdGEoY29tcG9uZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcywgbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBcImNvbXBvbmVudFBhcmFtZXRlcnNVcGRhdGVkXCIsIHRoaXMpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIGNvbmZpZ3VyYXRpb24gc3RydWN0dXJlIG1ldGFJbmZvIGZvciB0aGUgZ2l2ZW4gY29tcG9uZW50XHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnR9IGNvbXBvbmVudFxyXG4gICAqIEByZXR1cm5zIHsqfSBtZXRhSW5mbyBvYmplY3QgZnJvbSB0aGUgY29tcG9uZW50XHJcbiAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBwcml2YXRlIGdldE1ldGFJbmZvRnJvbUNvbXBvbmVudChjb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50KTogYW55e1xyXG4gICAgbGV0IGNvbXBNZXRhRGF0YSA9IGNvbXBvbmVudC5tZXRhRGF0YTtcclxuICAgIGlmKGNvbXBNZXRhRGF0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICByZXR1cm4gKDxhbnk+Y29tcE1ldGFEYXRhKS5NZXRhQ29uZmlnQ29uZmlnUHJvcHM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogaGFuZGxlcyBtb2RlbCBjaGFuZ2VzXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0lEYXRhTW9kZWx9IHNlbmRlclxyXG4gICAqIEBwYXJhbSB7RXZlbnRNb2RlbENoYW5nZWRBcmdzfSBldmVudEFyZ3NcclxuICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIGhhbmRsZU1vZGVsQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGV2ZW50QXJnczogRXZlbnRNb2RlbENoYW5nZWRBcmdzKSB7XHJcbiAgICAvLyBleHRlcm5hbCBtb2RlbCBjaGFuZ2VzIHdpdGggY2hhbmdlIHR5cGUgXCJ1cGRhdGVTb3VyY2VcIiBoYXZlIHRvIGJlIGZvcndhcmRlZCAod3JpdHRlbikgdG8gdGhlIHNvdXJjZVxyXG4gICAgaWYgKGV2ZW50QXJncy5jYWxsZXIgIT09IHRoaXMgJiYgZXZlbnRBcmdzLmNoYW5nZVR5cGUgPT09IE1vZGVsQ2hhbmdlVHlwZS51cGRhdGVTb3VyY2UpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJoYW5kbGVNb2RlbENoYW5nZWQgKCVvKSA6ICVvXCIsIHRoaXMsIGV2ZW50QXJncyk7XHJcblxyXG4gICAgICBsZXQgbW9kaWZpZWRDb21wb25lbnRQYXJhbWV0ZXIgPSBldmVudEFyZ3MuaGludC5jaGFuZ2VkSXRlbURhdGEuY29tcG9uZW50UGFyYW1ldGVyIGFzIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyO1xyXG5cclxuICAgICAgLy8gbW9kaWZ5IHBhcmFtZXRlciB2YWx1ZVxyXG4gICAgICB0aGlzLm1vZGlmeVBhcmFtZXRlcihtb2RpZmllZENvbXBvbmVudFBhcmFtZXRlciwgZXZlbnRBcmdzLmhpbnQubmV3SXRlbURhdGEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTW9kaWZpZXMgdGhlIHNwZWNpZmllZCBwYXJhbWV0ZXIgdmFsdWVcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJ9IG1vZGlmaWVkUGFyYW1ldGVyXHJcbiAgICogQHBhcmFtIHsqfSBuZXdJdGVtRGF0YVxyXG4gICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgcHVibGljIG1vZGlmeVBhcmFtZXRlcihtb2RpZmllZFBhcmFtZXRlcjogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIsIHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIC8vIHByZXNlcnZlIHRoZSBtb2RpZmllZCB2YWx1ZSAuLi5cclxuICAgIG1vZGlmaWVkUGFyYW1ldGVyLm1vZGlmaWVkRGlzcGxheVZhbHVlID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBcHBsaWVzIHRoZSBtb2RpZmllZCBwYXJhbWV0ZXIgc2V0XHJcbiAgICpcclxuICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIHB1YmxpYyBhcHBseU1vZGlmaWVkUGFyYW1ldGVycygpIHtcclxuICAgIC8vIGdldCB0aGUgbW9kaWZpZWQgcGFyYW1ldGVyc1xyXG4gICAgbGV0IG1vZGlmaWVkUGFyYW1ldGVycyA9IHRoaXMuZ2V0TW9kaWZpZWRQYXJhbWV0ZXJzKCk7XHJcblxyXG4gICAgLy8gZXhpdCBvbiBubyBwYXJhbWV0ZXJzIHRvIG1vZGlmeSBvciB0aGUgY29tcG9uZW50IG5vdCBkZWZpbmVkXHJcbiAgICBpZiAobW9kaWZpZWRQYXJhbWV0ZXJzLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgIC8vIGdldCB0aGUgY29tcG9uZW50IGhvbGRpbmcgdGhlIHBhcmFtZXRlcnNcclxuICAgICAgY29uc3QgY29tcG9uZW50ID0gbW9kaWZpZWRQYXJhbWV0ZXJzWzBdLmNvbXBvbmVudCBhcyBNYXBwQ29ja3BpdENvbXBvbmVudDtcclxuXHJcbiAgICAgIGlmIChjb21wb25lbnQgJiYgY29tcG9uZW50LnNlcnZpY2VDaGFubmVsKSB7XHJcblxyXG4gICAgICAgIC8vIGludm9rZSB3cml0aW5nIHRoZSBwYXJhbWV0ZXIgc2V0XHJcbiAgICAgICAgKGFzeW5jIChjb21wb25lbnQpID0+IHtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgY29uc3Qgc3VjY2VzcyA9IGF3YWl0IGNvbXBvbmVudCEuc2VydmljZUNoYW5uZWwhLndyaXRlUGFyYW1ldGVyU2V0KG1vZGlmaWVkUGFyYW1ldGVycyk7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIGlmIChzdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgLy8gdGhlIHJlcXVlc3QgaGFzIGJlZW4gaW52b2tlZCBzdWNjZXNzZnVsbHkgLi4uLi0+IHdhaXQgZm9yICBhbmQgaGFuZGxlIHJlc3BvbnNlIGV2ZW50XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQYXJhbWV0ZXIgd3JpdGUgcGVuZGluZyAuLi46ICUwIFwiLG1vZGlmaWVkUGFyYW1ldGVycyk7XHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAvLyB0aGUgcmVxdWVzdCBjb3VsZCBub3QgYmUgaW52b2tlZCBzdWNjZXNzZnVsbHkgLi4uIC0+IGhhbmRsZSByZXF1ZXN0IGZhaWx1cmVcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvdWxkIG5vdCB3cml0ZSBwYXJhbWV0ZXJzOiAlMCBcIixtb2RpZmllZFBhcmFtZXRlcnMpO1xyXG4gICAgICAgICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyc1RyYW5zZmVyRmFpbGVkKG1vZGlmaWVkUGFyYW1ldGVycyk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pKGNvbXBvbmVudCk7XHJcblxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIGFsbCB0aGUgZ2l2ZW4gcGFyYW1ldGVycyB0byB0cmFuc2ZlckZhaWxlZFxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IG1vZGlmaWVkUGFyYW1ldGVyc1xyXG4gICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzZXRQYXJhbWV0ZXJzVHJhbnNmZXJGYWlsZWQobW9kaWZpZWRQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKXtcclxuICAgIG1vZGlmaWVkUGFyYW1ldGVycy5mb3JFYWNoKG1vZGlmaWVkUGFyYW1ldGVycyA9PiB7XHJcbiAgICAgIG1vZGlmaWVkUGFyYW1ldGVycy50cmFuc2ZlckZhaWxlZCA9IHRydWU7XHJcbiAgICB9KTtcclxuICAgIC8vIFVwZGF0ZSB0cmFuc2ZlciBmYWlsZWQgaWNvbiBpbiB0aGUgdmlldyBcclxuICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcywgbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBcImNvbXBvbmVudFBhcmFtZXRlcnNVcGRhdGVkXCIsIHRoaXMpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIG1vZGlmaWVkIHBhcmFtZXRlcnNcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogQHJldHVybnMge0FycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPn1cclxuICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0TW9kaWZpZWRQYXJhbWV0ZXJzKCk6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPntcclxuICAgICAgY29uc3QgbW9kaWZpZWRQYXJhbWV0ZXJzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4gPSBuZXcgQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+KCk7XHJcbiAgICAgIHRoaXMuY29tcG9uZW50UGFyYW1ldGVycyEuZm9yRWFjaChwYXJhbWV0ZXIgPT4ge1xyXG4gICAgICAgIGlmKHBhcmFtZXRlci5tb2RpZmllZFZhbHVlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICBsZXQgaXNGaWx0ZXJlZCA9IHRoaXMuaXNQYXJhbWV0ZXJGaWx0ZXJlZChwYXJhbWV0ZXIsIHRoaXMuX2RhdGEpO1xyXG4gICAgICAgICAgaWYoaXNGaWx0ZXJlZCA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgIC8vIEFkZCBwYXJhbWV0ZXIgb25seSB0byBtb2RpZmllZCBwYXJhbWV0ZXIgbGlzdCBpZiBwYXJhbWV0ZXIgaXMgbm90IGZpbHRlcmVkKG5vdCBzaG93biBpbiBjb25maWcgbWFuYWdlcilcclxuICAgICAgICAgICAgbW9kaWZpZWRQYXJhbWV0ZXJzLnB1c2gocGFyYW1ldGVyKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gbW9kaWZpZWRQYXJhbWV0ZXJzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMgY29tcG9uZW50IHBhcmFtZXRlciBpcyB1c2VkIHdpdGhpbiBhIGZpbHRlcmVkIGNvbmZpZ01hbmFnZXIgcGFyYW1ldGVyXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJ9IGNvbXBvbmVudFBhcmFtZXRlclxyXG4gICAqIEBwYXJhbSB7QXJyYXk8SUNtUGFyYW1ldGVyPn0gcGFyYW1ldGVyc1xyXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBpc1BhcmFtZXRlckZpbHRlcmVkKGNvbXBvbmVudFBhcmFtZXRlcjogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIsIHBhcmFtZXRlcnM6IEFycmF5PElDbVBhcmFtZXRlcj4pOiBib29sZWFuIHtcclxuICAgIGZvcihsZXQgaSA9MDsgaSA8PSBwYXJhbWV0ZXJzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgbGV0IHBhcmFtZXRlciA9IHBhcmFtZXRlcnNbaV07XHJcbiAgICAgIGlmKHBhcmFtZXRlciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgIGlmKHBhcmFtZXRlci5jb21wb25lbnRQYXJhbWV0ZXIgPT0gY29tcG9uZW50UGFyYW1ldGVyKXtcclxuICAgICAgICAgIGlmKHBhcmFtZXRlci5maWx0ZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYocGFyYW1ldGVyLmZpbHRlci5hY3RpdmUgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihwYXJhbWV0ZXIgaW5zdGFuY2VvZiBDbUdyb3VwKXtcclxuICAgICAgICAgIGxldCBmaWx0ZXJlZCA9IHRoaXMuaXNQYXJhbWV0ZXJGaWx0ZXJlZChjb21wb25lbnRQYXJhbWV0ZXIsIHBhcmFtZXRlci5jaGlsZHMpO1xyXG4gICAgICAgICAgaWYoZmlsdGVyZWQgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGlzY2FyZHMgdXNlciBlZGl0ZWQgcGFyYW1ldGVyIG1vZGlmaWNhdGlvbnNcclxuICAgKlxyXG4gICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgcHVibGljIGRpc2NhcmRNb2RpZmljYXRpb25zKCkge1xyXG4gICAgLy8gY2xlYXIgbW9kaWZpY2F0aW9ucyBcclxuICAgIHRoaXMuY2xlYXJNb2RpZmllZFBhcmFtZXRlcnMoKTtcclxuICB9XHJcblxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgZWRpdCBtb2RlIGFuZCB1cGRhdGVzIHRoZSBkYXRhbW9kZWxcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gYWN0aXZlXHJcbiAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBwdWJsaWMgc2V0RWRpdE1vZGVBY3RpdmUoYWN0aXZlOiBib29sZWFuKXtcclxuICAgIHRoaXMuX2VkaXRNb2RlQWN0aXZlID0gYWN0aXZlO1xyXG4gICAgbGV0IGNvbXBvbmVudCA9IHRoaXMuZ2V0Q29tcG9uZW50RnJvbVBhcmFtZXRlcnMoKTtcclxuICAgIGlmKGNvbXBvbmVudCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICB0aGlzLl9kYXRhID0gdGhpcy5jcmVhdGVEYXRhTW9kZWxEYXRhKGNvbXBvbmVudCk7XHJcbiAgICAgIHRoaXMudXBkYXRlRmlsdGVyc0luRGF0YU1vZGVsKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBjb21wb25lbnQgb2YgdGhlIGdpdmVuIGNvbXBvbmVudCBwYXJhbWV0ZXJzKGZpcnN0IHBhcmFtZXRlcilcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogQHJldHVybnMgeyhNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW18dW5kZWZpbmVkKX1cclxuICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0Q29tcG9uZW50RnJvbVBhcmFtZXRlcnMoKTogTWFwcENvY2twaXRDb21wb25lbnR8dW5kZWZpbmVke1xyXG4gICAgaWYodGhpcy5jb21wb25lbnRQYXJhbWV0ZXJzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgIGlmKHRoaXMuY29tcG9uZW50UGFyYW1ldGVycy5sZW5ndGggPiAwKXtcclxuICAgICAgICBsZXQgY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRQYXJhbWV0ZXJzWzBdLmNvbXBvbmVudCBhcyBNYXBwQ29ja3BpdENvbXBvbmVudDtcclxuICAgICAgICBpZiAoY29tcG9uZW50ICE9IG51bGwpe1xyXG4gICAgICAgICAgcmV0dXJuIGNvbXBvbmVudDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNYXJrcyB0aGUgcGFyYW1ldGVycyB3aXRoIGEgZmxhZyB0aGF0IHRoZSBwYXJhbWV0ZXIgdmFsdWUgd2FzIG5vdCB0cmFuc2ZlcmVkXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIEBwYXJhbSB7KEFycmF5PENvbXBvbmVudFNlcnZpY2VSZXNwb25zZURhdGFDaGFuZ2VkUGFyYW1ldGVyPnx1bmRlZmluZWQpfSBbZmFpbGVkUGFyYW1ldGVycz11bmRlZmluZWRdXHJcbiAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBwcml2YXRlIHNldFRyYW5zZmVyRmFpbGVkUGFyYW1ldGVycyhmYWlsZWRQYXJhbWV0ZXJzOiBBcnJheTxDb21wb25lbnRTZXJ2aWNlUmVzcG9uc2VEYXRhQ2hhbmdlZFBhcmFtZXRlcj4pe1xyXG4gICAgdGhpcy5jb21wb25lbnRQYXJhbWV0ZXJzIS5mb3JFYWNoKHBhcmFtZXRlciA9PiB7XHJcbiAgICAgICAgbGV0IGZvdW5kUGFyYW0gPSBmYWlsZWRQYXJhbWV0ZXJzLmZpbmQocGFyYW0gPT4gcGFyYW0ua2V5ID09IHBhcmFtZXRlci5icm93c2VOYW1lKTtcclxuICAgICAgICBpZihmb3VuZFBhcmFtICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICBwYXJhbWV0ZXIudHJhbnNmZXJGYWlsZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXJzIHRoZSBtb2RpZmllZCBwYXJhbWV0ZXJzXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIEBwYXJhbSB7KEFycmF5PENvbXBvbmVudFNlcnZpY2VSZXNwb25zZURhdGFDaGFuZ2VkUGFyYW1ldGVyPnx1bmRlZmluZWQpfSBbcGFyYW1ldGVyc1RvQ2xlYXI9dW5kZWZpbmVkXVxyXG4gICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjbGVhck1vZGlmaWVkUGFyYW1ldGVycyhwYXJhbWV0ZXJzVG9DbGVhcjogQXJyYXk8Q29tcG9uZW50U2VydmljZVJlc3BvbnNlRGF0YUNoYW5nZWRQYXJhbWV0ZXI+fHVuZGVmaW5lZCA9IHVuZGVmaW5lZCkge1xyXG4gICAgdGhpcy5jb21wb25lbnRQYXJhbWV0ZXJzIS5mb3JFYWNoKHBhcmFtZXRlciA9PiB7XHJcbiAgICAgIGlmKHBhcmFtZXRlcnNUb0NsZWFyID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgcGFyYW1ldGVyLm1vZGlmaWVkVmFsdWUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgcGFyYW1ldGVyLnRyYW5zZmVyRmFpbGVkID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZXtcclxuICAgICAgICBsZXQgcGFyYW1Gb3VuZCA9IHBhcmFtZXRlcnNUb0NsZWFyLmZpbmQocGFyYW0gPT4gcGFyYW0ua2V5ID09IHBhcmFtZXRlci5icm93c2VOYW1lKTtcclxuICAgICAgICBpZihwYXJhbUZvdW5kICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICBwYXJhbWV0ZXIubW9kaWZpZWRWYWx1ZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgIHBhcmFtZXRlci50cmFuc2ZlckZhaWxlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy51cGRhdGVGaWx0ZXJzSW5EYXRhTW9kZWwoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZXMgYWxsIGZpbHRlcnMgYW5kIHJhaXNlcyB0aGUgbW9kZWwgY2hhbmdlZCBldmVudFxyXG4gICAqXHJcbiAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBwdWJsaWMgdXBkYXRlRmlsdGVyc0luRGF0YU1vZGVsKCkge1xyXG4gICAgdGhpcy51cGRhdGVGaWx0ZXJTdGF0ZSgpO1xyXG4gICAgLy8gVXBkYXRlIG1vZGlmaWVkIHZhbHVlIChtb2RpZmllZCBpY29uKSBpbiB0aGUgdmlldyBcclxuICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcywgbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBcImNvbXBvbmVudFBhcmFtZXRlcnNVcGRhdGVkXCIsIHRoaXMpKTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIHRoZSBkYXRhbW9kZWwgZGF0YSBmb3IgdGhlIGdpdmVuIG1ldGFJbmZvcm1hdGlvblxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBAcGFyYW0geyp9IG1ldGFJbmZvcm1hdGlvblxyXG4gICAqIEByZXR1cm5zIHtBcnJheTxJQ21Hcm91cD59XHJcbiAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBwcml2YXRlIGNyZWF0ZURhdGFNb2RlbERhdGEoY29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudCk6IEFycmF5PElDbUdyb3VwPiB7XHJcbiAgICBsZXQgbWV0YUluZm9ybWF0aW9uID0gdGhpcy5nZXRNZXRhSW5mb0Zyb21Db21wb25lbnQoY29tcG9uZW50KTtcclxuICAgIGxldCBtZXRhSW5mb3JtYXRpb25EYXRhTW9kZWwgPSBuZXcgQXJyYXk8SUNtR3JvdXA+KCk7XHJcbiAgICBpZiAobWV0YUluZm9ybWF0aW9uLkNvbmZpZ3VyYXRpb25TdHJ1Y3R1cmUgIT0gbnVsbCkge1xyXG4gICAgICBpZiAobWV0YUluZm9ybWF0aW9uLkNvbmZpZ3VyYXRpb25TdHJ1Y3R1cmUuQ2hpbGRzICE9IG51bGwpIHtcclxuICAgICAgICBtZXRhSW5mb3JtYXRpb24uQ29uZmlndXJhdGlvblN0cnVjdHVyZS5DaGlsZHMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgIG1ldGFJbmZvcm1hdGlvbkRhdGFNb2RlbC5wdXNoKG5ldyBDbUdyb3VwKGVsZW1lbnQuR3JvdXAsIHRoaXMuY29tcG9uZW50UGFyYW1ldGVycywgdGhpcy5fZWRpdE1vZGVBY3RpdmUpKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWV0YUluZm9ybWF0aW9uRGF0YU1vZGVsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlcyBhbGwgZmlsdGVycyBvZiB0aGUgZ2l2ZW4gY21QYXJhbWV0ZXJzKG9yIHRoZSB3aG9sZSBkYXRhbW9kZWwgaWYgdW5kZWZpbmVkKWlmIHRoZXkgYXJlIGFjdGl2ZSBvciBub3QgZm9yIHRoZXJlIGNvcnJlc3BvbmRpbmcgdmFsdWVzXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyhJQ21QYXJhbWV0ZXJbXXx1bmRlZmluZWQpfSBbY21QYXJhbWV0ZXJzPXVuZGVmaW5lZF1cclxuICAgKiBAcmV0dXJuc1xyXG4gICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgcHVibGljIHVwZGF0ZUZpbHRlclN0YXRlKGNtUGFyYW1ldGVyczogSUNtUGFyYW1ldGVyW118dW5kZWZpbmVkID0gdW5kZWZpbmVkKSB7XHJcbiAgICBpZihjbVBhcmFtZXRlcnMgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgY21QYXJhbWV0ZXJzID0gdGhpcy5fZGF0YTtcclxuICAgIH1cclxuICAgIGlmKGNtUGFyYW1ldGVycyA9PSB1bmRlZmluZWQpe1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjbVBhcmFtZXRlcnMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBDbUdyb3VwKSB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQuZmlsdGVyICE9IG51bGwpIHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlRmlsdGVyKGVsZW1lbnQuZmlsdGVyLCBlbGVtZW50LmVkaXRNb2RlQWN0aXZlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGVsZW1lbnQuY2hpbGRzICE9IG51bGwpIHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlRmlsdGVyU3RhdGUoZWxlbWVudC5jaGlsZHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICBpZiAoZWxlbWVudC5maWx0ZXIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVGaWx0ZXIoZWxlbWVudC5maWx0ZXIsIGVsZW1lbnQuZWRpdE1vZGVBY3RpdmUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGVzIHRoZSBpbmZvLCBpZiB0aGUgZmlsdGVyIGlzIGFjdGl2ZSBmb3IgdGhlIGdpdmVuIHBhcmFtZXRlciB3aXRoIHRoZSBnaXZlbiB2YWx1ZVxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBAcGFyYW0ge0lDbUZpbHRlcn0gZmlsdGVyXHJcbiAgICogQHBhcmFtIHtib29sZWFufSBlZGl0TW9kZUFjdGl2ZVxyXG4gICAqIEByZXR1cm5zXHJcbiAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBwcml2YXRlIHVwZGF0ZUZpbHRlcihmaWx0ZXI6IElDbUZpbHRlciwgZWRpdE1vZGVBY3RpdmU6IGJvb2xlYW4pIHtcclxuICAgIGZpbHRlci5hY3RpdmUgPSBmYWxzZTtcclxuICAgIGlmIChmaWx0ZXIucGFyYW1ldGVyUmVmID09IFwiXCIgJiYgZmlsdGVyLnBhcmFtZXRlclZhbHVlID09IHVuZGVmaW5lZCAmJiBmaWx0ZXIucGFyYW1ldGVyVmFsdWVzID09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm47IC8vIE5vIGZpbHRlciBkZWZpbmVkXHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHBhcmFtVmFsdWUgPSB0aGlzLmdldFBhcmFtZXRlclZhbHVlRnJvbVNvdXJjZShmaWx0ZXIucGFyYW1ldGVyUmVmLCBlZGl0TW9kZUFjdGl2ZSk7XHJcbiAgICBpZiAocGFyYW1WYWx1ZSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgZmlsdGVyLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChmaWx0ZXIucGFyYW1ldGVyVmFsdWUgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIC8vIENoZWNrIHNpbmdsZSBwYXJhbWV0ZXJWYWx1ZSBmaWx0ZXJcclxuICAgICAgaWYgKHBhcmFtVmFsdWUgIT0gZmlsdGVyLnBhcmFtZXRlclZhbHVlKSB7XHJcbiAgICAgICAgZmlsdGVyLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGZpbHRlci5wYXJhbWV0ZXJWYWx1ZXMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIC8vIENoZWNrIG11bHRpcGxlIHBhcmFtZXRlclZhbHVlIGZpbHRlclxyXG4gICAgICBmaWx0ZXIuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgZmlsdGVyLnBhcmFtZXRlclZhbHVlcy5mb3JFYWNoKGZpbHRlclBhcmFtVmFsdWUgPT4ge1xyXG4gICAgICAgIGlmIChmaWx0ZXJQYXJhbVZhbHVlID09IHBhcmFtVmFsdWUpIHtcclxuICAgICAgICAgIGZpbHRlci5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgdmFsdWUvbW9kaWZpZWQgdmFsdWUgZm9yIHRoZSBnaXZlbiBwYXJhbWV0ZXIgcmVmZXJlbmNlIG5hbWVcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhcmFtZXRlclJlZlxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gZWRpdE1vZGVBY3RpdmVcclxuICAgKiBAcmV0dXJucyB7KHN0cmluZyB8IHVuZGVmaW5lZCl9XHJcbiAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBwcml2YXRlIGdldFBhcmFtZXRlclZhbHVlRnJvbVNvdXJjZShwYXJhbWV0ZXJSZWY6IHN0cmluZywgZWRpdE1vZGVBY3RpdmU6IGJvb2xlYW4pOiBzdHJpbmcgfCB1bmRlZmluZWQge1xyXG4gICAgaWYgKHRoaXMuY29tcG9uZW50UGFyYW1ldGVycyA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBwYXJhbWV0ZXIgb2YgdGhpcy5jb21wb25lbnRQYXJhbWV0ZXJzKSB7XHJcbiAgICAgIGlmIChwYXJhbWV0ZXIuYnJvd3NlTmFtZSA9PSBwYXJhbWV0ZXJSZWYpe1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IHBhcmFtZXRlci5tb2RpZmllZFZhbHVlO1xyXG4gICAgICAgIGlmKGVkaXRNb2RlQWN0aXZlID09IGZhbHNlKXtcclxuICAgICAgICAgIHZhbHVlID0gcGFyYW1ldGVyLnZhbHVlOyAvLyBVc2UgdmFsdWUgaW5zdGVhZCBvZiBtb2RpZmllZFZhbHVlIGlmIGVkaXRNb2RlIGlzIG5vdCBhY3RpdmVcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodmFsdWUgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgIHZhbHVlID0gcGFyYW1ldGVyLnZhbHVlOyAvLyBVc2UgdmFsdWUgaWYgbm8gbW9kaWZpZWQgdmFsdWUgaXMgZGVmaW5lZFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZlcyB0aGUgY29uZmlnIHBhcmFtZXRlcnMgZm9yIGNoYW5nZXNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gb2JzZXJ2YWJsZVBhcm1ldGVyc1xyXG4gICAqIEByZXR1cm5zIHsqfVxyXG4gICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgb2JzZXJ2ZUNvbmZpZ1BhcmFtZXRlcnMob2JzZXJ2YWJsZVBhcm1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSk6IGFueSB7XHJcbiAgICAvLyBvYnNlcnZlIGNvbXBvbmVudCB3cml0ZSBhY2Nlc3NcclxuICAgIHRoaXMub2JzZXJ2ZUNvbXBvbmVudFdyaXRlQWNjZXNzKG9ic2VydmFibGVQYXJtZXRlcnMpO1xyXG5cclxuICAgIC8vIGFkZCB0aGUgc2VydmljZSBjaGFubmwgcGFyYW1ldGVyIHRvIHRoZSBvYnNlcnZhYmxlc1xyXG4gICAgY29uc3Qgc2VydmljZUNoYW5uZWxJbmZvUGFyYW1ldGVyID0gdGhpcy5fc2VydmljZUNoYW5uZWwgJiYgdGhpcy5fc2VydmljZUNoYW5uZWwgJiYgdGhpcy5fc2VydmljZUNoYW5uZWwuaW5mb0NoYW5uZWwgPyAgdGhpcy5fc2VydmljZUNoYW5uZWwuaW5mb0NoYW5uZWwgOiBudWxsIDtcclxuICAgIGlmIChzZXJ2aWNlQ2hhbm5lbEluZm9QYXJhbWV0ZXIpIHtcclxuICAgICAgb2JzZXJ2YWJsZVBhcm1ldGVycy5wdXNoKHNlcnZpY2VDaGFubmVsSW5mb1BhcmFtZXRlcik7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAvLyBpbnZva2Ugb2JzZXJ2aW5nIHRoZSBjb25maWcgcGFyYW1ldGVyc1xyXG4gICAgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIub2JzZXJ2ZVBhcmFtZXRlclZhbHVlQ2hhbmdlcyh0aGlzLCBvYnNlcnZhYmxlUGFybWV0ZXJzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmVzIHRoZSBjb21wb25lbnQgcmVwbHkgY2hhbm5lbCBmb3IgdGhlIHB1cnBvc2Ugb2YgcmVjZWl2aW5nIHRoZSByZXNwb25zZSBmb3IgcGFyYW1ldGVyIHNldCB3cml0ZSByZXF1ZXN0cy5cclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudH0gY29tcG9uZW50XHJcbiAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBwcml2YXRlIG9ic2VydmVQYXJhbWV0ZXJTZXRXcml0ZVJlc3BvbnNlKGNvbXBvbmVudDogTWFwcENvY2twaXRDb21wb25lbnQpIHtcclxuXHJcbiAgICAvLyBnZXQgdGhlIGNvbXBvbmVudHMgcmVwbHkgY2hhbm5lbCBwYXJhbWV0ZXIgLi4uXHJcbiAgICBjb25zdCBzZXJ2aWNlQ2hhbm5lbEluZm9QYXJhbWV0ZXIgPSB0aGlzLl9zZXJ2aWNlQ2hhbm5lbCAmJiB0aGlzLl9zZXJ2aWNlQ2hhbm5lbCAmJiB0aGlzLl9zZXJ2aWNlQ2hhbm5lbC5pbmZvQ2hhbm5lbCA/ICB0aGlzLl9zZXJ2aWNlQ2hhbm5lbC5pbmZvQ2hhbm5lbCA6IG51bGwgO1xyXG5cclxuICAgIC8vIC4uLmFuZCBvYnNlcnZlIHRoZSBpbmZvIGNoYW5uZWwgcGFyYW1ldGVyXHJcbiAgICBpZiAoc2VydmljZUNoYW5uZWxJbmZvUGFyYW1ldGVyKSB7XHJcblxyXG4gICAgICAvLyBsaXN0ZW4gdG8gdGhlIHJlc3BvbnNlIG5vdGlmaWNhdGlvbnNcclxuICAgICAgc2VydmljZUNoYW5uZWxJbmZvUGFyYW1ldGVyLnZhbHVlU291cmNlLmNoYW5nZWQoKGluZm9DaGFubmVsRGF0YSkgPT4ge1xyXG4gICAgICAgIHRoaXMuaGFuZGxlUGFyYW1ldGVyU2V0V3JpdGVSZXNwb25zZShpbmZvQ2hhbm5lbERhdGEpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICogSGFuZGxlcyB0aGUgbm90aWZpY2F0aW9uIGluIHJlc3BvbnNlIHRvIHBhcmFtZXRlciBzZXQgd3JpdGUgcmVxdWVzdHMuXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIEBwYXJhbSB7Kn0gcmVzcG9uc2VEYXRhXHJcbiAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICAgICBwcml2YXRlIGhhbmRsZVBhcmFtZXRlclNldFdyaXRlUmVzcG9uc2Uoc2VydmljZUluZm9EYXRhOiBhbnkpIHtcclxuICAgICAgaWYgKHNlcnZpY2VJbmZvRGF0YSkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBjb25zdCBzZXJ2aWNlUmVzcG9uc2VEYXRhID0gSlNPTi5wYXJzZShzZXJ2aWNlSW5mb0RhdGEpIGFzIFNlcnZpY2VSZXNwb25zZUNoYW5nZVBhcmFtZXRlcnM7XHJcbiAgICAgICAgICAvLyBwcm9jZXNzIHRoZSBzZXJ2aWNlIHJlc3BvbnNlIFxyXG4gICAgICAgICAgc3dpdGNoIChzZXJ2aWNlUmVzcG9uc2VEYXRhLmV2ZW50VHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIENvbXBvbmVudFNlcnZpY2VSZXF1ZXN0VHlwZS5jaGFuZ2VQYXJhbWV0ZXJTZXQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVNlcnZpY2VSZXNwb25zZUNoYW5nZVBhcmFtZXRlclNldChzZXJ2aWNlUmVzcG9uc2VEYXRhKTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH0gIFxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBcclxuICAvKipcclxuICAgKiBIYW5kbGVzIHRoZSBzZXJ2aWNlIHJlc3BvbnNlIGZvciBwYXJhbWV0ZXIgc2V0IGNoYW5nZWQuXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIEBwYXJhbSB7U2VydmljZVJlc3BvbnNlQ2hhbmdlUGFyYW1ldGVyc30gc2VydmljZVJlc3BvbnNlRGF0YVxyXG4gICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBoYW5kbGVTZXJ2aWNlUmVzcG9uc2VDaGFuZ2VQYXJhbWV0ZXJTZXQoc2VydmljZVJlc3BvbnNlRGF0YTogU2VydmljZVJlc3BvbnNlQ2hhbmdlUGFyYW1ldGVycykge1xyXG5cclxuICAgICAgLy8gdGhlIHJlc3BvbnNlIGlkIG5lZWRzIHRvIG1hdGNoIHRoZSByZXF1ZXN0IGlkIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSByZXN1bHQgY29ycmVzcG9uZHMgdG8gdGhlIHJlcXVlc3QhXHJcbiAgICAgIGlmICh0aGlzLl9zZXJ2aWNlQ2hhbm5lbD8ucmVxdWVzdElzUGVuZGluZyhzZXJ2aWNlUmVzcG9uc2VEYXRhLnJlcXVlc3RJRCkpIHtcclxuICAgICAgICBcclxuICAgICAgICAvLyByZWplY3RlZCBwYXJhbWV0ZXJzIG5lZWQgdG8gYmUgaW5kaWNhdGVkIGFzIGVycm9uZW91cy4gXHJcbiAgICAgICAgY29uc3QgcmVqZWN0ZWRQYXJhbWV0ZXJzOiBBcnJheTxDb21wb25lbnRTZXJ2aWNlUmVzcG9uc2VEYXRhQ2hhbmdlZFBhcmFtZXRlcj4gPSBzZXJ2aWNlUmVzcG9uc2VEYXRhLmV2ZW50RGF0YS5yZWplY3RlZCA/IHNlcnZpY2VSZXNwb25zZURhdGEuZXZlbnREYXRhLnJlamVjdGVkIDogW107XHJcbiAgICAgICAgdGhpcy5zZXRUcmFuc2ZlckZhaWxlZFBhcmFtZXRlcnMocmVqZWN0ZWRQYXJhbWV0ZXJzKTtcclxuXHJcbiAgICAgICAgLy8gYXBwbGllZCBwYXJhbWV0ZXJzIGFyZSBjb25zaWRlcmVkIGFzIG5vIGxvbmdlciBtb2RpZmllZC4gVGh1cyB0aGUgY29ycmVzcG9uZGluZyBtb2RpZmllZCBwYXJhbWV0ZXJzICggb3Igc3RhdGUgKSBuZWVkIHRvIGJlIHJlbW92ZWRcclxuICAgICAgICBjb25zdCBhcHBsaWVkUGFyYW1ldGVyczogQXJyYXk8Q29tcG9uZW50U2VydmljZVJlc3BvbnNlRGF0YUNoYW5nZWRQYXJhbWV0ZXI+ID0gc2VydmljZVJlc3BvbnNlRGF0YS5ldmVudERhdGEuYXBwbGllZCA/IHNlcnZpY2VSZXNwb25zZURhdGEuZXZlbnREYXRhLmFwcGxpZWQgOiBbXTtcclxuICAgICAgICB0aGlzLmNsZWFyTW9kaWZpZWRQYXJhbWV0ZXJzKGFwcGxpZWRQYXJhbWV0ZXJzKTtcclxuXHJcbiAgICAgICAgLy8gbm93IHdlIGNhbiBjbGVhciB0aGUgbWF0Y2hpbmcgcGVuZGluZyByZXF1ZXN0LlxyXG4gICAgICAgIHRoaXMuX3NlcnZpY2VDaGFubmVsLmNsZWFyUGVuZGluZ1JlcXVlc3Qoc2VydmljZVJlc3BvbnNlRGF0YS5yZXF1ZXN0SUQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogaGFuZGxlcyBvYnNlcnZhYmxlIGNoYW5nZXNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7T2JzZXJ2YWJsZVtdfSBjaGFuZ2VkT2JzZXJ2YWJsZXNcclxuICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIG9uT2JzZXJ2YWJsZXNDaGFuZ2VkKGNoYW5nZWRPYnNlcnZhYmxlczogT2JzZXJ2YWJsZVtdKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIm9uT2JzZXJ2YWJsZXNDaGFuZ2VkOiAlbyAlb1wiLCB0aGlzLCBjaGFuZ2VkT2JzZXJ2YWJsZXMpO1xyXG4gICAgdGhpcy51cGRhdGVGaWx0ZXJzSW5EYXRhTW9kZWwoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmVzIGlmIHRoZSBjb21wb25lbnQgY2hhbmdlcyB0aGUgd3JpdGUgYWNjZXNzXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IGNvbmZpZ1BhcmFtZXRlcnNcclxuICAgKiBAcmV0dXJucyB7Kn1cclxuICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIG9ic2VydmVDb21wb25lbnRXcml0ZUFjY2Vzcyhjb25maWdQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKTogYW55IHtcclxuICAgIC8vIHdlIHVzZSBhIHNpbmdsZSBwYXJhbWV0ZXIgdG8gZ2V0IHRoZSBwYXJlbnQgY29tcG9uZW50IGFuZCBvYnNlcnZlIGNoYW5nZXMgb2YgdGhlIHdyaXRlIGFjY2VzIHZhbHVlLlxyXG4gICAgKDxNYXBwQ29ja3BpdENvbXBvbmVudD5jb25maWdQYXJhbWV0ZXJzWzBdLmNvbXBvbmVudCkud3JpdGVBY2Nlc3MuY2hhbmdlZCgod3JpdGVBY2Nlc3MpID0+IHtcclxuXHJcbiAgICAgIC8vIGludm9rZSBjb21tb24gbW9kZWwgY2hhbmdlZCBwcm9jZXNzaW5nIHRyaWdnZXJlZCBieSB3cml0ZSBhY2Nlc3MgY2hhbmdlLlxyXG4gICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMsIG5ldyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3ModGhpcywgTW9kZWxDaGFuZ2VUeXBlLnVwZGF0ZVRhcmdldCwgXCJjb21wb25lbnRQYXJhbWV0ZXJzVXBkYXRlZFwiLCB0aGlzKSk7XHJcblxyXG4gICAgICAvLyBpbnZva2Ugc3BlY2lmaWMgd3JpdGUgYWNjZXNzIGNoYW5nZWQgY2hhbmdlZCBwcm9jZXNzaW5nLlxyXG4gICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMsIG5ldyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3ModGhpcywgTW9kZWxDaGFuZ2VUeXBlLnVwZGF0ZVRhcmdldCwgXCJ3cml0ZUFjY2Vzc0NoYW5nZWRcIiwgd3JpdGVBY2Nlc3MpKTtcclxuICAgIH0pO1xyXG4gIH1cclxufSJdfQ==