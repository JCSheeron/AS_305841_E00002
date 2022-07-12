/* Automation Studio generated header file */
/* Do not edit ! */
/* GAProcIO  */

#ifndef _GAPROCIO_
#define _GAPROCIO_
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
 #define GAPIO_ALARM_NONE 0U
 #define GAPIO_ALARM_RANGELO 1U
 #define GAPIO_ALARM_RANGEHI 2U
 #define GAPIO_ALARM_LOLO 4U
 #define GAPIO_ALARM_LO 8U
 #define GAPIO_ALARM_HI 16U
 #define GAPIO_ALARM_HIHI 32U
 #define GAPIO_ALARM_CHANNEL 2147483648U
#else
 _GLOBAL_CONST unsigned long GAPIO_ALARM_NONE;
 _GLOBAL_CONST unsigned long GAPIO_ALARM_RANGELO;
 _GLOBAL_CONST unsigned long GAPIO_ALARM_RANGEHI;
 _GLOBAL_CONST unsigned long GAPIO_ALARM_LOLO;
 _GLOBAL_CONST unsigned long GAPIO_ALARM_LO;
 _GLOBAL_CONST unsigned long GAPIO_ALARM_HI;
 _GLOBAL_CONST unsigned long GAPIO_ALARM_HIHI;
 _GLOBAL_CONST unsigned long GAPIO_ALARM_CHANNEL;
#endif




/* Datatypes and datatypes of function blocks */
typedef enum eGAPIO_RAW_SCALE_TYPE
{	GAPIO_RWST_OFF = 0,
	GAPIO_RWST_USINT = 1,
	GAPIO_RWST_SINT = 2,
	GAPIO_RWST_UINT = 3,
	GAPIO_RWST_INT = 4,
	GAPIO_RWST_UDINT = 5,
	GAPIO_RWST_DINT = 6,
	GAPIO_RWST_REAL = 7
} eGAPIO_RAW_SCALE_TYPE;

typedef enum eGAPIO_PB_BEHAVIOR_TYPE
{	GAPIO_PBBT_DISABLED = 0,
	GAPIO_PBBT_MOMENTARY = 1,
	GAPIO_PBBT_OS_ON = 2,
	GAPIO_PBBT_PRESS_ON = 3,
	GAPIO_PBBT_PULSE_ON = 4,
	GAPIO_PBBT_PRESS_OFF = 5,
	GAPIO_PBBT_TOGGLE = 6
} eGAPIO_PB_BEHAVIOR_TYPE;

typedef struct sAnalogInput
{	plcbit ModuleOk;
	plcbit ChannelOk;
	unsigned char InRawUSINT;
	signed char InRawSINT;
	unsigned short InRawUINT;
	signed short InRawINT;
	unsigned long InRawUDINT;
	signed long InRawDINT;
	float InRawREAL;
	float InScaled;
	float InScaledFiltered;
	unsigned long alms;
} sAnalogInput;

typedef struct sAnalogInputParams
{	plcbit CalcEUExternally;
	plcbit LpEnable;
	plcbit LpPreserveUnfiltered;
	plcbit AlmEnable;
	plcbit AlmLoLoEnable;
	plcbit AlmLoEnable;
	plcbit AlmHiEnable;
	plcbit AlmHiHiEnable;
	enum eGAPIO_RAW_SCALE_TYPE RawType;
	float RawMin;
	float RawMax;
	float EuMin;
	float EuMax;
	float RawOffset;
	float EuOffset;
	float LpCoeff;
	float AlmRangeThreshLo;
	float AlmRangeThreshHi;
	float AlmThreshLoLo;
	float AlmThreshLo;
	float AlmThreshHi;
	float AlmThreshHiHi;
	float AlmDbLoPct;
	float AlmDbHiPct;
	plctime AlmLoOnDlyTime;
	plctime AlmHiOnDlyTime;
	plctime AlmLoOffDlyTime;
	plctime AlmHiOffDlyTime;
} sAnalogInputParams;

#ifdef _BUR_USE_DECLARATION_IN_IEC
typedef struct sDigitalInput
{	plcbit ModuleOk;
	plcbit ChannelOk;
	plcbit InRaw;
	plcbit Value;
	plcbyte spareBytes5_7[3];
	unsigned long alms;
} sDigitalInput;
#else
/* Data type sDigitalInput not declared. Data types with array elements whose starting indexes are not equal to zero cannot be used in ANSI C programs / libraries.*/
#endif

typedef struct sDigitalInputParams
{	plcbit Enable;
	plcbit AlmEnable;
	plcbit AlmLoEnable;
	plcbit AlmHiEnable;
	plcbit Invert;
	plctime OnDlyTime;
	plctime OffDlyTime;
	plctime AlmLoOnDlyTime;
	plctime AlmHiOnDlyTime;
	plctime AlmLoOffDlyTime;
	plctime AlmHiOffDlyTime;
} sDigitalInputParams;

typedef struct fbLpFilter
{
	/* VAR_INPUT (analog) */
	float _InK;
	float _InVal;
	/* VAR_OUTPUT (analog) */
	float _OutFilteredVal;
	/* VAR (analog) */
	float lastOut;
	float KChecked;
	/* VAR_INPUT (digital) */
	plcbit _InPassThru;
	/* VAR (digital) */
	plcbit firstScanOS;
} fbLpFilter_typ;

typedef struct fbSclAlmAI
{
	/* VAR_INPUT (analog) */
	struct sAnalogInput* _InInputStruct;
	struct sAnalogInputParams* _InParamsStruct;
	float _InSentinel;
	/* VAR (analog) */
	float rawAdj;
	unsigned long almsRaw;
	float almRangeLoDbVal;
	float almRangeHiDbVal;
	float almLoLoDbVal;
	float almLoDbVal;
	float almHiDbVal;
	float almHiHiDbVal;
	struct TON tmrAlmRangeLoOn;
	struct TON tmrAlmLoLoOn;
	struct TON tmrAlmLoOn;
	struct TON tmrAlmRangeHiOn;
	struct TON tmrAlmHiOn;
	struct TON tmrAlmHiHiOn;
	struct TOF tmrAlmRangeLoOff;
	struct TOF tmrAlmLoLoOff;
	struct TOF tmrAlmLoOff;
	struct TOF tmrAlmRangeHiOff;
	struct TOF tmrAlmHiOff;
	struct TOF tmrAlmHiHiOff;
	struct fbLpFilter fbNoiseFilter;
	/* VAR_INPUT (digital) */
	plcbit _InSetParams;
	/* VAR (digital) */
	plcbit SetParamsOS;
} fbSclAlmAI_typ;

typedef struct fbProcDI
{
	/* VAR_INPUT (analog) */
	struct sDigitalInput* _InInputStruct;
	struct sDigitalInputParams* _InParamsStruct;
	/* VAR (analog) */
	unsigned long almsRaw;
	struct sDigitalInputParams prevParams;
	unsigned long paramSize;
	signed long cmpResult;
	struct TON tmrOn;
	struct TON tmrAlmLoOn;
	struct TON tmrAlmHiOn;
	struct TOF tmrOff;
	struct TOF tmrAlmLoOff;
	struct TOF tmrAlmHiOff;
	/* VAR_INPUT (digital) */
	plcbit _InSentinel;
	plcbit _InSetParams;
	/* VAR (digital) */
	plcbit SetParamsOS;
	plcbit value;
	plcbit valueDly;
} fbProcDI_typ;

typedef struct fbProcPB
{
	/* VAR_INPUT (analog) */
	enum eGAPIO_PB_BEHAVIOR_TYPE _InPBType;
	plctime _InPulseTime;
	/* VAR (analog) */
	struct TON tmrPulse;
	/* VAR_INPUT (digital) */
	plcbit _InPBIn;
	plcbit _InPBClear;
	/* VAR_OUTPUT (digital) */
	plcbit _OutState;
	/* VAR (digital) */
	plcbit pressOS;
	plcbit state;
} fbProcPB_typ;



/* Prototyping of functions and function blocks */
_BUR_PUBLIC void fbSclAlmAI(struct fbSclAlmAI* inst);
_BUR_PUBLIC void fbLpFilter(struct fbLpFilter* inst);
_BUR_PUBLIC void fbProcDI(struct fbProcDI* inst);
_BUR_PUBLIC void fbProcPB(struct fbProcPB* inst);


#ifdef __cplusplus
};
#endif
#endif /* _GAPROCIO_ */

