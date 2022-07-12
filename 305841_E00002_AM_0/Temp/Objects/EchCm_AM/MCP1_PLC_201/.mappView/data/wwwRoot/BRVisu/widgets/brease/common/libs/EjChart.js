define(['widgets/brease/common/libs/EjChartCache', 'widgets/brease/common/libs/external/syncfusion/datavisualization/ej.chart'], function (EjChartCache) {
    'use strict';
    /**
    * @class widgets.brease.common.libs.EjChart
    * wrapper class for syncfusion ejchart adds a
    * custom extension to reduce calculations
    * @extends Object
    * @singleton
    */
    var EjChart = function () { },
        p = EjChart.prototype;
    /**
    * @method init
    * @param {HTMLElement} el
    * jquery reference to a wrapper element where the chart 
    * should be inserted
    * @param {Object} model
    * options for syncfusion ejchart
    */
    p.init = function (el, model) {
        this.addEventListener(el, 'preRender', this.onPreRender);
        el.ejChart(model);
        var chart = el.ejChart('instance');
        chart.chartExtensions = {
            cache: new EjChartCache()
        };
    };
    /**
    * @method onPreRender
    * called before syncfusion starts rendering the current data in the model
    * used to set the _initialRange attribute for each axis as workaround for
    * (A&P 711405) until syncfusion provides a bugfix 
    */
    p.onPreRender = function (e) {
        var axes = e.model && Array.isArray(e.model._axes) ? e.model._axes : [],
            currAxis;
        for (var i = 0; i < axes.length; i += 1) {
            currAxis = axes[i];
            // workaround for syncfusion bug in _saveRange method. _initialRange only set once at the beginning and
            // will overwrite ranges after redraw => make sure the _initialRange is always up to date
            currAxis._initialRange = currAxis.range === null ? { min: null, max: null, interval: null } : { min: currAxis.range.min, max: currAxis.range.max, interval: currAxis.range.interval };
        }
    };
    /**
    * @method addEventListener
    * add an event listener for ejchart specific events
    * @param {HTMLElement} el
    * jquery reference to the element where an ejChart instance will be created
    * @param {String} eventName
    * name of the event see https://help.syncfusion.com/api/js/ejchart#events for available events
    * @param {Function} listener
    * the function which should be called
    */
    p.addEventListener = function (el, eventName, listener) {
        el.on('ejChart' + eventName, listener);
    };
    var instance = new EjChart();
    return instance;
});
