define(['brease/core/Utils'], function (Utils) {

    'use strict';

    /**
    * @class brease.objects.Page
    * @alternateClassName Page
    * @extends Object
    */
    /**
    * @method constructor
    * Creates a new Page instance.
    * @param {String} id
    * @param {PageType} type
    * @param {String} visuId
    * @param {Object} data
    */
    /**
    * @property {String} id
    */
    /**
    * @property {String} visuId
    * id of visu where page belongs to
    */
    /**
    * @property {String} layout
    * layoutId as projected in page xml
    */
    /**
    * @property {PageType} type
    */
    /**
    * @property {Object} assignments
    */
    var Page = function (id, type, visuId, data) {
        for (var key in data) {
            if (key !== 'assignments') {
                this[key] = data[key];
            }
        }
        this.id = id;
        this.visuId = visuId;
        this.type = type;
        
        this.assignments = Utils.arrayToObject(data.assignments, 'areaId');

    };

    return Page;

});
