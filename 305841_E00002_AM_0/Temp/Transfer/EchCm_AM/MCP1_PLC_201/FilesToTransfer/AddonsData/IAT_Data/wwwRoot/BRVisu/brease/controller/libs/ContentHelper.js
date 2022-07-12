define(['brease/controller/ContentManager',
    'brease/controller/objects/ContentStatus',
    'brease/controller/objects/PageType',
    'brease/model/VisuModel',
    'brease/controller/libs/Utils',
    'brease/events/BreaseEvent'],
function (contentManager, ContentStatus, PageType, visuModel, Utils, BreaseEvent) {
    'use strict';

    /**
    * @class brease.controller.libs.Contents
    * @extends Object
    * @singleton
    */

    var _queue = new Map(),
        _id = 0,
        ContentHelper = {

            activateFinished: function (arContent) {
                var def = $.Deferred();

                var arInactiveContents = arContent.filter(function (contentId) {
                    var state = contentManager.getActiveState(contentId);
                    return state < ContentStatus.active && state !== ContentStatus.aborted;
                });

                if (arInactiveContents.length === 0) {
                    def.resolve(true);
                } else {
                    _waitForContentEvents(def, arInactiveContents, 'activate');
                }
                return def;
            },

            deactivateFinished: function (arContent) {
                var def = $.Deferred();

                var arActiveContents = arContent.filter(function (contentId) {
                    // all contents which are not deactivated so far
                    return contentManager.getActiveState(contentId) > ContentStatus.deactivated;
                });

                if (arActiveContents.length === 0) {
                    def.resolve(true);
                } else {
                    _waitForContentEvents(def, arActiveContents, 'deactivate');
                }

                return def;
            },

            abort: function (deferred) {
                _queue.forEach(function (data, id) {
                    if (data.def === deferred) {
                        window.clearTimeout(data.timeout);
                        _resolve(data.def, true, id, data.eventTypes, data.listener);
                    }
                }, this);
            },

            loadFinished: function (pageId) {
                var def = $.Deferred();
                if (brease.pageController.getCurrentPage(brease.appElem.id) === pageId && !brease.pageController.isCycleActive()) {
                    def.resolve(true);
                } else {
                    var to = window.setTimeout(function () { def.resolve(false); }, ContentHelper.TIMEOUT.loaded);
                    brease.pageController.addCycleFinishedListener(_pageLoadedListener, { def: def, timeout: to });
                }

                return def.promise();
            },

            contentsInDialog: function (dialogId) {
                var $el = $('[data-brease-dialogid="' + dialogId + '"]'),
                    arSystemLoader = Utils.findLoaders($el[0]),
                    arContentId = [];

                arSystemLoader.forEach(function (loaderElem) {
                    var contentId = brease.callWidget(loaderElem.id, 'getContentId');
                    if (contentId) {
                        arContentId.push(contentId);
                    }
                });
                return arContentId;
            },

            activeContentsInDialog: function (dialogId) {
                var $el = $('[data-brease-dialogid="' + dialogId + '"]'),
                    arSystemLoader = Utils.findLoaders($el[0]),
                    arContentId = [];

                arSystemLoader.forEach(function (loaderElem) {
                    var contentId = brease.callWidget(loaderElem.id, 'getContentId');
                    if (contentManager.getActiveState(contentId) === ContentStatus.active) {
                        arContentId.push(contentId);
                    }
                });
                return arContentId;
            },

            extractActive: function (arContentId) {
                return arContentId.filter(function (contentId) {
                    return (contentManager.getActiveState(contentId) === ContentStatus.active); 
                });
            },

            extractNotActive: function (arContentId) {
                return arContentId.filter(function (contentId) {
                    return (contentManager.getActiveState(contentId) < ContentStatus.active); 
                });
            },

            contentsToLoadInDialog: function (dialogId) {
                return visuModel.getContentsOfPage(dialogId, PageType.DIALOG);
            },

            contentAction: function (WidgetClass, actionName) {

                var contentActions = {
                    'widgets.brease.ContentControl': ['LoadContent', 'UnloadContent']
                };

                if (isContentControl(WidgetClass) && contentActions['widgets.brease.ContentControl'].indexOf(actionName) !== -1) {
                    return 'widgets.brease.ContentControl.' + actionName;
                } else {
                    return undefined;
                }

            },

            /**
            * @method contentFinishedStateChange
            * Waits for activation and deactivation of contents.  
            * @param {String} contentAction fully qualified name of the action, e.g. widgets.brease.ContentControl.LoadContent     
            * @param {Object} contentData additional info about contents to be activated or deactivated  
            * @param {ContentReference[]} contentData.activate: contents to be activated  
            * @param {ContentReference[]} contentData.deactivate: contents to be deactivated  
            * @return {Promise}  
            * Is resolved in any case.  
            * Return value in deferred.resolve(success) indicates if content activation or deactivation was successful.  
            */
            contentFinishedStateChange: function (contentAction, contentData) {
                var self = this,
                    def = $.Deferred(),
                    contentId;

                switch (contentAction) {
                    case 'widgets.brease.ContentControl.LoadContent':
                        if (contentData && Array.isArray(contentData.activate) && contentData.activate.length > 0) {
                            contentId = contentData.activate[0];
                            $.when(self.activateFinished([contentId])).then(function (activateResult) {
                                def.resolve(activateResult);
                            });
                        } else {
                            def.resolve(true);
                        }
                        break;

                    case 'widgets.brease.ContentControl.UnloadContent':
                        if (contentData && Array.isArray(contentData.deactivate) && contentData.deactivate.length > 0) {
                            contentId = contentData.deactivate[0];
                            $.when(self.deactivateFinished([contentId])).then(function (deactivateResult) {
                                def.resolve(deactivateResult);
                            });
                        } else {
                            def.resolve(true);
                        }
                        break;
                }

                return def.promise();
            },

            TIMEOUT: {
                deactivate: 5000, // has to be greater than the timeout of the server (=3000)
                activate: 16000, // has to be greater than the timeout of the server (=15000)
                loaded: 30000
            }
        };

    function isContentControl(WidgetClass) {
        var testName = 'widgets.brease.ContentControl',
            inheritance = (WidgetClass.meta && Array.isArray(WidgetClass.meta.inheritance)) ? WidgetClass.meta.inheritance : [],
            className = (WidgetClass.defaults && WidgetClass.defaults.className !== undefined) ? WidgetClass.defaults.className.replace(/\//g, '.') : '';

        return className === testName || inheritance.indexOf(testName) !== -1;

    }

    function _pageLoadedListener(e) {
        window.clearTimeout(e.data.timeout);
        brease.pageController.removeCycleFinishedListener(_pageLoadedListener);
        e.data.def.resolve(true);
    }

    function _waitForContentEvents(def, arContents, type) {
        _id += 1;
        var eventTypes = (type === 'activate') ? [BreaseEvent.CONTENT_ACTIVATED, BreaseEvent.CONTENT_ACTIVATE_ERROR] : [BreaseEvent.CONTENT_DEACTIVATED],
            listener = _contentEventListener.bind(null, _id),
            timeout = window.setTimeout(_resolve, ContentHelper.TIMEOUT[type], def, false, _id, eventTypes, listener),
            data = {
                listener: listener,
                def: def,
                arContent: arContents,
                timeout: timeout,
                eventTypes: eventTypes
            };

        _queue.set(_id, data);
        eventTypes.forEach(function (type) {
            brease.bodyEl.on(type, listener);
        });
    }

    function _resolve(def, success, id, eventTypes, listener) {
        eventTypes.forEach(function (type) {
            brease.bodyEl.off(type, listener);
        });
        _queue.delete(id);
        if (_queue.size === 0) {
            _id = 0;
        }
        def.resolve(success);
    }

    function _contentEventListener(id, e) {

        var data = _queue.get(id),
            index = data.arContent.indexOf(e.detail.contentId);

        if (index !== -1) {
            data.arContent.splice(index, 1);
            if (data.arContent.length === 0) {
                window.clearTimeout(data.timeout);
                _resolve(data.def, true, id, data.eventTypes, data.listener);
            }
        }
    }

    return ContentHelper;
});
