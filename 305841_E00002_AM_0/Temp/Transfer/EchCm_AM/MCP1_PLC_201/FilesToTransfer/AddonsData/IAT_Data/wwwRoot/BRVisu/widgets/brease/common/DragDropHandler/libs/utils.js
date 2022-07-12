define([], function () {
    'use strict';
    function Utils() {
        return {
            mapProperties: function (source, target) {
                for (var key in source) {
                    if (target.hasOwnProperty(key)) {
                        target[key] = source[key];
                    }
                }
            },

            mapMethods: function (source, target) {
                for (var key in source) {
                    if (typeof target[key] === 'function') {
                        target[key] = source[key];
                    }
                }
            },
          
            /*
             * Adds class to an Element. Polyfill for classList for SVG Elements in IE
             * @method addClass
             * @param {Object} elem DOM element
             * @param {string} className The class name which should be added
             */
            addClass: function (elem, className) {
                if (elem.classList) {
                    elem.classList.add(className);
                } else {
                    $(elem).addClass(className);
                }
            },
            /*
             * Removes class from an Element. Polyfill for classList for SVG Elements in IE
             * @param {Object} elem DOM element
             * @param {string} className The class name which should be removed
             */
            removeClass: function (elem, className) {
                if (elem.classList) {
                    elem.classList.remove(className);
                } else {
                    $(elem).removeClass(className);
                }
            },
            /*
             * Checks if element contains class. Polyfill for classList for SVG Elements in IE
             * @param {Object} elem DOM element
             * @param {string} className The class name which should be checked
             * @returns {boolean} 'true' if element contains class, otherwise 'false'
             */
            containsClass: function (elem, className) {
                if (elem.classList) {
                    return elem.classList.contains(className);
                } else {
                    return $(elem).hasClass(className);
                }
            }
        };
    }

    return new Utils();
});
