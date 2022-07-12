(function () {
    'use strict';

    var path = require('path'),
        utils = require(path.resolve(__dirname, './utils')),
        jsPrepare = {

            run: function run(widgetInfo, qualifiedName, superClass, hasClassExtension, additionalMeta, prettify) {

                utils.prettify.active = prettify === true;

                var js = '',
                    superClassPath = utils.className2Path(superClass, false, true),
                    superClassInfoPath = superClassPath + '/designer/ClassInfo';

                if (superClass.indexOf('brease.core') !== -1) {
                    superClassInfoPath = superClassPath + '/designer/' + superClass.substring(superClass.lastIndexOf('.') + 1) + '/ClassInfo';
                }
                if (hasClassExtension) {
                    js += 'define(["' + superClassInfoPath + '", "' + qualifiedName + '/designer/ClassExtension"], function(s, e) {' + lbr();
                } else {
                    js += 'define(["' + superClassInfoPath + '"], function(s, e) {' + lbr();
                }

                js += tab(1) + '"use strict";' + lbr();
                js += tab(1) + 'var classInfo={' + lbr();
                js += tab(2) + 'meta:{' + lbr();
                js += tab(3) + 'className:"' + widgetInfo.name + '",' + lbr();
                js += tab(3) + 'parents:' + JSON.stringify(widgetInfo.meta.parents) + ',' + lbr();
                js += tab(3) + 'children:' + JSON.stringify(widgetInfo.meta.children) + ',' + lbr();
                js += tab(3) + 'inheritance:' + JSON.stringify(widgetInfo.meta.inheritance) + ',' + lbr();
                if (additionalMeta !== undefined) {
                    for (var key in additionalMeta) {
                        var value = additionalMeta[key],
                            quot = (value === '' + value) ? '"' : '';
                        if (value instanceof Object) {
                            js += tab(3) + key + ':' + JSON.stringify(value) + ',' + lbr();
                        } else {
                            js += tab(3) + key + ':' + quot + value + quot + ',' + lbr();
                        }
                    }
                }
                js += tab(3) + 'actions:' + JSON.stringify(methodObj(widgetInfo.methods)) + ',' + lbr();
                js += tab(3) + 'properties:' + JSON.stringify(propertyObj(widgetInfo.properties, widgetInfo.methods)) + lbr();
                js += tab(2) + '}' + lbr();
                js += tab(1) + '};' + lbr();

                js += tab(1) + 'if(s.classExtension) {' + lbr();
                js += tab(2) + 'classInfo.classExtension = s.classExtension;' + lbr();
                js += tab(1) + '}' + lbr();
                js += tab(1) + 'if(e) {' + lbr();
                js += tab(2) + 'classInfo.classExtension = e;' + lbr();
                js += tab(1) + '}' + lbr();
                js += tab(1) + 'return classInfo;' + lbr();

                js += '});\n';
                return js;
            }

        };

    function lbr(n) {
        return utils.prettify.lbr(n);
    }

    function tab(n) {
        return utils.prettify.tab(n);
    }

    function methodObj(methods) {
        var obj = {};
        for (var i = 0; i < methods.length; i += 1) {
            var method = methods[i],
                filtered = filterMethod(method);
            obj[method.name] = filtered;
        }
        return obj;
    }

    function propertyObj(properties, methods) {
        var obj = {};
        for (var i = 0; i < properties.length; i += 1) {
            var property = properties[i],
                getter = property.getAction,
                setter = property.setAction;

            if (property.nodeRefId !== undefined || getter !== undefined) {
                obj[property.name] = {};
            }
            if (property.nodeRefId !== undefined) {
                obj[property.name].nodeRefId = property.nodeRefId[0];
            }
            if (getter !== undefined) {
                obj[property.name].getter = getter;
                obj[property.name].setter = setter;
            }
        }
        return obj;
    }

    function filterMethod(method) {
        var name = (method.originalName) ? method.originalName : (method.name.substring(0, 1).toLowerCase() + method.name.substring(1));
        var filtered = {
            method: name
        };
        if (method.setterFor) {
            filtered.setterFor = method.setterFor;
        }
        if (method.getterFor) {
            filtered.getterFor = method.getterFor;
        }
        if (method.parameter) {
            filtered.parameter = {};
            for (var i = 0; i < method.parameter.length; i += 1) {
                var parameter = method.parameter[i];
                filtered.parameter[parameter.name] = {
                    name: parameter.name,
                    index: parameter.index,
                    type: parameter.type
                };
            }
        }
        return filtered;
    }

    module.exports = jsPrepare;

})();
