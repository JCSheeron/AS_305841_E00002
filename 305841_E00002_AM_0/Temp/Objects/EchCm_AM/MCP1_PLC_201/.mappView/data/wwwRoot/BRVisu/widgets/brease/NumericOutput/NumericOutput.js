define(['widgets/brease/NumericInput/NumericInput',
    'brease/decorators/LanguageDependency',
    'brease/decorators/MeasurementSystemDependency',
    'widgets/brease/NumericOutput/libs/config'
], function (SuperClass, languageDependency, measurementSystemDependency, Config) {

    'use strict';

    /**
     * @class widgets.brease.NumericOutput
     * #Description
     * widget to display numeric values (optional with units)  
     * @breaseNote 
    
     * @extends widgets.brease.NumericInput
     *
     * @aside example numinout
     *
     * @iatMeta category:Category
     * Numeric
     * @iatMeta description:short
     * Ausgabe eines Wertes
     * @iatMeta description:de
     * Zeigt einen numerischen Wert an
     * @iatMeta description:en
     * Displays a numeric value
     */

    /**
     * @htmltag examples
     * Simple Code example
     *
     *     <div id="numOutput01" data-brease-widget="widgets/brease/NumericOutput"></div>
     *
     */

    /**
     * @method getValue
     * @hide
     */

    var defaultSettings = Config;

    var WidgetClass = SuperClass.extend(function NumericOutput() {
        SuperClass.apply(this, arguments);
    }, defaultSettings);

    var p = WidgetClass.prototype;

    p.init = function () {
        if (this.settings.omitClass !== true) {
            this.addInitialClass('breaseNumericOutput');
        }
        // breaseNumericInput css class should not be added
        this.settings.omitClass = true;
        // set NumericInput to readonly mode
        this.settings.readonly = true;

        SuperClass.prototype.init.call(this);
    };

    p._createUnitEl = function () {
        return $('<span></span>')
            .addClass('breaseNumericOutput_unit');
    };

    return measurementSystemDependency.decorate(languageDependency.decorate(WidgetClass, false), true);

});
