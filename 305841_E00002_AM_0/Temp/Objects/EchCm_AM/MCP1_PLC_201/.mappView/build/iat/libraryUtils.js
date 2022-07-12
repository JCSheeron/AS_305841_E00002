(function () {
    'use strict';

    var libraryUtils = {

        patchMediaPath: function patchMediaPath(str, libraryName) {
            if (str.indexOf('LocalMedia/') === 0) {
                str = str.replace(/LocalMedia\//, 'LibraryMedia/' + libraryName + '/');
            } 
            return str;
        },
        
        patchMediaPathCollection: function patchMediaPathCollection(str, libraryName) {
            if (str.indexOf('\'LocalMedia/') !== -1) {
                str = str.replace(/'LocalMedia\//g, '\'LibraryMedia/' + libraryName + '/');
            }
            return str;
        },
        
        patchLocalMediaPath: function patchLocalMediaPath(objProps, arProperties, libraryName, moduleDataTypes) {
            arProperties.forEach(function (prop) {
                var propName = prop.name;
                if (objProps[propName] !== undefined) {
                    if (moduleDataTypes.isPath(prop.type)) {
                        objProps[propName] = libraryUtils.patchMediaPath(objProps[propName], libraryName);
                    } else if (moduleDataTypes.isPathCollection(prop.type)) {
                        objProps[propName] = libraryUtils.patchMediaPathCollection(objProps[propName], libraryName);
                    }
                }
            });
            return objProps;
        }
    };

    module.exports = libraryUtils;

})();
