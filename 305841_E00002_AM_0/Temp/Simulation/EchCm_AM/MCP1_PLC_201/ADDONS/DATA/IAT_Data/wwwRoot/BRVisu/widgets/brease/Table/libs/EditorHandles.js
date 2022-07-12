define([
    'brease/core/Class'
], function (
    SuperClass
) {

    'use strict';

    var ModuleClass = SuperClass.extend(function EditorHandles(widget) {
            SuperClass.call(this);
            this.widget = widget;
        }, null),

        p = ModuleClass.prototype;

    p.getHandles = function () {
        var instance = this;
        return {
            pointHandles: [],
            resizeHandles: [{

                start: function () {},

                update: function (newBox) {
                    instance.widget.settings.height = newBox.height;
                    instance.widget.settings.width = newBox.width;
                    instance.widget.settings.top = newBox.top;
                    instance.widget.settings.left = newBox.left;
                    _redrawWidget.call(instance);
                },

                finish: function () {
                    return {
                        top: instance.widget.settings.top,
                        left: instance.widget.settings.left,
                        height: instance.widget.settings.height,
                        width: instance.widget.settings.width
                    };
                },

                handle: function () {
                    return instance.widget.elem;
                }
            }]
        };
    };

    p.getSelectionDecoratables = function () {
        return [this.widget.elem];
    };

    function _hasTableItems(widget) {
        return Array.isArray(widget.settings.tableItemIds) && widget.settings.tableItemIds.length > 0;
    }

    function _redrawWidget() {
        var widget = this.widget;
        widget.el.css({
            'top': parseInt(widget.settings.top, 10),
            'left': parseInt(widget.settings.left, 10),
            'height': widget.settings.height,
            'width': widget.settings.width
        });
        if (_hasTableItems(widget)) {
            widget.renderer.updateEditor();
        }
    }

    return ModuleClass;
});
