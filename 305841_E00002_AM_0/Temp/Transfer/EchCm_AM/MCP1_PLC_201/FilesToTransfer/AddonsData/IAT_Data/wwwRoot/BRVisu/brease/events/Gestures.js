define(['brease/core/Utils', 
    'hammer'], 
function (Utils, Hammer) {

    'use strict';

    var _gestures = new Map(),
        _arrRecos = [{ name: 'pan', superClass: Hammer.Pan },
            { name: 'pinch', superClass: Hammer.Pinch },
            { name: 'press', superClass: Hammer.Press },
            { name: 'rotate', superClass: Hammer.Rotate },
            { name: 'swipe', superClass: Hammer.Swipe },
            { name: 'tap', superClass: Hammer.Tap }],
        Gestures = {
            settings: { mngOptions: {} },
            /**
            * @method add
            * add gesture recognizers to a certain element  
            * returns the added gestures in an array  
            * @param {HTMLElement} elem
            * @param {Array} arrRecoClass
            * @param {Array} arrOptions
            * @return {Object[]} 
            */
            add: function (elem, arrRecoClass, arrOptions) {
                if (!Array.isArray(arrRecoClass) || !Array.isArray(arrOptions)) {
                    return;
                }
                var hammerMng,
                    gestures = [];
                if (_gestures.has(elem)) {
                    hammerMng = _gestures.get(elem);
                    arrRecoClass.forEach(function (actRecoClass, idx) {
                        gestures.push(_addRecoToMng(_getRecoByClass(actRecoClass, arrOptions[idx]), hammerMng));
                    });
                } else {
                    hammerMng = new Hammer.Manager(elem, Gestures.settings.mngOptions);
                    arrRecoClass.forEach(function (actRecoClass, idx) {
                        gestures.push(_addRecoToMng(_getRecoByClass(actRecoClass, arrOptions[idx]), hammerMng));
                    });
                    _gestures.set(elem, hammerMng);
                }
                return gestures;
            },
            /**
            * @method remove
            * remove previously added recognizers from an html element
            * @param {HTMLElement} elem
            * @param {Array} arrRecoClass
            */
            remove: function (elem) {
                var mng = _gestures.get(elem);
                if (mng) {
                    mng.destroy();
                }
                _gestures.delete(elem);
            },
            /**
            * @method on
            * add an eventlistener to a certain gesture
            * @param {HTMLElement} elem
            * @param {String} type
            * @param {Function} fn
            */
            on: function (elem, type, fn) {
                var mng = _gestures.get(elem);
                mng.on(type, fn);
            },
            /**
            * @method off
            * remove an eventlistener from a certain gesture
            * @param {HTMLElement} elem
            * @param {String} type
            * @param {Function} fn
            */
            off: function (elem, type, fn) {
                var mng = _gestures.get(elem);
                if (mng) {
                    mng.off(type, fn);
                }
            },
            /**
            * @method getGestures
            * returns all gestures added to the system
            * @return {Object}
            */
            getGestures: function () {
                return _gestures;
            },
            /**
            * @method getOptionsForElement
            * returns options for an element
            * @return {Object}
            */
            getOptionsForElement: function (elem) {
                var gesture = _gestures.get(elem);
                if (elem) {
                    return Utils.deepCopy(gesture.recognizers[0].options); 
                } else { 
                    return undefined; 
                }
            },
            /**
            * @method getSrcEvent
            * returns the source event from a gesture event in order to 
            * get attributes like screenX
            * @return {Object}
            */
            getSrcEvent: function (e) {
                return e.srcEvent;
            },
            /**
            * @method getScaleFactor
            * @param {HTMLElement} elem
            * returns the scale factor of a specific element
            * in order to calculate positions when the browser is zoomed
            * @return {Number} scaleFactor
            */
            getScaleFactor: function (elem) {
                return Utils.getScaleFactor(elem);
            },
            /**
            * @method getAnimationFrame
            * @param {Number} id
            * @param {Function} fn
            * Executes the applied function before the browser starts
            * painting in order to perform smooth animations
            * @return {Number} requestId
            */
            getAnimationFrame: function (id, fn) {
                if (typeof fn !== 'function') { return 0; }

                if (_hasRequestAnimationFrame()) {
                    this.cancelAnimationFrame(id);
                    return window.requestAnimationFrame(fn);
                } else {
                    this.cancelAnimationFrame(id);
                    return window.setTimeout(fn, 0);
                }
            },
            /**
            * @method cancelAnimationFrame
            * Cancel the execution of previously requested animation frame
            * @return {Number} requestId
            */
            cancelAnimationFrame: function (id) {
                if (id === 0 || typeof id !== 'number') { return 0; }

                if (_hasRequestAnimationFrame()) {
                    window.cancelAnimationFrame(id);
                } else {
                    window.clearTimeout(id);
                }
                return 0;
            }
        },
        _addRecoToMng = function (reco, mng) {
            if (!reco || !mng) {
                return;
            }
            return mng.add(reco);
        },
        _getRecoByClass = function (className, options) {
            var recoClass = _arrRecos.find(function (actClass) { return actClass.name === className; }),
                instance;

            if (recoClass === undefined) {
                console.debug('Gesture class: ', className, ' not defined. Available classes:', _arrRecos.map(function (actClass) { return actClass.name; }));
            } else {
                instance = new recoClass.superClass(options);
            }

            return instance;
        };
    function _hasRequestAnimationFrame() {
        return typeof window.requestAnimationFrame === 'function';
    }

    return Gestures;
});
