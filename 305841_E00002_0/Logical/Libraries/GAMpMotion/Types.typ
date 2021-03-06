TYPE
  eGAMOT_HOME_FB_STATUS :
    (
    GAMOT_HMFBS_NOT_ACTIVE := 0,
    GAMOT_HMFBS_ENABLED := 1,
    GAMOT_HMFBS_HOMING := 2,
    GAMOT_HMFBS_HOMED := 3,
    GAMOT_HMFBS_ERR_START_STATE := -1, (* must be in disabled or standstill to start *)
    GAMOT_HMFBS_ERR_HOMING := -2 (* error occured during homing *)
  ) := GAMOT_HMFBS_NOT_ACTIVE;
    
  eGAMOT_AXIS_STATE_MACHINE_STATE :
    (
    (* axis state constants *)
    (* states which dont't issue move commands *)
    GAMOT_ASMS_INITIAL := 0, (*constant for an undefined state. Also used for initial state *)
    GAMOT_ASMS_IGNORE := 1, (*constant for ignore state *)
    GAMOT_ASMS_VALID_CHECK := 2, (*constant for invalid state *)
    GAMOT_ASMS_DISABLED := 3, (*constant for the disabled state *)
    GAMOT_ASMS_ENABLED := 4, (*constant for a waiting while powered *)
    GAMOT_ASMS_HOME_REQ := 5, (*constant for the state in which the axis home was requested *)
    GAMOT_ASMS_HOMING := 6, (*constant for the state in which the axis is being referenced *)
    GAMOT_ASMS_HOMED := 7, (*constant for the state in which the axis is referenced *)
    GAMOT_ASMS_CHK_RESTORE_POS := 8, (* constant for Init Endless Position State *)
    GAMOT_ASMS_RESTORE_POS := 9, (* constant for Init Endless Position Error State *)
    GAMOT_ASMS_ERROR_STOP := 10, (*constant for function block error stop state *)
    GAMOT_ASMS_ERROR_DRVRSTWAIT := 11, (*constant for axis error drive reset wait state *)
    GAMOT_ASMS_ERROR_DISABLE := 12, (*constant for axis error drive reset wait state *)
    GAMOT_ASMS_ERROR_DRVRST:= 13, (*constant for axis error drive reset state *)
    (* states which are stop moves *)
    GAMOT_ASMS_HALT := 20, (*constant for the state in which motion is halted *)
    GAMOT_ASMS_STOP := 21, (*constant for the state in which motion is stopped, awaiting stop reset req *)
    GAMOT_ASMS_STOP_RESET := 22, (*constant for the state in which movements are stopped after stop reset req received *)
    GAMOT_ASMS_HALT_DISABLE := 23, (* constant for the state which stops the axes before disabling *)
    (* states which are velocity  moves *)
    GAMOT_ASMS_JOG := 31, (*constant for the state in which jogging movement is executed *)
    GAMOT_ASMS_JOGPOSLIMIT := 32, (*constant for the state in which jogging positive limit movement is executed *)
    GAMOT_ASMS_JOGNEGLIMIT := 33, (*constant for the state in which jogging positive limit movement is executed *)
    (* states which are velocity moves *)
    GAMOT_ASMS_MOVE_VELOCITY := 41, (* constant for the state in which a movement with a defined velocity is executed *)
    (* states which are relative moves *)
    GAMOT_ASMS_MOVE_RELATIVE := 51, (*constant for the state in which a movement with defined distance is executed*)
    (* states which are absolute moves *)
    GAMOT_ASMS_MOVE_ABSOLUTE := 61, (*constant for the state in which a movement to defined position is executed *)
    (* states related to coordinated moves *)
    GAMOT_ASMS_ENGAGED_AS_SLAVE := 71, (* geared or cammed to a master axis (coordinated slave) *)
    GAMOT_ASMS_DISENGAGE_AS_SLAVE := 72 (* disengaging from a master axis (coordinated slave) *)
  ) := GAMOT_ASMS_INITIAL;

  eGAMOT_MOVE_DESIGNATION : 
    ( (* Move Designation *)
    (* Be careful about changing values -- HMI ramifications *)
    (* Values support bit packed int *)
    GAMOT_MD_UNKNOWN                := -1, (* no HMI selection *)
    GAMOT_MD_NO_MOVE_COMMANDED      := 16#00,  
    GAMOT_MD_JOG_VELOCITY_UP_FWD    := 16#01,
    GAMOT_MD_JOG_VELOCITY_DOWN_REV  := 16#02,
    GAMOT_MD_JOG_LIMIT_UP_FWD       := 16#04,
    GAMOT_MD_JOG_LIMIT_DOWN_REV     := 16#08,
    GAMOT_MD_VELOCITY               := 16#10,
    GAMOT_MD_RELATIVE               := 16#20,
    GAMOT_MD_ABSOLUTE               := 16#40,
    GAMOT_MD_COORDINATED            := 16#80
  ) := GAMOT_MD_NO_MOVE_COMMANDED;
  
  sMot_PositionLimits : STRUCT (* axis travel limits. *)
    (* This is a separate structure from move params so instances can
    efficiently be made permanent variables *)
    PositionLimitPos : LREAL;
    PositionLimitNeg : LREAL;
  END_STRUCT;

  sMot_HmiAxisReqs : STRUCT
    (* Move or motion related requests *)
    (* NOTE: BE CAREFUL about changes and reordering -- HMI and memcopy/memset ramifications *)
    (* Boolean reqs are cleared with memset so adding/removing/moving may be problematic *)
    (* NOTE: Do not add bool reqs before moveReq that should be cleared while in safe/emo modes. *)
    _beginResetSection : BOOL := FALSE;
    moveReq : BOOL := FALSE;
    haltReq : BOOL := FALSE;
    stopReq : BOOL := FALSE;
    homeSetZeroReq : BOOL := FALSE;
    homeSetOffsetReq : BOOL := FALSE;
    homeSetPosReq : BOOL := FALSE;
    enableReq : BOOL := FALSE;
    disableReq : BOOL := FALSE;
    manBrakeRelReq : BOOL := FALSE;
    clearManBrakeRelReq : BOOL := FALSE;
    offsetShiftReq : BOOL := FALSE; (* shift slave pos on the slave axis, shift value in slave units *)
    offsetShiftToMasterPosReq : BOOL := FALSE; (* shift slave position by axis offset in slave units *)
    phaseShiftReq : BOOL := FALSE; (* shift master pos on the slave axis, shift value in master units *)
    gearInReq : BOOL := FALSE;
    camInReq : BOOL := FALSE;
    disengageSlaveReq : BOOL := FALSE; (* Disengage cam and gear *)
    _endResetSection : BOOL := FALSE;
    (* NOTE: Do not add bool reqs after disengageSlaveReq that should be cleared in safe/emo modes.  HMI and memcopy/memset ramifications. *)
    (* Other requests *)
    (* NOTE: Do not add bool reqs before setPositionLimitsReq that should be cleared while in emo mode. *)
    (* Separate the below requests after disengageSlaveReq so they can be considered while in safe mode. *)
    (* These are things that can be done while in safe mode, but the ones above are cleared while in safe.*)
    setPositionLimitsReq : BOOL := FALSE;
    stopResetReq : BOOL := FALSE;
    errorResetReq : BOOL := FALSE;
    driveResetReq : BOOL := FALSE;
    axisNo : USINT := 0; (* convenience axis number this structure corresponds to *)
    (* gear in related *)
    gearRatioNumerator : DINT := 1000; (* gear factor of the slave / measurment resolution of the slave *)
    gearRatioDenominator : DINT := 1000; (* gear factor of the master / measurment resolution of the master *)
    (* shift related *)
    shiftOverMasterDistance : BOOL := FALSE; (* H: Perofrm shift over specified master distance Use mcPROFBASE_MASTER_DISTANCE and shiftProfileDistance *)
    shiftType : SINT := 0; (* based on HMI radio buttons. 0: Relative, 1: Abs *)
    shiftDistance : LREAL := 0.0; (* phase/offset shift distance *)
    shiftProfileDistance : LREAL := 0.0; (* distance master moves during a shift *)
    (* cam related *)
    camId : UINT;
    camMasterOffset : LREAL := 0.0; (* gear factor of the slave / measurment resolution of the slave *)
    camSlaveOffset : LREAL := 0.0; (* gear factor of the master / measurment resolution of the master *)
    homePosition : LREAL := 0.0;
    positionLimits : sMot_PositionLimits;
    moveDesignation : eGAMOT_MOVE_DESIGNATION := GAMOT_MD_NO_MOVE_COMMANDED;
    (* HMI move req *)
    (* BE CAREFUL ABOUT MOVING/DELETING/ADDING/CHANGING MEMORY between Direction and MaxJerk *)
    (* MAY NEED TO ADJUST fgProcessHmiMoveReq instruction in GaMpMotion library *)
    (* These move params are copied to/from the HMI move req structure using memcpy *)
    _startParamCopy : BOOL := FALSE;
    Direction : McDirectionEnum := mcDIR_UNDEFINED; (* direction for commanded movements*)
    Distance : LREAL := 0.0; (* distance for move Commands *)
    Position : LREAL := 0.0; (* target position for home or the motion *)
    Velocity : REAL := 0.0; (* velocity for move Commands *)
    Acceleration : REAL := 1.0; (* acceleration for commanded movements *)
    Deceleration : REAL := 1.0; (* deceleration for commanded movements *)
    MaxJerk : REAL := 0.0; (* deceleration for commanded movements *)
    _endParamCopy : BOOL := FALSE;
    (* NOTE: BE CAREFUL ABOUT MOVING/DELETING/ADDING/CHANGING MEMORY between direction and MaxJerk *)
  END_STRUCT;
  
  sMot_PermissiveCheck : 	STRUCT (* used to halt/stop if out of allowable range or due to permissive *)
    (* 24 byte structure *)
    PermissiveHaltNeg : BOOL; (* byte 0 *)
    PermissiveHaltPos : BOOL; (* byte 1 *)
    CheckFailed : BOOL; (* byte 2 *)
    RangeLimitNeg : BOOL; (* byte 3 *)
    RangeLimitPos : BOOL; (* byte 4 *)
    spareBytes : ARRAY[0..2] OF BYTE; (* bytes 5-7 *)
    StartPosition : LREAL; (* byte 8-15 *)
    EstStoppingDistance : LREAL; (* byte 16-23 *)
  END_STRUCT;
    
  sMot_AxisStatus : 	STRUCT  (* drive state structure from MC_ReadStatus *)
    (* MpAxisBasic related *)
    IsCommuncationReady : BOOL := FALSE; (* MpAxisBasic is ready to communicate *)
    IsReadyToPowerOn : BOOL := FALSE; (* MpAxisBasic is ready for operation *)
    (* digital input status *)
    IsAtHomingSwitch : BOOL := FALSE;
    IsAtPositiveLimitSwitch : BOOL := FALSE;
    IsAtNegativeLimitSwitch : BOOL := FALSE;
    IsTrigger1Active : BOOL := FALSE;
    IsTrigger2Active : BOOL := FALSE;
    IsDriveEnableActive : BOOL := FALSE;
    (* general status *)
    IsInSimulation : BOOL := FALSE; (* Axis is operating in simulaiton mode *)
    IsPoweredOn : BOOL := FALSE;  (* axis is swtiched on/enabled *)
    IsTorqueLimitReady : BOOL := FALSE;
    IsBrakeManuallyReleased : BOOL := FALSE;
    IsHomed : BOOL := FALSE; (* axis is referenced *)
    IsJogging : BOOL := FALSE; (* performing movement *)
    IsAtJogLimit : BOOL := FALSE; (* the axis has reached one of two position limits *)
    IsAtTorqueLimit : BOOL := FALSE; (* the axis limit is active *)
    IsInVelocity : BOOL := FALSE; (* axis is running with a defined velocity *)
    IsInPosition : BOOL := FALSE; (* axis has acheived the desired position *)
    IsMoveActive : BOOL := FALSE; (* movement is active *)
    IsMoveDone : BOOL := FALSE; (* move complete *)
    IsStopped : BOOL := FALSE; (* axis is stopped *)
    (* auto-tune related *)
    IsAutoTuneDone : BOOL := FALSE;
    AutoTuneQuality : REAL := 0.0;
    (* general status values and structures *)
    SafeMotionDiagCode : UINT; (* from Safety Controller safe motion instruction *)
    Velocity : REAL:= INVALID_SENTINEL_REAL; (* actual axis velocity *)
    Position : LREAL:= INVALID_SENTINEL_LREAL; (* actual axis position. Includes MOD to keep value within a period value *)
    DrivePosition : LREAL := INVALID_SENTINEL_LREAL; (* actual axis position. Does not includes MOD so period is ignored *)
    CalculatedPosition1 : LREAL:= INVALID_SENTINEL_LREAL; (* calculated position -- axis specific *)
    CalculatedPosition2 : LREAL:= INVALID_SENTINEL_LREAL; (* calculated position -- axis specific *)
    CalculatedPosition3 : LREAL:= INVALID_SENTINEL_LREAL; (* calculated position -- axis specific *)
    (* Values to see progress of a move *)
    MoveStartPos : LREAL := INVALID_SENTINEL_LREAL;
    MoveEndPos : LREAL := INVALID_SENTINEL_LREAL;
    MoveDistanceRemaining : LREAL := 0.0;
    MoveDistanceComplete : LREAL := 0.0;
    StartupCount : UDINT := 0; (* number of times the drive was started since last PLC start *)
    PlcOpenState : McAxisPLCopenStateEnum;
    networkCommState : McCommunicationStateEnum;
    AxisDiagnostics : MpAxisDiagExtType;
    LibraryInfo : McLibraryInfoType;
    (* coupling related *)
    HasCoordinatedSlave : BOOL := FALSE;
    IsGearInSync : BOOL := FALSE; (* slave is in sync with the master *)
    IsGearInCompensation : BOOL := FALSE; (* slave is in compensation with the master *)
    IsCamInSync : BOOL := FALSE; (* slave is in sync with the master *)
    IsCamEndOfProfile : BOOL := FALSE; (* Pulsed output indicating cyclic end of cam *)
    IsCoordOffsetShiftStarted : BOOL := FALSE; 
    IsCoordOffsetShiftAttained : BOOL := FALSE;
    IsCoordPhaseShiftStarted : BOOL := FALSE;
    IsCoordPhaseShiftAttained : BOOL := FALSE;
    CamStatus : McCamInStatusEnum;
    CoordActualOffsetShift : LREAL := 0.0; (* current shift of the slave *)
    CoordActualPhaseShift : LREAL := 0.0; (* current shift of the master axis *)
  END_STRUCT;

  sMot_MoveParameters : 	STRUCT  (*parameter structure*)
    (* NOTE: BE CAREFUL about changes and reordering -- HMI and memcopy ramifications *)
    (* put the permissive stuff at the beginning, so the move parameter updates to the *)
    (* MpAxisBasic instruction deal with contiguous memory *)
    PosMovePermissive : BOOL := FALSE; (* byte 0 only allow forward moves when high *)
    NegMovePermissive : BOOL := FALSE; (* byte 1 only allow reverse moves when high *)
    EnableTorqueLimit : BOOL := FALSE; (* byte 2 Limit torque for accel/decel *)
    EnableTorqueLimitPrev : BOOL := FALSE;  (* byte 3 prev value to detect change *)
    HaltOnSlaveDisengage : BOOL := FALSE; (* byte 4 if set, issue a halt when axis is disengaged *)
    spareBytes5_7 : ARRAY[0..2] OF BYTE; (* bytes 5-7 *)
    PermissiveCheck : sMot_PermissiveCheck; (* 24 byte structure. bytes 8-31 permissive and range check bits *)
    VelocityMin : REAL := 0.001; (* bytes 32-35 min and max allowed velocity *)
    VelocityMax : REAL := 100.0; (* bytes 36-39 *)
    AccelMin : REAL := 0.001; (* bytes 40-43 min and max allowed acceleration *)
    AccelMax : REAL := 100.0; (* bytes 44-47 *)
    DecelMin : REAL := 0.001; (* bytes 48-51 min and max allowed deceleration *)
    DecelMax : REAL := 100.0; (* bytes 52-55 *)
    _beginHmiSection : BOOL := FALSE;
    (* HMI move req related *)
    (* BE CAREFUL ABOUT MOVING/DELETING/ADDING/CHANGING MEMORY between Direction and MaxJerk 
    (* and between Direction to the end of the structure.*)
    (* MAY NEED TO ADJUST fgProcessHmiAxisReq instruction in GaMpMotion library *)
    (* These move params are copied to/from the HMI move req structure using memcpy *)
    (* use MC enum for direction *)
    (* mcPOSITIVE_DIR = 0, mcNEGATIVE_DIR = 1, mcDIR_SHORTEST_WAY = 3, mcDIR_UNDEFINED = 9, for other values, see docs *)
    Direction : McDirectionEnum := mcDIR_UNDEFINED; (* bytes 56-59 direction for commanded movements*)
    Distance : LREAL := 0.0; (* bytes 60-67 distance for move Commands*)
    Position : LREAL := 0.0; (* bytes 68-75 target position for the movement *)
    Velocity : REAL := 0.0; (* bytes 76-79 velocity for move Commands*)
    Acceleration : REAL := 1.0; (* bytes 80-83 acceleration for commanded movements*)
    Deceleration : REAL := 1.0; (* bytes 84-87 deceleration for commanded movements*)
    MaxJerk : REAL := 0.0; (* bytes 88-91 *)
    (* NOTE: BE CAREFUL ABOUT MOVING/DELETING/ADDING/CHANGING MEMORY between Direction and MaxJerk *)
    (* End Hmi Move Req *)
    _endHmiSection : BOOL := FALSE;
    HomeParams : MpAxisHomingType; (* parameters for referencing the axis*)
    JogParams : MpAxisJogType; (* parameters for jog command *)
    StopParams : MpAxisStopType; (* parameters for stop command *)
    TorqueLimitParams : MpAxisLimitLoadType; (* parameters for torque limit *)
    AutoTuneParams : MpAxisAutoTuneType; (* parameters for auto tuning *)
  END_STRUCT;

  sMot_CouplingParameters : 	STRUCT  (* coupling parameter structure*)
    CouplingPermissive : BOOL := FALSE; (* axis allowing itself to be coupled as a slave *)
    GearInReq : BOOL := FALSE; (* Set to request gear coupling *)
    GearOutReq : BOOL := FALSE; (* Set to request gear decoupling *)
    CamInReq : BOOL := FALSE; (* Set to request cam coupling *)
    CamOutReq : BOOL := FALSE; (* Set to request cam decoupling *)
    OffsetShiftReq : BOOL := FALSE;(* Generate an offset shift in the position of the slave on the slave axis *)
    PhaseShiftReq : BOOL := FALSE; (* Geneate a phase shift in the position of the master on the slave axis *)
    SlaveAxisNo : USINT := 0; (* default to 0 so setting a value can be detected *)
    (* CAUTION
    mem compare and mem copy are used for these values when dealing with run time value changes.
    Be very careful about where you add values. For example, changes to values in the gearin section will 
    cause a gearin update *)
    (* Gear In params *)
    _beginGearInSection : BOOL := FALSE;
    GearInRatioNumerator : DINT := 1000; (* Gear factor of the slave / Measurement resolution of the slave *)
    GearInRatioDenominator : DINT:= 1000; (* Gear factor of the master / Measurement resolution of the master *)
    GearInMasterValueSource : McValueSrcEnum := mcVALUE_ACTUAL; (* Master position source *)
    GearInBufferMode : McBufferModeEnum := mcABORTING; (* mcABORTING is the only mode currently supported *)
    _endGearInSection : BOOL := FALSE;
    (* Offset / Phase shift params *)
    (* The values in the common section are common to gear in, cam, and shift *)
    _beginShiftCommonSection : BOOL := FALSE;
    ShiftAccelerationMax : REAL; (* if 0 limit for slave axis is used *)
    ShiftDecelerationMax : REAL; (* if 0 limit for slave axis is used *)
    ShiftJerk : REAL := 0.0; (* non zero only supported with McProfGen *)
    ShiftProfileBaseMaxVelocity : REAL := 0.0; (* also use for cam adv paramm vel. 0.0: use max velocity master axis *)
    _endShiftCommonSection : BOOL := FALSE;
    _beginShiftSection : BOOL := FALSE;
    ShiftMode : McShiftModeEnum;
    ShiftProfileBase : McProfileBaseEnum;
    Shift : LREAL; (* shift distance *)
    ShiftVelocityMax : REAL;
    ShiftProfileDistance : LREAL;
    (* Zone params used with profile base mcXxx_ZONE *)
    ShiftZoneStartPosition : LREAL;
    ShiftZoneEndPosition : LREAL;
    ShiftZonePeriod : LREAL := 0.0; (* 0: period defined for the profile base is used *)
    _endShiftSection : BOOL := FALSE;
    _beginCamInSection : BOOL := FALSE;
    CamIsPeriodic : BOOL := TRUE; (* H: cam is performed periodically, L: cam is performed once *)
    CamId : UINT := 1; (* cam id used with CamIn *)
    CamMasterOffset : LREAL := 0.0;  
    CamSlaveOffset : LREAL := 0.0;  
    CamScalingMaster : DINT := 1000; (* Cam scaling factor for master *)
    CamScalingSlave : DINT := 1000; (* Cam scaling factor for scaling *)
    CamStartMode : McCamStartModeEnum;
    CamMasterValueSource : McValueSrcEnum := mcVALUE_ACTUAL; (* Master position source *)
    CamBufferMode : McBufferModeEnum := mcABORTING; (* mcABORTING is thye only mode currently supported *)
    _endCamInSection : BOOL := FALSE;
  END_STRUCT;

  sMot_AxisCommands : 	STRUCT  (*command structure for single and master axes*)
    MoveNotAllowed : BOOL:= TRUE; (* set if a requested move is not allowed, clear upon good request *)
    PlcSafetyEnable : BOOL := FALSE; (* PLC logic enable of SafeMC, via safety controller *)
    UpdateMoveParams : BOOL := FALSE; (* used to control the update bit to McAxisBasic when move params change *)
    EnableReq : BOOL:= FALSE; (* request enabling (powering on) the controller. *)
    DisableReq : BOOL:= FALSE; (* request disabeling (powering off) the controller *)
    EnableCmd : BOOL:= FALSE; (* enable (power on) the controller. Power off on false *)
    ReleaseBrakeReq : BOOL:= FALSE; (* request brake release if motor is off *)
    ClearReleaseBrakeReq : BOOL:= FALSE; (* clear brake release req *)
    ReleaseBrakeCmd : BOOL:= FALSE; (* release brake if motor is off *)
    HomeReq : BOOL:= FALSE; (* request setting of the reference position *)
    HomeCmd : BOOL:= FALSE; (* set the reference position *)
    MoveJogReq : BOOL:= FALSE; (* request jog move as long as is set. Direction set by MoveParameter.Direction *)
    MoveJogCmd : BOOL:= FALSE; (* jog (move) as long as is set. Direction set by MoveParameter.Direction *)
    MoveJogPositiveReq : BOOL:= FALSE; (* request jog move as long as is set. Stop at the software position limit *)
    MoveJogPositiveCmd : BOOL:= FALSE; (* jog (move) as long as is set. Stop at the software position limit *)
    MoveJogNegativeReq : BOOL:= FALSE; (* request jog move as long as is set. Stop at the software position limit *)
    MoveJogNegativeCmd : BOOL:= FALSE; (* jog (move) as long as is set. Stop at the software position limit *)
    MoveVelocityReq : BOOL:= FALSE; (* request move at a defined velocity *)
    MoveVelocityCmd : BOOL:= FALSE; (* move at a defined velocity *)
    MoveRelativeReq : BOOL:= FALSE; (* request move of a defined distance*)
    MoveRelativeCmd : BOOL:= FALSE; (* move a defined distance *)
    MoveAbsoluteReq : BOOL:= FALSE; (* request move to a defined position *)
    MoveAbsoluteCmd : BOOL:= FALSE; (* move to a defined position *)
    StopReq : BOOL:= FALSE; (* reqeust stop every active movement on the axis as long as is set *)
    StopCmd : BOOL:= FALSE; (* stop every active movement on the axis as long as is set *)
    StopResetReq : BOOL:= FALSE; (* set high to get out of STOPPED state *)
    HaltReq : BOOL:= FALSE; (* request stop every active movement on the axis *)
    HaltCmd : BOOL:= FALSE; (* stop every active movement on the axis *)
    DriveResetReq : BOOL:= FALSE; (* request drive reset *)
    DriveResetCmd : BOOL:= FALSE; (* drive reset command *)
    ErrorResetReq : BOOL:= FALSE; (* Request exit from Error Reset Wait *)
  END_STRUCT;
  
(*  
  sMot_Error : 	STRUCT  (*error structure 
    FBError : BOOL; (*an error occurred in a FB 
    AxisError : BOOL; (*an axis error has occurred 
    AxisWarning : BOOL; (*an axis warning has occurred 
    AxisErrorStop : BOOL; (*axis is in ErrorStop state 
    AcknowledgeAllReq : BOOL; (*user alarm acknowledge - ack all alarms 
    AcknowledgeReq : BOOL; (*user alarm acknowledge 
    AxisErrorCount : UINT; (*number of active axis errors
    AxisWarningCount : UINT; (*number of active axis warinings
    FBErrorCount : UINT; (*number of active function block errors
    ErrorText : ARRAY[0..3]OF STRING[79]; (*description of first active error or warning
    DateObjectName : STRING[32]; (* Name of rrror text table data object 
  END_STRUCT;
*)  
(*
  sMot_FbStatus : 	STRUCT 
    Active : BOOL;
    Error : BOOL;
    UpdateDone : BOOL;
    CommandBusy : BOOL;
    CommandAborted : BOOL;
    ExecutingCommand : MpAxisExecutingCmdEnum;
    StatusId : MpAxisErrorEnum; (* axis error 
    StatusSeverity : MpComSeveritiesEnum;
    StatusCode : UINT; 
    InternalId : DINT; (* status number of the implementation specific library 
    InternalSeverity: MpComSeveritiesEnum; (* type of info returned by status id 
    InternalFacility: MpComFacilitiesEnum; (* system responsible for the error 
    InternalCode: UINT; (* decode value of Status ID -- error number is left over 
  END_STRUCT;
*)  
  sMot_Axis : 	STRUCT  (*substructure for single and master axes*)
    Ignore : BOOL := TRUE; (* when set, some software routines ignore this axis. Default to set so dummy axis is ignored *)
    ForceSetRef : BOOL := TRUE; (* force the operator to have to re-reference the axis *)
    StartupHomeOk : BOOL := FALSE; (* axis can home itself after startup *)
    isAxisVirtual : BOOL := FALSE; (* axis is virtual if true and motion commands are not allowed *)
    isAxisEndless : BOOL := FALSE; (* axis has no physical limits *)
    isAxisInverter : BOOL := FALSE; (* axis is an inverter in motion control mode *)
    AxisNo : USINT := GAMOT_ASMS_INITIAL; (* default to initial so setting a value can be detected *)
    SMState : eGAMOT_AXIS_STATE_MACHINE_STATE := 0; (* enumeration managed by the state machine *)
    AxisObj : McAxisType ; (* reference to global axis object (i.e. the drive) *)
    SlaveAxisObj : McAxisType ; (* reference to global axis object (i.e. the drive) *)
    Status : sMot_AxisStatus; (* status of the slave axis *)
    StatusSlave : sMot_AxisStatus; (* status of the slave axis *)
    MoveParameters : sMot_MoveParameters; (*parameter structure*)
    MoveParametersPrev : sMot_MoveParameters;  (* detect changes *)
    CouplingParameters : sMot_CouplingParameters;
    CouplingParametersPrev : sMot_CouplingParameters; (* detect changes *)
    Commands : sMot_AxisCommands; (*command structure for single and master axes*)
    fbMpAxisBasic : MpAxisBasic;
    fbReadDrivePos : MC_BR_ReadCyclicPosition;
    fbUpdateBFbParams : fbUpdateBasicParams;
    fbGearIn : MC_GearIn;
    fbGearOut : MC_GearOut;
    fbOffsetShift : MC_BR_Offset;
    fbPhaseShift : MC_BR_Phasing;
    fbCalcCam : MC_BR_CalcCamFromSections;
    fbCalcPoints : MC_BR_CalcPointsFromCam;
    fbCamPrepare : MC_BR_CamPrepare;
    fbCamIn : MC_CamIn;
    fbCamOut : MC_CamOut;
    fbCheckRestorePos : MC_BR_CheckRestorePositionData;
  END_STRUCT;
  
  sMot_GlobalCommands : 	STRUCT  (*command structure for global axis commands*)
    EnableReq : BOOL := FALSE; (* Request all axes be enabled (switched on) *)
    DisableReq : BOOL := FALSE; (* Request all axes be disabled (switched off) *)
    HaltReq : BOOL := FALSE; (* Request to halt as long as is set *)
    StopReq : BOOL := FALSE; (* Request to stop as long as is set *)
    ErrorAcknowledge : BOOL := FALSE; (*reset active errors*)
  END_STRUCT;

END_TYPE
