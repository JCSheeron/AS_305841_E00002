define(['widgets/brease/TextOutput/TextOutput'], function (SuperClass) {

    'use strict';

    /**
    * @class widgets.GAGeneralLib.TitleLabelBindable
    * @extends widgets.brease.TextOutput
    */
    var defaultSettings = {
        "autoScroll": false,
        "breakWord": false,
        "draggable": false,
        "ellipsis": false,
        "enable": true,
        "multiLine": true,
        "style": "default",
        "tabIndex": -1,
        "tooltip": "",
        "value": "default",
        "visible": true,
        "wordWrap": true,
        "maxHeight": 0,
        "minHeight": 0,
        "maxWidth": 0,
        "minWidth": 0,
        "height": "30",
        "width": "70"
},

    WidgetClass = SuperClass.extend(function TitleLabelBindable() {
        SuperClass.apply(this, arguments);
    }, defaultSettings),

    p = WidgetClass.prototype;

    return WidgetClass;

});
