define(function () {
    'use strict';

    /**
     * @class widgets.brease.common.libs.ScrollPrevent_iOS
     * This Module should be used to prevent the bounce Scroll on iOS Devices while scrolling, dragging,....
     */

    var ScrollPrevent_iOS = {};

    /**
     * @method 
     * This function should be callled while DragStart Event
     * It sets the Body-Position to 'fixed' if it's a mobile device
     */
    ScrollPrevent_iOS.dragStart = function () {
        if (brease.config.detection.mobile === true) {
            brease.bodyEl.css({ 'position': 'fixed' });
        }
    };

    /**
     * @method 
     * This function should be callled while DragEnd Event
     * It resets the Body-Position to 'static'
     */
    ScrollPrevent_iOS.dragEnd = function () {
        if (brease.config.detection.mobile === true) {
            brease.bodyEl.css({ 'position': 'static' });
        }
    };

    return ScrollPrevent_iOS;
});
