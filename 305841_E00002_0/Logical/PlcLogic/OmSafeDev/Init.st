

PROGRAM _INIT

  // TODO: Security levels. For now just set as operator so OM SM can be programmed
  operatingMode.SecurityLevel := SL_OPERATOR; 

  // EMO Reset time
  timeEStopResetAllow := T#10s;
  timeResetPulse := T#1s;

  // Init to create variables
  // If values are only mapped, and not used in logic anywhere, the compiler does not
  // create them. They are not available to
  // the HMI, and the compiler also complains about
  // them being declared but not used
  fs_AllSMsOk := FALSE;
  fs_EmoCmd := FALSE;
  fs_EmoOwsActive := FALSE;
  fs_EmoOwsOk := FALSE;
  // pendant signals are mapped into pendant structure
  // fs_EmoPendantActive := FALSE;
  // fs_EmoPendantOk := FALSE;
  // fs_AllowPendantMoves := FALSE;
  fs_KeyswitchInRun := FALSE;
  fs_KeyswitchOk := FALSE;
  fs_InSafeMode := FALSE;
  fs_StartPbActive := FALSE;
  fs_StartPbOk := FALSE;
  fs_StopPbActive := FALSE;
  fs_StopPbOk := FALSE;
  fs_CfGateClosedLocked := FALSE;
  fs_CfGateClosedOk := FALSE;

  ts_ResetEStop := FALSE;
  ts_ResetSafeMC := FALSE;

  // Init process req fb
  procHmiProcessReqs._I_ProcessReqs := ADR(hmiProcessReqs);
  procHmiProcessReqs._I_WpCfg := ADR(gr_CfgCurrent);
  // use the base (element 0) address for these arrays. Element
  // positions will be calculated and accessed within the function
  procHmiProcessReqs._I_pLibraryAxesReqs := ADR(hmiLibraryAxisReqs);
  procHmiProcessReqs._I_pAxis := ADR(axes);
  procHmiProcessReqs._I_pAxisPositionLimits := ADR(gr_AxisPositionLimits);
  
  // Init manual mode requests
  hmiLibraryAxisReqs[AD_SPINDLE].axisNo := DINT_TO_USINT(AD_SPINDLE);
  hmiMachineAxisReqs[AD_SPINDLE].axisNo := DINT_TO_USINT(AD_SPINDLE);
  hmiMachineAxisReqs[AD_SPINDLE].axisDesignation := AD_SPINDLE;
  procManualAxisReqsSpindle._I_Axis := ADR(axes[AD_SPINDLE]);
  procManualAxisReqsSpindle._I_SlaveAxis := ADR(axes[axes[AD_SPINDLE].CouplingParameters.SlaveAxisNo]);
  procManualAxisReqsSpindle._I_LibraryAxisReqs := ADR(hmiLibraryAxisReqs[AD_SPINDLE]);
  procManualAxisReqsSpindle._I_MachineAxisReqs := ADR(hmiMachineAxisReqs[AD_SPINDLE]);
  procManualAxisReqsSpindle._I_AxisPositionLimits := ADR(gr_AxisPositionLimits[AD_SPINDLE]);
  
  // Outer Eccentric
  hmiLibraryAxisReqs[AD_OUTER_ECCENTRIC].axisNo := DINT_TO_USINT(AD_OUTER_ECCENTRIC);
  hmiMachineAxisReqs[AD_OUTER_ECCENTRIC].axisNo := DINT_TO_USINT(AD_OUTER_ECCENTRIC);
  hmiMachineAxisReqs[AD_OUTER_ECCENTRIC].axisDesignation := AD_OUTER_ECCENTRIC;
  procManualAxisReqsOutE._I_Axis := ADR(axes[AD_OUTER_ECCENTRIC]);
  procManualAxisReqsOutE._I_SlaveAxis := ADR(axes[axes[AD_OUTER_ECCENTRIC].CouplingParameters.SlaveAxisNo]);
  procManualAxisReqsOutE._I_LibraryAxisReqs := ADR(hmiLibraryAxisReqs[AD_OUTER_ECCENTRIC]);
  procManualAxisReqsOutE._I_MachineAxisReqs:= ADR(hmiMachineAxisReqs[AD_OUTER_ECCENTRIC]);
  procManualAxisReqsOutE._I_AxisPositionLimits := ADR(gr_AxisPositionLimits[AD_OUTER_ECCENTRIC]);

  // Inner Eccentric
  hmiLibraryAxisReqs[AD_INNER_ECCENTRIC].axisNo := DINT_TO_USINT(AD_INNER_ECCENTRIC);
  hmiMachineAxisReqs[AD_INNER_ECCENTRIC].axisNo := DINT_TO_USINT(AD_INNER_ECCENTRIC);
  hmiMachineAxisReqs[AD_INNER_ECCENTRIC].axisDesignation := AD_INNER_ECCENTRIC;
  procManualAxisReqsInE._I_Axis := ADR(axes[AD_INNER_ECCENTRIC]);
  procManualAxisReqsInE._I_SlaveAxis := ADR(axes[axes[AD_INNER_ECCENTRIC].CouplingParameters.SlaveAxisNo]);
  procManualAxisReqsInE._I_LibraryAxisReqs := ADR(hmiLibraryAxisReqs[AD_INNER_ECCENTRIC]);
  procManualAxisReqsInE._I_MachineAxisReqs := ADR(hmiMachineAxisReqs[AD_INNER_ECCENTRIC]);
  procManualAxisReqsInE._I_AxisPositionLimits := ADR(gr_AxisPositionLimits[AD_INNER_ECCENTRIC]);

  // Z
  hmiLibraryAxisReqs[AD_Z].axisNo := DINT_TO_USINT(AD_Z);
  hmiMachineAxisReqs[AD_Z].axisNo := DINT_TO_USINT(AD_Z);
  hmiMachineAxisReqs[AD_Z].axisDesignation := AD_Z;
  procManualAxisReqsZ._I_Axis := ADR(axes[AD_Z]);
  procManualAxisReqsZ._I_SlaveAxis := ADR(axes[axes[AD_Z].CouplingParameters.SlaveAxisNo]);
  procManualAxisReqsZ._I_LibraryAxisReqs := ADR(hmiLibraryAxisReqs[AD_Z]);
  procManualAxisReqsZ._I_MachineAxisReqs := ADR(hmiMachineAxisReqs[AD_Z]);
  procManualAxisReqsZ._I_AxisPositionLimits := ADR(gr_AxisPositionLimits[AD_Z]);
  
  // Handwheel (Axis 7)
  hmiLibraryAxisReqs[AD_HANDWHEEL].axisNo := DINT_TO_USINT(AD_HANDWHEEL);
  hmiMachineAxisReqs[AD_HANDWHEEL].axisNo := DINT_TO_USINT(AD_HANDWHEEL);
  hmiMachineAxisReqs[AD_HANDWHEEL].axisDesignation := AD_HANDWHEEL;
  procManualAxisReqsHw._I_Axis := ADR(axes[AD_HANDWHEEL]);
  procManualAxisReqsHw._I_SlaveAxis := ADR(axes[axes[AD_HANDWHEEL].CouplingParameters.SlaveAxisNo]);
  procManualAxisReqsHw._I_LibraryAxisReqs := ADR(hmiLibraryAxisReqs[AD_HANDWHEEL]);
  procManualAxisReqsHw._I_MachineAxisReqs := ADR(hmiMachineAxisReqs[AD_HANDWHEEL]);
  procManualAxisReqsHw._I_AxisPositionLimits := ADR(gr_AxisPositionLimits[AD_HANDWHEEL]);
  
  // Cutting fluid VFD (Axis 8)
  hmiLibraryAxisReqs[AD_CF_VFD].axisNo := DINT_TO_USINT(AD_CF_VFD);
  hmiMachineAxisReqs[AD_CF_VFD].axisNo := DINT_TO_USINT(AD_CF_VFD);
  hmiMachineAxisReqs[AD_CF_VFD].axisDesignation := AD_CF_VFD;
  procManualAxisReqsCfVfd._I_Axis := ADR(axes[AD_CF_VFD]);
  procManualAxisReqsCfVfd._I_SlaveAxis := ADR(axes[axes[AD_CF_VFD].CouplingParameters.SlaveAxisNo]);
  procManualAxisReqsCfVfd._I_LibraryAxisReqs := ADR(hmiLibraryAxisReqs[AD_CF_VFD]);
  procManualAxisReqsCfVfd._I_MachineAxisReqs := ADR(hmiMachineAxisReqs[AD_CF_VFD]);
  procManualAxisReqsCfVfd._I_AxisPositionLimits := ADR(gr_AxisPositionLimits[AD_CF_VFD]);

  // Clear reqs that may result in motion or physical changes to an axis
  ClearMotionReqs;
  // Clear other requests
  ClearNonMotionReqs;
  
END_PROGRAM