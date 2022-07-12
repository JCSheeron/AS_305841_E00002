define(function () {

    'use strict';

    var DummyEvent = function (type, target) {
        this.type = type;
        this.target = target;
        this.defaultPrevented = false;
    };
    DummyEvent.prototype.preventDefault = function () {
        if (this.originalEvent && this.defaultPrevented !== true && typeof this.originalEvent.preventDefault === 'function') {
            this.defaultPrevented = true;
            this.originalEvent.preventDefault();
        }
    };
    DummyEvent.prototype.stopPropagation = function () { };
    DummyEvent.prototype.stopImmediatePropagation = function () { };
    DummyEvent.prototype.isDefaultPrevented = function () {
        return this.defaultPrevented;
    };
    DummyEvent.prototype.isImmediatePropagationStopped = function () { return false; };
    DummyEvent.prototype.isPropagationStopped = function () { return false; };

    return DummyEvent;
});
