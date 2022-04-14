define(['system/widgets/CompoundWidget/CompoundWidget', 'brease/core/Types', 'text!widgets/GAMotLib/GAMotTestWidget/content/widgets.css'], function (SuperClass, Types, contentCSS) {

    'use strict';

    /**
    * @class widgets.GAMotLib.GAMotTestWidget
    * @extends system.widgets.CompoundWidget
    * @requires widgets.brease.GroupBox
    * @requires widgets.brease.Label
    * @requires widgets.brease.NumericOutput
    * @requires widgets.brease.TextOutput
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

    /** 
    * @cfg {Integer} AxisNumber=0 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Axis 
    * Description will be shown in property grid.  
    */ 
    /** 
    * @cfg {String} IsReadyForPowerText='No' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Axis 
    * Text display for boolean status  
    */ 
    /** 
    * @cfg {String} IsReadyForPowerStyle='' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Appearance 
    * Text style for boolean status  
    */ 

    var defaultSettings = {
            AxisNumber: 0,
            IsReadyForPowerText: 'No',
            IsReadyForPowerStyle: ''
        },

        propertyMapping = {
            
            AxisNumber: { 'numOutAxisNumber': 'value' }, 
            IsReadyForPowerText: { 'txtOutRdyForPwr': 'value' }, 
            IsReadyForPowerStyle: { 'txtOutRdyForPwr': 'style' }
        },

        WidgetClass = SuperClass.extend(function GAMotTestWidget() {
            SuperClass.apply(this, arguments);
        }, defaultSettings),

        p = WidgetClass.prototype;
    WidgetClass.static.contentCSS = contentCSS;

    p.init = function () {
        this.initMapping(propertyMapping);
        SuperClass.prototype.init.call(this);
    };

    p.setInitialValues = function () {
        
    };
    p.setAxisNumber = function (value) { this.settings['AxisNumber'] = value; this.setChildProps('AxisNumber', value); };
    p.setIsReadyForPowerText = function (value) { this.settings['IsReadyForPowerText'] = value; this.setChildProps('IsReadyForPowerText', value); };
    p.setIsReadyForPowerStyle = function (value) { this.settings['IsReadyForPowerStyle'] = value; this.setChildProps('IsReadyForPowerStyle', value); };

    return WidgetClass;

});
