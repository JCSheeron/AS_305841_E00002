define(['system/widgets/CompoundWidget/CompoundWidget', 'brease/core/Types', 'text!widgets/GAMotLib/GaMotAxisDetail/content/widgets.css'], function (SuperClass, Types, contentCSS) {

    'use strict';

    /**
    * @class widgets.GAMotLib.GaMotAxisDetail
    * @extends system.widgets.CompoundWidget
    * @requires widgets.GAGeneralLib.TitleLabelBindable
    * @requires widgets.brease.GroupBox
    * @requires widgets.brease.Label
    * @requires widgets.brease.NumericInput
    * @requires widgets.brease.NumericOutput
    * @requires widgets.brease.PushButton
    * @requires widgets.brease.RadioButton
    * @requires widgets.brease.RadioButtonGroup
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
    * @cfg {sMot_PositionLimits} MoveLimitsStruct 
    * @iatStudioExposed 
    * @iatCategory Axis 
    * Structure binding  
    */ 
    /** 
    * @cfg {sMot_HmiAxisReqs} LibraryAxisReqStruct 
    * @iatStudioExposed 
    * @iatCategory Axis 
    * Structure binding  
    */ 
    /** 
    * @cfg {String} AxisName='' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Axis 
    * Axis can have a slave associated with it  
    */ 
    /** 
    * @cfg {Boolean} HasSlaveAxis=false 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Axis 
    * Axis can have a slave associated with it  
    */ 
    /** 
    * @cfg {String} SlaveAxisName='' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Axis 
    * Axis can have a slave associated with it  
    */ 
    /** 
    * @cfg {String} PositionUnits='' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Units 
    * Set the unit string for position and distance units.  
    */ 
    /** 
    * @cfg {String} PositionUnitsSlave='' 
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
    * @cfg {String} VelocityUnitsSlave='' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Units 
    * Set the unit string for velocity units.  
    */ 
    /** 
    * @cfg {String} AccelDecelUnits='' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Units 
    * Set the unit string for accel and decel units.  
    */ 
    /** 
    * @cfg {String} JerkUnits='' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Units 
    * Set the unit string for accel and decel units.  
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
    /** 
    * @cfg {Number} CoordSlavePosition=0.0 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Axis 
    * Coordinated Axis Position  
    */ 
    /** 
    * @cfg {Number} CoordSlaveVelocity=0.0 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Axis 
    * Coordinated Axis Velocity  
    */ 
    /** 
    * @cfg {String} IsCoordSlaveRdyText='No' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Axis 
    * Text display for boolean status  
    */ 
    /** 
    * @cfg {String} IsCoordSlaveRdyStyle='' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Appearance 
    * Text style for boolean status  
    */ 
    /** 
    * @cfg {String} IsCoordMasterRdyText='No' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Axis 
    * Text display for boolean status  
    */ 
    /** 
    * @cfg {String} IsCoordMasterRdyStyle='' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Appearance 
    * Text style for boolean status  
    */ 
    /** 
    * @cfg {String} IsCoordInCompText='No' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Axis 
    * Text display for boolean status  
    */ 
    /** 
    * @cfg {String} IsCoordInCompStyle='' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Appearance 
    * Text style for boolean status  
    */ 
    /** 
    * @cfg {String} IsCoordInSyncText='No' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Axis 
    * Text display for boolean status  
    */ 
    /** 
    * @cfg {String} IsCoordInSyncStyle='' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Appearance 
    * Text style for boolean status  
    */ 
    /** 
    * @cfg {String} IsCoordOffsetDoneText='No' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Axis 
    * Text display for boolean status  
    */ 
    /** 
    * @cfg {String} IsCoordOffsetDoneStyle='' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Appearance 
    * Text style for boolean status  
    */ 
    /** 
    * @cfg {String} IsCoordPhasingDoneText='No' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Axis 
    * Text display for boolean status  
    */ 
    /** 
    * @cfg {String} IsCoordPhasingDoneStyle='' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Appearance 
    * Text style for boolean status  
    */ 
    /** 
    * @cfg {String} SlaveStatusText='Unknown' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Axis 
    * Text display for integer status values.  
    */ 
    /** 
    * @cfg {String} SlaveStatusStyle='' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Appearance 
    * Text style for integer status values.  
    */ 
    /** 
    * @cfg {String} SlaveStateText='Unknown' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Axis 
    * Text display for integer state values.s  
    */ 
    /** 
    * @cfg {String} SlaveStateStyle='' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Appearance 
    * Text style for integer state values  
    */ 
    /** 
    * @cfg {String} DirMovePosText='PosDir' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Axis 
    * Positive Move Direction String  
    */ 
    /** 
    * @cfg {String} DirMoveNegText='NegDir' 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Axis 
    * Negative Move Direction String  
    */ 
    /** 
    * @cfg {Boolean} MoveReqEnable=true 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Axis 
    * Positive Move Direction selection is enabled  
    */ 
    /** 
    * @cfg {Boolean} BrakeRelEnable=true 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Axis 
    * Positive Move Direction selection is enabled  
    */ 
    /** 
    * @cfg {Integer} MoveTypeSelection=-1 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Axis 
    * Axis Move Type Selection  
    */ 
    /** 
    * @cfg {Integer} MoveDirectionSelection=-1 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Axis 
    * Axis Move Type Selection  
    */ 
    /** 
    * @cfg {Boolean} PosDirectionEnable=true 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Axis 
    * Positive Move Direction selection is enabled  
    */ 
    /** 
    * @cfg {Boolean} NegDirectionEnable=true 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Axis 
    * Negative Move Direction selection is enabled  
    */ 
    /** 
    * @cfg {Boolean} ShortestDirectionEnable=true 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Axis 
    * Shortest Path Move Direction selection is enabled  
    */ 
    /** 
    * @cfg {Boolean} DistanceEnable=true 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Axis 
    * Distance parameter input is enabled  
    */ 
    /** 
    * @cfg {Boolean} PositionEnable=true 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Axis 
    * Position parameter input is enabled  
    */ 
    /** 
    * @cfg {Boolean} ShiftEnable=true 
    * @iatStudioExposed 
    * @bindable 
    * @iatCategory Axis 
    * Slave Shift Parameters are enabled  
    */ 

    var defaultSettings = {
            AxisName: '',
            HasSlaveAxis: false,
            SlaveAxisName: '',
            PositionUnits: '',
            PositionUnitsSlave: '',
            VelocityUnits: '',
            VelocityUnitsSlave: '',
            AccelDecelUnits: '',
            JerkUnits: '',
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
            StateStyle: '',
            CoordSlavePosition: 0.0,
            CoordSlaveVelocity: 0.0,
            IsCoordSlaveRdyText: 'No',
            IsCoordSlaveRdyStyle: '',
            IsCoordMasterRdyText: 'No',
            IsCoordMasterRdyStyle: '',
            IsCoordInCompText: 'No',
            IsCoordInCompStyle: '',
            IsCoordInSyncText: 'No',
            IsCoordInSyncStyle: '',
            IsCoordOffsetDoneText: 'No',
            IsCoordOffsetDoneStyle: '',
            IsCoordPhasingDoneText: 'No',
            IsCoordPhasingDoneStyle: '',
            SlaveStatusText: 'Unknown',
            SlaveStatusStyle: '',
            SlaveStateText: 'Unknown',
            SlaveStateStyle: '',
            DirMovePosText: 'PosDir',
            DirMoveNegText: 'NegDir',
            MoveReqEnable: true,
            BrakeRelEnable: true,
            MoveTypeSelection: -1,
            MoveDirectionSelection: -1,
            PosDirectionEnable: true,
            NegDirectionEnable: true,
            ShortestDirectionEnable: true,
            DistanceEnable: true,
            PositionEnable: true,
            ShiftEnable: true
        },

        propertyMapping = {
            
            StatusStruct: { 'numOutPosAct': 'node', 'numOutVelAct': 'node', 'numOutPhaseShiftAct': 'node', 'numOutOffsetAct': 'node' }, 
            MoveLimitsStruct: { 'numOutPosLimitPos': 'node', 'numOutPosLimitNeg': 'node' }, 
            LibraryAxisReqStruct: { 'pbStart': 'value', 'pbHalt': 'value', 'pbStop': 'value', 'pbEnable': 'value', 'pbDisable': 'value', 'pbManBrakeRel': 'value', 'pbClearManBrakeRel': 'value', 'pbEngageSlave': 'value', 'pbDisengageSlave': 'value', 'pbOffsetSlave': 'value', 'pbStopReset': 'value', 'pbErrorReset': 'value', 'pbDriveReset': 'value', 'numInPosMoveParam': 'node', 'numInDistMoveParam': 'node', 'numInVelMoveParam': 'node', 'numInAccelMoveParam': 'node', 'numInDecelMoveParam': 'node', 'numInJerkMoveParam': 'node', 'numInRatioNumerator': 'value', 'numInRatioDenominator': 'value', 'numInSlaveOffsetAmt': 'node', 'numInMasterDistance': 'node' }, 
            AxisName: { 'lblAxisStatus1': 'value' }, 
            HasSlaveAxis: { 'grpBoxSlaveStatus': 'visible', 'grpBoxSlaveControl': 'visible' }, 
            SlaveAxisName: { 'lblSlaveAxisStatus1': 'value', 'lblSlaveAxisStatus2': 'value' }, 
            PositionUnits: { 'numInPosMoveParam': 'unit', 'numInDistMoveParam': 'unit', 'numOutPosAct': 'unit', 'numOutPosLimitPos': 'unit', 'numOutPosLimitNeg': 'unit', 'numInSlaveOffsetAmt': 'unit', 'numInMasterDistance': 'unit' }, 
            PositionUnitsSlave: { 'numOutPosActSlave': 'unit', 'numOutOffsetAct': 'unit', 'numOutPhaseShiftAct': 'unit' }, 
            VelocityUnits: { 'numInVelMoveParam': 'unit', 'numOutVelAct': 'unit' }, 
            VelocityUnitsSlave: { 'numOutVelActSlave': 'unit' }, 
            AccelDecelUnits: { 'numInAccelMoveParam': 'unit', 'numInDecelMoveParam': 'unit' }, 
            JerkUnits: { 'numInJerkMoveParam': 'unit' }, 
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
            StateStyle: { 'txtOutState': 'style' }, 
            CoordSlavePosition: { 'numOutPosActSlave': 'value' }, 
            CoordSlaveVelocity: { 'numOutVelActSlave': 'value' }, 
            IsCoordSlaveRdyText: { 'txtOutIsCoordSlaveRdy': 'value' }, 
            IsCoordSlaveRdyStyle: { 'txtOutIsCoordSlaveRdy': 'style' }, 
            IsCoordMasterRdyText: { 'txtOutIsCoordMasterRdy': 'value' }, 
            IsCoordMasterRdyStyle: { 'txtOutIsCoordMasterRdy': 'style' }, 
            IsCoordInCompText: { 'txtOutIsCoordInComp': 'value' }, 
            IsCoordInCompStyle: { 'txtOutIsCoordInComp': 'style' }, 
            IsCoordInSyncText: { 'txtOutIsCoordInSync': 'value' }, 
            IsCoordInSyncStyle: { 'txtOutIsCoordInSync': 'style' }, 
            IsCoordOffsetDoneText: { 'txtOutIsCoordOffsetDone': 'value' }, 
            IsCoordOffsetDoneStyle: { 'txtOutIsCoordOffsetDone': 'style' }, 
            IsCoordPhasingDoneText: { 'txtOutIsCoordPhasingDone': 'value' }, 
            IsCoordPhasingDoneStyle: { 'txtOutIsCoordPhasingDone': 'style' }, 
            SlaveStatusText: { 'txtOutStatusSlave': 'value' }, 
            SlaveStatusStyle: { 'txtOutStatusSlave': 'style' }, 
            SlaveStateText: { 'txtOutStateSlave': 'value' }, 
            SlaveStateStyle: { 'txtOutStateSlave': 'style' }, 
            DirMovePosText: { 'rdoBtnDirPos': 'value' }, 
            DirMoveNegText: { 'rdoBtnDirNeg': 'value' }, 
            MoveReqEnable: { 'pbStart': 'enable' }, 
            BrakeRelEnable: { 'pbManBrakeRel': 'enable', 'pbClearManBrakeRel': 'enable' }, 
            MoveTypeSelection: { 'rdoBtnGrpMoveType': 'selectedIndex' }, 
            MoveDirectionSelection: { 'rdoBtnGrpMoveDir': 'selectedIndex' }, 
            PosDirectionEnable: { 'rdoBtnDirPos': 'enable' }, 
            NegDirectionEnable: { 'rdoBtnDirNeg': 'enable' }, 
            ShortestDirectionEnable: { 'rdoBtnDirShortest': 'enable' }, 
            DistanceEnable: { 'numInDistMoveParam': 'enable' }, 
            PositionEnable: { 'numInPosMoveParam': 'enable' }, 
            ShiftEnable: { 'numInSlaveOffsetAmt': 'enable', 'numInMasterDistance': 'enable', 'pbOffsetSlave': 'enable' }
        },

        WidgetClass = SuperClass.extend(function GaMotAxisDetail() {
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
    p.setMoveLimitsStruct = function (value) { this.settings['MoveLimitsStruct'] = value; this.setChildProps('MoveLimitsStruct', value); };
    p.setLibraryAxisReqStruct = function (value) { this.settings['LibraryAxisReqStruct'] = value; this.setChildProps('LibraryAxisReqStruct', value); };
    p.setAxisName = function (value) { this.settings['AxisName'] = value; this.setChildProps('AxisName', value); };
    p.setHasSlaveAxis = function (value) { this.settings['HasSlaveAxis'] = value; this.setChildProps('HasSlaveAxis', value); };
    p.setSlaveAxisName = function (value) { this.settings['SlaveAxisName'] = value; this.setChildProps('SlaveAxisName', value); };
    p.setPositionUnits = function (value) { this.settings['PositionUnits'] = value; this.setChildProps('PositionUnits', value); };
    p.setPositionUnitsSlave = function (value) { this.settings['PositionUnitsSlave'] = value; this.setChildProps('PositionUnitsSlave', value); };
    p.setVelocityUnits = function (value) { this.settings['VelocityUnits'] = value; this.setChildProps('VelocityUnits', value); };
    p.setVelocityUnitsSlave = function (value) { this.settings['VelocityUnitsSlave'] = value; this.setChildProps('VelocityUnitsSlave', value); };
    p.setAccelDecelUnits = function (value) { this.settings['AccelDecelUnits'] = value; this.setChildProps('AccelDecelUnits', value); };
    p.setJerkUnits = function (value) { this.settings['JerkUnits'] = value; this.setChildProps('JerkUnits', value); };
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
    p.setCoordSlavePosition = function (value) { this.settings['CoordSlavePosition'] = value; this.setChildProps('CoordSlavePosition', value); };
    p.setCoordSlaveVelocity = function (value) { this.settings['CoordSlaveVelocity'] = value; this.setChildProps('CoordSlaveVelocity', value); };
    p.setIsCoordSlaveRdyText = function (value) { this.settings['IsCoordSlaveRdyText'] = value; this.setChildProps('IsCoordSlaveRdyText', value); };
    p.setIsCoordSlaveRdyStyle = function (value) { this.settings['IsCoordSlaveRdyStyle'] = value; this.setChildProps('IsCoordSlaveRdyStyle', value); };
    p.setIsCoordMasterRdyText = function (value) { this.settings['IsCoordMasterRdyText'] = value; this.setChildProps('IsCoordMasterRdyText', value); };
    p.setIsCoordMasterRdyStyle = function (value) { this.settings['IsCoordMasterRdyStyle'] = value; this.setChildProps('IsCoordMasterRdyStyle', value); };
    p.setIsCoordInCompText = function (value) { this.settings['IsCoordInCompText'] = value; this.setChildProps('IsCoordInCompText', value); };
    p.setIsCoordInCompStyle = function (value) { this.settings['IsCoordInCompStyle'] = value; this.setChildProps('IsCoordInCompStyle', value); };
    p.setIsCoordInSyncText = function (value) { this.settings['IsCoordInSyncText'] = value; this.setChildProps('IsCoordInSyncText', value); };
    p.setIsCoordInSyncStyle = function (value) { this.settings['IsCoordInSyncStyle'] = value; this.setChildProps('IsCoordInSyncStyle', value); };
    p.setIsCoordOffsetDoneText = function (value) { this.settings['IsCoordOffsetDoneText'] = value; this.setChildProps('IsCoordOffsetDoneText', value); };
    p.setIsCoordOffsetDoneStyle = function (value) { this.settings['IsCoordOffsetDoneStyle'] = value; this.setChildProps('IsCoordOffsetDoneStyle', value); };
    p.setIsCoordPhasingDoneText = function (value) { this.settings['IsCoordPhasingDoneText'] = value; this.setChildProps('IsCoordPhasingDoneText', value); };
    p.setIsCoordPhasingDoneStyle = function (value) { this.settings['IsCoordPhasingDoneStyle'] = value; this.setChildProps('IsCoordPhasingDoneStyle', value); };
    p.setSlaveStatusText = function (value) { this.settings['SlaveStatusText'] = value; this.setChildProps('SlaveStatusText', value); };
    p.setSlaveStatusStyle = function (value) { this.settings['SlaveStatusStyle'] = value; this.setChildProps('SlaveStatusStyle', value); };
    p.setSlaveStateText = function (value) { this.settings['SlaveStateText'] = value; this.setChildProps('SlaveStateText', value); };
    p.setSlaveStateStyle = function (value) { this.settings['SlaveStateStyle'] = value; this.setChildProps('SlaveStateStyle', value); };
    p.setDirMovePosText = function (value) { this.settings['DirMovePosText'] = value; this.setChildProps('DirMovePosText', value); };
    p.setDirMoveNegText = function (value) { this.settings['DirMoveNegText'] = value; this.setChildProps('DirMoveNegText', value); };
    p.setMoveReqEnable = function (value) { this.settings['MoveReqEnable'] = value; this.setChildProps('MoveReqEnable', value); };
    p.setBrakeRelEnable = function (value) { this.settings['BrakeRelEnable'] = value; this.setChildProps('BrakeRelEnable', value); };
    p.setMoveTypeSelection = function (value) { this.settings['MoveTypeSelection'] = value; this.setChildProps('MoveTypeSelection', value); };
    p.setMoveDirectionSelection = function (value) { this.settings['MoveDirectionSelection'] = value; this.setChildProps('MoveDirectionSelection', value); };
    p.setPosDirectionEnable = function (value) { this.settings['PosDirectionEnable'] = value; this.setChildProps('PosDirectionEnable', value); };
    p.setNegDirectionEnable = function (value) { this.settings['NegDirectionEnable'] = value; this.setChildProps('NegDirectionEnable', value); };
    p.setShortestDirectionEnable = function (value) { this.settings['ShortestDirectionEnable'] = value; this.setChildProps('ShortestDirectionEnable', value); };
    p.setDistanceEnable = function (value) { this.settings['DistanceEnable'] = value; this.setChildProps('DistanceEnable', value); };
    p.setPositionEnable = function (value) { this.settings['PositionEnable'] = value; this.setChildProps('PositionEnable', value); };
    p.setShiftEnable = function (value) { this.settings['ShiftEnable'] = value; this.setChildProps('ShiftEnable', value); };

    return WidgetClass;

});
