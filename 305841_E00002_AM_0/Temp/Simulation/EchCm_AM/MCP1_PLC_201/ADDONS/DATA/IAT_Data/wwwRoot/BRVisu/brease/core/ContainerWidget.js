define(['brease/core/BaseWidget', 'brease/events/BreaseEvent', 'brease/enum/Enum', 'brease/core/Utils'], function (SuperClass, BreaseEvent, Enum, Utils) {

    'use strict';

    /**
    * @class brease.core.ContainerWidget
    * @abstract
    * Base class for all container widgets.  
    * It should not usually be necessary to use this widget directly, because there are provided subclasses  
    * which implement specialized widget use cases which cover application needs.  
    * @extends brease.core.BaseWidget 
    *
    * @iatMeta studio:visible
    * false
    */

    /**
    * @property {WidgetList} children=["*"]
    * @inheritdoc  
    */
    var defaultSettings = {},

        WidgetClass = SuperClass.extend(function ContainerWidget() {
            SuperClass.apply(this, arguments);
        }, defaultSettings),

        p = WidgetClass.prototype;

    WidgetClass.widgetAddedHandler = 'widgetAddedHandler';
    WidgetClass.widgetRemovedHandler = 'widgetRemovedHandler';
    WidgetClass.widgetChangedHandler = 'widgetChangedHandler';

    p.init = function () {
        this.containerVisibility = true;
        this.el.wrapInner('<div class="container" />');
        this.getContainer();
        addListener.call(this);
        this.debouncedRefresh = _.debounce(this._refresh.bind(this), 100);
        
        SuperClass.prototype.init.apply(this, arguments);
    };

    p.disable = function () {
        SuperClass.prototype.disable.apply(this, arguments);
        if (this.initialized !== true) {
            inheritProperty.call(this, 'parentEnableState', false);
        }
    };

    p._enableHandler = function () {
        SuperClass.prototype._enableHandler.apply(this, arguments);
        var enabled = this.isEnabled();
        // A&P 630210: FlexBox: PermissionOperate is now applied to the child elements of nested FlexBoxes
        inheritProperty.call(this, 'parentEnableState', enabled);
    };

    p.updateChildrenVisibility = function () {
        var visibility = this.containerVisibility === true && this.isVisible();
        // A&P 679570: parentVisibleState from Container widget not applied if child is not initialized
        inheritProperty.call(this, 'parentVisibleState', visibility);
    };

    p.updateVisibility = function () {
        var hidden = this.isHidden;
        SuperClass.prototype.updateVisibility.apply(this, arguments);
        if (this.isHidden !== hidden) {
            hidden = this.isHidden;
            this.updateChildrenVisibility();
        }
        this.elem.dispatchEvent(new CustomEvent(BreaseEvent.VISIBILITY_CHANGED, { bubbles: false, detail: { visible: !this.isHidden } }));
    };

    p.visibilityChangeHandler = function (e) {
        if (this.scroller && ($.contains(e.target, this.elem) || e.target === this.elem || $.contains(this.elem, e.target))) {
            this.debouncedRefresh();
        }
    };

    p._refresh = function () {
        if (this.scroller && !this.isHidden) {
            this.scroller.refresh();
        }
    };

    p.dispose = function () {
        removeListener.call(this);
        if (this.scroller) {
            if (typeof this.scroller.destroy === 'function') {
                this.scroller.destroy();
            }
            this.scroller.wrapper = null;
            this.scroller = null;
        }
        SuperClass.prototype.dispose.apply(this, arguments);
    };

    p.wake = function () {
        SuperClass.prototype.wake.apply(this, arguments);
        document.body.addEventListener(BreaseEvent.VISIBILITY_CHANGED, this._bind('visibilityChangeHandler'), true);
    };

    p.suspend = function () {
        document.body.removeEventListener(BreaseEvent.VISIBILITY_CHANGED, this._bind('visibilityChangeHandler'), true);
        SuperClass.prototype.suspend.apply(this, arguments);
    };

    p.getContainer = function () {
        if (this.container === undefined) {
            this.container = this.el.find('>.container');
        }
        return this.container;
    };

    p[WidgetClass.widgetAddedHandler] = function () { };
    p[WidgetClass.widgetRemovedHandler] = function () { };
    p[WidgetClass.widgetChangedHandler] = function () {
        this.debouncedRefresh();
    };

    function addListener() {
        if (brease.config.editMode === true) {
            this.elem.addEventListener(BreaseEvent.WIDGET_ADDED, this._bind(WidgetClass.widgetAddedHandler));
            this.elem.addEventListener(BreaseEvent.WIDGET_REMOVED, this._bind(WidgetClass.widgetRemovedHandler));
            this.elem.addEventListener(BreaseEvent.WIDGET_PROPERTIES_CHANGED, this._bind(WidgetClass.widgetChangedHandler));
        }
        document.body.addEventListener(BreaseEvent.VISIBILITY_CHANGED, this._bind('visibilityChangeHandler'), true);
    }

    function removeListener() {
        if (brease.config.editMode === true) {
            this.elem.removeEventListener(BreaseEvent.WIDGET_ADDED, this._bind(WidgetClass.widgetAddedHandler));
            this.elem.removeEventListener(BreaseEvent.WIDGET_REMOVED, this._bind(WidgetClass.widgetRemovedHandler));
            this.elem.removeEventListener(BreaseEvent.WIDGET_PROPERTIES_CHANGED, this._bind(WidgetClass.widgetChangedHandler));
        }
        document.body.removeEventListener(BreaseEvent.VISIBILITY_CHANGED, this._bind('visibilityChangeHandler'), true);
    }

    function selectChildren(container) {
        var children = container.find('[data-brease-widget]');
        if (children.length > 0) {
            children = children.first().parent().children('[data-brease-widget]');
        }
        return children;
    }
    // used to inherit properties to child widgets either by callWidget or
    // by adding the value to the widget options
    function inheritProperty(property, value) {
        selectChildren(this.getContainer()).each(function () {
            if (setChildPropertyFailed.call(this, property, value)) {
                brease.uiController.addWidgetOption(this.id, property, value);
            }
        });
    }
    function setChildPropertyFailed(property, value) {
        return isChildInitializing.call(this) || callChildWidgetFailed.call(this, property, value);
    }
    function callChildWidgetFailed(property, value) {
        return brease.uiController.callWidget(this.id, Utils.setter(property), value) === null;
    }
    function isChildInitializing() {
        return brease.uiController.getWidgetState(this.id) < Enum.WidgetState.INITIALIZED;
    }
    return WidgetClass;

});
