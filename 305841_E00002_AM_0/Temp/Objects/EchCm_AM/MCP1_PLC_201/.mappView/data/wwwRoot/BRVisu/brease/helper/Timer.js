define(['brease/events/EventDispatcher', 'brease/events/BreaseEvent'], function (SuperClass, BreaseEvent) {

    'use strict';
    var Timer = function Timer(interval) {
            this.active = false;
            this.interval = interval;
            this.start();
        },

        p = Timer.prototype = new SuperClass();

    p.start = function () {
        if (this.active === false) {
            this.ticker = window.setInterval(this.tickHandler.bind(this), this.interval);
            this.active = true;
        }
    };

    p.stop = function () {
        window.clearInterval(this.ticker);
        this.active = false;
    };

    p.tickHandler = function () {
        this.dispatchEvent(new CustomEvent(BreaseEvent.TICK, { detail: { timestamp: Date.now() } }));
    };

    p.addEventListener = function (type, listener, unshift) {
        SuperClass.prototype.addEventListener.call(this, type, listener, unshift);
        this.start();
    };

    p.removeEventListener = function (type, listener) {
        SuperClass.prototype.removeEventListener.call(this, type, listener);
        if (this.hasListenersOfType('tick') === false) {
            this.stop();
        }
    };

    p.dispose = function () {
        window.clearInterval(this.ticker);
    };

    return Timer;

});
