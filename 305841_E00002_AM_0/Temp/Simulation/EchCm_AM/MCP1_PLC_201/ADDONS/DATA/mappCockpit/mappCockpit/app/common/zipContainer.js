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
define(["require", "exports", "../libs/jszip/JSZip", "../framework/events"], function (require, exports, JSZip, events_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventDataZipped = /** @class */ (function (_super) {
        __extends(EventDataZipped, _super);
        function EventDataZipped() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventDataZipped;
    }(events_1.TypedEvent));
    exports.EventDataZipped = EventDataZipped;
    ;
    var EventDataUnzipped = /** @class */ (function (_super) {
        __extends(EventDataUnzipped, _super);
        function EventDataUnzipped() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventDataUnzipped;
    }(events_1.TypedEvent));
    exports.EventDataUnzipped = EventDataUnzipped;
    ;
    var ZipContainer = /** @class */ (function () {
        /**
         * Creates an instance of ZipContainer
         * @memberof ZipContainer
         */
        function ZipContainer() {
            /**
             * Data zipped event
             *
             * @memberof ZipContainer
             */
            this.eventDataZipped = new EventDataZipped();
            /**
             * Data unzipped event
             *
             * @memberof ZipContainer
             */
            this.eventDataUnzipped = new EventDataZipped();
            this._zipContainer = new JSZip();
        }
        /**
         * Adds a file to the zip container
         *
         * @param {string} filename
         * @param {Blob} data
         * @memberof ZipContainer
         */
        ZipContainer.prototype.addFile = function (filename, data) {
            this._zipContainer.file(filename, data);
        };
        /**
         * Compresses the already added files in the container
         *
         * @memberof ZipContainer
         */
        ZipContainer.prototype.zipData = function () {
            var _this = this;
            //zip.generateNodeStream({type:"blob", compression: "DEFLATE"})
            this._zipContainer.generateAsync({ type: "blob", compression: "DEFLATE" })
                .then(function (zippedData) {
                _this.onDataZipped(zippedData);
            });
        };
        /**
         * Unzippes the data of the given file which is part of the compressed data
         *
         * @param {string} data
         * @param {string} filename
         * @memberof ZipContainer
         */
        ZipContainer.prototype.unzipData = function (data, filename) {
            var _this = this;
            this._zipContainer.loadAsync(data).then(function (zip) {
                zip.file(filename).async("string").then(function (unzippedData) {
                    _this.onDataUnzipped(unzippedData);
                });
            });
        };
        /**
         * Raises the data zipped event
         *
         * @private
         * @param {*} zippedData
         * @memberof ZipContainer
         */
        ZipContainer.prototype.onDataZipped = function (zippedData) {
            this.eventDataZipped.raise(this, zippedData);
        };
        /**
         * Raises the data unzipped event
         *
         * @private
         * @param {*} unzippedData
         * @memberof ZipContainer
         */
        ZipContainer.prototype.onDataUnzipped = function (unzippedData) {
            this.eventDataUnzipped.raise(this, unzippedData);
        };
        return ZipContainer;
    }());
    exports.ZipContainer = ZipContainer;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiemlwQ29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vemlwQ29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFHQTtRQUFxQyxtQ0FBNkI7UUFBbEU7O1FBQW9FLENBQUM7UUFBRCxzQkFBQztJQUFELENBQUMsQUFBckUsQ0FBcUMsbUJBQVUsR0FBc0I7SUFBeEQsMENBQWU7SUFBeUMsQ0FBQztJQUN0RTtRQUF1QyxxQ0FBNkI7UUFBcEU7O1FBQXNFLENBQUM7UUFBRCx3QkFBQztJQUFELENBQUMsQUFBdkUsQ0FBdUMsbUJBQVUsR0FBc0I7SUFBMUQsOENBQWlCO0lBQXlDLENBQUM7SUFFeEU7UUF5Qkk7OztXQUdHO1FBQ0g7WUFsQkE7Ozs7ZUFJRztZQUNJLG9CQUFlLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztZQUUvQzs7OztlQUlHO1lBQ0ksc0JBQWlCLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztZQU83QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7UUFDckMsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLDhCQUFPLEdBQWQsVUFBZSxRQUFnQixFQUFFLElBQVU7WUFDdkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVDLENBQUM7UUFFRDs7OztXQUlHO1FBQ0ksOEJBQU8sR0FBZDtZQUFBLGlCQU1DO1lBTEcsK0RBQStEO1lBQy9ELElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFDLENBQUM7aUJBQ3RFLElBQUksQ0FBQyxVQUFBLFVBQVU7Z0JBQ1osS0FBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNsQyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSSxnQ0FBUyxHQUFoQixVQUFpQixJQUFZLEVBQUUsUUFBZ0I7WUFBL0MsaUJBTUM7WUFMRyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHO2dCQUN2QyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxZQUFZO29CQUM1QyxLQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFBO2dCQUN6QyxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLG1DQUFZLEdBQXBCLFVBQXFCLFVBQWU7WUFDaEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSyxxQ0FBYyxHQUF0QixVQUF1QixZQUFpQjtZQUNwQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNyRCxDQUFDO1FBQ0wsbUJBQUM7SUFBRCxDQUFDLEFBN0ZELElBNkZDO0lBN0ZZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgSlNaaXAgZnJvbSBcIi4uL2xpYnMvanN6aXAvSlNaaXBcIjtcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRXZlbnREYXRhWmlwcGVkIGV4dGVuZHMgVHlwZWRFdmVudDxaaXBDb250YWluZXIsIGFueT57IH07XHJcbmV4cG9ydCBjbGFzcyBFdmVudERhdGFVbnppcHBlZCBleHRlbmRzIFR5cGVkRXZlbnQ8WmlwQ29udGFpbmVyLCBhbnk+eyB9O1xyXG5cclxuZXhwb3J0IGNsYXNzIFppcENvbnRhaW5lcntcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIHRoZSBKU3ppcCBsaWIgY29udGFpbmVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIHtKU1ppcH1cclxuICAgICAqIEBtZW1iZXJvZiBaaXBDb250YWluZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfemlwQ29udGFpbmVyOiBKU1ppcDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERhdGEgemlwcGVkIGV2ZW50XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFppcENvbnRhaW5lclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZXZlbnREYXRhWmlwcGVkID0gbmV3IEV2ZW50RGF0YVppcHBlZCgpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGF0YSB1bnppcHBlZCBldmVudFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBaaXBDb250YWluZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGV2ZW50RGF0YVVuemlwcGVkID0gbmV3IEV2ZW50RGF0YVppcHBlZCgpO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgWmlwQ29udGFpbmVyXHJcbiAgICAgKiBAbWVtYmVyb2YgWmlwQ29udGFpbmVyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5femlwQ29udGFpbmVyID0gbmV3IEpTWmlwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgZmlsZSB0byB0aGUgemlwIGNvbnRhaW5lclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlbmFtZVxyXG4gICAgICogQHBhcmFtIHtCbG9ifSBkYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgWmlwQ29udGFpbmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRGaWxlKGZpbGVuYW1lOiBzdHJpbmcsIGRhdGE6IEJsb2Ipe1xyXG4gICAgICAgIHRoaXMuX3ppcENvbnRhaW5lci5maWxlKGZpbGVuYW1lLCBkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbXByZXNzZXMgdGhlIGFscmVhZHkgYWRkZWQgZmlsZXMgaW4gdGhlIGNvbnRhaW5lclxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBaaXBDb250YWluZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHppcERhdGEoKXtcclxuICAgICAgICAvL3ppcC5nZW5lcmF0ZU5vZGVTdHJlYW0oe3R5cGU6XCJibG9iXCIsIGNvbXByZXNzaW9uOiBcIkRFRkxBVEVcIn0pXHJcbiAgICAgICAgdGhpcy5femlwQ29udGFpbmVyLmdlbmVyYXRlQXN5bmMoe3R5cGU6XCJibG9iXCIsIGNvbXByZXNzaW9uOiBcIkRFRkxBVEVcIn0pXHJcbiAgICAgICAgLnRoZW4oemlwcGVkRGF0YSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25EYXRhWmlwcGVkKHppcHBlZERhdGEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVW56aXBwZXMgdGhlIGRhdGEgb2YgdGhlIGdpdmVuIGZpbGUgd2hpY2ggaXMgcGFydCBvZiB0aGUgY29tcHJlc3NlZCBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRhdGFcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlbmFtZVxyXG4gICAgICogQG1lbWJlcm9mIFppcENvbnRhaW5lclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdW56aXBEYXRhKGRhdGE6IHN0cmluZywgZmlsZW5hbWU6IHN0cmluZyl7IC8vIFRPRE86IGltcGxlbWVudCBtdWx0aWZpbGUgc3VwcG9ydFxyXG4gICAgICAgIHRoaXMuX3ppcENvbnRhaW5lci5sb2FkQXN5bmMoZGF0YSkudGhlbih6aXAgPT4ge1xyXG4gICAgICAgICAgICB6aXAuZmlsZShmaWxlbmFtZSkuYXN5bmMoXCJzdHJpbmdcIikudGhlbih1bnppcHBlZERhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25EYXRhVW56aXBwZWQodW56aXBwZWREYXRhKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJhaXNlcyB0aGUgZGF0YSB6aXBwZWQgZXZlbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSB6aXBwZWREYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgWmlwQ29udGFpbmVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25EYXRhWmlwcGVkKHppcHBlZERhdGE6IGFueSl7XHJcbiAgICAgICAgdGhpcy5ldmVudERhdGFaaXBwZWQucmFpc2UodGhpcywgemlwcGVkRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSYWlzZXMgdGhlIGRhdGEgdW56aXBwZWQgZXZlbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSB1bnppcHBlZERhdGFcclxuICAgICAqIEBtZW1iZXJvZiBaaXBDb250YWluZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkRhdGFVbnppcHBlZCh1bnppcHBlZERhdGE6IGFueSl7XHJcbiAgICAgICAgdGhpcy5ldmVudERhdGFVbnppcHBlZC5yYWlzZSh0aGlzLCB1bnppcHBlZERhdGEpO1xyXG4gICAgfVxyXG59Il19