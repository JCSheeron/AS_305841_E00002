define(function () {

    /**
    * @class system.widgets.ChangePasswordDialog.libs.Elements
    * container for elements which are stored by a key  
    * is actually an object, but has methods like an array (map and forEach)
    */
    /**
    * @method constructor
    * Creates a new Object with same keys as the object argument.
    * @param {Object} obj
    */

    'use strict';

    function Elements(obj) {
        for (var key in obj) {
            this[key] = obj[key];
            if (this[key].elemId) {
                this[key].$el = $('#' + this[key].elemId);
            }
        }
    }

    /**
    * @method dispose
    * dispose instance
    */
    Object.defineProperty(Elements.prototype, 'dispose', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function () {
            for (var key in this) {
                if (this[key].$el) {
                    this[key].$el.off();
                }
                this[key] = undefined;
            }
        }
    });

    /**
    * @method getMemberIdByElemId
    * Returns the member id of the member with member.elemId=elemId.  
    * If there is no such member it returns undefined.  
    * @param {String} elemId
    * @return {Object}
    */
    Object.defineProperty(Elements.prototype, 'getMemberIdByElemId', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function (elemId) {
            var fieldId;
            for (var key in this) {
                if (this[key].elemId === elemId) {
                    fieldId = key;
                    break;
                }
            }
            return fieldId;
        }
    });

    /**
    * @method forEach
    * Executes a provided function once for each element.  
    * Parameters of the called function are:  
    * currentValue: the current element being processed in the instance  
    * key: the key of the current element being processed
    * @param {Function}
    */
    Object.defineProperty(Elements.prototype, 'forEach', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function (fn) {
            var instance = this;
            Object.keys(this).forEach(function (key) {
                fn(instance[key], key);
            });
        }
    });

    /**
    * @method map
    * Executes a provided function once for each element and returns a new array  
    * populated with the results of the provided function on every element.
    * Parameters of the called function are:  
    * currentValue: the current element being processed in the instance  
    * key: the key of the current element being processed
    * @param {Function}
    * @return {ANY[]}
    */
    Object.defineProperty(Elements.prototype, 'map', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function (fn) {
            var instance = this,
                ar = [];
            Object.keys(this).map(function (key) {
                ar.push(fn(instance[key], key));
            });
            return ar;
        }
    });

    return Elements;
});
