define(function () {

    'use strict';

    /**
    * @class brease.objects.Subscription
    * @alternateClassName Subscription
    * @extends Object
    */
    /**
    * @property {String} elemId
    */
    /**
    * @property {String} attribute
    */
    /**
    * @property {String} contentId
    */
    /**
    * @property {Boolean} [active]
    */
    /**
    * @property {Boolean} [dynamic]
    */
    var Subscription = function (elemId, attribute, contentId) {
        this.elemId = elemId;
        this.attribute = attribute;
        this.contentId = contentId;
    };

    /**
    * @method fromServerData
    * @static
    * @param {Object} data server data: {refId:'id of widget element',attribute:'name of attribute'}
    * @param {String} contentId
    * @return {Subscription}
    */
    Subscription.fromServerData = function (data, contentId) {
        var subscription = new Subscription(data.refId, data.attribute, contentId);
        if (data.dynamic !== undefined) {
            subscription.dynamic = !!(data.dynamic);
        }
        if (data.active !== undefined) {
            subscription.active = !!(data.active);
        }
        if (data.count !== undefined) {
            subscription.count = parseInt(data.count, 10);
        }
        return subscription;
    };

    /**
    * @method toServerData
    * @static
    * @param {Subscription} subscription
    * @param {core.datatype.ANY} value
    * @return {Object}
    */

    Subscription.toServerData = function (subscription, value) {
        return {
            refId: subscription.elemId,
            data: [{
                attribute: subscription.attribute,
                value: value
            }]
        };
    };

    Subscription.isValid = function (subscription) {
        return subscription !== undefined && subscription.elemId !== undefined && subscription.attribute !== undefined && subscription.contentId !== undefined;
    };

    return Subscription;
});
