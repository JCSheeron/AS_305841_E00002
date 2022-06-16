// Calculate the master and slave angles given cut parameters
FUNCTION_BLOCK fbPopulateCamTable
  // **** Condition inputs
  _numPasses := MAX(1, numPasses); // 1 or greater. Otherwise treat as 1
  _finalDepth := ABS(finalDepth); // must be positive
  _finishPassDepth := MIN(MAX(0.0, finishPassDepth), _finalDepth); // must be >= 0.0, <= final depth.
  _cutInAngle := ABS(cutInAngle); // must be positive
  _overCutAngle := ABS(overCutAngle); // must be positive

  // **** First entry in table is 0,0
  // Axes start at 0,0 (0 offset) at the same velocity (which will normally be zero)
  // Specify absolute positions
  camTable.Section[0].Mode := mcCAMSECTREF_ABSOLUTE;
  camTable.Section[0].MasterPoint := 0.0;
  camTable.Section[0].SlavePoint := 0.0;
  // slave to be at a constant velocity
  camTable.Section[0].FirstDerivative := 1.0; // velocity ratio 
  camTable.Section[0].SecondDerivative := 0.0; // accel ratio
  // next point will be offset. Use polynomial for this -- good general case solution
  camTable.Section[0].Type := mcCAMSECTLAW_5TH_ORDER_POLYNOM; 
  camTable.Section[0].InflectionPoint := 0.0; // not used for polynomial
  
  // **** Figure out pass depths and then resulting angles
  // Make cam table entries
  incrCutDepth := (_finalDepth - _finishPassDepth) / _numPasses;
  
  IF incrCutDepth > 0.0 THEN
    // normal case where finishing pass < final depth
    FOR passCount := 1 TO _numPasses DO
      // depth for this pass
      totalPassDepth := incrCutDepth * passCount;
      // Look up angle for the needed depth
      fbLookupAngle(xVal := totalPassDepth,
                     t1 := ADR(depthToAngle_T1),
                     t2 := ADR(depthToAngle_T2),
                     t3 := ADR(depthToAngle_T3));
      passAngle := fbLookupAngle.yVal;
      
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
      idx := ((passCount - 1) * 2) + 1; // zero based array index position 
      
      // Establish an offset from previous position
      camTable.Section[idx].Mode := mcCAMSECTREF_ABSOLUTE;
      camTable.Section[idx].MasterPoint := (_cutInAngle * passCount) + ((360.0 + _overCutAngle) * (passCount - 1));
      camTable.Section[idx].SlavePoint := camTable.Section[idx].MasterPoint - passAngle;
      // slave to be at a constant velocity
      camTable.Section[idx].FirstDerivative := 1.0; // velocity ratio 
      camTable.Section[idx].SecondDerivative := 0.0; // accel ratio
      // next point will be a stright section.
      camTable.Section[idx].Type := mcCAMSECTLAW_STRAIGHT_LINE; 
      camTable.Section[idx].InflectionPoint := 0.0; // not used for straight line
      
      // Keep the offset for a revolution + the overcut distance
      camTable.Section[idx + 1].Mode := mcCAMSECTREF_ABSOLUTE;
      camTable.Section[idx + 1].MasterPoint := camTable.Section[idx].MasterPoint + (360.0 + _overCutAngle);
      camTable.Section[idx + 1].SlavePoint := camTable.Section[idx + 1].MasterPoint - passAngle;
      // slave to be at a constant velocity
      camTable.Section[idx + 1].FirstDerivative := 1.0; // velocity ratio 
      camTable.Section[idx + 1].SecondDerivative := 0.0; // accel ratio
      // next point will establish a new offset, so use a polynomial
      camTable.Section[idx + 1].Type := mcCAMSECTLAW_5TH_ORDER_POLYNOM; 
      camTable.Section[idx + 1].InflectionPoint := 0.0; // not used for polynomial
    END_FOR;
  ELSE
    // Special case where finishing pass was entered to be >= final depth.
    // Nothing to do, and this else is here for documentation and as
    // a place holder in case something ends up being needed.
    // The finishing pass is handled next, and will cover this case
    ;
  END_IF
  
  // **** Figure out finishing pass situation

  // If there is a finishing pass, then create cam entries for it
  
  // After the for loop, passCount will be 1 more than the number of passes. 
  // Perfect for the finishing pass, or the retract entry.
  idx := ((passCount - 1) * 2) + 1; // zero based array index position 
  IF _finishPassDepth > 0.0 THEN
    // There is a finishing pass
    // By definition, the finishing pass gets us to our final depth,
    // so regardless of the earlier passes, the finishing pass is always
    // at the offset to give the final depth.
    // Look up angle for the needed depth
    fbLookupAngle(xVal := _finalDepth,
                   t1 := ADR(depthToAngle_T1),
                   t2 := ADR(depthToAngle_T2),
                   t3 := ADR(depthToAngle_T3));
    passAngle := fbLookupAngle.yVal;

    // Establish an offset from previous position
    camTable.Section[idx].Mode := mcCAMSECTREF_ABSOLUTE;
    camTable.Section[idx].MasterPoint := (_cutInAngle * passCount) + ((360.0 + _overCutAngle) * (passCount - 1));
    camTable.Section[idx].SlavePoint := camTable.Section[idx].MasterPoint - passAngle;
    // slave to be at a constant velocity
    camTable.Section[idx].FirstDerivative := 1.0; // velocity ratio 
    camTable.Section[idx].SecondDerivative := 0.0; // accel ratio
    // next point will be a stright section.
    camTable.Section[idx].Type := mcCAMSECTLAW_STRAIGHT_LINE; 
    camTable.Section[idx].InflectionPoint := 0.0; // not used for straight line

    // Keep the offset for a revolution + the overcut distance
    camTable.Section[idx + 1].Mode := mcCAMSECTREF_ABSOLUTE;
    camTable.Section[idx + 1].MasterPoint := camTable.Section[idx].MasterPoint + (360.0 + _overCutAngle);
    camTable.Section[idx + 1].SlavePoint := camTable.Section[idx + 1].MasterPoint - passAngle;
    // slave to be at a constant velocity
    camTable.Section[idx + 1].FirstDerivative := 1.0; // velocity ratio 
    camTable.Section[idx + 1].SecondDerivative := 0.0; // accel ratio
    // next point will establish a new offset, so use a polynomial
    camTable.Section[idx + 1].Type := mcCAMSECTLAW_5TH_ORDER_POLYNOM; 
    camTable.Section[idx + 1].InflectionPoint := 0.0; // not used for polynomial
    
    // increment the pass count so similar it can be used for the last entry
    passCount := passCount + 1;
    // calculate a new index for the last entry, which retracts the cutter
    idx := ((passCount - 1) * 2) + 1; // zero based array index position 
  END_IF;
  
  // **** Do the last entry to retract the cutting head.
  // passCount will either be number of passes + 1 in the non-finishing pass case,
  // or will be number of passes + 2 in the finishing pass case. idx and passCount 
  // were already adjusted in the finishing pass case.
  
  // The last cam entry needs to be of type mcCAMSECTLAW_LAST_POINT
  // Establish a zero offset from previous position
  camTable.Section[idx].Mode := mcCAMSECTREF_ABSOLUTE;
  camTable.Section[idx].MasterPoint := (_cutInAngle * passCount) + ((360.0 + _overCutAngle) * (passCount - 1));
  camTable.Section[idx].SlavePoint := camTable.Section[idx].MasterPoint;
  // slave to be at a constant velocity
  camTable.Section[idx].FirstDerivative := 1.0; // velocity ratio 
  camTable.Section[idx].SecondDerivative := 0.0; // accel ratio
  // next point will be a stright section.
  camTable.Section[idx].Type := mcCAMSECTLAW_LAST_POINT; 
  camTable.Section[idx].InflectionPoint := 0.0; // not used for straight line

END_FUNCTION_BLOCK

FUNCTION_BLOCK fbLookUpYValT3
  // See what table the x value is in
  tableNumber := fctGetTableNumberT3(xVal, ADR(t1), ADR(t2), ADR(t2));
  // Look up the angle (y value) from the correct table
  // The fbDepthToAngle will interpolate between table entries
  IF 1 = tableNumber THEN
    // Set up the lookup fb
    fbDepthToAngleLu(Enable := FALSE);
    fbDepthToAngleLu.NumberOfNodes := t1.numberOfVals;
    fbDepthToAngleLu.NodeVectorX := t1.xVals;
    fbDepthToAngleLu.FcnValues := t1.yVals;
    fbDepthToAngleLu.InX := xVal;
    // look up the Y value
    fbDepthToAngleLu(Enable := TRUE);
    IF fbDepthToAngleLu.Enable AND NOT fbDepthToAngleLu.Error THEN
      // Lookup worked. Send out the looked up value.
      yVal := fbDepthToAngleLu.Out;
    ELSE
      // Lookup didn't work. Send ou the sentinel value.
      yVal := INVALID_SENTINEL;
    END_IF;
    
  ELSIF 2 = tableNumber THEN
    // Set up the lookup fb
    fbDepthToAngleLu(Enable := FALSE);
    fbDepthToAngleLu.NumberOfNodes := t2.numberOfVals;
    fbDepthToAngleLu.NodeVectorX := t2.xVals;
    fbDepthToAngleLu.FcnValues := t2.yVals;
    fbDepthToAngleLu.InX := xVal;
    // look up the Y value
    fbDepthToAngleLu(Enable := TRUE);
    IF fbDepthToAngleLu.Enable AND NOT fbDepthToAngleLu.Error THEN
      // Lookup worked. Send out the looked up value.
      yVal := fbDepthToAngleLu.Out;
    ELSE
      // Lookup didn't work. Send ou the sentinel value.
      yVal := INVALID_SENTINEL;
    END_IF;
  
  ELSIF 3 = tableNumber THEN
    // Set up the lookup fb
    fbDepthToAngleLu(Enable := FALSE);
    fbDepthToAngleLu.NumberOfNodes := t3.numberOfVals;
    fbDepthToAngleLu.NodeVectorX := t3.xVals;
    fbDepthToAngleLu.FcnValues := t3.yVals;
    fbDepthToAngleLu.InX := xVal;
    // look up the Y value
    fbDepthToAngleLu(Enable := TRUE);
    IF fbDepthToAngleLu.Enable AND NOT fbDepthToAngleLu.Error THEN
      // Lookup worked. Send out the looked up value.
      yVal := fbDepthToAngleLu.Out;
    ELSE
      // Lookup didn't work. Send ou the sentinel value.
      yVal := INVALID_SENTINEL;
    END_IF;
  END_IF;
  
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

