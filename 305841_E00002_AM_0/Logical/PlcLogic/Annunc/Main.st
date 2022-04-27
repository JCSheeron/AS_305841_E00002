
PROGRAM _INIT
  tmr025Hz.PT := T#250ms;
  tmr050Hz.PT := T#500ms;
  tmr100Hz.PT := T#1000ms;
END_PROGRAM

PROGRAM _CYCLIC
  
  // Create blinking bits (global variables), 50% duty cycle
  // 0.25 Hz (4x/sec)
  tmr025Hz(IN:= NOT tmr025Hz.Q);
  IF tmr025Hz.Q THEN
    blink025Hz := NOT blink025Hz;
  END_IF;
  // 0.5 Hz (2x/sec)
  tmr050Hz(IN:= NOT tmr050Hz.Q);
  IF tmr050Hz.Q THEN
    blink050Hz := NOT blink050Hz;
  END_IF;
  // 1.0 Hz (1x/sec)
  tmr100Hz(IN:= NOT tmr100Hz.Q);
  IF tmr100Hz.Q THEN
    blink100Hz := NOT blink100Hz;
  END_IF;
  
  // Light the 480 VAC Okay lamp on the OWS if the power monitor in the MCP is okay.
  DO_PL_OWSAmber :=  DI_JI_480VACOk.Value;
  
  // Light the green ready light if in production mode and 
  DO_PL_OWSGreen := operatingMode.OperatingMode = OM_PRODUCTION_MODE AND cyclePermissives.allowCycleStart;
  
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM

