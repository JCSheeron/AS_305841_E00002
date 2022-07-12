define([
    'widgets/brease/common/libs/redux/view/ImageView/ImageView',
    'widgets/brease/common/libs/redux/view/TextView/TextView',
    'widgets/brease/common/libs/BoxLayout',
    'brease/events/BreaseEvent',
    'brease/enum/Enum'
], function (ImageView, TextView, BoxLayout, BreaseEvent, Enum) {

    'use strict';

    var ItemView = function (props, parent) {
        this.render(props, parent);
    };

    var p = ItemView.prototype;

    p.render = function render(props, parent) {
        this.el = $(BoxLayout.createBoxContainer());
        this.el.on(BreaseEvent.CLICK, props.onClick);
        _addCssClasses(this.el, props.status, props.itemSettings.imageAlign);
        if (props.status.visible) {
            this.el.height(props.itemSettings.itemHeight);
            if (props.imageIndicator !== undefined) {
                if (props.imageIndicator.showImage) {
                    var subClasses = 'ImageIndicator';
                    if (props.itemSettings.imageAlign === Enum.ImagePosition.left) {
                        subClasses = subClasses.concat(' orientation-left');
                    } else {
                        subClasses = subClasses.concat(' orientation-right');
                    }
                    this.imageIndicator = new ImageView({
                        image: 'widgets/brease/common/libs/redux/view/ItemView/assets/Down.svg',
                        cache: true,
                        showImage: true,
                        subClasses: subClasses
                    }, this.el);
                }
            }
            if (props.image.image !== undefined && props.image.showImage) {
                this.image = new ImageView(props.image, this.el);
            }
            if (props.text !== undefined && props.text.showText) {
                props.text.text = props.offline ? brease.settings.noValueString : props.text.text; 
                if (props.text.text !== '' && props.text.text !== undefined) {
                    this.text = new TextView(
                        {
                            text: props.text.text,
                            textSettings: props.text.textSettings,
                            selected: props.status.selected
                        }, this.el);
                }
            }
            parent.append(this.el);
        }
    };

    function _addCssClasses(element, status, imageAlign) {
        element.addClass('ItemView');
        if (!status.visible) {
            element.addClass('itemInvisible');
        } else {
            if (status.selected) {
                element.addClass('itemSelected');
            }
            if (!status.enabled) {
                element.addClass('itemDisabled');
            }
        }
        if (status.lastItem) {
            element.addClass('lastItem');
        }
        var orientation = imageAlign === Enum.ImagePosition.left ? Enum.Orientation.LTR : Enum.Orientation.RTL;
        BoxLayout.setOrientation(element[0], orientation);
    }

    p.dispose = function dispose() {
        if (this.image !== undefined) {
            this.image.dispose();
            this.image = undefined;
        }
        if (this.text !== undefined) {
            this.text.dispose();
            this.text = undefined;
        }
        this.el.off();
        this.el.remove();
    };

    return ItemView;

});
