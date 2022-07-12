define(function () {

    'use strict';
    /**
    * @class system.widgets.ChangePasswordDialog.libs.Message
    * @extends Object
    */
    /**
    * @method constructor
    * Creates a new Message instance.
    * @param {String} content
    * @param {String} type
    */
    /**
    * @property {String} content
    */
    /**
    * @property {String} type
    */

    function Message(content, type) {
        this.content = content || '';
        this.type = type || Message.Type.INFO;
    }

    /**
    * @property {Object} Type
    * @property {String} Type.SUCCESS='success'
    * @property {String} Type.INFO='info'
    * @property {String} Type.WARNING='warning'
    * @property {String} Type.ERROR='error'
    * @readonly
    * @static
    */
    Object.defineProperty(Message, 'Type', { enumerable: true,
        configurable: false,
        writable: false,
        value: {
            SUCCESS: 'success',
            INFO: 'info',
            WARNING: 'warning',
            ERROR: 'error'
        } });

    return Message;
});
