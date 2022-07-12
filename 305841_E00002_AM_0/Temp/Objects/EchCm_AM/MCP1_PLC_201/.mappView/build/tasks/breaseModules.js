module.exports = function (grunt) {
    'use strict';

    grunt.registerTask('breaseModules', 'generates array of all brease src-files', function () {

        var dir, root, excludeFolder, excludeFile, replace,
            modules = [], modulesShort = ['Brease'],
            config = grunt.config('modules');

        function recurse(abspath, rootdir, subdir, filename) {
            //console.log(JSON.stringify({abspath:abspath, rootdir:rootdir, subdir:subdir, filename:filename}));
            var ext = filename.split('.').pop(),
                path = abspath, cName, i = 0;

            var skip = false;
            if (subdir) {
                for (i = 0; i < excludeFolder.length; i += 1) {
                    if (subdir.indexOf(excludeFolder[i]) >= 0) {
                        skip = true;
                    }
                }
            }
            if (skip === true || abspath.indexOf('mocked') !== -1) {
                //grunt.log.writeln('skipped: ' + abspath.red);
                return;
            }
            skip = false;
            if (ext === 'js') {

                path = abspath.replace(root, replace);
                path = path.replace('.js', '');
                cName = path.substring(path.lastIndexOf('/') + 1);
                modules.push(path);
                if (modulesShort.indexOf(cName) === -1) {
                    modulesShort.push(cName);
                }
            } else if (ext === 'html') {
                for (i = 0; i < excludeFile.length; i += 1) {
                    if (path.indexOf(excludeFile[i]) !== -1) {
                        skip = true;
                    }
                }
                if (skip !== true) {
                    path = 'text!' + abspath.replace(root, replace);
                    modules.push(path);
                }
            }
            //grunt.log.writeln('added: ' + path.cyan);
        }

        for (var type in config) {

            if (config[type].path !== undefined) {
                dir = config[type].path;
                root = config[type].root;
                replace = config[type].replace;
                excludeFolder = config[type].excludeFolder;
                excludeFile = config[type].excludeFile;

                grunt.file.recurse(dir, recurse);
            } else {
                root = config[type].root;
                replace = config[type].replace;
                recurse(config[type].abspath, config[type].root, undefined, config[type].filename);
            }
        }
        modules.push('require_config');
        modules.push('requireLib');

        grunt.config.set('requirejs.modules', modules);
        //grunt.log.writeln('MODULES:' + modules.join(','));
        //grunt.log.writeln('SHORT Names:' + modulesShort.join(','));
        grunt.config.set('requirejs.modulesShort', modulesShort);
    });

};
