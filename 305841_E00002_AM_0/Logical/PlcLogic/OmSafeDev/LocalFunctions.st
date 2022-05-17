
(* This function block will turn machine specific requests into GaMpMotion library requests,
and the library requests will handled with the motion library.
In this way, there is a cascading mechanism to get machine specific then axis
specific reqeusts processed by standard library functions,
even when process or machine specific things are not known by the library functions.
Note that the HMI binds to value in library axis req (sMot_HmiAxisReqs) for the move
requests, and move params. When controlling an individual axis, these are not machine specific.
This fb handles things like enable/disable choices based on selection, or other machine specific things. *)
FUNCTION_BLOCK fbHandleHmiAxisReq // Condition HMI machine specific requests, and then process them with GaMpMotion library fbProcessHmiAxisReq.
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

  // Coordinated axis PB enable related
  
  // Gear In and Cam In
  // There must be a slave axis designated,
  // the axes must be homed and enabled,
  // and these two (gear/cam) are mutually exclusive of each other
  _I_MachineAxisReqs.gearInEnable := 
    _I_Axis.CouplingParameters.SlaveAxisNo <> 0 AND
    _I_Axis.Status.IsHomed AND _I_Axis.Status.IsPoweredOn AND
    _I_SlaveAxis.Status.IsHomed AND _I_SlaveAxis.Status.IsPoweredOn AND
    NOT _I_Axis.fbCamIn.Active;

  _I_MachineAxisReqs.camInEnable := 
    _I_Axis.CouplingParameters.SlaveAxisNo <> 0 AND
    _I_Axis.Status.IsHomed AND _I_Axis.Status.IsPoweredOn AND
    _I_SlaveAxis.Status.IsHomed AND _I_SlaveAxis.Status.IsPoweredOn AND
    NOT _I_Axis.fbGearIn.Active;

  // Disengage enabled if gearing or caming is active
  _I_MachineAxisReqs.disengageEnable := _I_Axis.fbGearIn.Active OR _I_Axis.fbCamIn.Active;
  
  // Coordinated shift commands cannot be enabled unless:
  // 1) The slave is gear coordinated and InSync
  // 2) The master is moving ?? TODO: verify
  // 3) Phase shift and offset shift are not in progress
  // 4) Cam is not active
  _I_MachineAxisReqs.shiftEnable :=
    _I_Axis.Status.IsGearInSync AND
    //_I_Axis.Status.IsMoveActive AND
    NOT _I_Axis.fbOffsetShift.ShiftStarted AND
    NOT _I_Axis.fbPhaseShift.ShiftStarted AND
    NOT _I_Axis.fbCamIn.Active;
  
  // Now the direction options should be qualified, set the direction that the GAMpMotion library will see
  _I_LibraryAxisReqs.Direction := fctDecodeHmiDirection(_I_DirectionReq := _I_MachineAxisReqs.direction);

  // Decode the HMI move designation into one the GAMpMotion library will see
  _I_LibraryAxisReqs.moveDesignation := fctDecodeHmiMoveType(
  _I_AxisIsEndless := _I_Axis.isAxisEndless,
  _I_MoveReq := _I_MachineAxisReqs.moveDesignation,
  _I_MoveDirection := _I_LibraryAxisReqs.Direction
  );
  
  // The move type and direction have now been pre-processed. Call the library function to process the requests.
  procLibraryReq(_I_HmiAxisReq := ADR(_I_LibraryAxisReqs),
                 _I_Axis := ADR(_I_Axis),
                 _I_SlaveAxis := ADR(_I_SlaveAxis),
                 _I_AxisPositionLimits := ADR(_I_AxisPositionLimits),
                 _I_ToleranceZeroDepth := TOL_DEPTH_ZERO_DEG);

END_FUNCTION_BLOCK

(* This function block will turn process requests into GaMpMotion library requests.
The GA Motion Library requests will then be handled by the library.
In this way, there is a cascading mechanism to get process specific
reqeusts processed by standard library functions, even when process specific things 
are not known by the library functions.*)
FUNCTION_BLOCK fbHandleHmiProcessReqs (* Turn process specific requests into GaMpMotion library requests. *)
  // Calc structure sizes becuase they will probably be used several times
  szLibReq := SIZEOF(sMot_HmiAxisReqs);
  szAxis := SIZEOF(sMot_Axis);
  szAxisPosLimits := SIZEOF(sMot_PositionLimits);
  
  // Process Z axis requests
  // First get the Z structures by address arithmetic
  rLibReqs ACCESS _I_pLibraryAxesReqs + (AD_Z * szLibReq);
  rAxis ACCESS _I_pAxis + (AD_Z * szAxis);
  // get the slave number, and then calc the memory offset
  slaveNum := rAxis.CouplingParameters.SlaveAxisNo;
  rSlaveAxis ACCESS _I_pAxis + (slaveNum * szAxis);
  rAxisPositionLimits ACCESS _I_pAxisPositionLimits + (AD_Z * szAxisPosLimits);
  
  // Set position requests. Axis needs to be homed if current position is needed.
  // Requests get cleared at the end either way
  IF _I_ProcessReqs.zReqPosSocUseCurrent AND rAxis.Status.IsHomed THEN // home needed since axis position is used
    _I_WpCfg.zAxis.startOfCutPos := rAxis.Status.Position;
  END_IF;
  IF _I_ProcessReqs.zReqPosSocUseSpecified THEN // position specified, homing isn't needed
    _I_WpCfg.zAxis.startOfCutPos := _I_ProcessReqs.zReqPosSoc;
  END_IF;
  IF _I_ProcessReqs.zReqPosLUnLUseCurrent AND rAxis.Status.IsHomed THEN // home needed since axis position is used
    _I_WpCfg.zAxis.loadUnloadPos := rAxis.Status.Position;
  END_IF;
  IF _I_ProcessReqs.zReqPosLUnLUseSpecified THEN // position specified, homing isn't needed
    _I_WpCfg.zAxis.loadUnloadPos := _I_ProcessReqs.zReqPosLUnL;
  END_IF;
  
  
  // If the axis is enabled and homed, issue moves. Otherwise do nothing. 
  // Requests get cleared at the end either way
  IF rAxis.Status.IsHomed AND rAxis.Status.IsPoweredOn THEN
    IF _I_ProcessReqs.zReqMoveUpLimit THEN
      rAxis.MoveParameters.Position := rAxisPositionLimits.PositionLimitPos;
      rAxis.MoveParameters.Velocity := _I_WpCfg.zAxis.indexSpeed;
      rAxis.MoveParameters.Acceleration := _I_WpCfg.zAxis.accel;
      rAxis.MoveParameters.Deceleration := _I_WpCfg.zAxis.decel;
      rAxis.Commands.MoveAbsoluteReq := TRUE;
    END_IF;

    IF _I_ProcessReqs.zReqMoveDownLimit THEN
      rAxis.MoveParameters.Position := rAxisPositionLimits.PositionLimitNeg;
      rAxis.MoveParameters.Velocity := _I_WpCfg.zAxis.indexSpeed;
      rAxis.MoveParameters.Acceleration := _I_WpCfg.zAxis.accel;
      rAxis.MoveParameters.Deceleration := _I_WpCfg.zAxis.decel;
      rAxis.Commands.MoveAbsoluteReq := TRUE;
    END_IF;

    IF _I_ProcessReqs.zReqMoveLUnL AND _I_WpCfg.zAxis.loadUnloadPos > 0.0 THEN
      rAxis.MoveParameters.Position := _I_WpCfg.zAxis.loadUnloadPos;
      rAxis.MoveParameters.Velocity := _I_WpCfg.zAxis.indexSpeed;
      rAxis.MoveParameters.Acceleration := _I_WpCfg.zAxis.accel;
      rAxis.MoveParameters.Deceleration := _I_WpCfg.zAxis.decel;
      rAxis.Commands.MoveAbsoluteReq := TRUE;
    END_IF;

    IF _I_ProcessReqs.zReqMoveSoc AND _I_WpCfg.zAxis.startOfCutPos > 0.0 THEN
      rAxis.MoveParameters.Position := _I_WpCfg.zAxis.startOfCutPos;
      rAxis.MoveParameters.Velocity := _I_WpCfg.zAxis.indexSpeed;
      rAxis.MoveParameters.Acceleration := _I_WpCfg.zAxis.accel;
      rAxis.MoveParameters.Deceleration := _I_WpCfg.zAxis.decel;
      rAxis.Commands.MoveAbsoluteReq := TRUE;
    END_IF;    
    
    IF _I_ProcessReqs.zReqMoveIndexUp AND _I_WpCfg.zAxis.indexDist > 0.0 THEN
      rAxis.MoveParameters.Distance := ABS(_I_WpCfg.zAxis.indexDist); // make sure distance is positive
      rAxis.MoveParameters.Velocity := _I_WpCfg.zAxis.indexSpeed;
      rAxis.MoveParameters.Acceleration := _I_WpCfg.zAxis.accel;
      rAxis.MoveParameters.Deceleration := _I_WpCfg.zAxis.decel;
      rAxis.Commands.MoveRelativeReq := TRUE;
    END_IF;    
  
    IF _I_ProcessReqs.zReqMoveIndexDown AND _I_WpCfg.zAxis.indexDist > 0.0 THEN
      rAxis.MoveParameters.Distance := -1.0 * ABS(_I_WpCfg.zAxis.indexDist); // make sure distance is negative
      rAxis.MoveParameters.Velocity := _I_WpCfg.zAxis.indexSpeed;
      rAxis.MoveParameters.Acceleration := _I_WpCfg.zAxis.accel;
      rAxis.MoveParameters.Deceleration := _I_WpCfg.zAxis.decel;
      rAxis.Commands.MoveRelativeReq := TRUE;
    END_IF;
        
  END_IF;
    
  // Process Cutting Head Requests
  // First get the Inner Eccentric structures by address arithmetic
  rLibReqs ACCESS _I_pLibraryAxesReqs + (AD_INNER_ECCENTRIC * szLibReq);
  rAxis ACCESS _I_pAxis + (AD_INNER_ECCENTRIC * szAxis);
  // get the slave number, and then calc the memory offset
  slaveNum := rAxis.CouplingParameters.SlaveAxisNo;
  rSlaveAxis ACCESS _I_pAxis + (slaveNum * szAxis);
  rAxisPositionLimits ACCESS _I_pAxisPositionLimits + (AD_INNER_ECCENTRIC * szAxisPosLimits);
  
  // If the axis is enabled and homed, issue moves. Otherwise do nothing. 
  // Requests get cleared at the end either way
  IF rAxis.Status.IsHomed AND rAxis.Status.IsPoweredOn THEN
    IF _I_ProcessReqs.cuttingHeadMoveReqRetract THEN
      // Retract cutting head req
      IF rAxis.Status.IsGearInSync OR rAxis.Status.IsCamInSync THEN
        // Axis is coordinated. Modify the offset using the master
        ;
        // TODO: Add cases for both inner and outer stopped
        // TODO: Either or both running but not coord not supported
      END_IF;
    END_IF;
  END_IF;
  
  // Clear the process requests
  pSrc := ADR(_I_ProcessReqs.StartOfClearedRequests);
  pDest := ADR(_I_ProcessReqs.EndOfClearedRequests);
  byteCount := pDest - pSrc + SIZEOF(BOOL);
  nextAddr := brsmemset(pSrc, 0, byteCount);
   
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

// The HMI can easily set values like 0, 1, 2 from radio buttons, but it is harder to set specific sub mode values.
// This function is intended to take an HMI selection and return a sub mode usable by the PLC logic.
FUNCTION fctDecodeHmiSubMode
  // Continuous:   HMI Value 0, PLC Value OM_PROD_SM_CONTINUOUS (16#40)
  // Single Cycle: HMI Value 1, PLC Value OM_PROD_SM_SINGLE (16#41)
  // Single Step:  HMI Value 2, PLC Value OM_PROD_SM_STEPPED (16#42)
  IF _I_SubModeReq = 0 THEN
    fctDecodeHmiSubMode := OM_PROD_SM_CONTINUOUS;
  ELSIF _I_SubModeReq = 1 THEN
    fctDecodeHmiSubMode := OM_PROD_SM_SINGLE;    
  ELSIF _I_SubModeReq = 2 THEN
    fctDecodeHmiSubMode := OM_PROD_SM_STEPPED;
  ELSE 
    fctDecodeHmiSubMode := OM_UNKNOWN;
  END_IF;  
END_FUNCTION
