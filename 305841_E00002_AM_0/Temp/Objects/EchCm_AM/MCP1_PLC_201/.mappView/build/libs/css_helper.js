(function () {
    'use strict';
        
    var regex = /#[a-zA-Z0-9Θ_\-: ]{1,}[ ]{0,1}\{[a-zA-Z0-9Θ#\-\s;,.:%()]*\}/g, // full widget id statements: #id {statements}
        csshelper = {
        
            split: function (cssFile, partSize, maxSize) {

                var ar = [],
                    remainder = cssFile;

                while (remainder.length > maxSize) {
                    var part = remainder.substring(0, partSize), // coarse split at the given part length
                        found = part.match(regex);

                    if (found === null) { 
                        break; 
                    }
                    
                    var lastOccurrence = found[found.length - 1];
                    // exact split at the last occurence of a full widget statement
                    part = part.substring(0, part.indexOf(lastOccurrence) + lastOccurrence.length);

                    ar.push(part);
                    remainder = remainder.substring(part.length);
                }

                ar.push(remainder);
                return ar;
            },

            // write parts to temp folder in build directory (directories outside build folder cannot be deleted)
            writeParts: function (parts, tempDir, grunt, modulePath) {
                grunt.file.delete(tempDir);

                parts.forEach(function (part, index) {
                    grunt.file.write(modulePath.resolve(tempDir, 'part' + index + '.css'), part);
                });
            }
        };

    module.exports = csshelper;

})();
