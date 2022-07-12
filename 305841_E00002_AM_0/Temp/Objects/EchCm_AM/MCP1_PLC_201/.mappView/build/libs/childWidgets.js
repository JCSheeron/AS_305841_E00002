(function () {
    'use strict';

    var childWidgets = {

        validation: { 
            run: function (childInfos) {
                this.forbidden = [];
                this.errorMessage = '';
                for (var widgetType in childInfos) {
                    var metaInfo = childInfos[widgetType].meta;
                    if (Array.isArray(metaInfo.parents) && metaInfo.parents.indexOf('system.brease.Content') !== -1) {
                        this.forbidden.push(widgetType);
                        this.errorMessage += ((this.errorMessage) ? '\n' : '') + 'Use of widget of type ' + widgetType + ' only allowed in a content, not in a compound widget!';
                    }
                }
                return this.forbidden.length === 0;
            }
        },

        findUsedWidgetTypes: function findUsedWidgetTypes(widgets) {
            return _findUsedWidgetTypes(widgets);
        },

        findWidgetFolder: function findWidgetFolder(grunt, modulePath, widgetType, coreWidgets, customWidgets, derivedWidgets) {
            return _findWidgetFolder(grunt, modulePath, widgetType, coreWidgets, customWidgets, derivedWidgets);
        },

        find: function find(grunt, modulePath, arWidgetTypes, coreWidgets, customWidgets, derivedWidgets) {
    
            var childWidgets = {};
            if (Array.isArray(arWidgetTypes)) {
                for (var i = 0; i < arWidgetTypes.length; i += 1) {
                    var widgetType = arWidgetTypes[i],
                        typeSplit = widgetType.split('.'),
                        path = _findWidgetFolder(grunt, modulePath, widgetType, coreWidgets, customWidgets, derivedWidgets),
                        library = typeSplit[1],
                        name = typeSplit[2],
                        dir = modulePath.resolve(path, library, name);
                    childWidgets[widgetType] = {
                        type: widgetType,
                        path: path,
                        name: name,
                        library: library,
                        dir: dir,
                        metaDir: modulePath.resolve(dir, 'meta')
                    };
                }
            }
            return childWidgets;
        },

        fullInfo: function fullInfo(grunt, modulePath, childWidgetsList) {
            var childInfos = {};
            for (var type in childWidgetsList) {
                const jsonPath = modulePath.resolve(childWidgetsList[type].metaDir, childWidgetsList[type].name + '.json');
                if (!grunt.file.exists(jsonPath)) {
                    grunt.fail.warn("Widget-Type '" + type + ' does not exist (path:' + jsonPath + ')!');
                }
                childInfos[type] = grunt.file.readJSON(jsonPath);
            }
            return childInfos;
        }
    };

    function _findUsedWidgetTypes(widgets) {
        var dep = [];
        if (Array.isArray(widgets)) {
            for (var i = 0; i < widgets.length; i += 1) {
                var widget = widgets[i]['$']['xsi:type'];
                if (dep.indexOf(widget) === -1) {
                    dep.push(widget);
                }
                if (widgets[i]['Widgets']) {
                    dep = dep.concat(_findUsedWidgetTypes(widgets[i]['Widgets'][0].Widget));
                }
            }
        }
        return dep;
    }

    function _findWidgetFolder(grunt, modulePath, widgetType, coreWidgets, customWidgets, derivedWidgets) {

        if (widgetType.indexOf('widgets.brease') === 0 || widgetType.indexOf('widgets.prototype') === 0) {
            return coreWidgets;
        } else {
            var widgetPath = widgetType.replace(/\./g, '/'),
                widgetName = widgetType.substring(widgetType.lastIndexOf('.') + 1),
                file = modulePath.resolve(customWidgets, widgetPath.substring(widgetPath.indexOf('/') + 1), widgetName + '.js'),
                folder = '';

            if (grunt.file.exists(file)) {
                folder = customWidgets;
            } else {
                folder = derivedWidgets;
            }
            return folder; 
        }
    }

    module.exports = childWidgets;

})();
