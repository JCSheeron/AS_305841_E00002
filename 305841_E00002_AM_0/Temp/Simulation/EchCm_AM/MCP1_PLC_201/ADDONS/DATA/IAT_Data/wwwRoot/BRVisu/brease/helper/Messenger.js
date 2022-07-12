define(['brease/enum/Enum',
    'brease/services/libs/ServerCode',
    'brease/controller/libs/ErrorCode'], function (Enum, ServerCode, ErrorCode) {

    'use strict';

    var Messenger = function (systemMessage) {
            this.systemMessage = systemMessage;
        },
        p = Messenger.prototype;

    p.announce = function (messageId, data) {

        switch (messageId) {

            case Messenger.START_CONTENT:
                console.log('start with content:' + ((data) ? data.contentId : ''));
                break;

            case Messenger.START_VISU:
                console.log('start with visualization:' + ((data) ? data.visuId : ''));
                break;

            case Messenger.VISU_NOT_FOUND:
                console.log('visualization (visuId=' + ((data) ? data.visuId : '') + ') not found');
                break;

            case Messenger.VISU_NOT_ACTIVATED:
                console.log('visualization (visuId=' + ((data) ? data.visuId : '') + ') not activated');
                this.systemMessage.showMessage('visualization (visuId=' + ((data) ? data.visuId : '') + ') not activated');
                break;

            case Messenger.CONFIGURATION_LOAD_ERROR:
                console.iatWarn('configuration not found; take default values');
                break;

            case Messenger.START_SERVICES_SUCCESS:
                brease.loggerService.log(Enum.EventLoggerId.CLIENT_START_OK, Enum.EventLoggerCustomer.BUR, Enum.EventLoggerVerboseLevel.OFF, Enum.EventLoggerSeverity.SUCCESS, [data.clientId]);
                break;

            case Messenger.START_SERVICES_FAILED:
                var cookieAddition = ((data.cookies !== undefined && data.cookies === false) ? '\n(please check if cookies are enabled)' : '');
                console.log('XHR error:' + data.message + cookieAddition);
                this.systemMessage.showMessage('server connection error' + cookieAddition);
                brease.loggerService.log(Enum.EventLoggerId.CLIENT_START_FAIL, Enum.EventLoggerCustomer.BUR, Enum.EventLoggerVerboseLevel.OFF, Enum.EventLoggerSeverity.ERROR, [], 'XHR error:' + data.message);
                break;

            case Messenger.REGISTER_CLIENT_SUCCESS:
                console.log('registered client with id = ' + ((data) ? data.clientId : ''));
                break;

            case Messenger.REGISTER_CLIENT_FAILED:
                // generic connection failed message and id
                var logMessage = ErrorCode.getMessageByCode(ServerCode.GENERIC_CONNECTION_FAILED),
                    logId = ErrorCode.getLogIdByCode(ServerCode.GENERIC_CONNECTION_FAILED);

                if (data.response.status !== undefined && data.response.status.code !== undefined) {
                    // specific log message and id if there is a code
                    logMessage = ErrorCode.getMessageByCode(data.response.status.code, [data.visuId]);
                    logId = ErrorCode.getLogIdByCode(data.response.status.code);
                }
                brease.loggerService.log(logId, Enum.EventLoggerCustomer.BUR, Enum.EventLoggerVerboseLevel.OFF, Enum.EventLoggerSeverity.ERROR, [], logMessage);
                this.systemMessage.showMessage(logMessage);
                console.log(logMessage);
                break;

            case Messenger.SERVER_CONNECTION_START:

                this.systemMessage.deferMessage('try to establish server connection...', 2000);
                console.log('try to establish server connection..');
                break;

            case Messenger.SERVER_CONNECTION_SUCCESS:

                this.systemMessage.clear();
                break;

            case Messenger.SERVER_CONNECTION_ERROR:

                this.systemMessage.showMessage('server connection error');
                break;

            case Messenger.TEXT_LOAD_START:

                this.systemMessage.deferMessage('loading texts...', 2000);
                console.log('loading texts...');
                break;

            case Messenger.TEXT_LOAD_SUCCESS:

                this.systemMessage.clear();
                break;

            case Messenger.TEXT_LOAD_ERROR:

                this.systemMessage.showMessage('error on loading texts');
                break;

            case Messenger.WIDGET_LOAD_ERROR:

                this.systemMessage.showMessage('error on loading system widgets');
                break;
        }
    };
    Messenger.START_CONTENT = 'START_CONTENT';
    Messenger.START_VISU = 'START_VISU';
    Messenger.VISU_NOT_FOUND = 'VISU_NOT_FOUND';
    Messenger.VISU_NOT_ACTIVATED = 'VISU_NOT_ACTIVATED';
    Messenger.CONFIGURATION_LOAD_ERROR = 'CONFIGURATION_LOAD_ERROR';
    Messenger.START_SERVICES_SUCCESS = 'START_SERVICES_SUCCESS';
    Messenger.START_SERVICES_FAILED = 'START_SERVICES_FAILED';
    Messenger.REGISTER_CLIENT_SUCCESS = 'REGISTER_CLIENT_SUCCESS';
    Messenger.REGISTER_CLIENT_FAILED = 'REGISTER_CLIENT_FAILED';
    Messenger.SERVER_CONNECTION_START = 'SERVER_CONNECTION_START';
    Messenger.SERVER_CONNECTION_SUCCESS = 'SERVER_CONNECTION_SUCCESS';
    Messenger.SERVER_CONNECTION_ERROR = 'SERVER_CONNECTION_ERROR';
    Messenger.TEXT_LOAD_START = 'TEXT_LOAD_START';
    Messenger.TEXT_LOAD_SUCCESS = 'TEXT_LOAD_SUCCESS';
    Messenger.TEXT_LOAD_ERROR = 'TEXT_LOAD_ERROR';
    Messenger.WIDGET_LOAD_ERROR = 'WIDGET_LOAD_ERROR';

    return Messenger;

});
