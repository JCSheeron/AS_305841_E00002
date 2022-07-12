define(function () {
    
    'use strict';
    
    return undefined;
});

/**
* @class brease.config.MeasurementSystemUnit
* @extends Object
* @embeddedClass
* @virtualNote
* brease.config.UnitCode for every measurement system.  
*
* Example:
*
*       {'metric': 'GRM','imperial': 'ONZ','imperial-us': 'ONZ'}
*
* Unit codes are CEFACT Common Codes.  
*/

/**
* @property {brease.config.UnitCode} metric
*/
/**
* @property {brease.config.UnitCode} imperial
*/
/**
* @property {brease.config.UnitCode} imperial-us
*/

/**
* @class brease.config.UnitCode
* @extends String
* @embeddedClass
* @virtualNote
* CEFACT Common Code of a unit  
* e.g.
*
*       CMT         (for cm)
*       KGM         (for kg)
*       WTT         (for W)
*
* <template>See <a href="../../../../unitsystem/units.htm">available units</a> and <a href="../../firstproject/page_shownode.html">unit guideline</a>.</template>
*/

/**
* @class brease.config.MeasurementSystemFormat
* @extends Object
* @embeddedClass
* @virtualNote
* brease.config.NumberFormat for every measurement system.  
*
* Example:
*
*       {'metric':{ 'decimalPlaces': 2, 'minimumIntegerDigits':2 }, 
*       'imperial':{ 'decimalPlaces': 3, 'minimumIntegerDigits':1 }, 
*       'imperial-us':{ 'decimalPlaces': 1, 'minimumIntegerDigits':1 }}
*
*/

/**
* @class brease.config.DateFormat
* @extends String
* @embeddedClass
* @virtualNote
* Either a format string (e.g. "HH:mm") or a pattern ("F").  
*
* <section>For available formats and patterns see at **[Internationalization Guide](#!/guide/internationalization)**</section>
* <template>Read more about <a href="../../FAQ/FormatDate.html">Date Formats</a> in FAQ.</template>
*/
