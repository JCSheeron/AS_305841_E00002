define(function () {

    'use strict';

    /**
    * @class brease.core.Decorator
    * @extends core.javascript.Function
    * @abstract
    * #Description
    * Abstract decorator class to add functionality to a widget class. 
    */
    var Decorator = function Decorator() { };

    Decorator.TYPE_PRE = 'pre';
    Decorator.TYPE_POST = 'post';

    Decorator.createDecorator = function (initType) {
        var DecoratorClass = function () { };
        DecoratorClass.prototype = new Decorator();
        DecoratorClass.prototype.constructor = DecoratorClass;
        DecoratorClass.prototype.initType = (initType === Decorator.TYPE_PRE) ? Decorator.TYPE_PRE : Decorator.TYPE_POST;
        return DecoratorClass;
    };

    /**
    * @method decorate
    * @localdoc decorate a widget class with some methods 
    * @param {brease.core.WidgetClass} widgetClass
    * @param {Object} initData Optional object, which is passed to the decorator method "init" of widget instances
    * @param {Object} staticData Optional object, which is saved in static WidgetClass data
    * @return {brease.core.WidgetClass}
    */
    Decorator.prototype.decorate = function (widgetClass, initData, staticData) {
        if (staticData) {
            for (var key in staticData) {

                widgetClass.static[key] = $.extend({}, widgetClass.static[key], staticData[key]);
            }

        }
        var fn;
        for (fn in this.methodsToAdd) {
            if (widgetClass.prototype[fn] !== undefined) {
                override(widgetClass, this.methodsToAdd, fn, initData, this.initType);
            } else {
                if (fn === 'init') {
                    apply(widgetClass, this.methodsToAdd, fn, initData);
                } else {
                    widgetClass.prototype[fn] = this.methodsToAdd[fn];
                }
            }
        }
        for (fn in this.addIfNotDefined) {
            if (widgetClass.prototype[fn] === undefined) {
                widgetClass.prototype[fn] = this.addIfNotDefined[fn];
            }
        }
        return widgetClass;
    };

    function apply(widgetClass, methodsToAdd, methodName, initData) {
        widgetClass.prototype[methodName] = function () {
            methodsToAdd[methodName].call(this, initData);
        };
    }

    function override(widgetClass, methodsToAdd, methodName, initData, initType) {
        var storedMethod = widgetClass.prototype[methodName];

        widgetClass.prototype[methodName] = function () {
            if (methodName === 'init') {
                if (initType === Decorator.TYPE_PRE) {
                    methodsToAdd[methodName].call(this, initData);
                }
                storedMethod.apply(this, arguments);
                if (initType !== Decorator.TYPE_PRE) {
                    methodsToAdd[methodName].call(this, initData);
                }
            } else {
                methodsToAdd[methodName].apply(this, arguments);
                storedMethod.apply(this, arguments);
            }
        };
    }

    return Decorator;

});

/**
* @class brease.core.WidgetClass
* @embeddedClass
* @virtualNote 
* generic widget class
*/
