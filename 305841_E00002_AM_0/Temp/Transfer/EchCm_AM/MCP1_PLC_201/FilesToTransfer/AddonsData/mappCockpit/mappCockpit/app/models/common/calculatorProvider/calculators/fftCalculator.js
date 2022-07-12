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
define(["require", "exports", "./fft/fft_bilstein", "../../point", "../calculationDataPoints", "../calculationDataDisplayInfo", "./calculatorBase", "./calculatorHelper", "../../../common/series/seriesType"], function (require, exports, fft_bilstein_1, point_1, calculationDataPoints_1, calculationDataDisplayInfo_1, calculatorBase_1, calculatorHelper_1, seriesType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FftCalculator = /** @class */ (function (_super) {
        __extends(FftCalculator, _super);
        function FftCalculator() {
            var _this = _super.call(this, FftCalculator.id, "FFT", "Calculates the discrete frequency spectrum") || this;
            _this.inputName = "Input signal";
            _this.outputId = "OutputSignal";
            _this.outputName = "Output signal";
            _this.outputValue = "spectral lines";
            return _this;
        }
        FftCalculator.prototype.getDefaultInputData = function () {
            var defaultInputData = _super.prototype.getDefaultInputData.call(this);
            defaultInputData.push(new calculationDataPoints_1.CalculationDataPoints(FftCalculator.inputIdSignal, this.inputName, "", new Array(), "The signal to be transformed into the frequency domain", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            return defaultInputData;
        };
        FftCalculator.prototype.getDefaultOutputData = function () {
            var defaultOutputData = _super.prototype.getDefaultOutputData.call(this);
            var output = new calculationDataPoints_1.CalculationDataPoints(this.outputId, this.outputName, this.outputValue, new Array());
            output.type = seriesType_1.SeriesType.fftSeries;
            defaultOutputData.push(output);
            return defaultOutputData;
        };
        FftCalculator.prototype.verifyCalculationInputData = function () {
            _super.prototype.verifyCalculationInputData.call(this);
            var calculationInputDataContainer = this.getCalculationInputDataContainer();
            var inputSignal = calculationInputDataContainer[0];
            if (inputSignal == undefined || !calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputSignal.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputName]);
            }
        };
        FftCalculator.prototype.executeAlgorithm = function () {
            _super.prototype.executeAlgorithm.call(this);
            var calculationInputDataContainer = this.getCalculationInputDataContainer();
            var result = new Array();
            var inputSignal = calculationInputDataContainer[0];
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputSignal.data)) {
                result = this.clcFft(inputSignal.data);
            }
            this.addCalculationOutputData({
                data: result,
                value: this.outputValue,
                name: this.outputName,
                id: this.outputId
            });
        };
        /**
         * Calculates output data
         *
         * @private
         * @param {Array<IPoint>} inputSignal
         * @returns {Array<IPoint>}
         * @memberof FftCalculator
         */
        FftCalculator.prototype.clcFft = function (inputSignal) {
            // prepare input data for fft transformation
            var real = new Array();
            var imag = new Array();
            for (var i = 0; i < inputSignal.length; i++) {
                real.push(inputSignal[i].y);
                imag.push(0.0); // the imaginary part of the recorded signal is 0.0
            }
            // calculate fft
            fft_bilstein_1.transform(real, imag); // attention: these parameters are both in- and outputs!
            var points = this.getAmplitudeSpectrum(inputSignal, real, imag);
            return points;
        };
        /**
         * Calculates the amplitude spectrum and ignores the phase information
         *
         * @private
         * @param {IPoint[]} inputSignal original time based signal
         * @param {number[]} real real part of the signal in the freqeuncy domain
         * @param {number[]} imag imaginary part of the signal in the freqeuncy domain
         * @returns
         * @memberof FftCalculator
         */
        FftCalculator.prototype.getAmplitudeSpectrum = function (inputSignal, real, imag) {
            var points = new Array(); // prepare return data
            // estimate sample time
            var sampleTime = calculatorHelper_1.CalculatorHelper.estimateSampleTime(inputSignal); // [seconds]
            var numberSamples = inputSignal.length;
            // calculate frequency of spectral lines and combine to new signal      
            var deltaFrequency = 1.0 / (sampleTime * numberSamples); // distance between the spectral lines in [Hz]
            var nrSpectralLines = Math.floor(numberSamples / 2.0 + 1); // the frequency spectrum is mirrored; half of it can be ignored
            for (var i = 0; i < nrSpectralLines; i++) {
                var isZeroFrequency = i == 0; // the frequency is zero, if i is 0;
                var amplitude = this.getSpectralAmplitude(real[i], imag[i], numberSamples, isZeroFrequency);
                var newPoint = new point_1.Point(deltaFrequency * i, amplitude);
                points.push(newPoint);
            }
            return points;
        };
        /**
         * Calculate the amplitude of a single spectral line
         *
         * @private
         * @param {number} real real part of the signal in the freqeuncy domain
         * @param {number} imag imaginary part of the signal in the freqeuncy domain
         * @param {number} numberSamples number of samples of the origianl signal in the time domain
         * @param {number} isZeroFrequency must be set to TRUE if the spectral line with frequency 0.0 is to be calculated
         * @returns {number}
         * @memberof FftCalculator
         */
        FftCalculator.prototype.getSpectralAmplitude = function (real, imag, numberSamples, isZeroFrequency) {
            var amplitude = Math.sqrt(real * real + imag * imag) / numberSamples; // calculate the vector length of the complex number and scale it:  /numberSamples"
            if (!isZeroFrequency) { // everything except the dc part (frequency == 0) must be rescaled
                amplitude = amplitude * 2.0; // *2.0 because the spectral line is mirrored and only one is taken into account
            }
            return amplitude;
        };
        FftCalculator.id = "fft bilstein";
        FftCalculator.inputIdSignal = "InputSignal";
        return FftCalculator;
    }(calculatorBase_1.CalculatorBase));
    exports.FftCalculator = FftCalculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmZ0Q2FsY3VsYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRvcnMvZmZ0Q2FsY3VsYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBVUE7UUFBbUMsaUNBQWM7UUFVN0M7WUFBQSxZQUNJLGtCQUFNLGFBQWEsQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLDRDQUE0QyxDQUFDLFNBQy9FO1lBUk8sZUFBUyxHQUFVLGNBQWMsQ0FBQztZQUVsQyxjQUFRLEdBQVcsY0FBYyxDQUFDO1lBQ2xDLGdCQUFVLEdBQUcsZUFBZSxDQUFDO1lBQzdCLGlCQUFXLEdBQUcsZ0JBQWdCLENBQUM7O1FBSXZDLENBQUM7UUFFTSwyQ0FBbUIsR0FBMUI7WUFDSSxJQUFJLGdCQUFnQixHQUFHLGlCQUFNLG1CQUFtQixXQUFFLENBQUM7WUFFbkQsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksNkNBQXFCLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsRUFBRSxJQUFJLEtBQUssRUFBVSxFQUFFLHdEQUF3RCxFQUFFLElBQUksdURBQTBCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU5TixPQUFPLGdCQUFnQixDQUFDO1FBQzVCLENBQUM7UUFFTSw0Q0FBb0IsR0FBM0I7WUFDSSxJQUFJLGlCQUFpQixHQUFHLGlCQUFNLG9CQUFvQixXQUFFLENBQUM7WUFFckQsSUFBSSxNQUFNLEdBQUcsSUFBSSw2Q0FBcUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLEtBQUssRUFBVSxDQUFDLENBQUM7WUFDOUcsTUFBTSxDQUFDLElBQUksR0FBRyx1QkFBVSxD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IH0gZnJvbSBcIi4vZmZ0L2ZmdF9iaWxzdGVpblwiO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuLi8uLi9wb2ludFwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFQb2ludHMgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhUG9pbnRzXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0b3JCYXNlLCBFcnJvck1lc3NhZ2VUeXBlIH0gZnJvbSBcIi4vY2FsY3VsYXRvckJhc2VcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRvckhlbHBlciB9IGZyb20gXCIuL2NhbGN1bGF0b3JIZWxwZXJcIjtcclxuaW1wb3J0IHsgVENhbGN1bGF0aW9uRGF0YSB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vc2VyaWVzL3Nlcmllc1R5cGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBGZnRDYWxjdWxhdG9yIGV4dGVuZHMgQ2FsY3VsYXRvckJhc2Uge1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgaWQgPSBcImZmdCBiaWxzdGVpblwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBpbnB1dElkU2lnbmFsID0gXCJJbnB1dFNpZ25hbFwiO1xyXG4gICAgcHJpdmF0ZSBpbnB1dE5hbWU6c3RyaW5nID0gXCJJbnB1dCBzaWduYWxcIjtcclxuXHJcbiAgICBwcml2YXRlIG91dHB1dElkOiBzdHJpbmcgPSBcIk91dHB1dFNpZ25hbFwiO1xyXG4gICAgcHJpdmF0ZSBvdXRwdXROYW1lID0gXCJPdXRwdXQgc2lnbmFsXCI7XHJcbiAgICBwcml2YXRlIG91dHB1dFZhbHVlID0gXCJzcGVjdHJhbCBsaW5lc1wiO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihGZnRDYWxjdWxhdG9yLmlkLCBcIkZGVFwiLCBcIkNhbGN1bGF0ZXMgdGhlIGRpc2NyZXRlIGZyZXF1ZW5jeSBzcGVjdHJ1bVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0RGVmYXVsdElucHV0RGF0YSgpOiBBcnJheTxUQ2FsY3VsYXRpb25EYXRhPiB7XHJcbiAgICAgICAgbGV0IGRlZmF1bHRJbnB1dERhdGEgPSBzdXBlci5nZXREZWZhdWx0SW5wdXREYXRhKCk7XHJcblxyXG4gICAgICAgIGRlZmF1bHRJbnB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKEZmdENhbGN1bGF0b3IuaW5wdXRJZFNpZ25hbCwgdGhpcy5pbnB1dE5hbWUsIFwiXCIsIG5ldyBBcnJheTxJUG9pbnQ+KCksIFwiVGhlIHNpZ25hbCB0byBiZSB0cmFuc2Zvcm1lZCBpbnRvIHRoZSBmcmVxdWVuY3kgZG9tYWluXCIsIG5ldyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyhmYWxzZSwgdHJ1ZSkpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRJbnB1dERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldERlZmF1bHRPdXRwdXREYXRhKCk6IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4ge1xyXG4gICAgICAgIGxldCBkZWZhdWx0T3V0cHV0RGF0YSA9IHN1cGVyLmdldERlZmF1bHRPdXRwdXREYXRhKCk7XHJcblxyXG4gICAgICAgIGxldCBvdXRwdXQgPSBuZXcgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKHRoaXMub3V0cHV0SWQsIHRoaXMub3V0cHV0TmFtZSwgdGhpcy5vdXRwdXRWYWx1ZSwgbmV3IEFycmF5PElQb2ludD4oKSk7XHJcbiAgICAgICAgb3V0cHV0LnR5cGUgPSBTZXJpZXNUeXBlLmZmdFNlcmllcztcclxuICAgICAgICBkZWZhdWx0T3V0cHV0RGF0YS5wdXNoKG91dHB1dCk7IFxyXG5cclxuICAgICAgICByZXR1cm4gZGVmYXVsdE91dHB1dERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHZlcmlmeUNhbGN1bGF0aW9uSW5wdXREYXRhKCkge1xyXG4gICAgICAgIHN1cGVyLnZlcmlmeUNhbGN1bGF0aW9uSW5wdXREYXRhKCk7XHJcblxyXG4gICAgICAgIGxldCBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lciA9IHRoaXMuZ2V0Q2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIoKTtcclxuXHJcbiAgICAgICAgbGV0IGlucHV0U2lnbmFsID0gY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXJbMF07XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoaW5wdXRTaWduYWwgPT0gdW5kZWZpbmVkIHx8ICFDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTaWduYWwoaW5wdXRTaWduYWwuZGF0YSkpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLk1pc3NpbmdPckludmFsaWRJbnB1dCwgW3RoaXMuaW5wdXROYW1lXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBleGVjdXRlQWxnb3JpdGhtKCkge1xyXG4gICAgICAgIHN1cGVyLmV4ZWN1dGVBbGdvcml0aG0oKTtcclxuXHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyID0gdGhpcy5nZXRDYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lcigpO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG5cclxuICAgICAgICBsZXQgaW5wdXRTaWduYWwgPSBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclswXTtcclxuXHJcbiAgICAgICAgaWYoQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKGlucHV0U2lnbmFsLmRhdGEpKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuY2xjRmZ0KGlucHV0U2lnbmFsLmRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hZGRDYWxjdWxhdGlvbk91dHB1dERhdGEoe1xyXG4gICAgICAgICAgICBkYXRhOiByZXN1bHQsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLm91dHB1dFZhbHVlLFxyXG4gICAgICAgICAgICBuYW1lOiB0aGlzLm91dHB1dE5hbWUsXHJcbiAgICAgICAgICAgIGlkOiB0aGlzLm91dHB1dElkXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGVzIG91dHB1dCBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50Pn0gaW5wdXRTaWduYWxcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxJUG9pbnQ+fVxyXG4gICAgICogQG1lbWJlcm9mIEZmdENhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjbGNGZnQoaW5wdXRTaWduYWw6IEFycmF5PElQb2ludD4pOiBBcnJheTxJUG9pbnQ+e1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHByZXBhcmUgaW5wdXQgZGF0YSBmb3IgZmZ0IHRyYW5zZm9ybWF0aW9uXHJcbiAgICAgICAgbGV0IHJlYWwgPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xyXG4gICAgICAgIGxldCBpbWFnID0gbmV3IEFycmF5PG51bWJlcj4oKTtcclxuICAgICAgICBmb3IobGV0IGkgPTA7IGkgPCBpbnB1dFNpZ25hbC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIHJlYWwucHVzaChpbnB1dFNpZ25hbFtpXS55KTtcclxuICAgICAgICAgICAgaW1hZy5wdXNoKDAuMCk7IC8vIHRoZSBpbWFnaW5hcnkgcGFydCBvZiB0aGUgcmVjb3JkZWQgc2lnbmFsIGlzIDAuMFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY2FsY3VsYXRlIGZmdFxyXG4gICAgICAgIHRyYW5zZm9ybShyZWFsLCBpbWFnKTsgLy8gYXR0ZW50aW9uOiB0aGVzZSBwYXJhbWV0ZXJzIGFyZSBib3RoIGluLSBhbmQgb3V0cHV0cyFcclxuXHJcbiAgICAgICAgbGV0IHBvaW50cyA9IHRoaXMuZ2V0QW1wbGl0dWRlU3BlY3RydW0oaW5wdXRTaWduYWwsIHJlYWwsIGltYWcpO1xyXG5cclxuICAgICAgICByZXR1cm4gcG9pbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlcyB0aGUgYW1wbGl0dWRlIHNwZWN0cnVtIGFuZCBpZ25vcmVzIHRoZSBwaGFzZSBpbmZvcm1hdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lQb2ludFtdfSBpbnB1dFNpZ25hbCBvcmlnaW5hbCB0aW1lIGJhc2VkIHNpZ25hbFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJbXX0gcmVhbCByZWFsIHBhcnQgb2YgdGhlIHNpZ25hbCBpbiB0aGUgZnJlcWV1bmN5IGRvbWFpblxyXG4gICAgICogQHBhcmFtIHtudW1iZXJbXX0gaW1hZyBpbWFnaW5hcnkgcGFydCBvZiB0aGUgc2lnbmFsIGluIHRoZSBmcmVxZXVuY3kgZG9tYWluXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIEZmdENhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRBbXBsaXR1ZGVTcGVjdHJ1bShpbnB1dFNpZ25hbDogSVBvaW50W10sIHJlYWw6IG51bWJlcltdLCBpbWFnOiBudW1iZXJbXSkgOiBJUG9pbnRbXXtcclxuICAgICAgICBsZXQgcG9pbnRzID0gbmV3IEFycmF5PElQb2ludD4oKTsgLy8gcHJlcGFyZSByZXR1cm4gZGF0YVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGVzdGltYXRlIHNhbXBsZSB0aW1lXHJcbiAgICAgICAgbGV0IHNhbXBsZVRpbWU6IG51bWJlciA9IENhbGN1bGF0b3JIZWxwZXIuZXN0aW1hdGVTYW1wbGVUaW1lKGlucHV0U2lnbmFsKTsgLy8gW3NlY29uZHNdXHJcbiAgICAgICAgbGV0IG51bWJlclNhbXBsZXMgPSBpbnB1dFNpZ25hbC5sZW5ndGg7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gY2FsY3VsYXRlIGZyZXF1ZW5jeSBvZiBzcGVjdHJhbCBsaW5lcyBhbmQgY29tYmluZSB0byBuZXcgc2lnbmFsICAgICAgXHJcbiAgICAgICAgbGV0IGRlbHRhRnJlcXVlbmN5ID0gMS4wIC8gKHNhbXBsZVRpbWUgKiBudW1iZXJTYW1wbGVzKTsgLy8gZGlzdGFuY2UgYmV0d2VlbiB0aGUgc3BlY3RyYWwgbGluZXMgaW4gW0h6XVxyXG4gICAgICAgIGxldCBuclNwZWN0cmFsTGluZXMgPSBNYXRoLmZsb29yKG51bWJlclNhbXBsZXMgLyAyLjAgKyAxKTsgLy8gdGhlIGZyZXF1ZW5jeSBzcGVjdHJ1bSBpcyBtaXJyb3JlZDsgaGFsZiBvZiBpdCBjYW4gYmUgaWdub3JlZFxyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnJTcGVjdHJhbExpbmVzOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGlzWmVyb0ZyZXF1ZW5jeSA9IGk9PTA7IC8vIHRoZSBmcmVxdWVuY3kgaXMgemVybywgaWYgaSBpcyAwO1xyXG4gICAgICAgICAgICBsZXQgYW1wbGl0dWRlOiBudW1iZXIgPSB0aGlzLmdldFNwZWN0cmFsQW1wbGl0dWRlKHJlYWxbaV0sIGltYWdbaV0sIG51bWJlclNhbXBsZXMsIGlzWmVyb0ZyZXF1ZW5jeSk7ICBcclxuICAgICAgICAgICAgbGV0IG5ld1BvaW50ID0gbmV3IFBvaW50KGRlbHRhRnJlcXVlbmN5KmksIGFtcGxpdHVkZSk7XHJcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKG5ld1BvaW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBvaW50cztcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlIHRoZSBhbXBsaXR1ZGUgb2YgYSBzaW5nbGUgc3BlY3RyYWwgbGluZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmVhbCByZWFsIHBhcnQgb2YgdGhlIHNpZ25hbCBpbiB0aGUgZnJlcWV1bmN5IGRvbWFpblxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGltYWcgaW1hZ2luYXJ5IHBhcnQgb2YgdGhlIHNpZ25hbCBpbiB0aGUgZnJlcWV1bmN5IGRvbWFpblxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG51bWJlclNhbXBsZXMgbnVtYmVyIG9mIHNhbXBsZXMgb2YgdGhlIG9yaWdpYW5sIHNpZ25hbCBpbiB0aGUgdGltZSBkb21haW5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpc1plcm9GcmVxdWVuY3kgbXVzdCBiZSBzZXQgdG8gVFJVRSBpZiB0aGUgc3BlY3RyYWwgbGluZSB3aXRoIGZyZXF1ZW5jeSAwLjAgaXMgdG8gYmUgY2FsY3VsYXRlZFxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBGZnRDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0U3BlY3RyYWxBbXBsaXR1ZGUocmVhbDogbnVtYmVyLCBpbWFnOiBudW1iZXIsIG51bWJlclNhbXBsZXM6IG51bWJlciwgaXNaZXJvRnJlcXVlbmN5IDogYm9vbGVhbik6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGFtcGxpdHVkZSA6IG51bWJlciA9IE1hdGguc3FydChyZWFsICogcmVhbCArIGltYWcgKiBpbWFnKSAvIG51bWJlclNhbXBsZXM7IC8vIGNhbGN1bGF0ZSB0aGUgdmVjdG9yIGxlbmd0aCBvZiB0aGUgY29tcGxleCBudW1iZXIgYW5kIHNjYWxlIGl0OiAgL251bWJlclNhbXBsZXNcIlxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKCFpc1plcm9GcmVxdWVuY3kpeyAvLyBldmVyeXRoaW5nIGV4Y2VwdCB0aGUgZGMgcGFydCAoZnJlcXVlbmN5ID09IDApIG11c3QgYmUgcmVzY2FsZWRcclxuICAgICAgICAgICAgYW1wbGl0dWRlID0gYW1wbGl0dWRlKjIuMDsgLy8gKjIuMCBiZWNhdXNlIHRoZSBzcGVjdHJhbCBsaW5lIGlzIG1pcnJvcmVkIGFuZCBvbmx5IG9uZSBpcyB0YWtlbiBpbnRvIGFjY291bnRcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhbXBsaXR1ZGU7IFxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG4iXX0=