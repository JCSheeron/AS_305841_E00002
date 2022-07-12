(function () {
    'use strict';

    var patchKeyboard = {

        run: function (ancestorWidget, keyboardWidget, grunt, debug) {
            this.grunt = grunt;
            this.debug = debug;
            var widgetInfo = ancestorWidget;
            widgetInfo.meta.superClass = ancestorWidget.name;
            widgetInfo.name = keyboardWidget.type;
            widgetInfo.meta.filePath = keyboardWidget.filePath + '.js';
            widgetInfo.meta.visible = 'false';
            widgetInfo.meta.license = 'licensed';
            widgetInfo.meta.keyboard = keyboardWidget.keyboardType;
            widgetInfo.meta.inheritance.unshift(keyboardWidget.type);
            widgetInfo.categories = { 'Category': ['Keyboards'] };

            widgetInfo.dependencies.widgets.unshift(keyboardWidget.filePath + '.js');

            var description = keyboardWidget.commonProps.description;
            if (description) {
                widgetInfo.descriptions = {
                    short: description,
                    de: description,
                    en: description
                };
            }

            // set values of common properties (e.g. width/height) as default values of compound widget
            _overwriteDefaults(widgetInfo.properties, widgetInfo.name, keyboardWidget.commonProps);

            patchKeyboard.writeDebugFile('C:/Temp/mvLog/' + widgetInfo.name + '.json', JSON.stringify(widgetInfo));

            return widgetInfo;
        },
        writeDebugFile: function (path, content) {
            if (patchKeyboard.debug) {
                this.grunt.log.writeln(('write ' + path).cyan);
                this.grunt.file.write(path, content);
            }
        }
    };

    function _overwriteDefaults(widgetProperties, widgetName, commonProps) {
        for (var i = 0; i < widgetProperties.length; i += 1) {
            var prop = widgetProperties[i];
            if (commonProps[prop.name] !== undefined) {
                prop['defaultValue'] = commonProps[prop.name];
                prop.owner = widgetName;
            }
        }
    }

    module.exports = patchKeyboard;

})();
