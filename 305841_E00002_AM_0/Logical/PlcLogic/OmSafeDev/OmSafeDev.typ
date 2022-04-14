
TYPE
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
    shiftEnable : BOOL := FALSE; (* coordinated axis shift enabled *)
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
    Bool requests above zReqMoveUpLimit won't get auto cleared *)
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
    (* NOTE/CAUTION Bool requests below cuttingHeadMoveReqRetract won't get auto cleared *)
    zMoveUpReqEnable : BOOL := FALSE; (* enable hmi request PBs *)
    zMoveDownReqEnable : BOOL := FALSE; (* enable hmi request PBs *)
    zMoveToSocReqEnable : BOOL := FALSE; (* enable hmi request PBs *)
    zMoveToLUnLReqEnable : BOOL := FALSE; (* enable hmi request PBs *)
    (* numerical values used with requests *)
    cuttingHeadReqDepth : LREAL := 0.0;
    zReqPosSoc : LREAL;
    zReqPosLUnL : LREAL;
  END_STRUCT;

END_TYPE
