// Update step 
partMotion.prodCycleStepCurrent := PCS_ENABLE_AXES;

// machine is in cycle
operatingMode.isInCycle := TRUE;
operatingMode.isStopping := FALSE;
// Set in cycle signal to safe PLC
ts_InCycle := TRUE;

// Lock the cutting fluid gate in cycle
ts_cfLockGate := TRUE;

// Init pass count to the first pass
gr_PartCurrent.cutPassCount := 1;

// Reset step hold and timeout timers
tmrStepMin(IN:= FALSE, PT:= T#100ms);
tmrStepTO(IN:= FALSE, PT:= T#2s);


// Set the vfd speed, and request start if not already running
// Request to start now, check for flow in a little bit.
// TODO:
// cfVfd.ReqAutoSpeedEU := gr_CfgCurrent.cfVfd.speedPct;
// cfVfd.ReqAutoStart := cfVfd.State = MTRVFD_REM_AUTO_STOP;

// Enable the axes if they are not already
axes[AD_SPINDLE].Commands.EnableReq := (axes[AD_SPINDLE].Status.PlcOpenState = mcAXIS_DISABLED);
axes[AD_OUTER_ECCENTRIC].Commands.EnableReq := (axes[AD_OUTER_ECCENTRIC].Status.PlcOpenState = mcAXIS_DISABLED);
axes[AD_INNER_ECCENTRIC].Commands.EnableReq := (axes[AD_INNER_ECCENTRIC].Status.PlcOpenState = mcAXIS_DISABLED);
axes[AD_Z].Commands.EnableReq := (axes[AD_Z].Status.PlcOpenState = mcAXIS_DISABLED);

// Decouple the inner eccentric from the outer eccentric to start with. This is so
// the inner eccentric can be easily moved back to zero depth position if this is needed.
// It will already be decoupled if the axis was disabled. It could have been
// enabled and coupled while waiting for a cycle start -- in which case it could still be 
// coupled.
axes[AD_OUTER_ECCENTRIC].CouplingParameters.GearOutReq:= TRUE;
axes[AD_OUTER_ECCENTRIC].CouplingParameters.CamOutReq:= TRUE;
