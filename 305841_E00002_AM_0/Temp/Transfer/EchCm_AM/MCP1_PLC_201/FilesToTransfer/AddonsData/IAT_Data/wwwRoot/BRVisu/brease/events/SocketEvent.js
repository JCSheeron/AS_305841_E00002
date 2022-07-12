define(['brease/core/Utils'], function (Utils) {

    'use strict';

    /** 
    * @enum {String} brease.events.SocketEvent
    */
    
    /**
    * @property {String} CONTENT_ACTIVATED='ContentActivated'
    * @readonly
    * @static
    */
    /**
    * @property {String} CONTENT_DEACTIVATED='ContentDeactivated'
    * @readonly
    * @static
    */
    /**
    * @property {String} LANGUAGE_CHANGED='LanguageChanged'
    * @readonly
    * @static
    */
    /**
    * @property {String} MEASUREMENT_SYSTEM_CHANGED='MeasurementSystemChanged'
    * @readonly
    * @static
    */
    /**
    * @property {String} PROPERTY_VALUE_CHANGED='PropertyValueChanged'
    * @readonly
    * @static
    */
    /**
    * @property {String} SESSION_ACTIVATED='SessionActivated'
    * @readonly
    * @static
    */
    /**
    * @property {String} CONNECTION_STATE_CHANGED='ConnectionStateChanged'
    * @readonly
    * @static
    */
    /**
    * @property {String} TRANSFER_START='TransferStart'
    * @readonly
    * @static
    */
    /**
    * @property {String} TRANSFER_FINISH='TransferFinish'
    * @readonly
    * @static
    */
    /**
    * @property {String} USER_CHANGED='UserChanged'
    * @readonly
    * @static
    */
    /**
    * @property {String} VISU_ACTIVATED='VisuActivated'
    * @readonly
    * @static
    */
    /**
    * @property {String} VISU_DEACTIVATED='VisuDeactivated'
    * @readonly
    * @static
    */
    /** 
    * @property {String} ACTION='action'
    * @readonly
    * @static
    */
    /** 
    * @property {String} SUBSCRIBE='subscribe'
    * @readonly
    * @static
    */
    /**
    * @property {String} UNSUBSCRIBE='unsubscribe'
    * @readonly
    * @static
    */
    /**
    * @property {String} WATCHDOG_TIMEOUT='WatchdogTimeout'
    * @readonly
    * @static
    */
    /**
    * @property {String} PONG='Pong'
    * @readonly
    * @static
    */

    var SocketEvent = {};

    Utils.defineProperty(SocketEvent, 'CONTENT_ACTIVATED', 'ContentActivated');
    Utils.defineProperty(SocketEvent, 'CONTENT_DEACTIVATED', 'ContentDeactivated');
    Utils.defineProperty(SocketEvent, 'LANGUAGE_CHANGED', 'LanguageChanged');
    Utils.defineProperty(SocketEvent, 'MEASUREMENT_SYSTEM_CHANGED', 'MeasurementSystemChanged');
    Utils.defineProperty(SocketEvent, 'PROPERTY_VALUE_CHANGED', 'PropertyValueChanged');
    Utils.defineProperty(SocketEvent, 'SESSION_ACTIVATED', 'SessionActivated');
    Utils.defineProperty(SocketEvent, 'CONNECTION_STATE_CHANGED', 'ConnectionStateChanged');
    Utils.defineProperty(SocketEvent, 'TRANSFER_START', 'TransferStart');
    Utils.defineProperty(SocketEvent, 'TRANSFER_FINISH', 'TransferFinish');
    Utils.defineProperty(SocketEvent, 'USER_CHANGED', 'UserChanged');
    Utils.defineProperty(SocketEvent, 'VISU_ACTIVATED', 'VisuActivated');
    Utils.defineProperty(SocketEvent, 'VISU_DEACTIVATED', 'VisuDeactivated');
    Utils.defineProperty(SocketEvent, 'ACTION', 'action');
    Utils.defineProperty(SocketEvent, 'SUBSCRIBE', 'subscribe');
    Utils.defineProperty(SocketEvent, 'UNSUBSCRIBE', 'unsubscribe');
    Utils.defineProperty(SocketEvent, 'WATCHDOG_TIMEOUT', 'WatchdogTimeout');
    Utils.defineProperty(SocketEvent, 'PONG', 'Pong');

    return SocketEvent;

});
