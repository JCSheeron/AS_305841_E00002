define(['brease/events/BreaseEvent', 'libs/platform'], function (BreaseEvent, platform) {

    'use strict';

    /**
    * @class brease.controller.InfoController
    * @extends Object
    * controls client Info
    * @singleton
    */
    var InfoController = {

            init: function (runtimeService) {
                _runtimeService = runtimeService;
            },

            start: function (active, intervalTime) {
                _activityCount = 0;
                window.setTimeout(function () {
                    _runtimeService.setClientInformation(JSON.stringify(_clientInfo()));
                }, 0);

                if (_interval) {
                    window.clearInterval(_interval);
                }

                _intervalTime = (!isNaN(intervalTime)) ? intervalTime : _defaultIntervalTime;

                if (active === true) {
                // Aktivitätszähler nur aktiv, wenn in config gesetzt (config.activityCount)
                    _interval = window.setInterval(_sendActivity, _intervalTime);
                    _addListener();
                } else {
                    _removeListener();
                }
                brease.appElem.addEventListener(BreaseEvent.PAGE_LOADED, _pageLoadedHandler);
            }
        },
        _interval,
        _defaultIntervalTime = 1000,
        _intervalTime = 1000,
        _activityCount = 0,
        _runtimeService;

    function _activityHandler() {
        _activityCount += 1;
    }

    function _sendActivity() {
        _runtimeService.setClientInformation('{"activityCount":' + _activityCount + '}');
    }

    function _pageLoadedHandler(e) {
        if (e.detail.containerId === brease.appElem.id) {
            _runtimeService.setClientInformation('{"currentPageId":"' + e.detail.pageId + '"}');
        }
    }

    function _clientInfo() {
        return {
            userAgent: navigator.userAgent,
            screenResolution: screen.width + 'x' + screen.height,
            browserResolution: window.innerWidth + 'x' + window.innerHeight,
            languages: ((Array.isArray(navigator.languages)) ? navigator.languages.join(',') : navigator.language) + '',
            activityCount: _activityCount,
            cookieEnabled: navigator.cookieEnabled,
            browser: platform.name,
            operatingSystem: platform.os.family,
            isMultiTouch: navigator.maxTouchPoints > 1 || navigator.msMaxTouchPoints > 1
        };
    }

    function _addListener() {

        document.body.addEventListener('click', _activityHandler);
        document.body.addEventListener('mousedown', _activityHandler);
        document.body.addEventListener('mouseup', _activityHandler);

        document.body.addEventListener('touchstart', _activityHandler);
        document.body.addEventListener('touchend', _activityHandler);
        document.body.addEventListener('touchmove', _activityHandler);
    }

    function _removeListener() {

        document.body.removeEventListener('click', _activityHandler);
        document.body.removeEventListener('mousedown', _activityHandler);
        document.body.removeEventListener('mouseup', _activityHandler);

        document.body.removeEventListener('touchstart', _activityHandler);
        document.body.removeEventListener('touchend', _activityHandler);
        document.body.removeEventListener('touchmove', _activityHandler);
    }

    return InfoController;

});
