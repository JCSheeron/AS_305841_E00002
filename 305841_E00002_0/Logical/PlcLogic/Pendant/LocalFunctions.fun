
FUNCTION fctDecodeSpeed : REAL (* Decode 4 graycode inputs and return an axis designation *)
	VAR_INPUT
		_InA : BOOL;
		_InB : BOOL;
		_InC : BOOL;
		_InD : BOOL := FALSE;
	END_VAR
	VAR
		val : USINT := 0;
	END_VAR
END_FUNCTION

FUNCTION fctDecodeAxis : eAXIS_DESIGNATION (* Decode 4 graycode inputs and return an axis designation *)
	VAR_INPUT
		_InA : BOOL;
		_InB : BOOL;
		_InC : BOOL;
		_InD : BOOL := FALSE;
	END_VAR
	VAR
		val : USINT := 0;
	END_VAR
END_FUNCTION

FUNCTION_BLOCK fbCalcGearRatio (* Calc the handwheel:selected axis gear ratio *)
	VAR_INPUT
    _I_SlaveAxisDesignation : eAXIS_DESIGNATION;
		_I_SelectedSpeed : REAL;
	END_VAR
  VAR_OUTPUT
		_O_RatioNumerator : DINT;
		_O_RatioDenominator : DINT;
  END_VAR
	VAR
	END_VAR
END_FUNCTION_BLOCK

FUNCTION_BLOCK fbEnabledAxis
	VAR_INPUT
		SFCInit : BOOL; (*FunctionBlock initialization*)
    _I_PendantEnabled : BOOL;
    _I_AxEnabled : BOOL;
    _I_AxisHandwheel : REFERENCE TO sMot_Axis;
    _I_pAxisSelected : UDINT := 0; (* pointer to the selected axis *)
    _I_Pendant : REFERENCE TO sPendant;
	END_VAR
  
  VAR_OUTPUT

  END_VAR
  
	VAR
    axisSelected : REFERENCE TO sMot_Axis;
    currentStep : USINT := 0;
    selAxisNoPrev : USINT; (* detect changes to the selected axis *)
    selSpeedPrev : REAL; (* detect changes *)
    tmrStep : TON;
    CalcGearRatioFb : fbCalcGearRatio;
		zzInternalMemory : ARRAY[0..27] OF SINT; (*Internal memory*)
	END_VAR
  
  VAR CONSTANT
    STP_INIT : USINT := 0;
    STP_ENABLE_WAIT : USINT := 1;
    STP_NEW_AXIS_SEL : USINT := 2;
    STP_SETUP : USINT := 3;
    STP_ENGAGE_SEL_AX : USINT := 4;
    STP_DECOUPLE : USINT := 5;
    
  END_VAR
END_FUNCTION_BLOCK
