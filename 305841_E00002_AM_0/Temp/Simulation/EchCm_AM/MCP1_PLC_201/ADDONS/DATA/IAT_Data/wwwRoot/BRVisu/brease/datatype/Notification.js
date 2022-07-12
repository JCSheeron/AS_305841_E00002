define(function () {

    'use strict';

    /**
    * @class brease.datatype.Notification
    * @extends Object
    * Notification for changes of Big Data
    */
    /**
    * @property {String} action (optional)
    */
    /**
    * @property {Number} row (optional)
    */

    var Notification = function (action, row) {
            this.action = action;
            this.row = row;
        },

        p = Notification.prototype;

    p.setAction = function (action) {
        this.action = action;
    };

    p.getAction = function () {
        return this.action;
    };

    p.setRow = function (row) {
        this.row = row;
    };

    p.getRow = function () {
        return this.row;
    };

    return Notification;

});
