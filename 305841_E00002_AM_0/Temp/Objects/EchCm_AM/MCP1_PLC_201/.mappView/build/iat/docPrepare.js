(function () {
    'use strict';
    var md = require('markdown-it')();

    var docPrepare = {

        run: function run(widgetInfo, options) {
            _options = options;
            var xsd = '',
                prop, 
                desc;

            if (widgetInfo.type !== 'core' && widgetInfo.type !== 'allEnum') {
                // struct property name = type
                var name = widgetInfo.type === 'widget' ? widgetInfo.name : widgetInfo.type,
                    pathDepth = name.split('.').length - 1,
                    prePath = '';

                for (let i = 0; i < pathDepth; i += 1) {
                    prePath += '../';
                }

                xsd += '<html lang="en">' + lbr();
                xsd += '  <head>' + lbr();
                xsd += '    <meta charset="utf-8">' + lbr();
                xsd += '    <meta http-equiv="X-UA-Compatible" content="IE=edge">' + lbr();
                xsd += '    <meta name="viewport" content="width=device-width, initial-scale=1">' + lbr();
                xsd += '    <title>' + name + ' Documentation</title>' + lbr();
                xsd += '    <link href="' + prePath + '../../assets/css/bootstrap.min.css" rel="stylesheet">' + lbr();
                xsd += '    <style>.true {color:#00aa00;font-weight:bold;}.false {color:#aaa;font-weight:normal;}</style>' + lbr();
                xsd += '  </head>' + lbr();
                xsd += '  <body>' + lbr();
                if (widgetInfo.descriptions) {
                    xsd += '<div class="panel-heading"><h3>' + name + '</h3>' + ((widgetInfo.descriptions['ASHelp']) ? '<p style="font-size:1.2em">' + widgetInfo.descriptions['ASHelp'] + '</p>' : '') + '</div>' + lbr();
                    xsd += '<div class="panel panel-default">' + lbr();
                    xsd += ' <div class="panel-heading"><h3>Widget Description</h3></div>' + lbr();
                    xsd += '<table class="table table-bordered parameter_tab">' + lbr();
                    xsd += '<tbody>' + lbr();

                    desc = widgetInfo.descriptions;
                    for (var attr in desc) {
                        if (attr !== 'ASHelp') {
                            xsd += '<tr>' + lbr();
                            xsd += '<td class="parameter_tab"><strong>' + attr + ': </strong>' + desc[attr] + '</td>' + lbr();
                            xsd += '</tr>' + lbr();
                        }
                    }
                    xsd += '</tbody>' + lbr();
                    xsd += '</table>' + lbr();
                    xsd += '</div>' + lbr();
                } else {
                    xsd += '<div class="panel-heading"><h3>' + name + '</h3>' + ((widgetInfo.description) ? '<p style="font-size:1.2em">' + widgetInfo.description + '</p>' : '') + '</div>' + lbr();
                }

                if (widgetInfo.properties.length > 0) {
                    xsd += writeProperties('Properties', widgetInfo.properties);
                }

                if (widgetInfo.structuredproperties && widgetInfo.structuredproperties.length > 0) {
                    // write instances
                    xsd += '<div class="panel panel-default">' + lbr();
                    xsd += ' <div class="panel-heading"><h3>' + 'Property Collections' + '</h3></div>' + lbr();
                    xsd += '<table class="table table-bordered parameter_tab">' + lbr();
                    xsd += '<thead>' + lbr();
                    xsd += '<tr>' + lbr();
                    xsd += '<th class="parameter_tab">name</th>' + lbr();
                    xsd += '<th class="parameter_tab">description</th>' + lbr();
                    xsd += '<th class="parameter_tab">category</th>' + lbr();
                    xsd += '<th class="parameter_tab">type</th>' + lbr();
                    xsd += '<th class="parameter_tab">minSize</th>' + lbr();
                    xsd += '<th class="parameter_tab">maxSize</th>' + lbr();
                    xsd += '</tr>' + lbr();
                    xsd += ' </thead>' + lbr();
                    xsd += '<tbody>' + lbr();
              
                    for (var j = 0; j < widgetInfo.structuredproperties.length; j += 1) {
                        prop = widgetInfo.structuredproperties[j];
                        xsd += '<tr>' + lbr();
                        xsd += '<td class="parameter_tab">' + prop.name + '</td>' + lbr();
                        xsd += '<td class="parameter_tab">' + parseLinks(removeOverrideNote(prop.description)) + '</td>' + lbr();
                        xsd += '<td class="parameter_tab">' + ((prop.category !== undefined) ? prop.category : '') + '</td>' + lbr();
                        xsd += '<td class="parameter_tab">' + '<a target="_blank" href="./' + prop.ignore_className + '/' + prop.ignore_className + '_doc.html">' + prop.type + '</a>' + '</td>' + lbr();
                        xsd += '<td class="parameter_tab">' + prop.minSize + '</td>' + lbr();
                        xsd += '<td class="parameter_tab">' + prop.maxSize + '</td>' + lbr();
                        xsd += '</tr>' + lbr();
                    }
                    xsd += '</tbody>' + lbr();
                    xsd += '</table>' + lbr();
                    xsd += '</div>' + lbr();
                }

                if (widgetInfo.styleproperties !== undefined && widgetInfo.styleproperties.StyleProperty.length > 0) {

                    xsd += '<div class="panel panel-default">' + lbr();
                    xsd += ' <div class="panel-heading"><h3>Styleable Properties</h3></div>' + lbr();

                    xsd += '<table class="table table-bordered">' + lbr();
                    xsd += '<thead>' + lbr();
                    xsd += '<tr>' + lbr();
                    xsd += '<th class="parameter_tab">name</th>' + lbr();
                    xsd += '<th class="parameter_tab">type</th>' + lbr();
                    xsd += '<th class="parameter_tab">description</th>' + lbr();
                    xsd += '<th class="parameter_tab">defaultValue</th>' + lbr();
                    xsd += '</tr>' + lbr();
                    xsd += '</thead>' + lbr();
                    xsd += '<tbody>' + lbr();

                    for (let i = 0; i < widgetInfo.styleproperties.StyleProperty.length; i += 1) {
                        prop = widgetInfo.styleproperties.StyleProperty[i].$;
                        desc = _buildDescription(widgetInfo.styleproperties.StyleProperty[i]);
                        xsd += '<tr>' + lbr();
                        xsd += '<td class="parameter_tab">' + prop.name + '</td>' + lbr();
                        xsd += '<td class="parameter_tab">' + prop.type + '</td>' + lbr();
                        xsd += '<td class="parameter_tab">' + desc.toString() + '</td>' + lbr();
                        xsd += '<td class="parameter_tab" ' + ((prop.type === 'Color' && prop.default !== undefined && prop.default !== 'transparent') ? (' style="background-color:' + prop.default + ';' + ((helligkeit(prop.default) < 383) ? 'color:white;' : 'color:black;') + '"') : '') + '>' + (prop.default || '') + '</td>' + lbr();
                        xsd += '</tr>' + lbr();
                    }
                    xsd += '</tbody>' + lbr();
                    xsd += '</table>' + lbr();
                    xsd += '</div>' + lbr();
                }

                if (widgetInfo.styles !== undefined && widgetInfo.styles.length > 0) {
                    xsd += '<div class="panel panel-default">' + lbr();
                    xsd += ' <div class="panel-heading"><h3>Styles</h3></div>' + lbr();

                    xsd += '<table class="table table-bordered">' + lbr();

                    xsd += '<tbody>' + lbr();

                    for (let i = 0; i < widgetInfo.styles.length; i += 1) {
                        prop = widgetInfo.styles[i];
                        xsd += '<tr>' + lbr();
                        xsd += '<td class="parameter_tab">' + prop.$.name + '</td>' + lbr();
                        xsd += '</tr>' + lbr();

                    }
                    xsd += '</tbody>' + lbr();
                    xsd += '</table>' + lbr();
                    xsd += '</div>' + lbr();

                }

                if (widgetInfo.events !== undefined && widgetInfo.events.length > 0) {

                    xsd += '<div class="panel panel-default">' + lbr();
                    xsd += ' <div class="panel-heading"><h3>Events</h3></div>' + lbr();

                    xsd += '<table class="table table-bordered">' + lbr();
                    xsd += '<thead>' + lbr();
                    xsd += '<tr>' + lbr();
                    xsd += '<th class="parameter_tab">name</th>' + lbr();
                    xsd += '<th class="parameter_tab">description</th>' + lbr();
                    xsd += '<th class="parameter_tab">arguments</th>' + lbr();
                    xsd += '</tr>' + lbr();
                    xsd += '</thead>' + lbr();
                    xsd += '<tbody>' + lbr();

                    for (var k = 0; k < widgetInfo.events.length; k += 1) {
                        var event = widgetInfo.events[k];
                        xsd += '<tr>' + lbr();
                        xsd += '<td class="parameter_tab">' + event.name + '</td>' + lbr();
                        xsd += '<td class="parameter_tab">' + event.description.replace(/\n\t\t\t\t/g, '\n') + '</td>' + lbr();
                        xsd += '<td class="parameter_tab">' + _buildArgDescription(event.parameter) + '</td>' + lbr();
                        xsd += '</tr>' + lbr();
                    }
                    xsd += '</tbody>' + lbr();
                    xsd += '</table>' + lbr();
                    xsd += '</div>' + lbr();
                }

                if (widgetInfo.methods !== undefined && widgetInfo.methods.length > 0) {
                    xsd += '<div class="panel panel-default">' + lbr();
                    xsd += ' <div class="panel-heading"><h3>Actions</h3></div>' + lbr();

                    xsd += '<table class="table table-bordered">' + lbr();
                    xsd += '<thead>' + lbr();
                    xsd += '<tr>' + lbr();
                    xsd += '<th class="parameter_tab">name</th>' + lbr();
                    xsd += '<th class="parameter_tab">description</th>' + lbr();
                    xsd += '<th class="parameter_tab">arguments</th>' + lbr();
                    xsd += '<th class="parameter_tab">result</th>' + lbr();
                    xsd += '</tr>' + lbr();
                    xsd += '</thead>' + lbr();
                    xsd += '<tbody>' + lbr();

                    for (var l = 0; l < widgetInfo.methods.length; l += 1) {
                        var method = widgetInfo.methods[l];
                        if (method.iatStudioExposed) {
                            xsd += '<tr>' + lbr();
                            xsd += '<td class="parameter_tab">' + method.name + '</td>' + lbr();
                            xsd += '<td class="parameter_tab">' + method.description.replace(/\n\t\t\t\t/g, '\n') + '</td>' + lbr();
                            xsd += '<td class="parameter_tab">' + _buildArgDescription(method.parameter) + '</td>' + lbr();
                            var resultDescription = '';
                            if (method.result && method.result.description) {
                                resultDescription = method.result.description;
                            }
                            xsd += '<td class="parameter_tab">' + resultDescription.replace(/\n\t\t\t\t/g, '\n') + '</td>' + lbr();
                            xsd += '</tr>' + lbr();
                        }
                    }
                    xsd += '</tbody>' + lbr();
                    xsd += '</table>' + lbr();
                    xsd += '</div>' + lbr();
                }

                xsd += '</div>' + lbr();
                // xsd += ' <script src="' + prePath + '../../jquery.js"></script>' + lbr();
                // xsd += ' <script src="' + prePath + '../../assets/js/bootstrap.min.js"></script>' + lbr();
                xsd += '</body>' + lbr();
                xsd += '</html>' + lbr();
            }

            return xsd;
        },

        runAsDocEnum: function runAsDocEnum(enums, options) {
            _options = options;
            var xsd = '',
                prop, 
                member;

            xsd += '<html lang="en">' + lbr();
            xsd += '  <head>' + lbr();
            xsd += '    <meta charset="utf-8">' + lbr();
            xsd += '    <meta http-equiv="X-UA-Compatible" content="IE=edge">' + lbr();
            xsd += '    <meta name="viewport" content="width=device-width, initial-scale=1">' + lbr();
            xsd += '    <title>' + ' Enum Documentation</title>' + lbr();
            xsd += '    <link rel="stylesheet" type="text/css" href="../../../../../../Help/styles.css">' + lbr();
            xsd += '    <link rel="stylesheet" href="../../styles/mappView.css">' + lbr();
            xsd += '    <script src="highlighter.js"></script>' + lbr();
            xsd += '  </head>' + lbr();
            xsd += '  <body onload="DomcatInitialize();highlight();">' + lbr();
            xsd += '    <script language="javascript" src="../../../../../../AS/Glossary/glossary.js" type="text/javascript"></script>' + lbr();
            xsd += '    <script language="javascript" src="../../../../../../AS/Domcat/Domcat.js" type="text/javascript"></script>' + lbr();

            xsd += '<div class="container">' + lbr();
            xsd += '<h1>Enum Documentation</h1>' + lbr();

            if (enums.length > 0) {

                xsd += '<div>' + lbr();

                xsd += '<table class="parameter_tab">' + lbr();
                xsd += '<thead>' + lbr();
                xsd += '<tr>' + lbr();
                xsd += '<th class="parameter_tab">name</th>' + lbr();
                xsd += '<th class="parameter_tab">type</th>' + lbr();
                xsd += '<th class="parameter_tab">value</th>' + lbr();
                xsd += '<th class="parameter_tab">description</th>' + lbr();
                xsd += '</tr>' + lbr();
                xsd += ' </thead>' + lbr();
                xsd += '<tbody>' + lbr();

                for (var i = 0; i < enums.length; i += 1) {
                    prop = enums[i].rawInfo;
                    if (prop.iatMeta && prop.iatMeta[0]['name'] === 'studio:visible' && prop.iatMeta[0]['doc'] === 'true') {

                        xsd += '<tr data-id="' + prop.name + '">' + lbr();
                        xsd += '<td class="parameter_tab" rowspan="' + prop.members.length + '"><a name="' + prop.name + '"></a>' + prop.name + '</td>' + lbr();

                        if (prop.enum === undefined) {
                            xsd += '<td class="parameter_tab" rowspan="' + prop.members.length + '"></td>' + lbr();
                        } else {
                            xsd += '<td class="parameter_tab" rowspan="' + prop.members.length + '">' + prop.enum.type + '</td>' + lbr();
                        }

                        for (var j = 0; j < prop.members.length; j += 1) {
                            member = prop.members[j];
                            if (j === 0) {
                                xsd += '<td class="parameter_tab">' + member.default + '</td><td class="parameter_tab">' + member.doc + '</td></tr>' + lbr();
                            } else {
                                xsd += '<tr data-id="' + prop.name + '"><td class="parameter_tab">' + member.default + '</td><td class="parameter_tab">' + member.doc + '</td></tr>' + lbr();
                            }

                        }
                    }
                }
                xsd += '</tbody>' + lbr();
                xsd += '</table>' + lbr();
                xsd += '</div>' + lbr();
            }

            xsd += '</div>' + lbr();
            xsd += '</body>' + lbr();
            xsd += '</html>' + lbr();

            return xsd;
        },

        runAsDocTypes: function runAsDocTypes(types, options) {
            _options = options;
            var xsd = '',
                prop, member;

            xsd += '<html lang="en">' + lbr();
            xsd += '  <head>' + lbr();
            xsd += '    <meta charset="utf-8">' + lbr();
            xsd += '    <meta http-equiv="X-UA-Compatible" content="IE=edge">' + lbr();
            xsd += '    <meta name="viewport" content="width=device-width, initial-scale=1">' + lbr();
            xsd += '    <title>' + (options.title || 'DataTypes') + ' Documentation</title>' + lbr();
            xsd += '    <link rel="stylesheet" type="text/css" href="../../../../../../Help/styles.css">' + lbr();
            xsd += '  </head>' + lbr();
            xsd += '  <body onload="DomcatInitialize()">' + lbr();
            xsd += '    <script language="javascript" src="../../../../../../AS/Glossary/glossary.js" type="text/javascript"></script>' + lbr();
            xsd += '    <script language="javascript" src="../../../../../../AS/Domcat/Domcat.js" type="text/javascript"></script>' + lbr();

            xsd += '<div class="container">' + lbr();
            xsd += '<h1>' + (options.title || 'DataTypes') + 'Documentation</h1>' + lbr();

            if (types.length > 0) {
                xsd += '<div>' + lbr();
                xsd += ' <div><h2>Properties</h2></div>' + lbr();

                xsd += '<table class="parameter_tab">' + lbr();
                xsd += '<thead>' + lbr();
                xsd += '<tr>' + lbr();
                xsd += '<th class="parameter_tab">Name</th>' + lbr();
                xsd += '<th class="parameter_tab">Description</th>' + lbr();
                xsd += '<th class="parameter_tab">Properties</th>' + lbr();
                xsd += '</tr>' + lbr();
                xsd += ' </thead>' + lbr();
                xsd += '<tbody>' + lbr();

                for (var i = 0; i < types.length; i += 1) {
                    prop = types[i].rawInfo;
                    xsd += '<tr id="' + prop.name + '">' + lbr();
                    xsd += '<td class="parameter_tab"><a name="' + prop.name + '"></a>' + prop.name + '</td>' + lbr();

                    xsd += '<td class="parameter_tab">' + selectASSection(prop.doc) + '</td>' + lbr();

                    xsd += '<td class="parameter_tab"><ul>';
                    for (var j = 0; j < prop.members.length; j += 1) {
                        member = prop.members[j];
                        if (member.tagname === 'property') {
                            xsd += '<li>' + member.name + ': ' + member.type + member.doc + '</li>';
                        }
                    }
                    xsd += '</ul></td>' + lbr();
                    xsd += '</tr>' + lbr();
                }
                xsd += '</tbody>' + lbr();
                xsd += '</table>' + lbr();
                xsd += '</div>' + lbr();
            }

            xsd += '</div>' + lbr();
            xsd += '</body>' + lbr();
            xsd += '</html>' + lbr();

            return xsd;
        }

    };

    var _options = {
        prettify: true
    };

    function writeProperties(header, properties) {
        var xsd = '';
        xsd += '<div class="panel panel-default">' + lbr();
        xsd += ' <div class="panel-heading"><h3>' + header + '</h3></div>' + lbr();

        xsd += '<table class="table table-bordered parameter_tab">' + lbr();
        xsd += '<thead>' + lbr();
        xsd += '<tr>' + lbr();
        xsd += '<th class="parameter_tab">name</th>' + lbr();
        xsd += '<th class="parameter_tab">description</th>' + lbr();
        xsd += '<th class="parameter_tab">category</th>' + lbr();
        xsd += '<th class="parameter_tab">type</th>' + lbr();
        xsd += '<th class="parameter_tab">defaultValue</th>' + lbr();
        xsd += '<th class="parameter_tab">bindable</th>' + lbr();
        xsd += '<th class="parameter_tab">readOnly</th>' + lbr();
        xsd += '<th class="parameter_tab">required</th>' + lbr();
        xsd += '<th class="parameter_tab">localizable</th>' + lbr();
        xsd += '<th class="parameter_tab">editableBinding</th>' + lbr();
        xsd += '<th class="parameter_tab">projectable</th>' + lbr();
        xsd += '<th class="parameter_tab">cssProp (<small>has no setter and getter in JS</small>)</th>' + lbr();
        xsd += '<th class="parameter_tab">groupRefId</th>' + lbr();
        xsd += '<th class="parameter_tab">groupOrder</th>' + lbr();
        xsd += '<th class="parameter_tab">nodeRefId (<small>for linking node and value</small>)</th>' + lbr();
        xsd += '<th class="parameter_tab">deprecated</th>' + lbr();
        xsd += '<th class="parameter_tab">typeRefId (<small>for StyleReference</small>)</th>' + lbr();
        xsd += '<th class="parameter_tab">subtype (<small>for MpComIdentReference</small>)</th>' + lbr();

        xsd += '</tr>' + lbr();
        xsd += ' </thead>' + lbr();
        xsd += '<tbody>' + lbr();

        for (var i = 0; i < properties.length; i += 1) {
            var prop = properties[i];

            xsd += '<tr>' + lbr();
            xsd += '<td class="parameter_tab">' + prop.name + '</td>' + lbr();
            xsd += '<td class="parameter_tab">' + parseLinks(removeOverrideNote(prop.description)) + '</td>' + lbr();
            xsd += '<td class="parameter_tab">' + ((prop.category !== undefined) ? prop.category : '') + '</td>' + lbr();
            xsd += '<td class="parameter_tab">' + parseIATTypes(prop.type) + '</td>' + lbr();
            xsd += '<td class="parameter_tab">' + ((prop.defaultValue !== undefined) ? prop.defaultValue : 'no defaultValue<br/>defined') + '</td>' + lbr();
            xsd += '<td' + _class(!prop.initOnly) + '>' + ((prop.initOnly !== undefined) ? !prop.initOnly : '') + '</td>' + lbr();
            xsd += '<td' + _class(prop.readOnly) + '>' + ((prop.readOnly !== undefined) ? prop.readOnly : '') + '</td>' + lbr();
            xsd += '<td' + _class(prop.required) + '>' + ((prop.required !== undefined) ? prop.required : '') + '</td>' + lbr();

            xsd += '<td' + _class(prop.localizable) + '>' + ((prop.localizable !== undefined) ? prop.localizable : '') + '</td>' + lbr();
            xsd += '<td' + _class(prop.editableBinding) + '>' + ((prop.editableBinding !== undefined) ? prop.editableBinding : '') + '</td>' + lbr();
            xsd += '<td' + _class(prop.projectable) + '>' + ((prop.projectable !== undefined) ? prop.projectable : '') + '</td>' + lbr();
            xsd += '<td' + _class(prop.cssProp) + '>' + ((prop.cssProp !== undefined) ? prop.cssProp : '') + '</td>' + lbr();
            xsd += '<td class="parameter_tab">' + ((prop.groupRefId !== undefined) ? prop.groupRefId : '') + '</td>' + lbr();
            xsd += '<td class="parameter_tab">' + ((prop.groupOrder !== undefined) ? prop.groupOrder : '') + '</td>' + lbr();
            xsd += '<td class="parameter_tab">' + ((prop.nodeRefId !== undefined) ? prop.nodeRefId : '') + '</td>' + lbr();
            xsd += '<td class="parameter_tab">' + ((prop.deprecated !== undefined) ? prop.deprecated : '') + '</td>' + lbr();
            xsd += '<td class="parameter_tab">' + ((prop.typeRefId !== undefined) ? prop.typeRefId : '') + '</td>' + lbr();
            xsd += '<td class="parameter_tab">' + ((prop.subtype !== undefined) ? prop.subtype : '') + '</td>' + lbr();
            xsd += '</tr>' + lbr();
        }
        xsd += '</tbody>' + lbr();
        xsd += '</table>' + lbr();
        xsd += '</div>' + lbr();
        return xsd;
    }

    function _class(flag) {
        return (flag === true) ? ' class="true parameter_tab"' : ' class="false parameter_tab"';
    }

    function removeOverrideNote(txt) {
        var regexp = new RegExp('<p><strong>Defined in override.*</strong></p>', 'g');

        return txt.replace(regexp, '');
    }

    function parseLinks(txt) {

        return txt.replace(/href="#!/g, 'target="_blank" href="../../../../../breaseDoku/out/template.html#!');
    }

    function selectASSection(txt) {
        if (txt.indexOf('<section>') !== -1) {
            txt = txt.substring(0, txt.indexOf('<section>')) + txt.substring(txt.lastIndexOf('</section>') + 10);
        }
        txt = txt.replace(/<template>/g, '');
        txt = txt.replace(/<\/template>/g, '');
        return txt.replace(/!\/api\//g, '');
        //return txt;
    }

    function parseIATTypes(txt) {
        if (txt.indexOf('brease.') !== -1) {
            return ('<a target="_blank" href="../../../../../breaseDoku/out/template.html#!/api/' + txt + '">' + txt + '</a>');
        } else {
            return txt;
        }
    }

    function lbr(n) {
        var str = '';
        n = (n !== undefined) ? n : 1;
        if (_options.prettify === true) {
            for (var i = 0; i < n; i += 1) {
                str += '\n';
            }
        }
        return str;
    }

    function _buildDescription(prop) {
        var result;
        if (prop.Description !== undefined) {
            result = prop.Description[0];
            result = result.replace(/\n\t\t\t\t/g, '\n');
            return md.render(result);
        }

        return '';
    }

    function _buildArgDescription(parameters) {
        var result = '';
        if (parameters !== undefined && parameters.length > 0) {
            result += '<ul>' + lbr();
            for (var i = 0; i < parameters.length; i += 1) {
                var para = parameters[i];
                result += '<li>' + (para.optional ? '(optional) ' : '') + para.name + ': ' + para.type + lbr();
                if (para.description && para.description.length > 0) {
                    result += '<p>' + para.description.replace(/\n\t\t\t\t/g, '\n') + '</p>' + lbr();
                }
                result += '</li>' + lbr();
            }
            result += '</ul>' + lbr();
        }

        return result;
    }

    function hexToRgb(hex) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        // eslint-disable-next-line no-unused-vars
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    function helligkeit(hex) {
        var rgb = hexToRgb(hex);
        if (rgb === null) {
            return 0;
        }
        var result = rgb.r + rgb.g + rgb.b;
        return (isNaN(result)) ? 0 : result;
    }

    module.exports = docPrepare;

})();
