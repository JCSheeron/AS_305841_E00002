(function () {
    'use strict';

    var xmlPrepare = {

        run: function run(widgetInfo) {
            var obj = {
                '@name': 'Widget',
                '@attr': {
                    name: widgetInfo.name
                },
                ASEngineeringInfo: {
                    IsProjectable: widgetInfo.meta.visible || true,
                    LicenseInfo: getLicense(widgetInfo.meta.license)
                },
                Dependencies: {
                    Files: {
                        arr: _depConvert(widgetInfo.dependencies.files, 'File')
                    },
                    Widgets: {
                        arr: _depConvert(widgetInfo.dependencies.widgets, 'Widget')
                    }
                },
                Categories: { arr: _catConvert(widgetInfo.categories) },
                Descriptions: { arr: _descConvert(widgetInfo.descriptions) }
            };
            if (Array.isArray(widgetInfo.aprolMeta)) {
                obj.aprolMeta = {
                    arr: _aprolConvert(widgetInfo.aprolMeta) 
                };
            }
            if (widgetInfo.meta.isCompound) {
                obj.ASEngineeringInfo.IsCompound = true;
            }
            if (widgetInfo.meta.isDerived) {
                obj.ASEngineeringInfo.IsDerived = true;
            }
            if (widgetInfo.meta.keyboard !== undefined) {
                obj.ASEngineeringInfo.Keyboard = widgetInfo.meta.keyboard;
            }

            if (widgetInfo.meta.inheritance && widgetInfo.meta.inheritance.length > 0) {
                obj.Inheritance = {
                    arr: _inhConvert(widgetInfo.meta.inheritance)
                };
            }

            if (widgetInfo.meta.parents) {
                obj.Parents = {
                    arr: _arrConvert(widgetInfo.meta.parents, 'Parent')
                };
            }

            if (widgetInfo.meta.children) {
                obj.Children = {
                    arr: _arrConvert(widgetInfo.meta.children, 'Child')
                };
            }

            if (widgetInfo.methods && widgetInfo.methods.length > 0) {
                obj.Methods = {
                    arr: _memberConvert(widgetInfo.methods, 'Method', widgetInfo.meta)
                };
            }
            if (widgetInfo.events && widgetInfo.events.length > 0) {
                obj.Events = {
                    arr: _memberConvert(widgetInfo.events, 'Event', widgetInfo.meta)
                };
            }
            if (widgetInfo.properties && widgetInfo.properties.length > 0) {
                obj.Properties = {
                    arr: _memberConvert(widgetInfo.properties, 'Property', widgetInfo.meta)
                };
            }

            return obj;
        }

    };
    var licenses = ['unlicensed', 'undefined', 'licensed'];
    function getLicense(license) {
        if (licenses.indexOf(license) !== -1) {
            return license;
        } else {
            return licenses[0];
        }
    }

    function _depConvert(arIn, tag) {
        return arIn.map(function (item) {
            return {
                '@name': tag,
                '@content': item
            };
        });
    }

    function _arrConvert(arIn, tag) {
        return arIn.map(function (item) {
            return {
                '@name': tag,
                '@content': item
            };
        });
    }

    function _descConvert(obj) {
        var ar = [];
        for (var attr in obj) {
            ar.push({
                '@name': 'Description',
                '@attr': {
                    'name': attr
                },
                '@content': obj[attr]
            });
        }
        return ar;
    }

    function _aprolConvert(arMeta) {
        var ar = [];

        arMeta.forEach(function (obj) {
            ar.push({
                '@name': 'Configuration',
                '@attr': obj
            });
        });
        return ar;
    }

    function _inhConvert(arIn) {
        return arIn.map(function (item, index) {
            return {
                '@name': 'Class',
                '@content': item,
                '@attr': {
                    'level': index
                }
            };
        });
    }

    function _catConvert(obj) {
        var arRet = [], ar;
        for (var attr in obj) {
            ar = obj[attr];
            for (var i = 0; i < ar.length; i += 1) {
                arRet.push({
                    '@name': 'Category',
                    '@attr': {
                        'name': attr
                    },
                    '@content': ar[i]
                });
            }
        }
        return arRet;
    }

    function _mappingsConvert(mappings) {

        var arRet = [];
        for (var i = 0; i < mappings.length; i += 1) {
            var obj = {
                '@name': 'Mapping',
                '@attr': mappings[i]['$']
            };
            if (Array.isArray(mappings[i]['Arguments'])) {
                obj.Arguments = { arr: _argMappingConvert(mappings[i]['Arguments']) };
            }
            arRet.push(obj);
        }
        return arRet;
    }

    function _argMappingConvert(arrArguments) {
        var args = arrArguments[0]['Argument'],
            arRet = [];
        for (var i = 0; i < args.length; i += 1) {
            arRet.push({
                '@name': 'Argument',
                '@attr': args[i]['$']
            });
        }
        return arRet;
    }

    function _convertJsonXml(obj, elementData) {
        for (var key in elementData) {
            if (key === '$') {
                obj['@attr'] = _escapeAttributes(elementData[key]);
            } else if (key === 'aprolMeta') {
                obj['aprolMeta'] = {
                    arr: _convertJsonXmlElements(elementData[key][0]['Configuration'], 'Configuration')
                };
            } else if (typeof elementData[key][0] === 'string') {
                obj[key] = elementData[key][0];
            } else {
                obj.arr = _convertJsonXmlElements(elementData[key], key);
            }
        }
        return obj;
    }

    function _convertJsonXmlElements(elements, tagname) {
        var arr = [];
        elements.forEach(function (element) {
            var obj = {
                '@name': tagname
            };
            _convertJsonXml(obj, element);
            arr.push(obj);
        });
        return arr;
    }

    function _escapeAttributes(attributes) {
        var escaped = {};
        for (var name in attributes) {
            escaped[name] = _escape(attributes[name]);
        }
        return escaped;
    }

    function _escape(data) {
        return data.replace(/[<>&'"]/g, function (c) {
            switch (c) {
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '&': return '&amp;';
                case '\'': return '&apos;';
                case '"': return '&quot;';
            }
        });
    }

    function _memberConvert(arIn, tag, meta) {
        var filtered = arIn.filter(function (item) {
            return (tag !== 'Method' || item.iatStudioExposed === true);
        });
        return filtered.map(function (item) {

            if (tag === 'Method' && !meta.isCompound) {
                item.name = item.name.replace(/^[a-z]/g, function (item) {
                    return item.toUpperCase();
                });
            }
            var obj = {
                    '@name': tag,
                    '@attr': {
                        'name': item.name
                    }
                }, 
                ar, param, info, i;

            if (item.description && item.description !== '' && item.description !== '\n') {
                obj['Description'] = _strip(item.description);
            }
            if (Array.isArray(item.aprolMeta)) {
                obj.aprolMeta = {
                    arr: _aprolConvert(item.aprolMeta) 
                };
            }
            if (item.mappings) {
                obj['Mappings'] = { arr: _mappingsConvert(item.mappings) };
            }
            if (item.result) {
                obj['Result'] = {
                    '@name': 'Result',
                    '@attr': {
                        'type': item.result.type
                    }
                };
            }
            if (item.parameter && item.parameter.length > 0) {
                ar = [];
                for (i = 0; i < item.parameter.length; i += 1) {
                    param = item.parameter[i];
                    info = {
                        '@name': 'Argument',
                        '@attr': {
                            'name': param.name,
                            'type': param.type,
                            'index': param.index,
                            'required': !param.optional
                        }
                    };
                    if (param.typeRefId) {
                        info['@attr']['typeRefId'] = param.typeRefId;
                    }
                    if (param.localizable) {
                        info['@attr']['localizable'] = param.localizable;
                    }
                    if (param.deprecated) {
                        info['@attr']['deprecated'] = param.deprecated;
                    }
                    if (param.defaultValue) {
                        info['@attr']['defaultValue'] = _stripQuotes(param.defaultValue);
                    }
                    if (param.description && param.description !== '' && param.description !== '\n') {
                        info['Description'] = _strip(param.description);
                    }
                    ar.push(info);
                }
                obj.Arguments = {
                    'Arguments': ar
                };
            }
            if (item.events && item.events.length > 0) {
                ar = [];
                for (i = 0; i < item.events.length; i += 1) {
                    param = item.events[i];
                    info = {
                        '@name': 'Event',
                        '@attr': {
                            'name': param.name
                        }
                    };
                    ar.push(info);
                }
                obj.Arguments = {
                    'Events': ar
                };
            }
            _attributesConvert(obj['@attr'], item);
            return obj;
        });
    }

    function _attributesConvert(targetObj, item) {
        for (let attr in item) {
            let excludeAttributes = [
                'public', 'getterFor', 'setterFor', 'name', 'description', 'aprolMeta', 'owner',
                'parameter', 'properties', 'styleproperties', 'originalName',
                'iatStudioExposed', 'mappings', 'ignore_className', 'result'
            ];
            if (excludeAttributes.indexOf(attr) === -1) {
                targetObj[attr] = item[attr];
            }
        }
    }

    var _templRegEx = new RegExp('<template>.*</template>', 'g');

    function _strip(str) {

        str = str.trim();
        if (str.indexOf('<') === 0) {
            str = str.substring(3);
        }
        if (str.lastIndexOf('<') === str.length - 4) {
            str = str.substring(0, str.length - 4);
        }

        return str.replace(_templRegEx, '');
    }

    function _stripQuotes(str) {

        str = str.trim();
        if (str.indexOf('"') === 0 || str.indexOf("'") === 0) {
            str = str.substring(1);
        }
        if (str.lastIndexOf('"') === str.length - 1 || str.lastIndexOf("'") === str.length - 1) {
            str = str.substring(0, str.length - 1);
        }

        return str;
    }

    module.exports = xmlPrepare;

})();
