(********************************************************************
 * COPYRIGHT -- General Atomics
 ********************************************************************
 * Library: GAConvert
 * File: GAConvert.fun
 * Author: Administrator
 * Created: November 03, 2013
 ********************************************************************
 * Functions and function blocks of library GAConvert
 ********************************************************************)

FUNCTION USINT2_TO_UINT : UINT (* Pack two USINTs into a UINT and return the UINT *)
  VAR_INPUT
    src0 : USINT; (* USINT to be converted to lower order byte of UINT *)
    src1 : USINT; (* USINT to be converted to higher order byte of UINT *)
  END_VAR
END_FUNCTION

FUNCTION USINT4_TO_UDINT : UDINT (* Pack 4 USINTs into a UDINT and return the UDINT *)
  VAR_INPUT
    src0 : USINT; (* USINT to be converted to lower order byte of UDINT *)
    src1 : USINT; (* USINT to be converted to second byte of UDINT *)
    src2 : USINT; (* USINT to be converted to third byte of UDINT *)
    src3 : USINT; (* USINT to be converted to highest order byte of UDINT *)
  END_VAR
  VAR
    tempUDINT1 : UDINT; (* temporary holding spot *)
    tempUDINT2 : UDINT; (* temporary holding spot *)
  END_VAR
END_FUNCTION

FUNCTION UINT_TO_2USINT : BOOL (* Split UINT to two USINTs *)
	VAR_INPUT
		src_int : UINT; (* input int which gets divided into two bytes *)
	END_VAR
	VAR_IN_OUT
		dest0 : USINT; (* lower byte of UINT *)
		dest1 : USINT; (* upper byte of UINT *)
	END_VAR
END_FUNCTION

FUNCTION AxisIndex_To_ColPairIndex : DINT (* Convert an axis index 1-24 to column pair index 1-6 and return the colum pair index *)
  VAR_INPUT
    axisIndex : DINT;
  END_VAR
  VAR
    tempIndex : DINT;
  END_VAR
END_FUNCTION
