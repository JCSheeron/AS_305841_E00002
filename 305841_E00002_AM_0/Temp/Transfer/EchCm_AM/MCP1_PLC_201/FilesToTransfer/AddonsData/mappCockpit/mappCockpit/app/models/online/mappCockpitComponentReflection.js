define(["require", "exports", "./mappCockpitComponent", "./mappCockpitComponentMetaData", "../diagnostics/mappCockpitCommonInfoProvider", "../../widgets/methodParameterListWidget/parameterFilter"], function (require, exports, mappCockpitComponent_1, mappCockpitComponentMetaData_1, mappCockpitCommonInfoProvider_1, parameterFilter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * provides descriptive information for a parameter
     *
     * @class MappCockpitComponentParameterInfo
     */
    var MappCockpitComponentParameterInfo = /** @class */ (function () {
        function MappCockpitComponentParameterInfo() {
        }
        /**
         * Retrieves watchableParameters
         *
         * @static
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @param {Array<string>} dataToRetrieve
         * @returns {MappCockpitComponentParameter[]}
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.retrieveWatchableParameters = function (componentParameters, dataToRetrieve) {
            var metaConfig = dataToRetrieve[0];
            var metaStructure = dataToRetrieve[1];
            var metaName = dataToRetrieve[2];
            // get the watchables meta infos
            if ((componentParameters[0] == undefined) || componentParameters[0].component.metaData[metaConfig] == undefined) {
                return new Array();
            }
            var metaInfo = componentParameters[0].component.metaData[metaConfig][metaStructure];
            // retrieve the watchables definitions
            var parameters = MappCockpitComponentParameterInfo.retrieveParametersFromMetaInfo([metaName], metaInfo, componentParameters);
            return parameters;
        };
        /**
         * Create watchable state parameters according to metaInfo
         *
         * @static
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @param {Array<string>} dataToRetrieve
         * @returns {MappCockpitStateParameter[]}
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.retrieveWatchableStates = function (componentParameters, dataToRetrieve) {
            var metaConfig = dataToRetrieve[0];
            var metaStructure = dataToRetrieve[1];
            var metaName = dataToRetrieve[2];
            // get the watchables meta infos
            if ((componentParameters[0] == undefined) || componentParameters[0].component.metaData[metaConfig] == undefined) {
                return new Array();
            }
            var metaInfo = componentParameters[0].component.metaData[metaConfig][metaStructure];
            var stateParameters = MappCockpitComponentParameterInfo.retrieveWatchableStatesFromMetaInfo([metaName], metaInfo, componentParameters);
            return stateParameters;
        };
        /**
         * retrieves the message parameters from the component parameters
         *
         * @private
         * @param {Array<MappCockpitComponentParameter>} componentParameters
         * @returns {Array<MappCockpitComponentParameter>}
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.retrieveMessageParameters = function (componentParameters) {
            var messageSeverityParameter = componentParameters.filter(function (parameter) { return parameter.browseName === "intArraySeverity"; })[0];
            if (messageSeverityParameter == undefined) {
                messageSeverityParameter = componentParameters.filter(function (parameter) { return parameter.browseName === "strArraySeverity"; })[0];
            }
            var messageDescriptionParameter = componentParameters.filter(function (parameter) { return parameter.browseName === "strArrayDescription"; })[0];
            var messageEventIdParameter = componentParameters.filter(function (parameter) { return parameter.browseName === "strArrayEventID"; })[0];
            var messageTimeStampParameter = componentParameters.filter(function (parameter) { return parameter.browseName === "strArrayTime"; })[0];
            return [messageSeverityParameter, messageDescriptionParameter, messageEventIdParameter, messageTimeStampParameter];
        };
        /**
         * retrieves the trace configuration timing parameters from the parameter set
         *
         * @static
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @returns {MappCockpitComponentParameter[]}
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.retrieveTraceConfigurationTimingParameters = function (componentParameters) {
            // retrieve the trace configuration timing parameters
            var timingParameters = new Array();
            for (var i = 0; i < componentParameters.length; i++) {
                if (MappCockpitComponentParameterInfo.isTimingParameter(componentParameters[i])) {
                    timingParameters.push(componentParameters[i]);
                }
            }
            // Update the values to the real values from CurrentTrcConfig Property (BUGFIX for missing StartTriggers at startup)
            var currentTrcConfigProperties = componentParameters.filter(function (element) { return element.browseName == "CurrentTrcConfig"; });
            if (currentTrcConfigProperties.length == 1) {
                if (currentTrcConfigProperties[0].value != undefined) {
                    this.updateTimingParameters(timingParameters, currentTrcConfigProperties[0].value);
                }
            }
            return timingParameters;
        };
        /**
         * Updates the values of the timing parameters with the values from a json string (currentTraceConfigJsonString)
         * BUGFIX for missing StartTriggers at startup
         *
         * @private
         * @static
         * @param {MappCockpitComponentParameter[]} timingParameters
         * @param {string} currentTraceConfigJsonString
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.updateTimingParameters = function (timingParameters, currentTraceConfigJsonString) {
            if (currentTraceConfigJsonString != "") {
                var currentTraceConfig = JSON.parse(currentTraceConfigJsonString);
                // Update all timing parameters
                try {
                    if (currentTraceConfig.Timing != undefined) {
                        this.setValueOfProperty(timingParameters, "Timing_TotalRecordingTime", currentTraceConfig.Timing.TotalRecordingTime);
                        this.setValueOfProperty(timingParameters, "Timing_TriggerOffsetTime", currentTraceConfig.Timing.TriggerOffsetTime);
                        this.setValueOfProperty(timingParameters, "Timing_AcoposSampleTime", currentTraceConfig.Timing.ACOPOSSampleTime);
                        this.setValueOfProperty(timingParameters, "Timing_PlcTaskClass", currentTraceConfig.Timing.PVTaskClass);
                        this.setValueOfProperty(timingParameters, "Timing_PlcSampleTime", currentTraceConfig.Timing.PlcSampleTime);
                    }
                }
                catch (error) {
                    console.error("Updating of some trace configuration timing informations not possible!");
                }
            }
        };
        MappCockpitComponentParameterInfo.isTimingParameter = function (parameter) {
            // Timing parameters begin with "Timing_" in the properties name
            var prefix = "Timing_";
            if (parameter.browseName.substr(0, prefix.length) == prefix) {
                return true;
            }
            return false;
        };
        /**
         * retrieves the trace configuration trigger parameters from the parameter set
         *
         * @static
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @returns {MappCockpitComponentParameter[]}
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.retrieveTraceConfigurationTriggerParameters = function (componentParameters) {
            // retrieve the trace configuration trigger parameters
            var triggerParameters = new Array();
            for (var i = 0; i < componentParameters.length; i++) {
                if (MappCockpitComponentParameterInfo.isTriggerParameter(componentParameters[i])) {
                    triggerParameters.push(componentParameters[i]);
                }
            }
            // Update the values to the real values from CurrentTrcConfig Property (BUGFIX for missing StartTriggers at startup)
            var currentTrcConfigProperties = componentParameters.filter(function (element) { return element.browseName == "CurrentTrcConfig"; });
            if (currentTrcConfigProperties.length == 1) {
                if (currentTrcConfigProperties[0].value != undefined) {
                    this.updateTriggerParameters(triggerParameters, currentTrcConfigProperties[0].value);
                }
            }
            return triggerParameters;
        };
        /**
         * Updates the values of the trigger parameters with the values from a json string (currentTraceConfigJsonString)
         * BUGFIX for missing StartTriggers at startup
         *
         * @private
         * @static
         * @param {MappCockpitComponentParameter[]} triggerParameters
         * @param {string} currentTraceConfigJsonString
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.updateTriggerParameters = function (triggerParameters, currentTraceConfigJsonString) {
            if (currentTraceConfigJsonString != "") {
                var currentTraceConfig = JSON.parse(currentTraceConfigJsonString);
                // Update all supported triggers
                for (var i = 0; i < 2; i++) {
                    this.updateSingleTrigger(triggerParameters, i, currentTraceConfig);
                }
            }
        };
        /**
         * Updates the values of a trigger with the given index with the values from a json string (currentTraceConfigJsonString)
         * BUGFIX for missing StartTriggers at startup
         *
         * @private
         * @static
         * @param {MappCockpitComponentParameter[]} triggerParameters
         * @param {number} triggerIndex
         * @param {*} currentTraceConfig
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.updateSingleTrigger = function (triggerParameters, triggerIndex, currentTraceConfig) {
            try {
                var triggerID_1 = (triggerIndex + 1);
                var startTriggerPrefixBrowseName = "StartTrigger" + triggerID_1 + "_";
                var currentTriggerCfg = currentTraceConfig.Triggers.filter(function (element) { return element.ID == triggerID_1; })[0];
                if (currentTriggerCfg != undefined) {
                    this.setValueOfProperty(triggerParameters, startTriggerPrefixBrowseName + "Condition", currentTriggerCfg.Event);
                    this.setValueOfProperty(triggerParameters, startTriggerPrefixBrowseName + "DataPoint", currentTriggerCfg.DataPoint);
                    this.setValueOfProperty(triggerParameters, startTriggerPrefixBrowseName + "Threshold", currentTriggerCfg.Threshold);
                    this.setValueOfProperty(triggerParameters, startTriggerPrefixBrowseName + "Window", currentTriggerCfg.Window);
                }
                else {
                    // Set Trigger to default if not available in current trace config
                    this.setValueOfProperty(triggerParameters, startTriggerPrefixBrowseName + "Condition", "20");
                    this.setValueOfProperty(triggerParameters, startTriggerPrefixBrowseName + "DataPoint", "");
                    this.setValueOfProperty(triggerParameters, startTriggerPrefixBrowseName + "Threshold", "0");
                    this.setValueOfProperty(triggerParameters, startTriggerPrefixBrowseName + "Window", "0");
                }
            }
            catch (error) {
                console.error("Updating of some trace configuration trigger informations not possible!");
            }
        };
        MappCockpitComponentParameterInfo.setValueOfProperty = function (properties, propertyName, value) {
            var property = properties.filter(function (element) { return element.browseName == propertyName; })[0];
            if (property != undefined) {
                property.value = value;
            }
        };
        MappCockpitComponentParameterInfo.isTriggerParameter = function (parameter) {
            // Trigger parameters begin with "StartTrigger" in the properties name
            var prefix = "StartTrigger";
            if (parameter.browseName.substr(0, prefix.length) == prefix) {
                return true;
            }
            return false;
        };
        /**
         * retrieves the trace configuration datapoints from the parameter set
         *
         * @static
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @returns {MappCockpitComponentParameter[]}
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.retrieveTraceConfigurationDatapoints = function (componentParameters) {
            // retrieve the trace configuration datapoints
            var datapoints = new Array();
            for (var i = 0; i < componentParameters.length; i++) {
                if (MappCockpitComponentParameterInfo.isDataPoint(componentParameters[i])) {
                    datapoints.push(componentParameters[i]);
                }
            }
            // Update the values to the real values from CurrentTrcConfig Property (BUGFIX for missing StartTriggers at startup)
            var currentTrcConfigProperties = componentParameters.filter(function (element) { return element.browseName == "CurrentTrcConfig"; });
            if (currentTrcConfigProperties.length == 1) {
                if (currentTrcConfigProperties[0].value != undefined) {
                    this.updateDataPointParameters(datapoints, currentTrcConfigProperties[0].value);
                }
            }
            return datapoints;
        };
        /**
         * Updates the values of the datapoint parameters with the values from a json string (currentTraceConfigJsonString)
         * BUGFIX for missing StartTriggers at startup
         *
         * @private
         * @static
         * @param {MappCockpitComponentParameter[]} dataPointParameters
         * @param {string} currentTraceConfigJsonString
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.updateDataPointParameters = function (dataPointParameters, currentTraceConfigJsonString) {
            if (currentTraceConfigJsonString != "") {
                var currentTraceConfig = JSON.parse(currentTraceConfigJsonString);
                // Update all datapoints
                try {
                    if (currentTraceConfig.DataPoints != undefined) {
                        var _loop_1 = function (index) {
                            var dataPointID = (index + 1);
                            var currentDataPoint = currentTraceConfig.DataPoints.filter(function (element) { return element.ID == dataPointID; })[0];
                            if (currentDataPoint != undefined) {
                                dataPointParameters[index].value = currentDataPoint.Name;
                            }
                            else {
                                dataPointParameters[index].value = "";
                            }
                        };
                        for (var index = 0; index < dataPointParameters.length; index++) {
                            _loop_1(index);
                        }
                    }
                }
                catch (error) {
                    console.error("Updating of some trace configuration datapoint informations not possible!");
                }
            }
        };
        MappCockpitComponentParameterInfo.isDataPoint = function (parameter) {
            // Datapoint parameters begin with "DataPoint" in the properties name
            var prefix = "DataPoint";
            if (parameter.browseName.substr(0, prefix.length) == prefix) {
                return true;
            }
            return false;
        };
        /**
         * retrieves the trace control parameters from the parameter set
         *
         * @static
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @returns {MappCockpitComponentParameter[]}
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.retrieveTraceControlParameters = function (componentParameters) {
            // retrieve the trace configuration datapoints
            var datapoints = new Array();
            for (var i = 0; i < componentParameters.length; i++) {
                if (MappCockpitComponentParameterInfo.isTraceControlParameter(componentParameters[i])) {
                    datapoints.push(componentParameters[i]);
                }
            }
            return datapoints;
        };
        MappCockpitComponentParameterInfo.isTraceControlParameter = function (parameter) {
            if (parameter.browseName == "TraceStatus") {
                return true;
            }
            return false;
        };
        /**
        * retrieves the configuration parameters from the parameter set
        *
        * @static
        * @param {MappCockpitComponentParameter[]} componentParameters
        * @returns {MappCockpitComponentParameter[]}
        * @memberof MappCockpitComponentParameterInfo
        */
        MappCockpitComponentParameterInfo.retrieveConfigurationParameters = function (componentParameters) {
            // get the configuration meta infos
            var configurationMetaInfo;
            if ((componentParameters[0] != undefined) && componentParameters[0].component.metaData.MetaConfigConfigProps != undefined) {
                configurationMetaInfo = componentParameters[0].component.metaData.MetaConfigConfigProps.ConfigurationStructure;
            }
            else {
                return new Array();
            }
            // retrieve the configuration definitions
            var configurationParameters = MappCockpitComponentParameterInfo.retrieveParametersFromMetaInfo(["Parameter", "Group"], configurationMetaInfo, componentParameters);
            return configurationParameters;
        };
        /**
         * retrives parameters declared in the meta info
         *
         * @private
         * @static
         * @param {string[]} requesteItemTypes
         * @param {*} parameterMetaInfo
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @returns
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.retrieveParametersFromMetaInfo = function (requesteItemTypes, parameterMetaInfo, componentParameters) {
            // get requested meta items
            var metaParameterItems = mappCockpitComponentMetaData_1.MappCockpitComponentMetaData.filterMetaItems(parameterMetaInfo, requesteItemTypes);
            // create dictionary of available parameters
            var parameterSet = {};
            componentParameters.forEach(function (parameter) { parameterSet[parameter.browseName] = parameter; });
            // create dictionary of meta parameters
            var metaParameters = {};
            metaParameterItems.forEach(function (metaParameter) { metaParameters[metaParameter.Ref] = metaParameter; });
            // retrieve the parameters with matching name in the meta info
            var matchingParameters = componentParameters.filter(function (componentParameter) { return metaParameters[componentParameter.browseName] !== undefined; });
            // read and assign units
            MappCockpitComponentParameterInfo.updateParameter(matchingParameters, metaParameters);
            // notify invalid or unknown references
            var unknownParameterRefs = metaParameterItems.filter(function (metaParameter) { return metaParameter.Ref !== undefined && parameterSet[metaParameter.Ref] === undefined; });
            if (unknownParameterRefs.length > 0) {
                console.error("MappCockpitComponentParameterInfo.retrieveParametersFromMetaInfo : meta info references unknown parameters %o %o", unknownParameterRefs, parameterSet);
            }
            return matchingParameters;
        };
        /**
         * Retrieves watchable states declared in the metaInfo
         *
         * @static
         * @param {string[]} requesteItemTypes
         * @param {*} parameterMetaInfo
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @returns {MappCockpitStateParameter[]}
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.retrieveWatchableStatesFromMetaInfo = function (requesteItemTypes, parameterMetaInfo, componentParameters) {
            var stateParameters = new Array();
            // get requested meta items
            var metaParameterItems = mappCockpitComponentMetaData_1.MappCockpitComponentMetaData.filterMetaItems(parameterMetaInfo, requesteItemTypes);
            // create dictionary of available parameters
            var parameterSet = {};
            componentParameters.forEach(function (parameter) { parameterSet[parameter.browseName] = parameter; });
            // create watchable states
            metaParameterItems.forEach(function (metaParameter) {
                stateParameters.push(new mappCockpitComponent_1.MappCockpitStateParameter(metaParameter.Ref, metaParameter.IconExpression, metaParameter.WatchableVariablesMapping, metaParameter.Icon));
            });
            return stateParameters;
        };
        MappCockpitComponentParameterInfo.readParameters = function (parameterMetaInfo, parameter) {
            // get requested meta items
            var metaParameterItems = mappCockpitComponentMetaData_1.MappCockpitComponentMetaData.filterMetaItems(parameterMetaInfo, parameter);
            // create dictionary of meta parameters
            var metaParameters = {};
            metaParameterItems.forEach(function (metaParameter) { metaParameters[metaParameter.Ref] = metaParameter; });
            return metaParameters;
        };
        MappCockpitComponentParameterInfo.readMessageParameters = function (parameterMetaInfo) {
            var metaParameters = {};
            metaParameters["intArraySeverity"] = { Ref: "intArraySeverity" };
            metaParameters["strArrayDescription"] = { Ref: "strArrayDescription" };
            metaParameters["strArrayEventID"] = { Ref: "strArrayEventID" };
            metaParameters["strArrayTime"] = { Ref: "strArrayTime" };
            return metaParameters;
        };
        /**
         * reads engineering units from the meta info and assigns it to the parameters
         *
         * @private
         * @static
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @param {{}} metaParameters
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.updateParameter = function (componentParameters, metaParameters) {
            componentParameters.forEach(function (componentParameter) {
                MappCockpitComponentParameterInfo.updateParameterEngineeringUnit(metaParameters, componentParameter);
                MappCockpitComponentParameterInfo.updateParameterDisplayName(metaParameters, componentParameter);
            });
        };
        /**
         * Updates the parameters display name
         *
         * @static
         * @param {{}} metaParameters
         * @param {MappCockpitComponentParameter} componentParameter
         * @returns {*}
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.updateParameterDisplayName = function (metaParameters, componentParameter) {
            if (metaParameters[componentParameter.browseName].DisplayName) {
                componentParameter.displayName = metaParameters[componentParameter.browseName].DisplayName;
            }
        };
        /**
         * Updates the parameters engineering units
         *
         * @private
         * @static
         * @param {{}} metaParameters
         * @param {MappCockpitComponentParameter} componentParameter
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.updateParameterEngineeringUnit = function (metaParameters, componentParameter) {
            if (metaParameters[componentParameter.browseName].EU) {
                componentParameter.engineeringUnit = metaParameters[componentParameter.browseName].EU;
            }
        };
        /**
         * reads enum values if available and assigns it to the parameter
         *
         * @static
         * @param {MappCockpitComponentParameter} parameter
         * @returns {*} true if the parameter uses an enum for its value
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.readParameterEnums = function (componentParameters) {
            // get available enum parameter defs 
            var enumParameterTypeDefinitions = mappCockpitCommonInfoProvider_1.MappCockpitCommonInfoProvider.getInstance().readEnumParameterDefinitions(componentParameters, componentParameters[0].component.metaData);
            // find matching parameter
            var matchingParameters = componentParameters.filter(function (componentParameter) { return enumParameterTypeDefinitions[componentParameter.browseName]; });
            // set the enum definitions for the matching parameters
            matchingParameters.forEach(function (matchingParameter) {
                // set the enum definition
                matchingParameter.enumType = enumParameterTypeDefinitions[matchingParameter.browseName];
                console.log("MappCockpitComponentParameterInfo - set enum info %o for %o", matchingParameter.enumType, matchingParameter.component.browseName + "." + matchingParameter.browseName);
            });
        };
        return MappCockpitComponentParameterInfo;
    }());
    exports.MappCockpitComponentParameterInfo = MappCockpitComponentParameterInfo;
    /**
     * provides descriptive information for a method
     *
     * @class MappCockpitComponentMethodInfoInfo
     */
    var MappCockpitComponentMethodInfo = /** @class */ (function () {
        function MappCockpitComponentMethodInfo() {
        }
        /**
         * initializes the method input parameters
         *
         * @static
         * @param {MappCockpitComponentMethod} method
         * @returns {*}
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.updateMethodInputParameters = function (method) {
            // skip if the method has no parameters to initialize.
            if (method.inputParameters.length === 0)
                return;
            // get the meta data
            var methodMetaInfo = MappCockpitComponentMethodInfo.getMethodMetaInfo(method);
            if (methodMetaInfo) {
                // find and initialize method parameter default values
                method.inputParameters.forEach(function (methodInputParameter) {
                    MappCockpitComponentMethodInfo.updateMethodInputParameterDefaults(method, methodInputParameter, methodMetaInfo);
                });
            }
        };
        /**
         * updates respectively initializes the method input parameters with defaults
         *
         * @private
         * @static
         * @param {MappCockpitComponentMethod} method
         * @param {MappCockpitMethodParameter} methodInputParameter
         * @param {*} methodMetaInfo
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.updateMethodInputParameterDefaults = function (method, methodInputParameter, methodMetaInfo) {
            var methodParameterMetaInfo = MappCockpitComponentMethodInfo.getMethodParameterMetaInfo(methodMetaInfo, methodInputParameter);
            if (methodParameterMetaInfo) {
                // assign default value if defined ...
                MappCockpitComponentMethodInfo.updateMethodInputParameterDefaultValue(methodParameterMetaInfo, methodInputParameter, method);
                // assign engineering unit if defined.
                MappCockpitComponentMethodInfo.updateMethodParameterEngineeringUnit(methodParameterMetaInfo, methodInputParameter);
                // assign display name
                MappCockpitComponentMethodInfo.updateMethodParameterDisplayName(methodParameterMetaInfo, methodInputParameter);
                //assign filter if defined
                MappCockpitComponentMethodInfo.updateMethodParameterFilter(methodParameterMetaInfo, methodInputParameter);
            }
            else {
                console.error("MappCockpitComponentMethodInfo.initializeInputParameterDefaultValues : No meta info defined for for method parameter %o", method.browseName + "." + methodInputParameter.name);
            }
        };
        /**
         * Update filter information to method parameter
         *
         * @private
         * @static
         * @param {*} methodParameterMetaInfo
         * @param {MappCockpitMethodParameter} methodInputParameter
         * @returns {*}
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.updateMethodParameterFilter = function (methodParameterMetaInfo, methodInputParameter) {
            var parameterHasFilter = methodParameterMetaInfo.Parameter.hasOwnProperty("Filter");
            if (parameterHasFilter) {
                methodInputParameter.filter = new parameterFilter_1.ParameterFilter(methodParameterMetaInfo.Parameter.Filter.ParameterRef, methodParameterMetaInfo.Parameter.Filter.ParameterValues);
            }
        };
        /**
         * Updates the display from meta info
         *
         * @static
         * @param {*} methodParameterMetaInfo
         * @param {MappCockpitMethodParameter} methodInputParameter
         * @returns {*}
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.updateMethodParameterDisplayName = function (methodParameterMetaInfo, methodInputParameter) {
            if (methodParameterMetaInfo.Parameter.DisplayName) {
                methodInputParameter.displayName = methodParameterMetaInfo.Parameter.DisplayName;
            }
        };
        /**
         * Updates the engineering unit
         *
         * @private
         * @static
         * @param {*} methodParameterMetaInfo
         * @param {MappCockpitMethodParameter} methodInputParameter
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.updateMethodParameterEngineeringUnit = function (methodParameterMetaInfo, methodInputParameter) {
            if (methodParameterMetaInfo.Parameter.EU) {
                methodInputParameter.engineeringUnit = methodParameterMetaInfo.Parameter.EU;
            }
        };
        /**
         * Updates the default value
         *
         * @private
         * @static
         * @param {*} methodParameterMetaInfo
         * @param {MappCockpitMethodParameter} methodInputParameter
         * @param {MappCockpitComponentMethod} method
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.updateMethodInputParameterDefaultValue = function (methodParameterMetaInfo, methodInputParameter, method) {
            var parameterHasDefaultValue = methodParameterMetaInfo.Parameter.hasOwnProperty("DefaultValue");
            if (parameterHasDefaultValue) {
                methodInputParameter.value = methodParameterMetaInfo.Parameter.DefaultValue;
            }
            else {
                // method parameters must have default values defined
                console.error("MappCockpitComponentMethodInfo.initializeInputParameterDefaultValues : No default value defined for method parameter %o", method.browseName + "." + methodInputParameter.name);
            }
        };
        /**
         * gets the meta info for a method parameter
         *
         * @private
         * @static
         * @param {*} methodMetaInfo
         * @param {MappCockpitMethodParameter} methodInputParameter
         * @returns
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.getMethodParameterMetaInfo = function (methodMetaInfo, methodInputParameter) {
            var methodParameterMetaInfo = undefined;
            // get parameter meta info if available
            if (methodMetaInfo.Parameters) {
                var methodParameterMetaInfos = methodMetaInfo.Parameters.filter(function (methodMetaItemParameterItem) { return methodMetaItemParameterItem.Parameter.Ref === methodInputParameter.name; });
                methodParameterMetaInfo = methodParameterMetaInfos.length === 1 ? methodParameterMetaInfos[0] : undefined;
            }
            return methodParameterMetaInfo;
        };
        /**
         * gets the meta info for the requested method
         *
         * @private
         * @static
         * @param {MappCockpitComponentMethod} method
         * @returns
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.getMethodMetaInfo = function (method) {
            var methodMetaInfo = undefined;
            var componentMetaData = method.component.metaData;
            if (componentMetaData == undefined) {
                return methodMetaInfo;
            }
            // get the method info from meta data
            var methodMetaItems = mappCockpitComponentMetaData_1.MappCockpitComponentMetaData.filterMetaItems(componentMetaData.MetaConfigCommands.CommandsStructure, ["Command"]);
            // get the meta info for the requested method
            var methodMetaInfos = methodMetaItems.filter(function (methodMetaItem) { return methodMetaItem.Ref === method.browseName; });
            methodMetaInfo = methodMetaInfos.length === 1 ? methodMetaInfos[0] : undefined;
            return methodMetaInfo;
        };
        /**
         * gets the method parameters contained in the meta data
         *
         * @private
         * @static
         * @param {*} methodMetaItem
         * @param {MappCockpitMethodParameter} methodInputParameter
         * @returns
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.getMatchingMethodParameters = function (methodMetaItem, methodInputParameter) {
            return methodMetaItem.Parameters.filter(function (methodMetaItemParameterItem) {
                var isMatchingMethodParameter = methodMetaItemParameterItem.Parameter.Ref === methodInputParameter.name
                    && methodMetaItemParameterItem.Parameter.DefaultValue
                    && methodMetaItemParameterItem.Parameter.DefaultValue !== "";
                return isMatchingMethodParameter;
            });
        };
        /**
         * Retrieves the executable methods from the component method set
         *
         * @static
         * @param {MappCockpitComponentMethod[]} componentMethods
         * @param {Array<string>} dataToRetrieve
         * @returns {MappCockpitComponentMethod[]}
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.retrieveExecutableMethods = function (componentMethods, dataToRetrieve) {
            var _this = this;
            var metaConfig = dataToRetrieve[0];
            var metaStructure = dataToRetrieve[1];
            var metaName = dataToRetrieve[2];
            var executableMethods = Array();
            if ((componentMethods[0] == undefined) ||
                componentMethods[0].component.metaData == undefined ||
                componentMethods[0].component.metaData[metaConfig] == undefined) {
                return executableMethods;
            }
            // get the commands meta infos
            var methodsMetaInfo = componentMethods[0].component.metaData[metaConfig][metaStructure];
            // retrieve the method definitions
            var metaMethods = mappCockpitComponentMetaData_1.MappCockpitComponentMetaData.filterMetaItems(methodsMetaInfo, [metaName]);
            // create dictionary of available methods
            var methodSet = {};
            var metaMethodSet = {};
            componentMethods.forEach(function (method) { methodSet[method.browseName] = method; });
            metaMethods.forEach(function (metaMethod) { metaMethodSet[metaMethod.Ref] = metaMethod; });
            // retrieve the methods with matching name in the meta info
            executableMethods = metaMethods.filter(function (metaMethod) { return methodSet[metaMethod.Ref] !== undefined; }).map(function (metaMethod) { return methodSet[metaMethod.Ref]; });
            // assign the display name
            executableMethods.forEach(function (method) { _this.updateMethodDisplayName(method, metaMethodSet[method.browseName]); });
            // notify invalid or unknown methods
            var unknownMethods = metaMethods.filter(function (metaMethod) { return methodSet[metaMethod.Ref] === undefined; });
            if (unknownMethods.length > 0) {
                console.error("MappCockpitComponentMethodInfo.retrieveExecutableMethods : meta info references unknown methods %o", unknownMethods);
            }
            return executableMethods;
        };
        /**
         * Retrieves quick commands methods from metaInfo
         *
         * @static
         * @param {MappCockpitComponentMethod[]} componentMethods
         * @param {Array<string>} dataToRetrieve
         * @returns {MappCockpitQuickCommandParameter[]}
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.retrieveQuickCommands = function (componentMethods, dataToRetrieve) {
            var metaConfig = dataToRetrieve[0];
            var metaStructure = dataToRetrieve[1];
            var metaName = dataToRetrieve[2];
            var quickCommands = Array();
            if ((componentMethods[0] == undefined) ||
                componentMethods[0].component.metaData == undefined ||
                componentMethods[0].component.metaData[metaConfig] == undefined) {
                return quickCommands;
            }
            // get the commands meta infos
            var methodsMetaInfo = componentMethods[0].component.metaData[metaConfig][metaStructure];
            // retrieve the method definitions
            var metaMethods = mappCockpitComponentMetaData_1.MappCockpitComponentMetaData.filterMetaItems(methodsMetaInfo, [metaName]);
            // create dictionary of available methods
            var methodSet = {};
            componentMethods.forEach(function (method) { methodSet[method.browseName] = method; });
            metaMethods.forEach(function (metaMethod) {
                quickCommands.push(new mappCockpitComponent_1.MappCockpitQuickCommandParameter(metaMethod.Ref, metaMethod.Tooltip, metaMethod.ImageName));
            });
            // notify invalid or unknown methods
            var unknownMethods = quickCommands.filter(function (quickCommand) { return methodSet[quickCommand.name] === undefined; });
            if (unknownMethods.length > 0) {
                console.error("MappCockpitComponentMethodInfo.retrieveQuickCommands : meta info references unknown methods %o", unknownMethods);
            }
            return quickCommands;
        };
        MappCockpitComponentMethodInfo.readMethods = function (metaInfo, property, method) {
            var metaConfig = property[0];
            var metaConfigStructure = property[1];
            // get the commands meta infos
            if (metaInfo[metaConfig] == undefined)
                return {};
            var methodsMetaInfo = metaInfo[metaConfig][metaConfigStructure];
            // retrieve the method definitions
            var metaMethods = mappCockpitComponentMetaData_1.MappCockpitComponentMetaData.filterMetaItems(methodsMetaInfo, method);
            // create dictionary of available methods
            var metaMethodSet = {};
            metaMethods.forEach(function (metaMethod) { metaMethodSet[metaMethod.Ref] = metaMethod; });
            return metaMethodSet;
        };
        /**
         * Updates a methods display name
         *
         * @static
         * @param {MappCockpitComponentMethod} method
         * @param {*} arg1
         * @returns {*}
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.updateMethodDisplayName = function (method, metaMethodInfo) {
            if (metaMethodInfo && metaMethodInfo.DisplayName) {
                method.displayName = metaMethodInfo.DisplayName;
            }
        };
        /**
         * reads and updates method parameter enums
         *
         * @static
         * @param {MappCockpitComponentMethod} method
         * @returns {*}
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.readMethodParameterEnums = function (method, metaData) {
            var methodParameters = method.inputParameters;
            // get available enum method parameter defs 
            var metaMethodParameterEnumTypeDefinitions = mappCockpitCommonInfoProvider_1.MappCockpitCommonInfoProvider.getInstance().readMetaEnumMethodParameterDefinitions(method, metaData);
            // find matching parameter
            var matchingMethodParameters = methodParameters.filter(function (methodParameter) { return metaMethodParameterEnumTypeDefinitions[methodParameter.name]; });
            // set the enum definitions for the matching parameters
            matchingMethodParameters.forEach(function (matchingMethodParameter) {
                // set the enum definition
                matchingMethodParameter.enumType = metaMethodParameterEnumTypeDefinitions[matchingMethodParameter.name];
                console.log("MappCockpitComponentMethodInfo - set enum info %o for %o", matchingMethodParameter.enumType, method.browseName + "." + matchingMethodParameter.name);
            });
        };
        return MappCockpitComponentMethodInfo;
    }());
    exports.MappCockpitComponentMethodInfo = MappCockpitComponentMethodInfo;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXRDb21wb25lbnRSZWZsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50UmVmbGVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFLQTs7OztPQUlHO0lBRUg7UUFBQTtRQTZmQSxDQUFDO1FBM2ZHOzs7Ozs7OztXQVFHO1FBQ0ksNkRBQTJCLEdBQWxDLFVBQW1DLG1CQUFvRCxFQUFFLGNBQTZCO1lBQ2xILElBQUksVUFBVSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQyxJQUFJLGFBQWEsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEMsSUFBSSxRQUFRLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRWpDLGdDQUFnQztZQUNoQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxDQUFDLElBQWlDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVUsQ0FBQyxRQUFTLENBQUMsVUFBVSxDQUFDLElBQUksU0FBUyxFQUFFO2dCQUM1SSxPQUFPLElBQUksS0FBSyxFQUFpQyxDQUFDO2FBQ3JEO1lBQ0QsSUFBSSxRQUFRLEdBQWdDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVUsQ0FBQyxRQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDbkgsc0NBQXNDO1lBQ3RDLElBQUksVUFBVSxHQUFHLGlDQUFpQyxDQUFDLDhCQUE4QixDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixDQUFDLENBQUM7WUFDN0gsT0FBTyxVQUFVLENBQUM7UUFDdEIsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0kseURBQXVCLEdBQTlCLFVBQStCLG1CQUFvRCxFQUFFLGNBQTZCO1lBQzlHLElB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dURBQXdCLEdBQS9CLFVBQWdDLE1BQWtDLEVBQUUsUUFBYTtZQUU3RSxJQUFJLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUM7WUFFOUMsNENBQTRDO1lBQzVDLElBQUksc0NBQXNDLEdBQUcsNkRBQTZCLENBQUMsV0FBVyxFQUFFLENBQUMsc0NBQXNDLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBRWxKLDBCQUEwQjtZQUMxQixJQUFJLHdCQUF3QixHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxVQUFDLGVBQWUsSUFBTyxPQUFPLHNDQUFzQyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JKLHVEQUF1RDtZQUN2RCx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsVUFBQyx1QkFBdUI7Z0JBQ3JELDBCQUEwQjtnQkFDMUIsdUJBQXVCLENBQUMsUUFBUSxHQUFHLHNDQUFzQyxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN4RyxPQUFPLENBQUMsR0FBRyxDQUFDLDBEQUEwRCxFQUFFLHVCQUF1QixDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBRyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0SyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFTCxxQ0FBQztJQUFELENBQUMsQUF4VkQsSUF3VkM7SUFFMkMsd0VBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QsIE1hcHBDb2NrcGl0Q29tcG9uZW50LCBNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlciwgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIsIE1hcHBDb2NrcGl0U3RhdGVQYXJhbWV0ZXIsIE1hcHBDb2NrcGl0UXVpY2tDb21tYW5kUGFyYW1ldGVyIH0gZnJvbSBcIi4vbWFwcENvY2twaXRDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRNZXRhRGF0YSB9IGZyb20gXCIuL21hcHBDb2NrcGl0Q29tcG9uZW50TWV0YURhdGFcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXIgfSBmcm9tIFwiLi4vZGlhZ25vc3RpY3MvbWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgUGFyYW1ldGVyRmlsdGVyIH0gZnJvbSBcIi4uLy4uL3dpZGdldHMvbWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldC9wYXJhbWV0ZXJGaWx0ZXJcIjtcclxuXHJcbi8qKlxyXG4gKiBwcm92aWRlcyBkZXNjcmlwdGl2ZSBpbmZvcm1hdGlvbiBmb3IgYSBwYXJhbWV0ZXJcclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mb1xyXG4gKi9cclxuXHJcbmNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mbyB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMgd2F0Y2hhYmxlUGFyYW1ldGVyc1xyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gY29tcG9uZW50UGFyYW1ldGVyc1xyXG4gICAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBkYXRhVG9SZXRyaWV2ZVxyXG4gICAgICogQHJldHVybnMge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByZXRyaWV2ZVdhdGNoYWJsZVBhcmFtZXRlcnMoY29tcG9uZW50UGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSwgZGF0YVRvUmV0cmlldmU6IEFycmF5PHN0cmluZz4pOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdIHtcclxuICAgICAgICBsZXQgbWV0YUNvbmZpZyA9IGRhdGFUb1JldHJpZXZlWzBdO1xyXG4gICAgICAgIGxldCBtZXRhU3RydWN0dXJlID0gZGF0YVRvUmV0cmlldmVbMV07XHJcbiAgICAgICAgbGV0IG1ldGFOYW1lID0gZGF0YVRvUmV0cmlldmVbMl07XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgd2F0Y2hhYmxlcyBtZXRhIGluZm9zXHJcbiAgICAgICAgaWYgKChjb21wb25lbnRQYXJhbWV0ZXJzWzBdID09IHVuZGVmaW5lZCkgfHwgKDxhbnk+KDxNYXBwQ29ja3BpdENvbXBvbmVudD5jb21wb25lbnRQYXJhbWV0ZXJzWzBdLmNvbXBvbmVudCkubWV0YURhdGEpW21ldGFDb25maWddID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbWV0YUluZm8gPSAoPGFueT4oPE1hcHBDb2NrcGl0Q29tcG9uZW50PmNvbXBvbmVudFBhcmFtZXRlcnNbMF0uY29tcG9uZW50KS5tZXRhRGF0YSlbbWV0YUNvbmZpZ11bbWV0YVN0cnVjdHVyZV07XHJcbiAgICAgICAgLy8gcmV0cmlldmUgdGhlIHdhdGNoYWJsZXMgZGVmaW5pdGlvbnNcclxuICAgICAgICBsZXQgcGFyYW1ldGVycyA9IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mby5yZXRyaWV2ZVBhcmFtZXRlcnNGcm9tTWV0YUluZm8oW21ldGFOYW1lXSwgbWV0YUluZm8sIGNvbXBvbmVudFBhcmFtZXRlcnMpO1xyXG4gICAgICAgIHJldHVybiBwYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIHdhdGNoYWJsZSBzdGF0ZSBwYXJhbWV0ZXJzIGFjY29yZGluZyB0byBtZXRhSW5mb1xyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gY29tcG9uZW50UGFyYW1ldGVyc1xyXG4gICAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBkYXRhVG9SZXRyaWV2ZVxyXG4gICAgICogQHJldHVybnMge01hcHBDb2NrcGl0U3RhdGVQYXJhbWV0ZXJbXX1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm9cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJldHJpZXZlV2F0Y2hhYmxlU3RhdGVzKGNvbXBvbmVudFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10sIGRhdGFUb1JldHJpZXZlOiBBcnJheTxzdHJpbmc+KTogTWFwcENvY2twaXRTdGF0ZVBhcmFtZXRlcltdIHtcclxuICAgICAgICBsZXQgbWV0YUNvbmZpZyA9IGRhdGFUb1JldHJpZXZlWzBdO1xyXG4gICAgICAgIGxldCBtZXRhU3RydWN0dXJlID0gZGF0YVRvUmV0cmlldmVbMV07XHJcbiAgICAgICAgbGV0IG1ldGFOYW1lID0gZGF0YVRvUmV0cmlldmVbMl07XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgd2F0Y2hhYmxlcyBtZXRhIGluZm9zXHJcbiAgICAgICAgaWYgKChjb21wb25lbnRQYXJhbWV0ZXJzWzBdID09IHVuZGVmaW5lZCkgfHwgKDxhbnk+KDxNYXBwQ29ja3BpdENvbXBvbmVudD5jb21wb25lbnRQYXJhbWV0ZXJzWzBdLmNvbXBvbmVudCkubWV0YURhdGEpW21ldGFDb25maWddID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEFycmF5PE1hcHBDb2NrcGl0U3RhdGVQYXJhbWV0ZXI+KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBtZXRhSW5mbyA9ICg8YW55Pig8TWFwcENvY2twaXRDb21wb25lbnQ+Y29tcG9uZW50UGFyYW1ldGVyc1swXS5jb21wb25lbnQpLm1ldGFEYXRhKVttZXRhQ29uZmlnXVttZXRhU3RydWN0dXJlXTtcclxuXHJcbiAgICAgICAgbGV0IHN0YXRlUGFyYW1ldGVycyA9IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mby5yZXRyaWV2ZVdhdGNoYWJsZVN0YXRlc0Zyb21NZXRhSW5mbyhbbWV0YU5hbWVdLCBtZXRhSW5mbywgY29tcG9uZW50UGFyYW1ldGVycyk7XHJcblxyXG4gICAgICAgIHJldHVybiBzdGF0ZVBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmV0cmlldmVzIHRoZSBtZXNzYWdlIHBhcmFtZXRlcnMgZnJvbSB0aGUgY29tcG9uZW50IHBhcmFtZXRlcnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj59IGNvbXBvbmVudFBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByZXRyaWV2ZU1lc3NhZ2VQYXJhbWV0ZXJzKGNvbXBvbmVudFBhcmFtZXRlcnM6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPik6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10ge1xyXG5cclxuICAgICAgICBsZXQgbWVzc2FnZVNldmVyaXR5UGFyYW1ldGVyID0gY29tcG9uZW50UGFyYW1ldGVycy5maWx0ZXIocGFyYW1ldGVyID0+IHsgcmV0dXJuIHBhcmFtZXRlci5icm93c2VOYW1lID09PSBcImludEFycmF5U2V2ZXJpdHlcIjsgfSlbMF07XHJcbiAgICAgICAgaWYgKG1lc3NhZ2VTZXZlcml0eVBhcmFtZXRlciA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgbWVzc2FnZVNldmVyaXR5UGFyYW1ldGVyID0gY29tcG9uZW50UGFyYW1ldGVycy5maWx0ZXIocGFyYW1ldGVyID0+IHsgcmV0dXJuIHBhcmFtZXRlci5icm93c2VOYW1lID09PSBcInN0ckFycmF5U2V2ZXJpdHlcIjsgfSlbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbWVzc2FnZURlc2NyaXB0aW9uUGFyYW1ldGVyID0gY29tcG9uZW50UGFyYW1ldGVycy5maWx0ZXIocGFyYW1ldGVyID0+IHsgcmV0dXJuIHBhcmFtZXRlci5icm93c2VOYW1lID09PSBcInN0ckFycmF5RGVzY3JpcHRpb25cIjsgfSlbMF07XHJcbiAgICAgICAgbGV0IG1lc3NhZ2VFdmVudElkUGFyYW1ldGVyID0gY29tcG9uZW50UGFyYW1ldGVycy5maWx0ZXIocGFyYW1ldGVyID0+IHsgcmV0dXJuIHBhcmFtZXRlci5icm93c2VOYW1lID09PSBcInN0ckFycmF5RXZlbnRJRFwiOyB9KVswXTtcclxuICAgICAgICBsZXQgbWVzc2FnZVRpbWVTdGFtcFBhcmFtZXRlciA9IGNvbXBvbmVudFBhcmFtZXRlcnMuZmlsdGVyKHBhcmFtZXRlciA9PiB7IHJldHVybiBwYXJhbWV0ZXIuYnJvd3NlTmFtZSA9PT0gXCJzdHJBcnJheVRpbWVcIjsgfSlbMF07XHJcblxyXG4gICAgICAgIHJldHVybiBbbWVzc2FnZVNldmVyaXR5UGFyYW1ldGVyLCBtZXNzYWdlRGVzY3JpcHRpb25QYXJhbWV0ZXIsIG1lc3NhZ2VFdmVudElkUGFyYW1ldGVyLCBtZXNzYWdlVGltZVN0YW1wUGFyYW1ldGVyXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHJpZXZlcyB0aGUgdHJhY2UgY29uZmlndXJhdGlvbiB0aW1pbmcgcGFyYW1ldGVycyBmcm9tIHRoZSBwYXJhbWV0ZXIgc2V0XHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBjb21wb25lbnRQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm9cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJldHJpZXZlVHJhY2VDb25maWd1cmF0aW9uVGltaW5nUGFyYW1ldGVycyhjb21wb25lbnRQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKTogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSB7XHJcbiAgICAgICAgLy8gcmV0cmlldmUgdGhlIHRyYWNlIGNvbmZpZ3VyYXRpb24gdGltaW5nIHBhcmFtZXRlcnNcclxuICAgICAgICBsZXQgdGltaW5nUGFyYW1ldGVycyA9IG5ldyBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4oKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbXBvbmVudFBhcmFtZXRlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mby5pc1RpbWluZ1BhcmFtZXRlcihjb21wb25lbnRQYXJhbWV0ZXJzW2ldKSkge1xyXG4gICAgICAgICAgICAgICAgdGltaW5nUGFyYW1ldGVycy5wdXNoKGNvbXBvbmVudFBhcmFtZXRlcnNbaV0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgdmFsdWVzIHRvIHRoZSByZWFsIHZhbHVlcyBmcm9tIEN1cnJlbnRUcmNDb25maWcgUHJvcGVydHkgKEJVR0ZJWCBmb3IgbWlzc2luZyBTdGFydFRyaWdnZXJzIGF0IHN0YXJ0dXApXHJcbiAgICAgICAgbGV0IGN1cnJlbnRUcmNDb25maWdQcm9wZXJ0aWVzID0gY29tcG9uZW50UGFyYW1ldGVycy5maWx0ZXIoKGVsZW1lbnQpID0+IHsgcmV0dXJuIGVsZW1lbnQuYnJvd3NlTmFtZSA9PSBcIkN1cnJlbnRUcmNDb25maWdcIiB9KTtcclxuICAgICAgICBpZiAoY3VycmVudFRyY0NvbmZpZ1Byb3BlcnRpZXMubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRUcmNDb25maWdQcm9wZXJ0aWVzWzBdLnZhbHVlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVUaW1pbmdQYXJhbWV0ZXJzKHRpbWluZ1BhcmFtZXRlcnMsIGN1cnJlbnRUcmNDb25maWdQcm9wZXJ0aWVzWzBdLnZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGltaW5nUGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHZhbHVlcyBvZiB0aGUgdGltaW5nIHBhcmFtZXRlcnMgd2l0aCB0aGUgdmFsdWVzIGZyb20gYSBqc29uIHN0cmluZyAoY3VycmVudFRyYWNlQ29uZmlnSnNvblN0cmluZykgXHJcbiAgICAgKiBCVUdGSVggZm9yIG1pc3NpbmcgU3RhcnRUcmlnZ2VycyBhdCBzdGFydHVwXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gdGltaW5nUGFyYW1ldGVyc1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGN1cnJlbnRUcmFjZUNvbmZpZ0pzb25TdHJpbmdcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdXBkYXRlVGltaW5nUGFyYW1ldGVycyh0aW1pbmdQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdLCBjdXJyZW50VHJhY2VDb25maWdKc29uU3RyaW5nOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoY3VycmVudFRyYWNlQ29uZmlnSnNvblN0cmluZyAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50VHJhY2VDb25maWcgPSBKU09OLnBhcnNlKGN1cnJlbnRUcmFjZUNvbmZpZ0pzb25TdHJpbmcpO1xyXG4gICAgICAgICAgICAvLyBVcGRhdGUgYWxsIHRpbWluZyBwYXJhbWV0ZXJzXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFRyYWNlQ29uZmlnLlRpbWluZyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlT2ZQcm9wZXJ0eSh0aW1pbmdQYXJhbWV0ZXJzLCBcIlRpbWluZ19Ub3RhbFJlY29yZGluZ1RpbWVcIiwgY3VycmVudFRyYWNlQ29uZmlnLlRpbWluZy5Ub3RhbFJlY29yZGluZ1RpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVPZlByb3BlcnR5KHRpbWluZ1BhcmFtZXRlcnMsIFwiVGltaW5nX1RyaWdnZXJPZmZzZXRUaW1lXCIsIGN1cnJlbnRUcmFjZUNvbmZpZy5UaW1pbmcuVHJpZ2dlck9mZnNldFRpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVPZlByb3BlcnR5KHRpbWluZ1BhcmFtZXRlcnMsIFwiVGltaW5nX0Fjb3Bvc1NhbXBsZVRpbWVcIiwgY3VycmVudFRyYWNlQ29uZmlnLlRpbWluZy5BQ09QT1NTYW1wbGVUaW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlT2ZQcm9wZXJ0eSh0aW1pbmdQYXJhbWV0ZXJzLCBcIlRpbWluZ19QbGNUYXNrQ2xhc3NcIiwgY3VycmVudFRyYWNlQ29uZmlnLlRpbWluZy5QVlRhc2tDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZU9mUHJvcGVydHkodGltaW5nUGFyYW1ldGVycywgXCJUaW1pbmdfUGxjU2FtcGxlVGltZVwiLCBjdXJyZW50VHJhY2VDb25maWcuVGltaW5nLlBsY1NhbXBsZVRpbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlVwZGF0aW5nIG9mIHNvbWUgdHJhY2UgY29uZmlndXJhdGlvbiB0aW1pbmcgaW5mb3JtYXRpb25zIG5vdCBwb3NzaWJsZSFcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpc1RpbWluZ1BhcmFtZXRlcihwYXJhbWV0ZXI6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgLy8gVGltaW5nIHBhcmFtZXRlcnMgYmVnaW4gd2l0aCBcIlRpbWluZ19cIiBpbiB0aGUgcHJvcGVydGllcyBuYW1lXHJcbiAgICAgICAgbGV0IHByZWZpeCA9IFwiVGltaW5nX1wiO1xyXG4gICAgICAgIGlmIChwYXJhbWV0ZXIuYnJvd3NlTmFtZS5zdWJzdHIoMCwgcHJlZml4Lmxlbmd0aCkgPT0gcHJlZml4KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXRyaWV2ZXMgdGhlIHRyYWNlIGNvbmZpZ3VyYXRpb24gdHJpZ2dlciBwYXJhbWV0ZXJzIGZyb20gdGhlIHBhcmFtZXRlciBzZXRcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IGNvbXBvbmVudFBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mb1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmV0cmlldmVUcmFjZUNvbmZpZ3VyYXRpb25UcmlnZ2VyUGFyYW1ldGVycyhjb21wb25lbnRQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKTogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSB7XHJcbiAgICAgICAgLy8gcmV0cmlldmUgdGhlIHRyYWNlIGNvbmZpZ3VyYXRpb24gdHJpZ2dlciBwYXJhbWV0ZXJzXHJcbiAgICAgICAgbGV0IHRyaWdnZXJQYXJhbWV0ZXJzID0gbmV3IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPigpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29tcG9uZW50UGFyYW1ldGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLmlzVHJpZ2dlclBhcmFtZXRlcihjb21wb25lbnRQYXJhbWV0ZXJzW2ldKSkge1xyXG4gICAgICAgICAgICAgICAgdHJpZ2dlclBhcmFtZXRlcnMucHVzaChjb21wb25lbnRQYXJhbWV0ZXJzW2ldKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBVcGRhdGUgdGhlIHZhbHVlcyB0byB0aGUgcmVhbCB2YWx1ZXMgZnJvbSBDdXJyZW50VHJjQ29uZmlnIFByb3BlcnR5IChCVUdGSVggZm9yIG1pc3NpbmcgU3RhcnRUcmlnZ2VycyBhdCBzdGFydHVwKVxyXG4gICAgICAgIGxldCBjdXJyZW50VHJjQ29uZmlnUHJvcGVydGllcyA9IGNvbXBvbmVudFBhcmFtZXRlcnMuZmlsdGVyKChlbGVtZW50KSA9PiB7IHJldHVybiBlbGVtZW50LmJyb3dzZU5hbWUgPT0gXCJDdXJyZW50VHJjQ29uZmlnXCIgfSk7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRUcmNDb25maWdQcm9wZXJ0aWVzLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50VHJjQ29uZmlnUHJvcGVydGllc1swXS52YWx1ZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVHJpZ2dlclBhcmFtZXRlcnModHJpZ2dlclBhcmFtZXRlcnMsIGN1cnJlbnRUcmNDb25maWdQcm9wZXJ0aWVzWzBdLnZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJpZ2dlclBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSB2YWx1ZXMgb2YgdGhlIHRyaWdnZXIgcGFyYW1ldGVycyB3aXRoIHRoZSB2YWx1ZXMgZnJvbSBhIGpzb24gc3RyaW5nIChjdXJyZW50VHJhY2VDb25maWdKc29uU3RyaW5nKSBcclxuICAgICAqIEJVR0ZJWCBmb3IgbWlzc2luZyBTdGFydFRyaWdnZXJzIGF0IHN0YXJ0dXBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSB0cmlnZ2VyUGFyYW1ldGVyc1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGN1cnJlbnRUcmFjZUNvbmZpZ0pzb25TdHJpbmdcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdXBkYXRlVHJpZ2dlclBhcmFtZXRlcnModHJpZ2dlclBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10sIGN1cnJlbnRUcmFjZUNvbmZpZ0pzb25TdHJpbmc6IHN0cmluZykge1xyXG4gICAgICAgIGlmIChjdXJyZW50VHJhY2VDb25maWdKc29uU3RyaW5nICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRUcmFjZUNvbmZpZyA9IEpTT04ucGFyc2UoY3VycmVudFRyYWNlQ29uZmlnSnNvblN0cmluZyk7XHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBhbGwgc3VwcG9ydGVkIHRyaWdnZXJzXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNpbmdsZVRyaWdnZXIodHJpZ2dlclBhcmFtZXRlcnMsIGksIGN1cnJlbnRUcmFjZUNvbmZpZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSB2YWx1ZXMgb2YgYSB0cmlnZ2VyIHdpdGggdGhlIGdpdmVuIGluZGV4IHdpdGggdGhlIHZhbHVlcyBmcm9tIGEganNvbiBzdHJpbmcgKGN1cnJlbnRUcmFjZUNvbmZpZ0pzb25TdHJpbmcpIFxyXG4gICAgICogQlVHRklYIGZvciBtaXNzaW5nIFN0YXJ0VHJpZ2dlcnMgYXQgc3RhcnR1cFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IHRyaWdnZXJQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdHJpZ2dlckluZGV4XHJcbiAgICAgKiBAcGFyYW0geyp9IGN1cnJlbnRUcmFjZUNvbmZpZ1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mb1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyB1cGRhdGVTaW5nbGVUcmlnZ2VyKHRyaWdnZXJQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdLCB0cmlnZ2VySW5kZXg6IG51bWJlciwgY3VycmVudFRyYWNlQ29uZmlnKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IHRyaWdnZXJJRCA9ICh0cmlnZ2VySW5kZXggKyAxKTtcclxuICAgICAgICAgICAgbGV0IHN0YXJ0VHJpZ2dlclByZWZpeEJyb3dzZU5hbWUgPSBcIlN0YXJ0VHJpZ2dlclwiICsgdHJpZ2dlcklEICsgXCJfXCI7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50VHJpZ2dlckNmZyA9IGN1cnJlbnRUcmFjZUNvbmZpZy5UcmlnZ2Vycy5maWx0ZXIoKGVsZW1lbnQpID0+IHsgcmV0dXJuIGVsZW1lbnQuSUQgPT0gdHJpZ2dlcklEIH0pWzBdO1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudFRyaWdnZXJDZmcgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlT2ZQcm9wZXJ0eSh0cmlnZ2VyUGFyYW1ldGVycywgc3RhcnRUcmlnZ2VyUHJlZml4QnJvd3NlTmFtZSArIFwiQ29uZGl0aW9uXCIsIGN1cnJlbnRUcmlnZ2VyQ2ZnLkV2ZW50KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVPZlByb3BlcnR5KHRyaWdnZXJQYXJhbWV0ZXJzLCBzdGFydFRyaWdnZXJQcmVmaXhCcm93c2VOYW1lICsgXCJEYXRhUG9pbnRcIiwgY3VycmVudFRyaWdnZXJDZmcuRGF0YVBvaW50KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVPZlByb3BlcnR5KHRyaWdnZXJQYXJhbWV0ZXJzLCBzdGFydFRyaWdnZXJQcmVmaXhCcm93c2VOYW1lICsgXCJUaHJlc2hvbGRcIiwgY3VycmVudFRyaWdnZXJDZmcuVGhyZXNob2xkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVPZlByb3BlcnR5KHRyaWdnZXJQYXJhbWV0ZXJzLCBzdGFydFRyaWdnZXJQcmVmaXhCcm93c2VOYW1lICsgXCJXaW5kb3dcIiwgY3VycmVudFRyaWdnZXJDZmcuV2luZG93KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIFNldCBUcmlnZ2VyIHRvIGRlZmF1bHQgaWYgbm90IGF2YWlsYWJsZSBpbiBjdXJyZW50IHRyYWNlIGNvbmZpZ1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZU9mUHJvcGVydHkodHJpZ2dlclBhcmFtZXRlcnMsIHN0YXJ0VHJpZ2dlclByZWZpeEJyb3dzZU5hbWUgKyBcIkNvbmRpdGlvblwiLCBcIjIwXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZU9mUHJvcGVydHkodHJpZ2dlclBhcmFtZXRlcnMsIHN0YXJ0VHJpZ2dlclByZWZpeEJyb3dzZU5hbWUgKyBcIkRhdGFQb2ludFwiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVPZlByb3BlcnR5KHRyaWdnZXJQYXJhbWV0ZXJzLCBzdGFydFRyaWdnZXJQcmVmaXhCcm93c2VOYW1lICsgXCJUaHJlc2hvbGRcIiwgXCIwXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZU9mUHJvcGVydHkodHJpZ2dlclBhcmFtZXRlcnMsIHN0YXJ0VHJpZ2dlclByZWZpeEJyb3dzZU5hbWUgKyBcIldpbmRvd1wiLCBcIjBcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVcGRhdGluZyBvZiBzb21lIHRyYWNlIGNvbmZpZ3VyYXRpb24gdHJpZ2dlciBpbmZvcm1hdGlvbnMgbm90IHBvc3NpYmxlIVwiKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBzZXRWYWx1ZU9mUHJvcGVydHkocHJvcGVydGllczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSwgcHJvcGVydHlOYW1lOiBzdHJpbmcsIHZhbHVlKSB7XHJcbiAgICAgICAgbGV0IHByb3BlcnR5ID0gcHJvcGVydGllcy5maWx0ZXIoKGVsZW1lbnQpID0+IHsgcmV0dXJuIGVsZW1lbnQuYnJvd3NlTmFtZSA9PSBwcm9wZXJ0eU5hbWUgfSlbMF07XHJcbiAgICAgICAgaWYgKHByb3BlcnR5ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBwcm9wZXJ0eS52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpc1RyaWdnZXJQYXJhbWV0ZXIocGFyYW1ldGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIC8vIFRyaWdnZXIgcGFyYW1ldGVycyBiZWdpbiB3aXRoIFwiU3RhcnRUcmlnZ2VyXCIgaW4gdGhlIHByb3BlcnRpZXMgbmFtZVxyXG4gICAgICAgIGxldCBwcmVmaXggPSBcIlN0YXJ0VHJpZ2dlclwiO1xyXG4gICAgICAgIGlmIChwYXJhbWV0ZXIuYnJvd3NlTmFtZS5zdWJzdHIoMCwgcHJlZml4Lmxlbmd0aCkgPT0gcHJlZml4KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXRyaWV2ZXMgdGhlIHRyYWNlIGNvbmZpZ3VyYXRpb24gZGF0YXBvaW50cyBmcm9tIHRoZSBwYXJhbWV0ZXIgc2V0XHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBjb21wb25lbnRQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm9cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJldHJpZXZlVHJhY2VDb25maWd1cmF0aW9uRGF0YXBvaW50cyhjb21wb25lbnRQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKTogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSB7XHJcbiAgICAgICAgLy8gcmV0cmlldmUgdGhlIHRyYWNlIGNvbmZpZ3VyYXRpb24gZGF0YXBvaW50c1xyXG4gICAgICAgIGxldCBkYXRhcG9pbnRzID0gbmV3IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPigpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29tcG9uZW50UGFyYW1ldGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLmlzRGF0YVBvaW50KGNvbXBvbmVudFBhcmFtZXRlcnNbaV0pKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhcG9pbnRzLnB1c2goY29tcG9uZW50UGFyYW1ldGVyc1tpXSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHRoZSB2YWx1ZXMgdG8gdGhlIHJlYWwgdmFsdWVzIGZyb20gQ3VycmVudFRyY0NvbmZpZyBQcm9wZXJ0eSAoQlVHRklYIGZvciBtaXNzaW5nIFN0YXJ0VHJpZ2dlcnMgYXQgc3RhcnR1cClcclxuICAgICAgICBsZXQgY3VycmVudFRyY0NvbmZpZ1Byb3BlcnRpZXMgPSBjb21wb25lbnRQYXJhbWV0ZXJzLmZpbHRlcigoZWxlbWVudCkgPT4geyByZXR1cm4gZWxlbWVudC5icm93c2VOYW1lID09IFwiQ3VycmVudFRyY0NvbmZpZ1wiIH0pO1xyXG4gICAgICAgIGlmIChjdXJyZW50VHJjQ29uZmlnUHJvcGVydGllcy5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudFRyY0NvbmZpZ1Byb3BlcnRpZXNbMF0udmFsdWUgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZURhdGFQb2ludFBhcmFtZXRlcnMoZGF0YXBvaW50cywgY3VycmVudFRyY0NvbmZpZ1Byb3BlcnRpZXNbMF0udmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkYXRhcG9pbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgdmFsdWVzIG9mIHRoZSBkYXRhcG9pbnQgcGFyYW1ldGVycyB3aXRoIHRoZSB2YWx1ZXMgZnJvbSBhIGpzb24gc3RyaW5nIChjdXJyZW50VHJhY2VDb25maWdKc29uU3RyaW5nKSBcclxuICAgICAqIEJVR0ZJWCBmb3IgbWlzc2luZyBTdGFydFRyaWdnZXJzIGF0IHN0YXJ0dXBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBkYXRhUG9pbnRQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY3VycmVudFRyYWNlQ29uZmlnSnNvblN0cmluZ1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mb1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyB1cGRhdGVEYXRhUG9pbnRQYXJhbWV0ZXJzKGRhdGFQb2ludFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10sIGN1cnJlbnRUcmFjZUNvbmZpZ0pzb25TdHJpbmc6IHN0cmluZykge1xyXG4gICAgICAgIGlmIChjdXJyZW50VHJhY2VDb25maWdKc29uU3RyaW5nICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRUcmFjZUNvbmZpZyA9IEpTT04ucGFyc2UoY3VycmVudFRyYWNlQ29uZmlnSnNvblN0cmluZyk7XHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBhbGwgZGF0YXBvaW50c1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRUcmFjZUNvbmZpZy5EYXRhUG9pbnRzICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBkYXRhUG9pbnRQYXJhbWV0ZXJzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YVBvaW50SUQgPSAoaW5kZXggKyAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnREYXRhUG9pbnQgPSBjdXJyZW50VHJhY2VDb25maWcuRGF0YVBvaW50cy5maWx0ZXIoKGVsZW1lbnQpID0+IHsgcmV0dXJuIGVsZW1lbnQuSUQgPT0gZGF0YVBvaW50SUQgfSlbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50RGF0YVBvaW50ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVBvaW50UGFyYW1ldGVyc1tpbmRleF0udmFsdWUgPSBjdXJyZW50RGF0YVBvaW50Lk5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhUG9pbnRQYXJhbWV0ZXJzW2luZGV4XS52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVXBkYXRpbmcgb2Ygc29tZSB0cmFjZSBjb25maWd1cmF0aW9uIGRhdGFwb2ludCBpbmZvcm1hdGlvbnMgbm90IHBvc3NpYmxlIVwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGlzRGF0YVBvaW50KHBhcmFtZXRlcjogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIpOiBib29sZWFuIHtcclxuICAgICAgICAvLyBEYXRhcG9pbnQgcGFyYW1ldGVycyBiZWdpbiB3aXRoIFwiRGF0YVBvaW50XCIgaW4gdGhlIHByb3BlcnRpZXMgbmFtZVxyXG4gICAgICAgIGxldCBwcmVmaXggPSBcIkRhdGFQb2ludFwiO1xyXG4gICAgICAgIGlmIChwYXJhbWV0ZXIuYnJvd3NlTmFtZS5zdWJzdHIoMCwgcHJlZml4Lmxlbmd0aCkgPT0gcHJlZml4KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXRyaWV2ZXMgdGhlIHRyYWNlIGNvbnRyb2wgcGFyYW1ldGVycyBmcm9tIHRoZSBwYXJhbWV0ZXIgc2V0XHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBjb21wb25lbnRQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm9cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJldHJpZXZlVHJhY2VDb250cm9sUGFyYW1ldGVycyhjb21wb25lbnRQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKTogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSB7XHJcbiAgICAgICAgLy8gcmV0cmlldmUgdGhlIHRyYWNlIGNvbmZpZ3VyYXRpb24gZGF0YXBvaW50c1xyXG4gICAgICAgIGxldCBkYXRhcG9pbnRzID0gbmV3IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPigpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29tcG9uZW50UGFyYW1ldGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLmlzVHJhY2VDb250cm9sUGFyYW1ldGVyKGNvbXBvbmVudFBhcmFtZXRlcnNbaV0pKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhcG9pbnRzLnB1c2goY29tcG9uZW50UGFyYW1ldGVyc1tpXSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGF0YXBvaW50cztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpc1RyYWNlQ29udHJvbFBhcmFtZXRlcihwYXJhbWV0ZXI6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHBhcmFtZXRlci5icm93c2VOYW1lID09IFwiVHJhY2VTdGF0dXNcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiByZXRyaWV2ZXMgdGhlIGNvbmZpZ3VyYXRpb24gcGFyYW1ldGVycyBmcm9tIHRoZSBwYXJhbWV0ZXIgc2V0XHJcbiAgICAqXHJcbiAgICAqIEBzdGF0aWNcclxuICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBjb21wb25lbnRQYXJhbWV0ZXJzXHJcbiAgICAqIEByZXR1cm5zIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfVxyXG4gICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIHJldHJpZXZlQ29uZmlndXJhdGlvblBhcmFtZXRlcnMoY29tcG9uZW50UGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSk6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10ge1xyXG4gICAgICAgIC8vIGdldCB0aGUgY29uZmlndXJhdGlvbiBtZXRhIGluZm9zXHJcbiAgICAgICAgbGV0IGNvbmZpZ3VyYXRpb25NZXRhSW5mbztcclxuICAgICAgICBpZiAoKGNvbXBvbmVudFBhcmFtZXRlcnNbMF0gIT0gdW5kZWZpbmVkKSAmJiAoPGFueT4oPE1hcHBDb2NrcGl0Q29tcG9uZW50PmNvbXBvbmVudFBhcmFtZXRlcnNbMF0uY29tcG9uZW50KS5tZXRhRGF0YSkuTWV0YUNvbmZpZ0NvbmZpZ1Byb3BzICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjb25maWd1cmF0aW9uTWV0YUluZm8gPSAoPGFueT4oPE1hcHBDb2NrcGl0Q29tcG9uZW50PmNvbXBvbmVudFBhcmFtZXRlcnNbMF0uY29tcG9uZW50KS5tZXRhRGF0YSkuTWV0YUNvbmZpZ0NvbmZpZ1Byb3BzLkNvbmZpZ3VyYXRpb25TdHJ1Y3R1cmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyByZXRyaWV2ZSB0aGUgY29uZmlndXJhdGlvbiBkZWZpbml0aW9uc1xyXG4gICAgICAgIGxldCBjb25maWd1cmF0aW9uUGFyYW1ldGVycyA9IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mby5yZXRyaWV2ZVBhcmFtZXRlcnNGcm9tTWV0YUluZm8oW1wiUGFyYW1ldGVyXCIsIFwiR3JvdXBcIl0sIGNvbmZpZ3VyYXRpb25NZXRhSW5mbywgY29tcG9uZW50UGFyYW1ldGVycyk7XHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmV0cml2ZXMgcGFyYW1ldGVycyBkZWNsYXJlZCBpbiB0aGUgbWV0YSBpbmZvXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IHJlcXVlc3RlSXRlbVR5cGVzXHJcbiAgICAgKiBAcGFyYW0geyp9IHBhcmFtZXRlck1ldGFJbmZvXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IGNvbXBvbmVudFBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHJldHJpZXZlUGFyYW1ldGVyc0Zyb21NZXRhSW5mbyhyZXF1ZXN0ZUl0ZW1UeXBlczogc3RyaW5nW10sIHBhcmFtZXRlck1ldGFJbmZvOiBhbnksIGNvbXBvbmVudFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pIHtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHJlcXVlc3RlZCBtZXRhIGl0ZW1zXHJcbiAgICAgICAgbGV0IG1ldGFQYXJhbWV0ZXJJdGVtcyA9IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0YURhdGEuZmlsdGVyTWV0YUl0ZW1zKHBhcmFtZXRlck1ldGFJbmZvLCByZXF1ZXN0ZUl0ZW1UeXBlcyk7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBkaWN0aW9uYXJ5IG9mIGF2YWlsYWJsZSBwYXJhbWV0ZXJzXHJcbiAgICAgICAgbGV0IHBhcmFtZXRlclNldCA9IHt9O1xyXG4gICAgICAgIGNvbXBvbmVudFBhcmFtZXRlcnMuZm9yRWFjaCgocGFyYW1ldGVyKSA9PiB7IHBhcmFtZXRlclNldFtwYXJhbWV0ZXIuYnJvd3NlTmFtZV0gPSBwYXJhbWV0ZXI7IH0pO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgZGljdGlvbmFyeSBvZiBtZXRhIHBhcmFtZXRlcnNcclxuICAgICAgICBsZXQgbWV0YVBhcmFtZXRlcnMgPSB7fTtcclxuICAgICAgICBtZXRhUGFyYW1ldGVySXRlbXMuZm9yRWFjaCgobWV0YVBhcmFtZXRlcikgPT4geyBtZXRhUGFyYW1ldGVyc1ttZXRhUGFyYW1ldGVyLlJlZl0gPSBtZXRhUGFyYW1ldGVyOyB9KTtcclxuXHJcbiAgICAgICAgLy8gcmV0cmlldmUgdGhlIHBhcmFtZXRlcnMgd2l0aCBtYXRjaGluZyBuYW1lIGluIHRoZSBtZXRhIGluZm9cclxuICAgICAgICBsZXQgbWF0Y2hpbmdQYXJhbWV0ZXJzID0gY29tcG9uZW50UGFyYW1ldGVycy5maWx0ZXIoKGNvbXBvbmVudFBhcmFtZXRlcikgPT4geyByZXR1cm4gbWV0YVBhcmFtZXRlcnNbY29tcG9uZW50UGFyYW1ldGVyLmJyb3dzZU5hbWVdICE9PSB1bmRlZmluZWQ7IH0pO1xyXG5cclxuICAgICAgICAvLyByZWFkIGFuZCBhc3NpZ24gdW5pdHNcclxuICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8udXBkYXRlUGFyYW1ldGVyKG1hdGNoaW5nUGFyYW1ldGVycywgbWV0YVBhcmFtZXRlcnMpO1xyXG5cclxuICAgICAgICAvLyBub3RpZnkgaW52YWxpZCBvciB1bmtub3duIHJlZmVyZW5jZXNcclxuICAgICAgICBsZXQgdW5rbm93blBhcmFtZXRlclJlZnMgPSBtZXRhUGFyYW1ldGVySXRlbXMuZmlsdGVyKChtZXRhUGFyYW1ldGVyKSA9PiB7IHJldHVybiBtZXRhUGFyYW1ldGVyLlJlZiAhPT0gdW5kZWZpbmVkICYmIHBhcmFtZXRlclNldFttZXRhUGFyYW1ldGVyLlJlZl0gPT09IHVuZGVmaW5lZDsgfSk7XHJcbiAgICAgICAgaWYgKHVua25vd25QYXJhbWV0ZXJSZWZzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mby5yZXRyaWV2ZVBhcmFtZXRlcnNGcm9tTWV0YUluZm8gOiBtZXRhIGluZm8gcmVmZXJlbmNlcyB1bmtub3duIHBhcmFtZXRlcnMgJW8gJW9cIiwgdW5rbm93blBhcmFtZXRlclJlZnMsIHBhcmFtZXRlclNldCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtYXRjaGluZ1BhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMgd2F0Y2hhYmxlIHN0YXRlcyBkZWNsYXJlZCBpbiB0aGUgbWV0YUluZm9cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSByZXF1ZXN0ZUl0ZW1UeXBlc1xyXG4gICAgICogQHBhcmFtIHsqfSBwYXJhbWV0ZXJNZXRhSW5mb1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBjb21wb25lbnRQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7TWFwcENvY2twaXRTdGF0ZVBhcmFtZXRlcltdfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mb1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmV0cmlldmVXYXRjaGFibGVTdGF0ZXNGcm9tTWV0YUluZm8ocmVxdWVzdGVJdGVtVHlwZXM6IHN0cmluZ1tdLCBwYXJhbWV0ZXJNZXRhSW5mbzogYW55LCBjb21wb25lbnRQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKTogTWFwcENvY2twaXRTdGF0ZVBhcmFtZXRlcltdIHtcclxuICAgICAgICBsZXQgc3RhdGVQYXJhbWV0ZXJzID0gbmV3IEFycmF5PE1hcHBDb2NrcGl0U3RhdGVQYXJhbWV0ZXI+KCk7XHJcblxyXG4gICAgICAgIC8vIGdldCByZXF1ZXN0ZWQgbWV0YSBpdGVtc1xyXG4gICAgICAgIGxldCBtZXRhUGFyYW1ldGVySXRlbXMgPSBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGFEYXRhLmZpbHRlck1ldGFJdGVtcyhwYXJhbWV0ZXJNZXRhSW5mbywgcmVxdWVzdGVJdGVtVHlwZXMpO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgZGljdGlvbmFyeSBvZiBhdmFpbGFibGUgcGFyYW1ldGVyc1xyXG4gICAgICAgIGxldCBwYXJhbWV0ZXJTZXQgPSB7fTtcclxuICAgICAgICBjb21wb25lbnRQYXJhbWV0ZXJzLmZvckVhY2goKHBhcmFtZXRlcikgPT4geyBwYXJhbWV0ZXJTZXRbcGFyYW1ldGVyLmJyb3dzZU5hbWVdID0gcGFyYW1ldGVyOyB9KTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBjcmVhdGUgd2F0Y2hhYmxlIHN0YXRlc1xyXG4gICAgICAgIG1ldGFQYXJhbWV0ZXJJdGVtcy5mb3JFYWNoKChtZXRhUGFyYW1ldGVyKSA9PiB7XHJcbiAgICAgICAgICAgIHN0YXRlUGFyYW1ldGVycy5wdXNoKG5ldyBNYXBwQ29ja3BpdFN0YXRlUGFyYW1ldGVyKG1ldGFQYXJhbWV0ZXIuUmVmLCBtZXRhUGFyYW1ldGVyLkljb25FeHByZXNzaW9uLCBtZXRhUGFyYW1ldGVyLldhdGNoYWJsZVZhcmlhYmxlc01hcHBpbmcgLG1ldGFQYXJhbWV0ZXIuSWNvbikpXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBzdGF0ZVBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHJlYWRQYXJhbWV0ZXJzKHBhcmFtZXRlck1ldGFJbmZvOiBhbnksIHBhcmFtZXRlcjogQXJyYXk8c3RyaW5nPik6IG9iamVjdCB7XHJcbiAgICAgICAgLy8gZ2V0IHJlcXVlc3RlZCBtZXRhIGl0ZW1zXHJcbiAgICAgICAgbGV0IG1ldGFQYXJhbWV0ZXJJdGVtcyA9IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0YURhdGEuZmlsdGVyTWV0YUl0ZW1zKHBhcmFtZXRlck1ldGFJbmZvLCBwYXJhbWV0ZXIpO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgZGljdGlvbmFyeSBvZiBtZXRhIHBhcmFtZXRlcnNcclxuICAgICAgICBsZXQgbWV0YVBhcmFtZXRlcnMgPSB7fTtcclxuICAgICAgICBtZXRhUGFyYW1ldGVySXRlbXMuZm9yRWFjaCgobWV0YVBhcmFtZXRlcikgPT4geyBtZXRhUGFyYW1ldGVyc1ttZXRhUGFyYW1ldGVyLlJlZl0gPSBtZXRhUGFyYW1ldGVyOyB9KTtcclxuICAgICAgICByZXR1cm4gbWV0YVBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHJlYWRNZXNzYWdlUGFyYW1ldGVycyhwYXJhbWV0ZXJNZXRhSW5mbzogYW55KTogb2JqZWN0IHtcclxuXHJcbiAgICAgICAgbGV0IG1ldGFQYXJhbWV0ZXJzID0ge307XHJcbiAgICAgICAgbWV0YVBhcmFtZXRlcnNbXCJpbnRBcnJheVNldmVyaXR5XCJdID0geyBSZWY6IFwiaW50QXJyYXlTZXZlcml0eVwiIH07XHJcbiAgICAgICAgbWV0YVBhcmFtZXRlcnNbXCJzdHJBcnJheURlc2NyaXB0aW9uXCJdID0geyBSZWY6IFwic3RyQXJyYXlEZXNjcmlwdGlvblwiIH07XHJcbiAgICAgICAgbWV0YVBhcmFtZXRlcnNbXCJzdHJBcnJheUV2ZW50SURcIl0gPSB7IFJlZjogXCJzdHJBcnJheUV2ZW50SURcIiB9O1xyXG4gICAgICAgIG1ldGFQYXJhbWV0ZXJzW1wic3RyQXJyYXlUaW1lXCJdID0geyBSZWY6IFwic3RyQXJyYXlUaW1lXCIgfTtcclxuICAgICAgICByZXR1cm4gbWV0YVBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWFkcyBlbmdpbmVlcmluZyB1bml0cyBmcm9tIHRoZSBtZXRhIGluZm8gYW5kIGFzc2lnbnMgaXQgdG8gdGhlIHBhcmFtZXRlcnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBjb21wb25lbnRQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcGFyYW0ge3t9fSBtZXRhUGFyYW1ldGVyc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mb1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgdXBkYXRlUGFyYW1ldGVyKGNvbXBvbmVudFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10sIG1ldGFQYXJhbWV0ZXJzOiB7fSkge1xyXG4gICAgICAgIGNvbXBvbmVudFBhcmFtZXRlcnMuZm9yRWFjaCgoY29tcG9uZW50UGFyYW1ldGVyKSA9PiB7XHJcbiAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mby51cGRhdGVQYXJhbWV0ZXJFbmdpbmVlcmluZ1VuaXQobWV0YVBhcmFtZXRlcnMsIGNvbXBvbmVudFBhcmFtZXRlcik7XHJcbiAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mby51cGRhdGVQYXJhbWV0ZXJEaXNwbGF5TmFtZShtZXRhUGFyYW1ldGVycywgY29tcG9uZW50UGFyYW1ldGVyKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHBhcmFtZXRlcnMgZGlzcGxheSBuYW1lXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHt7fX0gbWV0YVBhcmFtZXRlcnNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJ9IGNvbXBvbmVudFBhcmFtZXRlclxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyB1cGRhdGVQYXJhbWV0ZXJEaXNwbGF5TmFtZShtZXRhUGFyYW1ldGVyczoge30sIGNvbXBvbmVudFBhcmFtZXRlcjogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIpOiBhbnkge1xyXG4gICAgICAgIGlmIChtZXRhUGFyYW1ldGVyc1tjb21wb25lbnRQYXJhbWV0ZXIuYnJvd3NlTmFtZV0uRGlzcGxheU5hbWUpIHtcclxuICAgICAgICAgICAgY29tcG9uZW50UGFyYW1ldGVyLmRpc3BsYXlOYW1lID0gbWV0YVBhcmFtZXRlcnNbY29tcG9uZW50UGFyYW1ldGVyLmJyb3dzZU5hbWVdLkRpc3BsYXlOYW1lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHBhcmFtZXRlcnMgZW5naW5lZXJpbmcgdW5pdHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHt7fX0gbWV0YVBhcmFtZXRlcnNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJ9IGNvbXBvbmVudFBhcmFtZXRlclxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mb1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyB1cGRhdGVQYXJhbWV0ZXJFbmdpbmVlcmluZ1VuaXQobWV0YVBhcmFtZXRlcnM6IHt9LCBjb21wb25lbnRQYXJhbWV0ZXI6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyKSB7XHJcbiAgICAgICAgaWYgKG1ldGFQYXJhbWV0ZXJzW2NvbXBvbmVudFBhcmFtZXRlci5icm93c2VOYW1lXS5FVSkge1xyXG4gICAgICAgICAgICBjb21wb25lbnRQYXJhbWV0ZXIuZW5naW5lZXJpbmdVbml0ID0gbWV0YVBhcmFtZXRlcnNbY29tcG9uZW50UGFyYW1ldGVyLmJyb3dzZU5hbWVdLkVVO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlYWRzIGVudW0gdmFsdWVzIGlmIGF2YWlsYWJsZSBhbmQgYXNzaWducyBpdCB0byB0aGUgcGFyYW1ldGVyXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcn0gcGFyYW1ldGVyXHJcbiAgICAgKiBAcmV0dXJucyB7Kn0gdHJ1ZSBpZiB0aGUgcGFyYW1ldGVyIHVzZXMgYW4gZW51bSBmb3IgaXRzIHZhbHVlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByZWFkUGFyYW1ldGVyRW51bXMoY29tcG9uZW50UGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSkge1xyXG5cclxuICAgICAgICAvLyBnZXQgYXZhaWxhYmxlIGVudW0gcGFyYW1ldGVyIGRlZnMgXHJcbiAgICAgICAgbGV0IGVudW1QYXJhbWV0ZXJUeXBlRGVmaW5pdGlvbnMgPSBNYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlci5nZXRJbnN0YW5jZSgpLnJlYWRFbnVtUGFyYW1ldGVyRGVmaW5pdGlvbnMoY29tcG9uZW50UGFyYW1ldGVycywgKDxNYXBwQ29ja3BpdENvbXBvbmVudD5jb21wb25lbnRQYXJhbWV0ZXJzWzBdLmNvbXBvbmVudCkubWV0YURhdGEpO1xyXG4gICAgICAgIC8vIGZpbmQgbWF0Y2hpbmcgcGFyYW1ldGVyXHJcbiAgICAgICAgbGV0IG1hdGNoaW5nUGFyYW1ldGVycyA9IGNvbXBvbmVudFBhcmFtZXRlcnMuZmlsdGVyKChjb21wb25lbnRQYXJhbWV0ZXIpID0+IHsgcmV0dXJuIGVudW1QYXJhbWV0ZXJUeXBlRGVmaW5pdGlvbnNbY29tcG9uZW50UGFyYW1ldGVyLmJyb3dzZU5hbWVdIH0pO1xyXG4gICAgICAgIC8vIHNldCB0aGUgZW51bSBkZWZpbml0aW9ucyBmb3IgdGhlIG1hdGNoaW5nIHBhcmFtZXRlcnNcclxuICAgICAgICBtYXRjaGluZ1BhcmFtZXRlcnMuZm9yRWFjaCgobWF0Y2hpbmdQYXJhbWV0ZXIpID0+IHtcclxuICAgICAgICAgICAgLy8gc2V0IHRoZSBlbnVtIGRlZmluaXRpb25cclxuICAgICAgICAgICAgbWF0Y2hpbmdQYXJhbWV0ZXIuZW51bVR5cGUgPSBlbnVtUGFyYW1ldGVyVHlwZURlZmluaXRpb25zW21hdGNoaW5nUGFyYW1ldGVyLmJyb3dzZU5hbWVdO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mbyAtIHNldCBlbnVtIGluZm8gJW8gZm9yICVvXCIsIG1hdGNoaW5nUGFyYW1ldGVyLmVudW1UeXBlLCAoPGFueT5tYXRjaGluZ1BhcmFtZXRlci5jb21wb25lbnQpLmJyb3dzZU5hbWUgKyBcIi5cIiArIG1hdGNoaW5nUGFyYW1ldGVyLmJyb3dzZU5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogcHJvdmlkZXMgZGVzY3JpcHRpdmUgaW5mb3JtYXRpb24gZm9yIGEgbWV0aG9kXHJcbiAqXHJcbiAqIEBjbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm9JbmZvXHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogaW5pdGlhbGl6ZXMgdGhlIG1ldGhvZCBpbnB1dCBwYXJhbWV0ZXJzXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZH0gbWV0aG9kXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm9cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHVwZGF0ZU1ldGhvZElucHV0UGFyYW1ldGVycyhtZXRob2Q6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kKTogYW55IHtcclxuXHJcbiAgICAgICAgLy8gc2tpcCBpZiB0aGUgbWV0aG9kIGhhcyBubyBwYXJhbWV0ZXJzIHRvIGluaXRpYWxpemUuXHJcbiAgICAgICAgaWYgKG1ldGhvZC5pbnB1dFBhcmFtZXRlcnMubGVuZ3RoID09PSAwKSByZXR1cm47XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgbWV0YSBkYXRhXHJcbiAgICAgICAgbGV0IG1ldGhvZE1ldGFJbmZvID0gTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvLmdldE1ldGhvZE1ldGFJbmZvKG1ldGhvZCk7XHJcblxyXG4gICAgICAgIGlmIChtZXRob2RNZXRhSW5mbykge1xyXG5cclxuICAgICAgICAgICAgLy8gZmluZCBhbmQgaW5pdGlhbGl6ZSBtZXRob2QgcGFyYW1ldGVyIGRlZmF1bHQgdmFsdWVzXHJcbiAgICAgICAgICAgIG1ldGhvZC5pbnB1dFBhcmFtZXRlcnMuZm9yRWFjaCgobWV0aG9kSW5wdXRQYXJhbWV0ZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mby51cGRhdGVNZXRob2RJbnB1dFBhcmFtZXRlckRlZmF1bHRzKG1ldGhvZCwgbWV0aG9kSW5wdXRQYXJhbWV0ZXIsIG1ldGhvZE1ldGFJbmZvKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHVwZGF0ZXMgcmVzcGVjdGl2ZWx5IGluaXRpYWxpemVzIHRoZSBtZXRob2QgaW5wdXQgcGFyYW1ldGVycyB3aXRoIGRlZmF1bHRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2R9IG1ldGhvZFxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcn0gbWV0aG9kSW5wdXRQYXJhbWV0ZXJcclxuICAgICAqIEBwYXJhbSB7Kn0gbWV0aG9kTWV0YUluZm9cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdXBkYXRlTWV0aG9kSW5wdXRQYXJhbWV0ZXJEZWZhdWx0cyhtZXRob2Q6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLCBtZXRob2RJbnB1dFBhcmFtZXRlcjogTWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXIsIG1ldGhvZE1ldGFJbmZvOiBhbnksKSB7XHJcbiAgICAgICAgbGV0IG1ldGhvZFBhcmFtZXRlck1ldGFJbmZvID0gTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvLmdldE1ldGhvZFBhcmFtZXRlck1ldGFJbmZvKG1ldGhvZE1ldGFJbmZvLCBtZXRob2RJbnB1dFBhcmFtZXRlcik7XHJcbiAgICAgICAgaWYgKG1ldGhvZFBhcmFtZXRlck1ldGFJbmZvKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBhc3NpZ24gZGVmYXVsdCB2YWx1ZSBpZiBkZWZpbmVkIC4uLlxyXG4gICAgICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8udXBkYXRlTWV0aG9kSW5wdXRQYXJhbWV0ZXJEZWZhdWx0VmFsdWUobWV0aG9kUGFyYW1ldGVyTWV0YUluZm8sIG1ldGhvZElucHV0UGFyYW1ldGVyLCBtZXRob2QpO1xyXG5cclxuICAgICAgICAgICAgLy8gYXNzaWduIGVuZ2luZWVyaW5nIHVuaXQgaWYgZGVmaW5lZC5cclxuICAgICAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvLnVwZGF0ZU1ldGhvZFBhcmFtZXRlckVuZ2luZWVyaW5nVW5pdChtZXRob2RQYXJhbWV0ZXJNZXRhSW5mbywgbWV0aG9kSW5wdXRQYXJhbWV0ZXIpO1xyXG5cclxuICAgICAgICAgICAgLy8gYXNzaWduIGRpc3BsYXkgbmFtZVxyXG4gICAgICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8udXBkYXRlTWV0aG9kUGFyYW1ldGVyRGlzcGxheU5hbWUobWV0aG9kUGFyYW1ldGVyTWV0YUluZm8sIG1ldGhvZElucHV0UGFyYW1ldGVyKTtcclxuXHJcbiAgICAgICAgICAgIC8vYXNzaWduIGZpbHRlciBpZiBkZWZpbmVkXHJcbiAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mby51cGRhdGVNZXRob2RQYXJhbWV0ZXJGaWx0ZXIobWV0aG9kUGFyYW1ldGVyTWV0YUluZm8sIG1ldGhvZElucHV0UGFyYW1ldGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8uaW5pdGlhbGl6ZUlucHV0UGFyYW1ldGVyRGVmYXVsdFZhbHVlcyA6IE5vIG1ldGEgaW5mbyBkZWZpbmVkIGZvciBmb3IgbWV0aG9kIHBhcmFtZXRlciAlb1wiLCBtZXRob2QuYnJvd3NlTmFtZSArIFwiLlwiICsgbWV0aG9kSW5wdXRQYXJhbWV0ZXIubmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlIGZpbHRlciBpbmZvcm1hdGlvbiB0byBtZXRob2QgcGFyYW1ldGVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7Kn0gbWV0aG9kUGFyYW1ldGVyTWV0YUluZm9cclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXJ9IG1ldGhvZElucHV0UGFyYW1ldGVyXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdXBkYXRlTWV0aG9kUGFyYW1ldGVyRmlsdGVyKG1ldGhvZFBhcmFtZXRlck1ldGFJbmZvOiBhbnksIG1ldGhvZElucHV0UGFyYW1ldGVyOiBNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcik6IGFueSB7XHJcbiAgICAgICAgbGV0IHBhcmFtZXRlckhhc0ZpbHRlciA9IG1ldGhvZFBhcmFtZXRlck1ldGFJbmZvLlBhcmFtZXRlci5oYXNPd25Qcm9wZXJ0eShcIkZpbHRlclwiKTtcclxuICAgICAgICBpZiAocGFyYW1ldGVySGFzRmlsdGVyKSB7XHJcbiAgICAgICAgICAgIG1ldGhvZElucHV0UGFyYW1ldGVyLmZpbHRlciA9IG5ldyBQYXJhbWV0ZXJGaWx0ZXIobWV0aG9kUGFyYW1ldGVyTWV0YUluZm8uUGFyYW1ldGVyLkZpbHRlci5QYXJhbWV0ZXJSZWYsIG1ldGhvZFBhcmFtZXRlck1ldGFJbmZvLlBhcmFtZXRlci5GaWx0ZXIuUGFyYW1ldGVyVmFsdWVzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBkaXNwbGF5IGZyb20gbWV0YSBpbmZvXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHsqfSBtZXRob2RQYXJhbWV0ZXJNZXRhSW5mb1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcn0gbWV0aG9kSW5wdXRQYXJhbWV0ZXJcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mb1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgdXBkYXRlTWV0aG9kUGFyYW1ldGVyRGlzcGxheU5hbWUobWV0aG9kUGFyYW1ldGVyTWV0YUluZm86IGFueSwgbWV0aG9kSW5wdXRQYXJhbWV0ZXI6IE1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyKTogYW55IHtcclxuICAgICAgICBpZiAobWV0aG9kUGFyYW1ldGVyTWV0YUluZm8uUGFyYW1ldGVyLkRpc3BsYXlOYW1lKSB7XHJcbiAgICAgICAgICAgIG1ldGhvZElucHV0UGFyYW1ldGVyLmRpc3BsYXlOYW1lID0gbWV0aG9kUGFyYW1ldGVyTWV0YUluZm8uUGFyYW1ldGVyLkRpc3BsYXlOYW1lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGVuZ2luZWVyaW5nIHVuaXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHsqfSBtZXRob2RQYXJhbWV0ZXJNZXRhSW5mb1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcn0gbWV0aG9kSW5wdXRQYXJhbWV0ZXJcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdXBkYXRlTWV0aG9kUGFyYW1ldGVyRW5naW5lZXJpbmdVbml0KG1ldGhvZFBhcmFtZXRlck1ldGFJbmZvOiBhbnksIG1ldGhvZElucHV0UGFyYW1ldGVyOiBNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcikge1xyXG4gICAgICAgIGlmIChtZXRob2RQYXJhbWV0ZXJNZXRhSW5mby5QYXJhbWV0ZXIuRVUpIHtcclxuICAgICAgICAgICAgbWV0aG9kSW5wdXRQYXJhbWV0ZXIuZW5naW5lZXJpbmdVbml0ID0gbWV0aG9kUGFyYW1ldGVyTWV0YUluZm8uUGFyYW1ldGVyLkVVO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGRlZmF1bHQgdmFsdWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHsqfSBtZXRob2RQYXJhbWV0ZXJNZXRhSW5mb1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcn0gbWV0aG9kSW5wdXRQYXJhbWV0ZXJcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2R9IG1ldGhvZFxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mb1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyB1cGRhdGVNZXRob2RJbnB1dFBhcmFtZXRlckRlZmF1bHRWYWx1ZShtZXRob2RQYXJhbWV0ZXJNZXRhSW5mbzogYW55LCBtZXRob2RJbnB1dFBhcmFtZXRlcjogTWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXIsIG1ldGhvZDogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QpIHtcclxuICAgICAgICBsZXQgcGFyYW1ldGVySGFzRGVmYXVsdFZhbHVlID0gbWV0aG9kUGFyYW1ldGVyTWV0YUluZm8uUGFyYW1ldGVyLmhhc093blByb3BlcnR5KFwiRGVmYXVsdFZhbHVlXCIpO1xyXG4gICAgICAgIGlmIChwYXJhbWV0ZXJIYXNEZWZhdWx0VmFsdWUpIHtcclxuICAgICAgICAgICAgbWV0aG9kSW5wdXRQYXJhbWV0ZXIudmFsdWUgPSBtZXRob2RQYXJhbWV0ZXJNZXRhSW5mby5QYXJhbWV0ZXIuRGVmYXVsdFZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gbWV0aG9kIHBhcmFtZXRlcnMgbXVzdCBoYXZlIGRlZmF1bHQgdmFsdWVzIGRlZmluZWRcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mby5pbml0aWFsaXplSW5wdXRQYXJhbWV0ZXJEZWZhdWx0VmFsdWVzIDogTm8gZGVmYXVsdCB2YWx1ZSBkZWZpbmVkIGZvciBtZXRob2QgcGFyYW1ldGVyICVvXCIsIG1ldGhvZC5icm93c2VOYW1lICsgXCIuXCIgKyBtZXRob2RJbnB1dFBhcmFtZXRlci5uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXRzIHRoZSBtZXRhIGluZm8gZm9yIGEgbWV0aG9kIHBhcmFtZXRlclxyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHsqfSBtZXRob2RNZXRhSW5mb1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcn0gbWV0aG9kSW5wdXRQYXJhbWV0ZXJcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGdldE1ldGhvZFBhcmFtZXRlck1ldGFJbmZvKG1ldGhvZE1ldGFJbmZvOiBhbnksIG1ldGhvZElucHV0UGFyYW1ldGVyOiBNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcikge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBtZXRob2RQYXJhbWV0ZXJNZXRhSW5mbyA9IHVuZGVmaW5lZDtcclxuICAgICAgICBcclxuICAgICAgICAvLyBnZXQgcGFyYW1ldGVyIG1ldGEgaW5mbyBpZiBhdmFpbGFibGVcclxuICAgICAgICBpZiAobWV0aG9kTWV0YUluZm8uUGFyYW1ldGVycykge1xyXG4gICAgICAgICAgICBsZXQgbWV0aG9kUGFyYW1ldGVyTWV0YUluZm9zID0gbWV0aG9kTWV0YUluZm8uUGFyYW1ldGVycy5maWx0ZXIoKG1ldGhvZE1ldGFJdGVtUGFyYW1ldGVySXRlbSkgPT4geyByZXR1cm4gbWV0aG9kTWV0YUl0ZW1QYXJhbWV0ZXJJdGVtLlBhcmFtZXRlci5SZWYgPT09IG1ldGhvZElucHV0UGFyYW1ldGVyLm5hbWU7IH0pO1xyXG4gICAgICAgICAgICBtZXRob2RQYXJhbWV0ZXJNZXRhSW5mbyA9IG1ldGhvZFBhcmFtZXRlck1ldGFJbmZvcy5sZW5ndGggPT09IDEgPyBtZXRob2RQYXJhbWV0ZXJNZXRhSW5mb3NbMF0gOiB1bmRlZmluZWQ7IFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1ldGhvZFBhcmFtZXRlck1ldGFJbmZvO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyB0aGUgbWV0YSBpbmZvIGZvciB0aGUgcmVxdWVzdGVkIG1ldGhvZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kfSBtZXRob2RcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGdldE1ldGhvZE1ldGFJbmZvKG1ldGhvZDogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QpOiBhbnkge1xyXG4gICAgICAgIGxldCBtZXRob2RNZXRhSW5mbyA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgbGV0IGNvbXBvbmVudE1ldGFEYXRhOiBhbnkgPSAoPE1hcHBDb2NrcGl0Q29tcG9uZW50Pm1ldGhvZC5jb21wb25lbnQpLm1ldGFEYXRhO1xyXG4gICAgICAgIGlmIChjb21wb25lbnRNZXRhRGF0YSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZE1ldGFJbmZvO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBnZXQgdGhlIG1ldGhvZCBpbmZvIGZyb20gbWV0YSBkYXRhXHJcbiAgICAgICAgbGV0IG1ldGhvZE1ldGFJdGVtczogYW55W10gPSBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGFEYXRhLmZpbHRlck1ldGFJdGVtcyhjb21wb25lbnRNZXRhRGF0YS5NZXRhQ29uZmlnQ29tbWFuZHMuQ29tbWFuZHNTdHJ1Y3R1cmUsIFtcIkNvbW1hbmRcIl0pO1xyXG4gICAgICAgIC8vIGdldCB0aGUgbWV0YSBpbmZvIGZvciB0aGUgcmVxdWVzdGVkIG1ldGhvZFxyXG4gICAgICAgIGxldCBtZXRob2RNZXRhSW5mb3MgPSBtZXRob2RNZXRhSXRlbXMuZmlsdGVyKChtZXRob2RNZXRhSXRlbSkgPT4geyByZXR1cm4gbWV0aG9kTWV0YUl0ZW0uUmVmID09PSBtZXRob2QuYnJvd3NlTmFtZTsgfSk7XHJcbiAgICAgICAgbWV0aG9kTWV0YUluZm8gPSBtZXRob2RNZXRhSW5mb3MubGVuZ3RoID09PSAxID8gbWV0aG9kTWV0YUluZm9zWzBdIDogdW5kZWZpbmVkO1xyXG4gICAgICAgIHJldHVybiBtZXRob2RNZXRhSW5mbztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgdGhlIG1ldGhvZCBwYXJhbWV0ZXJzIGNvbnRhaW5lZCBpbiB0aGUgbWV0YSBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7Kn0gbWV0aG9kTWV0YUl0ZW1cclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXJ9IG1ldGhvZElucHV0UGFyYW1ldGVyXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mb1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRNYXRjaGluZ01ldGhvZFBhcmFtZXRlcnMobWV0aG9kTWV0YUl0ZW06IGFueSwgbWV0aG9kSW5wdXRQYXJhbWV0ZXI6IE1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyKSB7XHJcbiAgICAgICAgcmV0dXJuIG1ldGhvZE1ldGFJdGVtLlBhcmFtZXRlcnMuZmlsdGVyKChtZXRob2RNZXRhSXRlbVBhcmFtZXRlckl0ZW0pID0+IHtcclxuICAgICAgICAgICAgbGV0IGlzTWF0Y2hpbmdNZXRob2RQYXJhbWV0ZXIgPSBtZXRob2RNZXRhSXRlbVBhcmFtZXRlckl0ZW0uUGFyYW1ldGVyLlJlZiA9PT0gbWV0aG9kSW5wdXRQYXJhbWV0ZXIubmFtZVxyXG4gICAgICAgICAgICAgICAgJiYgbWV0aG9kTWV0YUl0ZW1QYXJhbWV0ZXJJdGVtLlBhcmFtZXRlci5EZWZhdWx0VmFsdWVcclxuICAgICAgICAgICAgICAgICYmIG1ldGhvZE1ldGFJdGVtUGFyYW1ldGVySXRlbS5QYXJhbWV0ZXIuRGVmYXVsdFZhbHVlICE9PSBcIlwiO1xyXG4gICAgICAgICAgICByZXR1cm4gaXNNYXRjaGluZ01ldGhvZFBhcmFtZXRlcjtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlcyB0aGUgZXhlY3V0YWJsZSBtZXRob2RzIGZyb20gdGhlIGNvbXBvbmVudCBtZXRob2Qgc2V0XHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdfSBjb21wb25lbnRNZXRob2RzXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IGRhdGFUb1JldHJpZXZlXHJcbiAgICAgKiBAcmV0dXJucyB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXX1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm9cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJldHJpZXZlRXhlY3V0YWJsZU1ldGhvZHMoY29tcG9uZW50TWV0aG9kczogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXSwgZGF0YVRvUmV0cmlldmU6IEFycmF5PHN0cmluZz4pOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdIHtcclxuICAgICAgICBsZXQgbWV0YUNvbmZpZyA9IGRhdGFUb1JldHJpZXZlWzBdO1xyXG4gICAgICAgIGxldCBtZXRhU3RydWN0dXJlID0gZGF0YVRvUmV0cmlldmVbMV07XHJcbiAgICAgICAgbGV0IG1ldGFOYW1lID0gZGF0YVRvUmV0cmlldmVbMl07XHJcblxyXG4gICAgICAgIGxldCBleGVjdXRhYmxlTWV0aG9kcyA9IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kPigpO1xyXG4gICAgICAgIGlmICgoY29tcG9uZW50TWV0aG9kc1swXSA9PSB1bmRlZmluZWQpIHx8XHJcbiAgICAgICAgICAgICg8YW55Pig8TWFwcENvY2twaXRDb21wb25lbnQ+Y29tcG9uZW50TWV0aG9kc1swXS5jb21wb25lbnQpLm1ldGFEYXRhKSA9PSB1bmRlZmluZWQgfHxcclxuICAgICAgICAgICAgKDxhbnk+KDxNYXBwQ29ja3BpdENvbXBvbmVudD5jb21wb25lbnRNZXRob2RzWzBdLmNvbXBvbmVudCkubWV0YURhdGEpW21ldGFDb25maWddID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZXhlY3V0YWJsZU1ldGhvZHM7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBjb21tYW5kcyBtZXRhIGluZm9zXHJcbiAgICAgICAgbGV0IG1ldGhvZHNNZXRhSW5mbyA9ICg8YW55Pig8TWFwcENvY2twaXRDb21wb25lbnQ+Y29tcG9uZW50TWV0aG9kc1swXS5jb21wb25lbnQpLm1ldGFEYXRhKVttZXRhQ29uZmlnXVttZXRhU3RydWN0dXJlXTtcclxuXHJcbiAgICAgICAgLy8gcmV0cmlldmUgdGhlIG1ldGhvZCBkZWZpbml0aW9uc1xyXG4gICAgICAgIGxldCBtZXRhTWV0aG9kcyA9IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0YURhdGEuZmlsdGVyTWV0YUl0ZW1zKG1ldGhvZHNNZXRhSW5mbywgW21ldGFOYW1lXSk7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBkaWN0aW9uYXJ5IG9mIGF2YWlsYWJsZSBtZXRob2RzXHJcbiAgICAgICAgbGV0IG1ldGhvZFNldCA9IHt9O1xyXG4gICAgICAgIGxldCBtZXRhTWV0aG9kU2V0ID0ge307XHJcbiAgICAgICAgY29tcG9uZW50TWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHsgbWV0aG9kU2V0W21ldGhvZC5icm93c2VOYW1lXSA9IG1ldGhvZCB9KTtcclxuICAgICAgICBtZXRhTWV0aG9kcy5mb3JFYWNoKChtZXRhTWV0aG9kKSA9PiB7IG1ldGFNZXRob2RTZXRbbWV0YU1ldGhvZC5SZWZdID0gbWV0YU1ldGhvZCB9KTtcclxuICAgICAgICAvLyByZXRyaWV2ZSB0aGUgbWV0aG9kcyB3aXRoIG1hdGNoaW5nIG5hbWUgaW4gdGhlIG1ldGEgaW5mb1xyXG4gICAgICAgIGV4ZWN1dGFibGVNZXRob2RzID0gbWV0YU1ldGhvZHMuZmlsdGVyKChtZXRhTWV0aG9kKSA9PiB7IHJldHVybiBtZXRob2RTZXRbbWV0YU1ldGhvZC5SZWZdICE9PSB1bmRlZmluZWQgfSkubWFwKChtZXRhTWV0aG9kKSA9PiB7IHJldHVybiBtZXRob2RTZXRbbWV0YU1ldGhvZC5SZWZdIH0pO1xyXG5cclxuICAgICAgICAvLyBhc3NpZ24gdGhlIGRpc3BsYXkgbmFtZVxyXG4gICAgICAgIGV4ZWN1dGFibGVNZXRob2RzLmZvckVhY2goKG1ldGhvZCkgPT4geyB0aGlzLnVwZGF0ZU1ldGhvZERpc3BsYXlOYW1lKG1ldGhvZCwgbWV0YU1ldGhvZFNldFttZXRob2QuYnJvd3NlTmFtZV0pIH0pXHJcblxyXG4gICAgICAgIC8vIG5vdGlmeSBpbnZhbGlkIG9yIHVua25vd24gbWV0aG9kc1xyXG4gICAgICAgIGxldCB1bmtub3duTWV0aG9kcyA9IG1ldGFNZXRob2RzLmZpbHRlcigobWV0YU1ldGhvZCkgPT4geyByZXR1cm4gbWV0aG9kU2V0W21ldGFNZXRob2QuUmVmXSA9PT0gdW5kZWZpbmVkIH0pO1xyXG4gICAgICAgIGlmICh1bmtub3duTWV0aG9kcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8ucmV0cmlldmVFeGVjdXRhYmxlTWV0aG9kcyA6IG1ldGEgaW5mbyByZWZlcmVuY2VzIHVua25vd24gbWV0aG9kcyAlb1wiLCB1bmtub3duTWV0aG9kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBleGVjdXRhYmxlTWV0aG9kcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlcyBxdWljayBjb21tYW5kcyBtZXRob2RzIGZyb20gbWV0YUluZm9cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW119IGNvbXBvbmVudE1ldGhvZHNcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gZGF0YVRvUmV0cmlldmVcclxuICAgICAqIEByZXR1cm5zIHtNYXBwQ29ja3BpdFF1aWNrQ29tbWFuZFBhcmFtZXRlcltdfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mb1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmV0cmlldmVRdWlja0NvbW1hbmRzKGNvbXBvbmVudE1ldGhvZHM6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW10sIGRhdGFUb1JldHJpZXZlOiBBcnJheTxzdHJpbmc+KTogTWFwcENvY2twaXRRdWlja0NvbW1hbmRQYXJhbWV0ZXJbXSB7XHJcbiAgICAgICAgbGV0IG1ldGFDb25maWcgPSBkYXRhVG9SZXRyaWV2ZVswXTtcclxuICAgICAgICBsZXQgbWV0YVN0cnVjdHVyZSA9IGRhdGFUb1JldHJpZXZlWzFdO1xyXG4gICAgICAgIGxldCBtZXRhTmFtZSA9IGRhdGFUb1JldHJpZXZlWzJdO1xyXG5cclxuICAgICAgICBsZXQgcXVpY2tDb21tYW5kcyA9IEFycmF5PE1hcHBDb2NrcGl0UXVpY2tDb21tYW5kUGFyYW1ldGVyPigpO1xyXG4gICAgICAgIGlmICgoY29tcG9uZW50TWV0aG9kc1swXSA9PSB1bmRlZmluZWQpIHx8XHJcbiAgICAgICAgICAgICg8YW55Pig8TWFwcENvY2twaXRDb21wb25lbnQ+Y29tcG9uZW50TWV0aG9kc1swXS5jb21wb25lbnQpLm1ldGFEYXRhKSA9PSB1bmRlZmluZWQgfHxcclxuICAgICAgICAgICAgKDxhbnk+KDxNYXBwQ29ja3BpdENvbXBvbmVudD5jb21wb25lbnRNZXRob2RzWzBdLmNvbXBvbmVudCkubWV0YURhdGEpW21ldGFDb25maWddID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcXVpY2tDb21tYW5kcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgY29tbWFuZHMgbWV0YSBpbmZvc1xyXG4gICAgICAgIGxldCBtZXRob2RzTWV0YUluZm8gPSAoPGFueT4oPE1hcHBDb2NrcGl0Q29tcG9uZW50PmNvbXBvbmVudE1ldGhvZHNbMF0uY29tcG9uZW50KS5tZXRhRGF0YSlbbWV0YUNvbmZpZ11bbWV0YVN0cnVjdHVyZV07XHJcblxyXG4gICAgICAgIC8vIHJldHJpZXZlIHRoZSBtZXRob2QgZGVmaW5pdGlvbnNcclxuICAgICAgICBsZXQgbWV0YU1ldGhvZHMgPSBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGFEYXRhLmZpbHRlck1ldGFJdGVtcyhtZXRob2RzTWV0YUluZm8sIFttZXRhTmFtZV0pO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgZGljdGlvbmFyeSBvZiBhdmFpbGFibGUgbWV0aG9kc1xyXG4gICAgICAgIGxldCBtZXRob2RTZXQgPSB7fTtcclxuXHJcbiAgICAgICAgY29tcG9uZW50TWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHsgbWV0aG9kU2V0W21ldGhvZC5icm93c2VOYW1lXSA9IG1ldGhvZCB9KTtcclxuICAgICAgICBtZXRhTWV0aG9kcy5mb3JFYWNoKChtZXRhTWV0aG9kKSA9PiB7IFxyXG4gICAgICAgICAgICBxdWlja0NvbW1hbmRzLnB1c2gobmV3IE1hcHBDb2NrcGl0UXVpY2tDb21tYW5kUGFyYW1ldGVyKG1ldGFNZXRob2QuUmVmLCBtZXRhTWV0aG9kLlRvb2x0aXAsIG1ldGFNZXRob2QuSW1hZ2VOYW1lKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIG5vdGlmeSBpbnZhbGlkIG9yIHVua25vd24gbWV0aG9kc1xyXG4gICAgICAgIGxldCB1bmtub3duTWV0aG9kcyA9IHF1aWNrQ29tbWFuZHMuZmlsdGVyKChxdWlja0NvbW1hbmQpID0+IHsgcmV0dXJuIG1ldGhvZFNldFtxdWlja0NvbW1hbmQubmFtZV0gPT09IHVuZGVmaW5lZCB9KTtcclxuICAgICAgICBpZiAodW5rbm93bk1ldGhvZHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvLnJldHJpZXZlUXVpY2tDb21tYW5kcyA6IG1ldGEgaW5mbyByZWZlcmVuY2VzIHVua25vd24gbWV0aG9kcyAlb1wiLCB1bmtub3duTWV0aG9kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBxdWlja0NvbW1hbmRzO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyByZWFkTWV0aG9kcyhtZXRhSW5mbzogYW55LCBwcm9wZXJ0eTogQXJyYXk8c3RyaW5nPiwgbWV0aG9kOiBBcnJheTxzdHJpbmc+KTogb2JqZWN0IHtcclxuXHJcbiAgICAgICAgbGV0IG1ldGFDb25maWcgPSBwcm9wZXJ0eVswXTtcclxuICAgICAgICBsZXQgbWV0YUNvbmZpZ1N0cnVjdHVyZSA9IHByb3BlcnR5WzFdO1xyXG5cclxuICAgICAgICAvLyBnZXQgdGhlIGNvbW1hbmRzIG1ldGEgaW5mb3NcclxuICAgICAgICBpZiAobWV0YUluZm9bbWV0YUNvbmZpZ10gPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICByZXR1cm4ge307XHJcbiAgICAgICAgbGV0IG1ldGhvZHNNZXRhSW5mbyA9IG1ldGFJbmZvW21ldGFDb25maWddW21ldGFDb25maWdTdHJ1Y3R1cmVdO1xyXG5cclxuICAgICAgICAvLyByZXRyaWV2ZSB0aGUgbWV0aG9kIGRlZmluaXRpb25zXHJcbiAgICAgICAgbGV0IG1ldGFNZXRob2RzID0gTWFwcENvY2twaXRDb21wb25lbnRNZXRhRGF0YS5maWx0ZXJNZXRhSXRlbXMobWV0aG9kc01ldGFJbmZvLCBtZXRob2QpO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgZGljdGlvbmFyeSBvZiBhdmFpbGFibGUgbWV0aG9kc1xyXG4gICAgICAgIGxldCBtZXRhTWV0aG9kU2V0ID0ge307XHJcbiAgICAgICAgbWV0YU1ldGhvZHMuZm9yRWFjaCgobWV0YU1ldGhvZCkgPT4geyBtZXRhTWV0aG9kU2V0W21ldGFNZXRob2QuUmVmXSA9IG1ldGFNZXRob2QgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBtZXRhTWV0aG9kU2V0O1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgYSBtZXRob2RzIGRpc3BsYXkgbmFtZVxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2R9IG1ldGhvZFxyXG4gICAgICogQHBhcmFtIHsqfSBhcmcxXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm9cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHVwZGF0ZU1ldGhvZERpc3BsYXlOYW1lKG1ldGhvZDogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QsIG1ldGFNZXRob2RJbmZvOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIGlmIChtZXRhTWV0aG9kSW5mbyAmJiBtZXRhTWV0aG9kSW5mby5EaXNwbGF5TmFtZSkge1xyXG4gICAgICAgICAgICBtZXRob2QuZGlzcGxheU5hbWUgPSBtZXRhTWV0aG9kSW5mby5EaXNwbGF5TmFtZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWFkcyBhbmQgdXBkYXRlcyBtZXRob2QgcGFyYW1ldGVyIGVudW1zXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZH0gbWV0aG9kXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm9cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJlYWRNZXRob2RQYXJhbWV0ZXJFbnVtcyhtZXRob2Q6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLCBtZXRhRGF0YTogYW55KTogYW55IHtcclxuXHJcbiAgICAgICAgbGV0IG1ldGhvZFBhcmFtZXRlcnMgPSBtZXRob2QuaW5wdXRQYXJhbWV0ZXJzO1xyXG5cclxuICAgICAgICAvLyBnZXQgYXZhaWxhYmxlIGVudW0gbWV0aG9kIHBhcmFtZXRlciBkZWZzIFxyXG4gICAgICAgIGxldCBtZXRhTWV0aG9kUGFyYW1ldGVyRW51bVR5cGVEZWZpbml0aW9ucyA9IE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyLmdldEluc3RhbmNlKCkucmVhZE1ldGFFbnVtTWV0aG9kUGFyYW1ldGVyRGVmaW5pdGlvbnMobWV0aG9kLCBtZXRhRGF0YSk7XHJcblxyXG4gICAgICAgIC8vIGZpbmQgbWF0Y2hpbmcgcGFyYW1ldGVyXHJcbiAgICAgICAgbGV0IG1hdGNoaW5nTWV0aG9kUGFyYW1ldGVycyA9IG1ldGhvZFBhcmFtZXRlcnMuZmlsdGVyKChtZXRob2RQYXJhbWV0ZXIpID0+IHsgcmV0dXJuIG1ldGFNZXRob2RQYXJhbWV0ZXJFbnVtVHlwZURlZmluaXRpb25zW21ldGhvZFBhcmFtZXRlci5uYW1lXSB9KTtcclxuICAgICAgICAvLyBzZXQgdGhlIGVudW0gZGVmaW5pdGlvbnMgZm9yIHRoZSBtYXRjaGluZyBwYXJhbWV0ZXJzXHJcbiAgICAgICAgbWF0Y2hpbmdNZXRob2RQYXJhbWV0ZXJzLmZvckVhY2goKG1hdGNoaW5nTWV0aG9kUGFyYW1ldGVyKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIHNldCB0aGUgZW51bSBkZWZpbml0aW9uXHJcbiAgICAgICAgICAgIG1hdGNoaW5nTWV0aG9kUGFyYW1ldGVyLmVudW1UeXBlID0gbWV0YU1ldGhvZFBhcmFtZXRlckVudW1UeXBlRGVmaW5pdGlvbnNbbWF0Y2hpbmdNZXRob2RQYXJhbWV0ZXIubmFtZV07XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvIC0gc2V0IGVudW0gaW5mbyAlbyBmb3IgJW9cIiwgbWF0Y2hpbmdNZXRob2RQYXJhbWV0ZXIuZW51bVR5cGUsIG1ldGhvZC5icm93c2VOYW1lICsgXCIuXCIgKyBtYXRjaGluZ01ldGhvZFBhcmFtZXRlci5uYW1lKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mbywgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvIH0iXX0=