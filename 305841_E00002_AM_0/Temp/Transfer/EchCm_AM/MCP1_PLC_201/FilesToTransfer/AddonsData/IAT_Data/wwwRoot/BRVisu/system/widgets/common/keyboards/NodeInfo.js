define(['brease/services/RuntimeService',
    'brease/model/VisuModel',
    'brease/controller/BindingController',
    'brease/enum/EnumObject',
    'brease/core/Types'
],
function (runtimeService,
    visuModel,
    bindingController,
    EnumObject,
    Types) {

    'use strict';

    var NodeInfo = function (widget) {
            this.elements = [];
            this.el = widget.el;
            this.init();
        },
        NODE_ATTRIBUTES = new EnumObject({
            displayName: 'displayName',
            description: 'description'
        }),
        defaultAttribute = 'displayName';

    NodeInfo.prototype.init = function () {
        this.elements = Array.prototype.map.call(this.el.find('.nodeInfo'), function (element) {
            return {
                element: element,
                nodeAttribute: Types.parseValue(element.getAttribute('data-nodeattribute'), 'Enum', { Enum: NODE_ATTRIBUTES, default: defaultAttribute })
            };
        });
    };

    NodeInfo.prototype.dispose = function () {
        this.elements = null;
        this.el = null;
    };

    NodeInfo.prototype.show = function (widgetOptions) {
        setAllEmpty.call(this);

        if (!widgetOptions || !widgetOptions.bindingAttributes || !widgetOptions.contentId || !widgetOptions.widgetId) {
            return;
        }
        var contentId = widgetOptions.contentId,
            content = visuModel.getContentById(contentId);
        if (!content) {
            return;
        }
        var visuId = content.visuId,
            widgetId = widgetOptions.widgetId,
            bindingAttributes = widgetOptions.bindingAttributes,
            subscriptions = bindingController.getSubscriptionsForElement(widgetId),
            widgetAttribute;

        if (subscriptions) {
            for (var i = 0; i < bindingAttributes.length; i += 1) {
                var attr = bindingAttributes[i];
                if (subscriptions[attr] !== undefined) {
                    widgetAttribute = attr;
                    break;
                }
            }
        }
        if (widgetAttribute === undefined) {
            return;
        }
        this.elements.forEach(function (item) {
            runtimeService.getBindingSourceProperties(contentId, visuId, widgetId, widgetAttribute, item.nodeAttribute, function (result, callBackInfo) {
                if (result[0][callBackInfo.nodeAttribute] !== undefined) {
                    callBackInfo.element.innerText = result[0][callBackInfo.nodeAttribute];
                } else {
                    callBackInfo.element.innerText = '';
                    console.iatWarn('attribute "' + callBackInfo.nodeAttribute + '" of bound variable not found!' + ((result[0].status && result[0].status.message) ? ' (server response: ' + result[0].status.message + ')' : ''));
                }
            }, {
                element: item.element,
                nodeAttribute: item.nodeAttribute
            });
        });
    };

    function setAllEmpty() {
        this.elements.forEach(function (item) {
            item.element.innerText = '';
        });
    }

    return NodeInfo;
});
