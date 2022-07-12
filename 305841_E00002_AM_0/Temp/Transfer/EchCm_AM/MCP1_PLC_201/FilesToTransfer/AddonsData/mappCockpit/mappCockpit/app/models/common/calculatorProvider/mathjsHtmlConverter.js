define(["require", "exports", "../../../libs/math/mathjs"], function (require, exports, math) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Helper class for calculator to convert the value to html and back with mathjs.
     *
     * @class MathjsHtmlConverter
     */
    var MathjsHtmlConverter = /** @class */ (function () {
        /**
         *Creates an instance of MathjsHtmlConverter.
         * @param {string} [ignoredValue=""] for ignored value the converter don't execute
         * @memberof MathjsHtmlConverter
         */
        function MathjsHtmlConverter(ignoredValue) {
            if (ignoredValue === void 0) { ignoredValue = ""; }
            this._ignoredValue = ignoredValue;
        }
        /**
         * Convert text formular to HTML code
         *
         * @public
         * @static
         * @param {string} value
         * @returns {string}
         * @memberof MathjsHtmlConverter
         */
        MathjsHtmlConverter.prototype.getValueFromRawValue = function (rawValue) {
            if (this._ignoredValue !== rawValue) {
                try {
                    var code = math.parse(rawValue);
                    //Transform to html string for user output
                    var nodeHTML = code.toHTML();
                    //Add the color information to the html transformed formular
                    rawValue = MathjsHtmlConverter.htmlColorCode + nodeHTML;
                }
                catch (error) {
                    //If an error occure while parsing then give back the unchanged htmlValue
                    return rawValue;
                }
            }
            return rawValue;
        };
        //Color information for html output that enables the syntax higlighting
        MathjsHtmlConverter.htmlColorCode = "<style> \n            .math-number, .math-imaginary-symbol{ \n                color: #006666; \n                font-family: monospace; \n            } \n            .math-string{ \n                color: #990000; \n                font-family: monospace; \n            } \n            .math-symbol, .math-boolean, .math-undefined, .math-null-symbol, .math-nan-symbol, .math-infinity-symbol{ \n                color: black; \n                font-family: monospace; \n            } \n            .math-function{ \n                color: purple; \n                font-family: monospace; \n                font-weight: bold; \n            } \n            .math-parameter, .math-property{ \n                color: black; \n                font-family: monospace; \n            } \n            .math-operator, .math-parenthesis, .math-separator{ \n                color: black; \n                font-family: monospace; \n            } \n        </style>";
        return MathjsHtmlConverter;
    }());
    exports.MathjsHtmlConverter = MathjsHtmlConverter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0aGpzSHRtbENvbnZlcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvbWF0aGpzSHRtbENvbnZlcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFJQTs7OztPQUlHO0lBQ0g7UUFrQ0k7Ozs7V0FJRztRQUNILDZCQUFZLFlBQXlCO1lBQXpCLDZCQUFBLEVBQUEsaUJBQXlCO1lBQ2pDLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDO1FBQ3RDLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNJLGtEQUFvQixHQUEzQixVQUE0QixRQUFnQjtZQUV4QyxJQUFHLElBQUksQ0FBQyxhQUFhLEtBQUssUUFBUSxFQUFFO2dCQUNoQyxJQUFHO29CQUNDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBRWhDLDBDQUEwQztvQkFDMUMsSUFBSSxRQUFRLEdBQVUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUVwQyw0REFBNEQ7b0JBQzVELFFBQVEsR0FBRyxtQkFBbUIsQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO2lCQUMzRDtnQkFDRCxPQUFPLEtBQUssRUFBRTtvQkFDVix5RUFBeUU7b0JBQ3pFLE9BQU8sUUFBUSxDQUFDO2lCQUNuQjthQUNKO1lBQ0QsT0FBTyxRQUFRLENBQUM7UUFDcEIsQ0FBQztRQXBFRCx1RUFBdUU7UUFDeEQsaUNBQWEsR0FDeEIseTdCQTBCUyxDQUFDO1FBeUNsQiwwQkFBQztLQUFBLEFBdkVELElBdUVDO0lBdkVZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG1hdGggZnJvbSAgXCIuLi8uLi8uLi9saWJzL21hdGgvbWF0aGpzXCJcclxuaW1wb3J0IHsgSVZhbHVlQ29udmVydGVyIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy92YWx1ZUNvbnZlcnRlckludGVyZmFjZVwiO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBIZWxwZXIgY2xhc3MgZm9yIGNhbGN1bGF0b3IgdG8gY29udmVydCB0aGUgdmFsdWUgdG8gaHRtbCBhbmQgYmFjayB3aXRoIG1hdGhqcy5cclxuICpcclxuICogQGNsYXNzIE1hdGhqc0h0bWxDb252ZXJ0ZXJcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNYXRoanNIdG1sQ29udmVydGVyIGltcGxlbWVudHMgSVZhbHVlQ29udmVydGVye1xyXG5cclxuICAgIC8vQ29sb3IgaW5mb3JtYXRpb24gZm9yIGh0bWwgb3V0cHV0IHRoYXQgZW5hYmxlcyB0aGUgc3ludGF4IGhpZ2xpZ2h0aW5nXHJcbiAgICBwcml2YXRlIHN0YXRpYyBodG1sQ29sb3JDb2RlOiBzdHJpbmcgPSBcclxuICAgICAgICBgPHN0eWxlPiBcclxuICAgICAgICAgICAgLm1hdGgtbnVtYmVyLCAubWF0aC1pbWFnaW5hcnktc3ltYm9seyBcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAjMDA2NjY2OyBcclxuICAgICAgICAgICAgICAgIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7IFxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAubWF0aC1zdHJpbmd7IFxyXG4gICAgICAgICAgICAgICAgY29sb3I6ICM5OTAwMDA7IFxyXG4gICAgICAgICAgICAgICAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTsgXHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIC5tYXRoLXN5bWJvbCwgLm1hdGgtYm9vbGVhbiwgLm1hdGgtdW5kZWZpbmVkLCAubWF0aC1udWxsLXN5bWJvbCwgLm1hdGgtbmFuLXN5bWJvbCwgLm1hdGgtaW5maW5pdHktc3ltYm9seyBcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBibGFjazsgXHJcbiAgICAgICAgICAgICAgICBmb250LWZhbWlseTogbW9ub3NwYWNlOyBcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgLm1hdGgtZnVuY3Rpb257IFxyXG4gICAgICAgICAgICAgICAgY29sb3I6IHB1cnBsZTsgXHJcbiAgICAgICAgICAgICAgICBmb250LWZhbWlseTogbW9ub3NwYWNlOyBcclxuICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkOyBcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgLm1hdGgtcGFyYW1ldGVyLCAubWF0aC1wcm9wZXJ0eXsgXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogYmxhY2s7IFxyXG4gICAgICAgICAgICAgICAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTsgXHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIC5tYXRoLW9wZXJhdG9yLCAubWF0aC1wYXJlbnRoZXNpcywgLm1hdGgtc2VwYXJhdG9yeyBcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBibGFjazsgXHJcbiAgICAgICAgICAgICAgICBmb250LWZhbWlseTogbW9ub3NwYWNlOyBcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICA8L3N0eWxlPmA7XHJcblxyXG4gICAgcHJpdmF0ZSBfaWdub3JlZFZhbHVlOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKkNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgTWF0aGpzSHRtbENvbnZlcnRlci5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbaWdub3JlZFZhbHVlPVwiXCJdIGZvciBpZ25vcmVkIHZhbHVlIHRoZSBjb252ZXJ0ZXIgZG9uJ3QgZXhlY3V0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hdGhqc0h0bWxDb252ZXJ0ZXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoaWdub3JlZFZhbHVlOiBzdHJpbmcgPSBcIlwiKXtcclxuICAgICAgICB0aGlzLl9pZ25vcmVkVmFsdWUgPSBpZ25vcmVkVmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0IHRleHQgZm9ybXVsYXIgdG8gSFRNTCBjb2RlXHJcbiAgICAgKlxyXG4gICAgICogQHB1YmxpY1xyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIE1hdGhqc0h0bWxDb252ZXJ0ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFZhbHVlRnJvbVJhd1ZhbHVlKHJhd1ZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuX2lnbm9yZWRWYWx1ZSAhPT0gcmF3VmFsdWUpIHsgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0cnl7ICAgXHJcbiAgICAgICAgICAgICAgICBsZXQgY29kZSA9IG1hdGgucGFyc2UocmF3VmFsdWUpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAvL1RyYW5zZm9ybSB0byBodG1sIHN0cmluZyBmb3IgdXNlciBvdXRwdXRcclxuICAgICAgICAgICAgICAgIGxldCBub2RlSFRNTDpzdHJpbmcgPSBjb2RlLnRvSFRNTCgpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAvL0FkZCB0aGUgY29sb3IgaW5mb3JtYXRpb24gdG8gdGhlIGh0bWwgdHJhbnNmb3JtZWQgZm9ybXVsYXJcclxuICAgICAgICAgICAgICAgIHJhd1ZhbHVlID0gTWF0aGpzSHRtbENvbnZlcnRlci5odG1sQ29sb3JDb2RlICsgbm9kZUhUTUw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAvL0lmIGFuIGVycm9yIG9jY3VyZSB3aGlsZSBwYXJzaW5nIHRoZW4gZ2l2ZSBiYWNrIHRoZSB1bmNoYW5nZWQgaHRtbFZhbHVlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmF3VmFsdWU7ICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmF3VmFsdWU7ICAgIFxyXG4gICAgfVxyXG59Il19