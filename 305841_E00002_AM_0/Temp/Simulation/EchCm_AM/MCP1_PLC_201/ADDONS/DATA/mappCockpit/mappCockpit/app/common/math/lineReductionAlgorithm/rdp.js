define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //Algorithm from
    //http://mourner.github.io/simplify-js/
    var RDP = /** @class */ (function () {
        function RDP() {
            this.ratioX = 1;
            this.ratioY = 1;
        }
        // to suit your point format, run search/replace for '.x' and '.y';
        // for 3D version, see 3d branch (configurability would draw significant performance overhead)
        // square distance between 2 points
        RDP.prototype.getSqDist = function (p1, p2) {
            var dx = p1.x - p2.x, dy = p1.y - p2.y;
            return (dx / this.ratioX) * (dx / this.ratioX) + (dy / this.ratioY * dy / this.ratioY);
        };
        // square distance from a point to a segment
        RDP.prototype.getSqSegDist = function (p, p1, p2) {
            var x = p1.x, y = p1.y, dx = p2.x - x, dy = p2.y - y;
            if (dx !== 0 || dy !== 0) {
                var t = ((p.x - x) * dx + (p.y - y) * dy) / (dx * dx + dy * dy);
                if (t > 1) {
                    x = p2.x;
                    y = p2.y;
                }
                else if (t > 0) {
                    x += dx * t;
                    y += dy * t;
                }
            }
            dx = p.x - x;
            dy = p.y - y;
            return (dx / this.ratioX) * (dx / this.ratioX) + (dy / this.ratioY * dy / this.ratioY);
        };
        // rest of the code doesn't care about point format
        // basic distance-based simplification
        RDP.prototype.simplifyRadialDist = function (points, sqTolerance) {
            var prevPoint = points[0], newPoints = [prevPoint], point;
            for (var i = 1, len = points.length; i < len; i++) {
                point = points[i];
                if (this.getSqDist(point, prevPoint) > sqTolerance) {
                    newPoints.push(point);
                    prevPoint = point;
                }
            }
            if (prevPoint !== point)
                newPoints.push(point);
            return newPoints;
        };
        RDP.prototype.simplifyDPStep = function (points, first, last, sqTolerance, simplified) {
            var maxSqDist = sqTolerance, index;
            for (var i = first + 1; i < last; i++) {
                var sqDist = this.getSqSegDist(points[i], points[first], points[last]);
                if (sqDist > maxSqDist) {
                    index = i;
                    maxSqDist = sqDist;
                }
            }
            if (maxSqDist > sqTolerance) {
                if (index - first > 1)
                    this.simplifyDPStep(points, first, index, sqTolerance, simplified);
                simplified.push(points[index]);
                if (last - index > 1)
                    this.simplifyDPStep(points, index, last, sqTolerance, simplified);
            }
        };
        // simplification using Ramer-Douglas-Peucker algorithm
        RDP.prototype.simplifyDouglasPeucker = function (points, sqTolerance) {
            var last = points.length - 1;
            var simplified = [points[0]];
            this.simplifyDPStep(points, 0, last, sqTolerance, simplified);
            simplified.push(points[last]);
            return simplified;
        };
        // both algorithms combined for awesome performance
        // simplify(points: Array<IPoint>, tolerance: number, highestQuality: boolean) : Array<IPoint> {
        /**
         *
         * @param points
         * @param tolerance tolerance of the algorithm
         * @param ratioX ratio in the x-drection of the chart
         * @param ratioY ratio in the y-direction of the chart
         * @param highestQuality
         */
        RDP.prototype.simplify = function (points, tolerance, ratioX, ratioY, highestQuality) {
            if (points.length <= 2)
                return points;
            this.ratioX = ratioX;
            this.ratioY = ratioY;
            var sqTolerance = (tolerance !== undefined) ? tolerance * tolerance : 1;
            points = highestQuality ? points : this.simplifyRadialDist(points, sqTolerance);
            points = this.simplifyDouglasPeucker(points, sqTolerance);
            return points;
        };
        return RDP;
    }());
    exports.RDP = RDP;
    ;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmRwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vbWF0aC9saW5lUmVkdWN0aW9uQWxnb3JpdGhtL3JkcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFHQSxnQkFBZ0I7SUFDaEIsdUNBQXVDO0lBRXZDO1FBQUE7WUFDWSxXQUFNLEdBQVcsQ0FBQyxDQUFDO1lBQ25CLFdBQU0sR0FBVyxDQUFDLENBQUM7UUF3SC9CLENBQUM7UUF0SEcsbUVBQW1FO1FBQ25FLDhGQUE4RjtRQUU5RixtQ0FBbUM7UUFDbkMsdUJBQVMsR0FBVCxVQUFVLEVBQUUsRUFBRSxFQUFFO1lBRVosSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUNoQixFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBR2pCLE9BQU8sQ0FBQyxFQUFFLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsR0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkYsQ0FBQztRQUVILDRDQUE0QztRQUM1QywwQkFBWSxHQUFaLFVBQWEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFO1lBRWxCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQ1IsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQ1IsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUNiLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUVsQixJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFFdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxD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aEYsTUFBTSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFFMUQsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQztRQUNMLFVBQUM7SUFBRCxDQUFDLEFBMUhELElBMEhDO0lBMUhZLGtCQUFHO0lBMEhmLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJUkRQIH0gZnJvbSBcIi4uL2ludGVyZmFjZS9yZHBJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9jb21tb24vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5cclxuLy9BbGdvcml0aG0gZnJvbVxyXG4vL2h0dHA6Ly9tb3VybmVyLmdpdGh1Yi5pby9zaW1wbGlmeS1qcy9cclxuXHJcbmV4cG9ydCBjbGFzcyBSRFAgaW1wbGVtZW50cyBJUkRQIHsgXHJcbiAgICBwcml2YXRlIHJhdGlvWDogbnVtYmVyID0gMTtcclxuICAgIHByaXZhdGUgcmF0aW9ZOiBudW1iZXIgPSAxO1xyXG5cclxuICAgIC8vIHRvIHN1aXQgeW91ciBwb2ludCBmb3JtYXQsIHJ1biBzZWFyY2gvcmVwbGFjZSBmb3IgJy54JyBhbmQgJy55JztcclxuICAgIC8vIGZvciAzRCB2ZXJzaW9uLCBzZWUgM2QgYnJhbmNoIChjb25maWd1cmFiaWxpdHkgd291bGQgZHJhdyBzaWduaWZpY2FudCBwZXJmb3JtYW5jZSBvdmVyaGVhZClcclxuXHJcbiAgICAvLyBzcXVhcmUgZGlzdGFuY2UgYmV0d2VlbiAyIHBvaW50c1xyXG4gICAgZ2V0U3FEaXN0KHAxLCBwMikge1xyXG5cclxuICAgICAgICB2YXIgZHggPSBwMS54IC0gcDIueCxcclxuICAgICAgICAgICAgZHkgPSBwMS55IC0gcDIueTtcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gKGR4L3RoaXMucmF0aW9YKSAqIChkeCAvIHRoaXMucmF0aW9YKSArIChkeS90aGlzLnJhdGlvWSAqIGR5L3RoaXMucmF0aW9ZKTtcclxuICAgICAgfVxyXG5cclxuICAgIC8vIHNxdWFyZSBkaXN0YW5jZSBmcm9tIGEgcG9pbnQgdG8gYSBzZWdtZW50XHJcbiAgICBnZXRTcVNlZ0Rpc3QocCwgcDEsIHAyKSB7XHJcblxyXG4gICAgICAgIHZhciB4ID0gcDEueCxcclxuICAgICAgICAgICAgeSA9IHAxLnksXHJcbiAgICAgICAgICAgIGR4ID0gcDIueCAtIHgsXHJcbiAgICAgICAgICAgIGR5ID0gcDIueSAtIHk7XHJcblxyXG4gICAgICAgIGlmIChkeCAhPT0gMCB8fCBkeSAhPT0gMCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHQgPSAoKHAueCAtIHgpICogZHggKyAocC55IC0geSkgKiBkeSkgLyAoZHggKiBkeCArIGR5ICogZHkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHQgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICB4ID0gcDIueDtcclxuICAgICAgICAgICAgICAgIHkgPSBwMi55O1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgeCArPSBkeCAqIHQ7XHJcbiAgICAgICAgICAgICAgICB5ICs9IGR5ICogdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZHggPSBwLnggLSB4O1xyXG4gICAgICAgIGR5ID0gcC55IC0geTtcclxuXHJcbiAgICAgICAgcmV0dXJuIChkeC90aGlzLnJhdGlvWCkgKiAoZHggLyB0aGlzLnJhdGlvWCkgKyAoZHkvdGhpcy5yYXRpb1kgKiBkeS90aGlzLnJhdGlvWSk7XHJcbiAgICB9XHJcbiAgICAvLyByZXN0IG9mIHRoZSBjb2RlIGRvZXNuJ3QgY2FyZSBhYm91dCBwb2ludCBmb3JtYXRcclxuXHJcbiAgICAvLyBiYXNpYyBkaXN0YW5jZS1iYXNlZCBzaW1wbGlmaWNhdGlvblxyXG4gICAgc2ltcGxpZnlSYWRpYWxEaXN0KHBvaW50cywgc3FUb2xlcmFuY2UpIHtcclxuXHJcbiAgICAgICAgdmFyIHByZXZQb2ludCA9IHBvaW50c1swXSxcclxuICAgICAgICAgICAgbmV3UG9pbnRzID0gW3ByZXZQb2ludF0sXHJcbiAgICAgICAgICAgIHBvaW50O1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMSwgbGVuID0gcG9pbnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHBvaW50ID0gcG9pbnRzW2ldO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0U3FEaXN0KHBvaW50LCBwcmV2UG9pbnQpID4gc3FUb2xlcmFuY2UpIHtcclxuICAgICAgICAgICAgICAgIG5ld1BvaW50cy5wdXNoKHBvaW50KTtcclxuICAgICAgICAgICAgICAgIHByZXZQb2ludCA9IHBvaW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocHJldlBvaW50ICE9PSBwb2ludCkgbmV3UG9pbnRzLnB1c2gocG9pbnQpO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3UG9pbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIHNpbXBsaWZ5RFBTdGVwKHBvaW50cywgZmlyc3QsIGxhc3QsIHNxVG9sZXJhbmNlLCBzaW1wbGlmaWVkKSB7XHJcbiAgICAgICAgdmFyIG1heFNxRGlzdCA9IHNxVG9sZXJhbmNlLFxyXG4gICAgICAgICAgICBpbmRleDtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IGZpcnN0ICsgMTsgaSA8IGxhc3Q7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgc3FEaXN0ID0gdGhpcy5nZXRTcVNlZ0Rpc3QocG9pbnRzW2ldLCBwb2ludHNbZmlyc3RdLCBwb2ludHNbbGFzdF0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNxRGlzdCA+IG1heFNxRGlzdCkge1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBpO1xyXG4gICAgICAgICAgICAgICAgbWF4U3FEaXN0ID0gc3FEaXN0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobWF4U3FEaXN0ID4gc3FUb2xlcmFuY2UpIHtcclxuICAgICAgICAgICAgaWYgKGluZGV4IC0gZmlyc3QgPiAxKSB0aGlzLnNpbXBsaWZ5RFBTdGVwKHBvaW50cywgZmlyc3QsIGluZGV4LCBzcVRvbGVyYW5jZSwgc2ltcGxpZmllZCk7XHJcbiAgICAgICAgICAgIHNpbXBsaWZpZWQucHVzaChwb2ludHNbaW5kZXhdKTtcclxuICAgICAgICAgICAgaWYgKGxhc3QgLSBpbmRleCA+IDEpIHRoaXMuc2ltcGxpZnlEUFN0ZXAocG9pbnRzLCBpbmRleCwgbGFzdCwgc3FUb2xlcmFuY2UsIHNpbXBsaWZpZWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBzaW1wbGlmaWNhdGlvbiB1c2luZyBSYW1lci1Eb3VnbGFzLVBldWNrZXIgYWxnb3JpdGhtXHJcbiAgICBzaW1wbGlmeURvdWdsYXNQZXVja2VyKHBvaW50cywgc3FUb2xlcmFuY2UpIHtcclxuICAgICAgICB2YXIgbGFzdCA9IHBvaW50cy5sZW5ndGggLSAxO1xyXG5cclxuICAgICAgICB2YXIgc2ltcGxpZmllZCA9IFtwb2ludHNbMF1dO1xyXG4gICAgICAgIHRoaXMuc2ltcGxpZnlEUFN0ZXAocG9pbnRzLCAwLCBsYXN0LCBzcVRvbGVyYW5jZSwgc2ltcGxpZmllZCk7XHJcbiAgICAgICAgc2ltcGxpZmllZC5wdXNoKHBvaW50c1tsYXN0XSk7XHJcblxyXG4gICAgICAgIHJldHVybiBzaW1wbGlmaWVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGJvdGggYWxnb3JpdGhtcyBjb21iaW5lZCBmb3IgYXdlc29tZSBwZXJmb3JtYW5jZVxyXG4gICAgLy8gc2ltcGxpZnkocG9pbnRzOiBBcnJheTxJUG9pbnQ+LCB0b2xlcmFuY2U6IG51bWJlciwgaGlnaGVzdFF1YWxpdHk6IGJvb2xlYW4pIDogQXJyYXk8SVBvaW50PiB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHBvaW50cyBcclxuICAgICAgICAgKiBAcGFyYW0gdG9sZXJhbmNlIHRvbGVyYW5jZSBvZiB0aGUgYWxnb3JpdGhtXHJcbiAgICAgICAgICogQHBhcmFtIHJhdGlvWCByYXRpbyBpbiB0aGUgeC1kcmVjdGlvbiBvZiB0aGUgY2hhcnRcclxuICAgICAgICAgKiBAcGFyYW0gcmF0aW9ZIHJhdGlvIGluIHRoZSB5LWRpcmVjdGlvbiBvZiB0aGUgY2hhcnRcclxuICAgICAgICAgKiBAcGFyYW0gaGlnaGVzdFF1YWxpdHkgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc2ltcGxpZnkocG9pbnRzOiBBcnJheTxJUG9pbnQ+LCB0b2xlcmFuY2UsIHJhdGlvWDogbnVtYmVyLCByYXRpb1k6IG51bWJlciwgaGlnaGVzdFF1YWxpdHk6IGJvb2xlYW4pIDogQXJyYXk8SVBvaW50PiB7XHJcbiAgICAgICAgaWYgKHBvaW50cy5sZW5ndGggPD0gMikgcmV0dXJuIHBvaW50cztcclxuXHJcbiAgICAgICAgdGhpcy5yYXRpb1ggPSByYXRpb1g7XHJcbiAgICAgICAgdGhpcy5yYXRpb1kgPSByYXRpb1k7XHJcblxyXG4gICAgICAgIHZhciBzcVRvbGVyYW5jZSA9ICh0b2xlcmFuY2UgIT09IHVuZGVmaW5lZCkgPyB0b2xlcmFuY2UgKiB0b2xlcmFuY2UgOiAxO1xyXG5cclxuICAgICAgICBwb2ludHMgPSBoaWdoZXN0UXVhbGl0eSA/IHBvaW50cyA6IHRoaXMuc2ltcGxpZnlSYWRpYWxEaXN0KHBvaW50cywgc3FUb2xlcmFuY2UpO1xyXG5cclxuICAgICAgICBwb2ludHMgPSB0aGlzLnNpbXBsaWZ5RG91Z2xhc1BldWNrZXIocG9pbnRzLCBzcVRvbGVyYW5jZSk7XHJcblxyXG4gICAgICAgIHJldHVybiBwb2ludHM7XHJcbiAgICB9XHJcbn07XHJcbiJdfQ==