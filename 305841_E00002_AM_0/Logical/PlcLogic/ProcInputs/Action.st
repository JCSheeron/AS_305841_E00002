
ACTION SetInputParams: 
  // Default CF Flow Params
  gr_AI_FT_CFFlow_Params.LpEnable := FALSE; 
  gr_AI_FT_CFFlow_Params.LpPreserveUnfiltered := TRUE; //F: unfiltered = filtered, T: keep separate
  gr_AI_FT_CFFlow_Params.AlmEnable := FALSE; // Not fitted. Set once fitted to enable alarming
  gr_AI_FT_CFFlow_Params.AlmLoLoEnable := TRUE;
  gr_AI_FT_CFFlow_Params.AlmLoEnable := TRUE;
  gr_AI_FT_CFFlow_Params.AlmHiEnable := FALSE;
  gr_AI_FT_CFFlow_Params.AlmHiHiEnable := FALSE; // alarm thresholds - compare to EU (scaled) values
  gr_AI_FT_CFFlow_Params.RawType := GAPIO_RWST_INT;
  // scaling parameters
  // scaling TBD
  gr_AI_FT_CFFlow_Params.CalcEUExternally := FALSE;
  gr_AI_FT_CFFlow_Params.RawMin := 0.0;
  gr_AI_FT_CFFlow_Params.RawMax := 32767.0;
  gr_AI_FT_CFFlow_Params.EuMin := 0.0;
  gr_AI_FT_CFFlow_Params.EuMax := 100.0;
  gr_AI_FT_CFFlow_Params.RawOffset := 0.0; // +/- counts value added to the raw value before scaling 
  gr_AI_FT_CFFlow_Params.EuOffset := 0.0; // +/- EU value added to EU after scaling
  // Low Pass (Noise) filter parameters
  gr_AI_FT_CFFlow_Params.LpCoeff := 0.0; // >=0 and <1. 0= no filtering. 0.99999= heavy filtering.
  // alarm enables
  gr_AI_FT_CFFlow_Params.AlmRangeThreshLo := -1.0E9;
  gr_AI_FT_CFFlow_Params.AlmRangeThreshHi := 1.0E9;
  gr_AI_FT_CFFlow_Params.AlmThreshLoLo := -1.0E9;
  gr_AI_FT_CFFlow_Params.AlmThreshLo := -1.0E9;
  gr_AI_FT_CFFlow_Params.AlmThreshHi := 1.0E9;
  gr_AI_FT_CFFlow_Params.AlmThreshHiHi := 1.0E9;
  // Alarm deadbands in % of range EU range. Use 0.0 to disable
  gr_AI_FT_CFFlow_Params.AlmDbLoPct := 1.0; // pvs must rise above threshold by the corresponding value in order to be considered clear
  gr_AI_FT_CFFlow_Params.AlmDbHiPct := 1.0; // pvs must drop below threshold by the corresponding value in order to be considered clear
  // alarm time delays. Use T#0ms time to disable
  gr_AI_FT_CFFlow_Params.AlmLoOnDlyTime := T#5s;
  gr_AI_FT_CFFlow_Params.AlmHiOnDlyTime := T#1s;
  // alarm off delay time - condition must clear for this long before being considered "gone"
  gr_AI_FT_CFFlow_Params.AlmLoOffDlyTime := T#1s;
  gr_AI_FT_CFFlow_Params.AlmHiOffDlyTime := T#1s;

  // Default Tank Level Params
  gr_AI_LT_CFTankLevel_Params.LpEnable := FALSE; 
  gr_AI_LT_CFTankLevel_Params.LpPreserveUnfiltered := TRUE; //F: unfiltered = filtered, T: keep separate
  gr_AI_LT_CFTankLevel_Params.AlmEnable := FALSE; // Not fitted. Set once fitted to enable alarming
  gr_AI_LT_CFTankLevel_Params.AlmLoLoEnable := TRUE;
  gr_AI_LT_CFTankLevel_Params.AlmLoEnable := TRUE;
  gr_AI_LT_CFTankLevel_Params.AlmHiEnable := FALSE;
  gr_AI_LT_CFTankLevel_Params.AlmHiHiEnable := FALSE; // alarm thresholds - compare to EU (scaled) values
  gr_AI_LT_CFTankLevel_Params.RawType := GAPIO_RWST_INT;
  // scaling parameters
  // scaling TBD
  gr_AI_LT_CFTankLevel_Params.CalcEUExternally := FALSE;
  gr_AI_LT_CFTankLevel_Params.RawMin := 0.0;
  gr_AI_LT_CFTankLevel_Params.RawMax := 32767.0;
  gr_AI_LT_CFTankLevel_Params.EuMin := 0.0;
  gr_AI_LT_CFTankLevel_Params.EuMax := 100.0;
  gr_AI_LT_CFTankLevel_Params.RawOffset := 0.0; // +/- counts value added to the raw value before scaling 
  gr_AI_LT_CFTankLevel_Params.EuOffset := 0.0; // +/- EU value added to EU after scaling
  // Low Pass (Noise) filter parameters
  gr_AI_LT_CFTankLevel_Params.LpCoeff := 0.0; // >=0 and <1. 0= no filtering. 0.99999= heavy filtering.
  // alarm enables
  gr_AI_LT_CFTankLevel_Params.AlmRangeThreshLo := -1.0E9;
  gr_AI_LT_CFTankLevel_Params.AlmRangeThreshHi := 1.0E9;
  gr_AI_LT_CFTankLevel_Params.AlmThreshLoLo := -1.0E9;
  gr_AI_LT_CFTankLevel_Params.AlmThreshLo := -1.0E9;
  gr_AI_LT_CFTankLevel_Params.AlmThreshHi := 1.0E9;
  gr_AI_LT_CFTankLevel_Params.AlmThreshHiHi := 1.0E9;
  // Alarm deadbands in % of range EU range. Use 0.0 to disable
  gr_AI_LT_CFTankLevel_Params.AlmDbLoPct := 1.0; // pvs must rise above threshold by the corresponding value in order to be considered clear
  gr_AI_LT_CFTankLevel_Params.AlmDbHiPct := 1.0; // pvs must drop below threshold by the corresponding value in order to be considered clear
  // alarm time delays. Use T#0ms time to disable
  gr_AI_LT_CFTankLevel_Params.AlmLoOnDlyTime := T#5s;
  gr_AI_LT_CFTankLevel_Params.AlmHiOnDlyTime := T#1s;
  // alarm off delay time - condition must clear for this long before being considered "gone"
  gr_AI_LT_CFTankLevel_Params.AlmLoOffDlyTime := T#1s;
  gr_AI_LT_CFTankLevel_Params.AlmHiOffDlyTime := T#1s;
  
  // Default Pump Outlet Pressure Params
  gr_AI_PT_CFPumpOutlet_Params.LpEnable := TRUE; 
  gr_AI_PT_CFPumpOutlet_Params.LpPreserveUnfiltered := TRUE; //F: unfiltered = filtered, T: keep separate
  // gr_AI_PT_CFPumpOutlet_Params.AlmEnable := TRUE; // Dynamic, set in CF VFD
  gr_AI_PT_CFPumpOutlet_Params.AlmLoLoEnable := TRUE;
  gr_AI_PT_CFPumpOutlet_Params.AlmLoEnable := TRUE;
  gr_AI_PT_CFPumpOutlet_Params.AlmHiEnable := TRUE;
  gr_AI_PT_CFPumpOutlet_Params.AlmHiHiEnable := TRUE; // alarm thresholds - compare to EU (scaled) values
  gr_AI_PT_CFPumpOutlet_Params.RawType := GAPIO_RWST_UINT; // UINT in the IO-Link case
  // scaling parameters
  // IO-Link is scaled at the device, but adheres to a mfg given formula
  // Pressure in bar = (measured value * Gradient) + Offset
  // This calc is done and the scaled value is set outside the fb
  gr_AI_PT_CFPumpOutlet_Params.CalcEUExternally := TRUE; // CALC EU Outside scaling fb!! 
  gr_AI_PT_CFPumpOutlet_Params.RawMin := 5120.0;
  gr_AI_PT_CFPumpOutlet_Params.RawMax := 60415.0;
  gr_AI_PT_CFPumpOutlet_Params.EuMin := 0.0;  // 0-100 BAR in PSI but not used directly with external calc scaling
  gr_AI_PT_CFPumpOutlet_Params.EuMax := 1450.38;
  gr_AI_PT_CFPumpOutlet_Params.RawOffset := 0.0; // +/- counts value added to the raw value before scaling 
  gr_AI_PT_CFPumpOutlet_Params.EuOffset := 0.0; // +/- EU value added to EU after scaling
  // Low Pass (Noise) filter parameters
  gr_AI_PT_CFPumpOutlet_Params.LpCoeff := 0.95; // >=0 and <1. 0= no filtering. 0.99999= heavy filtering.
  // alarm enables
  gr_AI_PT_CFPumpOutlet_Params.AlmRangeThreshLo := gr_AI_PT_CFPumpOutlet_Params.EuMin;
  gr_AI_PT_CFPumpOutlet_Params.AlmRangeThreshHi := gr_AI_PT_CFPumpOutlet_Params.EuMax;
  gr_AI_PT_CFPumpOutlet_Params.AlmThreshLoLo := 40.0; // TODO: Figure out the alm thresholds
  gr_AI_PT_CFPumpOutlet_Params.AlmThreshLo := 60.0;
  // Seal has a 300 PSI limit and there is some other limitation at 150 PSI-- keep 'er under this
  gr_AI_PT_CFPumpOutlet_Params.AlmThreshHi := 150.0 * 0.80;
  gr_AI_PT_CFPumpOutlet_Params.AlmThreshHiHi := 150.0 * 0.95;
  // Alarm deadbands in % of range EU range. Use 0.0 to disable
  // Specified here in EU, and converted to a percent
  gr_AI_PT_CFPumpOutlet_Params.AlmDbLoPct := (3.0 / (gr_AI_PT_CFPumpOutlet_Params.EuMax - gr_AI_PT_CFPumpOutlet_Params.EuMin)) * 100.0; // pvs must rise above threshold by the corresponding value in order to be considered clear
  gr_AI_PT_CFPumpOutlet_Params.AlmDbHiPct := (3.0 / (gr_AI_PT_CFPumpOutlet_Params.EuMax - gr_AI_PT_CFPumpOutlet_Params.EuMin)) * 100.0; // pvs must drop below threshold by the corresponding value in order to be considered clear
  // alarm time delays. Use T#0ms time to disable
  gr_AI_PT_CFPumpOutlet_Params.AlmLoOnDlyTime := T#5s;
  gr_AI_PT_CFPumpOutlet_Params.AlmHiOnDlyTime := T#5s;
  // alarm off delay time - condition must clear for this long before being considered "gone"
  gr_AI_PT_CFPumpOutlet_Params.AlmLoOffDlyTime := T#1s;
  gr_AI_PT_CFPumpOutlet_Params.AlmHiOffDlyTime := T#1s;
  
  // Default Filter Outlet Pressure Params
  gr_AI_PT_CFFilterOutlet_Params.LpEnable := TRUE; 
  gr_AI_PT_CFFilterOutlet_Params.LpPreserveUnfiltered := TRUE; // F: unfiltered = filtered, T: keep separate
  // gr_AI_PT_CFFilterOutlet_Params.AlmEnable := TRUE; // Dynamic, set in CF VFD
  gr_AI_PT_CFFilterOutlet_Params.AlmLoLoEnable := TRUE;
  gr_AI_PT_CFFilterOutlet_Params.AlmLoEnable := TRUE;
  gr_AI_PT_CFFilterOutlet_Params.AlmHiEnable := TRUE;
  gr_AI_PT_CFFilterOutlet_Params.AlmHiHiEnable := TRUE; // alarm thresholds - compare to EU (scaled) values
  gr_AI_PT_CFFilterOutlet_Params.RawType := GAPIO_RWST_UINT; // UINT in the IO-Link case
  // scaling parameters
  // IO-Link is scaled at the device
  gr_AI_PT_CFFilterOutlet_Params.CalcEUExternally := TRUE; // CALC EU Outside scaling fb!! 
  gr_AI_PT_CFFilterOutlet_Params.RawMin := 5120.0;
  gr_AI_PT_CFFilterOutlet_Params.RawMax := 60415.0;
  gr_AI_PT_CFFilterOutlet_Params.EuMin := 0.0;  // 0-100 BAR in PSI but not used directly with external calc scaling
  gr_AI_PT_CFFilterOutlet_Params.EuMax := 1450.38;
  gr_AI_PT_CFFilterOutlet_Params.RawOffset := 0.0; // +/- counts value added to the raw value before scaling 
  gr_AI_PT_CFFilterOutlet_Params.EuOffset := 0.0; // +/- EU value added to EU after scaling
  // Low Pass (Noise) filter parameters
  gr_AI_PT_CFFilterOutlet_Params.LpCoeff := 0.95; // >=0 and <1. 0= no filtering. 0.99999= heavy filtering.
  // alarm enables
  gr_AI_PT_CFFilterOutlet_Params.AlmRangeThreshLo := gr_AI_PT_CFFilterOutlet_Params.EuMin;
  gr_AI_PT_CFFilterOutlet_Params.AlmRangeThreshHi := gr_AI_PT_CFFilterOutlet_Params.EuMax;
  gr_AI_PT_CFFilterOutlet_Params.AlmThreshLoLo := 40.0;
  gr_AI_PT_CFFilterOutlet_Params.AlmThreshLo := 60.0;
  // Seal has a 300 PSI limit and there is some other limitation at 150 PSI-- keep 'er under this
  gr_AI_PT_CFFilterOutlet_Params.AlmThreshHi := 150.0 * 0.80;
  gr_AI_PT_CFFilterOutlet_Params.AlmThreshHiHi := 150.0 * 0.95;
  // Alarm deadbands in % of range EU range. Use 0.0 to disable
  // Specified here in EU, and converted to a percent
  gr_AI_PT_CFFilterOutlet_Params.AlmDbLoPct := (3.0 / (gr_AI_PT_CFFilterOutlet_Params.EuMax - gr_AI_PT_CFFilterOutlet_Params.EuMin)) * 100.0; // pvs must rise above threshold by the corresponding value in order to be considered clear
  gr_AI_PT_CFFilterOutlet_Params.AlmDbHiPct := (3.0 / (gr_AI_PT_CFFilterOutlet_Params.EuMax - gr_AI_PT_CFFilterOutlet_Params.EuMin)) * 100.0; // pvs must drop below threshold by the corresponding value in order to be considered clear
  // alarm time delays. Use T#0ms time to disable
  gr_AI_PT_CFFilterOutlet_Params.AlmLoOnDlyTime := T#5s;
  gr_AI_PT_CFFilterOutlet_Params.AlmHiOnDlyTime := T#5s;
  // alarm off delay time - condition must clear for this long before being considered "gone"
  gr_AI_PT_CFFilterOutlet_Params.AlmLoOffDlyTime := T#1s;
  gr_AI_PT_CFFilterOutlet_Params.AlmHiOffDlyTime := T#1s;

  // Default Filter Outlet Pressure Params
  // "Virtual" input derrived from the 2 PTs above
  gr_AI_DP_CFFilter_Params.LpEnable := TRUE; 
  gr_AI_DP_CFFilter_Params.LpPreserveUnfiltered := TRUE; //F: unfiltered = filtered, T: keep separate
  // gr_AI_DP_CFFilter_Params.AlmEnable := TRUE; // Dynamic, set in CF VFD
  gr_AI_DP_CFFilter_Params.AlmLoLoEnable := TRUE;
  gr_AI_DP_CFFilter_Params.AlmLoEnable := TRUE;
  gr_AI_DP_CFFilter_Params.AlmHiEnable := TRUE;
  gr_AI_DP_CFFilter_Params.AlmHiHiEnable := TRUE; // alarm thresholds - compare to EU (scaled) values
  gr_AI_DP_CFFilter_Params.RawType := GAPIO_RWST_INT;
  // scaling parameters
  // IO-Link is scaled at the device
  gr_AI_DP_CFFilter_Params.RawMin := 0.0;
  gr_AI_DP_CFFilter_Params.RawMax := 1450.38;
  gr_AI_DP_CFFilter_Params.EuMin := 0.0;
  gr_AI_DP_CFFilter_Params.EuMax := 1450.38;
  gr_AI_DP_CFFilter_Params.RawOffset := 0.0; // +/- counts value added to the raw value before scaling 
  gr_AI_DP_CFFilter_Params.EuOffset := 0.0; // +/- EU value added to EU after scaling
  // Low Pass (Noise) filter parameters
  gr_AI_DP_CFFilter_Params.LpCoeff := 0.95; // >=0 and <1. 0= no filtering. 0.99999= heavy filtering.
  // alarm enables
  // TBD
  gr_AI_DP_CFFilter_Params.AlmRangeThreshLo := gr_AI_DP_CFFilter_Params.EuMin;
  gr_AI_DP_CFFilter_Params.AlmRangeThreshHi := gr_AI_DP_CFFilter_Params.EuMax;
  gr_AI_DP_CFFilter_Params.AlmThreshLoLo := 0.0;
  gr_AI_DP_CFFilter_Params.AlmThreshLo := 0.0;
  gr_AI_DP_CFFilter_Params.AlmThreshHi := 300.0;
  gr_AI_DP_CFFilter_Params.AlmThreshHiHi := 300.0;
  // Alarm deadbands in % of range EU range. Use 0.0 to disable
  // Specified here in EU, and converted to a percent
  gr_AI_DP_CFFilter_Params.AlmDbLoPct := (1.0 / (gr_AI_DP_CFFilter_Params.EuMax - gr_AI_DP_CFFilter_Params.EuMin)) * 100.0; // pvs must rise above threshold by the corresponding value in order to be considered clear
  gr_AI_DP_CFFilter_Params.AlmDbHiPct := (1.0 / (gr_AI_DP_CFFilter_Params.EuMax - gr_AI_DP_CFFilter_Params.EuMin)) * 100.0; // pvs must drop below threshold by the corresponding value in order to be considered clear
  // alarm time delays. Use T#0ms time to disable
  gr_AI_DP_CFFilter_Params.AlmLoOnDlyTime := T#5s;
  gr_AI_DP_CFFilter_Params.AlmHiOnDlyTime := T#5s;
  // alarm off delay time - condition must clear for this long before being considered "gone"
  gr_AI_DP_CFFilter_Params.AlmLoOffDlyTime := T#1s;
  gr_AI_DP_CFFilter_Params.AlmHiOffDlyTime := T#1s;
  
  // Tank low level switch params
  gr_DI_LSL_CFTank_Params.Enable := FALSE; // H: process, L: Ignore. Not fitted. Set once fitted to enable processing and alarming
  gr_DI_LSL_CFTank_Params.AlmEnable := FALSE; 
  // Sensor should be fail safe, so low signal is a low (alarm) level, 
  gr_DI_LSL_CFTank_Params.AlmLoEnable := TRUE; // set to enable alarm if value is low 
  gr_DI_LSL_CFTank_Params.AlmHiEnable := FALSE; // set to enable alarm if value is high
  gr_DI_LSL_CFTank_Params.Invert := FALSE;
  gr_DI_LSL_CFTank_Params.OnDlyTime := T#500ms; // delay time for value turning on
  gr_DI_LSL_CFTank_Params.OffDlyTime := T#500ms; // delay time for value turning off
  gr_DI_LSL_CFTank_Params.AlmLoOnDlyTime := T#3s;
  gr_DI_LSL_CFTank_Params.AlmHiOnDlyTime := T#1s;
  gr_DI_LSL_CFTank_Params.AlmLoOffDlyTime := T#1s;
  gr_DI_LSL_CFTank_Params.AlmHiOffDlyTime := T#1s;
  
  // Tank locator params
  gr_DI_ZS_CFTankLocator_Params.Enable := TRUE; // H: process, L: Ignore.
  gr_DI_ZS_CFTankLocator_Params.AlmEnable := TRUE;
  // Sensor should be fail safe, so low signal is an alarm
  gr_DI_ZS_CFTankLocator_Params.AlmLoEnable := TRUE; // set to enable alarm if value is low 
  gr_DI_ZS_CFTankLocator_Params.AlmHiEnable := FALSE; // set to enable alarm if value is high
  gr_DI_ZS_CFTankLocator_Params.Invert := FALSE;
  gr_DI_ZS_CFTankLocator_Params.OnDlyTime := T#500ms; // delay time for value turning on
  gr_DI_ZS_CFTankLocator_Params.OffDlyTime := T#500ms; // delay time for value turning off
  gr_DI_ZS_CFTankLocator_Params.AlmLoOnDlyTime := T#3s;
  gr_DI_ZS_CFTankLocator_Params.AlmHiOnDlyTime := T#1s;
  gr_DI_ZS_CFTankLocator_Params.AlmLoOffDlyTime := T#1s;
  gr_DI_ZS_CFTankLocator_Params.AlmHiOffDlyTime := T#1s;

  // 480 VAC Monitor
  gr_DI_ZS_CFTankLocator_Params.Enable := TRUE; // H: process, L: Ignore.
  // Indication only, no alarming needed.
  gr_DI_ZS_CFTankLocator_Params.AlmEnable := FALSE;
  // Sensor should be fail safe, so low signal is an alarm
  gr_DI_ZS_CFTankLocator_Params.AlmLoEnable := FALSE; // set to enable alarm if value is low 
  gr_DI_ZS_CFTankLocator_Params.AlmHiEnable := FALSE; // set to enable alarm if value is high
  gr_DI_ZS_CFTankLocator_Params.Invert := FALSE;
  gr_DI_ZS_CFTankLocator_Params.OnDlyTime := T#2s; // delay to make sure signal is present
  gr_DI_ZS_CFTankLocator_Params.OffDlyTime := T#0ms; // delay time for value turning off
  gr_DI_ZS_CFTankLocator_Params.AlmLoOnDlyTime := T#3s;
  gr_DI_ZS_CFTankLocator_Params.AlmHiOnDlyTime := T#1s;
  gr_DI_ZS_CFTankLocator_Params.AlmLoOffDlyTime := T#1s;
  gr_DI_ZS_CFTankLocator_Params.AlmHiOffDlyTime := T#1s;
  

END_ACTION
