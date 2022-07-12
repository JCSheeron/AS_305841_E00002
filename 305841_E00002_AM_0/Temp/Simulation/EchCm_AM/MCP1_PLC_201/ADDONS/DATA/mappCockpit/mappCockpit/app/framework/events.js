define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The event class implements a typed event base.
     *
     * @class Event
     * @template SENDER  specifies the type of the event sender
     * @template DATA specifies the type of the event data
     */
    var TypedEvent = /** @class */ (function () {
        function TypedEvent() {
            this._eventHandlers = [];
        }
        /**
         * Attaches an event handler
         *
         * @param {EventHandler<SENDER,DATA>} eventHandler
         * @returns {EventHandler<SENDER,DATA>} the attached handler
         * @memberof Event
         */
        TypedEvent.prototype.attach = function (eventHandler) {
            if (!this.isAttached(eventHandler)) {
                this._eventHandlers.push(eventHandler);
            }
            return eventHandler;
        };
        /**
         * Detaches an event handler
         *
         * @param {EventHandler<SENDER, DATA>} eventHandler
         * @returns {EventHandler<SENDER, DATA>} the detached handler
         * @memberof Event
         */
        TypedEvent.prototype.detach = function (eventHandler) {
            var i = this._eventHandlers.indexOf(eventHandler);
            if (i > -1) {
                this._eventHandlers.splice(i, 1);
            }
            return eventHandler;
        };
        /**
         * Dispatches an event to all attached handlers
         *
         * @param {SENDER} eventSender
         * @param {DATA} eventData
         * @memberof Event
         */
        TypedEvent.prototype.raise = function (eventSender, eventData) {
            this._eventHandlers.forEach(function (eventHandler) { return eventHandler(eventSender, eventData); });
        };
        /**
         * Checks if the passed event handler is already attached
         *
         * @param {EventHandler<SENDER, DATA>} eventHandler
         * @returns {boolean} true if the handler is attached
         * @memberof Event
         */
        TypedEvent.prototype.isAttached = function (eventHandler) {
            return this._eventHandlers.indexOf(eventHandler) > -1;
        };
        return TypedEvent;
    }());
    exports.TypedEvent = TypedEvent;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwcC9mcmFtZXdvcmsvZXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQVlBOzs7Ozs7T0FNRztJQUNIO1FBQUE7WUFFWSxtQkFBYyxHQUFzQyxFQUFFLENBQUM7UUFvRG5FLENBQUM7UUFsREc7Ozs7OztXQU1HO1FBQ0gsMkJBQU0sR0FBTixVQUFPLFlBQXdDO1lBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFO2dCQUNoQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUMxQztZQUNELE9BQU8sWUFBWSxDQUFDO1FBQ3hCLENBQUM7UUFDRDs7Ozs7O1dBTUc7UUFDSCwyQkFBTSxHQUFOLFVBQU8sWUFBd0M7WUFDM0MsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDbEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQ1IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ3BDO1lBQ0QsT0FBTyxZQUFZLENBQUM7UUFDeEIsQ0FBQztRQUNEOzs7Ozs7V0FNRztRQUNILDBCQUFLLEdBQUwsVUFBTSxXQUFtQixFQUFFLFNBQWU7WUFDdEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsVUFBQyxZQUFZLElBQUssT0FBQSxZQUFZLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxFQUFwQyxDQUFvQyxDQUFDLENBQUM7UUFDeEYsQ0FBQztRQUdEOzs7Ozs7V0FNRztRQUNILCtCQUFVLEdBQVYsVUFBVyxZQUF3QztZQUMvQyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzFELENBQUM7UUFFTCxpQkFBQztJQUFELENBQUMsQUF0REQsSUFzREM7SUFFUSxnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBFdmVudEhhbmRsZXIgaW50ZXJmYWNlIGRlZmluZXMgdGhlIHNpZ25hdHVyZSBvZiBldmVudCBoYW5kbGVycyBcclxuICogXHJcbiAqIEBpbnRlcmZhY2UgRXZlbnRIYW5kbGVyXHJcbiAqIEB0ZW1wbGF0ZSBTRU5ERVIgIHNwZWNpZmllcyB0aGUgdHlwZSBvZiB0aGUgZXZlbnQgc2VuZGVyXHJcbiAqIEB0ZW1wbGF0ZSBEQVRBIHNwZWNpZmllcyB0aGUgdHlwZSBvZiB0aGUgZXZlbnQgZGF0YVxyXG4gKi9cclxuaW50ZXJmYWNlIEV2ZW50SGFuZGxlcjxTRU5ERVIsIERBVEE+IHtcclxuICAgIChldmVudFNlbmRlcjogU0VOREVSLCBldmVudERhdGE6IERBVEEpOiB2b2lkO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIFRoZSBldmVudCBjbGFzcyBpbXBsZW1lbnRzIGEgdHlwZWQgZXZlbnQgYmFzZS5cclxuICpcclxuICogQGNsYXNzIEV2ZW50XHJcbiAqIEB0ZW1wbGF0ZSBTRU5ERVIgIHNwZWNpZmllcyB0aGUgdHlwZSBvZiB0aGUgZXZlbnQgc2VuZGVyXHJcbiAqIEB0ZW1wbGF0ZSBEQVRBIHNwZWNpZmllcyB0aGUgdHlwZSBvZiB0aGUgZXZlbnQgZGF0YVxyXG4gKi9cclxuYWJzdHJhY3QgY2xhc3MgVHlwZWRFdmVudDxTRU5ERVIsIERBVEE+IHtcclxuXHJcbiAgICBwcml2YXRlIF9ldmVudEhhbmRsZXJzOiBBcnJheTxFdmVudEhhbmRsZXI8U0VOREVSLCBEQVRBPj4gPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaGVzIGFuIGV2ZW50IGhhbmRsZXIgXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtFdmVudEhhbmRsZXI8U0VOREVSLERBVEE+fSBldmVudEhhbmRsZXJcclxuICAgICAqIEByZXR1cm5zIHtFdmVudEhhbmRsZXI8U0VOREVSLERBVEE+fSB0aGUgYXR0YWNoZWQgaGFuZGxlclxyXG4gICAgICogQG1lbWJlcm9mIEV2ZW50XHJcbiAgICAgKi9cclxuICAgIGF0dGFjaChldmVudEhhbmRsZXI6IEV2ZW50SGFuZGxlcjxTRU5ERVIsIERBVEE+KTogRXZlbnRIYW5kbGVyPFNFTkRFUiwgREFUQT4ge1xyXG4gICAgICAgIGlmICghdGhpcy5pc0F0dGFjaGVkKGV2ZW50SGFuZGxlcikpIHtcclxuICAgICAgICAgICAgdGhpcy5fZXZlbnRIYW5kbGVycy5wdXNoKGV2ZW50SGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBldmVudEhhbmRsZXI7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIERldGFjaGVzIGFuIGV2ZW50IGhhbmRsZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50SGFuZGxlcjxTRU5ERVIsIERBVEE+fSBldmVudEhhbmRsZXJcclxuICAgICAqIEByZXR1cm5zIHtFdmVudEhhbmRsZXI8U0VOREVSLCBEQVRBPn0gdGhlIGRldGFjaGVkIGhhbmRsZXJcclxuICAgICAqIEBtZW1iZXJvZiBFdmVudFxyXG4gICAgICovXHJcbiAgICBkZXRhY2goZXZlbnRIYW5kbGVyOiBFdmVudEhhbmRsZXI8U0VOREVSLCBEQVRBPik6IEV2ZW50SGFuZGxlcjxTRU5ERVIsIERBVEE+IHtcclxuICAgICAgICB2YXIgaSA9IHRoaXMuX2V2ZW50SGFuZGxlcnMuaW5kZXhPZihldmVudEhhbmRsZXIpO1xyXG4gICAgICAgIGlmIChpID4gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5fZXZlbnRIYW5kbGVycy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBldmVudEhhbmRsZXI7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIERpc3BhdGNoZXMgYW4gZXZlbnQgdG8gYWxsIGF0dGFjaGVkIGhhbmRsZXJzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTRU5ERVJ9IGV2ZW50U2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge0RBVEF9IGV2ZW50RGF0YVxyXG4gICAgICogQG1lbWJlcm9mIEV2ZW50XHJcbiAgICAgKi9cclxuICAgIHJhaXNlKGV2ZW50U2VuZGVyOiBTRU5ERVIsIGV2ZW50RGF0YTogREFUQSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlcnMuZm9yRWFjaCgoZXZlbnRIYW5kbGVyKSA9PiBldmVudEhhbmRsZXIoZXZlbnRTZW5kZXIsIGV2ZW50RGF0YSkpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB0aGUgcGFzc2VkIGV2ZW50IGhhbmRsZXIgaXMgYWxyZWFkeSBhdHRhY2hlZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7RXZlbnRIYW5kbGVyPFNFTkRFUiwgREFUQT59IGV2ZW50SGFuZGxlclxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgaWYgdGhlIGhhbmRsZXIgaXMgYXR0YWNoZWRcclxuICAgICAqIEBtZW1iZXJvZiBFdmVudFxyXG4gICAgICovXHJcbiAgICBpc0F0dGFjaGVkKGV2ZW50SGFuZGxlcjogRXZlbnRIYW5kbGVyPFNFTkRFUiwgREFUQT4pOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnRIYW5kbGVycy5pbmRleE9mKGV2ZW50SGFuZGxlcikgPiAtMTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCB7IFR5cGVkRXZlbnQgfTtcclxuIl19