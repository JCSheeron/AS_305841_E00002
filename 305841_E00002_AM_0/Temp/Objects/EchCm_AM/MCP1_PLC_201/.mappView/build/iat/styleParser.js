(function () {
    
    'use strict';

    var _moduleXml2js = require('xml2js'),
        _xmlBuilder = new _moduleXml2js.Builder({ headless: true, preserveChildrenOrder: true }),
        _xmlConvert = {
            xml2js: _moduleXml2js.parseString,
            js2xml: _xmlBuilder.buildObject.bind(_xmlBuilder)
        };

    function _convertIndexedProperties(allProps) {
        var props = {
            StyleProperty: (allProps.StyleProperty) ? allProps.StyleProperty : []
        };
        if (Array.isArray(allProps.IndexedStyleProperty)) {
            for (var i = 0; i < allProps.IndexedStyleProperty.length; i += 1) {
                props.StyleProperty.push(_convertIndexedStyleElement(allProps.IndexedStyleProperty[i]));
            }
        }
        return props;
    }

    function _convertIndexedStyleElement(element) {
        var converted = {
            '$': element['$']
        };
        converted['StyleElement'] = element['IndexedStyleElement'];
        converted['StyleElement'][0]['$']['indexed'] = 'true';
        return converted;
    }

    var parser = {

        parse: function parse(widgetDirectory, grunt, extension) {
            var styleProperties = '',
                propertyGroups = '',
                styleObj = {},
                xml;

            extension = (extension !== undefined) ? extension : 'style';

            grunt.file.recurse(widgetDirectory, function (abspath, rootdir, subdir, filename) {
                if (filename.match('^.*\\.(' + extension + ')$') !== null) {
                    xml = grunt.file.read(abspath);
                    styleProperties = xml.substring(xml.indexOf('<StyleProperties'), xml.lastIndexOf('</StyleProperties>')) + '</StyleProperties>';
                    propertyGroups = xml.substring(xml.indexOf('<PropertyGroups'), xml.lastIndexOf('</PropertyGroups>')) + '</PropertyGroups>';
                }
            });
            if (styleProperties !== '') {
                _xmlConvert.xml2js(styleProperties, { trim: true }, function (errArg, result) {
                    if (result) {
                        styleObj.styleProperties = _convertIndexedProperties(result.StyleProperties);
                    }
                });
            }
            if (propertyGroups !== '') {
                _xmlConvert.xml2js(propertyGroups, { trim: true }, function (errArg, result) {
                    if (result) {
                        styleObj.propertyGroups = result.PropertyGroups;
                    }

                });
            }
            return styleObj;
        },

        parseFile: function parseFile(filePath, grunt) {
            var styleProperties = '',
                propertyGroups = '',
                styleObj = {},
                xml = grunt.file.read(filePath);

            styleProperties = xml.substring(xml.indexOf('<StyleProperties'), xml.lastIndexOf('</StyleProperties>')) + '</StyleProperties>';
            propertyGroups = xml.substring(xml.indexOf('<PropertyGroups'), xml.lastIndexOf('</PropertyGroups>')) + '</PropertyGroups>';

            if (styleProperties !== '') {
                _xmlConvert.xml2js(styleProperties, { trim: true }, function (errArg, result) {
                    if (result) {
                        styleObj.styleProperties = _convertIndexedProperties(result.StyleProperties);
                    }
                });
            }
            if (propertyGroups !== '') {
                _xmlConvert.xml2js(propertyGroups, { trim: true }, function (errArg, result) {
                    if (result) {
                        styleObj.propertyGroups = result.PropertyGroups;
                    }

                });
            }
            return styleObj;
        },

        parseXML: function parseXML(xml) {

            var styleObj = {},
                styleProperties = xml.substring(xml.indexOf('<StyleProperties'), xml.lastIndexOf('</StyleProperties>')) + '</StyleProperties>',
                propertyGroups = xml.substring(xml.indexOf('<PropertyGroups'), xml.lastIndexOf('</PropertyGroups>')) + '</PropertyGroups>';

            if (styleProperties !== '') {
                _xmlConvert.xml2js(styleProperties, { trim: true }, function (errArg, result) {
                    if (result) {
                        styleObj.styleProperties = _convertIndexedProperties(result.StyleProperties);
                    }
                });
            }
            if (propertyGroups !== '') {
                _xmlConvert.xml2js(propertyGroups, { trim: true }, function (errArg, result) {
                    if (result) {
                        styleObj.propertyGroups = result.PropertyGroups;
                    }

                });
            }
            return styleObj;
        },

        mergeGroups: function mergeGroups(superGroups, widgetGroups) {
            if (superGroups === undefined && widgetGroups === undefined) {
                return;
            }
            var result = superGroups;

            if (widgetGroups && widgetGroups.PropertyGroup) {

                for (var i = 0; i < widgetGroups.PropertyGroup.length; i += 1) {
                    var widgetGroup = widgetGroups.PropertyGroup[i],
                        widgetGroupName = widgetGroup['$'].name,
                        found = false;

                    for (var j in superGroups.PropertyGroup) {
                        var superGroup = superGroups.PropertyGroup[j],
                            superGroupName = superGroup['$'].name;

                        if (superGroupName === widgetGroupName) {
                            for (var key in widgetGroup['$']) {
                                result.PropertyGroup[j]['$'][key] = widgetGroup['$'][key];
                            }
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        result.PropertyGroup.push(widgetGroup);
                    }
                }
            }

            var xml = _xmlConvert.js2xml({
                PropertyGroups: result
            });
            return xml;
        },

        merge: function merge(className, baseWidget, widgetStyleProperties, exceptions) {
            if (baseWidget === undefined && widgetStyleProperties === undefined) {
                return;
            }
            exceptions = (Array.isArray(exceptions)) ? exceptions : [];
            var result = Object.assign({}, baseWidget),
                i = 0;

            result['$'] = result['$'] || {};
            if (widgetStyleProperties !== undefined) {
                var widgetPropArray = widgetStyleProperties.StyleProperty;
                for (i = 0; i < widgetPropArray.length; i += 1) {
                    var prop = widgetPropArray[i],
                        existsInBase = false;

                    for (var j = 0; j < baseWidget.StyleProperty.length; j += 1) {
                        // check if prop already exists in base
                        if (baseWidget.StyleProperty[j]['$'].name.localeCompare(prop['$'].name) === 0) {
                            for (var key in prop['$']) {
                                result.StyleProperty[j]['$'][key] = prop['$'][key];
                            }

                            // xsd of widget requires StyleElement to be before Description element
                            // the used xml-js format has no order property for sequences
                            // elements are added in xml in the same order they are added in js 
                            var stored = result.StyleProperty[j]['Description'];
                            delete result.StyleProperty[j]['Description'];

                            if (prop['StyleElement']) {
                                result.StyleProperty[j]['StyleElement'] = prop['StyleElement'];
                            } else {
                                result.StyleProperty[j]['StyleElement'] = [];
                            }

                            if (prop['Description']) {
                                result.StyleProperty[j]['Description'] = prop['Description'];
                            } else {
                                result.StyleProperty[j]['Description'] = stored || [];
                            }

                            result.StyleProperty[j]['$']['owner'] = className;
                            existsInBase = true;
                            break;
                        }
                    }
                    if (!existsInBase) {
                        result.StyleProperty.push(prop);
                    }
                }

            } 

            if (result.StyleProperty === undefined || result.StyleProperty.length === 0) {
                return '';
            }
            for (i = result.StyleProperty.length - 1; i >= 0; i -= 1) {
                var propName = result.StyleProperty[i]['$'].name;
                if (exceptions.indexOf(propName) !== -1) {
                    result.StyleProperty.splice(i, 1);
                }
            }

            var xml = _xmlConvert.js2xml({
                StyleProperties: result
            });

            return xml;

        },

        xsd: function xsd(styles) {
            var properties;
            if (styles !== '') {
                _xmlConvert.xml2js(styles, function (errArg, result) {
                    properties = result.StyleProperties;
                });
            }
            return properties;
        },

        parseXSDAttributes: function parseXSDAttributes(filename, grunt) {
            var xsd = '',
                xsdobj,
                attributes = {};
            if (filename.match('^.*\\.(xsd)$') !== null) {
                xsd = grunt.file.read(filename);
                xsd = xsd.substring(xsd.indexOf('<xs:complexType'), xsd.lastIndexOf('</xs:complexType')) + '</xs:complexType>';
            }

            if (xsd !== '') {
                _xmlConvert.xml2js(xsd, function (errArg, result) {
                    xsdobj = result['xs:complexType']['xs:attribute'];
                });

                if (xsdobj !== undefined && xsdobj.length > 0) {
                    for (var i in xsdobj) {
                        var name = xsdobj[i]['$'].name;
                        attributes[name] = {
                            type: xsdobj[i]['$'].type.replace('types:', '')
                        };
                    }
                }
            }

            return attributes;
        }
    };

    module.exports = parser;

})();
