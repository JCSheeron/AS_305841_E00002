<?xml version="1.0" encoding="utf-8"?>
<?AutomationStudio FileVersion="4.9"?>
<SwConfiguration CpuAddress="SL1" xmlns="http://br-automation.co.at/AS/SwConfiguration">
  <TaskClass Name="Cyclic#1" />
  <TaskClass Name="Cyclic#2">
    <Task Name="ProdCycle" Source="PlcLogic.ProdCycle.prg" Memory="UserROM" Language="IEC" Debugging="true" />
    <Task Name="Annunc" Source="PlcLogic.Annunc.prg" Memory="UserROM" Language="IEC" Debugging="true" />
  </TaskClass>
  <TaskClass Name="Cyclic#3">
    <Task Name="Pendant" Source="PlcLogic.Pendant.prg" Memory="UserROM" Language="IEC" Debugging="true" />
    <Task Name="ProcInputs" Source="PlcLogic.ProcInputs.prg" Memory="UserROM" Language="IEC" Debugging="true" />
    <Task Name="axSpinSM" Source="PlcLogic.axSpindle.axSpindleSM.prg" Memory="UserROM" Language="IEC" Debugging="true" />
    <Task Name="axOutESM" Source="PlcLogic.axOutE.axOutESM.prg" Memory="UserROM" Language="IEC" Debugging="true" />
    <Task Name="axInESM" Source="PlcLogic.axInE.axInESM.prg" Memory="UserROM" Language="IEC" Debugging="true" />
    <Task Name="axZSM" Source="PlcLogic.axZ.axZSM.prg" Memory="UserROM" Language="IEC" Debugging="true" />
    <Task Name="axHwSM" Source="PlcLogic.axHandwheel.axHwSM.prg" Memory="UserROM" Language="IEC" Debugging="true" />
    <Task Name="axCfVfdSM" Source="PlcLogic.axCfVfd.axCfVfdSM.prg" Memory="UserROM" Language="IEC" Debugging="true" />
  </TaskClass>
  <TaskClass Name="Cyclic#4">
    <Task Name="AxEnable" Source="PlcLogic.AxEnable.prg" Memory="UserROM" Language="IEC" Debugging="true" />
    <Task Name="CuttingFlu" Source="PlcLogic.CuttingFluidVFD.prg" Memory="UserROM" Language="IEC" Debugging="true" />
    <Task Name="OmSafeDev" Source="PlcLogic.OmSafeDev.prg" Memory="UserROM" Language="IEC" Debugging="true" />
  </TaskClass>
  <TaskClass Name="Cyclic#5" />
  <TaskClass Name="Cyclic#6" />
  <DataObjects>
    <DataObject Name="McAcpSys" Source="" Memory="UserROM" Language="Binary" />
  </DataObjects>
  <NcDataObjects>
    <NcDataObject Name="axSpindleP" Source="PlcLogic.axSpindle.axSpindleParamTable.dob" Memory="UserROM" Language="Apt" />
    <NcDataObject Name="axOutEPara" Source="PlcLogic.axOutE.axOutEParamTable.dob" Memory="UserROM" Language="Apt" />
    <NcDataObject Name="axInEParam" Source="PlcLogic.axInE.axInEParamTable.dob" Memory="UserROM" Language="Apt" />
    <NcDataObject Name="axZParamTa" Source="PlcLogic.axZ.axZParamTable.dob" Memory="UserROM" Language="Apt" />
    <NcDataObject Name="Cam1P" Source="PlcLogic.axInE.Cam1P.dob" Memory="UserROM" Language="Cam" />
    <NcDataObject Name="Cam1P_Fp" Source="PlcLogic.axInE.Cam1P_Fp.dob" Memory="UserROM" Language="Cam" />
    <NcDataObject Name="Cam2P" Source="PlcLogic.axInE.Cam2P.dob" Memory="UserROM" Language="Cam" />
    <NcDataObject Name="Cam2P_Fp" Source="PlcLogic.axInE.Cam2P_Fp.dob" Memory="UserROM" Language="Cam" />
    <NcDataObject Name="Cam3P" Source="PlcLogic.axInE.Cam3P.dob" Memory="UserROM" Language="Cam" />
    <NcDataObject Name="Cam3P_Fp" Source="PlcLogic.axInE.Cam3P_Fp.dob" Memory="UserROM" Language="Cam" />
    <NcDataObject Name="Cam4P" Source="PlcLogic.axInE.Cam4P.dob" Memory="UserROM" Language="Cam" />
    <NcDataObject Name="Cam4P_Fp" Source="PlcLogic.axInE.Cam4P_Fp.dob" Memory="UserROM" Language="Cam" />
    <NcDataObject Name="Cam5P" Source="PlcLogic.axInE.Cam5P.dob" Memory="UserROM" Language="Cam" />
    <NcDataObject Name="Cam5P_Fp" Source="PlcLogic.axInE.Cam5P_Fp.dob" Memory="UserROM" Language="Cam" />
    <NcDataObject Name="Cam6P" Source="PlcLogic.axInE.Cam6P.dob" Memory="UserROM" Language="Cam" />
    <NcDataObject Name="Cam6P_Fp" Source="PlcLogic.axInE.Cam6P_Fp.dob" Memory="UserROM" Language="Cam" />
    <NcDataObject Name="McDriveLog" Source="" Memory="UserROM" Language="Binary" />
  </NcDataObjects>
  <Binaries>
    <BinaryObject Name="udbdef" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="mvLoader" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="arflatprv" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="TCData" Source="" Memory="SystemROM" Language="Binary" />
    <BinaryObject Name="FWRules" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="arcoal" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="arsvcreg" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="McAcpSim" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="McProfGen" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="McAcpDrv" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="mCoWebSc" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="TCLang" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="OpcUaSrv" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="DataObject" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="Settings" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="iomap" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="asfw" Source="" Memory="SystemROM" Language="Binary" />
    <BinaryObject Name="axCfgZ" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="Role" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="ashwac" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="sysconf" Source="" Memory="SystemROM" Language="Binary" />
    <BinaryObject Name="arconfig" Source="" Memory="SystemROM" Language="Binary" />
    <BinaryObject Name="ashwd" Source="" Memory="SystemROM" Language="Binary" />
    <BinaryObject Name="Config" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="axCfgInE" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="axCfgSpin" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="asiol1" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="axCfgOutE" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="Anonymous" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="User" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="cockpit1" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="TC" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="vAxHwCfg" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="vAxHw" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="axCfgCfPmp" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="CamFeature" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="camlist1" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="mappConfig" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="vAxHwLin" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="vAxHwRot" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="wgRecipe" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="cmRecipe" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="HwLinCfg" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="Config_5" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="HwRotCfg" Source="" Memory="UserROM" Language="Binary" />
    <BinaryObject Name="Config_3" Source="" Memory="UserROM" Language="Binary" />
  </Binaries>
  <Libraries>
    <LibraryObject Name="sys_lib" Source="Libraries.sys_lib.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="runtime" Source="Libraries.runtime.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="brsystem" Source="Libraries.brsystem.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="GAProcIO" Source="Libraries.GAProcIO.lby" Memory="UserROM" Language="Iec" Debugging="true" />
    <LibraryObject Name="standard" Source="Libraries.standard.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="McBase" Source="Libraries.McBase.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="SfDomain" Source="Libraries.SfDomain.lby" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="MpAxis" Source="Libraries.MpAxis.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="McAxis" Source="Libraries.McAxis.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="MpBase" Source="Libraries.MpBase.lby" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="MpRecipe" Source="Libraries.MpRecipe.lby" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="McAcpAx" Source="Libraries.McAcpAx.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="GAMpMotion" Source="Libraries.GAMpMotion.lby" Memory="UserROM" Language="IEC" Debugging="true" />
    <LibraryObject Name="McPureVAx" Source="Libraries.McPureVAx.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="astime" Source="Libraries.astime.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="AsBrStr" Source="Libraries.AsBrStr.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="GAConvert" Source="Libraries.GAConvert.lby" Memory="UserROM" Language="IEC" Debugging="true" />
    <LibraryObject Name="MpAlarmX" Source="Libraries.MpAlarmX.lby" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="AsBrMath" Source="Libraries.AsBrMath.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="GAMath" Source="Libraries.GAMath.lby" Memory="UserROM" Language="IEC" Debugging="true" />
    <LibraryObject Name="CoTrace" Source="Libraries.CoTrace.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="AsZip" Source="Libraries.AsZip.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="FileIO" Source="Libraries.FileIO.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="McDS402Ax" Source="Libraries.McDS402Ax.lby" Memory="UserROM" Language="binary" Debugging="true" />
    <LibraryObject Name="astcp" Source="" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="asieccon" Source="" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="asiodiag" Source="" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="asepl" Source="" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="SfDomDrv" Source="" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="asusb" Source="" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="SfDomVis" Source="" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="aruser" Source="" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="arssl" Source="" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="powerlnk" Source="" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="MpSfDomMgr" Source="" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="dataobj" Source="" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="asioacc" Source="" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="GAMotor" Source="" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="MTFilter" Source="" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="MTBasics" Source="" Memory="UserROM" Language="Binary" Debugging="true" />
    <LibraryObject Name="MTTypes" Source="" Memory="UserROM" Language="Binary" Debugging="true" />
  </Libraries>
</SwConfiguration>