define(['brease/core/BaseWidget',
    'brease/decorators/DragAndDropCapability',
    'widgets/brease/common/DragDropProperties/libs/DraggablePropertiesEvents',
    'widgets/brease/common/DragDropProperties/libs/DroppablePropertiesEvents'
], function (SuperClass, dragAndDropCapability) {

    'use strict';

    /**
     * @class widgets.brease.Rectangle
     * #Description
     * Widget for displaying an rectangle
     * @breaseNote 
     * @extends brease.core.BaseWidget
     *
     * @mixins widgets.brease.common.DragDropProperties.libs.DraggablePropertiesEvents
     * @mixins widgets.brease.common.DragDropProperties.libs.DroppablePropertiesEvents
     *
     * @iatMeta category:Category
     * Drawing
     * @iatMeta description:short
     * Grafikobjekt
     * @iatMeta description:de
     * Zeichnet ein Quadrat oder Rechteck
     * @iatMeta description:en
     * Draws a square or a rectangle
     */

    /**
     * @htmltag examples
     * ##Configuration examples:  
     *
     *     <div id="Rectangle01" data-brease-widget="widgets/brease/Rectangle" data-brease-options="{'width':200, 'height':100}"></div>
     *
     */

    /**
     * @cfg {String} tooltip=''
     * @iatStudioExposed
     * @hide
     */

    /**
     * @method showTooltip
     * @hide
     */

    var defaultSettings = {
        },

        WidgetClass = SuperClass.extend(function Rectangle() {
            SuperClass.apply(this, arguments);
        }, defaultSettings),

        p = WidgetClass.prototype;

    p.init = function () {
        if (this.settings.omitClass !== true) {
            this.addInitialClass('breaseRectangle');
        }
        this._invalidate();
        SuperClass.prototype.init.call(this);

    };

    return dragAndDropCapability.decorate(WidgetClass, false);

});
