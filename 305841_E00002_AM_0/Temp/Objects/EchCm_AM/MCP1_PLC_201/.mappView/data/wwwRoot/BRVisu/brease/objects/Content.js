define(function () {

    'use strict';

    /**
    * @class brease.objects.Content
    * @alternateClassName Content
    * @extends Object
    */
    /**
    * @method constructor
    * Creates a new Content instance.
    * @param {String} id
    * @param {String} visuId
    * @param {Object} data
    */
    /**
    * @property {String} id
    */
    /**
    * @property {String} visuId
    */
    /**
    * @property {String} path
    */
    /**
    * @property {Integer} width
    */
    /**
    * @property {Integer} height
    */
    /**
    * @property {ContentStatus} state
    */
    /**
    * @property {Boolean} virtual
    */
    var Content = function (id, visuId, data) {
            this.id = id;
            this.visuId = visuId;
            if (data && data.path !== undefined) {
                this.path = data.path;
            }
            if (data && data.virtual !== undefined) {
                this.virtual = data.virtual;
            }
            this.width = (data && data.width !== undefined) ? parseInt(data.width, 10) : defaults.width;
            this.height = (data && data.height !== undefined) ? parseInt(data.height, 10) : defaults.height;

            this.configurations = data.configurations;
        },
        defaults = {
            width: 800,
            height: 600
        };

    // id, which is used to identify content on server side, e.g. for activateContent
    Object.defineProperty(Content.prototype, 'serverId', {
        get: function () {
            return this.id;
        },
        enumerable: false,
        configurable: false
    });

    return Content;

});
