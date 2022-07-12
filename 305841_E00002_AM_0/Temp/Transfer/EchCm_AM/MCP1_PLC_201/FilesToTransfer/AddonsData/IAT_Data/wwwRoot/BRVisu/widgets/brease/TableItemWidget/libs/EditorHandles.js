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
            this.oldBox = undefined;
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
    
                update: function (newBox) {
                    
                    if (!self.oldBox) {
                        self.oldBox = newBox;
                    }
    
                    if (self.widget.settings.dataOrientation === Enum.Direction.vertical) {
                        self.widget.settings.columnWidth = newBox.width;
                    } else {
                        self.widget.settings.rowHeight = newBox.height;
                    }
                    _updateWidget(self);
                },
                finish: function () {
                    var returnBox = {
                        columnWidth: self.widget.settings.columnWidth,
                        rowHeight: self.widget.settings.rowHeight
                    };
                    _redrawWidget(self);
                    self.oldBox = undefined;
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
            if (self.oldBox.width !== self.widget.settings.columnWidth) {
                self.widget.itemUpdate(self.widget.settings.rowHeight.toString(), self.widget.settings.columnWidth.toString());
            }
        } else {
            self.widget.el.css('height', self.widget.settings.rowHeight);
            if (self.oldBox.height !== self.widget.settings.rowHeight) {
                self.widget.itemUpdate(self.widget.settings.rowHeight.toString(), self.widget.settings.columnWidth.toString());
            }
        }
    }

    function _updateWidget(self) {
        if (self.widget.settings.dataOrientation === Enum.Direction.vertical) {
            self.widget.el.css('width', self.widget.settings.columnWidth);
        } else {
            self.widget.el.css('height', self.widget.settings.rowHeight);
        }
        self.widget.updateEditor(self.widget.settings.rowHeight.toString(), self.widget.settings.columnWidth.toString());
    }
    
    return ModuleClass;
});
