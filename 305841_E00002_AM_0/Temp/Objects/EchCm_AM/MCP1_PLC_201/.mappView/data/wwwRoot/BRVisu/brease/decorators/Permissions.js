define(['brease/core/Decorator', 
    'brease/events/BreaseEvent',
    'brease/enum/Enum'], 
function (Decorator, BreaseEvent, Enum) {

    'use strict';

    /**
    * @class brease.decorators.Permissions
    * @abstract 
    * @extends brease.core.Decorator  
    * #Description
    * A decorator class to add permissions to a widget class
    * ##Example:  
    *
    *     define(['brease/core/BaseWidget', 'brease/decorators/Permissions'],
    *           function (SuperClass, permissions) {
    * 
    *        var WidgetClass = SuperClass.extend(function () {
    *           SuperClass.apply(this, arguments);
    *        }, defaultSettings),
    *            [...] 
    *     
    *        return permissions.decorate(WidgetClass, undefined, {
    *           permissions: {
    *               view: {property: 'permissionView', updateMethod: 'updateVisibility'}
    *           }
    *        });
    *     });
    *
    *
    * @iatMeta studio:visible
    * false
    */
    var Permissions = function () {
            this.initType = Decorator.TYPE_PRE;
        },
        dependency = 'roles',
        changeHandler = 'permissionsChangeHandler';

    /**
    * @method decorate
    * decorate a widget class with functionality of permissions
    * @param {brease.core.WidgetClass} widgetClass
    * @param {Boolean} initialDependency Initial dependency of widget instances
    * @param {Object} staticData
    * @param {brease.objects.Permissions} staticData.permissions
    * @return {brease.core.WidgetClass}
    */
    Permissions.prototype = new Decorator();

    var decoratorInstance = new Permissions();

    decoratorInstance.methodsToAdd = {

        init: function (initialDependency) {
            this.dependencies[dependency] = {
                state: Enum.Dependency.INACTIVE,
                suspend: suspend.bind(this),
                wake: wake.bind(this)
            };
            if (initialDependency === true) {
                this._updatePermissions();
                setState.call(this, Enum.Dependency.ACTIVE);
            }
        },

        dispose: function () {
            this.dependencies[dependency] = null;
            removeListener.call(this);
        }

    };

    decoratorInstance.methodsToAdd[changeHandler] = function () {
        this._updatePermissions(true);
    };

    decoratorInstance.methodsToAdd['_setPermission'] = function (value, key) {
        var permission = this.constructor.static.permissions[key];
        if (permission) {
            this.settings[permission.property] = value;
            this._updatePermission(key, true);
        }
    };

    decoratorInstance.methodsToAdd['_updatePermissions'] = function (update) {
        var permissions = this.constructor.static.permissions;

        for (var key in permissions) {
            this._updatePermission(key, update);
        }
    };

    decoratorInstance.methodsToAdd['_updatePermission'] = function (key, update) {
        var permission = this.constructor.static.permissions[key];

        if (permission !== undefined && this.settings[permission.property] !== undefined) {
            this.settings.permissions[key] = decoratorInstance.getPermission(this.settings[permission.property]);
            if (update === true) {
                this[permission.updateMethod]();
            }
        }
    };

    /**
    * @method getPermission
    * get permission for an array of roles  
    * returns true, if the user has one of the roles  
    * returns true, if the roles are not set (=null or '')
    * @param {RoleCollection} roles
    * @return {Boolean}
    */
    decoratorInstance.getPermission = function (roles) {
        if (roles !== null && roles !== '') {
            return brease.user.hasOneOfRoles(roles);
        } else {
            return true;
        }
    };

    function suspend() {
        if (this.dependencies[dependency].state === Enum.Dependency.ACTIVE) {
            this.dependencies[dependency].stored = brease.user.getUserRoles();
            setState.call(this, Enum.Dependency.SUSPENDED);
        }
    }

    function wake() {
        if (this.dependencies[dependency].state === Enum.Dependency.SUSPENDED) {
            setState.call(this, Enum.Dependency.ACTIVE);
            // compare works if roles are sorted (see services/User @_loadUserRolesResponseHandler)
            if (this.dependencies[dependency].stored.join(',') !== brease.user.getUserRoles().join(',')) {
                this[changeHandler]();
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
        document.body.addEventListener(BreaseEvent.ROLES_CHANGED, this._bind(changeHandler));
    }

    function removeListener() {
        document.body.removeEventListener(BreaseEvent.ROLES_CHANGED, this._bind(changeHandler));
    }

    return decoratorInstance;
});

/**
* @class brease.objects.Permissions
* An object with key/value pairs  
* - key is the name of the permission  
* - value is an object of type brease.objects.PermissionConfig  
* e.g.  
*       
*       {
*           view: {property: 'permissionView', updateMethod: 'updateVisibility'},
*           operate: {property: 'permissionOperate', updateMethod: 'updateOperability'},
*       }
*       
* Evaluated permissions are stored in settings.permissions of a widget. The name is the key of a permission.
* e.g. name = 'view' --> value is stored in settings.view
* @extends Object
* @abstract
* @embeddedClass
* @virtualNote  
* @iatMeta studio:visible
* false
*/

/**
* @class brease.objects.PermissionConfig
* @extends Object
* @abstract
* @embeddedClass
* @virtualNote  
* @iatMeta studio:visible
* false
*/

/**
* @property {String} updateMethod
* Method which is called after a permission changes. This happens initial and after a role change,
*/

/**
* @property {String} property
* Widget property, where roles are projected for this permission.
* e.g. 'permissionView' is the widget property, where roles can be assigned in an AS project
*/
