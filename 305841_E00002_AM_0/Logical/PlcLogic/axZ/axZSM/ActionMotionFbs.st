(********************************************************************
 * COPYRIGHT -- General Atomics
 ********************************************************************
 * Program: AxisStateMachine
 * File: ActionMoveVel.st
 * Author: Administrator
 * Created: January 22, 2014
 ********************************************************************
 * Implementation of program AxisStateMachine
 ********************************************************************) 

ACTION ActionCallMotionFunctions: 
  ActionMpAxisBasic;
  ActionMpAxisCoupling;
END_ACTION

ACTION ActionMpAxisBasic: 
  // 1) Range checks position, velocity, accel & Decel
  // 2) Packs the sMot_MoveParameters into a local axisBasicParamsStructure
  // 3) Detects parameter changes and manages the Update and UpdateDone bits
  // 4) Sets the fb command bits based on the axis sMot_AxisCommands structure
  // 5) Runs the fbMpAxisBasic funciton block
  // 6) Updates the axis structure with the status and axis info coming back from the fb

  // Make sure min/max values are not exceeded for position, velocity, accel, and decel.
  // Clamp if necessary
  
  // Position
  IF ax.MoveParameters.Position >  axPositionLimits.PositionLimitPos THEN
    ax.MoveParameters.Position :=  axPositionLimits.PositionLimitPos;
  END_IF;
  IF ax.MoveParameters.Position <  axPositionLimits.PositionLimitNeg THEN
    ax.MoveParameters.Position :=  axPositionLimits.PositionLimitNeg;
  END_IF;

  // Velocity
  IF ax.MoveParameters.Velocity > ax.MoveParameters.VelocityMax THEN
    ax.MoveParameters.Velocity := ax.MoveParameters.VelocityMax;
  END_IF;
  IF ax.MoveParameters.Velocity < ax.MoveParameters.VelocityMin THEN
    ax.MoveParameters.Velocity := ax.MoveParameters.VelocityMin;
  END_IF;

  // Accel and decel
  IF ax.MoveParameters.Acceleration > ax.MoveParameters.AccelMax THEN
    ax.MoveParameters.Acceleration := ax.MoveParameters.AccelMax;
  END_IF;
  IF ax.MoveParameters.Acceleration < ax.MoveParameters.AccelMin THEN
    ax.MoveParameters.Acceleration := ax.MoveParameters.AccelMin;
  END_IF;

  IF ax.MoveParameters.Deceleration > ax.MoveParameters.DecelMax THEN
    ax.MoveParameters.Deceleration := ax.MoveParameters.DecelMax;
  END_IF;
  IF ax.MoveParameters.Deceleration < ax.MoveParameters.DecelMin THEN
    ax.MoveParameters.Deceleration := ax.MoveParameters.DecelMin;
  END_IF;

  // The execution behavior is determined by the inputs set elsewhere 
  // in particular the sMot_AxisCommands XxxxCmd bits,
  // and the values in sMot_MoveParameters structure

  // Axis reference set in init routine 

  // Only enable the fb if the axis is not set to be ignored
  // TODO: Different check needed? Not sure how to tell if an axis reference is not set
  // It would be nice to check ax.fbMpAxisBasic.MpLink <> 0 for example, but this is a structure not an address
  IF NOT ax.Ignore AND ax.AxisNo <> 0 THEN
    ax.fbMpAxisBasic.Enable := TRUE;
  ELSE
    ax.fbMpAxisBasic.Enable := FALSE;
  END_IF;

  // Load the parameters from the sMot_MoveParameter structure into
  // local structure variables used for the fb
  fctPackMpAxisBasicParams(_I_UdtParams:= ADR(ax.MoveParameters), _IO_MpParams := axisBasicParams);
  
  // To allow move parameter changes to take effect without having to stop, 
  // detect a difference between the desired parameters and the previous values.
  // If they are different, then set the update bit until the UpdateDone bit is set.
  // NOTE: This fb manages the ax.fbMpAxisCoupling.Update request and monitors the .UpdateDone bit
  // Use the .UpdateCouplingParams bit in the command structure if the application needs to control
  // when to trigger the update. If parameters need to be set in possibly different areas of the software,
  // and all the updates should take place at once, the update fb is called conditionally. The
  // checked bit can be set high so it is called all the time if the checked bit is not managed.
  ax.Commands.UpdateMoveParams:= TRUE;
  IF ax.Commands.UpdateMoveParams THEN
    ax.fbUpdateBFbParams(_IO_MpParams := axisBasicParams);
    ax.Commands.UpdateMoveParams := FALSE;
  END_IF;

  // TODO: Enforce move permissives
  
  // Use the commands from the axis structue
  ax.fbMpAxisBasic.ErrorReset := ax.Commands.DriveResetCmd;
  ax.fbMpAxisBasic.Power := ax.Commands.EnableCmd;
  ax.fbMpAxisBasic.Home := ax.Commands.HomeCmd;
  // There is no specific jog cmd. Use Move Velocity instead.
  ax.fbMpAxisBasic.MoveVelocity := ax.Commands.MoveVelocityCmd OR ax.Commands.MoveJogCmd;
  ax.fbMpAxisBasic.MoveAbsolute := ax.Commands.MoveAbsoluteCmd;
  ax.fbMpAxisBasic.MoveAdditive := ax.Commands.MoveRelativeCmd;
  ax.fbMpAxisBasic.Stop := ax.Commands.StopCmd;
  ax.fbMpAxisBasic.JogPositive := ax.Commands.MoveJogPositiveCmd;
  ax.fbMpAxisBasic.JogNegative := ax.Commands.MoveJogNegativeCmd;
  ax.fbMpAxisBasic.LimitLoad := ax.MoveParameters.EnableTorqueLimit;
  ax.fbMpAxisBasic.ReleaseBrake := ax.Commands.ReleaseBrakeCmd;
  ax.fbMpAxisBasic.AutoTune := FALSE; // TODO
  ax.fbMpAxisBasic.Simulate := FALSE; // TODO

  
  // Call the fb
  ax.fbMpAxisBasic();
 
  // Update the axis status structure
  ax.Status.Position := ax.fbMpAxisBasic.Position;
  ax.Status.Velocity := ax.fbMpAxisBasic.Velocity;
  ax.Status.IsPoweredOn := ax.fbMpAxisBasic.PowerOn;
  ax.Status.IsHomed := ax.fbMpAxisBasic.IsHomed;
  ax.Status.IsInVelocity := ax.fbMpAxisBasic.InVelocity;
  ax.Status.IsInPosition := ax.fbMpAxisBasic.InPosition;
  ax.Status.IsMoveActive := ax.fbMpAxisBasic.MoveActive;
  ax.Status.IsMoveDone := ax.fbMpAxisBasic.MoveDone;
  ax.Status.IsStopped := ax.fbMpAxisBasic.Stopped;
  ax.Status.IsTorqueLimitReady := ax.fbMpAxisBasic.LimitLoadReady;
  ax.Status.IsBrakeManuallyReleased := ax.fbMpAxisBasic.BrakeReleased;
  
  // Now load the sMot_AxisStatus structure with the data returned from the fb
  fctGetMpAxisInfo(_I_MpInfo := ADR(ax.fbMpAxisBasic.Info), _IO_UdtStatus := ax.Status);
  
  // Calculate special (algorithmic) positions
  CalcSpecialPositions;
  
  // Now that the status of this axis is known, copy it to the other axes slave status 
  // area if this axis is specified as a slave.
  CopySlaveStatusToMaster;

END_ACTION

ACTION ActionGearInOut:
  // Execute the gear in or gear out fbs based on the GearIn/Out requests
  // The fbs are edge triggered, and the requests are cleared once serviced.
  // If the gearing params change, another request must be made.
  // TODO: Is gear out and another gear in needed if params change?

  // Only execute the gear in fb if the axis number has been set, 
  // the slave axis number has been set, and neither is set to be ignored,
  // and it is requested.
  IF ax.Ignore OR ax.AxisNo = AD_UNKNOWN OR
       ax.CouplingParameters.SlaveAxisNo = AD_UNKNOWN OR
       axes[ax.CouplingParameters.SlaveAxisNo].Ignore THEN
    // slave or master should be ignored
    // keep the requests and executes low
    ax.CouplingParameters.GearInReq := FALSE;
    ax.CouplingParameters.GearOutReq := FALSE;
    ax.fbGearIn.Execute := FALSE;
    ax.fbGearOut.Execute := FALSE;
  ELSIF ax.CouplingParameters.GearInReq THEN
    // GearIn request is made.
    // Clear the req so a future rising edge can be seen
    ax.CouplingParameters.GearInReq := FALSE;
    // Make sure the GearOut req and execute is clear
    ax.CouplingParameters.GearOutReq := FALSE;
    ax.fbGearOut.Execute := FALSE;
    // Load the gear in params, then set the execute input (edge triggered fb)
    ax.fbGearIn.RatioNumerator := ax.CouplingParameters.RatioNumerator;
    ax.fbGearIn.RatioDenominator := ax.CouplingParameters.RatioDenominator;
    ax.fbGearIn.MasterValueSource := ax.CouplingParameters.MasterValueSource;
    ax.fbGearIn.Acceleration := ax.CouplingParameters.ShiftAccelerationMax;
    ax.fbGearIn.Deceleration := ax.CouplingParameters.ShiftDecelerationMax;
    ax.fbGearIn.Jerk := 0.0; // only non-zero if using McProfGen
    ax.fbGearIn.BufferMode := mcABORTING; // onlly mcAborting currently supported
    axisGearInAdvParams.MasterMaxVelocity := 0.0; // use axis max vel
    ax.fbGearIn.AdvancedParameters := axisGearInAdvParams;
    ax.fbGearIn.Execute := TRUE; // fb looks for a rising edge
  ELSIF ax.CouplingParameters.GearOutReq THEN
    // Clear the req so a future rising edge can be seen
    ax.CouplingParameters.GearOutReq := FALSE;
    // Make sure the GearIn req and execute is clear
    ax.CouplingParameters.GearInReq := FALSE;
    ax.fbGearIn.Execute := FALSE;
    // Load the gear out params, then set the execute input (edge triggered fb)
    ax.fbGearOut.Jerk := 0.0; // only non-zero if using McProfGen
    ax.fbGearOut.Execute := TRUE;
  END_IF;
  
  // Call the gear in and gear out fbs.
  ax.fbGearIn();
  ax.fbGearOut();
  // Clear the exuecute bits. The fbs are edge triggerd, and would have been seen by the above call.
  ax.fbGearIn.Execute := FALSE;
  ax.fbGearOut.Execute := FALSE;
    
  // Update the axis status structure
  // Set the In sync based on the fbGearIn status, if the GearIn is active.
  // This distinction is made bacause caming can also cause axes to be in sync.
  IF (ax.fbGearIn.Busy OR ax.fbGearIn.Active) AND NOT ax.fbGearIn.Error THEN
    ax.Status.IsCoordInSync := ax.fbGearIn.InGear;
  END_IF;

END_ACTION

ACTION ActionOffsetShift:
  // Execute the gear in or gear out fbs based on the GearIn/Out requests
  // The fbs are edge triggered, and the requests are cleared once serviced.
  // If the gearing params change, another request must be made.
  // TODO: Is gear out and another gear in needed if params change?

  // Only execute the gear in fb if the axis number has been set, 
  // the slave axis number has been set, and neither is set to be ignored,
  // and it is requested.
  IF ax.Ignore OR ax.AxisNo = AD_UNKNOWN OR
       ax.CouplingParameters.SlaveAxisNo = AD_UNKNOWN OR
       axes[ax.CouplingParameters.SlaveAxisNo].Ignore THEN
    // slave or master should be ignored
    // keep the request and enable low
    ax.CouplingParameters.OffsetShiftReq := FALSE;
    ax.fbOffsetShift.Enable := FALSE;
    ax.fbOffsetShift.StartShift := FALSE;
  ELSE
    ax.fbOffsetShift.Enable := TRUE;
  END_IF;
    
  // Enable input and ignore considered above. If req is high,
  // it can be acted upon.
  IF ax.CouplingParameters.OffsetShiftReq THEN
    // Offset Shift request is made.
    // Clear the req so a future rising edge can be seen
    ax.CouplingParameters.OffsetShiftReq := FALSE;
    // Load the offset shift params, then set the start shift input (edge sensitive input)
    ax.fbOffsetShift.OffsetShift := ax.CouplingParameters.Shift;
    ax.fbOffsetShift.Velocity := ax.CouplingParameters.ShiftVelocityMax;
    ax.fbOffsetShift.Acceleration := ax.CouplingParameters.ShiftAccelerationMax;
    axisOffsetAdvParams.ShiftMode := ax.CouplingParameters.ShiftMode;
    axisOffsetAdvParams.ProfileBase := ax.CouplingParameters.ShiftProfileBase;
    axisOffsetAdvParams.ProfileBaseMaxVelocity := ax.CouplingParameters.ShiftProfileBaseMaxVelocity;
    axisOffsetAdvParams.DistanceParameters := ax.CouplingParameters.ShiftProfileDistance;
    axisOffsetAdvParams.ZoneParameters.StartPosition := ax.CouplingParameters.ShiftZoneStartPosition;
    axisOffsetAdvParams.ZoneParameters.EndPosition := ax.CouplingParameters.ShiftZoneEndPosition;
    axisOffsetAdvParams.ZoneParameters.Period := ax.CouplingParameters.ShiftZonePeriod;
    axisOffsetAdvParams.ShiftAlternativeValueSource := mcALT_VALUE_NOT_USED;
    ax.fbOffsetShift.AdvancedParameters := axisOffsetAdvParams;
    ax.fbOffsetShift.StartShift := TRUE; // fb looks for a rising edge
  END_IF;
  
  // Call the gear in and gear out fbs.
  ax.fbOffsetShift();
  // Clear the start shift bit. The fb is edge triggerd, and it would have been seen by the above call.
  ax.fbOffsetShift.StartShift := FALSE; // fb looks for a rising edge
    
  // Update the axis status structure as long as status is valid and there is no error.
  // Otherwise, clear the values
  IF ax.fbOffsetShift.Valid AND NOT ax.fbOffsetShift.Error THEN
    ax.Status.IsCoordOffsetShiftAttained := ax.fbOffsetShift.ShiftAttained;
    ax.Status.IsCoordOffsetShiftStarted := ax.fbOffsetShift.ShiftStarted;
    ax.Status.CoordActualOffsetShift := ax.fbOffsetShift.ActualOffsetShift;
  ELSE
    ax.Status.IsCoordOffsetShiftAttained := FALSE;
    ax.Status.IsCoordOffsetShiftStarted := FALSE;
    ax.Status.CoordActualOffsetShift := 0.0;
  END_IF;

END_ACTION

ACTION ActionPhaseShift:
  // Execute the gear in or gear out fbs based on the GearIn/Out requests
  // The fbs are edge triggered, and the requests are cleared once serviced.
  // If the gearing params change, another request must be made.
  // TODO: Is gear out and another gear in needed if params change?

  // Only execute the gear in fb if the axis number has been set, 
  // the slave axis number has been set, and neither is set to be ignored,
  // and it is requested.
  IF ax.Ignore OR ax.AxisNo = AD_UNKNOWN OR
       ax.CouplingParameters.SlaveAxisNo = AD_UNKNOWN OR
       axes[ax.CouplingParameters.SlaveAxisNo].Ignore THEN
    // slave or master should be ignored
    // keep the request and enable low
    ax.CouplingParameters.PhaseShiftReq := FALSE;
    ax.fbPhaseShift.Enable := FALSE;
    ax.fbPhaseShift.StartShift := FALSE;
  ELSE
    ax.fbPhaseShift.Enable := TRUE;
  END_IF;
    
  // Enable input and ignore considered above. If req is high,
  // it can be acted upon.
  IF ax.CouplingParameters.PhaseShiftReq THEN
    // Phase Shift request is made.
    // Clear the req so a future rising edge can be seen
    ax.CouplingParameters.PhaseShiftReq := FALSE;
    // Load the phase shift params, then set the start shift input (edge sensitive input)
    ax.fbPhaseShift.PhaseShift := ax.CouplingParameters.Shift;
    ax.fbPhaseShift.Velocity := ax.CouplingParameters.ShiftVelocityMax;
    ax.fbOffsetShift.Acceleration := ax.CouplingParameters.ShiftAccelerationMax;
    axisPhaseAdvParams.ShiftMode := ax.CouplingParameters.ShiftMode;
    axisPhaseAdvParams.ProfileBase := ax.CouplingParameters.ShiftProfileBase;
    axisPhaseAdvParams.ProfileBaseMaxVelocity := ax.CouplingParameters.ShiftProfileBaseMaxVelocity;
    axisPhaseAdvParams.DistanceParameters := ax.CouplingParameters.ShiftProfileDistance;
    axisPhaseAdvParams.ZoneParameters.StartPosition := ax.CouplingParameters.ShiftZoneStartPosition;
    axisPhaseAdvParams.ZoneParameters.EndPosition := ax.CouplingParameters.ShiftZoneEndPosition;
    axisPhaseAdvParams.ZoneParameters.Period := ax.CouplingParameters.ShiftZonePeriod;
    axisPhaseAdvParams.ShiftAlternativeValueSource := mcALT_VALUE_NOT_USED;
    ax.fbPhaseShift.AdvancedParameters := axisPhaseAdvParams;
    ax.fbPhaseShift.StartShift := TRUE; // fb looks for a rising edge
  END_IF;
  
  // Call the gear in and gear out fbs.
  ax.fbPhaseShift();
  // Clear the start shift bit. The fb is edge triggerd, and it would have been seen by the above call.
  ax.fbPhaseShift.StartShift := FALSE; // fb looks for a rising edge
    
  // Update the axis status structure as long as status is valid and there is no error.
  // Otherwise, clear the values
  IF ax.fbPhaseShift.Valid AND NOT ax.fbPhaseShift.Error THEN
    ax.Status.IsCoordPhaseShiftAttained := ax.fbPhaseShift.ShiftAttained;
    ax.Status.IsCoordPhaseShiftStarted := ax.fbPhaseShift.ShiftStarted;
    ax.Status.CoordActualPhaseShift := ax.fbPhaseShift.ActualPhaseShift;
  ELSE
    ax.Status.IsCoordPhaseShiftAttained := FALSE;
    ax.Status.IsCoordPhaseShiftStarted := FALSE;
    ax.Status.CoordActualPhaseShift := 0.0;
  END_IF;

END_ACTION

ACTION CalcSpecialPositions :
  // If there is an algorithm needed for calculating a different position, it can be done here
  // If not, just use the axis position.
  ax.Status.CalculatedPosition1 :=  ax.Status.Position;
  ax.Status.CalculatedPosition2 :=  ax.Status.Position;
  ax.Status.CalculatedPosition3 :=  ax.Status.Position;
END_ACTION

ACTION CopySlaveStatusToMaster :
  // If this axis number is a slave to another axis, then copy this axis
  // status to the master axis structure. This is a convenience
  // so the HMI for example, only needs to look in one structure (the master) and
  // can access the slave status.
  
  // Loop thru the axes. If the axis of index has this axis specified as a slave axis,
  // copy this axis status to the axis of index slave status.
  // Axis 0 is a dummy axis, so it can be skipped.
  FOR axIdx := 1 TO AXIS_COUNT DO 
    IF axes[axIdx].CouplingParameters.SlaveAxisNo = AXIS_NO THEN
      // This axis is a slave to the axis referenced by axIdx.
      // Copy this axis status to the indexed axis slave status
      fctCopyAxisStatus(_I_SrcStatus := ADR(ax.Status), _I_DestStatus := ADR(axes[axIdx].StatusSlave));
    END_IF;
  END_FOR;
END_ACTION

