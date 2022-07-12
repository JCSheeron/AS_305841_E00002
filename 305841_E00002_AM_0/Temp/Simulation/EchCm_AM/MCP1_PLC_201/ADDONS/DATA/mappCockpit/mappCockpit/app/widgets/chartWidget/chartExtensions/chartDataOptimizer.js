define(["require", "exports", "../../../common/math/lineReductionAlgorithm/rdp", "../../../common/math/mathX"], function (require, exports, rdp_1, mathX_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Implements and optimizations for chart signal data
     *
     * @class ChartDataOptimizer
     */
    var ChartDataOptimizer = /** @class */ (function () {
        /**
         * Creates an instance of class ChartDataOptimizer
         * @param {IChartSeriesProvider} seriesProvider
         * @memberof ChartDataOptimizer
         */
        function ChartDataOptimizer(seriesProvider) {
            this._seriesProvider = seriesProvider;
            this.rdp = new rdp_1.RDP();
        }
        /**
        * The default method just passes the points originally
        *
        * @param {*} chartSeries
        * @param {*} chartInstance
        * @returns
        * @memberof ChartDataOptimizer
        */
        ChartDataOptimizer.prototype.trimSeriesForChartBounds = function (chartSeries, chartInstance) {
            var seriesName = chartSeries.name;
            var serie = this._seriesProvider.series.filter(function (serie) {
                //console.log(serie.id, seriesName);
                return serie.id === seriesName; //
            });
            var optimizedSeriesPoints = [];
            if (serie.length === 1) {
                var signalPoints = serie[0].rawPoints;
                for (var i = 0; i < signalPoints.length; i++) {
                    optimizedSeriesPoints.push(new ChartPoint(i, true, signalPoints[i].x, signalPoints[i].y));
                }
            }
            return optimizedSeriesPoints;
        };
        /**
        * Trims and optimizes the trace data to fit in the destination range and ui area.
        *
        * @param {*} chartSeries
        * @param {*} chartInstance
        * @returns
        * @memberof ChartDataOptimizer
        */
        ChartDataOptimizer.prototype.trimSeriesForChartBoundsXY = function (chartSeries, chartInstance) {
            return this.trimSeriesForChartBounds2D(chartSeries, chartInstance);
        };
        ChartDataOptimizer.prototype.trimSeriesForChartBoundsYt = function (chartSeries, chartInstance) {
            var canvasBounds = {
                x: chartInstance.canvasX,
                y: chartInstance.canvasY,
                width: chartInstance.canvasWidth,
                height: chartInstance.canvasHeight,
            };
            var seriesBounds = {
                xMin: chartSeries.xAxis.visibleRange.min,
                xMax: chartSeries.xAxis.visibleRange.max,
                xDelta: chartSeries.xAxis.visibleRange.delta,
                yMin: chartSeries.yAxis.visibleRange.min,
                yMax: chartSeries.yAxis.visibleRange.max,
                yDelta: chartSeries.yAxis.visibleRange.delta,
            };
            var seriesName = chartSeries.name;
            var series = this.getSeries(seriesName);
            var optimizedSeriesPoints = [];
            if (series) {
                // we use the display points for further line optimization processing
                var signalPoints = this.getDisplayPoints(series);
                // find the lower range index
                var iVisibleMin = this.findNearestIndex(signalPoints, chartSeries.xAxis.visibleRange.min, 0, signalPoints.length - 1);
                // adjust to the first min point outside the min axis range 
                while (signalPoints[iVisibleMin].x >= chartSeries.xAxis.visibleRange.min && iVisibleMin > 0) {
                    iVisibleMin--;
                }
                // find the upper range index
                var iVisibleMax = this.findNearestIndex(signalPoints, chartSeries.xAxis.visibleRange.max, 0, signalPoints.length - 1);
                // adjust to the first max point outside the max axis range 
                while (signalPoints[iVisibleMax].x <= chartSeries.xAxis.visibleRange.max && iVisibleMax < signalPoints.length - 1) {
                    iVisibleMax++;
                }
                // get points reduced and optimized for the visible bounds
                optimizedSeriesPoints = this.retriveReducedPointsWithinBounds(signalPoints, canvasBounds, seriesBounds, iVisibleMin, iVisibleMax);
            }
            return optimizedSeriesPoints;
        };
        /**
         * Creates point instances to be used for displaying based on the rawpoints.
         *
         * @private
         * @param {ChartViewSerie} series
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.getDisplayPoints = function (series) {
            // get the underlying series
            var effectiveSeries = series.serie;
            // create the display points if not yet defined
            if (!effectiveSeries.displayPoints) {
                effectiveSeries.displayPoints = effectiveSeries.rawPoints.map(function (rawPoint, index) { return new ChartPoint(index, true, rawPoint.x, rawPoint.y); });
            }
            return effectiveSeries.displayPoints ? effectiveSeries.displayPoints : [];
        };
        /**
         * Retrieves the requested series
         *
         * @private
         * @param {*} seriesName
         * @returns
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.getSeries = function (seriesName) {
            var seriesByName = this._seriesProvider.series.filter(function (serie) {
                return serie.id === seriesName;
            });
            return seriesByName.length == 1 ? seriesByName[0] : null;
        };
        /**
       * Finds the item nearest to the specified value
       *
       * @memberof ChartDataOptimizer
       */
        ChartDataOptimizer.prototype.findNearestIndex = function (array, value, iFirst, iLast) {
            // calculate the middle index
            var iMiddle = Math.floor((iFirst + iLast) / 2);
            // if the value matches, we have found the correct index
            if (value == array[iMiddle].x)
                return iMiddle;
            // if the the last possible index is reached, the index with the nearest index is selected
            if (iLast - 1 === iFirst)
                return Math.abs(array[iFirst].x - value) > Math.abs(array[iLast].x - value) ? iLast : iFirst;
            // if the value is greater continue on the higher remaining section
            if (value > array[iMiddle].x)
                return this.findNearestIndex(array, value, iMiddle, iLast);
            // if the value is greater continue on the lower remaining section
            if (value < array[iMiddle].x)
                return this.findNearestIndex(array, value, iFirst, iMiddle);
        };
        /**
     * Optimizes the pointts with respect to the visible area
     *
     * @param {*} points
     * @param {*} canvasBounds
     * @param {*} seriesBounds
     * @returns {*}
     * @memberof ChartDataOptimizer
     */
        ChartDataOptimizer.prototype.retriveReducedPointsWithinBounds = function (points, canvasBounds, seriesBounds, iMin, iMax) {
            var optimizedPoints = [];
            var visiblePointsCount = iMax - iMin;
            // If the points count is under the area pixel width there is no need to optimize.....
            if ((visiblePointsCount) < canvasBounds.width) {
                // ... so we just convert the visble points to chart points
                optimizedPoints = this.getChartPoints(points, iMin, iMax);
            }
            else {
                // ... otherwise we optimze the points to a reduced but still usefull amount.
                optimizedPoints = this.getReducedChartPointsWithinBounds(canvasBounds, seriesBounds, points, iMin, iMax);
            }
            return optimizedPoints;
        };
        /**
      *  Gets the chart points for the specefied range
      *
      * @private
      * @param {*} canvasBounds
      * @param {*} seriesBounds
      * @param {*} points
      * @param {*} iMin
      * @param {*} iMax
      * @param {any[]} pixelPoints
      * @returns
      * @memberof ChartDataOptimizer
      */
        ChartDataOptimizer.prototype.getChartPoints = function (points, iMin, iMax) {
            return points.filter(function (point, i) { return i >= iMin && i <= iMax; });
        };
        /**
         * Reduces the points to a useful count with respect to the visible area
         *
         * @private
         * @param {*} canvasBounds
         * @param {*} seriesBounds
         * @param {*} points
         * @param {*} iMin
         * @param {*} iMax
         * @param {any[]} pixelPoints
         * @returns
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.getReducedChartPointsWithinBounds = function (canvasBounds, seriesBounds, points, iMin, iMax) {
            // create the pixel point array
            // the width needs to be converted to integer because in the case of active browser zoom the width is passed as float value !
            var canvasWidth = Math.ceil(canvasBounds.width);
            var pixelPoints = new Array(canvasWidth);
            // create a set for receiving the visible points to avoid duplicates
            var optimizedPoints = new Set();
            var xScale = canvasBounds.width / seriesBounds.xDelta;
            if (points.length > 1) {
                for (var iVisiblePoint = iMin; iVisiblePoint <= iMax; iVisiblePoint++) {
                    this.reducePixelPoints(points[iVisiblePoint], seriesBounds, xScale, iVisiblePoint, pixelPoints);
                }
                for (var i = 0; i < pixelPoints.length; i++) {
                    var pixelPoint = pixelPoints[i];
                    if (pixelPoint !== undefined) {
                        this.addPixelSubPoints(pixelPoint, i, optimizedPoints);
                    }
                }
            }
            return Array.from(optimizedPoints);
        };
        /**
       * Adds additional points for marking min and max values within a segment
       *
       * @private
       * @param {*} pixelPoint
       * @param {number} i
       * @param {ChartPoint[]} optimizedPoints
       * @memberof ChartDataOptimizer
       */
        ChartDataOptimizer.prototype.addPixelSubPoints = function (pixelPoint, i, optimizedPoints) {
            // add the first pixel point
            this.addOptimizedPoint(optimizedPoints, i, pixelPoint.firstPoint);
            // add min max points
            if (pixelPoint.yMinPoint.index <= pixelPoint.yMaxPoint.index) {
                this.addOptimizedPoint(optimizedPoints, i, pixelPoint.yMinPoint);
                this.addOptimizedPoint(optimizedPoints, i, pixelPoint.yMaxPoint);
            }
            else {
                this.addOptimizedPoint(optimizedPoints, i, pixelPoint.yMaxPoint);
                this.addOptimizedPoint(optimizedPoints, i, pixelPoint.yMinPoint);
            }
            // add the last point
            this.addOptimizedPoint(optimizedPoints, i, pixelPoint.lastPoint);
        };
        /**
         * Creates and adds a chart point
         *
         * @private
         * @param {ChartPoint[]} optimizedPoints
         * @param {number} i
         * @param {*} pixelPoint
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.addOptimizedPoint = function (optimizedPoints, i, pixelPoint) {
            optimizedPoints.add(pixelPoint);
        };
        /**
         * Finds the maximum within an array
         *
         * @param {*} values
         * @returns
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.findMaximum = function (values) {
            var max = values[0];
            for (var i = 0; i < values.length; i++) {
                var value = values[i];
                max = value > max ? value : max;
            }
            return max;
        };
        /**
       * Reduces the pixel points respecting the point density on pixels
       *
       * @private
       * @param {*} visiblePoint
       * @param {*} seriesBounds
       * @param {number} xScale
       * @param {*} iVisiblePoint
       * @param {any[]} pixelPoints
       * @memberof ChartDataOptimizer
       */
        ChartDataOptimizer.prototype.reducePixelPoints = function (visiblePoint, seriesBounds, xScale, iVisiblePoint, pixelPoints) {
            // calculate the pixel offset to axis min
            var xOffset = (visiblePoint.x - seriesBounds.xMin) * (xScale);
            // get the pixel index
            var iPixel = Math.round(xOffset);
            visiblePoint.index = iVisiblePoint;
            this.addPointsForXPixel(pixelPoints, visiblePoint, iPixel);
        };
        /**
         * Adds a point for a corrsponding pixel location
         *
         * @private
         * @param {any[]} pixelPoints
         * @param {number} iPixel
         * @param {*} signalPoint
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.addPointsForXPixel = function (pixelPoints, signalPoint, iPixel) {
            if (!pixelPoints[iPixel]) {
                // define the first point for this pixel
                pixelPoints[iPixel] = {};
                // initialize the last point as default
                pixelPoints[iPixel].firstPoint = signalPoint;
                pixelPoints[iPixel].lastPoint = signalPoint;
                pixelPoints[iPixel].yMaxPoint = signalPoint;
                pixelPoints[iPixel].yMinPoint = signalPoint;
            }
            else {
                // update the last point for following values on the same pixel
                pixelPoints[iPixel].lastPoint = signalPoint;
                // update min,max
                if (signalPoint.y > pixelPoints[iPixel].yMaxPoint.y) {
                    // update the point containing yMax
                    pixelPoints[iPixel].yMaxPoint = signalPoint;
                }
                if (signalPoint.y < pixelPoints[iPixel].yMinPoint.y) {
                    // update the point containing yMin
                    pixelPoints[iPixel].yMinPoint = signalPoint;
                }
            }
        };
        /**
         * Trims or optimizes series point to be display within a 2D chart
         *
         * @param {*} chartSeries
         * @param {*} chartInstance
         * @returns
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.trimSeriesForChartBounds2D = function (chartSeries, chartInstance) {
            // the chart points to be calculated
            var chartPoints = [];
            // get the canvas bounds in pixel
            var canvasBounds = this.getChartAreaBoundsInPixel(chartInstance);
            // get the chart area bounds
            var chartAreaBounds = this.getChartAreaBounds(chartSeries);
            // get the series with a matching name
            var dataSeries = this.getSeriesData(chartSeries);
            if (dataSeries) {
                // get the original unmodified points 
                var rawPoints = dataSeries.rawPoints;
                // get the initially simplified data
                var viewPointsData = dataSeries.data;
                // retrieve the points to be displayed       
                var viewSeriesPoints = viewPointsData;
                console.time("calculate reduced chart points");
                // retrieve the visible segment points
                chartPoints = this.retrieveVisibleLineSegmentPoints(viewSeriesPoints, chartAreaBounds);
                // get raw points count covered by the visible segments
                var rawVisiblePointsCount = chartPoints.length > 0 ? chartPoints[chartPoints.length - 1].index - chartPoints[0].index + 1 : 0;
                if (rawVisiblePointsCount > 0) {
                    // calculate the current chart units/pixel
                    var kXUnitsPerPixel = chartAreaBounds.xDelta / canvasBounds.width;
                    var kYUnitsPerPixel = chartAreaBounds.yDelta / canvasBounds.height;
                    // if the current coordinate to pixel ratio falls below the initial ration we need to recalculate the simplified points for the current given view port
                    // to get the best matching approximated simplified line. 
                    if (this.isDetailZoomLevel(viewPointsData, kXUnitsPerPixel, kYUnitsPerPixel)) {
                        // retrieve the points with the precision for requested zoom level 
                        chartPoints = this.retrieveDetailedChartPoints(chartPoints, rawPoints, chartAreaBounds, kXUnitsPerPixel, kYUnitsPerPixel);
                    }
                }
                console.timeEnd("calculate reduced chart points");
                console.log("optimized points: %o", chartPoints.length);
            }
            var optimizedPoints = chartPoints.map(function (point, i) { return new ChartPoint(point.index, point.visible, point.x, point.y); });
            return optimizedPoints;
        };
        /**
         * Gets
         *
         * @private
         * @param {*} chartSeries
         * @returns
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.getSeriesData = function (chartSeries) {
            var chartViewSeries = this._seriesProvider.series.find(function (series) { return series.id === chartSeries.name; });
            var dataSeries = chartViewSeries ? chartViewSeries.serie : undefined;
            return dataSeries;
        };
        /**
         * Retrieves the data points necessary to satisfy the specified chart bounds and zoom ratio.
         *
         * @private
         * @param {SeriesPoint[]} chartPoints
         * @param {IPoint[]} rawPoints
         * @param {{ xMin: any; xMax: any; xDelta: any; yMin: any; yMax: any; yDelta: any; }} chartAreaBounds
         * @param {number} currentChartPixelRatioX
         * @param {number} currentChartPixelRationY
         * @returns
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.retrieveDetailedChartPoints = function (chartPoints, rawPoints, chartAreaBounds, currentChartPixelRatioX, currentChartPixelRationY) {
            var lastRawIndex = chartPoints[chartPoints.length - 1].index;
            var firstVisibleRawPointIndex = chartPoints[0].index;
            var lastVisibleRawPointIndex = lastRawIndex < rawPoints.length ? lastRawIndex + 1 : rawPoints.length;
            // retrieve the raw points covered by the visible segments
            var rawVisiblePoints = rawPoints.slice(firstVisibleRawPointIndex, lastVisibleRawPointIndex);
            // update point indices
            this.updateVisibilityIndices(rawVisiblePoints);
            // retrieve the visible line segment points
            chartPoints = this.retrieveVisibleLineSegmentPoints(rawVisiblePoints, chartAreaBounds);
            // if the numbert of chart points is still too high, we need to further simplify the data points
            if (chartPoints.length > 1000) {
                // simplify the remaining visible points according the specified precision and ratio
                chartPoints = this.rdp.simplify(rawVisiblePoints, 0.25, currentChartPixelRatioX, currentChartPixelRationY, false);
                // update point indices
                this.updateVisibilityIndices(chartPoints);
                // retrieve the visible segment points
                chartPoints = this.retrieveVisibleLineSegmentPoints(chartPoints, chartAreaBounds);
            }
            return chartPoints;
        };
        /**
         *
         *
         * @private
         * @param {*} viewPointsData
         * @param {number} currentChartPixelRatioX
         * @param {number} currentChartPixelRationY
         * @returns
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.isDetailZoomLevel = function (viewPointsData, currentChartPixelRatioX, currentChartPixelRationY) {
            return currentChartPixelRatioX < viewPointsData.pixelRatioX || currentChartPixelRationY < viewPointsData.pixelRatioY;
        };
        /**
         * Updates the indices of the points
         *
         * @private
         * @param {IPoint[]} reducedVisiblePoints
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.updateVisibilityIndices = function (points) {
            var seriesPoints = points;
            seriesPoints.forEach(function (point, index) { point.index = index; });
        };
        /**
         * Gets the chart area bounds in pixel
         *
         * @private
         * @param {*} chartInstance
         * @returns {{x:number,y:number,width:number,height:number}}
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.getChartAreaBoundsInPixel = function (chartInstance) {
            return {
                x: chartInstance.canvasX,
                y: chartInstance.canvasY,
                width: chartInstance.canvasWidth,
                height: chartInstance.canvasHeight,
            };
        };
        /**
         * Gets the visible chart area bounds in coordinate units
         *
         * @private
         * @param {*} chartSeries
         * @returns
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.getChartAreaBounds = function (chartSeries) {
            var chartAreaBounds = {
                xMin: chartSeries.xAxis.range.min,
                xMax: chartSeries.xAxis.range.max,
                xDelta: chartSeries.xAxis.range.delta,
                yMin: chartSeries.yAxis.range.min,
                yMax: chartSeries.yAxis.range.max,
                yDelta: chartSeries.yAxis.range.delta,
            };
            return chartAreaBounds;
        };
        /**
         * Determines if a line intersects a rectangle
         *
         * @param {IPoint} p1
         * @param {IPoint} p2
         * @param {Bounds} bounds
         * @returns
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.lineIntersectsRectangle = function (p1, p2, bounds) {
            // exclude non intersecting lines
            if ((p1.x < bounds.xMin && p2.x < bounds.xMin) || (p1.y < bounds.yMin && p2.y < bounds.yMin) || (p1.x > bounds.xMax && p2.x > bounds.xMax) || (p1.y > bounds.yMax && p2.y > bounds.yMax))
                return false;
            if (this.rectangleContainsPoint(p1, bounds) || this.rectangleContainsPoint(p2, bounds)) {
                return true;
            }
            try {
                // calculate dy/dx
                var k = (p2.y - p1.y) / (p2.x - p1.x);
                // check if line intersects left border
                var yIntersect = p1.y + k * (bounds.xMin - p1.x);
                if (yIntersect >= bounds.yMin && yIntersect <= bounds.yMax)
                    return true;
                // check if line intersects right border
                yIntersect = p1.y + k * (bounds.xMax - p1.x);
                if (yIntersect >= bounds.yMin && yIntersect <= bounds.yMax)
                    return true;
                // check if line intersects bottom border
                var xIntersec = p1.x + (bounds.yMin - p1.y) / k;
                if (xIntersec >= bounds.xMin && xIntersec <= bounds.xMax)
                    return true;
                // check if line intersects top border
                xIntersec = p1.x + (bounds.yMax - p1.y) / k;
                if (xIntersec >= bounds.xMin && xIntersec <= bounds.xMax)
                    return true;
            }
            catch (error) {
                console.error("lineIntersectsRectangle");
            }
            return false;
        };
        /**
         * Retrieves the line segment points for segments intersecting the specified bounds. The methods adds, if necessary invisible line segments by adding invisible helkper points.
         *
         * @private
         * @param {IPoint[]} points
         * @param {Bounds} bounds
         * @returns
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.retrieveVisibleLineSegmentPoints = function (points, bounds) {
            if (points.length < 2)
                return points;
            // the available point as series points
            var seriesPoints = points;
            // create the result segment points array
            var lineSegmentPoints = [];
            // holds the last added end point.
            var lastEndPoint = null;
            for (var i = 1; i < seriesPoints.length; i++) {
                var pStart = seriesPoints[i - 1];
                var pEnd = seriesPoints[i];
                // check if the line intersects the specified bounds
                if (this.lineIntersectsRectangle(pStart, pEnd, bounds)) {
                    if (!lastEndPoint) {
                        // at the very beginning we need to add the first start point
                        pStart.visible = true;
                        lineSegmentPoints.push(pStart);
                    }
                    else {
                        // now we continue the line ....
                        // if the line is interrupted ( start and previous end index is not the same), we need to add an invisible helper point to create an invisible segment.
                        // additionally we need to add the start point of the next visible line segment.
                        if (pStart.index != lastEndPoint.index) {
                            // create an invisible helper point
                            var invisibleSegmenStartPoint = Object.create(lastEndPoint);
                            invisibleSegmenStartPoint.visible = false;
                            // add the invisible helper point
                            lineSegmentPoints.push(invisibleSegmenStartPoint);
                            // add the start point of next visible line segment. This is where the line segment is to be continued.
                            pStart.visible = true;
                            lineSegmentPoints.push(pStart);
                        }
                    }
                    // just add the next visible end point
                    pEnd.visible = true;
                    lineSegmentPoints.push(pEnd);
                    lastEndPoint = pEnd;
                }
            }
            return lineSegmentPoints;
        };
        ChartDataOptimizer.prototype.rectangleContainsPoint = function (point, bounds) {
            var xMinDiff = point.x - bounds.xMin;
            var xMaxDiff = bounds.xMax - point.x;
            var yMinDiff = point.y - bounds.yMin;
            var yMaxDiff = bounds.yMax - point.y;
            var xWithinRange = xMinDiff >= 0 && xMaxDiff >= 0;
            var yWithinRange = yMinDiff >= 0 && yMaxDiff >= 0;
            // const xWithinRange = point.x >= bounds.xMin && point.x <= bounds.xMax;
            // const yWithinRange = point.y >= bounds.yMin && point.y <= bounds.yMax;
            var rectanglesContainsPoint = xWithinRange && yWithinRange;
            return rectanglesContainsPoint;
        };
        /**
         * Attaches a series to the chart optimizer. The method in fact just calculates and updates the series bounds.
         *
         * @param {BaseSeries} serie
         * @returns
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.attachSeries = function (serie) {
            if (serie.rawPoints.length > 1) {
                var signalPoints = serie.rawPoints;
                var xValues = signalPoints.map(function (point) { return point.x; });
                var yValues = signalPoints.map(function (point) { return point.y; });
                var xMin = mathX_1.MathX.min(xValues);
                var xMax = mathX_1.MathX.max(xValues);
                var yMin = mathX_1.MathX.min(yValues);
                var yMax = mathX_1.MathX.max(yValues);
                // update the series bounds
                serie.bounds = { xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax, width: (xMax - xMin), height: (yMax - yMin) };
                this.clearSeriesDisplayPoints(serie);
            }
            return serie;
        };
        /**
         * Clears eventually existing display points.
         *
         * @private
         * @param {BaseSeries} serie
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.clearSeriesDisplayPoints = function (serie) {
            serie.displayPoints = null;
        };
        return ChartDataOptimizer;
    }());
    exports.ChartDataOptimizer = ChartDataOptimizer;
    /**
     * Implements the chart point class
     *
     * @class ChartPoint
     */
    var ChartPoint = /** @class */ (function () {
        function ChartPoint(index, visible, x, y) {
            this.index = index;
            this.x = x;
            this.y = y;
            this.xValue = x;
            this.YValues = [y];
            this.visible = visible;
        }
        return ChartPoint;
    }());
    exports.ChartPoint = ChartPoint;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnREYXRhT3B0aW1pemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0V2lkZ2V0L2NoYXJ0RXh0ZW5zaW9ucy9jaGFydERhdGFPcHRpbWl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBVUE7Ozs7T0FJRztJQUNIO1FBT0k7Ozs7V0FJRztRQUNILDRCQUFZLGNBQW9DO1lBQzVDLElBQUksQ0FBQyxlQUFlLEdBQUcsY0FBYyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxTQUFHLEVBQUUsQ0FBQztRQUN6QixDQUFDO1FBR0Q7Ozs7Ozs7VUFPRTtRQUNGLHFEQUF3QixHQUF4QixVQUF5QixXQUFXLEVBQUUsYUFBYTtZQUUvQyxJQUFJLFVBQVUsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO1lBQ2xDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEtBQUs7Z0JBQ2pELG9DQUFvQztnQkFDcEMsT0FBTyxLQUFLLENBQUMsRUFBRSxLQUFLLFVBQVUsQ0FBQyxDQUFBLEVBQUU7WUFDckMsQ0FBQyxDQUFDLENBQUM7WUFHSCxJQUFJLHFCQUFxQixHQUFpQixFQUFFLENBQUM7WUFFN0MsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDcEIsSUFBSSxZQUFZLEdBQVMsS0FBSyxDQUFDLENBQUMsQ0FBRSxDQUFDLFNBQVMsQ0FBQztnQkFFN0MsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxDQUFDLEVBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFD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QUM7WUFDWCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDM0IsQ0FBQztRQUNMLGlCQUFDO0lBQUQsQ0FBQyxBQWpCRCxJQWlCQztJQWpCWSxnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY29tbW9uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY29tbW9uL3Nlcmllcy9iYXNlU2VyaWVzXCI7XHJcbmltcG9ydCB7IFJEUCB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vbWF0aC9saW5lUmVkdWN0aW9uQWxnb3JpdGhtL3JkcFwiO1xyXG5pbXBvcnQgeyBDaGFydFZpZXdTZXJpZSB9IGZyb20gXCIuLi9jaGFydFZpZXdTZXJpZVwiO1xyXG5pbXBvcnQgeyBNYXRoWCB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vbWF0aC9tYXRoWFwiO1xyXG5cclxuXHJcbnR5cGUgQm91bmRzID0geyB4TWluOiBudW1iZXI7IHhNYXg6IG51bWJlcjsgeU1pbjogbnVtYmVyOyB5TWF4OiBudW1iZXJ9OyBcclxudHlwZSBTZXJpZXNQb2ludCA9IElQb2ludCAmIHsgdmlzaWJsZTpib29sZWFuLCBpbmRleH07XHJcblxyXG4vKipcclxuICogSW1wbGVtZW50cyBhbmQgb3B0aW1pemF0aW9ucyBmb3IgY2hhcnQgc2lnbmFsIGRhdGFcclxuICpcclxuICogQGNsYXNzIENoYXJ0RGF0YU9wdGltaXplclxyXG4gKi9cclxuY2xhc3MgQ2hhcnREYXRhT3B0aW1pemVyIHtcclxuXHJcbiAgICAvLyBob2xkcyB0aGUgY2hhcnQgc2lnbmFscyBzb3VyY2VcclxuICAgIHByaXZhdGUgX3Nlcmllc1Byb3ZpZGVyOiBJQ2hhcnRTZXJpZXNQcm92aWRlcjtcclxuICAgIHByaXZhdGUgcmRwOiBSRFA7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBjbGFzcyBDaGFydERhdGFPcHRpbWl6ZXJcclxuICAgICAqIEBwYXJhbSB7SUNoYXJ0U2VyaWVzUHJvdmlkZXJ9IHNlcmllc1Byb3ZpZGVyXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnREYXRhT3B0aW1pemVyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHNlcmllc1Byb3ZpZGVyOiBJQ2hhcnRTZXJpZXNQcm92aWRlcikge1xyXG4gICAgICAgIHRoaXMuX3Nlcmllc1Byb3ZpZGVyID0gc2VyaWVzUHJvdmlkZXI7XHJcbiAgICAgICAgdGhpcy5yZHAgPSBuZXcgUkRQKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBUaGUgZGVmYXVsdCBtZXRob2QganVzdCBwYXNzZXMgdGhlIHBvaW50cyBvcmlnaW5hbGx5XHJcbiAgICAqXHJcbiAgICAqIEBwYXJhbSB7Kn0gY2hhcnRTZXJpZXNcclxuICAgICogQHBhcmFtIHsqfSBjaGFydEluc3RhbmNlXHJcbiAgICAqIEByZXR1cm5zXHJcbiAgICAqIEBtZW1iZXJvZiBDaGFydERhdGFPcHRpbWl6ZXJcclxuICAgICovXHJcbiAgICB0cmltU2VyaWVzRm9yQ2hhcnRCb3VuZHMoY2hhcnRTZXJpZXMsIGNoYXJ0SW5zdGFuY2UpOiBJUG9pbnRbXSB7XHJcblxyXG4gICAgICAgIGxldCBzZXJpZXNOYW1lID0gY2hhcnRTZXJpZXMubmFtZTtcclxuICAgICAgICBsZXQgc2VyaWUgPSB0aGlzLl9zZXJpZXNQcm92aWRlci5zZXJpZXMuZmlsdGVyKChzZXJpZSkgPT4ge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHNlcmllLmlkLCBzZXJpZXNOYW1lKTtcclxuICAgICAgICAgICAgcmV0dXJuIHNlcmllLmlkID09PSBzZXJpZXNOYW1lOy8vXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICBsZXQgb3B0aW1pemVkU2VyaWVzUG9pbnRzOiBDaGFydFBvaW50W10gPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKHNlcmllLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICBsZXQgc2lnbmFsUG9pbnRzID0gKDxhbnk+c2VyaWVbMF0pLnJhd1BvaW50cztcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2lnbmFsUG9pbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpbWl6ZWRTZXJpZXNQb2ludHMucHVzaChuZXcgQ2hhcnRQb2ludChpLHRydWUsIHNpZ25hbFBvaW50c1tpXS54LCBzaWduYWxQb2ludHNbaV0ueSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvcHRpbWl6ZWRTZXJpZXNQb2ludHM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBUcmltcyBhbmQgb3B0aW1pemVzIHRoZSB0cmFjZSBkYXRhIHRvIGZpdCBpbiB0aGUgZGVzdGluYXRpb24gcmFuZ2UgYW5kIHVpIGFyZWEuXHJcbiAgICAqXHJcbiAgICAqIEBwYXJhbSB7Kn0gY2hhcnRTZXJpZXNcclxuICAgICogQHBhcmFtIHsqfSBjaGFydEluc3RhbmNlXHJcbiAgICAqIEByZXR1cm5zXHJcbiAgICAqIEBtZW1iZXJvZiBDaGFydERhdGFPcHRpbWl6ZXJcclxuICAgICovXHJcbiAgICB0cmltU2VyaWVzRm9yQ2hhcnRCb3VuZHNYWShjaGFydFNlcmllcywgY2hhcnRJbnN0YW5jZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRyaW1TZXJpZXNGb3JDaGFydEJvdW5kczJEKGNoYXJ0U2VyaWVzLCBjaGFydEluc3RhbmNlKTtcclxuICAgIH1cclxuXHJcbiAgICB0cmltU2VyaWVzRm9yQ2hhcnRCb3VuZHNZdChjaGFydFNlcmllcywgY2hhcnRJbnN0YW5jZSkge1xyXG5cclxuICAgICAgICBsZXQgY2FudmFzQm91bmRzID0ge1xyXG4gICAgICAgICAgICB4OiBjaGFydEluc3RhbmNlLmNhbnZhc1gsXHJcbiAgICAgICAgICAgIHk6IGNoYXJ0SW5zdGFuY2UuY2FudmFzWSxcclxuICAgICAgICAgICAgd2lkdGg6IGNoYXJ0SW5zdGFuY2UuY2FudmFzV2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodDogY2hhcnRJbnN0YW5jZS5jYW52YXNIZWlnaHQsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGV0IHNlcmllc0JvdW5kcyA9IHtcclxuICAgICAgICAgICAgeE1pbjogY2hhcnRTZXJpZXMueEF4aXMudmlzaWJsZVJhbmdlLm1pbixcclxuICAgICAgICAgICAgeE1heDogY2hhcnRTZXJpZXMueEF4aXMudmlzaWJsZVJhbmdlLm1heCxcclxuICAgICAgICAgICAgeERlbHRhOiBjaGFydFNlcmllcy54QXhpcy52aXNpYmxlUmFuZ2UuZGVsdGEsXHJcblxyXG4gICAgICAgICAgICB5TWluOiBjaGFydFNlcmllcy55QXhpcy52aXNpYmxlUmFuZ2UubWluLFxyXG4gICAgICAgICAgICB5TWF4OiBjaGFydFNlcmllcy55QXhpcy52aXNpYmxlUmFuZ2UubWF4LFxyXG4gICAgICAgICAgICB5RGVsdGE6IGNoYXJ0U2VyaWVzLnlBeGlzLnZpc2libGVSYW5nZS5kZWx0YSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsZXQgc2VyaWVzTmFtZSA9IGNoYXJ0U2VyaWVzLm5hbWU7XHJcbiAgICAgICAgbGV0IHNlcmllcyA9IHRoaXMuZ2V0U2VyaWVzKHNlcmllc05hbWUpO1xyXG5cclxuXHJcbiAgICAgICAgbGV0IG9wdGltaXplZFNlcmllc1BvaW50czogQ2hhcnRQb2ludFtdID0gW107XHJcblxyXG4gICAgICAgIGlmIChzZXJpZXMpIHtcclxuICBcclxuICAgICAgICAgICAgLy8gd2UgdXNlIHRoZSBkaXNwbGF5IHBvaW50cyBmb3IgZnVydGhlciBsaW5lIG9wdGltaXphdGlvbiBwcm9jZXNzaW5nXHJcbiAgICAgICAgICAgIGxldCBzaWduYWxQb2ludHMgPSB0aGlzLmdldERpc3BsYXlQb2ludHMoc2VyaWVzKSBhcyBJUG9pbnRbXTtcclxuXHJcbiAgICAgICAgICAgIC8vIGZpbmQgdGhlIGxvd2VyIHJhbmdlIGluZGV4XHJcbiAgICAgICAgICAgIGxldCBpVmlzaWJsZU1pbiA9IHRoaXMuZmluZE5lYXJlc3RJbmRleChzaWduYWxQb2ludHMsIGNoYXJ0U2VyaWVzLnhBeGlzLnZpc2libGVSYW5nZS5taW4sIDAsIHNpZ25hbFBvaW50cy5sZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgLy8gYWRqdXN0IHRvIHRoZSBmaXJzdCBtaW4gcG9pbnQgb3V0c2lkZSB0aGUgbWluIGF4aXMgcmFuZ2UgXHJcbiAgICAgICAgICAgIHdoaWxlIChzaWduYWxQb2ludHNbaVZpc2libGVNaW5dLnggPj0gY2hhcnRTZXJpZXMueEF4aXMudmlzaWJsZVJhbmdlLm1pbiAmJiBpVmlzaWJsZU1pbiA+IDApIHtcclxuICAgICAgICAgICAgICAgIGlWaXNpYmxlTWluLS07ICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gZmluZCB0aGUgdXBwZXIgcmFuZ2UgaW5kZXhcclxuICAgICAgICAgICAgbGV0IGlWaXNpYmxlTWF4ID0gdGhpcy5maW5kTmVhcmVzdEluZGV4KHNpZ25hbFBvaW50cywgY2hhcnRTZXJpZXMueEF4aXMudmlzaWJsZVJhbmdlLm1heCwgMCwgc2lnbmFsUG9pbnRzLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICAvLyBhZGp1c3QgdG8gdGhlIGZpcnN0IG1heCBwb2ludCBvdXRzaWRlIHRoZSBtYXggYXhpcyByYW5nZSBcclxuICAgICAgICAgICAgd2hpbGUgKHNpZ25hbFBvaW50c1tpVmlzaWJsZU1heF0ueCA8PSBjaGFydFNlcmllcy54QXhpcy52aXNpYmxlUmFuZ2UubWF4ICYmIGlWaXNpYmxlTWF4IDwgc2lnbmFsUG9pbnRzLmxlbmd0aC0xKSB7XHJcbiAgICAgICAgICAgICAgICBpVmlzaWJsZU1heCsrOyAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGdldCBwb2ludHMgcmVkdWNlZCBhbmQgb3B0aW1pemVkIGZvciB0aGUgdmlzaWJsZSBib3VuZHNcclxuICAgICAgICAgICAgb3B0aW1pemVkU2VyaWVzUG9pbnRzID0gdGhpcy5yZXRyaXZlUmVkdWNlZFBvaW50c1dpdGhpbkJvdW5kcyhzaWduYWxQb2ludHMsIGNhbnZhc0JvdW5kcywgc2VyaWVzQm91bmRzLCBpVmlzaWJsZU1pbiwgaVZpc2libGVNYXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG9wdGltaXplZFNlcmllc1BvaW50cztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHBvaW50IGluc3RhbmNlcyB0byBiZSB1c2VkIGZvciBkaXNwbGF5aW5nIGJhc2VkIG9uIHRoZSByYXdwb2ludHMuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Q2hhcnRWaWV3U2VyaWV9IHNlcmllc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0RGF0YU9wdGltaXplclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldERpc3BsYXlQb2ludHMoc2VyaWVzOiBDaGFydFZpZXdTZXJpZSk6IElQb2ludFtdIHtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSB1bmRlcmx5aW5nIHNlcmllc1xyXG4gICAgICAgIGxldCBlZmZlY3RpdmVTZXJpZXMgPSAoPGFueT5zZXJpZXMpLnNlcmllO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgdGhlIGRpc3BsYXkgcG9pbnRzIGlmIG5vdCB5ZXQgZGVmaW5lZFxyXG4gICAgICAgIGlmICghZWZmZWN0aXZlU2VyaWVzLmRpc3BsYXlQb2ludHMpIHtcclxuICAgICAgICAgICAgZWZmZWN0aXZlU2VyaWVzLmRpc3BsYXlQb2ludHMgPSBlZmZlY3RpdmVTZXJpZXMucmF3UG9pbnRzLm1hcCgocmF3UG9pbnQsIGluZGV4KSA9PiB7IHJldHVybiBuZXcgQ2hhcnRQb2ludChpbmRleCwgdHJ1ZSwgcmF3UG9pbnQueCwgcmF3UG9pbnQueSk7IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWZmZWN0aXZlU2VyaWVzLmRpc3BsYXlQb2ludHMgPyBlZmZlY3RpdmVTZXJpZXMuZGlzcGxheVBvaW50cyA6W107XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMgdGhlIHJlcXVlc3RlZCBzZXJpZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzZXJpZXNOYW1lXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0RGF0YU9wdGltaXplclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFNlcmllcyhzZXJpZXNOYW1lOiBhbnkpIHtcclxuICAgICAgICBsZXQgc2VyaWVzQnlOYW1lID0gdGhpcy5fc2VyaWVzUHJvdmlkZXIuc2VyaWVzLmZpbHRlcigoc2VyaWUpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHNlcmllLmlkID09PSBzZXJpZXNOYW1lO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuICBzZXJpZXNCeU5hbWUubGVuZ3RoID09IDEgPyBzZXJpZXNCeU5hbWVbMF06IG51bGw7XHJcbiAgICBcclxuICAgIH1cclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICogRmluZHMgdGhlIGl0ZW0gbmVhcmVzdCB0byB0aGUgc3BlY2lmaWVkIHZhbHVlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0RGF0YU9wdGltaXplclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGZpbmROZWFyZXN0SW5kZXgoYXJyYXksIHZhbHVlLCBpRmlyc3QsIGlMYXN0OiBudW1iZXIpIHtcclxuXHJcbiAgICAgICAgLy8gY2FsY3VsYXRlIHRoZSBtaWRkbGUgaW5kZXhcclxuICAgICAgICBjb25zdCBpTWlkZGxlID0gTWF0aC5mbG9vcigoaUZpcnN0ICsgaUxhc3QpIC8gMik7XHJcblxyXG4gICAgICAgIC8vIGlmIHRoZSB2YWx1ZSBtYXRjaGVzLCB3ZSBoYXZlIGZvdW5kIHRoZSBjb3JyZWN0IGluZGV4XHJcbiAgICAgICAgaWYgKHZhbHVlID09IGFycmF5W2lNaWRkbGVdLngpIHJldHVybiBpTWlkZGxlO1xyXG5cclxuICAgICAgICAvLyBpZiB0aGUgdGhlIGxhc3QgcG9zc2libGUgaW5kZXggaXMgcmVhY2hlZCwgdGhlIGluZGV4IHdpdGggdGhlIG5lYXJlc3QgaW5kZXggaXMgc2VsZWN0ZWRcclxuICAgICAgICBpZiAoaUxhc3QgLSAxID09PSBpRmlyc3QpIHJldHVybiBNYXRoLmFicyhhcnJheVtpRmlyc3RdLnggLSB2YWx1ZSkgPiBNYXRoLmFicyhhcnJheVtpTGFzdF0ueCAtIHZhbHVlKSA/IGlMYXN0IDogaUZpcnN0O1xyXG5cclxuICAgICAgICAvLyBpZiB0aGUgdmFsdWUgaXMgZ3JlYXRlciBjb250aW51ZSBvbiB0aGUgaGlnaGVyIHJlbWFpbmluZyBzZWN0aW9uXHJcbiAgICAgICAgaWYgKHZhbHVlID4gYXJyYXlbaU1pZGRsZV0ueCkgcmV0dXJuIHRoaXMuZmluZE5lYXJlc3RJbmRleChhcnJheSwgdmFsdWUsIGlNaWRkbGUsIGlMYXN0KTtcclxuXHJcbiAgICAgICAgLy8gaWYgdGhlIHZhbHVlIGlzIGdyZWF0ZXIgY29udGludWUgb24gdGhlIGxvd2VyIHJlbWFpbmluZyBzZWN0aW9uXHJcbiAgICAgICAgaWYgKHZhbHVlIDwgYXJyYXlbaU1pZGRsZV0ueCkgcmV0dXJuIHRoaXMuZmluZE5lYXJlc3RJbmRleChhcnJheSwgdmFsdWUsIGlGaXJzdCwgaU1pZGRsZSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAqIE9wdGltaXplcyB0aGUgcG9pbnR0cyB3aXRoIHJlc3BlY3QgdG8gdGhlIHZpc2libGUgYXJlYVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gcG9pbnRzXHJcbiAgICAgKiBAcGFyYW0geyp9IGNhbnZhc0JvdW5kc1xyXG4gICAgICogQHBhcmFtIHsqfSBzZXJpZXNCb3VuZHNcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0RGF0YU9wdGltaXplclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJldHJpdmVSZWR1Y2VkUG9pbnRzV2l0aGluQm91bmRzKHBvaW50cywgY2FudmFzQm91bmRzLCBzZXJpZXNCb3VuZHMsIGlNaW4sIGlNYXgpOiBhbnkge1xyXG5cclxuICAgICAgICBsZXQgb3B0aW1pemVkUG9pbnRzOiBDaGFydFBvaW50W10gPSBbXTtcclxuXHJcbiAgICAgICAgbGV0IHZpc2libGVQb2ludHNDb3VudCA9IGlNYXggLSBpTWluO1xyXG5cclxuICAgICAgICAvLyBJZiB0aGUgcG9pbnRzIGNvdW50IGlzIHVuZGVyIHRoZSBhcmVhIHBpeGVsIHdpZHRoIHRoZXJlIGlzIG5vIG5lZWQgdG8gb3B0aW1pemUuLi4uLlxyXG4gICAgICAgIGlmICgodmlzaWJsZVBvaW50c0NvdW50KSA8IGNhbnZhc0JvdW5kcy53aWR0aCkge1xyXG4gICAgICAgICAgICAvLyAuLi4gc28gd2UganVzdCBjb252ZXJ0IHRoZSB2aXNibGUgcG9pbnRzIHRvIGNoYXJ0IHBvaW50c1xyXG4gICAgICAgICAgICBvcHRpbWl6ZWRQb2ludHMgPSB0aGlzLmdldENoYXJ0UG9pbnRzKHBvaW50cywgaU1pbiwgaU1heCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8vIC4uLiBvdGhlcndpc2Ugd2Ugb3B0aW16ZSB0aGUgcG9pbnRzIHRvIGEgcmVkdWNlZCBidXQgc3RpbGwgdXNlZnVsbCBhbW91bnQuXHJcbiAgICAgICAgICAgIG9wdGltaXplZFBvaW50cyA9IHRoaXMuZ2V0UmVkdWNlZENoYXJ0UG9pbnRzV2l0aGluQm91bmRzKGNhbnZhc0JvdW5kcywgc2VyaWVzQm91bmRzLCBwb2ludHMsIGlNaW4sIGlNYXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG9wdGltaXplZFBvaW50cztcclxuICAgIH1cclxuXHJcbiAgICAgICAvKipcclxuICAgICAqICBHZXRzIHRoZSBjaGFydCBwb2ludHMgZm9yIHRoZSBzcGVjZWZpZWQgcmFuZ2VcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBjYW52YXNCb3VuZHNcclxuICAgICAqIEBwYXJhbSB7Kn0gc2VyaWVzQm91bmRzXHJcbiAgICAgKiBAcGFyYW0geyp9IHBvaW50c1xyXG4gICAgICogQHBhcmFtIHsqfSBpTWluXHJcbiAgICAgKiBAcGFyYW0geyp9IGlNYXhcclxuICAgICAqIEBwYXJhbSB7YW55W119IHBpeGVsUG9pbnRzXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0RGF0YU9wdGltaXplclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldENoYXJ0UG9pbnRzKHBvaW50czogQ2hhcnRQb2ludFtdLCBpTWluOiBudW1iZXIsIGlNYXg6IG51bWJlcikge1xyXG4gICAgICAgICByZXR1cm4gcG9pbnRzLmZpbHRlcigocG9pbnQsaSk9PnsgcmV0dXJuIGkgPj0gaU1pbiAmJiBpIDw9IGlNYXggfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVkdWNlcyB0aGUgcG9pbnRzIHRvIGEgdXNlZnVsIGNvdW50IHdpdGggcmVzcGVjdCB0byB0aGUgdmlzaWJsZSBhcmVhXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gY2FudmFzQm91bmRzXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlcmllc0JvdW5kc1xyXG4gICAgICogQHBhcmFtIHsqfSBwb2ludHNcclxuICAgICAqIEBwYXJhbSB7Kn0gaU1pblxyXG4gICAgICogQHBhcmFtIHsqfSBpTWF4XHJcbiAgICAgKiBAcGFyYW0ge2FueVtdfSBwaXhlbFBvaW50c1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydERhdGFPcHRpbWl6ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRSZWR1Y2VkQ2hhcnRQb2ludHNXaXRoaW5Cb3VuZHMoY2FudmFzQm91bmRzOiBhbnksIHNlcmllc0JvdW5kczogYW55LCBwb2ludHM6IENoYXJ0UG9pbnRbXSwgaU1pbjogbnVtYmVyLCBpTWF4OiBudW1iZXIpIDpDaGFydFBvaW50W117XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gY3JlYXRlIHRoZSBwaXhlbCBwb2ludCBhcnJheVxyXG4gICAgICAgIC8vIHRoZSB3aWR0aCBuZWVkcyB0byBiZSBjb252ZXJ0ZWQgdG8gaW50ZWdlciBiZWNhdXNlIGluIHRoZSBjYXNlIG9mIGFjdGl2ZSBicm93c2VyIHpvb20gdGhlIHdpZHRoIGlzIHBhc3NlZCBhcyBmbG9hdCB2YWx1ZSAhXHJcbiAgICAgICAgbGV0IGNhbnZhc1dpZHRoID0gTWF0aC5jZWlsKGNhbnZhc0JvdW5kcy53aWR0aCk7XHJcbiAgICAgICAgdmFyIHBpeGVsUG9pbnRzID0gbmV3IEFycmF5KGNhbnZhc1dpZHRoKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBjcmVhdGUgYSBzZXQgZm9yIHJlY2VpdmluZyB0aGUgdmlzaWJsZSBwb2ludHMgdG8gYXZvaWQgZHVwbGljYXRlc1xyXG4gICAgICAgIGxldCBvcHRpbWl6ZWRQb2ludHM6IFNldDxDaGFydFBvaW50PiA9IG5ldyBTZXQ8Q2hhcnRQb2ludD4oKTtcclxuXHJcbiAgICAgICAgbGV0IHhTY2FsZSA9IGNhbnZhc0JvdW5kcy53aWR0aCAvIHNlcmllc0JvdW5kcy54RGVsdGE7XHJcbiAgICAgICAgaWYgKHBvaW50cy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGlWaXNpYmxlUG9pbnQgPSBpTWluOyBpVmlzaWJsZVBvaW50IDw9IGlNYXg7IGlWaXNpYmxlUG9pbnQrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWR1Y2VQaXhlbFBvaW50cyhwb2ludHNbaVZpc2libGVQb2ludF0sIHNlcmllc0JvdW5kcywgeFNjYWxlLCBpVmlzaWJsZVBvaW50LCBwaXhlbFBvaW50cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwaXhlbFBvaW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGl4ZWxQb2ludCA9IHBpeGVsUG9pbnRzW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBpeGVsUG9pbnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkUGl4ZWxTdWJQb2ludHMocGl4ZWxQb2ludCwgaSwgb3B0aW1pemVkUG9pbnRzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShvcHRpbWl6ZWRQb2ludHMpO1xyXG4gICAgfVxyXG5cclxuICAgICAgLyoqXHJcbiAgICAgKiBBZGRzIGFkZGl0aW9uYWwgcG9pbnRzIGZvciBtYXJraW5nIG1pbiBhbmQgbWF4IHZhbHVlcyB3aXRoaW4gYSBzZWdtZW50XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gcGl4ZWxQb2ludFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGlcclxuICAgICAqIEBwYXJhbSB7Q2hhcnRQb2ludFtdfSBvcHRpbWl6ZWRQb2ludHNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydERhdGFPcHRpbWl6ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRQaXhlbFN1YlBvaW50cyhwaXhlbFBvaW50OiBhbnksIGk6IG51bWJlciwgb3B0aW1pemVkUG9pbnRzOiBTZXQ8Q2hhcnRQb2ludD4pIHtcclxuXHJcbiAgICAgICAgLy8gYWRkIHRoZSBmaXJzdCBwaXhlbCBwb2ludFxyXG4gICAgICAgIHRoaXMuYWRkT3B0aW1pemVkUG9pbnQob3B0aW1pemVkUG9pbnRzLCBpLCBwaXhlbFBvaW50LmZpcnN0UG9pbnQpO1xyXG4gICAgICAgIC8vIGFkZCBtaW4gbWF4IHBvaW50c1xyXG4gICAgICAgIGlmIChwaXhlbFBvaW50LnlNaW5Qb2ludC5pbmRleCA8PSBwaXhlbFBvaW50LnlNYXhQb2ludC5pbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZE9wdGltaXplZFBvaW50KG9wdGltaXplZFBvaW50cywgaSwgcGl4ZWxQb2ludC55TWluUG9pbnQpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZE9wdGltaXplZFBvaW50KG9wdGltaXplZFBvaW50cywgaSwgcGl4ZWxQb2ludC55TWF4UG9pbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRPcHRpbWl6ZWRQb2ludChvcHRpbWl6ZWRQb2ludHMsIGksIHBpeGVsUG9pbnQueU1heFBvaW50KTtcclxuICAgICAgICAgICAgdGhpcy5hZGRPcHRpbWl6ZWRQb2ludChvcHRpbWl6ZWRQb2ludHMsIGksIHBpeGVsUG9pbnQueU1pblBvaW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gYWRkIHRoZSBsYXN0IHBvaW50XHJcbiAgICAgICAgdGhpcy5hZGRPcHRpbWl6ZWRQb2ludChvcHRpbWl6ZWRQb2ludHMsIGksIHBpeGVsUG9pbnQubGFzdFBvaW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW5kIGFkZHMgYSBjaGFydCBwb2ludFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0NoYXJ0UG9pbnRbXX0gb3B0aW1pemVkUG9pbnRzXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaVxyXG4gICAgICogQHBhcmFtIHsqfSBwaXhlbFBvaW50XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnREYXRhT3B0aW1pemVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkT3B0aW1pemVkUG9pbnQob3B0aW1pemVkUG9pbnRzOlNldDxDaGFydFBvaW50PiwgaTogbnVtYmVyLCBwaXhlbFBvaW50OiBhbnkpIHtcclxuXHJcbiAgICAgICAgb3B0aW1pemVkUG9pbnRzLmFkZChwaXhlbFBvaW50KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaW5kcyB0aGUgbWF4aW11bSB3aXRoaW4gYW4gYXJyYXlcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlc1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydERhdGFPcHRpbWl6ZXJcclxuICAgICAqL1xyXG4gICAgZmluZE1heGltdW0odmFsdWVzKSB7XHJcbiAgICAgICAgbGV0IG1heCA9IHZhbHVlc1swXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHZhbHVlc1tpXTtcclxuICAgICAgICAgICAgbWF4ID0gdmFsdWUgPiBtYXggPyB2YWx1ZSA6IG1heDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1heDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgICAvKipcclxuICAgICAqIFJlZHVjZXMgdGhlIHBpeGVsIHBvaW50cyByZXNwZWN0aW5nIHRoZSBwb2ludCBkZW5zaXR5IG9uIHBpeGVsc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHZpc2libGVQb2ludFxyXG4gICAgICogQHBhcmFtIHsqfSBzZXJpZXNCb3VuZHNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB4U2NhbGVcclxuICAgICAqIEBwYXJhbSB7Kn0gaVZpc2libGVQb2ludFxyXG4gICAgICogQHBhcmFtIHthbnlbXX0gcGl4ZWxQb2ludHNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydERhdGFPcHRpbWl6ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWR1Y2VQaXhlbFBvaW50cyh2aXNpYmxlUG9pbnQ6IGFueSwgc2VyaWVzQm91bmRzOiBhbnksIHhTY2FsZTogbnVtYmVyLCBpVmlzaWJsZVBvaW50OiBhbnksIHBpeGVsUG9pbnRzOiBhbnlbXSkge1xyXG4gICAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgcGl4ZWwgb2Zmc2V0IHRvIGF4aXMgbWluXHJcbiAgICAgICAgbGV0IHhPZmZzZXQgPSAodmlzaWJsZVBvaW50LnggLSBzZXJpZXNCb3VuZHMueE1pbikgKiAoeFNjYWxlKTtcclxuICAgICAgICAvLyBnZXQgdGhlIHBpeGVsIGluZGV4XHJcbiAgICAgICAgbGV0IGlQaXhlbCA9IE1hdGgucm91bmQoeE9mZnNldCk7XHJcbiAgICAgICAgdmlzaWJsZVBvaW50LmluZGV4ID0gaVZpc2libGVQb2ludDtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmFkZFBvaW50c0ZvclhQaXhlbChwaXhlbFBvaW50cywgdmlzaWJsZVBvaW50LCBpUGl4ZWwpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBwb2ludCBmb3IgYSBjb3Jyc3BvbmRpbmcgcGl4ZWwgbG9jYXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHthbnlbXX0gcGl4ZWxQb2ludHNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpUGl4ZWxcclxuICAgICAqIEBwYXJhbSB7Kn0gc2lnbmFsUG9pbnRcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydERhdGFPcHRpbWl6ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRQb2ludHNGb3JYUGl4ZWwocGl4ZWxQb2ludHM6IGFueVtdLCBzaWduYWxQb2ludDogYW55LCBpUGl4ZWw6IG51bWJlcikge1xyXG5cclxuICAgICAgICBpZiAoIXBpeGVsUG9pbnRzW2lQaXhlbF0pIHtcclxuICAgICAgICAgICAgLy8gZGVmaW5lIHRoZSBmaXJzdCBwb2ludCBmb3IgdGhpcyBwaXhlbFxyXG4gICAgICAgICAgICBwaXhlbFBvaW50c1tpUGl4ZWxdID0ge307XHJcbiAgICAgICAgICAgIC8vIGluaXRpYWxpemUgdGhlIGxhc3QgcG9pbnQgYXMgZGVmYXVsdFxyXG4gICAgICAgICAgICBwaXhlbFBvaW50c1tpUGl4ZWxdLmZpcnN0UG9pbnQgPSBzaWduYWxQb2ludDtcclxuICAgICAgICAgICAgcGl4ZWxQb2ludHNbaVBpeGVsXS5sYXN0UG9pbnQgPSBzaWduYWxQb2ludDtcclxuICAgICAgICAgICAgcGl4ZWxQb2ludHNbaVBpeGVsXS55TWF4UG9pbnQgPSBzaWduYWxQb2ludDtcclxuICAgICAgICAgICAgcGl4ZWxQb2ludHNbaVBpeGVsXS55TWluUG9pbnQgPSBzaWduYWxQb2ludDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyB1cGRhdGUgdGhlIGxhc3QgcG9pbnQgZm9yIGZvbGxvd2luZyB2YWx1ZXMgb24gdGhlIHNhbWUgcGl4ZWxcclxuICAgICAgICAgICAgcGl4ZWxQb2ludHNbaVBpeGVsXS5sYXN0UG9pbnQgPSBzaWduYWxQb2ludDtcclxuXHJcbiAgICAgICAgICAgIC8vIHVwZGF0ZSBtaW4sbWF4XHJcbiAgICAgICAgICAgIGlmIChzaWduYWxQb2ludC55ID4gcGl4ZWxQb2ludHNbaVBpeGVsXS55TWF4UG9pbnQueSkge1xyXG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBwb2ludCBjb250YWluaW5nIHlNYXhcclxuICAgICAgICAgICAgICAgIHBpeGVsUG9pbnRzW2lQaXhlbF0ueU1heFBvaW50ID0gc2lnbmFsUG9pbnQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzaWduYWxQb2ludC55IDwgcGl4ZWxQb2ludHNbaVBpeGVsXS55TWluUG9pbnQueSkge1xyXG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBwb2ludCBjb250YWluaW5nIHlNaW5cclxuICAgICAgICAgICAgICAgIHBpeGVsUG9pbnRzW2lQaXhlbF0ueU1pblBvaW50ID0gc2lnbmFsUG9pbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJpbXMgb3Igb3B0aW1pemVzIHNlcmllcyBwb2ludCB0byBiZSBkaXNwbGF5IHdpdGhpbiBhIDJEIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBjaGFydFNlcmllc1xyXG4gICAgICogQHBhcmFtIHsqfSBjaGFydEluc3RhbmNlXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0RGF0YU9wdGltaXplclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHRyaW1TZXJpZXNGb3JDaGFydEJvdW5kczJEKGNoYXJ0U2VyaWVzLCBjaGFydEluc3RhbmNlKSB7XHJcblxyXG4gICAgICAgIC8vIHRoZSBjaGFydCBwb2ludHMgdG8gYmUgY2FsY3VsYXRlZFxyXG4gICAgICAgIGxldCBjaGFydFBvaW50czogU2VyaWVzUG9pbnRbXSA9IFtdO1xyXG4gICAgICAgIC8vIGdldCB0aGUgY2FudmFzIGJvdW5kcyBpbiBwaXhlbFxyXG4gICAgICAgIGxldCBjYW52YXNCb3VuZHMgPSB0aGlzLmdldENoYXJ0QXJlYUJvdW5kc0luUGl4ZWwoY2hhcnRJbnN0YW5jZSk7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBjaGFydCBhcmVhIGJvdW5kc1xyXG4gICAgICAgIGxldCBjaGFydEFyZWFCb3VuZHMgPSB0aGlzLmdldENoYXJ0QXJlYUJvdW5kcyhjaGFydFNlcmllcyk7XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgc2VyaWVzIHdpdGggYSBtYXRjaGluZyBuYW1lXHJcbiAgICAgICAgbGV0IGRhdGFTZXJpZXMgPSB0aGlzLmdldFNlcmllc0RhdGEoY2hhcnRTZXJpZXMpO1xyXG5cclxuICAgICAgICBpZiAoZGF0YVNlcmllcykge1xyXG5cclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBvcmlnaW5hbCB1bm1vZGlmaWVkIHBvaW50cyBcclxuICAgICAgICAgICAgbGV0IHJhd1BvaW50czogSVBvaW50W10gPSBkYXRhU2VyaWVzLnJhd1BvaW50cztcclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBpbml0aWFsbHkgc2ltcGxpZmllZCBkYXRhXHJcbiAgICAgICAgICAgIGxldCB2aWV3UG9pbnRzRGF0YSA9ICg8YW55PmRhdGFTZXJpZXMpLmRhdGE7XHJcbiAgICAgICAgICAgIC8vIHJldHJpZXZlIHRoZSBwb2ludHMgdG8gYmUgZGlzcGxheWVkICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgdmlld1Nlcmllc1BvaW50cyA9IHZpZXdQb2ludHNEYXRhIGFzIElQb2ludFtdO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS50aW1lKFwiY2FsY3VsYXRlIHJlZHVjZWQgY2hhcnQgcG9pbnRzXCIpO1xyXG5cclxuICAgICAgICAgICAgLy8gcmV0cmlldmUgdGhlIHZpc2libGUgc2VnbWVudCBwb2ludHNcclxuICAgICAgICAgICAgY2hhcnRQb2ludHMgPSB0aGlzLnJldHJpZXZlVmlzaWJsZUxpbmVTZWdtZW50UG9pbnRzKHZpZXdTZXJpZXNQb2ludHMsIGNoYXJ0QXJlYUJvdW5kcyk7XHJcblxyXG4gICAgICAgICAgICAvLyBnZXQgcmF3IHBvaW50cyBjb3VudCBjb3ZlcmVkIGJ5IHRoZSB2aXNpYmxlIHNlZ21lbnRzXHJcbiAgICAgICAgICAgIGxldCByYXdWaXNpYmxlUG9pbnRzQ291bnQgPSBjaGFydFBvaW50cy5sZW5ndGggPiAwID8gY2hhcnRQb2ludHNbY2hhcnRQb2ludHMubGVuZ3RoIC0gMV0uaW5kZXggLSBjaGFydFBvaW50c1swXS5pbmRleCArIDEgOiAwO1xyXG4gICAgICAgICAgICBpZiAocmF3VmlzaWJsZVBvaW50c0NvdW50ID4gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgY3VycmVudCBjaGFydCB1bml0cy9waXhlbFxyXG4gICAgICAgICAgICAgICAgY29uc3Qga1hVbml0c1BlclBpeGVsID0gY2hhcnRBcmVhQm91bmRzLnhEZWx0YSAvIGNhbnZhc0JvdW5kcy53aWR0aDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGtZVW5pdHNQZXJQaXhlbCA9IGNoYXJ0QXJlYUJvdW5kcy55RGVsdGEgLyBjYW52YXNCb3VuZHMuaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBjdXJyZW50IGNvb3JkaW5hdGUgdG8gcGl4ZWwgcmF0aW8gZmFsbHMgYmVsb3cgdGhlIGluaXRpYWwgcmF0aW9uIHdlIG5lZWQgdG8gcmVjYWxjdWxhdGUgdGhlIHNpbXBsaWZpZWQgcG9pbnRzIGZvciB0aGUgY3VycmVudCBnaXZlbiB2aWV3IHBvcnRcclxuICAgICAgICAgICAgICAgIC8vIHRvIGdldCB0aGUgYmVzdCBtYXRjaGluZyBhcHByb3hpbWF0ZWQgc2ltcGxpZmllZCBsaW5lLiBcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzRGV0YWlsWm9vbUxldmVsKHZpZXdQb2ludHNEYXRhLGtYVW5pdHNQZXJQaXhlbCxrWVVuaXRzUGVyUGl4ZWwpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJldHJpZXZlIHRoZSBwb2ludHMgd2l0aCB0aGUgcHJlY2lzaW9uIGZvciByZXF1ZXN0ZWQgem9vbSBsZXZlbCBcclxuICAgICAgICAgICAgICAgICAgICBjaGFydFBvaW50cyA9IHRoaXMucmV0cmlldmVEZXRhaWxlZENoYXJ0UG9pbnRzKGNoYXJ0UG9pbnRzLCByYXdQb2ludHMsIGNoYXJ0QXJlYUJvdW5kcywga1hVbml0c1BlclBpeGVsLCBrWVVuaXRzUGVyUGl4ZWwpOyBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc29sZS50aW1lRW5kKFwiY2FsY3VsYXRlIHJlZHVjZWQgY2hhcnQgcG9pbnRzXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9wdGltaXplZCBwb2ludHM6ICVvXCIsIGNoYXJ0UG9pbnRzLmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBvcHRpbWl6ZWRQb2ludHMgPSBjaGFydFBvaW50cy5tYXAoKHBvaW50LCBpKSA9PiB7IHJldHVybiBuZXcgQ2hhcnRQb2ludChwb2ludC5pbmRleCxwb2ludC52aXNpYmxlLCBwb2ludC54LCBwb2ludC55KTsgfSk7XHJcbiAgICAgICAgcmV0dXJuIG9wdGltaXplZFBvaW50cztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGNoYXJ0U2VyaWVzXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0RGF0YU9wdGltaXplclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFNlcmllc0RhdGEoY2hhcnRTZXJpZXM6IGFueSkge1xyXG4gICAgICAgIGxldCBjaGFydFZpZXdTZXJpZXM6IENoYXJ0Vmlld1NlcmllIHwgdW5kZWZpbmVkID0gdGhpcy5fc2VyaWVzUHJvdmlkZXIuc2VyaWVzLmZpbmQoKHNlcmllcykgPT4geyByZXR1cm4gc2VyaWVzLmlkID09PSBjaGFydFNlcmllcy5uYW1lOyB9KTtcclxuICAgICAgICBsZXQgZGF0YVNlcmllcyA9IGNoYXJ0Vmlld1NlcmllcyA/IGNoYXJ0Vmlld1Nlcmllcy5zZXJpZSA6IHVuZGVmaW5lZDtcclxuICAgICAgICByZXR1cm4gZGF0YVNlcmllcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlcyB0aGUgZGF0YSBwb2ludHMgbmVjZXNzYXJ5IHRvIHNhdGlzZnkgdGhlIHNwZWNpZmllZCBjaGFydCBib3VuZHMgYW5kIHpvb20gcmF0aW8uIFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1Nlcmllc1BvaW50W119IGNoYXJ0UG9pbnRzXHJcbiAgICAgKiBAcGFyYW0ge0lQb2ludFtdfSByYXdQb2ludHNcclxuICAgICAqIEBwYXJhbSB7eyB4TWluOiBhbnk7IHhNYXg6IGFueTsgeERlbHRhOiBhbnk7IHlNaW46IGFueTsgeU1heDogYW55OyB5RGVsdGE6IGFueTsgfX0gY2hhcnRBcmVhQm91bmRzXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3VycmVudENoYXJ0UGl4ZWxSYXRpb1hcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJyZW50Q2hhcnRQaXhlbFJhdGlvbllcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnREYXRhT3B0aW1pemVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmV0cmlldmVEZXRhaWxlZENoYXJ0UG9pbnRzKGNoYXJ0UG9pbnRzOiBTZXJpZXNQb2ludFtdLCByYXdQb2ludHM6IElQb2ludFtdLCBjaGFydEFyZWFCb3VuZHM6IHsgeE1pbjogYW55OyB4TWF4OiBhbnk7IHhEZWx0YTogYW55OyB5TWluOiBhbnk7IHlNYXg6IGFueTsgeURlbHRhOiBhbnk7IH0sIGN1cnJlbnRDaGFydFBpeGVsUmF0aW9YOiBudW1iZXIsIGN1cnJlbnRDaGFydFBpeGVsUmF0aW9uWTogbnVtYmVyKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgbGFzdFJhd0luZGV4ID0gY2hhcnRQb2ludHNbY2hhcnRQb2ludHMubGVuZ3RoIC0gMV0uaW5kZXg7XHJcbiAgICAgICAgY29uc3QgZmlyc3RWaXNpYmxlUmF3UG9pbnRJbmRleCA9IGNoYXJ0UG9pbnRzWzBdLmluZGV4O1xyXG4gICAgICAgIGNvbnN0IGxhc3RWaXNpYmxlUmF3UG9pbnRJbmRleCA9IGxhc3RSYXdJbmRleCA8IHJhd1BvaW50cy5sZW5ndGggPyBsYXN0UmF3SW5kZXggKyAxIDogcmF3UG9pbnRzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgLy8gcmV0cmlldmUgdGhlIHJhdyBwb2ludHMgY292ZXJlZCBieSB0aGUgdmlzaWJsZSBzZWdtZW50c1xyXG4gICAgICAgIGxldCByYXdWaXNpYmxlUG9pbnRzID0gcmF3UG9pbnRzLnNsaWNlKGZpcnN0VmlzaWJsZVJhd1BvaW50SW5kZXgsIGxhc3RWaXNpYmxlUmF3UG9pbnRJbmRleCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gdXBkYXRlIHBvaW50IGluZGljZXNcclxuICAgICAgICB0aGlzLnVwZGF0ZVZpc2liaWxpdHlJbmRpY2VzKHJhd1Zpc2libGVQb2ludHMpO1xyXG5cclxuICAgICAgICAvLyByZXRyaWV2ZSB0aGUgdmlzaWJsZSBsaW5lIHNlZ21lbnQgcG9pbnRzXHJcbiAgICAgICAgY2hhcnRQb2ludHMgPSB0aGlzLnJldHJpZXZlVmlzaWJsZUxpbmVTZWdtZW50UG9pbnRzKHJhd1Zpc2libGVQb2ludHMsIGNoYXJ0QXJlYUJvdW5kcyk7XHJcblxyXG4gICAgICAgIC8vIGlmIHRoZSBudW1iZXJ0IG9mIGNoYXJ0IHBvaW50cyBpcyBzdGlsbCB0b28gaGlnaCwgd2UgbmVlZCB0byBmdXJ0aGVyIHNpbXBsaWZ5IHRoZSBkYXRhIHBvaW50c1xyXG4gICAgICAgIGlmIChjaGFydFBvaW50cy5sZW5ndGggPiAxMDAwKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBzaW1wbGlmeSB0aGUgcmVtYWluaW5nIHZpc2libGUgcG9pbnRzIGFjY29yZGluZyB0aGUgc3BlY2lmaWVkIHByZWNpc2lvbiBhbmQgcmF0aW9cclxuICAgICAgICAgICAgY2hhcnRQb2ludHMgPSB0aGlzLnJkcC5zaW1wbGlmeShyYXdWaXNpYmxlUG9pbnRzLCAwLjI1LCBjdXJyZW50Q2hhcnRQaXhlbFJhdGlvWCwgY3VycmVudENoYXJ0UGl4ZWxSYXRpb25ZLCBmYWxzZSkgYXMgU2VyaWVzUG9pbnRbXTtcclxuXHJcbiAgICAgICAgICAgIC8vIHVwZGF0ZSBwb2ludCBpbmRpY2VzXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmlzaWJpbGl0eUluZGljZXMoY2hhcnRQb2ludHMpO1xyXG5cclxuICAgICAgICAgICAgLy8gcmV0cmlldmUgdGhlIHZpc2libGUgc2VnbWVudCBwb2ludHNcclxuICAgICAgICAgICAgY2hhcnRQb2ludHMgPSB0aGlzLnJldHJpZXZlVmlzaWJsZUxpbmVTZWdtZW50UG9pbnRzKGNoYXJ0UG9pbnRzLCBjaGFydEFyZWFCb3VuZHMpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjaGFydFBvaW50cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHZpZXdQb2ludHNEYXRhXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3VycmVudENoYXJ0UGl4ZWxSYXRpb1hcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJyZW50Q2hhcnRQaXhlbFJhdGlvbllcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnREYXRhT3B0aW1pemVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaXNEZXRhaWxab29tTGV2ZWwodmlld1BvaW50c0RhdGE6IGFueSwgY3VycmVudENoYXJ0UGl4ZWxSYXRpb1g6IG51bWJlciwgY3VycmVudENoYXJ0UGl4ZWxSYXRpb25ZOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gY3VycmVudENoYXJ0UGl4ZWxSYXRpb1ggPCB2aWV3UG9pbnRzRGF0YS5waXhlbFJhdGlvWCB8fCBjdXJyZW50Q2hhcnRQaXhlbFJhdGlvblkgPCB2aWV3UG9pbnRzRGF0YS5waXhlbFJhdGlvWTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBpbmRpY2VzIG9mIHRoZSBwb2ludHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJUG9pbnRbXX0gcmVkdWNlZFZpc2libGVQb2ludHNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydERhdGFPcHRpbWl6ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVWaXNpYmlsaXR5SW5kaWNlcyhwb2ludHM6IElQb2ludFtdKSB7XHJcbiAgICAgICAgbGV0IHNlcmllc1BvaW50cyA9IHBvaW50cyBhcyBTZXJpZXNQb2ludFtdO1xyXG4gICAgICAgIHNlcmllc1BvaW50cy5mb3JFYWNoKChwb2ludCxpbmRleCkgPT4geyBwb2ludC5pbmRleCA9IGluZGV4OyB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGNoYXJ0IGFyZWEgYm91bmRzIGluIHBpeGVsXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gY2hhcnRJbnN0YW5jZVxyXG4gICAgICogQHJldHVybnMge3t4Om51bWJlcix5Om51bWJlcix3aWR0aDpudW1iZXIsaGVpZ2h0Om51bWJlcn19XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnREYXRhT3B0aW1pemVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0Q2hhcnRBcmVhQm91bmRzSW5QaXhlbChjaGFydEluc3RhbmNlOiBhbnkpOiB7IHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciB9IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB4OiBjaGFydEluc3RhbmNlLmNhbnZhc1gsXHJcbiAgICAgICAgICAgIHk6IGNoYXJ0SW5zdGFuY2UuY2FudmFzWSxcclxuICAgICAgICAgICAgd2lkdGg6IGNoYXJ0SW5zdGFuY2UuY2FudmFzV2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodDogY2hhcnRJbnN0YW5jZS5jYW52YXNIZWlnaHQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHZpc2libGUgY2hhcnQgYXJlYSBib3VuZHMgaW4gY29vcmRpbmF0ZSB1bml0c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGNoYXJ0U2VyaWVzXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0RGF0YU9wdGltaXplclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldENoYXJ0QXJlYUJvdW5kcyhjaGFydFNlcmllczogYW55KSB7XHJcblxyXG4gICAgICAgIGxldCBjaGFydEFyZWFCb3VuZHMgPSB7XHJcbiAgICAgICAgICAgIHhNaW46IGNoYXJ0U2VyaWVzLnhBeGlzLnJhbmdlLm1pbixcclxuICAgICAgICAgICAgeE1heDogY2hhcnRTZXJpZXMueEF4aXMucmFuZ2UubWF4LFxyXG4gICAgICAgICAgICB4RGVsdGE6IGNoYXJ0U2VyaWVzLnhBeGlzLnJhbmdlLmRlbHRhLFxyXG4gICAgICAgICAgICB5TWluOiBjaGFydFNlcmllcy55QXhpcy5yYW5nZS5taW4sXHJcbiAgICAgICAgICAgIHlNYXg6IGNoYXJ0U2VyaWVzLnlBeGlzLnJhbmdlLm1heCxcclxuICAgICAgICAgICAgeURlbHRhOiBjaGFydFNlcmllcy55QXhpcy5yYW5nZS5kZWx0YSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBjaGFydEFyZWFCb3VuZHM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0ZXJtaW5lcyBpZiBhIGxpbmUgaW50ZXJzZWN0cyBhIHJlY3RhbmdsZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVBvaW50fSBwMVxyXG4gICAgICogQHBhcmFtIHtJUG9pbnR9IHAyXHJcbiAgICAgKiBAcGFyYW0ge0JvdW5kc30gYm91bmRzXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0RGF0YU9wdGltaXplclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbGluZUludGVyc2VjdHNSZWN0YW5nbGUocDE6IElQb2ludCwgcDI6IElQb2ludCwgYm91bmRzOiBCb3VuZHMpIHtcclxuXHJcbiAgICAgICAgLy8gZXhjbHVkZSBub24gaW50ZXJzZWN0aW5nIGxpbmVzXHJcbiAgICAgICAgaWYgKChwMS54IDwgYm91bmRzLnhNaW4gJiYgcDIueCA8IGJvdW5kcy54TWluKSB8fCAocDEueSA8IGJvdW5kcy55TWluICYmIHAyLnkgPCBib3VuZHMueU1pbikgfHwgKHAxLnggPiBib3VuZHMueE1heCAmJiBwMi54ID4gYm91bmRzLnhNYXgpIHx8IChwMS55ID4gYm91bmRzLnlNYXggJiYgcDIueSA+IGJvdW5kcy55TWF4KSlcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKHRoaXMucmVjdGFuZ2xlQ29udGFpbnNQb2ludChwMSxib3VuZHMpIHx8IHRoaXMucmVjdGFuZ2xlQ29udGFpbnNQb2ludChwMixib3VuZHMpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gY2FsY3VsYXRlIGR5L2R4XHJcbiAgICAgICAgICAgIGxldCBrID0gKHAyLnkgLSBwMS55KSAvIChwMi54IC0gcDEueCk7XHJcblxyXG4gICAgICAgICAgICAvLyBjaGVjayBpZiBsaW5lIGludGVyc2VjdHMgbGVmdCBib3JkZXJcclxuICAgICAgICAgICAgbGV0IHlJbnRlcnNlY3QgPSBwMS55ICsgayAqIChib3VuZHMueE1pbiAtIHAxLngpO1xyXG4gICAgICAgICAgICBpZiAoeUludGVyc2VjdCA+PSBib3VuZHMueU1pbiAmJiB5SW50ZXJzZWN0IDw9IGJvdW5kcy55TWF4KSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIGxpbmUgaW50ZXJzZWN0cyByaWdodCBib3JkZXJcclxuICAgICAgICAgICAgeUludGVyc2VjdCA9IHAxLnkgKyBrICogKGJvdW5kcy54TWF4IC0gcDEueCk7XHJcbiAgICAgICAgICAgIGlmICh5SW50ZXJzZWN0ID49IGJvdW5kcy55TWluICYmIHlJbnRlcnNlY3QgPD0gYm91bmRzLnlNYXgpIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgbGluZSBpbnRlcnNlY3RzIGJvdHRvbSBib3JkZXJcclxuICAgICAgICAgICAgbGV0IHhJbnRlcnNlYyA9IHAxLnggKyAoYm91bmRzLnlNaW4gLSBwMS55KSAvIGs7XHJcbiAgICAgICAgICAgIGlmICh4SW50ZXJzZWMgPj0gYm91bmRzLnhNaW4gJiYgeEludGVyc2VjIDw9IGJvdW5kcy54TWF4KSByZXR1cm4gdHJ1ZTtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyBjaGVjayBpZiBsaW5lIGludGVyc2VjdHMgdG9wIGJvcmRlclxyXG4gICAgICAgICAgICB4SW50ZXJzZWMgPSBwMS54ICsgKGJvdW5kcy55TWF4IC0gcDEueSkgLyBrO1xyXG4gICAgICAgICAgICBpZiAoeEludGVyc2VjID49IGJvdW5kcy54TWluICYmIHhJbnRlcnNlYyA8PSBib3VuZHMueE1heCkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImxpbmVJbnRlcnNlY3RzUmVjdGFuZ2xlXCIpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMgdGhlIGxpbmUgc2VnbWVudCBwb2ludHMgZm9yIHNlZ21lbnRzIGludGVyc2VjdGluZyB0aGUgc3BlY2lmaWVkIGJvdW5kcy4gVGhlIG1ldGhvZHMgYWRkcywgaWYgbmVjZXNzYXJ5IGludmlzaWJsZSBsaW5lIHNlZ21lbnRzIGJ5IGFkZGluZyBpbnZpc2libGUgaGVsa3BlciBwb2ludHMuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVBvaW50W119IHBvaW50c1xyXG4gICAgICogQHBhcmFtIHtCb3VuZHN9IGJvdW5kc1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydERhdGFPcHRpbWl6ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZXRyaWV2ZVZpc2libGVMaW5lU2VnbWVudFBvaW50cyhwb2ludHM6IElQb2ludFtdICwgYm91bmRzOiBCb3VuZHMpOlNlcmllc1BvaW50W10ge1xyXG5cclxuICAgICAgICBpZiAocG9pbnRzLmxlbmd0aCA8IDIpIHJldHVybiBwb2ludHMgYXMgU2VyaWVzUG9pbnRbXTtcclxuXHJcbiAgICAgICAgLy8gdGhlIGF2YWlsYWJsZSBwb2ludCBhcyBzZXJpZXMgcG9pbnRzXHJcbiAgICAgICAgbGV0IHNlcmllc1BvaW50cyA9IHBvaW50cyBhcyBTZXJpZXNQb2ludFtdO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgdGhlIHJlc3VsdCBzZWdtZW50IHBvaW50cyBhcnJheVxyXG4gICAgICAgIGxldCBsaW5lU2VnbWVudFBvaW50czogU2VyaWVzUG9pbnRbXSA9IFtdO1xyXG5cclxuXHJcbiAgICAgICAgLy8gaG9sZHMgdGhlIGxhc3QgYWRkZWQgZW5kIHBvaW50LlxyXG4gICAgICAgIGxldCBsYXN0RW5kUG9pbnQ6U2VyaWVzUG9pbnR8bnVsbCA9IG51bGw7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc2VyaWVzUG9pbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBTdGFydCA9IHNlcmllc1BvaW50c1tpIC0gMV07XHJcbiAgICAgICAgICAgIGNvbnN0IHBFbmQgPSBzZXJpZXNQb2ludHNbaV07XHJcblxyXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgbGluZSBpbnRlcnNlY3RzIHRoZSBzcGVjaWZpZWQgYm91bmRzXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxpbmVJbnRlcnNlY3RzUmVjdGFuZ2xlKHBTdGFydCwgcEVuZCwgYm91bmRzKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghbGFzdEVuZFBvaW50KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGF0IHRoZSB2ZXJ5IGJlZ2lubmluZyB3ZSBuZWVkIHRvIGFkZCB0aGUgZmlyc3Qgc3RhcnQgcG9pbnRcclxuICAgICAgICAgICAgICAgICAgICBwU3RhcnQudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZVNlZ21lbnRQb2ludHMucHVzaChwU3RhcnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5vdyB3ZSBjb250aW51ZSB0aGUgbGluZSAuLi4uXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlIGxpbmUgaXMgaW50ZXJydXB0ZWQgKCBzdGFydCBhbmQgcHJldmlvdXMgZW5kIGluZGV4IGlzIG5vdCB0aGUgc2FtZSksIHdlIG5lZWQgdG8gYWRkIGFuIGludmlzaWJsZSBoZWxwZXIgcG9pbnQgdG8gY3JlYXRlIGFuIGludmlzaWJsZSBzZWdtZW50LlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZGl0aW9uYWxseSB3ZSBuZWVkIHRvIGFkZCB0aGUgc3RhcnQgcG9pbnQgb2YgdGhlIG5leHQgdmlzaWJsZSBsaW5lIHNlZ21lbnQuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBTdGFydC5pbmRleCAhPSBsYXN0RW5kUG9pbnQuaW5kZXgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBhbiBpbnZpc2libGUgaGVscGVyIHBvaW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbnZpc2libGVTZWdtZW5TdGFydFBvaW50ID0gT2JqZWN0LmNyZWF0ZShsYXN0RW5kUG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnZpc2libGVTZWdtZW5TdGFydFBvaW50LnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIHRoZSBpbnZpc2libGUgaGVscGVyIHBvaW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVTZWdtZW50UG9pbnRzLnB1c2goaW52aXNpYmxlU2VnbWVuU3RhcnRQb2ludCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIHN0YXJ0IHBvaW50IG9mIG5leHQgdmlzaWJsZSBsaW5lIHNlZ21lbnQuIFRoaXMgaXMgd2hlcmUgdGhlIGxpbmUgc2VnbWVudCBpcyB0byBiZSBjb250aW51ZWQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBTdGFydC52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZVNlZ21lbnRQb2ludHMucHVzaChwU3RhcnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8ganVzdCBhZGQgdGhlIG5leHQgdmlzaWJsZSBlbmQgcG9pbnRcclxuICAgICAgICAgICAgICAgIHBFbmQudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBsaW5lU2VnbWVudFBvaW50cy5wdXNoKHBFbmQpO1xyXG4gICAgICAgICAgICAgICAgbGFzdEVuZFBvaW50ID0gcEVuZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gbGluZVNlZ21lbnRQb2ludHM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgcmVjdGFuZ2xlQ29udGFpbnNQb2ludChwb2ludDogSVBvaW50LCBib3VuZHM6IHsgeE1pbjogbnVtYmVyOyB4TWF4OiBudW1iZXI7IHlNaW46IG51bWJlcjsgeU1heDogbnVtYmVyOyB9KSB7XHJcblxyXG4gICAgICAgIGNvbnN0IHhNaW5EaWZmID0gcG9pbnQueCAtIGJvdW5kcy54TWluO1xyXG4gICAgICAgIGNvbnN0IHhNYXhEaWZmID0gYm91bmRzLnhNYXggLSBwb2ludC54O1xyXG4gICAgICAgIGNvbnN0IHlNaW5EaWZmID0gcG9pbnQueSAtIGJvdW5kcy55TWluO1xyXG4gICAgICAgIGNvbnN0IHlNYXhEaWZmID0gYm91bmRzLnlNYXggLSBwb2ludC55O1xyXG5cclxuICAgICAgICBjb25zdCB4V2l0aGluUmFuZ2UgPSB4TWluRGlmZiA+PSAwICYmIHhNYXhEaWZmID49IDA7XHJcbiAgICAgICAgY29uc3QgeVdpdGhpblJhbmdlID0geU1pbkRpZmYgPj0gMCAmJiB5TWF4RGlmZiA+PSAwO1xyXG5cclxuXHJcbiAgICAgICAgLy8gY29uc3QgeFdpdGhpblJhbmdlID0gcG9pbnQueCA+PSBib3VuZHMueE1pbiAmJiBwb2ludC54IDw9IGJvdW5kcy54TWF4O1xyXG4gICAgICAgIC8vIGNvbnN0IHlXaXRoaW5SYW5nZSA9IHBvaW50LnkgPj0gYm91bmRzLnlNaW4gJiYgcG9pbnQueSA8PSBib3VuZHMueU1heDtcclxuXHJcbiAgICAgICAgbGV0IHJlY3RhbmdsZXNDb250YWluc1BvaW50ID0geFdpdGhpblJhbmdlICYmIHlXaXRoaW5SYW5nZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlY3RhbmdsZXNDb250YWluc1BvaW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoZXMgYSBzZXJpZXMgdG8gdGhlIGNoYXJ0IG9wdGltaXplci4gVGhlIG1ldGhvZCBpbiBmYWN0IGp1c3QgY2FsY3VsYXRlcyBhbmQgdXBkYXRlcyB0aGUgc2VyaWVzIGJvdW5kcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0RGF0YU9wdGltaXplclxyXG4gICAgICovXHJcbiAgICBhdHRhY2hTZXJpZXMoc2VyaWU6IEJhc2VTZXJpZXMpIHtcclxuXHJcbiAgICAgICAgaWYgKHNlcmllLnJhd1BvaW50cy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIGxldCBzaWduYWxQb2ludHM6IElQb2ludFtdID0gc2VyaWUucmF3UG9pbnRzO1xyXG5cclxuICAgICAgICAgICAgbGV0IHhWYWx1ZXMgPSBzaWduYWxQb2ludHMubWFwKChwb2ludCkgPT4geyByZXR1cm4gcG9pbnQueCB9KTtcclxuICAgICAgICAgICAgbGV0IHlWYWx1ZXMgPSBzaWduYWxQb2ludHMubWFwKChwb2ludCkgPT4geyByZXR1cm4gcG9pbnQueSB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCB4TWluID0gTWF0aFgubWluKHhWYWx1ZXMpO1xyXG4gICAgICAgICAgICBsZXQgeE1heCA9IE1hdGhYLm1heCh4VmFsdWVzKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB5TWluID0gTWF0aFgubWluKHlWYWx1ZXMpO1xyXG4gICAgICAgICAgICBsZXQgeU1heCA9IE1hdGhYLm1heCh5VmFsdWVzKTtcclxuICAgIFxyXG5cclxuICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBzZXJpZXMgYm91bmRzXHJcbiAgICAgICAgICAgICg8YW55PnNlcmllKS5ib3VuZHMgPSB7IHhNaW46IHhNaW4sIHhNYXg6IHhNYXgsIHlNaW46IHlNaW4sIHlNYXg6IHlNYXgsIHdpZHRoOiAoeE1heCAtIHhNaW4pLCBoZWlnaHQ6ICh5TWF4IC0geU1pbikgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJTZXJpZXNEaXNwbGF5UG9pbnRzKHNlcmllKTtcclxuICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlcmllO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsZWFycyBldmVudHVhbGx5IGV4aXN0aW5nIGRpc3BsYXkgcG9pbnRzLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnREYXRhT3B0aW1pemVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2xlYXJTZXJpZXNEaXNwbGF5UG9pbnRzKHNlcmllOiBCYXNlU2VyaWVzKSB7XHJcbiAgICAgICAgKDxhbnk+c2VyaWUpLmRpc3BsYXlQb2ludHMgPSBudWxsO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogRGVjbGFyZXMgdGhlIHRyYWNlIGRhdGEgc291cmNlIGludGVyZmFjZVxyXG4gKlxyXG4gKiBAaW50ZXJmYWNlIElDaGFydFNlcmllc1Byb3ZpZGVyXHJcbiAqL1xyXG5pbnRlcmZhY2UgSUNoYXJ0U2VyaWVzUHJvdmlkZXIge1xyXG4gICAgc2VyaWVzOiBBcnJheTxDaGFydFZpZXdTZXJpZT47XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRzIHRoZSBjaGFydCBwb2ludCBjbGFzc1xyXG4gKlxyXG4gKiBAY2xhc3MgQ2hhcnRQb2ludFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENoYXJ0UG9pbnQge1xyXG5cclxuICAgIGluZGV4OiBudW1iZXI7XHJcbiAgICB4OiBudW1iZXI7XHJcbiAgICB4VmFsdWU6IG51bWJlcjtcclxuICAgIHk6IG51bWJlcjtcclxuICAgIFlWYWx1ZXM6IG51bWJlcltdO1xyXG4gICAgdmlzaWJsZTpib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGluZGV4LCB2aXNpYmxlLCB4LCB5KSB7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB0aGlzLnhWYWx1ZSA9IHg7XHJcbiAgICAgICAgdGhpcy5ZVmFsdWVzID0gW3ldO1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHZpc2libGU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IENoYXJ0RGF0YU9wdGltaXplciwgSUNoYXJ0U2VyaWVzUHJvdmlkZXIgfTsiXX0=