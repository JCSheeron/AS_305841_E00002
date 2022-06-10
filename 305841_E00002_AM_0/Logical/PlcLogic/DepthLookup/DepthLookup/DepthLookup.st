
PROGRAM _INIT



  // set up lookup functions
  fbAngleToDepthT1.NodeVectorX := angleToDepth_T1.xVals;
  fbAngleToDepthT1.FcnValues := angleToDepth_T1.yVals;
  fbAngleToDepthT1.NumberOfNodes := angleToDepth_T1.vals;
  fbAngleToDepthT1.Mode := mtLOOKUP_LINEAR_EXTRAPOLATION;
  fbAngleToDepthT1.Enable := TRUE;
	 
  fbAngleToDepthT2.NodeVectorX := angleToDepth_T2.xVals;
  fbAngleToDepthT2.FcnValues := angleToDepth_T2.yVals;
  fbAngleToDepthT2.NumberOfNodes := angleToDepth_T2.vals;
  fbAngleToDepthT2.Mode := mtLOOKUP_LINEAR_EXTRAPOLATION;
  fbAngleToDepthT2.Enable := TRUE;

  fbAngleToDepthT3.NodeVectorX := angleToDepth_T3.xVals;
  fbAngleToDepthT3.FcnValues := angleToDepth_T3.yVals;
  fbAngleToDepthT3.NumberOfNodes := angleToDepth_T3.vals;
  fbAngleToDepthT3.Mode := mtLOOKUP_LINEAR_EXTRAPOLATION;
  fbAngleToDepthT3.Enable := TRUE;

END_PROGRAM


PROGRAM _CYCLIC
	(* Insert code here *)
	 
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM