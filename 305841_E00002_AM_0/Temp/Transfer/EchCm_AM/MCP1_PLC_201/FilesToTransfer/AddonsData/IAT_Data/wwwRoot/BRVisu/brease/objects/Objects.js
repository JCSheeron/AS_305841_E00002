define(function () {

    'use strict';

    /**
    * @class brease.objects.ListEntry
    * @extends Object
    * @embeddedClass
    * @virtualNote 
    */
    /**
    * @property {String/Number} value
    */
    /**
    * @property {String} text
    */
    /**
    * @property {String} image
    */

    /**
    * @class brease.objects.NodeData
    * @extends Object
    * @alternateClassName NodeData
    * @embeddedClass
    * @virtualNote 
    * Info object for node changes
    */
    /**
    * @property {String} attribute (required)
    * name of the widget attribute of type Node (e.g. 'node' in NumericInput)
    */
    /**
    * @property {String} nodeAttribute (required)
    * name of the node attribute (e.g. 'unit')
    */
    /**
    * @property {ANY} value (required)
    * value of the changed node attribute (e.g. 'FAH')
    */

    /**
    * @class brease.objects.WidgetConfig
    * @alternateClassName WidgetConfig
    * @extends Object
    * @embeddedClass
    * @virtualNote
    * Config object for dynamic instantiation of widgets with brease.uiController.  
    * Example:
    *
    *       brease.uiController.createWidgets(widget.elem, [{
    *                className: 'widgets.brease.ToggleButton',
    *                id: 'ToggleButton_d01',
    *                options: {
    *                    imageAlign: 'right'
    *                },
    *                HTMLAttributes: {
    *                   style:'display:block;'
    *                }
    *            }]);
    */
    /**
    * @property {WidgetType} className (required)
    */
    /**
    * @property {String} id (required)
    * Id of newly created widget
    */
    /**
    * @property {Object} content
    * Content of created HTML element, either text or html
    * @property {String} [content.text]
    * @property {String} [content.html]
    */
    /**
    * @property {Object} HTMLAttributes
    * Optional HTML attributes for HTML-tag
    */
    /**
    * @property {Object} options
    * Optional config options for widget
    */

    /**
    * @class brease.objects.WidgetInstance
    * @alternateClassName WidgetInstance
    * @extends Object
    * @embeddedClass
    * @virtualNote
    */

    /**
    * @class brease.objects.WidgetType
    * @alternateClassName WidgetType
    * @extends String
    * @embeddedClass
    * @virtualNote
    * Type of a widget class (fully qualified name in dot-notation, e.g. widgets.brease.Button)
    */

    /**
    * @class brease.objects.ClassName
    * @alternateClassName ClassName
    * @extends String
    * @embeddedClass
    * @virtualNote
    * Name of a widget class (fully qualified name in class-notation, e.g. widgets/brease/Button)
    */

    /**
    * @class brease.objects.TimeSpan
    * @alternateClassName TimeSpan
    * @extends Object
    * @embeddedClass
    * @virtualNote
    */
    /**
    * @property {core.datatype.DateTime} startTime
    */
    /**
    * @property {core.datatype.DateTime} endTime
    */

    /**
    * @class brease.objects.NodeInfo
    * @alternateClassName NodeInfo
    * @extends Array
    * @embeddedClass
    * @virtualNote
    */
    /**
    * @property {String} nodeId
    */
    /**
    * @property {brease.config.UnitCode} unit
    */

    /**
    * @class brease.objects.Binding
    * @alternateClassName Binding
    * @extends Object
    * @embeddedClass
    * @virtualNote
    */
    /**
    * @property {BindingMode} mode
    */
    /**
    * @property {BindingSource} source
    */
    /**
    * @property {BindingTarget} target
    */
    
    /**
    * @class brease.objects.BindingSource
    * @alternateClassName BindingSource
    * @extends Object
    * @embeddedClass
    * @virtualNote
    */
    /**
    * @property {BindingSourceType} type
    */
    /**
    * @property {String} refId
    */
    /**
    * @property {String} attribute
    */

    /**
    * @class brease.objects.BindingTarget
    * @alternateClassName BindingTarget
    * @extends Object
    * @embeddedClass
    * @virtualNote
    */
    /**
    * @property {BindingTargetType} type
    */
    /**
    * @property {String} refId
    */
    /**
    * @property {String} attribute
    */

    /** 
    * @enum {String} brease.objects.BindingMode 
    * @alternateClassName BindingMode
    */
    /** 
    * @property {String} oneWay='oneWay'
    */
    /** 
    * @property {String} oneWayToSource='oneWayToSource'
    */
    /** 
    * @property {String} twoWay='twoWay'
    */

    /** 
    * @enum {String} brease.objects.BindingTargetType 
    * @alternateClassName BindingTargetType
    */
    /** 
    * @property {String} brease='brease'
    */

    /** 
    * @enum {String} brease.objects.BindingSourceType 
    * @alternateClassName BindingSourceType
    */
    /** 
    * @property {String} brease='brease'
    */
    /** 
    * @property {String} variable='variable'
    */
    /** 
    * @property {String} opcUa='opcUa'
    */

    /**
    * @class brease.objects.ResponseStatus
    * @alternateClassName ResponseStatus
    * @extends Object
    * @embeddedClass
    * @virtualNote
    */
    /** 
    * @property {Integer} code
    * success: code=0  
    * error: code>0  
    */
    /** 
    * @property {String} message
    */

    /**
    * @enum {String} brease.objects.PathType
    * @alternateClassName PathType
    * @embeddedClass
    * @datatypeNote 
    * Types of widget paths 
    */
    /** 
    * @property {String} class
    * e.g. widgets/brease/Button
    */
    /** 
    * @property {String} path
    * e.g. widgets/brease/Button/Button
    */
    /** 
    * @property {String} style
    * e.g. widgets_brease_Button
    */
    /** 
    * @property {String} type
    * e.g. widgets.brease.Button
    */
    
    /**
    * @class brease.objects.Mapping
    * @extends Object
    * @embeddedClass
    * @virtualNote 
    */
    /**
    * @property {String} id
    */
    /**
    * @property {String} prop
    */

    return null;
});
