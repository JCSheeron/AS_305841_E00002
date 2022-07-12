define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartManagerData = /** @class */ (function () {
        function ChartManagerData() {
            this.childs = new Array();
        }
        /**
         *  Adds a chart
         *
         * @param {IChartManagerChart} chart
         * @memberof ChartManagerData
         */
        ChartManagerData.prototype.addChart = function (chart, index) {
            if (index == -1 || index >= this.childs.length) {
                this.childs.push(chart);
            }
            else {
                this.childs.splice(index, 0, chart);
            }
        };
        /**
         *  Removes a chart
         *
         * @param {IChartManagerChart} chart
         * @memberof ChartManagerData
         */
        ChartManagerData.prototype.removeChart = function (chart) {
            var index = this.childs.indexOf(chart, 0);
            if (index > -1) {
                this.childs.splice(index, 1);
            }
        };
        /**
         * Moves a chart
         *
         * @param {IChartManagerChart} chart
         * @param {IChartManagerChart} targetChart
         * @param {string} insertType e.g. "insertAbove" or "insertBelow"
         * @memberof ChartManagerData
         */
        ChartManagerData.prototype.moveChart = function (chart, targetChart, insertType) {
            var _this = this;
            var fromIndex = this.childs.indexOf(chart);
            var toIndex;
            this.childs.forEach(function (chart) {
                if (chart.name == targetChart.name) {
                    toIndex = _this.childs.indexOf(chart);
                }
            });
            if (insertType == "insertAbove") {
            }
            if (insertType == "insertBelow") {
                toIndex += 1;
            }
            // Adjust index if moving downwards
            if (fromIndex < toIndex)
                toIndex--;
            this.arraymove(this.childs, fromIndex, toIndex);
        };
        ChartManagerData.prototype.arraymove = function (arr, fromIndex, toIndex) {
            var element = arr[fromIndex];
            arr.splice(fromIndex, 1);
            arr.splice(toIndex, 0, element);
        };
        return ChartManagerData;
    }());
    exports.ChartManagerData = ChartManagerData;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRNYW5hZ2VyRGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9jaGFydE1hbmFnZXJEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUdBO1FBR0k7WUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksS0FBSyxFQUFzQixDQUFDO1FBQ2xELENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILG1DQUFRLEdBQVIsVUFBUyxLQUF5QixFQUFFLEtBQWE7WUFDN0MsSUFBRyxLQUFLLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFDO2dCQUMzQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMzQjtpQkFDRztnQkFDQSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUMsQ0FBQyxFQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3JDO1FBQ0wsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsc0NBQVcsR0FBWCxVQUFZLEtBQTBCO1lBQ2xDLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM1QyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDWixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDaEM7UUFDTCxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNILG9DQUFTLEdBQVQsVUFBVSxLQUEwQixFQUFFLFdBQWdDLEVBQUUsVUFBa0I7WUFBMUYsaUJBcUJDO1lBbkJHLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdDLElBQUksT0FBTyxDQUFDO1lBQ1osSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO2dCQUNyQixJQUFHLEtBQUssQ0FBQyxJQUFJLElBQUksV0FBVyxDQUFDLElBQUksRUFDakM7b0JBQ0ksT0FBTyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUN4QztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBRyxVQUFVLElBQUksYUFBYSxFQUFDO2FBRTlCO1lBQ0QsSUFBRyxVQUFVLElBQUksYUFBYSxFQUFDO2dCQUMzQixPQUFPLElBQUksQ0FBQyxDQUFDO2FBQ2hCO1lBRUQsbUNBQW1DO1lBQ25DLElBQUcsU0FBUyxHQUFHLE9BQU87Z0JBQ2xCLE9BQU8sRUFBRSxDQUFDO1lBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNwRCxDQUFDO1FBRU8sb0NBQVMsR0FBakIsVUFBa0IsR0FBRyxFQUFFLFNBQVMsRUFBRSxPQUFPO1lBQ3JDLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM3QixHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN6QixHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEMsQ0FBQztRQUVMLHVCQUFDO0lBQUQsQ0FBQyxBQXhFRCxJQXdFQztJQXhFWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ2hhcnRNYW5hZ2VyRGF0YSB9IGZyb20gXCIuL2ludGVyZmFjZXMvY2hhcnRNYW5hZ2VyRGF0YUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJQ2hhcnRNYW5hZ2VyQ2hhcnQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2NoYXJ0TWFuYWdlckNoYXJ0SW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hhcnRNYW5hZ2VyRGF0YSBpbXBsZW1lbnRzIElDaGFydE1hbmFnZXJEYXRhe1xyXG4gICAgY2hpbGRzOiBJQ2hhcnRNYW5hZ2VyQ2hhcnRbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuY2hpbGRzID0gbmV3IEFycmF5PElDaGFydE1hbmFnZXJDaGFydD4oKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiAgQWRkcyBhIGNoYXJ0IFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SUNoYXJ0TWFuYWdlckNoYXJ0fSBjaGFydFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlckRhdGFcclxuICAgICAqL1xyXG4gICAgYWRkQ2hhcnQoY2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCwgaW5kZXg6IG51bWJlcil7XHJcbiAgICAgICAgaWYoaW5kZXggPT0gLTEgfHwgaW5kZXggPj0gIHRoaXMuY2hpbGRzLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIHRoaXMuY2hpbGRzLnB1c2goY2hhcnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmNoaWxkcy5zcGxpY2UoaW5kZXgsMCxjaGFydCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIFJlbW92ZXMgYSBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SUNoYXJ0TWFuYWdlckNoYXJ0fSBjaGFydFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlckRhdGFcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlQ2hhcnQoY2hhcnQgOiBJQ2hhcnRNYW5hZ2VyQ2hhcnQpe1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jaGlsZHMuaW5kZXhPZihjaGFydCwgMCk7XHJcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGlsZHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNb3ZlcyBhIGNoYXJ0IFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SUNoYXJ0TWFuYWdlckNoYXJ0fSBjaGFydFxyXG4gICAgICogQHBhcmFtIHtJQ2hhcnRNYW5hZ2VyQ2hhcnR9IHRhcmdldENoYXJ0XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW5zZXJ0VHlwZSBlLmcuIFwiaW5zZXJ0QWJvdmVcIiBvciBcImluc2VydEJlbG93XCJcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJEYXRhXHJcbiAgICAgKi9cclxuICAgIG1vdmVDaGFydChjaGFydCA6IElDaGFydE1hbmFnZXJDaGFydCwgdGFyZ2V0Q2hhcnQgOiBJQ2hhcnRNYW5hZ2VyQ2hhcnQsIGluc2VydFR5cGU6IHN0cmluZyl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgZnJvbUluZGV4ID0gdGhpcy5jaGlsZHMuaW5kZXhPZihjaGFydCk7XHJcbiAgICAgICAgdmFyIHRvSW5kZXg7XHJcbiAgICAgICAgdGhpcy5jaGlsZHMuZm9yRWFjaChjaGFydCA9PiB7XHJcbiAgICAgICAgICAgIGlmKGNoYXJ0Lm5hbWUgPT0gdGFyZ2V0Q2hhcnQubmFtZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdG9JbmRleCA9IHRoaXMuY2hpbGRzLmluZGV4T2YoY2hhcnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYoaW5zZXJ0VHlwZSA9PSBcImluc2VydEFib3ZlXCIpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpbnNlcnRUeXBlID09IFwiaW5zZXJ0QmVsb3dcIil7XHJcbiAgICAgICAgICAgIHRvSW5kZXggKz0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQWRqdXN0IGluZGV4IGlmIG1vdmluZyBkb3dud2FyZHNcclxuICAgICAgICBpZihmcm9tSW5kZXggPCB0b0luZGV4KVxyXG4gICAgICAgICAgICB0b0luZGV4LS07XHJcbiAgICAgICAgdGhpcy5hcnJheW1vdmUodGhpcy5jaGlsZHMsIGZyb21JbmRleCwgdG9JbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhcnJheW1vdmUoYXJyLCBmcm9tSW5kZXgsIHRvSW5kZXgpIHtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IGFycltmcm9tSW5kZXhdO1xyXG4gICAgICAgIGFyci5zcGxpY2UoZnJvbUluZGV4LCAxKTtcclxuICAgICAgICBhcnIuc3BsaWNlKHRvSW5kZXgsIDAsIGVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxufSJdfQ==