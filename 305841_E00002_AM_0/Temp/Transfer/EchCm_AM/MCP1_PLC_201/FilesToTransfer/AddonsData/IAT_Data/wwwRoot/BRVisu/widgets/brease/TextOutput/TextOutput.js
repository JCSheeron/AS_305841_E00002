define([
    'widgets/brease/Label/Label'
], function (
    SuperClass
) {

    'use strict';

    /**
     * @class widgets.brease.TextOutput
     * #Description
     * Widget for displaying a string.    
     * @breaseNote
     * @extends widgets.brease.Label
    
     * @iatMeta category:Category
     * Text
     * @iatMeta description:short
     * Ausgabe eines Strings
     * @iatMeta description:de
     * Zeigt einen String an
     * @iatMeta description:en
     * Displays a string value
     */

    /**
     * @htmltag examples
     * Config examples:  
     *
     *     <label id="TextOutput1" data-brease-widget="widgets/brease/TextOutput" data-brease-options="{'text':'test text'}"></label>
     *
     */

    /**
     * @cfg {String} text
     * @hide
     */

    /**
     * @cfg {String} value='default'
     * @localizable
     * @bindable
     * @iatCategory Data
     * @iatStudioExposed
     * value displayed by the widget
     */

    /**
     * @method setText    
     * sets the visible text
     * @param {String} text The new text
     */

    var defaultSettings = {
            value: 'default'
        },

        WidgetClass = SuperClass.extend(function TextOutput() {
            SuperClass.apply(this, arguments);
        }, defaultSettings),

        p = WidgetClass.prototype;

    p.init = function () {
        if (this.settings.omitClass !== true) {
            this.addInitialClass('breaseTextOutput');
        }
        this.settings.text = this.settings.value;
        SuperClass.prototype.init.call(this);

    };

    /**
    * @method setValue
    * @iatStudioExposed
    * sets the output text
    * @param {String} value
    * @paramMeta value:localizable=true
     */
    p.setValue = function (value) {
        if (value !== undefined) {
            if (brease.language.isKey(value) === false) {
                this.settings.value = this.settings.text = value;
                this.setText(this.settings.text);
                this.removeTextKey();
            } else {
                this.settings.value = this.setTextKey(brease.language.parseKey(value));
            }
        }
    };

    /**
     * @method getValue
     * gets the output text
     * @return {String}
     */
    p.getValue = function () {
        return this.settings.value;
    };

    return WidgetClass;

});
