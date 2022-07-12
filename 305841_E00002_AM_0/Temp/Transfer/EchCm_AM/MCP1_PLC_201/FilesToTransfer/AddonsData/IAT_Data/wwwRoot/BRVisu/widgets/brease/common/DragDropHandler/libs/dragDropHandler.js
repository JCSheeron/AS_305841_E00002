define(['widgets/brease/common/DragDropHandler/libs/dragDropBase',
    'widgets/brease/common/DragDropHandler/libs/dragDropTouch',
    'widgets/brease/common/DragDropHandler/libs/dragDropPointer'],
function (DragDropBase, DragDropTouch, DragDropPointer) {
    'use strict';
    function isTouch() {
        return 'ontouchstart' in window || // works on most browsers 
                navigator.maxTouchPoints; // works on IE10/11 and Surface
    }

    function supportsPointer() {
        if (window.PointerEvent) {
            return true;
        }
        return false;
    }

    function DragDropHandler() {
        if (supportsPointer()) {
            DragDropPointer.call(this);
        } else if (isTouch()) {
            DragDropTouch.call(this);
        } else {
            DragDropBase.call(this);
        }
    }

    if (supportsPointer()) {
        DragDropHandler.prototype = Object.create(DragDropPointer.prototype);
    } else if (isTouch()) {
        DragDropHandler.prototype = Object.create(DragDropTouch.prototype);
    } else {
        DragDropHandler.prototype = Object.create(DragDropBase.prototype);
    }

    return DragDropHandler;
});
