(function () {
    
    'use strict';

    var child_process = require('child_process');

    var XMLLint = {

        check: function check(grunt, schemaPath, xmlPath, config, basePath) {
            basePath = basePath || grunt.config('basePath');
            var xmlint = basePath + '/bin/xmllint.exe',
                args = [
                    '--noout',
                    '--schema',
                    schemaPath,
                    xmlPath
                ];

            var child = child_process.spawnSync(xmlint, args),
                debug = config === true || (config !== undefined && config.debug === true),
                fail = config === undefined || (config !== undefined && config.fail === true),
                out = config === undefined || (config !== undefined && config.out === true),
                errmessage;

            if (child.status === 0) {
                if (debug) {
                    grunt.log.writeln(child.stderr.toString().trim()); 
                }
            } else if (child.status > 0 && child.status < 12) {
                switch (child.status) {
                    case 1:
                        errmessage = 'Unclassified';
                        break;
                    case 2:
                        errmessage = 'Error in DTD';
                        break;
                    case 3:
                        errmessage = 'Validation error';
                        break;
                    case 4:
                        errmessage = 'Validation error';
                        break;
                    case 5:
                        errmessage = 'Error in Schema compilation';
                        break;
                    case 6:
                        errmessage = 'Error writing output';
                        break;
                    case 7:
                        errmessage = 'Error in pattern';
                        break;
                    case 8:
                        errmessage = 'Error in Reader Registration';
                        break;
                    case 9:
                        errmessage = 'Out of memory error';
                        break;
                }
                if (out) {
                    grunt.log.writeln(child.stderr.toString().red); 
                }
                if (fail) {
                    grunt.fail.warn('Error checking Schema (Code ' + child.status + '): "' + errmessage + '"'); 
                }
            } else {
                if (out) {
                    grunt.log.writeln(child); 
                }
                if (fail) {
                    grunt.fail.warn('Error checking Schema: (Code ' + child.status + ') UnknownError '); 
                }

            }
            return child.status;
        }

    };

    module.exports = XMLLint;

})();
