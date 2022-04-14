// Return a depth value given an offset angle between the two axes.
FUNCTION fctCalcAngleFromDepth
  // TEST ALGORITHM!!
  // 0-5-0 mm -> 0-180-0 degrees
  // Assume symmetric around 0.
  // REPLACE THIS WITH THE REAL ALGORITHM
  
  // Get a local copy and range check depth
  IF _I_Depth > 5.0 THEN
    depth := 5.0;
  ELSIF _I_Depth < 0.0 THEN
    depth := 0.0;
  ELSE
    depth := _I_Depth;
  END_IF;
  
  // depth % converted to an angle between 0-180
  fctCalcAngleFromDepth := (depth / 5.0) * 180.0;
END_FUNCTION

// Return an offset angle give a cutting depth
FUNCTION fctCalcDepthFromAngle
  // TEST ALGORITHM!!
  // 0-180-0 degrees => 0-5-0 mm
  // Assume symmetric around 0.
  // REPLACE THIS WITH THE REAL ALGORITHM
  
  angle := fctLRMod(_I_Angle, 360.0); // angle mod 360 -- normalize the angle to 360 degrees
  // Normalized to +/- 180 degrees (e.g. 270 => -90)
  IF angle > 180.0 THEN
    angle := angle - 360.0;
  ELSIF angle < -180.0 THEN // not incorrect, but not needed with MOD
    angle := angle + 360.0;
  END_IF;
  
  // angle % converted to a depth 0-5mm
  fctCalcDepthFromAngle := (ABS(LREAL_TO_REAL(angle)) / 180.0) * 5.0;  
END_FUNCTION

// Return a pass depth based on the number of passes and a finishing depth
FUNCTION fctCalcPassDepth
  // Subtract out the finish pass, and calc the pass depth
  // based on the number of passes, and the total depth.
  
  // Qualify total depth and pass count. If total depth or pass count
  // is <= 0, then return 0.
  IF _I_TotalDepth <= 0.0 OR _I_PassCount <= 0 THEN
    fctCalcPassDepth := 0.0;
    RETURN;
  END_IF;
  
  // At this point, total depth and pass count are at least positive values.
  // Qualify finish pass depth -- it can be zero, but it can't be negative or
  // more than the total depth
  fpDepth := MAX(_I_FPDepth, 0.0);
  fpDepth := MIN(_I_TotalDepth, fpDepth);
  fctCalcPassDepth := (_I_TotalDepth - fpDepth) / USINT_TO_REAL(_I_PassCount);
END_FUNCTION

// Return the cut velocity based on feed rate and inside diameter
FUNCTION fctCalcCutVelocity
  // 360 degrees / circumference * feedrate = feed rate in degrees/sec
  // Do not allow a negative velocity or division by zero or non-sensical inputs. Rtn 0 in these cases.
  IF _I_InnerDiameter <= 0.0 OR _I_FeedRate <= 0.0 THEN
    fctCalcCutVelocity := 0.0;
    RETURN;
  ELSE
    // Inputs are okay. Calc velocity.
    // deg/mm * mm/sec = deg/sec
    fctCalcCutVelocity := (360.0 / (_I_InnerDiameter * brmPI)) * _I_FeedRate;
  END_IF;
END_FUNCTION

// Return the depth adjustment velocity based on feed rate and inside diameter, depth adj, and depth adj arc
FUNCTION fctCalcDepthAdjVelocity
  // 360 degrees / circumference * feedrate = feed rate in degrees/sec
  // Do not allow a negative velocity, adjustment, adj angle or division by zero or non-sensical inputs. Rtn 0 in these cases.

  IF _I_CutVelocity <= 0.0 OR _I_DepthAdjAngle <= 0.0 OR _I_OffsetAngle <= 0.0 THEN
    fctCalcDepthAdjVelocity := 0.0;
    RETURN;
  ELSE
    // Inputs are okay. 
    adjTime := LREAL_TO_REAL(_I_DepthAdjAngle / _I_CutVelocity); // how long the master will take to cover the adj arc
    fctCalcDepthAdjVelocity := LREAL_TO_REAL(_I_OffsetAngle / adjTime); // deg/sec. Velocity the offset is established at to acheive it during the depth adj angle
  END_IF;
END_FUNCTION

