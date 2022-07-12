module.exports = function (grunt) {

    'use strict';

    var _moduleRequire = require('a.require'),
        _modulePath = require('path'),
        _moduleXml2js = require('xml2js'),
        _xmlBuilder = new _moduleXml2js.Builder({ headless: true }),
        _xmlConvert = {
            xml2js: _moduleXml2js.parseString,
            js2xml: _xmlBuilder.buildObject.bind(_xmlBuilder)
        },
        DataTypes = _moduleRequire('iat/DataTypes'),
        Properties = _moduleRequire('iat/Properties'),
        libraryUtils = _moduleRequire('iat/libraryUtils'),
        debug = false;

    /**
    * @method derived_create
    * @param {String} srcFile path to derived widget xml (e.g. "C:/dev/examples/DegreeNumOut.derivedWidget")
    * @param {String} targetFolder directory to write to (directory where derived widget libraries are located) (e.g. "C:/projects/AS-4.3/Trunk/WidgetTests/Logical/mappView/Widgets")
    * @param {String} baseWidgets base directory of widgets we derive from (e.g. "C:/Program Files/BrAutomation/AS43/AS/TechnologyPackages/mappView/5.2.9000/Widgets") 
    * @param {String} corePath directory of brease core (e.g. "C:/Program Files/BrAutomation/AS43/AS/TechnologyPackages/mappView/5.2.9000/IATC/BRVisu") 
    * @param {String} libraryName name of library of derived widget
    */
    grunt.registerTask('derived_create', '', function (srcFile, targetFolder, baseWidgets, corePath, libraryName) {

        // iat modules
        var utils = _moduleRequire('iat/utils'),
            xsdPrepare = _moduleRequire('iat/xsdPrepare'),
            jsPrepare = _moduleRequire('iat/jsPrepare'),
            styleParser = _moduleRequire('iat/styleParser'),
            templateParser = _moduleRequire('iat/templateParser'),
            xsltTrans = _moduleRequire('iat/XSLTTransformation'),
            json2xml = _moduleRequire('iat/json2xml');

        targetFolder = targetFolder || grunt.config('wwwRoot') + '/BRVisu/widgets';
        baseWidgets = (baseWidgets) || grunt.config('wwwRoot') + '/BRVisu/widgets';
        
        if (debug) {
            grunt.log.writeln('srcFile:' + srcFile);
            grunt.log.writeln('targetFolder:' + targetFolder);
            grunt.log.writeln('baseWidgets:' + baseWidgets);
            grunt.log.writeln('corePath:' + corePath);
            grunt.log.writeln('libraryName:' + libraryName);
        }

        // read source file
        var srcXML = grunt.file.read(srcFile);

        // parse xml to a javascript object
        _xmlConvert.xml2js(srcXML, { trim: true }, function (errArg, xmlObj) {
            if (xmlObj) {

                var widgetObject = _widgetObject(xmlObj['DerivedWidget'], targetFolder, libraryName),
                    ancestorObject = _ancestorObject(widgetObject, utils, baseWidgets);

                if (debug) {
               
                    _writeFile(_modulePath.resolve('/Temp/mvLog/derivedWidget.json'), JSON.stringify(widgetObject));
                    _writeFile(_modulePath.resolve('/Temp/mvLog/ancestorObject.json'), JSON.stringify(ancestorObject));
                }
                var baseInfo = grunt.file.readJSON(ancestorObject.dir + '/meta/' + ancestorObject.name + '.json'),
                    widgetInfo = _patchInfo(baseInfo, widgetObject);
                _writeFile(widgetObject.metaClassPath + '.json', JSON.stringify(widgetInfo));

                // widget html file
                var templateHTML = grunt.file.read(ancestorObject.dir + '/' + ancestorObject.name + '.html'),
                    widgetHTML = _createWidgetHTML(templateHTML, ancestorObject, widgetObject);
                _writeFile(widgetObject.dir + '/' + widgetObject.name + '.html', widgetHTML);

                // widget js file
                var templateJS = grunt.file.read(grunt.config('basePath') + '/templates/WidgetTemplate.js'),
                    widgetJS = _createWidgetJS(templateJS, ancestorObject, widgetObject, widgetInfo);
                _writeFile(widgetObject.dir + '/' + widgetObject.name + '.js', widgetJS);

                // meta infos and class extension for designer
                var classInfo = jsPrepare.run(widgetInfo, widgetObject.qualifiedName, ancestorObject.type, false, { isDerived: true });
                _writeFile(widgetObject.dir + '/designer/ClassInfo.js', classInfo);

                // widget xsd file
                // task 'xsdPrepare' is running in widget_compiler before properties with hide=true are removed
                // therefore we have to add them here to get a correct xsd, which restricts the BaseWidget.xsd
                _patchBaseProps(widgetInfo, widgetObject);
                var widgetXsd = xsdPrepare.run(widgetInfo, {
                    prettify: true
                }, DataTypes, Properties);
                _writeFile(widgetObject.metaClassPath + '.xsd', widgetXsd);

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

                // widget styles

                //styles of the ancestor widget as an JS object extracted from .widget file {styleProperties.StyleProperty:[],propertyGroups}                
                var superStyle = styleParser.parseFile(ancestorObject.dir + '/meta/' + ancestorObject.name + '.widget', grunt);

                // this method creates the style xml for the .widget file
                // and sets default values in superStyle if they exist in widgetObject
                var styleXML = _createStyleXML(superStyle, widgetObject);

                var styleFile = _createStyleFile(styleParser, ancestorObject, widgetObject, superStyle, widgetInfo);
                if (styleFile !== '') {
                    _writeFile(widgetObject.metaClassPath + '.style', styleFile);
                }

                // copy binding templates
                var arBtpl = grunt.file.expand({ cwd: ancestorObject.dir + '/meta/' }, '*.btpl');
                if (arBtpl.length > 0) {
                    for (var i = 0; i < arBtpl.length; i += 1) {
                        var xml = grunt.file.read(ancestorObject.dir + '/meta/' + arBtpl[i]);
                        xml = xml.replace(ancestorObject.qualifiedName, widgetObject.qualifiedName);
                        grunt.file.write(widgetObject.metaDir + '/' + arBtpl[i], xml);
                    }
                }

                // widget xml
                var widgetXMLFile = widgetObject.metaClassPath + '.widget',
                    widgetXML = _createWidgetFile(widgetInfo, json2xml, templateParser, styleXML, superStyle.propertyGroups, widgetObject.dir);

                _writeFile(widgetXMLFile, widgetXML);

                // base and default scss files
                xsltTrans.transform(grunt, widgetObject.metaClassPath + '_default.scss', grunt.config('basePath') + '/transformation/' + 'DefaultStyleTransformation.xsl', widgetXMLFile, [{
                    name: 'fileType',
                    value: 'scss'
                }]);
                xsltTrans.transform(grunt, widgetObject.metaClassPath + '_base.scss', grunt.config('basePath') + '/transformation/' + 'DefaultStyleTransformation.xsl', widgetXMLFile, [{
                    name: 'fileType',
                    value: 'scss'
                }, { name: 'createBase', value: true }]);

                // default css file
                var includePath = _modulePath.resolve(corePath + '/css/libs');
                grunt.config.set('sass.options.includePaths', [includePath]);
                grunt.config.set('sass.derivedWidget.cwd', widgetObject.metaDir);
                grunt.config.set('sass.derivedWidget.src', widgetObject.name + '_default.scss');
                grunt.config.set('sass.derivedWidget.dest', widgetObject.metaDir);
                grunt.task.run(['sass:derivedWidget']);
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
    function _widgetObject(widgetXMLObject, ROOT, libraryName) {
        var obj = {
            name: widgetXMLObject['$']['name'],
            library: libraryName,
            category: widgetXMLObject['$']['category'],
            props: widgetXMLObject['Widget'][0]['$']
        };
        obj.dir = ROOT + '/' + obj.library + '/' + obj.name; // <%ROOT%>/widgetLibrary/widgetName
        obj.metaDir = obj.dir + '/meta'; // <%ROOT%>/widgetLibrary/widgetName/meta
        obj.metaClassPath = obj.metaDir + '/' + obj.name; // <%ROOT%>/widgetLibrary/widgetName/meta/widgetName
        obj.qualifiedName = 'widgets/' + obj.library + '/' + obj.name; // widgets/widgetLibrary/widgetName
        obj.filePath = 'widgets/' + obj.library + '/' + obj.name + '/' + obj.name; // widgets/widgetLibrary/widgetName/widgetName
        obj.type = 'widgets.' + obj.library + '.' + obj.name; // widgets.widgetLibrary.widgetName
        return obj;
    }

    function _ancestorObject(widgetObject, utils, ROOT) {
        var obj = {
            type: widgetObject.props['xsi:type']
        };
        var info = obj.type.split('.');
        obj.library = info[1];
        obj.name = obj.type.substring(obj.type.lastIndexOf('.') + 1);
        obj.filePath = utils.className2Path(obj.type);
        obj.qualifiedName = utils.className2Path(obj.type, false, true);
        obj.dir = ROOT + '/' + obj.library + '/' + obj.name;
        return obj;
    }

    function _createWidgetHTML(templateHTML, ancestorObject, widgetObject) {

        return templateHTML.replace(ancestorObject.qualifiedName, widgetObject.qualifiedName);
    }

    function _createWidgetJS(templateJS, ancestorObject, widgetObject, widgetInfo) {

        var newJS = templateJS.replace('SUPER_CLASS_PATH', ancestorObject.filePath);
        newJS = newJS.replace('SUPER_CLASS', ancestorObject.type);
        newJS = newJS.replace('WIDGET_LIBRARY', widgetObject.library);
        newJS = newJS.replace(/WIDGET_NAME/g, widgetObject.name);

        var properties = widgetInfo.properties,
            settings = {};
        for (var i = 0; i < properties.length; i += 1) {
            var prop = properties[i],
                propName = prop['name'];
            if (widgetObject.props[propName] !== undefined && prop.defaultValue !== undefined) {
                var parsedValue = _parseValue(widgetObject.props[propName], prop['type']);
                if (DataTypes.isObject(prop['type']) === false) {
                    settings[propName] = parsedValue;
                } else if (typeof parsedValue === 'object') {
                    // write object data types only if parsing was successful
                    settings[propName] = parsedValue;
                }
            }
        }
        newJS = newJS.replace('DEFAULT_SETTINGS', JSON.stringify(settings, null, 8));
        return newJS;
    }

    function _baseStyles(template, widgetObject, widgetInfo) {

        var properties = widgetInfo.properties,
            settings = {
                width: false,
                height: false,
                top: false,
                left: false
            };
        for (var i = 0; i < properties.length; i += 1) {
            var propName = properties[i]['name'];
            if (settings[propName] !== undefined) {
                settings[propName] = true;
            }
        }

        var baseStyles = template;
        if (widgetObject.props['width'] !== undefined) {
            baseStyles = baseStyles.replace('DEFAULT_WIDTH', widgetObject.props['width']);
        } else {
            baseStyles = baseStyles.replace('default="DEFAULT_WIDTH"', '');
        }
        if (settings['width'] === true) {
            baseStyles = baseStyles.replace('###HIDE_WIDTH###', '');
        } else {
            baseStyles = baseStyles.replace('###HIDE_WIDTH###', 'hide="true"');
        }
        if (widgetObject.props['height'] !== undefined) {
            baseStyles = baseStyles.replace('DEFAULT_HEIGHT', widgetObject.props['height']);
        } else {
            baseStyles = baseStyles.replace('default="DEFAULT_HEIGHT"', '');
        }
        if (settings['height'] === true) {
            baseStyles = baseStyles.replace('###HIDE_HEIGHT###', '');
        } else {
            baseStyles = baseStyles.replace('###HIDE_HEIGHT###', 'hide="true"');
        }

        return baseStyles;
    }

    function _mergeStyles(styleProperties, baseStyles) {
        var startTag = '<StyleProperties>';
        return startTag + '\n' + baseStyles + ((styleProperties === '<StyleProperties/>') ? '</StyleProperties>' : styleProperties.substring(startTag.length));
    }

    function _parseSTYLE(template, styleProperties, widgetObject) {

        var newSTYLE = template.replace('WIDGET_LIBRARY', widgetObject.library);
        newSTYLE = newSTYLE.replace(/WIDGET_NAME/g, widgetObject.name);

        newSTYLE = newSTYLE.replace('###STYLE_PROPERTIES###', styleProperties);

        return newSTYLE;
    }

    function _createStyleFile(styleParser, ancestorObject, widgetObject, superStyle, widgetInfo) {

        // remove styleproperties without default value and styleproperties with hide=true
        for (var i = superStyle.styleProperties.StyleProperty.length - 1; i >= 0; i -= 1) {
            var prop = superStyle.styleProperties.StyleProperty[i]['$'];
            if (prop.hide === 'true' || prop.default === undefined) {
                superStyle.styleProperties.StyleProperty.splice(i, 1);
            }
        }

        if (superStyle.styleProperties.StyleProperty.length > 0 || widgetInfo.styleproperties.StyleProperty.length > 0) {
            var styleProperties = styleParser.merge(widgetObject.type, superStyle.styleProperties, widgetInfo.styleproperties, ['width', 'height', 'top', 'left', 'zIndex']),
                purgedStyleProperties = _purgeStyleProperties(styleProperties, ancestorObject, widgetObject);

            var baseStyles = _baseStyles(grunt.file.read(grunt.config('basePath') + '/templates/BaseStyles.style'), widgetObject, widgetInfo),
                mergedStyles = _mergeStyles(purgedStyleProperties, baseStyles);

            return _parseSTYLE(grunt.file.read(grunt.config('basePath') + '/templates/WidgetTemplate.style'), mergedStyles, widgetObject);
        } else {
            return '';
        }
    }

    function _createStyleXML(superStyle, widgetObject, xml2js) {
        // set default values if they exist in widgetObject
        for (var i = 0; i < superStyle.styleProperties.StyleProperty.length; i += 1) {
            var prop = superStyle.styleProperties.StyleProperty[i]['$'],
                propName = prop['name'];
            if (widgetObject.props[propName] !== undefined && ['top', 'left', 'zIndex'].indexOf(propName) === -1) {
                prop.default = widgetObject.props[propName];
            }
        }
        // revert js object to xml
        var styleXML = _xmlConvert.js2xml({
            StyleProperties: superStyle.styleProperties
        });

        return styleXML;
    }

    function _patchInfo(widgetInfo, widgetObject) {
        widgetInfo.meta.superClass = widgetInfo.name;
        widgetInfo.meta.isDerived = true;
        widgetInfo.name = widgetObject.type;
        widgetInfo.meta.filePath = widgetObject.filePath + '.js';
        widgetInfo.meta.inheritance.unshift(widgetObject.type);
        widgetInfo.dependencies.widgets.unshift(widgetObject.filePath + '.js');
        if (widgetObject.category) {
            if (!Array.isArray(widgetInfo.categories.Category)) {
                widgetInfo.categories.Category = [];
            }
            widgetInfo.categories.Category.push(widgetObject.category);
        }
        libraryUtils.patchLocalMediaPath(widgetObject.props, widgetInfo.properties, widgetObject.library, DataTypes);
        _overwriteDefaults(widgetObject, 'props', widgetInfo.properties, 'defaultValue');
        _overwriteDefaults(widgetObject, 'styleProps', widgetInfo.styleproperties.StyleProperty, 'default');

        return widgetInfo;
    }

    function _patchBaseProps(widgetInfo, widgetObject) {
        var contains = {},
            baseProps = ['top', 'left', 'height', 'width'];
        for (var i = 0; i < widgetInfo.properties.length; i += 1) {
            contains[widgetInfo.properties[i].name] = true;
        }
        for (var j = 0; j < baseProps.length; j += 1) {
            if (contains[baseProps[j]] === undefined) {
                widgetInfo.properties.push({
                    name: baseProps[j],
                    type: (baseProps[j] === 'top' || baseProps[j] === 'left') ? 'Integer' : 'Size',
                    owner: widgetObject.type,
                    hide: true
                });
            }
        }
    }

    /*
    * overwrite default values for all properties, if they exist in the derived widget xml, except of top,left,zIndex
    * top,left,zIndex do not need a default value; these properties are set, when a widget is added to a content
    * required properties are changed to optional, otherwise a default value would not be possible
    */
    function _overwriteDefaults(widgetObject, type, properties, defaultAttr) {

        for (var i = 0; i < properties.length; i += 1) {
            var prop = _select(properties, i, type),
                propName = prop['name'];
            if (widgetObject.props[propName] !== undefined && ['top', 'left', 'zIndex'].indexOf(propName) === -1) {
                prop[defaultAttr] = widgetObject.props[propName];
                if (prop.required !== undefined) {
                    prop.required = false;
                }
            }
        }
    }

    function _select(properties, i, type) {
        if (type === 'props') {
            return properties[i];
        } else {
            return properties[i]['$'];
        }
    }

    function _parseValue(value, type) {
        var retVal;
        if (DataTypes.isInteger(type)) {
            retVal = parseInt(value, 10);
        } else if (DataTypes.isNumber(type) || (type === 'Size' && value.indexOf('%') === -1)) {
            retVal = parseFloat(value);
        } else if (DataTypes.isBoolean(type)) {
            retVal = (value.toLowerCase() === 'true');
        } else if (DataTypes.isObject(type)) {
            try {
                retVal = (value !== '') ? JSON.parse(value.trim().replace(/'/g, '"')) : '';
            } catch (e) {
                console.log('Warn: invalid value for object type ' + type + ', JSON.parse failed');
                retVal = value;
            }
        } else {
            retVal = value;
        }
        //console.log('in[' + value + ',' + type + ']->out[' + typeof retVal + ']:' + JSON.stringify(retVal))
        return retVal;
    }

    function _purgeStyleProperties(styleProperties, ancestorObject, widgetObject) {

        // REMOVE owner
        styleProperties = styleProperties.replace(/owner="brease.core.BaseWidget"/g, '');
        styleProperties = styleProperties.replace(new RegExp('owner="widgets\\.brease\\.' + ancestorObject.name + '"', 'g'), '');
        styleProperties = styleProperties.replace(new RegExp('owner="widgets\\.' + widgetObject.library + '\\.' + widgetObject.name + '"', 'g'), '');

        // REMOVE attribute defaultStyle: allowed in .widget file only
        styleProperties = styleProperties.replace(/ defaultStyle="default"/, '');

        return styleProperties;
    }

    function _createWidgetFile(widgetInfo, json2xml, templateParser, stylablePropsXML, propertyGroupsObj, widgetDirectory) {
    
        // remove not_styleable properties from normal properties
        if (Array.isArray(widgetInfo.properties)) {
            for (var i = widgetInfo.properties.length - 1; i >= 0; i -= 1) {
                if (widgetInfo.properties[i].cssProp === true) {
                    widgetInfo.properties.splice(i, 1);
                }
            }
        }

        // generate xml from widgetInfo
        var xml = json2xml.convert(widgetInfo, {
            prettify: {
                enable: true
            }
        });

        // add binding templates to xml
        xml = templateParser.run(xml, widgetDirectory, grunt);

        // adding styleable properties and propertyGroups to xml
        var groupXml = _xmlConvert.js2xml({
            PropertyGroups: propertyGroupsObj
        });

        var insertIndex = xml.lastIndexOf('</Widget>');
        xml = xml.substring(0, insertIndex) + ((propertyGroupsObj) ? groupXml + '\n' : '') + stylablePropsXML + '\n' + xml.substring(insertIndex);

        return xml;

    }

};
