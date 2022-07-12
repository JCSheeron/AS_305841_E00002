define([
    'widgets/brease/TextInput/TextInput',
    'brease/enum/Enum'
], function (SuperClass, Enum) {

    'use strict';

    /**
     * @class widgets.brease.Password
     * #Description
     * A single-line text field whose value is obscured. Use the maxlength attribute to specify the maximum length of the value that can be entered.
     *
     * @breaseNote 
     * @extends widgets.brease.TextInput
     *
     * @iatMeta category:Category
     * Login,Text,System
     * @iatMeta description:short
     * Versteckte Eingabe eines Strings
     * @iatMeta description:de
     * Ermöglicht dem Benutzer einen Text mit Passwortzeichen einzugeben
     * @iatMeta description:en
     * Enables the user to enter a text with password character masking
     */

    /**
      *  @htmltag examples
      * ##Configuration Example
      *
      *       <div id="inputText" data-brease-widget="widgets/brease/Password" data-brease-options="{'maxLength':32}"></div>
      */

    var defaultSettings = {},

        WidgetClass = SuperClass.extend(function Password() {
            SuperClass.apply(this, arguments);
        }, defaultSettings),

        p = WidgetClass.prototype;

    p.init = function () {
        if (this.settings.omitClass !== true) {
            this.addInitialClass('breasePassword');
        }
        SuperClass.prototype.init.call(this, Enum.InputType.password);
    };

    return WidgetClass;

});
