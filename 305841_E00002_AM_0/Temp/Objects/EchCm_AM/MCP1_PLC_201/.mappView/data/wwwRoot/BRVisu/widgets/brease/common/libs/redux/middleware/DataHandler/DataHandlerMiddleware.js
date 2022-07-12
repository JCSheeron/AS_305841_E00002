define([
    'brease/events/BreaseEvent', 
    'brease/enum/Enum', 
    'brease/core/Utils',
    'widgets/brease/common/libs/redux/reducers/DataHandler/DataHandlerActions'
], function (BreaseEvent, Enum, Utils, DataHandlerActions) {

    'use strict';

    /**
     * @class widgets.brease.common.libs.redux.middleware.DataHandler.DataHandlerMiddleware
     * @extends core.javascript.Object
     * 
     * DISCLAIMER: The DataHandler module is merely a redux adoptation of the DataHandlerWidget where the code was originally implemented.
     * 
     * If you decide to use this reducer there are a few dependencies that needs to be considered.
     * First the Action with the same name has to be used.
     * Second the Reducer with same name also has to be used,
     * third; the store must contain a state called dataHandler which must contain a (boolean) flag called childrenInitialised.<br />
     * Last, the Widget must support the following methods for this reducer to work:<br />
     *   1. p.childrenAdded = function () {} <br />
     *   2. p.childrenRemoved = function () {} <br />
     *   3. p.childrenInitializedHandler = function () {}<br />
     * <br />
     * The first action to be called, immediately after the store is created is the COLLECT_CHILDREN. This will look up all children and wait
     * for these to be instantiated. After that the middleware will be turned off and not called again, in runtime. In editor the middlware
     * will continue listening for additional child widgets being dropped/removed from the widget.
     * 
     * See the AlarmLine for an example on how to work with the DataHandler Reducer/Action/Middleware
     * 
     * To add this middleware, change how the store is created to:
     * this.store = Redux.createStore(SoomeMainReducer, initState, Redux.applyMiddleware(DataHandlerMiddleware.childrenInitialized(this)));
     * 
     * @iatMeta studio:visible
     * false
     */

    var MiddleWare = {};

    /**
     * @method childrenInitialized
     * middleware used to control that nothing in the widget can be executed until all the children have been intialised. When all are intialized a flag is set so that the middleware isn\'t called again
     * @param {Object} widget
     */
    MiddleWare.childrenInitialized = function childrenInitialized(widget) {
        return function (store) {
            return function (next) {
                return function (action) {
                    if (widget.settings.childrenInitialized) {
                        next(action);
                    } else {

                        if (brease.config.editMode) {
                            MiddleWare._initEditor(widget);
                        } else {
                            MiddleWare._initChildren(widget, store);
                        }
                    }
                };
            };
        };
    };

    MiddleWare._initEditor = function (widget) {
        if (brease.config.editMode === true) {
            widget.elem.addEventListener(BreaseEvent.WIDGET_ADDED, widget._bind(widget.childrenAdded));
            widget.elem.addEventListener(BreaseEvent.WIDGET_REMOVED, widget._bind(widget.childrenRemoved));
            widget.settings.childrenInitialized = true;
        }
    };

    MiddleWare._initChildren = function (widget, store) {
        var itemDefs = [], childrenIdList = [];

        widget.el.find('[data-brease-widget]').each(function () {
            var children = this,
                id = children.id,
                d = $.Deferred();

            itemDefs.push(d);
            childrenIdList.push(id);

            if (brease.uiController.getWidgetState(id) >= Enum.WidgetState.INITIALIZED && brease.uiController.getWidgetState(id) !== Enum.WidgetState.SUSPENDED) {
                d.resolve();
            } else {
                children.addEventListener(BreaseEvent.WIDGET_INITIALIZED, function (e) {
                    d.resolve();
                });
            }
        });

        $.when.apply($, itemDefs).done(function () {
            widget.settings.childrenInitialized = true;
            MiddleWare.childrenInitializedHandler(widget, childrenIdList, store);
            MiddleWare._setChildWidgetEnableState(widget);
        });
    };

    MiddleWare.childrenInitializedHandler = function (widget, childrenIdList, store) {
        var childrenList = [];
        childrenIdList.forEach(function (id) {
            var childrenWidget = brease.callWidget(id, 'widget');
            childrenList.push(childrenWidget);
        });

        childrenIdList.forEach(function (id) {
            var childrenWidget = brease.callWidget(id, 'widget');
            if (Utils.isFunction(childrenWidget.setParentWidget)) {
                childrenWidget.setParentWidget(widget);
            }
        });

        //Set Action that all children are ready. Throw Action
        var action = DataHandlerActions.childrenInitialised(childrenList, childrenIdList);
        store.dispatch(action);

        //Update widget
        widget.childrenInitializedHandler();
    };

    MiddleWare._setChildWidgetEnableState = function (widget) {
        widget.settings.childrenIdList.forEach(function (id) {
            brease.uiController.callWidget(id, 'setParentEnableState', !widget.isDisabled);
        });
    };
    
    return MiddleWare;

});
