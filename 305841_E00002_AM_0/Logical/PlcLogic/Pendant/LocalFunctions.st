
// Decode 4 graycode inputs and return an axis designation
FUNCTION fctDecodeAxis
  (* A  B  C  D   Val   SwPos   Axis
     0  0  0  0   0     1 (X)   AD_X
     1  0  0  0   1     2 (Y)   AD_Y
     1  1  0  0   3     3 (Z)   AD_Z
     0  1  0  0   2     4 (4)   AD_OUTER_ECCENTRIC
     0  1  1  0   6     5 (5)   AD_INNER_ECCENTRIC
     1  1  1  0   7     6 (6)   AD_SPINDLE 
      any other                 AD_UNKNOWN *)
  // Note D is always zero so that input param has a default of 0 (false)
  // Bit pack the values into an internal value to make value comparisons easier than
  // using each of the 4 inputs.
  // First init the value
  val := 0;
  val.0 := _InA;
  val.1 := _InB;
  val.2 := _InC;
  val.3 := _InD;
  IF val = 0 THEN
    fctDecodeAxis := AD_X;
  ELSIF val = 1 THEN
    fctDecodeAxis := AD_Y;
  ELSIF val = 3 THEN
    fctDecodeAxis := AD_Z;
  ELSIF val = 2 THEN
    fctDecodeAxis := AD_OUTER_ECCENTRIC;
  ELSIF val = 6 THEN
    fctDecodeAxis := AD_INNER_ECCENTRIC;
  ELSIF val = 7 THEN
    fctDecodeAxis := AD_SPINDLE;
  ELSE
    fctDecodeAxis := AD_UNKNOWN;
  END_IF;

END_FUNCTION

// Decode 4 graycode inputs and return a speed value
FUNCTION fctDecodeSpeed
  (* A  B  C  D   Val   Speed (Rtn value)
     0  0  0  0   0     0.0
     1  0  0  0   1     1.0
     1  1  0  0   3     10.0
     0  1  0  0   2     100.0
     0  1  1  0   6     1000.0
      any other         0         *)
  // Note D is always zero so that input param has a default of 0 (false)
  // Bit pack the values into an internal value to make value comparisons easier than
  // using each of the 4 inputs.
  // First init the value
  val := 0;
  val.0 := _InA;
  val.1 := _InB;
  val.2 := _InC;
  val.3 := _InD;
  IF val = 0 THEN
    fctDecodeSpeed := 0.0;
  ELSIF val = 1 THEN
    fctDecodeSpeed := 1.0;
  ELSIF val = 3 THEN
    fctDecodeSpeed := 10.0;
  ELSIF val = 2 THEN
    fctDecodeSpeed := 100.0;
  ELSIF val = 6 THEN
    fctDecodeSpeed := 1000.0;
  ELSE
    fctDecodeSpeed := 0.0;
  END_IF;

END_FUNCTION

FUNCTION_BLOCK fbCalcGearRatio (* Calc the selected axis:handwheel gear ratio *)
  (* Calc the gear ratio needed based on the selected slave, the selected speed
  and the measurement ratios.
  The handwheel has 100 indexed positions per turn.
  
  For the Z and X (depth) axes, the speed selections
  correspons to the following physical units per discrete handwheel index:
  Speed Select Value    HW Increment (in)   HW Increment (mm)   degrees
  0                     0                   0
  1.0                   0.0001              0.00254              0.0036
  10.0                  0.0010              0.0254               0.036
  100 .0                0.0100              0.254                0.36
  1000.0                0.1000              2.540                3.6 (360 degrees / 100 hw incr.)
  
  The ratio is calculated as follows:
  Numerator: Gear factor of the slave / Measurement resolution of the slave
  Denominator: Gear factor of the master / Measurement resolution of the master
  
  Spindle axis scaled 0-1 revolution,
  Outer and inner eccentrics scaled 0-360 degrees,
  Z scaled in mm
  *)
  
  // It turns out the numerator and denominator are big in all cases. 
  // Keep the math to show the thinking, but divide by 100 to make the numbers friendlier
  IF _I_SlaveAxisDesignation = AD_SPINDLE THEN
    // At 1000 speed, slave goes 1 rev for every 360 degrees of the handwheel
    _O_RatioNumerator := REAL_TO_DINT(_I_SelectedSpeed * 1.0 / AXIS_SPINDLE_MEAS_RESOLUTION) / 100; // slave
    _O_RatioDenominator := REAL_TO_DINT(360.0 / AXIS_HW_MEAS_RESOLUTION) / 100; // master 
  ELSIF _I_SlaveAxisDesignation = AD_OUTER_ECCENTRIC THEN
    // At 1000 speed, slave goes 360 for every 360 degrees of the handwheel
    _O_RatioNumerator := REAL_TO_DINT(_I_SelectedSpeed * 360.0 / AXIS_OUTE_MEAS_RESOLUTION) / 100; // slave
    _O_RatioDenominator := REAL_TO_DINT(360.0 / AXIS_HW_MEAS_RESOLUTION) / 100; // master 
  ELSIF _I_SlaveAxisDesignation = AD_INNER_ECCENTRIC OR _I_SlaveAxisDesignation = AD_X THEN
    // Treat X and the inner eccentric the same
    // At 1000 speed, slave goes 360 for every 360 degrees of the handwheel
    _O_RatioNumerator := REAL_TO_DINT(_I_SelectedSpeed * 360.0 / AXIS_INE_MEAS_RESOLUTION) / 100; // slave
    _O_RatioDenominator := REAL_TO_DINT(360.0 / AXIS_HW_MEAS_RESOLUTION) / 100; // master 
  ELSIF _I_SlaveAxisDesignation = AD_Z THEN
    // At 1000 speed, slave goes 0.1 * 100, or 10 inches (254 mm) for every 360 degrees of the handwheel
    (*
    _O_RatioNumerator := REAL_TO_DINT(_I_SelectedSpeed * 254.0 / AXIS_Z_MEAS_RESOLUTION) / 100; // slave
    _O_RatioDenominator := REAL_TO_DINT(360.0 / AXIS_HW_MEAS_RESOLUTION) / 100; // master
    *)
    // Test Values
    _O_RatioNumerator := 254; // slave
    _O_RatioDenominator := 3600; // master
  ELSE
    // Other axis
    // TODO: ? Error ? Use an arbitrary slow ratio
    _O_RatioNumerator := REAL_TO_DINT(_I_SelectedSpeed); // slave turns
    _O_RatioDenominator := REAL_TO_DINT(100.0); // master 
  END_IF;
  
END_FUNCTION_BLOCK
