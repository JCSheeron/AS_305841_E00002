define(['brease/core/Utils', 
    'brease/core/libs/Deferred'
], function (Utils, Deferred) {

    'use strict';

    /**
    * @class brease.controller.FileManager
    * @extends Object
    * @singleton
    */

    var controller = {

        /**
        * @method getPathByType
        * Get path for a widget type
        * @param {WidgetType} widgetType
        * @param {PathType} pathType
        */
        getPathByType: function (widgetType, pathType) {
            return _getPathByType(widgetType, pathType);
        },

        /**
        * @method getPathByClass
        * Get path for a widget class name
        * @param {ClassName} widgetClass (required)
        * @param {PathType} pathType
        */
        getPathByClass: function (widgetClass, pathType) {
            if (pathType) {
                return _getPathByClass(widgetClass, pathType);
            } else {
                if (_path[widgetClass] !== undefined) {
                    return _path[widgetClass];
                } else {
                    if (Utils.isString(widgetClass)) {
                        var parsed = _parseClass(widgetClass);
                        _path[widgetClass] = _path[parsed.class] = parsed;
                        _path[_path[widgetClass].type] = parsed;
                        return _path[widgetClass];
                    } else {
                        return undefined;
                    }
                }
            }
        },

        loadJSFiles: function (widgetPath, loadMetaData) {
            if (!widgetPath || !widgetPath.path || !widgetPath.class) {
                var def = new Deferred();
                def.reject('undefined widget path');
                return def;
            } else {
                var files = [widgetPath.path],
                    classPath = widgetPath.class;

                if (loadMetaData === true) {
                    files.push(classPath + '/designer/ClassInfo');
                }

                if (_readyDef[classPath] === undefined) {
                    _readyDef[classPath] = new Deferred();
                    require(files, _loadJSsuccess.bind(null, classPath), _loadJSfail.bind(null, classPath));
                }
                return _readyDef[classPath];
            }
        },

        // needed for unit tests only, where widgets are not loaded the usual way
        loadWidgetMeta: function (widgetPath) {

            var classPath = widgetPath.class;

            if (_readyDef[classPath] === undefined) {
                return controller.loadJSFiles(widgetPath, true);
            } else {

                var ready = new Deferred(),
                    metaFile = [classPath + '/designer/ClassInfo'];

                require(metaFile, function (classInfo) {

                    var widgetType = classInfo.meta.className,
                        classPath = _getPathByType(widgetType, 'class');

                    _readyDef[classPath].doneData[0].meta = classInfo.meta;

                    ready.resolve();
                }, function (e) {

                    console.debug(e.message);
                    ready.reject();
                });

                return ready;
            }
        },

        loadOverlays: function (overlays) {
            var ready = new Deferred(Deferred.TYPE_SINGLE);

            require(overlays, function success() {
                ready.resolve.apply(ready, arguments);
            }, function fail() {
                ready.reject('script error');
            });

            return ready;
        },

        loadHTMLFiles: function (arWidgets, queueId, loopParams) {

            var def = new Deferred(Deferred.TYPE_SINGLE, loopParams),
                widgetTypes = _uniqueTypeArray.call(this, arWidgets);

            if (widgetTypes.length > 0) {
                _loadHTMLFiles.call(this, widgetTypes, queueId).done(function () {
                    def.resolve();
                });
            } else {
                def.resolve();
            }

            return def;
        },

        getHTMLByType: function (widgetType) {
            return _loadedFiles[widgetType];
        }
    };

    function _loadJSsuccess(className, WidgetClass, classInfo) {

        if (WidgetClass) {
            if (classInfo && WidgetClass.meta === undefined) {
                WidgetClass.meta = classInfo.meta;
            }
            WidgetClass.defaults.className = className;
            _readyDef[className].resolve(WidgetClass, className);
        } else {
            _readyDef[className].reject('script error', className);
        }
    }

    function _loadJSfail(className, e) {
        _readyDef[className].reject(e.message, className);
    }

    var _readyDef = {
    };

    function _loadHTMLFiles(widgetTypes, queueId) {

        var widgetType = '',
            filesToLoad = [],
            request = _getRequest(queueId);

        for (var i = 0; i < widgetTypes.length; i += 1) {
            widgetType = widgetTypes[i];
            request.types.push(widgetType);
            if (_filesToLoad.indexOf(widgetType) === -1) {
                _filesToLoad.push(widgetType);
                filesToLoad.push(widgetType);
            }
        }

        _checkRequests();

        for (var j = 0; j < filesToLoad.length; j += 1) {
            loadHTMLFile(filesToLoad[j]).done(function () {
                _checkRequests();
            }).fail(function () {
                _checkRequests();
            });
        }
        return request.def;
    }

    function _getRequest(queueId) {
        var request;
        for (var i = _requests.length - 1; i >= 0; i -= 1) {
            if (_requests[i].queueId === queueId) {
                request = _requests[i];
            }
        }
        if (!request) {
            request = {
                def: new Deferred(Deferred.TYPE_SINGLE),
                types: [],
                queueId: queueId
            };
            _requests.push(request);
        }
        return request;
    }

    function _checkRequests() {

        for (var i = _requests.length - 1; i >= 0; i -= 1) {
            var request = _requests[i];
            if (request) {
                request.success = true;
                for (var k = 0; k < request.types.length; k += 1) {
                    if (_loadedFiles[request.types[k]] === undefined) {
                        request.success = false;
                        break;
                    }
                }

                if (request.success === true) {
                    _requests.splice(i, 1);
                    request.def.resolve();
                }
            }
        }
    }

    var _loadedFiles = {},
        _filesToLoad = [],
        _requests = [];

    function loadHTMLFile(widgetType) {
        var def = new Deferred(Deferred.TYPE_SINGLE, [widgetType]);

        recursiveLoad(def, _getPathByType(widgetType, 'path'), widgetType);

        return def;
    }

    function recursiveLoad(def, fileName, widgetType) {

        require(['text!' + fileName + '.html'], function success(HTML) {

            if (HTML.indexOf('data-instruction-inherit="true"') !== -1) {

                var superClass = _getSuperClass(HTML); // type in dot-notation
                recursiveLoad(def, _getPathByType(superClass, 'path'), widgetType);

            } else {
                _loadedFiles[widgetType] = HTML.trim();
                def.resolve();
            }
        }, function error(e) {
            _loadedFiles[widgetType] = false;
            def.reject(e.message);
        });
    }

    function _getSuperClass(HTML) {
        var instruction = 'data-instruction-superClass="',
            superClass = HTML.substring(HTML.indexOf(instruction) + instruction.length);

        return superClass.substring(0, superClass.indexOf('"')).replace(/\//g, '.');
    }

    function _uniqueTypeArray(arWidgets) {
        var arFiles = [];

        for (var i = 0; i < arWidgets.length; i += 1) {

            if (arWidgets[i].className) {

                arWidgets[i].className = _getPathByType(arWidgets[i].className, 'type'); // if className has short form, its corrected here
                if (arFiles.indexOf(arWidgets[i].className) === -1) {
                    arFiles.push(arWidgets[i].className);
                }
            }
        }
        return arFiles;
    }

    var _path = {},
        typeReg = new RegExp('[..]', 'g'),
        classReg = new RegExp('[/.]', 'g'),
        _pathTypes = ['class', 'style', 'type', 'path'];

    function _getPathByType(widgetType, pathType) {

        if (Utils.isString(widgetType)) {
            if (widgetType.indexOf('/') !== -1) {
                //console.iatWarn('wrong widgetType:' + widgetType + '; use dot-notation instead!');
                throw new SyntaxError('wrong widgetType:' + widgetType + '; use dot-notation instead!');
                //return _getPathByClass(widgetType, pathType);
            } else {
                if (_path[widgetType] === undefined) {
                    var parsed = _parseType(widgetType);
                    _path[widgetType] = _path[parsed.type] = parsed;
                    _path[_path[widgetType].class] = parsed;
                }
                if (_pathTypes.indexOf(pathType) === -1) {
                    pathType = _pathTypes[0];
                }
                return _path[widgetType][pathType];
            }
        } else {
            return undefined;
        }
    }

    function _parseType(widgetType) {
        widgetType = (widgetType.indexOf('.') !== -1) ? widgetType : 'widgets.brease.' + widgetType;
        var ret = {
            style: widgetType.replace(typeReg, '_'),
            type: widgetType,
            class: widgetType.replace(typeReg, '/')
        };
        ret['path'] = ret.class + ret.class.substring(ret.class.lastIndexOf('/'));
        return ret;
    }

    function _getPathByClass(widgetClass, pathType) {

        if (_path[widgetClass] !== undefined) {
            return _path[widgetClass][pathType];
        } else {
            if (Utils.isString(widgetClass)) {
                var parsed = _parseClass(widgetClass);
                _path[widgetClass] = _path[parsed.class] = parsed;
                _path[_path[widgetClass].type] = parsed;
                return _path[widgetClass][pathType];
            } else {
                return undefined;
            }
        }
    }

    function _parseClass(widgetClass) {
        widgetClass = (widgetClass.indexOf('/') !== -1) ? widgetClass : 'widgets/brease/' + widgetClass;
        var ret = {
            style: widgetClass.replace(classReg, '_'),
            type: widgetClass.replace(classReg, '.'),
            class: widgetClass
        };
        ret['path'] = ret.class + ret.class.substring(ret.class.lastIndexOf('/'));
        return ret;
    }

    return controller;
});
