define(function () {

    'use strict';

    function SimpleQueue() {
        this.queue = [];
    } 

    SimpleQueue.prototype.add = function (item) {
        if (this.queue.indexOf(item) === -1) {
            this.queue.push(item); 
        }
    };

    SimpleQueue.prototype.remove = function (item) {
        var index = this.queue.indexOf(item);
        if (index !== -1) {
            this.queue.splice(index, 1);
        }
    };

    SimpleQueue.prototype.contains = function (item) {
        var index = this.queue.indexOf(item);
        return (index !== -1);
    };

    Object.defineProperty(SimpleQueue.prototype, 'length', { get: function () { return this.queue.length; } });

    SimpleQueue.prototype.dispose = function () {
        this.queue.length = 0;
    };

    return SimpleQueue;
});
