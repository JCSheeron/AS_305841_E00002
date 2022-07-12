define([
    'widgets/brease/common/libs/redux/view/ItemView/ItemView',
    'brease/helper/Scroller',
    'brease/events/BreaseEvent'
], function (ItemView, Scroller, BreaseEvent) {

    'use strict';

    /**
     * @class widgets.brease.common.libs.redux.view.ListView.ListView
     * It display a list of items with scrolling options
     */

    var ListView = function (props, parent) {
        this.render(props, parent);
    };

    var p = ListView.prototype;

    /**
     * @method render
     * Renders the View
     * @param {jQuery} parent DOM element for the parent View
     * @param {Object} props Properties for the View
     *
     * @param {Object} props.status Status of the view
     * @param {Boolean} props.status.visible Indicate if the view is visible
     * @param {Boolean} props.status.enable Indicate if the view is enable for interaction
     *
     * @param {Object} props.items Configuration for the items
     * @param {Object} props.text Configuration for the text used by the items
     * @param {Object} props.image Configuration for the images used by the items
     */
    p.render = function render(props, parent) {

        //Create div elements
        this.elContainer = $('<div class="ListView Container"></div>');
        this.elList = $('<div class="ListView List"></div>');
        this.elContainer.append(this.elList);

        if (brease.config.isKeyboardOperationEnabled() && !brease.appElem.contains(parent[0])) {
            // prevent focusout if clicked on list
            this.elContainer.on(BreaseEvent.MOUSE_DOWN, function (e) {
                e.preventDefault();
            });
        }
        //Array of view items
        this.items = [];

        //Add the classes to the elements
        _addCssClasses(this.elContainer, props.status.visible, props.status.enabled);

        if (props.status.visible) {
            var i = 0;
            for (i = 0; i < props.items.itemList.length; i = i + 1) {

                var textElement = props.text.textElements[props.items.itemList[i].textId],
                    imageElement = props.image.imageElements[props.items.itemList[i].imageId];

                var itemProps = {
                    text: {
                        text: textElement === undefined ? '' : textElement.displayText,
                        textSettings: props.text.textSettings,
                        showText: props.items.listSettings.showTexts
                    },
                    image: {
                        image: imageElement === undefined ? undefined : imageElement.imagePath,
                        showImage: props.items.listSettings.showImages
                    },
                    itemSettings: props.items.itemSettings,
                    status: {
                        enabled: props.status.enabled,
                        visible: props.status.visible,
                        selected: props.items.itemList[i].selected,
                        lastItem: i === props.items.itemList.length - 1
                    },
                    onClick: (function (i) {
                        var itemIndex = i;
                        return function (originalEvent) {
                            props.onClick(itemIndex, originalEvent);
                        };
                    })(i)
                };
                var item = new ItemView(itemProps, this.elList);
                this.items.push(item);
            }
            parent.append(this.elContainer);
            var selectedItemElement = this.items[props.items.selectedIndex] === undefined ? undefined : this.items[props.items.selectedIndex].el[0],
                previousSelectedItemElement = this.items[props.items.previousSelectedIndex] === undefined ? undefined : this.items[props.items.previousSelectedIndex].el[0];
            this.scroller = _scrollHandling(!props.items.itemSettings.fitHeight2Items,
                props.status.editMode,
                this.elContainer[0],
                selectedItemElement,
                previousSelectedItemElement);
        }
    };

    p.dispose = function dispose() {
        _removeItems(this);
        if (this.scroller !== undefined) {
            this.scroller.destroy();
        }
        this.elList.remove();
        this.elContainer.remove();
    };

    function _removeItems(view) {
        if (view.items !== undefined) {
            var i = 0;
            for (i = 0; i < view.items.length; i = i + 1) {
                view.items[i].dispose();
            }
        }
        view.items = undefined;
    }

    function _addCssClasses(element, visible, enabled) {
        if (!visible) {
            element.addClass('invisible');
        } else {
            element.removeClass('invisible');
            if (!enabled) {
                element.addClass('disabled');
            } else {
                element.removeClass('disabled');
            }
        }
    }

    function _scrollHandling(enableScroll, editMode, parentElement, actualElement, previousElement) {
        var scroller;
        if (enableScroll) {
            scroller = _createScroller(parentElement);
            if (editMode) {
                scroller.subsequentlyDisableTouch();
                scroller.subsequentlyDisableMouse();
            } else {
                if (previousElement !== undefined) {
                    scroller.scrollToElement(previousElement, 0, true, true);
                }
                if (actualElement !== undefined) {
                    scroller.scrollToElement(actualElement, 400, true, true);
                }
            }
        }
        return scroller;
    }

    function _createScroller(element) {
        var options = {
            mouseWheel: true,
            scrollX: true,
            scrollY: true
        };
        return Scroller.addScrollbars(element, options);
    }

    return ListView;

});
