
PROGRAM _INIT
  // set ax pointer to the element of the global sMot_Axis array
  ax ACCESS ADR(axes[AXIS_NO]);

  // set the position limits to point to the global permanent variable
  axPositionLimits ACCESS ADR(gr_AxisPositionLimits[AXIS_NO]);  

  // Set the axis number and clear the ignore bit
  ax.AxisNo:= AXIS_NO;
    
  // **** These settings need to be reviewed/set for each axis
  ax.CouplingParameters.SlaveAxisNo := DINT_TO_USINT(AD_UNKNOWN); // No slaves for the CF VFD
  ax.Ignore := FALSE;
  ax.isAxisEndless := TRUE;
  ax.isAxisVirtual := FALSE;
  
  // If this is a 
  
  // Point to the mappMotion axis, and a slave if there is one
  ax.AxisObj := gAxCfPmp; // mappMotion axis -- see mappMotion in cfg view
  ax.SlaveAxisObj := axDummySlave; // slave axis for the handwheel is dynamic

  // Load the min/max velocity and accel/decel from constants
  ax.MoveParameters.AccelMin := 0.001; // TODO: Not sure of a good value, but it should not be zero.
  ax.MoveParameters.AccelMax := AXIS_CFVFD_MAX_ACCEL;
  ax.MoveParameters.DecelMin := 0.001; // TODO:Not sure of a good value, but it should not be zero.
  ax.MoveParameters.DecelMax:= AXIS_CFVFD_MAX_DECEL;
  ax.MoveParameters.VelocityMin := 0.000; 
  ax.MoveParameters.VelocityMax := AXIS_CFVFD_MAX_VELOCITY;

  // **** The settings below don't normally need to be altered
  
  // set the fb references
  ax.fbMpAxisBasic.MpLink := ADR(ax.AxisObj);
  ax.fbMpAxisCoupling.MpLinkMaster := ADR(ax.AxisObj);
  ax.fbMpAxisCoupling.MpLink := ADR(ax.SlaveAxisObj);
  ax.fbUpdateBFbParams._I_Axis := ADR(ax);
  ax.fbUpdateCFbParams._I_Axis := ADR(ax);

  // Set fb reference to local variables
  ax.fbMpAxisBasic.Parameters := ADR(axisBasicParams);
  ax.fbMpAxisCoupling.Parameters := ADR(axisCouplingParams);
  
  // Set previous values for motion and coupling parameters so changes can be detected
  ax.MoveParametersPrev := ax.MoveParameters;
  ax.CouplingParametersPrev := ax.CouplingParameters;
    
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
