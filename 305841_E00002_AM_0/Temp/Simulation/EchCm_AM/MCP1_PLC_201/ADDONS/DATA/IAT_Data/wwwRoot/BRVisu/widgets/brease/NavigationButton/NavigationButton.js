/* eslint-disable no-useless-call */
define([
    'widgets/brease/ToggleButton/ToggleButton',
    'brease/events/BreaseEvent',
    'widgets/brease/common/DragDropProperties/libs/HideDraggablePropertiesEvents'
], function (SuperClass, BreaseEvent) {

    'use strict';

    /**
    * @class widgets.brease.NavigationButton
    * #Description
    * ToggleButton for loading purposes. Usually used in combination with NavigationBar. 
    * @breaseNote
    * @extends widgets.brease.ToggleButton
    *
    * @mixins widgets.brease.common.DragDropProperties.libs.HideDraggablePropertiesEvents
    *
    * @iatMeta category:Category
    * Navigation,Buttons
    * @iatMeta description:short
    * Button zum Seitenwechsel
    * @iatMeta description:de
    * Löst einen Seitenwechsel auf eine zugeordnete Seite aus wenn der Benutzer darauf klickt
    * @iatMeta description:en
    * Initiates an change to an associated page when the user clicks  it
    */

    /**
    * @cfg {PageReference} pageId (required) 
    * pageId of page to load (page is loaded to root container! not suitable for nested pages)
    * @iatStudioExposed
    * @iatCategory Data
    */
    
    /**
    * @cfg {Boolean} isToggle=true 
    * Set this option to false, if you want to prevent Button from toggling
    * @iatStudioExposed
    * @iatCategory Behavior
    */

    /**
    * @cfg {Boolean} value=false
    * Represents the boolean state of the element.
    * @iatCategory Data
    * @iatStudioExposed
    * @bindable
    * @editableBinding
    * @deprecated 5.6 Will be removed in mapp View 5.7
    */

    /**
    * @method setValueInteger
    * @hide
    */

    /**
    * @method setValueBool
    * @hide
    */

    /**
    * @method getValueInteger
    * @hide
    */

    /**
    * @method getValueBool
    * @hide
    */

    /**
    * @event ValueChanged
    * Fired when the status of the widget is changed by user interaction
    * @deprecated has been removed since mapp View 5.15
    * @iatStudioExposed
    * 
    */

    var defaultSettings = {
            isToggle: true
        },

        WidgetClass = SuperClass.extend(function NavigationButton() {
            SuperClass.apply(this, arguments);
        }, defaultSettings),

        p = WidgetClass.prototype;

    p.init = function () {
        if (this.settings.omitClass !== true) {
            this.addInitialClass('breaseNavigationButton');
        }

        SuperClass.prototype.init.call(this);

        var visuId = brease.pageController.getVisu4Page(this.settings.pageId),
            visu = brease.pageController.getVisuById(visuId);
        
        if (visu !== undefined) {
            var currentPageId = brease.pageController.getCurrentPage(visu.containerId);

            if (currentPageId === this.settings.pageId) {
                this.toggle.call(this, SuperClass.values.checked, true, true);
            } else {
                this.toggle.call(this, SuperClass.values.unchecked, true, true);
            }
        }
        
        brease.appElem.addEventListener(BreaseEvent.PAGE_LOADED, this._bind('_pageLoadedHandler'));
    };

    /**
    * @method setPageId
    * Sets pageId
    * @param {PageReference} pageId
    */
    p.setPageId = function (pageId) {
        this.settings.pageId = pageId;
    };

    /**
    * @method getPageId 
    * Returns pageId.
    * @return {PageReference}
    */
    p.getPageId = function () {
        return this.settings.pageId;
    };

    /**
    * @method setIsToggle
    * Sets isToggle
    * @param {Boolean} isToggle
    */
    p.setIsToggle = function (isToggle) {
        this.settings.isToggle = isToggle;
    };

    /**
    * @method getIsToggle 
    * Returns isToggle.
    * @return {Boolean}
    */
    p.getIsToggle = function () {
        return this.settings.isToggle;
    };

    /**
    * @method toggle
    * Switch between states.
    * @param {Integer} [status] This parameter is optional. If not set, this method toggles between states.
    * @param {Boolean} [omitSubmit] If true, value change is not submitted to SPS
    */
    p.toggle = function (status, omitSubmit, omitLoad) {
        if (this.settings.isToggle === true && ((this.settings.value === SuperClass.values.unchecked) || (omitSubmit && omitLoad))) {
            SuperClass.prototype.toggle.apply(this, arguments);
        }
        if (omitLoad !== true) {
            if (this.settings.value === SuperClass.values.checked || this.settings.isToggle === false) {
                try {
                    _loadPage.call(this, this.settings.pageId);
                } catch (e) {
                    SuperClass.prototype.toggle.call(this, SuperClass.values.unchecked);
                    console.iatWarn('Load page error', e);
                }
            }
        }
    };

    p._pageLoadedHandler = function (e) {
        var visu = brease.pageController.getVisuById(brease.pageController.getVisu4Page(this.settings.pageId));
        if (visu === undefined || this.el === null || e.detail.containerId !== visu.containerId) {
            return;
        }
        if (e.detail.pageId === this.settings.pageId) {
            this.toggle.call(this, SuperClass.values.checked, true, true);
        } else {
            this.toggle.call(this, SuperClass.values.unchecked, true, true);
        }
    };

    p.wake = function () {
        brease.appElem.addEventListener(BreaseEvent.PAGE_LOADED, this._bind('_pageLoadedHandler'));
        SuperClass.prototype.wake.apply(this, arguments);

        if (this.elem.closest('.breaseDialogWindow') !== undefined && this.elem.closest('.breaseDialogWindow') !== null) { // FIX for A&P: 645195
            var currentPage = brease.pageController.getCurrentPage('appContainer');

            if (currentPage === this.settings.pageId) {
                this.toggle.call(this, SuperClass.values.checked, true, true);
            } else {
                this.toggle.call(this, SuperClass.values.unchecked, true, true);
            }
        }
    };

    p.suspend = function () {
        brease.appElem.removeEventListener(BreaseEvent.PAGE_LOADED, this._bind('_pageLoadedHandler'));
        SuperClass.prototype.suspend.apply(this, arguments);
    };

    p.dispose = function () {
        brease.appElem.removeEventListener(BreaseEvent.PAGE_LOADED, this._bind('_pageLoadedHandler'));
        SuperClass.prototype.dispose.apply(this, arguments);
    };

    function _loadPage(pageId) {
        if (brease.pageController.isPageChangeInProgress()) {
            return;
        }
        var visu = brease.pageController.getVisuById(brease.pageController.getVisu4Page(pageId));
        if (visu !== undefined) {
            var container = document.getElementById(visu.containerId),
                result = brease.pageController.loadPage(pageId, container);
            if (result.success === false && result.code !== 'PAGE_IS_CURRENT') {
                SuperClass.prototype.toggle.call(this, SuperClass.values.unchecked);
            } 
        } else {
            SuperClass.prototype.toggle.call(this, SuperClass.values.unchecked); 
        }
    }

    return WidgetClass;

});
