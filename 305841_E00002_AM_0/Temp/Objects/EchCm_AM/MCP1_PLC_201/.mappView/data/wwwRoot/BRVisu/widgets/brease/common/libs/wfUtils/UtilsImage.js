define([
    'libs/d3/d3',
    'widgets/brease/common/libs/wfUtils/SVGCache'
], function (d3, SVGCache) {

    'use strict';

    /**
     * @class widgets.brease.common.libs.wfUtils.UtilsImage
     * #Description
     * Utils used for mathematicals operations for the calculator
    */

    var UtilsImage = {};

    /**
    * @method getInlineSvg
    * gets the inline code of an svg
    * @param {String} sourceImage path for the svg image
    * @param {Boolean} avoidBrokenSvg avoids returning a broken image svg
    * @param {String[]} array
    * @param {Boolean} putInCache cache svg string
    */
    UtilsImage.getInlineSvg = function (sourceImage, avoidBrokenSvg, array, putInCache) {
        var deferedElement = $.Deferred();
        avoidBrokenSvg = (avoidBrokenSvg === true);
        putInCache = (putInCache === true);
        if (SVGCache.contains(sourceImage)) {
            SVGCache.done(sourceImage, function (strXml) {
                if (strXml) {
                    resolveSVG(strXml, sourceImage, array, deferedElement); 
                } else {
                    deferedElement.reject();
                }
            });
        } else {
            if (putInCache) {
                SVGCache.add(sourceImage);
            }
            d3.xml(sourceImage).mimeType('image/svg+xml').get(svgLoadResponse.bind(null, sourceImage, deferedElement, array, avoidBrokenSvg, putInCache)); // returns XMLDocument
        }
        return deferedElement;
    };

    function svgLoadResponse(sourceImage, deferedElement, array, avoidBrokenSvg, putInCache, error, xml) {
        if (error || xml === null) {
            if (avoidBrokenSvg === true) {
                if (putInCache) {
                    SVGCache.resolve(sourceImage);
                }
                deferedElement.reject();
            } else {
                var brokenSvg = UtilsImage.getBrokenSvg();
                if (putInCache) {
                    SVGCache.resolve(sourceImage, brokenSvg.outerHTML); 
                }
                deferedElement.resolve($(brokenSvg));
            }
        } else {
            if (putInCache) {
                SVGCache.resolve(sourceImage, xml.documentElement.outerHTML);
            }
            resolveSVG(xml.documentElement, sourceImage, array, deferedElement);
        }
    }

    /*
    * @method resolveSVG
    * @param {String/XMLDocument} xml
    * @param {String} sourceImage path for the svg image
    * @param {String[]} array
    * @param {core.jquery.DeferredObject} deferedElement
    */
    function resolveSVG(xml, sourceImage, array, deferedElement) {
        //A&P 658150 - In case selectedIndex is changed before svg image is received from the server  
        if (array === undefined || array[array.length - 1] === sourceImage) {
            deferedElement.resolve($(xml));
        } else {
            array.shift();
        }
    }

    UtilsImage.isStylable = function (sourceImage) {
        var isStylable;
        if (sourceImage !== '' && sourceImage !== undefined && sourceImage !== null) {
            isStylable = sourceImage.split('.').pop() === 'svg';
        } else {
            isStylable = false;
        }
        return isStylable;
    };

    UtilsImage.getBrokenSvg = function () {
        // svg created according to "../common/libs/wfUtils/broken.svg"
        var svgElement = document.createElementNS(d3.ns.prefix.svg, 'svg');
        var brokenSvg = d3.select(svgElement)
            .attr('style', 'width: 20px; height:23px');

        brokenSvg.append('line')
            .attr('x1', 3.75)
            .attr('y1', -0.069449)
            .attr('x2', 0.75)
            .attr('y2', 23)
            .attr('stroke', '#b2b2b2')
            .attr('stroke-width', 1.5);

        brokenSvg.append('line')
            .attr('x1', 23)
            .attr('y1', 22.25)
            .attr('x2', 0)
            .attr('y2', 22.25)
            .attr('stroke', '#666666')
            .attr('stroke-width', 1.5);

        brokenSvg.append('line')
            .attr('x1', 22.521265)
            .attr('y1', 3.787241)
            .attr('x2', 22.521265)
            .attr('y2', 16.808505)
            .attr('stroke', '#666666')
            .attr('stroke-width', 1.5);

        brokenSvg.append('line')
            .attr('x1', 19.25)
            .attr('y1', 5.202132)
            .attr('x2', 19.25)
            .attr('y2', 23)
            .attr('stroke', '#666666')
            .attr('stroke-width', 1.5);

        brokenSvg.append('rect')
            .attr('height', 3.339856)
            .attr('width', 15.40424)
            .attr('x', 2.297881)
            .attr('y', 17.436729)
            .attr('stroke', '#00bf00')
            .attr('stroke-width', 1.5)
            .attr('fill', '#00bf00');

        brokenSvg.append('rect')
            .attr('height', 7.914511)
            .attr('width', 14.553177)
            .attr('x', 2.808519)
            .attr('y', 8.01064)
            .attr('stroke', '#97c9fc')
            .attr('stroke-width', 2.5)
            .attr('fill', '#97c9fc');

        brokenSvg.append('rect')
            .attr('height', 3.489358)
            .attr('width', 8.51063)
            .attr('x', 2.808518)
            .attr('y', 2.563837)
            .attr('stroke', '#97c9fc')
            .attr('stroke-width', 2.5)
            .attr('fill', '#97c9fc');

        brokenSvg.append('ellipse')
            .attr('rx', 1.548673)
            .attr('ry', 0.309735)
            .attr('cx', 5.840707)
            .attr('cy', 5.615045)
            .attr('stroke', '#ffffff')
            .attr('stroke-width', 1.5);

        brokenSvg.append('ellipse')
            .attr('rx', 7.743362)
            .attr('ry', 2.964602)
            .attr('cx', 10.088495)
            .attr('cy', 16.676991)
            .attr('stroke', '#00bf00')
            .attr('stroke-width', 1.5)
            .attr('fill', '#00bf00');

        brokenSvg.append('line')
            .attr('x1', 21.814158)
            .attr('y1', 12.207965)
            .attr('x2', 7.743362)
            .attr('y2', 25.039822)
            .attr('stroke', '#ffffff')
            .attr('stroke-width', 3.5);

        brokenSvg.append('line')
            .attr('x1', 12.964601)
            .attr('y1', 0.349558)
            .attr('x2', 19.690264)
            .attr('y2', 6.013275)
            .attr('stroke', '#666666')
            .attr('stroke-width', 1.5);

        brokenSvg.append('line')
            .attr('x1', 0)
            .attr('y1', 0.615045)
            .attr('x2', 13.672565)
            .attr('y2', 0.792036)
            .attr('stroke', '#b2b2b2')
            .attr('stroke-width', 1.5);

        brokenSvg.append('line')
            .attr('x1', 12.964601)
            .attr('y1', -0.09292)
            .attr('x2', 13.053096)
            .attr('y2', 6.89823)
            .attr('stroke', '#666666')
            .attr('stroke-width', 1.5);

        brokenSvg.append('line')
            .attr('x1', 19.867255)
            .attr('y1', 6.190266)
            .attr('x2', 12.610619)
            .attr('y2', 6.278761)
            .attr('stroke', '#666666')
            .attr('stroke-width', 1.5);

        return svgElement;
    };

    return UtilsImage;

});
