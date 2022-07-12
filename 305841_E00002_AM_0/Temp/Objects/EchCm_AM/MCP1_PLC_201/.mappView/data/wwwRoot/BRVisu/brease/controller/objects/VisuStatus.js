define(['brease/core/Utils'], function (Utils) {

    'use strict';

    /** 
    * @enum {String} brease.controller.objects.VisuStatus
    * @alternateClassName VisuStatus
    */
    /** 
    * @property {String} LOADED='LOADED'
    */
    /** 
    * @property {String} MALFORMED='MALFORMED'
    */
    /** 
    * @property {String} NOT_FOUND='NOT_FOUND'
    */
    /** 
    * @property {String} ACTIVATE_FAILED='ACTIVATE_FAILED'
    */

    var VisuStatus = {};

    Utils.defineProperty(VisuStatus, 'LOADED', 'LOADED');
    Utils.defineProperty(VisuStatus, 'MALFORMED', 'MALFORMED');
    Utils.defineProperty(VisuStatus, 'NOT_FOUND', 'NOT_FOUND');
    Utils.defineProperty(VisuStatus, 'ACTIVATE_FAILED', 'ACTIVATE_FAILED');

    return VisuStatus;
});
