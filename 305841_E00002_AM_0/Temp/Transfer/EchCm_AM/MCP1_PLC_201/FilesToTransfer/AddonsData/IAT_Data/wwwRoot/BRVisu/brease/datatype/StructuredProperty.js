define(['brease/core/Class', 'brease/core/Utils'], function (SuperClass, Utils) {

    'use strict';

    /**
    * @class brease.datatype.StructuredProperty
    * @alternateClassName StructuredProperty
    * @extends Function
    * base class for all StructuredProperties
    */
    /**
    * @method constructor
    * Creates a new StructuredProperty instance.
    * @param {String} id id of the structured property instance, decorated with content, widgetId and property name, e.g. Content1_OnlineChartHDA1_yAxis_yAxis2
    * @param {Object} options options of structured property, as set in content
    * @param {Object} defaultSettings default settings of structured property
    * @param {String} widgetId full widget name, decorated with contentId, e.g. "Content1_OnlineChartHDA1"
    * @param {String} propName name of the structured property, defined in the widget, e.g. "yAxis"
    */

    var StructuredProperty = SuperClass.extend(function (id, options, widgetId, propName) {
            SuperClass.call(this);

            this.id = id; // fully qualified name, like Content1_OnlineChartHDA1_yAxis_yAxis2
            this.prefix = widgetId + '_' + propName + '_';
            this.name = id.substring(this.prefix.length); // short name as projected: yAxis2

            if (options !== undefined && options !== null) {
                this.settings = Utils.extendOptionsToNew(this.defaultSettings, options);
            } else {
                this.settings = Utils.deepCopy(this.defaultSettings);
            }
        },
        null),

        p = StructuredProperty.prototype;

    p.setId = function (id) {
        this.id = id;
        this.name = id.substring(this.prefix.length);
    };

    p.getId = function () {
        return this.id;
    };

    return StructuredProperty;

});
