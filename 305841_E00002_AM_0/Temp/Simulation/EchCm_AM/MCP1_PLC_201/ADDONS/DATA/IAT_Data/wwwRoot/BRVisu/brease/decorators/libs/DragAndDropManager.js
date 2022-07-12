define(['brease/core/Utils', 'brease/events/BreaseEvent', 'brease/events/Gestures', 'brease/decorators/libs/Draggable'],
    function (Utils, BreaseEvent, Gestures, Draggable) {

        'use strict';

        /**
        * @class brease.decorators.libs.DragAndDropManager
        * Helper class for DragAndDrop functionality.
        * @singleton
        */
        var clones = new Map(), // contains a draggable object for each pointer on the screen
            DragAndDropManager = function () {
                var self = this,
                    frameId = 0, // id of requestAnimationFrame
                    active = false; // is set to true after init method has been called
                // offset the draggable item needs to be moved before being recognized as a drag operation
                self.dragOffset = (window.devicePixelRatio > 1) ? 10 * window.devicePixelRatio : 10;
                self.listens = false; // indicates wether eventlisteners are attached
                self.init = function () {
                    if (!self.isActive()) {
                        brease.docEl.on(BreaseEvent.MOUSE_DOWN, _onDocumentMouseDown);
                        active = true;
                    }
                };
                // indicates if clones of draggable items are in the collection
                self.hasClones = function () {
                    return clones.size > 0;
                };
                // return the stored draggable object for testing purposes
                self.getClone = function () {
                    return clones.get(0);
                };
                // indicates if DragAndDropManager has been initialized
                self.isActive = function () {
                    return active;
                };

                self.dispose = function () {
                    brease.docEl.off(BreaseEvent.MOUSE_DOWN, _onDocumentMouseDown);
                    active = false;
                };
                // called on mousedown
                function _onDocumentMouseDown(e) {
                    // only one item allowed for drag and drop
                    if (!self.hasClones()) {
                        var target = $(e.target),
                            draggable = target.closest('.draggableItem'),
                            id = draggable.length ? draggable.attr('id') : '',
                            pointerId = Utils.getPointerId(e),
                            dimension,
                            transform,
                            elem,
                            clone,
                            clientX = e.clientX ? e.clientX : 0,
                            clientY = e.clientY ? e.clientY : 0,
                            data = {},
                            enabled = id ? brease.callWidget(id, 'isEnabled') : false;

                        if (enabled && draggable.length > 0) {
                            _preventDefault(e);
                            elem = draggable.get(0);
                            clone = elem.cloneNode(true);
                            data.scaleFactor = Utils.getTransformedScaleFactor(elem);
                            data.id = id;
                            data.contentId = id ? brease.callWidget(id, 'getParentContentId') : '';
                            data.clone = clone;
                            data.clientX = clientX;
                            data.clientY = clientY;
                            data.zIndex = Utils.getHighestZindex(document.querySelectorAll('body > [class],body > [style],body > [id]'));
                            // check for transformations e.g.: rotation
                            transform = window.getComputedStyle(elem, null).getPropertyValue('transform');
                            // calculate cursor offset relative to draggable item only if no rotation is applied
                            // else offset will be 0 => cursor on the top left corner of the clone
                            if (transform === 'matrix(1, 0, 0, 1, 0, 0)' || transform === 'none') {
                                dimension = elem.getBoundingClientRect();
                                data.offset = { x: clientX - dimension.left, y: clientY - dimension.top };
                                // apply dimension in case draggable widget has a dimension in % defined
                                data.width = dimension.width / data.scaleFactor;
                                data.height = dimension.height / data.scaleFactor;
                            }
                            // add draggable item to map object
                            clones.set(pointerId, new Draggable(data));
                        }
                        //console.log('_onDocumentMouseDown:', pointerId, id, draggable);
                        if (!self.listens && self.hasClones()) {
                            brease.docEl.on(BreaseEvent.MOUSE_MOVE, _onDocumentMouseMove);
                            brease.docEl.on(BreaseEvent.MOUSE_UP, _onDocumentMouseUp);
                            self.listens = true;
                        }
                    }

                }
                // called when mouse down occured on draggable item
                // and the cursor is moving
                function _onDocumentMouseMove(e) {
                    var pointerId = Utils.getPointerId(e),
                        item = clones.get(pointerId);
                    if (item) {
                        item.clientX = e.clientX;
                        item.clientY = e.clientY;
                        if (item.pointerId === pointerId) {
                            _preventDefault(e);
                            frameId = Gestures.getAnimationFrame(frameId, _setPositions);
                            item.updateIntersection(e);
                        } else if (Math.abs(item.startPosition.x - e.clientX) > self.dragOffset || Math.abs(item.startPosition.y - e.clientY) > self.dragOffset) {
                            _preventDefault(e);
                            item.dispatchDragStart();
                            item.pointerId = pointerId;
                            frameId = Gestures.getAnimationFrame(frameId, _setPositions); // apply current position to prevent jumping on rotated elements
                            document.body.append(item.clone);
                        }
                    }
                }
                // called when mouse up occured on draggable item
                function _onDocumentMouseUp(e) {
                    var pointerId = Utils.getPointerId(e),
                        item = clones.get(pointerId);
                    //console.log($(e.target).closest('.droppableItem'));
                    if (item) {
                        // item.pointerId indicates, that dragging was initiated
                        if (item.pointerId !== undefined) {
                            _preventDefault(e);
                            item.updateIntersection(e);
                            item.dispatchDrop();
                            item.dispatchDragEnd();
                        }
                        item.dispose();
                        clones.delete(pointerId);
                    }
                    // remove mouse move and mouse up events after operation has finished
                    if (self.listens && !self.hasClones()) {
                        Gestures.cancelAnimationFrame(frameId);
                        brease.docEl.off(BreaseEvent.MOUSE_MOVE, _onDocumentMouseMove);
                        brease.docEl.off(BreaseEvent.MOUSE_UP, _onDocumentMouseUp);
                        self.listens = false;
                    }
                }
                // update the position of the cloned nodes in the clones map object
                function _setPositions() {
                    clones.forEach(function (draggable) { draggable.setPosition(); });
                }
                // A&P 636310 prevent scrolling when interacting with a 
                // draggable element
                function _preventDefault(e) {
                    e.stopPropagation();
                    e.preventDefault();
                }
                return self;
            }, instance = new DragAndDropManager();

        return instance;
    });
