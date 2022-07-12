define(['brease/events/BreaseEvent', 'brease/enum/Enum'], function (BreaseEvent, Enum) {

    'use strict';

    /**
    * @class brease.services.Logger
    * @extends core.javascript.Object
    * Logger Service
    * @singleton
    */
    var Logger = {

            /**
            * @method logMessage
            * Method to write an event to the Eventlog
            * @param {Number} eventId id of the event
            * @param {brease.enum.EventLoggerVerboseLevel} verbose verbose level of the Event
            * @param {String} text additional information about the event
            * @param {String[]} args arguments for logger message
            */
            logMessage: function (eventId, verbose, text, args) {
                if (verbose === undefined || verbose <= _verboseLevel) {
                    _runtimeService.logEvents(eventId, verbose, text, args, _logCallbackHandler);
                }
            },

            /**
            * @method log
            * Method to write an event to the Eventlog
            * @param {brease.enum.EventLoggerId} code 
            * @param {brease.enum.EventLoggerCustomer} customer customer id; Enum.EventLoggerCustomer.BUR for mapp View internal log messages
            * @param {brease.enum.EventLoggerVerboseLevel} verbose verbose level of the Event
            * @param {brease.enum.EventLoggerSeverity} severity 
            * @param {String[]} args arguments for logger message
            * @param {String} text additional Information about the event
            */
            log: function (code, customer, verbose, severity, args, text) {
                if (verbose === undefined) {
                    verbose = Enum.EventLoggerVerboseLevel.OFF;
                }
                if (code !== undefined) {
                    var id = _generateId(code, Enum.EventLoggerFacility.IAT, customer || Enum.EventLoggerCustomer.BUR, severity);
                    this.logMessage(id, verbose, text || '', args || []);
                }
            },
            getVerboseLevel: function () {
                return _verboseLevel;
            }
        },
        _runtimeService, _verboseLevel, _listenerAdded = false;

    Object.defineProperty(Logger, 'init', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function (runtimeService, verboseLevel) {
            _runtimeService = runtimeService;
            _verboseLevel = (verboseLevel !== undefined) ? verboseLevel : Enum.EventLoggerVerboseLevel.OFF;
            if (!_listenerAdded) {
                document.addEventListener(BreaseEvent.LOG_MESSAGE, _logMessageHandler);
                _listenerAdded = true;
            }
            return this;
        }
    });

    function _logMessageHandler(e) {
        var verbose = Enum.EventLoggerVerboseLevel.OFF;
        if (e.detail.verbose !== undefined) {
            verbose = e.detail.verbose;
        }

        if (e.detail && e.detail.code) {
            e.detail.args = e.detail.args || [];
            var id = _generateId(e.detail.code, Enum.EventLoggerFacility.IAT, e.detail.customer || Enum.EventLoggerCustomer.BUR, e.detail.severity);
            Logger.logMessage(id, verbose, e.detail.text, e.detail.args);
        }
    }

    function _logCallbackHandler(data) {
        if (data.verboseLvl !== undefined) {
            _verboseLevel = data.verboseLvl;
        }
    }

    function _generateId(code, facility, customer, severity) {
        var id;

        if (severity === undefined) {
            severity = Enum.EventLoggerSeverity.INFORMATIONAL;
        }

        id = code | (facility << 16) | (customer << 29) | (severity << 30);
        return id;

    }

    return Logger;

});
