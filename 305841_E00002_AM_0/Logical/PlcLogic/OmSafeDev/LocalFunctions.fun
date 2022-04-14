
(* This function block will turn machine specific requests into GaMpMotion library requests,
and the library requests will handled with the motion library.
In this way, there is a cascading mechanism to get machine specific then axis
specific reqeusts processed by standard library functions,
even when process or machine specific things are not known by the library functions.
Note that the HMI binds to value in library axis req (sMot_HmiAxisReqs) for the move
requests, and move params. When controlling an individual axis, these are not machine specific.
This fb handles things like enable/disable choices based on selection, or other machine specific things. *)
FUNCTION_BLOCK fbHandleHmiAxisReq (* Turn machine specific reqs into GaMpMotion library requs, and then call library fb fbProcessHmiAxisReq. *)
  VAR_INPUT
    _I_MachineAxisReqs : REFERENCE TO sHmiAxisReqs;
    _I_LibraryAxisReqs : REFERENCE TO sMot_HmiAxisReqs;
    _I_Axis : REFERENCE TO sMot_Axis;
    _I_SlaveAxis : REFERENCE TO sMot_Axis;
    _I_AxisPositionLimits : REFERENCE TO sMot_PositionLimits;
  END_VAR
  
  VAR
    procLibraryReq : fbProcessHmiAxisReq; (* library function block to handle standard reqs built into library *)
  END_VAR
END_FUNCTION_BLOCK

(* This function block will turn process requests into GaMpMotion library requests.
The GA Motion Library requests will then be handled by the library.
In this way, there is a cascading mechanism to get process specific
reqeusts processed by standard library functions, even when process specific things 
are not known by the library functions.*)
FUNCTION_BLOCK fbHandleHmiProcessReqs (* Turn process specific requests into GaMpMotion library requests. *)
  VAR_INPUT
    _I_ProcessReqs : REFERENCE TO sHmiProcessReqs;
    _I_WpCfg : REFERENCE TO sWp_Configuration;
    _I_pLibraryAxesReqs : UDINT; (* pointer to the beginning of the sMot_HmiAxisReqs [] *)
    _I_pAxis : UDINT; (* pointer to the beginning of the sMot_Axis [] *)
    _I_pAxisPositionLimits : UDINT; (* pointer to the beginning of the sMot_PositionLimits [] *)
  END_VAR
  
  VAR
    (* These references are used to call the procLibraryReq function.
    They are set by logic to specific array members by calculating an 
    offset from the pointers passed in *)
    rLibReqs : REFERENCE TO sMot_HmiAxisReqs;
    rAxis : REFERENCE TO sMot_Axis;
    rSlaveAxis : REFERENCE TO sMot_Axis;
    rAxisPositionLimits : REFERENCE TO sMot_PositionLimits;
    slaveNum : USINT; (* hold looked up slave number *)
    (* calc sizes for convenience *)
    szLibReq : UDINT;
    szAxis : UDINT;
    szAxisPosLimits : UDINT;
    procLibraryReq : fbProcessHmiAxisReq; (* library function block to handle standard reqs built into library *)
    (* for use with brsmemset *)
    pSrc : UDINT;
    pDest : UDINT;
    byteCount : UDINT;
    nextAddr : UDINT;
  END_VAR
END_FUNCTION_BLOCK

(* The HMI can easily set values like 0, 1, 2 from radio buttons, but it is harder to set specific move type values *)
(* This function is intended to take an HMI selection and return a move type usable by the GaMpMotion library *)
FUNCTION fctDecodeHmiMoveType : eGAMOT_MOVE_DESIGNATION (* Take in an HMI move type and return a corresponding enum move designation *)
  VAR_INPUT
    _I_AxisIsEndless : BOOL;
    _I_MoveReq : DINT;
    _I_MoveDirection : McDirectionEnum;
  END_VAR
END_FUNCTION

(* The HMI can easily set values like 0, 1, 2 from radio buttons, but it is harder to set specific move type values *)
(* This function is intended to take an HMI selection and return a direction usable by the McAxis library *)
FUNCTION fctDecodeHmiDirection : McDirectionEnum (* Take in an HMI move type and return a corresponding enum move designation *)
  VAR_INPUT
    _I_DirectionReq : DINT;
  END_VAR
END_FUNCTION