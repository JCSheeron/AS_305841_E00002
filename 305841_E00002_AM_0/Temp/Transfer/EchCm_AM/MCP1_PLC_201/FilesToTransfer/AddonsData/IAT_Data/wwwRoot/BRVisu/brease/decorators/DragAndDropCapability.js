define(['brease/core/Decorator', 'brease/core/Utils', 'brease/events/BreaseEvent', 'brease/enum/Enum',
    'brease/decorators/libs/DragAndDropManager'],
function (Decorator, Utils, BreaseEvent, Enum, DragAndDropManager) {

    'use strict';

    var DragAndDropCapability = function DragAndDropCapability() {
            this.initType = Decorator.TYPE_PRE;
        },
        dependency = 'dragAndDrop';

    /**
    * @class brease.decorators.DragAndDropCapability
    * @extends brease.core.Decorator
    * #Description
    * A decorator class to add drag and drop functionality to widgets.
    * ##Example:
    *
    *     define(['brease/core/BaseWidget', 'brease/decorators/DragAndDropCapability'],
    *           function (SuperClass, DragAndDropCapability) {
    *     
    *        var WidgetClass = SuperClass.extend(function () {
    *           SuperClass.apply(this, arguments);
    *        }, defaultSettings),
    *            [...]
    *
    *        return DragAndDropCapability.decorate(WidgetClass);
    *     });
    *
    *
    * @iatMeta studio:visible
    * false
    */

    /**
    * @method decorate
    * decorate a widget class with functionality of drag and drop capabilities
    * @param {brease.core.WidgetClass} widgetClass
    * @param {Boolean} initialDependency Initial dependency of widget instances
    * @return {brease.core.WidgetClass} returns decorated WidgetClass
    */
    DragAndDropCapability.prototype = new Decorator();
    DragAndDropCapability.prototype.constructor = DragAndDropCapability;

    var decoratorInstance = new DragAndDropCapability();

    /**
    * @property {Object} methodsToAdd
    * @property {Function} methodsToAdd.setDragAndDropCapability
    * @property {Boolean} methodsToAdd.setDragAndDropCapability.flag
    * Enable or disable drag and drop dependency; dependent widgets listen to drag and drop operations
    */
    decoratorInstance.methodsToAdd = {
        init: function () {
            this.dependencies[dependency] = {
                state: Enum.Dependency.INACTIVE,
                suspend: suspend.bind(this),
                wake: wake.bind(this)
            };
            if (!brease.config.editMode) {
                // initialize drag and drop manager if not yet done
                if (!DragAndDropManager.isActive()) {
                    DragAndDropManager.init();
                }

                // all widgets are droppable
                if (typeof this.settings.droppable !== 'undefined' && this.settings.droppable === false) {
                    this.setDroppable(false);
                } else {
                    this.setDroppable(true);
                }

                // configured during design time on the instance
                if (typeof this.settings.draggable === 'boolean') {
                    this.setDraggable(this.settings.draggable);
                }

                this.dependencies[dependency].state = Enum.Dependency.ACTIVE;
            }
        },
        /**
        * @method setDraggable
        * define if widget is draggable
        * @param {Boolean} flag if true class draggableItem is applied to indicate that dragging is supported
        */
        setDraggable: function (flag) {
            if (flag) {
                Utils.addClass(this.elem, 'draggableItem');
            }
        },
        /**
        * @method setDroppable
        * define if draggable items can be dropped on the widget
        * @param {Boolean} flag if true class droppableItem is applied to indicate that dragged items can be dropped
        */
        setDroppable: function (flag) {
            if (flag) {
                Utils.addClass(this.elem, 'droppableItem');
            }
        },

        dispose: function () {
            this.dependencies[dependency] = null;
        },

        /**
        * @method dragStartHandler
        * called by the DragAndDropManager if drag operation started
        * @param {Object} args arguments for dispatching the event to the server
        */
        dragStartHandler: function (args) {
            //console.log('dragStartHandler:', this.elem.id);
            var result;
            if (typeof this._dragStartHandler === 'function') {
                result = this._dragStartHandler(args);
            } 
            // dispatch the event to the server in order to use it in the action and event system
            this.dispatchServerEvent(BreaseEvent.ONDRAG_START, { contentId: args.contentId, widgetId: Utils.getWidgetId(args.contentId, args.id) });
            return result;
        },
        /**
        * @method dragEndHandler
        * called by the DragAndDropManager when drag operation is finished
        * @param {Object} args arguments for dispatching the event to the server
        */
        dragEndHandler: function (args) {
            // dispatch the event to the server in order to use it in the action and event system
            this.dispatchServerEvent(BreaseEvent.ONDRAG_END, { contentId: args.contentId, widgetId: Utils.getWidgetId(args.contentId, args.id) });
        },
        /**
        * @method dragEnterHandler
        * called by the DragAndDropManager when draggable item entered
        * @param {Object} args arguments for dispatching the event to the server
        */
        dragEnterHandler: function (args) {
            //console.log('dragEnterHandler:', this.elem.id, 'args:', args);
            // dispatch the event to the server in order to use it in the action and event system
            this.dispatchServerEvent(BreaseEvent.ONDRAG_ENTER, { contentId: args.contentId, widgetId: Utils.getWidgetId(args.contentId, args.id) });
        },
        /**
        * @method dragLeaveHandler
        * called by the DragAndDropManager when draggable item leaves
        * @param {Object} args arguments for dispatching the event to the server
        */
        dragLeaveHandler: function (args) {
            //console.log('dragLeaveHandler:', this.elem.id, 'args:', args);
            // dispatch the event to the server in order to use it in the action and event system
            this.dispatchServerEvent(BreaseEvent.ONDRAG_LEAVE, { contentId: args.contentId, widgetId: Utils.getWidgetId(args.contentId, args.id) });
        },
        /**
        * @method dropHandler
        * called by the DragAndDropManager when draggable item was dropped
        * @param {Object} args arguments for dispatching the event to the server
        */
        dropHandler: function (args) {
            //console.log('dropHandler:', this.elem.id, 'args:', args);
            var result;
            if (typeof this._dropHandler === 'function') {
                result = this._dropHandler(args);
            }
            // dispatch the event to the server in order to use it in the action and event system
            this.dispatchServerEvent(BreaseEvent.ONDROP, { contentId: args.contentId, widgetId: Utils.getWidgetId(args.contentId, args.id) });
            return result;
        }
    };

    function suspend() {
        if (this.dependencies[dependency].state === Enum.Dependency.ACTIVE) {
            setState.call(this, Enum.Dependency.SUSPENDED);
        }
    }

    function wake() {
        if (this.dependencies[dependency].state === Enum.Dependency.SUSPENDED) {
            setState.call(this, Enum.Dependency.ACTIVE);
        }
    }

    function setState(state) {
        if (this.dependencies[dependency]) {
            this.dependencies[dependency].state = state;
        }
    }

    return decoratorInstance;
});
