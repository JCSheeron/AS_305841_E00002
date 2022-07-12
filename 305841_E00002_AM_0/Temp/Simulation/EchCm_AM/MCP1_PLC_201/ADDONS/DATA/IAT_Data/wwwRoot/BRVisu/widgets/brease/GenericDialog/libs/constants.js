define([], function () {
    'use strict';
    function Constants() {
        return {
            // Classes
            DIALOG_ID: 'GenericDialog',
            DIALOG_WIDGET_ID_PREFIX: 'dialog_',
            DIALOG_INITIAL_CLASS: 'breaseGenericDialog',
            DIALOG_WINDOW_TYPE: 'GenericDialog',
            DIALOG_WIDGET_CLASS: 'generic-dialog',
            DIALOG_FOOTER_CLASS: 'generic-dialog-footer',
            DIALOG_HEADER_CLASS: 'generic-dialog-header',
            DIALOG_FOOTER_BUTTON_CLASS: 'generic-dialog-footer-button',
            DIALOG_CONTENT_FOOTER_CONTAINER_CLASS: 'generic-dialog-content-footer-container'
        };
    }

    return new Constants();
});
