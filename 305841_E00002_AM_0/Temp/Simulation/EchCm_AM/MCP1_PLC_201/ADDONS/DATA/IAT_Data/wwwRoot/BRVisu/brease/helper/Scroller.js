define(['libs/iscroll-probe',
    'brease/core/Utils',
    'brease/events/BreaseEvent',
    'brease/helper/ScrollUtils'], 
function (IScroll, Utils, BreaseEvent, ScrollUtils) {

    'use strict';
    /**
    * @class brease.helper.Scroller
    * @extends core.javascript.Object
    * 
    * @singleton
    */
    var Scroller = {

            init: function (popupManager) {
                if (popupManager !== undefined && typeof popupManager.update === 'function') {
                    _popupManager = popupManager;
                }
                IScroll.prototype.breaseUpdateZoomFactor = function () {
                    this.zoomFactor = Utils.getScaleFactor(this.wrapper);
                };
                IScroll.prototype.subsequentlyDisableMouse = function () {
                    this.wrapper.removeEventListener('mousedown', this);
                    this.wrapper.removeEventListener('mousemove', this);
                    this.wrapper.removeEventListener('mousecancel', this);
                    this.wrapper.removeEventListener('mouseup', this);
                };
                IScroll.prototype.subsequentlyEnableMouse = function () {
                    this.wrapper.addEventListener('mousedown', this);
                    this.wrapper.addEventListener('mousemove', this);
                    this.wrapper.addEventListener('mousecancel', this);
                    this.wrapper.addEventListener('mouseup', this);
                };
                IScroll.prototype.subsequentlyDisableTouch = function () {
                    this.wrapper.removeEventListener('touchstart', this);
                    this.wrapper.removeEventListener('touchmove', this);
                    this.wrapper.removeEventListener('touchcancel', this);
                    this.wrapper.removeEventListener('touchend', this);
                };
                IScroll.prototype.subsequentlyEnableTouch = function () {
                    this.wrapper.addEventListener('touchstart', this);
                    this.wrapper.addEventListener('touchmove', this);
                    this.wrapper.addEventListener('touchcancel', this);
                    this.wrapper.addEventListener('touchend', this);
                };
            },

            /**
            * @method addScrollbars
            * Method to add scrollbars to an area.
            * @param {HTMLElement/Selector} selector
            * @param {Object} options
            * @param {Boolean} noObserver (optional)
            * if set true, no MutationObserver is used
            */
            addScrollbars: function (selector, options, noObserver) {
                var wrapper = typeof selector === 'string' ? document.querySelector(selector) : selector,
                    scroller;
                    
                if (wrapper !== null) {
                    scroller = new IScroll(wrapper, getSettings(options));
                    scroller.zoomFactor = Utils.getScaleFactor(wrapper);
                    scroller.on('beforeScrollStart', function () {
                        this.stopped = false;
                        startHandling(this);
                    });
                    scroller.on('scrollStart', function () {
                        this.options.preventDefault = true;
                        this.wrapper.dispatchEvent(new CustomEvent(BreaseEvent.SCROLL_START, { bubbles: true }));
                    });
                    scroller.on('scrollEnd', function () {
                        this.options.preventDefault = false;
                        if (!this.stopped) {
                            endHandling();
                            this.stopped = true;
                        }
                    });
                    scroller.on('scrollCancel', function () {
                        this.options.preventDefault = false;
                        if (!this.stopped) {
                            endHandling();
                            this.stopped = true;
                        }
                    });
                    scroller.on('destroy', function () {
                        document.body.removeEventListener(BreaseEvent.APP_RESIZE, this.boundUpdateZoomFactor);
                        this.wrapper.removeEventListener(BreaseEvent.FOCUS_IN, this.boundFocusIn);
                        this.wrapper.removeEventListener('scroll', handleNativeScroll);
                        this.wrapper.removeEventListener('wheel', this.boundStopPropagation);
                    });
                    scroller.boundUpdateZoomFactor = scroller.breaseUpdateZoomFactor.bind(scroller);
                    document.body.addEventListener(BreaseEvent.APP_RESIZE, scroller.boundUpdateZoomFactor);
                    scroller.boundFocusIn = onFocusIn.bind(scroller);
                    scroller.wrapper.addEventListener(BreaseEvent.FOCUS_IN, scroller.boundFocusIn);
                    // prevent native scrolling on the wrapper since scrolling programatically also works for containers
                    // with css overflow = hidden
                    scroller.wrapper.addEventListener('scroll', handleNativeScroll);
                    // stop wheel events to prevent scrolling in parent elements
                    scroller.boundStopPropagation = stopPropagation.bind(scroller);
                    scroller.wrapper.addEventListener('wheel', scroller.boundStopPropagation);
                    _popupManager.update();
                    if (noObserver !== true) {
                        addObserver(wrapper, scroller);
                    }
                } else {
                    scroller = {
                        on: function () { warn(selector); },
                        off: function () { },
                        refresh: function () { },
                        scrollToElement: function () { },
                        scrollTo: function () { },
                        scrollBy: function () { },
                        destroy: function () { },
                        enable: function () { },
                        disable: function () { },
                        wrapper: {}
                    };
                }
                return scroller;
            },

            /**
            * @method disableAllStartedScrollers
            * Method to disable all scroller, which are started by the last touchstart/mousedown event.
            */
            disableAllStartedScrollers: function () {
                for (var key in _safe.scroller) {
                    _safe.scroller[key].disable();
                }
            }

        },
        _safe = {
            scroller: {}
        },
        _popupManager = {
            update: function () { }
        },
        _defaults = {};
    Utils.defineProperty(_defaults, 'bounce', false);
    Utils.defineProperty(_defaults, 'fadeScrollbars', false);
    Utils.defineProperty(_defaults, 'momentum', true);
    Utils.defineProperty(_defaults, 'mouseWheel', false);
    Utils.defineProperty(_defaults, 'resizeScrollbars', true);
    Utils.defineProperty(_defaults, 'scrollbars', 'custom');

    //A&P 584175: allow browser zoom in scroll containers
    // browser zoom is the default behaviour of pinch-to-zoom gesture and can be prevented with event.preventDefault
    // setting this to false in combination with touch-action:'pinch-zoom', enables other default browser gestures too, e.g. overscroll history navigation
    Utils.defineProperty(_defaults, 'preventDefault', false);

    // A&P 512800: fix for iScroll/Chrome 55 issue
    Utils.defineProperty(_defaults, 'disableTouch', false);
    Utils.defineProperty(_defaults, 'disableMouse', false);
    Utils.defineProperty(_defaults, 'disablePointer', true);

    // A&P 517465: against fuzzy zoomed content in chrome
    Utils.defineProperty(_defaults, 'HWCompositing', false);

    Utils.defineProperty(Scroller, 'defaults', _defaults);

    function getSettings(options) {
        var settings = $.extend({}, Scroller.defaults, options);
        settings.disableTouch = false;
        settings.disableMouse = false;
        settings.disablePointer = true;
        settings.HWCompositing = false;
        return settings;
    }

    function isXScrollable(scroller) {
        return scroller.enabled && scroller.options.mouseWheel === true && Math.abs(scroller.maxScrollX) > 0;
    }

    function isYScrollable(scroller) {
        return scroller.enabled && scroller.options.mouseWheel === true && Math.abs(scroller.maxScrollY) > 0;
    }

    function isXWheel(evt) {
        return Math.abs(evt.deltaX) > 0;
    }

    function isYWheel(evt) {
        return Math.abs(evt.deltaY) > 0;
    }

    function stopPropagation(e) { 
        if ((isYWheel(e) && isYScrollable(this)) || 
            (isXWheel(e) && isXScrollable(this)) || 
            (!isYScrollable(this) && isXScrollable(this) && isYWheel(e))) { // if the scroller is scrollable horizontally only, then the vertical wheel is used by iscroll
            e.stopPropagation(); 
        }
    }

    function startHandling(scroller) {

        if (scroller.hasHorizontalScroll || scroller.hasVerticalScroll) {

            // find an id to save the scroller
            var id = $(scroller.wrapper).closest('[id]')[0].id;
            _safe.scroller[id] = scroller;

            // iterate over all other started scrollers and disable this one, 
            // if its wrapper is an ancestor of another started scrollers wrapper
            // (this is working, because the most inner scroller is activated first)
            for (var key in _safe.scroller) {
                if (_safe.scroller[key] !== scroller) {
                    if ($.contains(scroller.wrapper, _safe.scroller[key].wrapper)) {
                        scroller.disable();
                        break;
                    }
                }
            }
        }
    }

    function endHandling() {
        if (_safe.stopped !== true) {
            _safe.stopped = true;
            window.setTimeout(function () {
                for (var key in _safe.scroller) {
                    var scroller = _safe.scroller[key];
                    if (!scroller.enabled) {
                        scroller.initiated = 0;
                        scroller.enable();
                    }
                }
                _safe.scroller = {};
                _safe.stopped = false;
            }, 0);
        }
    }

    function addObserver(HTMLnode, scroller) {
        if (typeof MutationObserver === 'function') {
            var observer = new MutationObserver(handleMutations);

            observer.debouncedRefresh = _.debounce(refreshScroller.bind(null, scroller, observer), 300);
            observer.observe(HTMLnode, { childList: true, subtree: true });
        }
    }

    function refreshScroller(scroller, observer) {
        if (scroller.wrapper && scroller.wrapper.ownerDocument === document) {
            scroller.refresh();
        }
        observer.disconnect();
        observer.debouncedRefresh = null;
    }

    function handleMutations(mutations, observer) {
        var refresh = false;

        mutations.forEach(function (mutation) {
            if (mutation.addedNodes.length > 0) {
                refresh = true;
            }
        });
        if (refresh) {
            observer.debouncedRefresh();
        }
    }

    function warn(selector) {
        console.iatWarn('trying to add a scroller to a null object:' + selector);
    }

    function onFocusIn(e) {
        var widgetElem = e.target,
            elemOutsideScrollArea = ScrollUtils.checkElemOutsideScrollArea(widgetElem, this.wrapper),
            notActive = !widgetElem.matches(':active');

        // check if element receives focus 
        // => scroll element into view if it's not completely in view
        if (notActive) {
            // args: elem, time, offsetX, offsetY
            // offsetX = true => horizontal center element in the wrapper element
            // offsetY = true => vertical center element in the wrapper element
            var offsetX = elemOutsideScrollArea.horizontal && this.hasHorizontalScroll === true,
                offsetY = elemOutsideScrollArea.vertical && this.hasVerticalScroll === true;

            if (offsetX || offsetY) {
                this.scrollToElement(widgetElem, 0, offsetX, offsetY);
            }
        
            var elemOutsideViewport = ScrollUtils.checkElemOutsideViewport(widgetElem);
            if (elemOutsideViewport.x !== 0 || elemOutsideViewport.y !== 0) {
                window.scrollBy(elemOutsideViewport.x, elemOutsideViewport.y);
            }
        }
    }
    
    function handleNativeScroll(e) {
        e.preventDefault();
    }
    
    return Scroller;
});
