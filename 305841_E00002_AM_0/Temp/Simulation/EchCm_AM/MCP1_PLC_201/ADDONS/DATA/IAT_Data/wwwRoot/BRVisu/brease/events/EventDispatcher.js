define(['brease/core/Utils'], function (Utils) {

    'use strict';

    var EventDispatcher = function EventDispatcher() {
        },
        p = EventDispatcher.prototype;
        
    p.getListeners = function () {
        if (!this._listeners) {
            this._listeners = { };
        }
        return this._listeners;
    };

    p.addData = function (type, listener, data) {
        if (!this._data) {
            this._data = { };
        }
        if (this._data[type] === undefined) {
            this._data[type] = {};
        }
        this._data[type][listener] = data;
    };

    p.getData = function (type, listener) {
        if (this._data && this._data[type] !== undefined) {
            return this._data[type][listener];
        } else {
            return undefined;
        }
    };

    p.addEventListener = function (type, listener, unshift, data) {
        if (Utils.isString(type) && type !== '') {
            var listeners = this.getListeners();
            if (listeners[type] === undefined) {
                listeners[type] = [];
            }
            if (data) {
                this.addData(type, listener, data);
            }

            if (listeners[type].indexOf(listener) === -1) {
                if (unshift === true) {
                    listeners[type].unshift(listener);
                } else {
                    listeners[type].push(listener);
                }
            } 
        }

    };

    p.hasEventListener = function (type, listener) {

        var listeners = this.getListeners();
        if (listeners[type] !== undefined && listeners[type].indexOf(listener) !== -1) {
            return true;
        }
        return false;
    };

    p.hasListenersOfType = function (type) {
        var listeners = this.getListeners();
        return (listeners !== undefined && listeners[type] !== undefined && listeners[type].length > 0);
    };

    p.removeEventListener = function (type, listener) {

        var listeners = this.getListeners();
        if (typeof listener === 'function') {
            if (listeners[type]) {
                var index = listeners[type].indexOf(listener);
                if (this.getData(type, listener)) {
                    removeData.call(this, type, listener);
                }
                if (index !== -1) {
                    listeners[type].splice(index, 1);
                }
            }
        } else {
            listeners[type] = [];
        }
    };

    p.dispatchEvent = function (event, type) {
        
        var self = this,
            eventType = (type !== undefined) ? type : event.type;

        if (Utils.isString(eventType) && eventType !== '') {
            if (event.type === undefined) {
                event.type = eventType;
            }
            var arListeners = this.getListeners()[eventType];

            if (arListeners !== undefined) {
                arListeners.slice(0).forEach(function (listener) {
                    var data = self.getData(eventType, listener);
                    if (data) {
                        event.data = data; 
                    }
                    listener(event);
                });
            } 
        }
    };

    function removeData(type, listener) {
        if (this._data[type] !== undefined) {
            this._data[type][listener] = undefined;
        }
    }

    return EventDispatcher;

});
