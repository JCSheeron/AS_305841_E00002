define(['brease/services/libs/Userdata'], function (UserData) {

    'use strict';

    /**
    * @class brease.services.libs.UserDataList
    * @alternateClassName UserDataList
    * @extends Object
    */
    /**
    * @method constructor
    * Creates a new UserDataList instance.
    * @param {Object[]} userList
    */
    /** 
     * @property {UserData[]} userData
     * Meaning:  
     */

    var UserDataList = function (userList) {
        this.userData = [];
        if (userList !== undefined && Array.isArray(userList)) {
            for (var i = 0; i < userList.length; i++) {
                this.userData[i] = new UserData(userList[i].userName, userList[i].password, userList[i].fullName, userList[i].roles, userList[i].userLevel, userList[i].isAdmin, userList[i].isLocked, userList[i].lastLogin);
            }
        }
    };

    /**
    * @method fromServerData
    * Convert server response array to a UserList instance
    * @static
    * @param {Array} data server data
    */
    UserDataList.fromServerData = function (data) {

        if (data && Array.isArray(data)) {
            return new UserDataList(data);
        } else {
            return new UserDataList();
        }
    };
    return UserDataList;
});
