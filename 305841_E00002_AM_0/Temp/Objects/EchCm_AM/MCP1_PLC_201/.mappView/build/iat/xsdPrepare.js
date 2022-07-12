(function () {
    'use strict';

    var grunt = require('grunt'),
        path = require('path'),
        utils = require(path.resolve(__dirname, './utils'));

    var xsdPrepare = {
        XMLHeader: function XMLHeader() {
            return '<?xml version="1.0" encoding="utf-8"?>' + lbr();
        },
        getContentHeader: function getContentHeader() {
            return xsdPrepare.XMLHeader() + '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" targetNamespace="http://www.br-automation.com/iat2015/contentDefinition/v2" xmlns:iat="http://www.br-automation.com/iat2015/contentDefinition/v2" xmlns:types="http://www.br-automation.com/iat2015/widgetTypes/v2" elementFormDefault="qualified">' + lbr(1);
        },
        getStyleHeader: function getStyleHeader() {
            return xsdPrepare.XMLHeader() + 
            '<xs:schema targetNamespace="http://www.br-automation.com/iat2015/styles/engineering/v1" ' + lbr() +
            tab(1) + 'xmlns:xs="http://www.w3.org/2001/XMLSchema" ' + lbr() +
            tab(1) + 'xmlns:sd="http://www.br-automation.com/iat2015/styles/engineering/v1" ' + lbr() +
            tab(1) + 'xmlns:wt="http://www.br-automation.com/iat2015/widgetTypes/v2" ' + lbr() +
            tab(1) + 'elementFormDefault="qualified">' + lbr();
        },
        getEventHeader: function getEventHeader() {
            return xsdPrepare.XMLHeader() + '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" targetNamespace="http://www.br-automation.com/iat2014/eventbinding/v2" xmlns:s1="http://www.br-automation.com/iat2014/eventbinding/v2" xmlns:types="http://www.br-automation.com/iat2015/widgetTypes/v2" xmlns:var="http://www.br-automation.com/iat2015/varTypes/v2" elementFormDefault="qualified">' + lbr(1);
        },
        footer: '</xs:schema>',

        run: function run(widgetInfo, options, DataTypes, Properties, localGrunt) {
            utils.prettify.active = options.prettify === true;
            xsdPrepare.grunt = localGrunt || grunt;

            if (widgetInfo.type === 'base') {
                // xsd for BaseWidget
                return createBaseXsd(widgetInfo);

            } else if (widgetInfo.type === 'enum') {
                // creates only simpleType
                // enums are collected in widgetTypes
                return createEnumXsd(widgetInfo);

            } else {
                // xsd for Widgets
                return createWidgetXsd(widgetInfo, DataTypes, Properties);
            }
        },

        failWithWarning: function failWithWarning(message) { 
            this.grunt.fail.warn(message);
        },

        runEventActionDefinition: function runEventActionDefinition(widgetInfo, options, DataTypes) {
            utils.prettify.active = options.prettify === true;
            var xsd = '',
                method, 
                i = 0;

            if (widgetInfo.methods.length > 0) {
                var readActions = [];

                for (i = 0; i < widgetInfo.methods.length; i += 1) {
                    method = widgetInfo.methods[i];
                    if (method.iatStudioExposed === true && method.read === true) {
                        readActions.push(method.name);
                    }
                }

                xsd += baseAction(widgetInfo.name, readActions);

                for (i = 0; i < widgetInfo.methods.length; i += 1) {
                    method = widgetInfo.methods[i];
                    if (method.iatStudioExposed === true) {

                        if (method.read === true) {
                            xsd += widgetReadAction(widgetInfo.name, method.name);
                        } else {
                            xsd += widgetAction(widgetInfo.name, method.name, method.parameter || [], DataTypes);
                        }
                    }
                }
            }
            if (widgetInfo.events.length > 0) {
                xsd += widgetEvents(widgetInfo.name, widgetInfo.events);
            }

            return xsdPrepare.getEventHeader() + xsd + xsdPrepare.footer;
        },

        runWidgetStyleDefinition: function runWidgetStyleDefinition(widgetInfo, options) {
            utils.prettify.active = options.prettify === true;
            var xsd = '',
                prop, i = 0;

            if (widgetInfo.styleproperties !== undefined && widgetInfo.styleproperties.StyleProperty.length > 0) {

                xsd += tab(1) + '<xs:complexType name="' + widgetInfo.name + '">' + lbr();
                xsd += tab(2) + '<xs:complexContent>' + lbr();
                xsd += tab(3) + '<xs:extension base="sd:stylesBase">' + lbr();

                for (i = 0; i < widgetInfo.styleproperties.StyleProperty.length; i += 1) {
                    prop = widgetInfo.styleproperties.StyleProperty[i]['$'];
                    if (prop.hide !== true && prop.hide !== 'true') {
                        xsd += tab(4) + '<xs:attribute name="' + prop.name + '" use="optional" type="wt:' + prop.type + '"></xs:attribute>' + lbr(); 
                    }
                }

                xsd += tab(3) + '</xs:extension>' + lbr();
                xsd += tab(2) + '</xs:complexContent>' + lbr();
                xsd += tab(1) + '</xs:complexType>' + lbr();
            }
            if (xsd !== '') { 
                return xsdPrepare.getStyleHeader() + xsd + xsdPrepare.footer;
            } else {
                return '';
            }
        }
    };

    function createArrayExtension(arrayProps) {
        var isRequired = false,
            elementPart = '';

        for (var i = 0; i < arrayProps.length; i += 1) {
            var prop = arrayProps[i];
            elementPart += tab(7) + '<xs:element name="' + prop.name + '" type="types:' + prop.type + '" minOccurs="' + ((prop.required === true) ? '1' : '0') + '" maxOccurs="1"></xs:element>' + lbr();
            if (prop.required === true) {
                isRequired = true;
            }
        }
        var extension = tab(4) + '<xs:element name="Properties" minOccurs="' + ((isRequired === true) ? '1' : '0') + '" maxOccurs="1">' + lbr();
        extension += tab(5) + '<xs:complexType>' + lbr();
        extension += tab(6) + '<xs:all>' + lbr();
        extension += elementPart;
        extension += tab(6) + '</xs:all>' + lbr();
        extension += tab(5) + '</xs:complexType>' + lbr();
        extension += tab(4) + '</xs:element>' + lbr();
        return extension;
    }

    function createRestriction(widgetInfo, attributeRestrictions) {
        // base of all Widgets in xsd are BaseWidget or BaseContentWidget
        var superClassName = (widgetInfo.meta.visible === 'false') ? 'BaseWidget' : 'BaseContentWidget',
            xsdRestriction = tab(0) + '<xs:complexType name="' + widgetInfo.name + 'Restrict" abstract="true">' + lbr() +
                     tab(1) + '<xs:complexContent>' + lbr() +
                         tab(2) + '<xs:restriction base="iat:brease.core.' + superClassName + '">' + lbr();

        xsdRestriction += attributeRestrictions;
        xsdRestriction += tab(2) + '</xs:restriction>' + lbr() +
                     tab(1) + '</xs:complexContent>' + lbr() +
                 '</xs:complexType>' + lbr();
        return xsdRestriction;
    }

    function createExtension(widgetInfo, attributeExtensions, arrayExtension) {

        var containerExtension = '',
            xsdExtension = tab(0) + '<xs:complexType name="' + widgetInfo.name + '">' + lbr() +
                                     tab(1) + '<xs:complexContent>' + lbr() +
                                         tab(2) + '<xs:extension base="iat:' + widgetInfo.name + 'Restrict">' + lbr();

        if (widgetInfo.meta.isContainer === 'true') {
            containerExtension += tab(4) + '<xs:element name="Widgets" type="iat:Widgets" minOccurs="1" maxOccurs="1">' + lbr();
            containerExtension += tab(5) + '<xs:unique name="' + widgetInfo.name + '.zIndex">' + lbr();
            containerExtension += tab(6) + '<xs:selector xpath="./iat:Widget"/>' + lbr();
            containerExtension += tab(6) + '<xs:field xpath="@zIndex"/>' + lbr();
            containerExtension += tab(5) + '</xs:unique>' + lbr();
            containerExtension += tab(4) + '</xs:element>' + lbr();
        }

        if (containerExtension !== '' || arrayExtension !== '') {
            xsdExtension += tab(3) + '<xs:all>' + lbr() + containerExtension + arrayExtension + tab(3) + '</xs:all>' + lbr();
        }
        xsdExtension += attributeExtensions + tab(2) + '</xs:extension>' + lbr() +
                         tab(1) + '</xs:complexContent>' + lbr() +
                     '</xs:complexType>' + lbr();

        return xsdExtension;
    }

    function createBaseXsd(widgetInfo) {

        var xsd = '<xs:complexType name="' + widgetInfo.name + '" abstract="true">' + lbr() +
                     tab(1) + '<xs:sequence />' + lbr() +
                     tab(1) + '<xs:attribute name="id" use="required" type="types:WidgetId" />' + lbr();

        for (var i = 0; i < widgetInfo.properties.length; i += 1) {
            xsd += attributeExtension(widgetInfo.properties[i], false);
        }
        for (var j = 0; j < widgetInfo.styleproperties.StyleProperty.length; j += 1) {
            xsd += attributeExtension(widgetInfo.styleproperties.StyleProperty[j]['$'], true);
        }
        xsd += '</xs:complexType>' + lbr() +
                '<xs:element name="Widget" type="iat:brease.core.BaseWidget" />' + lbr();

        return xsdPrepare.getContentHeader() + xsd + xsdPrepare.footer;
    }

    function createWidgetXsd(widgetInfo, DataTypes, Properties) {
        var arrayProps = [],
            prop,
            hide,
            use,
            attrName, attrType, attrUse, attrDefault,
            i = 0,
            attributeRestrictions = '',
            attributeExtensions = '',
            arrayExtension = '';

        for (i = 0; i < widgetInfo.properties.length; i += 1) {
            prop = widgetInfo.properties[i];
            hide = (prop.hide === true || prop.hide === 'true');
            attrName = ' name="' + prop.name + '"';
            attrType = ' type="types:' + prop.type + '"';
            if (DataTypes.isArrayType(prop.type)) {
                if (prop.projectable !== false) { // projectable is false or undefined
                    arrayProps.push(prop);
                }
            } else {
                // not projectable properties have attribute use="prohibited"
                // such properties must not have a default value

                var baseProp = Properties.getBaseProp(prop.name);
                // property wurde in der inheritance chain woanders als im BaseWidget per doku tag festgelegt
                if (prop.owner !== 'brease.core.BaseWidget') {

                    // property existiert nicht im BaseWidget -> extension
                    if (!baseProp) {
                        if (hide !== true && prop.projectable !== false) {
                            use = (prop.required === true) ? 'required' : 'optional';
                            attrUse = ' use="' + use + '"';
                            attrDefault = parseDefault(prop.defaultValue, 'default', use);
                            attributeExtensions += tab(3) + '<xs:attribute' + attrName + attrUse + attrType + attrDefault + ' />' + lbr();
                        }
                    } else if (baseProp.hideable !== false) { // property existiert im BaseWidget -> restriction
                        use = ((hide === true || prop.projectable === false) ? 'prohibited' : ((prop.required === true) ? 'required' : 'optional'));
                        attrUse = ' use="' + use + '"';
                        attrDefault = parseDefault(prop.defaultValue, 'default', use);
                        attrType = ' type="types:' + prop.type + '"';
                        attributeRestrictions += tab(3) + '<xs:attribute' + attrName + attrUse + attrType + attrDefault + ' />' + lbr();
                    }
                }

                // property wurde nur im BaseWidget per doku tag festgelegt
                if (prop.owner === 'brease.core.BaseWidget' && prop.defaultValue !== undefined) {
                    // TODO: properties und default values muessten aus dem BaseWidget ausgelesen werden! momentan hardcodiert in Properties
                    if (!baseProp) {
                        xsdPrepare.failWithWarning('unknown base property "' + prop.name + '" in xsdPrepare.createWidgetXsd');
                    } else {
                        attrUse = ' use="' + baseProp.use + '"';
                        attrType = ' type="types:' + baseProp.type + '"';
                    }
                    attrDefault = parseDefault(prop.defaultValue, 'default', baseProp.use);
                    if (baseProp.default === undefined) {
                        attributeRestrictions += tab(3) + '<xs:attribute' + attrName + attrUse + attrType + attrDefault + ' />' + lbr();

                    } else if (prop.defaultValue !== baseProp.default) {
                        attributeExtensions += tab(3) + '<xs:attribute' + attrName + attrUse + attrType + attrDefault + ' />' + lbr();
                    }

                }
            }
        }
        // special treatment of array datatypes
        // we use xsd elements
        if (arrayProps.length > 0) {
            arrayExtension = createArrayExtension(arrayProps);
        }

        if (widgetInfo.styleproperties !== undefined && widgetInfo.styleproperties.StyleProperty.length > 0) {

            for (i = 0; i < widgetInfo.styleproperties.StyleProperty.length; i += 1) {
                prop = widgetInfo.styleproperties.StyleProperty[i]['$'];
                hide = (prop.hide === true || prop.hide === 'true');

                if (widgetInfo.superproperties[prop.name] !== undefined) {
                    attributeRestrictions += attributeRestriction(prop, hide, true, 3);
                } else if (hide !== true) {
                    attributeExtensions += attributeExtension(prop, true, 3);
                }
            }
        }

        var xsd = createRestriction(widgetInfo, attributeRestrictions) + createExtension(widgetInfo, attributeExtensions, arrayExtension);

        return xsdPrepare.getContentHeader() + xsd + xsdPrepare.footer;
    }

    function attributeExtension(prop, isStyleProp, tabs) {
        isStyleProp = (isStyleProp === true);
        tabs = (tabs !== undefined) ? tabs : 1;
        var attrUse = ((prop.required === true) ? 'required' : 'optional');
        return tab(tabs) + '<xs:attribute name="' + prop.name + '" use="' + attrUse + '" type="types:' + prop.type + '"' + parseDefault((isStyleProp) ? prop.default : prop.defaultValue) + ' />' + lbr();
    }

    function attributeRestriction(prop, hide, isStyleProp, tabs) {
        isStyleProp = (isStyleProp === true);
        tabs = (tabs !== undefined) ? tabs : 1;
        var attrUse = ((hide === true) ? 'prohibited' : ((prop.required === true) ? 'required' : 'optional')),
            attrDefault = (hide === true) ? '' : parseDefault((isStyleProp) ? prop.default : prop.defaultValue);
        return tab(tabs) + '<xs:attribute name="' + prop.name + '" use="' + attrUse + '" type="types:' + prop.type + '"' + attrDefault + ' />' + lbr();
    }

    function createEnumXsd(widgetInfo) {
        var xsd = tab(1) + '<xs:simpleType name="' + widgetInfo.name + '">' + lbr() +
            tab(2) + '<xs:restriction base="xs:string">' + lbr();

        for (var i = 0, l = widgetInfo.properties.length; i < l; i += 1) {
            xsd += tab(3) + '<xs:enumeration' + parseDefault(widgetInfo.properties[i].defaultValue, 'value') + ' />' + lbr();
        }

        xsd += tab(2) + '</xs:restriction>' + lbr();
        xsd += tab(1) + '</xs:simpleType>' + lbr();
        return xsd;
    }

    function parseDefault(value, attrName, use) {
        var ret = '';
        if (use === 'required' || use === 'prohibited') {
            return ret;
        }
        if (value !== undefined) {
            if (value === 'undefined') {
                value = '';
            } else {
                value = '' + value;
                if (value.indexOf("'") === 0) {
                    value = value.substring(1);
                }
                if (value.lastIndexOf("'") === value.length - 1) {
                    value = value.substring(0, value.length - 1);
                }
            }
            ret = ' ' + ((attrName) || 'default') + '="' + value + '"';
        }
        return ret;
    }
    
    function lbr(n) {
        return utils.prettify.lbr(n);
    }

    function tab(n) {
        return utils.prettify.tab(n);
    }

    function baseAction(name, readActions) {
        var x = '';

        x += tab(1) + '<xs:complexType name="' + name + '.Action">' + lbr();
        x += tab(2) + '<xs:complexContent>' + lbr();
        x += tab(3) + '<xs:extension base="s1:Target.BaseWidget">' + lbr();
        x += tab(4) + '<xs:sequence>' + lbr();
        x += tab(5) + '<xs:element name="Method" type="s1:' + name + '.Action.widgetMethod"></xs:element>' + lbr();
        x += tab(4) + '</xs:sequence>' + lbr();
        x += tab(3) + '</xs:extension>' + lbr();
        x += tab(2) + '</xs:complexContent>' + lbr();
        x += tab(1) + '</xs:complexType>' + lbr();

        x += tab(1) + '<xs:complexType name="' + name + '.Action.widgetMethod" abstract="true">' + lbr();
        x += tab(2) + '<xs:complexContent>' + lbr();
        x += tab(3) + '<xs:extension base="s1:widgetMethod"></xs:extension>' + lbr();
        x += tab(2) + '</xs:complexContent>' + lbr();
        x += tab(1) + '</xs:complexType>' + lbr();

        if (readActions.length > 0) {
            x += tab(1) + '<xs:complexType name="' + name + '.ReadAction">' + lbr();
            x += tab(2) + '<xs:complexContent>' + lbr();
            x += tab(3) + '<xs:extension base="s1:ReadTarget.BaseWidget">' + lbr();
            x += tab(4) + '<xs:sequence>' + lbr();
            x += tab(5) + '<xs:element name="Method" type="s1:' + name + '.ReadAction.widgetMethod"></xs:element>' + lbr();
            x += tab(4) + '</xs:sequence>' + lbr();
            x += tab(3) + '</xs:extension>' + lbr();
            x += tab(2) + '</xs:complexContent>' + lbr();
            x += tab(1) + '</xs:complexType>' + lbr();

            x += tab(1) + '<xs:complexType name="' + name + '.ReadAction.widgetMethod" abstract="true">' + lbr();
            x += tab(2) + '<xs:complexContent>' + lbr();
            x += tab(3) + '<xs:extension base="s1:' + name + '.Action.widgetMethod"></xs:extension>' + lbr();
            x += tab(2) + '</xs:complexContent>' + lbr();
            x += tab(1) + '</xs:complexType>' + lbr();
        }
        return x;

    }

    function widgetReadAction(widgetName, methodName) {
        var xml = tab(1) + '<xs:complexType name="' + widgetName + '.Action.' + methodName + '">' + lbr();
        xml += tab(2) + '<xs:complexContent>' + lbr();
        xml += tab(3) + '<xs:extension base="s1:' + widgetName + '.ReadAction.widgetMethod">' + lbr();
        xml += tab(3) + '</xs:extension>' + lbr();
        xml += tab(2) + '</xs:complexContent>' + lbr();
        xml += tab(1) + '</xs:complexType>' + lbr();
        return xml;
    }

    function widgetAction(name, action, args, DataTypes) {
        var x = '', arg;

        x += tab(1) + '<xs:complexType name="' + name + '.Action.' + action + '">' + lbr();
        x += tab(2) + '<xs:complexContent>' + lbr();
        x += tab(3) + '<xs:extension base="s1:' + name + '.Action.widgetMethod">' + lbr();
        var arrayArgs = '',
            simpleArgs = '';
        for (var i = 0; i < args.length; i += 1) {
            arg = args[i];
            if (DataTypes.isArrayType(arg.type)) {
                if (arrayArgs === '') {
                    arrayArgs += tab(4) + '<xs:sequence>' + lbr();
                    arrayArgs += tab(5) + '<xs:element name="Arguments" minOccurs="1" maxOccurs="1">' + lbr();
                    arrayArgs += tab(6) + '<xs:complexType>' + lbr();
                    arrayArgs += tab(7) + '<xs:all>' + lbr();
                }

                arrayArgs += tab(8) + '<xs:element name="' + arg.name + '" type="types:' + arg.type + '_Variable' + '" minOccurs="1" maxOccurs="1"></xs:element>' + lbr();

            } else {

                simpleArgs += tab(4) + '<xs:attribute name="' + arg.name + '" type="var:' + arg.type + '" use="' + ((arg.optional === true) ? 'optional' : 'required') + '"></xs:attribute>' + lbr();
            }
        }
        if (arrayArgs !== '') {
            arrayArgs += tab(7) + '</xs:all>' + lbr();
            arrayArgs += tab(6) + '</xs:complexType>' + lbr();
            arrayArgs += tab(5) + '</xs:element>' + lbr();
            arrayArgs += tab(4) + '</xs:sequence>' + lbr();
        }
        x += arrayArgs + simpleArgs;
        x += tab(3) + '</xs:extension>' + lbr();
        x += tab(2) + '</xs:complexContent>' + lbr();
        x += tab(1) + '</xs:complexType>' + lbr();

        return x;

    }

    function widgetEvents(name, events) {
        var x = '';

        x += tab(1) + '<xs:complexType name="' + name + '.Event">' + lbr();
        x += tab(2) + '<xs:complexContent>' + lbr();
        x += tab(3) + '<xs:extension base="s1:Source.BaseWidget">' + lbr();
        x += tab(4) + '<xs:attribute name="event" type="s1:' + name + '.Events" use="required"></xs:attribute>' + lbr();
        x += tab(3) + '</xs:extension>' + lbr();
        x += tab(2) + '</xs:complexContent>' + lbr();
        x += tab(1) + '</xs:complexType>' + lbr();

        x += tab(1) + '<xs:simpleType name="' + name + '.Events">' + lbr();
        x += tab(2) + '<xs:restriction base="xs:string">' + lbr();
        for (var i = 0; i < events.length; i += 1) {
            x += tab(3) + '<xs:enumeration value="' + events[i].name + '"></xs:enumeration>' + lbr();
        }
        x += tab(2) + '</xs:restriction>' + lbr();
        x += tab(1) + '</xs:simpleType>' + lbr();

        return x;
    }

    module.exports = xsdPrepare;

})();
