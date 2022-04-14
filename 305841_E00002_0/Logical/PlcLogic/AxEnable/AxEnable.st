
PROGRAM _INIT
	 
END_PROGRAM

PROGRAM _CYCLIC

  // TODO: Decide when drives shall be enabled by the PLC
  // For now, enable them for easy initial testing.
  // H: Enable, L: Stop
  axes[AD_SPINDLE].Commands.PlcSafetyEnable := TRUE;
  axes[AD_OUTER_ECCENTRIC].Commands.PlcSafetyEnable := TRUE;
  axes[AD_INNER_ECCENTRIC].Commands.PlcSafetyEnable := TRUE;
  axes[AD_Z].Commands.PlcSafetyEnable := TRUE;
  
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
  
	 
END_PROGRAM

