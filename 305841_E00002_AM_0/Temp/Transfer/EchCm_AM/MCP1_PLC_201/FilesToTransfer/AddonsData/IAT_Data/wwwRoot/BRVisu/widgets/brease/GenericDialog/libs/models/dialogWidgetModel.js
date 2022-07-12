define(function () {
    'use strict';
    
    /**
     * @class widgets.brease.GenericDialog.libs.models.DialogWidgetModel
     * @alternateClassName DialogWidgetModel
     */

    function DialogWidgetModel() {
        this.name = 'widget';
        this.id = '';
        this.type = '';
        this.width = 'auto';
        this.height = 'auto';
        this.x = 0;
        this.y = 0;
        this.options = {};
        this.zIndex = 1;
    }

    DialogWidgetModel.fromObject = function (obj) {
        var instance = new DialogWidgetModel();
        for (var key in obj) {
            instance[key] = obj[key];
        }
        return instance;
    };
    
    return DialogWidgetModel;
});
