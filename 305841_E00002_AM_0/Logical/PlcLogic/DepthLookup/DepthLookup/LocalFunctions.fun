FUNCTION_BLOCK fbLookUpYValT3 (* Given an X, get the possibly interpolated value for Y *)
	VAR CONSTANT
		INVALID_SENTINEL : REAL := -9999.0;
	END_VAR
  
	VAR_INPUT
		xVal : REAL;
		t1 : REFERENCE TO sXYTableReal50; (* table 1 *)
		t2 : REFERENCE TO sXYTableReal50; (* table 2 *)
		t3 : REFERENCE TO sXYTableReal50; (* table 3 *)
	END_VAR
  
	VAR_OUTPUT
		yVal : REAL;
	END_VAR
  
	VAR
    tableNumber : USINT;
		fbDepthToAngleLu : MTLookUpTable;
	END_VAR
END_FUNCTION_BLOCK

FUNCTION_BLOCK fbPopulateCamTable (* Calculate the master and slave angles given cut parameters *)
	VAR_INPUT
		numPasses : USINT := 1; (* number of passes *)
		finalDepth : REAL; (* final cut depth, in units of lookup table *)
		finishPassDepth : REAL := 0.0; (* finishing pass depth. In units of lookup table. Set to 0 for no finish pass. *)
		cutInAngle : REAL; (* degrees *)
		overCutAngle : REAL; (* degrees *)
		camTable : REFERENCE TO McCamSectionsType; (* X values master angle, Y values slave angle *)
		depthToAngle_T1 : REFERENCE TO sXYTableReal50;
		depthToAngle_T2 : REFERENCE TO sXYTableReal50;
		depthToAngle_T3 : REFERENCE TO sXYTableReal50;
	END_VAR
	VAR
		_numPasses : USINT; (* conditioned number of passes *)
		_finalDepth : REAL; (* conditioned final cut depth *)
		_finishPassDepth : REAL; (* conditioned finishing pass depth. Set to 0 for no finish pass. *)
		_cutInAngle : REAL; (* conditioned value *)
		_overCutAngle : REAL; (* conditioned value *)
		passCount : USINT; (* pass counter *)
		incrCutDepth : REAL; (* incremental depth of a nominal pass *)
		totalPassDepth : REAL; (* accum depth for the pass *)
		passAngle : REAL;
		idx : USINT; (* index *)
    (* lookup angle from depth fb *)
    fbLookupAngle : fbLookUpYValT3;
	END_VAR
END_FUNCTION_BLOCK

FUNCTION fctGetTableNumberT3 : USINT (* Given an X, find which table to look in *)
	VAR_INPUT
		xVal : REAL;
		t1 : REFERENCE TO sXYTableReal50; (* table 1 *)
		t2 : REFERENCE TO sXYTableReal50; (* table 2 *)
		t3 : REFERENCE TO sXYTableReal50; (* table 3 *)
	END_VAR
END_FUNCTION

FUNCTION fctSwapTableT3 : USINT (* Swap X & Y columns *)
	VAR_INPUT
		table : REFERENCE TO sXYTableReal50; (* table to swap the X & Y values of *)
	END_VAR
	VAR
		tVals : ARRAY[0..49] OF REAL; (* temporary storage *)
		length : UDINT; (* mem copy length in bytes *)
		nextAddr : UDINT; (* return from memcpy *)
	END_VAR
END_FUNCTION
