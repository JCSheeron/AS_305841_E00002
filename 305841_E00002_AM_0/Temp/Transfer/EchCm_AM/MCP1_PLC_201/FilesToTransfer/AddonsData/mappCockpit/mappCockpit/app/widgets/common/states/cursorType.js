define(["require", "exports", "../../../models/common/series/seriesType"], function (require, exports, seriesType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CursorType;
    (function (CursorType) {
        CursorType[CursorType["timeDomain"] = 0] = "timeDomain";
        CursorType[CursorType["frequencyDomain"] = 1] = "frequencyDomain";
    })(CursorType = exports.CursorType || (exports.CursorType = {}));
    var CursorTypeHelper = /** @class */ (function () {
        function CursorTypeHelper() {
        }
        /**
         * Returns the cursorType for the given series(frequencyDomain for fftSeries, else timeDomain)
         *
         * @private
         * @param {BaseSeries} series
         * @returns {CursorType}
         * @memberof CursorTypeHelper
         */
        CursorTypeHelper.getCursorTypeForSeries = function (series) {
            if (series.type == seriesType_1.SeriesType.fftSeries) {
                return CursorType.frequencyDomain;
            }
            return CursorType.timeDomain;
        };
        return CursorTypeHelper;
    }());
    exports.CursorTypeHelper = CursorTypeHelper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29yVHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb21tb24vc3RhdGVzL2N1cnNvclR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBR0EsSUFBWSxVQUdYO0lBSEQsV0FBWSxVQUFVO1FBQ2xCLHVEQUFVLENBQUE7UUFDVixpRUFBZSxDQUFBO0lBQ25CLENBQUMsRUFIVyxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQUdyQjtJQUVEO1FBQUE7UUFlQSxDQUFDO1FBZEc7Ozs7Ozs7V0FPRztRQUNXLHVDQUFzQixHQUFwQyxVQUFxQyxNQUFrQjtZQUNuRCxJQUFHLE1BQU0sQ0FBQyxJQUFJLElBQUksdUJBQVUsQ0FBQyxTQUFTLEVBQUM7Z0JBQ25DLE9BQU8sVUFBVSxDQUFDLGVBQWUsQ0FBQzthQUNyQztZQUNELE9BQU8sVUFBVSxDQUFDLFVBQVUsQ0FBQztRQUNqQyxDQUFDO1FBQ0wsdUJBQUM7SUFBRCxDQUFDLEFBZkQsSUFlQztJQWZZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NvbW1vbi9zZXJpZXMvYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBTZXJpZXNUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9jb21tb24vc2VyaWVzL3Nlcmllc1R5cGVcIjtcclxuXHJcbmV4cG9ydCBlbnVtIEN1cnNvclR5cGV7XHJcbiAgICB0aW1lRG9tYWluLFxyXG4gICAgZnJlcXVlbmN5RG9tYWluXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDdXJzb3JUeXBlSGVscGVye1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBjdXJzb3JUeXBlIGZvciB0aGUgZ2l2ZW4gc2VyaWVzKGZyZXF1ZW5jeURvbWFpbiBmb3IgZmZ0U2VyaWVzLCBlbHNlIHRpbWVEb21haW4pXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVzXHJcbiAgICAgKiBAcmV0dXJucyB7Q3Vyc29yVHlwZX1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JUeXBlSGVscGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Q3Vyc29yVHlwZUZvclNlcmllcyhzZXJpZXM6IEJhc2VTZXJpZXMpOiBDdXJzb3JUeXBle1xyXG4gICAgICAgIGlmKHNlcmllcy50eXBlID09IFNlcmllc1R5cGUuZmZ0U2VyaWVzKXtcclxuICAgICAgICAgICAgcmV0dXJuIEN1cnNvclR5cGUuZnJlcXVlbmN5RG9tYWluO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gQ3Vyc29yVHlwZS50aW1lRG9tYWluO1xyXG4gICAgfVxyXG59Il19