define(['brease/controller/objects/Client',
    'brease/controller/libs/ContentHelper',
    'brease/decorators/TooltipDependency',
    'brease/controller/libs/ScrollManager',
    'brease/core/Utils',
    'brease/core/Types',
    'brease/enum/Enum',
    'brease/events/SocketEvent',
    'brease/controller/libs/DialogQueue',
    'brease/events/BreaseEvent',
    'brease/controller/FocusManager'],
function (Client, contentHelper, tooltipDependency, ScrollManager, Utils, Types, Enum, SocketEvent, DialogQueue, BreaseEvent, focusManager) {

    'use strict';

    /**
                * @class brease.controller.ActionController
                * @extends core.javascript.Object
                * Main controller to handle actions
                * It provides methods handle actions
                * 
                * @singleton
                */
    var ActionController = function ActionController() {
            this.serverActionHandler = _serverActionHandler.bind(this);
        },
        p = ActionController.prototype,
        _contentHelper = contentHelper,
        _runtimeService;

    p.init = function (runtimeService, injectedContentHelper) {
        if (_runtimeService !== undefined) {
            _runtimeService.removeEventListener(SocketEvent.ACTION, this.serverActionHandler);
        }
        if (injectedContentHelper) {
            _contentHelper = injectedContentHelper;
        }
        _runtimeService = runtimeService;
        _runtimeService.addEventListener(SocketEvent.ACTION, this.serverActionHandler);
        this.dialogQueue = new DialogQueue();
    };

    function _serverActionHandler(e) {

        var action = e.detail,
            type = _getActionType(action);
            //console.log('[' +action.actionId + ']' +action.action + ':' +JSON.stringify(action.actionArgs));
        try {
            switch (type) {
                case 'widget':
                    _processWidgetAction(action);
                    break;

                case 'clientSystem':
                    _processSystemAction.call(this, action);
                    break;

                default:
                    _processActionResponse(null, action.actionId, false);
                    break;

            }
        } catch (error) {
            _log(error, action);
            _processActionResponse(null, action.actionId, false);
        }
    }

    function _getActionType(action) {
        if (action.action.indexOf('widgets.') !== -1) {
            return 'widget';
        } else if (action.action.indexOf('clientSystem.') === 0) {
            return 'clientSystem';
        } else {
            console.warn('Target:', action.action, 'notAvailable');
        }
    }

    function _processSystemAction(action) {

        switch (action.action) {
            case ('clientSystem.Action.ShowMessageBox'):
                _runShowMessageBoxAction(action);
                break;

            case ('clientSystem.Action.OpenDialog'):
                if (Client.isValid === true) {
                    _runOpenDialogAction.call(this, action);
                } else {
                    _processActionResponse(null, action.actionId, false);
                    console.warn('client not valid -> action "OpenDialog" rejected');
                }
                break;

            case ('clientSystem.Action.OpenDialogAtTarget'):
                if (Client.isValid === true) {
                    _runOpenDialogAtTarget.call(this, action);
                } else {
                    _processActionResponse(null, action.actionId, false);
                    console.warn('client not valid -> action "OpenDialogAtTarget" rejected');
                }
                break;

            case ('clientSystem.Action.CloseDialog'):
                if (Client.isValid === true) {
                    _runCloseDialogAction.call(this, action);
                } else {
                    _processActionResponse(null, action.actionId, false);
                    console.warn('client not valid -> action "CloseDialog" rejected');
                }
                break;

            case ('clientSystem.Action.Navigate'):
                if (Client.isValid === true) {
                    _runNavigateAction(action);
                    _deactivateTooltipMode();
                } else {
                    _processActionResponse(null, action.actionId, false);
                    console.warn('client not valid -> action "Navigate" rejected');
                }
                break;

            case ('clientSystem.Action.LoadContentInArea'):
                if (Client.isValid === true) {
                    _runLoadContentInAreaAction(action);
                } else {
                    _processActionResponse(null, action.actionId, false);
                    console.warn('client not valid -> action "LoadContentInArea" rejected');
                }
                break;

            case ('clientSystem.Action.LoadContentInDialogArea'):
                if (Client.isValid === true) {
                    _runLoadContentInDialogAreaAction(action);
                } else {
                    _processActionResponse(null, action.actionId, false);
                    console.warn('client not valid -> action "LoadContentInDialogArea" rejected');
                }
                break;
            case ('clientSystem.Action.Logout'):
                _runLogoutAction(action);
                break;

            case ('clientSystem.Action.Login'):
                _runLoginAction(action);
                break;

            case ('clientSystem.Action.ChangeTheme'):
                if (Client.isValid === true) {
                    _runChangeThemeAction(action);
                } else {
                    _processActionResponse(null, action.actionId, false);
                    console.warn('client not valid -> action "ChangeTheme" rejected');
                }
                break;

            case ('clientSystem.Action.SetLanguage'):
                _runSetLanguageAction(action);
                break;

            case ('clientSystem.Action.SetMeasurementSystem'):
                _runSetMeasurementSystemAction(action);
                break;
            case ('clientSystem.Action.ScrollContent'):
                if (Client.isValid === true) {
                    _runScrollContentSystemAction(action);
                } else {
                    _processActionResponse(null, action.actionId, false);
                    console.iatWarn('client not valid -> action "ScrollContent" rejected');
                }
                break;
            case ('clientSystem.Action.ShowTooltips'):
                _runShowTooltipsAction(action);
                break;

            case ('clientSystem.Action.OpenChangePasswordDialog'):
                _runOpenChangePasswordDialog(action);
                break;

            case ('clientSystem.Action.FocusNext'):
                focusManager.focusNext();
                _processActionResponse(true, action.actionId, true);
                break;
            case ('clientSystem.Action.FocusPrevious'):
                focusManager.focusPrevious();
                _processActionResponse(true, action.actionId, true);
                break;

            default:
                console.warn('Action:', action.action, 'notAvailable');
                _processActionResponse(null, action.actionId, false);
                break;
        }
    }

    function _getMethodArgs(WidgetClass, actionName, method) {

        if (WidgetClass.meta && WidgetClass.meta.actions) {
            var params = [];
            for (var param in WidgetClass.meta.actions[actionName].parameter) {
                params[WidgetClass.meta.actions[actionName].parameter[param].index] = param;
            }
            return params;
        } else {
            return Utils.getFunctionArguments(method);
        }

    }

    function _processWidgetAction(action) {

        var widgetId = action.target.refId,
            widget = brease.callWidget(widgetId, 'widget');

        if (widget === null) {
            _processActionResponse(null, action.actionId, false);
            return;
        }

        var actionName = action.action.split('.').pop();
        if (widget.state < Enum.WidgetState.INITIALIZED) {
            console.iatWarn('widget action "' + actionName + '" for ' + action.target.refId + ': widget in unavailable state:' + widget.state);
            _processActionResponse(null, action.actionId, false);
            return;
        }

        var WidgetClass = widget.constructor,
            metaMethod = (WidgetClass.meta && WidgetClass.meta.actions) ? WidgetClass.meta.actions[actionName] : undefined,
            methodName = (metaMethod) ? metaMethod.method : actionName.substring(0, 1).toLowerCase() + actionName.substring(1),
            method = widget[methodName];

        if (method === undefined) {
            console.iatWarn('Action "' + actionName + '" not available on type ' + WidgetClass.defaults.className);
            _processActionResponse(null, action.actionId, false);
            return;
        }

        var methodCallArgs = _createArgs(method, actionName, action.actionArgs, WidgetClass),
            methodReturnValue = method.apply(widget, methodCallArgs);

        if (methodReturnValue && typeof methodReturnValue.done === 'function') {
            // if return value of method is a brease.core.libs.Deferred or core.jquery.Promise object  
            // expects the deferred object to be resolved in any case  
            // return values of deferred.resolve(success, result) are: 
            // {Boolean} success: indicator if method was successful
            // {core.datatype.ANY} result: the actual return value of the method (in case of a setter, result == success)
            // {Object} contentData additional info about contents to be activated or deactivated 
            methodReturnValue.done(function (success, result, contentData) {
                if (result === undefined) { result = success; }
                _processWidgetResponse(success, result, action.actionId, actionName, WidgetClass, contentData);
            });
        } else {
            _processWidgetResponse(methodReturnValue !== null, methodReturnValue, action.actionId, actionName, WidgetClass);
        }

        // A&P 493965: if method is a setter, we have to dispatch a PropertyValueChanged event to the server, 
        // if there exists a binding for the related property, to update any subsequent bindings
        if (_isSetter(methodName, metaMethod)) {
            var propName = _getPropertyNameForMethod(metaMethod, methodName);
            _updateRelatedBinding(propName, widgetId, WidgetClass, methodCallArgs[0]);
        }

    }

    function _processWidgetResponse(success, result, actionId, actionName, WidgetClass, contentData) {

        if (success === false) {
            _processActionResponse(result, actionId, false);
        } else {
            var contentAction = _contentHelper.contentAction(WidgetClass, actionName);
            if (contentAction) {
                $.when(_contentHelper.contentFinishedStateChange(contentAction, contentData)).then(function (contentResult) {
                    // Return value in deferred.resolve(contentResult) indicates if content activation or deactivation was successful. 
                    _processActionResponse(contentResult, actionId, contentResult);
                });
            } else {
                _processActionResponse(result, actionId, true);
            }
        }
    }

    function _isSetter(methodName, metaMethod) {
        return methodName.indexOf('set') === 0 || (metaMethod && metaMethod.setterFor !== undefined);
    }

    function _updateRelatedBinding(propName, widgetId, WidgetClass, value) {
        var subscriptions = brease.uiController.getSubscriptionsForElement(widgetId);

        if (subscriptions && subscriptions[propName]) {
            _forwardPropertyChange(propName, widgetId, value);
        }
        if (WidgetClass.meta && WidgetClass.meta.properties && WidgetClass.meta.properties[propName]) {
            var refNode = WidgetClass.meta.properties[propName].nodeRefId;
            if (refNode && subscriptions && subscriptions[refNode]) {
                _forwardPropertyChange(refNode, widgetId, brease.callWidget(widgetId, Utils.getter(refNode)));
            }
        }
    }

    function _getPropertyNameForMethod(metaMethod, methodName) {

        // related property is either defined (setterFor) or extracted from the method name
        if (metaMethod && metaMethod.setterFor) {
            return metaMethod.setterFor;
        } else {
            return methodName.substring(3).replace(/^[A-Z]/, function (item) {
                return item.toLowerCase();
            });
        }
    }

    function _forwardPropertyChange(propName, widgetId, value) {
        var detail = {};
        detail[propName] = value;
        brease.uiController.bindingController.attributeChangeForwarder({
            target: { id: widgetId },
            detail: detail
        });
    }

    // arguments for widget method sorted like defined in the method
    function _createArgs(method, actionName, objActionArgs, WidgetClass) {

        var methodCallArgs = [];

        // unsorted argument names as they come with the action call
        var actionArgNames = Object.keys(objActionArgs);

        // sorting only necessary if there are more than 1 arguments
        if (actionArgNames.length > 1) {
            // sorted names as defined in the widget method
            var sortedArgs = _getMethodArgs(WidgetClass, actionName, method);
            if (sortedArgs) {
                actionArgNames = sortedArgs;
            }
        }
        // sorted values
        for (var i = 0; i < actionArgNames.length; i += 1) {
            methodCallArgs.push(_parseValue(objActionArgs[actionArgNames[i]], actionArgNames[i], WidgetClass, actionName));
        }

        return methodCallArgs;
    }

    function _parseValue(value, argName, WidgetClass, actionName) {

        // if value is no string: value is returned unmodified  
        if (!Utils.isString(value)) {
            return value;
        }

        // if we find no meta information: value is returned unmodified 
        if (WidgetClass.meta === undefined || WidgetClass.meta.actions === undefined || WidgetClass.meta.actions[actionName] === undefined) {
            return value;
        }

        var param = WidgetClass.meta.actions[actionName].parameter[argName];

        // if the type is no object type: value is returned unmodified 
        if (!param || Types.objectTypes.indexOf(param.type) === -1) {
            return value;
        }

        // try to convert the string to an object
        var obj = Utils.parsePseudoJSON(value, 'illegal data in attribute ' + argName + ' for action ' + actionName);
        if (obj) {
            // if the string can be converted to an object: object is returned
            return obj;
        }

        // if the string cannot be converted to an object: value is returned unmodified 
        return value;
    }

    function _runShowMessageBoxAction(action) {
        var args = action.actionArgs;
        $.when(brease.overlayController.showMessageBox(args.type, args.header, args.message, args.icon, args.buttonText, args.style)).then(function (result) {
            // result is the value of the clicked Button
            _processActionResponse(result, action.actionId, true);
        });
    }

    function _runOpenDialogAction(action) {
        var self = this,
            run = action.force === true || !this.dialogQueue.hasPendingAction(action);

        this.dialogQueue.addAction(action);

        if (run) {
            var args = action.actionArgs,
                contentsToLoadInDialog = _contentHelper.contentsToLoadInDialog(args.dialogId);
            $.when(brease.overlayController.openDialog(args.dialogId, args.mode, args.horizontalPos, args.verticalPos, undefined, args.headerText, args.autoClose, args.autoRaise)).then(function (success) {

                if (success === true) {
                    var def = _contentHelper.activateFinished(contentsToLoadInDialog),
                        abortedHandler = _handleDialogOpenAborted.bind(self, def);
                    document.body.addEventListener(BreaseEvent.DIALOG_OPEN_ABORTED, abortedHandler);
                    
                    $.when(def).then(function (activateResult) {
                        document.body.removeEventListener(BreaseEvent.DIALOG_OPEN_ABORTED, abortedHandler);
                        _finishDialogAction.call(self, action, activateResult, activateResult);
                    });
                } else {
                    _finishDialogAction.call(self, action, false, false);
                }
            });
        }
    }

    function _runOpenDialogAtTarget(action) {
        var self = this,
            run = action.force === true || !this.dialogQueue.hasPendingAction(action);

        this.dialogQueue.addAction(action);

        if (run) {
            var args = action.actionArgs,
                target = document.getElementById(args.target),
                contentsToLoadInDialog = _contentHelper.contentsToLoadInDialog(args.dialogId);

            if (_invalidPositionArguments(args)) {
                _runtimeService.logEvents(-2134803119, 0, '', [[args.horizontalPos, args.verticalPos, args.horizontalDialogAlignment, args.verticalDialogAlignment]]);
            }

            if (target !== null) {
                $.when(brease.overlayController.openDialogAtTarget(args.dialogId, args.mode, args.horizontalPos, args.verticalPos, target, args.headerText, args.autoClose, args.horizontalDialogAlignment, args.verticalDialogAlignment, args.autoRaise)).then(function (success) {

                    if (success === true) {
                        var def = _contentHelper.activateFinished(contentsToLoadInDialog),
                            abortedHandler = _handleDialogOpenAborted.bind(self, def);
                        document.body.addEventListener(BreaseEvent.DIALOG_OPEN_ABORTED, abortedHandler);
                    
                        $.when(def).then(function (activateResult) {
                            document.body.removeEventListener(BreaseEvent.DIALOG_OPEN_ABORTED, abortedHandler);
                            _finishDialogAction.call(self, action, activateResult, activateResult);
                        });
                    } else {
                        _finishDialogAction.call(self, action, false, false);
                    }
                });
            } else {
                _finishDialogAction.call(self, action, false, false);
            }
        }
    }

    function _runCloseDialogAction(action) {
        var self = this,
            run = action.force === true || !this.dialogQueue.hasPendingAction(action);

        this.dialogQueue.addAction(action);

        if (run) {

            var args = action.actionArgs,
                activeContentsInDialog = _contentHelper.activeContentsInDialog(args.dialogId);

            brease.overlayController.closeDialog(args.dialogId);

            $.when(_contentHelper.deactivateFinished(activeContentsInDialog)).then(function (deactivateResult) {
                _finishDialogAction.call(self, action, deactivateResult, deactivateResult);
            });
        }
    }

    function _handleDialogOpenAborted(deferred) {
        _contentHelper.abort(deferred);
    }

    function _finishDialogAction(action, result, success) {
        var self = this;
        _processActionResponse(result, action.actionId, success);
        this.dialogQueue.finishAction(action, function (nextAction) {
            if (nextAction) {
                _processSystemAction.call(self, nextAction);
            }
        });
    }

    function _runLoadContentInAreaAction(action) {
        var args = action.actionArgs;
        brease.pageController.loadContentInArea(args.contentId, args.areaId, args.pageId).done(function (loadResult) {
            if (loadResult === true) {
                $.when(_contentHelper.activateFinished([args.contentId])).then(function (activateResult) {
                    _processActionResponse(activateResult, action.actionId, activateResult);
                });
            } else {
                _processActionResponse(loadResult, action.actionId, loadResult);
            }
        });
    }

    function _runLoadContentInDialogAreaAction(action) {
        var args = action.actionArgs;
        brease.pageController.loadContentInDialogArea(args.contentId, args.areaId, args.dialogId).done(function (loadResult) {
            if (loadResult === true) {
                $.when(_contentHelper.activateFinished([args.contentId])).then(function (activateResult) {
                    _processActionResponse(activateResult, action.actionId, activateResult);
                });
            } else {
                _processActionResponse(loadResult, action.actionId, loadResult);
            }
        });
    }

    function _runNavigateAction(action) {
        var args = action.actionArgs,
            container,
            visu = brease.pageController.getVisuById(brease.pageController.getVisu4Page(args.pageId));

        if (visu !== undefined) {
            container = document.getElementById(visu.containerId);
            $.when(brease.pageController.loadPage(args.pageId, container)).then(function (loadResult) {
                if (loadResult.success === true) {
                    $.when(_contentHelper.loadFinished(args.pageId)).then(function (activateResult) {
                        _processActionResponse(activateResult, action.actionId, activateResult);
                    });
                } else {
                    _processActionResponse(false, action.actionId, false);
                }

            });
        } else {
            _processActionResponse(false, action.actionId, false);
        }
    }

    function _runLoginAction(action) {
        var args = action.actionArgs;

        $.when(brease.user.loginAction(args.userName, args.password)).then(function (result) {
            _processActionResponse(result.success, action.actionId, true);
        });
    }

    function _runLogoutAction(action) {

        $.when(brease.user.setDefaultUser()).then(function () {
            _processActionResponse(true, action.actionId, true);
        });
    }

    function _runOpenChangePasswordDialog(action) {

        action.actionArgs.showPolicy = Types.parseValue(action.actionArgs.showPolicy, 'Boolean', { default: false });
        action.actionArgs.userName = Utils.isString(action.actionArgs.userName) ? action.actionArgs.userName : '';

        $.when(brease.overlayController.openChangePasswordDialog(action.actionArgs.userName, action.actionArgs.showPolicy)).then(function (result) {
            _processActionResponse(result, action.actionId, true);
        });

    }

    function _runChangeThemeAction(action) {
        var args = action.actionArgs;
        $.when(brease.pageController.setTheme(args.theme)).then(function () {
            _processActionResponse(true, action.actionId, true);
        });
    }

    function _runSetLanguageAction(action) {
        var args = action.actionArgs;
        $.when(brease.language.switchLanguage(args.value)).then(function (result) {
            _processActionResponse({}, action.actionId, result.success);
        });
    }

    function _runSetMeasurementSystemAction(action) {
        var args = action.actionArgs;
        $.when(brease.measurementSystem.switchMeasurementSystem(args.value)).then(function () {
            _processActionResponse({}, action.actionId, true);
        });
    }

    function _runScrollContentSystemAction(action) {
        var args = action.actionArgs;
        var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;

        if (supportsTouch) {
            // timeout ensures that this will be the last command in the iscroll-probe.js file 
            setTimeout(function () {
                $.when(ScrollManager.scrollContent(args.contentId, args.position, args.duration)).then(function (result) {
                    _processActionResponse(result, action.actionId, true);
                });
            }, 0);
        } else {
            $.when(ScrollManager.scrollContent(args.contentId, args.position, args.duration)).then(function (result) {
                _processActionResponse(result, action.actionId, true);
            });
        }
    }

    function _runShowTooltipsAction(action) {
        var args = action.actionArgs;
        // check server ob value boolean oder string
        if (args.value === 'true' || args.value === true) {
            $('[data-brease-widget]').each(function () {
                brease.callWidget(this.id, 'activateTooltipMode');
            });
        } else if (args.value === 'false' || args.value === false) {
            _deactivateTooltipMode();
        }

        _processActionResponse(true, action.actionId, true);
    }

    function _deactivateTooltipMode() {
        if (tooltipDependency.isActivated()) {
            $('[data-brease-widget]').each(function () {
                brease.callWidget(this.id, 'deactivateTooltipMode');
            });
        }
    }

    /**
                 * @method _processActionResponse
                 * Sends the action response to the server.  
                 * @param {ANY} result Return value of the action. If no return value is available, this is the same value as 'success'. If an action is rejected, result=null.
                 * @param {Integer} id  Id of the action
                 * @param {Boolean} success  Indicator if action was successful
                 */
    function _processActionResponse(result, id, success) {
        var res = {
            actionId: id,
            actionResult: {
                result: result,
                success: success
            }
        };
            //console.log('[' + id + ']success=' + success + ', result=' + result);
        _runtimeService.actionResponse(res);
    }

    function _log(e, action) {

        var message = 'Error in action "' + action.action + ((action.target.refId) ? '" for widget "' + action.target.refId + '"' : '');
        console.log(message + ':');
        console.log(e.message);
    }

    function _invalidPositionArguments(args) {
        return (_isInvalidPosition(args.horizontalPos, 'HorizontalPosition') ||
                _isInvalidPosition(args.verticalPos, 'VerticalPosition') ||
                _isInvalidPosition(args.horizontalDialogAlignment, 'HorizontalPosition') ||
                _isInvalidPosition(args.verticalDialogAlignment, 'VerticalPosition'));
    }

    function _isInvalidPosition(arg, enumType) {
        return arg !== undefined && !Enum[enumType].hasMember(arg);
    }

    return new ActionController();

});
