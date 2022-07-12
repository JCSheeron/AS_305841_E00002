FUNCTION_BLOCK fbLookUpYValT3 (* Given an X, get the possibly interpolated value for Y *)
	VAR CONSTANT
		INVALID_SENTINEL : REAL := -9999.0;
	END_VAR
  
	VAR_INPUT
    LoadTables : BOOL; (* load lookup table values *)
    Enable : BOOL; (* trigger a lookup *)
		XVal : REAL; (* x value to lookup *)
		T1 : REFERENCE TO sXYTableReal50; (* table 1 *)
		T2 : REFERENCE TO sXYTableReal50; (* table 2 *)
		T3 : REFERENCE TO sXYTableReal50; (* table 3 *)
	END_VAR
  
	VAR_OUTPUT
    IsTablesLoaded : BOOL; (* look up tables have been loaded *)
    Active : BOOL;
    Done : BOOL;
    Error : BOOL;
		YVal : REAL; (* looked up and interpolated Y value *)
	END_VAR
  
	VAR
    (* oneshots *)
    _loadOS : BOOL := FALSE;
    _enableOS : BOOL := FALSE;
    (* which table to use *)
		_xValPrev : REAL; (* previous x value to lookup *)
    _tableNumber : USINT;
    (* table lookup fbs*)
		_fbDepthToAngleLuT1 : MTLookUpTable;
		_fbDepthToAngleLuT2 : MTLookUpTable;
		_fbDepthToAngleLuT3 : MTLookUpTable;
	END_VAR
END_FUNCTION_BLOCK

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
	END_VAR
  
  VAR_OUTPUT
    Active : BOOL := FALSE;
    Done : BOOL := FALSE;
    Error : BOOL := FALSE;
  END_VAR
  
	VAR
    enableOS : BOOL := FALSE;
		_numPasses : USINT; (* conditioned number of passes *)
		_finalDepth : REAL; (* conditioned final cut depth *)
		_finishPassDepth : REAL; (* conditioned finishing pass depth. Set to 0 for no finish pass. *)
		_cutInAngle : REAL; (* conditioned value *)
		_overCutAngle : REAL; (* conditioned value *)
    seqCtr : SINT; (* sequence counter *)
		passCtr : USINT; (* pass counter *)
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
