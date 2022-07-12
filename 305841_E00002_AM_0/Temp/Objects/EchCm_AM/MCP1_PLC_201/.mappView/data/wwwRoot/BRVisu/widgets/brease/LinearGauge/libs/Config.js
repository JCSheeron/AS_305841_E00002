define([
    'brease/enum/Enum'
], function (Enum) {

    'use strict';

    /**
     * @class widgets.brease.LinearGauge.Config
     * @extends core.javascript.Object
     * @override widgets.brease.LinearGauge
     */

    /**
     * @cfg {brease.config.MeasurementSystemFormat} format={'metric':{ 'decimalPlaces' : 1, 'minimumIntegerDigits' : 1 }, 'imperial' :{ 'decimalPlaces' : 1, 'minimumIntegerDigits' : 1 }, 'imperial-us' :{ 'decimalPlaces' : 1, 'minimumIntegerDigits' : 1 }}
     * @iatStudioExposed
     * @bindable
     * @iatCategory Appearance
     * NumberFormat for every measurement system.
     */

    /**
     * @cfg {Number} minValue=0
     * @bindable
     * @iatStudioExposed
     * @iatCategory Behavior
     * Minimum value for gauge pointer to display.  
     */

    /**
     * @cfg {Number} maxValue=100
     * @bindable
     * @iatStudioExposed
     * @iatCategory Behavior
     * Maximum value for gauge pointer to display.  
     */

    /**
     * @cfg {UInteger} majorTicks=9
     * @iatStudioExposed
     * @iatCategory Appearance
     * Number of major Ticks.
     */

    /**
     * @cfg {UInteger} minorTicks=4
     * @iatStudioExposed
     * @iatCategory Appearance
     * Number of minor Ticks.
     */

    /**
     * @cfg {brease.enum.Orientation} orientation='LeftToRight'
     * @iatStudioExposed
     * @iatCategory Appearance
     * Orientation of the widget
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
     * Value for the pointer.
     */

    /**
     * @cfg {brease.datatype.Node} scaleArea0Node=''
     * @bindable
     * @iatStudioExposed
     * @iatCategory Data
     * Start of first scale area. A scale area is shown as a background color behind the minor 
     * and major ticks. Include unit and limits.
     */

    /**
     * @cfg {Number} scaleArea0=0
     * @bindable
     * @iatStudioExposed
     * @nodeRefId scaleArea0Node
     * @iatCategory Data
     * Start of first scale area. A scale area is shown as a background color behind the minor 
     * and major ticks. Defined in value.
     */

    /**
     * @cfg {brease.datatype.Node} scaleArea1Node=''
     * @bindable
     * @iatStudioExposed
     * @iatCategory Data
     * End of first scale area. A scale area is shown as a background color behind the minor and 
     * major ticks. This value is also used as start of the second scale area. Include unit and limits.
     */

    /**
     * @cfg {Number} scaleArea1=20
     * @bindable
     * @iatStudioExposed
     * @nodeRefId scaleArea1Node
     * @iatCategory Data
     * End of first scale area. A scale area is shown as a background color behind the minor and 
     * major ticks. This value is also used as start of the second scale area. Defined in value.
     */

    /**
     * @cfg {brease.datatype.Node} scaleArea2Node=''
     * @bindable
     * @iatStudioExposed
     * @iatCategory Data
     * End of second scale area. A scale area is shown as a background color behind the minor 
     * and major ticks. This value is also used as start of the third scale area. Include unit and limits.
     */

    /**
     * @cfg {Number} scaleArea2=40
     * @bindable
     * @iatStudioExposed
     * @nodeRefId scaleArea2Node
     * @iatCategory Data
     * End of second scale area. A scale area is shown as a background color behind the minor 
     * and major ticks. This value is also used as start of the third scale area. Defined in value.
     */

    /**
     * @cfg {brease.datatype.Node} scaleArea3Node=''
     * @bindable
     * @iatStudioExposed
     * @iatCategory Data
     * End of third scale area. A scale area is shown as a background color behind the minor and 
     * major ticks. This value is also used as start of the fourth scale area. Include unit and limits.
     */

    /**
     * @cfg {Number} scaleArea3=60
     * @bindable
     * @iatStudioExposed
     * @nodeRefId scaleArea3Node
     * @iatCategory Data
     * End of third scale area. A scale area is shown as a background color behind the minor and 
     * major ticks. This value is also used as start of the fourth scale area. Defined in value.
     */

    /**
     * @cfg {brease.datatype.Node} scaleArea4Node=''
     * @bindable
     * @iatStudioExposed
     * @iatCategory Data
     * End of fourth scale area. A scale area is shown as a background color behind the minor 
     * and major ticks. This value is also used as start of the fifth scale area. Include unit and limits.
     */

    /**
     * @cfg {Number} scaleArea4=80
     * @bindable
     * @iatStudioExposed
     * @nodeRefId scaleArea4Node
     * @iatCategory Data
     * End of fourth scale area. A scale area is shown as a background color behind the minor 
     * and major ticks. This value is also used as start of the fifth scale area. Defined in value.
     */

    /**
     * @cfg {brease.datatype.Node} scaleArea5Node=''
     * @bindable
     * @iatStudioExposed
     * @iatCategory Data
     * End of fifth scale area. A scale area is shown as a background color behind the minor and 
     * major ticks. Include unit and limits.
     */

    /**
     * @cfg {Number} scaleArea5=100
     * @bindable
     * @iatStudioExposed
     * @nodeRefId scaleArea5Node
     * @iatCategory Data
     * End of fifth scale area. A scale area is shown as a background color behind the minor and 
     * major ticks. Defined in value.   
     */

    /**
     * @cfg {UInteger} areasSize=10
     * @iatStudioExposed
     * @iatCategory Appearance
     * Specifies the size for the areas: height for horizontal oriented widgets and 
     * width for vertical oriented widgets
     */

    /**
     * @cfg {UInteger} areasPadding=3
     * @iatStudioExposed
     * @iatCategory Appearance
     * Specifies the padding between the areas and the scale
     */

    /**
     * @cfg {UInteger} pointerSize=15
     * @iatStudioExposed
     * @iatCategory Appearance
     * Specifies the size of the default pointer
     */

    /**
     * @cfg {UInteger} pointerPadding=0
     * @iatStudioExposed
     * @iatCategory Appearance
     * Specifies the padding between the pointer and the scale
     */

    /**
     * @cfg {UInteger} scalePadding=30
     * @iatCategory Appearance
     * Specifies the padding between the scale and the outer border of the widget
     */

    /**
     * @cfg {UInteger} axisPadding=0
     * @iatStudioExposed
     * @iatCategory Appearance
     * Specifies the offset between the axis and the outer border of the widget
     */

    /**
     * @cfg {Boolean} showUnit=false
     * @iatStudioExposed
     * @iatCategory Behavior
     * Determines if the unit is displayed.  
     */

    /**
     * @cfg {Boolean} showPointer=true
     * @bindable
     * @iatStudioExposed
     * @iatCategory Behavior
     * Determines if the pointer is displayed.  
     */

    /**
     * @cfg {brease.config.MeasurementSystemUnit} unit=''
     * @iatStudioExposed
     * @bindable
     * @iatCategory Appearance
     * Unit code for every measurement system.  
     */

    return {
        value: 0,
        minValue: 0,
        maxValue: 100,
        node: { },
        format: {
            'metric': {
                'decimalPlaces': 1,
                'minimumIntegerDigits': 1
            },
            'imperial': {
                'decimalPlaces': 1,
                'minimumIntegerDigits': 1
            },
            'imperial-us': {
                'decimalPlaces': 1,
                'minimumIntegerDigits': 1
            }
        },
        majorTicks: 9,
        minorTicks: 4,
        orientation: Enum.Orientation.LTR,
        scaleArea0: 0,
        scaleArea1: 20,
        scaleArea2: 40,
        scaleArea3: 60,
        scaleArea4: 80,
        scaleArea5: 100,
        areasSize: 10,
        areasPadding: 3,
        pointerSize: 15,
        pointerPadding: 0,
        scalePadding: 30,
        axisPadding: 0,
        showUnit: false,
        showPointer: true,
        height: 60,
        width: 380
    };

});
