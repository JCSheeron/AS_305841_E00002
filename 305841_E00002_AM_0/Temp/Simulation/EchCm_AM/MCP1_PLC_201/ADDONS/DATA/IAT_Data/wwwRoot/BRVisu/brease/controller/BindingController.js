define(['brease/model/BindingModel',
    'brease/controller/BindingLoader',
    'brease/events/BreaseEvent',
    'brease/events/SocketEvent',
    'brease/services/libs/ServerCode',
    'brease/enum/Enum',
    'brease/core/Utils',
    'brease/datatype/Notification',
    'brease/objects/Subscription',
    'brease/controller/ContentManager',
    'brease/core/Types',
    'brease/controller/objects/ContentStatus'], 
function (bindingModel, bindingLoader, BreaseEvent, SocketEvent, ServerCode, Enum, Utils, NotificationType, Subscription, contentManager, Types, ContentStatus) {

    'use strict';

    var bindingController = {
            init: function (runtimeService) {
                if (_runtimeService) {
                    _runtimeService.removeEventListener(SocketEvent.PROPERTY_VALUE_CHANGED, _serverChangeHandler);
                    _runtimeService.removeEventListener(SocketEvent.SUBSCRIBE, _serverSubscribeHandler);
                    _runtimeService.removeEventListener(SocketEvent.UNSUBSCRIBE, _serverUnsubscribeHandler);
                }
                _runtimeService = runtimeService;
                _runtimeService.addEventListener(SocketEvent.PROPERTY_VALUE_CHANGED, _serverChangeHandler);
                _runtimeService.addEventListener(SocketEvent.SUBSCRIBE, _serverSubscribeHandler);
                _runtimeService.addEventListener(SocketEvent.UNSUBSCRIBE, _serverUnsubscribeHandler);
                contentManager.init(runtimeService);
                bindingLoader.init(runtimeService, bindingModel, contentManager);
            },

            startListen: function () {
                bindingLoader.startListen();
            },

            /**
            * @method activateVirtualContent
            * activate virtual content with given contentId
            * activate content of a already activated content will first deactivate this content and then activate it
            * (bindings created with createBindings will be deleted if this content is already activated)
            * @param {String} contentId
            * @param {String} visuId
            */
            activateVirtualContent: function (contentId, visuId) {
                contentManager.addVirtualContent(contentId, visuId);
                return bindingController.activateContent(contentId);
            },

            /**
            * @method activateContent
            * activate content with given contentId
            * activate content of a already activated content will first deactivate this content and then activate it
            * @param {String} contentId
            */
            activateContent: function (contentId) {
            //console.log('%c' + 'activateContent:' + contentId, 'color:#cc00cc');
                var deferred = $.Deferred(),
                    content = contentManager.setLatestRequest(contentId, 'activate');

                if (content) {
                    contentManager.setActiveState(contentId, ContentStatus.activatePending);
                    _runtimeService.activateContent(content.serverId, content.visuId, _activateContentResponseHandler, { requestId: content.latestRequest, contentId: contentId, deferred: deferred });
                } else {
                    deferred.resolve(contentId);
                }
                return deferred.promise();
            },

            isBindingLoaded: function (contentId) {
                return contentManager.isBindingLoaded(contentId);
            },

            isContentActive: function (contentId) {
                return contentManager.isContentActive(contentId);
            },

            getContentState: function (contentId) {
                return contentManager.getActiveState(contentId);
            },

            setContentState: function (contentId, state) {
                return contentManager.setActiveState(contentId, state);
            },

            sendInitialValues: function (contentId, callback) {
                var arChanges = [],
                    readyDef = $.Deferred(),
                    content = contentManager.setLatestRequest(contentId, 'attach');

                if (content) {
                    if (bindingModel.contentHasSubscriptions(contentId)) {

                        bindingModel.getSubscriptionsForContent(contentId).forEach(function (subscriptions, widgetId) {
                            for (var attr in subscriptions) {
                                var subscription = subscriptions[attr];
                                if (subscription !== undefined) {
                                    arChanges.push(_valuesForSubscription(subscription, widgetId, attr));
                                }
                            }
                        });
                        contentManager.setActivateDeferred(contentId, readyDef);
                        _processAttributeChanges(arChanges);
                    } else {
                        readyDef.resolve(contentId);
                    }

                    readyDef.done(function (contentId) {
                        if (typeof callback === 'function') {
                            callback(contentId);
                        }
                    });
                } else {
                    if (typeof callback === 'function') {
                        callback(contentId);
                    }
                }
            },

            deactivateContent: function (contentId, callback) {
            //console.log('%c' + 'deactivateContent:' + contentId, 'color:#00cccc');
                var readyDef = $.Deferred(),
                    content = contentManager.setLatestRequest(contentId, 'detach');

                if (content && content.state !== ContentStatus.aborted) {
                    contentManager.setActiveState(contentId, ContentStatus.deactivatePending);
                    contentManager.setDeactivateDeferred(contentId, readyDef);
                    var force = (brease.config.preLoadingState !== true);
                    _runtimeService.deactivateContent(content.serverId, content.visuId, _deactivateContentResponseHandler, { requestId: content.latestRequest, contentId: contentId }, force);
                    bindingModel.removeDynamicBindings(contentId);
                    bindingModel.deactivateSubscriptions(contentId);
                    readyDef.done(function (contentId) {
                        if (typeof callback === 'function') {
                            callback(contentId);
                        }
                    });

                } else {
                    if (typeof callback === 'function') {
                        callback(contentId);
                    }
                }
            },

            getSubscriptionsForElement: function (elemId, attribute) {
                return bindingModel.getSubscriptionsForElement(elemId, attribute);
            },

            getEventsForElement: function (elemId, event) {
                return bindingModel.getEventsForElement(elemId, event);
            },

            isActiveSessionEvent: function (eventName) {
                var sessionEvents = bindingModel.getSessionEvents(),
                    isActive = false;

                if (sessionEvents['_client'].indexOf(eventName) !== -1) {
                    return true;
                }

                for (var scopeId in sessionEvents) {
                    if (scopeId !== '_client' && contentManager.isContentActive(scopeId) && sessionEvents[scopeId].indexOf(eventName) !== -1) {
                        isActive = true;
                        break;
                    }
                }
                return isActive;
            },

            eventIsSubscribed: function (eventType, eventName, refId) {

                if (eventType.indexOf('widgets.') !== -1) {
                    return (bindingController.getEventsForElement(refId, eventName) !== undefined);
                } else if (eventType.indexOf('clientSystem.') === 0) {
                    return bindingController.isActiveSessionEvent(eventName);
                } else {
                    return false;
                }
            },

            allActive: function (contents) {
                return contentManager.allActive(contents);
            },

            createBindings: function (contentId, visuId, bindings) {
                var def = $.Deferred();
                bindings.forEach(function (binding) {
                    bindingModel.addDynamicBinding(binding, contentId);
                });
                _runtimeService.createBindings(contentId, visuId, bindings, _createBindingsResponseHandler, { contentId: contentId, bindings: bindings, deferred: def });
                return def.promise();
            },

            deleteBindings: function (contentId, visuId, targets) {
                var def = $.Deferred();
                _runtimeService.deleteBindings(contentId, visuId, targets, _deleteBindingsResponseHandler, { contentId: contentId, targets: targets, deferred: def });
                return def.promise();
            },
            attributeChangeForwarder: function (e) {
                _attributeChangeListener(e);
            },
            nodeAttributeChangeForwarder: function (e) {
                _nodeAttributeChangeListener(e);
            }

        },
        _runtimeService;

    function _deleteBindingsResponseHandler(response, callbackInfo) {
        //console.log('_deleteBindings_response:', response, callbackInfo);
        if (response.status.code === ServerCode.SUCCESS) {
            for (var i = 0; i < callbackInfo.targets.length; i += 1) {
                if (response.bindingsStatus[i].code === ServerCode.SUCCESS) {
                    bindingModel.removeDynamicBinding(callbackInfo.targets[i]);
                }
            }
            callbackInfo.deferred.resolve(response.bindingsStatus);
        } else {
            callbackInfo.deferred.reject(response.status);
        }
    }

    function _createBindingsResponseHandler(response, callbackInfo) {
        //console.log('_createBindings_response:', response, callbackInfo);
        var binding,
            subscription,
            arChanges = [];

        if (response.status.code === ServerCode.SUCCESS) {
            for (var i = 0; i < callbackInfo.bindings.length; i += 1) {
                binding = callbackInfo.bindings[i];
                if (response.bindingsStatus[i].code === ServerCode.SUCCESS) {              
                    subscription = bindingModel.addDynamicSubscription(binding.target.refId, binding.target.attribute, callbackInfo.contentId);
                    arChanges.push(_valuesForSubscription(subscription, binding.target.refId, binding.target.attribute));
                    if (binding.source.type === 'brease') {
                        subscription = bindingModel.addDynamicSubscription(binding.source.refId, binding.source.attribute, callbackInfo.contentId);
                        arChanges.push(_valuesForSubscription(subscription, binding.source.refId, binding.source.attribute));
                    }
                } else {
                    bindingModel.removeDynamicBinding(binding.target);
                }
            }
            callbackInfo.deferred.resolve(response.bindingsStatus);
            if (arChanges.length > 0) {
                _processAttributeChanges(arChanges);
            }
        } else {
            callbackInfo.deferred.reject(response.status);
        }
    }

    function _activateContentResponseHandler(response, callbackInfo) {

        if (callbackInfo.requestId === contentManager.getLatestRequest(callbackInfo.contentId) && contentManager.getActiveState(callbackInfo.contentId) > ContentStatus.initialized) {

            if (response.success === true) {
                bindingLoader.loadSubscriptions(callbackInfo.contentId, callbackInfo.deferred);
                brease.loggerService.log(Enum.EventLoggerId.CLIENT_BINDING_ATTACH_OK, Enum.EventLoggerCustomer.BUR, Enum.EventLoggerVerboseLevel.LOW, Enum.EventLoggerSeverity.SUCCESS, [callbackInfo.contentId]);
            } else {
                console.iatWarn('activateContent for content "' + callbackInfo.contentId + '" failed, possibly no binding defined!');
                callbackInfo.deferred.reject(callbackInfo.contentId);
                brease.loggerService.log(Enum.EventLoggerId.CLIENT_BINDING_ATTACH_FAIL, Enum.EventLoggerCustomer.BUR, Enum.EventLoggerVerboseLevel.OFF, Enum.EventLoggerSeverity.ERROR, [callbackInfo.contentId]);
            }
        } else {
            console.iatWarn('activateContent for content "' + callbackInfo.contentId + '" aborted!');
        }
    }

    function _deactivateContentResponseHandler(response, callbackInfo) {

        if (response.success === true) {
            brease.loggerService.log(Enum.EventLoggerId.CLIENT_BINDING_DETACH_OK, Enum.EventLoggerCustomer.BUR, Enum.EventLoggerVerboseLevel.LOW, Enum.EventLoggerSeverity.SUCCESS, [callbackInfo.contentId]);
        } else {
            brease.loggerService.log(Enum.EventLoggerId.CLIENT_BINDING_DETACH_FAIL, Enum.EventLoggerCustomer.BUR, Enum.EventLoggerVerboseLevel.LOW, Enum.EventLoggerSeverity.ERROR, [callbackInfo.contentId]);
        }
    }

    // related getter is either defined (getter) or constructed from the property name
    function _getterOfProperty(attribute, widgetId) {
        var widget = brease.uiController.callWidget(widgetId, 'widget');
        if (widget) {
            var WidgetClass = widget.constructor,
                metaProperty = (WidgetClass.meta && WidgetClass.meta.properties) ? WidgetClass.meta.properties[attribute] : undefined;

            if (metaProperty && metaProperty.getter) {
                return metaProperty.getter;
            } else {
                return Utils.getter(attribute);
            } 
        } else {
            return Utils.getter(attribute);
        } 
    }

    function _valuesForSubscription(subscription, widgetId, attr) {

        var widgetState = brease.uiController.getWidgetState(widgetId);

        if (widgetState <= Enum.WidgetState.NON_EXISTENT) {
            return _nullWithMessage(subscription, 'subscription: widget does not exist (widgetId:"' + widgetId + '", attribute:"' + attr + '")');
        }

        var attribute = attr,
            refAttribute,
            data;

        // support for editable binding, e.g. editable::node
        if (attr.indexOf('::') !== -1) {
            var arAttr = attr.split('::');
            attribute = arAttr[0];
            refAttribute = arAttr[1];
        }

        //addional arguments required when calling callWidget with a structured property
        if (Utils.isStructuredProperty(attribute) === true) {
            var structPropData = Utils.parseStructuredProperty(attribute);
            data = brease.uiController.callWidget(widgetId, _getterOfProperty(structPropData.attribute, widgetId), widgetId + structPropData.path, structPropData.subAttribute);
        } else {
            data = brease.uiController.callWidget(widgetId, _getterOfProperty(attribute, widgetId), refAttribute);
        }

        if (data === undefined) {
            return _nullWithMessage(subscription, 'subscription: undefined value (widgetId:"' + widgetId + '", attribute:"' + attr + '")');
        }

        if (data === null) {
            return _nullWithMessage(subscription, 'subscription: getter returns null (widgetId:"' + widgetId + '", attribute:"' + attr + '")');
        }

        if (NotificationType.prototype.isPrototypeOf(data)) {
            return {
                subscription: subscription,
                data: [],
                type: 'notification'
            };
        } else {
            return {
                subscription: subscription,
                data: data
            };
        }
    }

    function _nullWithMessage(subscription, message) {
        console.iatWarn(message);
        return {
            subscription: subscription,
            data: null
        };
    }

    function _serverChangeHandler(e) {

        var arItems = e.detail,
            itemLength = arItems.length;

        if (itemLength > 0) {

            for (var i = 0; i < itemLength; i += 1) {

                var widgetId = arItems[i].refId,
                    arData = arItems[i].data;

                for (var j = 0, l = arData.length; j < l; j += 1) {
                    try {
                        var subscription = bindingModel.getSubscriptionsForElement(widgetId, arData[j].attribute);
                        if (subscription) {
                            //console.log('%cgetUpdate:' + widgetId + '.' + arData[j].attribute + '=' + JSON.stringify(arData[j].value), 'color:darkgreen');
                            _setWidgetProperty(widgetId, arData[j].attribute, arData[j].value, subscription);
                        } else {
                            console.iatWarn('no subscription for attribute "' + arData[j].attribute + ', widgetId=' + widgetId);
                        }
                    } catch (er) {
                        console.warn('error processing property', er);
                    }

                }
            }
        }
    }

    // related setter is either defined (setter) or constructed from the property name
    function _setterOfProperty(attribute, widget) {
        var WidgetClass = widget.constructor,
            metaProperty = (WidgetClass.meta && WidgetClass.meta.properties) ? WidgetClass.meta.properties[attribute] : undefined;

        if (metaProperty && metaProperty.setter) {
            return metaProperty.setter;
        } else {
            return Utils.setter(attribute);
        }
    }

    function _setWidgetProperty(widgetId, attribute, value, subscription) {
        if (attribute === undefined) {
            console.iatWarn('binding for widget[' + widgetId + ']: no binding attribute given');
        } else {
            var widget = brease.callWidget(widgetId, 'widget');

            if (widget !== null && (widget.state === Enum.WidgetState.INITIALIZED || widget.state === Enum.WidgetState.READY)) {
                var metaData = {
                    origin: 'server'
                };
                // support for editable binding, e.g. editable::node
                if (attribute.indexOf('::') !== -1) {
                    var attr = attribute.split('::');
                    metaData.attribute = attr[0];
                    metaData.refAttribute = attr[1];
                } else {
                    metaData.attribute = attribute;
                }
                var methodName = _setterOfProperty(metaData.attribute, widget);
                if (widget[methodName] !== undefined) {

                    metaData.value = _parseValue(value, widget.constructor, methodName, metaData.attribute, widgetId);

                    subscription.active = true;
                    //addional arguments required when calling callWidget with a structured property
                    if (Utils.isStructuredProperty(attribute)) {
                        var data = Utils.parseStructuredProperty(attribute);
                        widget[methodName](subscription.elemId + data.path, data.subAttribute, metaData.value, metaData);
                    } else {
                        widget[methodName](metaData.value, metaData);
                    }

                    widget.dispatchEvent(new CustomEvent(BreaseEvent.PROPERTY_CHANGED, {
                        detail: {
                            attribute: metaData.attribute,
                            value: metaData.value
                        }
                    }));

                } else {
                    console.iatWarn('binding for widget[' + widgetId + ']: unknown binding method "' + methodName + '"');
                }
            }
        }
    }

    function _parseValue(value, WidgetClass, methodName, attrName, widgetId) {

        // if value is no string: value is returned unmodified 
        if (!Utils.isString(value)) {
            return value;
        }

        var actionName = methodName.substring(0, 1).toUpperCase() + methodName.substring(1);

        // if we find no meta information: value is returned unmodified 
        if (WidgetClass.meta === undefined || WidgetClass.meta.actions === undefined || (WidgetClass.meta.actions[actionName] === undefined && WidgetClass.meta.actions[methodName] === undefined)) {
            return value;
        }
        var action = (WidgetClass.meta.actions[actionName]) ? WidgetClass.meta.actions[actionName] : WidgetClass.meta.actions[methodName];

        var parameter = action.parameter,
            param = parameter[Object.keys(parameter)[0]];

        // if the type is no object type: value is returned unmodified 
        if (!param || Types.objectTypes.indexOf(param.type) === -1) {
            return value;
        }
        
        // try to convert the string to an object
        var obj = Utils.parsePseudoJSON(value, 'illegal data in binding: attribute: ' + attrName + ', widgetId:' + widgetId);
        if (obj) {
            // if the string can be converted to an object: object is returned
            return obj;
        }

        // if the string cannot be converted to an object: value is returned unmodified 
        return value;
    }

    function _attributeChangeListener(e) {
        var widgetId = e.target.id,
            detail = e.detail,
            widgetSubscriptions = bindingModel.getSubscriptionsForElement(widgetId);

        _filterSubscriptions(widgetSubscriptions, function (attribute) { return detail.hasOwnProperty(attribute); })
            .forEach(function (actSubscription) {
                // A&P 509115: widgets duerfen erst ein ValueChange schicken, wenn der content aktiv ist (ContentActivated) oder die subscription
                if (_validateSubscription(actSubscription.data)) {
                    _processAttributeChange(actSubscription.data, detail[actSubscription.attribute]);
                }
            });
    }

    function _nodeAttributeChangeListener(e) {
        //console.debug('_nodeAttributeChangeListener:', e.target.id, e.detail);
        var widgetId = e.target.id,
            detail = e.detail,
            widgetSubscriptions = bindingModel.getSubscriptionsForElement(widgetId);

        _filterSubscriptions(widgetSubscriptions, function (attribute) { return detail.attribute === attribute; })
            .forEach(function (actSubscription) {
                // A&P 509115: widgets duerfen erst ein ValueChange schicken, wenn der content aktiv ist (ContentActivated) oder die subscription
                if (_validateSubscription(actSubscription.data)) {
                    _processNodeChange(actSubscription.data, detail.nodeAttribute, detail.value);
                }
            });
    }

    // Hilfsfunktion zum Filtern von Widget Subscriptions
    function _filterSubscriptions(subscriptions, fn) {
        var _filteredSubscriptions = [];
        if (!Utils.isObject(subscriptions) || typeof fn !== 'function') {
            return _filteredSubscriptions;
        }
        for (var attribute in subscriptions) {
            if (fn(attribute, subscriptions[attribute]) === true) {
                _filteredSubscriptions.push({ attribute: attribute, data: subscriptions[attribute] });
            }
        }
        return _filteredSubscriptions;
    }

    // Hilfsfunktion zum Validieren einer Widget Subscription
    // Liefert den Wert "true" zurueck wenn die Subscription und der Content
    // in dem sie enthalten ist aktiv sind
    function _validateSubscription(subscription) {
        // A&P 509115: widgets duerfen erst ein ValueChange schicken, wenn der content aktiv ist (ContentActivated) oder die subscription
        return subscription !== undefined && (contentManager.isContentActive(subscription.contentId) || subscription.active);
    }

    function _processAttributeChanges(arChanges) {
        //console.log('_processAttributeChanges:', arChanges);
        var update = {
                event: SocketEvent.PROPERTY_VALUE_CHANGED,
                eventArgs: []
            },
            i;

        update.eventArgs = arChanges.map(function (actChange) {
            return (actChange.type !== undefined) ? {
                refId: actChange.subscription.elemId,
                data: [{
                    attribute: actChange.subscription.attribute,
                    value: actChange.data,
                    type: actChange.type
                }]
            } : {
                refId: actChange.subscription.elemId,
                data: [{
                    attribute: actChange.subscription.attribute,
                    value: actChange.data
                }]
            };
        });
        _runtimeService.sendUpdate([update]);
        // after sendInitialValues we can set subscriptions active
        // this way it is guaranteed that initialValues are the first values for subscriptions
        for (i = 0; i < arChanges.length; i += 1) {
            arChanges[i].subscription.active = true;
        }
    }

    function _processAttributeChange(subscription, value) {

        _runtimeService.sendUpdate([{
            event: SocketEvent.PROPERTY_VALUE_CHANGED,
            eventArgs: [Subscription.toServerData(subscription, value)]
        }]);

    }

    function _processNodeChange(subscription, nodeAttribute, value) {

        var singleUpdate = {
                refId: subscription.elemId,
                data: [{
                    attribute: subscription.attribute
                }]
            },
            update = {
                eventArgs: [singleUpdate]
            };
        if (nodeAttribute === 'unit') {
            update.event = 'PropertyUnitChanged';
            singleUpdate.data[0][nodeAttribute] = value;
            _runtimeService.sendUpdate([update]);
        }
    }

    function _serverSubscribeHandler(e) {
        // for dynamic bindings subscription already added in _createBindingsResponseHandler (A&P 722115 )
        if (e.detail && !bindingModel.hasDynamicBinding(Object.assign(e.detail, { type: 'brease' }))) {
            bindingModel.addSubscription(Subscription.fromServerData({
                attribute: e.detail.attribute,
                refId: e.detail.refId
            }, e.detail.contentId)); 

            var subscription = bindingModel.getSubscriptionsForElement(e.detail.refId, e.detail.attribute);
            if (subscription) {
                _processAttributeChanges([_valuesForSubscription(subscription, subscription.elemId, subscription.attribute)]);
            }
        }
    }

    function _serverUnsubscribeHandler(e) {
        if (e.detail) {
            bindingModel.deleteSubscription(e.detail.refId, e.detail.attribute); 
        }
    }

    return bindingController;

});
