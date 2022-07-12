define(function () {

    'use strict';

    /**
    * @class brease.interface.NumPad
    * @extends Object
    */

    /**
    * @method show
    * opens NumPad relative to opener (usually NumericInput)  
    * @param {brease.objects.NumpadOptions} options
    * @param {HTMLElement} refElement Either HTML element of opener widget or any HTML element for relative positioning.
    */

    /**
    * @method hide
    * Method to hide the Window.  
    */

    /**
    * @method addEventListener
    * adds eventlistener to the widget html element
    * @param {String} type event type
    * @param {Function} listener
    */

    /**
    * @method removeEventListener
    * removes eventlistener from the widget html element
    * @param {String} type event type
    * @param {Function} listener
    */
   
    /**
    * @event value_submit
    * Fired after user clicks 'enter' to submit value    
    * @param {Object} detail  
    * @param {Number} detail.value  
    * @param {String} type {@link brease.events.BreaseEvent#static-property-SUBMIT BreaseEvent.SUBMIT}
    * @param {HTMLElement} target element of widget
    */
   
    /**
    * @event window_closed
    * Fired after window gets hidden    
    * @param {Object} detail  
    * @param {String} detail.id  widget id
    * @param {String} type {@link brease.events.BreaseEvent#static-property-CLOSED BreaseEvent.CLOSED}
    * @param {HTMLElement} target element of widget
    */
   
    return {};

});
