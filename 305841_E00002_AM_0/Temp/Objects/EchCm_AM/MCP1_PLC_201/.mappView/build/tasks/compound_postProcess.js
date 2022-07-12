module.exports = function (grunt) {

    'use strict';

    // node modules
    var _modulePath = require('path'),
        _moduleRequire = require('a.require'),

        // global iat modules
        Utils = _moduleRequire('iat/utils'),
        delimiter = 'Θ';

    grunt.registerTask('compound_postProcess', '', function () {

        grunt.file.defaultEncoding = 'utf8';

        var compoundWidget = grunt.config('compoundWidget'),
            contentHTML = grunt.file.read(_modulePath.resolve(compoundWidget.dir, 'content/widgets.html')),
            idRegex1 = new RegExp('id="' + compoundWidget.name + '_', 'g'),
            idRegex2 = new RegExp('setOptions\\("' + compoundWidget.name + '_', 'g');

        contentHTML = contentHTML.replace(idRegex1, 'id="{COWI_ID}' + delimiter);
        contentHTML = contentHTML.replace(idRegex2, 'setOptions("{COWI_ID}' + delimiter);

        contentHTML = contentHTML.replace(/<\/script>/, _defaultEntries(compoundWidget) + '</script>');

        _writeFile(_modulePath.resolve(compoundWidget.dir, 'content/widgets.html'), '<div>\n' + contentHTML + '</div>');

        var transformedCSS = grunt.file.read(_modulePath.resolve(compoundWidget.dir, 'content/widgets.css'));
        var idRegex3 = new RegExp('#' + compoundWidget.name + '_', 'g');

        var contentCSS = transformedCSS.replace(idRegex3, '#{ID_PREFIX}');
        _writeFile(_modulePath.resolve(compoundWidget.dir, 'content/widgets_css.xml'), '<?xml version="1.0" encoding="utf-8"?><style>' + contentCSS + '</style>');
        _writeFile(_modulePath.resolve(compoundWidget.dir, 'content/widgets.css'), contentCSS);
    });

    function _writeFile(path, content) {
        grunt.file.write(path, content);
    }

    function _defaultEntries(compoundWidget) {

        var js = '';

        for (var propName in compoundWidget.customProps) {
            var prop = compoundWidget.customProps[propName];

            if (Array.isArray(prop.mappings)) {

                var parsedDefaultValue = Utils.parseValueForJS(prop.defaultValue, prop.type),
                    strMapping = '';

                prop.mappings.forEach(function (mapping) {
                    var widgetId = mapping['$'].widget,
                        widgetProp = mapping['$'].property;

                    strMapping += ((strMapping !== '') ? ',' : '') + `{id:'{COWI_ID}${delimiter}${widgetId}',prop:'${widgetProp}'}`;
                });
                strMapping = '[' + strMapping + ']';

                if (parsedDefaultValue !== 'null' && parsedDefaultValue !== undefined) {
                    js += `brease.setOptionsMapping('{COWI_ID}', '${prop.name}', ${strMapping}, ${parsedDefaultValue});\n`;
                }
            }
        }

        return js;
    }

};
