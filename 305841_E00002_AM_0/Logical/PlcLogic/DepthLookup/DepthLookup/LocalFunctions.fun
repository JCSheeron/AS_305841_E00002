

FUNCTION fctGetTableNumberT3 : UINT (* Given an X, find which table to look in *)
	VAR_INPUT
    xVal : REAL;
		t1 : REFERENCE TO sXYTableReal50; (* X Values for table 1 *)
		t2 : REFERENCE TO sXYTableReal50; (* X Values for table 2 *)
		t3 : REFERENCE TO sXYTableReal50; (* X Values for table 3 *)
	END_VAR
END_FUNCTION
