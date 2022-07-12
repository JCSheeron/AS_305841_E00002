(********************************************************************
 * COPYRIGHT -- General Atomics
 ********************************************************************
 * Library: GAMath
 * File: GAMathj.st
 * Author: J Sheeron
 ********************************************************************
 * Functions and function blocks of library GAMath
 ********************************************************************)
// Estimate time needed to make a trapazoidal move
FUNCTION_BLOCK fbCalcTrapMoveTime

  // Useful motion formulas:
  //    V^2 = V0^2 + (2 * acc * dist)  OR  dist = (V^2 - V0^2) / 2acc (1)
  //    V = V0 + (acc * t)  OR  t = (V - V0) / acc                    (2)
  //    Dist = (V0*t) + (1/2 * acc * t^2)                             (3)
  
  // **** First, return zeros on invalid inputs.
  // Assume distance, and accel and decel cannot be zero.
  // Assume V - V0 cannot be zero
  IF _I_VelMove = 0.0 OR (_I_VelMove = _I_Vel0) OR _I_Accel = 0.0 OR _I_Decel = 0.0 OR _I_Dist = 0.0 THEN
    _O_MoveTime := T#0ms;
    _O_VelReached := 0.0;
    _O_Dcheck := 0.0;
    RETURN;
  END_IF;
  
  // **** Condition inputs.
  // Force accel, decel and distance to be positive.
  // Force VelMove > V0, swapping them if necessary.
  // IMPROVEMENT: Perhaps it can be made so that negative accel, decel, distance, and velocity inputs
  // are handled gracrfully. Not needed now, so leave this for later if there is time/need.
  v0 := ABS(_I_Vel0);
  vMove := ABS(_I_VelMove);
  // swap V0 and VMove if needed such that v0 < vMove
  IF v0 > vMove THEN
    v0 := ABS(_I_VelMove);
    vMove := ABS(_I_Vel0);
  END_IF;
  accel := ABS(_I_Accel);
  decel := ABS(_I_Decel);
  dist := ABS(_I_Dist);
  
  // **** Now figure out the move profile. 
  // If the requested distance is less than or equal the check distance Dcheck,
  // the move profile is a triangle, and the move velocity will not be reached,
  // or may be reached, but not sustained.
  
  // If the requested distance is greater than the check distance, then the
  // move profile is trapazoidal, and the velocity will flat top at the move velocity.
  
  // Calculate the check distance Dcheck
  tval1 := vMove**2 - v0**2;
  tval2 := tval1 / (2 * accel); // dist accel (V^2 - V0^2) / (2*accel) (1)
  tval3 := tval1 / (2 * decel); // dist decel
  _O_Dcheck := tval2 + tval3; // Return the distance check for informational purposes.
  
  IF dist <= _O_Dcheck THEN
    // ** Triangular profiles
    // Profile is an accel segment and decel segemnt that meet at a point (no flat top at the MOVE velocity).
    // We need to know what velocity is reached. ** The area of the triangle is the distance traveled**,
    // and we know the accel time or distance + the decel time or distance = total time or distance, but we
    // need to know how long or how far the accel or decel component is.
    // Dist = 1/2 * acc * t^2 (3) above, so distance (area) varies linearly and inversely with acc. Furthermore,
    // we know the ratio of accel to decel, so we should be able to figure out the ratio of the distances (areas).
    // Daccel = (1 / Ratio accel:decel) * Ddecel ==> Daccel = (decel/accel) * Ddecel  OR  Ddecel = (accel / decel) * Daccel  (4)
    // Dtotal = Taccel + Tdecel. Substituing in (4) ==> Dtotal = Daccel + (accel/decel) * Daccel ==>
    // Dtotal = Daccel(1 + accel/decel) OR Daccel = Dtotal / (1 + (accel / decel))
    // The area of the acceleration portion is the trialgle with a base with a length of time Tacc, and this varies with the total time
    // by the same ratio of the accel/decel because the area of the triangle varies linearly with the length of the base
    // Taccel = (1 / Ratio accel:decel) * Tdecel ==> Taccel = (decel/accel) * Tdecel OR Tdecel = (accel / decel) * Taccel    (5)
    // Ttotal = Taccel + Tdecel. Substituing in (4) ==> Ttotal = Taccel + (accel/decel) * Taccel ==>
    // Ttotal = Taccel(1 + accel/decel) OR Taccel = Ttotal / (1 + (accel / decel))
    // So putting this all together:
    // 1) Distance traveled = area of the triangle
    // 2) The length of the base of the triangle is the total time
    // 3) Aaccel = Daccel = Dtotal / (1 + (accel / decel)
    // Then it follows that:
    // 4) V = SQRT(V0^2 + (2 * accel * Daccel))             (1)
    // 5) Ttotal = ((V - V0) / accel) + ((V - V0) / decel)  (2)
    tval1 := dist / (1 + (accel / decel));  // Daccel
    _O_VelReached := SQRT(v0**2 + (2.0 * accel * tval1)); // V = SQRT(V0^2 + (2 * acc * dist))
    tval1 := _O_VelReached - v0;
    seconds :=  (tval1 / accel) + (tval1 / decel); // Move time as a float, in seconds. t = ((V - V0) / accel) + ((V - V0) / decel)
  ELSE  
    // trapazoidal profiles -- profile is an accel segment a decel segemnt,
    // and a constant velocity segment in between at the move velocity.
    // Total move time is Taccel + Tconstant + Tdecel.
    // Velocity reached = move velocity.
    _O_VelReached := vMove;
    
    // 1) Calculate the time it takes to accelerate to Vmove
    // Taccel = (V - V0) / accel   (2)
    // 2) Calculate the distance traveled during the acceleration segment
    // Daccel = 1/2 * accel * t^2  (3)
    // 3) Similarly calcuate Tdecel and Ddecel
    // 4) Dconstant = Dmove - (Daccel + Ddecel) Total distance less distance for accel & decel
    // 5) Tconstant = Dconstant / Vmove
    // 6) Calculate Total move time: Tmove = Taccel + Tconstant + Tdecel
    
    // Calc accel and decel times
    tval1 := vMove - v0; 
    tval2 := tval1 / accel; // Taccel = (V - V0) / accel  (2)
    tval3 := tval1 / decel; // Tdecel
    
    // Calc accel and decel distances
    tval4 := (v0 * tval2) + (0.5 * accel * (tval2**2)); // Daccel = V0*t + (1/2 * accel * t^2)  (3)
    tval5 := (v0 * tval3) + (0.5 * decel * (tval3**2)); // Ddecel
    
    // Calc constant velocity distance: Dtotal - (Daccel + Ddecel)
    tval1 := dist - (tval4 + tval5); // Dconstant
    
    // Calc constant velocity time: Tconstant = Dconstant / VMove
    tval4 := tval1 / vMove; // Tconstant
    
    // Calc Total seconds = Tmove = Taccel + Tconstant + Tdecel
    seconds := tval2 + tval4 + tval3;
  END_IF;
   
  // Time calculations is:
  // 1) Converted from seconds to mSec (conversion to time expects mSecs)
  // 2) Converted from LREAL to DINT, and then returned for convenience
  // 3) Converted to a TIME and returned.
  _O_MoveTimeMsec := LREAL_TO_DINT(1000 * seconds);
  _O_MoveTime := DINT_TO_TIME(_O_MoveTimeMsec);
END_FUNCTION_BLOCK

FUNCTION_BLOCK fbLookUpYValT3
  // The lookup table needs to be loaded into the MTLookUpTable fb.
  // We don't want to do this every scan, so use the initTables to 
  // trigger this, and the isInitialized output to monitor it.
  // Initialize the tables on a rising edge of initTables input,
  // OR if they have not been done yet and the enable goes high.
  
  IF (LoadTables AND NOT _loadOS) OR (Enable AND NOT IsTablesLoaded) THEN
    // Load tables if requested or if a lookup is triggered and they are not loaded.
    // First set the OS so only a rising edge of loadTables is used
    _loadOS := TRUE;
    // Now load the table values
    _fbDepthToAngleLuT1.NumberOfNodes := T1.numberOfVals;
    _fbDepthToAngleLuT1.NodeVectorX := T1.xVals;
    _fbDepthToAngleLuT1.FcnValues := T1.yVals;
    
    _fbDepthToAngleLuT2.NumberOfNodes := T2.numberOfVals;
    _fbDepthToAngleLuT2.NodeVectorX := T2.xVals;
    _fbDepthToAngleLuT2.FcnValues := T2.yVals;
    
    _fbDepthToAngleLuT3.NumberOfNodes := T3.numberOfVals;
    _fbDepthToAngleLuT3.NodeVectorX := T3.xVals;
    _fbDepthToAngleLuT3.FcnValues := T3.yVals;
    
    // set the output status
    IsTablesLoaded := TRUE;
  ELSIF NOT LoadTables THEN
    // keep OS false when init is not set
    _loadOS := FALSE;
  END_IF;
  
  // clear the done bit on rising edge of enable
  IF (Enable AND NOT _enableOS) OR (Enable AND XVal <> _xValPrev) THEN
    // first time thru with enable set, or enable is set and the x value changes
    
    // set the OS
    _enableOS := TRUE;
    
    // Clear the done bit and set the active bit
    Done := FALSE;
    Active := TRUE;
    
    // See what table the x value is in
    _tableNumber := fctGetTableNumberT3(XVal, ADR(T1), ADR(T2), ADR(T3));
    
    // Look up the Y value from the correct table
    // The fbDepthToAngle will interpolate between table entries
    // Call with correct lookup fb with enable false to make sure
    // input changes, including possible table updates above
    // are processed on rising edge of enable later on.
    IF 1 = _tableNumber THEN
      // Set up the lookup fb
      _fbDepthToAngleLuT1.InX := XVal;
      _fbDepthToAngleLuT1.Mode := mtLOOKUP_LINEAR_EXTRAPOLATION;
      _fbDepthToAngleLuT1(Enable := FALSE);
    ELSIF 2 = _tableNumber THEN
      // Set up the lookup fb
      _fbDepthToAngleLuT2.InX := XVal;
      _fbDepthToAngleLuT2.Mode := mtLOOKUP_LINEAR_EXTRAPOLATION;
      _fbDepthToAngleLuT2(Enable := FALSE);
    ELSIF 3 = _tableNumber THEN
      // Set up the lookup fb
      _fbDepthToAngleLuT3.InX := XVal;
      _fbDepthToAngleLuT3.Mode := mtLOOKUP_LINEAR_EXTRAPOLATION;
      _fbDepthToAngleLuT3(Enable := FALSE);
    END_IF;
    
    // Update the previos X value
    _xValPrev := XVal;
    
  ELSIF Enable AND _enableOS THEN
    // First time thru completed. Do this while enable is high.
    // LU FBs were set up on first scan thru, so now get on with 
    // the lookup.
    IF 1 = _tableNumber THEN
      // look up the Y value from table 1
      _fbDepthToAngleLuT1(Enable := TRUE);
      IF _fbDepthToAngleLuT1.Enable AND _fbDepthToAngleLuT1.Active AND NOT _fbDepthToAngleLuT1.Error THEN
        // Lookup worked. Send out the looked up value.
        YVal := _fbDepthToAngleLuT1.Out;
        Error := FALSE;
      ELSIF _fbDepthToAngleLuT1.Enable AND _fbDepthToAngleLuT1.Error THEN
        // Lookup didn't work. Send out the sentinel value.
        YVal := INVALID_SENTINEL;
        Error := TRUE;
      END_IF;
      // All done, set the done output
      Done := TRUE;
    ELSIF 2 = _tableNumber THEN
      // look up the Y value from table 2
      _fbDepthToAngleLuT2(Enable := TRUE);
      IF _fbDepthToAngleLuT2.Enable AND _fbDepthToAngleLuT2.Active AND NOT _fbDepthToAngleLuT2.Error THEN
        // Lookup worked. Send out the looked up value.
        YVal := _fbDepthToAngleLuT2.Out;
        Error := FALSE;
      ELSIF _fbDepthToAngleLuT2.Enable AND _fbDepthToAngleLuT2.Error THEN
        // Lookup didn't work. Send out the sentinel value.
        YVal := INVALID_SENTINEL;
        Error := TRUE;
      END_IF;
      // All done, set the done output
      Done := TRUE;
    ELSIF 3 = _tableNumber THEN
      // look up the Y value from table 3
      _fbDepthToAngleLuT3(Enable := TRUE);
      IF _fbDepthToAngleLuT3.Enable AND _fbDepthToAngleLuT3.Active AND NOT _fbDepthToAngleLuT3.Error THEN
        // Lookup worked. Send out the looked up value.
        YVal := _fbDepthToAngleLuT3.Out;
        Error := FALSE;
      ELSIF _fbDepthToAngleLuT3.Enable AND _fbDepthToAngleLuT3.Error THEN
        // Lookup didn't work. Send out the sentinel value.
        YVal := INVALID_SENTINEL;
        Error := TRUE;
      END_IF;
      // All done, set the done output
      Done := TRUE;
    ELSE
      // some sort of problem with the table number
      Error := TRUE;
      Done := TRUE;
    END_IF;
  ELSIF NOT Enable THEN
    // Enable is not high. Clear the OS and manage the output stauts
    _enableOS := FALSE;
    Active := FALSE;
    Done := FALSE;
    Error := FALSE;
    // status := ??; TODO: What should status be?
  END_IF;
      
END_FUNCTION_BLOCK
// Return the angle between pos A and pos B (A-B). Returns +/- 180 deg. +: Pos A ahead of B, -: Pos A behind B
FUNCTION fctAziDiff
  // Positive value: A is ahead of B,
  // Negative value: A is behind B.
  // Accounts for 360 degree rollover

  angle := _I_PosA - _I_PosB;
  // Deal with 360 deg rollover and normalize result to +/- 180 deg
  // Subtract target from position.
  // If the result < -180, add 360.
  // If the result > 180, subtract 360.
  IF angle < -180.0 THEN
    angle:= angle + 360.0;
  ELSIF angle > 180.0THEN
    angle := angle - 360.0;
  END_IF;
  fctAziDiff := angle;
END_FUNCTION

// LREAL Ceiling -- Return the smallest whole number not less than value
FUNCTION fctLRCeiling
  val1 := TRUNC(_I_Val);
  rem := _I_Val - val1; // the remainder portion
  IF rem > 0 THEN
    // non-zero remainder. Round up
    fctLRCeiling := val1 + 1.0;
  ELSE
    // no remainder -- must already be a whole number
    fctLRCeiling := val1;
  END_IF;
END_FUNCTION

// LREAL Floor -- Return the largest whole number as a LREAL not greater than value
FUNCTION fctLRFloor
  val1 := TRUNC(_I_Val);  // Trunc returns an integer, but it is put into a LREAL
  fctLRFloor := val1;
END_FUNCTION

// LREAL Fract -- Return the fractional part of a value 
FUNCTION fctLRFract
  val1 := TRUNC(_I_Val);
  fctLRFract := _I_Val - val1; // the remainder portion
END_FUNCTION

// MOD LREAL Return the remainder of Dividend MOD Divisor
FUNCTION fctLRMod
  val1 := _I_Dividend / _I_Divisor;
  rem := val1 - TRUNC(val1); // the remainder portion
  fctLRMod := rem * _I_Divisor; // remainder * divisor = mod
END_FUNCTION

// Return the source value (real) rounded to 1 decimal place 
FUNCTION fctRound1
  dintTemp:= LREAL_TO_DINT(_I_src * 10.0);
  fctRound1:= DINT_TO_REAL(dintTemp) / 10.0;
END_FUNCTION

// Return the source value (real) rounded to 2 decimal places
FUNCTION fctRound2
  // On SG4 systems the REAL_TO_DINT function rounds. 
  // Beware that on SG3 systems, it truncates.
  dintTemp:= LREAL_TO_DINT(_I_src * 100.0);
  fctRound2:= DINT_TO_REAL(dintTemp) / 100.0;
END_FUNCTION

// Return the source value (real) rounded to 3 decimal places
FUNCTION fctRound3
  // On SG4 systems the REAL_TO_DINT function rounds. 
  // Beware that on SG3 systems, it truncates.
  dintTemp:= LREAL_TO_DINT(_I_src * 1000.0);
  fctRound3:= DINT_TO_REAL(dintTemp) / 1000.0;
END_FUNCTION

// Return the source value (LREAL) rounded to 1 decimal place 
FUNCTION fctLRound1
  dintTemp:= LREAL_TO_DINT(_I_src * 10.0);
  fctLRound1:= DINT_TO_LREAL(dintTemp) / 10.0;
END_FUNCTION

// Return the source value (LREAL) rounded to 2 decimal places
FUNCTION fctLRound2
  // On SG4 systems the REAL_TO_DINT function rounds. 
  // Beware that on SG3 systems, it truncates.
  dintTemp:= LREAL_TO_DINT(_I_src * 100.0);
  fctLRound2:= DINT_TO_LREAL(dintTemp) / 100.0;
END_FUNCTION

// Return the source value (LREAL) rounded to 3 decimal places
FUNCTION fctLRound3
  // On SG4 systems the REAL_TO_DINT function rounds. 
  // Beware that on SG3 systems, it truncates.
  dintTemp:= LREAL_TO_DINT(_I_src * 1000.0);
  fctLRound3:= DINT_TO_LREAL(dintTemp) / 1000.0;
END_FUNCTION
