(function () {
    'use strict';

    var jsPrepare = {

        createWidgetJS: function createWidgetJS(templateJS, compoundWidget, childWidgetsList, Utils, DataTypes) {
            var newJS = templateJS.replace(/__WIDGET_LIBRARY__/g, compoundWidget.library),
                ctrl = Utils.control.setTab('    ');

            newJS = newJS.replace(/__WIDGET_NAME__/g, compoundWidget.name);

            // widget dependencies, noted as @requires
            var dep = '',
                i = -1,
                l = Object.keys(childWidgetsList).length;
            for (var widgetType in childWidgetsList) {
                i += 1;
                dep += ctrl.tab(1) + '* @requires ' + widgetType + ((i < l - 1) ? ctrl.lf : '');
            }
            newJS = newJS.replace('__DEPENDENCIES__', dep);

            // custom defined properties, written as meta data
            var props = '',
                prop;
            for (var key in compoundWidget.customProps) {
                prop = compoundWidget.customProps[key];
                props += ((props !== '') ? ctrl.tab(1) : '') + '/** ' + ctrl.lf;
                if (prop.required === true) {
                    props += ctrl.tab(1) + '* @cfg {' + prop.type + '} ' + prop.name + ' (required)' + ctrl.lf;
                } else {
                    props += ctrl.tab(1) + '* @cfg {' + prop.type + '} ' + prop.name + ((prop.defaultValue !== undefined) ? '=' + _parseDefaultValueForMeta(prop.defaultValue, prop.type, DataTypes) : '') + ' ' + ctrl.lf;
                }
                props += ctrl.tab(1) + '* @iatStudioExposed ' + ctrl.lf;
                if (prop.xsiType === 'BindableProperty') {
                    props += ctrl.tab(1) + '* @bindable ' + ctrl.lf;
                }
                props += ctrl.tab(1) + '* @iatCategory ' + ((prop.category) ? prop.category : 'Behavior') + ' ' + ctrl.lf;
                if (prop.readOnly) {
                    props += ctrl.tab(1) + '* @readonly ' + ctrl.lf;
                    props += ctrl.tab(1) + '* @not_projectable ' + ctrl.lf;
                }
                props += ctrl.tab(1) + '* ' + prop.description + '  ' + ctrl.lf;
                props += ctrl.tab(1) + '*/ ' + ctrl.lf;
            }
            newJS = newJS.replace('/*__CUSTOM_PROPS__*/', props);

            var mapping = '';
            if (Object.keys(compoundWidget.customProps).length > 0) {
                for (var name in compoundWidget.customProps) {
                    var property = compoundWidget.customProps[name];
                    if (Array.isArray(property.accumulatedMappings)) {
                        mapping += ((mapping !== '') ? ', ' : '') + ctrl.lf + ctrl.tab(3) + property.name + ': { ';
                        for (var j = 0; j < property.accumulatedMappings.length; j += 1) {
                            mapping += (j > 0 ? ', \'' : '\'') + property.accumulatedMappings[j]['$'].widget + '\': \'' + property.accumulatedMappings[j]['$'].property + '\'';
                        }
                        mapping += ' }';
                    }
                }
            }
            newJS = newJS.replace('//__CUSTOM_MAPPING__', mapping);

            let methods = '';
            for (var eventName in compoundWidget.customEvents) {
                const event = compoundWidget.customEvents[eventName];
                if (!event.mappings) {
                    let args = '',
                        funcArgs = '';
                    if (event.arguments) {
                        for (var argName in event.arguments) {
                            args += argName + ': ' + argName + ', ';
                        }
                        args = args.replace(/,\s$/, '');
                        funcArgs = Object.keys(event.arguments).join(', ');
                    }
                    const actionName = event.triggerAction ? event.triggerAction : 'Trigger' + event.name;
                    methods += ctrl.lf + ctrl.tab(1) + 'p.' + actionName;
                    methods += ' = function (' + funcArgs + ') { ';
                    methods += 'this.createEvent(\'' + event.name + '\', { ' + args + ' }).dispatch(false);';
                    methods += ' };';
                }
            }

            var setter = '',
                getter = '',
                defaultSettings = '',
                initialCalls = '';
            for (var propName in compoundWidget.customProps) {
                prop = compoundWidget.customProps[propName];
                if (Array.isArray(prop.mappings)) {
                    setter += ctrl.lf + ctrl.tab(1) + 'p.' + Utils.setter(propName) + ' = function (value) { ';
                    setter += 'this.settings[\'' + propName + '\'] = value; this.setChildProps(\'' + propName + '\', value);';
                    setter += ' };';
                }
                if (prop.defaultValue !== undefined && !prop.required) {
                    var parsed = Utils.parseValueForJS(prop.defaultValue, prop.type);
                    if (parsed !== undefined && parsed !== 'null') {
                        defaultSettings += ((defaultSettings !== '') ? ',' : '') + ctrl.lf + ctrl.tab(3) + prop.name + ': ' + parsed;
                    }
                }
                if (prop.xsiType === 'LocalProperty') {
                    initialCalls += ctrl.lf + ctrl.tab(2) + 'this.data[\'' + prop.name + '\'] = this.settings[\'' + prop.name + '\'];';
                    setter += ctrl.lf + ctrl.tab(1) + 'p.' + prop.setAction + ' = function (value) { ';
                    setter += 'var oldValue = this.data[\'' + propName + '\']; ';
                    setter += 'this.data[\'' + propName + '\'] = Types.parseValue(value, \'' + prop.type + '\'); ';
                    setter += 'if (this.data[\'' + propName + '\'] !== oldValue) { this.createEvent(\'' + prop.changedEvent + '\', { value: this.data[\'' + propName + '\'] }).dispatch(false); }';
                    setter += ' };';
                    getter += ctrl.lf + ctrl.tab(1) + 'p.' + prop.getAction + ' = function () { ';
                    getter += 'return this.data[\'' + propName + '\'];';
                    getter += ' };';
                }
            }
            newJS = newJS.replace('//__METHODS__', methods);
            newJS = newJS.replace('//__SETTER__', setter);
            newJS = newJS.replace('//__GETTER__', getter);
            newJS = newJS.replace('//__DEFAULT_SETTINGS__', defaultSettings);
            newJS = newJS.replace('//__INITIAL_CALLS__', initialCalls);

            return newJS;
        } 
    };

    function _parseDefaultValueForMeta(value, type, DataTypes) {
        if (DataTypes.isString(type)) {
            return '\'' + value + '\'';
        } else if (DataTypes.isObject(type) && value === '') {
            return "''";
        } else {
            return value;
        }
    }

    module.exports = jsPrepare;

})();
