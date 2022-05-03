
TYPE
  ePROD_CYCLE_STEP : 
    (
    PCS_UNKNOWN         := 0,
    PCS_INIT            := 1,
    PCS_MODE_CHECK      := 2,
    PCS_WAIT_FOR_PROD   := 3,
    PCS_WAIT_FOR_START  := 4,
    PCS_DECOUPLE_ECC    := 5,
    PCS_RESET_AXES      := 6,
    PCS_ENABLE_AXES     := 7,
    PCS_ZERO_DEPTH      := 8,
    PCS_Z_TO_SOC        := 9,
    PCS_NEXT_CYCLE      := 10,
    PCS_START_SPINDLE   := 11,
    PCS_COUPLE_ECC      := 12,
    PCS_START_PASS      := 13,
    PCS_SYNCHING1       := 14,
    PCS_SYNCHING2       := 15,
    PCS_SYNCHING3       := 16,
    PCS_AXES_SYNCHED    := 17,
    PCS_SET_NEXT_PASS   := 18,
    PCS_SET_FINISH_PASS := 19,
    PCS_SET_RETRACT     := 20,
    PCS_STOP_SPINDLE    := 21,
    PCS_INDEX_Z_WAIT    := 22,
    PCS_CF_OFF1         := 23,
    PCS_CF_OFF2         := 24,
    PCS_Z_TO_UNLOAD     := 25,
    PCS_DONE_WAIT       := 26,
    PCS_INDEX_Z         := 27,
    PCS_EOC_WAIT        := 28,
    PCS_CF_TO           := 29,
    PCS_START_CF2       := 30,
    PCS_CYCLE_STOP      := 31,
    PCS_CS_STOP_AXES    := 32,
    PCS_CS_ZERO_DEPTH   := 33,
    PCS_CS_STOP_SPINDLE := 34,
    PCS_CS_DISABLE_AXES := 35,
    PCS_CS_STOP_CF      := 36
  ) := PCS_INIT;

  (* motion params derrived from machine/part config and process point *)
  sPartMotion : STRUCT
    warnAdjAngleTooSmall : BOOL; (* H: depth adj angle too small for fee rate and/or cutting depth *)
    totalIndexes : USINT; (* number of Z Indexes needed to process a part *)
    prodCycleStepCurrent : ePROD_CYCLE_STEP; (* last completed production cycle step *)
    passDepth : REAL; (* mm. cut pass depth *)
    cutVelocity : REAL; (* deg/sec. Inner and Outer Eccentric velocity while cutting *)
    depthAdjVelocity : REAL; (* deg/sec. **Average/Approx** velocity when adjusting depth. For infomation purposes only. *)
    depthAdjAngle : LREAL; (* degrees. Adjusted angle over which to adjust the cutting depth (i.e. offset angle). LREAL to be compatible with motion positions *)
    depthAdjAngleMin : LREAL; (* degrees. Calculated minimum adj angle given a feed rate, offset angle -- can't overspeed the inner axis (constrained by inner axis max vel *)
    passOffsetAngle : LREAL; (* +/-180 deg, +: I leads O, -: O leads I. LREAL to be compatible with motion positions *)
    finishPassOffsetAngle :  LREAL; (* +/-180 deg, +: I leads O, -: O leads I. LREAL to be compatible with motion positions  *)
    passDistance : LREAL; (* degrees. pass move distance, including starting depth adjust, and overcut. LREAL to be compatible with motion positions *)
    startOfPassPosition : LREAL; (* Where did this pass start. LREAL to be compatible with motion positions *)
    endOfPassPosition : LREAL; (* degrees calculated position at end of the pass. LREAL to be compatible with motion positions *)
    calcNextAdjPosition : LREAL; (* azimuth point where the next adjusment completes. LREAL to be compatible with motion positions *)
    calcNextAdjDistance : LREAL; (* degrees. Need to travel this far before setting up the next adjustment. LREAL to be compatible with motion positions *)
    passDistanceTraveled : LREAL; (* degrees. How far have we traveled during this pass. LREAL to be compatible with motion positions *)
  END_STRUCT;
  
  
 END_TYPE
