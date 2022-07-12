define(['brease/core/Utils', 
    'brease/events/BreaseEvent',
    'brease/events/SocketEvent',
    'brease/events/ClientSystemEvent',
    'brease/enum/Enum',
    'brease/services/libs/PasswordPolicies',
    'brease/services/libs/UserData',
    'brease/services/libs/UserDataList'], 
function (Utils, BreaseEvent, SocketEvent, ClientSystemEvent, Enum, PasswordPolicies, UserData, UserDataList) {

    'use strict';

    /**
    * @class brease.services.User
    * @extends core.javascript.Object
    * User service; available via brease.services.user  
    * Authentification is a two step process  
    *   First step is to authenticate the username and pw  
    *   Second step is to set the user via setCurrentUser  
    * Example of usage:  
    * 
    *       <script>
    *           require(['brease', 'brease/events/BreaseEvent'], function (brease, BreaseEvent) {
    *               
    *               brease.services.user.authenticateUser('username', '****').then(        
    *                   successCallBackFunction,
    *                   errorCallBackFunction
    *               });
    *           });
    *       </script>
    * 
    * @singleton
    */
    var User = {

        /*
        /* PUBLIC
        */

        init: function (runtimeService) {
            _runtimeService = runtimeService;
            _currentUser = null;
            return this;
        },

        isReady: function () {
            _deferredReady = $.Deferred();
            _load();
            return _deferredReady.promise();
        },

        getSeparators: function () {
            // currently static, but could be dynamic in future, like in globalize
            return {
                dsp: '.', // decimal separator = string that separates a number from the fractional portion, as in 1.99
                gsp: ',' // group separator = string that separates number groups, as in 1,000,000
            };
        },
        /**
        * @method authenticateUser
        * @async
        * Async function to authenticate a user (first step of login)
        *
        *       brease.services.user.authenticateUser('username', '****').then(        
        *           function(user) {
        *               //Success Callback
        *           },
        *           function() {
        *               //Error Callback
        *           }
        *       );
        *
        * @param {String} username
        * @param {String} password
        * @return {Promise}
        */
        authenticateUser: function (username, password) {
            _deferAuth = $.Deferred();
            _runtimeService.authenticateUser(username, password, _authenticateResponseHandler);
            return _deferAuth.promise();
        },

        /**
        * @method setCurrentUser
        * @async
        * Async function to set a user (second step of login)
        *
        *       brease.services.user.setCurrentUser('user').then(        
        *           function() {
        *               //Success Callback
        *           },
        *           function() {
        *               //Error Callback
        *           }
        *       );
        *
        * @param {Object} user User Object 
        * @return {Promise}
        */
        setCurrentUser: function (user) {
            _deferUser = $.Deferred();
            _runtimeService.setCurrentUser(user, _setUserResponseHandler);
            return _deferUser.promise();
        },

        /**
        * @method loadCurrentUser
        * @async
        * Async function to get the current User
        *
        *       brease.services.user.loadCurrentUser().then(        
        *           function(user) {
        *               //Success Callback
        *           },
        *           function() {
        *               //Error Callback
        *           }
        *       );
        *
        * @return {Promise}
        */
        loadCurrentUser: function () {
            _deferUser = $.Deferred();
            if (_currentUser !== undefined && _currentUser !== null) {
                _deferUser.resolve(_currentUser);
            } else {
                _runtimeService.loadCurrentUser(_getUserResponseHandler);
            }

            return _deferUser.promise();
        },

        /**
        * @method getCurrentUser
        * @return {Object} 
        * @return {String} return.userID
        */
        getCurrentUser: function () {
            return _currentUser;
        },

        /**
        * @method setDefaultUser
        * @async
        * Async function to set the default user
        *
        *       brease.services.user.setDefaultUser().then(        
        *           function(user) {
        *               //Success Callback
        *           },
        *           function() {
        *               //Error Callback
        *           }
        *       );
        *
        * @return {Promise}
        */
        setDefaultUser: function () {
            _deferUser = $.Deferred();
            _runtimeService.setDefaultUser(_setUserResponseHandler);
            return _deferUser.promise();
        },

        /**
        * @method hasOneOfRoles
        * returns true if the current user has one of the provided roles
        * @param {RoleCollection} roles Array of role names, e.g. ['Administrators','Guest']
        * @return {Boolean}
        */
        hasOneOfRoles: function (roles) {
            return User.permission(roles, User.getUserRoles());
        },

        /**
        * @method permission
        * returns true if the two arrays intersect  
        * returns false if one of the arrays is empty or not an array  
        * @param {RoleCollection} value
        * @param {RoleCollection} arRoles
        * @return {Boolean}
        */
        permission: function (value, arRoles) {
            var i;
            if (!Array.isArray(value) || value.length === 0) {
                return false;
            }
            if (!Array.isArray(arRoles) || arRoles.length === 0) {
                return false;
            }
            if (value.length < arRoles.length) {
                for (i = 0; i < value.length; i += 1) {
                    if (arRoles.indexOf(value[i]) !== -1) {
                        return true;
                    }
                }
            } else {
                for (i = 0; i < arRoles.length; i += 1) {
                    if (value.indexOf(arRoles[i]) !== -1) {
                        return true;
                    }
                }
            }
            return false;
        },

        /**
        * @method getUserRoles
        * @return {Array}
        */
        getUserRoles: function () {
            return _roles;
        },

        /**
        * @method loadUserRoles
        * @async
        * Async function to get roles of user from server. Can be used with deferred object or callback.  
        *  
        *  
        *       $.when(
        *           brease.services.user.loadUserRoles()
        *       ).then(function (roles) {
        *           // Example return value: ["Administrators","Guest"]
        *       });
        *
        * or  
        *
        *       brease.services.user.loadUserRoles(function(roles) {
        *           // Example return value: ["Administrators","Guest"]
        *       });
        * 
        * @param {Function} [callback]
        * @return {Promise}
        */
        loadUserRoles: function (callback) {
            var deferred = $.Deferred();

            _runtimeService.loadUserRoles(_loadUserRolesResponseHandler, { deferred: deferred, callback: callback });

            return deferred.promise();
        },

        loginAction: function (username, password) {
            _deferAction = $.Deferred();
            _runtimeService.authenticateUser(username, password, _loginActionAuthResponseHandler);
            return _deferAction.promise();
        },

        /**
        * @method changePassword
        * @async
        * Async function to change the password
        *
        *       brease.services.user.changePassword(userName, oldPassword, newPassword).then(        
        *           function() {
        *               //success callback
        *           },
        *           function() {
        *               //error callback
        *           }
        *       );
        *
        * @param {String} userName
        * @param {String} oldPassword
        * @param {String} newPassword
        * @return {Promise}
        */
        changePassword: function (userName, oldPassword, newPassword) {
            _deferChange = $.Deferred();
            _runtimeService.changePassword(userName, oldPassword, newPassword, _changePasswordResponseHandler, { userName: userName });
            return _deferChange.promise();
        },

        /**
        * @method loadPasswordPolicies
        * @async
        * Async function to load password policies
        *
        *       brease.services.user.loadPasswordPolicies().then(
        *           function(policy) {
        *               //success callback
        *           },
        *           function(status) {
        *               //error callback
        *           }
        *       );
        *
        * @return {Promise}
        */
        loadPasswordPolicies: function () {
            var def = $.Deferred();
            _runtimeService.loadPasswordPolicies(_loadPasswordPoliciesResponseHandler, { deferred: def });
            return def.promise();
        },

        /**
        * @method loadUserList
        * @async
        * Async function to load user list
        *
        *       brease.services.user.loadUserList(details).then(
        *           function(userlist) {
        *               //success callback
        *           },
        *           function(status) {
        *               //error callback
        *           }
        *       );
        * @param {Boolean} details
        * @return {Promise}
        */

        loadUserList: function (details) {
            var def = $.Deferred();
            _runtimeService.loadUserList(details, _loadUserListResponseHandler, { deferred: def });
            return def.promise();
        },

        /**
        * @method loadUserData
        * @async
        * Async function to load user data
        *
        *       brease.services.user.loadUserData(userName).then(
        *           function(userdata) {
        *               //success callback
        *           },
        *           function(status) {
        *               //error callback
        *           }
        *       );
        * @param {String} userName
        * @return {Promise}
        */

        loadUserData: function (userName) {
            var def = $.Deferred();
            _runtimeService.loadUserData(userName, _loadUserDataResponseHandler, { deferred: def });
            return def.promise();
        },

        /**
        * @method addUserToMpUserX
        * @async
        * Async function to add user data
        *
        *       brease.services.user.addUserToMpUserX(userName, password, fullName, roles).then(
        *           function(status) {
        *               //success callback
        *           },
        *           function(status) {
        *               //error callback
        *           }
        *       );
        * @param {String} userName
        * @param {String} password
        * @param {String} fullName
        * @param {String[]} roles
        * @return {Promise}
        */

        addUserToMpUserX: function (userName, password, fullName, roles) {
            var def = $.Deferred();
            _runtimeService.addUserToMpUserX(userName, password, fullName, roles, _addUserToMpUserXResponseHandler, { deferred: def });
            return def.promise();
        },

        /**
        * @method deleteUserFromMpUserX
        * @async
        * Async function to load user data
        *
        *       brease.services.user.deleteUserFromMpUserX(userName).then(
        *           function(status) {
        *               //success callback
        *           },
        *           function(status) {
        *               //error callback
        *           }
        *       );
        * @param {String} userName
        * @return {Promise}
        */

        deleteUserFromMpUserX: function (userName) {
            var def = $.Deferred();
            _runtimeService.deleteUserFromMpUserX(userName, _deleteUserFromMpUserXResponseHandler, { deferred: def });
            return def.promise();
        },

        /**
        * @method modifyUserFromMpUserX
        * @async
        * Async function to modify user data
        *
        *       brease.services.user.modifyUserFromMpUserX(userName, modifiedUserData).then(
        *           function(status) {
        *               //success callback
        *           },
        *           function(status) {
        *               //error callback
        *           }
        *       );
        * @param {String} userName
        * @param {Object} modifiedUserData
        * @param {String} [modifiedUserData.fullName]
        * @param {String[]} [modifiedUserData.roles]
        * @param {String} [modifiedUserData.password]
        * @param {Boolean} [modifiedUserData.isLocked]
        * @return {Promise}
        */
        modifyUserFromMpUserX: function (userName, modifiedUserData) {
            var def = $.Deferred();
            _runtimeService.modifyUserFromMpUserX(userName, modifiedUserData, _modifyUserFromMpUserXResponseHandler, { deferred: def });
            return def.promise();
        },

        /**
        * @method loadAvailableRoles
        * @async
        * Async function to load available roles
        *
        *       brease.services.user.loadAvailableRoles().then(
        *           function(roles) {
        *               //success callback
        *           },
        *           function(status) {
        *               //error callback
        *           }
        *       );
        * @return {Promise}
        */
        loadAvailableRoles: function () {
            var def = $.Deferred();
            _runtimeService.loadAvailableRoles(_loadAvailableRolesResponseHandler, { deferred: def });
            return def.promise();
        },
        /**
        * @method getUserSettingsFromMpUserX
        * @async
        * Async function to get the properties EditUserWithSameLevel and UserNameMinLength
        *
        *       brease.services.user.getUserSettingsFromMpUserX().then(
        *           function(data) {
        *               //success callback
        *           },
        *           function(status) {
        *               //error callback
        *           }
        *       );
        * @return {Promise}
        */
        getUserSettingsFromMpUserX: function () {
            var def = $.Deferred();
            _runtimeService.getUserSettingsFromMpUserX(_getUserSettingsFromMpUserXResponseHandler, { deferred: def });
            return def.promise();
        }
    };

    function _loginActionAuthResponseHandler(data) {
        if (data.success === true && data.user !== undefined && data.user.isAuthenticated === true) {
            _runtimeService.setCurrentUser(data.user, _loginActionSetUserResponseHandler.bind(null, data.user.userID));
        } else {
            _loginActionResolve(false, data.user.userID);
        }
    }

    function _loginActionResolve(success, userName) {
        _deferAction.resolve({ success: success });
        var e = {
            event: (success) ? ClientSystemEvent.LOGIN_SUCCESS : ClientSystemEvent.LOGIN_FAILED,
            source: {
                type: 'clientSystem.Event'
            },
            eventArgs: {
                userName: userName
            }
        };
        _runtimeService.sendEvent(e);
    }

    function _loginActionSetUserResponseHandler(userName, data) {
        _loginActionResolve(data.success, userName);
    }

    var _deferredReady,
        _deferAuth,
        _deferUser,
        _deferAction,
        _deferChange,
        _currentUser,
        _roles = [],
        _runtimeService;

    function _loadUserRolesResponseHandler(responseData, callbackInfo) {
        if (responseData.success && responseData.roles) {
            _roles = responseData.roles.sort();
        }
        _resolve(callbackInfo.deferred, callbackInfo.callback, responseData.roles);
    }

    function _loadPasswordPoliciesResponseHandler(responseData, callbackInfo) {
        var deferred = callbackInfo.deferred;
        if (responseData.success === true) {
            deferred.resolve(PasswordPolicies.fromServerData(responseData.policy));
        } else {
            deferred.reject(responseData.status);
        }
    }

    function _loadUserListResponseHandler(responseData, callbackInfo) {
        var deferred = callbackInfo.deferred;
        if (responseData.success === true) {
            deferred.resolve(responseData.status, UserDataList.fromServerData(responseData.users)); 
        } else {
            deferred.reject(responseData.status);  
        }
    }

    function _loadUserDataResponseHandler(responseData, callbackInfo) {
        var deferred = callbackInfo.deferred;
        if (responseData.success === true) {
            deferred.resolve(UserData.fromServerData(responseData.userinfo));
        } else {
            deferred.reject(responseData.status);  
        }
    }

    function _addUserToMpUserXResponseHandler(responseData, callbackInfo) {
        var deferred = callbackInfo.deferred;
        if (responseData.success === true) {
            deferred.resolve(responseData.status);
        } else {
            deferred.reject(responseData.status);
        }
    }

    function _deleteUserFromMpUserXResponseHandler(responseData, callbackInfo) {
        var deferred = callbackInfo.deferred;
        if (responseData.success === true) {
            deferred.resolve(responseData.status);
        } else {
            deferred.reject(responseData.status);
        }
    }

    function _modifyUserFromMpUserXResponseHandler(responseData, callbackInfo) {
        var deferred = callbackInfo.deferred;
        if (responseData.success === true) {
            deferred.resolve(responseData.status);
        } else {
            deferred.reject(responseData.status);
        }
    }

    function _loadAvailableRolesResponseHandler(responseData, callbackInfo) {
        var deferred = callbackInfo.deferred;
        if (responseData.success === true) {
            deferred.resolve(responseData.roles);
        } else {
            deferred.reject(responseData.status);
        }
    }

    function _getUserSettingsFromMpUserXResponseHandler(responseData, callbackInfo) {
        var deferred = callbackInfo.deferred;
        if (responseData.success === true) {
            deferred.resolve(responseData.settings);
        } else {
            deferred.reject(responseData.status);
        }
    }

    function _changePasswordResponseHandler(responseData, callbackInfo) {
        if (responseData.success === true) {
            _deferChange.resolve(responseData.status, callbackInfo.userName);
            //brease.loggerService.log(Enum.EventLoggerId.CLIENT_USER_CHANGEPASSWORD_OK, Enum.EventLoggerCustomer.BUR, Enum.EventLoggerVerboseLevel.OFF, Enum.EventLoggerSeverity.SUCCESS, [callbackInfo.userName]);
        } else {
            _deferChange.reject(responseData.status, callbackInfo.userName);
            //brease.loggerService.log(Enum.EventLoggerId.CLIENT_USER_CHANGEPASSWORD_FAIL, Enum.EventLoggerCustomer.BUR, Enum.EventLoggerVerboseLevel.OFF, Enum.EventLoggerSeverity.ERROR, [callbackInfo.userName]);
        }
    }

    function _resolve(deferred, callback, result) {
        if (Utils.isFunction(callback)) {
            callback(result);
        }
        deferred.resolve(result);
    }

    function _load() {
        _runtimeService.addEventListener(SocketEvent.USER_CHANGED, _userChangedHandler);
        _runtimeService.loadCurrentUser(_initLoadUserResponseHandler);
    }

    function _initLoadUserResponseHandler(data) {
        if (data.success === true) {
            _currentUser = data.user;
            document.body.dispatchEvent(new CustomEvent(BreaseEvent.USER_LOADED, { detail: data.user }));

            // load user roles after initial user load
            $.when(
                User.loadUserRoles()
            ).then(function () {
                _deferredReady.resolve();
            });

        } else {
            _deferredReady.reject();
        }
    }

    function _authenticateResponseHandler(data) {

        if (data.success === true && data.user !== undefined && data.user.isAuthenticated === true) {
            _deferAuth.resolve(data.user);
            brease.loggerService.log(Enum.EventLoggerId.CLIENT_USER_AUTHENTICATE_OK, Enum.EventLoggerCustomer.BUR, Enum.EventLoggerVerboseLevel.OFF, Enum.EventLoggerSeverity.SUCCESS, [data.user.userID]);
        } else {
            _deferAuth.reject(data.user);
            brease.loggerService.log(Enum.EventLoggerId.CLIENT_USER_AUTHENTICATE_FAIL, Enum.EventLoggerCustomer.BUR, Enum.EventLoggerVerboseLevel.OFF, Enum.EventLoggerSeverity.ERROR, [data.user.userID]);
        }

    }

    function _setUserResponseHandler(data) {

        if (data.success === true) {
            _deferUser.resolve();
            brease.loggerService.log(Enum.EventLoggerId.CLIENT_USER_SETUSER_OK, Enum.EventLoggerCustomer.BUR, Enum.EventLoggerVerboseLevel.OFF, Enum.EventLoggerSeverity.SUCCESS);

        } else {
            _deferUser.reject();
            brease.loggerService.log(Enum.EventLoggerId.CLIENT_USER_SETUSER_FAIL, Enum.EventLoggerCustomer.BUR, Enum.EventLoggerVerboseLevel.OFF, Enum.EventLoggerSeverity.ERROR);
        }

    }

    function _getUserResponseHandler(data) {
        if (data.success) {
            _currentUser = data.user;
            _deferUser.resolve(data.user);
        } else {
            _deferUser.reject();
        }

    }

    function _userChangedHandler(e) {

        _currentUser = e.detail.user;

        // load user roles after user has changed
        $.when(
            User.loadUserRoles()
        ).then(function () {
            document.body.dispatchEvent(new CustomEvent(BreaseEvent.ROLES_CHANGED));
        });

        document.body.dispatchEvent(new CustomEvent(BreaseEvent.USER_CHANGED, { detail: _currentUser }));
        brease.loggerService.log(Enum.EventLoggerId.CLIENT_USER_USERCHANGE, Enum.EventLoggerCustomer.BUR, Enum.EventLoggerVerboseLevel.OFF, Enum.EventLoggerSeverity.INFORMATIONAL, [_currentUser.userID]);
    }

    return User;
});
