define(function () {

    'use strict';
    var propertyDefaults = {
            enumerable: true,
            configurable: false,
            writable: false
        },

        _defineProperty = function (obj, name, value) {
            propertyDefaults.value = value;
            Object.defineProperty(obj, name, propertyDefaults);
        };

    var eventNames = {};
    _defineProperty(eventNames, 'CLICK', 'vclick');
    _defineProperty(eventNames, 'MOUSE_DOWN', 'vmousedown');
    _defineProperty(eventNames, 'MOUSE_UP', 'vmouseup');
    _defineProperty(eventNames, 'MOUSE_MOVE', 'vmousemove');
    _defineProperty(eventNames, 'DBL_CLICK', 'dblclick');

    _defineProperty(eventNames, 'ONDRAG_ENTER', 'OnDragEnter');
    _defineProperty(eventNames, 'ONDRAG_LEAVE', 'OnDragLeave');
    _defineProperty(eventNames, 'ONDROP', 'OnDrop');

    var BreaseEvent = function () {
            this.EDIT = {};
        },
        p = BreaseEvent.prototype;

    _defineProperty(p, 'eventNames', eventNames);
    _defineProperty(p, 'support', {});

    p.init = function (editMode) {

        this.setEditMode(editMode);

        try { // testing the support of an options object in addEventlistener
            document.createElement('div').addEventListener('test', function () { }, { get capture() { breaseEvent.support.options = true; return false; } });
        } catch (e) {
            breaseEvent.support.options = false;
        }
        delete p.init;
    };

    p.setEditMode = function (editMode) {

        for (var name in this.eventNames) {
            this.EDIT[name] = (editMode === true) ? this.eventNames[name] : 'notAvailable';
            this[name] = (editMode === true) ? 'notAvailable' : this.eventNames[name];
        }
    };

    /** 
    * @enum {String} brease.events.BreaseEvent 
    */
    var breaseEvent = new BreaseEvent();
    
    /**
    * @property {String} APP_READY='app_ready'
    * @readonly
    * @static
    */
    /**
    * @property {String} APP_RESIZE='app_resize'
    * @readonly
    * @static
    */
    _defineProperty(breaseEvent, 'APP_READY', 'app_ready');
    _defineProperty(breaseEvent, 'APP_RESIZE', 'app_resize');
    _defineProperty(breaseEvent, 'UI_READY', 'ui_ready');
    _defineProperty(breaseEvent, 'BINDING_LOADED', 'binding_loaded');
    _defineProperty(breaseEvent, 'EVENTBINDING_LOADED', 'eventbinding_loaded');
    _defineProperty(breaseEvent, 'CONTENT_ACTIVATED', 'ContentActivated');
    _defineProperty(breaseEvent, 'CONTENT_DEACTIVATED', 'ContentDeactivated');    
    _defineProperty(breaseEvent, 'CONTENT_SUSPENDED', 'ContentSuspended');
    _defineProperty(breaseEvent, 'CONTENT_DISPOSED', 'ContentDisposed');
    /**
    * @property {String} CONTENT_ACTIVATE_ERROR='content_activate_error'
    * @readonly
    * @static
    * Fired when content could not be activated (server responds with error)
    */
    _defineProperty(breaseEvent, 'CONTENT_ACTIVATE_ERROR', 'content_activate_error');
         
    _defineProperty(breaseEvent, 'VISU_ACTIVATED', 'VisuActivated');
    _defineProperty(breaseEvent, 'VISU_DEACTIVATED', 'VisuDeactivated');

    /**
    * @property {String} CONTENT_REMOVED='ContentRemoved'
    * Fired after the content is removed from the DOM.
    * @readonly
    * @static
    */
    _defineProperty(breaseEvent, 'CONTENT_REMOVED', 'ContentRemoved');

    /**
    * @property {String} DISABLED_CLICK='disabled_click'
    * @readonly
    * @static
    */
    _defineProperty(breaseEvent, 'DISABLED_CLICK', 'disabled_click');

    /**
    * @property {String} RESOURCES_LOADED='resources_loaded'
    * @readonly
    * @static
    */
    _defineProperty(breaseEvent, 'RESOURCES_LOADED', 'resources_loaded');
    _defineProperty(breaseEvent, 'CONFIG_LOADED', 'config_loaded');

    //Language.js
    _defineProperty(breaseEvent, 'LANGUAGE_LOADED', 'language_loaded');
    /**
    * @property {String} LANGUAGE_CHANGED='language_changed'
    * @readonly
    * @static
    */
    _defineProperty(breaseEvent, 'LANGUAGE_CHANGED', 'language_changed');

    //Culture.js
    _defineProperty(breaseEvent, 'CULTURE_LOADED', 'culture_loaded');
    /**
    * @property {String} CULTURE_CHANGED='culture_changed'
    * @readonly
    * @static
    */
    _defineProperty(breaseEvent, 'CULTURE_CHANGED', 'culture_changed');

    //MeasurementSystem.js
    _defineProperty(breaseEvent, 'MEASUREMENT_SYSTEM_LOADED', 'measurementSystem_loaded');
    _defineProperty(breaseEvent, 'MEASUREMENT_SYSTEM_CHANGED', 'measurementSystem_changed');

    //User.js
    _defineProperty(breaseEvent, 'USER_CHANGED', 'user_changed');
    _defineProperty(breaseEvent, 'USER_LOADED', 'user_loaded');
    _defineProperty(breaseEvent, 'ROLES_CHANGED', 'roles_changed');

    // BreaseEvent.CHANGEPASSWORDDIALOG_CLOSED needs a different value to ClientSystemEvent.CHANGEPASSWORDDIALOG_CLOSED
    _defineProperty(breaseEvent, 'CHANGEPASSWORDDIALOG_CLOSED', 'change_password_dialog_closed');

    //Scroller.js
    _defineProperty(breaseEvent, 'SCROLL_START', 'scrollStart');
    _defineProperty(breaseEvent, 'SCROLL_END', 'scrollEnd');
    /**
    * @property {String} VISIBILITY_CHANGED='visibility_changed'
    * @readonly
    * @static
    */
    _defineProperty(breaseEvent, 'VISIBILITY_CHANGED', 'visibility_changed');
    
    _defineProperty(breaseEvent, 'BEFORE_ENABLE_CHANGE', 'before_enable_change');
    _defineProperty(breaseEvent, 'ENABLE_CHANGED', 'EnableChanged');
    _defineProperty(breaseEvent, 'BEFORE_VISIBLE_CHANGE', 'before_visible_change');
    _defineProperty(breaseEvent, 'VISIBLE_CHANGED', 'VisibleChanged');

    _defineProperty(breaseEvent, 'FOCUS_IN', 'FocusIn');
    _defineProperty(breaseEvent, 'FOCUS_OUT', 'FocusOut');

    /**
    * @property {String} BEFORE_FOCUS_MOVE='BeforeFocusMove'
    * Will be fired to the widget element before the focus moves to antoher widget due to (shift+)tab or FocusNext action.
    * Note: Will not be fired if focus is changed due to click or focus action.
    * @readonly
    * @static
    */
    _defineProperty(breaseEvent, 'BEFORE_FOCUS_MOVE', 'BeforeFocusMove');

    //Logger.js
    _defineProperty(breaseEvent, 'LOG_MESSAGE', 'log_message');

    //UIController
    /**
    * @property {String} CONTENT_PARSED='content_parsed'
    * @readonly
    * @static
    */
    _defineProperty(breaseEvent, 'CONTENT_PARSED', 'content_parsed');

    /**
    * @property {String} CONTENT_READY='content_ready'
    * @readonly
    * @static
    */
    _defineProperty(breaseEvent, 'CONTENT_READY', 'content_ready');
    _defineProperty(breaseEvent, 'CONTENT_LOAD_ABORTED', 'content_load_aborted');

    /**
    * @property {String} PROPERTY_CHANGED='property_changed'
    * @readonly
    * @static
    */
    _defineProperty(breaseEvent, 'PROPERTY_CHANGED', 'property_changed');
    _defineProperty(breaseEvent, 'INITIAL_VALUE_CHANGE_FINISHED', 'PropertyValueChangedFinished');
    /**
    * @property {String} WIDGET_READY='widget_ready'
    * @readonly
    * @static
    */
    _defineProperty(breaseEvent, 'WIDGET_READY', 'widget_ready');
    _defineProperty(breaseEvent, 'WIDGET_INITIALIZED', 'widget_initialized');
    _defineProperty(breaseEvent, 'WIDGET_DISPOSE', 'widget_dispose');
    _defineProperty(breaseEvent, 'WIDGET_UPDATED', 'widget_updated');

    _defineProperty(breaseEvent, 'PLUGIN_LOADED', 'plugin_loaded');
    _defineProperty(breaseEvent, 'SYSTEM_KEYBOARD_CHANGED', 'system_keyboard_changed');

    // Windows
    /**
    * @property {String} CLOSED='window_closed'
    * @readonly
    * @static
    */
    _defineProperty(breaseEvent, 'CLOSED', 'window_closed');
    _defineProperty(breaseEvent, 'WINDOW_SHOW', 'window_show');

    // Dialogs
    _defineProperty(breaseEvent, 'DIALOG_OPEN', 'dialog_open');
    _defineProperty(breaseEvent, 'DIALOG_CLOSED', 'dialog_closed');
    _defineProperty(breaseEvent, 'DIALOG_OPEN_ABORTED', 'dialog_open_aborted');

    // MessageBox
    _defineProperty(breaseEvent, 'MESSAGE_BOX_OPENED', 'message_box_open');
    _defineProperty(breaseEvent, 'MESSAGE_BOX_CLOSED', 'message_box_close');

    // Tooltips
    _defineProperty(breaseEvent, 'TOOLTIPMODE_ACTIVE', 'tooltipMode_activate');
    _defineProperty(breaseEvent, 'TOOLTIPMODE_INACTIVE', 'tooltipMode_inactive');
    
    // Drag and Drop
    _defineProperty(breaseEvent, 'ONDRAG_START', 'OnDragStart');
    _defineProperty(breaseEvent, 'ONDRAG_END', 'OnDragEnd');
    
    //Table.js
    /**
    * @property {String} SORT_COMPLETED='sort_completed'
    * @readonly
    * @static
    */
    _defineProperty(breaseEvent, 'SORT_COMPLETED', 'sort_completed');
    /**
    * @property {String} ROW_SELECTED='row_selected'
    * @readonly
    * @static
    */
    _defineProperty(breaseEvent, 'ROW_SELECTED', 'row_selected');

    //Fragment.js
    /**
    * @property {String} FRAGMENT_LOADED='fragment_loaded'
    * @readonly
    * @static
    */
    _defineProperty(breaseEvent, 'FRAGMENT_LOADED', 'fragment_loaded');
    /**
    * @property {String} FRAGMENT_SHOW='fragment_show'
    * @readonly
    * @static
    */
    _defineProperty(breaseEvent, 'FRAGMENT_SHOW', 'fragment_show');
    /**
    * @property {String} FRAGMENT_HIDE='fragment_hide'
    * @readonly
    * @static
    */
    _defineProperty(breaseEvent, 'FRAGMENT_HIDE', 'fragment_hide');
    _defineProperty(breaseEvent, 'BEFORE_HIDE', 'fragment_before_hide');
    _defineProperty(breaseEvent, 'BEFORE_UNLOAD', 'fragment_before_unload');
    _defineProperty(breaseEvent, 'PAGE_CHANGE', 'pageChange');
    /**
     * @property {String} PAGE_LOADED='pageLoaded'
     * @readonly
     * @static
     * Fired when all new contents are activaded (CONTENT_ACTIVATED) and old are deactivated (CONTENT_DEACTIVATED)
     */
    _defineProperty(breaseEvent, 'PAGE_LOADED', 'pageLoaded');
    _defineProperty(breaseEvent, 'THEME_CHANGED', 'theme_changed');
    _defineProperty(breaseEvent, 'NAVIGATION_DISPOSE', 'navDispose');
    /**
    * @property {String} LOAD_ERROR='load_error'
    * @readonly
    * @static
    */
    _defineProperty(breaseEvent, 'LOAD_ERROR', 'load_error');
     
    //Trend.js
    _defineProperty(breaseEvent, 'UPDATE_CURSOR_INTERSECTION', 'update_cursor_intersection');
    _defineProperty(breaseEvent, 'UPDATE_CURSOR', 'update_ursor');
    _defineProperty(breaseEvent, 'REMOVE_CURSOR', 'remove_cursor');
    _defineProperty(breaseEvent, 'VIEWPORT_CHANGE', 'viewport_changed');
    _defineProperty(breaseEvent, 'CURVE_CHANGE', 'curve_changed');
    
    /**
    * @property {String} SUBMIT='value_submit'
    * @readonly
    * @static
    */
    _defineProperty(breaseEvent, 'SUBMIT', 'value_submit');
    /**
    * @property {String} CHANGE='change'
    * @readonly
    * @static
    */
    _defineProperty(breaseEvent, 'CHANGE', 'change');
    _defineProperty(breaseEvent, 'ATTRIBUTE_CHANGE', 'attribute_change');
    _defineProperty(breaseEvent, 'NODE_ATTRIBUTE_CHANGE', 'node_attribute_change');
    _defineProperty(breaseEvent, 'NUMBERFORMAT_CHANGE', 'numberFormat_change');
    _defineProperty(breaseEvent, 'GROUP_CHANGE', 'group_change');
    _defineProperty(breaseEvent, 'TICK', 'tick');
    _defineProperty(breaseEvent, 'ALERT', 'alert');
    _defineProperty(breaseEvent, 'TAP_HOLD', 'taphold');

    /**
    * @property {String} SHOW_MODAL='show_modal'
    * Fired when an element is shown modally.
    * detail.id should be used to identify SHOW-HIDE_MODAL pairs.
    * @readonly
    * @static
    */
    _defineProperty(breaseEvent, 'SHOW_MODAL', 'show_modal');
    /**
    * @property {String} HIDE_MODAL='hide_modal'
    * Fired when a modal element is hidden.
    * detail.id should be used to identify SHOW-HIDE_MODAL pairs.
    * @readonly
    * @static
    */
    _defineProperty(breaseEvent, 'HIDE_MODAL', 'hide_modal');
    
    /* content editor events - start */
    /* These events are fired only in content editor (brease.config.editMode=true)!*/
    
    /**
    * @property {String} WIDGET_ADDED='widget_added'
    * The event is triggered on a container widget html element when a widget is added.  
    * This event is fired only in content editor (brease.config.editMode=true)!  
    * @readonly
    * @static
    */
    _defineProperty(breaseEvent, 'WIDGET_ADDED', 'widget_added');

    /**
    * @property {String} WIDGET_REMOVED='widget_removed'
    * The event is triggered on a container widget html element when a widget is removed.   
    * This event is fired only in content editor (brease.config.editMode=true)!  
    * @readonly
    * @static
    */
    _defineProperty(breaseEvent, 'WIDGET_REMOVED', 'widget_removed');

    /**
    * @property {String} WIDGET_PROPERTIES_CHANGED='widget_properties_changed'
    * The event is triggered on the widget html element when a not styleable property of the widget is 
    * changed in the property grid.  
    * This event is fired only in content editor (brease.config.editMode=true)!  
    * @readonly
    * @static
    */
    _defineProperty(breaseEvent, 'WIDGET_PROPERTIES_CHANGED', 'widget_properties_changed');
    /**
    * @property {String} WIDGET_STYLE_PROPERTIES_CHANGED='widget_style_properties_changed'
    * The event is triggered on the widget html element when a style property of the widget is 
    * changed in the property grid.  
    * This event is fired only in content editor (brease.config.editMode=true)!  
    * @readonly
    * @static
    */
    _defineProperty(breaseEvent, 'WIDGET_STYLE_PROPERTIES_CHANGED', 'widget_style_properties_changed');
    /**
    * @property {String} WIDGET_EDITOR_IF_READY='WIDGET_EDITOR_IF_READY'
    * The event is triggered on the widget html element when the interface for the content editor
    * has been loaded. (editorHandles)
    * Mainly used for UnitTests.
    * This event is fired only in content editor (brease.config.editMode=true)!  
    * @readonly
    * @static
    */
    _defineProperty(breaseEvent, 'WIDGET_EDITOR_IF_READY', 'widget_editor_if_ready');
    /* content editor events - end */

    return breaseEvent;

});
