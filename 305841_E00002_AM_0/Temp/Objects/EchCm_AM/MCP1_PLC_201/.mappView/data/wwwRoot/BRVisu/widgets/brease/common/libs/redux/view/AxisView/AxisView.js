define([
    'widgets/brease/common/libs/redux/utils/UtilsAxis'
], function (UtilsAxis) {

    'use strict';

    /**
     * @class widgets.brease.common.libs.redux.view.AxisView.AxisView
     *
     * This View is using following Utils:
     * {@link widgets.brease.common.libs.redux.utils.UtilsAxis UtilsAxis}
     */

    var AxisView = function (props, parent, self) {
        if (self === undefined) {
            this.create(props, parent);
            this.render(props, parent);
        } else {
            self.render(props, parent);
        }
        this.props = props;
    };

    var p = AxisView.prototype;

    /**
     * @method
     * The create Function is Creating the Element setup
     *
     * This function is unsing following function from UtilsAxis:
     * {@link widgets.brease.common.libs.redux.utils.UtilsAxis#createCombinedAxis UtilsAxis.createCombinedAxis}
     *
     * @param {Object} props structure with all necessary information to create an Axis
     * @param {HTMLElement} props.elem HTMLElement where the Axis should be added
     * @param {UInteger} props.height height of Axis-Container
     * @param {UInteger} props.width width of Axis-Container
     * @param {brease.enum.TickStyle} props.tickPosition position of the Ticks
     * @param {brease.enum.Orientation} props.orientation Orientation of the Widget
     * @param {Object} props.scale scale for the Axis
     * @param {Number} props.limitMin minimumLimit for Axis
     * @param {Number} props.limitMax maximumLimit for Axis
     * @param {UInteger} props.majorTicks amount of Ticks to be shown on Axis
     * @param {brease.config.MeasurementSystemFormat} props.format format which should be applied to tickNumbers
     * @param {Boolean} props.showTickNumbers defines if the Ticknumbers will be shown
     * @param {Boolean} props.showUnitSymbol defines if the UnitSymbol should be shown
     * @param {Integer} props.scaleOffset defines the offset from the Center
     *
     * @param {HTMLElement} parent jQuery reference to parent Container
     */
    p.create = function (props, parent) {
        UtilsAxis.createCombinedAxis(props);
        this.el = parent.find('svg.Axis');
        this.el.addClass('AxisView');
    };

    /**
     * @method
     * The render function is updating the View
     *
     * This function is unsing following function from UtilsAxis:
     * {@link widgets.brease.common.libs.redux.utils.UtilsAxis#updateCombinedAxis UtilsAxis.updateCombinedAxis}
     *
     * @param {Object} props structure with all necessary information to create an Axis
     * @param {HTMLElement} props.elem HTMLElement where the Axis should be added
     * @param {UInteger} props.height height of Axis-Container
     * @param {UInteger} props.width width of Axis-Container
     * @param {brease.enum.TickStyle} props.tickPosition position of the Ticks
     * @param {brease.enum.Orientation} props.orientation Orientation of the Widget
     * @param {Object} props.scale scale for the Axis
     * @param {Number} props.limitMin minimumLimit for Axis
     * @param {Number} props.limitMax maximumLimit for Axis
     * @param {UInteger} props.majorTicks amount of Ticks to be shown on Axis
     * @param {brease.config.MeasurementSystemFormat} props.format format which should be applied to tickNumbers
     * @param {Boolean} props.showTickNumbers defines if the Ticknumbers will be shown
     * @param {Boolean} props.showUnitSymbol defines if the UnitSymbol should be shown
     * @param {Integer} props.scaleOffset defines the offset from the Center
     *
     * @param {HTMLElement} parent jQuery reference to parent Container
     */
    p.render = function render(props, parent) {
        UtilsAxis.updateCombinedAxis(props);

    };

    p.dispose = function dispose() {
        
    };

    return AxisView;

});
