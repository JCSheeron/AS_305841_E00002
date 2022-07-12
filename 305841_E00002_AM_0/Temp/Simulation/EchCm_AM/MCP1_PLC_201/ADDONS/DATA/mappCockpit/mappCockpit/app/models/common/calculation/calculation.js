define(["require", "exports", "../calculatorProvider/calculatorProvider", "../calculatorProvider/calculationDataPoints"], function (require, exports, calculatorProvider_1, calculationDataPoints_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Calculation = /** @class */ (function () {
        function Calculation(calculatorId) {
            this.setCalculatorType(calculatorId);
        }
        Calculation.prototype.setCalculatorType = function (calculatorId) {
            this.calculator = calculatorProvider_1.CalculatorProvider.getInstance().getCalculator(calculatorId);
            if (this.calculator == undefined) {
                this.inputData = new Array();
                this.outputData = new Array();
            }
            else {
                this.inputData = this.calculator.getDefaultInputData();
                this.outputData = this.calculator.getDefaultOutputData();
            }
        };
        Calculation.prototype.calculate = function () {
            if (this.calculator != undefined) {
                // Start calculation with current input data
                var results = this.calculator.calculate(this.inputData);
                for (var i = 0; i < results.length; i++) {
                    // Set output data
                    if (results[i] instanceof calculationDataPoints_1.CalculationDataPoints && this.outputData[i] instanceof calculationDataPoints_1.CalculationDataPoints) {
                        this.outputData[i].setData(results[i].getData());
                    }
                    else {
                        console.error("New calculation output data available. New implementation needed! Only DataPoints supported currently.");
                    }
                }
            }
        };
        return Calculation;
    }());
    exports.Calculation = Calculation;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jb21tb24vY2FsY3VsYXRpb24vY2FsY3VsYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBTUE7UUFPSSxxQkFBWSxZQUFvQjtZQUM1QixJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDekMsQ0FBQztRQUVELHVDQUFpQixHQUFqQixVQUFrQixZQUFvQjtZQUNsQyxJQUFJLENBQUMsVUFBVSxHQUFHLHVDQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMvRSxJQUFHLElBQUksQ0FBQyxVQUFVLElBQUksU0FBUyxFQUFDO2dCQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksS0FBSyxFQUFvQixDQUFDO2dCQUMvQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksS0FBSyxFQUFvQixDQUFDO2FBQ25EO2lCQUNHO2dCQUNBLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2dCQUN2RCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsb0JBQW9CLEVBQUUsQ0FBQzthQUM1RDtRQUNMLENBQUM7UUFFRCwrQkFBUyxHQUFUO1lBQ0ksSUFBRyxJQUFJLENBQUMsVUFBVSxJQUFJLFNBQVMsRUFBQztnQkFDNUIsNENBQTRDO2dCQUM1QyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3hELEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO29CQUNuQyxrQkFBa0I7b0JBQ2xCLElBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxZQUFZLDZDQUFxQixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFlBQVksNkNBQXFCLEVBQUM7d0JBQ2pHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUEyQixDQUFDLE9BQU8sQ0FBRSxPQUFPLENBQUMsQ0FBQyxDQUEyQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7cUJBQzFHO3lCQUNHO3dCQUNBLE9BQU8sQ0FBQyxLQUFLLENBQUMsd0dBQXdHLENBQUMsQ0FBQTtxQkFDMUg7aUJBQ0o7YUFDSjtRQUNMLENBQUM7UUFDTCxrQkFBQztJQUFELENBQUMsQUF0Q0QsSUFzQ0M7SUF0Q1ksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ2FsY3VsYXRpb24gfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9jYWxjdWxhdGlvbkludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJQ2FsY3VsYXRvciB9IGZyb20gXCIuLi9jYWxjdWxhdG9yUHJvdmlkZXIvaW50ZXJmYWNlcy9jYWxjdWxhdG9ySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0b3JQcm92aWRlciB9IGZyb20gXCIuLi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRvclByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YVBvaW50cyB9IGZyb20gXCIuLi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRpb25EYXRhUG9pbnRzXCI7XHJcbmltcG9ydCB7IFRDYWxjdWxhdGlvbkRhdGEgfSBmcm9tIFwiLi4vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0aW9uRGF0YVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENhbGN1bGF0aW9uIGltcGxlbWVudHMgSUNhbGN1bGF0aW9ue1xyXG5cclxuICAgIGNhbGN1bGF0b3I6IElDYWxjdWxhdG9yfHVuZGVmaW5lZDtcclxuXHJcbiAgICBpbnB1dERhdGEhOiBBcnJheTxUQ2FsY3VsYXRpb25EYXRhPjtcclxuICAgIG91dHB1dERhdGEhOiBBcnJheTxUQ2FsY3VsYXRpb25EYXRhPjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjYWxjdWxhdG9ySWQ6IHN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5zZXRDYWxjdWxhdG9yVHlwZShjYWxjdWxhdG9ySWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldENhbGN1bGF0b3JUeXBlKGNhbGN1bGF0b3JJZDogc3RyaW5nKXtcclxuICAgICAgICB0aGlzLmNhbGN1bGF0b3IgPSBDYWxjdWxhdG9yUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRDYWxjdWxhdG9yKGNhbGN1bGF0b3JJZCk7XHJcbiAgICAgICAgaWYodGhpcy5jYWxjdWxhdG9yID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXREYXRhID0gbmV3IEFycmF5PFRDYWxjdWxhdGlvbkRhdGE+KCk7XHJcbiAgICAgICAgICAgIHRoaXMub3V0cHV0RGF0YSA9IG5ldyBBcnJheTxUQ2FsY3VsYXRpb25EYXRhPigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0RGF0YSA9IHRoaXMuY2FsY3VsYXRvci5nZXREZWZhdWx0SW5wdXREYXRhKCk7XHJcbiAgICAgICAgICAgIHRoaXMub3V0cHV0RGF0YSA9IHRoaXMuY2FsY3VsYXRvci5nZXREZWZhdWx0T3V0cHV0RGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjYWxjdWxhdGUoKSB7XHJcbiAgICAgICAgaWYodGhpcy5jYWxjdWxhdG9yICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIFN0YXJ0IGNhbGN1bGF0aW9uIHdpdGggY3VycmVudCBpbnB1dCBkYXRhXHJcbiAgICAgICAgICAgIGxldCByZXN1bHRzID0gdGhpcy5jYWxjdWxhdG9yLmNhbGN1bGF0ZSh0aGlzLmlucHV0RGF0YSk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCByZXN1bHRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIC8vIFNldCBvdXRwdXQgZGF0YVxyXG4gICAgICAgICAgICAgICAgaWYocmVzdWx0c1tpXSBpbnN0YW5jZW9mIENhbGN1bGF0aW9uRGF0YVBvaW50cyAmJiB0aGlzLm91dHB1dERhdGFbaV0gaW5zdGFuY2VvZiBDYWxjdWxhdGlvbkRhdGFQb2ludHMpe1xyXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLm91dHB1dERhdGFbaV0gYXMgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKS5zZXREYXRhKChyZXN1bHRzW2ldIGFzIENhbGN1bGF0aW9uRGF0YVBvaW50cykuZ2V0RGF0YSgpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk5ldyBjYWxjdWxhdGlvbiBvdXRwdXQgZGF0YSBhdmFpbGFibGUuIE5ldyBpbXBsZW1lbnRhdGlvbiBuZWVkZWQhIE9ubHkgRGF0YVBvaW50cyBzdXBwb3J0ZWQgY3VycmVudGx5LlwiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19