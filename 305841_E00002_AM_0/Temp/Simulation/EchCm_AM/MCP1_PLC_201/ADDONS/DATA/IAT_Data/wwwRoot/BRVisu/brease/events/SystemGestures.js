define(['brease/core/Utils', 'brease/config', 'hammer'], function (Utils, config, Hammer) {

    'use strict';

    var defaultTouchPoints = 2,
        defaultSnapTolerance = 50,
        maxTouchPoints = 5,
        minTouchPoints = 1,
        GESTURES = {
            SystemGesture1: {
                Type: 'SystemGesture1',
                touchPoints: 2
            },
            SystemGesture2: {
                Type: 'SystemGesture2',
                touchPoints: 2,
                snapTolerance: 50
            },
            SystemGesture3: {
                Type: 'SystemGesture3',
                touchPoints: 2
            }
        },
        SystemGestures = {

            GESTURES: GESTURES,
            maxTouchPoints: maxTouchPoints,
            minTouchPoints: minTouchPoints,
            activeGestures: [],
            lockTimeout: 300,

            init: function (GestureManager) {
                // init touchPoints from config
                for (var i = 1; i <= 3; i += 1) {
                    if (brease.config.gestures && brease.config.gestures['SystemGesture' + i]) {
                        GESTURES['SystemGesture' + i].touchPoints = Math.min(maxTouchPoints, Math.max(minTouchPoints, brease.config.gestures['SystemGesture' + i].touchPoints));
                    } else {
                        GESTURES['SystemGesture' + i].touchPoints = defaultTouchPoints;
                    }
                }
                // init snapTolerance for ContentCarousel from config
                var snapTolerance = defaultSnapTolerance;
                if (brease.config.gestures && brease.config.gestures['SystemGesture2']) {
                    snapTolerance = parseInt(brease.config.gestures['SystemGesture2'].snapTolerance, 10); 
                    snapTolerance = (isNaN(snapTolerance) || snapTolerance < 0 || snapTolerance > 100) ? defaultSnapTolerance : snapTolerance;
                }
                
                GESTURES['SystemGesture2'].snapTolerance = snapTolerance;

                var options = {};
                // setting 'pinch-zoom' enables zoom gesture on iOS
                if (config.visu.browserZoom === true && config.detection.ios === true) {
                    options.touchAction = 'pinch-zoom';
                }
                var ManagerClass = (GestureManager) || Hammer.Manager;
                this.gestureManager = new ManagerClass(document.body, options);
                return this.gestureManager;
            },

            on: function (type, fn) {
                if (GESTURES[type] === undefined) {
                    console.warn('unknown gesture type:' + type);
                    return;
                }
                if (_gestures[type] === undefined) {
                    _initGesture.call(SystemGestures, type);
                }
                if (!_listeners[type]) {
                    _listeners[type] = [];
                }
                if (_listeners[type].indexOf(fn) === -1) {
                    _listeners[type].push(fn);
                }
            },

            off: function (type, fn) {
                if (_listeners[type]) {
                    var index = _listeners[type].indexOf(fn);
                    if (index !== -1) {
                        _listeners[type].splice(index, 1);
                    }
                }
            },

            hasEventListener: function (type) {
                return Array.isArray(_listeners[type]) && _listeners[type].length > 0;
            }
        },
        _gestures = {},
        _listeners = {},
        lock = false,
        lockTimer,
        positionProps = ['clientX', 'clientY', 'pageX', 'pageY', 'screenX', 'screenY'];

    function _initGesture(type) {

        _gestures[type] = {
            manager: this.gestureManager,
            recognizer: new Hammer.Swipe({ event: type, direction: Hammer.DIRECTION_ALL, pointers: GESTURES[type].touchPoints, threshold: brease.settings.swipe.moveThreshold, velocity: brease.settings.swipe.velocity })
        };

        _gestures[type].manager.add([_gestures[type].recognizer]);

        _gestures[type].manager.on(type, _gestureHandler);

    }

    function _gestureHandler(e) {
        //console.log(e);
        var dir = _parseDirection(e.direction),
            touchPoints = _getTouchPoints(e.pointers),
            fingerDistance = _calculateFingerDistance(touchPoints, e.direction);

        if (dir !== '' && lock === false && (fingerDistance === 0 || fingerDistance <= brease.settings.swipe.maxFingerDistance)) {
            lock = true;
            var newEvent = { type: e.type, target: e.target, detail: { direction: dir } };
            if (Array.isArray(e.changedPointers)) {
                Utils.transferProperties(e.changedPointers[0], newEvent, positionProps);
            }
            _dispatch(newEvent);
            _startUnlock();
        }
    }

    function _calculateFingerDistance(touchPoints, direction) {
        var distance = 0;
        if (touchPoints.length > 1) {
            var point0 = touchPoints[0],
                point1 = touchPoints[1],
                diffX = Math.abs(point0.x - point1.x),
                diffY = Math.abs(point0.y - point1.y);
            if (direction === 2 || direction === 4) {
                distance = parseInt(diffY, 10);
            } else {
                distance = parseInt(diffX, 10);
            }
        }
        return distance;
    }
    
    function _getTouchPoints(pointers) {
        var points = [];
        
        if (Array.isArray(pointers)) {
            for (var i = 0; i < pointers.length; i += 1) {
                points.push({ x: pointers[i].pageX, y: pointers[i].pageY });
            }
        }
        return points;
    }

    function _parseDirection(direction) {
        var dir = '';
        switch (direction) {
            case 2:
                dir = 'fromRight';
                break;
            case 4:
                dir = 'fromLeft';
                break;
            case 8:
                dir = 'fromBottom';
                break;
            case 16:
                dir = 'fromTop';
                break;
        }
        return dir;
    }

    function _startUnlock() {
        if (lockTimer) { clearTimeout(lockTimer); }
        if (SystemGestures.lockTimeout > 0) {
            lockTimer = window.setTimeout(_unlock, SystemGestures.lockTimeout);
        } else {
            _unlock();
        }
    }

    function _unlock() {
        lock = false;
    }

    function _dispatch(e) {
        for (var i = 0; i < _listeners[e.type].length; i += 1) {
            _listeners[e.type][i].call(null, e);
        }
    }

    return SystemGestures;
});
