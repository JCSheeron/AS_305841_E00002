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
define(["require", "exports", "./baseSeriesPackageAdapter", "../../../common/packageConversion/enum/objectTypeEnum"], function (require, exports, baseSeriesPackageAdapter_1, objectTypeEnum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FFTSeriesPackageAdapter = /** @class */ (function (_super) {
        __extends(FFTSeriesPackageAdapter, _super);
        function FFTSeriesPackageAdapter() {
            var _this = _super.call(this) || this;
            _this.settingsType = "FFTSeries";
            _this.objectType = objectTypeEnum_1.ObjectType.FFTSERIES;
            return _this;
        }
        return FFTSeriesPackageAdapter;
    }(baseSeriesPackageAdapter_1.BaseSeriesPackageAdapter));
    exports.FFTSeriesPackageAdapter = FFTSeriesPackageAdapter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmZ0U2VyaWVzUGFja2FnZUFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jb21tb24vc2VyaWVzL2ZmdFNlcmllc1BhY2thZ2VBZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFHQTtRQUFzQywyQ0FBd0I7UUFFMUQ7WUFBQSxZQUNJLGlCQUFPLFNBR1Y7WUFGRyxLQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztZQUNoQyxLQUFJLENBQUMsVUFBVSxHQUFHLDJCQUFVLENBQUMsU0FBUyxDQUFDOztRQUMzQyxDQUFDO1FBQ0wsOEJBQUM7SUFBRCxDQUFDLEFBUEQsQ0FBc0MsbURBQXdCLEdBTzdEO0lBRVEsMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZVNlcmllc1BhY2thZ2VBZGFwdGVyIH0gZnJvbSBcIi4vYmFzZVNlcmllc1BhY2thZ2VBZGFwdGVyXCI7XHJcbmltcG9ydCB7IE9iamVjdFR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL2VudW0vb2JqZWN0VHlwZUVudW1cIjtcclxuXHJcbmNsYXNzIEZGVFNlcmllc1BhY2thZ2VBZGFwdGVyIGV4dGVuZHMgQmFzZVNlcmllc1BhY2thZ2VBZGFwdGVye1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5nc1R5cGUgPSBcIkZGVFNlcmllc1wiO1xyXG4gICAgICAgIHRoaXMub2JqZWN0VHlwZSA9IE9iamVjdFR5cGUuRkZUU0VSSUVTO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBGRlRTZXJpZXNQYWNrYWdlQWRhcHRlciB9Il19