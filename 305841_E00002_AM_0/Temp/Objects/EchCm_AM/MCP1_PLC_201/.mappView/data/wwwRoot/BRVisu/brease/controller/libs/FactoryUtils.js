define(['brease/core/Utils', 'brease/enum/Enum'], function (Utils, Enum) {

    'use strict';

    return {
        wrapper: document.createElement('div'),

        createNode: function (html, id, options, classPath, HTMLAttributes, content) {

            var isEmpty = false,
                expectsContent = html.indexOf('>CONTENT<') !== -1;

            this.wrapper.innerHTML = html.replace(/{WIDGET_ID}/g, id);
            var node = this.wrapper.firstChild;
            node.id = id;
            node.setAttribute('data-brease-widget', classPath);

            if (HTMLAttributes) {
                for (var attrName in HTMLAttributes) {
                    node.setAttribute(attrName, HTMLAttributes[attrName]);
                }
            }

            var addStyleClass = node.getAttribute('data-instruction-addStyleClass'),
                useDOM = node.getAttribute('data-instruction-useDOM');

            if (addStyleClass === 'true' && options.style !== undefined) {
                Utils.addClass(node, classPath.replace(/\//g, '_') + '_style_' + options.style);
                options.styleClassAdded = true;
            }
            if (useDOM !== 'true' && !expectsContent) {
                node.innerHTML = '';
                isEmpty = true;
            }
            if (useDOM !== null) {
                node.removeAttribute('data-instruction-useDOM');
            }
            if (addStyleClass !== null) {
                node.removeAttribute('data-instruction-addStyleClass');
            }

            Utils.addClass(node, 'breaseWidget');
            if (expectsContent) {
                this.setInitialContent(node, content, isEmpty);
            }
            return node;
        },

        setInitialContent: function (node, content, isEmpty) {
            if (content !== undefined) {
                if (content.text !== undefined) {
                    node.textContent = content.text + '';
                } else if (content.html !== undefined) {
                    node.innerHTML = content.html + '';
                } else if (isEmpty !== true) {
                    node.innerHTML = '';
                }
            } else if (isEmpty !== true) {
                node.innerHTML = '';
            }
        },

        getElem: function (target) {
            if (target !== undefined && target !== null) {
                if (target.jquery !== undefined) {
                    target = (target.length > 0) ? target[0] : null;
                } else if (typeof target.querySelectorAll !== 'function') {
                    target = null;
                }
            } else {
                target = null;
            }
            return target;
        },

        ensureContentId: function (contentId, target, targetState) {
            if (Utils.isString(contentId) && contentId !== '') {
                return contentId;
            }

            if (targetState > Enum.WidgetState.NON_EXISTENT) {
                var settings = brease.callWidget(target.id, 'getSettings');

                if (settings && settings.parentContentId !== undefined) {
                    return settings.parentContentId;
                }
            }
            contentId = target.attributes['data-brease-contentid'];
            if (contentId !== undefined) {
                return contentId.value;
            }

            var parentContent = $(target).closest('[data-brease-contentid]');
            if (parentContent.length > 0) {
                contentId = parentContent.attr('data-brease-contentid');
            } else {
                contentId = brease.settings.globalContent;
            }
            return contentId;
        },

        ensureElemId: function (id) {
            if (!id) {
                id = Utils.uniqueID('generatedWidgetId');
            }
            return id;
        }

    };
});
