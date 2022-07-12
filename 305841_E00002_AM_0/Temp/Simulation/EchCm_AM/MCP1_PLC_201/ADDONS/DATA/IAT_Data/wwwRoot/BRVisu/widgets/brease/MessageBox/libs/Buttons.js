define(['brease/core/Utils'], function (Utils) {

    'use strict';

    var MessageBoxButtons = {};

    Utils.defineProperty(MessageBoxButtons, 'btnOk', {
        state: 'OK',
        textkey: 'BR/IAT/brease.common.ok'
    });
    Utils.defineProperty(MessageBoxButtons, 'btnYes', {
        state: 'YES',
        textkey: 'BR/IAT/brease.common.yes'
    });
    Utils.defineProperty(MessageBoxButtons, 'btnNo', {
        state: 'NO',
        textkey: 'BR/IAT/brease.common.no'
    });
    Utils.defineProperty(MessageBoxButtons, 'btnAbort', {
        state: 'ABORT',
        textkey: 'BR/IAT/brease.common.abort'
    });
    Utils.defineProperty(MessageBoxButtons, 'btnRetry', {
        state: 'RETRY',
        textkey: 'BR/IAT/brease.common.retry'
    });
    Utils.defineProperty(MessageBoxButtons, 'btnIgnore', {
        state: 'IGNORE',
        textkey: 'BR/IAT/brease.common.ignore'
    });
    Utils.defineProperty(MessageBoxButtons, 'btnCancel', {
        state: 'CANCEL',
        textkey: 'BR/IAT/brease.common.cancel'
    });

    return MessageBoxButtons;
});
