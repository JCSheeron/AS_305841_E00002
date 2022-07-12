define(['brease/core/Types'], function (Types) {

    'use strict';

    /**
    * @class brease.services.libs.UserData
    * @alternateClassName UserData
    * @extends Object
    */
    /**
    * @method constructor
    * Creates a new UserData instance.
    * @param {String} userName
    * @param {String} fullName
    * @param {String[]} roles
    * @param {Integer} userLevel
    * @param {Boolean} isAdmin
    * @param {Boolean} isLocked
    * @param {String} lastLogin
    * @param {String} password
    */

    /**
    * @property {String} userName
    * Meaning: userName has to be a unique name.
    */
    /**
   * @property {String} fullName
   * Meaning:  fullName contains first name and lastname
   */
    /**
    * @property {String[]} roles
    * Meaning:  roles contains the assigned roles of the user
    */
    /**
    * @property {Integer} userLevel
    * Meaning:  userLevel contains the assigned level of the user.
    * The level provides information about the access authorisations.
    */
    /**
    * @property {Boolean} isAdmin
    * Meaning:  isAdmin returns TRUE if the user is assigned the Administrator role otherwise FALSE
    */
    /**
    * @property {Boolean} isLocked
    * Meaning:  isLocked returns TRUE if the user is locked otherwise FALSE
    */
    /**
    * @property {String} lastLogin 
    * Meaning:  lastLogin contains the date and time when the user was last logged in.
    */

    /**
   * @property {String} password
   * Meaning:  password contains the password entered.
   */

    var UserData = function (userName, password, fullName, roles, userLevel, isAdmin, isLocked, lastLogin) {
        this.userName = userName;
        this.fullName = fullName;
        this.roles = roles;
        this.isAdmin = isAdmin === true;
        this.userLevel = Types.parseValue(userLevel, 'Integer', { default: 0 });
        this.isLocked = isLocked === true;
        this.lastLogin = lastLogin;
        this.password = password;

    };

    UserData.fromServerData = function (data) {
        if (data) {
            return new UserData(data.userName, data.password, data.fullName, data.roles, data.userLevel, data.isAdmin, data.isLocked, data.lastLogin);
        } else {
            return new UserData();
        }
    };

    return UserData;
});
