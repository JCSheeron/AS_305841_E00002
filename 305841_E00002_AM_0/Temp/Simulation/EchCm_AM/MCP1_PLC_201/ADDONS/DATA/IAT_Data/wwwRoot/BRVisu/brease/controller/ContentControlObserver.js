define(['brease/events/BreaseEvent',
    'brease/enum/Enum',
    'brease/core/Utils',
    'brease/controller/libs/LogCode'], function (BreaseEvent, Enum, Utils, LogCode) {

    'use strict';

    /**
    * @class brease.controller.ContentControlObserver
    * @extends Object
    * @singleton
    */
    // A&P 665105 using a ContentCarousel Widget on a Content which is loaded
    // into a ContentControl Widget leads to a deadlock in the navigation if
    // the nested ContentCarousel is not unloaded during a page change
    var ContentControlObserver = function () { },
        p = ContentControlObserver.prototype,
        eventsAttached = false,
        timeoutId,
        timeout = 1000; // timeout before performing a query inside the DOM

    p.init = function () {
        if (!eventsAttached) {
            this.addEventListeners();
        }
    };

    p.findNestedContentControls = function () {
        $('.breaseContentControl .breaseContentControl').each(function () {
            // this = ContentControl inside of another ContentControl
            var parentContentControlId = $(this).parents('.breaseContentControl').attr('id'),
                parentContentId = brease.callWidget(parentContentControlId, 'getParentContentId'),
                widgetId = Utils.getWidgetId(parentContentId, parentContentControlId);
            _dispatchLogMessage(widgetId,
                parentContentId,
                brease.callWidget(parentContentControlId, 'getContentId'));
        });
    };

    p.addEventListeners = function (remove) {
        var fn = (remove === true) ? 'removeEventListener' : 'addEventListener';
        document.body[fn](BreaseEvent.CONTENT_ACTIVATED, _debouncedFindNestedContentControls);
        document.body[fn](BreaseEvent.CONTENT_DEACTIVATED, _debouncedFindNestedContentControls);
        eventsAttached = !remove;
    };

    p.dispose = function () {
        if (eventsAttached) {
            this.addEventListeners(true);
        }
    };

    function _debouncedFindNestedContentControls() {
        if (timeoutId) {
            window.clearTimeout(timeoutId);
            timeoutId = 0;
        }
        timeoutId = window.setTimeout(instance.findNestedContentControls, timeout);
    }

    function _dispatchLogMessage(widgetId, parentContentId, loadedContentId) {
        var log = LogCode.getConfig(LogCode.NESTED_CONTENT_CONTROL_FOUND);
        document.body.dispatchEvent(new CustomEvent(BreaseEvent.LOG_MESSAGE, {
            detail: {
                customer: Enum.EventLoggerCustomer.BUR,
                verbose: log.verboseLevel,
                severity: log.severity,
                code: log.code,
                text: '',
                args: [widgetId, parentContentId, loadedContentId]
            },
            bubbles: true
        }));
    }

    var instance = new ContentControlObserver();
    return instance;
});
