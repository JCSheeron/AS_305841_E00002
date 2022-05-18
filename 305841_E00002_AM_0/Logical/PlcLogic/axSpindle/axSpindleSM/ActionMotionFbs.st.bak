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
  ActionCamInOut;
  ActionGearInOut;
  ActionOffsetShift;
  ActionPhaseShift;
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

ACTION ActionCamInOut:
  // Execute the cam in or cam out fbs based on the CamIn/Out requests
  // The fbs are edge triggered, and the requests are cleared once serviced.
  // If the caming params change, another request must be made.
  // TODO: Is cam out and another cam in needed if params change?

  // Only execute the cam in fb if the axis number has been set, 
  // the slave axis number has been set, and neither is set to be ignored,
  // and it is requested.
  IF ax.Ignore OR ax.AxisNo = AD_UNKNOWN OR
       ax.CouplingParameters.SlaveAxisNo = AD_UNKNOWN OR
       axes[ax.CouplingParameters.SlaveAxisNo].Ignore THEN
    // slave or master should be ignored
    // keep the requests and executes low
    ax.CouplingParameters.CamInReq := FALSE;
    ax.CouplingParameters.CamOutReq := FALSE;
    ax.fbCamIn.Execute := FALSE;
    ax.fbCamOut.Execute := FALSE;
  ELSIF ax.CouplingParameters.CamInReq THEN
    // CamIn request is made.
    // Clear the req so a future rising edge can be seen
    ax.CouplingParameters.CamInReq := FALSE;
    // Make sure the CamOut req and execute is clear
    ax.CouplingParameters.CamOutReq := FALSE;
    ax.fbCamOut.Execute := FALSE;
    // Load the cam in params, then set the execute input (edge triggered fb)
    ax.fbCamIn.MasterOffset := ax.CouplingParameters.CamMasterOffset;
    ax.fbCamIn.SlaveOffset := ax.CouplingParameters.CamSlaveOffset;
    ax.fbCamIn.MasterScaling := ax.CouplingParameters.CamScalingMaster;
    ax.fbCamIn.SlaveScaling := ax.CouplingParameters.CamScalingSlave;
    ax.fbCamIn.StartMode := ax.CouplingParameters.CamStartMode;
    ax.fbCamIn.MasterValueSource := ax.CouplingParameters.CamMasterValueSource;
    // force cam id 1 for now.
    ax.CouplingParameters.CamId := 1;
    ax.fbCamIn.CamID := ax.CouplingParameters.CamId;
    ax.fbCamIn.BufferMode := ax.CouplingParameters.CamBufferMode; // only mcAborting currently supported
    ax.fbCamIn.AdvancedParameters.Periodic := ax.CouplingParameters.CamIsPeriodic;
    ax.fbCamIn.AdvancedParameters.Velocity := 0.0; // disable, use (slave?) axis max vel
    ax.fbCamIn.AdvancedParameters.Acceleration := 0.0; // disable, use (slave?) axis max accel
    ax.fbCamIn.AdvancedParameters.Deceleration := 0.0; // disable, use (slave?) axis max decel
    ax.fbCamIn.AdvancedParameters.Jerk := 0.0; // only non-zero if using McProfGen
    ax.fbCamIn.Execute := TRUE; // fb looks for a rising edge
  ELSIF ax.CouplingParameters.CamOutReq THEN
    // Clear the req so a future rising edge can be seen
    ax.CouplingParameters.CamOutReq := FALSE;
    // Make sure the GearIn req and execute is clear
    ax.CouplingParameters.CamInReq := FALSE;
    ax.fbCamIn.Execute := FALSE;
    // Load the cam out params, then set the execute input (edge triggered fb)
    ax.fbCamOut.Jerk := 0.0; // only non-zero if using McProfGen
    ax.fbCamOut.Execute := TRUE;
  END_IF;
  
  // Call the cam in and cam out fbs.
  ax.fbCamIn();
  ax.fbCamOut();
  // Clear the exuecute bits. The fbs are edge triggerd, and would have been seen by the above call.
  ax.fbCamIn.Execute := FALSE;
  ax.fbCamOut.Execute := FALSE;
    
  // Update the axis status structure
  IF ax.fbCamIn.Active AND NOT ax.fbCamIn.Error THEN
    ax.Status.IsCamInSync := ax.fbCamIn.InSync;
    ax.Status.IsCamEndOfProfile := ax.fbCamIn.EndOfProfile;
    ax.Status.CamStatus := ax.fbCamIn.Status;
  ELSE
    ax.Status.IsCamInSync := FALSE;
    ax.Status.IsCamEndOfProfile := FALSE;
    ax.Status.CamStatus := mcCAM_STATUS_PREPARING_MOVE; // 0 value, but don't have a good choice for "not active 
  END_IF;

END_ACTION

ACTION ActionGearInOut:
  // Execute the gear in or gear out fbs based on the GearIn/Out requests
  // The fbs are edge triggered, and the requests are cleared once serviced.
  // If the gearing params change, another request must be made.

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
    ax.fbGearIn.RatioNumerator := ax.CouplingParameters.GearInRatioNumerator;
    ax.fbGearIn.RatioDenominator := ax.CouplingParameters.GearInRatioDenominator;
    ax.fbGearIn.MasterValueSource := ax.CouplingParameters.GearInMasterValueSource;
    ax.fbGearIn.Acceleration := ax.CouplingParameters.ShiftAccelerationMax;
    ax.fbGearIn.Deceleration := ax.CouplingParameters.ShiftDecelerationMax;
    ax.fbGearIn.Jerk := ax.CouplingParameters.ShiftJerk; // only non-zero if using McProfGen
    ax.fbGearIn.BufferMode := ax.CouplingParameters.GearInBufferMode; // onlly mcAborting currently supported
    ax.fbGearIn.AdvancedParameters.MasterMaxVelocity := ax.CouplingParameters.ShiftProfileBaseMaxVelocity;
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
      
  // Update the axis status structure.
  // Derrive InCompensation -- Active but not in sync
  IF ax.fbGearIn.Active AND NOT ax.fbGearIn.Error THEN
    // If gear in is active, it is either in sync or in compensation
    ax.Status.IsGearInSync := ax.fbGearIn.InGear;
    ax.Status.IsGearInCompensation := NOT ax.fbGearIn.InGear;
  ELSE
    ax.Status.IsGearInSync := FALSE;
    ax.Status.IsGearInCompensation := FALSE;
  END_IF;

END_ACTION

ACTION ActionOffsetShift:
  // Execute the offset shift fb based on the offset shift request.
  // The fb has a level sensitive enable and an edge triggered StartShift input.
  // NOTE: Either by design or because of a bug, the AdvancedParameters.ProfileBase
  // seems to be evaluated based on Enable going high. Changes made to the ProfileBase,
  // after enable going high but before StartShift input going high are ignored.
  // If the shift params change, another request must be made.
  // A shift cannot be stopped once started without halting or some oher means of stopping
  // the axes outside the scope of the shift fb.

  // Since triggering an offset while another shift is in progress triggers an error,
  // the request, enable, and start shift are only cleared once the shift is finished,
  // or the fb is invalid or in error

  // Only execute the offset shift fb if the axis number has been set, 
  // the slave axis number has been set, and neither is set to be ignored
  IF ax.Ignore OR ax.AxisNo = AD_UNKNOWN OR
    ax.CouplingParameters.SlaveAxisNo = AD_UNKNOWN OR
    axes[ax.CouplingParameters.SlaveAxisNo].Ignore THEN
    // slave or master should be ignored, or slave is not set, or 
    // master is not powered.  Keep the request, enable, and startshift low
    ax.CouplingParameters.OffsetShiftReq := FALSE;
    ax.fbOffsetShift.Enable := FALSE;
    ax.fbOffsetShift.StartShift := FALSE;
  ELSIF ax.CouplingParameters.OffsetShiftReq AND NOT ax.fbOffsetShift.Enable THEN 
    // Offset Shift request is made.
    // Set the fb params so a start shift can act on them. Set them
    // before bringing enable high because the profile base param(s) seem to 
    // need to be set before the StartShift input is raised.
    ax.fbOffsetShift.OffsetShift := ax.CouplingParameters.Shift;
    ax.fbOffsetShift.Velocity := ax.CouplingParameters.ShiftVelocityMax;
    ax.fbOffsetShift.Acceleration := ax.CouplingParameters.ShiftAccelerationMax;
    ax.fbOffsetShift.AdvancedParameters.ShiftMode := ax.CouplingParameters.ShiftMode;
    ax.fbOffsetShift.AdvancedParameters.ProfileBase := ax.CouplingParameters.ShiftProfileBase;
    ax.fbOffsetShift.AdvancedParameters.ProfileBaseMaxVelocity := ax.CouplingParameters.ShiftProfileBaseMaxVelocity;
    ax.fbOffsetShift.AdvancedParameters.DistanceParameters.ProfileDistance := ax.CouplingParameters.ShiftProfileDistance;
    ax.fbOffsetShift.AdvancedParameters.ZoneParameters.StartPosition := ax.CouplingParameters.ShiftZoneStartPosition;
    ax.fbOffsetShift.AdvancedParameters.ZoneParameters.EndPosition := ax.CouplingParameters.ShiftZoneEndPosition;
    ax.fbOffsetShift.AdvancedParameters.ZoneParameters.Period := ax.CouplingParameters.ShiftZonePeriod;
    ax.fbOffsetShift.AdvancedParameters.ShiftAlternativeValueSource := mcALT_VALUE_NOT_USED;
    // Enable the fb so we can look for a valid before starting the shift.
    ax.fbOffsetShift.Enable := TRUE;
  ELSIF ax.CouplingParameters.OffsetShiftReq AND ax.fbOffsetShift.Enable AND
    NOT ax.fbOffsetShift.StartShift AND ax.fbOffsetShift.Valid AND NOT ax.fbOffsetShift.Error THEN
    // fb is enabled and valid and not in error, but not started yet.
    // Start the shift on the edge triggered StartShift input.
    ax.fbOffsetShift.StartShift := TRUE;
  ELSIF ax.CouplingParameters.OffsetShiftReq AND ax.fbOffsetShift.Enable AND ax.fbOffsetShift.Error THEN 
    // fb is enabled but in error. Clear the request, enable, and make sure the start shift stays low
    ax.CouplingParameters.OffsetShiftReq := FALSE;
    ax.fbOffsetShift.Enable := FALSE;
    ax.fbOffsetShift.StartShift := FALSE;
  ELSIF ax.CouplingParameters.OffsetShiftReq AND ax.fbOffsetShift.Valid AND ax.fbOffsetShift.StartShift AND
    NOT ax.fbOffsetShift.ShiftAttained THEN
    // Shift was triggered, but isn't done yet.
    // Update the axis status structure
    ax.Status.IsCoordOffsetShiftAttained := FALSE;
    ax.Status.IsCoordOffsetShiftStarted := ax.fbOffsetShift.ShiftStarted;
    ax.Status.CoordActualOffsetShift := ax.fbOffsetShift.ActualOffsetShift;
  ELSIF ax.CouplingParameters.OffsetShiftReq AND ax.fbOffsetShift.Valid AND ax.fbOffsetShift.StartShift AND
    ax.fbOffsetShift.ShiftAttained THEN
    // Shift was triggered, and is now done.
    // Update the axis status structure
    ax.Status.IsCoordOffsetShiftAttained := ax.fbOffsetShift.ShiftAttained;
    ax.Status.IsCoordOffsetShiftStarted := FALSE;
    ax.Status.CoordActualOffsetShift := ax.fbOffsetShift.ActualOffsetShift;
    // Clear the request, enable, and start shift.
    // Clearing the original request at the end prevents another request from triggering a shift while
    // a shift is in progress, but also allows another request to be triggered once done.
    ax.CouplingParameters.OffsetShiftReq := FALSE;
    ax.fbOffsetShift.Enable := FALSE;
    ax.fbOffsetShift.StartShift := FALSE;
  END_IF;
  
  // Call the offset shift fb.
  ax.fbOffsetShift();

END_ACTION

ACTION ActionPhaseShift:
  // Execute the phase shift fb based on the phase shift request.
  // The fb has a level sensitive enable and an edge triggered StartShift input.
  // NOTE: Either by design or because of a bug, the AdvancedParameters.ProfileBase
  // seems to be evaluated based on Enable going high. Changes made to the ProfileBase,
  // after enable going high but before StartShift input going high are ignored.
  // If the shift params change, another request must be made.
  // A shift cannot be stopped once started without halting or some oher means of stopping
  // the axes outside the scope of the shift fb.

  // Since triggering phase shift while another shift is in progress triggers an error,
  // the request, enable, and start shift are only cleared once the shift is finished,
  // or the fb is invalid or in error

  // Only execute the phase shift fb if the axis number has been set, 
  // the slave axis number has been set, and neither is set to be ignored
  IF ax.Ignore OR ax.AxisNo = AD_UNKNOWN OR
    ax.CouplingParameters.SlaveAxisNo = AD_UNKNOWN OR
    axes[ax.CouplingParameters.SlaveAxisNo].Ignore THEN
    // slave or master should be ignored, or slave is not set, or 
    // master is not powered.  Keep the request, enable, and startshift low
    ax.CouplingParameters.PhaseShiftReq := FALSE;
    ax.fbPhaseShift.Enable := FALSE;
    ax.fbPhaseShift.StartShift := FALSE;
  ELSIF ax.CouplingParameters.PhaseShiftReq AND NOT ax.fbPhaseShift.Enable THEN 
    // Phase Shift request is made.
    // Set the fb params so a start shift can act on them. Set them
    // before bringing enable high because the profile base param(s) seem to 
    // need to be set before the StartShift input is raised.
    ax.fbPhaseShift.PhaseShift := ax.CouplingParameters.Shift;
    ax.fbPhaseShift.Velocity := ax.CouplingParameters.ShiftVelocityMax;
    ax.fbPhaseShift.Acceleration := ax.CouplingParameters.ShiftAccelerationMax;
    ax.fbPhaseShift.AdvancedParameters.ShiftMode := ax.CouplingParameters.ShiftMode;
    ax.fbPhaseShift.AdvancedParameters.ProfileBase := ax.CouplingParameters.ShiftProfileBase;
    ax.fbPhaseShift.AdvancedParameters.ProfileBaseMaxVelocity := ax.CouplingParameters.ShiftProfileBaseMaxVelocity;
    ax.fbPhaseShift.AdvancedParameters.DistanceParameters.ProfileDistance := ax.CouplingParameters.ShiftProfileDistance;
    ax.fbPhaseShift.AdvancedParameters.ZoneParameters.StartPosition := ax.CouplingParameters.ShiftZoneStartPosition;
    ax.fbPhaseShift.AdvancedParameters.ZoneParameters.EndPosition := ax.CouplingParameters.ShiftZoneEndPosition;
    ax.fbPhaseShift.AdvancedParameters.ZoneParameters.Period := ax.CouplingParameters.ShiftZonePeriod;
    ax.fbPhaseShift.AdvancedParameters.ShiftAlternativeValueSource := mcALT_VALUE_NOT_USED;
    // Enable the fb so we can look for a valid before starting the shift.
    ax.fbPhaseShift.Enable := TRUE;
  ELSIF ax.CouplingParameters.PhaseShiftReq AND ax.fbPhaseShift.Enable AND
    NOT ax.fbPhaseShift.StartShift AND ax.fbPhaseShift.Valid AND NOT ax.fbPhaseShift.Error THEN
    // fb is enabled and valid and not in error, but not started yet.
    // Start the shift on the edge triggered StartShift input.
    ax.fbPhaseShift.StartShift := TRUE;
  ELSIF ax.CouplingParameters.PhaseShiftReq AND ax.fbPhaseShift.Enable AND ax.fbPhaseShift.Error THEN 
    // fb is enabled but in error. Clear the request, enable, and make sure the start shift stays low
    ax.CouplingParameters.PhaseShiftReq := FALSE;
    ax.fbPhaseShift.Enable := FALSE;
    ax.fbPhaseShift.StartShift := FALSE;
  ELSIF ax.CouplingParameters.PhaseShiftReq AND ax.fbPhaseShift.Valid AND ax.fbPhaseShift.StartShift AND
    NOT ax.fbPhaseShift.ShiftAttained THEN
    // Shift was triggered, but isn't done yet.
    // Update the axis status structure
    ax.Status.IsCoordPhaseShiftAttained := FALSE;
    ax.Status.IsCoordPhaseShiftStarted := ax.fbPhaseShift.ShiftStarted;
    ax.Status.CoordActualPhaseShift := ax.fbPhaseShift.ActualPhaseShift;
  ELSIF ax.CouplingParameters.PhaseShiftReq AND ax.fbPhaseShift.Valid AND ax.fbPhaseShift.StartShift AND
    ax.fbPhaseShift.ShiftAttained THEN
    // Shift was triggered, and is now done.
    // Update the axis status structure
    ax.Status.IsCoordPhaseShiftAttained := ax.fbPhaseShift.ShiftAttained;
    ax.Status.IsCoordPhaseShiftStarted := FALSE;
    ax.Status.CoordActualPhaseShift := ax.fbPhaseShift.ActualPhaseShift;
    // Clear the request, enable, and start shift.
    // Clearing the original request at the end prevents another request from triggering a shift while
    // a shift is in progress, but also allows another request to be triggered once done.
    ax.CouplingParameters.PhaseShiftReq := FALSE;
    ax.fbPhaseShift.Enable := FALSE;
    ax.fbPhaseShift.StartShift := FALSE;
  END_IF;
  
  // Call the phase shift fb.
  ax.fbPhaseShift();

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

