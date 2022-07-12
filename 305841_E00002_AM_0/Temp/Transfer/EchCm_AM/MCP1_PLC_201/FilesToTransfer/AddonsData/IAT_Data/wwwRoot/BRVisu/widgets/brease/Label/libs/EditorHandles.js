define(['brease/core/Class'
], function (SuperClass) {

    'use strict';

    var EditorClass = SuperClass.extend(function EditorHandles(widget) {
            SuperClass.call(this);

            this.widget = widget;
            this.oldSettings = {
                top: this.widget.settings.top,
                left: this.widget.settings.left,
                width: this.widget.settings.width,
                height: this.widget.settings.height
            };

        }, null),

        p = EditorClass.prototype;

    p.isRotatable = function () { return false; };

    p.getHandles = function () {
        var self = this;

        return {
            moveHandles: undefined,
            pointHandles: undefined,
            resizeHandles: [{

                start: function () {
                    _retainSettings(self);
                },

                update: function (newBox) {
                    self.widget.settings.top = newBox.top;
                    self.widget.settings.left = newBox.left;
                    self.widget.settings.width = newBox.width;
                    self.widget.settings.height = newBox.height;
                    _updateView(self);
                },

                finish: function () {
                    _updateView(self);
                    return _compareSettings(self);
                },

                handle: function () {
                    return self.widget.elem;
                }
            }]
        };
    };

    p.getSelectionDecoratables = function () {
        return [this.widget.elem];
    };

    /* Privates */
    function _retainSettings(self) {
        self.oldSettings.top = parseInt(self.widget.settings.top, 10);
        self.oldSettings.left = parseInt(self.widget.settings.left, 10);
        self.oldSettings.width = parseInt(self.widget.settings.width, 10);
        self.oldSettings.height = parseInt(self.widget.settings.height, 10);
    }

    function _updateView(self) {
        var top = parseInt(self.widget.settings.top, 10) + 'px',
            left = parseInt(self.widget.settings.left, 10) + 'px',
            width = parseInt(self.widget.settings.width, 10) + 'px',
            height = parseInt(self.widget.settings.height, 10) + 'px';

        self.widget.elem.style.top = top;
        self.widget.elem.style.left = left;
        self.widget.elem.style.width = width;
        self.widget.elem.style.height = height;
    }

    function _compareSettings(self) {

        var returnValue = {};

        if (self.widget.settings.top !== self.oldSettings.top) {
            returnValue.top = self.widget.settings.top;
        }
        if (self.widget.settings.left !== self.oldSettings.left) {
            returnValue.left = self.widget.settings.left;
        }
        if ((self.widget.settings.width !== self.oldSettings.width) || (self.widget.settings.height !== self.oldSettings.height)) {
            returnValue.height = self.widget.settings.height;
            returnValue.width = self.widget.settings.width;
        }

        return returnValue;
    }

    return EditorClass;
});
