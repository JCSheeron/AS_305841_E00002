define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Represents a signal recorded by the CoTrace library.
     *
     * @class CoTraceSignal
     * @implements {ICoTraceSignal}
     */
    var CoTraceSignal = /** @class */ (function () {
        /**
         * Creates an instance of CoTraceSignal.
         *
         * @param {string} name
         * @memberof CoTraceSignal
         */
        function CoTraceSignal(name) {
            this.name = name;
            this.samples = new Array();
        }
        return CoTraceSignal;
    }());
    exports.CoTraceSignal = CoTraceSignal;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29UcmFjZVNpZ25hbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3RyYWNlRGF0YUNvbnZlcnNpb24vY2xhc3Nlcy9Db1RyYWNlU2lnbmFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUdBOzs7OztPQUtHO0lBQ0g7UUFLSTs7Ozs7V0FLRztRQUNILHVCQUFZLElBQVk7WUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRSxJQUFJLENBQUM7WUFDaEIsSUFBSSxDQUFDLE9BQU8sR0FBRSxJQUFJLEtBQUssRUFBVyxDQUFDO1FBQ3ZDLENBQUM7UUFFTCxvQkFBQztJQUFELENBQUMsQUFoQkQsSUFnQkM7SUFFUSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDb1RyYWNlU2lnbmFsIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvSUNvVHJhY2VTaWduYWxcIjtcclxuaW1wb3J0IHsgSVNhbXBsZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2ludGVyZmFjZXMvc2FtcGxlSW50ZXJmYWNlXCI7XHJcblxyXG4vKipcclxuICogUmVwcmVzZW50cyBhIHNpZ25hbCByZWNvcmRlZCBieSB0aGUgQ29UcmFjZSBsaWJyYXJ5LlxyXG4gKlxyXG4gKiBAY2xhc3MgQ29UcmFjZVNpZ25hbFxyXG4gKiBAaW1wbGVtZW50cyB7SUNvVHJhY2VTaWduYWx9XHJcbiAqL1xyXG5jbGFzcyBDb1RyYWNlU2lnbmFsIGltcGxlbWVudHMgSUNvVHJhY2VTaWduYWwge1xyXG4gICAgcHVibGljIG5hbWU6IHN0cmluZztcclxuICAgIHB1YmxpYyBzYW1wbGVzOiBBcnJheTxJU2FtcGxlPjtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIENvVHJhY2VTaWduYWwuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEBtZW1iZXJvZiBDb1RyYWNlU2lnbmFsXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMubmFtZT0gbmFtZTtcclxuICAgICAgICB0aGlzLnNhbXBsZXM9IG5ldyBBcnJheTxJU2FtcGxlPigpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IHsgQ29UcmFjZVNpZ25hbCB9OyJdfQ==