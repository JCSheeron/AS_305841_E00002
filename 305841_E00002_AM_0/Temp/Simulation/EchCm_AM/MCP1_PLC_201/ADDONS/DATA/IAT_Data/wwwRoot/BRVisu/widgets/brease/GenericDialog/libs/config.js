define([
    'brease/enum/Enum'
], function (Enum) {
    
    'use strict';

    /**
     * @class widgets.brease.GenericDialog.libs.config
     * @extends core.javascript.Object
     * @override widgets.brease.GenericDialog
     */

    /**
     * @cfg {String} tooltip=''
     * @iatStudioExposed
     * @hide
     */

    /**
     * @method showTooltip
     * @hide
     */

    function Config() {
        /*
         * Id of the root element 
         */
        this.id = '';
        this.html = '';
        this.width = undefined; // integer
        this.height = undefined; // integer
        /*
         * Height of the content area
         */
        this.contentHeight = undefined;
        /*
         * Width of the content area
         */
        this.contentWidth = undefined;
        this.arrow = {
            position: '',
            show: false,
            width: 12
        };
        this.position = {
            vertical: 'middle',
            horizontal: 'center'
        };
        /*
         * Defines text/textKey for header title of the dialog
         */
        this.header = {
            text: '',
            textKey: ''
        };
        /*
         * Child widgets, which should be placed inside the content area
         */
        this.widgets = [];
        this.forceInteraction = false;
        this.pointOfOrigin = Enum.PointOfOrigin.APP;
        /*
         * Defines if it is a modal dialog or not. Modal means if the interaction is still 
         * possible with the application while dialog is open or not
         */
        this.modal = true;
        /*
         * True if close button should be visible, otherwise false.
         */
        this.showCloseButton = true;
        /*
         * The scale2Fit should not be used by the GenericDialog as it won't scale accordingly to the global zoom
         */
        // this.scale2fit = true;
        /*
         * Configuration of the buttons, which should be visible at the bottom of the dialog
         */
        this.buttons = {
            yes: false,
            no: false,
            ok: true,
            cancel: false
        };

        /*
         * The result enumeration value of the dialog, when it is closed.
         */
        this.dialogResult = '';

        this.stylePrefix = 'widgets_brease_GenericDialog';
        this.style = 'default';
    }

    var p = Config.prototype;

    p.getWidgetModelByName = function (name) {
        for (var i = 0; i < this.widgets.length; i = i + 1) {
            if (this.widgets[i].name === name) {
                return this.widgets[i];
            }
        }
        return null;
    };

    return Config;

});
