define([
    'widgets/brease/Window/Window',
    'brease/events/BreaseEvent',
    'brease/enum/Enum',
    'brease/controller/libs/KeyActions',
    'brease/core/Utils'
], function (SuperClass, BreaseEvent, Enum, KeyActions, Utils) {

    'use strict';

    /**
    * @class widgets.brease.DialogWindow
    * #Description
    * widget to show a dialog window
    * @extends widgets.brease.Window
    *
    * @iatMeta studio:visible
    * false
    * @iatMeta category:Category
    * System
    */

    /**
    * @cfg {Boolean} modal = true
    * @inheritdoc 
    */
    /**
    * @cfg {Boolean} forceInteraction = true
    * @inheritdoc 
    */
    /**
    * @cfg {Boolean} showCloseButton = false
    * @inheritdoc  
    */
    var defaultSettings = {
            modal: true,
            arrow: {
                show: false
            },
            forceInteraction: true,
            showCloseButton: true,
            position: {
                horizontal: 'center',
                vertical: 'middle'
            },
            pointOfOrigin: Enum.PointOfOrigin.CONTAINER,
            html: 'widgets/brease/DialogWindow/DialogWindow.html',
            stylePrefix: 'system_brease_Dialog',
            width: 400,
            height: 200
        },

        /**
        * @method setEnable
        * @inheritdoc
        */
        /**
        * @method setVisible
        * @inheritdoc
        */
        /**
        * @method setStyle
        * @inheritdoc
        */
        /**
        * @event EnableChanged
        * @inheritdoc
        */
        /**
        * @event Click
        * @inheritdoc
        */
        /**
        * @event VisibleChanged
        * @inheritdoc
        */
        // eslint-disable-next-line no-unused-vars
        WidgetClass = SuperClass.extend(function DialogWindow(elem, options, deferredInit, inherited) {
            if (inherited === true) {
                SuperClass.call(this, null, null, true, true);
            } else {

                SuperClass.call(this, null, options, true, true);
                _loadHTML(this);
            }

        }, defaultSettings),

        p = WidgetClass.prototype,
        _counter = 0;
    WidgetClass.ErrorClass = 'dialogWindowError';

    function _loadHTML(widget) {
        require(['text!' + widget.settings.html], function _loadHTMLSuccess(html) {
            var id = 'DialogWindow' + (_counter += 1);
            html = html.replace(/\{\{ID\}\}/g, id);
            widget.deferredInit(document.body, html);
            widget.headerEl = widget.el.find('header .textDiv');
            widget.imgEl = widget.el.find('header img.dummyImage');
            widget.$imageDiv = widget.el.find('header .imageDiv');
            widget.innerHeader = widget.el.find('.innerHeader');
            widget.readyHandler();
        });
    }

    p.init = function () {
        this.addInitialClass('breaseDialogWindow');
        this.contentBox = this.el.find('.contentBox');
        this.settings.windowType = 'DialogWindow';
        SuperClass.prototype.init.call(this, true);
    };

    p._setDimensions = function () {
        if (this.internalData.perform) { // shift calculation after loadDialog call (see p.show)
            var dialog = brease.pageController.getDialogById(this.settings.id);
            if (this.contentBox.children().length > 0) {
                var size = _getLayoutSize(this.contentBox, dialog);
                this.contentBox.css({ 'height': size.height, 'width': size.width });
                this.settings.width = undefined;
                this.settings.height = undefined;

            } else {
                this.settings.height = this.defaultSettings.height;
                this.settings.width = this.defaultSettings.width;
            }
            if (dialog) {
                var layout = brease.pageController.getLayoutById(dialog.layout),
                    borderWidth = parseInt(this.header.css('border-right-width'), 10) + parseInt(this.header.css('border-left-width'), 10);
                this.innerHeader.css('max-width', (layout.width - Math.max(0, borderWidth - 2) - ((this.closeButton.css('display') === 'none') ? 0 : this.closeButton.outerWidth())) + 'px');
            }
            SuperClass.prototype._setDimensions.call(this);
            if (this.header.height() === 0) {
                this.contentBox.css({ 'borderTopRightRadius': this.el.css('borderTopRightRadius'), 'borderTopLeftRadius': this.el.css('borderTopLeftRadius') });
            } else {
                this.contentBox.css({ 'borderTopRightRadius': '0px', 'borderTopLeftRadius': '0px' });
            }
        }
    };

    function _getLayoutSize(container, dialog) {
        var size = {
                width: 0,
                height: 0
            },
            layout = brease.pageController.getLayoutById(dialog ? dialog.layout : undefined);
        // A&P 726970: dialog width is extended if a FlyOut is placed inside
        // we take the dimensions from the layout configuration as container.find('> div') will select
        // the layout element anyways.
        if (layout) {
            var pos = container.find('[data-brease-layoutid="' + layout.id + '"]').position();
            size.width = layout.width + (pos !== undefined ? pos.left : 0);
            size.height = layout.height + (pos !== undefined ? pos.top : 0);
        } else {
            // read container size from direct children of the contentBox element if no layout can be found
            container.find('> div').each(function () {
                var area = $(this), pos = area.position();
                size.width = Math.max(size.width, pos.left + area.width());
                size.height = Math.max(size.height, pos.top + area.height());
            });
        }
        return size;
    }

    /**
    * @method show
    * Opens the DialogWindow
    * @param {brease.objects.DialogWindowOptions} options
    * @param {HTMLElement} refElement Either HTML element of opener widget or any HTML element for relative positioning.
    * @return {Boolean} success Returns true, if dialog is loaded.
    */
    p.show = function (options, refElement) {
        options = options || {};
        // we need information of dialog before SuperClass call, but have to load dialog after it (see A&P 698350)
        var dialog = brease.pageController.getDialogById(options.id),
            result = { success: true };

        options.header = _setHeader(options, dialog);
        options.style = _setStyle(options.style, dialog);
        options.zoomFactor = _setZoom(this.el, dialog);

        if (options.id) {
            this.el.attr('data-brease-dialogId', options.id);
        } else {
            this.el.removeAttr('data-brease-dialogId');
        }

        // avoid calculations of dimension and position in SuperClass call, as loadDialog has an impact to it
        this.internalData.perform = false;
        SuperClass.prototype.show.call(this, options, refElement);
        // A&P 698350: call of loadDialog has to be after the DialogWindow is shown
        if (dialog === undefined) {
            result.success = false;
            result.errorCode = 'NOT_FOUND';
        } else {
            var response = brease.pageController.loadDialog(options.id, this.contentBox[0]);
            if (!response) {
                result.success = false;
                result.errorCode = 'NOT_LOADED';
            }
        }
        if (!result.success) {
            _showError.call(this, options.id, result.errorCode);
        }

        // perform calculations of dimension and position after loadDialog
        this.internalData.perform = true;
        this._setDimensions();
        this._setPosition();
        if (brease.config.visu.keyboardOperation) {
            this.elem.addEventListener('keydown', this._bind('_keydownHandler'));
        }
        document.body.addEventListener(BreaseEvent.THEME_CHANGED, this._bind('_themeChangeHandler'));
        return result.success;
    };

    p._setPosition = function () {
        if (this.internalData.perform) { // shift calculation after loadDialog call (see p.show)
            SuperClass.prototype._setPosition.call(this);
        }
    };

    function _setHeader(options, dialog) {

        if (options.headerText !== undefined) {
            options.header = {
                text: options.headerText
            };
        } else {
            if (dialog !== undefined && dialog.displayName !== undefined) {
                options.header = {
                    text: dialog.displayName
                };
            }
        }
        return options.header;
    }

    function _setStyle(style, dialog) {
        if (dialog && dialog.style) { style = dialog.style; }
        return style;
    }

    function _setZoom($el, dialog) {
        var factor = 1;

        // A&P 466795: dialog has to be zoomed like the visu it belongs to
        if (dialog !== undefined) {
            var visu = brease.pageController.getVisuById(dialog.visuId);

            // it's possible to load a dialog from an embedded Visu which is not loaded so far -> containerID is undefined
            if (visu && visu.containerId) {

                var currentPage = brease.pageController.getPageById(brease.pageController.getCurrentPage(visu.containerId));
                if (currentPage) {
                    var layoutDiv = document.querySelector('[data-brease-layoutid="' + currentPage.layout + '"][data-brease-pageId="' + currentPage.id + '"]');

                    factor = Utils.getScaleFactor(layoutDiv);
                }
            }
        }
        $el.css({ 'transform': 'scale(' + factor + ',' + factor + ')', 'transform-origin': '0 0' });

        return factor;
    }

    function _showError(dialogId, errorCode) {

        var widget = this,
            textKey = (errorCode === 'NOT_FOUND') ? 'BR/IAT/brease.error.DIALOG_NOT_FOUND' : 'BR/IAT/brease.error.DIALOG_NOT_LOADED',
            message = brease.language.getSystemTextByKey(textKey);

        this.setStyle(WidgetClass.ErrorClass);
        this.setModal(false);
        this.setForceInteraction(false);
        this.el.find('.contentBox').css('width', 'auto');
        brease.textFormatter.format(message, [dialogId]).then(function (text) {
            widget.contentBox.append('<div class="errorText" >' + text + '</div>');
        });
    }

    p._keydownHandler = function (e) {
        if (KeyActions.getActionsForKey(e.key).indexOf(Enum.KeyAction.Close) !== -1) {
            this.debouncedHide();
        }
    };

    p._themeChangeHandler = function () {
        this._setImage();
    };

    p._setImage = function () {
        var url = Utils.getBackgroundImageUrl(this.$imageDiv.get(0));
        if (url !== undefined) {
            this.imgEl.attr('src', url);
            this.$imageDiv.css('display', 'inline-block');
        } else {
            this.$imageDiv.css('display', 'none');
        }
        var maxWidth = Math.floor(this.el.find('header').outerWidth() - this.headerEl.outerWidth() - this.closeButton.outerWidth() - 20);
        this.$imageDiv.css('max-width', maxWidth + 'px');
    };

    p._setCloseButton = function () {
        SuperClass.prototype._setCloseButton.apply(this, arguments);
        this.closeButton.css('display', '');
    };

    p._setContent = function () {
        SuperClass.prototype._setContent.apply(this, arguments);
        this._setImage();
    };

    /**
    * @method onBeforeHide
    * @inheritdoc  
    */
    p.onBeforeHide = function () {
        // close all DialogWindows via overlayController
        var dialogId = this.el.attr('data-brease-dialogid');
        if (dialogId) {
            brease.overlayController.closeDialog(dialogId);
        } else {
            this.hide();
        }
    };

    /**
    * @method hide
    * @inheritdoc  
    */
    p.hide = function () {
        brease.pageController.emptyContainer(this.contentBox[0], true);
        this.el.removeAttr('data-brease-dialogId');
        this.elem.removeEventListener('keydown', this._bind('_keydownHandler'));
        document.body.removeEventListener(BreaseEvent.THEME_CHANGED, this._bind('_themeChangeHandler'));
        SuperClass.prototype.hide.call(this);
    };

    p.dispose = function () {
        this.elem.removeEventListener('keydown', this._bind('_keydownHandler'));
        document.body.removeEventListener(BreaseEvent.THEME_CHANGED, this._bind('_themeChangeHandler'));
        SuperClass.prototype.dispose.apply(this, arguments);
    };

    return WidgetClass;

});
