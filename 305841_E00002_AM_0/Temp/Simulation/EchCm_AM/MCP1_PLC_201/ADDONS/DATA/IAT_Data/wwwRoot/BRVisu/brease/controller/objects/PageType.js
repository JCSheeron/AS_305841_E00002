define(['brease/core/Utils'], function (Utils) {

    'use strict';

    /** 
    * @enum {String} brease.controller.objects.PageType
    * @alternateClassName PageType
    */
    /** 
    * @property {String} PAGE='Page'
    */
    /** 
    * @property {String} DIALOG='Dialog'
    */
    var Type = {};

    Utils.defineProperty(Type, 'PAGE', 'Page');
    Utils.defineProperty(Type, 'DIALOG', 'Dialog');

    return Type;
});
