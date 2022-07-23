(********************************************************************
 * COPYRIGHT -- General Atomics
 ********************************************************************
 * Library: GAMath
 * File: GAMathj.fun
 * Author: J Sheeron
 ********************************************************************
 * Functions and function blocks of library GAMath
 ********************************************************************)

FUNCTION_BLOCK fbCalcTrapMoveTime
  VAR_INPUT
    _I_Vel0 : REAL := 0.0; (* units/sec starting velocity *)
    _I_VelMove : REAL; (* units/sec desired move velocity*)
    _I_Accel : REAL; (* untis/sec^2 *)
    _I_Decel : REAL; (* untis/sec^2 *)
    _I_Dist : LREAL; (* units, LREAL to be compatible with motion system *)
  END_VAR
  
  VAR_OUTPUT
    _O_MoveTime : TIME; (* how long will the move take as a TIME type *)
    _O_MoveTimeMsec : DINT; (* mSec, how long the move will take *)
    _O_VelReached : REAL; (* units/sec. Velocity reached will be <= VelMove for triangular profiles, dist < Dcheck *)
    _O_Dcheck : LREAL; (* units. Distances > than this have a trapazoidal shape and VelReached = VelMove *)
  END_VAR
    
  VAR
    v0 : REAL; (* internal copy of input *)
    vMove : REAL; (* internal copy of input *)
    accel : REAL; (* internal copy of input *)
    decel : REAL; (* internal copy of input *)
    dist : LREAL; (* internal copy of input *)
    tval1  : LREAL; (* temporary value *)
    tval2  : LREAL; (* temporary value *)
    tval3  : LREAL; (* temporary value *)
    tval4  : LREAL; (* temporary value *)
    tval5  : LREAL; (* temporary value *)
    seconds : LREAL; (* temporary value *)
  END_VAR
END_FUNCTION_BLOCK

FUNCTION_BLOCK fbLookUpYValT3 (* Given an X, get the Y value. Interpolate if needed. *)
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

FUNCTION fctAziDiff : LREAL (* Return the angle between pos A and pos B (A-B). Returns +/- 180 deg. +: Pos A ahead of B, -: Pos A behind B *)
  (*
  Result is +/- 180 degrees
  Positive value: A is ahead of B.
  Negative value: A is behind B.
  Account for 360 deg rollover. *)
  VAR_INPUT
    _I_PosA : LREAL;
    _I_PosB : LREAL;
  END_VAR
  
  VAR
    angle : LREAL;  
  END_VAR
END_FUNCTION

FUNCTION fctLRCeiling : LREAL (* LREAL Ceiling -- Return the smallest whole number not less than value *)
  VAR_INPUT
    _I_Val : LREAL;
  END_VAR
  
  VAR
    val1 : LREAL;
    rem : LREAL;  
  END_VAR
END_FUNCTION

FUNCTION fctLRFloor : LREAL (* LREAL floor -- Return the largest whole number not greater than value *)
  VAR_INPUT
    _I_Val : LREAL;
  END_VAR
  
  VAR
    val1 : LREAL;
  END_VAR
END_FUNCTION

FUNCTION fctLRFract : LREAL (* LREAL fractional -- Return the fractional part of a value *)
  VAR_INPUT
    _I_Val : LREAL;
  END_VAR
  
  VAR
    val1 : LREAL;
  END_VAR
END_FUNCTION

FUNCTION fctLRMod : LREAL (* LREAL MOD -- Return the remainder of Dividend MOD Divisor *)
  VAR_INPUT
    _I_Dividend : LREAL;
    _I_Divisor : LREAL;
  END_VAR
  
  VAR
    val1 : LREAL;
    rem : LREAL;  
  END_VAR
END_FUNCTION

FUNCTION fctRound1 : REAL (* Return the source value (real) rounded to 1 decimal place *)
  VAR_INPUT
    _I_src : LREAL; (* REAL value to be rounded *)
  END_VAR
  VAR
    dintTemp : DINT; (* temp value *)
  END_VAR
END_FUNCTION

FUNCTION fctRound2 : REAL (* Return the source value (real) rounded to 2 decimal places *)
  VAR_INPUT
    _I_src : LREAL; (* REAL value to be rounded *)
  END_VAR
  VAR
    dintTemp : DINT; (* temp value *)
  END_VAR
END_FUNCTION

FUNCTION fctRound3 : REAL (* Return the source value (real) rounded to 2 decimal places *)
  VAR_INPUT
    _I_src : LREAL; (* REAL value to be rounded *)
  END_VAR
  VAR
    dintTemp : DINT; (* temp value *)
  END_VAR
END_FUNCTION

FUNCTION fctLRound1 : LREAL (* Return the source value (LREAL) rounded to 1 decimal place *)
  VAR_INPUT
    _I_src : LREAL; (* REAL value to be rounded *)
  END_VAR
  VAR
    dintTemp : DINT; (* temp value *)
  END_VAR
END_FUNCTION

FUNCTION fctLRound2 : LREAL (* Return the source value (LREAL) rounded to 2 decimal places *)
  VAR_INPUT
    _I_src : LREAL; (* REAL value to be rounded *)
  END_VAR
  VAR
    dintTemp : DINT; (* temp value *)
  END_VAR
END_FUNCTION

FUNCTION fctLRound3 : LREAL (* Return the source value (LREAL) rounded to 2 decimal places *)
  VAR_INPUT
    _I_src : LREAL; (* REAL value to be rounded *)
  END_VAR
  VAR
    dintTemp : DINT; (* temp value *)
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
