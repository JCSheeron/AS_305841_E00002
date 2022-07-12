define(['brease/core/BaseWidget', 
    'widgets/brease/Image/libs/config/Config',
    'widgets/brease/common/libs/flux/stores/ImageStore/ImageStore',
    'widgets/brease/common/libs/flux/stores/ImageStore/ImageActions',
    'widgets/brease/common/libs/flux/views/ImageView/ImageView',
    'brease/decorators/DragAndDropCapability',
    'widgets/brease/common/DragDropProperties/libs/DraggablePropertiesEvents',
    'widgets/brease/common/DragDropProperties/libs/DroppablePropertiesEvents'
], function (SuperClass, Config, ImageStore, ImageActions, ImageView, dragAndDropCapability) {

    'use strict';

    /**
     * @class widgets.brease.Image
     * #Description
     * Widget for displaying an image
     * @breaseNote 
     * @extends brease.core.BaseWidget
     *
     * @mixins widgets.brease.common.DragDropProperties.libs.DraggablePropertiesEvents
     * @mixins widgets.brease.common.DragDropProperties.libs.DroppablePropertiesEvents
     * 
     * @iatMeta category:Category
     * Image
     * @iatMeta description:short
     * Grafikobjekt
     * @iatMeta description:de
     * Zeigt eine Grafik an
     * @iatMeta description:en
     * Displays a graphic image
     */

    var defaultSettings = Config,

        WidgetClass = SuperClass.extend(function Image() {
            SuperClass.apply(this, arguments);
        }, defaultSettings),

        p = WidgetClass.prototype;

    p.registerStore = function registerStore(store) {
        this.registeredStores.push(store);
    };

    p.dispatch = function dispatch(action) {
        this.registeredStores.forEach(function (store) {
            store.newAction(action);
        });
    };

    p.init = function () {

        //1. Add initial classes
        if (this.settings.omitClass !== true) {
            this.addInitialClass('breaseImage');
        }

        //2. Define empty store register
        this.registeredStores = [];

        //3. Initialize superclass
        SuperClass.prototype.init.call(this);

        //4. Define init state
        var initImageState = {
            imageList: [this.settings.image],
            sizeMode: this.settings.sizeMode,
            useSVGStyling: this.settings.useSVGStyling,
            height: '100%',
            width: '100%',
            visible: this.isVisible(),
            preloading: brease.config.preLoadingState
        };

        //5. Define stores and actions
        this.imageStore = new ImageStore(this, initImageState);
        this.imageActions = new ImageActions(this);

        //6. Define views
        this.imageView = new ImageView(this.imageStore, this, this.el);

        //7. Trigger init store action
        this.imageActions.initImage();
    };

    // override method called in BaseWidget.init
    p._initEditor = function () {
        var widget = this;
        widget.el.addClass('iatd-outline');
        require(['widgets/brease/Image/libs/EditorHandles', 'brease/events/BreaseEvent'], function (EditorHandles, BreaseEvent) {
            var editorHandles = new EditorHandles(widget);
            widget.getHandles = function () {
                return editorHandles.getHandles();
            };
            widget.designer.getSelectionDecoratables = function () {
                return editorHandles.getSelectionDecoratables();
            };
            widget.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_EDITOR_IF_READY, { bubbles: true }));
        });
    };

    p._setWidth = function (w) {
        SuperClass.prototype._setWidth.apply(this, arguments);
        this.imageActions.setWidth('100%');
    };

    p._setHeight = function (h) {
        SuperClass.prototype._setHeight.apply(this, arguments);
        this.imageActions.setHeight('100%');
    };

    /**
     * @method setImage
     * @iatStudioExposed
     * Sets image
     * @param {ImagePath} image
     */
    p.setImage = function (image) {
        this.settings.image = image;
        this.imageActions.setImageFromIndex(image, 0);
    };

    /**
     * @method getImage 
     * Returns image.
     * @return {ImagePath}
     */
    p.getImage = function () {
        return this.imageStore.getImagePath();
    };

    /**
     * @method setUseSVGStyling
     * Sets useSVGStyling
     * @param {Boolean} useSVGStyling
     */
    p.setUseSVGStyling = function (useSVGStyling) {
        this.settings.useSVGStyling = useSVGStyling;
        this.imageActions.setUseSVGStyling(useSVGStyling);
    };

    /**
     * @method getUseSVGStyling
     * Returns useSVGStyling
     * @return {Boolean}
     */
    p.getUseSVGStyling = function () {
        return this.imageStore.getUseSVGStyling();
    };

    /**
     * @method setSizeMode
     * Sets sizeMode
     * @param {brease.enum.SizeMode} sizeMode
     */
    p.setSizeMode = function (sizeMode) {
        this.settings.sizeMode = sizeMode;
        this.imageActions.setSizeMode(sizeMode);
    };

    /**
     * @method getSizeMode 
     * Returns sizeMode.
     * @return {brease.enum.SizeMode}
     */
    p.getSizeMode = function () {
        return this.imageStore.getImageSizeMode();
    };

    p.updateVisibility = function (initial) {
        SuperClass.prototype.updateVisibility.apply(this, arguments);
        if (this.imageActions !== undefined) {
            this.imageActions.setVisible(this.isVisible());
        }
    };

    p.wake = function () {
        if (this.internalData.preLoaded) {
            this.imageActions.initImageAfterPreload();
            this.internalData.preLoaded = false;
        }
        SuperClass.prototype.wake.apply(this, arguments);
    };

    return dragAndDropCapability.decorate(WidgetClass, false);

});
