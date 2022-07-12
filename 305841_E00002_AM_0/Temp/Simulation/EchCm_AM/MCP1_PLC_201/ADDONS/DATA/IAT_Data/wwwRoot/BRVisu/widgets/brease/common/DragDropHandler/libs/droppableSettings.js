define([], function () {
    'use strict';
    function DroppableSettings() {
        this.dragEnter = function () { };
        this.dragLeave = function () { };
        this.dragMove = function () { };
        this.drop = function () { };
    }

    return DroppableSettings;
});
