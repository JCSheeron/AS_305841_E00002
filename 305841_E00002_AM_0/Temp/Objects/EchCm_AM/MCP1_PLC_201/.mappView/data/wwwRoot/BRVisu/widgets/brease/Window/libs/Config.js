define([
    'brease/enum/Enum'
], function (
    Enum
) {

    'use strict';

    /**
    * @class brease.objects.WindowConfig
    * @extends core.javascript.Object
    */

    /**
    * @cfg {Object} position={'horizontal':'center', 'vertical':'middle'}
    * @iatStudioExposed
    * Horizontal and vertical position of the Window.  
    * Either a string (horizontal:left/center/right, vertical:top/middle/bottom) or an integer.  
    * Example :
    *
    *       {'horizontal': 'center', 'vertical': 105}
    *
    * @cfg {brease.enum.Position/Integer} position.horizontal='center'
    * Horizontal position of window. Either a string (see at {@link brease.enum.Position}) or an integer (absolute position in relation to pointOfOrigin).  
    * @cfg {brease.enum.Position/Integer} position.vertical='middle'
    * Vertical position of window. Either a string (see at {@link brease.enum.Position}) or an integer (absolute position in relation to pointOfOrigin).  
    */

    /**
    * @cfg {brease.enum.PointOfOrigin} pointOfOrigin='application'
    * Defines the method how position is calculated related to the reference element. The reference element is an argument of method 'show'.  
    * Value 'container' positions the window inside the reference element.   
    * E.g {pointOfOrigin:'container', position:{horizontal:'left'}} positions the window on the left side inside the element. {@img window_inside.png}
    * Value 'element' positions the window outside the reference element.   
    * E.g {pointOfOrigin:'element', position:{horizontal:'left'}} positions the window on the left side outside the element. {@img window_outside.png}
    * Value 'application' means the same positions as achieved with setting 'container' and element=document.body  
    */

    /**
    * @cfg {Object} arrow
    * An arrow for relatively positioned windows to point to the opener element.  
    * @cfg {String} arrow.width=0
    * Size of the arrow triangle from base to top.  
    * @cfg {String} arrow.show=false
    * Option to hide or show  the arrow.  
    * @cfg {String} arrow.position='left'
    * Option to position the arrow on the left or right side of the window.  
    */
    /**
    * @cfg {Boolean} modal=true
    * @iatStudioExposed
    * If true, the window will be modal, in the meaning that no interaction with beneath page is possible. A semi transparent overlay between window and parent application will catch user actions.  
    * It depends on settings 'showCloseButton' and 'forceInteraction' how the user can close the window.  
    */
    /**
    * @cfg {Boolean} forceInteraction=false
    * If true, the user has to click something inside the window to close it. If in addition 'modal' is true, its a real modal window. In this case you have to provide a button to close the window, as otherwise the application could stuck.  
    * If false, a click outside the window will close it, if setting 'modal' is true.  
    */
    /**
    * @cfg {Boolean} showCloseButton=true
    * Option to show a close button in the upper right corner of the window.  
    */
    /**
    * @cfg {brease.enum.AutoRaise} autoRaise='enabled'
    * @iatStudioExposed
    * Can be used to configure the behavior of raising a window above others when the user 
    * clicks on it. The default behavior will raise the window automaically when the user clicks on it
    */
    return {
        html: 'widgets/brease/Window/Window.html',
        modal: true,
        arrow: {
            show: false,
            width: 12,
            position: Enum.Position.left
        },
        forceInteraction: false,
        showCloseButton: true,
        position: {
            horizontal: 'center',
            vertical: 'middle'
        },
        pointOfOrigin: Enum.PointOfOrigin.APP,
        headerHeight: 42,
        autoRaise: Enum.AutoRaise.ENABLED
    };

});

/**
* @class brease.objects.WindowOptions
* @extends brease.objects.WindowConfig
* @embeddedClass
* @virtualNote 
*/
/**
* @cfg {Size} width
* If no width is given, its calculated to fit content. Maximal value is width of the screen.
*/
/**
* @cfg {Size} height
* If no height is given, its calculated to fit content.
*/
/**
* @cfg {Object} header
* @cfg {String} header.text
* Text (or key) for header.
*/
/**
* @cfg {Object} content
* @cfg {String} content.text
* Text (or key) for content.
*/
/**
* @cfg {String} cssClass
* Additional css class name for opened instance.
*/

/**
* @class brease.objects.DialogWindowOptions
* @extends brease.objects.WindowOptions
* @embeddedClass
* @virtualNote 
*/
/**
* @cfg {String} pageId
* Id of page to appear in widget.  
*/
/**
* @cfg {String} url (required)
* Url of page to appear in widget.
*/
/**
* @cfg {String} content
* @hide
*/

/**
* @class brease.objects.KeyboardOptions
* @extends brease.objects.WindowOptions
* @embeddedClass
* @virtualNote 
*/
/**
* @cfg {String} text
*/
/**
* @cfg {String} restrict
*/
/**
* @cfg {Integer} maxLength
*/
/**
* @cfg {brease.enum.InputType} type
*/
/**
* @cfg {Size} width
* @hide
*/
/**
* @cfg {Size} height
* @hide
*/

/**
* @class brease.objects.MessageBoxOptions
* @extends brease.objects.WindowOptions
* @embeddedClass
* @virtualNote 
*/
/**
* @cfg {Object} question
* @cfg {String} question.text
* Text (or key) for question.
*/

/**
* @class brease.objects.NumpadOptions
* @extends brease.objects.WindowOptions
* @embeddedClass
* @virtualNote 
*/
/**
* @cfg {Number} value (required)
*   
*/
/**
* @cfg {Number} minValue (required)
*   
*/
/**
* @cfg {Number} maxValue (required)
* 
*/
/**
* @cfg {brease.config.MeasurementSystemFormat} format  
* NumberFormat for every measurement system
*/
/**
* @cfg {Boolean} useDigitGrouping  
* Determines if digit grouping should be used
*/
/**
* @cfg {brease.enum.LimitViolationPolicy} limitViolationPolicy
* Controls behaviour in case of a limit violation.   
*/
/**
* @cfg {String} content
* @hide
*/
/**
* @cfg {Boolean} showCloseButton
* @hide
*/
/**
* @cfg {Size} width
* @hide
*/
/**
* @cfg {Size} height
* @hide
*/
/**
* @cfg {Boolean} modal
* @hide
*/
