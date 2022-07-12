
ACTION CalcSpecialPositions :
  // If there is an algorithm needed for calculating a different position, it can be done here
  // If not, just use the axis position.
  
  // CalculatedPosition1
  // Calculate the inner position relative to the outer position, in degrees. 
  // This assumes the zero/home position of both the Outer and Inner axes was set to zero when
  // the index lines are lined up with each other.
  // Calculated Position = Inner Pos - Outer Pos. 
  // Make the result be +/- 180 degrees:
  // If I-O > 180 :  Calc Pos = Result - 360
  // If I-O < -180 : Calc Pos = Result + 360
  // The fctAziDiff function in GAMath library does this (pos A - pos B)
  
  IF NOT axes[AD_INNER_ECCENTRIC].Status.IsHomed OR NOT axes[AD_OUTER_ECCENTRIC].Status.IsHomed THEN
    // Inner and/or outer axis is not homed.
    // Use the sentinel value for the calculated positions. 
    ax.Status.CalculatedPosition1 := INVALID_SENTINEL_REAL;
  ELSE
    // Both the inner and outer axes are referenced.
    // Calc the difference between them. I - O
    ax.Status.CalculatedPosition1 := fctAziDiff(
    _I_PosA :=  ax.Status.Position,
    _I_PosB := axes[AD_OUTER_ECCENTRIC].Status.Position);
  END_IF;
  
  ax.Status.CalculatedPosition2 := ax.Status.Position;
  ax.Status.CalculatedPosition3 := ax.Status.Position;
  
END_ACTION
