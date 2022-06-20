
PROGRAM _INIT

  (****** Cam related ******)
  // Set up fb to populate cam sections
  fbCreateCamSections.CamTable := ADR(camTable);
  fbCreateCamSections.DepthToAngle_T1 := ADR(gr_depthToAngleLu.T1);
  fbCreateCamSections.DepthToAngle_T2 := ADR(gr_depthToAngleLu.T2);
  fbCreateCamSections.DepthToAngle_T3 := ADR(gr_depthToAngleLu.T3);

  (****** Recipe and file related ******)
  gr_depthToAngleLu; // Make sure the tables exist!!
  depthToAngleLu;
  
  // Setup registration of PV to a recipe
  // Each PV uses a separate registration FB
  // Local Depth To Angle LU Table
  // Use local LU table for recipe access and transfer to/from global when all is well
  pvNameLocalDepthToAngleLu := 'CrCamTbl:depthToAngleLu';
  pvCatagoryDepthToAngleLu := 'DepthToAngle';
  fbRcpiRegLocalDToALu.MpLink := ADR(angleLuRecipeCsv);
  fbRcpiRegLocalDToALu.Enable := FALSE;
  fbRcpiRegLocalDToALu.ErrorReset := FALSE;
  fbRcpiRegLocalDToALu.PVName := ADR(pvNameLocalDepthToAngleLu);
  fbRcpiRegLocalDToALu.Category := ADR(pvCatagoryDepthToAngleLu);
  // set up the fb by calling with enable false, and then set enable
  // true so it is ready to go in cyclic.
  fbRcpiRegLocalDToALu();
  fbRcpiRegLocalDToALu.Enable := TRUE;

  // Global Depth To Angle LU Table
  // Use local LU table for recipe access and transfer to/from global when all is well
  pvNameGloballDepthToAngleLu := 'gr_depthToAngleLu';
  pvCatagoryDepthToAngleLu := 'DepthToAngle';
  fbRcpiRegGlobalDToALu.MpLink := ADR(angleLuRecipeCsv);
  fbRcpiRegGlobalDToALu.Enable := FALSE;
  fbRcpiRegGlobalDToALu.ErrorReset := FALSE;
  fbRcpiRegGlobalDToALu.PVName := ADR(pvNameGloballDepthToAngleLu);
  fbRcpiRegGlobalDToALu.Category := ADR(pvCatagoryDepthToAngleLu);
  // set up the fb by calling with enable false, and then set enable
  // true so it is ready to go in cyclic.
  fbRcpiRegGlobalDToALu();
  fbRcpiRegGlobalDToALu.Enable := TRUE;

  // Set flag to create directories
  initDirs := TRUE; // true will trigger dir setup (creation) after startup
  initDirsOS := FALSE;
  initDirsDone := FALSE;
  
  // Set flags to control read/write of recipes
  // recipe file names
  recipeReadFileName := 'DepthToAngleLookup_recipe_b.csv';
  recipeWriteFileName := 'DepthToAngleLookup_recipe_b_FromPlc.csv';

  // set whether or not to overwrite the global data on sucessful local read
  recipeReadOverwiteGlobal := FALSE; 

  recipeReadAngleLu := FALSE; // set high to read recipe after startup
  recipeReadAngleLuOS := FALSE;
  recipeReadAngleLuDone := FALSE;
  
  recipeWriteAngleLu := FALSE; // set high to read recipe after startup
  recipeWriteAngleLuOS := FALSE;
  recipeWriteAngleLuDone := FALSE;
  
 END_PROGRAM


PROGRAM _CYCLIC

  // *****************
  // Create Cam table on request
  // *****************
  
  // On request, calculate and populate cam sections base on cut parameters.
  // Done sucessfully, and camSeqCtr should start from 1, go up, and then end up at -1.
  // Errors result in a more negative camSeqCtr
  // TODO: Deal with errors. Right now the sequence stops, with the camSeqCtr being set to 
  // a value more negative than -1.
  
  IF createCamTable THEN
  
    // if the OS is clear, this is the first time thru ... 
    // init the seq number and manage flags and OS
    IF NOT createCamTableOS THEN
      // Set the OS so this bit only happens once per req
      createCamTableOS := TRUE;
      // Init the seq ctr
      camSeqCtr := 1;
      // Clear the done flag
      createCamTableDone := FALSE;
    END_IF;

    IF 1 = camSeqCtr THEN
      // Use cam id 14 for calculated cam table
      camTableId := 14;
      
      // Set up to calc the cam sections fb
      // Use the current cutting head configuration for the cut profile
      
      // Force the finish pass depth to be zero if the option is not chosen
      IF gr_CfgCurrent.cuttingHead.finishingPass THEN
        fbCreateCamSections.FinishPassDepth :=  gr_CfgCurrent.cuttingHead.finishingPassDepth;
      ELSE
        fbCreateCamSections.FinishPassDepth := 0.0;
      END_IF;
      fbCreateCamSections.PassCount := gr_CfgCurrent.cuttingHead.passCount;
      fbCreateCamSections.FinalDepth := gr_CfgCurrent.cuttingHead.totalDepth;
      fbCreateCamSections.CutInAngle :=  LREAL_TO_REAL(gr_CfgCurrent.cuttingHead.depthAdjAngle);
      fbCreateCamSections.OverCutAngle :=  LREAL_TO_REAL(gr_CfgCurrent.cuttingHead.cutOverrunAngle);
      
      // Clear the camTable, camData, and point arrays
      // nxt_adr := brsmemset(ADR(Mem),value,length);
      nxtAddr := brsmemset(ADR(camTable), 0, SIZEOF(camTable));
      nxtAddr := brsmemset(ADR(camData), 0, SIZEOF(camData));
      nxtAddr := brsmemset(ADR(camPointsMaster), 0, SIZEOF(camPointsMaster));
      nxtAddr := brsmemset(ADR(camPointsSlave), 0, SIZEOF(camPointsSlave));
      
      // Call with enable false to make sure everything is reset and ready to execute with new info
      fbCreateCamSections.Enable := FALSE;
      fbCreateCamSections();
      // onto the next step
      camSeqCtr := 2;
    ELSIF 2 = camSeqCtr THEN
      // Calc the cam sections
      fbCreateCamSections.Enable := TRUE;
      fbCreateCamSections();
      IF fbCreateCamSections.Done AND NOT fbCreateCamSections.Error THEN
        // All done and no error. Move on ...
        // Reset FB and go to next step
        fbCreateCamSections.Enable := FALSE;
        fbCreateCamSections();
        camSeqCtr := 3;
      ELSIF fbCreateCamSections.Done AND fbCreateCamSections.Error THEN
        // Done with an error. Bail out ...
        camSeqCtr := -2; 
      END_IF;
    ELSIF 3 = camSeqCtr THEN
      // Set up to calc the cam from the sections
      fbCalcCamFromSections.CamSectionsAddress := ADR(camTable);
      fbCalcCamFromSections.CamDataAddress := ADR(camData);
      // Call with execute false to make sure everything is reset and ready to execute with new info
      fbCalcCamFromSections.Execute := FALSE;
      fbCalcCamFromSections();
      // onto the next step
      camSeqCtr := 4;
    ELSIF 4 = camSeqCtr THEN
      // Calc the cam sections
      fbCalcCamFromSections.Execute := TRUE;
      fbCalcCamFromSections();
      IF fbCalcCamFromSections.Done AND NOT fbCalcCamFromSections.Error THEN
        // All done and no error. Move on ...
        // Reset FB and go to next step
        fbCalcCamFromSections.Execute := FALSE;
        fbCalcCamFromSections();
        camSeqCtr := 5;
      ELSIF NOT fbCalcCamFromSections.Busy AND fbCalcCamFromSections.Error THEN
        // Done with an error. Bail out ...
        camSeqCtr := -4; 
      END_IF;
    ELSIF 5 = camSeqCtr THEN
      // Set up to prepare and load the cam data
      fbCamPrepare.Axis := ADR(axes[AD_INNER_ECCENTRIC].AxisObj);
      fbCamPrepare.Cam.DataObjectName := ''; // not used if Cam.DataAdress <> 0
      fbCamPrepare.Cam.DataAdress := ADR(camData); // cam data calculated in fbCalcCamFromSections
      fbCamPrepare.CamID := camTableId;
      // Call with execute false to make sure everything is reset and ready to execute with new info
      fbCamPrepare.Execute := FALSE;
      fbCamPrepare();
      // onto the next step
      camSeqCtr := 6;
    ELSIF 6 = camSeqCtr THEN
      // Prepare and load the cam data
      fbCamPrepare.Execute := TRUE;
      fbCamPrepare();
      IF fbCamPrepare.Done AND NOT fbCamPrepare.Error THEN
        // All done and no error. Move on ...
        // Reset FB and go to next step
        fbCamPrepare.Execute := FALSE;
        fbCamPrepare();
        camSeqCtr := -1;  // TEST: skip fbCalcCamPoints. Getting an error
      ELSIF NOT fbCamPrepare.Busy AND fbCamPrepare.Error THEN
        // Done with an error. Bail out ...
        camSeqCtr := -6; 
      END_IF;
    ELSIF 7 = camSeqCtr THEN
      // Set up to calculate cam points
      fbCalcCamPoints.Cam.DataObjectName := ''; // not used if Cam.DataAdress <> 0
      fbCalcCamPoints.Cam.DataAdress := ADR(camData); // cam data calculated in fbCalcCamFromSections
      fbCalcCamPoints.MasterPointsAddress := ADR(camPointsMaster);
      fbCalcCamPoints.SlavePointsAddress := ADR(camPointsSlave);
      fbCalcCamPoints.NumberOfPoints := CAM_POINTS;
      // Call with execute false to make sure everything is reset and ready to execute with new info
      fbCalcCamPoints.Execute := FALSE;
      fbCalcCamPoints();
      // onto the next step
      camSeqCtr := 8; 
    ELSIF 8 = camSeqCtr THEN
      // Calcuate points from the cam data
      fbCalcCamPoints.Execute := TRUE;
      fbCalcCamPoints();
      IF fbCalcCamPoints.Done AND NOT fbCalcCamPoints.Error THEN
        // All done and no error. Move on ...
        // reset fb
        fbCalcCamPoints.Execute := FALSE;
        fbCalcCamPoints();
        camSeqCtr := -1;
      ELSIF NOT fbCalcCamPoints.Busy AND fbCalcCamPoints.Error THEN
        // Done with an error. Bail out ...
        camSeqCtr := -8; 
      END_IF;
    ELSIF -1 = camSeqCtr THEN
      // All done making cam sections.
      // Getting ready if another request is made.
      // Clear the createCamTable flag and OS and set the done. 
     createCamTable := FALSE;
     createCamTableOS := FALSE; // clear the OS so another initDirs resets things up top
     createCamTableDone := TRUE;
     // reset fb
     fbCreateCamSections.Enable := FALSE;
     fbCreateCamSections();
    END_IF;
  ELSE
    // createCamTable is false. Clear the OS so we can one time thru it next time
    createCamTableOS := FALSE;
  END_IF;


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
    // init the seq number and manage flags and OS
    IF NOT initDirsOS THEN
      // Set the OS so this bit only happens once per initDirs
      initDirsOS := TRUE;
      // Init the seq ctr
      seqCtr := 1;
      // Clear the done flag
      initDirsDone := FALSE;
    END_IF;
      
    IF 1 = seqCtr THEN
      // Setup for first dir
      devName := 'UserPartitionRoot';
      dirName := 'config';
      fbDirCreate.enable := FALSE;
      fbDirCreate.pDevice := ADR(devName);
      fbDirCreate.pName := ADR(dirName);
      fbDirCreate();
      IF ERR_FUB_ENABLE_FALSE = fbDirCreate.status THEN
        seqCtr := 2;
      END_IF;
    ELSIF 2 = seqCtr THEN
      // create first dir
      fbDirCreate.enable := TRUE;
      fbDirCreate();
      IF ERR_OK = fbDirCreate.status OR fiERR_DIR_ALREADY_EXIST = fbDirCreate.status THEN
        // creation okay or not needed
        seqCtr := 3;
      END_IF;
    ELSIF 3 = seqCtr THEN
      // Setup for seconnd dir
      dirName := 'config\recipes';
      // same addresses for device and name
      fbDirCreate.enable := FALSE;
      fbDirCreate();
      IF ERR_FUB_ENABLE_FALSE = fbDirCreate.status THEN
        seqCtr := 4;
      END_IF;
    ELSIF 4 = seqCtr THEN
      // create second dir
      fbDirCreate.enable := TRUE;
      fbDirCreate();
      IF ERR_OK = fbDirCreate.status OR fiERR_DIR_ALREADY_EXIST = fbDirCreate.status THEN
        // creation okay or not needed
        seqCtr := -1;
      END_IF;
    ELSIF -1 = seqCtr THEN
      // All done making directories.
      // Getting ready if another request is made.
      // Clear the initDirs flag and OS and set the done. 
     initDirs := FALSE;
     initDirsOS := FALSE; // clear the OS so another initDirs resets things up top
     initDirsDone := TRUE;
     // shut off the fb as a matter of good practice
     fbDirCreate.enable := FALSE;
     fbDirCreate();
    END_IF;
  ELSE
    // initDirs is false. Clear the OS so we can one time thru it next time
    initDirsOS := FALSE;
  END_IF;


  // *****************
  // Read Write Lu Tables to/from recipe
  // *****************

  // Recipe Registration fb should be called all the time, and need to be active
  // when recipe read/write is performed.
  // MpRecipeRegPar was set up in init
  fbRcpiRegLocalDToALu();
  fbRcpiRegGlobalDToALu();
  
  // **** Read Recipe
  // Treat recipe read as async until done or error
  // seqCtr odd: set up fbRecipeCsv fb
  // seqCtr even : read recipe
  // Use the OS so the read can be easily re-run
  // by setting registerPvs true (again)
  IF NOT initDirs AND initDirsDone AND
      fbRcpiRegLocalDToALu.Active AND NOT fbRcpiRegLocalDToALu.Error AND
      fbRcpiRegGlobalDToALu.Active AND NOT fbRcpiRegGlobalDToALu.Error AND
      recipeReadAngleLu AND NOT recipeWriteAngleLu THEN
    // if the OS is clear, this is the first time thru ... 
    // init the seq number and manage flags and OS
    IF NOT recipeReadAngleLuOS THEN
      // Set the OS so this bit only happens once per initDirs
      recipeReadAngleLuOS := TRUE;
      // Set the pv number
      seqCtr := 1;
      // Clear the done flag
      recipeReadAngleLuDone := FALSE;
    END_IF;
      
    IF 1 = seqCtr THEN
      // Setup for first pv
      devName := 'Recipes';
      pvCatagoryDepthToAngleLu := 'DepthToAngle';
      fbRecipeCsv.MpLink := ADR(angleLuRecipeCsv);
      fbRecipeCsv.Enable := FALSE;
      fbRecipeCsv.ErrorReset := FALSE;
      fbRecipeCsv.DeviceName := ADR(devName);
      fbRecipeCsv.FileName := ADR(recipeReadFileName);
      fbRecipeCsv.Header := ADR(csvHeader);
      fbRecipeCsv.Category := ADR(pvCatagoryDepthToAngleLu);
      fbRecipeCsv.LoadType := mpRECIPE_CSV_LOAD_ALL;
      fbRecipeCsv.Load := TRUE;
      fbRecipeCsv.Save := FALSE;
      fbRecipeCsv.UpdateNotification := FALSE;
      fbRecipeCsv();
      IF NOT fbRecipeCsv.Enable AND NOT fbRecipeCsv.Active AND 0 = fbRecipeCsv.StatusID THEN
        seqCtr := 2;
      END_IF;
    ELSIF 2 = seqCtr THEN
      // read the recipe file and populate the pv
      fbRecipeCsv.Enable := TRUE;
      fbRecipeCsv();
      IF fbRecipeCsv.CommandDone AND NOT fbRecipeCsv.Error THEN
        // read ok
        // If the bit is set, transfer local to the global table -- thisglobal is battery backed retained/permanent
        IF recipeReadOverwiteGlobal THEN
          gr_depthToAngleLu := depthToAngleLu;
        END_IF;
        seqCtr := -1; // all done!
      END_IF;
    ELSIF -1 = seqCtr THEN
      // All done reading the recipe. Deal with flags
      recipeReadAngleLu := FALSE;
      recipeReadAngleLuOS := FALSE; // clear the OS so another registerPv resets things
      recipeReadAngleLuDone := TRUE;
      // shut off the fb as a matter of good practice
      fbRecipeCsv.Enable := FALSE;
      fbRecipeCsv();
    END_IF;
  ELSE
    // Earlier operations not done, or recipeReadAngleLu flag is clear. Clear to OS so we can one time thru it next time
    recipeReadAngleLuOS := FALSE;
  END_IF;
  
  // **** Write Recipe
  // Treat recipe read as async until done or error
  // seqCtr odd: set up fbRecipeCsv fb
  // seqCtr even : read recipe
  // Use the OS so the read can be easily re-run
  // by setting registerPvs true (again)
  IF NOT initDirs AND initDirsDone AND
      fbRcpiRegLocalDToALu.Active AND NOT fbRcpiRegLocalDToALu.Error AND
      fbRcpiRegGlobalDToALu.Active AND NOT fbRcpiRegGlobalDToALu.Error AND
      recipeWriteAngleLu AND NOT recipeReadAngleLu THEN
    // if the OS is clear, this is the first time thru ... 
    // init the seq number and manage flags and OS
    IF NOT recipeWriteAngleLuOS THEN
      // Set the OS so this bit only happens once per initDirs
      recipeWriteAngleLuOS := TRUE;
      // Set the pv number
      seqCtr := 1;
      // Clear the done flag
      recipeWriteAngleLuDone := FALSE;
    END_IF;
      
    IF 1 = seqCtr THEN
      // Setup for first pv
      devName := 'Recipes';
      pvCatagoryDepthToAngleLu := 'DepthToAngle';
      csvHeader.Name := 'DepthToAngle';
      csvHeader.Description := 'Depths are given in inches, and angles correspond to negative (slave lag) offsets. Source is Robbie Potts Email.';
      csvHeader.Version := 'b';
      csvHeader.DateTime := DT#2022-06-03-14:56;
      fbRecipeCsv.MpLink := ADR(angleLuRecipeCsv);
      fbRecipeCsv.Enable := FALSE;
      fbRecipeCsv.ErrorReset := FALSE;
      fbRecipeCsv.DeviceName := ADR(devName);
      fbRecipeCsv.FileName := ADR(recipeWriteFileName);
      fbRecipeCsv.Header := ADR(csvHeader);
      fbRecipeCsv.Category := ADR(pvCatagoryDepthToAngleLu);
      fbRecipeCsv.LoadType := mpRECIPE_CSV_LOAD_ALL;
      fbRecipeCsv.Load := FALSE;
      fbRecipeCsv.Save := TRUE;
      fbRecipeCsv.UpdateNotification := FALSE;
      fbRecipeCsv();
      IF NOT fbRecipeCsv.Enable AND NOT fbRecipeCsv.Active AND 0 = fbRecipeCsv.StatusID THEN
        seqCtr := 2;
      END_IF;
    ELSIF 2 = seqCtr THEN
      // write pv to recipe file
      fbRecipeCsv.Enable := TRUE;
      fbRecipeCsv();
      IF fbRecipeCsv.CommandDone AND NOT fbRecipeCsv.Error THEN
        // read ok
        seqCtr := -1; // all done!
      END_IF;
    ELSIF -1 = seqCtr THEN
      // All done reading the recipe. Deal with flags
      recipeWriteAngleLu := FALSE;
      recipeWriteAngleLuOS := FALSE; // clear the OS so another registerPv resets things
      recipeWriteAngleLuDone := TRUE;
      // shut off the fb as a matter of good practice
      fbRecipeCsv.Enable := FALSE;
      fbRecipeCsv();
    END_IF;
  ELSE
    // Earlier operations not done, or recipeWriteAngleLu flag is clear. Clear to OS so we can one time thru it next time
    recipeWriteAngleLuOS := FALSE;
  END_IF;
  
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM