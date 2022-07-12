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
define(["require", "exports", "../../common/componentBase/componentWithoutSettingsBase"], function (require, exports, componentWithoutSettingsBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Image provider to preload some image(the data of the images e.g. <svg ..... />)
     *
     * @export
     * @class ImageProvider
     */
    var ImageProvider = /** @class */ (function (_super) {
        __extends(ImageProvider, _super);
        /**
         * Creates an instance of ImageProvider
         * @memberof ImageProvider
         */
        function ImageProvider() {
            var _this = _super.call(this) || this;
            _this.imageDatas = new Map();
            // Preload images at the initialization 
            // Images for common topics
            _this.loadSvg("../app/widgets/common/style/images/disconnected.svg");
            _this.loadSvg("../app/widgets/common/style/images/busy.svg");
            // Images for tree grids
            _this.loadSvg("../app/widgets/common/style/images/tree/timeSeries.svg");
            _this.loadSvg("../app/widgets/common/style/images/tree/xySeries.svg");
            _this.loadSvg("../app/widgets/common/style/images/tree/fftSeries.svg");
            // Images for signal manager drag drop
            _this.loadSvg("../app/widgets/common/style/images/dragDrop/dropNotPossible.svg");
            _this.loadSvg("../app/widgets/common/style/images/dragDrop/ytSeries.svg");
            _this.loadSvg("../app/widgets/common/style/images/dragDrop/xySeries.svg");
            _this.loadSvg("../app/widgets/common/style/images/dragDrop/fftSeries.svg");
            _this.loadSvg("../app/widgets/common/style/images/dragDrop/addNewScale.svg");
            _this.loadSvg("../app/widgets/common/style/images/dragDrop/assignToScale.svg");
            _this.loadSvg("../app/widgets/common/style/images/dragDrop/addNewXYChart.svg");
            _this.loadSvg("../app/widgets/common/style/images/dragDrop/addNewYTChart.svg");
            _this.loadSvg("../app/widgets/common/style/images/dragDrop/addNewFFTChart.svg");
            _this.loadSvg("../app/widgets/common/style/images/dragDrop/assignToChart.svg");
            _this.loadSvg("../app/widgets/common/style/images/dragDrop/severalYTSeries.svg");
            _this.loadSvg("../app/widgets/common/style/images/dragDrop/severalXYSeries.svg");
            _this.loadSvg("../app/widgets/common/style/images/dragDrop/severalFFTSeries.svg");
            //quick commands
            _this.loadSvg("../app/widgets/methodListWidget/style/images/toolbar/On.svg");
            _this.loadSvg("../app/widgets/methodListWidget/style/images/toolbar/Off.svg");
            _this.loadSvg("../app/widgets/methodListWidget/style/images/toolbar/Stop.svg");
            _this.loadSvg("../app/widgets/methodListWidget/style/images/toolbar/Reset.svg");
            return _this;
        }
        /**
         * gets a singleton instance of ImageProvider
         *
         * @readonly
         * @type {ImageProvider}
         * @memberof ImageProvider
         */
        ImageProvider.getInstance = function () {
            this._instance = this._instance ? this._instance : new ImageProvider();
            return this._instance;
        };
        /**
         * Returns the data of an image for the given path(e.g ../app/widgets/common/style/images/tree/timeSeries.svg) or "" if not defined
         *
         * @param {*} imagePath
         * @returns {string}
         * @memberof ImageProvider
         */
        ImageProvider.prototype.getImage = function (imagePath) {
            if (this.imageDatas.has(imagePath)) {
                var imageData = this.imageDatas.get(imagePath);
                if (imageData == undefined) {
                    return "";
                }
                return imageData;
            }
            return "";
        };
        /**
         * Disposes the image provider
         *
         * @memberof ImageProvider
         */
        ImageProvider.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        /**
         * Starts loading of a svg file from server
         *
         * @private
         * @param {string} svgId
         * @memberof ImageProvider
         */
        ImageProvider.prototype.loadSvg = function (svgPath) {
            var _this = this;
            $.get(svgPath, function (svgData) { _this.onSvgLoaded(svgPath, svgData); });
        };
        /**
         * Called after the svg file have been loaded
         *
         * @private
         * @param {string} svgPath
         * @param {*} svgData
         * @memberof ImageProvider
         */
        ImageProvider.prototype.onSvgLoaded = function (svgPath, svgData) {
            this.imageDatas.set(svgPath, svgData.documentElement.outerHTML);
        };
        return ImageProvider;
    }(componentWithoutSettingsBase_1.ComponentWithoutSettingsBase));
    exports.ImageProvider = ImageProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb21tb24vaW1hZ2VQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBR0E7Ozs7O09BS0c7SUFDSDtRQUFtQyxpQ0FBNEI7UUFxQzNEOzs7V0FHRztRQUNIO1lBQUEsWUFDSSxpQkFBTyxTQWdDVjtZQXJFTyxnQkFBVSxHQUFHLElBQUksR0FBRyxFQUFrQixDQUFDO1lBc0MzQyx3Q0FBd0M7WUFFeEMsMkJBQTJCO1lBQzNCLEtBQUksQ0FBQyxPQUFPLENBQUMscURBQXFELENBQUMsQ0FBQztZQUNwRSxLQUFJLENBQUMsT0FBTyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7WUFFNUQsd0JBQXdCO1lBQ3hCLEtBQUksQ0FBQyxPQUFPLENBQUMsd0RBQXdELENBQUMsQ0FBQztZQUN2RSxLQUFJLENBQUMsT0FBTyxDQUFDLHNEQUFzRCxDQUFDLENBQUM7WUFDckUsS0FBSSxDQUFDLE9BQU8sQ0FBQyx1REFBdUQsQ0FBQyxDQUFDO1lBRXRFLHNDQUFzQztZQUN0QyxLQUFJLENBQUMsT0FBTyxDQUFDLGlFQUFpRSxDQUFDLENBQUM7WUFDaEYsS0FBSSxDQUFDLE9BQU8sQ0FBQywwREFBMEQsQ0FBQyxDQUFDO1lBQ3pFLEtBQUksQ0FBQyxPQUFPLENBQUMsMERBQTBELENBQUMsQ0FBQztZQUN6RSxLQUFJLENBQUMsT0FBTyxDQUFDLDJEQUEyRCxDQUFDLENBQUM7WUFDMUUsS0FBSSxDQUFDLE9BQU8sQ0FBQyw2REFBNkQsQ0FBQyxDQUFDO1lBQzVFLEtBQUksQ0FBQyxPQUFPLENBQUMsK0RBQStELENBQUMsQ0FBQztZQUM5RSxLQUFJLENBQUMsT0FBTyxDQUFDLCtEQUErRCxDQUFDLENBQUM7WUFDOUUsS0FBSSxDQUFDLE9BQU8sQ0FBQywrREFBK0QsQ0FBQyxDQUFDO1lBQzlFLEtBQUksQ0FBQyxPQUFPLENBQUMsZ0VBQWdFLENBQUMsQ0FBQztZQUMvRSxLQUFJLENBQUMsT0FBTyxDQUFDLCtEQUErRCxDQUFDLENBQUM7WUFDOUUsS0FBSSxDQUFDLE9BQU8sQ0FBQyxpRUFBaUUsQ0FBQyxDQUFDO1lBQ2hGLEtBQUksQ0FBQyxPQUFPLENBQUMsaUVBQWlFLENBQUMsQ0FBQztZQUNoRixLQUFJLENBQUMsT0FBTyxDQUFDLGtFQUFrRSxDQUFDLENBQUM7WUFFakYsZ0JBQWdCO1lBQ2hCLEtBQUksQ0FBQyxPQUFPLENBQUMsNkRBQTZELENBQUMsQ0FBQztZQUM1RSxLQUFJLENBQUMsT0FBTyxDQUFDLDhEQUE4RCxDQUFDLENBQUM7WUFDN0UsS0FBSSxDQUFDLE9BQU8sQ0FBQywrREFBK0QsQ0FBQyxDQUFDO1lBQzlFLEtBQUksQ0FBQyxPQUFPLENBQUMsZ0VBQWdFLENBQUMsQ0FBQzs7UUFDbkYsQ0FBQztRQW5FRDs7Ozs7O1dBTUc7UUFDVyx5QkFBVyxHQUF6QjtZQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxhQUFhLEVBQUUsQ0FBQztZQUN2RSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLGdDQUFRLEdBQWYsVUFBZ0IsU0FBUztZQUNyQixJQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFDO2dCQUM5QixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDL0MsSUFBRyxTQUFTLElBQUksU0FBUyxFQUFDO29CQUN0QixPQUFPLEVBQUUsQ0FBQztpQkFDYjtnQkFDRCxPQUFPLFNBQVMsQ0FBQzthQUNwQjtZQUNELE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQztRQXlDRDs7OztXQUlHO1FBQ0gsK0JBQU8sR0FBUDtZQUNJLGlCQUFNLE9BQU8sV0FBRSxDQUFDO1FBQ3BCLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSywrQkFBTyxHQUFmLFVBQWdCLE9BQWU7WUFBL0IsaUJBRUM7WUFERyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxVQUFDLE9BQU8sSUFBTyxLQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ssbUNBQVcsR0FBbkIsVUFBb0IsT0FBZSxFQUFFLE9BQVk7WUFDN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDbkUsQ0FBQztRQUNMLG9CQUFDO0lBQUQsQ0FBQyxBQTNHRCxDQUFtQywyREFBNEIsR0EyRzlEO0lBM0dZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50V2l0aG91dFNldHRpbmdzQmFzZSB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRXaXRob3V0U2V0dGluZ3NCYXNlXCI7XHJcbmltcG9ydCB7IElJbWFnZVByb3ZpZGVyIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9pbWFnZVByb3ZpZGVySW50ZXJmYWNlXCI7XHJcblxyXG4vKipcclxuICogSW1hZ2UgcHJvdmlkZXIgdG8gcHJlbG9hZCBzb21lIGltYWdlKHRoZSBkYXRhIG9mIHRoZSBpbWFnZXMgZS5nLiA8c3ZnIC4uLi4uIC8+KVxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBJbWFnZVByb3ZpZGVyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgSW1hZ2VQcm92aWRlciBleHRlbmRzIENvbXBvbmVudFdpdGhvdXRTZXR0aW5nc0Jhc2UgaW1wbGVtZW50cyBJSW1hZ2VQcm92aWRlcntcclxuICAgIFxyXG4gICAgLy8gaG9sZHMgYW4gaW5zdGFuY2Ugb2YgdGhpcyBjbGFzc1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBJbWFnZVByb3ZpZGVyO1xyXG5cclxuICAgIHByaXZhdGUgaW1hZ2VEYXRhcyA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXRzIGEgc2luZ2xldG9uIGluc3RhbmNlIG9mIEltYWdlUHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtJbWFnZVByb3ZpZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIEltYWdlUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBJbWFnZVByb3ZpZGVyIHtcclxuICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IHRoaXMuX2luc3RhbmNlID8gdGhpcy5faW5zdGFuY2UgOiBuZXcgSW1hZ2VQcm92aWRlcigpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRhdGEgb2YgYW4gaW1hZ2UgZm9yIHRoZSBnaXZlbiBwYXRoKGUuZyAuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL3RyZWUvdGltZVNlcmllcy5zdmcpIG9yIFwiXCIgaWYgbm90IGRlZmluZWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGltYWdlUGF0aFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBJbWFnZVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRJbWFnZShpbWFnZVBhdGgpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYodGhpcy5pbWFnZURhdGFzLmhhcyhpbWFnZVBhdGgpKXtcclxuICAgICAgICAgICAgbGV0IGltYWdlRGF0YSA9IHRoaXMuaW1hZ2VEYXRhcy5nZXQoaW1hZ2VQYXRoKTtcclxuICAgICAgICAgICAgaWYoaW1hZ2VEYXRhID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gaW1hZ2VEYXRhO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgSW1hZ2VQcm92aWRlclxyXG4gICAgICogQG1lbWJlcm9mIEltYWdlUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgLy8gUHJlbG9hZCBpbWFnZXMgYXQgdGhlIGluaXRpYWxpemF0aW9uIFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEltYWdlcyBmb3IgY29tbW9uIHRvcGljc1xyXG4gICAgICAgIHRoaXMubG9hZFN2ZyhcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZGlzY29ubmVjdGVkLnN2Z1wiKTtcclxuICAgICAgICB0aGlzLmxvYWRTdmcoXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2J1c3kuc3ZnXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEltYWdlcyBmb3IgdHJlZSBncmlkc1xyXG4gICAgICAgIHRoaXMubG9hZFN2ZyhcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvdHJlZS90aW1lU2VyaWVzLnN2Z1wiKTtcclxuICAgICAgICB0aGlzLmxvYWRTdmcoXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL3RyZWUveHlTZXJpZXMuc3ZnXCIpO1xyXG4gICAgICAgIHRoaXMubG9hZFN2ZyhcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvdHJlZS9mZnRTZXJpZXMuc3ZnXCIpO1xyXG5cclxuICAgICAgICAvLyBJbWFnZXMgZm9yIHNpZ25hbCBtYW5hZ2VyIGRyYWcgZHJvcFxyXG4gICAgICAgIHRoaXMubG9hZFN2ZyhcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3AvZHJvcE5vdFBvc3NpYmxlLnN2Z1wiKTtcclxuICAgICAgICB0aGlzLmxvYWRTdmcoXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2RyYWdEcm9wL3l0U2VyaWVzLnN2Z1wiKTtcclxuICAgICAgICB0aGlzLmxvYWRTdmcoXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2RyYWdEcm9wL3h5U2VyaWVzLnN2Z1wiKTtcclxuICAgICAgICB0aGlzLmxvYWRTdmcoXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2RyYWdEcm9wL2ZmdFNlcmllcy5zdmdcIik7XHJcbiAgICAgICAgdGhpcy5sb2FkU3ZnKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9hZGROZXdTY2FsZS5zdmdcIik7XHJcbiAgICAgICAgdGhpcy5sb2FkU3ZnKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9hc3NpZ25Ub1NjYWxlLnN2Z1wiKTtcclxuICAgICAgICB0aGlzLmxvYWRTdmcoXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2RyYWdEcm9wL2FkZE5ld1hZQ2hhcnQuc3ZnXCIpO1xyXG4gICAgICAgIHRoaXMubG9hZFN2ZyhcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3AvYWRkTmV3WVRDaGFydC5zdmdcIik7XHJcbiAgICAgICAgdGhpcy5sb2FkU3ZnKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9hZGROZXdGRlRDaGFydC5zdmdcIik7XHJcbiAgICAgICAgdGhpcy5sb2FkU3ZnKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9hc3NpZ25Ub0NoYXJ0LnN2Z1wiKTtcclxuICAgICAgICB0aGlzLmxvYWRTdmcoXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2RyYWdEcm9wL3NldmVyYWxZVFNlcmllcy5zdmdcIik7XHJcbiAgICAgICAgdGhpcy5sb2FkU3ZnKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9zZXZlcmFsWFlTZXJpZXMuc3ZnXCIpO1xyXG4gICAgICAgIHRoaXMubG9hZFN2ZyhcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3Avc2V2ZXJhbEZGVFNlcmllcy5zdmdcIik7XHJcblxyXG4gICAgICAgIC8vcXVpY2sgY29tbWFuZHNcclxuICAgICAgICB0aGlzLmxvYWRTdmcoXCIuLi9hcHAvd2lkZ2V0cy9tZXRob2RMaXN0V2lkZ2V0L3N0eWxlL2ltYWdlcy90b29sYmFyL09uLnN2Z1wiKTtcclxuICAgICAgICB0aGlzLmxvYWRTdmcoXCIuLi9hcHAvd2lkZ2V0cy9tZXRob2RMaXN0V2lkZ2V0L3N0eWxlL2ltYWdlcy90b29sYmFyL09mZi5zdmdcIik7XHJcbiAgICAgICAgdGhpcy5sb2FkU3ZnKFwiLi4vYXBwL3dpZGdldHMvbWV0aG9kTGlzdFdpZGdldC9zdHlsZS9pbWFnZXMvdG9vbGJhci9TdG9wLnN2Z1wiKTtcclxuICAgICAgICB0aGlzLmxvYWRTdmcoXCIuLi9hcHAvd2lkZ2V0cy9tZXRob2RMaXN0V2lkZ2V0L3N0eWxlL2ltYWdlcy90b29sYmFyL1Jlc2V0LnN2Z1wiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2VzIHRoZSBpbWFnZSBwcm92aWRlclxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBJbWFnZVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGRpc3Bvc2UoKXtcclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGFydHMgbG9hZGluZyBvZiBhIHN2ZyBmaWxlIGZyb20gc2VydmVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdmdJZFxyXG4gICAgICogQG1lbWJlcm9mIEltYWdlUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBsb2FkU3ZnKHN2Z1BhdGg6IHN0cmluZyl7XHJcbiAgICAgICAgJC5nZXQoc3ZnUGF0aCwgKHN2Z0RhdGEpID0+IHsgdGhpcy5vblN2Z0xvYWRlZChzdmdQYXRoLCBzdmdEYXRhKTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgYWZ0ZXIgdGhlIHN2ZyBmaWxlIGhhdmUgYmVlbiBsb2FkZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN2Z1BhdGhcclxuICAgICAqIEBwYXJhbSB7Kn0gc3ZnRGF0YVxyXG4gICAgICogQG1lbWJlcm9mIEltYWdlUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblN2Z0xvYWRlZChzdmdQYXRoOiBzdHJpbmcsIHN2Z0RhdGE6IGFueSkge1xyXG4gICAgICAgIHRoaXMuaW1hZ2VEYXRhcy5zZXQoc3ZnUGF0aCwgc3ZnRGF0YS5kb2N1bWVudEVsZW1lbnQub3V0ZXJIVE1MKVxyXG4gICAgfVxyXG59Il19