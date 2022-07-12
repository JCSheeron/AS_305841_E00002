define([
    'widgets/brease/ButtonBar/ButtonBar', 
    'brease/events/BreaseEvent'
], function (SuperClass, BreaseEvent) {
    
    'use strict';

    /**
     * @class widgets.brease.NavigationBar
     * #Description
     * Object which contains a configurable number of buttons for changing pages
     *   
     * @breaseNote
     * @extends widgets.brease.ButtonBar
     * @iatMeta studio:isContainer
     * true
     *
     * @iatMeta category:Category
     * Container,Navigation
     * @iatMeta description:short
     * Navigationsleiste
     * @iatMeta description:de
     * Container, welcher eine konfigurierbare Anzahl von Schaltflächen für einen Seitenwechsel beinhaltet
     * @iatMeta description:en
     * Object which contains a configurable number of buttons for changing pages
     */

    /**
     * @property {WidgetList} children=["widgets.brease.NavigationButton"]
     * @inheritdoc
     */

    var defaultSettings = {
            initiated: false
        },

        WidgetClass = SuperClass.extend(function NavigationBar() {
            SuperClass.apply(this, arguments);
        }, defaultSettings),

        p = WidgetClass.prototype;

    p.init = function () {
        this.el.addClass('breaseNavigationBar');

        SuperClass.prototype.init.call(this);
        brease.appElem.addEventListener(BreaseEvent.PAGE_LOADED, this._bind('_pageLoadedHandler'));
    };

    p.setSelectedId = function () {
        // overwrite
    };

    /**
    * @method setSelectedIndex
    */
    p.setSelectedIndex = function () {
        // overwrite
    };

    p._buttonClickHandler = function () {
        // overwrite
    };

    p._buttonChangeHandler = function () {
        // overwrite
    };

    p._buttonChangeHandler = function () {
        // overwrite
    };

    p.removeClickHandler = function () {
        // overwrite
    };

    p.submitChange = function (property, value) {
        var dataObj = {};
        dataObj[property] = value;
        this.sendValueChange(dataObj);

        /**
         * @event SelectedIndexChanged
         * @iatStudioExposed
         * Fired when index changes.
         * @param {Integer} value selected index
         */
        var ev = this.createEvent('SelectedIndexChanged', { value: value });
        if (ev) {
            ev.dispatch();
        }
    };

    p.dispose = function () {
        brease.appElem.removeEventListener(BreaseEvent.PAGE_LOADED, this._bind('_pageLoadedHandler'));
        SuperClass.prototype.dispose.apply(this, arguments);
    };

    p.wake = function () {
        brease.appElem.addEventListener(BreaseEvent.PAGE_LOADED, this._bind('_pageLoadedHandler'));
        SuperClass.prototype.wake.apply(this, arguments);
    };

    p.suspend = function () {
        this.settings.selectedId = undefined;
        brease.appElem.removeEventListener(BreaseEvent.PAGE_LOADED, this._bind('_pageLoadedHandler'));
        SuperClass.prototype.suspend.apply(this, arguments);
    };

    p._pageLoadedHandler = function (e) {
        if (brease.pageController.getDialogById(e.detail.containerId) === undefined) {
            var indices = _getIndices(this, e.detail.pageId);
            
            if (indices.selectedIndex !== undefined) {
                this.settings.selectedIndex = indices.selectedIndex;
                this.settings.selectedId = indices.selectedId;

                this.submitChange('selectedIndex', this.settings.selectedIndex); 
            }
        }
    };

    function _getIndices(widget, currPage) {
        var indices = {
            selectedIndex: undefined,
            selectedId: ''
        };
        for (var i = 0; i < widget.buttons.length; i += 1) {
            if (brease.callWidget(widget.buttons[i].id, 'getPageId') === currPage) {
                indices.selectedIndex = i;
                indices.selectedId = widget.buttons[i].id;
            }
        }
        return indices;
    }

    return WidgetClass;
});
