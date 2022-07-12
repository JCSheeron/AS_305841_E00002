define(['brease/events/EventDispatcher', 'brease/events/BreaseEvent', 'brease/events/ClientSystemEvent', 'brease/controller/ContentManager'],
    function (EventDispatcher, BreaseEvent, ClientSystemEvent, contentManager) {

        'use strict';

        // PageCycle is a helper class to avoid that ContentLoaders are suspended and disposed in one JS "event loop".
        // As long a PageCycle is running, ContentLoaders are marked for suspension instead of immediate suspension.
        // When a PageCycle is finished, all marked ContentLoaders are suspended, if they are not disposed during the cycle.
        // This way it's ensured that every ContentLoader is either disposed or suspended.

        var PageCycle = function (injectedContentManager) {
            this.inProgress = false;
            this.loadStack = []; // stack for all contents to load -> contents are added and removed
            this.contentsToLoad = []; // stores all contents to load
            this.contentManager = injectedContentManager || contentManager;
            this.contentLoadededListener = _contentLoadededListener.bind(this);
            this.contentDeactivatedListener = _contentDeactivatedListener.bind(this);
            this.dialogAbortedListener = _dialogAbortedListener.bind(this);
        };

        PageCycle.prototype = new EventDispatcher();

        PageCycle.prototype.reset = function () {
            this.inProgress = false;
            this.contentsToLoad = [];
            this.loadStack = [];
        };

        PageCycle.prototype.start = function (callback, contentsToLoad, contentsToRemove, callbackInfo) {
            //console.log('%c' + 'PageCycle.start:' + JSON.stringify(contentsToLoad) + '/' + JSON.stringify(contentsToRemove) + ',inProgress=' + this.inProgress, 'color:' + ((this.inProgress) ? 'red' : 'green'));
            // embedCall is used for embedded pages (Page in assignment)
            var embedCall = callbackInfo && callbackInfo.embedCall === true;
            if (this.inProgress === false) {
                this.inProgress = true;
                this.callback = callback;
                this.callbackInfo = callbackInfo || {};
                this.contentsToRemove = contentsToRemove || [];

                document.body.addEventListener(ClientSystemEvent.CONTENT_LOADED, this.contentLoadededListener);
                document.body.addEventListener(BreaseEvent.CONTENT_SUSPENDED, this.contentDeactivatedListener);
                document.body.addEventListener(BreaseEvent.CONTENT_DISPOSED, this.contentDeactivatedListener);
                document.body.addEventListener(BreaseEvent.DIALOG_OPEN_ABORTED, this.dialogAbortedListener);

            } else if (embedCall) {
                // embedCall=true implies that callbackInfo exists
                if (this.callbackInfo === undefined) {
                    this.callbackInfo = {};
                }
                if (this.callbackInfo.embedded === undefined) {
                    this.callbackInfo.embedded = [];
                }
                // info for callback, to be able to send PAGE_LOADED for every embedded page
                this.callbackInfo.embedded.push({ containerId: callbackInfo.containerId, pageId: callbackInfo.pageId });
            }

            // for embedded pages we do not need to add the contents, as they are included in contentsToLoad of their parent page
            if (!embedCall) {
                _addToArray(this.loadStack, contentsToLoad);
                _addToArray(this.contentsToLoad, contentsToLoad);

                if (this.loadStack.length === 0 && this.contentsToRemove.length === 0) {
                    _finish.call(this);
                }
            }
        };

        PageCycle.prototype.remove = function (contentId, forcedRemove) {

            // forcedRemove is used for contents of an embedded visu which is not loaded (e.g. no license)
            if (forcedRemove === true) {
                _removeFromArray(this.loadStack, contentId);

                // already active contents (e.g. loaded on both pages) will not dispatch a ContentLoaded Event
            } else if (this.contentManager.isContentActive(contentId)) {
                _removeFromArray(this.loadStack, contentId);
            }
            if (forcedRemove === true && this.callbackInfo && Array.isArray(this.callbackInfo.contentsToLoad)) {
                _removeFromArray(this.callbackInfo.contentsToLoad, contentId);
                
            }
            if (this.loadStack.length === 0 && this.inProgress === true) {
                _finishCallback.call(this);
            }
        };

        function _addToArray(arr, toAdd) {
            if (Array.isArray(toAdd)) {
                for (var i = 0; i < toAdd.length; i += 1) {
                    if (arr.indexOf(toAdd[i]) === -1) {
                        arr.push(toAdd[i]);
                    }
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

        function _contentLoadededListener(e) {
            //console.log(e.type, e.detail.contentId);

            _removeFromArray(this.loadStack, e.detail.contentId);
            if (this.loadStack.length === 0 && this.inProgress === true) {
                _finishCallback.call(this);
            }
        }

        function _contentDeactivatedListener(e) {
            //console.log(e.type, e.detail.contentId);
            _removeFromArray(this.contentsToRemove, e.detail.contentId);

            // if a content is deactivated before the load cycle is finished: 
            // e.g. close a dialog before its finished
            _removeFromArray(this.loadStack, e.detail.contentId);

            if (this.loadStack.length === 0 && this.inProgress === true) {
                _finishCallback.call(this);
            }
        }

        function _dialogAbortedListener(e) {
            var self = this;
            if (e.detail && Array.isArray(e.detail.arContentId)) {
                e.detail.arContentId.forEach(function (contentId) {
                    _removeFromArray(self.loadStack, contentId);
                });
            }
            if (this.loadStack.length === 0 && this.inProgress === true) {
                _finishCallback.call(this);
            }
        }

        Object.defineProperty(PageCycle.prototype, 'isEmpty', {
            get: function () {
                return this.length === 0;
            },
            enumerable: true,
            configurable: false
        });

        Object.defineProperty(PageCycle.prototype, 'length', {
            get: function () {
                return this.loadStack.length;
            },
            enumerable: true,
            configurable: false
        });

        function _finishCallback() {
            if (typeof this.callback === 'function') {
                // callback triggers the deactivation of contents tagged for suspension and not needed on new page
                this.callback(this.callbackInfo);
                this.callback = null;
                this.callbackInfo = null;
            }
            if (this.loadStack.length === 0 && this.contentsToRemove.length === 0 && this.inProgress === true) {
                _finish.call(this);
            }
        }

        function _finish() {
            this.inProgress = false;
            this.loadStack = [];
            this.contentsToLoad = [];
            document.body.removeEventListener(ClientSystemEvent.CONTENT_LOADED, this.contentLoadededListener);
            document.body.removeEventListener(BreaseEvent.CONTENT_SUSPENDED, this.contentDeactivatedListener);
            document.body.removeEventListener(BreaseEvent.CONTENT_DISPOSED, this.contentDeactivatedListener);
            document.body.removeEventListener(BreaseEvent.DIALOG_OPEN_ABORTED, this.dialogAbortedListener);

            //console.log('%cCycleFinished', 'color:darkorange');
            // end of cycle -> triggers postponed LoadContentInArea etc.
            this.dispatchEvent({ type: 'CycleFinished' });
            this.removeEventListener('CycleFinished');
        }

        return PageCycle;

    });
