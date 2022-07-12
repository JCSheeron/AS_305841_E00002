define([
    'widgets/brease/common/libs/redux/reducers/Text/TextActions',
    'widgets/brease/common/libs/redux/utils/UtilsText'],
function (TextActions, UtilsText) {

    'use strict';

    var TextReducer = function TextReducer(state, action) {
        if (state === undefined) {
            return null;
        }
        switch (action.type) {
            case TextActions.LANGUAGE_CHANGE:
                return _.assign({}, state, {
                    textElements: UtilsText.translateTextElements(state.textElements)
                });
            case TextActions.UPDATE_TEXT:
                return _.assign({}, state, {
                    textElements: action.textElements
                });
            case TextActions.UPDATE_TEXT_SETTINGS:
                return _.assign({}, state, {
                    textSettings: {
                        multiLine: action.textSettings.multiLine === undefined ? state.textSettings.multiLine : action.textSettings.multiLine,
                        wordWrap: action.textSettings.wordWrap === undefined ? state.textSettings.wordWrap : action.textSettings.wordWrap,
                        ellipsis: action.textSettings.ellipsis === undefined ? state.textSettings.ellipsis : action.textSettings.ellipsis
                    }
                });
            default:
                return state;
        }
    };

    return TextReducer;

});
