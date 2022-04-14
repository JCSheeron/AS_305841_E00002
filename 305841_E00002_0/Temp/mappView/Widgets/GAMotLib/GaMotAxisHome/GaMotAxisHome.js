define(['system/widgets/CompoundWidget/CompoundWidget', 'brease/core/Types', 'text!widgets/GAMotLib/GaMotAxisHome/content/widgets.css'], function (SuperClass, Types, contentCSS) {

    'use strict';

    /**
    * @class widgets.GAMotLib.GaMotAxisHome
    * @extends system.widgets.CompoundWidget
    * @requires widgets.GAGeneralLib.TitleLabelBindable
    * @requires widgets.brease.GroupBox
    * @requires widgets.brease.Label
    * @requires widgets.brease.NumericInput
    * @requires widgets.brease.NumericOutput
    * @requires widgets.brease.PushButton
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
    * @cfg {sMot_HmiAxisReq} AxisLibraryReqStruct 
    * @iatStudioExposed 
    * @iatCategory Axis 
    * Structure binding  
    */ 
    /** 
    * @cfg {sMot_AxisStatus} StatusStruct 
    * @iatStudioExposed 
    * @iatCategory Axis 
    * Axis Status Structure Binding to sMot_AxisStatus structure  
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
    /** 
    * @cfg {String} IsHomedText='No' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Axis 
    * Text display for boolean status  
    */ 
    /** 
    * @cfg {String} IsHomedStyle='' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Appearance 
    * Text style for boolean status  
    */ 

    var defaultSettings = {
            Title: '',
            PositionUnits: '',
            IsHomedText: 'No',
            IsHomedStyle: ''
        },

        propertyMapping = {
            
            AxisLibraryReqStruct: { 'pbSetZero': 'value', 'pbSetOffset': 'value', 'pbSetInPosition': 'value', 'numInSetOffset': 'node' }, 
            StatusStruct: { 'numOutPosAct': 'node' }, 
            Title: { 'lblTitle': 'value' }, 
            PositionUnits: { 'numOutPosAct': 'unit', 'numInSetOffset': 'unit' }, 
            IsHomedText: { 'txtOutIsHomed': 'value' }, 
            IsHomedStyle: { 'txtOutIsHomed': 'style' }
        },

        WidgetClass = SuperClass.extend(function GaMotAxisHome() {
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
    p.setAxisLibraryReqStruct = function (value) { this.settings['AxisLibraryReqStruct'] = value; this.setChildProps('AxisLibraryReqStruct', value); };
    p.setStatusStruct = function (value) { this.settings['StatusStruct'] = value; this.setChildProps('StatusStruct', value); };
    p.setTitle = function (value) { this.settings['Title'] = value; this.setChildProps('Title', value); };
    p.setPositionUnits = function (value) { this.settings['PositionUnits'] = value; this.setChildProps('PositionUnits', value); };
    p.setIsHomedText = function (value) { this.settings['IsHomedText'] = value; this.setChildProps('IsHomedText', value); };
    p.setIsHomedStyle = function (value) { this.settings['IsHomedStyle'] = value; this.setChildProps('IsHomedStyle', value); };

    return WidgetClass;

});
