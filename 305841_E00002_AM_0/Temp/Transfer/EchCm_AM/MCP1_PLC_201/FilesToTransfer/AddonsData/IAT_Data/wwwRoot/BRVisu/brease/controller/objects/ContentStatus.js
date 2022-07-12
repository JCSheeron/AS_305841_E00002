define(['brease/enum/EnumObject'], function (EnumObject) {

    'use strict';

    /** 
    * @enum {Number} brease.controller.objects.ContentStatus
    * @alternateClassName ContentStatus
    */
    /** 
    * @property {Number} notExistent=-3
    */
    /** 
    * @property {Number} aborted=-2.5
    */
    /** 
    * @property {Number} deactivated=-2
    */
    /** 
    * @property {Number} deactivatePending=-1
    */
    /** 
    * @property {Number} initialized=0
    */
    /** 
    * @property {Number} inQueue=0.5
    */
    /** 
    * @property {Number} activatePending=1
    */
    /** 
    * @property {Number} active=2
    */
    /**
    * @property {Number} preCached=3
    */
    var ContentStatus = new EnumObject({
        notExistent: -3,
        aborted: -2.5,
        deactivated: -2,
        deactivatePending: -1,
        initialized: 0,
        inQueue: 0.5,
        activatePending: 1,
        active: 2,
        preCached: 3
    });

    return ContentStatus;
});
