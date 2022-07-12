define(['brease/events/BreaseEvent',
    'brease/events/SocketEvent',
    'brease/controller/objects/ContentStatus',
    'brease/controller/ContentManager',
    'brease/core/Utils'], 
function (BreaseEvent, SocketEvent, ContentStatus, contentManager, Utils) {

    'use strict';

    const _timeout = {
        activateContentResponse: 50,
        activateContentEvent: 100,
        deactivateContentResponse: 0,
        deactivateContentEvent: 0
    };

    /**
    * @class brease.helper.stubs.BindingControllerStub
    * @alternateClassName BindingControllerStub
    */
    /**
    * @method constructor
    * @param {Number/Object/undefined} timeout either a config for timeout or a number for all three entries or undefined for default config
    * @param {brease.services.RuntimeService} runtimeService
    */
    var BindingControllerStub = function BindingControllerStub(timeout, runtimeService) {
        this.contents = {};
        this.activateFail = [];
        this.deactivateFail = [];
        if (timeout !== undefined) {
            this.timeout = {};
            this.timeout.activateContentResponse = parse(timeout, 'activateContentResponse');
            this.timeout.activateContentEvent = parse(timeout, 'activateContentEvent');
            this.timeout.deactivateContentResponse = parse(timeout, 'deactivateContentResponse');
            this.timeout.deactivateContentEvent = parse(timeout, 'deactivateContentEvent');
        } else {
            this.timeout = Utils.deepCopy(_timeout);
        }
        this.runtimeService = runtimeService;
        this.isStub = true;
    };

    var p = BindingControllerStub.prototype;

    p.reset = function () {
        this.contents = {};
        this.activateFail = [];
        this.deactivateFail = [];
    };

    p.activateContent = function (contentId) {
        //console.warn('activateContent:' + contentId);
        this.setContentState(contentId, ContentStatus.activatePending);
        contentManager.setActiveState(contentId, ContentStatus.activatePending);
        var deferred = $.Deferred();
        activateContent.call(this, contentId, deferred); 
        return deferred.promise();
    };

    p.deactivateContent = function (contentId) {
        //console.warn('deactivateContent:' + contentId);
        this.setContentState(contentId, ContentStatus.deactivatePending);
        contentManager.setActiveState(contentId, ContentStatus.deactivatePending);
        var deferred = $.Deferred();
        deactivateContent.call(this, contentId, deferred); 
        return deferred.promise();
    };

    p.sendInitialValues = function (contentId, callback) { 
        if (typeof callback === 'function') { callback(contentId); } 
    };

    p.getSubscriptionsForElement = function () { return []; };

    p.allActive = function () {
        return true;
    };

    p.isBindingLoaded = function () {
        return true;
    };

    p.isActiveSessionEvent = function () {
        return true;
    };

    p.eventIsSubscribed = function () {
        return true;
    };

    p.setContentState = function (contentId, state) {
        this.contents[contentId] = {
            state: state
        };
    };

    p.getContentState = function (contentId) {
        if (this.contents && this.contents[contentId] !== undefined) {
            return this.contents[contentId].state;
        } else {
            return undefined;
        }
    };

    p.isContentActive = function (contentId) {
        if (this.contents[contentId] === undefined) {
            this.contents[contentId] = { state: ContentStatus.deactivated };
        }
        return this.contents[contentId].state === ContentStatus.active;
    };

    p.attributeChangeForwarder = function () { 
        //console.info('attributeChangeForwarder'); 
    };

    function parse(to, attr) {
        if (typeof to === 'number') {
            return parseInt(to, 10);
        } else if (typeof to[attr] === 'number') {
            return parseInt(to[attr], 10);
        } else {
            return _timeout[attr];
        }
    }

    function activateContent(contentId, deferred) {
        var self = this;
        if (this.activateFail.indexOf(contentId) === -1) {
            if (this.timeout.activateContentResponse === 0) {
                deferred.resolve(contentId);

            } else {
                window.setTimeout(function (cid) {
                    deferred.resolve(cid);
                }, this.timeout.activateContentResponse, contentId);
            }

            if (this.timeout.activateContentEvent === 0) {
                this.contents[contentId] = { state: ContentStatus.active };
                if (this.runtimeService) {
                    this.runtimeService.dispatchEvent({
                        event: SocketEvent.CONTENT_ACTIVATED,
                        detail: {
                            visuId: '',
                            contentId: contentId
                        }
                    }, SocketEvent.CONTENT_ACTIVATED);
                } else {
                    document.body.dispatchEvent(new CustomEvent(BreaseEvent.CONTENT_ACTIVATED, { detail: { contentId: contentId } })); 
                } 

            } else {
                window.setTimeout(function (cid) {
                    self.contents[cid] = { state: ContentStatus.active };
                    if (self.runtimeService) {
                        self.runtimeService.dispatchEvent({
                            event: SocketEvent.CONTENT_ACTIVATED,
                            detail: {
                                visuId: '',
                                contentId: cid
                            }
                        }, SocketEvent.CONTENT_ACTIVATED);
                    } else {
                        document.body.dispatchEvent(new CustomEvent(BreaseEvent.CONTENT_ACTIVATED, { detail: { contentId: cid } })); 
                    } 
                }, self.timeout.activateContentEvent, contentId);
            }
                
        } else {
            deferred.reject(contentId);
            console.log('%c' + 'activate of content ' + contentId + ' failed', 'color:red;');
        }
    }
    function deactivateContent(contentId, deferred) {
        var self = this;
        if (this.deactivateFail.indexOf(contentId) === -1) {
            //console.log('%c' + BreaseEvent.CONTENT_DEACTIVATED + ':' + contentId, 'color:#cc00cc');
            if (this.timeout.deactivateContentResponse === 0) {
                deferred.resolve(contentId);
            } else {
                window.setTimeout(function (cid) {
                    deferred.resolve(cid);
                }, this.timeout.deactivateContentResponse, contentId);
            }
            if (this.timeout.deactivateContentEvent === 0) {
                this.contents[contentId] = { state: ContentStatus.deactivated };
                if (this.runtimeService) {
                    this.runtimeService.dispatchEvent({
                        event: SocketEvent.CONTENT_DEACTIVATED,
                        detail: {
                            visuId: '',
                            contentId: contentId
                        }
                    }, SocketEvent.CONTENT_DEACTIVATED);
                } else {
                    document.body.dispatchEvent(new CustomEvent(BreaseEvent.CONTENT_DEACTIVATED, { detail: { contentId: contentId } }));
                }
            } else {
                window.setTimeout(function (cid) {
                    self.contents[cid] = { state: ContentStatus.deactivated };
                    if (self.runtimeService) {
                        self.runtimeService.dispatchEvent({
                            event: SocketEvent.CONTENT_DEACTIVATED,
                            detail: {
                                visuId: '',
                                contentId: cid
                            }
                        }, SocketEvent.CONTENT_DEACTIVATED);
                    } else {
                        document.body.dispatchEvent(new CustomEvent(BreaseEvent.CONTENT_DEACTIVATED, { detail: { contentId: cid } }));
                    }
                    
                }, self.timeout.deactivateContentEvent, contentId);
            }
        } else {
            console.log('%c' + 'deactivate of content ' + contentId + ' failed', 'color:red;');
        }
    }

    return BindingControllerStub;

});
