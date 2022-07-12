define(['brease/core/Decorator', 'brease/events/BreaseEvent', 'brease/enum/Enum'], function (Decorator, BreaseEvent, Enum) {

    'use strict';

    var CultureDependency = function () {
            this.initType = Decorator.TYPE_PRE;
        },
        dependency = 'culture',
        event = 'culture',
        changeHandler = 'cultureChangeHandler';
        
    /**
    * @class brease.decorators.CultureDependency
    * @extends brease.core.Decorator
    * #Description
    * A decorator class to add functionality of culture dependency to widgets.
    * ##Example:  
    *
    *     define(['brease/core/BaseWidget', 'brease/decorators/CultureDependency'], function (SuperClass, cultureDependency) {
    *     
    *       var defaultSettings = {},
    *       WidgetClass = SuperClass.extend(function Label() {
    *           SuperClass.apply(this, arguments);
    *       }, defaultSettings); 
    *
    *            [...]
    *     
    *        return cultureDependency.decorate(WidgetClass);
    *     });
    *
    *
    * @iatMeta studio:visible
    * false
    */

    /**
    * @method decorate
    * decorate a widget class with functionality of culture dependency
    * @param {brease.core.WidgetClass} widgetClass
    * @param {Boolean} initialDependency Initial dependency of widget instances
    * @return {brease.core.WidgetClass} returns decorated WidgetClass
    */

    CultureDependency.prototype = new Decorator();
    CultureDependency.prototype.constructor = CultureDependency;

    var instance = new CultureDependency();
    /**
    * @property {Object} methodsToAdd
    * @property {Function} methodsToAdd.setCultureDependency
    * @property {Boolean} methodsToAdd.setCultureDependency.flag  
    * Enable or disable culture dependency; dependent widgets listen to culture changes and execute method *cultureChangeHandler* on changes
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
                this.setCultureDependency(initialDependency);
            }
        },

        setCultureDependency: function (flag) {
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
            this.dependencies[dependency].stored = brease.culture.getCurrentCulture().key;
            setState.call(this, Enum.Dependency.SUSPENDED);
        }
    }

    function wake(e) {
        if (this.dependencies[dependency].state === Enum.Dependency.SUSPENDED) {
            setState.call(this, Enum.Dependency.ACTIVE);
            if (this.dependencies[dependency].stored !== brease.culture.getCurrentCulture().key) {
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
        document.body.addEventListener(BreaseEvent.CULTURE_CHANGED, this._bind(changeHandler));
    }

    function removeListener() {
        document.body.removeEventListener(BreaseEvent.CULTURE_CHANGED, this._bind(changeHandler));
    }

    return instance;
});
