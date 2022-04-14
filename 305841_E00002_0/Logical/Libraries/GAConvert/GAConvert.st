(********************************************************************
 * COPYRIGHT -- General Atomics
 ********************************************************************
 * Program: HBConvert
 * File: HBConvert.st
 * Author: Administrator
 * Created: November 03, 2013
 ********************************************************************
 * Implementation of program HBConvert
 ********************************************************************)

(* Split a UINT into two USINTs *)
FUNCTION UINT_TO_2USINT // Return bool true always
  //	VAR_INPUT
  //		src_int : UINT; (* input int which gets divided into two bytes *)
  //	END_VAR
  //	VAR_IN_OUT
  //		dest0 : USINT; (* lower byte of UINT *)
  //		dest1 : USINT; (* upper byte of UINT *)
  //	END_VAR
	  
	dest0:= UINT_TO_USINT(src_int); 
	dest1:= UINT_TO_USINT(SHR(src_int, 8));
	UINT_TO_2USINT:= TRUE; // always return true
END_FUNCTION


 (* Pack two USINTs into a UINT and return the UINT *)
FUNCTION USINT2_TO_UINT // return a UINT
  //	VAR_INPUT
  //		src0 : USINT; (* USINT to be converted to lower order byte of UINT *)
  //		src1 : USINT; (* USINT to be converted to higher order byte of UINT *)
  //	END_VAR

	// shift hi byte up by 8, and OR with low byte
	USINT2_TO_UINT:= SHL(USINT_TO_UINT(src1),8) OR src0;
END_FUNCTION 


 (* Pack 4 USINTs into a UDINT and return the UDINT *)
FUNCTION USINT4_TO_UDINT  // Return UDINT
  //	VAR_INPUT
  //		src0 : USINT; (* USINT to be converted to lower order byte of UDINT *)
  //		src1 : USINT; (* USINT to be converted to second byte of UDINT *)
  //		src2 : USINT; (* USINT to be converted to third byte of UDINT *)
  //		src3 : USINT; (* USINT to be converted to highest order byte of UDINT *)
  //	END_VAR

	// shift hi byte up by 24 and next byte up by 16
	tempUDINT1:= SHL(USINT_TO_UDINT(src1), 8) OR src0; // lower two bytes
	tempUDINT2:= SHL(USINT_TO_UDINT(src3), 24) OR SHL(USINT_TO_UDINT(src2), 16); // hightest two bytes
  USINT4_TO_UDINT:= tempUDINT1 OR tempUDINT2;
END_FUNCTION

(* Convert an axis index 1-24 to a column pair index 1-6 *)
(* if foot index is outside the 1-24 range, return 0 *)
FUNCTION AxisIndex_To_ColPairIndex  // return DINT
//  VAR_INPUT
//    axisIndex : DINT;
//  END_VAR

// axis index 1, 2, 13, or 14 return colum pair index 1
// axis index 3, 4, 15, or 16 return column pair index 2
// axis index 5, 6, 17, or 18 return column pair index 3
// axis index 7, 8, 19, or 29 return column pair index 4
// axis index 9, 10, 21, or 22 return column pair index 5
// axis index 11, 12, 23, or 24 return column pair index 6

  // if the axis index is 1-12 (a foot) then the column pair index is = (foot index + foot index mod 2) / 2
  // if the axis index is 13-24 (a column) then the colum pair is the same as above, but first subtract 12 from the axis index
  IF axisIndex >= 1 AND axisIndex <= 12 THEN
    // axis index is a foot
    AxisIndex_To_ColPairIndex:= (axisIndex + (axisIndex MOD 2)) / 2;
  ELSIF axisIndex > 12 AND axisIndex <= 24 THEN
    // axis index is a column
    tempIndex:= axisIndex - 12;
    AxisIndex_To_ColPairIndex:= (tempIndex + (tempIndex MOD 2)) / 2;
  ELSE
    // axis index is invalid
    AxisIndex_To_ColPairIndex:= 0;
  END_IF;

END_FUNCTION
