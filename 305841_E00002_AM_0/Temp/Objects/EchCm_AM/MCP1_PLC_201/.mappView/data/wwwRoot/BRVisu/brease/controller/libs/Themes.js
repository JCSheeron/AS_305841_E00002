define(['brease/events/BreaseEvent', 'brease/core/Utils'], function (BreaseEvent, Utils) {

    'use strict';

    /**
    * @class brease.controller.libs.Themes
    * @extends Object
    * @singleton
    */

    var Themes = {

        setTheme: function (themeId) {

            var oldHref = (_currentTheme) ? _themeId2Url(_currentTheme) : '',
                newHref = _themeId2Url(themeId),
                oldTheme = Utils.getStylesheetByHref(oldHref),
                newTheme = Utils.getStylesheetByHref(newHref);

            if (themeId !== _currentTheme) {
                _currentTheme = themeId;
                if (newTheme !== undefined) {
                    if (oldTheme !== undefined) {
                        oldTheme.disabled = true;
                    }
                    newTheme.disabled = false;
                    _finish(themeId);
                } else {
                    _loadTheme(newHref, themeId, oldTheme);
                }
            }
        },

        themeId2Url: function (themeId) {
            return _themeId2Url(themeId);
        },

        getCurrentTheme: function () {
            return _currentTheme;
        }
    };

    var _latestRequest = {},
        _currentTheme;

    function _loadTheme(href, themeId, oldTheme) {
        window.clearTimeout(_latestRequest.timeout);
        _latestRequest.themeId = themeId;
        _latestRequest.themeURL = href;
        _latestRequest.time = Date.now();
        _latestRequest.timeout = window.setTimeout(_loadTimeoutHandler, 100);
        _latestRequest.oldTheme = oldTheme;

        var themeElem = $('<link id="theme_' + themeId + '" href="' + href + '" rel="stylesheet" ></link');

        themeElem[0].addEventListener('load', _themeLoadedHandler, false);

        themeElem.appendTo($('head'));
    }

    function _loadTimeoutHandler() {
        // load event on link-element does not fire on every browser
        // we check if stylesheet is loaded for 5 seconds for these browsers
        var stylesheet = Utils.getStylesheetByHref(_latestRequest.themeURL);
        if (stylesheet && stylesheet.rules && stylesheet.rules.length > 0) {
            _themeLoadedHandler();
        } else {
            if (Date.now() - _latestRequest.time < 5000) {
                _latestRequest.timeout = window.setTimeout(_loadTimeoutHandler, 100);
            }
        }
    }

    function _themeLoadedHandler() {
        window.clearTimeout(_latestRequest.timeout);
        if (_latestRequest.oldTheme !== undefined) {
            _latestRequest.oldTheme.disabled = true;
        }
        _finish(_latestRequest.themeId);
    }

    function _finish() {
        document.body.dispatchEvent(new CustomEvent(BreaseEvent.THEME_CHANGED, { detail: { themeId: _currentTheme } }));
    }

    function _themeId2Url(themeId) {
        return brease.config.themeFolder + themeId + '.min.css';
    }

    return Themes;
});
