define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartLabelFormater = /** @class */ (function () {
        function ChartLabelFormater() {
        }
        ChartLabelFormater.getXAxisLabelText = function (number, context, interval) {
            var numberWithoutExp = this.getTimeWithDecimalDigitsByInterval(number, interval);
            var width = context.measureText(numberWithoutExp).width;
            if (width >= 55) {
                return number.toExponential(3);
            }
            else {
                return numberWithoutExp;
            }
        };
        ChartLabelFormater.getYAxisLabelText = function (number, context, interval) {
            var formatedNumber = number.toFixed(3);
            var width = context.measureText(formatedNumber).width;
            if (width >= 55) {
                //let factor = Math.abs(number)/Math.abs(interval);
                var expText = number.toExponential(3);
                //console.log(factor);
                /*if(factor < 0.9){ // TODO: Also for intervals greater 0.001
                    expText = "0.000";
                }*/
                return expText;
            }
            else {
                if (interval < 0.001) {
                    var factor = Math.abs(number) / Math.abs(interval);
                    var expText = number.toExponential(3);
                    if (factor < 0.9) {
                        expText = "0.000";
                    }
                    return expText;
                }
                else {
                    return formatedNumber;
                }
            }
        };
        ChartLabelFormater.getTimeWithDecimalDigitsByInterval = function (number, interval) {
            var numberWithoutExp = number.toFixed(3);
            if (interval >= 0.010000) {
                if (interval >= 0.100000) {
                    if (interval >= 1.000000) {
                        numberWithoutExp = number.toFixed(0);
                    }
                    else {
                        numberWithoutExp = number.toFixed(1);
                    }
                }
                else {
                    numberWithoutExp = number.toFixed(2);
                }
            }
            return numberWithoutExp;
        };
        return ChartLabelFormater;
    }());
    exports.ChartLabelFormater = ChartLabelFormater;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRMYWJlbEZvcm1hdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0V2lkZ2V0L2hlbHBlcnMvY2hhcnRMYWJlbEZvcm1hdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBO1FBQUE7UUEwREEsQ0FBQztRQXpEVSxvQ0FBaUIsR0FBeEIsVUFBeUIsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRO1lBRTlDLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztZQUVqRixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ3hELElBQUcsS0FBSyxJQUFJLEVBQUUsRUFBQztnQkFDWCxPQUFPLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDbEM7aUJBQ0c7Z0JBQ0EsT0FBTyxnQkFBZ0IsQ0FBQzthQUMzQjtRQUNMLENBQUM7UUFFTSxvQ0FBaUIsR0FBeEIsVUFBeUIsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRO1lBQzlDLElBQUksY0FBYyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDdEQsSUFBRyxLQUFLLElBQUksRUFBRSxFQUFDO2dCQUNYLG1EQUFtRDtnQkFDbkQsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEMsc0JBQXNCO2dCQUN0Qjs7bUJBRUc7Z0JBQ0gsT0FBTyxPQUFPLENBQUM7YUFDbEI7aUJBQ0c7Z0JBQ0EsSUFBRyxRQUFRLEdBQUcsS0FBSyxFQUFDO29CQUNoQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ2pELElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3RDLElBQUcsTUFBTSxHQUFHLEdBQUcsRUFBQzt3QkFDWixPQUFPLEdBQUcsT0FBTyxDQUFDO3FCQUNyQjtvQkFDRCxPQUFPLE9BQU8sQ0FBQztpQkFDbEI7cUJBQ0c7b0JBQ0EsT0FBTyxjQUFjLENBQUM7aUJBQ3pCO2FBQ0o7UUFDTCxDQUFDO1FBRWMscURBQWtDLEdBQWpELFVBQWtELE1BQWMsRUFBRSxRQUFRO1lBQ3RFLElBQUksZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QyxJQUFHLFFBQVEsSUFBSSxRQUFRLEVBQUM7Z0JBQ3BCLElBQUcsUUFBUSxJQUFJLFFBQVEsRUFBQztvQkFDcEIsSUFBRyxRQUFRLElBQUksUUFBUSxFQUFDO3dCQUNwQixnQkFBZ0IsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUN4Qzt5QkFDRzt3QkFDQSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUN4QztpQkFDSjtxQkFDRztvQkFDQSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUN4QzthQUNKO1lBQ0QsT0FBTyxnQkFBZ0IsQ0FBQztRQUM1QixDQUFDO1FBQ0wseUJBQUM7SUFBRCxDQUFDLEFBMURELElBMERDO0lBMURZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBDaGFydExhYmVsRm9ybWF0ZXJ7XHJcbiAgICBzdGF0aWMgZ2V0WEF4aXNMYWJlbFRleHQobnVtYmVyLCBjb250ZXh0LCBpbnRlcnZhbCl7XHJcblxyXG4gICAgICAgIGxldCBudW1iZXJXaXRob3V0RXhwID0gdGhpcy5nZXRUaW1lV2l0aERlY2ltYWxEaWdpdHNCeUludGVydmFsKG51bWJlciwgaW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgbGV0IHdpZHRoID0gY29udGV4dC5tZWFzdXJlVGV4dChudW1iZXJXaXRob3V0RXhwKS53aWR0aDsgIFxyXG4gICAgICAgIGlmKHdpZHRoID49IDU1KXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bWJlci50b0V4cG9uZW50aWFsKDMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gbnVtYmVyV2l0aG91dEV4cDtcclxuICAgICAgICB9XHJcbiAgICB9ICBcclxuXHJcbiAgICBzdGF0aWMgZ2V0WUF4aXNMYWJlbFRleHQobnVtYmVyLCBjb250ZXh0LCBpbnRlcnZhbCl7XHJcbiAgICAgICAgbGV0IGZvcm1hdGVkTnVtYmVyID0gbnVtYmVyLnRvRml4ZWQoMyk7XHJcbiAgICAgICAgbGV0IHdpZHRoID0gY29udGV4dC5tZWFzdXJlVGV4dChmb3JtYXRlZE51bWJlcikud2lkdGg7ICBcclxuICAgICAgICBpZih3aWR0aCA+PSA1NSl7XHJcbiAgICAgICAgICAgIC8vbGV0IGZhY3RvciA9IE1hdGguYWJzKG51bWJlcikvTWF0aC5hYnMoaW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICBsZXQgZXhwVGV4dCA9IG51bWJlci50b0V4cG9uZW50aWFsKDMpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGZhY3Rvcik7XHJcbiAgICAgICAgICAgIC8qaWYoZmFjdG9yIDwgMC45KXsgLy8gVE9ETzogQWxzbyBmb3IgaW50ZXJ2YWxzIGdyZWF0ZXIgMC4wMDFcclxuICAgICAgICAgICAgICAgIGV4cFRleHQgPSBcIjAuMDAwXCI7XHJcbiAgICAgICAgICAgIH0qL1xyXG4gICAgICAgICAgICByZXR1cm4gZXhwVGV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgaWYoaW50ZXJ2YWwgPCAwLjAwMSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgZmFjdG9yID0gTWF0aC5hYnMobnVtYmVyKS9NYXRoLmFicyhpbnRlcnZhbCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZXhwVGV4dCA9IG51bWJlci50b0V4cG9uZW50aWFsKDMpO1xyXG4gICAgICAgICAgICAgICAgaWYoZmFjdG9yIDwgMC45KXtcclxuICAgICAgICAgICAgICAgICAgICBleHBUZXh0ID0gXCIwLjAwMFwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGV4cFRleHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtYXRlZE51bWJlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRUaW1lV2l0aERlY2ltYWxEaWdpdHNCeUludGVydmFsKG51bWJlcjogbnVtYmVyLCBpbnRlcnZhbCk6IHN0cmluZ3tcclxuICAgICAgICBsZXQgbnVtYmVyV2l0aG91dEV4cCA9IG51bWJlci50b0ZpeGVkKDMpO1xyXG4gICAgICAgIGlmKGludGVydmFsID49IDAuMDEwMDAwKXtcclxuICAgICAgICAgICAgaWYoaW50ZXJ2YWwgPj0gMC4xMDAwMDApe1xyXG4gICAgICAgICAgICAgICAgaWYoaW50ZXJ2YWwgPj0gMS4wMDAwMDApe1xyXG4gICAgICAgICAgICAgICAgICAgIG51bWJlcldpdGhvdXRFeHAgPSBudW1iZXIudG9GaXhlZCgwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbnVtYmVyV2l0aG91dEV4cCA9IG51bWJlci50b0ZpeGVkKDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBudW1iZXJXaXRob3V0RXhwID0gbnVtYmVyLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bWJlcldpdGhvdXRFeHA7XHJcbiAgICB9XHJcbn0iXX0=