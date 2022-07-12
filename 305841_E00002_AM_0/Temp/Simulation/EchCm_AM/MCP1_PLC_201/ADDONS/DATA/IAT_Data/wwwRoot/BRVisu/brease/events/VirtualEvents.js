define(['brease/core/Utils', 'brease/config', 'brease/events/DummyEvent', 'jquery'], 
    function (Utils, Config, DummyEvent) {

        'use strict';

        function patchTouchEvents() {
            document.addEventListener('mouseup', function (ev) {
                if (VirtualEvents.endEvent !== true) {
                    var touchEvent = new DummyEvent('touchend', ev.target);
                    touchEvent.pointerId = 0;
                    Utils.transferProperties(ev, touchEvent, _positionProps);
                    handleNativeEvent(touchEvent); 
                }
            }, true);
        }

        /**
        * @property {Boolean} endEvent
        * This property is set:  
        * to false, if a vmousedown event is triggered  
        * to true, if a vmouseup is triggered  
        * Thus a missing touchend event can be detected in a mouseup listener.  
        */
        var VirtualEvents = {
                init: function () {

                    // listener for native events
                    for (var e in _events) {
                        document.addEventListener(e, handleNativeEvent, true);
                    }
                    // A&P 708880: T30/mappView/MomentaryPushButton and normal Button get stuck
                    if (Utils.isT30(navigator.userAgent)) { patchTouchEvents(); }

                    // jquery triggered events (especially for testing purposes)
                    $document.on('click mousedown mouseup', function (e) {
                        if (e.isTrigger !== undefined) {
                            triggerVirtualEvent(e.target, 'v' + e.type, e, { pointerId: 0 });
                        }
                    });
                    //$document.on('click mousedown mouseup touchend touchstart pointerup pointerdown', function (e) {
                    //    console.log(e.type)
                    //});

                    // add virtual events to jquery "on/off" mechanism
                    for (var i = 0; i < _virtualEventNames.length; i += 1) {
                        $.event.special[_virtualEventNames[i]] = getEventObject(_virtualEventNames[i]);
                    }

                    _blocker.init();

                    window.oncontextmenu = function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    };
                    delete VirtualEvents.init;
                    return this;
                },
                reset: function () {
                    _blocker.reset();
                    _blockMove = true;
                },
                getPointerId: function (nativeEvent) {
                    return getPointerId(nativeEvent);
                },
                /**
                * @method triggerVirtualEvent
                * Trigger a virtual event of given type on a target. The new event is a jQuery event and is triggered via the jQuery trigger method
                * @param {HTMLElement} target HTMLElement on which the event should be triggered
                * @param {String} eventType
                * @param {Event} nativeEvent a native UIEvent
                * @param {Object} [detail] optional detail for the new event
                */
                triggerVirtualEvent: function (target, eventType, nativeEvent, detail) {
                    triggerVirtualEvent(target, eventType, nativeEvent, detail);
                },
                isVirtualEvent: function (e) {
                    return e.virtual === true;
                },
                config: function () {
                    if (Config.visu.moveThreshold <= _maxMoveThreshold && Config.visu.moveThreshold >= _minMoveThreshold) {
                        _moveThreshold = _pixelRatio * Config.visu.moveThreshold;
                    }
                    Utils.defineProperty(VirtualEvents, 'MOVE_THRESHOLD', _moveThreshold, true, false, true);
                }
            },
            _events = {
                mousedown: {
                    vtype: 'vmousedown',
                    device: 'mouse',
                    phase: 'start'
                },
                touchstart: {
                    vtype: 'vmousedown',
                    device: 'touch',
                    phase: 'start'
                },
                mouseup: {
                    vtype: 'vmouseup',
                    device: 'mouse',
                    phase: 'end'
                },
                touchend: {
                    vtype: 'vmouseup',
                    device: 'touch',
                    phase: 'end'
                },
                mousemove: {
                    vtype: 'vmousemove',
                    device: 'mouse',
                    phase: 'move'
                },
                touchmove: {
                    vtype: 'vmousemove',
                    device: 'touch',
                    phase: 'move'
                }
            },
            _blocker = {
                blocked: '',
                block: function (device) {
                    this.blocked = device;
                },
                isBlocked: function (device) {
                    return this.blocked === device;
                },
                startReset: function () {
                    this.stopReset();
                    this.timer = window.setTimeout(this.boundReset, 1000);
                },
                stopReset: function () {
                    window.clearTimeout(this.timer);
                },
                reset: function () {
                    this.stopReset();
                    this.blocked = '';
                },
                init: function () {
                    this.boundReset = this.reset.bind(this);
                }
            },
            _positionProps = ['clientX', 'clientY', 'pageX', 'pageY', 'screenX', 'screenY'],
            _virtualEventNames = ['vmousedown', 'vmousemove', 'vmouseup', 'vclick'],
            _pixelRatio = (window.devicePixelRatio > 1) ? window.devicePixelRatio : 1,
            _maxMoveThreshold = 50,
            _minMoveThreshold = 20,
            _moveThreshold = _pixelRatio * Config.visu.moveThreshold,
            _scrollThreshold = 2,
            _start = {},
            _end = {},
            _allowed = {},
            _blockMove = true,
            $document = $(document);

        Utils.defineProperty(VirtualEvents, 'SCROLL_THRESHOLD', _scrollThreshold);
        Utils.defineProperty(VirtualEvents, 'MOVE_THRESHOLD', _moveThreshold, true, false, true);

        function handleNativeEvent(nativeEvent) {

            var type = nativeEvent.type,
                target = nativeEvent.target,
                event = _events[type],
                pointerId = getPointerId(nativeEvent),
                touchLength = getTouchLength(nativeEvent);

            VirtualEvents.touchLength = touchLength;
            //if (nativeEvent.type.indexOf('move') === -1) {
            //    console.log('handleNativeEvent:', { type: type, pointerId:pointerId, touchLength:touchLength }, nativeEvent);
            //}
            var trigger = eventPreprocessing(event, target, pointerId, touchLength);

            if (trigger === true && _allowed[pointerId] === true) {

                if (event.vtype === 'vmouseup') {
                    _end.el = getElementPosition(target); //get position before triggering vmouseup, because it can change position of target
                    _end.ev = Utils.getOffsetOfEvent(nativeEvent);
                    VirtualEvents.endEvent = true;
                } else if (event.vtype === 'vmousedown') {
                    VirtualEvents.endEvent = false;
                }
                triggerVirtualEvent(target, event.vtype, nativeEvent, { pointerId: pointerId });
                eventPostProcessing(event, nativeEvent, target, pointerId);
            }
        }

        function eventPreprocessing(event, target, pointerId, touchLength) {
            var trigger = false;
            switch (event.phase) {

                case 'start':
                    if (event.device === 'touch') {
                        _blocker.stopReset();
                        _blocker.block('mouse');
                        trigger = true;
                    } else {
                        trigger = !_blocker.isBlocked('mouse');
                    }
                    if (touchLength > 1) {
                        _allowed[pointerId] = hasParentMultiTouch(target);
                    } else {
                        _allowed[pointerId] = true;
                    }
                    _blockMove = false;
                    break;
                case 'move':
                    if (event.device === 'touch') {
                        trigger = !_blockMove;
                    } else {
                        trigger = !_blocker.isBlocked('mouse') && !_blockMove;
                    }
                    break;
                case 'end':
                    if (event.device === 'touch') {
                        trigger = true; 
                    } else {
                        trigger = !_blocker.isBlocked('mouse');
                    }
                    if (touchLength === 0) {
                        _blockMove = true;
                    }
                    if (touchLength === 0 && event.device === 'touch') {
                        _blocker.startReset();
                    }
                    break;
            }
            return trigger;
        }

        function eventPostProcessing(event, nativeEvent, target, pointerId) {
            if (event.vtype === 'vmouseup') {
                endPhase(nativeEvent, target, pointerId);
            }
            if (event.phase === 'end') {
                resetStorage(pointerId);
            }

            if (event.phase === 'start') {
                startPhase(nativeEvent, target, pointerId);
            }
        }

        function startPhase(nativeEvent, target, pointerId) {
        // set start coordinates after dispatching vmousedown 
        // because new css can move the element (e.g. because of borders)
        // and this can cause a blocking of vclick event
            _start[pointerId] = {
                el: getElementPosition(target),
                ev: Utils.getOffsetOfEvent(nativeEvent),
                target: target
            };
        }

        function endPhase(nativeEvent, target, pointerId) {
        // AuP 641844: NumPad / Keyboard: InputProcessing.onKeyDown= true executes below placed widget action on mouse up when pressing the Enter key
        // => BreaseEvent.CLICK events are only triggered if mousedown and mouseup is triggered on the same widget (checked with Utils.isSameWidgetElem)
            if (_start[pointerId] !== undefined && Utils.isSameWidgetElem(_start[pointerId].target, target)) {
                var elDiffX = Math.abs(_end.el.x - _start[pointerId].el.x),
                    elDiffY = Math.abs(_end.el.y - _start[pointerId].el.y),
                    evDiffX = Math.abs(_end.ev.x - _start[pointerId].ev.x),
                    evDiffY = Math.abs(_end.ev.y - _start[pointerId].ev.y);
                // AuP 549430 BreaseEvent.CLICK shall not be triggered when the user starts to scroll 
                if (elDiffX <= _scrollThreshold && elDiffY <= _scrollThreshold && evDiffX < _moveThreshold && evDiffY < _moveThreshold) {
                    triggerVClick(nativeEvent, pointerId);
                    // AuP 544920: BreaseEvent.CLICK is not triggered in ToggleSwitch
                } else if (evDiffX < 3 && evDiffY < 3) {
                    triggerVClick(nativeEvent, pointerId);
                    // AuP 549445: BreaseEvent.CLICK on Mouse and SingleTouch within the same widget
                } else if (_events[nativeEvent.type].device === 'mouse') {
                // mouse down and up event happen in the same widget
                    var endPosOfInitialTarget = getElementPosition(_start[pointerId].target);
                    if (Math.abs(endPosOfInitialTarget.x - _start[pointerId].el.x) < _scrollThreshold && Math.abs(endPosOfInitialTarget.y - _start[pointerId].el.y) < _scrollThreshold) {
                    // target of mousedown event did not move
                        triggerVClick(nativeEvent, pointerId);
                    }
                }
            }
        }

        function triggerVClick(nativeEvent, pointerId) {
            triggerVirtualEvent(nativeEvent.target, 'vclick', nativeEvent, { pointerId: pointerId });
        }

        function resetStorage(pointerId) {
            _start[pointerId] = undefined;
        }

        function dummyMouseHandler() { }

        function getEventObject(eventType) {
            var realType = eventType.substr(1);

            return {
                setup: function () {
                    $(this).on(realType, dummyMouseHandler);
                },

                teardown: function () {
                    $(this).off(realType, dummyMouseHandler);
                }
            };
        }

        function getPointerId(e) {
            if (e.pointerId !== undefined) {
                return e.pointerId;
            } else {
                return (e.changedTouches) ? e.changedTouches[0].identifier : 0;
            }
        }

        function createVirtualEvent(nativeEvent, type, detail, target) {
            var e;
            detail = detail || {};
            // if the event is already a virtual one or it is a triggered jQuery event -> create a new event
            // otherwise use method $.event.fix
            if (VirtualEvents.isVirtualEvent(nativeEvent) || nativeEvent.isTrigger !== undefined) {
                e = $.Event(type, { detail: detail, originalEvent: nativeEvent.originalEvent });
                Utils.transferProperties(nativeEvent, e, _positionProps);
            } else {
                e = $.event.fix(nativeEvent);
                e = fixPosition(e, nativeEvent, detail.pointerId);
                e.type = type;
                e.detail = detail;
                e.target = target || e.target;
            }
            e.virtual = true;
            if (e.which === undefined) {
                e.which = 1;
            }
            if (type === 'vclick') {
                e.originalEvent = new DummyEvent('click', nativeEvent.target);
                Utils.transferProperties(nativeEvent, e.originalEvent, _positionProps); 
                if (nativeEvent !== e) {
                    e.originalEvent.originalEvent = nativeEvent; 
                }
            }

            return e;
        }

        function fixPosition(e, nativeEvent, pointerId) {

            if (nativeEvent.type.indexOf('touch') !== -1) {

                var touch = findTouch(nativeEvent, pointerId);

                if (touch) {
                    Utils.transferProperties(touch, e, _positionProps);
                }
            }
            return e;
        }

        function findTouch(nativeEvent, touchId) {

            var touch, i,
                touches = nativeEvent.touches,
                changedTouches = nativeEvent.changedTouches;

            if (changedTouches && changedTouches.length > 0) {
                for (i = 0; i < changedTouches.length; i += 1) {
                    if (changedTouches[i].identifier === touchId) {
                        touch = changedTouches[i];
                        break;
                    }
                }
            } else if (touches && touches.length > 0) {
                for (i = 0; i < touches.length; i += 1) {
                    if (touches[i].identifier === touchId) {
                        touch = touches[i];
                        break;
                    }
                }
            }

            return touch;
        }

        function hasParentMultiTouch(elem) {
            if (elem.getAttribute('data-multitouch') !== null) {
                return true;
            } else {
                var parents = $(elem).parents('[data-multitouch]');
                if (parents.length > 0) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        function getElementPosition(el) {
            if (el && typeof el.getBoundingClientRect === 'function') {
                var pos = el.getBoundingClientRect();

                return {
                    x: (pos.left !== undefined) ? pos.left : 0,
                    y: (pos.top !== undefined) ? pos.top : 0
                };
            } else {
                return {
                    x: 0,
                    y: 0
                };
            }
        }

        function triggerVirtualEvent(target, eventType, nativeEvent, detail) {
        //if (eventType.indexOf('move') === -1) {
        //    console.log('%ctriggerVirtualEvent:' + eventType, 'color:#00cc00');
        //}
            var vE = createVirtualEvent(nativeEvent, eventType, detail, target);
            $(target).trigger(vE);
        }

        function getTouchLength(e) {
            var length = 0;
            if (e && e.touches) {
                length = e.touches.length;
            }
            return length;
        }

        return VirtualEvents.init();
    });
