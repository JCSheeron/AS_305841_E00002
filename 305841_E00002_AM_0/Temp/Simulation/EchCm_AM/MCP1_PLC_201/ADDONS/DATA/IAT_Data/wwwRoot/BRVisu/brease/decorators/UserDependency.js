define(['brease/core/Decorator', 'brease/events/BreaseEvent', 'brease/enum/Enum'], function (Decorator, BreaseEvent, Enum) {

    'use strict';

    var UserDependency = function UserDependency() {
            this.initType = Decorator.TYPE_PRE;
        },
        dependency = 'user',
        event = 'user',
        changeHandler = 'userChangeHandler';

    /**
    * @class brease.decorators.UserDependency
    * @extends brease.core.Decorator
    * #Description
    * A decorator class to add functionality of user dependency to widgets.
    * ##Example:  
    *
    *     define(['brease/core/BaseWidget', 'brease/decorators/UserDependency'],
    *           function (SuperClass, userDependency) {
    * 
    *        var WidgetClass = SuperClass.extend(function () {
    *           SuperClass.apply(this, arguments);
    *        }, defaultSettings),
    *            [...] 
    *     
    *        return userDependency.decorate(WidgetClass);
    *     });
    *
    *
    * @iatMeta studio:visible
    * false
    */

    /**
    * @method decorate
    * decorate a widget class with functionality of user dependency
    * @param {brease.core.WidgetClass} widgetClass
    * @param {Boolean} initialDependency Initial dependency of widget instances
    * @return {brease.core.WidgetClass} returns decorated WidgetClass
    */
    UserDependency.prototype = new Decorator();
    UserDependency.prototype.constructor = UserDependency;

    var instance = new UserDependency();

    /**
    * @property {Object} methodsToAdd
    * @property {Function} methodsToAdd.setUserDependency
    * @property {Boolean} methodsToAdd.setUserDependency.flag  
    * Enable or disable user dependency; dependent widgets listen to User changes and execute method *userChangeHandler* on changes
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
                this.setUserDependency(initialDependency);
            }
        },

        setUserDependency: function (flag) {
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
            this.dependencies[dependency].stored = brease.user.getCurrentUser().userID;
            setState.call(this, Enum.Dependency.SUSPENDED);
        }
    }

    function wake(e) {
        if (this.dependencies[dependency].state === Enum.Dependency.SUSPENDED) {
            setState.call(this, Enum.Dependency.ACTIVE);
            if (this.dependencies[dependency].stored !== brease.user.getCurrentUser().userID) {
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
        document.body.addEventListener(BreaseEvent.USER_CHANGED, this._bind(changeHandler));
    }

    function removeListener() {
        document.body.removeEventListener(BreaseEvent.USER_CHANGED, this._bind(changeHandler));
    }

    return instance;
});
