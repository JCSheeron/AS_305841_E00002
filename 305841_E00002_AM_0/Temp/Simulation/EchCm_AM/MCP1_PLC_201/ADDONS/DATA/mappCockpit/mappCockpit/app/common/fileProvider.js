var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "../framework/events"], function (require, exports, events_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventUploadDataFinished = /** @class */ (function (_super) {
        __extends(EventUploadDataFinished, _super);
        function EventUploadDataFinished() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventUploadDataFinished;
    }(events_1.TypedEvent));
    ;
    var FileProvider = /** @class */ (function () {
        /**
         * Creates an instance of FileProvider
         * @param {boolean} [readBinary=false]
         * @memberof FileProvider
         */
        function FileProvider(readBinary) {
            var _this = this;
            if (readBinary === void 0) { readBinary = false; }
            this.eventUploadDataFinished = new EventUploadDataFinished();
            this._fileInputElement = document.createElement('input');
            document.body.appendChild(this._fileInputElement);
            this._fileInputElement.type = 'file';
            this._fileInputElement.onchange = function (e) {
                // let file = (<any>e!.target!).files[0]; 
                var files = e.target.files;
                var contents = new Map();
                var _loop_1 = function (i) {
                    var file = files[i];
                    // initialize the file reader 
                    reader = new FileReader();
                    // catch the reading finish event
                    reader.onload = function (readerEvent) {
                        var content = readerEvent.target.result; // the content of the file
                        contents.set(file.name, content);
                        if (i === files.length - 1) {
                            _this.onUploadDataFinished(contents);
                            _this._fileInputElement.value = "";
                        }
                    };
                    if (readBinary == true /*&& !file.name.endsWith(FileProvider.DriveLogExportFileExt)*/) {
                        reader.readAsBinaryString(file);
                    }
                    else {
                        reader.readAsText(file, 'UTF-8');
                    }
                };
                var reader;
                for (var i = 0; i < files.length; i++) {
                    _loop_1(i);
                }
                ;
            };
        }
        /**
         * Returns true if the file exists on the server
         *
         * @static
         * @param {*} urlToFile
         * @returns
         * @memberof FileProvider
         */
        FileProvider.doesFileExistOnServer = function (urlToFile) {
            var xhr = new XMLHttpRequest();
            xhr.open('HEAD', urlToFile, false);
            xhr.send();
            if (xhr.status == 404) {
                return false;
            }
            else {
                return true;
            }
        };
        /**
         * downloads data from visualization to the local pc
         *
         * @static
         * @param {string} defaultFileName e.g. "TraceData.csv"
         * @param {Blob} data data that should be written into the file
         * @memberof FileProvider
         */
        FileProvider.downloadData = function (defaultFileName, data) {
            var downloadLink = document.createElement("a");
            var url = URL.createObjectURL(data);
            downloadLink.href = url;
            downloadLink.download = defaultFileName;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        };
        /**
         * Opens the file dialog for file selection to upload data to visualization
         * after selecting and applying a file the eventUploadDataFinished event will be raised
         *
         * @param {string} fileExtensions e.g. ".csv"
         * @param {boolean} [allowMultipleFileSelection=false] flag to enable multiselection
         * @memberof FileProvider
         */
        FileProvider.prototype.uploadData = function (fileExtensions, allowMultipleFileSelection) {
            if (allowMultipleFileSelection === void 0) { allowMultipleFileSelection = false; }
            this._fileInputElement.accept = fileExtensions;
            this._fileInputElement.multiple = allowMultipleFileSelection;
            this._fileInputElement.click();
        };
        FileProvider.prototype.onUploadDataFinished = function (data) {
            this.eventUploadDataFinished.raise(this._fileInputElement, data);
        };
        FileProvider.BrFileExt = ".br";
        FileProvider.DriveLogExportFileExt = ".dle";
        FileProvider.BinFileExt = ".bin";
        return FileProvider;
    }());
    exports.FileProvider = FileProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZVByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vZmlsZVByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFQTtRQUFzQywyQ0FBZ0Q7UUFBdEY7O1FBQXdGLENBQUM7UUFBRCw4QkFBQztJQUFELENBQUMsQUFBekYsQ0FBc0MsbUJBQVUsR0FBeUM7SUFBQSxDQUFDO0lBRTFGO1FBZ0JJOzs7O1dBSUc7UUFDSCxzQkFBWSxVQUEyQjtZQUF2QyxpQkFvQ0M7WUFwQ1csMkJBQUEsRUFBQSxrQkFBMkI7WUFmdkMsNEJBQXVCLEdBQUcsSUFBSSx1QkFBdUIsRUFBRSxDQUFDO1lBZ0JwRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN6RCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztZQUVyQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxHQUFHLFVBQUEsQ0FBQztnQkFFL0IsMENBQTBDO2dCQUMxQyxJQUFJLEtBQUssR0FBc0IsQ0FBRSxDQUFDLE1BQVEsQ0FBQyxLQUFLLENBQUM7Z0JBQ2pELElBQUksUUFBUSxHQUF3QixJQUFJLEdBQUcsRUFBRSxDQUFDO3dDQUV2QyxDQUFDO29CQUVKLElBQUksSUFBSSxHQUFTLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFMUIsOEJBQThCO29CQUMxQixNQUFNLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztvQkFDOUIsaUNBQWlDO29CQUVqQyxNQUFNLENBQUMsTUFBTSxHQUFHLFVBQUEsV0FBVzt3QkFFdkIsSUFBSSxPQUFPLEdBQVMsV0FBWSxDQUFDLE1BQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQywwQkFBMEI7d0JBQzVFLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQzt3QkFDakMsSUFBRyxDQUFDLEtBQUssS0FBSyxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUU7NEJBQ3JCLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQzs0QkFDcEMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7eUJBQ3JDO29CQUNMLENBQUMsQ0FBQztvQkFDRixJQUFHLFVBQVUsSUFBSSxJQUFJLENBQUMsOERBQThELEVBQUM7d0JBQ2pGLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDbkM7eUJBQ0c7d0JBQ0EsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUMsT0FBTyxDQUFDLENBQUM7cUJBQ25DOztvQkFqQkcsTUFBTTtnQkFMZixLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUU7NEJBQTVCLENBQUM7aUJBdUJQO2dCQUFBLENBQUM7WUFDTixDQUFDLENBQUE7UUFDTCxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNJLGtDQUFxQixHQUE1QixVQUE2QixTQUFTO1lBQ2xDLElBQUksR0FBRyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7WUFDL0IsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ25DLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUVYLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLEVBQUU7Z0JBQ25CLE9BQU8sS0FBSyxDQUFDO2FBQ2hCO2lCQUNJO2dCQUNELE9BQU8sSUFBSSxDQUFDO2FBQ2Y7UUFDTCxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNJLHlCQUFZLEdBQW5CLFVBQW9CLGVBQXVCLEVBQUUsSUFBUztZQUVsRCxJQUFJLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRS9DLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEMsWUFBWSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7WUFDeEIsWUFBWSxDQUFDLFFBQVEsR0FBRyxlQUFlLENBQUM7WUFFeEMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDeEMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3JCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzVDLENBQUM7UUFHRDs7Ozs7OztXQU9HO1FBQ0ksaUNBQVUsR0FBakIsVUFBa0IsY0FBc0IsRUFBRSwwQkFBMEM7WUFBMUMsMkNBQUEsRUFBQSxrQ0FBMEM7WUFDaEYsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxjQUFjLENBQUM7WUFDL0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsR0FBRywwQkFBMEIsQ0FBQztZQUM3RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbkMsQ0FBQztRQUVPLDJDQUFvQixHQUE1QixVQUE2QixJQUF5QjtZQUNsRCxJQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRSxDQUFDO1FBcEhzQixzQkFBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixrQ0FBcUIsR0FBRyxNQUFNLENBQUM7UUFDL0IsdUJBQVUsR0FBRyxNQUFNLENBQUM7UUFtSC9DLG1CQUFDO0tBQUEsQUF2SEQsSUF1SEM7SUF2SFksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSBcIi4uL2ZyYW1ld29yay9ldmVudHNcIjtcclxuXHJcbmNsYXNzIEV2ZW50VXBsb2FkRGF0YUZpbmlzaGVkIGV4dGVuZHMgVHlwZWRFdmVudDxIVE1MSW5wdXRFbGVtZW50LCBNYXA8c3RyaW5nLHN0cmluZz4+eyB9O1xyXG5cclxuZXhwb3J0IGNsYXNzIEZpbGVQcm92aWRlciB7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBCckZpbGVFeHQgPSBcIi5iclwiO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBEcml2ZUxvZ0V4cG9ydEZpbGVFeHQgPSBcIi5kbGVcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgQmluRmlsZUV4dCA9IFwiLmJpblwiO1xyXG5cclxuICAgIGV2ZW50VXBsb2FkRGF0YUZpbmlzaGVkID0gbmV3IEV2ZW50VXBsb2FkRGF0YUZpbmlzaGVkKCk7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogSG9sZHMgdGhlIGVsZW1lbnQgbmVlZGVkIGZvciBmaWxlIHVwbG9hZHMoPElOUFVUIC4uLj4pXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBGaWxlUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfZmlsZUlucHV0RWxlbWVudDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgRmlsZVByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtyZWFkQmluYXJ5PWZhbHNlXVxyXG4gICAgICogQG1lbWJlcm9mIEZpbGVQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihyZWFkQmluYXJ5OiBib29sZWFuID0gZmFsc2Upe1xyXG4gICAgICAgIHRoaXMuX2ZpbGVJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5fZmlsZUlucHV0RWxlbWVudCk7XHJcbiAgICAgICAgdGhpcy5fZmlsZUlucHV0RWxlbWVudC50eXBlID0gJ2ZpbGUnO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX2ZpbGVJbnB1dEVsZW1lbnQub25jaGFuZ2UgPSBlID0+IHsgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBsZXQgZmlsZSA9ICg8YW55PmUhLnRhcmdldCEpLmZpbGVzWzBdOyBcclxuICAgICAgICAgICAgbGV0IGZpbGVzOiBBcnJheTxGaWxlPiA9ICg8YW55PmUhLnRhcmdldCEpLmZpbGVzO1xyXG4gICAgICAgICAgICBsZXQgY29udGVudHM6IE1hcDxzdHJpbmcsIHN0cmluZz4gPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBmaWxlOiBGaWxlID0gZmlsZXNbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gaW5pdGlhbGl6ZSB0aGUgZmlsZSByZWFkZXIgXHJcbiAgICAgICAgICAgICAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuICAgICAgICAgICAgICAgIC8vIGNhdGNoIHRoZSByZWFkaW5nIGZpbmlzaCBldmVudFxyXG5cclxuICAgICAgICAgICAgICAgIHJlYWRlci5vbmxvYWQgPSByZWFkZXJFdmVudCA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250ZW50ID0gKDxhbnk+cmVhZGVyRXZlbnQhLnRhcmdldCEpLnJlc3VsdDsgLy8gdGhlIGNvbnRlbnQgb2YgdGhlIGZpbGVcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50cy5zZXQoZmlsZS5uYW1lLCBjb250ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICBpZihpID09PSBmaWxlcy5sZW5ndGgtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVXBsb2FkRGF0YUZpbmlzaGVkKGNvbnRlbnRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmlsZUlucHV0RWxlbWVudC52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGlmKHJlYWRCaW5hcnkgPT0gdHJ1ZSAvKiYmICFmaWxlLm5hbWUuZW5kc1dpdGgoRmlsZVByb3ZpZGVyLkRyaXZlTG9nRXhwb3J0RmlsZUV4dCkqLyl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyLnJlYWRBc0JpbmFyeVN0cmluZyhmaWxlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyLnJlYWRBc1RleHQoZmlsZSwnVVRGLTgnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGZpbGUgZXhpc3RzIG9uIHRoZSBzZXJ2ZXJcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0geyp9IHVybFRvRmlsZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBGaWxlUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGRvZXNGaWxlRXhpc3RPblNlcnZlcih1cmxUb0ZpbGUpe1xyXG4gICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHIub3BlbignSEVBRCcsIHVybFRvRmlsZSwgZmFsc2UpO1xyXG4gICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICBcclxuICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PSA0MDQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZG93bmxvYWRzIGRhdGEgZnJvbSB2aXN1YWxpemF0aW9uIHRvIHRoZSBsb2NhbCBwY1xyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkZWZhdWx0RmlsZU5hbWUgZS5nLiBcIlRyYWNlRGF0YS5jc3ZcIlxyXG4gICAgICogQHBhcmFtIHtCbG9ifSBkYXRhIGRhdGEgdGhhdCBzaG91bGQgYmUgd3JpdHRlbiBpbnRvIHRoZSBmaWxlXHJcbiAgICAgKiBAbWVtYmVyb2YgRmlsZVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBkb3dubG9hZERhdGEoZGVmYXVsdEZpbGVOYW1lOiBzdHJpbmcsIGRhdGE6QmxvYil7XHJcbiAgICBcclxuICAgICAgICB2YXIgZG93bmxvYWRMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIHZhciB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGRhdGEpO1xyXG4gICAgICAgIGRvd25sb2FkTGluay5ocmVmID0gdXJsO1xyXG4gICAgICAgIGRvd25sb2FkTGluay5kb3dubG9hZCA9IGRlZmF1bHRGaWxlTmFtZTtcclxuICAgIFxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZG93bmxvYWRMaW5rKTtcclxuICAgICAgICBkb3dubG9hZExpbmsuY2xpY2soKTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGRvd25sb2FkTGluayk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIE9wZW5zIHRoZSBmaWxlIGRpYWxvZyBmb3IgZmlsZSBzZWxlY3Rpb24gdG8gdXBsb2FkIGRhdGEgdG8gdmlzdWFsaXphdGlvbiBcclxuICAgICAqIGFmdGVyIHNlbGVjdGluZyBhbmQgYXBwbHlpbmcgYSBmaWxlIHRoZSBldmVudFVwbG9hZERhdGFGaW5pc2hlZCBldmVudCB3aWxsIGJlIHJhaXNlZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlRXh0ZW5zaW9ucyBlLmcuIFwiLmNzdlwiXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFthbGxvd011bHRpcGxlRmlsZVNlbGVjdGlvbj1mYWxzZV0gZmxhZyB0byBlbmFibGUgbXVsdGlzZWxlY3Rpb25cclxuICAgICAqIEBtZW1iZXJvZiBGaWxlUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVwbG9hZERhdGEoZmlsZUV4dGVuc2lvbnM6IHN0cmluZywgYWxsb3dNdWx0aXBsZUZpbGVTZWxlY3Rpb246IGJvb2xlYW49IGZhbHNlKXtcclxuICAgICAgICB0aGlzLl9maWxlSW5wdXRFbGVtZW50LmFjY2VwdCA9IGZpbGVFeHRlbnNpb25zOyBcclxuICAgICAgICB0aGlzLl9maWxlSW5wdXRFbGVtZW50Lm11bHRpcGxlID0gYWxsb3dNdWx0aXBsZUZpbGVTZWxlY3Rpb247XHJcbiAgICAgICAgdGhpcy5fZmlsZUlucHV0RWxlbWVudC5jbGljaygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25VcGxvYWREYXRhRmluaXNoZWQoZGF0YTogTWFwPHN0cmluZywgc3RyaW5nPikge1xyXG4gICAgICAgIHRoaXMuZXZlbnRVcGxvYWREYXRhRmluaXNoZWQucmFpc2UodGhpcy5fZmlsZUlucHV0RWxlbWVudCwgZGF0YSk7XHJcbiAgICB9XHJcbn0iXX0=