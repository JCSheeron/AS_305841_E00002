define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TraceStartTrigger = /** @class */ (function () {
        function TraceStartTrigger(condition, dataPointName, threshold, window) {
            this.condition = condition;
            this.dataPointName = dataPointName;
            this.threshold = threshold;
            this.window = window;
        }
        return TraceStartTrigger;
    }());
    exports.TraceStartTrigger = TraceStartTrigger;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VTdGFydFRyaWdnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9kaWFnbm9zdGljcy90cmFjZS90cmFjZVN0YXJ0VHJpZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFDQTtRQU9JLDJCQUFZLFNBQWlCLEVBQUUsYUFBcUIsRUFBRSxTQUFpQixFQUFFLE1BQWM7WUFDbkYsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7WUFDM0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7WUFDbkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7WUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDekIsQ0FBQztRQUNMLHdCQUFDO0lBQUQsQ0FBQyxBQWJELElBYUM7SUFiWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuZXhwb3J0IGNsYXNzIFRyYWNlU3RhcnRUcmlnZ2Vye1xyXG5cclxuICAgIHB1YmxpYyBjb25kaXRpb246IHN0cmluZztcclxuICAgIHB1YmxpYyBkYXRhUG9pbnROYW1lOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgdGhyZXNob2xkOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgd2luZG93OiBzdHJpbmc7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKGNvbmRpdGlvbjogc3RyaW5nLCBkYXRhUG9pbnROYW1lOiBzdHJpbmcsIHRocmVzaG9sZDogc3RyaW5nLCB3aW5kb3c6IHN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5jb25kaXRpb24gPSBjb25kaXRpb247XHJcbiAgICAgICAgdGhpcy5kYXRhUG9pbnROYW1lID0gZGF0YVBvaW50TmFtZTtcclxuICAgICAgICB0aGlzLnRocmVzaG9sZCA9IHRocmVzaG9sZDtcclxuICAgICAgICB0aGlzLndpbmRvdyA9IHdpbmRvdztcclxuICAgIH1cclxufVxyXG4iXX0=