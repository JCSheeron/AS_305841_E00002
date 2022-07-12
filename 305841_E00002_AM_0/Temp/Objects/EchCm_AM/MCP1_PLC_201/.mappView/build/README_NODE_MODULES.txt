Requirements for creation of node_modules.zip:

1) Install modules with command "npm install"

2) Check if all files for local execution of grunt are in node_modules/.bin
	- node_x64.exe (version 10.23.2)
	- node_x86.exe (version 10.23.2)
	- grunt.cmd
	
3) Check if environment variables for node exist in grunt.cmd
	Example:

	@IF "%PROCESSOR_ARCHITECTURE%" == "x86" goto 32BIT

	   @rem OS is 64bit
	   @"%~dp0\node_x64.exe"  "%~dp0\..\grunt-cli\bin\grunt" %*
	   @goto END

	:32BIT
	   @rem OS is 32bit
	   @"%~dp0\node_x86.exe"  "%~dp0\..\grunt-cli\bin\grunt" %*

	:END
	
4) Check if node-sass has bindings to libSass for 64bit and 32bit:
node-sass
--vendor
----win32-ia32-64
----win32-x64-64

If all requirements are met, node_modules.zip can be created
