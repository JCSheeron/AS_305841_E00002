module.exports = function (grunt) {

    'use strict';
    var fs = require('fs');
    /**
    * @method derived_library
    * @iatStudioExposed
    * @param {String} libName name of widget library (e.g. "WidgetLib1")
    * @param {String} target directory to write to (directory where derived widget libraries are located) (e.g. "C:/projects/AS-4.3/Trunk/WidgetTests/Logical/mappView/Widgets")
    * @param {String} core directory of brease core (e.g. "C:/TFS/TechnologyPackages/IAT/Trunk/IAT/IATC/data/wwwRoot/BRVisu") 
    */
    grunt.registerTask('derived_library', '', function (libName, target, core) {

        // node modules
        var _moduleRequire = require('a.require'),
            _modulePath = require('path');

        // iat modules
        var xsltTrans = _moduleRequire('iat/XSLTTransformation'),
            widgetLibraryPrepare = _moduleRequire('iat/widgetLibraryPrepare'),
            utils = _moduleRequire('iat/utils');

        var libDirectory = _modulePath.join(target, libName);
        //grunt.log.writeln('target:' + target);
        //grunt.log.writeln('libName:' + libName);
        //grunt.log.writeln('libDirectory:' + libDirectory);
        //grunt.log.writeln('core:' + core);

        var lib = grunt.file.expand({
            filter: function (item) {
                return grunt.file.isDir(item);
            },
            cwd: libDirectory
        }, '*');

        // schemasets
        var schemaPath = libDirectory + '/WidgetLibrary.xmlschemaset',
            schemaset = widgetLibraryPrepare.createSchemaset(lib.map(function (item) {
                return item + '/meta/' + item + '.xsd';
            }), {
                prettify: true,
                type: 'content'
            });
        _writeFile(schemaPath, schemaset);

        schemaPath = libDirectory + '/WidgetStyles.xmlschemaset';
        schemaset = widgetLibraryPrepare.createSchemaset(lib.map(function (item) {
            if (grunt.file.exists(libDirectory + '/' + item + '/meta/' + item + '_Styles.xsd')) { 
                return item + '/meta/' + item + '_Styles.xsd'; 
            }
        }), {
            prettify: true,
            type: 'styles'
        });
        _writeFile(schemaPath, schemaset);

        schemaPath = libDirectory + '/WidgetEventsActions.xmlschemaset';
        schemaset = widgetLibraryPrepare.createSchemaset(lib.map(function (item) {
            return item + '/meta/' + item + '_EventsActions.xsd';
        }), {
            prettify: true,
            type: 'eventbinding'
        });
        _writeFile(schemaPath, schemaset);

        // mapping
        var destination = _modulePath.resolve(libDirectory + '/WidgetLibrary.mapping'),
            xslt = _modulePath.resolve(grunt.config('basePath') + '\\transformation\\widgetTypesTransformation.xslt'),
            source = _modulePath.resolve(libDirectory + '/WidgetLibrary.xmlschemaset'),
            libPath = (libDirectory + '\\').replace(/\\/g, '/'), // directory of derived widget library
            basePath = _modulePath.resolve(grunt.config('basePath'), '../../Schemas/common/widgetTypes').replace(/\\/g, '/').replace(/ /g, '%20'); // directory where to find WidgetLibraryBase.mapping

        //grunt.log.writeln(('destination:' + destination).yellow);
        //grunt.log.writeln(('xslt:' + xslt).yellow);
        //grunt.log.writeln(('source:' + source).yellow);
        //grunt.log.writeln(('basePath:' + basePath).green);
        //grunt.log.writeln(('libPath:' + libPath).green);

        xsltTrans.transform(grunt, destination, xslt, source, [
            { name: 'basePath', value: utils.encodePath(basePath) },
            { name: 'libPath', value: utils.encodePath(libPath) }
        ]);

    });

    function _writeFile(path, content) {
        
        var fd = fs.openSync(path, 'w');
        fs.writeSync(fd, content);
        fs.closeSync(fd);
    }

};
