(function () {
    'use strict';

    var path = require('path'),
        grunt = require('grunt'),
        basePath = path.resolve(__dirname, '../'),
        libraryUtils = require(path.resolve(basePath, 'iat/libraryUtils')),
        XMLLint = require(path.resolve(basePath, 'iat/XMLLint')),
        utils = require(path.resolve(basePath, 'iat/utils')),
        DataTypes = require(path.resolve(basePath, 'iat/DataTypes')),
        typesCheckSchemaPath = path.resolve(basePath, 'schemes/TypesCheck.xsd'),
        xmlPath = 'temp/datatypeTest/TypesCheck.xml';

    function validateDatatypeWithXMLLint(type, value) {
        var xml = `<?xml version="1.0"?>
        <TypeCheck xmlns="http://www.br-automation.com/iat2021/typeDefinition/v1" value_${type}="${value}" />`;

        grunt.file.write(xmlPath, xml);
        let result = XMLLint.check(grunt, typesCheckSchemaPath, xmlPath, { fail: false, debug: false, out: false }, basePath);

        return result === 0;
    }

    var basicTypes = {
        // these datatypes cover appr. 2/3 of all usecases and are implemented to be fast without file write
            types: ['String', 'Boolean', 'Integer', 'Number', 'StyleReference'],
            IntegerRegex: new RegExp('^[-+]?(((?:[0-9]{1,}))|0)$'),
            NumberRegex: new RegExp('^[-+]?(((?:[0-9.]{1,}))|0)$'),
            isMember: function (type) {
                return basicTypes.types.indexOf(type) !== -1;
            },
            validate: function (type, value) {
                switch (type) {
                    case 'Boolean':
                        return ['true', 'false'].indexOf(value) !== -1;
                    case 'Integer':
                        return basicTypes.IntegerRegex.test(value);
                    case 'Number':
                        return basicTypes.NumberRegex.test(value) && !isNaN(value);
                    case 'StyleReference':
                        return true;
                    case 'String':
                        return true;
                }
            }
        },
        arrayTypes = {
            numCheck: function (cur) {
                return !isNaN(cur);
            },
            boolCheck: function (cur) {
                return [true, false].indexOf(cur) !== -1;
            },
            strCheck: function (cur) {
                return utils.isString(cur);
            },
            dateTimeRegex: new RegExp('[0-9:TZ+-.]'),
            dateCheck: function (cur) {
                return utils.isString(cur) && arrayTypes.dateTimeRegex.test(cur);
            },
            validate: function (type, value) {
                var arValue;
                
                // this first test will cover 99% of all use cases
                if (value === '[]') {
                    return true;
                }
                // basic test for array
                if (value.substring(0, 1) !== '[' || value.substr(value.length - 1, 1) !== ']') {
                    return false;
                }
                arValue = utils.parsePseudoJSON(value);
                if (!arValue) {
                    grunt.log.writeln('parse failed');
                    return false;
                }
                if (!Array.isArray(arValue)) {
                    return false;
                }
                switch (type) {
                    case 'NumberArray1D':
                        return arValue.every(arrayTypes.numCheck);
                    case 'BooleanArray1D':
                        return arValue.every(arrayTypes.boolCheck);
                    case 'StringArray1D':
                        return arValue.every(arrayTypes.strCheck);
                    case 'DateTimeArray1D':
                        return arValue.every(arrayTypes.dateCheck);
                    default:
                        return true; // no additional test for unknown datatype
                }
            }
        };

    var patchCoWi = {

        validateDatatype: function (type, value) {
            if (basicTypes.isMember(type)) {
                return basicTypes.validate(type, value);
            } else if (DataTypes.isArrayType(type)) {
                return arrayTypes.validate(type, value);
            } else {
                return validateDatatypeWithXMLLint(type, value);
            }
        },

        /**
        * @method run
        * @param {Object} baseCompoundWidget object with info about system.widgets.CompoundWidget
        * @param {Object} compoundWidget object containing info of the CoWi
        * @param {Object} childInfos object with info of all child widget types of the CoWi
        * @param {Object} grunt grunt module
        * @param {Boolean} debug
        * @return {Object}
        */
        run: function run(baseCompoundWidget, compoundWidget, childInfos, grunt, debug, targetFolder) {

            debug = (debug !== undefined) ? debug : false;
            targetFolder = (targetFolder !== undefined) ? targetFolder : __dirname;
            xmlPath = path.resolve(targetFolder, xmlPath);

            this.grunt = grunt;
            this.debug = debug;
            var widgetInfo = _createWidgetInfo(baseCompoundWidget, compoundWidget, childInfos);

            // set values of common properties (e.g. width/height) as default values of compound widget
            _overwriteDefaults(widgetInfo.properties, widgetInfo.name, compoundWidget.commonProps);

            _patchPropertyInfo(widgetInfo.properties, compoundWidget, childInfos);
            _patchEventInfo(widgetInfo.events, compoundWidget, childInfos);
            _patchLocalPropertyEvents(widgetInfo.events, compoundWidget);
            _patchActionInfo(widgetInfo.methods, compoundWidget, childInfos);
            _patchLocalPropertyActions(widgetInfo.methods, compoundWidget);
            _patchTriggerEventActions(widgetInfo.methods, compoundWidget);
            _patchEventBindingInfo(widgetInfo, compoundWidget, childInfos);

            patchCoWi.writeDebugFile('C:/Temp/logcompoundWidgets/' + widgetInfo.name + '.json', JSON.stringify(widgetInfo));

            return widgetInfo;
        },
        failWithWarning: function failWithWarning(message) {
            if (patchCoWi.debug) {
                this.grunt.log.writeln(message.yellow);
            }
            this.grunt.fail.warn(message);
        },
        writeDebugFile: function writeDebugFile(path, content) {
            if (patchCoWi.debug) {
                this.grunt.log.writeln(('write ' + path).cyan);
                this.grunt.file.write(path, content);
            }
        }
    };

    function _createWidgetInfo(baseCompoundWidget, compoundWidget, childInfos) {
        var widgetInfo = baseCompoundWidget;
        widgetInfo.meta.superClass = baseCompoundWidget.name;
        widgetInfo.name = compoundWidget.type;
        widgetInfo.meta.filePath = compoundWidget.filePath + '.js';
        widgetInfo.meta.visible = 'true';
        widgetInfo.meta.isCompound = true;
        widgetInfo.meta.license = 'undefined';
        widgetInfo.meta.inheritance.unshift(compoundWidget.type);
        widgetInfo.categories = { 'Category': ['Compound'] };
        if (compoundWidget.commonProps.category) {
            widgetInfo.categories.Category.push(compoundWidget.commonProps.category);
        }

        var childWidgetsList = Object.keys(childInfos);
        widgetInfo.meta.requires = childWidgetsList;
        widgetInfo.dependencies = {
            files: [],
            widgets: childWidgetsList.map(function (item) {
                return utils.className2File(item);
            })
        };
        widgetInfo.dependencies.widgets.unshift(compoundWidget.filePath + '.js');

        var description = compoundWidget.commonProps.description;
        if (description) {
            widgetInfo.descriptions = {
                short: description,
                de: description,
                en: description
            };
        }

        return widgetInfo;
    }

    function _overwriteDefaults(widgetProperties, widgetName, commonProps) {
        for (var i = 0; i < widgetProperties.length; i += 1) {
            var prop = widgetProperties[i];
            if (commonProps[prop.name] !== undefined) {
                prop['defaultValue'] = commonProps[prop.name];
                prop.owner = widgetName;
            }
        }
    }

    function _isAllowedPropertyType(type) {
        return ['String', 'Boolean', 'Number'].indexOf(type) !== -1;
    }

    function _patchPropertyInfo(widgetProperties, compoundWidget, childInfos) {
        for (var key in compoundWidget.customProps) {
            var prop = compoundWidget.customProps[key],
                obj = {
                    name: prop.name,
                    type: prop.type,
                    initOnly: prop.xsiType === 'NonBindableProperty',
                    localizable: prop.localizable,
                    editableBinding: false,
                    readOnly: prop.readOnly,
                    required: prop.required,
                    owner: compoundWidget.type,
                    projectable: prop.projectable !== false && prop.xsiType !== 'StructureBindableProperty',
                    description: prop.description,
                    category: (prop.category !== undefined) ? '' + prop.category : 'Behavior',
                    mappings: prop.mappings
                };

            _validateProperty(obj, prop.xsiType);

            if (prop.xsiType === 'StructureBindableProperty') {
                obj.isStruct = true;
                obj.hide = true;
            }
            if (prop.defaultValue !== undefined && prop.xsiType !== 'StructureBindableProperty') {
                var result = patchCoWi.validateDatatype(obj.type, prop.defaultValue);
                if (!result) {
                    patchCoWi.failWithWarning(prop.xsiType + ' ' + compoundWidget.name + '.' + obj.name + '.defaultValue=' + JSON.stringify(prop.defaultValue) + ' does not match datatype "' + obj.type + '"');
                }
            }

            if (prop.defaultValue !== undefined && !prop.required) {
                if (DataTypes.isPath(prop.type)) {
                    prop.defaultValue = libraryUtils.patchMediaPath(prop.defaultValue, compoundWidget.library);
                }
                if ((DataTypes.isObject(prop.type) && !utils.isJSONObjectInput(prop.defaultValue)) || prop.xsiType === 'StructureBindableProperty') {
                    prop.defaultValue = '';
                }
                obj.defaultValue = prop.defaultValue.replace(/'/g, '&apos;');
            }

            if (prop.typeRefId) {
                obj.typeRefId = prop.typeRefId;
            }
            if (prop.nodeRefId) {
                obj.nodeRefId = prop.nodeRefId;
            }
            if (prop.xsiType === 'LocalProperty') {
                obj.setAction = prop.setAction;
                obj.getAction = prop.getAction;
                obj.public = prop.public;
                if (!_isAllowedPropertyType(prop.type)) {
                    patchCoWi.failWithWarning("LocalProperty with unsupported datatype: '" + prop.type + "'");
                }
            } else {
                if (Array.isArray(obj.mappings)) {
                    _validatePropertyMapping(obj, prop.xsiType, compoundWidget, childInfos);
                } else {
                    patchCoWi.failWithWarning("Property without mappings: '" + obj.name + "'");
                }
            }
            widgetProperties.push(obj);
        }
    }

    function _validateProperty(prop, propType) {
        if (propType === 'BindableProperty' && prop.required === true) {
            // currently this case will not occur, as it is forbidden in xsd
            patchCoWi.failWithWarning('BindableProperty (' + prop.name + ') is not allowed to be required!');
        }
    }

    function _validatePropertyMapping(prop, propType, compoundWidget, childInfos) {
        for (const mapping of prop.mappings) {
            var mappedId = mapping['$'].widget,
                mappedProperty = mapping['$'].property,
                childWidget = compoundWidget.widgets[mappedId];

            if (childWidget === undefined) {
                patchCoWi.failWithWarning('Invalid Mapping for ' + propType + " '" + prop.name + "'. Widget '" + mappedId + "' does not exist!");
            } else {
                var childWidgetType = childWidget.type;

                var childProperty = childInfos[childWidgetType].properties.find(property => property.name === mappedProperty);
                if (childProperty === undefined) {
                    patchCoWi.failWithWarning('Invalid Mapping for ' + propType + " '" + prop.name + "': widget '" + mappedId + "' has no property '" + mappedProperty + "'!");
                } else if (!prop.initOnly && childProperty.initOnly) {
                    patchCoWi.failWithWarning('Invalid Mapping for ' + propType + " '" + prop.name + "': property '" + mappedProperty + "' of '" + mappedId + "' is not bindable!");
                }
            }
        }
    }

    function _patchEventInfo(widgetEvents, compoundWidget, childInfos) {
        for (var key in compoundWidget.customEvents) {
            var event = compoundWidget.customEvents[key],
                obj = {
                    name: event.name,
                    description: event.description
                };
            if (event.mappings) {
                obj.mappings = event.mappings;
                var mappedId = obj.mappings[0]['$'].widget,
                    mappedEvent = obj.mappings[0]['$'].event,
                    childWidget = compoundWidget.widgets[mappedId];
                if (childWidget === undefined) {
                    patchCoWi.failWithWarning("Invalid Mapping for Event '" + obj.name + "': widget '" + mappedId + "' does not exist!");
                } else {
                    var childWidgetType = childWidget.type;
                    var childEvent = childInfos[childWidgetType].events.find(event => event.name === mappedEvent);
                    if (childEvent === undefined) {
                        patchCoWi.failWithWarning("Invalid Mapping for Event '" + obj.name + "': event '" + mappedEvent + "' of widget '" + mappedId + "' does not exist!");
                    } else {
                        obj.parameter = childEvent.parameter;
                    }
                }
            } else if (event.arguments) {
                obj.parameter = _arguments2Paramters(event.arguments);
            }
            widgetEvents.push(obj);
        }
    }

    function _arguments2Paramters(args) {
        let parameters = [];
        let index = 0;
        for (var argName in args) {
            let arg = args[argName];
            arg.index = index;
            index += 1;
            parameters.push(arg);
        }
        return parameters;
    }

    function _patchTriggerEventActions(widgetActions, compoundWidget) {

        for (var key in compoundWidget.customEvents) {
            const event = compoundWidget.customEvents[key];
            if (!event.mappings) {
                const actionName = event.triggerAction ? event.triggerAction : 'Trigger' + event.name;
                let triggerAction = {
                    name: actionName,
                    originalName: actionName,
                    description: 'Action to trigger event ' + '"' + event.name + '"',
                    read: false,
                    parameter: [],
                    iatStudioExposed: true,
                    public: false
                };
                if (event.arguments) {
                    triggerAction.parameter = _arguments2Paramters(event.arguments);
                }
                if (isUsedActionName(triggerAction.name, widgetActions)) {
                    patchCoWi.failWithWarning('UserEvent: name of trigger action (' + triggerAction.name + ') already used!');
                }
                widgetActions.push(triggerAction);
            }
        }
    }

    function isAllowedEventName(eventName) {
        return ['click', 'disabledclick', 'enablechanged', 'visiblechanged'].indexOf(eventName.toLowerCase()) === -1;
    }

    function isUsedEventName(eventName, widgetEvents) {
        var usedAction = widgetEvents.find(event => event.name === eventName);
        return usedAction !== undefined;
    }

    function _patchLocalPropertyEvents(widgetEvents, compoundWidget) {
        for (var key in compoundWidget.customProps) {
            var prop = compoundWidget.customProps[key];

            if (prop.xsiType === 'LocalProperty') {
                if (!prop.changedEvent) {
                    patchCoWi.failWithWarning('LocalProperty without event name!');
                } else if (!isAllowedEventName(prop.changedEvent)) {
                    patchCoWi.failWithWarning('LocalProperty: event name "' + prop.changedEvent + '" is not allowed!');
                } else if (isUsedEventName(prop.changedEvent, widgetEvents)) {
                    patchCoWi.failWithWarning('LocalProperty: event name (' + prop.changedEvent + ') already in use!');
                } else {
                    var event = {
                        name: prop.changedEvent,
                        description: 'fired when property «' + prop.name + '» is changed',
                        parameter: [
                            {
                                name: 'value',
                                type: prop.type,
                                index: 0,
                                description: 'current value of ' + prop.name,
                                optional: false
                            }
                        ],
                        iatStudioExposed: true,
                        public: prop.public
                    };
                    widgetEvents.push(event);
                }
            }
        }
    }

    function isAllowedActionName(actionName) {
        return ['setenable', 'setvisible', 'showtooltip'].indexOf(actionName.toLowerCase()) === -1;
    }

    function isUsedActionName(actionName, widgetActions) {
        var usedAction = widgetActions.find(action => action.name === actionName);
        return usedAction !== undefined;
    }

    function _patchLocalPropertyActions(widgetActions, compoundWidget) {
        for (var key in compoundWidget.customProps) {
            var prop = compoundWidget.customProps[key];

            if (prop.xsiType === 'LocalProperty') {
                if (!prop.setAction) {
                    patchCoWi.failWithWarning('LocalProperty without setAction!');
                } else if (!isAllowedActionName(prop.setAction)) {
                    patchCoWi.failWithWarning('LocalProperty: name of setAction (' + prop.setAction + ') is not allowed!');
                } else if (isUsedActionName(prop.setAction, widgetActions)) {
                    patchCoWi.failWithWarning('LocalProperty: name of setAction (' + prop.setAction + ') already used!');
                }
                if (!prop.getAction) {
                    patchCoWi.failWithWarning('LocalProperty without getAction!');
                } else if (!isAllowedActionName(prop.getAction)) {
                    patchCoWi.failWithWarning('LocalProperty: name of getAction (' + prop.getAction + ') is not allowed!');
                } else if (isUsedActionName(prop.getAction, widgetActions)) {
                    patchCoWi.failWithWarning('LocalProperty: name of getAction (' + prop.getAction + ') already used!');
                }
                var setAction = {
                        name: prop.setAction,
                        originalName: prop.setAction,
                        setterFor: prop.name,
                        description: 'Action to set property «' + prop.name + '»',
                        read: false,
                        parameter: [
                            {
                                name: 'value',
                                type: prop.type,
                                index: 0,
                                description: '',
                                optional: false
                            }
                        ],
                        iatStudioExposed: true,
                        public: prop.public
                    },
                    getAction = {
                        name: prop.getAction,
                        originalName: prop.getAction,
                        getterFor: prop.name,
                        description: 'Action to get property «' + prop.name + '»',
                        read: true,
                        iatStudioExposed: true,
                        public: prop.public
                    };
                widgetActions.push(setAction, getAction);
            }
        }
    }

    function _patchActionInfo(widgetActions, compoundWidget, childInfos) {
        for (var key in compoundWidget.customActions) {
            var action = compoundWidget.customActions[key],
                obj = {
                    name: action.name,
                    originalName: action.name,
                    description: action.description,
                    iatStudioExposed: true,
                    mappings: action.rawMappings,
                    read: false
                };
            _patchActionParameterInfo(obj, action);

            let firstChildAction;
            for (const mapping of action.mappings) {
                const childWidget = compoundWidget.widgets[mapping.widget];
                if (!childWidget) {
                    patchCoWi.failWithWarning("Invalid Mapping for Action '" + obj.name + "': widget '" + mapping.widget + "' does not exist!");
                }
                const childWidgetType = childWidget.type;

                var childAction = childInfos[childWidgetType].methods.find(action => action.iatStudioExposed && action.name === mapping.action);
                if (childAction === undefined) {
                    patchCoWi.failWithWarning("Invalid Mapping for Action '" + obj.name + "': widget '" + mapping.widget + "' has no action '" + mapping.action + "'!");
                }
                if (!firstChildAction) {
                    firstChildAction = childAction;
                }
                if (action.arguments && mapping.arguments) {
                    // read action not supported with arguments mappings
                    if (childAction.read) {
                        patchCoWi.failWithWarning("Invalid Mapping for Action '" + obj.name + "' with mapped action '" + mapping.action + "'. Read-Actions not supported with argument mapping.");
                    }
                    // check if all parameters of mapped widget-action are mapped
                    for (const para of childAction.parameter) {
                        if (!para.optional && !mapping.arguments.some(arg => arg.mapTo === para.name)) {
                            patchCoWi.failWithWarning("Invalid Mapping for Action '" + obj.name + "'. required argument '" + para.name + "' of action '" + mapping.action + "' of widget '" + mapping.widget + "' not mapped!");
                        }
                    }
                    // check argument mappings names + signature
                    for (const argMapping of mapping.arguments) {
                        var childActionArg = childAction.parameter.find(para => para.name === argMapping.mapTo);
                        if (childActionArg === undefined) {
                            patchCoWi.failWithWarning("Invalid Mapping for Action '" + obj.name + "': argument '" + argMapping.mapTo + "' of action '" + mapping.action + "' of widget '" + mapping.widget + "' does not exist!");
                        }
                        if (action.arguments[argMapping.name] === undefined) {
                            patchCoWi.failWithWarning("Invalid Mapping for Action '" + obj.name + "': argument mapping of not defined Argument '" + argMapping.name + "'");
                        }
                        if (childActionArg.type !== action.arguments[argMapping.name].type) {
                            patchCoWi.failWithWarning("Invalid Mapping for Action '" + obj.name + "': datatype of '" + argMapping.mapTo + "' in widget action '" + mapping.action + "' does not match '" + action.arguments[argMapping.name].type + "'!");
                        }
                        // kann glaub ich nicht eintreten, weil vorher schon alle childAction parameter getestet werden
                        if (action.arguments[argMapping.name].optional && !childActionArg.optional) {
                            patchCoWi.failWithWarning("Invalid action argument mapping for '" + argMapping.name + "' in '" + obj.name + "'. Argument '" + argMapping.mapTo + "' of '" + mapping.action + "' is required!");
                        }
                    }
                } else {

                    if (action.mappings[0].action !== mapping.action) {
                        patchCoWi.failWithWarning("Invalid Mapping for Action '" + obj.name + "': action names do not match!");
                    }
                    if (!actionParametersEquals(firstChildAction.parameter, childAction.parameter)) {
                        patchCoWi.failWithWarning("Invalid Mapping for Action '" + obj.name + "':action signatures do not match!");
                    }
                    obj.parameter = childAction.parameter;
                    obj.read = childAction.read;
                }
            }
            widgetActions.push(obj);
        }
    }

    function _patchActionParameterInfo(obj, action) {
        if (action.arguments) {
            obj.parameter = [];
            var index = 0;
            for (const argName in action.arguments) {
                var parameter = {
                    name: argName,
                    type: action.arguments[argName].type,
                    index: index++,
                    description: action.arguments[argName].description,
                    optional: action.arguments[argName].optional
                };
                // check if there is a mapping for argument
                if (action.mappings[0].arguments === undefined ||
                    !action.mappings.some(mapping => mapping.arguments.some(arg => arg.name === parameter.name))) {
                    patchCoWi.failWithWarning("Invalid Mapping for Action '" + action.name + "': missing argument mapping for Argument '" + parameter.name + "'");
                }
                obj.parameter.push(parameter);
            }
        }
    }

    function actionParametersEquals(lhs, rhs) {
        if (lhs === rhs) {
            return true;
        }
        if (lhs.length !== rhs.length) {
            return false;
        }
        for (var i = 0; i < lhs.length; i += 1) {
            if (lhs[i].name !== rhs[i].name || lhs[i].type !== rhs[i].type) {
                return false;
            }
        }
        return true;
    }

    function _patchEventBindingInfo(widgetInfo, compoundWidget, childInfos) {
        widgetInfo.eventBindings = compoundWidget.eventBindings;
        if (Array.isArray(widgetInfo.eventBindings) && Array.isArray(widgetInfo.eventBindings[0].EventBinding)) {
            widgetInfo.eventBindings[0].EventBinding.forEach(function ActionTargetHandler(eventBinding) {

                var ebId = (eventBinding['$']) ? eventBinding['$'].id : 'no id defined',
                    Source = eventBinding['Source'][0]['$'],
                    EventHandlers = eventBinding.EventHandler,
                    Operands = eventBinding.Operand;

                _validateSource(widgetInfo, compoundWidget, ebId, childInfos, Source);

                var Actions = _findActions(EventHandlers),
                    OperandTargets = _findTargets(Operands),
                    ActionTargets = _findTargets(Actions);

                patchCoWi.writeDebugFile('C:/Temp/logcompoundWidgets/OperandTargets.json', JSON.stringify(OperandTargets));
                patchCoWi.writeDebugFile('C:/Temp/logcompoundWidgets/ActionTargets.json', JSON.stringify(ActionTargets));

                ActionTargets.concat(OperandTargets).forEach(_validateTarget.bind(null, widgetInfo, compoundWidget, childInfos, ebId));

            });
        }
    }

    function _findTargets(Tags) {
        var targets = [];
        if (Array.isArray(Tags)) {

            Tags.forEach(function TagHandler(objTag) {
                if (objTag.ReadTarget) {
                    targets.push(objTag.ReadTarget[0]);
                }
                if (objTag.Target) {
                    targets.push(objTag.Target[0]);
                }
            });
        }

        return targets;
    }

    function _findActions(arEventHandler) {
        var actions = [];
        arEventHandler.forEach(function (EventHandler) {

            if (EventHandler.Action) {
                EventHandler.Action.forEach(function (objAction) {
                    actions = actions.concat(_parseAction(objAction));
                });
            } else if (EventHandler.Parallel) {
                actions = actions.concat(_findParallelActions(EventHandler.Parallel));
            } else if (EventHandler.Sequence) {
                actions = actions.concat(_findSequenceActions(EventHandler.Sequence));
            }
        });
        return actions;
    }

    function _findParallelActions(Parallel) {
        var actions = [];
        if (Parallel[0].Action) {
            Parallel[0].Action.forEach(function (objAction) {
                actions = actions.concat(_parseAction(objAction));
            });
        }
        if (Parallel[0].Sequence) {
            actions = actions.concat(_findSequenceActions(Parallel[0].Sequence));
        }
        return actions;
    }

    function _parseAction(Action) {
        var actions = [];
        actions.push(Action);
        if (Action.Result) {
            actions = actions.concat(_findActions(Action.Result[0].ResultHandler));
        }
        return actions;
    }

    function _findSequenceActions(Sequence) {
        var actions = [];
        Sequence[0].Step.forEach(function (objStep) {

            if (objStep.Action) {
                objStep.Action.forEach(function (objAction) {
                    actions = actions.concat(_parseAction(objAction));
                });
            }
            if (objStep.Parallel) {
                actions = actions.concat(_findParallelActions(objStep.Parallel));
            }
        });
        return actions;
    }

    function _validateSource(widgetInfo, compoundWidget, ebId, childInfos, Source) {

        var sourceType = Source['xsi:type'],
            sourceWidgetType,
            sourceEvent;

        if (sourceType === 'this.Event') {
            sourceWidgetType = compoundWidget.type;
            sourceEvent = widgetInfo.events.find(event => event.name === Source.event);
            if (sourceEvent === undefined) {
                patchCoWi.failWithWarning('Invalid Source in EventBinding "' + ebId + '": event "' + Source.event + '" does not exist for compound widget!');
            }
        } else {
            if (!compoundWidget.widgets[Source.widgetRefId]) {
                patchCoWi.failWithWarning('Invalid Source in EventBinding "' + ebId + '": widget "' + Source.widgetRefId + '" does not exist!');
            }
            sourceWidgetType = compoundWidget.widgets[Source.widgetRefId].type;
            sourceEvent = childInfos[sourceWidgetType].events.find(event => event.name === Source.event);
            if (sourceEvent === undefined) {
                patchCoWi.failWithWarning('Invalid Source in EventBinding "' + ebId + '": event "' + Source.event + '" does not exist for widget "' + Source.widgetRefId + '" (' + sourceWidgetType + ')!');
            }
        }

        Source.type = sourceWidgetType + '.Event';
        delete Source['xsi:type'];
    }

    function _validateTarget(widgetInfo, compoundWidget, childInfos, ebId, objTarget) {
        var Target = objTarget['$'],
            Method = objTarget['Method'][0]['$'],
            targetXsiType = Target['xsi:type'],
            targetDescription = ((targetXsiType === 'widget.Action.Read') ? 'Read' : '') + 'Target',
            targetAction,
            targetWidgetType;

        if (targetXsiType === 'this.Action' || targetXsiType === 'this.Action.Read') {
            Target.type = compoundWidget.type + '.Action';

            targetAction = widgetInfo.methods.find(action => action.iatStudioExposed && action.name === Method.name);
            if (targetAction === undefined) {
                patchCoWi.failWithWarning('Invalid Method in ' + targetDescription + ' in EventBinding "' + ebId + '": method "' + Method.name + '" of compound widget does not exist!');
            }
        } else {

            if (!compoundWidget.widgets[Target.widgetRefId]) {
                patchCoWi.failWithWarning('Invalid ' + targetDescription + ' in EventBinding "' + ebId + '": widget "' + Target.widgetRefId + '" does not exist!');
            }
            targetWidgetType = compoundWidget.widgets[Target.widgetRefId].type;
            Target.type = targetWidgetType + '.Action';

            targetAction = childInfos[targetWidgetType].methods.find(action => action.iatStudioExposed && action.name === Method.name);
            if (targetAction === undefined) {
                patchCoWi.failWithWarning('Invalid Method in ' + targetDescription + ' in EventBinding "' + ebId + '": method "' + Method.name + '" for widget "' + Target.widgetRefId + '" (' + targetWidgetType + ') does not exist!');
            } else {
                if (Array.isArray(targetAction.parameter)) {
                    targetAction.parameter.forEach(function (param) {
                        if (DataTypes.isPath(param.type)) {
                            Method[param.name] = libraryUtils.patchMediaPath(Method[param.name], compoundWidget.library);
                        }
                    });
                }
            }
        }

        delete Target['xsi:type'];

        // check if all parameters of action method exist in child widget action
        for (var key in Method) {
            if (key !== 'name') {
                var targetParam = targetAction.parameter.find(param => param.name === key);
                if (targetParam === undefined) {
                    patchCoWi.failWithWarning('Invalid parameter "' + key + '" for method "' + Method.name + ' in ' + targetDescription + ' in EventBinding "' + ebId + '"');
                }
            }
        }
        // check if all required parameters of child widget action get a value through eventbinding
        if (Array.isArray(targetAction.parameter)) {
            targetAction.parameter.forEach(function (param) {
                if (!param.optional && Method[param.name] === undefined) {
                    patchCoWi.failWithWarning('Missing parameter "' + param.name + '" for method "' + Method.name + ' in Target in EventBinding "' + ebId + '"');
                }
            });
        }
        if (targetXsiType === 'this.Action' || targetXsiType === 'this.Action.Read') {
            Method.type = compoundWidget.type + '.Action.' + Method.name;
        } else {
            Method.type = targetWidgetType + '.Action.' + Method.name;
        }
        delete Method.name;
    }

    module.exports = patchCoWi;

})();
