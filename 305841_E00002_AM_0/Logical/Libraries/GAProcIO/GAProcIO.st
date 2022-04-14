(********************************************************************
 * COPYRIGHT -- General Atomics
 ********************************************************************
 * Library: GAProcIO
 * File: GAProcIO.st
 * Author: J. Sheeron x2315
 ********************************************************************)

(*******************************************************************
 ******* Function Block fbLpFilter *********************************
********************************************************************
 * This function implements a Low Pass Filter.
 * Out = (In * (1-K)) + (K * LastOut)
 * Where K is a filter coefficient between 0 and 1 (not inclusive of 1).
 * K = 0: No filtering. K=0.9999 lots of filtering.
 * K can be thought of as how heavily to weight the last value and reject new values
 
 * K will be range checked, and 0 will be used if K < 0 or K > 0.9999999

 *********************************************************************) 

FUNCTION_BLOCK fbLpFilter

  // On initial scan, st the lastOut to the input.
  // This prevents filtering when there is no initial condition.
  IF NOT firstScanOS THEN
    // First time thru. Set the OS and init lastOut
    firstScanOS:= TRUE;
    lastOut:=  _InVal;
  END_IF;
    
  IF NOT _InPassThru THEN
    // Not passing the input thru, so do the filtering.
    
    // Range check the filter coeff. Use 0 (no filtering) if out of range
    IF _InK >= 0.0 AND _InK < 1.0 THEN
      KChecked := _InK;
    ELSE 
      KChecked := 0.0;
    END_IF;
    
    // Filter the output
    _OutFilteredVal:= (_InVal * (1 - KChecked)) + (KChecked * lastOut);
    lastOut := _OutFilteredVal;
  ELSE
    // Pass thru set. Set output and last output to input and be done
    _OutFilteredVal:= _InVal;
    lastOut:= _InVal;
  END_IF;
END_FUNCTION_BLOCK

(*******************************************************************
********** Function Block fbProcDI *********************************
********************************************************************
This funciton block is passed a reference to a digital input structure and
an digital input params structure. 
It will process the input, inverting it if configured to do so.
There is a configurable on delay, off delay, a channel alarm, hi alarm and low alarm.
This fb assumes the raw input, channel status, and module status have been updated
prior to the fb call. If the module or channel are not okay, then a sentinal value
is used for the processed value.
The alarms use the same bit packed integer structure as the analog routine, so 
some of the bits are not used.
A bit packed integer is used so non-zero value means at least one alarm is active.
  The alarm integer is unsigned, so <= 0 means no alarm
  bit 0: Reserved -- Range Lo Alarm   16#01 
  bit 1: Reserved -- Range Hi Alarm   16#02
  bit 2: Reserved -- LoLo Alarm       16#04
  bit 3: Lo Alarm                     16#08
  bit 4: Hi Alarm                     16#10
  bit 5: Reserved -- HiHi Alarm       16#20
  bits 6-30: unused
  bit 31: Channel Error   16#8000 0000
***************************************************************************) 
FUNCTION_BLOCK fbProcDI
  // Check for a change in params. 
  // Get the param size if not known
  IF paramSize = 0 THEN
    paramSize := SIZEOF(prevParams);
  END_IF;
  
  // brsmemcmp returns 0 on equal and < or > 0 when not equal.
  cmpResult := brsmemcmp(ADR(_InParamsStruct), ADR(prevParams), paramSize);
  
  // If a parameter change is detected, or if a rising edge of the set param input
  // then update the params.
  IF cmpResult <> 0 OR (_InSetParams AND NOT SetParamsOS) THEN
    // Input is set and OS is clear
    // Set oneshot if the set input was set so we don't keep going thru here if the input stays high
    SetParamsOS:= _InSetParams;
    
    // Update the previous values
    prevParams := _InParamsStruct;
    
    // Now implement the changes
    // Set the delay times and reset the timers
    // On delays
    tmrOn.PT:= _InParamsStruct.OnDlyTime;
    tmrAlmLoOn.PT:= _InParamsStruct.AlmLoOnDlyTime;
    tmrAlmHiOn.PT:= _InParamsStruct.AlmHiOnDlyTime;
    // reset the timers
    tmrOn(IN:= FALSE);
    tmrAlmLoOn(IN:= FALSE);
    tmrAlmHiOn(IN:= FALSE);
    // Off delays
    tmrOff.PT:= _InParamsStruct.OffDlyTime;
    tmrAlmLoOff.PT:= _InParamsStruct.AlmLoOffDlyTime;
    tmrAlmHiOff.PT:= _InParamsStruct.AlmHiOffDlyTime;
    // reset the timers
    tmrOff(IN:= TRUE);
    tmrAlmLoOff(IN:= TRUE);
    tmrAlmHiOff(IN:= TRUE);
    
  ELSIF NOT _InSetParams THEN
    // Input is clear ... clear the OS
    SetParamsOS:= FALSE;
  ELSE
    // input is set, and OS is set ... do nothing
  END_IF;

  // Process the input. Look at the module and channel okay bits, and the enable bit.
  // If all is okay, invert the input if invert is high, set the value bit and process alarms
  // If not, then set value to the sentinel value.
  IF _InInputStruct.ModuleOk AND _InInputStruct.ChannelOk AND _InParamsStruct.Enable THEN
    // Module and channel are healthy, and channel is enabled. Process the value and alarms
    
    // Apply the inversion and time delays. Use an internal value until all done
    value := _InInputStruct.InRaw XOR _InParamsStruct.Invert;
    tmrOn(IN:= value);
    tmrOff(IN:= value);
    // Consider the value active if the on timer has expired or if it was already active and the off timer expired (off delay)
    // TOF timers run when input is false, and delay the false by bringing Q low when done.
    // ValueDly = TmrOn.Q OR (value AND TmrOff.Q)
    valueDly := tmrOn.Q OR (valueDly AND tmrOff.Q);
    _InInputStruct.Value:= valueDly; // Use an intermdiate valueDly because without it, off dly does not work (not sure why)
        
    // process raw (non-time delayed) alarms -- use the time delayed value
    // Clear the channel alarm -- It must be okay in order to get here
    _InInputStruct.alms.31:= FALSE;
    // Initially clear the internal alarms -- this ensures the unused bits are clear
    almsRaw := 16#0;
    
    // lo alarm
    almsRaw.3:= _InParamsStruct.AlmEnable AND _InParamsStruct.AlmLoEnable AND NOT _InInputStruct.Value;
    // hi alarm
    almsRaw.4:= _InParamsStruct.AlmEnable AND _InParamsStruct.AlmHiEnable AND _InInputStruct.Value;

    // Run the alarm time delays
    // Run on delay when alarm is active
    // lo
    tmrAlmLoOn(IN:= almsRaw.3);
    tmrAlmLoOff(IN:= almsRaw.3);
    // hi
    tmrAlmHiOn(IN:= almsRaw.4);
    tmrAlmHiOff(IN:= almsRaw.4);

    // consider the alarm active if the on timer has expired or if it was already active and the off timer expired (off delay)
    // TOF timers run when input is false, and delay the false by bringing Q low when done.
    // alm = TmrOn.Q OR (alm AND TmrOff.Q)
    // lo
    _InInputStruct.alms.3:= tmrAlmLoOn.Q OR (_InInputStruct.alms.3 AND tmrAlmLoOff.Q);
    // hi
    _InInputStruct.alms.4:= tmrAlmHiOn.Q OR (_InInputStruct.alms.4 AND tmrAlmHiOff.Q);
  ELSE
    // Unhealthy module or channel, or disabled ... use the sentinel for the value.
    // Set the channel error if the channel is enabled. Clear the other alarms.
    _InInputStruct.Value:= _InSentinel;
    // Clear the alarms and reset the timers
    // Set the channel alarm if the we are here, but the channel is enabled
    IF  _InParamsStruct.Enable THEN
      _InInputStruct.alms:= GAPIO_ALARM_CHANNEL;  // channel alarm is bit 31
    ELSE
      _InInputStruct.alms:= GAPIO_ALARM_NONE;
    END_IF;
    tmrAlmLoOn(IN:= FALSE);
    tmrAlmLoOff(IN:= FALSE);
    tmrAlmHiOn(IN:= FALSE);
    tmrAlmHiOff(IN:= FALSE);
  END_IF;

END_FUNCTION_BLOCK


(*******************************************************************
********** Function Block fbProcPB *********************************
********************************************************************
This funciton block takes a boolean (_InPBIn) and an enumeration
for the desired behavior (_InPBType eGAPIO_PB_BEHAVIOR_TYPE), and
using these, determines the boolean output state (_OutState).
There is a time input used for the Pulse On behavior (see below).
If the fb is called with just an input, it will turn the output on
when as long as the input is on:
The _InPBType input defaults to GAPIO_PBBT_MOMENTARY
The _InPulseTime inputs defaults to 500ms.

The behavior is based on eGAPIO_PB_BEHAVIOR_TYPE and is as follows:
GAPIO_PBBT_DISABLED:  Output is always off
GAPIO_PBBT_MOMENTARY: Output is on if the input is on
GAPIO_PBBT_OS_ON:     Oneshot on. Needs rising edge to turn on for 1 scan
GAPIO_PBBT_PRESS_ON:  Output is turned on when the input is turned on.
This FB does not turn it off.
GAPIO_PBBT_PRESS_OFF: Output is turned off when the input is turned on.
This FB does not turn it on.
GAPIO_PBBT_TOGGLE:    Output is toggled when the input goes high
GAPIO_PBBT_PULSE_ON:  Output is turned on for a time (_InPulseTime)
when the input goes high.

The _InPBClear input overrides the above, and if set, the state is
cleared.  This allows the press on to set the state, and some
other logic tied to the clear to clear the state.

********************************************************************)
FUNCTION_BLOCK fbProcPB
  // Set the state based on the input and behavior type
  IF _InPBType = GAPIO_PBBT_DISABLED THEN
    // if disabled, output is always off, regardless of input
    state := FALSE;
  ELSIF _InPBType = GAPIO_PBBT_MOMENTARY THEN
    // Momentary -- turn on while button is pressed
    state := _InPBIn;
  ELSIF _InPBType = GAPIO_PBBT_OS_ON THEN
    // Oneshot on. Needs rising edge to turn on for 1 scan
    IF _InPBIn AND NOT pressOS THEN
      // Rising edge, set the state and the OS
      state := TRUE;
      pressOS := TRUE;
    ELSIF _InPBIn AND pressOS THEN
      // Input on with OS on -- was already on, time to turn off
      state := FALSE;
    ELSE
      // Input is off, clear the state and the OS
      state := FALSE;
      pressOS := FALSE;
    END_IF;
  ELSIF _InPBType = GAPIO_PBBT_PRESS_ON THEN
    // Press On -- turn on if button is pressed
    IF _InPBIn THEN
      state:= TRUE;
    END_IF;
  ELSIF _InPBType = GAPIO_PBBT_PULSE_ON THEN
    // Pulse On -- turn the output on for a pulse time
    // Cancel timer if clear input is on.
    tmrPulse(IN:= ((tmrPulse.IN AND NOT tmrPulse.Q) OR _InPBIn) AND NOT _InPBClear, PT:= _InPulseTime);
    state := tmrPulse.IN AND NOT tmrPulse.Q; // turn off after pulse, even if button is still held in
  ELSIF _InPBType = GAPIO_PBBT_PRESS_OFF THEN
    // Press Off -- turn off if button is pressed
    IF _InPBIn THEN
      state:= FALSE;
    END_IF;
  ELSIF _InPBType = GAPIO_PBBT_TOGGLE THEN
    // Toggle -- toggle state on button press
    // Use OS to toggle once per press
    IF _InPBIn AND NOT pressOS THEN
      state:= NOT state;
      pressOS := TRUE;
    ELSIF NOT _InPBIn THEN
      pressOS := FALSE;
    END_IF;
  ELSE
    // Unknown behavior -- turn off
    state := FALSE;
  END_IF;
  
  // If the clear input is set, force the state to be off
  // This allows the press on to set the state, and 
  // some other logic tied to the clear to clear the state.
  IF _InPBClear THEN
    state := FALSE;
  END_IF;
  
  // Update the output based on the internal state
  _OutState := state;  
END_FUNCTION_BLOCK


(*******************************************************************
********** Function Block fbSclAlmAI********************************
********************************************************************
This function block is passed a reference to an analog anput structure
an an analog input params structure. 
It will scale the value, applying raw and EU offsets. It will also process
channel, range, high and low level alarms.
After scaling, and before alarming, there is a low pass filter applied.
The filter params are in the Analog params structure.
This fb assumes the raw input, channel status, and module status have been updated
prior to the fb call. If the module or channel are not okay, then a sentinal value
is used for the scaled value.
NOTE: That the input type can be any of those supported by the eRAW_SCALE_TYPE, and the type
is specified in the params structure. The corresponding InRaw value is used to hold the input data
so more than one input type is supported.
The alarms use a bit packed integer - used so non-zero value means at least one alarm is active
  The alarm integer is unsigned, so <= 0 means no alarm
  bit 0: Range Lo Alarm   16#01
  bit 1: Range Hi Alarm   16#02
  bit 2: LoLo Alarm       16#04
  bit 3: Lo Alarm         16#08
  bit 4: Hi Alarm         16#10
  bit 5: HiHi Alarm       16#20
  bits 6-30: unused
  bit 31: channel error   16#8000 0000
 *********************************************************************) 
FUNCTION_BLOCK fbSclAlmAI
    // Set parameters the first time through if the input trigger is set.
    // Need to see rising edge to set the params.
  IF _InSetParams AND NOT SetParamsOS THEN
    // Input is set and OS is clear
    // Set oneshot so we don't keep going thru here if the input stays high
    SetParamsOS:= TRUE;
    
    // Set the alarm delay times and reset the timers
    // On delays
    tmrAlmRangeLoOn.PT:= _InParamsStruct.AlmLoOnDlyTime;
    tmrAlmLoLoOn.PT:= _InParamsStruct.AlmLoOnDlyTime;
    tmrAlmLoOn.PT:= _InParamsStruct.AlmLoOnDlyTime;
    tmrAlmRangeHiOn.PT:= _InParamsStruct.AlmHiOnDlyTime;
    tmrAlmHiOn.PT:= _InParamsStruct.AlmHiOnDlyTime;
    tmrAlmHiHiOn.PT:= _InParamsStruct.AlmHiOnDlyTime;
    // reset the timers
    tmrAlmRangeLoOn(IN:= FALSE);
    tmrAlmLoLoOn(IN:= FALSE);
    tmrAlmLoOn(IN:= FALSE);
    tmrAlmRangeHiOn(IN:= FALSE);
    tmrAlmHiOn(IN:= FALSE);
    tmrAlmHiHiOn(IN:= FALSE);
    tmrAlmRangeLoOff(IN:= FALSE);
    // Off delays
    tmrAlmRangeLoOff.PT:= _InParamsStruct.AlmLoOffDlyTime;
    tmrAlmLoLoOff.PT:= _InParamsStruct.AlmLoOffDlyTime;
    tmrAlmLoOff.PT:= _InParamsStruct.AlmLoOffDlyTime;
    tmrAlmRangeHiOff.PT:= _InParamsStruct.AlmHiOffDlyTime;
    tmrAlmHiOff.PT:= _InParamsStruct.AlmHiOffDlyTime;
    tmrAlmHiHiOff.PT:= _InParamsStruct.AlmHiOffDlyTime;
    // reset the timers
    tmrAlmLoLoOff(IN:= TRUE);
    tmrAlmLoOff(IN:= TRUE);
    tmrAlmRangeHiOff(IN:= TRUE);
    tmrAlmHiOff(IN:= TRUE);
    tmrAlmHiHiOff(IN:= TRUE);
    
  ELSIF NOT _InSetParams THEN
    // Input is clear ... clear the OS
    SetParamsOS:= FALSE;
  ELSE
    // input is set, and OS is set ... do nothing
  END_IF;

  // Scale analog input. Look at the module and channel okay bits, and that the raw type is not 'Off'.
  // If all is okay, scale the raw input, process alarms, and set the scaled value and alarm bits
  // in the structure.
  // If not, then set the scaled value to a sentinel value.
  IF _InInputStruct.ModuleOk AND _InInputStruct.ChannelOk AND _InParamsStruct.RawType <> GAPIO_RWST_OFF THEN
    // Module and channel are healthy, and type is not set to off ... scale and process alarms
    
    // Convert the input buffer to a real value based upon the input type specified
    // Apply the Raw (counts) offset
    IF _InParamsStruct.RawType = GAPIO_RWST_USINT THEN
      // Input is a USINT. Convert to a real so it can be used with the scaling function 
      rawAdj := USINT_TO_REAL(_InInputStruct.InRawUSINT) + _InParamsStruct.RawOffset;
    ELSIF _InParamsStruct.RawType = GAPIO_RWST_SINT THEN
      // Input is a SINT. Convert to a real so it can be used with the scaling function 
      rawAdj := SINT_TO_REAL(_InInputStruct.InRawSINT) + _InParamsStruct.RawOffset;
    ELSIF _InParamsStruct.RawType = GAPIO_RWST_UINT THEN
      // Input is a UINT. Convert to a real so it can be used with the scaling function 
      rawAdj := UINT_TO_REAL(_InInputStruct.InRawUINT) + _InParamsStruct.RawOffset;
    ELSIF _InParamsStruct.RawType = GAPIO_RWST_INT THEN
      // Input is a INT. Convert to a real so it can be used with the scaling function 
      rawAdj := INT_TO_REAL(_InInputStruct.InRawINT) + _InParamsStruct.RawOffset;
    ELSIF _InParamsStruct.RawType = GAPIO_RWST_UDINT THEN
      // Input is a UDINT. Convert to a real so it can be used with the scaling function 
      rawAdj := UDINT_TO_REAL(_InInputStruct.InRawUDINT) + _InParamsStruct.RawOffset;
    ELSIF _InParamsStruct.RawType = GAPIO_RWST_DINT THEN
      // Input is a DINT. Convert to a real so it can be used with the scaling function 
      rawAdj := DINT_TO_REAL(_InInputStruct.InRawDINT) + _InParamsStruct.RawOffset;
    ELSIF _InParamsStruct.RawType = GAPIO_RWST_REAL THEN
      // input is a real. Put it in the holding register so it can be used with the scaling function
      // In this case, the RawOffset would be in whatever units the InRawReal would be in.
      rawAdj := _InInputStruct.InRawREAL + _InParamsStruct.RawOffset;
    END_IF;
    
    // scale the input value and apply the EU Offset
    // Scaled value = (((Raw - Raw Min) / Raw Range) * EU Range) + EU Min
    _InInputStruct.InScaled := (((rawAdj - _InParamsStruct.RawMin) / (_InParamsStruct.RawMax - _InParamsStruct.RawMin)) * 
    (_InParamsStruct.EuMax - _InParamsStruct.EuMin)) + _InParamsStruct.EuOffset;
    
    // filter the scaled value if enabled
    IF _InParamsStruct.LpEnable THEN
      fbNoiseFilter._InPassThru := FALSE;
      fbNoiseFilter._InK := _InParamsStruct.LpCoeff;
      fbNoiseFilter._InVal := _InInputStruct.InScaled;
      fbNoiseFilter();
      // If the unfiltered is not to be preserved, overwrite it
      // This is useful if you want to alarm on filtered values
      _InInputStruct.InScaledFiltered := fbNoiseFilter._OutFilteredVal;
      IF NOT _InParamsStruct.LpPreserveUnfiltered THEN
        _InInputStruct.InScaled := _InInputStruct.InScaledFiltered;
      END_IF
    ELSE
      // filter not enabled, populate the filtered with the unfiltered value so 
      // there is at least a live value
      _InInputStruct.InScaledFiltered := _InInputStruct.InScaled;
    END_IF;
        
        
    // process alarms
    // clear the channel alarm
    _InInputStruct.alms.31:= FALSE;
    // process range then hihi then hi such that a range does not also cause the other two, and a hihi does not also cause a hi.
    // Similar for lolo and low
    // Use a deadband on the raw signals so a hi pv alarm needs to fall below the threshold - deadband value before being reset, and a lo
    // pv alarm needs to rise above the threshold + deadband value before being reset.
    // condition db percents to be >= 0
    _InParamsStruct.AlmDbLoPct:= MAX(0, _InParamsStruct.AlmDbLoPct);
    _InParamsStruct.AlmDbHiPct:= MAX(0, _InParamsStruct.AlmDbHiPct);
    // calc deadband values from db pct and eu range.
    // Lo Db Val = lo threshold + (EU Range * Db Pct)
    // Hi Db Val = hi threshold - (EU Range * Db Pct)
    almRangeLoDbVal:= _InParamsStruct.AlmRangeThreshLo + ((_InParamsStruct.EuMax - _InParamsStruct.EuMin) * _InParamsStruct.AlmDbLoPct / 100.0);
    almRangeHiDbVal:= _InParamsStruct.AlmRangeThreshHi - ((_InParamsStruct.EuMax - _InParamsStruct.EuMin) * _InParamsStruct.AlmDbHiPct / 100.0);
    almLoLoDbVal:= _InParamsStruct.AlmThreshLoLo + ((_InParamsStruct.EuMax - _InParamsStruct.EuMin) * _InParamsStruct.AlmDbLoPct / 100.0);
    almLoDbVal:= _InParamsStruct.AlmThreshLo + ((_InParamsStruct.EuMax - _InParamsStruct.EuMin) * _InParamsStruct.AlmDbLoPct / 100.0);
    almHiDbVal:= _InParamsStruct.AlmThreshHi - ((_InParamsStruct.EuMax - _InParamsStruct.EuMin) * _InParamsStruct.AlmDbHiPct / 100.0);
    almHiHiDbVal:= _InParamsStruct.AlmThreshHiHi - ((_InParamsStruct.EuMax - _InParamsStruct.EuMin) * _InParamsStruct.AlmDbHiPct / 100.0);
    // low and high range alarms - can't disable these with a bit ... disable by setting the thresholds to unobtainium
    almsRaw.0:= (_InInputStruct.InScaled < _InParamsStruct.AlmRangeThreshLo) OR (almsRaw.0 AND _InInputStruct.InScaled <= almRangeLoDbVal);
    almsRaw.1:= (_InInputStruct.InScaled > _InParamsStruct.AlmRangeThreshHi) OR (almsRaw.1 AND _InInputStruct.InScaled >= almRangeHiDbVal);
    // lolo, lo, hi, and hihi alarms. Look at overall and individual enables, the range alarms, and the neighboring 'next severe' alarm.
    // KIncorporate deadband functionality - seal the alarm until the pv goes past the db value (falls below or rises above for hi/lo alarms respectively
    // lolo - keep off if lo range alarm also
    almsRaw.2:= _InParamsStruct.AlmEnable AND _InParamsStruct.AlmLoLoEnable AND NOT almsRaw.0 AND (_InInputStruct.InScaled < _InParamsStruct.AlmThreshLoLo OR
    (almsRaw.2 AND _InInputStruct.InScaled <= almLoLoDbVal));
    // lo - keep off if lolo or lo range alarm also
    almsRaw.3:= _InParamsStruct.AlmEnable AND _InParamsStruct.AlmLoEnable AND NOT almsRaw.0 AND NOT almsRaw.2 AND (_InInputStruct.InScaled < _InParamsStruct.AlmThreshLo OR
    (almsRaw.3 AND _InInputStruct.InScaled <= almLoDbVal));
    // hihi - keep off if hi range alarm also
    almsRaw.5:= _InParamsStruct.AlmEnable AND _InParamsStruct.AlmHiHiEnable AND NOT almsRaw.1 AND (_InInputStruct.InScaled > _InParamsStruct.AlmThreshHiHi OR
    (almsRaw.5 AND _InInputStruct.InScaled >= almHiHiDbVal));
    // hi - keep off if hihi or hi range alarm also
    almsRaw.4:= _InParamsStruct.AlmEnable AND _InParamsStruct.AlmHiEnable AND NOT almsRaw.1 AND NOT almsRaw.5 AND (_InInputStruct.InScaled > _InParamsStruct.AlmThreshHi OR
    (almsRaw.4 AND _InInputStruct.InScaled >= almHiDbVal));
    // run the hi and lo timers if any of the respective alarms are active. Include the range alarms. Set the alarm bits in the structure based on the timers and 
    // raw alarm values.
    // Run on delay when alarm is active
    // Run off  delay when alarm is not active. TOF timers run when input is false, and delay the false by bringing Q low when done.
    // lo range
    tmrAlmRangeLoOn(IN:= almsRaw.0);
    tmrAlmRangeLoOff(IN:= almsRaw.0);
    // lo lo
    tmrAlmLoLoOn(IN:= almsRaw.2);
    tmrAlmLoLoOff(IN:= almsRaw.2);
    // lo
    tmrAlmLoOn(IN:= almsRaw.3);
    tmrAlmLoOff(IN:= almsRaw.3);
    // hi range
    tmrAlmRangeHiOn(IN:= almsRaw.1);
    tmrAlmRangeHiOff(IN:= almsRaw.1);
    // hi
    tmrAlmHiOn(IN:= almsRaw.4);
    tmrAlmHiOff(IN:= almsRaw.4);
    // hi hi
    tmrAlmHiHiOn(IN:= almsRaw.5);
    tmrAlmHiHiOff(IN:= almsRaw.5);
    // consider the alarm active if the on timer has expired or if it was already active and the off timer expired (off delay)
    // alm = TmrOn.Q OR (alm AND TmrOff.Q)
    // lo range
    _InInputStruct.alms.0:= tmrAlmRangeLoOn.Q OR (_InInputStruct.alms.0 AND tmrAlmRangeLoOff.Q);
    // lolo
    _InInputStruct.alms.2:= tmrAlmLoLoOn.Q OR (_InInputStruct.alms.2 AND tmrAlmLoLoOff.Q);
    // lo
    _InInputStruct.alms.3:= tmrAlmLoOn.Q OR (_InInputStruct.alms.3 AND tmrAlmLoOff.Q);
    // hi range
    _InInputStruct.alms.1:= tmrAlmRangeHiOn.Q OR (_InInputStruct.alms.1 AND tmrAlmRangeHiOff.Q);
    // hi
    _InInputStruct.alms.4:= tmrAlmHiOn.Q OR (_InInputStruct.alms.4 AND tmrAlmHiOff.Q);
    // hi hi
    _InInputStruct.alms.5:= tmrAlmHiHiOn.Q OR (_InInputStruct.alms.5 AND tmrAlmHiHiOff.Q);
    
  ELSE
    // Unhealthy module or channel, or off ... use the sentinel for the scaled value, set the channel error alm and clear the others.
    _InInputStruct.InScaled:= _InSentinel;
    // clear the alarms and reset the timers
    // Set the channel alarm if the we are here, but the channel is not off
    IF  _InParamsStruct.RawType <> GAPIO_RWST_OFF THEN
      _InInputStruct.alms:= 16#80000000;  // channel alarm is bit 31
    ELSE
      _InInputStruct.alms:= 16#0;
    END_IF;
    tmrAlmRangeLoOn(IN:= FALSE);
    tmrAlmRangeLoOff(IN:= FALSE);
    tmrAlmLoLoOn(IN:= FALSE);
    tmrAlmLoLoOff(IN:= FALSE);
    tmrAlmLoOn(IN:= FALSE);
    tmrAlmLoOff(IN:= FALSE);
    tmrAlmRangeHiOn(IN:= FALSE);
    tmrAlmRangeHiOff(IN:= FALSE);
    tmrAlmHiOn(IN:= FALSE);
    tmrAlmHiOff(IN:= FALSE);
    tmrAlmHiHiOn(IN:= FALSE);
    tmrAlmHiHiOff(IN:= FALSE);
  END_IF;

END_FUNCTION_BLOCK
