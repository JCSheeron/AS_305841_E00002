define([
    'widgets/brease/common/libs/ChildHandling'
], function (ChildHandling) {

    'use strict';

    /**
     * @class widgets.brease.common.libs.ShakeElements
     * The Module should be used if Elements of mappView should shake
     *
     * This module is used to shake elements in a widget. 
     * It provides 2 functions which add and remove the class ‘shake’ and ‘shakeAlternate’; 
     * where every second element receives the class ‘shake’ and every other ‘shakeAlternate’. 
     * The actual implementation of the shaking needs to be done in each respective widget to maintain the flexibility over which shaking animation should be used. 
     * For an example look into the GridLineItem
     *
     */

    var ShakeElements = {};

    /*
     * The helpers functions should not be directly used from the Module.
     * If you need the Utils, require them directly in your widget, module
     * They are just placed inside the helper object to have a better testability
     */
    ShakeElements.helpers = {
        childHandling: ChildHandling
    };

    /**
     * @method 
     * Adds the Class for letting the Element shake
     * @param {StringArray1D} widgetIDs Array of WidgetIDs (including ContentId)
     */
    ShakeElements.startShaking = function startShaking(widgetIDs) {
        if (widgetIDs.length > 0) {
            for (var i = 0; i < widgetIDs.length; i += 1) {
                if ((i % 2) === 0) {
                    $('#' + widgetIDs[i]).addClass('shakeAlternate');
                } else {
                    $('#' + widgetIDs[i]).addClass('shake');
                }
            }
        }
    };

    /**
     * @method
     * Removes the Class for letting the Element shake
     * @param {StringArray1D} widgetIDs Array of WidgetIDs (including ContentId)
     */
    ShakeElements.stopShaking = function stopShaking(widgetIDs) {
        ShakeElements.helpers.childHandling.removeChildClasses(widgetIDs, 'shake shakeAlternate');
    };

    return ShakeElements;

});
