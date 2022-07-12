define(['brease/core/Decorator', 'brease/core/Utils', 'brease/events/BreaseEvent', 'brease/enum/Enum'], function (Decorator, Utils, BreaseEvent, Enum) {

    'use strict';

    var dependencyName = 'visibility',
        changeHandler = 'visibilityChangeHandler',
        debounceTime = 100,
        DecoratorClass = Decorator.createDecorator(Decorator.TYPE_PRE);

    var dependency = new DecoratorClass();

    /**
    * @class brease.decorators.VisibilityDependency
    * @extends brease.core.Decorator
    * #Description
    * A decorator class to add functionality of visibility dependency to widgets.
    * ##Example:  
    *
    *     define(['brease/core/BaseWidget','brease/decorators/VisibilityDependency'], function (SuperClass, visibilityDependency) {
    *        var WidgetClass = SuperClass.extend(function Label() {
    *           SuperClass.apply(this, arguments);
    *        });
    *            [...]
    *     
    *        return visibilityDependency.decorate(WidgetClass, false);
    *     });
    *
    *
    * @iatMeta studio:visible
    * false
    */

    /**
    * @method decorate
    * decorate a widget class with functionality of visibility dependency
    * @param {brease.core.WidgetClass} widgetClass
    * @param {Boolean} initialDependency Initial dependency of widget instances; dependency can be changed later with this.setVisibilityDependency
    * @return {brease.core.WidgetClass} returns decorated WidgetClass
    */

    /**
    * @property {String} initType='pre'
    * defines execution order of the init method: first decorator, then widget
    */

    /**
    * @property {Object} methodsToAdd
    * methods in this object are added to the prototype of the widget class; they can be overridden in the widget class;
    * methods which exist in the widget class and in the decorator are called both; order of execution: first decorator, then widget
    * @property {Function} methodsToAdd.setVisibilityDependency
    * @property {Boolean} methodsToAdd.setVisibilityDependency.flag  
    * Enable or disable visibility dependency; dependent widgets listen to visibility change events and execute method *visibilityChangeHandler* on changes

    * @property {Function} methodsToAdd.visibilityChangeHandler
    * @property {Object} methodsToAdd.visibilityChangeHandler.e event of type *visibility_changed*  
    * Calls the debounced version (<a href="http://underscorejs.org/#debounce" target="_blank">debounce</a>) of *_refreshScroller* (namely debouncedRefresh), if the event target contains the element of the widget.  
    * The debounced version is used to postpone the execution of _refreshScroller until after 100 milliseconds have elapsed since the last time it was invoked.
    */
    dependency.methodsToAdd = {

        init: function (initialDependency) {
            this.dependencies[dependencyName] = {
                state: Enum.Dependency.INACTIVE,
                suspend: suspend.bind(this),
                wake: wake.bind(this)
            };
            if (initialDependency === true) {
                this.setVisibilityDependency(initialDependency);
            }
            this.debouncedRefresh = _.debounce(this._refreshScroller.bind(this), debounceTime);
        },

        setVisibilityDependency: function (flag) {
            if (flag === true) {
                setState.call(this, Enum.Dependency.ACTIVE);
            } else {
                setState.call(this, Enum.Dependency.INACTIVE);
            }
        },

        dispose: function () {
            this.dependencies[dependencyName] = null;
            removeListener.call(this);
        }

    };

    dependency.methodsToAdd[changeHandler] = function (e) {
        if (Utils.elemContains(e.target, this.elem)) {
            this.debouncedRefresh();
        }
    };

    /**
    * @property {Object} addIfNotDefined
    * methods in this object are added to the prototype of the widget class, if they are not defined in the widget;
    * if a method is defined in the widget class, no additional method is added

    * @property {Function} addIfNotDefined._refreshScroller  
    * refresh a scroller, if it exists and is referenced in this.scroller
    */
    dependency.addIfNotDefined = {
        _refreshScroller: function () {
            if (this.scroller && typeof this.scroller.refresh === 'function' && !this.isHidden) {
                this.scroller.refresh();
            }
        }
    };

    function suspend() {
        if (this.dependencies[dependencyName].state === Enum.Dependency.ACTIVE) {
            setState.call(this, Enum.Dependency.SUSPENDED);
        }
    }

    function wake() {
        if (this.dependencies[dependencyName].state === Enum.Dependency.SUSPENDED) {
            setState.call(this, Enum.Dependency.ACTIVE);
        }
    }

    function setState(state) {
        if (this.dependencies[dependencyName]) {
            this.dependencies[dependencyName].state = state;
            if (state === Enum.Dependency.ACTIVE) {
                addListener.call(this);
            } else {
                removeListener.call(this);
            }
        }
    }

    function addListener() {
        document.body.addEventListener(BreaseEvent.VISIBILITY_CHANGED, this._bind(changeHandler), true);
    }

    function removeListener() {
        document.body.removeEventListener(BreaseEvent.VISIBILITY_CHANGED, this._bind(changeHandler), true);
    }

    return dependency;
});
