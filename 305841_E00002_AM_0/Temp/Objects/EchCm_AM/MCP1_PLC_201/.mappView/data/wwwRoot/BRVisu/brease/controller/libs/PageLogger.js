define(['brease/enum/Enum', 'brease/config', 'brease/controller/libs/LogCode'], function (Enum, config, LogCode) {

    'use strict';

    var PageLogger = function (controller, options) {
            this.controller = controller;
            this.settings = {
                clientMessage: (options !== undefined && options.clientMessage !== undefined) ? options.clientMessage : defaults.clientMessage
            };
        },
        p = PageLogger.prototype,
        defaults = {
            clientMessage: true
        };

    p.log = function (logId, data) {
        var args = [];
        switch (logId) {
            case LogCode.PAGE_NOT_FOUND:
                console.iatWarn('referenced page (' + data.pageId + ') does not exist!');
                _log(logId, [data.pageId]);
                if (data.isStartPage === true) {
                    _showClientMessage.call(this, logId, [data.pageId || 'undefined']);
                }
                break;
            case LogCode.CONTAINER_NOT_FOUND:
                console.iatWarn('referenced page (' + data.pageId + ') does not exist!');
                _log(logId, [data.pageId]);
                if (data.isStartPage === true) {
                    _showClientMessage.call(this, logId, [data.pageId || 'undefined']);
                }
                break;
            case LogCode.DIALOG_NOT_FOUND:
                console.iatWarn('referenced dialog (' + data.dialogId + ') does not exist!');
                _log(logId, [data.dialogId]);
                break;
            case LogCode.NO_PAGES_FOUND:
                console.iatWarn('no pages in in visualisation (id="' + data.visuId + '") referenced!');
                _showClientMessage.call(this, logId, [data.visuId]);
                _log(logId, [data.visuId]);
                break;
            case LogCode.NO_LAYOUTS_FOUND:
                console.iatWarn('no layouts in in visualisation (id="' + data.visuId + '") referenced!');
                _showClientMessage.call(this, logId, [data.visuId], data.container);
                _log(logId, [data.visuId]);
                break;
            case LogCode.VISU_MALFORMED:
                _showClientMessage.call(this, logId, [data.visuId], data.container);
                console.log('%c' + 'Visu file (' + data.visuId + '.json) ist kein gueltiges JSON!', 'color:red;');
                _log(logId, [data.visuId]);
                break;
            case LogCode.VISU_NOT_FOUND:
                _showClientMessage.call(this, logId, [data.visuId], data.container);
                console.log('%c' + 'Visu file (' + data.visuId + '.json) nicht gefunden', 'color:red;');
                _log(logId, [data.visuId]);
                break;
            case LogCode.LAYOUT_NOT_FOUND:
                console.iatWarn('layout (id="' + data.layoutId + '") does not exist!');
                _log(logId, [data.layoutId, data.pageId]);
                if (data.isStartPage === true) {
                    _showClientMessage.call(this, logId, [data.layoutId, data.pageId]);
                }
                break;
            case LogCode.CONTENT_NOT_FOUND:
                console.iatWarn('content (id=' + data.contentId + ') not found!');
                _log(logId, [data.contentId]);
                break;

            case LogCode.CONTENT_LOADING_IN_PROCESS:
                console.iatWarn('content loading in process!');
                if (data.contentId) {
                    args.push(data.contentId);
                } else if (data.pageId) {
                    args.push(data.pageId);
                }
                _log(logId, args);
                break;

            case LogCode.CONTENT_IS_ACTIVE:
                console.iatWarn('content (id=' + data.contentId + ') already loaded!');
                _log(logId, [data.contentId]);
                break;
            case LogCode.AREA_NOT_FOUND:
                console.iatWarn('area (id="' + data.areaId + '") not found! (pageId:"' + data.pageId + '", layoutId:"' + data.layoutId + ')');
                _log(logId, [data.areaId, data.layoutId, data.pageId]);
                break;
            case LogCode.PAGE_IS_CURRENT:
                console.iatWarn('page (id="' + data.pageId + '") is current! no need to load');
                break;
            case LogCode.PAGE_NOT_CURRENT:
                console.iatWarn('page (id="' + data.pageId + '") is currently not loaded');
                _log(logId, [data.pageId]);
                break;
            case LogCode.NO_VISUDATA_FOUND:
                console.log('%c' + 'PageController.start, no visuData found', 'color:red;');
                break;
            case LogCode.THEME_NOT_FOUND:
                console.iatWarn('Theme (id=' + data.themeId + ') not found!');
                _log(logId, [data.themeId], 'themeId:' + data.themeId);
                break;
            case LogCode.VISU_ACTIVATE_FAILED:
                console.iatWarn('activate visu (id=' + data.visuId + ') denied,code=' + data.code);
                _showClientMessage.call(this, logId, [data.visuId, data.code], data.container);
                break;
        }
    };

    p.message = function () {
        _message.apply(this, arguments);
    };

    function _log(logId, args, text) {
        var log = LogCode.getConfig(logId);
        brease.loggerService.log(log.code, Enum.EventLoggerCustomer.BUR, log.verboseLevel, log.severity, args, text);
    }

    function _showClientMessage(logId, args, container) {

        var messageKey = LogCode.getConfig(logId).messageKey,
            rootContainer = this.controller.rootContainer;

        if (this.settings.clientMessage === true) {
            _message(messageKey, args, function (text) {
                if (container) {
                    $(container).html('<label>' + text + '</label>');
                    if (container.id === 'appContainer') {
                        $('#splashscreen').remove();
                    }
                } else {
                    $(rootContainer).html('<label>' + text + '</label>');
                    $('#splashscreen').remove();
                }
            });
        }
    }

    function _message(messageKey, args, callback) {
        var message = brease.language.getSystemTextByKey('BR/IAT/' + messageKey);
        if (message === config.undefinedTextReturnValue) {
            message = _fallBackMessages[messageKey];
        }
        if (message !== undefined) {
            brease.textFormatter.format(message, args).then(callback);
        }
    }

    var _fallBackMessages = {
        'brease.error.STARTPAGE_NOT_FOUND': 'startpage (id="{1}") not found!',
        'brease.error.NO_PAGES_FOUND': 'no pages in visualization (id="{1}")!',
        'brease.error.NO_LAYOUTS_FOUND': 'no layouts in visualization (id="{1}")!',
        'brease.error.INCORRECT_VISU': 'Visualization (id="{1}") cannot be displayed!',
        'brease.error.VISU_NOT_FOUND': 'Visualization (id="{1}") not found!',
        'brease.error.LAYOUT_NOT_FOUND': 'Layout (id="{1}") for Page (id="{2}") not found!',
        'brease.error.CONTENT_NOT_FOUND': 'content (id="{1}") not found!',
        'brease.error.ACTIVATE_VISU_FAILED': 'Not allowed! License not available for visualization "{1}"!'
    };

    return PageLogger;

});
