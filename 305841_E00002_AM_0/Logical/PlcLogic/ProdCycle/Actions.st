ACTION CalcPartMotion :
  
  // Calc cut velocity
  CalcCutVelocity;
  
  // Calc pass depth
  CalcPassDepth;
  // Calc the axis offset angles, in degrees, for a nominal pass and a finishing pass.
  // First calc the depth of a nominal pass, taking into account the finishing pass depth.
  // Then calc the offset angles needed to acheive the depths.
  // Note: this will enforce a minimum adjustement angle -- can't overspeed inner eccentric for a 
  // given feed rate (cut velocity), cutting depth, and ajustment angle.
  // The velocity margin can be approximate by comparing partMotion.depthAdjVelocity with the
  // inner axis max velocity, axes[AD_INNER_ECCENTRIC].MoveParameters.VelocityMax.
  // Note: Before calculating the angles, this needs cut velocity to be calculated from feed rate,
  // and pass depth to be calculated from total depth and pass count.
  CalcAngles;

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

ACTION CalcAngles :
  // Calc the axis offset angle in degrees given the desired cutting depth
  // Calc the angle from the calculated pass depth
  partMotion.passOffsetAngle := fctCalcAngleFromDepth(
  _I_Depth := partMotion.passDepth);

  // Calc the angle from the configured finish pass depth
  partMotion.finishPassOffsetAngle := fctCalcAngleFromDepth(
  _I_Depth := gr_CfgCurrent.cuttingHead.finishingPassDepth);
  
  // For a combination of offset angle, max inner axis velocity, and cut velocity, there is a minimum adjustment angle that needs to be adhered to.
  // Inner Axis Velocity = (offset angle / adj angle) * cut velocity. The cut velocity and offset angle are essentially fixed by the process settings,
  // and the inner axis velocity has an upper limit. So this means that for a given cut velocity or feed rate, there is a minimum adjustment angle.
  // Solving the eqn for adj angle ==> Adj Angle Min = (Offset Angle / Max Inner Velocity * Cut Velocity
  // Give a small margin to help prevent problems
  partMotion.depthAdjAngleMin := 1.1 * ((ABS(partMotion.passOffsetAngle) / axes[AD_INNER_ECCENTRIC].MoveParameters.VelocityMax) * partMotion.cutVelocity);
  // If the entered depth adjustment angle is too small, set the warning and enforce the minimum
  partMotion.warnAdjAngleTooSmall := gr_CfgCurrent.cuttingHead.depthAdjAngle < partMotion.depthAdjAngleMin;
  partMotion.depthAdjAngle := MAX(gr_CfgCurrent.cuttingHead.depthAdjAngle, partMotion.depthAdjAngleMin);

  // INITIALLY HARD CODE depth adj angle
  partMotion.depthAdjAngle := 10.0;

END_ACTION

ACTION CalcDepthAdjVelocity : // deg/sec. Calc depth adjustment velocity
  // Velocity of the relative eccentric motion to acheive the offset angle during the depth adj angle
  partMotion.depthAdjVelocity := fctCalcDepthAdjVelocity(
  _I_CutVelocity:= partMotion.cutVelocity,
  _I_DepthAdjAngle:= partMotion.depthAdjAngle,
  _I_OffsetAngle := partMotion.passOffsetAngle);
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

