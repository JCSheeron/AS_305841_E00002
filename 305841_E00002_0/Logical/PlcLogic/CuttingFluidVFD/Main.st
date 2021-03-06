
PROGRAM _INIT
 
  // Flow established time
  timeCfFlowOk := T#5s;
    
END_PROGRAM

PROGRAM _CYCLIC
	
  // Process the alarms
  ProcessAlarms;
  
  cfVfd.isAllowedToStart := 
    (operatingMode.OperatingMode = OM_MANUAL_MODE OR
    operatingMode.OperatingMode = OM_PENDANT_MODE OR
    operatingMode.OperatingMode = OM_PRODUCTION_MODE) AND
    axes[AD_CF_VFD].Status.IsPoweredOn AND
    // VFD is present and waiting for next command, accel, or decel
    cfVfd.isModuleOk AND
    cfVfd.DevSpecStatus >= 2 AND
    cfVfd.DevSpecStatus <= 6 AND
    // axes[AD_CF_VFD].Status.IsHomed AND // homing not possible with inverter axis
    cfVfd.isLocated AND
    NOT cfVfd.isAlmLoLvlSw AND NOT cfVfd.isAlmLoFluid;
    

  cfVfd.isAllowedToRun := 
    cfVfd.isAllowedToStart AND
    NOT cfVfd.isAlmLoFlow AND 
    NOT cfVfd.isAlmHiOutletPressure; 
    // no device errors
    // cfVfd.DevSpecError = 0 AND
    // cfVfd.StdError = 0;
    
  // Map the axis status to the cf structure to get a running bit
  cfVfd.isRunning := axes[AD_CF_VFD].Status.IsMoveActive;
 
  // Determine when good flow is established -- time delay no flow problems
  tmrCfFlowOk(IN:= cfVfd.isRunning AND NOT cfVfd.isAlmLoFlow AND NOT cfVfd.isAlmLoOutletPressure, PT:= timeCfFlowOk);
  cfVfd.isFlowEstablished := tmrCfFlowOk.Q;

  // TESTING: Bypass CfVfd permits
  // cfVfd.isAllowedToStart := TRUE;
  // cfVfd.isAllowedToRun := TRUE;
  // cfVfd.isFlowEstablished := TRUE;
  // cfVfd.isRunning := TRUE;
    
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM

