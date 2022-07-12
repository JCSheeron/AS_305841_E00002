define(function () {

    'use strict';

    /**
     * @class widgets.brease.common.libs.redux.reducers.List.ListActions
     * @iatMeta studio:visible
     * false
     */

    var ListBoxActions = {
        //Update the whole list of items
        UPDATE_ITEM_LIST: 'UPDATE_ITEM_LIST',
        updateItemList: function updateItemList(newItemList) {
            return {
                type: ListBoxActions.UPDATE_ITEM_LIST,
                itemList: newItemList
            };
        },
        //Update the settings for the items
        UPDATE_ITEM_SETTINGS: 'UPDATE_ITEM_SETTINGS',
        updateItemSettings: function updateItemSettings(newItemSettings) {
            return {
                type: ListBoxActions.UPDATE_ITEM_SETTINGS,
                itemSettings: newItemSettings
            };
        },
        //Change the actual selected item by index
        UPDATE_SELECTED_ITEM: 'UPDATE_SELECTED_ITEM',
        updateSelectedItem: function updateSelectedItem(newSelectedItemIndex) {
            return {
                type: ListBoxActions.UPDATE_SELECTED_ITEM,
                selectedItemIndex: newSelectedItemIndex
            };
        },
        //Change the actual selected item by value
        UPDATE_SELECTED_VALUE: 'UPDATE_SELECTED_VALUE',
        updateSelectedValue: function updateSelectedValue(newSelectedItemValue) {
            return {
                type: ListBoxActions.UPDATE_SELECTED_VALUE,
                selectedItemValue: newSelectedItemValue
            };
        },
        //Toggle the visibility of the list
        TOGGLE_LIST_STATUS: 'TOGGLE_LIST_STATUS',
        toggleListStatus: function toggleListStatus() {
            return {
                type: ListBoxActions.TOGGLE_LIST_STATUS
            };
        },
        // Sets the list into connection dropped mode
        SET_LIST_OFFLINE: 'SET_LIST_OFFLINE',
        setListOffline: function setListOffline() {
            return {
                type: ListBoxActions.SET_LIST_OFFLINE
            };
        },
        // Sets the list into connection establisehd mode
        SET_LIST_ONLINE: 'SET_LIST_ONLINE',
        setListOnline: function setListOnline() {
            return {
                type: ListBoxActions.SET_LIST_ONLINE
            };
        },
        //Close the líst
        CLOSE_LIST: 'CLOSE_LIST',
        closeList: function closeList() {
            return {
                type: ListBoxActions.CLOSE_LIST
            };
        },
        //Open the líst
        OPEN_LIST: 'OPEN_LIST',
        openList: function openList() {
            return {
                type: ListBoxActions.OPEN_LIST
            };
        },
        //Update the settings of the list
        UPDATE_LIST_SETTINGS: 'UPDATE_LIST_SETTINGS',
        updateListSettings: function updateListSettings(newListSettings) {
            return {
                type: ListBoxActions.UPDATE_LIST_SETTINGS,
                listSettings: newListSettings
            };
        }
    };

    return ListBoxActions;

});
