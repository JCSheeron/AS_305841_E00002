define(['widgets/brease/common/libs/redux/reducers/Orientation/OrientationActions'],
    function (OrientationActions) {

        'use strict';

        var OrientationReducer = function OrientationReducer(state, action) {
            if (state === undefined) {
                return null;
            }
            switch (action.type) {
                case OrientationActions.ORIENTATION_CHANGE:
                    state.orientation = action.orientation;
                    return state;

                default:
                    return state;
            }
        };

        return OrientationReducer;

    });
