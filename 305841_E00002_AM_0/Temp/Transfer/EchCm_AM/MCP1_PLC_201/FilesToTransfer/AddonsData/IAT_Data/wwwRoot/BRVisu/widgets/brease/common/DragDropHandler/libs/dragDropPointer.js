define(['widgets/brease/common/DragDropHandler/libs/dragDropBase'], function (DragDropBase) {
    'use strict';
    function DragDropPointer() {
        DragDropBase.call(this);
    }

    DragDropPointer.prototype = Object.create(DragDropBase.prototype);
    var p = DragDropPointer.prototype;

    p._wrapEventHandler = function () {
        DragDropBase.prototype._wrapEventHandler.call(this);

        var self = this;

        // document events
        this.documentPointerUpHandler = function (e) { self._documentMouseUpHandler(self, e); };
        this.documentPointerDownHandler = function (e) { self._documentMouseDownHandler(self, e); };
        this.documentPointerMoveHandler = function (e) { self._documentMouseMoveHandler(self, e); };

        //draggable events
        this.draggablePointerMoveHandler = function (e) {
            if (e.target.hasPointerCapture && e.target.hasPointerCapture(e.pointerId)) {
                e.target.releasePointerCapture(e.pointerId);
            }
            self._draggableMouseMoveHandler(self, e); 
        };
        this.draggablePointerDownHandler = function (e) { self._draggableMouseDownHandler(self, e); };
        this.draggablePointerLeaveHandler = function (e) { self._draggableMouseLeaveHandler(self, e); };

        //droppable events
        this.droppablePointerEnterHandler = function (e) { self._droppableMouseEnterHandler(self, e); };
        this.droppablePointerMoveHandler = function (e) { self._droppableMouseMoveHandler(self, e); };
        this.droppablePointerLeaveHandler = function (e) { self._droppableMouseLeaveHandler(self, e); };
    };

    p._documentAddEventListener = function () {
        document.addEventListener('pointerup', this.documentPointerUpHandler);
        document.addEventListener('pointerdown', this.documentPointerDownHandler);
        document.addEventListener('pointermove', this.documentPointerMoveHandler);
    };

    p._draggableAddEventListener = function (draggable) {
        draggable.elem.addEventListener('pointermove', this.draggablePointerMoveHandler);
        draggable.elem.addEventListener('pointerdown', this.draggablePointerDownHandler);
        draggable.elem.addEventListener('pointerleave', this.draggablePointerLeaveHandler);
    };

    p._droppableAddEventListener = function (droppable) {
        droppable.elem.addEventListener('pointerenter', this.droppablePointerEnterHandler);
        droppable.elem.addEventListener('pointermove', this.droppablePointerMoveHandler);
        droppable.elem.addEventListener('pointerleave', this.droppablePointerLeaveHandler);
    };

    p._documentRemoveEventListener = function () {
        document.removeEventListener('pointerup', this.documentPointerUpHandler);
        document.removeEventListener('pointerdown', this.documentPointerDownHandler);
        document.removeEventListener('pointermove', this.documentPointerMoveHandler);
    };

    p._draggableRemoveEventListener = function (draggable) {
        draggable.elem.removeEventListener('pointermove', this.draggablePointerMoveHandler);
        draggable.elem.removeEventListener('pointerdown', this.draggablePointerDownHandler);
        draggable.elem.removeEventListener('pointerleave', this.draggablePointerLeaveHandler);
    };

    p._droppableRemoveEventListener = function (droppable) {
        droppable.elem.removeEventListener('pointerenter', this.documentPointerUpHandler);
        droppable.elem.removeEventListener('pointermove', this.droppablePointerMoveHandler);
        droppable.elem.removeEventListener('pointerleave', this.droppablePointerLeaveHandler);
    };

    return DragDropPointer;
});
