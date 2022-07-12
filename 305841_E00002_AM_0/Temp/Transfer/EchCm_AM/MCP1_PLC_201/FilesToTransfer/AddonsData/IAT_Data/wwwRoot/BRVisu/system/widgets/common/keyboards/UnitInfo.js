define(function () {

    'use strict';

    /**
    * @class system.widgets.common.keyboards.UnitInfo
    * @extends Object
    */
    /**
    * @property {jQuery[]} elements
    */

    /**
    * @method constructor
    * Creates a new UnitInfo instance
    * @param {jQuery} parentEl
    */
    var UnitInfo = function (parentEl) {
        this.elements = [];
        this.parentEl = parentEl;
        this.init();
    };

    UnitInfo.prototype.init = function () {
        this.elements = this.parentEl.find('.unitInfo');
    };

    UnitInfo.prototype.setError = function (errorFlag) {
        this.elements.toggleClass('error', errorFlag);
    };

    /**
    * @method validListener
    * listener to 'Validation' event of validator
    * @param {Object} e
    */
    UnitInfo.prototype.validListener = function (e) {
        this.setError(!e.detail.valid);
    };

    UnitInfo.prototype.dispose = function () {
        this.elements = null;
        this.parentEl = null;
    };

    /**
    * @method show
    * method to show all elements with class "unitInfo" and display the symbol of the unit
    * @param {brease.config.MeasurementSystemUnit} unitObj
    */
    UnitInfo.prototype.show = function (unitObj) {
        var that = this;
        setAllEmpty.call(this);
        var currentMMS = brease.services.measurementSystem.getCurrentMeasurementSystem(),
            unitCommonCode = unitObj ? unitObj[currentMMS] : undefined;

        brease.language.pipeAsyncUnitSymbol(unitCommonCode, function (symbol) {
            if (that.elements && symbol !== undefined) {
                that.elements.text(symbol); 
            }
        });

    };

    function setAllEmpty() {
        this.elements.text(''); 
    }

    return UnitInfo;
});
