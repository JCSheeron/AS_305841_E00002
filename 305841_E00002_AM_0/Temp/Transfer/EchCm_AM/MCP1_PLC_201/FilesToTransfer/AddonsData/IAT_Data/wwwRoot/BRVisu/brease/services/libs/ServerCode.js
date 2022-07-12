define(['brease/enum/EnumObject'], function (EnumObject) {

    'use strict';

    /** 
    * @enum {Number} brease.services.libs.ServerCode
    * @alternateClassName ServerCode
    */
    /** 
    * @property {Number} SUCCESS=0
    */
    /** 
    * @property {Number} NO_FURTHER_SESSION=2148073484
    */
    /** 
    * @property {Number} MAX_CLIENTS=2148139020
    */
    /** 
    * @property {Number} NOT_ENOUGH_LICENSES=2148204556
    */
    /** 
    * @property {Number} NO_LICENSE=2148270092
    */
    /** 
    * @property {Number} GENERIC_CONNECTION_FAILED=-1
    */
    var ServerCode = new EnumObject({
        SUCCESS: 0,
        NO_FURTHER_SESSION: 2148073484,
        MAX_CLIENTS: 2148139020,
        NOT_ENOUGH_LICENSES: 2148204556,
        NO_LICENSE: 2148270092,
        GENERIC_CONNECTION_FAILED: -1
    });

    return ServerCode;
});
