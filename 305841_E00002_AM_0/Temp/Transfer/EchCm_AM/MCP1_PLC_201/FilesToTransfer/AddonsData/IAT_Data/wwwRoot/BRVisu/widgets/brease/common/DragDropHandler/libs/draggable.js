define([], function () {
    'use strict';
    function Draggable() {
        this.id = '';
        this.elem = {};
        /*
         * Defines if the Draggable elem should be automatically cloned on dragstart
         */
        this.clone = false;
        /*
         * Array of css classes to be added to the drag item when it is dragged
         */
        this.cloneClassList = [];
        /*
         * Some additional data for the dragItem which is dragged
         */
        this.data = null;
    }

    return Draggable;
});
