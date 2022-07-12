define([
    'brease/core/ContainerWidget',
    'brease/events/BreaseEvent',
    'brease/enum/Enum',
    'brease/core/Utils',
    'brease/core/ClassUtils',
    'brease/controller/libs/LogCode',
    'brease/decorators/DragAndDropCapability',
    'widgets/brease/common/DragDropProperties/libs/DroppablePropertiesEvents'
], function (
    SuperClass, BreaseEvent, Enum, Utils, ClassUtils, LogCode, dragAndDropCapability
) {

    'use strict';

    /**
    * @class widgets.brease.TabControl
    * #Description
    * widget which controls a set of TabItems
    *
    * @mixins widgets.brease.common.DragDropProperties.libs.DroppablePropertiesEvents
    *   
    * @breaseNote  
    * @extends brease.core.ContainerWidget
    * @iatMeta studio:license
    * licensed
    * @iatMeta studio:isContainer
    * true
    *
    * @iatMeta category:Category
    * Container
    * @iatMeta description:short
    * Kontrolliert eine Menge an TabItems
    * @iatMeta description:de
    * Container, welcher TabItems verwaltet und steuert
    * @iatMeta description:en
    * Container which controls TabItem Widgets
    */

    /**
    * @property {WidgetList} children=["widgets.brease.TabItem"]
    * @inheritdoc  
    */

    /**
    * @cfg {Integer} selectedIndex=0
    * @iatStudioExposed
    * @iatCategory Data
    * @bindable
    * Index of the selected item
    */

    /**
    * @cfg {brease.enum.TabPosition} tabPosition='top'
    * @iatStudioExposed
    * @iatCategory Appearance
    * Defines where the Tab-Buttons should be placed in relation to the Container.  
    */

    var uiController = brease.uiController,
        defaultSettings = {
            selectedIndex: 0,
            oldIndex: 0,
            tabPosition: Enum.TabPosition.top
        },

        WidgetClass = SuperClass.extend(function TabControl() {
            SuperClass.apply(this, arguments);
        }, defaultSettings),

        p = WidgetClass.prototype;

    p.init = function () {

        if (this.settings.omitClass !== true) {
            this.addInitialClass('breaseTabControl');
        }

        SuperClass.prototype.init.call(this);

        //Class added to container so it can be differentiated from tabbar container
        this.$tabItemContainer = this.getContainer().addClass('tabItemContainer');

        _setTabClass(this);
        _findTabs(this);
    };

    /**
    * @method setSelectedIndex
    * @iatStudioExposed
    * Sets SelectedIndex
    * @param {Integer} value
    */
    p.setSelectedIndex = function (value) {
        this.settings.selectedIndex = value;

        this.showHideContents(value);
    };

    /**
    * @method getSelectedIndex 
    * Returns selectedIndex.
    * @iatStudioExposed
    * @return {Integer}
    */
    p.getSelectedIndex = function () {
        return this.settings.selectedIndex;
    };

    /**
    * @method setTabPosition
    * Sets tabPosition
    * @param {brease.enum.TabPosition} tabPosition
    */
    p.setTabPosition = function (tabPosition) {
        this.settings.tabPosition = tabPosition;
        _setTabClass(this);
    };

    /**
    * @method getTabPosition 
    * Returns tabPosition.
    * @return {brease.enum.TabPosition}
    */
    p.getTabPosition = function () {
        return this.settings.tabPosition;
    };

    p._selectionChangedHandler = function (e) {

        var widget = this,
            tabItems = widget.container.children(),
            selectedElem = document.getElementById(e.detail.widgetId),
            i;
        if (selectedElem === null) {
            return;
        }
        for (i = 0; i < tabItems.length; i += 1) {
            if ($.containsOrEquals(tabItems[i], selectedElem)) {
                widget._tabClickHandler(tabItems[i].id);
                break;
            }
        }
    };

    p._tabClickHandler = function (tabId) {
        if (((this.isDisabled === true) && (brease.config.editMode === false))) {
            return;
        }

        var index = this.contents.map(function (content) { return content.id; }).indexOf(tabId);
        if (this.settings.oldIndex === index || index === -1) {

        } else {
            this.setSelectedIndex(index);

            this.submitChange();
        }

    };

    p.showHideContents = function (showIndex) {
        if (this.contents.length === 0) { return; }
        for (var i = 0; i < this.contents.length; i += 1) {
            if (i === showIndex) {
                brease.callWidget(this.contents[i].id, 'show');
            } else {
                brease.callWidget(this.contents[i].id, 'hide');
            }
        }
        this.settings.oldIndex = showIndex;
    };

    p.submitChange = function () {
        /**
        * @event change
        * Fired when selected index has changed    
        * @param {Integer} selectedIndex
        * See at {@link brease.events.BreaseEvent#static-property-CHANGE BreaseEvent.CHANGE} for event type  
        * @eventComment
        */
        this.dispatchEvent(new CustomEvent(BreaseEvent.CHANGE, {
            detail: {
                selectedIndex: this.settings.selectedIndex
            }
        }));
        this.sendValueChange({
            selectedIndex: this.getSelectedIndex()
        });

        /**
        * @event SelectedIndexChanged
        * @iatStudioExposed
        * Fired when index changes.
        * @param {Integer} value selected index
        */
        var ev = this.createEvent('SelectedIndexChanged', { value: this.getSelectedIndex() });
        ev.dispatch();
    };

    // widgetAddedHandler is called after  WIDGET_ADDED event of editor which is called after a new child widget is ready
    // which lets us use the already added css classes
    p.widgetAddedHandler = function (e) {
        var newWidget = document.getElementById(e.detail.widgetId);
        e.stopPropagation();
        //A&P 632785 It is not possible to add more than one TabItem using D&D functionality
        if (newWidget.classList.contains('breaseTabItemContainer') && !newWidget.parentElement.classList.contains('tabItemContainer')) {
            this.$tabItemContainer.append(newWidget);
        }
        if (newWidget.classList.contains('breaseTabItemContainer')) {
            //Add in Document Order: 
            this.tabBar.remove();
            _findTabs(this);
        }

    };

    p.widgetRemovedHandler = function (e) {

        var tabId = e.detail.widgetId,
            widget = this,
            elTabElem,
            elTabElemId;

        /*$.grep is filtering content array and $.each is going through tabBar children*/

        this.contents = $.grep(this.contents, function (tabElem) {
            elTabElem = $(tabElem);
            elTabElemId = elTabElem.attr('id');
            if ((elTabElemId === tabId) && (elTabElemId.length === tabId.length)) {
                widget.tabBar.children().each(function (index, tabButton) {
                    var elTabButton = $(tabButton),
                        elTabButtonId = elTabButton.attr('id');
                    if (elTabButtonId === tabId + '_breaseTabItemTab') {
                        elTabButton.remove();
                    }
                });
                return true;
            }
        }, true);
    };

    p.dispose = function () {

        this.el.off();

        $.each(this.contents, function (index, tabItem) {
            $(tabItem).off();
        });
        SuperClass.prototype.dispose.call(this);
        if (brease.config.editMode) {
            var contents = document.getElementsByClassName('iatd-content');
            contents[0].removeEventListener('selectionchanged', this._bind('_selectionChangedHandler'));
        }
    };

    p._initEditor = function () {
        this.settings.height = this.el.height();
        this.settings.width = this.el.width();
        _createTabItemAddControl(this);
        // there is no attribute that contains the contentid - therefore, i use the class 'iatd-content'
        var contents = document.getElementsByClassName('iatd-content');
        contents[0].addEventListener('selectionchanged', this._bind('_selectionChangedHandler'));
        this.elem.classList.add('iatd-outline');
    };

    function _createTabItemAddControl(widget) {
        var dataAttr = {
                'data-action': 'createWidget',
                'data-action-config': '{"type" : "widgets/brease/TabItem", "parentRefId": "' + widget.el.attr('id') + '" }'
            },
            elControl = $('<div>');

        elControl.addClass('iatd-action').attr(dataAttr);
        elControl.css({
            top: 0, right: 0, position: 'absolute', zIndex: 500
        });
        widget.elControlAdd = elControl.appendTo(widget.el);
    }

    function _findTabs(widget) {
        var tabDefs = [];

        // find all widgets in first level
        // filtering will happen in _addTabBar after instantiation, as we need meta data for that
        widget.$tabItemContainer.children('[data-brease-widget]').each(function () {
            var widgetElem = this,
                d = $.Deferred();
            tabDefs.push(d);

            if (uiController.getWidgetState(widgetElem.id) >= Enum.WidgetState.INITIALIZED) {
                d.resolve();
            } else {
                widgetElem.addEventListener(BreaseEvent.WIDGET_INITIALIZED, function (e) {
                    d.resolve();
                });
            }
        });

        $.when.apply($, tabDefs).done(function () {
            _addTabBar(widget);
        });
    }

    function _addTabBar(widget) {
        //A&P 632785 It is not possible to add more than one TabItem using D&D functionality
        //TabBar has now class 'container iatd-droppable'
        var elTabBar = $('<div class="tabbar container iatd-droppable"/>');
        elTabBar.css('flex-grow', 0);
        widget.contents = [];

        widget.$tabItemContainer.children('[data-brease-widget]').each(function () {
            var childElem = this,
                childWidget = brease.callWidget(childElem.id, 'widget');

            // allow TabItem and all widgets which inherit from TabItem (e.g. derived widgets)
            if (ClassUtils.isDerivedFrom(childWidget, 'widgets.brease.TabItem')) {
                _initializeTabItem(widget, childWidget, elTabBar);
            } else {
                _removeInvalidWidget(widget, childWidget);
            }
        });

        widget.tabBar = elTabBar;
        widget.el.append(widget.tabBar);
        widget.setSelectedIndex(widget.settings.selectedIndex);

        if (brease.config.editMode && widget.initialization !== true) {
            widget.elControlAdd = widget.elControlAdd.insertAfter(widget.container);
            widget.initialization = true;
        }
    }

    function _removeInvalidWidget(widget, childWidget) {
        childWidget.dispose();
        var childType = ClassUtils.path2ClassName(childWidget.settings.className),
            widgetType = ClassUtils.path2ClassName(widget.settings.className);
            
        console.warn('widget of type "' + childType + '" not allowed as child in widget "' + widget.elem.id + '" (' + widgetType + ')');
        if (!brease.config.editMode) {
            var log = LogCode.getConfig(LogCode.CLIENT_INVALID_WIDGET_LOCATION),
                contentId = widget.settings.parentContentId,
                logArgs = [childType, Utils.getWidgetId(contentId, widget.elem.id), widgetType, contentId];
            brease.services.logger.log(log.code, Enum.EventLoggerCustomer.BUR, log.verboseLevel, log.severity, logArgs); 
        }
    }

    function _initializeTabItem(widget, childWidget, tabBar) {
        var tab = childWidget.getTabElement();

        if (brease.config.editMode) {
            tab.on(BreaseEvent.EDIT.CLICK, function () {
                widget._tabClickHandler(childWidget.elem.id);
            });
        }

        childWidget.setParentId(widget.elem.id);
        tabBar.append(tab);
        widget.contents.push(childWidget.elem);
    }

    function _setTabClass(widget) {
        var tabClass;

        switch (widget.settings.tabPosition) {
            case Enum.TabPosition.left:
                tabClass = 'tabs-left';
                break;

            case Enum.TabPosition.right:
                tabClass = 'tabs-right';
                break;

            case Enum.TabPosition.top:
                tabClass = 'tabs-top';
                break;

            case Enum.TabPosition.bottom:
                tabClass = 'tabs-bottom';
                break;

        }
        widget.el.removeClass('tabs-left tabs-right tabs-top tabs-bottom').addClass(tabClass);
    }

    return dragAndDropCapability.decorate(WidgetClass, false);
});
