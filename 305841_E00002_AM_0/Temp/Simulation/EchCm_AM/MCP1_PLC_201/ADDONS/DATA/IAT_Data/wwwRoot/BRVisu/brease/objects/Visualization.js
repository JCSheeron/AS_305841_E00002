define(['brease/controller/objects/VisuStatus'], function (VisuStatus) {

    'use strict';

    /**
    * @class brease.objects.Visualization
    * @alternateClassName Visualization
    */
    /**
    * @method constructor
    * Creates a new Visualization instance.
    * @param {String} id
    * @param {String} startPage
    * @param {String} containerId
    */

    /**
    * @property {String} id
    */
    /**
    * @property {String} startPage
    */
    /**
    * @property {String} containerId
    */
    /**
    * @property {VisuStatus} status
    */
    /**
    * @property {Boolean} active
    */
    /**
    * @property {Number} zoomFactor
    */
    var Visualization = function (id, startPage, containerId) {
        this.id = id;
        this.startPage = startPage;
        this.status = VisuStatus.LOADED;
        this.containerId = containerId;       
    };

    return Visualization;

});
