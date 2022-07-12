define([
    'widgets/brease/GenericDialog/libs/constants'
], function (Constants) {

    'use strict';
    function Renderer() {
    }

    var p = Renderer.prototype;

    p.createDialog = function (id) {
        var dialog = $('<div/>')
            .attr('id', id)
            .attr('data-brease-widget', 'widgets/brease/GenericDialog');
        return dialog.get(0);
    };

    p.createHeader = function () {
        return $('<header/>').addClass(Constants.DIALOG_HEADER_CLASS)
            .get(0);
    };

    p.createHeaderContent = function () {
        return $('<div/>').get(0);
    };

    p.createFooter = function () {
        return $('<footer/>').addClass(Constants.DIALOG_FOOTER_CLASS)
            .get(0);
    };

    p.createFooterContent = function () {
        return $('<div/>').get(0);
    };

    p.createContentFooterContainer = function () {
        var contentFooterContainer = $('<div/>').addClass(Constants.DIALOG_CONTENT_FOOTER_CONTAINER_CLASS);
        return contentFooterContainer.get(0);
    };

    p.createContentContainer = function () {
        var contentBox = $('<div/>').addClass('contentBox');
        return contentBox.get(0);
    };

    p.createContent = function (settings) {
        var content = $('<div/>').addClass('content');
        if (settings.contentWidth) {
            content.css('width', settings.contentWidth + 'px');
        } else {
            content.css('width', 'auto');
        }

        if (settings.contentHeight) {
            content.css('height', settings.contentHeight + 'px');
        } else {
            content.css('height', 'auto');
        }
        return content.get(0);
    };

    p.updateElementSize = function (elem, width, height, auto) {
        if (auto) {
            $(elem).css('width', 'auto');
            $(elem).css('height', 'auto');
        } else {
            $(elem).css('width', width + 'px');
            $(elem).css('height', height + 'px');
        }
    };

    p.createWidgetElem = function (dialogWidget, includeOptions) {

        if (dialogWidget && dialogWidget.type) {
            var widgetElem = $('<div/>')
                .addClass(Constants.DIALOG_WIDGET_CLASS)
                .attr('id', dialogWidget.id)
                .attr('data-brease-widget', dialogWidget.type)
                .css('width', dialogWidget.width)
                .css('height', dialogWidget.height)
                .css('left', dialogWidget.x)
                .css('top', dialogWidget.y)
                .css('z-index', dialogWidget.zIndex);
            
            if (includeOptions) {
                dialogWidget.options.className = dialogWidget.type;
                brease.setOptions(dialogWidget.id, dialogWidget.options);
            }
            
            var finalElem = widgetElem.get(0);
            if (dialogWidget.content !== undefined && dialogWidget.content !== null) {
                for (var i = 0; i < dialogWidget.content.length; i += 1) {
                    dialogWidget.content[i].id = dialogWidget.id.split('_')[0] + '_' + dialogWidget.content[i].name;
                    var dialogElem = this.createWidgetElem(dialogWidget.content[i], true);
                    if (dialogElem !== null) {
                        finalElem.appendChild(dialogElem);
                    }
                }
            }
            return finalElem;
        }
        return null;
    };

    p.createFooterButtonElement = function (buttonWidget) {
        var buttonElem = this.createWidgetElem(buttonWidget, true);
        _addClass(buttonElem, Constants.DIALOG_FOOTER_BUTTON_CLASS);
        return buttonElem;
    };

    function _addClass(elem, className) {
        if (elem.classList) {
            elem.classList.add(className);
        } else {
            $(elem).addClass(className);
        }
    }

    return Renderer;

});
