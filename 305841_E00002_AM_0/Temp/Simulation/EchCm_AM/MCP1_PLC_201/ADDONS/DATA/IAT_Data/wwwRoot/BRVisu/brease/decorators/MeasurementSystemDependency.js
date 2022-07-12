define(['brease/core/Decorator', 'brease/events/BreaseEvent', 'brease/enum/Enum'], function (Decorator, BreaseEvent, Enum) {

    'use strict';

    var MeasurementSystemDependency = function () {
            this.initType = Decorator.TYPE_PRE;
        },
        dependency = 'mms',
        event = 'mms',
        changeHandler = 'measurementSystemChangeHandler';

    /**
    * @class brease.decorators.MeasurementSystemDependency
    * @extends brease.core.Decorator
    * #Description
    * A decorator class to add functionality of measurement system dependency to widgets.
    * ##Example:  
    *
    *     define(['brease/core/BaseWidget', 'brease/decorators/MeasurementSystemDependency'],
    *           function (SuperClass, measurementSystemDependency) {
    *     
    *        var WidgetClass = SuperClass.extend(function NumericInput() {
    *           SuperClass.apply(this, arguments);
    *        }, defaultSettings),
    *     
    *        p = WidgetClass.prototype;
    *     
    *        p.init = function () {
    *           [...]
    *        };
    *     
    *        p.measurementSystemChangeHandler = function () {
    *           [...]
    *        };
    *     
    *        return measurementSystemDependency.decorate(WidgetClass, true);
    *     });
    *
    */

    /**
    * @method decorate
    * decorate a widget class with functionality of measurement system dependency
    * @param {brease.core.WidgetClass} widgetClass
    * @param {Boolean} initialDependency Initial dependency of widget instances
    * @return {brease.core.WidgetClass}
    */
    MeasurementSystemDependency.prototype = new Decorator();
    MeasurementSystemDependency.prototype.constructor = MeasurementSystemDependency;

    var instance = new MeasurementSystemDependency();

    /**
    * @property {Object} methodsToAdd
    * @property {Function} methodsToAdd.setMeasurementSystemDependency
    * @property {Boolean} methodsToAdd.setMeasurementSystemDependency.flag  
    * Enable or disable MeasurementSystem dependency; dependent widgets listen to MeasurementSystem changes and execute method *measurementSystemChangeHandler* on changes
    */
    instance.methodsToAdd = {

        init: function (initialDependency) {
            if (this[changeHandler] === undefined) {
                throw new Error('widget \u00BB' + this.elem.id + '\u00AB: decoration with "' + instance.constructor.name + '" requires method "' + changeHandler + '"');
            }
            this.dependencies[dependency] = {
                state: Enum.Dependency.INACTIVE,
                suspend: suspend.bind(this),
                wake: wake.bind(this),
                event: event
            };
            if (initialDependency === true) {
                this.setMeasurementSystemDependency(initialDependency);
            }
        },

        setMeasurementSystemDependency: function (flag) {
            if (flag === true) {
                setState.call(this, Enum.Dependency.ACTIVE);
            } else {
                setState.call(this, Enum.Dependency.INACTIVE);
            }
        },

        dispose: function () {
            this.dependencies[dependency] = null;
            removeListener.call(this);
        }

    };

    function suspend() {
        if (this.dependencies[dependency].state === Enum.Dependency.ACTIVE) {
            this.dependencies[dependency].stored = brease.measurementSystem.getCurrentMeasurementSystem();
            setState.call(this, Enum.Dependency.SUSPENDED);
        }
    }

    function wake(e) {
        if (this.dependencies[dependency].state === Enum.Dependency.SUSPENDED) {
            setState.call(this, Enum.Dependency.ACTIVE);
            if (this.dependencies[dependency].stored !== brease.measurementSystem.getCurrentMeasurementSystem()) {
                this[changeHandler](e);
            }
        }
    }

    function setState(state) {
        if (this.dependencies[dependency]) {
            this.dependencies[dependency].state = state;
            if (state === Enum.Dependency.ACTIVE) {
                addListener.call(this);
            } else {
                removeListener.call(this);
            }
        }
    }

    function addListener() {
        document.body.addEventListener(BreaseEvent.MEASUREMENT_SYSTEM_CHANGED, this._bind(changeHandler));
    }

    function removeListener() {
        document.body.removeEventListener(BreaseEvent.MEASUREMENT_SYSTEM_CHANGED, this._bind(changeHandler));
    }

    return instance;
});
