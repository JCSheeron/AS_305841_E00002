FUNCTION fctCalcDepthFromAngle : REAL (* Return a depth value given an offset angle between the two axes. *)
  VAR_INPUT
    _I_Angle : LREAL; (* offset angle between axes LREAL to be compatible with motion *)
  END_VAR

  VAR
    angle : LREAL;    
  END_VAR
END_FUNCTION

FUNCTION fctCalcAngleFromDepth : LREAL (* Return an offset angle give a cutting depth. LREAL to be compatible with motion *)
  VAR_INPUT
    _I_Depth : REAL; (* cutting depth *)
  END_VAR

  VAR
    depth : REAL;
  END_VAR
END_FUNCTION

FUNCTION fctCalcPassDepth : REAL (* mm, Return a pass depth base on number of passes and finishing depth *)
  VAR_INPUT
    _I_TotalDepth : REAL; (* mm, final depth *)
    _I_PassCount : USINT; (* number of passes to take, not counting finishing pass *)
    _I_FPDepth : REAL; (* mm, depth of finishing pass. Zero to not have one *)
  END_VAR

  VAR
    fpDepth : REAL;
  END_VAR
END_FUNCTION

FUNCTION fctCalcCutVelocity : REAL (* deg/sec Return the cut velocity *)
  VAR_INPUT
    _I_InnerDiameter : REAL; (* mm. Inner diameter *)
    _I_FeedRate : REAL; (* mm/sec *)
  END_VAR
END_FUNCTION

FUNCTION fctCalcDepthAdjVelocity : REAL (* deg/sec Return the depth adjustment velocity *)
  VAR_INPUT
    _I_CutVelocity : REAL; (* mm. Inner diameter *)
    _I_DepthAdjAngle : LREAL; (* degrees. Arc over which to adjust the depth. LREAL to be compatible with motion *)
    _I_OffsetAngle : LREAL; (* degrees needed to acheive the depth. LREAL to be compatible with motion *)
  END_VAR
  VAR
    adjTime : REAL; (* sec. Time to travel adj arc *)
  END_VAR
END_FUNCTION


