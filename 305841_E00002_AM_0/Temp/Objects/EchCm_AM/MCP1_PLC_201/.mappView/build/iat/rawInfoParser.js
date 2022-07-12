(function () {

    'use strict';

    var path = require('path'),
        grunt = require('grunt'),
        utils = require(path.resolve(__dirname, './utils')),
        DataTypes = require(path.resolve(__dirname, './DataTypes')),
        compiler = {

            runCore: function runCore(rawInfo, type, grunt) {
                return compiler.run(rawInfo, type, grunt, false, true);
            },

            run: function run(rawInfo, type, localGrunt, newDepFormat, allowArrays) {
                if (localGrunt) { grunt = localGrunt; }
                var widgetName = rawInfo.name; // name wie in @class vergeben, also zB widgets.company.CustomWidget

                if (widgetName === undefined) {
                    grunt.fail.warn('compile failed:'.red + ' widget name undefined (use @class)');
                }
                var widgetInfo = {
                    name: String(widgetName),
                    type: type,
                    meta: {
                        superClass: rawInfo.extends,
                        requires: [],
                        mixins: [],
                        parents: [],
                        children: [],
                        inheritance: rawInfo.inheritance
                    },
                    methods: [],
                    events: [],
                    properties: [],
                    dependencies: {
                        files: [],
                        widgets: []
                    },
                    categories: {},
                    descriptions: {}
                };
                if (rawInfo.finalClass) {
                    widgetInfo.meta.finalClass = rawInfo.finalClass;
                }

                addKeyboardType(widgetInfo, rawInfo.inheritance);
                addMetaInfo(widgetInfo, rawInfo.iatMeta);
                addFilePath(widgetInfo, rawInfo.files);
                addMixins(widgetInfo, rawInfo.mixins);
                addDependencies(widgetInfo, rawInfo.dependencies, rawInfo.requires, newDepFormat);
                addAprolMeta(widgetInfo, rawInfo.aprolMeta);

                if (rawInfo.members && rawInfo.members.length > 0) {
                    for (let i = 0; i < rawInfo.members.length; i += 1) {
                        let member = rawInfo.members[i];
                        if (member.tagname === 'method') { // @method -> widget methods
                            addMethod(widgetInfo, member, allowArrays);
                        } else if (member.tagname === 'event') { // @event -> widget events
                            addEvent(widgetInfo, member, allowArrays);
                        } else if (member.tagname === 'cfg') { // @cfg -> widget properties
                            addProperty(widgetInfo, member);
                        } else if (member.tagname === 'property') { // @property -> widget meta info like parents or children
                            addParentChildren(widgetInfo, member);
                        }

                    }
                }
                return widgetInfo;

            },

            runProperties: function run(rawInfo) {
                var properties = [];
                if (rawInfo.members && rawInfo.members.length > 0) {
                    for (let i = 0; i < rawInfo.members.length; i += 1) {
                        let member = rawInfo.members[i];
                        if (member.tagname === 'cfg') { // @cfg same as in widget properties 
                            if (member.iatStudioExposed === true) {
                                properties.push(_parseConfig(member));
                            }
                        }
                    }
                }
                return properties;
            }
        };

    // PRIVATE functions

    function isWidget(filename) {
        var isInWidgets = (filename && filename.indexOf('widgets.') !== -1),
            level = (filename.match(/\./g) || []).length;

        return isInWidgets && level === 2;
    }

    function addKeyboardType(widgetInfo, inheritanceChain) {

        if (Array.isArray(inheritanceChain)) {
            if (inheritanceChain.indexOf('system.widgets.KeyBoard') !== -1) {
                widgetInfo.meta.keyboard = 'AlphaPad';
            } else if (inheritanceChain.indexOf('system.widgets.NumPad') !== -1) {
                widgetInfo.meta.keyboard = 'NumPad';
            }
        }

    }

    // Example [
    // "graphId:typeRefId=graph",
    // "graphId:secondRefId=xAxis",
    // "value:someAttribute=irgendwas"
    // ],

    function _parseParamMeta(arParamMeta, memberType, memberName, widgetInfo, grunt) {
        var paramMeta = {};
        arParamMeta.forEach(function (item) {
            var parts = item.split(':'),
                param = parts[0],
                attribute,
                value;

            if (parts[1]) {
                var attr = parts[1].split('=');
                attribute = attr[0];
                value = attr[1];
            }

            if (param && attribute && value) {
                if (!paramMeta[param]) {
                    paramMeta[param] = {};
                }
                paramMeta[param][attribute] = value;
            } else {
                grunt.fail.warn('compile failed: '.red + widgetInfo.name + '#' + memberType + '-' + memberName + ': notation (paramName:attrName=value) for parameter arguments not matching:' + item);
            }
        });

        return paramMeta;
    }

    function _parseArguments(params, paramMeta, nodeType, allowArrays, grunt) {
        var args = [];
        for (var i = 0; i < params.length; i += 1) {
            var coreAttributes = ['name', 'type', 'index', 'description', 'optional'],
                param = {
                    'name': params[i].name,
                    'type': _normalizeType(params[i].type),
                    'index': i,
                    'description': cleanDoc(params[i].doc) || '',
                    'optional': (params[i].optional === true)
                };
            if (params[i].default !== undefined) {
                param.defaultValue = params[i].default;
            }
            var additionalAttributes = (paramMeta) ? paramMeta[params[i].name] : undefined;
            if (additionalAttributes) {
                for (var attrName in additionalAttributes) {
                    if (coreAttributes.indexOf(attrName) === -1) {
                        param[attrName] = additionalAttributes[attrName];
                    }
                }
            }
            args.push(param);

            if (params[i].name === undefined) {
                grunt.fail.warn('compile failed:'.red + ' ' + nodeType + ' argument name undefined');
            }
            if (params[i].type === undefined) {
                grunt.fail.warn('compile failed:'.red + ' ' + nodeType + ' argument type undefined');
            }
            if (!_isAllowedType(params[i].type, allowArrays)) {
                grunt.fail.warn('compile failed:'.red + ' ' + nodeType + ' argument type "' + params[i].type + '" not allowed');
            }
        }
        return args;
    }

    function _parseConfig(cfg) {
        //console.log("cfg:",cfg);
        var info = {
            'name': cfg.name,
            'type': _normalizeType(cfg.type),
            'initOnly': (cfg.bindable !== undefined) ? !cfg.bindable : true,
            'localizable': (cfg.localizable !== undefined) ? cfg.localizable : false,
            'editableBinding': (cfg.editableBinding !== undefined) ? cfg.editableBinding : false,
            'readOnly': (cfg.readonly !== undefined) ? cfg.readonly : false,
            'required': (cfg.required !== undefined) ? cfg.required : false,
            'owner': cfg.owner,
            'projectable': (cfg.not_projectable !== true),
            'description': _parseDoc(cfg.doc)
        };
        if (cfg.deprecated) {
            info.deprecated = true;
        }
        if (cfg.iatMeta) {
            addMetaCfg(cfg.iatMeta, info);
        }
        if (cfg.aprolMeta) {
            addAprolMeta(info, cfg.aprolMeta);
        }

        if (cfg.groupOrder !== undefined) {
            info.groupOrder = parseInt(cfg.groupOrder[0], 10);
        }

        if (cfg.nodeRefId !== undefined) {
            info.nodeRefId = cfg.nodeRefId;
        }
        if (cfg.nodeOnly !== undefined) {
            info.nodeOnly = cfg.nodeOnly;
        }
        addStringFromArray(info, 'groupRefId', cfg.groupRefId);
        addStringFromArray(info, 'category', cfg.iatCategory);
        addStringFromArray(info, 'typeRefId', cfg.typeRefId);
        addStringFromArray(info, 'subtype', cfg.subtype);

        addDefaultValue(info, cfg);
        return info;
    }

    function addMetaCfg(iatMeta, info) {
        var iatMetaObj = {};
        iatMeta.forEach(function (item) {
            if (item.name && item.name.indexOf(':') !== -1) {
                let info = item.name.split(':');
                iatMetaObj[info[0]] = info[1];
            }
        });
        if (iatMetaObj.StructuredProperty === 'true') {
            info.isStructuredProperty = true;
        }
        if (iatMetaObj.minSize !== undefined) {
            info.minSize = parseInt(iatMetaObj.minSize, 10);
        }
        if (iatMetaObj.maxSize !== undefined) {
            info.maxSize = parseInt(iatMetaObj.maxSize, 10);
        }
    }

    function addStringFromArray(info, attrName, config) {
        if (Array.isArray(config) === true) {
            info[attrName] = (config[0] + '').trim();
        } else if (config !== undefined) {
            info[attrName] = config;
        }
    }

    function addDefaultValue(info, cfg) {

        if (cfg.default !== null && cfg.default !== undefined && cfg.default !== 'undefined') {
            if (cfg.default.indexOf("'") === 0 && cfg.default.lastIndexOf("'") === (cfg.default.length - 1)) {
                cfg.default = cfg.default.slice(1, -1);
            }

            info['defaultValue'] = cfg.default.replace(/&/gm, '&amp;')
                .replace(/</gm, '&lt;')
                .replace(/>/gm, '&gt;')
                .replace(/"/gm, '&quot;')
                .replace(/'/gm, '&apos;');
        }
        // if a not projectable property of Array type has no default value: add empty array as default value
        if (!info.projectable && DataTypes.isArrayType(info.type) && (cfg.default === null || cfg.default === undefined)) {
            info['defaultValue'] = '[]';
        }
    }

    // for AS widget descriptions
    function cleanDescription(value) {
        if (utils.isString(value)) {
            if (value.lastIndexOf('.') === value.length - 1) {
                value = value.substring(0, value.length - 1);
            }
            value = value.replace(/\r\n/g, ' '); 
            value = value.replace(/\n/g, ' '); 
            return value.replace(/ {2,}/g, ' '); 
        } else {
            return value;
        }
    }

    // for cfg
    function _parseDoc(doc) {
        var ret = '',
            override = '<p><strong>Defined in override';
        if (doc) {
            var index = doc.indexOf(override);
            if (index !== -1) {
                ret = doc.substring(0, index - 2);
            } else {
                ret = doc;
            }
            ret = ret.replace(/<p>/g, '');
            ret = ret.replace(/<\/p>/g, '');
            ret = ret.replace(/<br\/>/g, '');
            ret = ret.replace(/&lt;br\/&gt;/g, '');
            //ret = cleanDoc(ret);
        }
        return ret;
    }
    
    // for rest
    function cleanDoc(str) {
        if (str) {
            str = str.replace(/<br\/>/g, '');
            str = str.replace(/&lt;br\/&gt;/g, '');
            str = removeTags(str);
        }
        return str;
    }
    
    function removeTags(html) {
        return html.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, '');
    }

    function _parseProperty(prop) {
        var info = {
            'name': prop.name
        };
        if (prop.type) {
            info['type'] = prop.type;
        }
        if (prop.default) {
            info['defaultValue'] = prop.default;
        }
        if (prop.properties !== null && prop.properties !== undefined) {
            info.values = [];
            for (var i = 0; i < prop.properties.length; i += 1) {
                info.values.push(_parseProperty(prop.properties[i]));
            }
        }
        return info;
    }

    function _parseWidgetList(prop, widgetName, grunt) {
        var result;
        try {
            result = JSON.parse(prop.default);
        } catch (e) {

        }
        if (!Array.isArray(result)) {
            grunt.fail.warn('compile failed:'.red + ', property "' + prop.name + '" on ' + widgetName + ' has invalid value!');
        }
        return result;
    }

    function _normalizeType(type) {

        if (type === undefined || type === '') {
            type = 'undefined';
        }
        return type;
    }
    function _isAllowedType(type, allowArrays) {
        if (type.lastIndexOf('[]') === type.length - 2) {
            var pureType = type.substring(0, type.length - 2);
            return allowArrays && DataTypes.baseType(pureType) !== undefined;
        } else {
            return DataTypes.baseType(type) !== undefined;
        }
    }

    function addMetaInfo(widgetInfo, iatMeta) {
        if (Array.isArray(iatMeta) && iatMeta.length > 0) {
            for (let i = 0; i < iatMeta.length; i += 1) {
                let info = iatMeta[i].name.split(':');
                if (info.length === 1) {
                    grunt.fail.warn('compile failed:'.red + ' iatMeta name has to contain a colon');
                }
                let tag1 = info[0];
                let tag2 = info[1];
                let value = iatMeta[i].doc.trim();
                switch (tag1) {
                    case 'category':
                        let values = value.split(',');
                        for (let j = 0; j < values.length; j += 1) {
                            if (widgetInfo['categories'][tag2] === undefined) {
                                widgetInfo['categories'][tag2] = [];
                            }
                            widgetInfo['categories'][tag2].push(values[j]);
                        }
                        break;
                    case 'description':
                        widgetInfo['descriptions'][tag2] = cleanDescription(value);
                        break;
                    case 'studio':
                        if (['requires', 'mixins', 'parents', 'children', 'superClass', 'inheritance'].indexOf(tag2) === -1) {
                            widgetInfo['meta'][tag2] = value;
                        } else {
                            grunt.log.writeln(('compile warning: iatMeta tag has not allowed name (' + tag2 + ') after studio:').yellow);
                        }
                        break;
                    default:
                        grunt.log.writeln(('compile warning: iatMeta tag has unknown name before colon').yellow);
                        break;
                }

            }
        }
    }

    function addLegacyDependencies(widgetInfo, dependencies) {

        if (dependencies && dependencies.length > 0) {

            for (let i = 0; i < dependencies.length; i += 1) {
                let dep = dependencies[i];

                if (dep.indexOf('widgets/') === 0 && dep.indexOf('libs/') === -1) {
                    widgetInfo.dependencies.widgets.push(dep + '.js');
                } else {
                    widgetInfo.dependencies.files.push(dep + '.js');
                }

            }
        }
    }

    function addDependencies(widgetInfo, dependencies, requiredFiles, newFormat) {
        if (newFormat === true) {
            if (dependencies) {
                widgetInfo.dependencies.widgets = dependencies.widgets.slice(0);
                widgetInfo.dependencies.files = dependencies.files.slice(0);
            }
        } else {
            addLegacyDependencies(widgetInfo, dependencies);
        }

        if (Array.isArray(requiredFiles) && requiredFiles.length > 0) {
            widgetInfo['meta'].requires = widgetInfo['meta'].requires.concat(requiredFiles);

            for (let i = 0; i < requiredFiles.length; i += 1) {
                let dep = requiredFiles[i];
                if (isWidget(dep)) {
                    path = utils.className2Path(dep, true);
                    let index = widgetInfo.dependencies.widgets.indexOf(path);
                    if (index === -1) {
                        widgetInfo.dependencies.widgets.push(path);
                    }
                }

            }
        }
    }

    function addAprolMeta(info, arMeta) {
        var aprolMeta = [];
        if (Array.isArray(arMeta)) {
            arMeta.forEach(function (item) {
                if (item.indexOf('=') !== -1) {
                    var obj = item.split('=');
                    aprolMeta.push({ key: obj[0].trim(), value: obj[1].trim() });
                }
            });
        }
        if (aprolMeta.length > 0) {
            info.aprolMeta = aprolMeta;
        }
    }

    function addFilePath(widgetInfo, files) {

        if (Array.isArray(files) && files.length > 0) {
            var filename = files[0].filename;
            widgetInfo['meta'].filePath = filename.substring(filename.indexOf('widgets/'));
        }
    }

    function addMixins(widgetInfo, mixins) {

        if (mixins && mixins.length > 0) {
            widgetInfo['meta'].mixins = widgetInfo['meta'].mixins.concat(mixins);
        }
    }

    function addMethod(widgetInfo, member, allowArrays) {
        if (member.owner !== 'brease.core.Class' && member.static !== true && (member.iatStudioExposed === true || member.name.toLowerCase().indexOf('set') === 0)) {

            if (member.name === undefined) {
                grunt.fail.warn('compile failed:'.red + ' method name undefined');
            }
            let info = {
                'name': member.name,
                'originalName': member.name,
                'read': (member.name.toLowerCase().indexOf('get') === 0), // currently methods which start with 'get' are read actions
                'description': cleanDoc(member.doc) || '',
                'iatStudioExposed': (member.iatStudioExposed === true)
            };

            // if the method has method parameters
            if (Array.isArray(member.params)) {
                
                var paramMeta;
                // if the method has meta data for method parameters
                if (Array.isArray(member.paramMeta)) {
                    paramMeta = _parseParamMeta(member.paramMeta, 'method', member.name, widgetInfo, grunt);
                }

                let args = _parseArguments(member.params, paramMeta, 'method', allowArrays, grunt);
                if (args.length > 0) {
                    info['parameter'] = args;
                }
            }
            if (member.return) {
                info['result'] = {
                    name: member.return.name,
                    type: member.return.type
                };
                if (member.return.doc) {
                    info['result'].description = cleanDoc(member.return.doc);
                }
            }
            if (info.read === true && !member.return) {
                grunt.fail.warn('compile failed:'.red + ' read action "' + member.name + '" of "' + widgetInfo.name + '" without return value');
            }
            if (member.aprolMeta) {
                addAprolMeta(info, member.aprolMeta);
            }
            widgetInfo['methods'].push(info);
        }
    }

    function addEvent(widgetInfo, member, allowArrays) {

        if (member.iatStudioExposed === true) {
            if (member.name === undefined) {
                grunt.fail.warn('compile failed:'.red + ' event name undefined');
            }
            let info = {
                'name': member.name,
                'description': cleanDoc(member.doc) || ''
            };
            if (!info.description || info.description.trim() === '') {
                grunt.log.writeln('> ' + widgetInfo.name + '.' + info.name + ' -> event without description');
            }
            if (member.deprecated) {
                info.deprecated = true;
            }
            if (member.aprolMeta) {
                addAprolMeta(info, member.aprolMeta);
            }
            
            // if the event has event parameters
            if (Array.isArray(member.params)) {
                var paramMeta;
                // if the event has meta data for event parameters
                if (Array.isArray(member.paramMeta)) {
                    paramMeta = _parseParamMeta(member.paramMeta, 'event', member.name, widgetInfo, grunt);
                }
                let args = _parseArguments(member.params, paramMeta, 'event', allowArrays, grunt);
                if (args.length > 0) {
                    info['parameter'] = args;
                }
            }
            widgetInfo['events'].push(info);
        }
    }

    function addProperty(widgetInfo, member) {
        if (member.iatStudioExposed === true) {
            widgetInfo['properties'].push(_parseConfig(member));
        }
    }

    function addParentChildren(widgetInfo, member) {
        if (member.name === 'parents') {
            widgetInfo['meta'].parents = _parseWidgetList(member, widgetInfo.name, grunt);
        } else if (member.name === 'children') {
            widgetInfo['meta'].children = _parseWidgetList(member, widgetInfo.name, grunt);
        } else if (member.iatStudioExposed === true) { // not used for widgets
            widgetInfo['properties'].push(_parseProperty(member));
        }
    }

    module.exports = compiler;

})();
