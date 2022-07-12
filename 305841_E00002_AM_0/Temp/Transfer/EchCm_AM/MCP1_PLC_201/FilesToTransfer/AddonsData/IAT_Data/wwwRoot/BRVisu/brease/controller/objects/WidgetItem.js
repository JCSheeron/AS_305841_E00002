define(function () {

    'use strict';

    /**
    * @class brease.objects.WidgetItem
    * @alternateClassName WidgetItem
    * @extends brease.objects.Item
    */
    /**
    * @method constructor
    * Creates a new WidgetItem instance.
    * @param {core.html.Node} node
    * @param {brease.enum.WidgetState} state
    * @param {String} contentId
    */
    /**
    * @property {String} id
    */
    /**
    * @property {HTMLElement} elem
    */
    /**
    * @property {brease.enum.WidgetState} state
    */
    /**
    * @property {String} parentContentId
    */
    var WidgetItem = function (node, state, contentId) {
        this.id = node.id;
        this.elem = node;
        this.state = state;
        this.parentContentId = contentId;
    };

    return WidgetItem;

});

/**
* @class brease.objects.Item
* @alternateClassName Item
* @extends Object
* @embeddedClass
* @virtualNote 
*/
/**
* @property {String} id
*/
