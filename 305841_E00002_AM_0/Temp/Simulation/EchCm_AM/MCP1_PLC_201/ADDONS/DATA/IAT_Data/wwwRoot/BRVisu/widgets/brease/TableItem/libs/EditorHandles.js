define([
    'brease/core/Class', 
    'brease/enum/Enum'
], function (
    SuperClass, Enum
) {
    
    'use strict';
    
    var ModuleClass = SuperClass.extend(function EditorHandles(widget) {
            SuperClass.call(this);
            this.widget = widget;
        }, null),
    
        p = ModuleClass.prototype;
    
    p.getHandles = function () {
    
        var self = this;
        return {
            moveHandles: [],
            pointHandles: [],
            resizeHandles: [{
    
                start: function () {
                },
    
                update: function (newBox, direction) {
    
                    var updatedBox = {
                        columnWidth: newBox.width,
                        rowHeight: newBox.height,
                        top: newBox.top,
                        left: newBox.left
                    };
    
                    switch (direction) {
    
                        case 'n':
                        case 's':
                            updatedBox.rowHeight = newBox.height;
                            break;
                        case 'w':
                        case 'e':
                            updatedBox.columnWidth = newBox.width;
                            // updatedBox.top = newBox.top + (self.widget.settings.width - updatedBox.size) / 2;
                            // updatedBox.left = newBox.left;
                            break;
    
                        case 'nw':
                        case 'ne':
                        case 'sw':
                        case 'se':
                            break;
    
                        default:
                            console.iatWarn('Direction ' + direction + ' not valid');
                    }
    
                    self.widget.settings.columnWidth = updatedBox.columnWidth;
                    self.widget.settings.rowHeight = updatedBox.rowHeight;

                    _updateWidget(self);
    
                },
                finish: function () {
                    _redrawWidget(self);
                    var returnBox = {
                        columnWidth: self.widget.settings.columnWidth,
                        rowHeight: self.widget.settings.rowHeight
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
    
    function _redrawWidget(self) {
        if (self.widget.settings.dataOrientation === Enum.Direction.vertical) {
            self.widget.el.css('width', self.widget.settings.columnWidth);
            self.widget.itemUpdate(self.widget.settings.columnWidth.toString());
        } else {
            self.widget.el.css('height', self.widget.settings.rowHeight);
            self.widget.itemUpdate(self.widget.settings.rowHeight.toString());

        }
    }

    function _updateWidget(self) {
        if (self.widget.settings.dataOrientation === Enum.Direction.vertical) {
            self.widget.el.css('width', self.widget.settings.columnWidth);
            self.widget.updateEditor(self.widget.settings.columnWidth.toString());
        } else {
            self.widget.el.css('height', self.widget.settings.rowHeight);
            self.widget.updateEditor(self.widget.settings.rowHeight.toString());

        }
    }
    
    return ModuleClass;
});
