/* Automation Studio generated header file */
/* Do not edit ! */
/* GAMpMotion  */

#ifndef _GAMPMOTION_
#define _GAMPMOTION_
#ifdef __cplusplus
extern "C" 
{
#endif

#include <bur/plctypes.h>

#ifndef _BUR_PUBLIC
#define _BUR_PUBLIC
#endif
/* Constants */
#ifdef _REPLACE_CONST
 #define MACM_NOMASK 0
 #define MACM_ENABLE_MASK 1
 #define MACM_DISABLE_MASK 2
 #define MACM_RELEASE_BRAKE_MASK 4
 #define MACM_HOME_MASK 8
 #define MACM_JOG_MASK 16
 #define MACM_JOG_POSITIVE_MASK 32
 #define MACM_JOG_NEGATIVE_MASK 64
 #define MACM_VELOCITY_MOVE_MASK 128
 #define MACM_RELATIVE_MOVE_MASK 256
 #define MACM_ABSOLUTE_MOVE_MASK 512
 #define MACM_ENGAGE_SLAVE_MASK 1024
 #define MACM_DISENGAGE_SLAVE_MASK 2048
 #define MACM_STOP_MASK 4096
 #define MACM_STOP_RESET_MASK 8192
 #define MACM_HALT_MASK 16384
 #define MACM_DRIVE_RESET_MASK 32768
 #define MACM_ERROR_RESET_MASK 65536
 #define INVALID_SENTINEL (-9999)
 #define INVALID_SENTINEL_REAL (-9999.0f)
 #define INVALID_SENTINEL_LREAL (-9999.0)
#else
 _GLOBAL_CONST signed long MACM_NOMASK;
 _GLOBAL_CONST signed long MACM_ENABLE_MASK;
 _GLOBAL_CONST signed long MACM_DISABLE_MASK;
 _GLOBAL_CONST signed long MACM_RELEASE_BRAKE_MASK;
 _GLOBAL_CONST signed long MACM_HOME_MASK;
 _GLOBAL_CONST signed long MACM_JOG_MASK;
 _GLOBAL_CONST signed long MACM_JOG_POSITIVE_MASK;
 _GLOBAL_CONST signed long MACM_JOG_NEGATIVE_MASK;
 _GLOBAL_CONST signed long MACM_VELOCITY_MOVE_MASK;
 _GLOBAL_CONST signed long MACM_RELATIVE_MOVE_MASK;
 _GLOBAL_CONST signed long MACM_ABSOLUTE_MOVE_MASK;
 _GLOBAL_CONST signed long MACM_ENGAGE_SLAVE_MASK;
 _GLOBAL_CONST signed long MACM_DISENGAGE_SLAVE_MASK;
 _GLOBAL_CONST signed long MACM_STOP_MASK;
 _GLOBAL_CONST signed long MACM_STOP_RESET_MASK;
 _GLOBAL_CONST signed long MACM_HALT_MASK;
 _GLOBAL_CONST signed long MACM_DRIVE_RESET_MASK;
 _GLOBAL_CONST signed long MACM_ERROR_RESET_MASK;
 _GLOBAL_CONST signed long INVALID_SENTINEL;
 _GLOBAL_CONST float INVALID_SENTINEL_REAL;
 _GLOBAL_CONST double INVALID_SENTINEL_LREAL;
#endif




/* Datatypes and datatypes of function blocks */
typedef enum eGAMOT_HOME_FB_STATUS
{	GAMOT_HMFBS_NOT_ACTIVE = 0,
	GAMOT_HMFBS_ENABLED = 1,
	GAMOT_HMFBS_HOMING = 2,
	GAMOT_HMFBS_HOMED = 3,
	GAMOT_HMFBS_ERR_START_STATE = -1,
	GAMOT_HMFBS_ERR_HOMING = -2
} eGAMOT_HOME_FB_STATUS;

typedef enum eGAMOT_AXIS_STATE_MACHINE_STATE
{	GAMOT_ASMS_INITIAL = 0,
	GAMOT_ASMS_IGNORE = 1,
	GAMOT_ASMS_VALID_CHECK = 2,
	GAMOT_ASMS_DISABLED = 3,
	GAMOT_ASMS_ENABLED = 4,
	GAMOT_ASMS_HOME_REQ = 5,
	GAMOT_ASMS_HOMING = 6,
	GAMOT_ASMS_HOMED = 7,
	GAMOT_ASMS_CHK_RESTORE_POS = 8,
	GAMOT_ASMS_RESTORE_POS = 9,
	GAMOT_ASMS_ERROR_STOP = 10,
	GAMOT_ASMS_ERROR_DRVRSTWAIT = 11,
	GAMOT_ASMS_ERROR_DISABLE = 12,
	GAMOT_ASMS_ERROR_DRVRST = 13,
	GAMOT_ASMS_HALT = 20,
	GAMOT_ASMS_STOP = 21,
	GAMOT_ASMS_STOP_RESET = 22,
	GAMOT_ASMS_HALT_DISABLE = 23,
	GAMOT_ASMS_JOG = 31,
	GAMOT_ASMS_JOGPOSLIMIT = 32,
	GAMOT_ASMS_JOGNEGLIMIT = 33,
	GAMOT_ASMS_MOVE_VELOCITY = 41,
	GAMOT_ASMS_MOVE_RELATIVE = 51,
	GAMOT_ASMS_MOVE_ABSOLUTE = 61,
	GAMOT_ASMS_ENGAGED_AS_SLAVE = 71,
	GAMOT_ASMS_DISENGAGE_AS_SLAVE = 72
} eGAMOT_AXIS_STATE_MACHINE_STATE;

typedef enum eGAMOT_MOVE_DESIGNATION
{	GAMOT_MD_UNKNOWN = -1,
	GAMOT_MD_NO_MOVE_COMMANDED = 0,
	GAMOT_MD_JOG_VELOCITY_UP_FWD = 1,
	GAMOT_MD_JOG_VELOCITY_DOWN_REV = 2,
	GAMOT_MD_JOG_LIMIT_UP_FWD = 4,
	GAMOT_MD_JOG_LIMIT_DOWN_REV = 8,
	GAMOT_MD_VELOCITY = 16,
	GAMOT_MD_RELATIVE = 32,
	GAMOT_MD_ABSOLUTE = 64,
	GAMOT_MD_COORDINATED = 128
} eGAMOT_MOVE_DESIGNATION;

typedef struct sMot_PositionLimits
{	double PositionLimitPos;
	double PositionLimitNeg;
} sMot_PositionLimits;

typedef struct sMot_HmiAxisReqs
{	plcbit _beginResetSection;
	plcbit moveReq;
	plcbit haltReq;
	plcbit stopReq;
	plcbit homeSetZeroReq;
	plcbit homeSetOffsetReq;
	plcbit homeSetPosReq;
	plcbit enableReq;
	plcbit disableReq;
	plcbit manBrakeRelReq;
	plcbit clearManBrakeRelReq;
	plcbit offsetShiftReq;
	plcbit offsetShiftToMasterPosReq;
	plcbit phaseShiftReq;
	plcbit gearInReq;
	plcbit camInReq;
	plcbit disengageSlaveReq;
	plcbit _endResetSection;
	plcbit setPositionLimitsReq;
	plcbit stopResetReq;
	plcbit errorResetReq;
	plcbit driveResetReq;
	unsigned char axisNo;
	signed long gearRatioNumerator;
	signed long gearRatioDenominator;
	plcbit shiftOverMasterDistance;
	signed char shiftType;
	double shiftDistance;
	double shiftProfileDistance;
	unsigned short camId;
	double camMasterOffset;
	double camSlaveOffset;
	double homePosition;
	struct sMot_PositionLimits positionLimits;
	enum eGAMOT_MOVE_DESIGNATION moveDesignation;
	plcbit _startParamCopy;
	McDirectionEnum Direction;
	double Distance;
	double Position;
	float Velocity;
	float Acceleration;
	float Deceleration;
	float MaxJerk;
	plcbit _endParamCopy;
} sMot_HmiAxisReqs;

typedef struct sMot_PermissiveCheck
{	plcbit PermissiveHaltNeg;
	plcbit PermissiveHaltPos;
	plcbit CheckFailed;
	plcbit RangeLimitNeg;
	plcbit RangeLimitPos;
	plcbyte spareBytes[3];
	double StartPosition;
	double EstStoppingDistance;
} sMot_PermissiveCheck;

typedef struct sMot_AxisStatus
{	plcbit IsCommuncationReady;
	plcbit IsReadyToPowerOn;
	plcbit IsAtHomingSwitch;
	plcbit IsAtPositiveLimitSwitch;
	plcbit IsAtNegativeLimitSwitch;
	plcbit IsTrigger1Active;
	plcbit IsTrigger2Active;
	plcbit IsDriveEnableActive;
	plcbit IsInSimulation;
	plcbit IsPoweredOn;
	plcbit IsTorqueLimitReady;
	plcbit IsBrakeManuallyReleased;
	plcbit IsHomed;
	plcbit IsJogging;
	plcbit IsAtJogLimit;
	plcbit IsAtTorqueLimit;
	plcbit IsInVelocity;
	plcbit IsInPosition;
	plcbit IsMoveActive;
	plcbit IsMoveDone;
	plcbit IsStopped;
	plcbit IsAutoTuneDone;
	float AutoTuneQuality;
	unsigned short SafeMotionDiagCode;
	float Velocity;
	double Position;
	double DrivePosition;
	double CalculatedPosition1;
	double CalculatedPosition2;
	double CalculatedPosition3;
	double MoveStartPos;
	double MoveEndPos;
	double MoveDistanceRemaining;
	double MoveDistanceComplete;
	unsigned long StartupCount;
	McAxisPLCopenStateEnum PlcOpenState;
	McCommunicationStateEnum networkCommState;
	struct MpAxisDiagExtType AxisDiagnostics;
	struct McLibraryInfoType LibraryInfo;
	plcbit HasCoordinatedSlave;
	plcbit IsGearInSync;
	plcbit IsGearInCompensation;
	plcbit IsCamInSync;
	plcbit IsCamEndOfProfile;
	plcbit IsCoordOffsetShiftStarted;
	plcbit IsCoordOffsetShiftAttained;
	plcbit IsCoordPhaseShiftStarted;
	plcbit IsCoordPhaseShiftAttained;
	McCamInStatusEnum CamStatus;
	double CoordActualOffsetShift;
	double CoordActualPhaseShift;
} sMot_AxisStatus;

typedef struct sMot_MoveParameters
{	plcbit PosMovePermissive;
	plcbit NegMovePermissive;
	plcbit EnableTorqueLimit;
	plcbit EnableTorqueLimitPrev;
	plcbit HaltOnSlaveDisengage;
	plcbyte spareBytes5_7[3];
	struct sMot_PermissiveCheck PermissiveCheck;
	float VelocityMin;
	float VelocityMax;
	float AccelMin;
	float AccelMax;
	float DecelMin;
	float DecelMax;
	plcbit _beginHmiSection;
	McDirectionEnum Direction;
	double Distance;
	double Position;
	float Velocity;
	float Acceleration;
	float Deceleration;
	float MaxJerk;
	plcbit _endHmiSection;
	struct MpAxisHomingType HomeParams;
	struct MpAxisJogType JogParams;
	struct MpAxisStopType StopParams;
	struct MpAxisLimitLoadType TorqueLimitParams;
	struct MpAxisAutoTuneType AutoTuneParams;
} sMot_MoveParameters;

typedef struct sMot_CouplingParameters
{	plcbit CouplingPermissive;
	plcbit GearInReq;
	plcbit GearOutReq;
	plcbit CamInReq;
	plcbit CamOutReq;
	plcbit OffsetShiftReq;
	plcbit PhaseShiftReq;
	unsigned char SlaveAxisNo;
	plcbit _beginGearInSection;
	signed long GearInRatioNumerator;
	signed long GearInRatioDenominator;
	McValueSrcEnum GearInMasterValueSource;
	McBufferModeEnum GearInBufferMode;
	plcbit _endGearInSection;
	plcbit _beginShiftCommonSection;
	float ShiftAccelerationMax;
	float ShiftDecelerationMax;
	float ShiftJerk;
	float ShiftProfileBaseMaxVelocity;
	plcbit _endShiftCommonSection;
	plcbit _beginShiftSection;
	McShiftModeEnum ShiftMode;
	McProfileBaseEnum ShiftProfileBase;
	double Shift;
	float ShiftVelocityMax;
	double ShiftProfileDistance;
	double ShiftZoneStartPosition;
	double ShiftZoneEndPosition;
	double ShiftZonePeriod;
	plcbit _endShiftSection;
	plcbit _beginCamInSection;
	plcbit CamIsPeriodic;
	unsigned short CamId;
	double CamMasterOffset;
	double CamSlaveOffset;
	signed long CamScalingMaster;
	signed long CamScalingSlave;
	McCamStartModeEnum CamStartMode;
	McValueSrcEnum CamMasterValueSource;
	McBufferModeEnum CamBufferMode;
	plcbit _endCamInSection;
} sMot_CouplingParameters;

typedef struct sMot_AxisCommands
{	plcbit MoveNotAllowed;
	plcbit PlcSafetyEnable;
	plcbit UpdateMoveParams;
	plcbit EnableReq;
	plcbit DisableReq;
	plcbit EnableCmd;
	plcbit ReleaseBrakeReq;
	plcbit ClearReleaseBrakeReq;
	plcbit ReleaseBrakeCmd;
	plcbit HomeReq;
	plcbit HomeCmd;
	plcbit MoveJogReq;
	plcbit MoveJogCmd;
	plcbit MoveJogPositiveReq;
	plcbit MoveJogPositiveCmd;
	plcbit MoveJogNegativeReq;
	plcbit MoveJogNegativeCmd;
	plcbit MoveVelocityReq;
	plcbit MoveVelocityCmd;
	plcbit MoveRelativeReq;
	plcbit MoveRelativeCmd;
	plcbit MoveAbsoluteReq;
	plcbit MoveAbsoluteCmd;
	plcbit StopReq;
	plcbit StopCmd;
	plcbit StopResetReq;
	plcbit HaltReq;
	plcbit HaltCmd;
	plcbit DriveResetReq;
	plcbit DriveResetCmd;
	plcbit ErrorResetReq;
} sMot_AxisCommands;

typedef struct fbUpdateBasicParams
{
	/* VAR_INPUT (analog) */
	struct sMot_Axis* _I_Axis;
	/* VAR_IN_OUT (analog and digital) */
	struct MpAxisBasicParType* _IO_MpParams;
	/* VAR (analog) */
	signed long result;
	unsigned long pParamsStart;
	unsigned long pParamsEnd;
	unsigned long pParamsPrev;
	unsigned long size;
	unsigned long nxtAddr;
	/* VAR (digital) */
	plcbit updateOS;
} fbUpdateBasicParams_typ;

typedef struct sMot_Axis
{	plcbit Ignore;
	plcbit ForceSetRef;
	plcbit StartupHomeOk;
	plcbit isAxisVirtual;
	plcbit isAxisEndless;
	plcbit isAxisInverter;
	unsigned char AxisNo;
	enum eGAMOT_AXIS_STATE_MACHINE_STATE SMState;
	struct McAxisType AxisObj;
	struct McAxisType SlaveAxisObj;
	struct sMot_AxisStatus Status;
	struct sMot_AxisStatus StatusSlave;
	struct sMot_MoveParameters MoveParameters;
	struct sMot_MoveParameters MoveParametersPrev;
	struct sMot_CouplingParameters CouplingParameters;
	struct sMot_CouplingParameters CouplingParametersPrev;
	struct sMot_AxisCommands Commands;
	struct MpAxisBasic fbMpAxisBasic;
	struct MC_BR_ReadCyclicPosition fbReadDrivePos;
	struct fbUpdateBasicParams fbUpdateBFbParams;
	struct MC_GearIn fbGearIn;
	struct MC_GearOut fbGearOut;
	struct MC_BR_Offset fbOffsetShift;
	struct MC_BR_Phasing fbPhaseShift;
	struct MC_BR_CalcCamFromSections fbCalcCam;
	struct MC_BR_CalcPointsFromCam fbCalcPoints;
	struct MC_BR_CamPrepare fbCamPrepare;
	struct MC_CamIn fbCamIn;
	struct MC_CamOut fbCamOut;
	struct MC_BR_CheckRestorePositionData fbCheckRestorePos;
} sMot_Axis;

typedef struct sMot_GlobalCommands
{	plcbit EnableReq;
	plcbit DisableReq;
	plcbit HaltReq;
	plcbit StopReq;
	plcbit ErrorAcknowledge;
} sMot_GlobalCommands;

typedef struct fbHomeAbsSeq
{
	/* VAR_INPUT (analog) */
	struct sMot_Axis* _I_Axis;
	double _I_Position;
	/* VAR_OUTPUT (analog) */
	enum eGAMOT_HOME_FB_STATUS _O_State;
	/* VAR_INPUT (digital) */
	plcbit _I_Enable;
	/* VAR_OUTPUT (digital) */
	plcbit _O_Done;
	plcbit _O_Busy;
	plcbit _O_Error;
	plcbit _O_Homed;
	/* VAR (digital) */
	plcbit enableOS;
} fbHomeAbsSeq_typ;

typedef struct fbProcessHmiAxisReq
{
	/* VAR_INPUT (analog) */
	struct sMot_HmiAxisReqs* _I_HmiAxisReq;
	struct sMot_Axis* _I_Axis;
	struct sMot_Axis* _I_SlaveAxis;
	struct sMot_PositionLimits* _I_AxisPositionLimits;
	double _I_ToleranceZeroDepth;
	/* VAR (analog) */
	unsigned long pHmi;
	unsigned long pMoveParams;
	unsigned long size;
	unsigned long nxtAddr;
	struct fbHomeAbsSeq fbHomeSeq;
} fbProcessHmiAxisReq_typ;



/* Prototyping of functions and function blocks */
_BUR_PUBLIC void fbHomeAbsSeq(struct fbHomeAbsSeq* inst);
_BUR_PUBLIC void fbProcessHmiAxisReq(struct fbProcessHmiAxisReq* inst);
_BUR_PUBLIC void fbUpdateBasicParams(struct fbUpdateBasicParams* inst);
_BUR_PUBLIC double fctCalcAbsHomeOffset(double _I_CurrentPos, double _I_DesiredPos, double _I_SetZeroOffset);
_BUR_PUBLIC plcbit fctCheckEqCamInParams(struct sMot_CouplingParameters** _I_ParamsA, struct sMot_CouplingParameters** _I_ParamsB);
_BUR_PUBLIC plcbit fctCheckEqGearInParams(struct sMot_CouplingParameters** _I_ParamsA, struct sMot_CouplingParameters** _I_ParamsB);
_BUR_PUBLIC plcbit fctCheckEqMoveParams(struct sMot_MoveParameters** _I_ParamsA, struct sMot_MoveParameters** _I_ParamsB);
_BUR_PUBLIC plcbit fctCheckEqShiftParams(struct sMot_CouplingParameters** _I_ParamsA, struct sMot_CouplingParameters** _I_ParamsB);
_BUR_PUBLIC plcbit fctClearMotionCommands(signed long _I_CmdMask, struct sMot_AxisCommands* _IO_Commands);
_BUR_PUBLIC plcbit fctClearMotionRequests(signed long _I_ReqMask, struct sMot_AxisCommands* _IO_Commands);
_BUR_PUBLIC plcbit fctCopyAxisStatus(struct sMot_AxisStatus** _I_SrcStatus, struct sMot_AxisStatus** _I_DestStatus);
_BUR_PUBLIC plcbit fctGetMpAxisInfo(struct MpAxisBasicInfoType** _I_MpInfo, struct sMot_AxisStatus* _IO_UdtStatus);
_BUR_PUBLIC plcbit fctPackMpAxisBasicParams(struct sMot_MoveParameters** _I_UdtParams, struct MpAxisBasicParType* _IO_MpParams);


#ifdef __cplusplus
};
#endif
#endif /* _GAMPMOTION_ */

