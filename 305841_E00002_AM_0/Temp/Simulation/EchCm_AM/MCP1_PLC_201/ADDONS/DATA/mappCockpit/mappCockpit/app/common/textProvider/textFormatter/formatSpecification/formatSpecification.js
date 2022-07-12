define(["require", "exports", "./formatSpecificationType"], function (require, exports, formatSpecificationType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * This class holds the information of the format specification
     *
     * @export
     * @class FormatSpecification
     * @implements {IFormatSpecification}
     */
    var FormatSpecification = /** @class */ (function () {
        //set default values
        function FormatSpecification() {
            this._flags = new Array();
            this._width = 0;
            this._precision = NaN;
            this._type = formatSpecificationType_1.FormatSpecificationTypes.noType;
        }
        Object.defineProperty(FormatSpecification.prototype, "flags", {
            get: function () {
                return this._flags;
            },
            set: function (flags) {
                this._flags = flags;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FormatSpecification.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (width) {
                this._width = width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FormatSpecification.prototype, "precision", {
            get: function () {
                return this._precision;
            },
            set: function (precision) {
                this._precision = precision;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FormatSpecification.prototype, "type", {
            get: function () {
                return this._type;
            },
            set: function (type) {
                this._type = type;
            },
            enumerable: true,
            configurable: true
        });
        return FormatSpecification;
    }());
    exports.FormatSpecification = FormatSpecification;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0U3BlY2lmaWNhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3RleHRQcm92aWRlci90ZXh0Rm9ybWF0dGVyL2Zvcm1hdFNwZWNpZmljYXRpb24vZm9ybWF0U3BlY2lmaWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFJQTs7Ozs7O09BTUc7SUFDSDtRQU1JLG9CQUFvQjtRQUNwQjtZQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQTRCLENBQUM7WUFDcEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7WUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxrREFBd0IsQ0FBQyxNQUFNLENBQUM7UUFDakQsQ0FBQztRQUVELHNCQUFXLHNDQUFLO2lCQUFoQjtnQkFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDdkIsQ0FBQztpQkFFRCxVQUFrQixLQUFzQztnQkFDcEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDeEIsQ0FBQzs7O1dBSkE7UUFNRCxzQkFBVyxzQ0FBSztpQkFBaEI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3ZCLENBQUM7aUJBRUQsVUFBa0IsS0FBYTtnQkFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDeEIsQ0FBQzs7O1dBSkE7UUFNRCxzQkFBVywwQ0FBUztpQkFBcEI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQzNCLENBQUM7aUJBRUQsVUFBc0IsU0FBaUI7Z0JBQ25DLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1lBQ2hDLENBQUM7OztXQUpBO1FBTUQsc0JBQVcscUNBQUk7aUJBQWY7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3RCLENBQUM7aUJBRUQsVUFBaUIsSUFBOEI7Z0JBQzNDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLENBQUM7OztXQUpBO1FBS0wsMEJBQUM7SUFBRCxDQUFDLEFBN0NELElBNkNDO0lBN0NZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElGb3JtYXRTcGVjaWZpY2F0aW9uIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZS9mb3JtYXRTcGVjaWZpY2F0aW9uSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEZvcm1hdFNwZWNpZmljYXRpb25GbGFncyB9IGZyb20gXCIuL2Zvcm1hdFNwZWNpZmljYXRpb25GbGFnXCI7XHJcbmltcG9ydCB7IEZvcm1hdFNwZWNpZmljYXRpb25UeXBlcyB9IGZyb20gXCIuL2Zvcm1hdFNwZWNpZmljYXRpb25UeXBlXCI7XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBob2xkcyB0aGUgaW5mb3JtYXRpb24gb2YgdGhlIGZvcm1hdCBzcGVjaWZpY2F0aW9uXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIEZvcm1hdFNwZWNpZmljYXRpb25cclxuICogQGltcGxlbWVudHMge0lGb3JtYXRTcGVjaWZpY2F0aW9ufVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEZvcm1hdFNwZWNpZmljYXRpb24gaW1wbGVtZW50cyBJRm9ybWF0U3BlY2lmaWNhdGlvbiB7XHJcbiAgICBwcml2YXRlIF9mbGFnczogQXJyYXk8Rm9ybWF0U3BlY2lmaWNhdGlvbkZsYWdzPjtcclxuICAgIHByaXZhdGUgX3dpZHRoOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9wcmVjaXNpb246IG51bWJlcjtcclxuICAgIHByaXZhdGUgX3R5cGU6IEZvcm1hdFNwZWNpZmljYXRpb25UeXBlcztcclxuXHJcbiAgICAvL3NldCBkZWZhdWx0IHZhbHVlc1xyXG4gICAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgICAgIHRoaXMuX2ZsYWdzID0gbmV3IEFycmF5PEZvcm1hdFNwZWNpZmljYXRpb25GbGFncz4oKTtcclxuICAgICAgICB0aGlzLl93aWR0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5fcHJlY2lzaW9uID0gTmFOO1xyXG4gICAgICAgIHRoaXMuX3R5cGUgPSBGb3JtYXRTcGVjaWZpY2F0aW9uVHlwZXMubm9UeXBlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZmxhZ3MgKCkgOiAgQXJyYXk8Rm9ybWF0U3BlY2lmaWNhdGlvbkZsYWdzPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZsYWdzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgZmxhZ3MgKGZsYWdzOiBBcnJheTxGb3JtYXRTcGVjaWZpY2F0aW9uRmxhZ3M+KSB7XHJcbiAgICAgICAgdGhpcy5fZmxhZ3MgPSBmbGFncztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHdpZHRoICgpIDogIG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgd2lkdGggKHdpZHRoOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl93aWR0aCA9IHdpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcHJlY2lzaW9uICgpIDogIG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ByZWNpc2lvbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHByZWNpc2lvbiAocHJlY2lzaW9uOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9wcmVjaXNpb24gPSBwcmVjaXNpb247XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB0eXBlICgpIDogIEZvcm1hdFNwZWNpZmljYXRpb25UeXBlcyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3R5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCB0eXBlICh0eXBlOiBGb3JtYXRTcGVjaWZpY2F0aW9uVHlwZXMpIHtcclxuICAgICAgICB0aGlzLl90eXBlID0gdHlwZTtcclxuICAgIH1cclxufSJdfQ==