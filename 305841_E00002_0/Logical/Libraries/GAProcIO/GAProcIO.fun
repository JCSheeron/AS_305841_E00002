(********************************************************************
 * COPYRIGHT -- General Atomics
 ********************************************************************
 * Library: GAProcIO
 * File: GAProcIO.fun
 * Author: Administrator
 * Created: September 11, 2015
 ********************************************************************
 * Functions and function blocks of library GAAnalog
 ********************************************************************)

FUNCTION_BLOCK fbSclAlmAI (* Scale analog input and process alarms using the reference parameters *)
	VAR_INPUT
		_InInputStruct : REFERENCE TO sAnalogInput; (* structure representing the analog input to scale *)
		_InParamsStruct : REFERENCE TO sAnalogInputParams; (* structure representing the analog parameters *)
		_InSentinel : REAL; (* value to use if signal is invalid *) (* Set the scaling params and alm timer delays upon rising edge *) (* Must go low and high again to set again *)
		_InSetParams : BOOL := FALSE;
	END_VAR
	VAR
		SetParamsOS : BOOL := FALSE; (* set parameters one-shot *)
		rawAdj : REAL;
		almsRaw : UDINT; (* non-time delayed alarms *) (* deadband values, calculated from EU range and db pct *) (* pvs must rise above threshold by the corresponding value in order to be considered clear *)
		almRangeLoDbVal : REAL;
		almRangeHiDbVal : REAL;
		almLoLoDbVal : REAL;
		almLoDbVal : REAL; (* pvs must drop below threshold by the corresponding value in order to be considered clear *)
		almHiDbVal : REAL;
		almHiHiDbVal : REAL; (* alarm timers *)
		tmrAlmRangeLoOn : TON; (* on delay timers *)
		tmrAlmLoLoOn : TON;
		tmrAlmLoOn : TON;
		tmrAlmRangeHiOn : TON;
		tmrAlmHiOn : TON;
		tmrAlmHiHiOn : TON;
		tmrAlmRangeLoOff : TOF; (* off delay timers *)
		tmrAlmLoLoOff : TOF;
		tmrAlmLoOff : TOF;
		tmrAlmRangeHiOff : TOF;
		tmrAlmHiOff : TOF;
		tmrAlmHiHiOff : TOF;
		fbNoiseFilter : fbLpFilter; (* filter the scaled value *)
	END_VAR
END_FUNCTION_BLOCK

FUNCTION_BLOCK fbLpFilter (* Low pass filter *)
	VAR_INPUT
		_InPassThru : BOOL := FALSE; (* filter coefficient *) (* Value between 0 and 1, not inclusive of 1. *) (* K=0 no filtering, K=0.9999 lots of filtering *)
		_InK : REAL := 0.0;
		_InVal : REAL; (* input value *)
	END_VAR
	VAR_OUTPUT
		_OutFilteredVal : REAL; (* filtered value output  *)
	END_VAR
	VAR
		lastOut : REAL;
		firstScanOS : BOOL := FALSE;
		KChecked : REAL := 0.0;
	END_VAR
END_FUNCTION_BLOCK

FUNCTION_BLOCK fbProcDI (* process DI *)
	VAR_INPUT
		_InInputStruct : REFERENCE TO sDigitalInput; (* structure representing the digital input to process *)
		_InParamsStruct : REFERENCE TO sDigitalInputParams; (* structure representing the digital input parameters *)
		_InSentinel : BOOL := FALSE; (* value to use if signal is invalid *) (* Set the params and alm timer delays upon rising edge *) (* Must go low and high again to set again *)
		_InSetParams : BOOL := FALSE;
	END_VAR
	VAR
		SetParamsOS : BOOL := FALSE; (* set parameters one-shot *)
    value : BOOL;
    valueDly : BOOL;
    almsRaw : UDINT;
    prevParams : sDigitalInputParams; (* previous params -- used for auto param update *)
    paramSize : UDINT := 0;
    cmpResult : DINT;
		tmrOn : TON;
		tmrAlmLoOn : TON;
		tmrAlmHiOn : TON;
		tmrOff : TOF; (* non-time delayed alarms *)
		tmrAlmLoOff : TOF;
		tmrAlmHiOff : TOF;
	END_VAR
END_FUNCTION_BLOCK

FUNCTION_BLOCK fbProcPB
	VAR_INPUT
    _InPBIn : BOOL := FALSE;
    _InPBClear : BOOL := FALSE; (* Force state to be cleared *)
		_InPBType : eGAPIO_PB_BEHAVIOR_TYPE := GAPIO_PBBT_MOMENTARY;
		_InPulseTime : TIME := T#500ms;
	END_VAR
	VAR_OUTPUT
		_OutState : BOOL := FALSE;
	END_VAR
	VAR
		pressOS : BOOL := FALSE;
		state : BOOL := FALSE;
		tmrPulse : TON;
	END_VAR
END_FUNCTION_BLOCK
