define(['system/widgets/CompoundWidget/CompoundWidget', 'brease/core/Types', 'text!widgets/__WIDGET_LIBRARY__/__WIDGET_NAME__/content/widgets.css'], function (SuperClass, Types, contentCSS) {

    'use strict';

    /**
    * @class widgets.__WIDGET_LIBRARY__.__WIDGET_NAME__
    * @extends system.widgets.CompoundWidget
__DEPENDENCIES__
    *
    * @iatMeta category:Category
    * Compound
    * @iatMeta description:short
    * CompoundWidget
    * @iatMeta description:de
    * CompoundWidget
    * @iatMeta description:en
    * CompoundWidget
    */

    /*__CUSTOM_PROPS__*/
    var defaultSettings = {//__DEFAULT_SETTINGS__
        },

        propertyMapping = {
            //__CUSTOM_MAPPING__
        },

        WidgetClass = SuperClass.extend(function __WIDGET_NAME__() {
            SuperClass.apply(this, arguments);
        }, defaultSettings),

        p = WidgetClass.prototype;
    WidgetClass.static.contentCSS = contentCSS;

    p.init = function () {
        this.initMapping(propertyMapping);
        SuperClass.prototype.init.call(this);
    };

    p.setInitialValues = function () {
        //__INITIAL_CALLS__
    };//__METHODS__//__SETTER__//__GETTER__

    return WidgetClass;

});
