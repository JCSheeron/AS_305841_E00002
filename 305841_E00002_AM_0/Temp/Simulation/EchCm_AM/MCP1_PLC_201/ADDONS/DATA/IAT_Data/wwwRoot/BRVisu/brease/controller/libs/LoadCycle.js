define([ 'brease/events/BreaseEvent', 
    'brease/events/ClientSystemEvent'],
function (BreaseEvent, ClientSystemEvent) {

    'use strict';

    var LoadCycle = function () {
            this.inProgress = false;
            this.contentsToLoad = [];
            this.contentsToRemove = [];
            
            this.contentLoadededListener = _contentLoadededListener.bind(this);
            this.dialogAbortedListener = _dialogAbortedListener.bind(this);
            this.contentDeactivatedListener = _contentDeactivatedListener.bind(this);
            this.timeoutCallback = _timeoutCallback.bind(this);
            
            document.body.addEventListener(ClientSystemEvent.CONTENT_LOADED, this.contentLoadededListener);
            document.body.addEventListener(BreaseEvent.CONTENT_LOAD_ABORTED, this.contentLoadededListener);
            document.body.addEventListener(BreaseEvent.DIALOG_OPEN_ABORTED, this.dialogAbortedListener);
            document.body.addEventListener(BreaseEvent.CONTENT_SUSPENDED, this.contentDeactivatedListener);
            document.body.addEventListener(BreaseEvent.CONTENT_DISPOSED, this.contentDeactivatedListener);
        },
        TIMEOUT = {
            deactivate: 5000, // has to be greater than the timeout of the server (=3000)
            activate: 16000 // has to be greater than the timeout of the server (=15000)
        },
        _queue = new Map();
    
    LoadCycle.prototype.add = function (contentToLoad, contentToRemove) {
        this.inProgress = true; 
        _addToArray(this.contentsToLoad, contentToLoad);
        _addToQueue.call(this, contentToLoad, 'activate');

        if (contentToRemove) {
            _addToArray(this.contentsToRemove, contentToRemove);
            _addToQueue.call(this, contentToRemove, 'deactivate'); 
        }
    };

    LoadCycle.prototype.reset = function () {
        this.inProgress = false;
        this.contentsToLoad = [];
        this.contentsToRemove = [];
    };

    function _dialogAbortedListener(e) {
        var self = this;
        if (e.detail && Array.isArray(e.detail.arContentId)) {
            e.detail.arContentId.forEach(function (contentId) {
                _removeFromQueue(contentId);
                _removeFromArray(self.contentsToLoad, contentId);
            });
        }
        _checkInProgress.call(this);
    }

    function _contentLoadededListener(e) {
        _removeFromQueue(e.detail.contentId);
        _removeFromArray(this.contentsToLoad, e.detail.contentId);
        _checkInProgress.call(this);
    }

    function _contentDeactivatedListener(e) {
        _removeFromQueue(e.detail.contentId);
        _removeFromArray(this.contentsToRemove, e.detail.contentId);
        if (this.contentsToLoad.indexOf(e.detail.contentId) !== -1) {
            //content deactivated before activation succeeded
            _removeFromArray(this.contentsToLoad, e.detail.contentId);
        }
        _checkInProgress.call(this);
    }

    function _addToArray(ar, item) {
        if (Array.isArray(ar)) {
            var index = ar.indexOf(item);
            if (index === -1) {
                ar.push(item);
            } 
        }
    }

    function _removeFromArray(ar, item) {
        if (Array.isArray(ar)) {
            var index = ar.indexOf(item);
            if (index !== -1) {
                ar.splice(index, 1);
            } 
        }
    }
    
    function _addToQueue(contentId, type) {
        var timeout = window.setTimeout(this.timeoutCallback, TIMEOUT[type], contentId);
        _queue.set(contentId, { timeout: timeout, type: type });
    }

    function _removeFromQueue(contentId) {
        var data = _queue.get(contentId);
        if (data && data.timeout) {
            window.clearTimeout(data.timeout);
            _queue.delete(contentId);
        }
    }

    function _timeoutCallback(contentId) {
        var data = _queue.get(contentId);
        if (data) {
            if (data.type === 'activate') {
                _removeFromArray(this.contentsToLoad, contentId);
            } else {
                _removeFromArray(this.contentsToRemove, contentId);
            }
            _queue.delete(contentId);
            _checkInProgress.call(this);
        }
    }

    function _checkInProgress() {
        if (this.contentsToLoad.length === 0 && this.contentsToRemove.length === 0) {
            this.inProgress = false;
        }
    }

    return LoadCycle;

});
