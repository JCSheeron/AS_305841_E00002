define(function () {

    'use strict';

    var Utils_FileTransfer = {};

    Utils_FileTransfer.transferFileToClient = function (widget) {
        this.widget = widget;
        this.settings = validateSettings(widget.settings);
        this.targetHostname = location.hostname;
        this.targetPort = location.port;
        this.executeHTTPTransfer();
    };

    Utils_FileTransfer.executeHTTPTransfer = function () {
        var link = document.createElement('a');
        link.download = this.settings.fileName;
        link.href = this.buildTransferUrl();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    Utils_FileTransfer.buildTransferUrl = function () {
        return 'http://' + this.targetHostname + ':' + this.targetPort + '/FileDevice:' + this.settings.fileDeviceName + this.settings.filePath + this.settings.fileName;
    };

    // Currently unused
    Utils_FileTransfer.executeFTPTransfer = function (_widget, _targetHost, settings) {
        var uri = 'ftp://' + settings.FTPUser + ':' + settings.FTPPass + '@' + this.targetHost + settings.filePath + settings.filename;
        var name = settings.filename;
        var link = document.createElement('a');
        link.download = name;
        link.href = uri;
        link.click();
    };

    function validateSettings(settings) {
        // Check if filePath starts with slash
        if (!/^\//.test(settings.filePath)) {
            settings.filePath = '/' + settings.filePath;
        }
        // Check if filePath ends with slash
        if (!/\/$/.test(settings.filePath)) {
            settings.filePath = settings.filePath + '/';
        }

        return settings;
    }

    return Utils_FileTransfer;
});
