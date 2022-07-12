define(['brease/core/Utils'], function (Utils) {

    'use strict';

    /** 
    * @enum {String} brease.services.libs.ServerCommand
    * @alternateClassName ServerCommand
    */
    /** 
    * @property {String} ACTION='action'
    */
    /** 
    * @property {String} ACTION_RESPONSE='actionResponse'
    */
    /** 
    * @property {String} EVENT='event'
    */
    /** 
    * @property {String} UPDATE='update'
    */
    /** 
    * @property {String} GET_UPDATE='getUpdate'
    */
    /** 
    * @property {String} SYSTEM='system'
    */
    /** 
    * @property {String} ACTIVATE_CONTENT='activateContent'
    */
    /**
    * @property {String} DEACTIVATE_CONTENT='deactivateContent'
    */
    /** 
    * @property {String} SUBSCRIBE='subscribe'
    */
    /**
    * @property {String} UNSUBSCRIBE='unsubscribe'
    */
    var Command = {};

    Utils.defineProperty(Command, 'ACTION', 'action');
    Utils.defineProperty(Command, 'ACTION_RESPONSE', 'actionResponse');
    Utils.defineProperty(Command, 'EVENT', 'event'); // both directions
    Utils.defineProperty(Command, 'UPDATE', 'update'); // from client to server
    Utils.defineProperty(Command, 'GET_UPDATE', 'getUpdate'); // from server to client
    Utils.defineProperty(Command, 'SYSTEM', 'system');
    Utils.defineProperty(Command, 'ACTIVATE_CONTENT', 'activatecontent'); // both directions //Attention: property and value are different
    Utils.defineProperty(Command, 'DEACTIVATE_CONTENT', 'deactivatecontent'); // both directions //Attention: property and value are different
    Utils.defineProperty(Command, 'SUBSCRIBE', 'subscribe'); // from server to client
    Utils.defineProperty(Command, 'UNSUBSCRIBE', 'unsubscribe'); // from server to client

    return Command;
});
