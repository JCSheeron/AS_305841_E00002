(* This function block will turn process requests into GaMpMotion library requests.
The GA Motion Library requests will then be handled by the fbHandleHmiAxisReq fb.
In this way, there is a cascading mechanism to get process specific then
machine specific then axis specific reqeusts processed by standard library functions,
even when process or machine specific things are not known by the library functions. *)
FUNCTION_BLOCK fbHandleHmiProcessReqs (* Turn process specific requests into GaMpMotion library requests. *)
  VAR_INPUT
    _I_ProcessReqs : REFERENCE TO sHmiProcessReqs;
    (* pointer to an array of sMot_HmiAxisReqs GA Motion Library requests *)
    (* use a pointer so array length does not need to known. *)
    _I_pLibraryAxesReqs : REFERENCE TO UDINT; 
  END_VAR
  
  VAR
    (* automatic dereferencing of pLIbraryAxesReqs is not performed since it is being used as a pointer*)
    (* use this var below to hold a reference to an individual array element *)
    libReqs : REFERENCE TO sMot_HmiAxisReqs;
  END_VAR
END_FUNCTION_BLOCK

(* This function block will turn machine specific requests into GaMpMotion library requests.
Machine axis requests will be turned into library requests, and finally
library requests will be called using the library fb.
In this way, there is a cascading mechanism to get machine specific then axis
specific reqeusts processed by standard library functions,
even when process or machine specific things are not known by the library functions. *)
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