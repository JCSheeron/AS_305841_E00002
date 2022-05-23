
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
    // axes[AD_CF_VFD].Status.IsHomed AND // homing not possible with inverter axis
    // cfVfd.isLocated AND // bypass for testing
    NOT cfVfd.isAlmLoLvlSw AND NOT cfVfd.isAlmLoFluid;
    

  cfVfd.isAllowedToRun := 
    cfVfd.isAllowedToStart AND
    NOT cfVfd.isAlmLoFlow AND NOT cfVfd.isAlmLoOutletPressure AND
    NOT cfVfd.isAlmHiOutletPressure;
    
  // Map the axis status to the cf structure to get a running bit
  cfVfd.isRunning := axes[AD_CF_VFD].Status.IsMoveActive;
 
  // Determine when good flow is established -- time delay no flow problems
  tmrCfFlowOk(IN:= cfVfd.isRunning AND NOT cfVfd.isAlmLoFlow, PT:= timeCfFlowOk);
  cfVfd.isFlowEstablished := tmrCfFlowOk.Q;

  // TESTING: Bypass CfVfd permits
  cfVfd.isAllowedToStart := TRUE;
  cfVfd.isAllowedToRun := TRUE;
  cfVfd.isFlowEstablished := TRUE;
  // cfVfd.isRunning := TRUE;
    
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM

