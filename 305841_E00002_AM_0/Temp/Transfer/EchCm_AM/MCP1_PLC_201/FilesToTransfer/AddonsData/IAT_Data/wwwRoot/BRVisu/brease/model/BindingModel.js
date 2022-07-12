define(['brease/objects/Subscription'], function (Subscription) {

    'use strict';

    var _events,
        _subscriptions,
        _bindings;

    var BindingModel = {

        /**
        * @method addSubscription
        * @param {brease.objects.Subscription} subscription
        */
        addSubscription: function (subscription) {
            if (Subscription.isValid(subscription)) {
                var elemId = subscription.elemId,
                    contentId = subscription.contentId;

                if (_subscriptions.elements.get(elemId) === undefined) {
                    _subscriptions.elements.set(elemId, {});
                }

                if (_subscriptions.elements.get(elemId)[subscription.attribute] === undefined) {
                    _subscriptions.elements.get(elemId)[subscription.attribute] = subscription;
                } else if (_subscriptions.elements.get(elemId)[subscription.attribute].dynamic === true) {
                    _subscriptions.elements.get(elemId)[subscription.attribute].count += 1;
                }
                if (_subscriptions.contents.get(contentId) === undefined) {
                    _subscriptions.contents.set(contentId, new Map());
                }
                _subscriptions.contents.get(contentId).set(elemId, _subscriptions.elements.get(elemId));
            }
        },

        deleteSubscription: function (elemId, attribute) {
            var subscriptions = _subscriptions.elements.get(elemId);
            if (subscriptions !== undefined) {
                delete subscriptions[attribute];
            }
        },

        addDynamicBinding: function (binding, contentId) {
            var targetId = _refId(binding.target);
            binding.contentId = contentId;
            _bindings.elements.set(targetId, binding);
            if (_bindings.contents.get(contentId) === undefined) {
                _bindings.contents.set(contentId, new Map());
            }
            _bindings.contents.get(contentId).set(targetId, binding);
        },

        getDynamicBinding: function (target) {
            return _bindings.elements.get(_refId(target));
        },

        hasDynamicBinding: function (targetOrSource) {
            var iterator = _bindings.elements.entries(),
                result = iterator.next();
            while (!result.done) {
                var binding = result.value[1];
                if (_bindingEntityEquals(binding.target, targetOrSource) || _bindingEntityEquals(binding.source, targetOrSource)) {
                    return true;
                }
                result = iterator.next();
            }
            return false;
        },

        removeDynamicBinding: function (target) {

            var targetId = _refId(target),
                binding = _bindings.elements.get(targetId);

            if (binding) {
                _deleteDynamicSubscription(target.refId, target.attribute);

                if (binding.source.type === 'brease') {
                    _deleteDynamicSubscription(binding.source.refId, binding.source.attribute);
                }
                _bindings.elements.delete(targetId);
                _bindings.contents.get(binding.contentId).delete(targetId);
            }
        },

        addDynamicSubscription: function (refId, attribute, contentId) {
            var subscription = Subscription.fromServerData({
                attribute: attribute,
                refId: refId,
                dynamic: true,
                count: 1,
                active: true
            }, contentId);
            BindingModel.addSubscription(subscription);
            return subscription;
        },

        removeDynamicBindings: function (contentId) {
            var contentBindings = _bindings.contents.get(contentId);
            if (contentBindings && contentBindings.size > 0) {
                var toDelete = [];
                contentBindings.forEach(function (binding, key) {
                    if (binding.contentId === contentId) {
                        toDelete.push(key);
                        _deleteDynamicSubscription(binding.target.refId, binding.target.attribute);
                        if (binding.source.type === 'brease') {
                            _deleteDynamicSubscription(binding.source.refId, binding.source.attribute);
                        }
                    }
                });

                for (var i = 0; i < toDelete.length; i += 1) {
                    _bindings.elements.delete(toDelete[i]);
                    _bindings.contents.get(contentId).delete(toDelete[i]);
                }
            }
        },

        getSubscriptionsForElement: function (elemId, attribute) {

            var subscriptions = _subscriptions.elements.get(elemId);
            if (subscriptions !== undefined) {
                if (attribute !== undefined) {
                    return subscriptions[attribute];
                } else {
                    return subscriptions;
                }
            }
            return undefined;
        },

        getSubscriptionsForContent: function (contentId) {
            return _subscriptions.contents.get(contentId);
        },
        
        getEventSubscriptionsForContent: function (contentId) {
            return _events.contents.get(contentId);
        },

        contentHasSubscriptions: function (contentId) {
            var content = _subscriptions.contents.get(contentId);
            return (content !== undefined && content.size > 0);
        },

        deactivateSubscriptions: function (contentId) {
            var contentSubscriptions = _subscriptions.contents.get(contentId);
            if (contentSubscriptions) {
                contentSubscriptions.forEach(function (elemSubscription) {
                    for (var attr in elemSubscription) {
                        elemSubscription[attr].active = false;
                    }
                });
            }
        },

        addEventSubscription: function (subscription) {
            var elemId = subscription.elemId,
                event = subscription.event,
                elemEvents = _events.elements.get(elemId);

            if (elemEvents === undefined) {
                _events.elements.set(elemId, {});
                elemEvents = _events.elements.get(elemId);
            }
            if (elemEvents[event] === undefined) {
                elemEvents[event] = {};
            }

            elemEvents[event] = subscription;
            _events.contents.set(subscription.scopeId, true);
        },

        getEventsForElement: function (elemId, event) {

            var elemEvents = _events.elements.get(elemId);

            if (elemEvents !== undefined) {
                if (event !== undefined) {
                    return elemEvents[event];
                } else {
                    return elemEvents;
                }
            }
            return undefined;
        },

        /*
        * @method addSessionEventSubscription
        * add a subscription for a session event  
        * session events can be in content scope or client scope
        * @param {Object} eventSubscription
        * @param {String} scope either '_client' or a contentId
        */
        addSessionEventSubscription: function (eventSubscription, scope) {
            if (_events.session[scope] === undefined) {
                _events.session[scope] = [];
            }
            if (_events.session[scope].indexOf(eventSubscription.event) === -1) {
                _events.session[scope].push(eventSubscription.event);
            }
        },

        getSessionEvents: function () {
            return _events.session;
        },

        reset: function () {
            _init();
        }

    };

    function _deleteDynamicSubscription(refId, attribute) {
        var subscription = BindingModel.getSubscriptionsForElement(refId, attribute);
        if (subscription) {
            if (subscription.dynamic === true) {
                subscription.count -= 1;
            }
            if (subscription.count === 0) {
                BindingModel.deleteSubscription(refId, attribute);
            }
        }
    }

    function _refId(obj) {
        return obj.type + '||' + obj.refId + '||' + obj.attribute;
    }

    function _bindingEntityEquals(a, b) {
        return a.type === b.type && a.refId === b.refId && a.attribute === b.attribute;
    }

    function _init() {
        _events = {
            session: {
                _client: []
            },
            contents: new Map(),
            elements: new Map()
        };
        _subscriptions = {
            contents: new Map(),
            elements: new Map()
        };
        _bindings = {
            contents: new Map(),
            elements: new Map()
        };
    }

    _init();

    if (brease.config && brease.config.mocked) {
        window.bindingModel = {
            subscriptions: _subscriptions,
            bindings: _bindings,
            events: _events
        }; 
    }

    return BindingModel;
});
