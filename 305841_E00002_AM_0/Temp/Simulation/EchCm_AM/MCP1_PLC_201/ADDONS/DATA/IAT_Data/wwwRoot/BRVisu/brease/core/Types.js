define(['brease/core/Utils'], function (Utils) {
    
    'use strict';

    /**
    * @class brease.core.Types
    * @extends core.javascript.Object
    * Helper class for data types.
    */
    var Types = {

        /**
        * @method parseValue
        * @static
        * Returns a valid value.
        * Examples:
        *
        *       Types.parseValue(this.settings.cornerRadius, 'Integer', { min: 0 });
        *       Types.parseValue(this.settings.cornerRadius, 'Number', { min: 0, max: 100 });
        *       Types.parseValue(this.settings.fillColor, 'Color');
        *       Types.parseValue(this.settings.textAlign, 'Enum', { Enum: Enum.TextAlign, default: 'left' });
        *       Types.parseValue(this.settings.visible, 'Boolean', { default: false });
        *
        * Supported types are: Boolean, String, Integer, Number, Color, Enum  
        * For type 'Enum', a valid {@link brease.enum.EnumObject EnumObject} has to be included in options.  
        *
        * @param {ANY} value
        * @param {String} type datatype of value  
        * possible datatypes: 'Boolean', 'String', 'Integer', 'Number', 'Color', 'Enum'
        * @param {Object} [options] additional options, like min/max for Numbers
        * @return {ANY}
        */
        parseValue: function (value, type, options) {

            var retVal = value;

            switch (type) {
                case 'Enum':
                    retVal = parseEnum(value, options);
                    break;
                case 'Integer':
                    retVal = parseInteger(value, options);
                    break;
                case 'Number':
                    retVal = parseNumber(value, options);
                    break;
                case 'Boolean':
                    retVal = parseBoolean(value, options);
                    break;
                case 'Color':
                    retVal = parseColor(value);
                    break;
                case 'String':
                    retVal = parseString(value, options);
                    break;
                default:

                    break;
            }
            return retVal;
        },
        objectTypes: ['Object', 'Array', 'ItemCollection', 'ContentCollection', 'GraphicCollection', 'RoleCollection', 'brease.config.MeasurementSystemUnit', 'brease.config.MeasurementSystemFormat', 'brease.datatype.Notification', 'brease.datatype.Node', 'brease.datatype.ArrayNode']

    };

    function parseEnum(value, options) {
        var retVal = value;
        if (options.Enum.hasMember(value) !== true) {
            retVal = options.default;
        }
        return retVal;
    }

    function parseInteger(value, options) {
        var retVal = parseInt(value, 10);
        if (isNaN(retVal)) {
            retVal = (options !== undefined && !isNaN(options.default)) ? parseInt(options.default, 10) : 0;
        }
        if (options !== undefined && options.min !== undefined) {
            retVal = Math.max(retVal, options.min);
        }
        if (options !== undefined && options.max !== undefined) {
            retVal = Math.min(retVal, options.max);
        }
        return retVal;
    }

    function parseNumber(value, options) {
        var retVal = parseFloat(value);
        if (isNaN(retVal)) {
            retVal = (options !== undefined && !isNaN(options.default)) ? parseFloat(options.default) : 0;
        }
        if (options !== undefined && options.min !== undefined) {
            retVal = Math.max(retVal, options.min);
        }
        if (options !== undefined && options.max !== undefined) {
            retVal = Math.min(retVal, options.max);
        }
        return retVal;
    }

    function parseBoolean(value, options) {
        var retVal = value;
        if (value !== true && value !== false && value !== 1 && value !== 0 && options && (options.default === true || options.default === false)) {
            retVal = options.default;
        }
        retVal = !!((retVal === true || retVal === 1));
        return retVal;
    }

    var _isColor = /(^#[0-9A-Fa-f]{6}$)|(^#[0-9A-Fa-f]{3}$)|(transparent)|(^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d*(?:\.\d+)?)\)$)|(^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$)/;

    function parseColor(value) {
        var retVal = '' + value;
        if (!_isColor.test(retVal)) {
            retVal = '#000000';
        }
        return retVal;
    }

    function parseString(value, options) {
        if (options !== undefined && options.default !== undefined && !Utils.isString(value)) {
            return options.default;
        }
        return '' + value;
    }

    return Types;

});

/**
* @class core.jquery.Selector
* @alternateClassName Selector
* @embeddedClass
* @virtualNote
* jQuery <a href="http://api.jquery.com/Types/#Selector" target="_blank" style="text-decoration:underline;">Selector</a>
*/

/**
* @class core.jquery.DeferredObject
* @alternateClassName DeferredObject
* @embeddedClass
* @virtualNote
* jQuery <a href="http://api.jquery.com/category/deferred-object/" target="_blank" style="text-decoration:underline;">Deferred Object</a>
*/

/**
* @class core.jquery.Promise
* @alternateClassName Promise
* @embeddedClass
* @virtualNote
* Promise Object of a jQuery <a href="http://api.jquery.com/category/deferred-object/" target="_blank" style="text-decoration:underline;">Deferred Object</a>
*/

/**
* @class core.javascript.Function
* @alternateClassName Function
* @embeddedClass
* Core JavaScript <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function" target="_blank" style="text-decoration:underline;">Function</a>
*/

/**
* @class core.javascript.Object
* @alternateClassName Object
* @embeddedClass
* Core JavaScript <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object" target="_blank" style="text-decoration:underline;">Object</a>
*/

/**
* @class core.javascript.Array
* @alternateClassName Array
* @embeddedClass
* Core JavaScript <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array" target="_blank" style="text-decoration:underline;">Array</a>
*/

/**
* @class core.javascript.Date
* @alternateClassName Date
* @embeddedClass
* Core JavaScript <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date" target="_blank" style="text-decoration:underline;">Date</a>
*/

/**
* @class core.javascript.Event
* @alternateClassName Event
* @embeddedClass
* Core JavaScript <a href="https://developer.mozilla.org/en-US/docs/Web/API/Event" target="_blank" style="text-decoration:underline;">Event</a>
*/

/**
* @class core.html.Element
* @alternateClassName Element
* @embeddedClass
* @virtualNote 
* <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element" target="_blank">Element</a>
*/

/**
* @class core.html.HTMLElement
* @alternateClassName HTMLElement
* @embeddedClass
* @virtualNote 
* <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement" target="_blank">HTML element</a>
*/

/**
* @class core.html.DOMRect
* @alternateClassName DOMRect
* @embeddedClass
* @virtualNote 
* <a href="https://developer.mozilla.org/en-US/docs/Web/API/DOMRect" target="_blank">DOMRect</a>
*/

/**
* @class core.html.Node
* @embeddedClass
* @virtualNote 
* <a href="https://developer.mozilla.org/en-US/docs/Web/API/Node" target="_blank">Node object</a>
*/
/**
* @class core.html.NodeList
* @embeddedClass
* @virtualNote 
* <a href="https://developer.mozilla.org/en-US/docs/Web/API/NodeList" target="_blank">Node List</a>
*/

/**
* @class core.xml.XMLDocument
* @alternateClassName XMLDocument
* @embeddedClass
* @virtualNote 
* <a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLDocument" target="_blank">XMLDocument</a>
*/

/**
* @class core.svg.SVG
* @alternateClassName SVG
* @embeddedClass
* @virtualNote 
* <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg" target="_blank">SVG element</a>
*/

/**
* @class core.datatype.Boolean
* @alternateClassName Boolean
* @embeddedClass
* Basic data type.  
* Value is one of the logical values **true** and **false**.
*/

/**
* @class core.datatype.Number
* @alternateClassName Number
* @embeddedClass
* Basic data type.  
* Value is any real number.   
* Maximum value in JavaScript has a value of approximately 1.79E+308  
* Minimum value in JavaScript has a value of approximately 5e-324
*/

/**
* @class core.datatype.UNumber
* @alternateClassName UNumber
* @embeddedClass
* Data type.  
* Value is any Number >=0
*/

/**
* @class core.datatype.Integer
* @alternateClassName Integer
* @embeddedClass
* @virtualNote 
* Basic data type.  
* Value is any whole number.  
* The maximum safe integer in JavaScript is 2<sup style="vertical-align:super;">53</sup> - 1.  
* The minimum safe integer in JavaScript is -(2<sup style="vertical-align:super;">53</sup> - 1).  
*/

/**
* @class core.datatype.UInteger
* @alternateClassName UInteger
* @embeddedClass
* @virtualNote 
* Data type.  
* Value is any Integer >=0
*/

/**
* @class core.datatype.Index
* @alternateClassName Index
* @embeddedClass
* @virtualNote 
* Data type.  
* Value is any Integer >=-1
*/

/**
* @class core.datatype.String
* @alternateClassName String
* @embeddedClass
* Basic data type.  
* Value is a sequence of characters.
*/

/**
* @class core.datatype.Size
* @alternateClassName Size
* @embeddedClass
* @virtualNote 
* Value is an integer or percentage-value  
* e.g. 297  
* e.g. 40%  
*/

/**
* @class core.datatype.AutoSize
* @alternateClassName AutoSize
* @embeddedClass
* @virtualNote 
* Value is an integer or percentage-value  or 'auto'  
* e.g. 297   
* e.g. 40%  
* e.g. 'auto'  
*/

/**
* @class core.datatype.DateTime
* @alternateClassName DateTime
* @embeddedClass
* @virtualNote 
* Value is a DateTimeString in ECMA-262 format eg: "2012-12-20T14:06:30Z"
*/

/**
* @class core.datatype.Time
* @alternateClassName Time
* @embeddedClass
* @virtualNote 
* time in ms
*/

/**
* @class core.datatype.Color
* @extends String
* @alternateClassName Color
* @embeddedClass
* @virtualNote 
* Hexadecimal color value or the string "transparent".  
* A hexadecimal color is specified with: #RRGGBB, where the RR (red), GG (green) and BB (blue) hexadecimal integers specify the components of the color. All values must be between 00 and FF.  
* For example, the value #ff8800 is rendered as B&R orange.  
*/

/**
* @class core.datatype.ColorCollection
* @extends String
* @alternateClassName ColorCollection
* @embeddedClass
* @virtualNote 
* A collection of colors (core.datatype.Color), separated by space.  
* e.g.  
* 
*       #00CC00 #0000CC #CC0000 #000000
* 
* This datatype supports 1 to 4 colors, following the CSS specification of cumulated color values (e.g. for border colors).  
*/

/**
* @class core.datatype.ColorList
* @extends String
* @alternateClassName ColorList
* @embeddedClass
* @virtualNote 
* list of colors (core.datatype.Color)  
* e.g.  
* 
*       #00CC00,#0000CC,#000000
*  
*/

/**
* @class core.datatype.PixelVal
* @extends String
* @alternateClassName PixelVal
* @embeddedClass
* @virtualNote 
* Single Pixel Value  
* allowed values:  
* pixel: 2px  
* percentage: 50%  
* zero: 0  
*/

/**
* @class core.datatype.StrictPixelVal
* @extends String
* @alternateClassName StrictPixelVal
* @embeddedClass
* @virtualNote 
* Single Pixel Value  
* e.g. 2px  
*/

/**
* @class core.datatype.StrictSignedPixelVal
* @extends String
* @alternateClassName StrictSignedPixelVal
* @embeddedClass
* @virtualNote 
* Single Pixel Value  
* e.g. -2px  
*/

/**
* @class core.datatype.ANY
* @alternateClassName ANY
* @embeddedClass
* @virtualNote 
* Generic data type.  
* Value can be of any type.
*/

/*
* @class core.datatype.ANY_NUM
* @alternateClassName ANY_NUM
* @embeddedClass
* @virtualNote 
* Generic data type  
* Includes all basic number types.
*/

/*
* @class core.datatype.ANY_INT
* @alternateClassName ANY_INT
* @embeddedClass
* @virtualNote 
* Generic data type.  
* Includes all basic integer types.
*/

/**
* @class core.jQuery
* @alternateClassName jQuery
* @extends core.javascript.Object
* @embeddedClass
* @virtualNote
*/

// COLLECTIONS

/**
* @class core.collections.ItemCollection
* @extends Array
* @alternateClassName ItemCollection
* @embeddedClass
* @virtualNote 
* Array of objects 
*/

/**
* @class core.collections.GraphicCollection
* @extends Array
* @alternateClassName GraphicCollection
* @embeddedClass
* @virtualNote 
* Array of strings, each a name of an image file. 
*/

/**
* @class core.collections.RoleCollection
* @extends Array
* @alternateClassName RoleCollection
* @embeddedClass
* @virtualNote 
* Array of role names, e.g. ['Everyone', 'Administrators']  
*/

/**
* @class core.collections.ContentCollection
* @extends Array
* @alternateClassName ContentCollection
* @embeddedClass
* @virtualNote 
* Array of content ids 
*/

/**
* @class core.collections.StepItemStyleReferenceCollection
* @extends Array
* @alternateClassName StepItemStyleReferenceCollection
* @embeddedClass
* @virtualNote 
* Array of objects which have a StepItemGroup and the referenced style to this group  
* e.g.  
* 
*       [{'group':'Basic','style':'StepItem_Blue'},{'group':'Control','style':'StepItem_Pink'}]
*  
*/

// LISTS

/**
* @class brease.datatype.WidgetList
* @alternateClassName WidgetList
* @extends Array
* @embeddedClass
* @virtualNote 
* Array of widget names  
* Names have to be fully qualified: e.g. 'widgets.brease.Button'  
* [] empty array means 'no Widget'  
* [*] is a shortcut for 'all Widgets'
*/

/**
* @class brease.datatype.StringList
* @alternateClassName StringList
* @embeddedClass
* @virtualNote 
* comma separated list of Strings
*/

/**
* @class brease.datatype.IntegerList
* @alternateClassName IntegerList
* @embeddedClass
* @virtualNote 
* comma separated list of Integers
*/

/**
* @class brease.datatype.ImagePath
* @alternateClassName ImagePath
* @embeddedClass
* @virtualNote 
* path to an image
*/

/**
* @class brease.datatype.FilePath
* @alternateClassName FilePath
* @embeddedClass
* @virtualNote 
* path to a file
*/

/**
* @class brease.datatype.ImageType
* @alternateClassName ImageType
* @embeddedClass
* @virtualNote 
* type of an image, e.g.  
* .png
*/

/**
* @class brease.datatype.ImageSize
* @alternateClassName ImageSize
* @embeddedClass
* @virtualNote 
* size of an image in px or %, e.g.  
* 40px
* 40%
*/

/**
* @class brease.datatype.StepItemSource
* @alternateClassName StepItemSource
* @embeddedClass
* @virtualNote 
*/

/**
* @class brease.datatype.MappTableConfigurationType
* @alternateClassName MappTableConfigurationType
* @embeddedClass
* @virtualNote 
*/

/**
* @class brease.datatype.TableConfigurationType
* @alternateClassName TableConfigurationType
* @embeddedClass
* @virtualNote 
*/

/**
* @class brease.datatype.RegEx
* @alternateClassName RegEx
* @embeddedClass
* @virtualNote 
*/

/**
* @class brease.datatype.DirectoryPath
* @alternateClassName DirectoryPath
* @embeddedClass
* @virtualNote 
*/

/**
* @class brease.datatype.PageReference
* @alternateClassName PageReference
* @embeddedClass
* @virtualNote 
*/

/**
* @class brease.datatype.NavigationReference
* @alternateClassName NavigationReference
* @embeddedClass
* @virtualNote 
*/

/**
* @class brease.datatype.StyleReference
* @alternateClassName StyleReference
* @embeddedClass
* @virtualNote 
*/

/**
* @class brease.datatype.AreaReference
* @alternateClassName AreaReference
* @embeddedClass
* @virtualNote 
*/

/**
* @class brease.datatype.ContentReference
* @alternateClassName ContentReference
* @embeddedClass
* @virtualNote 
*/

/**
* @class brease.datatype.LayoutReference
* @alternateClassName LayoutReference
* @embeddedClass
* @virtualNote 
*/

/**
* @class brease.datatype.WidgetReference
* @alternateClassName WidgetReference
* @embeddedClass
* @virtualNote 
*/

/**
* @class brease.datatype.MpComIdentType
* @alternateClassName MpComIdentType
* @embeddedClass
* @virtualNote 
*/

/**
* @class brease.datatype.MpComIdentReference
* @alternateClassName MpComIdentReference
* @embeddedClass
* @virtualNote 
*/

/**
* @class brease.datatype.PropertyCollectionReference
* @alternateClassName PropertyCollectionReference
* @embeddedClass
* @virtualNote 
*/

/**
* @class brease.datatype.PdfPath
* @alternateClassName PdfPath
* @embeddedClass
* @virtualNote 
*/

/**
* @class brease.datatype.VideoPath
* @alternateClassName VideoPath
* @embeddedClass
* @virtualNote 
*/

/**
* @class brease.datatype.TextKey
* @alternateClassName TextKey
* @embeddedClass
* @virtualNote 
* ID of a text including the namespace prefixed with '$'  
* e.g. $IAT/myTextID  
*  
* see {@link brease.datatype.TextID} for comparison  
*/

/**
* @class brease.datatype.TextID
* @alternateClassName TextID
* @embeddedClass
* @virtualNote 
* ID of a text including the namespace  
* e.g. IAT/myTextID  
*  
* see {@link brease.datatype.TextKey} for comparison  
*/

/**
* @class brease.datatype.LanguageCode
* @alternateClassName LanguageCode
* @embeddedClass
* @virtualNote 
* code of a language  
* e.g. 'de' or 'en'   
*/

/**
* @class brease.datatype.CultureCode
* @alternateClassName CultureCode
* @embeddedClass
* @virtualNote 
* code of a culture  
* e.g. 'de' or 'en'   
*/

/**
* @class brease.datatype.NumberArray1D
* @alternateClassName NumberArray1D
* @embeddedClass
* @virtualNote 
* one-dimensional array with elements of Number type
*/
/**
* @class brease.datatype.BooleanArray1D
* @alternateClassName BooleanArray1D
* @embeddedClass
* @virtualNote 
* one-dimensional array with elements of Boolean type
*/
/**
* @class brease.datatype.StringArray1D
* @alternateClassName StringArray1D
* @embeddedClass
* @virtualNote 
* one-dimensional array with elements of String type
*/
/**
* @class brease.datatype.DateTimeArray1D
* @alternateClassName DateTimeArray1D
* @embeddedClass
* @virtualNote 
* one-dimensional array with elements of DateTime type
*/

/**
* @class core.datatype.Percentage
* @extends Number
* @alternateClassName Percentage
* @embeddedClass
* @datatypeNote 
* Floating point value in the range 0..100
*/

/**
* @class core.datatype.PixelValCollection
* @extends String
* @alternateClassName PixelValCollection
* @embeddedClass
* @datatypeNote   
* Pixel value collection   
* usage (Syntax like CSS):  
* - one single value applies to all four sides e.g. 2px  
* - two values apply first to top and bottom, the second one to left and right e.g. 1px 2px  
* - four values apply to top, right, bottom and left in that order (clockwise) e.g. 1px 2px 3px 4px  
*/

/**
* @class core.datatype.Margin
* @extends String
* @alternateClassName Margin
* @embeddedClass
* @datatypeNote  
* Margin of an element  
* usage (Syntax like CSS):  
* - one single value applies to all four sides e.g. 2px  
* - two values apply first to top and bottom, the second one to left and right e.g. 1px 2px  
* - four values apply to top, right, bottom and left in that order (clockwise) e.g. 1px 2px 3px 4px  
*/

/**
* @class core.datatype.Padding
* @extends String
* @alternateClassName Padding
* @embeddedClass
* @datatypeNote 
* Padding of an element  
* usage (Syntax like CSS):  
* - one single value applies to all four sides e.g. 2px  
* - two values apply first to top and bottom, the second one to left and right e.g. 1px 2px  
* - four values apply to top, right, bottom and left in that order (clockwise) e.g. 1px 2px 3px 4px  
*/

/**
* @class core.datatype.Opacity
* @extends Number
* @alternateClassName Opacity
* @embeddedClass
* @datatypeNote 
* Opacity of an element  
* 0 = Fully transparent  
* 1 = Fully opaque  
*/

/**
* @class core.datatype.IntervalType
* @extends Integer
* @alternateClassName IntervalType
* @embeddedClass
* @datatypeNote 
* Integers starting at 100 in steps of 100 
*/

/**
* @class core.datatype.Rotation
* @extends String
* @alternateClassName Rotation
* @embeddedClass
* @datatypeNote 
* rotation in CSS notation.  
* rotates the element clockwise around its origin (center).  
* Unit is degrees, declared by appending the string "deg" at the end of the value.  
* e.g. rotation="30deg"
*/

/**
* @class core.datatype.FontName
* @extends String
* @alternateClassName FontName
* @embeddedClass
* @datatypeNote 
*/

/**
* @class core.datatype.Gradient
* @extends String
* @alternateClassName Gradient
* @embeddedClass
* @datatypeNote 
* gradient in CSS notation
*/

/**
* @class core.datatype.Shadow
* @extends String
* @alternateClassName Shadow
* @embeddedClass
* @datatypeNote 
* shadow in CSS notation:  
* h-shadow v-shadow [blur] [spread] color  
* e.g.:  
* 10px 10px 5px #888888  
*/

/**
* @enum {String} core.datatype.BorderStyle
* @alternateClassName BorderStyle
* @embeddedClass
* @datatypeNote 
* Style of the border  
*/
/** 
* @property {String} none
*/
/** 
* @property {String} hidden
*/
/** 
* @property {String} dotted
*/
/** 
* @property {String} dashed
*/
/** 
* @property {String} solid
*/
/** 
* @property {String} double
*/
/** 
* @property {String} groove
*/
/** 
* @property {String} ridge
*/
/** 
* @property {String} inset
*/
/** 
* @property {String} outset
*/

/**
* @enum {String} core.datatype.LineCap
* @alternateClassName LineCap
* @embeddedClass
* @datatypeNote 
* Style of the end of a line  
*/
/** 
* @property {String} butt
*/
/** 
* @property {String} round
*/
/** 
* @property {String} square
*/

/** 
* @enum {String} core.datatype.WritingMode
* @alternateClassName WritingMode
* @embeddedClass
* @datatypeNote 
* Writing direction of a text  
*/
/** 
* @property {String} horizonal
*/
/** 
* @property {String} vertical
*/
