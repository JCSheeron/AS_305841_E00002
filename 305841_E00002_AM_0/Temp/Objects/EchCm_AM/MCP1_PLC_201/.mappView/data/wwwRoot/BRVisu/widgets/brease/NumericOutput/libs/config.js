define(['brease/enum/Enum'], function (Enum) {

    'use strict';

    /**
    * @class widgets.brease.NumericOutput.Config
    * @extends core.javascript.Object
    * @override widgets.brease.NumericOutput
    */

    /**
    * @cfg {brease.enum.Position} numpadPosition
    * @hide
    */

    /**
    * @cfg {Boolean} submitOnChange
    * @hide
    */

    /**
    * @cfg {Boolean} keyboard
    * @hide
    */

    /**
    * @cfg {StyleReference} numPadStyle
    * @hide
    */

    /**
    * @cfg {brease.enum.LimitViolationPolicy} limitViolationPolicy
    * @hide
    */

    /**
    * @method submitChange
    * @hide
    */

    /**
     * @event ValueChanged
     * @param {Number} value
     * @hide
     */

    /**
    * @cfg {Number} value=0
    * @bindable
    * @iatStudioExposed
    * @iatCategory Data
    * @nodeRefId node
    * Initial visible value of input field as a number
    */

    /**
    * @cfg {Boolean} useDigitGrouping=false  
    * @iatStudioExposed
    * @iatCategory Behavior
    * Determines if digit grouping should be used
    */

    /**
     * @cfg {Integer} tabIndex=-1
     * @iatStudioExposed
     * @iatCategory Behavior 
     * sets if a widget should have autofocus enabled (0), the order of the focus (>0),
     * or if autofocus should be disabled (-1)
     */

    var config = {
        value: 0,
        maxValue: 100,
        minValue: 0,
        format: {
            default: {
                decimalPlaces: 1,
                minimumIntegerDigits: 1
            }
        },
        useDigitGrouping: false,
        unitAlign: Enum.ImageAlign.left,
        showUnit: true,
        ellipsis: false,
        unit: null,
        node: null,
        unitWidth: '0',
        unitTextAlign: 'center',
        tabIndex: -1
    };

    return config;
});
