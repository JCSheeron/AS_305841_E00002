define(['libs/keyboardevent-key-polyfill'], function (keyboardeventKeyPolyfill) {

    'use strict';

    /* eslint-disable no-extend-native*/
    /********************************
    ***** requestAnimationFrame *****
    ********************************/
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame;

    /**********************
    ***** CustomEvent *****
    **********************/

    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    if (window.CustomEvent) {
        CustomEvent.prototype = window.CustomEvent.prototype;
    }
    window.CustomEvent = CustomEvent;

    /**********************************
    ***** Function.prototype.bind *****
    **********************************/

    if (!Function.prototype.bind) {
        Function.prototype.bind = function (oThis) {
            if (typeof this !== 'function') {
                // closest thing possible to the ECMAScript 5 internal IsCallable function
                throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
            }

            var aArgs = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                FNOP = function () { },
                fBound = function () {
                    return fToBind.apply((this instanceof FNOP && oThis) ? this : oThis,
                        aArgs.concat(Array.prototype.slice.call(arguments)));
                };

            FNOP.prototype = this.prototype;
            fBound.prototype = new FNOP();

            return fBound;
        };
    }

    /**********************************
    ***** Number.isInteger *****
    **********************************/
    if (!Number.isInteger) {
        Number.isInteger = function (value) {
            return typeof value === 'number' &&
              isFinite(value) &&
              Math.floor(value) === value;
        };
    }

    /**********************************
    ***** Object.keys *****
    **********************************/
    if (!Object.keys) {
        Object.keys = function (o) {
            if (o !== Object(o)) {
                throw new TypeError('Object.keys called on a non-object');
            }
            var k = [], p;
            for (p in o) {
                if (Object.prototype.hasOwnProperty.call(o, p)) {
                    k.push(p);
                }
            }
            return k;
        };
    }

    /*********************************
    ***** console.debug *****
    **********************************/
    if (console && console.log && !('debug' in console)) {
        console['debug'] = function () {
            console.log.apply(console, arguments);
        };
    }
    if (console && console.log && !('warn' in console)) {
        console['warn'] = function () {
            console.log.apply(console, arguments);
        };
    }
    if (console && console.log && !('info' in console)) {
        console['info'] = function () {
            console.log.apply(console, arguments);
        };
    }

    /*********************************
    ***** Function.name *****
    **********************************/
    if (Function.prototype.name === undefined && Object.defineProperty !== undefined) {
        Object.defineProperty(Function.prototype, 'name', {
            get: function () {
                var funcNameRegex = /function\s([^(]{1,})\(/;
                var results = (funcNameRegex).exec((this).toString());
                return (results && results.length > 1) ? results[1].trim() : '';
            },
            set: function () { }
        });
    }

    /*********************************
    ***** array.includes *****
    **********************************/
    if (!Array.prototype.includes) {
        Object.defineProperty(Array.prototype, 'includes', {
            value: function (searchElement, fromIndex) {

                // 1. Let O be ? ToObject(this value).
                if (this === null || this === undefined) {
                    throw new TypeError('"this" is null or not defined');
                }

                var o = Object(this);

                // 2. Let len be ? ToLength(? Get(O, "length")).
                var len = o.length >>> 0;

                // 3. If len is 0, return false.
                if (len === 0) {
                    return false;
                }

                // 4. Let n be ? ToInteger(fromIndex).
                //    (If fromIndex is undefined, this step produces the value 0.)
                var n = fromIndex | 0;

                // 5. If n ≥ 0, then
                //  a. Let k be n.
                // 6. Else n < 0,
                //  a. Let k be len + n.
                //  b. If k < 0, let k be 0.
                var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

                function sameValueZero(x, y) {
                    return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
                }

                // 7. Repeat, while k < len
                while (k < len) {
                    // a. Let elementK be the result of ? Get(O, ! ToString(k)).
                    // b. If SameValueZero(searchElement, elementK) is true, return true.
                    // c. Increase k by 1. 
                    if (sameValueZero(o[k], searchElement)) {
                        return true;
                    }
                    k += 1;
                }

                // 8. Return false
                return false;
            }
        });
    }

    /*********************************
    ***** array.find *****
    **********************************/
    if (!Array.prototype.find) {
        Object.defineProperty(Array.prototype, 'find', {
            value: function (fn) {
                var value;
                for (var i = 0; i < this.length; i += 1) {
                    if (fn(this[i]) === true) {
                        value = this[i];
                        break;
                    }
                }
                return value;
            }
        });
    }

    /*********************************
    ***** array.findIndex *****
    **********************************/
    // https://tc39.github.io/ecma262/#sec-array.prototype.findindex
    if (!Array.prototype.findIndex) {
        Object.defineProperty(Array.prototype, 'findIndex', {
            value: function (predicate) {
                // 1. Let O be ? ToObject(this value).
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }
  
                var o = Object(this);
  
                // 2. Let len be ? ToLength(? Get(O, "length")).
                var len = o.length >>> 0;
  
                // 3. If IsCallable(predicate) is false, throw a TypeError exception.
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                }
  
                // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
                var thisArg = arguments[1];
  
                // 5. Let k be 0.
                var k = 0;
  
                // 6. Repeat, while k < len
                while (k < len) {
                    // a. Let Pk be ! ToString(k).
                    // b. Let kValue be ? Get(O, Pk).
                    // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                    // d. If testResult is true, return k.
                    var kValue = o[k];
                    if (predicate.call(thisArg, kValue, k, o)) {
                        return k;
                    }
                    // e. Increase k by 1.
                    k++;
                }
  
                // 7. Return -1.
                return -1;
            },
            configurable: true,
            writable: true
        });
    }

    /*********************************
    ***** array.from *****
    **********************************/
    if (!Array.prototype.from) {
        Object.defineProperty(Array.prototype, 'from', {
            value: function (list) {
                var arr = [];
                for (var i = list.length; i--; arr.unshift(list[i]));
                return arr;
            }
        });
    }

    /*********************************
    ***** string.includes *****
    **********************************/
    if (!String.prototype.includes) {
        String.prototype.includes = function (search, start) {

            if (typeof start !== 'number') {
                start = 0;
            }

            if (start + search.length > this.length) {
                return false;
            } else {
                return this.indexOf(search, start) !== -1;
            }
        };
    }

    if (!String.prototype.startsWith) {
        Object.defineProperty(String.prototype, 'startsWith', {
            value: function (search, rawPos) {
                var pos = rawPos > 0 ? rawPos | 0 : 0;
                return this.substring(pos, pos + search.length) === search;
            }
        });
    }

    /***************************
    ***** document.baseURI *****
    ****************************/
    if (!document.baseURI) {
        Object.defineProperty(document, 'baseURI', {
            get: function () {
                var baseTags = document.getElementsByTagName('base'),
                    baseURI = (baseTags.length > 0) ? baseTags[0].href : document.URL;
                return baseURI;
            }
        });
    }

    /***************************
    ***** Map *****
    ****************************/
    if (!window.Map) {

        window.Map = function () {
            this.items = {};
            this.orderedItems = [];
            var instance = this;
            Object.defineProperty(instance, 'size', {
                get: function () {
                    return Object.keys(instance.items).length;
                }
            });
        };

        Map.prototype.set = function (key, value) {
            this.items[key] = value;
            this.orderedItems.push({ key: key, value: value });
            return this;
        };

        Map.prototype.get = function (key) {
            return this.items[key];
        };

        Map.prototype.delete = function (key) {
            var returnValue = false;
            if (this.items[key]) {
                delete this.items[key];
                returnValue = true;
            }
            return returnValue;
        };

        Map.prototype.forEach = function (fn) {
            for (var key in this.items) {
                fn(this.items[key], key);
            }
        };

        Map.prototype.clear = function () {
            this.orderedItems = [];
            for (var key in this.items) {
                delete this.items[key];
            }
        };
        Map.prototype.has = function (item) {
            return (this.items[item] !== undefined);
        };
        Map.prototype.entries = function () {
            var values = [];
            values = this.orderedItems.map(function (actItem) { return [actItem.key, actItem.value]; });
            function makeIterator(array) {
                var nextIndex = 0;
                return {
                    next: function () {
                        return (nextIndex < array.length) ? { value: array[nextIndex++] } : { value: undefined };
                    }
                };
            }
            return makeIterator(values);
        };
    }

    /***************************
    ***** Object.assign *****
    ****************************/
    if (typeof Object.assign !== 'function') {
        // Must be writable: true, enumerable: false, configurable: true
        Object.defineProperty(Object, 'assign', {
            value: function assign(target, varArgs) { // .length of function is 2
                if (target === null || target === undefined) { // TypeError if undefined or null
                    throw new TypeError('Cannot convert undefined or null to object');
                }
      
                var to = Object(target);
      
                for (var index = 1; index < arguments.length; index += 1) {
                    var nextSource = arguments[index];
      
                    if (nextSource !== null && nextSource !== undefined) { // Skip over if undefined or null
                        for (var nextKey in nextSource) {
                            // Avoid bugs when hasOwnProperty is shadowed
                            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                                to[nextKey] = nextSource[nextKey];
                            }
                        }
                    }
                }
                return to;
            },
            writable: true,
            configurable: true
        });
    }

    /***************************
    ***** Math *****
    ****************************/
    if (typeof Math.log10 !== 'function') {
        Math.log10 = function (x) {
            return Math.log(x) / Math.LN10;
        };
    }
    if (typeof Math.trunc !== 'function') {
        Math.trunc = function (v) {
            return v < 0 ? Math.ceil(v) : Math.floor(v);
        };
    }

    keyboardeventKeyPolyfill.polyfill();
});
