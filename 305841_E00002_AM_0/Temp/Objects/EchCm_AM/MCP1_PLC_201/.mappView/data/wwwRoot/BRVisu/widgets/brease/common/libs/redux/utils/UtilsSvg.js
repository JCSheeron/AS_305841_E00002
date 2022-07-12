define(function () {

    'use strict';

    /**
     * @class widgets.brease.common.libs.redux.utils.UtilsSvg
     */

    var UtilsSvg = {};

    /**
     * @method 
    * This function sets the viewBox attribute of a svg
    * @param {SVG} svg 
    * @param {String} viewBox 
    */
    UtilsSvg.setViewBox = function (svg, viewBox) {
        // use native setAttribute (instead of jquery) to preserve camel case of attribute 'viewBox'
        if (svg && typeof svg.setAttribute === 'function') {
            svg.setAttribute('viewBox', '' + viewBox); 
        }
    };

    return UtilsSvg;

});
