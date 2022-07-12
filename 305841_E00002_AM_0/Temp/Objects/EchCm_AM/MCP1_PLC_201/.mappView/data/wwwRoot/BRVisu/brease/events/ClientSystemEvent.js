define(['brease/core/Utils'], function (Utils) {

    'use strict';

    /** 
    * @enum {String} brease.events.ClientSystemEvent 
    */
    
    /**
    * @property {String} CONTENT_LOADED='ContentLoaded'
    * @readonly
    * @static
    * Fired when all widgets of content are parsed (init, BreaseEvent.CONTENT_PARSED) and sendInitialValues is done (BreaseEvent.FRAGMENT_SHOW) and CONTENT_ACTIVATED is done
    */
    /**
    * @property {String} DISABLED_CLICK='DisabledClick'
    * @readonly
    * @static
    */
    /**
    * @property {String} DIALOG_CLOSED='DialogClosed'
    * @readonly
    * @static
    */
    /**
    * @property {String} DIALOG_OPENED='DialogOpened'
    * @readonly
    * @static
    */
    /**
    * @property {String} KEY_DOWN='KeyDown'
    * @readonly
    * @static
    */
    /**
    * @property {String} KEY_PRESS='KeyPress'
    * @readonly
    * @static
    */
    /**
    * @property {String} KEY_UP='KeyUp'
    * @readonly
    * @static
    */
    /**
    * @property {String} LOGIN_FAILED='LoginFailed'
    * @readonly
    * @static
    */
    /**
    * @property {String} LOGIN_SUCCESS='LoginSuccess'
    * @readonly
    * @static
    */
    /**
    * @property {String} SYSTEM_SWIPE='SystemSwipe'
    * @readonly
    * @static
    */
    /**
    * @property {String} TOOLTIPMODE_ACTIVATED='TooltipModeActivated'
    * @readonly
    * @static
    */
    /**
    * @property {String} TOOLTIPMODE_DEACTIVATED='TooltipModeDeactivated'
    * @readonly
    * @static
    */
    /**
    * @property {String} CHANGEPASSWORDDIALOG_CLOSED='ChangePasswordDialogClosed'
    * @readonly
    * @static
    */
    var ClientSystemEvent = {};

    Utils.defineProperty(ClientSystemEvent, 'CONTENT_LOADED', 'ContentLoaded');
    Utils.defineProperty(ClientSystemEvent, 'DISABLED_CLICK', 'DisabledClick');
    Utils.defineProperty(ClientSystemEvent, 'DIALOG_CLOSED', 'DialogClosed');
    Utils.defineProperty(ClientSystemEvent, 'DIALOG_OPENED', 'DialogOpened');
    Utils.defineProperty(ClientSystemEvent, 'KEY_DOWN', 'KeyDown');
    Utils.defineProperty(ClientSystemEvent, 'KEY_PRESS', 'KeyPress');
    Utils.defineProperty(ClientSystemEvent, 'KEY_UP', 'KeyUp');
    Utils.defineProperty(ClientSystemEvent, 'LOGIN_FAILED', 'LoginFailed');
    Utils.defineProperty(ClientSystemEvent, 'LOGIN_SUCCESS', 'LoginSuccess');
    Utils.defineProperty(ClientSystemEvent, 'SYSTEM_SWIPE', 'SystemSwipe');
    Utils.defineProperty(ClientSystemEvent, 'TOOLTIPMODE_ACTIVATED', 'TooltipModeActivated');
    Utils.defineProperty(ClientSystemEvent, 'TOOLTIPMODE_DEACTIVATED', 'TooltipModeDeactivated');
    Utils.defineProperty(ClientSystemEvent, 'CHANGEPASSWORDDIALOG_CLOSED', 'ChangePasswordDialogClosed');
    return ClientSystemEvent;

});
