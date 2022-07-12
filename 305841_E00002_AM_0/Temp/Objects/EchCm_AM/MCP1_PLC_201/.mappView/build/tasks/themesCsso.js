module.exports = function (grunt) {
    'use strict';

    grunt.registerTask('themesCsso', 'adapter for css optimizer for themes', function () {

        grunt.file.setBase('.');

        // disable log entry of cssmin in AS log
        grunt.log.ok = function () {};
        
        grunt.task.run('cssmin:themes');
    });
};
