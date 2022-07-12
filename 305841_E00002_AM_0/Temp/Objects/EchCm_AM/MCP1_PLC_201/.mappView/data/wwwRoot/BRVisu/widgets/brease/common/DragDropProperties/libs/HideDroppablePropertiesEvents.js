define(['brease/enum/Enum'], function (Enum) {

    'use strict';

    /**
    * @class widgets.brease.common.DragDropProperties.libs.HideDroppablePropertiesEvents
    * @extends core.javascript.Object
    */

    /**
    * @cfg {Boolean} droppable=true
    * @iatCategory Behavior
    * Make widget droppable.
    */

    /**
    * @event OnDragEnter
    * Fired when element has onDragEnter.
    * @param {String} contentId content id of the widget that has been entering the droppable widget
    * @param {String} widgetId id of the widget that has been entering the droppable widget
    * @eventComment
    */

    /**
    * @event OnDragLeave
    * Fired when element has OnDragLeave.
    * @param {String} contentId content id of the widget that has been leaving the droppable widget
    * @param {String} widgetId id of the widget that has been leaving the droppable widget
    * @eventComment
    */

    /**
    * @event OnDrop
    * Fired when element has OnDrop.
    * @param {String} contentId content id of the widget that has been dropped on the droppable widget
    * @param {String} widgetId id of the widget that has been dropped on the droppable widget
    * @eventComment
    */

    var DroppablePropertiesEvents = {
    };

    return DroppablePropertiesEvents;
});
