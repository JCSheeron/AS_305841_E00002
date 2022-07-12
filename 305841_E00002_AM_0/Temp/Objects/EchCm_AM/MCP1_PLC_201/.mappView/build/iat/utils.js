(function () {
    'use strict';

    function _methodName(prefix, attribute) {
        return prefix + attribute.substring(0, 1).toUpperCase() + attribute.substring(1);
    }
    var path = require('path'),
        DataTypes = require(path.resolve(__dirname, './DataTypes')),
        widgetRegEx = /^[a-zA-Z][0-9A-Za-z_]*$/,
        jRegex = /'/g,
        utils = {

            isAllowedWidgetName: function (name) {
                return utils.isString(name) && widgetRegEx.test(name) && name !== 'common';
            },

            className2Path: function className2Path(className, includeExt, isDir) {
                if (!utils.isString(className)) {
                    return className;
                }
                var parts = className.split('.');
                if (parts.length < 3) {
                    return className;
                }
                var path = className;

                if (isDir === true) {
                    if (utils.isCoreWidget(className)) {
                        path = path.substring(0, path.lastIndexOf('.'));
                    }
                } else {
                    if (!utils.isCoreWidget(className)) {
                        path = path + '.' + parts[parts.length - 1];
                    }
                }

                path = path.replace(/\./g, '/');
                if (isDir !== true && includeExt === true) {
                    path += '.js';
                }
                //console.log('className2Path(' + className + ',includeExt=' + includeExt + ',isDir=' + isDir + ') -> ' + path);
                return path;
            },

            isCoreWidget: function isCoreWidget(className) {
                return (typeof className.indexOf === 'function' && className.indexOf('brease.') === 0);
            },

            className2File: function className2File(className) {
                var path = className;
                if (className.indexOf('widgets') === 0 || className.indexOf('system.widgets') === 0) {
                    path = path + path.substring(path.lastIndexOf('.'));
                }
                path = path.replace(/\./g, '/');
                path += '.js';
                //console.log('className2File:' + className + ' -> ' + path);
                return path;
            },

            className2MetaPath: function className2MetaPath(className, includeExt, isDir, ext) {
                if (!utils.isString(className)) {
                    return className;
                }
                var parts = className.split('.');
                if (parts.length < 3) {
                    return className;
                }
                var path = utils.className2Path(className, false, true);
                if (!utils.isCoreWidget(className)) {
                    path += '/meta';
                }

                if (isDir !== true) {
                    path = path + '/' + parts[parts.length - 1];
                }
            
                if (isDir !== true && includeExt === true) {
                    path += '.' + ext;
                }
                //console.log('className2MetaPath(' + className + ',includeExt=' + includeExt + ',isDir=' + isDir + ') -> ' + path);
                return path;
            },

            path2className: function path2className(path) {
                var className = path.replace(/\//g, '.');
                if (className.indexOf('system.widgets.') !== -1) {
                    className = className.substring(className.indexOf('system.widgets.'));
                } else {
                    className = className.substring(className.indexOf('widgets.')); 
                }
                if (className.indexOf('.js') !== -1) {
                    className = className.substring(0, className.lastIndexOf('.'));
                }

                className = className.substring(0, className.lastIndexOf('.'));

                //console.log('path2className:' + path + ' -> ' + className);
                return className;
            },

            parseBool: function parseBool(value) {
                if (typeof value === 'boolean') {
                    return value;
                }

                switch (value) {
                    case 'true':
                        return true;

                    case 'false':
                        return false;
                }

                return false;
            },

            parsePseudoJSON: function (str) {
        
                var obj;
                try {
                    return JSON.parse(str.replace(jRegex, '"'));
                } catch (error) {
                    
                }
                return obj;
            },

            defaultException: function defaultException(name) {
                return ['top', 'left', 'permissionOperate', 'permissionView'].indexOf(name) !== -1;
            },

            isString: function isString(item) {
                return (typeof item === 'string' || item instanceof String);
            },

            setter: function setter(attribute) {
                return _methodName('set', attribute);
            },

            getter: function getter(attribute) {
                return _methodName('get', attribute);
            },

            deepCopy: function deepCopy(obj) {
                return _deepCopy(obj);
            },

            encodePath: function encodePath(path) {
                return encodeURI(decodeURI(path));
            },

            control: {
                lf: '\r\n',
                strTab: '\t',
                tab: function (n) {
                    var str = '';
                    for (var i = 0; i < n; i += 1) {
                        str += this.strTab;
                    }
                    return str;
                },
                setTab: function (str) {
                    this.strTab = str;
                    return this;
                }
            },

            removeEmptyLines: function (str) {
                return str.replace(/\n\s+\n/g, '\n');
            },

            prettify: {
                active: false,
                ctrl: { 
                    tab: '\t', 
                    lbr: '\n' 
                },
                tab: function (n) {
                    var str = '';
                    if (this.active === true) {
                        n = (n !== undefined) ? n : 1;
                        for (var i = 0; i < n; i += 1) {
                            str += this.ctrl.tab;
                        } 
                    }
                    return str;
                },
                lbr: function (n) {
                    var str = '';
                    if (this.active === true) {
                        n = (n !== undefined) ? n : 1;
                        for (var i = 0; i < n; i += 1) {
                            str += this.ctrl.lbr;
                        }
                    }
                    return str;
                }
            },
        
            uniqueArray: function uniqueArray(arr) {
                return arr.filter(
                    function (item, index, arr) { 
                        return arr.lastIndexOf(item) === index;
                    });
            },

            /**
        * @method isJSONObjectInput
        * check if the value of a property is a valid JSON object with single quotes, e.g. "{'prop':5}"
        * @param {String} value
        * @return {Boolean}
        */
            isJSONObjectInput: function isJSONObjectInput(value) {
                if (!utils.isString(value)) { return false; }
                var result = (value.indexOf('{') === 0 && value.lastIndexOf('}') === value.length - 1) || (value.indexOf('[') === 0 && value.lastIndexOf(']') === value.length - 1);
                if (result === false) {
                    return false;
                } else {
                    result = true;
                    try {
                        JSON.parse(value.replace(/'/g, '"'));
                    } catch (e) {
                        result = false;
                    }
                }
                return result;
            },

            parseValueForJS: function (value, type) {
                if (DataTypes.isString(type)) {
                    return "'" + value.replace(/(?!\\)'/g, "\\'") + "'";
                } else if (DataTypes.isObject(type)) {
                    if (value === '') {
                        return 'null';
                    } else if (!utils.isJSONObjectInput(value)) {
                        return undefined;
                    } else {
                        return value;
                    }
                } else {
                    return value;
                }
            }
        };

    function _deepCopy(o) {
        // faster than $.extend and JSON.parse/stringify
        var newO;

        if (typeof o !== 'object') {
            return o;
        }
        if (!o) {
            return o;
        }

        if (Array.isArray(o)) {
            newO = [];
            for (var i = 0, l = o.length; i < l; i += 1) {
                newO[i] = _deepCopy(o[i]);
            }
            return newO;
        }

        newO = {};
        for (var k in o) {
            newO[k] = _deepCopy(o[k]);
        }
        return newO;
    }

    module.exports = utils;

})();
