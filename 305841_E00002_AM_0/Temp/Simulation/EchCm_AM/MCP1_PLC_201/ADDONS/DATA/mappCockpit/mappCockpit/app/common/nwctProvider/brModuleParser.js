define(["require", "exports", "../../libs/dataparsing/kaitai-struct/KaitaiStream", "../../libs/dataparsing/BrModSDM"], function (require, exports, KaitaiStream, BrModSDM) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Parser for br module SMD file types
     *
     * @export
     * @class BrModuleParser
     */
    var BrModuleParser = /** @class */ (function () {
        /**
         * Creates an instance of BrModuleParser.
         * The received bin data get parsed and saved in readonly parameters
         *
         * @param {ArrayBuffer} binData
         * @memberof BrModuleParser
         */
        function BrModuleParser(binData) {
            this.isNCData = true;
            this.has6Sections = true;
            // create a KaitaiStream and pass the binary data
            var kaitaiStream = new KaitaiStream(binData);
            try {
                // parse the data
                var tmp = new BrModSDM(kaitaiStream);
                // set the parsed data
                this.mTrcBinDat01 = tmp.mTrcBinDat01;
                this.mappMotionArConfig = this.trimStrEnd(tmp.mappMotionArConfig);
                this.acoposParIDs = this.trimStrEnd(tmp.acoposParIDs);
                this.acoposErrInfTypes = this.trimStrEnd(tmp.acoposErrInfTypes);
            }
            catch (e) {
                // Is not the ID of NC-Data Module
                if (e.expected[0] === 70) {
                    this.isNCData = false;
                    console.log("Error in BrModuleParser: Loaded binary data is no NC Data! " + e.message);
                }
                // Does not have the expected 6 sections
                if (e.expected[0] === 6) {
                    this.has6Sections = false;
                    console.log("Error in BrModuleParser: Loaded binary data has not 6 sections! " + e.message);
                }
                // Set data empty
                this.mTrcBinDat01 = new ArrayBuffer(0);
                this.mappMotionArConfig = "";
                this.acoposParIDs = "";
                this.acoposErrInfTypes = "";
            }
        }
        /**
         * Removes the string behind the last "}"
         *
         * @private
         * @param {string} data
         * @return {*}  {string}
         * @memberof BrModuleParser
         */
        BrModuleParser.prototype.trimStrEnd = function (data) {
            var endIndex = data.lastIndexOf("}");
            return data.substr(0, endIndex + 1);
        };
        return BrModuleParser;
    }());
    exports.BrModuleParser = BrModuleParser;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJNb2R1bGVQYXJzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi9ud2N0UHJvdmlkZXIvYnJNb2R1bGVQYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBSUE7Ozs7O09BS0c7SUFDSDtRQVNJOzs7Ozs7V0FNRztRQUNILHdCQUFtQixPQUFvQjtZQWR2QixhQUFRLEdBQVksSUFBSSxDQUFDO1lBQ3pCLGlCQUFZLEdBQVksSUFBSSxDQUFDO1lBZXpDLGlEQUFpRDtZQUNqRCxJQUFJLFlBQVksR0FBRyxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM3QyxJQUFJO2dCQUNBLGlCQUFpQjtnQkFDakIsSUFBSSxHQUFHLEdBQUcsSUFBSSxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3JDLHNCQUFzQjtnQkFDdEIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDO2dCQUNyQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFDbEUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDdEQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7YUFDbkU7WUFDRCxPQUFNLENBQUMsRUFBRTtnQkFDTCxrQ0FBa0M7Z0JBQ2xDLElBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7b0JBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO29CQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLDZEQUE2RCxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDMUY7Z0JBQ0Qsd0NBQXdDO2dCQUN4QyxJQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUNwQixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztvQkFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrRUFBa0UsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQy9GO2dCQUNELGlCQUFpQjtnQkFDakIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7YUFDL0I7UUFDTCxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNLLG1DQUFVLEdBQWxCLFVBQW1CLElBQVk7WUFDM0IsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLFFBQVEsR0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QyxDQUFDO1FBQ0wscUJBQUM7SUFBRCxDQUFDLEFBNURELElBNERDO0lBNURZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUJyTW9kdWxlUGFyc2VyIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9ick1vZHVsZVBhcnNlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgKiBhcyBLYWl0YWlTdHJlYW0gZnJvbSBcIi4uLy4uL2xpYnMvZGF0YXBhcnNpbmcva2FpdGFpLXN0cnVjdC9LYWl0YWlTdHJlYW1cIjtcclxuaW1wb3J0ICogYXMgQnJNb2RTRE0gZnJvbSBcIi4uLy4uL2xpYnMvZGF0YXBhcnNpbmcvQnJNb2RTRE1cIlxyXG5cclxuLyoqXHJcbiAqIFBhcnNlciBmb3IgYnIgbW9kdWxlIFNNRCBmaWxlIHR5cGVzXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIEJyTW9kdWxlUGFyc2VyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQnJNb2R1bGVQYXJzZXIgaW1wbGVtZW50cyBJQnJNb2R1bGVQYXJzZXIge1xyXG5cclxuICAgIHB1YmxpYyByZWFkb25seSBpc05DRGF0YTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgaGFzNlNlY3Rpb25zOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHB1YmxpYyByZWFkb25seSBtVHJjQmluRGF0MDE6IEFycmF5QnVmZmVyO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IG1hcHBNb3Rpb25BckNvbmZpZzogc3RyaW5nO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGFjb3Bvc1BhcklEczogc3RyaW5nO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGFjb3Bvc0VyckluZlR5cGVzOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEJyTW9kdWxlUGFyc2VyLlxyXG4gICAgICogVGhlIHJlY2VpdmVkIGJpbiBkYXRhIGdldCBwYXJzZWQgYW5kIHNhdmVkIGluIHJlYWRvbmx5IHBhcmFtZXRlcnNcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtBcnJheUJ1ZmZlcn0gYmluRGF0YVxyXG4gICAgICogQG1lbWJlcm9mIEJyTW9kdWxlUGFyc2VyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihiaW5EYXRhOiBBcnJheUJ1ZmZlcikge1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgYSBLYWl0YWlTdHJlYW0gYW5kIHBhc3MgdGhlIGJpbmFyeSBkYXRhXHJcbiAgICAgICAgbGV0IGthaXRhaVN0cmVhbSA9IG5ldyBLYWl0YWlTdHJlYW0oYmluRGF0YSk7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gcGFyc2UgdGhlIGRhdGFcclxuICAgICAgICAgICAgbGV0IHRtcCA9IG5ldyBCck1vZFNETShrYWl0YWlTdHJlYW0pO1xyXG4gICAgICAgICAgICAvLyBzZXQgdGhlIHBhcnNlZCBkYXRhXHJcbiAgICAgICAgICAgIHRoaXMubVRyY0JpbkRhdDAxID0gdG1wLm1UcmNCaW5EYXQwMTtcclxuICAgICAgICAgICAgdGhpcy5tYXBwTW90aW9uQXJDb25maWcgPSB0aGlzLnRyaW1TdHJFbmQodG1wLm1hcHBNb3Rpb25BckNvbmZpZyk7XHJcbiAgICAgICAgICAgIHRoaXMuYWNvcG9zUGFySURzID0gdGhpcy50cmltU3RyRW5kKHRtcC5hY29wb3NQYXJJRHMpO1xyXG4gICAgICAgICAgICB0aGlzLmFjb3Bvc0VyckluZlR5cGVzID0gdGhpcy50cmltU3RyRW5kKHRtcC5hY29wb3NFcnJJbmZUeXBlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoKGUpIHtcclxuICAgICAgICAgICAgLy8gSXMgbm90IHRoZSBJRCBvZiBOQy1EYXRhIE1vZHVsZVxyXG4gICAgICAgICAgICBpZihlLmV4cGVjdGVkWzBdID09PSA3MCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc05DRGF0YSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBpbiBCck1vZHVsZVBhcnNlcjogTG9hZGVkIGJpbmFyeSBkYXRhIGlzIG5vIE5DIERhdGEhIFwiICsgZS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgLy8gRG9lcyBub3QgaGF2ZSB0aGUgZXhwZWN0ZWQgNiBzZWN0aW9uc1xyXG4gICAgICAgICAgICBpZihlLmV4cGVjdGVkWzBdID09PSA2KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhczZTZWN0aW9ucyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBpbiBCck1vZHVsZVBhcnNlcjogTG9hZGVkIGJpbmFyeSBkYXRhIGhhcyBub3QgNiBzZWN0aW9ucyEgXCIgKyBlLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFNldCBkYXRhIGVtcHR5XHJcbiAgICAgICAgICAgIHRoaXMubVRyY0JpbkRhdDAxID0gbmV3IEFycmF5QnVmZmVyKDApO1xyXG4gICAgICAgICAgICB0aGlzLm1hcHBNb3Rpb25BckNvbmZpZyA9IFwiXCI7XHJcbiAgICAgICAgICAgIHRoaXMuYWNvcG9zUGFySURzID0gXCJcIjtcclxuICAgICAgICAgICAgdGhpcy5hY29wb3NFcnJJbmZUeXBlcyA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyB0aGUgc3RyaW5nIGJlaGluZCB0aGUgbGFzdCBcIn1cIiBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRhdGFcclxuICAgICAqIEByZXR1cm4geyp9ICB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIEJyTW9kdWxlUGFyc2VyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdHJpbVN0ckVuZChkYXRhOiBzdHJpbmcpIDogc3RyaW5nIHtcclxuICAgICAgICBsZXQgZW5kSW5kZXggPSBkYXRhLmxhc3RJbmRleE9mKFwifVwiKTtcclxuICAgICAgICByZXR1cm4gZGF0YS5zdWJzdHIoMCwgZW5kSW5kZXgrMSk7XHJcbiAgICB9XHJcbn0iXX0=