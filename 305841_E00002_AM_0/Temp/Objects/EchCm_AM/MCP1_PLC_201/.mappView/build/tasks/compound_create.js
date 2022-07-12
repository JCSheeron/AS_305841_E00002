module.exports = function (grunt) {

    'use strict';

    // node modules
    var _modulePath = require('path'),
        _moduleXml2js = require('xml2js'),
        _xmlBuilder = new _moduleXml2js.Builder({ headless: true }),
        _moduleRequire = require('a.require'),
        _xmlConvert = {
            xml2js: _moduleXml2js.parseString,
            js2xml: _xmlBuilder.buildObject.bind(_xmlBuilder)
        },

        // global iat modules
        Utils = _moduleRequire('iat/utils'),
        DataTypes = _moduleRequire('iat/DataTypes'),
        Properties = _moduleRequire('iat/Properties'),
        libraryUtils = _moduleRequire('iat/libraryUtils'),
        debug = false;

    /**
    * @method compound_create
    * @param {String} srcFile path to compound widget xml input (e.g. "C:/dev/examples/CompoundExample.compoundWidget")
    * @param {String} targetFolder directory to write to (e.g. "C:/projects/AS-4.3/Trunk/WidgetTests/Logical/mappView/Widgets")
    * @param {String} corePath directory of brease core (e.g. "C:/Program Files/BrAutomation/AS444/AS/TechnologyPackages/mappView/5.4.9000/IATC/BRVisu") 
    * @param {String} libraryName name of library of compound widget
    */
    grunt.registerTask('compound_create', 'task for creation of compound widgets', function (srcFile, targetFolder, corePath, libraryName, xsltPath, customWidgets, derivedWidgets) {

        // local iat modules
        var xsdPrepare = _moduleRequire('iat/xsdPrepare'),
            jsPrepare = _moduleRequire('iat/jsPrepare'),
            styleParser = _moduleRequire('iat/styleParser'),
            xsltTrans = _moduleRequire('iat/XSLTTransformation'),
            json2xml = _moduleRequire('iat/json2xml'),
            cowiJsPrepare = _moduleRequire('libs/cowi_jsPrepare'),
            patchCoWi = _moduleRequire('libs/cowi_patchObj'),
            childWidgets = _moduleRequire('libs/childWidgets');

        targetFolder = (targetFolder && targetFolder !== 'null') ? targetFolder : _modulePath.resolve(grunt.config('wwwRoot'), '/BRVisu/widgets');
        corePath = (corePath && corePath !== 'null') ? corePath : _modulePath.resolve(grunt.config('basePath'), '../BRVisu');

        if (debug) {
            grunt.log.writeln('srcFile:' + srcFile);
            grunt.log.writeln('targetFolder:' + targetFolder);
            grunt.log.writeln('corePath:' + corePath);
            grunt.log.writeln('libraryName:' + libraryName);
        }

        var breaseWidgets = (corePath.indexOf('wwwRoot') !== -1) ? _modulePath.resolve(corePath, 'widgets') : _modulePath.resolve(corePath, '../../Widgets'); // ATTENTION: this is an assumption, which could change in future
    
        if (!customWidgets || customWidgets === 'null') {
            customWidgets = _modulePath.resolve(srcFile, '../../Logical/mappView/Widgets'); // ATTENTION: this is an assumption, which could change in future
        }
        if (!derivedWidgets || derivedWidgets === 'null') {
            derivedWidgets = targetFolder; // ATTENTION: this is an assumption, which could change in future
        }

        if (debug) {
            grunt.log.writeln('breaseWidgets:' + breaseWidgets);
            grunt.log.writeln('customWidgets:' + customWidgets);
            grunt.log.writeln('derivedWidgets:' + derivedWidgets);
        }
        if (!libraryName) {
            grunt.fail.fatal('missing library name');
        }

        grunt.file.defaultEncoding = 'utf8';

        // read source file
        var coWiXML = grunt.file.read(srcFile);

        _xmlConvert.xml2js(coWiXML, {
            trim: true
        // eslint-disable-next-line no-unused-vars
        }, function (errArg, xmlObj) {
            
            if (debug) {
                _writeFile(_modulePath.resolve('/Temp/mvLog/compoundWidgetXML.json'), JSON.stringify(xmlObj));
            }
            if (xmlObj) {

                // xml of compoundWidget as js object
                var compoundXML = xmlObj['CompoundWidget'], 
                    // compoundWidget infos (path, name, type, properties, etc)
                    widgetObject = _widgetObject(compoundXML, targetFolder, libraryName), 
                    // ancestor (system.widgets.CompoundWidget) widget info (path, name, etc)
                    ancestorObject = _ancestorObject(corePath), 
                    // widget types used in compoundWidget-content (including path, name, etc)
                    arWidgetTypes = Utils.uniqueArray(childWidgets.findUsedWidgetTypes(compoundXML.Widgets[0].Widget)).sort(),
                    childWidgetsList = childWidgets.find(grunt, _modulePath, arWidgetTypes, breaseWidgets, customWidgets, derivedWidgets); 
                    
                // list of all widget types (brease, custom, derived) with their paths as xml for use in content transformation
                var widgetPathMappingFile = _modulePath.resolve(widgetObject.dir, 'content/widgetPathMapping.xml');
                _writeFile(widgetPathMappingFile, _convertToMappingXML(childWidgetsList));

                // child widgets info
                // json of all child widgets (=complete widget info, generated by widget compiler)
                var childInfos = childWidgets.fullInfo(grunt, _modulePath, childWidgetsList);

                if (debug) {
                    _writeFile(_modulePath.resolve('/Temp/mvLog/compoundWidget.json'), JSON.stringify(widgetObject));
                    _writeFile(_modulePath.resolve('/Temp/mvLog/ancestorObject.json'), JSON.stringify(ancestorObject));
                    _writeFile(_modulePath.resolve('/Temp/mvLog/childWidgets.json'), JSON.stringify(childWidgetsList));
                    _writeFile(_modulePath.resolve('/Temp/mvLog/childInfos.json'), JSON.stringify(childInfos));
                }
                if (!childWidgets.validation.run(childInfos)) {
                    grunt.fail.fatal(childWidgets.validation.errorMessage);
                }
                // json of ancestor widget (=complete widget info, generated by widget compiler)
                var ancestorWidget = grunt.file.readJSON(_modulePath.resolve(ancestorObject.metaDir, ancestorObject.name + '.json'));

                // json of compoundWidget as result of ancestorWidget patched with additional info and not as result of a widget compiler
                var widgetInfo = patchCoWi.run(ancestorWidget, widgetObject, childInfos, grunt, debug, targetFolder);

                _writeFile(widgetObject.metaClassPath + '.json', JSON.stringify(widgetInfo));

                // widget html file
                var templateHTML = grunt.file.read(_modulePath.resolve(ancestorObject.dir, ancestorObject.name + '.html')),
                    widgetHTML = _createWidgetHTML(templateHTML, ancestorObject, widgetObject);
                _writeFile(_modulePath.resolve(widgetObject.dir, widgetObject.name + '.html'), widgetHTML);

                // widget js file
                var templateJS = grunt.file.read(grunt.config('basePath') + '/templates/CompoundTemplate.js'),
                    widgetJS = cowiJsPrepare.createWidgetJS(templateJS, widgetObject, childWidgetsList, Utils, DataTypes);
                _writeFile(_modulePath.resolve(widgetObject.dir, widgetObject.name + '.js'), widgetJS);

                // widget style file
                var templateStyle = grunt.file.read(grunt.config('basePath') + '/templates/CompoundTemplate.style'),
                    widgetStyle = _createWidgetStyle(templateStyle, widgetObject, widgetObject.commonProps);
                _writeFile(widgetObject.metaClassPath + '.style', widgetStyle);

                // meta infos for use in JS
                var classInfo = jsPrepare.run(widgetInfo, widgetObject.qualifiedName, ancestorObject.type, false, { isCompound: true });
                _writeFile(_modulePath.resolve(widgetObject.dir, 'designer/ClassInfo.js'), classInfo);
                
                // remove non-public properties and related events
                // we have to do this after creation of ClassInfo and Widget.js, because we need them in the widget but not in the interface to AS
                _removeNonPublic(widgetInfo, ['events', 'properties']);

                // widget xsd file
                var widgetXsd = xsdPrepare.run(widgetInfo, {
                    prettify: true
                }, DataTypes, Properties);
                _writeFile(widgetObject.metaClassPath + '.xsd', widgetXsd);

                //styles of the ancestor widget as an JS object extracted from .widget file {styleProperties.StyleProperty:[],propertyGroups}                
                var superStyleObj = styleParser.parseFile(ancestorObject.dir + '/meta/' + ancestorObject.name + '.widget', grunt);

                // this method creates the xml of stylable properties for the .widget file
                // and sets default values in superStyle if they exist in compoundWidget
                var stylablePropsXML = _createStyleXML(superStyleObj, widgetObject);

                if (debug) {
                    _writeFile(_modulePath.resolve('/Temp/mvLog/widgetInfo_used_for_widgetFile.json'), JSON.stringify(widgetInfo));
                }

                // widget xml (.widget file)
                var widgetXMLFile = widgetObject.metaClassPath + '.widget',
                    widgetXML = _createWidgetFile(widgetInfo, json2xml, stylablePropsXML, superStyleObj.propertyGroups);

                _writeFile(widgetXMLFile, widgetXML);
                
                // remove non-public methods of LocalProperty
                // we have to do this after creation of .widget file, because we need them in the widget-file for creation of WidgetLibrary.mapping, but not in the EventsActions.xsd
                _removeNonPublic(widgetInfo, ['methods']);

                // widget styles xsd file
                var stylesXsd = xsdPrepare.runWidgetStyleDefinition(widgetInfo, {
                    prettify: true
                });
                if (stylesXsd !== undefined && stylesXsd !== '') {
                    _writeFile(widgetObject.metaClassPath + '_Styles.xsd', stylesXsd);
                } else {
                    _deleteFile(widgetObject.metaClassPath + '_Styles.xsd');
                }

                // widget events/actions xsd file
                var eventActionXsd = xsdPrepare.runEventActionDefinition(widgetInfo, {
                    prettify: true
                }, DataTypes);
                if (eventActionXsd !== undefined && eventActionXsd !== '') {
                    _writeFile(widgetObject.metaClassPath + '_EventsActions.xsd', eventActionXsd);
                } else {
                    _deleteFile(widgetObject.metaClassPath + '_EventsActions.xsd');
                }

                // base and default scss files
                xsltTrans.transform(grunt, widgetObject.metaClassPath + '_default.scss', grunt.config('basePath') + '/transformation/' + 'DefaultStyleTransformation.xsl', widgetXMLFile, [{
                    name: 'fileType',
                    value: 'scss'
                }]);
                xsltTrans.transform(grunt, widgetObject.metaClassPath + '_base.scss', grunt.config('basePath') + '/transformation/' + 'DefaultStyleTransformation.xsl', widgetXMLFile, [{
                    name: 'fileType',
                    value: 'scss'
                }, {
                    name: 'createBase',
                    value: true
                }]);

                // default css file
                grunt.config.set('sass.options.includePaths', [_modulePath.resolve(corePath, 'css/libs')]);
                grunt.config.set('sass.compoundWidget.src', _modulePath.resolve(widgetObject.metaDir, widgetObject.name + '_default.scss'));
                grunt.config.set('sass.compoundWidget.dest', _modulePath.resolve(widgetObject.metaDir, widgetObject.name + '_default.sass.css'));
                grunt.task.run(['sass:compoundWidget']);

                // create content
                var contentXML = _createContent(compoundXML, widgetObject, childInfos);
                _writeFile(_modulePath.resolve(widgetObject.dir, 'content/widgets.content'), contentXML);

                var widgetFolders = widgetPathMappingFile.replace(/ /g, '%20');
                if (!xsltPath || xsltPath === 'null') {
                    xsltPath = _modulePath.resolve(grunt.config('basePath'), '../../Transformations');
                }                
                xsltTrans.transform(grunt, _modulePath.resolve(widgetObject.dir, 'content/widgets.html'), _modulePath.resolve(xsltPath, 'content/HTMLBuilder.xsl'), _modulePath.resolve(widgetObject.dir, 'content/widgets.content'), [{
                    name: 'basepath',
                    value: _modulePath.resolve(grunt.config('basePath'), '../../').replace(/ /g, '%20').replace(/\\/g, '/') + '/'
                }, {
                    name: 'setParentContent',
                    value: 'false'
                }, {
                    name: 'widgetFolders',
                    value: widgetFolders
                }, {
                    name: 'coWiPrefix',
                    value: '{ID_PREFIX}'
                }], true);

                xsltTrans.transform(grunt, _modulePath.resolve(widgetObject.dir, 'content/widgets.scss'), _modulePath.resolve(xsltPath, 'content/StyleBuilder.xsl'), _modulePath.resolve(widgetObject.dir, 'content/widgets.content'), [{
                    name: 'basepath',
                    value: _modulePath.resolve(grunt.config('basePath'), '../../').replace(/ /g, '%20').replace(/\\/g, '/') + '/'
                }, {
                    name: 'widgetFolders',
                    value: widgetFolders
                }], true);

                // content css file
                grunt.config.set('sass.options.includePaths', [_modulePath.resolve(corePath + '/css/libs')]);
                grunt.config.set('sass.compoundContent.src', _modulePath.resolve(widgetObject.dir, 'content/widgets.scss'));
                grunt.config.set('sass.compoundContent.dest', _modulePath.resolve(widgetObject.dir, 'content/widgets.css'));
                grunt.task.run(['sass:compoundContent']);

                grunt.config.set('compoundWidget', widgetObject);
                grunt.task.run(['compound_postProcess']);

            } else {
                grunt.log.writeln('error in xml2js');
            }
        });

    });

    function _writeFile(path, content) {
        if (debug) {
            grunt.log.writeln(('write ' + path).cyan);
        }
        grunt.file.write(path, content);
    }

    function _deleteFile(path) {
        if (grunt.file.exists(path)) {
            grunt.file.delete(path);
        }
    }

    function _patchWidgets(arWidgets, libraryName, childInfos) {
        
        if (Array.isArray(arWidgets[0].Widget)) {
            arWidgets[0].Widget.forEach(function (widgetEntry) {
                var widgetAttr = widgetEntry['$'],
                    type = widgetAttr['xsi:type'],
                    childInfo = childInfos[type],
                    arNestedWidgets = widgetEntry.Widgets;
                libraryUtils.patchLocalMediaPath(widgetAttr, childInfo.properties, libraryName, DataTypes);
                if (Array.isArray(arNestedWidgets)) {
                    _patchWidgets(arNestedWidgets, libraryName, childInfos);
                }
            });
        }
    }

    function _createContent(compoundXML, widgetObject, childInfos) {
    
        if (Array.isArray(compoundXML.Widgets)) {
            _patchWidgets(compoundXML.Widgets, widgetObject.library, childInfos);
        }
        var contentXML = _xmlConvert.js2xml({
            Content: { 
                $: {
                    id: widgetObject.name,
                    width: widgetObject.commonProps.width,
                    height: widgetObject.commonProps.height,
                    xmlns: 'http://www.br-automation.com/iat2015/contentDefinition/v2',
                    'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance'
                },
                Widgets: compoundXML.Widgets 
            }
        });

        return '<?xml version="1.0" encoding="utf-8"?>\n' + contentXML;
    }

    function _convertToMappingXML(widgetType) {
        var xml = '<?xml version="1.0" encoding="utf-8"?>' + ((debug) ? '\n' : '') + '<Widgets>';

        for (var key in widgetType) {
            if (debug) { xml += '\n'; }
            xml += '<Widget type="' + key + '" path="' + widgetType[key].path.replace(/ /g, '%20').replace(/\\/g, '/') + '/' + '" />';

        }
        return xml + ((debug) ? '\n' : '') + '</Widgets>';
    }

    function _extend(obj1, obj2) {
        for (var key in obj2) {
            obj1[key] = obj2[key];
        }
    }

    function _createWidgetHTML(templateHTML, ancestorObject, widgetObject) {

        return templateHTML.replace(ancestorObject.qualifiedName, widgetObject.qualifiedName);
    }

    function _createWidgetStyle(template, widgetObject, commonProps) {
        var newFile = template.replace('__WIDGET_NAME__', widgetObject.type);
        newFile = newFile.replace('__WIDTH__', commonProps.width);
        newFile = newFile.replace('__HEIGHT__', commonProps.height);

        return newFile;
    }

    function _createStyleXML(superStyle, widgetObject) {
        // set default values if they exist in compoundWidget
        for (var i = 0; i < superStyle.styleProperties.StyleProperty.length; i += 1) {
            var prop = superStyle.styleProperties.StyleProperty[i]['$'],
                propName = prop['name'];
            if (widgetObject.commonProps !== undefined && widgetObject.commonProps[propName] !== undefined && ['top', 'left', 'zIndex'].indexOf(propName) === -1) {
                prop.default = widgetObject.commonProps[propName];
                prop.owner = widgetObject.type;
            }
        }
        var styleXML = _xmlConvert.js2xml({
            StyleProperties: superStyle.styleProperties
        });

        return styleXML;
    }

    function _widgetObject(compoundXML, ROOT, libraryName) {
        var obj = {
            name: compoundXML['$']['id'],
            library: libraryName
        };
        obj.dir = _modulePath.resolve(ROOT, obj.library + '/' + obj.name); //           <%ROOT%>/widgetLibrary/widgetName
        obj.metaDir = _modulePath.resolve(obj.dir, 'meta'); //                          <%ROOT%>/widgetLibrary/widgetName/meta
        obj.metaClassPath = _modulePath.resolve(obj.metaDir, obj.name); //              <%ROOT%>/widgetLibrary/widgetName/meta/widgetName
        obj.qualifiedName = 'widgets/' + obj.library + '/' + obj.name; //               widgets/widgetLibrary/widgetName
        obj.filePath = 'widgets/' + obj.library + '/' + obj.name + '/' + obj.name; //   widgets/widgetLibrary/widgetName/widgetName
        obj.type = 'widgets.' + obj.library + '.' + obj.name; //                        widgets.widgetLibrary.widgetName

        obj.widgets = _convertWidgets(compoundXML['Widgets']);

        obj.commonProps = {
            width: compoundXML['$']['width'],
            height: compoundXML['$']['height'],
            category: compoundXML['$']['category'],
            description: compoundXML['$']['description']
        };

        obj.customProps = _convertProps(compoundXML['Properties']);
        obj.customEvents = _convertEventActions(compoundXML['Events'], function (rawEvent) {
            var event = {};
            if (Array.isArray(rawEvent['Arguments'])) {
                _extend(event, _convertArguments(rawEvent['Arguments']));
            } else if (Array.isArray(rawEvent['Mappings'])) {
                event.mappings = rawEvent['Mappings'][0].Mapping;
            }
            if (Array.isArray(rawEvent['TriggerAction'])) {
                event.triggerAction = rawEvent['TriggerAction'][0]['$'].name;
            }
            return event;
        });
        obj.customActions = _convertEventActions(compoundXML['Actions'], function (rawAction) {
            var action = {};
            _extend(action, _convertArguments(rawAction['Arguments']));
            _extend(action, _convertActionMappings(rawAction['Mappings']));
            return action;
        });
        obj.eventBindings = compoundXML['EventBindings'];
        return obj;
    }

    function _convertWidgets(rawWidgets) {
        var widgets = {};
        if (Array.isArray(rawWidgets)) {
            var arWidgets = rawWidgets[0]['Widget'];
            if (Array.isArray(arWidgets)) {
                for (var i = 0; i < arWidgets.length; i += 1) {
                    var mainWidgets = arWidgets[i]['$'];
                    widgets[mainWidgets.id] = {
                        type: mainWidgets['xsi:type'],
                        id: mainWidgets.id
                    };
                    if (arWidgets[i]['Widgets']) {
                        _extend(widgets, _convertWidgets(arWidgets[i]['Widgets']));
                    }
                }
            }
        }
        return widgets;
    }

    function _parsePublic(str) {
        if (str !== undefined) {
            return (str === 'true');
        } else {
            return false;
        }
    }

    function _convertProps(arProperties) {
        var props = {};
        if (Array.isArray(arProperties)) {
            var arProps = arProperties[0]['Property'];
            if (Array.isArray(arProps)) {
                for (var i = 0; i < arProps.length; i += 1) {
                    var mainProps = arProps[i]['$'];
                    props[mainProps.name] = {
                        name: mainProps.name,
                        xsiType: mainProps['xsi:type'],
                        type: DataTypes.fullType(mainProps.type) || mainProps.type,
                        defaultValue: mainProps.defaultValue,
                        required: (mainProps.required === 'true' || mainProps.required === '1'),
                        readOnly: (mainProps.readOnly === 'true' || mainProps.readOnly === '1'),
                        localizable: (mainProps.localizable === 'true' || mainProps.localizable === '1'),
                        category: mainProps.category,
                        public: _parsePublic(mainProps.public),
                        description: (arProps[i]['Description']) ? arProps[i]['Description'][0] : ''
                    };
                    if (props[mainProps.name].readOnly) {
                        props[mainProps.name].projectable = false;
                    }
                    if (mainProps.typeRefId) {
                        props[mainProps.name].typeRefId = mainProps.typeRefId;
                    }
                    if (mainProps.nodeRefId) {
                        props[mainProps.name].nodeRefId = mainProps.nodeRefId;
                    }

                    if (Array.isArray(arProps[i]['Mappings'])) {
                        props[mainProps.name].mappings = arProps[i]['Mappings'][0].Mapping;
                        props[mainProps.name].accumulatedMappings = accumulateMappings(Utils.deepCopy(arProps[i]['Mappings'][0].Mapping));
                    }
                    if (mainProps['xsi:type'] === 'LocalProperty') {

                        props[mainProps.name].changedEvent = mainProps.name + 'Changed';
                        if (Array.isArray(arProps[i]['Event'])) {
                            props[mainProps.name].changedEvent = arProps[i]['Event'][0]['$'].name;
                        }

                        props[mainProps.name].setAction = 'Set' + mainProps.name;
                        props[mainProps.name].getAction = 'Get' + mainProps.name;
                        if (Array.isArray(arProps[i]['Actions'])) {
                            var SetAction = arProps[i]['Actions'][0]['SetAction'];
                            if (SetAction) {
                                props[mainProps.name].setAction = SetAction[0]['$'].name; 
                            }
                            var GetAction = arProps[i]['Actions'][0]['GetAction'];
                            if (GetAction) {
                                props[mainProps.name].getAction = GetAction[0]['$'].name; 
                            }
                        }
                    }
                }
            }
        }
        return props;
    }

    function accumulateMappings(mappings) {
        var acm = {};
        if (Array.isArray(mappings)) {
            for (var i = 0; i < mappings.length; i += 1) {
                var mapping = mappings[i],
                    id = mapping['$'].widget;
                if (acm[id]) {
                    acm[id]['$'].property += ',' + mapping['$'].property;
                } else {
                    acm[id] = mapping;
                }
            }
            return objectValues(acm);
        } else {
            return [];
        }
    }

    function _convertEventActions(raw, convertEntity) {
        var entities = {};
        if (Array.isArray(raw)) {
            var arEntities = raw[0][Object.keys(raw[0])[0]];
            if (Array.isArray(arEntities)) {
                for (var i = 0; i < arEntities.length; i += 1) {
                    var entity = arEntities[i]['$'];
                    entities[entity.name] = {
                        name: entity.name,
                        description: (arEntities[i]['Description']) ? arEntities[i]['Description'][0] : ''
                    };
                    if (convertEntity) {
                        _extend(entities[entity.name], convertEntity(arEntities[i]));
                    }
                }
            }
        }
        return entities;
    }

    function _convertArguments(rawArgs) {
        var obj = {};
        if (Array.isArray(rawArgs)) {
            obj.arguments = {};
            if (rawArgs[0]['Argument']) {
                for (const rawArg of rawArgs[0]['Argument']) {
                    obj.arguments[rawArg['$'].name] = {
                        name: rawArg['$'].name,
                        type: rawArg['$'].type,
                        optional: rawArg['$'].optional === 'true',
                        description: (rawArg['Description']) ? rawArg['Description'][0] : ''
                    };
                }
            }
        }
        return obj;
    }

    function _convertActionMappings(rawMappings) {
        var action = {};
        if (Array.isArray(rawMappings)) {
            var arMappings = rawMappings[0].Mapping;
            action.rawMappings = arMappings;
            action.mappings = [];
            if (Array.isArray(arMappings)) {
                for (const rawMapping of arMappings) {
                    var mapping = {
                        widget: rawMapping['$'].widget,
                        action: rawMapping['$'].action
                    };
                    if (Array.isArray(rawMapping['Arguments'])) {
                        const arArgs = rawMapping['Arguments'][0]['Argument'];       
                        mapping.arguments = [];
                        for (const rawArg of arArgs) {
                            var arg = {
                                name: rawArg['$'].name,
                                mapTo: rawArg['$'].mapTo
                            };
                            mapping.arguments.push(arg);
                        }
                    }
                    action.mappings.push(mapping);
                }
            }
        }
        return action;
    }

    // polyfill for Object.values (available since node 7.0)
    function objectValues(obj) {
        return Object.keys(obj).map(key => obj[key]);
    }

    function _ancestorObject(ROOT) {
        var obj = {
            type: 'system.widgets.CompoundWidget'
        };
        obj.metaDir = _modulePath.resolve(ROOT, 'system/widgets/CompoundWidget/meta');
        obj.name = obj.type.substring(obj.type.lastIndexOf('.') + 1);
        obj.filePath = Utils.className2Path(obj.type);
        obj.qualifiedName = Utils.className2Path(obj.type, false, true);
        obj.dir = _modulePath.resolve(ROOT, 'system/widgets/CompoundWidget');
        return obj;
    }

    function _removeNonPublic(widgetInfo, types) {
        var i;

        if (types.indexOf('properties') !== -1 && Array.isArray(widgetInfo.properties)) {
            for (i = widgetInfo.properties.length - 1; i >= 0; i -= 1) {
                var property = widgetInfo.properties[i];
                if (property.public === false) {
                    widgetInfo.properties.splice(i, 1);
                }
            }
        }
        if (types.indexOf('methods') !== -1 && Array.isArray(widgetInfo.methods)) {
            for (i = widgetInfo.methods.length - 1; i >= 0; i -= 1) {
                var method = widgetInfo.methods[i];
                if (method.public === false) {
                    widgetInfo.methods.splice(i, 1);
                }
            }
        }
        if (types.indexOf('events') !== -1 && Array.isArray(widgetInfo.events)) {
            for (i = widgetInfo.events.length - 1; i >= 0; i -= 1) {
                var event = widgetInfo.events[i];
                if (event.public === false) {
                    widgetInfo.events.splice(i, 1);
                }
            }
        }
    }

    function _createWidgetFile(widgetInfo, json2xml, stylablePropsXML, propertyGroupsObj) {

        // remove not_styleable properties from normal properties
        if (Array.isArray(widgetInfo.properties)) {

            for (var i = widgetInfo.properties.length - 1; i >= 0; i -= 1) {
                var property = widgetInfo.properties[i];
                if (property.cssProp === true) {
                    widgetInfo.properties.splice(i, 1);
                } else {
                    if (property.setAction) {
                        delete property.setAction;
                    }
                    if (property.getAction) {
                        delete property.getAction;
                    }
                }

            }
        }

        // generate xml from widgetInfo
        var xml = json2xml.convert(widgetInfo, {
            prettify: {
                enable: true
            }
        });

        // adding styleable properties and propertyGroups to xml
        var groupXml = _xmlConvert.js2xml({
            PropertyGroups: propertyGroupsObj
        });

        var insertIndex = xml.lastIndexOf('</Widget>');
        xml = xml.substring(0, insertIndex) + ((propertyGroupsObj) ? groupXml + '\n' : '') + stylablePropsXML + '\n' + xml.substring(insertIndex);

        if (Array.isArray(widgetInfo.eventBindings) && Array.isArray(widgetInfo.eventBindings[0].EventBinding)) {
            var eventBindingXML = _xmlConvert.js2xml({
                EventBindings: widgetInfo.eventBindings[0]
            });
            insertIndex = xml.lastIndexOf('</Widget>');
            xml = xml.substring(0, insertIndex) + eventBindingXML + '\n' + xml.substring(insertIndex);
        }
        return xml;

    }

};
