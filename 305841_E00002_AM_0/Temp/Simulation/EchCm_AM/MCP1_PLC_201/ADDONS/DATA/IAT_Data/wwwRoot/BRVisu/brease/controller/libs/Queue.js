define(['brease/core/Utils', 'brease/core/libs/Deferred'], function (Utils, Deferred) {

    'use strict';

    var Queue = function Queue(elem, task) {
            if (!elem.id) {
                elem.setAttribute('id', Utils.uniqueID(task + '_queue'));
            }
            this.id = elem.id;
            this.elem = elem;
            this.queue = [];
            this.idQueue = [];
            this.runningQueue = [];
            this.processLength = 0;
            this.task = task;
            this.isRunning = false;

            if (_tasks[this.task] === undefined) {
                _tasks[this.task] = new Map();
            }
            _tasks[this.task].set(this.id, this);
        },

        p = Queue.prototype;

    p.add = function (item) {
        if (Array.isArray(item)) {
            for (var i = 0; i < item.length; i += 1) {
                _addToQueue.call(this, item[i]);
            }
        } else {
            _addToQueue.call(this, item);
        }

        if (this.isRunning === true) {
            if (this.queue.length > 0) {
                _run.call(this);
            }
        }
    };

    function _addToQueue(item) {
        // items are added at the end of the queue
        if (_isItem(item) && !_isInQueue.call(this, item)) {
            this.queue.push(item);
            this.idQueue.push(item.id);
            this.processLength += 1;
        }
    }

    function _isItem(item) {
        return Utils.isString(item.id) && item.id !== '';
    }

    function _isInQueue(item) {
        return this.idQueue.indexOf(item.id) !== -1;
    }

    p.start = function (runMethod, loopParams) {
        if (this.isRunning !== true) {
            this.isRunning = true;
            this.runMethod = runMethod;
            this.deferred = new Deferred(Deferred.TYPE_SINGLE, loopParams);
            if (this.queue.length === 0) {
                this.stop();
                this.finish();
            } else {
                _run.call(this);
            }
        }
        return this.deferred;
    };

    function _run() {
        var queue = this.queue.slice(0),
            self = this;
        this.queue = [];

        queue.forEach(function (item) {
            self.runningQueue.push(item);
            self.runMethod(item, self);
        });
    }

    p.finish = function () {
        if (this.deferred) {
            this.deferred.resolve(this.elem, this.runningQueue);
            this.queue = [];
            this.idQueue = [];
            this.runningQueue = [];
            this.processLength = 0;
            this.runMethod = null;
            this.elem = null;
            _tasks[this.task].delete(this.id);
        }
    };

    p.finishItem = function () {
        if (this.isRunning === true) {
            this.processLength -= 1;

            if (this.processLength === 0) {
                this.isRunning = false;
                this.finish();
            }
        }
    };

    p.stop = function () {
        this.processLength = 0;
        this.isRunning = false;
        this.pending = false;
    };

    var _tasks = {};

    Queue.getQueue = function (elem, task, create) {
        var queue;
        if (elem.id !== undefined && _tasks[task] !== undefined) {
            queue = _tasks[task].get(elem.id);
            if (queue !== undefined) {
                queue.elem = elem;
            }
        }
        if (create === true && queue === undefined) {
            queue = new Queue(elem, task);
        }
        return queue;
    };

    return Queue;

});
