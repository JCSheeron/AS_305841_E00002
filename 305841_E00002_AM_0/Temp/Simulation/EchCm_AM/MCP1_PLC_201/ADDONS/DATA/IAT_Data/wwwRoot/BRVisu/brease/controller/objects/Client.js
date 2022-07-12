define(function () {

    'use strict';

    var Client = {
            init: function (runtimeService) {
                if (runtimeService && typeof runtimeService.setClientInformation === 'function') {
                    _runtimeService = runtimeService;
                }
                _isValid = undefined;
            },
            setValid: function (flag) {
                if (_isValid !== true && flag === true && _runtimeService !== undefined) {
                    _runtimeService.setClientInformation('{"isValid": true}');
                }
                _isValid = flag;
            },
            setId: function (id) {
                _id = id;
            }
        },
        _isValid,
        _runtimeService, _id;

    Object.defineProperty(Client, 'isValid', {
        get: function () { return _isValid; },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Client, 'id', {
        get: function () { return _id; },
        enumerable: true,
        configurable: true
    });

    return Client;

});
