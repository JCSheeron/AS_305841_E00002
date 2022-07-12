define([
    'brease/core/BaseWidget',
    'libs/d3/d3'
], function (SuperClass, d3) {

    'use strict';

    /**
    * @class widgets.brease.Line
    * #Description
    * Widget for displaying an line
    * @breaseNote 
    * @extends brease.core.BaseWidget
    *
    * @iatMeta category:Category
    * Drawing
    * @iatMeta description:short
    * Grafikobjekt
    * @iatMeta description:de
    * Zeichnet eine Linie
    * @iatMeta description:en
    * Draws a line
    */

    /**
    * @htmltag examples
    * ##Configuration examples:  
    *
    *     <div id="Line01" data-brease-widget="widgets/brease/Line" data-brease-options="{}"></div>
    *
    */

    /**
    * @cfg {Integer} x1 (required)
    * @iatStudioExposed
    * @iatCategory Layout
    * The x1 attribute defines the start of the line on the x-axis
    */
    /**
    * @cfg {Integer} y1 (required)
    * @iatStudioExposed
    * @iatCategory Layout
    * The y1 attribute defines the start of the line on the y-axis
    */

    /**
    * @cfg {Integer} x2 (required)
    * @iatStudioExposed
    * @iatCategory Layout
    * The x2 attribute defines the end of the line on the x-axis
    */

    /**
    * @cfg {Integer} y2 (required)
    * @iatStudioExposed
    * @iatCategory Layout
    * The y2 attribute defines the end of the line on the y-axis
    */

    /**
    * @cfg {String} tooltip=''
    * @iatStudioExposed
    * @hide
    */

    /**
    * @method showTooltip
    * @hide
    */

    var defaultSettings = {
        },

        WidgetClass = SuperClass.extend(function Line() {
            SuperClass.apply(this, arguments);
        }, defaultSettings),

        p = WidgetClass.prototype;

    p.init = function () {
        if (this.settings.omitClass !== true) {
            this.addInitialClass('breaseLine');
        }

        this.el.css('position', 'absolute');
        d3.select('#' + this.el[0].id).append('line');
        this.line = $(this.el.children()[0]);

        _updateLine(this);

        SuperClass.prototype.init.call(this);

        this._invalidate();
    };

    // override method called in BaseWidget.init
    p._initEditor = function () {
        var widget = this;
        require(['widgets/brease/Line/libs/EditorHandles'], function (EditorHandles) {
            var editorHandles = new EditorHandles(widget);
            widget.designer.getHandles = function () {
                return editorHandles.getHandles();
            };
        });
    };

    p.addClassNames = function (classNames) {
        if (this.el !== undefined && classNames !== '') {
            addClassSVG(this.el, classNames);
        }
        this.initialized = true;
    };

    /**
    * @method setX1
    * Sets x1
    * @param {Integer} x1
    */
    p.setX1 = function (x1) {

        this.settings.x1 = x1;
        _updateLine(this);
    };

    /**
    * @method getX1 
    * Returns x1
    * @return {Integer}
    */
    p.getX1 = function () {

        return this.settings.x1;
    };

    /**
    * @method setX2
    * Sets x2
    * @param {Integer} x2
    */
    p.setX2 = function (x2) {

        this.settings.x2 = x2;
        _updateLine(this);
    };

    /**
    * @method getX2 
    * Returns x2.
    * @return {Integer}
    */
    p.getX2 = function () {

        return this.settings.x2;
    };

    /**
    * @method setY1
    * Sets y1 
    * @param {Integer} y1
    */
    p.setY1 = function (y1) {

        this.settings.y1 = y1;
        _updateLine(this);
    };

    /**
    * @method getY1 
    * Returns y1
    * @return {Integer}
    */
    p.getY1 = function () {

        return this.settings.y1;
    };

    /**
    * @method setY2
    * Sets y2 
    * @param {Integer} y2
    */
    p.setY2 = function (y2) {

        this.settings.y2 = y2;
        _updateLine(this);
    };

    /**
    * @method getY2 
    * Returns y2
    * @return {Integer}
    */
    p.getY2 = function () {

        return this.settings.y2;
    };

    function addClassSVG(el, className) {
        for (var i = 0; i < className.length; i += 1) {
            el.addClass(className[i]);
        }
    }

    function _updateLine(widget) {

        widget.settings.width = Math.abs(widget.settings.x2 - widget.settings.x1);
        widget.settings.height = Math.abs(widget.settings.y2 - widget.settings.y1);
        widget.settings.left = Math.min(widget.settings.x1, widget.settings.x2);
        widget.settings.top = Math.min(widget.settings.y1, widget.settings.y2);
        widget.el.attr({
            width: Math.max(widget.settings.width, 1),
            height: Math.max(widget.settings.height, 1)
        }).css({
            left: widget.settings.left + 'px',
            top: widget.settings.top + 'px'
        });

        if (widget.settings.x1 <= widget.settings.x2) {
            if (widget.settings.y1 <= widget.settings.y2) {
                widget.line.attr({
                    x1: 0,
                    x2: widget.settings.width,
                    y1: 0,
                    y2: widget.settings.height
                });
            } else {
                widget.line.attr({
                    x1: 0,
                    x2: widget.settings.width,
                    y1: widget.settings.height,
                    y2: 0
                });
            }
        } else {
            if (widget.settings.y1 <= widget.settings.y2) {
                widget.line.attr({
                    x1: widget.settings.width,
                    x2: 0,
                    y1: 0,
                    y2: widget.settings.height
                });
            } else {
                widget.line.attr({
                    x1: widget.settings.width,
                    x2: 0,
                    y1: widget.settings.height,
                    y2: 0
                });
            }
        }
    }

    return WidgetClass;
});
