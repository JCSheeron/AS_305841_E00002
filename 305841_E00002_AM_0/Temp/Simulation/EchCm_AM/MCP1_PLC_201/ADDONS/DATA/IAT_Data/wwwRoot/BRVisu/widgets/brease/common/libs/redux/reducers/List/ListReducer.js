define([
    'widgets/brease/common/libs/redux/reducers/List/ListActions',
    'widgets/brease/common/libs/redux/utils/UtilsList',
    'brease/core/Utils'
], function (ListActions, UtilsList, Utils) {

    'use strict';

    var ListReducer = function ListReducer(state, action) {

        if (state === undefined) {
            return null;
        }

        var newSelectedValue,
            newSelectedIndex,
            newListStatus,
            newItems;

        switch (action.type) {

            case ListActions.UPDATE_ITEM_LIST:
                newSelectedIndex = _getIndexForValue(action.itemList, state.selectedValue);
                newItems = _markSelectedItem(action.itemList, newSelectedIndex);
                newSelectedValue = UtilsList.getSelectedValueFromItems(newItems, newSelectedIndex);
                return _.assign({}, state, {
                    itemList: newItems,
                    selectedValue: newSelectedValue,
                    selectedIndex: newSelectedIndex,
                    previousSelectedIndex: state.selectedIndex,
                    listSettings: _.assign({}, state.listSettings, {
                        listHeight: UtilsList.calculateListHeight(state.listSettings.fitHeight2Items,
                            action.itemList.length, state.listSettings.maxVisibleEntries, state.itemSettings.itemHeight)
                    })
                });

            case ListActions.UPDATE_SELECTED_ITEM:
                newSelectedIndex = _parseSelectedIndex(action.selectedItemIndex, state.itemList.length);
                newItems = _markSelectedItem(state.itemList, newSelectedIndex);
                newSelectedValue = UtilsList.getSelectedValueFromItems(newItems, newSelectedIndex);
                return _.assign({}, state, {
                    itemList: newItems,
                    selectedIndex: newSelectedIndex,
                    selectedValue: newSelectedValue,
                    previousSelectedIndex: state.selectedIndex,
                    listOpen: false
                });

            case ListActions.UPDATE_SELECTED_VALUE:
                newSelectedIndex = _getIndexForValue(state.itemList, action.selectedItemValue);
                newItems = _markSelectedItem(state.itemList, newSelectedIndex);
                newSelectedValue = UtilsList.getSelectedValueFromItems(newItems, newSelectedIndex);
                return _.assign({}, state, {
                    itemList: newItems,
                    selectedIndex: newSelectedIndex,
                    selectedValue: newSelectedValue,
                    previousSelectedIndex: state.selectedIndex,
                    listOpen: false
                });

            case ListActions.UPDATE_ITEM_SETTINGS:
                return _.assign({}, state, {
                    itemSettings: {
                        itemHeight: action.itemSettings.itemHeight === undefined ? state.itemSettings.itemHeight : action.itemSettings.itemHeight,
                        imageAlign: action.itemSettings.imageAlign === undefined ? state.itemSettings.imageAlign : action.itemSettings.imageAlign
                    }
                });

            case ListActions.TOGGLE_LIST_STATUS:
                newListStatus = !state.listOpen;
                return _.assign({}, state, {
                    listOpen: newListStatus
                });

            case ListActions.CLOSE_LIST:
                return _.assign({}, state, {
                    listOpen: false
                });

            case ListActions.OPEN_LIST:
                return _.assign({}, state, {
                    listOpen: true
                });

            case ListActions.UPDATE_LIST_SETTINGS:
                return _.assign({}, state, {
                    listSettings: {
                        fitHeight2Items: action.listSettings.fitHeight2Items === undefined ? state.listSettings.fitHeight2Items : action.listSettings.fitHeight2Items,
                        listPosition: action.listSettings.listPosition === undefined ? state.listSettings.listPosition : action.listSettings.listPosition,
                        listWidth: action.listSettings.listWidth === undefined ? state.listSettings.listWidth : action.listSettings.listWidth,
                        listHeight: action.listSettings.listHeight === undefined ? state.listSettings.listHeight : action.listSettings.listHeight,
                        maxVisibleEntries: action.listSettings.maxVisibleEntries === undefined ? state.listSettings.maxVisibleEntries : action.listSettings.maxVisibleEntries,
                        cropToParent: action.listSettings.cropToParent === undefined ? state.listSettings.cropToParent : action.listSettings.cropToParent,
                        showTexts: action.listSettings.showTexts === undefined ? state.listSettings.showTexts : action.listSettings.showTexts,
                        showImages: action.listSettings.showImages === undefined ? state.listSettings.showImages : action.listSettings.showImages,
                        showTextsInButton: action.listSettings.showTextsInButton === undefined ? state.listSettings.showTextsInButton : action.listSettings.showTextsInButton,
                        showImagesInButton: action.listSettings.showImagesInButton === undefined ? state.listSettings.showImagesInButton : action.listSettings.showImagesInButton
                    }
                });

            case ListActions.SET_LIST_OFFLINE:
                return _.assign({}, state, {
                    offline: true
                });

            case ListActions.SET_LIST_ONLINE:
                return _.assign({}, state, {
                    offline: false
                });

            default:
                return state;
        }
    };

    function _markSelectedItem(itemList, selectedIndex) {
        return itemList.map(function (item, index) {
            item.selected = index === selectedIndex;
            return item;
        });
    }

    function _getIndexForValue(itemList, selectedValue) {
        var i;
        for (i = 0; i < itemList.length; i = i + 1) {
            if (itemList[i].value === selectedValue) {
                return i;
            }
        }
        //Return item not found
        return 0;
    }

    function _parseSelectedIndex(selectedIndex, itemListLength) {
        var parsedIndex = 0;
        if ((Utils.isNumeric(selectedIndex) && (selectedIndex < itemListLength) && (selectedIndex > 0)) || selectedIndex === null) {
            parsedIndex = selectedIndex;
        } else if (selectedIndex === true) {
            parsedIndex = 1;
        } else {
            parsedIndex = 0;
        }
        return parsedIndex;
    }

    return ListReducer;

});
