define(function (require) {
    'use strict';

    var dictionaries = new Map();

    function _load(mode) {
        var _mode = mode.replace('-', '_');
        require(['system/widgets/KeyBoard/libs/external/dict_' + _mode], function (dict) {
            dictionaries.set(mode, dict);
        });
    }
    return {
        get: function (value) {
            return dictionaries.get(value);
        },
        has: function (value) {
            return dictionaries.has(value);
        },
        load: function (mode) {
            if (mode !== 'disabled') {
                _load(mode);
            }
        }
    };
});
