define(['system/widgets/CompoundWidget/CompoundWidget', 'brease/core/Types', 'text!widgets/GAGeneralLib/GaSafetyDeviceStatus/content/widgets.css'], function (SuperClass, Types, contentCSS) {

    'use strict';

    /**
    * @class widgets.GAGeneralLib.GaSafetyDeviceStatus
    * @extends system.widgets.CompoundWidget
    * @requires widgets.brease.Label
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
    * @cfg {String} DeviceLabel='EMO' 
    * @iatStudioExposed 
    * @iatCategory Device 
    * Device Label  
    */ 
    /** 
    * @cfg {String} StatusOkString='Good' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Device 
    * String to show for Device Ok/Not Ok Status  
    */ 
    /** 
    * @cfg {String} StatusOkStyle='Good' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Appearance 
    * Style to use for Device Ok/Not Ok Status  
    */ 
    /** 
    * @cfg {String} StatusActiveString='Good' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Device 
    * String to show for Device Active/Not Active Status  
    */ 
    /** 
    * @cfg {String} StatusActiveStyle='Good' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Appearance 
    * Style to use for Device Active/Not Active Status  
    */ 

    var defaultSettings = {
            DeviceLabel: 'EMO',
            StatusOkString: 'Good',
            StatusOkStyle: 'Good',
            StatusActiveString: 'Good',
            StatusActiveStyle: 'Good'
        },

        propertyMapping = {
            
            DeviceLabel: { 'lblDevice': 'text' }, 
            StatusOkString: { 'txtOutStatus': 'value' }, 
            StatusOkStyle: { 'txtOutStatus': 'style' }, 
            StatusActiveString: { 'txtOutActive': 'value' }, 
            StatusActiveStyle: { 'txtOutActive': 'style' }
        },

        WidgetClass = SuperClass.extend(function GaSafetyDeviceStatus() {
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
    p.setDeviceLabel = function (value) { this.settings['DeviceLabel'] = value; this.setChildProps('DeviceLabel', value); };
    p.setStatusOkString = function (value) { this.settings['StatusOkString'] = value; this.setChildProps('StatusOkString', value); };
    p.setStatusOkStyle = function (value) { this.settings['StatusOkStyle'] = value; this.setChildProps('StatusOkStyle', value); };
    p.setStatusActiveString = function (value) { this.settings['StatusActiveString'] = value; this.setChildProps('StatusActiveString', value); };
    p.setStatusActiveStyle = function (value) { this.settings['StatusActiveStyle'] = value; this.setChildProps('StatusActiveStyle', value); };

    return WidgetClass;

});
