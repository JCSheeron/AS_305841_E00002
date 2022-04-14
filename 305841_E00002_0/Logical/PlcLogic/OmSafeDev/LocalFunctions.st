(* This function block will turn process requests into GaMpMotion library requests.
The GA Motion Library requests will then be handled by the fbHandleHmiAxisReq fb.
In this way, there is a cascading mechanism to get process specific then
machine specific then axis specific reqeusts processed by standard library functions,
even when process or machine specific things are not known by the library functions. *)
FUNCTION_BLOCK fbHandleHmiProcessReqs (* Turn process specific requests into GaMpMotion library requests. *)
  // library axis req pointer is set ... assume it points to the first element of an array of sMot_HmiAxisReqs structures *)
  // TODO: Need to figure out syntax for accessing individual array elements and implement fb
  // libReqs ACCESS ADR(_I_pLibraryAxesReqs) + (AD_Z * SIZEOF(sMot_HmiAxisReqs)); // Set to access the Z Axis
  RETURN;
END_FUNCTION_BLOCK

(* This function block will turn machine specific requests into GaMpMotion library requests.
Machine axis requests will be turned into library requests, and finally
library requests will be called using the library fb.
In this way, there is a cascading mechanism to get machine specific then axis
specific reqeusts processed by standard library functions,
even when process or machine specific things are not known by the library functions. *)
FUNCTION_BLOCK fbHandleHmiAxisReq // Condition HMI process specific, then machine specific, and then process them with GaMpMotion library fbProcessHmiAxisReq.
  // Map (decode) HMI move type and then direction that the GAMpMotion library will see.
  // Note the direction and move parameters allowd are be influenced by the move type.
  // Do this before processing the move request so values can be checked or used before issuing a move.
  
  // Endless Axes, or continuous rotary axes (spindle and eccentrics) in this case,
  // in theory can use pos, neg, or shortest path (NOT supported yet).
  // For absolute moves, but non-continuous axes (Z) don't have a specfied direction for absolute moves -- the
  // direction is inherent to the requested position.
  // Also, an absolute move does not need distance, and a relative move does not need a position.
  // A velocity move does not need either.
  // Set the enable bits of the move direction as appropriate
  IF _I_MachineAxisReqs.moveDesignation = 0 THEN // absolute
    // An absolute move does not use distance, only position
    _I_MachineAxisReqs.moveDistanceEnable := FALSE;
    _I_MachineAxisReqs.movePositionEnable := TRUE;
    // now look at the axis and decied on what directions are allowed.
    IF _I_Axis.isAxisEndless THEN
      // Endless axis, absolute move: forward, backward, and shortest (if supported) are allowed
      _I_MachineAxisReqs.directionPosEnable := TRUE;
      _I_MachineAxisReqs.directionNegEnable := TRUE;
      _I_MachineAxisReqs.directionShortestEnable := FALSE; // could be true, but shortest is not supported yet
      // If the selected direction is shortest, then clear the selection
      IF _I_MachineAxisReqs.direction = 2 THEN
        _I_MachineAxisReqs.direction := -1;
      END_IF;
    ELSE
      // For non-endless axis, direction is inferred by move position, so the operator does not choose it
      // Disable choices and clear the selection
      _I_MachineAxisReqs.directionPosEnable := FALSE;
      _I_MachineAxisReqs.directionNegEnable := FALSE;
      _I_MachineAxisReqs.directionShortestEnable := FALSE;
      _I_MachineAxisReqs.direction := -1;
    END_IF;
  ELSIF _I_MachineAxisReqs.moveDesignation = 1 THEN // relative
    // A relative move does not use position, only distance
    _I_MachineAxisReqs.moveDistanceEnable := TRUE;
    _I_MachineAxisReqs.movePositionEnable := FALSE;
    // All axes, relative move: forward and backward are viable selections
    _I_MachineAxisReqs.directionPosEnable := TRUE;
    _I_MachineAxisReqs.directionNegEnable := TRUE;
    _I_MachineAxisReqs.directionShortestEnable := FALSE;
    // If the selected direction is shortest, then clear the selection
    IF _I_MachineAxisReqs.direction = 2 THEN
      _I_MachineAxisReqs.direction := -1;
    END_IF;
  ELSIF _I_MachineAxisReqs.moveDesignation = 2 THEN // velocity
    // A velocity move does not use position or distance
    _I_MachineAxisReqs.moveDistanceEnable := FALSE;
    _I_MachineAxisReqs.movePositionEnable := FALSE;
    // All axes, velocity move: forward and backward are viable selections
    _I_MachineAxisReqs.directionPosEnable := TRUE;
    _I_MachineAxisReqs.directionNegEnable := TRUE;
    _I_MachineAxisReqs.directionShortestEnable := FALSE;
    // If the selected direction is shortest, then clear the selection
    IF _I_MachineAxisReqs.direction = 2 THEN
      _I_MachineAxisReqs.direction := -1;
    END_IF;
  ELSE
    // Not caught move type (error case).
    // Allow move direction so move type can be determined in the move velocity case
    _I_MachineAxisReqs.moveDistanceEnable := FALSE;
    _I_MachineAxisReqs.movePositionEnable := FALSE;
    _I_MachineAxisReqs.directionPosEnable := FALSE;
    _I_MachineAxisReqs.directionNegEnable := FALSE;
    _I_MachineAxisReqs.directionShortestEnable := FALSE;
    _I_MachineAxisReqs.direction := -1;
  END_IF;

  // Coordinated shift commands cannot be enabled unless:
  // 1) The slave is coordinated and InSync
  // 2) The master is moving  
  // 3) A phase shift or offset shift is not underway
  _I_MachineAxisReqs.shiftEnable := _I_Axis.Status.IsCoordInSync AND
    _I_Axis.Status.IsMoveActive AND
    NOT _I_Axis.CouplingParameters.OffsetShiftCmd AND
    NOT _I_Axis.CouplingParameters.PhaseShiftCmd;
  
  // Now the direction options should be qualified, set the direction that the GAMpMotion library will see
  _I_LibraryAxisReqs.Direction := fctDecodeHmiDirection(_I_DirectionReq := _I_MachineAxisReqs.direction);

  // Decode the HMI move designation into one the GAMpMotion library will see
  _I_LibraryAxisReqs.moveDesignation := fctDecodeHmiMoveType(
  _I_AxisIsEndless := _I_Axis.isAxisEndless,
  _I_MoveReq := _I_MachineAxisReqs.moveDesignation,
  _I_MoveDirection := _I_LibraryAxisReqs.Direction
  );
  
  // The move type and direction have now been pre-processed. Call the library function to process the requests.
  procLibraryReq(_I_HmiAxisReq := ADR(_I_LibraryAxisReqs), _I_Axis := ADR(_I_Axis), _I_SlaveAxis := ADR(_I_SlaveAxis), _I_AxisPositionLimits := ADR(_I_AxisPositionLimits));

END_FUNCTION_BLOCK

// The HMI can easily set values like 0, 1, 2 from radio buttons for example, but it is harder to set specific move type values
// This function is intended to take an HMI selection and return a move type usable by the GaMpMotion library.
// In the velocity move type case, if axis is endless, a velocity move is used. If the axis is
// not endless, jog limit instructions are used so limits can be considered.
FUNCTION fctDecodeHmiMoveType
  // Absolute move: HMI Value 0, GaMpMotion library 16#40
  // Relative move: HMI Value 1, GaMpMotion library 16#20
  // Velocity move: HMI Value 2
  // Velocity GaMpMotion library 16#10
  // Jog Limit Up Fwd GaMpMotion library 16#04
  // Jog Limit Down Rev GaMpMotion library 16#08
  IF _I_MoveReq = 0 THEN
    fctDecodeHmiMoveType := GAMOT_MD_ABSOLUTE;
  ELSIF _I_MoveReq = 1 THEN
    fctDecodeHmiMoveType := GAMOT_MD_RELATIVE;    
  ELSIF _I_MoveReq = 2 THEN
    // If the axis is endless, use a velocity move, otherwise use a Jog Limit move
    // The jog limit requires a direction so the correct instruction and limit can be considered.
    IF _I_AxisIsEndless THEN
      fctDecodeHmiMoveType := GAMOT_MD_VELOCITY;
    ELSE
      IF _I_MoveDirection = mcDIR_POSITIVE THEN
        fctDecodeHmiMoveType := GAMOT_MD_JOG_LIMIT_UP_FWD;
      ELSIF _I_MoveDirection = mcDIR_NEGATIVE THEN
        fctDecodeHmiMoveType := GAMOT_MD_JOG_LIMIT_DOWN_REV;
      ELSE
        fctDecodeHmiMoveType := GAMOT_MD_NO_MOVE_COMMANDED;
      END_IF;
    END_IF;
  ELSE 
      fctDecodeHmiMoveType := GAMOT_MD_NO_MOVE_COMMANDED;
  END_IF;  
END_FUNCTION

// The HMI can easily set values like 0, 1, 2 from radio buttons, but it is harder to set specific move type values
// This function is intended to take an HMI selection and return a direction usable by the McAxis library
FUNCTION fctDecodeHmiDirection
  // Positive Direction: HMI Value 0, GaMpMotion library 0
  // Negative Direction: HMI Value 1, GaMpMotion library 1
  // Shortest Path:      HMI Value 2, GaMpMotion library 3
  IF _I_DirectionReq = 0 THEN
    fctDecodeHmiDirection := mcDIR_POSITIVE;
  ELSIF _I_DirectionReq = 1 THEN
    fctDecodeHmiDirection := mcDIR_NEGATIVE;    
  ELSIF _I_DirectionReq = 2 THEN
    fctDecodeHmiDirection := mcDIR_SHORTEST_WAY;
  ELSE 
    fctDecodeHmiDirection := mcDIR_UNDEFINED;
  END_IF;  
END_FUNCTION

