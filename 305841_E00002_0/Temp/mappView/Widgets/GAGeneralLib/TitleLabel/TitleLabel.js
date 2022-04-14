define(['widgets/brease/Label/Label'], function (SuperClass) {

    'use strict';

    /**
    * @class widgets.GAGeneralLib.TitleLabel
    * @extends widgets.brease.Label
    */
    var defaultSettings = {
        "autoScroll": false,
        "breakWord": false,
        "draggable": false,
        "ellipsis": false,
        "enable": true,
        "multiLine": false,
        "style": "default",
        "tabIndex": -1,
        "text": "Label1",
        "tooltip": "",
        "visible": true,
        "wordWrap": false,
        "maxHeight": 0,
        "minHeight": 0,
        "maxWidth": 0,
        "minWidth": 0,
        "height": "30",
        "width": "80"
},

    WidgetClass = SuperClass.extend(function TitleLabel() {
        SuperClass.apply(this, arguments);
    }, defaultSettings),

    p = WidgetClass.prototype;

    return WidgetClass;

});
