
FUNCTION fctCalcPassDepth : REAL (* mm, Return a pass depth base on number of passes and finishing depth *)
  VAR_INPUT
    TotalDepth : REAL; (* mm, final depth *)
    PassCount : USINT; (* number of passes to take, not counting finishing pass *)
    FPDepth : REAL; (* mm, depth of finishing pass. Zero to not have one *)
  END_VAR

  VAR
    _fpDepth : REAL;
  END_VAR
END_FUNCTION

FUNCTION fctCalcCutVelocity : REAL (* deg/sec Return the cut velocity *)
  VAR_INPUT
    InnerDiameter : REAL; (* mm. Inner diameter *)
    FeedRate : REAL; (* mm/sec *)
  END_VAR
END_FUNCTION

