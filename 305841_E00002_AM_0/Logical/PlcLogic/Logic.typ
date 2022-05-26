
TYPE
  eAXIS_DESIGNATION : 
    ( (* Physical Axes *)
    AD_UNKNOWN := 0,
    AD_SPINDLE := 1,
    AD_OUTER_ECCENTRIC := 2,
    AD_INNER_ECCENTRIC := 3,
    AD_Z := 4,
    (* Other axes *)
    AD_X := 5, (* depth *)
    AD_Y := 6, (* used ? *)
    (* virtual axis *)
    AD_HANDWHEEL := 7,
    (* VFD axis *)
    AD_CF_VFD := 8
  ) := AD_UNKNOWN;
  
  (* Machine specific HMI axis requests. Intended to have one of these structures per axis. *)
  sHmiAxisReqs : STRUCT
    (* Boolean requests in this section. *)
    (* (none *)
    (* numerical requests *)
    (* (none *)
    (* hmi move type and direction selection related *)
    absMoveEnable : BOOL := TRUE; (* allow move type selection by default *)
    relMoveEnable : BOOL := TRUE;
    velMoveEnable : BOOL := TRUE;
    directionPosEnable : BOOL := TRUE; (* allow direction selection by default *)
    directionNegEnable : BOOL := TRUE;
    directionShortestEnable : BOOL := TRUE;
    moveDistanceEnable : BOOL := TRUE; (* enable params by default *)
    movePositionEnable : BOOL := TRUE;
    gearInEnable : BOOL := FALSE; (* coodinated axis gear in enabled *)
    shiftEnable : BOOL := FALSE; (* coordinated axis gear offset or phase shift  enabled *)
    camInEnable : BOOL := FALSE; (* coordinated axis cam in enabled *)
    disengageEnable : BOOL := FALSE; (* coordinated axis cam in enabled *)
    moveDesignation: DINT := -1; (* per hmi. 0: Abs, 1: Rel, 2:Vel or Jog, -1 is no selection. See fctDecodeHmiMoveType *)
    direction: DINT := -1; (* per hmi. 0: pos, 1: neg, 2: shortest, -1 is no selection. See fctDecodeHmiDirection *)
    (* axis designation. Two different data types for convenience. *)
    axisNo : USINT := 0; (* default to initial so setting a value can be detected. USINT for easy use in loops *)
    axisDesignation : eAXIS_DESIGNATION := AD_UNKNOWN; (* default to initial so setting a value can be detected *)
  END_STRUCT;
  
  (* Machine specific HMI process requests. Intended to have one of these per machine or otherwise as needed, but not per axis. *)
  sHmiProcessReqs : STRUCT
    (* Boolean requests in this section. *)
    (* NOTE/CAUTION These request bits may get cleared/copied by memcpy/memclr 
    So be careful about adding boolean requests outside of this section.
    See ClearManualReqs action for example, in OmSaveDev program.
    Bool requests above StartOfClearedRequests won't get auto cleared *)
    StartOfClearedRequests : BOOL := FALSE;
    reqAxesReset : BOOL := FALSE;
    cfReqRun : BOOL := FALSE;
    cfReqStop : BOOL := FALSE; (* NOTE: Stop triggers SM Halt directly. This allows stopping from the HMI even in the wrong mode *)
    zReqMoveUpLimit : BOOL := FALSE;
    zReqMoveDownLimit : BOOL := FALSE;
    zReqMoveLUnL : BOOL := FALSE;
    zReqMoveSoc : BOOL := FALSE;
    zReqMoveIndexUp : BOOL := FALSE;
    zReqMoveIndexDown : BOOL := FALSE;
    zReqPosSocUseCurrent : BOOL := FALSE; (* set SOC to use the current position *)
    zReqPosSocUseSpecified :  BOOL := FALSE; (* set SOC to use the specified position *)
    zReqPosLUnLUseCurrent : BOOL := FALSE; (* set load/unload to use the current position *)
    zReqPosLUnLUseSpecified :  BOOL := FALSE; (* set load/unload to use the specified position *)
    cuttingHeadMoveReqRetract : BOOL := FALSE;
    EndOfClearedRequests : BOOL := FALSE;
    (* NOTE/CAUTION Bool requests below EndOfClearedRequests won't get auto cleared *)
    cfIsInPressureControl : BOOL := FALSE; (* H: Pressure ctrl, L: Speed Control *)
    cfRunEnable : BOOL := FALSE; (* enable hmi request PB *)
    zMoveUpReqEnable : BOOL := FALSE; (* enable hmi request PBs *)
    zMoveDownReqEnable : BOOL := FALSE; (* enable hmi request PBs *)
    zMoveToSocReqEnable : BOOL := FALSE; (* enable hmi request PBs *)
    zMoveToLUnLReqEnable : BOOL := FALSE; (* enable hmi request PBs *)
    (* numerical values used with requests *)
    cuttingHeadReqDepth : LREAL := 0.0;
    cfRpmCmd : REAL;
    cfPsiCmd : REAL;
    zReqPosSoc : LREAL;
    zReqPosLUnL : LREAL;
  END_STRUCT;

  (* cutting fluid vfd params is defined globally so multiple programs can have scope *)
  sCuttingFluidVfd : 	STRUCT 
    isAllowedToStart : BOOL; (* H: Allow to start *)
    isAllowedToRun : BOOL; (* H: Allow to run, L: Shutdown *)
    isLocated : BOOL; (* H: tank is located *)
    isRunning : BOOL; (* H: Drive is enabled *)
    isFlowEstablished : BOOL; (* H: Flow is detected *)
    isAlmLoFlow : BOOL; (* Lo flow shutdown *)
    isWarnLoFlow : BOOL; (* Lo flow warning *)
    isAlmLoLvlSw : BOOL; (* L: low level swtich in alarm *)
    isAlmLoFluid : BOOL; (* Lo Lo fluid level shutdown *)
    isWarnLoFluid : BOOL; (* Lo fluid level warning *)
    isAlmLoOutletPressure : BOOL; (* Lo Lo outlet pressure shutdown *)
    isWarnLoOutletPressure : BOOL; (* Lo outlet pressure warning *)
    isAlmHiOutletPressure : BOOL; (* Hi outlet pressure shutdown *)
    isWarnHiOutletPressure : BOOL; (* Hi outlet pressure warning *)
    isWarnLoFilterDp : BOOL;
    isWarnHiFilterDp : BOOL;
    isAlmSummary : BOOL; (* one of the below alarms is active *)
    isWarnSummary : BOOL; (* one of the below alarms is active *)
  END_STRUCT;
  
  sCyclePermissives : STRUCT
    isOmOk : BOOL; (* operating mode is okay *)
    isCfRdy : BOOL;
    isCfFlowEstablished : BOOL;
    allowCycleStart : BOOL; (* H: cycle start is allowed *)
    allowCycleRun : BOOL; (* H: Allow Run, L: Cycle Stop. Maintain high to allow cycle to run *)
  END_STRUCT;

  sOperatingMode : 	STRUCT 
    (* requests *)
    ReqEmoReset : BOOL := FALSE;
    HmiReqCycleStart : BOOL := FALSE;
    HmiReqCycleStop : BOOL := FALSE;
    ReqCycleStart : BOOL := FALSE; (* pb or hmi *)
    ReqCycleStop : BOOL := FALSE; (* pb or hmi *)
    isInCycle : BOOL := FALSE; (* cycle has started and is running *)
    isInCycleHold : BOOL := FALSE; (* in cycle, but stopped at a hold point *)
    isStopping : BOOL := FALSE; (* cycle has started, but is being stopped *)
    (* cycle cfg *)
    ShutOffCfBeforeUnload : BOOL; (* turn off cutting fluid before going to unload pos *)
    SingleCycleInclZIndex : BOOL; (* include Z index at end of single cycle cut *)
    HmiSubMode : SINT; (* hmi selections of submode *)
    (* mode request are in a word to allow masking and easy clearing *)
    ModeReqBits : WORD := 16#0; (* see OM_xxx constants for bit *)
    SecurityLevel : WORD := SL_UNKNOWN;
    OperatingMode : WORD := OM_UNKNOWN;
    SubMode       : WORD := OM_UNKNOWN; (* see OM_xxx_SM sub mode constants *)
    SeqStep : DINT; (* TODO: Make this an enum *)
  END_STRUCT;

  sPendant : 	STRUCT 
    enableSwActive : BOOL; (* H:Allow motion *)
    enableSwWiringOk : BOOL; (* H:Ok *)
    pendantAllowMoves : BOOL; (* From safety controller. H:Allow moves *)
    emoAcivated : BOOL; (* From safety controller. H:Ok, L: EMO activated *)
    emoWiringOk : BOOL; (* From safety controller. H:Ok *)
    resetReqHandwheelCount : BOOL;
    pendantPowerOk : BOOL; (* 24 VDC button/LED power *)
    encoderPowerOk : BOOL; (* 5 VDC encoder power *)
    PBInputs : ARRAY[1..9] OF BOOL; (* Raw digital input states. Elements/Bits 1-9 correspond to PB 1-9 *)
    PBStates : ARRAY[1..9] OF BOOL; (* Push Button states. Conditioned with behavior. Elements/Bits 1-9 correspond to PB 1-9 *)
    PLCmds : ARRAY[1..9] OF BOOL; (* Pilot light cmds. Elements/Bits 1-9 correspond to PB 1-9 *)
    AxisSelectInputs : ARRAY[1..3] OF BOOL; (* Raw axis select switch inputs *)
    SpeedSelectInputs : ARRAY[1..3] OF BOOL; (* Raw speed select inputs *)
    AxisSelection : eAXIS_DESIGNATION;
    SpeedSelection : REAL;
    HandwheelCounter : DINT;
    Position : REAL;
    PositionSnapshot : REAL; (* used by process to capture a position *)
    GearRatioNumerator : DINT := 100; (* gear factor of the slave / measurment resolution of the slave *)
    GearRatioDenominator : DINT := 100; (* gear factor of the master / measurment resolution of the master *)
    tmrCountResetPulse : TP;
    fbPBs : ARRAY[1..9] OF fbProcPB;
  END_STRUCT;


  
  
END_TYPE
