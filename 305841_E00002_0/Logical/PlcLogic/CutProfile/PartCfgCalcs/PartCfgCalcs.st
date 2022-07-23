
PROGRAM _INIT
  // Get the length of the configuration
  // This aids in change detection
  wpCfgBytes := ADR(gr_CfgCurrent.startOfCfg) - ADR(gr_CfgCurrent.endOfCfg);

  // Get setup to lookup a depth given an angle
  // Make sure the lookup tables get loaded in the lookup fb
  // The lookups will come later
  fbLookupDepth.Enable := FALSE;
  fbLookupDepth.T1 := ADR(gr_angleToDepthLu.T1);
  fbLookupDepth.T2 := ADR(gr_angleToDepthLu.T2);
  fbLookupDepth.T3 := ADR(gr_angleToDepthLu.T3);
  fbLookupDepth.LoadTables := TRUE;
  fbLookupDepth();
  fbLookupDepth.LoadTables := FALSE;

  
  
END_PROGRAM

PROGRAM _CYCLIC
  // *****************
  // Part configuration changes
  // *****************  
  //
  // Detect a change
  // result = brsmemcmp(ADR(Mem1),ADR(Mem2),length), result = 0 when equal
  result := brsmemcmp(ADR(wpCfgPrev.startOfCfg),
                      ADR(gr_CfgCurrent.startOfCfg),
                      wpCfgBytes);
                      
  // *****************
  // Depth (eccentric offset angle) changes
  // *****************
  //
  // Detect a change
  

      
	 
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM

