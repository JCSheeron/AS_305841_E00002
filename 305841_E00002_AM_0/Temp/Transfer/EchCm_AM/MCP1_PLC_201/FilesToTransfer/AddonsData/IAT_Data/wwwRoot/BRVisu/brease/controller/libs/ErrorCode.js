define(['brease/services/libs/ServerCode', 'brease/enum/Enum'], function (ServerCode, Enum) {

    'use strict';
    
    // ErrorCode is a helper class which holds log messages and log ids for Server Error codes, managed in ServerCode class.

    var ErrorCode = {
        getMessageByCode: function (code, args) {
            code = '' + code;
            if (_codes[code] !== undefined) {
                var message = _codes[code].message;
                if (Array.isArray(args)) {
                    for (var i = 0; i < args.length; i += 1) {
                        message = message.replace(new RegExp('\\{' + i + '\\}', 'g'), args[i]);
                    }
                }
                return message;
            } else {
                return _codes[ServerCode.GENERIC_CONNECTION_FAILED].message;
            }
        },
        getLogIdByCode: function (code) {
            code = '' + code;
            if (_codes[code] !== undefined) {
                return _codes[code].logId;
            } else {
                return _codes[ServerCode.GENERIC_CONNECTION_FAILED].logId;
            }
        }
    };

    var _codes = {
        '2148073484': {
            message: 'Visualization already open on this client, no further sessions allowed',
            logId: Enum.EventLoggerId.NO_FURTHER_SESSION
        },
        '2148139020': {
            message: 'Maximum number of clients reached!',
            logId: Enum.EventLoggerId.MAX_CLIENTS
        },
        '2148204556': {
            message: 'No more clients allowed, no client license available',
            logId: Enum.EventLoggerId.NOT_ENOUGH_LICENSES
        },
        '2148270092': {
            message: 'Not allowed, license not available for visualization (id="{0}")!',
            logId: Enum.EventLoggerId.NO_LICENSE
        },
        '-1': {
            message: 'server connection (register client) error',
            logId: Enum.EventLoggerId.CLIENT_START_FAIL
        }
    };

    return ErrorCode;
});
