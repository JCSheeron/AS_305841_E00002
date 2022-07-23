ACTION CalcPartMotion :
  
  // Calc cut velocity
  CalcCutVelocity;
  
  // Calc pass depth
  CalcPassDepth;

  // Calc depth adjustment velocity.
  // Note this is an average/approximate value for informaitional and approximate use.
  // It does not take into account accel and decel and isn't the exact value the system calculates 
  // for coordinated moves.
  CalcDepthAdjVelocity;

  // Calc the number of indexes needed to process a part
  CalcTotalZIndexes;

  // Calc index related values
  CalcZIndex;

END_ACTION

ACTION CalcCutterDepthAct: // Calc cutter depth (mm) from angle
  // Calculated position of the outer eccentric is outer - inner. The lookup table
  // uses positive angles, even though the offset is usualy expressed as being
  // negative, since the inner laggs the outer. Consider it an error if the outer
  // is lagging the inner. The teeth would be at a depth, but now one coverd by the LU table.
  // Allow a small negative offset just so dithering around zero isn't a problem.
  IF axes[AD_OUTER_ECCENTRIC].Status.CalculatedPosition1 <> INVALID_SENTINEL_LREAL AND
      axes[AD_OUTER_ECCENTRIC].Status.CalculatedPosition1 >= -1.0 * ABS(TOL_DEPTH_ZERO_DEG) THEN
    fbLookupDepth(Enable := TRUE, XVal := LREAL_TO_REAL(axes[AD_OUTER_ECCENTRIC].Status.CalculatedPosition1));
    IF fbLookupDepth.Done AND NOT fbLookupDepth.Error THEN
      // Lookup was sucessful. Use the looked up value.
      // Round just for safety so crazy decimal imprecision or rounding does not cause
      // unexpected small differences in cam entries
      partMotion.currentCutterDepth := fctRound3(_I_src := ABS(fbLookupDepth.YVal * 25.4)); // LU in inches, but struct value in in mm
      // done with LU
      fbLookupDepth(Enable := FALSE);
      // Update previous value for change detect
      offsetPrev := axes[AD_OUTER_ECCENTRIC].Status.CalculatedPosition1;
      
    ELSIF fbLookupDepth.Done AND fbLookupDepth.Error THEN
      // Lookup error. Use invalid for the cutter depth
      partMotion.currentCutterDepth := INVALID_SENTINEL_REAL;
      // done with LU fb
      fbLookupDepth(Enable := FALSE);
      // Update previous value for change detect
      offsetPrev := INVALID_SENTINEL_LREAL;
    END_IF;

END_ACTION
  
ACTION CalcCutVelocity : // Calc cut velocity in deg/sec from the inside diameter and feed rate
  partMotion.cutVelocity := fctCalcCutVelocity(
  _I_InnerDiameter := gr_PartCurrent.partDfn.nomId,
  _I_FeedRate := gr_CfgCurrent.cuttingHead.feedRate);
END_ACTION

ACTION CalcPassDepth: // Calc pass depth from total depth, number of passes, and finishing pass depth
// Factor in finishing pass
  IF gr_CfgCurrent.cuttingHead.finishingPass THEN
    calcReal1 := MAX(gr_CfgCurrent.cuttingHead.finishingPassDepth, 0.0); // no negative depths
  ELSE
    calcReal1 := 0.0;
  END_IF;
  
  partMotion.passDepth := fctCalcPassDepth(
  _I_TotalDepth := gr_CfgCurrent.cuttingHead.totalDepth,
  _I_PassCount := gr_CfgCurrent.cuttingHead.passCount,
  _I_FPDepth := calcReal1 ); // calcReal1 at call time has the finishing pass depth
END_ACTION

ACTION CalcTotalZIndexes :
  // Number of indexes to process a part
  // Round up if a partial index is needed
  IF gr_PartCurrent.partDfn.nomCutLength > 0.0 AND gr_CfgCurrent.zAxis.indexDist > 0.0 THEN
    partMotion.totalIndexes := LREAL_TO_USINT(fctLRCeiling(gr_PartCurrent.partDfn.nomCutLength / gr_CfgCurrent.zAxis.indexDist));
  ELSE
    partMotion.totalIndexes := 0;
  END_IF;
END_ACTION
  
ACTION CalcZIndex : 
  // If Z is calibrated, then see where we are for a Z index based on position.
  // Set part current isZIndexed if Z is in an index position.
  // The stat of cut position is subtracted out, and when the head is at 
  // the start of cut position, the index should be 1.
  // The general algorithm is index = ((pos - start of cut) / index distance) + 1
  // An
  IF gr_PartCurrent.isZCalibrated THEN
    // Need to know position relative to the start of cut position
    calcLReal1 := axes[AD_Z].Status.Position - gr_CfgCurrent.zAxis.startOfCutPos;
    // Get the Z index count. Value of 0 means the Z position is below the start of cut position, or 
    // above the cut length of the workpiece (start of cut pos + cut length, e.g. load/unload position)
    // This is a floating point number that should have a very close to an integer when Z is properly indexed
    IF calcLReal1 < (-1.0 * TOL_ZINDEX) THEN 
      // If we are more negative than the tolerance, we are below the start
      // Make the index 0, and call it not indexed
      gr_PartCurrent.zIndexLRCount := 0.0;
      gr_PartCurrent.zIndexCount := 0;
      gr_PartCurrent.isZIndexed := FALSE;
    ELSIF calcLReal1 > (gr_CfgCurrent.zAxis.startOfCutPos + (gr_CfgCurrent.zAxis.indexDist * (partMotion.totalIndexes - 1))) THEN
      // If we are higher than the last index position , we are off the top end.
      // Subtract 1 from totalIndexed, because the Start of Cut is index 1, and there are total indexes - 1 above that.
      // Make the index 0, and call it not indexed
      gr_PartCurrent.zIndexLRCount := 0.0;
      gr_PartCurrent.zIndexCount := 0;
      gr_PartCurrent.isZIndexed := FALSE;
    ELSE
      // If we get here, we are somewhere within the cut length. Consider it indexed if we are at an indexed position.
      gr_PartCurrent.zIndexLRCount := (calcLReal1 / gr_CfgCurrent.zAxis.indexDist) + 1.0;  // Float value for info. SOC is 1, not zero, so we need to add 1
      gr_PartCurrent.zIndexCount := LREAL_TO_USINT(gr_PartCurrent.zIndexLRCount); // Integer index pos, rounded
      // If the position is close enough to an integer index pos, consider us indexed.
      // (Pos - SOC) - the indexed pos from SOC has to be < tolerance
      // TODO: Figure out proper index tolerance. Should correspond to needed Z index precision.
      gr_PartCurrent.isZIndexed := ABS(calcLReal1 - ((gr_PartCurrent.zIndexCount - 1) * gr_CfgCurrent.zAxis.indexDist)) < TOL_ZINDEX;
    END_IF;
  ELSE
    // Not calibrated, so no valid count and not indexed
    gr_PartCurrent.zIndexLRCount := 0.0;
    gr_PartCurrent.zIndexCount := 0;
    gr_PartCurrent.isZIndexed := FALSE;
  END_IF;
  
END_ACTION

ACTION SetStepTOs :
    gr_ProdModestepTOs[PCS_UNKNOWN]           := T#0ms;
    gr_ProdModestepTOs[PCS_INIT]              := T#0ms;
    gr_ProdModestepTOs[PCS_MODE_CHECK]        := T#0ms;
    gr_ProdModestepTOs[PCS_WAIT_FOR_PROD]     := T#0ms;
    gr_ProdModestepTOs[PCS_WAIT_FOR_START]    := T#0ms;
    gr_ProdModestepTOs[PCS_DECOUPLE_ECC]      := T#0ms;
    gr_ProdModestepTOs[PCS_RESET_AXES]        := T#0ms;
    gr_ProdModestepTOs[PCS_ENABLE_AXES]       := T#0ms;
    gr_ProdModestepTOs[PCS_START_CF]          := T#0ms;
    gr_ProdModestepTOs[PCS_ZERO_DEPTH]        := T#0ms;
    gr_ProdModestepTOs[PCS_Z_TO_SOC]          := T#0ms;
    gr_ProdModestepTOs[PCS_NEXT_CYCLE]        := T#0ms;
    gr_ProdModestepTOs[PCS_START_SPINDLE]     := T#0ms;
    gr_ProdModestepTOs[PCS_COUPLE_ECC]        := T#0ms;
    gr_ProdModestepTOs[PCS_START_PASS]        := T#0ms;
    gr_ProdModestepTOs[PCS_SYNCHING1]         := T#0ms;
    gr_ProdModestepTOs[PCS_SYNCHING2]         := T#0ms;
    gr_ProdModestepTOs[PCS_SYNCHING3]         := T#0ms;
    gr_ProdModestepTOs[PCS_AXES_SYNCHED]      := T#0ms;
    gr_ProdModestepTOs[PCS_SET_NEXT_PASS]     := T#0ms;
    gr_ProdModestepTOs[PCS_SET_FINISH_PASS]   := T#0ms;
    gr_ProdModestepTOs[PCS_SET_RETRACT]       := T#0ms;
    gr_ProdModestepTOs[PCS_STOP_SPINDLE]      := T#0ms;
    gr_ProdModestepTOs[PCS_INDEX_Z_WAIT]      := T#0ms;
    gr_ProdModestepTOs[PCS_CF_OFF1]           := T#0ms;
    gr_ProdModestepTOs[PCS_CF_OFF2]           := T#0ms;
    gr_ProdModestepTOs[PCS_Z_TO_UNLOAD]       := T#0ms;
    gr_ProdModestepTOs[PCS_DONE_WAIT]         := T#0ms;
    gr_ProdModestepTOs[PCS_INDEX_Z]           := T#0ms;
    gr_ProdModestepTOs[PCS_EOC_WAIT]          := T#0ms;
    gr_ProdModestepTOs[PCS_CF_TO]             := T#0ms;
    gr_ProdModestepTOs[PCS_START_CF2]         := T#0ms;
    gr_ProdModestepTOs[PCS_CYCLE_STOP]        := T#0ms;
    gr_ProdModestepTOs[PCS_CS_STOP_AXES]      := T#0ms;
    gr_ProdModestepTOs[PCS_CS_ZERO_DEPTH]     := T#0ms;
    gr_ProdModestepTOs[PCS_CS_STOP_SPINDLE]   := T#0ms;
    gr_ProdModestepTOs[PCS_CS_DISABLE_AXES]   := T#0ms;
    gr_ProdModestepTOs[PCS_CS_STOP_CF]        := T#0ms;

END_ACTION

