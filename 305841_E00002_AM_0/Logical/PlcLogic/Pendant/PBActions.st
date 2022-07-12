// For each button, check the state in the action.
// Call the action regardlesss of sate and check the state
// within the action rather than before calling in case there
// is something to do when the state is off.

// Ready. PB function not assigned
ACTION ProcessPb1 : 
  IF owsPendant.PBStates[1] THEN
    // PB state is on ... process away
    ; // nothing to do
  ELSE
    // PB state is off ...
    ; // placeholder for future use
  END_IF;
END_ACTION

// Not assigned
ACTION ProcessPb2 : 
  IF owsPendant.PBStates[2] THEN
    // PB state is on ... process away
    ; // nothing to do
  ELSE
    // PB state is off ...
    ; // placeholder for future use
  END_IF;
END_ACTION

// Set Zero
ACTION ProcessPb3 : 
  IF owsPendant.PBStates[3] THEN
    // PB state is on ... depending on the axis, home the axis to zero.
    // The PB is a OS, so snapshot the axis selection and the home req. 
    // Homing may take several scans, once kicked off, ignore selection
    // changes, PB changes, etc.
    axisSelection := owsPendant.AxisSelection;
    setZeroReq := TRUE;
  ELSE
    // PB state is off ...
    ; // placeholder for future use
  END_IF;    
END_ACTION
    
// Axis Enable
ACTION ProcessPb4 : 
  IF owsPendant.PBStates[4] THEN
    // PB state is on ... Send enable if drive is ready to be powered.
    // PB is OneShotted, and request only needs to be set, and is then cleared elsewhere
    axes[owsPendant.AxisSelection].Commands.EnableReq := axes[owsPendant.AxisSelection].Status.IsReadyToPowerOn;
  ELSE
    // PB state is off ...
    ; // placeholder for future use
  END_IF;
END_ACTION

// Axis Disable
ACTION ProcessPb5 : 
  IF owsPendant.PBStates[5] THEN
    // PB state is on ... send disable if drive is powered on.
    // PB is OneShotted, and request only needs to be set, and is then cleared elsewhere
    axes[owsPendant.AxisSelection].Commands.DisableReq := axes[owsPendant.AxisSelection].Status.IsPoweredOn;
  ELSE
    // PB state is off ...
    ; // placeholder for future use
  END_IF;
END_ACTION

// Brake Off
ACTION ProcessPb6 : 
  IF owsPendant.PBStates[6] THEN
    // PB state is on ... turn on brake release if the drive is disabled
    axes[owsPendant.AxisSelection].Commands.ReleaseBrakeReq := NOT axes[owsPendant.AxisSelection].Status.IsPoweredOn;
  ELSE
    // PB state is off ... turn off brake release
    axes[owsPendant.AxisSelection].Commands.ClearReleaseBrakeReq := TRUE;
    axes[owsPendant.AxisSelection].Commands.ReleaseBrakeReq := FALSE;
  END_IF;
END_ACTION

// Z Set SOC -- Axiz Z needs to be selected
ACTION ProcessPb7 : 
  IF owsPendant.PBStates[7] AND owsPendant.AxisSelection = AD_Z THEN
    // PB state is on ... Set the current position to the Start Of Cut (SOC) position as long as the axis is homed.
    IF axes[AD_Z].Status.IsHomed THEN
      gr_CfgCurrent.zAxis.startOfCutPos := axes[AD_Z].Status.Position; 
    END_IF;
  ELSE
    // PB state is off ...
    ; // placeholder for future use
  END_IF;
END_ACTION

// Z Set Load/Unload -- Axiz Z needs to be selected
ACTION ProcessPb8 : 
  IF owsPendant.PBStates[8] AND owsPendant.AxisSelection = AD_Z THEN
    // PB state is on ... Set the current position to the load/unload position as long as the axis is homed.
    IF axes[AD_Z].Status.IsHomed THEN
      gr_CfgCurrent.zAxis.loadUnloadPos := axes[AD_Z].Status.Position;
    END_IF;
  ELSE
    // PB state is off ...
    ; // placeholder for future use
  END_IF;
END_ACTION

// Not assigned
ACTION ProcessPb9 : 
  IF owsPendant.PBStates[9] THEN
    // PB state is on ... process away
    ;
  ELSE
    // PB state is off ...
    ; // placeholder for future use
  END_IF;
END_ACTION

ACTION SetZeroSeq :
  // The set zero sequence is started by PB3.
  // Handle the details here, just to the PB action is kept simple.
  // PB3 sets local axis selection and home req so changes during
  // homing are ignored.

  // Handle the req, and associated OS.
  // The OS is just so we can init values, and not keep resetting them 
  // during homing
  
  IF NOT setZeroReq THEN
    // No Req, clear the OS
    homeSeqOS := FALSE;
  ELSIF setZeroReq AND NOT homeSeqOS THEN
    // Req and no OS, first time thru ...
    
    // Set the OS
    homeSeqOS := TRUE;
    
    // Now do the first time setup stuff ...
    
    // Now set the set zero offset based on the selected axis ... allow for different
    // algorithms based on axis
    IF axisSelection = AD_X THEN
      // TODO: Not sure how to handle X
      axes[axisSelection].MoveParameters.HomeParams.Position := 0.0;
    ELSIF axisSelection = AD_Y THEN
      // TODO: Not sure how to handle Y
      axes[axisSelection].MoveParameters.HomeParams.Position := 0.0;
    ELSIF axisSelection = AD_Z THEN
      // After homing, the desired position is zero + a possible offset
      axes[axisSelection].MoveParameters.HomeParams.Position :=  0.0;
    ELSIF axisSelection = AD_OUTER_ECCENTRIC THEN
      // Outer eccentric just gets homed to 0, no matter where it is, so there is no offset.
      axes[axisSelection].MoveParameters.HomeParams.Position := 0.0;
    ELSIF axisSelection = AD_INNER_ECCENTRIC THEN
      // After homing, the desired position is zero + a possible offset
      axes[axisSelection].MoveParameters.HomeParams.Position :=0.0;
    ELSIF axisSelection = AD_SPINDLE THEN
      // Spindle position isn't critical, so just home to zero
      axes[axisSelection].MoveParameters.HomeParams.Position := 0.0;
    END_IF;

    // Now set the home request for the selected axis
    axes[axisSelection].MoveParameters.HomeParams.Mode := mcHOMING_ABSOLUTE;
    axes[axisSelection].Commands.HomeReq := TRUE;
    
  ELSIF setZeroReq AND homeSeqOS THEN
    // Req and OS, doing while req is high
    // If the home command and req are both low, the homing is complete, successful or not.
    // If homing is successful, then set the 'isCalibrated' bits.
    IF NOT axes[axisSelection].Commands.HomeReq AND NOT axes[axisSelection].Commands.HomeCmd THEN
      IF axes[axisSelection].Status.IsHomed AND axes[axisSelection].Status.Position = 0.0 THEN
        // Home done and sucessful
        // Set the calibration bits based on selected axis
        IF axisSelection = AD_Z THEN
          gr_PartCurrent.isZCalibrated := TRUE;
        ELSIF axisSelection = AD_OUTER_ECCENTRIC THEN
          gr_PartCurrent.isOutECalibrated := TRUE;
        ELSIF axisSelection = AD_INNER_ECCENTRIC THEN
          gr_PartCurrent.isInECalibrated := TRUE;
        END_IF;
      END_IF;
      
      // All done, clear the req whether or not it was successful
      setZeroReq := FALSE;
    END_IF;
  END_IF;
END_ACTION



(*
ACTION SetZeroSeqOld :
  // The set zero sequence is started by PB3.
  // Handle the details here, just to the PB action is kept simple.
  // PB3 sets local axis selection and home req so changes during
  // homing are ignored.

  // Handle the req, and associated OS.
  // The OS is just so we can init values, and not keep resetting them 
  // during homing
  
  // The actual homing is handled by the GaMot library function called outside this action.
  
  IF NOT setZeroReq THEN
    // No Req, clear the OS
    homeSeqOS := FALSE;
  ELSIF setZeroReq AND NOT homeSeqOS THEN
    // Req and no OS, first time thru ...
    
    // Set the OS
    homeSeqOS := TRUE;
    
    // Now do the first time setup stuff ...
    
    // Set the axis to the selected axis
    HomeAxisFb._I_Axis := ADR(axes[axisSelection]);

    // Now set the set zero offset based on the selected axis ... allow for different
    // algorithms based on axis
    IF axisSelection = AD_X THEN
      // TODO: Not sure how to handle X
      HomeAxisFb._I_Position := 0.0;
    ELSIF axisSelection = AD_Y THEN
      // TODO: Not sure how to handle Y
      HomeAxisFb._I_Position := 0.0;
    ELSIF axisSelection = AD_Z THEN
      // After homing, the desired position is zero + a possible offset
      HomeAxisFb._I_Position :=  gr_CfgCurrent.zAxis.setZeroOffset;;
    ELSIF axisSelection = AD_OUTER_ECCENTRIC THEN
      // Outer eccentric just gets homed to 0, no matter where it is, so there is no offset.
      HomeAxisFb._I_Position := 0.0;
    ELSIF axisSelection = AD_INNER_ECCENTRIC THEN
      // After homing, the desired position is zero + a possible offset
      HomeAxisFb._I_Position := gr_CfgCurrent.cuttingHead.setZeroOffset;
    ELSIF axisSelection = AD_SPINDLE THEN
      // Spindle position isn't critical, so just home to zero
      HomeAxisFb._I_Position := 0.0;
    END_IF;

  ELSIF setZeroReq AND homeSeqOS THEN
    // Req and OS, doing while req is high
    // The fb is always called below, and the enable is based on the setZeroReq.
    // Monitor the output of the FB here. It should end sucessfully or in error
    IF fbHomeAbs._O_Done AND NOT fbHomeAbs._O_Error THEN
      // Homing done, and no error -- Success!! 
      // Clear the home req and consider the axis homed.
      setZeroReq := FALSE;
      // Set the calibration bits based on selected axis
      IF axisSelection = AD_Z THEN
        gr_PartCurrent.isZCalibrated := TRUE;
      ELSIF axisSelection = AD_OUTER_ECCENTRIC THEN
        gr_PartCurrent.isOutECalibrated := TRUE;
      ELSIF axisSelection = AD_INNER_ECCENTRIC THEN
        gr_PartCurrent.isInECalibrated := TRUE;
      END_IF;
    ELSIF fbHomeAbs._O_Done AND fbHomeAbs._O_Error THEN
      // Homing done, but in error :(
      // Clear the home req
      setZeroReq := FALSE;
      // Clear the calibration bits based on selected axis
      IF axisSelection = AD_Z THEN
        gr_PartCurrent.isZCalibrated := FALSE;
      ELSIF axisSelection = AD_OUTER_ECCENTRIC THEN
        gr_PartCurrent.isOutECalibrated := FALSE;
      ELSIF axisSelection = AD_INNER_ECCENTRIC THEN
        gr_PartCurrent.isInECalibrated := FALSE;
      END_IF;
    ELSE
      // fb not done ... fb must be busy ... nothing to do. 
      // Keep for future expansion
      ;
    END_IF;
    
  END_IF;
  
END_ACTION

ACTION HomeInPosSeqOld :
  // The home sequence is started by PB3.
  // Handle the details here, just to the PB action is kept simple.
  // PB3 sets local axis selection and home req so changes during
  // homing are ignored.

  // Handle the req, and associated OS.
  // The OS is just so we can init values, and not keep resetting them 
  // during homing
  
  // The actual homing is handled by the GaMot library function called outside this action.

  IF NOT homeInPosReq THEN
    // No Req, clear the OS
    homeSeqOS := FALSE;
  ELSIF homeInPosReq AND NOT homeSeqOS THEN
    // Req and no OS, first time thru ...
    
    // Set the OS
    homeSeqOS := TRUE;
    
    // Now do the first time setup stuff ...
    
    // Set the axis to the selected axis
    fbHomeAbs._I_Axis := ADR(axes[axisSelection]);

    // Now set the desired poition to the axis position
    fbHomeAbs._I_Position := axes[axisSelection].Status.Position;
    
  ELSIF homeInPosReq AND homeSeqOS THEN
    // Req and OS, doing while req is high
    // The fb is always called below, and the enable is based on the homeInPosReq.
    // Monitor the output of the FB here. It should end sucessfully or in error
    IF fbHomeAbs._O_Done AND NOT fbHomeAbs._O_Error THEN
      // Homing done, and no error -- Success!! 
      // Clear the home req and consider the axis homed.
      homeInPosReq := FALSE;
      
      // Other success stuff here ...
      
    ELSIF fbHomeAbs._O_Done AND fbHomeAbs._O_Error THEN
      // Homing done, but in error :(
      // Clear the home req
      homeInPosReq := FALSE;
      
      // Other error stuff here ...
      
    ELSE
      // fb not done ... fb must be busy ... nothing to do. 
      // Keep for future expansion
      ;
    END_IF;
    
  END_IF;
  
 END_ACTION
*)