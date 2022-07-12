define(function () {

    'use strict';

    /**
     * @class widgets.brease.common.libs.redux.reducers.Style.StyleActions
     * @iatMeta studio:visible
     * false
     */

    var StyleActions = {
        //Chnage on height
        STYLE_CHANGE: 'STYLE_CHANGE',
        styleChange: function styleChange(newStyle) {
            return {
                type: StyleActions.STYLE_CHANGE,
                style: newStyle
            };
        },
        THEME_CHANGE: 'THEME_CHANGE',
        themeChange: function themeChange() {
            return {
                type: StyleActions.THEME_CHANGE
            };
        }
    };

    return StyleActions;

});
