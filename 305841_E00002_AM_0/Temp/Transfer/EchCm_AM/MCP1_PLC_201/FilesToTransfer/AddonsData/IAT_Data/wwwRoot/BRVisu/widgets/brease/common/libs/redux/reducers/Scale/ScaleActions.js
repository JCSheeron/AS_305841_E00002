define(function () {

    'use strict';

    /**
     * @class widgets.brease.common.libs.redux.reducers.Scale.ScaleActions
     * @iatMeta studio:visible
     * false
     */

    var ScaleActions = {
        //Change to a new trackSize
        SCALEDOMAIN_CHANGE: 'SCALEDOMAIN_CHANGE',
        changeScaleDomain: function changeScaleDomain(newScaleDomain) {
            return {
                type: ScaleActions.SCALEDOMAIN_CHANGE,
                scaleDomain: newScaleDomain
            };
        },
        SCALERANGE_CHANGE: 'SCALERANGE_CHANGE',
        changeScaleRange: function changeScaleRange(newScaleRange) {
            return {
                type: ScaleActions.SCALERANGE_CHANGE,
                scaleRange: newScaleRange
            };
        },
        SCALEOFFSET_CHANGE: 'SCALEOFFSET_CHANGE',
        changeScaleOffset: function changeScaleOffset(newScaleOffset) {
            return {
                type: ScaleActions.SCALEOFFSET_CHANGE,
                scaleOffset: newScaleOffset
            };
        },
        SCALEPOSITION_CHANGE: 'SCALEPOSITION_CHANGE',
        changeScalePosition: function changeScalePosition(newTickPosition) {
            return {
                type: ScaleActions.SCALEPOSITION_CHANGE,
                tickPosition: newTickPosition
            };
        },
        SCALEMAJORTICKS_CHANGE: 'SCALEMAJORTICKS_CHANGE',
        changeScaleMajorTicks: function changeScaleMajorTicks(newMajorTicks) {
            return {
                type: ScaleActions.SCALEMAJORTICKS_CHANGE,
                majorTicks: newMajorTicks
            };
        },
        SCALESHOWTICKNUMBERS_CHANGE: 'SCALESHOWTICKNUMBERS_CHANGE',
        changeScaleShowTickNumbers: function changeScaleShowTickNumbers(newShowTickNumbers) {
            return {
                type: ScaleActions.SCALESHOWTICKNUMBERS_CHANGE,
                showTickNumbers: newShowTickNumbers
            };
        }
    };

    return ScaleActions;

});
