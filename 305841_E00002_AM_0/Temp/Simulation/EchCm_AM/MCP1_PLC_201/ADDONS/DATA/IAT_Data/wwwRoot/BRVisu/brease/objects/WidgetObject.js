define(function () {

    'use strict';

    /**
    * @class brease.objects.WidgetObject
    * @alternateClassName WidgetObject
    * @extends Object
    */
    /**
    * @method constructor
    * Creates a new WidgetObject instance.
    * @param {String} id
    * @param {ContentReference} contentId
    * @param {brease.enum.WidgetState} state
    * @param {brease.enum.WidgetState} suspendedState
    * @param {Object} widget
    * @param {Object} options
    */
    /**
    * @property {String} id
    */
    /**
    * @property {ContentReference} contentId
    */
    /**
    * @property {brease.enum.WidgetState} state
    */
    /**
    * @property {brease.enum.WidgetState} suspendedState
    */
    /**
    * @property {Object} widget
    */
    /**
    * @property {Object} options
    */
    var WidgetObject = function (data) {
        var self = this;
        ['id', 'contentId', 'state', 'suspendedState', 'options', 'widget'].forEach(function (key) {
            if (data[key] !== undefined) {
                self[key] = data[key]; 
            }
        });
    };
    
    WidgetObject.prototype.toJSON = function () {
        var info = {},
            self = this;
        ['id', 'contentId', 'state', 'suspendedState', 'options'].forEach(function (key) {
            if (self[key] !== undefined) {
                info[key] = self[key]; 
            }
        });
        info.widget = (this.widget) ? '[object widget]' : ((this.widget === null) ? 'null' : 'undefined');
        return info;
    };
    
    return WidgetObject;

});
