define(['brease/controller/libs/PreCacheInfo', 
    'brease/enum/Enum', 
    'brease/events/BreaseEvent',
    'brease/model/VisuModel',
    'brease/core/Utils', 
    'brease/controller/WidgetController',
    'brease/controller/objects/AssignType'], 
function (PreCacheInfo, Enum, BreaseEvent, visuModel, Utils, widgetController, AssignType) {

    'use strict';

    var Preloader = function (contentManager, loaderPool, showProgressBar, injectedVisuModel) {
            this.contentManager = contentManager;
            this.loaderPool = loaderPool;
            this.visuModel = injectedVisuModel || visuModel;
            this.showProgressBar = showProgressBar;
            this.contentQueue = [];
            this.settings = Utils.deepCopy(defaults);
            this.widgetReadyListener = widgetReadyListener.bind(this);
        },
        defaults = {
            timeoutForDeactivate: 5000,
            timeoutForActivate: 16000, // has to be greater than the timeout of the server (=15000)
            timeoutForWidgetReady: 10000,
            showAllContentsLoaded: 500
        },
        p = Preloader.prototype;

    p.init = function () {
        var self = this,
            deferred = $.Deferred();

        // add a progressBar
        this.infoScreen = new PreCacheInfo(this.showProgressBar, _finishHandler.bind(this), this.contentsToPreload.length, this.settings.showAllContentsLoaded);

        // append a hidden preloadingContainer
        this.preloadingContainer = $('<div style="position:fixed" id="preloadingContainer"></div>').appendTo('body');
            
        this.contentQueue = this.contentsToPreload;

        // activate all embedded visus, so that contents can be loaded and cached
        var deferredEmbeddedVisusFlatList = [];
        this.embeddedVisuIds = getEmbeddedVisuIds.call(this);
        this.embeddedVisuIds.forEach(function (visuId) {
            var activateDeferred = activateVisu.call(self, visuId);
            activateDeferred.promise();
            deferredEmbeddedVisusFlatList.push(activateDeferred);
        });
        $.when.apply($, deferredEmbeddedVisusFlatList).then(function () {
            deferred.resolve();
        });

        return deferred;
    };

    // strip out contents that have no preloading flag
    // integrate contents of the startpage at the beginning
    p.getContentsToPreload = function () {
        this.contentsToPreload = _getContentsToPreload.call(this);
        return this.contentsToPreload;
    };

    p.startProcessingQueue = function () {
        this.readyDef = $.Deferred();
        workTheQueue.call(this);
        return this.readyDef.promise();
    };

    p.start = function () {
        var contentsToPreload = this.getContentsToPreload(),
            response = $.Deferred(),
            preloader = this;

        if (contentsToPreload.length > 0) {
            brease.config.preLoadingState = true;
            preloader.init().then(function () {
                preloader.startProcessingQueue().done(function () {
                    brease.config.preLoadingState = false;
                    response.resolve();
                });
            });
        } else {
            response.resolve();
        }
        return response.promise();
    };

    function _getContentsToPreload() {
        var allContents = this.visuModel.allContents(),
            preCacheContents = {},
            startPage = this.visuModel.getPageById(this.visuModel.startPageId),
            arStartPageContentIds = this.visuModel.getContentsOfPage(startPage.id, startPage.type),
            arFilteredContents = [],
            contentId, content;

        // strip out every content that has not a preCache flag true
        for (contentId in allContents) {
            content = allContents[contentId];
            if (content !== undefined) {
                if (!(content.configurations === undefined || content.configurations.hasOwnProperty('preCache') === false || content.configurations.preCache === false)) {                       
                    preCacheContents[contentId] = Utils.deepCopy(content);
                }
            }
        }

        // add contents of the startPage first
        arStartPageContentIds.forEach(function (contentId) {
            var content = preCacheContents[contentId];
            if (content !== undefined) {
                arFilteredContents.push(content);
            }
        });

        // add other precache contents to filteredContents
        for (contentId in preCacheContents) {
            content = preCacheContents[contentId];
            if (arFilteredContents.indexOf(content) === -1) {
                arFilteredContents.push(content); 
            }
        }
            
        if (arFilteredContents.length > this.loaderPool.maxSlots) {
            brease.loggerService.log(Enum.EventLoggerId.CLIENT_PRECACHING_CONTENT_SLOTS_EXCEEDED, Enum.EventLoggerCustomer.BUR, Enum.EventLoggerVerboseLevel.OFF, Enum.EventLoggerSeverity.WARNING, []);
            // limit array/object of contents that should get cached to the limit of the slots
            arFilteredContents = arFilteredContents.slice(0, this.loaderPool.maxSlots);
        }

        return arFilteredContents;
    }

    function _finishHandler() {
        // deactivate all embedded visus when precaching is finished
        visuModel.deactivateEmbeddedVisus();
        this.preloadingContainer.remove();
        this.readyDef.resolve();
    }

    function workTheQueue() {
            
        var deferred = $.Deferred(),
            self = this,
            contentToPreload = this.contentQueue.shift();

        if (contentToPreload) {
                
            this.infoScreen.updateCount(this.contentQueue.length + 1, contentToPreload.id);

            // create a contentLoader widget via loaderPool
            // deferred resolved in _initializedHandler in LoaderPool
            this.loaderPool.createNew(this.preloadingContainer.get(0), contentToPreload, deferred);

            $.when(deferred).done(function (loaderId, success) {
                    
                if (success) {
                    var contentLoader = widgetController.callWidget(loaderId, 'widget');

                    // listen to content activated event
                    // and then check if widgets are ready
                    if (contentLoader) {
                        contentActivatedCheck.call(self, contentLoader.settings.contentId, loaderId).done(function (loaderId) { 
                            widgetReadyCheck.call(self, loaderId); 
                        });
                    }
                } else {
                    // try again to create a contentLoader widget
                    self.contentQueue.unshift(contentToPreload); 
                    workTheQueue.call(self);
                }
            });
        }
    }
    
    function widgetReadyCheck(loaderId) {
        var contentLoader = widgetController.callWidget(loaderId, 'widget'),
            self = this;

        // only listen to widgets, that are not yet ready
        var widgetsOfContent = widgetController.getWidgetsOfContent(contentLoader.settings.contentId, Enum.WidgetState.IN_QUEUE),
            widgetsInElem = widgetController.findWidgets(contentLoader.elem, false, 0),
            allWidgets = Utils.uniqueArray(widgetsOfContent.concat(widgetsInElem)),
            filteredArr = allWidgets.filter(function (id) {
                return widgetController.getState(id) !== Enum.WidgetState.READY;
            });

        //handle situation if all widgets were ready
        if (filteredArr.length === 0) {
            allWidgetsReady.call(this, contentLoader);
        } else {
            //otherwise wait for widget ready events
            addWidgetReadyListener.call(this, filteredArr, contentLoader.settings.contentId, contentLoader.elem)
                .done(function widgetReadyDone() { 
                    allWidgetsReady.call(self, contentLoader); 
                })
                .fail(function widgetReadyFail() { 
                    disposeLoader.call(self, contentLoader);
                });
        }
    }

    function allWidgetsReady(contentLoader) {
        addToLoaderPool.call(this, contentLoader);
    }

    function contentActivatedCheck(contentId, loaderId) {
        var deferred = $.Deferred();
        if (this.contentManager.isContentActive(contentId)) {
            deferred.resolve(loaderId);
        } else {
            var eventListener = function (e) {
                if (e.detail.contentId === contentId) {
                    document.body.removeEventListener(BreaseEvent.CONTENT_ACTIVATED, eventListener);
                    window.clearTimeout(failureTimeout);
                    deferred.resolve(loaderId);
                }
            };
            var failureTimeout = window.setTimeout(function () {
                document.body.removeEventListener(BreaseEvent.CONTENT_ACTIVATED, eventListener);
                deferred.resolve(loaderId);
            }, this.settings.timeoutForActivate);

            document.body.addEventListener(BreaseEvent.CONTENT_ACTIVATED, eventListener);
        }
        return deferred;
    }

    function addWidgetReadyListener(arr, contentId, contentLoaderElem) {
            
        this.widgetReadyQueue = {
            contentId: contentId,
            contentLoaderElem: contentLoaderElem,
            deferred: $.Deferred(),
            widgets: arr.slice(0)
        };
        contentLoaderElem.addEventListener(BreaseEvent.WIDGET_READY, this.widgetReadyListener);

        // content has 'timeoutForWidgetReady' to load all widgets
        this.widgetReadyQueue.widgetReadyTimeout = window.setTimeout(widgetReadyTimeoutHandler.bind(this), this.settings.timeoutForWidgetReady);

        return this.widgetReadyQueue.deferred;
    }

    function widgetReadyTimeoutHandler() {
        this.widgetReadyQueue.contentLoaderElem.removeEventListener(BreaseEvent.WIDGET_READY, this.widgetReadyListener);
        this.widgetReadyQueue.deferred.reject(this.widgetReadyQueue.contentId);
        this.widgetReadyQueue = undefined;
    }

    function widgetReadyListener(e) {
        var widgetId = e.target.id,
            index = this.widgetReadyQueue.widgets.indexOf(widgetId);
        if (index >= 0) {
            this.widgetReadyQueue.widgets.splice(index, 1);

            if (this.widgetReadyQueue.widgets.length === 0) {
                window.clearTimeout(this.widgetReadyQueue.widgetReadyTimeout);
                this.widgetReadyQueue.contentLoaderElem.removeEventListener(BreaseEvent.WIDGET_READY, this.widgetReadyListener);
                this.widgetReadyQueue.deferred.resolve();
                this.widgetReadyQueue = undefined;
            }
        }
    }

    function disposeLoader(contentLoader) {
        this.loaderPool.flushLoader(contentLoader.elem);
        continueWithQueue.call(this);
    }

    function addToLoaderPool(contentLoader) {
        var self = this,
            contentId = contentLoader.settings.contentId,
            suspendedListener = function (e) {
                if (e.detail.contentId === contentId) {
                    window.clearTimeout(timeout);
                    document.body.removeEventListener(BreaseEvent.CONTENT_DEACTIVATED, suspendedListener);
                    continueWithQueue.call(self); 
                }
            }, 
            timeout = window.setTimeout(function () {
                document.body.removeEventListener(BreaseEvent.CONTENT_DEACTIVATED, suspendedListener);
                continueWithQueue.call(self); 
            }, this.settings.timeoutForDeactivate);

        document.body.addEventListener(BreaseEvent.CONTENT_DEACTIVATED, suspendedListener);
        self.loaderPool.suspendLoader(contentLoader.elem);
    }

    function continueWithQueue() {

        if (this.contentQueue.length !== 0) {
            // iterate until queue is empty
            workTheQueue.call(this);
        } else {
            this.infoScreen.updateCount(0);
        }
    }

    function findEmbeddedVisus(page, visuData) {
        var embeddedVisus = [];

        for (var assignmentId in page.assignments) {
            var assignment = page.assignments[assignmentId];
            if (assignment.type === AssignType.VISU && visuData.visus[assignment.contentId] !== undefined) {
                var visuId = assignment.contentId = Utils.ensureVisuId(assignment.contentId);
                    
                embeddedVisus.push(visuId);
            }
        }

        return embeddedVisus;
    }

    function getEmbeddedVisuIds() {
            
        var visuData = this.visuModel.getVisuData(),
            embeddedVisus = [];

        // iterate through pages and search for embedded visus
        for (var pageId in visuData.pages) {
            var page = visuData.pages[pageId],
                embeddedVisusInPage = findEmbeddedVisus(page, visuData);

            embeddedVisus = embeddedVisus.concat(embeddedVisusInPage);
        }
        // iterate through dialogs and search for embedded visus
        for (var dialogId in visuData.dialogs) {
            var dialog = visuData.dialogs[dialogId],
                embeddedVisusInDialog = findEmbeddedVisus(dialog, visuData);

            embeddedVisus = embeddedVisus.concat(embeddedVisusInDialog);
        }

        embeddedVisus = Utils.uniqueArray(embeddedVisus);
        return embeddedVisus;
    }

    function activateVisu(visuId) {
        var deferred = $.Deferred();

        $.when(this.visuModel.activateVisu(visuId, {
            visuId: visuId
        })).then(function activateEmbeddedVisuSuccess() {
            deferred.resolve();
        },
        // eslint-disable-next-line no-unused-vars
        function activateEmbeddedVisuFailed(visuStatus, code, callbackInfo) {
            brease.loggerService.log(Enum.EventLoggerId.CLIENT_VISU_ACTIVATE_FAILED, Enum.EventLoggerCustomer.BUR, Enum.EventLoggerVerboseLevel.OFF, Enum.EventLoggerSeverity.WARNING, [callbackInfo.visuId]);
            deferred.reject();
        });

        return deferred;
    }

    return Preloader;
});
