
// Return a pass depth based on the number of passes and a finishing depth
FUNCTION fctCalcPassDepth
  // Subtract out the finish pass, and calc the pass depth
  // based on the number of passes, and the total depth.
  
  // Qualify total depth and pass count. If total depth or pass count
  // is <= 0, then return 0.
  IF TotalDepth <= 0.0 OR PassCount <= 0 THEN
    fctCalcPassDepth := 0.0;
    RETURN;
  END_IF;
  
  // At this point, total depth and pass count are at least positive values.
  // Qualify finish pass depth -- it can be zero, but it can't be negative or
  // more than the total depth
  _fpDepth := MAX(FPDepth, 0.0);
  _fpDepth := MIN(TotalDepth, _fpDepth);
  fctCalcPassDepth := (TotalDepth - _fpDepth) / USINT_TO_REAL(PassCount);
END_FUNCTION

// Return the cut velocity based on feed rate and inside diameter
FUNCTION fctCalcCutVelocity
  // 360 degrees / circumference * feedrate = feed rate in degrees/sec
  // Do not allow a negative velocity or division by zero or non-sensical inputs. Rtn 0 in these cases.
  IF InnerDiameter <= 0.0 OR FeedRate <= 0.0 THEN
    fctCalcCutVelocity := 0.0;
    RETURN;
  ELSE
    // Inputs are okay. Calc velocity.
    // deg/mm * mm/sec = deg/sec
    fctCalcCutVelocity := (360.0 / (InnerDiameter * brmPI)) * FeedRate;
  END_IF;
END_FUNCTION

