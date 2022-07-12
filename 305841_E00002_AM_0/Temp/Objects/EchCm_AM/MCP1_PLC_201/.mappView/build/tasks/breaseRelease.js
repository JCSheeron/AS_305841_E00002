module.exports = function (grunt) {
    'use strict';

    grunt.registerTask('breaseRelease', 'for generating release version of brease', function () {

        grunt.file.setBase('.');
        grunt.task.run('breaseModules', 'requirejs:release');
    });

};
