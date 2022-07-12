define(['widgets/brease/Window/Window',
    'brease/events/BreaseEvent',
    'brease/core/Utils',
    'widgets/brease/GenericDialog/libs/config',
    'widgets/brease/GenericDialog/libs/constants',
    'widgets/brease/GenericDialog/libs/renderer',
    'widgets/brease/GenericDialog/libs/models/dialogWidgetModel',
    'widgets/brease/GenericDialog/libs/enum/dialogResultEnum'
], function (SuperClass, BreaseEvent, Utils, Config, Constants, Renderer, DialogWidgetModel, DialogResult) {
    'use strict';

    /**
     * @class widgets.brease.GenericDialog
     * #Description
     * The GenericDialog is an overlay, to provide possibility to add widgets.  
     * It opens in the context of the calling widget.  
     * @extends widgets.brease.Window
     *
     * @iatMeta studio:visible
     * false
     * @iatMeta studio:createHelp
     * false
     * @iatMeta description:short
     * Dialog zum zur Anzeige von Widgets
     * @iatMeta description:de
     * Dialog zum zur Anzeige von Widgets
     * @iatMeta description:en
     * Dialog for showing widgets
     * @iatMeta description:ASHelp
     * The GenericDialog can not be used in a content directly, but its possible to use styles for it.
     */

    var defaultSettings = new Config();
    var WidgetClass = SuperClass.extend(function GenericDialog(widgetElement) {

        this.renderer = new Renderer();
        
        this.widgetElement = widgetElement;
        this.elem = null;
        this.el = null;
        this.headerElem = null;
        this.footerElem = null;
        this.contentElem = null;

        this.data = {};

        this.error = false;
        this.closingDeferred = $.Deferred();

        SuperClass.call(this, null, null, true, true);

    }, defaultSettings);

    var p = WidgetClass.prototype;

    /**
     * @method
     * Method used for initialization of the widget. (do not call this method manually)
     * @param {Boolean} omitReadyEvent prevent widget from executing the 'widget_ready' event
     */
    p.init = function (omitReadyEvent) {

        if (this.settings.omitClass !== true) {
            this.addInitialClass(Constants.DIALOG_INITIAL_CLASS);
        }
        this.settings.windowType = Constants.DIALOG_WINDOW_TYPE;

        _initSkeleton(this);
        _initEventHandler(this);

        this._initHeader();
        this._initContent();
        this._initFooter();

        document.body.appendChild(this.elem);

        SuperClass.prototype.init.call(this, omitReadyEvent);

        // Parse for widgets inside dialog
        var self = this;
        this.onContentParsed = function (e) { _onContentParsed(self, e); };
        this.elem.addEventListener(BreaseEvent.CONTENT_PARSED, this.onContentParsed);
        brease.uiController.parse(this.elem);
    };

    /**
     * @method
     * Opens the Dialog on the page 
     * @param {Object} dialog configuration
     * @param {HTMLElement} DOM element to which should defined the as the <b>pointOfOrigin</b>
     */
    p.show = function (config, refElement) {
        config = _validatePositions(config);
        this.settings = Utils.extendDeepToNew(this.settings, config);
        // init
        this.init(false);
        // show
        config.zoomFactor = this._setZoom(this.el, brease.config.visuId);
        SuperClass.prototype.show.call(this, config, refElement); // settings are extended in super call
    };

    /**
     * @method
     * Closes the dialog, without any dialog result
     */
    p.hide = function () {
        this.dispatchEvent(new CustomEvent('window_closing', {
            detail: {
                id: this.elem.id
            },
            bubbles: true
        }));

        if (this.closingDeferred) {
            this.closingDeferred.resolve();
        }

        // hide
        SuperClass.prototype.hide.call(this);
        // dispose
        this.dispose();
    };

    /**
     * @method
     * Closes the dialog, with dialog result <b>CLOSE</b> 
     */
    p.close = function () {
        var self = this;
        this.isReady().then(function () {
            self.settings.dialogResult = DialogResult.CLOSE;
            self.debouncedHide();
        });
    };

    /**
     * @method
     * <b>true</b> if dialog is open, otherwise false 
     * @return {Boolean}
     */
    p.isOpen = function () {
        if (this.closingDeferred && this.closingDeferred.state() === 'pending') {
            return true;
        }
        return false;
    };

    /**
     * @method
     * Returns a <b>deferredObject</b> which is resolved before dialog is disposed 
     */
    p.onClosing = function () {
        return this.closingDeferred.promise();
    };

    /**
     * @method
     * Returns the closing result of the dialog, which describes how the dialog was closed 
     */
    p.getDialogResult = function () {
        return this.settings.dialogResult;
    };

    /**
     * @method
     * Returns a widget inside the dialog, identified by the <b>name</b> paramter 
     * @param {String} name 
     */
    p.getWidgetByName = function (name) {
        var widgetModel = this.settings.getWidgetModelByName(name);

        if (widgetModel) {
            var breaseWidget = brease.callWidget(widgetModel.id, 'widget');
            return breaseWidget;
        }
        return null;
    };

    /**
     * @method
     * Returns the ID of a widget inside the dialog, identified by configured name
     * @param {String} name 
     */
    p.getWidgetIdByName = function (name) {
        return this._createWidgetId(name);
    };

    /**
     * @method
     * Adds widget to the dialog. Usefull for adding widgets dynamically when dialog is already open. 
     * @param {DialogWidgetModel} dialogWidget 
     */
    p.addWidget = function (dialogWidget) {
        var widget = this.getWidgetByName(dialogWidget.name);
        if (widget) {
            console.iatWarn('Widget already exists in Dialog!');
            return;
        }

        dialogWidget.id = this._createWidgetId(dialogWidget.name);
        dialogWidget.options.style = this.settings.style;

        var widgetElem = this.renderer.createWidgetElem(dialogWidget);
        if (widgetElem) {
            this.settings.widgets.push(dialogWidget);
            this.contentElem.appendChild(widgetElem);

            brease.uiController.parse(widgetElem, true);
            brease.uiController.setOptions(dialogWidget.id, dialogWidget.options);
        }
    };

    /**
     * @method
     * Removes widget from the dialog. Usefull for removing widgets dynamically when dialog is already open. 
     * @param {DialogWidgetModel} dialogWidget 
     */
    p.removeWidget = function (dialogWidget) {
        var widget = this.getWidgetByName(dialogWidget.name);
        if (widget) {
            var index = this.settings.widgets.indexOf(dialogWidget);
            if (index > -1) {
                this.settings.widgets.splice(index, 1);
            }
            brease.uiController.dispose(widget.elem, true);
        }
    };

    /**
     * @method
     * Update the height and width of the content area of the Dialog. The content area is the container where widgets can be placed. 
     * @param {Integer} width 
     * @param {Integer} height 
     */
    p.updateContentSize = function (width, height) {
        this.renderer.updateElementSize(this.contentElem, width, height);
    };

    /**
     * @method
     * This method cleans up the data of the dialog. Mostly for internal usage. 
     */
    p.dispose = function () {
        if (this.elem) {
            this.elem.removeEventListener(BreaseEvent.CONTENT_PARSED, this.onContentParsed);
            brease.uiController.dispose(this.elem);
            SuperClass.prototype.dispose.apply(this, arguments);
        }
        if (this.closingDeferred && this.closingDeferred.state() === 'pending') {
            this.closingDeferred.reject();
        }
        this.closingDeferred = null;
    };

    p._setContent = function () {

    };

    p._createRootElem = function (id) {
        return this.renderer.createDialog(id);
    };

    p._initHeader = function () {
        if (this.headerElem && this.settings.header) {
            if (brease.language.isKey(this.settings.header.text)) {
                this.settings.header.textkey = brease.language.parseKey(this.settings.header.text);
            }
            if (this.settings.header.textkey) {
                this.settings.header.text = brease.language.getTextByKey(this.settings.header.textkey);
            }
            this.headerElem.textContent = this.settings.header.text;
        }
    };

    p._initContent = function () {
        this._initWidgets();
    };

    p._initFooter = function () {
        _initFooterButtons(this);
    };

    p._closeButtonClickhandler = function () {
        this.settings.dialogResult = DialogResult.CLOSE;
        SuperClass.prototype._closeButtonClickhandler.apply(this, arguments);
    };

    // PRIVATE

    function _onContentParsed(self) {
        self.elem.removeEventListener(BreaseEvent.CONTENT_PARSED, self.onContentParsed);
        self.readyHandler();
    }

    function _btnOkClickHandler(self, e) {
        if (!e.target.classList.contains('disabled')) {
            self.settings.dialogResult = DialogResult.OK;
            self.debouncedHide();
        }
    }

    function _btnCancelClickHandler(self) {
        self.settings.dialogResult = DialogResult.CANCEL;
        self.debouncedHide();
    }

    function _btnYesClickHandler(self) {
        self.settings.dialogResult = DialogResult.YES;
        self.debouncedHide();
    }

    function _btnNoClickHandler(self) {
        self.settings.dialogResult = DialogResult.NO;
        self.debouncedHide();
    }

    function _initSkeleton(self) {
        var id = self.settings.id || Utils.uniqueID(Constants.DIALOG_ID);
        self.elem = self._createRootElem(id);
        self.el = $(self.elem);

        var header = self.renderer.createHeader();
        var headerContent = self.renderer.createHeaderContent();
        var contentContainer = self.renderer.createContentContainer();
        var content = self.renderer.createContent(self.settings);
        var footer = self.renderer.createFooter();
        var footerContent = self.renderer.createFooterContent();
        var contentFooterContainer = self.renderer.createContentFooterContainer();

        header.appendChild(headerContent);
        footer.appendChild(footerContent);
        contentContainer.appendChild(content);

        self.headerElem = headerContent;
        self.footerElem = footerContent;
        self.contentElem = content;

        contentFooterContainer.appendChild(contentContainer);
        contentFooterContainer.appendChild(footer);

        self.elem.appendChild(header);
        self.elem.appendChild(contentFooterContainer);
    }

    function _initEventHandler(self) {
        self.btnOkClickHandler = function (e) { _btnOkClickHandler(self, e); };
        self.btnCancelClickHandler = function (e) { _btnCancelClickHandler(self, e); };
        self.btnYesClickHandler = function (e) { _btnYesClickHandler(self, e); };
        self.btnNoClickHandler = function (e) { _btnNoClickHandler(self, e); };
    }

    p._initWidgets = function () {
        var config = this.settings;
        if (config.widgets.length > 0) {
            for (var i = 0; i < config.widgets.length; i = i + 1) {
                var dialogWidget = config.widgets[i];
                dialogWidget.id = this._createWidgetId(dialogWidget.name);
                dialogWidget.options.style = config.style;

                var widgetElem = this.renderer.createWidgetElem(dialogWidget, true);
                if (widgetElem) {
                    this.contentElem.appendChild(widgetElem);
                }
            }
        }
    };

    p._createWidgetId = function (name) {
        return this.elem.id + '_' + name;
    };

    function _initFooterButtons(self) {
        var buttonWidget = null;
        if (self.settings.buttons.ok) {
            buttonWidget = _createFooterButtonWidget(self, 'okButton', brease.language.getSystemTextByKey('BR/IAT/brease.common.ok'));
            var okButton = self.renderer.createFooterButtonElement(buttonWidget);
            self.footerElem.appendChild(okButton);
            $(okButton).on(BreaseEvent.CLICK, self.btnOkClickHandler);
        }
        if (self.settings.buttons.cancel) {
            buttonWidget = _createFooterButtonWidget(self, 'cancelButton', brease.language.getSystemTextByKey('BR/IAT/brease.common.cancel'));
            var cancelButton = self.renderer.createFooterButtonElement(buttonWidget);
            self.footerElem.appendChild(cancelButton);
            $(cancelButton).on(BreaseEvent.CLICK, self.btnCancelClickHandler);
        }
        if (self.settings.buttons.yes) {
            buttonWidget = _createFooterButtonWidget(self, 'yesButton', brease.language.getSystemTextByKey('BR/IAT/brease.common.yes'));
            var yesButton = self.renderer.createFooterButtonElement(buttonWidget);
            self.footerElem.appendChild(yesButton);
            $(yesButton).on(BreaseEvent.CLICK, self.btnYesClickHandler);
        }

        if (self.settings.buttons.no) {
            buttonWidget = _createFooterButtonWidget(self, 'noButton', brease.language.getSystemTextByKey('BR/IAT/brease.common.no'));
            var noButton = self.renderer.createFooterButtonElement(buttonWidget);
            self.footerElem.appendChild(noButton);
            $(noButton).on(BreaseEvent.CLICK, self.btnNoClickHandler);
        }

    }

    function _createFooterButtonWidget(self, name, text) {
        var buttonWidget = new DialogWidgetModel();
        buttonWidget.name = name;
        buttonWidget.id = self._createWidgetId(buttonWidget.name);
        buttonWidget.type = 'widgets/brease/Button';
        buttonWidget.width = '100px';
        buttonWidget.height = '30px';
        buttonWidget.options = { 'text': text };
        return buttonWidget;
    }

    p._setZoom = function ($el, visuId) {

        var visu = brease.pageController.getVisuById(visuId),
            factor = 1;

        // it's possible to load a dialog from an embedded Visu which is not loaded so far -> containerID is undefined
        if (visu && visu.containerId) {

            if (this.widgetElement) {
                factor = Utils.getScaleFactor(this.widgetElement);
                // widgetElement is hidden
                if (factor === 0) {
                    // A&P 673760 scale factor 0 applied to LadderEditor dialog if LadderEditor widget is hidden => fallback is the
                    // factor from closest layout container (in case of embedded visu)
                    var layoutDiv = $(this.widgetElement).closest('[data-brease-layoutid]');
                    if (layoutDiv.length > 0) {
                        factor = Utils.getScaleFactor(layoutDiv.get(0));
                    }
                    // last fallback is factor = 1
                    factor = factor === 0 ? 1 : factor;
                }
            }
        }

        $el.css({ 'transform': 'scale(' + factor + ',' + factor + ')', 'transform-origin': '0 0' });

        return factor;
    };

    function _validatePositions(config) {
        if (config.position) {
            var position = config.position;

            switch (position.horizontal) {
                case position.horizontal === 'left':
                    config.position.vertical = 'middle';
                    config.arrow.position = 'right';
                    config.arrow.show = true;
                    break;
                case position.horizontal === 'right':
                    config.position.vertical = 'middle';
                    config.arrow.position = 'left';
                    config.arrow.show = true;
                    break;
                case position.vertical === 'top':
                    config.position.horizontal = 'center';
                    config.arrow.position = 'bottom';
                    config.arrow.show = true;
                    break;
                case position.vertical === 'bottom':
                    config.position.horizontal = 'center';
                    config.arrow.position = 'top';
                    config.arrow.show = true;
                    break;
                default:
                    config.position.vertical = 'middle';
                    config.position.horizontal = 'center';
                    config.arrow.show = false;
                    break;
            }
        }
        return config;
    }

    return WidgetClass;

});
