ACTION ProcessAlarms :
  // Alarm Enable/disable. These are permanent, but include here to easily make them dynamic.
  // Tank level
  gr_AI_LT_CFTankLevel_Params.AlmEnable := FALSE; // not fitted.
  // Flow
  gr_AI_FT_CFFlow_Params.AlmEnable := FALSE; // not fitted
  // Level switch
  gr_DI_LSL_CFTank_Params.AlmEnable := FALSE; // not fitted
  // Locator
  gr_DI_ZS_CFTankLocator_Params.AlmEnable:= TRUE;
  
  // Pressure and flow sensors -- enable while pump is running
  gr_AI_PT_CFPumpOutlet_Params.AlmEnable := cfVfd.isRunning;
  gr_AI_PT_CFFilterOutlet_Params.AlmEnable := FALSE; // cfVfd.isRunning; Don't an alarm on both HP gauges
  gr_AI_DP_CFFilter_Params.AlmEnable := cfVfd.isRunning;
  gr_AI_FT_CFFlow_Params.AlmEnable := cfVfd.isRunning;

  // Put alarm status into structure
  // isLocated
  cfVfd.isLocated := DI_ZS_CFTankLocator.alms = GAPIO_ALARM_NONE;
  
  // Level switch
  cfVfd.isAlmLoLvlSw := DI_LSL_CFTank.alms <> GAPIO_ALARM_NONE;
  
  // Flow
  // consider alarm on range, channel or lo lo alms
  almMask := 	GAPIO_ALARM_RANGEHI OR GAPIO_ALARM_RANGELO OR GAPIO_ALARM_CHANNEL OR GAPIO_ALARM_LOLO;
  cfVfd.isAlmLoFlow := (AI_FT_CFFlow.alms AND almMask) <> 0;
  // consider warning on lo alm
  almMask := GAPIO_ALARM_LO;
  cfVfd.isWarnLoFlow := (AI_FT_CFFlow.alms AND almMask) <> 0;
  
  // Fluid Level
  // consider alarm on range, channel or lo lo alms
  almMask := 	GAPIO_ALARM_RANGEHI OR GAPIO_ALARM_RANGELO OR GAPIO_ALARM_CHANNEL OR GAPIO_ALARM_LOLO;
  cfVfd.isAlmLoFluid := (AI_LT_CFTankLevel.alms AND almMask) <> 0;
  // consider warning on lo alm
  almMask := 	GAPIO_ALARM_LO;
  cfVfd.isWarnLoFluid := (AI_LT_CFTankLevel.alms AND almMask) <> 0;
  
  // Pump Outlet pressure
  // consider alarm on hi range, channel or hi hi alms
  almMask := 	GAPIO_ALARM_RANGEHI OR GAPIO_ALARM_CHANNEL OR GAPIO_ALARM_HIHI;
  cfVfd.isAlmHiOutletPressure := (AI_PT_CFPumpOutlet.alms AND almMask) <> 0;
  // consider alarm on range, channel or lo lo alms
  almMask := 	GAPIO_ALARM_RANGELO OR GAPIO_ALARM_LOLO;
  cfVfd.isAlmLoOutletPressure := (AI_PT_CFPumpOutlet.alms AND almMask) <> 0;
  // consider warning on lo alm
  almMask := 	GAPIO_ALARM_LO;
  cfVfd.isWarnLoOutletPressure := (AI_PT_CFPumpOutlet.alms AND almMask) <> 0;
  // consider warning on hi alm
  almMask := 	GAPIO_ALARM_HI;
  cfVfd.isWarnHiOutletPressure := (AI_PT_CFPumpOutlet.alms AND almMask) <> 0;
  
  // Hi Filter DP -- channel and range will trigger hi and low 
  almMask := 	GAPIO_ALARM_RANGEHI OR GAPIO_ALARM_RANGELO OR GAPIO_ALARM_CHANNEL OR GAPIO_ALARM_HI;
  cfVfd.isWarnHiFilterDp := (AI_DP_CFFilter.alms AND almMask) <> 0;
  // Lo Filter DP -- channel and range will trigger hi and low
  almMask := 	GAPIO_ALARM_RANGEHI OR GAPIO_ALARM_RANGELO OR GAPIO_ALARM_CHANNEL OR GAPIO_ALARM_LO;
  cfVfd.isWarnLoFilterDp := (AI_DP_CFFilter.alms AND almMask) <> 0;
  
  // Alarm and warning summaries
  cfVfd.isWarnSummary := cfVfd.isWarnLoFlow OR cfVfd.isWarnLoFluid OR
  cfVfd.isWarnLoOutletPressure OR cfVfd.isWarnHiOutletPressure OR 
  cfVfd.isWarnLoFilterDp OR cfVfd.isWarnHiFilterDp;
  
  cfVfd.isAlmSummary := cfVfd.isAlmLoFlow OR cfVfd.isAlmLoLvlSw OR 
  cfVfd.isAlmLoFluid OR cfVfd.isAlmLoOutletPressure OR cfVfd.isAlmHiOutletPressure;
  
END_ACTION
  
