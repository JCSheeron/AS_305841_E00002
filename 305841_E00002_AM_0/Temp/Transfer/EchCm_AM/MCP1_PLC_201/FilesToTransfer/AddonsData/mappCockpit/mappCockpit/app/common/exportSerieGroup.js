define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ExportSerieGroup = /** @class */ (function () {
        /**
         * Creates an instance of ExportSerieGroup.
         * @param {string} name
         * @param {number} startTriggerTime
         * @memberof SerieGroup
         */
        function ExportSerieGroup(name, startTriggerTime, serie) {
            this.series = new Array();
            this.name = name;
            this.startTriggerTime = startTriggerTime;
            this.series.push(serie);
        }
        ExportSerieGroup.prototype.addSerie = function (serie) {
            this.series.push(serie);
        };
        return ExportSerieGroup;
    }());
    exports.ExportSerieGroup = ExportSerieGroup;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0U2VyaWVHcm91cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL2V4cG9ydFNlcmllR3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBRUE7UUFPSTs7Ozs7V0FLRztRQUNILDBCQUFZLElBQVksRUFBRSxnQkFBd0IsRUFBRSxLQUFpQjtZQVByRSxXQUFNLEdBQXNCLElBQUksS0FBSyxFQUFjLENBQUM7WUFRaEQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDakIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO1lBQ3pDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVCLENBQUM7UUFFRCxtQ0FBUSxHQUFSLFVBQVMsS0FBaUI7WUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsQ0FBQztRQUVMLHVCQUFDO0lBQUQsQ0FBQyxBQXZCRCxJQXVCQztJQXZCWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uL21vZGVscy9jb21tb24vc2VyaWVzL2Jhc2VTZXJpZXNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBFeHBvcnRTZXJpZUdyb3VwIHtcclxuICAgIFxyXG4gICAgLy9wcml2YXRlIHJlYWRvbmx5IHN0YXJ0VHJpZ2dlclRpbWU6IG51bWJlcjtcclxuXHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBzdGFydFRyaWdnZXJUaW1lOiBudW1iZXI7XHJcbiAgICBzZXJpZXM6IEFycmF5PEJhc2VTZXJpZXM+ID0gbmV3IEFycmF5PEJhc2VTZXJpZXM+KCk7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgRXhwb3J0U2VyaWVHcm91cC5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3RhcnRUcmlnZ2VyVGltZVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllR3JvdXBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBzdGFydFRyaWdnZXJUaW1lOiBudW1iZXIsIHNlcmllOiBCYXNlU2VyaWVzKXtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuc3RhcnRUcmlnZ2VyVGltZSA9IHN0YXJ0VHJpZ2dlclRpbWU7XHJcbiAgICAgICAgdGhpcy5zZXJpZXMucHVzaChzZXJpZSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkU2VyaWUoc2VyaWU6IEJhc2VTZXJpZXMpe1xyXG4gICAgICAgIHRoaXMuc2VyaWVzLnB1c2goc2VyaWUpO1xyXG4gICAgfVxyXG5cclxufSJdfQ==