define([
    'brease/enum/Enum', 
    'brease/events/BreaseEvent'
], function (Enum, BreaseEvent) {

    'use strict';

    /**
     * @class widgets.brease.common.libs.ChildHandling
     * The Module should be used for Parent to Child interactions e.g. set Parameters, get Children, get Information if Children are initialized,....
     *
     */

    var ChildHandling = {};

    /**
     * @method
     * Add the given Class to each Widget of the widgetIDs input
     * @param {StringArray1D} widgetIDs inputStringArray with all WidgetIDs which should receive the classes
     * @param {String} classes String which contains the classes which should be applied to each Widget from widgetIDs input
     */
    ChildHandling.setChildClasses = function setChildClasses(widgetIDs, classes) {
        if (widgetIDs.length > 0) {
            for (var i = 0; i < widgetIDs.length; i += 1) {
                $('#' + widgetIDs[i]).addClass(classes);
            }
        }
    };

    /**
     * @method
     * Removes the given Class to each Widget of the widgetIDs input
     * @param {StringArray1D} widgetIDs inputStringArray with all WidgetIDs which should receive the classes
     * @param {String} classes String which contains the classes which should be applied to each Widget from widgetIDs input
     */
    ChildHandling.removeChildClasses = function removeChildClasses(widgetIDs, classes) {
        if (widgetIDs.length > 0) {
            for (var i = 0; i < widgetIDs.length; i += 1) {
                $('#' + widgetIDs[i]).removeClass(classes);
            }
        }
    };

    /**
     * @method
     * Returns the Widget IDs as well an Instance of each as Object.
     * @param {HTMLElement} container jQuery Element of the Container where it should look for child-widgets
     * @return {Object} {id: [widgetID1, widgetID2,...], instance: [inst1, inst2,..]}
     */
    ChildHandling.getChildren = function getChildren(container) {
        var children = container.find('[data-brease-widget]'),
            childrenInfo = {
                id: []
            };

        if (children !== undefined) {
            if (children.length > 0) {
                children = children.first().parent().children('[data-brease-widget]');
                for (var i = 0; i < children.length; i += 1) {
                    childrenInfo.id.push(children[i].id);
                }
            }
        }

        return childrenInfo;
    };

    /**
     * @method
     * Sets the same Parameter for the provided Widgets
     * @param {StringArray1D} widgetIDs Array with all the WidgetIDs which should receive the parameter
     * @param {String} fnName function-Name of the Function which should be called e.g. 'setStyle'
     * @param {ANY} parameter can be everything like String, Object, Array --> the Function which gets called needs to support the datatype / structure
     */
    ChildHandling.setSameParameterForAllChilds = function setSameParameterForAllChilds(widgetIDs, fnName, parameter) {
        widgetIDs.forEach(function (widgetId) {
            brease.callWidget(widgetId, fnName, parameter);
        });
    };

    /**
     * @method
     * Sets the Parameter for the provided Widget
     * @param {String} widgetId String with WidgetId which should receive the parameter
     * @param {String} fnName function-Name of the Function which should be called e.g. 'setStyle'
     * @param {ANY} parameter can be everything like String, Object, Array --> the Function which gets called needs to support the datatype / structure
     */
    ChildHandling.setParameterForChild = function setParameterForChild(widgetId, fnName, parameter) {
        brease.callWidget(widgetId, fnName, parameter);
    };

    /**
     * @method
     * Check if all the Children are done with the Initialization
     * @param {StringArray1D} widgetIDs Array with widgetIDs which should be checked if already initialized
     * @param {Function} callBackFn the function which is called when all children are done with initialization
     */
    ChildHandling.childrenInitDone = function (widgetIDs, callbackFn) {
        var childDefs = [];

        if (widgetIDs.length === 0) { return; }

        widgetIDs.forEach(function (widgetId) {
            var elem = $('#' + widgetId)[0],
                d = $.Deferred();

            childDefs.push(d);

            if (brease.uiController.getWidgetState(widgetId) >= Enum.WidgetState.INITIALIZED && brease.uiController.getWidgetState(widgetId) !== Enum.WidgetState.SUSPENDED) {
                d.resolve();
            } else {
                elem.addEventListener(BreaseEvent.WIDGET_INITIALIZED, function () {
                    d.resolve();
                });
            }

        });

        $.when.apply($, childDefs).done(function () {
            callbackFn();
        });
    };

    return ChildHandling;

});
