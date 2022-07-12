define([
    'brease/core/Class'
], function (
    SuperClass
) {

    'use strict';

    var ModuleClass = SuperClass.extend(function EditorHandles(widget) {
            SuperClass.call(this);

            this.widget = widget;
            this.oldSettings = {
                top: this.widget.settings.top,
                left: this.widget.settings.left,
                width: this.widget.settings.width,
                height: this.widget.settings.height
            };

        }, null),

        p = ModuleClass.prototype;

    p.getHandles = function () {

        return {
            moveHandles: [],
            pointHandles: [],
            resizeHandles: []
        };
    };

    return ModuleClass;

});
