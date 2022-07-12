define(function () {

    'use strict';

    /**
     * @class widgets.brease.common.libs.redux.reducers.DataHandler.DataHandlerActions
     * 
     * DISCLAIMER: The DataHandler module is merely a redux adoptation of the DataHandlerWidget where the code was originally implemented.
     * 
     * If you decide to use this action there are a few dependencies that needs to be considered.
     * First the Reducer with the same name has to be used.
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

    var DataHandlerActions = {
        //Enables all the children in the DataHandler
        COLLECT_CHILDREN: 'COLLECT_CHILDREN',
        collectChildren: function collectChildren() {
            return {
                type: DataHandlerActions.COLLECT_CHILDREN
            };
        },
        //Add a notice that a child has been added
        CHILD_ADDED: 'CHILD_ADDED',
        childrenAdded: function childrenAdded(event, widget) {
            return {
                type: DataHandlerActions.CHILD_ADDED,
                event: event,
                widget: widget
            };
        },
        //Add a notice that a child has been removed
        CHILD_REMOVED: 'CHILD_REMOVED',
        childrenRemoved: function childrenRemoved(event, widget) {
            return {
                type: DataHandlerActions.CHILD_REMOVED,
                event: event,
                widget: widget
            };
        },
        CHILDREN_CONFIG_CHANGED: 'CHILDREN_CONFIG_CHANGED',
        childrenConfigChanged: function childrenConfigChanged(items) {
            return {
                type: DataHandlerActions.CHILDREN_CONFIG_CHANGED,
                items: items
            };
        },
        //Add a notice that a child has been removed
        CHILDREN_INITIALISED: 'CHILDREN_INITIALISED',
        childrenInitialised: function childrenInitialised(childrenList, childrenIdList) {
            return {
                type: DataHandlerActions.CHILDREN_INITIALISED,
                childrenList: childrenList,
                childrenIdList: childrenIdList
            };
        },
        //Disables all the children in the DataHandler
        DISABLE_CHILDREN: 'DISABLE_CHILDREN',
        disableChildren: function disableChildren() {
            return {
                type: DataHandlerActions.DISABLE_CHILDREN
            };
        },
        //Enables all the children in the DataHandler
        ENABLE_CHILDREN: 'ENABLE_CHILDREN',
        enableChildren: function enableChildren() {
            return {
                type: DataHandlerActions.ENABLE_CHILDREN
            };
        }
        
    };

    return DataHandlerActions;

});
