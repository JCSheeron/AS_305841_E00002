define([
    'libs/d3/d3'
], function (d3) {
    
    'use strict';

    /**
     * @class widgets.brease.common.libs.redux.utils.UtilsScale
     * This Module should be used to create and update the d3 Scale (linear)
     *
     * Details see: [D3 API V3.x][1] 
     * [1]: https://github.com/d3/d3-3.x-api-reference/blob/master/Quantitative-Scales.md#linear
     */

    var UtilsScale = {};

    /**
     * @method 
     * This function creates an d3 linear scale
     * @param {NumberArray1D} domain e.g. [0,100] Value (only 2 values are allowed)
     * @param {NumberArray1D} range e.g. [100,200] PixelValues (only 2 values are allowed without px)
     * @return {Object} scale
     */
    UtilsScale.createScaleLinear = function (domain, range) {
        return d3.scale.linear().domain(domain).range(range);

    };

    /**
     * @method 
     * This function updates the Domain of the Scale
     * @param {Object} scale scale-object which should be updated
     * @param {NumberArray1D} newDomain e.g. [25,75] Value (only 2 values are allowed)
     */
    UtilsScale.updateDomain = function (scale, newDomain) {
        scale.domain(newDomain);
    };

    /**
     * @method 
     * This function updates the Range of the Scale
     * @param {Object} scale scale-object which should be updated
     * @param {NumberArray1D} newRange e.g. [75,150] PixelValues (only 2 values are allowed without px)
     */
    UtilsScale.updateRange = function (scale, newRange) {
        scale.range(newRange);
    };

    return UtilsScale;
});
