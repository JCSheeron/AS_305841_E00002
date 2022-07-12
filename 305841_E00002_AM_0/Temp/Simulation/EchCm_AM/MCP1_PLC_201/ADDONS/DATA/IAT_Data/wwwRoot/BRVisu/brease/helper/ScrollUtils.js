define(['brease/events/BreaseEvent'], function (BreaseEvent) {

    'use strict';
    
    var outlineMargin,
        listenerAdded = false;

    function getOutlineMargin(elem) {
        if (outlineMargin === undefined) {
            var computedStyle = window.getComputedStyle(elem),
                offset = parseInt(computedStyle.getPropertyValue('outline-offset'), 10),
                width = parseInt(computedStyle.getPropertyValue('outline-width'), 10);

            outlineMargin = Math.max(0, offset + width);
            addThemeChangeListener();
        }
        return outlineMargin;
    }

    function themeChangeHandler() {
        outlineMargin = undefined;
    }

    function addThemeChangeListener() {
        if (listenerAdded !== true) {
            document.body.addEventListener(BreaseEvent.THEME_CHANGED, themeChangeHandler);
            listenerAdded = true;
        }
    }

    var Utils = {
    
        /**
        * @method getFocusRect
        * Get the boundingRect of a focused element and add dimension of focus outline
        * @param {HTMLElement} elem
        * @return {DomRect}
        */
        getFocusRect: function (elem) {
            var elemRect = elem.getBoundingClientRect();
            if (elem === document.activeElement) {
                var margin = getOutlineMargin(elem);
                return {
                    top: elemRect.top - margin,
                    y: elemRect.top - margin,
                    bottom: elemRect.bottom + margin,
                    left: elemRect.left - margin,
                    x: elemRect.left - margin,
                    right: elemRect.right + margin,
                    width: elemRect.width + 2 * margin,
                    height: elemRect.height + 2 * margin
                };
            } else {
                return elemRect;
            }
        },
    
        /**
        * @method checkElemOutsideScrollArea
        * Check if the HTMLElement is not completeley visible inside the wrapper element of the scroller
        * @param {HTMLElement} elem
        * @param {HTMLElement} wrapper
        * @return {Object}
        * @return {Boolean} return.vertical
        * @return {Boolean} return.horizontal
        */
        checkElemOutsideScrollArea: function (elem, wrapper) {
            var focusRect = Utils.getFocusRect(elem),
                wrapperRect = wrapper.getBoundingClientRect();
            
            return { 
                vertical: focusRect.top < wrapperRect.top || focusRect.bottom > wrapperRect.bottom,
                horizontal: focusRect.left < wrapperRect.left || focusRect.right > wrapperRect.right 
            };
        },

        /**
        * @method checkElemOutsideViewport
        * Check if the HTMLElement is not completeley visible inside the viewport
        * @param {HTMLElement} elem
        * @return {Object}
        * @return {Number} return.x
        * @return {Number} return.y
        */
        checkElemOutsideViewport: function (elem) {
            var focusRect = Utils.getFocusRect(elem),
                ret = {
                    x: 0,
                    y: 0
                },
                wiW = window.innerWidth,
                wiH = window.innerHeight;

            if (focusRect.top < 0) {
                ret.y = focusRect.top;
            } else if (focusRect.bottom > wiH) {
                ret.y = focusRect.bottom - wiH;
            }

            if (focusRect.left < 0) {
                ret.x = focusRect.left;
            } else if (focusRect.right > wiW) {
                ret.x = focusRect.right - wiW;
            }
            return ret;
        }
    };
    return Utils;

});
