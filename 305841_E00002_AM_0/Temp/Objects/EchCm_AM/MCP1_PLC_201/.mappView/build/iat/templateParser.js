(function () {
    'use strict';

    var parser = {

        run: function (xml, widgetDirectory, grunt) {

            var templates = '',
                templateFile,
                regex = /<BindingTemplate id=[\s\S]*>[\s\S]*?<\/BindingTemplate>/;

            templates += '<BindingTemplates>\n  ';
            grunt.file.recurse(widgetDirectory, function recurseWidgetDir(abspath, rootdir, subdir, filename) {
                if (filename.indexOf('.btpl') !== -1) {
                    templateFile = grunt.file.read(abspath);
                    templateFile = regex.exec(templateFile)[0];
                    templates += templateFile;
                }
            });
            templates += '\n</BindingTemplates>';
            if (templates !== '') {
                xml = xml.substring(0, xml.lastIndexOf('</Widget>\n')) + templates + '\n' + xml.substring(xml.lastIndexOf('</Widget>'));
            }
            return xml;
        }

    };

    module.exports = parser;

})();
