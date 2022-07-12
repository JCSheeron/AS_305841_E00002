define(function () {

    'use strict';

    /**
    * @class brease.decorators.libs.Draggable
    * Represents a draggable item
    */
    var Draggable = function (data) {
        
            if (!data) {
                data = {};
            }
            data.offset = data.offset ? data.offset : {}; // offset will not be defined for rotated elements

            this.id = data.id ? data.id : ''; // id of the draggable widget
            this.contentId = data.contentId ? data.contentId : ''; // content id of the draggable widget
            this.scaleFactor = data.scaleFactor ? data.scaleFactor : 1;
            this.zIndex = data.zIndex ? data.zIndex : 'auto';
            this.width = data.width ? data.width : '';
            this.height = data.height ? data.height : '';
            this.clientX = data.clientX ? data.clientX : 0;
            this.clientY = data.clientY ? data.clientY : 0;
            this.startPosition = {}; // initial position for calculating when ondrag starts needs to be fired
            this.offset = { // offset within the draggable clone
                x: data.offset.x ? data.offset.x : 0,
                y: data.offset.y ? data.offset.y : 0
            };
            if (data.clone) {
                this.clone = _getStyledClone(data.clone, this.width, this.height, this.zIndex, this.scaleFactor); // clone which is dragged arround
            }
            
            // set initial position
            this.startPosition.x = this.clientX;
            this.startPosition.y = this.clientY;
            // immediately apply initial position when instance of draggable is created
            // to overwrite top and left attributes from the original element on the clone
            this.setPosition();
        },
        p = Draggable.prototype;

    // update the position of the stored clone
    p.setPosition = function () {
        if (this.clone) {
            this.clone.style.left = (this.clientX - this.offset.x) + 'px';
            this.clone.style.top = (this.clientY - this.offset.y) + 'px';
        }
    };
    // get intersecting element for drag enter and drag leave event
    p.updateIntersection = function (e) {
        if (Number.isFinite(e.clientX) && Number.isFinite(e.clientY)) {
            this.setIntersectionElement($(document.elementFromPoint(e.clientX, e.clientY)).closest('.droppableItem').get(0));
        }
    };
    // update the element the draggable is currently intersecting with
    // needed because there is no native drag enter and drag leave on touch devices
    p.setIntersectionElement = function (elem) {
        var old = this.intersectionElem;
        if (elem !== this.intersectionElem) {
            this.intersectionElem = elem;
            _dispatchDragLeave.call(this, old); // element the draggable is leaving or undefined
            _dispatchDragEnter.call(this, elem); // element the draggable is entering or undefined
        }
    };
    // dispatch drag start event on the draggable widget
    p.dispatchDragStart = function () {
        brease.callWidget(this.id, 'dragStartHandler', { contentId: this.contentId, id: this.id });
    };
    // dispatch drop event on the droppable widget
    p.dispatchDrop = function () {
        if (this.intersectionElem && this.intersectionElem.id) {
            if (this.intersectionElem.hasAttribute('data-widget-refid') === true) {
                brease.callWidget(this.intersectionElem.getAttribute('data-widget-refid'), 'dropHandler', { id: this.id, contentId: this.contentId });
            } else {
                brease.callWidget(this.intersectionElem.id, 'dropHandler', { id: this.id, contentId: this.contentId });
            }

        }
    };

    // dispatch drag end event on the draggable widget
    p.dispatchDragEnd = function () {
        brease.callWidget(this.id, 'dragEndHandler', { id: this.id, contentId: this.contentId });
    };

    p.dispose = function () {
        if (this.clone) {
            this.clone.remove();
        }
    };

    function _getStyledClone(clone, width, height, zIndex, scaleFactor) {
        // set styles on the clone
        if (clone) {
            if (width) {
                clone.style['width'] = width + 'px';
            }
            if (height) {
                clone.style['height'] = height + 'px';
            }
            clone.style['pointer-events'] = 'none';
            clone.style['position'] = 'fixed';
            clone.style['margin'] = 'auto';
            clone.style['z-index'] = zIndex;
            clone.style['transform'] = 'scale(' + scaleFactor + ',' + scaleFactor + ')';
            clone.style['transform-origin'] = '0 0';
            // prevent the browser from leaving artifacts when dragging 
            // widgets with dashed or dotted border (see A&P 643730 )
            clone.style.WebkitBackfaceVisibility = 'hidden';
            clone.style.backfaceVisibility = 'hidden';
        }
        return clone;
    }
    //dispatch mouse leave event on the droppable widget
    function _dispatchDragLeave(elem) {
        if (elem && elem.id) {
            //console.log(self.id, 'leaves:', elem.id);
            if (elem.hasAttribute('data-widget-refid') === true) {
                brease.callWidget(elem.getAttribute('data-widget-refid'), 'dragLeaveHandler', { id: this.id, contentId: this.contentId });
            } else {
                brease.callWidget(elem.id, 'dragLeaveHandler', { id: this.id, contentId: this.contentId });
            }
        }
    }
    
    //dispatch mouse enter event on the droppable widget
    function _dispatchDragEnter(elem) {
        if (elem && elem.id) {
            //console.log(self.id, 'enters:', elem.id);
            if (elem.hasAttribute('data-widget-refid') === true) {
                brease.callWidget(elem.getAttribute('data-widget-refid'), 'dragEnterHandler', { id: this.id, contentId: this.contentId });
            } else {
                brease.callWidget(elem.id, 'dragEnterHandler', { id: this.id, contentId: this.contentId });
            }
        }
    }

    return Draggable;
});
