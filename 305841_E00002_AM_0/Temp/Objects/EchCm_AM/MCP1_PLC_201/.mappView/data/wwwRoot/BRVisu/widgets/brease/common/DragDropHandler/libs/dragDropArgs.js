define([], function () {
    'use strict';
    function DragDropArgs() {
        this.originalEventArgs = null;
        this.target = null;
        this.clientX = 0;
        this.clientY = 0;
        this.pageX = 0;
        this.pageY = 0;
        this.screenX = 0;
        this.screenY = 0;
        this.dragItem = null;
        this.sourceItem = null;
        this.dragData = null;
    }

    return DragDropArgs;
});
