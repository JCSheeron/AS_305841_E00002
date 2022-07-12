define(['brease/core/Utils'], function (Utils) {

    'use strict';

    /**
    * @class brease.core.Class
    * @extends core.javascript.Function
    * @alternateClassName Class
    * @abstract
    * Base class for all widgets. It provides mechanism for classical inheritance.
    */
    var Class = function Class() {
        this._bound = {};
    };

    /**
    * @method extend
    * @static
    * @inheritable
    * Method for classical inheritance.  
    * Example
    *
    *       define(['widgets/brease/Button/Button'], SuperClass) {
    *       var defaultSettings = {values: {checked: 1, unchecked: 0}, checked: false },
    *           WidgetClass = SuperClass.extend(function ToggleButton() {
    *               SuperClass.apply(this, arguments);
    *           }, defaultSettings);
    * 
    * 
    * WidgetClass (here ToggleButton) inherits from SuperClass (here Button) and  
    * defaultSettings also inherit from defaultSettings of SuperClass
    * @param {Function} SubClass
    * @param {Object} [defaultSettings]
    */
    Class.extend = function (SubClass, defaultSettings, finalClass) {
        var self = this,
            Base = function () { };
        if (self.final) {
            throw new SyntaxError('Class is final and cannot be extended!');
        } else {
            Base.prototype = self.prototype;
            SubClass.prototype = new Base();
            SubClass.prototype.constructor = SubClass;
            SubClass.prototype.superClass = self;

            if (defaultSettings !== null) {
                if (self.prototype.defaultSettings !== undefined) {
                    SubClass.prototype.defaultSettings = Utils.extendOptionsToNew(self.prototype.defaultSettings, defaultSettings);
                } else {
                    SubClass.prototype.defaultSettings = Utils.deepCopy(defaultSettings);
                }
            }
            SubClass.extend = self.extend;
            SubClass.static = {}; //static and inherited
            SubClass.defaults = {}; //static and not inherited

            for (var key in self.static) {
                SubClass.static[key] = self.static[key];
            }

            if (finalClass === true) {
                Utils.defineProperty(SubClass, 'final', true, false);
            }

            return SubClass;
        }
    };

    Class.static = {};

    Class.prototype.dispose = function () {
        this._bound = null;
    };

    Class.prototype.isDisposed = function () {
        return this._bound === null;
    };

    /**
    * @method _bind
    * Method for binding instance methods to "this" of instance.  
    * Thus they can be added and removed as EventListeners and the method call has the right scope.  
    * Example (imagine following functions as methods of an instance) :
    *
    *       init: function () {
    *           document.getElementById('someElementId').addEventListener('click', this._bind('clickHandler'));
    *       },
    *       dispose: function() {
    *           document.getElementById('someElementId').removeEventListener('click', this._bind('clickHandler'));
    *       },
    *       clickHandler: function (e) {
    *           console.log(this); // "this" keyword will point to instance
    *       }
    *
    *
    * Contrary to the native "<a href="https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Function/bind" target="_blank">bind</a>" method, it creates a new function only once for each method.
    * @param {String} f Name of the instance method
    * @throws {TypeError}
    * Throws a TypeError, if argument is not the name of an instance method
    */

    // DEVELOPER notes
    // _bound is used for disposing these bound functions
    // function calls actually are bound to _handlerProxy; 
    // this allows unit tests to spy on bound functions, as they remain unchanged
    Class.prototype._bind = function (f) {
        if (this._bound !== null) {
            if (typeof f.bind === 'function') {
                if (this._bound[f] === undefined) {
                    this._bound[f] = f.bind(this);
                }
            } else {
                if (typeof this[f] !== 'function') {
                    throw new TypeError('Class.prototype._bind - what is trying to be bound is not callable (' + this.constructor.name + ')');
                }
                if (this._bound[f] === undefined) {
                    this._bound[f] = this._handlerProxy.bind(this, f);
                }
            }
            return this._bound[f];
        } else {
            console.iatWarn('trying to bind function on disposed widget');
            return undefined;
        }
    };

    Class.prototype._handlerProxy = function (fn) {

        var len = arguments.length,
            startIndex = 1;

        if (len > startIndex) {
            // we do not use Array.prototype.slice.call(arguments, 1)
            // as it prevents optimizations in some JavaScript engines: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
            var args = [];
            for (var i = startIndex; i < len; i += 1) {
                args.push(arguments[i]);
            }
            this[fn].apply(this, args);
        } else {
            /*eslint-disable no-useless-call*/
            this[fn].call(this);
        }
    };

    return Class;

});
