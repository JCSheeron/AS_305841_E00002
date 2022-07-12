
// Calculate the master and slave angles given cut parameters
FUNCTION_BLOCK fbCalcCamSections
  IF Enable AND NOT enableOS THEN
    // Rising edge of enable ... first time thru.
    
    // set OS
    enableOS := TRUE;
    
    // Set active and clear done and error
    Active := TRUE;
    Error := FALSE;
    Done := FALSE;
    
    // Make sure the lookup tables get loaded in the lookup fb
    // The lookups will come later
    fbLookupAngle.Enable := FALSE;
    fbLookupAngle.T1 := ADR(DepthToAngle_T1);
    fbLookupAngle.T2 := ADR(DepthToAngle_T2);
    fbLookupAngle.T3 := ADR(DepthToAngle_T3);
    fbLookupAngle.LoadTables := TRUE;
    fbLookupAngle();
    fbLookupAngle.LoadTables := FALSE;

    
    // **** Condition inputs
    _numPasses := MAX(1, PassCount); // 1 or greater. Otherwise treat as 1
    _finalDepth := ABS(FinalDepth); // must be positive
    _finishPassDepth := MIN(MAX(0.0, FinishPassDepth), _finalDepth); // must be >= 0.0, <= final depth.
    _cutInAngle := ABS(CutInAngle); // must be positive
    _overCutAngle := ABS(OverCutAngle); // must be positive
    
    // Init the seq counter
    seqCtr := 1;
    
  ELSIF Enable AND enableOS THEN
    // Enable high. Do this stuff over many scans
    
    IF 1 = seqCtr THEN
      // **** First step: make the first entry and figure out the incremental cut depth
      
      // **** First entry in table is 0,0
      // At the beginning of the table, it is assumed the axes are at zero offset (0,0)
      // at the same velocity (which will normally be zero)
      // Specify absolute positions
      CamTable.Section[0].Mode := mcCAMSECTREF_ABSOLUTE;
      CamTable.Section[0].MasterPoint := 0.0;
      CamTable.Section[0].SlavePoint := 0.0;
      // slave to be at a constant velocity
      CamTable.Section[0].FirstDerivative := 1.0; // velocity ratio 
      CamTable.Section[0].SecondDerivative := 0.0; // accel ratio
      // next point will be offset. Use polynomial for this -- good general case solution
      CamTable.Section[0].Type := mcCAMSECTLAW_5TH_ORDER_POLYNOM; 
      CamTable.Section[0].InflectionPoint := 0.0; // not used for polynomial
    
    
      // **** Figure out pass depths and then resulting angles
      // Make cam table entries
      incrCutDepth := (_finalDepth - _finishPassDepth) / _numPasses;
      
      // Ready for the next step
      passCtr := 1; // Init pass counter. If controlled loop in seq step 2/3.
      seqCtr := 2;
      
    ELSIF 2 = seqCtr OR 3 = seqCtr THEN
      // **** Second step: Lookup the nominal pass angle
      // **** Third step: Calculate the nominal pass angle
    
      IF incrCutDepth > 0.0 THEN
        // normal case where finishing pass < final depth
        // This would be a FOR loop, but I don't want multi-scan async operations
        // to block or cause scan time issues.
        IF passCtr <= _numPasses THEN
          // depth for this pass
          totalPassDepth := incrCutDepth * passCtr;
          
          // lookup step
          IF 2 = seqCtr THEN
            // Look up angle for the needed depth
            fbLookupAngle(Enable := TRUE, XVal := totalPassDepth);
            IF fbLookupAngle.Done AND NOT fbLookupAngle.Error THEN
              // Lookup was sucessful. Use the looked up value.
              // Force the angle to be positive, as down below the
              // value is subtracted from the master position to force
              // the slave to have a negative offset.
              // Round just for safety so crazy decimal imprecision or rounding does not cause
              // unexpected small differences in cam entries
              passAngle := fctRound3(_I_src := ABS(fbLookupAngle.YVal));
              // done with LU fb
              fbLookupAngle(Enable := FALSE);
              // move to next step
              seqCtr := 3;
            ELSIF fbLookupAngle.Done AND fbLookupAngle.Error THEN
              // Lookup error. Use 0 for the pass angle, and set the error output
              passAngle := 0.0;
              Error := TRUE;
              // done with LU fb
              fbLookupAngle(Enable := FALSE);
              // move to next step
              seqCtr := 3;
            END_IF;

          // calc step (use looked up angle)
          ELSIF 3 = seqCtr THEN 
            // At this point, we have the angle for this pass. 
            // This angle is actually the offset angle between the axes.
            // The offset in practice should be negative, meaning the slave lags
            // behind the master by the amount of the offset.
            // Make an entry in the cam table
            // Each pass has an enrty to establish the pass depth,
            // and a second pass to make the cut, which is 1 revolution from the point the 
            // depth is established, plus the overcut distance.
            // For a given pass, the first index/position is: ((pass number - 1) * 2) + 1
            // the second index/position is: first index + 1
            // For a given pass, the first master position is: (cutInAngle + pass number) + ((rev + overcut) * (pass number - 1))
            // the second master position is: first position + rev + overcut
            idx := ((passCtr - 1) * 2) + 1; // zero based array index position 
            
            // Establish an offset from previous position
            CamTable.Section[idx].Mode := mcCAMSECTREF_ABSOLUTE;
            CamTable.Section[idx].MasterPoint := (_cutInAngle * passCtr) + ((360.0 + _overCutAngle) * (passCtr - 1));
            CamTable.Section[idx].SlavePoint := CamTable.Section[idx].MasterPoint - passAngle;
            // slave to be at a constant velocity
            CamTable.Section[idx].FirstDerivative := 1.0; // velocity ratio 
            CamTable.Section[idx].SecondDerivative := 0.0; // accel ratio
            // next point will be a stright section.
            CamTable.Section[idx].Type := mcCAMSECTLAW_STRAIGHT_LINE; 
            CamTable.Section[idx].InflectionPoint := 0.0; // not used for straight line
            
            // Keep the offset for a revolution + the overcut distance
            CamTable.Section[idx + 1].Mode := mcCAMSECTREF_ABSOLUTE;
            CamTable.Section[idx + 1].MasterPoint := CamTable.Section[idx].MasterPoint + (360.0 + _overCutAngle);
            CamTable.Section[idx + 1].SlavePoint := CamTable.Section[idx + 1].MasterPoint - passAngle;
            // slave to be at a constant velocity
            CamTable.Section[idx + 1].FirstDerivative := 1.0; // velocity ratio 
            CamTable.Section[idx + 1].SecondDerivative := 0.0; // accel ratio
            // next point will establish a new offset, so use a polynomial
            CamTable.Section[idx + 1].Type := mcCAMSECTLAW_5TH_ORDER_POLYNOM; 
            CamTable.Section[idx + 1].InflectionPoint := 0.0; // not used for polynomial

            // Done with calcs for this pass. 
            // Set the sequence counter back to 2 so the next angle can be looked up, and 
            // increment the pass count.
            seqCtr := 2;
            passCtr := passCtr + 1;
          END_IF; // seq ctr 2 or 3
        ELSE
          // Done with passes. Ready to move on.  
          seqCtr := 4;
        END_IF; // passCtr <= _numPasses
      ELSE // incr cut depth for this pass > 0
        // Special case where finishing pass was entered to be >= final depth.
        // Nothing to do, and this else is here for documentation and as
        // a place holder in case something ends up being needed.
        // The finishing pass is handled next, and will cover this case
        ;
      END_IF // incr cut depth

    ELSIF 4 = seqCtr OR 5 = seqCtr THEN
      // **** Forth step: Lookup the nominal pass angle
      // **** Fifth step: Calculate the nominal pass angle
  
      // If there is a finishing pass, then create cam entries for it
      
      // After the for loop, passCount will be 1 more than the number of passes. 
      // Perfect for the finishing pass, or the retract entry.
      idx := ((passCtr - 1) * 2) + 1; // zero based array index position 
      IF _finishPassDepth > 0.0 THEN
        // There is a finishing pass
        // By definition, the finishing pass gets us to our final depth,
        // so regardless of the earlier passes, the finishing pass is always
        // at the offset to give the final depth.
        // Look up angle for the needed depth
        IF 4 = seqCtr THEN
          // Look up angle for the needed depth
          fbLookupAngle(Enable := TRUE, XVal := _finalDepth);
          IF fbLookupAngle.Done AND NOT fbLookupAngle.Error THEN
            // Lookup was sucessful. Use the looked up value.
            // Force the angle to be positive, as down below the
            // value is subtracted from the master position to force
            // the slave to have a negative offset.
            // Round just for safety so crazy decimal imprecision or rounding does not cause
            // unexpected small differences in cam entries
            passAngle := fctRound3(_I_src := ABS(fbLookupAngle.YVal));
            // done with LU fb
            fbLookupAngle(Enable := FALSE);
            // move to next step
            seqCtr := 5;
          ELSIF fbLookupAngle.Done AND fbLookupAngle.Error THEN
            // Lookup error. Use 0 for the pass angle, and set the error output
            passAngle := 0.0;
            Error := TRUE;
            // done with LU fb
            fbLookupAngle(Enable := FALSE);
            // move to next step
            seqCtr := 5;
          END_IF;
        
        ELSIF 5 = seqCtr THEN
          // Establish an offset from previous position
          CamTable.Section[idx].Mode := mcCAMSECTREF_ABSOLUTE;
          CamTable.Section[idx].MasterPoint := (_cutInAngle * passCtr) + ((360.0 + _overCutAngle) * (passCtr - 1));
          CamTable.Section[idx].SlavePoint := CamTable.Section[idx].MasterPoint - passAngle;
          // slave to be at a constant velocity
          CamTable.Section[idx].FirstDerivative := 1.0; // velocity ratio 
          CamTable.Section[idx].SecondDerivative := 0.0; // accel ratio
          // next point will be a stright section.
          CamTable.Section[idx].Type := mcCAMSECTLAW_STRAIGHT_LINE; 
          CamTable.Section[idx].InflectionPoint := 0.0; // not used for straight line
      
          // Keep the offset for a revolution + the overcut distance
          CamTable.Section[idx + 1].Mode := mcCAMSECTREF_ABSOLUTE;
          CamTable.Section[idx + 1].MasterPoint := CamTable.Section[idx].MasterPoint + (360.0 + _overCutAngle);
          CamTable.Section[idx + 1].SlavePoint := CamTable.Section[idx + 1].MasterPoint - passAngle;
          // slave to be at a constant velocity
          CamTable.Section[idx + 1].FirstDerivative := 1.0; // velocity ratio 
          CamTable.Section[idx + 1].SecondDerivative := 0.0; // accel ratio
          // next point will establish a new offset, so use a polynomial
          CamTable.Section[idx + 1].Type := mcCAMSECTLAW_5TH_ORDER_POLYNOM; 
          CamTable.Section[idx + 1].InflectionPoint := 0.0; // not used for polynomial

          // increment the pass count so similar it can be used for the last entry
          passCtr := passCtr + 1;
          // calculate a new index for the last entry, which retracts the cutter
          idx := ((passCtr - 1) * 2) + 1; // zero based array index position 

          // Done with finishing pass. Ready to move on.  
          seqCtr := 6;
        END_IF; // seq ctr 4 or 5
      ELSE
        // _finishPassDepth = <= 0.0 (no finish pass)
        // Ready to move on
        seqCtr := 6;
      END_IF; // _finishPassDepth
    
    // **** Do the last entry to retract the cutting head.
    // passCount will either be number of passes + 1 in the non-finishing pass case,
    // or will be number of passes + 2 in the finishing pass case. idx and passCount 
    // were already adjusted in the finishing pass case.

    ELSIF 6 = seqCtr THEN    
      // The last cam entry needs to be of type mcCAMSECTLAW_LAST_POINT
      // Establish a zero offset from previous position
      CamTable.Section[idx].Mode := mcCAMSECTREF_ABSOLUTE;
      CamTable.Section[idx].MasterPoint := (_cutInAngle * passCtr) + ((360.0 + _overCutAngle) * (passCtr - 1));
      CamTable.Section[idx].SlavePoint := CamTable.Section[idx].MasterPoint;
      // slave to be at a constant velocity
      CamTable.Section[idx].FirstDerivative := 1.0; // velocity ratio 
      CamTable.Section[idx].SecondDerivative := 0.0; // accel ratio
      // next point will be a stright section.
      CamTable.Section[idx].Type := mcCAMSECTLAW_LAST_POINT; 
      CamTable.Section[idx].InflectionPoint := 0.0; // not used for straight line
      
      // Done with sequence
      Active := FALSE;
      Done := TRUE;
      seqCtr := -1;
    END_IF; // seq ctr
  ELSE
    // Not enabled. Clear OS reset outputs.
    enableOS := FALSE;
    Active := FALSE;
    Done := FALSE;
    Error := FALSE;
  END_IF; // enabled or not

END_FUNCTION_BLOCK

// Given an X, find which of 3 tables to look in
FUNCTION fctGetTableNumberT3
  // Return a 1, 2, or 3 for which table to look in
  // NOTE: X values in each table need to be sorted in ascending order
  // NOTE: It is assumed that x values in table 1 < table 2 < table 3
  
  // If value is less than or equal the last value in table 1,
  // then the value must represented in or before table 1. Return 1.
  IF xVal <= t1.xVals[t1.numberOfVals - 1] THEN
    fctGetTableNumberT3 := 1;
    RETURN;
  ELSIF xVal >= t3.xVals[0] THEN
    // If value is greater than or equal to the first value in table 3,
    // then the value must be represented in or after table 3. Return 3.
    fctGetTableNumberT3 := 3;
    RETURN;
  ELSE
    // The value must be too big to be represented in table 1,
    // and too small to be represented in table 3.
    // Table 2 is the best choice. Return 2.
    fctGetTableNumberT3 := 2;
    RETURN;
  END_IF;
  
END_FUNCTION

// Given a table, swap the X and Y values
FUNCTION fctSwapTableT3
  // Make sure number of values does not overrun the array sizes
  length := MIN(SIZEOF(tVals) / SIZEOF(tVals[0]), SIZEOF(table.xVals) / SIZEOF(table.xVals[0]), SIZEOF(table.yVals) / SIZEOF(table.yVals[0]));
  // Y -> temp
  // X -> Y
  // temp -> X
  // nextAddr := brsmemcpy(ADR(Dest),ADR(Src),length);
  nextAddr := brsmemcpy(ADR(tVals), ADR(table.yVals), length);
  nextAddr := brsmemcpy(ADR(table.yVals), ADR(table.xVals), length);
  nextAddr := brsmemcpy(ADR(table.xVals), ADR(tVals), length);
END_FUNCTION

