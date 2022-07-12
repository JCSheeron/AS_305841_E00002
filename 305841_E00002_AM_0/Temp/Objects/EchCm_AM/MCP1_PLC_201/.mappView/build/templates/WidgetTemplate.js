define(['SUPER_CLASS_PATH'], function (SuperClass) {

    'use strict';

    /**
    * @class widgets.WIDGET_LIBRARY.WIDGET_NAME
    * @extends SUPER_CLASS
    */
    var defaultSettings = DEFAULT_SETTINGS,

    WidgetClass = SuperClass.extend(function WIDGET_NAME() {
        SuperClass.apply(this, arguments);
    }, defaultSettings),

    p = WidgetClass.prototype;

    return WidgetClass;

});
