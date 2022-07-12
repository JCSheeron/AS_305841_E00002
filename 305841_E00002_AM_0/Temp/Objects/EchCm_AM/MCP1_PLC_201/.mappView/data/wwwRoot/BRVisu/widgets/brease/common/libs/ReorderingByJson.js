define([
    'widgets/brease/common/libs/redux/utils/UtilsJSON'
], function (UtilsJSON) {

    'use strict';

    /**
     * @class widgets.brease.common.libs.ReoderingByJson
     * The Module should be used for reordering of Elements
     *
     * This module provides 2 Functions ordering / getOrder which can be used for order the Elements
     * as well as get the current order of the Elements
     */

    var ReorderingByJson = {};
 
    /*
     * The helpers functions should not be directly used from the Module.
     * If you need the Utils, require them directly in your widget, module
     * They are just placed inside the helper object to have a better testability
     */
    ReorderingByJson.helpers = {
        utilsJson: UtilsJSON
    };

    /**
     * @method 
     * Sorts the Elements inside the container based on the input of the JSON String
     * @param {String} JSONString input of the JSON String
     * @param {HTMLElement} container jQuery Element of Container
     * @param {String} contentId ContentId where the widget is placed
     */
    ReorderingByJson.ordering = function ordering(JSONString, container, contentId) {
        var jsonObj = ReorderingByJson.helpers.utilsJson.convertJSONtoObject(JSONString);
        var jsonObjIDs = [];

        for (var i = 0; i < jsonObj.length; i += 1) {
            jsonObjIDs.push(jsonObj[i].wRef);
        }

        jsonObjIDs.forEach(function (id) {
            var detach = $('#' + contentId + '_' + id).detach();
            container.append(detach);
        });
    };

    /**
     * @method 
     * Returns you the JSON String of the Current order of the Widgets inside the Container
     * @param {HTMLElement} container jQuery Element of Container
     * @return {String} Returns the JSON String :  [{'wRef': 'id', 's': 0/1}]
     */
    ReorderingByJson.getOrder = function getOrder(container) {
        var arr = [],
            contentIdLength = 0,
            widget;

        var elements = container.find('> .breaseGridLineItem');

        for (var i = 0; i < elements.length; i += 1) {
            widget = brease.callWidget(elements[i].id, 'widget');
            contentIdLength = widget.settings.parentContentId.length;

            arr.push({
                wRef: elements[i].id.slice(contentIdLength + 1),
                s: widget.getStatus()
            });

        }
        return ReorderingByJson.helpers.utilsJson.convertObjectToJSON(arr);
    };

    return ReorderingByJson;

});
