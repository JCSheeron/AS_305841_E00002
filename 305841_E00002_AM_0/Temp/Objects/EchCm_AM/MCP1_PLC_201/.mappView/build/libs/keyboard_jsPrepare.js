(function () {
    'use strict';

    var jsPrepare = {

        createWidgetJS: function (templateJS, widgetObject, ancestorObject) {
            var newJS = templateJS.replace(/__WIDGET_LIBRARY__/g, widgetObject.library);
            newJS = newJS.replace(/__WIDGET_NAME__/g, widgetObject.name);
            newJS = newJS.replace(/__ANCESTOR_NAME__/g, ancestorObject.name);
            newJS = newJS.replace(/__WIDTH__/g, widgetObject.commonProps.width);
            newJS = newJS.replace(/__HEIGHT__/g, widgetObject.commonProps.height);

            return newJS;
        } 
    };

    module.exports = jsPrepare;

})();
