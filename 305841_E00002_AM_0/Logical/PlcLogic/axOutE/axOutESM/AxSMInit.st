
PROGRAM _INIT
  // set ax pointer to the element of the global sMot_Axis array
  ax ACCESS ADR(axes[AXIS_NO]);

  // set the position limits to point to the global permanent variable
  axPositionLimits ACCESS ADR(gr_AxisPositionLimits[AXIS_NO]);  
  
  // Set the axis number and clear the ignore bit
  ax.AxisNo:= AXIS_NO;
  
  // **** These settings need to be reviewed/set for each axis
  ax.CouplingParameters.SlaveAxisNo := DINT_TO_USINT(AD_INNER_ECCENTRIC); // Inner axis will be the slave to the outer axis
  ax.Ignore := FALSE;
  ax.isAxisEndless := TRUE;
  ax.isAxisVirtual := FALSE;
  ax.isAxisInverter := FALSE;

  // Point to the mappMotion axis, and a slave if there is one
  ax.AxisObj := gAxOutE; // mappMotion axis -- see mappMotion in cfg view
  ax.SlaveAxisObj := gAxInE; // no slave for the Z Axis

  // Set the restore pos check fb
  ax.fbCheckRestorePos.Axis := ADR(ax.AxisObj);
  ax.fbCheckRestorePos.DataAddress := ADR(gr_AxOutERestorePos); // Set this per axis
    
  // Load the min/max velocity and accel/decel from constants
  ax.MoveParameters.AccelMin := 0.001; // TODO: Not sure of a good value, but it should not be zero.
  ax.MoveParameters.AccelMax:= AXIS_OUTE_MAX_ACCEL;
  ax.MoveParameters.DecelMin := 0.001; // TODO:Not sure of a good value, but it should not be zero.
  ax.MoveParameters.DecelMax:= AXIS_OUTE_MAX_DECEL;
  ax.MoveParameters.VelocityMin := -1.0 * AXIS_OUTE_MAX_VELOCITY; 
  ax.MoveParameters.VelocityMax := AXIS_OUTE_MAX_VELOCITY;

  // **** The settings below don't normally need to be altered
 
  // set the fb axis references
  ax.fbMpAxisBasic.MpLink := ADR(ax.AxisObj);
  ax.fbGearIn.Master := ADR(ax.AxisObj);
  ax.fbGearIn.Slave := ADR(ax.SlaveAxisObj);
  ax.fbGearOut.Slave := ADR(ax.SlaveAxisObj);
  ax.fbOffsetShift.Slave := ADR(ax.SlaveAxisObj);
  ax.fbPhaseShift.Slave := ADR(ax.SlaveAxisObj);
  ax.fbCamIn.Master := ADR(ax.AxisObj);
  ax.fbCamIn.Slave := ADR(ax.SlaveAxisObj);
  ax.fbCamOut.Slave := ADR(ax.SlaveAxisObj);
  ax.fbUpdateBFbParams._I_Axis := ADR(ax);

  // Set fb reference to local variables
  ax.fbMpAxisBasic.Parameters := ADR(axisBasicParams);
  
  // Set previous values for motion parameters so changes can be detected
  ax.MoveParametersPrev := ax.MoveParameters;
    
  // Clear commands and requests
  fctClearMotionCommands(_I_CmdMask := MACM_NOMASK, _IO_Commands := ax.Commands);
  fctClearMotionRequests(_I_ReqMask := MACM_NOMASK, _IO_Commands := ax.Commands);

  // set the move not allowed flag
  ax.Commands.MoveNotAllowed:= TRUE;

  // Set the most primitive status. If the axis is valid, the
  // full status will be updated later once comms is established, and the drive status is updated via MpAxisBasic
  ax.Status.IsCommuncationReady := FALSE;
  ax.Status.IsReadyToPowerOn := FALSE;

END_PROGRAM
