define(['brease/events/BreaseEvent', 'brease/controller/objects/ContentStatus'], function (BreaseEvent, ContentStatus) {

    'use strict';

    /**
    * @class brease.controller.libs.Containers
    * @extends Object
    * @singleton
    */

    var controller = {

            getCurrentPage: function (containerId) {
                return _getContainer(containerId).currentPage;
            },

            setCurrentPage: function (containerId, pageId) {
                var container = _getContainer(containerId);
                container.currentPage = pageId;
            },

            setLatestRequest: function (containerId, pageId) {
                var container = _getContainer(containerId);
                container.latestRequest = pageId;
                container.status = 'active';
            },

            getLatestRequest: function (containerId) {
                return _getContainer(containerId).latestRequest;
            },

            dispose: function (containerId) {
                if (_containers[containerId] !== undefined) {
                    _containers[containerId].status = 'disposed';
                }
            },

            reset: function () {
                _containers = {};
            },

            getContainerForPage: function (pageId) {
                var containerId;
                for (var cId in _containers) {
                    if (_containers[cId] && _containers[cId].currentPage === pageId) {
                        containerId = cId;
                        break;
                    }
                }
                return containerId;
            },

            addContainer: function (id, container) {
                if (_containers[id] === undefined) {
                    _containers[id] = container;
                }
            },

            removeContainer: function (id) {
                if (_containers[id] !== undefined) {
                    _containers[id] = undefined;
                }
            },

            resetCurrentPage: function (containerId) {
                if (_containers[containerId] !== undefined) {
                    _containers[containerId].currentPage = undefined;
                }
            },

            resetCurrentPages: function (containerId) {
                var collection = $('#' + containerId).find('.LayoutArea');
                for (var i = 0, len = collection.length; i < len; i += 1) {
                    controller.resetCurrentPage(collection[i].id);
                }
                if ($('#' + containerId).hasClass('LayoutArea')) {
                    controller.resetCurrentPage(containerId);
                }
            },

            /*
        * @method initPageLoadEvent
        * @param {Object} obj
        * @param {String} obj.containerId
        * @param {String} obj.pageId
        * @param {Object} obj.contentsToLoad
        * @param {Object} obj.contentsToRemove
        * @param {Object} obj.embedded
        */
            initPageLoadEvent: function (obj) {
            /* eslint-disable no-new*/
                new PageLoadEvent(_getContainer(obj.containerId), obj);
            /* eslint-enable no-new*/
            }
        },
        _containers = {};

    function _getContainer(containerId) {
        if (_containers[containerId] === undefined) {
            _containers[containerId] = { id: containerId, status: 'active' };
        }
        return _containers[containerId];
    }

    // internal object PageLoadEvent

    var PageLoadEvent = function (container, obj) {
        this.container = container;
        this.pageId = obj.pageId;
        this.contentsToLoad = _getContentsToLoad(obj.contentsToLoad);
        this.contentsToRemove = _getContentsToRemove(obj.contentsToRemove);
        this.embedded = obj.embedded;
        this.boundActivatedListener = this.activatedListener.bind(this);
        this.boundDectivatedListener = this.deactivatedListener.bind(this);
        document.body.addEventListener(BreaseEvent.CONTENT_ACTIVATED, this.boundActivatedListener);
        document.body.addEventListener(BreaseEvent.CONTENT_DEACTIVATED, this.boundDectivatedListener);

        // this check of the contents is meanwhile redundant, as the PageCycle has checked it immediately before
        this.check();
    };

    PageLoadEvent.prototype.activatedListener = function (e) {
        var index = this.contentsToLoad.indexOf(e.detail.contentId);
        if (index > -1 && this.contentsToLoad.length > 0) {
            this.contentsToLoad.splice(index, 1);
        }
        this.check();
    };

    PageLoadEvent.prototype.deactivatedListener = function (e) {
        var index = this.contentsToRemove.indexOf(e.detail.contentId);
        if (index > -1 && this.contentsToRemove.length > 0) {
            this.contentsToRemove.splice(index, 1);
        }
        this.check();
    };

    PageLoadEvent.prototype.check = function () {
        if (this.container && this.container.status === 'active' && this.pageId === controller.getLatestRequest(this.container.id)) {

            if (this.contentsToLoad.length === 0 && this.contentsToRemove.length === 0) {
                _dispatch(this.pageId, this.container.id);
                if (Array.isArray(this.embedded)) {
                    for (var i = 0; i < this.embedded.length; i += 1) {
                        _dispatch(this.embedded[i].pageId, this.embedded[i].containerId);
                    }
                }
                this.dispose();
            }

        } else {
            this.dispose();
        }
    };

    PageLoadEvent.prototype.dispose = function () {
        this.container = null;
        this.contentsToLoad = null;
        this.contentsToRemove = null;
        this.embedded = null;
        document.body.removeEventListener(BreaseEvent.CONTENT_ACTIVATED, this.boundActivatedListener);
        document.body.removeEventListener(BreaseEvent.CONTENT_DEACTIVATED, this.boundDectivatedListener);
    };

    function _getContentsToLoad(arContent) {
        var contentsToLoad = [];
        if (Array.isArray(arContent)) {
            for (var i = 0; i < arContent.length; i += 1) {
                if (brease.uiController.bindingController.isContentActive(arContent[i]) !== true) {
                    contentsToLoad.push(arContent[i]);
                }
            }
        }
        return contentsToLoad;
    }

    function _getContentsToRemove(arContent) {
        var contentsToRemove = [];
        if (Array.isArray(arContent)) {
            for (var i = 0; i < arContent.length; i += 1) {
                if (brease.uiController.bindingController.getContentState(arContent[i]) !== ContentStatus.deactivated) {
                    contentsToRemove.push(arContent[i]);
                }
            }
        }
        return contentsToRemove;
    }

    function _dispatch(pageId, containerId) {
        brease.appElem.dispatchEvent(new CustomEvent(BreaseEvent.PAGE_LOADED, { bubbles: true, cancelable: true, detail: { pageId: pageId, containerId: containerId } }));
    }

    return controller;
});
