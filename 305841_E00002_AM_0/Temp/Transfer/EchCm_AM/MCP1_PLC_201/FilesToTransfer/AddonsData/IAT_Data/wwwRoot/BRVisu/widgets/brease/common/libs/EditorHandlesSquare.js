define([
    'brease/core/Class', 
    'brease/core/Utils'
], function (SuperClass, Utils) {

    'use strict';
    
    /**
     * @class widgets.brease.common.libs.EditorHandlesSquare
     * #Description
     * Provides the Handles for Widgets which can only be Square
     * @extends brease.core.Class
     *
     * @iatMeta studio:visible
     * false
     */
    var ModuleClass = SuperClass.extend(function EditorHandlesSquare(widget) {
            SuperClass.call(this);
            this.widget = widget;
        }, null),

        p = ModuleClass.prototype;

    p.getHandles = function () {

        var self = this;
        return {
            pointHandles: [],
            resizeHandles: [{

                start: function () {
                },

                update: function (newBox, direction) {

                    var updatedBox = {
                        size: newBox.width,
                        top: newBox.top,
                        left: newBox.left
                    };

                    switch (direction) {

                        case 'n':
                        case 's':
                            updatedBox.size = newBox.height;
                            updatedBox.top = newBox.top;
                            updatedBox.left = newBox.left + (self.widget.settings.height - updatedBox.size) / 2;
                            break;

                        case 'w':
                        case 'e':
                            updatedBox.size = newBox.width;
                            updatedBox.top = newBox.top + (self.widget.settings.width - updatedBox.size) / 2;
                            updatedBox.left = newBox.left;
                            break;

                        case 'nw':
                            updatedBox.size = Math.max(newBox.width, newBox.height);
                            updatedBox.top = newBox.top + newBox.height - updatedBox.size;
                            updatedBox.left = newBox.left + newBox.width - updatedBox.size;
                            break;

                        case 'ne':
                            updatedBox.size = Math.max(newBox.width, newBox.height);
                            updatedBox.top = newBox.top + newBox.height - updatedBox.size;
                            updatedBox.left = newBox.left;
                            break;

                        case 'sw':
                            updatedBox.size = Math.max(newBox.width, newBox.height);
                            updatedBox.top = newBox.top;
                            updatedBox.left = newBox.left + newBox.width - updatedBox.size;
                            break;

                        case 'se':
                            updatedBox.size = Math.max(newBox.width, newBox.height);
                            updatedBox.top = newBox.top;
                            updatedBox.left = newBox.left;
                            break;

                        default:
                            console.iatWarn('Direction ' + direction + ' not valid');
                    }

                    self.widget.settings.height = updatedBox.size;
                    self.widget.settings.width = updatedBox.size;
                    self.widget.settings.top = updatedBox.top;
                    self.widget.settings.left = updatedBox.left;
                    if (Utils.isFunction(self.onResizeHandler)) {
                        self.onResizeHandler(self.widget);
                    }

                    _redrawWidget(self);
                },
                finish: function () {
                    var returnBox = {
                        top: self.widget.settings.top,
                        left: self.widget.settings.left,
                        height: self.widget.settings.height,
                        width: self.widget.settings.width
                    };
                    return returnBox;
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

    p.onResize = function (handler) {
        this.onResizeHandler = handler;
    };

    function _redrawWidget(self) {
        self.widget.el.css('top', parseInt(self.widget.settings.top, 10));
        self.widget.el.css('left', parseInt(self.widget.settings.left, 10));
        self.widget.el.css('height', self.widget.settings.height);
        self.widget.el.css('width', self.widget.settings.width);
        
        if (Utils.isFunction(self.widget._redrawInEditor)) {
            self.widget._redrawInEditor(self.widget.settings.height, self.widget.settings.width);      
        }
    }

    return ModuleClass;
});
