define(['brease/objects/Area'], function (Area) {

    'use strict';

    /**
    * @class brease.objects.Layout
    * @alternateClassName Layout
    * @extends Object
    */
    /**
    * @method constructor
    * Creates a new Layout instance.
    * @param {String} id
    * @param {Number} width
    * @param {Number} height
    */
    /**
    * @property {String} id
    */
    /**
    * @property {Number} width
    */
    /**
    * @property {Number} height
    */
    /**
    * @property {Object} areas
    * each {@link brease.objects.Area} is stored under the name of its id
    */
    var Layout = function (id, width, height, areas) {
        
        this.id = id;
        this.width = width;
        this.height = height;
        this.areas = {};
        for (var areaId in areas) {
            this.areas[areaId] = new Area(areaId, areas[areaId]);
        }
    };

    return Layout;

});
