define([
    'widgets/brease/common/libs/redux/reducers/DataHandler/DataHandlerActions',
    'widgets/brease/common/libs/redux/utils/UtilsDataHandler'
], function (DataHandlerActions, UtilsDataHandler) {

    'use strict';

    /**
     * @class widgets.brease.common.libs.redux.reducers.DataHandler.DataHandlerReducer
     * 
     * DISCLAIMER: The DataHandler module is merely a redux adoptation of the DataHandlerWidget where the code was originally implemented.
     * 
     * If you decide to use this reducer there are a few dependencies that needs to be considered.
     * First the Action with the same name has to be used.
     * Second the Middleware DataHandlerMiddleware has to be called by the store,
     * third; the store must contain a state called dataHandler which must contain a (boolean) flag called childrenInitialised.
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
     * @iatMeta studio:visible
     * false
     */

    var DataHandlerReducer = function DataHandlerReducer(state, action) {
        if (state === undefined) {
            return null;
        }
        var childrenWidgetId, childrenWidget;
        switch (action.type) {
            case DataHandlerActions.CHILDREN_INITIALISED: 
                state.childrenList = action.childrenList;
                state.childrenIdList = action.childrenIdList;
                return state;
            
            case DataHandlerActions.CHILD_ADDED:
                if (action.event.target === action.widget.elem) {
                    childrenWidgetId = event.detail.widgetId;
                    childrenWidget = brease.callWidget(childrenWidgetId, 'widget');
                    state.childrenIdList.push(childrenWidgetId);
                    state.childrenList.push(childrenWidget);
        
                    var orderID = UtilsDataHandler.order(action.widget);
                    state.childrenList.sort(function (a, b) {
                        return orderID.indexOf(a.elem.id) - orderID.indexOf(b.elem.id);
                    });
                    state.childrenIdList.sort(function (a, b) {
                        return orderID.indexOf(a) - orderID.indexOf(b);
                    });
                }
                return state;

            case DataHandlerActions.CHILD_REMOVED:
                if (action.event.target === action.widget.elem) {
                    childrenWidgetId = event.detail.widgetId;
                    childrenWidget = brease.callWidget(childrenWidgetId, 'widget');
                    var index = state.childrenIdList.indexOf(childrenWidgetId);
                    if (index > -1) {
                        state.childrenList.splice(index, 1);
                        state.childrenIdList.splice(index, 1);
                    }
                }
                return state;

            case DataHandlerActions.CHILDREN_CONFIG_CHANGED: 
                state.items = action.items;
                return state;
            
            case DataHandlerActions.DISABLE_CHILDREN: 
                return state;
                
            case DataHandlerActions.ENABLE_CHILDREN: 
                return state;

            default:
                return state;
        }
    };

    return DataHandlerReducer;

});
