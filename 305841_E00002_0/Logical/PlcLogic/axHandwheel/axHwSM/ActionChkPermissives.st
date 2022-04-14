(********************************************************************
 * COPYRIGHT -- General Atomics
 ********************************************************************
 * Program: AxisStateMachine
 * File: ActionCheckPermissiveJog.st
 * Author: Administrator
 * Created: June 02, 2014
 ********************************************************************
 * Implementation of program AxisStateMachine
 ********************************************************************) 



ACTION ActionChkPermissiveContinuous: 
  // Permissive check for continuous moves -- jogs and velocity
  // These moves have an undefined length
  
  // NOTE THE MOVE NOT ALLOWED FLAG: This aciton will set this flag if it finds the move to be in violation.
  // It does not clear the flag, however, and this allows several check actions to be called in a chain. If
  // at the end of all the calls, the flag is set, then it is intended that the overall application logic should
  // not allow the move.
  
  (* ***** WARNING CAUTION ****
  These checks have only primitive checks for taking into account current velocicy, deceleration, and stopping distance.
  This means that the permissives will try to honor position limits, and try to keep from over-running a limit,
  but may overshoot if you run right up to a limit.
  
  The stopping distance is calculated from the velocity and decel value, which is mathmatically correct, but 
  in practice, the velocity value is approximate since it is sampled at a relatively slow rate.
  ***************************** *)
  
  // Calculate the stopping Distance if the axis is not virtual
  // If the axis in not moving, assume the velocity parameter for a move. 
  // If the axis is moving, used the reported velocity
  // Stopping distance = Vavg * t => V/2 * V/decel => V^2/2*decel
  IF NOT ax.isAxisVirtual THEN
    IF  ax.Status.PlcOpenState = mcAXIS_CONTINUOUS_MOTION OR // Will probably be continuous or synchronized because
        ax.Status.PlcOpenState = mcAXIS_DISCRETE_MOTION OR
        ax.Status.PlcOpenState = mcAXIS_SYNCHRONIZED_MOTION THEN
      // Axis is moving ... Use reported velocity
      // Prevent against divide by zero by assuming a value if decel is zero
      IF ax.MoveParameters.Deceleration = 0.0 THEN
        // No valid decel. Use min decel
        ax.MoveParameters.PermissiveCheck.EstStoppingDistance := (ax.Status.Velocity ** 2) / (2.0 * ax.MoveParameters.DecelMin);
      ELSE
        // We have a decel value, so use that
        ax.MoveParameters.PermissiveCheck.EstStoppingDistance := (ax.Status.Velocity ** 2) / (2.0 * ax.MoveParameters.Deceleration);
      END_IF;
    ELSE
      // Axis is stopped ... assume parameter velocity
      // Prevent against divide by zero by assuming a small value if decel is zero
      IF ax.MoveParameters.Deceleration = 0.0 THEN
        // No valid decel. Use min decel.
        ax.MoveParameters.PermissiveCheck.EstStoppingDistance := (ax.MoveParameters.Velocity ** 2) / (2.0 * ax.MoveParameters.DecelMin);
      ELSE
        // We have a decel value, so use that
        ax.MoveParameters.PermissiveCheck.EstStoppingDistance := (ax.MoveParameters.Velocity ** 2) / (2.0 * ax.MoveParameters.Deceleration);
      END_IF;
    END_IF;
  ELSE
    // virtual axis does not allow moves, so done not need stopping distance.
    ax.MoveParameters.PermissiveCheck.EstStoppingDistance := 0.0;
  END_IF;

  // Check the directional move permissives and then check the allowable position range
    
  // Initially clear the Check Failed flag. 
  // This will get set if any check fails. 
  // It will get checked at the end and will get used to control the 
  // move not allowed bit. The move not allowed bit was not used directly in the 
  // intermediate checks to avoid it transiting until all the logic was complete 
  ax.MoveParameters.PermissiveCheck.CheckFailed:= FALSE;
  
  // positive move permissive 
  IF ax.MoveParameters.Direction = mcDIR_POSITIVE  AND NOT ax.MoveParameters.PosMovePermissive THEN 
    ax.MoveParameters.PermissiveCheck.PermissiveHaltPos:= TRUE;
    ax.MoveParameters.PermissiveCheck.CheckFailed:= TRUE;
  ELSE 
    ax.MoveParameters.PermissiveCheck.PermissiveHaltPos:= FALSE;
  END_IF;
  
  // negative move permissive 
  IF ax.MoveParameters.Direction = mcDIR_NEGATIVE AND NOT ax.MoveParameters.NegMovePermissive THEN 
    ax.MoveParameters.PermissiveCheck.PermissiveHaltNeg:= TRUE;
    ax.MoveParameters.PermissiveCheck.CheckFailed:= TRUE;
  ELSE 
    ax.MoveParameters.PermissiveCheck.PermissiveHaltNeg:= FALSE;
  END_IF;
  
  // If the check passed the above, and the axis is not endless, then check the position limits
  IF NOT ax.MoveParameters.PermissiveCheck.CheckFailed AND NOT ax.isAxisEndless THEN
    // positive position window
    IF ax.MoveParameters.Direction = mcDIR_POSITIVE  AND
      (ax.Status.Position >=  axPositionLimits.PositionLimitPos OR
      ax.Status.Position + ax.MoveParameters.PermissiveCheck.EstStoppingDistance >=  axPositionLimits.PositionLimitPos) THEN 
      ax.MoveParameters.PermissiveCheck.RangeLimitPos:= TRUE;
      ax.MoveParameters.PermissiveCheck.CheckFailed:= TRUE;
    ELSE 
      ax.MoveParameters.PermissiveCheck.RangeLimitPos:= FALSE;  
    END_IF;
	
    // negative position window 
    IF ax.MoveParameters.Direction = mcDIR_NEGATIVE AND
      (ax.Status.Position <=  axPositionLimits.PositionLimitNeg OR
      ax.Status.Position - ax.MoveParameters.PermissiveCheck.EstStoppingDistance <=  axPositionLimits.PositionLimitNeg) THEN 
      ax.MoveParameters.PermissiveCheck.RangeLimitNeg:= TRUE;
      ax.MoveParameters.PermissiveCheck.CheckFailed:= TRUE;
    ELSE 
      ax.MoveParameters.PermissiveCheck.RangeLimitNeg:= FALSE;  
    END_IF;
  ELSIF ax.isAxisEndless THEN
    // Axis is endless, so it won't fail on position range... clear the bits
    ax.MoveParameters.PermissiveCheck.RangeLimitPos := FALSE;
    ax.MoveParameters.PermissiveCheck.RangeLimitNeg := FALSE;
  END_IF;

  // Set move not allowed bit depending on the check failed flag
  IF ax.MoveParameters.PermissiveCheck.CheckFailed THEN
    // at least 1 permissive failed, don't allow the move
    ax.Commands.MoveNotAllowed:= TRUE;
  END_IF;
  
END_ACTION

ACTION ActionChkPermissiveRel: 
  // Check the directional move permissives and then check the allowable position range

  // NOTE THE MOVE NOT ALLOWED FLAG: This aciton will set this flag if it finds the move to be in violation.
  // It does not clear the flag, however, and this allows several check actions to be called in a chain. If
  // at the end of all the calls, the flag is set, then it is intended that the overall application logic should
  // not allow the move.
  
  // Initially clear the Check Failed flag.
  // This will get set if any check fails. 
  // It will get checked at the end and will get used to control the 
  // move not allowed bit. The move not allowed bit was not used directly in the 
  // intermediate checks to avoid it transiting until all the logic was complete 
  ax.MoveParameters.PermissiveCheck.CheckFailed:= FALSE;

  // positive move permissive 
  // if distance is > 0, move is positive 
  IF ax.MoveParameters.Distance > 0 AND NOT ax.MoveParameters.PosMovePermissive THEN 
    ax.MoveParameters.PermissiveCheck.PermissiveHaltPos:= TRUE;
    ax.MoveParameters.PermissiveCheck.CheckFailed:= TRUE;
  ELSE 
    ax.MoveParameters.PermissiveCheck.PermissiveHaltPos:= FALSE;
  END_IF;
  
  // negative move permissive 
  // if distance is < 0, move is negative 
  IF ax.MoveParameters.Distance < 0 AND NOT ax.MoveParameters.NegMovePermissive THEN 
    ax.MoveParameters.PermissiveCheck.PermissiveHaltNeg:= TRUE;
    ax.MoveParameters.PermissiveCheck.CheckFailed:= TRUE;
  ELSE 
    ax.MoveParameters.PermissiveCheck.PermissiveHaltNeg:= FALSE;
  END_IF;

  // If the check passed the above, and the axis is not endless, then check the position limits
  IF NOT ax.MoveParameters.PermissiveCheck.CheckFailed AND NOT ax.isAxisEndless THEN
    // positive position window -- if distance is > 0, move is positive 
    IF ax.MoveParameters.Distance > 0.0 AND 
      ax.MoveParameters.PermissiveCheck.StartPosition + ax.MoveParameters.Distance > axPositionLimits.PositionLimitPos THEN  
      ax.MoveParameters.PermissiveCheck.RangeLimitPos:= TRUE;
      ax.MoveParameters.PermissiveCheck.CheckFailed:= TRUE;
    ELSE 
      ax.MoveParameters.PermissiveCheck.RangeLimitPos:= FALSE;
    END_IF;

    // negative position window -- if distance is < 0, move is negative
    IF ax.MoveParameters.Distance < 0.0 AND 
      ax.MoveParameters.PermissiveCheck.StartPosition + ax.MoveParameters.Distance < axPositionLimits.PositionLimitNeg THEN  
      ax.MoveParameters.PermissiveCheck.RangeLimitNeg:= TRUE;
      ax.MoveParameters.PermissiveCheck.CheckFailed:= TRUE;
    ELSE 
      ax.MoveParameters.PermissiveCheck.RangeLimitNeg:= FALSE;
    END_IF;
  ELSIF ax.isAxisEndless THEN
    // Axis is endless, so it won't fail on position range... clear the bits
    ax.MoveParameters.PermissiveCheck.RangeLimitPos := FALSE;
    ax.MoveParameters.PermissiveCheck.RangeLimitNeg := FALSE;
  END_IF;
    
  // Set the move not allowed bit depending on the check failed flag
  IF ax.MoveParameters.PermissiveCheck.CheckFailed THEN;
    // at least 1 permissive failed, don't allow the move
    ax.Commands.MoveNotAllowed:= TRUE;
  END_IF;

END_ACTION
        
ACTION ActionChkPermissiveAbs: 
  // Check the directional move permissives and then check the allowable position range

  // NOTE THE MOVE NOT ALLOWED FLAG: This aciton will set this flag if it finds the move to be in violation.
  // It does not clear the flag, however, and this allows several check actions to be called in a chain. If
  // at the end of all the calls, the flag is set, then it is intended that the overall application logic should
  // not allow the move.
  
  // Initially clear the Check Failed flag.
  // This will get set if any check fails. 
  // It will get checked at the end and will get used to control the 
  // move not allowed bit. The move not allowed bit was not used directly in the 
  // intermediate checks to avoid it transiting until all the logic was complete 
  ax.MoveParameters.PermissiveCheck.CheckFailed:= FALSE;
  
  // Positive move permissive 
  // If requested position is > than current position, the move is positive 
  IF ax.MoveParameters.Position > ax.Status.Position AND NOT ax.MoveParameters.PosMovePermissive THEN 
    ax.MoveParameters.PermissiveCheck.PermissiveHaltPos:= TRUE;
    ax.MoveParameters.PermissiveCheck.CheckFailed:= TRUE;
  ELSE 
    ax.MoveParameters.PermissiveCheck.PermissiveHaltPos:= FALSE;
  END_IF;
  
  // Negative move permissive 
  // If requested position is < than current position, the move is negative 
  IF ax.MoveParameters.Position < ax.Status.Position AND NOT ax.MoveParameters.NegMovePermissive THEN 
    ax.MoveParameters.PermissiveCheck.PermissiveHaltNeg:= TRUE;
    ax.MoveParameters.PermissiveCheck.CheckFailed:= TRUE;
  ELSE 
    ax.MoveParameters.PermissiveCheck.PermissiveHaltNeg:= FALSE;
  END_IF;

  // If the check passed the above, and the axis is not endless, then check the position limits
  IF NOT ax.MoveParameters.PermissiveCheck.CheckFailed AND NOT ax.isAxisEndless THEN
  
    // Check that the requested position is within the allowable range 
    // Positive position window 
    IF ax.MoveParameters.Position >  axPositionLimits.PositionLimitPos THEN 
      ax.MoveParameters.PermissiveCheck.RangeLimitPos:= TRUE;
      ax.MoveParameters.PermissiveCheck.CheckFailed:= TRUE;
    ELSE 
      ax.MoveParameters.PermissiveCheck.RangeLimitPos:= FALSE;
    END_IF;
	
    // Negative position window 
    IF ax.MoveParameters.Position <  axPositionLimits.PositionLimitNeg THEN 
      ax.MoveParameters.PermissiveCheck.RangeLimitNeg:= TRUE;
      ax.MoveParameters.PermissiveCheck.CheckFailed:= TRUE;
    ELSE 
      ax.MoveParameters.PermissiveCheck.RangeLimitNeg:= FALSE;
    END_IF;

  ELSIF ax.isAxisEndless THEN
    // Axis is endless, so it won't fail on position range... clear the bits
    ax.MoveParameters.PermissiveCheck.RangeLimitPos := FALSE;
    ax.MoveParameters.PermissiveCheck.RangeLimitNeg := FALSE;
  END_IF;
  
  // Set the move not allowed bit depending on the check failed flag
  IF ax.MoveParameters.PermissiveCheck.CheckFailed THEN;
    // at least 1 permissive failed, don't allow the move
    ax.Commands.MoveNotAllowed:= TRUE;
  END_IF;
    
END_ACTION

ACTION ActionChkPermissiveCoupling: 
  // This action will consider the coupling status and determine if a move should be stopped. 
  // If there is no coupled slave, this action won't set the move not allowed flag.
  // If there is a coupled slave, this action will stop the master if the slave stops.
  
  // NOTE THE MOVE NOT ALLOWED FLAG: This aciton will set this flag if it finds the move to be in violation.
  // It does not clear the flag, however, and this allows several check actions to be called in a chain. If
  // at the end of all the calls, the flag is set, then it is intended that the overall application logic should
  // not allow the move.
  
  // Initially clear the Check Failed flag.
  // This will get set if any check fails. 
  // It will get checked at the end and will get used to control the 
  // move not allowed bit. The move not allowed bit was not used directly in the 
  // intermediate checks to avoid it transiting until all the logic was complete 
  ax.MoveParameters.PermissiveCheck.CheckFailed:= FALSE;

  // Make sure to stop the master if the slave goes out of sync w/o being commanded to
  IF (ax.fbMpAxisCoupling.Gear OR ax.fbMpAxisCoupling.GearInPos) AND ax.fbMpAxisCoupling.InSync THEN
    // Slave is geared and in sync. Set the flag so loss of sync can be acted on
    inSyncSlave := TRUE;
  ELSIF NOT ax.CouplingParameters.GearInCmd AND NOT ax.CouplingParameters.GearInPosCmd THEN
    // Slave is not geared. Clear the flag
    inSyncSlave := FALSE;
  END_IF;
  
  // If slave was synched, and is still supposed to be synched, and the master is moving, then stop the axis if the slave is not in sync or not in compensation
  // In compensation is true when slave is slowing down or speeding up to get into sync, like after a gear ratio change.
  IF inSyncSlave AND ax.Status.IsMoveActive AND (NOT ax.fbMpAxisCoupling.InSync AND NOT ax.fbMpAxisCoupling.InCompensation) THEN
    ax.MoveParameters.PermissiveCheck.CheckFailed:= TRUE;
  END_IF;
  
  // TODO: Are there other checks??
  // Not sure how to check an engaged slave because it does not know what the master will do.
  // Investigate what is needed. For now, allow the move. I think a real solution would need
  // to be based on the direction and distances for the master axis, and calculated thru a gear
  // ratio or cam to what the slave would do.
    
  // Set the move not allowed bit depending on the check failed flag
  IF ax.MoveParameters.PermissiveCheck.CheckFailed THEN;
    // at least 1 permissive failed, don't allow the move
    ax.Commands.MoveNotAllowed:= TRUE;
  END_IF;
  
  // The slave allows itself to be coupled by setting the coupling permissive.
  // TODO. For now, set it to facilitate testing
  ax.CouplingParameters.CouplingPermissive := TRUE;
  

END_ACTION