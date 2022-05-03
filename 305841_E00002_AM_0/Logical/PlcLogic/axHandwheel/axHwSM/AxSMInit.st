
PROGRAM _INIT
  // set ax pointer to the element of the global sMot_Axis array
  ax ACCESS ADR(axes[AXIS_NO]);

  // set the position limits to point to the global permanent variable
  axPositionLimits ACCESS ADR(gr_AxisPositionLimits[AXIS_NO]);  

  // Set the axis number and clear the ignore bit
  ax.AxisNo:= AXIS_NO;
    
  // **** These settings need to be reviewed/set for each axis
  ax.CouplingParameters.SlaveAxisNo := DINT_TO_USINT(AD_UNKNOWN); // This axis will have slaves, but it changes during run-time
  ax.Ignore := FALSE;
  ax.isAxisEndless := TRUE;
  ax.isAxisVirtual := TRUE;
  ax.isAxisInverter := FALSE;

  // Point to the mappMotion axis, and a slave if there is one
  ax.AxisObj := gvAxHw; // mappMotion axis -- see mappMotion in cfg view
  ax.SlaveAxisObj := axDummySlave; // slave axis for the handwheel is dynamic

  // Set the restore pos check fb
  // ax.fbCheckRestorePos.Axis := ADR(ax.AxisObj);
  // ax.fbCheckRestorePos.DataAddress := ADR(gr_AxHwRestorePos); // Set this per axis

  // Load the min/max velocity and accel/decel from constants
  // Note: Moves not used for virtual axes, so values are not important
  ax.MoveParameters.AccelMin := 0.001; // TODO: Not sure of a good value, but it should not be zero.
  ax.MoveParameters.AccelMax:= 10.0;
  ax.MoveParameters.DecelMin := 0.001; // TODO:Not sure of a good value, but it should not be zero.
  ax.MoveParameters.DecelMax:= 10.0;
  ax.MoveParameters.VelocityMin := 0.000; 
  ax.MoveParameters.VelocityMax := 01.0;

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
