define([
    'widgets/brease/common/libs/BoxLayout',
    'widgets/brease/common/libs/wfUtils/UtilsCommon'
], function (BoxLayout, Utils) {

    'use strict';
    /**
    * @class widgets.brease.common.libs.redux.view.HTMLView.HTMLView
    *
    * This View is using following Utils:
    * {@link widgets.brease.common.libs.wfUtils.UtilsCommon UtilsCommon}
    */

    var HTMLView = function (props, parent) {
        this.render(props, parent);
    };

    var p = HTMLView.prototype;
    /**
    * @method render
    * Renders the View
    * @param {Object} props
    * @param {String} props.html
    * @param {Object} props.textSettings
    * @param {Boolean} props.selected
    * @return {jQuery} parent
    */
    p.render = function render(props, parent) {
        this.el = $(BoxLayout.createBox());
        this.el.addClass('HTMLView');
        props.html = '' + props.html;
        //Check if we are fed HTML otherwise treat as text!
        if (props.html[0] === '<') {
            this.el.html(props.html);
        } else {
            this.el.addClass('TextView');
            this.span = $('<span></span>');
            Utils.addCssClasses(this.el, props.textSettings, props.selected);
           
            this.span.text(brease.language.unescapeText(props.html));
            this.el.append(this.span);
        }
        parent.append(this.el);
    };

    p.dispose = function dispose() {
        if (this.span) {
            this.span.remove();
        }
        this.el.remove();
    };

    return HTMLView;

});
