define(function () {

    'use strict';

    function DialogQueue() {
        this.queue = {};
    } 

    DialogQueue.prototype.hasPendingAction = function (action) {
        var dialogId = getDialogId(action),
            queue = this.queue[dialogId];
        return Array.isArray(queue) && queue.length > 0;
    };

    DialogQueue.prototype.addAction = function (action) {
        var dialogId = getDialogId(action),
            queue = this.queue[dialogId];

        action.force = true;
        if (!Array.isArray(queue)) {
            this.queue[dialogId] = [action];
        } else {
            queue.push(action); 
        }
    };

    DialogQueue.prototype.finishAction = function (action, callback) {
        var dialogId = getDialogId(action),
            queue = this.queue[dialogId];

        if (Array.isArray(queue)) {
            var index = queue.indexOf(action);
            if (index !== -1) {
                queue.splice(index, 1);
            }
            if (typeof callback === 'function') {
                callback(queue.shift()); 
            }
        } else {
            if (typeof callback === 'function') {
                callback(); 
            }
        }
    };

    function getDialogId(action) {
        return (action.actionArgs) ? action.actionArgs.dialogId : undefined;
    }

    return DialogQueue;
});
