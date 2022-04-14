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
  
  // Update the fb status structure
  ax.statusFpMpAxisBasic.Active := ax.fbMpAxisBasic.Active;
  ax.statusFpMpAxisBasic.Error := ax.fbMpAxisBasic.Error;
  ax.statusFpMpAxisBasic.StatusId := ax.fbMpAxisBasic.StatusID;
  ax.statusFpMpAxisBasic.UpdateDone := ax.fbMpAxisBasic.UpdateDone;
  ax.statusFpMpAxisBasic.CommandBusy := ax.fbMpAxisBasic.CommandBusy;
  ax.statusFpMpAxisBasic.CommandAborted := ax.fbMpAxisBasic.CommandAborted;
  
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
  // further unpack diag info into fb status structure for easier access
  ax.statusFpMpAxisBasic.StatusId := ax.Status.AxisDiagnostics.StatusID.ID;
  ax.statusFpMpAxisBasic.StatusSeverity := ax.Status.AxisDiagnostics.StatusID.Severity;
  ax.statusFpMpAxisBasic.StatusCode := ax.Status.AxisDiagnostics.StatusID.Code;
  ax.statusFpMpAxisBasic.InternalId := ax.Status.AxisDiagnostics.Internal.ID;
  ax.statusFpMpAxisBasic.InternalSeverity := ax.Status.AxisDiagnostics.Internal.Severity;
  ax.statusFpMpAxisBasic.InternalFacility := ax.Status.AxisDiagnostics.Internal.Facility;
  ax.statusFpMpAxisBasic.InternalCode := ax.Status.AxisDiagnostics.Internal.Code;
  ax.statusFpMpAxisBasic.ExecutingCommand := ax.Status.AxisDiagnostics.ExecutingCommand;
  
  // Calculate special (algorithmic) positions
  CalcSpecialPositions;
  
  // Now that the status of this axis is known, copy it to the other axes slave status 
  // area if this axis is specified as a slave.
  CopySlaveStatusToMaster;

END_ACTION

ACTION ActionMpAxisCoupling:
  // 1) Packs the sMot_CouplingParameters into a local axisCouplingParamsStructure
  // 2) Detects parameter changes and manages the Update and UpdateDone bits
  // 3) Sets the fb command bits based on the axis sMot_AxisCommands structure
  // 4) Runs the fbMpAxisCoupling funciton block
  // 5) Updates the axis structure with the status and axis info coming back from the fb

  // The execution behavior is determined by the inputs set elsewhere 
  // in particular the sMot_AxisCommands Engage/Disengage Slave bits, 
  // and the values in sMot_CouplingParameters struture.

  // Axis references set in init routine 

  // Only enable the coupling fb if the axis number has been set, 
  // the slave axis number has been set, and neither is set to be ignored.
  IF NOT ax.Ignore AND ax.AxisNo <> AD_UNKNOWN AND
     ax.CouplingParameters.SlaveAxisNo <> AD_UNKNOWN AND
     NOT axes[ax.CouplingParameters.SlaveAxisNo].Ignore THEN
    ax.fbMpAxisCoupling.Enable := TRUE;
  ELSE
    ax.fbMpAxisCoupling.Enable := FALSE;
  END_IF;
  
  // If the slave axis has changed, update the fb link to the slave axis
  // Handle this change before the call to fbUpdateCFbParams because
  // a slave number change would be detected but not handled by fbUpdateCFbParams.
  IF ax.CouplingParameters.SlaveAxisNo <> ax.CouplingParametersPrev.SlaveAxisNo THEN
    // Set the axis object based on the slave number
    IF ax.CouplingParameters.SlaveAxisNo <> AD_UNKNOWN THEN
      ax.SlaveAxisObj := axes[ax.CouplingParameters.SlaveAxisNo].AxisObj;
    ELSE
      ax.SlaveAxisObj := axDummySlave;
    END_IF;  
    ax.fbMpAxisCoupling.MpLink := ADR(ax.SlaveAxisObj);
    // Update the previous value now that the change is handled
    ax.CouplingParametersPrev.SlaveAxisNo := ax.CouplingParameters.SlaveAxisNo;
  END_IF;
  
  // Load the parameters from the sMot_CouplingParameters structure into
  // local structure variables used for the call to fbMpAxisCoupling
  fctPackMpAxisCouplingParams(_I_UdtParams:= ADR(ax.CouplingParameters), _IO_MpParams := axisCouplingParams);
  
  // To allow coupling parameter changes to take effect without having to stop, 
  // detect a difference between the desired parameters and the previous values.
  // If they are different, then set the update bit until the UpdateDone bit is set.
  // NOTE: This fb manages the ax.fbMpAxisCoupling.Update request and monitors the .UpdateDone bit
  // Use the .UpdateCouplingParams bit in the command structure if the application needs to control
  // when to trigger the update. If parameters need to be set in possibly different areas of the software,
  // and all the updates should take place at once, the update fb is called conditionally. The
  // checked bit can be set high so it is called all the time if the checked bit is not managed.
  ax.Commands.UpdateCouplingParams:= TRUE;
  IF ax.CouplingParameters.SlaveAxisNo <> AD_UNKNOWN AND ax.Commands.UpdateCouplingParams THEN
    ax.fbUpdateCFbParams();
    ax.Commands.UpdateCouplingParams := FALSE;
  END_IF;
  
  // Use the commands from the axis structue
  ax.fbMpAxisCoupling.ErrorReset := ax.Commands.DriveResetCmd;

  // Gear in if there is a slave, it is requested and it is allowed by the slave
  ax.fbMpAxisCoupling.Gear := ax.CouplingParameters.SlaveAxisNo <> AD_UNKNOWN AND ax.CouplingParameters.GearInCmd AND axes[ax.CouplingParameters.SlaveAxisNo].CouplingParameters.CouplingPermissive;
  ax.fbMpAxisCoupling.Cam := FALSE; // Not using camming
  // Gear in position if there is a slave, it is requested and it is allowed by the slave
  ax.fbMpAxisCoupling.GearInPos := ax.CouplingParameters.SlaveAxisNo <> AD_UNKNOWN AND ax.CouplingParameters.GearInPosCmd AND axes[ax.CouplingParameters.SlaveAxisNo].CouplingParameters.CouplingPermissive;
  // Generate an offset or phase shift if there is a slave, it is requested and it is allowed by the slave
  ax.fbMpAxisCoupling.OffsetShift := ax.CouplingParameters.SlaveAxisNo <> AD_UNKNOWN AND ax.CouplingParameters.OffsetShiftCmd AND axes[ax.CouplingParameters.SlaveAxisNo].CouplingParameters.CouplingPermissive;
  ax.fbMpAxisCoupling.PhaseShift := ax.CouplingParameters.SlaveAxisNo <> AD_UNKNOWN AND ax.CouplingParameters.PhaseShiftCmd AND axes[ax.CouplingParameters.SlaveAxisNo].CouplingParameters.CouplingPermissive;
  ax.fbMpAxisCoupling.GetCamPosition := FALSE; // not using camming
  ax.fbMpAxisCoupling.CamPrepare := FALSE; // not using camming
  ax.fbMpAxisCoupling.Recovery := FALSE; // not using camming
  
  // Call the fb
  ax.fbMpAxisCoupling();

  // Update the fb status structure
  ax.statusFpMpAxisCoupling.Active := ax.fbMpAxisCoupling.Active;
  ax.statusFpMpAxisCoupling.Error := ax.fbMpAxisCoupling.Error;
  ax.statusFpMpAxisCoupling.StatusId := ax.fbMpAxisCoupling.StatusID;
  ax.statusFpMpAxisCoupling.UpdateDone := ax.fbMpAxisCoupling.UpdateDone;
  ax.statusFpMpAxisCoupling.CommandBusy := ax.fbMpAxisCoupling.CommandBusy;
  ax.statusFpMpAxisCoupling.CommandAborted := ax.fbMpAxisCoupling.CommandAborted;
  
  // Update the axis status structure
  ax.Status.IsCoordInCompensation := ax.fbMpAxisCoupling.InCompensation;
  ax.Status.IsCoordInSync := ax.fbMpAxisCoupling.InSync;
  ax.Status.IsCoordOffsetDone := ax.fbMpAxisCoupling.OffsetDone;
  ax.Status.IsCoordPhasingDone := ax.fbMpAxisCoupling.PhasingDone;
  ax.Status.IsCoordRecoveryDone := ax.fbMpAxisCoupling.RecoveryDone;

  // Now load the sMot_AxisStatus structure with the data returned from the fb
  fctGetMpCouplingInfo(_I_MpInfo := ADR(ax.fbMpAxisCoupling.Info), _IO_UdtStatus := ax.Status);
  // add to the isCoordSlaveReady status the slave coupling permissive
  ax.Status.IsCoordSlaveReady := ax.Status.IsCoordSlaveReady AND axes[ax.CouplingParameters.SlaveAxisNo].CouplingParameters.CouplingPermissive;
  // further unpack diag info into fb status structure for easier access
  ax.statusFpMpAxisCoupling.StatusId := ax.Status.CoordAxisDiagnostics.StatusID.ID;
  ax.statusFpMpAxisCoupling.StatusSeverity := ax.Status.CoordAxisDiagnostics.StatusID.Severity;
  ax.statusFpMpAxisCoupling.StatusCode := ax.Status.CoordAxisDiagnostics.StatusID.Code;
  ax.statusFpMpAxisCoupling.InternalId := ax.Status.CoordAxisDiagnostics.Internal.ID;
  ax.statusFpMpAxisCoupling.InternalSeverity := ax.Status.CoordAxisDiagnostics.Internal.Severity;
  ax.statusFpMpAxisCoupling.InternalFacility := ax.Status.CoordAxisDiagnostics.Internal.Facility;
  ax.statusFpMpAxisCoupling.InternalCode := ax.Status.CoordAxisDiagnostics.Internal.Code;
  ax.statusFpMpAxisCoupling.ExecutingCommand := ax.Status.CoordAxisDiagnostics.ExecutingCommand;

END_ACTION

ACTION CalcSpecialPositions :
  // If there is an algorithm needed for calculating a different position, it can be done here
  // If not, just use the axis position.
  
  // CalculatedPosition1
  // Calculate the inner position relative to the outer position, in degrees. 
  // This assumes the zero/home position of both the Outer and Inner axes was set to zero when
  // the index lines are lined up with each other.
  // Calculated Position = Inner Pos - Outer Pos. 
  // Make the result be +/- 180 degrees:
  // If I-O > 180 :  Calc Pos = Result - 360
  // If I-O < -180 : Calc Pos = Result + 360
  // The fctAziDiff function in GAMath library does this (pos A - pos B)
  
  IF NOT axes[AD_INNER_ECCENTRIC].Status.IsHomed OR NOT axes[AD_OUTER_ECCENTRIC].Status.IsHomed THEN
    // Inner and/or outer axis is not homed.
    // Use the sentinel value for the calculated positions. 
    ax.Status.CalculatedPosition1 := INVALID_SENTINEL_REAL;
  ELSE
    // Both the inner and outer axes are referenced.
    // Calc the difference between them. I - O
    ax.Status.CalculatedPosition1 := fctAziDiff(
    _I_PosA :=  ax.Status.Position,
    _I_PosB := axes[AD_OUTER_ECCENTRIC].Status.Position);
  END_IF;
  
  ax.Status.CalculatedPosition2 := ax.Status.Position;
  ax.Status.CalculatedPosition3 := ax.Status.Position;
  
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

