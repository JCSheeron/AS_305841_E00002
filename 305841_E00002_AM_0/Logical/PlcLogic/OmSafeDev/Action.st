ACTION ClearMotionReqs :
  // Clear Process Reqs, and then the machine specific axis Reqs
  // Process Reqs
  // Bool reqs
  pSrc := ADR(hmiProcessReqs.zReqMoveUpLimit);
  pDest := ADR(hmiProcessReqs.cuttingHeadMoveReqRetract);
  byteCount := pDest - pSrc + SIZEOF(BOOL);
  nxtAddr := brsmemset(pSrc, 0, byteCount);
  // Numerical reqs
  hmiProcessReqs.cuttingHeadReqDepth := 0.0;
  
  // Now clear the machine specific axis reqs
  FOR axisNo := 0 TO AXIS_COUNT DO
    // Bool reqs
    // (none)
    // numerical requests
    // (none)
    // move type and direction
    hmiMachineAxisReqs[axisNo].moveDesignation := -1; (* clear HMI selection *)
    hmiMachineAxisReqs[axisNo].direction := -1; (* clear HMI selection *)
    
    // Now clear the library requests
    // Bool reqs
    pSrc := ADR(hmiLibraryAxisReqs[axisNo].moveReq);
    pDest := ADR(hmiLibraryAxisReqs[axisNo].disengageSlaveReq);
    byteCount := pDest - pSrc + SIZEOF(BOOL);
    nxtAddr := brsmemset(pSrc, 0, byteCount);
    // numerical requests
    hmiLibraryAxisReqs[axisNo].Position := 0.0;
    hmiLibraryAxisReqs[axisNo].Distance := 0.0;
    hmiLibraryAxisReqs[axisNo].Velocity := 0.0;
    // move type and direction
    hmiLibraryAxisReqs[axisNo].moveDesignation := GAMOT_MD_NO_MOVE_COMMANDED;
    hmiLibraryAxisReqs[axisNo].Direction := mcDIR_UNDEFINED;
  END_FOR;

END_ACTION

ACTION ClearNonMotionReqs :
  // Clear the non-motion reqs
  FOR axisNo := 0 TO AXIS_COUNT DO
    // Clear requests to set limits and requests to reset
    // Bool reqs
    pSrc := ADR(hmiLibraryAxisReqs[axisNo].setPositionLimitsReq);
    pDest := ADR(hmiLibraryAxisReqs[axisNo].driveResetReq);
    byteCount := pDest - pSrc + SIZEOF(BOOL);
    nxtAddr := brsmemset(pSrc, 0, byteCount);
    // numerical requests
    // (none)
  END_FOR;

END_ACTION

ACTION ClearCycleReqs : 
  // TODO: Does Cycle start/stop have a meaning in manual mode?
  // For now block them
  operatingMode.ReqCycleStart := FALSE;
  operatingMode.ReqCycleStop := FALSE;
  operatingMode.HmiReqCycleStart := FALSE;
  operatingMode.HmiReqCycleStop:= FALSE;
  operatingMode.ReqEmoReset := FALSE;
  operatingMode.ReqAxisReset := FALSE;
END_ACTION

ACTION ManualModeAxisPermits : 
  // In Manual Mode
  // cycle is not okay to run
  cyclePermissives.isOmOk := FALSE;
  
  // TODO: Proper permissions. For now, wide open
  axes[AD_SPINDLE].MoveParameters.PosMovePermissive := TRUE;
  axes[AD_SPINDLE].MoveParameters.NegMovePermissive := TRUE;

  axes[AD_OUTER_ECCENTRIC].MoveParameters.PosMovePermissive := TRUE;
  axes[AD_OUTER_ECCENTRIC].MoveParameters.NegMovePermissive := TRUE;

  axes[AD_INNER_ECCENTRIC].MoveParameters.PosMovePermissive := TRUE;
  axes[AD_INNER_ECCENTRIC].MoveParameters.NegMovePermissive := TRUE;

  axes[AD_Z].MoveParameters.PosMovePermissive := TRUE;
  axes[AD_Z].MoveParameters.NegMovePermissive := TRUE;
  
  // Handwheel is virtual -- don't allow moves
  axes[AD_HANDWHEEL].MoveParameters.PosMovePermissive := FALSE;
  axes[AD_HANDWHEEL].MoveParameters.NegMovePermissive := FALSE;

  // cutting fluid pump
  axes[AD_CF_VFD].MoveParameters.PosMovePermissive := cfVfd.isAllowedToRun;
// Allow forward running only
  axes[AD_CF_VFD].MoveParameters.NegMovePermissive := FALSE;

END_ACTION

ACTION PendantModeAxisPermits : 
    // In Pendant Mode
    // cycle is not okay to run
  cyclePermissives.isOmOk := FALSE;
  
  // TODO: Proper permissions. For now, wide open
  axes[AD_SPINDLE].MoveParameters.PosMovePermissive := TRUE;
  axes[AD_SPINDLE].MoveParameters.NegMovePermissive := TRUE;

  axes[AD_OUTER_ECCENTRIC].MoveParameters.PosMovePermissive := TRUE;
  axes[AD_OUTER_ECCENTRIC].MoveParameters.NegMovePermissive := TRUE;

  axes[AD_INNER_ECCENTRIC].MoveParameters.PosMovePermissive := TRUE;
  axes[AD_INNER_ECCENTRIC].MoveParameters.NegMovePermissive := TRUE;

  axes[AD_Z].MoveParameters.PosMovePermissive := TRUE;
  axes[AD_Z].MoveParameters.NegMovePermissive := TRUE;
  
  // Handwheel is virtual -- don't allow moves
  axes[AD_HANDWHEEL].MoveParameters.PosMovePermissive := FALSE;
  axes[AD_HANDWHEEL].MoveParameters.NegMovePermissive := FALSE;

  // cutting fluid pump
  axes[AD_CF_VFD].MoveParameters.PosMovePermissive := cfVfd.isAllowedToRun;
// Allow forward running only
  axes[AD_CF_VFD].MoveParameters.NegMovePermissive := FALSE;

END_ACTION

ACTION ProductionModeAxisPermits : 
  // In Production Mode
  // cycle is okay to run
  cyclePermissives.isOmOk := TRUE;
    
  // Spindle
  // TODO: mask requests or commands?
  // fctClearMotionRequests(_I_ReqMask := MACM_NOMASK, _IO_Commands := axes[AD_SPINDLE].Commands);
  // Spindle is allowed to move forward as long as the cutting fluid is running
  // Spindle cannot run backward
  axes[AD_SPINDLE].MoveParameters.PosMovePermissive := cfVfd.isRunning AND cfVfd.isFlowEstablished;
  axes[AD_SPINDLE].MoveParameters.NegMovePermissive := FALSE;

  // Outer Eccentric
  // TODO: mask requests or commands?
  // fctClearMotionRequests(_I_ReqMask := MACM_NOMASK, _IO_Commands := axes[AD_OUTER_ECCENTRIC].Commands);
  // TODO: require spindle to be moving?
  axes[AD_OUTER_ECCENTRIC].MoveParameters.PosMovePermissive := TRUE;
  axes[AD_OUTER_ECCENTRIC].MoveParameters.NegMovePermissive := TRUE;
  // TODO: mask requests or commands?

  // Inner Eccentric
  // TODO: mask requests or commands?
  // fctClearMotionRequests(_I_ReqMask := MACM_NOMASK, _IO_Commands := axes[AD_INNER_ECCENTRIC].Commands);
  axes[AD_INNER_ECCENTRIC].MoveParameters.PosMovePermissive := TRUE;
  axes[AD_INNER_ECCENTRIC].MoveParameters.NegMovePermissive := TRUE;
  // TODO: mask requests or commands?

  // Z
  // Axis needs to homed and enabled, but also,
  // moving Z Axis requires the cutting head to be retracted.
  // Therefore the inner and outer both need to be homed, so the position is known,
  // and the difference in posiiton (axis.Status.CalculatedPosition1) needs to be within
  // tolerance.
  axes[AD_Z].MoveParameters.PosMovePermissive := 
    axes[AD_Z].Status.IsHomed AND axes[AD_Z].Status.IsPoweredOn AND
    axes[AD_INNER_ECCENTRIC].Status.IsHomed AND axes[AD_OUTER_ECCENTRIC].Status.IsHomed AND
    ABS(axes[AD_INNER_ECCENTRIC].Status.CalculatedPosition1) < TOL_DEPTH_ZERO_DEG AND
    // position must be less than limit
    axes[AD_Z].Status.Position <= gr_AxisPositionLimits[AD_Z].PositionLimitPos;
    
  axes[AD_Z].MoveParameters.NegMovePermissive := 
    axes[AD_Z].Status.IsHomed AND axes[AD_Z].Status.IsPoweredOn AND
    axes[AD_INNER_ECCENTRIC].Status.IsHomed AND axes[AD_OUTER_ECCENTRIC].Status.IsHomed AND
    ABS(axes[AD_INNER_ECCENTRIC].Status.CalculatedPosition1) < TOL_DEPTH_ZERO_DEG AND
    // position must be less than limit
    axes[AD_Z].Status.Position >= gr_AxisPositionLimits[AD_Z].PositionLimitNeg;
    
  // Set process related enable/disables
  hmiProcessReqs.zMoveDownReqEnable := axes[AD_Z].MoveParameters.NegMovePermissive;
  hmiProcessReqs.zMoveUpReqEnable := axes[AD_Z].MoveParameters.PosMovePermissive;
  hmiProcessReqs.zMoveToLUnLReqEnable := 
    // okay to go up
    (axes[AD_Z].Status.Position < gr_CfgCurrent.zAxis.loadUnloadPos AND axes[AD_Z].MoveParameters.PosMovePermissive) OR
    // okay to go down
    (axes[AD_Z].Status.Position > gr_CfgCurrent.zAxis.loadUnloadPos AND axes[AD_Z].MoveParameters.NegMovePermissive);
  hmiProcessReqs.zMoveToSocReqEnable := 
    // okay to go up
    (axes[AD_Z].Status.Position < gr_CfgCurrent.zAxis.startOfCutPos AND axes[AD_Z].MoveParameters.PosMovePermissive) OR
    // okay to go down
    (axes[AD_Z].Status.Position > gr_CfgCurrent.zAxis.startOfCutPos AND axes[AD_Z].MoveParameters.NegMovePermissive);


  // Handwheel is virtual -- don't allow moves
  axes[AD_HANDWHEEL].MoveParameters.PosMovePermissive := FALSE;
  axes[AD_HANDWHEEL].MoveParameters.NegMovePermissive := FALSE;
    
  // cutting fluid pump
  axes[AD_CF_VFD].MoveParameters.PosMovePermissive := cfVfd.isAllowedToRun;
// Allow forward running only
  axes[AD_CF_VFD].MoveParameters.NegMovePermissive := FALSE;

END_ACTION

ACTION OtherModeAxisPermits:
    // Not in a mode (safe, initial, unknown, etc.)
    // This is some sort of error -- don't allow any motion
    // For each axis clear the requestes, and the move permissives
    // TODO: Clear the commnads?

    // cycle is no okay to run
  cyclePermissives.isOmOk := FALSE;
  
  // Spindle
  fctClearMotionRequests(_I_ReqMask := MACM_NOMASK, _IO_Commands := axes[AD_SPINDLE].Commands);
  // TODO: Clear the commnads, or let the axis SM handle it?
  // fctClearMotionCommands(_I_CmdMask := MACM_NOMASK, _IO_Commands := axes[AD_SPINDLE].Commands);
  axes[AD_SPINDLE].MoveParameters.PosMovePermissive := FALSE;
  axes[AD_SPINDLE].MoveParameters.NegMovePermissive := FALSE;

  // Outer Eccentric
  fctClearMotionRequests(_I_ReqMask := MACM_NOMASK, _IO_Commands := axes[AD_OUTER_ECCENTRIC].Commands);
  // TODO: Clear the commnads, or let the axis SM handle it?
  // fctClearMotionCommands(_I_CmdMask := MACM_NOMASK, _IO_Commands := axes[AD_OUTER_ECCENTRIC].Commands);
  axes[AD_OUTER_ECCENTRIC].MoveParameters.PosMovePermissive := FALSE;
  axes[AD_OUTER_ECCENTRIC].MoveParameters.NegMovePermissive := FALSE;

  // Inner Eccentric
  fctClearMotionRequests(_I_ReqMask := MACM_NOMASK, _IO_Commands := axes[AD_INNER_ECCENTRIC].Commands);
  // TODO: Clear the commnads, or let the axis SM handle it?
  // fctClearMotionCommands(_I_CmdMask := MACM_NOMASK, _IO_Commands := axes[AD_INNER_ECCENTRIC].Commands);
  axes[AD_INNER_ECCENTRIC].MoveParameters.PosMovePermissive := FALSE;
  axes[AD_INNER_ECCENTRIC].MoveParameters.NegMovePermissive := FALSE;

  // Z
  fctClearMotionRequests(_I_ReqMask := MACM_NOMASK, _IO_Commands := axes[AD_Z].Commands);
  // TODO: Clear the commnads, or let the axis SM handle it?
  // fctClearMotionCommands(_I_CmdMask := MACM_NOMASK, _IO_Commands := axes[AD_Z].Commands);
  axes[AD_Z].MoveParameters.PosMovePermissive := FALSE;
  axes[AD_Z].MoveParameters.NegMovePermissive := FALSE;
    
  // cutting fluid pump
  axes[AD_CF_VFD].MoveParameters.PosMovePermissive := cfVfd.isAllowedToRun;
// Allow forward running only
  axes[AD_CF_VFD].MoveParameters.NegMovePermissive := FALSE;

END_ACTION

ACTION ModeIndependentPermissions :
  // Set status and permissive related things that are independent of mode
 
  // Rollup of cycle start  allowed
  cyclePermissives.allowCycleStart :=
  // Operating mode must be okay
  cyclePermissives.isOmOk AND
  // Cutting fluid must be okay to start
  cfVfd.isAllowedToStart AND
    // Each axis needs to be in standstill or disabled. Additionally, inner eccentric can be coupled.
  (axes[AD_SPINDLE].Status.PlcOpenState = mcAXIS_DISABLED OR axes[AD_SPINDLE].Status.PlcOpenState = mcAXIS_STANDSTILL) AND
  (axes[AD_OUTER_ECCENTRIC].Status.PlcOpenState = mcAXIS_DISABLED OR axes[AD_OUTER_ECCENTRIC].Status.PlcOpenState = mcAXIS_STANDSTILL) AND
  (axes[AD_INNER_ECCENTRIC].Status.PlcOpenState = mcAXIS_DISABLED OR axes[AD_INNER_ECCENTRIC].Status.PlcOpenState = mcAXIS_STANDSTILL OR axes[AD_INNER_ECCENTRIC].Status.PlcOpenState = mcAXIS_SYNCHRONIZED_MOTION) AND
  (axes[AD_Z].Status.PlcOpenState = mcAXIS_DISABLED OR axes[AD_Z].Status.PlcOpenState = mcAXIS_STANDSTILL) AND
  // axes need to be referenced, and not force to be re-referenced
  axes[AD_SPINDLE].Status.IsHomed AND NOT axes[AD_SPINDLE].ForceSetRef AND
  axes[AD_OUTER_ECCENTRIC].Status.IsHomed AND NOT axes[AD_OUTER_ECCENTRIC].ForceSetRef AND
  axes[AD_INNER_ECCENTRIC].Status.IsHomed AND NOT axes[AD_INNER_ECCENTRIC].ForceSetRef AND
  axes[AD_Z].Status.IsHomed AND NOT axes[AD_Z].ForceSetRef AND
  // axes need to be calibrated to the process
  // Z will be indexed when the cycle is started, so no need to check it here, as long as Z is calibrated
  gr_PartCurrent.isZCalibrated AND gr_PartCurrent.isInECalibrated AND gr_PartCurrent.isOutECalibrated;  
  
  // Rollup of cycle run allowed
  cyclePermissives.allowCycleRun :=
  // Operating mode must be okay
  cyclePermissives.isOmOk AND
  // Cutting fluid must be okay to start
  cfVfd.isAllowedToStart AND
    // Axes can't be in error or homing. Disabled is allowed because the cycle may start with them disabled.
  (axes[AD_SPINDLE].Status.PlcOpenState <> mcAXIS_ERRORSTOP AND axes[AD_SPINDLE].Status.PlcOpenState <> mcAXIS_HOMING) AND
  (axes[AD_OUTER_ECCENTRIC].Status.PlcOpenState <> mcAXIS_ERRORSTOP AND axes[AD_OUTER_ECCENTRIC].Status.PlcOpenState <> mcAXIS_HOMING) AND
  (axes[AD_INNER_ECCENTRIC].Status.PlcOpenState <> mcAXIS_ERRORSTOP AND axes[AD_INNER_ECCENTRIC].Status.PlcOpenState <> mcAXIS_HOMING) AND
  (axes[AD_Z].Status.PlcOpenState <> mcAXIS_ERRORSTOP AND axes[AD_Z].Status.PlcOpenState <> mcAXIS_HOMING) AND
  // axes need to be referenced, and not force to be re-referenced
  axes[AD_SPINDLE].Status.IsHomed AND NOT axes[AD_SPINDLE].ForceSetRef AND
  axes[AD_OUTER_ECCENTRIC].Status.IsHomed AND NOT axes[AD_OUTER_ECCENTRIC].ForceSetRef AND
  axes[AD_INNER_ECCENTRIC].Status.IsHomed AND NOT axes[AD_INNER_ECCENTRIC].ForceSetRef AND
  axes[AD_Z].Status.IsHomed AND NOT axes[AD_Z].ForceSetRef AND
  // axes need to be calibrated to the process
  // Z will be indexed when the cycle is started, so no need to check it here, as long as Z is calibrated
  gr_PartCurrent.isZCalibrated AND gr_PartCurrent.isInECalibrated AND gr_PartCurrent.isOutECalibrated;  
END_ACTION
