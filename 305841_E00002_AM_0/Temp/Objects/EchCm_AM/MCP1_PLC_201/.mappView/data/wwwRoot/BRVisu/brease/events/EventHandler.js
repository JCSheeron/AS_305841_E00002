define(['brease/events/ClientSystemEvent'],
    function (ClientSystemEvent) {
        'use strict';
        var _runtimeService, _bindingController,

            /**
            * @class brease.events.EventHandler
            * @extends Object
            * Handles events on the client  
            * Example:
            *
            *       define(['brease/events/EventHandler'], EventHandler) {
            *
            *           var ev = new EventHandler('widgets.brease.Button.Event', 'button01' , 'Click', eventArgs, elem);
            *
            *           ev.dispatch();
            *
            *       });
            */
            /**
            * @method constructor
            * Creates a new EventHandler instance.  
            * @param {String} eventType
            * @param {String} refId
            * @param {String} eventName
            * @param {Object} eventArgs
            * @param {HTMLElement} elem
            */

            /**
            * @property {String} eventType  
            * type of event; supported types: 'widgets.' and 'clientSystem.';  
            * e.g. widgets.brease.Button.Event  
            * e.g. clientSystem.Event  
            */
            /**
            * @property {String} refId  
            * reference to the originator of the event  
            * id of the widget in case of a widget event  
            * null in case of a clientSystem event  
            */
            /**
            * @property {String} eventName  
            * name of the event e.g. 'Click' or 'DialogOpened'
            */
            /**
            * @property {Object} eventArgs  
            * arguments which are provided with event detail  
            * e.g. { dialogId: "dialog1" }  
            * e.g. { origin: "Button1" }  
            */
            /**
            * @property {HTMLElement} elem   
            * HTMLElement where the event should be dispatched in DOM.  
            * In case of a widget event this is the widget element.  
            * In case of a clientSystem event, this is brease.appElem.  
            */
            EventHandler = function (eventType, refId, eventName, eventArgs, elem) {

                this.data = {
                    event: eventName,
                    source: {
                        type: eventType,
                        refId: refId
                    },
                    eventArgs: eventArgs || {}
                };
                this.elem = (eventType !== EventHandler.DummyType) ? elem : undefined;
            },
            p = EventHandler.prototype;

        EventHandler.init = function (runtimeService, bindingController) {
            _runtimeService = runtimeService;
            _bindingController = bindingController;
        };
        EventHandler.DummyType = 'dummy.Event';

        p.dispose = function () {
            this.elem = undefined;
            this.data = undefined;
        };

        /**
    * @method setEventArgs
    * set event arguments
    * @param {Object} eventArgs
    */
        p.setEventArgs = function (eventArgs) {
            this.data.eventArgs = eventArgs || {};
        };

        p.getEventArgs = function () {
            return this.data.eventArgs;
        };

        /**
     * @method dispatch
     * Dispatches event
     * @param {Boolean} useDom if true or undefined (exactly !==false), event will be dispatched on elem in DOM
     */
        p.dispatch = function (useDom) {
            if (this.isSubscribed()) {
            // do not dispatch ContentLoaded event in preloading state to the server
                if (!(this.data.event === ClientSystemEvent.CONTENT_LOADED && brease.config.preLoadingState === true)) {
                    if (typeof _runtimeService.sendEvent === 'function') {
                        _runtimeService.sendEvent(this.data);
                    }
                }
            }
            if (useDom !== false && this.elem !== undefined) {
                this.elem.dispatchEvent(new CustomEvent(this.data.event, { detail: this.data.eventArgs, bubbles: true }));
            }
        };

        p.isSubscribed = function () {
            if (this.data.source.type === EventHandler.DummyType) {
                return false;
            } else {
                return _bindingController.eventIsSubscribed(this.data.source.type, this.data.event, this.data.source.refId); 
            }
        };

        return EventHandler;

    });
