define(['brease/enum/Enum'], function (Enum) {

    'use strict';

    /**
    * @class widgets.brease.common.DragDropProperties.libs.HideDraggablePropertiesEvents
    * @extends core.javascript.Object
    */

    /**
    * @cfg {Boolean} draggable=false
    * @iatCategory Behavior
    * Make widget draggable.
    */

    /**
    * @event OnDragStart
    * Fired when element has OnDragStart.
    * @param {String} contentId content id of the widget where the drag operation has been started
    * @param {String} widgetId id of the widget where the drag operation has been started
    * @eventComment
    */

    /**
    * @event OnDragEnd
    * Fired when element has OnDragEnd.
    * @param {String} contentId content id of the widget where the drag operation has ended
    * @param {String} widgetId id of the widget where the drag operation has ended
    * @eventComment
    */

    var DraggablePropertiesEvents = {
    };

    return DraggablePropertiesEvents;
});
