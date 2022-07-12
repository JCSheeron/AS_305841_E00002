define(['brease/events/EventHandler',
    'brease/events/ClientSystemEvent',
    'brease/events/BreaseEvent',
    'brease/events/SystemGestures',
    'brease/core/Utils',
    'brease/controller/objects/ContentStatus',
    'brease/model/VisuModel',
    'brease/controller/libs/AreaManager'],
function (EventHandler, ClientSystemEvent, BreaseEvent, SystemGestures, Utils, ContentStatus, _visuModel, AreaManager) {

    'use strict';

    /**
        * @class brease.controller.EventController
        * @extends core.javascript.Object
        * Controller to handle ClientSystem Events
        * @singleton
        */
    var EventController = {

            init: function (runtimeService, bindingController, visuModel) {
                if (visuModel) {
                    _visuModel = visuModel;
                }
                _events = {};
                EventHandler.init(runtimeService, bindingController);
                _addListeners(true);
                _addListeners();

                return this;
            },

            getAreaForPoint: function (point) {

                var cpId = brease.pageController.getCurrentPage(brease.appElem.id),
                    cp = brease.pageController.getPageById(cpId),
                    areaObjects = [];

                for (var areaId in cp.assignments) {
                    var areaObj = AreaManager.getArea(brease.appElem.id, cp.layout, areaId),
                        rect = areaObj.div.getBoundingClientRect();

                    if (rect.left <= point.left && point.left <= rect.left + rect.width && rect.top <= point.top && point.top <= rect.top + rect.height) {
                        areaObjects.push(areaObj);
                    }
                }
                if (areaObjects.length > 1) {
                    areaObjects.sort(function (a, b) { return b.info.zIndex - a.info.zIndex; });
                }
                if (areaObjects.length > 0) {
                    return areaObjects[0].info.id;
                } else {
                    return undefined;
                }
            }
        },
        _keyDownQueue = [],
        _keyPressQueue = [],
        _dialogIdQueue = [],
        _swipe = {};

    function _addListeners(remove) {
        _initKeyEvents(remove);
        _initSystemGestures(remove);
        _initContentEvents(remove);
        _initDialogEvents(remove);
        _initTooltipEvents(remove);
        _initPasswordEvents(remove);
    }

    function _initKeyEvents(remove) {
        var options = { capture: true };
        if (remove) {
            document.removeEventListener('keypress', _keyPressHandler, options);
            document.removeEventListener('keyup', _keyUpHandler, options);
            document.removeEventListener('keydown', _keyDownHandler, options);
        } else {
            document.addEventListener('keypress', _keyPressHandler, options);
            document.addEventListener('keyup', _keyUpHandler, options);
            document.addEventListener('keydown', _keyDownHandler, options);
        }

    }

    function _initSystemGestures(remove) {
        var SystemGesture1 = SystemGestures.GESTURES['SystemGesture1'],
            SystemGesture3 = SystemGestures.GESTURES['SystemGesture3'];

        if (remove) {
            if (SystemGesture1.touchPoints !== SystemGesture3.touchPoints) {
                SystemGestures.off(SystemGesture1.Type, _systemGesture1Handler);
                SystemGestures.off(SystemGesture3.Type, _systemGesture3Handler);
            } else {
                SystemGestures.off(SystemGesture1.Type, _systemGestureHandler);
            }
            brease.bodyEl.off(BreaseEvent.MOUSE_DOWN, _startHandler);
        } else {
            if (SystemGesture1.touchPoints !== SystemGesture3.touchPoints) {
                SystemGestures.on(SystemGesture1.Type, _systemGesture1Handler);
                SystemGestures.on(SystemGesture3.Type, _systemGesture3Handler);
            } else {
                SystemGestures.on(SystemGesture1.Type, _systemGestureHandler);
            }
            brease.bodyEl.on(BreaseEvent.MOUSE_DOWN, _startHandler);
        }

    }

    function _initContentEvents(remove) {
        if (remove) {
            document.body.removeEventListener(BreaseEvent.FRAGMENT_SHOW, _contentLoadedHandler);
            document.body.removeEventListener(BreaseEvent.CONTENT_ACTIVATED, _contentActivatedHandler);
            document.body.removeEventListener(BreaseEvent.CONTENT_ACTIVATE_ERROR, _contentActivateErrorHandler);
            // A&P 575490: listen to BreaseEvent.DISABLED_CLICK events in order to create ClientSystemEvent 
            document.body.removeEventListener(BreaseEvent.DISABLED_CLICK, _disabledClickHandler);
        } else {
            document.body.addEventListener(BreaseEvent.FRAGMENT_SHOW, _contentLoadedHandler);
            document.body.addEventListener(BreaseEvent.CONTENT_ACTIVATED, _contentActivatedHandler);
            document.body.addEventListener(BreaseEvent.CONTENT_ACTIVATE_ERROR, _contentActivateErrorHandler);
            // A&P 575490: listen to BreaseEvent.DISABLED_CLICK events in order to create ClientSystemEvent 
            document.body.addEventListener(BreaseEvent.DISABLED_CLICK, _disabledClickHandler);
        }
    }

    function _initDialogEvents(remove) {
        if (remove) {
            document.body.removeEventListener(BreaseEvent.DIALOG_OPEN, _dialogOpenHandler);
            document.body.removeEventListener(BreaseEvent.DIALOG_CLOSED, _dialogClosedHandler);
            document.body.removeEventListener(BreaseEvent.FRAGMENT_SHOW, _dialogContentLoadedHandler);
            document.body.removeEventListener(BreaseEvent.CONTENT_ACTIVATED, _dialogContentLoadedHandler);

        } else {
            document.body.addEventListener(BreaseEvent.DIALOG_OPEN, _dialogOpenHandler);
            document.body.addEventListener(BreaseEvent.DIALOG_CLOSED, _dialogClosedHandler);
            document.body.addEventListener(BreaseEvent.FRAGMENT_SHOW, _dialogContentLoadedHandler);
            document.body.addEventListener(BreaseEvent.CONTENT_ACTIVATED, _dialogContentLoadedHandler);
        }
    }

    function _initTooltipEvents(remove) {
        if (remove) {
            document.body.removeEventListener(BreaseEvent.TOOLTIPMODE_ACTIVE, _tooltipModeActiveHandler);
            document.body.removeEventListener(BreaseEvent.TOOLTIPMODE_INACTIVE, _tooltipModeInactiveHandler);
        } else {
            document.body.addEventListener(BreaseEvent.TOOLTIPMODE_ACTIVE, _tooltipModeActiveHandler);
            document.body.addEventListener(BreaseEvent.TOOLTIPMODE_INACTIVE, _tooltipModeInactiveHandler);
        }
    }

    function _initPasswordEvents(remove) {
        if (remove) {
            document.body.removeEventListener(BreaseEvent.CHANGEPASSWORDDIALOG_CLOSED, _passwordChangeHandler);
        } else {
            document.body.addEventListener(BreaseEvent.CHANGEPASSWORDDIALOG_CLOSED, _passwordChangeHandler);
        }
    }

    function _tooltipModeActiveHandler() {
        _dispatchEvent(ClientSystemEvent.TOOLTIPMODE_ACTIVATED, {});
    }

    function _tooltipModeInactiveHandler() {
        _dispatchEvent(ClientSystemEvent.TOOLTIPMODE_DEACTIVATED, {});
    }

    function _passwordChangeHandler(e) {
        _dispatchEvent(ClientSystemEvent.CHANGEPASSWORDDIALOG_CLOSED, { userName: e.detail.userName, result: e.detail.result });
    }

    function _startHandler(e) {
        _swipe.startPoint = { left: e.clientX, top: e.clientY };
    }

    function _contentLoadedHandler(e) {
        //console.log('%c' + e.type + ':' + e.detail.contentId, 'color:darkorange');

        var contentId = e.detail.contentId,
            content = _visuModel.getContentById(contentId);

        //console.log('_contentLoadedHandler:', contentId, content !== undefined, ',state:' + ((content) ? content.state : ''));
        if (content !== undefined) {

            // if fragment_show is dispatched before ContentActivated, content.state is smaller than ContentStatus.active
            // --> ContentLoaded is not dispatched and we wait for ContentActivated
            if (content.state === ContentStatus.active) {
                _dispatchEvent(ClientSystemEvent.CONTENT_LOADED, {
                    contentId: contentId, visuId: content.visuId
                });
            } else {
                _eventQueue.add(contentId);
            }
        }
    }

    var _eventQueue = {
        queue: new Map(),
        add: function (contentId) {
            this.queue.set(contentId, contentId);
        },
        contains: function (contentId) {
            return this.queue.get(contentId) !== undefined;
        },
        remove: function (contentId) {
            this.queue.delete(contentId);
        }
    };

    function _contentActivatedHandler(e) {
        //console.log('%c' + e.type + ':' + e.detail.contentId, 'color:darkorange');
        var contentId = e.detail.contentId;
        // if ContentActivated is dispatched before fragment_show, contentId is not in the queue 
        // --> ContentLoaded is not dispatched and we wait for fragment_show
        if (_eventQueue.contains(contentId)) {
            _eventQueue.remove(contentId);
            var content = _visuModel.getContentById(contentId);
            if (content !== undefined) {
                _dispatchEvent(ClientSystemEvent.CONTENT_LOADED, {
                    contentId: contentId, visuId: content.visuId
                });
            }
        }
    }

    function _contentActivateErrorHandler(e) {
        var contentId = e.detail.contentId;
        if (_eventQueue.contains(contentId)) {
            _eventQueue.remove(contentId);
        }
        var content = _visuModel.getContentById(contentId);
        content.state = ContentStatus.aborted;
        document.body.dispatchEvent(new CustomEvent(BreaseEvent.CONTENT_LOAD_ABORTED, { detail: { contentId: contentId } }));
    }

    function _keyDownHandler(e) {

        if (e.key !== undefined && _keyDownQueue.indexOf(e.key) === -1) {

            var keyCode = _keyCode(e);
            if (keyCode !== undefined) {

                _keyDownQueue.push(e.key);
                _dispatchEvent(ClientSystemEvent.KEY_DOWN, { key: e.key, keyASCII: keyCode });
            }
        }
    }

    function _keyPressHandler(e) {

        if (e.key !== undefined && _keyPressQueue.indexOf(e.key) === -1) {

            var keyCode = _keyCode(e);
            if (keyCode !== undefined) {

                _keyPressQueue.push(e.key);
                _dispatchEvent(ClientSystemEvent.KEY_PRESS, { key: e.key, keyASCII: keyCode });
            }
        }
    }

    function _keyUpHandler(e) {

        if (e.key !== undefined) {

            _removeFromQueue(_keyDownQueue, e.key);
            _removeFromQueue(_keyPressQueue, e.key);

            var keyCode = _keyCode(e);
            if (keyCode !== undefined) {
                _dispatchEvent(ClientSystemEvent.KEY_UP, { key: e.key, keyASCII: keyCode });
            }
        }
    }

    function _disabledClickHandler(e) {
        var data = e.detail;
        if (data !== undefined && data.widgetId === data.origin) {
            var widgetId = _getWidgetId(data.contentId, data.widgetId);
            _dispatchEvent(ClientSystemEvent.DISABLED_CLICK, {
                contentId: data.contentId,
                widgetId: widgetId,
                hasPermission: data.hasPermission
            });
        }
    }

    function _dialogOpenHandler(e) {
        var dialog = brease.pageController.getDialogById(e.detail.dialogId),
            dialogInfo = { id: e.detail.dialogId, contents: [] };
        if (!dialog || !dialog.assignments) {
            return;
        }
        for (var a in dialog.assignments) {
            dialogInfo.contents.push({ id: dialog.assignments[a].contentId, count: 0 });
        }
        _dialogIdQueue.push(dialogInfo);
    }
    function _dialogClosedHandler(e) {
        var newQueue = _dialogIdQueue.filter(function (actDialog) {
            return actDialog.id !== e.detail.dialogId;
        });
        _dialogIdQueue = newQueue;
        //console.debug('ClientSystemEvent.DIALOG_CLOSED', e.detail.dialogId);
        _dispatchEvent(ClientSystemEvent.DIALOG_CLOSED, {
            dialogId: e.detail.dialogId,
            horizontalPos: e.detail.horizontalPos,
            verticalPos: e.detail.verticalPos
        });

    }
    function _dialogContentLoadedHandler(e) {
        if (_dialogIdQueue.length === 0) { return; }
        var contentId = e.detail.contentId;

        //console.log('_dialogContentLoadedHandler:', contentId, content, ',state:' + ((content) ? content.state : ''), ContentStatus.active);
        var newQueue = _dialogIdQueue.map(function (actDialog) {
            return {
                id: actDialog.id,
                contents: actDialog.contents.filter(function (actContent) {
                    if (actContent.id === contentId) { actContent.count += 1; }
                    return (actContent.id !== contentId || (actContent.id === contentId && actContent.count < 2));
                })
            };
        });
        _dialogIdQueue = newQueue.filter(function (actDialog) {
            if (actDialog.contents.length === 0) {
                //console.debug('ClientSystemEvent.DIALOG_OPENED', actDialog.id);
                _dispatchEvent(ClientSystemEvent.DIALOG_OPENED, {
                    dialogId: actDialog.id
                });
                return false;
            } else {
                return true;
            }
        });
    }

    var _events = {};
    function _dispatchEvent(type, args) {
        if (_events[type] !== undefined) {
            _events[type].setEventArgs(args);
        } else {
            _events[type] = new EventHandler('clientSystem.Event', null, type, args, brease.appElem);
        }
        _events[type].dispatch();
    }

    function _removeFromQueue(queue, key) {
        var index = queue.indexOf(key);
        if (index !== -1) {
            queue.splice(index, 1);
        }
    }

    function _keyCode(e) {

        if (e.key !== undefined && e.key.length === 1) {
            return e.key.charCodeAt(0);
        } else if (e.which !== undefined) {
            return e.which;
        } else {
            return e.keyCode;
        }
    }

    function _getWidgetId(contentId, widgetId) {
        var result;
        if (contentId) {
            result = widgetId.slice(((contentId.length > 0) ? 1 + contentId.length : 0), widgetId.length);
        } else {
            result = widgetId;
        }
        return result;
    }

    function _systemGestureHandler(e) {

        if (Utils.hasClass(e.target, 'breaseModalDimmer') === false) {
            _swipe.direction = e.detail.direction;

            _swipe.startArea = EventController.getAreaForPoint(_swipe.startPoint);
            _swipe.endArea = EventController.getAreaForPoint({ left: e.clientX, top: e.clientY });

            if (!brease.pageController.swipeNavigation(_swipe.direction)) {
                _dispatchEvent(ClientSystemEvent.SYSTEM_SWIPE, {
                    direction: _swipe.direction, areaId: (_swipe.startArea !== undefined && _swipe.startArea === _swipe.endArea) ? _swipe.startArea : ''
                });
            }
        }
    }

    function _systemGesture1Handler(e) {

        if (Utils.hasClass(e.target, 'breaseModalDimmer') === false) {
            _swipe.direction = e.detail.direction;

            _swipe.startArea = EventController.getAreaForPoint(_swipe.startPoint);
            _swipe.endArea = EventController.getAreaForPoint({ left: e.clientX, top: e.clientY });

            brease.pageController.swipeNavigation(_swipe.direction);
        }
    }

    function _systemGesture3Handler(e) {

        if (Utils.hasClass(e.target, 'breaseModalDimmer') === false) {
            _swipe.direction = e.detail.direction;

            _swipe.startArea = EventController.getAreaForPoint(_swipe.startPoint);
            _swipe.endArea = EventController.getAreaForPoint({ left: e.clientX, top: e.clientY });

            _dispatchEvent(ClientSystemEvent.SYSTEM_SWIPE, {
                direction: _swipe.direction, areaId: (_swipe.startArea !== undefined && _swipe.startArea === _swipe.endArea) ? _swipe.startArea : ''
            });
        }
    }

    return EventController;

});
