
PROGRAM _INIT


  // **** INIT Input Processing
  // Init function blocks
  // Set the reference to the input strucures,
  // set the sentinel value, and init the fb
  // Set the channel health for the sensor to OK if the module type used does not report channel health
  
  // ** Analog Inputs
  
  // ** Cutting Fluid Pump Flow Transmitter
  // NOTE: No sensor initially fitted -- here for future use
  fbAI_FT_CFFlow._InInputStruct:= ADR(AI_FT_CFFlow);
  fbAI_FT_CFFlow._InParamsStruct := ADR(gr_AI_FT_CFFlow_Params);
  fbAI_FT_CFFlow._InSentinel:= INVALID_SENTINEL_REAL;
  fbAI_FT_CFFlow(_InSetParams:= TRUE);
  fbAI_FT_CFFlow._InSetParams:= FALSE;

  // ** Cutting Fluid Tank Level Transmitter
  // NOTE: No sensor initially fitted -- here for future use
  fbAI_LT_CFTankLevel._InInputStruct:= ADR(AI_LT_CFTankLevel);
  fbAI_LT_CFTankLevel._InParamsStruct := ADR(gr_AI_LT_CFTankLevel_Params);
  fbAI_LT_CFTankLevel._InSentinel:= INVALID_SENTINEL_REAL;
  fbAI_LT_CFTankLevel(_InSetParams:= TRUE);
  fbAI_LT_CFTankLevel._InSetParams:= FALSE;
  
  // ** Cutting Fluid Filter Outlet Pressure Transmitter
  fbAI_PT_CFFilterOutlet._InInputStruct:= ADR(AI_PT_CFFilterOutlet);
  fbAI_PT_CFFilterOutlet._InParamsStruct := ADR(gr_AI_PT_CFFilterOutlet_Params);
  fbAI_PT_CFFilterOutlet._InSentinel:= INVALID_SENTINEL_REAL;
  fbAI_PT_CFFilterOutlet(_InSetParams:= TRUE);
  fbAI_PT_CFFilterOutlet._InSetParams:= FALSE;

  // ** Cutting Fluid Pump Outlet Pressure Transmitter
  fbAI_PT_CFPumpOutlet._InInputStruct:= ADR(AI_PT_CFPumpOutlet);
  fbAI_PT_CFPumpOutlet._InParamsStruct := ADR(gr_AI_PT_CFPumpOutlet_Params);
  fbAI_PT_CFPumpOutlet._InSentinel:= INVALID_SENTINEL_REAL;
  fbAI_PT_CFPumpOutlet(_InSetParams:= TRUE);
  fbAI_PT_CFPumpOutlet._InSetParams:= FALSE;
  
  // ** Cutting Fluid Pump Filter Differential Pressure Transmitter
  // Note: This is a 'virtual' instrument -- the dp across the filter is derrived
  // from the two pressure transducers. Use the Real input type -- it does not need scaling,
  // but does need alarming.
  gr_AI_DP_CFFilter_Params.RawType := GAPIO_RWST_REAL;
  fbAI_DP_CFFilter._InInputStruct:= ADR(AI_DP_CFFilter);
  fbAI_DP_CFFilter._InParamsStruct := ADR(gr_AI_DP_CFFilter_Params);
  fbAI_DP_CFFilter._InSentinel:= INVALID_SENTINEL_REAL;
  fbAI_DP_CFFilter(_InSetParams:= TRUE);
  fbAI_DP_CFFilter._InSetParams:= FALSE;
  
  // ** Digital Inputs
  fbDI_JI_480VACOk._InInputStruct:= ADR(DI_JI_480VACOk);
  fbDI_JI_480VACOk._InParamsStruct:= ADR(gr_DI_JI_480VACOk_Params);
  fbDI_JI_480VACOk._InSentinel:= FALSE;
  fbDI_JI_480VACOk(_InSetParams:= TRUE);
  fbDI_JI_480VACOk._InSetParams:= FALSE;

  fbDI_LSL_CFTank._InInputStruct:= ADR(DI_LSL_CFTank);
  fbDI_LSL_CFTank._InParamsStruct:= ADR(gr_DI_LSL_CFTank_Params);
  fbDI_LSL_CFTank._InSentinel:= FALSE;
  fbDI_LSL_CFTank(_InSetParams:= TRUE);
  fbDI_LSL_CFTank._InSetParams:= FALSE;

  fbDI_ZS_CFTankLocator._InInputStruct:= ADR(DI_ZS_CFTankLocator);
  fbDI_ZS_CFTankLocator._InParamsStruct:= ADR(gr_DI_ZS_CFTankLocator_Params);
  fbDI_ZS_CFTankLocator._InSentinel:= FALSE;
  fbDI_ZS_CFTankLocator(_InSetParams:= TRUE);
  fbDI_ZS_CFTankLocator._InSetParams:= FALSE;
END_PROGRAM

PROGRAM _CYCLIC

  // Set the default params on request, and then clear the request.
  // NOTE: This is not normally needed due to global
  // permanent retained status of parameters, but use for special
  // cases like first startup after major change, or to make sure
  // values are set to known, observable values.
  IF reqSetDefaultValues THEN
    SetInputParams;
    reqSetDefaultValues := FALSE;
  END_IF;

  // **** Run the analog and digital input processing
  // The input signals are generally mapped in the I/O mapping, unless there is a 
  // further conditioning or logic needed.
  // Map the ModuleOk, ChannelOk, and run the fb.
  // If the channel OK is not available in the hardware I/O mapping, 
  // either do it manually, or use the Module OK for the channel ok.

  // ** Analog Inputs
  
  AI_FT_CFFlow.ModuleOk:= ModStat_JB1_PLK2.Slot04ModuleOk;
  fbAI_FT_CFFlow();

  AI_LT_CFTankLevel.ModuleOk:= ModStat_JB1_PLK2.Slot04ModuleOk;
  fbAI_LT_CFTankLevel();
  
  AI_PT_CFPumpOutlet.ModuleOk:= ModStat_JB1_PLK2.Slot05ModuleOk;
  AI_PT_CFPumpOutlet.ChannelOk := AI_PT_CFPumpOutlet.ModuleOk; // TODO: Update. Need to figure out what is needed in the IO-Link case.
  // Manually set the raw input, externally calc scaling, and then call the fb.
  // Mfg formula gives pressure in bar, and then convert to psig.
  AI_PT_CFPumpOutlet.InRawUINT := AI_PT_CFFilterOutletRaw;
  AI_PT_CFPumpOutlet.InScaled := LREAL_TO_REAL(((UINT_TO_LREAL(AI_PT_CFFilterOutletRaw) * TURCK_PS5XX_100_GRADIENT) + TURCK_PS5XX_100_OFFSET) * 14.50377);
  fbAI_PT_CFPumpOutlet();

  AI_PT_CFFilterOutlet.ModuleOk:= ModStat_JB1_PLK2.Slot05ModuleOk;
  AI_PT_CFFilterOutlet.ChannelOk := AI_PT_CFFilterOutlet.ModuleOk; // TODO: Update. Need to figure out what is needed in the IO-Link case.
  // Manually set the raw input, externally calc scaling, and then call the fb.
  // Mfg formula gives pressure in bar, and then convert to psig.
  AI_PT_CFFilterOutlet.InRawUINT := AI_PT_CFFilterOutletRaw;
  AI_PT_CFFilterOutlet.InScaled := LREAL_TO_REAL(((UINT_TO_LREAL(AI_PT_CFFilterOutletRaw) * TURCK_PS5XX_100_GRADIENT) + TURCK_PS5XX_100_OFFSET) * 14.50377);
  fbAI_PT_CFFilterOutlet();
    
  // The 'virtual' CF Filter DP is derrived from two real PTs across the filter/
  // And the module and channel okays. Subtract the PVs to get the new signal.
  AI_DP_CFFilter.ModuleOk:= AI_PT_CFPumpOutlet.ModuleOk AND AI_PT_CFFilterOutlet.ModuleOk;
  AI_DP_CFFilter.ChannelOk := AI_PT_CFPumpOutlet.ChannelOk AND AI_PT_CFFilterOutlet.ChannelOk;
  AI_DP_CFFilter.InRawREAL := AI_PT_CFPumpOutlet.InScaledFiltered - AI_PT_CFFilterOutlet.InScaledFiltered;
  fbAI_DP_CFFilter();
  
  // ** Digital Inputs
  DI_JI_480VACOk.ModuleOk := ModStat_PLC_201.Slot01ModuleOk;
  DI_JI_480VACOk.ChannelOk := DI_JI_480VACOk.ModuleOk;
  fbDI_JI_480VACOk();
  
  DI_LSL_CFTank.ModuleOk := ModStat_JB1_PLK2.Slot02ModuleOk;
  DI_LSL_CFTank.ChannelOk := DI_LSL_CFTank.ModuleOk;
  fbDI_LSL_CFTank();

  DI_ZS_CFTankLocator.ModuleOk := ModStat_JB1_PLK2.Slot02ModuleOk;
  DI_ZS_CFTankLocator.ChannelOk := DI_ZS_CFTankLocator.ModuleOk;
  fbDI_ZS_CFTankLocator;

END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM