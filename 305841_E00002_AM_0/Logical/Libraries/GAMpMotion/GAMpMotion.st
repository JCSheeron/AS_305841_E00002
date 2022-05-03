// Given an referenced to an sMot_Axis structure, and 
// a desired position, request an absolute move on the axis.
// This funciton block is intended to be called all the time,
// and perform the home when the enable input is set.  It allows
// easy monitoring of its outputs to see when homing is complete.
FUNCTION_BLOCK fbHomeAbsSeq
  IF NOT _I_Enable THEN
    // Not enabled. Clear OS, clear outputs and leave
    enableOS := FALSE;
    _O_Busy := FALSE;
    _O_Done := FALSE;
    _O_Error := FALSE;
    _O_Homed := FALSE;
    _O_State := GAMOT_HMFBS_NOT_ACTIVE;
    RETURN;
  ELSIF _I_Enable AND NOT enableOS THEN
    // Enable rising edge ... Set the OS and update the fb outputs.
    // Axis needs to be in disable or standstill states to start homing.
    // If not, return an error, but if so, then set the mode and position and requst
    // homing.
    
    // Set OS
    enableOS := TRUE;
    
    IF _I_Axis.Status.PlcOpenState <> mcAXIS_DISABLED AND _I_Axis.Status.PlcOpenState <> mcAXIS_STANDSTILL THEN
      // Not disabled or standstill... This is an error, must be here to home.
      _O_Busy := FALSE;
      _O_Done := TRUE;
      _O_Error := TRUE;
      _O_Homed := FALSE;
      _O_State := GAMOT_HMFBS_ERR_START_STATE;
    ELSE
      // In standstill or disabled... Okay to start homing.
      // This is the first pass, so set up home cmd.
      // Set the position here on the first scan, and then not again ...
      // Don't want an updated position passed into the fb as a result of homing
      // to confuse things.
      // If the axis is virtual, use direct, otherwise use absolute
      IF _I_Axis.isAxisVirtual THEN
          // The virtual axis case
        _I_Axis.MoveParameters.HomeParams.Mode := mcHOMING_DIRECT;
      ELSE
        //. The non-virtual axis case
        _I_Axis.MoveParameters.HomeParams.Mode := mcHOMING_DIRECT;
      END_IF;
      
      _I_Axis.MoveParameters.HomeParams.Position := _I_Position;
      _I_Axis.Commands.HomeReq := TRUE;
      _O_Busy  := TRUE;
      _O_Done  := FALSE;
      _O_Error := FALSE;
      _O_Homed := FALSE;
      _O_State := GAMOT_HMFBS_ENABLED;
    END_IF;
    
  ELSE
    // While Enabled (after rising edge)
    IF _O_State = GAMOT_HMFBS_ENABLED AND
      (_I_Axis.Status.PlcOpenState = mcAXIS_HOMING OR 
      _I_Axis.Status.AxisDiagnostics.ExecutingCommand = mcAXIS_CMD_HOMING) THEN
      // state is homing
      _O_Busy  := TRUE;
      _O_Done  := FALSE;
      _O_Error := FALSE;
      _O_Homed := FALSE;
      _O_State := GAMOT_HMFBS_HOMING;
    ELSIF _O_State = GAMOT_HMFBS_HOMING AND _I_Axis.Status.IsHomed AND
      (_I_Axis.Status.PlcOpenState = mcAXIS_DISABLED OR
      _I_Axis.Status.PlcOpenState = mcAXIS_STANDSTILL) THEN
      // Force to go thru the homing state, but now done (sucessfully homed)
      _O_Busy  := FALSE;
      _O_Done  := TRUE;
      _O_Error := FALSE;
      _O_Homed := TRUE;
      _O_State := GAMOT_HMFBS_HOMED;
    ELSIF _O_State = GAMOT_HMFBS_HOMING AND
      (_I_Axis.Status.AxisDiagnostics.StatusID.ID <> mcAXIS_NO_ERROR OR
      _I_Axis.Status.PlcOpenState = mcAXIS_ERRORSTOP) THEN
      // Force to go thru the homing state, but now done -- error case
      _O_Busy  := FALSE;
      _O_Done  := TRUE;
      _O_Error := TRUE;
      _O_Homed := FALSE;
      _O_State := GAMOT_HMFBS_ERR_HOMING;
    END_IF;
  END_IF;
END_FUNCTION_BLOCK
    
// If an axis request is made, copy the hmi values to the correct axis structure(s),
// and set the request in the axis command structure.
// NOTE: It is important to clear the HMI requests immediatly after acting on them.
// This is because the binding of the HMI is such that a high request will be set on 
// whichever axis is selected. If a the operator changes the selected axis, the
// requst bit on the newly selected axis must not be set because the requst on the
// origianl axis was high.
FUNCTION_BLOCK fbProcessHmiAxisReq
  // If a halt or a stop request is made, make these priority.
  // Make sure the move request is cleared, so it does not get serviced,
  // and send the halt or stop, and clear the requests.
  IF _I_HmiAxisReq.stopReq OR _I_HmiAxisReq.haltReq THEN
    // Clear the move reqs
    _I_HmiAxisReq.moveReq := FALSE;
    _I_HmiAxisReq.moveDesignation := GAMOT_MD_NO_MOVE_COMMANDED;
    // Note the axis SM will handle the clearing of the axis.commands.reqs.
    // Send thru the requested stop or halt
    _I_Axis.Commands.StopReq:= _I_HmiAxisReq.stopReq;
    _I_Axis.Commands.HaltReq := _I_HmiAxisReq.haltReq;
    // reset the hmi requests
    _I_HmiAxisReq.stopReq := FALSE;
    _I_HmiAxisReq.haltReq := FALSE;
  END_IF;
  
  // Set permanent varialbe position limits if requested
  IF _I_HmiAxisReq.setPositionLimitsReq THEN
    // Clear the request
    _I_HmiAxisReq.setPositionLimitsReq := FALSE;
    // Set the retained limits to the requested values.
    _I_AxisPositionLimits.PositionLimitPos := _I_HmiAxisReq.positionLimits.PositionLimitPos;
    _I_AxisPositionLimits.PositionLimitNeg := _I_HmiAxisReq.positionLimits.PositionLimitNeg;
  END_IF;
  
  // Put the position, velocity, accel, decel and max jerk from the HMI axis request into the axis structures.
  // NOTE: Assume identical memory layout ... memcpy used
  // memcpy(dest, src, len);
  pHmi := ADR(_I_HmiAxisReq.Position);
  pMoveParams := ADR(_I_Axis.MoveParameters.Position);
  size:= ADR(_I_HmiAxisReq.MaxJerk) - ADR(_I_HmiAxisReq.Position) + SIZEOF(_I_HmiAxisReq.MaxJerk); // bytes of the hmi move req moved to the appropriate section of the axis move parameters
  nxtAddr := brsmemcpy(pMoveParams,pHmi,size);
  
  // Update coupling params if a slave axis is designated for this axis. 
  // The slave need not be engaged. The engage/disengage, gear, and shfit requests are handled later.
  IF _I_Axis.CouplingParameters.SlaveAxisNo <> GAMOT_ASMS_INITIAL THEN
    _I_Axis.CouplingParameters.RatioNumerator := _I_HmiAxisReq.GearRatioNumerator;
    _I_Axis.CouplingParameters.RatioDenominator := _I_HmiAxisReq.GearRatioDenominator;
    // For cam scaling, use the gear ratio. Slave uses numerator and master uses denominator.
    _I_Axis.CouplingParameters.CamScalingMaster := _I_HmiAxisReq.GearRatioDenominator;
    _I_Axis.CouplingParameters.CamScalingSlave := _I_HmiAxisReq.GearRatioNumerator;
    // Gear, Gear In Pos, Offset Shift and Phase shift all use the slave accel/decel values,
    // so make sure the values are set in the coupling params structure
    // Set to 0.0 to use slave max
    _I_Axis.CouplingParameters.ShiftAccelerationMax := _I_SlaveAxis.MoveParameters.Acceleration; // Use slave axis accel/decel
    _I_Axis.CouplingParameters.ShiftDecelerationMax := _I_SlaveAxis.MoveParameters.Deceleration;
    // Set shift & offset related values
    _I_Axis.CouplingParameters.Shift := _I_HmiAxisReq.shiftDistance;
    _I_Axis.CouplingParameters.ShiftVelocityMax := _I_SlaveAxis.MoveParameters.VelocityMax; // Use slave max velocity
    // accel set above
    // cmd independent activation is set false in fctPackMpAxisCouplingParams
    // shift mode will be set by below base on which request is made
    _I_Axis.CouplingParameters.ShiftProfileBaseMaxVelocity := 0.0; // Use master axis max velocity
    _I_Axis.CouplingParameters.ShiftProfileDistance :=  _I_HmiAxisReq.shiftProfileDistance; // master distance over which to perform the shift
    // non-zero jerk not supported for this -- set to zero in fctPackMpAxisCouplingParams
    // no alternate values used. -- set to not used in fctPackMpAxisCouplingParams
  END_IF;
  
  IF _I_HmiAxisReq.moveReq THEN
    // A move request is made ... 
    // The move paramaters will be set based on the HMI request values.
    // Note that the HMI requests specify a direction and a positive distance
    // for a relative move, but the axis SM uses a signed distance value.
    // For a relative move, convert the distance specification into a signed distance.
    IF _I_HmiAxisReq.moveDesignation = GAMOT_MD_RELATIVE AND _I_HmiAxisReq.Direction = mcDIR_POSITIVE THEN
      // Relative move in the positive direction.
      // Ensure distance is positive, and set the direction to undefined (not used)
      _I_Axis.MoveParameters.Distance := ABS(_I_HmiAxisReq.Distance);
      _I_Axis.MoveParameters.Direction := mcDIR_UNDEFINED;
    ELSIF _I_HmiAxisReq.moveDesignation = GAMOT_MD_RELATIVE AND _I_HmiAxisReq.Direction = mcDIR_NEGATIVE THEN
      // Relative move in the negative direction.
      // Ensure distance is negative, and set the direction to undefined (not used)
      _I_Axis.MoveParameters.Distance := -1.0 * ABS(_I_HmiAxisReq.Distance);
      _I_Axis.MoveParameters.Direction := mcDIR_UNDEFINED;
    ELSIF _I_HmiAxisReq.moveDesignation = GAMOT_MD_RELATIVE THEN
      // Relative move, but not positive or negative direction.
      // Don't move ... set distance to zero
      _I_Axis.MoveParameters.Distance := 0.0;
      _I_Axis.MoveParameters.Direction := mcDIR_UNDEFINED;
    ELSE
      // Not a relative move. Use the direction and distance as specified.
      _I_Axis.MoveParameters.Distance := _I_HmiAxisReq.Distance;
      _I_Axis.MoveParameters.Direction := _I_HmiAxisReq.Direction;
    END_IF;
   
    // Now set the move request based on the move designation
    // The move designaiton only holds a single value (duh!), so only 
    // one of the following should evalutate to true
    // If direction is specified in move designaiton, it must match the selected direction
    _I_Axis.Commands.MoveJogReq := (
    ((_I_HmiAxisReq.moveDesignation = GAMOT_MD_JOG_VELOCITY_UP_FWD) AND (_I_HmiAxisReq.Direction = mcDIR_POSITIVE)) OR
    ((_I_HmiAxisReq.moveDesignation = GAMOT_MD_JOG_VELOCITY_DOWN_REV) AND (_I_HmiAxisReq.Direction = mcDIR_NEGATIVE))
    );
    _I_Axis.Commands.MoveJogPositiveReq := (_I_HmiAxisReq.moveDesignation = GAMOT_MD_JOG_LIMIT_UP_FWD) AND (_I_HmiAxisReq.Direction = mcDIR_POSITIVE);
    _I_Axis.Commands.MoveJogNegativeReq := (_I_HmiAxisReq.moveDesignation = GAMOT_MD_JOG_LIMIT_DOWN_REV) AND (_I_HmiAxisReq.Direction = mcDIR_NEGATIVE);
    _I_Axis.Commands.MoveVelocityReq := _I_HmiAxisReq.moveDesignation = GAMOT_MD_VELOCITY;
    _I_Axis.Commands.MoveRelativeReq := _I_HmiAxisReq.moveDesignation = GAMOT_MD_RELATIVE;
    _I_Axis.Commands.MoveAbsoluteReq := _I_HmiAxisReq.moveDesignation = GAMOT_MD_ABSOLUTE;
    // Move request and designation processed ... 
    // Clear the move request and move designation so it is processed again if requested again.
    // The axis SM will handle the maintaining or clearing of the axis.commands.reqs.  Note the Velocity and Jog cmds are maintained until stopped.
    _I_HmiAxisReq.moveReq := FALSE;
    _I_HmiAxisReq.moveDesignation := GAMOT_MD_NO_MOVE_COMMANDED;
  END_IF;
  
  // Handle a coupling or decoupling (gear in or cam in) request.
  // Only allow coupling if the slave allows it
  IF _I_HmiAxisReq.disengageSlaveReq THEN
    // turn off gearing, caming, block the engage reqs, and clear the disengage req
    _I_Axis.CouplingParameters.GearOutReq := TRUE;
    _I_Axis.CouplingParameters.CamOutReq := TRUE;
    _I_HmiAxisReq.gearInReq := FALSE;
    _I_HmiAxisReq.camInReq := FALSE;
    _I_HmiAxisReq.disengageSlaveReq := FALSE;
  ELSIF _I_HmiAxisReq.gearInReq AND _I_SlaveAxis.CouplingParameters.CouplingPermissive THEN
    // turn on gearing and clear the requst
    _I_Axis.CouplingParameters.GearInReq := TRUE;
    _I_HmiAxisReq.gearInReq := FALSE;
    // make sure the cam req is cleared
    _I_Axis.CouplingParameters.CamInReq := FALSE;
  ELSIF _I_HmiAxisReq.camInReq AND _I_SlaveAxis.CouplingParameters.CouplingPermissive THEN
    // turn on caming and clear the requst
    _I_Axis.CouplingParameters.CamInReq := TRUE;
    _I_HmiAxisReq.camInReq := FALSE;
    // make sure the gear in req is cleared
    _I_Axis.CouplingParameters.GearInReq := FALSE;
  ELSIF (_I_HmiAxisReq.gearInReq OR _I_HmiAxisReq.camInReq) AND NOT _I_SlaveAxis.CouplingParameters.CouplingPermissive THEN
    // Request made, but not allowed by slave.
    // Clear the request
    _I_HmiAxisReq.gearInReq := FALSE;
    _I_HmiAxisReq.camInReq := FALSE;
  END_IF;    
  
  // Handle a offset or phase shift request
  // Only one at a time, so both handled by this conditional
  // Contrary to the documentation, the shift cmds EDGE sensitive, NOT level sensitive.
  // Even though the cmd could be pulsed, I am keeping the command while active, however,
  // because there is no "shift in progress bit". The maintianed cmd allows this to be
  // derrived between the command and shift complete.
  // Cancel the reqs and cmds if requested, or if the master isn't moving, or if the slave is not coordinated,
  // or if the shift amount is zero, or the profile (master) distance is zero,
  // or if offset or phasing is done.
  
  (* TODO Figure out what done looks like. The requests are edge triggered, and shifts can't be stopped
  so .endShiftReq and this IF might go away
  IF  _I_HmiAxisReq.endShiftReq OR
      // master not moving or slave not coordinated
      NOT _I_Axis.Status.IsMoveActive OR
      NOT _I_Axis.Status.IsCoordInSync OR
      // Zero shift distances
      _I_HmiAxisReq.shiftDistance = 0.0 OR
      _I_HmiAxisReq.shiftProfileDistance = 0.0 OR
      // Offset done
        (_I_Axis.CouplingParameters.OffsetShiftCmd AND
         _I_Axis.fbMpAxisCoupling.Info.Diag.ExecutingCommand = mcAXIS_CMD_OFFSET_SHIFT AND
         _I_Axis.fbMpAxisCoupling.OffsetDone) OR
      // Phase shift done
        (_I_Axis.CouplingParameters.PhaseShiftCmd AND
         _I_Axis.fbMpAxisCoupling.Info.Diag.ExecutingCommand = mcAXIS_CMD_PHASE_SHIFT AND
         _I_Axis.fbMpAxisCoupling.PhasingDone)
  THEN
    // Turn off shifting, block the shift reqs, and clear the end req
    _I_Axis.CouplingParameters.OffsetShiftCmd := FALSE;
    _I_HmiAxisReq.offsetShiftRelReq := FALSE;
    _I_Axis.CouplingParameters.PhaseShiftCmd := FALSE;
    _I_HmiAxisReq.phaseShiftRelReq := FALSE;
    _I_HmiAxisReq.endShiftReq := FALSE;
  ELSIF _I_HmiAxisReq.offsetShiftRelReq AND NOT _I_Axis.CouplingParameters.OffsetShiftCmd THEN
    // New request
    // The non request specific params in the coupling structure were set above.
    // Here we need to handle request specific stuff
    // We want to offset the slave relative to the master, so set the mode to relative
    _I_Axis.CouplingParameters.ShiftMode := mcSHIFT_RELATIVE_NO_RESET;
    // We want to perform the shift based on the master moving a distance
    _I_Axis.CouplingParameters.ShiftProfileBase := mcPROFBASE_MASTER_DISTANCE;
    // All params should be set. Set the command and clear the request
    _I_Axis.CouplingParameters.OffsetShiftCmd := TRUE;
    _I_HmiAxisReq.offsetShiftRelReq := FALSE;
    // Don't allow a phase shift if an offset shift is requested.
    _I_HmiAxisReq.phaseShiftRelReq := FALSE;
    _I_Axis.CouplingParameters.PhaseShiftCmd := FALSE;
  ELSIF _I_HmiAxisReq.offsetShiftRelReq AND _I_Axis.CouplingParameters.OffsetShiftCmd THEN
    // Must not allow a request while a shift is active.
    // Clear the command and request.
    _I_HmiAxisReq.offsetShiftRelReq := FALSE;
     _I_Axis.CouplingParameters.OffsetShiftCmd := FALSE;
    // Don't allow a phase shift if an offset shift is requested.
    _I_HmiAxisReq.phaseShiftRelReq := FALSE;
    _I_Axis.CouplingParameters.PhaseShiftCmd := FALSE;
  ELSIF _I_HmiAxisReq.phaseShiftRelReq THEN
    // The non request specific params in the coupling structure were set above.
    // Here we need to handle request specific stuff
    // We want to offset the slave relative to the master, so set the mode to relative
    _I_Axis.CouplingParameters.ShiftMode := mcSHIFT_RELATIVE_NO_RESET;
    // We want to perform the shift based on the master moving a distance
    _I_Axis.CouplingParameters.ShiftProfileBase := mcPROFBASE_MASTER_DISTANCE;
    // All params should be set. Set the command and clear the request
    _I_Axis.CouplingParameters.PhaseShiftCmd := TRUE;
    _I_HmiAxisReq.phaseShiftRelReq := FALSE;
    // Don't allow an offset shift if a phase shift is requested.
    _I_HmiAxisReq.offsetShiftRelReq := FALSE;
    _I_Axis.CouplingParameters.OffsetShiftCmd := FALSE;
  END_IF;
  *)
  
  // Handle home requests
  IF _I_HmiAxisReq.homeSetZeroReq THEN
    fbHomeSeq._I_Enable := TRUE;
    fbHomeSeq._I_Position := 0.0;
  ELSIF _I_HmiAxisReq.homeSetOffsetReq THEN
    fbHomeSeq._I_Enable := TRUE;
    fbHomeSeq._I_Position := _I_HmiAxisReq.homePosition;
  ELSIF _I_HmiAxisReq.homeSetPosReq THEN
    fbHomeSeq._I_Enable := TRUE;
    fbHomeSeq._I_Position := _I_Axis.Status.Position;
  END_IF;
  
  // call the home seq fb using the same axis reference as was passed in
  fbHomeSeq(_I_Axis := ADR(_I_Axis));
  
  // Home reqs processed... now clear them
  _I_HmiAxisReq.homeSetZeroReq := FALSE;
  _I_HmiAxisReq.homeSetOffsetReq := FALSE;
  _I_HmiAxisReq.homeSetPosReq := FALSE;
  
  // Clear the home seq fb enable once fb is done, error or not
  IF fbHomeSeq._O_Done THEN
    fbHomeSeq._I_Enable := FALSE;
  END_IF;
  
  // For Error Reset, Drive Reset, Enable, Disable, Brake Release, and Stop Reset, pass these thru and reset the req
  // Home requests are handled separately, so are not cleared here
  _I_Axis.Commands.EnableReq := _I_HmiAxisReq.enableReq;
  _I_Axis.Commands.DisableReq := _I_HmiAxisReq.disableReq;
  _I_Axis.Commands.ReleaseBrakeReq := _I_HmiAxisReq.manBrakeRelReq;
  _I_Axis.Commands.ClearReleaseBrakeReq := _I_HmiAxisReq.clearManBrakeRelReq;
  _I_Axis.Commands.StopResetReq := _I_HmiAxisReq.stopResetReq;
  _I_Axis.Commands.ErrorResetReq := _I_HmiAxisReq.errorResetReq;
  _I_Axis.Commands.DriveResetReq := _I_HmiAxisReq.driveResetReq;
  _I_HmiAxisReq.enableReq := FALSE;
  _I_HmiAxisReq.disableReq := FALSE;
  _I_HmiAxisReq.manBrakeRelReq := FALSE;
  _I_HmiAxisReq.clearManBrakeRelReq := FALSE;
  _I_HmiAxisReq.stopResetReq := FALSE;
  _I_HmiAxisReq.errorResetReq := FALSE;
  _I_HmiAxisReq.driveResetReq := FALSE;
  
END_FUNCTION_BLOCK

// Given an axis structure, set the basic parameter fb Update bit
// if any of the parameters have changed.
// Update the previous values and clear the fb Update bit once the UpdateDone bit is true.
// A change is detected by comparing the .MoveParameters and the .MoveParametersPrev
// member structures for inequality.
// Note that the entire structure is not compared -- only the part that deals with actual
// move parameters getting sent to hte MpAxisBasic fb is used for comparison, while the 
// move permissive parts are not considered.
// Note that an update during a Additive Move will change the target position by 
// re-adding the distance. In this case, force the distance to zero. For this reason, the
// mapp move parameter structure is also passed in as a reference IO var.
FUNCTION_BLOCK fbUpdateBasicParams
  // Use the OS to control the execution
  // Set the OS once a change is made until the update is done, then clear the OS
  IF NOT updateOS THEN
    // Get the addresses and size up front
    // Get size and addresses if not yet set
    // IF size = 0 THEN
    // start of where we want to consider for updates
    pParamsStart := ADR(_I_Axis.MoveParameters.Direction);
    // end is where the next thing in memory would start. Account for the size of the last thing
    pParamsEnd := ADR(_I_Axis.MoveParameters.AutoTuneParams) + SIZEOF(_I_Axis.MoveParameters.AutoTuneParams);
    // size is the difference between start and end
    size:= pParamsEnd - pParamsStart;
    // previous values should start at the same element as the current values
    pParamsPrev := ADR(_I_Axis.MoveParametersPrev.Direction);
    // END_IF;
    
    // See if the member structures are the same. Result will be 0 if they are the same.
    result := brsmemcmp(pParamsPrev,pParamsStart,size);
    IF result <> 0 THEN
      // A parameter change has been made.
      // Set the OS -- we don't need to check or copy memory again until update is done.
      updateOS := TRUE;
      // The fb update bit needs to be set. BUT NOTE: The move additive
      // case is a special case: If a move additive is being executed
      // when an update occurs, the distance is again added to the target
      // position, and the result will be the axis will move past the 
      // original target.  Moving to a different place than the original move
      // is probably not what is the operator expects if all they change is
      // velocity or accel/decel for example.  If the distance has changed, while 
      // a move additive is active, use the difference in position. This also
      // covers the case where the distance does not change -- delta will be zero.
      IF _I_Axis.Status.IsMoveActive AND
         _I_Axis.Status.AxisDiagnostics.ExecutingCommand = mcAXIS_CMD_MOVE_ADDITIVE THEN
        // A move additive move is being executed, a parameter change is made. The distance
        // parameter is used additively, so use the delta between the new valeu and the old one.
        _IO_MpParams.Distance := _I_Axis.MoveParameters.Distance - _I_Axis.MoveParametersPrev.Distance;
      END_IF;  
      _I_Axis.fbMpAxisBasic.Update := TRUE;
    END_IF;
  ELSIF updateOS THEN
    // If the OS is high, an update has at least been requested.  Now look for
    // the update done bit. Update the previous values and clear the update and 
    // OS once the done bit is high. Keep the previous value until the end in case
    // their values are helpful during the update.
    IF _I_Axis.fbMpAxisBasic.UpdateDone THEN
      // Update is done. Update the previous values, and clear the request and OS.
      nxtAddr := brsmemcpy(pParamsPrev,pParamsStart,size);
      _I_Axis.fbMpAxisBasic.Update := FALSE;
      updateOS := FALSE;
    END_IF;
  END_IF;
END_FUNCTION_BLOCK


// Calcualte the encoder offset needed for absolute home mode
FUNCTION fctCalcAbsHomeOffset
  fctCalcAbsHomeOffset := _I_DesiredPos - _I_CurrentPos + _I_SetZeroOffset;
END_FUNCTION

// Check two coupling param structures for equality and return a boolean
FUNCTION fctCheckEqCouplingParams
  // Use the minimum size -- should be the becuase the two inputs are the same type
  // Check for safety just in case the types change in the future
  size := MIN(SIZEOF(_I_ParamsA),SIZEOF(_I_ParamsB));
  // brsmemcmp returns 0 on equal and < or > 0 when not equal.
  result := brsmemcmp(ADR(_I_ParamsA), ADR(_I_ParamsB), size);
  // Return true on equal, false otherwise
  IF result = 0 THEN
    fctCheckEqCouplingParams := TRUE;
  ELSE
    fctCheckEqCouplingParams := FALSE;
  END_IF;
END_FUNCTION


// Check two move param structures for equality and return a boolean
FUNCTION fctCheckEqMoveParams
  // Use the minimum size -- should be the becuase the two inputs are the same type
  // Check for safety just in case the types change in the future
  size := MIN(SIZEOF(_I_ParamsA),SIZEOF(_I_ParamsB));
  // brsmemcmp returns 0 on equal and < or > 0 when not equal.
  result := brsmemcmp(ADR(_I_ParamsA), ADR(_I_ParamsB), size);
  // Return true on equal, false otherwise
  IF result = 0 THEN
    fctCheckEqMoveParams := TRUE;
  ELSE
    fctCheckEqMoveParams := FALSE;
  END_IF;
END_FUNCTION

// Clear command bits in the _IO_sMot_Command parameter if the bit in the eMOT_AXIS_CMD_MASK input mask is clear
FUNCTION fctClearMotionCommands
  // For each command, clear the command if the mask AND comes out clear
  // i.e. Set the bit in the mask to leave the command bit unaltered.
  IF (_I_CmdMask AND MACM_ENABLE_MASK) = 16#0 THEN
    _IO_Commands.EnableCmd := FALSE;
  END_IF;
  
  IF (_I_CmdMask AND MACM_RELEASE_BRAKE_MASK) = 16#0 THEN
    _IO_Commands.ReleaseBrakeCmd := FALSE;
  END_IF;
  
  IF (_I_CmdMask AND MACM_HOME_MASK) = 16#0 THEN
    _IO_Commands.HomeCmd := FALSE;
  END_IF;

  IF (_I_CmdMask AND MACM_JOG_MASK) = 16#0 THEN
    _IO_Commands.MoveJogCmd := FALSE;
  END_IF;

  IF (_I_CmdMask AND MACM_JOG_POSITIVE_MASK) = 16#0 THEN
    _IO_Commands.MoveJogPositiveCmd := FALSE;
  END_IF;

  IF (_I_CmdMask AND MACM_JOG_NEGATIVE_MASK) = 16#0 THEN
    _IO_Commands.MoveJogNegativeCmd := FALSE;
  END_IF;

  IF (_I_CmdMask AND MACM_VELOCITY_MOVE_MASK) = 16#0 THEN
    _IO_Commands.MoveVelocityCmd := FALSE;
  END_IF;

  IF (_I_CmdMask AND MACM_RELATIVE_MOVE_MASK) = 16#0 THEN
    _IO_Commands.MoveRelativeCmd := FALSE;
  END_IF;

  IF (_I_CmdMask AND MACM_ABSOLUTE_MOVE_MASK) = 16#0 THEN
    _IO_Commands.MoveAbsoluteCmd := FALSE;
  END_IF;
  (* Slave commands are now in coupling parameters and handled differently
  IF (_I_CmdMask AND MACM_ENGAGE_SLAVE_MASK) = 16#0 THEN
    _IO_Commands.EngageSlaveCmd := FALSE;
  END_IF;

  IF (_I_CmdMask AND MACM_DISENGAGE_SLAVE_MASK) = 16#0 THEN
    _IO_Commands.DisengageSlaveCmd := FALSE;
  END_IF;
  *)
  IF (_I_CmdMask AND MACM_STOP_MASK) = 16#0 THEN
    _IO_Commands.StopCmd := FALSE;
  END_IF;

  IF (_I_CmdMask AND MACM_HALT_MASK) = 16#0 THEN
    _IO_Commands.HaltCmd := FALSE;
  END_IF;

  IF (_I_CmdMask AND MACM_DRIVE_RESET_MASK) = 16#0 THEN
    _IO_Commands.DriveResetCmd := FALSE;
  END_IF;

  // avoid warning for undefined return
  fctClearMotionCommands := TRUE;
END_FUNCTION

// Clear request bits in the _IO_sMot_Command parameter if the bit in the eMOT_AXIS_CMD_MASK input mask is clear
FUNCTION fctClearMotionRequests
  // For each request, clear the request if the mask AND comes out clear
  // i.e. Set the bit in the mask to leave the request bit unaltered.
  IF (_I_ReqMask AND MACM_ENABLE_MASK) = 16#0 THEN
    _IO_Commands.EnableReq := FALSE;
  END_IF;
  
  IF (_I_ReqMask AND MACM_DISABLE_MASK) = 16#0 THEN
    _IO_Commands.DisableReq := FALSE;
  END_IF;

  IF (_I_ReqMask AND MACM_RELEASE_BRAKE_MASK) = 16#0 THEN
    _IO_Commands.ReleaseBrakeReq := FALSE;
    _IO_Commands.ClearReleaseBrakeReq := FALSE;
  END_IF;
  
  IF (_I_ReqMask AND MACM_HOME_MASK) = 16#0 THEN
    _IO_Commands.HomeReq := FALSE;
  END_IF;

  IF (_I_ReqMask AND MACM_JOG_MASK) = 16#0 THEN
    _IO_Commands.MoveJogReq := FALSE;
  END_IF;

  IF (_I_ReqMask AND MACM_JOG_POSITIVE_MASK) = 16#0 THEN
    _IO_Commands.MoveJogPositiveReq := FALSE;
  END_IF;

  IF (_I_ReqMask AND MACM_JOG_NEGATIVE_MASK) = 16#0 THEN
    _IO_Commands.MoveJogNegativeReq := FALSE;
  END_IF;

  IF (_I_ReqMask AND MACM_VELOCITY_MOVE_MASK) = 16#0 THEN
    _IO_Commands.MoveVelocityReq := FALSE;
  END_IF;

  IF (_I_ReqMask AND MACM_RELATIVE_MOVE_MASK) = 16#0 THEN
    _IO_Commands.MoveRelativeReq := FALSE;
  END_IF;

  IF (_I_ReqMask AND MACM_ABSOLUTE_MOVE_MASK) = 16#0 THEN
    _IO_Commands.MoveAbsoluteReq := FALSE;
  END_IF;
  (* Slave commands are now in coupling parameters and handled differently
  IF (_I_ReqMask AND MACM_ENGAGE_SLAVE_MASK) = 16#0 THEN
    _IO_Commands.EngageSlaveReq := FALSE;
  END_IF;

  IF (_I_ReqMask AND MACM_DISENGAGE_SLAVE_MASK) = 16#0 THEN
    _IO_Commands.DisengageSlaveReq := FALSE;
  END_IF;
  *)
  IF (_I_ReqMask AND MACM_STOP_MASK) = 16#0 THEN
    _IO_Commands.StopReq := FALSE;
  END_IF;

  IF (_I_ReqMask AND MACM_STOP_RESET_MASK) = 16#0 THEN
    _IO_Commands.StopResetReq := FALSE;
  END_IF;

  IF (_I_ReqMask AND MACM_HALT_MASK) = 16#0 THEN
    _IO_Commands.HaltReq := FALSE;
  END_IF;

  IF (_I_ReqMask AND MACM_DRIVE_RESET_MASK) = 16#0 THEN
    _IO_Commands.DriveResetReq := FALSE;
  END_IF;
  
  IF (_I_ReqMask AND MACM_ERROR_RESET_MASK) = 16#0 THEN
    _IO_Commands.ErrorResetReq := FALSE;
  END_IF;

  // avoid warning for undefined return
  fctClearMotionRequests := TRUE;

END_FUNCTION

FUNCTION fctCopyAxisStatus
  // Get the addresses and size -- src and dest are the same data type,
  // so no need to check both and take the minimum
  (*
  pParams := ADR(_I_DestStatus);
  pParamsPrev := ADR(_I_Axis.MoveParametersPrev);
  size:= SIZEOF(_I_DestStatus);
*)
  // memcpy(pDest, PSrc, Size)
  nxtAddr := brsmemcpy(ADR(_I_DestStatus),ADR(_I_SrcStatus),SIZEOF(_I_DestStatus));
  fctCopyAxisStatus := TRUE;
END_FUNCTION

// Pack values stored in a MpAxisBasicInfoType structure into a sMot_AxisStatus structure
FUNCTION fctGetMpAxisInfo
  // This provides some flexability and opportunity for conversion/manipulation when using the sMot_AxisStatus
  _IO_UdtStatus.IsCommuncationReady := _I_MpInfo.CommunicationReady;
  _IO_UdtStatus.IsReadyToPowerOn := _I_MpInfo.ReadyToPowerOn;
  _IO_UdtStatus.IsInSimulation := _I_MpInfo.Simulation;
  _IO_UdtStatus.IsJogging := _I_MpInfo.Jogging;
  _IO_UdtStatus.IsAtJogLimit := _I_MpInfo.JogLimitReached;
  _IO_UdtStatus.IsAtTorqueLimit := _I_MpInfo.LimitLoadActive;
  _IO_UdtStatus.PlcOpenState := _I_MpInfo.PLCopenState;
  _IO_UdtStatus.IsAtHomingSwitch := _I_MpInfo.DigitalInputsStatus.HomingSwitch;
  _IO_UdtStatus.IsAtPositiveLimitSwitch := _I_MpInfo.DigitalInputsStatus.PositiveLimitSwitch;
  _IO_UdtStatus.IsAtNegativeLimitSwitch := _I_MpInfo.DigitalInputsStatus.NegativeLimitSwitch;
  _IO_UdtStatus.IsTrigger1Active := _I_MpInfo.DigitalInputsStatus.Trigger1;
  _IO_UdtStatus.IsTrigger2Active := _I_MpInfo.DigitalInputsStatus.Trigger2;
  _IO_UdtStatus.IsDriveEnableActive := _I_MpInfo.DigitalInputsStatus.DriveEnable;
  _IO_UdtStatus.AxisDiagnostics := _I_MpInfo.Diag;
  _IO_UdtStatus.LibraryInfo := _I_MpInfo.LibraryInfo;
  _IO_UdtStatus.networkCommState := _I_MpInfo.CommunicationState;
  _IO_UdtStatus.IsAutoTuneDone := _I_MpInfo.AutoTuneDone;
  _IO_UdtStatus.AutoTuneQuality := _I_MpInfo.AutoTuneQuality;
  _IO_UdtStatus.StartupCount := _I_MpInfo.StartupCount;
  // avoid warning for undefined return
  fctGetMpAxisInfo := TRUE;
END_FUNCTION

// Pack values stored in a sMot_MoveParameter structure into a MpAxisBasicParType structure 
FUNCTION fctPackMpAxisBasicParams
  // This provides some flexability and opportunity for conversion/manipulation when using the sMot_MoveParameter
  _IO_MpParams.Position := _I_UdtParams.Position;
  _IO_MpParams.Distance := _I_UdtParams.Distance;
  _IO_MpParams.Velocity := _I_UdtParams.Velocity;
  _IO_MpParams.Acceleration := _I_UdtParams.Acceleration;
  _IO_MpParams.Deceleration := _I_UdtParams.Deceleration;
  _IO_MpParams.Direction := _I_UdtParams.Direction;
  _IO_MpParams.Homing := _I_UdtParams.HomeParams;
  _IO_MpParams.Jog := _I_UdtParams.JogParams;
  _IO_MpParams.Stop := _I_UdtParams.StopParams;
  _IO_MpParams.LimitLoad := _I_UdtParams.TorqueLimitParams;
  _IO_MpParams.AutoTune := _I_UdtParams.AutoTuneParams;
  _IO_MpParams.Jerk := _I_UdtParams.MaxJerk;
  // avoid warning for undefined return
  fctPackMpAxisBasicParams := TRUE;
END_FUNCTION


