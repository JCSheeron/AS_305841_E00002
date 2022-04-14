(********************************************************************
 * COPYRIGHT -- General Atomics
 ********************************************************************
 * Library: GAProcIO
 * File: GAProcIO.typ
 * Author: Administrator
 * Created: September 11, 2015
 ********************************************************************
 * Data types of library GAProcIO
 ********************************************************************)

TYPE
	eGAPIO_RAW_SCALE_TYPE : 
		( 
		GAPIO_RWST_OFF := 0, (* do not process the chanel *)
		GAPIO_RWST_USINT := 1,
		GAPIO_RWST_SINT := 2,
		GAPIO_RWST_UINT := 3,
		GAPIO_RWST_INT := 4,
		GAPIO_RWST_UDINT := 5,
		GAPIO_RWST_DINT := 6,
    GAPIO_RWST_REAL := 7 (* LREAL not suppoeted by scaling routine *)
    (* RWST_LREAL := 8 *)
  ) := GAPIO_RWST_INT; (* default to int, since this is what most AIs are *)
  
  eGAPIO_PB_BEHAVIOR_TYPE :
    (
    GAPIO_PBBT_DISABLED   := 0, (* always off *)
    GAPIO_PBBT_MOMENTARY  := 1, (* active while pressed *)
    GAPIO_PBBT_OS_ON      := 2, (* oneshot on. Needs rising edge to turn on for 1 scan *)
    GAPIO_PBBT_PRESS_ON   := 3, (* press to turn on *)
    GAPIO_PBBT_PULSE_ON   := 4, (* turn on for a pulse *)
    GAPIO_PBBT_PRESS_OFF  := 5, (* press to turn off *)
    GAPIO_PBBT_TOGGLE     := 6  (* press to toggle *)
  ) := GAPIO_PBBT_MOMENTARY;
  
  sAnalogInput : 	STRUCT  (* 32 byte structure *)
    ModuleOk : BOOL; (* byte 0 H=okay *)
    ChannelOk : BOOL; (* byte 1 H=okay *)
    InRawUSINT : USINT; (* byte 2 *)
    InRawSINT : SINT; (* byte 3 *)
    InRawUINT : UINT; (* bytes 4-5 *)
    InRawINT : INT; (* bytes 6-7 *)
    InRawUDINT : UDINT; (* bytes 8-11 *)
    InRawDINT : DINT; (* bytes 12-15 *)
    InRawREAL : REAL; (* bytes 16-19 *)
    InScaled : REAL; (* byte 20-23 *)
    InScaledFiltered : REAL; (* byte 24-27 *)
    (* alarms *)
    (* bit packed integer - used so non-zero value means at least one alarm is active *)
    alms : UDINT := 0; (* b0:LoRange,b1:HiRange,b2:LoLoAlm,b3:LoAlm,b4:HiAlm,b5:HiHiAlm,b31:chErr *)
  END_STRUCT;
  
	sAnalogInputParams : 	STRUCT  (* analog scaling and alarm parameters *) (* raw scale type - how to interpret InRawBuffer *)
		LpEnable : BOOL := FALSE; (* turn off Low Pass Filter by default *)
		LpPreserveUnfiltered : BOOL := TRUE; (* F: unfiltered = filtered, T: keep separate *)
		AlmEnable : BOOL := FALSE;
		AlmLoLoEnable : BOOL := FALSE;
		AlmLoEnable : BOOL := FALSE;
		AlmHiEnable : BOOL := FALSE;
		AlmHiHiEnable : BOOL := FALSE; (* alarm thresholds - compare to EU (scaled) values *) (* disable range check and alarm thresholds by default if not specified *)
		RawType : eGAPIO_RAW_SCALE_TYPE := GAPIO_RWST_INT; (* default to int, since this is what most AIs are *) (* scaling parameters *)
		RawMin : REAL := 0.0; (* scale to 15 bits if not specified - a common value for ai modules *)
		RawMax : REAL := 32767.0;
		EuMin : REAL := 0.0; (* scale to percent if not specified *)
		EuMax : REAL := 100.0;
		RawOffset : REAL := 0.0; (* +/- counts value added to the raw value before scaling *)
		EuOffset : REAL := 0.0; (* +/- EU value added to EU after scaling *) (* Low Pass (Noise) filter parameters *)
		LpCoeff : REAL := 0.0; (* >=0 and <1. 0= no filtering. 0.99999= heavy filtering. *) (* alarm enables *) (* turn on or off all alarming except for out of range alarms *)
		AlmRangeThreshLo : REAL := -1.0E9;
		AlmRangeThreshHi : REAL := 1.0E9;
		AlmThreshLoLo : REAL := -1.0E9;
		AlmThreshLo : REAL := -1.0E9;
		AlmThreshHi : REAL := 1.0E9;
		AlmThreshHiHi : REAL := 1.0E9; (* alarm deadbands *) (* in % of range EU range *) (* use 0 to disable *)
		AlmDbLoPct : REAL := 1.0; (* pvs must rise above threshold by the corresponding value in order to be considered clear *)
		AlmDbHiPct : REAL := 1.0; (* pvs must drop below threshold by the corresponding value in order to be considered clear *) (* alarm time delays *) (* use 0 time to disable *)
		AlmLoOnDlyTime : TIME := T#1s;
		AlmHiOnDlyTime : TIME := T#1s; (* alarm off delay time - condition must clear for this long before being considered "gone" *)
		AlmLoOffDlyTime : TIME := T#1s;
		AlmHiOffDlyTime : TIME := T#1s;
  END_STRUCT;
  
  sDigitalInput : 	STRUCT 
    ModuleOk : BOOL; (* H=okay *)
    ChannelOk : BOOL; (* H=okay *)
    InRaw : BOOL; (* raw input signal *)
    Value : BOOL; (* conditioned value *)
    spareBytes5_7 : ARRAY[5..7]OF BYTE;
    (* alarms *)
    (* bit packed integer - used so non-zero value means at least one alarm is active *)
    alms : UDINT := 0; (* b3:LoAlm,b4:HiAlm,b31:ch err,b0-2:reserved,b5-30:reserved *)
  END_STRUCT;

  sDigitalInputParams : 	STRUCT  (* digital signal processing and alarm parameters *)
    Enable : BOOL; (* H=process *)
    AlmEnable : BOOL := FALSE; (* set to process alarm *)
		AlmLoEnable : BOOL := FALSE; (* set to enable alarm if value is low *)
		AlmHiEnable : BOOL := FALSE; (* set to enable alarm if value is high *)
		Invert : BOOL := FALSE;
		OnDlyTime : TIME := T#0ms; (* delay time for value turning on *)
		OffDlyTime : TIME := T#0ms; (* delay time for value turning off *)
		AlmLoOnDlyTime : TIME := T#1s;
		AlmHiOnDlyTime : TIME := T#1s;
		AlmLoOffDlyTime : TIME := T#1s;
		AlmHiOffDlyTime : TIME := T#1s;
  END_STRUCT;
  
END_TYPE
