define([
    'brease/core/Class'
], function (SuperClass) {

    'use strict';

    var ModuleClass = SuperClass.extend(function EditorHandles(widget) {
            SuperClass.call(this);

            this.widget = widget;
            this.oldSettings = {};
            _retainSettings(this);

        }, null),

        p = ModuleClass.prototype;

    p.getHandles = function () {
        var self = this;

        return {
            resizeHandles: [],
            moveHandles: [
                {
                    start: function () {
                        var widgetPos = self.widget.el.position();
                        _retainSettings(self);
               
                        self.deltaPointHandle1 = {
                            x: self.widget.settings.x1 - widgetPos.left,
                            y: self.widget.settings.y1 - widgetPos.top
                        };
                        self.deltaPointHandle2 = {
                            x: self.widget.settings.x2 - widgetPos.left,
                            y: self.widget.settings.y2 - widgetPos.top
                        };

                    },
                    update: function (position) {
                        self.updateMoveHandle1(position.left + self.deltaPointHandle1.x, position.top + self.deltaPointHandle1.y);
                        self.updateMoveHandle2(position.left + self.deltaPointHandle2.x, position.top + self.deltaPointHandle2.y);
                    },
                    finish: function () {
                        self.deltaPointHandle1 = {};
                        self.deltaPointHandle2 = {};
                        return _compareSettings(self);
                    },
                    handle: function () {
                        //var widgetPos = self.widget.el.position();
                        // temp. for v1.0 tests ... --> move handle with four direction array visible
                        //return { x: widgetPos.left, y: widgetPos.top };
                        // TODO finally we return dom element with position / dimension  --> no move handle visible
                        return self.widget.el[0];
                    }
                }
            ],
            pointHandles: [{
                start: function () {
                    self.startMoveHandle1();
                },
                update: function (newPosX, newPosY) {
                    self.updateMoveHandle1(newPosX, newPosY);
                },
                finish: function () {
                    return self.finishMoveHandle1();
                },
                handle: function () {
                    return self.getCoordsHandle1();
                }
            }, {
                start: function () {
                    self.startMoveHandle2();
                },
                update: function (newPosX, newPosY) {
                    self.updateMoveHandle2(newPosX, newPosY);
                },
                finish: function () {
                    return self.finishMoveHandle2();
                },
                handle: function () {
                    return self.getCoordsHandle2();
                }
            }]
        };
    };

    // Handle 1
    p.startMoveHandle1 = function () {
        _retainSettings(this);
    };

    p.updateMoveHandle1 = function (newPosX, newPosY) {
        if (!_positionIsRelative(this.widget)) {
            this.widget.setX1(newPosX);
            this.widget.setY1(newPosY);
        }
    };

    p.finishMoveHandle1 = function () {
        return _compareSettings(this);
    };

    p.getCoordsHandle1 = function () {
        if (_positionIsRelative(this.widget)) {
            return { };
        } else {
            return {
                x: this.widget.settings.x1,
                y: this.widget.settings.y1
            };
        }
    };

    // Handle 2
    p.startMoveHandle2 = function () {
        _retainSettings(this);
        if (_positionIsRelative(this.widget)) {
            this.widget.setX1(0);
            this.widget.setY1(0);
        }
    };

    p.updateMoveHandle2 = function (newPosX, newPosY) {
        var widgetPosition = this.widget.el.position();
        if (_positionIsRelative(this.widget)) {
            this.widget.setX1(0);
            this.widget.setY1(0);

            this.widget.setX2(newPosX - widgetPosition.left);
            this.widget.setY2(newPosY - widgetPosition.top);
        } else {
            this.widget.setX2(newPosX);
            this.widget.setY2(newPosY);
        }
    };

    p.finishMoveHandle2 = function () {
        return _compareSettings(this);
    };

    p.getCoordsHandle2 = function () {
        if (_positionIsRelative(this.widget)) {
            return {
                x: this.widget.el.position().left + parseInt(this.widget.el.find('line')[0].getAttribute('x2'), 10),
                y: this.widget.el.position().top + parseInt(this.widget.el.find('line')[0].getAttribute('y2'), 10)
            };
        } else {
            return {
                x: this.widget.settings.x2,
                y: this.widget.settings.y2
            };
        }
    };

    // Private Functions
    function _retainSettings(widget) {
        widget.oldSettings.x1 = widget.widget.settings.x1;
        widget.oldSettings.y1 = widget.widget.settings.y1;
        widget.oldSettings.x2 = widget.widget.settings.x2;
        widget.oldSettings.y2 = widget.widget.settings.y2;
        widget.oldSettings.top = widget.widget.settings.top;
        widget.oldSettings.left = widget.widget.settings.left;
        widget.oldSettings.width = widget.widget.settings.width;
        widget.oldSettings.height = widget.widget.settings.height;
    }

    function _compareSettings(widget) {
        var returnValue = {};

        if (widget.widget.settings.x1 !== widget.oldSettings.x1) { returnValue.x1 = widget.widget.settings.x1; }
        if (widget.widget.settings.y1 !== widget.oldSettings.y1) { returnValue.y1 = widget.widget.settings.y1; }
        if (widget.widget.settings.x2 !== widget.oldSettings.x2) { returnValue.x2 = widget.widget.settings.x2; }
        if (widget.widget.settings.y2 !== widget.oldSettings.y2) { returnValue.y2 = widget.widget.settings.y2; }
        if (widget.widget.settings.top !== widget.oldSettings.top) { returnValue.top = widget.widget.settings.top; }
        if (widget.widget.settings.left !== widget.oldSettings.left) { returnValue.left = widget.widget.settings.left; }
        if (widget.widget.settings.width !== widget.oldSettings.width) { returnValue.width = widget.widget.settings.width; }
        if (widget.widget.settings.height !== widget.oldSettings.height) { returnValue.height = widget.widget.settings.height; }

        return returnValue;
    }

    function _positionIsRelative(widget) {
        return widget.el.hasClass('iatd-position-relative');
    }

    return ModuleClass;
});
