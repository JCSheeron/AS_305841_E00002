define(['brease/core/Utils', 
    'brease/controller/libs/FactoryUtils', 
    'brease/enum/Enum', 
    'brease/events/BreaseEvent', 
    'brease/controller/libs/Queue', 
    'brease/model/WidgetModel'], 
function (Utils, factoryUtils, Enum, BreaseEvent, Queue, WidgetModel) {
    'use strict';

    var widgetModel = new WidgetModel(),
        controller = {

            reset: function (keepGlobal) {
                widgetModel.reset(keepGlobal);
            },

            /**
            * @method getOptions
            * Method to get options for a widget  
            * @param {String} widgetId
            * @param {Boolean} deleteFlag if deleteFlag=true, the object options is deleted in the system  
            */
            getOptions: function (widgetId, deleteFlag) {

                var widget = widgetModel.getWidget(widgetId);

                if (widget === undefined) {
                    return undefined;
                } else {
                    var value = widget.options;
                    if (deleteFlag) {
                        widget.options = undefined;
                    }
                    return value;
                }
            },

            /**
            * @method setOptions
            * Method to add options for a non existent widget to brease, which are later used at widget creation
            * @param {String} widgetId
            * @param {Object} options key/value pairs of widget property values
            * @param {Boolean} overwrite if overwrite=true the entry is replaced with options, otherwise the entry is extended with options
            * @param {Boolean} copy if copy=true, the object options is copied, otherwise the object itself is set
            */
            setOptions: function (widgetId, options, overwrite, copy) {
                var widget = widgetModel.getOrCreate(widgetId);
                if (widget.options) {
                    if (overwrite === true) {
                        if (copy === true) {
                            widget.options = Utils.deepCopy(options);
                        } else {
                            widget.options = options;
                        }
                    } else {
                        widget.options = Utils.extendOptions(widget.options, options);
                    }
                } else {
                    if (copy === true) {
                        widget.options = Utils.deepCopy(options);
                    } else {
                        widget.options = options;
                    }
                }
                if (options && options.parentContentId !== undefined) {
                    widgetModel.addToContent(widgetId, options.parentContentId);
                }
            },

            optionsExist: function (id) {
                var widget = widgetModel.getWidget(id);
                return (widget !== undefined && widget.options !== undefined);
            },

            addOption: function (id, key, value) {

                var widget = widgetModel.getOrCreate(id);
                if (widget.options === undefined) {
                    widget.options = {};
                }
                widget.options[key] = value;
            },

            addWithState: function (id, state) {
                var widgetObj = widgetModel.add(id);
                widgetObj.state = state;
            },

            setState: function (id, state) {
                if (state === Enum.WidgetState.NON_EXISTENT) {
                    controller.deleteWidget(id);
                } else {
                    var widgetObj = widgetModel.getWidget(id);
                    if (widgetObj) {
                        widgetObj.state = state;
                        if (widgetObj.widget !== undefined) {
                            widgetObj.widget.state = state;
                        }
                    } 
                }
            },

            getState: function (id) {
                if (!id) {
                    return Enum.WidgetState.NON_EXISTENT;
                }
                var widgetObj = widgetModel.getWidget(id);
                return (widgetObj !== undefined) ? widgetObj.state : Enum.WidgetState.NON_EXISTENT;
            },

            setSuspendedState: function (id, state) { 
                var widgetObj = widgetModel.getWidget(id);
                if (widgetObj) {
                    widgetObj.suspendedState = state;
                }
            },

            getSuspendedState: function (id) {
                var widgetObj = widgetModel.getWidget(id);
                return (widgetObj !== undefined) ? widgetObj.suspendedState : Enum.WidgetState.NON_EXISTENT;
            },
            
            allPreviouslyReady: function (contentId) {
                var success = true,
                    suspendedState,
                    widgetIds = _getWidgetsOfContent(contentId);
                    
                for (var i = 0; i < widgetIds.length; i += 1) {
                    suspendedState = controller.getSuspendedState(widgetIds[i]);
                    if (suspendedState !== Enum.WidgetState.READY) {
                        //console.log('%c' + widgetIds[i] + '.suspendedState=' + suspendedState, 'color:red');
                        success = false;
                        break;
                    }
                }
                return success;
            },

            addWidget: function (widget) {
                var widgetObj = widgetModel.getOrCreate(widget.elem.id);
                widgetObj.widget = widget;
                if (widgetObj.state === undefined || widgetObj.state < Enum.WidgetState.INITIALIZED) {
                    widgetObj.state = Enum.WidgetState.INITIALIZED;
                }

                if (widget.settings && widget.settings.parentContentId) {
                    widgetModel.addToContent(widget.elem.id, widget.settings.parentContentId);
                }
            },

            getWidget: function (id) {
                return widgetModel.getWidget(id);
            },

            deleteWidget: function (id) {
                widgetModel.deleteWidget(id);
            },

            getWidgetsOfContent: function (contentId, minimalState) {
                return _getWidgetsOfContent(contentId, minimalState);
            },

            dispose: function dispose(target, andSelf, callback, keepBindingInfo) {
                target = factoryUtils.getElem(target);
                if (target !== null) {
                    _stopActQueues(target);
                    controller.walkWidgets(target, andSelf, 'dispose', [keepBindingInfo]);
                    if (typeof callback === 'function') {
                        callback();
                    }
                } else {
                    _warn('dispose');
                }
            },

            disposeInContent: function disposeInContent(target, contentId, callback) {
                //console.warn("disposeInContent:", target.id, contentId);
                target = factoryUtils.getElem(target);
                if (target !== null) {
                    _stopActQueues(target);

                    var widgetIds = controller.getWidgetsOfContent(contentId, Enum.WidgetState.FAILED), //minimal state is lowest state => get all widgets
                        state, suspendedState;

                    for (var i = 0, l = widgetIds.length; i < l; i += 1) {
                        state = controller.getState(widgetIds[i]);
                        suspendedState = controller.getSuspendedState(widgetIds[i]);
                        if (state > Enum.WidgetState.IN_QUEUE && (state < Enum.WidgetState.SUSPENDED || suspendedState > Enum.WidgetState.IN_QUEUE)) {
                            controller.callWidget(widgetIds[i], 'dispose');
                        }
                        controller.deleteWidget(widgetIds[i]);

                    }
                    if (typeof callback === 'function') {
                        callback();
                    }
                    
                } else {
                    _warn('dispose');
                }
            },

            suspend: function suspend(target, andSelf, callback, args) {
                //console.log("suspend:", target.id, andSelf, callback, args);
                target = factoryUtils.getElem(target);
                if (target !== null) {
                    _stopActQueues(target);
                    controller.walkWidgets(target, andSelf, 'suspend', args);
                    if (typeof callback === 'function') {
                        callback();
                    }

                } else {
                    _warn('suspend');
                }
            },

            suspendInContent: function suspendInContent(target, contentId, callback) {
                target = factoryUtils.getElem(target);
                if (target !== null) {
                    _stopActQueues(target);
                }

                var widgetIds = controller.getWidgetsOfContent(contentId, Enum.WidgetState.IN_QUEUE),
                    l = widgetIds.length,
                    i = 0;

                for (i = 0; i < l; i += 1) {
                    controller.callWidget(widgetIds[i], 'suspend');
                }
                for (i = 0; i < l; i += 1) {
                    controller.setSuspendedState(widgetIds[i], controller.getState(widgetIds[i]));
                    controller.setState(widgetIds[i], Enum.WidgetState.SUSPENDED);
                }
                if (typeof callback === 'function') {
                    callback();
                }
            },

            wake: function wake(target, andSelf, callback) {
                target = factoryUtils.getElem(target);
                if (target !== null) {

                    var e1 = new CustomEvent(BreaseEvent.LANGUAGE_CHANGED, { detail: { currentLanguage: brease.language.getCurrentLanguage() } });
                    var e2 = new CustomEvent(BreaseEvent.MEASUREMENT_SYSTEM_CHANGED, { detail: { currentMeasurementSystem: brease.measurementSystem.getCurrentMeasurementSystem() } });
                    var e3 = new CustomEvent(BreaseEvent.USER_CHANGED, { detail: brease.user.getCurrentUser() });
                    var e4 = new CustomEvent(BreaseEvent.CULTURE_CHANGED, { detail: brease.culture.getCurrentCulture().key });

                    controller.walkWidgets(target, andSelf, 'wake', [{
                        language: e1,
                        mms: e2,
                        user: e3,
                        culture: e4
                    }]);
                    if (typeof callback === 'function') {
                        callback();
                    }

                } else {
                    _warn('wake');
                }
            },

            wakeWidget: function wake(widgetId, callback) {

                if (controller.getState(widgetId) >= Enum.WidgetState.INITIALIZED) {

                    var e1 = new CustomEvent(BreaseEvent.LANGUAGE_CHANGED, { detail: { currentLanguage: brease.language.getCurrentLanguage() } });
                    var e2 = new CustomEvent(BreaseEvent.MEASUREMENT_SYSTEM_CHANGED, { detail: { currentMeasurementSystem: brease.measurementSystem.getCurrentMeasurementSystem() } });
                    var e3 = new CustomEvent(BreaseEvent.USER_CHANGED, { detail: brease.user.getCurrentUser() });
                    var e4 = new CustomEvent(BreaseEvent.CULTURE_CHANGED, { detail: brease.culture.getCurrentCulture().key });

                    controller.callWidget(widgetId, 'wake', [{
                        language: e1,
                        mms: e2,
                        user: e3,
                        culture: e4
                    }]);
                    if (typeof callback === 'function') {
                        callback();
                    }

                }
            },

            wakeInContent: function wakeInContent(contentId, callback) {

                var e1 = new CustomEvent(BreaseEvent.LANGUAGE_CHANGED, { detail: { currentLanguage: brease.language.getCurrentLanguage() } }),
                    e2 = new CustomEvent(BreaseEvent.MEASUREMENT_SYSTEM_CHANGED, { detail: { currentMeasurementSystem: brease.measurementSystem.getCurrentMeasurementSystem() } }),
                    e3 = new CustomEvent(BreaseEvent.USER_CHANGED, { detail: brease.user.getCurrentUser() }),
                    e4 = new CustomEvent(BreaseEvent.CULTURE_CHANGED, { detail: brease.culture.getCurrentCulture().key }),
                    widgetIds = controller.getWidgetsOfContent(contentId, Enum.WidgetState.IN_QUEUE),
                    i = 0, l = widgetIds.length,
                    args = ['', 'wake', {
                        language: e1,
                        mms: e2,
                        user: e3,
                        culture: e4
                    }, brease.config.ContentCaching.preserveOldValues],
                    bindings;

                for (i = 0; i < l; i += 1) {
                    controller.setState(widgetIds[i], Enum.WidgetState.READY);
                }
                for (i = 0; i < l; i += 1) {
                    bindings = brease.uiController.bindingController.getSubscriptionsForElement(widgetIds[i]);
                    args[0] = widgetIds[i];

                    if (bindings) {
                        args[4] = bindings;
                    } else {
                        args.length = 4;
                    }
                    controller.callWidget.apply(null, args);
                }
                args.length = 0;
                if (typeof callback === 'function') {
                    callback();
                }

            },

            walkWidgets: function walkWidgets(target, andSelf, method, args) {
                var widgetIds = controller.findWidgets(target, andSelf);
                if (widgetIds.length > 0) {
                    for (var i = 0, l = widgetIds.length; i < l; i += 1) {
                        if (method === 'suspend') {
                            controller.setSuspendedState(widgetIds[i], controller.getState(widgetIds[i]));
                            controller.setState(widgetIds[i], Enum.WidgetState.SUSPENDED);
                        }
                        if (method === 'wake') {
                            controller.setState(widgetIds[i], Enum.WidgetState.READY);
                            var bindings = brease.uiController.bindingController.getSubscriptionsForElement(widgetIds[i]);
                            controller.callWidget.apply(null, (args) ? [widgetIds[i], method].concat(args, (bindings) ? [brease.config.ContentCaching.preserveOldValues, bindings] : [brease.config.ContentCaching.preserveOldValues]) : [widgetIds[i], method]);
                        } else {
                            controller.callWidget.apply(null, (args) ? [widgetIds[i], method].concat(args) : [widgetIds[i], method]);
                        }
                    }
                }
            },

            walkWidgetsInContent: function walkWidgetsInContent(contentId, methodName, minimalState) {

                var widgetIds = controller.getWidgetsOfContent(contentId, minimalState || Enum.WidgetState.INITIALIZED);

                for (var i = 0, l = widgetIds.length; i < l; i += 1) {
                    controller.callWidget(widgetIds[i], methodName);
                }
            },

            callWidget: function callWidget(id, method) {
                var widgetObj = controller.getWidget(id);

                if (widgetObj !== undefined && widgetObj.widget !== undefined) {
                    var widget = widgetObj.widget;

                    if (widget[method] !== undefined) {
                        if (_methodIsCallable(method, widgetObj.state)) {
                            // do not pass the arguments object anywhere: it could leak
                            // therefore the array creation is inline here
                            // and we do not use Array.prototype.slice.call(arguments, 2)
                            // as it prevents optimizations in some JavaScript engines: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
                            var args = [],
                                l = arguments.length,
                                startIndex = 2;

                            if (l > startIndex) {
                                for (var i = startIndex; i < l; i += 1) {
                                    args.push(arguments[i]);
                                }
                            }
                            return widget[method].apply(widget, args);
                        } else {
                            console.iatInfo('[callWidget:' + method + '] widget \'' + id + '\' in unavailable state:' + widgetObj.state);
                            return null;
                        }
                    } else if (method === 'widget') {
                        return widget;
                    } else {
                        console.iatWarn('[callWidget] widget \'' + id + '\' has no method \'' + method + '\'');
                        return null;
                    }
                } else {
                    console.iatWarn('[callWidget] no widget with id "' + id + '" (method call "' + method + '")');
                    return null;
                }
            },

            isWidgetCallable: function (widgetId) {
                var widgetState = controller.getState(widgetId);
                return widgetState === Enum.WidgetState.READY || widgetState === Enum.WidgetState.INITIALIZED;
            },

            findWidgets: function findWidgets(container, andSelf, minimalState) {
                var arIds = [],
                    nodeList,
                    node;
                minimalState = (minimalState !== undefined) ? minimalState : Enum.WidgetState.INITIALIZED;

                container = factoryUtils.getElem(container);
                if (container !== null) {
                    nodeList = container.querySelectorAll('[data-brease-widget]');
                    if (andSelf === true && container.getAttribute('data-brease-widget') !== null && controller.getState(container.id) >= minimalState) {
                        arIds.push(container.id);
                    }

                    if (nodeList.length > 0) {
                        for (var i = nodeList.length - 1; i >= 0; i -= 1) {
                            node = nodeList[i];
                            if (controller.getState(node.id) >= minimalState) {
                                arIds.push(nodeList[i].id);
                            }
                        }
                    }
                } else {
                    _warn('findWidgets');
                }
                return arIds;
            }
        };

    // PRIVATE

    function _stopActQueues(target) {
        var actParseQueue = Queue.getQueue(target, 'parse'),
            actCreateQueue = Queue.getQueue(target, 'create'),
            i = 0;

        if (actCreateQueue !== undefined && (actCreateQueue.isRunning === true || actCreateQueue.pending === true)) {
            actCreateQueue.stop();
            for (i = 0; i < actCreateQueue.runningQueue.length; i += 1) {
                _abortItem(actCreateQueue.runningQueue[i]);
            }
            actCreateQueue.finish();
        }
        if (actParseQueue !== undefined && actParseQueue.isRunning === true) {
            actParseQueue.stop();
            for (i = 0; i < actParseQueue.runningQueue.length; i += 1) {
                _abortItem(actParseQueue.runningQueue[i]);
            }
            for (i = 0; i < actParseQueue.runningQueue.length; i += 1) {
                _removeItem(target, actParseQueue.runningQueue[i]);
            }
            actParseQueue.finish();
        }
    }

    function _abortItem(item) {
        if (item.state < Enum.WidgetState.INITIALIZED) {
            item.state = Enum.WidgetState.ABORTED;
        }
    }

    function _removeItem(target, item) {
        try {
            if (item.state === Enum.WidgetState.ABORTED || item.state === Enum.WidgetState.FAILED) {
                if (target.children[item.elem.id] !== undefined) {
                    target.removeChild(item.elem);
                }
            }
        } catch (e) {
            console.log('%c' + e.message, 'color:red;');
        }
    }

    function _warn(fn, message) {
        var m = message || '[' + fn + '] target of wrong type';
        console.iatWarn(m);
        brease.loggerService.log(Enum.EventLoggerId.CLIENT_PARSE_ERROR, Enum.EventLoggerCustomer.BUR, Enum.EventLoggerVerboseLevel.LOW, Enum.EventLoggerSeverity.WARNING, [], m);
    }

    function _getWidgetsOfContent(contentId, minimalState) {
        var ids = [],
            widgetsOfContent = widgetModel.getWidgetsOfContent(contentId);

        minimalState = (minimalState !== undefined) ? minimalState : Enum.WidgetState.INITIALIZED;

        if (widgetsOfContent !== undefined) {
            widgetsOfContent.forEach(function (widget, key) {
                if (widget !== undefined && widget.contentId === contentId && widget.state >= minimalState) {
                    ids.push(key);
                }
            });
        }
        return ids;
    }

    function _isGetter(methodName) {
        return Utils.isString(methodName) && methodName.indexOf('get') === 0;
    }

    function _methodIsCallable(methodName, widgetState) {
        return (widgetState === Enum.WidgetState.READY || 
            widgetState === Enum.WidgetState.INITIALIZED || 
            (widgetState === Enum.WidgetState.SUSPENDED && (
                methodName === 'dispose' || 
                methodName === 'onBeforeDispose' || 
                _isGetter(methodName)
            )));
    }

    return controller;
});
