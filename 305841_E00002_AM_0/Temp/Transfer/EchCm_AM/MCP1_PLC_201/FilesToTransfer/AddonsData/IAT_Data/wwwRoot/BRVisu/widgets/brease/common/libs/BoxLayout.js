define([
    'brease/enum/Enum'
], function (Enum) {

    'use strict';
    
    /**
     * @class  widgets.brease.common.libs.BoxLayout
     * This Class is used for alignment of Boxes and its contents
     *   using css classes.
     *
     *   Usage:         
     *      1. You need to import the SCSS file "boxLayout.scss"  
     *           e.g.:  
     *               &#64;import "../../common/css/boxLayout.scss";  
     *      2. require this class:  
     *           e.g.:  
     *               define(['widgets/brease/common/libs/BoxLayout'], function(BoxLayout){...});  
     *      2. You must create the box container and boxes in your widget and  
     *           put your content, you want to align inside the boxes  
     *           e.g.:  
     *               widget.boxContainer = BoxLayout.createBoxContainer();  
     *               widget.inputBox = BoxLayout.createBox();  
     *               widget.unitBox = BoxLayout.createBox();  
     *      3. Call the methods "setOrientation" and "setAlignment" to configure the layout  
     *           e.g.:  
     *               BoxLayout.setOrientation(widget.boxContainer, Enum.Orientation.LTR);  
     *  
     * @requires ../css/boxLayout.scss  
     *  
     *    Example:  
     *    - Box orientation  
     *          LeftToRight                           TopToBottom  
     *    _________________________          _________________________  
     *    |           |           |          |                       |  
     *    |           |           |          |          Box1         |  
     *    |   Box1    |    Box2   |   ->     |_______________________|  
     *    |           |           |          |                       |  
     *    |           |           |          |          Box2         |  
     *    |___________|___________|          |_______________________|  
     *  
     *    - Box alignment  
     *            Center                              BottomRight  
     *    _________________________           _________________________   
     *    |           |           |           |           |           |  
     *    |           |           |           |           |           |  
     *    |   Box1    |    Box2   |           |           |           |  
     *    |           |           |   ->      |           |           |  
     *    |           |           |           |       Box1|       Box2|  
     *    |___________|___________|           |___________|___________|  
     *  
     *  
     * @author  Alexander Gottfried                                             
     *
     */
    var BoxLayout = {};

    BoxLayout.CONTAINER_CLASS = 'box-container';
    BoxLayout.BOX_CLASS = 'box-class';
    BoxLayout.ORIENTATION_RIGHT = 'orientation-right';
    BoxLayout.ORIENTATION_LEFT = 'orientation-left';
    BoxLayout.ORIENTATION_TOP = 'orientation-top';
    BoxLayout.ORIENTATION_BOTTOM = 'orientation-bottom';

    BoxLayout.ALIGNMENT_TOP_LEFT = 'content-top-left';
    BoxLayout.ALIGNMENT_TOP = 'content-top';
    BoxLayout.ALIGNMENT_TOP_RIGHT = 'content-top-right';
    BoxLayout.ALIGNMENT_LEFT = 'content-left';
    BoxLayout.ALIGNMENT_CENTER = 'content-center';
    BoxLayout.ALIGNMENT_RIGHT = 'content-right';
    BoxLayout.ALIGNMENT_BOTTOM_LEFT = 'content-bottom-left';
    BoxLayout.ALIGNMENT_BOTTOM = 'content-bottom';
    BoxLayout.ALIGNMENT_BOTTOM_RIGHT = 'content-bottom-right';

    function _findClosest(elem, className) {
        if (elem.classList.contains(className)) {
            return elem;
        }
        elem = elem.parentElement;
        while (elem && !elem.classList.contains(className)) {
            elem = elem.parentElement;
        }
        return elem;
    }

    /**
     * @method
     * Resets the classes of container to default value
     * @param {Object} elem The container DOM element
     */
    BoxLayout.resetContainerClass = function (elem) {
        var i = 0;
        var classItem;
        while ((classItem = elem.classList.item(i))) {
            switch (classItem) {
                case this.ORIENTATION_RIGHT:
                case this.ORIENTATION_LEFT:
                case this.ORIENTATION_TOP:
                case this.ORIENTATION_BOTTOM:
                    elem.classList.remove(classItem);
                    break;
            }
            i = i + 1;
        }
    };

    /**
     * @method
     * Resets the classes of the box to default value
     * @param {Object} elem The box DOM element
     */
    BoxLayout.resetBoxClass = function (elem) {
        var i = 0;
        var classItem;
        while ((classItem = elem.classList.item(i))) {
            switch (classItem) {
                case this.ALIGNMENT_TOP_LEFT:
                case this.ALIGNMENT_TOP:
                case this.ALIGNMENT_TOP_RIGHT:
                case this.ALIGNMENT_LEFT:
                case this.ALIGNMENT_CENTER:
                case this.ALIGNMENT_RIGHT:
                case this.ALIGNMENT_BOTTOM_LEFT:
                case this.ALIGNMENT_BOTTOM:
                case this.ALIGNMENT_BOTTOM_RIGHT:
                    elem.classList.remove(classItem);
                    break;
            }
            i = i + 1;
        }
    };

    /**
     * @method
     * Creates a box container DOM element
     * @return {Object} The boxContainer DOM element
     */
    BoxLayout.createBoxContainer = function () {
        var div = document.createElement('div');
        div.classList.add(this.CONTAINER_CLASS);
        return div;
    };

    /**
     * @method
     * Creates a box DOM element
     * @return {Object} The box DOM element
     */
    BoxLayout.createBox = function () {
        var div = document.createElement('div');
        div.classList.add(this.BOX_CLASS);
        return div;
    };

    /**
     * @method
     * Sets the orientation of the boxes inside the boxContainer
     * @param {Object} elem The box container element or one of its children
     * @param {String} orientation The orientation which should be set. type of brease Enum.Orientation
     */
    BoxLayout.setOrientation = function (elem, orientation) {
        var container = _findClosest(elem, this.CONTAINER_CLASS);
        if (container) {
            this.resetContainerClass(container);

            // Set new class
            switch (orientation) {
                case Enum.Orientation.RTL:
                    container.classList.add(this.ORIENTATION_RIGHT);
                    break;
                case Enum.Orientation.LTR:
                    container.classList.add(this.ORIENTATION_LEFT);
                    break;
                case Enum.Orientation.TTB:
                    container.classList.add(this.ORIENTATION_TOP);
                    break;
                case Enum.Orientation.BTT:
                    container.classList.add(this.ORIENTATION_BOTTOM);
                    break;
            }
        }
    };

    /**
     * @method
     * Sets the alignment of a box element
     * @param {Object} elem The box DOM element or one of its children
     * @param {String} alignment The alignment which should be set
     */
    BoxLayout.setBoxAlign = function (elem, alignment) {
        var box = _findClosest(elem, this.BOX_CLASS);
        if (box) {
            this.resetBoxClass(box);

            // Set new class
            switch (alignment) {
                case 'TopLeft':
                    box.classList.add(this.ALIGNMENT_TOP_LEFT);
                    break;
                case 'Top':
                    box.classList.add(this.ALIGNMENT_TOP);
                    break;
                case 'TopRight':
                    box.classList.add(this.ALIGNMENT_TOP_RIGHT);
                    break;
                case 'Left':
                    box.classList.add(this.ALIGNMENT_LEFT);
                    break;
                case 'Center':
                    box.classList.add(this.ALIGNMENT_CENTER);
                    break;
                case 'Right':
                    box.classList.add(this.ALIGNMENT_RIGHT);
                    break;
                case 'BottomLeft':
                    box.classList.add(this.ALIGNMENT_BOTTOM_LEFT);
                    break;
                case 'Bottom':
                    box.classList.add(this.ALIGNMENT_BOTTOM);
                    break;
                case 'BottomRight':
                    box.classList.add(this.ALIGNMENT_BOTTOM_RIGHT);
                    break;

            }
        }
    };

    return BoxLayout;
});
