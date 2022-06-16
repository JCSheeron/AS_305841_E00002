
PROGRAM _INIT
  // TEST DATA
  // Fill tables with test data
  FOR idx := 0 TO 49 DO
    depthToAngle_T1.xVals[idx] := idx;
    depthToAngle_T1.yVals[idx] := depthToAngle_T1.xVals[idx] * 10;
    depthToAngle_T1.numberOfVals := 50;
    
    depthToAngle_T2.xVals[idx] := (idx + 50);
    depthToAngle_T2.yVals[idx] := depthToAngle_T2.xVals[idx] * 10;
    depthToAngle_T2.numberOfVals := 50;
    
    depthToAngle_T3.xVals[idx] := (idx + 100);
    depthToAngle_T3.yVals[idx] := depthToAngle_T3.xVals[idx] * 10;
    depthToAngle_T3.numberOfVals := 50;
    
  END_FOR;
  
  // Set flag to create directories
  devName := 'UserPartitionRoot';
  initDirs := FALSE;
  initDirsOS := FALSE;
  initDirsDone := FALSE;
  
  // Set flag to register variables with recipe
  registerPv := FALSE;
  registerPvOS := FALSE;
  registerPvDone := FALSE;

END_PROGRAM


PROGRAM _CYCLIC

  // *****************
  // Set up directories
  // *****************
  // Execute FileIO DirCreate async until done or error
  // seqCtr odd: set up DirCreate fb
  // seqCtr even : create dir
  // Use the OS so the directory management can be easily re-run
  // by setting initDirs true (again)
  IF initDirs THEN
    // if the OS is clear, this is the first time thru ... 
    // init the dir number and manage flags and OS
    IF NOT initDirsOS THEN
      // Set the OS so this bit only happens once per initDirs
      initDirsOS := TRUE;
      // Init the seq ctr
      seqCtr := 1;
      // Clear the done flag
      initDirsDone := FALSE;
    END_IF;
      
    IF seqCtr = 1 THEN
      // Setup for first dir
      dirName := 'config';
      fbDirCreate.enable := FALSE;
      fbDirCreate.pDevice := ADR(devName);
      fbDirCreate.pName := ADR(dirName);
      fbDirCreate();
      dirStatus := fbDirCreate.status;
      IF ERR_FUB_ENABLE_FALSE = dirStatus THEN
        ; // seqCtr := 2;
      END_IF;
    ELSIF seqCtr = 2 THEN
      // create first dir
      //fbDirCreate.enable := TRUE;
      fbDirCreate();
      dirStatus := fbDirCreate.status;
      IF ERR_OK = dirStatus OR fiERR_DIR_ALREADY_EXIST = dirStatus THEN
        // creation okay or not needed
        ; // seqCtr := 3;
      END_IF;
    ELSIF seqCtr = 3 THEN
      // Setup for seconnd dir
      dirName := 'config\recipes';
      // same addresses for device and name
      fbDirCreate.enable := FALSE;
      fbDirCreate();
      dirStatus := fbDirCreate.status;
      IF ERR_FUB_ENABLE_FALSE = dirStatus THEN
        seqCtr := 4;
      END_IF;
    ELSIF seqCtr = 4 THEN
      // create second dir
      fbDirCreate.enable := TRUE;
      fbDirCreate();
      dirStatus := fbDirCreate.status;
      IF ERR_OK = dirStatus OR fiERR_DIR_ALREADY_EXIST = dirStatus THEN
        // creation okay or not needed
        seqCtr := -1;
      END_IF;
    ELSIF seqCtr = -1 THEN
      // All done making directories.
      // Getting ready if another request is made.
      // Clear the initDirs flag and OS and set the done. 
     initDirs := FALSE;
     initDirsOS := FALSE; // clear the OS so another initDirs resets things up top
     initDirsDone := TRUE;
    END_IF;
  ELSE
    // initDirs is false. Clear the OS so we can one time thru it next time
    initDirsOS := FALSE;
  END_IF;

  // *****************
  // Register Recipe variables
  // *****************
  // Treat registration as async until done or error
  // seqCtr odd: set up MpRecipeRegPar fb
  // seqCtr even : register pv
  // Use the OS so the registration can be easily re-run
  // by setting registerPvs true (again)
  IF NOT initDirs AND initDirsDone AND registerPv THEN
    // if the OS is clear, this is the first time thru ... 
    // init the pv number and manage flags and OS
    IF NOT registerPvOS THEN
      // Set the OS so this bit only happens once per initDirs
      registerPvOS := TRUE;
      // Set the pv number
      seqCtr := 1;
      // Clear the done flag
      registerPvDone := FALSE;
    END_IF;
      
    IF seqCtr = 1 THEN
      // Setup for first pv
      pvName := 'DepthLookup:depthToAngle_T1';
      pvCatagory := 'DepthToAngle';
      fbRecipeRegister.MpLink := ADR(depthLuRecipeCsv);
      fbRecipeRegister.Enable := FALSE;
      fbRecipeRegister.ErrorReset := FALSE;
      fbRecipeRegister.PVName := ADR(pvName);
      fbRecipeRegister.Category := ADR(pvCatagory);
      fbRecipeRegister();
      registerPvStatus := fbRecipeRegister.StatusID;
      IF 666 = registerPvStatus THEN // TODO: NEED STATUS ID VALUES
        seqCtr := 2;
      END_IF;
    ELSIF seqCtr = 2 THEN
      // register first pv
      fbRecipeRegister.Enable := TRUE;
      fbRecipeRegister();
      registerPvStatus := fbRecipeRegister.StatusID;
      IF NOT fbRecipeRegister.Error AND 666 = registerPvStatus THEN // TODO: NEED STATUS ID VALUES
        // register okay
        seqCtr := 3;
      END_IF;
    ELSIF seqCtr = 3 THEN
      // Setup for second pv
      pvName := 'DepthLookup:depthToAngle_T2';
      pvCatagory := 'DepthToAngle';
      // addresses of name and MP link are the same
      fbRecipeRegister.Enable := FALSE;
      fbRecipeRegister.ErrorReset := FALSE;
      fbRecipeRegister();
      registerPvStatus := fbRecipeRegister.StatusID;
      IF 666 = registerPvStatus THEN // TODO: NEED STATUS ID VALUES
        seqCtr := 4;
      END_IF;
    ELSIF seqCtr = 4 THEN
      // register second pv
      fbRecipeRegister.Enable := TRUE;
      fbRecipeRegister();
      registerPvStatus := fbRecipeRegister.StatusID;
      IF NOT fbRecipeRegister.Error AND 666 = registerPvStatus THEN // TODO: NEED STATUS ID VALUES
        // register okay
        seqCtr := 5;
      END_IF;
    ELSIF seqCtr = 5 THEN
      // Setup for third pv
      pvName := 'DepthLookup:depthToAngle_T3';
      pvCatagory := 'DepthToAngle';
      // addresses of name and MP link are the same
      fbRecipeRegister.Enable := FALSE;
      fbRecipeRegister.ErrorReset := FALSE;
      fbRecipeRegister();
      registerPvStatus := fbRecipeRegister.StatusID;
      IF 666 = registerPvStatus THEN // TODO: NEED STATUS ID VALUES
        seqCtr := 6;
      END_IF;
    ELSIF seqCtr = 6 THEN
      // register third pv
      fbRecipeRegister.Enable := TRUE;
      fbRecipeRegister();
      registerPvStatus := fbRecipeRegister.StatusID;
      IF NOT fbRecipeRegister.Error AND 666 = registerPvStatus THEN // TODO: NEED STATUS ID VALUES
        // register okay
        seqCtr := -1; // all done!
      END_IF;
    ELSIF seqCtr = -1 THEN
      // All done making directories. Deal with flags
     registerPv := FALSE;
     registerPvOS := FALSE; // clear the OS so another registerPv resets things
     registerPvDone := TRUE;
    END_IF;
  ELSE
    // init dirs is not done, or register flag is clear. Clear to OS so we can one time thru it next time
    registerPvOS := FALSE;
  END_IF;
  


END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM