define(['widgets/brease/common/DragDropHandler/libs/draggable',
    'widgets/brease/common/DragDropHandler/libs/droppable',
    'widgets/brease/common/DragDropHandler/libs/utils',
    'widgets/brease/common/DragDropHandler/libs/eventListenerModel',
    'widgets/brease/common/DragDropHandler/libs/dragDropArgs'],
function (Draggable, Droppable, Utils, EventListenerModel, DragDropArgs) {
    'use strict';
    var DRAG_ITEM_CLONE = 'drag-drop-item-clone';
    var DRAG_ITEM_ACTIVE = 'drag-drop-item-active'; // only for clickOperationMode = true

    function _getDragDropAreaEventListener(self, event, func) {
        for (var i = 0; i < self.dragDropAreaEventListeners.length; i = i + 1) {
            if (self.dragDropAreaEventListeners[i].event === event &&
                    self.dragDropAreaEventListeners[i].function === func) {
                return self.dragDropAreaEventListeners[i];
            }
        }
        return null;
    }

    function _getDragDropArgs(self, event) {
        var dragDropArgs = new DragDropArgs();

        dragDropArgs.dragItem = self.dragItem;
        dragDropArgs.sourceItem = self.sourceItem;
        dragDropArgs.originalEventArgs = event;
        dragDropArgs.target = self._getDragDropTarget(self, event);
        dragDropArgs.clientX = self._getEventClientX(event);
        dragDropArgs.clientY = self._getEventClientY(event);
        dragDropArgs.pageX = self._getEventPageX(event);
        dragDropArgs.pageY = self._getEventPageY(event);
        dragDropArgs.dragData = self.dragData;

        return dragDropArgs;
    }

    function _disposeDragDropArea(self) {
        var i = 0;
        var dragDropAreaEventListener;
        for (i = 0; i < self.dragDropAreaEventListeners.length; i = i + 1) {
            dragDropAreaEventListener = self.dragDropAreaEventListeners[i];
            self.dragDropArea.removeEventListener(dragDropAreaEventListener.event, dragDropAreaEventListener.function);
        }
        self.dragDropArea = null;
    }

    function _dispatchDragStarted(self, eventArgs) {
        var args = _getDragDropArgs(self, eventArgs);

        /*
             * @event dragstarted
             * Called when user begins dragging a draggable HTMLElement
             */
        var dragStartedEvent = new CustomEvent('dragstarted', { 'detail': args });
        self.dragDropArea.dispatchEvent(dragStartedEvent);
    }

    function _dispatchDragEnded(self, eventArgs) {
        var args = _getDragDropArgs(self, eventArgs);

        /*
             * @event dragended
             * Called when user stops dragging a draggable HTMLElement
             */
        var dragEndedEvent = new CustomEvent('dragended', { 'detail': args });
        self.dragDropArea.dispatchEvent(dragEndedEvent);
    }

    function _callDragEnter(self, eventArgs) {
        var args = _getDragDropArgs(self, eventArgs);

        var droppable = self.getClosestDroppable(args.target);

        if (droppable && typeof droppable.dragEnter === 'function') {
            droppable.dragEnter(args);
        }
    }

    function _callDragMove(self, eventArgs) {
        var args = _getDragDropArgs(self, eventArgs);

        var droppable = self.getClosestDroppable(args.target);

        if (droppable && typeof droppable.dragMove === 'function') {
            droppable.dragMove(args);
        }
    }

    function _callDragLeave(self, eventArgs) {
        var args = _getDragDropArgs(self, eventArgs);

        var droppable = self.getClosestDroppable(args.target);

        if (droppable && typeof droppable.dragLeave === 'function') {
            droppable.dragLeave(args);
        }
    }

    function _callDrop(self, eventArgs) {
        var args = _getDragDropArgs(self, eventArgs);

        var droppable = self.getClosestDroppable(args.target);

        if (droppable && typeof droppable.drop === 'function') {
            droppable.drop(args);
        }
    }

    function _dragEnter(self, event) {
        if (self.isDisabled) { return; }

        var target = self._getDragDropTarget(self, event);
        var droppable = self.getClosestDroppable(target);
        if (droppable) {
            self.canDrop = true;
            self.dragEntered = true;
            self.dropTarget = droppable.elem;

            _callDragEnter(self, event);
        }
    }

    function _dragMove(self, event) {
        _callDragMove(self, event);
    }

    function _dragLeave(self, event) {
        var droppable = self.getClosestDroppable(event.target);

        if (droppable !== null) {
            if (droppable.elem === self.dropTarget) {
                self.canDrop = false;
                self.dragEntered = false;
                self.dropTarget = null;
            }
            _callDragLeave(self, event);
        }
    }

    function _drop(self, event) {
        _callDrop(self, event);
    }

    function _startDrag(self, event) {
        if (self.isDisabled) { return; }

        var draggable = self.getClosestDraggable(event.target);

        self.dragActive = true;
        self.sourceItem = event.target;

        self.dragItem = draggable.elem;

        if (self.clickOperationMode === false) {
            if (draggable.clone) {
                var original = self.dragItem;
                var clone = original.cloneNode(true);
                self.dragItem = clone;
                self.setDragItemClone(self.dragItem, draggable.cloneClassList);
            }
        } else {
            Utils.addClass(self.dragItem, DRAG_ITEM_ACTIVE);
        }

        _dispatchDragStarted(self, event);
    }

    function _stopDrag(self, event) {
        if (self.canDrop) {
            if (!self.isDisabled) {
                _drop(self, event);
            }
            _dragLeave(self, event);
        }

        self.canDrop = false;
        self.dragEntered = false;
        self.dropTarget = null;

        if (Utils.containsClass(self.dragItem, DRAG_ITEM_CLONE)) {
            document.body.removeChild(self.dragItem);
        }

        Utils.removeClass(self.dragItem, DRAG_ITEM_ACTIVE);

        self.dragActive = false;
        self.dragEnabled = false;

        _dispatchDragEnded(self, event);

        self.dragItem = null;
        self.sourceItem = null;
        self.dragData = null;
    }

    function DragDropBase() {

        this.dragEnabled = false;
        this.mouseDownClientX = 0;
        this.mouseDownClientY = 0;

        this.dragItem = null;
        this.sourceItem = null;
        this.dragActive = false;
        this.dragData = null;

        this.canDrop = false;
        this.dragEntered = false;
        this.dropTarget = null;

        this.isDisabled = false;

        this.draggables = [];
        this.droppables = [];
        this.dragDropArea = document.body;
        this.dragDropAreaEventListeners = [];
        this.clickOperationMode = false;
        this.preventMouseDownEvent = true;
        var _pixelRatio = (window.devicePixelRatio > 1) ? window.devicePixelRatio : 1;
        this.dragDelay = _pixelRatio * 10;

        this._wrapEventHandler();
        this._documentAddEventListener();
    }

    var p = DragDropBase.prototype;

    /* ********* protected members ********** */
    p._wrapEventHandler = function () {
        var self = this;
        // document events
        this.documentMouseUpHandler = function (e) { self._documentMouseUpHandler(self, e); };
        this.documentMouseDownHandler = function (e) { self._documentMouseDownHandler(self, e); };
        this.documentMouseMoveHandler = function (e) { self._documentMouseMoveHandler(self, e); };

        //draggable events
        this.draggableMouseMoveHandler = function (e) { self._draggableMouseMoveHandler(self, e); };
        this.draggableMouseDownHandler = function (e) { self._draggableMouseDownHandler(self, e); };
        this.draggableMouseLeaveHandler = function (e) { self._draggableMouseLeaveHandler(self, e); };

        //droppable events
        this.droppableMouseEnterHandler = function (e) { self._droppableMouseEnterHandler(self, e); };
        this.droppableMouseMoveHandler = function (e) { self._droppableMouseMoveHandler(self, e); };
        this.droppableMouseLeaveHandler = function (e) { self._droppableMouseLeaveHandler(self, e); };
    };

    p._getEventClientX = function (eventArgs) {
        return eventArgs.clientX;
    };

    p._getEventClientY = function (eventArgs) {
        return eventArgs.clientY;
    };

    p._getEventPageX = function (eventArgs) {
        return eventArgs.pageX;

    };

    p._getEventPageY = function (eventArgs) {
        return eventArgs.pageY;
    };

    p._getDragDropTarget = function (self, event) {
        var target = event.target;
        return target;
    };

    p._documentAddEventListener = function () {
        document.addEventListener('mouseup', this.documentMouseUpHandler);
        document.addEventListener('mousedown', this.documentMouseDownHandler);
        document.addEventListener('mousemove', this.documentMouseMoveHandler);
    };

    p._draggableAddEventListener = function (draggable) {
        draggable.elem.addEventListener('mousemove', this.draggableMouseMoveHandler);
        draggable.elem.addEventListener('mousedown', this.draggableMouseDownHandler);
        draggable.elem.addEventListener('mouseleave', this.draggableMouseLeaveHandler);
    };

    p._droppableAddEventListener = function (droppable) {
        droppable.elem.addEventListener('mouseenter', this.droppableMouseEnterHandler);
        droppable.elem.addEventListener('mousemove', this.droppableMouseMoveHandler);
        droppable.elem.addEventListener('mouseleave', this.droppableMouseLeaveHandler);
    };

    p._documentRemoveEventListener = function () {
        document.removeEventListener('mouseup', this.documentMouseUpHandler);
        document.removeEventListener('mousedown', this.documentMouseDownHandler);
        document.removeEventListener('mousemove', this.documentMouseMoveHandler);
    };

    p._draggableRemoveEventListener = function (draggable) {
        draggable.elem.removeEventListener('mousemove', this.draggableMouseMoveHandler);
        draggable.elem.removeEventListener('mousedown', this.draggableMouseDownHandler);
        draggable.elem.removeEventListener('mouseleave', this.draggableMouseLeaveHandler);
    };

    p._droppableRemoveEventListener = function (droppable) {
        droppable.elem.removeEventListener('mouseenter', this.droppableMouseEnterHandler);
        droppable.elem.removeEventListener('mousemove', this.droppableMouseMoveHandler);
        droppable.elem.removeEventListener('mouseleave', this.droppableMouseLeaveHandler);
    };

    /* ********* Document event handler  ********** */
    p._documentMouseUpHandler = function (self, e) {
        //console.log("_documentMouseUpHandler");
        if (self.clickOperationMode) { return; }

        if (self.dragActive) {
            _stopDrag(self, e);
        }
        self.dragEnabled = false;
    };

    p._documentMouseMoveHandler = function (self, e) {
        //console.log("_documentMouseMoveHandler");
        if (!self.dragActive || self.clickOperationMode) { return; }

        var pageX = self._getEventClientX(e);
        var pageY = self._getEventClientY(e);

        if (self.dragItem) {
            self.dragItem.style.left = (pageX - (self.dragItem.offsetWidth / 2)) + 'px';
            self.dragItem.style.top = (pageY - (self.dragItem.offsetHeight / 2)) + 'px';
        }
        // TODO Scroll if near window border
    };

    p._documentMouseDownHandler = function (self, e) {
        //console.log("_documentMouseDownHandler");
        if (self.dragActive) {
            _stopDrag(self, e);
        }
    };
    /* ********* END Document event handler  ********** */

    /* ********* DragDrop event handler  ********** */
    p._draggableMouseDownHandler = function (self, e) {
        //console.log("_draggableMouseDownHandler");
        if (e.target) {
            self.mouseDownClientX = self._getEventClientX(e);
            self.mouseDownClientY = self._getEventClientY(e);
            self.dragEnabled = true;

            if (self.clickOperationMode) {
                if (self.dragActive) {
                    _stopDrag(self, e);
                } else {
                    self.dragActive = true;
                    _startDrag(self, e);
                }
            }
        }

        // REMOVED: MouseDown of BreaseEvent.CLICK was not fired
        // Deprecated: Neccessary to prevent standard drag behaviour (of images for example)
        //if (this.preventMouseDownEvent) {
        //    e.preventDefault();
        // }
    };

    p._draggableMouseMoveHandler = function (self, e) {
        //console.log("_draggableMouseMoveHandler");
        if (self.clickOperationMode) { return; }

        var clientX = self._getEventClientX(e);
        var clientY = self._getEventClientY(e);

        if (self.dragEnabled &&
                !self.dragActive &&
                (Math.abs(self.mouseDownClientX - clientX) > self.dragDelay ||
                    Math.abs(self.mouseDownClientY - clientY) > self.dragDelay)) {
            _startDrag(self, e);
            //console.log("_draggableMouseMoveHandler: StartDrag");
        }
        //console.log("_draggableMouseMoveHandler");
    };

    p._draggableMouseLeaveHandler = function (self, e) {
        //console.log("_draggableMouseLeaveHandler");
        if (!self.dragActive && self.dragEnabled) {
            _startDrag(self, e);
            //self.dragEnabled = false;
        }
    };
    /* ********* END DragDrop event handler  ********** */

    /* ********* Droppable event handler  ********** */
    p._droppableMouseEnterHandler = function (self, e) {
        //console.log("_droppableMouseEnterHandler");
        if (self.dragActive) {
            _dragEnter(self, e);
        }
    };

    p._droppableMouseMoveHandler = function (self, e) {
        //console.log("_droppableMouseMoveHandler");
        if (self.dragActive) {
            if (self.dragEntered === false) {
                _dragEnter(self, e);
            }
            _dragMove(self, e);
        }
    };

    p._droppableMouseLeaveHandler = function (self, e) {
        //console.log("_droppableMouseLeaveHandler");
        if (self.dragActive) {
            _dragLeave(self, e);
        }
    };
    /* ********* END Droppable event handler  ********** */
    /* ********* END protected members ********** */

    /*
         * Get the assigned Draggable object for a specific HTMLElement
         * @method getDraggableByElement
         * @param {HTMLElement} elem 
         */
    p.getDraggableByElement = function (elem) {
        var i = 0;
        for (i = 0; i < this.draggables.length; i = i + 1) {
            if (this.draggables[i].elem === elem) {
                return this.draggables[i];
            }
        }
        return null;
    };

    /*
         * Get the first Draggable object which contains a specific HTMLElement
         * @method getClosestDraggable
         * @param {HTMLElement} elem 
         */
    p.getClosestDraggable = function (elem) {
        var currentElem = elem;
        while (currentElem) {
            var draggable = this.getDraggableByElement(currentElem);
            if (draggable) {
                return draggable;
            }
            currentElem = currentElem.parentNode;
        }
        return null;
    };

    /*
         * Get the assigned Droppable object for a specific HTMLElement
         * @method getDroppableByElement
         * @param {HTMLElement} elem 
         */
    p.getDroppableByElement = function (elem) {
        var i = 0;
        for (i = 0; i < this.droppables.length; i = i + 1) {
            if (this.droppables[i].elem === elem) {
                return this.droppables[i];
            }
        }
        return null;
    };

    /*
         * Get the first Droppable object which contains a specific HTMLElement
         * @method getClosestDroppable
         * @param {HTMLElement} elem 
         */
    p.getClosestDroppable = function (elem) {
        var currentElem = elem;
        while (currentElem) {
            var droppable = this.getDroppableByElement(currentElem);
            if (droppable) {
                return droppable;
            }
            currentElem = currentElem.parentNode;
        }
        return null;
    };

    /*
         * Set the DragDropArea HTMLElement, which dispatches the dragstarted and dragended events
         * @method setDragDropArea
         * @param {HTMLElement} element 
         */
    p.setDragDropArea = function (element) {
        var dragDropAreaEventListener;
        var i;

        // dispose old
        if (this.dragDropArea) {
            _disposeDragDropArea(this);
        }

        // set new
        this.dragDropArea = element;
        for (i = 0; i < this.dragDropAreaEventListeners.length; i = i + 1) {
            dragDropAreaEventListener = this.dragDropAreaEventListeners[i];
            this.dragDropArea.addEventListener(dragDropAreaEventListener.event, dragDropAreaEventListener.function);
        }
    };

    /*
         * Returns the HTMLElement which is currently dragged
         */
    p.getDragItem = function () {
        return this.dragItem;
    };

    /*
         * Sets the Element which should be dragged
         * @param {HTMLElement} item 
         * @param {String[]} cloneClassList Class names which should be added to the dragItem
         * @param {Obejct} cloneStyleProperties stylable properties that should explicitly be added to the cloneItem - has to be CSS properties as described by MSDN
         */
    p.setDragItemClone = function (item, cloneClassList, cloneStyleProperties) {
        Utils.addClass(item, DRAG_ITEM_CLONE);
        if (cloneClassList) {
            for (var i = 0; i < cloneClassList.length; i = i + 1) {
                Utils.addClass(item, cloneClassList[i]);
            }
        }
        item.style.pointerEvents = 'none';
        for (var k in cloneStyleProperties) {
            if (cloneStyleProperties.hasOwnProperty(k)) {
                item.style[k] = cloneStyleProperties[k];
            }
        }

        this.dragItem = item;
        document.body.appendChild(item);
    };

    /*
         * [NOT IMPLEMENTED]
         * @param {Boolean} value 
         */
    p.setClickOperationMode = function (value) {
        this.clickOperationMode = value;
    };

    /*
         * [NOT IMPLEMENTED]
         * @param {Boolean} value 
         */
    p.getClickOperationMode = function () {
        return this.clickOperationMode;
    };

    /*
         * [NOT IMPLEMENTED]
         * @param {Boolean} value 
         */
    p.setPreventMouseDownEvent = function (value) {
        this.preventMouseDownEvent = value;
    };

    /*
         * [NOT IMPLEMENTED]
         * @param {Boolean} value 
         */
    p.getPreventMouseDownEvent = function () {
        return this.preventMouseDownEvent;
    };

    /*
         * Attach some additional data to the dragItem
         * @param {Any} data 
         */
    p.setDragData = function (data) {
        this.dragData = data;
    };

    /*
         * Get some additional data set by setDragData method
         */
    p.getDragData = function () {
        return this.dragData;
    };

    /*
         * Registers a HTMLElement as a draggable object to the DragDropHandler
         * @param {HTMLElement} elem 
         * @param {DraggableSettings} settings
         */
    p.registerDraggable = function (elem, settings) {
        var draggable = new Draggable();
        draggable.id = elem.id;
        draggable.elem = elem;
        Utils.mapProperties(settings, draggable);

        this.draggables.push(draggable);

        this._draggableAddEventListener(draggable);

        return draggable;
    };

    /*
         * Registers a HTMLElement as a Droppable object to the DragDropHandler
         * @param {HTMLElement} elem 
         * @param {DroppableSettings} settings 
         */
    p.registerDroppable = function (elem, settings) {
        var droppable = new Droppable();
        droppable.id = elem.id;
        droppable.elem = elem;
        Utils.mapProperties(settings, droppable);
        Utils.mapMethods(settings, droppable);

        this.droppables.push(droppable);

        this._droppableAddEventListener(droppable);

        return droppable;
    };

    /*
         * Unregisters a Draggable object containing the given HTMLElement
         * @param {HTMLElement} elem 
         */
    p.unregisterDraggable = function (elem) {
        var draggable = this.getClosestDraggable(elem);
        if (draggable) {

            this._draggableRemoveEventListener(draggable);
            this.draggables.splice(this.draggables.indexOf(draggable), 1);
            return true;
        }
        return false;
    };

    /*
         * Unregisters a Droppable object containing the given HTMLElement
         * @param {HTMLElement} elem 
         */
    p.unregisterDroppable = function (elem) {
        var droppable = this.getClosestDroppable(elem);
        if (droppable) {
            this._droppableRemoveEventListener(droppable);
            this.droppables.splice(this.droppables.indexOf(droppable), 1);
            return true;
        }
        return false;
    };

    /*
         * Remove all Draggable objects
         */
    p.unregisterDraggables = function () {
        for (var i = 0; i < this.draggables.length; i = i + 1) {
            this.unregisterDraggable(this.draggables[i]);
        }
        this.draggables = null;
    };

    /*
         * Remove all Droppable objects
         */
    p.unregisterDroppables = function () {
        for (var i = 0; i < this.droppables.length; i = i + 1) {
            this.unregisterDroppable(this.droppables[i]);
        }
        this.droppables = null;
    };

    /*
         * Get all Draggable objects
         */
    p.getDraggables = function () {
        return this.draggables;
    };

    /*
         * Get all Droppable objects
         */
    p.getDroppables = function () {
        return this.droppables;
    };

    /*
         * Add an event to the DragDropArea HTMLElement
         * @param {String} event 
         * @param {Function} func 
         */
    p.addEventListener = function (event, func) {
        if (_getDragDropAreaEventListener(this, event, func) !== null) {
            return;
        }

        this.dragDropAreaEventListeners.push(new EventListenerModel(event, func));
        this.dragDropArea.addEventListener(event, func);
    };

    /*
         * Remove an event from the DragDropArea HTMLElement
         * @param {String} event 
         * @param {Function} func 
         */
    p.removeEventListener = function (event, func) {
        if (_getDragDropAreaEventListener(this, event, func) !== null) {
            this.dragDropArea.removeEventListener(event, func);
        }
    };

    /*
         * Disables DragDrop functionality
         */
    p.disable = function () {
        this.isDisabled = true;
    };

    /*
         * Enables DragDrop functionality
         */
    p.enable = function () {
        this.isDisabled = false;
    };

    /*
         * Cleans up unmanaged resources
         */
    p.dispose = function () {
        _disposeDragDropArea(this);
        this.dragDropAreaEventListeners = undefined;
        this.unregisterDraggables();
        this.unregisterDroppables();
        this._documentRemoveEventListener();
    };

    return DragDropBase;
});
