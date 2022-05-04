
FUNCTION_BLOCK fbHomeAbsSeq
  VAR_INPUT
    _I_Enable   : BOOL;
    _I_Axis     : REFERENCE TO sMot_Axis;
    _I_Position : LREAL;
  END_VAR
  VAR_OUTPUT
    _O_Done  : BOOL;
    _O_Busy  : BOOL;
    _O_Error : BOOL;
    _O_Homed : BOOL;
    _O_State : eGAMOT_HOME_FB_STATUS; 
  END_VAR
  VAR
    enableOS : BOOL;
  END_VAR
  VAR CONSTANT
  END_VAR
END_FUNCTION_BLOCK

FUNCTION_BLOCK fbProcessHmiAxisReq   (* Process axis requests from HMI and populate axis structure(s) *)
  VAR_INPUT
    _I_HmiAxisReq : REFERENCE TO sMot_HmiAxisReqs;
    _I_Axis : REFERENCE TO sMot_Axis;
    _I_SlaveAxis : REFERENCE TO sMot_Axis;
    _I_AxisPositionLimits : REFERENCE TO sMot_PositionLimits;
  END_VAR
	
  VAR
    pHmi :  UDINT;
    pMoveParams :  UDINT;
    size :  UDINT;
    nxtAddr :  UDINT;
    fbHomeSeq : fbHomeAbsSeq;
  END_VAR
  
END_FUNCTION_BLOCK

FUNCTION_BLOCK fbUpdateBasicParams
  VAR_INPUT
    _I_Axis : REFERENCE TO sMot_Axis;
  END_VAR
  VAR_IN_OUT
    _IO_MpParams : MpAxisBasicParType; (* Mapp Motion move param structure *)
	END_VAR
  VAR
		updateOS :  BOOL := FALSE;
    result : DINT;
    pParamsStart :  UDINT := 0;
    pParamsEnd :  UDINT := 0;
    pParamsPrev :  UDINT := 0;
    size : UDINT := 0;
    nxtAddr : UDINT;
  END_VAR
END_FUNCTION_BLOCK

FUNCTION fctCalcAbsHomeOffset : LREAL (* Return encoder offset for absolute home mode *)
  VAR_INPUT
    _I_CurrentPos : LREAL;
    _I_DesiredPos : LREAL;
    _I_SetZeroOffset : LREAL := 0.0;
  END_VAR
END_FUNCTION

FUNCTION fctCheckEqCamInParams : BOOL (*Return true if the two structures are equal*)
	VAR_INPUT
		_I_ParamsA : REFERENCE TO sMot_CouplingParameters;
		_I_ParamsB : REFERENCE TO sMot_CouplingParameters;
	END_VAR
	VAR
    pParamsStart :  UDINT := 0;
    pParamsEnd :  UDINT := 0;
    pParamsPrev :  UDINT := 0;
    size : UDINT := 0;
    result : UDINT;
	END_VAR
END_FUNCTION

FUNCTION fctCheckEqGearInParams : BOOL (*Return true if the two structures are equal*)
	VAR_INPUT
		_I_ParamsA : REFERENCE TO sMot_CouplingParameters;
		_I_ParamsB : REFERENCE TO sMot_CouplingParameters;
	END_VAR
	VAR
    pParamsStart :  UDINT := 0;
    pParamsEnd :  UDINT := 0;
    pParamsPrev :  UDINT := 0;
    size : UDINT := 0;
    result : UDINT;
	END_VAR
END_FUNCTION

FUNCTION fctCheckEqMoveParams : BOOL (*Return true if the two structures are equal*)
	VAR_INPUT
		_I_ParamsA : REFERENCE TO sMot_MoveParameters;
		_I_ParamsB : REFERENCE TO sMot_MoveParameters;
	END_VAR
	VAR
		size : UDINT;
		result : DINT;
	END_VAR
END_FUNCTION

FUNCTION fctCheckEqShiftParams : BOOL (*Return true if the two structures are equal*)
	VAR_INPUT
		_I_ParamsA : REFERENCE TO sMot_CouplingParameters;
		_I_ParamsB : REFERENCE TO sMot_CouplingParameters;
	END_VAR
	VAR
    pParamsStart :  UDINT := 0;
    pParamsEnd :  UDINT := 0;
    pParamsPrev :  UDINT := 0;
    size : UDINT := 0;
    result : UDINT;
	END_VAR
END_FUNCTION

FUNCTION fctClearMotionCommands : BOOL (*Clear command bits in the _IO_sMot_Command parameter if the bit in the eMOT_AXIS_CMD_MASK input mask is clear*)
	VAR_INPUT
		_I_CmdMask : DINT := 0; (* command bit mask -- do not clear the commands corresponding to set bits*)
	END_VAR
	VAR_IN_OUT
		_IO_Commands : sMot_AxisCommands; (* commands structure -- clear all cmd bits, except those with the mask bit set *)
	END_VAR
END_FUNCTION

FUNCTION fctClearMotionRequests : BOOL (*Clear request bits in the _IO_sMot_Command parameter if the bit in the eMOT_AXIS_CMD_MASK input mask is clear*)
  VAR_INPUT
    _I_ReqMask : DINT := 0; (*request bit mask -- do not clear the requests corresponding to set bits*)
  END_VAR
  VAR_IN_OUT
    _IO_Commands : sMot_AxisCommands; (*commands structure -- clear all req bits, except those with the mask bit set *)
  END_VAR
END_FUNCTION

FUNCTION fctCopyAxisStatus : BOOL
  VAR_INPUT
    _I_SrcStatus : REFERENCE TO sMot_AxisStatus;
    _I_DestStatus : REFERENCE TO sMot_AxisStatus;
  END_VAR
  VAR
    (* result :  DINT; *)
    (* pSrc :  UDINT; *)
    (* pDest :  UDINT; *)
    (* size : UDINT; *)
    nxtAddr : DINT;
  END_VAR

END_FUNCTION

FUNCTION fctGetMpAxisInfo : BOOL (*Pack values stored in a MpAxisBasicInfoType structure into a sMot_AxisStatus structure*)
  VAR_INPUT
    _I_MpInfo : REFERENCE TO MpAxisBasicInfoType; (* packed Mapp Motion structure *)
  END_VAR
  VAR_IN_OUT
    _IO_UdtStatus : sMot_AxisStatus; (* input move params in a udt *)
  END_VAR
END_FUNCTION

FUNCTION fctPackMpAxisBasicParams : BOOL (*Pack values stored in a sMot_MoveParameter structure into a MpAxisBasicParType structure *)
  VAR_INPUT
    _I_UdtParams : REFERENCE TO sMot_MoveParameters; (* input move params in a udt *)
  END_VAR
  VAR_IN_OUT
    _IO_MpParams : MpAxisBasicParType; (* packed Mapp Motion structure *)
  END_VAR
END_FUNCTION
