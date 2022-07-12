define(['brease/core/Utils'], function (Utils) {

    'use strict';

    /**
    * @class brease.core.libs.AsyncProcess
    */
    var AsyncProcess = function () {
        this.execute = this.run.bind(this);
        this.queue = [];
    };

    AsyncProcess.prototype.start = function () {
        if (!this.started) {
            this.started = true;
            Utils.requestAnimationFrame(this.execute);
        }
    };

    AsyncProcess.prototype.add = function (fn) {
        if (typeof fn === 'function') {
            if (this.queue.indexOf(fn) === -1) {
                this.queue.push(fn);
            }
            this.start();
        }
    };

    AsyncProcess.prototype.run = function () {
        for (var i = 0, l = this.queue.length; i < l; i += 1) {
            this.queue[i].call();
        }
        this.queue.length = 0;
        this.started = false;
    };

    return AsyncProcess;

});
