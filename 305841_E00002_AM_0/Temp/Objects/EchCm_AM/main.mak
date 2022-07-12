SHELL := cmd.exe
CYGWIN=nontsec
export PATH := C:\WINDOWS\system32;C:\WINDOWS;C:\WINDOWS\System32\Wbem;C:\WINDOWS\System32\WindowsPowerShell\v1.0\;C:\Program Files\Git\cmd;C:\Users\winVmUser1\AppData\Local\Programs\Python\Python38\Scripts\;C:\Users\winVmUser1\AppData\Local\Programs\Python\Python38\;C:\Users\winVmUser1\AppData\Local\Microsoft\WindowsApps;C:\Program Files (x86)\Common Files\Hilscher GmbH\TLRDecode;C:\Users\winVmUser1\AppData\Local\Programs\Python\Python38\Scripts\;C:\Users\winVmUser1\AppData\Local\Programs\Python\Python38\;C:\Users\winVmUser1\AppData\Local\Microsoft\WindowsApps;C:\Program Files (x86)\Common Files\Hilscher GmbH\TLRDecode;C:\BrAutomation\AS411\bin-en\4.11;C:\BrAutomation\AS411\bin-en\4.10;C:\BrAutomation\AS411\bin-en\4.9;C:\BrAutomation\AS411\bin-en\4.8;C:\BrAutomation\AS411\bin-en\4.7;C:\BrAutomation\AS411\bin-en\4.6;C:\BrAutomation\AS411\bin-en\4.5;C:\BrAutomation\AS411\bin-en\4.4;C:\BrAutomation\AS411\bin-en\4.3;C:\BrAutomation\AS411\bin-en\4.2;C:\BrAutomation\AS411\bin-en\4.1;C:\BrAutomation\AS411\bin-en\4.0;C:\BrAutomation\AS411\bin-en
export AS_BUILD_MODE := BuildAndTransfer
export AS_VERSION := 4.11.2.75
export AS_WORKINGVERSION := 4.11
export AS_COMPANY_NAME :=  
export AS_USER_NAME := winVmUser1
export AS_PATH := C:/BrAutomation/AS411
export AS_BIN_PATH := C:/BrAutomation/AS411/bin-en
export AS_PROJECT_PATH := C:/engineering/echCorrugationMachine/305841_E00002/305841_E00002_AM_0
export AS_PROJECT_NAME := 305841_E00002_AM_0
export AS_SYSTEM_PATH := C:/BrAutomation/AS/System
export AS_VC_PATH := C:/BrAutomation/AS411/AS/VC
export AS_TEMP_PATH := C:/engineering/echCorrugationMachine/305841_E00002/305841_E00002_AM_0/Temp
export AS_CONFIGURATION := EchCm_AM
export AS_BINARIES_PATH := C:/engineering/echCorrugationMachine/305841_E00002/305841_E00002_AM_0/Binaries
export AS_GNU_INST_PATH := C:/BrAutomation/AS411/AS/GnuInst/V6.3.0
export AS_GNU_BIN_PATH := C:/BrAutomation/AS411/AS/GnuInst/V6.3.0/4.9/bin
export AS_GNU_INST_PATH_SUB_MAKE := C:/BrAutomation/AS411/AS/GnuInst/V6.3.0
export AS_GNU_BIN_PATH_SUB_MAKE := C:/BrAutomation/AS411/AS/GnuInst/V6.3.0/4.9/bin
export AS_INSTALL_PATH := C:/BrAutomation/AS411
export WIN32_AS_PATH := "C:\BrAutomation\AS411"
export WIN32_AS_BIN_PATH := "C:\BrAutomation\AS411\bin-en"
export WIN32_AS_PROJECT_PATH := "C:\engineering\echCorrugationMachine\305841_E00002\305841_E00002_AM_0"
export WIN32_AS_SYSTEM_PATH := "C:\BrAutomation\AS\System"
export WIN32_AS_VC_PATH := "C:\BrAutomation\AS411\AS\VC"
export WIN32_AS_TEMP_PATH := "C:\engineering\echCorrugationMachine\305841_E00002\305841_E00002_AM_0\Temp"
export WIN32_AS_BINARIES_PATH := "C:\engineering\echCorrugationMachine\305841_E00002\305841_E00002_AM_0\Binaries"
export WIN32_AS_GNU_INST_PATH := "C:\BrAutomation\AS411\AS\GnuInst\V6.3.0"
export WIN32_AS_GNU_BIN_PATH := "$(WIN32_AS_GNU_INST_PATH)\\bin" 
export WIN32_AS_INSTALL_PATH := "C:\BrAutomation\AS411"

.suffixes:

ProjectMakeFile:

	@'$(AS_BIN_PATH)/4.9/BR.AS.AnalyseProject.exe' '$(AS_PROJECT_PATH)/305841_E00002_AM_0.apj' -t '$(AS_TEMP_PATH)' -c '$(AS_CONFIGURATION)' -o '$(AS_BINARIES_PATH)'   -sfas -buildMode 'BuildAndTransfer'   

