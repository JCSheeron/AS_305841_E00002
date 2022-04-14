
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
    moveDesignation: DINT := -1; (* -1 is no selection *)
    direction: DINT := -1; (* -1 is no selection *)
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
    zReqMoveLoadUnload : BOOL := FALSE;
    zReqMoveSoc : BOOL := FALSE;
    cuttingHeadMoveReqRetract : BOOL := FALSE;
    (* NOTE/CAUTION Bool requests below cuttingHeadMoveReqRetract won't get auto cleared *)
    (* numerical requests *)
    cuttingHeadReqDepth : LREAL := 0.0;
  END_STRUCT;

END_TYPE
