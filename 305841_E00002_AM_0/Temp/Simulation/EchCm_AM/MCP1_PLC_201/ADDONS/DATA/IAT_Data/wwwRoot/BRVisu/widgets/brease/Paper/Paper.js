define([
    'brease/core/BaseWidget',
    'brease/events/BreaseEvent',
    'widgets/brease/Paper/libs/Renderer',
    'brease/core/Utils',
    'widgets/brease/common/libs/redux/utils/UtilsSvg',
    'brease/decorators/DragAndDropCapability',
    'widgets/brease/common/DragDropProperties/libs/DroppablePropertiesEvents'
], function (SuperClass, BreaseEvent, Renderer, Utils, UtilsSvg, dragAndDropCapability) {

    'use strict';

    /**
    * @class widgets.brease.Paper
    * #Description
    * This widget allows the displaying and modification of svg contents at runtime.
    * @extends brease.core.BaseWidget
    *
    * @mixins widgets.brease.common.DragDropProperties.libs.DroppablePropertiesEvents
    *
    * @iatMeta studio:license
    * licensed
    * @iatMeta category:Category
    * Drawing
    * @iatMeta description:short
    * SVG display and modification
    * @iatMeta description:de
    * Ermöglicht die Darstellung und Modifikation von SVG-Inhalten zur Laufzeit.
    * @iatMeta description:en
    * Allows the displaying and modification of svg contents at runtime.
    */

    /**
    * @cfg {ColorList} colorList='#FFCC66,#FF8800,#FFCC99,#993333'
    * @iatStudioExposed
    * @iatCategory Appearance
    * List of possible colors to apply to svg elements.
    */

    /**
    * @cfg {UInteger} transitionTime=500
    * @iatStudioExposed
    * @bindable
    * @iatCategory Behavior
    * Default execution time of any svg transformation.
    */

    /**
    * @cfg {ImagePath} svgFilePath=''
    * @iatStudioExposed
    * @bindable
    * @iatCategory Data
    * Path to a .svg file which should be displayed on the widget.
    */

    /**
    * @cfg {String} svgContent=''
    * @iatStudioExposed
    * @bindable
    * @iatCategory Data
    * Additional svg string content to display on the widget.
    */

    /**
    * @cfg {String} transform=''
    * @iatStudioExposed
    * @bindable
    * @not_projectable
    * @iatCategory Data
    * Array of strings which contains commands to modify the existings svg elements.
    */

    /**
    * @cfg {UNumber} minZoomLevel=20
    * @iatStudioExposed
    * @iatCategory Behavior
    * Defines in percentage the lower limit of the zoom in the Paper area (100 means no zoom level applied)
    */

    /**
    * @cfg {UNumber} maxZoomLevel=500
    * @iatStudioExposed
    * @iatCategory Behavior
    * Defines in percentage the upper limit of the zoom in the Paper area (100 means no zoom level applied)
    */

    var defaultSettings = {
            svgFilePath: '',
            svgContent: '',
            transform: '',
            colorList: '#FFCC66,#FF8800,#FFCC99,#993333',
            transitionTime: 500,
            minZoomLevel: 20,
            maxZoomLevel: 500
        },

        WidgetClass = SuperClass.extend(function Paper() {
            SuperClass.apply(this, arguments);
        }, defaultSettings),

        p = WidgetClass.prototype;

    p.init = function () {
        this.el.addClass('breasePaper');
        this.timeTransform = new Date();
        this.timeSvgContent = new Date();
        this.elem.addEventListener(BreaseEvent.WIDGET_READY, this._bind('_widgetReadyHandler'));
        this.settings.colorList = this._parseColorList(this.settings.colorList);
        this.$svgContainer = this.el.children('svg.breasePaperSVGContainer');
        this.renderer = new Renderer(this, this.settings);
        if (brease.config.editMode) {
            _addPlaceholderImage(this);
        } else {
            this.setSvgContent(this.settings.svgContent);
            if (brease.config.preLoadingState === true) {
                this.widgetPreLoaded = true;
            } else {
                this.setSvgFilePath(this.settings.svgFilePath);
            }
        }
        SuperClass.prototype.init.apply(this, arguments);
    };

    /**
    * @method setColorList
    * Sets the list of possible colors to be used for svg element modification.
    * @param {ColorList} colorList
    */
    p.setColorList = function (colorList) {
        this.settings.colorList = this._parseColorList(colorList);
        this.renderer.updateColorList(this.settings.colorList);
    };

    /**
    * @method getColorList
    * Gets the list of possible colors.
    * @return {ColorList} 
    */
    p.getColorList = function () {
        return this.settings.colorList;
    };

    /**
    * @method setTransitionTime
    * Sets the execution time for a svg element transition.
    * @param {UInteger} transitionTime
    */
    p.setTransitionTime = function (transitionTime) {
        this.settings.transitionTime = transitionTime;
        this.renderer.updateTransitionTime(this.settings.transitionTime);
    };

    /**
    * @method getTransitionTime
    * Gets the execution time for a svg element transition
    * @return {UInteger} 
    */
    p.getTransitionTime = function () {
        return this.settings.transitionTime;
    };

    /**
    * @method setSvgFilePath
    * Sets the path to an .svg file which should be displayed.
    * @param {ImagePath} svgFilePath
    */
    p.setSvgFilePath = function (svgFilePath) {
        var deferred = new $.Deferred();
        var that = this;
        this.settings.svgFilePath = svgFilePath;
        if (!brease.config.editMode) {
            if (brease.config.preLoadingState !== true) {
            // to prevent updateSVG in preLoadingState, if svgFilePath is set via binding
                this.renderer.updateSVG('file', svgFilePath).then(function () {
                    _updateTransform.call(that);
                    deferred.resolve();
                });
            } else {
                deferred.resolve();
            }
        }
        return deferred;
    };

    /**
    * @method getSvgFilePath
    * Gets the path to the .svg file.
    * @return {ImagePath}
    */
    p.getSvgFilePath = function () {
        return this.settings.svgFilePath;
    };

    /**
    * @method setSvgContent
    * Set additional svg content to be displayed.
    * @param {String} svgContent
    */
    p.setSvgContent = function (svgContent) {
        var deferred = new $.Deferred();

        this.settings.svgContent = svgContent;
        if (!brease.config.editMode) {
            this.renderer.updateSVG('content', svgContent).then(function () {
                deferred.resolve();
            });
            _updateTransform.call(this);
        }

        return deferred;
    };

    /**
    * @method getSvgContent
    * Get the additionally added svg content.
    * @return {String}
    */
    p.getSvgContent = function () {
        return this.settings.svgContent;
    };

    /**
    * @method setTransform
    * Sets the String array used to modify the existing svg elements.
    * @param {String} transform
    */
    p.setTransform = function (transform) {
        var widget = this;
        if (transform) {
            $.when(widget.renderer.deferred).done(function () {
                var parsed = Utils.parseJSON(transform.replace(/'/g, '"'));
                if (parsed.error) {
                    console.warn(widget.elem.id + '.setTransform:' + parsed.error);
                } else {
                    widget.settings.transform = transform;
                    widget.data = parsed.obj;
                    widget.timeTransform = new Date();
                    widget.renderer.evalTransform(widget.data, 0);
                }
            });
        }
    };

    /**
    * @method getTransform
    * Get the string array used to modify the existing svg elements.
    * @return {String} 
    */
    p.getTransform = function () {
        return this.settings.transform;
    };

    /**
    * @method setMinZoomLevel
    * Sets minZoomLevel
    * @param {UNumber} minZoomLevel
    */
    p.setMinZoomLevel = function (minZoomLevel) {
        this.settings.minZoomLevel = minZoomLevel;
    };

    /**
    * @method getMinZoomLevel 
    * Returns minZoomLevel.
    * @return {UNumber}
    */
    p.getMinZoomLevel = function () {
        return this.settings.minZoomLevel;
    };

    /**
    * @method setMaxZoomLevel
    * Sets maxZoomLevel
    * @param {UNumber} maxZoomLevel
    */
    p.setMaxZoomLevel = function (maxZoomLevel) {
        this.settings.maxZoomLevel = maxZoomLevel;
    };

    /**
    * @method getMaxZoomLevel 
    * Returns maxZoomLevel
    * @return {UNumber}
    */
    p.getMaxZoomLevel = function () {
        return this.settings.maxZoomLevel;
    };

    /**
    * @method zoomIn
    * @iatStudioExposed
    * Zoom into the Paper
    */
    p.zoomIn = function () {
        this.renderer.executeActionZoom(1);
    };

    /**
    * @method zoomOut
    * @iatStudioExposed
    * Zoom out of the Paper
    */
    p.zoomOut = function () {
        this.renderer.executeActionZoom(-1);
    };

    /**
    * @method zoomReset
    * @iatStudioExposed
    * Reset the zoom level to 100%
    */
    p.zoomReset = function () {
        this.renderer.executeActionZoom(0);
    };

    p._widgetReadyHandler = function () {
        return false;
    };

    p._parseColorList = function (colorList) {
        // eslint-disable-next-line no-useless-escape
        return colorList.match(/(((rgba\((((25[0-5])|(2[01234][0-9])|([01][0-9][0-9])|([0-9]{1,2})),(\s)?){3}((0\.[0-9]{1,2})|1(.0)?|0)\)))|([\#]([a-fA-F\d]{6}|[a-fA-F\d]{3})))/g);
    };

    p._customClickHandler = function (e) {
        // _customClickHandler will trigger the click event as regular clicks are not detected on moving elements anymore.
        if (this.isDisabled) {
            /**
            * @event DisabledClick
            * Fired when disabled element is clicked on.
            * @iatStudioExposed
            * @param {String} horizontalPos horizontal position of click in pixel i.e '10px'
            * @param {String} verticalPos vertical position of click in pixel i.e '10px'
            * @param {String} origin id of widget that triggered this event
            * @param {Boolean} hasPermission defines if the state is caused due to missing roles of the current user 
            * @eventComment
            */
            var origin = brease.uiController.parentWidgetId(e.target),
                hasPermission = (this.settings.editable && this.settings.permissions.operate);
            var disabledClickEv = this.createMouseEvent('DisabledClick', { hasPermission: hasPermission, origin: origin }, e);
            disabledClickEv.dispatch(false);
            document.body.dispatchEvent(new CustomEvent(BreaseEvent.DISABLED_CLICK, {
                detail: {
                    contentId: this.settings.parentContentId,
                    hasPermission: hasPermission,
                    origin: origin,
                    widgetId: this.elem.id,
                    horizontalPos: disabledClickEv.data.eventArgs.horizontalPos,
                    verticalPos: disabledClickEv.data.eventArgs.verticalPos
                },
                bubbles: true
            }));
            SuperClass.prototype._handleEvent.call(this, e);
            return;
        }

        var svgClickPoint = this._createSVGPointFromClick(this, e);

        var eventArgs = {
            x: Math.round(svgClickPoint.x),
            y: Math.round(svgClickPoint.y),
            origin: brease.uiController.parentWidgetId(e.target),
            elementId: 'noElementClicked'
        };

        var clickedElement;

        if (e.type === 'vmousedown') {
            clickedElement = document.elementFromPoint(e.clientX, e.clientY);
        }

        if (clickedElement && clickedElement.ownerSVGElement && clickedElement.hasAttribute('id')) {
            eventArgs.elementId = '#' + clickedElement.getAttribute('id');
        }

        /**
       * @event Click
       * @iatStudioExposed
       * Fired when widget is clicked
       * @param {Integer} x
       * @param {Integer} y
       * @param {String} horizontalPos horizontal position of click in pixel i.e '10px'
       * @param {String} verticalPos vertical position of click in pixel i.e '10px'
       * @param {String} origin id of widget that triggered this event
       * @param {String} elementId id of a clicked svg element
       */
        var clickEv = this.createMouseEvent('Click', eventArgs, e);
        clickEv.dispatch();
        //clickEv.target = this.elem;
        //SuperClass.prototype._clickHandler.call(this, clickEv);
    };

    // overwrite base click handler to prevent it from firing the click event. _mouseUpHandler will do this.
    p._clickHandler = function (e) {
    };

    p._triggerTransformDoneEvent = function (originalSelect) {

        /**
       * @event TransformDone
       * @iatStudioExposed
       * Fired when a transform command has finished execution.
       * @param {String} select
       */

        var ev;

        if (this.elem) {
            ev = this.createEvent('TransformDone', { select: originalSelect });
            ev.dispatch();
        }

    };

    p.wake = function () {
        SuperClass.prototype.wake.apply(this, arguments);
        if (this.widgetPreLoaded) {
            this.widgetPreLoaded = false;
            // A&P 666500. Widget doesn't load svg when precaching is used and svgFile is binded 
            // as we prevent setting svgFilePath in preloadingState, there is no need to ask if file-container is empty
            if (this.settings.svgFilePath !== '') {
                this.setSvgFilePath(this.settings.svgFilePath);
            }
        }
    };

    p.dispose = function () {
        this.elem.removeEventListener(BreaseEvent.WIDGET_READY, this._bind('_widgetReadyHandler'));
        clearTimeout(this.renderer.timeout);
        SuperClass.prototype.dispose.apply(this, arguments);
    };

    p._createSVGPointFromClick = function (widget, e) {
        // convert point from d3.createSVGPoint
        var point = this.$svgContainer.get(0).createSVGPoint(),
            leftBorder = parseInt(widget.el.css('border-left-width'), 10),
            rightBorder = parseInt(widget.el.css('border-right-width'), 10),
            topBorder = parseInt(widget.el.css('border-top-width'), 10),
            bottomBorder = parseInt(widget.el.css('border-bottom-width'), 10),
            scaleFactor = Utils.getScaleFactor(widget.elem);

        if (e.type === 'vmousedown') {
            point.x = (e.pageX - widget.el.offset().left) / scaleFactor;
            point.y = (e.pageY - widget.el.offset().top) / scaleFactor;
        }

        if (point.x > (widget.elem.clientWidth + leftBorder + rightBorder)) {
            point.x = widget.elem.clientWidth + leftBorder + rightBorder;
        } else if (point.x < 0) {
            point.x = 0;
        }

        if (point.y > (widget.elem.clientHeight + topBorder + bottomBorder)) {
            point.y = widget.elem.clientHeight + topBorder + bottomBorder;
        } else if (point.y < 0) {
            point.y = 0;
        }

        return point;
    };

    p._setViewBoxDimensions = function (elemWidth, elemHeight) {
        var viewBox = '0 0 ' + elemWidth + ' ' + elemHeight;
        UtilsSvg.setViewBox(this.$svgContainer.get(0), viewBox);
    };

    function _addPlaceholderImage(widget) {
        widget.el.css({
            'background-image': 'url("widgets/brease/Paper/assets/PaperPlaceholder.svg")',
            'background-repeat': 'no-repeat',
            'background-position': 'center center'
        });
    }

    function _updateTransform() {
        if (this.settings.transform !== '') {
            this.timeSvgContent = new Date();
            this.data = JSON.parse(this.settings.transform.replace(/'/g, '"'));
            this.renderer.evalTransform(this.data, this.timeTransform - this.timeSvgContent);
        }
    }

    return dragAndDropCapability.decorate(WidgetClass, false);
});
