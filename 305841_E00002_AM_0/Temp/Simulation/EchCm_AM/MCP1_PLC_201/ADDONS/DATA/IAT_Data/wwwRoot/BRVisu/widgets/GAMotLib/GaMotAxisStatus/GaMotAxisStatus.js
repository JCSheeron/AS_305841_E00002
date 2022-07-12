define(['system/widgets/CompoundWidget/CompoundWidget', 'brease/core/Types', 'text!widgets/GAMotLib/GaMotAxisStatus/content/widgets.css'], function (SuperClass, Types, contentCSS) {

    'use strict';

    /**
    * @class widgets.GAMotLib.GaMotAxisStatus
    * @extends system.widgets.CompoundWidget
    * @requires widgets.GAGeneralLib.TitleLabelBindable
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
    * @cfg {sMot_AxisStatus} StatusStruct 
    * @iatStudioExposed 
    * @iatCategory Axis 
    * Axis Status Structure Binding to sMot_AxisStatus structure  
    */ 
    /** 
    * @cfg {String} AxisName='' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Axis 
    * Set the unit string for position and distance units.  
    */ 
    /** 
    * @cfg {String} PositionUnits='' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Units 
    * Set the unit string for position and distance units.  
    */ 
    /** 
    * @cfg {String} VelocityUnits='' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Units 
    * Set the unit string for velocity units.  
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
    /** 
    * @cfg {String} IsPoweredOnText='No' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Axis 
    * Text display for boolean status  
    */ 
    /** 
    * @cfg {String} IsPoweredOnStyle='' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Appearance 
    * Text style for boolean status  
    */ 
    /** 
    * @cfg {String} IsBrakeManRelText='No' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Axis 
    * Text display for boolean status  
    */ 
    /** 
    * @cfg {String} IsBrakeManRelStyle='' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Appearance 
    * Text style for boolean status  
    */ 
    /** 
    * @cfg {String} IsMoveActiveText='No' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Axis 
    * Text display for boolean status  
    */ 
    /** 
    * @cfg {String} IsMoveActiveStyle='' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Appearance 
    * Text style for boolean status  
    */ 
    /** 
    * @cfg {String} IsAtPositionText='No' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Axis 
    * Text display for boolean status  
    */ 
    /** 
    * @cfg {String} IsAtPositionStyle='' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Appearance 
    * Text style for boolean status  
    */ 
    /** 
    * @cfg {String} IsMoveDoneText='No' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Axis 
    * Text display for boolean status  
    */ 
    /** 
    * @cfg {String} IsMoveDoneStyle='' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Appearance 
    * Text style for boolean status  
    */ 
    /** 
    * @cfg {String} IsStoppedText='No' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Axis 
    * Text display for boolean status  
    */ 
    /** 
    * @cfg {String} IsStoppedStyle='' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Appearance 
    * Text style for boolean status  
    */ 
    /** 
    * @cfg {String} StatusText='Unknown' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Axis 
    * Text display for integer status values.  
    */ 
    /** 
    * @cfg {String} StatusStyle='' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Appearance 
    * Text style for integer status values.  
    */ 
    /** 
    * @cfg {String} StateText='Unknown' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Axis 
    * Text display for integer state values.s  
    */ 
    /** 
    * @cfg {String} StateStyle='' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Appearance 
    * Text style for integer state values  
    */ 

    var defaultSettings = {
            AxisName: '',
            PositionUnits: '',
            VelocityUnits: '',
            IsReadyForPowerText: 'No',
            IsReadyForPowerStyle: '',
            IsHomedText: 'No',
            IsHomedStyle: '',
            IsPoweredOnText: 'No',
            IsPoweredOnStyle: '',
            IsBrakeManRelText: 'No',
            IsBrakeManRelStyle: '',
            IsMoveActiveText: 'No',
            IsMoveActiveStyle: '',
            IsAtPositionText: 'No',
            IsAtPositionStyle: '',
            IsMoveDoneText: 'No',
            IsMoveDoneStyle: '',
            IsStoppedText: 'No',
            IsStoppedStyle: '',
            StatusText: 'Unknown',
            StatusStyle: '',
            StateText: 'Unknown',
            StateStyle: ''
        },

        propertyMapping = {
            
            StatusStruct: { 'numOutPosAct': 'node', 'numOutVelAct': 'node' }, 
            AxisName: { 'grpBoxLabel': 'value' }, 
            PositionUnits: { 'numOutPosAct': 'unit' }, 
            VelocityUnits: { 'numOutVelAct': 'unit' }, 
            IsReadyForPowerText: { 'txtOutRdyForPwr': 'value' }, 
            IsReadyForPowerStyle: { 'txtOutRdyForPwr': 'style' }, 
            IsHomedText: { 'txtOutIsHomed': 'value' }, 
            IsHomedStyle: { 'txtOutIsHomed': 'style' }, 
            IsPoweredOnText: { 'txtOutIsPoweredOn': 'value' }, 
            IsPoweredOnStyle: { 'txtOutIsPoweredOn': 'style' }, 
            IsBrakeManRelText: { 'txtOutIsBrakeManRel': 'value' }, 
            IsBrakeManRelStyle: { 'txtOutIsBrakeManRel': 'style' }, 
            IsMoveActiveText: { 'txtOutIsMoveActive': 'value' }, 
            IsMoveActiveStyle: { 'txtOutIsMoveActive': 'style' }, 
            IsAtPositionText: { 'txtOutIsAtPos': 'value' }, 
            IsAtPositionStyle: { 'txtOutIsAtPos': 'style' }, 
            IsMoveDoneText: { 'txtOutIsMoveDone': 'value' }, 
            IsMoveDoneStyle: { 'txtOutIsMoveDone': 'style' }, 
            IsStoppedText: { 'txtOutIsStopped': 'value' }, 
            IsStoppedStyle: { 'txtOutIsStopped': 'style' }, 
            StatusText: { 'txtOutStatus': 'value' }, 
            StatusStyle: { 'txtOutStatus': 'style' }, 
            StateText: { 'txtOutState': 'value' }, 
            StateStyle: { 'txtOutState': 'style' }
        },

        WidgetClass = SuperClass.extend(function GaMotAxisStatus() {
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
    p.setStatusStruct = function (value) { this.settings['StatusStruct'] = value; this.setChildProps('StatusStruct', value); };
    p.setAxisName = function (value) { this.settings['AxisName'] = value; this.setChildProps('AxisName', value); };
    p.setPositionUnits = function (value) { this.settings['PositionUnits'] = value; this.setChildProps('PositionUnits', value); };
    p.setVelocityUnits = function (value) { this.settings['VelocityUnits'] = value; this.setChildProps('VelocityUnits', value); };
    p.setIsReadyForPowerText = function (value) { this.settings['IsReadyForPowerText'] = value; this.setChildProps('IsReadyForPowerText', value); };
    p.setIsReadyForPowerStyle = function (value) { this.settings['IsReadyForPowerStyle'] = value; this.setChildProps('IsReadyForPowerStyle', value); };
    p.setIsHomedText = function (value) { this.settings['IsHomedText'] = value; this.setChildProps('IsHomedText', value); };
    p.setIsHomedStyle = function (value) { this.settings['IsHomedStyle'] = value; this.setChildProps('IsHomedStyle', value); };
    p.setIsPoweredOnText = function (value) { this.settings['IsPoweredOnText'] = value; this.setChildProps('IsPoweredOnText', value); };
    p.setIsPoweredOnStyle = function (value) { this.settings['IsPoweredOnStyle'] = value; this.setChildProps('IsPoweredOnStyle', value); };
    p.setIsBrakeManRelText = function (value) { this.settings['IsBrakeManRelText'] = value; this.setChildProps('IsBrakeManRelText', value); };
    p.setIsBrakeManRelStyle = function (value) { this.settings['IsBrakeManRelStyle'] = value; this.setChildProps('IsBrakeManRelStyle', value); };
    p.setIsMoveActiveText = function (value) { this.settings['IsMoveActiveText'] = value; this.setChildProps('IsMoveActiveText', value); };
    p.setIsMoveActiveStyle = function (value) { this.settings['IsMoveActiveStyle'] = value; this.setChildProps('IsMoveActiveStyle', value); };
    p.setIsAtPositionText = function (value) { this.settings['IsAtPositionText'] = value; this.setChildProps('IsAtPositionText', value); };
    p.setIsAtPositionStyle = function (value) { this.settings['IsAtPositionStyle'] = value; this.setChildProps('IsAtPositionStyle', value); };
    p.setIsMoveDoneText = function (value) { this.settings['IsMoveDoneText'] = value; this.setChildProps('IsMoveDoneText', value); };
    p.setIsMoveDoneStyle = function (value) { this.settings['IsMoveDoneStyle'] = value; this.setChildProps('IsMoveDoneStyle', value); };
    p.setIsStoppedText = function (value) { this.settings['IsStoppedText'] = value; this.setChildProps('IsStoppedText', value); };
    p.setIsStoppedStyle = function (value) { this.settings['IsStoppedStyle'] = value; this.setChildProps('IsStoppedStyle', value); };
    p.setStatusText = function (value) { this.settings['StatusText'] = value; this.setChildProps('StatusText', value); };
    p.setStatusStyle = function (value) { this.settings['StatusStyle'] = value; this.setChildProps('StatusStyle', value); };
    p.setStateText = function (value) { this.settings['StateText'] = value; this.setChildProps('StateText', value); };
    p.setStateStyle = function (value) { this.settings['StateStyle'] = value; this.setChildProps('StateStyle', value); };

    return WidgetClass;

});
