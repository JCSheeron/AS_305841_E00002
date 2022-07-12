define(['brease/core/Utils'], function (Utils) {

    'use strict';

    /** 
    * @enum {String} brease.datatype.ZoomType
    * @alternateClassName ZoomType
    */
    /** 
    * @property {String} original
    */
    /** 
    * @property {String} contain
    */
    /** 
    * @property {String} cover
    */
    var ZoomType = {};

    Utils.defineProperty(ZoomType, 'original', 'original');
    Utils.defineProperty(ZoomType, 'contain', 'contain');
    Utils.defineProperty(ZoomType, 'cover', 'cover');

    return ZoomType;
});
