/* Automation Studio generated header file */
/* Do not edit ! */
/* GAMath  */

#ifndef _GAMATH_
#define _GAMATH_
#ifdef __cplusplus
extern "C" 
{
#endif

#include <bur/plctypes.h>

#ifndef _BUR_PUBLIC
#define _BUR_PUBLIC
#endif
/* Datatypes and datatypes of function blocks */
typedef struct fbCalcTrapMoveTime
{
	/* VAR_INPUT (analog) */
	float _I_Vel0;
	float _I_VelMove;
	float _I_Accel;
	float _I_Decel;
	double _I_Dist;
	/* VAR_OUTPUT (analog) */
	plctime _O_MoveTime;
	signed long _O_MoveTimeMsec;
	float _O_VelReached;
	double _O_Dcheck;
	/* VAR (analog) */
	float v0;
	float vMove;
	float accel;
	float decel;
	double dist;
	double tval1;
	double tval2;
	double tval3;
	double tval4;
	double tval5;
	double seconds;
} fbCalcTrapMoveTime_typ;



/* Prototyping of functions and function blocks */
_BUR_PUBLIC void fbCalcTrapMoveTime(struct fbCalcTrapMoveTime* inst);
_BUR_PUBLIC double fctAziDiff(double _I_PosA, double _I_PosB);
_BUR_PUBLIC double fctLRCeiling(double _I_Val);
_BUR_PUBLIC double fctLRFloor(double _I_Val);
_BUR_PUBLIC double fctLRFract(double _I_Val);
_BUR_PUBLIC double fctLRMod(double _I_Dividend, double _I_Divisor);
_BUR_PUBLIC float fctRound1(double _I_src);
_BUR_PUBLIC float fctRound2(double _I_src);
_BUR_PUBLIC float fctRound3(double _I_src);
_BUR_PUBLIC double fctLRound1(double _I_src);
_BUR_PUBLIC double fctLRound2(double _I_src);
_BUR_PUBLIC double fctLRound3(double _I_src);


#ifdef __cplusplus
};
#endif
#endif /* _GAMATH_ */

