define(['brease/core/Utils'], function (Utils) {

    'use strict';

    /** 
    * @enum {String} brease.controller.objects.AssignType
    * @alternateClassName AssignType
    */
    /** 
    * @property {String} CONTENT='Content'
    */
    /** 
    * @property {String} PAGE='Page'
    */
    /** 
    * @property {String} VISU='Visu'
    */
    var Types = {};

    Utils.defineProperty(Types, 'CONTENT', 'Content');
    Utils.defineProperty(Types, 'PAGE', 'Page');
    Utils.defineProperty(Types, 'VISU', 'Visu');

    return Types;
});
