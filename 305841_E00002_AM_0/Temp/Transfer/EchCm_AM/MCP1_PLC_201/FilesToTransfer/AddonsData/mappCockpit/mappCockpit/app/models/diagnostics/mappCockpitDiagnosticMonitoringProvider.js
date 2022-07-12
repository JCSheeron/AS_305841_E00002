var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "../../communication/rest/opcUaWebSocket", "../../communication/rest/opcUaRestServices", "../../framework/events", "../../framework/interfaces/observer"], function (require, exports, opcUaWebSocket_1, opcUaRestServices_1, events_1, observer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventObservedItemsChanged = /** @class */ (function (_super) {
        __extends(EventObservedItemsChanged, _super);
        function EventObservedItemsChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventObservedItemsChanged;
    }(events_1.TypedEvent));
    ;
    var EventObservedSubscriptionItemsChanged = /** @class */ (function (_super) {
        __extends(EventObservedSubscriptionItemsChanged, _super);
        function EventObservedSubscriptionItemsChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventObservedSubscriptionItemsChanged;
    }(events_1.TypedEvent));
    ;
    var EventObservedItemsChangedArgs = /** @class */ (function () {
        function EventObservedItemsChangedArgs(observer, subscription, changedItems) {
            this._observer = observer;
            this._monitoringSubscription = subscription;
            this._changedMonitoredItems = changedItems;
        }
        Object.defineProperty(EventObservedItemsChangedArgs.prototype, "observer", {
            get: function () {
                return this._observer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EventObservedItemsChangedArgs.prototype, "subscription", {
            get: function () {
                return this._monitoringSubscription;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EventObservedItemsChangedArgs.prototype, "changedItems", {
            get: function () {
                return this._changedMonitoredItems;
            },
            enumerable: true,
            configurable: true
        });
        return EventObservedItemsChangedArgs;
    }());
    exports.EventObservedItemsChangedArgs = EventObservedItemsChangedArgs;
    ;
    /**
     * implements observation and monitoring of diagnostic elements
     *
     * @class MappCockpitDiagnosticMonitoringProvider
     */
    var MappCockpitDiagnosticMonitoringProvider = /** @class */ (function () {
        /**
         *Creates an instance of MappCockpitDiagnosticMonitoringProvider.
         * @param {MappCockpitDiagnosticProvider} diagnosticProvider
         * @memberof MappCockpitDiagnosticMonitoringProvider
         */
        function MappCockpitDiagnosticMonitoringProvider(diagnosticProvider) {
            var _this = this;
            this._opcUaWebSocketHandler = function (sender, eventArgs) { _this.handleOpcUaEvent(eventArgs); };
            this._observedItemsChangedHandler = function (sender, eventArgs) { _this.eventObservedItemsChanged.raise(_this, eventArgs); };
            this._diagnosticProvider = diagnosticProvider;
            this._monitoringSubscriptions = new MonitoringSubscriptionCollection();
            this.eventObservedItemsChanged = new EventObservedItemsChanged();
        }
        /**
         * creates a connection for listening to events from opc-ua
         *
         * @private
         * @memberof MappCockpitDiagnosticMonitoringProvider
         */
        MappCockpitDiagnosticMonitoringProvider.prototype.createOpcUaSocket = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this._opcUaWebSocket = opcUaWebSocket_1.OpcUaWebSocket.create();
                            this._opcUaWebSocket.eventOpcUaWebSocket.attach(this._opcUaWebSocketHandler);
                            return [4 /*yield*/, this._opcUaWebSocket.connect()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * activates observing parameter changes.
         *
         * @param {*} observer
         * @param {number} sessionId
         * @param {MappCockpitComponentItem[]} componentParameters
         * @returns {Promise<void>}
         * @memberof MappCockpitDiagnosticMonitoringProvider
         */
        MappCockpitDiagnosticMonitoringProvider.prototype.observeComponentModelItems = function (observer, sessionId, componentParameters) {
            return __awaiter(this, void 0, void 0, function () {
                var subscription, _a, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 6, , 7]);
                            if (!(this.findSubscriptionForObserver(observer, sessionId) != null)) return [3 /*break*/, 1];
                            _a = this.findSubscriptionForObserver(observer, sessionId);
                            return [3 /*break*/, 3];
                        case 1: return [4 /*yield*/, MonitoringSubscription.create(observer, sessionId)];
                        case 2:
                            _a = _b.sent();
                            _b.label = 3;
                        case 3:
                            subscription = _a;
                            if (!subscription) return [3 /*break*/, 5];
                            // attach items changed event and forward it through the provider
                            subscription.eventObservedItemsChanged.attach(this._observedItemsChangedHandler);
                            // add the new subscription to the subscription collection
                            this._monitoringSubscriptions.add(subscription);
                            // create the items to monitor
                            return [4 /*yield*/, subscription.createMonitoredItems(componentParameters)];
                        case 4:
                            // create the items to monitor
                            _b.sent();
                            console.log("MappCockpitDiagnosticMonitoringProvider:created subscription: %o %o %o", observer, subscription.id, this._monitoringSubscriptions);
                            _b.label = 5;
                        case 5: return [3 /*break*/, 7];
                        case 6:
                            error_1 = _b.sent();
                            return [3 /*break*/, 7];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Gets the subscription for the observer.
         *
         * @private
         * @param {*} observer
         * @param {number} sessionId
         * @returns
         * @memberof MappCockpitDiagnosticMonitoringProvider
         */
        MappCockpitDiagnosticMonitoringProvider.prototype.findSubscriptionForObserver = function (observer, sessionId) {
            // find a subscription for this observer.
            var existingSubscription = this._monitoringSubscriptions.items.filter(function (subscription) { return subscription.observer == observer; });
            // check if a subscription for this observer already exists.
            if (existingSubscription.length >= 1) {
                // return the existing subscription ...
                return existingSubscription[0];
            }
            else {
                return null;
            }
        };
        /**
         * Unobserves the passed items.
         *
         * @param {*} observer
         * @param {number} sessionId
         * @param {MappCockpitComponentItem[]} observedItems
         * @param {boolean} suspend
         * @memberof MappCockpitDiagnosticMonitoringProvider
         */
        MappCockpitDiagnosticMonitoringProvider.prototype.unobserveComponentModelItems = function (observer, sessionId, observedItems, suspend) {
            return __awaiter(this, void 0, void 0, function () {
                var subscription, deletedSubscriptionId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            subscription = this.findSubscriptionForObserver(observer, sessionId);
                            if (!subscription) return [3 /*break*/, 2];
                            subscription.eventObservedItemsChanged.detach(this._observedItemsChangedHandler);
                            return [4 /*yield*/, this.deleteSubscription(sessionId, subscription)];
                        case 1:
                            deletedSubscriptionId = _a.sent();
                            console.log("MappCockpitDiagnosticMonitoringProvider.unobserveComponentModelItems - observer:%o :items %o, subscriptionId:%o", subscription.observer, observedItems, deletedSubscriptionId);
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Deletes a subscription with its monitored items.
         *
         * @private
         * @param {number} sessionId
         * @param {MonitoringSubscription} subscription
         * @returns {Promise<number>}
         * @memberof MappCockpitDiagnosticMonitoringProvider
         */
        MappCockpitDiagnosticMonitoringProvider.prototype.deleteSubscription = function (sessionId, subscription) {
            return __awaiter(this, void 0, void 0, function () {
                var deletedSubscriptionId, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            deletedSubscriptionId = -1;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, MonitoringSubscription.delete(sessionId, subscription.id)];
                        case 2:
                            // delete the subscription on the target
                            deletedSubscriptionId = _a.sent();
                            // remove the subscription instance from the list
                            this._monitoringSubscriptions.remove(subscription);
                            return [3 /*break*/, 4];
                        case 3:
                            error_2 = _a.sent();
                            console.error(error_2);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/, deletedSubscriptionId];
                    }
                });
            });
        };
        /**
         * handles opc-ua events
         *
         * @param {OpcUaWebSocketEventArgs} eventArgs
         * @returns {*}
         * @memberof MappCockpitDiagnosticMonitoringProvider
         */
        MappCockpitDiagnosticMonitoringProvider.prototype.handleOpcUaEvent = function (eventArgs) {
            switch (eventArgs.type) {
                case opcUaWebSocket_1.SockeEventType.MESSAGE:
                    this.processOpcUaDataChanged(eventArgs.data);
                    break;
                default:
                    break;
            }
        };
        /**
         * receives the data changed and distributes it to consumers
         *
         * @private
         * @param {IOpcUaDataChanged} opcUaDataChangedInfo
         * @memberof MappCockpitDiagnosticMonitoringProvider
         */
        MappCockpitDiagnosticMonitoringProvider.prototype.processOpcUaDataChanged = function (opcUaDataChangedInfo) {
            var modifiedSubscription = this._monitoringSubscriptions.findById(opcUaDataChangedInfo.subscriptionId);
            if (modifiedSubscription) {
                modifiedSubscription.processItemChanges(opcUaDataChangedInfo);
            }
        };
        /**
         * closes the monitoring provider and all its connections
         *
         * @returns {*}
         * @memberof MappCockpitDiagnosticMonitoringProvider
         */
        MappCockpitDiagnosticMonitoringProvider.prototype.close = function () {
            if (this._opcUaWebSocket) {
                this._opcUaWebSocket.eventOpcUaWebSocket.detach(this._opcUaWebSocketHandler);
                this._opcUaWebSocket.close();
            }
        };
        return MappCockpitDiagnosticMonitoringProvider;
    }());
    exports.MappCockpitDiagnosticMonitoringProvider = MappCockpitDiagnosticMonitoringProvider;
    /**
     * the class holds and manages subscriptions.
     *
     * @class MonitoringSubscriptionSet
     */
    var MonitoringSubscriptionCollection = /** @class */ (function () {
        /**
         *Creates an instance of MonitoringSubscriptionCollection.
         * @memberof MonitoringSubscriptionCollection
         */
        function MonitoringSubscriptionCollection() {
            // the subscription instances are stored with id as key on a simple object
            this._subscriptions = {};
        }
        /**
         * adds a new subcription
         *
         * @param {MonitoringSubscription} subscription
         * @memberof MonitoringSubscriptionCollection
         */
        MonitoringSubscriptionCollection.prototype.add = function (subscription) {
            // store the subscription by id
            this._subscriptions[subscription.id] = subscription;
        };
        /**
         * removes the given subscription
         *
         * @param {MonitoringSubscription} subscription
         * @memberof MonitoringSubscriptionCollection
         */
        MonitoringSubscriptionCollection.prototype.remove = function (subscription) {
            delete this._subscriptions[subscription.id];
        };
        /**
         * returns the subscription with the requested id
         *
         * @param {number} subscriptionId
         * @memberof MonitoringSubscriptionCollection
         */
        MonitoringSubscriptionCollection.prototype.findById = function (subscriptionId) {
            // retrieve the available subscription
            var subscription = this._subscriptions[subscriptionId];
            return subscription;
        };
        Object.defineProperty(MonitoringSubscriptionCollection.prototype, "items", {
            /**
             * gets the available subscriptions
             *
             * @readonly
             * @type {Array<MonitoringSubscription>}
             * @memberof MonitoringSubscriptionCollection
             */
            get: function () {
                var _this = this;
                return Object.keys(this._subscriptions).map(function (key) { return _this._subscriptions[key]; });
            },
            enumerable: true,
            configurable: true
        });
        return MonitoringSubscriptionCollection;
    }());
    /**
     * implements managing a set of monitoring items in a subscription
     *
     * @class MonitoringSubscription
     */
    var MonitoringSubscription = /** @class */ (function () {
        /**
         * Creates an instance of MonitoringSubscription.
         * @param {*} observer
         * @param {*} sessionId
         * @param {number} subscriptionId
         * @memberof MonitoringSubscription
         */
        function MonitoringSubscription(observer, sessionId, subscriptionId) {
            // holds the subscription id
            this._subscriptionId = -1;
            // holds a collection of items to be monitored
            this._monitoringItems = {};
            this._subscriptionObserver = observer;
            this._sessionId = sessionId;
            this._subscriptionId = subscriptionId;
            this._monitoringItems = {};
            this.eventObservedItemsChanged = new EventObservedSubscriptionItemsChanged();
        }
        Object.defineProperty(MonitoringSubscription.prototype, "id", {
            /**
             * returns the subscription id
             *
             * @readonly
             * @memberof MonitoringSubscription
             */
            get: function () {
                return this._subscriptionId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MonitoringSubscription.prototype, "observer", {
            /**
             * returns the observer interrested in change notifications
             *
             * @readonly
             * @type {*}
             * @memberof MonitoringSubscription
             */
            get: function () {
                return this._subscriptionObserver;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * returns the monitored item with the specefied id
         *
         * @param {*} clientId
         * @returns {MappCockpitComponentParameter}
         * @memberof MonitoringSubscription
         */
        MonitoringSubscription.prototype.getMonitoredItemById = function (clientId) {
            return this._monitoringItems[clientId];
        };
        /**
         * creates a new monitoring subscription.
         *
         * @static
         * @param {*} observer
         * @param {number} sessionId
         * @returns {Promise<MonitoringSubscription>}
         * @memberof MonitoringSubscription
         */
        MonitoringSubscription.create = function (observer, sessionId) {
            return __awaiter(this, void 0, void 0, function () {
                var subscriptionId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.createSubscription(sessionId)];
                        case 1:
                            subscriptionId = _a.sent();
                            return [2 /*return*/, new MonitoringSubscription(observer, sessionId, subscriptionId)];
                    }
                });
            });
        };
        /**
         * Deletes the specified subscription
         *
         * @static
         * @param {number} sessionId
         * @param {number} subscriptionId
         * @returns {Promise<number>}
         * @memberof MonitoringSubscription
         */
        MonitoringSubscription.delete = function (sessionId, subscriptionId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.deleteSubscription(sessionId, subscriptionId)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * creates a set of items to be monitored
         *
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @returns {Promise<any>}
         * @memberof MonitoringSubscription
         */
        MonitoringSubscription.prototype.createMonitoredItems = function (componentParameters) {
            return __awaiter(this, void 0, void 0, function () {
                var monitoredItems_1, createMonitoredItemsResult, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            // activae batching
                            opcUaRestServices_1.OpcUaRestServices.activateBatching();
                            return [4 /*yield*/, this.createMonitoredSubscriptionItems(componentParameters)];
                        case 1:
                            monitoredItems_1 = _a.sent();
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.executeBatchRequest()];
                        case 2:
                            createMonitoredItemsResult = _a.sent();
                            // process the batch request result by assigning  monitored item ids ..
                            createMonitoredItemsResult.forEach(function (responseValue, requestId) {
                                // set the item id for the created monitor item
                                monitoredItems_1[requestId].id = responseValue.monitoredItemId;
                            });
                            return [3 /*break*/, 4];
                        case 3:
                            error_3 = _a.sent();
                            console.error(error_3);
                            return [3 /*break*/, 4];
                        case 4:
                            console.log("MonitoringSubscription:createMonitoredItems: %o", this._monitoringItems);
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Creates the monitored subscription items
         *
         * @private
         * @param {MappCockpitComponentItem[]} componentItems
         * @returns
         * @memberof MonitoringSubscription
         */
        MonitoringSubscription.prototype.createMonitoredSubscriptionItems = function (componentItems) {
            return __awaiter(this, void 0, void 0, function () {
                var monitoredItems, requestId, i, componentItem, monitorItem;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            monitoredItems = [];
                            requestId = 0;
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < componentItems.length)) return [3 /*break*/, 5];
                            componentItem = componentItems[i];
                            monitorItem = this.addMonitoringItem(componentItem, opcUaRestServices_1.OpcUaAttribute.VALUE, requestId);
                            monitoredItems.push(monitorItem);
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.createMonitoredItem(this._sessionId, this._subscriptionId, componentItem.id, requestId, opcUaRestServices_1.OpcUaRestServices.monitoringSamplingInterval, opcUaRestServices_1.OpcUaAttribute.VALUE)];
                        case 2:
                            _a.sent();
                            requestId++;
                            // create the monotored item for the user access level
                            monitorItem = this.addMonitoringItem(componentItem, opcUaRestServices_1.OpcUaAttribute.USER_ACCESS_LEVEL, requestId);
                            monitoredItems.push(monitorItem);
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.createMonitoredItem(this._sessionId, this._subscriptionId, componentItem.id, requestId, opcUaRestServices_1.OpcUaRestServices.monitoringSamplingInterval, opcUaRestServices_1.OpcUaAttribute.USER_ACCESS_LEVEL)];
                        case 3:
                            _a.sent();
                            requestId++;
                            _a.label = 4;
                        case 4:
                            i++;
                            return [3 /*break*/, 1];
                        case 5: return [2 /*return*/, monitoredItems];
                    }
                });
            });
        };
        /**
         * Clears all monitored items for this subscription
         *
         * @memberof MonitoringSubscription
         */
        MonitoringSubscription.prototype.clearMonitoredItems = function () {
            return __awaiter(this, void 0, void 0, function () {
                var deleteMonitoredItemRequests, i, monitoreItem, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 6, , 7]);
                            if (!Object.keys(this._monitoringItems)) return [3 /*break*/, 5];
                            deleteMonitoredItemRequests = [];
                            // activate batching
                            opcUaRestServices_1.OpcUaRestServices.activateBatching();
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < Object.keys(this._monitoringItems).length)) return [3 /*break*/, 4];
                            monitoreItem = this._monitoringItems[i];
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.deleteMonitoredItem(this._sessionId, this._subscriptionId, monitoreItem.id)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4:
                            try {
                                // execute batch request
                                opcUaRestServices_1.OpcUaRestServices.executeBatchRequest();
                            }
                            catch (error) {
                                console.error(error);
                            }
                            _a.label = 5;
                        case 5: return [3 /*break*/, 7];
                        case 6:
                            error_4 = _a.sent();
                            throw error_4;
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * adds a new monitoring item.
         *
         * @private
         * @param {MappCockpitComponentItem} parameter
         * @param {OpcUaAttribute} monitoringAttribute
         * @param {number} clientId
         * @returns {MonitoringSubscriptionItem}
         * @memberof MonitoringSubscription
         */
        MonitoringSubscription.prototype.addMonitoringItem = function (parameter, monitoringAttribute, clientId) {
            var monitorItem = MonitoringSubscriptionItem.create(parameter, monitoringAttribute, clientId);
            this._monitoringItems[clientId] = monitorItem;
            return monitorItem;
        };
        /**
         * Removes a monitored item
         *
         * @private
         * @param {number} clientId
         * @memberof MonitoringSubscription
         */
        MonitoringSubscription.prototype.removeMonitoringItem = function (clientId) {
            delete this._monitoringItems[clientId];
        };
        /**
         * handles the processing of item changes
         *
         * @param {IOpcUaDataChanged} opcUaDataChangedInfo
         * @returns {*}
         * @memberof MonitoringSubscription
         */
        MonitoringSubscription.prototype.processItemChanges = function (opcUaDataChangedInfo) {
            var _this = this;
            var changedObservables = new Array();
            opcUaDataChangedInfo.DataNotifications.forEach(function (dataNotification) {
                // get the item to change
                var monitorItem = _this.getMonitoredItemById(dataNotification.clientHandle);
                if (monitorItem) {
                    // update the items value
                    monitorItem.changeValue(dataNotification.value);
                    // add it to the modified observables list
                    changedObservables.push(new observer_1.Observable(monitorItem.monitoringObject, monitorItem.monitoringProperty));
                }
                else {
                    throw new Error('MappCockpitDiagnosticMonitoringProvider.processOpcUaDataChanged: Could not find monitored item ' + JSON.stringify(dataNotification));
                }
            });
            this.onMonitorItemsChanged(this, changedObservables);
        };
        /**
         * notifies from updateing observed items
         *
         * @param {MonitoringSubscription} changedSubscription
         * @param {Observable[]} changedObservables
         * @returns {*}
         * @memberof MonitoringSubscription
         */
        MonitoringSubscription.prototype.onMonitorItemsChanged = function (changedSubscription, changedObservables) {
            var changedEventArgs = new EventObservedItemsChangedArgs(changedSubscription.observer, changedSubscription, changedObservables);
            this.eventObservedItemsChanged.raise(this, changedEventArgs);
            this.notifyObserverFromChanges(changedSubscription.observer, changedObservables);
        };
        /**
         * notifies the observer from changes if the observer implements the notification interface
         *
         * @private
         * @param {IObserver} observer
         * @param {Observables[]} changedObservables
         * @memberof MonitoringSubscription
         */
        MonitoringSubscription.prototype.notifyObserverFromChanges = function (observer, changedObservables) {
            if (observer.onObservablesChanged) {
                observer.onObservablesChanged(changedObservables);
            }
        };
        return MonitoringSubscription;
    }());
    /**
     * The class holds information about the subsripted item
     *
     * @class MonitoringSubscriptionItem
     */
    var MonitoringSubscriptionItem = /** @class */ (function () {
        /**
         * Creates an instance of MonitoringSubscriptionItem.
         * @param {*} monitoringObject
         * @param {string} monitoringProperty
         * @memberof MonitoringSubscriptionItem
         */
        function MonitoringSubscriptionItem(monitoringObject, monitoringProperty) {
            // holds the item instance
            this._monitorItemInstance = undefined;
            // holds the property name of the item to watch
            this._monitoringProperty = "";
            // holds the monitor item id
            this._id = "";
            this._monitorItemInstance = monitoringObject;
            this._monitoringProperty = monitoringProperty;
        }
        Object.defineProperty(MonitoringSubscriptionItem.prototype, "monitoringObject", {
            get: function () {
                return this._monitorItemInstance;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MonitoringSubscriptionItem.prototype, "monitoringProperty", {
            get: function () {
                return this._monitoringProperty;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MonitoringSubscriptionItem.prototype, "id", {
            get: function () {
                return this._id;
            },
            set: function (id) {
                this._id = id;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * creates and initializes a new monitoring item
         *
         * @static
         * @param {MappCockpitComponentItem} monitoringObject
         * @param {string} monitoringProperty
         * @param {number} clientId
         * @returns {MonitoringSubscriptionItem}
         * @memberof MonitoringSubscriptionItem
         */
        MonitoringSubscriptionItem.create = function (monitoringObject, monitoringProperty, clientId) {
            return new MonitoringSubscriptionItem(monitoringObject, monitoringProperty);
        };
        /**
         * Updates the specified item property with the new value
         *
         * @param {*} newMonitoredItemValue
         * @returns {*}
         * @memberof MonitoringSubscriptionItem
         */
        MonitoringSubscriptionItem.prototype.changeValue = function (newMonitoredItemValue) {
            switch (this.monitoringProperty) {
                case "Value":
                    // set object value
                    this.monitoringObject.value = newMonitoredItemValue;
                    break;
                case "UserAccessLevel":
                    // set writeable attribute according to the access level
                    var newWriteableState = (newMonitoredItemValue & opcUaRestServices_1.OpcUaAccessLevel.CurrentWrite) == opcUaRestServices_1.OpcUaAccessLevel.CurrentWrite;
                    this.monitoringObject.isWriteable.value = newWriteableState;
                    console.log("MonitoringSubscriptionItem - updated writeable %o %o", this.monitoringObject.browseName + ".isWriteable = ", this.monitoringObject.isWriteable);
                    break;
                default:
                    break;
            }
        };
        return MonitoringSubscriptionItem;
    }());
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXREaWFnbm9zdGljTW9uaXRvcmluZ1Byb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvZGlhZ25vc3RpY3MvbWFwcENvY2twaXREaWFnbm9zdGljTW9uaXRvcmluZ1Byb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFTQTtRQUF3Qyw2Q0FBa0Y7UUFBMUg7O1FBQTRILENBQUM7UUFBRCxnQ0FBQztJQUFELENBQUMsQUFBN0gsQ0FBd0MsbUJBQVUsR0FBMkU7SUFBQSxDQUFDO0lBQzlIO1FBQW9ELHlEQUFpRTtRQUFySDs7UUFBdUgsQ0FBQztRQUFELDRDQUFDO0lBQUQsQ0FBQyxBQUF4SCxDQUFvRCxtQkFBVSxHQUEwRDtJQUFBLENBQUM7SUFFekg7UUFRSSx1Q0FBWSxRQUFhLEVBQUUsWUFBb0MsRUFBRSxZQUFnQjtZQUM3RSxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztZQUMxQixJQUFJLENBQUMsdUJBQXVCLEdBQUcsWUFBWSxDQUFDO1lBQzVDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxZQUFZLENBQUM7UUFDL0MsQ0FBQztRQUVELHNCQUFXLG1EQUFRO2lCQUFuQjtnQkFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUE7WUFDekIsQ0FBQzs7O1dBQUE7UUFFRCxzQkFBVyx1REFBWTtpQkFBdkI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsdUJBQXVCLENBQUE7WUFDdkMsQ0FBQzs7O1dBQUE7UUFFRCxzQkFBVyx1REFBWTtpQkFBdkI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUE7WUFDdEMsQ0FBQzs7O1dBQUE7UUFDTCxvQ0FBQztJQUFELENBQUMsQUF6QkQsSUF5QkM7SUE0bEJpRCxzRUFBNkI7SUE1bEI5RSxDQUFDO0lBRUY7Ozs7T0FJ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QTtRQU1EOzs7Ozs7Ozs7V0FTRztRQUNJLGlDQUFNLEdBQWIsVUFBYyxnQkFBMEMsRUFBRSxrQkFBMEIsRUFBRSxRQUFlO1lBQ2pHLE9BQU8sSUFBSSwwQkFBMEIsQ0FBQyxnQkFBZ0IsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2hGLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSCxnREFBVyxHQUFYLFVBQVkscUJBQTBCO1lBQ2xDLFFBQVEsSUFBSSxDQUFDLGtCQUFrQixFQUFFO2dCQUM3QixLQUFLLE9BQU87b0JBQ1IsbUJBQW1CO29CQUNuQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxHQUFHLHFCQUFxQixDQUFDO29CQUNwRCxNQUFNO2dCQUNWLEtBQUssaUJBQWlCO29CQUNsQix3REFBd0Q7b0JBQ3hELElBQUksaUJBQWlCLEdBQUcsQ0FBQyxxQkFBcUIsR0FBRyxvQ0FBZ0IsQ0FBQyxZQUFZLENBQUMsSUFBSSxvQ0FBZ0IsQ0FBQyxZQUFZLENBQUM7b0JBQ2pILElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsS0FBSyxHQUFHLGlCQUFpQixDQUFDO29CQUM1RCxPQUFPLENBQUMsR0FBRyxDQUFDLHNEQUFzRCxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEdBQUcsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUM3SixNQUFNO2dCQUNWO29CQUNJLE1BQU07YUFDYjtRQUNMLENBQUM7UUFDTCxpQ0FBQztJQUFELENBQUMsQUF6RUQsSUF5RUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlciB9IGZyb20gXCIuL21hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXCI7XHJcbmltcG9ydCB7IE9wY1VhV2ViU29ja2V0LCBPcGNVYVdlYlNvY2tldEV2ZW50QXJncywgU29ja2VFdmVudFR5cGUsIElPcGNVYURhdGFDaGFuZ2VkIH0gZnJvbSAnLi4vLi4vY29tbXVuaWNhdGlvbi9yZXN0L29wY1VhV2ViU29ja2V0JztcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRJdGVtIH0gZnJvbSBcIi4uL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBPcGNVYVJlc3RTZXJ2aWNlcywgT3BjVWFBdHRyaWJ1dGUsIE9wY1VhQWNjZXNzTGV2ZWwgfSBmcm9tIFwiLi4vLi4vY29tbXVuaWNhdGlvbi9yZXN0L29wY1VhUmVzdFNlcnZpY2VzXCI7XHJcbmltcG9ydCB7IFR5cGVkRXZlbnQgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2V2ZW50c1wiO1xyXG5pbXBvcnQgeyBJT2JzZXJ2ZXIsIE9ic2VydmFibGUgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2ludGVyZmFjZXMvb2JzZXJ2ZXJcIjtcclxuaW1wb3J0IHsgSU9wY1VhQ3JlYXRlZE1vbml0b3JlZEl0ZW1SZXN1bHQgfSBmcm9tIFwiLi4vLi4vY29tbXVuaWNhdGlvbi9yZXN0L29wY1VhUmVzdFJlc3VsdFR5cGVzXCI7XHJcblxyXG5cclxuY2xhc3MgRXZlbnRPYnNlcnZlZEl0ZW1zQ2hhbmdlZCBleHRlbmRzIFR5cGVkRXZlbnQ8TWFwcENvY2twaXREaWFnbm9zdGljTW9uaXRvcmluZ1Byb3ZpZGVyLCBFdmVudE9ic2VydmVkSXRlbXNDaGFuZ2VkQXJncz57IH07XHJcbmNsYXNzIEV2ZW50T2JzZXJ2ZWRTdWJzY3JpcHRpb25JdGVtc0NoYW5nZWQgZXh0ZW5kcyBUeXBlZEV2ZW50PE1vbml0b3JpbmdTdWJzY3JpcHRpb24sIEV2ZW50T2JzZXJ2ZWRJdGVtc0NoYW5nZWRBcmdzPnsgfTtcclxuXHJcbmNsYXNzIEV2ZW50T2JzZXJ2ZWRJdGVtc0NoYW5nZWRBcmdzIHtcclxuXHJcblxyXG5cclxuICAgIHByaXZhdGUgX29ic2VydmVyOiBhbnk7XHJcbiAgICBwcml2YXRlIF9tb25pdG9yaW5nU3Vic2NyaXB0aW9uOiBNb25pdG9yaW5nU3Vic2NyaXB0aW9uO1xyXG4gICAgcHJpdmF0ZSBfY2hhbmdlZE1vbml0b3JlZEl0ZW1zO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG9ic2VydmVyOiBhbnksIHN1YnNjcmlwdGlvbjogTW9uaXRvcmluZ1N1YnNjcmlwdGlvbiwgY2hhbmdlZEl0ZW1zOiBbXSkge1xyXG4gICAgICAgIHRoaXMuX29ic2VydmVyID0gb2JzZXJ2ZXI7XHJcbiAgICAgICAgdGhpcy5fbW9uaXRvcmluZ1N1YnNjcmlwdGlvbiA9IHN1YnNjcmlwdGlvbjtcclxuICAgICAgICB0aGlzLl9jaGFuZ2VkTW9uaXRvcmVkSXRlbXMgPSBjaGFuZ2VkSXRlbXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBvYnNlcnZlcigpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9vYnNlcnZlclxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc3Vic2NyaXB0aW9uKCk6IE1vbml0b3JpbmdTdWJzY3JpcHRpb24ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tb25pdG9yaW5nU3Vic2NyaXB0aW9uXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjaGFuZ2VkSXRlbXMoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2hhbmdlZE1vbml0b3JlZEl0ZW1zXHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyBvYnNlcnZhdGlvbiBhbmQgbW9uaXRvcmluZyBvZiBkaWFnbm9zdGljIGVsZW1lbnRzXHJcbiAqXHJcbiAqIEBjbGFzcyBNYXBwQ29ja3BpdERpYWdub3N0aWNNb25pdG9yaW5nUHJvdmlkZXJcclxuICovXHJcbmNsYXNzIE1hcHBDb2NrcGl0RGlhZ25vc3RpY01vbml0b3JpbmdQcm92aWRlciB7XHJcblxyXG4gICAgLy8gaG9sZHMgYSByZWZlcmVuY2UgdG8gdGhlIGRpYWdub3N0aWMgcHJvdmlkZXJcclxuICAgIHByaXZhdGUgX2RpYWdub3N0aWNQcm92aWRlcjogTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXI7XHJcblxyXG4gICAgLy8gaG9sZHMgc3Vic2NyaXB0aW9uc1xyXG4gICAgcHJpdmF0ZSBfbW9uaXRvcmluZ1N1YnNjcmlwdGlvbnM6IE1vbml0b3JpbmdTdWJzY3JpcHRpb25Db2xsZWN0aW9uO1xyXG5cclxuICAgIC8vIGhvbGRzIGEgd2ViIHNvY2tldCBpbnN0YW5jZVxyXG4gICAgcHJpdmF0ZSBfb3BjVWFXZWJTb2NrZXQhOiBPcGNVYVdlYlNvY2tldDtcclxuXHJcbiAgICAvLyBkZWNsYXJlcyB0aGUgb2JzZXJ2ZWFibGUgY2hhbmdlZCBldmVudFxyXG4gICAgcHVibGljIGV2ZW50T2JzZXJ2ZWRJdGVtc0NoYW5nZWQ6IEV2ZW50T2JzZXJ2ZWRJdGVtc0NoYW5nZWQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfb3BjVWFXZWJTb2NrZXRIYW5kbGVyID0gKHNlbmRlciwgZXZlbnRBcmdzKSA9PiB7IHRoaXMuaGFuZGxlT3BjVWFFdmVudChldmVudEFyZ3MpOyB9O1xyXG5cclxuICAgIHByaXZhdGUgX29ic2VydmVkSXRlbXNDaGFuZ2VkSGFuZGxlciA9IChzZW5kZXIsIGV2ZW50QXJncykgPT4geyB0aGlzLmV2ZW50T2JzZXJ2ZWRJdGVtc0NoYW5nZWQucmFpc2UodGhpcywgZXZlbnRBcmdzKTsgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNNb25pdG9yaW5nUHJvdmlkZXIuXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyfSBkaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNNb25pdG9yaW5nUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZGlhZ25vc3RpY1Byb3ZpZGVyOiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlcikge1xyXG4gICAgICAgIHRoaXMuX2RpYWdub3N0aWNQcm92aWRlciA9IGRpYWdub3N0aWNQcm92aWRlcjtcclxuICAgICAgICB0aGlzLl9tb25pdG9yaW5nU3Vic2NyaXB0aW9ucyA9IG5ldyBNb25pdG9yaW5nU3Vic2NyaXB0aW9uQ29sbGVjdGlvbigpO1xyXG5cclxuICAgICAgICB0aGlzLmV2ZW50T2JzZXJ2ZWRJdGVtc0NoYW5nZWQgPSBuZXcgRXZlbnRPYnNlcnZlZEl0ZW1zQ2hhbmdlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlcyBhIGNvbm5lY3Rpb24gZm9yIGxpc3RlbmluZyB0byBldmVudHMgZnJvbSBvcGMtdWFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY01vbml0b3JpbmdQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBhc3luYyBjcmVhdGVPcGNVYVNvY2tldCgpIHtcclxuICAgICAgICB0aGlzLl9vcGNVYVdlYlNvY2tldCA9IE9wY1VhV2ViU29ja2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgIHRoaXMuX29wY1VhV2ViU29ja2V0LmV2ZW50T3BjVWFXZWJTb2NrZXQuYXR0YWNoKHRoaXMuX29wY1VhV2ViU29ja2V0SGFuZGxlcik7XHJcblxyXG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9vcGNVYVdlYlNvY2tldC5jb25uZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBhY3RpdmF0ZXMgb2JzZXJ2aW5nIHBhcmFtZXRlciBjaGFuZ2VzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gb2JzZXJ2ZXJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZXNzaW9uSWRcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRJdGVtW119IGNvbXBvbmVudFBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY01vbml0b3JpbmdQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBhc3luYyBvYnNlcnZlQ29tcG9uZW50TW9kZWxJdGVtcyhvYnNlcnZlcjogYW55LCBzZXNzaW9uSWQ6IG51bWJlciwgY29tcG9uZW50UGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRJdGVtW10pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBnZXQgdGhlIHN1YnNjcmlwdGlvbiBmb3IgdGhlIG9ic2VydmVyIG9yIGNyZWF0ZSBhIG5ldyBvbmVcclxuICAgICAgICAgICAgbGV0IHN1YnNjcmlwdGlvbiA9IHRoaXMuZmluZFN1YnNjcmlwdGlvbkZvck9ic2VydmVyKG9ic2VydmVyLCBzZXNzaW9uSWQpICE9IG51bGwgPyB0aGlzLmZpbmRTdWJzY3JpcHRpb25Gb3JPYnNlcnZlcihvYnNlcnZlciwgc2Vzc2lvbklkKSA6IGF3YWl0IE1vbml0b3JpbmdTdWJzY3JpcHRpb24uY3JlYXRlKG9ic2VydmVyLCBzZXNzaW9uSWQpO1xyXG4gICAgICAgICAgICBpZiAoc3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBhdHRhY2ggaXRlbXMgY2hhbmdlZCBldmVudCBhbmQgZm9yd2FyZCBpdCB0aHJvdWdoIHRoZSBwcm92aWRlclxyXG4gICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uLmV2ZW50T2JzZXJ2ZWRJdGVtc0NoYW5nZWQuYXR0YWNoKHRoaXMuX29ic2VydmVkSXRlbXNDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIG5ldyBzdWJzY3JpcHRpb24gdG8gdGhlIHN1YnNjcmlwdGlvbiBjb2xsZWN0aW9uXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tb25pdG9yaW5nU3Vic2NyaXB0aW9ucy5hZGQoc3Vic2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgaXRlbXMgdG8gbW9uaXRvclxyXG4gICAgICAgICAgICAgICAgYXdhaXQgc3Vic2NyaXB0aW9uLmNyZWF0ZU1vbml0b3JlZEl0ZW1zKGNvbXBvbmVudFBhcmFtZXRlcnMpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTWFwcENvY2twaXREaWFnbm9zdGljTW9uaXRvcmluZ1Byb3ZpZGVyOmNyZWF0ZWQgc3Vic2NyaXB0aW9uOiAlbyAlbyAlb1wiLG9ic2VydmVyLCBzdWJzY3JpcHRpb24uaWQsIHRoaXMuX21vbml0b3JpbmdTdWJzY3JpcHRpb25zKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBzdWJzY3JpcHRpb24gZm9yIHRoZSBvYnNlcnZlci5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBvYnNlcnZlclxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNNb25pdG9yaW5nUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBmaW5kU3Vic2NyaXB0aW9uRm9yT2JzZXJ2ZXIob2JzZXJ2ZXI6IGFueSwgc2Vzc2lvbklkOiBudW1iZXIpOiBNb25pdG9yaW5nU3Vic2NyaXB0aW9ufG51bGwge1xyXG4gICAgICAgIC8vIGZpbmQgYSBzdWJzY3JpcHRpb24gZm9yIHRoaXMgb2JzZXJ2ZXIuXHJcbiAgICAgICAgbGV0IGV4aXN0aW5nU3Vic2NyaXB0aW9uID0gIHRoaXMuX21vbml0b3JpbmdTdWJzY3JpcHRpb25zLml0ZW1zLmZpbHRlcigoc3Vic2NyaXB0aW9uKT0+eyByZXR1cm4gc3Vic2NyaXB0aW9uLm9ic2VydmVyID09IG9ic2VydmVyfSk7XHJcbiAgICAgICAgLy8gY2hlY2sgaWYgYSBzdWJzY3JpcHRpb24gZm9yIHRoaXMgb2JzZXJ2ZXIgYWxyZWFkeSBleGlzdHMuXHJcbiAgICAgICAgaWYgKGV4aXN0aW5nU3Vic2NyaXB0aW9uLmxlbmd0aCA+PSAxKSB7XHJcbiAgICAgICAgICAgIC8vIHJldHVybiB0aGUgZXhpc3Rpbmcgc3Vic2NyaXB0aW9uIC4uLlxyXG4gICAgICAgICAgIHJldHVybiBleGlzdGluZ1N1YnNjcmlwdGlvblswXTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVW5vYnNlcnZlcyB0aGUgcGFzc2VkIGl0ZW1zLiBcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IG9ic2VydmVyXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vzc2lvbklkXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50SXRlbVtdfSBvYnNlcnZlZEl0ZW1zXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHN1c3BlbmRcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNNb25pdG9yaW5nUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgYXN5bmMgdW5vYnNlcnZlQ29tcG9uZW50TW9kZWxJdGVtcyhvYnNlcnZlcjogYW55LCBzZXNzaW9uSWQ6IG51bWJlciwgb2JzZXJ2ZWRJdGVtczogTWFwcENvY2twaXRDb21wb25lbnRJdGVtW10sIHN1c3BlbmQ6Ym9vbGVhbikge1xyXG4gICAgICAgIGxldCBzdWJzY3JpcHRpb24gPSB0aGlzLmZpbmRTdWJzY3JpcHRpb25Gb3JPYnNlcnZlcihvYnNlcnZlciwgc2Vzc2lvbklkKTtcclxuICAgICAgICBpZiAoc3Vic2NyaXB0aW9uKXtcclxuICAgICAgICAgICAgc3Vic2NyaXB0aW9uLmV2ZW50T2JzZXJ2ZWRJdGVtc0NoYW5nZWQuZGV0YWNoKHRoaXMuX29ic2VydmVkSXRlbXNDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgICAgIGxldCBkZWxldGVkU3Vic2NyaXB0aW9uSWQgPSBhd2FpdCB0aGlzLmRlbGV0ZVN1YnNjcmlwdGlvbihzZXNzaW9uSWQsc3Vic2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJNYXBwQ29ja3BpdERpYWdub3N0aWNNb25pdG9yaW5nUHJvdmlkZXIudW5vYnNlcnZlQ29tcG9uZW50TW9kZWxJdGVtcyAtIG9ic2VydmVyOiVvIDppdGVtcyAlbywgc3Vic2NyaXB0aW9uSWQ6JW9cIixzdWJzY3JpcHRpb24ub2JzZXJ2ZXIsb2JzZXJ2ZWRJdGVtcyxkZWxldGVkU3Vic2NyaXB0aW9uSWQgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxldGVzIGEgc3Vic2NyaXB0aW9uIHdpdGggaXRzIG1vbml0b3JlZCBpdGVtcy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZFxyXG4gICAgICogQHBhcmFtIHtNb25pdG9yaW5nU3Vic2NyaXB0aW9ufSBzdWJzY3JpcHRpb25cclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPG51bWJlcj59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljTW9uaXRvcmluZ1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgZGVsZXRlU3Vic2NyaXB0aW9uKHNlc3Npb25JZDogbnVtYmVyLCBzdWJzY3JpcHRpb246IE1vbml0b3JpbmdTdWJzY3JpcHRpb24pOiBQcm9taXNlPG51bWJlcj4ge1xyXG4gICAgICAgIGxldCBkZWxldGVkU3Vic2NyaXB0aW9uSWQgPSAtMTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBkZWxldGUgdGhlIHN1YnNjcmlwdGlvbiBvbiB0aGUgdGFyZ2V0XHJcbiAgICAgICAgICAgIGRlbGV0ZWRTdWJzY3JpcHRpb25JZCA9IGF3YWl0IE1vbml0b3JpbmdTdWJzY3JpcHRpb24uZGVsZXRlKHNlc3Npb25JZCwgc3Vic2NyaXB0aW9uLmlkKTtcclxuICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSBzdWJzY3JpcHRpb24gaW5zdGFuY2UgZnJvbSB0aGUgbGlzdFxyXG4gICAgICAgICAgICB0aGlzLl9tb25pdG9yaW5nU3Vic2NyaXB0aW9ucy5yZW1vdmUoc3Vic2NyaXB0aW9uKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRlbGV0ZWRTdWJzY3JpcHRpb25JZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGhhbmRsZXMgb3BjLXVhIGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T3BjVWFXZWJTb2NrZXRFdmVudEFyZ3N9IGV2ZW50QXJnc1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljTW9uaXRvcmluZ1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGhhbmRsZU9wY1VhRXZlbnQoZXZlbnRBcmdzOiBPcGNVYVdlYlNvY2tldEV2ZW50QXJncyk6IHZvaWQge1xyXG4gICAgICAgIHN3aXRjaCAoZXZlbnRBcmdzLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBTb2NrZUV2ZW50VHlwZS5NRVNTQUdFOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzT3BjVWFEYXRhQ2hhbmdlZChldmVudEFyZ3MuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWNlaXZlcyB0aGUgZGF0YSBjaGFuZ2VkIGFuZCBkaXN0cmlidXRlcyBpdCB0byBjb25zdW1lcnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJT3BjVWFEYXRhQ2hhbmdlZH0gb3BjVWFEYXRhQ2hhbmdlZEluZm9cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNNb25pdG9yaW5nUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBwcm9jZXNzT3BjVWFEYXRhQ2hhbmdlZChvcGNVYURhdGFDaGFuZ2VkSW5mbzogSU9wY1VhRGF0YUNoYW5nZWQpIHtcclxuXHJcbiAgICAgICAgbGV0IG1vZGlmaWVkU3Vic2NyaXB0aW9uID0gdGhpcy5fbW9uaXRvcmluZ1N1YnNjcmlwdGlvbnMuZmluZEJ5SWQob3BjVWFEYXRhQ2hhbmdlZEluZm8uc3Vic2NyaXB0aW9uSWQpO1xyXG5cclxuICAgICAgICBpZiAobW9kaWZpZWRTdWJzY3JpcHRpb24pIHtcclxuICAgICAgICAgICAgbW9kaWZpZWRTdWJzY3JpcHRpb24ucHJvY2Vzc0l0ZW1DaGFuZ2VzKG9wY1VhRGF0YUNoYW5nZWRJbmZvKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjbG9zZXMgdGhlIG1vbml0b3JpbmcgcHJvdmlkZXIgYW5kIGFsbCBpdHMgY29ubmVjdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNNb25pdG9yaW5nUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgY2xvc2UoKTogYW55IHtcclxuICAgICAgICBpZiAodGhpcy5fb3BjVWFXZWJTb2NrZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5fb3BjVWFXZWJTb2NrZXQuZXZlbnRPcGNVYVdlYlNvY2tldC5kZXRhY2godGhpcy5fb3BjVWFXZWJTb2NrZXRIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5fb3BjVWFXZWJTb2NrZXQuY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiB0aGUgY2xhc3MgaG9sZHMgYW5kIG1hbmFnZXMgc3Vic2NyaXB0aW9ucy5cclxuICpcclxuICogQGNsYXNzIE1vbml0b3JpbmdTdWJzY3JpcHRpb25TZXRcclxuICovXHJcbmNsYXNzIE1vbml0b3JpbmdTdWJzY3JpcHRpb25Db2xsZWN0aW9uIHtcclxuXHJcbiAgICAvLyBob2xkcyB0aGUgc3Vic2NyaXB0aW9uc1xyXG4gICAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9ucztcclxuXHJcbiAgICAvKipcclxuICAgICAqQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBNb25pdG9yaW5nU3Vic2NyaXB0aW9uQ29sbGVjdGlvbi5cclxuICAgICAqIEBtZW1iZXJvZiBNb25pdG9yaW5nU3Vic2NyaXB0aW9uQ29sbGVjdGlvblxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAvLyB0aGUgc3Vic2NyaXB0aW9uIGluc3RhbmNlcyBhcmUgc3RvcmVkIHdpdGggaWQgYXMga2V5IG9uIGEgc2ltcGxlIG9iamVjdFxyXG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGFkZHMgYSBuZXcgc3ViY3JpcHRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01vbml0b3JpbmdTdWJzY3JpcHRpb259IHN1YnNjcmlwdGlvblxyXG4gICAgICogQG1lbWJlcm9mIE1vbml0b3JpbmdTdWJzY3JpcHRpb25Db2xsZWN0aW9uXHJcbiAgICAgKi9cclxuICAgIGFkZChzdWJzY3JpcHRpb246IE1vbml0b3JpbmdTdWJzY3JpcHRpb24pIHtcclxuICAgICAgICAvLyBzdG9yZSB0aGUgc3Vic2NyaXB0aW9uIGJ5IGlkXHJcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uc1tzdWJzY3JpcHRpb24uaWRdID0gc3Vic2NyaXB0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVtb3ZlcyB0aGUgZ2l2ZW4gc3Vic2NyaXB0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNb25pdG9yaW5nU3Vic2NyaXB0aW9ufSBzdWJzY3JpcHRpb25cclxuICAgICAqIEBtZW1iZXJvZiBNb25pdG9yaW5nU3Vic2NyaXB0aW9uQ29sbGVjdGlvblxyXG4gICAgICovXHJcbiAgICByZW1vdmUoc3Vic2NyaXB0aW9uOiBNb25pdG9yaW5nU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuX3N1YnNjcmlwdGlvbnNbc3Vic2NyaXB0aW9uLmlkXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHVybnMgdGhlIHN1YnNjcmlwdGlvbiB3aXRoIHRoZSByZXF1ZXN0ZWQgaWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3Vic2NyaXB0aW9uSWRcclxuICAgICAqIEBtZW1iZXJvZiBNb25pdG9yaW5nU3Vic2NyaXB0aW9uQ29sbGVjdGlvblxyXG4gICAgICovXHJcbiAgICBmaW5kQnlJZChzdWJzY3JpcHRpb25JZDogbnVtYmVyKTogTW9uaXRvcmluZ1N1YnNjcmlwdGlvbiB7XHJcbiAgICAgICAgLy8gcmV0cmlldmUgdGhlIGF2YWlsYWJsZSBzdWJzY3JpcHRpb25cclxuICAgICAgICBsZXQgc3Vic2NyaXB0aW9uOiBNb25pdG9yaW5nU3Vic2NyaXB0aW9uID0gdGhpcy5fc3Vic2NyaXB0aW9uc1tzdWJzY3JpcHRpb25JZF07XHJcbiAgICAgICAgcmV0dXJuIHN1YnNjcmlwdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgdGhlIGF2YWlsYWJsZSBzdWJzY3JpcHRpb25zXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7QXJyYXk8TW9uaXRvcmluZ1N1YnNjcmlwdGlvbj59XHJcbiAgICAgKiBAbWVtYmVyb2YgTW9uaXRvcmluZ1N1YnNjcmlwdGlvbkNvbGxlY3Rpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBpdGVtcygpOiBBcnJheTxNb25pdG9yaW5nU3Vic2NyaXB0aW9uPiB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX3N1YnNjcmlwdGlvbnMpLm1hcCgoa2V5KSA9PiB7IHJldHVybiB0aGlzLl9zdWJzY3JpcHRpb25zW2tleV0gfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRzIG1hbmFnaW5nIGEgc2V0IG9mIG1vbml0b3JpbmcgaXRlbXMgaW4gYSBzdWJzY3JpcHRpb25cclxuICpcclxuICogQGNsYXNzIE1vbml0b3JpbmdTdWJzY3JpcHRpb25cclxuICovXHJcbmNsYXNzIE1vbml0b3JpbmdTdWJzY3JpcHRpb24ge1xyXG5cclxuICAgIC8vIGhvbGRzIHRoZSBzdWJzY3JpcHRpb24gaWRcclxuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbklkID0gLTE7XHJcbiAgICAvLyBob2xkcyB0aGUgc2Vzc2lvbiBpZFxyXG4gICAgcHJpdmF0ZSBfc2Vzc2lvbklkOiBhbnk7XHJcbiAgICAvLyBob2xkcyBhIGNvbGxlY3Rpb24gb2YgaXRlbXMgdG8gYmUgbW9uaXRvcmVkXHJcbiAgICBwcml2YXRlIF9tb25pdG9yaW5nSXRlbXM6YW55ID0ge307XHJcbiAgICAvLyBob2xkcyBhIHJlZmVyZW5jZSB0byB0aGUgb2JzZXJ2ZXIgaW50ZXJyZXN0ZWQgaW4gc3Vic2NyaXB0aW9uIGFuZCBpdGVtIGNoYW5nZXNcclxuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbk9ic2VydmVyOiBhbnk7XHJcbiAgICAvLyBkZWNsYXJlcyB0aGUgb2JzZXJ2ZWFibGUgY2hhbmdlZCBldmVudFxyXG4gICAgcHVibGljIGV2ZW50T2JzZXJ2ZWRJdGVtc0NoYW5nZWQ6IEV2ZW50T2JzZXJ2ZWRTdWJzY3JpcHRpb25JdGVtc0NoYW5nZWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIE1vbml0b3JpbmdTdWJzY3JpcHRpb24uXHJcbiAgICAgKiBAcGFyYW0geyp9IG9ic2VydmVyXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlc3Npb25JZFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHN1YnNjcmlwdGlvbklkXHJcbiAgICAgKiBAbWVtYmVyb2YgTW9uaXRvcmluZ1N1YnNjcmlwdGlvblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKG9ic2VydmVyOiBhbnksIHNlc3Npb25JZCwgc3Vic2NyaXB0aW9uSWQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbk9ic2VydmVyID0gb2JzZXJ2ZXI7XHJcbiAgICAgICAgdGhpcy5fc2Vzc2lvbklkID0gc2Vzc2lvbklkO1xyXG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbklkID0gc3Vic2NyaXB0aW9uSWQ7XHJcbiAgICAgICAgdGhpcy5fbW9uaXRvcmluZ0l0ZW1zID0ge307XHJcblxyXG4gICAgICAgIHRoaXMuZXZlbnRPYnNlcnZlZEl0ZW1zQ2hhbmdlZCA9IG5ldyBFdmVudE9ic2VydmVkU3Vic2NyaXB0aW9uSXRlbXNDaGFuZ2VkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXR1cm5zIHRoZSBzdWJzY3JpcHRpb24gaWRcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBNb25pdG9yaW5nU3Vic2NyaXB0aW9uXHJcbiAgICAgKi9cclxuICAgIGdldCBpZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3Vic2NyaXB0aW9uSWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXR1cm5zIHRoZSBvYnNlcnZlciBpbnRlcnJlc3RlZCBpbiBjaGFuZ2Ugbm90aWZpY2F0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTW9uaXRvcmluZ1N1YnNjcmlwdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IG9ic2VydmVyKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N1YnNjcmlwdGlvbk9ic2VydmVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmV0dXJucyB0aGUgbW9uaXRvcmVkIGl0ZW0gd2l0aCB0aGUgc3BlY2VmaWVkIGlkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBjbGllbnRJZFxyXG4gICAgICogQHJldHVybnMge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyfVxyXG4gICAgICogQG1lbWJlcm9mIE1vbml0b3JpbmdTdWJzY3JpcHRpb25cclxuICAgICAqL1xyXG4gICAgZ2V0TW9uaXRvcmVkSXRlbUJ5SWQoY2xpZW50SWQpOiBNb25pdG9yaW5nU3Vic2NyaXB0aW9uSXRlbSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21vbml0b3JpbmdJdGVtc1tjbGllbnRJZF07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGVzIGEgbmV3IG1vbml0b3Jpbmcgc3Vic2NyaXB0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7Kn0gb2JzZXJ2ZXJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZXNzaW9uSWRcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPE1vbml0b3JpbmdTdWJzY3JpcHRpb24+fVxyXG4gICAgICogQG1lbWJlcm9mIE1vbml0b3JpbmdTdWJzY3JpcHRpb25cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIGNyZWF0ZShvYnNlcnZlcjogYW55LCBzZXNzaW9uSWQ6IG51bWJlcik6IFByb21pc2U8TW9uaXRvcmluZ1N1YnNjcmlwdGlvbj4ge1xyXG4gICAgICAgIGxldCBzdWJzY3JpcHRpb25JZCA9IGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLmNyZWF0ZVN1YnNjcmlwdGlvbihzZXNzaW9uSWQpO1xyXG4gICAgICAgIHJldHVybiBuZXcgTW9uaXRvcmluZ1N1YnNjcmlwdGlvbihvYnNlcnZlciwgc2Vzc2lvbklkLCBzdWJzY3JpcHRpb25JZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxldGVzIHRoZSBzcGVjaWZpZWQgc3Vic2NyaXB0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHN1YnNjcmlwdGlvbklkXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxudW1iZXI+fVxyXG4gICAgICogQG1lbWJlcm9mIE1vbml0b3JpbmdTdWJzY3JpcHRpb25cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIGRlbGV0ZShzZXNzaW9uSWQ6IG51bWJlciwgc3Vic2NyaXB0aW9uSWQ6IG51bWJlcik6IFByb21pc2U8bnVtYmVyPiB7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLmRlbGV0ZVN1YnNjcmlwdGlvbihzZXNzaW9uSWQsIHN1YnNjcmlwdGlvbklkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZXMgYSBzZXQgb2YgaXRlbXMgdG8gYmUgbW9uaXRvcmVkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBjb21wb25lbnRQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxyXG4gICAgICogQG1lbWJlcm9mIE1vbml0b3JpbmdTdWJzY3JpcHRpb25cclxuICAgICAqL1xyXG4gICAgYXN5bmMgY3JlYXRlTW9uaXRvcmVkSXRlbXMoY29tcG9uZW50UGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRJdGVtW10pOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBhY3RpdmFlIGJhdGNoaW5nXHJcbiAgICAgICAgICAgIE9wY1VhUmVzdFNlcnZpY2VzLmFjdGl2YXRlQmF0Y2hpbmcoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgaXRlbXMgdG8gbW9uaXRvclxyXG4gICAgICAgICAgICBsZXQgbW9uaXRvcmVkSXRlbXM6IE1vbml0b3JpbmdTdWJzY3JpcHRpb25JdGVtW10gPSBhd2FpdCB0aGlzLmNyZWF0ZU1vbml0b3JlZFN1YnNjcmlwdGlvbkl0ZW1zKGNvbXBvbmVudFBhcmFtZXRlcnMpO1xyXG5cclxuICAgICAgICAgICAgLy8gZXhlY3V0ZSBiYXRjaCByZXF1ZXN0XHJcbiAgICAgICAgICAgIGxldCBjcmVhdGVNb25pdG9yZWRJdGVtc1Jlc3VsdDpNYXA8c3RyaW5nLElPcGNVYUNyZWF0ZWRNb25pdG9yZWRJdGVtUmVzdWx0PiA9IGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLmV4ZWN1dGVCYXRjaFJlcXVlc3QoKTtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyBwcm9jZXNzIHRoZSBiYXRjaCByZXF1ZXN0IHJlc3VsdCBieSBhc3NpZ25pbmcgIG1vbml0b3JlZCBpdGVtIGlkcyAuLlxyXG4gICAgICAgICAgICBjcmVhdGVNb25pdG9yZWRJdGVtc1Jlc3VsdC5mb3JFYWNoKChyZXNwb25zZVZhbHVlLCByZXF1ZXN0SWQpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIHNldCB0aGUgaXRlbSBpZCBmb3IgdGhlIGNyZWF0ZWQgbW9uaXRvciBpdGVtXHJcbiAgICAgICAgICAgICAgICBtb25pdG9yZWRJdGVtc1tyZXF1ZXN0SWRdLmlkID0gcmVzcG9uc2VWYWx1ZS5tb25pdG9yZWRJdGVtSWQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTW9uaXRvcmluZ1N1YnNjcmlwdGlvbjpjcmVhdGVNb25pdG9yZWRJdGVtczogJW9cIiwgdGhpcy5fbW9uaXRvcmluZ0l0ZW1zKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgbW9uaXRvcmVkIHN1YnNjcmlwdGlvbiBpdGVtc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50SXRlbVtdfSBjb21wb25lbnRJdGVtc1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBNb25pdG9yaW5nU3Vic2NyaXB0aW9uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgY3JlYXRlTW9uaXRvcmVkU3Vic2NyaXB0aW9uSXRlbXMoY29tcG9uZW50SXRlbXM6IE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbVtdKSA6IFByb21pc2U8TW9uaXRvcmluZ1N1YnNjcmlwdGlvbkl0ZW1bXT57XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IG1vbml0b3JlZEl0ZW1zOiBNb25pdG9yaW5nU3Vic2NyaXB0aW9uSXRlbVtdID0gW107XHJcbiAgICAgICAgbGV0IHJlcXVlc3RJZDogbnVtYmVyID0gMDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb21wb25lbnRJdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50SXRlbSA9IGNvbXBvbmVudEl0ZW1zW2ldO1xyXG5cclxuICAgICAgICAgICAgLy8gY3JlYXRlIHRoZSBtb25vdG9yZWQgaXRlbSBmb3IgdGhlIHZhbHVlc1xyXG4gICAgICAgICAgICBsZXQgbW9uaXRvckl0ZW0gPSB0aGlzLmFkZE1vbml0b3JpbmdJdGVtKGNvbXBvbmVudEl0ZW0sIE9wY1VhQXR0cmlidXRlLlZBTFVFLCByZXF1ZXN0SWQpO1xyXG4gICAgICAgICAgICBtb25pdG9yZWRJdGVtcy5wdXNoKG1vbml0b3JJdGVtKTtcclxuICAgICAgICAgICAgYXdhaXQgT3BjVWFSZXN0U2VydmljZXMuY3JlYXRlTW9uaXRvcmVkSXRlbSh0aGlzLl9zZXNzaW9uSWQsIHRoaXMuX3N1YnNjcmlwdGlvbklkLCBjb21wb25lbnRJdGVtLmlkLCByZXF1ZXN0SWQsIE9wY1VhUmVzdFNlcnZpY2VzLm1vbml0b3JpbmdTYW1wbGluZ0ludGVydmFsLCBPcGNVYUF0dHJpYnV0ZS5WQUxVRSk7XHJcbiAgICAgICAgICAgIHJlcXVlc3RJZCsrO1xyXG5cclxuICAgICAgICAgICAgLy8gY3JlYXRlIHRoZSBtb25vdG9yZWQgaXRlbSBmb3IgdGhlIHVzZXIgYWNjZXNzIGxldmVsXHJcbiAgICAgICAgICAgIG1vbml0b3JJdGVtID0gdGhpcy5hZGRNb25pdG9yaW5nSXRlbShjb21wb25lbnRJdGVtLCBPcGNVYUF0dHJpYnV0ZS5VU0VSX0FDQ0VTU19MRVZFTCwgcmVxdWVzdElkKTtcclxuICAgICAgICAgICAgbW9uaXRvcmVkSXRlbXMucHVzaChtb25pdG9ySXRlbSk7XHJcbiAgICAgICAgICAgIGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLmNyZWF0ZU1vbml0b3JlZEl0ZW0odGhpcy5fc2Vzc2lvbklkLCB0aGlzLl9zdWJzY3JpcHRpb25JZCwgY29tcG9uZW50SXRlbS5pZCwgcmVxdWVzdElkLCBPcGNVYVJlc3RTZXJ2aWNlcy5tb25pdG9yaW5nU2FtcGxpbmdJbnRlcnZhbCwgT3BjVWFBdHRyaWJ1dGUuVVNFUl9BQ0NFU1NfTEVWRUwpO1xyXG4gICAgICAgICAgICByZXF1ZXN0SWQrKztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1vbml0b3JlZEl0ZW1zO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xlYXJzIGFsbCBtb25pdG9yZWQgaXRlbXMgZm9yIHRoaXMgc3Vic2NyaXB0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1vbml0b3JpbmdTdWJzY3JpcHRpb25cclxuICAgICAqL1xyXG4gICAgYXN5bmMgY2xlYXJNb25pdG9yZWRJdGVtcygpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAoIE9iamVjdC5rZXlzKHRoaXMuX21vbml0b3JpbmdJdGVtcykpIHtcclxuICAgICAgICAgICAgICAgIGxldCBkZWxldGVNb25pdG9yZWRJdGVtUmVxdWVzdHM6IGFueVtdID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gYWN0aXZhdGUgYmF0Y2hpbmdcclxuICAgICAgICAgICAgICAgIE9wY1VhUmVzdFNlcnZpY2VzLmFjdGl2YXRlQmF0Y2hpbmcoKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgT2JqZWN0LmtleXModGhpcy5fbW9uaXRvcmluZ0l0ZW1zKS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vbml0b3JlSXRlbSA9IHRoaXMuX21vbml0b3JpbmdJdGVtc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5kZWxldGVNb25pdG9yZWRJdGVtKHRoaXMuX3Nlc3Npb25JZCwgdGhpcy5fc3Vic2NyaXB0aW9uSWQsIG1vbml0b3JlSXRlbS5pZCk7ICBcclxuICAgICAgICAgICAgICAgIH0gIFxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIC8vIGV4ZWN1dGUgYmF0Y2ggcmVxdWVzdFxyXG4gICAgICAgICAgICAgICAgT3BjVWFSZXN0U2VydmljZXMuZXhlY3V0ZUJhdGNoUmVxdWVzdCgpOyAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGFkZHMgYSBuZXcgbW9uaXRvcmluZyBpdGVtLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50SXRlbX0gcGFyYW1ldGVyXHJcbiAgICAgKiBAcGFyYW0ge09wY1VhQXR0cmlidXRlfSBtb25pdG9yaW5nQXR0cmlidXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY2xpZW50SWRcclxuICAgICAqIEByZXR1cm5zIHtNb25pdG9yaW5nU3Vic2NyaXB0aW9uSXRlbX1cclxuICAgICAqIEBtZW1iZXJvZiBNb25pdG9yaW5nU3Vic2NyaXB0aW9uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkTW9uaXRvcmluZ0l0ZW0ocGFyYW1ldGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW0sIG1vbml0b3JpbmdBdHRyaWJ1dGU6IE9wY1VhQXR0cmlidXRlLCBjbGllbnRJZDpudW1iZXIpOk1vbml0b3JpbmdTdWJzY3JpcHRpb25JdGVtIHtcclxuICAgICAgICBsZXQgbW9uaXRvckl0ZW0gPSBNb25pdG9yaW5nU3Vic2NyaXB0aW9uSXRlbS5jcmVhdGUocGFyYW1ldGVyLCBtb25pdG9yaW5nQXR0cmlidXRlLGNsaWVudElkKTtcclxuICAgICAgICB0aGlzLl9tb25pdG9yaW5nSXRlbXNbY2xpZW50SWRdID0gbW9uaXRvckl0ZW07XHJcbiAgICAgICAgcmV0dXJuIG1vbml0b3JJdGVtO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYSBtb25pdG9yZWQgaXRlbVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY2xpZW50SWRcclxuICAgICAqIEBtZW1iZXJvZiBNb25pdG9yaW5nU3Vic2NyaXB0aW9uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVtb3ZlTW9uaXRvcmluZ0l0ZW0oY2xpZW50SWQ6IG51bWJlcil7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuX21vbml0b3JpbmdJdGVtc1tjbGllbnRJZF07ICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGhhbmRsZXMgdGhlIHByb2Nlc3Npbmcgb2YgaXRlbSBjaGFuZ2VzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJT3BjVWFEYXRhQ2hhbmdlZH0gb3BjVWFEYXRhQ2hhbmdlZEluZm9cclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1vbml0b3JpbmdTdWJzY3JpcHRpb25cclxuICAgICAqL1xyXG4gICAgcHJvY2Vzc0l0ZW1DaGFuZ2VzKG9wY1VhRGF0YUNoYW5nZWRJbmZvOiBJT3BjVWFEYXRhQ2hhbmdlZCk6IGFueSB7XHJcbiAgICAgICAgbGV0IGNoYW5nZWRPYnNlcnZhYmxlcyA9IG5ldyBBcnJheTxPYnNlcnZhYmxlPigpO1xyXG4gICAgICAgIG9wY1VhRGF0YUNoYW5nZWRJbmZvLkRhdGFOb3RpZmljYXRpb25zLmZvckVhY2goZGF0YU5vdGlmaWNhdGlvbiA9PiB7XHJcbiAgICAgICAgICAgIC8vIGdldCB0aGUgaXRlbSB0byBjaGFuZ2VcclxuICAgICAgICAgICAgbGV0IG1vbml0b3JJdGVtID0gdGhpcy5nZXRNb25pdG9yZWRJdGVtQnlJZChkYXRhTm90aWZpY2F0aW9uLmNsaWVudEhhbmRsZSk7XHJcbiAgICAgICAgICAgIGlmIChtb25pdG9ySXRlbSkge1xyXG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBpdGVtcyB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgbW9uaXRvckl0ZW0uY2hhbmdlVmFsdWUoZGF0YU5vdGlmaWNhdGlvbi52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAvLyBhZGQgaXQgdG8gdGhlIG1vZGlmaWVkIG9ic2VydmFibGVzIGxpc3RcclxuICAgICAgICAgICAgICAgIGNoYW5nZWRPYnNlcnZhYmxlcy5wdXNoKG5ldyBPYnNlcnZhYmxlKG1vbml0b3JJdGVtLm1vbml0b3JpbmdPYmplY3QsbW9uaXRvckl0ZW0ubW9uaXRvcmluZ1Byb3BlcnR5KSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hcHBDb2NrcGl0RGlhZ25vc3RpY01vbml0b3JpbmdQcm92aWRlci5wcm9jZXNzT3BjVWFEYXRhQ2hhbmdlZDogQ291bGQgbm90IGZpbmQgbW9uaXRvcmVkIGl0ZW0gJyArIEpTT04uc3RyaW5naWZ5KGRhdGFOb3RpZmljYXRpb24pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMub25Nb25pdG9ySXRlbXNDaGFuZ2VkKHRoaXMsIGNoYW5nZWRPYnNlcnZhYmxlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBub3RpZmllcyBmcm9tIHVwZGF0ZWluZyBvYnNlcnZlZCBpdGVtc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TW9uaXRvcmluZ1N1YnNjcmlwdGlvbn0gY2hhbmdlZFN1YnNjcmlwdGlvblxyXG4gICAgICogQHBhcmFtIHtPYnNlcnZhYmxlW119IGNoYW5nZWRPYnNlcnZhYmxlc1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTW9uaXRvcmluZ1N1YnNjcmlwdGlvblxyXG4gICAgICovXHJcbiAgICBvbk1vbml0b3JJdGVtc0NoYW5nZWQoY2hhbmdlZFN1YnNjcmlwdGlvbjogTW9uaXRvcmluZ1N1YnNjcmlwdGlvbiwgY2hhbmdlZE9ic2VydmFibGVzOiBPYnNlcnZhYmxlW10pOiBhbnkge1xyXG4gICAgICAgIGxldCBjaGFuZ2VkRXZlbnRBcmdzID0gbmV3IEV2ZW50T2JzZXJ2ZWRJdGVtc0NoYW5nZWRBcmdzKGNoYW5nZWRTdWJzY3JpcHRpb24ub2JzZXJ2ZXIsIGNoYW5nZWRTdWJzY3JpcHRpb24sIGNoYW5nZWRPYnNlcnZhYmxlcyBhcyBbXSk7XHJcbiAgICAgICAgdGhpcy5ldmVudE9ic2VydmVkSXRlbXNDaGFuZ2VkLnJhaXNlKHRoaXMsIGNoYW5nZWRFdmVudEFyZ3MpO1xyXG4gICAgICAgIHRoaXMubm90aWZ5T2JzZXJ2ZXJGcm9tQ2hhbmdlcyhjaGFuZ2VkU3Vic2NyaXB0aW9uLm9ic2VydmVyLGNoYW5nZWRPYnNlcnZhYmxlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBub3RpZmllcyB0aGUgb2JzZXJ2ZXIgZnJvbSBjaGFuZ2VzIGlmIHRoZSBvYnNlcnZlciBpbXBsZW1lbnRzIHRoZSBub3RpZmljYXRpb24gaW50ZXJmYWNlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SU9ic2VydmVyfSBvYnNlcnZlclxyXG4gICAgICogQHBhcmFtIHtPYnNlcnZhYmxlc1tdfSBjaGFuZ2VkT2JzZXJ2YWJsZXNcclxuICAgICAqIEBtZW1iZXJvZiBNb25pdG9yaW5nU3Vic2NyaXB0aW9uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbm90aWZ5T2JzZXJ2ZXJGcm9tQ2hhbmdlcyhvYnNlcnZlcjogSU9ic2VydmVyLCBjaGFuZ2VkT2JzZXJ2YWJsZXM6IE9ic2VydmFibGVbXSkge1xyXG4gICAgICAgIGlmKG9ic2VydmVyLm9uT2JzZXJ2YWJsZXNDaGFuZ2VkKXtcclxuICAgICAgICAgICAgb2JzZXJ2ZXIub25PYnNlcnZhYmxlc0NoYW5nZWQoY2hhbmdlZE9ic2VydmFibGVzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgY2xhc3MgaG9sZHMgaW5mb3JtYXRpb24gYWJvdXQgdGhlIHN1YnNyaXB0ZWQgaXRlbVxyXG4gKlxyXG4gKiBAY2xhc3MgTW9uaXRvcmluZ1N1YnNjcmlwdGlvbkl0ZW1cclxuICovXHJcbmNsYXNzIE1vbml0b3JpbmdTdWJzY3JpcHRpb25JdGVtIHtcclxuXHJcbiAgICAvLyBob2xkcyB0aGUgaXRlbSBpbnN0YW5jZVxyXG4gICAgcHJpdmF0ZSBfbW9uaXRvckl0ZW1JbnN0YW5jZTogYW55ID0gdW5kZWZpbmVkO1xyXG4gICAgLy8gaG9sZHMgdGhlIHByb3BlcnR5IG5hbWUgb2YgdGhlIGl0ZW0gdG8gd2F0Y2hcclxuICAgIHByaXZhdGUgX21vbml0b3JpbmdQcm9wZXJ0eTogYW55ID0gXCJcIjtcclxuICAgIC8vIGhvbGRzIHRoZSBtb25pdG9yIGl0ZW0gaWRcclxuICAgIHByaXZhdGUgX2lkOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBNb25pdG9yaW5nU3Vic2NyaXB0aW9uSXRlbS5cclxuICAgICAqIEBwYXJhbSB7Kn0gbW9uaXRvcmluZ09iamVjdFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1vbml0b3JpbmdQcm9wZXJ0eVxyXG4gICAgICogQG1lbWJlcm9mIE1vbml0b3JpbmdTdWJzY3JpcHRpb25JdGVtXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG1vbml0b3JpbmdPYmplY3Q6IGFueSwgbW9uaXRvcmluZ1Byb3BlcnR5OiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9tb25pdG9ySXRlbUluc3RhbmNlID0gbW9uaXRvcmluZ09iamVjdDtcclxuICAgICAgICB0aGlzLl9tb25pdG9yaW5nUHJvcGVydHkgPSBtb25pdG9yaW5nUHJvcGVydHk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBtb25pdG9yaW5nT2JqZWN0KCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21vbml0b3JJdGVtSW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBtb25pdG9yaW5nUHJvcGVydHkoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbW9uaXRvcmluZ1Byb3BlcnR5O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaWQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBpZChpZDpzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuX2lkID0gaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGVzIGFuZCBpbml0aWFsaXplcyBhIG5ldyBtb25pdG9yaW5nIGl0ZW1cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50SXRlbX0gbW9uaXRvcmluZ09iamVjdFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1vbml0b3JpbmdQcm9wZXJ0eVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGNsaWVudElkXHJcbiAgICAgKiBAcmV0dXJucyB7TW9uaXRvcmluZ1N1YnNjcmlwdGlvbkl0ZW19XHJcbiAgICAgKiBAbWVtYmVyb2YgTW9uaXRvcmluZ1N1YnNjcmlwdGlvbkl0ZW1cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNyZWF0ZShtb25pdG9yaW5nT2JqZWN0OiBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW0sIG1vbml0b3JpbmdQcm9wZXJ0eTogc3RyaW5nLCBjbGllbnRJZDpudW1iZXIpOiBNb25pdG9yaW5nU3Vic2NyaXB0aW9uSXRlbSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBNb25pdG9yaW5nU3Vic2NyaXB0aW9uSXRlbShtb25pdG9yaW5nT2JqZWN0LCBtb25pdG9yaW5nUHJvcGVydHkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgc3BlY2lmaWVkIGl0ZW0gcHJvcGVydHkgd2l0aCB0aGUgbmV3IHZhbHVlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBuZXdNb25pdG9yZWRJdGVtVmFsdWVcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1vbml0b3JpbmdTdWJzY3JpcHRpb25JdGVtXHJcbiAgICAgKi9cclxuICAgIGNoYW5nZVZhbHVlKG5ld01vbml0b3JlZEl0ZW1WYWx1ZTogYW55KTogYW55IHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMubW9uaXRvcmluZ1Byb3BlcnR5KSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJWYWx1ZVwiOlxyXG4gICAgICAgICAgICAgICAgLy8gc2V0IG9iamVjdCB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tb25pdG9yaW5nT2JqZWN0LnZhbHVlID0gbmV3TW9uaXRvcmVkSXRlbVZhbHVlOyBcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiVXNlckFjY2Vzc0xldmVsXCI6XHJcbiAgICAgICAgICAgICAgICAvLyBzZXQgd3JpdGVhYmxlIGF0dHJpYnV0ZSBhY2NvcmRpbmcgdG8gdGhlIGFjY2VzcyBsZXZlbFxyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1dyaXRlYWJsZVN0YXRlID0gKG5ld01vbml0b3JlZEl0ZW1WYWx1ZSAmIE9wY1VhQWNjZXNzTGV2ZWwuQ3VycmVudFdyaXRlKSA9PSBPcGNVYUFjY2Vzc0xldmVsLkN1cnJlbnRXcml0ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubW9uaXRvcmluZ09iamVjdC5pc1dyaXRlYWJsZS52YWx1ZSA9IG5ld1dyaXRlYWJsZVN0YXRlO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJNb25pdG9yaW5nU3Vic2NyaXB0aW9uSXRlbSAtIHVwZGF0ZWQgd3JpdGVhYmxlICVvICVvXCIsIHRoaXMubW9uaXRvcmluZ09iamVjdC5icm93c2VOYW1lICsgXCIuaXNXcml0ZWFibGUgPSBcIiwgdGhpcy5tb25pdG9yaW5nT2JqZWN0LmlzV3JpdGVhYmxlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBNYXBwQ29ja3BpdERpYWdub3N0aWNNb25pdG9yaW5nUHJvdmlkZXIsIEV2ZW50T2JzZXJ2ZWRJdGVtc0NoYW5nZWRBcmdzIH07Il19