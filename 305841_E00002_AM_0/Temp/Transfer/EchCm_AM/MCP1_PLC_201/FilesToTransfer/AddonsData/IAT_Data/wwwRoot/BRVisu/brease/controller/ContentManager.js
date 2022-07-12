define(['brease/events/BreaseEvent', 
    'brease/events/SocketEvent', 
    'brease/model/VisuModel', 
    'brease/objects/Content', 
    'brease/controller/objects/ContentStatus'],
function (BreaseEvent, SocketEvent, visuModel, Content, ContentStatus) {

    'use strict';

    /**
        * @class brease.controller.ContentManager
        * @extends Object
        * @singleton
        */

    var controller = {

            init: function (runtimeService) {
                if (_runtimeService) {
                    _runtimeService.removeEventListener(SocketEvent.CONTENT_ACTIVATED, _contentActivatedHandler, true);
                    _runtimeService.removeEventListener(SocketEvent.CONTENT_DEACTIVATED, _contentDeactivatedHandler, true);
                }
                _runtimeService = runtimeService;
                runtimeService.addEventListener(SocketEvent.CONTENT_ACTIVATED, _contentActivatedHandler, true);
                runtimeService.addEventListener(SocketEvent.CONTENT_DEACTIVATED, _contentDeactivatedHandler, true);
            },

            getContent: function (contentId) {
                return _getContentById(contentId);
            },

            setBindingLoadState: function (contentId, flag) {
                _getContentById(contentId).bindingsLoaded = flag;
            },

            isBindingLoaded: function (contentId) {
                var content = _getContentById(contentId);
                return (content !== undefined && content.bindingsLoaded === true);
            },

            setActiveState: function (contentId, state) {
                var content = _getContentById(contentId);
                if (content) {
                    content.state = state;
                    //console.log('%c' + '          --->[' + parseInt(performance.now(), 10) + '][' + contentId + ']' + ContentStatus.getKeyForValue(state), 'color:blue');
                    //document.body.dispatchEvent(new CustomEvent('ContentStateChanged', { detail: { contentId: contentId, state: state } }));
                }
            },

            getActiveState: function (contentId) {
                var content = _getContentById(contentId);
                if (content) {
                    return _getContentById(contentId).state;
                } else {
                    return ContentStatus.notExistent;
                }
            },

            isContentActive: function (contentId) {
                var content = _getContentById(contentId);
                return (content !== undefined && content.state === ContentStatus.active);
            },

            allActive: function (contents) {
                var active = true;
                for (var i = 0; i < contents.length; i += 1) {
                    active = active && this.isContentActive(contents[i]);
                }
                return active;
            },

            setLatestRequest: function (contentId, request) {
                var content = _getContentById(contentId);
                if (content) {

                    if (request === 'activate') {
                        content.count += 1;
                    }
                    content.latestRequest = contentId + '[' + content.count + ']' + request;
                }
                return content;
            },

            getLatestRequest: function (contentId) {
                var content = _getContentById(contentId);
                if (content) {
                    return _getContentById(contentId).latestRequest;
                } else {
                    return undefined;
                }
            },

            setActivateDeferred: function (contentId, deferred) {
                var content = _getContentById(contentId);
                if (content && content.state === ContentStatus.active) {
                    deferred.resolve(content.id);
                } else {
                    content.activateDeferred = deferred; 
                }
            },

            setDeactivateDeferred: function (contentId, deferred) {
                var content = _getContentById(contentId);
                if (content && content.state === ContentStatus.deactivated) {
                    deferred.resolve(content.id);
                } else {
                    content.deactivateDeferred = deferred; 
                }
            },

            addVirtualContent: function (contentId, visuId) {
                if (_getContentById(contentId) === undefined) {
                    var content = new Content(contentId, visuId, { virtual: true });
                    _initializeContent(content);
                    visuModel.addContent(contentId, content);
                }
            },

            getContents: function (arStates) {
                var contentIds = [],
                    allContents = visuModel.allContents();
                for (var id in allContents) {
                    if (Array.isArray(arStates)) {
                        if (arStates.indexOf(allContents[id].state) !== -1 && !allContents[id].virtual) {
                            contentIds.push(id);
                        }
                    } else {
                        contentIds.push(id);
                    }
                }
                return contentIds;
            },

            getPendingContents: function () {
                return controller.getContents([ContentStatus.activatePending, ContentStatus.deactivatePending]);
            },

            isPending: function (contentId) {
                var content = _getContentById(contentId);
                return (content !== undefined && (content.state === ContentStatus.activatePending || content.state === ContentStatus.deactivatePending || content.state === ContentStatus.inQueue)); 
            },
            setArea: function (contentId, areaId) {
                var content = _getContentById(contentId);
                if (content) {
                    content.areaId = areaId;
                }
            }
        }, _runtimeService;

    function _contentActivatedHandler(e) {
        var content = _getContentById(e.detail.contentId);
        //console.log('%c' + e.type + ':' + e.detail.contentId + ',state:' + ((content) ? content.state : 'undefined'), 'color:#00cccc');
        if (content && content.state > ContentStatus.initialized) {
            controller.setActiveState(e.detail.contentId, ContentStatus.active);
            if (content.activateDeferred !== undefined) {
                content.activateDeferred.resolve(content.id);
                content.activateDeferred = undefined;
            }
            document.body.dispatchEvent(new CustomEvent(BreaseEvent.INITIAL_VALUE_CHANGE_FINISHED, { detail: { contentId: content.id } }));
            document.body.dispatchEvent(new CustomEvent(BreaseEvent.CONTENT_ACTIVATED, { detail: { contentId: content.id } }));
        }
    }

    function _contentDeactivatedHandler(e) {
        var content = _getContentById(e.detail.contentId);
        //console.log('%c' + e.type + ':' + e.detail.contentId + ',state:' + ((content) ? content.state : 'undefined'), 'color:#cc00cc');
        if (content && content.state < ContentStatus.initialized) {
            controller.setActiveState(e.detail.contentId, ContentStatus.deactivated);
            if (content.deactivateDeferred !== undefined) {
                content.deactivateDeferred.resolve(content.id);
                content.deactivateDeferred = undefined;
            }
            document.body.dispatchEvent(new CustomEvent(BreaseEvent.CONTENT_DEACTIVATED, { detail: { contentId: content.id } }));
        }
    }

    function _getContentById(contentId) {
        var content = visuModel.getContentById(contentId);
        if (content !== undefined && content.state === undefined) {
            _initializeContent(content);
        }
        return content;
    }

    function _initializeContent(content) {
        content.state = ContentStatus.initialized;
        content.count = 0;
    }

    return controller;
});
