define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ImageId;
    (function (ImageId) {
        ImageId[ImageId["defaultImage"] = 0] = "defaultImage";
        ImageId[ImageId["disconnectedImage"] = 1] = "disconnectedImage";
    })(ImageId || (ImageId = {}));
    exports.ImageId = ImageId;
    var BusyInformation = /** @class */ (function () {
        /**
         * Creates an instance of BusyInformation.
         * @param {string} [message=""] a message
         * @param {ImageId} [imageId=ImageId.defaultImage] imageId of the image(e.g. defautl image or disconnected image)
         * @param {number} [imageSize=120] image size of the default image
         * @param {boolean} [rowOrientation=true] if true the image is under the message text else the image is at he right of the message text
         * @memberof BusyInformation
         */
        function BusyInformation(message, imageId, imageSize, rowOrientation) {
            if (message === void 0) { message = ""; }
            if (imageId === void 0) { imageId = ImageId.defaultImage; }
            if (imageSize === void 0) { imageSize = 120; }
            if (rowOrientation === void 0) { rowOrientation = true; }
            this.rowOrientation = true;
            this.message = message;
            this.imageId = imageId;
            this.imageSize = imageSize;
            this.rowOrientation = rowOrientation;
        }
        return BusyInformation;
    }());
    exports.BusyInformation = BusyInformation;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVzeUluZm9ybWF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NvbW1vbi9idXN5SW5mb3JtYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBQUEsSUFBSyxPQUdKO0lBSEQsV0FBSyxPQUFPO1FBQ1IscURBQVksQ0FBQTtRQUNaLCtEQUFpQixDQUFBO0lBQ3JCLENBQUMsRUFISSxPQUFPLEtBQVAsT0FBTyxRQUdYO0lBeUJ3QiwwQkFBTztJQXZCaEM7UUFPSTs7Ozs7OztXQU9HO1FBQ0gseUJBQW1CLE9BQW9CLEVBQUUsT0FBc0MsRUFBRSxTQUFzQixFQUFFLGNBQTZCO1lBQW5ILHdCQUFBLEVBQUEsWUFBb0I7WUFBRSx3QkFBQSxFQUFBLFVBQWtCLE9BQU8sQ0FBQyxZQUFZO1lBQUUsMEJBQUEsRUFBQSxlQUFzQjtZQUFFLCtCQUFBLEVBQUEscUJBQTZCO1lBVnRJLG1CQUFjLEdBQVcsSUFBSSxDQUFDO1lBVzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1lBQzNCLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3pDLENBQUM7UUFDTCxzQkFBQztJQUFELENBQUMsQUFyQkQsSUFxQkM7SUFFTywwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImVudW0gSW1hZ2VJZHtcclxuICAgIGRlZmF1bHRJbWFnZSxcclxuICAgIGRpc2Nvbm5lY3RlZEltYWdlLFxyXG59XHJcblxyXG5jbGFzcyBCdXN5SW5mb3JtYXRpb257XHJcblxyXG4gICAgbWVzc2FnZTogc3RyaW5nO1xyXG4gICAgaW1hZ2VJZDpJbWFnZUlkO1xyXG4gICAgaW1hZ2VTaXplOm51bWJlcjtcclxuICAgIHJvd09yaWVudGF0aW9uOmJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBCdXN5SW5mb3JtYXRpb24uXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW21lc3NhZ2U9XCJcIl0gYSBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0ge0ltYWdlSWR9IFtpbWFnZUlkPUltYWdlSWQuZGVmYXVsdEltYWdlXSBpbWFnZUlkIG9mIHRoZSBpbWFnZShlLmcuIGRlZmF1dGwgaW1hZ2Ugb3IgZGlzY29ubmVjdGVkIGltYWdlKVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtpbWFnZVNpemU9MTIwXSBpbWFnZSBzaXplIG9mIHRoZSBkZWZhdWx0IGltYWdlIFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbcm93T3JpZW50YXRpb249dHJ1ZV0gaWYgdHJ1ZSB0aGUgaW1hZ2UgaXMgdW5kZXIgdGhlIG1lc3NhZ2UgdGV4dCBlbHNlIHRoZSBpbWFnZSBpcyBhdCBoZSByaWdodCBvZiB0aGUgbWVzc2FnZSB0ZXh0XHJcbiAgICAgKiBAbWVtYmVyb2YgQnVzeUluZm9ybWF0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcgPSBcIlwiLCBpbWFnZUlkOkltYWdlSWQgPSBJbWFnZUlkLmRlZmF1bHRJbWFnZSwgaW1hZ2VTaXplOm51bWJlciA9IDEyMCwgcm93T3JpZW50YXRpb246Ym9vbGVhbiA9IHRydWUpe1xyXG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICAgICAgdGhpcy5pbWFnZUlkID0gaW1hZ2VJZDtcclxuICAgICAgICB0aGlzLmltYWdlU2l6ZSA9IGltYWdlU2l6ZTtcclxuICAgICAgICB0aGlzLnJvd09yaWVudGF0aW9uID0gcm93T3JpZW50YXRpb247XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7QnVzeUluZm9ybWF0aW9uLCBJbWFnZUlkfTsiXX0=