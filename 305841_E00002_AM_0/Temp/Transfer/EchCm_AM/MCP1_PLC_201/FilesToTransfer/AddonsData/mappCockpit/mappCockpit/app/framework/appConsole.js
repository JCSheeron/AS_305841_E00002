define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AppConsole = /** @class */ (function () {
        /**
         * Creates an instance of AppConsole.
         * @memberof AppConsole
         */
        function AppConsole() {
            var origConsoleMethods = this.preserveOriginalConsoleMethods();
            // override the standard app console.
            console = this;
            this.enableReleaseConsoleMethods(origConsoleMethods);
        }
        /**
         * Creates an AppConsole instance
         *
         * @static
         * @returns {AppConsole}
         * @memberof AppConsole
         */
        AppConsole.create = function () {
            return new AppConsole();
        };
        /**
         * Preserves the original methods
         *
         * @private
         * @memberof AppConsole
         */
        AppConsole.prototype.preserveOriginalConsoleMethods = function () {
            var origConsoleMethods = {};
            origConsoleMethods["info"] = console.info;
            origConsoleMethods["log"] = console.log;
            origConsoleMethods["warn"] = console.warn;
            origConsoleMethods["error"] = console.error;
            return origConsoleMethods;
        };
        /**
         * Enables console methods for release mode
         *
         * @param {*} origConsoleMethods
         * @returns {*}
         * @memberof AppConsole
         */
        AppConsole.prototype.enableReleaseConsoleMethods = function (origConsoleMethods) {
            console.warn = origConsoleMethods["warn"];
            console.error = origConsoleMethods["error"];
        };
        AppConsole.prototype.countReset = function (label) {
        };
        AppConsole.prototype.info = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
        };
        AppConsole.prototype.log = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
        };
        AppConsole.prototype.warn = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
        };
        AppConsole.prototype.error = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
        };
        AppConsole.prototype.assert = function (condition, message) {
            var data = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                data[_i - 2] = arguments[_i];
            }
        };
        AppConsole.prototype.clear = function () {
        };
        AppConsole.prototype.count = function (label) {
        };
        AppConsole.prototype.debug = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
        };
        AppConsole.prototype.dir = function (value) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
        };
        AppConsole.prototype.dirxml = function (value) {
        };
        AppConsole.prototype.exception = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
        };
        AppConsole.prototype.group = function (groupTitle) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
        };
        AppConsole.prototype.groupCollapsed = function (groupTitle) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
        };
        AppConsole.prototype.groupEnd = function () {
        };
        AppConsole.prototype.markTimeline = function (label) {
        };
        AppConsole.prototype.msIsIndependentlyComposed = function (element) {
            return false;
        };
        AppConsole.prototype.profile = function (reportName) {
        };
        AppConsole.prototype.profileEnd = function () {
        };
        AppConsole.prototype.select = function (element) {
        };
        AppConsole.prototype.table = function () {
            var tabularData = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                tabularData[_i] = arguments[_i];
            }
        };
        AppConsole.prototype.time = function (label) {
        };
        AppConsole.prototype.timeEnd = function (label) {
        };
        AppConsole.prototype.timeLog = function (label) {
            var data = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                data[_i - 1] = arguments[_i];
            }
        };
        AppConsole.prototype.timeStamp = function (label) {
        };
        AppConsole.prototype.timeline = function (label) {
        };
        AppConsole.prototype.timelineEnd = function (label) {
        };
        AppConsole.prototype.trace = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
        };
        return AppConsole;
    }());
    exports.AppConsole = AppConsole;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwQ29uc29sZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcHAvZnJhbWV3b3JrL2FwcENvbnNvbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBQ0E7UUFNSTs7O1dBR0c7UUFDSDtZQUVJLElBQUksa0JBQWtCLEdBQUcsSUFBSSxDQUFDLDhCQUE4QixFQUFFLENBQUM7WUFFL0QscUNBQXFDO1lBQ3JDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFFZixJQUFJLENBQUMsMkJBQTJCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUN6RCxDQUFDO1FBSUQ7Ozs7OztXQU1HO1FBQ0ksaUJBQU0sR0FBYjtZQUNJLE9BQU8sSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUM1QixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSyxtREFBOEIsR0FBdEM7WUFDSSxJQUFJLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztZQUM1QixrQkFBa0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQzFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDeEMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztZQUMxQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQzVDLE9BQU8sa0JBQWtCLENBQUM7UUFDOUIsQ0FBQztRQUtEOzs7Ozs7V0FNRztRQUNILGdEQUEyQixHQUEzQixVQUE0QixrQkFBa0I7WUFDMUMsT0FBTyxDQUFDLElBQUksR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMxQyxPQUFPLENBQUMsS0FBSyxHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hELENBQUM7UUFFRCwrQkFBVSxHQUFWLFVBQVcsS0FBYztRQUV6QixDQUFDO1FBR0QseUJBQUksR0FBSixV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OztRQUU3QyxDQUFDO1FBRUwsaUJBQUM7SUFBRCxDQUFDLEFBL0pELElBK0pDO0lBR08sZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuY2xhc3MgQXBwQ29uc29sZSBpbXBsZW1lbnRzIENvbnNvbGV7XHJcblxyXG5cclxuXHJcbiAgICBtZW1vcnk6IGFueTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQXBwQ29uc29sZS5cclxuICAgICAqIEBtZW1iZXJvZiBBcHBDb25zb2xlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKXtcclxuXHJcbiAgICAgICAgbGV0IG9yaWdDb25zb2xlTWV0aG9kcyA9IHRoaXMucHJlc2VydmVPcmlnaW5hbENvbnNvbGVNZXRob2RzKCk7XHJcblxyXG4gICAgICAgIC8vIG92ZXJyaWRlIHRoZSBzdGFuZGFyZCBhcHAgY29uc29sZS5cclxuICAgICAgICBjb25zb2xlID0gdGhpcztcclxuXHJcbiAgICAgICAgdGhpcy5lbmFibGVSZWxlYXNlQ29uc29sZU1ldGhvZHMob3JpZ0NvbnNvbGVNZXRob2RzKTsgIFxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIEFwcENvbnNvbGUgaW5zdGFuY2VcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcmV0dXJucyB7QXBwQ29uc29sZX1cclxuICAgICAqIEBtZW1iZXJvZiBBcHBDb25zb2xlXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjcmVhdGUoKTogQXBwQ29uc29sZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBBcHBDb25zb2xlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcmVzZXJ2ZXMgdGhlIG9yaWdpbmFsIG1ldGhvZHMgXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBBcHBDb25zb2xlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcHJlc2VydmVPcmlnaW5hbENvbnNvbGVNZXRob2RzKCkge1xyXG4gICAgICAgIGxldCBvcmlnQ29uc29sZU1ldGhvZHMgPSB7fTtcclxuICAgICAgICBvcmlnQ29uc29sZU1ldGhvZHNbXCJpbmZvXCJdID0gY29uc29sZS5pbmZvO1xyXG4gICAgICAgIG9yaWdDb25zb2xlTWV0aG9kc1tcImxvZ1wiXSA9IGNvbnNvbGUubG9nO1xyXG4gICAgICAgIG9yaWdDb25zb2xlTWV0aG9kc1tcIndhcm5cIl0gPSBjb25zb2xlLndhcm47XHJcbiAgICAgICAgb3JpZ0NvbnNvbGVNZXRob2RzW1wiZXJyb3JcIl0gPSBjb25zb2xlLmVycm9yO1xyXG4gICAgICAgIHJldHVybiBvcmlnQ29uc29sZU1ldGhvZHM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRW5hYmxlcyBjb25zb2xlIG1ldGhvZHMgZm9yIHJlbGVhc2UgbW9kZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gb3JpZ0NvbnNvbGVNZXRob2RzXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBBcHBDb25zb2xlXHJcbiAgICAgKi9cclxuICAgIGVuYWJsZVJlbGVhc2VDb25zb2xlTWV0aG9kcyhvcmlnQ29uc29sZU1ldGhvZHMpOiBhbnkge1xyXG4gICAgICAgIGNvbnNvbGUud2FybiA9IG9yaWdDb25zb2xlTWV0aG9kc1tcIndhcm5cIl07XHJcbiAgICAgICAgY29uc29sZS5lcnJvciA9IG9yaWdDb25zb2xlTWV0aG9kc1tcImVycm9yXCJdO1xyXG4gICAgfVxyXG5cclxuICAgIGNvdW50UmVzZXQobGFiZWw/OiBzdHJpbmcpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGluZm8obWVzc2FnZT86IGFueSwgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGxvZyhtZXNzYWdlPzogYW55LCAuLi5vcHRpb25hbFBhcmFtczogYW55W10pOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgd2FybihtZXNzYWdlPzogYW55LCAuLi5vcHRpb25hbFBhcmFtczogYW55W10pOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXJyb3IobWVzc2FnZT86IGFueSwgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGFzc2VydChjb25kaXRpb24/OiBib29sZWFuIHwgdW5kZWZpbmVkLCBtZXNzYWdlPzogc3RyaW5nIHwgdW5kZWZpbmVkLCAuLi5kYXRhOiBhbnlbXSk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBjbGVhcigpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcbiAgICBjb3VudChsYWJlbD86IHN0cmluZyB8IHVuZGVmaW5lZCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuICAgIGRlYnVnKG1lc3NhZ2U/OiBhbnksIC4uLm9wdGlvbmFsUGFyYW1zOiBhbnlbXSk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuICAgIGRpcih2YWx1ZT86IGFueSwgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG4gICAgZGlyeG1sKHZhbHVlOiBhbnkpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhjZXB0aW9uKG1lc3NhZ2U/OiBzdHJpbmcgfCB1bmRlZmluZWQsIC4uLm9wdGlvbmFsUGFyYW1zOiBhbnlbXSk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuICAgIGdyb3VwKGdyb3VwVGl0bGU/OiBzdHJpbmcgfCB1bmRlZmluZWQsIC4uLm9wdGlvbmFsUGFyYW1zOiBhbnlbXSk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuICAgIGdyb3VwQ29sbGFwc2VkKGdyb3VwVGl0bGU/OiBzdHJpbmcgfCB1bmRlZmluZWQsIC4uLm9wdGlvbmFsUGFyYW1zOiBhbnlbXSk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuICAgIGdyb3VwRW5kKCk6IHZvaWQge1xyXG4gICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG1hcmtUaW1lbGluZShsYWJlbD86IHN0cmluZyB8IHVuZGVmaW5lZCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuICAgIG1zSXNJbmRlcGVuZGVudGx5Q29tcG9zZWQoZWxlbWVudDogRWxlbWVudCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHByb2ZpbGUocmVwb3J0TmFtZT86IHN0cmluZyB8IHVuZGVmaW5lZCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuICAgIHByb2ZpbGVFbmQoKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG4gICAgc2VsZWN0KGVsZW1lbnQ6IEVsZW1lbnQpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcbiAgICB0YWJsZSguLi50YWJ1bGFyRGF0YTogYW55W10pOiB2b2lkIHtcclxuICAgXHJcbiAgICB9XHJcbiAgICB0aW1lKGxhYmVsPzogc3RyaW5nIHwgdW5kZWZpbmVkKTogdm9pZCB7XHJcbiAgICBcclxuICAgIH1cclxuICAgIHRpbWVFbmQobGFiZWw/OiBzdHJpbmcgfCB1bmRlZmluZWQpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdGltZUxvZyhsYWJlbD86IHN0cmluZywgLi4uZGF0YTogYW55W10pOiB2b2lke1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHRpbWVTdGFtcChsYWJlbD86IHN0cmluZyB8IHVuZGVmaW5lZCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuICAgIHRpbWVsaW5lKGxhYmVsPzogc3RyaW5nIHwgdW5kZWZpbmVkKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG4gICAgdGltZWxpbmVFbmQobGFiZWw/OiBzdHJpbmcgfCB1bmRlZmluZWQpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcbiAgICB0cmFjZShtZXNzYWdlPzogYW55LCAuLi5vcHRpb25hbFBhcmFtczogYW55W10pOiB2b2lkIHtcclxuIFxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbmV4cG9ydCB7QXBwQ29uc29sZX07Il19