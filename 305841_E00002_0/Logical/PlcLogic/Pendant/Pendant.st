
PROGRAM _INIT
  // Set the PB behavior. Done in init as these should't change often
  // Behavior options are:
  // GAPIO_PBBT_DISABLED    always off
  // GAPIO_PBBT_MOMENTARY   active while pressed
  // GAPIO_PBBT_OS_ON       active for one scan (rising edge of PB)
  // GAPIO_PBBT_PRESS_ON    press to turn on
  // GAPIO_PBBT_PULSE_ON    turn on for a pulse
  // GAPIO_PBBT_PRESS_OFF   press to turn off
  // GAPIO_PBBT_TOGGLE      press to toggle
  // Buttons are as follows
  // 1 (S5)  Rdy Indicator Pressed Fct TBD    Top Left
  // 2 (S6)  not assigned                     Top Mid
  // 3 (S7)  Set Zero                         Top Right
  // 4 (S8)  Axis Enable                      Mid Left
  // 5 (S9)  Axis Disable                     Mid Mid
  // 6 (S10) Brake Off                        Mid Right
  // 7 (S11) Z Set SOC                        Bot Left
  // 8 (S12) Z Set Load/Unload                Bot Mid
  // 9 (S13) Z not assigned                   Bot Right
  
  owsPendant.fbPBs[1]._InPBType:= GAPIO_PBBT_DISABLED; // Rdy  Press function ?. Not assigned for now.
  owsPendant.fbPBs[2]._InPBType:= GAPIO_PBBT_DISABLED; // Not assigned, no press function
  owsPendant.fbPBs[3]._InPBType:= GAPIO_PBBT_MOMENTARY;  // Set Zero
  owsPendant.fbPBs[4]._InPBType:= GAPIO_PBBT_MOMENTARY;  // Axis Enable
  owsPendant.fbPBs[5]._InPBType:= GAPIO_PBBT_MOMENTARY;  // Axis Disable
  owsPendant.fbPBs[6]._InPBType:= GAPIO_PBBT_TOGGLE;    // Manual Brake Release
  owsPendant.fbPBs[7]._InPBType:= GAPIO_PBBT_MOMENTARY ; // Z Set Start of Cut
  owsPendant.fbPBs[8]._InPBType:= GAPIO_PBBT_MOMENTARY;  // Z Set Load/Unload
  owsPendant.fbPBs[9]._InPBType:= GAPIO_PBBT_DISABLED; // Not assigned, no press function
  
  (* TEST CODE -- Used to test LED and button electrical *)
  (*
  owsPendant.fbPBs[1]._InPBType:= GAPIO_PBBT_MOMENTARY; // Rdy  Press function ?. Not assigned for now.
  owsPendant.fbPBs[2]._InPBType:= GAPIO_PBBT_MOMENTARY; // Not assigned, no press function
  owsPendant.fbPBs[3]._InPBType:= GAPIO_PBBT_MOMENTARY;  // Set Zero
  owsPendant.fbPBs[4]._InPBType:= GAPIO_PBBT_MOMENTARY;  // Axis Enable
  owsPendant.fbPBs[5]._InPBType:= GAPIO_PBBT_MOMENTARY;  // Axis Disable
  owsPendant.fbPBs[6]._InPBType:= GAPIO_PBBT_MOMENTARY;    // Brake Off    
  owsPendant.fbPBs[7]._InPBType:= GAPIO_PBBT_MOMENTARY ; // Z Set Start of Cut
  owsPendant.fbPBs[8]._InPBType:= GAPIO_PBBT_MOMENTARY;  // Z Set Load/Unload
  owsPendant.fbPBs[9]._InPBType:= GAPIO_PBBT_MOMENTARY; // Not assigned, no press function
  *)

  // clear local home reqs and OS, and reset home fb. Set the axis to a dummy axis so
  // at least there is a reference to something
  setZeroReq := FALSE;
  // fbHomeAbs(_I_Enable := FALSE, _I_Axis := ADR(axes[AD_UNKNOWN]));
  
  // Init the enabled fb
  enabledAxisFb._I_PendantEnabled :=FALSE;
  enabledAxisFb._I_AxEnabled := FALSE;
  enabledAxisFb._I_AxisHandwheel := ADR(axes[AD_HANDWHEEL]);
  enabledAxisFb._I_pAxisSelected := ADR(axes[AD_UNKNOWN]); // This is dynamic, but set it to something valid
  enabledAxisFb._I_Pendant := ADR(owsPendant);
  // make sure dynamic vars (_I_pAxisSelected) are set to something when SFCInit is true
  enabledAxisFb(SFCInit:= TRUE); // inti the fb and then clear the init so it is ready to run 
  enabledAxisFb.SFCInit:= FALSE;

END_PROGRAM

PROGRAM _CYCLIC

  // Allow Pendant Moves
  // No coded needed here:
  // owsPendant.pendantAllowMoves is mapped from the safety PLC: The Pendant Mode bit is sent
  // from the gray PLC to the Safe PLC. The Safe PLC sets allow moves if the wiring is okay,
  // the pendant enable button is pressed, and the mode is pendant mode.
  
  // Decode the axis selection
  owsPendant.AxisSelection := fctDecodeAxis(
    _InA := owsPendant.AxisSelectInputs[1],
    _InB := owsPendant.AxisSelectInputs[2],
    _InC := owsPendant.AxisSelectInputs[3],
    _InD := FALSE);
  
  // Decode the speed selection
  owsPendant.SpeedSelection := fctDecodeSpeed(
    _InA := owsPendant.SpeedSelectInputs[1],
    _InB := owsPendant.SpeedSelectInputs[2],
    _InC := owsPendant.SpeedSelectInputs[3],
    _InD := FALSE);
  
  // Call the enable axis function block. This is intended to be called all the time, and will
  // ready the machine when the pandant enable switch is pressed, and the selected axis is enabled.
  // This call assumes reference to the handwheel and pendant (both static) are set in init above.
  enabledAxisFb._I_PendantEnabled := owsPendant.pendantAllowMoves;
  enabledAxisFb._I_AxEnabled := axes[owsPendant.AxisSelection].Status.IsPoweredOn;
  enabledAxisFb._I_AxisHandwheel := ADR(axes[AD_HANDWHEEL]);
  enabledAxisFb._I_pAxisSelected := ADR(axes[owsPendant.AxisSelection]);
  enabledAxisFb._I_Pendant := ADR(owsPendant);
  enabledAxisFb();

  // Pulse count reset request
  owsPendant.tmrCountResetPulse(IN:= owsPendant.resetReqHandwheelCount, PT:= T#200ms);
  owsPendant.resetReqHandwheelCount := FALSE;
  
  // Process Pushbutton (PB) Inputs
  // Buttons are as follows
  // 1 (S5)  Rdy Indicator Pressed Fct TBD    Top Left
  // 2 (S6)  not assigned                     Top Mid
  // 3 (S7)  Set Zero                         Top Right
  // 4 (S8)  Axis Enable                      Mid Left
  // 5 (S9)  Axis Disable                     Mid Mid
  // 6 (S10) Brake Off                        Mid Right
  // 7 (S11) Z Set SOC                        Bot Left
  // 8 (S12) Z Set Load/Unload                Bot Mid
  // 9 (S13) not assigned                     Bot Right
  
  // Map the raw input into the PB FB, and run the FB.
  // Condition inputs with module OK and allow pendant moves from safety controller. This effectively
  // disables the pushbutton if pendant moves are not allowed, or the input module is not okay.
  // 1. Ready
  owsPendant.fbPBs[1](_InPBIn := owsPendant.PBInputs[1] AND ModStat_OWS_PLK1.Slot03ModuleOk AND owsPendant.pendantAllowMoves);
  owsPendant.PBStates[1] := owsPendant.fbPBs[1]._OutState;

  // 2. Not assigned
  owsPendant.fbPBs[2](_InPBIn := owsPendant.PBInputs[2] AND ModStat_OWS_PLK1.Slot03ModuleOk AND owsPendant.pendantAllowMoves);
  owsPendant.PBStates[2] := owsPendant.fbPBs[2]._OutState;

  // 3. set zero
  owsPendant.fbPBs[3](_InPBIn := owsPendant.PBInputs[3] AND ModStat_OWS_PLK1.Slot03ModuleOk AND owsPendant.pendantAllowMoves);
  owsPendant.PBStates[3] := owsPendant.fbPBs[3]._OutState;

  // 4. Axis Enable
  owsPendant.fbPBs[4](_InPBIn := owsPendant.PBInputs[4] AND ModStat_OWS_PLK1.Slot03ModuleOk AND owsPendant.pendantAllowMoves);
  owsPendant.PBStates[4] := owsPendant.fbPBs[4]._OutState;

  // 5. Axis Disable
  owsPendant.fbPBs[5](_InPBIn := owsPendant.PBInputs[5] AND ModStat_OWS_PLK1.Slot03ModuleOk AND owsPendant.pendantAllowMoves);
  owsPendant.PBStates[5] := owsPendant.fbPBs[5]._OutState;

  // 6. Brake Off
  owsPendant.fbPBs[6](_InPBIn := owsPendant.PBInputs[6] AND ModStat_OWS_PLK1.Slot03ModuleOk AND owsPendant.pendantAllowMoves);
  owsPendant.PBStates[6] := owsPendant.fbPBs[6]._OutState;

  // 7. Z Set SOC Pos
  owsPendant.fbPBs[7](_InPBIn := owsPendant.PBInputs[7] AND ModStat_OWS_PLK1.Slot04ModuleOk AND owsPendant.pendantAllowMoves);
  owsPendant.PBStates[7] := owsPendant.fbPBs[7]._OutState;

  // 8. Z Set Load/Unload Pos
  owsPendant.fbPBs[8](_InPBIn := owsPendant.PBInputs[8] AND ModStat_OWS_PLK1.Slot04ModuleOk AND owsPendant.pendantAllowMoves);
  owsPendant.PBStates[8] := owsPendant.fbPBs[8]._OutState;

  // 9. Not assigned
  owsPendant.fbPBs[9](_InPBIn := owsPendant.PBInputs[9] AND ModStat_OWS_PLK1.Slot04ModuleOk AND owsPendant.pendantAllowMoves);
  owsPendant.PBStates[9] := owsPendant.fbPBs[9]._OutState;
 
  (* TEST CODE. Used to test LED and button electrical. Turn on the LEDs while the buttons are pressed. *)
  (*
  owsPendant.fbPBs[1](_InPBIn := owsPendant.PBInputs[1]);
  owsPendant.PBStates[1] := owsPendant.fbPBs[1]._OutState;

  owsPendant.fbPBs[2](_InPBIn := owsPendant.PBInputs[2]);
  owsPendant.PBStates[2] := owsPendant.fbPBs[2]._OutState;

  owsPendant.fbPBs[3](_InPBIn := owsPendant.PBInputs[3]);
  owsPendant.PBStates[3] := owsPendant.fbPBs[3]._OutState;

  owsPendant.fbPBs[4](_InPBIn := owsPendant.PBInputs[4]);
  owsPendant.PBStates[4] := owsPendant.fbPBs[4]._OutState;

  owsPendant.fbPBs[5](_InPBIn := owsPendant.PBInputs[5]);
  owsPendant.PBStates[5] := owsPendant.fbPBs[5]._OutState;

  owsPendant.fbPBs[6](_InPBIn := owsPendant.PBInputs[6]);
  owsPendant.PBStates[6] := owsPendant.fbPBs[6]._OutState;

  owsPendant.fbPBs[7](_InPBIn := owsPendant.PBInputs[7]);
  owsPendant.PBStates[7] := owsPendant.fbPBs[7]._OutState;

  owsPendant.fbPBs[8](_InPBIn := owsPendant.PBInputs[8]);
  owsPendant.PBStates[8] := owsPendant.fbPBs[8]._OutState;

  owsPendant.fbPBs[9](_InPBIn := owsPendant.PBInputs[9]);
  owsPendant.PBStates[9] := owsPendant.fbPBs[9]._OutState;
 *)
 
  // Process Handwheel position
  // Handwheel count is mapped directly from I/O Module
  // Each A and B edge is counted, so a full AB cycle will be 4 counts
  // Take into account module and encoder power health
  // TODO: Process count into a position -- figure out algorithm
  IF owsPendant.pendantPowerOk AND owsPendant.encoderPowerOk AND ModStat_OWS_PLK1.Slot05ModuleOk AND owsPendant.pendantAllowMoves THEN
    owsPendant.Position := DINT_TO_REAL(owsPendant.HandwheelCounter) * 1.0;
  ELSE
    owsPendant.Position := 0.0;
  END_IF;
  
  // The PB FB up above set the PB states.
  // Now process those states -- map the pressed functions to logical functions elsewhere.
  // Use the pendant allow moves so PB button not pressed logic does not interfere with 
  // logic used outside pendant mode -- brake release for example.
  IF owsPendant.pendantAllowMoves THEN
    ProcessPb1;
    ProcessPb2;
    ProcessPb3;
    ProcessPb4;
    ProcessPb5;
    ProcessPb6;
    ProcessPb7;
    ProcessPb8;
    ProcessPb9;
  END_IF;
  
  // Deal with set zero and home in position req and here by calling the
  // respective actions.
  // Set Zero is kicked off by PB3, and home in position is started when
  // the enable is pressed.  Both are but multi-scan operations and need
  // to continuously call the local copy of the GaMot library homing fb.
  // Wanted to keep the PB and init actions simple.
  // Use the pendant allow moves so homing logic does not interfere with 
  // logic used outside pendant mode -- homing in manual mode for example.
  IF owsPendant.pendantAllowMoves THEN
    SetZeroSeq;
  ELSE
    // If not in pendant mode, make sure the home req and OS are clear
    setZeroReq := FALSE;
    homeSeqOS := FALSE;
  END_IF;

  // Process Pendant Pilot Light (PL) Outputs
  // 1. Ready Light. Illuminate on enabled and ready
  // TODO: Anything to check other than enabled?
  owsPendant.PLCmds[1] := axes[owsPendant.AxisSelection].Status.IsPoweredOn AND operatingMode.OperatingMode = OM_PENDANT_MODE;
  
  // 2. not assigned
  owsPendant.PLCmds[2] := FALSE; 
  
  // 3. Set Zero -- Illuminate if axis is homed
  owsPendant.PLCmds[3] := axes[owsPendant.AxisSelection].Status.IsHomed AND operatingMode.OperatingMode = OM_PENDANT_MODE;
   
  // 4. Axis Enabled -- Illuminate when axis is enabled. 
  owsPendant.PLCmds[4] := axes[owsPendant.AxisSelection].Status.IsPoweredOn AND operatingMode.OperatingMode = OM_PENDANT_MODE;
  
  // 5. Axis is Disabled -- Illuminate when axis is not enabled -- this covers the alarm state also
  owsPendant.PLCmds[5] := NOT axes[owsPendant.AxisSelection].Status.IsPoweredOn AND operatingMode.OperatingMode = OM_PENDANT_MODE;
  
  // 6. Brake is Off -- Illuminate if brake is off
  owsPendant.PLCmds[6] := axes[owsPendant.AxisSelection].Status.IsBrakeManuallyReleased AND operatingMode.OperatingMode = OM_PENDANT_MODE;
  
  // 7. Z Set SOC Pos -- Illuminate if SOC position is <> 0 and axis is homed.
  owsPendant.PLCmds[7] := gr_CfgCurrent.zAxis.startOfCutPos <> 0.0 AND axes[AD_Z].Status.IsHomed AND operatingMode.OperatingMode = OM_PENDANT_MODE;
  
  // 9. Z Set Load/Unload Pos -- Illuminate if load/unload position is <> 0 and axis is homed.
  owsPendant.PLCmds[8] := gr_CfgCurrent.zAxis.loadUnloadPos <> 0.0 AND axes[AD_Z].Status.IsHomed AND operatingMode.OperatingMode = OM_PENDANT_MODE;
  
  // 9. not assigned
  owsPendant.PLCmds[9] := FALSE;

  // TEST Code -- Test LED and button electrical. Set to button states and PB lights
  (*
  owsPendant.PLCmds[1] := owsPendant.PBStates[1];
  owsPendant.PLCmds[2] := owsPendant.PBStates[2];
  owsPendant.PLCmds[3] := owsPendant.PBStates[3];
  owsPendant.PLCmds[4] := owsPendant.PBStates[4];
  owsPendant.PLCmds[5] := owsPendant.PBStates[5];
  owsPendant.PLCmds[6] := owsPendant.PBStates[6];
  owsPendant.PLCmds[7] := owsPendant.PBStates[7];
  owsPendant.PLCmds[8] := owsPendant.PBStates[8];
  owsPendant.PLCmds[9] := owsPendant.PBStates[9];
  *)
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM

