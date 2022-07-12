/*global __dirname*/
module.exports = function (grunt) {

    'use strict';

    var _require = require('a.require'),
        path = require('path');

    var logFile = 'C://log/ASBuild.log';
    if (grunt.file.exists(logFile)) {
        require('logfile-grunt')(grunt, { filePath: logFile, clearLogFile: true });
    }
    
    const sass = require('node-sass');

    _require.init({ root: __dirname });

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        projectFolder: 'BRVisu',
        basePath: __dirname,

        wwwRoot: (function (dirName) {
            var dir;
            if (grunt.option('buildPath')) {
                dir = path.resolve(grunt.option('buildPath'));
            } else {
                dir = path.resolve(dirName, '../data/wwwRoot');
            }
            dir = dir.replace(/\\/g, '/');
            console.log('grunt init - wwwRoot=' + dir);
            return dir;
        }(__dirname)),

        projectPath: '<%= wwwRoot %>/<%= projectFolder %>/',

        sass: {
            options: {
                includePaths: ['dynamically set in task'],
                outputStyle: 'compressed',
                implementation: sass
            },

            derivedWidget: {
                expand: true,
                cwd: '',
                src: '',
                dest: '',
                ext: '.sass.css'
            }
        },

        modules: {
            brease: {
                abspath: '<%= projectPath %>brease/brease.js',
                root: '<%= projectPath %>',
                replace: '',
                filename: 'brease.js'
            },
            config: {
                path: '<%= projectPath %>brease/config',
                root: '<%= projectPath %>',
                replace: '',
                excludeFolder: ['Test']
            },
            controller: {
                path: '<%= projectPath %>brease/controller',
                root: '<%= projectPath %>',
                replace: '',
                excludeFolder: ['Test']
            },
            core: {
                path: '<%= projectPath %>brease/core',
                root: '<%= projectPath %>',
                replace: '',
                excludeFolder: ['Test'],
                excludeFile: ['BaseWidget.html']
            },
            datatype: {
                path: '<%= projectPath %>brease/datatype',
                root: '<%= projectPath %>',
                replace: '',
                excludeFolder: ['Test']
            },
            decorators: {
                path: '<%= projectPath %>brease/decorators',
                root: '<%= projectPath %>',
                replace: '',
                excludeFolder: ['Test']
            },
            enumFiles: {
                path: '<%= projectPath %>brease/enum',
                root: '<%= projectPath %>',
                replace: '',
                excludeFolder: ['Test']
            },
            events: {
                path: '<%= projectPath %>brease/events',
                root: '<%= projectPath %>',
                replace: '',
                excludeFolder: ['Test']
            },
            helper: {
                path: '<%= projectPath %>brease/helper',
                root: '<%= projectPath %>',
                replace: '',
                excludeFolder: ['Test']
            },
            services: {
                path: '<%= projectPath %>brease/services',
                root: '<%= projectPath %>',
                replace: '',
                excludeFolder: ['Test']
            },
            systemWidgets: {
                path: '<%= projectPath %>system/widgets',
                root: '<%= projectPath %>',
                replace: '',
                excludeFolder: ['Test', 'meta', 'css', 'assets', 'external'],
                excludeFile: []
            },
            widgets: {
                path: '<%= projectPath %>widgets/',
                root: '<%= projectPath %>',
                replace: '',
                excludeFolder: ['Test', 'meta', 'css', 'assets', 'docs', 'external'],
                excludeFile: ['WidgetLibrary_gen']
            }
        },

        requirejs: {
            release: {
                options: {
                    name: 'brease/application',
                    mainConfigFile: '<%= projectPath %>require_config.js',
                    out: '<%= projectPath %>release/brease.js',
                    include: '<%= requirejs.modules %>',
                    // eslint-disable-next-line no-unused-vars
                    onBuildWrite: function (moduleName, path, contents) {
                        path = path.substring(path.lastIndexOf('BRVisu'));
                        if (path.includes('EditorHandles.js') || 
                            path.includes('.css') || 
                            path.includes('/external/') || 
                            path.includes('/meta/') ||
                            path.includes('/content/') ||
                            path.includes('/doc/') ||
                            path.includes('/ASHelp/') ||
                            path.includes('/Test/') ||
                            path.includes('/jasmine/') ||
                            path.includes('helper/stubs') ||
                            path.includes('helper/TestUtils') ||
                            (path.includes('BRVisu/libs/') && !path.includes('require.js') && !path.includes('globalize') && !path.includes('polyfill'))) {
                            return '';
                        }
                        return contents;
                    },
                    preserveLicenseComments: false,
                    generateSourceMaps: false,
                    optimize: 'uglify2',
                    uglify2: {
                        beautify: {
                            semicolons: true
                        },
                        compress: {
                            side_effects: false,
                            sequences: true,
                            dead_code: false,
                            unused: false,
                            drop_debugger: true,
                            unsafe: false,
                            hoist_funs: false,
                            hoist_vars: false
                        },
                        warnings: false,
                        mangle: {
                            except: '<%= requirejs.modulesShort %>'
                        },
                        lint: false,
                        logLevel: 4
                    }
                }
            }
        },

        cssmin: {
            options: {
                mergeIntoShorthands: false,
                sourceMap: false,
                report: 'min',
                compatibility: {
                    properties: {
                        zeroUnits: false,
                        colors: false
                    }
                },
                level: { 
                    1: {
                        all: false,
                        removeWhitespace: true
                    },
                    2: {
                        all: false,
                        mergeAdjacentRules: true, //necessary
                        mergeIntoShorthands: false,
                        mergeNonAdjacentRules: false, //see AuP723965
                        mergeSemantically: false, //takes too much time
                        overrideProperties: true, //necessary
                        removeEmpty: true, //necessary
                        reduceNonAdjacentRules: false, 
                        removeDuplicateRules: true,
                        mergeMedia: false, 
                        removeDuplicateFontRules: false,
                        removeDuplicateMediaBlocks: false, 
                        removeUnusedAtRules: false,
                        restructureRules: false
                    } }
            },
            themes: {
                files: [{
                    expand: true,
                    cwd: '<%= projectPath %>release/',
                    src: '*.css',
                    dest: '<%= projectPath %>release/',
                    ext: '.min.css'
                }]
            },
            brease: {
                expand: true,
                cwd: '<%= projectPath %>css/',
                src: ['brease_core.css'],
                dest: '<%= projectPath %>release/',
                ext: '.min.css'
            }
        },

        concat: {
            splittedcss: {
                src: ['<%= basePath %>/temp/css/*.min.css'],
                dest: '<%= projectPath %>release/brease_core.min.css'
            }
        }

    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.loadTasks('tasks'); 

};
