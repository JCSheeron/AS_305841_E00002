define(['widgets/brease/common/DragDropHandler/libs/dragDropBase'], function (DragDropBase) {
    'use strict';
    function _callMouseEnterEvent(elem, e) {
        // setTimeout neccessary for multiple instances of DragDropHandler, 
        //  because mouseEnter should be fired after all touchEnd have been executed
        setTimeout(function () {
            var event = new Event('mouseenter', e);
            elem.dispatchEvent(event);
        }, 0);
    }

    function _callMouseLeaveEvent(elem, e) {
        // setTimeout neccessary for multiple instances of DragDropHandler, 
        //  because mouseEnter should be fired after all touchEnd have been executed
        setTimeout(function () {
            var event = new Event('mouseleave', e);
            elem.dispatchEvent(event);
        }, 0);
    }

    function DragDropTouch() {
        DragDropBase.call(this);
    }

    DragDropTouch.prototype = Object.create(DragDropBase.prototype);
    var p = DragDropTouch.prototype;

    p._wrapEventHandler = function () {
        DragDropBase.prototype._wrapEventHandler.call(this);

        var self = this;
        var touchElement = null;
        // document events
        this.documentTouchStartHandler = function (e) {
            self._documentMouseDownHandler(self, e);
        };
        this.documentTouchEndHandler = function (e) {
            self._documentMouseUpHandler(self, e);
            // mouseleave
            if (touchElement) {
                _callMouseLeaveEvent(touchElement);
                touchElement = null;
            }
        };
        this.documentTouchMoveHandler = function (e) {
            var touch = event.touches[0];
            var newElement = document.elementFromPoint(touch.clientX, touch.clientY);

            // mouseleave, mouseenter
            if (touchElement === null && newElement !== null) {
                _callMouseEnterEvent(newElement);
                touchElement = newElement;
            } else if (touchElement !== newElement && newElement !== null) {
                _callMouseLeaveEvent(touchElement);
                _callMouseEnterEvent(newElement);
                touchElement = newElement;
            }

            // droppable mousemove
            if (newElement) {
                var droppable = self.getClosestDroppable(newElement);
                if (self.dragActive && droppable) {
                    self._droppableMouseMoveHandler(self, e);
                }
            }
            self._documentMouseMoveHandler(self, e);
        };

        this.draggableTouchMoveHandler = function (e) {
            e.preventDefault();
            self._draggableMouseMoveHandler(self, e);
        };
        this.draggableTouchStartHandler = function (e) {
            e.preventDefault();
            self._draggableMouseDownHandler(self, e);
        };

        this.droppableTouchMoveHandler = function (e) {
            e.preventDefault();
            //self._droppableMouseMoveHandler(self, e);
        };
    };

    p._documentAddEventListener = function () {
        DragDropBase.prototype._documentAddEventListener.call(this);

        document.addEventListener('touchstart', this.documentTouchStartHandler);
        document.addEventListener('touchend', this.documentTouchEndHandler);
        document.addEventListener('touchmove', this.documentTouchMoveHandler);
    };

    p._draggableAddEventListener = function (draggable) {
        DragDropBase.prototype._draggableAddEventListener.call(this, draggable);

        draggable.elem.addEventListener('touchmove', this.draggableTouchMoveHandler);
        draggable.elem.addEventListener('touchstart', this.draggableTouchStartHandler);
    };

    p._droppableAddEventListener = function (droppable) {
        DragDropBase.prototype._droppableAddEventListener.call(this, droppable);

        droppable.elem.addEventListener('touchmove', this.droppableTouchMoveHandler);
    };

    p._documentRemoveEventListener = function () {
        DragDropBase.prototype._documentRemoveEventListener.call(this);

        document.removeEventListener('touchstart', this.documentTouchStartHandler);
        document.removeEventListener('touchend', this.documentTouchEndHandler);
        document.removeEventListener('touchmove', this.documentTouchMoveHandler);
    };

    p._draggableRemoveEventListener = function (draggable) {
        DragDropBase.prototype._draggableRemoveEventListener.call(this, draggable);

        draggable.elem.removeEventListener('touchmove', this.draggableTouchMoveHandler);
        draggable.elem.removeEventListener('touchstart', this.draggableTouchStartHandler);
    };

    p._droppableRemoveEventListener = function (droppable) {
        DragDropBase.prototype._droppableRemoveEventListener.call(this, droppable);

        droppable.elem.removeEventListener('touchmove', this.droppableTouchMoveHandler);
    };

    p._getEventClientX = function (eventArgs) {
        return eventArgs instanceof TouchEvent ? eventArgs.changedTouches[0].clientX : eventArgs.clientX;
    };

    p._getEventClientY = function (eventArgs) {
        return eventArgs instanceof TouchEvent ? eventArgs.changedTouches[0].clientY : eventArgs.clientY;
    };

    p._getEventPageX = function (eventArgs) {
        return eventArgs instanceof TouchEvent ? eventArgs.changedTouches[0].pageX : eventArgs.pageX;

    };

    p._getEventPageY = function (eventArgs) {
        return eventArgs instanceof TouchEvent ? eventArgs.changedTouches[0].pageY : eventArgs.pageY;
    };

    p._getDragDropTarget = function (self, event) {
        var target = event.target;
        if (event instanceof TouchEvent) {
            var touch = event.changedTouches.item(0);
            target = document.elementFromPoint(touch.clientX, touch.clientY);
        }
        return target;
    };

    return DragDropTouch;
});
