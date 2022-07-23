
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
    PCS_START_CF        := 8,
    PCS_ZERO_DEPTH      := 9,
    PCS_Z_TO_SOC        := 10,
    PCS_NEXT_CYCLE      := 11,
    PCS_START_SPINDLE   := 12,
    PCS_COUPLE_ECC      := 13,
    PCS_START_PASS      := 14,
    PCS_SYNCHING1       := 15,
    PCS_SYNCHING2       := 16,
    PCS_SYNCHING3       := 17,
    PCS_AXES_SYNCHED    := 18,
    PCS_SET_NEXT_PASS   := 19,
    PCS_SET_FINISH_PASS := 20,
    PCS_SET_RETRACT     := 21,
    PCS_STOP_SPINDLE    := 22,
    PCS_INDEX_Z_WAIT    := 23,
    PCS_CF_OFF1         := 24,
    PCS_CF_OFF2         := 25,
    PCS_Z_TO_UNLOAD     := 26,
    PCS_DONE_WAIT       := 27,
    PCS_INDEX_Z         := 28,
    PCS_EOC_WAIT        := 29,
    PCS_CF_TO           := 30,
    PCS_START_CF2       := 31,
    (* cycle stop related *)
    PCS_CYCLE_STOP      := 32,
    PCS_CS_STOP_AXES    := 33,
    PCS_CS_ZERO_DEPTH   := 34,
    PCS_CS_STOP_SPINDLE := 35,
    PCS_CS_DISABLE_AXES := 36,
    PCS_CS_STOP_CF      := 37
  ) := PCS_INIT;

  
 END_TYPE
