define(['system/widgets/CompoundWidget/CompoundWidget', 'brease/core/Types', 'text!widgets/GAMotLib/GaMotAxisSetPosLimits/content/widgets.css'], function (SuperClass, Types, contentCSS) {

    'use strict';

    /**
    * @class widgets.GAMotLib.GaMotAxisSetPosLimits
    * @extends system.widgets.CompoundWidget
    * @requires widgets.GAGeneralLib.TitleLabelBindable
    * @requires widgets.brease.GroupBox
    * @requires widgets.brease.Label
    * @requires widgets.brease.NumericInput
    * @requires widgets.brease.NumericOutput
    * @requires widgets.brease.PushButton
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
    * @cfg {sMot_PositionLimits} MoveLimitsStruct 
    * @iatStudioExposed 
    * @iatCategory Axis 
    * Structure binding  
    */ 
    /** 
    * @cfg {sMot_HmiAxisReq} AxisLibraryReqStruct 
    * @iatStudioExposed 
    * @iatCategory Axis 
    * Structure binding  
    */ 
    /** 
    * @cfg {String} Title='' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Appearance 
    * Set the string for the title.  
    */ 
    /** 
    * @cfg {String} PositionUnits='' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Units 
    * Set the unit string for position and distance units.  
    */ 

    var defaultSettings = {
            Title: '',
            PositionUnits: ''
        },

        propertyMapping = {
            
            MoveLimitsStruct: { 'numOutPosLimitPos': 'node', 'numOutPosLimitNeg': 'node' }, 
            AxisLibraryReqStruct: { 'numInPosLimitPos': 'node', 'numInPosLimitNeg': 'node', 'pbSetLimits': 'value' }, 
            Title: { 'lblTitle': 'value' }, 
            PositionUnits: { 'numOutPosLimitPos': 'unit', 'numOutPosLimitNeg': 'unit', 'numInPosLimitPos': 'unit', 'numInPosLimitNeg': 'unit' }
        },

        WidgetClass = SuperClass.extend(function GaMotAxisSetPosLimits() {
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
    p.setMoveLimitsStruct = function (value) { this.settings['MoveLimitsStruct'] = value; this.setChildProps('MoveLimitsStruct', value); };
    p.setAxisLibraryReqStruct = function (value) { this.settings['AxisLibraryReqStruct'] = value; this.setChildProps('AxisLibraryReqStruct', value); };
    p.setTitle = function (value) { this.settings['Title'] = value; this.setChildProps('Title', value); };
    p.setPositionUnits = function (value) { this.settings['PositionUnits'] = value; this.setChildProps('PositionUnits', value); };

    return WidgetClass;

});
