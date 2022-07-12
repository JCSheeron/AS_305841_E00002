define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     *  Contains all the names of the properties defined in the kaitai parser configuration
     *  This information might differ for different mapp Motion versions in the future
     */
    var NwctPropNames = /** @class */ (function () {
        function NwctPropNames() {
        }
        NwctPropNames.configEntries = "configRecords";
        NwctPropNames.configRecordId = "configurationRecordId";
        NwctPropNames.configNetworkType = "networkType";
        NwctPropNames.configNetworkInterfaceIndex = "networkInterfaceIndex";
        NwctPropNames.configNodeNo = "nodeNumberOfDrive";
        NwctPropNames.configDatagramType = "datagramType";
        NwctPropNames.configDatagramEncodingId = "datagramEncodingId";
        NwctPropNames.dataEntries = "dataRecords";
        NwctPropNames.dataConfigEntryId = "configRecordId";
        NwctPropNames.dataChannelIndex = "channelIndexOneBased";
        NwctPropNames.ncObjectType = "ncObjectType";
        NwctPropNames.dataNo = "index";
        NwctPropNames.dataGeneralInfo = "isGeneralInfo";
        NwctPropNames.dataTime = "timeInSeconds";
        NwctPropNames.dataAcopos = "acoposParameterData";
        NwctPropNames.dataParId = "parId";
        //public static readonly    dataCmd = "parCmd";
        NwctPropNames.dataCnt = "parCnt";
        NwctPropNames.dataPayload = "payload";
        return NwctPropNames;
    }());
    exports.NwctPropNames = NwctPropNames;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibndjdFByb3BOYW1lcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL253Y3RQcm92aWRlci9vYmpQYXJzZXIvbndjdFByb3BOYW1lcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFDQTs7O09BR0c7SUFDSDtRQUFBO1FBc0JBLENBQUM7UUFwQjBCLDJCQUFhLEdBQUcsZUFBZSxDQUFDO1FBQ2hDLDRCQUFjLEdBQUcsdUJBQXVCLENBQUM7UUFDekMsK0JBQWlCLEdBQUcsYUFBYSxDQUFDO1FBQ2xDLHlDQUEyQixHQUFHLHVCQUF1QixDQUFDO1FBQ3RELDBCQUFZLEdBQUcsbUJBQW1CLENBQUM7UUFDbkMsZ0NBQWtCLEdBQUcsY0FBYyxDQUFDO1FBQ3BDLHNDQUF3QixHQUFHLG9CQUFvQixDQUFDO1FBRWhELHlCQUFXLEdBQUcsYUFBYSxDQUFDO1FBQzVCLCtCQUFpQixHQUFHLGdCQUFnQixDQUFDO1FBQ3JDLDhCQUFnQixHQUFHLHNCQUFzQixDQUFDO1FBQzFDLDBCQUFZLEdBQUcsY0FBYyxDQUFDO1FBQzlCLG9CQUFNLEdBQUcsT0FBTyxDQUFDO1FBQ2pCLDZCQUFlLEdBQUcsZUFBZSxDQUFDO1FBQ2xDLHNCQUFRLEdBQUcsZUFBZSxDQUFDO1FBQzNCLHdCQUFVLEdBQUcscUJBQXFCLENBQUM7UUFDbkMsdUJBQVMsR0FBRyxPQUFPLENBQUM7UUFDM0MsK0NBQStDO1FBQ3hCLHFCQUFPLEdBQUcsUUFBUSxDQUFDO1FBQ25CLHlCQUFXLEdBQUcsU0FBUyxDQUFDO1FBQ25ELG9CQUFDO0tBQUEsQUF0QkQsSUFzQkM7SUF0Qlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLyoqXHJcbiAqICBDb250YWlucyBhbGwgdGhlIG5hbWVzIG9mIHRoZSBwcm9wZXJ0aWVzIGRlZmluZWQgaW4gdGhlIGthaXRhaSBwYXJzZXIgY29uZmlndXJhdGlvblxyXG4gKiAgVGhpcyBpbmZvcm1hdGlvbiBtaWdodCBkaWZmZXIgZm9yIGRpZmZlcmVudCBtYXBwIE1vdGlvbiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTndjdFByb3BOYW1lc3tcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGNvbmZpZ0VudHJpZXMgPSBcImNvbmZpZ1JlY29yZHNcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgY29uZmlnUmVjb3JkSWQgPSBcImNvbmZpZ3VyYXRpb25SZWNvcmRJZFwiO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBjb25maWdOZXR3b3JrVHlwZSA9IFwibmV0d29ya1R5cGVcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgY29uZmlnTmV0d29ya0ludGVyZmFjZUluZGV4ID0gXCJuZXR3b3JrSW50ZXJmYWNlSW5kZXhcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgY29uZmlnTm9kZU5vID0gXCJub2RlTnVtYmVyT2ZEcml2ZVwiO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBjb25maWdEYXRhZ3JhbVR5cGUgPSBcImRhdGFncmFtVHlwZVwiO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBjb25maWdEYXRhZ3JhbUVuY29kaW5nSWQgPSBcImRhdGFncmFtRW5jb2RpbmdJZFwiO1xyXG4gICAgXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGRhdGFFbnRyaWVzID0gXCJkYXRhUmVjb3Jkc1wiO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBkYXRhQ29uZmlnRW50cnlJZCA9IFwiY29uZmlnUmVjb3JkSWRcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZGF0YUNoYW5uZWxJbmRleCA9IFwiY2hhbm5lbEluZGV4T25lQmFzZWRcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgbmNPYmplY3RUeXBlID0gXCJuY09iamVjdFR5cGVcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZGF0YU5vID0gXCJpbmRleFwiO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBkYXRhR2VuZXJhbEluZm8gPSBcImlzR2VuZXJhbEluZm9cIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZGF0YVRpbWUgPSBcInRpbWVJblNlY29uZHNcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZGF0YUFjb3BvcyA9IFwiYWNvcG9zUGFyYW1ldGVyRGF0YVwiO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBkYXRhUGFySWQgPSBcInBhcklkXCI7XHJcbiAgICAvL3B1YmxpYyBzdGF0aWMgcmVhZG9ubHkgICAgZGF0YUNtZCA9IFwicGFyQ21kXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGRhdGFDbnQgPSBcInBhckNudFwiO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBkYXRhUGF5bG9hZCA9IFwicGF5bG9hZFwiO1xyXG59Il19