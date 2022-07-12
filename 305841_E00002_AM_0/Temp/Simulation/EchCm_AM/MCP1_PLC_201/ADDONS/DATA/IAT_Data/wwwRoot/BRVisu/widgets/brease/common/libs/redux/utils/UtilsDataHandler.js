define(function () {

    'use strict';

    var UtilsDataHandler = {};

    UtilsDataHandler.order = function (widget) {
        var order = widget.el.find('[data-brease-widget]');
        var id = [];

        for (var i = 0; i < order.length; i += 1) {
            id.push($(order)[i].id);
        }
        return id;
    };

    return UtilsDataHandler;
});
