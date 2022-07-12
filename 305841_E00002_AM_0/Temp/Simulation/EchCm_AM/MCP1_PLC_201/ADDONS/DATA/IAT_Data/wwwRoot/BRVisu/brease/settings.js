define(['brease/core/Utils'], function (Utils) {

    'use strict';
    /**
    * @class brease.settings
    * @extends core.javascript.Object
    * @override brease.brease
    */
    var settings = {},
        devicePixelRatio = (window.devicePixelRatio > 1) ? window.devicePixelRatio : 1;
    /**
    * @property {Object} settings
    * @readonly
    * @property {String} settings.globalContent='0global'
    * used as contentId for all widgets which are not referenced to a content
    * @property {String} settings.noKeyValue=""
    * This value is used internally to check if a textkey is set and can be used to reset a textkey in options.
    * @property {String} settings.noValueString='XX'
    * used in numeric widgets to indicate 'no value'
    * @property {String} settings.cachingSlotsMax=500
    * @property {String} settings.cachingSlotsDefault=25
    */
    Utils.defineProperty(settings, 'globalContent', '0global');
    Utils.defineProperty(settings, 'noKeyValue', '');
    Utils.defineProperty(settings, 'noValueString', 'XX');
    Utils.defineProperty(settings, 'swipe', {});
    Utils.defineProperty(settings, 'cachingSlotsMax', 500);
    Utils.defineProperty(settings, 'cachingSlotsDefault', 25);

    // A&P 713645 for mobile devices we have to use other parameters for swipe
    var mobile = window.platform && ['Android', 'iOS', 'Windows Phone'].indexOf(window.platform.os.family) !== -1 && 
                    Math.min(window.innerWidth, window.innerHeight) < 768;

    if (!mobile) {
        settings.swipe.maxFingerDistance = 120 * devicePixelRatio;
        settings.swipe.moveThreshold = 150 * devicePixelRatio;
        settings.swipe.velocity = 1.3;
    } else {
        settings.swipe.maxFingerDistance = 120;
        settings.swipe.moveThreshold = 150;
        settings.swipe.velocity = 1.0;
    }

    return settings;
});
