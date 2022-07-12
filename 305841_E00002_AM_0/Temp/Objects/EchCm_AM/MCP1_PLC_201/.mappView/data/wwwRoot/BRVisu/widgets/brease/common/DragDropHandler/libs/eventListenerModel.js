define([], function () {
    'use strict';
    function EventListenerModel(event, func) {
        this.event = event;
        this.function = func;
    }

    return EventListenerModel;
});
