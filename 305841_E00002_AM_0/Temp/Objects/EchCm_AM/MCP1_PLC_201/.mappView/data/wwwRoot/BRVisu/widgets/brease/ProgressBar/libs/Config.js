define(['brease/enum/Enum'
], function (Enum) {

    'use strict';

    /**
     * @class widgets.brease.ProgressBar.Config
     * @extends core.javascript.Object
     * @override widgets.brease.ProgressBar
     */

    /**
     * @cfg {brease.datatype.Node} node=''
     * @bindable
     * @iatStudioExposed
     * @iatCategory Data
     * Display value with unit and limits.
     */
    
    /**
     * @cfg {Number} value=0
     * @bindable
     * @iatStudioExposed
     * @nodeRefId node
     * @iatCategory Data
     * Initial visible value of widget as a number
     */

    /**
     * @cfg {Number} minValue=0
     * @bindable
     * @iatStudioExposed
     * @iatCategory Behavior
     * Minimum value for the bound variable.  
     */

    /**
     * @cfg {Number} maxValue=100
     * @bindable 
     * @iatStudioExposed
     * @iatCategory Behavior
     * Maximum value for the bound variable.
     */

    /**
     * @cfg {brease.enum.Orientation} orientation='LeftToRight'
     * Orientation of widget  
     * @iatStudioExposed
     * @iatCategory Appearance
     */

    /**
     * @cfg {Boolean} showLabel=true
     * Controls the visibility of the percentage label text-field.
     * @iatStudioExposed
     * @groupRefId Label
     * @groupOrder 1
     * @iatCategory Appearance
     */

    /**
     * @cfg {brease.enum.Position} labelPosition='right'
     * Location of the output label text-field. Possible values: right, left, middle, center, top, bottom
     * @iatStudioExposed
     * @groupRefId Label
     * @groupOrder 2
     * @iatCategory Appearance
     */

    /**
     * @cfg {Boolean} stripedProgressBar=false
     * Applies a striped styling to the progress bar.
     * @iatStudioExposed
     * @groupRefId Bar
     * @groupOrder 6
     * @iatCategory Appearance
     */

    /**
     * @cfg {Boolean} barAnimation=false
     * Set to TRUE to enable animation of the progress bar when styled as "striped"
     * @iatStudioExposed
     * @iatCategory Behavior
     */

    /**
     * @cfg {UInteger} transitionTime=500
     * Defines the time (in ms) used for the transition to a new bar value
     * @iatStudioExposed
     * @iatCategory Behavior
     */

    /**
     * @cfg {Size} labelSize='30'
     * @iatStudioExposed
     * @groupRefId Label
     * @iatCategory Appearance
     * Width of unit area.
     */

    return {
        value: 0,
        minValue: 0,
        maxValue: 100,
        node: { },
        showLabel: true,
        labelPosition: Enum.Position.right,
        orientation: Enum.Orientation.LTR,
        stripedProgressBar: false,
        barAnimation: false,
        transitionTime: 500,
        labelSize: '30'
    };
});
