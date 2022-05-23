(********************************************************************
 * COPYRIGHT -- General Atomics
 ********************************************************************
 * File: Global.typ
 * Author: J. Sheeron
 ********************************************************************
 * Global data types of project 305841-E00002
 ********************************************************************)

TYPE

  (****************************************)
  (***** Workpiece related structures *****)
  (****************************************)
  
  (***** Information about a specific part *)
  
  sWp_Part : STRUCT (* a specific part *)
    isZCalibrated : BOOL; (* position is calibrated to process *)
    isZIndexed : BOOL; (* set when Z is at a proper index -- position is an integer multiple of index distance *)
    isOutECalibrated : BOOL; (* position is calibrated to process *)
    isInECalibrated : BOOL; (* position is calibrated to process *)
    cutPassCount : USINT; (* which cut pass is the process on *)
    zIndexCount : USINT; (* which index is Z on -- An integer rounded version of zIndexLRCount. *)
    zIndexCountSuccess : USINT; (* last index with a successful cut *)
    zIndexLRCount : LREAL; (* which index is Z on -- should normally be an integer. An LREAL for position compatability and so a proper index can be calculated *)
    serialNumber : STRING[25]; (* Part Serial Number *)
    partDfn : sWp_PartDfn; (* Part Definition used for this part *)
  END_STRUCT;

  (***** Information about a configuration or machine setup *)
  sWp_CuttingHead :	STRUCT 
    finishingPass : BOOL; (* finishing pass yes or no *)
    passCount : USINT; (* number of passes *)
    totalDepth : REAL; (* mm, finished depth *)
    finishingPassDepth : REAL; (* mm, finishing pass depth *)
    feedRate : REAL; (* mm/sec, feed rate *)
    retractRate : REAL; (* deg/sec, angular velocity used when retracting cutters. *)
    accel : REAL;
    decel : REAL;
    setZeroOffset : REAL := 0.0; (* degrees. Offset applied when set zero is requested. *)
    depthMod : REAL := 0.0; (* mm, adjusment to the calculated finished depth *)
    depthAdjAngle : LREAL; (* degrees, arc over which cut depth is adjusted. LREAL for position compatibility *)
    cutOverrunAngle : LREAL; (* degrees, arc len to overrun the last pass. LREAL for position compatibility *)
    offsetLimitPositive : LREAL; (* positive offset angle limit *)
    offsetLimitNegative : LREAL; (* negative offset angle limit *)

  END_STRUCT;

  sWp_Spindle :	STRUCT 
    nomRpm : REAL; (* RPM, nominal *)
    accel : REAL;
    decel : REAL;
  END_STRUCT;

  sWp_ZAxis :	STRUCT 
    indexSpeed : REAL; (* mm/sec *)
    accel : REAL;
    decel : REAL;
    indexDist : LREAL; (* mm. Index distance *)
    setZeroOffset : LREAL := 0.0; (* degrees. Offset applied when set zero is requested. *)
    zMod : LREAL := 0.0; (* mm, adjustment to Z position *)
    startOfCutPos : LREAL; (* position corresponding to index #1 -- start of cutting *)
    loadUnloadPos : LREAL; (* position to load/unload *)
  END_STRUCT;

  sWp_CfVfd :	STRUCT 
    isInPressureControl : BOOL; (* H: Pressure ctrl, L: Speed Control *)
    runSpeedManualCtrl : REAL; (* rpm, manual run speed *)
    pressureSpAutoCtrl : REAL; (* psi, auto pressure setpoint *)
    accel : REAL;
    decel : REAL;
    eocCutoutWaitTime : TIME; (* how long to wait while idle at the end of a cycle before shutting off the cutting fluid *)
  END_STRUCT;

  sWp_PartDfn :	STRUCT  (* a part definition, but not a specific part *)
    number : STRING[15]; (* Part Number *)
    name : STRING[40]; (* Part Name *)
    nomId : REAL; (* mm, nominal inside diameter *)
    nomCutLength : LREAL; (* mm. Nominal length that cuts are made over. LREAL to be compatible with motion system *)
  END_STRUCT;

  sWp_Configuration : STRUCT 
    name : STRING[40]; (* Config Name *)
    (* partDfn : sWp_PartDfn;  Part Definition *)
    cuttingHead : sWp_CuttingHead;
    spindle : sWp_Spindle;
    zAxis : sWp_ZAxis;
    cfVfd : sWp_CfVfd;
  END_STRUCT;

  (****************************************)
  (***** Hardware related structures  *****)
  (****************************************)

  sRioModuleHealth : STRUCT
    Slot01ModuleOk : BOOL;
    Slot02ModuleOk : BOOL;
    Slot03ModuleOk : BOOL;
    Slot04ModuleOk : BOOL;
    Slot05ModuleOk : BOOL;
    Slot06ModuleOk : BOOL;
    Slot07ModuleOk : BOOL;
    Slot08ModuleOk : BOOL;
    Slot09ModuleOk : BOOL;
    Slot10ModuleOk : BOOL;
    Slot11ModuleOk : BOOL;
    Slot12ModuleOk : BOOL;
    Slot13ModuleOk : BOOL;
    Slot14ModuleOk : BOOL;
    Slot15ModuleOk : BOOL;
    Slot16ModuleOk : BOOL;
    Slot17ModuleOk : BOOL;
    Slot18ModuleOk : BOOL;
    Slot19ModuleOk : BOOL;
    Slot20ModuleOk : BOOL;
    Slot21ModuleOk : BOOL;
    Slot22ModuleOk : BOOL;
    Slot23ModuleOk : BOOL;
    Slot24ModuleOk : BOOL;
    Slot25ModuleOk : BOOL;
    Slot26ModuleOk : BOOL;
    Slot27ModuleOk : BOOL;
    Slot28ModuleOk : BOOL;
    Slot29ModuleOk : BOOL;
    Slot30ModuleOk : BOOL;
    Slot31ModuleOk : BOOL;
    Slot32ModuleOk : BOOL;
  END_STRUCT;
 

END_TYPE
