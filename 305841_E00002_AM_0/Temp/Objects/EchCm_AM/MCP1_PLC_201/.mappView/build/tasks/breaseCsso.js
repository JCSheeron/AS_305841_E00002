module.exports = function (grunt) {
    'use strict';

    grunt.registerTask('breaseCsso', 'adapter for css optimizer for brease', function () {

        grunt.file.setBase('.');

        // disable log entry of cssmin in AS log
        grunt.log.ok = function () {};
        
        grunt.task.run('cssmin:brease');
    });

};
