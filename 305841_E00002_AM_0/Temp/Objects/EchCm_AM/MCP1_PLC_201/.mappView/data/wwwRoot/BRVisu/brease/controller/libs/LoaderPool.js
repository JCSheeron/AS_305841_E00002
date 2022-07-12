define(['brease/events/BreaseEvent', 'brease/enum/Enum', 'brease/core/Utils', 'brease/controller/WidgetController', 'brease/controller/libs/Utils', 'brease/controller/objects/LoaderItem', 'brease/settings'],
    function (BreaseEvent, Enum, CoreUtils, widgetController, Utils, LoaderItem, settings) {

        'use strict';

        var LoaderPool = function (maxSlots) {
                this.slots = 0;
                if (maxSlots !== undefined) {
                    this.setSlots(maxSlots);
                } else {
                    this.maxSlots = settings.cachingSlotsDefault;
                }
                this.locker = document.createDocumentFragment();
                this.pool = {};
                this.createPool = new Map();
                this.contentCount = {};
            },
            _counter = 0;

        LoaderPool.prototype.dispose = function () {
            for (var loaderId in this.pool) {
                if (brease.uiController.getWidgetState(loaderId) > Enum.WidgetState.NON_EXISTENT) {
                    brease.callWidget(loaderId, 'dispose');
                }
            }
            this.pool = {};
            this.slots = 0;
            this.contentsToLoad = [];
            this.contentCount = {};
            this.setCounter(0);
        };

        LoaderPool.prototype.setSlots = function (maxSlots) {

            this.maxSlots = (maxSlots !== undefined) ? Math.max(0, parseInt(maxSlots, 10)) : settings.cachingSlotsDefault;
            this.maxSlots = Math.min(this.maxSlots, settings.cachingSlotsMax);
        };

        LoaderPool.prototype.loadContent = function (content, $target, deferred) {

            if (!(content && content.path !== undefined)) {
                _handleNoContent.call(this, deferred, $target);
                return;
            }
            _countContent.call(this, content);

            var loaderElemsInArea = $target.find('.systemContentLoader'),
                loaderLength = loaderElemsInArea.length,
                loaderFound = false;

            if (loaderLength > 0) {
                //console.log('there are loaders in area:' + loaderLength);
                var loaderElem = loaderElemsInArea[0],
                    loaderId = loaderElem.id;
                if (widgetController.callWidget(loaderId, 'getUrl') === content.path) {
                    //console.log('loader in ' + $target[0].id + ' has already content ' + content.id);
                    deferred.resolve(loaderId, false);
                    loaderFound = true;

                } else {
                    //console.log('loader ' + loaderElem.id + ' in ' + $target[0].id + ' has other content -> suspend');
                    if (loaderLength > 1) {
                        Utils.resetContentControls($target[0]);
                        var collection = Utils.findLoaders($target[0]);
                        for (var i = 0, l = collection.length; i < l; i += 1) {
                            _trySuspend.call(this, collection[i]);
                        }
                    } else {
                        _trySuspend.call(this, loaderElem);
                    }
                }
            } else {
                _stopLoaderInCreation.call(this, $target);
            }

            if (!loaderFound) {
                //console.log('loadContent: no loader in area found!');
                _addLoaderToArea.call(this, content, $target[0], deferred);
            }

        };

        function _handleNoContent(deferred, $target) {
            var loaderElemsInArea = $target.find('.systemContentLoader');

            if (loaderElemsInArea.length > 0) {
                //console.log('suspend ContentLoader (' + loaderElemsInArea[0].id + ') in ' + $target[0].id);
                _trySuspend.call(this, loaderElemsInArea[0]);
            } else {
                _stopLoaderInCreation.call(this, $target);
            }
            deferred.reject('CONTENT_NOT_FOUND', $target[0]);
        }

        function _stopLoaderInCreation($target) {
            var loaderInCreation = this.createPool.get($target[0].id);
            if (loaderInCreation) {
                //console.log('there is a loader in creation phase for ' + $target[0].id + ' -> stop it');
                _trySuspend.call(this, { id: loaderInCreation.loaderId });
            }
        }

        function _trySuspend(loaderElem) {

            var state = widgetController.getState(loaderElem.id);

            if (state < Enum.WidgetState.INITIALIZED) {
                // loader not completely loaded -> abort loading
                widgetController.setOptions(loaderElem.id, { url: '', contentId: '' });
                var createInstance = this.createPool.get(loaderElem.id);
                if (createInstance) {
                    createInstance.contentId = '';
                }
            } else {
                this.suspendLoader(loaderElem);
            }

        }

        LoaderPool.prototype.isContentLoaded = function (contentId) {

            for (var id in this.pool) {
                if (this.pool[id].inUse === true && contentId === widgetController.callWidget(id, 'getContentId')) {
                    return true;
                }
            }
            return false;
        };

        LoaderPool.prototype.suspendLoader = function (loaderElem, force) {

            if (this.tagMode === true && force !== true) {
                var contentId = widgetController.callWidget(loaderElem.id, 'getContentId'),
                    isContentToLoad = _isContentToLoad.call(this, contentId),
                    loaderItem = this.pool[loaderElem.id];
                //console.log('%c tag for suspension:' + loaderElem.id + ' (' + widgetController.callWidget(loaderElem.id, 'getContentId') + ')', 'color:#cccc00');
                if (loaderItem) {
                    if (isContentToLoad) {
                        loaderItem.tag = 'parked';
                        //console.log('tag as parked');
                    } else {
                        loaderItem.tag = 'suspend';
                        // calls onBeforeSuspend method of widgets inside the ContentLoader. (FlyOut)
                        widgetController.callWidget(loaderElem.id, 'onBeforeSuspend');
                        //console.log('tag as suspend: ' + loaderElem.id + ' || ' + contentId);
                    }

                    this.locker.appendChild(loaderElem);
                    document.body.dispatchEvent(new CustomEvent(BreaseEvent.CONTENT_REMOVED, { detail: { contentId: contentId } }));
                }
            } else {
                widgetController.callWidget(loaderElem.id, 'onBeforeSuspend');
                _suspend.call(this, loaderElem);
            }
        };

        LoaderPool.prototype.flushLoader = function (loaderElem, force) {
            if (this.tagMode === true && force !== true) {
                var contentId = widgetController.callWidget(loaderElem.id, 'getContentId'),
                    isContentToLoad = _isContentToLoad.call(this, contentId),
                    loaderItem = this.pool[loaderElem.id];
                //console.log('%c tag for flushing:' + loaderElem.id + ' (' + contentId + ')', 'color:#cccc00');
                if (loaderItem) {
                    if (isContentToLoad) {
                        loaderItem.tag = 'parked';
                        //console.log('tag as parked');
                    } else {
                        loaderItem.tag = 'flush';
                        widgetController.callWidget(loaderElem.id, 'onBeforeDispose');
                        //console.log('tag as flush');
                    }
                    this.locker.appendChild(loaderElem);
                    document.body.dispatchEvent(new CustomEvent(BreaseEvent.CONTENT_REMOVED, { detail: { contentId: contentId } }));
                }
            } else {
                widgetController.callWidget(loaderElem.id, 'onBeforeDispose');
                _flush.call(this, loaderElem);
            }
        };

        /**
        * @method removeLoader
        * @param {HTMLElement} loaderElem
        * @return {Boolean} force
        */
        LoaderPool.prototype.removeLoader = function (loaderElem, force) {
            //TODO: more sophisticated strategy
            if (this.slots <= this.maxSlots) {
                this.suspendLoader(loaderElem, force);
            } else {
                this.flushLoader(loaderElem, force);
            }
        };

        function _isContentToLoad(contentId) {
            return this.contentsToLoad.indexOf(contentId) !== -1;
        }

        LoaderPool.prototype.startTagMode = function (contentsToLoad) {
            //console.log('%c startTagMode', 'color:#4286f4');
            if (this.tagMode !== true) {
                for (var loaderId in this.pool) {
                    this.pool[loaderId].tag = '';
                }
                this.tagMode = true;
                this.contentsToLoad = (contentsToLoad !== undefined) ? contentsToLoad : [];
            }
        };

        LoaderPool.prototype.endTagMode = function () {
            this.tagMode = false;
            for (var loaderId in this.pool) {
                if (this.pool[loaderId].tag === 'suspend') {
                    if (this.maxSlots === 0) {
                        _flush.call(this, this.locker.querySelector('#' + loaderId));
                    } else {
                        _suspend.call(this, this.locker.querySelector('#' + loaderId));
                    }
                }
                if (this.pool[loaderId].tag === 'flush') {
                    _flush.call(this, this.locker.querySelector('#' + loaderId));
                }
            }
        };

        LoaderPool.prototype.createNew = function (container, content, deferred) {
            _createNew.call(this, container, content, deferred);
        };

        LoaderPool.prototype.getCounter = function () {
            return _counter;
        };

        LoaderPool.prototype.setCounter = function (value) {
            _counter = value;
            return true;
        };

        LoaderPool.prototype.findContentLoaderWithContent = function (url) {
            var loader,
                pool = this.pool;

            for (var id in pool) {
                if (widgetController.callWidget(id, 'getUrl') === url) {
                    loader = pool[id];
                    break;
                }
            }
            //console.log('try to find a loader with ' + url + ':' + ((loader) ? loader.id : 'undefined'));
            return loader;
        };

        /*
        /* PRIVATE
        */

        function _suspend(loaderElem) {
            //console.log('%c LoaderPool.suspend ' + loaderElem.id, 'color:#cccc00');
            var loaderItem = this.pool[loaderElem.id];
            if (loaderItem !== undefined) {
                try {
                    widgetController.callWidget(loaderElem.id, 'suspend');
                } catch (e) {
                    CoreUtils.logError(e);
                } finally {
                    var contentId = widgetController.callWidget(loaderElem.id, 'getContentId');
                    loaderItem.tag = '';
                    loaderItem.inUse = false;
                    // suspendLoader (tagMode) uses same container for suspend so locker may already contain it
                    if (!this.locker.contains(loaderElem)) {
                        this.locker.appendChild(loaderElem);
                        document.body.dispatchEvent(new CustomEvent(BreaseEvent.CONTENT_REMOVED, { detail: { contentId: contentId } }));
                    }
                }

            } else {
                console.iatWarn('no loader with id=' + loaderElem.id + ' found!');
            }
        }

        function _flush(loaderElem) {
            //console.log('%c LoaderPool.flush ' + loaderElem.id, 'color:#cccc00');
            var loaderItem = this.pool[loaderElem.id];
            if (loaderItem !== undefined) {
                try {
                    widgetController.callWidget(loaderElem.id, 'flush');
                } catch (e) {
                    CoreUtils.logError(e);
                } finally {
                    loaderItem.tag = '';
                    loaderItem.inUse = false;
                    loaderItem.contentId = '';
                    this.locker.appendChild(loaderElem);
                }
            } else {
                console.iatWarn('no loader with id=' + loaderElem.id + ' found!');
            }
        }

        function _countContent(content) {
            if (this.contentCount[content.id] === undefined) {
                this.contentCount[content.id] = 0;
            }
            this.contentCount[content.id] += 1;
        }

        function _addLoaderToArea(content, areaDiv, deferred) {
            var loaderObj = _findContentLoaderWithContent.call(this, content.path);
            if (loaderObj) {
                CoreUtils.prependChild(areaDiv, this.locker.querySelector('#' + loaderObj.id));

                try {
                    if (loaderObj.tag !== 'parked') {
                        //console.log('%c there is a loader (=' + loaderObj.id + ') with content "' + content.id + '" -> try wake', 'color:green;');
                        if (widgetController.allPreviouslyReady(content.id)) {
                            //console.log('%c wake ' + loaderObj.id + ' (' + content.id + '' + content.path + ')', 'color:#00cc00;');
                            widgetController.callWidget(loaderObj.id, 'wake');
                        } else {
                            //console.log('%c' + 'content not completely ready -> load(' + content.id + '' + content.path + ')', 'color:#00cccc');
                            widgetController.callWidget(loaderObj.id, 'load', content.path, content.id, true);
                        }
                    } else if (widgetController.callWidget(loaderObj.id, 'widget').suspended) {
                        widgetController.callWidget(loaderObj.id, 'wake');
                    }

                } catch (e) {
                    CoreUtils.logError(e);
                } finally {
                    loaderObj.tag = '';
                    loaderObj.inUse = true;
                    loaderObj.contentId = content.id;
                    deferred.resolve(loaderObj.id, true);
                }
            } else {
                //console.log('there are NO ContentLoaders with ' + content.id);
                //console.log('load content in ContentLoader from Pool!');
                _loadFromPool.call(this, areaDiv, content, deferred);
            }
        }

        function _loadFromPool(container, content, deferred) {

            //console.log('slots=' + this.slots + ', maxSlots=' + this.maxSlots);
            if (this.slots < this.maxSlots) {
                //console.log('maximum noch nicht erreicht -> neuer Loader fuer content ' + content.id);
                _createNew.call(this, container, content, deferred);
            } else {
                //console.log('maximum erreicht -> Loader wiederverwenden!');
                var loaderObj = _getAvailable.call(this, content.id);

                if (loaderObj !== undefined) {
                    //console.log(loaderObj.id + ' wird recycelt');
                    _loadAvailable.call(this, loaderObj, container, content, deferred);
                } else {
                    //console.log('kein verfuegbarer ContentLoader -> neuer Loader fuer content ' + content.id);
                    _createNew.call(this, container, content, deferred);
                }
            }
        }

        function _getAvailable(contentId) {
            var loader,
                loaderId,
                contentCount,
                minContentCount = Number.POSITIVE_INFINITY,
                pool = this.pool;

            for (var id in pool) {
                if (pool[id].inUse !== true || pool[id].tag === 'suspend' || pool[id].tag === 'flush') {
                    contentCount = this.contentCount[pool[id].contentId];
                    if (contentId === widgetController.callWidget(id, 'getContentId')) {
                        loaderId = id;
                        break;
                    }
                    if (contentCount < minContentCount) {
                        minContentCount = contentCount;
                        loaderId = id;
                    }
                }
            }
            if (loaderId) {
                loader = pool[loaderId];
            }
            return loader;
        }

        function _findContentLoaderWithContent(contentPath) {
            var loader,
                pool = this.pool;

            for (var id in pool) {
                if (widgetController.callWidget(id, 'getUrl') === contentPath && (pool[id].inUse !== true || pool[id].tag === 'suspend' || pool[id].tag === 'flush' || pool[id].tag === 'parked')) {
                    loader = pool[id];
                    break;
                }
            }
            //console.log('try to find a loader with ' + contentPath + ':' + ((loader) ? loader.id : 'undefined'));
            return loader;
        }

        function _loadAvailable(loaderObj, container, content, deferred) {
            //console.log('%c_loadAvailable:' + content.id + ' in ' + loaderObj.id + ' in ' + container.id, 'color:#00cccc');
            //console.log('content in loader:' + loaderObj.contentId);
            var tag = loaderObj.tag;
            loaderObj.tag = '';
            loaderObj.inUse = true;

            brease.pageController.emptyContainer(container);
            CoreUtils.prependChild(container, this.locker.querySelector('#' + loaderObj.id));
            if (tag !== 'flush') {
                widgetController.callWidget(loaderObj.id, 'onBeforeDispose');
            }
            loaderObj.contentId = content.id;
            widgetController.callWidget(loaderObj.id, 'load', content.path, content.id);

            deferred.resolve(loaderObj.id, true);
        }

        function _createNew(container, content, deferred) {
            var loaderId = 'SystemLoader' + (_counter += 1),
                self = this,
                createInstance = {
                    contentReadyHandler: _contentReadyHandler.bind(self, container.id),
                    initializedHandler: _initializedHandler.bind(self, container.id),
                    deferred: deferred,
                    containerId: container.id,
                    contentId: content.id,
                    loaderId: loaderId
                };
            //console.log('%c createNew: ' + loaderId + ' ' + content.id, 'color:#9999ff');
            this.slots += 1;
            this.createPool.set(container.id, createInstance);

            container.addEventListener(BreaseEvent.CONTENT_READY, createInstance.contentReadyHandler);

            brease.uiController.createWidgets(container, [{
                className: 'system.widgets.ContentLoader',
                id: loaderId,
                options: {
                    url: content.path,
                    contentId: content.id
                },
                HTMLAttributes: {
                    style: 'box-sizing: border-box; position:relative; overflow:hidden;visibility:hidden;',
                    class: 'systemContentLoader'
                }
            }], true, settings.globalContent, '#' + container.id + ' > :first-child');

        }

        // node of ContentLoader is added to DOM
        // from now on the loader is findable in the DOM
        function _contentReadyHandler(containerId, e) {
            var createInstance = this.createPool.get(containerId);
            //console.log('%c _contentReadyHandler: containerId=' + createInstance.containerId + ',loaderId=' + createInstance.loaderId + ',contentId=' + createInstance.contentId + ',targetId=' + e.target.id, 'color:#9999ff');

            if (e.target.id === containerId) {
                e.target.removeEventListener(BreaseEvent.CONTENT_READY, createInstance.contentReadyHandler);
                var loaderElem = document.getElementById(createInstance.loaderId);
                if (loaderElem) {
                    //console.log(loaderElem.id + '.contentReady:' + createInstance.contentId);
                    loaderElem.addEventListener(BreaseEvent.WIDGET_INITIALIZED, createInstance.initializedHandler);
                } else {
                    this.createPool.delete(containerId);
                }
            }
        }

        function _initializedHandler(containerId, e) {
            var createInstance = this.createPool.get(containerId);
            if (createInstance) {
                var loaderId = createInstance.loaderId;
                //console.log('%c _initializedHandler: containerId=' + createInstance.containerId + ',loaderId=' + createInstance.loaderId + ',contentId=' + createInstance.contentId + ',targetId=' + e.target.id, 'color:#9999ff');
                if (e.target.id === loaderId) {
                    e.target.removeEventListener(BreaseEvent.WIDGET_INITIALIZED, createInstance.initializedHandler);

                    this.pool[loaderId] = new LoaderItem(loaderId, createInstance.contentId);
                    this.pool[loaderId].inUse = true;

                    createInstance.deferred.resolve(loaderId, true);
                    this.createPool.delete(containerId);
                }
            }
        }

        return LoaderPool;
    });
