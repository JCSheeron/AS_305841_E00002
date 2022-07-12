define([
    'brease/core/Class'
], function (SuperClass) {
    
    /** 
     * @class widgets.brease.common.libs.NativeScroller
     * @extends brease.core.Class
     * @author Johan Malmberg
     * 
     * This class can be used to emulate the scrolling behaviour of the iScroll
     * library directly with native scrollbars. It uses the scrolling 
     * implementation that the iScroll does but applies it to native 
     * scrollbars.
     */

    'use strict';
    var rAF = window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                        function (callback) { window.setTimeout(callback, 1000 / 60); };

    var ModuleClass = SuperClass.extend(function NativeScroller(widget) {
            SuperClass.call(this);
            this.widget = widget;
        }, {}),

        p = ModuleClass.prototype;

    /**
     * @method init
     * Only method that needs to be called for the NativeScroller library.
     * Pass the HTML element to this function and the module will take care of
     * the rest.
     * @param {HTMLElement} elem the element at which the scroller should be listened to
     */
    p.init = function (elem) {
        this.internal = {
            starttime: undefined,
            enabled: true,
            elem: elem,
            momentum: true,
            stopped: false,
            distance: 0,
            timer: [],
            bounceTime: 600,
            useTransition: false,
            directionLockThreshold: 5,
            eventType: {
                touchstart: 1,
                touchmove: 1,
                touchend: 1,
        
                mousedown: 2,
                mousemove: 2,
                mouseup: 2,
        
                pointerdown: 3,
                pointermove: 3,
                pointerup: 3,
        
                MSPointerDown: 3,
                MSPointerMove: 3,
                MSPointerUp: 3
            },
            ease: {
                circular: {
                    style: 'cubic-bezier(0.1, 0.57, 0.1, 1)', // Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
                    fn: function (k) {
                        return Math.sqrt(1 - (--k * k));
                    }
                }
            }
        };
        elem.addEventListener('mousedown', this._bind('_start'));
        this.x = 0;
        this.y = 0;
        this.directionX = 0;
        this.directionY = 0;

        //Figure out which scrollbars are present
        this.hasHorizontalScroll = true; //this.options.scrollX && this.maxScrollX < 0;
        this.hasVerticalScroll = true; //this.options.scrollY && this.maxScrollY < 0;

    };

    /**
     * @method dispose
     * This method will remove the event listener from the element
     */
    p.dispose = function () {
        this.internal.elem.removeEventListener('mousedown', this._bind('_start'));
    };

    /**
     * @method _start
     * @private
     * This function is to prevent the scroller to start when the user is
     * merely clicking on the element that is scrollable.
     * @param {Event} e scroller event
     */
    p._start = function (e) {
        // React to left mouse button only
        if (this.internal.eventType[e.type] !== 1) {
            // for button property
            // http://unixpapa.com/js/mouse.html
            var button;
            if (!e.which) {
            /* IE case */
                button = (e.button < 2) ? 0 : ((e.button === 4) ? 1 : 2);
            } else {
            /* All others */
                button = e.button;
            }
            if (button !== 0) {
                return;
            }
        }
  
        if (!this.internal.enabled || (this.initiated && this.internal.eventType[e.type] !== this.initiated)) {
            return;
        }
  
        var point = e.touches ? e.touches[0] : e,
            pos;
  
        this.initiated = this.internal.eventType[e.type];
        this.moved = false;
        this.distX = 0;
        this.distY = 0;
        this.directionX = 0;
        this.directionY = 0;
        this.directionLocked = 0;
  
        this.startTime = this._getTime();
  
        if (this.internal.useTransition && this.isInTransition) {
            this._transitionTime();
            this.isInTransition = false;
            pos = this.getComputedPosition();
            this._translate(Math.round(pos.x), Math.round(pos.y));
            this._execEvent('scrollEnd');
        } else if (!this.internal.useTransition && this.isAnimating) {
            this.isAnimating = false;
            this._execEvent('scrollEnd');
        }
  
        this.startX = this.x;
        this.startY = this.y;
        this.absStartX = this.x;
        this.absStartY = this.y;
        this.pointX = point.pageX;
        this.pointY = point.pageY;
  
        this._execEvent('beforeScrollStart');
        document.addEventListener('mousemove', this._bind('_move'));
        document.addEventListener('mouseup', this._bind('_stop'));
    };

    /**
     * @method _move
     * @private
     * Method taken from iScroll library. This method will fire when the mouse 
     * move event is triggered. It will move the scrollers according to how the
     * mouse moves.
     * @param {Event} e scroller event
     */
    p._move = function (e) {
        if (!this.internal.enabled || this.internal.eventType[e.type] !== this.initiated) {
            return;
        }

        if (this.internal.preventDefault) { // increases performance on Android? TODO: check!
            e.preventDefault();
        }

        var point = e.touches ? e.touches[0] : e,
            deltaX = point.pageX - this.pointX,
            deltaY = point.pageY - this.pointY,
            timestamp = this._getTime(),
            newX, newY,
            absDistX, absDistY;

        this.pointX = point.pageX;
        this.pointY = point.pageY;

        this.distX += deltaX;
        this.distY += deltaY;
        absDistX = Math.abs(this.distX);
        absDistY = Math.abs(this.distY);

        // We need to move at least 10 pixels for the scrolling to initiate
        if (timestamp - this.endTime > 300 && (absDistX < 10 && absDistY < 10)) {
            return;
        }

        // If you are scrolling in one direction lock the other
        if (!this.directionLocked && !this.internal.freeScroll) {
            if (absDistX > absDistY + this.internal.directionLockThreshold) {
                this.directionLocked = 'h'; // lock horizontally
            } else if (absDistY >= absDistX + this.internal.directionLockThreshold) {
                this.directionLocked = 'v'; // lock vertically
            } else {
                this.directionLocked = 'n'; // no lock
            }
        }

        if (this.directionLocked === 'h') {
            if (this.internal.eventPassthrough === 'vertical') {
                e.preventDefault();
            } else if (this.internal.eventPassthrough === 'horizontal') {
                this.initiated = false;
                return;
            }

            deltaY = 0;
        } else if (this.directionLocked === 'v') {
            if (this.internal.eventPassthrough === 'horizontal') {
                e.preventDefault();
            } else if (this.internal.eventPassthrough === 'vertical') {
                this.initiated = false;
                return;
            }

            deltaX = 0;
        }

        deltaX = this.hasHorizontalScroll ? deltaX : 0;
        deltaY = this.hasVerticalScroll ? deltaY : 0;

        newX = this.x + deltaX;
        newY = this.y + deltaY;

        // Slow down if outside of the boundaries
        if (newX > 0 || newX < this.maxScrollX) {
            newX = this.internal.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX;
        }
        if (newY > 0 || newY < this.maxScrollY) {
            newY = this.internal.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
        }

        this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
        this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

        if (!this.moved) {
            this._execEvent('scrollStart');
        }

        this.moved = true;

        this._translate(deltaX, deltaY);

        /* REPLACE START: _stop */

        if (timestamp - this.startTime > 300) {
            this.startTime = timestamp;
            this.startX = this.x;
            this.startY = this.y;
        }
    };

    /**
     * @method _stop
     * @private
     * Method taken from iScroll library
     * This function will be triggered when a user is clicking and will prevent
     * the _startMovement function from executing if the click is triggered
     * before the drag has started
     * @param {Event} e scroller event
     */
    p._stop = function (e) {
        document.removeEventListener('mousemove', this._bind('_move'));
        document.removeEventListener('mouseup', this._bind('_stop'));
        // this.internal.click = true;
        if (!this.internal.enabled || this.internal.eventType[e.type] !== this.initiated) {
            return;
        }

        if (this.internal.preventDefault && !this._preventDefaultException(e.target, this.internal.preventDefaultException)) {
            e.preventDefault();
        }

        var momentumX,
            momentumY,
            duration = this._getTime() - this.startTime,
            newX = Math.round(this.x),
            newY = Math.round(this.y),
            time = 0,
            easing = '';

        this.isInTransition = 0;
        this.initiated = 0;
        this.endTime = this._getTime();

        // reset if we are outside of the boundaries
        if (this._resetPosition(this.internal.bounceTime)) {
            return;
        }

        this._scrollTo(newX, newY); // ensures that the last position is rounded

        // we scrolled less than 10 pixels
        if (!this.moved) {

            this._execEvent('scrollCancel');
            return;
        }

        // start momentum animation if needed
        if (this.internal.momentum && duration < 300) {
            momentumX = this.hasHorizontalScroll ? this._momentum(this.x, this.startX, duration, this.maxScrollX, this.internal.bounce ? this.wrapperWidth : 0, this.internal.deceleration) : { destination: newX, duration: 0 };
            momentumY = this.hasVerticalScroll ? this._momentum(this.y, this.startY, duration, this.maxScrollY, this.internal.bounce ? this.wrapperHeight : 0, this.internal.deceleration) : { destination: newY, duration: 0 };
            newX = momentumX.destination;
            newY = momentumY.destination;
            time = Math.max(momentumX.duration, momentumY.duration);
            this.isInTransition = 1;
        }

        // INSERT POINT: _end

        if (newX !== this.x || newY !== this.y) {
            // change easing function when scroller goes out of the boundaries
            if (newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY) {
                easing = this.internal.ease.quadratic;
            }

            this._scrollTo(newX, newY, time, easing);
            return;
        }

        this._execEvent('scrollEnd');
    };

    /**
     * @method _momentum
     * @private
     * Method taken from iScroll library
     * @param {Number} current
     * @param {Number} start
     * @param {Number} time
     * @param {Number} lowerMargin
     * @param {Number} wrapperSize
     * @param {Number} deceleration
     * @returns {Object} the destination and duration of how long the scroller should scroll
     */
    p._momentum = function (current, start, time, lowerMargin, wrapperSize, deceleration) {
        var distance = current - start,
            speed = Math.abs(distance) / time,
            destination,
            duration;

        deceleration = deceleration === undefined ? 0.0006 : deceleration;

        destination = current + (speed * speed) / (2 * deceleration) * (distance < 0 ? -1 : 1);
        duration = speed / deceleration;

        if (destination < lowerMargin) {
            destination = wrapperSize ? lowerMargin - (wrapperSize / 2.5 * (speed / 8)) : lowerMargin;
            distance = Math.abs(destination - current);
            duration = distance / speed;
        } else if (destination > 0) {
            destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;
            distance = Math.abs(current) + destination;
            duration = distance / speed;
        }

        return {
            destination: Math.round(destination),
            duration: duration
        };
    };

    /**
     * @method _scrollTo
     * @private
     * Method taken from iScroll library. Method will decide whether the mouse
     * is being dragged and the scrollers should be translated (put into 
     * position) or whether the scrollers should be animated into the position
     * i.e. that the mouse has been release. 
     */
    p._scrollTo = function (x, y, time, easing) {
        easing = easing || this.internal.ease.circular;

        this.isInTransition = this.internal.useTransition && time > 0;
        var transitionType = this.internal.useTransition && easing.style;
        if (!time || transitionType) {
            if (transitionType) {
                this._transitionTimingFunction(easing.style);
                this._transitionTime(time);
            }
            this._translate(x, y);
        } else {
            this._animate(x, y, time, easing.fn);
        }
    };

    /**
     * @method _getTime
     * @private
     * Method taken from iScroll library
     * @returns {Date|Object} returns a date object or a get time function
     */
    p._getTime = function () {
        return Date.now() || function getTime() { return new Date().getTime(); };
    };

    /**
     * @method _animate
     * @private
     * Method taken from iScroll library
     */
    p._animate = function (destX, destY, duration, easingFn) {
        var that = this,
            startX = this.x,
            startY = this.y,
            startTime = this._getTime(),
            destTime = startTime + duration;

        function step() {
            var now = that._getTime(),
                newX, newY,
                easing;

            if (now >= destTime) {
                that.isAnimating = false;
                that._translate(destX, destY);

                if (!that._resetPosition(that.internal.bounceTime)) {
                    that._execEvent('scrollEnd');
                }

                return;
            }

            now = (now - startTime) / duration;
            easing = easingFn(now);
            newX = (destX - startX) * easing + startX;
            newY = (destY - startY) * easing + startY;
            that._translate(newX, newY);

            if (that.isAnimating) {
                rAF(step);
            }
        }

        this.isAnimating = true;
        step();
    };

    /**
     * @method _preventDefaultException
     * @private
     * Method taken from iScroll library
     */
    p._preventDefaultException = function (el, exceptions) {
        for (var i in exceptions) {
            if (exceptions[i].test(el[i])) {
                return true;
            }
        }

        return false;
    };

    /**
     * @method _execEvent
     * @private
     * Method taken from iScroll library
     * @param {String} eType the event type we are executing
     */
    p._execEvent = function (eType) {
        // console.log('NativeScroller says that we are', eType);
    };

    /**
     * @method _translate
     * @private
     * Method from iScroll library, used to actually move the scrollers
     * @param {Integer} x the x position of the scroller (right/left)
     * @param {Integer} y the y position of the scroller (top/bottom)
     */
    p._translate = function (x, y) {
        x = Math.round(x);
        y = Math.round(y);
        this.internal.elem.scrollLeft -= x;// + 'px';
        this.internal.elem.scrollTop -= y;// + 'px';

        this.x = x;
        this.y = y;
    };
    
    /**
     * @method _resetPosition
     * @private
     * Method taken from iScroll library
     * @param {UInteger} time the time reset position should take to bounce into position
     */
    p._resetPosition = function (time) {
        var x = this.x,
            y = this.y;

        time = time || 0;

        if (!this.hasHorizontalScroll || this.x > 0) {
            x = 0;
        } else if (this.x < this.maxScrollX) {
            x = this.maxScrollX;
        }

        if (!this.hasVerticalScroll || this.y > 0) {
            y = 0;
        } else if (this.y < this.maxScrollY) {
            y = this.maxScrollY;
        }

        if (x === this.x && y === this.y) {
            return false;
        }

        this._scrollTo(x, y, time, this.internal.ease.circular);

        return true;
    };

    return ModuleClass;

});
