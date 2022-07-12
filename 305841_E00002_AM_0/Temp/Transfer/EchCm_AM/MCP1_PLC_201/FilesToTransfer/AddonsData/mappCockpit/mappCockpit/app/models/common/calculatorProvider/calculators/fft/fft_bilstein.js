/*
 * Free FFT and convolution (TypeScript)
 *
 * Copyright (c) 2020 Project Nayuki. (MIT License)
 * https://www.nayuki.io/page/free-small-fft-in-multiple-languages
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * - The above copyright notice and this permission notice shall be included in
 *   all copies or substantial portions of the Software.
 * - The Software is provided "as is", without warranty of any kind, express or
 *   implied, including but not limited to the warranties of merchantability,
 *   fitness for a particular purpose and noninfringement. In no event shall the
 *   authors or copyright holders be liable for any claim, damages or other
 *   liability, whether in an action of contract, tort or otherwise, arising from,
 *   out of or in connection with the Software or the use or other dealings in the
 *   Software.
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
     * Computes the discrete Fourier transform (DFT) of the given complex vector, storing the result back into the vector.
     * The vector can have any length. This is a wrapper function.
     */
    function transform(real, imag) {
        var n = real.length;
        if (n != imag.length)
            throw "Mismatched lengths";
        if (n == 0)
            return;
        else if ((n & (n - 1)) == 0) // Is power of 2
            transformRadix2(real, imag);
        else // More complicated algorithm for arbitrary sizes
            transformBluestein(real, imag);
    }
    exports.transform = transform;
    /*
     * Computes the inverse discrete Fourier transform (IDFT) of the given complex vector, storing the result back into the vector.
     * The vector can have any length. This is a wrapper function. This transform does not perform scaling, so the inverse is not a true inverse.
     */
    function inverseTransform(real, imag) {
        transform(imag, real);
    }
    /*
     * Computes the discrete Fourier transform (DFT) of the given complex vector, storing the result back into the vector.
     * The vector's length must be a power of 2. Uses the Cooley-Tukey decimation-in-time radix-2 algorithm.
     */
    function transformRadix2(real, imag) {
        // Length variables
        var n = real.length;
        if (n != imag.length)
            throw "Mismatched lengths";
        if (n == 1) // Trivial transform
            return;
        var levels = -1;
        for (var i = 0; i < 32; i++) {
            if (1 << i == n)
                levels = i; // Equal to log2(n)
        }
        if (levels == -1)
            throw "Length is not a power of 2";
        // Trigonometric tables
        var cosTable = new Array(n / 2);
        var sinTable = new Array(n / 2);
        for (var i = 0; i < n / 2; i++) {
            cosTable[i] = Math.cos(2 * Math.PI * i / n);
            sinTable[i] = Math.sin(2 * Math.PI * i / n);
        }
        // Bit-reversed addressing permutation
        for (var i = 0; i < n; i++) {
            var j = reverseBits(i, levels);
            if (j > i) {
                var temp = real[i];
                real[i] = real[j];
                real[j] = temp;
                temp = imag[i];
                imag[i] = imag[j];
                imag[j] = temp;
            }
        }
        // Cooley-Tukey decimation-in-time radix-2 FFT
        for (var size = 2; size <= n; size *= 2) {
            var halfsize = size / 2;
            var tablestep = n / size;
            for (var i = 0; i < n; i += size) {
                for (var j = i, k = 0; j < i + halfsize; j++, k += tablestep) {
                    var l = j + halfsize;
                    var tpre = real[l] * cosTable[k] + imag[l] * sinTable[k];
                    var tpim = -real[l] * sinTable[k] + imag[l] * cosTable[k];
                    real[l] = real[j] - tpre;
                    imag[l] = imag[j] - tpim;
                    real[j] += tpre;
                    imag[j] += tpim;
                }
            }
        }
        // Returns the integer whose value is the reverse of the lowest 'bits' bits of the integer 'x'.
        function reverseBits(x, bits) {
            var y = 0;
            for (var i = 0; i < bits; i++) {
                y = (y << 1) | (x & 1);
                x >>>= 1;
            }
            return y;
        }
    }
    /*
     * Computes the discrete Fourier transform (DFT) of the given complex vector, storing the result back into the vector.
     * The vector can have any length. This requires the convolution function, which in turn requires the radix-2 FFT function.
     * Uses Bluestein's chirp z-transform algorithm.
     */
    function transformBluestein(real, imag) {
        // Find a power-of-2 convolution length m such that m >= n * 2 + 1
        var n = real.length;
        if (n != imag.length)
            throw "Mismatched lengths";
        var m = 1;
        while (m < n * 2 + 1)
            m *= 2;
        // Trignometric tables
        var cosTable = new Array(n);
        var sinTable = new Array(n);
        for (var i = 0; i < n; i++) {
            var j = i * i % (n * 2); // This is more accurate than j = i * i
            cosTable[i] = Math.cos(Math.PI * j / n);
            sinTable[i] = Math.sin(Math.PI * j / n);
        }
        // Temporary vectors and preprocessing
        var areal = newArrayOfZeros(m);
        var aimag = newArrayOfZeros(m);
        for (var i = 0; i < n; i++) {
            areal[i] = real[i] * cosTable[i] + imag[i] * sinTable[i];
            aimag[i] = -real[i] * sinTable[i] + imag[i] * cosTable[i];
        }
        var breal = newArrayOfZeros(m);
        var bimag = newArrayOfZeros(m);
        breal[0] = cosTable[0];
        bimag[0] = sinTable[0];
        for (var i = 1; i < n; i++) {
            breal[i] = breal[m - i] = cosTable[i];
            bimag[i] = bimag[m - i] = sinTable[i];
        }
        // Convolution
        var creal = new Array(m);
        var cimag = new Array(m);
        convolveComplex(areal, aimag, breal, bimag, creal, cimag);
        // Postprocessing
        for (var i = 0; i < n; i++) {
            real[i] = creal[i] * cosTable[i] + cimag[i] * sinTable[i];
            imag[i] = -creal[i] * sinTable[i] + cimag[i] * cosTable[i];
        }
    }
    /*
     * Computes the circular convolution of the given real vectors. Each vector's length must be the same.
     */
    function convolveReal(x, y, out) {
        var n = x.length;
        if (n != y.length || n != out.length)
            throw "Mismatched lengths";
        convolveComplex(x, newArrayOfZeros(n), y, newArrayOfZeros(n), out, newArrayOfZeros(n));
    }
    /*
     * Computes the circular convolution of the given complex vectors. Each vector's length must be the same.
     */
    function convolveComplex(xreal, ximag, yreal, yimag, outreal, outimag) {
        var n = xreal.length;
        if (n != ximag.length || n != yreal.length || n != yimag.length
            || n != outreal.length || n != outimag.length)
            throw "Mismatched lengths";
        xreal = xreal.slice();
        ximag = ximag.slice();
        yreal = yreal.slice();
        yimag = yimag.slice();
        transform(xreal, ximag);
        transform(yreal, yimag);
        for (var i = 0; i < n; i++) {
            var temp = xreal[i] * yreal[i] - ximag[i] * yimag[i];
            ximag[i] = ximag[i] * yreal[i] + xreal[i] * yimag[i];
            xreal[i] = temp;
        }
        inverseTransform(xreal, ximag);
        for (var i = 0; i < n; i++) { // Scaling (because this FFT implementation omits it)
            outreal[i] = xreal[i] / n;
            outimag[i] = ximag[i] / n;
        }
    }
    function newArrayOfZeros(n) {
        var result = [];
        for (var i = 0; i < n; i++)
            result.push(0);
        return result;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmZ0X2JpbHN0ZWluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdG9ycy9mZnQvZmZ0X2JpbHN0ZWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7Ozs7SUFHSDs7O09BR0c7SUFDSCxTQUFnQixTQUFTLENBQUMsSUFBZ0MsRUFBRSxJQUFnQztRQUMzRixJQUFNLENBQUMsR0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzlCLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNO1lBQ25CLE1BQU0sb0JBQW9CLENBQUM7UUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNULE9BQU87YUFDSCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFHLGdCQUFnQjtZQUM3QyxlQUFlLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3ZCLGlEQUFpRDtZQUN0RCxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQVZELDhCQVVDO0lBR0Q7OztPQUdHO0lBQ0gsU0FBUyxnQkFBZ0IsQ0FBQyxJQUFnQyxFQUFFLElBQWdDO1FBQzNGLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUdEOzs7T0FHRztJQUNILFNBQVMsZUFBZSxDQUFDLElBQWdDLEVBQUUsSUFBZ0M7UUFDMUYsbUJBQW1CO1FBQ25CLElBQU0sQ0FBQyxHQUFXLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDOUIsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU07WUFDbkIsTUFBTSxvQkFBb0IsQ0FBQztRQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUcs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QUFJLEtBQUssQ0FBUyxDQUFDLENBQUMsQ0FBQztRQUNwQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzNCLElBQU0sQ0FBQyxHQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBRSx1Q0FBdUM7WUFDM0UsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDeEMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDeEM7UUFFRCxzQ0FBc0M7UUFDdEMsSUFBSSxLQUFLLEdBQWtCLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QyxJQUFJLEtBQUssR0FBa0IsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDM0IsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxRCxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDMUQ7UUFDRCxJQUFJLEtBQUssR0FBa0IsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlDLElBQUksS0FBSyxHQUFrQixlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDM0IsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0QztRQUVELGNBQWM7UUFDZCxJQUFJLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBUyxDQUFDLENBQUMsQ0FBQztRQUNqQyxJQUFJLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBUyxDQUFDLENBQUMsQ0FBQztRQUNqQyxlQUFlLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUUxRCxpQkFBaUI7UUFDakIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMzQixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNELElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENB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LyogXHJcbiAqIEZyZWUgRkZUIGFuZCBjb252b2x1dGlvbiAoVHlwZVNjcmlwdClcclxuICogXHJcbiAqIENvcHlyaWdodCAoYykgMjAyMCBQcm9qZWN0IE5heXVraS4gKE1JVCBMaWNlbnNlKVxyXG4gKiBodHRwczovL3d3dy5uYXl1a2kuaW8vcGFnZS9mcmVlLXNtYWxsLWZmdC1pbi1tdWx0aXBsZS1sYW5ndWFnZXNcclxuICogXHJcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2ZcclxuICogdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxyXG4gKiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXHJcbiAqIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXHJcbiAqIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcclxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcbiAqIC0gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cclxuICogICBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuICogLSBUaGUgU29mdHdhcmUgaXMgcHJvdmlkZWQgXCJhcyBpc1wiLCB3aXRob3V0IHdhcnJhbnR5IG9mIGFueSBraW5kLCBleHByZXNzIG9yXHJcbiAqICAgaW1wbGllZCwgaW5jbHVkaW5nIGJ1dCBub3QgbGltaXRlZCB0byB0aGUgd2FycmFudGllcyBvZiBtZXJjaGFudGFiaWxpdHksXHJcbiAqICAgZml0bmVzcyBmb3IgYSBwYXJ0aWN1bGFyIHB1cnBvc2UgYW5kIG5vbmluZnJpbmdlbWVudC4gSW4gbm8gZXZlbnQgc2hhbGwgdGhlXHJcbiAqICAgYXV0aG9ycyBvciBjb3B5cmlnaHQgaG9sZGVycyBiZSBsaWFibGUgZm9yIGFueSBjbGFpbSwgZGFtYWdlcyBvciBvdGhlclxyXG4gKiAgIGxpYWJpbGl0eSwgd2hldGhlciBpbiBhbiBhY3Rpb24gb2YgY29udHJhY3QsIHRvcnQgb3Igb3RoZXJ3aXNlLCBhcmlzaW5nIGZyb20sXHJcbiAqICAgb3V0IG9mIG9yIGluIGNvbm5lY3Rpb24gd2l0aCB0aGUgU29mdHdhcmUgb3IgdGhlIHVzZSBvciBvdGhlciBkZWFsaW5ncyBpbiB0aGVcclxuICogICBTb2Z0d2FyZS5cclxuICovXHJcblxyXG5cclxuLyogXHJcbiAqIENvbXB1dGVzIHRoZSBkaXNjcmV0ZSBGb3VyaWVyIHRyYW5zZm9ybSAoREZUKSBvZiB0aGUgZ2l2ZW4gY29tcGxleCB2ZWN0b3IsIHN0b3JpbmcgdGhlIHJlc3VsdCBiYWNrIGludG8gdGhlIHZlY3Rvci5cclxuICogVGhlIHZlY3RvciBjYW4gaGF2ZSBhbnkgbGVuZ3RoLiBUaGlzIGlzIGEgd3JhcHBlciBmdW5jdGlvbi5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2Zvcm0ocmVhbDogQXJyYXk8bnVtYmVyPnxGbG9hdDY0QXJyYXksIGltYWc6IEFycmF5PG51bWJlcj58RmxvYXQ2NEFycmF5KTogdm9pZCB7XHJcblx0Y29uc3QgbjogbnVtYmVyID0gcmVhbC5sZW5ndGg7XHJcblx0aWYgKG4gIT0gaW1hZy5sZW5ndGgpXHJcblx0XHR0aHJvdyBcIk1pc21hdGNoZWQgbGVuZ3Roc1wiO1xyXG5cdGlmIChuID09IDApXHJcblx0XHRyZXR1cm47XHJcblx0ZWxzZSBpZiAoKG4gJiAobiAtIDEpKSA9PSAwKSAgLy8gSXMgcG93ZXIgb2YgMlxyXG5cdFx0dHJhbnNmb3JtUmFkaXgyKHJlYWwsIGltYWcpO1xyXG5cdGVsc2UgIC8vIE1vcmUgY29tcGxpY2F0ZWQgYWxnb3JpdGhtIGZvciBhcmJpdHJhcnkgc2l6ZXNcclxuXHRcdHRyYW5zZm9ybUJsdWVzdGVpbihyZWFsLCBpbWFnKTtcclxufVxyXG5cclxuXHJcbi8qIFxyXG4gKiBDb21wdXRlcyB0aGUgaW52ZXJzZSBkaXNjcmV0ZSBGb3VyaWVyIHRyYW5zZm9ybSAoSURGVCkgb2YgdGhlIGdpdmVuIGNvbXBsZXggdmVjdG9yLCBzdG9yaW5nIHRoZSByZXN1bHQgYmFjayBpbnRvIHRoZSB2ZWN0b3IuXHJcbiAqIFRoZSB2ZWN0b3IgY2FuIGhhdmUgYW55IGxlbmd0aC4gVGhpcyBpcyBhIHdyYXBwZXIgZnVuY3Rpb24uIFRoaXMgdHJhbnNmb3JtIGRvZXMgbm90IHBlcmZvcm0gc2NhbGluZywgc28gdGhlIGludmVyc2UgaXMgbm90IGEgdHJ1ZSBpbnZlcnNlLlxyXG4gKi9cclxuZnVuY3Rpb24gaW52ZXJzZVRyYW5zZm9ybShyZWFsOiBBcnJheTxudW1iZXI+fEZsb2F0NjRBcnJheSwgaW1hZzogQXJyYXk8bnVtYmVyPnxGbG9hdDY0QXJyYXkpOiB2b2lkIHtcclxuXHR0cmFuc2Zvcm0oaW1hZywgcmVhbCk7XHJcbn1cclxuXHJcblxyXG4vKiBcclxuICogQ29tcHV0ZXMgdGhlIGRpc2NyZXRlIEZvdXJpZXIgdHJhbnNmb3JtIChERlQpIG9mIHRoZSBnaXZlbiBjb21wbGV4IHZlY3Rvciwgc3RvcmluZyB0aGUgcmVzdWx0IGJhY2sgaW50byB0aGUgdmVjdG9yLlxyXG4gKiBUaGUgdmVjdG9yJ3MgbGVuZ3RoIG11c3QgYmUgYSBwb3dlciBvZiAyLiBVc2VzIHRoZSBDb29sZXktVHVrZXkgZGVjaW1hdGlvbi1pbi10aW1lIHJhZGl4LTIgYWxnb3JpdGhtLlxyXG4gKi9cclxuZnVuY3Rpb24gdHJhbnNmb3JtUmFkaXgyKHJlYWw6IEFycmF5PG51bWJlcj58RmxvYXQ2NEFycmF5LCBpbWFnOiBBcnJheTxudW1iZXI+fEZsb2F0NjRBcnJheSk6IHZvaWQge1xyXG5cdC8vIExlbmd0aCB2YXJpYWJsZXNcclxuXHRjb25zdCBuOiBudW1iZXIgPSByZWFsLmxlbmd0aDtcclxuXHRpZiAobiAhPSBpbWFnLmxlbmd0aClcclxuXHRcdHRocm93IFwiTWlzbWF0Y2hlZCBsZW5ndGhzXCI7XHJcblx0aWYgKG4gPT0gMSkgIC8vIFRyaXZpYWwgdHJhbnNmb3JtXHJcblx0XHRyZXR1cm47XHJcblx0bGV0IGxldmVsczogbnVtYmVyID0gLTE7XHJcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCAzMjsgaSsrKSB7XHJcblx0XHRpZiAoMSA8PCBpID09IG4pXHJcblx0XHRcdGxldmVscyA9IGk7ICAvLyBFcXVhbCB0byBsb2cyKG4pXHJcblx0fVxyXG5cdGlmIChsZXZlbHMgPT0gLTEpXHJcblx0XHR0aHJvdyBcIkxlbmd0aCBpcyBub3QgYSBwb3dlciBvZiAyXCI7XHJcblx0XHJcblx0Ly8gVHJpZ29ub21ldHJpYyB0YWJsZXNcclxuXHRsZXQgY29zVGFibGUgPSBuZXcgQXJyYXk8bnVtYmVyPihuIC8gMik7XHJcblx0bGV0IHNpblRhYmxlID0gbmV3IEFycmF5PG51bWJlcj4obiAvIDIpO1xyXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgbiAvIDI7IGkrKykge1xyXG5cdFx0Y29zVGFibGVbaV0gPSBNYXRoLmNvcygyICogTWF0aC5QSSAqIGkgLyBuKTtcclxuXHRcdHNpblRhYmxlW2ldID0gTWF0aC5zaW4oMiAqIE1hdGguUEkgKiBpIC8gbik7XHJcblx0fVxyXG5cdFxyXG5cdC8vIEJpdC1yZXZlcnNlZCBhZGRyZXNzaW5nIHBlcm11dGF0aW9uXHJcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcclxuXHRcdGNvbnN0IGo6IG51bWJlciA9IHJldmVyc2VCaXRzKGksIGxldmVscyk7XHJcblx0XHRpZiAoaiA+IGkpIHtcclxuXHRcdFx0bGV0IHRlbXA6IG51bWJlciA9IHJlYWxbaV07XHJcblx0XHRcdHJlYWxbaV0gPSByZWFsW2pdO1xyXG5cdFx0XHRyZWFsW2pdID0gdGVtcDtcclxuXHRcdFx0dGVtcCA9IGltYWdbaV07XHJcblx0XHRcdGltYWdbaV0gPSBpbWFnW2pdO1xyXG5cdFx0XHRpbWFnW2pdID0gdGVtcDtcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0Ly8gQ29vbGV5LVR1a2V5IGRlY2ltYXRpb24taW4tdGltZSByYWRpeC0yIEZGVFxyXG5cdGZvciAobGV0IHNpemUgPSAyOyBzaXplIDw9IG47IHNpemUgKj0gMikge1xyXG5cdFx0Y29uc3QgaGFsZnNpemU6IG51bWJlciA9IHNpemUgLyAyO1xyXG5cdFx0Y29uc3QgdGFibGVzdGVwOiBudW1iZXIgPSBuIC8gc2l6ZTtcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSArPSBzaXplKSB7XHJcblx0XHRcdGZvciAobGV0IGogPSBpLCBrID0gMDsgaiA8IGkgKyBoYWxmc2l6ZTsgaisrLCBrICs9IHRhYmxlc3RlcCkge1xyXG5cdFx0XHRcdGNvbnN0IGw6IG51bWJlciA9IGogKyBoYWxmc2l6ZTtcclxuXHRcdFx0XHRjb25zdCB0cHJlOiBudW1iZXIgPSAgcmVhbFtsXSAqIGNvc1RhYmxlW2tdICsgaW1hZ1tsXSAqIHNpblRhYmxlW2tdO1xyXG5cdFx0XHRcdGNvbnN0IHRwaW06IG51bWJlciA9IC1yZWFsW2xdICogc2luVGFibGVba10gKyBpbWFnW2xdICogY29zVGFibGVba107XHJcblx0XHRcdFx0cmVhbFtsXSA9IHJlYWxbal0gLSB0cHJlO1xyXG5cdFx0XHRcdGltYWdbbF0gPSBpbWFnW2pdIC0gdHBpbTtcclxuXHRcdFx0XHRyZWFsW2pdICs9IHRwcmU7XHJcblx0XHRcdFx0aW1hZ1tqXSArPSB0cGltO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdC8vIFJldHVybnMgdGhlIGludGVnZXIgd2hvc2UgdmFsdWUgaXMgdGhlIHJldmVyc2Ugb2YgdGhlIGxvd2VzdCAnYml0cycgYml0cyBvZiB0aGUgaW50ZWdlciAneCcuXHJcblx0ZnVuY3Rpb24gcmV2ZXJzZUJpdHMoeDogbnVtYmVyLCBiaXRzOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0bGV0IHk6IG51bWJlciA9IDA7XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGJpdHM7IGkrKykge1xyXG5cdFx0XHR5ID0gKHkgPDwgMSkgfCAoeCAmIDEpO1xyXG5cdFx0XHR4ID4+Pj0gMTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB5O1xyXG5cdH1cclxufVxyXG5cclxuXHJcbi8qIFxyXG4gKiBDb21wdXRlcyB0aGUgZGlzY3JldGUgRm91cmllciB0cmFuc2Zvcm0gKERGVCkgb2YgdGhlIGdpdmVuIGNvbXBsZXggdmVjdG9yLCBzdG9yaW5nIHRoZSByZXN1bHQgYmFjayBpbnRvIHRoZSB2ZWN0b3IuXHJcbiAqIFRoZSB2ZWN0b3IgY2FuIGhhdmUgYW55IGxlbmd0aC4gVGhpcyByZXF1aXJlcyB0aGUgY29udm9sdXRpb24gZnVuY3Rpb24sIHdoaWNoIGluIHR1cm4gcmVxdWlyZXMgdGhlIHJhZGl4LTIgRkZUIGZ1bmN0aW9uLlxyXG4gKiBVc2VzIEJsdWVzdGVpbidzIGNoaXJwIHotdHJhbnNmb3JtIGFsZ29yaXRobS5cclxuICovXHJcbmZ1bmN0aW9uIHRyYW5zZm9ybUJsdWVzdGVpbihyZWFsOiBBcnJheTxudW1iZXI+fEZsb2F0NjRBcnJheSwgaW1hZzogQXJyYXk8bnVtYmVyPnxGbG9hdDY0QXJyYXkpOiB2b2lkIHtcclxuXHQvLyBGaW5kIGEgcG93ZXItb2YtMiBjb252b2x1dGlvbiBsZW5ndGggbSBzdWNoIHRoYXQgbSA+PSBuICogMiArIDFcclxuXHRjb25zdCBuOiBudW1iZXIgPSByZWFsLmxlbmd0aDtcclxuXHRpZiAobiAhPSBpbWFnLmxlbmd0aClcclxuXHRcdHRocm93IFwiTWlzbWF0Y2hlZCBsZW5ndGhzXCI7XHJcblx0bGV0IG06IG51bWJlciA9IDE7XHJcblx0d2hpbGUgKG0gPCBuICogMiArIDEpXHJcblx0XHRtICo9IDI7XHJcblx0XHJcblx0Ly8gVHJpZ25vbWV0cmljIHRhYmxlc1xyXG5cdGxldCBjb3NUYWJsZSA9IG5ldyBBcnJheTxudW1iZXI+KG4pO1xyXG5cdGxldCBzaW5UYWJsZSA9IG5ldyBBcnJheTxudW1iZXI+KG4pO1xyXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XHJcblx0XHRjb25zdCBqOiBudW1iZXIgPSBpICogaSAlIChuICogMik7ICAvLyBUaGlzIGlzIG1vcmUgYWNjdXJhdGUgdGhhbiBqID0gaSAqIGlcclxuXHRcdGNvc1RhYmxlW2ldID0gTWF0aC5jb3MoTWF0aC5QSSAqIGogLyBuKTtcclxuXHRcdHNpblRhYmxlW2ldID0gTWF0aC5zaW4oTWF0aC5QSSAqIGogLyBuKTtcclxuXHR9XHJcblx0XHJcblx0Ly8gVGVtcG9yYXJ5IHZlY3RvcnMgYW5kIHByZXByb2Nlc3NpbmdcclxuXHRsZXQgYXJlYWw6IEFycmF5PG51bWJlcj4gPSBuZXdBcnJheU9mWmVyb3MobSk7XHJcblx0bGV0IGFpbWFnOiBBcnJheTxudW1iZXI+ID0gbmV3QXJyYXlPZlplcm9zKG0pO1xyXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XHJcblx0XHRhcmVhbFtpXSA9ICByZWFsW2ldICogY29zVGFibGVbaV0gKyBpbWFnW2ldICogc2luVGFibGVbaV07XHJcblx0XHRhaW1hZ1tpXSA9IC1yZWFsW2ldICogc2luVGFibGVbaV0gKyBpbWFnW2ldICogY29zVGFibGVbaV07XHJcblx0fVxyXG5cdGxldCBicmVhbDogQXJyYXk8bnVtYmVyPiA9IG5ld0FycmF5T2ZaZXJvcyhtKTtcclxuXHRsZXQgYmltYWc6IEFycmF5PG51bWJlcj4gPSBuZXdBcnJheU9mWmVyb3MobSk7XHJcblx0YnJlYWxbMF0gPSBjb3NUYWJsZVswXTtcclxuXHRiaW1hZ1swXSA9IHNpblRhYmxlWzBdO1xyXG5cdGZvciAobGV0IGkgPSAxOyBpIDwgbjsgaSsrKSB7XHJcblx0XHRicmVhbFtpXSA9IGJyZWFsW20gLSBpXSA9IGNvc1RhYmxlW2ldO1xyXG5cdFx0YmltYWdbaV0gPSBiaW1hZ1ttIC0gaV0gPSBzaW5UYWJsZVtpXTtcclxuXHR9XHJcblx0XHJcblx0Ly8gQ29udm9sdXRpb25cclxuXHRsZXQgY3JlYWwgPSBuZXcgQXJyYXk8bnVtYmVyPihtKTtcclxuXHRsZXQgY2ltYWcgPSBuZXcgQXJyYXk8bnVtYmVyPihtKTtcclxuXHRjb252b2x2ZUNvbXBsZXgoYXJlYWwsIGFpbWFnLCBicmVhbCwgYmltYWcsIGNyZWFsLCBjaW1hZyk7XHJcblx0XHJcblx0Ly8gUG9zdHByb2Nlc3NpbmdcclxuXHRmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xyXG5cdFx0cmVhbFtpXSA9ICBjcmVhbFtpXSAqIGNvc1RhYmxlW2ldICsgY2ltYWdbaV0gKiBzaW5UYWJsZVtpXTtcclxuXHRcdGltYWdbaV0gPSAtY3JlYWxbaV0gKiBzaW5UYWJsZVtpXSArIGNpbWFnW2ldICogY29zVGFibGVbaV07XHJcblx0fVxyXG59XHJcblxyXG5cclxuLyogXHJcbiAqIENvbXB1dGVzIHRoZSBjaXJjdWxhciBjb252b2x1dGlvbiBvZiB0aGUgZ2l2ZW4gcmVhbCB2ZWN0b3JzLiBFYWNoIHZlY3RvcidzIGxlbmd0aCBtdXN0IGJlIHRoZSBzYW1lLlxyXG4gKi9cclxuZnVuY3Rpb24gY29udm9sdmVSZWFsKHg6IEFycmF5PG51bWJlcj58RmxvYXQ2NEFycmF5LCB5OiBBcnJheTxudW1iZXI+fEZsb2F0NjRBcnJheSwgb3V0OiBBcnJheTxudW1iZXI+fEZsb2F0NjRBcnJheSk6IHZvaWQge1xyXG5cdGNvbnN0IG46IG51bWJlciA9IHgubGVuZ3RoO1xyXG5cdGlmIChuICE9IHkubGVuZ3RoIHx8IG4gIT0gb3V0Lmxlbmd0aClcclxuXHRcdHRocm93IFwiTWlzbWF0Y2hlZCBsZW5ndGhzXCI7XHJcblx0Y29udm9sdmVDb21wbGV4KHgsIG5ld0FycmF5T2ZaZXJvcyhuKSwgeSwgbmV3QXJyYXlPZlplcm9zKG4pLCBvdXQsIG5ld0FycmF5T2ZaZXJvcyhuKSk7XHJcbn1cclxuXHJcblxyXG4vKiBcclxuICogQ29tcHV0ZXMgdGhlIGNpcmN1bGFyIGNvbnZvbHV0aW9uIG9mIHRoZSBnaXZlbiBjb21wbGV4IHZlY3RvcnMuIEVhY2ggdmVjdG9yJ3MgbGVuZ3RoIG11c3QgYmUgdGhlIHNhbWUuXHJcbiAqL1xyXG5mdW5jdGlvbiBjb252b2x2ZUNvbXBsZXgoXHJcblx0XHR4cmVhbDogQXJyYXk8bnVtYmVyPnxGbG9hdDY0QXJyYXksIHhpbWFnOiBBcnJheTxudW1iZXI+fEZsb2F0NjRBcnJheSxcclxuXHRcdHlyZWFsOiBBcnJheTxudW1iZXI+fEZsb2F0NjRBcnJheSwgeWltYWc6IEFycmF5PG51bWJlcj58RmxvYXQ2NEFycmF5LFxyXG5cdFx0b3V0cmVhbDogQXJyYXk8bnVtYmVyPnxGbG9hdDY0QXJyYXksIG91dGltYWc6IEFycmF5PG51bWJlcj58RmxvYXQ2NEFycmF5KTogdm9pZCB7XHJcblx0XHJcblx0Y29uc3QgbjogbnVtYmVyID0geHJlYWwubGVuZ3RoO1xyXG5cdGlmIChuICE9IHhpbWFnLmxlbmd0aCB8fCBuICE9IHlyZWFsLmxlbmd0aCB8fCBuICE9IHlpbWFnLmxlbmd0aFxyXG5cdFx0XHR8fCBuICE9IG91dHJlYWwubGVuZ3RoIHx8IG4gIT0gb3V0aW1hZy5sZW5ndGgpXHJcblx0XHR0aHJvdyBcIk1pc21hdGNoZWQgbGVuZ3Roc1wiO1xyXG5cdFxyXG5cdHhyZWFsID0geHJlYWwuc2xpY2UoKTtcclxuXHR4aW1hZyA9IHhpbWFnLnNsaWNlKCk7XHJcblx0eXJlYWwgPSB5cmVhbC5zbGljZSgpO1xyXG5cdHlpbWFnID0geWltYWcuc2xpY2UoKTtcclxuXHR0cmFuc2Zvcm0oeHJlYWwsIHhpbWFnKTtcclxuXHR0cmFuc2Zvcm0oeXJlYWwsIHlpbWFnKTtcclxuXHRcclxuXHRmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xyXG5cdFx0Y29uc3QgdGVtcDogbnVtYmVyID0geHJlYWxbaV0gKiB5cmVhbFtpXSAtIHhpbWFnW2ldICogeWltYWdbaV07XHJcblx0XHR4aW1hZ1tpXSA9IHhpbWFnW2ldICogeXJlYWxbaV0gKyB4cmVhbFtpXSAqIHlpbWFnW2ldO1xyXG5cdFx0eHJlYWxbaV0gPSB0ZW1wO1xyXG5cdH1cclxuXHRpbnZlcnNlVHJhbnNmb3JtKHhyZWFsLCB4aW1hZyk7XHJcblx0XHJcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHsgIC8vIFNjYWxpbmcgKGJlY2F1c2UgdGhpcyBGRlQgaW1wbGVtZW50YXRpb24gb21pdHMgaXQpXHJcblx0XHRvdXRyZWFsW2ldID0geHJlYWxbaV0gLyBuO1xyXG5cdFx0b3V0aW1hZ1tpXSA9IHhpbWFnW2ldIC8gbjtcclxuXHR9XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBuZXdBcnJheU9mWmVyb3MobjogbnVtYmVyKTogQXJyYXk8bnVtYmVyPiB7XHJcblx0bGV0IHJlc3VsdDogQXJyYXk8bnVtYmVyPiA9IFtdO1xyXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKVxyXG5cdFx0cmVzdWx0LnB1c2goMCk7XHJcblx0cmV0dXJuIHJlc3VsdDtcclxufSJdfQ==