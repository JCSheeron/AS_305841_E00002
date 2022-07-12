define(function () {

    'use strict';

    /**
     * @class widgets.brease.common.libs.redux.reducers.Text.TextActions
     * @iatMeta studio:visible
     * false
     */

    var TextActions = {
        //Change to a new language
        LANGUAGE_CHANGE: 'LANGUAGE_CHANGE',
        changeLanguage: function changeLanguage() {
            return {
                type: TextActions.LANGUAGE_CHANGE
            };
        },
        //Update the whole list of textElements
        UPDATE_TEXT: 'UPDATE_TEXT',
        updateText: function updateText(newTextElements) {
            return {
                type: TextActions.UPDATE_TEXT,
                textElements: newTextElements
            };
        },
        //Update textSettings
        UPDATE_TEXT_SETTINGS: 'UPDATE_TEXT_SETTINGS',
        updateTextSettings: function updateTextSettings(newTextSettings) {
            return {
                type: TextActions.UPDATE_TEXT_SETTINGS,
                textSettings: newTextSettings
            };
        }
    };

    return TextActions;

});
