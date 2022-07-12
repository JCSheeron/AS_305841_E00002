define([
    'brease/core/Class',
    'brease/enum/Enum'
], function (SuperClass, Enum) {

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

        var self = this;
        return {
            moveHandles: undefined, /* use default*/
            pointHandles: [],
            resizeHandles: [{

                start: function () {
                    _retainSettings(self);
                },

                update: function (newBox) {

                    var updatedBox = {
                        width: newBox.width,
                        height: newBox.height,
                        top: newBox.top,
                        left: newBox.left
                    };

                    self.widget.settings.top = updatedBox.top;
                    self.widget.settings.left = updatedBox.left;
                    self.widget.settings.width = updatedBox.width;
                    self.widget.settings.height = updatedBox.height;

                    _redrawWidget(self);
                },

                finish: function () {
                    _redrawWidget(self);
                    return _compareSettings(self);
                },

                handle: function () {
                    return self.widget.elem;
                }
            }]
        };
    };

    // private functions
    function _redrawWidget(self) {

        self.widget.el.css('top', parseInt(self.widget.settings.top, 10))
            .css('left', parseInt(self.widget.settings.left, 10))
            .css('width', parseInt(self.widget.settings.width, 10))
            .css('height', parseInt(self.widget.settings.height, 10));

        if (self.widget.settings.childPositioning === Enum.ChildPositioning.relative && self.widget.container.children('#' + self.widget.elem.id + '_scrollWrapper').hasClass('scrollWrapper')) {
            self.widget._refreshScroller();
        }
    }

    function _retainSettings(self) {

        self.oldSettings.top = parseInt(self.widget.settings.top, 10);
        self.oldSettings.left = parseInt(self.widget.settings.left, 10);
        self.oldSettings.width = parseInt(self.widget.settings.width, 10);
        self.oldSettings.height = parseInt(self.widget.settings.height, 10);
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
        
    return ModuleClass;

});
