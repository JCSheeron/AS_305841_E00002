(function () {
    
    'use strict';

    var grunt = require('grunt'),
        child_process = require('child_process');

    var XSLTTransformation = {

        transform: function transform(localGrunt, destPath, transPath, srcPath, parameter, useMS) {

            if (localGrunt) { grunt = localGrunt; }
            var xsltExe,
                args;

            if (useMS === true) {
                xsltExe = grunt.config('basePath') + '/bin/msxsl.exe';
                args = msxslArgs(destPath, transPath, srcPath, parameter);

            } else {
                xsltExe = grunt.config('basePath') + '/bin/xsltproc.exe';
                args = xsltprocArgs(destPath, transPath, srcPath, parameter);
            }

            var child = child_process.spawnSync(xsltExe, args);

            if (child.status !== 0) {
                errorHandling(child.status, child.stderr, args);
            } 
        }

    };

    function xsltprocArgs(destPath, transPath, srcPath, parameter) {
        var args = [
            '--output',
            destPath
        ];

        if (typeof parameter === 'object' && parameter.length > 0) {
            let params = [];
            for (let i in parameter) {
                var t = [
                    '--stringparam',
                    parameter[i].name,
                    parameter[i].value
                ];
                params = params.concat(t);
            }
            args = args.concat(params);

        }
        args = args.concat([transPath, srcPath]);
        return args;
    }

    function msxslArgs(destPath, transPath, srcPath, parameter) {
        var args = [srcPath, transPath, '-o', destPath];

        if (typeof parameter === 'object' && parameter.length > 0) {
            for (let i in parameter) {
                args = args.concat(parameter[i].name + '=\'' + parameter[i].value + '\'');

            }
        }
        return args;
    }

    function errorHandling(status, stderr, args) {
        if (status > 0 && status < 12) {
            let errmessage;
            switch (status) {
                case 1:
                    errmessage = 'no argument';
                    break;
                case 2:
                    errmessage = 'to many parameters';
                    break;
                case 3:
                    errmessage = 'unknown option';
                    break;
                case 4:
                    errmessage = 'failed to parse the stylesheet';
                    break;
                case 5:
                    errmessage = 'error in the stylesheet';
                    break;
                case 6:
                    errmessage = 'error in one of the documents';
                    break;
                case 7:
                    errmessage = 'unsupported xsl:output method';
                    break;
                case 8:
                    errmessage = 'string parameter contains both quote and double-quotes';
                    break;
                case 9:
                    errmessage = 'internal processing error';
                    break;
                case 10:
                    errmessage = 'processing was stopped by a terminating message';
                    break;
                case 11:
                    errmessage = 'could not write the result to the output file';
                    break;
            }
            grunt.log.writeln(stderr.toString());
            grunt.fail.warn('Error Transforming File (Code ' + status + '): ' + errmessage + ' arguments:' + args);
        } else {

            grunt.log.writeln(stderr.toString());
            grunt.fail.warn('Error Transforming File (Code ' + status + ') UnknownError ');

        }
    }

    module.exports = XSLTTransformation;

})();
