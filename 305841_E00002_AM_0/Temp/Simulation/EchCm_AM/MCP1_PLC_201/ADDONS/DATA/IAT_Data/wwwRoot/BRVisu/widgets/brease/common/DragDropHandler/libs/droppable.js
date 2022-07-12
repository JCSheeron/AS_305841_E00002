define([], function () {
    'use strict';
    function Droppable() {
        this.id = '';
        this.elem = {};
        /*
         * DragEnter is called when Item is dragged inside the droppable HTMLElement
         */
        this.dragEnter = function () { };
        /*
         * DragLeave is called when Item is dragged outside the droppable HTMLElement
         */
        this.dragLeave = function () { };
        /*
         * DragMove is called when Item is dragged over the droppable HTMLElement
         */
        this.dragMove = function () { };
        /*
         * Drop is called when Items is dropped inside the droppable HTMLElement
         */
        this.drop = function () { };
    }

    return Droppable;
});
