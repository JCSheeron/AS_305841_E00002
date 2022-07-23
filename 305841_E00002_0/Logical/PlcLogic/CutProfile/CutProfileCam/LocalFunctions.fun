
FUNCTION_BLOCK fbCalcCamSections (* Calculate the master and slave angles given cut parameters *)
	VAR_INPUT
    Enable : BOOL;
		PassCount : USINT := 1; (* number of passes *)
		FinalDepth : REAL; (* final cut depth, in units of lookup table *)
		FinishPassDepth : REAL := 0.0; (* finishing pass depth. In units of lookup table. Set to 0 for no finish pass. *)
		CutInAngle : REAL; (* degrees *)
		OverCutAngle : REAL; (* degrees *)
		CamTable : REFERENCE TO McCamSectionsType; (* X values master angle, Y values slave angle *)
		DepthToAngle_T1 : REFERENCE TO sXYTableReal50;
		DepthToAngle_T2 : REFERENCE TO sXYTableReal50;
		DepthToAngle_T3 : REFERENCE TO sXYTableReal50;
    PartMotion : REFERENCE TO sPartMotion;
	END_VAR
  
  VAR_OUTPUT
    Active : BOOL := FALSE;
    Done : BOOL := FALSE;
    Error : BOOL := FALSE;
  END_VAR
  
	VAR
    _enableOS : BOOL := FALSE;
		_numPasses : USINT; (* conditioned number of passes *)
		_finalDepth : REAL; (* conditioned final cut depth *)
		_finishPassDepth : REAL; (* conditioned finishing pass depth. Set to 0 for no finish pass. *)
		_cutInAngle : REAL; (* conditioned value *)
		_overCutAngle : REAL; (* conditioned value *)
    _seqCtr : SINT; (* sequence counter *)
		_passCtr : USINT; (* pass counter *)
		_incrCutDepth : REAL; (* incremental depth of a nominal pass *)
		_totalPassDepth : REAL; (* accum depth for the pass *)
		_passAngle : REAL;
		_idx : USINT; (* index *)
    (* lookup angle from depth fb *)
    _fbLookupAngle : fbLookUpYValT3;
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
