define(['widgets/brease/ButtonBar/ButtonBar'], function (SuperClass) {

    'use strict';
       
    /**
    * @class widgets.brease.RadioButtonGroup
    * #Description
    * widget which embraces some RadioButtons, and ensures only one of them is selected  
    *   
    * @breaseNote  
    * @extends widgets.brease.ButtonBar
    
    * @iatMeta studio:isContainer
    * true
    *
    * @iatMeta category:Category
    * Container,Selector
    * @iatMeta description:short
    * Liste an RadioButtons
    * @iatMeta description:de
    * Container, welcher eine konfigurierbare Anzahl von RadioButtons beinhaltet
    * @iatMeta description:en
    * Container which contains a configurable number of radio buttons
    */

    /**
    * @property {WidgetList} children=["widgets.brease.RadioButton"]
    * @inheritdoc  
    */

    var defaultSettings = {
        },

        WidgetClass = SuperClass.extend(function ButtonBar() {
            SuperClass.apply(this, arguments);
        }, defaultSettings),

        p = WidgetClass.prototype;

    p.init = function () {

        if (this.settings.omitClass !== true) {
            this.addInitialClass('breaseRadioButtonGroup');
        }

        if (brease.config.editMode === true) {
            this.addInitialClass('iatd-outline');
        }

        SuperClass.prototype.init.call(this);

    };

    return WidgetClass;

});
