
// Given an X, find which of 3 tables to look in
FUNCTION fctGetTableNumberT3
  // Return a 1, 2, or 3 for which table to look in
  // NOTE: X values in each table need to be sorted in ascending order
  // NOTE: It is assumed that x values in table 1 < table 2 < table 3
  
  // If value is less than or equal the last value in table 1,
  // Then the value must be in or before table 1. Return 1.
  IF xVal <= t1.xVals[t1.vals - 1] THEN
    fctGetTableNumberT3 = 1;
    RETURN;
  ELSIF xVal >= t3.xVals[0] THEN
    // If value is greater than or equal to the first value in table 2,
    // Then the value must be in or after table 3. Return 3.
    fctGetTableNumberT3 = 3;
    RETURN;
  ELSE
    // The value must be too big to be in table 1, and too small to be in table 3.
    // It must be in table 2. Return 2.
    fctGetTableNumberT3 = 2;
    RETURN;
  END_IF;
  
END_FUNCTION
