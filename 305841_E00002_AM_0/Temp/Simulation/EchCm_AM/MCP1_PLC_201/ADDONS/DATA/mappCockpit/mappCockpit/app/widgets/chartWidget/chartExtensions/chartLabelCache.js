define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Implements caching for chart label text sizes ....
     *
     * @class ChartLabelCache
     */
    var ChartLabelCache = /** @class */ (function () {
        function ChartLabelCache() {
            // holds the text size cache
            this._textSizeCache = {};
        }
        /**
         * Gets the text size for the requested text and font
         *
         * @param {*} text
         * @param {*} maxwidth
         * @param {*} font
         * @memberof ChartLabelCache
         */
        ChartLabelCache.prototype.getTextSize = function (text, maxwidth, font) {
            if (!this._textSizeCache) {
                this._textSizeCache = {};
            }
            else {
                if (this._textSizeCache[font.fontFamily]) {
                    if (this._textSizeCache[font.fontFamily][font.size]) {
                        if (this._textSizeCache[font.fontFamily][font.size][text.length]) {
                            var cachedTextBounds = this._textSizeCache[font.fontFamily][font.size][text.length].bounds;
                            return cachedTextBounds;
                        }
                    }
                }
            }
        };
        /**
         * Caches the text size for the specefied text and font
         *
         * @param {*} text
         * @param {*} maxwidth
         * @param {*} font
         * @memberof ChartLabelCache
         */
        ChartLabelCache.prototype.cacheTextSize = function (text, maxwidth, font, bounds) {
            if (!this._textSizeCache[font.fontFamily]) {
                this._textSizeCache[font.fontFamily] = { fontFamily: font.fontFamily };
            }
            if (!this._textSizeCache[font.fontFamily][font.size]) {
                this._textSizeCache[font.fontFamily][font.size] = { fontSize: font.size };
            }
            if (!this._textSizeCache[font.fontFamily][font.size][text.length]) {
                // reserver some additional space in width because the cache just uses the text length
                bounds.width = bounds.width * 1.2;
                // store the bounds with the text lenght as key. Keep in mind that this not strictly exact because different text content with the same length could result in different text bounds !
                this._textSizeCache[font.fontFamily][font.size][text.length] = { bounds: bounds };
            }
        };
        return ChartLabelCache;
    }());
    exports.ChartLabelCache = ChartLabelCache;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRMYWJlbENhY2hlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0V2lkZ2V0L2NoYXJ0RXh0ZW5zaW9ucy9jaGFydExhYmVsQ2FjaGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBQUE7Ozs7T0FJRztJQUNIO1FBQUE7WUFFSSw0QkFBNEI7WUFDcEIsbUJBQWMsR0FBRyxFQUFFLENBQUM7UUFrRGhDLENBQUM7UUFoREc7Ozs7Ozs7V0FPRztRQUNILHFDQUFXLEdBQVgsVUFBWSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUk7WUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO2FBQzVCO2lCQUFLO2dCQUNGLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7b0JBQ3RDLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO3dCQUNqRCxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7NEJBQzlELElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUM7NEJBQzNGLE9BQU8sZ0JBQWdCLENBQUM7eUJBQzNCO3FCQUNKO2lCQUNKO2FBQ0o7UUFDTCxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNILHVDQUFhLEdBQWIsVUFBYyxJQUFXLEVBQUUsUUFBZSxFQUFFLElBQUksRUFBRSxNQUFNO1lBQ3BELElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDdkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBQyxDQUFDO2FBQ3hFO1lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDbEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUMsQ0FBQzthQUMzRTtZQUVELElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUMvRCxzRkFBc0Y7Z0JBQ3RGLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssR0FBQyxHQUFHLENBQUM7Z0JBQ2hDLHNMQUFzTDtnQkFDdEwsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsQ0FBQzthQUNsRjtRQUNMLENBQUM7UUFFTCxzQkFBQztJQUFELENBQUMsQUFyREQsSUFxREM7SUFFTywwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBJbXBsZW1lbnRzIGNhY2hpbmcgZm9yIGNoYXJ0IGxhYmVsIHRleHQgc2l6ZXMgLi4uLlxyXG4gKlxyXG4gKiBAY2xhc3MgQ2hhcnRMYWJlbENhY2hlXHJcbiAqL1xyXG5jbGFzcyBDaGFydExhYmVsQ2FjaGUge1xyXG5cclxuICAgIC8vIGhvbGRzIHRoZSB0ZXh0IHNpemUgY2FjaGVcclxuICAgIHByaXZhdGUgX3RleHRTaXplQ2FjaGUgPSB7fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHRleHQgc2l6ZSBmb3IgdGhlIHJlcXVlc3RlZCB0ZXh0IGFuZCBmb250XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSB0ZXh0XHJcbiAgICAgKiBAcGFyYW0geyp9IG1heHdpZHRoXHJcbiAgICAgKiBAcGFyYW0geyp9IGZvbnRcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydExhYmVsQ2FjaGVcclxuICAgICAqL1xyXG4gICAgZ2V0VGV4dFNpemUodGV4dCwgbWF4d2lkdGgsIGZvbnQpe1xyXG4gICAgICAgIGlmICghdGhpcy5fdGV4dFNpemVDYWNoZSkge1xyXG4gICAgICAgICAgICB0aGlzLl90ZXh0U2l6ZUNhY2hlID0ge307XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fdGV4dFNpemVDYWNoZVtmb250LmZvbnRGYW1pbHldKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdGV4dFNpemVDYWNoZVtmb250LmZvbnRGYW1pbHldW2ZvbnQuc2l6ZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fdGV4dFNpemVDYWNoZVtmb250LmZvbnRGYW1pbHldW2ZvbnQuc2l6ZV1bdGV4dC5sZW5ndGhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjYWNoZWRUZXh0Qm91bmRzID0gdGhpcy5fdGV4dFNpemVDYWNoZVtmb250LmZvbnRGYW1pbHldW2ZvbnQuc2l6ZV1bdGV4dC5sZW5ndGhdLmJvdW5kcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFRleHRCb3VuZHM7ICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWNoZXMgdGhlIHRleHQgc2l6ZSBmb3IgdGhlIHNwZWNlZmllZCB0ZXh0IGFuZCBmb250XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSB0ZXh0XHJcbiAgICAgKiBAcGFyYW0geyp9IG1heHdpZHRoXHJcbiAgICAgKiBAcGFyYW0geyp9IGZvbnRcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydExhYmVsQ2FjaGVcclxuICAgICAqL1xyXG4gICAgY2FjaGVUZXh0U2l6ZSh0ZXh0OnN0cmluZywgbWF4d2lkdGg6bnVtYmVyLCBmb250LCBib3VuZHMpe1xyXG4gICAgICAgIGlmICghdGhpcy5fdGV4dFNpemVDYWNoZVtmb250LmZvbnRGYW1pbHldKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RleHRTaXplQ2FjaGVbZm9udC5mb250RmFtaWx5XSA9IHtmb250RmFtaWx5OiBmb250LmZvbnRGYW1pbHl9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl90ZXh0U2l6ZUNhY2hlW2ZvbnQuZm9udEZhbWlseV1bZm9udC5zaXplXSkge1xyXG4gICAgICAgICAgICB0aGlzLl90ZXh0U2l6ZUNhY2hlW2ZvbnQuZm9udEZhbWlseV1bZm9udC5zaXplXSA9IHtmb250U2l6ZTogZm9udC5zaXplfTsgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5fdGV4dFNpemVDYWNoZVtmb250LmZvbnRGYW1pbHldW2ZvbnQuc2l6ZV1bdGV4dC5sZW5ndGhdKSB7XHJcbiAgICAgICAgICAgIC8vIHJlc2VydmVyIHNvbWUgYWRkaXRpb25hbCBzcGFjZSBpbiB3aWR0aCBiZWNhdXNlIHRoZSBjYWNoZSBqdXN0IHVzZXMgdGhlIHRleHQgbGVuZ3RoXHJcbiAgICAgICAgICAgIGJvdW5kcy53aWR0aCA9IGJvdW5kcy53aWR0aCoxLjI7XHJcbiAgICAgICAgICAgIC8vIHN0b3JlIHRoZSBib3VuZHMgd2l0aCB0aGUgdGV4dCBsZW5naHQgYXMga2V5LiBLZWVwIGluIG1pbmQgdGhhdCB0aGlzIG5vdCBzdHJpY3RseSBleGFjdCBiZWNhdXNlIGRpZmZlcmVudCB0ZXh0IGNvbnRlbnQgd2l0aCB0aGUgc2FtZSBsZW5ndGggY291bGQgcmVzdWx0IGluIGRpZmZlcmVudCB0ZXh0IGJvdW5kcyAhXHJcbiAgICAgICAgICAgIHRoaXMuX3RleHRTaXplQ2FjaGVbZm9udC5mb250RmFtaWx5XVtmb250LnNpemVdW3RleHQubGVuZ3RoXSA9IHtib3VuZHM6Ym91bmRzfTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQge0NoYXJ0TGFiZWxDYWNoZX07Il19