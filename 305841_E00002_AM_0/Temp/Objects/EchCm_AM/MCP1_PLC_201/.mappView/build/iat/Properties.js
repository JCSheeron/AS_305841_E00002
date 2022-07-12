(function () {

    'use strict';

    var Properties = {
            getBaseProp: function (name) {
                return _baseProp[name];
            }
        },
        _baseProp = {
            id: {
                type: 'WidgetId',
                use: 'required',
                hideable: false
            },
            enable: {
                type: 'Boolean',
                default: 'true',
                use: 'optional'
            },
            permissionOperate: {
                type: 'RoleCollection',
                use: 'optional'
            },
            permissionView: {
                type: 'RoleCollection',
                use: 'optional' 
            },
            style: {
                type: 'StyleReference',
                default: 'default',
                use: 'optional'
            },
            tooltip: {
                type: 'String',
                default: '',
                use: 'optional'
            },
            visible: {
                type: 'Boolean',
                default: 'true',
                use: 'optional'
            },
            zIndex: {
                type: 'UInteger',
                use: 'required' 
            },
            left: {
                type: 'Integer',
                use: 'optional' 
            },
            top: {
                type: 'Integer',
                use: 'optional'
            },
            height: {
                type: 'AutoSize',
                use: 'optional'
            },
            width: {
                type: 'AutoSize',
                use: 'optional' 
            },
            tabIndex: {
                type: 'Integer',
                use: 'optional' 
            }
        };

    module.exports = Properties;

})();
