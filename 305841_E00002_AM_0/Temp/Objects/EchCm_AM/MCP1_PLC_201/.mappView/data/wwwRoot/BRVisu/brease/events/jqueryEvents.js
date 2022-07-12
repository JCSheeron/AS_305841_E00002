define(['jquery', 'brease/events/VirtualEvents'], function ($, VirtualEvents) {

    'use strict';

    // jquery event dblclick

    $.event.special.dblclick = {
        name: 'dblclick',
        namespace: '.dblclick',
        setup: function () {
            $(this).on('vmouseup' + $.event.special.dblclick.namespace, $.event.special.dblclick.handler);
        },

        handler: function (event) {
            var elem = event.target,
                $elem = $(elem),
                lastTouch = $elem.data('lastTouch') || 0,
                now = new Date().getTime(),
                delta = now - lastTouch;

            if (delta > 20 && delta < 500) {
                $elem.data('lastTouch', 0);
                window.setTimeout(function () {
                    VirtualEvents.triggerVirtualEvent(elem, $.event.special.dblclick.name, event, { pointerId: VirtualEvents.getPointerId(event) });
                }, 0);
            } else {
                $elem.data('lastTouch', now);
            }
        },

        teardown: function () {
            $(this).data('lastTouch', 0);
            $(this).off('vmouseup' + $.event.special.dblclick.namespace);
        }
    };

    // jquery event taphold
    $.event.special.taphold = {
        threshold: 750,
        name: 'taphold',
        namespace: '.taphold',
        setup: function () {
            $(this).on('vmousedown' + $.event.special.taphold.namespace, $.event.special.taphold.handler);
        },
        handler: function (event) {
            if (event.which > 1) {
                // exclude mouse buttons other than the left button
                return false;
            }
            var holdTimer,
                elem = event.target,
                $elem = $(elem);

            function clearHoldTimer() {
                window.clearTimeout(holdTimer);
            }

            function clearHandlers() {
                clearHoldTimer();

                $elem.off('vmouseup' + $.event.special.taphold.namespace, clearHoldTimer);
                $elem.off('vclick' + $.event.special.taphold.namespace, clearHandlers);
            }

            $elem.on('vmouseup' + $.event.special.taphold.namespace, clearHoldTimer);
            $elem.on('vclick' + $.event.special.taphold.namespace, clearHandlers);

            holdTimer = window.setTimeout(function () {
                VirtualEvents.triggerVirtualEvent(elem, $.event.special.taphold.name, event, { pointerId: VirtualEvents.getPointerId(event) });
            }, $.event.special.taphold.threshold);
        },
        teardown: function () {
            $(this).off('vmousedown' + $.event.special.taphold.namespace).off('vclick' + $.event.special.taphold.namespace).off('vmouseup' + $.event.special.taphold.namespace);
        }
    };

    return null;

});
