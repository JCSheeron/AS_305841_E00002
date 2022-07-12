define(function () {

    'use strict';

    /**
    * @class brease.objects.Assignment
    * @alternateClassName Assignment
    */
    /**
    * @method constructor
    * Creates a new Assignment instance.
    * @param {String} contentId
    * @param {String} areaId
    * @param {String} type AssignType, possible values 'Content','Page','Visu'
    */

    /**
    * @property {String} contentId
    */
    /**
    * @property {String} areaId  
    * areaId as projected in Page XML
    */
    /**
    * @property {AssignType} type
    */
    var Assignment = function (contentId, areaId, type) {
        this.contentId = contentId;
        this.areaId = areaId;
        this.type = type;
    };

    return Assignment;

});
