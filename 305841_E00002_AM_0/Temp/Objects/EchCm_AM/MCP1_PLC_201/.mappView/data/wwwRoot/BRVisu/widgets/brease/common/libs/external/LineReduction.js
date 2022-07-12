define([], function () {

    'use strict';

    /**
     * @class widgets.brease.common.libs.LineReduction
     * Algorithm from http://mourner.github.io/simplify-js/
     * This algorithm implements the Ramer-Douglas-Peucker Aglorithm
     * to reduce the number of points on a line without distorting the
     * shape of the line more than neccessary
     */

    var RDP = {
        ratioX: 1,
        ratioY: 1
    };
    // square distance between 2 points
    RDP.getSqDist = function (p1, p2) {

        var dx = p1.x - p2.x,
            dy = p1.y - p2.y;

        return dx * dx + dy * dy;
    };
    
    RDP.getSqSegDist = function (p, p1, p2) {

        var x = p1.x,
            y = p1.y,
            dx = p2.x - x,
            dy = p2.y - y;

        if (dx !== 0 || dy !== 0) {

            var t = ((p.x - x) * dx + (p.y - y) * dy) / (dx * dx + dy * dy);

            if (t > 1) {
                x = p2.x;
                y = p2.y;

            } else if (t > 0) {
                x += dx * t;
                y += dy * t;
            }
        }

        dx = p.x - x;
        dy = p.y - y;

        return (dx / this.ratioX) * (dx / this.ratioX) + (dy / this.ratioY * dy / this.ratioY);
    };

    RDP.simplifyRadialDist = function (points, sqTolerance) {

        var prevPoint = points[0],
            newPoints = [prevPoint],
            point;

        for (var i = 1, len = points.length; i < len; i++) {
            point = points[i];

            if (this.getSqDist(point, prevPoint) > sqTolerance) {
                newPoints.push(point);
                prevPoint = point;
            }
        }

        if (prevPoint !== point) newPoints.push(point);

        return newPoints;
    };

    RDP.simplifyDPStep = function (points, first, last, sqTolerance, simplified) {
        var maxSqDist = sqTolerance,
            index;

        for (var i = first + 1; i < last; i++) {
            var sqDist = this.getSqSegDist(points[i], points[first], points[last]);

            if (sqDist > maxSqDist) {
                index = i;
                maxSqDist = sqDist;
            }
        }

        if (maxSqDist > sqTolerance) {
            if (index - first > 1) this.simplifyDPStep(points, first, index, sqTolerance, simplified);
            simplified.push(points[index]);
            if (last - index > 1) this.simplifyDPStep(points, index, last, sqTolerance, simplified);
        }
    };

    /**
     * @method
     * simplification using Ramer-Douglas-Peucker algorithm
     * @param {Integer[]} points 
     * @param {Number} sqTolerance 
     */
    RDP.simplifyDouglasPeucker = function (points, sqTolerance) {
        var last = points.length - 1;

        var simplified = [points[0]];
        this.simplifyDPStep(points, 0, last, sqTolerance, simplified);
        simplified.push(points[last]);

        return simplified;
    };

    /**
     * @method
     * @param {Integer[]} points 
     * @param {Number} tolerance tolerance of the algorithm
     * @param {Number} ratioX ratio in the x-drection of the chart
     * @param {Number} ratioY ratio in the y-direction of the chart
     * @param {Boolean} highestQuality 
     */
    RDP.simplify = function (points, tolerance, ratioX, ratioY, highestQuality) {
        if (points.length <= 2) return points;

        this.ratioX = ratioX;
        this.ratioY = ratioY;

        var sqTolerance = (tolerance !== undefined) ? tolerance * tolerance : 1;

        points = highestQuality ? points : this.simplifyRadialDist(points, sqTolerance);
        points = this.simplifyDouglasPeucker(points, sqTolerance);

        return points;
    };
    
    return RDP;
});
