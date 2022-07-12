define([
    'brease/core/Class'
], function (SuperClass) {

    'use strict';

    /**
     * @class widgets.brease.common.mpLinkHandler
     * #Description
     * mpLinkHandler
     * @extends brease.core.Class
     *
     * @iatMeta studio:visible
     * false
     */

    var ModuleClass = SuperClass.extend(function MpLinkHandler(widget) {
            SuperClass.call(this);
            this.widget = widget;           
            this.init();
        }, null),

        p = ModuleClass.prototype;

    p.init = function () {
        this.reset();
    };

    /**
     * @method reset
     * method that resets the module, sets the component ot inactive and resets the queue of commands waiting for the component to become active
     */
    p.reset = function () {
        this.componentActive = false; // if Backend Component is not ready when binding is ready we have to wait for it
        this.callbackQueue = [];// every request that's awaiting data is added into queue
        this.queueUntilComponentIsActive = []; //queue for requests until backend is ready
    };

    /**
     * @method dispose
     * Warns the user if the module is about to be disposed and there are still open requests waiting for a repsonse from the backend
     */
    p.dispose = function () {
        if (this.callbackQueue.length > 0) {
            console.iatWarn('Open requests...');
        }
    };

    /**
     * @method incomingMessage
     * This method handles incoming telegrams the backend has sent. Depending on the state of the component, the telegram and the state of the widget; either an
     * error method will be called, the status of the component will be updated (and all subsequent telegrams will be sent) or the method will be passed to the
     * corresponding callback function. Unsolicited telegrams, i.e. telegrams without a matching methodId, will be exposed by an iatWarning. However, we should rarely
     * get into this situation as the methodId is first checked and should only happen if there is a missmatch between mapp component and widget. Wrong mpLink for example.
     * @param {Object} telegram telegram as sent by the backend
     * @param {Object} telegram.parameter Object containing all parameters sent to the backend for processing is returned to the front end again
     * @param {String} telegram.parameter.widgetId The id of the widget that sent a request and now recieves a telegram, not available at first communication
     * @param {String} telegram.methodID The id of the method that was called on the backend, used to identify the corresponding callback function to be used
     * @param {String} telegram.response The status of the response from the backend, information passed on to the callback function associated with this methodId
     */
    p.incomingMessage = function (telegram) {
        if (telegram === null || telegram === '' || (this.componentActive && telegram.parameter === undefined)) {
            return;
        }
        if (!this.componentActive) {
            this._updateComponentActiveState(telegram);
            return;
        }
        if (telegram.parameter.widgetId !== this.widget.elem.id) {
            return;
        }
        if (telegram.error) {
            this.widget._onErrorHandler(telegram.error.code);
        }
        if (telegram.response) {
            this._handleCallbackItem(telegram);
        } else {
            console.iatWarn('Unexpected telegram recieved', this.widget.elem.id, telegram);
        }
    };

    /**
     * @method _handleCallbackItem
     * @private
     * @param {Object} telegram
     */
    p._handleCallbackItem = function (telegram) {
        var callbackItem,
            index = this._getIndexInQueue(telegram.methodID);

        if (index > -1) {
            callbackItem = this.callbackQueue[index];
            switch (callbackItem.type) {
                case 'REQUEST':
                    callbackItem.callback.call(this.widget, telegram.response, telegram);
                    this.callbackQueue.splice(index, 1);
                    break;
                case 'SUBSCRIPTION':
                    callbackItem.callback.call(this.widget, telegram.response, telegram);
                    break;
                case 'UNSUBSCRIPTION':
                    this.callbackQueue.splice(index, 1);
                    break;
            }
        } else {
            console.iatWarn('Response without callback to handle it', telegram);
        }
    };
    
    /**
     * @method sendMessage
     * This widget takes a telegram that is to be sent to the backend, it should preferably not be used by any other than internally in the module, but is still public.
     * If the component is not active, the telegram will be stored and sent again at later stage when the backend component becomes active again. This method will automatically
     * add the element Id (i.e. the widget ID) to the telegram, so no need to include.
     * @param {Object} telegram the telegram that is to be sent. The telegram should be defined in a document specifying the communication between widget and mapp component
     */
    p.sendMessage = function (telegram) {
        if (!this.componentActive) {
            this._handleInactiveComponent(telegram);
            return;
        }
        if (telegram === undefined) {
            this.widget.sendValueChange({ mpLink: {} });
            return;
        }
        if (telegram.parameter === undefined || telegram.parameter === null) {
            telegram.parameter = { widgetId: this.widget.elem.id };
        } else {
            telegram.parameter.widgetId = this.widget.elem.id;
        }
        this.widget.sendValueChange({ mpLink: telegram });
    };

    /**
     * @method sendRequestAndProvideCallback
     * This method is strictly for GETTERS on the backend, i.e. it will retrieve information from the backend but it should not pass any data to it
     * @param {String} methodID The methodID defined in the backend that is to be called
     * @param {Function} callback The associated callback function with this methodID. When a response is returned this is the callback function to be called.
     * @param {Object} requestData The data that is to be passed to the backend, optional.
     * @param {Object} requestParameter The parameters that should be passed to the backend together with the data. A subsequent method will add widget id automatically. Optional.
     */
    p.sendRequestAndProvideCallback = function (methodID, callback, requestData, requestParameter) {
        var telegram = {
            request: 'Get',
            methodID: methodID
        };
        if (requestData !== undefined) {
            telegram.data = requestData;
        }
        if (requestParameter !== undefined) {
            telegram.parameter = requestParameter;
        }
        this.callbackQueue.push({ method: methodID, callback: callback, type: 'REQUEST' });
        this.sendMessage(telegram);
    };

    /**
     * @method sendDataAndProvideCallback
     * This method is strictly for SETTERS on the backend, i.e. it will send information to the backend but cannot retrieve any. The parameter requestData can be used for passing
     * the data. If any parameters are specified in the communication documentation these can be passed on the requestParameter.
     * @param {String} methodID The methodID defined in the backend that is to be called
     * @param {Function} callback The associated callback function with this methodID. When a response is returned this is the callback function to be called.
     * @param {Object} requestData The data that is to be passed to the backend, optional.
     * @param {Object} requestParameter The parameters that should be passed to the backend together with the data. A subsequent method will add widget id automatically. Optional.
     */
    p.sendDataAndProvideCallback = function (methodID, callback, requestData, requestParameter) {
        var telegram = {
            request: 'Set',
            methodID: methodID
        };
        if (requestData !== undefined) {
            telegram.data = requestData;
        }
        if (requestParameter !== undefined) {
            telegram.parameter = requestParameter;
        }
        this.callbackQueue.push({ method: methodID, callback: callback, type: 'REQUEST' });
        this.sendMessage(telegram);
    };

    /**
     * @method subscribeWithCallback
     * Some widgets require information about changes in the backend so that they can subsequently update the data. To this a widget can pass a methodId and  callback to this function
     * and when there is an update in the backend this callback function will be updated.
     * @param {String} methodID The methodID defined in the backend that is to be called
     * @param {Function} callback The associated callback function with this methodID. When a response is returned this is the callback function to be called.
     * @param {Object} requestData The data that is to be passed to the backend, optional.
     * @param {Object} requestParameter The parameters that should be passed to the backend together with the data. A subsequent method will add widget id automatically. Optional.
     */
    p.subscribeWithCallback = function (methodID, callback, requestData, requestParameter) {
        var telegram = {
            request: 'Subscribe',
            methodID: methodID
        };
        if (requestData !== undefined) {
            telegram.data = requestData;
        }
        if (requestParameter !== undefined) {
            telegram.parameter = requestParameter;
        }
        this.callbackQueue.push({ method: methodID, callback: callback, type: 'SUBSCRIPTION' });
        this.sendMessage(telegram);
    };

    /**
     * @method unSubscribe
     * Method used to unsubscribe to subscribed backend methods.
     * @param {String} methodID The methodID defined in the backend that is to be called
     */
    p.unSubscribe = function (methodID, unSubscribeParamter) {
        var telegram = {
                request: 'Unsubscribe',
                methodID: methodID
            },
            index = this._getIndexInQueue(methodID);

        if (unSubscribeParamter !== undefined) {
            telegram.parameter = unSubscribeParamter;
        }
        if (index > -1) {
            this.callbackQueue[index].type = 'UNSUBSCRIPTION';
        }
        this.sendMessage(telegram);
    };

    /**
     * @method _getIndexInQueue
     * @private
     * comparison helper for _.findIndex()
     * @param {String} methodId
     */
    p._getIndexInQueue = function (methodId) {
        return _.findIndex(this.callbackQueue, function (o) { return o.method === methodId; });
    };

    /**
     * @method _handleInactiveComponent
     * @private 
     * @param {Object} telegram
     */
    p._handleInactiveComponent = function (telegram) {
        //queue telegram to be sent later
        this.queueUntilComponentIsActive.push(telegram);
    };

    /**
     * @method _handleComponentSwitchedToActive
     * @private
     */
    p._handleComponentSwitchedToActive = function () {
        var self = this;
        $.each(this.queueUntilComponentIsActive, function () {
            self.sendMessage(this);
        });
        this.queueUntilComponentIsActive = [];
    };

    /**
     * @method _handleComponentNotYetActive
     * @private
     * @param {Object} telegram
     */
    p._handleComponentNotYetActive = function (telegram) {
        this.widget._onErrorHandler(telegram.error.code);
    };

    /**
     * @method _updateComponentActiveState
     * @private
     * called once if backend component is active or twice if backend component is not active when binding gets active but get's active later. 
     * @param {Object} telegram
     */
    p._updateComponentActiveState = function (telegram) {
        if (telegram.methodID === 'GetActiveState') {
            if (telegram.response === 'OK') {
                this.componentActive = true;
                this._handleComponentSwitchedToActive();
            } else {
                this._handleComponentNotYetActive(telegram);
            }
        }
    };

    return ModuleClass;
});
